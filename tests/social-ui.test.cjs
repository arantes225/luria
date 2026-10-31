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
 w.docmapUser={id:A};w.TraubeDialog={confirm:async()=>true,prompt:async()=>null,alert:async()=>{}};
 w.TraubeVoice={leave:async()=>{},mute(){},join:async()=>{},sync:async()=>{}};
 w.HTMLDialogElement.prototype.showModal=function(){this.open=true;};w.HTMLDialogElement.prototype.close=function(){this.open=false;};
 w.supabaseClient={rpc:dispatch,realtime:{setAuth:async()=>{}},auth:{getSession:async()=>({data:{session:{access_token:'test'}}})},
  from:()=>({select(){return this;},eq(){return this;},maybeSingle:async()=>({data:{luria_id:'OWNER001',studyrat_variant:'blue'},error:null})}),
  channel:(name,config)=>{const c={name,config,handlers:[],on(type,filter,handler){this.handlers.push({type,filter,handler});return this;},subscribe(handler){this.subscriber=handler;return this;},track:async()=>{},presenceState:()=>({}),send:async()=>{}};channels.push(c);return c;},removeChannel:async()=>{}
 };
 w.eval(read('assets/js/studyrats.js'));w.eval(read('assets/js/amigos.js'));w.eval(read('assets/js/community-navigation.js'));w.eval(read('assets/js/social-rooms.js'));w.eval(read('assets/js/social-view.js'));
 await tick();await queue;await tick();
 return {w,d,errors,f,calls,channels,settle:async()=>{await tick();await queue;await tick();},fail:value=>{fails=value;}};
}
test('social UI persists actual rooms and messages through RPCs, never local demo data',async t=>{
 const x=await fixture(t),{w,d,f}=x;
 assert.equal(d.querySelectorAll('[data-community-tab]').length,3);assert.equal(d.getElementById('studyrats-card').closest('[role="tabpanel"]').id,'community-friends-panel');
 assert.doesNotMatch(d.body.textContent,/Carla Monteiro|ENEM 2024|Mariana Costa/);
 d.getElementById('friends-create-room-toggle').click();await x.settle();assert.equal(d.getElementById('social-dialog').open,true);
 const form=d.getElementById('social-dialog-form');form.elements.name.value='Turma <script>alert(1)</script>';form.elements.visibility.value='public';form.dispatchEvent(new w.Event('submit',{bubbles:true,cancelable:true}));await x.settle();
 const state=w.TraubeSocial.getState();assert(state.room.id);assert.equal(d.getElementById('social-dialog').open,false);assert.equal(d.getElementById('community-rooms-panel').hidden,false);assert.equal(d.getElementById('social-room').hidden,false);
 assert.equal(d.getElementById('social-room-title').querySelector('script'),null);assert.match(d.getElementById('social-room-title').textContent,/<script>/);
 assert.equal(w.localStorage.getItem('luria:study-rooms'),null);assert.equal(x.channels.find(c=>c.name.startsWith('study-room:')).config.config.private,true);
 const input=d.getElementById('social-message-text');input.value='<img src=x onerror=alert(1)> https://example.com @Bruno';d.getElementById('social-message-form').dispatchEvent(new w.Event('submit',{cancelable:true,bubbles:true}));await x.settle();
 assert.equal(d.querySelector('#social-messages img'),null);assert.match(d.getElementById('social-messages').textContent,/<img/);assert.equal(d.querySelector('#social-messages a').rel,'noopener noreferrer');
 await f.as(A);assert.equal((await f.command('messages',{room_id:state.room.id})).length,1);
 await w.TraubeSocial.leave();assert.equal(d.getElementById('social-room').hidden,true);assert.match(d.getElementById('social-rooms').textContent,/Turma/);
 await w.TraubeSocial.enter({room_id:state.room.id});assert.match(d.getElementById('social-messages').textContent,/<img/);assert.deepEqual(x.errors,[]);
});
test('room configuration, agenda and confirmed quiz responses execute their real shared commands',async t=>{
 const x=await fixture(t),{w,d,f}=x;const created=await w.TraubeSocial.command('create_room',{name:'Revisão compartilhada',visibility:'public'});await w.TraubeSocial.enter({room_id:created.id});
 d.getElementById('social-room-settings').click();await x.settle();const form=d.getElementById('social-dialog-form');form.elements.objective.value='Revisar ECG';form.dispatchEvent(new w.Event('submit',{bubbles:true,cancelable:true}));await x.settle();assert.equal(w.TraubeSocial.getState().room.objective,'Revisar ECG');
 d.getElementById('social-checklist-text').value='Interpretação inicial';d.getElementById('social-agenda-at').value='2026-10-15T14:00';d.getElementById('social-checklist-form').dispatchEvent(new w.Event('submit',{bubbles:true,cancelable:true}));await x.settle();assert.equal(w.TraubeSocial.getState().checklist.length,1);assert.equal(w.TraubeSocial.getState().checklist[0].duration_minutes,25);
 await w.TraubeSocial.command('session_start',{room_id:created.id,mode:'together'});await w.TraubeSocial.command('quiz_start',{room_id:created.id,set_id:SET,duration:90});await w.TraubeSocial.enter({room_id:created.id});await x.settle();
 d.querySelector('[data-answer="B"]').click();await x.settle();assert.equal(w.TraubeSocial.getState().quiz.my_choice,null);assert.equal(d.getElementById('social-answer-submit').disabled,false);
 d.getElementById('social-answer-submit').click();await x.settle();assert.equal(w.TraubeSocial.getState().quiz.my_choice,'B');assert(w.TraubeSocial.getState().quiz.revealed_at);await f.as(A);assert.equal((await f.snapshot(created.id)).quiz.answer,'B');
 await w.TraubeSocial.leave();assert.deepEqual(x.errors,[]);
});
test('social UI preserves failed drafts and isolates them by account and room',async t=>{
 const x=await fixture(t),{w,d}=x;const created=await w.TraubeSocial.command('create_room',{name:'Revisão',visibility:'private'});await w.TraubeSocial.enter({room_id:created.id});
 const input=d.getElementById('social-message-text');input.value='Mensagem importante';input.dispatchEvent(new w.Event('input',{bubbles:true}));x.fail(true);
 d.getElementById('social-message-form').dispatchEvent(new w.Event('submit',{cancelable:true,bubbles:true}));await x.settle();assert.equal(input.value,'Mensagem importante');assert.match(d.getElementById('social-send-status').textContent,/rascunho/);
 x.fail(false);d.getElementById('social-message-form').dispatchEvent(new w.Event('submit',{cancelable:true,bubbles:true}));await x.settle();
 const sends=x.calls.filter(c=>c.name==='social_command'&&c.args.p_action==='send_message');assert.equal(sends.length,2);assert.equal(sends[0].args.p_payload.client_id,sends[1].args.p_payload.client_id);assert.equal(input.value,'');
 w.TraubeLocalOwnerStore={ownerId:B};w.dispatchEvent(new w.Event('luria:owner-changed'));await x.settle();assert.equal(w.TraubeSocial.getState(),null);assert.equal(d.getElementById('social-messages').textContent,'');
});

