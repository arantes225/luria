const {test}=require('node:test'),assert=require('node:assert/strict');
const {resolver,management,registration,deferred}=require('./fixtures/questions.cjs');
const {settle}=require('./fixtures/frontend.cjs');
const click=(d,opt)=>d.querySelector('[data-opt="'+opt+'"]').click();
const flush=async()=>{for(let i=0;i<4;i++)await settle()};

test('Answer selection, navigation and blanks preserve the existing answered-only percentage',async t=>{
 const {d,writes,completed,errors}=await resolver(t);
 assert.equal(d.getElementById('qr-blank').textContent,'3');assert(d.getElementById('qr-answer-result').hidden);
 click(d,'A');d.getElementById('qr-next').click();click(d,'A');d.getElementById('qr-prev').click();
 assert(d.querySelector('[data-opt="A"]').classList.contains('selected'));
 d.getElementById('qr-confirm').click();await flush();
 assert.equal(writes[0].row.selected_option,'A');assert.equal(d.getElementById('qr-hits').textContent,'1');
 d.getElementById('qr-next').click();d.getElementById('qr-confirm').click();await flush();
 assert.equal(d.getElementById('qr-errors').textContent,'1');assert.equal(d.getElementById('qr-blank').textContent,'1');assert.equal(d.getElementById('qr-accuracy').textContent,'50%');assert.equal(completed.length,0);
 d.getElementById('qr-next').click();click(d,'A');d.getElementById('qr-confirm').click();await flush();
 assert.equal(d.getElementById('qr-total').textContent,'3');assert.equal(d.getElementById('qr-accuracy').textContent,'67%');assert.deepEqual(completed,['questions-set-complete']);
 d.getElementById('qr-confirm').click();await flush();assert.equal(writes.length,3);assert.deepEqual(errors,[]);
});

test('External question registration preserves counts and wires its timer once before any save',async t=>{
 const {api,d,writes,timerCalls,errors}=registration(t);api.wireExternalQuestionsTimer();
 d.getElementById('toggle-external-questions-timer').click();await flush();assert.deepEqual(timerCalls,['start']);
 await api.saveQuestionSession({preventDefault(){}});assert.equal(writes[0].payload.total_questions,10);assert.equal(writes[0].payload.correct_answers,7);assert.equal(writes[0].payload.wrong_answers,3);
 assert.match(d.getElementById('question-status').textContent,/Sessão registrada/);assert.equal(d.getElementById('question-total').value,'');assert.deepEqual(errors,[]);
});

test('External question registration coalesces submissions and recovers after thrown save failure',async t=>{
 const gate=deferred();let fail=true;const {api,d,writes}=registration(t,{write:async()=>{await gate.promise;if(fail)throw new Error('Offline');return {data:{id:'saved-1'},error:null}}});
 const first=api.saveQuestionSession({preventDefault(){}});const second=api.saveQuestionSession({preventDefault(){}});await flush();assert.equal(writes.length,1);
 assert(d.getElementById('question-total').disabled);gate.resolve();await Promise.all([first,second]);assert.equal(d.getElementById('save-question-session').disabled,false);assert.equal(d.getElementById('question-total').value,'10');
 fail=false;await api.saveQuestionSession({preventDefault(){}});assert.equal(writes.length,2);assert.match(d.getElementById('question-status').textContent,/Sessão registrada/);
});

test('A telemetry failure does not disguise a confirmed question registration or retry it',async t=>{
 const {api,d,writes}=registration(t,{write:async table=>table==='study_sessions'?{error:{message:'Tempo indisponível'}}:{data:{id:'saved-1'},error:null}});
 d.getElementById('question-duration').value='5';await api.saveQuestionSession({preventDefault(){}});
 assert.equal(writes.length,2);assert.equal(writes[1].payload.source_id,'saved-1');assert.match(d.getElementById('question-status').textContent,/Sessão registrada, mas/);assert.equal(d.getElementById('question-total').value,'');
});

