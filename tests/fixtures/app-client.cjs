const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const root = path.join(__dirname, '../..');
const source = file => fs.readFileSync(path.join(root, file), 'utf8');
const storage = () => { const data = new Map(); return {data, getItem:k=>data.get(k)??null, setItem:(k,v)=>data.set(k,String(v)), removeItem:k=>data.delete(k)}; };
function ownerFixture(initial='A') {
  let user=initial, listener;
  const handlers={};
  const context={localStorage:storage(),sessionStorage:storage(),console,Date,URLSearchParams,location:{search:''},CustomEvent:function(type,opts){this.type=type;this.detail=opts.detail},addEventListener:(type,fn)=>(handlers[type]??=[]).push(fn),dispatchEvent:event=>(handlers[event.type]||[]).forEach(fn=>fn(event))};
  context.window=context;
  context.supabase={createClient:()=>({auth:{getSession:async()=>({data:{session:user?{user:{id:user}}:null}}),onAuthStateChange:fn=>{listener=fn}}})};
  vm.createContext(context);vm.runInContext(source('assets/js/supabase.js'),context);
  return {context, change:id=>{user=id;listener('SIGNED_IN',id?{user:{id}}:null)}};
}
module.exports={ownerFixture,source,storage};
