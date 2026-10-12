const {test}=require('node:test'),assert=require('node:assert/strict');
const {read,declaration,page}=require('./fixtures/frontend.cjs');
const source=read('assets/js/flashcards.js');
const metricIds=['metric-due','metric-overdue','metric-reviewed','metric-accuracy'];
const optionalIds=[...metricIds,'flash-due-bar','flash-overdue-bar','flash-reviewed-fill','flash-accuracy-ring','metric-retention','metric-retention-helper','flash-retention-ring'];

function fixture(t,file='flashcards/index.html'){
 const result=page(t,file),{w}=result,stored=[],calls=[];
 w.flashUser={id:'synthetic-owner'};
 w.flashSb={from(table){
  const filters=[];let inserted;
  const query={
   select(){return this;},eq(...args){filters.push(['eq',...args]);return this;},
   lte(...args){filters.push(['lte',...args]);return this;},lt(...args){filters.push(['lt',...args]);return this;},
   gte(...args){filters.push(['gte',...args]);return this;},maybeSingle(){return this;},single(){return this;},
   insert(value){inserted=value;return this;},
   then(resolve,reject){
    calls.push({table,filters,inserted});
    let response;
    if(table==='flashcard_imports')response={data:{id:'synthetic-import'},error:null};
    else if(table==='flashcard_reviews')response={data:[{was_correct:true},{was_correct:false},{was_correct:true}],error:null};
    else if(table==='flashcard_retention_overall')response={data:{reviewed_cards:8,retention_percent:75.5},error:null};
    else response={count:table==='flashcard_shared_state'?2:stored.length||3,error:null};
    if(filters.some(([op])=>op==='lt')&&['flashcards','flashcard_shared_state'].includes(table))response.count=1;
    return Promise.resolve(response).then(resolve,reject);
   }
  };return query;
 },async rpc(name,args){
  calls.push({name,args:JSON.parse(JSON.stringify(args))});
  assert.equal(name,'bulk_create_flashcards');
  stored.push(...args.p_cards.map((card,i)=>({id:'imported-'+i,user_id:w.flashUser.id,active:true,library_scope:'personal',...card})));
  return {data:args.p_cards.length,error:null};
 }};
 for(const name of ['todayISO','startOfTodayISO','startOfTomorrowISO','loadMetrics'])w.eval(declaration(source,name));
 return {...result,stored,calls};
}

function assertMetrics(d,missing=[]){
 for(const [id,value] of Object.entries({'metric-due':'5','metric-overdue':'2','metric-reviewed':'3','metric-accuracy':'67%','metric-retention':'75,5%'})){
  if(!missing.includes(id))assert.equal(d.getElementById(id).textContent,value,id);
 }
}

test('Flashcard metrics update existing totals, percentages and progress without changing calculations',async t=>{
 const {w,d,calls}=fixture(t);await w.loadMetrics();assertMetrics(d);
 assert.equal(d.getElementById('flash-due-bar').style.width,'100%');
 assert.equal(d.getElementById('flash-overdue-bar').style.width,'40%');
 assert.equal(d.getElementById('flash-reviewed-fill').style.width,'15%');
 assert.equal(Number(d.getElementById('flash-accuracy-ring').style.getPropertyValue('--accuracy')),200/3);
 assert.equal(d.getElementById('flash-retention-ring').style.getPropertyValue('--retention'),'75.5');
 assert.equal(calls.length,6);
});

for(const id of metricIds)test('Flashcard metrics still update other indicators when '+id+' is absent',async t=>{
 const {w,d}=fixture(t);d.getElementById(id).remove();await w.loadMetrics();assertMetrics(d,[id]);
});

test('Compact Flashcard settings legitimately omit every metrics indicator',async t=>{
 const {w,d,errors,calls}=fixture(t,'configuracoes/flashcards/index.html');
 for(const id of optionalIds)assert.equal(d.getElementById(id),null,id);
 await w.loadMetrics();assert.deepEqual(errors,[]);assert.equal(calls.length,6);
});

test('Flashcard metrics preserve zero and unavailable retention states',async t=>{
 const {w,d}=fixture(t);
 w.flashSb.from=()=>{const query={select(){return this;},eq(){return this;},lte(){return this;},lt(){return this;},gte(){return this;},maybeSingle(){return this;},then(resolve,reject){return Promise.resolve({data:null,count:0,error:null}).then(resolve,reject);}};return query;};
 await w.loadMetrics();
 for(const id of metricIds.slice(0,3))assert.equal(d.getElementById(id).textContent,'0');
 assert.equal(d.getElementById('metric-accuracy').textContent,'—');
 assert.equal(d.getElementById('metric-retention').textContent,'—');
 assert.equal(d.getElementById('flash-due-bar').style.width,'0%');
 assert.equal(d.getElementById('flash-accuracy-ring').style.getPropertyValue('--accuracy'),'0');
});

