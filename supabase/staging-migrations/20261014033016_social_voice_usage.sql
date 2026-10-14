-- Voice quota is distinct from study time. Server-only accounting capability is required.
begin;
create table private.social_voice_settings (
 id boolean primary key default true check(id), enabled boolean not null default true,
 daily_seconds integer not null default 10800 check(daily_seconds between 0 and 28800),
 global_daily_seconds bigint check(global_daily_seconds>=0), max_capacity integer not null default 8 check(max_capacity between 2 and 8),
 accounting_key_hash text check(accounting_key_hash ~ '^[0-9a-f]{64}$'),
 updated_at timestamptz not null default now()
);
insert into private.social_voice_settings(id) values(true);
create table private.social_voice_connections (
 client_id uuid primary key, user_id uuid not null references auth.users(id) on delete cascade,
 room_id uuid not null references public.study_rooms(id) on delete cascade,
 started_at timestamptz not null default now(), connected_at timestamptz, accounted_at timestamptz not null default now(),
 expires_at timestamptz not null, ended_at timestamptz, seconds numeric(14,3) not null default 0 check(seconds>=0),
 failures integer not null default 0 check(failures>=0), last_error text check(length(last_error)<=80)
);
create unique index social_voice_one_active_user on private.social_voice_connections(user_id) where ended_at is null;
create index social_voice_room_history on private.social_voice_connections(room_id,started_at desc);
create index social_voice_connections_user on private.social_voice_connections(user_id,started_at desc);
create index social_voice_connections_expiry on private.social_voice_connections(expires_at) where ended_at is null;
create table private.social_voice_usage (
 user_id uuid not null references auth.users(id) on delete cascade, usage_day date not null,
 -- Historical room dimension deliberately survives deletion of a room: quota cannot reset.
 room_id uuid not null, seconds numeric(14,3) not null default 0 check(seconds>=0), primary key(user_id,usage_day,room_id)
);
create index social_voice_usage_day on private.social_voice_usage(usage_day,user_id);
create index social_voice_usage_room on private.social_voice_usage(room_id,usage_day);
alter table private.social_voice_settings enable row level security;
alter table private.social_voice_connections enable row level security;
alter table private.social_voice_usage enable row level security;
revoke all on private.social_voice_settings,private.social_voice_connections,private.social_voice_usage from public,anon,authenticated;

create function private.social_voice_settle(p_client_id uuid,p_until timestamptz) returns void
 language plpgsql security definer set search_path='' as $$
declare call private.social_voice_connections; cursor_at timestamptz; until_at timestamptz; piece_end timestamptz; usage_date date; piece_seconds numeric; total_seconds numeric:=0;
begin
 select * into call from private.social_voice_connections where client_id=p_client_id for update;
 if call.client_id is null or call.connected_at is null then return; end if;
 cursor_at=call.accounted_at;until_at=least(p_until,call.expires_at,coalesce(call.ended_at,p_until));
 while cursor_at<until_at loop
  usage_date=(cursor_at at time zone 'America/Sao_Paulo')::date;
  piece_end=least(until_at,((usage_date+1)::timestamp at time zone 'America/Sao_Paulo'));
  piece_seconds=extract(epoch from piece_end-cursor_at);total_seconds=total_seconds+piece_seconds;
  insert into private.social_voice_usage(user_id,usage_day,room_id,seconds) values(call.user_id,usage_date,call.room_id,piece_seconds)
   on conflict(user_id,usage_day,room_id) do update set seconds=social_voice_usage.seconds+excluded.seconds;
  cursor_at=piece_end;
 end loop;
 update private.social_voice_connections set accounted_at=greatest(accounted_at,until_at),seconds=seconds+total_seconds where client_id=p_client_id;
end;
$$;
revoke all on function private.social_voice_settle(uuid,timestamptz) from public,anon,authenticated;

create function private.social_voice_expire(p_key text) returns integer
 language plpgsql security definer set search_path='' as $$