test('visual mode controls and modal agenda preserve the room channel and confirmed persisted state',async t=>{
 const x=await fixture(t),{w,d}=x;const created=await w.TraubeSocial.command('create_room',{name:'Sala de revisão visual',visibility:'private'});await w.TraubeSocial.enter({room_id:created.id});
 const count=x.channels.length;let voiceLeaves=0;w.TraubeVoice.leave=async()=>{voiceLeaves++;};
 assert.equal(d.body.classList.contains('social-in-room'),true);assert.equal(d.querySelector('.social-chat .social-voice'),null);
 d.querySelector('[data-study-mode="focus"]').click();await x.settle();assert.equal(w.TraubeSocial.getState().room.mode,'focus');assert.equal(d.getElementById('social-room').dataset.mode,'focus');assert.equal(x.channels.length,count);assert.equal(voiceLeaves,0);
 d.querySelector('[data-open-dialog="social-agenda-dialog"]').click();assert.equal(d.getElementById('social-agenda-dialog').open,true);
 d.getElementById('social-checklist-text').value='Revisar atividade';d.getElementById('social-checklist-form').dispatchEvent(new w.Event('submit',{cancelable:true,bubbles:true}));await x.settle();assert.equal(d.getElementById('social-agenda-dialog').open,false);assert.equal(w.TraubeSocial.getState().checklist.length,1);
 d.querySelector('[data-agenda-edit]').click();await x.settle();assert.equal(d.getElementById('social-agenda-dialog').open,true);assert.equal(d.getElementById('social-checklist-text').value,'Revisar atividade');
 w.TraubeSocialView.close('social-agenda-dialog');d.getElementById('social-session-start').click();await x.settle();assert.equal(w.TraubeSocial.getState().session.mode,'focus');assert.equal(d.querySelector('[data-study-mode="review"]').disabled,true);assert.equal(x.channels.length,count);assert.equal(voiceLeaves,0);
 d.getElementById('social-chat-toggle').click();assert.equal(d.getElementById('social-chat-toggle').getAttribute('aria-expanded'),'true');
 d.getElementById('social-leave').click();await x.settle();assert.equal(d.body.classList.contains('social-in-room'),false);assert.deepEqual(x.errors,[]);
});

