const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {chromium}=require('playwright');
const root=path.resolve(__dirname,'..');
const paths=[];
function walk(dir){for(const e of fs.readdirSync(dir,{withFileTypes:true})){if(['.git','node_modules','docs','browser-results'].includes(e.name))continue;const p=path.join(dir,e.name);if(e.isDirectory())walk(p);else if(e.name.endsWith('.html')&&/<body[^>]*data-ui-nav="v2"/.test(fs.readFileSync(p,'utf8')))paths.push(path.relative(root,p).replaceAll('\\','/'));}}
walk(root);
const mime={'.html':'text/html','.css':'text/css','.js':'application/javascript','.woff2':'font/woff2','.svg':'image/svg+xml','.png':'image/png','.json':'application/json'};
const fixture=fs.readFileSync(path.join(root,'tests/fixtures/supabase-browser.js'),'utf8')
 .replace('rpc:async(name,args={})=>{','rpc:async(name,args={})=>{if(name==="luria_bootstrap")return{data:null,error:null};if(name==="admin_pin_status")return{data:{has_pin:true},error:null};')
 .replace('if(name==="is_admin")return{data:false,error:null};','if(name==="is_admin")return{data:true,error:null};');
const failures=[],results=[];
const targetDir=process.env.CSS_BROWSER_RESULTS||path.join(root,'browser-results/css-system');
fs.mkdirSync(targetDir,{recursive:true});
(async()=>{
const base='https://luria.test';
const browser=await chromium.launch(process.env.PLAYWRIGHT_EXECUTABLE_PATH?{executablePath:process.env.PLAYWRIGHT_EXECUTABLE_PATH}:{});
try{
 const context=await browser.newContext({viewport:{width:1440,height:900},serviceWorkers:'block'});
 // All requests use local source files; no application or Auth traffic leaves the test.
 await context.route('**/*',async route=>{
  const url=new URL(route.request().url());
  if(url.origin!==base)return route.abort();
  let file=path.resolve(root,'.'+decodeURIComponent(url.pathname));
  if(!file.startsWith(root+path.sep))return route.fulfill({status:403,body:''});
  if(fs.existsSync(file)&&fs.statSync(file).isDirectory())file=path.join(file,'index.html');
  if(!fs.existsSync(file))return route.fulfill({status:404,body:''});
  return route.fulfill({contentType:mime[path.extname(file)]||'application/octet-stream',body:fs.readFileSync(file)});
 });
 await context.addInitScript(()=>localStorage.setItem('luria-admin-pin-unlocked-until:11111111-1111-4111-8111-111111111111',String(Date.now()+300000)));
 await context.route('**/assets/js/supabase.js*',r=>r.fulfill({contentType:'application/javascript',body:fixture}));
 await context.route('**/assets/js/onboarding.js*',r=>r.fulfill({contentType:'application/javascript',body:''}));
 const page=await context.newPage();let missing=[];
 page.on('response',r=>{if(r.status()>=400&&r.url().includes('/assets/css/'))missing.push(r.url())});
 page.on('requestfailed',r=>{if(r.url().includes('/assets/css/'))missing.push(r.url()+': '+r.failure()?.errorText)});
 async function visit(url){missing=[];await page.goto(base+url,{waitUntil:'domcontentloaded'});await page.locator('body.app-ready').waitFor({timeout:4000}).catch(()=>{});await page.waitForTimeout(200);assert.deepEqual(missing,[],url+' CSS requests');}
 async function bounds(label){const m=await page.evaluate(()=>{const bar=document.querySelector('.topbar'),main=document.querySelector('.main'),s=getComputedStyle(document.body);return{width:document.documentElement.scrollWidth,viewport:innerWidth,barHeight:bar?.getBoundingClientRect().height,font:getComputedStyle(bar||document.body).fontFamily,padding:main?getComputedStyle(main.querySelector('.page')||main).padding:null,
 frame:(()=>{const shell=document.querySelector('.app-shell');if(!shell)return null;const f=shell.getBoundingClientRect(),m=main?.getBoundingClientRect(),b=bar?.getBoundingClientRect();return{left:f.left,right:f.right,top:f.top,bottom:f.bottom,mainLeft:m?.left,mainRight:m?.right,mainBottom:m?.bottom,barBottom:b?.bottom,radius:getComputedStyle(shell).borderTopLeftRadius,overflow:main?getComputedStyle(main).overflowY:null,bodyOverflow:s.overflowY,bodyColor:s.backgroundColor,barColor:bar?getComputedStyle(bar).backgroundColor:null,divider:bar?getComputedStyle(bar).borderBottomWidth:null,height:innerHeight};})(),base:[...document.querySelectorAll('link[rel=stylesheet]')].filter(x=>x.href.includes('/ui-app.css?')).length,text:s.getPropertyValue('--text').trim(),themeText:s.getPropertyValue('--color-text-primary').trim()};});assert(m.width<=m.viewport+2,label+' horizontal overflow');assert.equal(m.base,1,label+' CSS base');assert(m.font.includes('Traube Inter'),label+' common font');assert.equal(m.text,m.themeText,label+' themed legacy tokens');
 if(m.frame){const f=m.frame,gap=m.viewport>980?8:4;assert.equal(f.left,gap,label+' frame left');assert.equal(f.right,m.viewport-gap,label+' frame right');assert.equal(f.bottom,f.height-gap,label+' frame bottom');assert.equal(f.top,f.barBottom,label+' header/frame seam');assert.equal(f.divider,'0px',label+' no header divider');assert.equal(f.bodyColor,f.barColor,label+' theme exterior');assert.equal(f.overflow,'auto',label+' content scroll owner');assert.equal(f.bodyOverflow,'hidden',label+' document stays fixed');assert(f.mainLeft>=f.left&&f.mainRight<=f.right+1&&f.mainBottom<=f.bottom+1,label+' main stays inside frame');}
 return m;}
 for(const file of paths){try{await visit('/'+file.replace(/index\.html$/,''));const metrics=await bounds(file);results.push({file,...metrics});}catch(error){failures.push({file,error:error.message})}if((results.length+failures.length)%10===0)console.log('CSS pages',results.length+failures.length,'/',paths.length);}
 // Representative interactions and four palette combinations. Real application
 // handlers run against an isolated synthetic account, with no production writes.
 for(const viewport of [{width:1920,height:900},{width:390,height:844},{width:320,height:700}]){
  await page.setViewportSize(viewport);
  for(const url of ['/dashboard/','/cronograma/','/flashcards/','/caderno/','/plantao/luriazap/','/plantao/sala-emergencia/','/trabalho/','/trabalho/pcr/']){
   try{await visit(url);await bounds(url+' '+viewport.width);
    for(const [appearance,identity]of [['light','blue'],['dark','blue'],['light','pink'],['dark','pink']]){
     await page.evaluate(({appearance,identity})=>{document.body.dataset.uiAppearance=appearance;document.body.dataset.uiIdentity=identity},{appearance,identity});await bounds(url+' '+appearance+' '+identity);
    }
    await page.evaluate(()=>{document.body.dataset.uiAppearance='light';document.body.dataset.uiIdentity='blue'});
    const trigger=page.locator('#menu-open');
    if(await trigger.isVisible()){
     await trigger.click();await page.waitForTimeout(270);
     if(viewport.width<981){assert(await page.locator('body').evaluate(e=>e.classList.contains('sidebar-open')));await page.keyboard.press('Escape');assert(!(await page.locator('body').evaluate(e=>e.classList.contains('sidebar-open'))));}
     else{assert.equal(await page.locator('body').getAttribute('data-ui-sidebar'),'collapsed');await trigger.click();await page.waitForTimeout(270);}
    }
    await page.locator('#luria-profile-toggle').click();await page.locator('#luria-profile-menu').waitFor({state:'visible'});await bounds(url+' profile');await page.keyboard.press('Escape');
    if(viewport.width===1920&&url==='/dashboard/')await page.screenshot({path:path.join(targetDir,'dashboard-desktop.png')});
    if(viewport.width===390&&url==='/dashboard/')await page.screenshot({path:path.join(targetDir,'dashboard-mobile.png')});
   }catch(error){failures.push({file:url,viewport,error:error.message})}
  }
 }
 // Real scrolling must move only the content. Anchors and focus follow the same owner.
 await page.setViewportSize({width:1440,height:700});await visit('/dashboard/');
 const before=await page.locator('.topbar').boundingBox();const sideBefore=await page.locator('#sidebar').boundingBox();
 await page.evaluate(()=>{const marker=document.createElement('button');marker.id='frame-scroll-target';marker.textContent='Destino de teste';marker.style.marginTop='1200px';document.querySelector('.main > .page').append(marker);marker.scrollIntoView({block:'end'});marker.focus();});
 assert(await page.locator('main.main').evaluate(e=>e.scrollTop)>0,'anchors scroll the content');assert.equal(await page.evaluate(()=>scrollY),0,'document never scrolls');
 assert.deepEqual(await page.locator('.topbar').boundingBox(),before,'header stays in place');assert.deepEqual(await page.locator('#sidebar').boundingBox(),sideBefore,'sidebar stays inside frame');
 await page.locator('#luria-profile-toggle').click();await page.locator('#luria-profile-menu').waitFor({state:'visible'});assert(await page.locator('#luria-profile-menu').evaluate(e=>{const r=e.getBoundingClientRect();return r.top>=0&&r.bottom<=innerHeight;}),'popup remains visible while content is scrolled');await page.keyboard.press('Escape');
 // Installed navigation reserves space inside the frame and restores drawer interaction.
 await page.setViewportSize({width:390,height:844});await visit('/dashboard/');
 await page.evaluate(()=>{document.documentElement.classList.add('pwa-v2-standalone');document.documentElement.dataset.pwa='standalone';window.dispatchEvent(new Event('pageshow'));});await page.waitForTimeout(200);await bounds('installed frame');
 const bottom=page.locator('#ui-mobile-navigation');await bottom.waitFor({state:'visible'});
 await page.locator('#ui-mobile-more').click();assert(await page.locator('#sidebar').isVisible());await page.keyboard.press('Escape');assert.equal(await page.locator('main.main').evaluate(e=>e.inert),false,'installed content remains interactive');
 await page.evaluate(()=>{document.documentElement.classList.remove('pwa-v2-standalone');delete document.documentElement.dataset.pwa;});
 await page.setViewportSize({width:844,height:390});await visit('/plantao/sala-emergencia/');await page.evaluate(()=>document.body.classList.add('luria-case-landscape'));assert.equal(await page.locator('.topbar').evaluate(e=>getComputedStyle(e).display),'none','landscape case keeps immersive navigation');
 fs.writeFileSync(path.join(targetDir,'results.json'),JSON.stringify({pages:paths.length,results,failures},null,2));
 assert.deepEqual(failures,[]);console.log('PASS',paths.length,'pages, 3 responsive sizes, four palettes, drawer/profile controls and emergency landscape');
 await context.close();
}finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1});
