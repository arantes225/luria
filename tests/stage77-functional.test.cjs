const {test}=require('node:test'),assert=require('node:assert/strict');
const {read,declaration,page,settle}=require('./fixtures/frontend.cjs');
const fs=require('node:fs'),path=require('node:path');

test('Caderno has unique return controls and both return to the library once',async t=>{
 const {w,d}=page(t,'caderno/index.html');
 const ids=[...d.querySelectorAll('[id]')].map(el=>el.id);
 assert.equal(ids.filter(id=>id==='notebook-back-library').length,1);
 const calls=[];w.setNotebookEditMode=flag=>calls.push(flag);w.switchView=async view=>calls.push(view);
 w.eval(declaration(read('assets/js/caderno.js'),'wireNotebookLibraryReturns'));
 w.wireNotebookLibraryReturns();w.wireNotebookLibraryReturns();
 for(const id of ['notebook-back-library','notebook-back-library-outline']){
  const button=d.getElementById(id);assert.equal(button.type,'button');button.click();await settle();
 }
 assert.deepEqual(calls,[false,'library',false,'library']);
});

test('Admin cost form rejects invalid and empty amounts before sending, and accepts zero',async t=>{
 const {w,d}=page(t,'admin/index.html'),source=read('assets/js/admin.js'),calls=[];
 w.$=id=>d.getElementById(id);w.esc=String;w.state={costItems:[{key:'hosting',label:'Hospedagem',amount_cents:1250,cadence:'monthly',scope:'general'}]};
 w.renderLogistics=()=>{};w.sb={rpc:async(name,args)=>{calls.push({name,args});return {data:name==='admin_save_cost_items'?true:[],error:null}}};
 for(const name of ['moneyInputToCents','readAdminMoneyInput','renderCostEditor'])w.eval(declaration(source,name,'  '));
 w.renderCostEditor();const start=source.indexOf('    $("admin-cost-form")');
 w.eval(source.slice(start,source.indexOf('    document.addEventListener(',start)));
 const input=d.querySelector('[data-cost-field="amount"]'),form=d.getElementById('admin-cost-form');
 for(const value of ['', '-1', '1.234']){input.value=value;form.dispatchEvent(new w.Event('submit',{cancelable:true}));await settle();assert.equal(calls.length,0);assert(input.validationMessage);}
 input.value='0';form.dispatchEvent(new w.Event('submit',{cancelable:true}));await settle();
 assert.equal(calls[0].name,'admin_save_cost_items');assert.equal(calls[0].args.p_items[0].amount_cents,0);
 assert.match(d.getElementById('admin-cost-editor-message').textContent,/atualizados/);
});

test('Review-only answer control still reveals the answer on the review page',t=>{
 const {w,d}=page(t,'flashcards/index.html');
 for(const name of ['startReviewSession','finishReviewSession','toggleReviewPomodoro'])w[name]=()=>{};
 w.eval(declaration(read('assets/js/flashcards.js'),'wireReview'));
 w.wireReview();d.getElementById('show-answer').click();
 assert.equal(d.getElementById('review-answer').hidden,false);
 assert.equal(d.getElementById('rating-actions').hidden,false);
 assert.equal(d.getElementById('show-answer').hidden,true);
});

test('Synthetic flashcard review reveals, records a rating, advances and finishes',async t=>{
 const {w,d,errors}=page(t,'flashcards/index.html'),calls=[];
 w.reviewQueue=[
  {id:'card-1',front_text:'Pergunta 1',back_text:'Resposta 1'},
  {id:'card-2',front_text:'Pergunta 2',back_text:'Resposta 2'}
 ];
 w.reviewIndex=0;w.reviewMode='scheduled';w.flashSb={rpc:async(name,args)=>{calls.push({name,args});return{error:null}}};
 w.setFlashStatus=()=>{};w.loadMetrics=async()=>{};
 w.renderCurrentReview=async()=>{
  const card=w.reviewQueue[w.reviewIndex];
  d.getElementById('review-front').textContent=card.front_text;
  d.getElementById('review-back').textContent=card.back_text;
  d.getElementById('review-answer').hidden=true;
  d.getElementById('rating-actions').hidden=true;
  d.getElementById('show-answer').hidden=false;
 };
 w.startReviewSession=()=>{
  d.body.classList.add('flash-review-session-active');
  d.getElementById('review-focus-toolbar').hidden=false;
  d.getElementById('review-stage').hidden=false;
  d.getElementById('review-launcher').hidden=true;
  d.getElementById('review-front').textContent=w.reviewQueue[0].front_text;
  d.getElementById('review-back').textContent=w.reviewQueue[0].back_text;
 };
 w.finishReviewSession=()=>{
  d.body.classList.remove('flash-review-session-active');
  d.getElementById('review-focus-toolbar').hidden=true;
  d.getElementById('review-stage').hidden=true;
  d.getElementById('review-launcher').hidden=false;
 };
 w.toggleReviewPomodoro=()=>{};
 w.eval(declaration(read('assets/js/flashcards.js'),'wireReview'));w.wireReview();
 d.getElementById('start-review-session').disabled=false;
 d.getElementById('start-review-session').click();
 assert(d.body.classList.contains('flash-review-session-active'));
 assert.equal(d.getElementById('review-front').textContent,'Pergunta 1');
 d.getElementById('show-answer').click();
 assert.equal(d.getElementById('review-answer').hidden,false);
 assert.equal(d.getElementById('rating-actions').hidden,false);
 d.querySelector('[data-rating="medium"]').click();await settle();await settle();
 assert.equal(calls.length,1);assert.equal(calls[0].name,'review_flashcard');
 assert.equal(calls[0].args.p_flashcard_id,'card-1');assert.equal(calls[0].args.p_rating,'medium');assert.equal(calls[0].args.p_was_correct,true);
 assert.equal(w.reviewIndex,1);assert.equal(d.getElementById('review-front').textContent,'Pergunta 2');
 assert.equal(d.getElementById('show-answer').hidden,false);
 d.getElementById('finish-review-session').click();
 assert.equal(d.body.classList.contains('flash-review-session-active'),false);
 assert.equal(d.querySelectorAll('.flash-home-actions [data-flash-home-tab]').length,3);
 assert.deepEqual(errors,[]);
});

