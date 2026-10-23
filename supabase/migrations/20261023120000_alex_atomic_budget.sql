-- Apply before the matching Edge Function. No provider calls occur in SQL.
create table private.professor_alex_reservations (
  user_id uuid not null references auth.users(id) on delete cascade,
  request_id uuid not null,
  request_hash text not null check (length(request_hash) = 64),
  usage_date date not null,
  channel text not null check (channel in ('chat', 'voice')),
  multiplier numeric(8,3) not null,
  reserved numeric(20,2) not null check (reserved > 0),
  status text not null default 'pending' check (status in ('pending', 'settled', 'uncertain')),
  created_at timestamptz not null default now(),
  primary key (user_id, request_id)
);
alter table private.professor_alex_reservations enable row level security;
revoke all on private.professor_alex_reservations from public, anon, authenticated;

create function private.reserve_alex_budget(p_user_id uuid, p_request_id uuid, p_request_hash text, p_channel text)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare
  v_usage jsonb;
  v_reserved numeric(20,2);
  v_multiplier numeric(8,3);
  v_existing private.professor_alex_reservations;
  v_date date := (now() at time zone 'America/Sao_Paulo')::date;
begin
  if p_user_id is null or p_request_id is null or p_channel is null
     or p_channel not in ('chat', 'voice') or p_request_hash is null
     or p_request_hash !~ '^[a-f0-9]{64}$' then
    raise exception 'invalid reservation' using errcode = '22023';
  end if;
  perform pg_advisory_xact_lock(hashtext(p_user_id::text), 74531);
  select * into v_existing from private.professor_alex_reservations
    where user_id = p_user_id and request_id = p_request_id;
  if found then
    return jsonb_build_object('ok', false, 'error', case when v_existing.request_hash = p_request_hash
      then 'duplicate_request' else 'request_conflict' end);
  end if;
  -- An abandoned request remains fully charged. Never refund uncertain spend.
  update private.professor_alex_reservations set status = 'uncertain'
    where user_id = p_user_id and status = 'pending' and created_at < now() - interval '15 minutes';
  if exists (select 1 from private.professor_alex_reservations where user_id = p_user_id and status = 'pending') then
    return jsonb_build_object('ok', false, 'error', 'request_in_progress');
  end if;
  v_usage := private.professor_alex_token_usage(p_user_id);
  v_reserved := (v_usage->>'remaining_tokens')::numeric;
  if v_reserved is null or v_reserved <= 0 then
    return jsonb_build_object('ok', false, 'error', 'token_budget_reached', 'usage', v_usage);
  end if;
  v_multiplier := case when p_channel = 'voice' then (v_usage->>'voice_multiplier')::numeric else 1 end;
  insert into private.professor_alex_reservations(user_id, request_id, request_hash, usage_date, channel, multiplier, reserved)
    values (p_user_id, p_request_id, p_request_hash, v_date, p_channel, v_multiplier, v_reserved);
  -- Predebit the entire available allowance: one in-flight request per owner.
  insert into public.professor_alex_daily_usage(user_id, usage_date, request_count, weighted_tokens)
    values (p_user_id, v_date, 0, v_reserved)
    on conflict (user_id, usage_date) do update set weighted_tokens = public.professor_alex_daily_usage.weighted_tokens + excluded.weighted_tokens;
  return jsonb_build_object('ok', true, 'reserved', v_reserved, 'multiplier', v_multiplier,
    'usage', private.professor_alex_token_usage(p_user_id));
end;
$$;

create function private.settle_alex_budget(p_user_id uuid, p_request_id uuid, p_input bigint, p_output bigint, p_total bigint)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare
  v_row private.professor_alex_reservations;
  v_actual numeric(20,2);
begin
  perform pg_advisory_xact_lock(hashtext(p_user_id::text), 74531);
  select * into strict v_row from private.professor_alex_reservations where user_id = p_user_id and request_id = p_request_id for update;
  if v_row.status <> 'pending' then return private.professor_alex_token_usage(p_user_id); end if;
  -- NULL denotes ambiguous provider consumption. Keep the full predebit.
  if p_input is null or p_output is null or p_total is null then
    update private.professor_alex_reservations set status = 'uncertain' where user_id = p_user_id and request_id = p_request_id;
    return private.professor_alex_token_usage(p_user_id);
  end if;
  if p_input < 0 or p_output < 0 or p_total < p_input + p_output then
    raise exception 'invalid accounting' using errcode = '22023';
  end if;
  v_actual := p_total * v_row.multiplier;
  -- Record an upstream overrun truthfully; never clamp away evidence of spend.
  update public.professor_alex_daily_usage set
    request_count = request_count + case when p_total > 0 then 1 else 0 end,
    input_tokens = input_tokens + p_input, output_tokens = output_tokens + p_output,
    chat_tokens = chat_tokens + case when v_row.channel = 'chat' then p_total else 0 end,
    voice_tokens = voice_tokens + case when v_row.channel = 'voice' then p_total else 0 end,
    weighted_tokens = weighted_tokens - v_row.reserved + v_actual
    where user_id = p_user_id and usage_date = v_row.usage_date;
  update private.professor_alex_reservations set status = 'settled' where user_id = p_user_id and request_id = p_request_id;
  return private.professor_alex_token_usage(p_user_id);
end;
$$;

create function public.reserve_alex_budget(p_user_id uuid, p_request_id uuid, p_request_hash text, p_channel text)
returns jsonb language sql set search_path = '' as $$ select private.reserve_alex_budget($1,$2,$3,$4); $$;
create function public.settle_alex_budget(p_user_id uuid, p_request_id uuid, p_input bigint, p_output bigint, p_total bigint)
returns jsonb language sql set search_path = '' as $$ select private.settle_alex_budget($1,$2,$3,$4,$5); $$;
revoke all on function private.reserve_alex_budget(uuid,uuid,text,text), public.reserve_alex_budget(uuid,uuid,text,text),
  private.settle_alex_budget(uuid,uuid,bigint,bigint,bigint), public.settle_alex_budget(uuid,uuid,bigint,bigint,bigint) from public, anon, authenticated;
grant execute on function private.reserve_alex_budget(uuid,uuid,text,text), public.reserve_alex_budget(uuid,uuid,text,text),
  private.settle_alex_budget(uuid,uuid,bigint,bigint,bigint), public.settle_alex_budget(uuid,uuid,bigint,bigint,bigint) to service_role;
