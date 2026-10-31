const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {chromium}=require(process.env.ALEX_PLAYWRIGHT_MODULE||'playwright');
const root=path.resolve(__dirname,'..',process.env.ALEX_SITE_ROOT||'.');
const types={'.html':'text/html','.mjs':'text/javascript','.js':'text/javascript','.css':'text/css','.png':'image/png','.webp':'image/webp','.svg':'image/svg+xml','.woff2':'font/woff2'};
(async()=>{
 const browser=await chromium.launch({headless:true,channel:'chrome'});
 try {
  const context=await browser.newContext({viewport:{width:1440,height:1100},deviceScaleFactor:3,serviceWorkers:'block'});
  await context.route('**/*',async route=>{
   const url=new URL(route.request().url());
   // Auth/backend are covered by platform tests; this fixture exercises the real
   // page form, CSP, styles and 3D adapter without using a real user session.
   if(url.origin!=='http://127.0.0.1:4173'||/^\/assets\/js\/(app|supabase|pwa)\.js$/.test(url.pathname)||url.pathname.includes('supabase-2.')){await route.fulfill({status:200,contentType:'text/javascript',body:''});return;}
   let file=path.resolve(root,'.'+decodeURIComponent(url.pathname));if(url.pathname.endsWith('/'))file=path.join(file,'index.html');
   if(!file.startsWith(root+path.sep)||!fs.existsSync(file)){await route.fulfill({status:404,body:''});return;}
   await route.fulfill({status:200,contentType:types[path.extname(file)]||'application/octet-stream',body:fs.readFileSync(file)});
  });
  const page=await context.newPage(),errors=[],violations=[];
  page.on('pageerror',error=>errors.push(error.message));
  await page.addInitScript(()=>document.addEventListener('securitypolicyviolation',event=>console.error('CSP: '+event.blockedURI)));
  page.on('console',msg=>{if(msg.text().startsWith('CSP:'))violations.push(msg.text());});
  await page.goto('http://127.0.0.1:4173/professor-alex/');
  await page.evaluate(()=>{document.body.classList.add('app-ready');document.body.dataset.uiStartup='ready';});
  await page.waitForFunction(()=>!!document.getElementById('alex-mascot').renderer);
  assert(await page.locator('#alex-mascot').isVisible());
  assert(await page.evaluate(()=>{const a=document.getElementById('alex-mascot'),canvas=a.renderer.domElement;return canvas.width>=a.button.clientWidth*3&&canvas.height>=a.button.clientHeight*3;}),'Retina display must render at its physical resolution');
  assert.equal(await page.evaluate(()=>document.getElementById('alex-mascot')._gesture?.name),'wake');
  await page.locator('[data-alex-intent="question"]').click();
  assert.equal(await page.evaluate(()=>document.getElementById('alex-mascot')._gesture.name),'thinking');
  await page.locator('[data-alex-mode="estourado"]').click();
  assert.equal(await page.evaluate(()=>document.getElementById('alex-mascot')._gesture.name),'angryScene');
  await page.waitForTimeout(400);
  assert.equal(await page.evaluate(()=>document.getElementById('alex-mascot').lightMaterial.emissive.getHexString()),'ff3347');
  await page.locator('[data-alex-mode="normal"]').click();
  await page.locator('#alex-file').setInputFiles({name:'anotacoes.txt',mimeType:'text/plain',buffer:Buffer.from('Material de estudo')});
  assert.equal(await page.evaluate(()=>document.getElementById('alex-mascot')._gesture.name),'reading');
  await page.locator('#alex-topic').fill('Cardiologia');
  await page.locator('#alex-form button[type="submit"]').click();
  assert.equal(await page.evaluate(()=>document.getElementById('alex-mascot')._gesture.name),'explaining');
  assert.match(await page.locator('#alex-output-copy').textContent(),/Cardiologia/);
  await page.evaluate(()=>document.dispatchEvent(new CustomEvent('traube:alex',{detail:{action:'loading',phase:'start'}})));
  assert.equal(await page.evaluate(()=>document.getElementById('alex-mascot')._gesture.name),'loading');
  await page.evaluate(()=>document.dispatchEvent(new CustomEvent('traube:alex',{detail:{action:'success'}})));
  assert.equal(await page.evaluate(()=>document.getElementById('alex-mascot')._gesture.name),'nod');
  await page.evaluate(()=>document.dispatchEvent(new CustomEvent('traube:alex',{detail:{action:'error'}})));
  assert.equal(await page.evaluate(()=>document.getElementById('alex-mascot')._gesture.name),'shakeHead');
  await page.evaluate(()=>{const a=document.getElementById('alex-mascot');a.animation='idle';a.expression='happy';window.scrollTo(0,0);});
  await page.waitForTimeout(400);
  await page.screenshot({path:path.resolve(root,'../alex-integrado-desktop.png')});
  await page.setViewportSize({width:390,height:844});await page.waitForTimeout(200);
  await page.evaluate(()=>document.documentElement.classList.add('pwa-standalone'));await page.waitForTimeout(200);
  assert(await page.evaluate(()=>{const a=document.getElementById('alex-mascot'),canvas=a.renderer.domElement;return canvas.width>=a.button.clientWidth*3&&canvas.height>=a.button.clientHeight*3;}),'Standalone mobile retains native 3x resolution');
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Mobile must not overflow horizontally');
  await page.screenshot({path:path.resolve(root,'../alex-integrado-mobile.png')});
  await page.evaluate(()=>{Object.defineProperty(window.visualViewport,'scale',{configurable:true,value:2});window.visualViewport.dispatchEvent(new Event('resize'));});
  assert(await page.evaluate(()=>{const a=document.getElementById('alex-mascot');return a.renderer.domElement.width>=a.button.clientWidth*6;}),'2x pinch zoom on a 3x screen must retain physical resolution');
  assert.equal(await page.evaluate(()=>getComputedStyle(document.getElementById('alex-mascot').renderer.domElement).filter),'none','Canvas stays out of CSS filter rasterization');
  await page.waitForTimeout(200);
  const zoomRender=await page.evaluate(()=>{const a=document.getElementById('alex-mascot');a.renderer.render(a.scene,a.camera);return a.renderer.domElement.toDataURL('image/png');});
  fs.writeFileSync(path.resolve(root,'../alex-zoom.png'),Buffer.from(zoomRender.split(',')[1],'base64'));
  await page.evaluate(()=>{const a=document.getElementById('alex-mascot');a.size=900;a.style.width='900px';a.style.maxWidth='none';});await page.waitForTimeout(200);
  assert(await page.evaluate(()=>{const c=document.getElementById('alex-mascot').renderer.domElement;return c.width<=1536&&c.height<=1536;}),'Large zoomed canvases stay within the mobile memory budget');
  await page.emulateMedia({reducedMotion:'reduce'});await page.waitForTimeout(100);
  assert(await page.evaluate(()=>document.getElementById('alex-mascot')._reduced));
  assert.deepEqual(errors,[]);assert.deepEqual(violations,[]);
  await context.close();console.log('Professor Alex page: WebGL, form, mode, upload, CSP, mobile and reduced motion passed');
 }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
