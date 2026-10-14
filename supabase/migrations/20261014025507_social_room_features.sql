-- Additive extension of the existing rooms. Apply in staging before client deployment.
begin;
alter table public.study_rooms add column if not exists spotify_jam_url text
 check(spotify_jam_url is null or (length(spotify_jam_url)<=500 and spotify_jam_url ~ '^https://(spotify[.]link/[A-Za-z0-9]+|open[.]spotify[.]com/(jam|socialsession)/[A-Za-z0-9_-]+)([?][^[:space:]]*)?$'));
alter table public.study_rooms add column if not exists spotify_jam_shared_at timestamptz;
alter table public.study_room_checklist add column if not exists scheduled_at timestamptz;
alter table public.study_room_checklist add column if not exists duration_minutes integer check(duration_minutes between 1 and 240);
alter table public.study_room_resources add column if not exists kind text not null default 'link'
 check(kind in ('link','pdf','apostila','notes','questions','flashcards','notion'));
alter table public.study_room_resources add column if not exists attachment_path text;
alter table public.study_room_resources add column if not exists attachment_name text check(length(attachment_name)<=160);
alter table public.study_room_resources alter column url drop not null;
alter table public.study_room_resources add constraint study_room_material_content check(url is not null or attachment_path is not null);

create or replace function private.social_room_features(p_action text,p_payload jsonb default '{}')
 returns jsonb language plpgsql security definer set search_path='' as $$
declare
 uid uuid:=auth.uid(); r uuid:=nullif(p_payload->>'room_id','')::uuid; item_id uuid:=nullif(p_payload->>'id','')::uuid;
 rm public.study_rooms; row_owner uuid; result jsonb; item_count integer; cap integer; item_url text; current_room jsonb;
