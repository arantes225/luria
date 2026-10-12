const {page,settle,read,declaration}=require('./frontend.cjs');
const deferred=()=>{let resolve,reject;const promise=new Promise((a,b)=>{resolve=a;reject=b});return {promise,resolve,reject}};
async function resolver(t,{items,attempts=[],write,readError,readHang=false,daily=false}={}){
 const fixture=page(t,'resolver-questoes/index.html'),{w,d}=fixture;
 w.history.replaceState(null,'',daily?'?daily=1':'?set_id=s1');
 if(readHang){const schedule=w.setTimeout.bind(w);w.setTimeout=(fn,ms)=>schedule(fn,ms===8000?0:ms)}
 const owner={id:'owner-1'},writes=[];
 w.LuriaLocalOwnerStore={ownerId:owner.id,epoch:1,ready:Promise.resolve()};
 const sets=daily?[{id:'s1',title:'Lote 1 — questões aprovadas',status:'ready'},{id:'s2',title:'Lote 2 — questões aprovadas',status:'ready'}]:[{id:'s1',title:'Simulado de teste'}];
 const db={question_sets:sets,question_items:items||[
  {id:'q1',set_id:'s1',stem:'Primeira questão',alternatives:{A:'Um',B:'Dois'},official_answer:'A'},
  {id:'q2',set_id:'s1',stem:'Segunda questão',alternatives:{A:'Um',B:'Dois'},official_answer:'B'},
  {id:'q3',set_id:'s1',stem:'Terceira questão',alternatives:{A:'Um',B:'Dois'},official_answer:'A'}
 ],question_attempts:attempts};
 class Query{
  constructor(table){this.table=table;this.filters=[];this.singleRow=false}
  select(){return this}order(){return this}limit(){return this}
  eq(key,value){this.filters.push(row=>row[key]===value);return this}
  in(key,values){this.filters.push(row=>values.includes(row[key]));return this}
  single(){this.singleRow=true;return this}
  upsert(row,options){this.row=row;this.options=options;return this}
  then(resolve,reject){return Promise.resolve().then(async()=>{
   if(this.row){writes.push({row:{...this.row},options:this.options});const result=write?await write(this.row,writes.length):{data:{...this.row},error:null};
    if(!result.error){db.question_attempts=db.question_attempts.filter(a=>a.question_item_id!==this.row.question_item_id||a.user_id!==this.row.user_id).concat(result.data||this.row)}return result;
   }
   if(this.table==='question_attempts'&&readHang)return new Promise(()=>{});
   if(readError&&this.table==='question_attempts')return {data:null,error:{message:'Leitura indisponível'}};
   const rows=(db[this.table]||[]).filter(row=>this.filters.every(fn=>fn(row)));
   return {data:this.singleRow?(rows[0]||null):rows,error:null};
  }).then(resolve,reject)}
 }
 w.supabaseClient={auth:{getUser:async()=>({data:{user:owner}})},from:table=>new Query(table),storage:{from:()=>({createSignedUrls:async()=>({data:[]})})}};
 const completed=[];w.LuriaGuidedStudy={completeActiveStep:reason=>completed.push(reason)};
 const script=[...d.scripts].find(s=>s.textContent.includes('const DAILY_LIMIT=50')).textContent;
 w.eval(script);for(let i=0;i<5;i++)await settle();if(readHang)await new Promise(resolve=>setTimeout(resolve,10));
 return {...fixture,writes,completed,db};
}
function management(t,{write,readQuery,attempts=[],file='questoes-simulados/index.html'}={}){
 const fixture=page(t,file),{w}=fixture,source=read('assets/js/questoes-simulados.js');
 const writes=[],queries=[],sets=[{id:'s1',title:'Lista 1',status:'ready',total_questions:3},{id:'s2',title:'Lista 2',status:'ready',total_questions:1}];
 const db={question_sets:sets,question_items:[1,2,3].map(i=>({id:'q'+i,set_id:'s1',question_number:i,raw_text:'Questão '+i})).concat({id:'q4',set_id:'s2',question_number:1,raw_text:'Outra lista'}),question_attempts:attempts,question_image_candidates:[]};
 class Query{
  constructor(table){this.table=table;this.filters=[]}
  select(){return this}order(){return this}
  eq(key,value){this.filters.push([key,value]);return this}
  neq(){return this}
  upsert(rows){this.rows=rows;return this}
  then(resolve,reject){return Promise.resolve().then(async()=>{
   if(this.rows){const rows=Array.from(this.rows,row=>({...row}));writes.push(rows);
    const result=write?await write(rows,writes.length):{error:null};
    if(!result.error){for(const row of rows)db.question_attempts=db.question_attempts.filter(x=>x.question_item_id!==row.question_item_id||x.user_id!==row.user_id).concat(row)}return result;
   }
   queries.push({table:this.table,filters:this.filters});
   const result=readQuery?await readQuery(this.table,this.filters):null;
   return result||{data:(db[this.table]||[]).filter(row=>this.filters.every(([key,value])=>row[key]===value)),error:null};
  }).then(resolve,reject)}
 }
 w.supabaseClient={from:table=>new Query(table)};w.LuriaLocalOwnerStore={ownerId:'owner-1',epoch:1};
 for(const name of ['renderHomeDashboard','renderSimulationLibrary','updateSetBulkToolbar','clearAnswerScreenshotMemory','placeAnswerPanelBelowPerformance','bindErrorImagePickerEvents','refreshErrorImagePicker'])w[name]=()=>{};
 w.attachQuestionImageUrls=async rows=>rows;w.attachGalleryImageUrls=async rows=>rows;w.loadQuestionOverview=async()=>{};w.renderErrorImagePicker=()=>'';
 const names=['qsEscape','setImportStatus','setAnswerStatus','accuracy','areaOptionsHtml','correctOptionHtml','questionExcerpt','currentWrongIds','updateLiveSummary','errorNotebookSkipStorageKey','loadErrorNotebookSkips','persistErrorNotebookSkips','isErrorNotebookSkipped','setErrorNotebookSkipped','readWrongMetadata','loadSets','openSet','saveAnswerKey','closeCurrentSet','renderQuestions','renderSetHistory','switchQsMode'];
 w.eval('(()=>{'+source.slice(0,source.indexOf('let AREA_OPTIONS'))+'const AREA_OPTIONS=["Clínica Médica","Pediatria"];'+names.map(name=>declaration(source,name)).join('\n')+
 '\nqsState.user={id:"owner-1"};qsState.sets=window.__sets;window.__api={state:qsState,openSet,saveAnswerKey,closeCurrentSet,loadSets,switchQsMode};})();'.replace('window.__sets','JSON.parse('+JSON.stringify(JSON.stringify(sets))+')'));
 return {...fixture,api:w.__api,writes,queries,db};
}
function registration(t,{write}={}){
 const fixture=page(t,'registrar-questoes/index.html'),{w,d}=fixture,writes=[],db=[];
 w.LuriaLocalOwnerStore={ownerId:'owner-1',epoch:1};
 let running=false;const timerCalls=[];
 w.LuriaStudyTimer={getState:()=>running?{kind:'external_questions',running:true}:null,start:async()=>{timerCalls.push('start');running=true},pause:()=>{timerCalls.push('pause');running=false},finish:async()=>true};
 w.supabaseClient={from:table=>{let payload;const query={
  insert(row){payload=row;return this},select(){return this},single(){return this},order(){return this},limit(){return this},eq(){return this},
  then(resolve,reject){return Promise.resolve().then(async()=>{
   if(!payload)return {data:db,error:null};writes.push({table,payload:{...payload}});
   const result=write?await write(table,payload,writes.length):{data:{id:'saved-1'},error:null};
   if(!result.error&&table==='question_sessions')db.push({...payload,id:result.data?.id});return result;
  }).then(resolve,reject)}
 };return query}};
 w.eval(read('assets/js/registrar-questoes.js')+'\nquestionsState.user={id:"owner-1"};window.__api={state:questionsState,saveQuestionSession,wireQuestionForm,wireExternalQuestionsTimer};');
 w.__api.wireQuestionForm();d.getElementById('question-total').value='10';d.getElementById('question-correct').value='7';
 return {...fixture,api:w.__api,writes,timerCalls};
}
module.exports={resolver,management,registration,deferred};
