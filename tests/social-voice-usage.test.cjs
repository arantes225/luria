const test=require('node:test'),assert=require('node:assert/strict');
const {database,A,B,C}=require('./fixtures/social-db.cjs');
const KEY='fixture-server-accounting-key',CLIENT='cccccccc-cccc-4ccc-8ccc-cccccccccccc',OTHER='dddddddd-dddd-4ddd-8ddd-dddddddddddd';
test('voice usage is server authorized, shared between rooms, survives expiry and cannot reset on rejoin',async t=>{
 const f=await database();t.after(()=>f.db.close());const account=async(action,room,client=CLIENT,key=KEY)=>(await f.db.query('select public.social_voice_account($1,$2::uuid,$3::uuid,$4) result',[action,room,client,key])).rows[0].result;
 const sql=async(query,args=[])=>{await f.db.exec('reset role');return f.db.query(query,args);};
 await sql("update private.social_voice_settings set accounting_key_hash=encode(sha256(convert_to($1,'UTF8')),'hex')",[KEY]);await f.as(A);
 const room=(await f.command('create_room',{name:'Sala de teste',visibility:'public',voice:true})).id;const room2=(await f.command('create_room',{name:'Outra sala',visibility:'public',voice:true})).id;
 await assert.rejects(account('reserve',room,CLIENT,'wrong-key'),/exclusiva/);const reserved=await account('reserve',room);assert.equal(reserved.daily_seconds,10800);assert.equal(reserved.remaining_seconds,10800);
 await assert.rejects(f.db.query('select * from private.social_voice_usage'),/permission denied/);
 const collision=await account('reserve',room2,OTHER);assert.equal(collision.allowed,false);assert.match(collision.error,/anterior/);
 await account('renew',room);await sql("update private.social_voice_connections set accounted_at=clock_timestamp()-interval '45 seconds',connected_at=clock_timestamp()-interval '45 seconds' where client_id=$1",[CLIENT]);await f.as(A);const renewed=await account('renew',room);assert(renewed.remaining_seconds<=10755);const before=renewed.remaining_seconds;
 await account('release',room);const replacement=await account('reserve',room2,OTHER);assert(replacement.remaining_seconds<=before);assert.equal(replacement.allowed,true);await account('renew',room2,OTHER);
 await sql("update private.social_voice_connections set accounted_at=clock_timestamp()-interval '20 seconds',expires_at=clock_timestamp()-interval '5 seconds' where client_id=$1",[OTHER]);await f.as(null);await assert.rejects(f.db.query('select public.social_voice_expire($1)', ['bad-key']),/exclusiva/);
 await f.db.exec('reset role');await f.db.exec('set role anon');const expired=(await f.db.query('select public.social_voice_expire($1) n',[KEY])).rows[0].n;assert.equal(expired,1);assert.equal((await f.db.query('select public.social_voice_expire($1) n',[KEY])).rows[0].n,0);
 await sql("insert into private.social_voice_usage(user_id,usage_day,room_id,seconds) values($1,(clock_timestamp() at time zone 'America/Sao_Paulo')::date,$2,10800) on conflict(user_id,usage_day,room_id) do update set seconds=10800",[A,room]);await f.as(A);
 const denied=await account('reserve',room,C);assert.equal(denied.allowed,false);assert.match(denied.error,/meia-noite/);
 await f.as(B);await assert.rejects(account('reserve',room),/Participação/);await assert.rejects(f.db.query("select public.social_rooms_admin('settings','{\"daily_minutes\":480}'::jsonb)"),/administradores/);
 await f.as(A);const snapshot=(await f.db.query("select public.social_rooms_admin('snapshot') result")).rows[0].result;assert.equal(snapshot.settings.daily_minutes,180);assert.doesNotMatch(JSON.stringify(snapshot),/key_hash|fixture-server|accounting/);
});

test('global quota reserves lease budgets and blocked or expired members cannot authorize voice',async t=>{
 const f=await database();t.after(()=>f.db.close());await f.db.exec('reset role');await f.db.query("update private.social_voice_settings set accounting_key_hash=encode(sha256(convert_to($1,'UTF8')),'hex'),global_daily_seconds=30",[KEY]);await f.as(A);const room=(await f.command('create_room',{name:'Sala com teto',visibility:'public',voice:true})).id;
 const account=async(action,client)=>(await f.db.query('select public.social_voice_account($1,$2,$3,$4) result',[action,room,client,KEY])).rows[0].result;
 const first=await account('reserve',CLIENT);assert.equal(first.allowed,true);assert(Date.parse(first.expires_at)-Date.parse(first.server_now)<=30000);
 await f.as(B);await f.command('join_room',{room_id:room});const second=await account('reserve',OTHER);assert.equal(second.allowed,false);assert.match(second.error,/coletivo/);
 await f.as(A);await account('release',CLIENT);await f.as(B);assert.equal((await account('reserve',OTHER)).allowed,true);await f.command('leave_room',{room_id:room});await assert.rejects(account('renew',OTHER),/Participação/);
});
