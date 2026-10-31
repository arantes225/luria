const test=require('node:test'),assert=require('node:assert/strict');
const {page,read}=require('./fixtures/frontend.cjs');const wait=()=>new Promise(r=>setTimeout(r,30));
test('room activity workspace embeds canonical editors, protects rendering and preserves simulator across updates',async t=>{
 const {w,d,errors}=page(t,'amigos/index.html');const room='aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',caseId='bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb';let active=null;const calls=[];
 w.TraubeDialog={confirm:async()=>true};w.TraubeSocial={getState:()=>({room:{id:room},is_admin:true}),command:async(a,p)=>calls.push({a,p}),refreshRoom:async()=>{}};
 w.supabaseClient={rpc:async(name,args)=>{calls.push(args);return {data:args.p_action==='catalog'?{questions:[],decks:[],cases:[{id:caseId,title:'Caso original',specialty:'Clínica'}]}:active};},channel:()=>({on(){return this;},subscribe(){return this;}}),removeChannel:()=>{}};
 w.eval(read('assets/js/social-native-activities.js'));w.eval(read('assets/js/social-view.js'));await wait();
 assert.equal(d.querySelector('.sc-workspace-tabs').nextElementSibling.id,'sc-panel-activity');
 await w.TraubeNativeActivities.open('questions');d.getElementById('na-create').click();assert(d.getElementById('na-question-form'));d.getElementById('na-import-questions').click();await wait();let frame=d.getElementById('room-native-editor');assert.equal(new URL(frame.src).pathname,'/questoes-simulados/');assert.equal(frame.dataset.roomId,room);
 d.getElementById('na-close-editor').click();await wait();assert.equal(d.getElementById('room-native-editor'),null);
 await w.TraubeNativeActivities.open('questions');d.getElementById('na-create').click();const form=d.getElementById('na-question-form');form.elements.title.value='Lista completa';form.querySelector('[name=stem]').value='Enunciado';form.querySelector('[name=option_A]').value='Alternativa A';form.querySelector('[name=option_B]').value='Alternativa B';form.dispatchEvent(new w.Event('submit',{bubbles:true,cancelable:true}));await wait();const authored=calls.find(c=>c.p_action==='create_question_list');assert.equal(authored.p_payload.items[0].alternatives.B,'Alternativa B');assert.equal(authored.p_payload.room_id,room);
 await w.TraubeNativeActivities.open('flashcards');d.getElementById('na-create').click();const deckForm=d.getElementById('na-deck-form');assert(deckForm,'criação de deck abre o formulário interno da sala');assert.match(deckForm.textContent,/Nenhum deck disponível/);assert.equal(d.getElementById('room-native-editor'),null);
 active={id:'cccccccc-cccc-4ccc-8ccc-cccccccccccc',kind:'flashcards',active:true,is_admin:true,title:'Deck',ordinal:0,total:1,front:'<script>bad()</script>',back:null,revealed:false,participants:[]};w.dispatchEvent(new w.Event('luria:room-rendered'));await wait();assert.equal(d.querySelector('#na-board script'),null);assert.match(d.getElementById('na-board').textContent,/<script>/);assert.equal(d.getElementById('na-back-image'),null);
 active={id:'dddddddd-dddd-4ddd-8ddd-dddddddddddd',kind:'simulator',active:true,is_admin:true,title:'Caso',case_id:caseId,participants:[]};w.dispatchEvent(new w.Event('luria:room-rendered'));await wait();assert(d.getElementById('na-play'),'a nova atividade compartilhada deve assumir a tela após atualização remota');d.getElementById('na-play').click();frame=d.getElementById('room-native-simulator');assert.equal(frame.dataset.caseId,caseId);assert.equal(new URL(frame.src).pathname,'/plantao/sala-emergencia/');w.dispatchEvent(new w.Event('luria:room-rendered'));await wait();assert.equal(d.getElementById('room-native-simulator'),frame);
 w.dispatchEvent(new w.MessageEvent('message',{origin:'https://evil.invalid',source:frame.contentWindow,data:{type:'luria:room-clinical-session',room_id:room,case_id:caseId,session_id:room}}));await wait();assert(!calls.some(c=>c.p_action==='simulation_join'));
 w.dispatchEvent(new w.MessageEvent('message',{origin:w.location.origin,source:frame.contentWindow,data:{type:'luria:room-clinical-session',room_id:room,case_id:caseId,session_id:room}}));await wait();assert(calls.some(c=>c.p_action==='simulation_join'));
 assert(d.getElementById('social-room').classList.contains('na-wide'));
 const close={type:'luria:room-simulator-close',room_id:room,case_id:caseId};
 for(const invalid of [{origin:'https://evil.invalid',source:frame.contentWindow,data:close},{origin:w.location.origin,source:w,data:close},{origin:w.location.origin,source:frame.contentWindow,data:{...close,case_id:room}}])w.dispatchEvent(new w.MessageEvent('message',invalid));
 assert.equal(d.getElementById('room-native-simulator'),frame);
 w.dispatchEvent(new w.MessageEvent('message',{origin:w.location.origin,source:frame.contentWindow,data:close}));
 assert.equal(d.getElementById('room-native-simulator'),null);assert(!d.getElementById('social-room').classList.contains('na-wide'));assert.equal(d.getElementById('na-wide').getAttribute('aria-pressed'),'false');
 d.getElementById('na-play').click();assert(d.getElementById('room-native-simulator'));assert(d.getElementById('social-room').classList.contains('na-wide'));
 d.querySelector('[data-workspace-tab="live"]').click();assert(!d.getElementById('social-room').classList.contains('na-wide'));assert(d.getElementById('room-native-simulator'));
 d.getElementById('sc-tab-activity').click();d.getElementById('na-wide').click();active={...active,active:false};w.dispatchEvent(new w.Event('luria:room-rendered'));await wait();assert.equal(d.getElementById('room-native-simulator'),null);assert(!d.getElementById('social-room').classList.contains('na-wide'));
 w.dispatchEvent(new w.Event('luria:room-exit'));assert.equal(d.querySelector('#na-simulator iframe'),null);assert.equal(d.querySelector('#na-editor iframe'),null);assert.deepEqual(errors,[]);
});

