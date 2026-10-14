const test=require('node:test'),assert=require('node:assert/strict');
const {page,read}=require('./fixtures/frontend.cjs');
const {database,A,B,C,SET}=require('./fixtures/social-db.cjs');
const tick=()=>new Promise(r=>setTimeout(r,30));
async function fixture(t){
 const f=await database();t.after(()=>f.db.close());const {w,d,errors}=page(t,'amigos/index.html');let queue=Promise.resolve(),fails=false;
 const calls=[];const dispatch=(name,args)=>{
  const work=queue.then(async()=>{await f.as(A);calls.push({name,args});
   if(name==='social_snapshot')return f.snapshot(args.p_room_id);
   if(name==='social_room_features')return f.features(args.p_action,args.p_payload);
   if(name==='social_command'){if(fails&&args.p_action==='send_message')throw new Error('Envio interrompido');return f.command(args.p_action,args.p_payload);}
   if(name==='my_friends')return (await f.db.query('select * from private.my_friends()')).rows;
   if(name==='lookup_luria_user')return (await f.db.query('select * from private.lookup_luria_user($1)',[args.p_luria_id])).rows;
   if(name==='add_friend_by_luria_id')return (await f.db.query('select private.add_friend_by_luria_id($1) id',[args.p_luria_id])).rows[0].id;
   if(name==='remove_friend'){await f.db.query('delete from public.friendships where user_id=$1 and friend_user_id=$2',[A,args.p_friend_user_id]);return null;}
   return [];
  });queue=work.catch(()=>{});return work.then(data=>({data,error:null}),error=>({data:null,error:{message:error.message}}));
 };
 const channels=[];
 w.docmapUser={id:A};w.LuriaDialog={confirm:async()=>true,prompt:async()=>null,alert:async()=>{}};
 w.LuriaVoice={leave:async()=>{},mute(){},join:async()=>{},sync:async()=>{}};
 w.HTMLDialogElement.prototype.showModal=function(){this.open=true;};w.HTMLDialogElement.prototype.close=function(){this.open=false;};
 w.supabaseClient={rpc:dispatch,realtime:{setAuth:async()=>{}},auth:{getSession:async()=>({data:{session:{access_token:'test'}}})},
  from:()=>({select(){return this;},eq(){return this;},maybeSingle:async()=>({data:{luria_id:'OWNER001',studyrat_variant:'blue'},error:null})}),
  channel:(name,config)=>{const c={name,config,handlers:[],on(type,filter,handler){this.handlers.push({type,filter,handler});return this;},subscribe(handler){this.subscriber=handler;return this;},track:async()=>{},presenceState:()=>({}),send:async()=>{}};channels.push(c);return c;},removeChannel:async()=>{}
 };
 w.eval(read('assets/js/studyrats.js'));w.eval(read('assets/js/amigos.js'));w.eval(read('assets/js/community-navigation.js'));w.eval(read('assets/js/social-rooms.js'));
 await tick();await queue;await tick();
 return {w,d,errors,f,calls,channels,settle:async()=>{await tick();await queue;await tick();},fail:value=>{fails=value;}};
}
test('social UI persists actual rooms and messages through RPCs, never local demo data',async t=>{
 const x=await fixture(t),{w,d,f}=x;
 assert.equal(d.querySelectorAll('[data-community-tab]').length,2);assert.equal(d.getElementById('studyrats-card').closest('[role="tabpanel"]').id,'community-friends-panel');
 assert.doesNotMatch(d.body.textContent,/Carla Monteiro|ENEM 2024|Mariana Costa/);
 d.getElementById('friends-create-room-toggle').click();await x.settle();assert.equal(d.getElementById('social-dialog').open,true);
 const form=d.getElementById('social-dialog-form');form.elements.name.value='Turma <script>alert(1)</script>';form.elements.visibility.value='public';form.dispatchEvent(new w.Event('submit',{bubbles:true,cancelable:true}));await x.settle();
 const state=w.LuriaSocial.getState();assert(state.room.id);assert.equal(d.getElementById('social-dialog').open,false);assert.equal(d.getElementById('community-rooms-panel').hidden,false);assert.equal(d.getElementById('social-room').hidden,false);
 assert.equal(d.getElementById('social-room-title').querySelector('script'),null);assert.match(d.getElementById('social-room-title').textContent,/<script>/);
 assert.equal(w.localStorage.getItem('luria:study-rooms'),null);assert.equal(x.channels.find(c=>c.name.startsWith('study-room:')).config.config.private,true);
 const input=d.getElementById('social-message-text');input.value='<img src=x onerror=alert(1)> https://example.com @Bruno';d.getElementById('social-message-form').dispatchEvent(new w.Event('submit',{cancelable:true,bubbles:true}));await x.settle();
 assert.equal(d.querySelector('#social-messages img'),null);assert.match(d.getElementById('social-messages').textContent,/<img/);assert.equal(d.querySelector('#social-messages a').rel,'noopener noreferrer');
 await f.as(A);assert.equal((await f.command('messages',{room_id:state.room.id})).length,1);
 await w.LuriaSocial.leave();assert.equal(d.getElementById('social-room').hidden,true);assert.match(d.getElementById('social-rooms').textContent,/Turma/);
 await w.LuriaSocial.enter({room_id:state.room.id});assert.match(d.getElementById('social-messages').textContent,/<img/);assert.deepEqual(x.errors,[]);
});
test('room configuration, agenda and confirmed quiz responses execute their real shared commands',async t=>{
 const x=await fixture(t),{w,d,f}=x;const created=await w.LuriaSocial.command('create_room',{name:'Revisão compartilhada',visibility:'public'});await w.LuriaSocial.enter({room_id:created.id});
 d.getElementById('social-room-settings').click();await x.settle();const form=d.getElementById('social-dialog-form');form.elements.objective.value='Revisar ECG';form.dispatchEvent(new w.Event('submit',{bubbles:true,cancelable:true}));await x.settle();assert.equal(w.LuriaSocial.getState().room.objective,'Revisar ECG');
 d.getElementById('social-checklist-text').value='Interpretação inicial';d.getElementById('social-agenda-at').value='2026-10-15T14:00';d.getElementById('social-checklist-form').dispatchEvent(new w.Event('submit',{bubbles:true,cancelable:true}));await x.settle();assert.equal(w.LuriaSocial.getState().checklist.length,1);assert.equal(w.LuriaSocial.getState().checklist[0].duration_minutes,25);
 await w.LuriaSocial.command('session_start',{room_id:created.id,mode:'together'});await w.LuriaSocial.command('quiz_start',{room_id:created.id,set_id:SET,duration:90});await w.LuriaSocial.enter({room_id:created.id});await x.settle();
 d.querySelector('[data-answer="B"]').click();await x.settle();assert.equal(w.LuriaSocial.getState().quiz.my_choice,null);assert.equal(d.getElementById('social-answer-submit').disabled,false);
 d.getElementById('social-answer-submit').click();await x.settle();assert.equal(w.LuriaSocial.getState().quiz.my_choice,'B');assert(w.LuriaSocial.getState().quiz.revealed_at);await f.as(A);assert.equal((await f.snapshot(created.id)).quiz.answer,'B');
 await w.LuriaSocial.leave();assert.deepEqual(x.errors,[]);
});
test('social UI preserves failed drafts and isolates them by account and room',async t=>{
 const x=await fixture(t),{w,d}=x;const created=await w.LuriaSocial.command('create_room',{name:'Revisão',visibility:'private'});await w.LuriaSocial.enter({room_id:created.id});
 const input=d.getElementById('social-message-text');input.value='Mensagem importante';input.dispatchEvent(new w.Event('input',{bubbles:true}));x.fail(true);
 d.getElementById('social-message-form').dispatchEvent(new w.Event('submit',{cancelable:true,bubbles:true}));await x.settle();assert.equal(input.value,'Mensagem importante');assert.match(d.getElementById('social-send-status').textContent,/rascunho/);
 x.fail(false);d.getElementById('social-message-form').dispatchEvent(new w.Event('submit',{cancelable:true,bubbles:true}));await x.settle();
 const sends=x.calls.filter(c=>c.name==='social_command'&&c.args.p_action==='send_message');assert.equal(sends.length,2);assert.equal(sends[0].args.p_payload.client_id,sends[1].args.p_payload.client_id);assert.equal(input.value,'');
 w.LuriaLocalOwnerStore={ownerId:B};w.dispatchEvent(new w.Event('luria:owner-changed'));await x.settle();assert.equal(w.LuriaSocial.getState(),null);assert.equal(d.getElementById('social-messages').textContent,'');
});
test('social UI sends invitations, renders real groups and filters existing friends without inventing presence',async t=>{
 const x=await fixture(t),{w,d}=x;
 d.getElementById('friend-id-input').value='FRIEND02';d.getElementById('add-friend').click();await x.settle();assert.match(d.getElementById('social-requests').textContent,/Aguardando aceite/);assert.doesNotMatch(d.getElementById('friends-list').textContent,/Bruno/);
 d.getElementById('friends-search').value='Nome inexistente';d.getElementById('friends-search').dispatchEvent(new w.Event('input'));assert.match(d.getElementById('friends-list').textContent,/Nenhum amigo encontrado/);
 await w.LuriaSocial.command('create_group',{name:'Clínica médica',area:'Medicina',objective:'Revisar toda semana'});await w.LuriaSocial.refreshSocial();assert.match(d.getElementById('social-groups').textContent,/Clínica médica/);assert.equal(d.getElementById('social-room-group').options.length,2);assert.deepEqual(x.errors,[]);
});
test('rat catalog restores the server-supported original ears accessory and keeps both offset formats',async t=>{
 const {w}=await fixture(t);const ears=w.sharedStudyratAccessory('mouse-ears');assert.equal(ears.id,'mouse-ears');assert.match(ears.src,/mouse-ears-headband\.webp/);
 w.LuriaEntitlements={enabled:()=>true};let stored={x:7.2,y:5,v:1};
 w.supabaseClient.from=()=>({select(){return this;},eq(){return this;},maybeSingle:async()=>({data:{studyrat_variant:'blue',studyrat_accessory:'mouse-ears',studyrat_accessory_offsets:{'mouse-ears':stored}},error:null})});
 await w.sharedStudyratsLoadMyVariant();let offset=w.sharedStudyratsCurrentAccessoryOffset('mouse-ears');assert.equal(offset.x,.1);assert.equal(offset.y,.1);
 stored={x:.3,y:-.2,v:2};await w.sharedStudyratsLoadMyVariant();offset=w.sharedStudyratsCurrentAccessoryOffset('mouse-ears');assert.equal(offset.x,.3);assert.equal(offset.y,-.2);
});

