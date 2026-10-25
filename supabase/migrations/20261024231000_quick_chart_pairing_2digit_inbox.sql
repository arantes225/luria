-- Short-lived two-digit pairing access; no public direct access.
create table if not exists public.quick_chart_pair_codes (
  owner_id uuid primary key references auth.users(id) on delete cascade,
  code_hash text not null,
  expires_at timestamptz not null,
  created_at timestamptz not null default now()
);
create table if not exists public.quick_chart_pair_requests (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  challenge_hash text not null,
  state text not null default 'pending' check (state in ('pending','approved','denied')),
  token_hash text,
  expires_at timestamptz not null,
  created_at timestamptz not null default now(),
  decided_at timestamptz
);
create index if not exists quick_chart_pair_requests_owner_idx
  on public.quick_chart_pair_requests(owner_id,created_at desc);
create table if not exists public.quick_chart_inbox (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  body text not null check (char_length(body) between 1 and 16000),
  created_at timestamptz not null default now()
);
create index if not exists quick_chart_inbox_owner_idx
  on public.quick_chart_inbox(owner_id,created_at desc);
alter table public.quick_chart_pair_codes enable row level security;
alter table public.quick_chart_pair_requests enable row level security;
alter table public.quick_chart_inbox enable row level security;
revoke all on public.quick_chart_pair_codes,public.quick_chart_pair_requests,public.quick_chart_inbox from public,anon,authenticated;
grant all on public.quick_chart_pair_codes,public.quick_chart_pair_requests to service_role;
grant all on public.quick_chart_inbox to service_role;
grant select,delete on public.quick_chart_inbox to authenticated;
create policy "quick_chart_inbox_owner_read" on public.quick_chart_inbox
  for select to authenticated using ((select auth.uid())=owner_id);
create policy "quick_chart_inbox_owner_delete" on public.quick_chart_inbox
  for delete to authenticated using ((select auth.uid())=owner_id);

-- Five attempts are actually evaluated; the sixth (or another request during
-- the following 30 minutes) is rejected. Reserve each attempt atomically.
create or replace function public.quick_chart_pair_claim_attempt(p_key_hash text)
returns boolean
language plpgsql
security invoker
set search_path=''
as $$
declare
  v_now timestamptz:=clock_timestamp();
  v_count integer;
begin
  if p_key_hash is null or p_key_hash !~ '^[0-9a-f]{64}$' then return false; end if;
  insert into public.external_quick_chart_attempts as attempts
       (key_hash,failed_count,window_started_at,blocked_until,updated_at)
  values (p_key_hash,1,v_now,null,v_now)
  on conflict (key_hash) do update set
    failed_count=case
      when (attempts.blocked_until is null or attempts.blocked_until<=v_now)
       and attempts.window_started_at<v_now-interval '15 minutes' then 1
      else attempts.failed_count+1 end,
    window_started_at=case
      when (attempts.blocked_until is null or attempts.blocked_until<=v_now)
       and attempts.window_started_at<v_now-interval '15 minutes' then v_now
      else attempts.window_started_at end,
    blocked_until=case
      when attempts.blocked_until>v_now then attempts.blocked_until
      when attempts.window_started_at<v_now-interval '15 minutes' then null
      when attempts.failed_count>=4 then v_now+interval '30 minutes'
      else null end,
    updated_at=v_now
  returning failed_count into v_count;
  return v_count<=5;
end;
$$;
revoke all on function public.quick_chart_pair_claim_attempt(text) from public,anon,authenticated;
grant execute on function public.quick_chart_pair_claim_attempt(text) to service_role;
