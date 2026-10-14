const test=require('node:test');
const assert=require('node:assert/strict');
const {database,A,B,C,SET,Q}=require('./fixtures/social-db.cjs');

test('social database: real PostgreSQL authorization, preservation, concurrency invariants and blind quiz',async t=>{
 const f=await database(),{db,as,command,snapshot}=f;t.after(()=>db.close());
 await t.test('migration preserves accepted friendships and exact rat offsets',async()=>{
  await db.exec('reset role');
  const old=(await db.query('select status from public.friendships')).rows[0];assert.equal(old.status,'accepted');
  assert.deepEqual((await db.query('select studyrat_accessory_offsets v from public.profiles where user_id=$1',[A])).rows[0].v,{crown:{x:0.2,y:0.1,v:2}});
 });
 await t.test('unauthenticated requests cannot create or discover data',async()=>{
  await as(null);await assert.rejects(command('create_room',{name:'Denied'}),/Autenticação/);await assert.rejects(snapshot(),/Autenticação/);
 });
 await t.test('pending requests require recipient acceptance, blocks remove edges and suggestions require opt in',async()=>{
  await as(A);await db.query('select private.add_friend_by_luria_id($1)',['FRIEND02']);
  assert.equal((await snapshot()).requests[0].incoming,false);
  const pending=(await snapshot()).requests[0];await command('friend_accept',{id:pending.id});assert.equal((await snapshot()).requests.length,1);
  await as(B);await command('friend_accept',{id:pending.id});assert.equal((await snapshot()).requests.length,0);
  await command('privacy',{discoverable:true});await as(C);const s=await snapshot();assert.equal(s.suggestions.length,1);assert.equal(s.suggestions[0].user_id,B);
  await command('block',{user_id:B});assert.equal((await snapshot()).suggestions.length,0);
 });
 await t.test('groups preserve administration and invite permissions, and are distinct from rooms',async()=>{
  await as(A);const g=(await command('create_group',{name:'Grupo de cardiologia',area:'Medicina',objective:'Revisar às sextas'})).id;
  const own=(await snapshot()).groups.find(x=>x.id===g);assert.equal(own.members,1);assert.equal(own.role,'admin');
  await as(B);await command('join_group',{code:own.invite});await assert.rejects(command('group_update',{group_id:g,objective:'Ataque'}),/administradores/);
  await as(A);await command('group_admin',{group_id:g,user_id:B,admin:true});await as(B);await command('group_update',{group_id:g,objective:'Revisar toda semana'});
  assert.equal((await snapshot()).groups[0].objective,'Revisar toda semana');const code=(await command('group_invite',{group_id:g})).code;assert.notEqual(code,own.invite);
  await as(C);await assert.rejects(command('join_group',{code:own.invite}),/inválido/);await command('join_group',{code});
  assert.equal((await snapshot()).groups[0].members,3);
  await as(A);await command('group_remove',{group_id:g,user_id:C});await as(C);await assert.rejects(command('group_members',{group_id:g}),/Acesso/);
 });
 await t.test('friend presence is opt in, owner published, and hidden after blocking',async()=>{
  await as(A);await command('privacy',{share_status:true});await db.query("select set_config('realtime.topic',$1,false)",['social-presence:'+A]);await db.query("insert into realtime.messages(extension) values('presence')");
  await as(B);assert.equal((await db.query('select * from realtime.messages')).rows.length,1);await assert.rejects(db.query("insert into realtime.messages(extension) values('presence')"),/row-level security/);
  await command('block',{user_id:A});assert.equal((await db.query('select * from realtime.messages')).rows.length,0);await command('unblock',{user_id:A});
  await as(A);await command('privacy',{share_status:false});await assert.rejects(db.query("insert into realtime.messages(extension) values('presence')"),/row-level security/);
 });
 await t.test('collective Pomodoro catches up after suspension, pauses and never inserts individual study time',async()=>{
  await as(A);const r=(await command('create_room',{name:'Foco',visibility:'public',mode:'focus',focus:25,break:5})).id;
  await command('session_start',{room_id:r,mode:'focus'});await db.exec('reset role');await db.query("update public.study_room_sessions set ends_at=now()-interval '20 seconds' where room_id=$1",[r]);
  await as(A);let s=(await snapshot(r)).session;assert.equal(s.phase,'break');assert(s.remaining_seconds<=280&&s.remaining_seconds>=278);
  await command('session_pause',{room_id:r});s=(await snapshot(r)).session;assert.equal(s.status,'paused');assert.equal(s.ends_at,null);
  await command('session_resume',{room_id:r});assert.equal((await snapshot(r)).session.status,'running');
  await db.exec('reset role');assert.equal((await db.query('select count(*) n from public.study_sessions')).rows[0].n,0);
  await as(A);await command('archive_room',{room_id:r});
 });
 await t.test('voice requires a still valid Supabase session, not merely an unexpired JWT identity',async()=>{
  await as(A);const r=(await command('create_room',{name:'Voz',visibility:'public',voice:true})).id;
  assert.equal((await db.query('select public.social_voice_authorize($1::uuid) v',[r])).rows[0].v.enabled,true);
  await db.exec('reset role');await db.query('delete from auth.sessions where id=$1',[A]);await as(A);
  await assert.rejects(db.query('select public.social_voice_authorize($1::uuid)',[r]),/revogada/);
  await db.exec('reset role');await db.query('insert into auth.sessions(id,user_id) values($1,$1)',[A]);await as(A);await command('archive_room',{room_id:r});
 });
 let room,invite;
 await t.test('private room is invisible and inaccessible without invitation; capacity is checked under row lock',async()=>{
  await as(A);room=(await command('create_room',{name:'Cardiologia',visibility:'private',capacity:2,mode:'together'})).id;invite=(await snapshot(room)).invite;
  await as(B);assert.equal((await command('list_rooms')).length,0);await assert.rejects(snapshot(room),/Entre na sala/);await assert.rejects(command('join_room',{room_id:room}),/Convite/);
  assert.equal((await command('join_room',{code:invite})).id,room);
  await as(C);await assert.rejects(command('join_room',{code:invite}),/lotada/);
 });
 await t.test('nonmembers cannot spoof chat, read history, directly write tables or access a private channel',async()=>{
  await as(C);await assert.rejects(command('send_message',{room_id:room,body:'spoof',client_id:Q}),/Participação/);
  assert.equal((await db.query('select * from public.study_room_messages')).rows.length,0);
  await assert.rejects(db.query('insert into public.study_room_messages(room_id,user_id,body,client_id) values($1,$2,$3,$4)',[room,A,'spoof',Q]),/permission denied/);
  await db.query("select set_config('realtime.topic',$1,false)",['study-room:'+room]);await assert.rejects(db.query("insert into realtime.messages(extension) values('presence')"),/row-level security/);
 });
 await t.test('chat is idempotent, cross-room replies are rejected and content remains plain text',async()=>{
  await as(B);const payload={room_id:room,body:'<img src=x onerror=alert(1)>',client_id:Q};const first=await command('send_message',payload);assert.equal((await command('send_message',payload)).id,first.id);
  assert.equal((await command('messages',{room_id:room})).length,1);
  await assert.rejects(command('send_message',{...payload,client_id:SET,reply_to:SET}),/Mensagem indisponível/);
  await assert.rejects(command('session_start',{room_id:room}),/administradores/);
 });
 await t.test('quiz returns no answers until cohort completes; direct question RLS remains private',async()=>{
  await db.exec('reset role');await db.query("insert into public.question_attempts(user_id,question_item_id,result,selected_option,correct_option) values($1,$2,'wrong','A','B')",[A,Q]);
  await db.query('update public.question_items set alternatives=$1::jsonb where id=$2',[JSON.stringify({A:{text:'Alternativa A',is_correct:false,explanation:'Oculta'},B:{text:'Alternativa B',is_correct:true}}),Q]);
  await as(A);await command('session_start',{room_id:room,mode:'together'});let q=await command('quiz_start',{room_id:room,set_id:SET,duration:90});
  assert.equal(q.answer,undefined);assert.equal(q.explanations,undefined);assert.equal(q.results,undefined);assert.equal(q.total,2);
  assert.equal(q.alternatives.A,'Alternativa A');assert.equal(q.alternatives.B,'Alternativa B');assert.doesNotMatch(JSON.stringify(q.alternatives),/is_correct|explanation/);
  const id=q.id;await command('quiz_answer',{room_id:room,id,choice:'B'});q=await command('quiz_reveal',{room_id:room});assert.equal(q.answer,undefined);
  assert.equal((await db.query('select * from public.question_attempts')).rows.length,1);
  assert.equal((await db.query('select * from public.question_attempts')).rows[0].result,'wrong');
  await as(B);assert.equal((await db.query('select * from public.question_items')).rows.length,0);q=(await snapshot(room)).quiz;assert.equal(q.results,undefined);assert.equal(q.my_choice,null);assert.equal(q.answered,1);
  q=await command('quiz_answer',{room_id:room,id,choice:'A'});assert.equal(q.answer,'B');assert.equal(q.results.length,2);assert.equal(q.explanations.A,'Explicação A');
  assert.equal((await db.query('select * from public.question_attempts')).rows[0].result,'wrong');
  await command('quiz_reveal',{room_id:room});assert.equal((await db.query('select * from public.question_attempts')).rows.length,1);
  await assert.rejects(command('quiz_answer',{room_id:room,id,choice:'B'}),/não aceita/);
  await as(A);assert.equal((await db.query('select * from public.question_attempts')).rows[0].result,'wrong');
 });
 await t.test('invite rotation, leaving and room archiving preserve persisted messages and session history',async()=>{
  await as(A);const renewed=await command('renew_invite',{room_id:room});assert.notEqual(renewed.code,invite);
  await as(B);await command('leave_room',{room_id:room});await assert.rejects(snapshot(room),/Entre na sala/);await assert.rejects(command('join_room',{code:invite}),/indisponível/);
  assert.equal((await command('list_rooms',{scope:'recent'}))[0].id,room);
  await command('join_room',{room_id:room});assert.equal((await command('messages',{room_id:room})).length,1);
  await as(A);await command('session_end',{room_id:room});assert.equal((await snapshot(room)).history.length,1);await command('archive_room',{room_id:room});
  assert.equal((await command('list_rooms')).length,0);await db.exec('reset role');assert.equal((await db.query('select count(*) n from public.study_room_messages')).rows[0].n,1);
 });
 await t.test('new room references do not prevent the existing question deletion flow',async()=>{
  await db.exec('reset role');await db.query('delete from public.question_items where id=$1',[Q]);
  assert.equal((await db.query('select count(*) n from public.study_room_rounds')).rows[0].n,0);
  assert.equal((await db.query('select count(*) n from private.social_round_answers')).rows[0].n,0);
  assert.equal((await db.query('select count(*) n from public.study_room_sessions')).rows[0].n,2);
 });
});