test('room music shares only Jam links without an embedded player',async t=>{
 const x=await fixture(t),{w,d}=x;const created=await w.TraubeSocial.command('create_room',{name:'Jam da turma',visibility:'private'});await w.TraubeSocial.enter({room_id:created.id});
 assert.equal(d.getElementById('social-spotify-form'),null);assert.equal(d.querySelector('.sv-music iframe'),null);
 d.getElementById('social-jam-url').value='https://spotify.link/abc123';d.getElementById('social-jam-form').dispatchEvent(new w.Event('submit',{cancelable:true,bubbles:true}));await x.settle();
 assert.equal(d.querySelector('#social-jam a').href,'https://spotify.link/abc123');
 d.querySelector('[data-study-mode="review"]').click();await x.settle();assert.equal(d.querySelector('#social-jam a').href,'https://spotify.link/abc123');
 await w.TraubeSocial.leave();assert.match(d.getElementById('social-jam-wall').textContent,/Jam da turma/);assert.equal(d.querySelector('#social-jam-wall a').href,'https://spotify.link/abc123');await w.TraubeSocial.enter({room_id:created.id});
 d.getElementById('social-jam-clear').click();await x.settle();assert.equal(d.querySelector('#social-jam a'),null);
 await w.TraubeSocial.leave();assert.deepEqual(x.errors,[]);
});

test('social UI sends invitations, renders real groups and filters existing friends without inventing presence',async t=>{
 const x=await fixture(t),{w,d}=x;
 d.getElementById('friend-id-input').value='FRIEND02';d.getElementById('add-friend').click();await x.settle();assert.match(d.getElementById('social-requests').textContent,/Aguardando aceite/);assert.doesNotMatch(d.getElementById('friends-list').textContent,/Bruno/);
 d.getElementById('friends-search').value='Nome inexistente';d.getElementById('friends-search').dispatchEvent(new w.Event('input'));assert.match(d.getElementById('friends-list').textContent,/Nenhum amigo encontrado/);
 await w.TraubeSocial.command('create_group',{name:'Clínica médica',area:'Medicina',objective:'Revisar toda semana'});await w.TraubeSocial.refreshSocial();assert.match(d.getElementById('social-groups').textContent,/Clínica médica/);assert.equal(d.getElementById('social-room-group').options.length,2);assert.deepEqual(x.errors,[]);
});
test('rat catalog restores the server-supported original ears accessory and keeps both offset formats',async t=>{
 const {w}=await fixture(t);const ears=w.sharedStudyratAccessory('mouse-ears');assert.equal(ears.id,'mouse-ears');assert.match(ears.src,/mouse-ears-headband\.webp/);
 w.TraubeEntitlements={enabled:()=>true};let stored={x:7.2,y:5,v:1};
 w.supabaseClient.from=()=>({select(){return this;},eq(){return this;},maybeSingle:async()=>({data:{studyrat_variant:'blue',studyrat_accessory:'mouse-ears',studyrat_accessory_offsets:{'mouse-ears':stored}},error:null})});
 await w.sharedStudyratsLoadMyVariant();let offset=w.sharedStudyratsCurrentAccessoryOffset('mouse-ears');assert.equal(offset.x,.1);assert.equal(offset.y,.1);
 stored={x:.3,y:-.2,v:2};await w.sharedStudyratsLoadMyVariant();offset=w.sharedStudyratsCurrentAccessoryOffset('mouse-ears');assert.equal(offset.x,.3);assert.equal(offset.y,-.2);
});

