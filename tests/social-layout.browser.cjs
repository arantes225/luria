/* Browser QA with synthetic accounts and PostgreSQL in memory. No production requests. */
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {chromium}=require('playwright');
const {database,A,B,C}=require('./fixtures/social-db.cjs');
const root=path.resolve(__dirname,'..'),out=path.join(root,'browser-results/social');
let runningBrowser;
const mime={'.html':'text/html','.css':'text/css','.js':'application/javascript','.woff2':'font/woff2','.webp':'image/webp','.png':'image/png','.svg':'image/svg+xml','.json':'application/json','.webmanifest':'application/manifest+json'};
(async()=>{
 const f=await database();await f.as(A);const room=(await f.command('create_room',{name:'Plantão de revisão',subject:'Cardiologia',objective:'Revisar síndromes coronarianas em companhia',visibility:'public',mode:'focus',capacity:6})).id;
 await f.command('session_start',{room_id:room,mode:'focus'});await f.command('checklist_add',{room_id:room,title:'Revisar abordagem da dor torácica'});await f.command('create_group',{name:'Clínica médica',area:'Medicina',objective:'Revisão de sexta-feira'});
 await f.as(B);await f.command('join_room',{room_id:room});await f.command('send_message',{room_id:room,body:'Vamos revisar os diagnósticos diferenciais primeiro?',client_id:C});
 let queue=Promise.resolve();const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH||'C:/Program Files/Google/Chrome/Application/chrome.exe'});
 runningBrowser=browser;const context=await browser.newContext({serviceWorkers:'block'});const errors=[];
 await context.exposeFunction('__socialRpc',(name,args)=>{
  const work=queue.then(async()=>{await f.as(A);if(name==='social_command')return f.command(args.p_action,args.p_payload);if(name==='social_snapshot')return f.snapshot(args.p_room_id);if(name==='my_friends')return (await f.db.query('select * from private.my_friends()')).rows;
   if(name==='my_studyrats_challenges_v3')return [
    {challenge_id:'race',creator_user_id:A,challenge_title:'Uma semana em movimento',challenge_type:'flashcards',deadline:new Date(Date.now()+3*86400000).toISOString().slice(0,10),created_at:new Date(Date.now()-3*86400000).toISOString(),status:'active',participant_user_id:A,participant_name:'Ana',studyrat_variant:'blue',studyrat_accessory:'crown',progress:48},
    {challenge_id:'race',creator_user_id:A,challenge_title:'Uma semana em movimento',challenge_type:'flashcards',deadline:new Date(Date.now()+3*86400000).toISOString().slice(0,10),created_at:new Date(Date.now()-3*86400000).toISOString(),status:'active',participant_user_id:B,participant_name:'Bruno',studyrat_variant:'brown',studyrat_accessory:'round-nerd-glasses',progress:32},
    {challenge_id:'race',creator_user_id:A,challenge_title:'Uma semana em movimento',challenge_type:'flashcards',deadline:new Date(Date.now()+3*86400000).toISOString().slice(0,10),created_at:new Date(Date.now()-3*86400000).toISOString(),status:'active',participant_user_id:C,participant_name:'Caio',studyrat_variant:'pink',studyrat_accessory:'wizard-hat',progress:21}
   ];return [];
  });queue=work.catch(()=>{});return work.then(data=>({data,error:null}),error=>({data:null,error:{message:error.message}}));
 });
 const fixture=fs.readFileSync(path.join(root,'tests/fixtures/supabase-browser.js'),'utf8').replace('rpc:async(name,args={})=>{','rpc:async(name,args={})=>{if(["social_command","social_snapshot","my_friends","my_studyrats_challenges_v3"].includes(name))return window.__socialRpc(name,args);')+`
 window.supabaseClient.realtime={setAuth:async()=>{}};
 window.supabaseClient.channel=(name,config)=>({name,config,on(){return this;},subscribe(fn){if(fn)setTimeout(()=>fn('SUBSCRIBED'),10);return this;},track:async()=>{},presenceState:()=>({'${A}':[{user_id:'${A}'}],'${B}':[{user_id:'${B}'}]}),send:async()=>{}});
 `;
 await context.route('**/*',async route=>{const u=new URL(route.request().url());if(u.origin!=='https://luria.test')return route.abort();if(u.pathname==='/assets/js/supabase.js')return route.fulfill({contentType:'application/javascript',body:fixture});
  let file=path.join(root,decodeURIComponent(u.pathname));if(fs.existsSync(file)&&fs.statSync(file).isDirectory())file=path.join(file,'index.html');if(!file.startsWith(root)||!fs.existsSync(file))return route.fulfill({status:404,body:''});return route.fulfill({contentType:mime[path.extname(file)]||'application/octet-stream',body:fs.readFileSync(file)});
 });
 fs.mkdirSync(out,{recursive:true});const page=await context.newPage();page.on('pageerror',error=>errors.push(error.message));
 await page.goto('https://luria.test/amigos/',{waitUntil:'domcontentloaded'});await page.waitForTimeout(1000);
 await page.locator('.sr-lane').first().waitFor({timeout:8000});await page.waitForTimeout(500);
 const results=[];
 for(const width of [1440,1024,768,390,320]){
  await page.setViewportSize({width,height:900});
  for(const[appearance,identity]of [['light','blue'],['light','pink'],['dark','blue']]){
   await page.evaluate(({appearance,identity})=>{document.body.dataset.uiAppearance=appearance;document.body.dataset.uiIdentity=identity;},{appearance,identity});
   await page.locator('#community-tab-friends').click();await page.waitForTimeout(150);
   const metrics=await page.evaluate(()=>{const main=document.querySelector('.main');return{viewport:innerWidth,document:document.documentElement.scrollWidth,main:main.clientWidth,scroll:main.scrollWidth,lanes:[...document.querySelectorAll('.sr-lane')].map(el=>{const b=el.getBoundingClientRect();return{left:b.left,right:b.right,height:b.height};}),rats:[...document.querySelectorAll('.sr-sprite .studyrats-rat-img')].map(el=>{const b=el.getBoundingClientRect();return{left:b.left,right:b.right,height:b.height,loaded:el.complete&&el.naturalWidth>0};})};});
   assert(metrics.document<=width+1,`document overflow ${width} ${appearance}`);assert(metrics.scroll<=metrics.main+2,`content overflow ${width} ${appearance}`);assert(metrics.rats.every(r=>r.loaded&&r.height>=50&&r.left>=0&&r.right<=width),`rat size/assets ${width}`);
   if(width===1440||width===390)await page.screenshot({path:path.join(out,`friends-${width}-${identity}-${appearance}.png`)});
   await page.locator('#community-tab-rooms').click();await page.waitForTimeout(100);assert(await page.locator('#social-rooms [data-room-enter]').count());
   results.push({width,appearance,identity,...metrics});
  }
 }
 await page.setViewportSize({width:1440,height:1000});await page.evaluate(()=>{document.body.dataset.uiAppearance='light';document.body.dataset.uiIdentity='blue';});
 await page.locator('[data-room-enter]').first().click();await page.locator('#social-messages .social-message').waitFor();await page.screenshot({path:path.join(out,'room-desktop.png')});
 await page.setViewportSize({width:390,height:844});await page.screenshot({path:path.join(out,'room-mobile.png')});
 assert.equal(await page.locator('#social-room-title').textContent(),'Plantão de revisão');
 assert.equal(await page.locator('#social-message-text').isVisible(),true);
 await page.locator('#social-message-text').scrollIntoViewIfNeeded();await page.screenshot({path:path.join(out,'room-chat-mobile.png')});
 await context.addInitScript(()=>Object.defineProperty(navigator,'standalone',{get:()=>true}));
 const installed=await context.newPage();installed.on('pageerror',e=>errors.push(e.message));await installed.setViewportSize({width:390,height:844});await installed.goto('https://luria.test/amigos/');await installed.locator('.sr-lane').first().waitFor();
 await installed.evaluate(()=>{window.LuriaEntitlements.enabled=()=>true;});await installed.locator('#studyrats-toggle-customize').click();
 await installed.locator('#studyrats-preview-large-stage').waitFor();assert.equal(await installed.locator('[data-studyrat-variant]').count(),10);assert.equal(await installed.locator('[data-studyrat-accessory]').count(),18);
 await installed.waitForFunction(()=>[...document.querySelectorAll('#studyrats-rat-picker-options img,#studyrats-accessory-picker-options img')].every(i=>i.complete&&i.naturalWidth>0));
 await installed.screenshot({path:path.join(out,'customizer-pwa.png')});
 await installed.evaluate(()=>{
  const matrix=document.createElement('section');matrix.id='sprite-matrix';matrix.className='sr-circuit';matrix.style.cssText='display:grid;grid-template-columns:repeat(2,1fr);gap:12px';
  matrix.innerHTML=sharedStudyratVariants.flatMap(v=>sharedStudyratAccessories.map(a=>'<div style="position:relative;height:120px"><span class="sr-sprite" style="left:50%">'+sharedStudyratComposite(v.id,a.id,'studyrats-rat-composite studyrats-race-fitted',.12,-.08)+'</span></div>')).join('');document.getElementById('community-friends-panel').append(matrix);
 });
 await installed.waitForFunction(()=>[...document.querySelectorAll('#sprite-matrix img')].every(i=>i.complete&&i.naturalWidth>0));
 assert.equal(await installed.locator('#sprite-matrix .studyrats-rat-composite').count(),180);
 const alignment=await installed.evaluate(()=>[...document.querySelectorAll('#sprite-matrix .studyrats-rat-composite')].every(c=>{const rat=c.querySelector('.studyrats-rat-img'),acc=c.querySelector('.studyrats-accessory-img');return Math.round(c.getBoundingClientRect().width)===108&&(!acc||acc.parentElement===rat.parentElement);}));assert(alignment);
 await page.emulateMedia({reducedMotion:'reduce'});await page.locator('#community-tab-friends').click();assert.equal(await page.locator('.sr-carriage').first().evaluate(e=>getComputedStyle(e).transitionDuration),'0s');
 assert.deepEqual(errors,[]);fs.writeFileSync(path.join(out,'results.json'),JSON.stringify({results,errors},null,2));console.log('Social browser QA: 15 viewport/theme combinations, real RPC rooms, original sprites; no page errors.');
 await browser.close();await f.db.close();
})().catch(async error=>{console.error(error);await runningBrowser?.close();process.exitCode=1;});
