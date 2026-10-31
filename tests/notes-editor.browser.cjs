const {chromium}=require('playwright');
const fs=require('node:fs');
const path=require('node:path');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({headless:true,channel:'chrome'});
 try {
 for(const width of [1365,390]){
  const context=await browser.newContext({viewport:{width,height:900},serviceWorkers:'block'});
  await context.route('**/*',async route=>{
   const url=new URL(route.request().url());
   if(url.hostname!=='127.0.0.1')return route.abort();
   let file=path.resolve('.','.'+decodeURIComponent(url.pathname));
   if(!file.startsWith(process.cwd()+path.sep))return route.abort();
   if(fs.existsSync(file)&&fs.statSync(file).isDirectory())file=path.join(file,'index.html');
   if(!fs.existsSync(file))return route.fulfill({status:404,body:''});
   const mime={'.html':'text/html','.js':'application/javascript','.css':'text/css','.svg':'image/svg+xml','.png':'image/png','.woff2':'font/woff2'};
   return route.fulfill({body:fs.readFileSync(file),contentType:mime[path.extname(file)]||'application/octet-stream'});
  });
  await context.route('**/assets/js/supabase.js*',r=>r.fulfill({contentType:'application/javascript',body:fs.readFileSync('tests/fixtures/supabase-browser.js','utf8').replace('rpc:async(name,args={})=>{','rpc:async(name,args={})=>{ if(name==="traube_bootstrap") return {data:null,error:null};')}));
  await context.route('**/assets/js/onboarding.js*',r=>r.fulfill({contentType:'application/javascript',body:''}));
  const page=await context.newPage();
  page.on('pageerror',error=>console.log('PAGE ERROR',error.message));
  await page.goto('http://127.0.0.1:4173/caderno/');
  await page.waitForFunction(()=>window.__fixtureOwner);
  await page.evaluate(()=>{const now=new Date().toISOString();localStorage.setItem('fixture-db',JSON.stringify({study_notes:[{id:'free-note',user_id:window.__fixtureOwner.id,topic_id:null,topic_title:'Anotação de teste',area:'Clínica',materia:'Cardiologia',content_html:'<p>Texto para formatar</p>',created_at:now,updated_at:now}]}));});
  await page.goto('http://127.0.0.1:4173/caderno/?note_id=free-note');
  await page.locator('#notebook-editor').filter({hasText:'Texto para formatar'}).waitFor();
  if(width<900)await page.locator('.note-editing-panel > summary').click();
  assert.equal(await page.locator('#notebook-toolbar').evaluate(e=>e.parentElement.className),'note-canvas');
  assert.equal(await page.locator('#notebook-inspector-edit').evaluate(e=>getComputedStyle(e).backgroundColor),'rgb(37, 99, 235)');
  await page.locator('#notebook-inspector-edit').click();
  assert.equal(await page.locator('#notebook-inspector-edit').evaluate(e=>getComputedStyle(e).backgroundColor),'rgb(21, 128, 61)');
  await page.evaluate(()=>{const editor=document.getElementById('notebook-editor');const range=document.createRange();range.selectNodeContents(editor.firstChild);const sel=getSelection();sel.removeAllRanges();sel.addRange(range);saveSelection();});
  await page.locator('#notebook-font-size').selectOption('24');
  assert.equal(await page.locator('#notebook-editor span[style*="font-size"]').evaluate(e=>getComputedStyle(e).fontSize),'24px');
  await page.locator('#notebook-list-toggle').click();
  const menu=page.locator('#notebook-list-menu');assert(await menu.isVisible());
  const rect=await menu.boundingBox();assert(rect.width>=190);assert(rect.x>=0&&rect.x+rect.width<=width);
  await page.locator('[data-list-command="checklist"]').click();
  await page.locator('#notebook-editor .notebook-check').click();
  assert.equal(await page.locator('#notebook-editor .notebook-check').getAttribute('aria-checked'),'true');
  await page.locator('#notebook-inspector-edit').click();
  await page.reload();
  await page.locator('#notebook-editor .notebook-check[aria-checked="true"]').waitFor();
  assert.equal(await page.locator('#notebook-editor span[style*="font-size"]').evaluate(e=>e.style.fontSize),'24px');
  for(const theme of ['light','dark']){
   await page.evaluate(theme=>{document.documentElement.dataset.theme=theme;document.body.classList.toggle('theme-dark',theme==='dark');},theme);
   fs.mkdirSync('../../outputs',{recursive:true});
   await page.screenshot({path:`../../outputs/anotacoes-${width}-${theme}.png`,fullPage:true});
  }
  console.log('PASS notes editor, list menu, font and checkbox persistence',width);
  await context.close();
 }
 }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
