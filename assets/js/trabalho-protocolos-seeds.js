(function () {
  "use strict";
  window.LURIA_PROTOCOL_SEEDS = [
    {
      id: "seed-sepse",
      slug: "sepse-e-choque-septico-ssc-2021",
      title: "Sepse e Choque Séptico (Pacote de 1 Hora - SSC 2021)",
      category: "Emergência e UTI",
      setting: "Pronto-Socorro / UTI",
      status: "verified",
      linked_recipe_slugs: ["prescricao-sepse-hora-1"],
      summary: "Manejo estruturado na primeira hora para disfunção orgânica ameaçadora à vida secundária a infecção suspeita ou confirmada (Surviving Sepsis Campaign 2021).",
      suspicion: [
        {
          title: "Critérios de Alerta e Disfunção Orgânica",
          items: [
            "Infecção suspeita ou documentada associada a aumento agudo >= 2 pontos no escore SOFA.",
            "Triagem à beira-leito (qSOFA >= 2, NEWS2 >= 5 ou SIRS): alteração aguda do estado mental (Glasgow < 15), FR >= 22 irpm ou PAS <= 100 mmHg.",
            "Choque séptico: necessidade de vasopressor para manter PAM >= 65 mmHg E lactato sérico > 2 mmol/L (> 18 mg/dL) apesar de ressuscitação volêmica adequada."
          ]
        }
      ],
      initial_actions: [
        {
          title: "Pacote da 1ª Hora (Hour-1 Bundle)",
          items: [
            "1. Medir o lactato sérico arterial ou venoso imediatamente (repetir em 2 a 4h se inicial > 2 mmol/L).",
            "2. Coletar 2 pares de hemoculturas (aeróbio/anaeróbio) de sítios distintos ANTES do antimicrobiano, sem atrasar o início da droga em mais de 45 min.",
            "3. Administrar antimicrobiano IV de amplo espectro na 1ª hora (idealmente nos primeiros 60 min no choque séptico e até 3h na sepse sem choque após triagem).",
            "4. Iniciar ressuscitação volêmica rápida com 30 mL/kg de cristaloide balanceado (Ringer Lactato ou Plasma-Lyte) nas primeiras 3 horas se hipotensão (PAS < 90, PAM < 65) ou lactato >= 4 mmol/L.",
            "5. Iniciar vasopressor (Noradrenalina 1ª escolha) durante ou após a expansão se hipotensão persistente para manter PAM >= 65 mmHg."
          ]
        }
      ],
      exams: [
        {
          title: "Painel Laboratorial e Imagem de Foco",
          items: [
            "Gasometria arterial com lactato, hemograma completo, creatinina, ureia, sódio, potássio, cálcio iônico, bilirrubinas, TGO/TGP, PCR/procalcitonina e coagulograma (TP/INR, TTPa).",
            "2 pares de hemoculturas + urocultura + cultura de secreção traqueal/líquidos cavitários conforme suspeita clínica.",
            "Radiografia de tórax, ultrassonografia POCUS à beira-leito ou tomografia direcionada para controle de foco (abscessos, colangite, pielonefrite obstrutiva)."
          ]
        }
      ],
      decision_flow: [
        {
          if: "PAM < 65 mmHg refratária à infusão inicial de cristaloide",
          then: "Iniciar Noradrenalina (0,05 a 0,5 mcg/kg/min); pode-se iniciar em acesso periférico calibroso proximal temporariamente até obtenção de cateter venoso central."
        },
        {
          if: "Dose de Noradrenalina >= 0,25 a 0,5 mcg/kg/min sem atingir PAM >= 65 mmHg",
          then: "Associar Vasopressina (até 0,03 UI/min fixo) em vez de escalonar noradrenalina isoladamente + iniciar Hidrocortisona 200 mg/dia IV (50 mg 6/6h ou infusão contínua)."
        },
        {
          if: "Hipoperfusão persistente com disfunção miocárdica (baixo débito / SvcO2 < 70%)",
          then: "Associar Dobutamina (2,5 a 20 mcg/kg/min) à noradrenalina ou substituir por Epinefrina."
        }
      ],
      treatment: [
        {
          title: "Antimicrobianos Empíricos (Ajustar conforme foco e epidemiologia local)",
          regimen: "Cobertura Empírica Inicial na 1ª Hora",
          items: [
            "Foco pulmonar comunitário grave: Ceftriaxona 2 g IV 24/24h + Claritromicina 500 mg IV 12/12h (ou Azitromicina 500 mg IV 24/24h).",
            "Foco abdominal / biliar: Ceftriaxona 2 g IV 24/24h + Metronidazol 500 mg IV 8/8h (ou Piperacilina-Tazobactam 4,5 g IV 6/6h em infusão estendida).",
            "Foco urinário / pielonefrite: Ceftriaxona 2 g IV 24/24h (ou Amicacina 15–20 mg/kg IV 1x/dia / Meropenem 1 g IV 8/8h se risco para ESBL).",
            "Sepse nosocomial / neutropenia febril / choque grave com risco de MDR: Cefepima 2 g IV 8/8h ou Meropenem 1 a 2 g IV 8/8h + Vancomicina 25–30 mg/kg ataque (seguido de 15–20 mg/kg 12/12h)."
          ]
        }
      ],
      linked_drug_terms: ["Noradrenalina", "Ceftriaxona", "Piperacilina", "Meropenem", "Vancomicina", "Hidrocortisona"],
      red_flags: [
        "Lactato em ascensão ou sem clareamento >= 10–20% após 2–4 horas de ressuscitação.",
        "Foco infeccioso cirúrgico não drenado (fasciíte necrosante, peritonite, empiema, obstrução ureteral infectada) — drenar em até 6–12 horas!",
        "Sinais de sobrecarga volêmica / congestão pulmonar (estertores, linhas B difusas no POCUS) — guiar fluidos por variáveis dinâmicas (elevação passiva das pernas, variação de pressão de pulso)."
      ],
      source_refs: [
        { label: "Surviving Sepsis Campaign Guidelines 2021 (Intensive Care Med)", url: "https://link.springer.com/article/10.1007/s00134-021-06506-y" },
        { label: "ILAS - Instituto Latino Americano de Sepse", url: "https://ilas.org.br/" }
      ]
    },
    {
      id: "seed-iam-supra",
      slug: "sindrome-coronariana-aguda-iam-com-supra-st",
      title: "Síndrome Coronariana Aguda: IAM com Supra de ST (IAMCSST)",
      category: "Cardiologia",
      setting: "Emergência / Sala Vermelha / Hemodinâmica",
      status: "verified",
      linked_recipe_slugs: ["prescricao-iam-com-supra"],
      summary: "Diagnóstico em até 10 minutos e terapia de reperfusão coronariana imediata (Angioplastia Primária ou Fibrinólise) segundo diretrizes SBC / ESC / AHA.",
      suspicion: [
        {
          title: "Apresentação Clínica e Critérios Eletrocardiográficos",
          items: [
            "Dor ou opressão retroesternal em aperto > 20 minutos, irradiada para membro superior esquerdo, mandíbula ou epigástrio, associada a sudorese fria, náuseas ou dispneia (atenção a equivalentes isquêmicos em idosos, diabéticos e mulheres).",
            "Supradesnivelamento do segmento ST no ponto J em >= 2 derivações contíguas: >= 1 mm em todas as derivações, exceto V2–V3 (onde exige >= 2 mm em homens >= 40 anos, >= 2,5 mm em homens < 40 anos ou >= 1,5 mm em mulheres).",
            "Bloqueio de ramo esquerdo (BRE) novo ou presumivelmente novo com critérios de Sgarbossa positivos (>= 3 pontos) ou supra isolado de V3R–V4R (infarto de VD) / V7–V9 (infarto dorsal)."
          ]
        }
      ],
      initial_actions: [
        {
          title: "Abordagem nos Primeiros 10 Minutos (MOV + ECG)",
          items: [
            "Monitorização cardíaca contínua (desfibrilador ao lado), Oximetria de pulso (O2 suplementar APENAS se SpO2 < 90%) e 2 acessos venosos periféricos.",
            "ECG de 12 derivações realizado e laudado em até 10 minutos da chegada (solicitar V3R, V4R se infarto inferior; V7, V8, V9 se infra de V1–V3).",
            "AAS 300 mg VO (mastigar e engolir imediatamente) — salvo alergia verdadeira ou sangramento ativo grave.",
            "Segundo antiagregante plaquetário (Dupla Antiagregação - DAPT) conforme estratégia de reperfusão definida."
          ]
        }
      ],
      exams: [
        {
          title: "Exames Complementares (Não devem atrasar a reperfusão!)",
          items: [
            "Troponina cardíaca de alta sensibilidade (coletar na admissão, mas NÃO aguardar resultado para indicar reperfusão no IAMCSST).",
            "Creatinina, ureia, eletrólitos (K+, Mg2+), glicemia, hemograma, coagulograma e perfil lipídico.",
            "Radiografia de tórax no leito (afastar alargamento de mediastino se suspeita de dissecção aórtica)."
          ]
        }
      ],
      decision_flow: [
        {
          if: "Tempo porta-balão estimado <= 120 minutos (ou <= 90 min em centro com hemodinâmica)",
          then: "Indicar Angioplastia Primária (ICP). Associar Ticagrelor 180 mg VO ataque (ou Prasugrel 60 mg se anatomia conhecida, ou Clopidogrel 600 mg VO) + Heparina Não Fracionada 70–100 UI/kg IV (ou Enoxaparina)."
        },
        {
          if: "Angioplastia indisponível em <= 120 min E sintomas há < 12 horas sem contraindicações",
          then: "Indicar Fibrinólise em até 10 min do diagnóstico (tempo porta-agulha): Tenecteplase (TNK-tPA) bolus único IV ajustado ao peso (30 a 50 mg) + Clopidogrel 300 mg VO (se <= 75 anos; se > 75 anos usar 75 mg sem ataque) + Enoxaparina 30 mg IV bolus seguido de 1 mg/kg SC 12/12h."
        },
        {
          if: "Infarto de Ventrículo Direito (supra em DII, DIII, aVF + V3R/V4R) com hipotensão",
          then: "CONTRAINDICADO o uso de nitratos, morfina e diuréticos! Realizar expansão volêmica cautelosa com SF 0,9% ou Ringer Lactato 250–500 mL."
        }
      ],
      treatment: [
        {
          title: "Terapia Farmacológica Adjuvante",
          regimen: "Antiagregação, Anticoagulação e Estatinas de Alta Potência",
          items: [
            "AAS: 300 mg VO ataque, seguido de 100 mg/dia.",
            "Inibidor P2Y12: Ticagrelor 180 mg ataque (manutenção 90 mg 12/12h) ou Clopidogrel 300–600 mg ataque (manutenção 75 mg/dia).",
            "Anticoagulação (Enoxaparina): < 75 anos: 30 mg IV bolus + 1 mg/kg SC 12/12h (máx. 100 mg nas 2 primeiras doses). >= 75 anos: SEM bolus IV, 0,75 mg/kg SC 12/12h. Se ClCr < 30 mL/min: 1 mg/kg SC 1x/dia.",
            "Estatina de alta potência precoce: Atorvastatina 80 mg VO 1x/dia (ou Rosuvastatina 40 mg/dia).",
            "Controle de dor/congestão: Nitroglicerina IV (Tridil) se dor persistente, HAS ou congestão pulmonar (evitar se PAS < 90, uso de sildenafil em 24–48h ou IAM de VD). Morfina 2–4 mg IV apenas em dor refratária intensa."
          ]
        }
      ],
      linked_drug_terms: ["AAS", "Clopidogrel", "Enoxaparina", "Atorvastatina", "Nitroglicerina", "Morfina"],
      red_flags: [
        "Critérios de falha de reperfusão 60–90 min após fibrinólise (redução do supra < 50% na derivação de maior amplitude ou dor persistente) -> Transferência imediata para Angioplastia de Resgate!",
        "Contraindicações absolutas à fibrinólise: AVC hemorrágico prévio em qualquer época, AVC isquêmico nos últimos 3 meses, neoplasia ou MAV intracraniana, sangramento ativo interno, suspeita de dissecção de aorta, trauma craniofacial grave nos últimos 3 meses.",
        "Choque cardiogênico (Killip IV) -> Revascularização de emergência independente do tempo de evolução."
      ],
      source_refs: [
        { label: "Diretriz da Sociedade Brasileira de Cardiologia sobre IAMCSST", url: "https://abccardiol.org/" },
        { label: "ESC Guidelines for the Management of Acute Coronary Syndromes 2023", url: "https://www.escardio.org/Guidelines" }
      ]
    },
    {
      id: "seed-avc-isquemico",
      slug: "avc-isquemico-agudo-trombolise-manejo",
      title: "AVC Isquêmico Agudo e Trombólise Endovenosa",
      category: "Neurologia",
      setting: "Emergência / Unidade de AVC",
      status: "verified",
      summary: "Código AVC: avaliação neurológica rápida (NIHSS), neuroimagem imediata e recanalização com Alteplase / Tenecteplase na janela terapêutica.",
      suspicion: [
        {
          title: "Reconhecimento Precoce (Escala SAMU / FAST)",
          items: [
            "Déficit neurológico focal de início súbito: assimetria facial, paresia/plegia braquiocrural, afasia/disartria, hemianopsia, ataxia aguda ou alteração súbita de consciência.",
            "Definir com precisão o LKW (Last Known Well): horário exato em que o paciente foi visto assintomático pela última vez."
          ]
        }
      ],
      initial_actions: [
        {
          title: "Metas de Tempo do Código AVC (Porta-Agulha <= 60 min)",
          items: [
            "1. Glicemia capilar imediata no acolhimento (único exame laboratorial obrigatório antes do trombolítico em pacientes sem uso de anticoagulantes; corrigir se < 60 mg/dL).",
            "2. Aplicar escala NIHSS (graduar gravidade de 0 a 42) e verificar sinais vitais.",
            "3. Tomografia de Crânio sem contraste em até 20 minutos da chegada (laudada em até 45 min) para excluir hemorragia intracraniana ou hipodensidade extensa (> 1/3 do território da ACM).",
            "4. Angiotomografia arterial de vasos cervicais e intracranianos se suspeita de oclusão de grande vaso (NIHSS >= 6) para avaliar Trombectomia Mecânica (janela até 6–24h)."
          ]
        }
      ],
      exams: [
        {
          title: "Propedêutica de Emergência",
          items: [
            "Glicemia capilar, TC de crânio sem contraste e Angio-TC de carótidas/vertebrais e polígono de Willis.",
            "Coagulograma (INR, TTPa), hemograma com plaquetas, creatinina, ureia, sódio, potássio, troponina e ECG de 12 derivações (não aguardar laboratório para trombolisar, salvo suspeita de coagulopatia ou uso de varfarina/heparina)."
          ]
        }
      ],
      decision_flow: [
        {
          if: "Delta-T (início dos sintomas) <= 4,5 horas, sem sangramento na TC e PA < 185x110 mmHg",
          then: "Iniciar Trombólise IV: Alteplase (rt-PA) 0,9 mg/kg (dose máxima 90 mg), sendo 10% em bolus IV em 1 minuto e os 90% restantes em bomba de infusão em 60 minutos."
        },
        {
          if: "Candidato à trombólise com PA >= 185/110 mmHg",
          then: "Reduzir PA antes de iniciar rt-PA: Metoprolol 5 mg IV lento ou Nitroprussiato de Sódio / Labetalol / Nicardipina até PA < 185/110 mmHg; manter PA <= 180/105 mmHg nas primeiras 24h pós-trombólise."
        },
        {
          if: "Não candidato à trombólise IV",
          then: "Hipertensão permissiva nas primeiras 24–48h (só reduzir PA se >= 220/120 mmHg ou se houver emergência hipertensiva associada como IAM, dissecção aórtica ou EAP), reduzindo ~15% nas primeiras 24h. Iniciar AAS 100–300 mg VO/SNE."
        }
      ],
      treatment: [
        {
          title: "Cuidados Pós-Trombólise e Prevenção Secundária Precoce",
          regimen: "Vigilância Neurointensiva (Primeiras 24 Horas)",
          items: [
            "PROIBIDO administrar AAS, clopidogrel, heparinas ou anticoagulantes orais nas primeiras 24 horas após Alteplase (aguardar TC de controle de 24h sem sangramento).",
            "Aferir PA e exame neurológico a cada 15 min nas primeiras 2h, a cada 30 min nas 6h seguintes e a cada 1h até completar 24h.",
            "Evitar passagem de sonda nasoenteral, sonda vesical de demora ou punção arterial/central nas primeiras 24h pós-rt-PA.",
            "Se AIT de alto risco (ABCD2 >= 4) ou AVC menor não trombolisado (NIHSS <= 3): DAPT com AAS 100 mg + Clopidogrel 75 mg (ataque 300 mg) por 21 dias + Estatina de alta potência (Atorvastatina 80 mg/dia)."
          ]
        }
      ],
      linked_drug_terms: ["Alteplase", "AAS", "Clopidogrel", "Atorvastatina", "Nitroprussiato de Sódio"],
      red_flags: [
        "Piora neurológica aguda (aumento >= 4 pontos no NIHSS), cefaleia súbita intensa, náuseas/vômitos ou pico hipertensivo durante a infusão de Alteplase -> SUSPENDER INFUSÃO IMEDIATAMENTE e realizar TC de crânio de urgência (suspeita de transformação hemorrágica).",
        "Contraindicações ao rt-PA: sintomas > 4,5h (sem mismatch em RM/perfusão), TC com hemorragia, AVC isquêmico ou TCE grave nos últimos 3 meses, cirurgia intracraniana/espinhal nos últimos 3 meses, plaquetas < 100.000/mm³, INR > 1,7, uso de DOAC nas últimas 48h."
      ],
      source_refs: [
        { label: "AHA/ASA Guidelines for the Early Management of Acute Ischemic Stroke", url: "https://www.stroke.org/" },
        { label: "Sociedade Brasileira de AVC (SBAVC)", url: "https://avc.org.br/" }
      ]
    },
    {
      id: "seed-cad",
      slug: "cetoacidose-diabetica-e-estado-hiperglicemico-hiperosmolar",
      title: "Cetoacidose Diabética (CAD) e Estado Hiperglicêmico Hiperosmolar (EHH)",
      category: "Endocrinologia e Metabologia",
      setting: "Emergência / UTI",
      status: "verified",
      summary: "Protocolo dos 3 Pilares (Volume, Potássio e Insulina Regular IV) para manejo seguro das emergências hiperglicêmicas agudas (Consenso ADA / EASD / SBD 2024).",
      suspicion: [
        {
          title: "Critérios Diagnósticos (CAD vs. EHH)",
          items: [
            "CAD: Glicemia >= 200 mg/dL (ou história prévia de DM) + Cetonemia (beta-hidroxibutirato >= 3,0 mmol/L ou cetonúria >= 2+) + Acidose metabólica (pH < 7,30 e/ou HCO3- < 18 mEq/L) com Ânion Gap elevado (> 10–12).",
            "EHH: Glicemia severa (> 600 mg/dL) + Osmolalidade sérica efetiva > 300–320 mOsm/kg + Ausência de acidose significativa (pH > 7,30, HCO3- >= 15 mEq/L) e cetonemia discreta ou ausente.",
            "Investigar sempre fatores precipitantes (5 Is): Infecção (ITU, pneumonia), Infarto (IAM, AVC), Insulina (omissão/má adesão), Intoxicação/medicamentos (corticoides, iSGLT2 — atenção à CAD euglicêmica!), Gestação."
          ]
        }
      ],
      initial_actions: [
        {
          title: "Sequência Obrigatória nas Primeiras Horas",
          items: [
            "1º PILAR - HIDRATAÇÃO VENOSA (iniciar ANTES da insulina): 1.000 a 1.500 mL (15–20 mL/kg) de cristaloide (Ringer Lactato ou SF 0,9%) na 1ª hora para restaurar volemia e perfusão renal.",
            "2º PILAR - CHECAR POTÁSSio (K+) ANTES DE INICIAR INSULINA: a insulina desloca K+ para o intracelular e pode causar parada cardíaca por hipocalemia se K+ inicial < 3,3 mEq/L!",
            "3º PILAR - INSULINOTERAPIA IV (somente após K+ >= 3,3 mEq/L): Insulina Regular em bomba de infusão contínua 0,1 UI/kg/h (ou bolus 0,1 UI/kg seguido de 0,1 UI/kg/h)."
          ]
        }
      ],
      exams: [
        {
          title: "Monitorização Laboratorial Seriada",
          items: [
            "Glicemia capilar de 1/1h enquanto em infusão contínua de insulina.",
            "Gasometria venosa, sódio, potássio, cloro, fósforo, magnésio e função renal a cada 2 a 4 horas.",
            "Calcular o Sódio Corrigido pela glicose: Na corrigido = Na medido + 0,024 x (Glicose - 100)."
          ]
        }
      ],
      decision_flow: [
        {
          if: "Potássio sérico inicial < 3,3 mEq/L",
          then: "SUSPENDER / NÃO INICIAR INSULINA! Repor 20 a 40 mEq/h de KCl IV diluído até que o K+ sérico seja >= 3,3 mEq/L."
        },
        {
          if: "Potássio sérico entre 3,3 e 5,0 mEq/L e diurese presente (>= 50 mL/h)",
          then: "Iniciar Insulina Regular IV E adicionar 20 a 30 mEq de KCl em cada litro de solução de hidratação para manter K+ entre 4,0 e 5,0 mEq/L."
        },
        {
          if: "Glicemia atingir <= 200 a 250 mg/dL na CAD (ou <= 300 mg/dL no EHH) com acidose ainda presente",
          then: "NÃO desligar a bomba de insulina! Reduzir a infusão de insulina para 0,02–0,05 UI/kg/h E associar Soro Glicosado 5% (ou 10%) na hidratação para manter glicemia entre 150–200 mg/dL até resolução da cetoacidose."
        }
      ],
      treatment: [
        {
          title: "Critérios de Resolução e Transição para Insulina Subcutânea",
          regimen: "Fechamento do Ânion Gap e Overlap de Insulina Basal",
          items: [
            "Critérios de resolução da CAD: Glicemia < 200 mg/dL + pelo menos dois dos seguintes: HCO3- >= 15–18 mEq/L, pH venoso > 7,30 e Ânion Gap normalizado (<= 12 mEq/L).",
            "Transição segura para SC: Aplicar a primeira dose de Insulina Basal subcutânea (NPH ou Glargina) 1 a 2 HORAS ANTES de desligar a bomba de infusão venosa de insulina regular (evita rebote imediato da cetoacidose!).",
            "Uso de Bicarbonato de Sódio (NaHCO3): restrito apenas a acidemia extrema com pH < 6,90 (100 mEq diluídos em 400 mL de água destilada + 20 mEq KCl infundidos em 2 horas)."
          ]
        }
      ],
      linked_drug_terms: ["Insulina Regular", "Cloreto de Potássio", "Bicarbonato de Sódio"],
      red_flags: [
        "Queda da glicemia > 75–100 mg/dL/h ou queda abrupta da osmolalidade (> 3–8 mOsm/kg/h) -> Risco de Edema Cerebral (cefaleia, bradicardia, hipertensão, rebaixamento do sensório), especialmente em crianças e jovens.",
        "Desligar a insulina IV precocemente apenas porque a glicemia normalizou (sem ter fechado o Ânion Gap e corrigido o pH)."
      ],
      source_refs: [
        { label: "ADA/EASD Consensus Report on Hyperglycemic Crises in Adults 2024", url: "https://diabetesjournals.org/care" },
        { label: "Diretriz da Sociedade Brasileira de Diabetes (SBD)", url: "https://diretriz.diabetes.org.br/" }
      ]
    },
    {
      id: "seed-anafilaxia",
      slug: "anafilaxia-e-choque-anafilatico-manejo",
      title: "Anafilaxia e Choque Anafilático",
      category: "Emergência e UTI",
      setting: "Pronto-Socorro / Enfermaria / Ambulatório",
      status: "verified",
      summary: "Reconhecimento clínico imediato e administração precoce de Epinefrina Intramuscular como única intervenção modificadora de mortalidade (WAO / EAACI).",
      suspicion: [
        {
          title: "Critérios Clínicos de Anafilaxia (Início em minutos a horas)",
          items: [
            "Critério 1: Início agudo de acometimento cutâneo-mucoso (urticária generalizada, prurido, flushing, angioedema de lábios/língua/úvula) E pelo menos um dos seguintes: (a) Comprometimento respiratório (dispneia, broncoespasmo, estridor, hipoxemia) OU (b) Hipotensão / sinais de hipoperfusão (síncope, hipotonia, incontinência).",
            "Critério 2: Hipotensão aguda (PAS < 90 mmHg em adultos ou queda > 30% da basal) ou broncoespasmo/laringoespasmo isolado após exposição a alérgeno sabidamente conhecido para aquele paciente, mesmo sem lesões de pele."
          ]
        }
      ],
      initial_actions: [
        {
          title: "Conduta Imediata de Primeira Linha",
          items: [
            "1. ADRENALINA (EPINEFRINA) INTRAMUSCULAR IMEDIATA na face anterolateral da coxa (músculo vasto lateral) — solução 1:1.000 (1 mg/mL pura): Adultos: 0,3 a 0,5 mg (0,3 a 0,5 mL IM). Crianças: 0,01 mg/kg (máx. 0,3 mg IM).",
            "2. Remover o agente desencadeante (interromper infusão de antibiótico, contraste, hemocomponente ou látex).",
            "3. Posicionar o paciente em decúbito dorsal com membros inferiores elevados (Trendelenburg modificado) — NUNCA colocar o paciente em pé ou sentado subitamente (risco de morte súbita por síndrome do ventrículo vazio).",
            "4. Oxigênio suplementar a 100% sob máscara não reinalante (10–15 L/min) e preparar material de via aérea difícil precoce se houver rouquidão, estridor ou edema de língua/orofaringe.",
            "5. Expansão volêmica rápida com SF 0,9% ou Ringer Lactato: 1.000 a 2.000 mL IV aberto em adultos (20 mL/kg em crianças) se hipotensão."
          ]
        }
      ],
      exams: [
        {
          title: "Diagnóstico é Essencialmente Clínico!",
          items: [
            "Nenhum exame deve atrasar a aplicação de Adrenalina IM.",
            "Triptase sérica pode ser coletada entre 15 min e 3 horas do início dos sintomas para confirmação retrospectiva em casos duvidosos (ex.: anafilaxia intraoperatória)."
          ]
        }
      ],
      decision_flow: [
        {
          if: "Sem resposta ou resposta parcial após 5 a 15 minutos da 1ª dose de Adrenalina IM",
          then: "Repetir a dose de Adrenalina IM (0,3 a 0,5 mg no adulto) a cada 5 a 15 minutos."
        },
        {
          if: "Choque refratário após 2 a 3 doses de Adrenalina IM + reposição volêmica",
          then: "Iniciar infusão contínua de Adrenalina IV em bomba (0,05 a 0,2 mcg/kg/min) sob monitorização contínua.",
          items: []
        },
        {
          if: "Paciente em uso crônico de Betabloqueador com hipotensão refratária à Adrenalina",
          then: "Administrar Glucagon 1 a 5 mg IV lento em 5 minutos (crianças: 20–30 mcg/kg, máx 1 mg), seguido de infusão de 5–15 mcg/min."
        }
      ],
      treatment: [
        {
          title: "Terapias de Segunda Linha (Adjuvantes - NUNCA substituem a Adrenalina)",
          regimen: "Anti-histamínicos, Corticosteroides e Broncodilatadores",
          items: [
            "Anti-histamínico H1 (alívio apenas de urticária/prurido): Difenidramina 25–50 mg IV/IM ou Prometazina 25 mg IM (ou Cetirizina/Loratadina 10 mg VO em casos estabilizados).",
            "Anti-histamínico H2 (opcional): Famotidina 20 mg IV.",
            "Broncodilatador (se broncoespasmo persistente): Salbutamol (Fenoterol) 4 a 8 jatos com espaçador ou nebulização contínua.",
            "Corticosteroide (ação tardia em 4–6h; uso opcional para sintomas prolongados/asma): Metilprednisolona 1 a 2 mg/kg IV (máx 125 mg) ou Hidrocortisona 200–300 mg IV.",
            "Observação hospitalar mínima de 4 a 8 horas após resolução completa (ou 12–24h se reação grave, hipotensão ou necessidade de >= 2 doses de adrenalina, pelo risco de reação bifásica)."
          ]
        }
      ],
      linked_drug_terms: ["Adrenalina", "Hidrocortisona", "Salbutamol", "Glucagon"],
      red_flags: [
        "ERRO FATAL: Aplicar adrenalina 1:1.000 (1 mg/mL) pura em bolus endovenoso no paciente com pulso (causa crise hipertensiva maligna, IAM e fibrilação ventricular).",
        "ERRO FATAL: Tratar anafilaxia apenas com Prometazina (Fenergan) e Hidrocortisona sem aplicar Adrenalina IM.",
        "Estridor laríngeo ou voz abafada ('batata quente'): intubação orotraqueal imediata com o médico mais experiente (videolaringoscopia + kit de cricotireoidostomia pronto)."
      ],
      source_refs: [
        { label: "World Allergy Organization (WAO) Anaphylaxis Guidance 2020", url: "https://www.worldallergyorganizationjournal.org/" }
      ]
    },
    {
      id: "seed-eme",
      slug: "estado-de-mal-epileptico-convulsivo",
      title: "Estado de Mal Epiléptico (EME) Convulsivo",
      category: "Neurologia",
      setting: "Emergência / Sala Vermelha / UTI",
      status: "verified",
      summary: "Manejo escalonado cronometrado (0–5 min, 5–20 min, 20–40 min e > 40 min) para crises convulsivas >= 5 minutos ou crises subentrantes sem recuperação de consciência (AES / Neurocritical Care Society).",
      suspicion: [
        {
          title: "Definição Operacional (Tempo T1 = 5 minutos)",
          items: [
            "Crise tônico-clônica generalizada contínua com duração >= 5 minutos.",
            "Duas ou mais crises sequenciais entre as quais não há recuperação completa do nível de consciência basal."
          ]
        }
      ],
      initial_actions: [
        {
          title: "Fase de Estabilização (0 a 5 minutos)",
          items: [
            "Proteger o paciente de traumas, posicionar em decúbito lateral se possível, aspirar vias aéreas, ofertar O2 por máscara não reinalante (NÃO introduzir objetos na boca!).",
            "Glicemia capilar imediata: se < 60 mg/dL, administrar Tiamina 100 mg IV seguida de 40–50 mL de Glicose a 50% IV (em crianças: 2–4 mL/kg de SG 10% ou 25%).",
            "Monitorizar ECG, oximetria, PA e obter acesso venoso periférico (se sem acesso em 1–2 min, usar via Intramuscular para o benzodiazepínico!)."
          ]
        }
      ],
      exams: [
        {
          title: "Investigação Etiológica Paralela",
          items: [
            "Glicemia, sódio, cálcio iônico, magnésio, ureia, creatinina, gasometria arterial, CPK, hemograma, rastreio toxicológico e nível sérico de anticonvulsivantes.",
            "TC de crânio após estabilização da crise (e punção lombar se febre/suspeita de meningoencefalite).",
            "EEG contínuo para descartar Estado de Mal Não-Convulsivo caso o paciente não desperte em 20–30 minutos após cessarem os abalos motores."
          ]
        }
      ],
      decision_flow: [
        {
          if: "1ª LINHA (5 a 20 minutos) - Fase de Benzodiazepínico",
          then: "COM ACESSO VENOSO: Diazepam 10 mg IV lento (até 5 mg/min; repetir 1x após 5 min se necessário; pediatria: 0,2–0,3 mg/kg, máx 10 mg). SEM ACESSO VENOSO: Midazolam 10 mg IM em dose única (5 mg IM se 13–40 kg; 0,2 mg/kg IM)."
        },
        {
          if: "2ª LINHA (20 a 40 minutos) - EME Estabelecido (refratário a 2 doses de BZD)",
          then: "Administrar Droga Antiepiléptica IV de Ataque: Fenitoína 20 mg/kg IV diluída APENAS em SF 0,9% (velocidade máx. 50 mg/min em adultos e 25 mg/min em idosos/cardiopatas; dose adicional de 5–10 mg/kg se persistir) OU Levetiracetam 60 mg/kg IV em 15 min (máx 4.500 mg) OU Ácido Valproico 40 mg/kg IV em 10 min (máx 3.000 mg; evitar em hepatopatas e gestantes)."
        },
        {
          if: "3ª LINHA (> 40 minutos) - EME Refratário",
          then: "Intubação Orotraqueal em sequência rápida + Ventilação Mecânica + Anestésico IV contínuo titulado por EEG: Midazolam (ataque 0,2 mg/kg + infusão 0,05–2 mg/kg/h) OU Propofol (ataque 1–2 mg/kg + infusão 1–4 mg/kg/h) OU Cetamina (ataque 1,5–2 mg/kg + infusão 1–5 mg/kg/h)."
        }
      ],
      treatment: [
        {
          title: "Pontos Críticos de Administração",
          regimen: "Diluição e Segurança Farmacológica",
          items: [
            "A Fenitoína precipita em Soro Glicosado! Diluir exclusivamente em Soro Fisiológico 0,9% e infundir sob monitorização de ECG e PA (risco de bradicardia, bloqueio AV e hipotensão pelo veículo propilenoglicol).",
            "Subdose de benzodiazepínico na 1ª linha é a principal causa de falha inicial — usar a dose plena recomendada."
          ]
        }
      ],
      linked_drug_terms: ["Diazepam", "Midazolam", "Fenitoína", "Propofol", "Cetamina"],
      red_flags: [
        "Paralisia muscular pós-SRI com Rocurônio mascara as contrações motoras mas NÃO trata a descarga epiléptica cerebral! Iniciar sedação contínua imediatamente e monitorizar com EEG.",
        "Hiponatremia aguda grave (< 120 mEq/L) causando convulsão: corrigir com bolus de 100–150 mL de NaCl 3% IV em 10–20 min."
      ],
      source_refs: [
        { label: "American Epilepsy Society (AES) Evidence-Based Guideline for Status Epilepticus", url: "https://aesnet.org/" }
      ]
    },
    {
      id: "seed-dengue",
      slug: "dengue-classificacao-grupos-a-b-c-d-hidratacao",
      title: "Dengue: Classificação de Risco (Grupos A, B, C e D) e Hidratação",
      category: "Infectologia",
      setting: "Atenção Primária / UPA / Hospital",
      status: "verified",
      linked_recipe_slugs: ["prescricao-dengue-ambulatorial-grupos-ab"],
      summary: "Estadiamento clínico do Ministério da Saúde (Grupos A, B, C e D), interpretação dos Sinais de Alarme e cálculo exato de reposição volêmica oral e venosa.",
      suspicion: [
        {
          title: "Caso Suspeito e Sinais de Alarme (Fase Crítica - 3º ao 7º dia)",
          items: [
            "Febre (2 a 7 dias) + >= 2 sintomas: cefaleia, dor retro-orbitária, mialgia, artralgia, prostração, exantema, náuseas/vômitos ou prova do laço positiva / leucopenia.",
            "SINAIS DE ALARME (definem Grupo C): Dor abdominal intensa (referida ou à palpação) e contínua; Vômitos persistentes; Acúmulo de líquidos (ascite, derrame pleural, pericárdico); Hipotensão postural e/ou lipotimia; Hepatomegalia > 2 cm abaixo do rebordo costal; Sangramento de mucosa; Letargia e/ou irritabilidade; Aumento progressivo do hematócrito."
          ]
        }
      ],
      initial_actions: [
        {
          title: "Estadiamento nos 4 Grupos do Ministério da Saúde",
          items: [
            "GRUPO A (Azul): Sem sinais de alarme, sem sangramento espontâneo, prova do laço negativa e sem comorbidades/risco social -> Manejo ambulatorial.",
            "GRUPO B (Verde): Sem sinais de alarme, MAS com sangramento de pele espontâneo (petéquias) ou prova do laço positiva, OU condições especiais (gestantes, lactentes < 2 anos, idosos >= 65 anos, HAS, DM, DRC, DPOC, hepatopatas, doenças hematológicas) -> Observação em leito até resultado do hemograma.",
            "GRUPO C (Amarelo): Presença de QUALQUER Sinal de Alarme (sem sinais de choque) -> Internação hospitalar mínima de 48h e hidratação IV imediata.",
            "GRUPO D (Vermelho): Sinais de Choque (taquicardia, extremidades frias, pulso fino, enchimento capilar > 2 seg, convergência pressórica PA diferencial <= 20 mmHg, hipotensão arterial), desconforto respiratório ou sangramento grave -> Sala Vermelha / UTI imediata."
          ]
        }
      ],
      exams: [
        {
          title: "Solicitação conforme Grupo",
          items: [
            "Grupo A: exames não obrigatórios (solicitar conforme clínica).",
            "Grupo B: Hemograma completo obrigatório na admissão (avaliar hemoconcentração e plaquetas).",
            "Grupos C e D: Hemograma completo, albumina sérica, TGO/TGP (obrigatórios) + ureia, creatinina, eletrólitos, gasometria/lactato, coagulograma, radiografia de tórax e USG de abdome/tórax + NS1/PCR (até 5º dia) ou Sorologia IgM (a partir do 6º dia)."
          ]
        }
      ],
      decision_flow: [
        {
          if: "Grupo A ou Grupo B com hematócrito normal",
          then: "Hidratação Oral: Adultos 60 mL/kg/dia (sendo 1/3 com Soro de Reidratação Oral nas primeiras 4–6h e 2/3 com líquidos caseiros). Reavaliar no dia da defervescência da febre!"
        },
        {
          if: "Grupo C (Presença de Sinais de Alarme)",
          then: "Hidratação IV Imediata: 10 mL/kg de SF 0,9% (ou Ringer Lactato) na 1ª hora. Reavaliar clínica e hematócrito após 1–2h (pode repetir 10 mL/kg/h até 3 vezes se não houver melhora). Após melhora clínica/diurese >= 1 mL/kg/h: fase de manutenção 25 mL/kg em 6h, seguida de 25 mL/kg em 8h."
        },
        {
          if: "Grupo D (Choque da Dengue)",
          then: "Expansão Rápida em Sala Vermelha: 20 mL/kg de SF 0,9% ou Ringer Lactato em até 20 minutos! Reavaliar a cada 15–30 min (repetir até 3 fases se choque persistir). Se hematócrito em elevação após 3 expansões: utilizar Albumina 0,5–1 g/kg; se hematócrito em queda brusca com choque: suspeitar de hemorragia oculta e transfundir concentrado de hemácias (10 mL/kg)."
        }
      ],
      treatment: [
        {
          title: "Sintomáticos e Medicamentos Contraindicados",
          regimen: "Analgesia Segura e Proibição de AINEs/AAS",
          items: [
            "Analgesia e antitérmico: Dipirona 500 mg a 1 g VO/IV até de 6/6h OU Paracetamol 500 a 750 mg VO até de 6/6h.",
            "Antiemético: Ondansetrona 4 a 8 mg VO/IV 8/8h ou Metoclopramida 10 mg IV 8/8h.",
            "EXPRESSAMENTE CONTRAINDICADOS: Ácido Acetilsalicílico (AAS) e Anti-inflamatórios Não Esteroidais (Ibuprofeno, Diclofenaco, Cetoprofeno, Nimesulida) pelo risco de hemorragia grave e acidose."
          ]
        }
      ],
      linked_drug_terms: ["Dipirona", "Paracetamol", "Ondansetrona", "Metoclopramida"],
      notification: {
        text: "Doença de Notificação Compulsória no SINAN (todo caso suspeito). Óbitos ou casos graves do Grupo D exigem notificação imediata em até 24 horas."
      },
      red_flags: [
        "O momento de maior perigo na Dengue NÃO é o pico febril, e sim a DEFERVESCÊNCIA (queda da febre entre o 3º e o 7º dia), quando ocorre o extravasamento plasmático!",
        "Convergência pressórica (PAS - PAD <= 20 mmHg, ex.: PA 100x85 mmHg) já define choque inicial na dengue, mesmo antes da PAS cair abaixo de 90 mmHg."
      ],
      source_refs: [
        { label: "Ministério da Saúde - Dengue: Diagnóstico e Manejo Clínico (Adulto e Criança) 6ª ed. 2024", url: "https://www.gov.br/saude/" }
      ]
    },
    {
      id: "seed-preeclampsia",
      slug: "pre-eclampsia-grave-eclampsia-crise-hipertensiva-gestacao",
      title: "Pré-Eclâmpsia com Sinais de Gravidade e Eclâmpsia",
      category: "Ginecologia e Obstetrícia",
      setting: "Maternidade / Emergência Obstétrica",
      status: "verified",
      summary: "Prevenção e controle de convulsões com Sulfato de Magnésio e manejo imediato da crise hipertensiva gestacional (PAS >= 160 ou PAD >= 110 mmHg) segundo RBEHG / FEBRASGO / ACOG.",
      suspicion: [
        {
          title: "Critérios de Gravidade e Iminência de Eclâmpsia",
          items: [
            "Gestante > 20 semanas (ou puérpera até 6 semanas) com PA >= 140x90 mmHg associada a proteinúria (relação P/Cr >= 0,3 ou >= 300 mg/24h) OU disfunção de órgão-alvo.",
            "SINAIS DE GRAVIDADE: Crise hipertensiva (PAS >= 160 e/ou PAD >= 110 mmHg confirmada em 15 min); Sinais de Iminência de Eclâmpsia (cefaleia frontal/occipital refratária, escotomas cintilantes/visão turva, epigastralgia ou dor em hipocôndrio direito em barra - sinal de Chaussier, hiperreflexia patelar); Edema agudo de pulmão; Creatinina >= 1,1 mg/dL; Síndrome HELLP (Hemólise com DHL >= 600 / esquizócitos, TGO/TGP >= 2x LSN ou >= 70 U/L, Plaquetas < 100.000/mm³)."
          ]
        }
      ],
      initial_actions: [
        {
          title: "Tríade de Estabilização Materna Imediata",
          items: [
            "1. Iniciar SULFATO DE MAGNÉSIO imediatamente em toda Pré-Eclâmpsia com sinais de gravidade, iminência de eclâmpsia, HELLP ou Eclâmpsia (superior a fenitoína e diazepam!).",
            "2. Tratar CRISE HIPERTENSIVA aguda (PA >= 160x110 mmHg) em até 30–60 minutos para prevenir AVC hemorrágico materno (meta: reduzir PA em 15–25%, mantendo PAS entre 130–150 e PAD entre 80–100 mmHg sem causar hipoperfusão placentária).",
            "3. Avaliar vitalidade fetal (cardiotocografia) APÓS estabilização materna e planejar o parto conforme idade gestacional."
          ]
        }
      ],
      exams: [
        {
          title: "Rotina Laboratorial de Pré-Eclâmpsia / Rastreio HELLP",
          items: [
            "Hemograma com contagem de plaquetas e pesquisa de esquizócitos em sangue periférico.",
            "DHL (desidrogenase láctica), Bilirrubina total e frações, TGO (AST) e TGP (ALT).",
            "Creatinina, ácido úrico, relação proteína/creatinina em amostra isolada de urina.",
            "Coagulograma (TP, TTPa, fibrinogênio) se plaquetas < 100.000/mm³ ou suspeita de DPP."
          ]
        }
      ],
      decision_flow: [
        {
          if: "Acesso venoso disponível com bomba de infusão contínua (BIC)",
          then: "Esquema de ZUSPAN (Sulfato de Magnésio): Ataque de 4 g IV em 15–20 min (diluir 8 mL de MgSO4 50% em 12 mL de SG 5% ou 100 mL de SF 0,9%). Manutenção: 1 g/h a 2 g/h IV contínuo em BIC por 24 horas após o parto ou após a última crise."
        },
        {
          if: "Transporte inter-hospitalar ou ausência de bomba de infusão confiável",
          then: "Esquema de PRITCHARD: Ataque de 4 g IV lento (15–20 min) + 10 g IM profundo (5 g em cada glúteo de MgSO4 50%). Manutenção: 5 g IM profundo a cada 4 horas (desde que reflexo patelar presente, FR >= 16 irpm e diurese >= 25 mL/h)."
        },
        {
          if: "Convulsão recorrente na vigência de Sulfato de Magnésio",
          then: "Administrar novo bolus de 2 g IV de Sulfato de Magnésio em 5 a 10 minutos e elevar manutenção para 2 g/h."
        }
      ],
      treatment: [
        {
          title: "Anti-hipertensivos de 1ª Linha na Crise Hipertensiva Gestacional",
          regimen: "Nifedipino VO ou Hidralazina IV",
          items: [
            "1ª Opção (Rápida e oral se paciente consciente): Nifedipino 10 mg VO (comprimido ou cápsula DEGLUTIDA, NUNCA sublingual!). Repetir 10 a 20 mg VO a cada 20–30 minutos se PA persistir >= 160x110 mmHg (máx. 30–50 mg na 1ª hora).",
            "2ª Opção (Venosa): Hidralazina 5 mg IV lento em 2 min (diluir 1 ampola de 20 mg/1 mL em 19 mL de água destilada = 1 mg/mL; fazer 5 mL IV). Repetir 5 a 10 mg IV a cada 20 minutos até máximo de 20–30 mg.",
            "Refratariedade grave / Edema Agudo de Pulmão: Nitroprussiato de Sódio IV em BIC (0,25 a 2 mcg/kg/min) por curto período pré-parto."
          ]
        }
      ],
      linked_drug_terms: ["Sulfato de Magnésio", "Nifedipino", "Hidralazina", "Gluconato de Cálcio"],
      red_flags: [
        "VIGILÂNCIA DE INTOXICAÇÃO POR MAGNÉSIO (checar de 1/1h): 1º sinal é a abolição do reflexo patelar (magnésio > 7–10 mEq/L), seguido de depressão respiratória (FR < 12–16 irpm) e parada cardíaca! Se reflexo abolido ou FR < 12–16: SUSPENDER MgSO4 e aplicar o antídoto GLUCONATO DE CÁLCIO 10% 10 mL (1 g) IV lento em 3 a 5 minutos!",
        "Se diurese < 25 mL/h (oligúria sem perda de reflexo): reduzir velocidade de infusão do MgSO4 pela metade (0,5 g/h) e vigiar reflexos rigorosamente.",
        "CONTRAINDICADOS NA GESTAÇÃO: IECA (Captopril, Enalapril), BRA (Losartana) e Atenolol."
      ],
      source_refs: [
        { label: "Rede Brasileira de Estudos sobre Hipertensão na Gravidez (RBEHG) / FEBRASGO", url: "https://www.febrasgo.org.br/" },
        { label: "ACOG Practice Bulletin No. 222: Gestational Hypertension and Preeclampsia", url: "https://www.acog.org/" }
      ]
    },
    {
      id: "seed-asma",
      slug: "crise-de-asma-aguda-exacerbacao-gina",
      title: "Exacerbação Aguda de Asma (Crise Asmática - GINA 2024)",
      category: "Pneumologia",
      setting: "Pronto-Socorro / Emergência",
      status: "verified",
      linked_recipe_slugs: ["prescricao-asma-alta-gina"],
      summary: "Estratificação de gravidade (leve/moderada, grave e quase-fatal) e tratamento imediato na 1ª hora com broncodilatadores de curta ação, ipratrópio, corticosteroide sistêmico e sulfato de magnésio.",
      suspicion: [
        {
          title: "Classificação de Gravidade na Admissão (GINA)",
          items: [
            "Crise Leve a Moderada: Fala frases completas, prefere ficar sentado a deitado, não agitado, FR aumentada (< 30 irpm), sem uso de musculatura acessória, FC 100–120 bpm, SpO2 90–95% em ar ambiente, PFE > 50% do predito.",
            "Crise Grave: Fala apenas palavras isoladas, senta-se curvado para frente (posição de tripé), agitado, FR > 30 irpm, uso evidente de musculatura acessória (tiragem), FC > 120 bpm, SpO2 < 90% em ar ambiente, PFE <= 50%.",
            "Asma Quase-Fatal (Risco Iminente de Vida): Sonolência, confusão mental, exaustão respiratória, bradicardia ou 'Tórax Silencioso' à ausculta."
          ]
        }
      ],
      initial_actions: [
        {
          title: "Manejo da 1ª Hora",
          items: [
            "1. Oxigênio suplementar titulado para manter SpO2 entre 93% e 95% em adultos (94–98% em crianças e gestantes) — evitar hiperóxia a 100%.",
            "2. SABA inalatório (Salbutamol 100 mcg/jato com espaçador): 4 a 10 jatos a cada 20 minutos na 1ª hora (preferir spray pressurizado com espaçador à nebulização).",
            "3. Associar Brometo de Ipratrópio nas crises moderadas a graves: 4 a 8 jatos (80–160 mcg) ou 0,5 mg (40 gotas) a cada 20 minutos na 1ª hora (reduz taxa de internação!).",
            "4. Corticosteroide sistêmico na 1ª hora: Prednisona ou Prednisolona 40 a 50 mg VO (1–2 mg/kg em crianças, máx 40 mg) OU, se incapaz de deglutir/vômitos/crise grave: Hidrocortisona 200 mg IV ou Metilprednisolona 40–60 mg IV."
          ]
        }
      ],
      exams: [
        {
          title: "Avaliação Funcional e Exames Selecionados",
          items: [
            "Oximetria de pulso contínua e medida seriada de Pico de Fluxo Expiratório (Peak Flow) antes e 1h após broncodilatação.",
            "Gasometria arterial: indicada APENAS em crise grave refratária, SpO2 < 90% apesar de O2 ou sinais de fadiga (PaCO2 normal de 40–45 mmHg ou elevada em paciente taquipneico é sinal de falência ventilatória iminente!).",
            "Radiografia de tórax: não realizar de rotina; solicitar apenas se suspeita de pneumotórax, pneumomediastino, pneumonia consolidada ou falha terapêutica."
          ]
        }
      ],
      decision_flow: [
        {
          if: "Crise Grave sem resposta após 1 hora de SABA + Ipratrópio + Corticoide (PFE < 60% ou hipoxemia)",
          then: "Administrar Sulfato de Magnésio 2 g IV (20 mL de MgSO4 10% ou 4 mL de MgSO4 50%) diluídos em 100 mL de SF 0,9%, infundidos em 20 minutos em dose única (crianças: 25–50 mg/kg IV em 20 min, máx 2 g)."
        },
        {
          if: "Asma Quase-Fatal (sonolência, tórax silencioso, acidose hipercápnica progressiva)",
          then: "Intubação Orotraqueal em Sequência Rápida com CETAMINA (1,5–2 mg/kg IV — efeito broncodilatador!) + Rocurônio/Succinilcolina, utilizando o maior tubo possível (>= 8,0 mm no adulto). Configurar ventilação mecânica anti-aprisionamento aéreo: Volume corrente baixo (6 mL/kg), FR baixa (10–14 irpm), relação I:E prolongada (1:3 a 1:4) e hipercapnia permissiva."
        },
        {
          if: "Melhora clínica sustentada após 1–3h (sem dispneia, SpO2 > 94% em ar ambiente, PFE > 60–80%)",
          then: "Alta hospitalar com Prednisona 40–50 mg/dia VO por 5 a 7 dias + iniciar ou otimizar Corticoide Inalatório associado a Formoterol (Budesonida/Formoterol) + plano de ação escrito e revisão da técnica inalatória."
        }
      ],
      treatment: [
        {
          title: "Prescrição de Alta Pós-Crise (Prevenção de Recaída)",
          regimen: "Corticoide Oral Curto + Manutenção Inalatória Obrigatória",
          items: [
            "Prednisona 40 a 50 mg VO 1x pela manhã por 5 a 7 dias (não precisa de desmame se uso < 2 semanas).",
            "NUNCA dar alta apenas com Salbutamol isolado! Iniciar ou ajustar Corticoide Inalatório + Formoterol (ex.: Budesonida/Formoterol 200/6 mcg 1 a 2 inalações 12/12h e de alívio).",
            "Aminofilina IV NÃO é recomendada pelo GINA devido à baixa eficácia adicional e alta toxicidade (arritmias e convulsões)."
          ]
        }
      ],
      linked_drug_terms: ["Salbutamol", "Ipratrópio", "Prednisona", "Hidrocortisona", "Sulfato de Magnésio", "Cetamina"],
      red_flags: [
        "Sedativos (benzodiazepínicos, morfina) são ESTRITAMENTE CONTRAINDICADOS no asmático não intubado pelo risco de parada respiratória imediata!",
        "Hipotensão grave logo após intubação do asmático: pensar em Auto-PEEP (hiperinsuflação dinâmica) ou Pneumotórax Hipertensivo -> Desconectar o paciente do ventilador por 30–60 segundos com compressão torácica expiratória suave para esvaziar os pulmões."
      ],
      source_refs: [
        { label: "Global Initiative for Asthma (GINA) Strategy Report 2024", url: "https://ginasthma.org/" }
      ]
    },
    {
      id: "seed-hda",
      slug: "hemorragia-digestiva-alta-varicosa-e-nao-varicosa",
      title: "Hemorragia Digestiva Alta (HDA Não-Varicosa e Varicosa)",
      category: "Gastroenterologia",
      setting: "Emergência / Endoscopia / UTI",
      status: "verified",
      summary: "Ressuscitação hemodinâmica, transfusão restritiva (Hb alvo 7–9 g/dL), terapia farmacológica pré-endoscópica (IBP vs. Terlipressina/Octreotide + Ceftriaxona) e EDA em até 12–24h (ESGE / Baveno VII).",
      suspicion: [
        {
          title: "Apresentação e Diferenciação Etiológica",
          items: [
            "Hematêmese (vômito com sangue vivo ou em 'borra de café') e/ou Melena (fezes pastosas, enegrecidas e fétidas) ou enterorragia maciça com instabilidade hemodinâmica.",
            "Suspeitar de HDA Varicosa em todo paciente com estigmas de hepatopatia crônica/cirrose (icterícia, ascite, circulação colateral, telangiectasias, esplenomegalia, plaquetopenia)."
          ]
        }
      ],
      initial_actions: [
        {
          title: "Estabilização Inicial e Metas Transfusionais",
          items: [
            "1. Dois acessos venosos periféricos calibrosos (14G a 18G), tipagem sanguínea/prova cruzada e ressuscitação com cristaloide para manter PAM >= 65 mmHg.",
            "2. Proteção de via aérea (Intubação Orotraqueal) se hematêmese volumosa contínua, encefalopatia hepática grau III/IV ou rebaixamento do sensório (Glasgow <= 8).",
            "3. Estratégia Transfusional RESTRITIVA: transfundir concentrado de hemácias se Hb < 7,0 g/dL (meta 7,0 a 9,0 g/dL). Em coronariopatas agudos ou isquemia ativa: gatilho Hb < 8,0 g/dL (meta 8–10 g/dL). Evitar hipertransfusão (aumenta pressão portal e ressangramento!).",
            "4. Calcular escore de Glasgow-Blatchford na admissão (se = 0 a 1: baixíssimo risco, considerar EDA ambulatorial precoce)."
          ]
        }
      ],
      exams: [
        {
          title: "Laboratório e Endoscopia Digestiva Alta (EDA)",
          items: [
            "Hemograma seriado (atenção: Hb inicial pode estar falsamente normal no sangramento hiperagudo!), ureia, creatinina, sódio, potássio, INR/TP, TTPa, fibrinogênio, bilirrubinas, albumina e lactato.",
            "EDA: realizar em até 24 horas na HDA não-varicosa (após estabilização) e em até 12 horas na suspeita de HDA varicosa."
          ]
        }
      ],
      decision_flow: [
        {
          if: "Suspeita de HDA Não-Varicosa (Úlcera Péptica, gastrite, Mallory-Weiss)",
          then: "Iniciar IBP em alta dose: Omeprazol ou Pantoprazol 80 mg IV em bolus lento, seguido de 40 mg IV de 12/12h (ou 8 mg/h em infusão contínua se estigma de alto risco Forrest Ia, Ib ou IIa por 72h após hemostasia endoscópica)."
        },
        {
          if: "Suspeita de HDA Varicosa (Cirrótico / Hipertensão Portal)",
          then: "Iniciar IMEDIATAMENTE (antes da EDA): 1) Vasoconstritor esplâncnico por 2 a 5 dias: Terlipressina 2 mg IV de 4/4h nas primeiras 24–48h (depois 1 mg 4/4h) OU Octreotide 50 mcg IV bolus + 50 mcg/h em BIC; E 2) Profilaxia antibiótica obrigatória por 5 a 7 dias: Ceftriaxona 1 g IV a cada 24 horas (reduz infecções, PBE, ressangramento e mortalidade!)."
        },
        {
          if: "HDA Varicosa maciça refratária com instabilidade grave",
          then: "Passagem de Balão de Sengstaken-Blakemore (como ponte temporária por no máximo 24h em paciente intubado) e indicar TIPS de resgate precoce."
        }
      ],
      treatment: [
        {
          title: "Procinético Pré-EDA e Manejo de Antitrombóticos",
          regimen: "Otimização da Visão Endoscópica e Reversão de Coagulopatia",
          items: [
            "Procinético 30–120 min antes da EDA em hematêmese volumosa: Eritromicina 250 mg IV ou Metoclopramida 10 mg IV (melhora visualização da mucosa gástrica).",
            "NÃO usar Ácido Tranexâmico de rotina na HDA (estudo HALT-IT mostrou ausência de benefício na mortalidade e aumento de eventos tromboembólicos).",
            "No cirrótico com INR alargado: NÃO transfundir plasma fresco congelado de rotina (não corrige a coagulopatia da cirrose e causa sobrecarga volêmica aumentando a pressão portal)."
          ]
        }
      ],
      linked_drug_terms: ["Omeprazol", "Ceftriaxona", "Metoclopramida"],
      red_flags: [
        "Terlipressina é contraindicada em pacientes com doença arterial coronariana ativa, arritmias graves, isquemia mesentérica/periférica ou gestação (preferir Octreotide nesses casos).",
        "Em todo cirrótico com HDA: rastrear Peritonite Bacteriana Espontânea (paracentese diagnóstica se ascite presente) e prevenir encefalopatia hepática com Lactulose."
      ],
      source_refs: [
        { label: "Baveno VII - Renewing Consensus in Portal Hypertension (J Hepatol 2022)", url: "https://www.journal-of-hepatology.eu/" },
        { label: "ESGE Guideline on Non-Variceal Upper Gastrointestinal Hemorrhage", url: "https://www.esge.com/" }
      ]
    },
    {
      id: "seed-tep",
      slug: "tromboembolismo-pulmonar-agudo-tep",
      title: "Tromboembolismo Pulmonar Agudo (TEP)",
      category: "Pneumologia",
      setting: "Emergência / Enfermaria / UTI",
      status: "verified",
      summary: "Probabilidade pré-teste (Wells / Genebra / PERC), uso racional do D-dímero ajustado pela idade, Angio-TC de tórax, classificação de risco (sPESI) e anticoagulação ou trombólise (ESC).",
      suspicion: [
        {
          title: "Apresentação Clínica e Estratificação Pré-Teste",
          items: [
            "Dispneia de início súbito ou piora aguda, dor torácica pleurítica, taquicardia, hemoptise, síncope ou hipotensão inexplicada, especialmente com fatores de risco (cirurgia recente, imobilização, neoplasia, gestação/puerpério, ACO, TVP prévia).",
            "Aplicar Escore de Wells para TEP ou Escore de Genebra Revisado para definir probabilidade clínica Baixa/Intermediária vs. Alta."
          ]
        }
      ],
      initial_actions: [
        {
          title: "Estabilização e Algoritmo Diagnóstico",
          items: [
            "Avaliar estabilidade hemodinâmica imediatamente: TEP de ALTO RISCO (Maciço) é definido por PCR, Choque Obstrutivo (PAS < 90 mmHg ou necessidade de vasopressor) ou Hipotensão Persistente (PAS < 90 mmHg ou queda >= 40 mmHg por > 15 min).",
            "Se Instável (Alto Risco): realizar Ecocardiograma Transtorácico à beira-leito (POCUS) para buscar sobrecarga aguda de VD ou Angio-TC imediata se disponível.",
            "Se Estável com probabilidade Baixa/Intermediária: aplicar regra PERC (se baixa probabilidade e PERC = 0, exclui TEP sem exames); caso contrário, dosar D-dímero de alta sensibilidade (usar corte ajustado para idade > 50 anos: Idade x 10 ng/mL).",
            "Se Estável com probabilidade Alta (Wells > 6) ou D-dímero positivo: realizar Angiotomografia de Artérias Pulmonares E iniciar anticoagulação empírica imediata se não houver contraindicação."
          ]
        }
      ],
      exams: [
        {
          title: "Biomarcadores de Estratificação de Risco (Pós-Confirmação)",
          items: [
            "Troponina e BNP/NT-proBNP (avaliam injúria e disfunção miocárdica do ventrículo direito).",
            "Avaliação da relação VD/VE na Angio-TC ou no Ecocardiograma (>= 0,9 a 1,0 indica disfunção de VD).",
            "Aplicar escore sPESI (Simplified Pulmonary Embolism Severity Index) para definir risco baixo (sPESI = 0) vs. intermediário (sPESI >= 1)."
          ]
        }
      ],
      decision_flow: [
        {
          if: "TEP de Alto Risco (Instabilidade Hemodinâmica / Choque)",
          then: "Indicar Reperfusão Primária Imediata: Trombólise Sistêmica com Alteplase 100 mg IV em 2 horas (ou 0,6 mg/kg em 15 min, máx 50 mg, em PCR/choque extremo) + Anticoagulação com Heparina Não Fracionada IV. Evitar sobrecarga volêmica (> 500 mL piora a distensão do VD e reduz o débito do VE!); usar Noradrenalina se hipotensão."
        },
        {
          if: "TEP de Risco Intermediário-Alto (Estável, sPESI >= 1, COM disfunção de VD no Eco/TC E Troponina positiva)",
          then: "Internar em UTI/Unidade Semi-Intensiva com anticoagulação plena parenteral (Enoxaparina 1 mg/kg SC 12/12h ou Fondaparinux) nas primeiras 48–72h e vigiar sinais de descompensação (trombólise de resgate se deteriorar)."
        },
        {
          if: "TEP de Baixo Risco (sPESI = 0, sem disfunção de VD, troponina negativa e suporte social adequado)",
          then: "Anticoagulação oral direta (DOAC) e considerar tratamento domiciliar ou alta precoce."
        }
      ],
      treatment: [
        {
          title: "Esquemas de Anticoagulação Plena",
          regimen: "DOACs (1ª escolha) ou HBPM",
          items: [
            "Rivaroxabana (dispensa heparina prévia): 15 mg VO de 12/12h com alimentos por 21 dias, seguido de 20 mg VO 1x/dia.",
            "Apixabana (dispensa heparina prévia): 10 mg VO de 12/12h por 7 dias, seguido de 5 mg VO de 12/12h.",
            "Enoxaparina (1ª escolha em gestantes; necessária por >= 5 dias antes de Dabigatrana ou Edoxabana, ou como ponte para Varfarina): 1 mg/kg SC de 12/12h (ou 1 mg/kg SC 1x/dia se ClCr 15–29 mL/min).",
            "Duração mínima: 3 meses para todos os pacientes (estender indefinidamente se TEP não provocado recorrente ou trombofilia grave/câncer ativo)."
          ]
        }
      ],
      linked_drug_terms: ["Enoxaparina", "Rivaroxabana", "Alteplase", "Noradrenalina"],
      red_flags: [
        "CUIDADO COM VOLUME NO TEP MACIÇO: O ventrículo direito dilatado comprime o ventrículo esquerdo pelo septo interventricular; infundir mais de 500 mL de soro agrava a falência do VD e precipita parada cardíaca em AESP!",
        "DOACs são contraindicados na gestação/lactação, na Síndrome Antifosfolípide triplo-positiva e na insuficiência renal dialítica."
      ],
      source_refs: [
        { label: "ESC Guidelines for the Diagnosis and Management of Acute Pulmonary Embolism", url: "https://www.escardio.org/Guidelines" }
      ]
    },
    {
      id: "seed-sri",
      slug: "intubacao-em-sequencia-rapida-sri-via-aerea",
      title: "Intubação em Sequência Rápida (SRI) — Os 7 Ps, Drogas e Doses",
      category: "Emergência e UTI",
      setting: "Sala Vermelha / UTI / SAMU",
      status: "verified",
      linked_recipe_slugs: ["prescricao-sri-intubacao"],
      summary: "Protocolo operacional dos 7 Ps da Intubação em Sequência Rápida, escolha do indutor conforme perfil hemodinâmico (Cetamina, Etomidato, Propofol), bloqueadores neuromusculares e sedação pós-intubação.",
      suspicion: [
        {
          title: "Indicações Clássicas de Via Aérea Definitiva",
          items: [
            "Falência de manutenção ou proteção da via aérea (Glasgow <= 8, perda de reflexo de proteção laríngea, trauma maxilofacial grave, hematoma cervical expansivo, queimadura inalatória com estridor).",
            "Falência de oxigenação ou ventilação (hipoxemia refratária a O2 suplementar/VNI ou acidose respiratória hipercápnica progressiva com fadiga muscular).",
            "Curso clínico esperado de deterioração (choque séptico/politrauma instável, transporte aeromédico, estado de mal epiléptico refratário)."
          ]
        }
      ],
      initial_actions: [
        {
          title: "Os 7 Ps da Sequência Rápida (Preparo e Pré-Oxigenação)",
          items: [
            "1. PREPARAÇÃO (10 min antes): Checar material com mnemônico SOAPME (Suction/Aspirador funcionando; Oxygen/BVM + máscara não reinalante; Airway/Laringoscópio ou Videolaringoscópio + tubos 7.5 e 8.0 testados + fio-guia/Bougie + máscara laríngea + kit cricotireoidostomia; Pharmacology/Seringas rotuladas; Monitoring/Capnografia, ECG, Oximetria, PA).",
            "2. PRÉ-OXIGENAÇÃO (3 a 5 min): Ofertar O2 a 100% (15 L/min) por máscara com reservatório não reinalante (ou VNI/CPAP se shunt pulmonar importante como EAP/SDRA) para desnitrogenar a Capacidade Residual Funcional + Oxigenação Apneica com cateter nasal a 15 L/min.",
            "3. PRÉ-OTIMIZAÇÃO HEMODINÂMICA (Ressuscitação antes de intubar!): Se Índice de Choque (FC / PAS) >= 0,8 ou PAS < 100 mmHg, iniciar cristaloide e Noradrenalina em bomba (ou preparar Push-Dose Pressor de Adrenalina diluída 10 mcg/mL ou Fenilefrina 100 mcg/mL) ANTES do indutor — a pressão positiva e os sedativos podem precipitar PCR pós-intubação!"
          ]
        }
      ],
      exams: [
        {
          title: "Avaliação Rápida de Via Aérea Difícil (LEMON e MACOCHA)",
          items: [
            "Anatômica (LEMON): Look externally, Evaluate 3-3-2, Mallampati III/IV, Obstruction/Obesity, Neck mobility (colar cervical).",
            "Fisiológica (HOP): Hypotension (choque), Oxygenation (hipoxemia grave), pH (acidose metabólica grave como CAD — evitar apneia prolongada!).",
            "Confirmação padrão-ouro pós-passagem do tubo: Capnografia em forma de onda contínua (ETCO2) + ausculta epigástrica e bilateral + radiografia de tórax (ponta do tubo a 3–5 cm da carina)."
          ]
        }
      ],
      decision_flow: [
        {
          if: "Paciente com Instabilidade Hemodinâmica, Choque Séptico ou Broncoespasmo Grave (Asma)",
          then: "Indutor de escolha: CETAMINA 1,5 a 2 mg/kg IV (ex.: 70 kg = 100 a 140 mg IV) OU ETOMIDATO 0,3 mg/kg IV (ex.: 70 kg = 20 mg IV = 1 ampola). Reduzir a dose do indutor pela metade (0,5–1 mg/kg de Cetamina ou 0,15 mg/kg de Etomidato) em choque profundo extremo."
        },
        {
          if: "Paciente com Status Epilepticus ou Hipertensão Intracraniana sem hipotensão",
          then: "Indutor: PROPOFOL 1,5 a 2 mg/kg IV (apenas se hemodinamicamente estável!) ou Etomidato 0,3 mg/kg IV / Cetamina 1,5 mg/kg IV."
        },
        {
          if: "Escolha do Bloqueador Neuromuscular (Paralisia Imediata após o Indutor)",
          then: "ROCURÔNIO 1,2 mg/kg IV (ex.: 70 kg = 80 a 90 mg IV; início em 45–60s, sem contraindicações metabólicas) OU SUCCINILCOLINA 1,5 mg/kg IV (ex.: 70 kg = 100 mg IV; início em 45s; CONTRAINDICADA em hipercalemia, rabdomiólise, grandes queimados > 48h, denervação/AVC > 72h ou história de hipertermia maligna)."
        }
      ],
      treatment: [
        {
          title: "Doses Práticas para Adulto de 70 kg e Pós-Intubação",
          regimen: "Pré-tratamento + Indução + Paralisia + Manutenção",
          items: [
            "Pré-tratamento (opcional, 3 min antes se simpaticólise indicada como dissecção de aorta, HIC ou emergência hipertensiva): Fentanil 2 a 3 mcg/kg IV lento (70 kg = 150–200 mcg = 3 a 4 mL).",
            "Indução (4º P - Paralisia com Indução): Etomidato 0,3 mg/kg (20 mg = 10 mL) OU Cetamina 1,5–2 mg/kg (100–140 mg = 2 a 2,8 mL da ampola de 50 mg/mL).",
            "Bloqueio Neuromuscular: Succinilcolina 1,5 mg/kg (100 mg diluídos em 10 mL de AD) OU Rocurônio 1,2 mg/kg (85 mg = 8,5 mL da ampola de 10 mg/mL).",
            "7º P - Cuidados Pós-Intubação Imediatos: Iniciar analgesia + sedação contínua imediatamente (Fentanil + Propofol ou Midazolam, especialmente se usou Rocurônio, cujo bloqueio dura 45–60 min!) e ajustar ventilador em modo protetor (VC 6 mL/kg de peso predito, PEEP >= 5 cmH2O, pressão de platô < 30 cmH2O)."
          ]
        }
      ],
      linked_drug_terms: ["Cetamina", "Etomidato", "Propofol", "Succinilcolina", "Rocurônio", "Fentanil", "Midazolam", "Noradrenalina"],
      red_flags: [
        "NUNCA usar Midazolam em bolus alto (ex.: 10–15 mg) como indutor único na SRI de emergência: tem início de ação lento (2–3 min) e causa hipotensão grave!",
        "Despertar paralisado: o Rocurônio dura até 60 minutos, enquanto o Etomidato dura apenas 8 a 12 minutos — iniciar bomba de sedoanalgesia logo após fixar o tubo!"
      ],
      source_refs: [
        { label: "Society of Critical Care Medicine (SCCM) Clinical Practice Guidelines for Rapid Sequence Intubation 2023", url: "https://www.sccm.org/" }
      ]
    },
    {
      id: "seed-emergencia-hipertensiva",
      slug: "emergencias-hipertensivas-e-disseccao-aguda-de-aorta",
      title: "Emergências Hipertensivas e Dissecção Aguda de Aorta",
      category: "Cardiologia",
      setting: "Emergência / Sala Vermelha / UTI",
      status: "verified",
      linked_recipe_slugs: ["prescricao-emergencia-hipertensiva"],
      summary: "Diferenciação entre Emergência Hipertensiva (lesão aguda de órgão-alvo → droga IV imediata) e Pseudocrise/Urgência Hipertensiva, metas de redução pressórica e manejo da Dissecção Aórtica.",
      suspicion: [
        {
          title: "Lesões Agudas de Órgão-Alvo (LOA) que Definem Emergência Hipertensiva",
          items: [
            "Elevação acentuada da PA (geralmente >= 180x120 mmHg) acompanhada de lesão aguda e progressiva de órgão-alvo:",
            "Neurovascular: Encefalopatia Hipertensiva (cefaleia, confusão, vômitos, alterações visuais/convulsões), AVC Isquêmico ou AVC Hemorrágico / HSA.",
            "Cardiovascular: Edema Agudo de Pulmão Hipertensivo, Síndrome Coronariana Aguda e Dissecção Aguda de Aorta (dor torácica/dorsal lancinante rasgante de intensidade máxima desde o início, assimetria de pulsos/PA > 20 mmHg entre membros).",
            "Renal / Obstétrica: Hipertensão Maligna com retinopatia graus III/IV + microangiopatia trombótica/IRA, ou Eclâmpsia / Pré-Eclâmpsia Grave."
          ]
        }
      ],
      initial_actions: [
        {
          title: "Metas Gerais vs. Metas Específicas de Redução da PA",
          items: [
            "REGRA GERAL (Encefalopatia, Hipertensão Maligna): Reduzir a PAM em no máximo 20% a 25% na 1ª hora; nas próximas 2 a 6 horas reduzir para ~160/100–110 mmHg; e atingir PA normal em 24 a 48h (quedas bruscas causam isquemia cerebral, renal ou coronariana!).",
            "EXCEÇÃO 1 - DISSECÇÃO AGUDA DE AORTA (Redução imediata!): Atingir FC < 60 bpm E PAS entre 100 e 120 mmHg em 5 a 20 minutos!",
            "EXCEÇÃO 2 - EDEMA AGUDO DE PULMÃO HIPERTENSIVO: Reduzir PA imediatamente em 20–25% com Nitroglicerina ou Nitroprussiato + Furosemida + VNI."
          ]
        }
      ],
      exams: [
        {
          title: "Rastreio de Lesão de Órgão-Alvo",
          items: [
            "Fundoscopia direta (pesquisar hemorragias em chama de vela, exsudatos algodonosos e papiledema), ECG de 12 derivações e Radiografia de tórax.",
            "Creatinina, ureia, sódio, potássio, hemograma com pesquisa de esquizócitos, DHL, troponina e EAS (hematúria/proteinúria).",
            "TC de crânio sem contraste (se sintomas neurológicos) ou Angio-TC de Aorta Torácica e Abdominal com sincronização de ECG (se suspeita de dissecção)."
          ]
        }
      ],
      decision_flow: [
        {
          if: "Suspeita de Dissecção Aguda de Aorta (Stanford A ou B)",
          then: "1º PASSO OBRIGATÓRIO: Betabloqueador venoso ANTES do vasodilatador (Esmolol em BIC ou Metoprolol 5 mg IV lento a cada 5 min até 15 mg) para reduzir o dP/dt (estresse de cisalhamento na parede aórtica) até FC < 60 bpm. 2º PASSO: Associar Nitroprussiato de Sódio IV (0,25 a 10 mcg/kg/min) para manter PAS 100–120 mmHg + Morfina IV para controle da dor + Cirurgia imediata se Stanford A (aorta ascendente)."
        },
        {
          if: "Encefalopatia Hipertensiva ou Hipertensão Maligna",
          then: "Iniciar Nitroprussiato de Sódio em BIC (0,25 a 10 mcg/kg/min) titulado para reduzir a PAM em 20% na 1ª hora."
        },
        {
          if: "Elevação pressórica assintomática ou com dor/ansiedade sem lesão de órgão-alvo (Urgência / Pseudocrise)",
          then: "NÃO usar medicação endovenosa nem nifedipino sublingual! Tratar dor/ansiedade, repouso, reintroduzir anti-hipertensivos de uso crônico ou ajustar via oral (Captopril 25 mg VO ou Anlodipino 5–10 mg VO) com reavaliação ambulatorial em 24–72h."
        }
      ],
      treatment: [
        {
          title: "Preparo e Diluição dos Vasodilatadores Parenterais",
          regimen: "Nitroprussiato (Nipride) vs. Nitroglicerina (Tridil)",
          items: [
            "Nitroprussiato de Sódio (Nipride — 1 ampola = 50 mg/2 mL): Diluir 1 ampola (50 mg) em 248 mL de SG 5% (concentração = 200 mcg/mL; proteger equipo da luz). Dose: 0,25 a 10 mcg/kg/min (iniciar a 5–10 mL/h e titular a cada 3–5 min).",
            "Nitroglicerina (Tridil — 1 ampola = 50 mg/10 mL): Diluir 1 ampola (50 mg) em 240 mL de SG 5% ou SF 0,9% em frasco de vidro/polietileno (concentração = 200 mcg/mL). Dose: 5 a 200 mcg/min (iniciar a 3–5 mL/h). Preferir em SCA e Edema Agudo de Pulmão.",
            "Metoprolol IV (Seloken — 1 ampola = 5 mg/5 mL): Administrar 5 mg IV lento (1 mg/min), podendo repetir a cada 5 minutos até 3 ampolas (15 mg)."
          ]
        }
      ],
      linked_drug_terms: ["Nitroprussiato de Sódio", "Nitroglicerina", "Metoprolol", "Furosemida", "Morfina"],
      red_flags: [
        "ERRO CRÍTICO NA DISSECÇÃO DE AORTA: Iniciar Nitroprussiato de Sódio isoladamente sem betabloqueio prévio causa taquicardia reflexa e aumenta a força de ejeção ventricular (dP/dt), propagando a dissecção e o risco de ruptura aórtica!",
        "Nifedipino sublingual de ação rápida é proscrito pelo risco de queda pressórica imprevisível, IAM e AVC isquêmico."
      ],
      source_refs: [
        { label: "Diretrizes Brasileiras de Hipertensão Arterial - SBC", url: "https://abccardiol.org/" }
      ]
    },
    {
      id: "seed-eap",
      slug: "edema-agudo-de-pulmao-ic-descompensada",
      title: "Edema Agudo de Pulmão (EAP) e Insuficiência Cardíaca Descompensada",
      category: "Cardiologia",
      setting: "Emergência / Sala Vermelha / UTI",
      status: "verified",
      linked_recipe_slugs: ["prescricao-edema-agudo-pulmao"],
      summary: "Abordagem imediata do Edema Agudo de Pulmão Cardiogênico (VNI precoce, Nitratos, Furosemida) e manejo guiado pelos Perfis Hemodinâmicos de Nohria-Stevenson (A, B, C e L).",
      suspicion: [
        {
          title: "Quadro Clínico e Classificação Hemodinâmica (Quente/Frio vs. Seco/Úmido)",
          items: [
            "Início súbito de dispneia grave, ortopneia dramática, taquipneia (> 30 irpm), esforço respiratório, estertores crepitantes difusos em maré montante, expectoração rósea espumosa e linhas B difusas bilaterais no POCUS pulmonar.",
            "PERFIL B (Quente e Úmido — mais comum, ~70%): Congestão pulmonar/sistêmica COM boa perfusão periférica (frequentemente hipertenso).",
            "PERFIL C (Frio e Úmido — grave): Congestão pulmonar/sistêmica ASSOCIADA a hipoperfusão periférica (extremidades frias, livedo, oligúria, confusão, lactato elevado, pulso fino).",
            "PERFIL L (Frio e Seco): Hipoperfusão sem congestão pulmonar."
          ]
        }
      ],
      initial_actions: [
        {
          title: "Pacote dos Primeiros 15 Minutos no EAP Hipertensivo/Normotenso",
          items: [
            "1. Posicionar o paciente sentado com as pernas pendentes para fora do leito (reduz retorno venoso pré-carga).",
            "2. VENTILAÇÃO NÃO INVASIVA (VNI - CPAP 5–10 cmH2O ou BiPAP) IMEDIATA: intervenção nível IA que reduz trabalho respiratório, pré-carga, pós-carga do VE, taxa de intubação e mortalidade!",
            "3. VASODILATADOR VENOSO PRECOCE (principal droga no EAP hipertensivo!): Nitroglicerina IV (Tridil 10–200 mcg/min) ou Nitroprussiato de Sódio IV (0,3–5 mcg/kg/min). Enquanto prepara a bomba, pode-se administrar Dinitrato de Isossorbida 5 mg sublingual.",
            "4. DIURÉTICO DE ALÇA IV: Furosemida 0,5 a 1 mg/kg IV em bolus (se já usa furosemida domiciliar, fazer 1 a 2x a dose diária oral habitual em bolus IV; ex.: 40 a 80 mg IV)."
          ]
        }
      ],
      exams: [
        {
          title: "Investigação de Fatores Descompensantes (CHAMPS)",
          items: [
            "ECG de 12 derivações e Troponina na chegada (afastar Síndrome Coronariana Aguda como causa do EAP!).",
            "Ultrassonografia POCUS pulmonar e cardíaca, Radiografia de tórax, Gasometria arterial com lactato, BNP/NT-proBNP, creatinina, ureia, sódio, potássio, magnésio e hemograma.",
            "Lembrar mnemônico CHAMPS: Coronária (IAM), Hipertensão, Arritmia (FA aguda), Mecânica (valvopatia aguda), Pulmonar (TEP/Infecção), Sistêmica (má adesão, AINEs, anemia, tireoide)."
          ]
        }
      ],
      decision_flow: [
        {
          if: "Perfil B (Quente e Úmido) com PAS > 110 mmHg",
          then: "VNI + Vasodilatador IV em dose titulável (Nitroglicerina ou Nitroprussiato) + Furosemida IV (avaliar débito urinário em 2h: meta > 100–150 mL/h; se insuficiente, dobrar a dose de furosemida)."
        },
        {
          if: "Perfil C (Frio e Úmido) com PAS >= 90 mmHg",
          then: "Iniciar Inotrópico: Dobutamina 2,5 a 20 mcg/kg/min IV (ou Milrinona / Levosimendana se em uso de betabloqueador crônico) + Furosemida IV após melhora da perfusão."
        },
        {
          if: "Perfil C em Choque Cardiogênico (PAS < 90 mmHg ou PAM < 65 mmHg)",
          then: "Associar Vasopressor (Noradrenalina 1ª escolha no choque cardiogênico) + Inotrópico (Dobutamina) e considerar suporte circulatório mecânico / cineangiocoronariografia."
        }
      ],
      treatment: [
        {
          title: "Manejo de Medicações de Uso Crônico na Internação",
          regimen: "Regras sobre Betabloqueador, IECA e Morfina",
          items: [
            "Betabloqueador de uso prévio (Carvedilol, Bisoprolol, Succinato de Metoprolol): NÃO suspender no Perfil B (manter ou reduzir dose pela metade); suspender temporariamente APENAS se choque cardiogênico (Perfil C grave com uso de inotrópico), bradicardia sintomática ou BAV avançado.",
            "Morfina IV: NÃO deve ser usada de rotina no EAP (estudos mostram aumento da necessidade de ventilação mecânica, internação em UTI e mortalidade); reservar 2–3 mg IV apenas para agitação/ansiedade extrema refratária."
          ]
        }
      ],
      linked_drug_terms: ["Furosemida", "Nitroglicerina", "Nitroprussiato de Sódio", "Dobutamina", "Noradrenalina"],
      red_flags: [
        "Rebaixamento do nível de consciência (Glasgow <= 8), vômitos incoercíveis ou falha da VNI após 30–60 min com hipoxemia/acidose progressiva -> Intubação Orotraqueal imediata.",
        "Monitorar rigorosamente o Potássio e Magnésio séricos a cada 6–12h durante diureticoterapia intensiva para prevenir arritmias ventriculares."
      ],
      source_refs: [
        { label: "Diretriz Brasileira de Insuficiência Cardíaca Aguda e Crônica - SBC", url: "https://abccardiol.org/" },
        { label: "ESC Guidelines for the Diagnosis and Treatment of Acute and Chronic Heart Failure", url: "https://www.escardio.org/Guidelines" }
      ]
    },
    {
      id: "seed-fa-aguda",
      slug: "fibrilacao-atrial-alta-resposta-emergencia",
      title: "Fibrilação Atrial (FA) de Alta Resposta Ventricular na Emergência",
      category: "Cardiologia",
      setting: "Pronto-Socorro / Sala de Emergência",
      status: "verified",
      linked_recipe_slugs: ["prescricao-fa-aguda"],
      summary: "Algoritmo de decisão entre Cardioversão Elétrica Imediata (instabilidade), Controle de Frequência Cardíaca (< 110 bpm), Controle de Ritmo (regra das 48h / Eco TE) e Anticoagulação (CHA₂DS₂-VASc).",
      suspicion: [
        {
          title: "Diagnóstico Eletrocardiográfico e Avaliação de Estabilidade",
          items: [
            "ECG: ritmo irregularmente irregular (intervalos R-R variáveis), ausência de ondas P distintas (substituídas por ondas fibrilatórias 'f') e QRS estreito (< 120 ms), salvo bloqueio de ramo prévio ou condução aberrante.",
            "CRITÉRIOS DE INSTABILIDADE HEMODINÂMICA (5 Ds): Dor torácica isquêmica anginosa, Dispneia/Edema Agudo de Pulmão, Diminuição da consciência (síncope/confusão), Diminuição da PA (choque/hipotensão sintomática) ou Descompensação aguda de IC."
          ]
        }
      ],
      initial_actions: [
        {
          title: "Conduta Imediata Conforme Estabilidade",
          items: [
            "1. SE INSTÁVEL: Cardioversão Elétrica Sincronizada (CVE) imediata (120 a 200 J bifásico) após sedoanalgesia (ex.: Fentanil + Etomidato ou Propofol) + Heparinização plena concomitante!",
            "2. SE ESTÁVEL: Investigar se a FA é SECUNDÁRIA a uma causa aguda reversível (sepse, pneumonia, TEP, tireotoxicose, hipocalemia/hipomagnesemia, abstinência alcoólica, pós-operatório) — nesses casos, a prioridade é tratar a causa de base e controlar a FC (não cardioverter!).",
            "3. Iniciar Controle da Frequência Cardíaca (meta inicial: FC de repouso < 110 bpm)."
          ]
        }
      ],
      exams: [
        {
          title: "Propedêutica na Sala de Emergência",
          items: [
            "ECG de 12 derivações (procurar pré-excitação ventricular / onda delta da síndrome de Wolff-Parkinson-White!).",
            "Potássio, magnésio, cálcio, função renal, hemograma, TSH/T4 livre, troponina (se dor torácica) e radiografia de tórax.",
            "Ecocardiograma Transtorácico (avaliar FEVE e tamanho atrial) e Transesofágico (se planejar cardioversão em FA > 48h ou duração indeterminada)."
          ]
        }
      ],
      decision_flow: [
        {
          if: "Paciente Estável com FEVE preservada (>= 40%) — Controle de FC",
          then: "Betabloqueador IV: Metoprolol 5 mg IV lento em 2–5 min (repetir a cada 5 min até 15 mg) seguido de Metoprolol 25–100 mg VO 12/12h (ou Diltiazem/Verapamil IV)."
        },
        {
          if: "Paciente Estável com IC descompensada ou FEVE reduzida (< 40%) — Controle de FC",
          then: "EVITAR bloqueadores de canal de cálcio (Verapamil/Diltiazem) e cautela com betabloqueador IV se congesto! Usar Deslanosídeo (Cedilanide) 0,4 mg IV ou Digoxina 0,25 mg IV/VO OU Amiodarona 150–300 mg IV em 30–60 min (atenção: amiodarona pode reverter o ritmo para sinusal — cuidado se FA > 48h sem anticoagulação!)."
        },
        {
          if: "Reversão do Ritmo (Cardioversão Química ou Elétrica Eletiva no PS)",
          then: "SOMENTE se início comprovadamente < 48h (ou < 12–24h se alto risco embólico), OU após 3 semanas de anticoagulação plena efetiva, OU após Ecocardiograma Transesofágico sem trombo no apêndice atrial esquerdo. Opções químicas: Propafenona 600 mg VO dose única ('pill-in-the-pocket', APENAS em coração estruturalmente normal sem DAC/IC!) ou Amiodarona 5–7 mg/kg (300 mg) IV em 30–60 min seguida de 900 mg em 24h."
        }
      ],
      treatment: [
        {
          title: "Anticoagulação Pós-Cardioversão e Crônica",
          regimen: "DOACs (Apixabana, Rivaroxabana, Dabigatrana, Edoxabana) ou Varfarina",
          items: [
            "Após qualquer cardioversão (elétrica ou química): anticoagular por pelo menos 4 SEMANAS para todos os pacientes (devido ao atordoamento mecânico atrial pós-reversão), e manter indefinidamente se CHA2DS2-VASc >= 2 em homens ou >= 3 em mulheres.",
            "Apixabana: 5 mg VO 12/12h (reduzir para 2,5 mg 12/12h se >= 2 critérios: idade >= 80 anos, peso <= 60 kg ou creatinina >= 1,5 mg/dL).",
            "Rivaroxabana: 20 mg VO 1x/dia junto à principal refeição (15 mg/dia se ClCr 15–49 mL/min)."
          ]
        }
      ],
      linked_drug_terms: ["Metoprolol", "Amiodarona", "Rivaroxabana", "Enoxaparina"],
      red_flags: [
        "FA PRE-EXCITADA (Wolff-Parkinson-White — FA rápida irregular com QRS largo polimórfico e intervalos R-R curtíssimos < 250 ms): SÃO ESTRITAMENTE PROIBIDOS os bloqueadores do nó AV (Amiodarona, Metoprolol, Verapamil, Diltiazem, Digoxina e Adenosina), pois desviam todo o estímulo para a via acessória e precipitam Fibrilação Ventricular! Conduta: Cardioversão Elétrica Imediata (ou Procainamida/Ibutilida)."
      ],
      source_refs: [
        { label: "ESC Guidelines for the Management of Atrial Fibrillation 2024", url: "https://www.escardio.org/Guidelines" },
        { label: "Diretrizes Brasileiras de Fibrilação Atrial - SBC", url: "https://abccardiol.org/" }
      ]
    },
    {
      id: "seed-pancreatite",
      slug: "pancreatite-aguda-criterios-atlanta-hidratacao-manejo",
      title: "Pancreatite Aguda (Critérios de Atlanta, Hidratação e Analgesia)",
      category: "Gastroenterologia",
      setting: "Emergência / Enfermaria / UTI",
      status: "verified",
      summary: "Diagnóstico pelos Critérios de Atlanta Revisados, ressuscitação volêmica moderada com Ringer Lactato (estudo WATERFALL), analgesia multimodal, nutrição oral precoce e abordagem da etiologia biliar.",
      suspicion: [
        {
          title: "Critérios de Atlanta Revisados (Exige >= 2 de 3 critérios)",
          items: [
            "1. Dor abdominal típica: dor epigástrica aguda, intensa, persistente, frequentemente com irradiação em faixa/barra para o dorso.",
            "2. Amilase sérica e/ou Lipase sérica >= 3 vezes o limite superior da normalidade (a Lipase é mais sensível e específica e permanece elevada por mais tempo).",
            "3. Achados característicos de pancreatite aguda em exame de imagem (TC de abdome com contraste, RM ou USG)."
          ]
        }
      ],
      initial_actions: [
        {
          title: "Manejo nas Primeiras 24 Horas (Ressuscitação Moderada - WATERFALL)",
          items: [
            "1. HIDRATAÇÃO COM RINGER LACTATO (superior ao SF 0,9% por reduzir SIRS e hipercloremia): Ressuscitação MODERADA dirigida por metas (estudo WATERFALL NEJM 2022 mostrou que hidratação agressiva causa sobrecarga volêmica sem benefício): Bolus inicial de 10 mL/kg APENAS se hipovolemia, seguido de 1,5 mL/kg/h de Ringer Lactato, reavaliando em 12, 24, 48 e 72h.",
            "2. Metas de perfusão: Débito urinário >= 0,5 mL/kg/h, PAM >= 65 mmHg, queda progressiva do hematócrito (< 44%) e da ureia/BUN nas primeiras 24h.",
            "3. ANALGESIA POTENTE IMEDIATA: Dipirona 1 g IV 6/6h + Opioide IV titulado (Morfina 2–4 mg IV ou Fentanil / Tramadol — opioides NÃO pioram o prognóstico da pancreatite!) + Ondansetrona 4–8 mg IV 8/8h."
          ]
        }
      ],
      exams: [
        {
          title: "Exames de Admissão e Indicação Correta de TC",
          items: [
            "Lipase, amilase, hemograma (hematócrito > 44% indica hemoconcentração), ureia/BUN (> 20 mg/dL ou em elevação associa-se a mortalidade), creatinina, TGO, TGP, GGT, FA, bilirrubinas (ALT > 150 U/L tem VPP > 95% para etiologia biliar!), cálcio, triglicerídeos (> 1.000 mg/dL = hipertrigliceridêmica), PCR e gasometria arterial.",
            "Ultrassonografia de Abdome Superior na admissão paraTODOS os pacientes (pesquisar colelitíase e dilatação de vias biliares).",
            "TC de Abdome com contraste: NÃO solicitar de rotina nas primeiras 48–72 horas se o diagnóstico clínico-laboratorial já estiver fechado (a necrose pancreática leva 72–96h para se delimitar na TC)."
          ]
        }
      ],
      decision_flow: [
        {
          if: "Classificação de Gravidade de Atlanta (Leve vs. Moderadamente Grave vs. Grave)",
          then: "Leve: sem disfunção orgânica e sem complicações locais. Moderadamente Grave: disfunção orgânica transitória (< 48h) e/ou complicação local. Grave: disfunção orgânica PERSISTENTE (> 48h — escore de Marshall >= 2 cardiovascular, respiratório ou renal) -> Internação em UTI."
        },
        {
          if: "Pancreatite Aguda Biliar COM Colangite Aguda associada (Tríade de Charcot / Pêntade de Reynolds)",
          then: "Indicar CPRE (Colangiopancreatografia Retrógrada Endoscópica) de urgência em até 24 horas + Antibioticoterapia IV."
        },
        {
          if: "Pancreatite Aguda Biliar Leve recuperada",
          then: "Realizar Colecistectomia Videolaparoscópica na MESMA internação hospitalar antes da alta (previne recorrência de até 30% em poucas semanas!)."
        }
      ],
      treatment: [
        {
          title: "Nutrição Precoce e Uso Racional de Antibióticos",
          regimen: "Quebra de Paradigmas: Dieta Precoce e Não Usar ATB Profilático",
          items: [
            "Nutrição Oral Precoce: NÃO manter 'dieta zero' prolongada! Assim que a dor estiver em melhora e sem vômitos (geralmente nas primeiras 24–48h), iniciar dieta oral hipogordurosa/branda diretamente (reduz translocação bacteriana e tempo de internação). Se intolerância oral > 72–96h em casos graves: Nutrição Enteral por sonda (superior à parenteral!).",
            "Antibióticos Profiláticos NÃO são recomendados na pancreatite aguda (nem mesmo na pancreatite necrosante estéril!). Iniciar antibiótico (ex.: Meropenem ou Ciprofloxacino + Metronidazol) APENAS se houver necrose pancreática INFECTADA (gás no retroperitônio na TC ou deterioração séptica após 7–10 dias) ou infecção extrapancreática (colangite, pneumonia, ITU)."
          ]
        }
      ],
      linked_drug_terms: ["Dipirona", "Morfina", "Ondansetrona", "Meropenem"],
      red_flags: [
        "Critérios de alerta na admissão (BISAP >= 3): BUN > 25 mg/dL, Impaired mental status (Glasgow < 15), SIRS >= 2, Age > 60 anos, Pleural effusion (derrame pleural).",
        "Síndrome de Compartimento Abdominal por ressuscitação volêmica excessiva."
      ],
      source_refs: [
        { label: "ACG Guidelines: Management of Acute Pancreatitis 2024", url: "https://gi.org/" },
        { label: "Aggressive or Moderate Fluid Resuscitation in Acute Pancreatitis (WATERFALL Trial - NEJM 2022)", url: "https://www.nejm.org/doi/full/10.1056/NEJMoa2202884" }
      ]
    },
    {
      id: "seed-meningite",
      slug: "meningite-bacteriana-aguda-antibioticoterapia-dexametasona",
      title: "Meningite Bacteriana Aguda (Antibioticoterapia Empírica e Dexametasona)",
      category: "Infectologia",
      setting: "Emergência / Sala de Isolamento / UTI",
      status: "verified",
      linked_recipe_slugs: ["prescricao-meningite-bacteriana"],
      summary: "Emergência infectológica: isolamento de gotículas, indicações de TC de crânio antes da punção lombar, Dexametasona antes da 1ª dose de Ceftriaxona em dose meníngea e quimioprofilaxia de contactantes.",
      suspicion: [
        {
          title: "Apresentação Clínica e Sinais Meníngeos",
          items: [
            "Tríade clássica (presente completa em ~44% dos adultos): Febre alta + Rigidez de nuca + Alteração do estado mental (quase 95% dos pacientes têm pelo menos 2 dos 4: cefaleia intensa, febre, rigidez de nuca e alteração do sensório).",
            "Sinais de irritação meníngea: Rigidez de nuca, Sinal de Kernig e Sinal de Brudzinski.",
            "Atenção para petéquias ou sufusões hemorrágicas / púrpura fulminante (Meningococcemia por Neisseria meningitidis)."
          ]
        }
      ],
      initial_actions: [
        {
          title: "Conduta na 1ª Hora (NUNCA atrasar o antibiótico por causa da TC!)",
          items: [
            "1. Instituir Precaução por Gotículas imediatamente na suspeita de meningite meningocócica ou por H. influenzae (manter até completar 24 horas de antibioticoterapia eficaz).",
            "2. Coletar 2 pares de hemoculturas imediatamente.",
            "3. Avaliar se há indicação de TC de Crânio ANTES da Punção Lombar (PL): Imunossuprimidos graves (HIV/transplante), História de lesão do SNC (massa, AVC, infecção focal), Crise convulsiva de início recente (< 1 semana), Papiledema, Rebaixamento moderado a grave da consciência (Glasgow < 10–12) ou Déficit neurológico focal.",
            "4. SE NÃO HOUVER indicação de TC: realizar Punção Lombar imediata e iniciar Dexametasona + Antibiótico logo em seguida. SE HOUVER indicação de TC: coletar hemoculturas, administrar Dexametasona + 1ª dose de Antibiótico IMEDIATAMENTE e levar para a TC antes da punção lombar!"
          ]
        }
      ],
      exams: [
        {
          title: "Padrões Liquóricos Clássicos (Bacteriana vs. Viral vs. Tuberculosa/Fúngica)",
          items: [
            "Meningite Bacteriana: Líquor turvo/purulento, Pressão de abertura > 20 cmH2O, Leucócitos > 500–1.000/mm³ com predomínio de Neutrófilos (PMN > 80%), Proteínas elevadas (> 100–150 mg/dL), Glicose baixa (< 40 mg/dL ou relação glicorraquia/glicemia < 0,4) e Lactato liquórico >= 3,5–4,0 mmol/L.",
            "Meningite Viral: Líquor límpido, < 500 células com predomínio linfomononuclear, proteínas normais ou discretamente elevadas (< 100 mg/dL) e glicose normal.",
            "Meningite Tuberculosa / Fúngica: Predomínio linfomononuclear + Proteínas elevadas + Glicose BAIXA (solicitar ADA, BAAR/GeneXpert, Tinta da China e antígeno criptocócico CrAg)."
          ]
        }
      ],
      decision_flow: [
        {
          if: "Adulto imunocompetente de 18 a 50 anos (Pneumococo e Meningococo)",
          then: "Ceftriaxona 2 g IV de 12/12h (4 g/dia — DOSE DOBRADA MENÍNGEA!) + Dexametasona (associar Vancomicina 15–20 mg/kg IV 8/8h ou 12/12h em locais com prevalência de Pneumococo resistente às cefalosporinas)."
        },
        {
          if: "Adulto > 50 anos, Gestante, Etilista crônico ou Imunossuprimido (risco de Listeria monocytogenes)",
          then: "Ceftriaxona 2 g IV 12/12h + AMPICILINA 2 g IV de 4/4h (12 g/dia para cobrir Listeria, que é intrinsecamente resistente às cefalosporinas!)."
        },
        {
          if: "Pós-neurocirurgia, DVP/DVE ou TCE penetrante (Staphylococcus e Pseudomonas)",
          then: "Vancomicina (ataque 25–30 mg/kg + 15–20 mg/kg 8/8h–12/12h) + Cefepima 2 g IV 8/8h OU Meropenem 2 g IV de 8/8h."
        }
      ],
      treatment: [
        {
          title: "Corticoterapia Adjuvante e Quimioprofilaxia de Contactantes",
          regimen: "Dexametasona Precoce e Rifampicina / Ciprofloxacino",
          items: [
            "Dexametasona IV: 0,15 mg/kg IV de 6/6h (adulto 70 kg = 10 mg IV 6/6h) por 4 dias — administrar 15 a 20 minutos ANTES ou junto com a 1ª dose do antibiótico (reduz perda auditiva e mortalidade na meningite pneumocócica; não iniciar se o paciente já estiver em uso de antibiótico há > 12h).",
            "Quimioprofilaxia para Meningococo (contactantes íntimos domiciliares ou profissionais expostos a secreções respiratórias desprotegidos na IOT/aspiração): Rifampicina 600 mg VO 12/12h por 2 dias (4 doses no total) OU Ciprofloxacino 500 mg VO dose única (adultos) OU Ceftriaxona 250 mg IM dose única (1ª escolha em gestantes)."
          ]
        }
      ],
      linked_drug_terms: ["Ceftriaxona", "Vancomicina", "Meropenem"],
      notification: {
        text: "Notificação Compulsória Imediata (< 24h) à Vigilância Epidemiológica para bloqueio vacinal e quimioprofilaxia de contactantes."
      },
      red_flags: [
        "ATENÇÃO À DOSE: A dose de Ceftriaxona para meningite bacteriana em adultos é de 2 g IV a cada 12 horas (4 g/dia), e NÃO 2 g 1x/dia!",
        "Se associar Aciclovir IV empírico (10 mg/kg IV 8/8h) por suspeita de meningoencefalite herpética (confusão, afasia, crises focais, alteração temporal): manter hidratação venosa vigorosa para evitar nefropatia cristalúrica pelo aciclovir."
      ],
      source_refs: [
        { label: "IDSA Practice Guidelines for the Management of Bacterial Meningitis", url: "https://www.idsociety.org/" },
        { label: "Ministério da Saúde - Guia de Vigilância em Saúde (Meningites)", url: "https://www.gov.br/saude/" }
      ]
    },
    {
      id: "seed-pac",
      slug: "pneumonia-adquirida-na-comunidade-pac",
      title: "Pneumonia Adquirida na Comunidade (PAC — Ambulatório, Enfermaria e UTI)",
      category: "Pneumologia",
      setting: "Ambulatório / Pronto-Socorro / Enfermaria / UTI",
      status: "verified",
      linked_recipe_slugs: ["prescricao-pac-ambulatorial", "prescricao-pac-hospitalar"],
      summary: "Estratificação por CURB-65/CRB-65 e critérios IDSA/ATS de PAC grave, escolha antimicrobiana empírica racional (hígidos vs. comorbidades vs. internados), indicação de corticoide na PAC grave e duração curta de 5 a 7 dias.",
      suspicion: [
        {
          title: "Quadro Clínico e Estratificação de Local de Tratamento (CURB-65)",
          items: [
            "Tosse aguda com expectoração purulenta, febre (> 37,8°C) ou hipotermia, dor torácica ventilatório-dependente, dispneia, taquipneia e síndrome de consolidação pulmonar (estertores crepitantes, sopro tubário, macicez) + infiltrado novo à radiografia/ultrassom de tórax.",
            "Escore CURB-65 (1 ponto cada): Confusão mental aguda | Ureia > 50 mg/dL (BUN > 19) | Frequência Respiratória >= 30 irpm | PAS < 90 ou PAD <= 60 mmHg | Idade >= 65 anos.",
            "Decisão pelo CURB-65: 0 a 1 ponto = Tratamento Ambulatorial | 2 pontos = Considerar Internação em Enfermaria (ou observação curta) | >= 3 pontos = Internação Hospitalar (avaliar UTI se 4–5 pontos ou critérios maiores de gravidade: Choque Séptico com vasopressor ou Insuficiência Respiratória com Ventilação Mecânica Invasiva)."
          ]
        }
      ],
      initial_actions: [
        {
          title: "Medidas nas Primeiras 4 Horas",
          items: [
            "1. Oximetria de pulso em todo paciente (suplementar O2 se SpO2 < 92%, ou meta 88–92% se DPOC retentor crônico de CO2).",
            "2. Radiografia de tórax PA e perfil (ou POCUS pulmonar à beira-leito buscando hepatização, broncograma aéreo dinâmico e derrame pleural).",
            "3. Nos pacientes internados: coletar hemograma, ureia, creatinina, sódio, potássio, PCR, gasometria/lactato (se sepse) e iniciar a 1ª dose do antibiótico no próprio Pronto-Socorro!"
          ]
        }
      ],
      exams: [
        {
          title: "Investigação Microbiológica (Quando Coletar Culturas?)",
          items: [
            "PAC Ambulatorial: NÃO solicitar hemoculturas nem cultura de escarro de rotina.",
            "PAC Internada Grave (UTI), derrame pleural parapneumônico, cavitação ou risco de MRSA/Pseudomonas: coletar 2 pares de hemoculturas + cultura/Gram de escarro + antígenos urinários para Pneumococo e Legionella (se disponíveis) + painel viral (Influenza / SARS-CoV-2).",
            "TODO derrame pleural parapneumônico com >= 1 cm no decúbito lateral (ou >= 2–3 cm na USG/TC) DEVE ser submetido à Toracocentese Diagnóstica imediata (se pus franco, pH < 7,20, glicose < 40–60 mg/dL ou LDH > 1.000 UI/L = Empiema / Derrame Complicado -> Drenagem Torácica Fechada imediata!)."
          ]
        }
      ],
      decision_flow: [
        {
          if: "PAC Ambulatorial — Paciente Hígido (sem comorbidades e sem uso de ATB nos últimos 90 dias)",
          then: "Amoxicilina 1 g VO de 8/8h (ou 500 mg 8/8h) por 5 a 7 dias OU Amoxicilina + Clavulanato 875/125 mg VO 12/12h por 5–7 dias OU Azitromicina 500 mg VO 1x/dia por 3 a 5 dias (ou Doxiciclina 100 mg VO 12/12h)."
        },
        {
          if: "PAC Ambulatorial — Paciente COM Comorbidades (DPOC, IC, DM, DRC, Hepatopatia, Neoplasia, Etilismo ou ATB recente)",
          then: "Terapia Combinada: Amoxicilina + Clavulanato 875/125 mg VO de 12/12h + Azitromicina 500 mg VO 1x/dia (ou Claritromicina 500 mg 12/12h) por 5 a 7 dias; OU Monoterapia com Quinolona Respiratória: Levofloxacino 750 mg VO 1x/dia por 5 dias (ou Moxifloxacino 400 mg VO 1x/dia)."
        },
        {
          if: "PAC Internada em Enfermaria (CURB-65 >= 2, sem critérios de UTI)",
          then: "Ceftriaxona 1 a 2 g IV a cada 24h (ou Ampicilina+Sulbactam 3 g IV 6/6h) + Azitromicina 500 mg VO/IV 1x/dia (ou Claritromicina 500 mg 12/12h) por 5 a 7 dias; OU Levofloxacino 750 mg IV/VO 1x/dia em monoterapia."
        },
        {
          if: "PAC Grave em UTI (Choque Séptico, VM ou >= 3 critérios menores IDSA/ATS)",
          then: "OBRIGATÓRIA Terapia Combinada: Ceftriaxona 2 g IV 24/24h + Azitromicina 500 mg IV 24/24h (ou Ceftriaxona + Levofloxacino 750 mg IV 24/24h — NUNCA usar quinolona isolada em PAC de UTI!). Associar Hidrocortisona 200 mg/dia IV em infusão contínua por 4–7 dias na PAC grave hipoxêmica/séptica (Estudo CAPE COD reduziu mortalidade!). Se risco de Pseudomonas (bronquiectasias/isolamento prévio): trocar Ceftriaxona por Piperacilina-Tazobactam 4,5 g IV 6/6h ou Cefepima 2 g IV 8/8h."
        }
      ],
      treatment: [
        {
          title: "Transição Sequencial para Via Oral (Switch Therapy) e Critérios de Alta",
          regimen: "5 a 7 Dias Totais na PAC Não Complicada",
          items: [
            "Critérios para transição IV -> VO e alta: afebril há >= 24–48h, FC < 100 bpm, FR < 24 irpm, PAS >= 90 mmHg, SpO2 >= 90–92% em ar ambiente e aceitação plena da via oral.",
            "Não repetir radiografia de tórax antes da alta se o paciente estiver evoluindo com melhora clínica (a consolidação radiológica demora 4 a 6 semanas para desaparecer!)."
          ]
        }
      ],
      linked_drug_terms: ["Amoxicilina + Clavulanato", "Azitromicina", "Ceftriaxona", "Levofloxacino", "Piperacilina + Tazobactam", "Hidrocortisona"],
      red_flags: [
        "JAMAIS prescrever Ciprofloxacino para Pneumonia Adquirida na Comunidade (não tem ação contra Pneumococo!).",
        "Pacientes com febre persistente após 72h de antibiótico adequado: investigar Derrame Pleural Complicado / Empiema (fazer USG/TC de tórax!) ou Tuberculose Pulmonar."
      ],
      source_refs: [
        { label: "ATS/IDSA Clinical Practice Guideline: Diagnosis and Treatment of Adults with Community-acquired Pneumonia", url: "https://www.thoracic.org/" },
        { label: "Sociedade Brasileira de Pneumologia e Tisiologia (SBPT) - Diretrizes de PAC", url: "https://sbpt.org.br/" }
      ]
    },
    {
      id: "seed-dpoc",
      slug: "exacerbacao-aguda-de-dpoc-gold",
      title: "Exacerbação Aguda de DPOC (GOLD 2024)",
      category: "Pneumologia",
      setting: "Pronto-Socorro / Enfermaria / UTI",
      status: "verified",
      linked_recipe_slugs: ["prescricao-dpoc-exacerbado"],
      summary: "Oxigenoterapia controlada (alvo SpO2 88–92%), broncodilatação dupla (SABA + SAMA), corticoterapia sistêmica curta (5 dias), indicação precisa de antibiótico (Critérios de Anthonisen / escarro purulento) e Ventilação Não Invasiva (VNI/BiPAP) precoce na acidose respiratória.",
      suspicion: [
        {
          title: "Tríade Cardinal de Anthonisen e Gravidade da Exacerbação",
          items: [
            "Piora aguda (< 14 dias) caracterizada por: 1) Aumento da dispneia; 2) Aumento do volume do escarro; 3) Mudança da cor do escarro para PURULENTO.",
            "Sempre investigar diagnósticos diferenciais ou gatilhos na chegada: Pneumonia, Tromboembolismo Pulmonar (TEP), Pneumotórax Espontâneo Secundário, Insuficiência Cardíaca / EAP e Arritmias (FA)."
          ]
        }
      ],
      initial_actions: [
        {
          title: "Pilares Imediatos na Sala de Emergência",
          items: [
            "1. OXIGENOTERAPIA TITULADA ESTRITA: Manter SpO2 entre 88% e 92% (usar cateter nasal a 1–3 L/min ou máscara de Venturi 24–28%). EVITAR HIPERÓXIA (SpO2 > 95% piora a relação V/Q, o efeito Haldane e induz narcose hipercápnica / parada respiratória!).",
            "2. BRONCODILATAÇÃO DUPLA DE CURTA AÇÃO: Salbutamol 4 a 8 jatos (ou 10–20 gotas) + Brometo de Ipratrópio 4 a 8 jatos (ou 40 gotas = 0,5 mg) a cada 20 min na 1ª hora, depois de 4/4h (se nebulizar, usar AR COMPRIMIDO e não O2 puro a alto fluxo!).",
            "3. CORTICOIDE SISTÊMICO POR 5 DIAS: Prednisona 40 mg VO 1x ao dia por 5 dias (estudo REDUCE mostrou que 5 dias equivalem a 14 dias!) ou Metilprednisolona 40 mg IV / Hidrocortisona 200 mg IV se intolerância oral."
          ]
        }
      ],
      exams: [
        {
          title: "Gasometria Arterial e Exames Complementares",
          items: [
            "Gasometria arterial obrigatória nas exacerbações moderadas/graves: avaliar pH (< 7,35 define acidose respiratória aguda/agudizada!) e PaCO2 (> 45 mmHg).",
            "Radiografia de tórax (afastar pneumonia e pneumotórax), ECG, hemograma, eletrólitos e PCR."
          ]
        }
      ],
      decision_flow: [
        {
          if: "Presença de Escarro Purulento + (aumento da dispneia e/ou volume do escarro) OU necessidade de VNI / Ventilação Mecânica",
          then: "Indicar ANTIBIÓTICO por 5 a 7 dias: Amoxicilina + Clavulanato 875/125 mg VO 12/12h (ou Ceftriaxona 1–2 g IV 24/24h se internado) ou Azitromicina 500 mg/dia. Se risco de Pseudomonas (FEV1 < 30%, bronquiectasias, >= 4 cursos de ATB/ano ou isolamento prévio): Ciprofloxacino 500–750 mg VO 12/12h ou Piperacilina-Tazobactam 4,5 g IV 6/6h."
        },
        {
          if: "Acidose Respiratória Aguda (pH <= 7,35 e PaCO2 > 45 mmHg) ou dispneia grave com uso de musculatura acessória",
          then: "INSTALAR VENTILAÇÃO NÃO INVASIVA (VNI — BiPAP!) IMEDIATAMENTE (padrão-ouro Nível A: reduz intubação e mortalidade em > 50%!). Ajustes iniciais do BiPAP: IPAP 12 a 16 cmH2O (titular até 20 cmH2O para volume corrente de 6–8 mL/kg) e EPAP 4 a 6 cmH2O, com FiO2 mínima para SpO2 88–92%. Reavaliar gasometria em 1 a 2 horas!"
        },
        {
          if: "Falha da VNI após 1–2h (piora do pH/PaCO2), rebaixamento grave (torpor/coma), parada respiratória ou instabilidade hemodinâmica grave",
          then: "Proceder à Intubação Orotraqueal e Ventilação Mecânica Invasiva (FR baixa 10–14 irpm, relação I:E 1:3 a 1:4 para evitar Auto-PEEP, meta de pH > 7,25–7,30 e não normalizar a PaCO2 abruptamente para evitar alcalose pós-hipercapnia!)."
        }
      ],
      treatment: [
        {
          title: "Otimização de Alta Hospitalar",
          regimen: "Manutenção Inalatória LAMA + LABA (± ICS se eosinófilos >= 300/mm³)",
          items: [
            "Reiniciar ou iniciar broncodilatador de longa duração (LAMA + LABA: ex. Tiotrópio + Olodaterol ou Umeclidínio + Vilanterol) ainda antes da alta hospitalar.",
            "Cessação do tabagismo, vacinação antipneumocócica/influenza e encaminhamento para reabilitação pulmonar."
          ]
        }
      ],
      linked_drug_terms: ["Salbutamol", "Brometo de Ipratrópio", "Hidrocortisona", "Amoxicilina + Clavulanato", "Azitromicina", "Ceftriaxona"],
      red_flags: [
        "NUNCA colocar máscara não reinalante a 15 L/min sem critério em DPOC retentor crônico com SpO2 já > 92% (a hiperóxia induz retenção aguda de CO2 e coma hipercápnico!).",
        "Metilxantinas (Aminofilina/Teofilina IV) NÃO são recomendadas pelo GOLD devido à toxicidade arrítmica e ausência de benefício clínico."
      ],
      source_refs: [
        { label: "Global Initiative for Chronic Obstructive Lung Disease (GOLD) Report 2024", url: "https://goldcopd.org/" }
      ]
    },
    {
      id: "seed-itu",
      slug: "infeccao-do-trato-urinario-cistite-e-pielonefrite",
      title: "Infecção do Trato Urinário (Cistite, Pielonefrite Aguda e ITU na Gestante)",
      category: "Nefrologia e Urologia",
      setting: "Ambulatório / Pronto-Socorro / Enfermaria",
      status: "verified",
      linked_recipe_slugs: ["prescricao-cistite-aguda", "prescricao-pielonefrite-aguda"],
      summary: "Diferenciação entre ITU baixa (cistite) e ITU alta (pielonefrite), antibioticoterapia de 1ª linha atualizada (Fosfomicina/Nitrofurantoína vs. Ciprofloxacino/Ceftriaxona), rastreio de obstrução ureteral (pionefrose) e manejo na gestante.",
      suspicion: [
        {
          title: "Classificação Anatômica e Clínica",
          items: [
            "Cistite Aguda (ITU Baixa): Disúria, polaciúria, urgência miccional, dor suprapúbica e hematúria macroscópica, SEM febre e SEM dor lombar.",
            "Pielonefrite Aguda (ITU Alta / Sistêmica): Febre (>= 38°C), calafrios, dor lombar unilateral ou bilateral, Sinal de Giordano positivo, náuseas e vômitos (com ou sem sintomas baixos de disúria).",
            "ITU Complicada: Homens, gestantes, obstrução urinária (cálculo/HPB), cateter vesical de demora, bexiga neurogênica, imunossuprimidos, transplante renal ou DRC avançada."
          ]
        }
      ],
      initial_actions: [
        {
          title: "Quando Solicitar Exames e Imagem?",
          items: [
            "1. Cistite Aguda Não Complicada em mulher jovem: o diagnóstico é CLÍNICO! Não é obrigatório solicitar EAS nem urocultura para iniciar o tratamento empírico.",
            "2. Pielonefrite Aguda, ITU em Gestantes, Homens, Falha Terapêutica ou Sepse Urinária: OBRIGATÓRIO coletar EAS (Urina tipo 1) + UROCULTURA com antibiograma ANTES da 1ª dose do antibiótico!",
            "3. Quando solicitar Ultrassonografia ou TC de Vias Urinárias de URGÊNCIA na Pielonefrite? Se houver história de cálculo renal / cólica nefrítica associada, choque séptico, piora aguda da função renal ou persistência da febre após 48–72h de antibiótico adequado (para descartar Pionefrose / Obstrução Ureteral Infectada!)."
          ]
        }
      ],
      exams: [
        {
          title: "Interpretação do EAS e Bacteriúria Assintomática",
          items: [
            "No EAS: Esterase leucocitária positiva (> 10 leucócitos/campo) + Nitrito positivo (específico para enterobactérias redutoras de nitrato, como E. coli, Klebsiella e Proteus; Enterococcus e S. saprophyticus NÃO convertem nitrato em nitrito!).",
            "BACTERIÚRIA ASSINTOMÁTICA (Urocultura >= 10^5 UFC/mL sem nenhum sintoma urinário): Tratar EXCLUSIVAMENTE em 2 populações: 1) GESTANTES (reduz pielonefrite e parto prematuro); 2) Pacientes que serão submetidos a PROCEDIMENTO UROLÓGICO INVASIVO com sangramento de mucosa (ex.: RTU de próstata, ureteroscopia). NÃO tratar bacteriúria assintomática em idosos, diabéticos ou sondados crônicos!"
          ]
        }
      ],
      decision_flow: [
        {
          if: "Cistite Aguda Não Complicada (Mulher não gestante, sem febre/Giordano)",
          then: "1ª Escolha: Fosfomicina Trometamol 3 g (1 envelope dissolvido em água) VO em DOSE ÚNICA (ao deitar, após esvaziar a bexiga) OU Nitrofurantoína 100 mg VO de 6/6h por 5 dias (se ClCr >= 30 mL/min). Alternativa: Cefuroxima 250 mg 12/12h por 5 dias. (POUPAR Quinolonas na cistite simples!)."
        },
        {
          if: "Cistite ou Bacteriúria Assintomática na GESTANTE",
          then: "Fosfomicina 3 g VO em dose única OU Nitrofurantoína 100 mg VO de 6/6h por 7 dias (evitar a termo >= 38 semanas e G6PD) OU Cefalexina 500 mg VO de 6/6h por 7 dias OU Amoxicilina-Clavulanato 875/125 mg VO 12/12h por 7 dias. Solicitar urocultura de controle de cura 7 dias após o término!"
        },
        {
          if: "Pielonefrite Aguda Não Complicada (Estável, aceitando via oral, sem obstrução)",
          then: "Fazer 1ª dose de Ceftriaxona 1 g IV/IM no Pronto-Socorro + alta com Ciprofloxacino 500 mg VO de 12/12h por 7 dias OU Levofloxacino 750 mg VO 1x/dia por 5 dias (ou Ceftriaxona 1 g IV/IM/dia se resistência local a quinolonas > 10%)."
        },
        {
          if: "Pielonefrite Complicada, Gestante com Pielonefrite, Vômitos Incoercíveis ou Sepse Urinária",
          then: "Internação Hospitalar: Ceftriaxona 1 a 2 g IV a cada 24h (ou Piperacilina-Tazobactam 4,5 g IV 6/6h / Meropenem 1 g IV 8/8h se choque séptico ou risco de ESBL/Pseudomonas) por 7 a 14 dias."
        }
      ],
      treatment: [
        {
          title: "Manejo da Pionefrose (ITU Obstrutiva por Cálculo)",
          regimen: "Desobstrução Urológica de Emergência + Antibiótico Venoso",
          items: [
            "Cálculo ureteral obstrutivo associado a febre, leucocitose ou piúria configura EMERGÊNCIA UROLÓGICA (Pionefrose): o antibiótico não penetra na pelve renal obstruída! Acionar Urologia imediatamente para implante de Cateter Duplo J ou Nefrostomia Percutânea."
          ]
        }
      ],
      linked_drug_terms: ["Nitrofurantoína", "Ciprofloxacino", "Levofloxacino", "Ceftriaxona", "Piperacilina + Tazobactam", "Meropenem"],
      red_flags: [
        "JAMAIS prescrever Nitrofurantoína ou Fosfomicina para Pielonefrite Aguda ou Sepse Urinária (não atingem concentração no parênquima renal nem na corrente sanguínea!).",
        "TODA gestante com Pielonefrite Aguda deve ser INTERNADA para antibioticoterapia endovenosa inicial (alto risco de choque séptico, SARA materna e trabalho de parto prematuro)."
      ],
      source_refs: [
        { label: "European Association of Urology (EAU) Guidelines on Urological Infections 2024", url: "https://uroweb.org/" },
        { label: "IDSA Clinical Practice Guideline for Acute Uncomplicated Cystitis and Pyelonephritis", url: "https://www.idsociety.org/" }
      ]
    },
    {
      id: "seed-pele",
      slug: "infeccoes-de-pele-e-partes-moles-erisipela-celulite-fasciite",
      title: "Infecções de Pele e Partes Moles (Erisipela, Celulite, Abscesso e Fasciíte Necrosante)",
      category: "Infectologia",
      setting: "Ambulatório / Pronto-Socorro / Centro Cirúrgico",
      status: "verified",
      summary: "Diferenciação entre infecções não-purulentas (Erisipela/Celulite estreptocócica) e purulentas (Abscesso/Furúnculo estafilocócico), indicação de drenagem e reconhecimento imediato da Fasciíte Necrosante (Gangrena de Fournier).",
      suspicion: [
        {
          title: "Diferenciação Clínica (Não-Purulenta vs. Purulenta vs. Necrosante)",
          items: [
            "Erisipela (Derme superficial + linfáticos): Placa eritematosa vivo-brilhante, quente, dolorosa, com BORDAS BEM DELIMITADAS e elevadas, frequentemente com febre alta, calafrios e porta de entrada (tinea pedis interdigital). Agente principal: Streptococcus pyogenes (Grupo A).",
            "Celulite (Derme profunda + subcutâneo): Eritema, edema e calor com BORDAS MAL DELIMITADAS/DIFUSAS. Agentes: Streptococcus beta-hemolíticos e Staphylococcus aureus (MSSA).",
            "Abscesso Cutâneo / Furúnculo / Carbúnculo (Purulenta): Nódulo eritematoso doloroso com FLUTUAÇÃO central ou drenagem de pus. Agente principal: Staphylococcus aureus (MSSA e CA-MRSA).",
            "Fasciíte Necrosante / Gangrena de Fournier (Emergência Cirúrgica!): Dor DESPROPORCIONAL aos achados cutâneos iniciais, evolução fulminante em horas, edema tenso além da área de eritema, bolhas violáceas/hemorrágicas, anestesia cutânea, crepitação subcutânea e sepse/choque séptico."
          ]
        }
      ],
      initial_actions: [
        {
          title: "Condutas Gerais Essenciais",
          items: [
            "1. Demarcar as bordas do eritema com caneta cirúrgica na admissão (e datar/horar) para monitorar progressão ou regressão objetiva!",
            "2. Elevar o membro afetado (reduz edema gravitacional e acelera a resolução clínica) e tratar a porta de entrada (ex.: antifúngico tópico para Tinea pedis / intertrigo interdigital).",
            "3. Em todo Abscesso com flutuação: realizar INCISÃO E DRENAGEM cirúrgica (o antibiótico isolado falha sem drenagem do pus!)."
          ]
        }
      ],
      exams: [
        {
          title: "Exames e Escore LRINEC",
          items: [
            "Erisipela/Celulite leve: não requer exames laboratoriais nem hemoculturas de rotina.",
            "Suspeita de Fasciíte Necrosante: Hemograma, PCR, Sódio (< 135 mEq/L é muito sugestivo!), Creatinina, Glicose, CPK, Lactato, 2 pares de hemoculturas e TC (gás nos planos fasciais). ATENÇÃO: A TC nunca deve atrasar a exploração cirúrgica quando a suspeita clínica de fasciíte necrosante for alta!"
          ]
        }
      ],
      decision_flow: [
        {
          if: "Erisipela ou Celulite Não-Purulenta Leve/Moderada (Ambulatorial)",
          then: "Cefalexina 500 mg a 1 g VO de 6/6h por 5 a 7 dias OU Amoxicilina + Clavulanato 875/125 mg VO 12/12h por 5–7 dias OU Clindamicina 300 a 600 mg VO de 8/8h (se alergia a beta-lactâmicos)."
        },
        {
          if: "Erisipela ou Celulite Moderada/Grave com SIRS (Internação Hospitalar)",
          then: "Cefazolina 1 a 2 g IV de 8/8h OU Oxacilina 2 g IV de 4/4h a 6/6h (se suspeita estafilocócica) OU Ceftriaxona 1 a 2 g IV 24/24h (ou Penicilina G Cristalina 2 a 4 milhões UI IV 4/4h na erisipela clássica)."
        },
        {
          if: "Abscesso Cutâneo / Celulite Purulenta com Risco de CA-MRSA (Recorrente, falha de beta-lactâmico, SIRS)",
          then: "Incisão e Drenagem + Sulfametoxazol-Trimetoprima (Bactrim F 800/160 mg) 1 a 2 comp. VO de 12/12h OU Doxiciclina 100 mg VO 12/12h OU Clindamicina 600 mg VO/IV 8/8h (se internado grave: Vancomicina 15–20 mg/kg IV 12/12h)."
        },
        {
          if: "Suspeita de Fasciíte Necrosante ou Gangrena de Fournier",
          then: "DESBRIDAMENTO CIRÚRGICO RADICAL DE EMERGÊNCIA no Centro Cirúrgico + Esquema Antimicrobiano Triplo Imediato: Vancomicina (ataque 25–30 mg/kg IV) + Piperacilina-Tazobactam 4,5 g IV 6/6h (ou Meropenem 1 g IV 8/8h) + CLINDAMICINA 900 mg IV de 8/8h (obrigatória pelo efeito antitoxina!)."
        }
      ],
      treatment: [
        {
          title: "Mordedura de Cão, Gato ou Humana",
          regimen: "Amoxicilina + Clavulanato + Profilaxia Antitetânica e Antirrábica",
          items: [
            "Droga de 1ª escolha (cobre Pasteurella multocida, Capnocytophaga, Eikenella corrodens, S. aureus e anaeróbios): Amoxicilina + Clavulanato 875/125 mg VO de 12/12h por 5 a 7 dias (evitar Cefalexina isolada, pois não cobre Pasteurella!).",
            "Lavar abundantemente com água e sabão + SF 0,9%, evitar sutura primária fechada em feridas puntiformes/mordeduras de gato ou mãos, atualizar vacina antitetânica e avaliar profilaxia antirrábica."
          ]
        }
      ],
      linked_drug_terms: ["Amoxicilina + Clavulanato", "Oxacilina", "Clindamicina", "Vancomicina", "Piperacilina + Tazobactam", "Meropenem"],
      red_flags: [
        "Dor intensa desproporcional à aparência da pele + febre/taquicardia + crepitação ou bolhas hemorrágicas = Fasciíte Necrosante até que se prove o contrário (emergência cirúrgica!).",
        "Importante: Nas primeiras 24–48h após o início do antibiótico na celulite/erisipela, o eritema pode parecer aumentar discretamente pela lise bacteriana e liberação de toxinas — não trocar o antibiótico precocemente se a febre e o estado geral estiverem melhorando."
      ],
      source_refs: [
        { label: "IDSA Practice Guidelines for the Diagnosis and Management of Skin and Soft Tissue Infections", url: "https://www.idsociety.org/" }
      ]
    },
    {
      id: "seed-scassst",
      slug: "sindrome-coronariana-aguda-sem-supra-de-st-scassst",
      title: "Síndrome Coronariana Aguda Sem Supra de ST (IAMSSST e Angina Instável)",
      category: "Cardiologia",
      setting: "Sala de Emergência / Unidade Coronariana / Hemodinâmica",
      status: "verified",
      summary: "Algoritmo 0h/1h de Troponina de Alta Sensibilidade, estratificação pelos escores HEART e GRACE, terapia antitrombótica (AAS + Inibidor P2Y12 + Enoxaparina/Fondaparinux) e definição do tempo para cinecoronariografia (Imediata < 2h vs. Precoce < 24h).",
      suspicion: [
        {
          title: "Diagnóstico e Algoritmo de Troponina de Alta Sensibilidade (hs-cTn)",
          items: [
            "Dor torácica anginosa em repouso (> 20 min), angina de início recente (CCS II/III) ou angina em crescendo, com ECG em até 10 min SEM supradesnivelamento persistente do segmento ST.",
            "Achados de ECG de alto risco na SCASSST: Infradesnivelamento de ST >= 0,5 a 1 mm em >= 2 derivações contíguas, inversão simétrica e profunda de onda T (ex.: Síndrome de Wellens em V2–V4 = suboclusão crítica de DA proximal!) ou elevação transitória de ST.",
            "IAMSSST vs. Angina Instável: Curva de Troponina com elevação/queda acima do percentil 99 = IAM sem Supra de ST (IAMSSST); Troponina seriada normal (0h e 1h/3h) com quadro clínico isquêmico típico = Angina Instável."
          ]
        }
      ],
      initial_actions: [
        {
          title: "Medidas Imediatas e Tratamento Antitrombótico Inicial",
          items: [
            "1. Monitorização contínua (ECG, PA, SpO2), acesso venoso, ECG em 10 min (incluir V3R, V4R e V7–V9 na suspeita de oclusão de Circunflexa, que pode ser eletricamente silenciosa nas 12 derivações!).",
            "2. AAS: Dose de ataque de 160 a 300 mg VO mastigados imediatamente (manutenção 100 mg/dia).",
            "3. Anticoagulação Parenteral Imediata: Fondaparinux 2,5 mg SC 1x/dia (1ª escolha na estratégia conservadora/precoce pelo menor risco de sangramento — estudo OASIS-5; se for ao cateterismo, fazer bolus de HNF na sala!) OU Enoxaparina 1 mg/kg SC de 12/12h (0,75 mg/kg 12/12h se >= 75 anos; 1 mg/kg 24/24h se ClCr < 30 mL/min).",
            "4. Estatina de Alta Potência: Atorvastatina 80 mg VO 1x/dia (ou Rosuvastatina 40 mg/dia) + Nitroglicerina SL/IV para controle da dor isquêmica + Metoprolol VO nas primeiras 24h se estável e sem congestão."
          ]
        }
      ],
      exams: [
        {
          title: "Quando Fazer o Ataque do 2º Antiagregante (Inibidor P2Y12: Ticagrelor / Prasugrel / Clopidogrel)?",
          items: [
            "DIRETRIZ ATUAL (ESC / SBC): Se o paciente com SCASSST for submetido a Estratégia Invasiva Precoce (< 24h), NÃO se recomenda o pré-tratamento rotineiro com inibidor P2Y12 na sala de emergência antes de conhecer a anatomia coronariana (para não atrasar cirurgia de revascularização caso seja lesão de tronco/triarterial e reduzir sangramento).",
            "Se a cinecoronariografia for demorar > 24–48h ou o manejo for inicialmente conservador sem alto risco hemorrágico: administrar ataque de Ticagrelor 180 mg VO (seguido de 90 mg 12/12h) ou Clopidogrel 300 a 600 mg VO (seguido de 75 mg/dia)."
          ]
        }
      ],
      decision_flow: [
        {
          if: "Critérios de MUITO ALTO RISCO (Instabilidade hemodinâmica/choque, dor torácica refratária ao tratamento clínico, arritmias ventriculares malignas/PCR, complicação mecânica ou IC aguda/EAP)",
          then: "Estratégia Invasiva IMEDIATA (< 2 horas — emergencial, como no IAMCSST!): encaminhar direto à Hemodinâmica!"
        },
        {
          if: "Critérios de ALTO RISCO (Diagnóstico confirmado de IAMSSST com curva de troponina, alterações dinâmicas de ST/T, supradesnível transitório de ST ou Escore GRACE > 140)",
          then: "Estratégia Invasiva PRECOCE (< 24 horas): internação em Unidade Coronariana e cinecoronariografia nas primeiras 24 horas."
        },
        {
          if: "Dor torácica com ECG normal e Troponina 0h/1h negativa (Escore HEART 0 a 3 pontos — Baixo Risco)",
          then: "Alta segura do Pronto-Socorro com acompanhamento ambulatorial precoce (< 0,9% de eventos cardiovasculares em 30 dias)."
        }
      ],
      treatment: [
        {
          title: "Prevenção Secundária de Alta Hospitalar Pós-SCA",
          regimen: "Os 5 Pilares Modificadores de Mortalidade Pós-IAM",
          items: [
            "1) Dupla Antiagregação Plaquetária (DAPT) por 12 meses: AAS 100 mg/dia + Ticagrelor 90 mg 12/12h (ou Prasugrel 10 mg/dia ou Clopidogrel 75 mg/dia) + Pantoprazol 40 mg/dia.",
            "2) Estatina de Alta Potência: Atorvastatina 80 mg/dia ou Rosuvastatina 40 mg/dia (meta de LDL-c < 50 mg/dL!).",
            "3) Betabloqueador (Succinato de Metoprolol, Carvedilol ou Bisoprolol) — especialmente se FEVE <= 40%.",
            "4) IECA ou BRA (ou Sacubitril/Valsartana) — se FEVE <= 40%, HAS, DM ou DRC.",
            "5) Antagonista Mineralocorticoide (Espironolactona 25 mg/dia) + Inibidor de SGLT2 (Dapagliflozina/Empagliflozina 10 mg/dia) se FEVE <= 40% e/ou IC/DM."
          ]
        }
      ],
      linked_drug_terms: ["Ácido Acetilsalicílico", "Clopidogrel", "Enoxaparina", "Nitroglicerina", "Metoprolol", "Morfina"],
      red_flags: [
        "JAMAIS administrar Trombolítico (Alteplase/Tenecteplase) na SCASSST (IAM sem supra ou Angina Instável)! Na SCASSST o trombo é rico em plaquetas (trombo branco) e a fibrinólise aumenta mortalidade e reinfarto!",
        "Síndrome de Wellens (ondas T bifásicas Plus-Minus ou profundamente invertidas e simétricas em V2–V3 em paciente já sem dor): indica suboclusão crítica da Artéria Descendente Anterior proximal — NÃO submeter a teste ergométrico (risco de IAM extenso e FV na esteira!); indicar cateterismo!"
      ],
      source_refs: [
        { label: "Diretriz da Sociedade Brasileira de Cardiologia sobre Angina Instável e IAM sem Supra de ST", url: "https://www.portal.cardiol.br/" },
        { label: "ESC Guidelines for the Management of Acute Coronary Syndromes 2023", url: "https://www.escardio.org/" }
      ]
    },
    {
      id: "seed-colica-nefritica",
      slug: "colica-nefritica-aguda-e-ureterolitiase",
      title: "Cólica Nefrítica Aguda e Ureterolitíase (Manejo da Dor, Terapia Expulsiva e Urologia)",
      category: "Nefrologia e Urologia",
      setting: "Pronto-Socorro / Ambulatório",
      status: "verified",
      linked_recipe_slugs: ["prescricao-colica-nefritica-alta"],
      summary: "Analgesia multimodal rápida (AINE + Dipirona ± Opioide de resgate), exame de escolha (TC helicoidal sem contraste), Terapia Médica Expulsiva com Tansulosina para cálculos de 5 a 10 mm e critérios absolutos de desobstrução urológica de urgência.",
      suspicion: [
        {
          title: "Apresentação Clínica e Diagnósticos Diferenciais Graves",
          items: [
            "Dor lombar unilateral hiperaguda, em cólica lancinante, que irradia para flanco, fossa ilíaca e região inguinal/testículo ou grandes lábios, acompanhada de inquietação psicomotora (o paciente não encontra posição de alívio!), náuseas, vômitos e hematúria.",
            "ATENÇÃO EM IDOSOS (> 60 anos) E HIPERTENSOS: Toda 'primeira cólica nefrítica' em paciente > 60 anos ou com instabilidade hemodinâmica/assimetria de pulsos DEVE ter Aneurisma de Aorta Abdominal Roto e Dissecção Aórtica descartados imediatamente por TC/POCUS!"
          ]
        }
      ],
      initial_actions: [
        {
          title: "Analgesia Imediata (Antes Mesmo do Exame de Imagem!)",
          items: [
            "1. AINE Endovenoso (1ª escolha absoluta — reduz a síntese de prostaglandinas, diminui o edema ureteral e a pressão intrapiélica!): Cetoprofeno 100 mg IV diluído em 100 mL de SF 0,9% correr em 20 min (ou Tenoxicam 20–40 mg IV ou Diclofenaco 75 mg IM) — desde que função renal normal e não gestante!",
            "2. Associar Dipirona 1 g a 2 g IV lento + Antiemético: Ondansetrona 4 a 8 mg IV.",
            "3. Resgate se dor intensa refratária: Morfina 2 a 4 mg IV titulado (ou Tramadol 100 mg IV lento diluído em 100 mL SF).",
            "4. Evitar hiper-hidratação venosa forçada ('soro aberto') durante a crise de dor aguda (aumenta a diurese contra o ureter obstruído e piora a dor!)."
          ]
        }
      ],
      exams: [
        {
          title: "Exames Laboratoriais e Exame de Imagem Padrão-Ouro",
          items: [
            "Laboratório obrigatório: EAS (Urina tipo 1 — avaliar leucocitúria, nitrito e bacteriúria para afastar infecção associada!), Creatinina, Ureia, Hemograma, PCR e Beta-hCG em mulheres em idade fértil.",
            "PADRÃO-OURO DE IMAGEM: Tomografia Computadorizada Helicoidal de Abdome e Pelve SEM CONTRASTE (sensibilidade > 98%, define tamanho exato em milímetros, localização topográfica e densidade em Unidades Hounsfield). Em gestantes e crianças: Ultrassonografia de Rins e Vias Urinárias é a 1ª escolha."
          ]
        }
      ],
      decision_flow: [
        {
          if: "Cálculo Obstrutivo associado a FEBRE, Piúria/ITU (Pionefrose), Anúria, Rim Único ou Lesão Renal Aguda grave",
          then: "EMERGÊNCIA UROLÓGICA ABSOLUTA! Coletar urocultura + hemoculturas, iniciar Ceftriaxona 2 g IV (ou Piperacilina-Tazobactam 4,5 g IV se sepse) e acionar Urologia IMEDIATAMENTE para desobstrução (Cateter Duplo J ou Nefrostomia Percutânea)."
        },
        {
          if: "Cálculo <= 10 mm sem sinais de infecção, função renal preservada e dor controlada após medicação",
          then: "Alta hospitalar com analgesia oral + Terapia Médica Expulsiva (TME): Tansulosina 0,4 mg VO 1x ao dia à noite por até 4 semanas (especialmente eficaz para cálculos ureterais distais de 5 a 10 mm!). Cálculos <= 4–5 mm têm > 80% de eliminação espontânea."
        },
        {
          if: "Cálculo > 10 mm OU dor intratável/vômitos incoercíveis no PS",
          then: "Internação e avaliação urológica para intervenção definitiva (Ureterorrenolitotripsia flexível/semirrígida a laser ou LECO) — cálculos > 10 mm raramente são expelidos espontaneamente."
        }
      ],
      treatment: [
        {
          title: "Prescrição de Alta e Orientações ao Paciente",
          regimen: "Analgesia + Alfa-bloqueador (Tansulosina) + Sinais de Alarme",
          items: [
            "Tansulosina 0,4 mg VO 1x ao dia após o jantar por 14 a 28 dias.",
            "Dipirona 1 g VO de 6/6h se dor + Cetoprofeno 100 mg VO de 12/12h por 3 a 5 dias (após as refeições) + Ondansetrona 4–8 mg VO se náuseas.",
            "Orientar filtrar a urina para identificar a eliminação do cálculo e retornar IMEDIATAMENTE ao PS se surgir FEBRE, calafrios, redução da urina ou dor refratária."
          ]
        }
      ],
      linked_drug_terms: ["Dipirona", "Morfina", "Ondansetrona", "Ceftriaxona"],
      red_flags: [
        "Cálculo Ureteral + Febre/Calafrios = Pionefrose / Sepse Urinária Obstrutiva! Nunca dar alta; exige drenagem urológica urgente (Duplo J).",
        "Evitar Escopolamina (Buscopan) isolada como única analgesia na cólica nefrítica: estudos mostram que antiespasmódicos anticolinérgicos não têm eficácia superior ao placebo quando comparados aos AINEs."
      ],
      source_refs: [
        { label: "European Association of Urology (EAU) Guidelines on Urolithiasis 2024", url: "https://uroweb.org/" }
      ]
    },
    {
      id: "seed-intoxicacoes",
      slug: "intoxicacoes-exogenas-agudas-sindromes-toxicologicas-e-antidotos",
      title: "Intoxicações Exógenas Agudas (Toxíndromes, Descontaminação e Antídotos)",
      category: "Emergências e Trauma",
      setting: "Sala Vermelha / Pronto-Socorro / UTI",
      status: "verified",
      summary: "Reconhecimento rápido das 5 grandes Síndromes Toxicológicas (Anticolinérgica, Colinérgica, Simpaticomimética, Opioide e Sedativo-Hipnótica), indicação de Carvão Ativado (até 1–2h) e tabela de Antídotos de Emergência.",
      suspicion: [
        {
          title: "As 5 Grandes Toxíndromes no Exame Físico (Pupilas, Pele, Sinais Vitais e Peristaltismo)",
          items: [
            "1. SÍNDROME COLINÉRGICA (Organofosforados, Carbamatos / 'Chumbinho'): MIOSE puntiforme, sialorreia intensa, broncorreia ('pulmão cheio' / estertores difusos), sudorese, vômitos, diarreia, fasciculações musculares e bradicardia (Mnemônico DUMBELS / SLUDGE).",
            "2. SÍNDROME ANTICOLINÉRGICA (Anti-histamínicos, Tricíclicos, Atropina, Escopolamina, Biperideno): MIDRÍASE, pele seca e quente/ruborizada, mucosas secas, hipertermia, taquicardia, retenção urinária (bexigoma), íleo paralítico e delirium/agitação ('Seco como osso, cego como morcego, vermelho como beterraba, quente como lebre e louco como chapeleiro').",
            "3. SÍNDROME SIMPATICOMIMÉTICA (Cocaína, Crack, Anfetaminas, Ecstasy/MDMA): MIDRÍASE, DIAFORESE (pele muito suada — diferencia da anticolinérgica!), hipertensão arterial, taquicardia, hipertermia, agitação psicomotora e convulsões.",
            "4. SÍNDROME OPIOIDE (Morfina, Fentanil, Heroína, Metadona, Tramadol): Tríade de MIOSE puntiforme + DEPRESSÃO RESPIRATÓRIA (bradipneia < 12 irpm) + Torpor/Coma (com bradicardia e hiporreflexia).",
            "5. SÍNDROME SEDATIVO-HIPNÓTICA (Benzodiazepínicos, Barbitúricos, Álcool, Zolpidem): Sonolência/Coma, ataxia, fala pastosa, pupilas normais/médias e sinais vitais geralmente preservados (depressão respiratória se associado a álcool/opioides)."
          ]
        }
      ],
      initial_actions: [
        {
          title: "Estabilização ABCDE e Descontaminação Gastrointestinal",
          items: [
            "1. ABCDE prioritário: Via aérea definitiva (IOT) se Glasgow <= 8 ou broncorreia maciça, O2, monitorização cardíaca (ECG de 12 derivações para medir QRS e QTc!) e Glicemia Capilar imediata.",
            "2. CARVÃO ATIVADO EM DOSE ÚNICA (Padrão de Descontaminação): 1 g/kg (máx. 50 g em adultos) diluído em 200–400 mL de água ou SF (proporção 1:8) por via oral ou SNG, indicado nas apresentações com <= 1 a 2 horas da ingestão tóxica, DESDE QUE a via aérea esteja protegida (paciente consciente/cooperativo ou já intubado!).",
            "3. QUANDO O CARVÃO ATIVADO É CONTRAINDICADO (NÃO ADSORVE — Mnemônico PHAIL): Rebaixamento do sensório sem via aérea protegida, Ingestão de Cáusticos (ácidos/álcalis), Hidrocarbonetos/Derivados de petróleo, Álcoois (etanol/metanol/etilenoglicol) e Metais pesados (Ferro, Lítio, Chumbo)."
          ]
        }
      ],
      exams: [
        {
          title: "ECG Toxicológico e Exames de Triagem",
          items: [
            "No ECG de 12 derivações: 1) QRS alargado (> 100 ms) + onda R' terminal > 3 mm em aVR = Intoxicação por Antidepressivo Tricíclico (Amitriptilina/Nortriptilina) -> Fazer Bicarbonato de Sódio IV imediatamente! 2) QTc prolongado (> 500 ms) = Risco de Torsades de Pointes -> Fazer Sulfato de Magnésio 2 g IV!",
            "Solicitar: Gasometria arterial + Lactato, Eletrólitos (calcular Ânion Gap e Gap Osmolar!), Função Renal, CPK, Transaminases, INR e dosagem sérica de Paracetamol (se tentativa de autoextermínio), Salicilatos ou Lítio."
          ]
        }
      ],
      decision_flow: [
        {
          if: "Síndrome Colinérgica (Chumbinho / Organofosforado ou Carbamato)",
          then: "Antídoto Imediato: ATROPINA 1 a 3 mg (2 a 6 ampolas de 0,5 mg) IV em bolus, DOBRANDO a dose a cada 5 minutos (2 -> 4 -> 8 -> 16 mg...) até SECAR AS SECREÇÕES BRÔNQUICAS (ausculta pulmonar limpa e FC > 80 bpm)! Miose NÃO é parâmetro para suspender atropina! Nos organofosforados, associar Pralidoxima (Contrathion) 1–2 g IV em 30 min."
        },
        {
          if: "Intoxicação por Antidepressivo Tricíclico (Amitriptilina) com QRS > 100 ms, Arritmia Ventricular ou Hipotensão",
          then: "Antídoto Imediato: BICARBONATO DE SÓDIO 8,4% 1 a 2 mEq/kg IV em bolus direto (ex.: 70 a 140 mL IV), repetindo até estreitar o QRS para < 100 ms e manter pH arterial entre 7,45 e 7,55!"
        },
        {
          if: "Intoxicação por Cocaína / Crack / Simpaticomiméticos (Agitação, Hipertensão, Taquicardia ou Dor Torácica)",
          then: "1ª Linha: BENZODIAZEPÍNICOS (Diazepam 5 a 10 mg IV lento ou Midazolam, repetindo até sedação leve — reduz descarga simpática central, PA, FC e temperatura!) + Nitroglicerina/Nitroprussiato se emergência hipertensiva/dor torácica + AAS. EVITAR Betabloqueadores!"
        },
        {
          if: "Intoxicação por Paracetamol (> 7,5–10 g ou > 150 mg/kg) ou Opioides ou Benzodiazepínicos",
          then: "Paracetamol: N-Acetilcisteína (Fluimucil) IV protocolo 21h (150 mg/kg em 1h + 50 mg/kg em 4h + 100 mg/kg em 16h). Opioides com bradipneia: Naloxona 0,04 a 0,4 mg IV titulado. Benzodiazepínicos com depressão respiratória pura (sem tricíclico/epilepsia): Flumazenil 0,2 mg IV."
        }
      ],
      treatment: [
        {
          title: "Centro de Informação e Assistência Toxicológica (CIATox)",
          regimen: "Disque-Intoxicação Nacional ANVISA: 0800-722-6001",
          items: [
            "Acionar o CIATox (0800-722-6001 — gratuito 24h) para discussão de casos complexos, nomograma de Rumack-Matthew e envio de antídotos específicos (soros antiveneno, fomepizol/etanol, azul de metileno, hidroxicobalamina)."
          ]
        }
      ],
      linked_drug_terms: ["Naloxona", "Flumazenil", "Acetilcisteína", "Diazepam", "Sulfato de Magnésio"],
      notification: {
        text: "Toda Intoxicação Exógena (acidental, ocupacional ou tentativa de suicídio) é de Notificação Compulsória no SINAN (em tentativa de autoextermínio, notificação imediata em 24h e avaliação psiquiátrica antes da alta!)."
      },
      red_flags: [
        "JAMAIS induzir vômito (xarope de ipeca) e não realizar lavagem gástrica de rotina (restrita a ingestões potencialmente letais há < 1 hora com via aérea intubada).",
        "NUNCA administrar Flumazenil na intoxicação mista por Benzodiazepínico + Antidepressivo Tricíclico (desencadeia convulsões refratárias e assistolia!)."
      ],
      source_refs: [
        { label: "ANVISA - Rede Nacional de Centros de Informação e Assistência Toxicológica (CIATox)", url: "https://www.gov.br/anvisa/" },
        { label: "Goldfrank's Toxicologic Emergencies", url: "https://acmt.net/" }
      ]
    },
    {
      id: "seed-abstinencia-alcoolica",
      slug: "sindrome-de-abstinencia-alcoolica-e-delirium-tremens",
      title: "Síndrome de Abstinência Alcoólica, Crises de Abstinência e Delirium Tremens",
      category: "Psiquiatria e Saúde Mental",
      setting: "Pronto-Socorro / Enfermaria / UTI",
      status: "verified",
      linked_recipe_slugs: ["prescricao-abstinencia-alcoolica"],
      summary: "Prevenção obrigatória da Encefalopatia de Wernicke com Tiamina parenteral ANTES da glicose, avaliação pela escala CIWA-Ar e terapia guiada por sintomas com Benzodiazepínicos de longa ação (Diazepam / Lorazepam).",
      suspicion: [
        {
          title: "Linha do Tempo da Abstinência Alcoólica após Redução/Cessação do Etanol",
          items: [
            "1. Tremores e Sintomas Autonômicos Leves (6 a 24 horas): Tremor postural de mãos/língua, ansiedade, insônia, sudorese, náuseas, taquicardia e hipertensão, com orientação preservada.",
            "2. Alucinose Alcoólica (12 a 48 horas): Alucinações visuais (zoopsias — insetos/animais), auditivas ou táteis, porém com SENSÓRIO CLARO (paciente orientado no tempo e espaço e sinais vitais estáveis!).",
            "3. Crises Convulsivas de Abstinência ('Rum Fits' — 12 a 48 horas): Crises tônico-clônicas generalizadas breves (1 a 3 episódios).",
            "4. DELIRIUM TREMENS (48 a 96 horas — Emergência Médica com mortalidade de até 5–15%!): Confusão mental aguda / desorientação profunda (Delirium!), agitação psicomotora extrema, alucinações aterrorizantes e TEMPESTADE AUTONÔMICA GRAVE (febre, taquicardia acentuada, hipertensão e sudorese profusa)."
          ]
        }
      ],
      initial_actions: [
        {
          title: "Regra Número 1: TIAMINA ANTES DA GLICOSE + Correção Eletrolítica",
          items: [
            "1. TIAMINA (Vitamina B1) IMEDIATA: Administrar Tiamina 100 a 300 mg IM ou IV (no Delirium Tremens ou suspeita de Encefalopatia de Wernicke: 500 mg IV diluídos em 100 mL de SF 0,9% correr em 30 min de 8/8h por 3 a 5 dias) ANTES ou junto de qualquer solução glicosada!",
            "2. Aplicar a escala CIWA-Ar a cada 1 a 4 horas para titular o benzodiazepínico (CIWA-Ar <= 7: leve; 8 a 15: moderada; >= 16: grave).",
            "3. Corrigir agressivamente Hipomagnesemia (Sulfato de Magnésio 2 g IV), Hipocalemia e Hipofosfatemia, e descartar causas orgânicas associadas (Hematoma Subdural Crônico por queda, PBE, Pneumonia, HDA e Pancreatite)."
          ]
        }
      ],
      exams: [
        {
          title: "Exames Complementares no Etilista Agudizado",
          items: [
            "Glicemia capilar, Eletrólitos completos (Na+, K+, Mg2+, Fósforo e Cálcio), Função Renal, Transaminases, Bilirrubinas, INR, Amilase/Lipase, Hemograma e TC de Crânio (se crise convulsiva inédita, trauma craniano, déficit focal ou rebaixamento desproporcional)."
          ]
        }
      ],
      decision_flow: [
        {
          if: "Abstinência Moderada a Grave (CIWA-Ar >= 8 a 10) em paciente sem cirrose descompensada",
          then: "PADRÃO-OURO: DIAZEPAM 10 a 20 mg VO (ou 5 a 10 mg IV lento puro em 2 min) a cada 1 hora até atingir sedação leve/calma (RASS 0 a -1 e CIWA-Ar < 8). O Diazepam possui metabólito ativo de meia-vida longa (nordiazepam) que promove 'autotitulação/autodesmame' suave e previne convulsões!"
        },
        {
          if: "Hepatopatia Crônica Avançada (Cirrose Child-Pugh B/C) ou Idoso Frágil",
          then: "Preferir LORAZEPAM 2 a 4 mg VO (ou sublingual) a cada 1 a 2 horas guiado por sintomas, pois o Lorazepam sofre apenas glicuronidação hepática (sem metabólitos ativos que acumulam na cirrose!)."
        },
        {
          if: "Delirium Tremens Grave ou Crises de Abstinência",
          then: "Internação em UTI: Diazepam 10 a 20 mg IV lento a cada 5 a 15 minutos até controle da agitação/delirium (se refratário a altas doses de benzodiazepínico > 100–200 mg, associar Fenobarbital 130–260 mg IV ou Dexmedetomidina/Propofol em UTI)."
        }
      ],
      treatment: [
        {
          title: "O Que NUNCA Fazer na Abstinência Alcoólica",
          regimen: "Evitar Fenitoína e Haloperidol em Monoterapia",
          items: [
            "1) NÃO usar Fenitoína (Hidantal) para tratar ou prevenir convulsões de abstinência alcoólica: a fenitoína é totalmente INEFICAZ nas crises por abstinência de etanol (o tratamento e a prevenção são feitos com Benzodiazepínicos!).",
            "2) NUNCA usar Haloperidol isolado na abstinência alcoólica: o haloperidol não trata a fisiopatologia GABA/NMDA e REDUZ o limiar convulsivo, podendo precipitar convulsões e morte (usar apenas como adjuvante em baixa dose se alucinações refratárias após o paciente já estar impregnado com benzodiazepínico!)."
          ]
        }
      ],
      linked_drug_terms: ["Diazepam", "Haloperidol", "Sulfato de Magnésio"],
      red_flags: [
        "Tríade da Encefalopatia de Wernicke: Confusão mental + Ataxia da marcha + Oftalmoparesia/Nistagmo (paralisia do VI par). Se o paciente receber Soro Glicosado sem Tiamina prévia, o metabolismo da glicose consome a reserva residual de vitamina B1 e precipita Síndrome de Korsakoff irreversível!",
        "NUNCA prescrever 'álcool etílico' oral ou venoso para tratar abstinência hospitalar."
      ],
      source_refs: [
        { label: "ASAM Clinical Practice Guideline on Alcohol Withdrawal Management", url: "https://www.asam.org/" }
      ]
    },
    {
      id: "seed-hpp",
      slug: "hemorragia-pos-parto-hpp-manejo-e-4ts",
      title: "Hemorragia Pós-Parto (HPP — Regra dos 4 Ts, Ocitocina, Tranexâmico e Balão)",
      category: "Ginecologia e Obstetrícia",
      setting: "Centro Obstétrico / Maternidade / UTI",
      status: "verified",
      summary: "Hora de Ouro da HPP (perda > 500 mL no parto vaginal ou > 1.000 mL na cesárea, ou Índice de Choque >= 0,9), massagem uterina bimanual, uterotônicos escalonados, Ácido Tranexâmico 1 g IV precoce e revisão sistemática dos 4 Ts.",
      suspicion: [
        {
          title: "Critérios Diagnósticos e Índice de Choque Obstétrico",
          items: [
            "Perda sanguínea cumulativa >= 500 mL após parto vaginal ou >= 1.000 mL após cesariana nas primeiras 24 horas, OU qualquer perda sanguínea capaz de causar instabilidade hemodinâmica.",
            "ÍNDICE DE CHOQUE OBSTÉTRICO (FC / PAS): Normal na puérpera = 0,5 a 0,7. Se Índice de Choque >= 0,9: alerta precoce de sangramento grave (acionar protocolo de HPP!). Se Índice de Choque >= 1,4: necessidade iminente de Transfusão Maciça!",
            "OS 4 Ts ETIOLÓGICOS DA HPP: 1) TÔNUS (Atonia Uterina — 70% dos casos! Útero amolecido acima da cicatriz umbilical); 2) TRAUMA (20% — Laceração de colo/vagina/períneo, hematoma ou rotura/inversão uterina); 3) TECIDO (10% — Retenção placentária/cotilédones ou acretismo); 4) TROMBINA (1% — Coagulopatias / CIVD / HELLP / Embolia amniótica)."
          ]
        }
      ],
      initial_actions: [
        {
          title: "Pacote da 1ª Hora (Hora de Ouro da HPP)",
          items: [
            "1. Chamar ajuda imediata (obstetra, anestesista, enfermagem e banco de sangue), posicionar 2 acessos venosos calibrosos (14G ou 16G), O2 a 10 L/min, sondagem vesical de demora (esvaziar a bexiga facilita a contração uterina!) e aquecer a paciente.",
            "2. MASSAGEM UTERINA BIMANUAL IMEDIATA (Manobra de Hamilton) enquanto se preparam os uterotônicos + revisar canal de parto e placenta.",
            "3. ÁCIDO TRANEXÂMICO PRECOCE (Estudo WOMAN): 1 g (4 ampolas de 250 mg) diluído em 100 mL SF 0,9% correr IV em 10 minutos (dentro das primeiras 3 horas do parto, independente da causa dos 4 Ts!). Pode repetir mais 1 g IV se o sangramento persistir após 30 minutos."
          ]
        }
      ],
      exams: [
        {
          title: "Monitorização Laboratorial e Fibrinogênio Crítico",
          items: [
            "Coletar imediatamente: Tipagem sanguínea e prova cruzada, Hemograma, Coagulograma (TP, TTPa), Gasometria/Lactato e FIBRINOGÊNIO sérico!",
            "O Fibrinogênio é o marcador mais precoce de coagulopatia na HPP (normal na gestante a termo > 400 mg/dL; se Fibrinogênio < 200 mg/dL, há altíssimo valor preditivo para HPP grave -> repor Crioprecipitado ou Concentrado de Fibrinogênio imediatamente!)."
          ]
        }
      ],
      decision_flow: [
        {
          if: "1ª Linha Uterotônica na Atonia Uterina (Tônus)",
          then: "OCITOCINA (5 UI/mL): Diluir 4 ampolas (20 UI) em 500 mL de SF 0,9% ou Ringer Lactato e infundir a 250 mL/h (10 UI na 1ª hora) + manutenção de 125 mL/h (NUNCA fazer Ocitocina pura em bolus IV rápido pelo risco de hipotensão profunda e colapso cardiovascular!)."
        },
        {
          if: "Falha da Ocitocina após 15–20 minutos (2ª e 3ª Linhas Uterotônicas)",
          then: "2ª Linha: METILERGOMETRINA (Methergin 0,2 mg/1 mL) 1 ampola (0,2 mg) IM a cada 2 a 4 horas (máx. 5 doses/24h) — ATENÇÃO: ESTRITAMENTE CONTRAINDICADA em pacientes com Hipertensão, Pré-Eclâmpsia ou Eclâmpsia! 3ª Linha: MISOPROSTOL 800 mcg por via retal ou sublingual em dose única."
        },
        {
          if: "Atonia Uterina Refratária aos Uterotônicos + Ácido Tranexâmico",
          then: "Inserir BALÃO DE TAMPONAMENTO INTRAUTERINO (Balão de Bakri ou artesanal de Alves, preenchido com 300 a 500 mL de SF 0,9% por até 24h, mantendo ocitocina + cefazolina profilática) e aplicar Traje Anti-Choque Não Pneumático (TAN). Se falha do balão: Suturas Compressivas de B-Lynch / Hayman, Ligadura Vascular ou Histerectomia Puerperal."
        }
      ],
      treatment: [
        {
          title: "Prevenção Universal da HPP no 3º Período do Parto",
          regimen: "Manejo Ativo do Secundamento em Todo Parto",
          items: [
            "Administrar Ocitocina 10 UI IM imediatamente após o desprendimento do ombro anterior / nascimento do concepto + Clampeamento oportuno do cordão (1 a 3 min) + Tração controlada do cordão com contra-tração suprapúbica (Manobra de Brandt-Andrews) + Vigilância do tônus uterino (Globo de Segurança de Pinard)."
          ]
        }
      ],
      linked_drug_terms: ["Ácido Tranexâmico"],
      red_flags: [
        "JAMAIS administrar Metilergometrina (Methergin) em gestantes/puérperas hipertensas ou com Pré-Eclâmpsia (precipita crise hipertensiva gravíssima, AVC hemorrágico e vasoespasmo coronariano!).",
        "Sangramento vaginal intenso com ÚTERO BEM CONTRAÍDO (Globo de Pinard firme): a causa NÃO é atonia! Investigar imediatamente Laceração de Trajeto (colo/vagina) com valvas ou Coagulopatia."
      ],
      source_refs: [
        { label: "OPAS / OMS / FEBRASGO - Estratégia Zero Morte Materna por Hemorragia Pós-Parto", url: "https://www.febrasgo.org.br/" },
        { label: "WOMAN Trial Collaborators - Effect of early tranexamic acid administration on mortality in post-partum haemorrhage (Lancet)", url: "https://www.thelancet.com/" }
      ]
    },
    {
      id: "seed-crise-adrenal",
      slug: "insuficiencia-adrenal-aguda-crise-adrenal",
      title: "Insuficiência Adrenal Aguda (Crise Adrenal / Crise Addisoniana)",
      category: "Endocrinologia e Metabolismo",
      setting: "Sala Vermelha / Pronto-Socorro / UTI",
      status: "verified",
      summary: "Suspeita clínica no choque refratário a catecolaminas com hiponatremia/hipercalemia/hipoglicemia, administração imediata de Hidrocortisona 100 mg IV em bolus + 200 mg/24h e ressuscitação volêmica com SF 0,9% + Glicose.",
      suspicion: [
        {
          title: "Quando Suspeitar de Crise Adrenal na Emergência?",
          items: [
            "Choque distributivo/hipovolêmico refratário a volume e noradrenalina, acompanhado de dor abdominal aguda (que pode simular abdome agudo cirúrgico!), náuseas, vômitos, febre inexplicada e letargia/confusão.",
            "Causa mais comum na prática clínica: SUSPENSÃO ABRUPTA de corticoterapia crônica (> 20 mg/dia de Prednisona ou equivalente por > 3 semanas) ou falta de ajuste da dose de corticoide ('dose de estresse') durante uma infecção aguda, cirurgia ou trauma!",
            "Tríade Laboratorial Clássica (especialmente na Insuficiência Adrenal Primária / Doença de Addison por deficiência de cortisol + aldosterona): HIPONATREMIA + HIPERCALEMIA + HIPOGLICEMIA (além de acidose metabólica hiperclorêmica, hipercalcemia leve e eosinofilia!)."
          ]
        }
      ],
      initial_actions: [
        {
          title: "Conduta de Emergência (Tratar ANTES do Resultado do Cortisol!)",
          items: [
            "1. Se o paciente ainda não recebeu corticoide, colher 1 tubo de sangue para dosagem de Cortisol Basal e ACTH plasmático, mas NUNCA atrasar a administração de Hidrocortisona aguardando resultado!",
            "2. RESSUSCITAÇÃO VOLÊMICA VIGOROSA: 1.000 mL de Soro Fisiológico 0,9% IV na 1ª hora (NÃO usar Ringer Lactato se houver hipercalemia!), seguido de SF 0,9% associado a Soro Glicosado 5% (ou Glicose 50% 40 mL IV se hipoglicemia < 70 mg/dL).",
            "3. HIDROCORTISONA IMEDIATA: Dose de ataque de 100 mg IV em bolus imediato, seguida de 200 mg/24h IV (50 mg IV de 6 em 6 horas ou infusão contínua de 8,3 mg/h)."
          ]
        }
      ],
      exams: [
        {
          title: "Avaliação Laboratorial e Pesquisa do Fator Precipitante",
          items: [
            "Eletrólitos (Na+, K+, Ca2+), Glicemia, Gasometria arterial, Ureia/Creatinina, Hemograma (eosinofilia e linfocitose relativa), Cortisol sérico, ACTH, TSH/T4 livre e rastreio infeccioso completo (infecção é o gatilho em > 50% das crises!)."
          ]
        }
      ],
      decision_flow: [
        {
          if: "Paciente com diagnóstico conhecido de Insuficiência Adrenal ou uso crônico de Corticoide em Choque / Crise Adrenal",
          then: "Hidrocortisona 100 mg IV em bolus imediato + 50 mg IV de 6/6h (em doses >= 100 mg/dia de hidrocortisona, a atividade mineralocorticoide já é plena, dispensando Fludrocortisona na fase aguda!)."
        },
        {
          if: "Suspeita de 1º episódio de Insuficiência Adrenal em que se deseja realizar Teste de Estímulo com Cortrosina (ACTH) imediato sem interferência no ensaio",
          then: "Pode-se administrar Dexametasona 4 mg IV em bolus (único corticoide que não cruza no imunoensaio de cortisol sérico) + SF 0,9%; contudo, se houver insuficiência adrenal primária, associar ou migrar logo após a coleta para Hidrocortisona 100 mg IV pelo efeito mineralocorticoide."
        }
      ],
      treatment: [
        {
          title: "Desmame para Dose Fisiológica após Estabilização (48–72h)",
          regimen: "Transição para Prednisona ou Hidrocortisona Oral (± Fludrocortisona)",
          items: [
            "Após resolução do fator desencadeante e estabilidade hemodinâmica por 24–48h, reduzir gradualmente a Hidrocortisona IV em 50% ao dia até atingir a dose de reposição oral fisiológica (Prednisona 5 mg VO pela manhã ou Hidrocortisona VO 15–25 mg/dia divididos em 2–3 tomadas; na IA Primária, reintroduzir Fludrocortisona 0,1 mg/dia VO quando a dose de hidrocortisona cair para < 50 mg/dia)."
          ]
        }
      ],
      linked_drug_terms: ["Hidrocortisona", "Dexametasona", "Noradrenalina"],
      red_flags: [
        "No Hipotireoidismo Grave / Coma Mixedematoso coexistente: SEMPRE administrar Hidrocortisona 100 mg IV ANTES de iniciar a Levotiroxina (T4), pois o hormônio tireoidiano acelera o metabolismo hepático do cortisol residual e precipita Crise Adrenal fatal!",
        "NUNCA suspender abruptamente o corticoide em paciente que faz uso crônico há > 3 semanas."
      ],
      source_refs: [
        { label: "Endocrine Society Clinical Practice Guideline: Diagnosis and Treatment of Primary Adrenal Insufficiency", url: "https://www.endocrine.org/" }
      ]
    }
  ];

  window.LURIA_RECIPE_SEEDS = [
    {
      id: "rec-seed-sepse",
      slug: "prescricao-sepse-hora-1",
      title: "Pacote 1ª Hora — Sepse e Choque Séptico (UTI/Sala Vermelha)",
      status: "verified",
      data: {
        copy_ready: true,
        routes: [
          {
            route: "Uso Endovenoso Imediato (Ressuscitação e Antimicrobiano)",
            mode: "standard",
            items: [
              { drug: "Ringer Lactato (ou Plasma-Lyte)", quantity: "30 mL/kg IV", directions: "Correr aberto nas primeiras 1 a 3 horas se hipotensão (PAS < 90 ou PAM < 65 mmHg) ou lactato >= 4 mmol/L. Reavaliar fluido-responsividade e POCUS pulmonar." },
              { drug: "Ceftriaxona 2 g + Claritromicina 500 mg (Foco Pulmonar) OU Piperacilina-Tazobactam 4,5 g (Foco Abdominal/Urinário Grave)", quantity: "IV na 1ª hora", directions: "Infundir imediatamente após coleta de 2 pares de hemoculturas." },
              { drug: "Noradrenalina (Hemitartarato 4 mg/4 mL base)", quantity: "4 ampolas (16 mg) + 234 mL SG 5% (conc. 64 mcg/mL)", directions: "Infundir em BIC iniciando a 0,05–0,1 mcg/kg/min (ex.: 4 a 8 mL/h) e titular para manter PAM >= 65 mmHg." }
            ]
          }
        ],
        orientations: [
          "Dosar lactato arterial/venoso na hora 0 e repetir em 2–4h (meta: clareamento >= 10–20%).",
          "Se necessidade de Noradrenalina >= 0,25–0,5 mcg/kg/min: associar Vasopressina 0,03 UI/min e Hidrocortisona 50 mg IV de 6/6h."
        ]
      }
    },
    {
      id: "rec-seed-iam",
      slug: "prescricao-iam-com-supra",
      title: "Prescrição Inicial — IAM com Supra de ST (Sala de Emergência)",
      status: "verified",
      data: {
        copy_ready: true,
        routes: [
          {
            route: "Uso Oral Imediato (Ataque Antiplaquetário)",
            mode: "standard",
            items: [
              { drug: "Ácido Acetilsalicílico (AAS) 100 mg", quantity: "3 comprimidos (300 mg)", directions: "Mastigar e engolir imediatamente na chegada." },
              { drug: "Ticagrelor 90 mg (2 cp = 180 mg) OU Clopidogrel 75 mg (4 a 8 cp = 300 a 600 mg)", quantity: "Dose de ataque VO", directions: "Em pacientes > 75 anos submetidos à fibrinólise, usar Clopidogrel 75 mg VO sem dose de ataque." },
              { drug: "Atorvastatina 40 mg", quantity: "2 comprimidos (80 mg)", directions: "Administrar 80 mg VO em dose única diária." }
            ]
          },
          {
            route: "Uso Parenteral (Anticoagulação)",
            mode: "standard",
            items: [
              { drug: "Enoxaparina Sódica", quantity: "30 mg IV em bolus + 1 mg/kg SC 12/12h", directions: "Para pacientes < 75 anos (máx. 100 mg nas 2 primeiras doses SC). Se >= 75 anos: NÃO fazer bolus IV e usar 0,75 mg/kg SC 12/12h." }
            ]
          }
        ],
        orientations: [
          "Evitar nitratos, morfina e diuréticos na presença de infarto de ventrículo direito (supra em DII, DIII, aVF + V3R/V4R) ou uso de sildenafil/tadalafil nas últimas 24–48h.",
          "Acionar Hemodinâmica (meta porta-balão <= 90–120 min) ou preparar Tenecteplase IV (meta porta-agulha <= 10 min)."
        ]
      }
    },
    {
      id: "rec-seed-sri",
      slug: "prescricao-sri-intubacao",
      title: "Kit de Drogas — Intubação em Sequência Rápida (Adulto 70 kg)",
      status: "verified",
      data: {
        copy_ready: true,
        routes: [
          {
            route: "Sequência Endovenosa em Bolus (Pré-oxigenar com O2 100% por 3–5 min)",
            mode: "standard",
            items: [
              { drug: "1) Pré-tratamento (opcional): Fentanil (50 mcg/mL)", quantity: "3 a 4 mL (150–200 mcg) IV lento", directions: "Administrar 3 minutos antes do indutor se não houver choque/hipotensão." },
              { drug: "2) Indução: Cetamina (50 mg/mL) OU Etomidato (2 mg/mL)", quantity: "Cetamina 2,5 mL (125 mg) OU Etomidato 10 mL (20 mg)", directions: "Injetar em bolus IV (1,5–2 mg/kg de Cetamina ou 0,3 mg/kg de Etomidato)." },
              { drug: "3) Bloqueio Neuromuscular: Rocurônio (10 mg/mL) OU Succinilcolina (100 mg)", quantity: "Rocurônio 8,5 mL (85 mg) OU Succinilcolina 100 mg (10 mL)", directions: "Injetar em bolus rápido imediatamente após o indutor (aguardar 45–60s para laringoscopia)." },
              { drug: "4) Sedoanalgesia Pós-IOT Contínua: Fentanil + Propofol (ou Midazolam)", quantity: "Em bomba de infusão contínua", directions: "Iniciar imediatamente após confirmação capnográfica do tubo." }
            ]
          }
        ],
        orientations: [
          "Manter Noradrenalina preparada ou em curso caso PAS < 100 mmHg ou Índice de Choque >= 0,8 antes da indução."
        ]
      }
    },
    {
      id: "rec-seed-dengue",
      slug: "prescricao-dengue-ambulatorial-grupos-ab",
      title: "Receita Ambulatorial — Dengue (Grupos A e B sem Sinais de Alarme)",
      status: "verified",
      data: {
        copy_ready: true,
        routes: [
          {
            route: "Uso Oral (Hidratação e Sintomáticos)",
            mode: "standard",
            items: [
              { drug: "Sais para Reidratação Oral (SRO) + Líquidos Caseiros", quantity: "60 mL/kg/dia VO", directions: "Ex.: 70 kg = 4,2 Litros/dia (ingerir 1,4 L de SRO nas primeiras 4 a 6 horas e 2,8 L de água, água de coco, sucos e chás ao longo do dia)." },
              { drug: "Dipirona 500 mg (ou 1 g) OU Paracetamol 500 a 750 mg", quantity: "1 comprimido VO", directions: "Tomar de 6 em 6 horas se dor ou febre >= 37,8 °C." },
              { drug: "Ondansetrona 4 mg ou 8 mg (ou Metoclopramida 10 mg)", quantity: "1 comprimido VO", directions: "Tomar de 8 em 8 horas se náuseas ou vômitos." }
            ]
          }
        ],
        orientations: [
          "PROIBIDO usar AAS (Aspirina) e anti-inflamatórios (Ibuprofeno, Diclofenaco, Nimesulida, Cetoprofeno, Naproxeno) pelo risco de hemorragia grave.",
          "Retornar IMEDIATAMENTE ao pronto-socorro se surgir qualquer Sinal de Alarme (especialmente quando a febre começar a baixar, entre o 3º e o 7º dia): dor forte e contínua na barriga, vômitos repetidos, tontura/desmaio ao levantar, sangramento de gengiva/nariz ou muita sonolência."
        ]
      }
    },
    {
      id: "rec-seed-asma",
      slug: "prescricao-asma-alta-gina",
      title: "Prescrição de Emergência e Alta — Crise de Asma (GINA)",
      status: "verified",
      data: {
        copy_ready: true,
        routes: [
          {
            route: "1ª Hora no Pronto-Socorro",
            mode: "standard",
            items: [
              { drug: "Salbutamol spray 100 mcg/jato + Brometo de Ipratrópio 20 mcg/jato", quantity: "Salbutamol 4–10 jatos + Ipratrópio 4–8 jatos com espaçador", directions: "Repetir a cada 20 minutos durante a 1ª hora." },
              { drug: "Prednisona 20 mg VO (ou Hidrocortisona 200 mg IV)", quantity: "2 comprimidos e meio (50 mg VO) na 1ª hora", directions: "Se crise grave sem resposta após 1h: associar Sulfato de Magnésio 2 g IV em 100 mL SF 0,9% correr em 20 min." }
            ]
          },
          {
            route: "Receita de Alta Domiciliar",
            mode: "standard",
            items: [
              { drug: "Prednisona 20 mg", quantity: "14 comprimidos", directions: "Tomar 2 comprimidos (40 mg) pela manhã, após o café, por 5 a 7 dias." },
              { drug: "Budesonida + Formoterol 200/6 mcg (cápsula/pó inalatório)", quantity: "1 frasco", directions: "Inalar 1 a 2 doses de 12 em 12 horas continuamente e 1 dose extra se falta de ar (enxaguar a boca com água após o uso)." }
            ]
          }
        ],
        orientations: [
          "Conferir técnica de uso do dispositivo inalatório antes da alta e agendar reavaliação médica em 2 a 7 dias."
        ]
      }
    },
    {
      id: "rec-seed-emergencia-hipertensiva",
      slug: "prescricao-emergencia-hipertensiva",
      title: "Prescrição Hospitalar — Emergência Hipertensiva e Dissecção Aórtica",
      status: "verified",
      data: {
        copy_ready: true,
        routes: [
          {
            route: "Infusão Contínua em Bomba (UTI / Sala Vermelha)",
            mode: "standard",
            items: [
              { drug: "Metoprolol (Seloken 5 mg/5 mL) — OBRIGATÓRIO 1º na Dissecção de Aorta", quantity: "5 mg IV lento em 2–5 min", directions: "Repetir a cada 5 min até 15 mg para atingir FC < 60 bpm ANTES de iniciar o vasodilatador." },
              { drug: "Nitroprussiato de Sódio (Nipride 50 mg/2 mL)", quantity: "1 ampola (50 mg) + 248 mL SG 5% (conc. 200 mcg/mL)", directions: "Infundir em BIC com equipo fotossensível (0,25 a 10 mcg/kg/min). Iniciar a 5–10 mL/h e titular a cada 3–5 min." },
              { drug: "Nitroglicerina (Tridil 50 mg/10 mL) — Preferir em SCA e EAP", quantity: "1 ampola (50 mg) + 240 mL SF 0,9% ou SG 5% (conc. 200 mcg/mL)", directions: "Infundir em BIC (5 a 200 mcg/min). Iniciar a 5 mL/h e titular conforme PA e sintomas." }
            ]
          }
        ],
        orientations: [
          "Na Encefalopatia Hipertensiva: reduzir PAM em no máximo 20–25% na 1ª hora.",
          "Na Dissecção Aguda de Aorta: atingir FC < 60 bpm e PAS 100–120 mmHg nos primeiros 5 a 20 minutos."
        ]
      }
    },
    {
      id: "rec-seed-eap",
      slug: "prescricao-edema-agudo-pulmao",
      title: "Prescrição de Sala Vermelha — Edema Agudo de Pulmão (Perfil B)",
      status: "verified",
      data: {
        copy_ready: true,
        routes: [
          {
            route: "Suporte Ventilatório e Terapia Endovenosa Imediata",
            mode: "standard",
            items: [
              { drug: "Ventilação Não Invasiva (VNI — CPAP ou BiPAP)", quantity: "CPAP 5 a 10 cmH2O (FiO2 titulada para SpO2 > 92%)", directions: "Instalar imediatamente com paciente sentado com pernas pendentes." },
              { drug: "Nitroglicerina (Tridil 50 mg/10 mL) + 240 mL SG 5%", quantity: "Infundir em BIC a 5–10 mL/h (titular até 200 mcg/min)", directions: "Reduzir pré e pós-carga se PAS > 100–110 mmHg." },
              { drug: "Furosemida (20 mg/2 mL)", quantity: "2 a 4 ampolas (40 a 80 mg) IV em bolus", directions: "Monitorar diurese (meta > 100–150 mL/h nas primeiras 2h) e potássio/magnésio séricos." }
            ]
          }
        ],
        orientations: [
          "Realizar ECG de 12 derivações e dosar Troponina para afastar IAM como fator desencadeante."
        ]
      }
    },
    {
      id: "rec-seed-fa-aguda",
      slug: "prescricao-fa-aguda",
      title: "Prescrição — Fibrilação Atrial de Alta Resposta Estável",
      status: "verified",
      data: {
        copy_ready: true,
        routes: [
          {
            route: "Controle de Frequência Cardíaca (FEVE preservada)",
            mode: "standard",
            items: [
              { drug: "Tartarato de Metoprolol (5 mg/5 mL)", quantity: "1 ampola (5 mg) IV lento em 2 a 5 minutos", directions: "Pode repetir a cada 5 minutos até dose máxima de 15 mg (meta FC < 110 bpm)." },
              { drug: "Succinato de Metoprolol 50 mg (ou Tartarato 50 mg 12/12h)", quantity: "Uso oral de manutenção após controle", directions: "Iniciar transição oral 1h após o bolus venoso." }
            ]
          },
          {
            route: "Anticoagulação Oral (Se CHA₂DS₂-VASc >= 2 H ou >= 3 M, ou pós-cardioversão)",
            mode: "alternatives",
            items: [
              { drug: "Apixabana 5 mg", quantity: "1 comprimido VO de 12 em 12 horas", directions: "Usar 2,5 mg 12/12h se >= 2 critérios: idade >= 80 anos, peso <= 60 kg ou creatinina >= 1,5 mg/dL." },
              { drug: "Rivaroxabana 20 mg", quantity: "1 comprimido VO 1x ao dia com o jantar", directions: "Usar 15 mg 1x ao dia se ClCr entre 15 e 49 mL/min." }
            ]
          }
        ],
        orientations: [
          "Não realizar cardioversão química (ex.: Amiodarona/Propafenona) nem elétrica eletiva se FA > 48h ou tempo indeterminado sem Eco Transesofágico prévio ou 3 semanas de anticoagulação."
        ]
      }
    },
    {
      id: "rec-seed-meningite",
      slug: "prescricao-meningite-bacteriana",
      title: "Prescrição Empírica Imediata — Meningite Bacteriana Aguda (Adulto)",
      status: "verified",
      data: {
        copy_ready: true,
        routes: [
          {
            route: "Uso Endovenoso (1ª Hora — Precaução por Gotículas)",
            mode: "standard",
            items: [
              { drug: "1º) Dexametasona (4 mg/mL)", quantity: "10 mg (2,5 mL) IV de 6 em 6 horas por 4 dias", directions: "Administrar 15 a 20 minutos ANTES ou junto com a 1ª dose do antibiótico." },
              { drug: "2º) Ceftriaxona (Dose Meníngea Dobrada)", quantity: "2 g IV de 12 em 12 horas (4 g/dia)", directions: "Diluir em 100 mL SF 0,9% e correr em 30 min." },
              { drug: "3º) Ampicilina (Associar se > 50 anos, gestante ou imunossuprimido)", quantity: "2 g IV de 4 em 4 horas (12 g/dia)", directions: "Cobertura obrigatória para Listeria monocytogenes." }
            ]
          }
        ],
        orientations: [
          "Prescrever quimioprofilaxia com Rifampicina 600 mg VO 12/12h por 2 dias (4 doses) para contactantes íntimos nos casos suspeitos de Doença Meningocócica."
        ]
      }
    },
    {
      id: "rec-seed-pac-ambulatorial",
      slug: "prescricao-pac-ambulatorial",
      title: "Prescrição Ambulatorial — Pneumonia Adquirida na Comunidade (CURB-65 0–1)",
      status: "verified",
      data: {
        copy_ready: true,
        routes: [
          {
            route: "Opção 1 — Paciente Hígido sem Comorbidades (Uso Oral)",
            mode: "standard",
            items: [
              { drug: "Amoxicilina 500 mg (ou Amoxicilina + Clavulanato 875/125 mg)", quantity: "1 caixa", directions: "Tomar 2 comprimidos de 500 mg (1 g) VO de 8 em 8 horas (ou Clavulin BD 875/125 mg 1 cp de 12/12h) por 5 a 7 dias." },
              { drug: "Dipirona 1 g", quantity: "1 caixa", directions: "Tomar 1 comprimido VO de 6 em 6 horas se dor ou febre >= 37,8°C." }
            ]
          },
          {
            route: "Opção 2 — Paciente COM Comorbidades (DPOC, IC, DM, DRC) ou ATB nos últimos 90 dias",
            mode: "alternatives",
            items: [
              { drug: "Amoxicilina + Clavulanato 875/125 mg + Azitromicina 500 mg", quantity: "Tratamento Combinado (5–7 dias)", directions: "Tomar Amoxicilina+Clavulanato 875/125 mg VO de 12/12h por 7 dias ASSOCIADO a Azitromicina 500 mg 1 cp VO 1x/dia por 5 dias." },
              { drug: "Levofloxacino 750 mg (Alternativa em Monoterapia ou Alergia a Beta-lactâmico)", quantity: "5 comprimidos", directions: "Tomar 1 comprimido (750 mg) VO 1x ao dia por 5 dias." }
            ]
          }
        ],
        orientations: [
          "Reavaliar em 48 a 72 horas. Retornar imediatamente ao Pronto-Socorro se surgir falta de ar (dispneia), sonolência, cianose, vômitos ou persistência da febre após 72 horas de antibiótico."
        ]
      }
    },
    {
      id: "rec-seed-pac-hospitalar",
      slug: "prescricao-pac-hospitalar",
      title: "Prescrição de Enfermaria — Pneumonia Adquirida na Comunidade (CURB-65 >= 2)",
      status: "verified",
      data: {
        copy_ready: true,
        routes: [
          {
            route: "Uso Endovenoso / Oral Hospitalar",
            mode: "standard",
            items: [
              { drug: "Ceftriaxona 1 g", quantity: "1 g a 2 g IV a cada 24 horas", directions: "Diluir em 100 mL de SF 0,9% e infundir em 30 minutos (não diluir em Ringer Lactato)." },
              { drug: "Azitromicina 500 mg (VO ou IV) OU Claritromicina 500 mg (12/12h)", quantity: "500 mg 1x ao dia por 3 a 5 dias", directions: "Cobertura obrigatória para germes atípicos." },
              { drug: "Enoxaparina 40 mg SC 1x/dia", quantity: "Tromboprofilaxia farmacológica", directions: "Ajustar para 20 mg SC 1x/dia ou HNF 5.000 UI SC 8/8h se ClCr < 30 mL/min." }
            ]
          }
        ],
        orientations: [
          "Manter SpO2 >= 92% (ou 88–92% se DPOC retentor crônico). Se houver derrame pleural >= 1 cm no decúbito lateral, realizar toracocentese diagnóstica (pH, glicose, LDH, celularidade e cultura)."
        ]
      }
    },
    {
      id: "rec-seed-dpoc-exacerbado",
      slug: "prescricao-dpoc-exacerbado",
      title: "Prescrição — Exacerbação Aguda de DPOC (GOLD 2024)",
      status: "verified",
      data: {
        copy_ready: true,
        routes: [
          {
            route: "Terapia Broncodilatadora, Corticoterapia e Antibiótico",
            mode: "standard",
            items: [
              { drug: "Salbutamol (100 mcg/jato) + Brometo de Ipratrópio (20 mcg/jato ou 40 gotas)", quantity: "Uso Inalatório", directions: "4 a 8 jatos de cada com espaçador (ou nebulizar 10–20 gotas de Salbutamol + 40 gotas de Ipratrópio em 4 mL SF 0,9% em AR COMPRIMIDO) de 4/4h." },
              { drug: "Prednisona 20 mg (ou Hidrocortisona 200 mg IV se intolerância oral)", quantity: "40 mg/dia por 5 dias", directions: "Tomar 2 comprimidos (40 mg) VO pela manhã por exatos 5 dias (não necessita de desmame)." },
              { drug: "Amoxicilina + Clavulanato 875/125 mg (Se escarro purulento!)", quantity: "1 comprimido VO de 12/12h por 5 dias", directions: "Indicado na presença de aumento da purulência do escarro ou necessidade de VNI/VM." }
            ]
          }
        ],
        orientations: [
          "Titular O2 suplementar para meta estrita de SpO2 entre 88% e 92%. Se gasometria arterial mostrar pH <= 7,35 e PaCO2 > 45 mmHg, instalar VNI (BiPAP) imediatamente."
        ]
      }
    },
    {
      id: "rec-seed-cistite",
      slug: "prescricao-cistite-aguda",
      title: "Prescrição Ambulatorial — Cistite Aguda Não Complicada (ITU Baixa)",
      status: "verified",
      data: {
        copy_ready: true,
        routes: [
          {
            route: "Opções de 1ª Linha (Escolher 1 opção — Uso Oral)",
            mode: "alternatives",
            items: [
              { drug: "Opção A (Dose Única): Fosfomicina Trometamol 3 g (Monuril)", quantity: "1 envelope (8 g de granulado = 3 g de fosfomicina)", directions: "Dissolver o conteúdo de 1 envelope em meio copo de água e tomar em DOSE ÚNICA à noite ao deitar, após esvaziar completamente a bexiga." },
              { drug: "Opção B (5 Dias): Nitrofurantoína 100 mg (Macrodantina)", quantity: "20 cápsulas", directions: "Tomar 1 cápsula (100 mg) VO de 6 em 6 horas (junto com alimentos) por 5 dias (em gestantes, manter por 7 dias)." }
            ]
          },
          {
            route: "Analgesia Urinária Sintomática (Opcional por 48h)",
            mode: "standard",
            items: [
              { drug: "Fenazopiridina 200 mg (Pyridium)", quantity: "6 comprimidos", directions: "Tomar 1 comprimido VO de 8 em 8 horas após as refeições por apenas 2 dias para alívio da disúria intensa (avisar que deixa a urina laranja-avermelhada!)." }
            ]
          }
        ],
        orientations: [
          "Aumentar a ingesta hídrica e não postergar as micções. Retornar imediatamente se surgir febre (>= 38°C), calafrios, dor lombar ou vômitos."
        ]
      }
    },
    {
      id: "rec-seed-pielonefrite",
      slug: "prescricao-pielonefrite-aguda",
      title: "Prescrição — Pielonefrite Aguda Não Complicada (PS + Alta)",
      status: "verified",
      data: {
        copy_ready: true,
        routes: [
          {
            route: "1ª Dose Parenteral no Pronto-Socorro (Após Coleta de Urocultura!)",
            mode: "standard",
            items: [
              { drug: "Ceftriaxona 1 g", quantity: "1 frasco-ampola IV ou IM em dose única no PS", directions: "Administrar imediatamente após a coleta de EAS e Urocultura com antibiograma." },
              { drug: "Dipirona 1 g IV + Ondansetrona 4 a 8 mg IV", quantity: "Dose sintomática", directions: "Controle imediato de febre, dor lombar e náuseas." }
            ]
          },
          {
            route: "Manutenção Ambulatorial (Via Oral)",
            mode: "alternatives",
            items: [
              { drug: "Ciprofloxacino 500 mg", quantity: "14 comprimidos", directions: "Tomar 1 comprimido (500 mg) VO de 12 em 12 horas por 7 dias (afastar 2h de leite, cálcio ou antiácidos)." },
              { drug: "Levofloxacino 750 mg", quantity: "5 comprimidos", directions: "Tomar 1 comprimido (750 mg) VO 1x ao dia por 5 dias." }
            ]
          }
        ],
        orientations: [
          "Checar o resultado da urocultura e antibiograma em 48–72 horas para ajuste guiado. Se persistir febre após 72h de antibiótico ou houver história de cálculo renal, realizar TC/USG de urgência para afastar Pionefrose."
        ]
      }
    },
    {
      id: "rec-seed-colica-nefritica",
      slug: "prescricao-colica-nefritica-alta",
      title: "Prescrição de Sala de Medicação e Alta — Cólica Nefrítica / Cálculo Ureteral",
      status: "verified",
      data: {
        copy_ready: true,
        routes: [
          {
            route: "1. Analgesia Endovenosa Imediata no Pronto-Socorro",
            mode: "standard",
            items: [
              { drug: "Cetoprofeno 100 mg IV + Dipirona 1 g a 2 g IV + Ondansetrona 8 mg IV", quantity: "Diluir o Cetoprofeno em 100 mL de SF 0,9% e correr em 20 min", directions: "Se dor intensa refratária após 20–30 min: titular Morfina 2 a 4 mg IV lento." }
            ]
          },
          {
            route: "2. Prescrição de Alta (Terapia Médica Expulsiva para Cálculos de 5 a 10 mm)",
            mode: "standard",
            items: [
              { drug: "Cloridrato de Tansulosina 0,4 mg", quantity: "1 caixa (30 cápsulas)", directions: "Tomar 1 cápsula (0,4 mg) VO 1x ao dia (30 min após o jantar, antes de deitar) por até 28 dias ou até expelir o cálculo." },
              { drug: "Cetoprofeno 100 mg (ou Diclofenaco 50 mg)", quantity: "1 caixa", directions: "Tomar 1 comprimido VO de 12 em 12 horas após as refeições por 3 a 5 dias." },
              { drug: "Dipirona 1 g", quantity: "1 caixa", directions: "Tomar 1 comprimido VO de 6 em 6 horas se dor." }
            ]
          }
        ],
        orientations: [
          "ALERTA DE RETORNO IMEDIATO: Retornar imediatamente à Emergência se apresentar FEBRE (>= 37,8°C), calafrios, parada de eliminação de urina ou dor intratável."
        ]
      }
    },
    {
      id: "rec-seed-abstinencia",
      slug: "prescricao-abstinencia-alcoolica",
      title: "Prescrição Hospitalar — Síndrome de Abstinência Alcoólica e Prevenção de Wernicke",
      status: "verified",
      data: {
        copy_ready: true,
        routes: [
          {
            route: "Reposição Vitamínica/Eletrolítica e Controle GABAérgico",
            mode: "standard",
            items: [
              { drug: "1º) Tiamina (Vitamina B1 — Ampola 100 mg/mL)", quantity: "200 a 500 mg IV ou IM de 8/8h por 3 a 5 dias", directions: "ADMINISTRAR OBRIGATORIAMENTE ANTES DE QUALQUER SOLUÇÃO GLICOSADA (Diluir em 100 mL de SF 0,9% e correr em 30 min)!" },
              { drug: "2º) Diazepam 10 mg VO (ou 5–10 mg IV lento puro) — Se hepatopata Child B/C: usar Lorazepam 2–4 mg VO", quantity: "Guiado por sintomas (CIWA-Ar >= 8)", directions: "Reavaliar CIWA-Ar a cada 1 hora e repetir 10 a 20 mg de Diazepam até sedação leve/calma (RASS 0 a -1)." },
              { drug: "3º) Sulfato de Magnésio 50% (1 ampola = 5 g = 10 mL) ou 10% (2 ampolas = 2 g)", quantity: "2 g diluídos em 100 mL SF 0,9% IV em 1 hora", directions: "Corrigir hipomagnesemia e hipocalemia concomitantes." }
            ]
          }
        ],
        orientations: [
          "Nunca usar Fenitoína para crises de abstinência alcoólica e nunca usar Haloperidol em monoterapia sem benzodiazepínico."
        ]
      }
    }
  ];
})();
