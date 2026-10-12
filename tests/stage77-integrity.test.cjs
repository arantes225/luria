const {test}=require('node:test'),assert=require('node:assert/strict');
const {read,declaration,page,settle}=require('./fixtures/frontend.cjs');
const {deferred}=require('./fixtures/questions.cjs');
function heartbeat(t,rpc){
 const {w}=page(t,'configuracoes/flashcards/index.html');w.flashUser={id:'owner-1'};w.flashSb={rpc};
 for(const name of ['reviewSessionStorageKey','closeAbandonedReviewSession'])w.eval(declaration(read('assets/js/flashcards.js'),name));
 const key=w.reviewSessionStorageKey(),stored={sessionId:'original-session',startedAt:1000,lastSeenAt:5000};
 w.localStorage.setItem(key,JSON.stringify(stored));return {w,key,stored};
}
for(const thrown of [false,true])test('Flashcard recovery retains the original session after a failed close ('+thrown+')',async t=>{
 let fail=true;const requests=[];
 const {w,key,stored}=heartbeat(t,async(name,args)=>{requests.push({name,args});if(fail){if(thrown)throw new Error('Offline');return {error:{message:'Offline'}}}return {error:null}});
 await w.closeAbandonedReviewSession();assert.deepEqual(JSON.parse(w.localStorage.getItem(key)),stored);
 fail=false;await w.closeAbandonedReviewSession();assert.equal(w.localStorage.getItem(key),null);
 assert.equal(requests.length,2);assert.equal(requests[0].name,'finish_study_session_v2');assert.deepEqual(requests[0].args,requests[1].args);assert.equal(requests[0].args.p_duration_seconds,4);
});
test('Closing an old flashcard session cannot delete a newer heartbeat or another owner record',async t=>{
 const gate=deferred(),{w,key}=heartbeat(t,async()=>{await gate.promise;return {error:null}});
 const closing=w.closeAbandonedReviewSession();await settle();w.localStorage.setItem(key,JSON.stringify({sessionId:'newer-session',startedAt:6000,lastSeenAt:8000}));
 w.flashUser={id:'owner-2'};w.localStorage.setItem(w.reviewSessionStorageKey(),JSON.stringify({sessionId:'other-owner',startedAt:6000,lastSeenAt:8000}));gate.resolve();await closing;
 assert.equal(JSON.parse(w.localStorage.getItem(key)).sessionId,'newer-session');assert.equal(JSON.parse(w.localStorage.getItem(w.reviewSessionStorageKey())).sessionId,'other-owner');
});
