const test=require('node:test'),assert=require('node:assert/strict');
class Alex extends EventTarget {
 constructor(){super();this.renderer={};this.calls=[];this.intensity=1;this.attrs=new Map();}
 playAnimation(name){this.calls.push(name);return true;}
 setAttribute(key,value){this.attrs.set(key,value);}
 removeAttribute(key){this.attrs.delete(key);}
}
const event=(name,detail)=>{const e=new Event(name);e.detail=detail;return e;};
test('Alex integration queues readiness, controls real operation states and cleans up listeners',async()=>{
 const media=new EventTarget();media.matches=false;global.matchMedia=()=>media;
 const {bindAlex}=await import('../assets/js/professor-alex-integration.mjs');
 const root=new EventTarget(),alex=new Alex();alex.id='alex';alex.renderer=null;
 const binding=bindAlex(alex,{root});
 assert(binding.react('loading',{phase:'start'}));assert(binding.react('loading',{phase:'end'}));
 alex.dispatchEvent(new Event('alex-ready'));assert.equal(alex.calls.length,0,'Ended operations do not revive when the renderer loads');
 assert(binding.react('welcome'));assert.equal(alex.calls.length,0);
 alex.renderer={};alex.dispatchEvent(new Event('alex-ready'));assert.deepEqual(alex.calls,['wake']);
 assert.equal(binding.react('welcome'),false,'Repeated greetings are suppressed');
 root.dispatchEvent(event('luria:alex',{action:'loading',phase:'start',target:'another'}));assert.equal(binding.state,null);
 root.dispatchEvent(event('luria:alex',{action:'loading',phase:'start'}));assert.equal(binding.state,'loading');assert.equal(alex.attrs.get('aria-busy'),'true');
 assert.equal(binding.react('hint'),false,'Hints do not interrupt pending work');
 alex.dispatchEvent(event('alex-animation-end',{animation:'loading'}));assert.equal(alex.calls.filter(x=>x==='loading').length,2);
 root.dispatchEvent(event('luria:alex',{action:'success'}));assert.equal(binding.state,null);assert.equal(alex.calls.at(-1),'nod');assert(!alex.attrs.has('aria-busy'));
 const before=alex.calls.length;alex.dispatchEvent(event('alex-animation-end',{animation:'loading'}));assert.equal(alex.calls.length,before,'Late completion cannot revive loading');
 binding.react('listening',{phase:'start'});assert.equal(binding.state,'listening');
 assert.equal(binding.react('search',{phase:'end'}),false);assert.equal(binding.state,'listening');
 assert(binding.react('listening',{phase:'end'}));assert.equal(binding.state,null);assert.equal(alex.animation,'idle');
 binding.react('loading',{phase:'start'});media.matches=true;media.dispatchEvent(new Event('change'));
 const reduced=alex.calls.length;alex.dispatchEvent(event('alex-animation-end',{animation:'loading'}));assert.equal(alex.calls.length,reduced,'Reduced motion does not loop');
 assert.equal(binding.react('unknown'),false);assert.equal(binding.react('error',{phase:'bogus'}),false);
 binding.destroy();binding.destroy();root.dispatchEvent(event('luria:alex',{action:'achievement'}));assert.equal(alex.calls.length,reduced);assert.equal(binding.react('success'),false);assert.equal(binding.state,null);
 delete global.matchMedia;
});
