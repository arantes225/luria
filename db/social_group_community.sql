-- Additive group content. Existing groups, membership, blocks and rate limits are reused.
create table public.study_group_entries (
 id uuid primary key default gen_random_uuid(),
 group_id uuid not null references public.study_groups(id) on delete cascade,
 user_id uuid not null references auth.users(id) on delete cascade,
 kind text not null check(kind in ('chat','post','material','task')),
 title text not null default '' check(length(title)<=160),
 body text not null default '' check(length(body)<=4000),
 url text check(url is null or (length(url)<=2000 and url ~ '^https://[^[:space:]]+$' and url !~ '^https://[^/]*@')),
 completed boolean not null default false,
 pinned boolean not null default false,
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now(),
 removed_at timestamptz,
 check(length(trim(title))+length(trim(body))>0),
 check(kind='material' or url is null),
 check(kind<>'material' or removed_at is not null or (url is not null and length(trim(title))>0)),
 check(kind='task' or not completed),
 check(kind='post' or not pinned)
);
create index study_group_entries_feed on public.study_group_entries(group_id,kind,created_at desc,id desc) where removed_at is null;
create index study_group_entries_author on public.study_group_entries(user_id);
alter table public.study_group_entries enable row level security;
revoke all on public.study_group_entries from public,anon,authenticated;
grant select on public.study_group_entries to authenticated;
create policy group_entries_read on public.study_group_entries for select to authenticated
 using(private.social_group_member(group_id) and not private.social_blocked(user_id));

-- Privileged writes are deliberately centralized with explicit membership checks;
-- clients have no INSERT/UPDATE/DELETE grant and cannot spoof author or group.
create function private.social_group_community(p_action text,p_payload jsonb default '{}') returns jsonb
language plpgsql security definer set search_path='' as $$
declare uid uuid:=auth.uid(); g uuid:=(p_payload->>'group_id')::uuid; eid uuid; e public.study_group_entries;
 admin boolean; k text; cursor_entry public.study_group_entries; result jsonb;
begin
 if uid is null or not private.social_group_member(g) then raise exception 'Acesso restrito aos membros do grupo'; end if;
 select exists(select 1 from public.study_group_members where group_id=g and user_id=uid and role='admin') into admin;
 if p_action='snapshot' then
  select jsonb_build_object(
   'group',(select to_jsonb(s)||jsonb_build_object('role',case when admin then 'admin' else 'member' end) from public.study_groups s where id=g),
   'members',(select coalesce(jsonb_agg(jsonb_build_object('user_id',m.user_id,'name',p.display_name,'avatar_url',p.avatar_url,'role',m.role) order by m.joined_at),'[]') from public.study_group_members m join public.profiles p on p.user_id=m.user_id where m.group_id=g and not private.social_blocked(m.user_id)),
   'entries',(select coalesce(jsonb_agg(to_jsonb(x)-'n' order by x.created_at,x.id),'[]') from (
     select z.*,p.display_name,p.avatar_url from (
      select t.*,row_number() over(partition by kind order by pinned desc,created_at desc,id desc) n from public.study_group_entries t
      where group_id=g and removed_at is null and not private.social_blocked(user_id)
     )z join public.profiles p on p.user_id=z.user_id where z.n<=case when z.kind='chat' then 60 else 100 end
   )x)
  ) into result;
  return result;
 elsif p_action='older' then
  select * into cursor_entry from public.study_group_entries where id=(p_payload->>'before')::uuid and group_id=g and kind='chat' and not private.social_blocked(user_id);
  if not found then return '[]'; end if;
  return (select coalesce(jsonb_agg(to_jsonb(x) order by x.created_at,x.id),'[]') from (
   select t.*,p.display_name,p.avatar_url from public.study_group_entries t join public.profiles p on p.user_id=t.user_id
   where t.group_id=g and t.kind='chat' and t.removed_at is null and not private.social_blocked(t.user_id)
    and (t.created_at,t.id)<(cursor_entry.created_at,cursor_entry.id) order by t.created_at desc,t.id desc limit 60
  )x);
 end if;
 perform pg_advisory_xact_lock(hashtext(uid::text),31);
 perform private.social_rate('group_content',30,60);
 if p_action='create' then
  eid:=(p_payload->>'id')::uuid; k:=p_payload->>'kind';
  select * into e from public.study_group_entries where id=eid;
  if found then
   if e.group_id<>g or e.user_id<>uid then raise exception 'Publicação inválida'; end if;
   return jsonb_build_object('id',e.id);
  end if;
  insert into public.study_group_entries(id,group_id,user_id,kind,title,body,url)
   values(coalesce(eid,gen_random_uuid()),g,uid,k,trim(coalesce(p_payload->>'title','')),trim(coalesce(p_payload->>'body','')),nullif(trim(p_payload->>'url'),'')) returning id into eid;
  return jsonb_build_object('id',eid);
 elsif p_action in ('remove','complete','pin') then
  select * into e from public.study_group_entries where id=(p_payload->>'id')::uuid and group_id=g and removed_at is null;
  if not found or private.social_blocked(e.user_id) then raise exception 'Publicação indisponível'; end if;
  if p_action='complete' and e.kind='task' then
   update public.study_group_entries set completed=(p_payload->>'completed')::boolean,updated_at=now() where id=e.id;
  elsif p_action='pin' and e.kind='post' and admin then
   update public.study_group_entries set pinned=(p_payload->>'pinned')::boolean,updated_at=now() where id=e.id;
  elsif p_action='remove' and (admin or e.user_id=uid) then
   update public.study_group_entries set removed_at=now(),updated_at=now(),title='Publicação removida',body='',url=null,pinned=false,completed=false where id=e.id;
  else raise exception 'Você não tem permissão para esta ação'; end if;
  return '{}';
 end if;
 raise exception 'Ação desconhecida';
end $$;
create function public.social_group_community(p_action text,p_payload jsonb default '{}') returns jsonb
 language sql security invoker set search_path='' as $$ select private.social_group_community($1,$2) $$;
revoke all on function public.social_group_community(text,jsonb),private.social_group_community(text,jsonb) from public,anon;
grant execute on function public.social_group_community(text,jsonb),private.social_group_community(text,jsonb) to authenticated;
alter publication supabase_realtime add table public.study_group_entries;
