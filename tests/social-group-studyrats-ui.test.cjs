const test=require('node:test'),assert=require('node:assert/strict');const {page,read}=require('./fixtures/frontend.cjs');const wait=()=>new Promise(r=>setTimeout(r,30));
test('group workspace mounts the original race only for competitive groups and rejects stale cross-group responses',async t=>{
 const {w,d,errors}=page(t,'amigos/index.html');w.eval(read('assets/js/amigos.js'));w.eval(read('assets/js/studyrats.js'));
 w.docmapUser={id:'11111111-1111-4111-8111-111111111111'};w.LuriaSocial={getCapabilities:()=>({groupRaces:true})};let enabled=true,resolveOld,first=true;
 w.supabaseClient={rpc:async(name,args)=>{if(name==='group_studyrats'){if(first){first=false;return new Promise(resolve=>{resolveOld=resolve;});}return {data:{rows:[],challenges:[]}};}return {data:{group:{id:args.p_payload.group_id,name:'Grupo de teste',role:'admin',competitive:args.p_payload.group_id==='group-a'&&enabled},members:[],entries:[]}};},channel:()=>({on(){return this;},subscribe(){return this;}}),removeChannel:async()=>{}};
 d.getElementById('social-groups').innerHTML='<button data-group-open="group-a">A</button><button data-group-open="group-b">B</button>';
 const card=d.getElementById('studyrats-card');w.eval(read('assets/js/social-group-community.js'));d.querySelector('[data-group-open="group-a"]').click();await wait();assert.ok(d.getElementById('gc-tab-rats'));assert.equal(card.parentElement.id,'gc-panel-rats');
 d.getElementById('gc-tab-rats').click();assert.equal(d.getElementById('gc-panel-rats').hidden,false);d.getElementById('gc-tab-rats').dispatchEvent(new w.KeyboardEvent('keydown',{key:'ArrowRight',bubbles:true,cancelable:true}));assert.equal(d.activeElement.id,'gc-tab-chat');
 d.querySelector('[data-group-open="group-b"]').click();await wait();assert.equal(d.getElementById('gc-tab-rats'),null);assert.equal(card.parentElement.id,'community-competition-legacy');
 resolveOld({data:{rows:[],challenges:[{id:'old',title:'STALE',status:'active',joined:false}]}});await wait();assert.doesNotMatch(d.getElementById('group-community').textContent,/STALE/);
 d.querySelector('[data-group-open="group-a"]').click();await wait();assert.equal(d.getElementById('studyrats-card'),card);assert.equal(d.querySelectorAll('#studyrats-card').length,1);
 enabled=false;w.dispatchEvent(new w.Event('focus'));await wait();assert.equal(d.getElementById('gc-tab-rats'),null);assert.equal(card.parentElement.id,'community-competition-legacy');assert.deepEqual(errors,[]);
});