test('simulator embed reports exit only with validated frame context',async t=>{
 const {w,d}=page(t,'amigos/index.html');const frame=d.createElement('iframe');frame.id='room-native-simulator';frame.dataset.roomId='aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa';frame.dataset.nativeKind='simulator';frame.dataset.caseId='bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb';frame.src='/plantao/sala-emergencia/';d.body.append(frame);
 const messages=[];w.postMessage=(data,origin)=>messages.push({data,origin});const child=frame.contentWindow;child.document.open();child.document.write('<!doctype html><html><body></body></html>');child.document.close();child.eval(read('assets/js/room-native-embed.js'));child.dispatchEvent(new child.Event('luria:clinical-exit'));
 assert.equal(messages.length,1);assert.equal(messages[0].origin,w.location.origin);assert.equal(messages[0].data.type,'luria:room-simulator-close');assert.equal(messages[0].data.case_id,frame.dataset.caseId);
});

test('embed presentation is limited to the room frame and keeps only the parent companion',async t=>{
 const {w,d}=page(t,'amigos/index.html');w.eval(read('assets/js/room-native-embed.js'));assert.equal(w.TraubeRoomEmbed,undefined);
 const frame=d.createElement('iframe');frame.id='room-native-editor';frame.dataset.roomId='aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa';frame.dataset.nativeKind='flashcards';d.body.append(frame);
 const child=frame.contentWindow;child.eval(read('assets/js/room-native-embed.js'));assert.equal(child.TraubeRoomEmbed.kind,'flashcards');child.document.dispatchEvent(new child.Event('DOMContentLoaded'));const companion=child.document.createElement('professor-alex-mascot');child.document.body.append(companion);await wait();assert.equal(child.document.querySelector('professor-alex-mascot'),null);
});
