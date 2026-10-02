
(()=>{"use strict";
if(window.__luriaCommandCenterLoaded)return;window.__luriaCommandCenterLoaded=true;
const d=document,$=(s,r=d)=>r.querySelector(s),all=(s,r=d)=>[...r.querySelectorAll(s)],esc=v=>String(v??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));
const css=d.createElement("link");css.rel="stylesheet";css.href="/assets/css/luria-command-center.css?v=20261002-1";d.head.appendChild(css);
const routes=[
 ["Dashboard","Seu dia, sessões e atalhos","/dashboard/","Geral"],["Cronogramas","Planejamento de aulas e revisões","/cronograma/","Estudos"],["Desafio diário","Diagnóstico por pistas","/desafio-diario/","Estudos"],["Anotações · Cola Rápida","Anotações, prescrições e conteúdo rápido","/caderno/","Estudos"],["Questões e Simulados","Biblioteca e listas de questões","/questoes-simulados/","Estudos"],["Flashcards","Decks e revisões","/flashcards/","Estudos"],["Caderno de Erros","Erros e revisões","/caderno-erros/","Estudos"],["Simulador","Sala de emergência e LuriaZap","/plantao/","Prática"],["Mini-OSCE","Estações clínicas objetivas","/mini-osce/","Prática"],["Estatísticas","Evolução e desempenho","/estatisticas/","Desempenho"],["Editais e Provas","Provas, editais e datas","/editais/","Estudos"],["Bulário","Medicamentos e posologias","/bulario/","Trabalho"],["Protocolos","Protocolos clínicos","/protocolos/","Trabalho"],["Scores","Scores médicos","/scores/","Trabalho"],["Calculadoras","Calculadoras clínicas","/calculadoras/","Trabalho"],["Passômetro","Entrega de plantão","/passometro/","Trabalho"]
];
function topbar(){return $(".topbar")}
function modal(id,title,body){let o=d.getElementById(id);if(o)o.remove();o=d.createElement("div");o.id=id;o.className="luria-intel-overlay";o.innerHTML='<section class="luria-intel-modal" role="dialog" aria-modal="true"><header class="luria-intel-head"><h2>'+esc(title)+'</h2><button class="luria-intel-close" type="button" aria-label="Fechar">×</button></header>'+body+'</section>';d.body.appendChild(o);o.querySelector(".luria-intel-close").onclick=()=>o.remove();o.onclick=e=>{if(e.target===o)o.remove()};return o}
function installSearch(){
 const bar=topbar();if(!bar||d.getElementById("luria-global-search"))return;
 const b=d.createElement("button");b.id="luria-global-search";b.className="luria-command-trigger";b.type="button";b.innerHTML='⌕ <span>Buscar</span>';b.setAttribute("aria-label","Busca global");
 const menu=bar.querySelector("#menu-open,.menu-open");
 if(menu?.nextSibling) bar.insertBefore(b,menu.nextSibling); else if(menu) bar.appendChild(b); else bar.prepend(b);
 const open=()=>{const o=modal("luria-search-overlay","Busca global",'<input id="luria-search-input" class="luria-search-input" type="search" placeholder="Busque páginas, ferramentas, temas e conteúdos..." autofocus><div id="luria-search-list" class="luria-search-list"></div>');const input=$("#luria-search-input",o),list=$("#luria-search-list",o);
 const render=()=>{const q=input.value.trim().toLocaleLowerCase("pt-BR");const tokens=q.split(/\s+/).filter(Boolean);const matches=routes.filter(r=>!tokens.length||tokens.every(t=>(r.join(" ")).toLocaleLowerCase("pt-BR").includes(t))).slice(0,14);list.innerHTML=matches.length?matches.map(r=>'<a class="luria-search-item" href="'+r[2]+'"><span><strong>'+esc(r[0])+'</strong><small>'+esc(r[1])+'</small></span><span class="luria-search-kind">'+esc(r[3])+'</span></a>').join(""):'<div class="luria-search-item"><span><strong>Nenhum atalho encontrado</strong><small>Tente outro termo. A busca clínica será ampliada conforme os bancos forem indexados.</small></span></div>';};input.oninput=render;render();setTimeout(()=>input.focus(),40)};
 b.onclick=open;d.addEventListener("keydown",e=>{if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==="k"){e.preventDefault();open()}});
}
function todayActivities(){try{if(typeof agendaState==="object"&&Array.isArray(agendaState.items)){const iso=new Date().toLocaleDateString("sv-SE");return agendaState.items.filter(x=>x.activity_date===iso)}}catch{}return[]}
function sessionSteps(minutes){
 const acts=todayActivities(),steps=[],budget=minutes===999?120:minutes;let used=0;
 const add=(title,detail,min,href)=>{if(used+min<=budget||!steps.length){steps.push({title,detail,min,href});used+=min}};
 const errors=Number((d.getElementById("metric-errors")?.textContent||"").match(/\d+/)?.[0]||0),flash=Number((d.getElementById("metric-flashcards")?.textContent||"").match(/\d+/)?.[0]||0),questions=Number((d.getElementById("metric-questions")?.textContent||"").match(/\d+/)?.[0]||0);
 if(errors)add("Revisar erros","Comece pelos erros pendentes para fechar lacunas.",Math.min(10,budget),"/caderno-erros/");
 if(flash)add("Flashcards vencidos","Faça uma revisão curta antes de conteúdo novo.",Math.min(12,Math.max(5,budget-used)),"/flashcards/");
 acts.slice(0,3).forEach(a=>add(a.title||"Atividade do cronograma",a.area||"Atividade de hoje",15,a.kind==="lesson"?"/caderno/":"/cronograma/"));
 if(questions||steps.length<2)add("Questões direcionadas","Consolide a sessão com questões do dia.",Math.min(20,Math.max(8,budget-used)),"/resolver-questoes/?daily=1");
 if(!steps.length)add("Revisão guiada","Comece com flashcards e siga para questões.",Math.min(20,budget),"/flashcards/");
 return steps
}
function openSession(){
 let mins=30;const o=modal("luria-session-overlay","Estudar agora",'<p style="margin:0;color:var(--muted);font-size:10px">A LURIA organiza uma sessão a partir das atividades e pendências disponíveis agora.</p><div class="luria-session-times"><button data-m="15">15 min</button><button data-m="30" class="active">30 min</button><button data-m="60">1 h</button><button data-m="999">Completar o dia</button></div><div id="luria-session-list" class="luria-session-list"></div><div class="luria-intel-actions"><button id="luria-session-remix" class="luria-intel-button">Reorganizar</button><button id="luria-session-start" class="luria-intel-button primary">Iniciar sessão</button></div>');
 const render=()=>{const s=sessionSteps(mins);o._steps=s;$("#luria-session-list",o).innerHTML=s.map((x,i)=>'<div class="luria-session-step"><b>'+(i+1)+'</b><div><strong>'+esc(x.title)+'</strong><small>'+esc(x.detail)+'</small></div><span>'+x.min+' min</span></div>').join("")};render();
 all("[data-m]",o).forEach(b=>b.onclick=()=>{mins=Number(b.dataset.m);all("[data-m]",o).forEach(x=>x.classList.toggle("active",x===b));render()});
 $("#luria-session-remix",o).onclick=render;$("#luria-session-start",o).onclick=()=>{const first=o._steps?.[0];if(first?.href)location.href=first.href};
}
function preExam(){
 const saved=JSON.parse(localStorage.getItem("luria:preexam")||"null");const o=modal("luria-preexam-overlay","Revisão pré-prova",'<p style="margin:0 0 12px;color:var(--muted);font-size:10px">Informe a prova e a data. A LURIA usa a proximidade da prova para priorizar revisões, questões e erros.</p><div class="luria-preexam-fields"><input id="luria-preexam-name" placeholder="Nome da prova, ex.: ENARE"><input id="luria-preexam-date" type="date"></div><div id="luria-preexam-plan" class="luria-session-list"></div><div class="luria-intel-actions"><button id="luria-preexam-save" class="luria-intel-button primary">Salvar revisão</button></div>');
 const n=$("#luria-preexam-name",o),dt=$("#luria-preexam-date",o),plan=$("#luria-preexam-plan",o);if(saved){n.value=saved.name||"";dt.value=saved.date||""}
 const render=()=>{if(!dt.value){plan.innerHTML="";return}const days=Math.max(0,Math.ceil((new Date(dt.value+"T12:00:00")-new Date())/86400000));const intensity=days<=7?"intensiva":days<=21?"prioritária":"progressiva";plan.innerHTML='<div class="luria-session-step"><b>1</b><div><strong>Revisão '+intensity+'</strong><small>'+days+' dia'+(days===1?"":"s")+' até a prova · priorizar erros, flashcards vencidos e questões de menor desempenho.</small></div><span>'+Math.min(60,20+Math.max(0,21-days))+' min/dia</span></div>'};dt.onchange=render;render();$("#luria-preexam-save",o).onclick=()=>{localStorage.setItem("luria:preexam",JSON.stringify({name:n.value.trim(),date:dt.value,updatedAt:new Date().toISOString()}));o.remove()}
}
function commandCard(){
 const old=d.getElementById("luria-command-card");if(old)old.remove();
 if(d.body.dataset.page!=="dashboard")return;
 const root=d.getElementById("dashboard-alternative");if(!root)return;
 const activityCard=root.querySelector(".dl-agenda-large,.dl-agenda,.dl-upcoming,.dl-card");
 if(!activityCard||activityCard.querySelector("[data-luria-study-now-inline]"))return;
 const action=d.createElement("button");
 action.type="button";
 action.className="dl-primary luria-dashboard-study-now";
 action.dataset.luriaStudyNowInline="1";
 action.textContent="Estudar agora";
 action.onclick=openSession;
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
 const box=d.createElement("section");box.id="luria-stats-timeline";box.className="luria-stats-timeline";box.innerHTML='<h3>Linha do tempo</h3><p>Evolução recente das respostas registradas.</p><div class="luria-timeline-bars"><div class="luria-timeline-col"><div class="luria-timeline-bar" style="height:18px"></div><small>—</small></div></div>';const anchor=$("[data-stats-panel='geral']",main)||main.firstElementChild;anchor?.prepend?.(box);
 try{const sb=window.supabaseClient,user=window.docmapUser;if(!sb||!user?.id)return;const since=new Date(Date.now()-42*86400000).toISOString();const {data}=await sb.from("question_attempts").select("result,answered_at").eq("user_id",user.id).gte("answered_at",since).order("answered_at",{ascending:true});const weeks=Array.from({length:6},(_,i)=>({start:new Date(Date.now()-(5-i)*7*86400000),n:0,ok:0}));(data||[]).forEach(a=>{const t=new Date(a.answered_at);let idx=Math.floor((Date.now()-t)/604800000);idx=5-Math.min(5,Math.max(0,idx));weeks[idx].n++;if(a.result==="correct")weeks[idx].ok++});const max=Math.max(1,...weeks.map(w=>w.n));$(".luria-timeline-bars",box).innerHTML=weeks.map(w=>'<div class="luria-timeline-col"><b>'+w.n+'</b><div class="luria-timeline-bar" style="height:'+Math.max(4,Math.round(w.n/max*100))+'px"></div><small>'+w.start.toLocaleDateString("pt-BR",{day:"2-digit",month:"2-digit"})+'</small></div>').join("")}catch(e){console.warn("LURIA timeline",e)}
}
function plantaoOsceLink(){if(d.body.dataset.page!=="plantao"||d.getElementById("luria-osce-entry"))return;const lib=d.getElementById("plantao-library");if(!lib)return;const a=d.createElement("a");a.id="luria-osce-entry";a.href="/mini-osce/";a.className="luria-command-card";a.style.cssText="display:block;text-decoration:none;color:var(--text);margin-bottom:12px";a.innerHTML='<div class="luria-command-card-head"><div><h3>Mini-OSCE</h3><p>Estações objetivas derivadas dos casos clínicos do Simulador.</p></div><span class="luria-intel-button primary">Abrir estações</span></div>';lib.prepend(a)}
function adaptive(){try{window.LuriaAdaptive={preExam:JSON.parse(localStorage.getItem("luria:preexam")||"null"),buildSession:sessionSteps,openSession,version:"1.0"}}catch{}}
function boot(){installSearch();commandCard();enhanceQuestion();statsTimeline();plantaoOsceLink();adaptive()}
if(d.readyState==="loading")d.addEventListener("DOMContentLoaded",boot);else boot();new MutationObserver(()=>{commandCard();enhanceQuestion();plantaoOsceLink()}).observe(d.documentElement,{childList:true,subtree:true});
})();

