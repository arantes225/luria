(function () {
  "use strict";

  window.TRAUBE_PROTOCOL_SEEDS = [
  {
    "id": "seed-sepse",
    "slug": "sepse-e-choque-septico-ssc-2021",
    "title": "Sepse e Choque Séptico (Pacote de 1 Hora - SSC 2021)",
    "category": "Emergência e UTI",
    "setting": "Pronto-Socorro / UTI",
    "status": "verified",
    "linked_recipe_slugs": [
      "prescricao-sepse-hora-1"
    ],
    "summary": "Manejo estruturado na primeira hora para disfunção orgânica ameaçadora à vida secundária a infecção suspeita ou confirmada (Surviving Sepsis Campaign 2021).",
    "suspicion": [
      {
        "title": "Critérios de Alerta e Disfunção Orgânica",
        "items": [
          "Infecção suspeita ou documentada associada a aumento agudo >= 2 pontos no escore SOFA.",
          "Triagem à beira-leito (qSOFA >= 2, NEWS2 >= 5 ou SIRS): alteração aguda do estado mental (Glasgow < 15), FR >= 22 irpm ou PAS <= 100 mmHg.",
          "Choque séptico: necessidade de vasopressor para manter PAM >= 65 mmHg E lactato sérico > 2 mmol/L (> 18 mg/dL) apesar de ressuscitação volêmica adequada."
        ]
      }
    ],
    "initial_actions": [
      {
        "title": "Pacote da 1ª Hora (Hour-1 Bundle)",
        "items": [
          "1. Medir o lactato sérico arterial ou venoso imediatamente (repetir em 2 a 4h se inicial > 2 mmol/L).",
          "2. Coletar 2 pares de hemoculturas (aeróbio/anaeróbio) de sítios distintos ANTES do antimicrobiano, sem atrasar o início da droga em mais de 45 min.",
          "3. Administrar antimicrobiano IV de amplo espectro na 1ª hora (idealmente nos primeiros 60 min no choque séptico e até 3h na sepse sem choque após triagem).",
          "4. Iniciar ressuscitação volêmica rápida com 30 mL/kg de cristaloide balanceado (Ringer Lactato ou Plasma-Lyte) nas primeiras 3 horas se hipotensão (PAS < 90, PAM < 65) ou lactato >= 4 mmol/L.",
          "5. Iniciar vasopressor (Noradrenalina 1ª escolha) durante ou após a expansão se hipotensão persistente para manter PAM >= 65 mmHg."
        ]
      }
    ],
    "exams": [
      {
        "title": "Painel Laboratorial e Imagem de Foco",
        "items": [
          "Gasometria arterial com lactato, hemograma completo, creatinina, ureia, sódio, potássio, cálcio iônico, bilirrubinas, TGO/TGP, PCR/procalcitonina e coagulograma (TP/INR, TTPa).",
          "2 pares de hemoculturas + urocultura + cultura de secreção traqueal/líquidos cavitários conforme suspeita clínica.",
          "Radiografia de tórax, ultrassonografia POCUS à beira-leito ou tomografia direcionada para controle de foco (abscessos, colangite, pielonefrite obstrutiva)."
        ]
      }
    ],
    "decision_flow": [
      {
        "if": "PAM < 65 mmHg refratária à infusão inicial de cristaloide",
        "then": "Iniciar Noradrenalina (0,05 a 0,5 mcg/kg/min); pode-se iniciar em acesso periférico calibroso proximal temporariamente até obtenção de cateter venoso central."
      },
      {
        "if": "Dose de Noradrenalina >= 0,25 a 0,5 mcg/kg/min sem atingir PAM >= 65 mmHg",
        "then": "Associar Vasopressina (até 0,03 UI/min fixo) em vez de escalonar noradrenalina isoladamente + iniciar Hidrocortisona 200 mg/dia IV (50 mg 6/6h ou infusão contínua)."
      },
      {
        "if": "Hipoperfusão persistente com disfunção miocárdica (baixo débito / SvcO2 < 70%)",
        "then": "Associar Dobutamina (2,5 a 20 mcg/kg/min) à noradrenalina ou substituir por Epinefrina."
      }
    ],
    "treatment": [
      {
        "title": "Antimicrobianos Empíricos (Ajustar conforme foco e epidemiologia local)",
        "regimen": "Cobertura Empírica Inicial na 1ª Hora",
        "items": [
          "Foco pulmonar comunitário grave: Ceftriaxona 2 g IV 24/24h + Claritromicina 500 mg IV 12/12h (ou Azitromicina 500 mg IV 24/24h).",
          "Foco abdominal / biliar: Ceftriaxona 2 g IV 24/24h + Metronidazol 500 mg IV 8/8h (ou Piperacilina-Tazobactam 4,5 g IV 6/6h em infusão estendida).",
          "Foco urinário / pielonefrite: Ceftriaxona 2 g IV 24/24h (ou Amicacina 15–20 mg/kg IV 1x/dia / Meropenem 1 g IV 8/8h se risco para ESBL).",
          "Sepse nosocomial / neutropenia febril / choque grave com risco de MDR: Cefepima 2 g IV 8/8h ou Meropenem 1 a 2 g IV 8/8h + Vancomicina 25–30 mg/kg ataque (seguido de 15–20 mg/kg 12/12h)."
        ]
      }
    ],
    "linked_drug_terms": [
      "Noradrenalina",
      "Ceftriaxona",
      "Piperacilina",
      "Meropenem",
      "Vancomicina",
      "Hidrocortisona"
    ],
    "red_flags": [
      "Lactato em ascensão ou sem clareamento >= 10–20% após 2–4 horas de ressuscitação.",
      "Foco infeccioso cirúrgico não drenado (fasciíte necrosante, peritonite, empiema, obstrução ureteral infectada) — drenar em até 6–12 horas!",
      "Sinais de sobrecarga volêmica / congestão pulmonar (estertores, linhas B difusas no POCUS) — guiar fluidos por variáveis dinâmicas (elevação passiva das pernas, variação de pressão de pulso)."
    ],
    "source_refs": [
      {
        "label": "Surviving Sepsis Campaign Guidelines 2021 (Intensive Care Med)",
        "url": "https://link.springer.com/article/10.1007/s00134-021-06506-y"
      },
      {
        "label": "ILAS - Instituto Latino Americano de Sepse",
        "url": "https://ilas.org.br/"
      }
    ],
    "follow_up": [
      {
        "title": "Monitorização e Metas nas Primeiras 24 Horas",
        "items": [
          "Repetir lactato sérico a cada 2 a 4 horas até normalização (< 2,0 mmol/L ou redução >= 20% a cada 2 horas).",
          "Meta de PAM >= 65 mmHg, débito urinário >= 0,5 mL/kg/h e tempo de enchimento capilar < 2 segundos.",
          "Reavaliação diária do antimicrobiano (descalonamento orientado por culturas com 48-72h).",
          "Procurar e tratar controle de foco infeccioso em até 6 a 12 horas (drenagem de abcesso, troca de cateter, desobstrução de via biliar/urinária)."
        ]
      }
    ],
    "special_situations": [
      {
        "title": "Situações Especiais e Populações Vulneráveis",
        "items": [
          "Paciente com ICC grave ou DRC dialítica: titular alíquotas menores de cristaloide (ex.: 250-500 mL) guiadas por ultrassom pulmonar (POCUS) e variação de pulso para evitar congestão iatrogênica.",
          "Sepse de foco indeterminado: rastreio imediato de SNC com punção lombar se alteração neurológica e afastar foco endovascular em usuários de próteses ou drogas injetáveis."
        ]
      }
    ],
    "prophylaxis": [
      {
        "title": "Profilaxia de Úlcera de Estresse e TEV",
        "items": [
          "Profilaxia de TEV mecânica e farmacológica: Enoxaparina 40 mg SC 1x/dia (ou heparina não fracionada 5.000 UI SC 8/8h) iniciada assim que cessar sangramento ativo grave.",
          "Profilaxia de úlcera de estresse: Omeprazol 40 mg IV 1x/dia indicada apenas se fatores de risco (ventilação mecânica > 48h ou coagulopatia grave).",
          "Prevenção de infecção associada a dispositivos: protocolo de higiene oral com clorexidina e checagem diária de necessidade de cateteres venosos centrais e sonda vesical."
        ]
      }
    ]
  },
  {
    "id": "seed-iam-supra",
    "slug": "sindrome-coronariana-aguda-iam-com-supra-st",
    "title": "Síndrome Coronariana Aguda: IAM com Supra de ST (IAMCSST)",
    "category": "Cardiologia",
    "setting": "Emergência / Sala Vermelha / Hemodinâmica",
    "status": "verified",
    "linked_recipe_slugs": [
      "prescricao-iam-com-supra"
    ],
    "summary": "Diagnóstico em até 10 minutos e terapia de reperfusão coronariana imediata (Angioplastia Primária ou Fibrinólise) segundo diretrizes SBC / ESC / AHA.",
    "suspicion": [
      {
        "title": "Apresentação Clínica e Critérios Eletrocardiográficos",
        "items": [
          "Dor ou opressão retroesternal em aperto > 20 minutos, irradiada para membro superior esquerdo, mandíbula ou epigástrio, associada a sudorese fria, náuseas ou dispneia (atenção a equivalentes isquêmicos em idosos, diabéticos e mulheres).",
          "Supradesnivelamento do segmento ST no ponto J em >= 2 derivações contíguas: >= 1 mm em todas as derivações, exceto V2–V3 (onde exige >= 2 mm em homens >= 40 anos, >= 2,5 mm em homens < 40 anos ou >= 1,5 mm em mulheres).",
          "Bloqueio de ramo esquerdo (BRE) novo ou presumivelmente novo com critérios de Sgarbossa positivos (>= 3 pontos) ou supra isolado de V3R–V4R (infarto de VD) / V7–V9 (infarto dorsal)."
        ]
      }
    ],
    "initial_actions": [
      {
        "title": "Abordagem nos Primeiros 10 Minutos (MOV + ECG)",
        "items": [
          "Monitorização cardíaca contínua (desfibrilador ao lado), Oximetria de pulso (O2 suplementar APENAS se SpO2 < 90%) e 2 acessos venosos periféricos.",
          "ECG de 12 derivações realizado e laudado em até 10 minutos da chegada (solicitar V3R, V4R se infarto inferior; V7, V8, V9 se infra de V1–V3).",
          "AAS 300 mg VO (mastigar e engolir imediatamente) — salvo alergia verdadeira ou sangramento ativo grave.",
          "Segundo antiagregante plaquetário (Dupla Antiagregação - DAPT) conforme estratégia de reperfusão definida."
        ]
      }
    ],
    "exams": [
      {
        "title": "Exames Complementares (Não devem atrasar a reperfusão!)",
        "items": [
          "Troponina cardíaca de alta sensibilidade (coletar na admissão, mas NÃO aguardar resultado para indicar reperfusão no IAMCSST).",
          "Creatinina, ureia, eletrólitos (K+, Mg2+), glicemia, hemograma, coagulograma e perfil lipídico.",
          "Radiografia de tórax no leito (afastar alargamento de mediastino se suspeita de dissecção aórtica)."
        ]
      }
    ],
    "decision_flow": [
      {
        "if": "Tempo porta-balão estimado <= 120 minutos (ou <= 90 min em centro com hemodinâmica)",
        "then": "Indicar Angioplastia Primária (ICP). Associar Ticagrelor 180 mg VO ataque (ou Prasugrel 60 mg se anatomia conhecida, ou Clopidogrel 600 mg VO) + Heparina Não Fracionada 70–100 UI/kg IV (ou Enoxaparina)."
      },
      {
        "if": "Angioplastia indisponível em <= 120 min E sintomas há < 12 horas sem contraindicações",
        "then": "Indicar Fibrinólise em até 10 min do diagnóstico (tempo porta-agulha): Tenecteplase (TNK-tPA) bolus único IV ajustado ao peso (30 a 50 mg) + Clopidogrel 300 mg VO (se <= 75 anos; se > 75 anos usar 75 mg sem ataque) + Enoxaparina 30 mg IV bolus seguido de 1 mg/kg SC 12/12h."
      },
      {
        "if": "Infarto de Ventrículo Direito (supra em DII, DIII, aVF + V3R/V4R) com hipotensão",
        "then": "CONTRAINDICADO o uso de nitratos, morfina e diuréticos! Realizar expansão volêmica cautelosa com SF 0,9% ou Ringer Lactato 250–500 mL."
      }
    ],
    "treatment": [
      {
        "title": "Terapia Farmacológica Adjuvante",
        "regimen": "Antiagregação, Anticoagulação e Estatinas de Alta Potência",
        "items": [
          "AAS: 300 mg VO ataque, seguido de 100 mg/dia.",
          "Inibidor P2Y12: Ticagrelor 180 mg ataque (manutenção 90 mg 12/12h) ou Clopidogrel 300–600 mg ataque (manutenção 75 mg/dia).",
          "Anticoagulação (Enoxaparina): < 75 anos: 30 mg IV bolus + 1 mg/kg SC 12/12h (máx. 100 mg nas 2 primeiras doses). >= 75 anos: SEM bolus IV, 0,75 mg/kg SC 12/12h. Se ClCr < 30 mL/min: 1 mg/kg SC 1x/dia.",
          "Estatina de alta potência precoce: Atorvastatina 80 mg VO 1x/dia (ou Rosuvastatina 40 mg/dia).",
          "Controle de dor/congestão: Nitroglicerina IV (Tridil) se dor persistente, HAS ou congestão pulmonar (evitar se PAS < 90, uso de sildenafil em 24–48h ou IAM de VD). Morfina 2–4 mg IV apenas em dor refratária intensa."
        ]
      }
    ],
    "linked_drug_terms": [
      "AAS",
      "Clopidogrel",
      "Enoxaparina",
      "Atorvastatina",
      "Nitroglicerina",
      "Morfina"
    ],
    "red_flags": [
      "Critérios de falha de reperfusão 60–90 min após fibrinólise (redução do supra < 50% na derivação de maior amplitude ou dor persistente) -> Transferência imediata para Angioplastia de Resgate!",
      "Contraindicações absolutas à fibrinólise: AVC hemorrágico prévio em qualquer época, AVC isquêmico nos últimos 3 meses, neoplasia ou MAV intracraniana, sangramento ativo interno, suspeita de dissecção de aorta, trauma craniofacial grave nos últimos 3 meses.",
      "Choque cardiogênico (Killip IV) -> Revascularização de emergência independente do tempo de evolução."
    ],
    "source_refs": [
      {
        "label": "Diretriz da Sociedade Brasileira de Cardiologia sobre IAMCSST",
        "url": "https://abccardiol.org/"
      },
      {
        "label": "ESC Guidelines for the Management of Acute Coronary Syndromes 2023",
        "url": "https://www.escardio.org/Guidelines"
      }
    ],
    "follow_up": [
      {
        "title": "Seguimento Hospitalar e Metas Pós-Reperfusão",
        "items": [
          "Internação em Unidade Coronariana (UCO) por no mínimo 24 a 48 horas.",
          "Ecocardiograma transtorácico nas primeiras 24 a 48h para avaliar fração de ejeção de VE, complicações mecânicas e trombo apical.",
          "Troponina sérica seriada a cada 6 a 8 horas até pico e curva descendente.",
          "Manutenção de dupla antiagregação plaquetária por 12 meses, estatina de alta potência (Atorvastatina 80 mg), betabloqueador e IECA/BRA."
        ]
      }
    ],
    "special_situations": [
      {
        "title": "Situações Especiais e Complicações Mecânicas",
        "items": [
          "IAM de Ventrículo Direito (derivações V3R e V4R com supra): contraindicação absoluta a Nitratos, Morfina e Diuréticos; ressuscitar com volume (cristaloides) para manter pré-carga.",
          "Sopro sistólico novo associado a choque cardiogênico: alta suspeita de rotura de músculo papilar ou CIV; indicar ecocardiograma de urgência e balão intra-aórtico / cirurgia de emergência.",
          "Paciente com mais de 75 anos candidato a trombólise: reduzir a dose de Tenecteplase pela metade (50%) e não administrar dose de ataque venosa de Enoxaparina."
        ]
      }
    ],
    "prophylaxis": [
      {
        "title": "Prevenção Secundária Cardiovascular Pós-IAM",
        "items": [
          "Dupla antiagregação plaquetária (DAPT): AAS 100 mg/dia indefinido + Ticagrelor 90 mg 12/12h (ou Clopidogrel 75 mg/dia) por 12 meses.",
          "Estatina de alta potência: Atorvastatina 80 mg/dia visando meta de LDL < 50 mg/dL e redução >= 50% do basal.",
          "Bloqueio neuro-hormonal: Betabloqueador (Metoprolol ou Carvedilol) + IECA/BRA titulados em 24-48h se estabilidade hemodinâmica.",
          "Imunização anual contra influenza e pneumococo recomendada na alta."
        ]
      }
    ]
  },
  {
    "id": "seed-avc-isquemico",
    "slug": "avc-isquemico-agudo-trombolise-manejo",
    "title": "AVC Isquêmico Agudo e Trombólise Endovenosa",
    "category": "Neurologia",
    "setting": "Emergência / Unidade de AVC",
    "status": "verified",
    "summary": "Código AVC: avaliação neurológica rápida (NIHSS), neuroimagem imediata e recanalização com Alteplase / Tenecteplase na janela terapêutica.",
    "suspicion": [
      {
        "title": "Reconhecimento Precoce (Escala SAMU / FAST)",
        "items": [
          "Déficit neurológico focal de início súbito: assimetria facial, paresia/plegia braquiocrural, afasia/disartria, hemianopsia, ataxia aguda ou alteração súbita de consciência.",
          "Definir com precisão o LKW (Last Known Well): horário exato em que o paciente foi visto assintomático pela última vez."
        ]
      }
    ],
    "initial_actions": [
      {
        "title": "Metas de Tempo do Código AVC (Porta-Agulha <= 60 min)",
        "items": [
          "1. Glicemia capilar imediata no acolhimento (único exame laboratorial obrigatório antes do trombolítico em pacientes sem uso de anticoagulantes; corrigir se < 60 mg/dL).",
          "2. Aplicar escala NIHSS (graduar gravidade de 0 a 42) e verificar sinais vitais.",
          "3. Tomografia de Crânio sem contraste em até 20 minutos da chegada (laudada em até 45 min) para excluir hemorragia intracraniana ou hipodensidade extensa (> 1/3 do território da ACM).",
          "4. Angiotomografia arterial de vasos cervicais e intracranianos se suspeita de oclusão de grande vaso (NIHSS >= 6) para avaliar Trombectomia Mecânica (janela até 6–24h)."
        ]
      }
    ],
    "exams": [
      {
        "title": "Propedêutica de Emergência",
        "items": [
          "Glicemia capilar, TC de crânio sem contraste e Angio-TC de carótidas/vertebrais e polígono de Willis.",
          "Coagulograma (INR, TTPa), hemograma com plaquetas, creatinina, ureia, sódio, potássio, troponina e ECG de 12 derivações (não aguardar laboratório para trombolisar, salvo suspeita de coagulopatia ou uso de varfarina/heparina)."
        ]
      }
    ],
    "decision_flow": [
      {
        "if": "Delta-T (início dos sintomas) <= 4,5 horas, sem sangramento na TC e PA < 185x110 mmHg",
        "then": "Iniciar Trombólise IV: Alteplase (rt-PA) 0,9 mg/kg (dose máxima 90 mg), sendo 10% em bolus IV em 1 minuto e os 90% restantes em bomba de infusão em 60 minutos."
      },
      {
        "if": "Candidato à trombólise com PA >= 185/110 mmHg",
        "then": "Reduzir PA antes de iniciar rt-PA: Metoprolol 5 mg IV lento ou Nitroprussiato de Sódio / Labetalol / Nicardipina até PA < 185/110 mmHg; manter PA <= 180/105 mmHg nas primeiras 24h pós-trombólise."
      },
      {
        "if": "Não candidato à trombólise IV",
        "then": "Hipertensão permissiva nas primeiras 24–48h (só reduzir PA se >= 220/120 mmHg ou se houver emergência hipertensiva associada como IAM, dissecção aórtica ou EAP), reduzindo ~15% nas primeiras 24h. Iniciar AAS 100–300 mg VO/SNE."
      }
    ],
    "treatment": [
      {
        "title": "Cuidados Pós-Trombólise e Prevenção Secundária Precoce",
        "regimen": "Vigilância Neurointensiva (Primeiras 24 Horas)",
        "items": [
          "PROIBIDO administrar AAS, clopidogrel, heparinas ou anticoagulantes orais nas primeiras 24 horas após Alteplase (aguardar TC de controle de 24h sem sangramento).",
          "Aferir PA e exame neurológico a cada 15 min nas primeiras 2h, a cada 30 min nas 6h seguintes e a cada 1h até completar 24h.",
          "Evitar passagem de sonda nasoenteral, sonda vesical de demora ou punção arterial/central nas primeiras 24h pós-rt-PA.",
          "Se AIT de alto risco (ABCD2 >= 4) ou AVC menor não trombolisado (NIHSS <= 3): DAPT com AAS 100 mg + Clopidogrel 75 mg (ataque 300 mg) por 21 dias + Estatina de alta potência (Atorvastatina 80 mg/dia)."
        ]
      }
    ],
    "linked_drug_terms": [
      "Alteplase",
      "AAS",
      "Clopidogrel",
      "Atorvastatina",
      "Nitroprussiato de Sódio"
    ],
    "red_flags": [
      "Piora neurológica aguda (aumento >= 4 pontos no NIHSS), cefaleia súbita intensa, náuseas/vômitos ou pico hipertensivo durante a infusão de Alteplase -> SUSPENDER INFUSÃO IMEDIATAMENTE e realizar TC de crânio de urgência (suspeita de transformação hemorrágica).",
      "Contraindicações ao rt-PA: sintomas > 4,5h (sem mismatch em RM/perfusão), TC com hemorragia, AVC isquêmico ou TCE grave nos últimos 3 meses, cirurgia intracraniana/espinhal nos últimos 3 meses, plaquetas < 100.000/mm³, INR > 1,7, uso de DOAC nas últimas 48h."
    ],
    "source_refs": [
      {
        "label": "AHA/ASA Guidelines for the Early Management of Acute Ischemic Stroke",
        "url": "https://www.stroke.org/"
      },
      {
        "label": "Sociedade Brasileira de AVC (SBAVC)",
        "url": "https://avc.org.br/"
      }
    ],
    "follow_up": [
      {
        "title": "Vigilância em Unidade de AVC e Cuidados Pós-Trombólise",
        "items": [
          "Exame neurológico (NIHSS) e sinais vitais a cada 15 min nas primeiras 2 horas, a cada 30 min por 6 horas e a cada 1 hora até completar 24 horas.",
          "Controle pressórico rigoroso: manter PA < 180/105 mmHg nas primeiras 24 horas pós-trombólise (usar Nitroprussiato de Sódio se necessário).",
          "TC de crânio de controle em 24 horas obrigatória antes de iniciar antiagregante plaquetário (AAS) ou anticoagulante.",
          "Investigação etiológica: Ecocardiograma transtorácico/transesofágico, Holter 24h para FA paroxística e Doppler de carótidas e vertebrais ou angio-TC arterial cervical."
        ]
      }
    ],
    "special_situations": [
      {
        "title": "Situações Especiais e Complicações Agudas",
        "items": [
          "Piora neurológica súbita (queda >= 4 pontos no NIHSS) ou cefaleia intensa pós-trombolítico: interromper infusão imediatamente, solicitar TC de crânio urgente para afastar transformação hemorrágica e dosar fibrinogênio.",
          "Angioedema orofaríngeo associado ao rt-PA (mais comum em usuários de IECA): suspender infusão, administrar Hidrocortisona, Anti-histamínico e preparar intubação precoce se estridor.",
          "Despertar com déficit ('Wake-up stroke'): se ressonância magnética (mismatch DWI/FLAIR) ou TC de perfusão disponíveis, pode ser candidato a trombólise ou trombectomia mecânica estendida até 24h."
        ]
      }
    ],
    "linked_recipe_slugs": [
      "prescricao-avc-isquemico"
    ],
    "prophylaxis": [
      {
        "title": "Prevenção Secundária e Profilaxia Clínica",
        "items": [
          "Antiagregação: AAS 100 a 300 mg/dia iniciado 24h após trombólise (ou imediatamente se não trombolisado). Em AIT/AVC menor de alto risco (ABCD2 >= 4 ou NIHSS <= 3), fazer DAPT precoce (AAS + Clopidogrel) por 21 dias.",
          "Estatina de alta potência: Atorvastatina 80 mg/dia para meta de LDL < 50 mg/dL.",
          "Profilaxia de TEV: compressão pneumática intermitente nas primeiras 24h pós-trombólise; enoxaparina profilática liberada somente após 24h com TC de crânio sem sangramento.",
          "Prevenção de broncoaspiração: teste formal de deglutição antes de qualquer oferta oral."
        ]
      }
    ]
  },
  {
    "id": "seed-cad",
    "slug": "cetoacidose-diabetica-e-estado-hiperglicemico-hiperosmolar",
    "title": "Cetoacidose Diabética (CAD) e Estado Hiperglicêmico Hiperosmolar (EHH)",
    "category": "Endocrinologia e Metabologia",
    "setting": "Emergência / UTI",
    "status": "verified",
    "summary": "Protocolo dos 3 Pilares (Volume, Potássio e Insulina Regular IV) para manejo seguro das emergências hiperglicêmicas agudas (Consenso ADA / EASD / SBD 2024).",
    "suspicion": [
      {
        "title": "Critérios Diagnósticos (CAD vs. EHH)",
        "items": [
          "CAD: Glicemia >= 200 mg/dL (ou história prévia de DM) + Cetonemia (beta-hidroxibutirato >= 3,0 mmol/L ou cetonúria >= 2+) + Acidose metabólica (pH < 7,30 e/ou HCO3- < 18 mEq/L) com Ânion Gap elevado (> 10–12).",
          "EHH: Glicemia severa (> 600 mg/dL) + Osmolalidade sérica efetiva > 300–320 mOsm/kg + Ausência de acidose significativa (pH > 7,30, HCO3- >= 15 mEq/L) e cetonemia discreta ou ausente.",
          "Investigar sempre fatores precipitantes (5 Is): Infecção (ITU, pneumonia), Infarto (IAM, AVC), Insulina (omissão/má adesão), Intoxicação/medicamentos (corticoides, iSGLT2 — atenção à CAD euglicêmica!), Gestação."
        ]
      }
    ],
    "initial_actions": [
      {
        "title": "Sequência Obrigatória nas Primeiras Horas",
        "items": [
          "1º PILAR - HIDRATAÇÃO VENOSA (iniciar ANTES da insulina): 1.000 a 1.500 mL (15–20 mL/kg) de cristaloide (Ringer Lactato ou SF 0,9%) na 1ª hora para restaurar volemia e perfusão renal.",
          "2º PILAR - CHECAR POTÁSSio (K+) ANTES DE INICIAR INSULINA: a insulina desloca K+ para o intracelular e pode causar parada cardíaca por hipocalemia se K+ inicial < 3,3 mEq/L!",
          "3º PILAR - INSULINOTERAPIA IV (somente após K+ >= 3,3 mEq/L): Insulina Regular em bomba de infusão contínua 0,1 UI/kg/h (ou bolus 0,1 UI/kg seguido de 0,1 UI/kg/h)."
        ]
      }
    ],
    "exams": [
      {
        "title": "Monitorização Laboratorial Seriada",
        "items": [
          "Glicemia capilar de 1/1h enquanto em infusão contínua de insulina.",
          "Gasometria venosa, sódio, potássio, cloro, fósforo, magnésio e função renal a cada 2 a 4 horas.",
          "Calcular o Sódio Corrigido pela glicose: Na corrigido = Na medido + 0,024 x (Glicose - 100)."
        ]
      }
    ],
    "decision_flow": [
      {
        "if": "Potássio sérico inicial < 3,3 mEq/L",
        "then": "SUSPENDER / NÃO INICIAR INSULINA! Repor 20 a 40 mEq/h de KCl IV diluído até que o K+ sérico seja >= 3,3 mEq/L."
      },
      {
        "if": "Potássio sérico entre 3,3 e 5,0 mEq/L e diurese presente (>= 50 mL/h)",
        "then": "Iniciar Insulina Regular IV E adicionar 20 a 30 mEq de KCl em cada litro de solução de hidratação para manter K+ entre 4,0 e 5,0 mEq/L."
      },
      {
        "if": "Glicemia atingir <= 200 a 250 mg/dL na CAD (ou <= 300 mg/dL no EHH) com acidose ainda presente",
        "then": "NÃO desligar a bomba de insulina! Reduzir a infusão de insulina para 0,02–0,05 UI/kg/h E associar Soro Glicosado 5% (ou 10%) na hidratação para manter glicemia entre 150–200 mg/dL até resolução da cetoacidose."
      }
    ],
    "treatment": [
      {
        "title": "Critérios de Resolução e Transição para Insulina Subcutânea",
        "regimen": "Fechamento do Ânion Gap e Overlap de Insulina Basal",
        "items": [
          "Critérios de resolução da CAD: Glicemia < 200 mg/dL + pelo menos dois dos seguintes: HCO3- >= 15–18 mEq/L, pH venoso > 7,30 e Ânion Gap normalizado (<= 12 mEq/L).",
          "Transição segura para SC: Aplicar a primeira dose de Insulina Basal subcutânea (NPH ou Glargina) 1 a 2 HORAS ANTES de desligar a bomba de infusão venosa de insulina regular (evita rebote imediato da cetoacidose!).",
          "Uso de Bicarbonato de Sódio (NaHCO3): restrito apenas a acidemia extrema com pH < 6,90 (100 mEq diluídos em 400 mL de água destilada + 20 mEq KCl infundidos em 2 horas)."
        ]
      }
    ],
    "linked_drug_terms": [
      "Insulina Regular",
      "Cloreto de Potássio",
      "Bicarbonato de Sódio"
    ],
    "red_flags": [
      "Queda da glicemia > 75–100 mg/dL/h ou queda abrupta da osmolalidade (> 3–8 mOsm/kg/h) -> Risco de Edema Cerebral (cefaleia, bradicardia, hipertensão, rebaixamento do sensório), especialmente em crianças e jovens.",
      "Desligar a insulina IV precocemente apenas porque a glicemia normalizou (sem ter fechado o Ânion Gap e corrigido o pH)."
    ],
    "source_refs": [
      {
        "label": "ADA/EASD Consensus Report on Hyperglycemic Crises in Adults 2024",
        "url": "https://diabetesjournals.org/care"
      },
      {
        "label": "Diretriz da Sociedade Brasileira de Diabetes (SBD)",
        "url": "https://diretriz.diabetes.org.br/"
      }
    ],
    "follow_up": [
      {
        "title": "Critérios de Resolução e Transição para Subcutâneo",
        "items": [
          "Critérios de resolução da CAD: Glicemia < 200 mg/dL associada a pelo menos dois de: bicarbonato sérico >= 18 mEq/L, pH venoso > 7,30 e ânion gap normalizado (<= 12 mEq/L).",
          "Transição para insulina subcutânea: administrar insulina basal (NPH ou Glargina) 2 horas ANTES de desligar a bomba de infusão contínua para evitar hiperglicemia e cetoacidose de rebote.",
          "Glicemia capilar a cada 1 hora durante a bomba; eletrólitos (K+, Na+, gasometria) a cada 2 a 4 horas.",
          "Ajuste na reposição de fluidos: adicionar SG 5% ao cristaloide assim que a glicemia atingir 200–250 mg/dL para permitir manutenção da insulina sem causar hipoglicemia."
        ]
      }
    ],
    "special_situations": [
      {
        "title": "Situações Especiais e Armadilhas Graves",
        "items": [
          "Cetoacidose Diabética Euglicêmica (associada a inibidores de SGLT2 - Dapagliflozina / Empagliflozina): glicemia frequentemente < 200 mg/dL mas com acidose grave e cetonúria; exige infusão simultânea de SG 5% e insulina.",
          "Hipocalemia grave na admissão (K+ < 3,3 mEq/L): NÃO iniciar insulina imediatamente; repor K+ vigorosamente (20-40 mEq/h) até K+ >= 3,3 mEq/L para evitar arritmia ventricular fatal e parada cardíaca.",
          "Cálculo correto do sódio corrigido: Na medido + 1,6 * ((Glicemia - 100) / 100) para definir a tonicidade do fluido."
        ]
      }
    ],
    "linked_recipe_slugs": [
      "prescricao-cad"
    ],
    "prophylaxis": [
      {
        "title": "Prevenção de Recorrência e Complicações",
        "items": [
          "Transição segura para insulina subcutânea: aplicar insulina basal NPH/Glargina 2 horas antes de desligar a bomba de infusão contínua de insulina regular para evitar hiperglicemia de rebote.",
          "Profilaxia de TEV: Enoxaparina 40 mg SC 1x/dia durante o período de desidratação grave e hiperosmolaridade.",
          "Educação em diabetes: orientação sobre manejo em 'dias de doença', verificação frequente de glicemia capilar e nunca suspender a insulina basal mesmo se inapetência."
        ]
      }
    ]
  },
  {
    "id": "seed-anafilaxia",
    "slug": "anafilaxia-e-choque-anafilatico-manejo",
    "title": "Anafilaxia e Choque Anafilático",
    "category": "Emergência e UTI",
    "setting": "Pronto-Socorro / Enfermaria / Ambulatório",
    "status": "verified",
    "summary": "Reconhecimento clínico imediato e administração precoce de Epinefrina Intramuscular como única intervenção modificadora de mortalidade (WAO / EAACI).",
    "suspicion": [
      {
        "title": "Critérios Clínicos de Anafilaxia (Início em minutos a horas)",
        "items": [
          "Critério 1: Início agudo de acometimento cutâneo-mucoso (urticária generalizada, prurido, flushing, angioedema de lábios/língua/úvula) E pelo menos um dos seguintes: (a) Comprometimento respiratório (dispneia, broncoespasmo, estridor, hipoxemia) OU (b) Hipotensão / sinais de hipoperfusão (síncope, hipotonia, incontinência).",
          "Critério 2: Hipotensão aguda (PAS < 90 mmHg em adultos ou queda > 30% da basal) ou broncoespasmo/laringoespasmo isolado após exposição a alérgeno sabidamente conhecido para aquele paciente, mesmo sem lesões de pele."
        ]
      }
    ],
    "initial_actions": [
      {
        "title": "Conduta Imediata de Primeira Linha",
        "items": [
          "1. ADRENALINA (EPINEFRINA) INTRAMUSCULAR IMEDIATA na face anterolateral da coxa (músculo vasto lateral) — solução 1:1.000 (1 mg/mL pura): Adultos: 0,3 a 0,5 mg (0,3 a 0,5 mL IM). Crianças: 0,01 mg/kg (máx. 0,3 mg IM).",
          "2. Remover o agente desencadeante (interromper infusão de antibiótico, contraste, hemocomponente ou látex).",
          "3. Posicionar o paciente em decúbito dorsal com membros inferiores elevados (Trendelenburg modificado) — NUNCA colocar o paciente em pé ou sentado subitamente (risco de morte súbita por síndrome do ventrículo vazio).",
          "4. Oxigênio suplementar a 100% sob máscara não reinalante (10–15 L/min) e preparar material de via aérea difícil precoce se houver rouquidão, estridor ou edema de língua/orofaringe.",
          "5. Expansão volêmica rápida com SF 0,9% ou Ringer Lactato: 1.000 a 2.000 mL IV aberto em adultos (20 mL/kg em crianças) se hipotensão."
        ]
      }
    ],
    "exams": [
      {
        "title": "Diagnóstico é Essencialmente Clínico!",
        "items": [
          "Nenhum exame deve atrasar a aplicação de Adrenalina IM.",
          "Triptase sérica pode ser coletada entre 15 min e 3 horas do início dos sintomas para confirmação retrospectiva em casos duvidosos (ex.: anafilaxia intraoperatória)."
        ]
      }
    ],
    "decision_flow": [
      {
        "if": "Sem resposta ou resposta parcial após 5 a 15 minutos da 1ª dose de Adrenalina IM",
        "then": "Repetir a dose de Adrenalina IM (0,3 a 0,5 mg no adulto) a cada 5 a 15 minutos."
      },
      {
        "if": "Choque refratário após 2 a 3 doses de Adrenalina IM + reposição volêmica",
        "then": "Iniciar infusão contínua de Adrenalina IV em bomba (0,05 a 0,2 mcg/kg/min) sob monitorização contínua.",
        "items": []
      },
      {
        "if": "Paciente em uso crônico de Betabloqueador com hipotensão refratária à Adrenalina",
        "then": "Administrar Glucagon 1 a 5 mg IV lento em 5 minutos (crianças: 20–30 mcg/kg, máx 1 mg), seguido de infusão de 5–15 mcg/min."
      }
    ],
    "treatment": [
      {
        "title": "Terapias de Segunda Linha (Adjuvantes - NUNCA substituem a Adrenalina)",
        "regimen": "Anti-histamínicos, Corticosteroides e Broncodilatadores",
        "items": [
          "Anti-histamínico H1 (alívio apenas de urticária/prurido): Difenidramina 25–50 mg IV/IM ou Prometazina 25 mg IM (ou Cetirizina/Loratadina 10 mg VO em casos estabilizados).",
          "Anti-histamínico H2 (opcional): Famotidina 20 mg IV.",
          "Broncodilatador (se broncoespasmo persistente): Salbutamol (Fenoterol) 4 a 8 jatos com espaçador ou nebulização contínua.",
          "Corticosteroide (ação tardia em 4–6h; uso opcional para sintomas prolongados/asma): Metilprednisolona 1 a 2 mg/kg IV (máx 125 mg) ou Hidrocortisona 200–300 mg IV.",
          "Observação hospitalar mínima de 4 a 8 horas após resolução completa (ou 12–24h se reação grave, hipotensão ou necessidade de >= 2 doses de adrenalina, pelo risco de reação bifásica)."
        ]
      }
    ],
    "linked_drug_terms": [
      "Adrenalina",
      "Hidrocortisona",
      "Salbutamol",
      "Glucagon"
    ],
    "red_flags": [
      "ERRO FATAL: Aplicar adrenalina 1:1.000 (1 mg/mL) pura em bolus endovenoso no paciente com pulso (causa crise hipertensiva maligna, IAM e fibrilação ventricular).",
      "ERRO FATAL: Tratar anafilaxia apenas com Prometazina (Fenergan) e Hidrocortisona sem aplicar Adrenalina IM.",
      "Estridor laríngeo ou voz abafada ('batata quente'): intubação orotraqueal imediata com o médico mais experiente (videolaringoscopia + kit de cricotireoidostomia pronto)."
    ],
    "source_refs": [
      {
        "label": "World Allergy Organization (WAO) Anaphylaxis Guidance 2020",
        "url": "https://www.worldallergyorganizationjournal.org/"
      }
    ],
    "follow_up": [
      {
        "title": "Observação Hospitalar e Prevenção de Reação Bifásica",
        "items": [
          "Observação hospitalar mínima de 6 a 8 horas para anafilaxia moderada e de 12 a 24 horas para anafilaxia grave / choque anafilático devido ao risco de reação bifásica (recidiva em até 72 horas sem nova exposição).",
          "Prescrição de alta: Prednisona 40 a 60 mg/dia VO por 3 a 5 dias + Anti-histamínico H1 não sedante (Loratadina 10 mg ou Fexofenadina 180 mg) por 5 dias.",
          "Encaminhamento para especialista em Alergia e Imunologia para identificação do alérgeno desencadeante (fármacos, alimentos, venenos de insetos).",
          "Treinamento do paciente e familiares para uso de auto-injetor de adrenalina (EpiPen) se anafilaxia idiopática ou a venenos de himenópteros."
        ]
      }
    ],
    "special_situations": [
      {
        "title": "Situações Especiais e Refratariedade",
        "items": [
          "Paciente em uso crônico de Betabloqueador com choque refratário a doses repetidas de Adrenalina: administrar Glucagon 1 a 5 mg IV em bolus lento seguido de infusão de 5 a 15 mcg/min (ativa adenilato ciclase por via independente dos receptores beta-adrenérgicos).",
          "Broncoespasmo grave persistente após adrenalina: associar nebulização com Salbutamol e Ipratrópio e considerar Sulfato de Magnésio 2g IV em 20 min.",
          "Gestante com anafilaxia: posicionamento obrigatório em decúbito lateral esquerdo para descompressão da veia cava inferior e manutenção de perfusão uteroplacentária; dose de adrenalina padrão inalterada."
        ]
      }
    ],
    "linked_recipe_slugs": [
      "prescricao-anafilaxia"
    ],
    "prophylaxis": [
      {
        "title": "Profilaxia de Crises Futuras e Reação Bifásica",
        "items": [
          "Observação clínica mínima: manter em observação por pelo menos 6 a 8 horas (ou 12 a 24 horas se anafilaxia grave/bifásica).",
          "Prescrição de alta: prescrever autoinjetor de adrenalina (EpiPen / similar) se disponível e encaminhar para avaliação alergológica formal.",
          "Plano de ação escrito: instruir o paciente e familiares a identificar sintomas precoces e injetar adrenalina IM no vasto lateral da coxa sem hesitar.",
          "Evitar estritamente o alérgeno desencadeante identificado (medicamento, alimento, veneno de himenópteros)."
        ]
      }
    ]
  },
  {
    "id": "seed-eme",
    "slug": "estado-de-mal-epileptico-convulsivo",
    "title": "Estado de Mal Epiléptico (EME) Convulsivo",
    "category": "Neurologia",
    "setting": "Emergência / Sala Vermelha / UTI",
    "status": "verified",
    "summary": "Manejo escalonado cronometrado (0–5 min, 5–20 min, 20–40 min e > 40 min) para crises convulsivas >= 5 minutos ou crises subentrantes sem recuperação de consciência (AES / Neurocritical Care Society).",
    "suspicion": [
      {
        "title": "Definição Operacional (Tempo T1 = 5 minutos)",
        "items": [
          "Crise tônico-clônica generalizada contínua com duração >= 5 minutos.",
          "Duas ou mais crises sequenciais entre as quais não há recuperação completa do nível de consciência basal."
        ]
      }
    ],
    "initial_actions": [
      {
        "title": "Fase de Estabilização (0 a 5 minutos)",
        "items": [
          "Proteger o paciente de traumas, posicionar em decúbito lateral se possível, aspirar vias aéreas, ofertar O2 por máscara não reinalante (NÃO introduzir objetos na boca!).",
          "Glicemia capilar imediata: se < 60 mg/dL, administrar Tiamina 100 mg IV seguida de 40–50 mL de Glicose a 50% IV (em crianças: 2–4 mL/kg de SG 10% ou 25%).",
          "Monitorizar ECG, oximetria, PA e obter acesso venoso periférico (se sem acesso em 1–2 min, usar via Intramuscular para o benzodiazepínico!)."
        ]
      }
    ],
    "exams": [
      {
        "title": "Investigação Etiológica Paralela",
        "items": [
          "Glicemia, sódio, cálcio iônico, magnésio, ureia, creatinina, gasometria arterial, CPK, hemograma, rastreio toxicológico e nível sérico de anticonvulsivantes.",
          "TC de crânio após estabilização da crise (e punção lombar se febre/suspeita de meningoencefalite).",
          "EEG contínuo para descartar Estado de Mal Não-Convulsivo caso o paciente não desperte em 20–30 minutos após cessarem os abalos motores."
        ]
      }
    ],
    "decision_flow": [
      {
        "if": "1ª LINHA (5 a 20 minutos) - Fase de Benzodiazepínico",
        "then": "COM ACESSO VENOSO: Diazepam 10 mg IV lento (até 5 mg/min; repetir 1x após 5 min se necessário; pediatria: 0,2–0,3 mg/kg, máx 10 mg). SEM ACESSO VENOSO: Midazolam 10 mg IM em dose única (5 mg IM se 13–40 kg; 0,2 mg/kg IM)."
      },
      {
        "if": "2ª LINHA (20 a 40 minutos) - EME Estabelecido (refratário a 2 doses de BZD)",
        "then": "Administrar Droga Antiepiléptica IV de Ataque: Fenitoína 20 mg/kg IV diluída APENAS em SF 0,9% (velocidade máx. 50 mg/min em adultos e 25 mg/min em idosos/cardiopatas; dose adicional de 5–10 mg/kg se persistir) OU Levetiracetam 60 mg/kg IV em 15 min (máx 4.500 mg) OU Ácido Valproico 40 mg/kg IV em 10 min (máx 3.000 mg; evitar em hepatopatas e gestantes)."
      },
      {
        "if": "3ª LINHA (> 40 minutos) - EME Refratário",
        "then": "Intubação Orotraqueal em sequência rápida + Ventilação Mecânica + Anestésico IV contínuo titulado por EEG: Midazolam (ataque 0,2 mg/kg + infusão 0,05–2 mg/kg/h) OU Propofol (ataque 1–2 mg/kg + infusão 1–4 mg/kg/h) OU Cetamina (ataque 1,5–2 mg/kg + infusão 1–5 mg/kg/h)."
      }
    ],
    "treatment": [
      {
        "title": "Pontos Críticos de Administração",
        "regimen": "Diluição e Segurança Farmacológica",
        "items": [
          "A Fenitoína precipita em Soro Glicosado! Diluir exclusivamente em Soro Fisiológico 0,9% e infundir sob monitorização de ECG e PA (risco de bradicardia, bloqueio AV e hipotensão pelo veículo propilenoglicol).",
          "Subdose de benzodiazepínico na 1ª linha é a principal causa de falha inicial — usar a dose plena recomendada."
        ]
      }
    ],
    "linked_drug_terms": [
      "Diazepam",
      "Midazolam",
      "Fenitoína",
      "Propofol",
      "Cetamina"
    ],
    "red_flags": [
      "Paralisia muscular pós-SRI com Rocurônio mascara as contrações motoras mas NÃO trata a descarga epiléptica cerebral! Iniciar sedação contínua imediatamente e monitorizar com EEG.",
      "Hiponatremia aguda grave (< 120 mEq/L) causando convulsão: corrigir com bolus de 100–150 mL de NaCl 3% IV em 10–20 min."
    ],
    "source_refs": [
      {
        "label": "American Epilepsy Society (AES) Evidence-Based Guideline for Status Epilepticus",
        "url": "https://aesnet.org/"
      }
    ],
    "follow_up": [
      {
        "title": "Monitorização em UTI e Investigação Etiológica",
        "items": [
          "Internação obrigatória em UTI com monitorização contínua de EEG (eletroencefalograma) se necessidade de intubação orotraqueal e sedação contínua para confirmar cessação eletrográfica das crises.",
          "Investigação diagnóstica precoce: TC de crânio com contraste para lesão estrutural aguda, punção lombar para afastar meningoencefalite se febre ou pleocitose, e rastreio toxicológico e metabólico.",
          "Manutenção e titulação da droga antiepiléptica de escolha (Fenitoína com nível sérico 10-20 mcg/mL ou Levetiracetam 1000 a 1500 mg 12/12h).",
          "Reavaliação neurológica seriada a cada 1 a 2 horas após estabilização."
        ]
      }
    ],
    "special_situations": [
      {
        "title": "Populações Especiais e Refratariedade",
        "items": [
          "Estado de Mal Não Convulsivo (EMENC): paciente com rebaixamento prolongado inexplicado ou automatismos motores sutis; diagnóstico exige EEG urgente e resposta a benzodiazepínico IV.",
          "Gestante com crise convulsiva: após 20 semanas de gestação ou puerpério, SEMPRE tratar como Eclâmpsia com Sulfato de Magnésio IV imediato (Pritchard ou Zuspan) antes de drogas antiepilépticas clássicas.",
          "Etilismo crônico: crises de abstinência exigem doses escalonadas de Diazepam ou Midazolam IV associados a Tiamina 100 mg IV/IM."
        ]
      }
    ],
    "linked_recipe_slugs": [
      "prescricao-eme"
    ],
    "prophylaxis": [
      {
        "title": "Profilaxia Secundária e Prevenção de Recorrência",
        "items": [
          "Manutenção do anticonvulsivante de 2ª linha: manter Levetiracetam, Fenitoína ou Ácido Valproico em doses de manutenção após controle da crise aguda.",
          "Investigação etiológica: afastar lesão estrutural aguda (TC/RM crânio), infecção de SNC (punção lombar) e distúrbios metabólicos/tóxicos.",
          "Profilaxia de aspiração e proteção de vias aéreas: decúbito lateralizado ou intubação se rebaixamento persistente do nível de consciência."
        ]
      }
    ]
  },
  {
    "id": "seed-dengue",
    "slug": "dengue-classificacao-grupos-a-b-c-d-hidratacao",
    "title": "Dengue: Classificação de Risco (Grupos A, B, C e D) e Hidratação",
    "category": "Infectologia",
    "setting": "Atenção Primária / UPA / Hospital",
    "status": "verified",
    "linked_recipe_slugs": [
      "prescricao-dengue-ambulatorial-grupos-ab"
    ],
    "summary": "Estadiamento clínico do Ministério da Saúde (Grupos A, B, C e D), interpretação dos Sinais de Alarme e cálculo exato de reposição volêmica oral e venosa.",
    "suspicion": [
      {
        "title": "Caso Suspeito e Sinais de Alarme (Fase Crítica - 3º ao 7º dia)",
        "items": [
          "Febre (2 a 7 dias) + >= 2 sintomas: cefaleia, dor retro-orbitária, mialgia, artralgia, prostração, exantema, náuseas/vômitos ou prova do laço positiva / leucopenia.",
          "SINAIS DE ALARME (definem Grupo C): Dor abdominal intensa (referida ou à palpação) e contínua; Vômitos persistentes; Acúmulo de líquidos (ascite, derrame pleural, pericárdico); Hipotensão postural e/ou lipotimia; Hepatomegalia > 2 cm abaixo do rebordo costal; Sangramento de mucosa; Letargia e/ou irritabilidade; Aumento progressivo do hematócrito."
        ]
      }
    ],
    "initial_actions": [
      {
        "title": "Estadiamento nos 4 Grupos do Ministério da Saúde",
        "items": [
          "GRUPO A (Azul): Sem sinais de alarme, sem sangramento espontâneo, prova do laço negativa e sem comorbidades/risco social -> Manejo ambulatorial.",
          "GRUPO B (Verde): Sem sinais de alarme, MAS com sangramento de pele espontâneo (petéquias) ou prova do laço positiva, OU condições especiais (gestantes, lactentes < 2 anos, idosos >= 65 anos, HAS, DM, DRC, DPOC, hepatopatas, doenças hematológicas) -> Observação em leito até resultado do hemograma.",
          "GRUPO C (Amarelo): Presença de QUALQUER Sinal de Alarme (sem sinais de choque) -> Internação hospitalar mínima de 48h e hidratação IV imediata.",
          "GRUPO D (Vermelho): Sinais de Choque (taquicardia, extremidades frias, pulso fino, enchimento capilar > 2 seg, convergência pressórica PA diferencial <= 20 mmHg, hipotensão arterial), desconforto respiratório ou sangramento grave -> Sala Vermelha / UTI imediata."
        ]
      }
    ],
    "exams": [
      {
        "title": "Solicitação conforme Grupo",
        "items": [
          "Grupo A: exames não obrigatórios (solicitar conforme clínica).",
          "Grupo B: Hemograma completo obrigatório na admissão (avaliar hemoconcentração e plaquetas).",
          "Grupos C e D: Hemograma completo, albumina sérica, TGO/TGP (obrigatórios) + ureia, creatinina, eletrólitos, gasometria/lactato, coagulograma, radiografia de tórax e USG de abdome/tórax + NS1/PCR (até 5º dia) ou Sorologia IgM (a partir do 6º dia)."
        ]
      }
    ],
    "decision_flow": [
      {
        "if": "Grupo A ou Grupo B com hematócrito normal",
        "then": "Hidratação Oral: Adultos 60 mL/kg/dia (sendo 1/3 com Soro de Reidratação Oral nas primeiras 4–6h e 2/3 com líquidos caseiros). Reavaliar no dia da defervescência da febre!"
      },
      {
        "if": "Grupo C (Presença de Sinais de Alarme)",
        "then": "Hidratação IV Imediata: 10 mL/kg de SF 0,9% (ou Ringer Lactato) na 1ª hora. Reavaliar clínica e hematócrito após 1–2h (pode repetir 10 mL/kg/h até 3 vezes se não houver melhora). Após melhora clínica/diurese >= 1 mL/kg/h: fase de manutenção 25 mL/kg em 6h, seguida de 25 mL/kg em 8h."
      },
      {
        "if": "Grupo D (Choque da Dengue)",
        "then": "Expansão Rápida em Sala Vermelha: 20 mL/kg de SF 0,9% ou Ringer Lactato em até 20 minutos! Reavaliar a cada 15–30 min (repetir até 3 fases se choque persistir). Se hematócrito em elevação após 3 expansões: utilizar Albumina 0,5–1 g/kg; se hematócrito em queda brusca com choque: suspeitar de hemorragia oculta e transfundir concentrado de hemácias (10 mL/kg)."
      }
    ],
    "treatment": [
      {
        "title": "Sintomáticos e Medicamentos Contraindicados",
        "regimen": "Analgesia Segura e Proibição de AINEs/AAS",
        "items": [
          "Analgesia e antitérmico: Dipirona 500 mg a 1 g VO/IV até de 6/6h OU Paracetamol 500 a 750 mg VO até de 6/6h.",
          "Antiemético: Ondansetrona 4 a 8 mg VO/IV 8/8h ou Metoclopramida 10 mg IV 8/8h.",
          "EXPRESSAMENTE CONTRAINDICADOS: Ácido Acetilsalicílico (AAS) e Anti-inflamatórios Não Esteroidais (Ibuprofeno, Diclofenaco, Cetoprofeno, Nimesulida) pelo risco de hemorragia grave e acidose."
        ]
      }
    ],
    "linked_drug_terms": [
      "Dipirona",
      "Paracetamol",
      "Ondansetrona",
      "Metoclopramida"
    ],
    "notification": {
      "text": "Doença de Notificação Compulsória no SINAN (todo caso suspeito). Óbitos ou casos graves do Grupo D exigem notificação imediata em até 24 horas."
    },
    "red_flags": [
      "O momento de maior perigo na Dengue NÃO é o pico febril, e sim a DEFERVESCÊNCIA (queda da febre entre o 3º e o 7º dia), quando ocorre o extravasamento plasmático!",
      "Convergência pressórica (PAS - PAD <= 20 mmHg, ex.: PA 100x85 mmHg) já define choque inicial na dengue, mesmo antes da PAS cair abaixo de 90 mmHg."
    ],
    "source_refs": [
      {
        "label": "Ministério da Saúde - Dengue: Diagnóstico e Manejo Clínico (Adulto e Criança) 6ª ed. 2024",
        "url": "https://www.gov.br/saude/"
      }
    ],
    "follow_up": [
      {
        "title": "Acompanhamento por Estadiamento e Critérios de Alta",
        "items": [
          "Grupo A (Ambulatorial): retorno obrigatório no dia da defervescência da febre (início da fase crítica, dias 3 a 6) ou retorno imediato na presença de qualquer sinal de alarme.",
          "Grupo B (Observação com Htc): hidratação oral supervisionada na unidade até resultado do hematócrito; se Htc normal, alta com reavaliação diária; se Htc elevado, tratar como Grupo C.",
          "Grupos C e D (Hospitalar): monitorização rigorosa com Htc a cada 2 horas no Grupo D e a cada 4 horas no Grupo C até estabilidade hemodinâmica.",
          "Critérios de alta hospitalar: ausência de febre por 48h sem antitérmicos, estabilidade hemodinâmica comprovada por 48h, hematócrito estável por 24h, plaquetas em ascensão (> 50.000) e recuperação do apetite."
        ]
      }
    ],
    "special_situations": [
      {
        "title": "Populações de Alto Risco para Evolução Grave",
        "items": [
          "Gestantes: maior risco de sangramento de parto e descolamento prematuro de placenta; monitorar vitalidade fetal e manter limiar baixo para internação.",
          "Idosos com insuficiência cardíaca ou DRC: titular hidratação venosa em alíquotas menores com ausculta pulmonar frequente para evitar edema pulmonar agudo iatrogênico.",
          "Prescrição proibida: contraindicação absoluta ao uso de AAS, AINEs (Ibuprofeno, Cetoprofeno, Diclofenaco) e Corticosteroides pelo risco de sangramento e hemorragia digestiva grave."
        ]
      }
    ],
    "prophylaxis": [
      {
        "title": "Prevenção de Agravamento e Complicações Hemorrágicas",
        "items": [
          "Contraindicação absoluta: NÃO utilizar AAS, anti-inflamatórios não esteroidais (ibuprofeno, cetoprofeno, diclofenaco) nem corticosteroides pelo risco elevado de sangramento.",
          "Hidratação oral rigorosa nos grupos A e B: prescrever 60 mL/kg/dia (sendo 1/3 com Sais de Reidratação Oral e 2/3 com líquidos caseiros/sucos).",
          "Retorno obrigatório para reavaliação no período crítico da efervescência febril (3º ao 7º dia de sintomas), pesquisando ativamente sinais de alarme."
        ]
      }
    ]
  },
  {
    "id": "seed-preeclampsia",
    "slug": "pre-eclampsia-grave-eclampsia-crise-hipertensiva-gestacao",
    "title": "Pré-Eclâmpsia com Sinais de Gravidade e Eclâmpsia",
    "category": "Ginecologia e Obstetrícia",
    "setting": "Maternidade / Emergência Obstétrica",
    "status": "verified",
    "summary": "Prevenção e controle de convulsões com Sulfato de Magnésio e manejo imediato da crise hipertensiva gestacional (PAS >= 160 ou PAD >= 110 mmHg) segundo RBEHG / FEBRASGO / ACOG.",
    "suspicion": [
      {
        "title": "Critérios de Gravidade e Iminência de Eclâmpsia",
        "items": [
          "Gestante > 20 semanas (ou puérpera até 6 semanas) com PA >= 140x90 mmHg associada a proteinúria (relação P/Cr >= 0,3 ou >= 300 mg/24h) OU disfunção de órgão-alvo.",
          "SINAIS DE GRAVIDADE: Crise hipertensiva (PAS >= 160 e/ou PAD >= 110 mmHg confirmada em 15 min); Sinais de Iminência de Eclâmpsia (cefaleia frontal/occipital refratária, escotomas cintilantes/visão turva, epigastralgia ou dor em hipocôndrio direito em barra - sinal de Chaussier, hiperreflexia patelar); Edema agudo de pulmão; Creatinina >= 1,1 mg/dL; Síndrome HELLP (Hemólise com DHL >= 600 / esquizócitos, TGO/TGP >= 2x LSN ou >= 70 U/L, Plaquetas < 100.000/mm³)."
        ]
      }
    ],
    "initial_actions": [
      {
        "title": "Tríade de Estabilização Materna Imediata",
        "items": [
          "1. Iniciar SULFATO DE MAGNÉSIO imediatamente em toda Pré-Eclâmpsia com sinais de gravidade, iminência de eclâmpsia, HELLP ou Eclâmpsia (superior a fenitoína e diazepam!).",
          "2. Tratar CRISE HIPERTENSIVA aguda (PA >= 160x110 mmHg) em até 30–60 minutos para prevenir AVC hemorrágico materno (meta: reduzir PA em 15–25%, mantendo PAS entre 130–150 e PAD entre 80–100 mmHg sem causar hipoperfusão placentária).",
          "3. Avaliar vitalidade fetal (cardiotocografia) APÓS estabilização materna e planejar o parto conforme idade gestacional."
        ]
      }
    ],
    "exams": [
      {
        "title": "Rotina Laboratorial de Pré-Eclâmpsia / Rastreio HELLP",
        "items": [
          "Hemograma com contagem de plaquetas e pesquisa de esquizócitos em sangue periférico.",
          "DHL (desidrogenase láctica), Bilirrubina total e frações, TGO (AST) e TGP (ALT).",
          "Creatinina, ácido úrico, relação proteína/creatinina em amostra isolada de urina.",
          "Coagulograma (TP, TTPa, fibrinogênio) se plaquetas < 100.000/mm³ ou suspeita de DPP."
        ]
      }
    ],
    "decision_flow": [
      {
        "if": "Acesso venoso disponível com bomba de infusão contínua (BIC)",
        "then": "Esquema de ZUSPAN (Sulfato de Magnésio): Ataque de 4 g IV em 15–20 min (diluir 8 mL de MgSO4 50% em 12 mL de SG 5% ou 100 mL de SF 0,9%). Manutenção: 1 g/h a 2 g/h IV contínuo em BIC por 24 horas após o parto ou após a última crise."
      },
      {
        "if": "Transporte inter-hospitalar ou ausência de bomba de infusão confiável",
        "then": "Esquema de PRITCHARD: Ataque de 4 g IV lento (15–20 min) + 10 g IM profundo (5 g em cada glúteo de MgSO4 50%). Manutenção: 5 g IM profundo a cada 4 horas (desde que reflexo patelar presente, FR >= 16 irpm e diurese >= 25 mL/h)."
      },
      {
        "if": "Convulsão recorrente na vigência de Sulfato de Magnésio",
        "then": "Administrar novo bolus de 2 g IV de Sulfato de Magnésio em 5 a 10 minutos e elevar manutenção para 2 g/h."
      }
    ],
    "treatment": [
      {
        "title": "Anti-hipertensivos de 1ª Linha na Crise Hipertensiva Gestacional",
        "regimen": "Nifedipino VO ou Hidralazina IV",
        "items": [
          "1ª Opção (Rápida e oral se paciente consciente): Nifedipino 10 mg VO (comprimido ou cápsula DEGLUTIDA, NUNCA sublingual!). Repetir 10 a 20 mg VO a cada 20–30 minutos se PA persistir >= 160x110 mmHg (máx. 30–50 mg na 1ª hora).",
          "2ª Opção (Venosa): Hidralazina 5 mg IV lento em 2 min (diluir 1 ampola de 20 mg/1 mL em 19 mL de água destilada = 1 mg/mL; fazer 5 mL IV). Repetir 5 a 10 mg IV a cada 20 minutos até máximo de 20–30 mg.",
          "Refratariedade grave / Edema Agudo de Pulmão: Nitroprussiato de Sódio IV em BIC (0,25 a 2 mcg/kg/min) por curto período pré-parto."
        ]
      }
    ],
    "linked_drug_terms": [
      "Sulfato de Magnésio",
      "Nifedipino",
      "Hidralazina",
      "Gluconato de Cálcio"
    ],
    "red_flags": [
      "VIGILÂNCIA DE INTOXICAÇÃO POR MAGNÉSIO (checar de 1/1h): 1º sinal é a abolição do reflexo patelar (magnésio > 7–10 mEq/L), seguido de depressão respiratória (FR < 12–16 irpm) e parada cardíaca! Se reflexo abolido ou FR < 12–16: SUSPENDER MgSO4 e aplicar o antídoto GLUCONATO DE CÁLCIO 10% 10 mL (1 g) IV lento em 3 a 5 minutos!",
      "Se diurese < 25 mL/h (oligúria sem perda de reflexo): reduzir velocidade de infusão do MgSO4 pela metade (0,5 g/h) e vigiar reflexos rigorosamente.",
      "CONTRAINDICADOS NA GESTAÇÃO: IECA (Captopril, Enalapril), BRA (Losartana) e Atenolol."
    ],
    "source_refs": [
      {
        "label": "Rede Brasileira de Estudos sobre Hipertensão na Gravidez (RBEHG) / FEBRASGO",
        "url": "https://www.febrasgo.org.br/"
      },
      {
        "label": "ACOG Practice Bulletin No. 222: Gestational Hypertension and Preeclampsia",
        "url": "https://www.acog.org/"
      }
    ],
    "follow_up": [
      {
        "title": "Vigilância Pós-Parto e Puerpério",
        "items": [
          "Manter Sulfato de Magnésio por 24 horas após o parto ou após a última convulsão (período de maior risco de eclâmpsia puerperal).",
          "Monitorização dos sinais de intoxicação por magnésio a cada hora: reflexo patelar (presente), diurese (> 25 mL/h) e frequência respiratória (>= 16 irpm).",
          "Antídoto imediato à beira-leito: Gluconato de Cálcio 10% 10 mL IV lento em caso de hiporreflexia patelar ou depressão respiratória.",
          "Controle de PA puerperal: manter anti-hipertensivos orais (Metildopa, Anlodipino ou Enalapril) se PA >= 150/100 mmHg."
        ]
      }
    ],
    "special_situations": [
      {
        "title": "Manejo da Síndrome HELLP e Resolução Obstétrica",
        "items": [
          "Síndrome HELLP (Hemólise com esquizócitos + Plaquetopenia < 100.000 + Elevação de TGO >= 70 ou LDH >= 600): indicação de estabilização materna rápida e interrupção da gestação independente da idade gestacional.",
          "Crise hipertensiva refratária (PAS >= 160 ou PAD >= 110 persistente): escalonar Hidralazina 5 mg IV a cada 20 min (máx 20 mg) ou Nifedipino 10 a 20 mg VO a cada 30 min (máx 60 mg).",
          "Idade gestacional < 34 semanas com mãe estável: administrar corticoterapia para maturação pulmonar fetal (Betametasona 12 mg IM 24/24h por 2 doses) sem retardar parto se instabilidade materna."
        ]
      }
    ],
    "linked_recipe_slugs": [
      "prescricao-preeclampsia"
    ],
    "prophylaxis": [
      {
        "title": "Prevenção de Eclâmpsia e Recorrência",
        "items": [
          "Profilaxia da crise convulsiva eclampsica: Sulfato de Magnésio (esquema Pritchard ou Zuspan) mantido intraparto e por 24 horas pós-parto.",
          "Prevenção secundária em gestações futuras: prescrever AAS em baixa dose (100 a 150 mg/dia) + Carbonato de Cálcio (1,5 g/dia) a partir da 12ª semana de gestação.",
          "Acompanhamento puerperal rigoroso da pressão arterial por pelo menos 7 a 10 dias após a alta hospitalar."
        ]
      }
    ]
  },
  {
    "id": "seed-asma",
    "slug": "crise-de-asma-aguda-exacerbacao-gina",
    "title": "Exacerbação Aguda de Asma (Crise Asmática - GINA 2024)",
    "category": "Pneumologia",
    "setting": "Pronto-Socorro / Emergência",
    "status": "verified",
    "linked_recipe_slugs": [
      "prescricao-asma-alta-gina"
    ],
    "summary": "Estratificação de gravidade (leve/moderada, grave e quase-fatal) e tratamento imediato na 1ª hora com broncodilatadores de curta ação, ipratrópio, corticosteroide sistêmico e sulfato de magnésio.",
    "suspicion": [
      {
        "title": "Classificação de Gravidade na Admissão (GINA)",
        "items": [
          "Crise Leve a Moderada: Fala frases completas, prefere ficar sentado a deitado, não agitado, FR aumentada (< 30 irpm), sem uso de musculatura acessória, FC 100–120 bpm, SpO2 90–95% em ar ambiente, PFE > 50% do predito.",
          "Crise Grave: Fala apenas palavras isoladas, senta-se curvado para frente (posição de tripé), agitado, FR > 30 irpm, uso evidente de musculatura acessória (tiragem), FC > 120 bpm, SpO2 < 90% em ar ambiente, PFE <= 50%.",
          "Asma Quase-Fatal (Risco Iminente de Vida): Sonolência, confusão mental, exaustão respiratória, bradicardia ou 'Tórax Silencioso' à ausculta."
        ]
      }
    ],
    "initial_actions": [
      {
        "title": "Manejo da 1ª Hora",
        "items": [
          "1. Oxigênio suplementar titulado para manter SpO2 entre 93% e 95% em adultos (94–98% em crianças e gestantes) — evitar hiperóxia a 100%.",
          "2. SABA inalatório (Salbutamol 100 mcg/jato com espaçador): 4 a 10 jatos a cada 20 minutos na 1ª hora (preferir spray pressurizado com espaçador à nebulização).",
          "3. Associar Brometo de Ipratrópio nas crises moderadas a graves: 4 a 8 jatos (80–160 mcg) ou 0,5 mg (40 gotas) a cada 20 minutos na 1ª hora (reduz taxa de internação!).",
          "4. Corticosteroide sistêmico na 1ª hora: Prednisona ou Prednisolona 40 a 50 mg VO (1–2 mg/kg em crianças, máx 40 mg) OU, se incapaz de deglutir/vômitos/crise grave: Hidrocortisona 200 mg IV ou Metilprednisolona 40–60 mg IV."
        ]
      }
    ],
    "exams": [
      {
        "title": "Avaliação Funcional e Exames Selecionados",
        "items": [
          "Oximetria de pulso contínua e medida seriada de Pico de Fluxo Expiratório (Peak Flow) antes e 1h após broncodilatação.",
          "Gasometria arterial: indicada APENAS em crise grave refratária, SpO2 < 90% apesar de O2 ou sinais de fadiga (PaCO2 normal de 40–45 mmHg ou elevada em paciente taquipneico é sinal de falência ventilatória iminente!).",
          "Radiografia de tórax: não realizar de rotina; solicitar apenas se suspeita de pneumotórax, pneumomediastino, pneumonia consolidada ou falha terapêutica."
        ]
      }
    ],
    "decision_flow": [
      {
        "if": "Crise Grave sem resposta após 1 hora de SABA + Ipratrópio + Corticoide (PFE < 60% ou hipoxemia)",
        "then": "Administrar Sulfato de Magnésio 2 g IV (20 mL de MgSO4 10% ou 4 mL de MgSO4 50%) diluídos em 100 mL de SF 0,9%, infundidos em 20 minutos em dose única (crianças: 25–50 mg/kg IV em 20 min, máx 2 g)."
      },
      {
        "if": "Asma Quase-Fatal (sonolência, tórax silencioso, acidose hipercápnica progressiva)",
        "then": "Intubação Orotraqueal em Sequência Rápida com CETAMINA (1,5–2 mg/kg IV — efeito broncodilatador!) + Rocurônio/Succinilcolina, utilizando o maior tubo possível (>= 8,0 mm no adulto). Configurar ventilação mecânica anti-aprisionamento aéreo: Volume corrente baixo (6 mL/kg), FR baixa (10–14 irpm), relação I:E prolongada (1:3 a 1:4) e hipercapnia permissiva."
      },
      {
        "if": "Melhora clínica sustentada após 1–3h (sem dispneia, SpO2 > 94% em ar ambiente, PFE > 60–80%)",
        "then": "Alta hospitalar com Prednisona 40–50 mg/dia VO por 5 a 7 dias + iniciar ou otimizar Corticoide Inalatório associado a Formoterol (Budesonida/Formoterol) + plano de ação escrito e revisão da técnica inalatória."
      }
    ],
    "treatment": [
      {
        "title": "Prescrição de Alta Pós-Crise (Prevenção de Recaída)",
        "regimen": "Corticoide Oral Curto + Manutenção Inalatória Obrigatória",
        "items": [
          "Prednisona 40 a 50 mg VO 1x pela manhã por 5 a 7 dias (não precisa de desmame se uso < 2 semanas).",
          "NUNCA dar alta apenas com Salbutamol isolado! Iniciar ou ajustar Corticoide Inalatório + Formoterol (ex.: Budesonida/Formoterol 200/6 mcg 1 a 2 inalações 12/12h e de alívio).",
          "Aminofilina IV NÃO é recomendada pelo GINA devido à baixa eficácia adicional e alta toxicidade (arritmias e convulsões)."
        ]
      }
    ],
    "linked_drug_terms": [
      "Salbutamol",
      "Ipratrópio",
      "Prednisona",
      "Hidrocortisona",
      "Sulfato de Magnésio",
      "Cetamina"
    ],
    "red_flags": [
      "Sedativos (benzodiazepínicos, morfina) são ESTRITAMENTE CONTRAINDICADOS no asmático não intubado pelo risco de parada respiratória imediata!",
      "Hipotensão grave logo após intubação do asmático: pensar em Auto-PEEP (hiperinsuflação dinâmica) ou Pneumotórax Hipertensivo -> Desconectar o paciente do ventilador por 30–60 segundos com compressão torácica expiratória suave para esvaziar os pulmões."
    ],
    "source_refs": [
      {
        "label": "Global Initiative for Asthma (GINA) Strategy Report 2024",
        "url": "https://ginasthma.org/"
      }
    ],
    "follow_up": [
      {
        "title": "Critérios de Alta Segura e Plano de Ação",
        "items": [
          "Critérios de alta do pronto-socorro: PFE ou VEF1 >= 60–70% do previsto, ausência de dispneia de repouso, SpO2 >= 94% em ar ambiente e estabilidade clínica por pelo menos 1 a 2 horas após a última nebulização.",
          "Prescrição de alta mandatória: Corticoide oral (Prednisona 40 a 50 mg/dia em dose única matinal por 5 a 7 dias) sem necessidade de desmame gradual.",
          "Iniciador / Otimizador de terapia de manutenção: Corticoide Inalatório associado a Formoterol (CI/LABA) para uso regular e alívio conforme recomendação GINA Etapa 1 a 4.",
          "Agendamento de consulta de retorno na atenção primária ou pneumologia em 2 a 7 dias para revisão de técnica inalatória e adesão."
        ]
      }
    ],
    "special_situations": [
      {
        "title": "Asma Quase Fatal e Ventilação Mecânica",
        "items": [
          "Sinais de exaustão respiratória: tórax silencioso (ausência de sibilos com esforço respiratório), bradicardia, pulso paradoxal ausente por fadiga e confusão mental ou acidose hipercápnica.",
          "Adrenalina 0,3 a 0,5 mg IM: indicada na crise asmática grave refratária ou associada a anafilaxia.",
          "Intubação orotraqueal no asmático: procedimento de altíssimo risco de barotrauma e PCR; usar tubo calibroso (>= 8,0 mm), sedação profunda, ventilação com frequência respiratória baixa (8 a 10 rpm), volume corrente baixo (6 mL/kg) e tempo expiratório prolongado (relação I:E 1:3 a 1:4) para evitar auto-PEEP."
        ]
      }
    ],
    "prophylaxis": [
      {
        "title": "Prevenção de Novas Crises (Manejo de Manutenção GINA)",
        "items": [
          "Corticoide inalatório obrigatório: prescrever corticoide inalatório associado a formoterol (ou corticoide inalatório regular diário) na alta; nunca tratar com broncodilatador isolado.",
          "Curso curto de corticoide oral na alta: Prednisona 40 a 50 mg/dia por 5 a 7 dias para consolidação da resposta inflamatória.",
          "Treinamento de técnica inalatória e uso de espaçador valvulado antes da liberação da emergência.",
          "Vacinação contra influenza e pneumococo; controle de gatilhos domiciliares (mofo, ácaros, fumaça de tabaco)."
        ]
      }
    ]
  },
  {
    "id": "seed-hda",
    "slug": "hemorragia-digestiva-alta-varicosa-e-nao-varicosa",
    "title": "Hemorragia Digestiva Alta (HDA Não-Varicosa e Varicosa)",
    "category": "Gastroenterologia",
    "setting": "Emergência / Endoscopia / UTI",
    "status": "verified",
    "summary": "Ressuscitação hemodinâmica, transfusão restritiva (Hb alvo 7–9 g/dL), terapia farmacológica pré-endoscópica (IBP vs. Terlipressina/Octreotide + Ceftriaxona) e EDA em até 12–24h (ESGE / Baveno VII).",
    "suspicion": [
      {
        "title": "Apresentação e Diferenciação Etiológica",
        "items": [
          "Hematêmese (vômito com sangue vivo ou em 'borra de café') e/ou Melena (fezes pastosas, enegrecidas e fétidas) ou enterorragia maciça com instabilidade hemodinâmica.",
          "Suspeitar de HDA Varicosa em todo paciente com estigmas de hepatopatia crônica/cirrose (icterícia, ascite, circulação colateral, telangiectasias, esplenomegalia, plaquetopenia)."
        ]
      }
    ],
    "initial_actions": [
      {
        "title": "Estabilização Inicial e Metas Transfusionais",
        "items": [
          "1. Dois acessos venosos periféricos calibrosos (14G a 18G), tipagem sanguínea/prova cruzada e ressuscitação com cristaloide para manter PAM >= 65 mmHg.",
          "2. Proteção de via aérea (Intubação Orotraqueal) se hematêmese volumosa contínua, encefalopatia hepática grau III/IV ou rebaixamento do sensório (Glasgow <= 8).",
          "3. Estratégia Transfusional RESTRITIVA: transfundir concentrado de hemácias se Hb < 7,0 g/dL (meta 7,0 a 9,0 g/dL). Em coronariopatas agudos ou isquemia ativa: gatilho Hb < 8,0 g/dL (meta 8–10 g/dL). Evitar hipertransfusão (aumenta pressão portal e ressangramento!).",
          "4. Calcular escore de Glasgow-Blatchford na admissão (se = 0 a 1: baixíssimo risco, considerar EDA ambulatorial precoce)."
        ]
      }
    ],
    "exams": [
      {
        "title": "Laboratório e Endoscopia Digestiva Alta (EDA)",
        "items": [
          "Hemograma seriado (atenção: Hb inicial pode estar falsamente normal no sangramento hiperagudo!), ureia, creatinina, sódio, potássio, INR/TP, TTPa, fibrinogênio, bilirrubinas, albumina e lactato.",
          "EDA: realizar em até 24 horas na HDA não-varicosa (após estabilização) e em até 12 horas na suspeita de HDA varicosa."
        ]
      }
    ],
    "decision_flow": [
      {
        "if": "Suspeita de HDA Não-Varicosa (Úlcera Péptica, gastrite, Mallory-Weiss)",
        "then": "Iniciar IBP em alta dose: Omeprazol ou Pantoprazol 80 mg IV em bolus lento, seguido de 40 mg IV de 12/12h (ou 8 mg/h em infusão contínua se estigma de alto risco Forrest Ia, Ib ou IIa por 72h após hemostasia endoscópica)."
      },
      {
        "if": "Suspeita de HDA Varicosa (Cirrótico / Hipertensão Portal)",
        "then": "Iniciar IMEDIATAMENTE (antes da EDA): 1) Vasoconstritor esplâncnico por 2 a 5 dias: Terlipressina 2 mg IV de 4/4h nas primeiras 24–48h (depois 1 mg 4/4h) OU Octreotide 50 mcg IV bolus + 50 mcg/h em BIC; E 2) Profilaxia antibiótica obrigatória por 5 a 7 dias: Ceftriaxona 1 g IV a cada 24 horas (reduz infecções, PBE, ressangramento e mortalidade!)."
      },
      {
        "if": "HDA Varicosa maciça refratária com instabilidade grave",
        "then": "Passagem de Balão de Sengstaken-Blakemore (como ponte temporária por no máximo 24h em paciente intubado) e indicar TIPS de resgate precoce."
      }
    ],
    "treatment": [
      {
        "title": "Procinético Pré-EDA e Manejo de Antitrombóticos",
        "regimen": "Otimização da Visão Endoscópica e Reversão de Coagulopatia",
        "items": [
          "Procinético 30–120 min antes da EDA em hematêmese volumosa: Eritromicina 250 mg IV ou Metoclopramida 10 mg IV (melhora visualização da mucosa gástrica).",
          "NÃO usar Ácido Tranexâmico de rotina na HDA (estudo HALT-IT mostrou ausência de benefício na mortalidade e aumento de eventos tromboembólicos).",
          "No cirrótico com INR alargado: NÃO transfundir plasma fresco congelado de rotina (não corrige a coagulopatia da cirrose e causa sobrecarga volêmica aumentando a pressão portal)."
        ]
      }
    ],
    "linked_drug_terms": [
      "Omeprazol",
      "Ceftriaxona",
      "Metoclopramida"
    ],
    "red_flags": [
      "Terlipressina é contraindicada em pacientes com doença arterial coronariana ativa, arritmias graves, isquemia mesentérica/periférica ou gestação (preferir Octreotide nesses casos).",
      "Em todo cirrótico com HDA: rastrear Peritonite Bacteriana Espontânea (paracentese diagnóstica se ascite presente) e prevenir encefalopatia hepática com Lactulose."
    ],
    "source_refs": [
      {
        "label": "Baveno VII - Renewing Consensus in Portal Hypertension (J Hepatol 2022)",
        "url": "https://www.journal-of-hepatology.eu/"
      },
      {
        "label": "ESGE Guideline on Non-Variceal Upper Gastrointestinal Hemorrhage",
        "url": "https://www.esge.com/"
      }
    ],
    "follow_up": [
      {
        "title": "Cuidados Pós-Endoscopia e Rastreio de Ressangramento",
        "items": [
          "Endoscopia Digestiva Alta (EDA) obrigatória nas primeiras 24 horas (ou precoce nas primeiras 12h se choque ou sangramento maciço ativo).",
          "Úlcera péptica de alto risco (Forrest Ia, Ib e IIa submetidas a hemostasia endoscópica): manter Omeprazol IV contínuo (80 mg bolus + 8 mg/h) por 72 horas.",
          "HDA Varicosa no Cirrótico: manter Terlipressina (2 mg 4/4h por 48h, depois 1 mg 4/4h) ou Octreotide por 2 a 5 dias + Ceftriaxona 1g IV/dia por 7 dias para profilaxia de peritonite bacteriana espontânea.",
          "Transição pós-estabilização: introduzir IBP oral em dose dobrada (Omeprazol 40 mg 12/12h ou Pantoprazol 40 mg 12/12h) e rastrear H. pylori com biópsia ou teste não invasivo."
        ]
      }
    ],
    "special_situations": [
      {
        "title": "Ressangramento Maciço e Hemotransfusão Restritiva",
        "items": [
          "Estratégia transfusional restritiva (alvo de Hemoglobina entre 7 e 8 g/dL): reduz mortalidade e ressangramento em relação a estratégias liberais em cirróticos e não cirróticos (alvo 9-10 g/dL apenas em coronariopatas instáveis).",
          "Sangramento varicoso maciço refratário a EDA e drogas: passagem imediata de balão de Sengstaken-Blakemore ou prótese esofágica autoexpansível como ponte para TIPS de emergência.",
          "Coagulopatia na cirrose: dosagem de INR reflete síntese de pró e anticoagulantes; não transfundir plasma fresco rotineiramente se não houver hemorragia ativa com coagulopatia consumptiva documentada."
        ]
      }
    ],
    "linked_recipe_slugs": [
      "prescricao-hda"
    ],
    "prophylaxis": [
      {
        "title": "Profilaxia de Ressangramento e Complicações Infecciosas",
        "items": [
          "Profilaxia antibiótica na HDA varicosa: Ceftriaxona 1 g IV 24/24h por 7 dias obrigatória para prevenir peritonite bacteriana espontânea e reduzir mortalidade.",
          "Profilaxia secundária de varizes esofágicas: ligadura elástica endoscópica seriada + Betabloqueador não seletivo (Propranolol ou Carvedilol) titulado após estabilidade.",
          "Profilaxia na úlcera péptica: erradicação do Helicobacter pylori se positivo e suspensão de AINEs."
        ]
      }
    ]
  },
  {
    "id": "seed-tep",
    "slug": "tromboembolismo-pulmonar-agudo-tep",
    "title": "Tromboembolismo Pulmonar Agudo (TEP)",
    "category": "Pneumologia",
    "setting": "Emergência / Enfermaria / UTI",
    "status": "verified",
    "summary": "Probabilidade pré-teste (Wells / Genebra / PERC), uso racional do D-dímero ajustado pela idade, Angio-TC de tórax, classificação de risco (sPESI) e anticoagulação ou trombólise (ESC).",
    "suspicion": [
      {
        "title": "Apresentação Clínica e Estratificação Pré-Teste",
        "items": [
          "Dispneia de início súbito ou piora aguda, dor torácica pleurítica, taquicardia, hemoptise, síncope ou hipotensão inexplicada, especialmente com fatores de risco (cirurgia recente, imobilização, neoplasia, gestação/puerpério, ACO, TVP prévia).",
          "Aplicar Escore de Wells para TEP ou Escore de Genebra Revisado para definir probabilidade clínica Baixa/Intermediária vs. Alta."
        ]
      }
    ],
    "initial_actions": [
      {
        "title": "Estabilização e Algoritmo Diagnóstico",
        "items": [
          "Avaliar estabilidade hemodinâmica imediatamente: TEP de ALTO RISCO (Maciço) é definido por PCR, Choque Obstrutivo (PAS < 90 mmHg ou necessidade de vasopressor) ou Hipotensão Persistente (PAS < 90 mmHg ou queda >= 40 mmHg por > 15 min).",
          "Se Instável (Alto Risco): realizar Ecocardiograma Transtorácico à beira-leito (POCUS) para buscar sobrecarga aguda de VD ou Angio-TC imediata se disponível.",
          "Se Estável com probabilidade Baixa/Intermediária: aplicar regra PERC (se baixa probabilidade e PERC = 0, exclui TEP sem exames); caso contrário, dosar D-dímero de alta sensibilidade (usar corte ajustado para idade > 50 anos: Idade x 10 ng/mL).",
          "Se Estável com probabilidade Alta (Wells > 6) ou D-dímero positivo: realizar Angiotomografia de Artérias Pulmonares E iniciar anticoagulação empírica imediata se não houver contraindicação."
        ]
      }
    ],
    "exams": [
      {
        "title": "Biomarcadores de Estratificação de Risco (Pós-Confirmação)",
        "items": [
          "Troponina e BNP/NT-proBNP (avaliam injúria e disfunção miocárdica do ventrículo direito).",
          "Avaliação da relação VD/VE na Angio-TC ou no Ecocardiograma (>= 0,9 a 1,0 indica disfunção de VD).",
          "Aplicar escore sPESI (Simplified Pulmonary Embolism Severity Index) para definir risco baixo (sPESI = 0) vs. intermediário (sPESI >= 1)."
        ]
      }
    ],
    "decision_flow": [
      {
        "if": "TEP de Alto Risco (Instabilidade Hemodinâmica / Choque)",
        "then": "Indicar Reperfusão Primária Imediata: Trombólise Sistêmica com Alteplase 100 mg IV em 2 horas (ou 0,6 mg/kg em 15 min, máx 50 mg, em PCR/choque extremo) + Anticoagulação com Heparina Não Fracionada IV. Evitar sobrecarga volêmica (> 500 mL piora a distensão do VD e reduz o débito do VE!); usar Noradrenalina se hipotensão."
      },
      {
        "if": "TEP de Risco Intermediário-Alto (Estável, sPESI >= 1, COM disfunção de VD no Eco/TC E Troponina positiva)",
        "then": "Internar em UTI/Unidade Semi-Intensiva com anticoagulação plena parenteral (Enoxaparina 1 mg/kg SC 12/12h ou Fondaparinux) nas primeiras 48–72h e vigiar sinais de descompensação (trombólise de resgate se deteriorar)."
      },
      {
        "if": "TEP de Baixo Risco (sPESI = 0, sem disfunção de VD, troponina negativa e suporte social adequado)",
        "then": "Anticoagulação oral direta (DOAC) e considerar tratamento domiciliar ou alta precoce."
      }
    ],
    "treatment": [
      {
        "title": "Esquemas de Anticoagulação Plena",
        "regimen": "DOACs (1ª escolha) ou HBPM",
        "items": [
          "Rivaroxabana (dispensa heparina prévia): 15 mg VO de 12/12h com alimentos por 21 dias, seguido de 20 mg VO 1x/dia.",
          "Apixabana (dispensa heparina prévia): 10 mg VO de 12/12h por 7 dias, seguido de 5 mg VO de 12/12h.",
          "Enoxaparina (1ª escolha em gestantes; necessária por >= 5 dias antes de Dabigatrana ou Edoxabana, ou como ponte para Varfarina): 1 mg/kg SC de 12/12h (ou 1 mg/kg SC 1x/dia se ClCr 15–29 mL/min).",
          "Duração mínima: 3 meses para todos os pacientes (estender indefinidamente se TEP não provocado recorrente ou trombofilia grave/câncer ativo)."
        ]
      }
    ],
    "linked_drug_terms": [
      "Enoxaparina",
      "Rivaroxabana",
      "Alteplase",
      "Noradrenalina"
    ],
    "red_flags": [
      "CUIDADO COM VOLUME NO TEP MACIÇO: O ventrículo direito dilatado comprime o ventrículo esquerdo pelo septo interventricular; infundir mais de 500 mL de soro agrava a falência do VD e precipita parada cardíaca em AESP!",
      "DOACs são contraindicados na gestação/lactação, na Síndrome Antifosfolípide triplo-positiva e na insuficiência renal dialítica."
    ],
    "source_refs": [
      {
        "label": "ESC Guidelines for the Diagnosis and Management of Acute Pulmonary Embolism",
        "url": "https://www.escardio.org/Guidelines"
      }
    ],
    "follow_up": [
      {
        "title": "Duração da Anticoagulação e Investigação Ambulatorial",
        "items": [
          "Duração da anticoagulação plena: mínimo de 3 meses para TEP provocado por fator transitório maior (cirurgia, trauma, imobilização).",
          "TEP não provocado ou com fator de risco persistente (câncer ativo, SAF): anticoagulação por tempo estendido/indeterminado com reavaliação periódica do risco de sangramento.",
          "Prevenção e detecção de Hipertensão Pulmonar Tromboembólica Crônica (HPTEC): ecocardiograma transtorácico de controle em 3 a 6 meses se persistência de dispneia ou intolerância aos esforços.",
          "Encaminhamento ambulatorial de anticoagulação para controle de exames e orientação de interações."
        ]
      }
    ],
    "special_situations": [
      {
        "title": "TEP na Gestação e Falha de Trombolítico",
        "items": [
          "TEP na Gestação: investigação de escolha com ultrassom de membros inferiores (se TVP confirmada, evita radiação) ou Angio-TC de tórax com proteção uterina; tratamento exclusivo com Heparina de Baixo Peso Molecular (Enoxaparina 1 mg/kg 12/12h) — DOACs e Varfarina são contraindicados.",
          "Tromboembolismo Pulmonar de Alto Risco (com choque obstrutivo ou PCR): indicação mandatória de Trombólise Sistêmica (Alteplase 100 mg IV em 2 horas ou 50 mg em bolus na PCR em ritmo chocável/AESP).",
          "Contraindicação absoluta à anticoagulação em TEP agudo (ex.: hemorragia intracraniana recente): indicação de implante de Filtro de Veia Cava Inferior temporário."
        ]
      }
    ],
    "linked_recipe_slugs": [
      "prescricao-tep"
    ],
    "prophylaxis": [
      {
        "title": "Prevenção Secundária de TEV e Profilaxia a Longo Prazo",
        "items": [
          "Anticoagulação plena por no mínimo 3 meses: Rivaroxabana (15 mg 12/12h por 21d, após 20 mg/dia), Apixabana ou Varfarina (alvo INR 2-3).",
          "Investigação de fatores provocadores: câncer oculto, cirurgia ortopédica/pélvica recente, imobilização ou síndrome do anticorpo antifosfolípide.",
          "Profilaxia primária futura: instruir o uso de profilaxia farmacológica/mecânica em qualquer futura internação cirúrgica ou clínica prolongada."
        ]
      }
    ]
  },
  {
    "id": "seed-sri",
    "slug": "intubacao-em-sequencia-rapida-sri-via-aerea",
    "title": "Intubação em Sequência Rápida (SRI) — Os 7 Ps, Drogas e Doses",
    "category": "Emergência e UTI",
    "setting": "Sala Vermelha / UTI / SAMU",
    "status": "verified",
    "linked_recipe_slugs": [
      "prescricao-sri-intubacao"
    ],
    "summary": "Protocolo operacional dos 7 Ps da Intubação em Sequência Rápida, escolha do indutor conforme perfil hemodinâmico (Cetamina, Etomidato, Propofol), bloqueadores neuromusculares e sedação pós-intubação.",
    "suspicion": [
      {
        "title": "Indicações Clássicas de Via Aérea Definitiva",
        "items": [
          "Falência de manutenção ou proteção da via aérea (Glasgow <= 8, perda de reflexo de proteção laríngea, trauma maxilofacial grave, hematoma cervical expansivo, queimadura inalatória com estridor).",
          "Falência de oxigenação ou ventilação (hipoxemia refratária a O2 suplementar/VNI ou acidose respiratória hipercápnica progressiva com fadiga muscular).",
          "Curso clínico esperado de deterioração (choque séptico/politrauma instável, transporte aeromédico, estado de mal epiléptico refratário)."
        ]
      }
    ],
    "initial_actions": [
      {
        "title": "Os 7 Ps da Sequência Rápida (Preparo e Pré-Oxigenação)",
        "items": [
          "1. PREPARAÇÃO (10 min antes): Checar material com mnemônico SOAPME (Suction/Aspirador funcionando; Oxygen/BVM + máscara não reinalante; Airway/Laringoscópio ou Videolaringoscópio + tubos 7.5 e 8.0 testados + fio-guia/Bougie + máscara laríngea + kit cricotireoidostomia; Pharmacology/Seringas rotuladas; Monitoring/Capnografia, ECG, Oximetria, PA).",
          "2. PRÉ-OXIGENAÇÃO (3 a 5 min): Ofertar O2 a 100% (15 L/min) por máscara com reservatório não reinalante (ou VNI/CPAP se shunt pulmonar importante como EAP/SDRA) para desnitrogenar a Capacidade Residual Funcional + Oxigenação Apneica com cateter nasal a 15 L/min.",
          "3. PRÉ-OTIMIZAÇÃO HEMODINÂMICA (Ressuscitação antes de intubar!): Se Índice de Choque (FC / PAS) >= 0,8 ou PAS < 100 mmHg, iniciar cristaloide e Noradrenalina em bomba (ou preparar Push-Dose Pressor de Adrenalina diluída 10 mcg/mL ou Fenilefrina 100 mcg/mL) ANTES do indutor — a pressão positiva e os sedativos podem precipitar PCR pós-intubação!"
        ]
      }
    ],
    "exams": [
      {
        "title": "Avaliação Rápida de Via Aérea Difícil (LEMON e MACOCHA)",
        "items": [
          "Anatômica (LEMON): Look externally, Evaluate 3-3-2, Mallampati III/IV, Obstruction/Obesity, Neck mobility (colar cervical).",
          "Fisiológica (HOP): Hypotension (choque), Oxygenation (hipoxemia grave), pH (acidose metabólica grave como CAD — evitar apneia prolongada!).",
          "Confirmação padrão-ouro pós-passagem do tubo: Capnografia em forma de onda contínua (ETCO2) + ausculta epigástrica e bilateral + radiografia de tórax (ponta do tubo a 3–5 cm da carina)."
        ]
      }
    ],
    "decision_flow": [
      {
        "if": "Paciente com Instabilidade Hemodinâmica, Choque Séptico ou Broncoespasmo Grave (Asma)",
        "then": "Indutor de escolha: CETAMINA 1,5 a 2 mg/kg IV (ex.: 70 kg = 100 a 140 mg IV) OU ETOMIDATO 0,3 mg/kg IV (ex.: 70 kg = 20 mg IV = 1 ampola). Reduzir a dose do indutor pela metade (0,5–1 mg/kg de Cetamina ou 0,15 mg/kg de Etomidato) em choque profundo extremo."
      },
      {
        "if": "Paciente com Status Epilepticus ou Hipertensão Intracraniana sem hipotensão",
        "then": "Indutor: PROPOFOL 1,5 a 2 mg/kg IV (apenas se hemodinamicamente estável!) ou Etomidato 0,3 mg/kg IV / Cetamina 1,5 mg/kg IV."
      },
      {
        "if": "Escolha do Bloqueador Neuromuscular (Paralisia Imediata após o Indutor)",
        "then": "ROCURÔNIO 1,2 mg/kg IV (ex.: 70 kg = 80 a 90 mg IV; início em 45–60s, sem contraindicações metabólicas) OU SUCCINILCOLINA 1,5 mg/kg IV (ex.: 70 kg = 100 mg IV; início em 45s; CONTRAINDICADA em hipercalemia, rabdomiólise, grandes queimados > 48h, denervação/AVC > 72h ou história de hipertermia maligna)."
      }
    ],
    "treatment": [
      {
        "title": "Doses Práticas para Adulto de 70 kg e Pós-Intubação",
        "regimen": "Pré-tratamento + Indução + Paralisia + Manutenção",
        "items": [
          "Pré-tratamento (opcional, 3 min antes se simpaticólise indicada como dissecção de aorta, HIC ou emergência hipertensiva): Fentanil 2 a 3 mcg/kg IV lento (70 kg = 150–200 mcg = 3 a 4 mL).",
          "Indução (4º P - Paralisia com Indução): Etomidato 0,3 mg/kg (20 mg = 10 mL) OU Cetamina 1,5–2 mg/kg (100–140 mg = 2 a 2,8 mL da ampola de 50 mg/mL).",
          "Bloqueio Neuromuscular: Succinilcolina 1,5 mg/kg (100 mg diluídos em 10 mL de AD) OU Rocurônio 1,2 mg/kg (85 mg = 8,5 mL da ampola de 10 mg/mL).",
          "7º P - Cuidados Pós-Intubação Imediatos: Iniciar analgesia + sedação contínua imediatamente (Fentanil + Propofol ou Midazolam, especialmente se usou Rocurônio, cujo bloqueio dura 45–60 min!) e ajustar ventilador em modo protetor (VC 6 mL/kg de peso predito, PEEP >= 5 cmH2O, pressão de platô < 30 cmH2O)."
        ]
      }
    ],
    "linked_drug_terms": [
      "Cetamina",
      "Etomidato",
      "Propofol",
      "Succinilcolina",
      "Rocurônio",
      "Fentanil",
      "Midazolam",
      "Noradrenalina"
    ],
    "red_flags": [
      "NUNCA usar Midazolam em bolus alto (ex.: 10–15 mg) como indutor único na SRI de emergência: tem início de ação lento (2–3 min) e causa hipotensão grave!",
      "Despertar paralisado: o Rocurônio dura até 60 minutos, enquanto o Etomidato dura apenas 8 a 12 minutos — iniciar bomba de sedoanalgesia logo após fixar o tubo!"
    ],
    "source_refs": [
      {
        "label": "Society of Critical Care Medicine (SCCM) Clinical Practice Guidelines for Rapid Sequence Intubation 2023",
        "url": "https://www.sccm.org/"
      }
    ],
    "follow_up": [
      {
        "title": "Cuidados Pós-Intubação Imediata e Parâmetros Iniciais",
        "items": [
          "Confirmação imediata da posição do tubo orotraqueal: capnografia quantitativa de onda (padrão-ouro), ausculta epigástrica e pulmonar bilateral e radiografia de tórax para posicionamento da cânula 3 a 5 cm acima da carina.",
          "Prescrição de sedação e analgesia contínua pós-intubação imediata (Fentanil 1 a 2 mcg/kg/h + Midazolam 0,05 a 0,1 mg/kg/h ou Propofol 1 a 3 mg/kg/h).",
          "Parâmetros iniciais de ventilação protetora: Volume Corrente (VT) 6 mL/kg de peso predito, PEEP 5 a 8 cmH2O, FiO2 inicial 100% titulada rapidamente para SpO2 92–96% e frequência respiratória 12 a 16 rpm.",
          "Aspiração traqueal de secreções, passagem de sonda nasogástrica/orogástrica para descompressão estomacal e cabeceira elevada a 30–45 graus."
        ]
      }
    ],
    "special_situations": [
      {
        "title": "Via Aérea Difícil e Choque Hemodinâmico",
        "items": [
          "Paciente em choque grave (PAM < 65 mmHg): reduzir a dose do indutor pela metade (Etomidato 0,15 mg/kg ou Cetamina 0,5 a 1 mg/kg) e ter vasopressor periférico pronto (push-dose de noradrenalina ou adrenalina) para mitigar colapso hemodinâmico imediato.",
          "Hipertensão Intracraniana / TCE grave: Cetamina ou Etomidato são boas opções; evitar hipoxemia e hipotensão a qualquer custo.",
          "Algoritmo de Falha na Intubação ('Não intubo, não ventilo'): acionar dispositivo supraglótico (máscara laríngea) ou realizar cricotireoidostomia cirúrgica de emergência sem perda de tempo."
        ]
      }
    ],
    "prophylaxis": [
      {
        "title": "Prevenção de Hipóxia, Broncoespasmo e Hipotensão",
        "items": [
          "Pré-oxigenação com fração inspirada a 100% por 3 a 5 minutos (ou 8 respirações em capacidade vital máxima) para ampliar o tempo de apneia segura.",
          "Pré-otimização hemodinâmica: iniciar vasopressor precocemente ou infusão de volume antes dos sedativos se PAS < 100 mmHg para prevenir colapso peri-intubação.",
          "Prevenção de aspiração: sucção a vácuo disponível e pronta; evitar ventilação sob máscara facial com pressão excessiva antes da insuflação do balonete."
        ]
      }
    ]
  },
  {
    "id": "seed-emergencia-hipertensiva",
    "slug": "emergencias-hipertensivas-e-disseccao-aguda-de-aorta",
    "title": "Emergências Hipertensivas e Dissecção Aguda de Aorta",
    "category": "Cardiologia",
    "setting": "Emergência / Sala Vermelha / UTI",
    "status": "verified",
    "linked_recipe_slugs": [
      "prescricao-emergencia-hipertensiva"
    ],
    "summary": "Diferenciação entre Emergência Hipertensiva (lesão aguda de órgão-alvo → droga IV imediata) e Pseudocrise/Urgência Hipertensiva, metas de redução pressórica e manejo da Dissecção Aórtica.",
    "suspicion": [
      {
        "title": "Lesões Agudas de Órgão-Alvo (LOA) que Definem Emergência Hipertensiva",
        "items": [
          "Elevação acentuada da PA (geralmente >= 180x120 mmHg) acompanhada de lesão aguda e progressiva de órgão-alvo:",
          "Neurovascular: Encefalopatia Hipertensiva (cefaleia, confusão, vômitos, alterações visuais/convulsões), AVC Isquêmico ou AVC Hemorrágico / HSA.",
          "Cardiovascular: Edema Agudo de Pulmão Hipertensivo, Síndrome Coronariana Aguda e Dissecção Aguda de Aorta (dor torácica/dorsal lancinante rasgante de intensidade máxima desde o início, assimetria de pulsos/PA > 20 mmHg entre membros).",
          "Renal / Obstétrica: Hipertensão Maligna com retinopatia graus III/IV + microangiopatia trombótica/IRA, ou Eclâmpsia / Pré-Eclâmpsia Grave."
        ]
      }
    ],
    "initial_actions": [
      {
        "title": "Metas Gerais vs. Metas Específicas de Redução da PA",
        "items": [
          "REGRA GERAL (Encefalopatia, Hipertensão Maligna): Reduzir a PAM em no máximo 20% a 25% na 1ª hora; nas próximas 2 a 6 horas reduzir para ~160/100–110 mmHg; e atingir PA normal em 24 a 48h (quedas bruscas causam isquemia cerebral, renal ou coronariana!).",
          "EXCEÇÃO 1 - DISSECÇÃO AGUDA DE AORTA (Redução imediata!): Atingir FC < 60 bpm E PAS entre 100 e 120 mmHg em 5 a 20 minutos!",
          "EXCEÇÃO 2 - EDEMA AGUDO DE PULMÃO HIPERTENSIVO: Reduzir PA imediatamente em 20–25% com Nitroglicerina ou Nitroprussiato + Furosemida + VNI."
        ]
      }
    ],
    "exams": [
      {
        "title": "Rastreio de Lesão de Órgão-Alvo",
        "items": [
          "Fundoscopia direta (pesquisar hemorragias em chama de vela, exsudatos algodonosos e papiledema), ECG de 12 derivações e Radiografia de tórax.",
          "Creatinina, ureia, sódio, potássio, hemograma com pesquisa de esquizócitos, DHL, troponina e EAS (hematúria/proteinúria).",
          "TC de crânio sem contraste (se sintomas neurológicos) ou Angio-TC de Aorta Torácica e Abdominal com sincronização de ECG (se suspeita de dissecção)."
        ]
      }
    ],
    "decision_flow": [
      {
        "if": "Suspeita de Dissecção Aguda de Aorta (Stanford A ou B)",
        "then": "1º PASSO OBRIGATÓRIO: Betabloqueador venoso ANTES do vasodilatador (Esmolol em BIC ou Metoprolol 5 mg IV lento a cada 5 min até 15 mg) para reduzir o dP/dt (estresse de cisalhamento na parede aórtica) até FC < 60 bpm. 2º PASSO: Associar Nitroprussiato de Sódio IV (0,25 a 10 mcg/kg/min) para manter PAS 100–120 mmHg + Morfina IV para controle da dor + Cirurgia imediata se Stanford A (aorta ascendente)."
      },
      {
        "if": "Encefalopatia Hipertensiva ou Hipertensão Maligna",
        "then": "Iniciar Nitroprussiato de Sódio em BIC (0,25 a 10 mcg/kg/min) titulado para reduzir a PAM em 20% na 1ª hora."
      },
      {
        "if": "Elevação pressórica assintomática ou com dor/ansiedade sem lesão de órgão-alvo (Urgência / Pseudocrise)",
        "then": "NÃO usar medicação endovenosa nem nifedipino sublingual! Tratar dor/ansiedade, repouso, reintroduzir anti-hipertensivos de uso crônico ou ajustar via oral (Captopril 25 mg VO ou Anlodipino 5–10 mg VO) com reavaliação ambulatorial em 24–72h."
      }
    ],
    "treatment": [
      {
        "title": "Preparo e Diluição dos Vasodilatadores Parenterais",
        "regimen": "Nitroprussiato (Nipride) vs. Nitroglicerina (Tridil)",
        "items": [
          "Nitroprussiato de Sódio (Nipride — 1 ampola = 50 mg/2 mL): Diluir 1 ampola (50 mg) em 248 mL de SG 5% (concentração = 200 mcg/mL; proteger equipo da luz). Dose: 0,25 a 10 mcg/kg/min (iniciar a 5–10 mL/h e titular a cada 3–5 min).",
          "Nitroglicerina (Tridil — 1 ampola = 50 mg/10 mL): Diluir 1 ampola (50 mg) em 240 mL de SG 5% ou SF 0,9% em frasco de vidro/polietileno (concentração = 200 mcg/mL). Dose: 5 a 200 mcg/min (iniciar a 3–5 mL/h). Preferir em SCA e Edema Agudo de Pulmão.",
          "Metoprolol IV (Seloken — 1 ampola = 5 mg/5 mL): Administrar 5 mg IV lento (1 mg/min), podendo repetir a cada 5 minutos até 3 ampolas (15 mg)."
        ]
      }
    ],
    "linked_drug_terms": [
      "Nitroprussiato de Sódio",
      "Nitroglicerina",
      "Metoprolol",
      "Furosemida",
      "Morfina"
    ],
    "red_flags": [
      "ERRO CRÍTICO NA DISSECÇÃO DE AORTA: Iniciar Nitroprussiato de Sódio isoladamente sem betabloqueio prévio causa taquicardia reflexa e aumenta a força de ejeção ventricular (dP/dt), propagando a dissecção e o risco de ruptura aórtica!",
      "Nifedipino sublingual de ação rápida é proscrito pelo risco de queda pressórica imprevisível, IAM e AVC isquêmico."
    ],
    "source_refs": [
      {
        "label": "Diretrizes Brasileiras de Hipertensão Arterial - SBC",
        "url": "https://abccardiol.org/"
      }
    ],
    "follow_up": [
      {
        "title": "Metas de Redução e Transição para Terapia Oral",
        "items": [
          "Internação obrigatória em leito de monitorização intensiva (UTI ou Sala Vermelha).",
          "Meta pressórica geral: redução de no máximo 20 a 25% da PAM na primeira hora, e para 160/100 mmHg nas próximas 2 a 6 horas (reduções abruptas causam hipoperfusão cerebral e coronariana).",
          "Exceções à regra de redução gradual: Dissecção Aguda de Aorta (meta PAS < 120 e FC < 60 em 20 min) e AVC isquêmico candidato a trombólise (reduzir para PA < 185/110 mmHg).",
          "Transição para anti-hipertensivos orais após 12 a 24 horas de estabilidade, com desmame lento do nitroprussiato/nitroglicerina."
        ]
      }
    ],
    "special_situations": [
      {
        "title": "Dissecção Aórtica e Toxicidade por Nitroprussiato",
        "items": [
          "Dissecção Aguda de Aorta: SEMPRE iniciar betabloqueador endovenoso (Esmolol ou Metoprolol) ANTES de vasodilatadores arteriais como nitroprussiato, para evitar taquicardia reflexa e aumento da força de cisalhamento aórtico (dP/dt).",
          "Infusão prolongada de Nitroprussiato de Sódio (> 48-72h ou em altas doses > 3 mcg/kg/min): risco de toxicidade por cianeto e tiocianato (acidose metabólica com ânion gap elevado, confusão e hipóxia tecidual inexplicada).",
          "Crise associada ao Feocromocitoma ou cocaína: nunca usar betabloqueador isolado pelo risco de estimulação alfa desimpedida e piora dramática da crise; usar bloqueador alfa (Fentolamina) antes."
        ]
      }
    ],
    "prophylaxis": [
      {
        "title": "Prevenção de Ruptura Aórtica e Prevenção Secundária",
        "items": [
          "Controle rigoroso do duplo produto na dissecção de aorta: FC < 60 bpm com betabloqueador IV (Esmolol/Metoprolol) ANTES de iniciar vasodilatador para evitar taquicardia reflexa e estresse de cisalhamento da parede da aorta.",
          "Transição ambulatorial: associação de 2 a 3 classes de anti-hipertensivos orais (IECA/BRA + Bloqueador de Canal de Cálcio + Tiazídico).",
          "Adesão ao tratamento crônico com metas pressóricas ambulatoriais rigorosas (< 130/80 mmHg)."
        ]
      }
    ]
  },
  {
    "id": "seed-eap",
    "slug": "edema-agudo-de-pulmao-ic-descompensada",
    "title": "Edema Agudo de Pulmão (EAP) e Insuficiência Cardíaca Descompensada",
    "category": "Cardiologia",
    "setting": "Emergência / Sala Vermelha / UTI",
    "status": "verified",
    "linked_recipe_slugs": [
      "prescricao-edema-agudo-pulmao"
    ],
    "summary": "Abordagem imediata do Edema Agudo de Pulmão Cardiogênico (VNI precoce, Nitratos, Furosemida) e manejo guiado pelos Perfis Hemodinâmicos de Nohria-Stevenson (A, B, C e L).",
    "suspicion": [
      {
        "title": "Quadro Clínico e Classificação Hemodinâmica (Quente/Frio vs. Seco/Úmido)",
        "items": [
          "Início súbito de dispneia grave, ortopneia dramática, taquipneia (> 30 irpm), esforço respiratório, estertores crepitantes difusos em maré montante, expectoração rósea espumosa e linhas B difusas bilaterais no POCUS pulmonar.",
          "PERFIL B (Quente e Úmido — mais comum, ~70%): Congestão pulmonar/sistêmica COM boa perfusão periférica (frequentemente hipertenso).",
          "PERFIL C (Frio e Úmido — grave): Congestão pulmonar/sistêmica ASSOCIADA a hipoperfusão periférica (extremidades frias, livedo, oligúria, confusão, lactato elevado, pulso fino).",
          "PERFIL L (Frio e Seco): Hipoperfusão sem congestão pulmonar."
        ]
      }
    ],
    "initial_actions": [
      {
        "title": "Pacote dos Primeiros 15 Minutos no EAP Hipertensivo/Normotenso",
        "items": [
          "1. Posicionar o paciente sentado com as pernas pendentes para fora do leito (reduz retorno venoso pré-carga).",
          "2. VENTILAÇÃO NÃO INVASIVA (VNI - CPAP 5–10 cmH2O ou BiPAP) IMEDIATA: intervenção nível IA que reduz trabalho respiratório, pré-carga, pós-carga do VE, taxa de intubação e mortalidade!",
          "3. VASODILATADOR VENOSO PRECOCE (principal droga no EAP hipertensivo!): Nitroglicerina IV (Tridil 10–200 mcg/min) ou Nitroprussiato de Sódio IV (0,3–5 mcg/kg/min). Enquanto prepara a bomba, pode-se administrar Dinitrato de Isossorbida 5 mg sublingual.",
          "4. DIURÉTICO DE ALÇA IV: Furosemida 0,5 a 1 mg/kg IV em bolus (se já usa furosemida domiciliar, fazer 1 a 2x a dose diária oral habitual em bolus IV; ex.: 40 a 80 mg IV)."
        ]
      }
    ],
    "exams": [
      {
        "title": "Investigação de Fatores Descompensantes (CHAMPS)",
        "items": [
          "ECG de 12 derivações e Troponina na chegada (afastar Síndrome Coronariana Aguda como causa do EAP!).",
          "Ultrassonografia POCUS pulmonar e cardíaca, Radiografia de tórax, Gasometria arterial com lactato, BNP/NT-proBNP, creatinina, ureia, sódio, potássio, magnésio e hemograma.",
          "Lembrar mnemônico CHAMPS: Coronária (IAM), Hipertensão, Arritmia (FA aguda), Mecânica (valvopatia aguda), Pulmonar (TEP/Infecção), Sistêmica (má adesão, AINEs, anemia, tireoide)."
        ]
      }
    ],
    "decision_flow": [
      {
        "if": "Perfil B (Quente e Úmido) com PAS > 110 mmHg",
        "then": "VNI + Vasodilatador IV em dose titulável (Nitroglicerina ou Nitroprussiato) + Furosemida IV (avaliar débito urinário em 2h: meta > 100–150 mL/h; se insuficiente, dobrar a dose de furosemida)."
      },
      {
        "if": "Perfil C (Frio e Úmido) com PAS >= 90 mmHg",
        "then": "Iniciar Inotrópico: Dobutamina 2,5 a 20 mcg/kg/min IV (ou Milrinona / Levosimendana se em uso de betabloqueador crônico) + Furosemida IV após melhora da perfusão."
      },
      {
        "if": "Perfil C em Choque Cardiogênico (PAS < 90 mmHg ou PAM < 65 mmHg)",
        "then": "Associar Vasopressor (Noradrenalina 1ª escolha no choque cardiogênico) + Inotrópico (Dobutamina) e considerar suporte circulatório mecânico / cineangiocoronariografia."
      }
    ],
    "treatment": [
      {
        "title": "Manejo de Medicações de Uso Crônico na Internação",
        "regimen": "Regras sobre Betabloqueador, IECA e Morfina",
        "items": [
          "Betabloqueador de uso prévio (Carvedilol, Bisoprolol, Succinato de Metoprolol): NÃO suspender no Perfil B (manter ou reduzir dose pela metade); suspender temporariamente APENAS se choque cardiogênico (Perfil C grave com uso de inotrópico), bradicardia sintomática ou BAV avançado.",
          "Morfina IV: NÃO deve ser usada de rotina no EAP (estudos mostram aumento da necessidade de ventilação mecânica, internação em UTI e mortalidade); reservar 2–3 mg IV apenas para agitação/ansiedade extrema refratária."
        ]
      }
    ],
    "linked_drug_terms": [
      "Furosemida",
      "Nitroglicerina",
      "Nitroprussiato de Sódio",
      "Dobutamina",
      "Noradrenalina"
    ],
    "red_flags": [
      "Rebaixamento do nível de consciência (Glasgow <= 8), vômitos incoercíveis ou falha da VNI após 30–60 min com hipoxemia/acidose progressiva -> Intubação Orotraqueal imediata.",
      "Monitorar rigorosamente o Potássio e Magnésio séricos a cada 6–12h durante diureticoterapia intensiva para prevenir arritmias ventriculares."
    ],
    "source_refs": [
      {
        "label": "Diretriz Brasileira de Insuficiência Cardíaca Aguda e Crônica - SBC",
        "url": "https://abccardiol.org/"
      },
      {
        "label": "ESC Guidelines for the Diagnosis and Treatment of Acute and Chronic Heart Failure",
        "url": "https://www.escardio.org/Guidelines"
      }
    ],
    "follow_up": [
      {
        "title": "Monitorização em Enfermaria/UTI e Otimização Terapêutica",
        "items": [
          "Monitorização seriada de débito urinário horário, eletrólitos (sódio e potássio), ureia e creatinina durante o uso intensivo de diuréticos de alça.",
          "Ecocardiograma transtorácico prioritário para mensuração de fração de ejeção, disfunção diastólica e avaliação de valvopatias graves (estenose aórtica, insuficiência mitral aguda).",
          "Transição pós-crise: iniciar terapia quádrupla para IC com fração de ejeção reduzida assim que estável e euvolêmico (IECA/BRA/sacubitril-valsartana, betabloqueador, espironolactona e iSGLT2).",
          "Alta com balanço hídrico estável, peso seco aferido e consulta de retorno em 7 a 14 dias."
        ]
      }
    ],
    "special_situations": [
      {
        "title": "EAP Hipertensivo vs EAP Cardiogênico com Hipotensão",
        "items": [
          "EAP Hipertensivo com PAS >= 160 mmHg: tratamento de escolha é vasodilatador venoso/arterial precoce (Nitroglicerina ou Nitroprussiato IV) para redução rápida de pós-carga e pré-carga, associado a VNI precoce.",
          "EAP com Hipotensão (PAS < 90 mmHg / Choque Cardiogênico): vasodilatadores e VNI são contraindicados; iniciar suporte inotrópico (Dobutamina) e vasopressor (Noradrenalina) e acionar hemodinâmica para avaliar suporte mecânico circulatório (balão intra-aórtico / ECMO).",
          "Estenose Aórtica Grave: vasodilatadores em altas doses podem provocar colapso hemodinâmico por débito cardíaco fixo; titular drogas com monitorização invasiva."
        ]
      }
    ],
    "prophylaxis": [
      {
        "title": "Prevenção de Readmissões e Otimização Terapêutica Quádrupla",
        "items": [
          "Pilares modificadores de mortalidade na IC com fração de ejeção reduzida: IECA/BRA ou Sacubitril-Valsartana + Betabloqueador (Carvedilol/Succinato de Metoprolol) + Antagonista de Mineralocorticoide (Espironolactona) + Inibidor de SGLT2 (Dapagliflozina/Empagliflozina).",
          "Educação e automonitoramento: pesagem diária, restrição de sal (máximo 2 a 3 g de sal de cozinha/dia) e restrição hídrica moderada se hiponatremia.",
          "Identificação e controle de fatores desencadeantes: má adesão medicamentosa, infecções, arritmias e uso inadequado de AINEs."
        ]
      }
    ]
  },
  {
    "id": "seed-fa-aguda",
    "slug": "fibrilacao-atrial-alta-resposta-emergencia",
    "title": "Fibrilação Atrial (FA) de Alta Resposta Ventricular na Emergência",
    "category": "Cardiologia",
    "setting": "Pronto-Socorro / Sala de Emergência",
    "status": "verified",
    "linked_recipe_slugs": [
      "prescricao-fa-aguda"
    ],
    "summary": "Algoritmo de decisão entre Cardioversão Elétrica Imediata (instabilidade), Controle de Frequência Cardíaca (< 110 bpm), Controle de Ritmo (regra das 48h / Eco TE) e Anticoagulação (CHA₂DS₂-VASc).",
    "suspicion": [
      {
        "title": "Diagnóstico Eletrocardiográfico e Avaliação de Estabilidade",
        "items": [
          "ECG: ritmo irregularmente irregular (intervalos R-R variáveis), ausência de ondas P distintas (substituídas por ondas fibrilatórias 'f') e QRS estreito (< 120 ms), salvo bloqueio de ramo prévio ou condução aberrante.",
          "CRITÉRIOS DE INSTABILIDADE HEMODINÂMICA (5 Ds): Dor torácica isquêmica anginosa, Dispneia/Edema Agudo de Pulmão, Diminuição da consciência (síncope/confusão), Diminuição da PA (choque/hipotensão sintomática) ou Descompensação aguda de IC."
        ]
      }
    ],
    "initial_actions": [
      {
        "title": "Conduta Imediata Conforme Estabilidade",
        "items": [
          "1. SE INSTÁVEL: Cardioversão Elétrica Sincronizada (CVE) imediata (120 a 200 J bifásico) após sedoanalgesia (ex.: Fentanil + Etomidato ou Propofol) + Heparinização plena concomitante!",
          "2. SE ESTÁVEL: Investigar se a FA é SECUNDÁRIA a uma causa aguda reversível (sepse, pneumonia, TEP, tireotoxicose, hipocalemia/hipomagnesemia, abstinência alcoólica, pós-operatório) — nesses casos, a prioridade é tratar a causa de base e controlar a FC (não cardioverter!).",
          "3. Iniciar Controle da Frequência Cardíaca (meta inicial: FC de repouso < 110 bpm)."
        ]
      }
    ],
    "exams": [
      {
        "title": "Propedêutica na Sala de Emergência",
        "items": [
          "ECG de 12 derivações (procurar pré-excitação ventricular / onda delta da síndrome de Wolff-Parkinson-White!).",
          "Potássio, magnésio, cálcio, função renal, hemograma, TSH/T4 livre, troponina (se dor torácica) e radiografia de tórax.",
          "Ecocardiograma Transtorácico (avaliar FEVE e tamanho atrial) e Transesofágico (se planejar cardioversão em FA > 48h ou duração indeterminada)."
        ]
      }
    ],
    "decision_flow": [
      {
        "if": "Paciente Estável com FEVE preservada (>= 40%) — Controle de FC",
        "then": "Betabloqueador IV: Metoprolol 5 mg IV lento em 2–5 min (repetir a cada 5 min até 15 mg) seguido de Metoprolol 25–100 mg VO 12/12h (ou Diltiazem/Verapamil IV)."
      },
      {
        "if": "Paciente Estável com IC descompensada ou FEVE reduzida (< 40%) — Controle de FC",
        "then": "EVITAR bloqueadores de canal de cálcio (Verapamil/Diltiazem) e cautela com betabloqueador IV se congesto! Usar Deslanosídeo (Cedilanide) 0,4 mg IV ou Digoxina 0,25 mg IV/VO OU Amiodarona 150–300 mg IV em 30–60 min (atenção: amiodarona pode reverter o ritmo para sinusal — cuidado se FA > 48h sem anticoagulação!)."
      },
      {
        "if": "Reversão do Ritmo (Cardioversão Química ou Elétrica Eletiva no PS)",
        "then": "SOMENTE se início comprovadamente < 48h (ou < 12–24h se alto risco embólico), OU após 3 semanas de anticoagulação plena efetiva, OU após Ecocardiograma Transesofágico sem trombo no apêndice atrial esquerdo. Opções químicas: Propafenona 600 mg VO dose única ('pill-in-the-pocket', APENAS em coração estruturalmente normal sem DAC/IC!) ou Amiodarona 5–7 mg/kg (300 mg) IV em 30–60 min seguida de 900 mg em 24h."
      }
    ],
    "treatment": [
      {
        "title": "Anticoagulação Pós-Cardioversão e Crônica",
        "regimen": "DOACs (Apixabana, Rivaroxabana, Dabigatrana, Edoxabana) ou Varfarina",
        "items": [
          "Após qualquer cardioversão (elétrica ou química): anticoagular por pelo menos 4 SEMANAS para todos os pacientes (devido ao atordoamento mecânico atrial pós-reversão), e manter indefinidamente se CHA2DS2-VASc >= 2 em homens ou >= 3 em mulheres.",
          "Apixabana: 5 mg VO 12/12h (reduzir para 2,5 mg 12/12h se >= 2 critérios: idade >= 80 anos, peso <= 60 kg ou creatinina >= 1,5 mg/dL).",
          "Rivaroxabana: 20 mg VO 1x/dia junto à principal refeição (15 mg/dia se ClCr 15–49 mL/min)."
        ]
      }
    ],
    "linked_drug_terms": [
      "Metoprolol",
      "Amiodarona",
      "Rivaroxabana",
      "Enoxaparina"
    ],
    "red_flags": [
      "FA PRE-EXCITADA (Wolff-Parkinson-White — FA rápida irregular com QRS largo polimórfico e intervalos R-R curtíssimos < 250 ms): SÃO ESTRITAMENTE PROIBIDOS os bloqueadores do nó AV (Amiodarona, Metoprolol, Verapamil, Diltiazem, Digoxina e Adenosina), pois desviam todo o estímulo para a via acessória e precipitam Fibrilação Ventricular! Conduta: Cardioversão Elétrica Imediata (ou Procainamida/Ibutilida)."
    ],
    "source_refs": [
      {
        "label": "ESC Guidelines for the Management of Atrial Fibrillation 2024",
        "url": "https://www.escardio.org/Guidelines"
      },
      {
        "label": "Diretrizes Brasileiras de Fibrilação Atrial - SBC",
        "url": "https://abccardiol.org/"
      }
    ],
    "follow_up": [
      {
        "title": "Estratégia de Controle e Prevenção de AVC",
        "items": [
          "Estratificação formal de risco tromboembólico pelo escore CHA2DS2-VASc e de sangramento pelo HAS-BLED.",
          "Indicação de anticoagulação oral plena para todos os homens com escore >= 2 e mulheres com escore >= 3 (preferir DOACs: Apixabana, Rivaroxabana ou Dabigatrana).",
          "Se controle de frequência escolhido: alvo de FC em repouso < 110 bpm com Betabloqueador (Metoprolol/Bisoprolol) ou Bloqueador de Canal de Cálcio (Diltiazem/Verapamil se FEVE preservada).",
          "Consulta ambulatorial com cardiologia para definição de controle de ritmo vs taxa de frequência e acompanhamento de ecocardiograma."
        ]
      }
    ],
    "special_situations": [
      {
        "title": "Síndrome de Wolff-Parkinson-White e Choque Hemodinâmico",
        "items": [
          "Fibrilação Atrial com Pré-Excitação (Wolff-Parkinson-White com QRS alargado e irregular): CONTRAINDICAÇÃO ABSOLUTA a drogas que bloqueiam o nó AV (Adenosina, Betabloqueadores, Diltiazem, Verapamil e Digoxina) pelo risco de condução preferencial pela via acessória e degeneração para Fibrilação Ventricular fatal; tratar com Cardioversão Elétrica Sincronizada ou Procainamida.",
          "FA Instável com Hipotensão ou Dor Torácica: Cardioversão Elétrica Sincronizada imediata com 120 a 200 J bifásico sob sedação rápida com Etomidato ou Propofol.",
          "FA com duração desconhecida ou > 48 horas: cardioversão química ou elétrica sem ecocardiograma transesofágico prévio exige 3 semanas de anticoagulação prévia ou exclusão formal de trombo em apêndice atrial esquerdo."
        ]
      }
    ],
    "prophylaxis": [
      {
        "title": "Profilaxia de AVC e Fenômenos Tromboembólicos",
        "items": [
          "Estratificação do risco embólico com CHA2DS2-VASc: anticoagulação oral formal indicada se escore >= 2 em homens ou >= 3 em mulheres.",
          "Preferência por DOACs (Rivaroxabana, Apixabana, Dabigatrana ou Edoxabana) sobre varfarina devido ao menor risco de hemorragia intracraniana.",
          "Regra das 48 horas para cardioversão: se FA com mais de 48h ou duração incerta sem instabilidade hemodinâmica, não cardioverter sem 3 semanas de anticoagulação plena prévia ou ecocardiograma transesofágico sem trombos."
        ]
      }
    ]
  },
  {
    "id": "seed-pancreatite",
    "slug": "pancreatite-aguda-criterios-atlanta-hidratacao-manejo",
    "title": "Pancreatite Aguda (Critérios de Atlanta, Hidratação e Analgesia)",
    "category": "Gastroenterologia",
    "setting": "Emergência / Enfermaria / UTI",
    "status": "verified",
    "summary": "Diagnóstico pelos Critérios de Atlanta Revisados, ressuscitação volêmica moderada com Ringer Lactato (estudo WATERFALL), analgesia multimodal, nutrição oral precoce e abordagem da etiologia biliar.",
    "suspicion": [
      {
        "title": "Critérios de Atlanta Revisados (Exige >= 2 de 3 critérios)",
        "items": [
          "1. Dor abdominal típica: dor epigástrica aguda, intensa, persistente, frequentemente com irradiação em faixa/barra para o dorso.",
          "2. Amilase sérica e/ou Lipase sérica >= 3 vezes o limite superior da normalidade (a Lipase é mais sensível e específica e permanece elevada por mais tempo).",
          "3. Achados característicos de pancreatite aguda em exame de imagem (TC de abdome com contraste, RM ou USG)."
        ]
      }
    ],
    "initial_actions": [
      {
        "title": "Manejo nas Primeiras 24 Horas (Ressuscitação Moderada - WATERFALL)",
        "items": [
          "1. HIDRATAÇÃO COM RINGER LACTATO (superior ao SF 0,9% por reduzir SIRS e hipercloremia): Ressuscitação MODERADA dirigida por metas (estudo WATERFALL NEJM 2022 mostrou que hidratação agressiva causa sobrecarga volêmica sem benefício): Bolus inicial de 10 mL/kg APENAS se hipovolemia, seguido de 1,5 mL/kg/h de Ringer Lactato, reavaliando em 12, 24, 48 e 72h.",
          "2. Metas de perfusão: Débito urinário >= 0,5 mL/kg/h, PAM >= 65 mmHg, queda progressiva do hematócrito (< 44%) e da ureia/BUN nas primeiras 24h.",
          "3. ANALGESIA POTENTE IMEDIATA: Dipirona 1 g IV 6/6h + Opioide IV titulado (Morfina 2–4 mg IV ou Fentanil / Tramadol — opioides NÃO pioram o prognóstico da pancreatite!) + Ondansetrona 4–8 mg IV 8/8h."
        ]
      }
    ],
    "exams": [
      {
        "title": "Exames de Admissão e Indicação Correta de TC",
        "items": [
          "Lipase, amilase, hemograma (hematócrito > 44% indica hemoconcentração), ureia/BUN (> 20 mg/dL ou em elevação associa-se a mortalidade), creatinina, TGO, TGP, GGT, FA, bilirrubinas (ALT > 150 U/L tem VPP > 95% para etiologia biliar!), cálcio, triglicerídeos (> 1.000 mg/dL = hipertrigliceridêmica), PCR e gasometria arterial.",
          "Ultrassonografia de Abdome Superior na admissão paraTODOS os pacientes (pesquisar colelitíase e dilatação de vias biliares).",
          "TC de Abdome com contraste: NÃO solicitar de rotina nas primeiras 48–72 horas se o diagnóstico clínico-laboratorial já estiver fechado (a necrose pancreática leva 72–96h para se delimitar na TC)."
        ]
      }
    ],
    "decision_flow": [
      {
        "if": "Classificação de Gravidade de Atlanta (Leve vs. Moderadamente Grave vs. Grave)",
        "then": "Leve: sem disfunção orgânica e sem complicações locais. Moderadamente Grave: disfunção orgânica transitória (< 48h) e/ou complicação local. Grave: disfunção orgânica PERSISTENTE (> 48h — escore de Marshall >= 2 cardiovascular, respiratório ou renal) -> Internação em UTI."
      },
      {
        "if": "Pancreatite Aguda Biliar COM Colangite Aguda associada (Tríade de Charcot / Pêntade de Reynolds)",
        "then": "Indicar CPRE (Colangiopancreatografia Retrógrada Endoscópica) de urgência em até 24 horas + Antibioticoterapia IV."
      },
      {
        "if": "Pancreatite Aguda Biliar Leve recuperada",
        "then": "Realizar Colecistectomia Videolaparoscópica na MESMA internação hospitalar antes da alta (previne recorrência de até 30% em poucas semanas!)."
      }
    ],
    "treatment": [
      {
        "title": "Nutrição Precoce e Uso Racional de Antibióticos",
        "regimen": "Quebra de Paradigmas: Dieta Precoce e Não Usar ATB Profilático",
        "items": [
          "Nutrição Oral Precoce: NÃO manter 'dieta zero' prolongada! Assim que a dor estiver em melhora e sem vômitos (geralmente nas primeiras 24–48h), iniciar dieta oral hipogordurosa/branda diretamente (reduz translocação bacteriana e tempo de internação). Se intolerância oral > 72–96h em casos graves: Nutrição Enteral por sonda (superior à parenteral!).",
          "Antibióticos Profiláticos NÃO são recomendados na pancreatite aguda (nem mesmo na pancreatite necrosante estéril!). Iniciar antibiótico (ex.: Meropenem ou Ciprofloxacino + Metronidazol) APENAS se houver necrose pancreática INFECTADA (gás no retroperitônio na TC ou deterioração séptica após 7–10 dias) ou infecção extrapancreática (colangite, pneumonia, ITU)."
        ]
      }
    ],
    "linked_drug_terms": [
      "Dipirona",
      "Morfina",
      "Ondansetrona",
      "Meropenem"
    ],
    "red_flags": [
      "Critérios de alerta na admissão (BISAP >= 3): BUN > 25 mg/dL, Impaired mental status (Glasgow < 15), SIRS >= 2, Age > 60 anos, Pleural effusion (derrame pleural).",
      "Síndrome de Compartimento Abdominal por ressuscitação volêmica excessiva."
    ],
    "source_refs": [
      {
        "label": "ACG Guidelines: Management of Acute Pancreatitis 2024",
        "url": "https://gi.org/"
      },
      {
        "label": "Aggressive or Moderate Fluid Resuscitation in Acute Pancreatitis (WATERFALL Trial - NEJM 2022)",
        "url": "https://www.nejm.org/doi/full/10.1056/NEJMoa2202884"
      }
    ],
    "follow_up": [
      {
        "title": "Monitorização e Reavaliação Clínico-Laboratorial",
        "items": [
          "Reavaliação contínua da hidratação nas primeiras 24 horas guiada por hematócrito (queda progressiva se hemoconcentrado), diurese (> 0,5 a 1 mL/kg/h) e melhora da ureia/creatinina.",
          "Realimentação oral precoce: iniciar dieta líquida ou pastosa de baixo teor lipídico assim que houver redução da dor abdominal e resolução do íleo adinâmico (não aguardar normalização completa de amilase/lipase).",
          "Investigação da causa etiológica: Ultrassonografia de abdome total obrigatória para pesquisa de colelitíase/microlitíase biliar; lipidograma (triglicerídeos > 1000 mg/dL) e dosagem de cálcio sérico.",
          "Colecistectomia videolaparoscópica indicada ainda na mesma internação se pancreatite biliar leve para evitar recidiva precoce."
        ]
      }
    ],
    "special_situations": [
      {
        "title": "Pancreatite Grave e Necrose Infectada",
        "items": [
          "Indicação de Tomografia Computadorizada de Abdome com contraste: realizar preferencialmente após 72 a 96 horas do início do quadro para correta delimitação de necrose pancreática e peripancreática (TC precoce subestima a necrose).",
          "Profilaxia antimicrobiana empírica de rotina: NÃO recomendada pelas diretrizes, mesmo em pancreatite com necrose estéril.",
          "Suspeita de necrose infectada (febre persistente após 7–14 dias, piora clínica ou gás no retroperitônio na TC): iniciar Meropenem 1g 8/8h IV e programar abordagem escalonada ('step-up approach': drenagem percutânea antes de necrosectomia cirúrgica)."
        ]
      }
    ],
    "linked_recipe_slugs": [
      "prescricao-pancreatite"
    ],
    "prophylaxis": [
      {
        "title": "Prevenção de Necrose Infectada e Colecistectomia Profilática",
        "items": [
          "Antibioticoprofilaxia de rotina NÃO é recomendada mesmo em pancreatite com necrose estéril.",
          "Colecistectomia na mesma internação em pancreatite biliar leve para prevenir recorrência precoce com risco de complicação grave.",
          "Controle estrito de hipertrigliceridemia (meta < 500 mg/dL) e cessação de ingesta alcoólica."
        ]
      }
    ]
  },
  {
    "id": "seed-meningite",
    "slug": "meningite-bacteriana-aguda-antibioticoterapia-dexametasona",
    "title": "Meningite Bacteriana Aguda (Antibioticoterapia Empírica e Dexametasona)",
    "category": "Infectologia",
    "setting": "Emergência / Sala de Isolamento / UTI",
    "status": "verified",
    "linked_recipe_slugs": [
      "prescricao-meningite-bacteriana"
    ],
    "summary": "Emergência infectológica: isolamento de gotículas, indicações de TC de crânio antes da punção lombar, Dexametasona antes da 1ª dose de Ceftriaxona em dose meníngea e quimioprofilaxia de contactantes.",
    "suspicion": [
      {
        "title": "Apresentação Clínica e Sinais Meníngeos",
        "items": [
          "Tríade clássica (presente completa em ~44% dos adultos): Febre alta + Rigidez de nuca + Alteração do estado mental (quase 95% dos pacientes têm pelo menos 2 dos 4: cefaleia intensa, febre, rigidez de nuca e alteração do sensório).",
          "Sinais de irritação meníngea: Rigidez de nuca, Sinal de Kernig e Sinal de Brudzinski.",
          "Atenção para petéquias ou sufusões hemorrágicas / púrpura fulminante (Meningococcemia por Neisseria meningitidis)."
        ]
      }
    ],
    "initial_actions": [
      {
        "title": "Conduta na 1ª Hora (NUNCA atrasar o antibiótico por causa da TC!)",
        "items": [
          "1. Instituir Precaução por Gotículas imediatamente na suspeita de meningite meningocócica ou por H. influenzae (manter até completar 24 horas de antibioticoterapia eficaz).",
          "2. Coletar 2 pares de hemoculturas imediatamente.",
          "3. Avaliar se há indicação de TC de Crânio ANTES da Punção Lombar (PL): Imunossuprimidos graves (HIV/transplante), História de lesão do SNC (massa, AVC, infecção focal), Crise convulsiva de início recente (< 1 semana), Papiledema, Rebaixamento moderado a grave da consciência (Glasgow < 10–12) ou Déficit neurológico focal.",
          "4. SE NÃO HOUVER indicação de TC: realizar Punção Lombar imediata e iniciar Dexametasona + Antibiótico logo em seguida. SE HOUVER indicação de TC: coletar hemoculturas, administrar Dexametasona + 1ª dose de Antibiótico IMEDIATAMENTE e levar para a TC antes da punção lombar!"
        ]
      }
    ],
    "exams": [
      {
        "title": "Padrões Liquóricos Clássicos (Bacteriana vs. Viral vs. Tuberculosa/Fúngica)",
        "items": [
          "Meningite Bacteriana: Líquor turvo/purulento, Pressão de abertura > 20 cmH2O, Leucócitos > 500–1.000/mm³ com predomínio de Neutrófilos (PMN > 80%), Proteínas elevadas (> 100–150 mg/dL), Glicose baixa (< 40 mg/dL ou relação glicorraquia/glicemia < 0,4) e Lactato liquórico >= 3,5–4,0 mmol/L.",
          "Meningite Viral: Líquor límpido, < 500 células com predomínio linfomononuclear, proteínas normais ou discretamente elevadas (< 100 mg/dL) e glicose normal.",
          "Meningite Tuberculosa / Fúngica: Predomínio linfomononuclear + Proteínas elevadas + Glicose BAIXA (solicitar ADA, BAAR/GeneXpert, Tinta da China e antígeno criptocócico CrAg)."
        ]
      }
    ],
    "decision_flow": [
      {
        "if": "Adulto imunocompetente de 18 a 50 anos (Pneumococo e Meningococo)",
        "then": "Ceftriaxona 2 g IV de 12/12h (4 g/dia — DOSE DOBRADA MENÍNGEA!) + Dexametasona (associar Vancomicina 15–20 mg/kg IV 8/8h ou 12/12h em locais com prevalência de Pneumococo resistente às cefalosporinas)."
      },
      {
        "if": "Adulto > 50 anos, Gestante, Etilista crônico ou Imunossuprimido (risco de Listeria monocytogenes)",
        "then": "Ceftriaxona 2 g IV 12/12h + AMPICILINA 2 g IV de 4/4h (12 g/dia para cobrir Listeria, que é intrinsecamente resistente às cefalosporinas!)."
      },
      {
        "if": "Pós-neurocirurgia, DVP/DVE ou TCE penetrante (Staphylococcus e Pseudomonas)",
        "then": "Vancomicina (ataque 25–30 mg/kg + 15–20 mg/kg 8/8h–12/12h) + Cefepima 2 g IV 8/8h OU Meropenem 2 g IV de 8/8h."
      }
    ],
    "treatment": [
      {
        "title": "Corticoterapia Adjuvante e Quimioprofilaxia de Contactantes",
        "regimen": "Dexametasona Precoce e Rifampicina / Ciprofloxacino",
        "items": [
          "Dexametasona IV: 0,15 mg/kg IV de 6/6h (adulto 70 kg = 10 mg IV 6/6h) por 4 dias — administrar 15 a 20 minutos ANTES ou junto com a 1ª dose do antibiótico (reduz perda auditiva e mortalidade na meningite pneumocócica; não iniciar se o paciente já estiver em uso de antibiótico há > 12h).",
          "Quimioprofilaxia para Meningococo (contactantes íntimos domiciliares ou profissionais expostos a secreções respiratórias desprotegidos na IOT/aspiração): Rifampicina 600 mg VO 12/12h por 2 dias (4 doses no total) OU Ciprofloxacino 500 mg VO dose única (adultos) OU Ceftriaxona 250 mg IM dose única (1ª escolha em gestantes)."
        ]
      }
    ],
    "linked_drug_terms": [
      "Ceftriaxona",
      "Vancomicina",
      "Meropenem"
    ],
    "notification": {
      "text": "Notificação Compulsória Imediata (< 24h) à Vigilância Epidemiológica para bloqueio vacinal e quimioprofilaxia de contactantes."
    },
    "red_flags": [
      "ATENÇÃO À DOSE: A dose de Ceftriaxona para meningite bacteriana em adultos é de 2 g IV a cada 12 horas (4 g/dia), e NÃO 2 g 1x/dia!",
      "Se associar Aciclovir IV empírico (10 mg/kg IV 8/8h) por suspeita de meningoencefalite herpética (confusão, afasia, crises focais, alteração temporal): manter hidratação venosa vigorosa para evitar nefropatia cristalúrica pelo aciclovir."
    ],
    "source_refs": [
      {
        "label": "IDSA Practice Guidelines for the Management of Bacterial Meningitis",
        "url": "https://www.idsociety.org/"
      },
      {
        "label": "Ministério da Saúde - Guia de Vigilância em Saúde (Meningites)",
        "url": "https://www.gov.br/saude/"
      }
    ],
    "follow_up": [
      {
        "title": "Acompanhamento em Enfermaria e Profilaxia de Contatos",
        "items": [
          "Manter precaução para gotículas nas primeiras 24 horas de antibioticoterapia eficaz se suspeita de Neisseria meningitidis (meningococo) ou Haemophilus influenzae.",
          "Completar tempo total de antibioticoterapia direcionada: 7 dias para N. meningitidis, 10 a 14 dias para S. pneumoniae e 21 dias para L. monocytogenes ou bacilos Gram-negativos.",
          "Avaliação audiológica e neurológica antes da alta para detecção precoce de sequelas (hipoacusia neurossensorial, déficits motores).",
          "Quimioprofilaxia de contatos domiciliares e íntimos na meningococcemia: Rifampicina 600 mg VO de 12/12h por 2 dias (dose pediátrica 10 mg/kg) ou Ceftriaxona 250 mg IM dose única ou Ciprofloxacino 500 mg VO dose única."
        ]
      }
    ],
    "special_situations": [
      {
        "title": "Idosos, Imunodeprimidos e Dexametasona",
        "items": [
          "Dexametasona 10 mg IV: administrar ANTES ou junto da primeira dose de antimicrobiano para reduzir lesão inflamatória cerebral e perda auditiva no pneumococo; manter 10 mg de 6/6h por 4 dias se S. pneumoniae confirmado no líquor.",
          "Pacientes com idade >= 50 anos, etilistas crônicos, gestantes ou imunossuprimidos: obrigatoriedade de associar Ampicilina 2g IV 4/4h à Ceftriaxona para cobertura de Listeria monocytogenes.",
          "Suspeita de hipertensão intracraniana grave (coma profundo, papiledema, déficit focal novo): colher hemoculturas e iniciar antimicrobianos + dexametasona IMEDIATAMENTE e realizar TC de crânio antes da punção lombar."
        ]
      }
    ],
    "prophylaxis": [
      {
        "title": "Quimioprofilaxia de Contactantes Próximos",
        "items": [
          "Contactantes de Meningite Meningocócica (Neisseria meningitidis): Rifampicina 600 mg VO 12/12h por 2 dias (adulto) ou Ceftriaxona 250 mg IM dose única ou Ciprofloxacino 500 mg VO dose única o mais rápido possível.",
          "Contactantes de Haemophilus influenzae tipo b: Rifampicina 600 mg VO 1x/dia por 4 dias para famílias com crianças menores de 4 anos não vacinadas.",
          "Isolamento respiratório de gotículas mantido até 24 horas após o início do antibiótico efetivo."
        ]
      }
    ]
  },
  {
    "id": "seed-pac",
    "slug": "pneumonia-adquirida-na-comunidade-pac",
    "title": "Pneumonia Adquirida na Comunidade (PAC — Ambulatório, Enfermaria e UTI)",
    "category": "Pneumologia",
    "setting": "Ambulatório / Pronto-Socorro / Enfermaria / UTI",
    "status": "verified",
    "linked_recipe_slugs": [
      "prescricao-pac-ambulatorial",
      "prescricao-pac-hospitalar"
    ],
    "summary": "Estratificação por CURB-65/CRB-65 e critérios IDSA/ATS de PAC grave, escolha antimicrobiana empírica racional (hígidos vs. comorbidades vs. internados), indicação de corticoide na PAC grave e duração curta de 5 a 7 dias.",
    "suspicion": [
      {
        "title": "Quadro Clínico e Estratificação de Local de Tratamento (CURB-65)",
        "items": [
          "Tosse aguda com expectoração purulenta, febre (> 37,8°C) ou hipotermia, dor torácica ventilatório-dependente, dispneia, taquipneia e síndrome de consolidação pulmonar (estertores crepitantes, sopro tubário, macicez) + infiltrado novo à radiografia/ultrassom de tórax.",
          "Escore CURB-65 (1 ponto cada): Confusão mental aguda | Ureia > 50 mg/dL (BUN > 19) | Frequência Respiratória >= 30 irpm | PAS < 90 ou PAD <= 60 mmHg | Idade >= 65 anos.",
          "Decisão pelo CURB-65: 0 a 1 ponto = Tratamento Ambulatorial | 2 pontos = Considerar Internação em Enfermaria (ou observação curta) | >= 3 pontos = Internação Hospitalar (avaliar UTI se 4–5 pontos ou critérios maiores de gravidade: Choque Séptico com vasopressor ou Insuficiência Respiratória com Ventilação Mecânica Invasiva)."
        ]
      }
    ],
    "initial_actions": [
      {
        "title": "Medidas nas Primeiras 4 Horas",
        "items": [
          "1. Oximetria de pulso em todo paciente (suplementar O2 se SpO2 < 92%, ou meta 88–92% se DPOC retentor crônico de CO2).",
          "2. Radiografia de tórax PA e perfil (ou POCUS pulmonar à beira-leito buscando hepatização, broncograma aéreo dinâmico e derrame pleural).",
          "3. Nos pacientes internados: coletar hemograma, ureia, creatinina, sódio, potássio, PCR, gasometria/lactato (se sepse) e iniciar a 1ª dose do antibiótico no próprio Pronto-Socorro!"
        ]
      }
    ],
    "exams": [
      {
        "title": "Investigação Microbiológica (Quando Coletar Culturas?)",
        "items": [
          "PAC Ambulatorial: NÃO solicitar hemoculturas nem cultura de escarro de rotina.",
          "PAC Internada Grave (UTI), derrame pleural parapneumônico, cavitação ou risco de MRSA/Pseudomonas: coletar 2 pares de hemoculturas + cultura/Gram de escarro + antígenos urinários para Pneumococo e Legionella (se disponíveis) + painel viral (Influenza / SARS-CoV-2).",
          "TODO derrame pleural parapneumônico com >= 1 cm no decúbito lateral (ou >= 2–3 cm na USG/TC) DEVE ser submetido à Toracocentese Diagnóstica imediata (se pus franco, pH < 7,20, glicose < 40–60 mg/dL ou LDH > 1.000 UI/L = Empiema / Derrame Complicado -> Drenagem Torácica Fechada imediata!)."
        ]
      }
    ],
    "decision_flow": [
      {
        "if": "PAC Ambulatorial — Paciente Hígido (sem comorbidades e sem uso de ATB nos últimos 90 dias)",
        "then": "Amoxicilina 1 g VO de 8/8h (ou 500 mg 8/8h) por 5 a 7 dias OU Amoxicilina + Clavulanato 875/125 mg VO 12/12h por 5–7 dias OU Azitromicina 500 mg VO 1x/dia por 3 a 5 dias (ou Doxiciclina 100 mg VO 12/12h)."
      },
      {
        "if": "PAC Ambulatorial — Paciente COM Comorbidades (DPOC, IC, DM, DRC, Hepatopatia, Neoplasia, Etilismo ou ATB recente)",
        "then": "Terapia Combinada: Amoxicilina + Clavulanato 875/125 mg VO de 12/12h + Azitromicina 500 mg VO 1x/dia (ou Claritromicina 500 mg 12/12h) por 5 a 7 dias; OU Monoterapia com Quinolona Respiratória: Levofloxacino 750 mg VO 1x/dia por 5 dias (ou Moxifloxacino 400 mg VO 1x/dia)."
      },
      {
        "if": "PAC Internada em Enfermaria (CURB-65 >= 2, sem critérios de UTI)",
        "then": "Ceftriaxona 1 a 2 g IV a cada 24h (ou Ampicilina+Sulbactam 3 g IV 6/6h) + Azitromicina 500 mg VO/IV 1x/dia (ou Claritromicina 500 mg 12/12h) por 5 a 7 dias; OU Levofloxacino 750 mg IV/VO 1x/dia em monoterapia."
      },
      {
        "if": "PAC Grave em UTI (Choque Séptico, VM ou >= 3 critérios menores IDSA/ATS)",
        "then": "OBRIGATÓRIA Terapia Combinada: Ceftriaxona 2 g IV 24/24h + Azitromicina 500 mg IV 24/24h (ou Ceftriaxona + Levofloxacino 750 mg IV 24/24h — NUNCA usar quinolona isolada em PAC de UTI!). Associar Hidrocortisona 200 mg/dia IV em infusão contínua por 4–7 dias na PAC grave hipoxêmica/séptica (Estudo CAPE COD reduziu mortalidade!). Se risco de Pseudomonas (bronquiectasias/isolamento prévio): trocar Ceftriaxona por Piperacilina-Tazobactam 4,5 g IV 6/6h ou Cefepima 2 g IV 8/8h."
      }
    ],
    "treatment": [
      {
        "title": "Transição Sequencial para Via Oral (Switch Therapy) e Critérios de Alta",
        "regimen": "5 a 7 Dias Totais na PAC Não Complicada",
        "items": [
          "Critérios para transição IV -> VO e alta: afebril há >= 24–48h, FC < 100 bpm, FR < 24 irpm, PAS >= 90 mmHg, SpO2 >= 90–92% em ar ambiente e aceitação plena da via oral.",
          "Não repetir radiografia de tórax antes da alta se o paciente estiver evoluindo com melhora clínica (a consolidação radiológica demora 4 a 6 semanas para desaparecer!)."
        ]
      }
    ],
    "linked_drug_terms": [
      "Amoxicilina + Clavulanato",
      "Azitromicina",
      "Ceftriaxona",
      "Levofloxacino",
      "Piperacilina + Tazobactam",
      "Hidrocortisona"
    ],
    "red_flags": [
      "JAMAIS prescrever Ciprofloxacino para Pneumonia Adquirida na Comunidade (não tem ação contra Pneumococo!).",
      "Pacientes com febre persistente após 72h de antibiótico adequado: investigar Derrame Pleural Complicado / Empiema (fazer USG/TC de tórax!) ou Tuberculose Pulmonar."
    ],
    "source_refs": [
      {
        "label": "ATS/IDSA Clinical Practice Guideline: Diagnosis and Treatment of Adults with Community-acquired Pneumonia",
        "url": "https://www.thoracic.org/"
      },
      {
        "label": "Sociedade Brasileira de Pneumologia e Tisiologia (SBPT) - Diretrizes de PAC",
        "url": "https://sbpt.org.br/"
      }
    ],
    "follow_up": [
      {
        "title": "Critérios de Estabilidade e Tempo de Tratamento",
        "items": [
          "Reavaliação clínica obrigatória em 48 a 72 horas para confirmação de resposta terapêutica (queda da febre, melhora da taquipneia e sintomas respiratórios).",
          "Tempo total de antibioticoterapia: 5 a 7 dias em casos não complicados de PAC ambulatorial e hospitalar que atinjam critérios de estabilidade clínica por pelo menos 48 horas.",
          "Critérios de estabilidade clínica para alta: temperatura <= 37,8°C, FC <= 100 bpm, FR <= 24 irpm, PAS >= 90 mmHg e SpO2 >= 92% em ar ambiente com ingestão oral preservada.",
          "Radiografia de tórax de controle ambulatorial indicada após 6 a 8 semanas em tabagistas e pacientes > 50 anos para afastar neoplasia pulmonar subjacente."
        ]
      }
    ],
    "special_situations": [
      {
        "title": "Derrame Pleural Parapneumônico e PAC Grave",
        "items": [
          "Derrame pleural significativo associado à pneumonia: toracocentese diagnóstica imediata para diferenciar derrame simples de empiema/derrame complicado (pH < 7,20, glicose < 40 mg/dL, bactérias na bacterioscopia/cultura exigem drenagem torácica em selo d'água).",
          "Fatores de risco para Pseudomonas aeruginosa ou MRSA: uso recente de antimicrobianos IV nos últimos 90 dias, bronquiectasias ou internação hospitalar recente; cobrir com Piperacilina-Tazobactam ou Cefepima associado a Vancomicina.",
          "Falha terapêutica em 72h: investigar patógenos atípicos ou resistentes, complicações supurativas (abcesso pulmonar, empiema) e causas não infecciosas (tromboembolismo pulmonar, insuficiência cardíaca)."
        ]
      }
    ],
    "prophylaxis": [
      {
        "title": "Imunoprofilaxia e Prevenção de Complicações",
        "items": [
          "Vacinação pneumocócica: recomendada vacina pneumocócica conjugada (VPC13 ou VPC15) seguida de vacina polissacarídica (VPP23) para idosos >= 65 anos e portadores de comorbidades crônicas.",
          "Vacinação anual contra Influenza e COVID-19 para redução de complicações respiratórias graves.",
          "Cessação do tabagismo como medida preventiva fundamental para restaurar o clearance mucociliar."
        ]
      }
    ]
  },
  {
    "id": "seed-dpoc",
    "slug": "exacerbacao-aguda-de-dpoc-gold",
    "title": "Exacerbação Aguda de DPOC (GOLD 2024)",
    "category": "Pneumologia",
    "setting": "Pronto-Socorro / Enfermaria / UTI",
    "status": "verified",
    "linked_recipe_slugs": [
      "prescricao-dpoc-exacerbado"
    ],
    "summary": "Oxigenoterapia controlada (alvo SpO2 88–92%), broncodilatação dupla (SABA + SAMA), corticoterapia sistêmica curta (5 dias), indicação precisa de antibiótico (Critérios de Anthonisen / escarro purulento) e Ventilação Não Invasiva (VNI/BiPAP) precoce na acidose respiratória.",
    "suspicion": [
      {
        "title": "Tríade Cardinal de Anthonisen e Gravidade da Exacerbação",
        "items": [
          "Piora aguda (< 14 dias) caracterizada por: 1) Aumento da dispneia; 2) Aumento do volume do escarro; 3) Mudança da cor do escarro para PURULENTO.",
          "Sempre investigar diagnósticos diferenciais ou gatilhos na chegada: Pneumonia, Tromboembolismo Pulmonar (TEP), Pneumotórax Espontâneo Secundário, Insuficiência Cardíaca / EAP e Arritmias (FA)."
        ]
      }
    ],
    "initial_actions": [
      {
        "title": "Pilares Imediatos na Sala de Emergência",
        "items": [
          "1. OXIGENOTERAPIA TITULADA ESTRITA: Manter SpO2 entre 88% e 92% (usar cateter nasal a 1–3 L/min ou máscara de Venturi 24–28%). EVITAR HIPERÓXIA (SpO2 > 95% piora a relação V/Q, o efeito Haldane e induz narcose hipercápnica / parada respiratória!).",
          "2. BRONCODILATAÇÃO DUPLA DE CURTA AÇÃO: Salbutamol 4 a 8 jatos (ou 10–20 gotas) + Brometo de Ipratrópio 4 a 8 jatos (ou 40 gotas = 0,5 mg) a cada 20 min na 1ª hora, depois de 4/4h (se nebulizar, usar AR COMPRIMIDO e não O2 puro a alto fluxo!).",
          "3. CORTICOIDE SISTÊMICO POR 5 DIAS: Prednisona 40 mg VO 1x ao dia por 5 dias (estudo REDUCE mostrou que 5 dias equivalem a 14 dias!) ou Metilprednisolona 40 mg IV / Hidrocortisona 200 mg IV se intolerância oral."
        ]
      }
    ],
    "exams": [
      {
        "title": "Gasometria Arterial e Exames Complementares",
        "items": [
          "Gasometria arterial obrigatória nas exacerbações moderadas/graves: avaliar pH (< 7,35 define acidose respiratória aguda/agudizada!) e PaCO2 (> 45 mmHg).",
          "Radiografia de tórax (afastar pneumonia e pneumotórax), ECG, hemograma, eletrólitos e PCR."
        ]
      }
    ],
    "decision_flow": [
      {
        "if": "Presença de Escarro Purulento + (aumento da dispneia e/ou volume do escarro) OU necessidade de VNI / Ventilação Mecânica",
        "then": "Indicar ANTIBIÓTICO por 5 a 7 dias: Amoxicilina + Clavulanato 875/125 mg VO 12/12h (ou Ceftriaxona 1–2 g IV 24/24h se internado) ou Azitromicina 500 mg/dia. Se risco de Pseudomonas (FEV1 < 30%, bronquiectasias, >= 4 cursos de ATB/ano ou isolamento prévio): Ciprofloxacino 500–750 mg VO 12/12h ou Piperacilina-Tazobactam 4,5 g IV 6/6h."
      },
      {
        "if": "Acidose Respiratória Aguda (pH <= 7,35 e PaCO2 > 45 mmHg) ou dispneia grave com uso de musculatura acessória",
        "then": "INSTALAR VENTILAÇÃO NÃO INVASIVA (VNI — BiPAP!) IMEDIATAMENTE (padrão-ouro Nível A: reduz intubação e mortalidade em > 50%!). Ajustes iniciais do BiPAP: IPAP 12 a 16 cmH2O (titular até 20 cmH2O para volume corrente de 6–8 mL/kg) e EPAP 4 a 6 cmH2O, com FiO2 mínima para SpO2 88–92%. Reavaliar gasometria em 1 a 2 horas!"
      },
      {
        "if": "Falha da VNI após 1–2h (piora do pH/PaCO2), rebaixamento grave (torpor/coma), parada respiratória ou instabilidade hemodinâmica grave",
        "then": "Proceder à Intubação Orotraqueal e Ventilação Mecânica Invasiva (FR baixa 10–14 irpm, relação I:E 1:3 a 1:4 para evitar Auto-PEEP, meta de pH > 7,25–7,30 e não normalizar a PaCO2 abruptamente para evitar alcalose pós-hipercapnia!)."
      }
    ],
    "treatment": [
      {
        "title": "Otimização de Alta Hospitalar",
        "regimen": "Manutenção Inalatória LAMA + LABA (± ICS se eosinófilos >= 300/mm³)",
        "items": [
          "Reiniciar ou iniciar broncodilatador de longa duração (LAMA + LABA: ex. Tiotrópio + Olodaterol ou Umeclidínio + Vilanterol) ainda antes da alta hospitalar.",
          "Cessação do tabagismo, vacinação antipneumocócica/influenza e encaminhamento para reabilitação pulmonar."
        ]
      }
    ],
    "linked_drug_terms": [
      "Salbutamol",
      "Brometo de Ipratrópio",
      "Hidrocortisona",
      "Amoxicilina + Clavulanato",
      "Azitromicina",
      "Ceftriaxona"
    ],
    "red_flags": [
      "NUNCA colocar máscara não reinalante a 15 L/min sem critério em DPOC retentor crônico com SpO2 já > 92% (a hiperóxia induz retenção aguda de CO2 e coma hipercápnico!).",
      "Metilxantinas (Aminofilina/Teofilina IV) NÃO são recomendadas pelo GOLD devido à toxicidade arrítmica e ausência de benefício clínico."
    ],
    "source_refs": [
      {
        "label": "Global Initiative for Chronic Obstructive Lung Disease (GOLD) Report 2024",
        "url": "https://goldcopd.org/"
      }
    ],
    "follow_up": [
      {
        "title": "Manejo Pós-Crise e Reabilitação Pulmonar",
        "items": [
          "Completar 5 dias de corticoide oral (Prednisona 40 mg/dia) e 5 a 7 dias de antimicrobiano se indicado.",
          "Revisar técnica inalatória de broncodilatadores e corticoide inalatório antes da alta hospitalar.",
          "Avaliação para indicação de Oxigenoterapia Domiciliar Prolongada (ODP): indicada se PaO2 em ar ambiente <= 55 mmHg ou SpO2 <= 88%, ou PaO2 56–59 mmHg com cor pulmonale / policitemia.",
          "Encaminhamento para programa de cessação do tabagismo, imunização anual (influenza, pneumocócica, VSR) e programa de reabilitação pulmonar ambulatorial."
        ]
      }
    ],
    "special_situations": [
      {
        "title": "Ventilação Não Invasiva (VNI) e Oxigenoterapia Controlada",
        "items": [
          "Alvo rigoroso de oxigenoterapia: manter SpO2 entre 88% e 92% (oxigênio excessivo suprime o drive respiratório hipóxico e piora acentuadamente a hipercapnia e acidose respiratória por efeito Haldane e alteração V/Q).",
          "VNI (BiPAP): indicação de primeira linha na acidose respiratória aguda (pH < 7,35 e PaCO2 > 45 mmHg) ou dispneia grave com uso de musculatura acessória; reduz intubação e mortalidade em mais de 50%.",
          "Critérios para intubação orotraqueal: falha da VNI após 1 a 2 horas, instabilidade hemodinâmica, parada respiratória iminente ou rebaixamento do sensório com incapacidade de proteger vias aéreas."
        ]
      }
    ],
    "prophylaxis": [
      {
        "title": "Prevenção de Futuras Exacerbações (GOLD)",
        "items": [
          "Terapia inalatória otimizada: prescrição de LAMA + LABA (e corticoide inalatório se eosinófilos sanguíneos >= 300/mcL ou histórico frequente de exacerbação).",
          "Reabilitação pulmonar iniciada em até 4 semanas após a estabilização da crise.",
          "Imunização completa: vacina contra influenza, pneumococo, COVID-19 e vírus sincicial respiratório (VSR) em adultos vulneráveis.",
          "Abandono total do tabagismo com suporte comportamental e farmacológico."
        ]
      }
    ]
  },
  {
    "id": "seed-itu",
    "slug": "infeccao-do-trato-urinario-cistite-e-pielonefrite",
    "title": "Infecção do Trato Urinário (Cistite, Pielonefrite Aguda e ITU na Gestante)",
    "category": "Nefrologia e Urologia",
    "setting": "Ambulatório / Pronto-Socorro / Enfermaria",
    "status": "verified",
    "linked_recipe_slugs": [
      "prescricao-cistite-aguda",
      "prescricao-pielonefrite-aguda"
    ],
    "summary": "Diferenciação entre ITU baixa (cistite) e ITU alta (pielonefrite), antibioticoterapia de 1ª linha atualizada (Fosfomicina/Nitrofurantoína vs. Ciprofloxacino/Ceftriaxona), rastreio de obstrução ureteral (pionefrose) e manejo na gestante.",
    "suspicion": [
      {
        "title": "Classificação Anatômica e Clínica",
        "items": [
          "Cistite Aguda (ITU Baixa): Disúria, polaciúria, urgência miccional, dor suprapúbica e hematúria macroscópica, SEM febre e SEM dor lombar.",
          "Pielonefrite Aguda (ITU Alta / Sistêmica): Febre (>= 38°C), calafrios, dor lombar unilateral ou bilateral, Sinal de Giordano positivo, náuseas e vômitos (com ou sem sintomas baixos de disúria).",
          "ITU Complicada: Homens, gestantes, obstrução urinária (cálculo/HPB), cateter vesical de demora, bexiga neurogênica, imunossuprimidos, transplante renal ou DRC avançada."
        ]
      }
    ],
    "initial_actions": [
      {
        "title": "Quando Solicitar Exames e Imagem?",
        "items": [
          "1. Cistite Aguda Não Complicada em mulher jovem: o diagnóstico é CLÍNICO! Não é obrigatório solicitar EAS nem urocultura para iniciar o tratamento empírico.",
          "2. Pielonefrite Aguda, ITU em Gestantes, Homens, Falha Terapêutica ou Sepse Urinária: OBRIGATÓRIO coletar EAS (Urina tipo 1) + UROCULTURA com antibiograma ANTES da 1ª dose do antibiótico!",
          "3. Quando solicitar Ultrassonografia ou TC de Vias Urinárias de URGÊNCIA na Pielonefrite? Se houver história de cálculo renal / cólica nefrítica associada, choque séptico, piora aguda da função renal ou persistência da febre após 48–72h de antibiótico adequado (para descartar Pionefrose / Obstrução Ureteral Infectada!)."
        ]
      }
    ],
    "exams": [
      {
        "title": "Interpretação do EAS e Bacteriúria Assintomática",
        "items": [
          "No EAS: Esterase leucocitária positiva (> 10 leucócitos/campo) + Nitrito positivo (específico para enterobactérias redutoras de nitrato, como E. coli, Klebsiella e Proteus; Enterococcus e S. saprophyticus NÃO convertem nitrato em nitrito!).",
          "BACTERIÚRIA ASSINTOMÁTICA (Urocultura >= 10^5 UFC/mL sem nenhum sintoma urinário): Tratar EXCLUSIVAMENTE em 2 populações: 1) GESTANTES (reduz pielonefrite e parto prematuro); 2) Pacientes que serão submetidos a PROCEDIMENTO UROLÓGICO INVASIVO com sangramento de mucosa (ex.: RTU de próstata, ureteroscopia). NÃO tratar bacteriúria assintomática em idosos, diabéticos ou sondados crônicos!"
        ]
      }
    ],
    "decision_flow": [
      {
        "if": "Cistite Aguda Não Complicada (Mulher não gestante, sem febre/Giordano)",
        "then": "1ª Escolha: Fosfomicina Trometamol 3 g (1 envelope dissolvido em água) VO em DOSE ÚNICA (ao deitar, após esvaziar a bexiga) OU Nitrofurantoína 100 mg VO de 6/6h por 5 dias (se ClCr >= 30 mL/min). Alternativa: Cefuroxima 250 mg 12/12h por 5 dias. (POUPAR Quinolonas na cistite simples!)."
      },
      {
        "if": "Cistite ou Bacteriúria Assintomática na GESTANTE",
        "then": "Fosfomicina 3 g VO em dose única OU Nitrofurantoína 100 mg VO de 6/6h por 7 dias (evitar a termo >= 38 semanas e G6PD) OU Cefalexina 500 mg VO de 6/6h por 7 dias OU Amoxicilina-Clavulanato 875/125 mg VO 12/12h por 7 dias. Solicitar urocultura de controle de cura 7 dias após o término!"
      },
      {
        "if": "Pielonefrite Aguda Não Complicada (Estável, aceitando via oral, sem obstrução)",
        "then": "Fazer 1ª dose de Ceftriaxona 1 g IV/IM no Pronto-Socorro + alta com Ciprofloxacino 500 mg VO de 12/12h por 7 dias OU Levofloxacino 750 mg VO 1x/dia por 5 dias (ou Ceftriaxona 1 g IV/IM/dia se resistência local a quinolonas > 10%)."
      },
      {
        "if": "Pielonefrite Complicada, Gestante com Pielonefrite, Vômitos Incoercíveis ou Sepse Urinária",
        "then": "Internação Hospitalar: Ceftriaxona 1 a 2 g IV a cada 24h (ou Piperacilina-Tazobactam 4,5 g IV 6/6h / Meropenem 1 g IV 8/8h se choque séptico ou risco de ESBL/Pseudomonas) por 7 a 14 dias."
      }
    ],
    "treatment": [
      {
        "title": "Manejo da Pionefrose (ITU Obstrutiva por Cálculo)",
        "regimen": "Desobstrução Urológica de Emergência + Antibiótico Venoso",
        "items": [
          "Cálculo ureteral obstrutivo associado a febre, leucocitose ou piúria configura EMERGÊNCIA UROLÓGICA (Pionefrose): o antibiótico não penetra na pelve renal obstruída! Acionar Urologia imediatamente para implante de Cateter Duplo J ou Nefrostomia Percutânea."
        ]
      }
    ],
    "linked_drug_terms": [
      "Nitrofurantoína",
      "Ciprofloxacino",
      "Levofloxacino",
      "Ceftriaxona",
      "Piperacilina + Tazobactam",
      "Meropenem"
    ],
    "red_flags": [
      "JAMAIS prescrever Nitrofurantoína ou Fosfomicina para Pielonefrite Aguda ou Sepse Urinária (não atingem concentração no parênquima renal nem na corrente sanguínea!).",
      "TODA gestante com Pielonefrite Aguda deve ser INTERNADA para antibioticoterapia endovenosa inicial (alto risco de choque séptico, SARA materna e trabalho de parto prematuro)."
    ],
    "source_refs": [
      {
        "label": "European Association of Urology (EAU) Guidelines on Urological Infections 2024",
        "url": "https://uroweb.org/"
      },
      {
        "label": "IDSA Clinical Practice Guideline for Acute Uncomplicated Cystitis and Pyelonephritis",
        "url": "https://www.idsociety.org/"
      }
    ],
    "follow_up": [
      {
        "title": "Acompanhamento e Resolução por Foco",
        "items": [
          "Cistite aguda não complicada em mulher jovem: não requer urocultura de controle se houver resolução completa dos sintomas após 5 dias de nitrofurantoína ou dose única de fosfomicina.",
          "Pielonefrite aguda ambulatorial: reavaliação clínica obrigatória em 48 a 72 horas para confirmação de apirexia e melhora da dor lombar; checar antibiograma da urocultura coletada.",
          "Falha clínica de pielonefrite após 72h de antimicrobiano adequado: solicitar Tomografia ou Ultrassonografia de vias urinárias para afastar abcesso renal/perirrenal ou litíase obstrutiva.",
          "Tempo de tratamento da pielonefrite: 7 dias com fluoroquinolona ou 10 a 14 dias com betalactâmico."
        ]
      }
    ],
    "special_situations": [
      {
        "title": "Gestante com ITU e Bacteriúria Assintomática",
        "items": [
          "Gestantes: bacteriúria assintomática DEVE ser tratada obrigatoriamente para prevenir pielonefrite materna grave e prematuridade fetal; drogas seguras: Fosfomicina, Cefalexina ou Amoxicilina-Clavulanato (evitar quinolonas e sulfas no 3º trimestre).",
          "Pielonefrite na gestante: SEMPRE requer internação hospitalar e antibioticoterapia endovenosa (Ceftriaxona) pelo alto risco de choque séptico e trabalho de parto prematuro.",
          "ITU no homem: sempre considerada potencialmente complicada; investigar prostatite aguda e obstrução infravesical (hiperplasia prostática); tratar por 14 dias."
        ]
      }
    ],
    "prophylaxis": [
      {
        "title": "Profilaxia de ITU Recorrente e Cuidados Comportamentais",
        "items": [
          "Medidas comportamentais: hidratação oral abundante (> 2 L/dia), micção pós-coito, evitar retenção urinária prolongada e higienização adequada da frente para trás.",
          "Profilaxia não farmacológica em mulheres na pós-menopausa: estrogênio tópico vaginal para restaurar a microbiota e o pH vaginal.",
          "Quimioprofilaxia em ITU de repetição (>= 3 episódios/ano): Nitrofurantoína 100 mg ou Fosfomicina 3 g a cada 10 dias sob acompanhamento médico."
        ]
      }
    ]
  },
  {
    "id": "seed-pele",
    "slug": "infeccoes-de-pele-e-partes-moles-erisipela-celulite-fasciite",
    "title": "Infecções de Pele e Partes Moles (Erisipela, Celulite, Abscesso e Fasciíte Necrosante)",
    "category": "Infectologia",
    "setting": "Ambulatório / Pronto-Socorro / Centro Cirúrgico",
    "status": "verified",
    "summary": "Diferenciação entre infecções não-purulentas (Erisipela/Celulite estreptocócica) e purulentas (Abscesso/Furúnculo estafilocócico), indicação de drenagem e reconhecimento imediato da Fasciíte Necrosante (Gangrena de Fournier).",
    "suspicion": [
      {
        "title": "Diferenciação Clínica (Não-Purulenta vs. Purulenta vs. Necrosante)",
        "items": [
          "Erisipela (Derme superficial + linfáticos): Placa eritematosa vivo-brilhante, quente, dolorosa, com BORDAS BEM DELIMITADAS e elevadas, frequentemente com febre alta, calafrios e porta de entrada (tinea pedis interdigital). Agente principal: Streptococcus pyogenes (Grupo A).",
          "Celulite (Derme profunda + subcutâneo): Eritema, edema e calor com BORDAS MAL DELIMITADAS/DIFUSAS. Agentes: Streptococcus beta-hemolíticos e Staphylococcus aureus (MSSA).",
          "Abscesso Cutâneo / Furúnculo / Carbúnculo (Purulenta): Nódulo eritematoso doloroso com FLUTUAÇÃO central ou drenagem de pus. Agente principal: Staphylococcus aureus (MSSA e CA-MRSA).",
          "Fasciíte Necrosante / Gangrena de Fournier (Emergência Cirúrgica!): Dor DESPROPORCIONAL aos achados cutâneos iniciais, evolução fulminante em horas, edema tenso além da área de eritema, bolhas violáceas/hemorrágicas, anestesia cutânea, crepitação subcutânea e sepse/choque séptico."
        ]
      }
    ],
    "initial_actions": [
      {
        "title": "Condutas Gerais Essenciais",
        "items": [
          "1. Demarcar as bordas do eritema com caneta cirúrgica na admissão (e datar/horar) para monitorar progressão ou regressão objetiva!",
          "2. Elevar o membro afetado (reduz edema gravitacional e acelera a resolução clínica) e tratar a porta de entrada (ex.: antifúngico tópico para Tinea pedis / intertrigo interdigital).",
          "3. Em todo Abscesso com flutuação: realizar INCISÃO E DRENAGEM cirúrgica (o antibiótico isolado falha sem drenagem do pus!)."
        ]
      }
    ],
    "exams": [
      {
        "title": "Exames e Escore LRINEC",
        "items": [
          "Erisipela/Celulite leve: não requer exames laboratoriais nem hemoculturas de rotina.",
          "Suspeita de Fasciíte Necrosante: Hemograma, PCR, Sódio (< 135 mEq/L é muito sugestivo!), Creatinina, Glicose, CPK, Lactato, 2 pares de hemoculturas e TC (gás nos planos fasciais). ATENÇÃO: A TC nunca deve atrasar a exploração cirúrgica quando a suspeita clínica de fasciíte necrosante for alta!"
        ]
      }
    ],
    "decision_flow": [
      {
        "if": "Erisipela ou Celulite Não-Purulenta Leve/Moderada (Ambulatorial)",
        "then": "Cefalexina 500 mg a 1 g VO de 6/6h por 5 a 7 dias OU Amoxicilina + Clavulanato 875/125 mg VO 12/12h por 5–7 dias OU Clindamicina 300 a 600 mg VO de 8/8h (se alergia a beta-lactâmicos)."
      },
      {
        "if": "Erisipela ou Celulite Moderada/Grave com SIRS (Internação Hospitalar)",
        "then": "Cefazolina 1 a 2 g IV de 8/8h OU Oxacilina 2 g IV de 4/4h a 6/6h (se suspeita estafilocócica) OU Ceftriaxona 1 a 2 g IV 24/24h (ou Penicilina G Cristalina 2 a 4 milhões UI IV 4/4h na erisipela clássica)."
      },
      {
        "if": "Abscesso Cutâneo / Celulite Purulenta com Risco de CA-MRSA (Recorrente, falha de beta-lactâmico, SIRS)",
        "then": "Incisão e Drenagem + Sulfametoxazol-Trimetoprima (Bactrim F 800/160 mg) 1 a 2 comp. VO de 12/12h OU Doxiciclina 100 mg VO 12/12h OU Clindamicina 600 mg VO/IV 8/8h (se internado grave: Vancomicina 15–20 mg/kg IV 12/12h)."
      },
      {
        "if": "Suspeita de Fasciíte Necrosante ou Gangrena de Fournier",
        "then": "DESBRIDAMENTO CIRÚRGICO RADICAL DE EMERGÊNCIA no Centro Cirúrgico + Esquema Antimicrobiano Triplo Imediato: Vancomicina (ataque 25–30 mg/kg IV) + Piperacilina-Tazobactam 4,5 g IV 6/6h (ou Meropenem 1 g IV 8/8h) + CLINDAMICINA 900 mg IV de 8/8h (obrigatória pelo efeito antitoxina!)."
      }
    ],
    "treatment": [
      {
        "title": "Mordedura de Cão, Gato ou Humana",
        "regimen": "Amoxicilina + Clavulanato + Profilaxia Antitetânica e Antirrábica",
        "items": [
          "Droga de 1ª escolha (cobre Pasteurella multocida, Capnocytophaga, Eikenella corrodens, S. aureus e anaeróbios): Amoxicilina + Clavulanato 875/125 mg VO de 12/12h por 5 a 7 dias (evitar Cefalexina isolada, pois não cobre Pasteurella!).",
          "Lavar abundantemente com água e sabão + SF 0,9%, evitar sutura primária fechada em feridas puntiformes/mordeduras de gato ou mãos, atualizar vacina antitetânica e avaliar profilaxia antirrábica."
        ]
      }
    ],
    "linked_drug_terms": [
      "Amoxicilina + Clavulanato",
      "Oxacilina",
      "Clindamicina",
      "Vancomicina",
      "Piperacilina + Tazobactam",
      "Meropenem"
    ],
    "red_flags": [
      "Dor intensa desproporcional à aparência da pele + febre/taquicardia + crepitação ou bolhas hemorrágicas = Fasciíte Necrosante até que se prove o contrário (emergência cirúrgica!).",
      "Importante: Nas primeiras 24–48h após o início do antibiótico na celulite/erisipela, o eritema pode parecer aumentar discretamente pela lise bacteriana e liberação de toxinas — não trocar o antibiótico precocemente se a febre e o estado geral estiverem melhorando."
    ],
    "source_refs": [
      {
        "label": "IDSA Practice Guidelines for the Diagnosis and Management of Skin and Soft Tissue Infections",
        "url": "https://www.idsociety.org/"
      }
    ],
    "follow_up": [
      {
        "title": "Critérios de Resposta e Duração do Tratamento",
        "items": [
          "Delimitar a área de eritema com caneta cirúrgica na admissão para acompanhar a progressão ou regressão do quadro infeccioso nas primeiras 24 a 48 horas.",
          "Tempo total de antibioticoterapia para celulite/erisipela típica: 5 a 7 dias se resposta clínica favorável e afebril por 48 horas.",
          "Manejo de fatores predisponentes: tratamento obrigatório de tinea pedis / intertrigo interdigital, controle rigoroso do diabetes mellitus e controle de edema de membros inferiores com meias compressivas e repouso elevado após fase aguda.",
          "Agendamento ambulatorial de dermatologia se infecções de repetição."
        ]
      }
    ],
    "special_situations": [
      {
        "title": "Fasciíte Necrosante e Abscessos Cutâneos",
        "items": [
          "Fasciíte Necrosante: suspeitar se dor desproporcional ao exame físico, anestesia cutânea focal, crepitação à palpação, bolhas hemorrágicas ou toxicidade sistêmica grave com choque; CONDUTA: Desbridamento cirúrgico de emergência imediato (a cirurgia não pode esperar exames de imagem!).",
          "Abscessos cutâneos: o tratamento primário é a DRENAGEM CIRÚRGICA COMPLETA com incisão ampla e quebra de lojas; antimicrobianos só são necessários se celulite circundante extensa (> 2 cm), sinais sistêmicos ou comorbidades descompensadas.",
          "Mordedura humana ou animal: antibioticoterapia empírica mandatória com Amoxicilina + Clavulanato por 7 a 10 dias para cobertura de Pasteurella multocida e anaeróbios orais."
        ]
      }
    ],
    "linked_recipe_slugs": [
      "prescricao-pele"
    ],
    "prophylaxis": [
      {
        "title": "Profilaxia de Recorrências e Cuidados com a Porta de Entrada",
        "items": [
          "Tratamento obrigatório da porta de entrada: tratar tinea pedis interdigital (frieira), onicomicose, úlceras de estase venosa e dermatites.",
          "Controle de fatores predisponentes: elevação do membro afetado, uso de meia elástica de compressão após resolução da fase aguda e hidratação da pele.",
          "Profilaxia com Penicilina Benzatina 1.200.000 UI IM a cada 2 a 4 semanas indicada se >= 3 a 4 episódios/ano de erisipela recorrente."
        ]
      }
    ]
  },
  {
    "id": "seed-scassst",
    "slug": "sindrome-coronariana-aguda-sem-supra-de-st-scassst",
    "title": "Síndrome Coronariana Aguda Sem Supra de ST (IAMSSST e Angina Instável)",
    "category": "Cardiologia",
    "setting": "Sala de Emergência / Unidade Coronariana / Hemodinâmica",
    "status": "verified",
    "summary": "Algoritmo 0h/1h de Troponina de Alta Sensibilidade, estratificação pelos escores HEART e GRACE, terapia antitrombótica (AAS + Inibidor P2Y12 + Enoxaparina/Fondaparinux) e definição do tempo para cinecoronariografia (Imediata < 2h vs. Precoce < 24h).",
    "suspicion": [
      {
        "title": "Diagnóstico e Algoritmo de Troponina de Alta Sensibilidade (hs-cTn)",
        "items": [
          "Dor torácica anginosa em repouso (> 20 min), angina de início recente (CCS II/III) ou angina em crescendo, com ECG em até 10 min SEM supradesnivelamento persistente do segmento ST.",
          "Achados de ECG de alto risco na SCASSST: Infradesnivelamento de ST >= 0,5 a 1 mm em >= 2 derivações contíguas, inversão simétrica e profunda de onda T (ex.: Síndrome de Wellens em V2–V4 = suboclusão crítica de DA proximal!) ou elevação transitória de ST.",
          "IAMSSST vs. Angina Instável: Curva de Troponina com elevação/queda acima do percentil 99 = IAM sem Supra de ST (IAMSSST); Troponina seriada normal (0h e 1h/3h) com quadro clínico isquêmico típico = Angina Instável."
        ]
      }
    ],
    "initial_actions": [
      {
        "title": "Medidas Imediatas e Tratamento Antitrombótico Inicial",
        "items": [
          "1. Monitorização contínua (ECG, PA, SpO2), acesso venoso, ECG em 10 min (incluir V3R, V4R e V7–V9 na suspeita de oclusão de Circunflexa, que pode ser eletricamente silenciosa nas 12 derivações!).",
          "2. AAS: Dose de ataque de 160 a 300 mg VO mastigados imediatamente (manutenção 100 mg/dia).",
          "3. Anticoagulação Parenteral Imediata: Fondaparinux 2,5 mg SC 1x/dia (1ª escolha na estratégia conservadora/precoce pelo menor risco de sangramento — estudo OASIS-5; se for ao cateterismo, fazer bolus de HNF na sala!) OU Enoxaparina 1 mg/kg SC de 12/12h (0,75 mg/kg 12/12h se >= 75 anos; 1 mg/kg 24/24h se ClCr < 30 mL/min).",
          "4. Estatina de Alta Potência: Atorvastatina 80 mg VO 1x/dia (ou Rosuvastatina 40 mg/dia) + Nitroglicerina SL/IV para controle da dor isquêmica + Metoprolol VO nas primeiras 24h se estável e sem congestão."
        ]
      }
    ],
    "exams": [
      {
        "title": "Quando Fazer o Ataque do 2º Antiagregante (Inibidor P2Y12: Ticagrelor / Prasugrel / Clopidogrel)?",
        "items": [
          "DIRETRIZ ATUAL (ESC / SBC): Se o paciente com SCASSST for submetido a Estratégia Invasiva Precoce (< 24h), NÃO se recomenda o pré-tratamento rotineiro com inibidor P2Y12 na sala de emergência antes de conhecer a anatomia coronariana (para não atrasar cirurgia de revascularização caso seja lesão de tronco/triarterial e reduzir sangramento).",
          "Se a cinecoronariografia for demorar > 24–48h ou o manejo for inicialmente conservador sem alto risco hemorrágico: administrar ataque de Ticagrelor 180 mg VO (seguido de 90 mg 12/12h) ou Clopidogrel 300 a 600 mg VO (seguido de 75 mg/dia)."
        ]
      }
    ],
    "decision_flow": [
      {
        "if": "Critérios de MUITO ALTO RISCO (Instabilidade hemodinâmica/choque, dor torácica refratária ao tratamento clínico, arritmias ventriculares malignas/PCR, complicação mecânica ou IC aguda/EAP)",
        "then": "Estratégia Invasiva IMEDIATA (< 2 horas — emergencial, como no IAMCSST!): encaminhar direto à Hemodinâmica!"
      },
      {
        "if": "Critérios de ALTO RISCO (Diagnóstico confirmado de IAMSSST com curva de troponina, alterações dinâmicas de ST/T, supradesnível transitório de ST ou Escore GRACE > 140)",
        "then": "Estratégia Invasiva PRECOCE (< 24 horas): internação em Unidade Coronariana e cinecoronariografia nas primeiras 24 horas."
      },
      {
        "if": "Dor torácica com ECG normal e Troponina 0h/1h negativa (Escore HEART 0 a 3 pontos — Baixo Risco)",
        "then": "Alta segura do Pronto-Socorro com acompanhamento ambulatorial precoce (< 0,9% de eventos cardiovasculares em 30 dias)."
      }
    ],
    "treatment": [
      {
        "title": "Prevenção Secundária de Alta Hospitalar Pós-SCA",
        "regimen": "Os 5 Pilares Modificadores de Mortalidade Pós-IAM",
        "items": [
          "1) Dupla Antiagregação Plaquetária (DAPT) por 12 meses: AAS 100 mg/dia + Ticagrelor 90 mg 12/12h (ou Prasugrel 10 mg/dia ou Clopidogrel 75 mg/dia) + Pantoprazol 40 mg/dia.",
          "2) Estatina de Alta Potência: Atorvastatina 80 mg/dia ou Rosuvastatina 40 mg/dia (meta de LDL-c < 50 mg/dL!).",
          "3) Betabloqueador (Succinato de Metoprolol, Carvedilol ou Bisoprolol) — especialmente se FEVE <= 40%.",
          "4) IECA ou BRA (ou Sacubitril/Valsartana) — se FEVE <= 40%, HAS, DM ou DRC.",
          "5) Antagonista Mineralocorticoide (Espironolactona 25 mg/dia) + Inibidor de SGLT2 (Dapagliflozina/Empagliflozina 10 mg/dia) se FEVE <= 40% e/ou IC/DM."
        ]
      }
    ],
    "linked_drug_terms": [
      "Ácido Acetilsalicílico",
      "Clopidogrel",
      "Enoxaparina",
      "Nitroglicerina",
      "Metoprolol",
      "Morfina"
    ],
    "red_flags": [
      "JAMAIS administrar Trombolítico (Alteplase/Tenecteplase) na SCASSST (IAM sem supra ou Angina Instável)! Na SCASSST o trombo é rico em plaquetas (trombo branco) e a fibrinólise aumenta mortalidade e reinfarto!",
      "Síndrome de Wellens (ondas T bifásicas Plus-Minus ou profundamente invertidas e simétricas em V2–V3 em paciente já sem dor): indica suboclusão crítica da Artéria Descendente Anterior proximal — NÃO submeter a teste ergométrico (risco de IAM extenso e FV na esteira!); indicar cateterismo!"
    ],
    "source_refs": [
      {
        "label": "Diretriz da Sociedade Brasileira de Cardiologia sobre Angina Instável e IAM sem Supra de ST",
        "url": "https://www.portal.cardiol.br/"
      },
      {
        "label": "ESC Guidelines for the Management of Acute Coronary Syndromes 2023",
        "url": "https://www.escardio.org/"
      }
    ],
    "follow_up": [
      {
        "title": "Estratificação Invasiva e Prevenção Secundária",
        "items": [
          "Estratificação de risco por escores GRACE e TIMI para definição do tempo da angiografia coronária (CATE): imediata (< 2h) se instabilidade; precoce (< 24h) se GRACE > 140 ou troponina elevada; eletiva em até 72h se baixo risco.",
          "Dupla antiagregação plaquetária (AAS + Ticagrelor ou Clopidogrel) por 12 meses pós-evento coronariano.",
          "Terapia de alta potência para LDL-c: Atorvastatina 80 mg ou Rosuvastatina 40 mg com meta de LDL < 50 mg/dL e redução >= 50%.",
          "Ecocardiograma transtorácico antes da alta para avaliação de função ventricular esquerda e contratilidade segmentar."
        ]
      }
    ],
    "special_situations": [
      {
        "title": "Critérios de Muito Alto Risco para CATE Imediato",
        "items": [
          "Indicação de Cateterismo Imediato (< 2 horas): Choque cardiogênico ou instabilidade hemodinâmica, dor torácica refratária a nitrato e terapia medicamentosa, arritmias ventriculares graves sustentadas (TV/FV) ou complicações mecânicas.",
          "Idosos com insuficiência renal (ClCr < 30 mL/min): ajustar dose de Enoxaparina para 1 mg/kg em dose única diária (24/24h) ou preferir Heparina Não Fracionada guiada por TTPa.",
          "Sangramento ativo importante em vigência de dupla antiagregação: balancear risco isquêmico coronariano versus risco hemorrágico e considerar monoterapia antiplaquetária."
        ]
      }
    ],
    "linked_recipe_slugs": [
      "prescricao-scassst"
    ],
    "prophylaxis": [
      {
        "title": "Prevenção Secundária Isquêmica e Estratificação de Risco",
        "items": [
          "DAPT: AAS 100 mg/dia + Inibidor de P2Y12 (Ticagrelor 90 mg 12/12h preferencial ou Clopidogrel 75 mg/dia) por 12 meses.",
          "Estatina de alta intensidade: Atorvastatina 80 mg/dia iniciada precocemente.",
          "Prevenção terciária: encaminhamento para reabilitação cardíaca supervisionada, cessação do tabagismo e controle rigoroso de PA (< 130/80 mmHg) e HbA1c (< 7%)."
        ]
      }
    ]
  },
  {
    "id": "seed-colica-nefritica",
    "slug": "colica-nefritica-aguda-e-ureterolitiase",
    "title": "Cólica Nefrítica Aguda e Ureterolitíase (Manejo da Dor, Terapia Expulsiva e Urologia)",
    "category": "Nefrologia e Urologia",
    "setting": "Pronto-Socorro / Ambulatório",
    "status": "verified",
    "linked_recipe_slugs": [
      "prescricao-colica-nefritica-alta"
    ],
    "summary": "Analgesia multimodal rápida (AINE + Dipirona ± Opioide de resgate), exame de escolha (TC helicoidal sem contraste), Terapia Médica Expulsiva com Tansulosina para cálculos de 5 a 10 mm e critérios absolutos de desobstrução urológica de urgência.",
    "suspicion": [
      {
        "title": "Apresentação Clínica e Diagnósticos Diferenciais Graves",
        "items": [
          "Dor lombar unilateral hiperaguda, em cólica lancinante, que irradia para flanco, fossa ilíaca e região inguinal/testículo ou grandes lábios, acompanhada de inquietação psicomotora (o paciente não encontra posição de alívio!), náuseas, vômitos e hematúria.",
          "ATENÇÃO EM IDOSOS (> 60 anos) E HIPERTENSOS: Toda 'primeira cólica nefrítica' em paciente > 60 anos ou com instabilidade hemodinâmica/assimetria de pulsos DEVE ter Aneurisma de Aorta Abdominal Roto e Dissecção Aórtica descartados imediatamente por TC/POCUS!"
        ]
      }
    ],
    "initial_actions": [
      {
        "title": "Analgesia Imediata (Antes Mesmo do Exame de Imagem!)",
        "items": [
          "1. AINE Endovenoso (1ª escolha absoluta — reduz a síntese de prostaglandinas, diminui o edema ureteral e a pressão intrapiélica!): Cetoprofeno 100 mg IV diluído em 100 mL de SF 0,9% correr em 20 min (ou Tenoxicam 20–40 mg IV ou Diclofenaco 75 mg IM) — desde que função renal normal e não gestante!",
          "2. Associar Dipirona 1 g a 2 g IV lento + Antiemético: Ondansetrona 4 a 8 mg IV.",
          "3. Resgate se dor intensa refratária: Morfina 2 a 4 mg IV titulado (ou Tramadol 100 mg IV lento diluído em 100 mL SF).",
          "4. Evitar hiper-hidratação venosa forçada ('soro aberto') durante a crise de dor aguda (aumenta a diurese contra o ureter obstruído e piora a dor!)."
        ]
      }
    ],
    "exams": [
      {
        "title": "Exames Laboratoriais e Exame de Imagem Padrão-Ouro",
        "items": [
          "Laboratório obrigatório: EAS (Urina tipo 1 — avaliar leucocitúria, nitrito e bacteriúria para afastar infecção associada!), Creatinina, Ureia, Hemograma, PCR e Beta-hCG em mulheres em idade fértil.",
          "PADRÃO-OURO DE IMAGEM: Tomografia Computadorizada Helicoidal de Abdome e Pelve SEM CONTRASTE (sensibilidade > 98%, define tamanho exato em milímetros, localização topográfica e densidade em Unidades Hounsfield). Em gestantes e crianças: Ultrassonografia de Rins e Vias Urinárias é a 1ª escolha."
        ]
      }
    ],
    "decision_flow": [
      {
        "if": "Cálculo Obstrutivo associado a FEBRE, Piúria/ITU (Pionefrose), Anúria, Rim Único ou Lesão Renal Aguda grave",
        "then": "EMERGÊNCIA UROLÓGICA ABSOLUTA! Coletar urocultura + hemoculturas, iniciar Ceftriaxona 2 g IV (ou Piperacilina-Tazobactam 4,5 g IV se sepse) e acionar Urologia IMEDIATAMENTE para desobstrução (Cateter Duplo J ou Nefrostomia Percutânea)."
      },
      {
        "if": "Cálculo <= 10 mm sem sinais de infecção, função renal preservada e dor controlada após medicação",
        "then": "Alta hospitalar com analgesia oral + Terapia Médica Expulsiva (TME): Tansulosina 0,4 mg VO 1x ao dia à noite por até 4 semanas (especialmente eficaz para cálculos ureterais distais de 5 a 10 mm!). Cálculos <= 4–5 mm têm > 80% de eliminação espontânea."
      },
      {
        "if": "Cálculo > 10 mm OU dor intratável/vômitos incoercíveis no PS",
        "then": "Internação e avaliação urológica para intervenção definitiva (Ureterorrenolitotripsia flexível/semirrígida a laser ou LECO) — cálculos > 10 mm raramente são expelidos espontaneamente."
      }
    ],
    "treatment": [
      {
        "title": "Prescrição de Alta e Orientações ao Paciente",
        "regimen": "Analgesia + Alfa-bloqueador (Tansulosina) + Sinais de Alarme",
        "items": [
          "Tansulosina 0,4 mg VO 1x ao dia após o jantar por 14 a 28 dias.",
          "Dipirona 1 g VO de 6/6h se dor + Cetoprofeno 100 mg VO de 12/12h por 3 a 5 dias (após as refeições) + Ondansetrona 4–8 mg VO se náuseas.",
          "Orientar filtrar a urina para identificar a eliminação do cálculo e retornar IMEDIATAMENTE ao PS se surgir FEBRE, calafrios, redução da urina ou dor refratária."
        ]
      }
    ],
    "linked_drug_terms": [
      "Dipirona",
      "Morfina",
      "Ondansetrona",
      "Ceftriaxona"
    ],
    "red_flags": [
      "Cálculo Ureteral + Febre/Calafrios = Pionefrose / Sepse Urinária Obstrutiva! Nunca dar alta; exige drenagem urológica urgente (Duplo J).",
      "Evitar Escopolamina (Buscopan) isolada como única analgesia na cólica nefrítica: estudos mostram que antiespasmódicos anticolinérgicos não têm eficácia superior ao placebo quando comparados aos AINEs."
    ],
    "source_refs": [
      {
        "label": "European Association of Urology (EAU) Guidelines on Urolithiasis 2024",
        "url": "https://uroweb.org/"
      }
    ],
    "follow_up": [
      {
        "title": "Terapia Expulsiva e Encaminhamento Urológico",
        "items": [
          "Terapia Médica Expulsiva (TME): Tansulosina 0,4 mg VO à noite por até 4 semanas em cálculos ureterais distais de 5 a 10 mm em pacientes oligossintomáticos e sem infecção.",
          "Orientações de alta: hidratação hídrica adequada e retorno imediato ao PS em caso de febre, dor refratária, vômitos incoercíveis ou anúria.",
          "Orientação de filtrar a urina com coador para recuperação do cálculo e envio para análise físico-química da composição cristalina.",
          "Consulta ambulatorial de Urologia em 7 a 14 dias com exame de controle para confirmar eliminação do cálculo."
        ]
      }
    ],
    "special_situations": [
      {
        "title": "Cálculo Obstrutivo Infectado (Emergência Urológica)",
        "items": [
          "Cólica nefrítica associada a FEBRE, calafrios ou sinais de sepse urinária: EMERGÊNCIA UROLÓGICA ABSOLUTA — indicação mandatória de desobstrução cirúrgica imediata da via urinária (duplo J ou nefrostomia percutânea) + antibioticoterapia venosa ampla (Ceftriaxona ou Meropenem).",
          "Rim único funcionante ou obstrução bilateral com insuficiência renal aguda: indicação de desobstrução de urgência.",
          "Cálculos maiores que 10 mm: baixa chance de eliminação espontânea; programar litotripsia extracorpórea por ondas de choque (LEOC) ou ureterorrenolitotripsia."
        ]
      }
    ],
    "prophylaxis": [
      {
        "title": "Prevenção Secundária de Litíase Urinária",
        "items": [
          "Aumento da ingesta hídrica: volume urinário diário meta >= 2 a 2,5 litros por dia.",
          "Modificações dietéticas: redução da ingestão de sódio (< 2 g/dia) e proteínas de origem animal; NÃO restringir cálcio da dieta (pois a restrição aumenta a absorção de oxalato).",
          "Terapia expulsiva médica em cálculos ureterais distais de 5 a 10 mm: Tansulosina 0,4 mg VO 1x/dia por até 2 a 4 semanas se ausência de infecção ou refratariedade da dor."
        ]
      }
    ]
  },
  {
    "id": "seed-intoxicacoes",
    "slug": "intoxicacoes-exogenas-agudas-sindromes-toxicologicas-e-antidotos",
    "title": "Intoxicações Exógenas Agudas (Toxíndromes, Descontaminação e Antídotos)",
    "category": "Emergências e Trauma",
    "setting": "Sala Vermelha / Pronto-Socorro / UTI",
    "status": "verified",
    "summary": "Reconhecimento rápido das 5 grandes Síndromes Toxicológicas (Anticolinérgica, Colinérgica, Simpaticomimética, Opioide e Sedativo-Hipnótica), indicação de Carvão Ativado (até 1–2h) e tabela de Antídotos de Emergência.",
    "suspicion": [
      {
        "title": "As 5 Grandes Toxíndromes no Exame Físico (Pupilas, Pele, Sinais Vitais e Peristaltismo)",
        "items": [
          "1. SÍNDROME COLINÉRGICA (Organofosforados, Carbamatos / 'Chumbinho'): MIOSE puntiforme, sialorreia intensa, broncorreia ('pulmão cheio' / estertores difusos), sudorese, vômitos, diarreia, fasciculações musculares e bradicardia (Mnemônico DUMBELS / SLUDGE).",
          "2. SÍNDROME ANTICOLINÉRGICA (Anti-histamínicos, Tricíclicos, Atropina, Escopolamina, Biperideno): MIDRÍASE, pele seca e quente/ruborizada, mucosas secas, hipertermia, taquicardia, retenção urinária (bexigoma), íleo paralítico e delirium/agitação ('Seco como osso, cego como morcego, vermelho como beterraba, quente como lebre e louco como chapeleiro').",
          "3. SÍNDROME SIMPATICOMIMÉTICA (Cocaína, Crack, Anfetaminas, Ecstasy/MDMA): MIDRÍASE, DIAFORESE (pele muito suada — diferencia da anticolinérgica!), hipertensão arterial, taquicardia, hipertermia, agitação psicomotora e convulsões.",
          "4. SÍNDROME OPIOIDE (Morfina, Fentanil, Heroína, Metadona, Tramadol): Tríade de MIOSE puntiforme + DEPRESSÃO RESPIRATÓRIA (bradipneia < 12 irpm) + Torpor/Coma (com bradicardia e hiporreflexia).",
          "5. SÍNDROME SEDATIVO-HIPNÓTICA (Benzodiazepínicos, Barbitúricos, Álcool, Zolpidem): Sonolência/Coma, ataxia, fala pastosa, pupilas normais/médias e sinais vitais geralmente preservados (depressão respiratória se associado a álcool/opioides)."
        ]
      }
    ],
    "initial_actions": [
      {
        "title": "Estabilização ABCDE e Descontaminação Gastrointestinal",
        "items": [
          "1. ABCDE prioritário: Via aérea definitiva (IOT) se Glasgow <= 8 ou broncorreia maciça, O2, monitorização cardíaca (ECG de 12 derivações para medir QRS e QTc!) e Glicemia Capilar imediata.",
          "2. CARVÃO ATIVADO EM DOSE ÚNICA (Padrão de Descontaminação): 1 g/kg (máx. 50 g em adultos) diluído em 200–400 mL de água ou SF (proporção 1:8) por via oral ou SNG, indicado nas apresentações com <= 1 a 2 horas da ingestão tóxica, DESDE QUE a via aérea esteja protegida (paciente consciente/cooperativo ou já intubado!).",
          "3. QUANDO O CARVÃO ATIVADO É CONTRAINDICADO (NÃO ADSORVE — Mnemônico PHAIL): Rebaixamento do sensório sem via aérea protegida, Ingestão de Cáusticos (ácidos/álcalis), Hidrocarbonetos/Derivados de petróleo, Álcoois (etanol/metanol/etilenoglicol) e Metais pesados (Ferro, Lítio, Chumbo)."
        ]
      }
    ],
    "exams": [
      {
        "title": "ECG Toxicológico e Exames de Triagem",
        "items": [
          "No ECG de 12 derivações: 1) QRS alargado (> 100 ms) + onda R' terminal > 3 mm em aVR = Intoxicação por Antidepressivo Tricíclico (Amitriptilina/Nortriptilina) -> Fazer Bicarbonato de Sódio IV imediatamente! 2) QTc prolongado (> 500 ms) = Risco de Torsades de Pointes -> Fazer Sulfato de Magnésio 2 g IV!",
          "Solicitar: Gasometria arterial + Lactato, Eletrólitos (calcular Ânion Gap e Gap Osmolar!), Função Renal, CPK, Transaminases, INR e dosagem sérica de Paracetamol (se tentativa de autoextermínio), Salicilatos ou Lítio."
        ]
      }
    ],
    "decision_flow": [
      {
        "if": "Síndrome Colinérgica (Chumbinho / Organofosforado ou Carbamato)",
        "then": "Antídoto Imediato: ATROPINA 1 a 3 mg (2 a 6 ampolas de 0,5 mg) IV em bolus, DOBRANDO a dose a cada 5 minutos (2 -> 4 -> 8 -> 16 mg...) até SECAR AS SECREÇÕES BRÔNQUICAS (ausculta pulmonar limpa e FC > 80 bpm)! Miose NÃO é parâmetro para suspender atropina! Nos organofosforados, associar Pralidoxima (Contrathion) 1–2 g IV em 30 min."
      },
      {
        "if": "Intoxicação por Antidepressivo Tricíclico (Amitriptilina) com QRS > 100 ms, Arritmia Ventricular ou Hipotensão",
        "then": "Antídoto Imediato: BICARBONATO DE SÓDIO 8,4% 1 a 2 mEq/kg IV em bolus direto (ex.: 70 a 140 mL IV), repetindo até estreitar o QRS para < 100 ms e manter pH arterial entre 7,45 e 7,55!"
      },
      {
        "if": "Intoxicação por Cocaína / Crack / Simpaticomiméticos (Agitação, Hipertensão, Taquicardia ou Dor Torácica)",
        "then": "1ª Linha: BENZODIAZEPÍNICOS (Diazepam 5 a 10 mg IV lento ou Midazolam, repetindo até sedação leve — reduz descarga simpática central, PA, FC e temperatura!) + Nitroglicerina/Nitroprussiato se emergência hipertensiva/dor torácica + AAS. EVITAR Betabloqueadores!"
      },
      {
        "if": "Intoxicação por Paracetamol (> 7,5–10 g ou > 150 mg/kg) ou Opioides ou Benzodiazepínicos",
        "then": "Paracetamol: N-Acetilcisteína (Fluimucil) IV protocolo 21h (150 mg/kg em 1h + 50 mg/kg em 4h + 100 mg/kg em 16h). Opioides com bradipneia: Naloxona 0,04 a 0,4 mg IV titulado. Benzodiazepínicos com depressão respiratória pura (sem tricíclico/epilepsia): Flumazenil 0,2 mg IV."
      }
    ],
    "treatment": [
      {
        "title": "Centro de Informação e Assistência Toxicológica (CIATox)",
        "regimen": "Disque-Intoxicação Nacional ANVISA: 0800-722-6001",
        "items": [
          "Acionar o CIATox (0800-722-6001 — gratuito 24h) para discussão de casos complexos, nomograma de Rumack-Matthew e envio de antídotos específicos (soros antiveneno, fomepizol/etanol, azul de metileno, hidroxicobalamina)."
        ]
      }
    ],
    "linked_drug_terms": [
      "Naloxona",
      "Flumazenil",
      "Acetilcisteína",
      "Diazepam",
      "Sulfato de Magnésio"
    ],
    "notification": {
      "text": "Toda Intoxicação Exógena (acidental, ocupacional ou tentativa de suicídio) é de Notificação Compulsória no SINAN (em tentativa de autoextermínio, notificação imediata em 24h e avaliação psiquiátrica antes da alta!)."
    },
    "red_flags": [
      "JAMAIS induzir vômito (xarope de ipeca) e não realizar lavagem gástrica de rotina (restrita a ingestões potencialmente letais há < 1 hora com via aérea intubada).",
      "NUNCA administrar Flumazenil na intoxicação mista por Benzodiazepínico + Antidepressivo Tricíclico (desencadeia convulsões refratárias e assistolia!)."
    ],
    "source_refs": [
      {
        "label": "ANVISA - Rede Nacional de Centros de Informação e Assistência Toxicológica (CIATox)",
        "url": "https://www.gov.br/anvisa/"
      },
      {
        "label": "Goldfrank's Toxicologic Emergencies",
        "url": "https://acmt.net/"
      }
    ],
    "follow_up": [
      {
        "title": "Vigilância de Toxicidade Tardia e Psiquiatria",
        "items": [
          "Monitorização contínua por no mínimo 12 a 24 horas em ambiente de sala de emergência ou UTI para detecção de liberação prolongada ou metabólitos tóxicos tardios.",
          "Avaliação da função hepática (TGO/TGP) e coagulograma por 72 horas em suspeita de intoxicação por Paracetamol.",
          "Contatar o Centro de Informação e Assistência Toxicológica (CIATox / Disque-Intoxicação 0800 722 6001) para discussão de casos atípicos e disponibilidade de antídotos.",
          "Avaliação psiquiátrica obrigatória antes da alta hospitalar em todas as intoxicações com intuito autolítico / tentativa de suicídio."
        ]
      }
    ],
    "special_situations": [
      {
        "title": "Lavagem Gástrica e Contraindicações do Carvão",
        "items": [
          "Carvão Ativado: dose de 1 g/kg (máx 50 g) por sonda orogástrica se ingestão nas últimas 1 a 2 horas e vias aéreas protegidas.",
          "Contraindicações absolutas ao Carvão Ativado: hidrocarbonetos (querosene, gasolina — alto risco de pneumonia lipoide e broncoaspiração), ácidos ou álcalis corrosivos (soda cáustica — agrava perfuração), álcoois (metanol, etilenoglicol — não adsorve) e metais (lítio, ferro).",
          "Síndrome Colinérgica por Organofosforados: administrar Atropina 1 a 2 mg IV repetida a cada 3 a 5 minutos até 'atropinização' completa (ausência de sibilos pulmonares e cessação da broncorreia)."
        ]
      }
    ],
    "linked_recipe_slugs": [
      "prescricao-intoxicacoes"
    ],
    "prophylaxis": [
      {
        "title": "Prevenção de Absorção e Reintoxicação",
        "items": [
          "Descontaminação gastrointestinal com Carvão Ativado (1 g/kg até 50 g VO) benéfico se administrado dentro da primeira hora após a ingestão de substâncias adsorvíveis.",
          "NÃO induzir vômitos nem administrar carvão ativado em pacientes com rebaixamento de consciência sem via aérea protegida ou na ingestão de cáusticos e hidrocarbonetos.",
          "Segurança do paciente: vigilância estrita contra ideação autolesiva, internação em enfermaria protegida e avaliação psiquiátrica obrigatória antes da liberação."
        ]
      }
    ]
  },
  {
    "id": "seed-abstinencia-alcoolica",
    "slug": "sindrome-de-abstinencia-alcoolica-e-delirium-tremens",
    "title": "Síndrome de Abstinência Alcoólica, Crises de Abstinência e Delirium Tremens",
    "category": "Psiquiatria e Saúde Mental",
    "setting": "Pronto-Socorro / Enfermaria / UTI",
    "status": "verified",
    "linked_recipe_slugs": [
      "prescricao-abstinencia-alcoolica"
    ],
    "summary": "Prevenção obrigatória da Encefalopatia de Wernicke com Tiamina parenteral ANTES da glicose, avaliação pela escala CIWA-Ar e terapia guiada por sintomas com Benzodiazepínicos de longa ação (Diazepam / Lorazepam).",
    "suspicion": [
      {
        "title": "Linha do Tempo da Abstinência Alcoólica após Redução/Cessação do Etanol",
        "items": [
          "1. Tremores e Sintomas Autonômicos Leves (6 a 24 horas): Tremor postural de mãos/língua, ansiedade, insônia, sudorese, náuseas, taquicardia e hipertensão, com orientação preservada.",
          "2. Alucinose Alcoólica (12 a 48 horas): Alucinações visuais (zoopsias — insetos/animais), auditivas ou táteis, porém com SENSÓRIO CLARO (paciente orientado no tempo e espaço e sinais vitais estáveis!).",
          "3. Crises Convulsivas de Abstinência ('Rum Fits' — 12 a 48 horas): Crises tônico-clônicas generalizadas breves (1 a 3 episódios).",
          "4. DELIRIUM TREMENS (48 a 96 horas — Emergência Médica com mortalidade de até 5–15%!): Confusão mental aguda / desorientação profunda (Delirium!), agitação psicomotora extrema, alucinações aterrorizantes e TEMPESTADE AUTONÔMICA GRAVE (febre, taquicardia acentuada, hipertensão e sudorese profusa)."
        ]
      }
    ],
    "initial_actions": [
      {
        "title": "Regra Número 1: TIAMINA ANTES DA GLICOSE + Correção Eletrolítica",
        "items": [
          "1. TIAMINA (Vitamina B1) IMEDIATA: Administrar Tiamina 100 a 300 mg IM ou IV (no Delirium Tremens ou suspeita de Encefalopatia de Wernicke: 500 mg IV diluídos em 100 mL de SF 0,9% correr em 30 min de 8/8h por 3 a 5 dias) ANTES ou junto de qualquer solução glicosada!",
          "2. Aplicar a escala CIWA-Ar a cada 1 a 4 horas para titular o benzodiazepínico (CIWA-Ar <= 7: leve; 8 a 15: moderada; >= 16: grave).",
          "3. Corrigir agressivamente Hipomagnesemia (Sulfato de Magnésio 2 g IV), Hipocalemia e Hipofosfatemia, e descartar causas orgânicas associadas (Hematoma Subdural Crônico por queda, PBE, Pneumonia, HDA e Pancreatite)."
        ]
      }
    ],
    "exams": [
      {
        "title": "Exames Complementares no Etilista Agudizado",
        "items": [
          "Glicemia capilar, Eletrólitos completos (Na+, K+, Mg2+, Fósforo e Cálcio), Função Renal, Transaminases, Bilirrubinas, INR, Amilase/Lipase, Hemograma e TC de Crânio (se crise convulsiva inédita, trauma craniano, déficit focal ou rebaixamento desproporcional)."
        ]
      }
    ],
    "decision_flow": [
      {
        "if": "Abstinência Moderada a Grave (CIWA-Ar >= 8 a 10) em paciente sem cirrose descompensada",
        "then": "PADRÃO-OURO: DIAZEPAM 10 a 20 mg VO (ou 5 a 10 mg IV lento puro em 2 min) a cada 1 hora até atingir sedação leve/calma (RASS 0 a -1 e CIWA-Ar < 8). O Diazepam possui metabólito ativo de meia-vida longa (nordiazepam) que promove 'autotitulação/autodesmame' suave e previne convulsões!"
      },
      {
        "if": "Hepatopatia Crônica Avançada (Cirrose Child-Pugh B/C) ou Idoso Frágil",
        "then": "Preferir LORAZEPAM 2 a 4 mg VO (ou sublingual) a cada 1 a 2 horas guiado por sintomas, pois o Lorazepam sofre apenas glicuronidação hepática (sem metabólitos ativos que acumulam na cirrose!)."
      },
      {
        "if": "Delirium Tremens Grave ou Crises de Abstinência",
        "then": "Internação em UTI: Diazepam 10 a 20 mg IV lento a cada 5 a 15 minutos até controle da agitação/delirium (se refratário a altas doses de benzodiazepínico > 100–200 mg, associar Fenobarbital 130–260 mg IV ou Dexmedetomidina/Propofol em UTI)."
      }
    ],
    "treatment": [
      {
        "title": "O Que NUNCA Fazer na Abstinência Alcoólica",
        "regimen": "Evitar Fenitoína e Haloperidol em Monoterapia",
        "items": [
          "1) NÃO usar Fenitoína (Hidantal) para tratar ou prevenir convulsões de abstinência alcoólica: a fenitoína é totalmente INEFICAZ nas crises por abstinência de etanol (o tratamento e a prevenção são feitos com Benzodiazepínicos!).",
          "2) NUNCA usar Haloperidol isolado na abstinência alcoólica: o haloperidol não trata a fisiopatologia GABA/NMDA e REDUZ o limiar convulsivo, podendo precipitar convulsões e morte (usar apenas como adjuvante em baixa dose se alucinações refratárias após o paciente já estar impregnado com benzodiazepínico!)."
        ]
      }
    ],
    "linked_drug_terms": [
      "Diazepam",
      "Haloperidol",
      "Sulfato de Magnésio"
    ],
    "red_flags": [
      "Tríade da Encefalopatia de Wernicke: Confusão mental + Ataxia da marcha + Oftalmoparesia/Nistagmo (paralisia do VI par). Se o paciente receber Soro Glicosado sem Tiamina prévia, o metabolismo da glicose consome a reserva residual de vitamina B1 e precipita Síndrome de Korsakoff irreversível!",
      "NUNCA prescrever 'álcool etílico' oral ou venoso para tratar abstinência hospitalar."
    ],
    "source_refs": [
      {
        "label": "ASAM Clinical Practice Guideline on Alcohol Withdrawal Management",
        "url": "https://www.asam.org/"
      }
    ],
    "follow_up": [
      {
        "title": "Manejo Subagudo e Prevenção de Recaída",
        "items": [
          "Transição dos benzodiazepínicos após resolução dos sintomas agudos (CIWA-Ar < 8 por 24 horas) com redução gradual da dose em 3 a 5 dias.",
          "Manutenção de Tiamina 100 mg VO 3x/dia por 30 a 90 dias após a estabilização para suporte nutricional e neuroproteção.",
          "Tratamento farmacológico para manutenção da abstinência após resolução do quadro agudo: Naltrexona, Acamprosato ou Dissulfiram conforme perfil clínico e função hepática.",
          "Encaminhamento estruturado para o Centro de Atenção Psicossocial Álcool e Drogas (CAPS-AD) e grupos de mútua ajuda (Alcoólicos Anônimos)."
        ]
      }
    ],
    "special_situations": [
      {
        "title": "Delirium Tremens e Encefalopatia de Wernicke",
        "items": [
          "Delirium Tremens: emergência com mortalidade de até 5%; caracterizado por confusão profunda, alucinações vívidas (zoopsias), agitação extrema, febre e taquicardia descompensada; requer altas doses de Diazepam IV (10 a 20 mg a cada 10-15 min) em leito de UTI.",
          "Encefalopatia de Wernicke: tríade clássica de ataxia, oftalmoplegia/nistagmo e confusão mental; prescrever doses terapêuticas altas de Tiamina (500 mg IV de 8/8h nos primeiros 3 dias).",
          "Evitar antipsicóticos isolados (como haloperidol) pelo risco de reduzir o limiar convulsivo e agravar hipotensão e arritmias ventriculares por alargamento do intervalo QTc."
        ]
      }
    ],
    "prophylaxis": [
      {
        "title": "Profilaxia de Encefalopatia de Wernicke e Recaída",
        "items": [
          "Tiamina (Vitamina B1) parenteral obrigatória: Tiamina 100 a 300 mg IV ou IM antes de qualquer infusão de soluções glicosadas para prevenir a precipitação aguda de Encefalopatia de Wernicke.",
          "Profilaxia de convulsões da abstinência: titulação de Diazepam guiada por escore CIWA-Ar.",
          "Prevenção de recaídas: encaminhamento para CAPS-AD e consideração de farmacoterapia de manutenção (Acamprosato, Naltrexona ou Dissulfiram)."
        ]
      }
    ]
  },
  {
    "id": "seed-hpp",
    "slug": "hemorragia-pos-parto-hpp-manejo-e-4ts",
    "title": "Hemorragia Pós-Parto (HPP — Regra dos 4 Ts, Ocitocina, Tranexâmico e Balão)",
    "category": "Ginecologia e Obstetrícia",
    "setting": "Centro Obstétrico / Maternidade / UTI",
    "status": "verified",
    "summary": "Hora de Ouro da HPP (perda > 500 mL no parto vaginal ou > 1.000 mL na cesárea, ou Índice de Choque >= 0,9), massagem uterina bimanual, uterotônicos escalonados, Ácido Tranexâmico 1 g IV precoce e revisão sistemática dos 4 Ts.",
    "suspicion": [
      {
        "title": "Critérios Diagnósticos e Índice de Choque Obstétrico",
        "items": [
          "Perda sanguínea cumulativa >= 500 mL após parto vaginal ou >= 1.000 mL após cesariana nas primeiras 24 horas, OU qualquer perda sanguínea capaz de causar instabilidade hemodinâmica.",
          "ÍNDICE DE CHOQUE OBSTÉTRICO (FC / PAS): Normal na puérpera = 0,5 a 0,7. Se Índice de Choque >= 0,9: alerta precoce de sangramento grave (acionar protocolo de HPP!). Se Índice de Choque >= 1,4: necessidade iminente de Transfusão Maciça!",
          "OS 4 Ts ETIOLÓGICOS DA HPP: 1) TÔNUS (Atonia Uterina — 70% dos casos! Útero amolecido acima da cicatriz umbilical); 2) TRAUMA (20% — Laceração de colo/vagina/períneo, hematoma ou rotura/inversão uterina); 3) TECIDO (10% — Retenção placentária/cotilédones ou acretismo); 4) TROMBINA (1% — Coagulopatias / CIVD / HELLP / Embolia amniótica)."
        ]
      }
    ],
    "initial_actions": [
      {
        "title": "Pacote da 1ª Hora (Hora de Ouro da HPP)",
        "items": [
          "1. Chamar ajuda imediata (obstetra, anestesista, enfermagem e banco de sangue), posicionar 2 acessos venosos calibrosos (14G ou 16G), O2 a 10 L/min, sondagem vesical de demora (esvaziar a bexiga facilita a contração uterina!) e aquecer a paciente.",
          "2. MASSAGEM UTERINA BIMANUAL IMEDIATA (Manobra de Hamilton) enquanto se preparam os uterotônicos + revisar canal de parto e placenta.",
          "3. ÁCIDO TRANEXÂMICO PRECOCE (Estudo WOMAN): 1 g (4 ampolas de 250 mg) diluído em 100 mL SF 0,9% correr IV em 10 minutos (dentro das primeiras 3 horas do parto, independente da causa dos 4 Ts!). Pode repetir mais 1 g IV se o sangramento persistir após 30 minutos."
        ]
      }
    ],
    "exams": [
      {
        "title": "Monitorização Laboratorial e Fibrinogênio Crítico",
        "items": [
          "Coletar imediatamente: Tipagem sanguínea e prova cruzada, Hemograma, Coagulograma (TP, TTPa), Gasometria/Lactato e FIBRINOGÊNIO sérico!",
          "O Fibrinogênio é o marcador mais precoce de coagulopatia na HPP (normal na gestante a termo > 400 mg/dL; se Fibrinogênio < 200 mg/dL, há altíssimo valor preditivo para HPP grave -> repor Crioprecipitado ou Concentrado de Fibrinogênio imediatamente!)."
        ]
      }
    ],
    "decision_flow": [
      {
        "if": "1ª Linha Uterotônica na Atonia Uterina (Tônus)",
        "then": "OCITOCINA (5 UI/mL): Diluir 4 ampolas (20 UI) em 500 mL de SF 0,9% ou Ringer Lactato e infundir a 250 mL/h (10 UI na 1ª hora) + manutenção de 125 mL/h (NUNCA fazer Ocitocina pura em bolus IV rápido pelo risco de hipotensão profunda e colapso cardiovascular!)."
      },
      {
        "if": "Falha da Ocitocina após 15–20 minutos (2ª e 3ª Linhas Uterotônicas)",
        "then": "2ª Linha: METILERGOMETRINA (Methergin 0,2 mg/1 mL) 1 ampola (0,2 mg) IM a cada 2 a 4 horas (máx. 5 doses/24h) — ATENÇÃO: ESTRITAMENTE CONTRAINDICADA em pacientes com Hipertensão, Pré-Eclâmpsia ou Eclâmpsia! 3ª Linha: MISOPROSTOL 800 mcg por via retal ou sublingual em dose única."
      },
      {
        "if": "Atonia Uterina Refratária aos Uterotônicos + Ácido Tranexâmico",
        "then": "Inserir BALÃO DE TAMPONAMENTO INTRAUTERINO (Balão de Bakri ou artesanal de Alves, preenchido com 300 a 500 mL de SF 0,9% por até 24h, mantendo ocitocina + cefazolina profilática) e aplicar Traje Anti-Choque Não Pneumático (TAN). Se falha do balão: Suturas Compressivas de B-Lynch / Hayman, Ligadura Vascular ou Histerectomia Puerperal."
      }
    ],
    "treatment": [
      {
        "title": "Prevenção Universal da HPP no 3º Período do Parto",
        "regimen": "Manejo Ativo do Secundamento em Todo Parto",
        "items": [
          "Administrar Ocitocina 10 UI IM imediatamente após o desprendimento do ombro anterior / nascimento do concepto + Clampeamento oportuno do cordão (1 a 3 min) + Tração controlada do cordão com contra-tração suprapúbica (Manobra de Brandt-Andrews) + Vigilância do tônus uterino (Globo de Segurança de Pinard)."
        ]
      }
    ],
    "linked_drug_terms": [
      "Ácido Tranexâmico"
    ],
    "red_flags": [
      "JAMAIS administrar Metilergometrina (Methergin) em gestantes/puérperas hipertensas ou com Pré-Eclâmpsia (precipita crise hipertensiva gravíssima, AVC hemorrágico e vasoespasmo coronariano!).",
      "Sangramento vaginal intenso com ÚTERO BEM CONTRAÍDO (Globo de Pinard firme): a causa NÃO é atonia! Investigar imediatamente Laceração de Trajeto (colo/vagina) com valvas ou Coagulopatia."
    ],
    "source_refs": [
      {
        "label": "OPAS / OMS / FEBRASGO - Estratégia Zero Morte Materna por Hemorragia Pós-Parto",
        "url": "https://www.febrasgo.org.br/"
      },
      {
        "label": "WOMAN Trial Collaborators - Effect of early tranexamic acid administration on mortality in post-partum haemorrhage (Lancet)",
        "url": "https://www.thelancet.com/"
      }
    ],
    "follow_up": [
      {
        "title": "Vigilância Puerperal Imediata e Metas",
        "items": [
          "Monitorização intensiva de sinais vitais, débito urinário e sangramento vaginal a cada 15 minutos nas primeiras 2 horas pós-parto e a cada 30 minutos nas próximas 2 horas.",
          "Manutenção de ocitocina profilática contínua por 4 a 6 horas após a hemostasia primária.",
          "Controle de hemograma e coagulograma com 6 e 12 horas pós-evento hemorrágico.",
          "Atenção ao choque oculto: puérperas jovens compensam grandes perdas volêmicas antes de apresentarem hipotensão tardia acentuada."
        ]
      }
    ],
    "special_situations": [
      {
        "title": "Manejo Escalonado e Balão de Bakri",
        "items": [
          "Atonia Uterina refratária a drogas uterotônicas: introduzir imediatamente o Balão de Tamponamento Intrauterino (Balão de Bakri ou balão artesanal com preservativo) infundido com 300 a 500 mL de SF 0,9% morno como ponte terapêutica hemostática.",
          "Metilergometrina 0,2 mg IM: contraindicação formal em pacientes com hipertensão arterial crônica, pré-eclâmpsia ou cardiopatia pelo risco de vasoespasmo e crise hipertensiva aguda.",
          "Protocolo de Transfusão Maciça Obstétrica: acionar banco de sangue para liberação de concentrado de hemácias, plasma fresco congelado e plaquetas na proporção 1:1:1 se perda estimada > 1.500 mL ou instabilidade hemodinâmica grave."
        ]
      }
    ],
    "linked_recipe_slugs": [
      "prescricao-hpp"
    ],
    "prophylaxis": [
      {
        "title": "Profilaxia Ativa do 3º Período do Parto (OMS/FEBRASGO)",
        "items": [
          "Ocitocina profilática imediata: administrar Ocitocina 10 UI IM (ou IV lenta) a todas as parturientes logo após a saída do concepto (medida mais eficaz para prevenir atonia uterina).",
          "Tração controlada do cordão umbilical e vigilância do tônus uterino a cada 15 minutos nas primeiras duas horas pós-parto.",
          "Ácido Tranexâmico precoce: em sangramento persistente além do esperado, administrar Ácido Tranexâmico 1 g IV nas primeiras 3 horas do parto."
        ]
      }
    ]
  },
  {
    "id": "seed-crise-adrenal",
    "slug": "insuficiencia-adrenal-aguda-crise-adrenal",
    "title": "Insuficiência Adrenal Aguda (Crise Adrenal / Crise Addisoniana)",
    "category": "Endocrinologia e Metabolismo",
    "setting": "Sala Vermelha / Pronto-Socorro / UTI",
    "status": "verified",
    "summary": "Suspeita clínica no choque refratário a catecolaminas com hiponatremia/hipercalemia/hipoglicemia, administração imediata de Hidrocortisona 100 mg IV em bolus + 200 mg/24h e ressuscitação volêmica com SF 0,9% + Glicose.",
    "suspicion": [
      {
        "title": "Quando Suspeitar de Crise Adrenal na Emergência?",
        "items": [
          "Choque distributivo/hipovolêmico refratário a volume e noradrenalina, acompanhado de dor abdominal aguda (que pode simular abdome agudo cirúrgico!), náuseas, vômitos, febre inexplicada e letargia/confusão.",
          "Causa mais comum na prática clínica: SUSPENSÃO ABRUPTA de corticoterapia crônica (> 20 mg/dia de Prednisona ou equivalente por > 3 semanas) ou falta de ajuste da dose de corticoide ('dose de estresse') durante uma infecção aguda, cirurgia ou trauma!",
          "Tríade Laboratorial Clássica (especialmente na Insuficiência Adrenal Primária / Doença de Addison por deficiência de cortisol + aldosterona): HIPONATREMIA + HIPERCALEMIA + HIPOGLICEMIA (além de acidose metabólica hiperclorêmica, hipercalcemia leve e eosinofilia!)."
        ]
      }
    ],
    "initial_actions": [
      {
        "title": "Conduta de Emergência (Tratar ANTES do Resultado do Cortisol!)",
        "items": [
          "1. Se o paciente ainda não recebeu corticoide, colher 1 tubo de sangue para dosagem de Cortisol Basal e ACTH plasmático, mas NUNCA atrasar a administração de Hidrocortisona aguardando resultado!",
          "2. RESSUSCITAÇÃO VOLÊMICA VIGOROSA: 1.000 mL de Soro Fisiológico 0,9% IV na 1ª hora (NÃO usar Ringer Lactato se houver hipercalemia!), seguido de SF 0,9% associado a Soro Glicosado 5% (ou Glicose 50% 40 mL IV se hipoglicemia < 70 mg/dL).",
          "3. HIDROCORTISONA IMEDIATA: Dose de ataque de 100 mg IV em bolus imediato, seguida de 200 mg/24h IV (50 mg IV de 6 em 6 horas ou infusão contínua de 8,3 mg/h)."
        ]
      }
    ],
    "exams": [
      {
        "title": "Avaliação Laboratorial e Pesquisa do Fator Precipitante",
        "items": [
          "Eletrólitos (Na+, K+, Ca2+), Glicemia, Gasometria arterial, Ureia/Creatinina, Hemograma (eosinofilia e linfocitose relativa), Cortisol sérico, ACTH, TSH/T4 livre e rastreio infeccioso completo (infecção é o gatilho em > 50% das crises!)."
        ]
      }
    ],
    "decision_flow": [
      {
        "if": "Paciente com diagnóstico conhecido de Insuficiência Adrenal ou uso crônico de Corticoide em Choque / Crise Adrenal",
        "then": "Hidrocortisona 100 mg IV em bolus imediato + 50 mg IV de 6/6h (em doses >= 100 mg/dia de hidrocortisona, a atividade mineralocorticoide já é plena, dispensando Fludrocortisona na fase aguda!)."
      },
      {
        "if": "Suspeita de 1º episódio de Insuficiência Adrenal em que se deseja realizar Teste de Estímulo com Cortrosina (ACTH) imediato sem interferência no ensaio",
        "then": "Pode-se administrar Dexametasona 4 mg IV em bolus (único corticoide que não cruza no imunoensaio de cortisol sérico) + SF 0,9%; contudo, se houver insuficiência adrenal primária, associar ou migrar logo após a coleta para Hidrocortisona 100 mg IV pelo efeito mineralocorticoide."
      }
    ],
    "treatment": [
      {
        "title": "Desmame para Dose Fisiológica após Estabilização (48–72h)",
        "regimen": "Transição para Prednisona ou Hidrocortisona Oral (± Fludrocortisona)",
        "items": [
          "Após resolução do fator desencadeante e estabilidade hemodinâmica por 24–48h, reduzir gradualmente a Hidrocortisona IV em 50% ao dia até atingir a dose de reposição oral fisiológica (Prednisona 5 mg VO pela manhã ou Hidrocortisona VO 15–25 mg/dia divididos em 2–3 tomadas; na IA Primária, reintroduzir Fludrocortisona 0,1 mg/dia VO quando a dose de hidrocortisona cair para < 50 mg/dia)."
        ]
      }
    ],
    "linked_drug_terms": [
      "Hidrocortisona",
      "Dexametasona",
      "Noradrenalina"
    ],
    "red_flags": [
      "No Hipotireoidismo Grave / Coma Mixedematoso coexistente: SEMPRE administrar Hidrocortisona 100 mg IV ANTES de iniciar a Levotiroxina (T4), pois o hormônio tireoidiano acelera o metabolismo hepático do cortisol residual e precipita Crise Adrenal fatal!",
      "NUNCA suspender abruptamente o corticoide em paciente que faz uso crônico há > 3 semanas."
    ],
    "source_refs": [
      {
        "label": "Endocrine Society Clinical Practice Guideline: Diagnosis and Treatment of Primary Adrenal Insufficiency",
        "url": "https://www.endocrine.org/"
      }
    ],
    "follow_up": [
      {
        "title": "Transição para Posologia Oral e Educação Preventiva",
        "items": [
          "Manter Hidrocortisona endovenosa por pelo menos 24 a 48 horas até estabilidade hemodinâmica duradoura e cessação dos sintomas gastrintestinais.",
          "Transição para reposição oral: Hidrocortisona oral 15 a 25 mg/dia fracionada (ou Prednisona 5 mg/dia) associada a Fludrocortisona 0,05 a 0,1 mg/dia na insuficiência adrenal primária.",
          "Educação em saúde para o paciente: orientação da 'regra dos dias de doença' (dobrar ou triplicar a dose oral habitual de corticoide em caso de febre ou infecções moderadas).",
          "Fornecer cartão de identificação de portador de insuficiência adrenal e kit de emergência com hidrocortisona 100 mg injetável para viagens."
        ]
      }
    ],
    "special_situations": [
      {
        "title": "Diagnóstico Rápido e Tratamento Empírico",
        "items": [
          "A suspeita de Crise Adrenal requer TRATAMENTO IMEDIATO com hidrocortisona — NUNCA aguardar dosagens laboratoriais de cortisol ou ACTH para iniciar a corticoterapia.",
          "Se for necessário realizar o teste de estímulo com ACTH sem atrasar a conduta: utilizar Dexametasona 4 mg IV (não interfere no ensaio laboratorial do cortisol plasmático, diferentemente da hidrocortisona).",
          "Correção volêmica inicial agressiva: infundir cristaloide com Soro Fisiológico 0,9% associado a SG 5% se hipoglicemia associada para correção rápida da hipovolemia e hiponatremia."
        ]
      }
    ],
    "linked_recipe_slugs": [
      "prescricao-crise-adrenal"
    ],
    "prophylaxis": [
      {
        "title": "Prevenção de Crises Adrenais em Situações de Estresse",
        "items": [
          "Regra do dia de doença ('Sick Day Rules'): dobrar ou triplicar a dose habitual de corticoide oral (Hidrocortisona/Prednisona) durante quadros infecciosos febris ou estresse moderado.",
          "Preparação cirúrgica: hidrocortisona parenteral venosa profilática perioperatória antes de procedimentos cirúrgicos ou partos.",
          "Kit de emergência domiciliar: fornecer prescrição e ensinar o paciente/família a aplicar ampola de Dexametasona ou Hidrocortisona IM e portar cartão/pulseira de identificação de insuficiência adrenal."
        ]
      }
    ]
  },
  {
    "id": "seed-hipercalemia",
    "slug": "hipercalemia-grave-emergencia-eletrocardiografica",
    "title": "Hipercalemia Grave e Alterações Eletrocardiográficas",
    "category": "Nefrologia e Urologia",
    "setting": "Pronto-Socorro / Emergência / UTI",
    "status": "verified",
    "linked_recipe_slugs": [
      "prescricao-hipercalemia-emergencia"
    ],
    "summary": "Abordagem sistemática imediata para K+ > 6,5 mEq/L ou qualquer elevação com repercussão no ECG: estabilização de membrana, medidas de shift intracelular e espoliação corporal.",
    "suspicion": [
      {
        "title": "Sinais de Alerta Clínico e Eletrocardiográfico",
        "items": [
          "Potássio sérico >= 6,0 mEq/L (grave se >= 6,5 mEq/L) ou elevação rápida em insuficiência renal aguda/anúria, lise tumoral ou rabdomiólise.",
          "ECG imediato: ondas T apiculadas, simétricas e de base estreita ('em tenda'); achatamento ou perda da onda P e alargamento do intervalo PR; alargamento de QRS; ritmo sinoventricular/onda senoidal (risco iminente de assistolia ou FV)."
        ]
      }
    ],
    "initial_actions": [
      {
        "title": "Tríade Sequencial de Manejo",
        "items": [
          "1. Monitorização contínua de ECG, oximetria e acesso venoso periférico calibroso imediato.",
          "2. Estabilização de Membrana Miocárdica (se alteração de ECG ou K+ >= 6,5 mEq/L): Gluconato de Cálcio 10% (10 mL = 1 g) IV em 2 a 5 minutos. Não reduz o potássio, mas previne arritmias fatais por 30 a 60 min. Pode ser repetido em 5–10 min se o ECG não normalizar.",
          "3. Medidas de Shift (Entrada de K+ na Célula): Solução polarizante glico-insulínica (Insulina Regular 10 UI em 100 mL de Glicose 50% IV em 20–30 min) + Inalação com Beta-2 agonista (Fenoterol 10–20 gotas ou Salbutamol 5 mg nebulizados em 10 min).",
          "4. Medidas de Remoção/Espoliação: Furosemida 40 a 80 mg IV (se função renal residual) e/ou Resina de troca (Poliestirenossulfonato de cálcio/Sorcal 15 a 30 g VO de 6/6h) ou novos quelantes (Patiromer / Ciclossilicato de sódio e zircônio se disponíveis).",
          "5. Hemodiálise de Emergência: indicação imediata se hipercalemia refratária, anúria, acidose metabólica grave refratária ou onda senoidal persistente."
        ]
      }
    ],
    "exams": [
      {
        "title": "Investigação Laboratorial e Etiológica",
        "items": [
          "ECG de 12 derivações seriado a cada 15 a 30 minutos até estabilização.",
          "Gasometria venosa ou arterial (avaliar pH e bicarbonato - acidose piora o shift de K+).",
          "Ureia, creatinina, sódio, cálcio iônico, magnésio, fósforo, CPK (afastar rabdomiólise) e hemograma com plaquetas (afastar pseudohipercalemia por hemólise ou trombocitose grave)."
        ]
      }
    ],
    "decision_flow": [
      {
        "if": "Paciente em uso de Digoxina apresentando hipercalemia grave com alteração de ECG",
        "then": "Gluconato de Cálcio deve ser administrado com cautela extrema (infundir em 20–30 min) ou preferir anticorpo antidigoxina (Fab fragment) se intoxicação digitálica suspeita."
      },
      {
        "if": "Paciente anúrico ou com DRC dialítica em choque ou congestão grave refratária",
        "then": "Acionar equipe de Nefrologia imediatamente para passagem de cateter de hemodiálise de urgência."
      }
    ],
    "linked_drug_terms": [
      "Gluconato de Cálcio 10%",
      "Insulina Regular",
      "Glicose 50%",
      "Salbutamol",
      "Furosemida",
      "Bicarbonato de Sódio 8,4%"
    ],
    "treatment": [
      {
        "title": "1. Estabilização de Membrana Miocárdica (Efeito imediato em 1-3 min, duração 30-60 min)",
        "regimen": "Gluconato de Cálcio 10% IV (1 ampola = 10 mL = 1 g de sal = 93 mg de cálcio elementar)",
        "items": [
          "Infundir 10 mL IV diluídos em 50 a 100 mL de SF 0,9% ou SG 5% em 2 a 5 minutos sob monitorização contínua de ECG.",
          "Indicação formal: K+ >= 6,5 mEq/L ou QUALQUER valor com alteração no ECG (onda T apiculada, perda de P, QRS alargado).",
          "Se não houver melhora ou reversão do traçado após 5 a 10 minutos, repetir uma segunda ampola (10 mL).",
          "Atenção: O cálcio NÃO reduz os níveis séricos de potássio; apenas antagoniza o efeito cardiotóxico e previne arritmias fatais (assistolia e fibrilação ventricular)."
        ]
      },
      {
        "title": "2. Medidas de Shift Intracelular (Entrada temporária de K+ na célula em 15-30 min)",
        "regimen": "Solução Glico-Insulínica + Beta-2 Agonista Inalatório",
        "items": [
          "Solução Glico-Insulínica: Insulina Regular 10 UI diluídas em 100 mL de Glicose 50% (ou 500 mL de Glicose 10%) infundidas por via endovenosa em 20 a 30 minutos. Reduz o potássio sérico em 0,5 a 1,2 mEq/L por 4 a 6 horas. Se glicemia capilar prévia > 250 mg/dL, administrar apenas a Insulina sem a glicose.",
          "Nebulização com Beta-2 agonista: Salbutamol 10 a 20 mg (2 a 4 mL de solução para nebulização 5 mg/mL) ou Fenoterol 10 a 20 gotas em 4 mL de SF 0,9% em 10 a 15 minutos com fluxo de O2 de 6 a 8 L/min. Efeito aditivo com a insulina.",
          "Bicarbonato de Sódio 8,4%: 50 a 100 mEq (50 a 100 mL) IV em 30 a 60 min. Reservado estritamente para pacientes com acidose metabólica com ânion gap normal ou acidemia grave (pH < 7,15 ou HCO3 < 12 mEq/L)."
        ]
      },
      {
        "title": "3. Medidas de Eliminação / Espoliação Definitiva de Potássio",
        "regimen": "Diuréticos de Alça + Resinas Trocadoras + Hemodiálise",
        "items": [
          "Furosemida: 40 a 80 mg IV em bolus lento em pacientes com função renal residual e sem hipovolemia. Estimula a caliurese nos túbulos coletores.",
          "Resinas trocadoras de cátions: Poliestirenossulfonato de cálcio (Sorcal) 15 a 30 g por via oral diluído em 100 mL de água (sem sorbitol) de 6 em 6 horas (ou Patiromer 8,4 g/dia ou Ciclossilicato de sódio e zircônio 10 g 8/8h se disponíveis). Ação lenta (horas a dias).",
          "Hemodiálise de Urgência: Terapia definitiva mais rápida e eficaz. Indicação mandatória em anúria, DRC terminal/dialítica, hipercalemia refratária às medidas clínicas ou onda senoidal persistente."
        ]
      }
    ],
    "follow_up": [
      {
        "title": "Monitorização e Conduta Pós-Crise",
        "items": [
          "Dosagem seriada de potássio sérico a cada 2 a 4 horas nas primeiras 12 horas.",
          "Glicemia capilar horária nas primeiras 4 a 6 horas após a solução glico-insulínica para detecção de hipoglicemia tardia por clearance prolongado da insulina.",
          "Investigação e suspensão imediata de fármacos hipercalemiantes: IECAs, BRAs, Espironolactona, Amilorida, AINEs, Heparinas, Betabloqueadores não seletivos e suplementos.",
          "Acompanhamento conjunto com Nefrologia se TFG < 30 mL/min/1,73m² ou episódios recidivantes."
        ]
      }
    ],
    "special_situations": [
      {
        "title": "Populações Especiais e Cuidados Específicos",
        "items": [
          "Uso concomitante de Digoxina: Infundir Gluconato de Cálcio lentamente em 20 a 30 minutos em bomba ou SG 5% para evitar hipercalcemia aguda que precipita toxicidade digitálica severa; considerar anticorpo Fab antidigoxina precocemente.",
          "Hiperglicemia prévia significativa (Glicose > 250 mg/dL): Omitir o bolus de Glicose 50% e prescrever apenas Insulina Regular 10 UI em bolus IV sob glicemia capilar seriada.",
          "Insuficiência Renal Anúrica: Não forçar diuréticos de alça e não atrasar a passagem de cateter de hemodiálise (Shilley ou permcath) e preparo da máquina de diálise."
        ]
      }
    ],
    "red_flags": [
      "ECG com onda senoidal, alargamento extremo de QRS (> 160 ms) ou perda completa da onda P (iminência de assistolia ou FV).",
      "Potássio sérico >= 7,0 mEq/L mesmo com ECG inicialmente sem alterações marcantes.",
      "Persistência de toxicidade elétrica após 2 doses de Gluconato de Cálcio 10%.",
      "Hipercalemia grave refratária em paciente anúrico ou com uremia sintomática / congestão pulmonar grave."
    ],
    "source_refs": [
      {
        "label": "KDIGO Clinical Practice Guideline for Acute Kidney Injury",
        "url": "https://kdigo.org/"
      },
      {
        "label": "AHA Guidelines for Cardiopulmonary Resuscitation and Emergency Cardiovascular Care",
        "url": "https://www.ahajournals.org/"
      }
    ],
    "prophylaxis": [
      {
        "title": "Prevenção de Recorrência e Ajuste Terapêutico Crônico",
        "items": [
          "Revisão farmacológica imediata: suspender ou reduzir IECA/BRA, Espironolactona, suplementos de potássio e AINEs.",
          "Orientação nutricional: dieta pobre em potássio (restringir frutas como banana, abacate, laranja, água de coco e tomate).",
          "Terapia de manutenção: uso criterioso de diuréticos de alça (Furosemida) ou resinas trocadoras de cátions (Sulfonato de Poliestireno de Cálcio / Patiromer)."
        ]
      }
    ]
  },
  {
    "id": "seed-hipoglicemia",
    "slug": "hipoglicemia-grave-no-adulto-manejo-de-urgencia",
    "title": "Hipoglicemia Grave no Adulto (Tríade de Whipple e Manejo Agudo)",
    "category": "Endocrinologia e Metabologia",
    "setting": "Pronto-Socorro / Enfermaria / Domiciliar",
    "status": "verified",
    "linked_recipe_slugs": [
      "prescricao-hipoglicemia-grave"
    ],
    "summary": "Diagnóstico rápido e reversão imediata de hipoglicemia sintomática (Glicemia capilar < 70 mg/dL ou < 54 mg/dL grave/comatoso), com prevenção de encefalopatia e recidiva.",
    "suspicion": [
      {
        "title": "Quadro Clínico e Tríade de Whipple",
        "items": [
          "Glicemia plasmática ou capilar < 70 mg/dL (hipoglicemia clínica) ou < 54 mg/dL (nível de alerta grave).",
          "Sintomas neurogênicos/adrenérgicos: sudorese fria, taquicardia, tremores, palidez, ansiedade, fome intensa.",
          "Sintomas neuroglicopênicos: confusão mental, sonolência, rebaixamento do sensório, déficits neurológicos focais ('stroke mimics'), convulsões ou coma.",
          "Tríade de Whipple: sintomas compatíveis + hipoglicemia laboratorial documentada + alívio imediato dos sintomas após infusão de glicose."
        ]
      }
    ],
    "initial_actions": [
      {
        "title": "Abordagem Imediata por Nível de Consciência",
        "items": [
          "PACIENTE CONSCIENTE (Capaz de deglutir com segurança): Administrar 15 a 20 g de carboidrato simples VO (ex.: 150 a 200 mL de suco de laranja açucarado, refrigerante comum ou 1 colher de sopa de açúcar diluído em água). Regra dos 15: aguardar 15 minutos e retestar glicemia capilar; se < 70 mg/dL, repetir a dose.",
          "PACIENTE INCONSCIENTE OU EM RISCO DE BRONCOASPIRAÇÃO: Acesso venoso imediato + Administrar 40 a 50 mL de Glicose 50% IV em bolus lento (20 a 25 g de glicose) em 3 a 5 minutos. Se não houver Glicose 50%, utilizar 100 mL de Glicose 25% ou 200 mL de Glicose 10%.",
          "Sem Acesso Venoso Disponível: Glucagon 1 mg via intramuscular (IM) ou subcutânea (SC) ou Glicose 10% por sonda nasogástrica se bem posicionada.",
          "Prevenção de Recidiva: Iniciar soro de manutenção com SG 5% ou SG 10% IV (cerca de 50 a 100 mL/h) se a hipoglicemia foi causada por sulfonilureias (Glibenclamida/Gliclazida) ou insulinas de ação prolongada (NPH, Degludeca, Glargina), mantendo vigilância por no mínimo 24 a 48 horas hospitalares."
        ]
      }
    ],
    "exams": [
      {
        "title": "Avaliação Complementar e Fatores Precipitantes",
        "items": [
          "Glicemia capilar a cada 15 a 30 minutos na primeira hora, e depois a cada 1 a 2 horas até estabilização com glicemia > 100 mg/dL.",
          "Função renal (ureia e creatinina), eletrólitos séricos, hemograma e rastreio de infecção oculta (fator descompensador comum de hipoglicemia em diabéticos).",
          "Em pacientes desnutridos ou etilistas crônicos: administrar Tiamina 100 mg IV/IM ANTES ou junto à glicose para prevenir Síndrome de Wernicke."
        ]
      }
    ],
    "decision_flow": [
      {
        "if": "Hipoglicemia secundária a Sulfonilureias de meia-vida longa com recidiva frequente",
        "then": "Manter paciente internado em observação por pelo menos 24 a 48h com SG 10% IV contínuo. Considerar Octreotide 50 a 100 mcg SC de 8/8h se hipoglicemia refratária."
      },
      {
        "if": "Paciente mantém coma ou déficit focal persistente após normalização da glicemia",
        "then": "Solicitar TC de crânio urgente e considerar lesão cerebral anóxica/neuroglicopênica ou AVC isquêmico concorrente."
      }
    ],
    "linked_drug_terms": [
      "Glicose 50%",
      "Glicose 10%",
      "Glicose 5%",
      "Glucagon",
      "Tiamina"
    ],
    "treatment": [
      {
        "title": "1. Paciente Consciente e Apto a Deglutir (Glicemia < 70 mg/dL)",
        "regimen": "Regra dos 15 (Carboidrato simples oral)",
        "items": [
          "Oferecer 15 a 20 g de carboidratos de ação rápida: 150 a 200 mL de refrigerante comum ou suco de laranja açucarado, 1 colher de sopa de açúcar diluído em água ou 3 a 4 balas mastigáveis.",
          "Aguardar 15 minutos e reavaliar glicemia capilar.",
          "Se mantiver glicemia < 70 mg/dL, repetir 15 a 20 g de carboidrato oral rápido.",
          "Quando a glicemia estiver normalizada (>= 70 mg/dL) e o paciente estiver estável, oferecer refeição sólida com carboidratos complexos (pão, bolachas de água e sal) para evitar rebote de hipoglicemia."
        ]
      },
      {
        "title": "2. Paciente Inconsciente, Rebaixado ou com Risco de Aspiração (Glicemia < 54 mg/dL ou Sintomático Grave)",
        "regimen": "Glicose Hipertônica 50% Endovenosa em Bolus",
        "items": [
          "Acesso venoso calibroso imediato e administrar 40 a 50 mL de Glicose 50% IV lenta (20 a 25 g de glicose pura) em 3 a 5 minutos.",
          "Alternativa se G50% não disponível: 100 mL de Glicose 25% IV ou 200 a 250 mL de Glicose 10% IV em infusão rápida.",
          "Reavaliar glicemia capilar após 15 minutos; se persistir < 70 mg/dL, repetir o bolus de 40 a 50 mL de Glicose 50% IV."
        ]
      },
      {
        "title": "3. Sem Acesso Venoso Disponível ou Emergência Domiciliar / Pré-Hospitalar",
        "regimen": "Glucagon Intramuscular ou Subcutâneo",
        "items": [
          "Glucagon 1 mg via intramuscular (IM) ou subcutânea (SC) na região deltoide ou coxa.",
          "Dose pediátrica se < 25 kg: 0,5 mg IM/SC.",
          "Tempo de resposta esperado: 10 a 15 minutos. Pode provocar náuseas e vômitos intensos ao despertar; posicionar em decúbito lateral de segurança.",
          "Atenção: Ineficaz no etilismo crônico, desnutrição grave ou jejum prolongado por esgotamento prévio das reservas hepáticas de glicogênio."
        ]
      },
      {
        "title": "4. Manutenção e Prevenção de Recidiva Hospitalar",
        "regimen": "Soro Glicosado Contínuo + Tiamina",
        "items": [
          "Iniciar infusão contínua de Soro Glicosado 10% a 50–100 mL/h (ou SG 5% se risco de sobrecarga volêmica) após reversão do bolus.",
          "No paciente com etilismo crônico, desnutrição ou perda de peso grave: administrar Tiamina (Vitamina B1) 100 mg IV ou IM ANTES ou imediatamente junto com a glicose para prevenir Síndrome de Wernicke.",
          "Em hipoglicemia induzida por Sulfonilureias (Glibenclamida, Gliclazida) com recidivas frequentes: considerar Octreotide 50 a 100 mcg via subcutânea de 8 em 8 horas (suprime a secreção endógena de insulina mediada pela sulfonilureia)."
        ]
      }
    ],
    "follow_up": [
      {
        "title": "Monitorização e Critérios de Internação vs Alta",
        "items": [
          "Internação hospitalar obrigatória por 24 a 48 horas em todos os casos de hipoglicemia induzida por Sulfonilureias ou insulinas de longa ação (Degludeca, Glargina, NPH) devido ao risco de recidiva fatal no domicílio.",
          "Glicemia capilar seriada horária nas primeiras 4 horas e a cada 2 a 3 horas a seguir.",
          "Revisão farmacológica e redução da dose ou suspensão dos hipoglicemiantes orais.",
          "Educação do paciente e cuidadores: identificação de sintomas precoces e fornecimento de glicose ou alimentos rápidos para porte individual."
        ]
      }
    ],
    "special_situations": [
      {
        "title": "Populações Especiais e Cuidados Específicos",
        "items": [
          "Doença Renal Crônica (DRC): Clearance de insulina e metabólitos de sulfonilureia está drasticamente reduzido; episódios de hipoglicemia duram mais de 48h e demandam vigilância prolongada.",
          "Etilista Crônico: A inibição hepática da gliconeogênese pelo metabolismo do etanol é a causa primária. Sempre repor Tiamina 100 mg antes ou junto para evitar precipitar Encefalopatia de Wernicke aguda.",
          "Pediatria e Neonatologia: Administrar exclusivamente Glicose 10% na dose de 2 a 5 mL/kg (0,2 a 0,5 g/kg) IV lento. Não infundir G50% direto em veia periférica de crianças pequenas pelo alto risco de esclerose venosa, hiperosmolaridade e necrose tecidual."
        ]
      }
    ],
    "red_flags": [
      "Persistência de déficit neurológico focal (hemiparesia, afasia) ou coma após normalização da glicemia sérica por > 30 minutos (investigar AVC isquêmico concorrente ou encefalopatia anóxica/hipoglicêmica).",
      "Hipoglicemia secundária a sulfonilureia de ação prolongada ou em paciente nefropata avançado.",
      "Convulsão prolongada ou refratária com lesão secundária por trauma de queda.",
      "Instabilidade hemodinâmica, choque ou acidose lática grave concomitante."
    ],
    "source_refs": [
      {
        "label": "American Diabetes Association (ADA) Standards of Care in Diabetes",
        "url": "https://diabetesjournals.org/care"
      },
      {
        "label": "Diretrizes da Sociedade Brasileira de Diabetes (SBD)",
        "url": "https://diretriz.diabetes.org.br/"
      }
    ],
    "prophylaxis": [
      {
        "title": "Prevenção de Recorrência e Educação do Paciente",
        "items": [
          "Aporte de carboidrato complexo após recuperação: fornecer refeição sólida com carboidratos de absorção lenta para evitar hipoglicemia de rebote após infusão de glicose hipertônica.",
          "Ajuste da terapia hipoglicemiante: reavaliar doses de insulina e suspender sulfonilureias de longa ação (especialmente Glibenclamida em idosos e doentes renais).",
          "Prescrição e treinamento de Glucagon nasal ou subcutâneo para familiares de diabéticos insulinizados tipo 1 e tipo 2 de alto risco."
        ]
      }
    ]
  }
];

  window.TRAUBE_RECIPE_SEEDS = [
  {
    "id": "rec-seed-sepse",
    "slug": "prescricao-sepse-hora-1",
    "title": "Pacote 1ª Hora — Sepse e Choque Séptico (UTI/Sala Vermelha)",
    "status": "verified",
    "data": {
      "copy_ready": true,
      "routes": [
        {
          "route": "Uso Endovenoso Imediato (Ressuscitação e Antimicrobiano)",
          "mode": "standard",
          "items": [
            {
              "drug": "Ringer Lactato (ou Plasma-Lyte)",
              "quantity": "30 mL/kg IV",
              "directions": "Correr aberto nas primeiras 1 a 3 horas se hipotensão (PAS < 90 ou PAM < 65 mmHg) ou lactato >= 4 mmol/L. Reavaliar fluido-responsividade e POCUS pulmonar."
            },
            {
              "drug": "Ceftriaxona 2 g + Claritromicina 500 mg (Foco Pulmonar) OU Piperacilina-Tazobactam 4,5 g (Foco Abdominal/Urinário Grave)",
              "quantity": "IV na 1ª hora",
              "directions": "Infundir imediatamente após coleta de 2 pares de hemoculturas."
            },
            {
              "drug": "Noradrenalina (Hemitartarato 4 mg/4 mL base)",
              "quantity": "4 ampolas (16 mg) + 234 mL SG 5% (conc. 64 mcg/mL)",
              "directions": "Infundir em BIC iniciando a 0,05–0,1 mcg/kg/min (ex.: 4 a 8 mL/h) e titular para manter PAM >= 65 mmHg."
            }
          ]
        }
      ],
      "orientations": [
        "Dosar lactato arterial/venoso na hora 0 e repetir em 2–4h (meta: clareamento >= 10–20%).",
        "Se necessidade de Noradrenalina >= 0,25–0,5 mcg/kg/min: associar Vasopressina 0,03 UI/min e Hidrocortisona 50 mg IV de 6/6h."
      ]
    }
  },
  {
    "id": "rec-seed-iam",
    "slug": "prescricao-iam-com-supra",
    "title": "Prescrição Inicial — IAM com Supra de ST (Sala de Emergência)",
    "status": "verified",
    "data": {
      "copy_ready": true,
      "routes": [
        {
          "route": "Uso Oral Imediato (Ataque Antiplaquetário)",
          "mode": "standard",
          "items": [
            {
              "drug": "Ácido Acetilsalicílico (AAS) 100 mg",
              "quantity": "3 comprimidos (300 mg)",
              "directions": "Mastigar e engolir imediatamente na chegada."
            },
            {
              "drug": "Ticagrelor 90 mg (2 cp = 180 mg) OU Clopidogrel 75 mg (4 a 8 cp = 300 a 600 mg)",
              "quantity": "Dose de ataque VO",
              "directions": "Em pacientes > 75 anos submetidos à fibrinólise, usar Clopidogrel 75 mg VO sem dose de ataque."
            },
            {
              "drug": "Atorvastatina 40 mg",
              "quantity": "2 comprimidos (80 mg)",
              "directions": "Administrar 80 mg VO em dose única diária."
            }
          ]
        },
        {
          "route": "Uso Parenteral (Anticoagulação)",
          "mode": "standard",
          "items": [
            {
              "drug": "Enoxaparina Sódica",
              "quantity": "30 mg IV em bolus + 1 mg/kg SC 12/12h",
              "directions": "Para pacientes < 75 anos (máx. 100 mg nas 2 primeiras doses SC). Se >= 75 anos: NÃO fazer bolus IV e usar 0,75 mg/kg SC 12/12h."
            }
          ]
        }
      ],
      "orientations": [
        "Evitar nitratos, morfina e diuréticos na presença de infarto de ventrículo direito (supra em DII, DIII, aVF + V3R/V4R) ou uso de sildenafil/tadalafil nas últimas 24–48h.",
        "Acionar Hemodinâmica (meta porta-balão <= 90–120 min) ou preparar Tenecteplase IV (meta porta-agulha <= 10 min)."
      ]
    }
  },
  {
    "id": "rec-seed-sri",
    "slug": "prescricao-sri-intubacao",
    "title": "Kit de Drogas — Intubação em Sequência Rápida (Adulto 70 kg)",
    "status": "verified",
    "data": {
      "copy_ready": true,
      "routes": [
        {
          "route": "Sequência Endovenosa em Bolus (Pré-oxigenar com O2 100% por 3–5 min)",
          "mode": "standard",
          "items": [
            {
              "drug": "1) Pré-tratamento (opcional): Fentanil (50 mcg/mL)",
              "quantity": "3 a 4 mL (150–200 mcg) IV lento",
              "directions": "Administrar 3 minutos antes do indutor se não houver choque/hipotensão."
            },
            {
              "drug": "2) Indução: Cetamina (50 mg/mL) OU Etomidato (2 mg/mL)",
              "quantity": "Cetamina 2,5 mL (125 mg) OU Etomidato 10 mL (20 mg)",
              "directions": "Injetar em bolus IV (1,5–2 mg/kg de Cetamina ou 0,3 mg/kg de Etomidato)."
            },
            {
              "drug": "3) Bloqueio Neuromuscular: Rocurônio (10 mg/mL) OU Succinilcolina (100 mg)",
              "quantity": "Rocurônio 8,5 mL (85 mg) OU Succinilcolina 100 mg (10 mL)",
              "directions": "Injetar em bolus rápido imediatamente após o indutor (aguardar 45–60s para laringoscopia)."
            },
            {
              "drug": "4) Sedoanalgesia Pós-IOT Contínua: Fentanil + Propofol (ou Midazolam)",
              "quantity": "Em bomba de infusão contínua",
              "directions": "Iniciar imediatamente após confirmação capnográfica do tubo."
            }
          ]
        }
      ],
      "orientations": [
        "Manter Noradrenalina preparada ou em curso caso PAS < 100 mmHg ou Índice de Choque >= 0,8 antes da indução."
      ]
    }
  },
  {
    "id": "rec-seed-dengue",
    "slug": "prescricao-dengue-ambulatorial-grupos-ab",
    "title": "Receita Ambulatorial — Dengue (Grupos A e B sem Sinais de Alarme)",
    "status": "verified",
    "data": {
      "copy_ready": true,
      "routes": [
        {
          "route": "Uso Oral (Hidratação e Sintomáticos)",
          "mode": "standard",
          "items": [
            {
              "drug": "Sais para Reidratação Oral (SRO) + Líquidos Caseiros",
              "quantity": "60 mL/kg/dia VO",
              "directions": "Ex.: 70 kg = 4,2 Litros/dia (ingerir 1,4 L de SRO nas primeiras 4 a 6 horas e 2,8 L de água, água de coco, sucos e chás ao longo do dia)."
            },
            {
              "drug": "Dipirona 500 mg (ou 1 g) OU Paracetamol 500 a 750 mg",
              "quantity": "1 comprimido VO",
              "directions": "Tomar de 6 em 6 horas se dor ou febre >= 37,8 °C."
            },
            {
              "drug": "Ondansetrona 4 mg ou 8 mg (ou Metoclopramida 10 mg)",
              "quantity": "1 comprimido VO",
              "directions": "Tomar de 8 em 8 horas se náuseas ou vômitos."
            }
          ]
        }
      ],
      "orientations": [
        "PROIBIDO usar AAS (Aspirina) e anti-inflamatórios (Ibuprofeno, Diclofenaco, Nimesulida, Cetoprofeno, Naproxeno) pelo risco de hemorragia grave.",
        "Retornar IMEDIATAMENTE ao pronto-socorro se surgir qualquer Sinal de Alarme (especialmente quando a febre começar a baixar, entre o 3º e o 7º dia): dor forte e contínua na barriga, vômitos repetidos, tontura/desmaio ao levantar, sangramento de gengiva/nariz ou muita sonolência."
      ]
    }
  },
  {
    "id": "rec-seed-asma",
    "slug": "prescricao-asma-alta-gina",
    "title": "Prescrição de Emergência e Alta — Crise de Asma (GINA)",
    "status": "verified",
    "data": {
      "copy_ready": true,
      "routes": [
        {
          "route": "1ª Hora no Pronto-Socorro",
          "mode": "standard",
          "items": [
            {
              "drug": "Salbutamol spray 100 mcg/jato + Brometo de Ipratrópio 20 mcg/jato",
              "quantity": "Salbutamol 4–10 jatos + Ipratrópio 4–8 jatos com espaçador",
              "directions": "Repetir a cada 20 minutos durante a 1ª hora."
            },
            {
              "drug": "Prednisona 20 mg VO (ou Hidrocortisona 200 mg IV)",
              "quantity": "2 comprimidos e meio (50 mg VO) na 1ª hora",
              "directions": "Se crise grave sem resposta após 1h: associar Sulfato de Magnésio 2 g IV em 100 mL SF 0,9% correr em 20 min."
            }
          ]
        },
        {
          "route": "Receita de Alta Domiciliar",
          "mode": "standard",
          "items": [
            {
              "drug": "Prednisona 20 mg",
              "quantity": "14 comprimidos",
              "directions": "Tomar 2 comprimidos (40 mg) pela manhã, após o café, por 5 a 7 dias."
            },
            {
              "drug": "Budesonida + Formoterol 200/6 mcg (cápsula/pó inalatório)",
              "quantity": "1 frasco",
              "directions": "Inalar 1 a 2 doses de 12 em 12 horas continuamente e 1 dose extra se falta de ar (enxaguar a boca com água após o uso)."
            }
          ]
        }
      ],
      "orientations": [
        "Conferir técnica de uso do dispositivo inalatório antes da alta e agendar reavaliação médica em 2 a 7 dias."
      ]
    }
  },
  {
    "id": "rec-seed-emergencia-hipertensiva",
    "slug": "prescricao-emergencia-hipertensiva",
    "title": "Prescrição Hospitalar — Emergência Hipertensiva e Dissecção Aórtica",
    "status": "verified",
    "data": {
      "copy_ready": true,
      "routes": [
        {
          "route": "Infusão Contínua em Bomba (UTI / Sala Vermelha)",
          "mode": "standard",
          "items": [
            {
              "drug": "Metoprolol (Seloken 5 mg/5 mL) — OBRIGATÓRIO 1º na Dissecção de Aorta",
              "quantity": "5 mg IV lento em 2–5 min",
              "directions": "Repetir a cada 5 min até 15 mg para atingir FC < 60 bpm ANTES de iniciar o vasodilatador."
            },
            {
              "drug": "Nitroprussiato de Sódio (Nipride 50 mg/2 mL)",
              "quantity": "1 ampola (50 mg) + 248 mL SG 5% (conc. 200 mcg/mL)",
              "directions": "Infundir em BIC com equipo fotossensível (0,25 a 10 mcg/kg/min). Iniciar a 5–10 mL/h e titular a cada 3–5 min."
            },
            {
              "drug": "Nitroglicerina (Tridil 50 mg/10 mL) — Preferir em SCA e EAP",
              "quantity": "1 ampola (50 mg) + 240 mL SF 0,9% ou SG 5% (conc. 200 mcg/mL)",
              "directions": "Infundir em BIC (5 a 200 mcg/min). Iniciar a 5 mL/h e titular conforme PA e sintomas."
            }
          ]
        }
      ],
      "orientations": [
        "Na Encefalopatia Hipertensiva: reduzir PAM em no máximo 20–25% na 1ª hora.",
        "Na Dissecção Aguda de Aorta: atingir FC < 60 bpm e PAS 100–120 mmHg nos primeiros 5 a 20 minutos."
      ]
    }
  },
  {
    "id": "rec-seed-eap",
    "slug": "prescricao-edema-agudo-pulmao",
    "title": "Prescrição de Sala Vermelha — Edema Agudo de Pulmão (Perfil B)",
    "status": "verified",
    "data": {
      "copy_ready": true,
      "routes": [
        {
          "route": "Suporte Ventilatório e Terapia Endovenosa Imediata",
          "mode": "standard",
          "items": [
            {
              "drug": "Ventilação Não Invasiva (VNI — CPAP ou BiPAP)",
              "quantity": "CPAP 5 a 10 cmH2O (FiO2 titulada para SpO2 > 92%)",
              "directions": "Instalar imediatamente com paciente sentado com pernas pendentes."
            },
            {
              "drug": "Nitroglicerina (Tridil 50 mg/10 mL) + 240 mL SG 5%",
              "quantity": "Infundir em BIC a 5–10 mL/h (titular até 200 mcg/min)",
              "directions": "Reduzir pré e pós-carga se PAS > 100–110 mmHg."
            },
            {
              "drug": "Furosemida (20 mg/2 mL)",
              "quantity": "2 a 4 ampolas (40 a 80 mg) IV em bolus",
              "directions": "Monitorar diurese (meta > 100–150 mL/h nas primeiras 2h) e potássio/magnésio séricos."
            }
          ]
        }
      ],
      "orientations": [
        "Realizar ECG de 12 derivações e dosar Troponina para afastar IAM como fator desencadeante."
      ]
    }
  },
  {
    "id": "rec-seed-fa-aguda",
    "slug": "prescricao-fa-aguda",
    "title": "Prescrição — Fibrilação Atrial de Alta Resposta Estável",
    "status": "verified",
    "data": {
      "copy_ready": true,
      "routes": [
        {
          "route": "Controle de Frequência Cardíaca (FEVE preservada)",
          "mode": "standard",
          "items": [
            {
              "drug": "Tartarato de Metoprolol (5 mg/5 mL)",
              "quantity": "1 ampola (5 mg) IV lento em 2 a 5 minutos",
              "directions": "Pode repetir a cada 5 minutos até dose máxima de 15 mg (meta FC < 110 bpm)."
            },
            {
              "drug": "Succinato de Metoprolol 50 mg (ou Tartarato 50 mg 12/12h)",
              "quantity": "Uso oral de manutenção após controle",
              "directions": "Iniciar transição oral 1h após o bolus venoso."
            }
          ]
        },
        {
          "route": "Anticoagulação Oral (Se CHA₂DS₂-VASc >= 2 H ou >= 3 M, ou pós-cardioversão)",
          "mode": "alternatives",
          "items": [
            {
              "drug": "Apixabana 5 mg",
              "quantity": "1 comprimido VO de 12 em 12 horas",
              "directions": "Usar 2,5 mg 12/12h se >= 2 critérios: idade >= 80 anos, peso <= 60 kg ou creatinina >= 1,5 mg/dL."
            },
            {
              "drug": "Rivaroxabana 20 mg",
              "quantity": "1 comprimido VO 1x ao dia com o jantar",
              "directions": "Usar 15 mg 1x ao dia se ClCr entre 15 e 49 mL/min."
            }
          ]
        }
      ],
      "orientations": [
        "Não realizar cardioversão química (ex.: Amiodarona/Propafenona) nem elétrica eletiva se FA > 48h ou tempo indeterminado sem Eco Transesofágico prévio ou 3 semanas de anticoagulação."
      ]
    }
  },
  {
    "id": "rec-seed-meningite",
    "slug": "prescricao-meningite-bacteriana",
    "title": "Prescrição Empírica Imediata — Meningite Bacteriana Aguda (Adulto)",
    "status": "verified",
    "data": {
      "copy_ready": true,
      "routes": [
        {
          "route": "Uso Endovenoso (1ª Hora — Precaução por Gotículas)",
          "mode": "standard",
          "items": [
            {
              "drug": "1º) Dexametasona (4 mg/mL)",
              "quantity": "10 mg (2,5 mL) IV de 6 em 6 horas por 4 dias",
              "directions": "Administrar 15 a 20 minutos ANTES ou junto com a 1ª dose do antibiótico."
            },
            {
              "drug": "2º) Ceftriaxona (Dose Meníngea Dobrada)",
              "quantity": "2 g IV de 12 em 12 horas (4 g/dia)",
              "directions": "Diluir em 100 mL SF 0,9% e correr em 30 min."
            },
            {
              "drug": "3º) Ampicilina (Associar se > 50 anos, gestante ou imunossuprimido)",
              "quantity": "2 g IV de 4 em 4 horas (12 g/dia)",
              "directions": "Cobertura obrigatória para Listeria monocytogenes."
            }
          ]
        }
      ],
      "orientations": [
        "Prescrever quimioprofilaxia com Rifampicina 600 mg VO 12/12h por 2 dias (4 doses) para contactantes íntimos nos casos suspeitos de Doença Meningocócica."
      ]
    }
  },
  {
    "id": "rec-seed-pac-ambulatorial",
    "slug": "prescricao-pac-ambulatorial",
    "title": "Prescrição Ambulatorial — Pneumonia Adquirida na Comunidade (CURB-65 0–1)",
    "status": "verified",
    "data": {
      "copy_ready": true,
      "routes": [
        {
          "route": "Opção 1 — Paciente Hígido sem Comorbidades (Uso Oral)",
          "mode": "standard",
          "items": [
            {
              "drug": "Amoxicilina 500 mg (ou Amoxicilina + Clavulanato 875/125 mg)",
              "quantity": "1 caixa",
              "directions": "Tomar 2 comprimidos de 500 mg (1 g) VO de 8 em 8 horas (ou Clavulin BD 875/125 mg 1 cp de 12/12h) por 5 a 7 dias."
            },
            {
              "drug": "Dipirona 1 g",
              "quantity": "1 caixa",
              "directions": "Tomar 1 comprimido VO de 6 em 6 horas se dor ou febre >= 37,8°C."
            }
          ]
        },
        {
          "route": "Opção 2 — Paciente COM Comorbidades (DPOC, IC, DM, DRC) ou ATB nos últimos 90 dias",
          "mode": "alternatives",
          "items": [
            {
              "drug": "Amoxicilina + Clavulanato 875/125 mg + Azitromicina 500 mg",
              "quantity": "Tratamento Combinado (5–7 dias)",
              "directions": "Tomar Amoxicilina+Clavulanato 875/125 mg VO de 12/12h por 7 dias ASSOCIADO a Azitromicina 500 mg 1 cp VO 1x/dia por 5 dias."
            },
            {
              "drug": "Levofloxacino 750 mg (Alternativa em Monoterapia ou Alergia a Beta-lactâmico)",
              "quantity": "5 comprimidos",
              "directions": "Tomar 1 comprimido (750 mg) VO 1x ao dia por 5 dias."
            }
          ]
        }
      ],
      "orientations": [
        "Reavaliar em 48 a 72 horas. Retornar imediatamente ao Pronto-Socorro se surgir falta de ar (dispneia), sonolência, cianose, vômitos ou persistência da febre após 72 horas de antibiótico."
      ]
    }
  },
  {
    "id": "rec-seed-pac-hospitalar",
    "slug": "prescricao-pac-hospitalar",
    "title": "Prescrição de Enfermaria — Pneumonia Adquirida na Comunidade (CURB-65 >= 2)",
    "status": "verified",
    "data": {
      "copy_ready": true,
      "routes": [
        {
          "route": "Uso Endovenoso / Oral Hospitalar",
          "mode": "standard",
          "items": [
            {
              "drug": "Ceftriaxona 1 g",
              "quantity": "1 g a 2 g IV a cada 24 horas",
              "directions": "Diluir em 100 mL de SF 0,9% e infundir em 30 minutos (não diluir em Ringer Lactato)."
            },
            {
              "drug": "Azitromicina 500 mg (VO ou IV) OU Claritromicina 500 mg (12/12h)",
              "quantity": "500 mg 1x ao dia por 3 a 5 dias",
              "directions": "Cobertura obrigatória para germes atípicos."
            },
            {
              "drug": "Enoxaparina 40 mg SC 1x/dia",
              "quantity": "Tromboprofilaxia farmacológica",
              "directions": "Ajustar para 20 mg SC 1x/dia ou HNF 5.000 UI SC 8/8h se ClCr < 30 mL/min."
            }
          ]
        }
      ],
      "orientations": [
        "Manter SpO2 >= 92% (ou 88–92% se DPOC retentor crônico). Se houver derrame pleural >= 1 cm no decúbito lateral, realizar toracocentese diagnóstica (pH, glicose, LDH, celularidade e cultura)."
      ]
    }
  },
  {
    "id": "rec-seed-dpoc-exacerbado",
    "slug": "prescricao-dpoc-exacerbado",
    "title": "Prescrição — Exacerbação Aguda de DPOC (GOLD 2024)",
    "status": "verified",
    "data": {
      "copy_ready": true,
      "routes": [
        {
          "route": "Terapia Broncodilatadora, Corticoterapia e Antibiótico",
          "mode": "standard",
          "items": [
            {
              "drug": "Salbutamol (100 mcg/jato) + Brometo de Ipratrópio (20 mcg/jato ou 40 gotas)",
              "quantity": "Uso Inalatório",
              "directions": "4 a 8 jatos de cada com espaçador (ou nebulizar 10–20 gotas de Salbutamol + 40 gotas de Ipratrópio em 4 mL SF 0,9% em AR COMPRIMIDO) de 4/4h."
            },
            {
              "drug": "Prednisona 20 mg (ou Hidrocortisona 200 mg IV se intolerância oral)",
              "quantity": "40 mg/dia por 5 dias",
              "directions": "Tomar 2 comprimidos (40 mg) VO pela manhã por exatos 5 dias (não necessita de desmame)."
            },
            {
              "drug": "Amoxicilina + Clavulanato 875/125 mg (Se escarro purulento!)",
              "quantity": "1 comprimido VO de 12/12h por 5 dias",
              "directions": "Indicado na presença de aumento da purulência do escarro ou necessidade de VNI/VM."
            }
          ]
        }
      ],
      "orientations": [
        "Titular O2 suplementar para meta estrita de SpO2 entre 88% e 92%. Se gasometria arterial mostrar pH <= 7,35 e PaCO2 > 45 mmHg, instalar VNI (BiPAP) imediatamente."
      ]
    }
  },
  {
    "id": "rec-seed-cistite",
    "slug": "prescricao-cistite-aguda",
    "title": "Prescrição Ambulatorial — Cistite Aguda Não Complicada (ITU Baixa)",
    "status": "verified",
    "data": {
      "copy_ready": true,
      "routes": [
        {
          "route": "Opções de 1ª Linha (Escolher 1 opção — Uso Oral)",
          "mode": "alternatives",
          "items": [
            {
              "drug": "Opção A (Dose Única): Fosfomicina Trometamol 3 g (Monuril)",
              "quantity": "1 envelope (8 g de granulado = 3 g de fosfomicina)",
              "directions": "Dissolver o conteúdo de 1 envelope em meio copo de água e tomar em DOSE ÚNICA à noite ao deitar, após esvaziar completamente a bexiga."
            },
            {
              "drug": "Opção B (5 Dias): Nitrofurantoína 100 mg (Macrodantina)",
              "quantity": "20 cápsulas",
              "directions": "Tomar 1 cápsula (100 mg) VO de 6 em 6 horas (junto com alimentos) por 5 dias (em gestantes, manter por 7 dias)."
            }
          ]
        },
        {
          "route": "Analgesia Urinária Sintomática (Opcional por 48h)",
          "mode": "standard",
          "items": [
            {
              "drug": "Fenazopiridina 200 mg (Pyridium)",
              "quantity": "6 comprimidos",
              "directions": "Tomar 1 comprimido VO de 8 em 8 horas após as refeições por apenas 2 dias para alívio da disúria intensa (avisar que deixa a urina laranja-avermelhada!)."
            }
          ]
        }
      ],
      "orientations": [
        "Aumentar a ingesta hídrica e não postergar as micções. Retornar imediatamente se surgir febre (>= 38°C), calafrios, dor lombar ou vômitos."
      ]
    }
  },
  {
    "id": "rec-seed-pielonefrite",
    "slug": "prescricao-pielonefrite-aguda",
    "title": "Prescrição — Pielonefrite Aguda Não Complicada (PS + Alta)",
    "status": "verified",
    "data": {
      "copy_ready": true,
      "routes": [
        {
          "route": "1ª Dose Parenteral no Pronto-Socorro (Após Coleta de Urocultura!)",
          "mode": "standard",
          "items": [
            {
              "drug": "Ceftriaxona 1 g",
              "quantity": "1 frasco-ampola IV ou IM em dose única no PS",
              "directions": "Administrar imediatamente após a coleta de EAS e Urocultura com antibiograma."
            },
            {
              "drug": "Dipirona 1 g IV + Ondansetrona 4 a 8 mg IV",
              "quantity": "Dose sintomática",
              "directions": "Controle imediato de febre, dor lombar e náuseas."
            }
          ]
        },
        {
          "route": "Manutenção Ambulatorial (Via Oral)",
          "mode": "alternatives",
          "items": [
            {
              "drug": "Ciprofloxacino 500 mg",
              "quantity": "14 comprimidos",
              "directions": "Tomar 1 comprimido (500 mg) VO de 12 em 12 horas por 7 dias (afastar 2h de leite, cálcio ou antiácidos)."
            },
            {
              "drug": "Levofloxacino 750 mg",
              "quantity": "5 comprimidos",
              "directions": "Tomar 1 comprimido (750 mg) VO 1x ao dia por 5 dias."
            }
          ]
        }
      ],
      "orientations": [
        "Checar o resultado da urocultura e antibiograma em 48–72 horas para ajuste guiado. Se persistir febre após 72h de antibiótico ou houver história de cálculo renal, realizar TC/USG de urgência para afastar Pionefrose."
      ]
    }
  },
  {
    "id": "rec-seed-colica-nefritica",
    "slug": "prescricao-colica-nefritica-alta",
    "title": "Prescrição de Sala de Medicação e Alta — Cólica Nefrítica / Cálculo Ureteral",
    "status": "verified",
    "data": {
      "copy_ready": true,
      "routes": [
        {
          "route": "1. Analgesia Endovenosa Imediata no Pronto-Socorro",
          "mode": "standard",
          "items": [
            {
              "drug": "Cetoprofeno 100 mg IV + Dipirona 1 g a 2 g IV + Ondansetrona 8 mg IV",
              "quantity": "Diluir o Cetoprofeno em 100 mL de SF 0,9% e correr em 20 min",
              "directions": "Se dor intensa refratária após 20–30 min: titular Morfina 2 a 4 mg IV lento."
            }
          ]
        },
        {
          "route": "2. Prescrição de Alta (Terapia Médica Expulsiva para Cálculos de 5 a 10 mm)",
          "mode": "standard",
          "items": [
            {
              "drug": "Cloridrato de Tansulosina 0,4 mg",
              "quantity": "1 caixa (30 cápsulas)",
              "directions": "Tomar 1 cápsula (0,4 mg) VO 1x ao dia (30 min após o jantar, antes de deitar) por até 28 dias ou até expelir o cálculo."
            },
            {
              "drug": "Cetoprofeno 100 mg (ou Diclofenaco 50 mg)",
              "quantity": "1 caixa",
              "directions": "Tomar 1 comprimido VO de 12 em 12 horas após as refeições por 3 a 5 dias."
            },
            {
              "drug": "Dipirona 1 g",
              "quantity": "1 caixa",
              "directions": "Tomar 1 comprimido VO de 6 em 6 horas se dor."
            }
          ]
        }
      ],
      "orientations": [
        "ALERTA DE RETORNO IMEDIATO: Retornar imediatamente à Emergência se apresentar FEBRE (>= 37,8°C), calafrios, parada de eliminação de urina ou dor intratável."
      ]
    }
  },
  {
    "id": "rec-seed-abstinencia",
    "slug": "prescricao-abstinencia-alcoolica",
    "title": "Prescrição Hospitalar — Síndrome de Abstinência Alcoólica e Prevenção de Wernicke",
    "status": "verified",
    "data": {
      "copy_ready": true,
      "routes": [
        {
          "route": "Reposição Vitamínica/Eletrolítica e Controle GABAérgico",
          "mode": "standard",
          "items": [
            {
              "drug": "1º) Tiamina (Vitamina B1 — Ampola 100 mg/mL)",
              "quantity": "200 a 500 mg IV ou IM de 8/8h por 3 a 5 dias",
              "directions": "ADMINISTRAR OBRIGATORIAMENTE ANTES DE QUALQUER SOLUÇÃO GLICOSADA (Diluir em 100 mL de SF 0,9% e correr em 30 min)!"
            },
            {
              "drug": "2º) Diazepam 10 mg VO (ou 5–10 mg IV lento puro) — Se hepatopata Child B/C: usar Lorazepam 2–4 mg VO",
              "quantity": "Guiado por sintomas (CIWA-Ar >= 8)",
              "directions": "Reavaliar CIWA-Ar a cada 1 hora e repetir 10 a 20 mg de Diazepam até sedação leve/calma (RASS 0 a -1)."
            },
            {
              "drug": "3º) Sulfato de Magnésio 50% (1 ampola = 5 g = 10 mL) ou 10% (2 ampolas = 2 g)",
              "quantity": "2 g diluídos em 100 mL SF 0,9% IV em 1 hora",
              "directions": "Corrigir hipomagnesemia e hipocalemia concomitantes."
            }
          ]
        }
      ],
      "orientations": [
        "Nunca usar Fenitoína para crises de abstinência alcoólica e nunca usar Haloperidol em monoterapia sem benzodiazepínico."
      ]
    }
  },
  {
    "id": "rec-seed-hipercalemia",
    "slug": "prescricao-hipercalemia-emergencia",
    "title": "Prescrição de Emergência — Hipercalemia Grave com Alteração de ECG",
    "status": "verified",
    "data": {
      "copy_ready": true,
      "routes": [
        {
          "route": "1. Estabilização Imediata de Membrana Cardíaca",
          "mode": "standard",
          "items": [
            {
              "drug": "Gluconato de Cálcio 10% (1 ampola = 10 mL = 1 g)",
              "quantity": "1 ampola IV em bolus",
              "directions": "Infundir em 2 a 5 minutos sob monitorização eletrocardiográfica contínua. Pode repetir em 5 a 10 minutos se o ECG permanecer alterado."
            }
          ]
        },
        {
          "route": "2. Medidas de Redistribuição Intracelular (Shift)",
          "mode": "standard",
          "items": [
            {
              "drug": "Solução Polarizante: Insulina Regular 10 UI + Glicose 50% 100 mL (50 g de glicose)",
              "quantity": "Infundir IV em 20 a 30 minutos",
              "directions": "Monitore a glicemia capilar a cada 30–60 minutos para evitar hipoglicemia reativa."
            },
            {
              "drug": "Inalação com Beta-2 Agonista: Fenoterol (Berotec) 10 a 20 gotas (ou Salbutamol 5 mg) em 3 a 5 mL de SF 0,9%",
              "quantity": "Nebulizar durante 10 a 15 minutos",
              "directions": "Pode ser repetida em 2 horas se necessário (cautela se taquicardia prévia ou coronariopatia grave)."
            }
          ]
        },
        {
          "route": "3. Medidas de Espoliação / Eliminação Corporal de Potássio",
          "mode": "standard",
          "items": [
            {
              "drug": "Furosemida 20 mg/2 mL (Ampola)",
              "quantity": "2 a 4 ampolas (40 a 80 mg) IV em bolus",
              "directions": "Indicado se paciente normovolêmico/hipervolêmico com diurese preservada."
            },
            {
              "drug": "Poliestirenossulfonato de Cálcio (Sorcal) 30 g",
              "quantity": "Diluir em 100 mL de água VO",
              "directions": "Tomar por via oral de 6 em 6 horas (resina de troca de ação lenta; não utilizar para resgate hiperagudo isolado)."
            }
          ]
        }
      ],
      "orientations": [
        "Repetir dosagem sérica de Potássio e ECG em 1 a 2 horas após início das medidas. Se persistir K+ > 6,5 mEq/L ou onda senoidal refratária, solicitar vaga imediata de hemodiálise de urgência."
      ]
    }
  },
  {
    "id": "rec-seed-hipoglicemia",
    "slug": "prescricao-hipoglicemia-grave",
    "title": "Prescrição de Sala de Emergência — Hipoglicemia Grave e Reversão",
    "status": "verified",
    "data": {
      "copy_ready": true,
      "routes": [
        {
          "route": "1. Fase de Resgate Imediato (Paciente Inconsciente ou em Jejum)",
          "mode": "standard",
          "items": [
            {
              "drug": "Glicose 50% (Ampolas de 10 mL ou frascos)",
              "quantity": "4 a 5 ampolas (40 a 50 mL = 20 a 25 g de glicose pura) IV direto",
              "directions": "Infundir em bolus lento de 3 a 5 minutos em acesso venoso periférico calibroso verificado."
            },
            {
              "drug": "Tiamina 100 mg (Vitamina B1) — SE paciente etilista crônico, desnutrido ou caquético",
              "quantity": "1 ampola (100 mg) IV ou IM",
              "directions": "Fazer concomitantemente ou antes da glicose para prevenção de Encefalopatia de Wernicke."
            }
          ]
        },
        {
          "route": "2. Fase de Manutenção / Prevenção de Nova Queda Glicêmica",
          "mode": "standard",
          "items": [
            {
              "drug": "Soro Glicosado 10% (Frasco de 500 mL) ou SG 5% com 4 ampolas de Glicose 50%",
              "quantity": "Correr a 60 a 100 mL/hora em bomba de infusão ou equipo de microgotas",
              "directions": "Manter infusão contínua caso a causa tenha sido hipoglicemiante oral (Glibenclamida) ou insulina de ação prolongada."
            }
          ]
        }
      ],
      "orientations": [
        "Verificar glicemia capilar a cada 15 minutos até atingir >= 70 mg/dL e alívio dos sintomas neurológicos. Logo que acordado e consciente, ofertar refeição sólida com carboidratos complexos (pão, biscoito) e proteína."
      ]
    }
  },
  {
    "id": "rec-seed-avc-isquemico",
    "slug": "prescricao-avc-isquemico",
    "title": "Prescrição de Urgência — AVC Isquêmico Agudo e Trombólise (rt-PA)",
    "status": "verified",
    "data": {
      "copy_ready": true,
      "routes": [
        {
          "route": "Uso Endovenoso Exclusivo (Trombolítico e Controle Pressórico)",
          "mode": "standard",
          "items": [
            {
              "drug": "Alteplase (rt-PA) 0,9 mg/kg (Dose máxima: 90 mg)",
              "quantity": "1 a 2 frascos de 50 mg",
              "directions": "Calcular 0,9 mg/kg de peso real. Administrar 10% da dose total em bolus IV direto em 1 minuto; infundir os 90% restantes por via endovenosa em bomba de infusão contínua em 60 minutos. Monitorar sinais vitais e NIHSS a cada 15 min."
            },
            {
              "drug": "Nitroprussiato de Sódio 50 mg + 250 mL de SG 5%",
              "quantity": "1 frasco de 250 mL",
              "directions": "Iniciar se PAS >= 185 mmHg ou PAD >= 110 mmHg pré-trombólise ou se PA >= 180/105 mmHg pós-trombólise. Titular em BIC de 0,5 a 5 mcg/kg/min para manter rigorosamente PA < 180/105 mmHg nas primeiras 24 horas."
            }
          ]
        },
        {
          "route": "Uso Oral / SNE (Apenas após 24 horas de término do rt-PA e TC de controle sem sangramento)",
          "mode": "standard",
          "items": [
            {
              "drug": "Ácido Acetilsalicílico (AAS) 100 mg a 200 mg",
              "quantity": "1 a 2 comprimidos ao dia",
              "directions": "Iniciar somente após completar 24 horas da infusão do trombolítico e confirmação por TC de crânio de ausência de hemorragia cerebral."
            },
            {
              "drug": "Atorvastatina 80 mg",
              "quantity": "1 comprimido à noite",
              "directions": "Estatina de alta potência iniciada precocemente no internamento para estabilização de placa aterosclerótica e neuroproteção."
            }
          ]
        }
      ],
      "orientations": [
        "Jejum absoluto e cabeceira a 0 grau nas primeiras horas (se tolerado sem refluxo/vômito) para otimizar perfusão cerebral.",
        "Não realizar punção arterial, passagem de sonda vesical de demora ou cateter venoso central nas primeiras 24 horas após rt-PA salvo emergência absoluta.",
        "TC de crânio urgente imediata se houver cefaleia súbita, náuseas com vômitos ou queda de >= 4 pontos no escore NIHSS."
      ]
    }
  },
  {
    "id": "rec-seed-cad",
    "slug": "prescricao-cad",
    "title": "Prescrição Hospitalar — Cetoacidose Diabética (CAD / EHH)",
    "status": "verified",
    "data": {
      "copy_ready": true,
      "routes": [
        {
          "route": "Uso Endovenoso Contínuo (Insulina e Hidratação)",
          "mode": "standard",
          "items": [
            {
              "drug": "Soro Fisiológico 0,9% (Cloreto de Sódio 0,9%) 1.000 mL",
              "quantity": "1.000 mL na 1ª hora",
              "directions": "Infundir 1.000 mL IV rápido na primeira hora. A seguir, manter 250 a 500 mL/h avaliando sódio corrigido e volemia."
            },
            {
              "drug": "Insulina Regular 100 UI em 100 mL de SF 0,9% (1 UI/mL)",
              "quantity": "1 frasco para BIC contínua",
              "directions": "Desprezar os primeiros 20 mL no equipo (adsorção ao plástico). Iniciar infusão em bomba a 0,1 UI/kg/h (ou 0,14 UI/kg/h sem bolus). Meta de queda da glicemia: 50 a 70 mg/dL por hora. Não iniciar se K+ < 3,3 mEq/L."
            },
            {
              "drug": "Cloreto de Potássio 19,1% (KCl 19,1% — 2,56 mEq/mL)",
              "quantity": "1 ampola (10 mL = 25,6 mEq)",
              "directions": "Adicionar 20 a 30 mEq de KCl para cada litro de solução de hidratação se K+ sérico entre 3,3 e 5,2 mEq/L para manter K+ entre 4,0 e 5,0 mEq/L."
            }
          ]
        },
        {
          "route": "Fase de Manutenção (Glicemia atinge 200–250 mg/dL)",
          "mode": "standard",
          "items": [
            {
              "drug": "Soro Glicosado 5% + SF 0,9% (1:1) com KCl 20 mEq/L",
              "quantity": "500 a 1000 mL a 150–250 mL/h",
              "directions": "Adicionar glicose assim que a glicemia capilar atingir 200–250 mg/dL na CAD (ou 250–300 mg/dL no EHH), mantendo a insulina em taxa de 0,02 a 0,05 UI/kg/h para fechar o ânion gap sem hipoglicemia."
            }
          ]
        }
      ],
      "orientations": [
        "Glicemia capilar de 1 em 1 hora; eletrólitos (K+, Na+), gasometria venosa e ânion gap a cada 2 a 4 horas.",
        "Critérios de resolução: Glicemia < 200 mg/dL + 2 critérios: HCO3 >= 18 mEq/L, pH venoso > 7,30 e ânion gap <= 12.",
        "Aplicar insulina basal SC (NPH ou Glargina) 2 horas ANTES de suspender a infusão contínua de insulina endovenosa."
      ]
    }
  },
  {
    "id": "rec-seed-anafilaxia",
    "slug": "prescricao-anafilaxia",
    "title": "Prescrição de Emergência — Anafilaxia e Choque Anafilático",
    "status": "verified",
    "data": {
      "copy_ready": true,
      "routes": [
        {
          "route": "Uso Intramuscular Imediato (Droga de 1ª Linha Salva-Vidas)",
          "mode": "standard",
          "items": [
            {
              "drug": "Adrenalina (Epinefrina) 1:1.000 (1 mg/mL)",
              "quantity": "1 ampola (0,5 mL = 0,5 mg)",
              "directions": "Aplicar 0,5 mg (0,5 mL) via intramuscular profunda na face anterolateral da coxa (vasto lateral) IMEDIATAMENTE. Dose pediátrica: 0,01 mg/kg (máx 0,3 mg). Repetir a cada 5 a 15 minutos se não houver melhora clínica."
            }
          ]
        },
        {
          "route": "Uso Endovenoso (Expansão e Medicamentos Adjuvantes de 2ª Linha)",
          "mode": "standard",
          "items": [
            {
              "drug": "Ringer Lactato ou Soro Fisiológico 0,9% 1.000 mL",
              "quantity": "1.000 a 2.000 mL rápido",
              "directions": "Infundir 20 mL/kg de cristaloide sob pressão em bolus rápido se hipotensão ou choque anafilático."
            },
            {
              "drug": "Difenidramina 50 mg IV (ou Prometazina 25 a 50 mg IM/IV lento)",
              "quantity": "1 ampola",
              "directions": "Anti-histamínico H1 para alívio de prurido, urticária e sintomas cutâneos (não reverte colapso respiratório ou choque)."
            },
            {
              "drug": "Hidrocortisona 200 mg a 500 mg IV (ou Metilprednisolona 125 mg IV)",
              "quantity": "1 frasco-ampola",
              "directions": "Corticosteroide sistêmico para prevenção de sintomas prolongados e reação anafilática bifásica."
            }
          ]
        },
        {
          "route": "Uso Inalatório (Se broncoespasmo / sibilos)",
          "mode": "standard",
          "items": [
            {
              "drug": "Salbutamol 5 mg/mL (10 a 20 gotas em 4 mL de SF 0,9%)",
              "quantity": "Nebulização contínua com O2 a 6-8 L/min",
              "directions": "Nebulizar a cada 20 minutos nas primeiras horas se tosse, chiado ou desconforto respiratório associado."
            }
          ]
        }
      ],
      "orientations": [
        "Paciente em decúbito dorsal horizontal com membros inferiores elevados (posição de choque); NUNCA colocar o paciente em pé ou sentado abruptamente (risco de colapso de retorno venoso e PCR súbita).",
        "Oxigênio suplementar em máscara com reservatório a 10–15 L/min se dispneia ou SpO2 < 94%.",
        "Observação hospitalar obrigatória por no mínimo 6 a 12 horas pós-crise devido ao risco de anafilaxia bifásica."
      ]
    }
  },
  {
    "id": "rec-seed-eme",
    "slug": "prescricao-eme",
    "title": "Prescrição de Emergência — Estado de Mal Epiléptico Convulsivo (EME)",
    "status": "verified",
    "data": {
      "copy_ready": true,
      "routes": [
        {
          "route": "Fase 1 (0 a 5–10 min) — Benzodiazepínico de Ação Rápida",
          "mode": "alternatives",
          "items": [
            {
              "drug": "Midazolam 10 mg (2 mL da solução 5 mg/mL) via Intramuscular (IM)",
              "quantity": "1 ampola",
              "directions": "1ª OPÇÃO se sem acesso venoso: aplicar 10 mg IM no vasto lateral ou deltoide (se paciente < 40 kg, aplicar 5 mg IM). Pode repetir em 10 min se persistir."
            },
            {
              "drug": "Diazepam 10 mg (2 mL da solução 5 mg/mL) via Endovenosa (IV) pura",
              "quantity": "1 ampola",
              "directions": "2ª OPÇÃO se com acesso venoso: aplicar 10 mg IV puro em bolus lento (2 a 5 mg/min). Pode repetir mais 10 mg em 5 a 10 min se crises persistirem."
            }
          ]
        },
        {
          "route": "Fase 2 (10 a 30 min) — Droga Antiepiléptica de Segunda Linha",
          "mode": "alternatives",
          "items": [
            {
              "drug": "Fenitoína Sódica 20 mg/kg em 250 mL de SF 0,9% (Ex.: 70 kg = 1.400 mg = 28 ampolas de 50 mg/mL)",
              "quantity": "Dose de ataque 20 mg/kg",
              "directions": "1ª OPÇÃO clássica: infundir em veia calibrosa a no máximo 50 mg/minuto sob monitorização contínua de ECG e PA (risco de bradiarritmias e hipotensão grave). NUNCA diluir em glicose (precipita!)."
            },
            {
              "drug": "Levetiracetam (Keppra) 60 mg/kg (Dose máxima: 4.500 mg) em 100 mL de SF 0,9%",
              "quantity": "Dose de ataque 60 mg/kg",
              "directions": "2ª OPÇÃO moderna: infundir por via endovenosa em 10 a 15 minutos. Excelente perfil de tolerabilidade hemodinâmica sem risco de arritmias."
            }
          ]
        }
      ],
      "orientations": [
        "Abertura de vias aéreas com manobra de elevação do queixo, aspiração de secreções e oferta de O2 em máscara a 10-15 L/min.",
        "Glicemia capilar imediata à beira-leito (se < 70 mg/dL, infundir Glicose 50% 40 mL IV + Tiamina 100 mg).",
        "Se convulsão persistir após 30 minutos (Fase 3 / EME Refratário): intubação orotraqueal em sequência rápida e início de anestésico contínuo em BIC (Midazolam, Propofol ou Cetamina) em leito de UTI."
      ]
    }
  },
  {
    "id": "rec-seed-preeclampsia",
    "slug": "prescricao-preeclampsia",
    "title": "Prescrição Obstétrica — Pré-Eclâmpsia Grave e Prevenção de Eclâmpsia",
    "status": "verified",
    "data": {
      "copy_ready": true,
      "routes": [
        {
          "route": "Prevenção e Tratamento de Convulsões Eclâmpticas (Sulfato de Magnésio)",
          "mode": "alternatives",
          "items": [
            {
              "drug": "Sulfato de Magnésio 50% — Esquema Zuspan (IV exclusivo)",
              "quantity": "Ataque: 4 g IV (8 mL de MgSO4 50% + 12 mL de SF 0,9%) em 20 min | Manutenção: 1 a 2 g/h em BIC",
              "directions": "Ataque de 4 g IV lento em 20 min. Manutenção: 10 g (20 mL a 50%) em 480 mL de SG 5% a 50–100 mL/h (1 a 2 g/h) por 24h pós-parto."
            },
            {
              "drug": "Sulfato de Magnésio 50% — Esquema Pritchard (IV + IM)",
              "quantity": "Ataque: 4 g IV lento em 20 min + 10 g IM profundo (5 g em cada glúteo)",
              "directions": "Manutenção: 5 g IM profundo a cada 4 horas no glúteo alternado se reflexo patelar presente e diurese >= 25 mL/h."
            }
          ]
        },
        {
          "route": "Anti-hipertensivo de Resgate na Crise (PAS >= 160 ou PAD >= 110 mmHg)",
          "mode": "alternatives",
          "items": [
            {
              "drug": "Hidralazina 5 mg IV lento (diluir 1 ampola 20 mg/mL em 19 mL de SF -> 1 mg/mL; aplicar 5 mL)",
              "quantity": "5 mg IV em bolus",
              "directions": "1ª OPÇÃO IV: aplicar em 2 minutos. Se PA mantiver >= 160/110 após 20 minutos, repetir 5 a 10 mg IV (máx 20 mg)."
            },
            {
              "drug": "Nifedipino cápsula ou comp. 10 mg a 20 mg VO (não sublingual!)",
              "quantity": "1 comprimido via oral",
              "directions": "2ª OPÇÃO oral: engolir com água (nunca mastigar ou usar SL). Repetir em 30 min se persistir PAS >= 160 ou PAD >= 110 (máx 60 mg)."
            }
          ]
        }
      ],
      "orientations": [
        "Vigilância horária mandatória da toxicidade do magnésio: reflexo patelar presente, FR >= 16 irpm e débito urinário >= 25 mL/h em sonda vesical.",
        "Manter ampola de Gluconato de Cálcio 10% 10 mL à beira-leito; infundir IV lento em 3 min se ausência de reflexo patelar ou depressão respiratória.",
        "Monitorização contínua de frequência cardíaca fetal e tônus uterino (avaliar DPP)."
      ]
    }
  },
  {
    "id": "rec-seed-hda",
    "slug": "prescricao-hda",
    "title": "Prescrição Hospitalar — Hemorragia Digestiva Alta (HDA Grave)",
    "status": "verified",
    "data": {
      "copy_ready": true,
      "routes": [
        {
          "route": "Uso Endovenoso (Bloqueio Ácido, Vasoativos e Antibioticoterapia)",
          "mode": "standard",
          "items": [
            {
              "drug": "Omeprazol 40 mg pó liofilizado (ou Pantoprazol 40 mg)",
              "quantity": "2 frascos IV em bolus (80 mg)",
              "directions": "Infundir 80 mg IV em bolus inicial lento. A seguir, prescrever infusão contínua em BIC a 8 mg/h (160 mg em 200 mL de SF 0,9% a 10 mL/h) ou 40 mg IV 12/12h por 72 horas."
            },
            {
              "drug": "Terlipressina 2 mg pó injetável IV (ou Octreotide 50 mcg IV)",
              "quantity": "2 mg IV em bolus",
              "directions": "Se suspeita de hipertensão portal / cirrose: 2 mg IV de 4 em 4 horas nas primeiras 48 horas (depois 1 mg 4/4h por mais 3 dias). Se indisponível, Octreotide 50 mcg bolus + 50 mcg/h contínuo."
            },
            {
              "drug": "Ceftriaxona 1 g pó injetável IV",
              "quantity": "1 frasco ao dia",
              "directions": "Infundir 1 g IV a cada 24 horas por 7 dias em todos os pacientes cirróticos com HDA (profilaxia de peritonite bacteriana espontânea e translocação bacteriana)."
            }
          ]
        }
      ],
      "orientations": [
        "Transfusão restritiva de Concentrado de Hemácias: indicar se Hb < 7,0 g/dL com alvo de Hb 7,0 a 8,0 g/dL (transfusão excessiva eleva pressão portal e piora ressangramento).",
        "Dois acessos venosos periféricos calibrosos (14G ou 16G) e ressuscitação volêmica prudente com Ringer Lactato.",
        "Programar Endoscopia Digestiva Alta (EDA) de urgência dentro das primeiras 12 a 24 horas de internamento."
      ]
    }
  },
  {
    "id": "rec-seed-tep",
    "slug": "prescricao-tep",
    "title": "Prescrição Hospitalar — Tromboembolismo Pulmonar Agudo (TEP)",
    "status": "verified",
    "data": {
      "copy_ready": true,
      "routes": [
        {
          "route": "Uso Subcutâneo / Endovenoso (Anticoagulação Plena)",
          "mode": "alternatives",
          "items": [
            {
              "drug": "Enoxaparina Sódica 1 mg/kg via Subcutânea (SC) de 12/12h",
              "quantity": "Ex.: 70 kg = 70 mg (0,7 mL) SC 12/12h",
              "directions": "1ª ESCOLHA no paciente estável com função renal preservada (ClCr >= 30 mL/min). Se ClCr < 30 mL/min, usar 1 mg/kg em dose única diária (24/24h) ou preferir HNF."
            },
            {
              "drug": "Heparina Não Fracionada (HNF) 80 UI/kg em bolus IV + 18 UI/kg/h em BIC",
              "quantity": "1 frasco-ampola 5.000 UI/mL",
              "directions": "2ª ESCOLHA prioritária se TEP instável (candidato a trombólise) ou ClCr < 30 mL/min. Titular velocidade horária para alvo de TTPa entre 1,5 e 2,5 vezes o controle."
            }
          ]
        },
        {
          "route": "Trombólise Sistêmica de Emergência (TEP com Choque / Parada Cardíaca)",
          "mode": "standard",
          "items": [
            {
              "drug": "Alteplase (rt-PA) 100 mg em 250 mL de SF 0,9%",
              "quantity": "2 frascos de 50 mg",
              "directions": "Infundir 100 mg IV contínuo em 2 horas em bomba de infusão se choque hemodinâmico obstrutivo (PAS < 90 mmHg persistente). Se PCR em andamento, infundir 50 mg IV em bolus rápido em 15 minutos."
            }
          ]
        }
      ],
      "orientations": [
        "Oxigenoterapia para manter SpO2 >= 90%. Evitar hidratação vigorosa com cristaloides (sobrecarga e falência aguda de ventrículo direito).",
        "Repouso relativo no leito nas primeiras 24 horas até início de anticoagulação efetiva.",
        "Ecocardiograma transtorácico de urgência para avaliação de sobrecarga de VD (relação VD/VE > 1,0 e TAPSE < 16 mm)."
      ]
    }
  },
  {
    "id": "rec-seed-pancreatite",
    "slug": "prescricao-pancreatite",
    "title": "Prescrição de Enfermaria — Pancreatite Aguda Leve a Moderada",
    "status": "verified",
    "data": {
      "copy_ready": true,
      "routes": [
        {
          "route": "Uso Endovenoso (Hidratação por Metas e Analgesia Escalonada)",
          "mode": "standard",
          "items": [
            {
              "drug": "Ringer Lactato 1.000 mL",
              "quantity": "200 a 250 mL/h nas primeiras 24h",
              "directions": "Hidratação orientada por metas com Ringer Lactato (superior ao SF 0,9% por menor risco de acidose hiperclorêmica). Titular para diurese > 0,5 mL/kg/h e hematócrito estável."
            },
            {
              "drug": "Dipirona 1 g IV diluída em 100 mL de SF 0,9%",
              "quantity": "1 g IV de 6 em 6 horas fixo",
              "directions": "Analgesia de base; infundir em 15 a 20 minutos."
            },
            {
              "drug": "Tramadol 50 mg a 100 mg IV diluído em 100 mL de SF 0,9%",
              "quantity": "50 a 100 mg IV até de 8/8h se dor",
              "directions": "Opioide fraco para dor refratária à dipirona. Se dor intensa persistente, escalonar para Morfina 2 a 4 mg IV (segura na pancreatite)."
            },
            {
              "drug": "Ondansetrona 8 mg IV puro ou diluído",
              "quantity": "8 mg IV de 8 em 8 horas se náusea",
              "directions": "Antiemético para controle de náuseas e alívio do íleo adinâmico."
            }
          ]
        }
      ],
      "orientations": [
        "Dieta oral suspensa inicialmente; reiniciar precocemente com dieta líquida/pastosa hipolipídica assim que dor abdominal ceder e ruídos hidroaéreos retornarem.",
        "Antibioticoprofilaxia de rotina é CONTRAINDICADA mesmo em pancreatite necrotizante.",
        "Ultrassonografia de abdome total nas primeiras 24 a 48h para confirmar ou afastar litíase biliar."
      ]
    }
  },
  {
    "id": "rec-seed-pele",
    "slug": "prescricao-pele",
    "title": "Prescrição — Infecções de Pele e Partes Moles (Celulite / Erisipela)",
    "status": "verified",
    "data": {
      "copy_ready": true,
      "routes": [
        {
          "route": "Tratamento Ambulatorial Oral (Infecção Leve / Sem Sinais de Sepse)",
          "mode": "alternatives",
          "items": [
            {
              "drug": "Cefalexina 500 mg via Oral",
              "quantity": "1 caixa (28 cápsulas)",
              "directions": "1ª ESCOLHA: Tomar 1 cápsula de 6 em 6 horas (500 mg 6/6h) por 7 a 10 dias."
            },
            {
              "drug": "Clindamicina 300 mg via Oral",
              "quantity": "1 caixa (30 cápsulas)",
              "directions": "2ª ESCOLHA (se alergia a penicilina/cefalosporina): Tomar 1 cápsula de 8 em 8 horas por 7 a 10 dias."
            }
          ]
        },
        {
          "route": "Tratamento Hospitalar Endovenoso (Infecção Grave / Face / Comorbidades)",
          "mode": "alternatives",
          "items": [
            {
              "drug": "Cefazolina 1 g a 2 g pó injetável IV",
              "quantity": "1 frasco-ampola IV de 8/8h",
              "directions": "1ª ESCOLHA hospitalar para celulite e erisipela típica (Streptococcus e S. aureus oxacilina-sensível)."
            },
            {
              "drug": "Oxacilina 2 g pó injetável IV diluído em 100 mL de SF",
              "quantity": "2 g IV de 4 em 4 horas",
              "directions": "Esquema potente para estafilococcias graves e celulite extensa."
            }
          ]
        }
      ],
      "orientations": [
        "Repouso com elevação do membro afetado acima do nível do coração para acelerar drenagem do edema linfático.",
        "Marcar o bordo do eritema com caneta no início do tratamento para monitorar resposta terapêutica em 48 horas.",
        "Tratar rigorosamente a porta de entrada (tinea pedis, micose interdigital, úlceras de estase venosa)."
      ]
    }
  },
  {
    "id": "rec-seed-scassst",
    "slug": "prescricao-scassst",
    "title": "Prescrição de Emergência — Síndrome Coronariana Aguda Sem Supra (SCASSST)",
    "status": "verified",
    "data": {
      "copy_ready": true,
      "routes": [
        {
          "route": "Uso Oral Imediato (Dupla Antiagregação e Estatina)",
          "mode": "standard",
          "items": [
            {
              "drug": "Ácido Acetilsalicílico (AAS) 100 mg",
              "quantity": "2 comprimidos (200 mg mastigados)",
              "directions": "Dose de ataque imediata: mastigar e engolir 200 mg. Manter 100 mg/dia via oral contínuo."
            },
            {
              "drug": "Ticagrelor 90 mg (ou Clopidogrel 75 mg)",
              "quantity": "Ataque: 2 comp. (180 mg) | Manutenção: 90 mg 12/12h",
              "directions": "1ª ESCOLHA: Tomar 180 mg via oral de ataque; manter 90 mg de 12 em 12 horas por 12 meses. Se Clopidogrel: ataque de 300 a 600 mg VO."
            },
            {
              "drug": "Atorvastatina 80 mg via Oral",
              "quantity": "1 comprimido à noite",
              "directions": "Estatina de alta potência iniciada na emergência independente do valor basal de colesterol."
            }
          ]
        },
        {
          "route": "Uso Subcutâneo / Endovenoso (Anticoagulação e Sintomáticos)",
          "mode": "standard",
          "items": [
            {
              "drug": "Enoxaparina Sódica 1 mg/kg via Subcutânea (SC) de 12/12h",
              "quantity": "Ex.: 70 kg = 70 mg (0,7 mL) SC 12/12h",
              "directions": "Anticoagulação plena iniciada na admissão mantida até a cineangiocoronariografia ou alta."
            },
            {
              "drug": "Dinitrato de Isossorbida 5 mg via Sublingual (se dor anginosa)",
              "quantity": "1 comprimido SL a cada 5 min (máx 3 doses)",
              "directions": "Uso sob demanda se dor torácica e PAS >= 100 mmHg. Não utilizar se uso recente de Sildenafila (< 24h) ou Tadalafila (< 48h)."
            }
          ]
        }
      ],
      "orientations": [
        "Repouso absoluto no leito com monitorização de ECG contínua e oxímetro de pulso.",
        "Curva de troponina ultrassensível seriada na admissão e em 1 a 3 horas conforme protocolo institucional.",
        "Estratificação de risco pelo escore GRACE: programar cateterismo cardíaco em < 24h se GRACE > 140 ou troponina elevada."
      ]
    }
  },
  {
    "id": "rec-seed-intoxicacoes",
    "slug": "prescricao-intoxicacoes",
    "title": "Prescrição de Emergência — Intoxicações Agudas e Antídotos",
    "status": "verified",
    "data": {
      "copy_ready": true,
      "routes": [
        {
          "route": "Descontaminação Gastrointestinal Precoce (< 1 a 2 horas da ingestão)",
          "mode": "standard",
          "items": [
            {
              "drug": "Carvão Ativado em pó 1 g/kg (Dose padrão: 50 g)",
              "quantity": "50 g diluídos em 200 a 300 mL de água",
              "directions": "Administrar por via oral ou por sonda nasogástrica calibrosa se via aérea protegida. Não usar em cáusticos, hidrocarbonetos ou álcoois."
            }
          ]
        },
        {
          "route": "Antídotos Específicos Endovenosos",
          "mode": "alternatives",
          "items": [
            {
              "drug": "Acetilcisteína (NAC) IV — Intoxicação por Paracetamol (Protocolo de 21 Horas)",
              "quantity": "Dose de ataque: 150 mg/kg em 200 mL SG 5% em 1h | Manutenção 1: 50 mg/kg em 500 mL SG em 4h | Manutenção 2: 100 mg/kg em 1.000 mL SG em 16h",
              "directions": "Iniciar precocemente em dose tóxica presumida de paracetamol (> 150 mg/kg ou 7,5 g) ou nomograma de Rumack-Matthew na faixa de risco."
            },
            {
              "drug": "Naloxona 0,4 mg/mL IV — Intoxicação por Opioides (Tríade: Miose + Coma + Hipoventilação)",
              "quantity": "1 ampola (0,4 mg diluídos em 9 mL SF -> 0,04 mg/mL)",
              "directions": "Titular 0,04 a 0,1 mg IV a cada 2 minutos até retorno de ventilação espontânea adequada (evitar abstinência aguda violenta com superdosagem)."
            },
            {
              "drug": "Atropina 0,5 mg/mL IV — Síndrome Colinérgica / Organofosforados / Carbamatos",
              "quantity": "2 a 4 ampolas (1 a 2 mg IV direto)",
              "directions": "Aplicar 1 a 2 mg IV a cada 3 a 5 minutos até cessação completa da broncorreia e broncoespasmo (critério de atropinização)."
            }
          ]
        }
      ],
      "orientations": [
        "Ligar imediatamente para o CIATox (Centro de Informação Toxicológica — Disque Intoxicação 0800 722 6001).",
        "Monitorização rigorosa com ECG (avaliar alargamento de QTc e QRS) e gasometria com lactato e ânion gap.",
        "Avaliação psiquiátrica antes da liberação hospitalar em casos de tentativa de autoextermínio."
      ]
    }
  },
  {
    "id": "rec-seed-hpp",
    "slug": "prescricao-hpp",
    "title": "Prescrição Obstétrica — Hemorragia Pós-Parto (HPP / Atonia Uterina)",
    "status": "verified",
    "data": {
      "copy_ready": true,
      "routes": [
        {
          "route": "Uso Endovenoso Imediato (Uterotônicos e Antifibrinolítico)",
          "mode": "standard",
          "items": [
            {
              "drug": "Ocitocina 5 UI IV lento em 3 min + 20 a 40 UI em 500 mL de SF 0,9% a 250 mL/h",
              "quantity": "3 a 5 ampolas (5 UI/mL)",
              "directions": "1ª ESCOLHA: 5 UI IV lento associado a infusão contínua em bomba de 20–40 UI em 500 mL de SF ou RL a 250 mL/h."
            },
            {
              "drug": "Ácido Tranexâmico 1 g IV diluído em 100 mL de SF 0,9%",
              "quantity": "1 g (2 ampolas de 500 mg/5 mL)",
              "directions": "Infundir em 10 a 15 minutos nas primeiras 3 horas do parto. Reduz mortalidade materna por sangramento em mais de 30%."
            }
          ]
        },
        {
          "route": "Segunda Linha de Uterotônicos (Se atonia persistente)",
          "mode": "alternatives",
          "items": [
            {
              "drug": "Misoprostol 800 mcg via Retal (4 comprimidos de 200 mcg)",
              "quantity": "4 comprimidos de 200 mcg",
              "directions": "Introduzir via retal se sangramento persistente após ocitocina. Seguro na hipertensão materna."
            },
            {
              "drug": "Metilergometrina 0,2 mg IM (1 ampola de 1 mL)",
              "quantity": "1 ampola via intramuscular",
              "directions": "Aplicar via IM se normotensa. CONTRAINDICADO formalmente na pré-eclâmpsia e hipertensão materna."
            }
          ]
        }
      ],
      "orientations": [
        "Massagem uterina bimanual imediata (manobra de Hamilton) contínua para estímulo mecânico do miométrio.",
        "Revisão detalhada do canal de parto com valvas para afastar lacerações de colo, vagina e restos placentários (Regra dos 4 Ts: Tônus, Trauma, Tecido, Trombina).",
        "Se persistir sangramento: passagem precoce de Balão de Tamponamento Intrauterino (Balão de Bakri) com 300 a 500 mL de SF 0,9%."
      ]
    }
  },
  {
    "id": "rec-seed-crise-adrenal",
    "slug": "prescricao-crise-adrenal",
    "title": "Prescrição de Emergência — Insuficiência Adrenal Aguda (Crise Adrenal)",
    "status": "verified",
    "data": {
      "copy_ready": true,
      "routes": [
        {
          "route": "Uso Endovenoso Imediato (Glicocorticoide e Ressuscitação Volêmica)",
          "mode": "standard",
          "items": [
            {
              "drug": "Hidrocortisona (Succinato Sódico) 100 mg pó injetável IV",
              "quantity": "1 frasco-ampola em bolus imediato",
              "directions": "Administrar 100 mg IV em bolus imediato. A seguir, prescrever 50 mg IV de 6 em 6 horas (ou 200 mg/24h contínuo em bomba de infusão) até estabilização clínica."
            },
            {
              "drug": "Soro Fisiológico 0,9% 1.000 mL + Soro Glicosado 5% 500 mL",
              "quantity": "1.000 a 2.000 mL de cristaloide rápido",
              "directions": "Infundir 1.000 mL de SF 0,9% na primeira hora para correção da hipovolemia e hiponatremia. Associar SG 5% se hipoglicemia associada."
            }
          ]
        }
      ],
      "orientations": [
        "NÃO aguardar dosagens hormonais para iniciar o tratamento; o atraso na administração de hidrocortisona associa-se a choque irreversível e morte.",
        "Não é necessário repor mineralocorticoide (Fludrocortisona) na fase aguda, pois a Hidrocortisona em doses >= 100 mg já exerce atividade mineralocorticoide cruzada máxima.",
        "Investigar ativamente o gatilho precipitante: infecção oculta (foco urinário/pulmonar), infarto adrenal ou suspensão abrupta de corticoterapia crônica."
      ]
    }
  }
];
})();
