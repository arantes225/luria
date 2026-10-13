const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'..'),scope='http://localhost/docs/mascot-lab/';
test('Alex offline cache installs real local resources, serves model without network and preserves platform caches',async()=>{
 const events={},entries=new Map(),removed=[],keys=['luria-platform-v281','luria-alex-lab-v0','luria-alex-lab-v1'];let network=0;
 const cache={async addAll(urls){for(const relative of urls){const url=new URL(relative,scope),file=path.join(root,url.pathname.endsWith('/')?url.pathname+'index.html':url.pathname);entries.set(url.href,fs.readFileSync(file));}}};
 const caches={open:async()=>cache,keys:async()=>keys,delete:async key=>{removed.push(key);},match:async request=>entries.get(typeof request==='string'?request:request.url)};
 const self={location:{origin:'http://localhost'},addEventListener:(type,fn)=>{events[type]=fn;},skipWaiting:async()=>{},clients:{claim:async()=>{}}};
 vm.runInNewContext(fs.readFileSync(path.join(root,'docs/mascot-lab/sw.js'),'utf8'),{self,caches,URL,fetch:async()=>{network++;return 'network';}});
 let pending;events.install({waitUntil:p=>pending=p});await pending;
 assert(entries.has(scope));assert(entries.has('http://localhost/assets/js/professor-alex-mascot.mjs'));assert(entries.has('http://localhost/assets/vendor/three.core.min.mjs'));
 events.activate({waitUntil:p=>pending=p});await pending;assert.deepEqual(removed,['luria-alex-lab-v0']);
 for(const url of [scope,'http://localhost/assets/vendor/three.module.min.mjs','http://localhost/assets/js/professor-alex-mascot.mjs']){events.fetch({request:{method:'GET',url},respondWith:p=>pending=p});assert(Buffer.isBuffer(await pending));}
 assert.equal(network,0);
 let intercepted=false;events.fetch({request:{method:'POST',url:scope},respondWith:()=>intercepted=true});assert.equal(intercepted,false);
 events.fetch({request:{method:'GET',url:'https://other.invalid/data'},respondWith:()=>intercepted=true});assert.equal(intercepted,false);
});
