/* ECG concept UI: FICTIONAL demo only. Never processes a patient, transmits a file or saves health data. */
(() => {
  const btn=document.getElementById("ecg-load-demo");
  const reset=document.getElementById("ecg-reset-demo");
  const container=document.getElementById("ecg-demo-result");
  if(!btn||!reset||!container)return;
  const example=[
    {lead:"DII",finding:"Possível elevação do segmento ST",evidence:"Solicitar avaliação visual do ponto J e da amplitude"},
    {lead:"DIII",finding:"Possível alteração semelhante",evidence:"Conferir se o achado é contíguo e atende ao critério aplicável"},
    {lead:"aVF",finding:"Possível alteração semelhante",evidence:"Conferir amplitude e morfologia"},
    {lead:"DI e aVL",finding:"Investigar alterações recíprocas",evidence:"Verificar a existência de infradesnivelamento de ST"}
  ];
  const decisions=new Map();
  function el(name,className,text) {
    const n=document.createElement(name);
    if(className)n.className=className;
    if(text!==undefined)n.textContent=text;
    return n;
  }
  function render() {
    container.replaceChildren();
    const h=el("h3","ecg-v-title","Exemplo de leitura assistida — dados inteiramente fictícios");
    container.append(h);
    const grid=el("div","ecg-v-grid");
    example.forEach((finding,i)=>{
      const item=el("article","ecg-v-item");
      item.append(el("h4","",finding.lead),el("p","",finding.finding),el("p","ecg-v-note",finding.evidence));
      const actions=el("div","ecg-v-actions");
      ["Confirmar","Rejeitar","Rever"].forEach(value=>{
        const b=el("button","",value);
        b.type="button";
        b.setAttribute("aria-pressed",String(decisions.get(i)===value));
        b.addEventListener("click",()=>{decisions.set(i,value);render();});
        actions.append(b);
      });
      item.append(actions,el("span","ecg-v-state","Revisão: "+(decisions.get(i)||"Pendente")));
      grid.append(item);
    });
    container.append(grid);
    const confirmed=[...decisions.values()].filter(x=>x==="Confirmar").length;
    const summary=el("section","ecg-v-card");
    summary.append(el("h4","ecg-v-title","Síntese hipotética — não é laudo"));
    summary.append(el("p","ecg-v-summary",
      "Se alterações do ST forem realmente confirmadas em derivações inferiores contíguas, considerar um padrão compatível com lesão miocárdica inferior no contexto clínico apropriado. " +
      "Os critérios eletrocardiográficos, o diagnóstico diferencial e a avaliação clínica devem ser verificados pelo médico."));
    summary.append(el("p","ecg-v-note","Achados marcados como confirmados nesta demonstração: "+confirmed+" de "+example.length+
      ". Nenhuma informação foi enviada, armazenada ou usada para inferir um diagnóstico real."));
    container.append(summary);
  }
  btn.addEventListener("click",()=>{container.hidden=false;decisions.clear();render();});
  reset.addEventListener("click",()=>{container.hidden=true;decisions.clear();container.replaceChildren();});
})();