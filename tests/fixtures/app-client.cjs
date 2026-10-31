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
  // Component tests exercise owner changes without document navigation. The real
  // Auth boundary (which now reloads the document) has its own integration tests.
  let epoch=0;
  const key=(base,id=user)=>id?base+':'+encodeURIComponent(id):null;
  context.supabaseClient=context.supabase.createClient();
  context.TraubeLocalOwnerStore={get ownerId(){return user},get epoch(){return epoch},key,
    ready:Promise.resolve(user),read(base){return user?context.localStorage.getItem(key(base)):null},
    write(base,value){if(!user)return false;context.localStorage.setItem(key(base),value);return true},
    remove(base){if(user)context.localStorage.removeItem(key(base))}};
  vm.createContext(context);
  return {context, change:id=>{const previousId=user;user=id;epoch++;context.dispatchEvent(new context.CustomEvent('luria:owner-changed',{detail:{ownerId:id,previousId,epoch}}));}};
}
module.exports={ownerFixture,source,storage};
