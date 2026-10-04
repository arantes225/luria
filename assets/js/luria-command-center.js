
(()=>{"use strict";
if(window.__luriaCommandCenterLoaded)return;window.__luriaCommandCenterLoaded=true;
const d=document,$=(s,r=d)=>r.querySelector(s),all=(s,r=d)=>[...r.querySelectorAll(s)],esc=v=>String(v??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));
const css=d.createElement("link");css.rel="stylesheet";css.href="/assets/css/luria-command-center.css?v=20261002-study-durations";d.head.appendChild(css);
const routes=[
 ["Dashboard","Seu dia, sessões e atalhos","/dashboard/","Geral"],["Cronogramas","Planejamento de aulas e revisões","/cronograma/","Estudos"],["Desafio diário","Diagnóstico por pistas","/desafio-diario/","Estudos"],["Anotações · Cola Rápida","Anotações, prescrições e conteúdo rápido","/caderno/","Estudos"],["Questões e Simulados","Biblioteca e listas de questões","/questoes-simulados/","Estudos"],["Flashcards","Decks e revisões","/flashcards/","Estudos"],["Caderno de Erros","Erros e revisões","/caderno-erros/","Estudos"],["Simulador","Sala de emergência e LuriaZap","/plantao/","Prática"],["Mini-OSCE","Estações clínicas objetivas","/mini-osce/","Prática"],["Estatísticas","Evolução e desempenho","/estatisticas/","Desempenho"],["Editais e Provas","Provas, editais e datas","/editais/","Estudos"],["Bulário","Medicamentos e posologias","/bulario/","Trabalho"],["Protocolos","Protocolos clínicos","/protocolos/","Trabalho"],["Scores","Scores médicos","/scores/","Trabalho"],["Calculadoras","Calculadoras clínicas","/calculadoras/","Trabalho"],["Passômetro","Entrega de plantão","/passometro/","Trabalho"]
];
const SEARCH_ALIASES={
 "cm":["clinica medica","clínica médica"],"cg":["cirurgia geral"],"go":["ginecologia obstetricia","ginecologia e obstetricia","ginecologia obstetrícia","ginecologia e obstetrícia"],
 "ped":["pediatria"],"pedi":["pediatria"],"prev":["preventiva","medicina preventiva"],"mfc":["medicina de familia e comunidade","medicina da familia"],
 "cardio":["cardiologia"],"pneumo":["pneumologia"],"neuro":["neurologia"],"gastro":["gastroenterologia"],"nefro":["nefrologia"],"endo":["endocrinologia"],
 "hemato":["hematologia"],"infecto":["infectologia"],"reumato":["reumatologia"],"dermato":["dermatologia"],"psiq":["psiquiatria"],
 "orto":["ortopedia"],"uro":["urologia"],"vascular":["cirurgia vascular"],"plastica":["cirurgia plastica","cirurgia plástica"],
 "obst":["obstetricia","obstetrícia"],"gineco":["ginecologia"],"neo":["neonatologia"],"aps":["atencao primaria a saude","atenção primária à saúde"],
 "iam":["infarto agudo do miocardio","infarto agudo do miocárdio"],"ic":["insuficiencia cardiaca","insuficiência cardíaca"],
 "has":["hipertensao arterial sistemica","hipertensão arterial sistêmica"],"dm":["diabetes mellitus"],"dpoc":["doenca pulmonar obstrutiva cronica","doença pulmonar obstrutiva crônica"],
 "tep":["tromboembolismo pulmonar"],"tvp":["trombose venosa profunda"],"avc":["acidente vascular cerebral"],"pcr":["parada cardiorrespiratoria","parada cardiorrespiratória"],
 "bav":["bloqueio atrioventricular"],"brd":["bloqueio de ramo direito"],"bre":["bloqueio de ramo esquerdo"]
};
function normSearch(v){return String(v??"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLocaleLowerCase("pt-BR").replace(/[^a-z0-9]+/g," ").trim()}
function initialsSearch(v){return normSearch(v).split(" ").filter(Boolean).map(x=>x[0]).join("")}
function expandSearch(raw){
 const n=normSearch(raw),out=new Set([String(raw||"").trim(),n]);
 (SEARCH_ALIASES[n]||[]).forEach(x=>out.add(x));
 Object.entries(SEARCH_ALIASES).forEach(([abbr,vals])=>{if(vals.some(x=>normSearch(x)===n))out.add(abbr)});
 return [...out].filter(Boolean)
}
function localSearchText(route){const text=normSearch(route.join(" "));return text+" "+initialsSearch(route[0])+" "+initialsSearch(route[1])}

function topbar(){return $(".topbar")}
function modal(id,title,body){let o=d.getElementById(id);if(o)o.remove();o=d.createElement("div");o.id=id;o.className="luria-intel-overlay";o.innerHTML='<section class="luria-intel-modal" role="dialog" aria-modal="true"><header class="luria-intel-head"><h2>'+esc(title)+'</h2><button class="luria-intel-close" type="button" aria-label="Fechar">×</button></header>'+body+'</section>';d.body.appendChild(o);o.querySelector(".luria-intel-close").onclick=()=>o.remove();o.onclick=e=>{if(e.target===o)o.remove()};return o}
function installSearch(){
 const bar=topbar();if(!bar||d.getElementById("luria-global-search"))return;
 const controls=bar.querySelector(".luria-notifications");
 if(!controls){setTimeout(installSearch,120);return}
 const b=d.createElement("button");b.id="luria-global-search";b.className="luria-command-trigger luria-command-trigger-topbar luria-search-icon-only";b.type="button";b.innerHTML='<svg class="luria-command-search-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="5.5"></circle><path d="M15.2 15.2L20 20"></path></svg>';b.setAttribute("aria-label","Busca global");b.setAttribute("title","Buscar");
 const alex=d.createElement("a");alex.id="luria-alex-topbar";alex.className="luria-alex-topbar";alex.href="/professor-alex/";alex.textContent="Alex";alex.setAttribute("aria-label","Abrir Professor Alex");
 const timerWrap=controls.querySelector(".luria-pomodoro-top");
 if(timerWrap){controls.insertBefore(b,timerWrap);controls.insertBefore(alex,timerWrap);}else{controls.prepend(alex);controls.prepend(b);}
 const open=()=>{const o=modal("luria-search-overlay","Busca global",'<input id="luria-search-input" class="luria-search-input" type="search" placeholder="Busque páginas, ferramentas, temas e conteúdos..." autofocus><div id="luria-search-list" class="luria-search-list"></div>');const input=$("#luria-search-input",o),list=$("#luria-search-list",o);
 const render=()=>{const raw=input.value.trim(),expanded=expandSearch(raw).map(normSearch),tokens=expanded.flatMap(x=>x.split(/\s+/)).filter(Boolean);const queryNorm=normSearch(raw);const matches=routes.filter(r=>{if(!queryNorm)return true;const hay=localSearchText(r);if(hay.includes(queryNorm)||initialsSearch(r[0])===queryNorm)return true;return expanded.some(x=>x&&hay.includes(x))}).slice(0,14);list.innerHTML=matches.length?matches.map(r=>'<a class="luria-search-item" href="'+r[2]+'"><span><strong>'+esc(r[0])+'</strong><small>'+esc(r[1])+'</small></span><span class="luria-search-kind">'+esc(r[3])+'</span></a>').join(""):'<div class="luria-search-item"><span><strong>Nenhum atalho encontrado</strong><small>Tente outro termo. A busca clínica será ampliada conforme os bancos forem indexados.</small></span></div>';};input.oninput=render;render();setTimeout(()=>input.focus(),40)};
 b.onclick=open;d.addEventListener("keydown",e=>{if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==="k"){e.preventDefault();open()}});
}
function todayActivities(){
 const iso=new Date().toLocaleDateString("sv-SE");
 const source=Array.isArray(window.luriaDashboardUpcomingAgenda)
   ?window.luriaDashboardUpcomingAgenda
   :(typeof agendaState==="object"&&Array.isArray(agendaState.items)?agendaState.items:[]);
 return source.filter(x=>x.activity_date===iso&&!x.completed_at&&x.status!=="completed"
   &&x.kind!=="exam"&&x.kind!=="registration_deadline");
}
function studyActivityHref(a){
 const kind=String(a?.kind||"").toLowerCase();
 const title=String(a?.title||"").toLowerCase();
 if(kind==="errors_batch"||title.includes("caderno de erro")||title.includes("revisar erro"))return "/caderno-erros/revisao/?mode=today";
 if(kind==="simulation"||kind==="smart_simulation"||kind==="full_exam"||title.includes("quest")||title.includes("simulado"))return "/resolver-questoes/?daily=1";
 if(kind==="flashcards_batch"||title.includes("flashcard"))return "/flashcards/";
 if(kind==="lesson"||kind==="subject_review")return a?.item_id?"/caderno/?topic_id="+encodeURIComponent(a.item_id)+"&view=editor":"/caderno/";
 return "/cronograma/";
}
function activityMinutes(activity){
 const estimate=Number(activity.duration_minutes||activity.estimated_minutes);
 const minimum=activity.kind==="lesson"?60:30;
 return Number.isFinite(estimate)&&estimate>0?Math.max(minimum,Math.ceil(estimate)):minimum;
}
function sessionSteps(minutes){
 const acts=todayActivities(),steps=[],budget=minutes===999?Infinity:minutes;let used=0;
 const add=(title,detail,min,href)=>{if(min>0&&used+min<=budget){steps.push({title,detail,min,href});used+=min}};
 const metric=id=>Number(String(window.luriaDashboardMetrics?.[id]??d.getElementById(id)?.textContent??"").match(/\d+/)?.[0]||0);
 // Reserve full activities first; short sessions never squeeze a lesson into 15 minutes.
 acts.forEach(a=>add(a.title||"Atividade do cronograma",a.area||"Atividade de hoje",activityMinutes(a),studyActivityHref(a)));
 if(metric("metric-errors"))add("Revisar erros","Abra diretamente as revisões pendentes de hoje.",Math.min(20,budget-used),"/caderno-erros/revisao/?mode=today");
 if(metric("metric-flashcards"))add("Flashcards vencidos","Revisão dos cartões pendentes.",Math.min(15,budget-used),"/flashcards/");
 if(metric("metric-questions")||steps.length<2)add("Questões direcionadas","Pratique questões no tempo disponível.",Math.min(30,budget-used),"/resolver-questoes/?daily=1");
 if(!steps.length)add("Revisão guiada","Comece com flashcards e siga para questões.",Math.min(20,budget),"/flashcards/");
 return steps;
}
function activeGuidedSession(){
 try{
   const plan=JSON.parse(sessionStorage.getItem("luria:guided-study-plan")||"null");
   const steps=Array.isArray(plan?.steps)?plan.steps:[];
   if(!plan?.createdAt||!steps.length)return null;
   const progress=JSON.parse(sessionStorage.getItem("luria:guided-study-progress")||"null");
   const completed=progress?.createdAt===plan.createdAt?Number(progress.completedThrough??-1):-1;
   if(completed>=steps.length-1)return null;
   return plan;
 }catch{return null}
}
function openSession(initialMinutes=30){
 let mins=Number(initialMinutes)||30;const o=modal("luria-session-overlay","Estudar agora",'<p style="margin:0;color:var(--muted);font-size:10px">A LURIA organiza uma sessão a partir das atividades e pendências disponíveis agora.</p><div class="luria-session-times"><button data-m="15">15 min</button><button data-m="30" class="active">30 min</button><button data-m="60">1 hora</button><button data-m="90">1h30</button><button data-m="120">2 horas</button><button data-m="999">Completar o dia</button></div><div id="luria-session-list" class="luria-session-list"></div><div class="luria-intel-actions"><button id="luria-session-remix" class="luria-intel-button">Reorganizar</button><button id="luria-session-start" class="luria-intel-button primary">Iniciar sessão</button></div>');
 const render=()=>{all("[data-m]",o).forEach(b=>{const selected=Number(b.dataset.m)===mins;b.classList.toggle("active",selected);b.setAttribute("aria-pressed",String(selected))});const s=sessionSteps(mins);o._steps=s;$("#luria-session-list",o).innerHTML=s.map((x,i)=>'<div class="luria-session-step"><b>'+(i+1)+'</b><div><strong>'+esc(x.title)+'</strong><small>'+esc(x.detail)+'</small></div><span>'+x.min+' min</span></div>').join("")};render();
 all("[data-m]",o).forEach(b=>b.onclick=()=>{mins=Number(b.dataset.m);all("[data-m]",o).forEach(x=>x.classList.toggle("active",x===b));render()});
 $("#luria-session-remix",o).onclick=render;$("#luria-session-start",o).onclick=()=>{
   const steps=Array.isArray(o._steps)?o._steps:[];
   if(!steps.length)return;
   const planned=mins===999?steps.reduce((sum,x)=>sum+(Number(x.min)||0),0):mins;
   try{sessionStorage.setItem("luria:guided-study-plan",JSON.stringify({minutes:planned,requestedMinutes:mins,steps,createdAt:Date.now()}));}catch{}
   location.href="/sessao-estudo/";
 };
}
function preExam(){
 const saved=JSON.parse(localStorage.getItem("luria:preexam")||"null");const o=modal("luria-preexam-overlay","Revisão pré-prova",'<p style="margin:0 0 12px;color:var(--muted);font-size:10px">Informe a prova e a data. A LURIA usa a proximidade da prova para priorizar revisões, questões e erros.</p><div class="luria-preexam-fields"><input id="luria-preexam-name" placeholder="Nome da prova, ex.: ENARE"><input id="luria-preexam-date" type="date"></div><div id="luria-preexam-plan" class="luria-session-list"></div><div class="luria-intel-actions"><button id="luria-preexam-save" class="luria-intel-button primary">Salvar revisão</button></div>');
 const n=$("#luria-preexam-name",o),dt=$("#luria-preexam-date",o),plan=$("#luria-preexam-plan",o);if(saved){n.value=saved.name||"";dt.value=saved.date||""}
 const render=()=>{if(!dt.value){plan.innerHTML="";return}const days=Math.max(0,Math.ceil((new Date(dt.value+"T12:00:00")-new Date())/86400000));const intensity=days<=7?"intensiva":days<=21?"prioritária":"progressiva";plan.innerHTML='<div class="luria-session-step"><b>1</b><div><strong>Revisão '+intensity+'</strong><small>'+days+' dia'+(days===1?"":"s")+' até a prova · priorizar erros, flashcards vencidos e questões de menor desempenho.</small></div><span>'+Math.min(60,20+Math.max(0,21-days))+' min/dia</span></div>'};dt.onchange=render;render();$("#luria-preexam-save",o).onclick=()=>{localStorage.setItem("luria:preexam",JSON.stringify({name:n.value.trim(),date:dt.value,updatedAt:new Date().toISOString()}));o.remove()}
}
function bindNativeStudyPanels(){
 const active=activeGuidedSession();
 const state=active?"active":"idle";
 all("[data-luria-study-panel]").forEach(panel=>{
   if(panel.dataset.luriaSessionState===state)return;
   let mins=30;
   const title=panel.querySelector("h3");
   const timeButtons=all("[data-luria-study-time]",panel);
   timeButtons.forEach(btn=>{
     if(btn.hidden!==!!active)btn.hidden=!!active;
     btn.onclick=()=>{
       mins=Number(btn.dataset.luriaStudyTime)||30;
       timeButtons.forEach(x=>{x.classList.toggle("active",x===btn);x.setAttribute("aria-pressed",String(x===btn))});
     };
   });
   const start=panel.querySelector("[data-luria-study-start]");
   if(active){
     panel.classList.add("has-active-session");
     if(title&&title.textContent!=="Voltar para a sessão")title.textContent="Voltar para a sessão";
     if(start){
       if(start.textContent!=="Voltar para a sessão")start.textContent="Voltar para a sessão";
       start.onclick=()=>{location.href="/sessao-estudo/"};
     }
   }else{
     panel.classList.remove("has-active-session");
     if(title&&title.textContent!=="Estudar agora")title.textContent="Estudar agora";
     if(start){
       if(start.textContent!=="Estudar agora")start.textContent="Estudar agora";
       start.onclick=()=>openSession(mins);
     }
   }
   panel.dataset.luriaBound="1";
   panel.dataset.luriaSessionState=state;
 });
}
function commandCard(){
 const old=d.getElementById("luria-command-card");if(old)old.remove();
 if(d.body.dataset.page!=="dashboard")return;
 bindNativeStudyPanels();
 const layout=String(d.body.dataset.dashboardLayout||"");
 if(["1","2","3","4","5"].includes(layout)){
   all("[data-luria-study-now-inline]").forEach(x=>x.remove());
   return;
 }
 const root=d.getElementById("dashboard-alternative");if(!root)return;
 const activityCard=root.querySelector(".dl-upcoming");
 if(!activityCard||activityCard.querySelector("[data-luria-study-now-inline]"))return;
 const action=d.createElement("button");
 action.type="button";
 action.className="dl-primary luria-dashboard-study-now";
 action.dataset.luriaStudyNowInline="1";
 const active=activeGuidedSession();
 action.textContent=active?"Voltar para a sessão":"Estudar agora";
 action.onclick=()=>active?(location.href="/sessao-estudo/"):openSession(30);
 const timeline=activityCard.querySelector(".dl-timeline,.dl-empty");
 activityCard.classList.add("luria-has-study-now");
 if(timeline?.parentNode) timeline.parentNode.appendChild(action);
 else activityCard.appendChild(action);
}
function enhanceQuestion(){
 const fb=d.getElementById("qr-feedback");if(!fb)return;
 const apply=()=>{if(fb.hidden||!$(".qr-result.wrong",fb)||$(".luria-learning-actions",fb))return;const actions=d.createElement("div");actions.className="luria-learning-actions";actions.innerHTML='<button class="luria-intel-button primary" data-learn-error>Aprender com meu erro</button><button class="luria-intel-button" data-similar>Questão semelhante</button>';fb.appendChild(actions);
 $("[data-learn-error]",actions).onclick=()=>{let box=$(".luria-learning-box",fb);if(box){box.remove();return}const justification=$(".qr-justification p",fb)?.textContent||"",tip=$(".qr-pulo p",fb)?.textContent||"",tags=all("#qr-tags .qr-tag").map(x=>x.textContent).slice(0,3).join(" · ");box=d.createElement("div");box.className="luria-learning-box";box.innerHTML='<strong>Fechando este erro</strong><p><b>Conceito:</b> '+esc(justification)+'</p><p><b>Pulo do Gato:</b> '+esc(tip)+'</p>'+(tags?'<p><b>Revisar:</b> '+esc(tags)+'</p>':"");actions.after(box)};
 $("[data-similar]",actions).onclick=()=>{const mat=d.getElementById("qr-materia")?.textContent||"",area=d.getElementById("qr-area")?.textContent||"";try{sessionStorage.setItem("luria:similar-question",JSON.stringify({mat,area,tags:all("#qr-tags .qr-tag").map(x=>x.textContent)}))}catch{}const next=d.getElementById("qr-next");if(next&&!next.disabled)next.click();else location.href="/resolver-questoes/?daily=1"};
 };
 new MutationObserver(apply).observe(fb,{childList:true,subtree:true,attributes:true,attributeFilter:["hidden"]});apply()
}
async function statsTimeline(){
 if(d.body.dataset.page!=="estatisticas"||d.getElementById("luria-stats-timeline"))return;const main=$(".stats-page,.page")||d.querySelector("main");if(!main)return;
 const box=d.createElement("section");box.id="luria-stats-timeline";box.className="luria-stats-timeline";box.innerHTML='<div class="luria-stats-timeline-head"><div><h3>Linha do tempo</h3><p>Evolução recente das respostas registradas.</p></div></div><div class="luria-timeline-bars"><div class="luria-timeline-col"><div class="luria-timeline-bar" style="height:18px"></div><small>—</small></div></div>';const panel=$("[data-stats-panel='geral']",main)||main.firstElementChild;const grid=panel?.querySelector?.(".stats-block-grid");if(grid)panel.insertBefore(box,grid);else panel?.append?.(box);
 try{const sb=window.supabaseClient,user=window.docmapUser;if(!sb||!user?.id)return;const since=new Date(Date.now()-42*86400000).toISOString();const {data}=await sb.from("question_attempts").select("result,answered_at").eq("user_id",user.id).gte("answered_at",since).order("answered_at",{ascending:true});const weeks=Array.from({length:6},(_,i)=>({start:new Date(Date.now()-(5-i)*7*86400000),n:0,ok:0}));(data||[]).forEach(a=>{const t=new Date(a.answered_at);let idx=Math.floor((Date.now()-t)/604800000);idx=5-Math.min(5,Math.max(0,idx));weeks[idx].n++;if(a.result==="correct")weeks[idx].ok++});const max=Math.max(1,...weeks.map(w=>w.n));$(".luria-timeline-bars",box).innerHTML=weeks.map(w=>'<div class="luria-timeline-col"><b>'+w.n+'</b><div class="luria-timeline-bar" style="height:'+Math.max(4,Math.round(w.n/max*100))+'px"></div><small>'+w.start.toLocaleDateString("pt-BR",{day:"2-digit",month:"2-digit"})+'</small></div>').join("")}catch(e){console.warn("LURIA timeline",e)}
}
function plantaoOsceLink(){if(d.body.dataset.page!=="plantao"||d.getElementById("luria-osce-entry"))return;const lib=d.getElementById("plantao-library");if(!lib)return;const a=d.createElement("a");a.id="luria-osce-entry";a.href="/mini-osce/";a.className="luria-command-card";a.style.cssText="display:block;text-decoration:none;color:var(--text);margin-bottom:12px";a.innerHTML='<div class="luria-command-card-head"><div><h3>Mini-OSCE</h3><p>Estações objetivas derivadas dos casos clínicos do Simulador.</p></div><span class="luria-intel-button primary">Abrir estações</span></div>';lib.prepend(a)}
function adaptive(){try{window.LuriaAdaptive={preExam:JSON.parse(localStorage.getItem("luria:preexam")||"null"),buildSession:sessionSteps,openSession,version:"1.0"}}catch{}}
function boot(){installSearch();commandCard();bindNativeStudyPanels();enhanceQuestion();statsTimeline();plantaoOsceLink();adaptive()}
if(d.readyState==="loading")d.addEventListener("DOMContentLoaded",boot);else boot();window.addEventListener("pageshow",()=>{if(d.body.dataset.page==="dashboard"){commandCard();bindNativeStudyPanels()}});new MutationObserver(()=>{commandCard();enhanceQuestion();plantaoOsceLink()}).observe(d.documentElement,{childList:true,subtree:true});
})();

