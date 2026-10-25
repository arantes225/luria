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