declare call record; count_expired integer:=0;
begin
 if p_key is null or length(p_key)>128 or not exists(select 1 from private.social_voice_settings where accounting_key_hash=encode(sha256(convert_to(p_key,'UTF8')),'hex')) then raise exception 'Contabilização exclusiva do servidor'; end if;
 perform 1 from private.social_voice_settings where id=true for update;
 for call in select client_id,expires_at from private.social_voice_connections where ended_at is null and expires_at<=clock_timestamp() order by expires_at,client_id limit 32 for update loop
  perform private.social_voice_settle(call.client_id,call.expires_at);
  update private.social_voice_connections set ended_at=expires_at where client_id=call.client_id;
  count_expired=count_expired+1;
 end loop;
 return count_expired;
end;
$$;
-- Narrow, capability-authenticated maintenance endpoint: anon has no private schema access.
create function public.social_voice_expire(p_key text) returns integer language sql security definer set search_path='' as $$select private.social_voice_expire($1)$$;
revoke all on function private.social_voice_expire(text),public.social_voice_expire(text) from public,anon,authenticated;
grant execute on function public.social_voice_expire(text) to anon,authenticated;

create function private.social_voice_account(p_action text,p_room_id uuid,p_client_id uuid,p_key text,p_error text default null)
 returns jsonb language plpgsql security definer set search_path='' as $$
declare
 uid uuid:=auth.uid(); config private.social_voice_settings; current_call private.social_voice_connections;
 now_at timestamptz:=clock_timestamp(); day_start timestamptz; day_end timestamptz; usage_date date;
 cursor_at timestamptz; until_at timestamptz; piece_end timestamptz; piece_seconds numeric;
 spent numeric; global_allocated numeric; available numeric; expiry timestamptz;
