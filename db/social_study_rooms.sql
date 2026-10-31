-- Prepared change, NOT applied to production. Execute once in staging first.
-- Existing friendships remain accepted; sprites, offsets, scoring and questions are untouched.
begin;
create schema if not exists private;
alter table public.friendships add column if not exists status text not null default 'accepted' check (status in ('pending','accepted'));
alter table public.profiles add column if not exists social_discoverable boolean not null default false;
alter table public.profiles add column if not exists share_study_status boolean not null default false;
alter table public.profiles add column if not exists avatar_url text check(avatar_url is null or (length(avatar_url)<=1000 and avatar_url ~ '^https://'));

create table public.user_blocks (
 user_id uuid not null references auth.users(id) on delete cascade,
 blocked_user_id uuid not null references auth.users(id) on delete cascade,
 created_at timestamptz not null default now(), primary key(user_id,blocked_user_id), check(user_id<>blocked_user_id)
);
create index user_blocks_target on public.user_blocks(blocked_user_id,user_id);
create table public.study_groups (
 id uuid primary key default gen_random_uuid(), owner_id uuid not null references auth.users(id) on delete cascade,
 name text not null check(length(trim(name)) between 1 and 80), description text not null default '' check(length(description)<=500),
 area text not null default '' check(length(area)<=80), objective text not null default '' check(length(objective)<=200),
 created_at timestamptz not null default now()
);
create table public.study_group_members (
 group_id uuid not null references public.study_groups(id) on delete cascade, user_id uuid not null references auth.users(id) on delete cascade,
 role text not null default 'member' check(role in ('admin','member')), joined_at timestamptz not null default now(), primary key(group_id,user_id)
);
create index study_group_members_user on public.study_group_members(user_id,group_id);
create table private.social_group_invites (group_id uuid primary key references public.study_groups(id) on delete cascade, code text not null unique default replace(gen_random_uuid()::text,'-',''), expires_at timestamptz not null default now()+interval '7 days');
create table public.study_rooms (
 id uuid primary key default gen_random_uuid(), owner_id uuid not null references auth.users(id) on delete cascade, group_id uuid references public.study_groups(id) on delete set null,
 name text not null check(length(trim(name)) between 1 and 80), description text not null default '' check(length(description)<=500),
 area text not null default '' check(length(area)<=80), subject text not null default '' check(length(subject)<=80),
 objective text not null default '' check(length(objective)<=200), visibility text not null check(visibility in ('public','private')),
 capacity integer not null default 6 check(capacity between 2 and 8), mode text not null default 'free' check(mode in ('free','focus','together','review')),
 duration_minutes integer not null default 50 check(duration_minutes between 5 and 240), focus_minutes integer not null default 25 check(focus_minutes between 5 and 120),
 break_minutes integer not null default 5 check(break_minutes between 1 and 30), voice_enabled boolean not null default false,
 spotify_url text check(spotify_url ~ '^https://open[.]spotify[.]com/(playlist|album|track)/[A-Za-z0-9]+$'),
 archived_at timestamptz, created_at timestamptz not null default now()
);
create index study_rooms_hall on public.study_rooms(created_at desc,id) where archived_at is null;
create index study_rooms_owner on public.study_rooms(owner_id);
create index study_rooms_group on public.study_rooms(group_id);
create table private.social_room_invites (room_id uuid primary key references public.study_rooms(id) on delete cascade, code text not null unique default replace(gen_random_uuid()::text,'-',''), expires_at timestamptz not null default now()+interval '7 days');
create table public.study_room_members (
 room_id uuid not null references public.study_rooms(id) on delete cascade, user_id uuid not null references auth.users(id) on delete cascade,
 role text not null default 'member' check(role in ('admin','member')), admitted_until timestamptz not null default now()+interval '8 hours',
 joined_at timestamptz not null default now(), last_read_at timestamptz not null default now(), kicked boolean not null default false,
 primary key(room_id,user_id)
);
create index study_room_members_user on public.study_room_members(user_id,room_id);
create table public.study_room_sessions (
 id uuid primary key default gen_random_uuid(), room_id uuid not null references public.study_rooms(id) on delete cascade,
 mode text not null check(mode in ('free','focus','together','review')), phase text not null default 'focus' check(phase in ('focus','break')),
 status text not null default 'running' check(status in ('running','paused','finished')),
 duration_seconds integer not null check(duration_seconds between 60 and 14400), remaining_seconds integer not null check(remaining_seconds between 0 and 14400),
 ends_at timestamptz, objective text not null default '' check(length(objective)<=200),
 created_by uuid not null references auth.users(id) on delete cascade, created_at timestamptz not null default now(), finished_at timestamptz
);
create unique index study_room_session_active on public.study_room_sessions(room_id) where status<>'finished';
create index study_room_sessions_history on public.study_room_sessions(room_id,created_at desc);
create table public.study_room_messages (
 id uuid primary key default gen_random_uuid(), room_id uuid not null references public.study_rooms(id) on delete cascade, user_id uuid not null references auth.users(id) on delete cascade,
 body text not null default '' check(length(body)<=2000), reply_to uuid references public.study_room_messages(id) on delete set null,
 attachment_path text, attachment_name text check(length(attachment_name)<=160), client_id uuid not null,
 created_at timestamptz not null default now(), moderated boolean not null default false,
 check(length(trim(body))>0 or attachment_path is not null), unique(user_id,client_id)
);
create index study_room_messages_history on public.study_room_messages(room_id,created_at desc,id);
create index study_room_messages_author on public.study_room_messages(user_id,created_at desc);
create index study_room_messages_reply on public.study_room_messages(reply_to);
create table public.study_room_reactions (
 message_id uuid not null references public.study_room_messages(id) on delete cascade, user_id uuid not null references auth.users(id) on delete cascade,
 reaction text not null check(reaction in ('thanks','agree','celebrate')), primary key(message_id,user_id,reaction)
);
create index study_room_reactions_user on public.study_room_reactions(user_id);
create table public.study_room_checklist (
 id uuid primary key default gen_random_uuid(), room_id uuid not null references public.study_rooms(id) on delete cascade,
 title text not null check(length(trim(title)) between 1 and 160), completed boolean not null default false,
 created_by uuid not null references auth.users(id) on delete cascade, created_at timestamptz not null default now()
);
create index study_room_checklist_room on public.study_room_checklist(room_id,created_at);
create table public.study_room_resources (
 id uuid primary key default gen_random_uuid(), room_id uuid not null references public.study_rooms(id) on delete cascade,
 title text not null check(length(trim(title)) between 1 and 100), url text not null check(length(url)<=1000 and url ~ '^https://'),
 review_on date, created_by uuid not null references auth.users(id) on delete cascade, created_at timestamptz not null default now()
);
create index study_room_resources_room on public.study_room_resources(room_id,created_at);
create table public.study_room_rounds (
 id uuid primary key default gen_random_uuid(), room_id uuid not null references public.study_rooms(id) on delete cascade, session_id uuid not null references public.study_room_sessions(id) on delete cascade,
 set_id uuid not null references public.question_sets(id) on delete cascade, question_id uuid not null references public.question_items(id) on delete cascade,
 ordinal integer not null default 0, cohort uuid[] not null, deadline timestamptz not null, revealed_at timestamptz, scored_at timestamptz, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create index study_room_rounds_room on public.study_room_rounds(room_id,created_at desc);
create index study_room_rounds_session on public.study_room_rounds(session_id);
create index study_room_rounds_question on public.study_room_rounds(question_id);
create index study_room_rounds_set on public.study_room_rounds(set_id);
create index study_groups_owner on public.study_groups(owner_id);
create index study_room_checklist_author on public.study_room_checklist(created_by);
create index study_room_resources_author on public.study_room_resources(created_by);
create index study_room_sessions_author on public.study_room_sessions(created_by);
create table private.social_round_answers (
 round_id uuid not null references public.study_room_rounds(id) on delete cascade, user_id uuid not null references auth.users(id) on delete cascade,
 choice text not null check(choice ~ '^[A-E]$'), answered_at timestamptz not null default now(), primary key(round_id,user_id)
);
create table private.social_rate_limits (user_id uuid not null references auth.users(id) on delete cascade, bucket text not null, window_at timestamptz not null default now(), count integer not null default 1, primary key(user_id,bucket));
create index social_round_answers_user on private.social_round_answers(user_id);
revoke all on private.social_rate_limits,private.social_round_answers,private.social_room_invites,private.social_group_invites from public,anon,authenticated;
alter table private.social_round_answers enable row level security;
alter table private.social_rate_limits enable row level security;
alter table private.social_room_invites enable row level security;
alter table private.social_group_invites enable row level security;

create function private.social_blocked(other uuid) returns boolean language sql stable security definer set search_path='' as $$
 select (select auth.uid()) is null or exists(select 1 from public.user_blocks b where (b.user_id=(select auth.uid()) and b.blocked_user_id=other) or (b.blocked_user_id=(select auth.uid()) and b.user_id=other))
$$;
create function private.social_group_member(g uuid) returns boolean language sql stable security definer set search_path='' as $$
 select (select auth.uid()) is not null and exists(select 1 from public.study_group_members m join public.study_groups s on s.id=m.group_id where m.group_id=g and m.user_id=(select auth.uid()) and not private.social_blocked(s.owner_id))
$$;
create function private.social_room_member(r uuid) returns boolean language sql stable security definer set search_path='' as $$
 select (select auth.uid()) is not null and exists(select 1 from public.study_room_members m join public.study_rooms s on s.id=m.room_id where m.room_id=r and m.user_id=(select auth.uid()) and not m.kicked and m.admitted_until>now() and s.archived_at is null and not private.social_blocked(s.owner_id))
$$;
create function private.social_room_admin(r uuid) returns boolean language sql stable security definer set search_path='' as $$
 select private.social_room_member(r) and exists(select 1 from public.study_rooms s where s.id=r and (s.owner_id=(select auth.uid()) or exists(select 1 from public.study_room_members m where m.room_id=r and m.user_id=(select auth.uid()) and m.role='admin')))
$$;
create function private.social_room_visible(r uuid) returns boolean language sql stable security definer set search_path='' as $$
 select (select auth.uid()) is not null and exists(select 1 from public.study_rooms s where s.id=r and s.archived_at is null and not private.social_blocked(s.owner_id) and (s.visibility='public' or s.owner_id=(select auth.uid()) or exists(select 1 from public.study_room_members m where m.room_id=r and m.user_id=(select auth.uid()) and not m.kicked) or private.social_group_member(s.group_id)))
$$;
create function private.social_rate(bucket_name text,max_count integer,seconds integer) returns void language plpgsql security definer set search_path='' as $$
 declare hits integer;
 begin
  if auth.uid() is null then raise exception 'Autenticação obrigatória'; end if;
  insert into private.social_rate_limits as l(user_id,bucket) values(auth.uid(),bucket_name)
  on conflict(user_id,bucket) do update set count=case when l.window_at<now()-make_interval(secs=>seconds) then 1 else l.count+1 end, window_at=case when l.window_at<now()-make_interval(secs=>seconds) then now() else l.window_at end returning count into hits;
  if hits>max_count then raise exception 'Muitas tentativas. Aguarde um pouco.'; end if;
 end;
$$;

create function private.social_alternatives(value jsonb) returns jsonb language sql immutable set search_path='' as $$
 select case when jsonb_typeof(value)='array' then
  (select coalesce(jsonb_agg(case when jsonb_typeof(v)='string' then v#>>'{}' else coalesce(v->>'text',v->>'texto',v->>'label',v->>'content',v->>'value','') end order by i),'[]') from jsonb_array_elements(value) with ordinality a(v,i) where i<=5)
 when jsonb_typeof(value)='object' then
  (select coalesce(jsonb_object_agg(upper(k),case when jsonb_typeof(v)='string' then v#>>'{}' else coalesce(v->>'text',v->>'texto',v->>'label',v->>'content',v->>'value','') end),'{}') from jsonb_each(value) a(k,v) where k ~ '^[A-Ea-e]$')
 else '{}'::jsonb end
$$;
revoke all on function private.social_alternatives(jsonb) from public,anon,authenticated;

-- Keep the current public RPC signatures. Preserve old accepted edges.
create or replace function private.add_friend_by_traube_id(p_traube_id text) returns uuid language plpgsql security definer set search_path='' as $$
 declare friend uuid;
 begin
  perform private.social_rate('friend_request',20,3600);
  select p.user_id into friend from public.profiles p where p.traube_id=upper(trim(p_traube_id));
  if friend is null or friend=auth.uid() or private.social_blocked(friend) then raise exception 'Perfil indisponível'; end if;
  perform pg_advisory_xact_lock(hashtext(least(friend::text,auth.uid()::text)),hashtext(greatest(friend::text,auth.uid()::text)));
  if exists(select 1 from public.friendships f where (f.user_id=auth.uid() and f.friend_user_id=friend) or (f.friend_user_id=auth.uid() and f.user_id=friend)) then return friend; end if;
  insert into public.friendships(user_id,friend_user_id,status) values(auth.uid(),friend,'pending');
  return friend;
 end;
$$;
create or replace function private.my_friends() returns table(user_id uuid,traube_id text,display_name text,specialty text,created_at timestamptz) language sql stable security definer set search_path='' as $$
 with edges as (
  select f.friend_user_id friend_id,f.created_at from public.friendships f where f.user_id=(select auth.uid()) and f.status='accepted'
  union all select f.user_id,f.created_at from public.friendships f where f.friend_user_id=(select auth.uid()) and f.status='accepted'
 ) select p.user_id,p.traube_id,p.display_name,p.specialty,min(e.created_at) from edges e join public.profiles p on p.user_id=e.friend_id where not private.social_blocked(p.user_id) group by p.user_id,p.traube_id,p.display_name,p.specialty order by min(e.created_at) desc;
$$;
create or replace function private.lookup_traube_user(p_traube_id text) returns table(user_id uuid,traube_id text,display_name text,specialty text) language sql stable security definer set search_path='' as $$
 select p.user_id,p.traube_id,p.display_name,p.specialty from public.profiles p where p.traube_id=upper(trim(p_traube_id)) and p.user_id<>(select auth.uid()) and not private.social_blocked(p.user_id) limit 1;
$$;

-- New requests must not be usable to enroll an unconsenting user in a race.
create or replace function private.create_studyrats_challenge_v2(p_title text,p_challenge_type text,p_goal numeric,p_deadline date,p_friend_user_ids uuid[] default '{}') returns uuid language plpgsql security definer set search_path='' as $$
 declare uid uuid:=auth.uid(); challenge uuid; friend uuid;
 begin
  if uid is null then raise exception 'Usuário não autenticado'; end if;
  if length(trim(coalesce(p_title,''))) not between 1 and 80 then raise exception 'Título deve ter entre 1 e 80 caracteres'; end if;
  if p_challenge_type not in ('flashcards','study_days','retention','classes','ccqs') then raise exception 'Tipo de desafio inválido'; end if;
  if p_goal is null or p_goal<=0 then raise exception 'Meta inválida'; end if;
  if p_deadline is null or p_deadline<current_date then raise exception 'Data limite inválida'; end if;
  insert into public.studyrats_challenges(creator_user_id,title,challenge_type,goal,deadline) values(uid,trim(p_title),p_challenge_type,p_goal,p_deadline) returning id into challenge;
  insert into public.studyrats_participants(challenge_id,user_id) values(challenge,uid);
  foreach friend in array coalesce(p_friend_user_ids,'{}') loop
   if friend=uid then continue; end if;
   if not exists(select 1 from private.my_friends() f where f.user_id=friend) then raise exception 'Participante não é seu amigo no TRAUBE'; end if;
   insert into public.studyrats_participants(challenge_id,user_id) values(challenge,friend) on conflict do nothing;
  end loop;
  return challenge;
 end;
$$;
revoke all on function private.create_studyrats_challenge_v2(text,text,numeric,date,uuid[]) from public,anon;
grant execute on function private.create_studyrats_challenge_v2(text,text,numeric,date,uuid[]) to authenticated;

create function private.social_quiz_snapshot(r uuid) returns jsonb language plpgsql security definer set search_path='' as $$
 declare round public.study_room_rounds; item public.question_items; answered integer; result jsonb; refs jsonb;
 begin
  if not private.social_room_member(r) then raise exception 'Acesso negado'; end if;
  select * into round from public.study_room_rounds where room_id=r order by created_at desc,id desc limit 1 for update;
  if round.id is null then return null; end if;
  if not public.has_feature('questions') then return jsonb_build_object('restricted',true); end if;
  select count(*) into answered from private.social_round_answers a where a.round_id=round.id and a.user_id=any(round.cohort);
  if round.revealed_at is null and (now()>=round.deadline or answered>=cardinality(round.cohort)) then
   update public.study_room_rounds set revealed_at=now() where id=round.id and revealed_at is null returning revealed_at into round.revealed_at;
  end if;
  select * into item from public.question_items where id=round.question_id;
  if round.revealed_at is not null and round.scored_at is null then
   -- Keep the existing one-attempt-per-user/item contract. Never overwrite individual answers.
   if upper(item.official_answer) ~ '^[A-E]$' then
    insert into public.question_attempts(user_id,question_item_id,result,selected_option,correct_option,area,materia,answered_at)
     select a.user_id,item.id,case when a.choice=upper(item.official_answer) then 'correct' else 'wrong' end,a.choice,upper(item.official_answer),item.area,item.materia,a.answered_at
     from private.social_round_answers a where a.round_id=round.id on conflict(user_id,question_item_id) do nothing;
   end if;
   update public.study_room_rounds set scored_at=now() where id=round.id;
  end if;
  result=jsonb_build_object('id',round.id,'set_id',round.set_id,'ordinal',round.ordinal,'stem',item.stem,'alternatives',private.social_alternatives(item.alternatives),'deadline',round.deadline,'revealed_at',round.revealed_at,'answered',answered,'total',cardinality(round.cohort),'eligible',auth.uid()=any(round.cohort),'my_choice',(select choice from private.social_round_answers where round_id=round.id and user_id=auth.uid()),'responded',(select coalesce(jsonb_agg(user_id),'[]') from private.social_round_answers where round_id=round.id and not private.social_blocked(user_id)));
  if round.revealed_at is not null then
   select coalesce(jsonb_agg(jsonb_build_object('institution',s.institution,'document',s.document,'year',s.source_year,'url',s.url,'section',s.section)),'[]') into refs from public.question_bank b join public.question_sources s on s.id=b.source_id or s.id=b.answer_source_id where b.id=item.question_bank_id;
   result=result||jsonb_build_object('answer',item.official_answer,'comment',item.pulo_do_gato,'explanations',item.answer_explanations,'source',item.source_label,'references',refs,'results',(select coalesce(jsonb_agg(jsonb_build_object('user_id',a.user_id,'choice',a.choice,'correct',a.choice=upper(item.official_answer))),'[]') from private.social_round_answers a where a.round_id=round.id and not private.social_blocked(a.user_id)));
  end if;
  return result;
 end;
$$;

create function private.social_snapshot(p_room_id uuid default null) returns jsonb language plpgsql security definer set search_path='' as $$
 declare result jsonb; room public.study_rooms; latest public.study_room_sessions; cycle_seconds integer; elapsed_seconds integer; next_seconds integer; next_phase text;
 begin
  if auth.uid() is null then raise exception 'Autenticação obrigatória'; end if;
  if p_room_id is null then
   select jsonb_build_object('discoverable',social_discoverable,'share_status',share_study_status) into result from public.profiles where user_id=auth.uid();
   result=coalesce(result,'{}')||jsonb_build_object(
    'requests',(select coalesce(jsonb_agg(jsonb_build_object('id',f.id,'incoming',f.friend_user_id=auth.uid(),'user_id',p.user_id,'name',p.display_name,'traube_id',p.traube_id)),'[]') from public.friendships f join public.profiles p on p.user_id=case when f.user_id=auth.uid() then f.friend_user_id else f.user_id end where (f.user_id=auth.uid() or f.friend_user_id=auth.uid()) and f.status='pending' and not private.social_blocked(p.user_id)),
    'groups',(select coalesce(jsonb_agg(to_jsonb(g)||jsonb_build_object('role',m.role,'members',(select count(*) from public.study_group_members where group_id=g.id),'invite',case when m.role='admin' then (select code from private.social_group_invites where group_id=g.id and expires_at>now()) end)),'[]') from public.study_groups g join public.study_group_members m on m.group_id=g.id and m.user_id=auth.uid() where not private.social_blocked(g.owner_id)),
    'friends',(select coalesce(jsonb_agg(to_jsonb(f)||jsonb_build_object('avatar_url',p.avatar_url,'share_status',p.share_study_status)),'[]') from private.my_friends() f join public.profiles p on p.user_id=f.user_id),
    'blocks',(select coalesce(jsonb_agg(jsonb_build_object('user_id',b.blocked_user_id,'name',p.display_name)),'[]') from public.user_blocks b left join public.profiles p on p.user_id=b.blocked_user_id where b.user_id=auth.uid()),
    'suggestions',(select coalesce(jsonb_agg(to_jsonb(s)),'[]') from (
     select p.user_id,p.display_name,p.traube_id,p.specialty,
      (select count(*) from public.study_group_members theirs join public.study_group_members mine on theirs.group_id=mine.group_id and mine.user_id=auth.uid() where theirs.user_id=p.user_id) as shared_groups
     from public.profiles p where p.social_discoverable and p.user_id<>auth.uid() and not private.social_blocked(p.user_id)
      and not exists(select 1 from public.friendships f where (f.user_id=auth.uid() and f.friend_user_id=p.user_id) or (f.friend_user_id=auth.uid() and f.user_id=p.user_id))
      and ((p.specialty is not null and p.specialty<>'' and p.specialty=(select specialty from public.profiles where user_id=auth.uid())) or exists(select 1 from public.study_group_members theirs join public.study_group_members mine on mine.group_id=theirs.group_id and mine.user_id=auth.uid() where theirs.user_id=p.user_id))
     order by shared_groups desc,p.display_name limit 8
    ) s));
   return result;
  end if;
  if not private.social_room_member(p_room_id) then raise exception 'Entre na sala para acessar o histórico'; end if;
  select * into room from public.study_rooms where id=p_room_id;
  select * into latest from public.study_room_sessions where room_id=p_room_id and status<>'finished' limit 1 for update;
  -- Catch up by arithmetic, not a cron or background writes every second.
  if latest.mode='focus' and latest.status='running' and latest.ends_at<=now() then
   cycle_seconds=(room.focus_minutes+room.break_minutes)*60;
   elapsed_seconds=mod(greatest(0,floor(extract(epoch from now()-latest.ends_at))::integer),cycle_seconds);
   next_seconds=case when latest.phase='focus' then room.break_minutes else room.focus_minutes end*60;
   if elapsed_seconds<next_seconds then next_phase=case when latest.phase='focus' then 'break' else 'focus' end; next_seconds=next_seconds-elapsed_seconds;
   else next_phase=latest.phase;next_seconds=cycle_seconds-elapsed_seconds;end if;
   update public.study_room_sessions set phase=next_phase,ends_at=now()+make_interval(secs=>next_seconds),duration_seconds=case when next_phase='focus' then room.focus_minutes else room.break_minutes end*60,remaining_seconds=next_seconds where id=latest.id returning * into latest;
  end if;
  result=jsonb_build_object('room',to_jsonb(room),'is_admin',private.social_room_admin(p_room_id),'session',case when latest.id is not null then to_jsonb(latest) end,'server_now',now(),
   'invite',case when private.social_room_admin(p_room_id) then (select code from private.social_room_invites where room_id=p_room_id and expires_at>now()) end,
   'members',(select coalesce(jsonb_agg(jsonb_build_object('user_id',m.user_id,'name',p.display_name,'avatar_url',p.avatar_url,'role',m.role,'share_status',p.share_study_status,'variant',p.studyrat_variant,'accessory',p.studyrat_accessory)),'[]') from public.study_room_members m join public.profiles p on p.user_id=m.user_id where m.room_id=p_room_id and not m.kicked and m.admitted_until>now() and not private.social_blocked(m.user_id)),
   'checklist',(select coalesce(jsonb_agg(to_jsonb(c) order by c.created_at),'[]') from public.study_room_checklist c where room_id=p_room_id),
   'resources',(select coalesce(jsonb_agg(to_jsonb(c) order by c.created_at desc),'[]') from public.study_room_resources c where room_id=p_room_id),
   'history',(select coalesce(jsonb_agg(to_jsonb(s)),'[]') from (select * from public.study_room_sessions where room_id=p_room_id and status='finished' order by created_at desc limit 10)s),
   'quiz',private.social_quiz_snapshot(p_room_id),
   'ranking',(select coalesce(jsonb_agg(to_jsonb(scores) order by scores.correct desc,scores.answered desc),'[]') from (
    select a.user_id,p.display_name name,count(*) answered,count(*) filter(where a.choice=upper(qi.official_answer)) correct
    from private.social_round_answers a join public.study_room_rounds qr on qr.id=a.round_id join public.question_items qi on qi.id=qr.question_id join public.profiles p on p.user_id=a.user_id
    where qr.room_id=p_room_id and qr.revealed_at is not null and not private.social_blocked(a.user_id) group by a.user_id,p.display_name
   ) scores),
   'progress',(select coalesce(jsonb_agg(jsonb_build_object('user_id',m.user_id,'name',p.display_name,'seconds',coalesce((select sum(duration_seconds) from public.study_sessions s where s.user_id=m.user_id and s.created_at>=latest.created_at),0))),'[]') from public.study_room_members m join public.profiles p on p.user_id=m.user_id where m.room_id=p_room_id and m.admitted_until>now() and not m.kicked and p.share_study_status and not private.social_blocked(m.user_id)));
  return result;
 end;
$$;

create function private.social_command(p_action text,p_payload jsonb default '{}') returns jsonb language plpgsql security definer set search_path='' as $$
 declare uid uuid:=auth.uid(); r uuid; g uuid; target uuid; room public.study_rooms; sess public.study_room_sessions; round public.study_room_rounds; item public.question_items; n integer; new_id uuid; code text; rows jsonb; choice text;
 begin
  if uid is null then raise exception 'Autenticação obrigatória'; end if;
  if octet_length(p_payload::text)>16000 then raise exception 'Requisição muito grande'; end if;
  perform private.social_rate('commands',180,60);
  r=nullif(p_payload->>'room_id','')::uuid; g=nullif(p_payload->>'group_id','')::uuid; target=nullif(p_payload->>'user_id','')::uuid;
  if p_action='list_rooms' then
   select coalesce(jsonb_agg(to_jsonb(s)),'[]') into rows from (
    select rm.*,(select count(*) from public.study_room_members where room_id=rm.id and admitted_until>now() and not kicked) as participants,
     (select count(*) from public.study_room_messages msg join public.study_room_members reader on reader.room_id=msg.room_id and reader.user_id=uid and not reader.kicked where msg.room_id=rm.id and msg.created_at>reader.last_read_at and msg.user_id<>uid and not private.social_blocked(msg.user_id)) as unread,
     exists(select 1 from public.friendships f where f.status='accepted' and ((f.user_id=uid and f.friend_user_id=rm.owner_id) or (f.friend_user_id=uid and f.user_id=rm.owner_id))) as friend_room,
     (select max(joined_at) from public.study_room_members where room_id=rm.id and user_id=uid) as last_joined,
     (select status from public.study_room_sessions where room_id=rm.id and status<>'finished' limit 1) as session_status
    from public.study_rooms rm where private.social_room_visible(rm.id)
     and (nullif(p_payload->>'mode','') is null or rm.mode=p_payload->>'mode')
     and (nullif(p_payload->>'query','') is null or (rm.name||' '||rm.subject||' '||rm.area) ilike '%'||left(p_payload->>'query',80)||'%')
     and (coalesce(p_payload->>'scope','all')='all' or (p_payload->>'scope'='public' and rm.visibility='public') or (p_payload->>'scope'='groups' and private.social_group_member(rm.group_id)) or (p_payload->>'scope'='recent' and exists(select 1 from public.study_room_members m where m.room_id=rm.id and m.user_id=uid and not m.kicked)) or (p_payload->>'scope'='friends' and exists(select 1 from public.friendships f where f.status='accepted' and ((f.user_id=uid and f.friend_user_id=rm.owner_id) or (f.friend_user_id=uid and f.user_id=rm.owner_id)))))
    order by rm.created_at desc,rm.id limit 24 offset least(240,greatest(0,coalesce((p_payload->>'offset')::integer,0)))
   ) s; return rows;
  elsif p_action='privacy' then
   update public.profiles set social_discoverable=coalesce((p_payload->>'discoverable')::boolean,false),share_study_status=coalesce((p_payload->>'share_status')::boolean,false) where user_id=uid; return '{}';
  elsif p_action='profile' then
   if private.social_blocked(target) or not exists(select 1 from private.my_friends() f where f.user_id=target) then raise exception 'Perfil indisponível'; end if;
   return (select jsonb_build_object('name',display_name,'traube_id',traube_id,'specialty',specialty,'avatar_url',avatar_url) from public.profiles where user_id=target);
  elsif p_action='friend_accept' then
   update public.friendships set status='accepted' where id=(p_payload->>'id')::uuid and friend_user_id=uid and status='pending' and not private.social_blocked(user_id); return '{}';
  elsif p_action='friend_decline' then
   delete from public.friendships where id=(p_payload->>'id')::uuid and (friend_user_id=uid or user_id=uid) and status='pending'; return '{}';
  elsif p_action='block' then
   if target is null or target=uid then raise exception 'Usuário inválido'; end if;
   insert into public.user_blocks(user_id,blocked_user_id) values(uid,target) on conflict do nothing;
   delete from public.friendships where (user_id=uid and friend_user_id=target) or (user_id=target and friend_user_id=uid);
   update public.study_room_members m set kicked=true,admitted_until=now() from public.study_rooms rm where rm.id=m.room_id and rm.owner_id=uid and m.user_id=target;
   return '{}';
  elsif p_action='unblock' then
   delete from public.user_blocks where user_id=uid and blocked_user_id=target; return '{}';
  elsif p_action='create_group' then
   perform private.social_rate('create_group',5,3600);
   insert into public.study_groups(owner_id,name,description,area,objective) values(uid,trim(p_payload->>'name'),coalesce(p_payload->>'description',''),coalesce(p_payload->>'area',''),coalesce(p_payload->>'objective','')) returning id into g;
   insert into public.study_group_members(group_id,user_id,role) values(g,uid,'admin'); insert into private.social_group_invites(group_id) values(g); return jsonb_build_object('id',g);
  elsif p_action='join_group' then
   select i.group_id into g from private.social_group_invites i where i.code=p_payload->>'code' and i.expires_at>now();
   if g is null or exists(select 1 from public.study_groups where id=g and private.social_blocked(owner_id)) then raise exception 'Convite inválido ou expirado'; end if;
   insert into public.study_group_members(group_id,user_id) values(g,uid) on conflict do nothing; return jsonb_build_object('id',g);
  elsif p_action in ('group_members','group_history','group_admin','group_remove','group_invite','group_update') then
   if not private.social_group_member(g) then raise exception 'Acesso negado'; end if;
   if p_action='group_members' then return (select coalesce(jsonb_agg(jsonb_build_object('user_id',m.user_id,'name',p.display_name,'role',m.role)),'[]') from public.study_group_members m join public.profiles p on p.user_id=m.user_id where group_id=g and not private.social_blocked(m.user_id)); end if;
   if p_action='group_history' then return (select coalesce(jsonb_agg(to_jsonb(s)),'[]') from (select ss.id,rm.name room_name,ss.mode,ss.objective,ss.created_at,ss.finished_at,ss.status from public.study_room_sessions ss join public.study_rooms rm on rm.id=ss.room_id where rm.group_id=g and not private.social_blocked(rm.owner_id) order by ss.created_at desc limit 30)s); end if;
   if not exists(select 1 from public.study_group_members where group_id=g and user_id=uid and role='admin') then raise exception 'Somente administradores'; end if;
   if p_action='group_invite' then update private.social_group_invites set code=replace(gen_random_uuid()::text,'-',''),expires_at=now()+interval '7 days' where group_id=g returning social_group_invites.code into code; return jsonb_build_object('code',code); end if;
   if p_action='group_update' then update public.study_groups set objective=coalesce(p_payload->>'objective',objective),description=coalesce(p_payload->>'description',description) where id=g; return '{}'; end if;
   if exists(select 1 from public.study_groups where id=g and owner_id=target) then raise exception 'O proprietário deve permanecer no grupo'; end if;
   if p_action='group_admin' then update public.study_group_members set role=case when (p_payload->>'admin')::boolean then 'admin' else 'member' end where group_id=g and user_id=target;
   else delete from public.study_group_members where group_id=g and user_id=target; end if; return '{}';
  elsif p_action='create_room' then
   perform private.social_rate('create_room',10,3600);
   if g is not null and not private.social_group_member(g) then raise exception 'Grupo indisponível'; end if;
   insert into public.study_rooms(owner_id,group_id,name,description,area,subject,objective,visibility,capacity,mode,duration_minutes,focus_minutes,break_minutes,voice_enabled)
   values(uid,g,trim(p_payload->>'name'),coalesce(p_payload->>'description',''),coalesce(p_payload->>'area',''),coalesce(p_payload->>'subject',''),coalesce(p_payload->>'objective',''),coalesce(p_payload->>'visibility','private'),coalesce((p_payload->>'capacity')::integer,6),coalesce(p_payload->>'mode','free'),coalesce((p_payload->>'duration')::integer,50),coalesce((p_payload->>'focus')::integer,25),coalesce((p_payload->>'break')::integer,5),coalesce((p_payload->>'voice')::boolean,false)) returning * into room;
   insert into public.study_room_members(room_id,user_id,role) values(room.id,uid,'admin'); insert into private.social_room_invites(room_id) values(room.id);
   return jsonb_build_object('id',room.id);
  elsif p_action='join_room' then
   perform private.social_rate('join_room',30,60);
   if nullif(p_payload->>'code','') is not null then select room_id into r from private.social_room_invites where social_room_invites.code=trim(p_payload->>'code') and expires_at>now(); end if;
   select * into room from public.study_rooms where id=r for update;
   if room.id is null or room.archived_at is not null or private.social_blocked(room.owner_id) then raise exception 'Sala indisponível'; end if;
   if exists(select 1 from public.study_room_members where room_id=r and user_id=uid and kicked) then raise exception 'Acesso revogado'; end if;
   if not private.social_room_visible(r) and not exists(select 1 from private.social_room_invites where room_id=r and social_room_invites.code=trim(p_payload->>'code') and expires_at>now()) then raise exception 'Convite obrigatório'; end if;
   if not private.social_room_member(r) and (select count(*) from public.study_room_members where room_id=r and admitted_until>now() and not kicked)>=room.capacity then raise exception 'Sala lotada'; end if;
   insert into public.study_room_members(room_id,user_id,role) values(r,uid,case when room.owner_id=uid then 'admin' else 'member' end) on conflict(room_id,user_id) do update set admitted_until=now()+interval '8 hours',joined_at=now();
   return jsonb_build_object('id',r);
  end if;
  if not private.social_room_member(r) then raise exception 'Participação na sala obrigatória'; end if;
  select * into room from public.study_rooms where id=r;
  if p_action='leave_room' then update public.study_room_members set admitted_until=now() where room_id=r and user_id=uid; return '{}';
  elsif p_action='messages' then
   return (select coalesce(jsonb_agg(to_jsonb(m) order by m.created_at,m.id),'[]') from (
    select msg.id,msg.user_id,msg.body,msg.reply_to,msg.attachment_path,msg.attachment_name,msg.created_at,msg.moderated,p.display_name,p.avatar_url,
     (select coalesce(jsonb_agg(jsonb_build_object('user_id',rx.user_id,'reaction',rx.reaction)),'[]') from public.study_room_reactions rx where rx.message_id=msg.id and not private.social_blocked(rx.user_id)) reactions
    from public.study_room_messages msg left join public.profiles p on p.user_id=msg.user_id where msg.room_id=r and not private.social_blocked(msg.user_id)
     and (nullif(p_payload->>'id','') is null or msg.id=(p_payload->>'id')::uuid)
     and (nullif(p_payload->>'before','') is null or (msg.created_at,msg.id)<((p_payload->>'before')::timestamptz,coalesce(nullif(p_payload->>'before_id','')::uuid,'ffffffff-ffff-ffff-ffff-ffffffffffff'::uuid)))
     and (nullif(p_payload->>'after','') is null or (msg.created_at,msg.id)>((p_payload->>'after')::timestamptz,coalesce(nullif(p_payload->>'after_id','')::uuid,'00000000-0000-0000-0000-000000000000'::uuid)))
    order by case when nullif(p_payload->>'after','') is not null then msg.created_at end asc,case when nullif(p_payload->>'after','') is not null then msg.id end asc,msg.created_at desc,msg.id desc limit 50
   ) m);
  elsif p_action='send_message' then
   perform pg_advisory_xact_lock(hashtext(uid::text),1); perform private.social_rate('message',20,60);
   if nullif(p_payload->>'reply_to','') is not null and not exists(select 1 from public.study_room_messages where id=(p_payload->>'reply_to')::uuid and room_id=r and not private.social_blocked(user_id)) then raise exception 'Mensagem indisponível'; end if;
   if nullif(p_payload->>'attachment_path','') is not null then
    if p_payload->>'attachment_path' not like r::text||'/'||uid::text||'/%' or not exists(select 1 from storage.objects o where o.bucket_id='study-room-attachments' and o.name=p_payload->>'attachment_path') then raise exception 'Anexo inválido'; end if;
   end if;
   insert into public.study_room_messages(room_id,user_id,body,reply_to,client_id,attachment_path,attachment_name) values(r,uid,trim(coalesce(p_payload->>'body','')),nullif(p_payload->>'reply_to','')::uuid,(p_payload->>'client_id')::uuid,nullif(p_payload->>'attachment_path',''),nullif(p_payload->>'attachment_name','')) on conflict(user_id,client_id) do nothing returning id into new_id;
   if new_id is null then select id into new_id from public.study_room_messages where user_id=uid and client_id=(p_payload->>'client_id')::uuid; end if;
   return jsonb_build_object('id',new_id);
  elsif p_action='reaction' then
   if not exists(select 1 from public.study_room_messages where id=(p_payload->>'id')::uuid and room_id=r and not private.social_blocked(user_id)) then raise exception 'Mensagem indisponível'; end if;
   delete from public.study_room_reactions where message_id=(p_payload->>'id')::uuid and user_id=uid and reaction=p_payload->>'reaction';
   if not found then insert into public.study_room_reactions(message_id,user_id,reaction) values((p_payload->>'id')::uuid,uid,p_payload->>'reaction'); end if; return '{}';
  elsif p_action='read_messages' then update public.study_room_members set last_read_at=now() where room_id=r and user_id=uid; return '{}';
  elsif p_action='checklist_add' then
   if (select count(*) from public.study_room_checklist where room_id=r)>=100 then raise exception 'Limite de objetivos atingido'; end if;
   insert into public.study_room_checklist(room_id,title,created_by) values(r,trim(p_payload->>'title'),uid); return '{}';
  elsif p_action='checklist_toggle' then update public.study_room_checklist set completed=(p_payload->>'completed')::boolean where room_id=r and id=(p_payload->>'id')::uuid; return '{}';
  elsif p_action='resource_add' then
   if (select count(*) from public.study_room_resources where room_id=r)>=100 then raise exception 'Limite de materiais atingido'; end if;
   insert into public.study_room_resources(room_id,title,url,review_on,created_by) values(r,trim(p_payload->>'title'),trim(p_payload->>'url'),nullif(p_payload->>'review_on','')::date,uid); return '{}';
  elsif p_action='quiz_answer' then
   if not public.has_feature('questions') then raise exception 'Acesso a questões necessário'; end if;
   select * into round from public.study_room_rounds where id=(p_payload->>'id')::uuid and room_id=r for update;
   if round.id is null or round.revealed_at is not null or now()>=round.deadline or not uid=any(round.cohort) then raise exception 'Esta rodada não aceita respostas'; end if;
   if not (coalesce(round.cohort,'{}') @> array[uid]) then raise exception 'Participante fora da rodada'; end if;
   select * into item from public.question_items where id=round.question_id;
   choice=upper(p_payload->>'choice');
   if choice is null or choice !~ '^[A-E]$' or (jsonb_typeof(item.alternatives)='object' and not item.alternatives ? choice) or (jsonb_typeof(item.alternatives)='array' and ascii(choice)-65>=jsonb_array_length(item.alternatives)) then raise exception 'Alternativa inválida'; end if;
   insert into private.social_round_answers(round_id,user_id,choice) values(round.id,uid,choice) on conflict do nothing;
   update public.study_room_rounds set updated_at=clock_timestamp() where id=round.id;
   return private.social_quiz_snapshot(r);
  elsif p_action='quiz_reveal' then return private.social_quiz_snapshot(r);
  end if;
  if not private.social_room_admin(r) then raise exception 'Somente administradores da sala'; end if;
  if p_action='renew_invite' then update private.social_room_invites set code=replace(gen_random_uuid()::text,'-',''),expires_at=now()+interval '7 days' where room_id=r returning social_room_invites.code into code; return jsonb_build_object('code',code);
  elsif p_action='archive_room' then update public.study_rooms set archived_at=now() where id=r; update public.study_room_sessions set status='finished',finished_at=now() where room_id=r and status<>'finished'; return '{}';
  elsif p_action='kick' then
   if target=room.owner_id then raise exception 'Não é possível remover o proprietário'; end if;
   update public.study_room_members set kicked=true,admitted_until=now() where room_id=r and user_id=target; return '{}';
  elsif p_action='room_admin' then
   if uid<>room.owner_id then raise exception 'Somente o proprietário'; end if;
   update public.study_room_members set role=case when (p_payload->>'admin')::boolean then 'admin' else 'member' end where room_id=r and user_id=target and user_id<>room.owner_id; return '{}';
  elsif p_action='moderate_message' then update public.study_room_messages set body='Mensagem removida pela moderação',attachment_path=null,attachment_name=null,moderated=true where room_id=r and id=(p_payload->>'id')::uuid; return '{}';
  elsif p_action='spotify' then update public.study_rooms set spotify_url=nullif(p_payload->>'url','') where id=r; return '{}';
  elsif p_action='session_start' then
   perform pg_advisory_xact_lock(hashtext(r::text),2);
   if exists(select 1 from public.study_room_sessions where room_id=r and status<>'finished') then raise exception 'Já existe uma sessão ativa'; end if;
   n=case when coalesce(p_payload->>'mode',room.mode)='focus' then room.focus_minutes else room.duration_minutes end*60;
   insert into public.study_room_sessions(room_id,mode,duration_seconds,remaining_seconds,ends_at,objective,created_by) values(r,coalesce(p_payload->>'mode',room.mode),n,n,now()+make_interval(secs=>n),room.objective,uid);
   update public.study_rooms set mode=coalesce(p_payload->>'mode',room.mode) where id=r; return '{}';
  elsif p_action in ('session_pause','session_resume','session_next','session_end') then
   select * into sess from public.study_room_sessions where room_id=r and status<>'finished' for update;
   if sess.id is null then raise exception 'Nenhuma sessão ativa'; end if;
   if p_action='session_end' then update public.study_room_sessions set status='finished',finished_at=now(),ends_at=null where id=sess.id;
   elsif p_action='session_pause' and sess.status='running' then update public.study_room_sessions set status='paused',remaining_seconds=greatest(0,extract(epoch from ends_at-now())::integer),ends_at=null where id=sess.id;
   elsif p_action='session_resume' and sess.status='paused' then update public.study_room_sessions set status='running',ends_at=now()+make_interval(secs=>remaining_seconds) where id=sess.id;
   elsif p_action='session_next' then
    if sess.mode<>'focus' then raise exception 'Somente modo foco'; end if;
    n=case when sess.phase='focus' then room.break_minutes else room.focus_minutes end*60;
    update public.study_room_sessions set phase=case when phase='focus' then 'break' else 'focus' end,status='running',duration_seconds=n,remaining_seconds=n,ends_at=now()+make_interval(secs=>n) where id=sess.id;
   end if; return '{}';
  elsif p_action='quiz_lists' then return (select coalesce(jsonb_agg(jsonb_build_object('id',s.id,'title',s.title)),'[]') from public.question_sets s where s.user_id=uid and public.has_feature('questions'));
  elsif p_action='quiz_start' then
   select * into sess from public.study_room_sessions where room_id=r and status='running' and mode='together';
   if sess.id is null or not public.has_feature('questions') then raise exception 'Inicie uma sessão Todos juntos com acesso a questões'; end if;
   perform pg_advisory_xact_lock(hashtext(r::text),3);
   select * into round from public.study_room_rounds where room_id=r and session_id=sess.id order by created_at desc,id desc limit 1;
   if round.id is not null and round.revealed_at is null then
    perform private.social_quiz_snapshot(r); select * into round from public.study_room_rounds where id=round.id;
    if round.revealed_at is null then raise exception 'Aguarde as respostas ou o prazo'; end if;
   end if;
   if not exists(select 1 from public.question_sets where id=(p_payload->>'set_id')::uuid and user_id=uid) then raise exception 'Lista indisponível'; end if;
   n=case when round.set_id=(p_payload->>'set_id')::uuid then round.ordinal+1 else 0 end;
   select * into item from public.question_items where set_id=(p_payload->>'set_id')::uuid and user_id=uid order by order_index,id offset n limit 1;
   if item.id is null then raise exception 'Lista concluída'; end if;
   insert into public.study_room_rounds(room_id,session_id,set_id,question_id,ordinal,cohort,deadline)
    values(r,sess.id,item.set_id,item.id,n,(select array_agg(user_id) from public.study_room_members where room_id=r and admitted_until>now() and not kicked),now()+make_interval(secs=>least(600,greatest(15,coalesce((p_payload->>'duration')::integer,90)))));
   return private.social_quiz_snapshot(r);
  end if;
  raise exception 'Operação inválida';
 end;
$$;

-- API functions stay SECURITY INVOKER; privileged implementation is private.
create function public.social_command(p_action text,p_payload jsonb default '{}') returns jsonb language sql set search_path='' as $$ select private.social_command($1,$2) $$;
create function public.social_snapshot(p_room_id uuid default null) returns jsonb language sql set search_path='' as $$ select private.social_snapshot($1) $$;
create function private.social_voice_authorize(p_room_id uuid) returns jsonb language plpgsql stable security definer set search_path='' as $$
 begin
  if auth.uid() is null or not exists(select 1 from auth.sessions s where s.id::text=coalesce(auth.jwt()->>'session_id','') and s.user_id=auth.uid() and (s.not_after is null or s.not_after>now())) then raise exception 'Sessão inválida ou revogada'; end if;
  if not private.social_room_member(p_room_id) then raise exception 'Participação na sala obrigatória'; end if;
  return (select jsonb_build_object('enabled',r.voice_enabled,'capacity',r.capacity,'members',(select coalesce(jsonb_agg(m.user_id),'[]') from public.study_room_members m where m.room_id=r.id and m.admitted_until>now() and not m.kicked and not private.social_blocked(m.user_id))) from public.study_rooms r where r.id=p_room_id);
 end;
$$;
create function public.social_voice_authorize(p_room_id uuid) returns jsonb language sql set search_path='' as $$ select private.social_voice_authorize($1) $$;
revoke all on function public.social_voice_authorize(uuid),private.social_voice_authorize(uuid) from public,anon;
grant execute on function public.social_voice_authorize(uuid),private.social_voice_authorize(uuid) to authenticated;
revoke all on function public.social_command(text,jsonb), public.social_snapshot(uuid) from public,anon;
grant execute on function public.social_command(text,jsonb),public.social_snapshot(uuid) to authenticated;

do $$ declare t text; begin
 foreach t in array array['user_blocks','study_groups','study_group_members','study_rooms','study_room_members','study_room_sessions','study_room_messages','study_room_reactions','study_room_checklist','study_room_resources','study_room_rounds'] loop
  execute format('alter table public.%I enable row level security',t);
  execute format('revoke all on public.%I from anon,authenticated',t);
  execute format('grant select on public.%I to authenticated',t);
 end loop;
end $$;
create policy social_blocks_own on public.user_blocks for select to authenticated using(user_id=(select auth.uid()));
create policy social_groups_read on public.study_groups for select to authenticated using(private.social_group_member(id));
create policy social_group_members_read on public.study_group_members for select to authenticated using(private.social_group_member(group_id));
create policy social_rooms_read on public.study_rooms for select to authenticated using(private.social_room_visible(id));
create policy social_room_members_read on public.study_room_members for select to authenticated using(private.social_room_member(room_id) and not private.social_blocked(user_id));
create policy social_sessions_read on public.study_room_sessions for select to authenticated using(private.social_room_member(room_id));
create policy social_messages_read on public.study_room_messages for select to authenticated using(private.social_room_member(room_id) and not private.social_blocked(user_id));
create policy social_checklist_read on public.study_room_checklist for select to authenticated using(private.social_room_member(room_id));
create policy social_resources_read on public.study_room_resources for select to authenticated using(private.social_room_member(room_id));
create policy social_rounds_read on public.study_room_rounds for select to authenticated using(private.social_room_member(room_id));
create policy social_reactions_read on public.study_room_reactions for select to authenticated using(exists(select 1 from public.study_room_messages m where m.id=message_id and private.social_room_member(m.room_id)) and not private.social_blocked(user_id));

-- Explicit function ACLs; do not alter grants of unrelated existing functions.
revoke all on function private.social_blocked(uuid),private.social_group_member(uuid),private.social_room_member(uuid),private.social_room_admin(uuid),private.social_room_visible(uuid),private.social_rate(text,integer,integer),private.social_quiz_snapshot(uuid),private.social_snapshot(uuid),private.social_command(text,jsonb) from public,anon;
grant usage on schema private to authenticated;
grant execute on function private.social_blocked(uuid),private.social_group_member(uuid),private.social_room_member(uuid),private.social_room_admin(uuid),private.social_room_visible(uuid),private.social_snapshot(uuid),private.social_command(text,jsonb) to authenticated;
revoke all on function private.social_rate(text,integer,integer),private.social_quiz_snapshot(uuid) from authenticated;

-- Ephemeral typing and Presence have no persisted application rows.
create policy social_room_realtime_read on realtime.messages for select to authenticated using (
 extension in ('broadcast','presence') and (select realtime.topic()) ~ '^study-room:[0-9a-f-]{36}$' and private.social_room_member(nullif(split_part((select realtime.topic()),':',2),'')::uuid)
);
create policy social_room_realtime_write on realtime.messages for insert to authenticated with check (
 extension in ('broadcast','presence') and (select realtime.topic()) ~ '^study-room:[0-9a-f-]{36}$' and private.social_room_member(nullif(split_part((select realtime.topic()),':',2),'')::uuid)
);
create function private.social_presence_visible(other uuid) returns boolean language sql stable security definer set search_path='' as $$
 select (select auth.uid()) is not null and exists(select 1 from public.profiles p where p.user_id=other and p.share_study_status and not private.social_blocked(other) and (other=(select auth.uid()) or exists(select 1 from public.friendships f where f.status='accepted' and ((f.user_id=(select auth.uid()) and f.friend_user_id=other) or (f.friend_user_id=(select auth.uid()) and f.user_id=other)))))
$$;
revoke all on function private.social_presence_visible(uuid) from public,anon;
grant execute on function private.social_presence_visible(uuid) to authenticated;
create policy social_friend_presence_read on realtime.messages for select to authenticated using(
 extension='presence' and (select realtime.topic()) ~ '^social-presence:[0-9a-f-]{36}$' and private.social_presence_visible(nullif(split_part((select realtime.topic()),':',2),'')::uuid)
);
create policy social_friend_presence_write on realtime.messages for insert to authenticated with check(
 extension='presence' and (select realtime.topic())='social-presence:'||(select auth.uid())::text and private.social_presence_visible((select auth.uid()))
);

insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types) values('study-room-attachments','study-room-attachments',false,5242880,array['application/pdf','image/png','image/jpeg','image/webp']) on conflict(id) do nothing;
create policy social_attachments_read on storage.objects for select to authenticated using(bucket_id='study-room-attachments' and (storage.foldername(name))[1] ~ '^[0-9a-f-]{36}$' and private.social_room_member(((storage.foldername(name))[1])::uuid) and exists(select 1 from public.study_room_messages m where m.attachment_path=name and not m.moderated and not private.social_blocked(m.user_id)));
create policy social_attachments_insert on storage.objects for insert to authenticated with check(bucket_id='study-room-attachments' and (storage.foldername(name))[1] ~ '^[0-9a-f-]{36}$' and (storage.foldername(name))[2]=(select auth.uid())::text and private.social_room_member(((storage.foldername(name))[1])::uuid));
create policy social_attachments_delete on storage.objects for delete to authenticated using(bucket_id='study-room-attachments' and (storage.foldername(name))[2]=(select auth.uid())::text);

-- Persisted changes delivered by Postgres Changes; no client broadcast is trusted as state.
do $$ declare t text; begin
 foreach t in array array['friendships','study_rooms','study_room_members','study_room_sessions','study_room_messages','study_room_reactions','study_room_checklist','study_room_resources','study_room_rounds'] loop
  if not exists(select 1 from pg_publication_tables where pubname='supabase_realtime' and schemaname='public' and tablename=t) then execute format('alter publication supabase_realtime add table public.%I',t); end if;
 end loop;
end $$;
commit;
