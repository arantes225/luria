/* LURIA — expansão auditável das calculadoras, 24/10/2026.
 * Executar após o catálogo original. Nenhuma função substitui prescrição clínica.
 */
(() => {
  if (typeof C === "undefined" || typeof defs === "undefined" || typeof cats === "undefined" || typeof render !== "function") return;
  const items = [
    ["Renal","ACR","Relação albumina/creatinina urinária","Albuminúria para classificação KDIGO","uacr"],
    ["Metabólico","HOMA","HOMA-IR","Estimativa de resistência à insulina em jejum","homair"],
    ["Cardiovascular","LDL-NH","Colesterol não HDL","Colesterol total menos HDL","nonhdl"],
    ["Hematologia","MENT","Índice de Mentzer","Triagem inicial entre causas de microcitose","mentzer"],
    ["Hematologia","ANC","Contagem absoluta de neutrófilos","Leucócitos e percentual total de neutrófilos","anc"],
    ["Hematologia","TSAT","Saturação de transferrina","Ferro sérico sobre capacidade total de ligação","tsat"],
    ["Hematologia","RET","Reticulócitos corrigidos","Correção pelo hematócrito do paciente","reticcorr"],
    ["Hematologia","RPI","Índice de produção reticulocitária","Reticulócitos corrigidos pelo tempo de maturação","rpi"],
    ["Respiratório","A-a","Gradiente alvéolo-arterial O₂","Equação alveolar simplificada","aagrad"],
    ["Respiratório","VT","Volume corrente protetor","Faixa calculada por peso corporal predito","tidalvt"],
    ["Pediatria","CORR","Idade corrigida da prematuridade","Semanas corrigidas para prematuridade","pretermcorr"],
    ["Obstetrícia","USG","IG pela USG prévia","Atualiza idade gestacional medida em ultrassom","igultra"],
    ["Obstetrícia","GP","Ganho ponderal gestacional","Diferença de peso desde o pré-natal","gestgain"],
    ["Queimaduras","SCQ","Regra dos nove — adulto","Percentual de superfície queimada em áreas completas","burnnine"],
    ["Queimaduras","FLD","Estimativa inicial de fluidos — adulto","ABA 2024; apenas queimadura térmica ≥20% SCQ","burnfluid"],
    ["Nutrição","TMB","Gasto energético basal — Mifflin","Equação de Mifflin–St Jeor em adultos","mifflin"],
    ["Nutrição","TDEE","Gasto energético total estimado","Estimativa basal multiplicada por fator de atividade","tdee"],
    ["Nutrição","PROT","Meta de proteína estimada","Faixa informada em g/kg/dia","protein"],
    ["Metabólico","CaI","Cálcio total em mg/dL → mmol/L","Conversão laboratorial de cálcio total","caconv"],
    ["Hematologia","PLT","Plaquetas ×10³/µL → /µL","Conversão de unidade hematológica","plateletconv"]
  ];
  const extra = {
    uacr:{fields:[["alb","Albumina urinária","number","mg/L"],["cr","Creatinina urinária","number","g/L"]],formula:"ACR = albumina (mg/L) ÷ creatinina (g/L). Repetir conforme contexto; uma medida isolada não define DRC.",calc:v=>[+v.alb/+v.cr,"mg/g"]},
    homair:{fields:[["glu","Glicemia de jejum","number","mg/dL"],["ins","Insulina de jejum","number","µUI/mL"]],formula:"HOMA-IR = glicemia × insulina ÷ 405. Não há ponto de corte universal; não usar isoladamente para diagnosticar diabetes.",calc:v=>[+v.glu*+v.ins/405,""]},
    nonhdl:{fields:[["total","Colesterol total","number","mg/dL"],["hdl","HDL colesterol","number","mg/dL"]],formula:"Colesterol não HDL = colesterol total − HDL.",calc:v=>{const n=+v.total-+v.hdl;if(n<0)throw Error("HDL superior ao total");return[n,"mg/dL"];}},
    mentzer:{fields:[["mcv","VCM","number","fL"],["rbc","Hemácias","number","milhões/µL"]],formula:"Índice de Mentzer = VCM ÷ hemácias (milhões/µL). Não diferencia sozinho talassemia e deficiência de ferro.",calc:v=>[+v.mcv/+v.rbc,""]},
    anc:{fields:[["wbc","Leucócitos","number","células/µL"],["neut","Neutrófilos totais (segmentados + bastões)","number","%"]],formula:"ANC = leucócitos × neutrófilos (%) ÷ 100.",calc:v=>{if(+v.neut>100)throw Error("Percentual >100");return[+v.wbc*+v.neut/100,"células/µL"];}},
    tsat:{fields:[["iron","Ferro sérico","number","µg/dL"],["tibc","Capacidade total de ligação do ferro","number","µg/dL"]],formula:"IST = 100 × ferro sérico ÷ TIBC.",calc:v=>{let n=100*+v.iron/+v.tibc;if(n>100)throw Error("Valores incompatíveis");return[n,"%"];}},
    reticcorr:{fields:[["pct","Reticulócitos","number","%"],["hct","Hematócrito do paciente","number","%"],["normal","Hematócrito de referência","number","%"]],formula:"Reticulócitos corrigidos (%) = reticulócitos (%) × hematócrito ÷ hematócrito de referência.",calc:v=>{if(+v.hct>100||+v.normal>100)throw Error("Hematócrito inválido");return[+v.pct*+v.hct/+v.normal,"%"];}},
    rpi:{fields:[["retic","Reticulócitos corrigidos","number","%"],["factor","Fator de maturação (1 a 2,5)","number",""]],formula:"RPI = reticulócitos corrigidos ÷ fator de maturação determinado pelo hematócrito.",calc:v=>{if(+v.factor<1||+v.factor>2.5)throw Error("Fator fora de 1–2,5");return[+v.retic/+v.factor,""];}},
    aagrad:{fields:[["fio","FiO₂","number","%"],["atm","Pressão barométrica","number","mmHg"],["co2","PaCO₂","number","mmHg"],["o2","PaO₂","number","mmHg"]],formula:"PAO₂ ≈ FiO₂ × (PB − 47) − PaCO₂/0,8; gradiente A-a = PAO₂ − PaO₂. Aproximação ao nível de referência; RQ=0,8.",calc:v=>{if(+v.fio>100||+v.atm<=47)throw Error("Dados inválidos");let n=(+v.fio/100)*(+v.atm-47)-(+v.co2/.8)-+v.o2;if(n<0)throw Error("Rever dados e condições do exame");return[n,"mmHg"];}},
    tidalvt:{fields:[["pbw","Peso corporal predito","number","kg"],["mlkg","Volume alvo","number","mL/kg"]],formula:"VT = peso corporal predito × alvo (mL/kg). Para ventilação protetora, considerar geralmente 4–8 mL/kg conforme contexto e protocolo.",calc:v=>{if(+v.mlkg<4||+v.mlkg>8)throw Error("Alvo fora da faixa protetora 4–8");return[+v.pbw*+v.mlkg,"mL"];}},
    pretermcorr:{fields:[["birth","IG ao nascer","number","semanas"],["chrono","Idade cronológica","number","semanas"]],formula:"Idade corrigida = idade cronológica − (40 − IG ao nascer). Resultado negativo indica que o termo ainda não foi atingido.",calc:v=>{if(+v.birth<22||+v.birth>=37)throw Error("Preencher IG de nascimento prematuro válida");return[+v.chrono-(40-+v.birth),"semanas"];}},
    igultra:{fields:[["scan","Data da ultrassonografia","date","data"],["weeks","IG na ultrassonografia","number","semanas"],["days","Dias adicionais","select","0|1|2|3|4|5|6"],["ref","Data de referência","date","data"]],formula:"IG atual em dias = IG no exame + (data de referência − data do exame). A datação ultrassonográfica depende do trimestre e do exame original.",calc:v=>{let day=(s)=>Date.parse(s+"T00:00:00Z")/86400000;let n=7*+v.weeks+Number(v.days)+day(v.ref)-day(v.scan);if(n<0||n>315||day(v.ref)<day(v.scan))throw Error("Datas incompatíveis");return[n/7,"semanas (decimal)"];}},
    gestgain:{fields:[["pre","Peso pré-gestacional","number","kg"],["now","Peso atual","number","kg"]],formula:"Ganho = peso atual − peso pré-gestacional. Avaliar meta pelo IMC inicial e IG; resultado não define adequação.",calc:v=>[+v.now-+v.pre,"kg"]},
    burnnine:{fields:[["head","Cabeça/pescoço completos","select","0|9"],["front","Tronco anterior completo","select","0|18"],["back","Tronco posterior completo","select","0|18"],["armr","Braço direito completo","select","0|9"],["arml","Braço esquerdo completo","select","0|9"],["legr","Perna direita completa","select","0|18"],["legl","Perna esquerda completa","select","0|18"],["per","Períneo completo","select","0|1"]],formula:"Regra dos nove em adultos; apenas áreas anatômicas INTEIRAMENTE queimadas. Queimaduras superficiais (1º grau) não entram na SCQ. Para áreas parciais/crianças, usar Lund–Browder.",calc:v=>[Object.values(v).reduce((a,b)=>a+Number(b),0),"% SCQ"]},
    burnfluid:{fields:[["w","Peso","number","kg"],["scq","SCQ com espessura parcial/profunda","number","%"]],formula:"ABA 2024: volume inicial = 2 mL × kg × %SCQ nas primeiras 24 h, adultos com ≥20% de queimadura. NÃO é prescrição fixa; titular pela resposta e diurese, avaliar queimadura elétrica/inalatória e protocolo de unidade.",calc:v=>{if(+v.scq<20||+v.scq>100)throw Error("Fora da população indicada");return[2*+v.w*+v.scq,"mL/24 h (ponto de partida)"];}},
    mifflin:{fields:[["w","Peso","number","kg"],["h","Altura","number","cm"],["age","Idade","number","anos"],["sex","Sexo","select","Feminino|Masculino"]],formula:"Mifflin–St Jeor: 10×kg + 6,25×cm − 5×anos + (homem:5; mulher:−161). Estimativa em adultos; não substitui avaliação nutricional.",calc:v=>[10*+v.w+6.25*+v.h-5*+v.age+(v.sex==="Masculino"?5:-161),"kcal/dia"]},
    tdee:{fields:[["bmr","Gasto energético basal estimado","number","kcal/dia"],["factor","Fator de atividade","select","1.2|1.375|1.55|1.725|1.9"]],formula:"Gasto diário ≈ TMB × fator de atividade. Fatores: 1,2 sedentário; 1,375 leve; 1,55 moderado; 1,725 elevado; 1,9 muito elevado.",calc:v=>[+v.bmr*Number(v.factor),"kcal/dia"]},
    protein:{fields:[["w","Peso de referência","number","kg"],["target","Meta individualizada","number","g/kg/dia"]],formula:"Proteína = peso de referência × meta (g/kg/dia). O profissional define a meta conforme idade, rim, doença e nutrição.",calc:v=>{if(+v.target>4)throw Error("Meta fora da faixa usual");return[+v.w*+v.target,"g/dia"];}},
    caconv:{fields:[["ca","Cálcio total","number","mg/dL"]],formula:"Cálcio total mmol/L = cálcio total mg/dL ÷ 4,008. Não é cálcio iônico.",calc:v=>[+v.ca/4.008,"mmol/L"]},
    plateletconv:{fields:[["plt","Plaquetas","number","mil/µL (10³/µL)"]],formula:"Plaquetas/µL = plaquetas (10³/µL) × 1000.",calc:v=>[+v.plt*1000,"/µL"]}
  };
  const messages={
    uacr:n=>n<30?"KDIGO A1 (<30 mg/g)":n<=300?"KDIGO A2 (30–300 mg/g)":"KDIGO A3 (>300 mg/g). Confirmar persistência, por pelo menos 3 meses quando aplicável.",
    homair:()=> "Não aplicar ponto de corte único a diferentes populações; insulinometria não é padronizada entre todos os laboratórios.",
    mentzer:n=>n<13?"Índice <13 pode favorecer traço talassêmico; necessita hemograma, ferritina e investigação.":"Índice ≥13 pode favorecer deficiência de ferro; confirmar laboratorialmente.",
    anc:n=>n<500?"Neutropenia grave (<500/µL). Febre requer avaliação urgente.":n<1000?"Neutropenia moderada (500–999/µL).":n<1500?"Neutropenia leve (1000–1499/µL).":"ANC ≥1500/µL; interpretar por idade e contexto.",
    tsat:()=> "Interpretar junto de ferritina, inflamação e contexto hematológico.",
    aagrad:()=> "A interpretação varia com idade, FiO₂, altitude e ventilação; não há corte universal.",
    burnfluid:()=> "Estimativa inicial, NÃO prescrição automática. Titular fluidos pelo débito urinário, perfusão e protocolos. ABA 2024 para adultos ≥20% SCQ.",
    burnnine:()=> "A regra dos nove adulta é aproximada. Para partes de segmentos ou crianças usar Lund–Browder.",
    pretermcorr:()=> "A idade corrigida é usada no seguimento de prematuros, respeitando faixa etária e contexto.",
    igultra:()=> "Resultado expresso em semanas decimais. Para semanas+dias, multiplique a fração por 7.",
    tidalvt:()=> "Confirmar peso corporal predito, gasometria, mecânica ventilatória e alvo protetor individualizado."
  };
  for (const row of items) if (!C.some(x=>x[4]===row[4])) C.push(row);
  Object.assign(defs,extra);
  Object.assign(calcInterpretations,messages);
  for (const group of new Set(items.map(x=>x[0]))) if(!cats.includes(group)) cats.push(group);
  render();
})();