begin
 if uid is null then raise exception 'Autenticação obrigatória'; end if;
 if octet_length(p_payload::text)>16000 then raise exception 'Requisição muito grande'; end if;
 perform private.social_rate('room_features',120,60);
 if p_action='hall' then
  -- Use the established hall authorization and pagination contract.
  result=private.social_command('list_rooms',p_payload);
  select coalesce(jsonb_agg(entry||jsonb_build_object('avatars',(
   select coalesce(jsonb_agg(jsonb_build_object('name',p.display_name,'avatar_url',p.avatar_url)),'[]') from (
    select m.user_id from public.study_room_members m join public.profiles p on p.user_id=m.user_id
    where m.room_id=(entry->>'id')::uuid and m.admitted_until>now() and not m.kicked and not private.social_blocked(m.user_id)
     and (private.social_room_member((entry->>'id')::uuid) or p.social_discoverable) order by m.joined_at limit 4
   ) visible join public.profiles p on p.user_id=visible.user_id
  ))),'[]') into result from jsonb_array_elements(result) entry;
  select to_jsonb(x) into current_room from (
   select rooms.id,rooms.name,rooms.subject,sessions.ends_at,sessions.status,sessions.mode
   from public.study_room_members m join public.study_rooms rooms on rooms.id=m.room_id
   join public.study_room_sessions sessions on sessions.room_id=rooms.id and sessions.status<>'finished'
   where m.user_id=uid and m.admitted_until>now() and not m.kicked and rooms.archived_at is null
    and private.social_room_visible(rooms.id) order by m.joined_at desc limit 1
  ) x;
  return jsonb_build_object('rooms',result,'current_room',current_room);
 end if;
 if not private.social_room_member(r) then raise exception 'Participação na sala obrigatória'; end if;
 select * into rm from public.study_rooms where id=r for update;
 if p_action='agenda_add' then
  if (select count(*) from public.study_room_checklist where room_id=r)>=100 then raise exception 'Limite de objetivos atingido'; end if;
  insert into public.study_room_checklist(room_id,title,scheduled_at,duration_minutes,created_by)
   values(r,trim(p_payload->>'title'),nullif(p_payload->>'scheduled_at','')::timestamptz,nullif(p_payload->>'duration_minutes','')::integer,uid);
  return '{}';
 elsif p_action in ('agenda_edit','agenda_remove') then
  select created_by into row_owner from public.study_room_checklist where id=item_id and room_id=r;
  if row_owner is null or (row_owner<>uid and not private.social_room_admin(r)) then raise exception 'Somente o autor ou administrador'; end if;
  if p_action='agenda_remove' then delete from public.study_room_checklist where id=item_id and room_id=r;
  else update public.study_room_checklist set title=trim(p_payload->>'title'),scheduled_at=nullif(p_payload->>'scheduled_at','')::timestamptz,duration_minutes=nullif(p_payload->>'duration_minutes','')::integer where id=item_id and room_id=r; end if;
  return '{}';
 elsif p_action='material_add' then
  if (select count(*) from public.study_room_resources where room_id=r)>=100 then raise exception 'Limite de materiais atingido'; end if;
  item_url=trim(p_payload->>'url');
  if nullif(p_payload->>'attachment_path','') is not null then
   if p_payload->>'attachment_path' not like r::text||'/'||uid::text||'/%' or not exists(select 1 from storage.objects where bucket_id='study-room-attachments' and name=p_payload->>'attachment_path') then raise exception 'Anexo inválido'; end if;
   item_url=null;
  elsif item_url is null or item_url !~ '^https://' or item_url ~ '[[:space:]]' then raise exception 'Use um link HTTPS compartilhável'; end if;
  insert into public.study_room_resources(room_id,title,url,kind,review_on,created_by,attachment_path,attachment_name)
   values(r,trim(p_payload->>'title'),item_url,coalesce(p_payload->>'kind','link'),nullif(p_payload->>'review_on','')::date,uid,nullif(p_payload->>'attachment_path',''),nullif(p_payload->>'attachment_name',''));return '{}';
 elsif p_action='material_remove' then
  select created_by into row_owner from public.study_room_resources where id=item_id and room_id=r;
  if row_owner is null or (row_owner<>uid and not private.social_room_admin(r)) then raise exception 'Somente o autor ou administrador'; end if;
  delete from public.study_room_resources where id=item_id and room_id=r;return '{}';
 elsif p_action='quiz_info' then
  if not public.has_feature('questions') then return '{}'; end if;
  select count(*) into item_count from public.question_items where set_id=(select set_id from public.study_room_rounds where room_id=r order by created_at desc,id desc limit 1);
  return jsonb_build_object('total',item_count);
 end if;
 if not private.social_room_admin(r) then raise exception 'Somente administradores da sala'; end if;
 if p_action='jam' then
  update public.study_rooms set spotify_jam_url=nullif(trim(p_payload->>'url'),''),spotify_jam_shared_at=case when nullif(trim(p_payload->>'url'),'') is null then null else now() end where id=r;return '{}';
 elsif p_action='room_update' then
  cap=coalesce((p_payload->>'capacity')::integer,rm.capacity);
  if cap<(select count(*) from public.study_room_members where room_id=r and admitted_until>now() and not kicked) then raise exception 'Capacidade inferior às vagas ocupadas'; end if;
  if p_payload ? 'mode' and exists(select 1 from public.study_room_sessions where room_id=r and status<>'finished') then raise exception 'Encerre a sessão antes de trocar o modo'; end if;
  update public.study_rooms set name=coalesce(trim(p_payload->>'name'),name),description=coalesce(p_payload->>'description',description),
   area=coalesce(p_payload->>'area',area),subject=coalesce(p_payload->>'subject',subject),objective=coalesce(p_payload->>'objective',objective),
   visibility=coalesce(p_payload->>'visibility',visibility),capacity=cap,mode=coalesce(p_payload->>'mode',mode),
   duration_minutes=coalesce((p_payload->>'duration')::integer,duration_minutes),focus_minutes=coalesce((p_payload->>'focus')::integer,focus_minutes),
   break_minutes=coalesce((p_payload->>'break')::integer,break_minutes),voice_enabled=coalesce((p_payload->>'voice')::boolean,voice_enabled) where id=r;
  if p_payload ? 'objective' then update public.study_room_sessions set objective=p_payload->>'objective' where room_id=r and status<>'finished'; end if;
  return '{}';
 end if;
 raise exception 'Ação indisponível';
end;
$$;
create or replace function public.social_room_features(p_action text,p_payload jsonb default '{}')
 returns jsonb language sql set search_path='' as $$select private.social_room_features($1,$2)$$;
revoke all on function private.social_room_features(text,jsonb),public.social_room_features(text,jsonb) from public,anon;
grant execute on function private.social_room_features(text,jsonb),public.social_room_features(text,jsonb) to authenticated;
create policy social_material_attachments_read on storage.objects for select to authenticated using (
 bucket_id='study-room-attachments' and exists(select 1 from public.study_room_resources material
 where material.attachment_path=storage.objects.name and private.social_room_member(material.room_id) and not private.social_blocked(material.created_by))
);
commit;
