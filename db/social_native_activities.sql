-- Native room activities reference the original libraries; no copied question/card/case bank.
create table public.study_room_activities (
 id uuid primary key default gen_random_uuid(), room_id uuid not null references public.study_rooms(id) on delete cascade,
 created_by uuid not null references auth.users(id), kind text not null check(kind in ('flashcards','simulator')),
 title text not null check(length(title) between 1 and 160), card_ids uuid[], case_id uuid references public.clinical_cases(id),
 ordinal integer not null default 0 check(ordinal>=0), revealed boolean not null default false, active boolean not null default true,
 created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
 check((kind='flashcards' and card_ids is not null and cardinality(card_ids) between 1 and 100 and case_id is null and ordinal<cardinality(card_ids)) or (kind='simulator' and card_ids is null and case_id is not null))
);
create unique index study_room_one_activity on public.study_room_activities(room_id) where active;
create index study_room_activity_history on public.study_room_activities(room_id,created_at desc);
create index study_room_activity_author on public.study_room_activities(created_by);
create index study_room_activity_case on public.study_room_activities(case_id);
alter table public.study_room_activities enable row level security;
revoke all on public.study_room_activities from public,anon,authenticated;
grant select on public.study_room_activities to authenticated;
create policy room_activity_read on public.study_room_activities for select to authenticated using(private.social_room_member(room_id) and not private.social_blocked(created_by));
create table private.study_room_activity_responses (
 activity_id uuid not null references public.study_room_activities(id) on delete cascade, ordinal integer not null,
 user_id uuid not null references auth.users(id) on delete cascade, rating text check(rating in ('hard','medium','easy')),
 clinical_session_id uuid references public.clinical_case_sessions(id) on delete cascade,
 created_at timestamptz not null default now(),primary key(activity_id,ordinal,user_id)
);
create index study_room_activity_response_user on private.study_room_activity_responses(user_id);
create index study_room_activity_response_clinical on private.study_room_activity_responses(clinical_session_id);
alter table private.study_room_activity_responses enable row level security;
revoke all on private.study_room_activity_responses from public,anon,authenticated;

create function private.social_native_activity(p_action text,p_payload jsonb default '{}') returns jsonb
language plpgsql security definer set search_path='' as $$
declare uid uuid:=auth.uid(); r uuid:=(p_payload->>'room_id')::uuid; a public.study_room_activities; f public.flashcards;
 admin boolean; ids uuid[]; n integer; users jsonb; all_done boolean; result jsonb; cs public.clinical_case_sessions; list_id uuid; item jsonb; opts jsonb; item_index integer:=0;
