/* TRAUBE — Auditoria das calculadoras 61–71, 2026-10-24.
 * Apoio matemático apenas. Revisão assistencial externa pendente.
 */
(() => {
  if(typeof C==="undefined"||typeof defs==="undefined"||typeof calcInterpretations==="undefined")return;
  const ids=["gestgain","burnnine","burnfluid","mifflin","tdee","protein","caconv","plateletconv","fib4","meld3","light"];
  if(JSON.stringify(C.slice(60,71).map(x=>x[4]))!==JSON.stringify(ids))throw Error("Lote 3: sequência inesperada");
  const references={
    burns:"American Burn Association. Clinical Practice Guidelines on Burn Shock Resuscitation. J Burn Care Res. 2024;45:565–589.",
    liver:"EASL-EASD-EASO Clinical Practice Guidelines on MASLD. J Hepatol. 2024.",
    meld:"HRSA/OPTN. MELD Calculator, formula atualizada em 13 julho 2023 (consulta 2026).",
    pleura:"Light RW et al. Ann Intern Med. 1972;77:507–513.",
    diet:"Mifflin MD et al. Am J Clin Nutr. 1990;51:241–247.",
    ob:"National Academy of Medicine/IOM. Weight Gain During Pregnancy: Reexamining the Guidelines, 2009.",
    general:"Conversão dimensional em unidades laboratoriais convencionais."
  };
  const mark=(id,formula,ref)=>{defs[id].formula=formula;defs[id].reference=ref;defs[id].auditDate="2026-10-24";};
  const check=(id,fun)=>{defs[id].validate=fun;};
  const bad=(cond,msg)=>cond?msg:"";
  const range=(val,min,max)=>Number.isFinite(+val)&&+val>=min&&+val<=max;
  mark("gestgain","Ganho gestacional = peso na avaliação − peso pré-gestacional, em kg. O resultado pode ser negativo. Adequação depende de IMC pré-gestacional, IG e gestação única/múltipla.",references.ob);
  defs.gestgain.fields.push(["ig","Idade gestacional na avaliação","number","semanas"]);
  check("gestgain",v=>bad(!range(v.pre,25,350)||!range(v.now,25,350)||!range(v.ig,0,45),"Peso ou idade gestacional fora da faixa de checagem. Ganho negativo é possível e deve ser analisado."));
  calcInterpretations.gestgain=(n,u,v)=>"Variação desde peso pré-gestacional: "+n.toLocaleString("pt-BR",{maximumFractionDigits:2})+" kg com "+v.ig+" semanas. O ganho isolado NÃO determina adequação; usar IMC inicial e curva apropriada.";

  mark("burnnine","Regra dos nove em ADULTOS: cabeça/pescoço 9%, braços 9% cada, tronco anterior/posterior 18% cada, pernas 18% cada, períneo 1%. Marcar somente segmentos INTEIROS com queimadura parcial ou profunda; NÃO incluir eritema de 1º grau. Para áreas parciais usar Lund–Browder ou método palmar.",references.burns);
  defs.burnnine.fields.unshift(["age","Idade (adulto)","number","anos"]);
  const burnComponents=["head","front","back","armr","arml","legr","legl","per"];
  defs.burnnine.calc=v=>[burnComponents.reduce((sum,id)=>sum+Number(v[id]),0),"% SCQ (segmentos inteiros)"];
  check("burnnine",v=>bad(!range(v.age,18,120),"Regra dos nove desta ferramenta apenas para adultos. Para pediatria use Lund–Browder.")||bad(burnComponents.some(id=>![0,1,9,18].includes(Number(v[id]))),"Selecione somente as frações anatômicas indicadas."));
  calcInterpretations.burnnine=()=>"SCQ estimada só para segmentos anatômicos completamente afetados por queimaduras de espessura parcial/profunda. Se a queimadura for parcial dentro do segmento, esta estimativa NÃO se aplica; procure mapa Lund–Browder.";

  mark("burnfluid","Estimativa ABA 2024 para adultos com queimaduras térmicas ≥20% SCQ: 2 mL/kg/%SCQ no primeiro período de 24 horas desde a QUEIMADURA, com titulação por perfusão e diurese. Não é volume automático nem inclui todos os fluidos clínicos.",references.burns);
  defs.burnfluid.fields.push(["age","Idade (adulto)","number","anos"]);
  check("burnfluid",v=>bad(!range(v.age,18,120)||!range(v.w,20,300)||!range(v.scq,20,100),"Estimativa aplicável apenas a adultos com ≥20% SCQ; avalie mecanismo, extensão e peso."));
  calcInterpretations.burnfluid=()=>"PONTO DE PARTIDA de reposição nas primeiras 24 h após a queimadura, não prescrição automática. Titular pela diurese/perfusão; queimaduras elétricas, lesão inalatória e outras situações exigem individualização e unidade especializada.";

  mark("mifflin","Mifflin–St Jeor adulto: 10×peso(kg) + 6,25×altura(cm) − 5×idade(anos) + 5 (sexo masculino) ou −161 (sexo feminino). Estima repouso e NÃO considera atividade nem condição crítica.",references.diet);
  check("mifflin",v=>bad(!range(v.age,18,120)||!range(v.w,20,350)||!range(v.h,110,240),"Mifflin–St Jeor: aplicar em adultos, com peso e altura revisados."));
  calcInterpretations.mifflin=()=>"Estimativa de gasto energético em repouso, não meta nutricional automática. Gravidez, UTI, alterações corporais e edema alteram adequação do modelo.";

  mark("tdee","GET estimado (kcal/dia) = gasto basal estimado × fator de atividade. Fatores usuais de exemplo: 1,2; 1,375; 1,55; 1,725; 1,9. Não extrapolar para pacientes críticos ou situações de catabolismo.",references.diet);
  check("tdee",v=>bad(!range(v.bmr,500,6000)||![1.2,1.375,1.55,1.725,1.9].includes(Number(v.factor)),"Revise gasto basal e fator de atividade. Valores não validados para UTI."));
  calcInterpretations.tdee=()=>"Estimativa populacional de gasto energético total, sujeita a variação individual. Não deve definir dieta/terapia nutricional sem avaliação.";

  mark("protein","Proteína (g/dia) = peso de referência em kg × meta individualizada em g/kg/dia. Fator escolhido pelo profissional; não recomenda meta a priori.",references.diet);
  check("protein",v=>bad(!range(v.w,1,350)||!range(v.target,.1,4),"Peso/metas fora da faixa de checagem; insuficiência renal, doença crítica e idade modificam metas."));
  calcInterpretations.protein=()=>"Conversão de meta em gramas/dia, NÃO recomendação de ingestão. Rever condição clínica, nutrição e função renal.";

  mark("caconv","Cálcio TOTAL mg/dL ×0,2495 = mmol/L (equivale a dividir por ≈4,008). Não se trata de cálcio ionizado.",references.general);
  check("caconv",v=>bad(!range(v.ca,.01,25),"Revise concentração de cálcio total em mg/dL. Não interpretar como cálcio iônico."));
  mark("plateletconv","Plaquetas (10³/µL) ×1000 = células/µL. 0 é matematicamente válido e clinicamente crítico.",references.general);
  check("plateletconv",v=>bad(!range(v.plt,0,2500),"Plaquetas em milhares/µL devem ser ≥0. Valores extremos exigem conferência do laboratório."));

  mark("fib4","FIB-4 = idade(anos)×AST(U/L)/[plaquetas (10⁹/L)×√ALT(U/L)]. Em MASLD, idade 35–64: <1,3 baixo; 1,3–2,67 intermediário; >2,67 elevado. ≥65 anos: usar <2,0 para triagem de baixo risco. Não indicado na doença aguda.",references.liver);
  check("fib4",v=>bad(!range(v.age,35,120)||!range(v.ast,1,10000)||!range(v.alt,1,10000)||!range(v.plt,1,2500),"FIB-4 para triagem de MASLD a partir de 35 anos; não aplicar durante doença hepática/aguda."));
  calcInterpretations.fib4=(n,u,v)=>{
    const age=+v.age,low=age>=65?2:1.3;
    return n<low?"FIB-4 "+n.toFixed(2)+": abaixo do limiar de triagem ("+low.toLocaleString("pt-BR")+"). Não exclui toda fibrose.":
      n<=2.67?"FIB-4 intermediário para a idade. Considerar elastografia/VCTE ou ELF conforme risco e diretriz.":"FIB-4 elevado; encaminhar para avaliação hepática adicional. Não confirma fibrose avançada isoladamente.";
  };

  mark("meld3","MELD 3.0 adulto OPTN/HRSA (desde julho de 2023): usa creatinina, bilirrubina, INR, sódio, albumina, sexo do registro e critérios de diálise. Respeitar limites oficiais; escore prognóstico aproximado, não pontuação oficial de lista de transplante.",references.meld);
  defs.meld3.fields.unshift(["age","Idade (≥18 anos)","number","anos"]);
  defs.meld3.fields.find(x=>x[0]==="dial")[1]="Diálise duas vezes nos últimos 7 dias OU CVVH ≥24 h nesse período";
  check("meld3",v=>bad(!range(v.age,18,120)||!range(v.cr,.1,50)||!range(v.bil,.1,100)||!range(v.inr,.5,20)||!range(v.na,100,180)||!range(v.alb,.5,7),"Verifique idade adulta, valores e unidades de MELD 3.0."));
  calcInterpretations.meld3=(n)=>"MELD 3.0 adulto estimado: "+n+". Conferir dados e elegibilidade no calculador oficial OPTN/HRSA; não decidir listagem, prioridade ou transferência por este número isoladamente.";

  mark("light","Critérios de Light (amostras pleural e sérica pareadas): exsudato se proteína pleural/sérica >0,5 OU LDH pleural/sérica >0,6 OU LDH pleural >2/3 LSN de LDH sérica. Uma condição positiva basta.",references.pleura);
  defs.light.calc=v=>{
    const p=+v.pp/+v.sp,ld=+v.pl/+v.sl,ldn=+v.pl/+v.uln;
    return [Number(p>.5)+Number(ld>.6)+Number(ldn>2/3),"de 3 critérios positivos"];
  };
  check("light",v=>bad(!range(v.pp,.01,20)||!range(v.sp,.01,20)||!range(v.pl,.01,20000)||!range(v.sl,.01,20000)||!range(v.uln,.01,20000),"Confira unidades e coletas pareadas de proteínas (g/dL) e LDH (U/L)."));
  calcInterpretations.light=n=>n>=1?"Pelo menos um critério de Light positivo: classifica como exsudato. Avaliar pseudoexsudato após diurese e condição clínica.":"Nenhum critério de Light positivo: padrão bioquímico favorece transudato. Contextualizar com clínica e coleta.";
  for(const id of ids) if(!defs[id].reference||defs[id].auditDate!=="2026-10-24")throw Error("Auditoria 3 incompleta: "+id);
  if(typeof document==="undefined")return;
  const zero={plateletconv:["plt"]};
  const allowedNegative=new Set();
  document.addEventListener("click",ev=>{
    const target=ev.target?.closest?.("[data-open]");
    if(!target)return;
    const modal=document.querySelector("#calc-modal");if(!modal)return;
    const id=target.dataset.open;modal.dataset.clinicalAudit3Id=ids.includes(id)?id:"";
    if(!ids.includes(id))return;
    const node=modal.querySelector(".formula");
    if(node&&!node.querySelector("[data-audit-ref]")){
      const p=document.createElement("p");p.dataset.auditRef="3";p.className="note";
      p.textContent="Fonte: "+defs[id].reference+" · Revisado em 24/10/2026";node.appendChild(p);
    }
  });
  document.addEventListener("submit",ev=>{
    const form=ev.target, modal=document.querySelector("#calc-modal");
    if(form?.tagName!=="FORM"||!modal?.contains(form))return;
    const id=modal.dataset.clinicalAudit3Id;if(!ids.includes(id))return;
    ev.preventDefault();ev.stopImmediatePropagation();
    const d=defs[id],vals=Object.fromEntries(new FormData(form)),err=form.querySelector(".err"),res=form.querySelector(".result");
    const warn=m=>{err.textContent=m;res.classList.remove("show");};
    for(const f of d.fields){
      const raw=String(vals[f[0]]??"").trim();
      if(!raw)return warn("Preencha todos os campos.");
      if(f[2]!=="number")continue;
      const n=Number(raw);
      if(!Number.isFinite(n)||n<0&&!allowedNegative.has(f[0])||(n===0&&!(zero[id]||[]).includes(f[0])))
        return warn("Verifique valor e unidade de "+f[1]+".");
    }
    try{
      const message=d.validate?.(vals)||"";if(message)return warn(message);
      const [num,unit]=d.calc(vals);
      if(!Number.isFinite(num))return warn("Fórmula inaplicável a esses dados.");
      const label=document.createElement("span");label.className="result-label";label.textContent="Resultado";
      const bold=document.createElement("b");bold.textContent=num.toLocaleString("pt-BR",{maximumFractionDigits:2})+(unit?" "+unit:"");
      const small=document.createElement("small");small.textContent=calcInterpret(id,num,unit,vals);
      res.replaceChildren(label,bold,small);err.textContent="";res.classList.add("show");
    }catch(ex){warn("Resultado indisponível. Verifique os dados e a indicação clínica.");}
  },true);
})();