test('External registration validates totals and ignores a response from a previous account',async t=>{
 const gate=deferred(),{api,w,d,writes}=registration(t,{write:async()=>{await gate.promise;return {data:{id:'saved-1'},error:null}}});
 d.getElementById('question-correct').value='11';await api.saveQuestionSession({preventDefault(){}});assert.equal(writes.length,0);
 d.getElementById('question-correct').value='7';const save=api.saveQuestionSession({preventDefault(){}});await flush();w.TraubeLocalOwnerStore.ownerId='owner-2';w.TraubeLocalOwnerStore.epoch++;gate.resolve();await save;
 assert.equal(d.getElementById('question-total').value,'10');assert.equal(d.getElementById('save-question-session').disabled,false);
 await api.saveQuestionSession({preventDefault(){}});assert.equal(writes.length,1);
});

test('Manual correction preserves unchecked-as-correct, wrong metadata, history and close behavior',async t=>{
 const {api,d,writes,errors,queries}=management(t);await api.openSet('s1');
 d.querySelector('[data-wrong-toggle="q2"]').click();d.querySelector('[data-error-area="q2"]').value='Pediatria';d.querySelector('[data-correct-option="q2"]').value='B';
 assert.equal(d.getElementById('qs-summary-correct').textContent,'2');assert.equal(d.getElementById('qs-summary-wrong').textContent,'1');
 await api.saveAnswerKey();assert.equal(writes.length,1);assert.equal(writes[0].length,3);assert.equal(writes[0][0].result,'correct');assert.equal(writes[0][1].result,'wrong');assert.equal(writes[0][1].correct_option,'B');
 assert.equal(d.getElementById('qs-summary-accuracy').textContent,'66,7%');assert.equal(api.state.sets[0].metrics.correct,2);assert.equal(api.state.sets[0].metrics.wrong,1);
 assert(queries.filter(q=>q.table==='question_attempts').every(q=>q.filters.some(([k,v])=>k==='user_id'&&v==='owner-1')));
 api.closeCurrentSet();assert.equal(api.state.currentSet,null);assert.equal(d.getElementById('qs-answer-panel').hidden,true);assert.deepEqual(errors,[]);
});

test('Manual correction rejects missing required wrong-answer metadata without writing',async t=>{
 const {api,d,writes}=management(t);await api.openSet('s1');d.querySelector('[data-wrong-toggle="q1"]').click();await api.saveAnswerKey();
 assert.equal(writes.length,0);assert.match(d.getElementById('qs-answer-status').textContent,/Preencha Área/);
});

test('Manual summary and persisted history keep annulled questions out of the score denominator',async t=>{
 const {api,d,writes}=management(t,{file:'questoes-simulados.html',attempts:[{user_id:'owner-1',question_item_id:'q3',result:'annulled'}]});await api.loadSets();await api.openSet('s1');
 d.querySelector('[data-wrong-toggle="q2"]').click();d.querySelector('[data-skip-error-notebook="q2"]').click();await api.saveAnswerKey();
 assert.equal(writes[0][2].result,'annulled');assert.equal(d.getElementById('qs-summary-accuracy').textContent,'50,0%');assert.match(d.getElementById('qs-history').textContent,/50,0%/);
});

test('Opening an older list cannot overwrite a newer list or reopen a closed reader',async t=>{
 const gate=deferred(),{api}=management(t,{readQuery:async(table,filters)=>{if(table==='question_items'&&filters.some(([k,v])=>k==='set_id'&&v==='s1'))await gate.promise}});
 const first=api.openSet('s1');await api.openSet('s2');gate.resolve();await first;assert.equal(api.state.currentSet.id,'s2');
 const next=api.openSet('s1');api.closeCurrentSet();await next;assert.equal(api.state.currentSet,null);
});

