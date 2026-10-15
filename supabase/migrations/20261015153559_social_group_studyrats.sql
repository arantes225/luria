-- Group-scoped races; requires 20261015153556_social_group_competition.sql.
-- Legacy challenges keep a NULL group_id and are never reassigned or deleted.
begin;
alter table public.studyrats_challenges add column if not exists group_id uuid references public.study_groups(id);
create index if not exists studyrats_challenges_group_created on public.studyrats_challenges(group_id,created_at desc) where group_id is not null;

do $scope$
declare source text; grouped text; name text;
begin
 source=pg_get_functiondef('private.my_studyrats_challenges_v3()'::regprocedure);
 if position('private.group_studyrats_rows' in source)>0 then raise exception 'Definição legada inválida'; end if;
 grouped=replace(source,'private.my_studyrats_challenges_v3()','private.group_studyrats_rows(p_group_id uuid)');
 if grouped=source then raise exception 'Assinatura Study Rats alterada'; end if;
 if position('join public.studyrats_participants me on me.challenge_id = c.id' in grouped)=0 or position('where me.user_id = auth.uid()' in grouped)=0 then raise exception 'Consulta Study Rats alterada'; end if;
 grouped=replace(grouped,'join public.studyrats_participants me on me.challenge_id = c.id','');
 grouped=replace(grouped,'where me.user_id = auth.uid()', 'where c.group_id = p_group_id and private.social_group_member(p_group_id) and exists(select 1 from public.study_groups g where g.id=p_group_id and g.competitive)');
 grouped=replace(grouped,'and c.group_id is null','');
 grouped=replace(grouped,$needle$and c.status <> 'cancelled'$needle$,$bounded$and c.status <> 'cancelled' order by c.created_at desc limit 50$bounded$);
 if position('left join public.profiles p on p.user_id = sp.user_id' in grouped)=0 then raise exception 'Perfis Study Rats alterados'; end if;
 grouped=replace(grouped,'left join public.profiles p on p.user_id = sp.user_id','join public.profiles p on p.user_id = sp.user_id and p.share_study_status and not private.social_blocked(p.user_id) and exists(select 1 from public.study_group_members gm where gm.group_id=p_group_id and gm.user_id=p.user_id)');
 execute grouped;
 -- Old endpoints remain available for old races only. A former member cannot
 -- use one to retrieve a grouped race after losing access or disabling competition.
 foreach name in array array['my_studyrats_challenges_v2','my_studyrats_challenges_v3'] loop
  source=pg_get_functiondef(to_regprocedure('private.'||name||'()'));
  if source is null then continue; end if;
  if position('and c.group_id is null' in source)>0 then continue; end if;
  if position($needle$and c.status <> 'cancelled'$needle$ in source)=0 then raise exception 'Consulta legada % alterada',name; end if;
  execute replace(source,$needle$and c.status <> 'cancelled'$needle$,$guard$and c.status <> 'cancelled' and c.group_id is null$guard$);
 end loop;
end
$scope$;
create or replace function private.is_studyrats_participant(p_challenge_id uuid) returns boolean language sql stable security definer set search_path='' as $$
 select auth.uid() is not null and exists(select 1 from public.studyrats_participants sp join public.studyrats_challenges c on c.id=sp.challenge_id
 where sp.challenge_id=p_challenge_id and sp.user_id=auth.uid() and (c.group_id is null or (private.social_group_member(c.group_id) and exists(select 1 from public.study_groups g where g.id=c.group_id and g.competitive))))
$$;
revoke all on function private.is_studyrats_participant(uuid) from public,anon;
grant execute on function private.is_studyrats_participant(uuid) to authenticated;
do $legacy_delete$
declare source text;
begin
 if to_regprocedure('private.delete_studyrats_challenge(uuid)') is null then return; end if;
 source=pg_get_functiondef('private.delete_studyrats_challenge(uuid)'::regprocedure);
 if position('and group_id is null' in source)>0 then return; end if;
 if position('where id=p_challenge_id and creator_user_id=auth.uid()' in source)=0 then raise exception 'Exclusão legada alterada: revisar antes de aplicar'; end if;
 execute replace(source,'where id=p_challenge_id and creator_user_id=auth.uid()','where id=p_challenge_id and creator_user_id=auth.uid() and group_id is null');
