
-- Authenticated beta feedback: preserve the separate administrative snapshot.
create or replace function public.beta_feedback_snapshot()
returns jsonb language plpgsql stable security definer set search_path = ''
as $$
begin
  if auth.uid() is null then
    raise exception 'authentication required' using errcode = '42501';
  end if;
  return (
    select coalesce(jsonb_agg(jsonb_build_object(
      'id', f.id,
      'display_name', coalesce(nullif(p.display_name, ''), 'Beta tester'),
      'positives', f.positives,
      'improvements', f.improvements,
      'submitted_at', f.submitted_at
    ) order by f.submitted_at desc), '[]'::jsonb)
    from private.beta_tester_feedback f
    left join public.profiles p on p.user_id = f.user_id
  );
end;
$$;
revoke all on function public.beta_feedback_snapshot() from public, anon;
grant execute on function public.beta_feedback_snapshot() to authenticated;

create table public.pcr_patients (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  initials text not null default '' check (char_length(initials) <= 20),
  birth_date date,
  created_at timestamptz not null default now(),
  unique (id, user_id)
);
create table public.pcr_records (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  patient_id uuid not null,
  started_at timestamptz not null,
  ended_at timestamptz,
  mode text not null default 'adult' check (mode in ('adult', 'pediatric')),
  weight numeric check (weight > 0 and weight <= 250),
  shock_count integer not null default 0 check (shock_count >= 0),
  rhythm text,
  care_info text not null default '' check (char_length(care_info) <= 4000),
  events jsonb not null default '[]'::jsonb check (jsonb_typeof(events) = 'array'),
  created_at timestamptz not null default now(),
  foreign key (patient_id, user_id) references public.pcr_patients(id, user_id) on delete cascade
);
create index pcr_patients_owner_idx on public.pcr_patients(user_id, created_at desc);
create index pcr_records_owner_started_idx on public.pcr_records(user_id, started_at desc);
create index pcr_records_patient_owner_idx on public.pcr_records(patient_id, user_id);
alter table public.pcr_patients enable row level security;
alter table public.pcr_records enable row level security;
create policy pcr_patients_owner on public.pcr_patients for all to authenticated
  using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy pcr_records_owner on public.pcr_records for all to authenticated
  using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
revoke all on public.pcr_patients, public.pcr_records from anon, public;
grant select, insert, update, delete on public.pcr_patients, public.pcr_records to authenticated;

-- Save patient and PCR atomically. A client-generated UUID makes retries idempotent.
create or replace function public.save_pcr_record(payload jsonb)
returns uuid language plpgsql security invoker set search_path = ''
as $$
declare
  owner_id uuid := auth.uid();
  record_id uuid := (payload->>'id')::uuid;
  patient_uuid uuid := (payload->>'patient_id')::uuid;
  saved_id uuid;
begin
  if owner_id is null then
    raise exception 'authentication required' using errcode = '42501';
  end if;
  insert into public.pcr_patients(id,user_id,initials,birth_date)
    values(patient_uuid,owner_id,coalesce(payload->>'initials',''),nullif(payload->>'birth_date','')::date)
    on conflict (id) do update set initials = excluded.initials, birth_date = excluded.birth_date
    where pcr_patients.user_id = owner_id returning id into saved_id;
  if saved_id is null then raise exception 'patient ownership required' using errcode = '42501'; end if;
  insert into public.pcr_records(id,user_id,patient_id,started_at,ended_at,mode,weight,shock_count,rhythm,care_info,events)
    values(record_id,owner_id,patient_uuid,(payload->>'started_at')::timestamptz,
      nullif(payload->>'ended_at','')::timestamptz,coalesce(payload->>'mode','adult'),
      nullif(payload->>'weight','')::numeric,coalesce((payload->>'shock_count')::integer,0),
      payload->>'rhythm',coalesce(payload->>'care_info',''),coalesce(payload->'events','[]'::jsonb))
    on conflict(id) do update set ended_at = excluded.ended_at, mode = excluded.mode,
      weight = excluded.weight, shock_count = excluded.shock_count, rhythm = excluded.rhythm,
      care_info = excluded.care_info, events = excluded.events
    where pcr_records.user_id = owner_id returning id into saved_id;
  if saved_id is null then raise exception 'PCR ownership required' using errcode = '42501'; end if;
  return record_id;
end;
$$;
revoke all on function public.save_pcr_record(jsonb) from public, anon;
grant execute on function public.save_pcr_record(jsonb) to authenticated;