test('Library initialization waits for the established account; closing cancels a pending open',async t=>{
 const gate=deferred(),{api,w,queries}=management(t);
 w.TraubeLocalOwnerStore={ownerId:null,epoch:0,ready:gate.promise};
 const load=api.loadSets(),open=api.openSet('s1');api.closeCurrentSet();await flush();assert.equal(queries.length,0);
 w.TraubeLocalOwnerStore.ownerId='owner-1';w.TraubeLocalOwnerStore.epoch=1;gate.resolve();await Promise.all([load,open]);
 assert.equal(api.state.sets[0].metrics.correct,0);assert.equal(api.state.currentSet,null);assert(queries.length>0);
});

test('Failed history reads keep the prior reader and library rather than fabricate empty results',async t=>{
 let fail=false;const {api,d}=management(t,{readQuery:async table=>fail&&table==='question_attempts'?{error:{message:'Offline'}}:null});await api.openSet('s1');
 fail=true;await api.openSet('s2');assert.equal(api.state.currentSet.id,'s1');assert.match(d.getElementById('qs-answer-status').textContent,/histórico/);
 const previous=api.state.sets;await api.loadSets();assert.equal(api.state.sets,previous);assert.match(d.getElementById('qs-import-status').textContent,/confirmar/);
});

test('Manual saves coalesce, recover from thrown network failure and ignore completion after closing',async t=>{
 const gate=deferred();let fail=true;
 const {api,d,writes}=management(t,{write:async()=>{await gate.promise;if(fail)throw new Error('Offline');return {error:null}}});await api.openSet('s1');
 const first=api.saveAnswerKey();const second=api.saveAnswerKey();await flush();assert.equal(writes.length,1);gate.resolve();await Promise.all([first,second]);
 assert.equal(d.getElementById('qs-save-key').disabled,false);assert.match(d.getElementById('qs-answer-status').textContent,/Não foi possível salvar/);
 fail=false;const retry=api.saveAnswerKey();api.closeCurrentSet();await retry;assert.equal(api.state.currentSet,null);assert.equal(writes.length,2);
});

test('Library navigation preserves the active manual set and an owner change blocks old writes',async t=>{
 const {api,d,w,writes}=management(t);await api.openSet('s1');api.switchQsMode('library');assert.equal(api.state.currentSet.id,'s1');
 w.TraubeLocalOwnerStore.ownerId='owner-2';w.TraubeLocalOwnerStore.epoch++;await api.saveAnswerKey();assert.equal(writes.length,0);assert.match(d.getElementById('qs-answer-status').textContent,/sessão/);
});

test('Pending answer cannot change or submit twice while the network request is active',async t=>{
 const gate=deferred(),{d,writes}=await resolver(t,{write:async row=>{await gate.promise;return {data:row,error:null}}});
 click(d,'A');d.getElementById('qr-confirm').click();d.getElementById('qr-confirm').click();await flush();
 assert.equal(writes.length,1);assert(d.getElementById('qr-confirm').disabled);
 click(d,'B');gate.resolve();await flush();
 assert(d.querySelector('[data-opt="A"]').classList.contains('selected'));assert.match(d.getElementById('qr-answer-result').textContent,/correta/);
});

test('A missing or unavailable answer key is not silently counted as correct',async t=>{
 const {d,writes}=await resolver(t,{items:[{id:'q1',set_id:'s1',alternatives:{A:'Um',B:'Dois'},official_answer:null}]});
 click(d,'A');d.getElementById('qr-confirm').click();await flush();
 assert.equal(writes.length,0);assert.equal(d.getElementById('qr-hits').textContent,'0');assert.equal(d.getElementById('qr-blank').textContent,'1');assert.match(d.getElementById('qr-status').textContent,/gabarito/i);
});

