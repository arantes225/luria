(() => {
  "use strict";
  const engine=window.LuriaVocacaoEngine;
  if(!engine||!engine.selectAdaptive||!engine.catalogue) {
    console.error("LURIA Vocação: avaliação indisponível.");
    return;
  }
  const $=id=>document.getElementById(id);
  const intro=$("voc-intro"),quiz=$("voc-quiz"),results=$("voc-results"),choices=$("voc-options");
  const storageKey="luria.vocacao.v3.session";
  let sequence=engine.core.map(q=>q.id);
  let answers={}, current=0, finish=false;
  const html=value=>String(value??"").replace(/[&<>"']/g,char=>({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
  }[char]));
  const label=tag=>(engine.labels[tag]||[tag])[0];
  const description=tag=>(engine.labels[tag]||["",tag])[1];
  const readable=values=>{
    const parts=values.filter(Boolean);
    return parts.length<=1?(parts[0]||""):parts.slice(0,-1).join(", ")+" e "+parts[parts.length-1];
  };
  const percent=n=>Math.min(100,Math.round(n/engine.total*100));
  function validSaved(s) {
    if(!s||typeof s!=="object"||!Array.isArray(s.sequence)||typeof s.answers!=="object")return false;
    const ids=s.sequence, base=engine.core.map(q=>q.id);
    if(ids.length!==base.length&&ids.length!==engine.total)return false;
    if(!base.every((id,i)=>ids[i]===id))return false;
    if(ids.length===engine.total){
      try{engine.createSequence(s.answers,ids.slice(base.length,base.length+engine.DEEP_COUNT));}
      catch(_){return false;}
    }
    if(new Set(ids).size!==ids.length)return false;
    if(Object.entries(s.answers).some(([id,v])=>!ids.includes(id)||!engine.validResponse(v)))return false;
    if(!Number.isInteger(s.current)||s.current<0||s.current>=ids.length)return false;
    return typeof s.finish==="boolean";
  }
  function restore(){
    try {
      const saved=JSON.parse(sessionStorage.getItem(storageKey)||"null");
      if(!validSaved(saved))return false;
      sequence=saved.sequence;
      answers=saved.answers;
      current=saved.current;
      finish=saved.finish;
      return true;
    }catch(_){return false;}
  }
  function save(){
    try{sessionStorage.setItem(storageKey,JSON.stringify({sequence,answers,current,finish}));}
    catch(_){}
  }
  function stage(value){
    intro.hidden=value!=="intro";
    quiz.hidden=value!=="quiz";
    results.hidden=value!=="results";
  }
  function currentQuestion(){
    return engine.questionIndex.get(sequence[current]);
  }
  function phase(index=current) {
    if(index<engine.core.length)return ["ETAPA 1 DE 3 · SUA PRÁTICA","Entender preferências e estilo de trabalho"];
    if(index<engine.core.length+engine.DEEP_COUNT)return ["ETAPA 2 DE 3 · APROFUNDAMENTO","Questões selecionadas pelo seu perfil inicial"];
    return ["ETAPA 3 DE 3 · AJUSTE FINO","Prioridades reais e limites de rotina"];
  }
  function renderQuestion(){
    const q=currentQuestion();
    if(!q){stage("intro");return;}
    const selected=answers[q.id]||null;
    const [section,subtitle]=phase();
    $("voc-dimension").textContent=section;
    $("voc-question").textContent=q.text;
    $("voc-count").textContent=(current+1)+" / "+engine.total;
    $("voc-progress").setAttribute("aria-valuemax",String(engine.total));
    $("voc-progress").setAttribute("aria-valuenow",String(current+1));
    $("voc-progress-fill").style.width=percent(current+1)+"%";
    $("voc-context").textContent=q.context+" "+subtitle+".";
    $("voc-back").disabled=current===0;
    $("voc-next").disabled=!selected;
    $("voc-next").textContent=current===engine.total-1?"Gerar relatório personalizado →":"Continuar →";
    $("voc-error").textContent="";
    choices.innerHTML=q.options.map((o,i)=>{
      const main=selected?.first===i,secondary=selected?.second===i;
      return '<div class="voc-choice"><button type="button" class="voc-option" data-value="'+i+'" aria-pressed="'+main+'">'+
        '<strong class="voc-option-letter" aria-hidden="true">'+String.fromCharCode(65+i)+'</strong><span>'+html(o.label)+'</span>'+
        '<span class="voc-choice-state">'+(main?'Preferência principal':secondary?'Segunda preferência':'')+'</span></button>'+
        '<button type="button" class="voc-secondary" data-value="'+i+'" aria-pressed="'+secondary+'"'+
        (!selected||selected.first===-1||main?' disabled':'')+'>'+(secondary?'✓ Também escolheria':'Também consideraria')+'</button></div>';
    }).join("");
    $("voc-none").setAttribute("aria-pressed",String(selected?.first===-1));
    $("voc-unfamiliar").checked=!!selected?.unfamiliar;
    choices.querySelectorAll(".voc-option").forEach(btn=>btn.addEventListener("click",()=>{
      const first=Number(btn.dataset.value);
      const old=answers[q.id];
      answers[q.id]={first,second:old?.second===first?null:(old?.second??null),unfamiliar:$("voc-unfamiliar").checked};
      save();renderQuestion();
    }));
    choices.querySelectorAll(".voc-secondary").forEach(btn=>btn.addEventListener("click",()=>{
      const second=Number(btn.dataset.value),old=answers[q.id];
      if(!old||old.first<0||old.first===second)return;
      answers[q.id]={...old,second:old.second===second?null:second};
      save();renderQuestion();
    }));
  }
  function showQuiz(focus=true){
    stage("quiz");renderQuestion();
    if(focus) {
      $("voc-question").focus({preventScroll:true});
      quiz.scrollIntoView({block:"start",behavior:"smooth"});
    }
  }
  function adapt(){
    const desired=engine.selectAdaptive(answers);
    const old=sequence.slice(engine.core.length,engine.core.length+engine.DEEP_COUNT);
    const changed=desired.some((id,i)=>id!==old[i])||old.length!==desired.length;
    if(changed) {
      const keep=new Set([...engine.core.map(q=>q.id),...desired,...engine.end.map(q=>q.id)]);
      answers=Object.fromEntries(Object.entries(answers).filter(([id])=>keep.has(id)));
      // Respostas de aprofundamento permanecem apenas quando a pergunta ainda está na trilha.
      sequence=engine.createSequence(answers,desired);
    }
  }
  function next(){
    if(!engine.validResponse(answers[currentQuestion().id])){
      $("voc-error").textContent="Escolha uma preferência ou a opção 'ainda não sei' para continuar.";
      return;
    }
    if(current===engine.core.length-1)adapt();
    if(current===sequence.length-1&&sequence.length===engine.total){
      try{renderResults();}catch(error){$("voc-error").textContent="Não foi possível concluir a análise. Revise suas respostas.";console.error(error);}
      return;
    }
    current=Math.min(current+1,sequence.length-1);
    finish=false;save();showQuiz();
  }
  function sections(title,body){
    return '<section class="voc-report-section"><h3>'+html(title)+'</h3>'+body+'</section>';
  }
  function chosenSamples(ids,max=3){
    return ids.map(id=>{
      const q=engine.questionIndex.get(id);
      const a=answers[id];
      return q&&a?.first>=0?{q,text:q.options[a.first].label}:null;
    }).filter(Boolean).slice(0,max);
  }
  function scoreGroups(report,tags){
    return tags.slice().sort((a,b)=>(report.scores[b]||0)-(report.scores[a]||0));
  }
  function produceNarrative(report,tags){
    const values=scoreGroups(report,tags).filter(t=>report.scores[t]>.06).slice(0,3);
    return values.length?readable(values.map(label)).toLowerCase():"preferências variadas, sem um padrão dominante";
  }
  function renderResults(){
    const report=engine.calculate(answers,sequence);
    const chosen=report.ordered.slice(0,5);
    const diagnostic=produceNarrative(report,["diagnosis","complex","clinical","research","precision"]);
    const procedural=produceNarrative(report,["hands","surgery","technology","visual","function"]);
    const routine=produceNarrative(report,["acute","highstakes","predictable","followup","team"]);
    const people=produceNarrative(report,["kids","women","elderly","mental","people","community"]);
    const weak=report.frictions.slice(0,3);
    const samples=chosenSamples(sequence,3).map(s=>'<li><strong>'+html(s.q.group)+':</strong> '+html(s.text)+'</li>').join("");
    const less=report.skipped||report.inexperienced?
      'Em '+report.inexperienced+' pergunta(s), você marcou que ainda não teve experiência prática; '+report.skipped+
      ' ficaram sem preferência. Isso reduz a segurança de interpretações mais específicas.':"Você conseguiu expressar uma preferência em todas as etapas.";
    const top=report.top.map((s,i)=>{
      const aff=s.strengths.filter(t=>report.scores[t]>.03).slice(0,3);
      const fric=s.frictions.slice(0,2);
      const why=s.evidence.length?
        '<ul class="voc-evidence">'+s.evidence.map(e=>
          '<li><strong>'+html(e.section)+':</strong> “'+html(e.choice)+'”</li>').join("")+'</ul>':
        '<p>Suas respostas gerais sugerem esse caminho, mas faltaram exemplos específicos desta prática.</p>';
      const friction=fric.length?
        'O teste mostrou menos preferência por '+html(readable(fric.map(label)).toLowerCase())+
          '. Vale verificar como isso aparece nos diferentes serviços.':
        'Não apareceu uma resistência clara às atividades gerais desta área. Ainda assim, converse sobre plantões, burocracia e a rotina predominante.';
      return '<article class="voc-match"><div class="voc-match-top"><h3>'+ (i+1)+
        'ª indicação · Residência em '+html(s.name)+'</h3><span class="voc-match-score">Programa de residência</span></div>'+
        '<p><strong>Por que esta residência apareceu:</strong> seus interesses por '+
          html(readable((aff.length?aff:s.strengths).map(label)).toLowerCase())+
          ' se aproximam de atividades associadas à formação nesta residência.</p>'+
        '<p><strong>O que você respondeu que sustenta essa hipótese:</strong></p>'+why+
        '<p><strong>Possível atrito com a rotina:</strong> '+friction+'</p>'+
        '<p><strong>Ingresso na residência:</strong> '+(s.entry==="Acesso direto"?
          'Acesso direto (R1), após a graduação.':
          'Com pré-requisito: residência prévia em '+html(s.prerequisite)+'.')+
          ' Confirme os requisitos e a duração no edital vigente.</p>'+
        '<p><strong>Como conferir na prática:</strong> acompanhe um turno comum do programa, converse com residentes sobre atividades repetitivas e registre o que voltaria a fazer.</p></article>';
    }).join("");
    const difference=report.top.length>=2?
      '<p>As hipóteses se diferenciam principalmente pelo tipo de atividade. '+
      html(report.top.map(s=>s.name+': '+readable(s.strengths.slice(0,2).map(label)).toLowerCase()).join(" • "))+
      '. Explore essas diferenças no serviço, não apenas no conteúdo teórico.</p>':"";
    const uncertain=report.close?'<p><strong>Empate prático:</strong> as primeiras hipóteses tiveram sinais próximos neste modelo exploratório. Não há base para afirmar que a primeira seja superior à segunda.</p>':'';
    const headline=chosen.length?
      'Você se interessou por '+html(readable(chosen.slice(0,3).map(label)).toLowerCase())+
      '. Essa combinação descreve preferências de trabalho, não um tipo fixo de personalidade.':
      'Suas escolhas ficaram distribuídas entre várias formas de exercer a Medicina. É mais útil vivenciar os cenários do que assumir uma conclusão agora.';
    results.innerHTML=
      '<p class="voc-kicker">MAPA DE RESIDÊNCIAS · RESULTADO PERSONALIZADO</p>'+
      '<h2 id="voc-results-title">O que realmente pesa na sua escolha</h2>'+
      '<p class="voc-result-intro">'+headline+'</p>'+
      sections("Seu jeito de raciocinar",'<p>Nas tarefas intelectuais, suas escolhas sugerem interesse em '+html(diagnostic)+
        '. Observe se gosta de investigar hipóteses por muito tempo ou prefere que o raciocínio leve rapidamente a uma ação.</p>')+
      sections("Sua relação com procedimentos e tecnologia",'<p>Nas alternativas práticas, você privilegiou '+html(procedural)+
        '. Isso não mede habilidade manual: mostra o tipo de competência que deseja desenvolver.</p>')+
      sections("O ritmo de trabalho que merece testar",'<p>Em dilemas de rotina, apareceram '+html(routine)+
        '. O mesmo campo pode ter agendas muito diferentes conforme subárea, vínculo e local.</p>')+
      sections("Pessoas e situações de cuidado",'<p>Entre os contextos de assistência, você demonstrou preferência por '+
        html(people)+'. Faixa etária e tipo de vínculo não determinam uma especialidade isoladamente.</p>')+
      sections("Pontos de atenção e incerteza",'<p>'+
        (weak.length?'Você escolheu menos atividades ligadas a '+html(readable(weak.map(label)).toLowerCase())+
        '. Isso não significa falta de aptidão; pode indicar um esforço de rotina a investigar. ':'')+
        html(less)+'</p>')+
      sections("Três exemplos das suas próprias escolhas",samples?'<ul class="voc-evidence">'+samples+'</ul>':
        '<p>Você marcou poucas preferências diretas; considere repetir o teste depois de vivenciar mais estágios.</p>')+
      '<h2 class="voc-top-title">Até três residências médicas para explorar</h2>'+
      '<p class="voc-result-intro">As recomendações incluem apenas residências convencionais da curadoria LURIA, de acesso direto ou com pré-requisito. A ordem representa afinidades editoriais, nunca chance de aprovação, competência ou satisfação.</p>'+
      uncertain+'<div class="voc-match-list">'+top+'</div>'+
      sections("Como diferenciar as residências sugeridas",difference)+
      sections("Plano de validação no mundo real",'<p>Para cada residência sugerida: acompanhe ao menos um dia comum, converse com residentes e especialistas, observe tarefas repetitivas e compare seu bem-estar ao final do turno. Refaça a avaliação após novas experiências; a ordem pode mudar.</p>')+
      '<p class="voc-result-intro"><strong>Limitações:</strong> avaliação exploratória da LURIA; não é teste psicométrico validado nem prevê aprovação. A inclusão no catálogo não garante vagas em todas as instituições ou anos. Confira os editais e a CNRM.</p>'+
      '<div class="voc-actions"><button id="voc-restart" class="voc-button voc-button-primary" type="button">Refazer desde o início</button>'+
      '<button id="voc-review" class="voc-button voc-button-secondary" type="button">Revisar respostas</button>'+
      '<a class="voc-button voc-button-secondary" href="/aplicar/">Voltar ao Aplicar</a></div>';
    finish=true;stage("results");save();
    results.scrollIntoView({block:"start",behavior:"smooth"});
    $("voc-restart").addEventListener("click",reset);
    $("voc-review").addEventListener("click",()=>{current=0;finish=false;save();showQuiz();});
  }
  function reset(){
    answers={};current=0;finish=false;sequence=engine.core.map(q=>q.id);
    try{sessionStorage.removeItem(storageKey);}catch(_){}
    showQuiz();
  }
  function renderCatalogue(){
    const query=($("voc-search").value||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim();
    const items=engine.catalogue.residencies.filter(x=>
      (x.name+" "+x.prerequisite+" "+x.entry).normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().includes(query))
      .sort((a,b)=>a.name.localeCompare(b.name,"pt-BR"));
    $("voc-catalog-count").textContent=items.length+" resultado(s) no catálogo";
    $("voc-catalog-items").innerHTML=items.length?items.map(x=>
      '<article class="voc-catalog-item"><strong>'+html(x.name)+'</strong><span>'+
      'Residência médica · '+x.entry+
      '</span><small>'+(x.entry==="Acesso direto"?"Ingresso após a graduação":"Pré-requisito: "+html(x.prerequisite))+'</small></article>').join(""):
      '<p>Nenhum item encontrado. Tente outro termo.</p>';
  }
  $("voc-start").addEventListener("click",()=>{current=0;finish=false;save();showQuiz();});
  $("voc-back").addEventListener("click",()=>{if(current>0){current--;finish=false;save();showQuiz();}});
  $("voc-next").addEventListener("click",next);
  $("voc-none").addEventListener("click",()=>{
    const id=currentQuestion().id,old=answers[id];
    answers[id]={first:-1,second:null,unfamiliar:$("voc-unfamiliar").checked};
    save();renderQuestion();
  });
  $("voc-unfamiliar").addEventListener("change",()=>{
    const id=currentQuestion().id,old=answers[id];
    if(old){answers[id]={...old,unfamiliar:$("voc-unfamiliar").checked};save();}
  });
  $("voc-search").addEventListener("input",renderCatalogue);
  $("voc-catalogue").addEventListener("toggle",()=>{if($("voc-catalogue").open)renderCatalogue();});
  document.addEventListener("keydown",event=>{
    if(quiz.hidden||event.altKey||event.metaKey||event.ctrlKey||
      ["INPUT","TEXTAREA","SELECT"].includes(document.activeElement?.tagName))return;
    if(/^[1-4]$/.test(event.key)&&document.activeElement?.tagName!=="BUTTON"){
      const target=choices.querySelectorAll(".voc-option")[Number(event.key)-1];
      target?.click();
    } else if(event.key==="Enter"&&document.activeElement?.tagName!=="BUTTON")next();
  });
  if(restore()){
    if(finish&&sequence.length===engine.total){try{renderResults();}catch(_){finish=false;showQuiz(false);}}
    else showQuiz(false);
  } else stage("intro");
})();
