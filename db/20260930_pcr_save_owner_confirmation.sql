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

alter table public.pcr_records add constraint pcr_record_end_after_start check (ended_at is null or ended_at >= started_at);