const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const code=fs.readFileSync(path.join(__dirname,'../assets/js/ui-navigation-v2.js'),'utf8').split('})();')[0]+'})();';
async function fixture(ready){
 const listeners={},mounts=[],access=[];const window={addEventListener:(name,fn)=>listeners[name]=fn,docmapUser:ready?{id:'user-a'}:null,docmapSession:ready?{user:{id:'user-a'}}:null,docmapIsAdmin:false};
 const document={body:{dataset:{uiNav:'v2'},classList:{contains:()=>ready}},addEventListener:()=>{}};
 const context={window,document,console,setTimeout:()=>0,load:async()=>({mountAlexCompanion:options=>{mounts.push(options);return {setAccess:value=>access.push(value),destroy:()=>{}};}})};
 vm.runInNewContext(code.replace(/import\('[^']+'\)/,'load()'),context);await new Promise(resolve=>setImmediate(resolve));
 return {listeners,mounts,access,window};
}
test('Alex starts when authentication finishes before or after deferred navigation',async()=>{
 const early=await fixture(true);assert.equal(early.mounts.length,1);assert.equal(early.mounts[0].userId,'user-a');
 early.listeners.pageshow();await new Promise(resolve=>setImmediate(resolve));assert.equal(early.mounts.length,1,'Resume does not duplicate Alex');
 await early.listeners['docmap:access-updated']({detail:{user:{id:'user-a'},isAdmin:true}});assert.equal(early.access.at(-1),true);
 const late=await fixture(false);assert.equal(late.mounts.length,0);
 await late.listeners['docmap:ready']({detail:{user:{id:'user-b'},isAdmin:false}});assert.equal(late.mounts.length,1);
});