test('leaving for the hall stops voice before releasing participation and tab navigation exits the room',async t=>{
 const x=await fixture(t),{w,d}=x;const created=await w.TraubeSocial.command('create_room',{name:'Saída da chamada',visibility:'private'});await w.TraubeSocial.enter({room_id:created.id});
 let stopped=false,resolveVoice;w.TraubeVoice.leave=()=>{stopped=true;return new Promise(resolve=>{resolveVoice=resolve;});};
 const before=x.calls.filter(c=>c.args?.p_action==='leave_room').length;
 d.getElementById('community-tab-rooms').click();assert.equal(stopped,true);assert.equal(d.getElementById('social-room').hidden,true);assert.equal(x.calls.filter(c=>c.args?.p_action==='leave_room').length,before);
 w.TraubeVoice.leave=async()=>{};resolveVoice();await x.settle();assert.equal(w.TraubeSocial.getState(),null);assert.equal(x.calls.filter(c=>c.args?.p_action==='leave_room').length,before+1);assert.equal(w.location.hash,'#community-rooms');
 await w.TraubeSocial.enter({room_id:created.id});d.getElementById('community-tab-friends').click();await x.settle();assert.equal(w.TraubeSocial.getState(),null);assert.equal(w.location.hash,'#community-friends');assert.deepEqual(x.errors,[]);
});

test('friends stage opens the original invitation flow in a dialog and navigates three areas by keyboard',async t=>{
 const {w,d,errors}=await fixture(t);const viewScript=[...d.scripts].find(s=>s.src.includes('/social-view.js'));assert(d.getElementById('sf-add-dialog').compareDocumentPosition(viewScript)&w.Node.DOCUMENT_POSITION_FOLLOWING);const add=d.getElementById('friends-ref-add-toggle');add.focus();add.click();assert.equal(d.getElementById('sf-add-dialog').open,true);assert.equal(d.activeElement.id,'friend-id-input');
 d.querySelector('[data-close-dialog="sf-add-dialog"]').click();assert.equal(d.getElementById('sf-add-dialog').open,false);assert.equal(d.activeElement,add);
 d.getElementById('community-tab-friends').dispatchEvent(new w.KeyboardEvent('keydown',{key:'ArrowRight',bubbles:true}));assert.equal(d.getElementById('community-tab-groups').getAttribute('aria-selected'),'true');assert.equal(d.getElementById('community-groups-panel').hidden,false);assert.equal(d.getElementById('community-friends-panel').inert,true);assert.deepEqual(errors,[]);
});

test('group cards use real members, searchable names and the existing history and member operations',async t=>{
 const x=await fixture(t),{w,d}=x;const g=await w.TraubeSocial.command('create_group',{name:'Cardio <teste>',area:'Clínica médica',objective:'Revisar diretrizes'});await w.TraubeSocial.refreshSocial();
 d.getElementById('community-tab-groups').click();const card=d.querySelector('.sg-card');assert.match(card.textContent,/Cardio <teste>/);assert.equal(card.querySelector('teste'),null);assert.match(card.textContent,/1 membro/);
 const search=d.getElementById('sg-search');search.value='Outro';search.dispatchEvent(new w.Event('input'));await x.settle();assert.equal(card.hidden,true);assert.equal(d.getElementById('sg-search-empty').hidden,false);
 search.value='Cardio';search.dispatchEvent(new w.Event('input'));await x.settle();assert.equal(card.hidden,false);card.querySelector('details').open=true;
 card.querySelector('[data-group-members]').click();await x.settle();assert.match(d.getElementById('social-group-members-'+g.id).textContent,/Administrador/);assert(x.calls.some(c=>c.args?.p_action==='group_members'));
 card.querySelector('[data-group-history]').click();await x.settle();assert.match(d.getElementById('social-group-members-'+g.id).textContent,/Nenhuma sessão/);
 await w.TraubeSocial.refreshSocial();assert.equal(d.querySelector('.sg-details').open,true);assert.deepEqual(x.errors,[]);
});

test('saved rat appearance stays consistent across preview and race even when item changes are locked',async t=>{
 const {w,d}=await fixture(t);w.TraubeEntitlements={enabled:()=>false};w.supabaseClient.from=()=>({select(){return this;},eq(){return this;},maybeSingle:async()=>({data:{studyrat_variant:'pink',studyrat_accessory:'wizard-hat',studyrat_accessory_offsets:{'wizard-hat':{x:.12,y:-.08,v:2}}},error:null})});
 await w.sharedStudyratsLoadMyVariant();const grouped=w.sharedStudyratsGroup([{challenge_id:'test',participant_user_id:A,participant_name:'Ana',studyrat_variant:'brown',progress:0}]);const rat=grouped[0].participants[0];assert.equal(rat.variant,'pink');assert.equal(rat.accessory,'wizard-hat');assert.equal(rat.accessoryX,.12);assert.equal(rat.accessoryY,-.08);assert.match(d.getElementById('studyrats-home-preview-stage').innerHTML,/ratinho_rosa_choque/);
 await w.sharedStudyratsSaveVariant('green');assert.match(d.getElementById('studyrats-home-preview-stage').innerHTML,/ratinho_rosa_choque/);
});

