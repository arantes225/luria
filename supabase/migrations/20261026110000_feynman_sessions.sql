create table if not exists public.feynman_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade default auth.uid(),
  topic text not null check (char_length(topic) between 3 and 180),
  mode text not null check (mode in ('iniciante','questionador','banca')),
  status text not null default 'active' check (status in ('active','completed','abandoned')),
  turns jsonb not null default '[]'::jsonb check (jsonb_typeof(turns) = 'array' and jsonb_array_length(turns) <= 24),
  report jsonb,
  started_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  completed_at timestamptz,
  check (report is null or jsonb_typeof(report) = 'object')
);

alter table public.feynman_sessions enable row level security;
revoke all on table public.feynman_sessions from public, anon;
grant select, insert, update, delete on table public.feynman_sessions to authenticated;

drop policy if exists "feynman_sessions_select_own" on public.feynman_sessions;
create policy "feynman_sessions_select_own" on public.feynman_sessions for select to authenticated using (user_id = (select auth.uid()));
drop policy if exists "feynman_sessions_insert_own" on public.feynman_sessions;
create policy "feynman_sessions_insert_own" on public.feynman_sessions for insert to authenticated with check (user_id = (select auth.uid()));
drop policy if exists "feynman_sessions_update_own" on public.feynman_sessions;
create policy "feynman_sessions_update_own" on public.feynman_sessions for update to authenticated using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
drop policy if exists "feynman_sessions_delete_own" on public.feynman_sessions;
create policy "feynman_sessions_delete_own" on public.feynman_sessions for delete to authenticated using (user_id = (select auth.uid()));

create index if not exists feynman_sessions_user_updated_idx on public.feynman_sessions(user_id, updated_at desc);
