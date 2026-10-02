
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
      interpret: sumInterpret([[3,8,"Comprometimento grave"],[9,12,"Comprometimento moderado"],[13,15,"Comprometimento leve ou ausente"]]),
      reference:"Teasdale G, Jennett B. Lancet. 1974."
    },
    {id:"news2",name:"NEWS2",category:"Emergência",aliases:"deterioração sinais vitais enfermaria",desc:"Detecção de deterioração clínica a partir de parâmetros fisiológicos.",tags:["Plantão","Enfermaria"],custom:"news2",reference:refs.news2},
    {
      id:"qsofa",name:"qSOFA",category:"Emergência",aliases:"sepse infecção",desc:"Triagem prognóstica rápida em pacientes com suspeita de infecção.",tags:["Plantão","Infectologia"],
      questions:[q("FR ≥ 22 irpm",yesno()),q("PAS ≤ 100 mmHg",yesno()),q("Alteração do estado mental (GCS < 15)",yesno())],
      interpret:sumInterpret([[0,1,"0–1 critério: menor pontuação no qSOFA"],[2,3,"≥2 critérios: maior risco de desfecho desfavorável; requer avaliação clínica completa"]]),
      reference:"Singer M et al. JAMA. 2016;315:801–810."
    },
    {id:"sofa",name:"SOFA",category:"Emergência",aliases:"sepse disfunção orgânica UTI",desc:"Quantifica disfunção de seis sistemas orgânicos.",tags:["UTI","Infectologia"],custom:"sofa",reference:refs.sofa},
    {
      id:"heart",name:"HEART",category:"Cardiologia",aliases:"dor torácica SCA troponina ECG",desc:"Estratifica o risco de eventos cardíacos em pacientes com dor torácica.",tags:["PS","Dor torácica"],
      questions:[
        q("História",[opt("Pouco/nada suspeita",0),opt("Moderadamente suspeita",1),opt("Altamente suspeita",2)]),
        q("ECG",[opt("Normal",0),opt("Alteração inespecífica de repolarização",1),opt("Desvio significativo de ST",2)]),
        q("Idade",[opt("<45 anos",0),opt("45–64 anos",1),opt("≥65 anos",2)]),
        q("Fatores de risco",[opt("Nenhum",0),opt("1–2",1),opt("≥3 ou doença aterosclerótica conhecida",2)]),
        q("Troponina convencional",[opt("≤ limite superior",0),opt("1–3× limite superior",1),opt("≥3× limite superior",2)],"Para hs-cTn, usar protocolo específico do ensaio.")
      ],
      interpret:sumInterpret([[0,3,"HEART 0–3: baixo risco"],[4,6,"HEART 4–6: risco intermediário"],[7,10,"HEART 7–10: alto risco"]]),
      reference:refs.heart
    },
    {
      id:"cha2ds2vasc",name:"CHA₂DS₂-VASc",category:"Cardiologia",aliases:"fibrilação atrial AVC anticoagulação",desc:"Estimativa de risco tromboembólico em fibrilação atrial.",tags:["FA","Anticoagulação"],
      questions:[
        q("Insuficiência cardíaca / disfunção VE",yesno()),q("Hipertensão",yesno()),
        q("Idade",[opt("<65 anos",0),opt("65–74 anos",1),opt("≥75 anos",2)]),
        q("Diabetes mellitus",yesno()),q("AVC/AIT/tromboembolismo prévio",yesno(2)),
        q("Doença vascular",yesno()),q("Sexo feminino",yesno())
      ],
      interpret:(n)=>`Pontuação total: ${n}. Interpretar junto às diretrizes atuais e ao contexto clínico.`,
      reference:"Lip GYH et al. Chest. 2010;137:263–272."
    },
    {
      id:"hasbled",name:"HAS-BLED",category:"Cardiologia",aliases:"sangramento anticoagulação FA",desc:"Identifica fatores associados a maior risco de sangramento.",tags:["FA","Anticoagulação"],
      questions:[
        q("Hipertensão não controlada",yesno()),q("Função renal anormal",yesno()),q("Função hepática anormal",yesno()),
        q("AVC prévio",yesno()),q("Sangramento prévio/predisposição",yesno()),q("INR lábil",yesno()),
        q("Idade >65 anos",yesno()),q("Fármacos que aumentam sangramento",yesno()),q("Álcool",yesno())
      ],
      interpret:(n)=> n>=3 ? "HAS-BLED ≥3: maior risco de sangramento; revisar fatores modificáveis e intensificar o seguimento." : "HAS-BLED 0–2: abaixo do ponto de corte usual para alto risco.",
      reference:"Pisters R et al. Chest. 2010;138:1093–1100."
    },
    {
      id:"wellspe",name:"Wells para TEP",category:"Tromboembolismo",aliases:"embolia pulmonar TEP",desc:"Probabilidade clínica pré-teste de embolia pulmonar.",tags:["PS","TEP"],
      questions:[
        q("Sinais clínicos de TVP",[opt("Não",0),opt("Sim",3)]),
        q("Diagnóstico alternativo menos provável que TEP",[opt("Não",0),opt("Sim",3)]),
        q("FC >100 bpm",[opt("Não",0),opt("Sim",1.5)]),
        q("Imobilização >3 dias ou cirurgia recente",[opt("Não",0),opt("Sim",1.5)]),
        q("TEP/TVP prévia",[opt("Não",0),opt("Sim",1.5)]),
        q("Hemoptise",yesno()),q("Malignidade ativa",yesno())
      ],
      interpret:(n)=> n>4 ? "TEP provável no modelo de 2 níveis (>4)." : "TEP improvável no modelo de 2 níveis (≤4).",
      reference:refs.wells
    },
    {
      id:"perc",name:"PERC",category:"Tromboembolismo",aliases:"embolia pulmonar TEP rule out",desc:"Critérios de exclusão de TEP em pacientes selecionados de baixo risco pré-teste.",tags:["PS","TEP"],
      questions:[
        q("Idade ≥50 anos",yesno()),q("FC ≥100 bpm",yesno()),q("SpO₂ <95%",yesno()),q("Edema unilateral de perna",yesno()),
        q("Hemoptise",yesno()),q("Cirurgia/trauma recente",yesno()),q("TEP/TVP prévia",yesno()),q("Uso de estrogênio",yesno())
      ],
      interpret:(n)=> n===0 ? "PERC negativo (0 critérios) — somente aplicável se probabilidade clínica pré-teste for baixa." : `PERC positivo: ${n} critério(s). A regra não permite excluir TEP.`,
      reference:"Kline JA et al. J Thromb Haemost. 2004;2:1247–1255."
    },
    {
      id:"wellsdvt",name:"Wells para TVP",category:"Tromboembolismo",aliases:"trombose venosa profunda",desc:"Probabilidade clínica pré-teste de trombose venosa profunda.",tags:["PS","TVP"],
      questions:[
        q("Câncer ativo",yesno()),q("Paralisia/paresia/imobilização de membro",yesno()),q("Acamado >3 dias ou cirurgia recente",yesno()),
        q("Dor à palpação no sistema venoso profundo",yesno()),q("Edema de toda a perna",yesno()),q("Panturrilha ≥3 cm maior",yesno()),
        q("Edema depressível restrito à perna sintomática",yesno()),q("Veias superficiais colaterais não varicosas",yesno()),q("TVP prévia",yesno()),
        q("Diagnóstico alternativo tão provável quanto TVP",[opt("Não",0),opt("Sim",-2)])
      ],
      interpret:(n)=> n>=2 ? "TVP provável no modelo de 2 níveis (≥2)." : "TVP improvável no modelo de 2 níveis (≤1).",
      reference:"Wells PS et al. Lancet. 1997;350:1795–1798."
    },
    {
      id:"spesi",name:"sPESI",category:"Tromboembolismo",aliases:"embolia pulmonar prognóstico TEP",desc:"Estratificação prognóstica simplificada após diagnóstico de TEP.",tags:["TEP","Prognóstico"],
      questions:[q("Idade >80 anos",yesno()),q("Câncer",yesno()),q("Doença cardiopulmonar crônica",yesno()),q("FC ≥110 bpm",yesno()),q("PAS <100 mmHg",yesno()),q("SpO₂ <90%",yesno())],
      interpret:(n)=> n===0 ? "sPESI = 0: baixo risco pelo modelo." : "sPESI ≥1: presença de pelo menos um marcador de maior risco.",
      reference:"Jiménez D et al. Arch Intern Med. 2010;170:1383–1389."
    },
    {
      id:"curb65",name:"CURB-65",category:"Respiratório",aliases:"pneumonia PAC",desc:"Estratificação de gravidade na pneumonia adquirida na comunidade.",tags:["Pneumonia","PS"],
      questions:[q("Confusão nova",yesno()),q("Ureia >7 mmol/L (~19 mg/dL de BUN)",yesno()),q("FR ≥30 irpm",yesno()),q("PAS <90 ou PAD ≤60 mmHg",yesno()),q("Idade ≥65 anos",yesno())],
      interpret:sumInterpret([[0,1,"0–1: faixa de menor gravidade no CURB-65"],[2,2,"2: gravidade intermediária"],[3,5,"3–5: pneumonia grave pelo escore"]]),
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
    ],interpret:(n)=>`NIHSS total: ${n}/42. Use a escala completa e as regras oficiais para itens não testáveis.`,reference:refs.nihss},
    {
      id:"abcd2",name:"ABCD²",category:"Neurologia",aliases:"AIT TIA AVC",desc:"Estratificação de risco após ataque isquêmico transitório.",tags:["AIT","Neurologia"],
      questions:[
        q("Idade ≥60 anos",yesno()),q("PA inicial ≥140/90 mmHg",yesno()),
        q("Características clínicas",[opt("Outros",0),opt("Alteração da fala sem fraqueza",1),opt("Fraqueza unilateral",2)]),
        q("Duração",[opt("<10 min",0),opt("10–59 min",1),opt("≥60 min",2)]),q("Diabetes",yesno())
      ],
      interpret:sumInterpret([[0,3,"ABCD² 0–3: menor pontuação"],[4,5,"ABCD² 4–5: pontuação intermediária"],[6,7,"ABCD² 6–7: maior pontuação"]]),
      reference:"Johnston SC et al. Lancet. 2007;369:283–292."
    },
    {
      id:"childpugh",name:"Child-Pugh",category:"Gastro/Hepato",aliases:"cirrose fígado hepatopatia",desc:"Classifica a gravidade e o prognóstico da cirrose.",tags:["Hepatologia","Cirrose"],
      questions:[
        q("Bilirrubina total",[opt("<2 mg/dL",1),opt("2–3 mg/dL",2),opt(">3 mg/dL",3)]),
        q("Albumina",[opt(">3,5 g/dL",1),opt("2,8–3,5 g/dL",2),opt("<2,8 g/dL",3)]),
        q("INR",[opt("<1,7",1),opt("1,7–2,3",2),opt(">2,3",3)]),
        q("Ascite",[opt("Ausente",1),opt("Leve/controlada",2),opt("Moderada/grave/refratária",3)]),
        q("Encefalopatia",[opt("Ausente",1),opt("Grau I–II",2),opt("Grau III–IV",3)])
      ],
      interpret:sumInterpret([[5,6,"Child-Pugh A"],[7,9,"Child-Pugh B"],[10,15,"Child-Pugh C"]]),
      reference:"Pugh RNH et al. Br J Surg. 1973;60:646–649."
    },
    {id:"meldna",name:"MELD-Na",category:"Gastro/Hepato",aliases:"cirrose transplante sódio INR creatinina bilirrubina",desc:"Pontuação prognóstica baseada em bilirrubina, INR, creatinina e sódio.",tags:["Hepatologia","Cirrose"],custom:"meldna",reference:refs.meld},
    {id:"gbs",name:"Glasgow-Blatchford",category:"Gastro/Hepato",aliases:"hemorragia digestiva alta HDA",desc:"Estratificação inicial de risco na hemorragia digestiva alta.",tags:["HDA","PS"],custom:"gbs",reference:refs.gbs},
    {
      id:"bisap",name:"BISAP",category:"Gastro/Hepato",aliases:"pancreatite aguda",desc:"Estratificação precoce de gravidade na pancreatite aguda.",tags:["Pancreatite","PS"],
      questions:[q("BUN >25 mg/dL",yesno()),q("Alteração do estado mental (GCS <15)",yesno()),q("SIRS presente",yesno()),q("Idade >60 anos",yesno()),q("Derrame pleural",yesno())],
      interpret:(n)=>`BISAP ${n}/5. Maior pontuação se associa a maior risco de complicações e mortalidade.`,
      reference:refs.bisap
    },
    {
      id:"alvarado",name:"Alvarado",category:"Cirurgia",aliases:"apendicite MANTRELS",desc:"Estima a probabilidade clínica de apendicite aguda.",tags:["Cirurgia","Abdome agudo"],
      questions:[q("Migração da dor para FID",yesno()),q("Anorexia",yesno()),q("Náuseas/vômitos",yesno()),q("Dor à palpação em FID",yesno(2)),q("Descompressão dolorosa",yesno()),q("Febre",yesno()),q("Leucocitose",yesno(2)),q("Desvio à esquerda",yesno())],
      interpret:sumInterpret([[0,4,"Alvarado 0–4: menor probabilidade"],[5,6,"Alvarado 5–6: probabilidade intermediária"],[7,10,"Alvarado 7–10: maior probabilidade"]]),
      reference:"Alvarado A. Ann Emerg Med. 1986;15:557–564."
    },
    {
      id:"padua",name:"Padua",category:"Tromboembolismo",aliases:"TEV profilaxia paciente clínico",desc:"Risco de tromboembolismo venoso em pacientes clínicos hospitalizados.",tags:["Enfermaria","TEV"],
      questions:[
        q("Câncer ativo",yesno(3)),q("TEV prévio",yesno(3)),q("Mobilidade reduzida",yesno(3)),q("Trombofilia conhecida",yesno(3)),
        q("Trauma/cirurgia recente",yesno(2)),q("Idade ≥70 anos",yesno()),q("Insuficiência cardíaca/respiratória",yesno()),
        q("IAM ou AVC isquêmico agudo",yesno()),q("Infecção aguda/doença reumatológica",yesno()),q("Obesidade (IMC ≥30)",yesno()),q("Tratamento hormonal",yesno())
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
      interpret:(n)=>`Bishop ${n}/13. Quanto maior a pontuação, mais favorável o colo à indução.`,
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
      interpret:(n)=>`Apgar ${n}/10. Registrar no minuto correspondente; não usar isoladamente para decisões de reanimação.`,
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
      questions:[q("Ronco alto",yesno()),q("Cansaço/sonolência diurna",yesno()),q("Apneia observada",yesno()),q("Hipertensão",yesno()),q("IMC >35 kg/m²",yesno()),q("Idade >50 anos",yesno()),q("Circunferência cervical >40 cm",yesno()),q("Sexo masculino",yesno())],
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
      interpret:(n)=>`TIMI ${n}/7. Quanto maior a pontuação, maior o risco de eventos isquêmicos; interpretar no contexto da SCA.`,
      reference:"Antman EM et al. JAMA. 2000;284:835–842."
    },
    {
      id:"rcri",name:"RCRI (Lee)",category:"Cardiologia",aliases:"risco cardíaco perioperatório cirurgia lee",desc:"Estimativa de risco cardíaco em cirurgia não cardíaca.",tags:["Pré-op","Cirurgia"],
      questions:[
        q("Cirurgia de alto risco",yesno()),q("Doença cardíaca isquêmica",yesno()),q("Insuficiência cardíaca",yesno()),
        q("Doença cerebrovascular",yesno()),q("Diabetes em uso de insulina",yesno()),q("Creatinina >2,0 mg/dL",yesno())
      ],
      interpret:(n)=>`RCRI ${n}/6. Usar com o tipo de cirurgia, capacidade funcional e avaliação perioperatória global.`,
      reference:"Lee TH et al. Circulation. 1999;100:1043–1049. Diretriz SBC de Avaliação Cardiovascular Perioperatória 2024."
    },
    {
      id:"cha2ds2va",name:"CHA₂DS₂-VA",category:"Cardiologia",aliases:"fibrilação atrial FA AVC anticoagulação 2025 brasil",desc:"Escore tromboembólico adotado na Diretriz Brasileira de Fibrilação Atrial 2025.",tags:["FA","Anticoagulação"],
      questions:[
        q("Insuficiência cardíaca / disfunção VE",yesno()),q("Hipertensão",yesno()),
        q("Idade",[opt("<65 anos",0),opt("65–74 anos",1),opt("≥75 anos",2)]),
        q("Diabetes mellitus",yesno()),q("AVC/AIT/tromboembolismo prévio",yesno(2)),q("Doença vascular",yesno())
      ],
      interpret:(n)=>`CHA₂DS₂-VA: ${n}. Interpretar conforme a Diretriz Brasileira de FA vigente e contexto clínico.`,
      reference:"Diretriz Brasileira de Fibrilação Atrial – 2025. Arq Bras Cardiol. 2025;122(9):e20250618."
    },
    {
      id:"crb65",name:"CRB-65",category:"Respiratório",aliases:"pneumonia PAC atenção primária emergência",desc:"Versão do CURB-65 sem ureia, útil quando laboratório não está disponível.",tags:["Pneumonia","APS"],
      questions:[q("Confusão nova",yesno()),q("FR ≥30 irpm",yesno()),q("PAS <90 ou PAD ≤60 mmHg",yesno()),q("Idade ≥65 anos",yesno())],
      interpret:sumInterpret([[0,0,"CRB-65 0: menor gravidade pelo escore."],[1,2,"CRB-65 1–2: risco intermediário; avaliar necessidade de internação."],[3,4,"CRB-65 3–4: alto risco; avaliação hospitalar urgente."]]),
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
      interpret:(n)=>`ICH Score ${n}/6. Ferramenta prognóstica; não deve ser usada isoladamente para limitar tratamento.`,
      reference:"Hemphill JC et al. Stroke. 2001;32:891–897."
    },
    {
      id:"hunthess",name:"Hunt-Hess",category:"Neurologia",aliases:"hemorragia subaracnoide HSA aneurisma",desc:"Classificação clínica da gravidade da hemorragia subaracnoide.",tags:["HSA","Neuro"],
      questions:[q("Estado clínico",[opt("Grau I — assintomático ou cefaleia leve/rigidez nucal discreta",1),opt("Grau II — cefaleia moderada/grave, rigidez nucal, sem déficit exceto pares cranianos",2),opt("Grau III — sonolência/confusão ou déficit focal leve",3),opt("Grau IV — estupor, hemiparesia moderada/grave",4),opt("Grau V — coma profundo, rigidez descerebrada, moribundo",5)])],
      interpret:(n)=>`Hunt-Hess grau ${n}.`,
      reference:"Hunt WE, Hess RM. J Neurosurg. 1968;28:14–20."
    },
    {
      id:"mfisher",name:"Fisher modificada",category:"Neurologia",aliases:"hemorragia subaracnoide HSA vasoespasmo tomografia",desc:"Classificação tomográfica da HSA relacionada ao risco de vasoespasmo.",tags:["HSA","Neuro"],
      questions:[q("TC de crânio",[opt("0 — sem HSA ou hemorragia intraventricular",0),opt("1 — HSA fina, sem hemorragia intraventricular",1),opt("2 — HSA fina com hemorragia intraventricular",2),opt("3 — HSA espessa, sem hemorragia intraventricular",3),opt("4 — HSA espessa com hemorragia intraventricular",4)])],
      interpret:(n)=>`Fisher modificada: grau ${n}.`,
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
      interpret:(n)=>n===0?"Caprini 0: risco muito baixo.":n<=2?"Caprini 1–2: baixo risco.":n<=4?"Caprini 3–4: risco moderado.":"Caprini ≥5: alto risco.",
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
      interpret:(n)=>n<=9?"CIWA-Ar 0–9: abstinência leve.":n<=18?"CIWA-Ar 10–18: abstinência moderada.":"CIWA-Ar >18: abstinência grave.",
      reference:"Ministério da Saúde — Linha de Cuidado para Transtornos por Uso de Álcool no Adulto; CIWA-Ar."
    },
    {
      id:"rts",name:"RTS — Revised Trauma Score",category:"Trauma",aliases:"trauma escore fisiológico Glasgow PAS FR",desc:"Escore fisiológico para avaliação de gravidade no trauma.",tags:["Trauma","Emergência"],custom:"rts",
      reference:"Champion HR et al. J Trauma. 1989;29:623–629. Escalas de trauma são previstas em protocolos brasileiros de atendimento."
    }
,
    {
      id:"centor",name:"Centor / McIsaac",category:"Infectologia",aliases:"faringite faringoamigdalite streptococcus estreptococo garganta",desc:"Estimativa clínica da probabilidade de faringoamigdalite estreptocócica.",tags:["APS","PS"],
      questions:[
        q("Febre >38 °C",yesno()),
        q("Ausência de tosse",yesno()),
        q("Exsudato ou edema tonsilar",yesno()),
        q("Linfonodos cervicais anteriores dolorosos",yesno()),
        q("Idade",[opt("3–14 anos",1),opt("15–44 anos",0),opt("≥45 anos",-1)])
      ],
      interpret:(n)=>n<=0?"McIsaac ≤0: baixa probabilidade clínica.":n===1?"McIsaac 1: baixa probabilidade.":n<=3?"McIsaac 2–3: probabilidade intermediária; considerar teste conforme protocolo local.":"McIsaac ≥4: maior probabilidade clínica; confirmar e conduzir conforme protocolo local.",
      reference:"Centor RM et al. Med Decis Making. 1981;1:239–246; McIsaac WJ et al. CMAJ. 1998;158:75–83."
    }

  ];

  const practicalScoreIds = new Set([
    "gcs","news2","qsofa","sofa",
    "heart","grace","timi_ua","cha2ds2vasc","hasbled",
    "wellspe","perc","wellsdvt","spesi",
    "curb65",
    "nihss","abcd2","ichscore","hunthess","mfisher",
    "childpugh","meldna","gbs","bisap",
    "alvarado","rcri","caprini",
    "bishop","apgar",
    "ciwaar","centor"
  ]);
  for (let i = scores.length - 1; i >= 0; i -= 1) {
    if (!practicalScoreIds.has(scores[i].id)) scores.splice(i, 1);
  }

  const categories = ["Todos","Favoritos","Plantão",...new Set(scores.map(s=>s.category))];
  const favKey = "luria:scores:favorites";
  const recentKey = "luria:scores:recent";
  let favorites = new Set(JSON.parse(localStorage.getItem(favKey)||"[]"));
  let recents = JSON.parse(localStorage.getItem(recentKey)||"[]");
  let activeCat = "Todos";
  let query = "";

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
    $("#score-copy").onclick=()=>copyResult(s);
    $("#score-reset").onclick=()=>{renderForm(s);};
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
    if(vals.some(v=>v==="")){setResult("—","Preencha todos os campos.","");return;}
    const total=vals.reduce((a,v)=>a+Number(v),0);
    setResult(formatNum(total),s.interpret(total),"Pontuação calculada a partir dos critérios selecionados.");
  }

  function setResult(value,text,note=""){
    $("#score-value").textContent=value; $("#score-text").textContent=text; $("#score-note").textContent=note;
  }
  function formatNum(n){return Number.isInteger(n)?String(n):String(Math.round(n*10)/10);}
  function field(label,id,type="number",attrs=""){return `<div class="score-field"><label for="${id}">${label}</label><input id="${id}" type="${type}" ${attrs}></div>`;}
  function selectField(label,id,opts){return `<div class="score-field"><label for="${id}">${label}</label><select id="${id}"><option value="">Selecione…</option>${opts.map(o=>`<option value="${o.value}">${esc(o.text)}</option>`).join("")}</select></div>`;}

  const customRender={
    news2(f){
      f.innerHTML=
        field("Frequência respiratória (irpm)","n_rr","number",'min="0"')+
        field("SpO₂ (%)","n_spo2","number",'min="0" max="100"')+
        selectField("Escala de SpO₂","n_scale",[opt("Escala 1 — padrão",1),opt("Escala 2 — alvo de 88–92% em hipercapnia confirmada",2)])+
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
        selectField("Cardiovascular","s_cv",[opt("PAM ≥70",0),opt("PAM <70",1),opt("Dopamina ≤5 ou dobutamina qualquer dose",2),opt("Dopamina >5 ou epinefrina/norepinefrina ≤0,1 µg/kg/min",3),opt("Dopamina >15 ou epinefrina/norepinefrina >0,1 µg/kg/min",4)])+
        selectField("Glasgow","s_gcs",[opt("15",0),opt("13–14",1),opt("10–12",2),opt("6–9",3),opt("<6",4)])+
        selectField("Renal","s_renal",[opt("Creatinina <1,2 mg/dL",0),opt("1,2–1,9",1),opt("2,0–3,4",2),opt("3,5–4,9 ou diurese <500 mL/d",3),opt(">5,0 ou diurese <200 mL/d",4)]);
      $$("select",f).forEach(x=>x.onchange=()=>{const v=$$("select",f).map(x=>x.value);if(v.some(x=>x===""))return setResult("—","Preencha todos os sistemas.");const n=v.reduce((a,b)=>a+Number(b),0);setResult(String(n),`SOFA total: ${n}/24.`,"Avalie o valor absoluto e, quando disponível, a variação do SOFA ao longo do tempo.");}); setResult("—","Preencha os campos.");
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
      $("input,select",f).forEach(x=>x.oninput=x.onchange=calcGrace); setResult("—","Preencha os campos.");
    },
    psi(f){
      f.innerHTML=
        field("Idade (anos)","p_age","number",'min="18" max="120"')+
        selectField("Sexo","p_sex",[opt("Masculino","m"),opt("Feminino","f")])+
        selectField("Residente em instituição de longa permanência","p_nh",yesno(10))+
        selectField("Neoplasia","p_ca",yesno(30))+selectField("Doença hepática","p_liv",yesno(20))+selectField("Insuficiência cardíaca","p_hf",yesno(10))+selectField("Doença cerebrovascular","p_cvd",yesno(10))+selectField("Doença renal","p_renal",yesno(10))+
        selectField("Alteração do estado mental","p_ams",yesno(20))+selectField("FR ≥30 irpm","p_rr",yesno(20))+selectField("PAS <90 mmHg","p_sbp",yesno(20))+selectField("Temperatura <35°C ou ≥40°C","p_temp",yesno(15))+selectField("FC ≥125 bpm","p_hr",yesno(10))+
        selectField("pH arterial <7,35","p_ph",yesno(30))+selectField("BUN ≥30 mg/dL","p_bun",yesno(20))+selectField("Sódio <130 mEq/L","p_na",yesno(20))+selectField("Glicose ≥250 mg/dL","p_glu",yesno(10))+selectField("Hematócrito <30%","p_hct",yesno(10))+selectField("PaO₂ <60 mmHg ou SatO₂ <90%","p_o2",yesno(10))+selectField("Derrame pleural","p_eff",yesno(10));
      $("input,select",f).forEach(x=>x.oninput=x.onchange=calcPsi); setResult("—","Preencha os campos.");
    },
    rts(f){
      f.innerHTML=
        selectField("Glasgow","r_gcs",[opt("13–15",4),opt("9–12",3),opt("6–8",2),opt("4–5",1),opt("3",0)])+
        selectField("PAS (mmHg)", "r_sbp",[opt(">89",4),opt("76–89",3),opt("50–75",2),opt("1–49",1),opt("0",0)])+
        selectField("FR (irpm)", "r_rr",[opt("10–29",4),opt(">29",3),opt("6–9",2),opt("1–5",1),opt("0",0)]);
      $("select",f).forEach(x=>x.onchange=calcRts); setResult("—","Preencha os campos.");

    }
  };


  function calcGrace(){
    const ids=["gr_age","gr_hr","gr_sbp","gr_cr","gr_k","gr_ca","gr_st","gr_bio"]; if(ids.some(id=>$("#"+id).value==="")) return setResult("—","Preencha todos os campos.");
    const age=+$("#gr_age").value, hr=+$("#gr_hr").value, sbp=+$("#gr_sbp").value, cr=+$("#gr_cr").value;
    const ageP=age<30?0:age<40?8:age<50?25:age<60?41:age<70?58:age<80?75:age<90?91:100;
    const hrP=hr<50?0:hr<70?3:hr<90?9:hr<110?15:hr<150?24:hr<200?38:46;
    const sbpP=sbp<80?58:sbp<100?53:sbp<120?43:sbp<140?34:sbp<160?24:sbp<200?10:0;
    const crP=cr<0.4?1:cr<0.8?4:cr<1.2?7:cr<1.6?10:cr<2?13:cr<4?21:28;
    const n=ageP+hrP+sbpP+crP+["gr_k","gr_ca","gr_st","gr_bio"].reduce((a,id)=>a+Number($("#"+id).value),0);
    const txt=n<=108?"GRACE ≤108: faixa de menor risco.":n<=140?"GRACE 109–140: risco intermediário.":"GRACE >140: alto risco.";
    setResult(String(n),txt,"Pontuação GRACE para SCA; usar em conjunto com estratégia invasiva e avaliação clínica.");
  }

  function calcPsi(){
    const ids=["p_age","p_sex","p_nh","p_ca","p_liv","p_hf","p_cvd","p_renal","p_ams","p_rr","p_sbp","p_temp","p_hr","p_ph","p_bun","p_na","p_glu","p_hct","p_o2","p_eff"];
    if(ids.some(id=>$("#"+id).value==="")) return setResult("—","Preencha todos os campos.");
    let n=+$("#p_age").value;
    if($("#p_sex").value==="f") n-=10;
    for(const id of ids.slice(2)) n+=Number($("#"+id).value);
    const cls=n<=70?"Classe II":n<=90?"Classe III":n<=130?"Classe IV":"Classe V";
    setResult(String(n),`PSI/PORT: ${cls}.`,"A Classe I exige algoritmo clínico específico; esta calculadora usa a pontuação numérica para Classes II–V.");
  }

  function calcRts(){
    const v=$("#score-form select").map(x=>x.value); if(v.some(x=>x==="")) return setResult("—","Preencha todos os campos.");
    const [g,s,r]=v.map(Number); const weighted=0.9368*g+0.7326*s+0.2908*r;
    setResult(weighted.toFixed(3),`RTS ponderado: ${weighted.toFixed(3)} / 7,840.`,"Quanto menor o RTS, maior a gravidade fisiológica do trauma.");
  }

  function calcNews2(){
    const ids=["n_rr","n_spo2","n_scale","n_o2","n_sbp","n_hr","n_cns","n_temp"]; if(ids.some(id=>$("#"+id).value==="")) return setResult("—","Preencha todos os campos.");
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
    let txt=n<=4?"NEWS2 0–4: baixo risco, desde que nenhum parâmetro isolado tenha 3 pontos.":n<=6?"NEWS2 5–6: risco clínico aumentado.":"NEWS2 ≥7: alto risco clínico.";
    if(n<=4 && [rrP,spP,sbpP,hrP,cns,tP].some(x=>x===3)) txt="NEWS2 total 0–4, mas há um parâmetro isolado com 3 pontos.";
    setResult(String(n),txt,"Use a Escala 2 de SpO₂ apenas quando houver indicação clínica de alvo entre 88–92%, como em hipercapnia confirmada.");
  }

  function calcMeld(){
    const ids=["m_bili","m_inr","m_cr","m_na","m_dial"]; if(ids.some(id=>$("#"+id).value==="")) return setResult("—","Preencha todos os campos.");
    let bili=Math.max(1,+$("#m_bili").value), inr=Math.max(1,+$("#m_inr").value), cr=Math.max(1,+$("#m_cr").value);
    if(+$("#m_dial").value===1) cr=4; cr=Math.min(4,cr);
    let meld=10*(0.957*Math.log(cr)+0.378*Math.log(bili)+1.120*Math.log(inr)+0.643);
    meld=Math.max(6,Math.min(40,Math.round(meld)));
    const na=Math.max(125,Math.min(137,+$("#m_na").value));
    let meldNa=meld+1.32*(137-na)-0.033*meld*(137-na);
    meldNa=Math.max(6,Math.min(40,Math.round(meldNa)));
    setResult(String(meldNa),`MELD-Na: ${meldNa} (MELD base: ${meld}).`,"Implementação da fórmula MELD-Na de 2016; sistemas de transplante podem usar modelos mais recentes.");
  }

  function calcGBS(){
    const ids=["g_bun","g_sex","g_hb","g_sbp","g_hr","g_mel","g_syn","g_liv","g_hf"]; if(ids.some(id=>$("#"+id).value==="")) return setResult("—","Preencha todos os campos.");
    const bun=+$("#g_bun").value, sex=$("#g_sex").value, hb=+$("#g_hb").value, sbp=+$("#g_sbp").value;
    let n=0;
    n += bun>=70?6:bun>=28?4:bun>=22.4?3:bun>=18.2?2:0;
    if(sex==="m") n += hb<10?6:hb<12?3:hb<13?1:0; else n += hb<10?6:hb<12?1:0;
    n += sbp<90?3:sbp<100?2:sbp<110?1:0;
    n += +$("#g_hr").value + +$("#g_mel").value + +$("#g_syn").value + +$("#g_liv").value + +$("#g_hf").value;
    setResult(String(n),n===0?"Glasgow-Blatchford 0: risco muito baixo pelo escore original.":`Glasgow-Blatchford: ${n}.`,"Interprete em conjunto com a avaliação clínica e o protocolo local para hemorragia digestiva alta.");
  }

  async function copyResult(s){
    const txt=`${s.name}: ${$("#score-value").textContent} — ${$("#score-text").textContent}`;
    try{await navigator.clipboard.writeText(txt);$("#score-copy").textContent="Copiado";setTimeout(()=>$("#score-copy").textContent="Copiar interpretação",1200);}catch{}
  }
  document.readyState==="loading"?document.addEventListener("DOMContentLoaded",mount):mount();
})();