for(const thrown of [false,true])test('Saving failure keeps the unconfirmed selection and allows an explicit retry ('+thrown+')',async t=>{
 const {d,writes,errors}=await resolver(t,{write:async(row,n)=>{if(n===1){if(thrown)throw new Error('Rede indisponível');return {data:null,error:{message:'Rede indisponível'}}}return {data:row,error:null}}});
 click(d,'B');d.getElementById('qr-confirm').click();await flush();assert.equal(d.getElementById('qr-errors').textContent,'0');assert(d.getElementById('qr-answer-result').hidden);assert.match(d.getElementById('qr-status').textContent,/Não foi possível salvar/);assert.equal(d.getElementById('qr-confirm').disabled,false);
 d.getElementById('qr-confirm').click();await flush();assert.equal(writes.length,2);assert.equal(d.getElementById('qr-errors').textContent,'1');assert.deepEqual(errors,[]);
});

test('Persisted attempts resume at the first unanswered question and ignore other sets',async t=>{
 const {d}=await resolver(t,{attempts:[{user_id:'owner-1',question_item_id:'q1',selected_option:'A',result:'correct'},{user_id:'owner-1',question_item_id:'other',result:'wrong'}]});
 assert.equal(d.getElementById('qr-card-question').textContent,'Questão 2');assert.equal(d.getElementById('qr-hits').textContent,'1');assert.equal(d.getElementById('qr-errors').textContent,'0');
 d.getElementById('qr-prev').click();assert(d.querySelector('[data-opt="A"]').disabled);assert(d.querySelector('[data-opt="A"]').classList.contains('selected'));
});

test('Attempts read failure does not silently start a session with an empty history',async t=>{
 const {d}=await resolver(t,{readError:true});assert(d.getElementById('qr-layout').hidden);assert.match(d.getElementById('qr-loading').textContent,/Não foi possível/);
});

test('Daily attempt-read timeout keeps the reader closed instead of inventing an empty history',async t=>{
 const {d}=await resolver(t,{daily:true,readHang:true});assert(d.getElementById('qr-layout').hidden);assert.match(d.getElementById('qr-loading').textContent,/Não foi possível/);
});

test('A save without an acknowledgement does not reveal or count the selected answer',async t=>{
 const {d}=await resolver(t,{write:async()=>({data:null,error:null})});click(d,'A');d.getElementById('qr-confirm').click();await flush();
 assert.equal(d.getElementById('qr-hits').textContent,'0');assert(d.getElementById('qr-answer-result').hidden);assert.match(d.getElementById('qr-status').textContent,/não foi confirmado/);
});

test('An account switch ignores a late saved answer and blocks further writes from the old reader',async t=>{
 const gate=deferred(),{w,d,writes}=await resolver(t,{write:async row=>{await gate.promise;return {data:row,error:null}}});
 click(d,'A');d.getElementById('qr-confirm').click();await flush();w.TraubeLocalOwnerStore.ownerId='owner-2';w.TraubeLocalOwnerStore.epoch++;
 w.dispatchEvent(new w.CustomEvent('traube:owner-changed',{detail:{ownerId:'owner-2'}}));gate.resolve();await flush();
 assert(d.getElementById('qr-layout').hidden);assert.match(d.getElementById('qr-loading').textContent,/sessão/i);
 d.getElementById('qr-confirm').click();await flush();assert.equal(writes.length,1);
});

test('Daily selection keeps a stable unique set of at most 50 questions from the two approved lots',async t=>{
 const items=Array.from({length:60},(_,i)=>({id:'daily-'+i,set_id:i<30?'s1':'s2',stem:'Questão '+i,alternatives:{A:'Um'},official_answer:'A'}));
 const {d}=await resolver(t,{daily:true,items});assert.equal(d.querySelectorAll('[data-jump]').length,50);assert.equal(d.getElementById('qr-total').textContent,'50');
 const stems=[];for(let i=0;i<50;i++){d.querySelector('[data-jump="'+i+'"]').click();stems.push(d.getElementById('qr-text').textContent)}assert.equal(new Set(stems).size,50);
});
