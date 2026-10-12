// Real simulator markup/scripts; synthetic RPCs and sessions only, no remote writes.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const E=require('../../assets/js/plantao-engine.js');
const defaultCases=require('../../data/plantao-cases-v2.json');
async function fixture({cases=defaultCases,session=null}={}){
 const {JSDOM,VirtualConsole}=require('jsdom');
 const errors=[],virtualConsole=new VirtualConsole();
 virtualConsole.on('jsdomError',error=>errors.push(error.message));
 virtualConsole.on('error',(...args)=>errors.push(args.join(' ')));
 const root=path.join(__dirname,'../..');
 const dom=new JSDOM(fs.readFileSync(path.join(root,'plantao/sala-emergencia/index.html'),'utf8'),{url:'https://fixture.invalid/plantao/sala-emergencia/',runScripts:'outside-only',pretendToBeVisual:true,virtualConsole});
 const win=dom.window,doc=win.document,handlers=[],writes=[];
 const nativeAdd=doc.addEventListener.bind(doc);
 doc.addEventListener=(name,fn,opts)=>{if(name==='click')handlers.push(fn);nativeAdd(name,fn,opts)};
 const sb={auth:{getUser:async()=>({data:{user:{id:'test-user'}}})},rpc:async(name,args)=>({data:name==='list_active_clinical_case_summaries'?cases:name==='get_active_clinical_case'?cases.filter(c=>c.id===args.p_case_id):name==='has_interconsultation_access'?false:null,error:null}),from(table){let kind='read',payload;return {
 select(){return this},eq(){return this},order(){return this},limit(){return this},
 insert(p){kind='insert';payload=p;return this},update(p){kind='update';payload=p;assert(Number.isInteger(p.elapsed_minutes));return this},
 maybeSingle:async()=>{if(kind==='update')writes.push(structuredClone(payload));return {data:kind==='update'?{id:'test-session'}:structuredClone(session),error:null}},
 single:async()=>({data:{id:'test-session',started_at:new Date().toISOString(),status:'in_progress'},error:null}),
 then(resolve){if(kind==='update')writes.push(structuredClone(payload));resolve({data:table==='clinical_cases'?cases:[],error:null})}
 }}};
 Object.assign(win,{supabaseClient:sb,PlantaoEngine:E,PlantaoMonitor:{update(){},react(){}},scrollTo(){},confirm:()=>true,alert:msg=>{throw Error(msg)}});
 win.addEventListener('error',event=>errors.push(event.message));
 win.setInterval=()=>1;
 win.HTMLElement.prototype.scrollIntoView=function(){};
 const shellSource=fs.readFileSync(path.join(root,'assets/js/app.js'),'utf8');
 const urlStart=shellSource.indexOf('function luriaSafeContentUrl(');
 win.eval(shellSource.slice(urlStart,shellSource.indexOf('\nfunction escapeHtml(',urlStart)));
 win.eval(fs.readFileSync(path.join(root,'assets/js/plantao.js'),'utf8'));
 await new Promise(r=>setTimeout(r,0));
 let activeCaseId=session?.case_id;
 const click=async(key,value)=>{
   if(key==='data-start-case')activeCaseId=value;
   if(key==='data-case-action'){
     const index=cases.findIndex(c=>c.id===activeCaseId);
     if(value==='dx_0')value='catalog_dx_'+index;
     if(value==='dx_1')value='catalog_dx_'+((index+1)%cases.length);
     if(value.startsWith('dest_'))value='generic_'+value;
     if(/^shock[123]$/.test(value))value='defibrillate';
   }
   const button=doc.createElement('button');button.setAttribute(key,value);
   for(const handler of handlers){
     const pending=handler({target:button,preventDefault(){},stopPropagation(){}});
     if(!doc.getElementById('plantao-confirm-overlay').hidden)doc.getElementById('plantao-confirm-ok').click();
     await pending;
   }
 };
 const actionIds=async()=>{
   const ids=new Set();
   const tabs=[...doc.querySelectorAll('[data-case-category]')].map(el=>el.dataset.caseCategory);
   for(const tab of tabs){
     await click('data-case-category',tab);
     doc.querySelectorAll('[data-case-action]').forEach(el=>ids.add(el.dataset.caseAction));
     for(const key of ['data-intervention-tab','data-exam-tab']){
       const subTabs=[...doc.querySelectorAll('['+key+']')].map(el=>el.getAttribute(key));
       for(const subTab of subTabs){
         await click(key,subTab);
         doc.querySelectorAll('[data-case-action]').forEach(el=>ids.add(el.dataset.caseAction));
       }
     }
     doc.getElementById('plantao-action-close').click();
   }
   return ids;
 };
 const resume=async()=>{
   doc.getElementById('plantao-resume-case').click();
   await new Promise(r=>setTimeout(r,0));
   assert.equal(doc.getElementById('plantao-simulator').hidden,false);
 };
 return {el:id=>doc.getElementById(id),writes,errors,click,actionIds,resume,close:()=>win.close()};
}
module.exports={fixture};