;(()=>{"use strict";if(window.__luriaIntegrationLayer2)return;window.__luriaIntegrationLayer2=true;
const d=document,$=(s,r=d)=>r.querySelector(s),all=(s,r=d)=>[...r.querySelectorAll(s)],esc=v=>String(v??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));
let searchTimer=0,searchSeq=0;
async function liveSearch(input){
 const q=String(input?.value||"").trim();const list=d.getElementById("luria-search-list");if(!list)return;
 all(".luria-live-result",list).forEach(x=>x.remove());if(q.length<2)return;
 const seq=++searchSeq,sb=window.supabaseClient;if(!sb)return;
 const safe=q.replace(/[%_,]/g," ").trim();const rows=[];
 try{const {data}=await sb.from("question_items").select("id,set_id,stem,topic,subtopic,area,materia").or("stem.ilike.%"+safe+"%,topic.ilike.%"+safe+"%,subtopic.ilike.%"+safe+"%,materia.ilike.%"+safe+"%").limit(6);(data||[]).forEach(x=>rows.push({title:x.topic||x.materia||"Questão",desc:x.stem||x.subtopic||x.area||"",kind:"Questão",href:"/resolver-questoes/?set_id="+encodeURIComponent(x.set_id)}))}catch{}
 try{const {data}=await sb.from("clinical_cases").select("id,title,specialty,summary").eq("active",true).or("title.ilike.%"+safe+"%,summary.ilike.%"+safe+"%,specialty.ilike.%"+safe+"%").limit(4);(data||[]).forEach(x=>rows.push({title:x.title||"Caso clínico",desc:x.summary||x.specialty||"",kind:"Simulador",href:"/plantao/sala-emergencia/"}))}catch{}
 try{const {data}=await sb.from("interconsultation_cases").select("id,title,specialty,opening_message").or("title.ilike.%"+safe+"%,specialty.ilike.%"+safe+"%,opening_message.ilike.%"+safe+"%").limit(4);(data||[]).forEach(x=>rows.push({title:x.title||"LuriaZap",desc:x.specialty||x.opening_message||"",kind:"LuriaZap",href:"/plantao/luriazap/"}))}catch{}
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
