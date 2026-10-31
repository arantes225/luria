const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const {JSDOM,VirtualConsole}=require('jsdom');
const turn=()=>new Promise(resolve=>setImmediate(resolve));
function fixture(t,initial='A') {
  let listener,resolveInitial;
  const initialSession=new Promise(resolve=>resolveInitial=resolve);
  const dom=new JSDOM('<body class="app-ready"><main>PRIVATE A</main></body>',{url:'https://app.invalid/dashboard/',runScripts:'outside-only',virtualConsole:new VirtualConsole()});
  t.after(()=>dom.window.close());const w=dom.window;
  w.supabase={createClient:()=>({auth:{onAuthStateChange(fn){listener=fn;},getSession:()=>initialSession}})};
  w.eval(fs.readFileSync('assets/js/supabase.js','utf8'));
  const change=id=>listener(id?'SIGNED_IN':'SIGNED_OUT',id?{user:{id}}:null);
  change(initial);
  return {w,change,resolveInitial};
}
for(const next of [null,'B']) test(`identity A -> ${next}: globals, private UI and late writes are invalidated`,async t=>{
  const {w,change,resolveInitial}=fixture(t);
  for(const key of ['docmapUser','docmapSession','docmapProfile','docmapEntitlements','docmapPlan','docmapIsAdmin'])w[key]={id:'A',private:true};
  assert(w.TraubeLocalOwnerStore.write('draft','PRIVATE A'));
  change(next);
  assert.equal(w.TraubeSessionInvalidated,true);
  assert.equal(w.document.documentElement.style.visibility,'hidden');assert.equal(w.document.body.inert,true);
  assert.equal(w.document.documentElement.style.display,'none','descendants cannot override an inherited visibility value');
  assert(!w.document.body.classList.contains('app-ready'));
  for(const key of ['docmapUser','docmapSession','docmapProfile','docmapEntitlements','docmapPlan','docmapIsAdmin']) {
    w[key]={id:'A'};assert.equal(w[key],null,'late callback cannot restore private globals');
  }
  assert.equal(w.TraubeLocalOwnerStore.write('draft','LATE A'),false);
  assert.equal(w.localStorage.getItem('draft:A'),'PRIVATE A');assert.equal(w.localStorage.getItem('draft:B'),null);
  resolveInitial({data:{session:{user:{id:'A'}}}});await turn();
  assert.equal(w.TraubeLocalOwnerStore.ownerId,next);
});
test('initial authentication and refresh of same identity keep the document usable',async t=>{
  const {w,change,resolveInitial}=fixture(t);
  w.docmapUser={id:'A'};change('A');resolveInitial({data:{session:{user:{id:'A'}}}});await turn();
  assert(!w.TraubeSessionInvalidated);assert.equal(w.docmapUser.id,'A');assert.equal(w.document.documentElement.style.visibility,'');
  assert(w.TraubeLocalOwnerStore.write('draft','ok'));
});
test('BFCache rechecks the current identity before revealing a restored document',async t=>{
  const {w,resolveInitial,change}=fixture(t);resolveInitial({data:{session:{user:{id:'A'}}}});await turn();
  const event=new w.Event('pageshow');Object.defineProperty(event,'persisted',{value:true});w.dispatchEvent(event);
  assert.equal(w.document.documentElement.style.visibility,'hidden');await turn();assert.equal(w.document.documentElement.style.visibility,'');
  let resolveRefresh;w.supabaseClient.auth.getSession=()=>new Promise(resolve=>resolveRefresh=resolve);
  w.dispatchEvent(event);change('A');resolveRefresh({data:{session:{user:{id:'A'}}}});await turn();
  assert.equal(w.document.documentElement.style.display,'','same-owner refresh cannot leave the restored document blank');
  w.supabaseClient.auth.getSession=async()=>({data:{session:{user:{id:'B'}}}});
  w.dispatchEvent(event);await turn();assert.equal(w.TraubeSessionInvalidated,true);assert.equal(w.document.documentElement.style.visibility,'hidden');
});
