let reviewSb=window.supabaseClient||null;
let reviewUser=null;
let reviewItems=[];
let reviewIndex=0;
let reviewCompleted=0;
const params=new URLSearchParams(location.search);
const mode=params.get("mode")||"today";
const scopeArea=params.get("area")||"";
const scopeName=params.get("name")||"";
const startId=params.get("item")||"";

function esc(v){return String(v??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}
function todayISO(){const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`}
function canonicalArea(v){const s=String(v||"").trim().toLowerCase();if(s.includes("clínica")||s.includes("clinica"))return"Clínica Médica";if(s.includes("gine")||s==="go"||s.includes("obst"))return"GO";if(s.includes("cirurg"))return"Cirurgia Geral";if(s.includes("pedi"))return"Pediatria";if(s.includes("prevent"))return"Preventiva";return v||"Sem área"}
function setStatus(msg,type=""){const el=document.getElementById("error-review-status");if(!el)return;el.textContent=msg;el.className=`error-status ${type}`.trim()}
function setScopeTitle(){const el=document.getElementById("error-review-scope");if(!el)return;if(mode==="notebook")el.textContent=[scopeArea,scopeName].filter(Boolean).join(" · ")||"Revisão do caderno";else if(mode==="area")el.textContent=scopeArea||"Revisão por área";else el.textContent="Revisões de hoje"}

function renderSidebars(){
  const total=reviewItems.length,done=Math.min(reviewCompleted,total),pending=Math.max(0,total-reviewIndex);
  document.getElementById("error-review-progress").textContent=`${Math.min(reviewIndex+1,total)} de ${total}`;
  document.getElementById("error-review-done").textContent=done;
  document.getElementById("error-review-total").textContent=total;
  document.getElementById("error-review-completed").textContent=done;
  document.getElementById("error-review-pending").textContent=pending;
  document.getElementById("error-review-ring").style.setProperty("--p",total?Math.round(done/total*100):0);

  const rest=reviewItems.slice(reviewIndex+1,reviewIndex+6);
  document.getElementById("error-review-next-count").textContent=String(Math.max(0,total-reviewIndex-1));
  const list=document.getElementById("error-review-next-list");
  list.innerHTML=rest.length?rest.map((x,i)=>`<button type="button" data-jump="${reviewIndex+i+1}"><span>${i+1}</span><div><strong>${esc(x.materia||x.theme||"Erro")}</strong><small>${esc(canonicalArea(x.area))}</small></div><b>›</b></button>`).join(""):`<div class="error-review-page-empty-mini">Nenhum item depois deste.</div>`;
  list.querySelectorAll("[data-jump]").forEach(b=>b.addEventListener("click",()=>{reviewIndex=Number(b.dataset.jump);renderCurrent()}));

  const areas={};reviewItems.forEach(x=>{const a=canonicalArea(x.area);areas[a]=(areas[a]||0)+1});
  document.getElementById("error-review-area-bars").innerHTML=Object.entries(areas).map(([a,n])=>`<div><span>${esc(a)}</span><i><b style="width:${Math.round(n/Math.max(1,total)*100)}%"></b></i><strong>${n}</strong></div>`).join("");
}

function renderCurrent(){
  const wrap=document.getElementById("error-review-card-wrap");
  const empty=document.getElementById("error-review-empty");
  if(reviewIndex>=reviewItems.length||!reviewItems.length){wrap.hidden=true;empty.hidden=false;document.getElementById("error-review-progress").textContent=`${reviewItems.length} de ${reviewItems.length}`;renderSidebars();return}
  wrap.hidden=false;empty.hidden=true;
  const item=reviewItems[reviewIndex];
  document.getElementById("error-review-area").textContent=canonicalArea(item.area);
  document.getElementById("error-review-subject").textContent=item.materia||item.theme||"Revisão";
  document.getElementById("error-review-ccq").textContent=item.ccq||"Sem Pulo do Gato";
  document.getElementById("error-review-question").textContent=item.question_text||"Questão não informada.";
  document.getElementById("error-review-answer").textContent=item.correct_answer||"—";
  const thoughtWrap=document.getElementById("error-review-thought-wrap");
  const thought=document.getElementById("error-review-thought");
  thoughtWrap.hidden=!item.what_i_thought;if(item.what_i_thought)thought.textContent=item.what_i_thought;

  const details=document.getElementById("error-review-details");
  const card=document.getElementById("error-review-big-card");
  const answer=document.getElementById("error-review-user-answer");
  const feedback=document.getElementById("error-review-feedback");
  const userAnswerCopy=document.getElementById("error-review-user-answer-copy");
  if(details)details.hidden=true;
  card?.classList.remove("question-open");
  if(answer){answer.value="";answer.disabled=false}
  if(feedback)feedback.hidden=true;
  if(userAnswerCopy)userAnswerCopy.textContent="—";
  const resultActions=document.getElementById("error-review-result-actions");
  if(resultActions)resultActions.hidden=true;
  const confirm=document.getElementById("error-review-confirm-answer");
  if(confirm){confirm.disabled=false;confirm.textContent="Confirmar resposta"}
  document.getElementById("error-review-show-question").textContent="Ver questão";
  setStatus("");
  renderSidebars();
}

async function loadItems(){
  let query=reviewSb.from("error_notebook").select("id,area,materia,theme,ccq,question_text,correct_answer,what_i_thought,due_date,review_count,created_at").eq("active",true);
  if(mode==="today")query=query.lte("due_date",todayISO());
  const result=await query.order("due_date",{ascending:true,nullsFirst:false}).order("created_at",{ascending:true}).limit(500);
  if(result.error){setStatus(`Não foi possível carregar a revisão: ${result.error.message}`,"error");return}
  let rows=result.data||[];
  if(mode==="area"&&scopeArea)rows=rows.filter(x=>canonicalArea(x.area)===scopeArea);
  if(mode==="notebook"){
    rows=rows.filter(x=>canonicalArea(x.area)===scopeArea&&(x.materia||x.theme||"Geral")===scopeName);
  }
  reviewItems=rows;
  if(startId){const idx=reviewItems.findIndex(x=>String(x.id)===String(startId));if(idx>=0)reviewIndex=idx}
  renderCurrent();
}

async function finishReview(correct=null){
  const item=reviewItems[reviewIndex];if(!item)return;
  const understood=document.getElementById("error-review-understood");
  const show=document.getElementById("error-review-show-question");
  const correctBtn=document.getElementById("error-review-correct");
  const wrongBtn=document.getElementById("error-review-wrong");
  [understood,show,correctBtn,wrongBtn].forEach(b=>{if(b)b.disabled=true});
  setStatus(correct===true?"Salvando acerto...":correct===false?"Salvando erro...":"Agendando próxima revisão...");
  const {error}=await reviewSb.rpc("review_error_entry_result",{p_error_id:item.id,p_correct:correct});
  [understood,show,correctBtn,wrongBtn].forEach(b=>{if(b)b.disabled=false});
  if(error){setStatus(`Não foi possível salvar: ${error.message}`,"error");return}
  reviewCompleted+=1;reviewIndex+=1;renderCurrent();
}

async function markUnderstood(){
  await finishReview(null);
}

function wire(){
  document.getElementById("error-review-show-question")?.addEventListener("click",()=>{
    const details=document.getElementById("error-review-details");
    const card=document.getElementById("error-review-big-card");
    const open=details.hidden;
    details.hidden=!open;
    card?.classList.toggle("question-open",open);
    document.getElementById("error-review-show-question").textContent=open?"Fechar questão":"Ver questão";
    if(open)setTimeout(()=>document.getElementById("error-review-user-answer")?.focus(),120);
  });

  document.getElementById("error-review-confirm-answer")?.addEventListener("click",()=>{
    const textarea=document.getElementById("error-review-user-answer");
    const value=textarea?.value?.trim()||"";
    if(!value){
      setStatus("Escreva sua resposta antes de confirmar.","error");
      textarea?.focus();
      return;
    }
    const copy=document.getElementById("error-review-user-answer-copy");
    const feedback=document.getElementById("error-review-feedback");
    if(copy)copy.textContent=value;
    if(feedback)feedback.hidden=false;
    const resultActions=document.getElementById("error-review-result-actions");
    if(resultActions)resultActions.hidden=false;
    if(textarea)textarea.disabled=true;
    const confirm=document.getElementById("error-review-confirm-answer");
    if(confirm){confirm.disabled=true;confirm.textContent="Resposta confirmada"}
    setStatus("Resposta mantida apenas nesta tela. Marque se acertou ou errou.","success");
  });

  document.getElementById("error-review-correct")?.addEventListener("click",()=>finishReview(true));
  document.getElementById("error-review-wrong")?.addEventListener("click",()=>finishReview(false));
  document.getElementById("error-review-understood")?.addEventListener("click",markUnderstood);
}

async function init(){
  reviewUser=window.docmapUser;reviewSb=window.supabaseClient||reviewSb;
  if(!reviewSb||!reviewUser){setTimeout(init,250);return}
  if(document.documentElement.dataset.errorReviewReady==="1")return;
  document.documentElement.dataset.errorReviewReady="1";
  setScopeTitle();wire();await loadItems();
}
if(window.docmapUser)init();else window.addEventListener("docmap:ready",init,{once:true});