begin
 if uid is null or not private.social_room_member(r) then raise exception 'Participação na sala obrigatória'; end if;
 if octet_length(p_payload::text)>(case when p_action='create_question_list' then 262144 else 16000 end) then raise exception 'Requisição muito grande'; end if;
 admin:=private.social_room_admin(r);
 if p_action='create_question_list' then
  if not public.has_feature('questions') then raise exception 'Acesso a questões necessário'; end if;
  perform private.social_rate('native_question_create',10,300);
  list_id:=(p_payload->>'id')::uuid;
  if list_id is null or length(trim(coalesce(p_payload->>'title',''))) not between 1 and 160 or jsonb_typeof(p_payload->'items')<>'array' or coalesce(jsonb_array_length(p_payload->'items'),0) not between 1 and 20 then raise exception 'Informe título e de 1 a 20 questões completas'; end if;
  perform pg_advisory_xact_lock(hashtext(list_id::text),4);
  if exists(select 1 from public.question_sets where id=list_id and user_id=uid) then return jsonb_build_object('id',list_id); end if;
  insert into public.question_sets(id,user_id,title,total_questions,status) values(list_id,uid,trim(p_payload->>'title'),jsonb_array_length(p_payload->'items'),'ready');
  for item in select value from jsonb_array_elements(p_payload->'items') loop
   opts:=item->'alternatives';item_index:=item_index+1;
   if length(trim(coalesce(item->>'stem',''))) not between 1 and 8000 or jsonb_typeof(opts)<>'object' or not(opts?'A' and opts?'B') or (select count(*) from jsonb_object_keys(opts)) not between 2 and 5
    or exists(select 1 from jsonb_each_text(opts) e where e.key not in ('A','B','C','D','E') or length(trim(coalesce(e.value,''))) not between 1 and 2000)
    or not coalesce(opts?(item->>'answer'),false) or length(coalesce(item->>'comment',''))>8000 or length(coalesce(item->>'reference',''))>1000 then raise exception 'Questão % incompleta: informe enunciado, alternativas e resposta correta',item_index; end if;
   insert into public.question_items(id,user_id,set_id,question_number,order_index,stem,alternatives,raw_text,official_answer,pulo_do_gato,source_label,area,materia)
    values(gen_random_uuid(),uid,list_id,item_index,item_index,trim(item->>'stem'),opts,trim(item->>'stem')||E'\n'||(select string_agg(key||') '||value,E'\n' order by key) from jsonb_each_text(opts)),item->>'answer',nullif(item->>'comment',''),nullif(item->>'reference',''),left(p_payload->>'area',160),left(p_payload->>'subject',160));
  end loop;
  return jsonb_build_object('id',list_id);
 end if;
 if p_action='catalog' then
  return jsonb_build_object(
   'decks',(select coalesce(jsonb_agg(to_jsonb(d)),'[]') from (
     select coalesce(nullif(concat_ws(' · ',nullif(lib.materia,''),nullif(lib.theme,'')),''),'Geral') title,coalesce(lib.area,'Sem área') area,lib.library_scope,
      (array_agg(lib.id order by lib.created_at,lib.id))[1:100] ids,count(*) total
     from public.flashcards lib where lib.active and public.has_feature('flashcards') and (lib.user_id=uid or lib.library_scope='system')
     group by coalesce(nullif(concat_ws(' · ',nullif(lib.materia,''),nullif(lib.theme,'')),''),'Geral'),coalesce(lib.area,'Sem área'),lib.library_scope order by 1,2 limit 100
   )d),
   'questions',(select coalesce(jsonb_agg(jsonb_build_object('id',s.id,'title',s.title,'total',(select count(*) from public.question_items q where q.set_id=s.id),'ready',(select count(*) from public.question_items q where q.set_id=s.id and length(trim(coalesce(q.stem,'')))>0 and q.alternatives<>'{}'::jsonb))),'[]') from public.question_sets s where s.user_id=uid and public.has_feature('questions')),
   'cases',(select coalesce(jsonb_agg(to_jsonb(c)),'[]') from (select id,title,specialty,difficulty from public.clinical_cases where active and public.has_feature('plantao') order by title limit 200)c),
   'is_admin',admin,'access',jsonb_build_object('questions',public.has_feature('questions'),'flashcards',public.has_feature('flashcards'),'simulator',public.has_feature('plantao')));
 end if;
 if p_action in ('start_flashcards','start_simulator') then
  if not admin then raise exception 'Somente administradores escolhem a atividade coletiva'; end if;
  perform pg_advisory_xact_lock(hashtext(r::text),3);perform private.social_rate('native_activity_start',20,60);
  if exists(select 1 from public.study_room_rounds where room_id=r and revealed_at is null) then raise exception 'Conclua a rodada de questões antes de trocar a atividade'; end if;
  if p_action='start_flashcards' then
   if not public.has_feature('flashcards') then raise exception 'Acesso a flashcards necessário'; end if;
   select array_agg(value::uuid) into ids from jsonb_array_elements_text(p_payload->'ids');
   if cardinality(ids) is null or cardinality(ids) not between 1 and 100 or cardinality(ids)<>(select count(distinct x) from unnest(ids)x) then raise exception 'Selecione de 1 a 100 cards diferentes'; end if;
   if (select count(*) from public.flashcards where id=any(ids) and active and (user_id=uid or library_scope='system'))<>cardinality(ids) then raise exception 'Deck indisponível ou sem permissão para compartilhar'; end if;
   update public.study_room_activities set active=false,updated_at=now() where room_id=r and active;
   insert into public.study_room_activities(room_id,created_by,kind,title,card_ids) values(r,uid,'flashcards',left(coalesce(nullif(trim(p_payload->>'title'),''),'Revisão de flashcards'),160),ids) returning * into a;
  else
   if not public.has_feature('plantao') then raise exception 'Acesso ao simulador necessário'; end if;
   if not exists(select 1 from public.clinical_cases where id=(p_payload->>'case_id')::uuid and active) then raise exception 'Caso indisponível'; end if;
   update public.study_room_activities set active=false,updated_at=now() where room_id=r and active;
   insert into public.study_room_activities(room_id,created_by,kind,title,case_id) select r,uid,'simulator',left(title,160),id from public.clinical_cases where id=(p_payload->>'case_id')::uuid returning * into a;
  end if;
  return jsonb_build_object('id',a.id);
 end if;
 select * into a from public.study_room_activities where room_id=r order by active desc,created_at desc,id desc limit 1;
 if a.id is null then return null; end if;
 if private.social_blocked(a.created_by) then raise exception 'Atividade indisponível'; end if;
 if p_action<>'snapshot' then
  if a.id is distinct from (p_payload->>'activity_id')::uuid or not a.active then raise exception 'A atividade mudou. Atualize a sala.'; end if;
  perform pg_advisory_xact_lock(hashtext(r::text),3);perform private.social_rate('native_activity_commands',120,60);
  -- Re-read after locking so two concurrent advances cannot skip a card.
  select * into a from public.study_room_activities where id=a.id for update;
  if not a.active then raise exception 'A atividade foi encerrada'; end if;
  if p_action='end' and admin then update public.study_room_activities set active=false,updated_at=now() where id=a.id;return '{}';
  elsif p_action in ('reveal','next','rate') and a.kind='flashcards' then
   if not public.has_feature('flashcards') then raise exception 'Acesso a flashcards necessário'; end if;
   if a.ordinal is distinct from (p_payload->>'ordinal')::integer then raise exception 'O flashcard mudou'; end if;
   if p_action='reveal' and admin then update public.study_room_activities set revealed=true,updated_at=now() where id=a.id;
   elsif p_action='next' and admin and a.revealed and a.ordinal+1<cardinality(a.card_ids) then update public.study_room_activities set ordinal=ordinal+1,revealed=false,updated_at=now() where id=a.id;
   elsif p_action='rate' and a.revealed then
    if coalesce(p_payload->>'rating','') not in ('hard','medium','easy') then raise exception 'Avaliação inválida'; end if;
    insert into private.study_room_activity_responses(activity_id,ordinal,user_id,rating) values(a.id,a.ordinal,uid,p_payload->>'rating') on conflict do nothing;
    update public.study_room_activities set updated_at=now() where id=a.id;
   else raise exception 'Ação indisponível para este participante ou flashcard'; end if;
   return '{}';
  elsif p_action='simulation_leave' and a.kind='simulator' then
   delete from private.study_room_activity_responses where activity_id=a.id and user_id=uid;
   update public.study_room_activities set updated_at=now() where id=a.id;return '{}';
  elsif p_action='simulation_join' and a.kind='simulator' then
   if not public.has_feature('plantao') then raise exception 'Acesso ao simulador necessário'; end if;
   select * into cs from public.clinical_case_sessions where id=(p_payload->>'clinical_session_id')::uuid and user_id=uid and case_id=a.case_id and started_at>=a.created_at;
   if not found then raise exception 'Sessão clínica inválida'; end if;
   insert into private.study_room_activity_responses(activity_id,ordinal,user_id,clinical_session_id) values(a.id,0,uid,cs.id)
    on conflict(activity_id,ordinal,user_id) do update set clinical_session_id=excluded.clinical_session_id;
   update public.study_room_activities set updated_at=now() where id=a.id;return '{}';
  end if;
  raise exception 'Ação não autorizada';
 end if;
 result:=jsonb_build_object('id',a.id,'created_at',a.created_at,'kind',a.kind,'title',a.title,'active',a.active,'ordinal',a.ordinal,'revealed',a.revealed,'is_admin',admin);
 if a.kind='flashcards' then
  if not public.has_feature('flashcards') then return result||jsonb_build_object('restricted',true); end if;
  select * into f from public.flashcards where id=a.card_ids[a.ordinal+1] and active and (user_id=a.created_by or library_scope='system');
  if not found then return result||jsonb_build_object('unavailable',true); end if;
  select coalesce(jsonb_agg(jsonb_build_object('user_id',m.user_id,'name',p.display_name,'ready',s.user_id is not null,'rating',case when a.revealed then s.rating end)),'[]') into users
   from public.study_room_members m join public.profiles p on p.user_id=m.user_id left join private.study_room_activity_responses s on s.activity_id=a.id and s.ordinal=a.ordinal and s.user_id=m.user_id
   where m.room_id=r and m.admitted_until>now() and not m.kicked and not private.social_blocked(m.user_id);
  return result||jsonb_build_object('total',cardinality(a.card_ids),'front',f.front_text,'front_image',f.front_image_path,
   'back',case when a.revealed or not a.active then f.back_text end,'back_image',case when a.revealed or not a.active then f.back_image_path end,
   'my_rating',(select rating from private.study_room_activity_responses where activity_id=a.id and ordinal=a.ordinal and user_id=uid),'participants',users);
 else
  if not public.has_feature('plantao') then return result||jsonb_build_object('restricted',true); end if;
  select not exists(select 1 from public.study_room_members m left join private.study_room_activity_responses s on s.activity_id=a.id and s.user_id=m.user_id left join public.clinical_case_sessions c on c.id=s.clinical_session_id
   where m.room_id=r and m.admitted_until>now() and not m.kicked and not private.social_blocked(m.user_id) and coalesce(c.status,'')<>'completed') into all_done;
  select coalesce(jsonb_agg(jsonb_build_object('user_id',m.user_id,'name',p.display_name,'status',coalesce(c.status,'not_started'),'score',case when all_done or not a.active then c.score end,'elapsed_minutes',c.elapsed_minutes)),'[]') into users
   from public.study_room_members m join public.profiles p on p.user_id=m.user_id left join private.study_room_activity_responses s on s.activity_id=a.id and s.user_id=m.user_id left join public.clinical_case_sessions c on c.id=s.clinical_session_id
   where m.room_id=r and m.admitted_until>now() and not m.kicked and not private.social_blocked(m.user_id);
  return result||jsonb_build_object('case_id',a.case_id,'participants',users,'results_revealed',all_done or not a.active);
 end if;