test('Optional metrics do not swallow an unrelated query failure',async t=>{
 const {w}=fixture(t,'configuracoes/flashcards/index.html');
 w.flashSb.from=()=>{throw new Error('synthetic query failure');};
 await assert.rejects(w.loadMetrics(),/synthetic query failure/);
});

for(const file of ['flashcards/index.html','configuracoes/flashcards/index.html'])test('Anki import persists sanitized cards and completes the real post-import refresh in '+file,async t=>{
 const {w,d,errors,stored,calls}=fixture(t,file),refreshes=[];
 for(const name of ['setFlashStatus','stripAnkiHtml','ankiMediaReferenceCount','replaceClozeForFront','replaceClozeForBack','fieldsToFlashcard','escapeFlashHtml','truncateText','parseAnkiPackage','renderImportPreview','resetImportUi','wireImport','loadLibrary','renderLibrary'])w.eval(declaration(source,name));
 w.ankiDeckAreaMap=new Map();w.ankiDeckSubjectMap=new Map();w.ankiDeckThemeMap=new Map();
 let closed=false;
 w.openAnkiDatabase=async()=>({format:'synthetic SQLite boundary',database:{close(){closed=true;}}});
 w.sqliteTableNames=()=>new Set(['notes','cards']);w.readAnkiDeckMap=()=>new Map([['1','Synthetic deck']]);w.sourceDeckDefaultArea=()=>'Clínica Médica';
 w.readSqlRows=()=>[
  {deck_id:'1',flds:'<b>Frente segura</b><img src="https://invalid.example/a" onerror="window.importExecuted=1">\u001fVerso <script>window.importExecuted=1</script>seguro'},
  {deck_id:'1',flds:'Teste {{c1::resposta::dica}}\u001fExtra'},
  {deck_id:'1',flds:'Outra frente\u001fOutra resposta'}
 ];
 w.importFileKind='anki';w.importRows=await w.parseAnkiPackage({name:'synthetic.apkg'});assert.equal(closed,true);
 w.renderImportPreview(false);
 assert.equal(d.querySelectorAll('#import-preview-body img,#import-preview-body script,#import-preview-body [onerror]').length,0);
 w.loadReviewQueue=async()=>refreshes.push('review');
 w.loadAllFlashRows=async()=>{refreshes.push('library');return {data:stored,error:null};};
 w.loadSystemFlashcards=async()=>[];w.loadSharedFlashcards=async()=>[];
 w.populateLibraryAreas=()=>{};w.populateLibraryTaxonomyFilters=()=>{};
 w.filteredLibraryCards=()=>w.libraryCards;w.selectedFlashcardIds=new Set();
 w.formatDueDate=()=>'';w.updateFlashBulkToolbar=()=>{};w.renderLibraryDecks=()=>{};
 const button=d.getElementById('import-cards'),add=button.addEventListener.bind(button);let pending;
 button.addEventListener=(type,listener,options)=>add(type,event=>{pending=Promise.resolve(listener.call(button,event));pending.catch(()=>{});},options);
 w.wireImport();button.click();await pending;
 assert.equal(stored.length,3);
 assert.equal(stored[0].front_text,'Frente segura');assert.equal(stored[0].back_text,'Verso seguro');
 assert.equal(stored[1].front_text,'Teste [dica]');assert.equal(stored[1].back_text,'Teste resposta\n\nExtra');
 assert.equal(stored[0].area,'Clínica Médica');assert.equal(stored[0].user_id,'synthetic-owner');
 assert.equal(calls.filter(c=>c.name==='bulk_create_flashcards').length,1);
 assert.equal(calls.find(c=>c.name==='bulk_create_flashcards').args.p_import_id,'synthetic-import');
 assert.deepEqual(refreshes,['review','library']);assert.deepEqual(errors,[]);assert.equal(w.importExecuted,undefined);
 assert.match(d.getElementById('import-status').textContent,/3 flashcards importados com sucesso/);
 assert.equal(d.getElementById('import-preview-wrap').hidden,true);assert.equal(button.disabled,true);
 assert.equal(w.libraryCards.length,3);
 if(file==='flashcards/index.html'){
  assertMetrics(d);assert.equal(d.querySelectorAll('#library-list .library-card').length,3);
  assert.equal(d.getElementById('library-count').textContent,'3 cards');
 }else assert.equal(d.getElementById('library-list'),null);
});