begin
 if uid is null then raise exception 'Autenticação obrigatória'; end if;
 if p_key is null or length(p_key)>128 or not exists(select 1 from private.social_voice_settings where accounting_key_hash=encode(sha256(convert_to(p_key,'UTF8')),'hex')) then raise exception 'Contabilização exclusiva do servidor'; end if;
 if p_action not in ('status','reserve','renew','check','release','failure') then raise exception 'Operação inválida'; end if;
 if not exists(select 1 from auth.sessions where id::text=coalesce(auth.jwt()->>'session_id','') and user_id=uid and (not_after is null or not_after>now_at)) then raise exception 'Sessão inválida'; end if;
 if p_action in ('status','reserve','renew','check') and not private.social_room_member(p_room_id) then raise exception 'Participação na sala obrigatória'; end if;
 -- Consistent lock order protects both per-user and optional global reservations.
 select * into config from private.social_voice_settings where id=true for update;
 perform pg_advisory_xact_lock(hashtext(uid::text),32431);
 select * into current_call from private.social_voice_connections where user_id=uid and ended_at is null for update;
 if current_call.client_id is not null then perform private.social_voice_settle(current_call.client_id,now_at);select * into current_call from private.social_voice_connections where client_id=current_call.client_id;end if;
 if current_call.client_id is not null and current_call.expires_at<=now_at then
  update private.social_voice_connections set ended_at=expires_at where client_id=current_call.client_id;
  current_call=null;
 end if;
 if p_action in ('release','failure') then
  if current_call.client_id=p_client_id and current_call.room_id=p_room_id then
   update private.social_voice_connections set ended_at=now_at,expires_at=least(expires_at,now_at),
    failures=failures+case when p_action='failure' then 1 else 0 end,
    last_error=case when p_action='failure' then left(regexp_replace(coalesce(p_error,'connection_failed'),'[^a-zA-Z0-9_]','','g'),80) else last_error end
    where client_id=p_client_id;
  end if;
  return jsonb_build_object('allowed',true);
 end if;
 usage_date=(now_at at time zone 'America/Sao_Paulo')::date;
 day_start=usage_date::timestamp at time zone 'America/Sao_Paulo';day_end=(usage_date+1)::timestamp at time zone 'America/Sao_Paulo';
 select coalesce(sum(seconds),0) into spent from private.social_voice_usage where user_id=uid and usage_day=usage_date;
 available=greatest(0,config.daily_seconds-spent);
 if p_action='status' then return jsonb_build_object('allowed',config.enabled and available>=1,'remaining_seconds',floor(available),'daily_seconds',config.daily_seconds,'server_now',now_at,'error',case when config.enabled then 'Limite diário de voz atingido.' else 'Chamadas pausadas pelo administrador.' end);end if;
 if config.global_daily_seconds is not null then
  select coalesce((select sum(seconds) from private.social_voice_usage where usage_day=usage_date),0)
   +coalesce((select sum(greatest(0,extract(epoch from least(expires_at,day_end)-greatest(accounted_at,day_start))))
    from private.social_voice_connections where ended_at is null and client_id<>p_client_id),0) into global_allocated;
  available=least(available,greatest(0,config.global_daily_seconds-global_allocated));
 end if;
 if not config.enabled or available<1 then
  if current_call.client_id=p_client_id then update private.social_voice_connections set ended_at=now_at,expires_at=now_at where client_id=p_client_id; end if;
  return jsonb_build_object('allowed',false,'remaining_seconds',0,'error',case when not config.enabled then 'Chamadas de voz pausadas pelo administrador.' when spent>=config.daily_seconds then 'Limite de voz atingido. A franquia diária renova à meia-noite de Brasília.' else 'Teto coletivo diário de voz atingido.' end);
 end if;
 if current_call.client_id is not null and (current_call.client_id<>p_client_id or current_call.room_id<>p_room_id) then
  return jsonb_build_object('allowed',false,'error','Uma chamada anterior desta conta ainda está ativa. Encerre essa chamada antes de entrar.');
 end if;
 if p_action='check' then
  if current_call.client_id is null then return jsonb_build_object('allowed',false,'error','A chamada expirou. Entre novamente na voz.');end if;
  return jsonb_build_object('allowed',true,'remaining_seconds',floor(config.daily_seconds-spent),'daily_seconds',config.daily_seconds,'expires_at',current_call.expires_at,'server_now',now_at,'max_capacity',config.max_capacity);
 end if;
 expiry=least(now_at+interval '120 seconds',day_end,now_at+make_interval(secs=>available::double precision));
 if p_action='reserve' then
  if exists(select 1 from private.social_voice_connections where client_id=p_client_id and ended_at is not null) then return jsonb_build_object('allowed',false,'error','Tentativa encerrada. Entre novamente na voz.'); end if;
  insert into private.social_voice_connections(client_id,user_id,room_id,started_at,accounted_at,expires_at)
   values(p_client_id,uid,p_room_id,now_at,now_at,expiry) on conflict(client_id) do update set expires_at=excluded.expires_at
   where social_voice_connections.user_id=uid and social_voice_connections.room_id=p_room_id;
  if not found then return jsonb_build_object('allowed',false,'error','Conexão não autorizada'); end if;
 elsif current_call.client_id is null then return jsonb_build_object('allowed',false,'unknown_connection',not exists(select 1 from private.social_voice_connections where client_id=p_client_id),'error','A chamada expirou. Entre novamente na voz.');
 else
  update private.social_voice_connections set connected_at=coalesce(connected_at,now_at),accounted_at=now_at,expires_at=expiry where client_id=p_client_id;
 end if;
 return jsonb_build_object('allowed',true,'remaining_seconds',floor(config.daily_seconds-spent),'daily_seconds',config.daily_seconds,'expires_at',expiry,'server_now',now_at,'max_capacity',config.max_capacity);
end;
$$;
create function public.social_voice_account(p_action text,p_room_id uuid,p_client_id uuid,p_key text,p_error text default null)
 returns jsonb language sql set search_path='' as $$select private.social_voice_account($1,$2,$3,$4,$5)$$;
