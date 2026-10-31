-- Study Rats: partidas de tabuleiro de duas pessoas, separadas dos desafios sociais.
create table if not exists public.study_rats_board_matches (
  id uuid primary key default gen_random_uuid(),
  mode text not null check (mode in ('friends', 'random')),
  status text not null default 'waiting' check (status in ('waiting', 'playing', 'finished', 'cancelled')),
  host_id uuid not null references auth.users(id) on delete cascade,
  invited_id uuid references auth.users(id) on delete cascade,
  guest_id uuid references auth.users(id) on delete set null,
  host_house integer not null default 0 check (host_house between 0 and 59),
  guest_house integer not null default 0 check (guest_house between 0 and 59),
  host_question integer not null default 0 check (host_question >= 0),
  guest_question integer not null default 0 check (guest_question >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (host_id is distinct from guest_id),
  check (host_id is distinct from invited_id),
  check ((mode = 'friends' and invited_id is not null) or (mode = 'random' and invited_id is null))
);

create index if not exists study_rats_board_waiting_idx
  on public.study_rats_board_matches (created_at)
  where mode = 'random' and status = 'waiting';
create index if not exists study_rats_board_host_idx on public.study_rats_board_matches (host_id, created_at desc);
create index if not exists study_rats_board_guest_idx on public.study_rats_board_matches (guest_id, created_at desc);
create index if not exists study_rats_board_invited_idx on public.study_rats_board_matches (invited_id, created_at desc);

alter table public.study_rats_board_matches enable row level security;
revoke all on public.study_rats_board_matches from anon, authenticated;

create or replace function public.study_rats_board_find(p_mode text, p_friend_id uuid default null)
returns uuid language plpgsql security definer set search_path = '' as $$
declare v_user uuid := (select auth.uid()); v_id uuid;
begin
  if v_user is null then raise exception 'Entre na sua conta para jogar online'; end if;
  if p_mode not in ('friends', 'random') then raise exception 'Modo inválido'; end if;
  if p_mode = 'friends' then
    if p_friend_id is null or not exists (select 1 from private.my_friends() f where f.user_id = p_friend_id) then
      raise exception 'Escolha um amigo da sua lista';
    end if;
    insert into public.study_rats_board_matches(mode, host_id, invited_id)
      values ('friends', v_user, p_friend_id) returning id into v_id;
  else
    select id into v_id from public.study_rats_board_matches
      where mode = 'random' and status = 'waiting' and host_id <> v_user
        and not private.social_blocked(host_id)
        and created_at > now() - interval '30 minutes'
      order by created_at for update skip locked limit 1;
    if v_id is null then
      insert into public.study_rats_board_matches(mode, host_id)
        values ('random', v_user) returning id into v_id;
    else
      update public.study_rats_board_matches
        set guest_id = v_user, status = 'playing', updated_at = now()
        where id = v_id;
    end if;
  end if;
  return v_id;
end $$;

create or replace function public.study_rats_board_accept(p_match_id uuid)
returns boolean language plpgsql security definer set search_path = '' as $$
declare v_updated integer;
begin
  if (select auth.uid()) is null then raise exception 'Entre na sua conta'; end if;
  update public.study_rats_board_matches
    set guest_id = (select auth.uid()), status = 'playing', updated_at = now()
    where id = p_match_id and invited_id = (select auth.uid())
      and exists (select 1 from private.my_friends() f where f.user_id = host_id)
      and status = 'waiting' and guest_id is null;
  get diagnostics v_updated = row_count;
  return v_updated = 1;
end $$;

create or replace function public.study_rats_board_leave(p_match_id uuid)
returns boolean language plpgsql security definer set search_path = '' as $$
declare v_updated integer;
begin
  if (select auth.uid()) is null then raise exception 'Entre na sua conta'; end if;
  update public.study_rats_board_matches set status = 'cancelled', updated_at = now()
    where id = p_match_id and status in ('waiting', 'playing')
      and (host_id = (select auth.uid()) or guest_id = (select auth.uid()));
  get diagnostics v_updated = row_count;
  return v_updated = 1;
end $$;

create or replace function public.study_rats_board_lobby()
returns jsonb language sql stable security definer set search_path = '' as $$
  select coalesce(jsonb_agg(jsonb_build_object(
    'id', m.id, 'mode', m.mode, 'status', m.status,
    'host_id', m.host_id, 'guest_id', m.guest_id, 'invited_id', m.invited_id,
    'host_name', coalesce(h.display_name, 'Jogador TRAUBE'),
    'guest_name', coalesce(g.display_name, 'Jogador TRAUBE'),
    'host_house', m.host_house, 'guest_house', m.guest_house,
    'host_question', m.host_question, 'guest_question', m.guest_question,
    'created_at', m.created_at
  ) order by m.created_at desc), '[]'::jsonb)
  from public.study_rats_board_matches m
  left join public.profiles h on h.user_id = m.host_id
  left join public.profiles g on g.user_id = m.guest_id
  where (select auth.uid()) is not null
    and (m.host_id = (select auth.uid()) or m.guest_id = (select auth.uid())
         or m.invited_id = (select auth.uid()))
    and m.created_at > now() - interval '1 day'
    and m.status in ('waiting', 'playing', 'finished');
$$;

create or replace function public.study_rats_board_answer(p_match_id uuid, p_choice integer)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare
  v_user uuid := (select auth.uid()); v_match public.study_rats_board_matches%rowtype;
  v_host boolean; v_question integer; v_old integer; v_landed integer; v_to integer;
  v_roll integer; v_delta integer := 0; v_good boolean;
  v_correct integer[] := array[1,1,0,2,0,2,1,0,1,1];
begin
  if v_user is null or p_choice not between 0 and 3 then raise exception 'Resposta inválida'; end if;
  select * into v_match from public.study_rats_board_matches
    where id = p_match_id and status = 'playing' for update;
  if not found or v_user not in (v_match.host_id, v_match.guest_id) then
    raise exception 'Partida indisponível';
  end if;
  v_host := v_user = v_match.host_id;
  v_question := case when v_host then v_match.host_question else v_match.guest_question end;
  v_old := case when v_host then v_match.host_house else v_match.guest_house end;
  v_good := p_choice = v_correct[(v_question % 10) + 1];
  v_roll := 1 + floor(random() * 6)::integer;
  v_landed := case when v_good then least(59, v_old + v_roll) else v_old end;
  if v_good then
    v_delta := case v_landed + 1 when 6 then 3 when 16 then -2
      when 24 then 4 when 34 then -3 when 43 then 3 when 53 then -4
      when 57 then 2 else 0 end;
  end if;
  v_to := greatest(0, least(59, v_landed + v_delta));
  if v_host then
    update public.study_rats_board_matches set host_house = v_to,
      host_question = v_question + 1,
      status = case when v_to = 59 then 'finished' else status end,
      updated_at = now() where id = p_match_id;
  else
    update public.study_rats_board_matches set guest_house = v_to,
      guest_question = v_question + 1,
      status = case when v_to = 59 then 'finished' else status end,
      updated_at = now() where id = p_match_id;
  end if;
  return jsonb_build_object('good', v_good, 'roll', v_roll, 'from', v_old,
    'landed', v_landed, 'to', v_to, 'delta', v_delta,
    'question', v_question, 'finished', v_to = 59);
end $$;

revoke all on function public.study_rats_board_find(text, uuid) from public, anon;
revoke all on function public.study_rats_board_accept(uuid) from public, anon;
revoke all on function public.study_rats_board_leave(uuid) from public, anon;
revoke all on function public.study_rats_board_lobby() from public, anon;
revoke all on function public.study_rats_board_answer(uuid, integer) from public, anon;
grant execute on function public.study_rats_board_find(text, uuid) to authenticated;
grant execute on function public.study_rats_board_accept(uuid) to authenticated;
grant execute on function public.study_rats_board_leave(uuid) to authenticated;
grant execute on function public.study_rats_board_lobby() to authenticated;
grant execute on function public.study_rats_board_answer(uuid, integer) to authenticated;

