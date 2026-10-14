const fs=require('node:fs');
const {PGlite}=require('@electric-sql/pglite');
const A='11111111-1111-4111-8111-111111111111',B='22222222-2222-4222-8222-222222222222',C='33333333-3333-4333-8333-333333333333';
const SET='aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',Q='bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb';

async function database(){
 const db=new PGlite();
 await db.exec(`
 create role anon;create role authenticated;create role service_role;
 create schema auth;create schema private;create schema realtime;create schema storage;
 create function auth.uid() returns uuid language sql stable as $$select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid$$;
 grant usage on schema auth to authenticated,anon;grant execute on function auth.uid() to authenticated,anon;
 create table auth.users(id uuid primary key);
 create table auth.sessions(id uuid primary key,user_id uuid references auth.users(id),not_after timestamptz);
 create function auth.jwt() returns jsonb language sql stable as $$select jsonb_build_object('session_id',auth.uid()::text)$$;
 create table public.profiles(user_id uuid primary key references auth.users(id),luria_id text,display_name text,specialty text,studyrat_variant text,studyrat_accessory text,studyrat_accessory_offsets jsonb);
 create table public.friendships(id uuid primary key default gen_random_uuid(),user_id uuid references auth.users(id),friend_user_id uuid references auth.users(id),created_at timestamptz default now(),unique(user_id,friend_user_id));
 alter table public.profiles enable row level security;create policy own_profile on public.profiles for all to authenticated using(user_id=auth.uid()) with check(user_id=auth.uid());
 alter table public.friendships enable row level security;create policy own_friendship on public.friendships for select to authenticated using(user_id=auth.uid() or friend_user_id=auth.uid());
 grant select on public.profiles,public.friendships to authenticated;
 create table public.question_sets(id uuid primary key,user_id uuid,title text);
 create table public.question_sources(id integer primary key,institution text,document text,source_year text,url text,section text);
 create table public.question_bank(id uuid primary key,source_id integer,answer_source_id integer);
 create table public.question_items(id uuid primary key,set_id uuid references public.question_sets(id),user_id uuid,order_index integer,stem text,alternatives jsonb,official_answer text,pulo_do_gato text,answer_explanations jsonb,source_label text,area text,materia text,question_bank_id uuid);
 create table public.question_attempts(id uuid primary key default gen_random_uuid(),user_id uuid,question_item_id uuid references public.question_items(id) on delete cascade,result text,selected_option text,correct_option text,area text,materia text,answered_at timestamptz,unique(user_id,question_item_id));
 alter table public.question_attempts enable row level security;create policy own_attempt on public.question_attempts for select to authenticated using(user_id=auth.uid());grant select on public.question_attempts to authenticated;
 alter table public.question_items enable row level security;create policy own_question on public.question_items for select to authenticated using(user_id=auth.uid());grant select on public.question_items to authenticated;
 create table public.study_sessions(id uuid primary key default gen_random_uuid(),user_id uuid,created_at timestamptz default now(),duration_seconds integer);
 create function public.has_feature(text) returns boolean language sql stable as $$select auth.uid() is not null$$;
 create table realtime.messages(id uuid,extension text);alter table realtime.messages enable row level security;
 create function realtime.topic() returns text language sql stable as $$select current_setting('realtime.topic',true)$$;
 create publication supabase_realtime;
 create table storage.buckets(id text primary key,name text,public boolean,file_size_limit bigint,allowed_mime_types text[]);
 create table storage.objects(id uuid default gen_random_uuid(),bucket_id text,name text);alter table storage.objects enable row level security;
 create function storage.foldername(text) returns text[] language sql immutable as $$select string_to_array($1,'/')$$;
 grant usage on schema storage,realtime to authenticated;grant select,insert,delete on storage.objects to authenticated;grant select,insert on realtime.messages to authenticated;
 insert into auth.users values('${A}'),('${B}'),('${C}');
 insert into auth.sessions(id,user_id) values('${A}','${A}'),('${B}','${B}'),('${C}','${C}');
 insert into public.profiles(user_id,luria_id,display_name,specialty,studyrat_variant,studyrat_accessory,studyrat_accessory_offsets) values('${A}','OWNER001','Ana','Clínica','blue','crown','{"crown":{"x":0.2,"y":0.1,"v":2}}'),('${B}','FRIEND02','Bruno','Clínica','brown','none','{}'),('${C}','FRIEND03','Caio','Clínica','pink','none','{}');
 insert into public.friendships(user_id,friend_user_id) values('${A}','${C}');
 insert into public.question_sets values('${SET}','${A}','Lista existente');
 insert into public.question_items values('${Q}','${SET}','${A}',0,'Enunciado real','{"A":"Alternativa A","B":"Alternativa B"}','B','Comentário LURIA','{"A":"Explicação A","B":"Explicação B"}','Referência original','Clínica','Cardiologia',null);
 `);
 await db.exec(fs.readFileSync('db/social_study_rooms.sql','utf8'));
 await db.exec(fs.readFileSync('db/social_room_features.sql','utf8'));
 await db.exec(`create table private.app_admins(user_id uuid primary key);insert into private.app_admins values('${A}');create function private.is_admin() returns boolean language sql stable security definer set search_path='' as $$select exists(select 1 from private.app_admins where user_id=auth.uid())$$;`);
 await db.exec(fs.readFileSync('db/social_voice_usage.sql','utf8'));
 const as=async uid=>{await db.exec('reset role');await db.query("select set_config('request.jwt.claim.sub',$1,false)",[uid||'']);await db.exec('set role authenticated');};
 const command=async(action,payload={})=>(await db.query('select public.social_command($1,$2::jsonb) result',[action,JSON.stringify(payload)])).rows[0].result;
 const snapshot=async(room=null)=>(await db.query('select public.social_snapshot($1::uuid) result',[room])).rows[0].result;
 const features=async(action,payload={})=>(await db.query('select public.social_room_features($1,$2::jsonb) result',[action,JSON.stringify(payload)])).rows[0].result;
 return {db,as,command,snapshot,features};
}


module.exports={database,A,B,C,SET,Q};
