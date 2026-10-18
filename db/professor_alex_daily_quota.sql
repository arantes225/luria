-- Professor Alex Gemini: atomic per-user request quota, without storing prompts or responses.
create table if not exists public.professor_alex_daily_usage (
  user_id uuid not null references auth.users(id) on delete cascade,
  usage_date date not null,
  request_count integer not null default 0 check (request_count >= 0),
  primary key (user_id, usage_date)
);

alter table public.professor_alex_daily_usage enable row level security;
revoke all on public.professor_alex_daily_usage from public, anon, authenticated;
grant select, insert, update on public.professor_alex_daily_usage to service_role;

create or replace function public.reserve_professor_alex_daily_request(
  p_user_id uuid,
  p_limit integer default 15
)
returns boolean
language plpgsql
security invoker
set search_path = public
as $function$
declare
  v_reserved integer;
begin
  if p_user_id is null or p_limit is null or p_limit < 1 or p_limit > 100 then
    return false;
  end if;

  insert into public.professor_alex_daily_usage (user_id, usage_date, request_count)
  values (p_user_id, (now() at time zone 'America/Sao_Paulo')::date, 1)
  on conflict (user_id, usage_date) do update
    set request_count = public.professor_alex_daily_usage.request_count + 1
    where public.professor_alex_daily_usage.request_count < p_limit
  returning request_count into v_reserved;

  return v_reserved is not null;
end;
$function$;

revoke all on function public.reserve_professor_alex_daily_request(uuid, integer) from public, anon, authenticated;
grant execute on function public.reserve_professor_alex_daily_request(uuid, integer) to service_role;
