/* Missão guiada diária: restaura progresso do dia e só credita etapas concluídas. */
(() => {
 "use strict";
 const PLAN="luria:guided-study-plan",PROGRESS="luria:guided-study-progress",
       ACTIVE="luria:guided-study-active",COMPLETE="luria:guided-study-step-complete";
 const read=(store,key)=>{try{return JSON.parse(store.getItem(key)||"null")}catch{return null}};
 const today=()=>new Date().toLocaleDateString("sv-SE");
 const owner=()=>String(window.docmapUser?.id||"");
 const dailyKey=()=>owner()?"luria:guided-study-daily:"+owner()+":"+today():null;
 const valid=plan=>!!plan?.createdAt&&Array.isArray(plan.steps)&&plan.steps.length===3
     &&(plan.day||new Date(plan.createdAt).toLocaleDateString("sv-SE"))===today()
     &&(!plan.ownerId||!owner()||plan.ownerId===owner());
 const clearOld=()=>{[PLAN,PROGRESS,ACTIVE,COMPLETE].forEach(key=>sessionStorage.removeItem(key));localStorage.removeItem("luria:guided-timer")};
 const restore=()=>{
  try{
   let plan=read(sessionStorage,PLAN),key=dailyKey(),record=key?read(localStorage,key):null;
   if(!valid(plan)){
    clearOld();
    plan=valid(record?.plan)?record.plan:null;
    if(plan)sessionStorage.setItem(PLAN,JSON.stringify(plan));
   }
   if(!plan)return;
   const localProgress=record?.progress?.createdAt===plan.createdAt?record.progress:null;
   const tabProgress=read(sessionStorage,PROGRESS);
   const localDone=Number(localProgress?.completedThrough??-1),tabDone=Number(tabProgress?.completedThrough??-1);
   if(localProgress&&(!tabProgress||tabProgress.createdAt!==plan.createdAt||localDone>tabDone))
     sessionStorage.setItem(PROGRESS,JSON.stringify(localProgress));
  }catch(error){console.warn("LURIA: não consegui restaurar o estudo do dia.",error)}
 };
 const save=()=>{
  try{
   const key=dailyKey(),plan=read(sessionStorage,PLAN);if(!key||!valid(plan))return;
   const last=read(localStorage,key),tab=read(sessionStorage,PROGRESS);
   const latest=last?.progress?.createdAt===plan.createdAt?last.progress:null;
   const doneTab=tab?.createdAt===plan.createdAt?Number(tab.completedThrough??-1):-1;
   const doneLocal=Number(latest?.completedThrough??-1);
   const progress=doneTab>=doneLocal?(tab?.createdAt===plan.createdAt?tab:null):latest;
   localStorage.setItem(key,JSON.stringify({plan,progress}));
  }catch(error){console.warn("LURIA: não consegui guardar o progresso diário.",error)}
 };
 const enhance=()=>{
  const plan=read(sessionStorage,PLAN);if(!valid(plan))return;
  const steps=plan.steps,progress=read(sessionStorage,PROGRESS);
  const completed=progress?.createdAt===plan.createdAt?Number(progress.completedThrough??-1):-1;
  const active=read(sessionStorage,ACTIVE),next=completed+1;
  // Uma simples navegação nunca conclui uma etapa: a pessoa confirma a leitura ao retornar.
  if(next===0&&active?.plan?.createdAt===plan.createdAt&&active.activeIndex===0
     &&["/apostilas/","/caderno/"].some(prefix=>String(steps[0]?.href||"").startsWith(prefix))){
   const card=document.querySelector('.study-session-card.is-current .study-session-card-footer');
   if(card&&!card.querySelector("[data-confirm-material]")){
    const button=document.createElement("button");button.type="button";
    button.className="study-session-start";button.dataset.confirmMaterial="1";
    button.textContent="Concluí o estudo";
    button.addEventListener("click",()=>{
     const current=read(sessionStorage,ACTIVE);
     if(!valid(current?.plan)||current.plan.createdAt!==plan.createdAt||current.activeIndex!==0)return;
     if(!window.LuriaGuidedStudy?.completeActiveStep?.("material-reviewed")){
      sessionStorage.setItem(COMPLETE,JSON.stringify({createdAt:plan.createdAt,activeIndex:0,source:"material-reviewed",completedAt:Date.now()}));
     }
     location.reload();
    });
    card.append(button);
   }
  }
  if(completed===steps.length-1){
   const finale=document.getElementById("study-session-finale");
   if(finale&&!finale.querySelector("[data-study-next]")){
    const nav=document.createElement("div");nav.dataset.studyNext="1";
    nav.style.cssText="display:flex;justify-content:center;gap:10px;flex-wrap:wrap;margin-top:16px";
    const flash=document.createElement("a");flash.href="/flashcards/";flash.className="study-session-start";flash.textContent="Revisar flashcards";
    const home=document.createElement("a");home.href="/dashboard/";home.className="study-session-start";home.textContent="Voltar ao Dashboard";
    nav.append(flash,home);finale.append(nav);
   }
  }
 };
 restore();
 document.addEventListener("DOMContentLoaded",()=>{save();enhance()});
 window.addEventListener("pageshow",()=>{save();enhance()});
 window.addEventListener("pagehide",save);
 document.addEventListener("visibilitychange",()=>{if(document.visibilityState==="visible"){if(read(sessionStorage,PLAN)&&!valid(read(sessionStorage,PLAN))){restore();location.reload();return}save()}});
})();
