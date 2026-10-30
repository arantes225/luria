
(() => {
  const $ = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => [...r.querySelectorAll(s)];
  const esc = (v) => String(v ?? "").replace(/[&<>"']/g, m => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[m]));
  const opt = (text, value) => ({text,value});
  const yesno = (points=1) => [opt("Não",0),opt("Sim",points)];
  const q = (label, options, help="") => ({label,options,help});
  const sumInterpret = (bands) => (n) => {
    const b = bands.find(x => n >= x[0] && n <= x[1]) || bands[bands.length-1];
    return b?.[2] || "";
  };
  const refs = {
    news2:"Royal College of Physicians. National Early Warning Score (NEWS) 2, 2017.",
    sofa:"Vincent JL et al. Intensive Care Med. 1996;22:707–710.",
    heart:"Backus BE et al. Int J Cardiol. 2013;168:2153–2158.",
    wells:"Wells PS et al. Thromb Haemost. 2000;83:416–420.",
    curb:"Lim WS et al. Thorax. 2003;58:377–382.",
    nihss:"Brott T et al. Stroke. 1989;20:864–870.",
    meld:"Kim WR et al. Hepatology. 2008;47:1363–1370. MELD-Na (2016 allocation formula).",
    gbs:"Blatchford O et al. Lancet. 2000;356:1318–1321.",
    bisap:"Wu BU et al. Gut. 2008;57:1698–1703."
  };

  const scores = [
    {
      id:"gcs", name:"Escala de Coma de Glasgow", category:"Emergência", aliases:"coma consciência trauma neuro",
      desc:"Avalia o nível de consciência pelas respostas ocular, verbal e motora.", tags:["Plantão","Neurologia"],
      questions:[
        q("Abertura ocular",[opt("Espontânea",4),opt("À voz",3),opt("Ao estímulo doloroso",2),opt("Nenhuma",1)]),
        q("Resposta verbal",[opt("Orientada",5),opt("Confusa",4),opt("Palavras inapropriadas",3),opt("Sons incompreensíveis",2),opt("Nenhuma",1)]),
        q("Resposta motora",[opt("Obedece comandos",6),opt("Localiza o estímulo doloroso",5),opt("Flexão normal (retirada)",4),opt("Flexão anormal",3),opt("Extensão",2),opt("Nenhuma",1)])
      ],
      interpret: sumInterpret([[3,8,"Glasgow 3–8: comprometimento grave do nível de consciência. Avaliar via aérea e causas reversíveis; a decisão de intubação não deve depender apenas do número."],[9,12,"Glasgow 9–12: comprometimento moderado; requer reavaliação seriada e investigação da causa."],[13,15,"Glasgow 13–15: comprometimento leve ou ausência de rebaixamento importante; pequenas quedas ainda podem ser clinicamente relevantes."]]),
      reference:"Teasdale G, Jennett B. Lancet. 1974."
    },
    {id:"news2",name:"NEWS2",category:"Emergência",aliases:"deterioração sinais vitais enfermaria",desc:"Detecção de deterioração clínica a partir de parâmetros fisiológicos.",tags:["Plantão","Enfermaria"],custom:"news2",reference:refs.news2},
    {
      id:"qsofa",name:"qSOFA",category:"Emergência",aliases:"sepse infecção",desc:"Triagem prognóstica rápida em pacientes com suspeita de infecção.",tags:["Plantão","Infectologia"],
      questions:[q("FR ≥ 22 irpm",yesno()),q("PAS ≤ 100 mmHg",yesno()),q("Alteração do estado mental (GCS < 15)",yesno())],
      interpret:sumInterpret([[0,1,"qSOFA 0–1: abaixo do ponto de corte de maior risco. Não exclui sepse e não deve ser usado isoladamente como rastreio."],[2,3,"qSOFA ≥2: associado a maior risco de desfecho desfavorável em pacientes com suspeita de infecção. Não diagnostica sepse; avaliar disfunção orgânica completa."]]),
      reference:"Singer M et al. JAMA. 2016;315:801–810."
    },
    {id:"sofa",name:"SOFA",category:"Emergência",aliases:"sepse disfunção orgânica UTI",desc:"Quantifica disfunção de seis sistemas orgânicos.",tags:["UTI","Infectologia"],custom:"sofa",reference:refs.sofa},
    {
      id:"heart",name:"HEART",category:"Cardiologia",aliases:"dor torácica SCA troponina ECG",desc:"Estratifica o risco de eventos cardíacos em pacientes com dor torácica.",tags:["PS","Dor torácica"],
      questions:[
        q("História",[opt("Pouco/nada suspeita",0),opt("Moderadamente suspeita",1),opt("Altamente suspeita",2)]),
        q("ECG",[opt("Normal",0),opt("Alteração inespecífica de repolarização",1),opt("Depressão significativa do segmento ST (sem supra persistente)",2)]),
        q("Idade",[opt("<45 anos",0),opt("45–64 anos",1),opt("≥65 anos",2)]),
        q("Fatores de risco",[opt("Nenhum",0),opt("1–2",1),opt("≥3 ou doença aterosclerótica conhecida",2)]),
        q("Troponina convencional",[opt("≤ limite superior",0),opt("1–3× limite superior",1),opt("≥3× limite superior",2)],"Para hs-cTn, usar protocolo específico do ensaio.")
      ],
      interpret:sumInterpret([[0,3,"HEART 0–3: baixo risco de eventos cardíacos maiores no modelo original; usar dentro de protocolo de dor torácica com troponina adequada e ECG."],[4,6,"HEART 4–6: risco intermediário; geralmente requer observação, troponinas seriadas e estratégia adicional conforme protocolo."],[7,10,"HEART 7–10: alto risco; requer avaliação cardiológica e estratégia para SCA conforme apresentação clínica."]]),
      reference:refs.heart
    },
    {
      id:"cha2ds2vasc",name:"CHA₂DS₂-VASc",category:"Cardiologia",aliases:"fibrilação atrial AVC anticoagulação",desc:"Estimativa de risco tromboembólico em fibrilação atrial.",tags:["FA","Anticoagulação"],
      questions:[
        q("Insuficiência cardíaca / disfunção VE",yesno()),q("Hipertensão (inclusive tratada)",yesno()),
        q("Idade",[opt("<65 anos",0),opt("65–74 anos",1),opt("≥75 anos",2)]),
        q("Diabetes mellitus",yesno()),q("AVC/AIT/tromboembolismo prévio",yesno(2)),
        q("Doença vascular",yesno()),q("Sexo feminino",yesno())
      ],
      interpret:(n)=>`CHA₂DS₂-VASc ${n}. Estima risco tromboembólico na fibrilação atrial; a decisão sobre anticoagulação depende do escore, do risco hemorrágico e da diretriz vigente.`,
      reference:"Lip GYH et al. Chest. 2010;137:263–272."
    },
    {
      id:"hasbled",name:"HAS-BLED",category:"Cardiologia",aliases:"sangramento anticoagulação FA",desc:"Identifica fatores associados a maior risco de sangramento.",tags:["FA","Anticoagulação"],
      questions:[
        q("PAS persistentemente >160 mmHg",yesno()),q("Rim anormal: diálise, transplante ou creatinina ≥2,26 mg/dL",yesno()),q("Fígado anormal: cirrose, bilirrubina >2×LSN ou enzimas >3×LSN",yesno()),
        q("AVC prévio",yesno()),q("Sangramento prévio/predisposição",yesno()),q("INR lábil na varfarina (tempo na faixa terapêutica <60%)",yesno()),
        q("Idade >65 anos",yesno()),q("Fármacos predisponentes (antiagregante/AINE)",yesno()),q("Consumo excessivo de álcool (≥8 unidades/semana)",yesno())
      ],
      interpret:(n)=> n>=3 ? "HAS-BLED ≥3: alto risco de sangramento. Identifique e corrija fatores modificáveis e faça seguimento mais próximo; o escore, isoladamente, não é motivo para negar anticoagulação." : "HAS-BLED 0–2: abaixo do ponto de corte de alto risco; ainda assim, revisar fatores modificáveis e reavaliar periodicamente.",
      reference:"Pisters R et al. Chest. 2010;138:1093–1100."
    },
    {
      id:"wellspe",name:"Wells para TEP",category:"Tromboembolismo",aliases:"embolia pulmonar TEP",desc:"Probabilidade clínica pré-teste de embolia pulmonar.",tags:["PS","TEP"],
      questions:[
        q("Sinais clínicos de TVP",[opt("Não",0),opt("Sim",3)]),
        q("Diagnóstico alternativo menos provável que TEP",[opt("Não",0),opt("Sim",3)]),
        q("FC >100 bpm",[opt("Não",0),opt("Sim",1.5)]),
        q("Imobilização ≥3 dias ou cirurgia nas últimas 4 semanas",[opt("Não",0),opt("Sim",1.5)]),
        q("TEP/TVP prévia",[opt("Não",0),opt("Sim",1.5)]),
        q("Hemoptise",yesno()),q("Malignidade ativa",yesno())
      ],
      interpret:(n)=> n>4 ? "Wells >4: TEP provável no modelo de 2 níveis; a investigação costuma prosseguir diretamente para imagem conforme estabilidade e protocolo." : "Wells ≤4: TEP improvável no modelo de 2 níveis; usar D-dímero apropriado antes de imagem quando indicado.",
      reference:refs.wells
    },
    {
      id:"perc",name:"PERC",category:"Tromboembolismo",aliases:"embolia pulmonar TEP rule out",desc:"Critérios de exclusão de TEP em pacientes selecionados de baixo risco pré-teste.",tags:["PS","TEP"],
      questions:[
        q("Idade ≥50 anos",yesno()),q("FC ≥100 bpm",yesno()),q("SpO₂ <95%",yesno()),q("Edema unilateral de perna",yesno()),
        q("Hemoptise",yesno()),q("Cirurgia ou trauma com internação nas últimas 4 semanas",yesno()),q("TEP/TVP prévia",yesno()),q("Uso de estrogênio",yesno()),q("Probabilidade clínica pré-teste de TEP baixa (<15%) foi confirmada?",[opt("Sim",0),opt("Não ou incerta",1)])
      ],
      interpret:(n)=> n===0 ? "PERC 0 com probabilidade pré-teste baixa confirmada: pode permitir dispensar testes adicionais em adultos apropriados; NÃO utilizar em contexto não validado." : `PERC positivo: ${n} critério(s). Não diagnostica TEP; significa apenas que a regra não pode ser usada para encerrar a investigação.`,
      reference:"Kline JA et al. J Thromb Haemost. 2004;2:1247–1255."
    },
    {
      id:"wellsdvt",name:"Wells para TVP",category:"Tromboembolismo",aliases:"trombose venosa profunda",desc:"Probabilidade clínica pré-teste de trombose venosa profunda.",tags:["PS","TVP"],
      questions:[
        q("Câncer ativo",yesno()),q("Paralisia/paresia/imobilização de membro",yesno()),q("Acamado ≥3 dias ou cirurgia maior nas últimas 12 semanas",yesno()),
        q("Dor à palpação no sistema venoso profundo",yesno()),q("Edema de toda a perna",yesno()),q("Panturrilha ≥3 cm maior",yesno()),
        q("Edema depressível restrito à perna sintomática",yesno()),q("Veias superficiais colaterais não varicosas",yesno()),q("TVP prévia",yesno()),
        q("Diagnóstico alternativo tão provável quanto TVP",[opt("Não",0),opt("Sim",-2)])
      ],
      interpret:(n)=> n>=2 ? "Wells ≥2: TVP provável no modelo de 2 níveis; indicar ultrassonografia venosa conforme protocolo." : "Wells ≤1: TVP improvável no modelo de 2 níveis; iniciar investigação com D-dímero quando apropriado.",
      reference:"Wells PS et al. Lancet. 1997;350:1795–1798."
    },
    {
      id:"spesi",name:"sPESI",category:"Tromboembolismo",aliases:"embolia pulmonar prognóstico TEP",desc:"Estratificação prognóstica simplificada após diagnóstico de TEP.",tags:["TEP","Prognóstico"],
      questions:[q("Idade >80 anos",yesno()),q("Câncer",yesno()),q("Doença cardiopulmonar crônica",yesno()),q("FC ≥110 bpm",yesno()),q("PAS <100 mmHg",yesno()),q("SpO₂ <90%",yesno())],
      interpret:(n)=> n===0 ? "sPESI 0: baixo risco prognóstico pelo modelo. A elegibilidade para tratamento ambulatorial ainda exige estabilidade, avaliação de ventrículo direito/biomarcadores quando indicada e condições sociais adequadas." : "sPESI ≥1: não pertence ao grupo de baixo risco do modelo; requer estratificação prognóstica adicional.",
      reference:"Jiménez D et al. Arch Intern Med. 2010;170:1383–1389."
    },
    {
      id:"curb65",name:"CURB-65",category:"Respiratório",aliases:"pneumonia PAC",desc:"Estratificação de gravidade na pneumonia adquirida na comunidade.",tags:["Pneumonia","PS"],
      questions:[q("Confusão nova",yesno()),q("Ureia >7 mmol/L (≈42 mg/dL de ureia ou ≈19,6 mg/dL de BUN)",yesno()),q("FR ≥30 irpm",yesno()),q("PAS <90 ou PAD ≤60 mmHg",yesno()),q("Idade ≥65 anos",yesno())],
      interpret:sumInterpret([[0,1,"CURB-65 0–1: baixo risco pelo escore; manejo ambulatorial pode ser possível se não houver outros critérios de gravidade."],[2,2,"CURB-65 2: risco intermediário; considerar avaliação hospitalar/internação conforme contexto."],[3,5,"CURB-65 3–5: pneumonia grave pelo escore; avaliação hospitalar urgente e considerar cuidado intensivo conforme quadro."]]),
      reference:refs.curb
    },
    {id:"nihss",name:"NIHSS",category:"Neurologia",aliases:"AVC stroke déficit neurológico",desc:"Quantificação padronizada do déficit neurológico no AVC.",tags:["AVC","Neurologia"],questions:[
      q("1a. Nível de consciência",[opt("Alerta",0),opt("Sonolento",1),opt("Obnubilado",2),opt("Sem resposta/reflexa",3)]),
      q("1b. Perguntas de orientação",[opt("Ambas corretas",0),opt("Uma correta",1),opt("Nenhuma correta",2)]),
      q("1c. Comandos simples",[opt("Ambos",0),opt("Um",1),opt("Nenhum",2)]),
      q("2. Olhar conjugado",[opt("Normal",0),opt("Paralisia parcial",1),opt("Desvio forçado",2)]),
      q("3. Campos visuais",[opt("Sem perda",0),opt("Hemianopsia parcial",1),opt("Hemianopsia completa",2),opt("Cegueira bilateral",3)]),
      q("4. Paralisia facial",[opt("Normal",0),opt("Menor",1),opt("Parcial",2),opt("Completa",3)]),
      q("5a. Braço esquerdo",[opt("Sem queda",0),opt("Queda antes de 10s",1),opt("Algum esforço contra gravidade",2),opt("Sem esforço contra gravidade",3),opt("Sem movimento",4)]),
      q("5b. Braço direito",[opt("Sem queda",0),opt("Queda antes de 10s",1),opt("Algum esforço contra gravidade",2),opt("Sem esforço contra gravidade",3),opt("Sem movimento",4)]),
      q("6a. Perna esquerda",[opt("Sem queda",0),opt("Queda antes de 5s",1),opt("Algum esforço contra gravidade",2),opt("Sem esforço contra gravidade",3),opt("Sem movimento",4)]),
      q("6b. Perna direita",[opt("Sem queda",0),opt("Queda antes de 5s",1),opt("Algum esforço contra gravidade",2),opt("Sem esforço contra gravidade",3),opt("Sem movimento",4)]),
      q("7. Ataxia de membros",[opt("Ausente",0),opt("1 membro",1),opt("2 membros",2)]),
      q("8. Sensibilidade",[opt("Normal",0),opt("Perda leve/moderada",1),opt("Perda grave/total",2)]),
      q("9. Linguagem",[opt("Sem afasia",0),opt("Afasia leve/moderada",1),opt("Afasia grave",2),opt("Mudo/afasia global",3)]),
      q("10. Disartria",[opt("Normal",0),opt("Leve/moderada",1),opt("Grave/ininteligível",2)]),
      q("11. Extinção/desatenção",[opt("Ausente",0),opt("Desatenção em uma modalidade",1),opt("Desatenção profunda",2)])
    ],interpret:(n)=>n===0?"NIHSS 0/42: nenhum déficit mensurável pela escala, o que não exclui AVC, especialmente déficits posteriores ou incapacitantes não captados.":n<=4?`NIHSS ${n}/42: faixa frequentemente descrita como déficit leve. Não usar o corte isoladamente para decidir trombólise/trombectomia.`:n<=15?`NIHSS ${n}/42: déficit neurológico moderado pela classificação descritiva mais usada; tratamento depende de tempo, imagem e déficit incapacitante.`:n<=20?`NIHSS ${n}/42: déficit moderado a grave.`:`NIHSS ${n}/42: déficit grave.`,reference:refs.nihss},
    {
      id:"abcd2",name:"ABCD²",category:"Neurologia",aliases:"AIT TIA AVC",desc:"Estratificação de risco após ataque isquêmico transitório.",tags:["AIT","Neurologia"],
      questions:[
        q("Idade ≥60 anos",yesno()),q("PA inicial ≥140/90 mmHg",yesno()),
        q("Características clínicas",[opt("Outros",0),opt("Alteração da fala sem fraqueza",1),opt("Fraqueza unilateral",2)]),
        q("Duração",[opt("<10 min",0),opt("10–59 min",1),opt("≥60 min",2)]),q("Diabetes",yesno())
      ],
      interpret:sumInterpret([[0,3,"ABCD² 0–3: menor pontuação pelo modelo. Um escore baixo não exclui AIT de alto risco nem substitui avaliação etiológica urgente."],[4,5,"ABCD² 4–5: risco clínico intermediário pelo modelo; investigação de AIT deve ser rápida."],[6,7,"ABCD² 6–7: maior risco precoce de AVC pelo modelo; requer avaliação urgente."]]),
      reference:"Johnston SC et al. Lancet. 2007;369:283–292."
    },
    {
      id:"childpugh",name:"Child-Pugh",category:"Gastro/Hepato",aliases:"cirrose fígado hepatopatia",desc:"Classifica a gravidade e o prognóstico da cirrose.",tags:["Hepatologia","Cirrose"],
      questions:[
        q("Bilirrubina total",[opt("<2 mg/dL",1),opt("2–3 mg/dL",2),opt(">3 mg/dL",3)]),
        q("Albumina",[opt(">3,5 g/dL",1),opt("2,8–3,5 g/dL",2),opt("<2,8 g/dL",3)]),
        q("INR (sem interferência de anticoagulante)",[opt("<1,7",1),opt("1,7–2,3",2),opt(">2,3",3)]),
        q("Ascite",[opt("Ausente",1),opt("Leve/controlada",2),opt("Moderada/grave/refratária",3)]),
        q("Encefalopatia",[opt("Ausente",1),opt("Grau I–II",2),opt("Grau III–IV",3)])
      ],
      interpret:sumInterpret([[5,6,"Child-Pugh A (5–6): menor comprometimento da reserva hepática."],[7,9,"Child-Pugh B (7–9): comprometimento moderado da reserva hepática."],[10,15,"Child-Pugh C (10–15): comprometimento grave da reserva hepática e pior prognóstico."]]),
      reference:"Pugh RNH et al. Br J Surg. 1973;60:646–649."
    },
    {id:"meldna",name:"MELD-Na",category:"Gastro/Hepato",aliases:"cirrose transplante sódio INR creatinina bilirrubina",desc:"Pontuação prognóstica baseada em bilirrubina, INR, creatinina e sódio.",tags:["Hepatologia","Cirrose"],custom:"meldna",reference:refs.meld},
    {id:"gbs",name:"Glasgow-Blatchford",category:"Gastro/Hepato",aliases:"hemorragia digestiva alta HDA",desc:"Estratificação inicial de risco na hemorragia digestiva alta.",tags:["HDA","PS"],custom:"gbs",reference:refs.gbs},
    {
      id:"bisap",name:"BISAP",category:"Gastro/Hepato",aliases:"pancreatite aguda",desc:"Estratificação precoce de gravidade na pancreatite aguda.",tags:["Pancreatite","PS"],
      questions:[q("BUN >25 mg/dL (nitrogênio ureico, não ureia total)",yesno()),q("Alteração do estado mental (GCS <15)",yesno()),q("SIRS ≥2 critérios nas primeiras 24 h",yesno()),q("Idade >60 anos",yesno()),q("Derrame pleural",yesno())],
      interpret:(n)=>n>=3?`BISAP ${n}/5: faixa de maior risco; escores ≥3 se associam a maior probabilidade de pancreatite grave e mortalidade.`:`BISAP ${n}/5: faixa de menor risco pelo escore; reavaliar clinicamente porque a gravidade pode evoluir nas primeiras 24–48 h.`,
      reference:refs.bisap
    },
    {
      id:"alvarado",name:"Alvarado",category:"Cirurgia",aliases:"apendicite MANTRELS",desc:"Estima a probabilidade clínica de apendicite aguda.",tags:["Cirurgia","Abdome agudo"],
      questions:[q("Migração da dor para FID",yesno()),q("Anorexia",yesno()),q("Náuseas/vômitos",yesno()),q("Dor à palpação em FID",yesno(2)),q("Descompressão dolorosa",yesno()),q("Temperatura ≥37,3 °C",yesno()),q("Leucócitos >10.000/µL",yesno(2)),q("Neutrófilos >75% ou desvio à esquerda",yesno())],
      interpret:sumInterpret([[0,4,"Alvarado 0–4: apendicite menos provável; observar evolução e considerar diagnósticos alternativos se a suspeita clínica persistir."],[5,6,"Alvarado 5–6: quadro compatível/intermediário; costuma justificar observação e investigação adicional."],[7,8,"Alvarado 7–8: alta probabilidade clínica de apendicite."],[9,10,"Alvarado 9–10: probabilidade clínica muito alta pelo escore."]]),
      reference:"Alvarado A. Ann Emerg Med. 1986;15:557–564."
    },
    {
      id:"padua",name:"Padua",category:"Tromboembolismo",aliases:"TEV profilaxia paciente clínico",desc:"Risco de tromboembolismo venoso em pacientes clínicos hospitalizados.",tags:["Enfermaria","TEV"],
      questions:[
        q("Câncer ativo",yesno(3)),q("TEV prévio",yesno(3)),q("Mobilidade reduzida com previsão de repouso ≥3 dias",yesno(3)),q("Trombofilia conhecida",yesno(3)),
        q("Trauma/cirurgia recente",yesno(2)),q("Idade ≥70 anos",yesno()),q("Insuficiência cardíaca/respiratória",yesno()),
        q("IAM ou AVC isquêmico agudo",yesno()),q("Infecção aguda/doença reumatológica",yesno()),q("Obesidade (IMC ≥30)",yesno()),q("Tratamento hormonal estrogênico",yesno())
      ],
      interpret:(n)=>n>=4?"≥4: alto risco de TEV pelo Padua.":"<4: baixo risco de TEV pelo Padua.",
      reference:"Barbar S et al. J Thromb Haemost. 2010;8:2450–2457."
    },
    {
      id:"apfel",name:"Apfel",category:"Cirurgia",aliases:"PONV náusea vômito pós operatório anestesia",desc:"Risco simplificado de náusea e vômito pós-operatório.",tags:["Anestesia","Pós-op"],
      questions:[q("Sexo feminino",yesno()),q("Não fumante",yesno()),q("História de PONV/cinetose",yesno()),q("Uso de opioide no pós-operatório",yesno())],
      interpret:(n)=>`Apfel ${n}/4. A probabilidade de PONV aumenta progressivamente com o número de fatores.`,
      reference:"Apfel CC et al. Anesthesiology. 1999;91:693–700."
    },
    {
      id:"bishop",name:"Bishop",category:"Obstetrícia",aliases:"colo uterino indução parto",desc:"Avaliação cervical antes de indução do trabalho de parto.",tags:["GO","Obstetrícia"],
      questions:[
        q("Dilatação",[opt("Fechado",0),opt("1–2 cm",1),opt("3–4 cm",2),opt("≥5 cm",3)]),
        q("Apagamento",[opt("0–30%",0),opt("40–50%",1),opt("60–70%",2),opt("≥80%",3)]),
        q("Estação",[opt("-3",0),opt("-2",1),opt("-1/0",2),opt("+1/+2",3)]),
        q("Consistência",[opt("Firme",0),opt("Média",1),opt("Amolecida",2)]),
        q("Posição",[opt("Posterior",0),opt("Média",1),opt("Anterior",2)])
      ],
      interpret:(n)=>n>=8?`Bishop ${n}/13: colo geralmente considerado favorável à indução.`:n<=5?`Bishop ${n}/13: colo desfavorável; costuma haver maior chance de necessidade de maturação cervical antes da indução.`:`Bishop ${n}/13: faixa intermediária; interpretar com paridade, indicação e protocolo obstétrico.`,
      reference:"Bishop EH. Obstet Gynecol. 1964;24:266–268."
    },
    {
      id:"apgar",name:"Apgar",category:"Pediatria",aliases:"recém nascido RN neonatal",desc:"Avaliação do recém-nascido em momentos padronizados após o nascimento.",tags:["Neonatologia","Pediatria"],
      questions:[
        q("Aparência/cor",[opt("Cianose/palidez",0),opt("Corpo rosado, extremidades cianóticas",1),opt("Rosado",2)]),
        q("Pulso",[opt("Ausente",0),opt("<100 bpm",1),opt("≥100 bpm",2)]),
        q("Irritabilidade reflexa",[opt("Ausente",0),opt("Careta",1),opt("Choro/tosse/espirro",2)]),
        q("Tônus muscular",[opt("Flácido",0),opt("Alguma flexão",1),opt("Movimento ativo",2)]),
        q("Respiração",[opt("Ausente",0),opt("Lenta/irregular",1),opt("Boa, choro forte",2)])
      ],
      interpret:(n)=>n>=7?`Apgar ${n}/10: aos 5 minutos, 7–10 é considerado tranquilizador em RN termo/tardio. Registrar no minuto correspondente; não usar para decidir o início da reanimação.`:n>=4?`Apgar ${n}/10: aos 5 minutos, 4–6 é moderadamente anormal. Reavaliar e manter suporte conforme condição clínica; não usar isoladamente para definir reanimação.`:`Apgar ${n}/10: aos 5 minutos, 0–3 é baixo e indica condição neonatal importante, mas não define asfixia nem prognóstico isoladamente.`,
      reference:"Apgar V. Curr Res Anesth Analg. 1953;32:260–267."
    },
    {
      id:"mascc",name:"MASCC",category:"Infectologia",aliases:"neutropenia febril câncer",desc:"Estratificação de risco em neutropenia febril.",tags:["Oncologia","Infectologia"],
      questions:[
        q("Intensidade dos sintomas da doença",[opt("Grave",0),opt("Moderada",3),opt("Leve ou ausente",5)]),
        q("Sem hipotensão",yesno(5)),q("Sem DPOC",yesno(4)),q("Tumor sólido/sem infecção fúngica prévia em neoplasia hematológica",yesno(4)),
        q("Sem desidratação que exija hidratação intravenosa",yesno(3)),q("Paciente ambulatorial ao início da febre",yesno(3)),q("Idade <60 anos",yesno(2))
      ],
      interpret:(n)=>n>=21?"≥21: baixo risco pelo MASCC.":"<21: não classificado como baixo risco pelo MASCC.",
      reference:"Klastersky J et al. J Clin Oncol. 2000;18:3038–3051."
    },
    {
      id:"stopbang",name:"STOP-BANG",category:"Respiratório",aliases:"apneia sono ronco",desc:"Rastreia risco de apneia obstrutiva do sono.",tags:["Sono","Pré-op"],
      questions:[q("Ronco alto",yesno()),q("Cansaço/sonolência diurna",yesno()),q("Apneia observada",yesno()),q("Hipertensão",yesno()),q("IMC >35 kg/m² (não ≥35)",yesno()),q("Idade >50 anos",yesno()),q("Circunferência cervical >40 cm",yesno()),q("Sexo masculino",yesno())],
      interpret:sumInterpret([[0,2,"Baixo risco pelo STOP-BANG"],[3,4,"Risco intermediário"],[5,8,"Alto risco"]]),
      reference:"Chung F et al. Anesthesiology. 2008;108:812–821."
    },
    {
      id:"grace",name:"GRACE",category:"Cardiologia",aliases:"SCA síndrome coronariana aguda IAM NSTEMI angina instável",desc:"Estima o risco prognóstico na síndrome coronariana aguda.",tags:["SCA","PS"],custom:"grace",
      reference:"Fox KAA et al. BMJ. 2006;333:1091. Diretrizes brasileiras de SCA utilizam GRACE para estratificação."
    },
    {
      id:"timi_ua",name:"TIMI — SCA sem supra",category:"Cardiologia",aliases:"TIMI SCA NSTEMI angina instável infarto",desc:"Risco de eventos em SCA sem supradesnivelamento do ST.",tags:["SCA","PS"],
      questions:[
        q("Idade ≥65 anos",yesno()),q("≥3 fatores de risco para DAC",yesno()),q("DAC conhecida (estenose ≥50%)",yesno()),
        q("Uso de AAS nos últimos 7 dias",yesno()),q("≥2 episódios de angina nas últimas 24 h",yesno()),
        q("Desvio de ST ≥0,5 mm",yesno()),q("Marcador de necrose miocárdica elevado",yesno())
      ],
      interpret:(n)=>{const risk=[4.7,4.7,8.3,13.2,19.9,26.2,40.9,40.9][n]??null;return `TIMI ${n}/7${risk!==null?` — risco de aproximadamente ${String(risk).replace(".",",")}% do desfecho composto em 14 dias na coorte original`:``}. Use como estratificação complementar na SCA sem supra.`;},
      reference:"Antman EM et al. JAMA. 2000;284:835–842."
    },
    {
      id:"rcri",name:"RCRI (Lee)",category:"Cardiologia",aliases:"risco cardíaco perioperatório cirurgia lee",desc:"Estimativa de risco cardíaco em cirurgia não cardíaca.",tags:["Pré-op","Cirurgia"],
      questions:[
        q("Cirurgia de alto risco",yesno()),q("Doença cardíaca isquêmica",yesno()),q("Insuficiência cardíaca",yesno()),
        q("Doença cerebrovascular",yesno()),q("Diabetes em uso de insulina",yesno()),q("Creatinina ≥2,0 mg/dL",yesno())
      ],
      interpret:(n)=>n===0?"RCRI 0: nenhum preditor clínico do índice; menor estrato de risco pelo RCRI.":n===1?"RCRI 1: um preditor clínico; risco perioperatório acima do grupo sem fatores.":n===2?"RCRI 2: dois preditores clínicos; risco perioperatório aumentado.":"RCRI ≥3: maior estrato de risco pelo RCRI; integrar tipo de cirurgia, capacidade funcional e avaliação cardiovascular perioperatória.",
      reference:"Lee TH et al. Circulation. 1999;100:1043–1049. Diretriz SBC de Avaliação Cardiovascular Perioperatória 2024."
    },
    {
      id:"cha2ds2va",name:"CHA₂DS₂-VA",category:"Cardiologia",aliases:"fibrilação atrial FA AVC anticoagulação 2025 brasil",desc:"Escore tromboembólico adotado na Diretriz Brasileira de Fibrilação Atrial 2025.",tags:["FA","Anticoagulação"],
      questions:[
        q("Insuficiência cardíaca / disfunção VE",yesno()),q("Hipertensão",yesno()),
        q("Idade",[opt("<65 anos",0),opt("65–74 anos",1),opt("≥75 anos",2)]),
        q("Diabetes mellitus",yesno()),q("AVC/AIT/tromboembolismo prévio",yesno(2)),q("Doença vascular",yesno())
      ],
      interpret:(n)=>n>=2?`CHA₂DS₂-VA ${n}: faixa em que anticoagulação oral é geralmente recomendada nas diretrizes contemporâneas, salvo contraindicação.`:n===1?`CHA₂DS₂-VA 1: anticoagulação deve ser considerada após avaliação individual de benefício e risco.`:`CHA₂DS₂-VA 0: risco tromboembólico baixo pelo escore; anticoagulação por FA não é indicada apenas com base nesse escore.`,
      reference:"Diretriz Brasileira de Fibrilação Atrial – 2025. Arq Bras Cardiol. 2025;122(9):e20250618."
    },
    {
      id:"crb65",name:"CRB-65",category:"Respiratório",aliases:"pneumonia PAC atenção primária emergência",desc:"Versão do CURB-65 sem ureia, útil quando laboratório não está disponível.",tags:["Pneumonia","APS"],
      questions:[q("Confusão nova",yesno()),q("FR ≥30 irpm",yesno()),q("PAS <90 ou PAD ≤60 mmHg",yesno()),q("Idade ≥65 anos",yesno())],
      interpret:sumInterpret([[0,0,"CRB-65 0: baixo risco pelo escore; manejo ambulatorial pode ser possível se o restante da avaliação for favorável."],[1,2,"CRB-65 1–2: risco intermediário; avaliar com atenção necessidade de encaminhamento/internação."],[3,4,"CRB-65 3–4: alto risco; requer avaliação hospitalar urgente."]]),
      reference:"Recomendações brasileiras para manejo da pneumonia adquirida na comunidade, J Bras Pneumol. 2018."
    },
    {
      id:"psi",name:"PSI / PORT",category:"Respiratório",aliases:"pneumonia severity index PORT PAC",desc:"Índice de gravidade da pneumonia com variáveis demográficas, clínicas e laboratoriais.",tags:["Pneumonia","PS"],custom:"psi",
      reference:"Fine MJ et al. N Engl J Med. 1997;336:243–250. Recomendado nas diretrizes brasileiras de PAC."
    },
    {
      id:"ichscore",name:"ICH Score",category:"Neurologia",aliases:"hemorragia intracerebral AVC hemorrágico",desc:"Estratificação prognóstica inicial na hemorragia intracerebral espontânea.",tags:["AVC","Neuro"],
      questions:[
        q("Glasgow",[opt("13–15",0),opt("5–12",1),opt("3–4",2)]),
        q("Volume do hematoma ≥30 mL",yesno()),q("Hemorragia intraventricular",yesno()),q("Origem infratentorial",yesno()),q("Idade ≥80 anos",yesno())
      ],
      interpret:(n)=>`ICH Score ${n}/6. Pontua gravidade prognóstica inicial da hemorragia intracerebral; quanto maior o escore, maior a mortalidade observada nas coortes de validação. Não usar isoladamente para limitar tratamento ou definir prognóstico individual.`,
      reference:"Hemphill JC et al. Stroke. 2001;32:891–897."
    },
    {
      id:"hunthess",name:"Hunt-Hess",category:"Neurologia",aliases:"hemorragia subaracnoide HSA aneurisma",desc:"Classificação clínica da gravidade da hemorragia subaracnoide.",tags:["HSA","Neuro"],
      questions:[q("Estado clínico",[opt("Grau I — assintomático ou cefaleia leve/rigidez nucal discreta",1),opt("Grau II — cefaleia moderada/grave, rigidez nucal, sem déficit exceto pares cranianos",2),opt("Grau III — sonolência/confusão ou déficit focal leve",3),opt("Grau IV — estupor, hemiparesia moderada/grave",4),opt("Grau V — coma profundo, rigidez descerebrada, moribundo",5)])],
      interpret:(n)=>`Hunt-Hess grau ${n}. Graus mais altos correspondem a pior condição clínica inicial na HSA e maior risco de complicações; interpretar após estabilização e junto à avaliação neurológica completa.`,
      reference:"Hunt WE, Hess RM. J Neurosurg. 1968;28:14–20."
    },
    {
      id:"mfisher",name:"Fisher modificada",category:"Neurologia",aliases:"hemorragia subaracnoide HSA vasoespasmo tomografia",desc:"Classificação tomográfica da HSA relacionada ao risco de vasoespasmo.",tags:["HSA","Neuro"],
      questions:[q("TC de crânio",[opt("0 — sem HSA ou hemorragia intraventricular",0),opt("1 — HSA fina, sem hemorragia intraventricular",1),opt("2 — HSA fina com hemorragia intraventricular",2),opt("3 — HSA espessa, sem hemorragia intraventricular",3),opt("4 — HSA espessa com hemorragia intraventricular",4)])],
      interpret:(n)=>n<=1?`Fisher modificada ${n}: menor carga de sangue subaracnoideo/intraventricular e menor risco relativo de vasoespasmo sintomático.`:`Fisher modificada ${n}: maior carga hemorrágica e maior risco de vasoespasmo sintomático, especialmente nos graus 3–4.`,
      reference:"Frontera JA et al. Neurosurgery. 2006;59:21–27."
    },
    {
      id:"caprini",name:"Caprini",category:"Cirurgia",aliases:"TEV trombose profilaxia cirurgia perioperatório",desc:"Estratificação de risco de tromboembolismo venoso em pacientes cirúrgicos.",tags:["Cirurgia","TEV"],
      questions:[
        q("Idade 41–60 anos",yesno()),q("Cirurgia menor",yesno()),q("IMC >25 kg/m²",yesno()),q("Edema de membros inferiores",yesno()),q("Varizes",yesno()),
        q("Gestação/puerpério",yesno()),q("ACO ou terapia hormonal",yesno()),q("Sepse (<1 mês)",yesno()),q("Doença pulmonar grave / função pulmonar anormal",yesno()),q("IAM (<1 mês)",yesno()),q("ICC (<1 mês)",yesno()),
        q("Idade 61–74 anos",yesno(2)),q("Cirurgia >45 min",yesno(2)),q("Cirurgia laparoscópica >45 min",yesno(2)),q("Neoplasia",yesno(2)),q("Acamado >72 h",yesno(2)),q("Acesso venoso central",yesno(2)),
        q("Idade ≥75 anos",yesno(3)),q("História de TEV",yesno(3)),q("História familiar de TEV",yesno(3)),q("Trombofilia conhecida",yesno(3)),
        q("AVC recente (<1 mês)",yesno(5)),q("Artroplastia eletiva",yesno(5)),q("Fratura de quadril/pelve/perna",yesno(5)),q("Lesão medular aguda (<1 mês)",yesno(5))
      ],
      interpret:(n)=>n===0?"Caprini 0: risco muito baixo de TEV pelo modelo.":n<=2?"Caprini 1–2: baixo risco de TEV.":n<=4?"Caprini 3–4: risco moderado de TEV.":"Caprini ≥5: alto risco de TEV; a profilaxia deve seguir o tipo de cirurgia, risco hemorrágico e protocolo institucional.",
      reference:"Caprini JA. Dis Mon. 2005;51:70–78. Modelo utilizado em protocolos hospitalares brasileiros."
    },
    {
      id:"ciwaar",name:"CIWA-Ar",category:"Psiquiatria/Toxicologia",aliases:"abstinência álcool SAA delirium tremens",desc:"Avaliação da gravidade da síndrome de abstinência do álcool.",tags:["Álcool","Urgência"],
      questions:[
        q("Náuseas e vômitos",[opt("Nenhum",0),opt("Leve",1),opt("2",2),opt("3",3),opt("4",4),opt("5",5),opt("6",6),opt("Constante",7)]),
        q("Tremor",[opt("Nenhum",0),opt("1",1),opt("2",2),opt("3",3),opt("Moderado",4),opt("5",5),opt("6",6),opt("Grave",7)]),
        q("Sudorese paroxística",[opt("Nenhuma",0),opt("1",1),opt("2",2),opt("3",3),opt("Moderada",4),opt("5",5),opt("6",6),opt("Profusa",7)]),
        q("Ansiedade",[opt("Nenhuma",0),opt("1",1),opt("2",2),opt("3",3),opt("Moderada",4),opt("5",5),opt("6",6),opt("Pânico",7)]),
        q("Agitação",[opt("Normal",0),opt("1",1),opt("2",2),opt("3",3),opt("Moderada",4),opt("5",5),opt("6",6),opt("Grave",7)]),
        q("Distúrbios táteis",[opt("Nenhum",0),opt("1",1),opt("2",2),opt("3",3),opt("Moderado",4),opt("5",5),opt("6",6),opt("Alucinações contínuas",7)]),
        q("Distúrbios auditivos",[opt("Nenhum",0),opt("1",1),opt("2",2),opt("3",3),opt("Moderado",4),opt("5",5),opt("6",6),opt("Alucinações contínuas",7)]),
        q("Distúrbios visuais",[opt("Nenhum",0),opt("1",1),opt("2",2),opt("3",3),opt("Moderado",4),opt("5",5),opt("6",6),opt("Alucinações contínuas",7)]),
        q("Cefaleia / plenitude cefálica",[opt("Nenhuma",0),opt("1",1),opt("2",2),opt("3",3),opt("Moderada",4),opt("5",5),opt("6",6),opt("Extremamente grave",7)]),
        q("Orientação",[opt("Orientado",0),opt("Não sabe data / cálculo seriado incerto",1),opt("Desorientado na data em até 2 dias",2),opt("Desorientado na data >2 dias",3),opt("Desorientado em lugar/pessoa",4)])
      ],
      interpret:(n)=>n<=9?"CIWA-Ar 0–9: abstinência leve; monitorização e tratamento dependem de sintomas, comorbidades e protocolo.":n<=18?"CIWA-Ar 10–18: abstinência moderada; geralmente requer tratamento farmacológico guiado por sintomas e monitorização próxima.":"CIWA-Ar ≥19: abstinência grave, com maior risco de complicações; requer manejo intensivo conforme protocolo.",
      reference:"Ministério da Saúde — Linha de Cuidado para Transtornos por Uso de Álcool no Adulto; CIWA-Ar."
    },
    {
      id:"rts",name:"RTS — Revised Trauma Score",category:"Trauma",aliases:"trauma escore fisiológico Glasgow PAS FR",desc:"Escore fisiológico para avaliação de gravidade no trauma.",tags:["Trauma","Emergência"],custom:"rts",
      reference:"Champion HR et al. J Trauma. 1989;29:623–629. Escalas de trauma são previstas em protocolos brasileiros de atendimento."
    }
,
    {
      id:"hints",name:"HINTS",category:"Neurologia",aliases:"vertigem síndrome vestibular aguda head impulse nistagmo skew AVC posterior",desc:"Diferencia padrão vestibular periférico de sinais sugestivos de causa central na síndrome vestibular aguda.",tags:["Vertigem","AVC"],custom:"hints",
      reference:"Kattah JC et al. Stroke. 2009;40:3504–3510. Aplicável à síndrome vestibular aguda com nistagmo espontâneo e examinador treinado."
    },
    {
      id:"cage",name:"CAGE",category:"Psiquiatria/Toxicologia",aliases:"álcool etilismo uso nocivo dependência rastreio",desc:"Rastreia possível uso problemático de álcool por quatro perguntas.",tags:["Álcool","APS"],
      questions:[
        q("Já sentiu que deveria diminuir a quantidade de bebida?",yesno()),
        q("As pessoas já o incomodaram criticando seu modo de beber?",yesno()),
        q("Já se sentiu culpado por beber?",yesno()),
        q("Já bebeu pela manhã para aliviar nervosismo ou ressaca (eye-opener)?",yesno())
      ],
      interpret:(n)=>n>=2?`CAGE ${n}/4: rastreio positivo (≥2 respostas positivas). Indica necessidade de avaliação mais detalhada do padrão de consumo e de transtorno por uso de álcool; não estabelece diagnóstico.`:n===1?"CAGE 1/4: abaixo do ponto de corte clássico, mas uma resposta positiva merece exploração clínica do consumo de álcool.":"CAGE 0/4: rastreio negativo pelo ponto de corte clássico; não exclui consumo de risco em todas as populações.",
      reference:"Ewing JA. JAMA. 1984;252:1905–1907."
    },
    {
      id:"fagerstrom",name:"Fagerström",category:"Preventiva",aliases:"tabagismo nicotina dependência cigarro fumo",desc:"Estima o grau de dependência física à nicotina em pessoas que fumam cigarros.",tags:["Tabagismo","APS"],
      questions:[
        q("Quanto tempo após acordar fuma o primeiro cigarro?",[opt("Até 5 minutos",3),opt("6–30 minutos",2),opt("31–60 minutos",1),opt("Após 60 minutos",0)]),
        q("É difícil ficar sem fumar em locais onde é proibido?",yesno()),
        q("Qual cigarro seria mais difícil de abandonar?",[opt("O primeiro da manhã",1),opt("Qualquer outro",0)]),
        q("Quantos cigarros fuma por dia?",[opt("Até 10",0),opt("11–20",1),opt("21–30",2),opt("31 ou mais",3)]),
        q("Fuma com maior frequência nas primeiras horas após acordar?",yesno()),
        q("Fuma mesmo quando está doente e precisa permanecer acamado?",yesno())
      ],
      interpret:(n)=>n<=2?`Fagerström ${n}/10: dependência muito baixa à nicotina.`:n<=4?`Fagerström ${n}/10: dependência baixa à nicotina.`:n===5?"Fagerström 5/10: dependência média à nicotina.":n<=7?`Fagerström ${n}/10: dependência elevada à nicotina.`:`Fagerström ${n}/10: dependência muito elevada à nicotina.`,
      reference:"Heatherton TF et al. Br J Addict. 1991;86:1119–1127. Classificação utilizada pelo INCA/Ministério da Saúde."
    },
    {
      id:"framingham",name:"Framingham — risco CV em 10 anos",category:"Preventiva",aliases:"risco cardiovascular global prevenção primária colesterol hipertensão tabagismo diabetes Ministério Saúde",desc:"Estima o risco cardiovascular global em 10 anos pela equação contínua de Framingham.",tags:["Risco CV","APS"],custom:"framingham",
      reference:"D'Agostino RB Sr et al. Circulation. 2008;117:743–753. Faixas <10%, 10–20% e >20% são usadas em materiais do Ministério da Saúde para estratificação de risco."
    },
    {
      id:"centor",name:"Centor / McIsaac",category:"Infectologia",aliases:"faringite faringoamigdalite streptococcus estreptococo garganta",desc:"Estimativa clínica da probabilidade de faringoamigdalite estreptocócica.",tags:["APS","PS"],
      questions:[
        q("Febre >38 °C",yesno()),
        q("Ausência de tosse",yesno()),
        q("Exsudato ou edema tonsilar",yesno()),
        q("Linfonodos cervicais anteriores dolorosos",yesno()),
        q("Idade",[opt("3–14 anos",1),opt("15–44 anos",0),opt("≥45 anos",-1)])
      ],
      interpret:(n)=>n<=0?"McIsaac ≤0: baixa probabilidade de estreptococo do grupo A; em geral não testar nem tratar empiricamente, salvo contexto específico.":n===1?"McIsaac 1: baixa probabilidade; geralmente sem indicação de antibiótico empírico.":n<=3?"McIsaac 2–3: probabilidade intermediária; confirmar com teste rápido/cultura quando disponível antes de antibiótico.":"McIsaac ≥4: maior probabilidade clínica; ainda assim, confirmação microbiológica é preferível quando disponível e a conduta deve seguir o protocolo local.",
      reference:"Centor RM et al. Med Decis Making. 1981;1:239–246; McIsaac WJ et al. CMAJ. 1998;158:75–83."
    }

  ];


  // Auditoria clínica 3/6: primeiros 19 escores.
  const auditedScoreIds=["gcs","news2","qsofa","sofa","heart","cha2ds2vasc","hasbled","wellspe","perc","wellsdvt","spesi","curb65","nihss","abcd2","childpugh","meldna","gbs","bisap","alvarado"];
  if(JSON.stringify(scores.slice(0,19).map(s=>s.id))!==JSON.stringify(auditedScoreIds))throw Error("Ordem dos primeiros 19 escores mudou");
  const auditedNotes=["Registrar E/V/M individualmente; componentes não testáveis (intubação, edema, sedação) não devem receber pontuação normal/mínima arbitrária.","NEWS2 adulto: Escala 2 somente para hipercapnia confirmada e alvo SpO₂ 88–92% prescrito; uso contextualizado.","qSOFA não serve como triagem exclusiva nem exclui sepse com pontuação baixa.","SOFA clássico requer informação de suporte ventilatório, drogas vasoativas ≥1 hora, diurese/creatinina e nível basal.","HEART para dor torácica sem supra persistente; se ECG sugere STEMI, seguir protocolo de reperfusão, sem atrasar por escore. Necessita troponina e avaliação seriada.","Sexo feminino isoladamente não indica anticoagulação. Considerar também CHA₂DS₂-VA e diretriz aplicável.","HAS-BLED destaca riscos modificáveis; não é motivo isolado para negar anticoagulação.","Wells TEP prediz probabilidade pré-teste; usar algoritmo com D-dímero e/ou imagem conforme apresentação.","PERC apenas em paciente selecionado com baixa probabilidade pré-teste clínica, nunca em alto risco.","Wells TVP estima probabilidade pré-teste; confirmar diagnóstico por teste apropriado.","sPESI é prognóstico APÓS TEP confirmado, não exclui TEP ou habilita alta isoladamente.","Ureia >7 mmol/L corresponde aproximadamente a 42 mg/dL de ureia OU 19,6 mg/dL de BUN.","NIHSS exige examinador treinado. Itens não testáveis não podem ser pontuados como normais.","ABCD² baixo não permite descartar AIT nem dispensar investigação urgente.","INR, ascite e encefalopatia podem ser afetados por tratamento e comorbidades; avaliar causa.","MELD-Na é modelo HISTÓRICO de 2016; para alocação atual de adulto usar MELD 3.0 OPTN.","GBS depende de BUN, hemoglobina e informações clínicas; resultado não substitui estabilidade clínica.","BISAP é calculado nas primeiras 24h; SIRS corresponde a 2 ou mais critérios.","Alvarado é instrumento auxiliar na apendicite; sintomas atípicos e gravidez requerem abordagem própria."];
  for(let i=0;i<auditedScoreIds.length;i++){
    const score=scores[i]; score.auditDate="2026-10-24";score.safetyNote=auditedNotes[i];
    if(!score.reference)throw Error("Escore sem fonte: "+score.id);
  }
  // Ampliação clínica — 24/10/2026. Pontuações dependem de preenchimento integral.
  // Classificações diagnósticas não devem ser usadas como diagnóstico definitivo.
  const expandedScoreDefs = [
    {id:"sirs",name:"SIRS",category:"Emergência",aliases:"resposta inflamatória sistêmica infecção sepse",
      desc:"Critérios inflamatórios inespecíficos; não diagnostica sepse.",tags:["Plantão","Infecção"],
      questions:[q("Temperatura >38 °C ou <36 °C",yesno()),q("FC >90 bpm",yesno()),q("FR >20/min ou PaCO₂ <32 mmHg",yesno()),q("Leucócitos >12.000 ou <4.000/µL ou >10% bastões",yesno())],
      interpret:n=>n>=2?"SIRS ≥2 critérios. Não indica necessariamente infecção ou sepse; investigar causa e disfunção orgânica.":"SIRS <2 não exclui infecção grave ou sepse.",
      reference:"Bone RC et al. Chest. 1992;101:1644–1655; Surviving Sepsis Campaign."},
    {id:"nyha",name:"Classe funcional NYHA",category:"Cardiologia",aliases:"insuficiência cardíaca dispneia esforço",
      desc:"Classifica sintomas e limitação funcional da insuficiência cardíaca.",tags:["IC","Ambulatório"],
      questions:[q("Limitação aos esforços",[opt("I — sem limitação da atividade habitual",1),opt("II — sintomas com atividade habitual",2),opt("III — sintomas com atividade menor que a habitual",3),opt("IV — sintomas em repouso",4)])],
      interpret:n=>"NYHA "+["","I","II","III","IV"][n]+". Classificação sintomática; complementar com exame físico e avaliação objetiva.",
      reference:"New York Heart Association functional classification; diretrizes SBC."},
    {id:"geneva",name:"Genebra revisado — TEP",category:"Tromboembolismo",aliases:"revised Geneva embolia pulmonar probabilidade",
      desc:"Probabilidade clínica pré-teste de TEP.",tags:["PS","TEP"],
      questions:[
        q("Idade >65 anos",yesno()),q("TVP ou TEP anterior",[opt("Não",0),opt("Sim",3)]),
        q("Cirurgia com anestesia geral ou fratura de membro inferior no último mês",[opt("Não",0),opt("Sim",2)]),
        q("Câncer ativo",[opt("Não",0),opt("Sim",2)]),
        q("Dor unilateral em membro inferior",[opt("Não",0),opt("Sim",3)]),
        q("Hemoptise",[opt("Não",0),opt("Sim",2)]),
        q("Frequência cardíaca",[opt("<75 bpm",0),opt("75–94 bpm",3),opt("≥95 bpm",5)]),
        q("Dor à palpação venosa profunda e edema unilateral",[opt("Não",0),opt("Sim",4)])
      ],
      interpret:n=>n<=3?"Baixa probabilidade clínica (0–3). Integrar com algoritmo de TEP.":n<=10?"Probabilidade intermediária (4–10). Investigar por protocolo.":"Alta probabilidade (≥11). Investigar prontamente conforme estabilidade.",
      reference:"Le Gal G et al. Ann Intern Med. 2006;144:165–171."},
    {id:"fourts",name:"4Ts — trombocitopenia induzida por heparina",category:"Hematologia",aliases:"HIT heparina trombose plaquetas",
      desc:"Probabilidade pré-teste de trombocitopenia induzida por heparina.",tags:["Plantão","Anticoagulação"],
      questions:[
        q("Queda plaquetária",[opt("<30% ou nadir <10 mil",0),opt("30–50% ou nadir 10–19 mil",1),opt(">50% e nadir ≥20 mil",2)]),
        q("Momento da queda",[opt("≤4 dias sem exposição recente",0),opt("Momento incerto, >10 dias ou ≤1 dia após exposição 30–100 dias",1),opt("5–10 dias ou ≤1 dia após exposição nos últimos 30 dias",2)]),
        q("Trombose ou sequela",[opt("Nenhuma",0),opt("Trombose progressiva/suspeita ou lesão não necrótica",1),opt("Trombose nova, necrose ou reação sistêmica após bolus",2)]),
        q("Outras causas",[opt("Causa definida",0),opt("Possível",1),opt("Nenhuma aparente",2)])
      ],
      interpret:n=>n<=3?"4Ts 0–3: baixa probabilidade de HIT.":n<=5?"4Ts 4–5: probabilidade intermediária; investigar e seguir protocolo de HIT.":"4Ts 6–8: alta probabilidade; avaliação urgente e manejo conforme diretriz.",
      reference:"Lo GK et al. J Thromb Haemost. 2006; ASH HIT guideline 2018."},
    {id:"mmrc",name:"mMRC — dispneia",category:"Respiratório",aliases:"DPOC dispneia GOLD",
      desc:"Escala de dispneia modificada do Medical Research Council.",tags:["DPOC","Ambulatório"],
      questions:[q("Atividade associada à falta de ar",[
        opt("0 — apenas exercício intenso",0),opt("1 — pressa ou leve subida",1),
        opt("2 — mais lento que pares ou precisa parar",2),opt("3 — para após ~100 metros ou minutos",3),
        opt("4 — dispneia ao se vestir ou impede sair de casa",4)])],
      interpret:n=>"mMRC "+n+"/4. Utilizar em conjunto com sintomas, exacerbações e espirometria.",
      reference:"Bestall JC et al. Thorax. 1999;54:581–586; GOLD."},
    {id:"bode",name:"BODE — DPOC",category:"Respiratório",aliases:"IMC VEF1 caminhada dispneia prognóstico DPOC",
      desc:"Índice prognóstico composto (IMC, obstrução, dispneia e exercício).",tags:["DPOC","Prognóstico"],
      questions:[
        q("IMC",[opt(">21 kg/m²",0),opt("≤21 kg/m²",1)]),
        q("VEF1 % do previsto",[opt("≥65%",0),opt("50–64%",1),opt("36–49%",2),opt("≤35%",3)]),
        q("mMRC",[opt("0–1",0),opt("2",1),opt("3",2),opt("4",3)]),
        q("Distância no teste de caminhada 6 min",[opt("≥350 m",0),opt("250–349 m",1),opt("150–249 m",2),opt("≤149 m",3)])
      ],
      interpret:n=>"BODE "+n+"/10: valores maiores associam-se a pior prognóstico populacional; não substitui avaliação individual.",
      reference:"Celli BR et al. N Engl J Med. 2004;350:1005–1012."},
    {id:"asa",name:"ASA — estado físico",category:"Cirurgia",aliases:"anestesia cirúrgico ASA PS",
      desc:"Classificação pré-anestésica de estado físico, não probabilidade individual de complicações.",tags:["Cirurgia","Pré-operatório"],
      questions:[q("Estado físico",[opt("ASA I — saudável",1),opt("ASA II — doença sistêmica leve",2),opt("ASA III — doença sistêmica grave",3),opt("ASA IV — ameaça constante à vida",4),opt("ASA V — moribundo sem expectativa de sobrevida sem cirurgia",5),opt("ASA VI — morte encefálica para doação",6)])],
      interpret:n=>"ASA "+n+". Em procedimento de emergência, o sufixo E é definido pela equipe; classificação não é escore de mortalidade.",
      reference:"American Society of Anesthesiologists. ASA Physical Status Classification System."},
    {id:"mrankin",name:"Rankin modificada (mRS)",category:"Neurologia",aliases:"AVC incapacidade funcional",
      desc:"Desfecho funcional e incapacidade após AVC.",tags:["AVC","Reabilitação"],
      questions:[q("Dependência funcional",[opt("0 — sem sintomas",0),opt("1 — sintomas sem incapacidade relevante",1),opt("2 — pequena incapacidade, independente",2),opt("3 — necessita alguma ajuda mas caminha sem auxílio",3),opt("4 — não caminha nem cuida de si sem auxílio",4),opt("5 — acamado, incontinente, cuidados constantes",5),opt("6 — óbito",6)])],
      interpret:n=>"mRS "+n+"/6. Atribuir com entrevista estruturada e contexto funcional prévio.",
      reference:"van Swieten JC et al. Stroke. 1988;19:604–607."},
    {id:"wfns",name:"WFNS — hemorragia subaracnóidea",category:"Neurologia",aliases:"HSA aneurisma gravidade Glasgow déficit motor",
      desc:"Graduação clínica de HSA baseada em Glasgow e déficit motor.",tags:["Neuro","HSA"],
      questions:[q("Glasgow e déficit focal",[opt("I — GCS 15, sem déficit",1),opt("II — GCS 13–14, sem déficit motor",2),opt("III — GCS 13–14, com déficit motor",3),opt("IV — GCS 7–12, com ou sem déficit",4),opt("V — GCS 3–6, com ou sem déficit",5)])],
      interpret:n=>"WFNS "+n+". Gravidade neurológica; não define conduta isoladamente.",
      reference:"World Federation of Neurosurgical Societies grading (1988)."},
    {id:"silverman",name:"Silverman–Andersen",category:"Pediatria",aliases:"neonatologia desconforto respiratório recém-nascido",
      desc:"Quantifica cinco sinais de desconforto respiratório neonatal.",tags:["Neonatologia","Sala de parto"],
      questions:[
        q("Movimento toracoabdominal",[opt("Sincronizado",0),opt("Atraso inspiratório",1),opt("Movimento em gangorra",2)]),
        q("Tiragem intercostal",[opt("Ausente",0),opt("Discreta",1),opt("Acentuada",2)]),
        q("Retração xifoide",[opt("Ausente",0),opt("Discreta",1),opt("Acentuada",2)]),
        q("Batimento de asas nasais",[opt("Ausente",0),opt("Mínimo",1),opt("Acentuado",2)]),
        q("Gemido expiratório",[opt("Ausente",0),opt("Audível com estetoscópio",1),opt("Audível sem estetoscópio",2)])
      ],
      interpret:n=>"Silverman–Andersen "+n+"/10. Valores maiores indicam mais desconforto respiratório; não adiar suporte ventilatório por pontuação.",
      reference:"Silverman WA, Andersen DH. Pediatrics. 1956;17:1–10."},
    {id:"westley",name:"Westley — crupe",category:"Pediatria",aliases:"laringite estridor crupe pediátrico",
      desc:"Escore clínico da gravidade de crupe.",tags:["Pediatria","PS"],
      questions:[
        q("Nível de consciência",[opt("Normal",0),opt("Desorientado/alterado",5)]),
        q("Cianose",[opt("Ausente",0),opt("Com agitação",4),opt("Em repouso",5)]),
        q("Estridor",[opt("Ausente",0),opt("Com agitação",1),opt("Em repouso",2)]),
        q("Entrada de ar",[opt("Normal",0),opt("Reduzida",1),opt("Muito reduzida",2)]),
        q("Retrações",[opt("Ausentes",0),opt("Leves",1),opt("Moderadas",2),opt("Graves",3)])
      ],
      interpret:n=>n<=2?"Westley 0–2: crupe leve.":n<=5?"Westley 3–5: crupe moderado.":n<=11?"Westley 6–11: crupe grave; avaliação urgente.":"Westley ≥12: risco de insuficiência respiratória iminente; emergência.",
      reference:"Westley CR et al. Am J Dis Child. 1978;132:484–487."},
    {id:"pas",name:"PAS — apendicite pediátrica",category:"Pediatria",aliases:"Pediatric Appendicitis Score apendicite criança",
      desc:"Risco clínico em criança com suspeita de apendicite; não substitui imagem e reavaliação.",tags:["Pediatria","Cirurgia"],
      questions:[
        q("Migração da dor para FID",yesno()),q("Anorexia",yesno()),q("Náuseas ou vômitos",yesno()),q("Temperatura ≥38 °C",yesno()),
        q("Dor na FID à palpação",[opt("Não",0),opt("Sim",2)]),
        q("Dor ao tossir/percutir/saltar",[opt("Não",0),opt("Sim",2)]),
        q("Leucócitos ≥10.000/µL",yesno()),q("Neutrófilos ≥75%",yesno())
      ],
      interpret:n=>n<=2?"PAS 0–2: menor risco, reavaliar clinicamente.":n<=6?"PAS 3–6: risco intermediário; observação/investigação conforme protocolo.":"PAS 7–10: alto risco clínico; avaliação cirúrgica e exames conforme contexto.",
      reference:"Samuel M. J Pediatr Surg. 2002;37:877–881."},
    {id:"rotterdam",name:"Rotterdam — critérios de SOP",category:"Ginecologia",aliases:"ovários policísticos hiperandrogenismo oligoanovulação",
      desc:"Em adultos, dois dos três critérios após exclusão de outras causas.",tags:["GO","Ambulatório"],
      questions:[q("Oligo/anovulação",yesno()),q("Hiperandrogenismo clínico ou bioquímico",yesno()),q("Morfologia ovariana policística ou marcador aceito pela diretriz aplicável",yesno())],
      interpret:n=>n>=2?"Dois ou mais critérios presentes. Compatível com SOP em adulta APÓS excluir causas alternativas; critérios de adolescentes diferem.":"Critérios insuficientes no modelo de Rotterdam; investigar conforme quadro.",
      reference:"ESHRE/ASRM Rotterdam 2003; International Evidence-based Guideline for PCOS 2023."},
    {id:"phq9",name:"PHQ-9",category:"Psiquiatria",aliases:"depressão rastreio sintomas humor",
      desc:"Sintomas depressivos nas últimas duas semanas. Item 9 positivo exige avaliação de segurança.",tags:["APS","Saúde mental"],
      questions:["Pouco interesse ou prazer","Sentir-se deprimido(a) ou sem esperança","Dificuldade para dormir ou dormir demais","Cansaço e pouca energia","Apetite alterado","Sentir-se mal consigo/fracasso","Dificuldade de concentração","Lentidão ou agitação psicomotora","Pensamentos de morte ou de se ferir"].map((label,i)=>q((i+1)+". "+label,[opt("Nunca",0),opt("Vários dias",1),opt("Mais da metade dos dias",2),opt("Quase todos os dias",3)],i===8?"QUALQUER resposta positiva neste item requer avaliação clínica de risco, independentemente do total.":"")),
      interpret:n=>"PHQ-9 "+n+"/27. "+(n<=4?"Sintomas mínimos.":n<=9?"Sintomas leves.":n<=14?"Sintomas moderados.":n<=19?"Sintomas moderadamente graves.":"Sintomas graves.")+" Não diagnostica depressão. Verificar resposta ao item 9 e segurança do paciente.",
      reference:"Kroenke K, Spitzer RL, Williams JB. J Gen Intern Med. 2001;16:606–613."},
    {id:"gad7",name:"GAD-7",category:"Psiquiatria",aliases:"ansiedade generalizada rastreio",
      desc:"Frequência de sintomas ansiosos nas últimas duas semanas.",tags:["APS","Saúde mental"],
      questions:["Nervosismo ou ansiedade","Não conseguir parar de se preocupar","Preocupações excessivas","Dificuldade para relaxar","Inquietação","Irritabilidade","Medo de algo terrível acontecer"].map((label,i)=>q((i+1)+". "+label,[opt("Nunca",0),opt("Vários dias",1),opt("Mais da metade dos dias",2),opt("Quase todos os dias",3)])),
      interpret:n=>"GAD-7 "+n+"/21. "+(n<5?"Sintomas mínimos.":n<10?"Sintomas leves.":n<15?"Sintomas moderados.":"Sintomas graves.")+" Triagem; confirmar diagnóstico e impacto funcional.",
      reference:"Spitzer RL et al. Arch Intern Med. 2006;166:1092–1097."},
    {id:"audit",name:"AUDIT — álcool",category:"Psiquiatria/Toxicologia",aliases:"álcool consumo de risco OMS",
      desc:"Instrumento de rastreio de consumo problemático de álcool (10 questões).",tags:["APS","Álcool"],
      questions:[
        q("Frequência de uso",[opt("Nunca",0),opt("Mensal ou menos",1),opt("2–4 vezes/mês",2),opt("2–3 vezes/semana",3),opt("≥4 vezes/semana",4)]),
        q("Doses numa ocasião típica",[opt("1–2",0),opt("3–4",1),opt("5–6",2),opt("7–9",3),opt("≥10",4)]),
        ...["Seis ou mais doses em uma ocasião","Não conseguir parar após começar","Deixar compromissos por beber","Precisar beber ao acordar","Sentir culpa/remorso","Não lembrar da noite anterior"].map(t=>q(t,[opt("Nunca",0),opt("Menos de mensal",1),opt("Mensal",2),opt("Semanal",3),opt("Diário ou quase",4)])),
        q("Ferimento seu ou de outra pessoa relacionado a beber",[opt("Não",0),opt("Sim, mas não no último ano",2),opt("Sim, no último ano",4)]),
        q("Outros já se preocuparam ou sugeriram reduzir consumo",[opt("Não",0),opt("Sim, mas não no último ano",2),opt("Sim, no último ano",4)])
      ],
      interpret:n=>n<=7?"AUDIT 0–7: risco mais baixo na faixa clássica de adultos (avaliar grupo populacional).":n<=15?"AUDIT 8–15: consumo de risco; aconselhamento e avaliação.":n<=19?"AUDIT 16–19: risco elevado; intervenção breve e avaliação.":"AUDIT ≥20: possível dependência/transtorno; encaminhar para avaliação específica.",
      reference:"WHO. AUDIT — Guidelines for Use in Primary Care (2001)."},
    {id:"barthel",name:"Índice de Barthel",category:"Geriatria",aliases:"AVD independência reabilitação",
      desc:"Capacidade funcional em dez atividades básicas.",tags:["Geriatria","Reabilitação"],
      questions:[
        q("Alimentação",[opt("Dependente",0),opt("Precisa de ajuda",5),opt("Independente",10)]),
        q("Banho",[opt("Dependente",0),opt("Independente",5)]),
        q("Higiene pessoal",[opt("Dependente",0),opt("Independente",5)]),
        q("Vestir-se",[opt("Dependente",0),opt("Precisa de ajuda",5),opt("Independente",10)]),
        q("Controle intestinal",[opt("Incontinente",0),opt("Acidente ocasional",5),opt("Continente",10)]),
        q("Controle vesical",[opt("Incontinente",0),opt("Acidente ocasional",5),opt("Continente",10)]),
        q("Uso de sanitário",[opt("Dependente",0),opt("Precisa de ajuda",5),opt("Independente",10)]),
        q("Transferência",[opt("Incapaz",0),opt("Grande ajuda",5),opt("Pequena ajuda",10),opt("Independente",15)]),
        q("Mobilidade em superfície plana",[opt("Imóvel",0),opt("Cadeira de rodas independente",5),opt("Caminha com ajuda",10),opt("Independente",15)]),
        q("Escadas",[opt("Incapaz",0),opt("Precisa de ajuda",5),opt("Independente",10)])
      ],
      interpret:n=>"Barthel "+n+"/100. Quanto maior a pontuação, maior a independência em atividades básicas. Confirmar versão utilizada.",
      reference:"Mahoney FI, Barthel DW. Md State Med J. 1965;14:61–65."},
    {id:"katz",name:"Katz — atividades básicas (ABVD)",category:"Geriatria",aliases:"AVD idosos dependência",
      desc:"Independência em seis atividades básicas.",tags:["Geriatria","APS"],
      questions:["Banho","Vestir-se","Ir ao banheiro","Transferir-se","Continência","Alimentar-se"].map(t=>q(t,[opt("Dependente",0),opt("Independente",1)])),
      interpret:n=>"Katz "+n+"/6 atividades independentes (versão contagem). A codificação alfabética tradicional usa outra notação.",
      reference:"Katz S et al. JAMA. 1963;185:914–919."},
    {id:"lawton",name:"Lawton–Brody — atividades instrumentais",category:"Geriatria",aliases:"AIVD funcional idosos",
      desc:"Versão de 8 itens com independência em atividades instrumentais.",tags:["Geriatria","APS"],
      questions:["Telefone","Compras","Preparo de alimentos","Tarefas domésticas","Lavanderia","Transporte","Medicações","Finanças"].map(t=>q(t,[opt("Dependente",0),opt("Independente",1)])),
      interpret:n=>"Lawton–Brody "+n+"/8. A literatura usa variantes de pontuação: registrar a versão na evolução.",
      reference:"Lawton MP, Brody EM. Gerontologist. 1969;9:179–186."},
    {id:"cfs",name:"Clinical Frailty Scale (CFS)",category:"Geriatria",aliases:"fragilidade idoso vulnerabilidade",
      desc:"Classificação clínica de fragilidade; avaliar funcionalidade basal e faixa de validação.",tags:["Geriatria","Enfermaria"],
      questions:[q("Estado basal",[opt("1 — muito ativo",1),opt("2 — bem",2),opt("3 — bem com condições tratadas",3),opt("4 — vulnerável",4),opt("5 — fragilidade leve",5),opt("6 — moderada",6),opt("7 — grave",7),opt("8 — muito grave",8),opt("9 — terminal",9)])],
      interpret:n=>"CFS "+n+"/9. Requer avaliação basal, e não incapacidade transitória durante evento agudo.",
      reference:"Rockwood K et al. CMAJ. 2005;173:489–495."},
    {id:"minicog",name:"Mini-Cog",category:"Geriatria",aliases:"triagem cognitiva memória relógio",
      desc:"Triagem breve de comprometimento cognitivo; aplicação exige teste real.",tags:["Geriatria","APS"],
      questions:[
        q("Palavras lembradas após distração",[opt("0",0),opt("1",1),opt("2",2),opt("3",3)]),
        q("Desenho do relógio",[opt("Alterado",0),opt("Normal",2)])
      ],
      interpret:n=>n<=2?"Mini-Cog 0–2/5: triagem positiva para possível comprometimento; investigar.":"Mini-Cog 3–5/5: menor probabilidade de comprometimento, mas não exclui; interpretar clinicamente.",
      reference:"Borson S et al. Int J Geriatr Psychiatry. 2000;15:1021–1027."},
    {id:"hurley",name:"Hurley — hidradenite supurativa",category:"Dermatologia",aliases:"hidradenite abscesso túneis",
      desc:"Estadiamento clínico da hidradenite supurativa.",tags:["Dermato","Ambulatório"],
      questions:[q("Lesões",[opt("I — abscessos, sem túneis ou cicatrizes",1),opt("II — túneis/cicatrizes separados com lesões recorrentes",2),opt("III — comprometimento difuso ou túneis interligados",3)])],
      interpret:n=>"Hurley estágio "+(["","I","II","III"][n])+". Classificação anatômica; complementar com atividade da doença.",
      reference:"Hurley HJ. Dermatologic Surgery. 1989."}
  ];
  for (const item of expandedScoreDefs) if (!scores.some(s=>s.id===item.id)) scores.push(item);

  // Exibir o catálogo completo, inclusive escalas complementares de uso ambulatorial.

  scores.push(
    {id:"air",name:"AIR — Appendicitis Inflammatory Response",category:"Cirurgia",aliases:"apendicite diagnóstico inflamação",
      desc:"Estratifica risco de apendicite em adultos; critérios laboratoriais e clínicos.",tags:["PS","Cirurgia"],
      questions:[
        q("Vômitos",yesno()),q("Dor em fossa ilíaca direita",yesno()),
        q("Defesa muscular/dor à descompressão",[opt("Ausente",0),opt("Leve",1),opt("Moderada",2),opt("Intensa",3)]),
        q("Temperatura ≥38,5 °C",yesno()),
        q("Leucócitos (×10⁹/L)",[opt("<10",0),opt("10–14,9",1),opt("≥15",2)]),
        q("Neutrófilos (%)",[opt("<70%",0),opt("70–84%",1),opt("≥85%",2)]),
        q("PCR (mg/L)",[opt("<10",0),opt("10–49",1),opt("≥50",2)])
      ],
      interpret:n=>n<=4?"AIR 0–4: risco baixo; considerar reavaliação conforme quadro.":n<=8?"AIR 5–8: risco intermediário; investigação por protocolo.":"AIR 9–12: alto risco; avaliação cirúrgica prioritária.",
      reference:"Andersson M, Andersson RE. World J Surg. 2008;32:1843–1849."},
    {id:"sofa2",name:"SOFA-2 (2025)",category:"Emergência",aliases:"disfunção orgânica sepse terapia intensiva 2025",
      desc:"Nova avaliação de seis sistemas; aplicar critérios de suporte e exceções do artigo original.",tags:["UTI","Sepse"],
      questions:[
        q("Neurológico",[opt("GCS 15",0),opt("GCS 13–14 ou fármaco para delirium",1),opt("GCS 9–12",2),opt("GCS 6–8",3),opt("GCS 3–5",4)]),
        q("Respiratório",[opt("P/F >300",0),opt("P/F ≤300",1),opt("P/F ≤225",2),opt("P/F ≤150 com suporte ventilatório avançado",3),opt("P/F ≤75 com suporte avançado ou ECMO",4)]),
        q("Cardiovascular",[opt("PAM ≥70 sem vasopressor/inotrópico",0),opt("PAM <70 sem drogas",1),opt("Noradrenalina + adrenalina ≤0,2 µg/kg/min ou outro vasopressor/inotrópico",2),opt("Noradrenalina + adrenalina >0,2 a ≤0,4; ou baixa dose associada",3),opt(">0,4 µg/kg/min; dose média associada ou suporte circulatório mecânico",4)]),
        q("Hepático — bilirrubina total",[opt("≤1,2 mg/dL",0),opt(">1,2 a 3 mg/dL",1),opt(">3 a 6 mg/dL",2),opt(">6 a 12 mg/dL",3),opt(">12 mg/dL",4)]),
        q("Renal — creatinina, diurese ou suporte",[opt("Cr ≤1,2 e sem oligúria relevante",0),opt("Cr >1,2 a 2 ou diurese <0,5 mL/kg/h por 6–12 h",1),opt("Cr >2 a 3,5 ou diurese <0,5 por ≥12 h",2),opt("Cr >3,5 ou oligúria <0,3 por ≥24 h ou anúria ≥12 h",3),opt("Necessidade/critérios de terapia substitutiva renal",4)]),
        q("Hemostasia — plaquetas",[opt(">150 mil/µL",0),opt("≤150 mil/µL",1),opt("≤100 mil/µL",2),opt("≤80 mil/µL",3),opt("≤50 mil/µL",4)])
      ],
      interpret:n=>"SOFA-2: "+n+"/24. Maior pontuação representa maior disfunção orgânica. Uso assistencial requer leitura integral das regras originais, especialmente suporte avançado, componentes renais e sedação.",
      reference:"JAMA 2025. Development and Validation of the Sequential Organ Failure Assessment (SOFA)-2 Score. doi/source: jama/fullarticle/2840822."},
    {id:"ihs4",name:"IHS4 — hidradenite supurativa",category:"Dermatologia",aliases:"nodulos abscessos tuneis gravidade hidradenite",
      desc:"Atividade de hidradenite por contagem de nódulos, abscessos e túneis drenantes.",tags:["Dermatologia","Ambulatório"],custom:"ihs4",
      reference:"Zouboulis CC et al. Br J Dermatol. 2017. IHS4 = nódulos + 2×abscessos + 4×túneis."}
  );

  // Ferramentas listadas para consulta editorial enquanto as tabelas/equações são verificadas.
  // NUNCA entregar valor calculado ou classificação automática para estes itens.
  const referenceOnlyTools=[["apache2","APACHE II","Emergência","Gravidade em terapia intensiva; exige 12 variáveis fisiológicas, idade e condições crônicas.","Knaus WA et al. Crit Care Med. 1985;13:818–829."],["saps3","SAPS 3","Emergência","Escore prognóstico de UTI calibrado por população; usar equação regional validada.","Moreno RP et al. Intensive Care Med. 2005;31:1336–1344."],["pesi","PESI completo","Tromboembolismo","Classificação prognóstica do TEP com idade e comorbidades; complementar sPESI.","Aujesky D et al. Am J Respir Crit Care Med. 2005;172:1041–1046."],["rockall","Rockall completo","Gastroenterologia","Risco em hemorragia digestiva alta; exige achados endoscópicos.","Rockall TA et al. Gut. 1996;38:316–321."],["ranson","Ranson (48 horas)","Gastroenterologia","Critérios de admissão e evolução em 48 horas na pancreatite; diferenças por etiologia.","Ranson JHC et al. Surg Gynecol Obstet. 1974;139:69–81."],["tokyochole","Tokyo Guidelines — colecistite","Cirurgia","Critérios diagnósticos e gravidade TG18/TG22 conforme versão institucional.","Tokyo Guidelines 2018 (TG18). J Hepatobiliary Pancreat Sci."],["tokyocholang","Tokyo Guidelines — colangite","Cirurgia","Diagnóstico e gravidade requerem inflamação, colestase e imagem.","Tokyo Guidelines 2018. J Hepatobiliary Pancreat Sci."],["possum","POSSUM / P-POSSUM","Cirurgia","Escore perioperatório com parâmetros fisiológicos e operatórios.","Copeland GP et al. Br J Surg. 1991."],["pecarntce","PECARN — TCE pediátrico","Pediatria","Regras distintas para menores e maiores de 2 anos; não aplicar a pacientes fora da população validada.","Kuppermann N et al. Lancet. 2009;374:1160–1170."],["pews","PEWS — alerta pediátrico","Pediatria","Há versões não intercambiáveis; selecionar escala institucional validada.","Royal College of Paediatrics and Child Health / PEWS institucionais."],["cssrs","C-SSRS","Psiquiatria","Escala de avaliação de ideação e comportamento suicida; exige abordagem clínica e manejo imediato do risco.","Columbia Lighthouse Project — Columbia-Suicide Severity Rating Scale."],["mdq","MDQ — transtorno bipolar","Psiquiatria","Rastreio de sintomas de hipomania/mania; requer instrumento e regra de impacto funcional.","Hirschfeld RMA et al. Am J Psychiatry. 2000;157:1873–1875."],["cam","CAM — delirium","Geriatria","Algoritmo diagnóstico de características 1 e 2, associadas a 3 ou 4; requer avaliação estruturada.","Inouye SK et al. Ann Intern Med. 1990;113:941–948."],["scorad","SCORAD — dermatite atópica","Dermatologia","Integra extensão, intensidade e sintomas subjetivos; demanda formulário e mapa corporal.","European Task Force on Atopic Dermatitis. Dermatology. 1993."],["pasi","PASI — psoríase","Dermatologia","Área e gravidade por regiões corporais, com pesos específicos; não resumir a avaliação visual isolada.","Fredriksson T, Pettersson U. Dermatologica. 1978;157:238–244."],["abcde","ABCDE — lesão pigmentada","Dermatologia","Checklist de sinais suspeitos; não substitui dermatoscopia nem exame dermatológico.","American Academy of Dermatology — melanoma ABCDE."],["palmcoein","FIGO PALM-COEIN","Ginecologia","Classificação etiológica de sangramento uterino anormal, sem pontuação.","FIGO PALM-COEIN classification system."],["kdigoaki","KDIGO — lesão renal aguda","Renal","Estadiamento por elevação de creatinina e oligúria em janelas temporais definidas.","KDIGO AKI Clinical Practice Guideline 2012."],["kdigockd","KDIGO — doença renal crônica","Renal","Classificação CGA: causa, TFG e albuminúria persistentes; requer tempo ≥3 meses.","KDIGO 2024 CKD Guideline."],["gold","GOLD — DPOC","Respiratório","Agrupamento clínico e classificação espirométrica conforme versão vigente.","GOLD — Global Initiative for Chronic Obstructive Lung Disease."],["gina","GINA — asma","Respiratório","Avaliação do controle e risco de exacerbações, não é um escore numérico isolado.","GINA — Global Initiative for Asthma."],["duke","Duke-ISCVID — endocardite","Infectologia","Critérios maiores/menores, microbiologia, imagem e patologia.","Duke-ISCVID Criteria for Infective Endocarditis, 2023."],["prevent","PREVENT — risco cardiovascular","Cardiologia","Modelo AHA para prevenção primária; exige coeficientes/validação completos; recomendado pela SBC 2025.","SBC Diretriz Brasileira de Dislipidemias 2025; AHA PREVENT."],["score2","SCORE2","Cardiologia","Risco cardiovascular em adultos de 40–69 anos conforme calibração regional europeia.","ESC Cardiovascular Prevention Guidelines 2021; SCORE2."],["score2op","SCORE2-OP","Cardiologia","Risco cardiovascular de idosos conforme calibração europeia, não é substituto automático do PREVENT brasileiro.","ESC SCORE2-Older Persons (SCORE2-OP)."],["biliapp","Icterícia neonatal — AAP","Pediatria","Limiar de fototerapia e exsanguineotransfusão depende de horas de vida, IG e fatores de neurotoxicidade.","AAP Hyperbilirubinemia Guideline 2022 (≥35 semanas)."],["growthwho","Percentis e escores Z OMS","Pediatria","Exige curvas sexoespecíficas e tabelas LMS por idade/medida.","WHO Child Growth Standards; Ministério da Saúde/SISVAN."],["ldlmartin","LDL — Martin-Hopkins","Cardiologia","Estimativa por fator ajustável conforme triglicerídeos e colesterol não HDL; não aplicar divisor fixo.","Martin SS et al. JAMA. 2013;310:2061–2068."]];
  for (const [id,name,category,desc,reference] of referenceOnlyTools) {
    if (!scores.some(x=>x.id===id)) scores.push({id,name,category,desc,aliases:name,reference,custom:"reference",tags:["Referência"]});
  }


  /* Auditoria clínica 4/6 — scores 20–49. Não altera catálogo restante.
   * Fontes: MS/PCDT, sociedades, originais, AHA/ACC 2024, Caprini RAM 2013.
   */
  const auditBatch4Ids=[
    "padua","apfel","bishop","apgar","mascc","stopbang","grace","timi_ua","rcri","cha2ds2va",
    "crb65","psi","ichscore","hunthess","mfisher","caprini","ciwaar","rts","hints","cage",
    "fagerstrom","framingham","centor","sirs","nyha","geneva","fourts","mmrc","bode","asa"
  ];
  if(JSON.stringify(scores.slice(19,49).map(x=>x.id))!==JSON.stringify(auditBatch4Ids))
    throw Error("Auditoria 4: alteração inesperada na ordem dos escores");
  const getScore=id=>{const v=scores.find(x=>x.id===id);if(!v)throw Error("Score ausente: "+id);return v;};
  const batch4Notes={
    padua:"Uso em pacientes clínicos hospitalizados; estimativa de TEV não substitui avaliação de contraindicações e risco hemorrágico.",
    apfel:"Quatro fatores de risco de náusea e vômito pós-operatório; depende de anestesia e perfil do paciente.",
    bishop:"A avaliação cervical tem variabilidade interobservador. Bishop favorável não é indicação automática de indução.",
    apgar:"Registrar tempo da avaliação (1, 5 e, quando indicado, 10 minutos). Reanimação neonatal não deve esperar pontuação.",
    mascc:"MASCC ≥21 não garante manejo ambulatorial; febre neutropênica exige avaliação e antimicrobiano oportuno.",
    stopbang:"Rastreio de AOS, não diagnóstico; não usar resultado isolado para excluir apneia clinicamente suspeita.",
    grace:"Implementação por faixas do GRACE clássico; confirmar escore/riscos com fonte validada antes de decisões invasivas.",
    timi_ua:"TIMI em SCA sem supra; risco de eventos é de população de derivação e não substitui ECG/troponinas seriadas.",
    rcri:"RCRI clássico tem 6 critérios, incluindo creatinina ≥2,0 mg/dL. Não equivale a probabilidade individual exata.",
    cha2ds2va:"Avaliar CHA₂DS₂-VA em FA, risco hemorrágico e contraindicações. Escores não prescrevem anticoagulação.",
    crb65:"CRB-65 sem ureia pode auxiliar quando não há laboratório, mas não exclui critérios de internação por hipoxemia.",
    psi:"PSI calcula pontuação numérica para classes II–V; classe I depende de algoritmo clínico à parte.",
    ichscore:"ICH Score prognóstico em hemorragia espontânea. Não usar para limitar suporte, prognóstico individual ou decisões de fim de vida.",
    hunthess:"Hunt–Hess avalia gravidade na HSA; avaliar condições após estabilização e contexto de sedação.",
    mfisher:"Fisher modificada é graduação radiológica da HSA, não diagnóstico independente de vasoespasmo.",
    caprini:"Caprini RAM 2013: idade e procedimento são mutuamente exclusivos por categoria; conferir todos os fatores na ficha e avaliar contraindicações de profilaxia.",
    ciwaar:"CIWA-Ar depende de cooperação e relato; não utilizar em delirium significativo, pacientes intubados/não comunicativos ou outras condições não avaliáveis.",
    rts:"RTS ponderado exige GCS, pressão sistólica e frequência respiratória e não define via aérea ou ressuscitação.",
    hints:"HINTS apenas na síndrome vestibular aguda contínua COM nistagmo espontâneo e EXAMINADOR TREINADO.",
    cage:"CAGE é rastreio de transtorno por uso de álcool e não mede consumo atual ou define diagnóstico.",
    fagerstrom:"Fagerström avalia dependência de nicotina em fumantes de cigarro; não extrapolar para vapes sem instrumento validado.",
    framingham:"Framingham 2008: avaliação de eventos cardiovasculares globais, não equivalente ao PREVENT ou SCORE2.",
    centor:"McIsaac exige idade apropriada e avaliação de sintomas; não prescrever antibiótico apenas por pontuação.",
    sirs:"SIRS é inflamação inespecífica; não diagnostica nem exclui sepse.",
    nyha:"Classe funcional depende de história e limitações basais; combinar com ecocardiografia e exames.",
    geneva:"Genebra revisado estima probabilidade pré-teste de TEP; não é teste diagnóstico e não classifica gestação automaticamente.",
    fourts:"4Ts é pré-teste de HIT; queda plaquetária e exposição à heparina dependem de cronologia. Não manter heparina sem avaliação quando suspeita relevante.",
    mmrc:"mMRC é dispneia crônica funcional, não diagnóstico de DPOC isolado.",
    bode:"BODE exige IMC, VEF1 pós-broncodilatador, mMRC e distância percorrida em seis minutos; não usar para classificar exacerbação.",
    asa:"ASA Physical Status classificação pré-anestésica, não preditor isolado de risco operatório."
  };
  for(const id of auditBatch4Ids){
    const d=getScore(id);d.auditDate="2026-10-24";d.safetyNote=batch4Notes[id];
    if(!d.reference||!d.safetyNote)throw Error("Auditoria incompleta: "+id);
  }

  // Caprini 2013: usa uma única faixa de idade e uma única categoria de procedimento
  // (corrige somas impossíveis da versão anterior: 41–60 + 61–74 + ≥75 e
  // cirurgia >45min + laparoscópica >45min).
  const caprini=getScore("caprini");
  caprini.questions=[
    q("Idade",[
      opt("≤40 anos",0),opt("41–60 anos",1),opt("61–74 anos",2),opt("≥75 anos",3)
    ]),
    q("Procedimento planejado (uma categoria principal)",[
      opt("Sem cirurgia ou procedimento de baixo risco não incluído",0),
      opt("Cirurgia menor <45 minutos",1),
      opt("Cirurgia maior, inclusive laparoscópica/artroscópica >45 min",2),
      opt("Artroplastia eletiva de quadril ou joelho",5)
    ]),
    q("Cirurgia maior nos últimos 30 dias (além da planejada)",yesno()),
    q("IMC ≥25 kg/m²",yesno()),
    q("Veias varicosas visíveis",yesno()),
    q("Edema atual das pernas",yesno()),
    q("Doença inflamatória intestinal",yesno()),
    q("Infarto agudo de miocárdio recente",yesno()),
    q("Insuficiência cardíaca congestiva recente",yesno()),
    q("Infecção grave recente (inclui pneumonia)",yesno()),
    q("Doença pulmonar preexistente",yesno()),
    q("Repouso no leito ou mobilidade restrita <72 h",yesno()),
    q("Contraceptivo oral ou terapia de reposição hormonal",yesno()),
    q("Gravidez atual ou parto nas últimas quatro semanas",yesno()),
    q("Natimorto sem explicação, ≥3 perdas gestacionais, prematuro associado a pré-eclâmpsia ou restrição de crescimento",yesno()),
    q("IMC >40 kg/m² (fator adicional no RAM 2013)",yesno()),
    q("Tabagismo ativo (fator adicional no RAM 2013)",yesno()),
    q("Diabetes tratado com insulina",yesno()),
    q("Quimioterapia recente",yesno()),
    q("Transfusão sanguínea recente",yesno()),
    q("Duração total prevista da cirurgia >2 h (fator adicional)",yesno()),
    q("Neoplasia ativa ou prévia, exceto câncer cutâneo não melanoma",yesno(2)),
    q("Imobilização gessada no último mês",yesno(2)),
    q("Acesso venoso central no último mês",yesno(2)),
    q("Repouso no leito ≥72 h",yesno(2)),
    q("TVP/TEP pessoal prévio",yesno(3)),
    q("História familiar de TVP/TEP",yesno(3)),
    q("Trombofilia conhecida pessoal ou familiar",yesno(3)),
    q("Fratura de quadril, pelve ou perna no último mês",yesno(5)),
    q("Trauma grave/múltiplas fraturas recente",yesno(5)),
    q("Paralisia por lesão medular aguda (<1 mês)",yesno(5)),
    q("AVC com déficit neurológico recente (<1 mês)",yesno(5))
  ];
  caprini.reference="Caprini Risk Assessment Model (2013); Cronin MA et al. Clin Appl Thromb Hemost. 2019;25:1076029619838052; NCBI Bookshelf Caprini Score (2025).";
  caprini.desc="Risco de TEV cirúrgico — versão estruturada do Caprini RAM 2013; conferir ficha e contexto institucional.";
  caprini.interpret=n=>n===0?"Caprini 0: risco muito baixo; considerar procedimento e contexto.":n<=2?"Caprini 1–2: estrato baixo, condicionado ao procedimento.":n<=4?"Caprini 3–4: estrato moderado; definir profilaxia e risco hemorrágico por protocolo.":"Caprini ≥5: estrato elevado/alto; escolher prevenção segundo cirurgia, contraindicações e risco hemorrágico.";

  // Avaliação neonatal: registrar explicitamente o instante de medição.
  const apgar=getScore("apgar");
  apgar.questions.push(q("Momento da aferição",[
    opt("1 minuto de vida",0),opt("5 minutos de vida",0),opt("10 minutos de vida (se indicado)",0)
  ]));
  apgar.interpret=n=>n>=7?"Apgar "+n+"/10 (registrar o minuto selecionado). Resultados de 7–10 aos 5 min são usualmente tranquilizadores; NÃO atrasar reanimação aguardando escore.":n>=4?"Apgar "+n+"/10 (registrar o minuto selecionado). Resultado 4–6 aos 5 min é moderadamente anormal; observar e reavaliar.":"Apgar "+n+"/10 (registrar o minuto selecionado). Resultado 0–3 aos 5 min é baixo; não diagnostica asfixia ou prognóstico isoladamente.";

  // CIWA-Ar: sem colaboração, não aplicar pontuação; outras escalas seriam necessárias.
  getScore("ciwaar").questions.push(q("Paciente capaz de comunicar sintomas e cooperar com a escala?",[
    opt("Sim, avaliável",0),opt("Não; delirium importante, intubação ou comunicação inviável",-999)
  ]));

  // Versões diferentes de escore e corte devem continuar com identificação explícita.
  getScore("rcri").reference+="; ACC/AHA Perioperative Guideline 2024, tabela do RCRI.";
  getScore("geneva").reference+="; Diretriz de TEP ACC/AHA 2026, tabela de probabilidade pré-teste.";

  // Expansão do catálogo: regras de decisão e escalas de pontuação simples (soma de itens).
  // Em regras com critérios de alto e médio risco, itens de alto risco valem +10 e de médio risco +1 (apenas para separar estratos).
  const hi=(l)=>q(l,[opt("Não",0),opt("Sim",10)]);
  const md=(l)=>q(l,[opt("Não",0),opt("Sim",1)]);
  const expansionScores=[
    {id:"gcsp",name:"Glasgow-Pupilas (GCS-P)",category:"Emergência",aliases:"glasgow pupilas trauma cranioencefálico reatividade pupilar",
      desc:"GCS ajustado pela reatividade pupilar: GCS-P = GCS − índice de reatividade pupilar.",tags:["Trauma","Neurologia"],
      questions:[
        q("Abertura ocular",[opt("Espontânea",4),opt("À voz",3),opt("À dor",2),opt("Nenhuma",1)]),
        q("Resposta verbal",[opt("Orientada",5),opt("Confusa",4),opt("Palavras inapropriadas",3),opt("Sons incompreensíveis",2),opt("Nenhuma",1)]),
        q("Resposta motora",[opt("Obedece comandos",6),opt("Localiza",5),opt("Retirada",4),opt("Flexão anormal",3),opt("Extensão",2),opt("Nenhuma",1)]),
        q("Reatividade pupilar à luz",[opt("Ambas reativas (subtrai 0)",0),opt("Apenas uma reativa (subtrai 1)",-1),opt("Nenhuma reativa (subtrai 2)",-2)])
      ],
      interpret:n=>"GCS-P "+n+" (faixa 1–15). Quanto menor, pior o prognóstico em TCE grave; usar com avaliação neurológica completa e não para limitar suporte isoladamente.",
      reference:"Brennan PM et al. J Neurosurg. 2018;128:1612–1620.",
      safetyNote:"Componentes não testáveis (intubação, edema palpebral, sedação) não devem receber pontuação normal; documentar o fator limitante."},
    {id:"canadianct",name:"Canadian CT Head Rule",category:"Emergência",aliases:"tce tomografia crânio trauma leve",
      desc:"Indicação de TC de crânio em TCE leve (GCS 13–15) com perda de consciência, amnésia ou desorientação.",tags:["Trauma","PS"],
      questions:[hi("GCS <15 duas horas após o trauma"),hi("Suspeita de fratura de crânio aberta ou com afundamento"),hi("Sinal de fratura de base de crânio (hemotímpano, olhos de guaxinim, otorreia/rinorreia liquórica, sinal de Battle)"),hi("Dois ou mais episódios de vômito"),hi("Idade ≥65 anos"),md("Amnésia retrógrada ≥30 minutos antes do impacto"),md("Mecanismo perigoso (atropelamento, ejeção, queda de altura >1 m ou >5 degraus)")],
      interpret:n=>n>=10?"Critério de ALTO risco presente: TC de crânio indicada (sensibilidade de 100% para intervenção neurocirúrgica na derivação).":n>=1?"Apenas critério de risco MÉDIO: TC indicada (sensibilidade de 98,4% para lesão clinicamente importante).":"Nenhum critério presente: TC de crânio pode ser dispensada pela regra, respeitando julgamento clínico.",
      reference:"Stiell IG et al. Lancet. 2001;357:1391–1396.",
      safetyNote:"Aplicar apenas a TCE leve, ≥16 anos, GCS 13–15. Excluir anticoagulados, coagulopatia, convulsão pós-trauma, déficit neurológico focal, lesão penetrante e gestantes."},
    {id:"ccspine",name:"Canadian C-Spine Rule",category:"Emergência",aliases:"coluna cervical trauma radiografia",
      desc:"Indicação de radiografia cervical em trauma, pacientes alertas (GCS 15) e estáveis.",tags:["Trauma","PS"],
      questions:[hi("Idade ≥65 anos"),hi("Mecanismo perigoso (queda >1 m ou 5 degraus, carga axial, colisão em alta velocidade/capotamento/ejeção, veículo motorizado recreativo, bicicleta)"),hi("Parestesias em extremidades"),
        q("Algum fator de baixo risco que permita avaliar a amplitude de movimento (colisão traseira simples, sentado no PS, deambulou, dor cervical de início tardio, ausência de dor à palpação da linha média)?",[opt("Sim",0),opt("Não",10)]),
        q("Capaz de rodar ativamente o pescoço 45° para esquerda e direita?",[opt("Sim",0),opt("Não",10)])],
      interpret:n=>n>=10?"Regra positiva: imagem da coluna cervical indicada.":"Regra negativa: radiografia dispensável pela regra.",
      reference:"Stiell IG et al. JAMA. 2001;286:1841–1848.",
      safetyNote:"Apenas para adultos alertas, estáveis, ≥16 anos, com trauma agudo. Não usar com GCS <15, instabilidade, lesão penetrante, déficit neurológico agudo ou lesão vertebral conhecida."},
    {id:"nexus",name:"NEXUS — coluna cervical",category:"Emergência",aliases:"coluna cervical trauma critérios",
      desc:"Cinco critérios clínicos para dispensar imagem cervical em trauma contuso.",tags:["Trauma","PS"],
      questions:[q("Dor/sensibilidade na linha média cervical posterior",yesno()),q("Déficit neurológico focal",yesno()),q("Nível de alerta alterado",yesno()),q("Evidência de intoxicação",yesno()),q("Lesão dolorosa distrativa",yesno())],
      interpret:n=>n===0?"Todos os critérios ausentes (baixo risco NEXUS): imagem cervical pode ser dispensada.":"Pelo menos um critério presente: imagem da coluna cervical indicada.",
      reference:"Hoffman JR et al. N Engl J Med. 2000;343:94–99.",
      safetyNote:"Trauma contuso. Dados de validação em idosos são limitados; considerar juízo clínico adicional."},
    {id:"ottawaankle",name:"Ottawa — tornozelo e pé",category:"Emergência",aliases:"entorse tornozelo radiografia fratura",
      desc:"Indicação de radiografia em trauma agudo de tornozelo ou médio-pé.",tags:["Ortopedia","PS"],
      questions:[q("Dor na zona maleolar E sensibilidade óssea na borda posterior/ponta do maléolo lateral (6 cm distais)",yesno()),q("Dor na zona maleolar E sensibilidade óssea na borda posterior/ponta do maléolo medial (6 cm distais)",yesno()),q("Dor na zona maleolar E incapacidade de dar 4 passos (imediatamente e no PS)",yesno()),q("Dor no médio-pé E sensibilidade na base do 5º metatarso",yesno()),q("Dor no médio-pé E sensibilidade no osso navicular",yesno()),q("Dor no médio-pé E incapacidade de dar 4 passos (imediatamente e no PS)",yesno())],
      interpret:n=>n===0?"Critérios ausentes: radiografia pode ser dispensada pela regra.":"Critério presente: indicada radiografia da região correspondente (tornozelo e/ou pé).",
      reference:"Stiell IG et al. JAMA. 1994;271:827–832.",
      safetyNote:"Validada em adultos e crianças maiores; menos confiável com intoxicação, déficit neurológico ou lesões distrativas."},
    {id:"ottawaknee",name:"Ottawa — joelho",category:"Emergência",aliases:"trauma joelho radiografia fratura",
      desc:"Indicação de radiografia em trauma agudo de joelho.",tags:["Ortopedia","PS"],
      questions:[q("Idade ≥55 anos",yesno()),q("Sensibilidade isolada da patela",yesno()),q("Sensibilidade na cabeça da fíbula",yesno()),q("Incapaz de flexionar o joelho a 90°",yesno()),q("Incapaz de dar 4 passos (imediatamente e no PS)",yesno())],
      interpret:n=>n===0?"Critérios ausentes: radiografia pode ser dispensada pela regra.":"Pelo menos um critério presente: radiografia do joelho indicada.",
      reference:"Stiell IG et al. JAMA. 1996;275:611–615.",
      safetyNote:"Adultos ≥18 anos com trauma agudo (<7 dias). Não aplicar em lesões penetrantes ou pacientes não avaliáveis."},
    {id:"ottawasah",name:"Ottawa SAH Rule",category:"Neurologia",aliases:"cefaleia hemorragia subaracnoide",
      desc:"Investigação de hemorragia subaracnoide em cefaleia aguda não traumática com pico em até 1 hora.",tags:["Neurologia","PS"],
      questions:[q("Idade ≥40 anos",yesno()),q("Dor ou rigidez cervical",yesno()),q("Perda de consciência testemunhada",yesno()),q("Início durante esforço físico",yesno()),q("Cefaleia em trovoada (pico imediato)",yesno()),q("Flexão cervical limitada ao exame",yesno())],
      interpret:n=>n===0?"Nenhum critério: HSA improvável (regra de alta sensibilidade) — aplicar apenas na população validada.":"Pelo menos um critério: investigar HSA (TC de crânio e, conforme tempo e protocolo, avaliação adicional).",
      reference:"Perry JJ et al. JAMA. 2013;310:1248–1255.",
      safetyNote:"Apenas para cefaleia nova, atingindo intensidade máxima em 1 h, em pacientes ≥15 anos, neurologicamente intactos. Excluir trauma, déficit neurológico, cefaleias recorrentes e HSA prévia."},
    {id:"sfsr",name:"San Francisco Syncope Rule (CHESS)",category:"Cardiologia",aliases:"síncope risco alto desfechos graves",
      desc:"Risco de desfechos graves em 7–30 dias após síncope.",tags:["PS","Síncope"],
      questions:[q("História de insuficiência cardíaca",yesno()),q("Hematócrito <30%",yesno()),q("ECG anormal (ritmo não sinusal ou alteração nova)",yesno()),q("Dispneia (queixa de falta de ar)",yesno()),q("PAS <90 mmHg na triagem",yesno())],
      interpret:n=>n===0?"Nenhum critério: baixo risco pela regra; manter julgamento clínico.":"Pelo menos um critério: alto risco de desfecho grave; considerar observação/investigação hospitalar.",
      reference:"Quinn JV et al. Ann Emerg Med. 2004;43:224–232.",
      safetyNote:"A validação externa mostrou desempenho variável; usar como apoio, não substituto da avaliação clínica."},
    {id:"chads2",name:"CHADS₂",category:"Cardiologia",aliases:"fibrilação atrial AVC risco tromboembólico",
      desc:"Risco de AVC em fibrilação atrial não valvar (precursor do CHA₂DS₂-VASc).",tags:["Cardiologia","FA"],
      questions:[q("Insuficiência cardíaca",yesno()),q("Hipertensão",yesno()),q("Idade ≥75 anos",yesno()),q("Diabetes",yesno()),q("AVC/AIT prévio",yesno(2))],
      interpret:sumInterpret([[0,0,"CHADS₂ 0: risco baixo."],[1,1,"CHADS₂ 1: risco intermediário."],[2,6,"CHADS₂ ≥2: risco moderado a alto; anticoagulação geralmente indicada, ponderando risco hemorrágico."]]),
      reference:"Gage BF et al. JAMA. 2001;285:2864–2870.",
      safetyNote:"Prefere-se CHA₂DS₂-VASc/VA atuais para decisão de anticoagulação; CHADS₂ é oferecido para comparação."},
    {id:"killip",name:"Classificação de Killip",category:"Cardiologia",aliases:"infarto insuficiência cardíaca choque cardiogênico",
      desc:"Gravidade clínica de insuficiência cardíaca no infarto agudo do miocárdio.",tags:["Cardiologia","IAM"],
      questions:[q("Estado clínico",[opt("I — sem sinais de insuficiência cardíaca",1),opt("II — estertores, B3 ou congestão jugular",2),opt("III — edema agudo de pulmão",3),opt("IV — choque cardiogênico",4)])],
      interpret:n=>"Killip "+["","I","II","III","IV"][n]+". Classificação clínica da gravidade à apresentação; a mortalidade hospitalar aumenta com a classe.",
      reference:"Killip T, Kimball JT. Am J Cardiol. 1967;20:457–464."},
    {id:"sgarbossa",name:"Critérios de Sgarbossa",category:"Cardiologia",aliases:"bloqueio ramo esquerdo infarto ECG marca-passo",
      desc:"Diagnóstico de infarto agudo com oclusão em ECG com bloqueio de ramo esquerdo.",tags:["Cardiologia","ECG"],
      questions:[q("Supra de ST ≥1 mm concordante com o QRS",yesno(5)),q("Infra de ST ≥1 mm em V1–V3 (concordante)",yesno(3)),q("Supra de ST ≥5 mm discordante do QRS",yesno(2))],
      interpret:n=>n>=3?"Sgarbossa ≥3: alta especificidade para infarto agudo; manejo como IAMCSST conforme protocolo.":"Sgarbossa <3: não exclui infarto (baixa sensibilidade); correlacionar com clínica e troponina e considerar critérios de Smith.",
      reference:"Sgarbossa EB et al. N Engl J Med. 1996;334:481–487.",
      safetyNote:"Aplicável a BRE (ou ritmo de marca-passo ventricular). Baixa sensibilidade; não excluir infarto por pontuação baixa."},
    {id:"light",name:"Critérios de Light — derrame pleural",category:"Respiratório",aliases:"derrame pleural exsudato transudato",
      desc:"Diferencia exsudato de transudato; um critério positivo basta para exsudato.",tags:["Pneumologia","Enfermaria"],
      questions:[q("Proteína pleural / proteína sérica >0,5",yesno()),q("LDH pleural / LDH sérico >0,6",yesno()),q("LDH pleural >2/3 do limite superior da normalidade do LDH sérico",yesno())],
      interpret:n=>n===0?"Nenhum critério: transudato provável.":"Pelo menos um critério: exsudato. Pode classificar transudatos em uso de diuréticos como exsudato; considerar gradiente soro-pleural de albumina (>1,2 g/dL sugere transudato).",
      reference:"Light RW et al. Ann Intern Med. 1972;77:507–513.",
      safetyNote:"Coletar amostras séricas e pleurais próximas no tempo."},
    {id:"phq2",name:"PHQ-2",category:"Psiquiatria",aliases:"depressão rastreio humor",
      desc:"Rastreio ultrarrápido de depressão (2 itens) nas últimas 2 semanas.",tags:["APS","Saúde mental"],
      questions:["Pouco interesse ou prazer em fazer as coisas","Sentir-se para baixo, deprimido ou sem esperança"].map(l=>q(l,[opt("Nenhuma vez",0),opt("Vários dias",1),opt("Mais da metade dos dias",2),opt("Quase todos os dias",3)])),
      interpret:n=>n>=3?"PHQ-2 ≥3: rastreio positivo; aplicar PHQ-9 e avaliar clinicamente, incluindo risco de suicídio.":"PHQ-2 <3: rastreio negativo; não exclui depressão se houver suspeita clínica.",
      reference:"Kroenke K et al. Med Care. 2003;41:1284–1292.",
      safetyNote:"Rastreio, não diagnóstico. Sempre avaliar ideação suicida quando houver suspeita."},
    {id:"gad2",name:"GAD-2",category:"Psiquiatria",aliases:"ansiedade rastreio",
      desc:"Rastreio ultrarrápido de ansiedade (2 itens) nas últimas 2 semanas.",tags:["APS","Saúde mental"],
      questions:["Sentir-se nervoso, ansioso ou muito tenso","Não ser capaz de impedir ou controlar as preocupações"].map(l=>q(l,[opt("Nenhuma vez",0),opt("Vários dias",1),opt("Mais da metade dos dias",2),opt("Quase todos os dias",3)])),
      interpret:n=>n>=3?"GAD-2 ≥3: rastreio positivo; aplicar GAD-7 e avaliar clinicamente.":"GAD-2 <3: rastreio negativo.",
      reference:"Kroenke K et al. Ann Intern Med. 2007;146:317–325.",
      safetyNote:"Rastreio, não diagnóstico."},
    {id:"auditc",name:"AUDIT-C",category:"Psiquiatria",aliases:"álcool uso de risco rastreio",
      desc:"Rastreio breve de uso de álcool de risco (3 primeiras questões do AUDIT).",tags:["APS","Álcool"],
      questions:[
        q("Frequência de consumo de álcool",[opt("Nunca",0),opt("Mensalmente ou menos",1),opt("2–4 vezes/mês",2),opt("2–3 vezes/semana",3),opt("≥4 vezes/semana",4)]),
        q("Doses em um dia típico de consumo",[opt("1–2",0),opt("3–4",1),opt("5–6",2),opt("7–9",3),opt("≥10",4)]),
        q("Frequência de ≥6 doses em uma ocasião",[opt("Nunca",0),opt("Menos que mensalmente",1),opt("Mensalmente",2),opt("Semanalmente",3),opt("Diariamente ou quase",4)])
      ],
      interpret:n=>"AUDIT-C "+n+"/12. Rastreio positivo se ≥4 em homens ou ≥3 em mulheres (pontos de corte comumente usados; variam por população). Positivo indica avaliação adicional (AUDIT completo).",
      reference:"Bush K et al. Arch Intern Med. 1998;158:1789–1795.",
      safetyNote:"Rastreio, não diagnóstico de transtorno por uso de álcool."},
    {id:"epworth",name:"Escala de Sonolência de Epworth",category:"Neurologia",aliases:"sonolência diurna apneia sono",
      desc:"Probabilidade de cochilar em 8 situações cotidianas (0 = nunca, 3 = alta).",tags:["Sono","Ambulatório"],
      questions:["Sentado e lendo","Assistindo TV","Sentado, quieto, em local público","Como passageiro de carro por 1 hora sem parar","Deitado à tarde para descansar","Sentado conversando com alguém","Sentado calmamente após almoço sem álcool","Em carro parado no trânsito por alguns minutos"].map(l=>q(l,[opt("Nenhuma chance",0),opt("Pequena chance",1),opt("Chance moderada",2),opt("Alta chance",3)])),
      interpret:sumInterpret([[0,10,"Epworth 0–10: sonolência diurna dentro da faixa normal."],[11,12,"Epworth 11–12: sonolência excessiva leve."],[13,15,"Epworth 13–15: sonolência excessiva moderada."],[16,24,"Epworth 16–24: sonolência excessiva grave; investigar e orientar sobre direção/atividades de risco."]]),
      reference:"Johns MW. Sleep. 1991;14:540–545.",
      safetyNote:"Medida subjetiva; não diagnostica a causa da sonolência."},
    {id:"fourat",name:"4AT — rastreio de delirium",category:"Geriatria",aliases:"delirium confusão aguda idoso",
      desc:"Rastreio rápido de delirium e comprometimento cognitivo.",tags:["Geriatria","Enfermaria"],
      questions:[
        q("1. Alerta",[opt("Normal (plenamente alerta, sem agitação)",0),opt("Sonolência leve <10 s ao acordar, depois normal",0),opt("Claramente anormal",4)]),
        q("2. AMT4 (idade, data de nascimento, local, ano)",[opt("Nenhum erro",0),opt("1 erro",1),opt("≥2 erros ou não testável",2)]),
        q("3. Atenção: meses do ano em ordem inversa",[opt("≥7 meses corretos",0),opt("Começa mas <7 meses",1),opt("Recusa ou não testável",2)]),
        q("4. Mudança aguda ou curso flutuante (alerta, cognição ou comportamento, nas últimas 2 semanas e ainda presente nas últimas 24 h)",[opt("Não",0),opt("Sim",4)])
      ],
      interpret:n=>n>=4?"4AT ≥4: possível delirium (com ou sem comprometimento cognitivo); avaliação clínica formal e investigação de causas.":n>=1?"4AT 1–3: possível comprometimento cognitivo; investigar e reavaliar.":"4AT 0: delirium e comprometimento cognitivo improváveis (não exclui se história sugerir).",
      reference:"Bellelli G et al. Age Ageing. 2014;43:496–502.",
      safetyNote:"Rastreio; diagnóstico de delirium exige avaliação clínica."},
    {id:"braden",name:"Escala de Braden",category:"Enfermagem",aliases:"lesão por pressão úlcera risco",
      desc:"Risco de lesão por pressão (faixa 6–23; menor = maior risco).",tags:["Enfermagem","Enfermaria"],
      questions:[
        q("Percepção sensorial",[opt("Totalmente limitada",1),opt("Muito limitada",2),opt("Levemente limitada",3),opt("Nenhuma limitação",4)]),
        q("Umidade",[opt("Constantemente úmida",1),opt("Muito úmida",2),opt("Ocasionalmente úmida",3),opt("Raramente úmida",4)]),
        q("Atividade",[opt("Acamado",1),opt("Confinado à cadeira",2),opt("Anda ocasionalmente",3),opt("Anda frequentemente",4)]),
        q("Mobilidade",[opt("Totalmente imóvel",1),opt("Muito limitada",2),opt("Levemente limitada",3),opt("Sem limitações",4)]),
        q("Nutrição",[opt("Muito pobre",1),opt("Provavelmente inadequada",2),opt("Adequada",3),opt("Excelente",4)]),
        q("Fricção e cisalhamento",[opt("Problema",1),opt("Problema potencial",2),opt("Nenhum problema aparente",3)])
      ],
      interpret:sumInterpret([[6,9,"Braden ≤9: risco muito alto."],[10,12,"Braden 10–12: risco alto."],[13,14,"Braden 13–14: risco moderado."],[15,18,"Braden 15–18: risco leve."],[19,23,"Braden 19–23: sem risco significativo."]]),
      reference:"Bergstrom N et al. Nurs Res. 1987;36:205–210.",
      safetyNote:"Reavaliar periodicamente; a pontuação orienta prevenção, mas não substitui exame da pele."},
    {id:"morse",name:"Escala de Quedas de Morse",category:"Enfermagem",aliases:"risco de queda hospital",
      desc:"Risco de queda em pacientes hospitalizados.",tags:["Enfermagem","Enfermaria"],
      questions:[
        q("Histórico de queda (atual ou nos últimos 3 meses)",[opt("Não",0),opt("Sim",25)]),
        q("Diagnóstico secundário",[opt("Não",0),opt("Sim",15)]),
        q("Auxílio na deambulação",[opt("Nenhum / acamado / auxiliado por profissional",0),opt("Muletas, bengala ou andador",15),opt("Apoia-se em mobília",30)]),
        q("Terapia intravenosa / dispositivo heparinizado",[opt("Não",0),opt("Sim",20)]),
        q("Marcha",[opt("Normal / acamado / cadeira de rodas",0),opt("Fraca",10),opt("Comprometida",20)]),
        q("Estado mental",[opt("Consciente da própria capacidade",0),opt("Superestima capacidade / esquece limitações",15)])
      ],
      interpret:n=>n>=45?"Morse ≥45: risco ALTO de queda; implementar medidas de prevenção.":n>=25?"Morse 25–44: risco moderado/baixo; medidas padrão de prevenção.":"Morse 0–24: sem risco significativo; medidas básicas.",
      reference:"Morse JM et al. Can J Aging. 1989;8:366–377.",
      safetyNote:"Pontos de corte variam entre instituições (comum: 25 e 45); seguir o protocolo local."},
    {id:"mallampati",name:"Mallampati modificada",category:"Anestesia",aliases:"via aérea difícil intubação",
      desc:"Classificação da visualização orofaríngea para predição de via aérea difícil.",tags:["Anestesia","Via aérea"],
      questions:[q("Estruturas visíveis (sentado, boca aberta, língua protrusa, sem fonação)",[opt("I — palato mole, fauces, úvula e pilares",1),opt("II — palato mole, fauces e úvula",2),opt("III — palato mole e base da úvula",3),opt("IV — apenas palato duro",4)])],
      interpret:n=>"Mallampati "+["","I","II","III","IV"][n]+". Classes III–IV associam-se a maior probabilidade de laringoscopia difícil; preditor isolado de baixa acurácia.",
      reference:"Samsoon GLT, Young JRB. Anaesthesia. 1987;42:487–490.",
      safetyNote:"Combinar com distância tireomentual, abertura bucal, mobilidade cervical e história; não usar isoladamente."},
    {id:"timistemi",name:"TIMI para IAM com Supra de ST (STEMI)",category:"Cardiologia",aliases:"infarto supra de st mortalidade 30 dias",
      desc:"Predição de mortalidade em 30 dias no Infarto Agudo do Miocárdio com Supra de ST (0 a 14 pontos).",tags:["Cardiologia","IAM","Plantão"],
      questions:[
        q("Idade",[opt("<65 anos",0),opt("65–74 anos",2),opt("≥75 anos",3)]),
        q("Diabetes, Hipertensão ou Angina prévia",yesno(1)),
        q("Pressão arterial sistólica <100 mmHg",yesno(3)),
        q("Frequência cardíaca >100 bpm",yesno(2)),
        q("Classificação de Killip II–IV",yesno(2)),
        q("Peso corporal <67 kg",yesno(1)),
        q("Supra de ST anterior (V1–V6) ou Bloqueio de Ramo Esquerdo novo",yesno(1)),
        q("Tempo até terapia de reperfusão >4 horas",yesno(1))
      ],
      interpret:n=>`TIMI STEMI ${n}/14. Mortalidade estimada em 30 dias: ${n===0?"~0,8%":n===1?"~1,6%":n===2?"~2,2%":n===3?"~4,4%":n===4?"~7,3%":n===5?"~12,4%":n===6?"~16,1%":n===7?"~23,4%":n===8?"~26,8%":">35%"}.`,
      reference:"Morrow DA et al. Circulation. 2000;102:2031–2037.",
      safetyNote:"Não atrasar a reperfusão (angioplastia primária ou fibrinólise) para calcular escores prognósticos."},
    {id:"centor",name:"Critérios de Centor / McIsaac (Faringoamigdalite)",category:"Infectologia",aliases:"amigdalite faringite estreptocócica streptococcus pyogenes",
      desc:"Probabilidade de faringoamigdalite bacteriana por Streptococcus pyogenes (Grupo A).",tags:["APS","PS","Infectologia"],
      questions:[
        q("Exsudato ou hipertrofia tonsilar",yesno(1)),
        q("Linfonodomegalia cervical anterior dolorosa",yesno(1)),
        q("Febre >38°C (história ou aferida)",yesno(1)),
        q("Ausência de tosse",yesno(1)),
        q("Faixa etária (modificação de McIsaac)",[opt("3–14 anos",1),opt("15–44 anos",0),opt("≥45 anos",-1)])
      ],
      interpret:n=>n<=1?`McIsaac ${n}: risco muito baixo (<10%); não indicar antibiótico nem teste rápido de rotina.`:n<=3?`McIsaac ${n}: risco intermediário; realizar teste rápido para estreptococo (TRAB) ou cultura de orofaringe e tratar se positivo.`:`McIsaac ${n} (≥4): alta probabilidade (>50%); considerar teste rápido ou tratamento antimicrobiano empírico (Penicilina G Benzatina IM ou Amoxicilina por 10 dias).`,
      reference:"McIsaac WJ et al. CMAJ. 1998;158:75–83.",
      safetyNote:"Não se aplica a pacientes com sinais de alarme para abscesso peritonsilar, epiglotite ou síndrome de Lemierre."},
    {id:"rass",name:"Escala RASS (Sedação e Agitação de Richmond)",category:"Terapia Intensiva",aliases:"sedação agitação uti ventilação mecânica",
      desc:"Graduação do nível de agitação ou sedação em pacientes críticos (+4 a −5).",tags:["UTI","Plantão","Sedação"],
      questions:[
        q("Estado observado do paciente",[
          opt("+4 Combativo — violento, perigo imediato para a equipe",4),
          opt("+3 Muito agitado — puxa ou remove tubos/cateteres, agressivo",3),
          opt("+2 Agitado — movimentos frequentes sem propósito, briga com o ventilador",2),
          opt("+1 Inquieto — ansioso, apreensivo, mas movimentos não agressivos",1),
          opt("0 Alerta e calmo (Meta habitual de UTI)",0),
          opt("−1 Sonolento — desperta à voz e mantém contato visual >10 segundos",-1),
          opt("−2 Sedação leve — desperta à voz com contato visual breve <10 segundos",-2),
          opt("−3 Sedação moderada — movimento ou abertura ocular à voz, sem contato visual",-3),
          opt("−4 Sedação profunda — sem resposta à voz, mas movimenta-se ao estímulo físico",-4),
          opt("−5 Não despertável — nenhuma resposta à voz ou ao estímulo físico",-5)
        ])
      ],
      interpret:n=>n>0?`RASS +${n}: Agitação. Avaliar dor (CPOT/BPS), delirium (CAM-ICU), hipóxia, retenção urinária ou assincronia ventilatória antes de aprofundar sedação.`:n>=-2?`RASS ${n}: Faixa de sedação leve/alerta (0 a −2), alvo recomendado pela diretriz PADIS para a maioria dos pacientes em VM.`:`RASS ${n}: Sedação moderada a profunda (−3 a −5). Indicada apenas em situações específicas (SARA grave com P/F <150, bloqueio neuromuscular, hipertensão intracraniana ou estado de mal epiléptico).`,
      reference:"Sessler CN et al. Am J Respir Crit Care Med. 2002;166:1338–1344."},
    {id:"fourcoma",name:"Escala de Coma de FOUR",category:"Neurologia",aliases:"coma intubado tronco encefálico",
      desc:"Avaliação neurológica em pacientes comatosos ou intubados (0 a 16 pontos: Olhos, Motor, Tronco e Respiração).",tags:["Neurologia","UTI","Plantão"],
      questions:[
        q("Resposta Ocular (E)",[opt("4 — Pálpebras abertas, rastreia ou pisca ao comando",4),opt("3 — Pálpebras abertas, mas não rastreia",3),opt("2 — Pálpebras fechadas, mas abre à voz alta",2),opt("1 — Pálpebras fechadas, mas abre à dor",1),opt("0 — Pálpebras permanecem fechadas mesmo à dor",0)]),
        q("Resposta Motora (M)",[opt("4 — Faz sinal de positivo, punho fechado ou paz ao comando",4),opt("3 — Localiza estímulo doloroso",3),opt("2 — Resposta flexora à dor",2),opt("1 — Resposta extensora à dor",1),opt("0 — Nenhuma resposta à dor ou estado mioclônico generalizado",0)]),
        q("Reflexos de Tronco Encefálico (B)",[opt("4 — Reflexos pupilar e corneano presentes",4),opt("3 — Uma pupila midriática e fixa",3),opt("2 — Reflexo pupilar OU corneano ausente",2),opt("1 — Reflexos pupilar E corneano ausentes",1),opt("0 — Reflexos pupilar, corneano E de tosse ausentes",0)]),
        q("Respiração (R)",[opt("4 — Não intubado, padrão respiratório regular",4),opt("3 — Não intubado, padrão de Cheyne-Stokes",3),opt("2 — Não intubado, respiração irregular",2),opt("1 — Intubado, respira acima da frequência do ventilador",1),opt("0 — Intubado, respira na frequência do ventilador ou apneia",0)])
      ],
      interpret:n=>`FOUR Score ${n}/16. ${n===0?"FOUR 0/16: ausência completa de reflexos de tronco e drive respiratório; avaliar protocolo de morte encefálica se pré-requisitos atendidos.":n<=7?"Comprometimento neurológico grave; monitorização intensiva.":n<=12?"Rebaixamento moderado.":"Comprometimento leve."}`,
      reference:"Wijdicks EFM et al. Ann Neurol. 2005;58:585–593."},
    {id:"rockall",name:"Escore de Rockall Pré-Endoscópico (Clínico)",category:"Gastroenterologia",aliases:"hemorragia digestiva alta hda mortalidade",
      desc:"Estratificação clínica inicial de mortalidade na Hemorragia Digestiva Alta antes da EDA (0 a 7 pontos).",tags:["Gastroenterologia","PS"],
      questions:[
        q("Idade",[opt("<60 anos",0),opt("60–79 anos",1),opt("≥80 anos",2)]),
        q("Estado hemodinâmico (Choque)",[opt("Sem choque (PAS ≥100 mmHg e FC <100 bpm)",0),opt("Taquicardia (PAS ≥100 mmHg e FC ≥100 bpm)",1),opt("Hipotensão (PAS <100 mmHg)",2)]),
        q("Comorbidades",[opt("Nenhuma comorbidade maior",0),opt("IC, coronariopatia ou outra comorbidade maior",2),opt("Insuficiência renal, insuficiência hepática ou neoplasia disseminada",3)])
      ],
      interpret:n=>n===0?"Rockall clínico 0: risco muito baixo de mortalidade (<0,5%).":n<=2?`Rockall clínico ${n}: risco baixo a moderado.`:`Rockall clínico ${n} (≥3): alto risco de mortalidade; ressuscitação e endoscopia digestiva alta prioritária.`,
      reference:"Rockall TA et al. Gut. 1996;38:316–321."},
    {id:"burchwartofsky",name:"Escore de Burch-Wartofsky (Tempestade Tireotóxica)",category:"Endocrinologia",aliases:"crise tireotóxica hipertireoidismo tireotoxicose",
      desc:"Probabilidade diagnóstica de Tempestade Tireotóxica em pacientes com tireotoxicose.",tags:["Endocrinologia","UTI","Plantão"],
      questions:[
        q("Temperatura axilar/central",[opt("<37,2 °C",0),opt("37,2–37,7 °C",5),opt("37,8–38,2 °C",10),opt("38,3–38,8 °C",15),opt("38,9–39,3 °C",20),opt("39,4–39,9 °C",25),opt("≥40,0 °C",30)]),
        q("Efeitos no Sistema Nervoso Central",[opt("Ausentes",0),opt("Leves (agitação)",10),opt("Moderados (delirium, psicose, letargia extrema)",20),opt("Graves (convulsões ou coma)",30)]),
        q("Disfunção Gastrointestinal / Hepática",[opt("Ausente",0),opt("Moderada (diarreia, náuseas/vômitos ou dor abdominal)",10),opt("Grave (icterícia inexplicada)",20)]),
        q("Frequência Cardíaca (bpm)",[opt("<90 bpm",0),opt("90–109 bpm",5),opt("110–119 bpm",10),opt("120–129 bpm",15),opt("130–139 bpm",20),opt("≥140 bpm",25)]),
        q("Insuficiência Cardíaca Congestiva",[opt("Ausente",0),opt("Leve (edema pedal)",5),opt("Moderada (estertores bibasais)",10),opt("Grave (edema agudo de pulmão)",15)]),
        q("Fibrilação Atrial",[opt("Ausente",0),opt("Presente",10)]),
        q("Evento precipitante identificado (infecção, cirurgia, suspensão de antitireoidiano)",[opt("Ausente",0),opt("Presente",10)])
      ],
      interpret:n=>n>=45?`Burch-Wartofsky ${n} (≥45): ALTAMENTE SUGESTIVO de Tempestade Tireotóxica! Iniciar tratamento imediato em UTI (1º Propranolol + Propiltiouracil/Metimazol + Hidrocortisona + Lugol 1h APÓS a tionamida!).`:n>=25?`Burch-Wartofsky ${n} (25–44): Tempestade tireotóxica iminente; monitorização intensiva e início de terapia antitireoidiana.`:`Burch-Wartofsky ${n} (<25): Tempestade tireotóxica improvável.`,
      reference:"Burch HB, Wartofsky L. Endocrinol Metab Clin North Am. 1993;22:263–277."},
    {id:"pesi",name:"PESI Original (Pulmonary Embolism Severity Index)",category:"Respiratório",aliases:"embolia pulmonar tep prognóstico classes",
      desc:"Estratificação de risco de mortalidade em 30 dias no Tromboembolismo Pulmonar (Classes I a V).",tags:["Pneumologia","PS","Plantão"],
      questions:[
        q("Faixa etária aproximada (pontos = idade em anos)",[opt("40 anos",40),opt("50 anos",50),opt("60 anos",60),opt("70 anos",70),opt("80 anos",80),opt("90 anos",90)]),
        q("Sexo masculino",yesno(10)),
        q("Neoplasia ativa ou prévia",yesno(30)),
        q("Insuficiência cardíaca",yesno(10)),
        q("Doença pulmonar crônica",yesno(10)),
        q("Frequência cardíaca ≥110 bpm",yesno(20)),
        q("PAS <100 mmHg",yesno(30)),
        q("Frequência respiratória ≥30 irpm",yesno(20)),
        q("Temperatura <36 °C",yesno(20)),
        q("Estado mental alterado (desorientação, letargia, torpor, coma)",yesno(60)),
        q("SatO₂ <90% (com ou sem O₂)",yesno(20))
      ],
      interpret:n=>n<=65?`PESI ${n} — Classe I (Risco Muito Baixo: mortalidade 0–1,6%).`:n<=85?`PESI ${n} — Classe II (Risco Baixo: mortalidade 1,7–3,5%). Classes I e II podem ser candidatas a tratamento domiciliar com DOAC se sem disfunção de VD.`:n<=105?`PESI ${n} — Classe III (Risco Intermediário: mortalidade 3,2–7,1%); internação hospitalar.`:n<=125?`PESI ${n} — Classe IV (Risco Alto: mortalidade 4,0–11,4%); internação e vigilância de VD.`:`PESI ${n} — Classe V (Risco Muito Alto: mortalidade 10–24,5%); monitorização intensiva.`,
      reference:"Aujesky D et al. Am J Respir Crit Care Med. 2005;172:1041–1046."},
    {id:"lrinec",name:"Escore LRINEC (Fasciíte Necrosante)",category:"Infectologia",aliases:"fasciíte necrosante gangrena fournier partes moles",
      desc:"Apoio laboratorial para diferenciar Fasciíte Necrosante de celulite grave (0 a 13 pontos).",tags:["Cirurgia","Infectologia","PS"],
      questions:[
        q("Proteína C Reativa (PCR)",[opt("<150 mg/L (<15 mg/dL)",0),opt("≥150 mg/L (≥15 mg/dL)",4)]),
        q("Leucócitos totais (por mm³)",[opt("<15.000",0),opt("15.000–25.000",1),opt(">25.000",2)]),
        q("Hemoglobina (g/dL)",[opt(">13,5 g/dL",0),opt("11,0–13,5 g/dL",1),opt("<11,0 g/dL",2)]),
        q("Sódio sérico (mEq/L)",[opt("≥135 mEq/L",0),opt("<135 mEq/L",2)]),
        q("Creatinina sérica (mg/dL)",[opt("≤1,6 mg/dL",0),opt(">1,6 mg/dL",2)]),
        q("Glicemia (mg/dL)",[opt("≤180 mg/dL",0),opt(">180 mg/dL",1)])
      ],
      interpret:n=>n>=8?`LRINEC ${n} (≥8): Alto risco de Fasciíte Necrosante (VPP >90%); acionar cirurgia imediatamente para exploração/desbridamento!`:n>=6?`LRINEC ${n} (6–7): Suspeita intermediária/alta de Fasciíte Necrosante; avaliação cirúrgica urgente.`:`LRINEC ${n} (<6): Baixa pontuação laboratorial, MAS NÃO EXCLUI Fasciíte Necrosante! Se houver dor desproporcional, bolhas violáceas, crepitação ou choque, indicar exploração cirúrgica imediata!`,
      reference:"Wong CH et al. Crit Care Med. 2004;32:1535–1541.",
      safetyNote:"Sensibilidade limitada: nunca descartar Fasciíte Necrosante por LRINEC <6 quando a suspeita clínica for alta."}
  ];
  for (const item of expansionScores) if (!scores.some(s=>s.id===item.id)) scores.push(item);


  // Lote clínico 5: critérios com somas explícitas. Revisão independente pendente.
  // Cada entrada tem ID estável, população-alvo, referência e limitações.
  const batch5Scores = [
    {id:"ariscat",name:"ARISCAT",category:"Anestesia",aliases:"risco pulmonar cirurgia pós operatório",desc:"Estratifica risco de complicações pulmonares após cirurgia não cardíaca.",tags:["Plantão","Pré-operatório"],auditDate:"2026-10-30",
      questions:[
        q("Idade",[opt("Até 50 anos",0),opt("51–80 anos",3),opt("Acima de 80 anos",16)]),
        q("SpO₂ pré-operatória em ar ambiente",[opt("≥96%",0),opt("91–95%",8),opt("≤90%",24)]),
        q("Infecção respiratória no último mês",yesno(17)),
        q("Hemoglobina ≤10 g/dL",yesno(11)),
        q("Local da incisão",[opt("Periférica ou outra",0),opt("Abdome superior",15),opt("Intratorácica",24)]),
        q("Duração prevista da cirurgia",[opt("Menos de 2 horas",0),opt("2 a 3 horas",16),opt("Mais de 3 horas",23)]),
        q("Cirurgia de emergência",yesno(8))
      ],
      interpret:n=>n<26?"ARISCAT "+n+": risco baixo.":n<45?"ARISCAT "+n+": risco intermediário.":"ARISCAT "+n+": risco alto de complicações pulmonares pós-operatórias.",
      reference:"Canet J et al. Anesthesiology 2010;113:1338–1350; revisão brasileira Rev Col Bras Cir 2023, doi:10.1590/0100-6991e-20223125-en.",
      safetyNote:"Usar em população e cirurgia compatíveis; não estima risco individual exato nem substitui avaliação anestésica."
    },
    {id:"aims65",name:"AIMS65",category:"Gastro/Hepato",aliases:"hemorragia digestiva alta prognóstico",desc:"Preditor de mortalidade hospitalar na hemorragia digestiva alta.",tags:["Plantão","Gastroenterologia"],auditDate:"2026-10-30",
      questions:[q("Albumina <3,0 g/dL",yesno()),q("INR >1,5",yesno()),q("Alteração do estado mental (GCS <14)",yesno()),q("PAS ≤90 mmHg",yesno()),q("Idade >65 anos",yesno())],
      interpret:n=>n>=2?"AIMS65 "+n+"/5: maior risco prognóstico; avaliação clínica e endoscópica urgente conforme estabilidade.":"AIMS65 "+n+"/5: menor pontuação prognóstica; não exclui necessidade de internação, transfusão ou endoscopia.",
      reference:"Saltzman JR et al. Gastrointest Endosc. 2011;74:1215–1224.",
      safetyNote:"Prognóstico hospitalar: não usar isoladamente para decisão de alta. Diferenciar de Glasgow-Blatchford."
    },
    {id:"hestia",name:"Critérios de Hestia",category:"Tromboembolismo",aliases:"TEP embolia pulmonar ambulatório internação",desc:"Avalia barreiras clínicas e sociais ao tratamento ambulatorial de TEP confirmado.",tags:["Plantão","TEP"],auditDate:"2026-10-30",
      questions:[
        q("Instabilidade hemodinâmica",yesno()),q("Necessidade de trombólise ou embolectomia",yesno()),
        q("Sangramento ativo ou alto risco hemorrágico",yesno()),q("Necessidade de O₂ >24h para manter saturação >90%",yesno()),
        q("TEP diagnosticado durante anticoagulação",yesno()),q("Dor intensa exigindo analgesia IV >24h",yesno()),
        q("Motivo clínico ou social para internação >24h",yesno()),q("Clearance de creatinina <30 mL/min",yesno()),
        q("Insuficiência hepática grave",yesno()),q("Gestação",yesno()),
        q("História documentada de trombocitopenia induzida por heparina",yesno())
      ],
      interpret:n=>n===0?"Hestia negativo: sem critérios de exclusão identificados; apenas CONSIDERAR tratamento ambulatorial após avaliação completa.":"Hestia positivo ("+n+" critério(s)): há barreira(s) ao tratamento ambulatorial; considerar internação e avaliação individualizada.",
      reference:"AHA/ACC et al. Pulmonary Embolism Guideline, JACC 2026, doi:10.1016/j.jacc.2025.11.005.",
      safetyNote:"Somente após TEP confirmado. Não dá alta automática; avaliar gravidade de TEP, ventrículo direito, biomarcadores e condições de seguimento."
    },
    {id:"orbit",name:"ORBIT — risco hemorrágico",category:"Cardiologia",aliases:"fibrilação atrial anticoagulação sangramento",desc:"Cinco fatores para risco de sangramento maior em fibrilação atrial.",tags:["FA","Anticoagulação"],auditDate:"2026-10-30",
      questions:[q("Idade ≥75 anos",yesno()),q("Hb reduzida/Ht reduzido ou história de anemia",[opt("Não",0),opt("Sim (Hb <13 homem / <12 mulher; Ht <40% homem / <36% mulher)",2)]),q("Sangramento prévio",[opt("Não",0),opt("Sim",2)]),q("TFG <60 mL/min/1,73 m²",yesno()),q("Uso de antiagregante plaquetário",yesno())],
      interpret:n=>n<=2?"ORBIT "+n+"/7: faixa baixa de risco no modelo.":n===3?"ORBIT 3/7: risco intermediário.":"ORBIT "+n+"/7: risco mais alto; corrigir fatores modificáveis e acompanhar.",
      reference:"O'Brien EC et al. Eur Heart J. 2015;36:3258–3264. PMC4670965.",
      safetyNote:"Não negar anticoagulação exclusivamente pelo ORBIT. Considerar história clínica, riscos e benefício."
    },
    {id:"pram",name:"PRAM — asma pediátrica",category:"Pediatria",aliases:"asma criança crise sibilância",desc:"Gravidade clínica da exacerbação asmática pediátrica, 0–12 pontos.",tags:["Plantão","Pediatria"],auditDate:"2026-10-30",
      questions:[
        q("SpO₂",[opt("≥95%",0),opt("92–94%",1),opt("<92%",2)]),
        q("Retração supraesternal",[opt("Ausente",0),opt("Presente",2)]),
        q("Contração dos escalenos",[opt("Ausente",0),opt("Presente",2)]),
        q("Entrada de ar",[opt("Normal",0),opt("Reduzida nas bases",1),opt("Reduzida em ápices e bases",2),opt("Mínima ou ausente",3)]),
        q("Sibilos",[opt("Ausentes",0),opt("Apenas expiratórios",1),opt("Inspiratórios (com ou sem expiratórios)",2),opt("Audíveis sem estetoscópio ou tórax silencioso",3)])
      ],
      interpret:n=>n<=3?"PRAM "+n+"/12: exacerbação leve.":n<=7?"PRAM "+n+"/12: exacerbação moderada.":"PRAM "+n+"/12: exacerbação grave; avaliação urgente e monitorização.",
      reference:"Canadian Paediatric Society, Managing an acute asthma exacerbation in children (2021); Ducharme FM et al. J Pediatr. 2008.",
      safetyNote:"Avaliação pediátrica presencial; assimetria deve ser pontuada pelo lado mais afetado. Não atrasar tratamento de insuficiência respiratória."
    },
    {id:"sarcf",name:"SARC-F",category:"Geriatria",aliases:"sarcopenia perda muscular força idosos",desc:"Rastreio breve de sarcopenia com cinco domínios.",tags:["Geriatria","Ambulatório"],auditDate:"2026-10-30",
      questions:[
        q("Dificuldade para carregar cerca de 4,5 kg",[opt("Nenhuma",0),opt("Alguma",1),opt("Muita ou incapaz",2)]),
        q("Dificuldade para atravessar um cômodo andando",[opt("Nenhuma",0),opt("Alguma",1),opt("Muita, usa auxílio ou incapaz",2)]),
        q("Dificuldade para levantar-se de cadeira/cama",[opt("Nenhuma",0),opt("Alguma",1),opt("Muita ou precisa de ajuda",2)]),
        q("Dificuldade para subir um lance de cerca de 10 degraus",[opt("Nenhuma",0),opt("Alguma",1),opt("Muita ou incapaz",2)]),
        q("Quedas no último ano",[opt("Nenhuma",0),opt("1 a 3",1),opt("4 ou mais",2)])
      ],
      interpret:n=>n>=4?"SARC-F "+n+"/10: rastreio positivo; avaliar força muscular e critérios diagnósticos.":"SARC-F "+n+"/10: rastreio negativo; não exclui sarcopenia se houver suspeita clínica.",
      reference:"Malmstrom TK, Morley JE. J Am Med Dir Assoc. 2013;14:531–532; NCBI Endotext, SARC-F.",
      safetyNote:"Rastreio, não diagnóstico definitivo; sensibilidade limitada."
    },
    {id:"khorana",name:"Khorana — TEV no câncer",category:"Oncologia",aliases:"trombose câncer quimioterapia",desc:"Risco de tromboembolismo venoso em pacientes ambulatoriais com câncer iniciando tratamento sistêmico.",tags:["Oncologia","Trombose"],auditDate:"2026-10-30",
      questions:[
        q("Local primário do tumor",[opt("Outros",0),opt("Pulmão, linfoma, ginecológico, bexiga ou testículo",1),opt("Estômago ou pâncreas",2)]),
        q("Plaquetas pré-tratamento ≥350.000/mm³",yesno()),
        q("Hemoglobina <10 g/dL ou uso de agente estimulador de eritropoiese",yesno()),
        q("Leucócitos pré-tratamento >11.000/mm³",yesno()),
        q("IMC ≥35 kg/m²",yesno())
      ],
      interpret:n=>n===0?"Khorana 0: baixo risco no modelo original.":n<=2?"Khorana "+n+": risco intermediário na classificação original; alguns ensaios usam ≥2 como critério de elegibilidade.":"Khorana "+n+": alto risco na classificação original.",
      reference:"Khorana AA et al. Blood 2008;111:4902–4907.",
      safetyNote:"População: pacientes oncológicos ambulatoriais iniciando quimioterapia sistêmica. Não determina anticoagulação isoladamente."
    },
    {id:"plasmic",name:"PLASMIC",category:"Hematologia",aliases:"PTT ADAMTS13 microangiopatia trombótica",desc:"Estima probabilidade de deficiência grave de ADAMTS13 em suspeita de PTT.",tags:["Hematologia","Urgência"],auditDate:"2026-10-30",
      questions:[
        q("Plaquetas <30.000/mm³",yesno()),
        q("Hemólise (reticulócitos >2,5%, haptoglobina indetectável OU bilirrubina indireta >2 mg/dL)",yesno()),
        q("Ausência de câncer ativo",yesno()),
        q("Ausência de transplante de órgão sólido ou células-tronco",yesno()),
        q("VCM <90 fL",yesno()),
        q("INR <1,5",yesno()),
        q("Creatinina sérica <2 mg/dL",yesno())
      ],
      interpret:n=>n<=4?"PLASMIC "+n+"/7: menor probabilidade de deficiência grave de ADAMTS13.":n===5?"PLASMIC 5/7: probabilidade intermediária.":"PLASMIC "+n+"/7: alta probabilidade; acionar hematologia imediatamente.",
      reference:"ISTH Guidelines for diagnosis of thrombotic thrombocytopenic purpura, J Thromb Haemost. 2020; PMC8146131.",
      safetyNote:"Aplicar apenas em suspeita de microangiopatia trombótica. Pontuação baixa não exclui PTT; não atrasar abordagem urgente."
    },
    {id:"scorten",name:"SCORTEN",category:"Dermatologia",aliases:"necrólise epidérmica tóxica síndrome stevens johnson",desc:"Prognóstico populacional em síndrome de Stevens-Johnson/necrólise epidérmica tóxica.",tags:["Dermatologia","UTI"],auditDate:"2026-10-30",
      questions:[
        q("Idade ≥40 anos",yesno()),q("Neoplasia associada",yesno()),q("FC ≥120 bpm",yesno()),
        q("Superfície epidérmica destacada ou comprometida ≥10%",yesno()),
        q("BUN >28 mg/dL (não confundir com ureia)",yesno()),
        q("Glicemia >250 mg/dL",yesno()),q("Bicarbonato sérico <20 mEq/L",yesno())
      ],
      interpret:n=>n<=1?"SCORTEN "+n+": faixa prognóstica inferior do modelo.":n===2?"SCORTEN 2: risco prognóstico aumentado.":"SCORTEN "+n+": risco prognóstico elevado; requer assistência especializada e reavaliação.",
      reference:"Bastuji-Garin S et al. J Invest Dermatol. 2000;115:149–153; MSD Manual Professional, SCORTEN.",
      safetyNote:"Prognóstico populacional, nunca critério de limitação de suporte. Avaliar evolução e repetir conforme protocolo."
    },
    {id:"westhaven",name:"West Haven — encefalopatia hepática",category:"Gastro/Hepato",aliases:"encefalopatia hepática cirrose",desc:"Graduação clínica de encefalopatia hepática.",tags:["Hepatologia","Enfermaria"],auditDate:"2026-10-30",
      questions:[q("Classificação clínica",[opt("Grau 0: sem alterações identificáveis",0),opt("Grau I: alterações discretas de atenção/sono",1),opt("Grau II: letargia, desorientação temporal ou asterixis",2),opt("Grau III: sonolência marcada/desorientação importante",3),opt("Grau IV: coma",4)])],
      interpret:n=>"West Haven grau "+n+". Investigar precipitantes e avaliar proteção de vias aéreas conforme gravidade.",
      reference:"AASLD/EASL. Hepatic Encephalopathy in Chronic Liver Disease. Hepatology. 2014.",
      safetyNote:"Classificação clínica descritiva, não escore aditivo; outras causas de alteração do sensório devem ser pesquisadas."
    },
    {id:"bap65",name:"BAP-65 — exacerbação de DPOC",category:"Respiratório",aliases:"DPOC exacerbação prognóstico",desc:"Estratifica gravidade em exacerbação aguda de DPOC.",tags:["Pneumologia","Plantão"],auditDate:"2026-10-30",custom:"bap65",
      questions:[q("BUN >25 mg/dL",yesno()),q("Alteração do estado mental",yesno()),q("FC >109 bpm",yesno()),q("Idade >65 anos",yesno())],
      interpret:n=>"BAP-65: "+n+" fatores de risco presentes. Esta SOMA não equivale à classe I–V do modelo original (que depende dos três critérios BAP e da idade). Não usar como classificação prognóstica.",
      reference:"Shorr AF et al. Chest. 2011;140:1177–1183.",
      safetyNote:"Não substitui gasometria, oximetria, exame clínico ou critérios de ventilação."
    }
  ];
  for (const item of batch5Scores) if (!scores.some(s=>s.id===item.id)) scores.push(item);


  // Lote 6: instrumentos com critérios explícitos e versões de referência.
  // Pontuação automatizada é apoio educacional; não equivale a validação assistencial.
  const batch6Scores = [
    {id:"mews",name:"MEWS (Subbe)",category:"Emergência",aliases:"deterioração clínica alerta precoce enfermaria",desc:"Modified Early Warning Score de cinco parâmetros; versão Subbe, 0–14.",tags:["Plantão","Enfermaria"],auditDate:"2026-10-30",
      questions:[
        q("Frequência respiratória (irpm)",[opt("<9",2),opt("9–14",0),opt("15–20",1),opt("21–29",2),opt("≥30",3)]),
        q("Frequência cardíaca (bpm)",[opt("≤40",2),opt("41–50",1),opt("51–100",0),opt("101–110",1),opt("111–129",2),opt("≥130",3)]),
        q("Pressão arterial sistólica (mmHg)",[opt("≤70",3),opt("71–80",2),opt("81–100",1),opt("101–199",0),opt("≥200",2)]),
        q("Temperatura (°C)",[opt("<35,0",2),opt("35,0–38,4",0),opt("≥38,5",2)]),
        q("Estado neurológico (AVPU)",[opt("Alerta",0),opt("Resposta à voz",1),opt("Resposta à dor",2),opt("Sem resposta",3)])
      ],
      interpret:n=>n>=5?"MEWS "+n+"/14: pontuação elevada; resposta clínica rápida conforme protocolo local.":"MEWS "+n+"/14: continuar monitorização e reavaliação conforme contexto; risco não é excluído por pontuação baixa.",
      reference:"Subbe CP et al. QJM 2001;94:521–526; NIHR NCBI Bookshelf NBK602290, tabela MEWS.",
      safetyNote:"Existem várias versões de MEWS. Esta versão exige os cinco parâmetros e não substitui NEWS2 nem protocolo institucional."
    },
    {id:"decaf",name:"DECAF — exacerbação DPOC",category:"Respiratório",aliases:"DPOC internação mortalidade eMRCD eosinopenia",desc:"Prediz mortalidade hospitalar em exacerbação de DPOC internada, 0–6.",tags:["Pneumologia","Plantão"],auditDate:"2026-10-30",
      questions:[
        q("Dispneia habitual eMRCD antes da exacerbação",[opt("eMRCD 1–4",0),opt("eMRCD 5a: confinado ao domicílio, lava-se e veste-se sozinho",1),opt("eMRCD 5b: necessita de ajuda para lavar-se ou vestir-se",2)]),
        q("Eosinófilos <0,05 × 10⁹/L (menos de 50/µL)",yesno()),
        q("Consolidação na radiografia de tórax",yesno()),
        q("pH arterial <7,30",yesno()),
        q("Fibrilação atrial atual ou histórica",yesno())
      ],
      interpret:n=>n<=1?"DECAF "+n+"/6: menor risco prognóstico no modelo.":n===2?"DECAF 2/6: risco intermediário no modelo.":"DECAF "+n+"/6: alto risco prognóstico; monitorização e avaliação de suporte.",
      reference:"Steer J et al. Thorax 2012;67:970–976; PMC8004300, tabela DECAF.",
      safetyNote:"Validado para pacientes hospitalizados com exacerbação de DPOC. Não representa critério automático de alta ou cuidado paliativo."
    },
    {id:"cpot",name:"CPOT — dor em terapia intensiva",category:"Emergência",aliases:"dor paciente crítico não comunicante ventilação",desc:"Critical-Care Pain Observation Tool: quatro domínios comportamentais, 0–8.",tags:["UTI","Dor"],auditDate:"2026-10-30",
      questions:[
        q("Expressão facial",[opt("Relaxada/neutra",0),opt("Tensão facial",1),opt("Careta/grimace",2)]),
        q("Movimentos corporais",[opt("Ausência de movimentos espontâneos",0),opt("Proteção do local de dor",1),opt("Inquietação/agitação",2)]),
        q("Tensão muscular",[opt("Relaxada",0),opt("Tensa ou rígida",1),opt("Muito tensa/rígida",2)]),
        q("Sincronia ventilatória OU vocalização (escolher o grupo aplicável)",[opt("Ventilado: tolera ventilador/movimento",0),opt("Ventilado: tosse, mas tolera",1),opt("Ventilado: luta contra ventilador",2),opt("Não intubado: fala normal ou silêncio",0),opt("Não intubado: suspira ou geme",1),opt("Não intubado: chora ou soluça",2)])
      ],
      interpret:n=>"CPOT "+n+"/8: avalie alteração em relação ao basal e resposta à analgesia; não constitui intensidade autorreferida da dor.",
      reference:"Gélinas C et al. Am J Crit Care 2006;15:420–427; WHO cancer pain guideline 2018, tabela CPOT.",
      safetyNote:"Dor deve ser autorreferida quando possível. Pacientes não comunicantes exigem exame físico e avaliação de causas de agitação."
    },
    {id:"bps",name:"BPS — Behavioral Pain Scale",category:"Emergência",aliases:"dor ventilação mecânica paciente intubado",desc:"Avaliação comportamental de dor em pacientes críticos intubados, 3–12.",tags:["UTI","Dor"],auditDate:"2026-10-30",
      questions:[
        q("Expressão facial",[opt("Relaxada",1),opt("Parcialmente contraída",2),opt("Completamente contraída",3),opt("Careta",4)]),
        q("Movimentos dos membros superiores",[opt("Sem movimentos",1),opt("Parcialmente flexionados",2),opt("Completamente flexionados com dedos fletidos",3),opt("Retração permanente",4)]),
        q("Adaptação à ventilação mecânica",[opt("Tolera movimentos/ventilação",1),opt("Tosse, mas tolera boa parte do tempo",2),opt("Luta contra o ventilador",3),opt("Ventilação não controlável",4)])
      ],
      interpret:n=>"BPS "+n+"/12: valores maiores representam mais comportamentos compatíveis com dor; comparar com a avaliação anterior e o contexto.",
      reference:"Payen JF et al. Crit Care Med 2001;29:2258–2263; KSCCM PADIS guideline, PMC8918705.",
      safetyNote:"Esta versão é para pacientes intubados. Não aplicar automaticamente ao não intubado; não substitui relato da dor quando possível."
    },
    {id:"mnutric",name:"mNUTRIC — risco nutricional em UTI",category:"Emergência",aliases:"nutrição risco paciente crítico",desc:"Índice de risco nutricional modificado, sem IL-6, 0–9 pontos.",tags:["UTI","Nutrição"],auditDate:"2026-10-30",
      questions:[
        q("Idade",[opt("<50 anos",0),opt("50–74 anos",1),opt("≥75 anos",2)]),
        q("APACHE II",[opt("<15",0),opt("15–19",1),opt("20–27",2),opt("≥28",3)]),
        q("SOFA",[opt("<6",0),opt("6–9",1),opt("≥10",2)]),
        q("Número de comorbidades",[opt("0–1",0),opt("≥2",1)]),
        q("Tempo de internação hospitalar antes da UTI",[opt("0–1 dia",0),opt(">1 dia",1)])
      ],
      interpret:n=>n>=5?"mNUTRIC "+n+"/9: alto risco nutricional, requer avaliação especializada.":"mNUTRIC "+n+"/9: abaixo do ponto de corte usual, mas não exclui risco nutricional.",
      reference:"Rahman A et al. Clin Nutr 2016;35:158–162; tabela de componentes de mNUTRIC, Sci Rep 2026.",
      safetyNote:"Requer APACHE II e SOFA calculados corretamente. Não determina prescrição calórica ou proteica isoladamente."
    },
    {id:"oesil",name:"OESIL — síncope",category:"Cardiologia",aliases:"sincope mortalidade prognóstico ECG",desc:"Quatro preditores de mortalidade em 12 meses após síncope, 0–4.",tags:["Plantão","Síncope"],auditDate:"2026-10-30",
      questions:[q("Idade >65 anos",yesno()),q("Doença cardiovascular prévia",yesno()),q("Síncope sem pródromos",yesno()),q("ECG alterado",yesno())],
      interpret:n=>"OESIL "+n+"/4: maior pontuação relaciona-se a maior risco prognóstico; resultado não define alta, observação ou internação sozinho.",
      reference:"Colivicchi F et al. Eur Heart J 2003;24:811–819; PMID 12727148.",
      safetyNote:"Modelo histórico de prognóstico em síncope. Não substitui avaliação cardiológica, ECG ou algoritmos atuais."
    },
    {id:"smartcop",name:"SMART-COP — pneumonia",category:"Respiratório",aliases:"PAC pneumonia suporte ventilatório vasopressor",desc:"Prediz necessidade de suporte respiratório intensivo ou vasopressor na pneumonia comunitária, 0–11.",tags:["Plantão","Pneumonia"],auditDate:"2026-10-30",
      questions:[
        q("PAS <90 mmHg",yesno(2)),q("Envolvimento multilobar na imagem",yesno()),q("Albumina <3,5 g/dL",yesno()),
        q("Taquipneia: ≤50 anos FR ≥25, >50 anos FR ≥30",yesno()),
        q("FC ≥125 bpm",yesno()),q("Confusão aguda",yesno()),
        q("Hipoxemia conforme idade: ≤50 anos, SpO₂ ≤93% ou PaO₂ <70; >50 anos, SpO₂ ≤90% ou PaO₂ <60; sob O₂ usar P/F <333 ou <250, respectivamente",yesno(2)),
        q("pH arterial <7,35",yesno(2))
      ],
      interpret:n=>n>=5?"SMART-COP "+n+"/11: risco alto de necessidade de suporte intensivo no modelo.":n>=3?"SMART-COP "+n+"/11: pontuação associada a maior probabilidade de suporte intensivo.":"SMART-COP "+n+"/11: menor pontuação prognóstica, sem excluir deterioração.",
      reference:"Charles PG et al. Clin Infect Dis 2008;47:375–384; revisão PMC7126707, quadro SMART-COP.",
      safetyNote:"Requer pneumonia comunitária confirmada e critérios de idade corretamente aplicados. Não decidir internação/UTI apenas pelo escore."
    },
    {id:"sic",name:"SIC — coagulopatia associada à sepse",category:"Hematologia",aliases:"sepse coagulação plaquetas INR SOFA",desc:"ISTH SIC: plaquetas, INR e SOFA parcial (respiratório, circulatório, hepático e renal), 0–6.",tags:["UTI","Hematologia"],auditDate:"2026-10-30",
      questions:[
        q("Plaquetas (×10⁹/L)",[opt("≥150",0),opt("100–149",1),opt("<100",2)]),
        q("INR",[opt("≤1,2",0),opt(">1,2 a 1,4",1),opt(">1,4",2)]),
        q("SOFA de quatro componentes (respiratório, cardiovascular, hepático e renal)",[opt("0",0),opt("1",1),opt("≥2",2)])
      ],
      interpret:n=>n>=4?"SIC "+n+"/6: verificar também critério conjunto de coagulação e contexto de sepse.":"SIC "+n+"/6: abaixo do ponto de corte de SIC; reavaliar com evolução laboratorial.",
      reference:"ISTH 2017/2025, J Thromb Haemost 2025, doi:10.1016/j.jtha.2025.03.038; PMC11415329.",
      safetyNote:"Somente no contexto de sepse. Para classificação SIC, total ≥4 e soma de plaquetas+INR >2. Não utilizar SOFA neurológico no item de disfunção orgânica."
    }
  ];
  for (const item of batch6Scores) if(!scores.some(s=>s.id===item.id))scores.push(item);


  // Lote 7: scores com versões identificadas, limites de aplicabilidade e referências.
  const batch7Scores=[
    {id:"ranson",name:"Ranson — pancreatite não biliar (48 h)",category:"Gastro/Hepato",
      aliases:"pancreatite aguda álcool prognóstico 48 horas",desc:"Onze critérios prognósticos da pancreatite aguda NÃO biliar, incluindo dados de admissão e primeiras 48 horas.",tags:["Gastroenterologia","Plantão"],auditDate:"2026-10-30",
      questions:[
        q("Os parâmetros de admissão e das primeiras 48 horas já foram avaliados?",[opt("Sim, período de 48 horas concluído",0),opt("Não, escore ainda incompleto",-999)]),
        q("ADMISSÃO: idade >55 anos",yesno()),q("ADMISSÃO: leucócitos >16.000/mm³",yesno()),
        q("ADMISSÃO: glicose >200 mg/dL",yesno()),q("ADMISSÃO: AST >250 U/L",yesno()),
        q("ADMISSÃO: LDH >350 U/L",yesno()),
        q("ATÉ 48H: queda do hematócrito >10 pontos percentuais",yesno()),
        q("ATÉ 48H: aumento do BUN >5 mg/dL após hidratação (não ureia)",yesno()),
        q("ATÉ 48H: cálcio sérico <8 mg/dL",yesno()),
        q("ATÉ 48H: PaO₂ <60 mmHg",yesno()),
        q("ATÉ 48H: déficit de base >4 mEq/L",yesno()),
        q("ATÉ 48H: sequestro de líquidos >6 L",yesno())
      ],
      interpret:n=>"Ranson não biliar "+n+"/11 após 48 h. "+(n>=3?"Pontuação associada a maior gravidade.":"Menor pontuação no modelo histórico; não exclui complicações.")+" Avaliar Atlanta revisada, falência orgânica e evolução clínica.",
      reference:"Ranson JHC et al. Surg Gynecol Obstet 1974;139:69–81; review PMC9227091, tabela de critérios não biliares.",
      safetyNote:"SÓ válido após avaliação dos 11 parâmetros no período de 48 h e na pancreatite não biliar. Para pancreatite biliar há limiares e número de critérios diferentes; não preencher item ausente como 'Não'."
    },
    {id:"haps",name:"HAPS — pancreatite aguda",category:"Gastro/Hepato",aliases:"pancreatite leve admissão baixo risco",desc:"Critérios de admissão para identificar curso potencialmente não grave de pancreatite aguda.",tags:["Gastroenterologia","Plantão"],auditDate:"2026-10-30",
      questions:[
        q("Defesa abdominal ou dor à descompressão presente",yesno()),
        q("Hematócrito acima/fora da faixa normal para o laboratório e população",yesno()),
        q("Creatinina sérica acima da faixa normal do laboratório",yesno())
      ],
      interpret:n=>n===0?"HAPS com os três critérios favoráveis: provável curso não grave na população validada; manter avaliação clínica.":"HAPS não favorável ("+n+" marcador(es) presente(s)): não classifica como provável curso benigno, sem confirmar gravidade.",
      reference:"Lankisch PG et al. Clin Gastroenterol Hepatol 2009;7:702–705. PMID:19245846.",
      safetyNote:"Marcadores em admissão e faixas de referência do laboratório; não é uma escala de mortalidade. HAPS positivo não dispensa investigação, hidratação ou reavaliação."
    },
    {id:"imrie",name:"Glasgow–Imrie modificado (48 h)",category:"Gastro/Hepato",aliases:"PANCREAS pancreatite aguda glasgow",desc:"Oito preditores de gravidade nas primeiras 48 horas de pancreatite aguda.",tags:["Gastroenterologia","Plantão"],auditDate:"2026-10-30",
      questions:[
        q("PaO₂ <60 mmHg (8 kPa)",yesno()),q("Idade >55 anos",yesno()),
        q("Leucócitos >15.000/mm³",yesno()),
        q("Cálcio sérico <8 mg/dL",yesno()),
        q("BUN >45 mg/dL (ou ureia >96 mg/dL)",yesno()),
        q("LDH >600 U/L",yesno()),
        q("Albumina sérica <3,2 g/dL",yesno()),
        q("Glicose sérica >180 mg/dL",yesno())
      ],
      interpret:n=>"Glasgow–Imrie modificado "+n+"/8: "+(n>=3?"faixa associada a pancreatite aguda potencialmente grave.":"abaixo do corte histórico para gravidade; requer monitorização clínica.") ,
      reference:"Imrie CW et al. Br J Surg 1978;65:337–341; versão modificada em JAMA Surg 2000 (Imrie Scoring System).",
      safetyNote:"Escolhida a versão MODIFICADA com 8 critérios, sem transaminases. Avaliar durante as primeiras 48 horas; não equiparar com Ranson."
    },
    {id:"adrop",name:"A-DROP — pneumonia",category:"Respiratório",aliases:"pneumonia japonesa gravidade idoso jrs",desc:"Cinco componentes de gravidade de pneumonia adquirida na comunidade segundo JRS.",tags:["Pneumonia","Plantão"],auditDate:"2026-10-30",
      questions:[
        q("Idade: homem ≥70 anos ou mulher ≥75 anos",yesno()),
        q("Desidratação clínica ou BUN ≥21 mg/dL",yesno()),
        q("SpO₂ ≤90% ou PaO₂ ≤60 mmHg",yesno()),
        q("Alteração do nível de consciência",yesno()),
        q("PAS ≤90 mmHg",yesno())
      ],
      interpret:n=>"A-DROP "+n+"/5: "+(n===0?"leve pelo modelo":n<=2?"moderada":n===3?"grave":"muito grave")+". Se houver CHOQUE, considerar extremamente grave independentemente do total.",
      reference:"Japanese Respiratory Society adult pneumonia guideline 2024; J Respir Infect Chemother 2025; review PMC11904445.",
      safetyNote:"Os limiares são específicos do A-DROP (não CURB-65). Choque prevalece sobre pontuação e exige avaliação emergencial."
    },
    {id:"cds",name:"Clinical Dehydration Scale — pediatria",category:"Pediatria",aliases:"desidratação gastroenterite criança escore clínico",desc:"Quatro sinais clínicos para apoiar avaliação de desidratação infantil, 0–8 pontos.",tags:["Pediatria","Plantão"],auditDate:"2026-10-30",
      questions:[
        q("Aparência geral",[opt("Normal",0),opt("Sedenta/inquieta ou letárgica, porém irrita-se ao toque",1),opt("Sonolenta, hipotônica, fria ou sudorética",2)]),
        q("Olhos",[opt("Normais",0),opt("Pouco fundos",1),opt("Muito fundos",2)]),
        q("Mucosas",[opt("Úmidas",0),opt("Pegajosas",1),opt("Ressecadas",2)]),
        q("Lágrimas",[opt("Presentes",0),opt("Diminuídas",1),opt("Ausentes",2)])
      ],
      interpret:n=>"CDS "+n+"/8: "+(n===0?"sem sinais clínicos na escala":n<=4?"sinais compatíveis com desidratação leve":"sinais compatíveis com desidratação moderada/importante")+". Correlacionar com perda ponderal e perfusão.",
      reference:"Children's Mercy, Acute Gastroenteritis Clinical Dehydration Assessment; Goldman RD et al. Pediatrics 2008.",
      safetyNote:"Não substitui avaliação de choque, perfusão e peso prévio. Paciente gravemente comprometido exige abordagem imediata."
    },
    {id:"cows",name:"COWS — abstinência de opioides",category:"Psiquiatria",aliases:"opioides abstinência buprenorfina escala",desc:"Escala clínica de abstinência de opioides de 11 itens, 0–48.",tags:["Psiquiatria","Plantão"],auditDate:"2026-10-30",
      questions:[
        q("Pulso em repouso após 1 minuto",[opt("≤80 bpm",0),opt("81–100",1),opt("101–120",2),opt(">120",4)]),
        q("Sudorese nos últimos 30 minutos",[opt("Nenhuma",0),opt("Calafrio/rubor subjetivo",1),opt("Rosto úmido",2),opt("Gotas na testa",3),opt("Suor escorrendo",4)]),
        q("Inquietação observada",[opt("Fica quieto",0),opt("Relata inquietação, consegue ficar parado",1),opt("Movimentos frequentes",3),opt("Incapaz de manter-se parado",5)]),
        q("Tamanho pupilar",[opt("Normal ou miótico",0),opt("Possivelmente maior que esperado",1),opt("Moderadamente dilatado",2),opt("Muito dilatado",5)]),
        q("Dor óssea ou articular atribuível à abstinência",[opt("Ausente",0),opt("Desconforto difuso leve",1),opt("Dor difusa intensa",2),opt("Esfrega articulações ou incapaz de permanecer quieto",4)]),
        q("Rinorreia ou lacrimejamento não explicados por outra causa",[opt("Ausentes",0),opt("Congestão/olhos úmidos",1),opt("Coriza/lágrimas",2),opt("Intensos e contínuos",4)]),
        q("Sintomas gastrointestinais últimos 30 minutos",[opt("Ausentes",0),opt("Cólicas",1),opt("Náusea ou fezes amolecidas",2),opt("Vômito ou diarreia",3),opt("Episódios múltiplos",5)]),
        q("Tremor com mãos estendidas",[opt("Ausente",0),opt("Palpável, não visível",1),opt("Visível discreto",2),opt("Intenso/contrações",4)]),
        q("Bocejos observados",[opt("Nenhum",0),opt("1–2",1),opt("≥3",2),opt("Vários por minuto",4)]),
        q("Ansiedade/irritabilidade",[opt("Ausente",0),opt("Subjetiva discreta",1),opt("Evidente",2),opt("Compromete avaliação",4)]),
        q("Piloereção",[opt("Ausente",0),opt("Arrepio visível/palpável",3),opt("Proeminente",5)])
      ],
      interpret:n=>"COWS "+n+"/48: "+(n<=4?"sem abstinência ou mínima":n<=12?"leve":n<=24?"moderada":n<=36?"moderadamente intensa":"grave")+".",
      reference:"Wesson DR, Ling W. J Psychoactive Drugs 2003;35:253–259; National Institute on Drug Abuse, COWS clinical scale.",
      safetyNote:"Só pontuar manifestações relacionadas à abstinência, não a febre, ansiedade primária ou outras causas. Não iniciar automaticamente buprenorfina por pontuação isolada."
    },
    {id:"naranjo",name:"Algoritmo de Naranjo — reação adversa",category:"Infectologia",aliases:"farmacovigilância causalidade RAM medicamentos",desc:"Dez perguntas para estimativa estruturada de causalidade de reação adversa medicamentosa.",tags:["Farmacovigilância","Segurança"],auditDate:"2026-10-30",
      questions:[
        q("Relatos anteriores conclusivos da reação",[opt("Sim",1),opt("Não",0),opt("Desconhecido",0)]),
        q("Evento ocorreu após administrar medicamento suspeito",[opt("Sim",2),opt("Não",-1),opt("Desconhecido",0)]),
        q("Melhorou após suspender medicamento ou antagonizar",[opt("Sim",1),opt("Não",0),opt("Desconhecido",0)]),
        q("Retornou após reintrodução do medicamento",[opt("Sim",2),opt("Não",-1),opt("Desconhecido",0)]),
        q("Existem outras causas independentes plausíveis",[opt("Sim",-1),opt("Não",2),opt("Desconhecido",0)]),
        q("Reapareceu após administração de placebo",[opt("Sim",-1),opt("Não",1),opt("Desconhecido",0)]),
        q("Concentração tóxica do medicamento detectada",[opt("Sim",1),opt("Não",0),opt("Desconhecido",0)]),
        q("Resposta variou de acordo com a dose",[opt("Sim",1),opt("Não",0),opt("Desconhecido",0)]),
        q("Houve reação semelhante em exposição anterior",[opt("Sim",1),opt("Não",0),opt("Desconhecido",0)]),
        q("Há evidência objetiva de confirmação",[opt("Sim",1),opt("Não",0),opt("Desconhecido",0)])
      ],
      interpret:n=>"Naranjo "+n+": causalidade "+(n>=9?"definida":n>=5?"provável":n>=1?"possível":"duvidosa")+" pelo algoritmo; interpretação não substitui avaliação especializada.",
      reference:"Naranjo CA et al. Clin Pharmacol Ther 1981;30:239–245; NIH LiverTox NCBI Bookshelf NBK548069.",
      safetyNote:"Não realizar reexposição provocativa de rotina para pontuação. Método de apoio à farmacovigilância, não confirmação clínica definitiva."
    },

    {id:"cam",name:"CAM — delirium (4 características)",category:"Geriatria",
      aliases:"delirium confusão aguda avaliação cognitiva",desc:"Algoritmo estruturado CAM: características 1 e 2, além da 3 ou 4.",tags:["Geriatria","Enfermaria"],auditDate:"2026-10-30",
      questions:[
        q("1. Início agudo OU curso flutuante da alteração do estado mental",yesno()),
        q("2. Desatenção",yesno()),
        q("3. Pensamento desorganizado",yesno()),
        q("4. Alteração do nível de consciência (não alerta)",yesno())
      ],
      interpret:n=>"CAM: quatro características. O resultado depende do padrão 1 + 2 + (3 ou 4), NÃO da soma.",
      reference:"Inouye SK et al. Ann Intern Med 1990;113:941–948; Manual MSD para profissionais: método CAM.",
      safetyNote:"Não usar soma aditiva. Requer observação estruturada e informações sobre mudança em relação ao basal. CAM não é CAM-ICU."
    },
    {id:"isthdic",name:"ISTH DIC manifesta (2001)",category:"Hematologia",aliases:"CIVD coagulopatia fibrinogênio protrombina D-dímero",desc:"Escore ISTH 2001 para coagulação intravascular disseminada manifesta com doença predisponente.",tags:["Hematologia","UTI"],auditDate:"2026-10-30",
      questions:[
        q("Existe doença predisponente associada à CIVD?",[opt("Sim",0),opt("Não",-999)]),
        q("Plaquetas (×10⁹/L)",[opt("≥100",0),opt("≥50 e <100",1),opt("<50",2)]),
        q("Marcadores de fibrina (D-dímero/FDP), conforme laboratório",[opt("Sem aumento",0),opt("Aumento moderado",2),opt("Aumento acentuado",3)]),
        q("Prolongamento do TP acima do controle",[opt("<3 segundos",0),opt("≥3 e <6 segundos",1),opt("≥6 segundos",2)]),
        q("Fibrinogênio plasmático",[opt("≥1 g/L (≥100 mg/dL)",0),opt("<1 g/L (<100 mg/dL)",1)])
      ],
      interpret:n=>n>=5?"ISTH-CIVD "+n+"/8: compatível com CIVD manifesta em contexto clínico apropriado; reavaliar diariamente.":"ISTH-CIVD "+n+"/8: abaixo do corte para CIVD manifesta; se suspeita persistir, repetir em 1–2 dias.",
      reference:"ISTH overt DIC criteria; British Committee for Standards in Haematology Br J Haematol 2009 doi:10.1111/j.1365-2141.2009.07600.x.",
      safetyNote:"Obrigatória doença predisponente; o sistema usa marcador de fibrina classificado pelo laboratório. Não diagnosticar CIVD sem contexto clínico e séries laboratoriais."
    }
  ];
  for(const item of batch7Scores){
    const existingIndex=scores.findIndex(s=>s.id===item.id);
    if(existingIndex<0)scores.push(item);
    else if(scores[existingIndex].custom==="reference")scores[existingIndex]=item;
  }


  // Lote 8: substitui fichas 'reference' existentes sem criar novos IDs.
  // Fontes: TG18 (doi:10.1002/jhbp.509), KDIGO 2012/2024, PASI/SBD 2024.
  const batch8PasiRegions=["Cabeça e pescoço","Membros superiores","Tronco","Membros inferiores"];
  const batch8AreaOptions=[
    opt("0% (sem lesão)",0),opt("1–9% da região",1),opt("10–29%",2),
    opt("30–49%",3),opt("50–69%",4),opt("70–89%",5),opt("90–100%",6)
  ];
  const batch8IntensityOptions=[opt("Ausente",0),opt("Leve",1),opt("Moderada",2),opt("Grave",3),opt("Muito grave",4)];
  const batch8Scores=[
    {id:"pesi",name:"PESI completo — TEP confirmado",category:"Tromboembolismo",
      aliases:"embolia pulmonar índice original PESI prognóstico",desc:"PESI original: idade exata em anos e dez fatores adicionais, classes prognósticas I–V.",tags:["Plantão","TEP"],auditDate:"2026-10-30",custom:"pesi",
      questions:[
        q("Sexo masculino",yesno(10)),q("Câncer ativo/recente ou metastático",yesno(30)),
        q("Histórico de insuficiência cardíaca",yesno(10)),q("Doença pulmonar crônica",yesno(10)),
        q("FC ≥110 bpm",yesno(20)),q("PAS <100 mmHg",yesno(30)),
        q("FR ≥30 irpm",yesno(20)),q("Temperatura <36°C",yesno(20)),
        q("Estado mental alterado",yesno(60)),q("Saturação arterial O₂ <90%",yesno(20))
      ],
      interpret:n=>n<=65?"Classe I (muito baixo risco).":n<=85?"Classe II (baixo risco).":n<=105?"Classe III (risco intermediário).":n<=125?"Classe IV (risco elevado).":"Classe V (risco muito elevado).",
      reference:"Aujesky D et al. Am J Respir Crit Care Med. 2005;172:1041–1046; Michigan Medicine 2024, PESI Table 9, NCBI Bookshelf NBK611959.",
      safetyNote:"Apenas em TEP confirmado, em adultos. Não indica alta nem exclui disfunção ventricular direita; usar Hestia, biomarcadores e avaliação clínica."
    },
    {id:"rockall",name:"Rockall completo (após endoscopia)",category:"Gastroenterologia",
      aliases:"hemorragia digestiva alta HDA endoscopia",desc:"Rockall completo: componentes clínicos mais diagnóstico e estigmas endoscópicos, 0–11.",tags:["Gastroenterologia","Plantão"],auditDate:"2026-10-30",
      questions:[
        q("Idade",[opt("<60 anos",0),opt("60–79 anos",1),opt("≥80 anos",2)]),
        q("Choque",[opt("PAS ≥100 e FC <100",0),opt("PAS ≥100 e FC ≥100",1),opt("PAS <100",2)]),
        q("Comorbidade",[opt("Nenhuma comorbidade maior",0),opt("Insuficiência cardíaca, coronariopatia ou outra maior",2),opt("Falência renal/hepática ou neoplasia disseminada",3)]),
        q("Diagnóstico endoscópico",[opt("Sem lesão, sem estigma, ou Mallory-Weiss",0),opt("Outras causas",1),opt("Neoplasia digestiva alta",2)]),
        q("Estigmas endoscópicos",[opt("Ausentes ou ponto escuro isolado",0),opt("Sangue, coágulo aderido, vaso visível ou sangramento ativo",2)])
      ],
      interpret:n=>"Rockall completo "+n+"/11: pontuações mais altas indicam risco prognóstico maior. Não usar isoladamente para alta ou momento de endoscopia.",
      reference:"Rockall TA et al. Gut. 1996;38:316–321; Guidelines for endoscopic management of nonvariceal upper GI bleeding (2025), Table 5.",
      safetyNote:"Exige achados endoscópicos. O Rockall pré-endoscópico (somente 3 primeiros itens) não deve ser confundido com esta pontuação total."
    },
    {id:"tokyochole",name:"Tokyo TG18 — colecistite aguda",category:"Cirurgia",
      aliases:"colecistite diagnostico gravidade cirurgia",desc:"Algoritmo TG18 de suspeita/confirmação e graduação de colecistite aguda.",tags:["Plantão","Cirurgia"],auditDate:"2026-10-30",
      questions:[
        q("Diagnóstico A: Murphy ou dor/massa/sensibilidade no hipocôndrio direito",yesno()),
        q("Diagnóstico B: febre, PCR ou leucocitose",yesno()),
        q("Diagnóstico C: imagem compatível com colecistite aguda",yesno()),
        q("Grau II: leucócitos >18.000/mm³",yesno()),
        q("Grau II: massa dolorosa palpável no hipocôndrio direito",yesno()),
        q("Grau II: sintomas há >72 horas",yesno()),
        q("Grau II: inflamação local intensa, abscesso, gangrena, enfisema ou peritonite biliar",yesno()),
        q("Grau III: hipotensão requer dopamina ≥5 μg/kg/min ou qualquer noradrenalina",yesno()),
        q("Grau III: redução do nível de consciência",yesno()),
        q("Grau III: PaO₂/FiO₂ <300",yesno()),
        q("Grau III: oligúria ou creatinina >2 mg/dL",yesno()),
        q("Grau III: INR >1,5",yesno()),
        q("Grau III: plaquetas <100.000/mm³",yesno())
      ],
      interpret:()=>"",
      reference:"Tokyo Guidelines 2018; Yokoe M et al. J Hepatobiliary Pancreat Sci. 2018;25:41–54. doi:10.1002/jhbp.515.",
      safetyNote:"A+B = suspeita; A+B+C = confirmação pelos critérios. Grau III se houver qualquer disfunção; Grau II se qualquer critério moderado. Requer exclusão de diagnósticos alternativos."
    },
    {id:"tokyocholang",name:"Tokyo TG18 — colangite aguda",category:"Cirurgia",
      aliases:"colangite gravidade via biliar obstrucao",desc:"Algoritmo TG18 de suspeita/confirmação e graduação de colangite aguda.",tags:["Plantão","Cirurgia"],auditDate:"2026-10-30",
      questions:[
        q("Diagnóstico A: febre/calafrios OU leucócitos alterados/PCR elevada",yesno()),
        q("Diagnóstico B: bilirrubina ≥2 mg/dL ou enzimas canaliculares/hepáticas >1,5×LSN",yesno()),
        q("Diagnóstico C: dilatação da via biliar OU causa demonstrada na imagem",yesno()),
        q("Grau II: leucócitos >12.000 ou <4.000/mm³",yesno()),
        q("Grau II: temperatura ≥39°C",yesno()),
        q("Grau II: idade ≥75 anos",yesno()),
        q("Grau II: bilirrubina total ≥5 mg/dL",yesno()),
        q("Grau II: albumina <70% do limite inferior da referência",yesno()),
        q("Grau III: hipotensão requer dopamina ≥5 μg/kg/min ou qualquer noradrenalina",yesno()),
        q("Grau III: alteração do nível de consciência",yesno()),
        q("Grau III: PaO₂/FiO₂ <300",yesno()),
        q("Grau III: oligúria ou creatinina >2 mg/dL",yesno()),
        q("Grau III: INR >1,5",yesno()),
        q("Grau III: plaquetas <100.000/mm³",yesno())
      ],
      interpret:()=>"",
      reference:"Tokyo Guidelines 2018; Kiriyama S et al. J Hepatobiliary Pancreat Sci. 2018;25:17–30. doi:10.1002/jhbp.512.",
      safetyNote:"Suspeita: A+(B ou C); confirmação: A+B+C. Grau II requer 2 dos 5 fatores; Grau III requer 1 disfunção. Reavaliar gravidade e sinais vitais."
    },
    {id:"kdigoaki",name:"KDIGO 2012 — lesão renal aguda",category:"Renal",
      aliases:"LRA insuficiencia renal aguda estágios oliguria creatinina",desc:"Estadiamento por mudança aguda comprovada de creatinina, diurese e início de terapia renal substitutiva.",tags:["Plantão","Nefrologia"],auditDate:"2026-10-30",
      questions:[
        q("Creatinina: MAIOR critério agudo comprovado (Δ de 48 h ou razão em 7 dias)",[
          opt("Sem aumento nos intervalos definidos",0),
          opt("Δ ≥0,3 mg/dL em 48 h ou 1,5–1,9× a basal em até 7 dias",1),
          opt("2,0–2,9× creatinina basal em até 7 dias",2),
          opt("≥3× basal ou aumento agudo para ≥4,0 mg/dL",3)
        ]),
        q("Diurese por duração CONTÍNUA documentada",[
          opt("Sem oligúria documentada suficiente",0),
          opt("<0,5 mL/kg/h por 6 a <12 h",1),
          opt("<0,5 mL/kg/h por ≥12 h",2),
          opt("<0,3 mL/kg/h por ≥24 h OU anúria ≥12 h",3)
        ]),
        q("Terapia renal substitutiva iniciada por LRA",[opt("Não",0),opt("Sim",3)]),
        q("Em menor de 18 anos, queda de TFG estimada para <35 mL/min/1,73m²",[opt("Não ou não se aplica",0),opt("Sim",3)])
      ],
      interpret:()=>"",
      reference:"KDIGO Clinical Practice Guideline for Acute Kidney Injury (2012), capítulo 2.1, Tabela 2. National Kidney Foundation KDOQI Commentary 2013.",
      safetyNote:"É obrigatório confirmar a janela de tempo e o valor basal. Usa-se o MAIOR estágio dos critérios, e não a soma. Sem documentação suficiente não é possível excluir LRA."
    },
    {id:"kdigockd",name:"KDIGO 2024 — DRC (CGA)",category:"Renal",
      aliases:"doença renal cronica categoria G A albuminuria TFG",desc:"Classificação da DRC pelas categorias G de TFG e A de albuminúria, após comprovar cronicidade.",tags:["Ambulatório","Nefrologia"],auditDate:"2026-10-30",custom:"kdigockd",
      reference:"KDIGO 2024 Clinical Practice Guideline for CKD. Kidney Int. 2024;105(Suppl 4S):S117–S314.",
      safetyNote:"DRC exige anormalidade estrutural ou funcional por ≥3 meses. Categorias G1–G2 sem lesão renal persistente não confirmam DRC."
    },
    {id:"pasi",name:"PASI — psoríase (0–72)",category:"Dermatologia",
      aliases:"psoriase extensão area eritema infiltração descamação",desc:"Índice de área e gravidade de psoríase por quatro regiões corporais, cada uma com peso próprio.",tags:["Dermatologia","Ambulatório"],auditDate:"2026-10-30",
      questions:batch8PasiRegions.flatMap(region=>[
        q(region+": área afetada",batch8AreaOptions),
        q(region+": eritema",batch8IntensityOptions),
        q(region+": espessura/infiltração",batch8IntensityOptions),
        q(region+": descamação",batch8IntensityOptions)
      ]),
      interpret:()=>"",
      reference:"Sociedade Brasileira de Dermatologia, Consenso Brasileiro de Psoríase 2024; DermNet, PASI Scoring.",
      safetyNote:"PASI não considera sintomas subjetivos e pode subestimar doença em áreas especiais. Exige avaliação dermatológica das quatro regiões; não se aplica bem a eritrodermia."
    },
    {id:"abcde",name:"ABCDE — triagem de lesão pigmentada",category:"Dermatologia",
      aliases:"melanoma assimetria borda cor diametro evolução",desc:"Checklist de sinais ABCDE para lembrar achados suspeitos em lesões pigmentadas.",tags:["Dermatologia","Ambulatório"],auditDate:"2026-10-30",
      questions:[
        q("A: assimetria",yesno()),q("B: bordas irregulares",yesno()),
        q("C: múltiplas cores ou distribuição irregular",yesno()),
        q("D: diâmetro >6 mm",yesno()),q("E: evolução/mudança da lesão",yesno())
      ],
      interpret:()=>"",
      reference:"American Academy of Dermatology — ABCDEs of melanoma; Ministério da Saúde/INCA — identificação de sinais suspeitos de câncer da pele.",
      safetyNote:"NÃO é escore numérico nem método para excluir melanoma. Um sinal pode justificar avaliação dermatológica; lesões pequenas e sem sinais ABCDE também podem ser melanoma."
    }
  ];
  for(const item of batch8Scores){
    const idx=scores.findIndex(s=>s.id===item.id);
    if(idx<0)scores.push(item);
    else if(scores[idx].custom==="reference")scores[idx]=item;
    else throw Error("Lote 8: ID já implementado e não substituível: "+item.id);
  }

  const categories = ["Todos","Favoritos","Plantão",...new Set(scores.map(s=>s.category))];
  const favKey = "luria:scores:favorites";
  const recentKey = "luria:scores:recent";
  let favorites = new Set(JSON.parse(localStorage.getItem(favKey)||"[]"));
  let recents = JSON.parse(localStorage.getItem(recentKey)||"[]");
  let activeCat = "Todos";
  let query = "";
  const openGroups = new Set();

  function mount() {
    const root = $("#score-app");
    if (!root) return;
    root.innerHTML = `
      <p class="score-intro">Scores clínicos rápidos para plantão, enfermaria e ambulatório. Busque pelo nome, condição clínica ou especialidade e mantenha os mais usados por perto.</p>
      <div class="score-warning"><span>ⓘ</span><div><strong>Apoio clínico, não substituto de julgamento médico.</strong> Confirme critérios, unidades, população validada e protocolo institucional antes de usar o resultado em decisão assistencial.</div></div>
      <section class="score-toolbar">
        <label class="score-search"><span class="score-search-icon">⌕</span><input id="score-search" type="search" placeholder="Buscar score, ex.: TEP, AVC, dor torácica..." autocomplete="off"><button id="score-search-clear" class="score-search-clear" type="button" aria-label="Limpar busca" hidden>×</button></label>
        <div class="score-toolbar-count"><span id="score-total"></span></div>
      </section>
      <div class="score-tabs" id="score-tabs"></div>
      <section class="score-shelf" id="score-favorites-shelf" hidden><div class="score-shelf-head"><div><h3>Favoritos</h3><p>Acesso rápido aos scores que você marcou.</p></div><span class="score-count" id="score-favorites-count">0</span></div><div class="score-grid" id="score-favorites-grid"></div></section>
      <section class="score-shelf" id="score-recent-shelf" hidden><div class="score-shelf-head"><div><h3>Recentes</h3><p>Os últimos scores que você abriu.</p></div><span class="score-count" id="score-recent-count">0</span></div><div class="score-grid" id="score-recent-grid"></div></section>
      <section class="score-section"><div class="score-section-title"><div><h3 id="score-list-title">Todos os scores</h3><p id="score-list-helper">Biblioteca clínica organizada por contexto.</p></div><span class="score-count" id="score-count"></span></div><div class="score-grid" id="score-grid"></div></section>
      <dialog class="score-modal" id="score-modal"></dialog>
    `;
    renderTabs(); renderCards();
    const search=$("#score-search"), clear=$("#score-search-clear");
    search.addEventListener("input", e=>{query=e.target.value.trim().toLowerCase();clear.hidden=!query;renderCards();});
    clear.addEventListener("click",()=>{search.value="";query="";clear.hidden=true;search.focus();renderCards();});
    $("#score-modal").addEventListener("click", e=>{if(e.target.id==="score-modal") e.currentTarget.close();});
  }
  function renderTabs(){
    const box=$("#score-tabs");
    box.innerHTML=categories.map(c=>`<button class="score-tab ${c===activeCat?"active":""}" data-cat="${esc(c)}">${esc(c)}</button>`).join("");
    $$(".score-tab",box).forEach(b=>b.onclick=()=>{activeCat=b.dataset.cat;renderTabs();renderCards();});
  }

  function filtered(){
    return scores.filter(s=>{
      const catOk = activeCat==="Todos" || (activeCat==="Favoritos"&&favorites.has(s.id)) || (activeCat==="Plantão"&&s.tags?.includes("Plantão")) || s.category===activeCat;
      const hay=(s.name+" "+s.category+" "+s.desc+" "+(s.aliases||"")+" "+(s.tags||[]).join(" ")).toLowerCase();
      return catOk && (!query || hay.includes(query));
    });
  }

  function scoreCode(s){
    const parts=s.name.replace(/[^A-Za-zÀ-ÿ0-9²₂-₉]+/g," ").trim().split(/\s+/);
    if(parts.length===1) return parts[0].slice(0,4).toUpperCase();
    return parts.slice(0,2).map(x=>x[0]).join("").toUpperCase();
  }
  function cardHtml(s){
    const fav=favorites.has(s.id);
    return `<article class="score-card">
      <button class="score-fav ${fav?"active":""}" data-fav="${s.id}" type="button" aria-label="${fav?"Remover dos favoritos":"Adicionar aos favoritos"}">${fav?"★":"☆"}</button>
      <button class="score-card-main" data-open="${s.id}" type="button" style="appearance:none;border:0;background:transparent;color:inherit;text-align:left;padding:0;width:100%;">
        <span class="score-code">${esc(scoreCode(s))}</span>
        <span class="score-card-copy"><strong>${esc(s.name)}</strong><p class="score-purpose"><b>Serve para:</b> ${esc(s.desc)}</p><span class="score-card-meta"><span class="score-tag">${esc(s.category)}</span>${(s.tags||[]).slice(0,2).map(t=>`<span class="score-tag">${esc(t)}</span>`).join("")}</span></span>
        <span class="score-arrow">›</span>
      </button>
    </article>`;
  }
  function bindCards(root){
    $$("[data-fav]",root).forEach(b=>b.onclick=e=>{e.stopPropagation();toggleFav(b.dataset.fav);});
    $$("[data-open]",root).forEach(b=>b.onclick=()=>openScore(b.dataset.open));
  }
  function renderShelves(){
    const favs=scores.filter(s=>favorites.has(s.id)).slice(0,6);
    const recentScores=recents.map(id=>scores.find(s=>s.id===id)).filter(Boolean).slice(0,4);
    const fs=$("#score-favorites-shelf"), rs=$("#score-recent-shelf");
    fs.hidden=!favs.length||activeCat==="Favoritos"||!!query;
    rs.hidden=!recentScores.length||activeCat==="Favoritos"||!!query;
    $("#score-favorites-count").textContent=favs.length;
    $("#score-recent-count").textContent=recentScores.length;
    $("#score-favorites-grid").innerHTML=favs.map(cardHtml).join("");
    $("#score-recent-grid").innerHTML=recentScores.map(cardHtml).join("");
    bindCards($("#score-favorites-grid")); bindCards($("#score-recent-grid"));
  }
  function renderCards(){
    const list=filtered(), grid=$("#score-grid");
    $("#score-count").textContent=String(list.length);
    $("#score-total").textContent=list.length+" "+(list.length===1?"score":"scores");
    $("#score-list-title").textContent=activeCat==="Todos"?"Todos os scores":activeCat;
    $("#score-list-helper").textContent=activeCat==="Todos"?"Biblioteca clínica organizada por contexto.":"Scores de "+activeCat.toLowerCase()+".";
    if(!list.length){grid.innerHTML='<div class="score-empty">Nenhum score encontrado com esses filtros.</div>';}else{grid.innerHTML=list.map(cardHtml).join("");bindCards(grid);}
    renderShelves();
  }

  function toggleFav(id){
    favorites.has(id)?favorites.delete(id):favorites.add(id);
    localStorage.setItem(favKey,JSON.stringify([...favorites]));
    renderTabs(); renderCards();
  }

  function openScore(id){
    const s=scores.find(x=>x.id===id), d=$("#score-modal"); if(!s)return;
    recents=[id,...recents.filter(x=>x!==id)].slice(0,8);
    localStorage.setItem(recentKey,JSON.stringify(recents));
    d.innerHTML=`
      <div class="score-modal-head">
        <div><small>${esc(s.category)}</small><h3>${esc(s.name)}</h3><p>${esc(s.desc)}</p></div>
        <button class="score-close" type="button">×</button>
      </div>
      <div class="score-purpose-box"><b>Serve para:</b> ${esc(s.desc)}</div>
      <div class="score-modal-body">
        <form class="score-form" id="score-form"></form>
        <aside class="score-result">
          <span class="score-result-label">Resultado</span><div class="score-result-value" id="score-value">—</div>
          <div class="score-result-text" id="score-text">Preencha os campos.</div>
          <div class="score-result-note" id="score-note">Use o resultado como apoio à decisão clínica.</div>
          <button class="score-copy" type="button" id="score-copy">Copiar interpretação</button>
          <button class="score-reset" type="button" id="score-reset">Limpar</button>
          <div class="score-reference"><strong>Referência:</strong><br>${esc(s.reference||"Referência original do escore.")}</div>
        </aside>
      </div>`;
    $(".score-close",d).onclick=()=>d.close();
    renderForm(s);
    if(s.safetyNote){
      const note=document.createElement("p");note.className="score-warning";
      note.textContent="Limitações de uso: "+s.safetyNote;
      $("#score-form").prepend(note);
    }
    $("#score-copy").onclick=()=>copyResult(s);
    $("#score-reset").onclick=()=>{renderForm(s);if(s.safetyNote){const p=document.createElement("p");p.className="score-warning";p.textContent="Limitações de uso: "+s.safetyNote;$("#score-form").prepend(p);}};
    d.showModal(); renderShelves();
  }

  function renderForm(s){
    const f=$("#score-form");
    if(s.custom){customRender[s.custom](f,s);return;}
    f.innerHTML=s.questions.map((qq,i)=>`
      <div class="score-field"><label>${esc(qq.label)}</label>
      <select data-q="${i}"><option value="">Selecione…</option>${qq.options.map(o=>`<option value="${o.value}">${esc(o.text)} (${o.value>0?"+":""}${o.value})</option>`).join("")}</select>
      ${qq.help?`<small>${esc(qq.help)}</small>`:""}</div>`).join("");
    $$("select",f).forEach(el=>el.onchange=()=>calculateGeneric(s));
    setResult("—","Preencha os campos.","Use o resultado como apoio à decisão clínica.");
  }

  function calculateGeneric(s){
    const vals=$$("#score-form select").map(x=>x.value);
    const phqRisk=s.id==="phq9" && vals[8]!=="" && Number(vals[8])>0;
    if(vals.some(v=>v==="")){
      setResult("—",phqRisk?"Item 9 positivo: avaliar risco de suicídio/autolesão imediatamente, mesmo antes da pontuação total.":"Preencha todos os campos.","");
      return;
    }
    if(s.id==="ciwaar"&&vals[vals.length-1]==="-999"){
      setResult("Não aplicável","CIWA-Ar não pode ser pontuada quando o paciente não consegue cooperar ou relatar sintomas.","Usar avaliação clínica e instrumento apropriado ao cenário.");return;
    }
    if(s.id==="perc"&&vals[vals.length-1]==="1"){
      setResult("Não aplicável","A probabilidade pré-teste de TEP não foi confirmada como baixa; PERC não pode excluir TEP.","Utilize algoritmo diagnóstico apropriado.");return;
    }
    if(s.id==="sic" && vals.length===3 && Number(vals[0])+Number(vals[1])<=2){
      const n=vals.reduce((a,v)=>a+Number(v),0);
      setResult(formatNum(n),"SIC não confirmado: além do total ≥4, plaquetas + INR devem somar mais que 2 pontos.","Conferir classificação de sepse e evolução clínica.");return;
    }
    if(s.id==="ranson" && vals[0]==="-999"){
      setResult("Incompleto","Ranson não biliar precisa de dados de admissão e evolução em 48 horas.","Não atribua pontuação zero a exames não realizados.");return;
    }
    if(s.id==="cam"){
      const v=vals.map(Number);
      const positive=v[0]===1&&v[1]===1&&(v[2]===1||v[3]===1);
      setResult(positive?"CAM positivo":"CAM negativo",
        positive?"Padrão CAM compatível com delirium, exigindo confirmação clínica, causas reversíveis e vigilância.":"Padrão CAM não preenchido; resultado negativo NÃO exclui delirium.",
        "O algoritmo exige 1 + 2 + (3 ou 4), não a soma simples de características.");return;
    }
    if(s.id==="isthdic" && vals[0]==="-999"){
      setResult("Não aplicável","Escore ISTH de CIVD manifesta exige doença predisponente reconhecida.","Sem critério de elegibilidade, não somar os demais itens."); return;
    }

    // Lote 8: algoritmos não aditivos. Jamais interpretar estes campos como soma de pontos.
    if(s.id==="tokyochole" || s.id==="tokyocholang"){
      const a=vals.map(Number), chole=s.id==="tokyochole";
      const diag=chole
        ? (a[0]&&a[1]?(a[2]?"Critérios TG18 preenchidos para confirmação":"Suspeita TG18"): "Critérios diagnósticos TG18 não preenchidos")
        : (a[0]&&(a[1]||a[2])?(a[1]&&a[2]?"Critérios TG18 preenchidos para confirmação":"Suspeita TG18"):"Critérios diagnósticos TG18 não preenchidos");
      const qualifies=chole?(a[0]&&a[1]):(a[0]&&(a[1]||a[2]));
      const moderate=a.slice(3,chole?7:8).reduce((t,x)=>t+x,0);
      const severe=a.slice(chole?7:8).some(x=>x===1);
      const grade=!qualifies?"Gravidade não classificada: falta critério diagnóstico"
        :severe?"Gravidade TG18: grau III (disfunção orgânica)"
        :moderate >= (chole?1:2)?"Gravidade TG18: grau II (moderada)"
        :"Gravidade TG18: grau I (leve pelos critérios preenchidos)";
      setResult(chole?"TG18 colecistite":"TG18 colangite",diag+". "+grade+".",
        "Requer confirmação clínica, diferenciais e reavaliação. A gravidade é classificada somente quando os requisitos de suspeita foram satisfeitos.");
      return;
    }
    if(s.id==="kdigoaki"){
      const v=vals.map(Number), stage=Math.max(...v);
      setResult(stage?"KDIGO LRA "+stage:"Sem critério KDIGO documentado",
        stage?"Estágio "+stage+" (maior critério entre creatinina, diurese, terapia renal substitutiva e TFG pediátrica).":"Os critérios selecionados não demonstram LRA, mas dados incompletos não a excluem.",
        "Aumento de creatinina precisa ser documentado em 48h ou 7 dias. Estágio não é a soma e NÃO pode ser usado sem dados cronológicos válidos.");
      return;
    }
    if(s.id==="pasi"){
      const weights=[0.1,0.2,0.3,0.4]; let total=0;
      for(let i=0;i<4;i++){
        const j=i*4;total+=weights[i]*Number(vals[j])*(Number(vals[j+1])+Number(vals[j+2])+Number(vals[j+3]));
      }
      total=Math.round(total*10)/10;
      setResult(formatNum(total)+" / 72","PASI calculado a partir de extensão e intensidade das lesões nas quatro regiões. Interpretar extensão, área especial e impacto funcional.",
        "A soma dos itens é ponderada pela região. Registro de atividade requer exame dermatológico; PASI não contempla sintomas subjetivos.");
      return;
    }
    if(s.id==="abcde"){
      const n=vals.filter(x=>x==="1").length;
      setResult(n?"Achado(s) suspeito(s)":"Sem sinais ABCDE selecionados",
        n?n+" sinal(is) ABCDE presente(s). Avaliar dermatologicamente; evolução e características adicionais são relevantes.":"Ausência dos sinais do checklist não afasta melanoma.",
        "ABCDE é uma lista descritiva e não uma pontuação de risco, teste diagnóstico ou indicativo isolado de biópsia.");
      return;
    }

    const total=vals.reduce((a,v)=>a+Number(v),0);
    const note=phqRisk?"ATENÇÃO: item 9 positivo. Realizar avaliação clínica imediata de segurança; o total PHQ-9 não classifica risco suicida.":"Pontuação calculada a partir dos critérios selecionados.";
    setResult(formatNum(total),s.interpret(total),note);
  }

  function setResult(value,text,note=""){
    $("#score-value").textContent=value; $("#score-text").textContent=text; $("#score-note").textContent=note;
  }
  function formatNum(n){return Number.isInteger(n)?String(n):String(Math.round(n*10)/10);}
  function field(label,id,type="number",attrs=""){return `<div class="score-field"><label for="${id}">${label}</label><input id="${id}" type="${type}" ${attrs}></div>`;}
  function selectField(label,id,opts){return `<div class="score-field"><label for="${id}">${label}</label><select id="${id}"><option value="">Selecione…</option>${opts.map(o=>`<option value="${o.value}">${esc(o.text)}</option>`).join("")}</select></div>`;}



  const customRender={
    pesi(f,s){
      f.innerHTML=field("Idade exata (anos)","pesi_age","number",'min="18" max="120" step="1"')+
        s.questions.map((qq,i)=>'<div class="score-field"><label for="pesi_q'+i+'">'+esc(qq.label)+'</label><select id="pesi_q'+i+'"><option value="">Selecione…</option>'+
          qq.options.map(o=>'<option value="'+o.value+'">'+esc(o.text)+'</option>').join("")+'</select></div>').join("");
      const update=()=>{
        const input=$("#pesi_age",f);
        const v=$$("select",f).map(x=>x.value);
        const age=Number(input.value);
        if(input.value===""||!Number.isInteger(age)||age<18||age>120||v.some(x=>x==="")){
          setResult("—","Preencha idade exata (18–120 anos) e todos os critérios.","Não usar idade aproximada; o PESI original utiliza um ponto por ano de idade.");return;
        }
        const score=age+v.reduce((a,x)=>a+Number(x),0);
        setResult(score+" pontos",s.interpret(score),
          "Prognóstico em TEP confirmado. PESI não exclui contraindicações ao tratamento ambulatorial.");
      };
      $$("input,select",f).forEach(el=>el.onchange=el.oninput=update);
      setResult("—","Preencha idade exata e todos os critérios.","O PESI usa a idade em anos, não faixas aproximadas.");
    },
    kdigockd(f,s){
      f.innerHTML=
        field("TFG estimada (mL/min/1,73 m²)","ckd_gfr","number",'min="0" max="200" step="any"')+
        field("Relação albumina/creatinina urinária (mg/g)","ckd_acr","number",'min="0" max="200000" step="any"')+
        selectField("Anormalidade renal documentada por 3 meses ou mais?","ckd_duration",[opt("Sim",1),opt("Não / não é possível comprovar",0)])+
        selectField("Outro marcador de lesão renal persistente (ex.: estrutural ou sedimento)?","ckd_marker",[opt("Não ou desconhecido",0),opt("Sim",1)])+
        field("Causa conhecida (opcional)","ckd_cause","text",'maxlength="100" placeholder="Ex.: nefropatia diabética"');
      const update=()=>{
        const gEl=$("#ckd_gfr",f),aEl=$("#ckd_acr",f);
        const duration=$("#ckd_duration",f).value,marker=$("#ckd_marker",f).value;
        const g=Number(gEl.value), a=Number(aEl.value);
        if(gEl.value===""||aEl.value===""||!Number.isFinite(g)||!Number.isFinite(a)||
           g<0||g>200||a<0||a>200000||duration===""||marker===""){
          setResult("—","Informe TFG, RAC em mg/g e cronicidade.","Não confundir RAC mg/g com mg/mmol ou mg/L.");return;
        }
        const gc=g>=90?"G1":g>=60?"G2":g>=45?"G3a":g>=30?"G3b":g>=15?"G4":"G5";
        const ac=a<30?"A1":a<=300?"A2":"A3";
        const hasMarker=a>=30||marker==="1";
        const condition=duration==="1"&&(g<60||hasMarker);
        const cause=$("#ckd_cause",f).value.trim();
        const note=condition?"Cronicidade e alterações são compatíveis com classificação KDIGO de DRC.":"Os dados não confirmam DRC nesta interface; investigar persistência e outras causas.";
        setResult(gc+" "+ac,note+(cause?" Causa informada: "+cause+".":""),
          "Classificação CGA precisa de causa, TFG e albuminúria; G1–G2 A1 sem lesão persistente não estabelecem DRC.");
      };
      $$("input,select",f).forEach(el=>el.onchange=el.oninput=update);
      setResult("—","Preencha TFG, RAC e cronicidade.","Somente valores persistentes permitem classificar doença renal crônica.");
    },

    bap65(f,s){
      f.innerHTML=s.questions.map((qq,i)=>
        '<div class="score-field"><label>'+esc(qq.label)+'</label>'+
        '<select data-q="'+i+'"><option value="">Selecione…</option>'+
        qq.options.map(o=>'<option value="'+o.value+'">'+esc(o.text)+'</option>').join('')+
        '</select></div>'
      ).join('');
      const update=()=>{
        const values=$$('select',f).map(x=>x.value);
        if(values.some(x=>x===''))return setResult('—','Preencha os quatro itens.','BAP-65: BUN, estado mental, pulso e idade.');
        const bap=values.slice(0,3).reduce((sum,x)=>sum+Number(x),0);
        const age=values[3]==='1';
        const cls=bap===0?(age?'II':'I'):({1:'III',2:'IV',3:'V'}[bap]);
        setResult('Classe '+cls,'BAP-65 classe '+cls+' para exacerbação de DPOC.',
          'Classe de gravidade populacional; não substitui gasometria, ventilação, oximetria ou avaliação clínica.');
      };
      $$('select',f).forEach(x=>x.onchange=update);
      setResult('—','Preencha os quatro itens.','A classificação I–V depende dos três fatores BAP e da idade.');
    },

    reference(f,s){
      f.innerHTML='<div class="score-warning"><strong>Referência clínica — cálculo não habilitado.</strong> Esta ferramenta necessita de regras oficiais, tabelas completas ou aplicação por profissional treinado. Não há pontuação automatizada nesta versão.</div><p class="score-intro">'+esc(s.desc)+'</p><p><strong>Fonte para conferência:</strong> '+esc(s.reference)+'</p>';
      setResult("—","Não calcular nesta interface.","Use a diretriz original ou instrumento oficial. Não há validação automatizada para este item.");
    },
    ihs4(f){
      f.innerHTML=field('Nódulos inflamatórios','ih_n','number','min="0" step="1"')+field('Abscessos','ih_a','number','min="0" step="1"')+field('Túneis drenantes','ih_t','number','min="0" step="1"');
      $$("input",f).forEach(el=>el.oninput=calcIHS4);
      setResult('—','Preencha três contagens inteiras.','Ausência de lesão deve ser registrada como zero.');
    },
    hints(f){
      f.innerHTML=
        selectField("Quadro compatível com síndrome vestibular aguda contínua?","h_avs",[opt("Sim",1),opt("Não",0)])+
        selectField("Há nistagmo espontâneo em repouso?","h_nys",[opt("Sim",1),opt("Não",0)])+
        selectField("O examinador tem treinamento específico em HINTS?","h_train",[opt("Sim",1),opt("Não",0)])+
        selectField("Head impulse horizontal","h_hit",[opt("Anormal, com sacada corretiva",0),opt("Normal, sem sacada corretiva",1)])+
        selectField("Nistagmo","h_ntype",[opt("Horizontal unidirecional",0),opt("Muda de direção com o olhar ou é vertical/torsional",1)])+
        selectField("Test of skew","h_skew",[opt("Sem desvio vertical",0),opt("Skew/desalinhamento vertical presente",1)]);
      $$("select",f).forEach(x=>x.onchange=calcHints);
      setResult("—","Preencha os campos.","Use HINTS apenas em síndrome vestibular aguda contínua com nistagmo espontâneo e examinador treinado.");
    },
    framingham(f){
      f.innerHTML=
        field("Idade (30–74 anos)","f_age","number",'min="30" max="74"')+
        selectField("Sexo","f_sex",[opt("Masculino","m"),opt("Feminino","f")])+
        field("Colesterol total (mg/dL)","f_tc","number",'min="1"')+
        field("HDL-c (mg/dL)","f_hdl","number",'min="1"')+
        field("PAS (mmHg)","f_sbp","number",'min="1"')+
        selectField("Em tratamento anti-hipertensivo","f_tx",[opt("Não",0),opt("Sim",1)])+
        selectField("Tabagismo atual","f_smoke",[opt("Não",0),opt("Sim",1)])+
        selectField("Diabetes","f_dm",[opt("Não",0),opt("Sim",1)]);
      $$("input,select",f).forEach(x=>x.oninput=x.onchange=calcFramingham);
      setResult("—","Preencha os campos.","Modelo validado em adultos de 30–74 anos sem doença cardiovascular prévia.");
    },
    news2(f){
      f.innerHTML=
        field("Frequência respiratória (irpm)","n_rr","number",'min="0"')+
        field("SpO₂ (%)","n_spo2","number",'min="0" max="100"')+
        selectField("Escala de SpO₂","n_scale",[opt("Escala 1 — padrão",1),opt("Escala 2 — alvo de 88–92% em hipercapnia confirmada",2)])+selectField("Hipercapnia confirmada e alvo 88–92% definido clinicamente?","n_hyper",[opt("Não",0),opt("Sim",1)])+
        selectField("Oxigênio suplementar","n_o2",[opt("Ar ambiente",0),opt("Sim",1)])+
        field("PAS (mmHg)","n_sbp","number",'min="0"')+
        field("Frequência cardíaca (bpm)","n_hr","number",'min="0"')+
        selectField("Estado de consciência","n_cns",[opt("Alerta",0),opt("Nova confusão ou resposta apenas à voz/dor/sem resposta",3)])+
        field("Temperatura (°C)","n_temp","number",'step="0.1"');
      $$("input,select",f).forEach(x=>x.oninput=x.onchange=calcNews2); setResult("—","Preencha os campos.");
    },
    sofa(f){
      f.innerHTML=
        selectField("Respiração (PaO₂/FiO₂)", "s_resp",[opt("≥400",0),opt("<400",1),opt("<300",2),opt("<200 com suporte respiratório",3),opt("<100 com suporte respiratório",4)])+
        selectField("Plaquetas (×10³/µL)","s_pl",[opt("≥150",0),opt("<150",1),opt("<100",2),opt("<50",3),opt("<20",4)])+
        selectField("Bilirrubina (mg/dL)","s_bili",[opt("<1,2",0),opt("1,2–1,9",1),opt("2,0–5,9",2),opt("6,0–11,9",3),opt("≥12",4)])+
        selectField("Cardiovascular","s_cv",[opt("PAM ≥70",0),opt("PAM <70",1),opt("Dopamina ≤5 mcg/kg/min ou dobutamina (qualquer dose) por ≥1 h",2),opt("Dopamina >5 a ≤15 OU adrenalina/noradrenalina ≤0,1 mcg/kg/min por ≥1 h",3),opt("Dopamina >15 OU adrenalina/noradrenalina >0,1 mcg/kg/min por ≥1 h",4)])+
        selectField("Glasgow","s_gcs",[opt("15",0),opt("13–14",1),opt("10–12",2),opt("6–9",3),opt("<6",4)])+
        selectField("Renal","s_renal",[opt("Creatinina <1,2 mg/dL",0),opt("1,2–1,9",1),opt("2,0–3,4",2),opt("3,5–4,9 ou diurese <500 mL/d",3),opt("≥5,0 ou diurese <200 mL/d",4)]);
      $$("select",f).forEach(x=>x.onchange=()=>{const v=$$("select",f).map(x=>x.value);if(v.some(x=>x===""))return setResult("—","Preencha todos os sistemas.");const n=v.reduce((a,b)=>a+Number(b),0);setResult(String(n),`SOFA total: ${n}/24. Quanto maior a pontuação, maior a disfunção orgânica e o risco prognóstico.`,"Em suspeita de infecção, aumento de ≥2 pontos em relação ao basal integra o conceito de disfunção orgânica do Sepsis-3; o SOFA não deve ser interpretado isoladamente.");}); setResult("—","Preencha os campos.");
    },
    meldna(f){
      f.innerHTML=field("Bilirrubina total (mg/dL)","m_bili","number",'step="0.01" min="0"')+field("INR","m_inr","number",'step="0.01" min="0"')+field("Creatinina (mg/dL)","m_cr","number",'step="0.01" min="0"')+field("Sódio (mEq/L)","m_na","number",'step="0.1" min="100" max="180"')+selectField("Diálise pelo menos 2 vezes na última semana","m_dial",[opt("Não",0),opt("Sim",1)]);
      $$("input,select",f).forEach(x=>x.oninput=x.onchange=calcMeld); setResult("—","Preencha os campos.");
    },
    gbs(f){
      f.innerHTML=
        field("BUN (mg/dL)","g_bun","number",'step="0.1" min="0"')+
        selectField("Sexo","g_sex",[opt("Masculino","m"),opt("Feminino","f")])+
        field("Hemoglobina (g/dL)","g_hb","number",'step="0.1" min="0"')+
        field("PAS (mmHg)","g_sbp","number",'min="0"')+
        selectField("FC ≥100 bpm","g_hr",yesno())+selectField("Melena","g_mel",yesno())+selectField("Síncope","g_syn",yesno(2))+selectField("Doença hepática","g_liv",yesno(2))+selectField("Insuficiência cardíaca","g_hf",yesno(2));
      $$("input,select",f).forEach(x=>x.oninput=x.onchange=calcGBS); setResult("—","Preencha os campos.");
    },
    grace(f){
      f.innerHTML=
        field("Idade (anos)","gr_age","number",'min="18" max="120"')+
        field("Frequência cardíaca (bpm)","gr_hr","number",'min="0"')+
        field("PAS (mmHg)","gr_sbp","number",'min="0"')+
        field("Creatinina (mg/dL)","gr_cr","number",'step="0.01" min="0"')+
        selectField("Classe de Killip","gr_k",[opt("I",0),opt("II",20),opt("III",39),opt("IV",59)])+
        selectField("Parada cardíaca na admissão","gr_ca",yesno(39))+
        selectField("Desvio de ST","gr_st",yesno(28))+
        selectField("Biomarcadores de necrose miocárdica elevados","gr_bio",yesno(14));
      $$("input,select",f).forEach(x=>x.oninput=x.onchange=calcGrace); setResult("—","Preencha os campos.");
    },
    psi(f){
      f.innerHTML=
        field("Idade (anos)","p_age","number",'min="18" max="120"')+
        selectField("Sexo","p_sex",[opt("Masculino","m"),opt("Feminino","f")])+
        selectField("Residente em instituição de longa permanência","p_nh",yesno(10))+
        selectField("Neoplasia","p_ca",yesno(30))+selectField("Doença hepática","p_liv",yesno(20))+selectField("Insuficiência cardíaca","p_hf",yesno(10))+selectField("Doença cerebrovascular","p_cvd",yesno(10))+selectField("Doença renal","p_renal",yesno(10))+
        selectField("Alteração do estado mental","p_ams",yesno(20))+selectField("FR ≥30 irpm","p_rr",yesno(20))+selectField("PAS <90 mmHg","p_sbp",yesno(20))+selectField("Temperatura <35°C ou ≥40°C","p_temp",yesno(15))+selectField("FC ≥125 bpm","p_hr",yesno(10))+
        selectField("pH arterial <7,35","p_ph",yesno(30))+selectField("BUN ≥30 mg/dL","p_bun",yesno(20))+selectField("Sódio <130 mEq/L","p_na",yesno(20))+selectField("Glicose ≥250 mg/dL","p_glu",yesno(10))+selectField("Hematócrito <30%","p_hct",yesno(10))+selectField("PaO₂ <60 mmHg ou SatO₂ <90%","p_o2",yesno(10))+selectField("Derrame pleural","p_eff",yesno(10));
      $$("input,select",f).forEach(x=>x.oninput=x.onchange=calcPsi); setResult("—","Preencha os campos.");
    },
    rts(f){
      f.innerHTML=
        selectField("Glasgow","r_gcs",[opt("13–15",4),opt("9–12",3),opt("6–8",2),opt("4–5",1),opt("3",0)])+
        selectField("PAS (mmHg)", "r_sbp",[opt(">89",4),opt("76–89",3),opt("50–75",2),opt("1–49",1),opt("0",0)])+
        selectField("FR (irpm)", "r_rr",[opt("10–29",4),opt(">29",3),opt("6–9",2),opt("1–5",1),opt("0",0)]);
      $$("select",f).forEach(x=>x.onchange=calcRts); setResult("—","Preencha os campos.");

    }
  };


  function validateScoreInputs(ids){
    const fields=ids.map(id=>$("#"+id));
    if(fields.some(field=>!field||field.value.trim()==="")){
      setResult("—","Preencha todos os campos.","");return false;
    }
    const invalid=fields.some(field=>{
      if(field.validity&& !field.validity.valid)return true;
      if(field.type!=="number")return false;
      const value=Number(field.value);
      return !Number.isFinite(value)
        || (field.min!==""&&field.min!=null&&value<Number(field.min))
        || (field.max!==""&&field.max!=null&&value>Number(field.max));
    });
    if(invalid){setResult("—","Valores fora da faixa válida dos campos.","");return false;}
    return true;
  }

  function calcHints(){
    const ids=["h_avs","h_nys","h_train","h_hit","h_ntype","h_skew"];
    if(!validateScoreInputs(ids)) return;
    if(+$("#h_train").value!==1)return setResult("Não aplicável","HINTS exige examinador treinado; não há interpretação segura sem treinamento.","Não classificar padrão central/periférico por esta ferramenta.");
    if(+$("#h_avs").value!==1 || +$("#h_nys").value!==1){
      return setResult("Não aplicável","O HINTS não deve ser interpretado fora da síndrome vestibular aguda contínua com nistagmo espontâneo.","Use outro raciocínio diagnóstico para vertigem episódica, posicional ou sem nistagmo espontâneo.");
    }
    const central=+$("#h_hit").value===1 || +$("#h_ntype").value===1 || +$("#h_skew").value===1;
    if(central){
      return setResult("Central","HINTS com pelo menos um sinal central: head impulse normal, nistagmo que muda de direção/vertical-torsional ou skew. O padrão é preocupante para AVC de circulação posterior.","Requer avaliação neurológica urgente; HINTS depende de técnica e treinamento e não substitui investigação quando a suspeita clínica permanece.");
    }
    setResult("Periférico","Head impulse anormal com sacada corretiva + nistagmo horizontal unidirecional + ausência de skew: padrão HINTS periférico.","Só é válido na síndrome vestibular aguda apropriada e quando o exame é executado por profissional treinado. Considere HINTS+ se houver perda auditiva aguda.");
  }

  function calcFramingham(){
    const ids=["f_age","f_sex","f_tc","f_hdl","f_sbp","f_tx","f_smoke","f_dm"];
    if(!validateScoreInputs(ids)) return;
    const age=+$("#f_age").value, sex=$("#f_sex").value, tc=+$("#f_tc").value, hdl=+$("#f_hdl").value, sbp=+$("#f_sbp").value;
    if(age<30||age>74||tc<=0||hdl<=0||sbp<=0) return setResult("—","Valores fora da faixa válida do modelo.","Framingham 2008 foi derivado para adultos de 30–74 anos.");
    const tx=+$("#f_tx").value, smoke=+$("#f_smoke").value, dm=+$("#f_dm").value;
    let sum,s0,mean;
    if(sex==="m"){
      sum=3.06117*Math.log(age)+1.12370*Math.log(tc)-0.93263*Math.log(hdl)+(tx?1.99881:1.93303)*Math.log(sbp)+0.65451*smoke+0.57367*dm;
      s0=0.88936; mean=23.9802;
    }else{
      sum=2.32888*Math.log(age)+1.20904*Math.log(tc)-0.70833*Math.log(hdl)+(tx?2.82263:2.76157)*Math.log(sbp)+0.52873*smoke+0.69154*dm;
      s0=0.95012; mean=26.1931;
    }
    const risk=(1-Math.pow(s0,Math.exp(sum-mean)))*100;
    const rounded=Math.round(risk*10)/10;
    const cls=risk<10?"baixo":risk<=20?"moderado":"alto";
    setResult(rounded.toLocaleString("pt-BR",{maximumFractionDigits:1})+"%",`Risco cardiovascular global em 10 anos: ${cls} pela classificação <10%, 10–20% e >20%.`,"A equação estima primeiro evento cardiovascular global e não deve ser aplicada a quem já tem doença cardiovascular estabelecida; nesses casos o risco já é elevado por definição clínica.");
  }

  function calcGrace(){
    const ids=["gr_age","gr_hr","gr_sbp","gr_cr","gr_k","gr_ca","gr_st","gr_bio"]; if(!validateScoreInputs(ids)) return;
    const age=+$("#gr_age").value, hr=+$("#gr_hr").value, sbp=+$("#gr_sbp").value, cr=+$("#gr_cr").value;
    const ageP=age<30?0:age<40?8:age<50?25:age<60?41:age<70?58:age<80?75:age<90?91:100;
    const hrP=hr<50?0:hr<70?3:hr<90?9:hr<110?15:hr<150?24:hr<200?38:46;
    const sbpP=sbp<80?58:sbp<100?53:sbp<120?43:sbp<140?34:sbp<160?24:sbp<200?10:0;
    const crP=cr<0.4?1:cr<0.8?4:cr<1.2?7:cr<1.6?10:cr<2?13:cr<4?21:28;
    const n=ageP+hrP+sbpP+crP+["gr_k","gr_ca","gr_st","gr_bio"].reduce((a,id)=>a+Number($("#"+id).value),0);
    const txt=n<=108?"GRACE ≤108: faixa de menor risco.":n<=140?"GRACE 109–140: risco intermediário.":"GRACE >140: alto risco.";
    setResult(String(n),txt,n>140?"GRACE >140 identifica grupo de alto risco em SCA sem supra e é um dos critérios usados para estratégia invasiva precoce, junto ao quadro clínico.":"Use o GRACE junto a ECG, troponina, estabilidade hemodinâmica e estratégia de SCA; o escore não substitui a avaliação clínica.");
  }

  function calcPsi(){
    const ids=["p_age","p_sex","p_nh","p_ca","p_liv","p_hf","p_cvd","p_renal","p_ams","p_rr","p_sbp","p_temp","p_hr","p_ph","p_bun","p_na","p_glu","p_hct","p_o2","p_eff"];
    if(!validateScoreInputs(ids)) return;
    let n=+$("#p_age").value;
    if($("#p_sex").value==="f") n-=10;
    for(const id of ids.slice(2)) n+=Number($("#"+id).value);
    const cls=n<=70?"Classe II":n<=90?"Classe III":n<=130?"Classe IV":"Classe V";
    const psiText=cls==="Classe II"?"PSI Classe II: baixo risco; tratamento ambulatorial pode ser apropriado se não houver outros motivos para internação.":cls==="Classe III"?"PSI Classe III: baixo a intermediário; considerar observação curta ou internação breve conforme contexto.":cls==="Classe IV"?"PSI Classe IV: risco elevado; manejo hospitalar é geralmente indicado.":"PSI Classe V: risco muito elevado; manejo hospitalar e avaliação de gravidade/UTI conforme quadro.";setResult(String(n),psiText,"A Classe I exige algoritmo clínico específico; esta calculadora numérica classifica apenas Classes II–V.");
  }

  function calcRts(){
    const v=$$("#score-form select").map(x=>x.value); if(v.some(x=>x==="")) return setResult("—","Preencha todos os campos.");
    const [g,s,r]=v.map(Number); const weighted=0.9368*g+0.7326*s+0.2908*r;
    setResult(weighted.toFixed(3),`RTS ponderado: ${weighted.toFixed(3)} / 7,8408.`,"O máximo é 7,8408; valores menores indicam maior comprometimento fisiológico. É ferramenta prognóstica/triagem e não define conduta isoladamente.");
  }

  function calcNews2(){
    const ids=["n_rr","n_spo2","n_scale","n_hyper","n_o2","n_sbp","n_hr","n_cns","n_temp"]; if(!validateScoreInputs(ids)) return; if(+$("#n_scale").value===2&&+$("#n_hyper").value!==1)return setResult("Não aplicável","Escala 2 do NEWS2 exige hipercapnia confirmada e alvo SpO₂ 88–92% definido clinicamente.","Usar Escala 1 sem indicação formal.");
    const rr=+$("#n_rr").value, sp=+$("#n_spo2").value, scale=+$("#n_scale").value, o2=+$("#n_o2").value, sbp=+$("#n_sbp").value, hr=+$("#n_hr").value, cns=+$("#n_cns").value, t=+$("#n_temp").value;
    const rrP=rr<=8?3:rr<=11?1:rr<=20?0:rr<=24?2:3;
    let spP=0;
    if(scale===1) spP=sp<=91?3:sp<=93?2:sp<=95?1:0;
    else {
      if(sp<=83) spP=3; else if(sp<=85) spP=2; else if(sp<=87) spP=1; else if(sp<=92) spP=0;
      else if(o2===0) spP=0; else if(sp<=94) spP=1; else if(sp<=96) spP=2; else spP=3;
    }
    const o2P=o2?2:0;
    const sbpP=sbp<=90?3:sbp<=100?2:sbp<=110?1:sbp<=219?0:3;
    const hrP=hr<=40?3:hr<=50?1:hr<=90?0:hr<=110?1:hr<=130?2:3;
    const tP=t<=35?3:t<=36?1:t<=38?0:t<=39?1:2;
    const n=rrP+spP+o2P+sbpP+hrP+cns+tP;
    let txt=n<=4?"NEWS2 0–4: baixo risco, desde que nenhum parâmetro isolado tenha 3 pontos.":n<=6?"NEWS2 5–6: risco médio; requer avaliação clínica urgente e aumento da frequência de monitorização.":"NEWS2 ≥7: alto risco; requer resposta clínica urgente/emergencial conforme protocolo.";
    if(n<=4 && [rrP,spP,sbpP,hrP,cns,tP].some(x=>x===3)) txt="NEWS2 total 0–4, mas há um parâmetro isolado com 3 pontos.";
    setResult(String(n),txt,"Use a Escala 2 de SpO₂ apenas quando houver indicação clínica de alvo entre 88–92%, como em hipercapnia confirmada.");
  }

  function calcMeld(){
    const ids=["m_bili","m_inr","m_cr","m_na","m_dial"]; if(!validateScoreInputs(ids)) return;
    let bili=Math.max(1,+$("#m_bili").value), inr=Math.max(1,+$("#m_inr").value), cr=Math.max(1,+$("#m_cr").value);
    if(+$("#m_dial").value===1) cr=4; cr=Math.min(4,cr);
    let meld=10*(0.957*Math.log(cr)+0.378*Math.log(bili)+1.120*Math.log(inr)+0.643);
    meld=Math.max(6,Math.min(40,Math.round(meld)));
    const na=Math.max(125,Math.min(137,+$("#m_na").value));
    let meldNa=meld>11?meld+1.32*(137-na)-0.033*meld*(137-na):meld;
    meldNa=Math.max(6,Math.min(40,Math.round(meldNa)));
    setResult(String(meldNa),`MELD-Na: ${meldNa} (MELD base: ${meld}). Pontuações maiores correspondem a maior mortalidade em curto prazo e maior prioridade histórica para transplante.`,"MELD-Na histórico (2016), NÃO fórmula atual de alocação de adultos. O ajuste por sódio só incide quando MELD base >11. Para fila atual, usar MELD 3.0 oficial OPTN/HRSA.");
  }

  function calcGBS(){
    const ids=["g_bun","g_sex","g_hb","g_sbp","g_hr","g_mel","g_syn","g_liv","g_hf"]; if(!validateScoreInputs(ids)) return;
    const bun=+$("#g_bun").value, sex=$("#g_sex").value, hb=+$("#g_hb").value, sbp=+$("#g_sbp").value;
    let n=0;
    n += bun>=70?6:bun>=28?4:bun>=22.4?3:bun>=18.2?2:0;
    if(sex==="m") n += hb<10?6:hb<12?3:hb<13?1:0; else n += hb<10?6:hb<12?1:0;
    n += sbp<90?3:sbp<100?2:sbp<110?1:0;
    n += +$("#g_hr").value + +$("#g_mel").value + +$("#g_syn").value + +$("#g_liv").value + +$("#g_hf").value;
    setResult(String(n),n<=1?`Glasgow-Blatchford ${n}: risco muito baixo; diretrizes permitem considerar alta com seguimento ambulatorial se o paciente estiver clinicamente adequado.`:`Glasgow-Blatchford ${n}: acima da faixa de muito baixo risco (0–1); geralmente requer avaliação hospitalar/endoscópica conforme quadro.`,"Interprete com estabilidade hemodinâmica, comorbidades e protocolo local para hemorragia digestiva alta.");
  }

  function calcIHS4(){
    const vals=["ih_n","ih_a","ih_t"].map(id=>$("#"+id)?.value ?? "");
    if(vals.some(x=>x===""))return setResult("—","Preencha todos os campos.","");
    const nums=vals.map(Number);
    if(nums.some(x=>!Number.isSafeInteger(x)||x<0||x>10000))return setResult("—","Informe contagens inteiras e não negativas.","");
    const n=nums[0]+2*nums[1]+4*nums[2];
    const label=n<=3?"leve":n<=10?"moderada":"grave";
    setResult(String(n),"IHS4 "+n+" — doença "+label+".","Medida de atividade; combinar com extensão das lesões e qualidade de vida.");
  }

  async function copyResult(s){
    const txt=`${s.name}: ${$("#score-value").textContent} — ${$("#score-text").textContent}`;
    try{await navigator.clipboard.writeText(txt);$("#score-copy").textContent="Copiado";setTimeout(()=>$("#score-copy").textContent="Copiar interpretação",1200);}catch{}
  }
  document.readyState==="loading"?document.addEventListener("DOMContentLoaded",mount):mount();
})();
