const test=require('node:test'),assert=require('node:assert/strict');
const {page,read}=require('./fixtures/frontend.cjs');

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
