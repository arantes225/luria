/* TRAUBE | Revisão clínica de calculadoras 31–60 | 2026-10-24.
 * Uso: após módulo de expansão, sem modificar o CSP inline.
 * Cálculos educacionais/de apoio, NÃO prescrição, diagnóstico ou validação regulatória.
 */
(() => {
  if(typeof C==="undefined"||typeof defs==="undefined"||typeof calcInterpretations==="undefined")return;
  const ids=[
    "sf","pbw","dp","cstat","hs","schwartz","gir","ig","dpp","gts",
    "mgm","mcg","mmol","temp","doseml","dosekg","diurese","mkg","uacr","homair",
    "nonhdl","mentzer","anc","tsat","reticcorr","rpi","aagrad","tidalvt","pretermcorr","igultra"
  ];
  if(JSON.stringify(C.slice(30,60).map(x=>x[4]))!==JSON.stringify(ids))throw Error("Auditoria 2: ordem do catálogo inesperada");
  const refs={
    ards:"NHLBI/ARDSNet, ventilação de baixo volume e peso corporal predito (2000–2001).",
    aap:"American Academy of Pediatrics, Clinical Practice Guideline: Maintenance Intravenous Fluids in Children (2018).",
    niddk:"NIDDK, CKiD bedside Schwartz 2009, creatinina rastreável a IDMS.",
    kdigo:"KDIGO 2024 CKD Guideline: albuminúria A1/A2/A3.",
    acog:"ACOG/SMFM/AIUM, Methods for Estimating the Due Date, CO 700 (2017, reafirmado 2025).",
    fda:"FDA, Infusion Pump Risk Reduction Strategies for Clinicians; dupla checagem independente em fármacos de alto risco.",
    lung:"Equação alveolar simplificada; RQ=0,8, pressão do vapor d'água=47 mmHg.",
    who:"OMS/WHO, prematuridade e idade corrigida; interpretação de desenvolvimento segundo idade e contexto.",
    general:"Revisão dimensional e fórmula clássica; conferir unidade e contexto clínico.",
    hemat:"Índices hematimétricos e hematológicos; correlacionar com hemograma, exame e contexto clínico."
  };
  const set=(id,formula,reference=refs.general)=>{
    const d=defs[id];if(!d)throw Error("Sem definição: "+id);
    d.formula=formula;d.reference=reference;d.auditDate="2026-10-24";
  };
  const guard=(id,validator)=>{defs[id].validate=validator;};
  const bad=(flag,msg)=>flag?msg:"";
  const between=(n,min,max)=>Number.isFinite(+n)&&+n>=min&&+n<=max;
  const isoDate=(str)=>{if(!/^\d{4}-\d{2}-\d{2}$/.test(str||""))return NaN;const t=Date.parse(str+"T00:00:00Z");return Number.isFinite(t)&&new Date(t).toISOString().slice(0,10)===str?t/86400000:NaN;};
  const clip = (v,min,max)=>+v>=min&&+v<=max;

  // 31. SpO₂/FiO₂: medida substituta, sem classificar SDRA isoladamente.
  set("sf","S/F = SpO₂ (%) / [FiO₂ (%) ÷ 100]. Medição de oximetria perde discriminação em SpO₂ elevada e depende de perfusão/sensor; não define SDRA por si só.",refs.ards);
  guard("sf",v=>bad(!between(v.spo,40,100)||!between(v.fio,21,100),"Verifique SpO₂ (40–100%) e FiO₂ (21–100%). Confirme qualidade da oximetria."));
  calcInterpretations.sf=()=>"Estimativa não invasiva. Com SpO₂ elevada (especialmente >97%), o efeito teto limita comparações com PaO₂. Não inferir diagnóstico/gravidade de SDRA apenas de S/F.";

  // 32. Peso predito: altura + equação ARDSNet para adulto, não peso atual.
  set("pbw","ARDSNet adulto: homem 50+0,91×(altura cm−152,4); mulher 45,5+0,91×(altura cm−152,4). Peso corporal PREDITO para ventilação, não massa corporal real.",refs.ards);
  defs.pbw.fields.push(["age","Idade (adultos)","number","anos"]);
  guard("pbw",v=>bad(!clip(v.age,18,120)||!clip(v.h,120,250),"ARDSNet PBW: restringir a adultos (≥18 anos), altura plausível 120–250 cm."));

  // 33–34. Mecânica: pressão de platô sem esforços e PEEP total.
  set("dp","Driving pressure estática (cmH₂O) = pressão de platô − PEEP TOTAL. Medidas exigem pausa inspiratória e condições passivas; PEEP externa difere de total com auto-PEEP.",refs.ards);
  defs.dp.fields[1][1]="PEEP TOTAL (incluir auto-PEEP quando presente)";
  guard("dp",v=>bad(+v.peep<0||+v.peep>=+v.plat||+v.plat>80,"PEEP total deve ser não negativa e inferior à pressão de platô (máximo de checagem 80 cmH₂O)."));
  set("cstat","Complacência estática (mL/cmH₂O) = volume corrente medido / (Pplat − PEEP TOTAL). Requer medidas em situação passiva e sem vazamentos relevantes.",refs.ards);
  defs.cstat.fields[2][1]="PEEP TOTAL";
  guard("cstat",v=>bad(+v.peep<0||+v.peep>=+v.plat||+v.vt>2500||+v.plat>80,"Revise PEEP total (<Pplat), platô e volume corrente (≤2500 mL)."));

  // 35. Holliday-Segar 4-2-1 é taxa aproximada, não escolha de tônus/volume final.
  set("hs","Regra pediátrica 4-2-1: 4 mL/kg/h (1–10 kg), +2 mL/kg/h (10–20 kg), +1 mL/kg/h (>20 kg). Taxa teórica e NÃO prescrição. Em crianças ≥28 dias, AAP 2018 recomenda soluções isotônicas para manutenção na população elegível.",refs.aap);
  defs.hs.fields.push(["age","Idade da criança","number","meses completos"]);
  guard("hs",v=>bad(!clip(v.age,1,216)||!clip(v.w,1,200),"Regra 4-2-1 deste módulo: 1–216 meses, peso 1–200 kg. Neonatos e condições especiais exigem avaliação individual."));
  calcInterpretations.hs=()=>"Taxa horária de referência, não uma prescrição de manutenção. Avaliar perdas, volume circulante, vasopressina, sódio sérico e condições excluídas da diretriz AAP (cardíaca, renal, queimaduras etc.). Não escolher tonicidade/velocidade automaticamente.";

  // 36. Schwartz: IDMS e pediatria, não creatinina instável.
  set("schwartz","Bedside Schwartz (CKiD): TFG (mL/min/1,73 m²) = 0,413×altura(cm)/creatinina(mg/dL). Creatinina padronizada IDMS. Não usar como TFG real em lesão renal aguda.",refs.niddk);
  defs.schwartz.fields.push(["age","Idade pediátrica","number","anos"]);
  guard("schwartz",v=>bad(!clip(v.age,1,17)||!clip(v.h,40,220)||!clip(v.cr,.1,25),"Schwartz bedside: crianças de 1–17 anos com estatura/creatinina plausíveis e dosagem padronizada."));
  calcInterpretations.schwartz=()=>"TFG pediátrica estimada e indexada à superfície de 1,73 m². Não aplicar categorias adultas de DRC isoladamente; interpretar crescimento, idade e persistência.";

  // 37. GIR percentual massa/volume, mg/kg/min; sem protocolo de velocidade.
  set("gir","GIR (mg/kg/min) = concentração de glicose (% m/v) ×10 (mg/mL)×mL/h /(kg×60). A concentração se refere à solução FINAL da infusão, não à ampola concentrada.",refs.fda);
  defs.gir.fields[0][1]="Glicose na solução FINAL (% m/v)";
  guard("gir",v=>bad(!clip(v.conc,.1,70)||!clip(v.rate,.01,2000)||!clip(v.w,.2,300),"GIR: revise solução final (% m/v), taxa de infusão e peso; valores fora da faixa de checagem."));
  calcInterpretations.gir=()=>"Oferta de glicose calculada, não velocidade prescrita. Metas variam conforme idade, glicemia, risco de hipoglicemia, condição metabólica e acesso venoso.";

  // 38–39. Datas e idade gestacional: preservar dias inteiros e DPP = DUM + 280.
  set("ig","IG(DUM) = (data de referência − DUM), em dias/7; DUM confiável. Mostrar semanas completas e dias; datação clínica final deve considerar primeira ultrassonografia apropriada.",refs.acog);
  guard("ig",v=>{const diff=isoDate(v.today)-isoDate(v.dum);return bad(!Number.isFinite(diff)||diff<0||diff>315,"Datas inválidas: referência deve estar entre DUM e 45 semanas após a DUM.");});
  set("dpp","DPP(DUM) = data da DUM + 280 dias (40 semanas), considerando ciclo próximo de 28 dias. Em reprodução assistida, usar datação específica.",refs.acog);
  guard("dpp",v=>bad(!Number.isFinite(isoDate(v.dum)),"DUM inválida. Use data real no formato AAAA-MM-DD."));
  calcInterpretations.dpp=()=>"Data estimada, não confirmação obstétrica; documentar DPP mais confiável, preferindo USG precoce válida quando indicada.";

  // 40. Equipo macro pode ser 10, 15 ou 20 gtt/mL; 60 microgtt/mL.
  set("gts","Gotas/min = mL/h × fator REAL do equipo (gotas/mL) ÷ 60. Verificar inscrição do equipo; não inferir automaticamente que macrogotas são 20/mL.",refs.fda);
  defs.gts.fields[1][3]="10 gotas/mL|15 gotas/mL|20 gotas/mL|60 microgotas/mL";
  defs.gts.calc=v=>{const f=parseInt(v.factor,10);return[+v.ml*f/60,f===60?"microgotas/min":"gotas/min"];};
  guard("gts",v=>bad(+v.ml>2000,"Revise taxa >2000 mL/h: risco de infusão excessiva. Confirmar indicação antes de prosseguir."));

  // 41. Percentual é massa/volume (g/100mL), não qualquer %.
  set("mgm","Apenas % MASSA/VOLUME (m/v): X% = X g/100mL = 10X mg/mL. NÃO converter % peso/peso ou volume/volume com esta fórmula.");
  guard("mgm",v=>bad(+v.pct>100,"Concentração percentual >100% não se aplica a soluções m/v convencionais."));

  // 42–44. Correção das conversões bidirecionais anunciadas.
  set("mcg","Massa: 1 mg = 1000 mcg. Escolha a direção de conversão. Nunca confundir mg com mcg em prescrição.",refs.fda);
  defs.mcg.fields[0][1]="Valor numérico na unidade de origem";
  defs.mcg.fields.push(["direction","Sentido","select","mg → mcg|mcg → mg"]);
  defs.mcg.calc=v=>v.direction==="mg → mcg"?[+v.mg*1000,"mcg"]:[+v.mg/1000,"mg"];

  set("mmol","Glicose: 1 mmol/L ≈ 18,0182 mg/dL. Selecione a unidade de origem e destino.");
  defs.mmol.fields[0][1]="Glicose na unidade de origem";
  defs.mmol.fields.push(["direction","Sentido","select","mg/dL → mmol/L|mmol/L → mg/dL"]);
  defs.mmol.calc=v=>v.direction==="mg/dL → mmol/L"?[+v.glu/18.0182,"mmol/L"]:[+v.glu*18.0182,"mg/dL"];

  set("temp","Celsius e Fahrenheit: °F = °C×9/5+32; °C=(°F−32)×5/9. Inclui temperaturas negativas (conversão matemática).");
  defs.temp.fields[0][1]="Temperatura na unidade de origem";
  defs.temp.fields.push(["direction","Sentido","select","°C → °F|°F → °C"]);
  defs.temp.calc=v=>v.direction==="°C → °F"?[+v.c*9/5+32,"°F"]:[(+v.c-32)*5/9,"°C"];
  guard("temp",v=>bad(v.direction==="°C → °F"?+v.c< -273.15:+v.c< -459.67,"A temperatura não pode ser menor que o zero absoluto."));

  // 45–46. Matemática de dose, SEM dose máxima automatizada.
  set("doseml","Volume (mL) = dose prescrita (mg) / concentração FINAL (mg/mL), após verificação de apresentação, diluição, via e dose máxima no bulário institucional. NÃO define dose.",refs.fda);
  defs.doseml.fields[1][1]="Concentração final confirmada";
  guard("doseml",v=>bad(+v.dose/+v.conc>10000,"Volume >10.000 mL: rever dose, fármaco, unidade e apresentação antes de utilizar o resultado."));
  calcInterpretations.doseml=()=>"Conversão aritmética apenas. Conferir medicamento, apresentação, dose máxima, via, diluição, estabilidade e necessidade de dupla checagem para fármacos de alto risco.";
  set("dosekg","Dose por administração = mg/kg/dose × peso de referência, em kg. A escolha do peso e o teto de dose dependem do medicamento; NÃO define dose correta.",refs.fda);
  defs.dosekg.fields[1][1]="Peso apropriado segundo o fármaco";
  defs.dosekg.fields.push(["weightbasis","Tipo de peso utilizado","select","Atual|Ideal|Ajustado|Outro conforme protocolo"]);
  guard("dosekg",v=>bad(+v.dose*+v.w>100000,"Dose aritmética >100.000 mg: rever unidades, peso e fármaco; não utilizar para prescrição sem checagem."));
  calcInterpretations.dosekg=()=>"A dose numérica depende do regime escolhido. Antes de administrar, verificar dose por dia vs dose, dose máxima, intervalos, via, função renal e hepática e tipo de peso.";

  // 47. Diurese zero é resultado clinicamente relevante.
  set("diurese","Diurese (mL/kg/h) = volume total (mL)/(peso kg × duração h). Volume de 0 mL é legítimo; contexto KDIGO depende de duração de oligúria.",refs.general);
  guard("diurese",v=>bad(!clip(v.h,.1,72)||!clip(v.w,.2,400)||!clip(v.vol,0,50000),"Revise duração (0,1–72 h), peso e volume; zero urina deve ser aceito."));
  calcInterpretations.diurese=(n,u,v)=>{
    const hours=+v.h;
    if(n===0)return "Anúria no intervalo informado ("+hours+" h). Priorizar avaliação clínica imediata; estágio KDIGO exige duração e contexto.";
    if(n<.5)return hours>=6?"Oligúria (<0,5 mL/kg/h por ≥6 h), compatível com critério de débito urinário para LRA em adultos; avaliar causa e estágio conforme duração.":"Diurese baixa; intervalo <6 h não preenche isoladamente o critério temporal KDIGO de LRA.";
    return "Acima de 0,5 mL/kg/h no período informado. Não exclui LRA nem hipoperfusão.";
  };

  // 48. mcg/kg/min => mL/h, alta vigilância para drogas vasoativas.
  set("mkg","mL/h = dose (mcg/kg/min) × peso (kg) × 60 ÷ concentração FINAL (mcg/mL). Conversão NÃO sugere dose adequada; dupla checagem independente para fármacos de alto risco.",refs.fda);
  defs.mkg.fields[2][1]="Concentração FINAL da infusão";
  defs.mkg.fields.push(["weightbasis","Peso usado na prescrição","select","Atual conforme prescrição|Ideal conforme prescrição|Ajustado conforme prescrição"]);
  guard("mkg",v=>bad(+v.dose*+v.w*60/+v.conc>2000,"Velocidade >2000 mL/h: possível erro de unidade ou concentração. Não utilizar sem revisar a prescrição."));
  calcInterpretations.mkg=()=>"Conversão aritmética, NÃO sugestão terapêutica. Revisar dose, peso, concentração da bolsa, programação da bomba, acesso e alarmes; dupla checagem independente de drogas de alto risco.";

  // 49. ACR: erro de fronteira corrigido: A3 começa em ≥300 mg/g.
  set("uacr","ACR urinária (mg/g) = albumina (mg/L) ÷ creatinina (g/L); amostra preferencialmente primeira urina matinal. A1 <30; A2 30–<300; A3 ≥300 mg/g.",refs.kdigo);
  guard("uacr",v=>bad(!clip(v.alb,.01,100000)||!clip(v.cr,.01,10),"Confira unidades: albumina mg/L, creatinina g/L. Não inserir valores em mg/dL."));
  calcInterpretations.uacr=n=>n<30?"KDIGO A1: <30 mg/g.":n<300?"KDIGO A2: 30 a <300 mg/g.":"KDIGO A3: ≥300 mg/g. Confirmar persistência e investigar condições transitórias (febre, exercício, infecção etc.).";

  // 50. HOMA-IR — apenas em jejum, não diagnostica sozinho resistência insulínica.
  set("homair","HOMA-IR = glicemia de JEJUM (mg/dL) × insulina de JEJUM (µUI/mL) / 405. Não existe ponto de corte clínico universal.");
  guard("homair",v=>bad(!clip(v.glu,40,600)||!clip(v.ins,.01,300),"HOMA-IR exige glicemia e insulina em jejum, com unidades especificadas. Fora da faixa de checagem."));

  // 51. Colesterol não-HDL sem valor negativo.
  set("nonhdl","Não-HDL = colesterol total − HDL, ambos em mg/dL. Metas variam por risco cardiovascular.",refs.general);
  guard("nonhdl",v=>bad(+v.hdl>+v.total,"HDL não pode superar colesterol total; confira exames/unidades."));

  // 52. Mentzer — validade depende de microcitose, não é diagnóstico etiológico.
  set("mentzer","Mentzer = VCM (fL) / hemácias (milhões/µL). Apenas triagem de microcitose: <13 pode sugerir talassemia, ≥13 pode sugerir ferropriva; não substitui ferritina ou eletroforese.",refs.hemat);
  defs.mentzer.fields[0][1]="VCM (microcitose)";
  defs.mentzer.fields.push(["micro","Microcitose confirmada para idade","select","Sim|Não"]);
  guard("mentzer",v=>bad(v.micro!=="Sim","Este índice só deve ser interpretado quando existe microcitose confirmada para idade.")||bad(!clip(v.mcv,35,100)||!clip(v.rbc,.1,12),"Verifique VCM e hemácias."));
  calcInterpretations.mentzer=n=>n<13?"Mentzer <13: favorece traço talassêmico em microcitose, mas não é diagnóstico.":"Mentzer ≥13: favorece deficiência de ferro em microcitose, mas não é diagnóstico. Confirmar ferritina/estudo de ferro e contexto.";

  // 53. ANC 0% de neutrófilos é possibilidade REAL.
  set("anc","ANC (células/µL) = leucócitos/µL × [% segmentados + % bastões] / 100. O percentual total de 0% é legítimo, porém crítico.",refs.hemat);
  guard("anc",v=>bad(!clip(v.wbc,.01,300000)||!clip(v.neut,0,100),"Leucócitos precisam ser expressos em células/µL; porcentagem de neutrófilos deve ser 0–100%."));
  calcInterpretations.anc=n=>n<500?"ANC <500/µL: neutropenia grave. Se febre ou sinais infecciosos, avaliação urgente.":n<1000?"ANC 500–999/µL: neutropenia moderada.":n<1500?"ANC 1000–1499/µL: neutropenia leve (referência adulta; considerar idade e população).":"ANC ≥1500/µL: sem neutropenia pelo limiar adulto clássico, mas há referências específicas por idade e população.";

  // 54. Saturação de transferrina com mesma unidade para ferro/TIBC.
  set("tsat","Saturação de transferrina (%) = 100 × ferro sérico (µg/dL) / capacidade total de ligação (TIBC, µg/dL). Não usar ferritina no denominador.",refs.hemat);
  guard("tsat",v=>bad(!clip(v.iron,.01,1000)||!clip(v.tibc,.01,2000)||+v.iron>+v.tibc,"Ferro/TIBC devem estar em µg/dL e a saturação estimada não pode ultrapassar 100%."));

  // 55. Contagem reticulocitária corrigida: 0% legítimo.
  set("reticcorr","Reticulócitos corrigidos (%) = reticulócitos observados (%) × hematócrito do paciente / hematócrito de referência. Não igualar ao índice de produção reticulocitária.",refs.hemat);
  guard("reticcorr",v=>bad(!clip(v.pct,0,100)||!clip(v.hct,1,75)||!clip(v.normal,15,60),"Revise percentuais: reticulócitos 0–100%, hematócrito 1–75%, referência 15–60%."));

  // 56. RPI: fator NÃO pode ser adivinhado. Vincular fator ao hematócrito informado.
  set("rpi","RPI = reticulócitos corrigidos (%) / fator aproximado de maturação por hematócrito: ≥40%=1; 30–<40%=1,5; 20–<30%=2; <20%=2,5. Grade aproximada, não uma avaliação automática de resposta medular.",refs.hemat);
  defs.rpi.fields=[["retic","Reticulócitos CORRIGIDOS","number","%"],["hct","Hematócrito do paciente","number","%"]];
  defs.rpi.calc=v=>{const h=+v.hct;return[+v.retic/(h>=40?1:h>=30?1.5:h>=20?2:2.5),""];};
  guard("rpi",v=>bad(!clip(v.retic,0,100)||!clip(v.hct,1,75),"RPI: informe reticulócitos corrigidos (0–100%) e hematócrito (1–75%)."));
  calcInterpretations.rpi=()=>"Índice de produção reticulocitária aproximado. Interpretação depende do grau de anemia, hemólise/hemorragia, doença medular e modelo do laboratório; não define resposta medular isoladamente.";

  // 57. Gradiente A-a: pressão barométrica NÃO é FiO₂; altitude importante.
  set("aagrad","PAO₂ ≈ FiO₂×(PB−47) − PaCO₂/0,8; gradiente A-a=PAO₂−PaO₂, com FiO₂ em FRAÇÃO e pressões em mmHg. Gradiente depende de idade, FiO₂, altitude e estabilidade respiratória.",refs.lung);
  guard("aagrad",v=>bad(!clip(v.fio,21,100)||!clip(v.atm,300,1100)||!clip(v.co2,1,200)||!clip(v.o2,1,700),"Gradiente A-a: verificar FiO₂ 21–100%, barométrica 300–1100 mmHg, PaCO₂/PaO₂ em mmHg."));

  // 58. VT: confirmar PBW independente e população ventilada.
  set("tidalvt","VT teórico (mL) = peso corporal PREDITO (kg) × alvo (4–8 mL/kg); para SDRA, considerar início em torno de 6 mL/kg e ajuste por pressões/gasometria conforme ARDSNet. NÃO é ajuste automático de ventilador.",refs.ards);
  guard("tidalvt",v=>bad(!clip(v.pbw,15,150)||!clip(v.mlkg,4,8),"Confirme PBW adulto plausível e alvo protetor 4–8 mL/kg. Não é uma prescrição ventilatória."));

  // 59. Ao nascer, idade cronológica de 0 semana é valor normal.
  set("pretermcorr","Idade corrigida (semanas) = idade cronológica pós-natal (semanas) − (40 − IG ao nascimento em semanas). Idade cronológica de 0 semana deve ser aceita. Uso principalmente em desenvolvimento até 24 meses.",refs.who);
  guard("pretermcorr",v=>bad(!clip(v.birth,22,36.99)||!clip(v.chrono,0,104),"Prematuro: IG ao nascer de 22 a <37 semanas e idade cronológica de 0 a 104 semanas."));

  // 60. IG por USG datada: utilizar semanas + dias; não redatar automaticamente.
  set("igultra","IG atual em dias = IG no exame (semanas×7+dias) + dias entre ultrassonografia e data de referência. Informar IG em semanas completas e dias; não usar USG tardia para alterar DPP previamente bem estabelecida.",refs.acog);
  guard("igultra",v=>{
    const scan=isoDate(v.scan),ref=isoDate(v.ref),days=7*+v.weeks+Number(v.days)+(ref-scan);
    return bad(!Number.isFinite(scan)||!Number.isFinite(ref)||ref<scan||!clip(v.weeks,4,43)||days<0||days>315,
      "Datas ou semanas de USG incoerentes; DPP deve seguir datação obstétrica oficial, sem alteração automática.");
  });
  calcInterpretations.igultra=(n)=>{const days=Math.round(n*7);return "IG projetada: "+Math.floor(days/7)+" semanas e "+(days%7)+" dias. Não altere a DPP se houver USG precoce válida; considere incerteza conforme trimestre.";};

  // Acesso contextual às 30 ferramentas desta revisão.
  for(const id of ids) {
    if(defs[id].auditDate!=="2026-10-24"||!defs[id].reference)throw Error("Referência ou revisão ausente em "+id);
  }
  if(typeof document==="undefined")return; // cálculo unitário isolado fora do navegador
  const allowedZero = {
    "dp":["peep"],"cstat":["peep"],"gts":["ml"],"mgm":["pct"],"mcg":["mg"],
    "mmol":["glu"],"temp":["c"],"diurese":["vol"],"anc":["neut"],
    "reticcorr":["pct"],"rpi":["retic"],"pretermcorr":["chrono"]
  };
  const allowNegative = {"temp":["c"]};
  document.addEventListener("click",event=>{
    const control=event.target?.closest?.("[data-open]");
    if(!control)return;
    const modal=document.querySelector("#calc-modal");if(!modal)return;
    const id=control.dataset.open;
    modal.dataset.clinicalAudit2Id=ids.includes(id)?id:"";
    if(!ids.includes(id))return;
    const d=defs[id],formula=modal.querySelector(".formula");
    if(formula&&!formula.querySelector("[data-audit-ref]")){
      const n=document.createElement("p");
      n.dataset.auditRef="2";n.className="note";
      n.textContent="Referência: "+d.reference+" · Revisão: 24/10/2026";
      formula.appendChild(n);
    }
  });
  document.addEventListener("submit",event=>{
    const form=event.target,modal=document.querySelector("#calc-modal");
    if(form?.tagName!=="FORM"||!modal?.contains(form))return;
    const id=modal.dataset.clinicalAudit2Id;
    if(!ids.includes(id))return;
    event.preventDefault();event.stopImmediatePropagation();
    const d=defs[id],err=form.querySelector(".err"),res=form.querySelector(".result");
    if(!d||!err||!res)return;
    const warn=msg=>{err.textContent=msg;res.classList.remove("show");};
    const v=Object.fromEntries(new FormData(form));
    for(const f of d.fields) {
      const raw=String(v[f[0]]??"").trim();
      if(!raw)return warn("Preencha todos os campos obrigatórios.");
      if(f[2]!=="number")continue;
      const n=Number(raw);
      if(!Number.isFinite(n))return warn("Número inválido em "+f[1]+".");
      if(n<0&&!(allowNegative[id]||[]).includes(f[0]))return warn("Valor negativo incompatível: "+f[1]+".");
      if(n===0&&!(allowedZero[id]||[]).includes(f[0]))return warn("Valor zero incompatível: "+f[1]+".");
    }
    try{
      const validation=d.validate?.(v)||"";
      if(validation)return warn(validation);
      const [n,u]=d.calc(v);
      if(!Number.isFinite(n))return warn("Resultado indefinido; verifique unidades e indicação.");
      const detail=calcInterpret(id,n,u,v);
      const lbl=document.createElement("span");lbl.className="result-label";lbl.textContent="Resultado";
      const number=document.createElement("b");
      number.textContent=id==="dpp"?u:(n.toLocaleString("pt-BR",{maximumFractionDigits:2})+(u?" "+u:""));
      const small=document.createElement("small");small.textContent=detail;
      res.replaceChildren(lbl,number,small);
      err.textContent="";res.classList.add("show");
    }catch(e){warn("Não é possível calcular com segurança. Confirme dados e população indicada.");}
  },true);
})();