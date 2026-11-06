'use strict';
const fs=require('node:fs'),path=require('node:path');
const {chromium}=require('playwright');
const root=path.resolve(__dirname,'..');
const fixture=fs.readFileSync(path.join(root,'tests/fixtures/supabase-browser.js'),'utf8')
 .replace('rpc:async(name,args={})=>{','rpc:async(name,args={})=>{if(name==="luria_bootstrap")return{data:null,error:null};if(name==="admin_pin_status")return{data:{has_pin:true},error:null};');
const mime={'.html':'text/html','.css':'text/css','.js':'application/javascript','.mjs':'application/javascript','.woff2':'font/woff2','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.json':'application/json','.webmanifest':'application/manifest+json'};
const routes=['dashboard','configuracoes','aprender','professor-alex','consolidar','questoes-simulados','flashcards','caderno-erros','jogos/study-rats','jogos/plantao-relampago','jogos/sequencia-salvadora','jogos/escapando-do-plantao','desafio-diario','estatisticas','editais','aplicar/curriculo','aplicar/radar','vocacao','amigos','agencia'];
(async()=>{
 const browser=await chromium.launch({headless:true});
 try{
  const context=await browser.newContext({viewport:{width:1915,height:873},deviceScaleFactor:1,serviceWorkers:'block'});
  const base='https://traube.test';
  await context.route('**/*',async route=>{
   const url=new URL(route.request().url());
   if(url.origin!==base)return route.abort();
   let file=path.resolve(root,'.'+decodeURIComponent(url.pathname));
   if(!file.startsWith(root+path.sep))return route.fulfill({status:403,body:''});
   if(fs.existsSync(file)&&fs.statSync(file).isDirectory())file=path.join(file,'index.html');
   if(!fs.existsSync(file))return route.fulfill({status:404,body:''});
   return route.fulfill({contentType:mime[path.extname(file)]||'application/octet-stream',body:fs.readFileSync(file)});
  });
  await context.route('**/assets/js/supabase.js*',route=>route.fulfill({contentType:'application/javascript',body:fixture}));
  await context.route('**/assets/js/onboarding.js*',route=>route.fulfill({contentType:'application/javascript',body:''}));
  const page=await context.newPage();
  for(const name of routes){
   try{
    await page.goto(base+'/'+name+'/',{waitUntil:'domcontentloaded',timeout:15000});
    await page.locator('body.app-ready').waitFor({timeout:5000}).catch(()=>{});
    await page.waitForTimeout(400);
    const metrics=await page.evaluate(()=>{
      const rect=selector=>{const e=document.querySelector(selector);if(!e)return null;const r=e.getBoundingClientRect();return {x:Math.round(r.x),y:Math.round(r.y),w:Math.round(r.width),h:Math.round(r.height)}};
      return {title:document.title,path:location.pathname,body:document.body.className,scrollWidth:document.documentElement.scrollWidth,viewport:innerWidth,leco:{page:rect('.alex-page'),mascot:rect('#alex-mascot-card'),composer:rect('.alex-input-bar'),main:rect('main.main')},question:{list:rect('.qs-home-my-lists'),week:rect('.qs-home-week')},tabs:[...document.querySelectorAll('[data-settings-tab]')].map(x=>x.textContent.trim()).filter(Boolean)};
    });
    console.log('AUDIT_METRIC|'+name+'|'+JSON.stringify(metrics));
    const shot=await page.screenshot({type:'jpeg',quality:58,fullPage:false});
    console.log('AUDIT_IMAGE|'+name+'|'+shot.toString('base64'));
   }catch(error){console.log('AUDIT_ERROR|'+name+'|'+error.message.replaceAll('\n',' '));}
  }
  await page.setViewportSize({width:390,height:844});
  for(const name of ['dashboard','configuracoes','professor-alex','flashcards','amigos']){
   try{
    await page.goto(base+'/'+name+'/',{waitUntil:'domcontentloaded',timeout:15000});
    await page.locator('body.app-ready').waitFor({timeout:5000}).catch(()=>{});
    await page.waitForTimeout(400);
    const shot=await page.screenshot({type:'jpeg',quality:58,fullPage:false});
    console.log('AUDIT_IMAGE|mobile-'+name+'|'+shot.toString('base64'));
   }catch(error){console.log('AUDIT_ERROR|mobile-'+name+'|'+error.message.replaceAll('\n',' '));}
  }
  await context.close();
 }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1});