test('room design keeps grouped form validation and real group creation without unavailable activities',async t=>{
 const x=await fixture(t),{w,d}=x;d.getElementById('social-group-create').click();await x.settle();const form=d.getElementById('social-dialog-form');assert.equal(form.elements.name.disabled,false);assert.equal(form.elements.description.disabled,false);assert.equal(form.elements.area.disabled,false);assert.equal(form.elements.capacity.disabled,true);form.elements.name.value='Grupo do formulário';form.dispatchEvent(new w.Event('submit',{cancelable:true,bubbles:true}));await x.settle();assert.match(d.getElementById('social-groups').textContent,/Grupo do formulário/);
 d.getElementById('friends-create-room-toggle').click();await x.settle();assert.equal(form.elements.capacity.disabled,false);form.elements.name.value='Sala do formulário';form.elements.mode.value='focus';form.dispatchEvent(new w.Event('submit',{cancelable:true,bubbles:true}));await x.settle();assert.equal(w.TraubeSocial.getState().room.mode,'focus');assert.equal(d.querySelectorAll('[data-study-mode]').length,4);assert.equal(d.querySelectorAll('[data-study-mode="flashcards"],[data-study-mode="simulation"]').length,0);await w.TraubeSocial.leave();assert.equal(d.querySelector('.sl-room-card').dataset.roomMode,'focus');assert.match(d.querySelector('.sl-room-cover').textContent,/Foco/);assert.deepEqual(x.errors,[]);
});

test('compact viewport updates preserve the chat draft and composer through keyboard resize',async t=>{
 const {w,d,errors}=page(t,'amigos/index.html');const viewport=new w.EventTarget();viewport.height=800;viewport.offsetTop=0;Object.defineProperty(w,'visualViewport',{value:viewport});w.eval(read('assets/js/social-view.js'));const composer=d.getElementById('social-message-form'),input=d.getElementById('social-message-text');input.value='Rascunho preservado';
 viewport.height=280;viewport.offsetTop=12;viewport.dispatchEvent(new w.Event('resize'));await tick();assert.equal(d.body.style.getPropertyValue('--sl-visible-height'),'280px');assert.equal(d.body.style.getPropertyValue('--sl-visible-top'),'12px');assert.equal(d.body.classList.contains('sl-short-viewport'),true);assert.equal(d.getElementById('social-message-form'),composer);assert.equal(input.value,'Rascunho preservado');
 viewport.height=800;viewport.offsetTop=0;viewport.dispatchEvent(new w.Event('resize'));await tick();assert.equal(d.body.classList.contains('sl-short-viewport'),false);assert.equal(input.value,'Rascunho preservado');assert.deepEqual(errors,[]);
});

 test('workspace navigation keeps live session and chat nodes mounted while exposing accessible panels',async t=>{
 const {w,d,errors}=page(t,'amigos/index.html');w.eval(read('assets/js/social-view.js'));const timer=d.getElementById('social-timer'),composer=d.getElementById('social-message-form'),input=d.getElementById('social-message-text');timer.textContent='23:42';input.value='Rascunho da conversa';
 d.getElementById('sc-tab-plan').click();assert.equal(d.getElementById('sc-panel-live').hidden,true);assert.equal(d.getElementById('sc-panel-plan').hidden,false);assert.equal(d.getElementById('sc-tab-plan').getAttribute('aria-selected'),'true');
 d.getElementById('sc-tab-plan').dispatchEvent(new w.KeyboardEvent('keydown',{key:'End',bubbles:true,cancelable:true}));assert.equal(d.activeElement.id,'sc-tab-progress');assert.equal(d.getElementById('sc-panel-progress').hidden,false);
 d.getElementById('sc-tab-live').click();assert.equal(d.getElementById('sc-panel-live').hidden,false);assert.equal(d.getElementById('social-timer'),timer);assert.equal(timer.textContent,'23:42');assert.equal(d.getElementById('social-message-form'),composer);assert.equal(input.value,'Rascunho da conversa');assert.deepEqual(errors,[]);
 });
