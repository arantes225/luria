'use strict';
// Read-only visual audit of the published website after community layout release.
const fs=require('node:fs'),path=require('node:path');
const {chromium}=require('playwright');
const root=path.resolve(__dirname,'..');
const fixture=fs.readFileSync(path.join(root,'tests/fixtures/supabase-browser.js'),'utf8')
 .replace('rpc:async(name,args={})=>{','rpc:async(name,args={})=>{if(name==="luria_bootstrap")return{data:null,error:null};if(name==="admin_pin_status")return{data:{has_pin:true},error:null};')
 .replace('if(name==="is_admin")return{data:false,error:null};','if(name==="is_admin")return{data:true,error:null};')
 .replace('storage:{from:()=>','functions:{invoke:async()=>({data:{connected:false,configured:true},error:null})},storage:{from:()=>');
const mime={'.html':'text/html','.css':'text/css','.js':'application/javascript','.mjs':'application/javascript','.woff2':'font/woff2','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.json':'application/json','.webmanifest':'application/manifest+json'};
const routes=['amigos'];
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.TRAUBE_CHROME_EXECUTABLE});
 try{
  const context=await browser.newContext({viewport:{width:1915,height:873},deviceScaleFactor:1,serviceWorkers:'block'});
  const base='https://www.resibulando.online';
  let published=false;
  for(let attempt=0;attempt<28;attempt++){
    try{
      const response=await fetch(base+'/amigos/?release='+Date.now(),{cache:'no-store'});
      published=(await response.text()).includes('grid-template-columns:minmax(0,1fr) auto auto!important');
      console.log('PUBLISH_WAIT|'+attempt+'|'+response.status+'|'+published+'|'+response.headers.get('last-modified'));
      if(published)break;
    }catch(error){console.log('PUBLISH_WAIT_ERROR|'+attempt+'|'+error.message);}
    await new Promise(resolve=>setTimeout(resolve,30000));
  }
  if(!published)throw new Error('Published Amigos HTML did not include the released layout within 14 minutes');
  const raw=await browser.newContext({viewport:{width:1915,height:873},serviceWorkers:'block'});
  const rawPage=await raw.newPage();
  try{const response=await rawPage.goto(base+'/dashboard/',{waitUntil:'domcontentloaded',timeout:30000});await rawPage.waitForTimeout(2000);console.log('AUDIT_HTTP|raw-dashboard|'+(response?.status()||0)+'|'+rawPage.url());console.log('AUDIT_IMAGE|raw-dashboard|'+(await rawPage.screenshot({type:'jpeg',quality:58})).toString('base64'));}catch(error){console.log('AUDIT_ERROR|raw-dashboard|'+error.message.replaceAll('\n',' '));}
  await raw.close();
  await context.addInitScript(()=>localStorage.setItem('traube-admin-pin-unlocked-until:11111111-1111-4111-8111-111111111111',String(Date.now()+300000)));
  await context.route('**/assets/js/supabase.js*',route=>route.fulfill({contentType:'application/javascript',body:fixture}));
  await context.route('**/assets/js/onboarding.js*',route=>route.fulfill({contentType:'application/javascript',body:''}));
  const page=await context.newPage();
  for(const name of routes){
   try{
    const response=await page.goto(base+'/'+name+'/?audit=6f71e476',{waitUntil:'domcontentloaded',timeout:30000});
    console.log('AUDIT_HTTP|'+name+'|'+(response?.status()||0)+'|'+page.url());
    if(name==='amigos')console.log('AUDIT_RELEASE|'+(await response.text()).includes('grid-template-columns:minmax(0,1fr) auto auto!important')+'|'+JSON.stringify(response.headers()));
    await page.locator('body.app-ready').waitFor({timeout:5000}).catch(()=>{});
    await page.waitForTimeout(400);
    const metrics=await page.evaluate(()=>{
      const rect=selector=>{const e=document.querySelector(selector);if(!e)return null;const r=e.getBoundingClientRect();return {x:Math.round(r.x),y:Math.round(r.y),w:Math.round(r.width),h:Math.round(r.height)}};
      return {title:document.title,path:location.pathname,body:document.body.className,scrollWidth:document.documentElement.scrollWidth,viewport:innerWidth,leco:{page:rect('.alex-page'),mascot:rect('#alex-mascot-card'),composer:rect('.alex-input-bar'),main:rect('main.main'),container:rect('main.main > .page'),stage:rect('.alex-central-stage')},question:{list:rect('.qs-home-my-lists'),week:rect('.qs-home-week')},tabs:[...document.querySelectorAll('[data-settings-tab]')].map(x=>x.textContent.trim()).filter(Boolean),styles:(()=>{const out={};for(const q of ['.learn-cta','#start-review-session','.review-launcher-action','.qs-home-week .error-metric-summary-grid','.qs-home-my-lists','.sr-hall-hero h2','.sr-hall-button','.ui-page-heading','.traube-back-button','.error-library-grid','#flash-home-decks-list']){const e=document.querySelector(q);if(e){const c=getComputedStyle(e);out[q]={display:c.display,background:c.backgroundImage,color:c.color,grid:c.gridTemplateColumns,flexDirection:c.flexDirection,height:Math.round(e.getBoundingClientRect().height)}}}return out})()};
    });
    console.log('AUDIT_METRIC|'+name+'|'+JSON.stringify(metrics));
    const shot=await page.screenshot({type:'jpeg',quality:58,fullPage:false});
    console.log('AUDIT_IMAGE|'+name+'|'+shot.toString('base64'));
    if(name==='flashcards'||name==='caderno-erros'||name==='dashboard'){const target=page.locator(name==='flashcards'?'.flash-home-decks':name==='caderno-erros'?'.qs-home-my-lists':'#dashboard-alternative .dl-cat').first();if(await target.count()){await target.scrollIntoViewIfNeeded().catch(()=>{});await page.waitForTimeout(250);console.log('AUDIT_IMAGE|'+name+'-detail|'+(await page.screenshot({type:'jpeg',quality:58})).toString('base64'));}}
    if(name==='editais'){for(const id of ['exam-status-filter','ed-sort']){const el=page.locator('#'+id);if(await el.count()){await el.click();await page.waitForTimeout(150);console.log('AUDIT_IMAGE|editais-'+id+'|'+(await page.screenshot({type:'jpeg',quality:58})).toString('base64'));await page.keyboard.press('Escape');}}}
    if(name==='configuracoes'){const tab=page.locator('[data-settings-tab="perfil"]');if(await tab.count()){await tab.click();await page.waitForTimeout(250);console.log('AUDIT_IMAGE|configuracoes-perfil|'+(await page.screenshot({type:'jpeg',quality:58})).toString('base64'));}}
    if(name==='amigos'){const rats=page.locator('#studyrats-card');if(await rats.count()){await rats.scrollIntoViewIfNeeded().catch(()=>{});console.log('AUDIT_IMAGE|amigos-rats|'+(await page.screenshot({type:'jpeg',quality:58})).toString('base64'));}for(const label of ['groups','rooms']){await page.locator('#community-tab-'+label).click();await page.waitForTimeout(400);console.log('AUDIT_IMAGE|amigos-'+label+'|'+(await page.screenshot({type:'jpeg',quality:58})).toString('base64'));}}
   }catch(error){console.log('AUDIT_ERROR|'+name+'|'+error.message.replaceAll('\n',' '));}
  }
  await page.setViewportSize({width:390,height:844});
  for(const name of ['amigos']){
   try{
    await page.goto(base+'/'+name+'/',{waitUntil:'domcontentloaded',timeout:30000});
    await page.locator('body.app-ready').waitFor({timeout:5000}).catch(()=>{});
    await page.waitForTimeout(400);
    const shot=await page.screenshot({type:'jpeg',quality:58,fullPage:false});
    console.log('AUDIT_IMAGE|mobile-'+name+'|'+shot.toString('base64'));
   }catch(error){console.log('AUDIT_ERROR|mobile-'+name+'|'+error.message.replaceAll('\n',' '));}
  }
  await context.close();
 }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1});
