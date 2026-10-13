// Optional real WebGL test. Run with ALEX_PLAYWRIGHT_MODULE and ALEX_BROWSER_CHANNEL.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {chromium}=require(process.env.ALEX_PLAYWRIGHT_MODULE||'playwright');
const root=path.resolve(__dirname,'..'),results=path.resolve(root,'../');
const types={'.html':'text/html','.mjs':'text/javascript','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.png':'image/png','.webmanifest':'application/manifest+json'};
(async()=>{
 const browser=await chromium.launch({headless:true,channel:process.env.ALEX_BROWSER_CHANNEL||'chrome'});
 try {
  const context=await browser.newContext({viewport:{width:1440,height:1150}}),page=await context.newPage(),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  // Deterministic HTTP fixture: serves only this checkout; no network or app login.
  await context.route('http://127.0.0.1:4173/**',async route=>{const url=new URL(route.request().url());let file=path.resolve(root,'.'+decodeURIComponent(url.pathname));if(url.pathname.endsWith('/'))file=path.join(file,'index.html');if(!file.startsWith(root+path.sep)||!fs.existsSync(file)){await route.fulfill({status:404,body:''});return;}await route.fulfill({status:200,contentType:types[path.extname(file)]||'application/octet-stream',body:fs.readFileSync(file)});});
  await page.goto('http://127.0.0.1:4173/docs/mascot-lab/');await page.waitForFunction(()=>!!document.querySelector('#alex').renderer);
  assert.equal(await page.evaluate(()=>document.querySelector('#alex').limbs.length),4);
  assert(await page.evaluate(()=>{const a=document.querySelector('#alex');a.scene.updateMatrixWorld(true);const center=a.body.getWorldPosition(a.body.position.clone());return a.limbs.slice(0,2).every(arm=>{const socket=arm.localToWorld(arm.position.clone().set(0,.35,0));const outer=arm.localToWorld(arm.position.clone().set(0,-.29,0));return socket.distanceTo(center)<outer.distanceTo(center);});}),'Both arm sockets must face the body, not the outer tips');
  const vertexCount=await page.evaluate(()=>{const a=document.querySelector('#alex');return {triangles:a.renderer.info.render.triangles,calls:a.renderer.info.render.calls};});
  assert(vertexCount.triangles<25000);
  for(const expression of ['happy','attentive','thoughtful','surprised','confused','excited','wink','angry']){
   await page.locator('[data-expression="'+expression+'"]').click();await page.waitForTimeout(370);
   assert.equal(await page.evaluate(()=>document.querySelector('#alex')._currentFace),expression);
   assert.equal(await page.locator('[data-expression="'+expression+'"]').getAttribute('aria-pressed'),'true');
   if(expression==='excited')await page.locator('#stage').screenshot({path:path.join(results,'alex-excited.png')});
  }
  const limbsBefore=await page.evaluate(()=>document.querySelector('#alex').limbs.map(g=>g.position.y));await page.waitForTimeout(180);
  const limbsAfter=await page.evaluate(()=>document.querySelector('#alex').limbs.map(g=>g.position.y));assert(limbsAfter.every((v,i)=>Math.abs(v-limbsBefore[i])>.00001));
  const completed=[];
  for(const animation of ['wave','celebrate','thinking','explaining','typing','reading','confused','angry','sleep','wake','celebrateScene','angryScene']){
   await page.locator('[data-animation="'+animation+'"]').click();assert.equal(await page.evaluate(()=>document.querySelector('#alex')._gesture.name),animation);
   await page.evaluate(()=>{const a=document.querySelector('#alex');a._gesture.start=a._elapsed-.9;});await page.waitForTimeout(90);
   assert(await page.evaluate(()=>{const a=document.querySelector('#alex');a.scene.updateMatrixWorld(true);return a.limbs.slice(0,2).every(arm=>{const socket=arm.userData.socket,port=arm.userData.port;const cap=socket.localToWorld(socket.position.clone().set(0,.010,0)),led=port.getWorldPosition(port.position.clone());const capNormal=socket.position.clone().set(0,1,0).applyQuaternion(socket.getWorldQuaternion(socket.quaternion.clone())),ledNormal=port.position.clone().set(0,0,1).applyQuaternion(port.getWorldQuaternion(port.quaternion.clone()));return cap.distanceTo(led)<.006&&capNormal.dot(ledNormal)>.9999;});}), 'Shoulder LED must stay flush and aligned in '+animation);
   const name=await page.evaluate(()=>{const a=document.querySelector('#alex');const name=a._gesture.name;a._elapsed+=a._gesture.duration;return name;});
   await page.waitForTimeout(90);assert.equal(await page.evaluate(()=>document.querySelector('#alex')._gesture),null);completed.push(name);
  }
  // Replay an identical event, restore the selected face, preserve non-interactive mode.
  await page.evaluate(()=>{const a=document.querySelector('#alex');a.playAnimation('wave');a.playAnimation('wave');a.animation='idle';a.interactive=false;});
  assert(await page.evaluate(()=>document.querySelector('#alex').button.disabled));await page.evaluate(()=>document.querySelector('#alex').interactive=true);
  for(const theme of ['dark','pink','light']){await page.locator('button[data-theme="'+theme+'"]').click();await page.waitForTimeout(100);assert.equal(await page.evaluate(()=>document.querySelector('#alex')._theme),theme);}
  // Angry colors cover every trim and holographic material, then return to the theme.
  await page.locator('[data-expression="angry"]').click();await page.waitForTimeout(350);
  assert(await page.evaluate(()=>{const a=document.querySelector('#alex');return a.lightMaterial.emissive.getHexString()==='ff3347'&&a._glowMaterial.color.getHexString()==='ff3347'&&a._panelMaterials.every(m=>m.color.getHexString()==='ff3347');}));
  await page.locator('#stage').screenshot({path:path.join(results,'alex-angry.png')});
  await page.locator('[data-expression="happy"]').click();await page.waitForTimeout(350);
  assert.equal(await page.evaluate(()=>document.querySelector('#alex').lightMaterial.emissive.getHexString()),'50d8ff');
  // Hands keep their own side even at maximum intensity; two distinct usable props.
  for(const mode of ['typing','reading']){
   await page.evaluate(mode=>{const a=document.querySelector('#alex');a.intensity=2;a.playAnimation(mode);a._gesture.start=a._elapsed-1.2;a._blinkAt=a._elapsed+100;},mode);await page.waitForTimeout(370);
   assert(await page.evaluate(()=>{const a=document.querySelector('#alex');return a.limbs[0].position.x<0&&a.limbs[1].position.x>0&&Math.abs(a._look.x)<1&&Math.abs(a._look.y)<1;}));
   assert.equal(await page.evaluate(()=>document.querySelector('#alex').keyboard.visible),mode==='typing');
   await page.locator('#stage').screenshot({path:path.join(results,'alex-'+mode+'.png')});
   await page.evaluate(()=>{const a=document.querySelector('#alex');a.animation='idle';a.intensity=1;});
  }
  for(const mode of ['wave','wake','thinking','confused','explaining','celebrateScene','angryScene']){
   await page.evaluate(mode=>{const a=document.querySelector('#alex');a.playAnimation(mode);a._gesture.start=a._elapsed-.85;a._blinkAt=a._elapsed+100;},mode);
   await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));await page.waitForTimeout(370);
   if(mode==='wave')assert(await page.evaluate(()=>{const a=document.querySelector('#alex');return a.limbs.every(g=>g.position.y-g.userData.base.y<.30)&&a.limbs[1].userData.tipPivot.position.y===.351;}), 'Arm gestures pivot at the shoulder with moderate lift');
   if(mode.endsWith('Scene')){assert(await page.evaluate(()=>document.querySelector('#alex').camera.zoom<1));assert.equal(await page.evaluate(()=>document.querySelector('#alex').flames.visible),mode==='angryScene');}
   await page.locator('#stage').screenshot({path:path.join(results,'alex-'+mode+'.png')});
   await page.evaluate(()=>document.querySelector('#alex').animation='idle');await page.waitForTimeout(70);
  }
  await page.locator('[data-expression="happy"]').click();await page.locator('#speaking').check();
  const speakingBefore=await page.evaluate(()=>document.querySelector('#alex').faceCanvas.toDataURL());await page.waitForTimeout(130);
  assert.notEqual(await page.evaluate(()=>document.querySelector('#alex').faceCanvas.toDataURL()),speakingBefore);assert.equal(await page.evaluate(()=>document.querySelector('#alex')._currentFace),'happy');await page.locator('#speaking').uncheck();
  await page.locator('[data-view="180"]').click();await page.waitForTimeout(80);assert(Math.abs(await page.evaluate(()=>document.querySelector('#alex').robot.rotation.y)-Math.PI)<.2);await page.locator('[data-view="-30"]').click();
  await page.evaluate(()=>{const a=document.querySelector('#alex');a._blinkAt=a._elapsed+100;a._blinkStart=-10;});await page.waitForTimeout(300);
  await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));await page.waitForTimeout(200);
  await page.screenshot({path:path.join(results,'alex-desktop.png'),fullPage:true});
  await page.locator('#stage').screenshot({path:path.join(results,'alex-preview.png')});
  await page.emulateMedia({reducedMotion:'reduce'});await page.waitForTimeout(100);
  const reducedBefore=await page.evaluate(()=>document.querySelector('#alex')._elapsed);await page.waitForTimeout(150);assert.equal(await page.evaluate(()=>document.querySelector('#alex')._elapsed),reducedBefore);
  await page.locator('[data-expression="surprised"]').click();await page.waitForTimeout(60);assert.equal(await page.evaluate(()=>document.querySelector('#alex')._currentFace),'surprised');
  await page.emulateMedia({reducedMotion:'no-preference'});await page.evaluate(()=>{document.querySelector('#alex').intensity=0;});await page.waitForTimeout(100);
  const zeroBefore=await page.evaluate(()=>document.querySelector('#alex')._elapsed);await page.waitForTimeout(150);assert.equal(await page.evaluate(()=>document.querySelector('#alex')._elapsed),zeroBefore);
  await page.evaluate(()=>{const a=document.querySelector('#alex');a.intensity=1;a.setMouthOpenness(2);});assert.equal(await page.evaluate(()=>document.querySelector('#alex')._openness),1);
  await page.evaluate(()=>{const a=document.querySelector('#alex');a.setMouthOpenness(null);});
  // The control itself is reachable by keyboard and behaves as a touch button.
  await page.evaluate(()=>document.querySelector('#alex').button.focus());await page.keyboard.press('Enter');assert.equal(await page.evaluate(()=>document.querySelector('#alex')._gesture.name),'wave');
  await page.locator('[data-expression="happy"]').click();await page.waitForTimeout(320);
  await page.setViewportSize({width:390,height:844});await page.evaluate(()=>{const a=document.querySelector('#alex');a._blinkAt=a._elapsed+100;a._blinkStart=-10;});await page.waitForTimeout(150);
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await page.screenshot({path:path.join(results,'alex-mobile.png'),fullPage:true});
  // Pause offscreen; no rendering loop remains after removal; reconnect allocates fresh resources.
  await page.evaluate(()=>window.scrollTo(0,document.body.scrollHeight));await page.waitForTimeout(120);
  const offscreenBefore=await page.evaluate(()=>document.querySelector('#alex')._elapsed);await page.waitForTimeout(180);assert.equal(await page.evaluate(()=>document.querySelector('#alex')._elapsed),offscreenBefore);
  await page.evaluate(()=>{window.detachedAlex=document.querySelector('#alex');window.detachedAlex.remove();});assert.equal(await page.evaluate(()=>window.detachedAlex.renderer),null);
  await page.evaluate(()=>document.querySelector('#stage').append(window.detachedAlex));assert(await page.evaluate(()=>!!window.detachedAlex.renderer));
  assert.deepEqual(errors,[]);console.log(JSON.stringify({passed:true,expressions:8,gestures:completed.length,limbs:4,themes:3,desktop:true,mobileEmulation:true,reducedMotion:true,lifecycle:true,geometry:vertexCount},null,2));
  await page.goto('http://127.0.0.1:4173/docs/mascot-lab/local.html');await page.waitForFunction(()=>!!document.querySelector('#alex').renderer);
  assert.equal(await page.evaluate(()=>document.querySelector('#alex')._color),'#50d8ff');
  await context.close();
 } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