revoke all on function private.social_voice_account(text,uuid,uuid,text,text),public.social_voice_account(text,uuid,uuid,text,text) from public,anon;
grant execute on function private.social_voice_account(text,uuid,uuid,text,text),public.social_voice_account(text,uuid,uuid,text,text) to authenticated;

create function private.social_rooms_admin(p_action text,p_payload jsonb default '{}')
 returns jsonb language plpgsql security definer set search_path='' as $$
declare config private.social_voice_settings; result jsonb; date_now date:=(now() at time zone 'America/Sao_Paulo')::date;
begin
 if not private.is_admin() then raise exception 'Somente administradores da plataforma'; end if;
 if octet_length(p_payload::text)>8000 then raise exception 'Requisição muito grande'; end if;
 perform private.social_rate('rooms_admin',60,60);
 if p_action='room' then
  perform 1 from public.study_rooms where id=(p_payload->>'room_id')::uuid for update;
  if not found then raise exception 'Sala indisponível';end if;
  if (p_payload->>'capacity')::integer<(select count(*) from public.study_room_members where room_id=(p_payload->>'room_id')::uuid and admitted_until>now() and not kicked) then raise exception 'Capacidade inferior às vagas ocupadas';end if;
  update public.study_rooms set capacity=coalesce((p_payload->>'capacity')::integer,capacity),voice_enabled=coalesce((p_payload->>'voice_enabled')::boolean,voice_enabled) where id=(p_payload->>'room_id')::uuid;
 elsif p_action='settings' then
  update private.social_voice_settings set enabled=coalesce((p_payload->>'enabled')::boolean,enabled),
   daily_seconds=coalesce((p_payload->>'daily_minutes')::integer*60,daily_seconds),
   global_daily_seconds=case when p_payload ? 'global_daily_minutes' then nullif(p_payload->>'global_daily_minutes','')::bigint*60 else global_daily_seconds end,
   max_capacity=coalesce((p_payload->>'max_capacity')::integer,max_capacity),updated_at=now() where id=true;
 elsif p_action<>'snapshot' then raise exception 'Operação inválida'; end if;
 select * into config from private.social_voice_settings where id=true;
 result=jsonb_build_object('settings',jsonb_build_object('enabled',config.enabled,'daily_minutes',config.daily_seconds/60,'global_daily_minutes',config.global_daily_seconds/60,'max_capacity',config.max_capacity),
  'voice_seconds_today',(select coalesce(sum(seconds),0) from private.social_voice_usage where usage_day=date_now),
  'active_calls',(select count(*) from private.social_voice_connections where ended_at is null and expires_at>now() and connected_at is not null),
  'connection_failures',(select coalesce(sum(failures),0) from private.social_voice_connections where (started_at at time zone 'America/Sao_Paulo')::date=date_now),
  'sessions_completed',(select count(*) from public.study_room_sessions where status='finished'),
  'rooms',(select coalesce(jsonb_agg(to_jsonb(x)),'[]') from (
   select r.id,r.name,r.capacity,r.voice_enabled,
    (select count(*) from private.social_voice_connections where room_id=r.id and ended_at is null and expires_at>now() and connected_at is not null) voice_participants,
    (select coalesce(sum(seconds),0) from private.social_voice_usage where room_id=r.id and usage_day=date_now) voice_seconds,
    (select count(*) from public.study_room_sessions where room_id=r.id and status<>'finished') active_sessions
   from public.study_rooms r where r.archived_at is null order by r.created_at desc limit 100
  )x));
 return result;
end;
$$;
create function public.social_rooms_admin(p_action text,p_payload jsonb default '{}') returns jsonb language sql set search_path='' as $$select private.social_rooms_admin($1,$2)$$;
revoke all on function private.social_rooms_admin(text,jsonb),public.social_rooms_admin(text,jsonb) from public,anon;
grant execute on function private.social_rooms_admin(text,jsonb),public.social_rooms_admin(text,jsonb) to authenticated;
commit;
