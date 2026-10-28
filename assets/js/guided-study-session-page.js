(function(){
    const esc=value=>String(value??"").replace(/[&<>"']/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[char]));
    function render(){
      let plan=null;
      try{plan=JSON.parse(sessionStorage.getItem("luria:guided-study-plan")||"null")}catch{}
      const steps=(Array.isArray(plan?.steps)?plan.steps:[]).slice(0,3);
      const list=document.getElementById("study-session-list");
      const progress=document.getElementById("study-session-progress");
      const banner=document.getElementById("study-session-banner");
      const finale=document.getElementById("study-session-finale");
      const minutes=document.getElementById("study-session-minutes");
      const xp=document.getElementById("study-session-xp");
      const count=document.getElementById("study-session-count");
      const fill=document.getElementById("study-session-track-fill");
      const mascot=document.getElementById("study-session-mascot");
      const mascotImg=document.getElementById("study-session-mascot-img");
      const journeyCopy=document.getElementById("study-session-journey-copy");
      const progressPercent=document.getElementById("study-session-progress-percent");
      const isReview=plan?.mode==="review"||String(steps[0]?.href||"").startsWith("/professor-alex/?mode=feynman");
      const missionTitle=document.querySelector(".mission-board h2");
      const missionCopy=document.querySelector(".mission-board-copy");
      const diagnosticBox=document.getElementById("study-session-diagnostic");
      if(missionTitle)missionTitle.textContent=isReview?"Primeiro, descubra o que lembra.":"Aprender. Praticar. Ensinar.";
      if(missionCopy)missionCopy.textContent=isReview
        ?"Explique o assunto sem consultar. O Alex mostrará suas lacunas para orientar a revisão e as questões do dia."
        :"Estude o conteúdo, pratique e depois ensine ao Alex pelo método Feynman. O XP depende da conclusão de cada etapa.";
      if(minutes)minutes.textContent=(Number(plan?.minutes)||0)+" min";
      const theme=document.documentElement.dataset.theme||"light";
      if(mascotImg){
        mascotImg.src=theme==="dark"
          ? "/assets/img/pulo do gato/luria_gato_tema_escuro.webp"
          : (["leila-mood","pink","rosa"].includes(theme)
            ? "/assets/img/pulo do gato/luria_gato_tema_rosa.webp"
            : "/assets/img/pulo do gato/luria_gato_tema_claro.webp");
      }

      if(!steps.length){
        list.innerHTML='<div class="panel"><p style="margin:0;color:var(--muted)">Não encontrei uma sessão ativa. Volte ao Dashboard e toque em Estudar agora.</p></div>';
        progress.innerHTML="";
        return;
      }

      let completedThrough=-1;
      try{
        const saved=JSON.parse(sessionStorage.getItem("luria:guided-study-progress")||"null");
        if(saved?.createdAt===plan?.createdAt)completedThrough=Number(saved.completedThrough??-1);
        const active=JSON.parse(sessionStorage.getItem("luria:guided-study-active")||"null");
        const completion=JSON.parse(sessionStorage.getItem("luria:guided-study-step-complete")||"null");
        if(
          active?.plan?.createdAt===plan?.createdAt
          && Number.isInteger(active.activeIndex)
          && completion?.createdAt===plan?.createdAt
          && Number(completion.activeIndex)===active.activeIndex
        ){
          completedThrough=Math.max(completedThrough,active.activeIndex);
          sessionStorage.setItem("luria:guided-study-progress",JSON.stringify({createdAt:plan.createdAt,completedThrough}));
          sessionStorage.removeItem("luria:guided-study-active");
          sessionStorage.removeItem("luria:guided-study-step-complete");
          if(banner){
            const reward=active.activeIndex===2?30:20;
            banner.innerHTML='<div><strong>Etapa '+(active.activeIndex+1)+' vencida · +'+reward+' XP</strong><small>Atividade concluída por inteiro. Seu progresso avançou na trilha.</small></div><span>✓</span>';
            banner.classList.add("is-visible");
          }
        }
      }catch{}

      if(diagnosticBox){
        let diagnostic=null;
        try{diagnostic=JSON.parse(sessionStorage.getItem("luria:guided-study-diagnostic")||"null")}catch{}
        const validReport=isReview&&completedThrough>=0&&diagnostic?.createdAt===plan?.createdAt;
        diagnosticBox.hidden=!validReport;
        if(validReport){
          const gaps=[...(Array.isArray(diagnostic.gaps)?diagnostic.gaps:[]),...(Array.isArray(diagnostic.errors)?diagnostic.errors:[])]
            .filter(item=>typeof item==="string"&&item.trim()).slice(0,4);
          const suggestions=Array.isArray(diagnostic.next_steps)?diagnostic.next_steps.filter(item=>typeof item==="string"&&item.trim()).slice(0,2):[];
          diagnosticBox.innerHTML='<h3>Diagnóstico Feynman · Onde focar sua revisão</h3>'
           +'<p>O Alex identificou os pontos abaixo na sua explicação inicial. Comece por eles antes de resolver as questões.</p>'
           +(gaps.length?'<ul>'+gaps.map(item=>'<li>'+esc(item)+'</li>').join("")+'</ul>':'<p>Nenhuma lacuna específica foi identificada na explicação. Continue com o material e as questões.</p>')
           +(suggestions.length?'<small>Próximos passos sugeridos: '+esc(suggestions.join(" · "))+'</small>':"");
        }
      }

      const currentIndex=Math.min(steps.length-1,completedThrough+1);
      const completedCount=Math.max(0,Math.min(steps.length,completedThrough+1));
      const xpValue=[0,20,40,70][completedCount]||0;
      if(xp)xp.textContent=xpValue+" XP";
      if(count)count.textContent=completedCount+"/3";
      const pct=[0,33,67,100][completedCount]||0;
      if(fill)fill.style.width=pct+"%";
      if(progressPercent)progressPercent.textContent=pct+"% concluído";
      if(mascot){
        const left=completedCount===0?"0%":completedCount===1?"31%":completedCount===2?"64%":"calc(100% - 62px)";
        mascot.style.left=left;
      }
      if(journeyCopy)journeyCopy.textContent=completedCount===0?"Comece pela primeira etapa.":completedCount===1?"Primeira etapa vencida. Continue.":completedCount===2?"Só falta uma etapa para fechar a missão.":"Missão concluída.";
      progress.innerHTML=[0,1,2,3].map(index=>{
        if(index===3){
          const finish=completedThrough>=steps.length-1;
          return '<div class="mission-point is-finish '+(finish?"is-done":"")+'"><span class="mission-point-dot">'+(finish?"✓":"★")+'</span><small>Chegada</small></div>';
        }
        const state=index<=completedThrough?" is-done":index===currentIndex?" is-current":"";
        const label=index<=completedThrough?"Concluída":index===currentIndex?"Agora":"Depois";
        return '<div class="mission-point'+state+'"><span class="mission-point-dot">'+(index<=completedThrough?"✓":(index+1))+'</span><small>'+label+'</small></div>';
      }).join("");

      const iconFor=(title)=>{
        const value=String(title||"").toLowerCase();
        if(value.includes("flash"))return '<svg viewBox="0 0 24 24"><path d="M6 4h12v16H6z"/><path d="M9 8h6M9 12h6M9 16h4"/></svg>';
        if(value.includes("quest"))return '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M9.8 9a2.3 2.3 0 1 1 3.6 1.9c-.9.6-1.4 1.1-1.4 2.1M12 16.5h.01"/></svg>';
        if(value.includes("erro"))return '<svg viewBox="0 0 24 24"><path d="M12 3 2.8 19h18.4L12 3Z"/><path d="M12 9v4M12 16.5h.01"/></svg>';
        return '<svg viewBox="0 0 24 24"><path d="M5 4h14v16H5z"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>';
      };
      list.innerHTML=steps.map((step,index)=>{
        const done=index<=completedThrough,current=index===currentIndex,locked=index>currentIndex;
        const cls=done?" is-done":current?" is-current":locked?" is-locked":"";
        const reward=index===2?30:20;
        let activeStep=null;
        try{activeStep=JSON.parse(sessionStorage.getItem("luria:guided-study-active")||"null")}catch{}
        const inProgress=current&&activeStep?.plan?.createdAt===plan?.createdAt&&Number(activeStep.activeIndex)===index;
        const footer=done
          ? '<span class="study-session-status">Concluída</span>'
          : current
            ? '<button class="study-session-start" type="button" data-session-index="'+index+'">'+(inProgress?"Continuar":"Começar")+' <span>→</span></button>'
            : '<span class="study-session-status">Bloqueada</span>';
        return '<article class="study-session-card'+cls+'"><div class="study-session-card-top"><span class="study-session-card-icon">'+iconFor(step.title)+'</span><span class="study-session-step-label">Etapa '+(index+1)+'</span></div><h3>'+esc(step.title||"Atividade")+'</h3><p>'+esc(step.detail||"Atividade planejada")+'</p><div class="study-session-card-footer"><div class="study-session-card-meta"><span>'+(Number(step.min)||0)+' min</span><span class="study-session-xp-chip">+'+reward+' XP</span></div>'+footer+'</div></article>';
      }).join("");

      if(completedThrough>=steps.length-1){
        const finalTitle=document.getElementById("study-session-finale-title");
        const finalCopy=document.getElementById("study-session-finale-copy");
        if(finalTitle)finalTitle.textContent=isReview?"Revisão concluída":"Sessão vencida";
        if(finalCopy)finalCopy.textContent=isReview?"Você começou explicando o que lembrava, revisou suas lacunas e praticou questões.":"Você concluiu as três etapas planejadas para hoje.";
        list.hidden=true;
        finale.classList.add("is-visible");
        try{localStorage.removeItem("luria:guided-timer")}catch{}
      }

      list.querySelectorAll("[data-session-index]").forEach(button=>button.addEventListener("click",()=>{
        const index=Number(button.dataset.sessionIndex);
        if(index!==currentIndex)return;
        const step=steps[index];
        if(!step?.href)return;
        try{
          const existing=JSON.parse(localStorage.getItem("luria:guided-timer")||"null");
          if(!existing?.active){
            const totalMinutes=Math.max(1,Number(plan?.minutes)||Number(step.min)||1);
            localStorage.setItem("luria:guided-timer",JSON.stringify({startedAt:Date.now(),durationSeconds:Math.round(totalMinutes*60),title:step.title||"Sessão de estudo",active:true}));
          }
          sessionStorage.setItem("luria:guided-study-active",JSON.stringify({plan,activeIndex:index}));
        }catch{}
        location.href=step.href;
      }));
    }
    if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",render);else render();
    window.addEventListener("pageshow",render);
  })();