test('leaving for the hall stops voice before releasing participation and tab navigation exits the room',async t=>{
 const x=await fixture(t),{w,d}=x;const created=await w.LuriaSocial.command('create_room',{name:'Saída da chamada',visibility:'private'});await w.LuriaSocial.enter({room_id:created.id});
 let stopped=false,resolveVoice;w.LuriaVoice.leave=()=>{stopped=true;return new Promise(resolve=>{resolveVoice=resolve;});};
 const before=x.calls.filter(c=>c.args?.p_action==='leave_room').length;
 d.getElementById('community-tab-rooms').click();assert.equal(stopped,true);assert.equal(d.getElementById('social-room').hidden,true);assert.equal(x.calls.filter(c=>c.args?.p_action==='leave_room').length,before);
 w.LuriaVoice.leave=async()=>{};resolveVoice();await x.settle();assert.equal(w.LuriaSocial.getState(),null);assert.equal(x.calls.filter(c=>c.args?.p_action==='leave_room').length,before+1);assert.equal(w.location.hash,'#community-rooms');
 await w.LuriaSocial.enter({room_id:created.id});d.getElementById('community-tab-friends').click();await x.settle();assert.equal(w.LuriaSocial.getState(),null);assert.equal(w.location.hash,'#community-friends');assert.deepEqual(x.errors,[]);
});