end
$legacy_delete$;
revoke all on function private.group_studyrats_rows(uuid) from public,anon,authenticated;

create or replace function private.group_studyrats(p_action text,p_payload jsonb default '{}') returns jsonb
language plpgsql security definer set search_path='' as $$
declare uid uuid:=auth.uid(); g uuid:=nullif(p_payload->>'group_id','')::uuid; c uuid; deadline date; kind text; result jsonb;
begin
 if uid is null or not private.social_group_member(g) then raise exception 'Acesso restrito aos membros do grupo'; end if;
 if octet_length(p_payload::text)>4000 then raise exception 'Requisição muito grande'; end if;
 perform 1 from public.study_groups where id=g and competitive for share;
 if not found then raise exception 'Competição indisponível neste grupo'; end if;
 if p_action='create' then
  if not exists(select 1 from public.study_group_members where group_id=g and user_id=uid and role='admin') then raise exception 'Somente administradores'; end if;
  if not exists(select 1 from public.profiles where user_id=uid and share_study_status) then raise exception 'Ative o compartilhamento do status de estudo para participar'; end if;
  if length(trim(coalesce(p_payload->>'title',''))) not between 1 and 80 then raise exception 'Título inválido'; end if;
  kind=p_payload->>'type';deadline=(p_payload->>'deadline')::date;
  if kind is null or kind not in ('flashcards','study_days','ccqs','classes') then raise exception 'Métrica indisponível'; end if;
  if deadline is null or deadline<current_date or deadline>current_date+366 then raise exception 'Período inválido'; end if;
  insert into public.studyrats_challenges(creator_user_id,title,challenge_type,goal,deadline,group_id) values(uid,trim(p_payload->>'title'),kind,1,deadline,g) returning id into c;
  insert into public.studyrats_participants(challenge_id,user_id) values(c,uid);
  return jsonb_build_object('id',c);
 elsif p_action='join' then
  c=(p_payload->>'challenge_id')::uuid;
  perform 1 from public.studyrats_challenges ch where ch.id=c and ch.group_id=g and ch.status='active' and ch.deadline>=current_date for share;
  if not found then raise exception 'Desafio indisponível neste grupo'; end if;
  if not exists(select 1 from public.profiles where user_id=uid and share_study_status) then raise exception 'Ative o compartilhamento do status de estudo para participar'; end if;
  insert into public.studyrats_participants(challenge_id,user_id) values(c,uid) on conflict do nothing;
  return '{}';
 elsif p_action<>'snapshot' then raise exception 'Operação inválida'; end if;
 select jsonb_build_object('rows',coalesce((select jsonb_agg(to_jsonb(r)) from private.group_studyrats_rows(g) r),'[]'),
 'challenges',coalesce((select jsonb_agg(to_jsonb(x)) from (select ch.id,ch.title,ch.deadline,ch.challenge_type,
  case when ch.deadline<current_date then 'finished' else ch.status end status,
  exists(select 1 from public.studyrats_participants sp where sp.challenge_id=ch.id and sp.user_id=uid) joined
  from public.studyrats_challenges ch where ch.group_id=g and ch.status<>'cancelled' order by ch.created_at desc limit 50)x),'[]')) into result;
 return result;
end;
$$;
create or replace function public.group_studyrats(p_action text,p_payload jsonb default '{}') returns jsonb language sql set search_path='' as $$select private.group_studyrats($1,$2)$$;
revoke all on function private.group_studyrats(text,jsonb),public.group_studyrats(text,jsonb) from public,anon;
grant execute on function private.group_studyrats(text,jsonb),public.group_studyrats(text,jsonb) to authenticated;
do $capability$
declare source text:=pg_get_functiondef('private.social_snapshot(uuid)'::regprocedure);
begin
 if position('group_studyrats_available' in source)>0 then return; end if;
 if position('group_competition_available' in source)=0 then raise exception 'Configuração competitiva ausente'; end if;
 execute replace(source,'''group_competition_available'',true','''group_studyrats_available'',true,''group_competition_available'',true');
end
$capability$;
commit;
