const test=require('node:test'),assert=require('node:assert/strict');
const {page,read}=require('./fixtures/frontend.cjs');

test('Alex follows both current theme dimensions even when the legacy theme disagrees',async t=>{
 const {w,d,errors}=page(t,'amigos/index.html');
 w.matchMedia=()=>({matches:false,addEventListener(){},removeEventListener(){}});
 w.ResizeObserver=class {observe(){}disconnect(){}};w.IntersectionObserver=class {observe(){}disconnect(){}};
 const source=read('assets/js/professor-alex-mascot.mjs').replace(/^import .*;\r?\n/gm,'').replace(/^export /gm,'').replaceAll('import.meta.url',JSON.stringify('https://fixture.invalid/assets/js/professor-alex-mascot.mjs'));
 w.eval(source);const proto=w.customElements.get('professor-alex-mascot').prototype;
 proto._schedule=()=>{};proto._resize=()=>{};proto._syncAccents=()=>{};proto._dispose=()=>{};
 proto._createScene=function(){this.lightMaterial={};this.whiteMaterial={color:{set:value=>this.shellColor=value}};};
 const alex=d.createElement('professor-alex-mascot');d.body.append(alex);
 for(const [appearance,identity,legacy,shell,accent] of [
  ['light','blue','pink','#729ac7','#50d8ff'],['dark','blue','pink','#354766','#50d8ff'],
  ['light','pink','dark','#c586ad','#ff87c6'],['dark','pink','light','#664260','#ff87c6'],
  ['light','blue','dark','#729ac7','#50d8ff']
 ]){
  d.documentElement.dataset.theme=legacy;d.body.dataset.uiAppearance=appearance;d.body.dataset.uiIdentity=identity;
  await new Promise(resolve=>w.setTimeout(resolve,0));
  assert.equal(alex.shellColor,shell,appearance+' '+identity);assert.equal(alex._color,accent);
 }
 alex.theme='rosa';assert.equal(alex._color,'#ff87c6','explicit component themes remain supported');
 alex.theme='dark';assert.equal(alex.shellColor,'#354766');
 alex.remove();assert.deepEqual(errors,[]);
});

test('restoring Alex resizes the drawing surface even when its host keeps the same size',t=>{
 const {w,d,errors}=page(t,'aprender/index.html'),observers=[];
 w.matchMedia=()=>({matches:false,addEventListener(){},removeEventListener(){}});
 w.ResizeObserver=class {constructor(callback){this.callback=callback;this.targets=new Set();observers.push(this);}observe(target){this.targets.add(target);}disconnect(){this.targets.clear();}};
 w.IntersectionObserver=class {observe(){}disconnect(){}};
 const source=read('assets/js/professor-alex-mascot.mjs').replace(/^import .*;\r?\n/gm,'').replace(/^export /gm,'').replaceAll('import.meta.url',JSON.stringify('https://fixture.invalid/assets/js/professor-alex-mascot.mjs'));
 w.eval(source);const proto=w.customElements.get('professor-alex-mascot').prototype;
 proto._syncProps=()=>{};proto._schedule=()=>{};
 proto._createScene=function(){const canvas=d.createElement('canvas');this.button.append(canvas);let density=1;this.renderer={domElement:canvas,getPixelRatio:()=>density,setPixelRatio:value=>density=value,setSize:(width,height)=>{canvas.width=width*density;canvas.height=height*density;},dispose(){},forceContextLoss(){}};this.camera={updateProjectionMatrix(){}};};
 for(const size of [128,96]){
  const alex=d.createElement('professor-alex-mascot');let box={width:size,height:size};alex.button.getBoundingClientRect=()=>box;d.body.append(alex);
  assert.equal(alex.renderer.domElement.width,size);alex.remove();
  // Reconnection measures a transient button box before its stylesheet settles.
  box={width:315,height:155};d.body.append(alex);box={width:size,height:size};
  for(const observer of observers)if(observer.targets.has(alex.button))observer.callback([{target:alex.button}]);
  assert.equal(alex.renderer.domElement.width,size,'drawing buffer follows the restored button');assert.equal(alex.renderer.domElement.height,size);
  assert.equal(alex.camera.right-alex.camera.left,alex.camera.top-alex.camera.bottom,'square canvas keeps a square camera projection');alex.remove();
 }
 assert.deepEqual(errors,[]);
});
