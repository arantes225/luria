create table public.user_recipe_templates (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  title text not null check (char_length(btrim(title)) between 1 and 180),
  medications jsonb not null default '[]'::jsonb check (jsonb_typeof(medications) = 'array' and jsonb_array_length(medications) <= 50),
  exams jsonb not null default '[]'::jsonb check (jsonb_typeof(exams) = 'array' and jsonb_array_length(exams) <= 50),
  treatment text not null default '' check (char_length(treatment) <= 10000),
  orientations text not null check (char_length(btrim(orientations)) between 1 and 10000),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint user_recipe_templates_has_content check (
    jsonb_array_length(medications) > 0 or jsonb_array_length(exams) > 0 or char_length(btrim(treatment)) > 0
  )
);
create index user_recipe_templates_owner_updated_idx
  on public.user_recipe_templates (user_id, updated_at desc);
alter table public.user_recipe_templates enable row level security;
revoke all on public.user_recipe_templates from public, anon;
grant select, insert, delete on public.user_recipe_templates to authenticated;
grant update (title, medications, exams, treatment, orientations, updated_at)
  on public.user_recipe_templates to authenticated;
create policy "user_recipe_templates_select_own"
  on public.user_recipe_templates for select to authenticated
  using ((select auth.uid()) = user_id);
create policy "user_recipe_templates_insert_own"
  on public.user_recipe_templates for insert to authenticated
  with check ((select auth.uid()) = user_id);
create policy "user_recipe_templates_update_own"
  on public.user_recipe_templates for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);
create policy "user_recipe_templates_delete_own"
  on public.user_recipe_templates for delete to authenticated
  using ((select auth.uid()) = user_id);
