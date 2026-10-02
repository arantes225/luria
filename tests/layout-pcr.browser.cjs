const { chromium } = require("playwright");
const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert/strict");
const fixture = fs.readFileSync("tests/fixtures/supabase-browser.js","utf8");
const workPages = [];
function walk(dir){for(const entry of fs.readdirSync(dir,{withFileTypes:true})){const target=path.join(dir,entry.name);if(entry.isDirectory())walk(target);else if(entry.name==="index.html")workPages.push("/"+path.dirname(target)+"/");}}
walk("trabalho");
const base = process.env.TEST_BASE_URL || "http://127.0.0.1:4173";
const published = Boolean(process.env.TEST_BASE_URL);
const crypto = require("node:crypto");
fs.mkdirSync("browser-results",{recursive:true});
(async()=>{
const browser=await chromium.launch();
const failures=[];
let diagnosticPage;
try{
if(published){
const context=await browser.newContext();const request=context.request;
for(const file of ["assets/js/app.js","assets/js/trabalho-pcr.js","assets/js/pcr-store.js","assets/css/study-layout.css","trabalho/pcr/historico/index.html","cronograma/index.html","assets/css/pwa-mobile.css","caderno/index.html","assets/css/caderno.css","assets/css/flashcards-v21.css","assets/js/flashcards-v21.js","assets/js/caderno.js","caderno.html"]){
const expected=crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
let matched=false;
for(let attempt=0;attempt<10;attempt++){
const response=await request.get(base+"/"+file+"?validation="+Date.now(),{headers:{"Cache-Control":"no-cache"}});
if(response.ok()&&crypto.createHash("sha256").update(await response.body()).digest("hex")===expected){matched=true;break;}
await new Promise(resolve=>setTimeout(resolve,6000));
}
assert.ok(matched,"Published file does not match the commit: "+file);
}
await context.close();console.log("PASS Published source matches the checked commit");
}
for(const viewport of [{width:1365,height:900},{width:390,height:844},{width:320,height:700}]){
const context=await browser.newContext({viewport,serviceWorkers:"block",isMobile:viewport.width<980,hasTouch:viewport.width<980,acceptDownloads:true});
await context.addInitScript(({mobile})=>{if(mobile)document.addEventListener("DOMContentLoaded",()=>document.documentElement.classList.add("pwa-standalone"));},{mobile:viewport.width<980});
await context.route("**/assets/js/supabase.js*",route=>route.fulfill({contentType:"application/javascript",body:fixture}));
await context.route("**/assets/js/onboarding.js*",route=>route.fulfill({contentType:"application/javascript",body:""}));
await context.route("**/jspdf*umd.min.js",route=>route.fulfill({contentType:"application/javascript",body:fs.readFileSync(require.resolve("jspdf/dist/jspdf.umd.min.js"),"utf8")}));
const page=await context.newPage();diagnosticPage=page;
const errors=[];
page.on("pageerror",error=>{errors.push(error.message);console.error("PAGE ERROR",page.url(),error.message);});
async function goto(url){
await page.goto(base+url,{waitUntil:"domcontentloaded"});await page.locator("body.app-ready").waitFor({timeout:15000});await page.waitForTimeout(800);
console.log("CHECK",viewport.width,url);
assert.equal(decodeURI(new URL(page.url()).pathname),decodeURI(url).split("?")[0],"Unexpected redirect for "+url);
}
async function noOverflow(label){
const dimensions=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,width:window.innerWidth}));
if(dimensions.scroll>dimensions.width+2){
console.error("OVERFLOW",label,await page.evaluate(()=>[...document.querySelectorAll("main *")].map(el=>({tag:el.tagName,cls:el.className,id:el.id,rect:el.getBoundingClientRect()})).filter(x=>x.rect.width>window.innerWidth||x.rect.right>window.innerWidth+2).slice(0,20).map(x=>({tag:x.tag,cls:x.cls,id:x.id,left:x.rect.left,right:x.rect.right,width:x.rect.width}))));
}
if(dimensions.scroll>dimensions.width+2)failures.push(label+" "+viewport.width+" document overflow: "+JSON.stringify(dimensions));
}
async function checkActions(selector){
const rows=await page.locator(selector).evaluateAll(nodes=>nodes.map(card=>{
const icon=card.querySelector(".error-home-action-icon")||card.querySelector("i");
const copy=card.querySelector(".error-home-action-copy")||card.querySelector(":scope>span");
const arrow=card.querySelector(".error-home-action-arrow")||card.querySelector(":scope>b");
if(!icon||!copy||!arrow)return{valid:false};
const a=card.getBoundingClientRect(),i=icon.getBoundingClientRect(),c=copy.getBoundingClientRect(),r=arrow.getBoundingClientRect();
return{styles:card.getAttribute("style"),cls:card.className,display:getComputedStyle(card).display,grid:getComputedStyle(card).gridTemplateColumns,justify:getComputedStyle(card).justifyContent,width:getComputedStyle(card).width,padding:getComputedStyle(card).padding,ancestors:card.parentElement.className,valid:i.left<c.left&&r.left>=c.left&&Math.abs(a.right-r.right)<=24&&getComputedStyle(copy).textAlign==="left",rightGap:a.right-r.right,icon:i.left,copy:c.left,arrow:r.left};
}));
if(rows.some(row=>!row.valid))console.error("ACTION ALIGNMENT",viewport.width,rows);
if(rows.some(row=>!row.valid))failures.push("Action alignment "+viewport.width+": "+JSON.stringify(rows));
}
await goto("/beta-testers/");
await page.locator(".beta-feedback-card").waitFor();assert.match(await page.locator("#beta-feedback-list").innerText(),/Beta fixture/);
assert.ok(await page.locator("#beta-testers-nav-link").count());
console.log("PASS Beta non-admin "+viewport.width);
await goto("/flashcards/");
await page.locator("#flash-home-decks-list .flash-ref-deck").first().waitFor();
assert.equal(await page.locator("#flash-home-decks-list [data-v21-area]").count(),14,"All decks are shown");
const homeDeck=page.locator("#flash-home-decks-list .flash-ref-deck:not(.flash-review-all-deck)").first();
assert.equal(await homeDeck.locator(".flash-ref-deck-icon svg").count(),1,"Home deck has library icon finish");
assert.equal(await homeDeck.locator(".flash-ref-deck-stats .flash-ref-deck-stat").count(),3,"Home deck shows library counters");
const deckFinish=el=>{const s=getComputedStyle(el),icon=getComputedStyle(el.querySelector(".flash-ref-deck-icon"));return{border:s.borderLeftWidth,borderColor:s.borderLeftColor,radius:s.borderRadius,background:s.backgroundImage,padding:s.padding,title:getComputedStyle(el.querySelector("h3")).fontSize,iconBackground:icon.backgroundColor,iconRadius:icon.borderRadius};};
const homeFinish=await homeDeck.evaluate(deckFinish);
await page.locator('[data-flash-home-tab="library"]').click();
await page.locator('[data-flash-section="library"] .flash-ref-deck').first().waitFor();
assert.deepEqual(await page.locator('[data-flash-section="library"] .flash-ref-deck').first().evaluate(deckFinish),homeFinish,"Home cards match library finish");
await goto("/flashcards/");await page.locator("#flash-home-decks-list [data-v21-area]").first().waitFor();

assert.equal(await page.locator(".flash-home-decks-head button").count(),0);
const scroll=await page.locator("#flash-home-decks-list .flash-deck-cards").evaluate(el=>({width:el.clientWidth,scroll:el.scrollWidth,overflow:getComputedStyle(el).overflowX}));
assert.ok(scroll.scroll>scroll.width && scroll.overflow==="auto","Horizontal deck scroll");
await noOverflow("Flashcards");await checkActions(".flash-home-action");
const sharedMenuStyle=await page.locator("#menu-open").evaluate(el=>{const s=getComputedStyle(el);return {width:s.width,height:s.height,minWidth:s.minWidth,minHeight:s.minHeight,borderRadius:s.borderRadius,padding:s.padding,fontSize:s.fontSize,background:s.backgroundColor,position:s.position};});
const flashHero=await page.locator("#review-launcher").evaluate(el=>{const s=getComputedStyle(el);return{height:el.getBoundingClientRect().height,background:s.backgroundImage,align:s.alignItems,font:getComputedStyle(el.querySelector("h3")).fontSize,count:getComputedStyle(el.querySelector("#review-launcher-count")).fontSize};});
await page.locator("#flash-home-decks-list [data-v21-area]").last().scrollIntoViewIfNeeded();
await page.locator("#flash-home-decks-list [data-v21-area]").last().click();
await page.waitForFunction(()=>document.body.classList.contains("flash-review-session-active"));
assert.ok(await page.locator("#review-stage").isVisible(),"Deck click opens review");
await goto("/flashcards/");
await page.locator('[data-flash-home-tab="create"]').click();
await page.waitForFunction(()=>document.querySelector('[data-flash-section="create"]').classList.contains("active"));
console.log("PASS Flashcards decks and create "+viewport.width);

for(const view of ["library","editor"]){
 await goto("/caderno/?view="+view);
 await page.locator("#notebook-view-"+view).waitFor({state:"visible"});
 if(viewport.width<980){
  const menu=page.locator("#menu-open");assert.ok(await menu.isVisible(),"Notes menu visible in "+view);
  const notesMenuStyle=await menu.evaluate(el=>{const s=getComputedStyle(el);return {width:s.width,height:s.height,minWidth:s.minWidth,minHeight:s.minHeight,borderRadius:s.borderRadius,padding:s.padding,fontSize:s.fontSize,background:s.backgroundColor,position:s.position};});
  assert.deepEqual(notesMenuStyle,sharedMenuStyle,"Notes PWA menu follows shared page styling");
  assert.ok(await page.locator(".topbar #menu-open").count(),"Notes menu is in shared header");
  assert.equal(await page.locator(".notebook-mobile-navigation").count(),0,"No separate notes navigation bar");
  await menu.click();await page.waitForFunction(()=>document.body.classList.contains("sidebar-open"));
  await page.waitForTimeout(250);
  const rect=await page.locator("#sidebar").boundingBox();assert.ok(rect.x>=-1&&rect.width>100,"Notes sidebar opens");
  await page.locator("#sidebar-close").click();await page.waitForFunction(()=>!document.body.classList.contains("sidebar-open"));
  await menu.click();await page.locator("#sidebar-backdrop").click({position:{x:viewport.width-5,y:viewport.height/2}});
  await page.waitForFunction(()=>!document.body.classList.contains("sidebar-open"));
  await page.evaluate(()=>document.documentElement.classList.remove("pwa-standalone"));
  await menu.click();await page.waitForFunction(()=>document.body.classList.contains("sidebar-open"));
  await page.locator("#sidebar-close").click();await page.waitForFunction(()=>!document.body.classList.contains("sidebar-open"));
  await page.screenshot({path:"browser-results/notes-"+view+"-"+viewport.width+".png",fullPage:true});
 }else assert.ok(await page.locator("#sidebar-desktop-toggle").isVisible(),"Notes desktop sidebar toggle");
}
console.log("PASS Notes sidebar button in library and editor "+viewport.width);
await page.evaluate(()=>{
 const db=JSON.parse(localStorage.getItem("fixture-db")||"{}"),owner=window.__fixtureOwner.id,now=new Date().toISOString();
 db.study_notes=[
  {id:"linked-note",user_id:owner,topic_id:"topic-1",topic_title:"Aula de teste",area:"Clínica",materia:"Cardiologia",content_html:"<p>Conteúdo vinculado preservado</p>",created_at:now,updated_at:now},
  {id:"free-note",user_id:owner,topic_id:null,topic_title:"Página livre de teste",area:"Pediatria",materia:"Puericultura",content_html:"<p>Conteúdo livre preservado</p>",created_at:now,updated_at:now}
 ];localStorage.setItem("fixture-db",JSON.stringify(db));
});
for(const [url,noteId,content] of [["/caderno/?topic_id=topic-1","linked-note","Conteúdo vinculado preservado"],["/caderno/?note_id=free-note","free-note","Conteúdo livre preservado"]]){
 await goto(url);
 await page.locator("#notebook-topic-list").waitFor();
 assert.match(await page.locator(".note-tree-head").innerText(),/Estrutura do texto/,"Text structure stays in the left sidebar");
 assert.equal(await page.locator(".note-right-outline-card").count(),0,"No duplicate text structure card on the right");
 if(viewport.width>=1050){
  assert.ok(await page.locator(".note-actions-card").isVisible(),"Quick actions remain visible on the right");
  assert.ok(await page.locator(".note-tasks-card").isVisible(),"Study tasks remain visible on the right");
  assert.ok(await page.locator(".note-links-card").isVisible(),"Links remain visible on the right");
  assert.ok(await page.locator(".note-details-card").isVisible(),"Note information remains visible on the right");
 }
 await page.evaluate(()=>document.getElementById("notebook-inspector-move")?.click());
 await page.locator("#notebook-move-area").fill("Pediatria");await page.locator("#notebook-move-subject").fill("Crescimento e Desenvolvimento");
 await page.evaluate(()=>localStorage.setItem("fixture-note-fail","1"));
 await page.locator("#notebook-move-submit").click();await page.locator("#notebook-move-status").filter({hasText:"Não foi possível mover"}).waitFor();
 assert.ok(await page.locator("#notebook-move-dialog").isVisible(),"Move failure keeps destination dialog");
 assert.match(await page.locator("#notebook-editor").innerText(),new RegExp(content));
 await page.evaluate(()=>localStorage.removeItem("fixture-note-fail"));await page.locator("#notebook-move-submit").click();await page.locator("#notebook-move-dialog").waitFor({state:"hidden"});
 assert.equal(await page.locator("#notebook-inspector-area").innerText(),"Pediatria");assert.equal(await page.locator("#notebook-inspector-subject").innerText(),"Crescimento e Desenvolvimento");
 await goto(url);assert.match(await page.locator("#notebook-editor").innerText(),new RegExp(content));assert.equal(await page.locator("#notebook-inspector-subject").innerText(),"Crescimento e Desenvolvimento");
 assert.equal(await page.locator("#notebook-inspector-edit").count(),1,"Edit button is available in note quick actions");
 assert.equal(await page.locator("#notebook-editor").isEditable(),false,"Note opens in read mode");
 if(viewport.width>=1050){
  const edit=page.locator("#notebook-inspector-edit");
  await edit.click();
  assert.equal(await edit.locator("span").innerText(),"Salvar","Edit button becomes Save while editing");
  assert.equal(await page.locator("#notebook-editor").isEditable(),true,"Editor becomes editable");
  await edit.click();
  assert.equal(await edit.locator("span").innerText(),"Editar","Save returns button to Edit");
  assert.equal(await page.locator("#notebook-editor").isEditable(),false,"Editor returns to read mode after saving");
 }
 await goto(url);assert.match(await page.locator("#notebook-editor").innerText(),new RegExp(content));assert.equal(await page.locator("#notebook-inspector-subject").innerText(),"Crescimento e Desenvolvimento");
 const stored=await page.evaluate(id=>JSON.parse(localStorage.getItem("fixture-db")).study_notes.find(note=>note.id===id),noteId);
 assert.equal(stored.area,"Pediatria");assert.equal(stored.materia,"Crescimento e Desenvolvimento");assert.equal(stored.topic_id,noteId==="linked-note"?"topic-1":null);
}
await page.evaluate(()=>document.getElementById("notebook-inspector-move")?.click());await page.locator("#notebook-move-area").fill("Área personalizada");await page.locator("#notebook-move-subject").fill("Caderno personalizado");await page.locator("#notebook-move-submit").click();await page.locator("#notebook-move-dialog").waitFor({state:"hidden"});
await page.locator("#notebook-back-library").click();assert.match(await page.locator("#notebook-library-list").innerText(),/Caderno personalizado/);
console.log("PASS Notes moving linked/free notes, retry, reload, autosave and custom destination "+viewport.width);
await page.goto(base+"/caderno.html?note_id=free-note",{waitUntil:"domcontentloaded"});await page.locator("body.app-ready").waitFor();await page.evaluate(()=>document.getElementById("notebook-inspector-move")?.click());await page.locator("#notebook-move-dialog").waitFor();assert.equal(await page.locator("#notebook-move-area").inputValue(),"Área personalizada");await page.locator("#notebook-move-dialog [data-move-cancel]").last().click();await page.locator("#notebook-move-dialog").waitFor({state:"hidden"});
console.log("PASS Notes move action through legacy address "+viewport.width);


await goto("/caderno-erros/");
await noOverflow("Caderno de Erros");await checkActions(".error-home-actions .error-home-action");
await goto("/questoes-simulados/");
const questionHero=await page.locator("#qs-daily-card").evaluate(el=>{const s=getComputedStyle(el);return{height:el.getBoundingClientRect().height,background:s.backgroundImage,align:s.alignItems,font:getComputedStyle(el.querySelector("h2")).fontSize,count:getComputedStyle(el.querySelector(".qs-home-daily-count")).fontSize};});
assert.deepEqual(questionHero,flashHero,"Daily cards share dimensions and typography");
await noOverflow("Questões");await checkActions(".qs-home-actions-compact .error-home-action");
await goto("/cronograma/");
const activityPlacement=await page.evaluate(()=>{
 const calendar=document.querySelector(".agenda-reference-layout>.planner-panel");
 const activities=document.querySelector(".agenda-bottom-grid");
 const insights=document.querySelector(".agenda-insights-side");
 const overdue=document.querySelector(".agenda-overdue-card");
 const distribution=document.querySelector(".agenda-category-card");
 const c=calendar.getBoundingClientRect(),a=activities.getBoundingClientRect(),i=insights.getBoundingClientRect();
 return {
  gap:a.top-c.bottom,
  activitiesBeforeInsights:!!(activities.compareDocumentPosition(insights)&Node.DOCUMENT_POSITION_FOLLOWING),
  aboveInsights:a.top<i.top,
  overdueInsideInsights:!!overdue&&insights.contains(overdue),
  overdueAfterDistribution:!!overdue&&!!distribution&&!!(distribution.compareDocumentPosition(overdue)&Node.DOCUMENT_POSITION_FOLLOWING)
 };
});
assert.ok(activityPlacement.activitiesBeforeInsights,"Activities precede insights in reading order");
assert.ok(activityPlacement.gap>=-1&&activityPlacement.gap<=140,"Activities remain below calendar: "+JSON.stringify(activityPlacement));
assert.ok(activityPlacement.overdueInsideInsights,"Overdue lessons card stays in insights column");
assert.ok(activityPlacement.overdueAfterDistribution,"Overdue lessons card appears below category distribution");
if(viewport.width<980)assert.ok(activityPlacement.aboveInsights,"Mobile activities appear before insights");

await page.locator(".week-matrix-grid").waitFor();
assert.equal(await page.locator(".week-category-label strong").count(),7);
assert.equal(await page.locator(".week-activity-count").count(),49);
assert.ok((await page.locator(".week-activity-count").allTextContents()).includes("1"));
if(viewport.width<980){
const matrix=await page.locator(".week-matrix").evaluate(el=>({scroll:el.scrollWidth,width:el.clientWidth,overflow:getComputedStyle(el).overflowX}));
assert.ok(matrix.scroll>matrix.width&&matrix.overflow==="auto","Calendar scroll is internal");
}
const switches=await page.evaluate(()=>{const a=getComputedStyle(document.querySelector(".agenda-activity-view-switch button"));const b=getComputedStyle(document.querySelector('[data-insight-tabs="category"] button'));return{a:a.height,b:b.height,weight:a.fontWeight};});
assert.equal(switches.a,switches.b);assert.equal(switches.weight,"400");
await noOverflow("Cronograma");
await page.screenshot({path:"browser-results/cronograma-"+viewport.width+".png",fullPage:true});
await goto("/amigos/");await noOverflow("Amigos");await page.screenshot({path:"browser-results/amigos-"+viewport.width+".png",fullPage:true});
for(const url of workPages){
if(url==="/trabalho/prontuario/"){await page.goto(base+url,{waitUntil:"domcontentloaded"});await page.waitForTimeout(300);}
else await goto(url);
await noOverflow(url);
if(!url.includes("/pcr/executar")&&url!=="/trabalho/prontuario/")assert.ok(await page.locator(".luria-page-spotlight").isVisible(),"Work heading "+url);
await page.screenshot({path:"browser-results/"+url.replaceAll("/","_")+"-"+viewport.width+".png",fullPage:true});
}
console.log("PASS Work pages and mobile layouts "+viewport.width);
await goto("/trabalho/pcr/executar/");
await page.locator(".pcr-patient-details summary").click();
await page.locator("#pcr-patient-initials").fill("A.B.");
await page.locator("#pcr-patient-birth").fill("1990-01-02");
await page.locator("#pcr-care-info").fill("Atendimento de teste");
if(viewport.width<980)await page.locator('[data-pcr-panel="rhythms"]').click();
await page.locator('[data-rhythm="FV"]').click();await page.locator("#pcr-shock").click();
await page.evaluate(()=>localStorage.setItem("fixture-save-fail","1"));
await page.locator("#pcr-rosc").click();
await page.locator("#pcr-rosc").filter({hasText:"Tentar salvar novamente"}).waitFor();
const timer=await page.locator("#pcr-timer").innerText();await page.waitForTimeout(1200);assert.equal(await page.locator("#pcr-timer").innerText(),timer);
assert.equal(await page.locator("#pcr-metronome").getAttribute("aria-pressed"),"false");
assert.match(await page.locator("#pcr-log").innerText(),/Choque/);assert.match(await page.locator("#pcr-log").innerText(),/RCE/);
await page.reload({waitUntil:"domcontentloaded"});await page.locator("#pcr-rosc").filter({hasText:"Tentar salvar novamente"}).waitFor();
assert.match(await page.locator("#pcr-log").innerText(),/Choque/);
await page.evaluate(()=>localStorage.removeItem("fixture-save-fail"));await page.locator("#pcr-rosc").click();
await page.waitForURL("**/trabalho/pcr/historico/**");await page.locator(".pcr-patient-card h2").filter({hasText:"A.B."}).waitFor();
assert.equal(await page.locator(".pcr-history-record").count(),1,"Retry must not duplicate PCR");
const download=page.waitForEvent("download");await page.locator("[data-pdf]").click();assert.match((await download).suggestedFilename(),/luria-pcr.*pdf/);
await page.locator(".pcr-patient-card>.pcr-record-menu").count(); // menus sit in the headers
await page.locator(".pcr-patient-card>header .pcr-record-menu summary").click();
await page.locator("[data-edit-patient]").click();await page.locator('[name="initials"]').fill("C.D.");await page.locator("#pcr-edit-save").click();await page.locator(".pcr-patient-card h2").filter({hasText:"C.D."}).waitFor();
await page.locator(".pcr-history-record .pcr-record-menu summary").click();await page.locator("[data-edit-record]").click();await page.locator('[name="care_info"]').fill("Atendimento atualizado");await page.locator("#pcr-edit-save").click();await page.locator(".pcr-record-info").filter({hasText:"Atendimento atualizado"}).waitFor();
await page.locator(".pcr-history-record .pcr-record-menu summary").click();
page.once("dialog",dialog=>dialog.accept());await page.locator("[data-delete-record]").click();await page.waitForFunction(()=>!document.querySelector(".pcr-history-record"));
await page.locator(".pcr-patient-card>header .pcr-record-menu summary").click();
page.once("dialog",dialog=>dialog.accept());await page.locator("[data-delete-patient]").click();await page.waitForFunction(()=>!document.querySelector("#pcr-history-list .pcr-patient-card h2"));
console.log("PASS PCR RCE, failure, reload, retry, PDF, edits, deletion "+viewport.width);
if(errors.length)failures.push("Browser runtime errors "+viewport.width+": "+errors.join(" | "));
await context.close();
}
if(published){
const context=await browser.newContext();const page=await context.newPage();
await page.goto(base+"/beta-testers/",{waitUntil:"domcontentloaded"});await page.waitForURL("**/login/**",{timeout:15000});
console.log("PASS Published login remains required");
await context.close();
}
assert.equal(failures.length,0,failures.join("\n"));
}catch(error){if(diagnosticPage&&!diagnosticPage.isClosed())await diagnosticPage.screenshot({path:"browser-results/failure.png",fullPage:true}).catch(()=>{});throw error;}finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
