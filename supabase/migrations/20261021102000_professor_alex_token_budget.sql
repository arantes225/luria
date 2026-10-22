alter table public.professor_alex_daily_usage
  add column if not exists input_tokens bigint not null default 0,
  add column if not exists output_tokens bigint not null default 0,
  add column if not exists chat_tokens bigint not null default 0,
  add column if not exists voice_tokens bigint not null default 0,
  add column if not exists weighted_tokens numeric(20,2) not null default 0;

create table if not exists private.professor_alex_token_settings (
  id boolean primary key default true check (id),
  daily_token_budget bigint not null default 100000 check (daily_token_budget between 1000 and 100000000),
  voice_multiplier numeric(8,3) not null default 3.000 check (voice_multiplier between 1 and 10),
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id)
);

insert into private.professor_alex_token_settings (id)
values (true)
on conflict (id) do nothing;

revoke all on private.professor_alex_token_settings from public, anon, authenticated;

create or replace function private.professor_alex_token_usage(p_user_id uuid)
returns jsonb
language sql
stable
security definer
set search_path = ''
as $function$
  with config as (
    select daily_token_budget, voice_multiplier
    from private.professor_alex_token_settings
    where id = true
  ), usage as (
    select
      coalesce(u.input_tokens, 0) as input_tokens,
      coalesce(u.output_tokens, 0) as output_tokens,
      coalesce(u.chat_tokens, 0) as chat_tokens,
      coalesce(u.voice_tokens, 0) as voice_tokens,
      coalesce(u.weighted_tokens, 0) as weighted_tokens
    from public.professor_alex_daily_usage u
    where u.user_id = p_user_id
      and u.usage_date = (now() at time zone 'America/Sao_Paulo')::date
  )
  select jsonb_build_object(
    'used_tokens', coalesce((select weighted_tokens from usage), 0),
    'remaining_tokens', greatest(
      (select daily_token_budget from config) - coalesce((select weighted_tokens from usage), 0),
      0
    ),
    'daily_token_budget', (select daily_token_budget from config),
    'input_tokens', coalesce((select input_tokens from usage), 0),
    'output_tokens', coalesce((select output_tokens from usage), 0),
    'chat_tokens', coalesce((select chat_tokens from usage), 0),
    'voice_tokens', coalesce((select voice_tokens from usage), 0),
    'voice_multiplier', (select voice_multiplier from config),
    'renews_at', (((now() at time zone 'America/Sao_Paulo')::date + 1)::timestamp at time zone 'America/Sao_Paulo')
  );
$function$;

revoke all on function private.professor_alex_token_usage(uuid) from public, anon, authenticated;
grant execute on function private.professor_alex_token_usage(uuid) to service_role;

create or replace function private.record_professor_alex_token_usage(
  p_user_id uuid,
  p_channel text,
  p_input_tokens bigint,
  p_output_tokens bigint,
  p_total_tokens bigint
)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $function$
declare
  v_date date := (now() at time zone 'America/Sao_Paulo')::date;
  v_voice_multiplier numeric(8,3);
  v_input bigint := greatest(0, least(coalesce(p_input_tokens, 0), 100000000));
  v_output bigint := greatest(0, least(coalesce(p_output_tokens, 0), 100000000));
  v_total bigint := greatest(0, least(coalesce(p_total_tokens, 0), 200000000));
  v_weighted numeric(20,2);
begin
  if p_user_id is null or p_channel not in ('chat', 'voice') then
    raise exception 'Invalid Professor Alex token usage payload';
  end if;

  select voice_multiplier into v_voice_multiplier
  from private.professor_alex_token_settings
  where id = true;

  v_weighted := v_total * case when p_channel = 'voice' then v_voice_multiplier else 1 end;
  perform pg_advisory_xact_lock(hashtext(p_user_id::text), 74531);

  insert into public.professor_alex_daily_usage (
    user_id, usage_date, request_count, input_tokens, output_tokens,
    chat_tokens, voice_tokens, weighted_tokens
  ) values (
    p_user_id, v_date, 1, v_input, v_output,
    case when p_channel = 'chat' then v_total else 0 end,
    case when p_channel = 'voice' then v_total else 0 end,
    v_weighted
  )
  on conflict (user_id, usage_date) do update set
    request_count = public.professor_alex_daily_usage.request_count + 1,
    input_tokens = public.professor_alex_daily_usage.input_tokens + excluded.input_tokens,
    output_tokens = public.professor_alex_daily_usage.output_tokens + excluded.output_tokens,
    chat_tokens = public.professor_alex_daily_usage.chat_tokens + excluded.chat_tokens,
    voice_tokens = public.professor_alex_daily_usage.voice_tokens + excluded.voice_tokens,
    weighted_tokens = public.professor_alex_daily_usage.weighted_tokens + excluded.weighted_tokens;

  return private.professor_alex_token_usage(p_user_id);
end;
$function$;

revoke all on function private.record_professor_alex_token_usage(uuid, text, bigint, bigint, bigint) from public, anon, authenticated;
grant execute on function private.record_professor_alex_token_usage(uuid, text, bigint, bigint, bigint) to service_role;

create or replace function private.professor_alex_admin(
  p_action text,
  p_payload jsonb default '{}'::jsonb,
  p_pin text default null
)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $function$
declare
  v_uid uuid := (select auth.uid());
  v_verification jsonb;
  v_budget bigint;
  v_voice_multiplier numeric(8,3);
begin
  if v_uid is null or not private.is_admin() then
    raise exception 'admin access required' using errcode = '42501';
  end if;

  if p_action = 'snapshot' then
    return jsonb_build_object(
      'settings', (select to_jsonb(s) - 'id' from private.professor_alex_token_settings s where s.id = true),
      'today', private.professor_alex_token_usage(v_uid)
    );
  end if;

  if p_action <> 'update' then
    raise exception 'invalid Professor Alex admin action' using errcode = '22023';
  end if;

  v_verification := private.admin_verify_pin(p_pin);
  if coalesce((v_verification->>'ok')::boolean, false) is not true then
    return v_verification;
  end if;

  v_budget := (p_payload->>'daily_token_budget')::bigint;
  v_voice_multiplier := (p_payload->>'voice_multiplier')::numeric;
  if v_budget is null or v_budget < 1000 or v_budget > 100000000
     or v_voice_multiplier is null or v_voice_multiplier < 1 or v_voice_multiplier > 10 then
    raise exception 'invalid Professor Alex token settings' using errcode = '22023';
  end if;

  update private.professor_alex_token_settings
  set daily_token_budget = v_budget,
      voice_multiplier = v_voice_multiplier,
      updated_at = now(),
      updated_by = v_uid
  where id = true;

  return jsonb_build_object(
    'ok', true,
    'settings', (select to_jsonb(s) - 'id' from private.professor_alex_token_settings s where s.id = true),
    'today', private.professor_alex_token_usage(v_uid)
  );
end;
$function$;

revoke all on function private.professor_alex_admin(text, jsonb, text) from public, anon;
grant execute on function private.professor_alex_admin(text, jsonb, text) to authenticated;

create or replace function public.professor_alex_admin(
  p_action text,
  p_payload jsonb default '{}'::jsonb,
  p_pin text default null
)
returns jsonb
language sql
set search_path = ''
as $function$
  select private.professor_alex_admin($1, $2, $3);
$function$;

revoke all on function public.professor_alex_admin(text, jsonb, text) from public, anon;
grant execute on function public.professor_alex_admin(text, jsonb, text) to authenticated;