;(()=>{"use strict";if(window.__luriaIntegrationLayer2)return;window.__luriaIntegrationLayer2=true;
const d=document,$=(s,r=d)=>r.querySelector(s),all=(s,r=d)=>[...r.querySelectorAll(s)],esc=v=>String(v??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));
let searchTimer=0,searchSeq=0;
async function liveSearch(input){
 const q=String(input?.value||"").trim();const list=d.getElementById("luria-search-list");if(!list)return;
 all(".luria-live-result",list).forEach(x=>x.remove());if(q.length<2)return;
 const seq=++searchSeq,sb=window.supabaseClient;if(!sb)return;
 const variants=expandSearch(q).map(x=>x.replace(/[%_,]/g," ").trim()).filter(Boolean).slice(0,5);const rows=[];
 const orFor=cols=>variants.flatMap(v=>cols.map(col=>col+".ilike.%"+v+"%")).join(",");
 try{const {data}=await sb.from("question_items").select("id,set_id,stem,topic,subtopic,area,materia").or(orFor(["stem","topic","subtopic","area","materia"])).limit(8);(data||[]).forEach(x=>rows.push({title:x.topic||x.materia||"Questão",desc:x.stem||x.subtopic||x.area||"",kind:"Questão",href:"/resolver-questoes/?set_id="+encodeURIComponent(x.set_id)}))}catch{}
 try{const {data}=await sb.from("clinical_cases").select("id,title,specialty,summary").eq("active",true).or(orFor(["title","summary","specialty"])).limit(4);(data||[]).forEach(x=>rows.push({title:x.title||"Caso clínico",desc:x.summary||x.specialty||"",kind:"Simulador",href:"/plantao/sala-emergencia/"}))}catch{}
 try{const {data}=await sb.from("interconsultation_cases").select("id,title,specialty,opening_message").or(orFor(["title","specialty","opening_message"])).limit(4);(data||[]).forEach(x=>rows.push({title:x.title||"LuriaZap",desc:x.specialty||x.opening_message||"",kind:"LuriaZap",href:"/plantao/luriazap/"}))}catch{}
 if(seq!==searchSeq||!rows.length)return;list.insertAdjacentHTML("beforeend",rows.map(x=>'<a class="luria-search-item luria-live-result" href="'+x.href+'"><span><strong>'+esc(x.title)+'</strong><small>'+esc(String(x.desc).slice(0,135))+'</small></span><span class="luria-search-kind">'+esc(x.kind)+'</span></a>').join(""));
}
d.addEventListener("input",e=>{if(e.target?.id!=="luria-search-input")return;clearTimeout(searchTimer);searchTimer=setTimeout(()=>liveSearch(e.target),220)},true);

function relatedQuestionLinks(){
 const fb=d.getElementById("qr-feedback");if(!fb||fb.hidden||$(".luria-related-links",fb))return;
 const topic=(d.getElementById("qr-materia")?.textContent||all("#qr-tags .qr-tag").map(x=>x.textContent)[0]||"").trim();if(!topic)return;
 const wrap=d.createElement("div");wrap.className="luria-learning-actions luria-related-links";const q=encodeURIComponent(topic);
 wrap.innerHTML='<a class="luria-intel-button" href="/flashcards/?q='+q+'" style="text-decoration:none">Flashcards relacionados</a><a class="luria-intel-button" href="/caderno/?q='+q+'" style="text-decoration:none">Resumo / anotações</a><a class="luria-intel-button" href="/protocolos/?q='+q+'" style="text-decoration:none">Protocolos</a><a class="luria-intel-button" href="/plantao/?q='+q+'" style="text-decoration:none">Caso clínico</a>';
 fb.appendChild(wrap)
}
const fb=d.getElementById("qr-feedback");if(fb)new MutationObserver(relatedQuestionLinks).observe(fb,{childList:true,subtree:true,attributes:true});relatedQuestionLinks();

function installLuriaZapTrail(){
 if(!location.pathname.includes("/plantao/luriazap")||d.getElementById("luriazap-learning-trail"))return;
 const station=d.getElementById("plantao-phone-station");if(!station)return;
 const trail=d.createElement("div");trail.id="luriazap-learning-trail";trail.style.cssText="display:flex;gap:4px;padding:6px 8px;border-bottom:1px solid var(--border);background:var(--surface);overflow:auto";
 const names=["Aprender","Checagem","Caso clínico","Discussão","Fechamento"];
 trail.innerHTML=names.map((n,i)=>'<span data-lz-stage="'+i+'" style="white-space:nowrap;font-size:6.8px;font-weight:850;padding:4px 6px;border-radius:999px;background:var(--surface-2);color:var(--muted)">'+n+'</span>').join("");
 const head=station.querySelector(".plantao-phone-chat-head");if(head)head.after(trail);else station.prepend(trail);
 const update=()=>{const body=d.getElementById("plantao-phone-chat-body");const msgs=body?.querySelectorAll?.("*")?.length||0;const choices=d.getElementById("plantao-phone-choices");let stage=0;if(msgs>12)stage=1;if(msgs>25)stage=2;if(msgs>40)stage=3;if(choices?.textContent?.includes("Caso discutido"))stage=4;all("[data-lz-stage]",trail).forEach((el,i)=>{el.style.background=i<=stage?"var(--accent-soft)":"var(--surface-2)";el.style.color=i<=stage?"var(--accent)":"var(--muted)"})};
 const body=d.getElementById("plantao-phone-chat-body");if(body)new MutationObserver(update).observe(body,{childList:true,subtree:true});const choices=d.getElementById("plantao-phone-choices");if(choices)new MutationObserver(update).observe(choices,{childList:true,subtree:true});update()
}
function openTopicSearchFromQuery(){const p=new URLSearchParams(location.search),q=p.get("q");if(!q)return;setTimeout(()=>{const b=d.getElementById("luria-global-search");if(!b)return;b.click();setTimeout(()=>{const input=d.getElementById("luria-search-input");if(input){input.value=q;input.dispatchEvent(new Event("input",{bubbles:true}))}},60)},350)}
function boot2(){installLuriaZapTrail();openTopicSearchFromQuery();relatedQuestionLinks()}
if(d.readyState==="loading")d.addEventListener("DOMContentLoaded",boot2);else boot2();new MutationObserver(()=>installLuriaZapTrail()).observe(d.documentElement,{childList:true,subtree:true});
})();



/* Buscar fica dentro do mesmo grupo fixo da topbar do Timer. */