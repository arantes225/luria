/* LURIA | Auditoria clínica 1/6 (calculadoras 01–30) | 2026-10-24.
 * Corrige limites de aplicação e protege a interpretação. Apoio clínico; não prescreve.
 * Carregado depois de clinical-calculators-expansion.js, antes das bibliotecas da página.
 */
(() => {
  if (typeof defs === "undefined" || typeof calcInterpretations === "undefined") return;
  const source = {
    nkf:"NKF/NIDDK, CKD-EPI 2021 (kidney.org; niddk.nih.gov)",
    sbn:"SBN e SBPC/ML, consenso brasileiro sobre TFG estimada (2024)",
    sodium:"European Society of Endocrinology/ESICM/ERA, Clinical Practice Guideline for Hyponatraemia (2014)",
    kcl:"NHS Specialist Pharmacy Service, Treating acute hypokalaemia in adults; AAFP 2023",
    rox:"Roca et al., Am J Respir Crit Care Med. 2019;199:1368–1376",
    lipids:"National Lipid Association, Lipid Measurements in Management of Cardiovascular Diseases (2021)",
    glucose:"OPAS, Corrected Sodium calculator; Katz e Hillier",
    gas:"Fórmulas clássicas de equilíbrio ácido-base; interpretar com gasometria, albumina e laboratório",
    vent:"ARDSNet, ventilação protetora; classificação Berlim de SDRA",
    general:"Referência matemática/clínica de rotina; interpretação depende do contexto"
  };
  const note = (id, text, ref=source.general) => {
    if (!defs[id]) throw Error("Calculadora ausente na auditoria: "+id);
    defs[id].formula = text;
    defs[id].reference = ref;
    defs[id].auditDate = "2026-10-24";
  };
  const check = (id, fn) => {
    if (!defs[id]) throw Error("Calculadora ausente: "+id);
    defs[id].validate = fn;
  };
  const error = (condition, message) => condition ? message : "";
  // 1. CKD-EPI 2021 creatinina
  note("egfr","CKD-EPI 2021 (creatinina padronizada IDMS, sem raça). Válida em adultos (≥18 anos); não usar creatinina instável como medida fiel de TFG.",source.nkf);
  check("egfr",v=>error(+v.age<18||+v.age>120,"CKD-EPI adulto: idade permitida 18–120 anos; para crianças use equação pediátrica."));
  // 2. Cockcroft-Gault
  note("crcl","CrCl = (140 − idade) × peso de referência / (72 × creatinina), ×0,85 no sexo feminino. Seleção do peso depende do fármaco e da composição corporal.",source.sbn);
  defs.crcl.fields[1][1]="Peso selecionado conforme protocolo de dose";
  check("crcl",v=>error(+v.age<18||+v.age>=140,"Cockcroft–Gault: preencher idade adulta abaixo de 140 anos e selecionar peso adequado."));
  // 3,4. Frações excretadas (resultado NÃO fecha diagnóstico)
  note("fena","FENa (%) = (Na urinário × creatinina plasmática) / (Na plasmático × creatinina urinária) × 100. Idealmente amostras pareadas; limitada por diuréticos, DRC, sépsis, contraste e outros cenários.",source.sbn);
  check("fena",v=>error(+v.pn<100||+v.pn>200,"Confirmar unidade e sódio plasmático; valor fora da faixa de checagem (100–200 mEq/L)."));
  note("feurea","FEUreia (%) = (ureia urinária × creatinina plasmática) / (ureia plasmática × creatinina urinária) × 100. Usar a mesma unidade para ureia urinária e plasmática; não é determinante isolado de etiologia de LRA.",source.sbn);
  // 5. CKD-EPI combinada
  note("egfrcys","CKD-EPI 2021 creatinina+cistatina C: creatinina padronizada IDMS, cistatina calibrada IFCC; aplicar somente ≥18 anos.",source.nkf);
  check("egfrcys",v=>error(+v.age<18||+v.age>120,"CKD-EPI adulto: idade permitida 18–120 anos."));
  // 6–9. Hemodinâmica e intervalo QT.
  note("pam","PAM ≈ (PAS + 2×PAD)/3. Aproximação de pressões periféricas em ritmo regular; avaliar perfusão clínica.");
  note("shock","Índice de choque = frequência cardíaca / pressão arterial sistólica. Referências de alerta dependem de idade, gestação e situação clínica.");
  note("qtc","QTc conforme método: Fridericia (QT/RR^(1/3)), Bazett (QT/√RR), Framingham ou Hodges. RR em segundos. Bazett distorce especialmente em frequências extremas; confirmar QT no traçado.",source.general);
  if (!defs.qtc.fields.some(f=>f[0]==="sex")) defs.qtc.fields.push(["sex","Sexo para limites orientativos de QTc","select","Feminino|Masculino"]);
  check("qtc",v=>error(+v.qt<150||+v.qt>800||+v.hr<25||+v.hr>250,"Revise QT (150–800 ms) e frequência cardíaca (25–250 bpm). Medidas extremas exigem leitura manual do ECG."));
  note("pp","Pressão de pulso = PAS − PAD. Valores interpretáveis apenas se PAS ≥ PAD.");
  for (const id of ["pam","pp"]) check(id,v=>error(+v.pad>+v.pas,"A pressão diastólica não pode exceder a sistólica. Revise os valores."));
  // 10–11. Ácido-base.
  note("ag","Ânion gap sem potássio: Na − (Cl + HCO₃). Referência varia por método; verificar albumina.");
  check("ag",v=>error(+v.hco>45||+v.cl>160||+v.na>200,"Verifique unidades e resultados laboratoriais extremos antes de continuar."));
  note("winter","Fórmula de Winter, apenas para ACIDOSE METABÓLICA: PaCO₂ esperada = 1,5×HCO₃ + 8 (±2 mmHg). Comparar com PaCO₂ real; não diagnostica distúrbios isoladamente.",source.gas);
  check("winter",v=>error(+v.hco>=24,"Winter se aplica a bicarbonato reduzido em acidose metabólica. Para HCO₃ ≥24, usar outra abordagem."));
  // 12. Déficit de água livre.
  note("freewater","Déficit teórico de água livre = peso × fator ACT × (Na/140 − 1); só faz sentido quando Na >140. Não inclui perdas contínuas, diurese nem aporte previsto. NÃO equivale a volume de infusão prescrito.",source.sodium);
  check("freewater",v=>error(+v.na<=140||+v.na>200,"Esta ferramenta estima déficit de água em hipernatremia (Na >140 mEq/L); confirme sódio e causa."));
  // 13. Preparo de KCl, sem prescrição implícita.
  note("kclprep","Ampola (mL)=dose (mEq)/concentração da ampola (mEq/mL); concentração FINAL (mEq/L)=1000×dose/volume final diluído; taxa (mEq/h)=dose/duração. Nunca administrar KCl concentrado por injeção direta.",source.kcl);
  if (!defs.kclprep.fields.some(f=>f[0]==="vol")) defs.kclprep.fields.push(["vol","Volume FINAL diluído (inclui KCl)","number","mL"]);
  if (!defs.kclprep.fields.some(f=>f[0]==="route")) defs.kclprep.fields.push(["route","Via de infusão planejada","select","Periférica|Central|Ainda não definida"]);
  defs.kclprep.calc=v=>{const meq=+v.meq, conc=+v.conc, hours=+v.hours, vol=+v.vol;return[meq/conc,"mL de concentrado; "+(meq/hours).toFixed(1)+" mEq/h; "+(1000*meq/vol).toFixed(0)+" mEq/L na solução FINAL"];};
  check("kclprep",v=>{
    const c=+v.conc, meq=+v.meq, rate=meq/+v.hours, finalConc=1000*meq/+v.vol;
    return error(c<=0||+v.vol<=meq/c,"O volume final deve superar o volume de KCl concentrado, garantindo diluição.") ||
      error(rate>20,"Taxa >20 mEq/h: não gerar preparo comum; requer protocolo de emergência e supervisão especializada.") ||
      error(v.route==="Ainda não definida","Informe a via de infusão e confirme protocolo e concentração permitida.") ||
      error(v.route==="Periférica" && finalConc>40,"Concentração periférica >40 mEq/L: esta calculadora exige protocolo institucional específico. Não utilizar como preparo padrão.");
  });
  calcInterpretations.kclprep=(n,u,v)=>{
    const rate=+v.meq/+v.hours, finalConc=1000*+v.meq/+v.vol;
    return "PREPARO MATEMÁTICO, NÃO PRESCRIÇÃO. "+rate.toFixed(1)+" mEq/h; "+finalConc.toFixed(0)+" mEq/L em via "+v.route.toLowerCase()+". Monitorar K, Mg, função renal e ECG quando indicado. Preferir solução diluída pronta; jamais injetar KCl concentrado diretamente.";
  };
  // 14. Adrogué–Madias: K da solução 0 é legítimo.
  note("adrogue","ΔNa estimado após 1 L = [(Na + K da solução) − Na sérico] / (água corporal total + 1). É previsão aproximada; não se extrapola linearmente para grandes volumes nem substitui dosagens seriadas.",source.sodium);
  check("adrogue",v=>error(+v.na<100||+v.na>200||+v.ksol<0||+v.ksol>100,"Verifique Na sérico e potássio da solução (0–100 mEq/L)."));
  // 15. Déficit teórico de sódio
  note("nadeficit","Déficit teórico de sódio = água corporal total × (Na-alvo − Na atual); NÃO é dose a infundir, nem indica volume ou velocidade. A etiologia e risco de desmielinização prevalecem.",source.sodium);
  check("nadeficit",v=>error(+v.target>160||+v.target<110||+v.na>200,"Revise sódio-alvo (110–160 mEq/L) e unidade. Não use diferença calculada como ordem de reposição."));
  // 16. NaCl 3%: correção de balanço de massa em vez de multiplicação linear da variação por litro.
  note("na3vol","Estimativa puramente TEÓRICA por balanço de massa: V(L) ≈ ΔNa × ACT / [513 − (Na inicial + ΔNa)]. Não leva em conta perdas urinárias, reposições concomitantes ou redistribuição. NÃO é esquema de tratamento de hiponatremia; decisões urgentes seguem bolus e monitorização conforme diretriz.",source.sodium);
  defs.na3vol.calc=v=>{const tbw=+v.w*parseFloat(v.factor),rise=+v.rise,na=+v.na;return[1000*rise*tbw/(513-na-rise),"mL TEÓRICOS — não prescrever por este número"];};
  check("na3vol",v=>error(+v.na>=135||+v.na<100,"Ferramenta apenas para hiponatremia (Na <135 mEq/L) e concentração sérica confirmada.")||error(+v.rise>6,"Elevação-alvo >6 mEq/L: não estimar automaticamente volume. Usar protocolo de correção e monitorização serial."));
  calcInterpretations.na3vol=()=>"ATENÇÃO: modelo de mistura, NÃO volume recomendado nem plano de infusão. Hiponatremia grave sintomática requer abordagem por bolus, reavaliação de Na e critérios de segurança do protocolo institucional; vigiar diurese aquosa e sobrecorreção.";
  // 17. AG corrigido
  note("agc","AG corrigido = Na − (Cl + HCO₃) + 2,5×(4 − albumina g/dL). Referência dependente do método; calcular com coleta pareada.",source.gas);
  // 18. Sódio corrigido — escolher coeficiente.
  note("nac","Na corrigido na hiperglicemia = Na medido + fator × (glicose −100)/100. Fator de Katz 1,6 ou Hillier 2,4; maior incerteza em glicemia >400 mg/dL.",source.glucose);
  if (!defs.nac.fields.some(f=>f[0]==="method")) defs.nac.fields.push(["method","Coeficiente de correção","select","1.6 Katz|2.4 Hillier"]);
  defs.nac.calc=v=>[+v.na+parseFloat(v.method)*(+v.glu-100)/100,"mEq/L"];
  check("nac",v=>error(+v.glu<100||+v.glu>2000||+v.na<100||+v.na>200,"Aplicável à hiperglicemia (≥100 mg/dL). Confirme glicemia e sódio sérico."));
  calcInterpretations.nac=(n,u,v)=>"Na corrigido estimado por "+(parseFloat(v.method)===2.4?"Hillier (2,4)":"Katz (1,6)")+". A correção não é um novo sódio medido; a incerteza aumenta quando glicemia >400 mg/dL. Confrontar com osmolalidade efetiva e evolução sérica.";
  // 19–20. Osmolalidade / gap — BUN não é ureia.
  note("osm","Osmolalidade plasmática calculada ≈ 2×Na + glicose/18 + BUN/2,8, com Na (mEq/L), glicose e BUN (mg/dL). BUN = nitrogênio ureico; NÃO inserir ureia sérica diretamente.",source.gas);
  note("ogap","Gap osmolar ≈ osmolalidade medida − [2×Na + glicose/18 + BUN/2,8]. Considerar álcool e outros osmóis adicionais e diferenças entre métodos.",source.gas);
  for(const id of ["osm","ogap"]) {
    defs[id].fields.find(f=>f[0]==="bun")[1]="BUN (nitrogênio ureico; NÃO ureia)";
    check(id,v=>error(+v.na<100||+v.na>200||+v.glu>2500,"Revise Na sérico (100–200 mEq/L), glicose e unidades laboratoriais."));
  }
  // 21. Delta ratio
  note("delta","Δ/Δ = (ânion gap corrigido pela albumina − 12)/(24 − bicarbonato). Somente em acidose metabólica COM elevação de AG; depende da faixa de referência laboratorial.",source.gas);
  defs.delta.fields[0][1]="Ânion gap CORRIGIDO pela albumina";
  check("delta",v=>error(+v.ag<=12||+v.hco>=24,"Delta ratio requer acidose metabólica com AG corrigido >12 e HCO₃ <24 mEq/L."));
  // 22. Cálcio corrigido é estimativa falível.
  note("calcio","Cálcio total corrigido ≈ cálcio medido + 0,8×(4 − albumina em g/dL). Fórmula NÃO substitui cálcio ionizado: especialmente imprecisa em doença crítica, distúrbios ácido-base e hipoalbuminemia.",source.general);
  // 23. HbA1c → eAG.
  note("eag","eAG (mg/dL) = 28,7 × HbA1c(%) − 46,7. Reflete média aproximada de meses, não glicose atual.");
  check("eag",v=>error(+v.a1c<3||+v.a1c>25,"HbA1c fora da faixa plausível de cálculo (3–25%). Verifique a unidade."));
  // 24. Friedewald
  note("ldl","LDL-C estimado = CT − HDL − triglicerídeos/5, todos em mg/dL; não aplicar TG ≥400 mg/dL. Em TG elevados e LDL baixo, preferir método validado ou dosagem direta.",source.lipids);
  check("ldl",v=>error(+v.hdl>+v.ct||(+v.ct-+v.hdl-+v.tg/5)<0,"Perfil incompatível ou LDL calculado negativo; confirme os exames. Não emitir LDL negativo."));
  // 25–28. Antropometria, exclusivamente classificação adulta.
  note("imc","IMC = peso (kg) / altura² (m²). Classificação em tela vale para ADULTOS; em crianças e adolescentes exige referência por idade e sexo.");
  if(!defs.imc.fields.some(f=>f[0]==="age"))defs.imc.fields.push(["age","Idade para interpretação (adultos)","number","anos"]);
  check("imc",v=>error(+v.age<18||+v.age>120,"Classificação adulta de IMC aplica-se a ≥18 anos; em pediatria utilizar IMC por idade e sexo."));
  note("bsa","Superfície corporal de Mosteller (m²) = √[(peso kg × altura cm)/3600]. Estimativa para protocolos que usam m².");
  note("ibw","Peso ideal de Devine = 50 kg (homem) ou 45,5 kg (mulher) + 2,3 kg/polegada acima de 152,4 cm; não é meta ponderal.",source.general);
  check("ibw",v=>error(+v.h<152.4||+v.h>250,"Fórmula de Devine extrapolada abaixo de 152,4 cm; rever método para alturas fora da faixa."));
  note("abw","Peso ajustado = peso ideal + 0,4×(peso atual − ideal). Apenas quando protocolo específico prevê uso desse fator.");
  check("abw",v=>error(+v.w<+v.ideal,"Peso atual inferior ao ideal: não aplicar esta forma de peso ajustado."));
  // 29. P/F
  note("pf","P/F = PaO₂ (mmHg) / FiO₂ (fração 0,21–1,0). A classificação de SDRA requer dados adicionais (imagem, momento, suporte pressórico e origem).",source.vent);
  check("pf",v=>error(+v.fio<21||+v.fio>100,"FiO₂ informada em % deve estar entre 21 e 100 em condições habituais."));
  // 30. ROX com tempo e cenário de cânula nasal de alto fluxo.
  note("rox","ROX = (SpO₂/FiO₂ em fração)/FR. Estudado em adultos com pneumonia e hipoxemia em cânula nasal de alto fluxo (CNAF). Pontos de corte dependem de 2, 6 ou 12 h de tratamento.",source.rox);
  if(!defs.rox.fields.some(f=>f[0]==="time"))defs.rox.fields.push(["time","Tempo desde início da CNAF","select","2 h|6 h|12 h"]);
  check("rox",v=>error(+v.spo>100||+v.fio<21||+v.fio>100||+v.rr>100,"Confirme SpO₂ (≤100%), FiO₂ (21–100%) e FR (≤100 irpm)."));
  calcInterpretations.rox=(n,u,v)=>{
    const hours=parseInt(v.time,10);
    const fail=hours===2?2.85:hours===6?3.47:3.85;
    return n>=4.88 ? "ROX ≥4,88 às "+hours+" horas de CNAF: associado a menor risco de intubação na população original, não assegura sucesso." :
      n<fail ? "ROX <"+String(fail).replace(".",",")+" às "+hours+" horas: associado a maior risco de falha da CNAF; reavaliar urgentemente sinais clínicos." :
      "ROX intermediário às "+hours+" horas: zona cinzenta. Reavaliar tendência, esforço respiratório e oxigenação.";
  };
})();
