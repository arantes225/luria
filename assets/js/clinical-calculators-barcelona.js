/* TRAUBE | Calculadora de crescimento fetal — protocolo Barcelona.
 * Referência: BCNatal, Protocolo Defectos del Crecimiento Fetal (2024),
 * Figueras & Gratacós, Fetal Diagn Ther 2014;36:86-98.
 * O percentil deve ser fornecido por curva obstétrica validada. Não há
 * interpolação de tabelas proprietárias nem recomendação automática de parto.
 */
(() => {
  "use strict";
  const SOURCE = "https://fetalmedicinebarcelona.org/calc/";
  const PROTOCOL = "https://crecimientofetal.cl/img/1PROTOCOLO_BARCELONA_2024.pdf";
  const ARTICLE = "https://pubmed.ncbi.nlm.nih.gov/24457811/";
  const has = (v,k) => String(v[k] == null ? "" : v[k]).trim() !== "";
  const number = (v,k) => has(v,k) ? Number(v[k]) : null;
  const fmt = (n,d=2) => Number(n).toLocaleString("pt-BR",{maximumFractionDigits:d});
  const valid = (n,min,max) => n === null || (Number.isFinite(n) && n>=min && n<=max);
  const text = v => String(v == null ? "" : v).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));

  function hadlock(bpdMm,hcMm,acMm,flMm) {
    const inputs=[bpdMm,hcMm,acMm,flMm].map(Number);
    if(inputs.some((n,i)=>!Number.isFinite(n)||n<([20,80,80,10][i])||n>([125,450,450,95][i]))) {
      throw Error("Biometrias fora de faixas plausíveis: confira os valores em milímetros.");
    }
    const [bpd,hc,ac,fl]=inputs.map(n=>n/10);
    const log=1.3596+0.0064*hc+0.0424*ac+0.174*fl+0.00061*bpd*ac-0.00386*ac*fl;
    return Math.pow(10,log);
  }
  function hadlockAcFl(acMm,flMm) {
    const ac=Number(acMm),fl=Number(flMm);
    if(!valid(ac,80,450)||!valid(fl,10,95)||!Number.isFinite(ac)||!Number.isFinite(fl)) {
      throw Error("Confira perímetro abdominal e fêmur em milímetros.");
    }
    const a=ac/10,f=fl/10;
    return Math.pow(10,1.304+0.05281*a+0.1938*f-0.004*a*f);
  }
  function classify(v) {
    const w=number(v,"weeks"),d=number(v,"days"),p=number(v,"pct");
    if(!Number.isInteger(w)||w<20||w>42||!Number.isInteger(d)||d<0||d>6) throw Error("Idade gestacional: informe 20 a 42 semanas e 0 a 6 dias.");
    const percentiles=["pct","uaPct","mcaPct","cprPct","utaPct","dvPct"];
    for(const key of percentiles) if(!valid(number(v,key),0,100)) throw Error("Percentis precisam estar entre 0 e 100.");
    const positive=["pfe","uaPi","mcaPi","utaR","utaL","dvPi"];
    for(const key of positive) if(!valid(number(v,key),0.01,key==="pfe"?6000:10)) throw Error("Confira o valor informado em "+key+".");
    const uaPi=number(v,"uaPi"), mcaPi=number(v,"mcaPi");
    const utaR=number(v,"utaR"),utaL=number(v,"utaL");
    const cpr=uaPi!==null&&mcaPi!==null?mcaPi/uaPi:null;
    const utaMean=utaR!==null&&utaL!==null?(utaR+utaL)/2:null;
    const stv=number(v,"stv");
    if(!valid(stv,0.1,30)) throw Error("Variabilidade de curto prazo (STV) inválida.");
    const ga=w+d/7;
    const ctgAbnormal=v.ctg==="patologica" || (stv!==null&&ga>=26&&(ga<29?stv<2.6:stv<3));
    const percentileMissing=p===null;
    const abnormalLow=(number(v,"cprPct")!==null&&number(v,"cprPct")<5) ||
      (number(v,"mcaPct")!==null&&number(v,"mcaPct")<5);
    const abnormalHigh=(number(v,"uaPct")!==null&&number(v,"uaPct")>95) ||
      (number(v,"utaPct")!==null&&number(v,"utaPct")>95);
    const severeUA=v.uaFlow==="ausente"||v.uaFlow==="reverso";
    const severeDV=v.dvFlow==="ausente"||v.dvFlow==="reverso"||(number(v,"dvPct")!==null&&number(v,"dvPct")>95);
    const redFlag=severeUA||severeDV||ctgAbnormal;
    const reasons=[],warnings=[];
    let code="incompleto",label="Percentil de crescimento não informado",interval=null,repeatRequired=false;
    if(percentileMissing) {
      warnings.push("Informe o percentil de peso obtido de curva validada para a idade gestacional. O peso isolado não determina o percentil.");
    } else if(p>=10) {
      code="nao-pequeno";label="PFE ≥ percentil 10";
      if(redFlag||abnormalLow||abnormalHigh) warnings.push("Existem achados Doppler/CTG anormais que exigem avaliação, mesmo com peso ≥p10. Não atribuir estágio de RCF por este algoritmo.");
    } else if(v.dvFlow==="reverso"||ctgAbnormal) {
      code="iv";label="RCF — estágio IV";interval="Acompanhamento no protocolo: 12–48 horas; requer avaliação especializada imediata.";
      reasons.push(v.dvFlow==="reverso"?"Onda a reversa no ducto venoso.":"Cardiotocografia patológica ou STV abaixo do limiar gestacional.");
      repeatRequired=v.dvFlow==="reverso"&& !ctgAbnormal;
    } else if(v.uaFlow==="reverso"||v.dvFlow==="ausente"||(number(v,"dvPct")!==null&&number(v,"dvPct")>95)) {
      code="iii";label="RCF — estágio III";interval="Acompanhamento no protocolo: 24–48 horas; requer avaliação especializada imediata.";
      if(v.uaFlow==="reverso")reasons.push("Diástole reversa na artéria umbilical.");
      if(v.dvFlow==="ausente")reasons.push("Onda a ausente no ducto venoso.");
      if(number(v,"dvPct")!==null&&number(v,"dvPct")>95)reasons.push("IP do ducto venoso acima do p95.");
      repeatRequired=true;
    } else if(v.uaFlow==="ausente") {
      code="ii";label="RCF — estágio II";interval="Acompanhamento no protocolo: 2–4 dias; avaliação especializada prioritária.";
      reasons.push("Diástole ausente na artéria umbilical.");repeatRequired=true;
    } else if(p<3||abnormalLow||abnormalHigh) {
      code="i";label="RCF — estágio I";interval="Acompanhamento no protocolo: 1–2 semanas.";
      if(p<3)reasons.push("Peso estimado abaixo do p3.");
      if(number(v,"cprPct")!==null&&number(v,"cprPct")<5)reasons.push("RCP abaixo do p5.");
      if(number(v,"mcaPct")!==null&&number(v,"mcaPct")<5)reasons.push("IP da ACM abaixo do p5.");
      if(number(v,"uaPct")!==null&&number(v,"uaPct")>95)reasons.push("IP da artéria umbilical acima do p95.");
      if(number(v,"utaPct")!==null&&number(v,"utaPct")>95)reasons.push("IP uterino médio acima do p95.");
      repeatRequired=abnormalLow;
    } else {
      const complete=v.uaFlow==="presente"&&["uaPct","mcaPct","cprPct","utaPct"].every(k=>number(v,k)!==null);
      if(complete) {
        code="peg";label="PIG/PEG — Doppler informado dentro dos limiares do protocolo";
        interval="Acompanhamento no protocolo: a cada 2–3 semanas.";
        reasons.push("PFE entre p3 (inclusive) e p10, sem marcadores Doppler positivos informados.");
      } else {
        code="incompleto";label="Dados de Doppler insuficientes para diferenciar PIG de RCF";
        warnings.push("Para classificar PIG com segurança, informe fluxo da AU e percentis da AU, ACM, RCP e média das uterinas.");
      }
    }
    if(repeatRequired && v.repeated!=="sim") {
      warnings.push("Estadiamento sugerido por achado que requer confirmação seriada no intervalo previsto pelo protocolo; ainda não registrado como confirmado.");
    }
    if(stv!==null && ga<26) warnings.push("Critérios computadorizados de STV usados aqui são aplicáveis a partir de 26 semanas.");
    if(w<24) warnings.push("Antes de 24 semanas, contexto, datação e investigação etiológica exigem avaliação individualizada.");
    if(redFlag && p===null) warnings.push("Doppler/CTG de alto risco informado: avaliação especializada urgente, independentemente da ausência do percentil.");
    if(utaR!==null&&utaL!==null&&number(v,"utaPct")===null) warnings.push("IP uterino médio calculado; seu percentil NÃO foi inferido automaticamente.");
    if(cpr!==null&&number(v,"cprPct")===null) warnings.push("RCP numérica calculada; seu percentil NÃO foi inferido automaticamente.");
    return {code,label,interval,reasons,warnings,cpr,utaMean,repeatRequired,confirmed: !repeatRequired||v.repeated==="sim",weeks:w,days:d,pct:p};
  }

  // Pure exports also make the calculations independently testable.
  window.TraubeBarcelona={hadlock,hadlockAcFl,classify};
  if(typeof C==="undefined"||typeof defs==="undefined"||typeof cats==="undefined"||typeof render!=="function"||typeof openCalc!=="function")return;
  const id="barcelona-fetal-growth";
  if(!C.some(x=>x[4]===id))C.push(["Obstetrícia","BARC","Crescimento Fetal — Barcelona","Peso fetal por Hadlock, Doppler e estadiamento da RCF (Barcelona)",id]);
  defs[id]={fields:[],formula:"Hadlock 1985 (DBP, PC, PA e LF), RCP = IP ACM / IP AU. Estadiamento conforme BCNatal 2024.",reference:PROTOCOL,auditDate:"2026-11-06"};
  if(!cats.includes("Obstetrícia"))cats.push("Obstetrícia");
  const original=openCalc;
  openCalc=function(calculatorId) {
    if(calculatorId!==id)return original(calculatorId);
    show();
  };
  function field(name,label,placeholder,step="any") {
    return '<label class="barc-field"><span>'+text(label)+'</span><input name="'+name+'" type="number" inputmode="decimal" step="'+step+'" placeholder="'+text(placeholder)+'"></label>';
  }
  function select(name,label,options) {
    return '<label class="barc-field"><span>'+text(label)+'</span><select name="'+name+'">'+options.map(o=>'<option value="'+o[0]+'">'+text(o[1])+'</option>').join("")+'</select></label>';
  }
  function show() {
    addRecent(id);
    document.querySelector("#calc-modal-code").textContent="BARC";
    document.querySelector("#calc-modal-heading").textContent="Crescimento Fetal — Barcelona";
    document.querySelector("#calc-modal-subtitle").textContent="Peso fetal, Doppler e restrição de crescimento · Obstetrícia";
    modalBody.innerHTML='<div class="barc-intro"><strong>Ferramenta clínica educacional · Gestação única</strong><p>Para o estadiamento, informe o percentil do peso de uma curva validada (ex.: relatório de ultrassonografia). A Traube não reproduz curvas proprietárias nem calcula automaticamente percentis de Barcelona.</p></div>'+
      '<form class="barc-form" novalidate>'+
      '<fieldset><legend>1 · Idade gestacional e peso fetal</legend><div class="barc-grid">'+
      field("weeks","Semanas completas","ex.: 32","1")+field("days","Dias adicionais (0–6)","ex.: 4","1")+
      field("pfe","Peso fetal estimado (g)","opcional") +field("pct","Percentil do PFE (curva validada)","obrigatório para classificar")+
      '</div><details class="barc-biometry"><summary>Calcular peso fetal por Hadlock (biometrias em mm)</summary><p>Informe DBP, PC, PA e LF para Hadlock de quatro parâmetros, ou somente PA e LF para a fórmula alternativa. O peso será preenchido acima, mas o percentil permanece dependente de curva validada.</p><div class="barc-grid">'+
      field("bpd","Diâmetro biparietal (mm)","DBP")+field("hc","Perímetro cefálico (mm)","PC")+field("ac","Perímetro abdominal (mm)","PA")+field("fl","Comprimento do fêmur (mm)","LF")+
      '</div><button type="button" class="barc-action barc-secondary" data-barc-hadlock>Calcular PFE por Hadlock</button><output class="barc-hadlock-output" aria-live="polite"></output></details></fieldset>'+
      '<fieldset><legend>2 · Dopplervelocimetria</legend><div class="barc-grid">'+
      field("uaPi","IP da artéria umbilical","opcional")+field("uaPct","Percentil do IP da AU","opcional")+
      select("uaFlow","Fluxo diastólico da AU",[["","Não informado"],["presente","Presente"],["ausente","Ausente"],["reverso","Reverso"]])+
      field("mcaPi","IP da artéria cerebral média","opcional")+field("mcaPct","Percentil do IP da ACM","opcional")+
      field("cprPct","Percentil da RCP (ACM/AU)","opcional")+
      field("utaR","IP da uterina direita","opcional")+field("utaL","IP da uterina esquerda","opcional")+field("utaPct","Percentil do IP uterino médio","opcional")+
      field("dvPi","IP do ducto venoso","opcional")+field("dvPct","Percentil do IP do ducto venoso","opcional")+
      select("dvFlow","Onda a do ducto venoso",[["","Não informada"],["presente","Presente"],["ausente","Ausente"],["reverso","Reversa"]])+
      '</div><div class="barc-measures" aria-live="polite">RCP calculada: <strong data-barc-cpr>—</strong> · IP médio uterino: <strong data-barc-uta>—</strong></div></fieldset>'+
      '<fieldset><legend>3 · Cardiotocografia e confirmação</legend><div class="barc-grid">'+
      select("ctg","Cardiotocografia",[["","Não avaliada"],["normal","Sem alteração relatada"],["patologica","Patológica / padrão desacelerativo"]])+
      field("stv","STV da CTG computadorizada (ms)","opcional")+
      select("repeated","Achados que exigem repetição foram confirmados?",[["nao","Não / não informado"],["sim","Sim, nos intervalos do protocolo"]])+
      '</div><p class="barc-small">Confirmar fluxo umbilical e ducto venoso em medidas seriadas; alterações de ACM/RCP também requerem repetição. Critérios de STV: &lt;2,6 ms (26–28+6) ou &lt;3 ms (≥29 semanas).</p></fieldset>'+
      '<div class="barc-actions"><button class="barc-action" type="submit">Analisar crescimento fetal</button><button class="barc-action barc-secondary" type="reset">Limpar</button></div><div class="barc-error" role="alert"></div><div class="barc-result" aria-live="polite"></div>'+
      '<div class="barc-note"><strong>Aviso:</strong> apoio ao estudo e à revisão clínica, não substitui ultrassonografia especializada, interpretação da curva, confirmação de Doppler/CTG ou decisão obstétrica. Não determina momento/via de parto. Referências: <a href="'+SOURCE+'" target="_blank" rel="noopener noreferrer">Calculadoras Barcelona</a> · <a href="'+PROTOCOL+'" target="_blank" rel="noopener noreferrer">Protocolo BCNatal 2024</a> · <a href="'+ARTICLE+'" target="_blank" rel="noopener noreferrer">Figueras & Gratacós 2014</a>.</div></form>';
    modal.classList.add("open");modal.setAttribute("aria-hidden","false");document.body.style.overflow="hidden";
    const form=modalBody.querySelector(".barc-form"),error=form.querySelector(".barc-error"),output=form.querySelector(".barc-result");
    const get=()=>Object.fromEntries(new FormData(form));
    const refresh=()=>{
      const v=get(),ua=number(v,"uaPi"),mca=number(v,"mcaPi"),r=number(v,"utaR"),l=number(v,"utaL");
      form.querySelector("[data-barc-cpr]").textContent=ua!==null&&mca!==null&&ua>0?fmt(mca/ua,3):"—";
      form.querySelector("[data-barc-uta]").textContent=r!==null&&l!==null?fmt((r+l)/2,3):"—";
    };
    form.addEventListener("input",refresh);
    form.querySelector("[data-barc-hadlock]").addEventListener("click",()=>{
      const v=get(),biometry=form.querySelector(".barc-hadlock-output");
      try {
        const weight=has(v,"bpd")&&has(v,"hc")&&has(v,"ac")&&has(v,"fl")?
          hadlock(v.bpd,v.hc,v.ac,v.fl):
          (!has(v,"bpd")&&!has(v,"hc")&&has(v,"ac")&&has(v,"fl")?hadlockAcFl(v.ac,v.fl):
          (()=>{throw Error("Informe as quatro biometrias ou somente PA e LF.");})());
        form.elements.pfe.value=String(Math.round(weight));
        biometry.textContent="PFE estimado por Hadlock: "+fmt(weight,0)+" g. Informe também o percentil validado.";
        error.textContent="";
      } catch(ex){biometry.textContent="";error.textContent=ex.message;}
    });
    form.addEventListener("submit",ev=>{
      ev.preventDefault();ev.stopPropagation();
      try {
        const v=get(),r=classify(v),notes=r.reasons.map(t=>"<li>"+text(t)+"</li>").join(""),
          warnings=r.warnings.map(t=>'<p class="barc-warning">'+text(t)+"</p>").join("");
        const stage=r.code==="incompleto"?"Resultado parcial":r.confirmed?"Classificação segundo critérios informados":"Suspeita — confirmar achados";
        output.innerHTML='<div class="barc-result-head"><span>'+text(stage)+'</span><h4>'+text(r.label)+'</h4>'+
          '<p>IG: '+r.weeks+"s "+r.days+"d · PFE: "+(has(v,"pfe")?fmt(Number(v.pfe),0)+" g":"não informado")+
          ' · Percentil: '+(r.pct===null?"não informado":"p"+fmt(r.pct,2))+'</p></div>'+
          (r.cpr!==null?'<p>RCP (IP ACM / IP AU): <strong>'+fmt(r.cpr,3)+'</strong> (percentil informado separadamente).</p>':"")+
          (r.utaMean!==null?'<p>IP médio uterino: <strong>'+fmt(r.utaMean,3)+'</strong> (percentil informado separadamente).</p>':"")+
          (notes?'<ul>'+notes+"</ul>":"")+
          (r.interval?'<p class="barc-followup">'+text(r.interval)+"</p>":"")+
          warnings+'<p class="barc-small">A classificação é uma leitura dos dados informados e não confirmação diagnóstica. A presença de risco materno-fetal pode exigir conduta independente do estágio.</p>';
        output.hidden=false;error.textContent="";
      }catch(ex){output.innerHTML="";error.textContent=ex.message||"Dados inconsistentes.";}
    },true);
    form.addEventListener("reset",()=>{error.textContent="";output.innerHTML="";form.querySelector(".barc-hadlock-output").textContent="";form.querySelector("[data-barc-cpr]").textContent="—";form.querySelector("[data-barc-uta]").textContent="—";});
    shelf();setTimeout(()=>form.elements.weeks.focus(),40);
  }
  render();
})();