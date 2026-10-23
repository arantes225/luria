// Focused layout regression. All app/Auth traffic uses synthetic local fixtures.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {chromium}=require('playwright');
const root=path.resolve(__dirname,'..'),base='https://luria.test';
const inspect=process.argv.includes('--inspect');
const output=path.join(root,'browser-results/review-spacing');fs.mkdirSync(output,{recursive:true});
const fixture=fs.readFileSync(path.join(root,'tests/fixtures/supabase-browser.js'),'utf8')
 .replace('rpc:async(name,args={})=>{','rpc:async(name,args={})=>{if(name==="luria_bootstrap")return{data:null,error:null};')
 .replace('if(name==="is_admin")return{data:false,error:null};','if(name==="is_admin")return{data:true,error:null};');
const types={'.html':'text/html','.css':'text/css','.js':'application/javascript','.mjs':'application/javascript','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp','.woff2':'font/woff2','.json':'application/json'};
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.PLAYWRIGHT_EXECUTABLE_PATH||'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
 const results=[],errors=[];
 try {
  const context=await browser.newContext({viewport:{width:1440,height:900},serviceWorkers:'block'});
  await context.route('**/*',async route=>{
   const url=new URL(route.request().url());if(url.origin!==base)return route.abort();
   let file=path.resolve(root,'.'+decodeURIComponent(url.pathname));if(!file.startsWith(root+path.sep))return route.abort();
   if(fs.existsSync(file)&&fs.statSync(file).isDirectory())file=path.join(file,'index.html');
   if(!fs.existsSync(file))return route.fulfill({status:404,body:''});
   return route.fulfill({contentType:types[path.extname(file)]||'application/octet-stream',body:fs.readFileSync(file)});
  });
  await context.route('**/assets/js/supabase.js*',r=>r.fulfill({contentType:'application/javascript',body:fixture}));
  await context.route('**/assets/js/onboarding.js*',r=>r.fulfill({contentType:'application/javascript',body:''}));
  await context.addInitScript(()=>{
   const user='11111111-1111-4111-8111-111111111111',today=new Date().toISOString().slice(0,10);
   localStorage.setItem('docmap:editais-source','catalog');
   localStorage.setItem('fixture-db',JSON.stringify({agenda_feed:[{id:'qa-activity',user_id:user,kind:'flashcard',title:'Flashcards',area:'Clínica Médica',activity_date:today,activity_time:null,status:'scheduled'}],study_sessions:[{id:'qa-study',user_id:user,area:'Clínica Médica',activity_kind:'flashcards',started_at:new Date().toISOString(),ended_at:new Date().toISOString(),duration_seconds:840}]}));
  });
  const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));
  const routes=['/dashboard/','/apostilas/','/flashcards/','/questoes-simulados/','/caderno-erros/','/estatisticas/','/editais/','/professor-alex/'];
  for(const width of [1440,390,320])for(const route of routes){
   await page.setViewportSize({width,height:width===390?844:900});
   await page.goto(base+route,{waitUntil:'domcontentloaded'});
   await page.locator('body.app-ready[data-ui-startup="ready"]').waitFor({timeout:10000});await page.waitForTimeout(500);await page.mouse.move(0,0);
   async function measure(){return page.evaluate(()=>{
    const box=e=>{if(!e)return null;const r=e.getBoundingClientRect(),s=getComputedStyle(e);return {x:r.x,y:r.y,width:r.width,height:r.height,bottom:r.bottom,right:r.right,scrollHeight:e.scrollHeight,clientHeight:e.clientHeight,display:s.display,overflow:s.overflow,padding:s.padding,gap:s.gap,color:s.color,background:s.backgroundImage,grid:s.gridTemplateColumns};};
    return {width:innerWidth,scrollWidth:document.documentElement.scrollWidth,back:box(document.querySelector('.luria-back-button')),hero:box(document.querySelector('.luria-page-spotlight')),activity:box(document.querySelector('.dl-activity')),activityCopy:box(document.querySelector('.dl-activity-copy')),habit:box(document.querySelector('.stats-general-habit')),metrics:box(document.querySelector('#general-habit-metrics')),heat:box(document.querySelector('#general-week-heatmap')),heatGrid:box(document.querySelector('.activity-grid')),heatDays:document.querySelectorAll('#general-week-heatmap .activity-day').length,area:box(document.querySelector('#general-area-table')),areaTable:box(document.querySelector('#general-area-table table')),statsStatus:document.querySelector('#stats-status')?.textContent};
   });}
   const metrics=await measure();results.push({route,...metrics});console.log(route,width);
   if(inspect){await page.screenshot({path:path.join(output,`before-${route.split('/')[1]}-${width}.png`)});continue;}
   for(const [appearance,identity] of [['light','blue'],['dark','blue'],['light','pink'],['dark','pink']]) {
    await page.evaluate(({appearance,identity})=>{
     for(const [dimension,value] of Object.entries({appearance,identity})){
      const control=document.createElement('button');control.dataset.uiThemeControl=dimension;control.value=value;
      document.body.append(control);control.click();control.remove();
     }
    },{appearance,identity});
    await page.waitForTimeout(220);
    assert.deepEqual(await page.evaluate(()=>[document.body.dataset.uiAppearance,document.body.dataset.uiIdentity]),[appearance,identity],'theme applied');
    const m=await measure();assert(m.scrollWidth<=width+1,route+' horizontal page overflow');
    const buttonColors=await page.locator(':is(.luria-back-button,.dl-primary,.dl-start,.dl-study-now-start,.alex-send-button,.alex-open-tutoring,.alex-live-call-btn,.btn.primary,.button.primary,.stats-range button.active):not(.danger):not(.destructive)').evaluateAll(nodes=>nodes.map(e=>({text:e.textContent.trim(),rgb:getComputedStyle(e).color.match(/[\d.]+/g).slice(0,3).map(Number)})));
    for(const button of buttonColors)assert(appearance==='light'?Math.max(...button.rgb)<90:Math.min(...button.rgb)>210,route+' '+button.text+' needs dark text in light themes and light text in dark themes');
    const textColors=await page.locator(':is(.luria-back-button,.dl-primary,.dl-start,.dl-study-now-start,.alex-send-button,.alex-open-tutoring,.alex-live-call-btn) :is(span,svg,svg *,strong)').evaluateAll(nodes=>nodes.map(e=>({text:e.textContent,color:getComputedStyle(e).color,parent:getComputedStyle(e.parentElement).color})));
    for(const text of textColors)assert.equal(text.color,text.parent,route+' button label/icon must inherit theme color');
    const iconColors=await page.locator(':is(.luria-back-button,.dl-primary,.dl-start,.dl-study-now-start,.alex-send-button,.alex-open-tutoring,.alex-live-call-btn) :is(svg[stroke],svg[stroke] *)').evaluateAll(nodes=>nodes.map(e=>({color:getComputedStyle(e).color,stroke:getComputedStyle(e).stroke})));
    for(const icon of iconColors)assert.equal(icon.stroke,icon.color,route+' outline icon must follow label color');
    if(m.back){assert(m.back.height>=44,route+' touch target');assert(m.back.x>=m.hero.x&&m.back.right<=m.hero.right,route+' back width');assert(m.back.y>=m.hero.y&&m.back.bottom<=m.hero.bottom-14,route+' back button is clipped by title card');}
    if(m.activity){assert(m.activityCopy.x-m.activity.x>=12,'activity text needs inner padding');assert(m.activity.bottom>=m.activityCopy.bottom+12,'activity bottom padding');}
    if(m.habit){assert(m.metrics.bottom<=m.habit.bottom-14,'habit metrics overflow their card');assert.equal(m.heatDays,7,'all weekdays');assert(m.heat.scrollHeight<=m.heat.clientHeight+1,'heatmap is clipped');assert(m.areaTable.width>=704,'table headings compressed');assert(m.area.width<=width,'table overflows page');}
    if(['/editais/','/professor-alex/'].includes(route))assert(m.hero.background!=='none',route+' banner background');
   }
   await page.screenshot({path:path.join(output,`after-${route.split('/')[1]}-${width}.png`)});
   if(route==='/estatisticas/')await page.locator('.stats-general-layout').screenshot({path:path.join(output,`after-general-layout-${width}.png`)});
   if(route==='/estatisticas/') {await page.locator('[data-range="15"]').click();assert(await page.locator('[data-range="15"]').evaluate(e=>e.classList.contains('active')));}
   if(route==='/editais/') {assert(await page.getByRole('heading',{name:'Central de editais',exact:true}).isVisible());const m=await measure();assert(m.hero.background!=='none');}
   if(metrics.back){const href=await page.locator('.luria-back-button').getAttribute('href');await page.locator('.luria-back-button').click();await page.waitForURL(base+href);}
  }
  fs.writeFileSync(path.join(output,inspect?'before.json':'results.json'),JSON.stringify({results,errors},null,2));
  console.log('Browser errors:',JSON.stringify(errors));
  assert.deepEqual(errors,[],'uncaught browser errors');console.log(`PASS: ${results.length} page/viewport combinations, four themes, back links, statistics period and catalog controls`);
 } finally {await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1});