end $$;
create function public.social_native_activity(p_action text,p_payload jsonb default '{}') returns jsonb language sql security invoker set search_path='' as $$select private.social_native_activity($1,$2)$$;
revoke all on function private.social_native_activity(text,jsonb),public.social_native_activity(text,jsonb) from public,anon;
grant execute on function private.social_native_activity(text,jsonb),public.social_native_activity(text,jsonb) to authenticated;
alter publication supabase_realtime add table public.study_room_activities;
-- A private helper checks image scope without being limited by the owner's library RLS.
create function private.social_native_image(image_path text) returns boolean language sql stable security definer set search_path='' as $$
 select auth.uid() is not null and public.has_feature('flashcards') and exists(
  select 1 from public.study_room_activities a join public.flashcards f on f.id=a.card_ids[a.ordinal+1]
  where a.active and a.kind='flashcards' and private.social_room_member(a.room_id) and not private.social_blocked(a.created_by)
   and f.active and (f.user_id=a.created_by or f.library_scope='system')
   and (image_path=f.front_image_path or (a.revealed and image_path=f.back_image_path))
 )
$$;
revoke all on function private.social_native_image(text) from public,anon;
grant execute on function private.social_native_image(text) to authenticated;
create policy room_current_flashcard_image on storage.objects for select to authenticated using(bucket_id='docmap' and private.social_native_image(name));
create function private.social_guard_native_round() returns trigger language plpgsql security definer set search_path='' as $$
begin
 if exists(select 1 from public.study_room_activities where room_id=new.room_id and active) then raise exception 'Encerre a atividade atual antes de iniciar questões'; end if;
 return new;
end $$;
revoke all on function private.social_guard_native_round() from public,anon,authenticated;
create trigger social_guard_native_round before insert on public.study_room_rounds for each row execute function private.social_guard_native_round();
