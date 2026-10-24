-- Atomic limiter for six-digit daily access codes.
-- The Edge Function uses a service-role client; public callers cannot invoke this RPC.
create or replace function public.quick_chart_claim_attempt(p_key_hash text)
returns boolean
language plpgsql
security invoker
set search_path = ''
as $$
declare
  v_now timestamptz := clock_timestamp();
  v_count integer;
  v_blocked timestamptz;
begin
  if p_key_hash is null or p_key_hash !~ '^[0-9a-f]{64}$' then
    return false;
  end if;

  insert into public.external_quick_chart_attempts as attempts
      (key_hash, failed_count, window_started_at, blocked_until, updated_at)
  values (p_key_hash, 1, v_now, null, v_now)
  on conflict (key_hash) do update
  set failed_count = case
        when attempts.window_started_at < v_now - interval '15 minutes'
         and (attempts.blocked_until is null or attempts.blocked_until <= v_now)
          then 1
        else attempts.failed_count + 1
      end,
      window_started_at = case
        when attempts.window_started_at < v_now - interval '15 minutes'
         and (attempts.blocked_until is null or attempts.blocked_until <= v_now)
          then v_now
        else attempts.window_started_at
      end,
      blocked_until = case
        when attempts.blocked_until > v_now then attempts.blocked_until
        when attempts.window_started_at < v_now - interval '15 minutes' then null
        when attempts.failed_count >= 4 then v_now + interval '30 minutes'
        else null
      end,
      updated_at = v_now
  returning failed_count, blocked_until into v_count, v_blocked;

  return v_count < 5 and (v_blocked is null or v_blocked <= v_now);
end;
$$;
revoke all on function public.quick_chart_claim_attempt(text) from public, anon, authenticated;
grant execute on function public.quick_chart_claim_attempt(text) to service_role;