for(const file of ['configuracoes.html','configuracoes/index.html'])test(file+' initializes its actual controls',async t=>{
 const {w,d,errors}=page(t,file);
 w.eval(read('tests/fixtures/supabase-browser.js'));
 w.eval(read('assets/js/configuracoes.js'));w.docmapUser=w.__fixtureOwner;
 await w.initStudySettings();await settle();
 assert.deepEqual(errors,[]);
 if(file==='configuracoes.html')assert.equal(d.getElementById('save-study-days'),null);
 else{
  const button=d.getElementById('save-study-days');assert(button);
  d.querySelectorAll('[data-weekday-field]').forEach(el=>el.checked=true);
  button.click();await settle();await settle();
  assert.match(d.getElementById('study-days-status').textContent,/salvos/);
 }
});

test('Flashcard creation/import settings initialize without a review-only button',async t=>{
 const {w,d,errors}=page(t,'configuracoes/flashcards/index.html');
 w.eval(read('tests/fixtures/supabase-browser.js'));
 w.eval(read('assets/js/flashcards.js'));w.docmapUser=w.__fixtureOwner;
 await w.initFlashcards();await settle();
 assert.deepEqual(errors,[]);assert.equal(d.getElementById('show-answer'),null);
 assert(d.getElementById('import-cards'));assert(d.querySelector('[data-flash-section="create"]'));
});

test('Admin monetary conversion accepts BRL and rejects invalid values rather than zero',t=>{
 const {w}=page(t,'admin/index.html');w.eval(declaration(read('assets/js/admin.js'),'moneyInputToCents','  '));
 for(const [value,cents] of [['0',0],['0,00',0],['1,2',120],['1234,56',123456],['1.234,56',123456],['1.234',123400]])assert.equal(w.moneyInputToCents(value),cents,value);
 for(const value of ['', '  ','abc','NaN','Infinity','-1','1.23','1,2,3','1.23,45','1,234','1e3','1 234,56','999999999999999999999'])assert.throws(()=>w.moneyInputToCents(value),undefined,value);
 assert.equal(w.moneyInputToCents('12.50','number'),1250);
 assert.throws(()=>w.moneyInputToCents('12,50','number'));
});

test('Missing legacy resources are removed; monitor selects the actual patient image',t=>{
 assert.equal(read('ambientacao.html').includes('assets/css/ambientacao.css'),false);
 for(const file of ['plantao.html','plantao/sala-emergencia/index.html','plantao/luriazap/index.html']){
  const {w,d}=page(t,file);assert.equal(read(file).includes('assets/img/plantao/awake.webp'),false);
  assert.equal(d.getElementById('plantao-patient-image').hasAttribute('src'),false);
  const monitor=read('assets/js/plantao-monitor.js');
  w.eval('let context,enabled,vitals,frame=1;const normalize=v=>String(v).toLowerCase();'+declaration(monitor,'update','  '));
  const awake='/assets/img/plantao/aph/mulher-adulta-aberto.webp',closed='/assets/img/plantao/aph/mulher-adulta-fechado.webp';
  for(const src of [awake,closed])assert(fs.existsSync(path.join(__dirname,'..',src)));
  w.update({mental:'Orientada'},{patient_image:awake,unconscious_image:closed});
  assert.equal(d.getElementById('plantao-patient-image').getAttribute('src'),awake);
  w.update({mental:'Inconsciente'},{patient_image:awake,unconscious_image:closed});
  assert.equal(d.getElementById('plantao-patient-image').getAttribute('src'),closed);
 }
});

test('Admin plan-price listener rejects empty/invalid fields before any RPC and preserves zero',async t=>{
 const {w,d}=page(t,'admin/index.html'),source=read('assets/js/admin.js'),calls=[];
 w.$=id=>d.getElementById(id);w.esc=String;w.state={planPrices:[]};
 w.sb={rpc:async(name,args)=>{calls.push({name,args:JSON.parse(JSON.stringify(args))});return {data:args.p_items,error:null}}};
 for(const name of ['moneyInputToCents','readAdminMoneyInput','renderPlanPrices'])w.eval(declaration(source,name,'  '));
 w.renderPlanPrices([{plan_slug:'free',monthly_price_cents:0,annual_cash_price_cents:120000,annual_installment_price_cents:130000,annual_installments:12}]);
 const start=source.indexOf('    $("admin-save-plan-prices")?.addEventListener');
 w.eval(source.slice(start,source.indexOf('    $("admin-edit-costs")',start)));
 const input=d.querySelector('[data-price="monthly_price_cents"]'),button=d.getElementById('admin-save-plan-prices');
 for(const value of ['abc','','Infinity','1.23,00']){input.value=value;button.click();await settle();assert.equal(calls.length,0);assert(input.validationMessage);}
 input.value='0,00';button.click();await settle();assert.equal(calls.length,1);
 assert.equal(calls[0].name,'admin_save_plan_prices');
 assert.deepEqual(calls[0].args.p_items[0],{plan_slug:'free',monthly_price_cents:0,annual_cash_price_cents:120000,annual_installment_price_cents:130000,annual_installments:12});
});
