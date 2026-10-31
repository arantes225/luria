(function () {
  "use strict";
  window.TRAUBE_BULARIO_SEEDS = [
  {
    "id": "seed-drug-noradrenalina",
    "name": "Noradrenalina (Hemitartarato de Norepinefrina)",
    "active_ingredient": "Noradrenalina",
    "therapeutic_class": "Vasoativos e Choque",
    "pharmacological_class": "Agonista adrenérgico alfa-1 e beta-1 (Vasopressor de 1ª escolha)",
    "data": {
      "status": "posology_verified",
      "therapeutic_class": "Vasoativos e Choque · Vasopressor alfa-1/beta-1",
      "indication": "Vasopressor de primeira escolha no choque séptico, choque cardiogênico com hipotensão grave e hipotensão aguda ameaçadora à vida.",
      "diseases": [
        "Choque séptico",
        "Choque distributivo",
        "Choque cardiogênico",
        "Hipotensão grave pós-intubação"
      ],
      "products": [
        {
          "name": "Hyponor / Levophed / Genérico",
          "type": "Hospitalar",
          "presentation": "Ampola 4 mg/4 mL de base (equivalente a 8 mg/4 mL de hemitartarato)"
        }
      ],
      "formulations": [
        {
          "label": "Solução injetável 4 mg/4 mL (1 mg/mL de base anidra)",
          "dose_text": "Dose habitual: 0,05 a 0,5 mcg/kg/min IV contínuo em BIC (titular para PAM ≥ 65 mmHg). Diluição padrão (64 mcg/mL): 4 ampolas (16 mg = 16 mL) + 234 mL de SG 5%. Diluição concentrada (128 mcg/mL): 8 ampolas (32 mg = 32 mL) + 218 mL de SG 5%.",
          "interval_text": "Infusão contínua titulada a cada 2–5 minutos",
          "route": "Endovenosa (IV) exclusiva em bomba de infusão (preferencialmente acesso central; acesso periférico calibroso proximal permitido temporariamente por até 24h)",
          "duration_text": "Enquanto persistir instabilidade hemodinâmica (desmame gradual)",
          "population": "Adultos e Pediatria (UTI / Sala Vermelha)",
          "max_daily_text": "Acima de 0,25–0,5 mcg/kg/min associar Vasopressina (0,03 UI/min) e Hidrocortisona (200 mg/dia); doses > 1–2 mcg/kg/min associam-se a isquemia grave",
          "administration": "Diluir preferencialmente em Soro Glicosado 5% (a glicose protege contra oxidação da catecolamina). Proteger da luz se possível.",
          "prescription_type": "Uso restrito hospitalar",
          "cautions": "Atenção ao rótulo da ampola: 8 mg de hemitartarato equivalem a 4 mg de noradrenalina base! Todos os cálculos de infusão (64 mcg/mL) baseiam-se em 4 mg de base por ampola. Risco de necrose tecidual por extravasamento.",
          "source_url": "https://consultas.anvisa.gov.br/#/bulario/"
        }
      ],
      "contraindications": [
        "Hipotensão por hipovolemia não corrigida (exceto como medida emergencial temporária para manter perfusão coronariana/cerebral)",
        "Trombose vascular mesentérica ou periférica grave (relativa)"
      ],
      "renal_adjustment": "Não requer ajuste de dose inicial; titular pela resposta hemodinâmica (PAM e perfusão).",
      "hepatic_adjustment": "Não requer ajuste de dose.",
      "adverse_reactions": [
        "Isquemia periférica / cianose de extremidades",
        "Necrose cutânea por extravasamento",
        "Bradicardia reflexa ou taquiarritmias",
        "Hipertensão arterial por superdosagem"
      ],
      "drug_interactions": [
        "Inibidores da MAO e antidepressivos tricíclicos potencializam intensamente o efeito hipertensor",
        "Incompatível em Y com Bicarbonato de Sódio, Furosemida, Insulina e Tiopental"
      ],
      "antidote": [
        "Extravasamento subcutâneo: infiltrar Fentolamina 5 a 10 mg diluídos em 10–15 mL de SF 0,9% no local com agulha fina (ou aplicar pasta de Nitroglicerina tópica / Terbutalina local). Nunca retirar o cateter antes de aspirar o líquido extravasado."
      ],
      "compatible_diluents": "Soro Glicosado 5% (preferencial — previne oxidação). SF 0,9% pode ser usado se necessário em pacientes com hiperglicemia/TCE.",
      "infusion_rate": "Na diluição padrão (64 mcg/mL) para 70 kg: 0,05 mcg/kg/min = 3,3 mL/h; 0,1 mcg/kg/min = 6,6 mL/h; 0,3 mcg/kg/min = 19,7 mL/h; 0,5 mcg/kg/min = 32,8 mL/h.",
      "y_site_compatibility": "Compatível em Y com Dobutamina, Adrenalina, Vasopressina, Fentanil, Midazolam, Propofol e Dexmedetomidina. INCOMPATÍVEL com Bicarbonato de Sódio e Furosemida.",
      "storage_stability": "Trocar solução diluída a cada 24 horas. Descartar se a solução adquirir coloração rósea, amarelada ou marrom (precipitação/oxidação).",
      "pregnancy_category": "Categoria C (Uso justificado em choque materno)",
      "pregnancy_text": "No choque séptico na gestação, a restauração da PAM materna é prioritária para a sobrevida materno-fetal.",
      "reviewed_at": "2026-10-26"
    }
  },
  {
    "id": "seed-drug-adrenalina",
    "name": "Adrenalina (Epinefrina)",
    "active_ingredient": "Adrenalina (Epinefrina)",
    "therapeutic_class": "Vasoativos e Choque",
    "pharmacological_class": "Agonista adrenérgico não seletivo (alfa-1, beta-1 e beta-2)",
    "data": {
      "status": "posology_verified",
      "therapeutic_class": "Vasoativos e Choque · Emergência / PCR / Anafilaxia",
      "indication": "Parada cardiorrespiratória (ACLS/PALS), droga de 1ª linha na Anafilaxia e Choque Anafilático, bradicardia instável refratária e choque séptico/cardiogênico refratário.",
      "diseases": [
        "Parada cardiorrespiratória (PCR)",
        "Anafilaxia e Choque Anafilático",
        "Bradicardia sintomática instável",
        "Asma quase-fatal / Croup grave (nebulização)"
      ],
      "products": [
        {
          "name": "Epinefrina / Adren",
          "type": "Hospitalar",
          "presentation": "Ampola 1 mg/1 mL (1:1.000)"
        }
      ],
      "formulations": [
        {
          "label": "Solução injetável 1 mg/1 mL (1:1.000)",
          "dose_text": "1) ANAFILAXIA (VIA INTRAMUSCULAR no vasto lateral da coxa): Adultos: 0,3 a 0,5 mg (0,3 a 0,5 mL pura IM); Crianças: 0,01 mg/kg (máx 0,3 mg IM) a cada 5–15 min. 2) PCR (VIA ENDOVENOSA / IO): Adultos: 1 mg (1 ampola) IV/IO a cada 3 a 5 min seguida de flush de 20 mL SF 0,9%; Crianças: 0,01 mg/kg (0,1 mL/kg da solução diluída 1:10.000). 3) INFUSÃO CONTÍNUA (Choque/Bradicardia): 0,05 a 0,5 mcg/kg/min IV (ou 2 a 10 mcg/min).",
          "interval_text": "Anafilaxia: repetir IM a cada 5–15 min. PCR: repetir IV a cada 3–5 min.",
          "route": "IM (anafilaxia), IV/IO em bolus (somente na PCR!) ou IV contínuo diluído em BIC",
          "duration_text": "Uso agudo imediato na sala de emergência",
          "population": "Adultos, Gestantes e Pediatria",
          "max_daily_text": "Titulado conforme resposta hemodinâmica e retorno da circulação espontânea",
          "administration": "ALERTA DE SEGURANÇA MÁXIMA: Na anafilaxia em paciente com pulso, administrar EXCLUSIVAMENTE por via Intramuscular (IM) na coxa! Nunca injetar 1 mg IV pura em paciente com pulso!",
          "prescription_type": "Uso restrito hospitalar / urgência",
          "cautions": "Causa hiperglicemia e elevação transitória do lactato sérico (por estímulo beta-2 da glicólise aeróbia). Monitorar ECG continuamente.",
          "source_url": "https://consultas.anvisa.gov.br/#/bulario/"
        }
      ],
      "contraindications": [
        "Nenhuma contraindicação absoluta em situações de PCR ou Anafilaxia ameaçadora à vida!"
      ],
      "renal_adjustment": "Não requer ajuste de dose na emergência.",
      "hepatic_adjustment": "Não requer ajuste de dose.",
      "adverse_reactions": [
        "Taquicardia sinusal, arritmias ventriculares",
        "Hipertensão grave e hemorragia cerebral (se administrada IV rápida em paciente com pulso)",
        "Hiperlactatemia tipo B e hiperglicemia",
        "Tremores, ansiedade e palidez"
      ],
      "drug_interactions": [
        "Betabloqueadores não seletivos (propranolol) podem causar hipertensão grave por efeito alfa sem oposição e resistência ao efeito beta (usar Glucagon na anafilaxia refratária em usuário de betabloqueador)",
        "Incompatível com soluções alcalinas (Bicarbonato de Sódio)"
      ],
      "antidote": [
        "Extravasamento: infiltrar Fentolamina local. Crise hipertensiva acidental por bolus IV: Nitroprussiato de Sódio ou Fentolamina IV."
      ],
      "compatible_diluents": "SF 0,9% ou SG 5%. Para infusão contínua (60 mcg/mL): diluir 6 ampolas (6 mg) + 94 mL de SG 5% ou SF 0,9%. Para Push-Dose Pressor (10 mcg/mL): aspirar 1 mL da ampola + 9 mL SF (100 mcg/mL) e depois 1 mL desta + 9 mL SF = 10 mcg/mL (fazer bolus de 1 a 2 mL = 10–20 mcg IV).",
      "infusion_rate": "Em bomba de infusão (60 mcg/mL): 0,05 mcg/kg/min (70 kg) = 3,5 mL/h; 0,1 mcg/kg/min = 7 mL/h.",
      "reviewed_at": "2026-10-26",
      "pregnancy_category": "Categoria C (Uso justificado em emergência/PCR)",
      "pregnancy_text": "Droga de escolha na PCR e choque anafilático materno; restauração hemodinâmica prioritária."
    }
  },
  {
    "id": "seed-drug-dobutamina",
    "name": "Dobutamina (Cloridrato de Dobutamina)",
    "active_ingredient": "Dobutamina",
    "therapeutic_class": "Vasoativos e Choque",
    "pharmacological_class": "Inotrópico agonista beta-1 adrenérgico predominante",
    "data": {
      "status": "posology_verified",
      "therapeutic_class": "Vasoativos e Choque · Inotrópico",
      "indication": "Choque cardiogênico, insuficiência cardíaca aguda descompensada com baixo débito (Perfil C - frio e úmido) e disfunção miocárdica da sepse com hipoperfusão persistente.",
      "diseases": [
        "Choque cardiogênico",
        "Insuficiência cardíaca descompensada (Perfil C)",
        "Disfunção miocárdica séptica"
      ],
      "products": [
        {
          "name": "Dobutrex / Genérico",
          "type": "Hospitalar",
          "presentation": "Ampola 250 mg/20 mL (12,5 mg/mL)"
        }
      ],
      "formulations": [
        {
          "label": "Solução injetável 250 mg/20 mL (12,5 mg/mL)",
          "dose_text": "Dose habitual: 2,5 a 20 mcg/kg/min IV contínuo em BIC. Diluição padrão (1.000 mcg/mL = 1 mg/mL): 1 ampola (250 mg = 20 mL) + 230 mL de SG 5% ou SF 0,9% (volume total = 250 mL). Diluição concentrada (2 mg/mL): 2 ampolas (500 mg = 40 mL) + 210 mL de SG 5%.",
          "interval_text": "Infusão contínua titulada pelo débito cardíaco, SvcO2, clareamento de lactato e diurese",
          "route": "Endovenosa (IV) contínua em bomba de infusão",
          "duration_text": "Uso hospitalar curto prazo com desmame gradual (reduzir 1–2 mcg/kg/min a cada 2–4h)",
          "population": "Adultos e Pediatria",
          "max_daily_text": "20 mcg/kg/min (doses > 20 mcg/kg/min aumentam acentuadamente taquiarritmias e isquemia miocárdica sem ganho inotrópico)",
          "administration": "Se PAS < 85–90 mmHg, associar Noradrenalina antes ou junto à Dobutamina, pois a Dobutamina causa vasodilatação periférica beta-2 e pode agravar a hipotensão!",
          "prescription_type": "Uso restrito hospitalar",
          "cautions": "Corrigir hipocalemia e hipomagnesemia antes e durante o uso pelo alto potencial arritmogênico (FA de alta resposta, extrassístoles e TV).",
          "source_url": "https://consultas.anvisa.gov.br/#/bulario/"
        }
      ],
      "contraindications": [
        "Cardiomiopatia hipertrófica obstrutiva (estenose subaórtica hipertrófica idiopática)",
        "Estenose aórtica crítica não corrigida",
        "Tamponamento cardíaco"
      ],
      "renal_adjustment": "Não requer ajuste inicial.",
      "adverse_reactions": [
        "Taquicardia, fibrilação atrial de alta resposta, taquicardia ventricular",
        "Hipotensão arterial inicial (efeito vasodilatador beta-2)",
        "Isquemia miocárdica por aumento do consumo de O2",
        "Hipocalemia"
      ],
      "drug_interactions": [
        "Betabloqueadores antagonizam o efeito da dobutamina",
        "Incompatível em Y com Bicarbonato de Sódio, Furosemida, Fenitoína e Heparina"
      ],
      "compatible_diluents": "SG 5% ou SF 0,9%. A solução pode adquirir leve coloração rosada com o tempo sem perda de potência em até 24h.",
      "infusion_rate": "Na diluição padrão 1 mg/mL (250 mg/250 mL) para 70 kg: 2,5 mcg/kg/min = 10,5 mL/h; 5 mcg/kg/min = 21 mL/h; 10 mcg/kg/min = 42 mL/h; 15 mcg/kg/min = 63 mL/h.",
      "reviewed_at": "2026-10-26",
      "pregnancy_category": "Categoria B",
      "pregnancy_text": "Usar se choque cardiogênico ou baixo débito materno; monitorar FC materna e fetal.",
      "hepatic_adjustment": "Não requer ajuste de dose; metabolizada nos tecidos e fígado por COMT."
    }
  },
  {
    "id": "seed-drug-vasopressina",
    "name": "Vasopressina (Hormônio Antidiurético Sintético)",
    "active_ingredient": "Vasopressina",
    "therapeutic_class": "Vasoativos e Choque",
    "pharmacological_class": "Agonista seletivo dos receptores V1 vasculares (Vasopressor não-adrenérgico)",
    "data": {
      "status": "posology_verified",
      "therapeutic_class": "Vasoativos e Choque · Vasopressor V1",
      "indication": "Vasopressor de 2ª linha poupador de catecolaminas no choque séptico refratário (associado à Noradrenalina quando esta atinge 0,25–0,5 mcg/kg/min) e choque vasoplégico.",
      "diseases": [
        "Choque séptico refratário",
        "Choque vasoplégico pós-CEC",
        "Diabetes insipidus central"
      ],
      "products": [
        {
          "name": "Encrise / Genérico",
          "type": "Hospitalar",
          "presentation": "Ampola 20 UI/1 mL"
        }
      ],
      "formulations": [
        {
          "label": "Solução injetável 20 UI/1 mL",
          "dose_text": "Choque séptico: 0,01 a 0,03 UI/min (máx. 0,04 UI/min) IV contínuo em dose fixa (NÃO é calculada por kg de peso!). Diluição padrão (0,2 UI/mL): 1 ampola (20 UI = 1 mL) + 99 mL de SF 0,9% ou SG 5% (total 100 mL). Diluição dupla (0,4 UI/mL): 2 ampolas (40 UI = 2 mL) + 98 mL SF 0,9%.",
          "interval_text": "Infusão contínua em BIC",
          "route": "Endovenosa (IV) exclusiva em cateter venoso central",
          "duration_text": "Durante a fase de choque; iniciar desmame após redução da Noradrenalina para < 0,15–0,2 mcg/kg/min",
          "population": "Adultos em UTI",
          "max_daily_text": "0,03 a 0,04 UI/min no choque séptico (doses > 0,04 UI/min causam isquemia esplâncnica, coronariana e digital grave)",
          "administration": "Vantagem fisiológica: mantém ação vasoconstritora mesmo em acidemia metabólica grave (pH < 7,15) e não eleva a pressão arterial pulmonar!",
          "prescription_type": "Uso restrito hospitalar / UTI",
          "cautions": "Risco elevado de necrose cutânea extensa se extravasar em veia periférica — usar acesso central.",
          "source_url": "https://consultas.anvisa.gov.br/#/bulario/"
        }
      ],
      "contraindications": [
        "Isquemia mesentérica aguda ativa",
        "Doença coronariana instável não revascularizada (cautela)"
      ],
      "adverse_reactions": [
        "Isquemia digital, mesentérica e miocárdica",
        "Hiponatremia dilucional (efeito V2 antidiurético)",
        "Redução do débito cardíaco em doses altas",
        "Plaquetopenia"
      ],
      "compatible_diluents": "SF 0,9% ou SG 5%.",
      "infusion_rate": "Na diluição de 0,2 UI/mL (20 UI em 100 mL): 0,01 UI/min = 3 mL/h; 0,02 UI/min = 6 mL/h; 0,03 UI/min = 9 mL/h; 0,04 UI/min = 12 mL/h.",
      "reviewed_at": "2026-10-26",
      "pregnancy_category": "Categoria C",
      "pregnancy_text": "Pode provocar contrações uterinas por ação nos receptores oxitócicos; usar se choque refratário.",
      "hepatic_adjustment": "Não requer ajuste na insuficiência hepática.",
      "renal_adjustment": "Não requer ajuste de dose na disfunção renal."
    }
  },
  {
    "id": "seed-drug-nitroprussiato",
    "name": "Nitroprussiato de Sódio (Nipride)",
    "active_ingredient": "Nitroprussiato de Sódio",
    "therapeutic_class": "Vasoativos e Choque",
    "pharmacological_class": "Vasodilatador arterial e venoso direto (doador de óxido nítrico)",
    "data": {
      "status": "posology_verified",
      "therapeutic_class": "Vasoativos e Choque · Vasodilatador Parenteral Potente",
      "indication": "Emergências hipertensivas (encefalopatia hipertensiva, hipertensão maligna, edema agudo de pulmão hipertensivo) e dissecção aguda de aorta (sempre APÓS betabloqueio).",
      "diseases": [
        "Emergência hipertensiva",
        "Encefalopatia hipertensiva",
        "Dissecção aguda de aorta",
        "Edema agudo de pulmão hipertensivo"
      ],
      "products": [
        {
          "name": "Nipride / Nitroprus",
          "type": "Hospitalar",
          "presentation": "Ampola/frasco-ampola 50 mg/2 mL"
        }
      ],
      "formulations": [
        {
          "label": "Pó/Solução injetável 50 mg/2 mL",
          "dose_text": "Dose inicial: 0,25 a 0,5 mcg/kg/min IV contínuo, titulando a cada 3–5 min até resposta desejada (dose habitual: 0,5 a 5 mcg/kg/min; máx. 10 mcg/kg/min por no máximo 10 minutos). Diluição padrão (200 mcg/mL): 1 ampola (50 mg = 2 mL) + 248 mL de SG 5%.",
          "interval_text": "Infusão contínua titulada minuto a minuto (meia-vida de 1 a 2 minutos)",
          "route": "Endovenosa (IV) contínua em bomba de infusão com equipo fotossensível",
          "duration_text": "Curto prazo (24 a 48h); transicionar para anti-hipertensivos orais o mais breve possível",
          "population": "Adultos e Pediatria (UTI / Sala Vermelha)",
          "max_daily_text": "Evitar infusão > 2 mcg/kg/min por mais de 24–48h pelo risco de intoxicação por cianeto e tiocianato",
          "administration": "Diluir EXCLUSIVAMENTE em Soro Glicosado 5% e proteger o frasco e o equipo da luz (fotossensível).",
          "prescription_type": "Uso restrito hospitalar",
          "cautions": "Na Dissecção Aguda de Aorta, NUNCA iniciar Nitroprussiato antes de betabloquear o paciente (FC < 60 bpm com Esmolol/Metoprolol). Em coronariopatas agudos (IAM), preferir Nitroglicerina devido ao risco de 'roubo de fluxo coronariano' pelo nitroprussiato.",
          "source_url": "https://consultas.anvisa.gov.br/#/bulario/"
        }
      ],
      "contraindications": [
        "Coarctação de aorta ou shunt arteriovenoso compensatório",
        "Uso de inibidores da PDE-5 (sildenafil, tadalafil) nas últimas 24–48h",
        "Insuficiência hepática ou renal grave prolongada sem monitorização (risco de cianeto/tiocianato)"
      ],
      "adverse_reactions": [
        "Hipotensão severa imediata (reversível em 1–10 min ao desligar a bomba)",
        "Taquicardia reflexa",
        "Intoxicação por Cianeto (acidose láctica inexplicada, confusão, coma, taquifilaxia) e Tiocianato (psicose, zumbido, hiperreflexia em renais crônicos)",
        "Aumento da pressão intracraniana"
      ],
      "antidote": [
        "Intoxicação por Cianeto: Hidroxicobalamina 5 g IV em 15 min + Tiossulfato de Sódio 12,5 g IV."
      ],
      "compatible_diluents": "Exclusivamente Soro Glicosado 5% (248 mL + 2 mL da ampola = 200 mcg/mL).",
      "infusion_rate": "Na diluição de 200 mcg/mL para 70 kg: 0,3 mcg/kg/min = 6,3 mL/h; 0,5 mcg/kg/min = 10,5 mL/h; 1 mcg/kg/min = 21 mL/h; 2 mcg/kg/min = 42 mL/h.",
      "reviewed_at": "2026-10-26",
      "pregnancy_category": "Categoria C",
      "pregnancy_text": "Evitar na gravidez pelo risco de toxicidade por cianeto fetal; usar apenas se falha de hidralazina/labetalol.",
      "hepatic_adjustment": "Usar com cautela extrema; clearance de cianeto reduzido na disfunção hepática.",
      "renal_adjustment": "ClCr < 30 mL/min: risco de acúmulo de tiocianato se uso > 24–48h; monitorar níveis séricos e acidose."
    }
  },
  {
    "id": "seed-drug-nitroglicerina",
    "name": "Nitroglicerina (Tridil)",
    "active_ingredient": "Nitroglicerina",
    "therapeutic_class": "Vasoativos e Choque",
    "pharmacological_class": "Vasodilatador coronariano e venodilatador (nitrato orgânico)",
    "data": {
      "status": "posology_verified",
      "therapeutic_class": "Vasoativos e Choque · Vasodilatador Coronariano e Venoso",
      "indication": "Síndrome Coronariana Aguda (angina instável / IAM com dor persistente, hipertensão ou congestão) e Edema Agudo de Pulmão Cardiogênico.",
      "diseases": [
        "Síndrome Coronariana Aguda (SCA / IAM)",
        "Edema agudo de pulmão cardiogênico",
        "Emergência hipertensiva associada a isquemia miocárdica"
      ],
      "products": [
        {
          "name": "Tridil / Nitronal",
          "type": "Hospitalar",
          "presentation": "Ampola 50 mg/10 mL (5 mg/mL) ou 25 mg/5 mL"
        }
      ],
      "formulations": [
        {
          "label": "Solução injetável 50 mg/10 mL (5 mg/mL)",
          "dose_text": "Dose inicial: 5 a 10 mcg/min IV contínuo em BIC (NÃO depende do peso!). Aumentar 5 a 10 mcg/min a cada 5 minutos até alívio da dor/dispneia ou redução pressórica (dose habitual: 10 a 200 mcg/min). Diluição padrão (200 mcg/mL): 1 ampola (50 mg = 10 mL) + 240 mL de SG 5% ou SF 0,9% em frasco de vidro ou polietileno (Ecoflac).",
          "interval_text": "Infusão contínua titulada",
          "route": "Endovenosa (IV) contínua em bomba de infusão",
          "duration_text": "24 a 48 horas (desenvolve tolerância/taquifilaxia após 24–48h de infusão contínua)",
          "population": "Adultos",
          "max_daily_text": "200 a 400 mcg/min",
          "administration": "Usar frasco livre de PVC (vidro ou polietileno), pois o PVC absorve até 40–80% da nitroglicerina!",
          "prescription_type": "Uso restrito hospitalar",
          "cautions": "CONTRAINDICADA no Infarto de Ventrículo Direito (supra de DII, DIII, aVF + V3R/V4R), se PAS < 90 mmHg ou uso de Sildenafil (24h) / Tadalafil (48h)!",
          "source_url": "https://consultas.anvisa.gov.br/#/bulario/"
        }
      ],
      "contraindications": [
        "Infarto agudo do ventrículo direito",
        "Uso recente de inibidores da fosfodiesterase-5 (Sildenafil em 24h, Vardenafil em 24h, Tadalafil em 48h)",
        "Hipotensão arterial (PAS < 90 mmHg)",
        "Tamponamento cardíaco ou pericardite constritiva",
        "Estenose aórtica grave"
      ],
      "adverse_reactions": [
        "Cefaleia pulsátil (muito comum)",
        "Hipotensão arterial e taquicardia reflexa",
        "Flushing facial",
        "Metemoglobinemia (raro, em doses muito elevadas)"
      ],
      "compatible_diluents": "SG 5% ou SF 0,9% (240 mL + 10 mL da ampola = 200 mcg/mL).",
      "infusion_rate": "Na diluição de 200 mcg/mL: 5 mcg/min = 1,5 mL/h; 10 mcg/min = 3 mL/h; 20 mcg/min = 6 mL/h; 50 mcg/min = 15 mL/h; 100 mcg/min = 30 mL/h; 200 mcg/min = 60 mL/h.",
      "reviewed_at": "2026-10-26",
      "pregnancy_category": "Categoria C",
      "pregnancy_text": "Segura em edema agudo de pulmão e SCA materna; monitorar PA para evitar hipoperfusão placentária.",
      "hepatic_adjustment": "Usar com cautela em cirrose grave.",
      "renal_adjustment": "Não requer ajuste na insuficiência renal."
    }
  },
  {
    "id": "seed-drug-amiodarona",
    "name": "Amiodarona (Cloridrato de Amiodarona)",
    "active_ingredient": "Amiodarona",
    "therapeutic_class": "Cardiologia e Arritmias",
    "pharmacological_class": "Antiarrítmico Classe III de Vaughan-Williams (bloqueador multicanal K+, Na+, Ca2+ e beta)",
    "data": {
      "status": "posology_verified",
      "therapeutic_class": "Cardiologia e Arritmias · Antiarrítmico Classe III",
      "indication": "FV/TV sem pulso refratária ao choque (PCR), Taquicardia Ventricular monomórfica estável e Fibrilação Atrial aguda (controle de FC em IC ou cardioversão farmacológica).",
      "diseases": [
        "Parada cardiorrespiratória em FV/TV sem pulso",
        "Taquicardia Ventricular (TV)",
        "Fibrilação Atrial (FA) e Flutter Atrial"
      ],
      "products": [
        {
          "name": "Ancoron / Atlansil",
          "type": "Hospitalar / Oral",
          "presentation": "Ampola 150 mg/3 mL e Comprimidos 100 mg / 200 mg"
        }
      ],
      "formulations": [
        {
          "label": "Solução injetável 150 mg/3 mL (50 mg/mL)",
          "dose_text": "1) PCR (FV/TV sem pulso após 3º choque): 300 mg (2 ampolas) IV/IO em bolus (diluído em 20 mL SG 5%); pode repetir 150 mg (1 ampola) após 5º choque. 2) TAQUIARRITMIAS ESTÁVEIS (TV ou FA): Ataque de 150 a 300 mg (1 a 2 ampolas) diluídos em 100 mL de SG 5% correr em 10 a 30 minutos. Manutenção 24h (900 mg): diluir 6 ampolas (900 mg = 18 mL) em 482 mL de SG 5% (conc. 1,8 mg/mL): correr 1 mg/min nas primeiras 6h (33,3 mL/h) e 0,5 mg/min nas 18h seguintes (16,6 mL/h).",
          "interval_text": "Ataque em 10–30 min seguido de infusão contínua por 24h",
          "route": "Endovenosa (IV) — infusões contínuas > 1h preferencialmente em acesso central (alta incidência de flebite química periférica)",
          "duration_text": "Transicionar para via oral após 24–48h de estabilização",
          "population": "Adultos",
          "max_daily_text": "Dose máxima cumulativa IV de 2,2 g em 24 horas",
          "administration": "Diluir EXCLUSIVAMENTE em Soro Glicosado 5%! Precipita em SF 0,9% e é incompatível com heparina e bicarbonato.",
          "prescription_type": "Receita branca comum (uso hospitalar na forma IV)",
          "cautions": "PROIBIDA na Fibrilação Atrial pré-excitada (Wolff-Parkinson-White) e na Torsades de Pointes (prolonga o intervalo QT!). A infusão rápida causa hipotensão arterial grave pelo diluente polissorbato 80.",
          "source_url": "https://consultas.anvisa.gov.br/#/bulario/"
        }
      ],
      "contraindications": [
        "Bradicardia sinusal grave e bloqueio sinoatrial ou BAV de 2º/3º grau sem marcapasso",
        "Fibrilação atrial pré-excitada (Síndrome de Wolff-Parkinson-White)",
        "Torsades de Pointes / Síndrome do QT longo congênito",
        "Disfunção tireoidiana descompensada ou hipersensibilidade ao iodo"
      ],
      "adverse_reactions": [
        "Hipotensão arterial e bradicardia na infusão venosa rápida",
        "Flebite química intensa em veia periférica",
        "Prolongamento do intervalo QT",
        "Uso crônico: hipo ou hipertireoidismo, fibrose pulmonar, hepatotoxicidade e microdepósitos corneanos"
      ],
      "drug_interactions": [
        "Aumenta o nível sérico de Varfarina (reduzir dose da varfarina em 30–50% e monitorar INR!), Digoxina (reduzir digoxina em 50%) e Sinvastatina",
        "Associação com quinolonas, macrolídeos, ondansetrona ou haloperidol aumenta risco de prolongamento de QT"
      ],
      "compatible_diluents": "Exclusivamente Soro Glicosado 5% (usar frasco de polietileno/vidro para infusões > 2h).",
      "infusion_rate": "Na solução de manutenção de 900 mg em 500 mL SG 5% (1,8 mg/mL): 1 mg/min (primeiras 6h) = 33,3 mL/h; 0,5 mg/min (18h seguintes) = 16,6 mL/h.",
      "reviewed_at": "2026-10-26",
      "pregnancy_category": "Categoria D (Hipotireoidismo e bócio fetal)",
      "pregnancy_text": "Usar em PCR e arritmias ventriculares instáveis ameaçadoras à vida materna.",
      "hepatic_adjustment": "Metabolismo hepático extenso; monitorar transaminases e reduzir dose se elevação > 3x LSN.",
      "renal_adjustment": "Não requer ajuste na insuficiência renal (excreção renal mínima)."
    }
  },
  {
    "id": "seed-drug-adenosina",
    "name": "Adenosina",
    "active_ingredient": "Adenosina",
    "therapeutic_class": "Cardiologia e Arritmias",
    "pharmacological_class": "Nucleosídeo endógeno bloqueador transitório da condução pelo nó AV",
    "data": {
      "status": "posology_verified",
      "therapeutic_class": "Cardiologia e Arritmias · Antiarrítmico de Ação Ultracurta",
      "indication": "Droga de 1ª escolha para reversão aguda da Taquicardia Supraventricular Paroxística (TSVP por reentrada nodal ou atrioventricular) regular de QRS estreito estável.",
      "diseases": [
        "Taquicardia Supraventricular Paroxística (TSVP)"
      ],
      "products": [
        {
          "name": "Adenocard",
          "type": "Hospitalar",
          "presentation": "Ampola 6 mg/2 mL (3 mg/mL)"
        }
      ],
      "formulations": [
        {
          "label": "Solução injetável 6 mg/2 mL",
          "dose_text": "1ª Dose: 6 mg (1 ampola = 2 mL) em bolus IV RÁPIDO (1 a 2 segundos) em veia antecubital, seguido imediatamente de flush rápido de 20 mL de SF 0,9% e elevação do membro superior. 2ª Dose (se não reverter em 1 a 2 min): 12 mg (2 ampolas = 4 mL) em bolus IV rápido + flush de 20 mL SF 0,9%. (Nota: usar metade da dose — 3 mg — se paciente em uso de Dipiridamol, Carbamazepina, transplantado cardíaco ou se administrado em cateter venoso central!).",
          "interval_text": "Aguardar 1 a 2 minutos entre a dose de 6 mg e a de 12 mg",
          "route": "Endovenosa (IV) em bolus ultrarrápido com torneirinha de 3 vias (Three-Way)",
          "duration_text": "Uso agudo imediato (meia-vida plasmática < 10 segundos)",
          "population": "Adultos e Pediatria (Pediatria: 0,1 mg/kg 1ª dose, máx 6 mg; 0,2 mg/kg 2ª dose, máx 12 mg)",
          "max_daily_text": "6 mg seguido de até duas doses de 12 mg",
          "administration": "Conectar a seringa de Adenosina e a seringa de 20 mL de SF 0,9% em uma torneirinha de 3 vias direto na veia da fossa cubital. Avisar o paciente antes que sentirá aperto no peito/falta de ar fugaz por 5 a 10 segundos.",
          "prescription_type": "Uso restrito hospitalar",
          "cautions": "Manter desfibrilador ligado ao lado e registrar fita de ECG contínua durante a injeção.",
          "source_url": "https://consultas.anvisa.gov.br/#/bulario/"
        }
      ],
      "contraindications": [
        "Asma brônquica grave ou broncoespasmo ativo (pode precipitar broncoespasmo severo! Usar Verapamil ou Metoprolol em asmáticos)",
        "Fibrilação Atrial pré-excitada / Wolff-Parkinson-White (taquicardia irregular de QRS largo)",
        "BAV de 2º ou 3º grau ou Doença do Nó Sinusal sem marcapasso"
      ],
      "adverse_reactions": [
        "Sensação transitória de morte iminente, opressão torácica, dispneia e flushing facial (duram 5 a 15 segundos)",
        "Pausa sinusal / assistolia transitória de alguns segundos no monitor",
        "Broncoespasmo em asmáticos"
      ],
      "drug_interactions": [
        "Cafeína e Teofilina/Aminofilina são antagonistas competitivos (exigem doses maiores)",
        "Dipiridamol e Carbamazepina potencializam o bloqueio AV (reduzir dose inicial para 3 mg)"
      ],
      "reviewed_at": "2026-10-26",
      "pregnancy_category": "Categoria C",
      "pregnancy_text": "Droga de escolha para reversão de taquicardia supraventricular (TPSV) na gestação; meia-vida ultracurta (< 10s).",
      "hepatic_adjustment": "Não requer ajuste de dose (depuração celular enzimática nas hemácias).",
      "renal_adjustment": "Não requer ajuste na insuficiência renal."
    }
  },
  {
    "id": "seed-drug-cetamina",
    "name": "Cetamina (Cloridrato de Escetamina / Cetamina)",
    "active_ingredient": "Cetamina",
    "therapeutic_class": "SRI, Sedação e Analgesia",
    "pharmacological_class": "Anestésico dissociativo antagonista do receptor NMDA",
    "data": {
      "status": "posology_verified",
      "therapeutic_class": "SRI, Sedação e Analgesia · Indutor Hemodinamicamente Estável e Broncodilatador",
      "indication": "Indutor anestésico de escolha na Intubação em Sequência Rápida (SRI) em pacientes com choque séptico, instabilidade hemodinâmica ou crise asmática grave; sedoanalgesia para procedimentos dolorosos e analgesia poupadora de opioides.",
      "diseases": [
        "Intubação em Sequência Rápida (SRI)",
        "Crise asmática grave (Estado de Mal Asmático)",
        "Choque séptico / Trauma",
        "Analgesia e sedação para procedimentos (PSA)"
      ],
      "products": [
        {
          "name": "Ketamin / Cristália",
          "type": "Hospitalar Controlado",
          "presentation": "Frasco-ampola 50 mg/mL (2 mL ou 10 mL)"
        }
      ],
      "formulations": [
        {
          "label": "Solução injetável 50 mg/mL",
          "dose_text": "1) INDUÇÃO NA SRI (Intubação): 1,5 a 2 mg/kg IV em bolus em 30–60s (Adulto 70 kg = 100 a 140 mg = 2 a 2,8 mL; reduzir para 0,5–1 mg/kg em choque profundo). 2) ANALGESIA SUBDISSOCIATIVA (Dor aguda refratária): 0,1 a 0,3 mg/kg IV lento em 10–15 min (70 kg = 10 a 20 mg diluídos). 3) SEDAÇÃO PARA PROCEDIMENTO (Ketofol ou isolada): 0,5 a 1 mg/kg IV (ou 4 mg/kg IM).",
          "interval_text": "Início de ação IV em 45–60 segundos; duração da indução de 10 a 20 minutos",
          "route": "Endovenosa (IV) ou Intramuscular (IM)",
          "duration_text": "Bolus na SRI ou infusão contínua em UTI (0,2 a 2 mg/kg/h)",
          "population": "Adultos e Pediatria",
          "max_daily_text": "Titulado conforme plano anestésico/intensivo",
          "administration": "Para bolus IV na SRI, pode-se diluir a dose calculada (ex.: 2 mL = 100 mg) em 8 mL de SF 0,9% (ficando 10 mg/mL) para administração precisa.",
          "prescription_type": "Notificação de Receita B1 (Uso restrito hospitalar)",
          "cautions": "Preserva os reflexos de via aérea e o drive respiratório em doses sedativas, libera catecolaminas endógenas mantendo PA e FC, e promove potente broncodilatação.",
          "source_url": "https://consultas.anvisa.gov.br/#/bulario/"
        }
      ],
      "contraindications": [
        "Emergência hipertensiva grave não controlada, dissecção aguda de aorta ou IAM agudo em que o aumento da FC/PA seja deletério",
        "Eclâmpsia / Pré-eclâmpsia grave com hipertensão não controlada"
      ],
      "adverse_reactions": [
        "Fenômenos de emergência no despertar (sonhos vívidos, alucinações — prevenidos com pequena dose de Midazolam ou Propofol)",
        "Aumento transitório da PA e FC",
        "Hipersalivação (sialorreia)",
        "Laringoespasmo (raro, em procedimentos de orofaringe em crianças)"
      ],
      "compatible_diluents": "SF 0,9% ou SG 5%.",
      "reviewed_at": "2026-10-26",
      "pregnancy_category": "Categoria B",
      "pregnancy_text": "Usar em indução anestésica emergencial materna se hipotensão ou broncoespasmo grave.",
      "hepatic_adjustment": "Metabolizada pelo CYP hepático; reduzir dose em cirrose descompensada.",
      "renal_adjustment": "Não requer ajuste na insuficiência renal."
    }
  },
  {
    "id": "seed-drug-etomidato",
    "name": "Etomidato",
    "active_ingredient": "Etomidato",
    "therapeutic_class": "SRI, Sedação e Analgesia",
    "pharmacological_class": "Hipnótico imidazólico agonista GABA-A de ação ultracurta",
    "data": {
      "status": "posology_verified",
      "therapeutic_class": "SRI, Sedação e Analgesia · Indutor Neutro Hemodinamicamente",
      "indication": "Indução anestésica na Intubação em Sequência Rápida (SRI) e sedação rápida para Cardioversão Elétrica Sincronizada, destacando-se pela estabilidade cardiovascular.",
      "diseases": [
        "Intubação em Sequência Rápida (SRI)",
        "Cardioversão elétrica sincronizada"
      ],
      "products": [
        {
          "name": "Hypnomidate / Genérico",
          "type": "Hospitalar",
          "presentation": "Ampola 20 mg/10 mL (2 mg/mL)"
        }
      ],
      "formulations": [
        {
          "label": "Solução injetável 20 mg/10 mL (2 mg/mL)",
          "dose_text": "1) INDUÇÃO NA SRI: 0,3 mg/kg IV em bolus lento (30–60s) -> Adulto de 70 kg = 20 mg (1 ampola inteira de 10 mL). Em choque grave/idoso frágil: reduzir para 0,15 a 0,2 mg/kg (10 a 14 mg = 5 a 7 mL). 2) SEDAÇÃO PARA CARDIOVERSÃO ELÉTRICA: 0,1 a 0,15 mg/kg IV (7 a 10 mg = 3,5 a 5 mL IV) associado a Fentanil.",
          "interval_text": "Dose única para indução (início em 30–45s; duração hipnótica curta de 5 a 10 minutos)",
          "route": "Endovenosa (IV) exclusiva",
          "duration_text": "NUNCA utilizar em infusão contínua ou doses repetidas prolongadas (inibe a 11-beta-hidroxilase adrenal!)",
          "population": "Adultos e Crianças > 10 anos",
          "max_daily_text": "Dose única de indução (0,3 mg/kg)",
          "administration": "Injetar puro em veia periférica calibrosa em 30 a 60 segundos.",
          "prescription_type": "Uso restrito hospitalar (Lista C1)",
          "cautions": "NÃO possui qualquer efeito analgésico! Associar Fentanil quando indicado e iniciar sedoanalgesia pós-intubação precocemente (especialmente se bloqueado com Rocurônio).",
          "source_url": "https://consultas.anvisa.gov.br/#/bulario/"
        }
      ],
      "contraindications": [
        "Infusão contínua prolongada (causa supressão adrenal e aumento de mortalidade)",
        "Porfiria aguda"
      ],
      "adverse_reactions": [
        "Mioclonias benignas transitórias na indução (não são crises epilépticas e desaparecem com o bloqueador neuromuscular)",
        "Dor à injeção (pelo propilenoglicol)",
        "Supressão transitória da síntese de cortisol adrenal por 12–24h após dose única",
        "Náuseas e vômitos no despertar"
      ],
      "reviewed_at": "2026-10-26",
      "pregnancy_category": "Categoria C",
      "pregnancy_text": "Indutor de escolha em intubação de emergência materna com instabilidade hemodinâmica.",
      "hepatic_adjustment": "Usar com cautela em hepatopatias graves (meia-vida prolongada).",
      "renal_adjustment": "Não requer ajuste de dose na disfunção renal."
    }
  },
  {
    "id": "seed-drug-rocuronio",
    "name": "Rocurônio (Brometo de Rocurônio)",
    "active_ingredient": "Rocurônio",
    "therapeutic_class": "SRI, Sedação e Analgesia",
    "pharmacological_class": "Bloqueador neuromuscular não-despolarizante (aminosteroide)",
    "data": {
      "status": "posology_verified",
      "therapeutic_class": "SRI, Sedação e Analgesia · Bloqueador Neuromuscular Não-Despolarizante",
      "indication": "Paralisia muscular na Intubação em Sequência Rápida (SRI) — especialmente quando a Succinilcolina é contraindicada — e manutenção de bloqueio neuromuscular em ventilação mecânica (SDRA grave).",
      "diseases": [
        "Intubação em Sequência Rápida (SRI)",
        "Ventilação mecânica na SDRA"
      ],
      "products": [
        {
          "name": "Esmeron / Rocuron",
          "type": "Hospitalar",
          "presentation": "Frasco-ampola 50 mg/5 mL (10 mg/mL)"
        }
      ],
      "formulations": [
        {
          "label": "Solução injetável 50 mg/5 mL (10 mg/mL)",
          "dose_text": "1) DOSE DE INTUBAÇÃO EM SEQUÊNCIA RÁPIDA (SRI): 1,2 mg/kg IV em bolus rápido (Adulto 70 kg = 85 mg = 8,5 mL; 2 frascos-ampola). Proporciona condições ótimas de intubação em 45 a 60 segundos, equivalentes à Succinilcolina! 2) INTUBAÇÃO ELETIVA PADRÃO: 0,6 mg/kg IV. 3) INFUSÃO CONTÍNUA (UTI): 0,3 a 0,6 mg/kg/h.",
          "interval_text": "Início em 45–60s na dose de 1,2 mg/kg; duração clínica de 45 a 70 minutos",
          "route": "Endovenosa (IV) exclusiva",
          "duration_text": "Bolus único na SRI",
          "population": "Adultos, Gestantes e Pediatria",
          "max_daily_text": "1,2 mg/kg por bolus de SRI",
          "administration": "SEMPRE administrar o hipnótico/indutor (Cetamina, Etomidato ou Propofol) ANTES do Rocurônio! Paralisar um paciente consciente é um erro grave.",
          "prescription_type": "Uso restrito hospitalar",
          "cautions": "Como a duração do Rocurônio (45–70 min) é muito maior que a do Etomidato (8–10 min), é OBRIGATÓRIO iniciar infusão contínua de sedação (Propofol ou Midazolam + Fentanil) imediatamente após a intubação para que o paciente não acorde paralisado!",
          "source_url": "https://consultas.anvisa.gov.br/#/bulario/"
        }
      ],
      "contraindications": [
        "Hipersensibilidade conhecida ao rocurônio ou íon brometo. (Seguro em hipercalemia, queimados, politrauma, rabdomiólise e doenças neuromusculares!)"
      ],
      "adverse_reactions": [
        "Paralisia residual prolongada (especialmente em insuficiência hepática/renal)",
        "Anafilaxia perioperatória (rara)"
      ],
      "antidote": [
        "Reversor específico imediato: SUGAMADEX (Bridion) 16 mg/kg IV para reversão imediata de emergência ('não intubo, não ventilo') após 1,2 mg/kg de Rocurônio, ou 2 a 4 mg/kg para reversão de rotina."
      ],
      "reviewed_at": "2026-10-26",
      "pregnancy_category": "Categoria C",
      "pregnancy_text": "Bloqueador neuromuscular de escolha na intubação de sequência rápida (SRI) se contraindicação à succinilcolina.",
      "hepatic_adjustment": "Eliminação biliar/hepática predominante; duração do bloqueio prolongada em cirróticos.",
      "renal_adjustment": "Não requer ajuste de dose inicial; duração ligeiramente prolongada em insuficiência renal."
    }
  },
  {
    "id": "seed-drug-succinilcolina",
    "name": "Succinilcolina (Cloreto de Suxametônio)",
    "active_ingredient": "Succinilcolina",
    "therapeutic_class": "SRI, Sedação e Analgesia",
    "pharmacological_class": "Bloqueador neuromuscular despolarizante de ação ultracurta",
    "data": {
      "status": "posology_verified",
      "therapeutic_class": "SRI, Sedação e Analgesia · Bloqueador Neuromuscular Despolarizante",
      "indication": "Paralisia muscular de início ultrarrápido (45 segundos) e curta duração (6 a 10 minutos) para Intubação em Sequência Rápida (SRI).",
      "diseases": [
        "Intubação em Sequência Rápida (SRI)",
        "Laringoespasmo agudo refratário"
      ],
      "products": [
        {
          "name": "Quelicin / Succinil Colin",
          "type": "Hospitalar",
          "presentation": "Frasco-ampola liofilizado 100 mg"
        }
      ],
      "formulations": [
        {
          "label": "Pó liofilizado injetável 100 mg",
          "dose_text": "DOSE NA SRI: 1,5 mg/kg IV em bolus rápido (Adulto 70 kg = 100 mg = 1 frasco inteiro diluído em 10 mL de AD ou SF 0,9% = 10 mg/mL). Crianças: 1,5 a 2 mg/kg IV (associar Atropina 0,02 mg/kg se < 1 ano pelo risco de bradicardia).",
          "interval_text": "Início em 30–45 segundos (após fasciculações); duração de 6 a 10 minutos",
          "route": "Endovenosa (IV) — ou 3 a 4 mg/kg IM em emergência sem acesso",
          "duration_text": "Dose única na SRI",
          "population": "Adultos e Pediatria (sem contraindicações)",
          "max_daily_text": "150 mg por dose no adulto",
          "administration": "Reconstituir o frasco de 100 mg em 10 mL de SF 0,9% ou Água Destilada (10 mg/mL) e injetar imediatamente após o indutor.",
          "prescription_type": "Uso restrito hospitalar",
          "cautions": "Eleva o Potássio sérico em ~0,5 mEq/L em indivíduos normais, mas pode elevar em 5 a 10 mEq/L causando PARADA CARDÍACA HIPERCALÊMICA em condições de up-regulation de receptores nicotínicos extrajuncionais!",
          "source_url": "https://consultas.anvisa.gov.br/#/bulario/"
        }
      ],
      "contraindications": [
        "Hipercalemia conhecida ou suspeita (K+ > 5,5 mEq/L) ou ECG com onda T apiculada",
        "Rabdomiólise aguda ou trauma muscular maciço (esmagamento)",
        "Grandes queimados após 48 horas da queimadura",
        "Lesão medular (paraplegia/tetraplegia), AVC com hemiplegia ou denervação muscular após 48–72 horas até 6 meses do evento",
        "Doenças neuromusculares (ELA, Esclerose Múltipla, Distrofias Musculares como Duchenne, Guillain-Barré)",
        "História pessoal ou familiar de Hipertermia Maligna"
      ],
      "adverse_reactions": [
        "Hipercalemia grave e parada cardíaca em pacientes de risco",
        "Fasciculações musculares e mialgia pós-operatória",
        "Bradicardia sinusal (especialmente em crianças ou após 2ª dose)",
        "Hipertermia Maligna"
      ],
      "antidote": [
        "Hipertermia Maligna: suspender gatilho, resfriamento ativo e Dantroleno Sódico 2,5 mg/kg IV repetido até controle. Parada hipercalêmica: Gluconato de Cálcio 10% 20–30 mL IV + Bicarbonato + Glicoinsulinoterapia."
      ],
      "reviewed_at": "2026-10-26",
      "pregnancy_category": "Categoria C",
      "pregnancy_text": "Padrão clássico em SRI; contraindicado em grandes queimados, hipercalemia e trauma medular recente.",
      "hepatic_adjustment": "Hepatopatia grave reduz pseudocolinesterase plasmática, prolongando o bloqueio.",
      "renal_adjustment": "CONTRAINDICADO em pacientes com hipercalemia prévia ou anúria por risco de elevação de K+ em 0,5–1,0 mEq/L."
    }
  },
  {
    "id": "seed-drug-sulfato-magnesio",
    "name": "Sulfato de Magnésio (MgSO₄)",
    "active_ingredient": "Sulfato de Magnésio",
    "therapeutic_class": "Eletrólitos e Emergências",
    "pharmacological_class": "Eletrólito, anticonvulsivante obstétrico, broncodilatador e antiarrítmico",
    "data": {
      "status": "posology_verified",
      "therapeutic_class": "Eletrólitos e Emergências · Eclâmpsia / Torsades / Asma Grave",
      "indication": "Prevenção e tratamento de convulsões na Pré-Eclâmpsia Grave e Eclâmpsia; antiarrítmico de 1ª escolha na Torsades de Pointes (TV polimórfica com QT longo); broncodilatador adjuvante na crise asmática grave refratária; reposição na hipomagnesemia.",
      "diseases": [
        "Pré-eclâmpsia com sinais de gravidade e Eclâmpsia",
        "Torsades de Pointes",
        "Crise de asma grave refratária",
        "Hipomagnesemia e Hipocalemia refratária"
      ],
      "products": [
        {
          "name": "Sulfato de Magnésio 10% e 50%",
          "type": "Hospitalar",
          "presentation": "Ampola 10% (1 g/10 mL = 0,8 mEq/mL) e Ampola 50% (5 g/10 mL = 4 mEq/mL)"
        }
      ],
      "formulations": [
        {
          "label": "Ampola 50% (5 g/10 mL = 0,5 g/mL) e Ampola 10% (1 g/10 mL = 0,1 g/mL)",
          "dose_text": "1) PRÉ-ECLÂMPSIA GRAVE / ECLÂMPSIA (Esquema de Zuspan): Ataque de 4 g IV (8 mL da ampola a 50% OU 40 mL da ampola a 10%) diluídos em 100 mL de SF 0,9% ou SG 5%, correr em 15 a 20 minutos. Manutenção: 1 a 2 g/h IV contínuo em BIC por 24h (diluir 10 ampolas a 10% [10 g] ou 2 ampolas a 50% [10 g] em 400 mL SF 0,9% -> correr a 50 mL/h = 1 g/h). 2) TORSADES DE POINTES: 2 g IV em bolus lento (2 a 5 min; em PCR em bolus rápido). 3) ASMA GRAVE REFRATÁRIA: 2 g IV (20 mL a 10% ou 4 mL a 50%) diluídos em 100 mL SF 0,9% correr em 20 minutos.",
          "interval_text": "Dose única (Asma/Torsades) ou Infusão Contínua de 1–2 g/h por 24h (Eclâmpsia)",
          "route": "Endovenosa (IV) diluída ou Intramuscular profunda (no esquema de Pritchard)",
          "duration_text": "Na Eclâmpsia: manter por 24 horas após o parto ou após a última convulsão",
          "population": "Adultos, Gestantes e Pediatria (Asma pediátrica: 25–50 mg/kg IV em 20 min, máx 2 g)",
          "max_daily_text": "Monitorar clínica de 1/1h na infusão contínua",
          "administration": "ATENÇÃO À CONCENTRAÇÃO DA AMPOLA: 1 ampola a 50% (10 mL) contém 5 GRAMAS (precisa de diluição obrigatória para via IV!). 1 ampola a 10% (10 mL) contém 1 GRAMA.",
          "prescription_type": "Uso restrito hospitalar",
          "cautions": "Na infusão contínua obstétrica, vigiar a Tríade de Segurança a cada 1–2h: 1) Reflexo patelar presente; 2) Frequência respiratória ≥ 12–16 irpm; 3) Diurese ≥ 25 mL/h (excreção exclusivamente renal!).",
          "source_url": "https://consultas.anvisa.gov.br/#/bulario/"
        }
      ],
      "contraindications": [
        "Miastenia Gravis (pode desencadear crise miastênica grave)",
        "Bloqueio atrioventricular avançado",
        "Em insuficiência renal / oligúria (< 25 mL/h): NÃO contraindica a dose de ataque de 4 g na eclâmpsia, mas exige reduzir a manutenção pela metade (0,5 g/h) ou suspender com monitorização rigorosa de reflexos e magnésio sérico"
      ],
      "adverse_reactions": [
        "Flushing facial, sensação de calor e sudorese durante o ataque",
        "Abolição do reflexo patelar (1º sinal de intoxicação, quando Mg sérico > 7–10 mEq/L)",
        "Depressão respiratória / apneia (Mg > 10–12 mEq/L)",
        "Bloqueio AV e parada cardíaca em diástole (Mg > 15–20 mEq/L)"
      ],
      "antidote": [
        "ANTÍDOTO IMEDIATO (Deixar sempre à cabeceira!): Gluconato de Cálcio 10% — 1 ampola (10 mL = 1 g) IV lento em 3 a 5 minutos!"
      ],
      "reviewed_at": "2026-10-26",
      "pregnancy_category": "Categoria A/B (Padrão ouro obstétrico)",
      "pregnancy_text": "Droga de escolha mundial na prevenção e tratamento da pré-eclâmpsia grave e eclâmpsia.",
      "hepatic_adjustment": "Não requer ajuste na disfunção hepática.",
      "renal_adjustment": "ClCr < 30 mL/min: reduzir dose de manutenção em 50% e monitorar reflexo patelar e magnesemia horária."
    }
  },
  {
    "id": "seed-drug-gluconato-calcio",
    "name": "Gluconato de Cálcio 10%",
    "active_ingredient": "Gluconato de Cálcio",
    "therapeutic_class": "Eletrólitos e Emergências",
    "pharmacological_class": "Estabilizador da membrana miocárdica e repositor de cálcio",
    "data": {
      "status": "posology_verified",
      "therapeutic_class": "Eletrólitos e Emergências · Cardioprotetor na Hipercalemia e Antídoto do Magnésio",
      "indication": "Primeira medida imediata na Hipercalemia com alterações eletrocardiográficas (estabilização da membrana miocárdica); antídoto da intoxicação por Sulfato de Magnésio e bloqueadores de canal de cálcio; hipocalcemia sintomática grave (tetania/convulsão) e transfusão maciça.",
      "diseases": [
        "Hipercalemia grave com alteração no ECG",
        "Intoxicação por Sulfato de Magnésio",
        "Hipocalcemia aguda sintomática",
        "Intoxicação por Bloqueadores de Canal de Cálcio"
      ],
      "products": [
        {
          "name": "Gluconato de Cálcio 10%",
          "type": "Hospitalar",
          "presentation": "Ampola 10 mL a 10% (1 g = 90 mg de cálcio elementar = 4,6 mEq)"
        }
      ],
      "formulations": [
        {
          "label": "Solução injetável 10% — 10 mL (1 g/10 mL)",
          "dose_text": "1) HIPERCALEMIA COM ALTERAÇÃO DE ECG (Onda T em tenda, alargamento QRS, perda de onda P): 10 a 20 mL (1 a 2 ampolas = 1 a 2 g) diluídos em 50–100 mL de SF 0,9% ou SG 5%, correr IV lento em 2 a 5 minutos sob monitorização de ECG (início de ação em 1–3 min; duração de 30–60 min; repetir em 5 min se ECG não melhorar). 2) ANTÍDOTO DO SULFATO DE MAGNÉSIO: 10 mL (1 g) IV lento em 3 a 5 min.",
          "interval_text": "Pode ser repetido após 5 a 10 minutos se persistirem alterações no ECG",
          "route": "Endovenosa (IV) lenta — pode ser feito em veia periférica calibrosa (muito mais seguro para veia periférica do que o Cloreto de Cálcio!)",
          "duration_text": "Efeito cardioprotetor dura 30 a 60 minutos (não reduz o K+ sérico — associar Insulina + Glicose imediatamente!)",
          "population": "Adultos, Gestantes e Pediatria (Pediatria: 0,5 a 1 mL/kg IV lento em 5–10 min, máx 10–20 mL)",
          "max_daily_text": "Guiado por ECG e cálcio iônico sérico (meta Ca iônico 1,15–1,30 mmol/L)",
          "administration": "Nunca administrar no mesmo acesso/linha venosa que Bicarbonato de Sódio (precipita Carbonato de Cálcio — 'pedra/giz' no equipo!).",
          "prescription_type": "Uso restrito hospitalar",
          "cautions": "O Gluconato de Cálcio NÃO baixa o potássio do sangue, apenas protege o coração contra fibrilação ventricular enquanto a glicoinsulinoterapia faz efeito.",
          "source_url": "https://consultas.anvisa.gov.br/#/bulario/"
        }
      ],
      "contraindications": [
        "Hipercalcemia",
        "Intoxicação digitálica (em pacientes intoxicados por Digoxina, infundir muito lentamente em 20–30 min diluído ou usar anticorpo anti-digoxina pelo risco teórico de hipertonia miocárdica)"
      ],
      "adverse_reactions": [
        "Bradicardia, vasodilatação e hipotensão se injetado rápido demais",
        "Sensação de calor e gosto de giz/metálico",
        "Irritação venosa ou calcificação subcutânea se extravasar"
      ],
      "drug_interactions": [
        "INCOMPATIBILIDADE FÍSICA ABSOLUTA com Bicarbonato de Sódio e Ceftriaxona!"
      ],
      "reviewed_at": "2026-10-26",
      "pregnancy_category": "Categoria C",
      "pregnancy_text": "Seguro e indicado na hipercalemia e intoxicação por sulfato de magnésio na gestante.",
      "hepatic_adjustment": "Não requer ajuste de dose.",
      "renal_adjustment": "Não requer ajuste na insuficiência renal; monitorar cálcio iônico."
    }
  },
  {
    "id": "seed-drug-alteplase",
    "name": "Alteplase (rt-PA — Activase / Actilyse)",
    "active_ingredient": "Alteplase",
    "therapeutic_class": "Antitrombóticos e Trombolíticos",
    "pharmacological_class": "Fibrinolítico ativador do plasminogênio tecidual recombinante",
    "data": {
      "status": "posology_verified",
      "therapeutic_class": "Antitrombóticos e Trombolíticos · Trombolítico Fibrino-Específico",
      "indication": "Trombólise endovenosa no AVC Isquêmico Agudo (janela de até 4,5 horas), Tromboembolismo Pulmonar (TEP) de Alto Risco (maciço com instabilidade hemodinâmica) e IAM com Supra de ST.",
      "diseases": [
        "AVC Isquêmico Agudo",
        "Tromboembolismo Pulmonar (TEP) Maciço / Alto Risco",
        "IAM com Supra de ST (IAMCSST)"
      ],
      "products": [
        {
          "name": "Actilyse",
          "type": "Hospitalar",
          "presentation": "Frasco-ampola 50 mg + 50 mL de diluente (1 mg/mL)"
        }
      ],
      "formulations": [
        {
          "label": "Pó liofilizado 50 mg/50 mL (1 mg/mL após reconstituição)",
          "dose_text": "1) AVC ISQUÊMICO AGUDO (<= 4,5h): Dose total = 0,9 mg/kg (DOSE MÁXIMA ABSOLUTA = 90 mg): administrar 10% da dose total em bolus IV em 1 minuto, e infundir os 90% restantes em BIC em exatos 60 minutos. 2) TEP DE ALTO RISCO (Instável): 100 mg IV em 2 horas (ou 10 mg bolus + 90 mg em 2h; em PCR iminente: 0,6 mg/kg em 15 min, máx 50 mg). 3) IAM COM SUPRA DE ST (Regime acelerado): 15 mg IV bolus + 0,75 mg/kg (máx 50 mg) em 30 min + 0,5 mg/kg (máx 35 mg) em 60 min (total máx 100 mg).",
          "interval_text": "Infusão única protocolada",
          "route": "Endovenosa (IV) exclusiva",
          "duration_text": "60 minutos (AVC), 90 minutos (IAM) ou 120 minutos (TEP)",
          "population": "Adultos",
          "max_daily_text": "90 mg no AVC isquêmico; 100 mg no TEP e IAM",
          "administration": "Reconstituir com o diluente próprio (água para injetáveis) formando 1 mg/mL sem agitar vigorosamente (evitar espuma).",
          "prescription_type": "Uso restrito hospitalar / Unidade de AVC / Sala Vermelha",
          "cautions": "No AVC isquêmico: manter PA < 185/110 mmHg ANTES de iniciar e <= 180/105 mmHg nas primeiras 24h; NÃO administrar AAS, clopidogrel ou heparinas nas primeiras 24h pós-Alteplase!",
          "source_url": "https://consultas.anvisa.gov.br/#/bulario/"
        }
      ],
      "contraindications": [
        "Hemorragia intracraniana ativa ou prévia em qualquer época",
        "AVC isquêmico ou TCE grave nos últimos 3 meses",
        "Neoplasia intracraniana intra-axial, MAV ou aneurisma roto",
        "Suspeita de Dissecção Aguda de Aorta ou sangramento interno ativo",
        "No AVC: PA >= 185/110 mmHg refratária, Plaquetas < 100.000/mm³, INR > 1,7, TTPa alargado ou uso de DOAC nas últimas 48h"
      ],
      "adverse_reactions": [
        "Transformação hemorrágica intracraniana (suspender infusão imediatamente se cefaleia súbita, vômitos ou queda >= 4 pts no NIHSS!)",
        "Sangramento sistêmico/gastrointestinal",
        "Angioedema orolingual (1–5%, mais comum em usuários de IECA)"
      ],
      "antidote": [
        "Sangramento intracraniano pós-rt-PA: suspender infusão imediatamente, TC de crânio urgente, Crioprecipitado 10 unidades IV (meta fibrinogênio > 150–200 mg/dL) + Ácido Tranexâmico 1 g IV em 10 min."
      ],
      "reviewed_at": "2026-10-26",
      "pregnancy_category": "Categoria C",
      "pregnancy_text": "Usar em TEP com choque e AVC isquêmico incapacitante materno quando benefício superar risco de sangramento.",
      "hepatic_adjustment": "Coagulopatia hepática grave e plaquetopenia < 100.000 são contraindicações formais ao trombolítico.",
      "renal_adjustment": "Não requer ajuste na insuficiência renal."
    }
  },
  {
    "id": "seed-drug-naloxona",
    "name": "Naloxona (Cloridrato de Naloxona)",
    "active_ingredient": "Naloxona",
    "therapeutic_class": "Antídotos e Toxicologia",
    "pharmacological_class": "Antagonista competitivo puro dos receptores opioides (mu, kappa e delta)",
    "data": {
      "status": "posology_verified",
      "therapeutic_class": "Antídotos e Toxicologia · Antídoto de Opioides",
      "indication": "Reversão da depressão respiratória e do sistema nervoso central induzida por superdosagem/intoxicação aguda por opioides (Morfina, Fentanil, Metadona, Tramadol, Oxicodona, Heroína).",
      "diseases": [
        "Intoxicação exógena por opioides",
        "Depressão respiratória pós-anestésica por opioide"
      ],
      "products": [
        {
          "name": "Narcan",
          "type": "Hospitalar",
          "presentation": "Ampola 0,4 mg/1 mL"
        }
      ],
      "formulations": [
        {
          "label": "Solução injetável 0,4 mg/1 mL",
          "dose_text": "1) DEPRESSÃO RESPIRATÓRIA EM USUÁRIO CRÔNICO DE OPIOIDE / PÓS-OPERATÓRIO (Titulação suave para restaurar FR >= 12 irpm sem desencadear crise de abstinência aguda!): Diluir 1 ampola (0,4 mg = 1 mL) em 9 mL de SF 0,9% (concentração = 0,04 mg/mL) e injetar 1 a 2 mL (0,04 a 0,08 mg) IV a cada 1 a 2 minutos até o paciente ventilar adequadamente. 2) APNEIA / PARADA RESPIRATÓRIA IMINENTE: 0,4 mg a 2 mg IV/IM/SC/Intranasal a cada 2 a 3 minutos (até máximo de 10 mg).",
          "interval_text": "Repetir a cada 2–3 minutos conforme frequência respiratória",
          "route": "Endovenosa (IV), Intramuscular (IM), Subcutânea (SC), Intraóssea ou Intranasal",
          "duration_text": "ATENÇÃO: A meia-vida da Naloxona (30 a 90 min) é MAIS CURTA que a da maioria dos opioides (especialmente Metadona e Morfina)! Se houver recorrência de sonolência/bradipneia, iniciar infusão contínua por hora equivalente a 2/3 da dose efetiva do bolus inicial.",
          "population": "Adultos e Pediatria (Pediatria: 0,01 a 0,1 mg/kg IV)",
          "max_daily_text": "Se sem resposta após 10 mg cumulativos, questionar o diagnóstico de intoxicação isolada por opioide",
          "administration": "Priorizar ventilação com bolsa-válvula-máscara (BVM) com O2 antes e durante a titulação da Naloxona.",
          "prescription_type": "Uso restrito hospitalar",
          "cautions": "O objetivo da Naloxona é restaurar a VENTILAÇÃO espontânea adequada (FR > 12 irpm), e não necessariamente acordar o paciente em agitação!",
          "source_url": "https://consultas.anvisa.gov.br/#/bulario/"
        }
      ],
      "contraindications": [
        "Hipersensibilidade à naloxona"
      ],
      "adverse_reactions": [
        "Síndrome de abstinência aguda precipitada por bolus excessivo (agitação intensa, vômitos com risco de broncoaspiração, taquicardia, hipertensão severa e edema agudo de pulmão catecolaminérgico)"
      ],
      "reviewed_at": "2026-10-26",
      "pregnancy_category": "Categoria B",
      "pregnancy_text": "Indicação mandatória na intoxicação por opioides materna com hipoventilação/coma.",
      "hepatic_adjustment": "Metabolismo hepático extenso; titular alíquotas baixas.",
      "renal_adjustment": "Não requer ajuste na insuficiência renal."
    }
  },
  {
    "id": "seed-drug-acetilcisteina",
    "name": "Acetilcisteína (NAC — Fluimucil Injetável)",
    "active_ingredient": "Acetilcisteína",
    "therapeutic_class": "Antídotos e Toxicologia",
    "pharmacological_class": "Doador de grupamentos sulfidrila (precursor de glutationa hepática) e mucolítico",
    "data": {
      "status": "posology_verified",
      "therapeutic_class": "Antídotos e Toxicologia · Antídoto do Paracetamol (Acetaminofeno)",
      "indication": "Antídoto específico para prevenção e tratamento da hepatotoxicidade aguda por superdosagem de Paracetamol (Acetaminofeno) — eficácia próxima a 100% se iniciada nas primeiras 8 horas da ingestão!",
      "diseases": [
        "Intoxicação aguda por Paracetamol (Acetaminofeno)",
        "Insuficiência hepática aguda induzida por paracetamol"
      ],
      "products": [
        {
          "name": "Fluimucil 10% Injetável",
          "type": "Hospitalar",
          "presentation": "Ampola 300 mg/3 mL (100 mg/mL)"
        }
      ],
      "formulations": [
        {
          "label": "Solução injetável 300 mg/3 mL (100 mg/mL)",
          "dose_text": "PROTOCOLO ENDOVENOSO DE 21 HORAS (Dose total = 300 mg/kg em 3 etapas): 1ª Etapa (Ataque): 150 mg/kg (máx. 15 g para >= 100 kg) diluídos em 200 mL de SG 5%, infundir em 60 minutos. 2ª Etapa: 50 mg/kg (máx. 5 g) diluídos em 500 mL de SG 5%, infundir em 4 horas (12,5 mg/kg/h). 3ª Etapa: 100 mg/kg (máx. 10 g) diluídos em 1.000 mL de SG 5%, infundir em 16 horas (6,25 mg/kg/h). (Nota: Para paciente de 70 kg: 1ª etapa = 10,5 g [35 ampolas]; 2ª etapa = 3,5 g [12 ampolas]; 3ª etapa = 7 g [23 ampolas]).",
          "interval_text": "Infusão sequencial contínua de 21 horas (prolongar 3ª etapa se TGO/TGP em elevação ou INR > 1,5)",
          "route": "Endovenosa (IV) ou Oral (Protocolo oral de 72h: ataque 140 mg/kg VO + 17 doses de 70 mg/kg VO de 4/4h)",
          "duration_text": "21 horas (protocolo IV) ou até queda de transaminases e INR < 1,5",
          "population": "Adultos, Gestantes e Pediatria",
          "max_daily_text": "Calculado para peso máximo de 100 kg",
          "administration": "Usar o Nomograma de Rumack-Matthew a partir de 4 horas da ingestão aguda única (>= 150 mg/kg ou >= 7,5–10 g). Se o nível sérico de paracetamol não ficar pronto até 8 horas da ingestão, iniciar NAC empiricamente!",
          "prescription_type": "Uso hospitalar",
          "cautions": "Pode causar reação anafilactoide não mediada por IgE (flushing, urticária, broncoespasmo) na 1ª hora da infusão rápida: se ocorrer, pausar por 30 min, administrar anti-histamínico/broncodilatador e reiniciar em velocidade mais lenta.",
          "source_url": "https://consultas.anvisa.gov.br/#/bulario/"
        }
      ],
      "contraindications": [
        "Nenhuma contraindicação absoluta na intoxicação potencialmente hepatotóxica por paracetamol"
      ],
      "adverse_reactions": [
        "Reação anafilactoide na 1ª hora (prurido, flushing, urticária, broncoespasmo)",
        "Náuseas e vômitos"
      ],
      "reviewed_at": "2026-10-26",
      "pregnancy_category": "Categoria B",
      "pregnancy_text": "Antídoto padrão ouro na intoxicação por paracetamol na gestante (prefine morte fetal por hepatotoxicidade).",
      "hepatic_adjustment": "Não requer ajuste; hepatoprotetor fundamental.",
      "renal_adjustment": "Não requer ajuste de dose."
    }
  },
  {
    "id": "seed-drug-flumazenil",
    "name": "Flumazenil (Lanexat)",
    "active_ingredient": "Flumazenil",
    "therapeutic_class": "Antídotos e Toxicologia",
    "pharmacological_class": "Antagonista competitivo específico do sítio benzodiazepínico no receptor GABA-A",
    "data": {
      "status": "posology_verified",
      "therapeutic_class": "Antídotos e Toxicologia · Antídoto de Benzodiazepínicos",
      "indication": "Reversão de sedação excessiva iatrogênica por benzodiazepínicos (Midazolam, Diazepam) após procedimentos diagnósticos/terapêuticos.",
      "diseases": [
        "Intoxicação iatrogênica aguda por benzodiazepínicos",
        "Reversão pós-sedação endoscópica/cirúrgica"
      ],
      "products": [
        {
          "name": "Lanexat / Genérico",
          "type": "Hospitalar",
          "presentation": "Ampola 0,5 mg/5 mL (0,1 mg/mL)"
        }
      ],
      "formulations": [
        {
          "label": "Solução injetável 0,5 mg/5 mL (0,1 mg/mL)",
          "dose_text": "Dose inicial: 0,2 mg (2 mL) IV administrados em 15 a 30 segundos. Se o nível de consciência desejado não for atingido após 60 segundos, administrar doses adicionais de 0,1 a 0,2 mg (1 a 2 mL) a cada 1 minuto até dose máxima acumulada de 1 mg a 2 mg.",
          "interval_text": "Titular a cada 1 minuto (início em 1–2 min; meia-vida curta de 45–60 min)",
          "route": "Endovenosa (IV) lenta",
          "duration_text": "Efeito dura 30 a 60 minutos (risco de ressedação se o benzodiazepínico for de longa ação!)",
          "population": "Adultos e Pediatria (Pediatria: 0,01 mg/kg IV em 15s, máx 0,2 mg/dose)",
          "max_daily_text": "1 a 2 mg acumulados",
          "administration": "Injetar lentamente em veia calibrosa e manter paciente em observação para ressedação por pelo menos 2 horas.",
          "prescription_type": "Uso restrito hospitalar (Lista C1)",
          "cautions": "CONTRAINDICADO na intoxicação exógena mista (especialmente com Antidepressivos Tricíclicos, Cocaína, Isoniazida ou Bupropiona) e em usuários crônicos de benzodiazepínicos ou epilépticos, pois precipita Estado de Mal Epiléptico refratário aos benzodiazepínicos!",
          "source_url": "https://consultas.anvisa.gov.br/#/bulario/"
        }
      ],
      "contraindications": [
        "Coingestão suspeita ou confirmada de Antidepressivos Tricíclicos ou pró-convulsivantes",
        "Uso crônico de benzodiazepínicos ou epilepsia em tratamento com benzodiazepínico",
        "Alargamento de QRS no ECG de triagem toxicológica"
      ],
      "adverse_reactions": [
        "Crises convulsivas refratárias e arritmias ventriculares (em intoxicação mista ou dependentes crônicos)",
        "Agitação, ansiedade, náuseas e vômitos",
        "Ressedação após 45–60 minutos"
      ],
      "reviewed_at": "2026-10-26",
      "pregnancy_category": "Categoria C",
      "pregnancy_text": "Usar com cautela em sedação induzida; contraindicado se uso crônico de benzodiazepínicos ou epilepsia.",
      "hepatic_adjustment": "Reduzir dose em insuficiência hepática grave devido à menor depuração.",
      "renal_adjustment": "Não requer ajuste na insuficiência renal."
    }
  },
  {
    "id": "seed-drug-propofol",
    "name": "Propofol (Diprivan) 1%",
    "active_ingredient": "Propofol",
    "therapeutic_class": "SRI, Sedação e Analgesia",
    "pharmacological_class": "Anestésico geral hipnótico agonista GABA-A em emulsão lipídica",
    "data": {
      "status": "posology_verified",
      "therapeutic_class": "SRI, Sedação e Analgesia · Hipnótico de Ação Ultracurta e Anticonvulsivante",
      "indication": "Indução anestésica em pacientes hemodinamicamente estáveis; sedação contínua em pacientes sob ventilação mecânica em UTI (despertar rápido); tratamento de 3ª linha no Estado de Mal Epiléptico refratário.",
      "diseases": [
        "Sedação contínua em Ventilação Mecânica (UTI)",
        "Indução anestésica",
        "Estado de Mal Epiléptico Refratário"
      ],
      "products": [
        {
          "name": "Diprivan / Propovan",
          "type": "Hospitalar",
          "presentation": "Ampola/frasco 200 mg/20 mL (10 mg/mL = 1%)"
        }
      ],
      "formulations": [
        {
          "label": "Emulsão injetável 10 mg/mL (1%) — 20 mL",
          "dose_text": "1) INDUÇÃO ANESTÉSICA (Apenas se estável hemodinamicamente!): 1,5 a 2,5 mg/kg IV lento (reduzir para 0,5–1 mg/kg em idosos/hipovolêmicos). 2) SEDAÇÃO CONTÍNUA EM UTI (Ventilação Mecânica): 0,3 a 3 mg/kg/h (5 a 50 mcg/kg/min) puro em BIC (Adulto 70 kg = iniciar a 5–10 mL/h e titular para RASS alvo; máx. 4 mg/kg/h). 3) ESTADO DE MAL EPILÉPTICO REFRATÁRIO: Ataque 1 a 2 mg/kg IV seguido de 1 a 4 mg/kg/h titulado por EEG.",
          "interval_text": "Início em 30 segundos; despertar rápido em 10–15 minutos após desligar a infusão",
          "route": "Endovenosa (IV) pura em bomba de infusão (trocar equipo a cada 12 horas pelo veículo lipídico!)",
          "duration_text": "Evitar doses > 4 mg/kg/h por > 48 horas pelo risco da Síndrome da Infusão do Propofol (PRIS)",
          "population": "Adultos (evitar sedação contínua prolongada em UTI pediátrica pelo risco de PRIS)",
          "max_daily_text": "Limite de segurança em UTI: <= 4 mg/kg/h (<= 67 mcg/kg/min)",
          "administration": "Infundir puro (fornece 1,1 kcal/mL de lipídios). NÃO possui efeito analgésico — associar sempre opioide (Fentanil) para controle de dor!",
          "prescription_type": "Uso restrito hospitalar (Lista C1)",
          "cautions": "Causa vasodilatação arterial/venosa acentuada e depressão miocárdica dose-dependente (hipotensão grave em pacientes hipovolêmicos ou sépticos!). Monitorar Triglicerídeos, CPK e lactato após 48h de uso.",
          "source_url": "https://consultas.anvisa.gov.br/#/bulario/"
        }
      ],
      "contraindications": [
        "Choque descompensado ou hipovolemia grave não corrigida (preferir Cetamina ou Etomidato na indução)",
        "Hipertrigliceridemia grave (> 500–1.000 mg/dL)"
      ],
      "adverse_reactions": [
        "Hipotensão arterial acentuada e apneia",
        "Síndrome da Infusão do Propofol (PRIS — acidose metabólica grave, rabdomiólise, hipercalemia, hepatomegalia, hipertrigliceridemia e falência cardíaca/Brugada-like em doses > 4 mg/kg/h por > 48h)",
        "Dor queimação à injeção periférica"
      ],
      "reviewed_at": "2026-10-26",
      "pregnancy_category": "Categoria B",
      "pregnancy_text": "Seguro na indução anestésica em cesariana; evitar infusão prolongada pelo risco de síndrome de infusão do propofol.",
      "hepatic_adjustment": "Reduzir dose e titular lentamente em cirrose descompensada.",
      "renal_adjustment": "Não requer ajuste na insuficiência renal."
    }
  },
  {
    "id": "seed-drug-midazolam",
    "name": "Midazolam (Dormonid)",
    "active_ingredient": "Midazolam",
    "therapeutic_class": "SRI, Sedação e Analgesia",
    "pharmacological_class": "Benzodiazepínico de ação curta agonista alostérico GABA-A",
    "data": {
      "status": "posology_verified",
      "therapeutic_class": "SRI, Sedação e Analgesia · Benzodiazepínico Parenteral e Anticonvulsivante",
      "indication": "Primeira linha por via Intramuscular (10 mg IM) no Estado de Mal Epiléptico sem acesso venoso; infusão contínua no Estado de Mal Epiléptico refratário; ansiólise/sedação para procedimentos e sedação profunda em ventilação mecânica.",
      "diseases": [
        "Estado de Mal Epiléptico (EME)",
        "Sedação para procedimentos",
        "Sedação em Ventilação Mecânica"
      ],
      "products": [
        {
          "name": "Dormonid / Genérico",
          "type": "Hospitalar Controlado",
          "presentation": "Ampolas 15 mg/3 mL (5 mg/mL), 50 mg/10 mL (5 mg/mL) e 5 mg/5 mL (1 mg/mL)"
        }
      ],
      "formulations": [
        {
          "label": "Solução injetável 50 mg/10 mL (5 mg/mL) e 15 mg/3 mL (5 mg/mL)",
          "dose_text": "1) ESTADO DE MAL EPILÉPTICO SEM ACESSO VENOSO (1ª linha): 10 mg IM em dose única no vasto lateral (5 mg IM se peso entre 13 e 40 kg; 0,2 mg/kg IM). 2) SEDAÇÃO LEVE PARA PROCEDIMENTOS: 1 a 2,5 mg IV lento a cada 2–3 min (idosos: 0,5 a 1 mg IV). 3) INFUSÃO CONTÍNUA EM UTI / EME REFRATÁRIO: 0,02 a 0,2 mg/kg/h IV (no EME refratário: ataque 0,2 mg/kg seguido de 0,05 a 2 mg/kg/h). Diluição padrão UTI (1 mg/mL): 2 ampolas de 50 mg (100 mg = 20 mL) + 80 mL de SF 0,9% ou SG 5%.",
          "interval_text": "Início IV em 2–3 min; IM em 5–10 min",
          "route": "Endovenosa (IV), Intramuscular (IM) ou Intranasal",
          "duration_text": "Menor tempo possível em UTI (acumula no tecido adiposo e metabólito ativo na insuficiência renal, aumentando tempo de VM e Delirium!)",
          "population": "Adultos e Pediatria",
          "max_daily_text": "Titulado conforme escala RASS ou supressão de crises no EEG",
          "administration": "Atenção às duas concentrações comerciais: ampola de 5 mg/5 mL tem 1 mg/mL, enquanto as ampolas de 15 mg/3 mL e 50 mg/10 mL têm 5 mg/mL!",
          "prescription_type": "Notificação de Receita B1 (Azul) / Uso hospitalar",
          "cautions": "Na insuficiência renal e em obesos sob infusão prolongada (> 48h), o metabólito ativo (1-hidroximidazolam) acumula intensamente, atrasando o despertar por vários dias.",
          "source_url": "https://consultas.anvisa.gov.br/#/bulario/"
        }
      ],
      "contraindications": [
        "Glaucoma de ângulo fechado agudo",
        "Intoxicação alcoólica aguda com depressão de sinais vitais",
        "Miastenia Gravis não intubada"
      ],
      "renal_adjustment": "Reduzir dose de infusão contínua em 50% se ClCr < 30 mL/min pelo acúmulo do metabólito ativo glucuronídeo.",
      "adverse_reactions": [
        "Depressão respiratória e apneia (especialmente quando associado a Fentanil/opioides)",
        "Hipotensão arterial",
        "Delirium em UTI e despertar prolongado"
      ],
      "antidote": [
        "Flumazenil 0,2 mg IV em 15s (repetir 0,1 mg/min até 1 mg) — NÃO usar em pacientes epilépticos ou no tratamento de status epilepticus!"
      ],
      "reviewed_at": "2026-10-26",
      "pregnancy_category": "Categoria D (Evitar no 1º trimestre se eletivo)",
      "pregnancy_text": "Uso de emergência permitido em crises convulsivas refratárias e intubação orotraqueal.",
      "hepatic_adjustment": "Reduzir dose em 50% em insuficiência hepática avançada (meia-vida prolongada)."
    }
  },
  {
    "id": "seed-drug-fentanil",
    "name": "Fentanil (Citrato de Fentanila)",
    "active_ingredient": "Fentanil",
    "therapeutic_class": "SRI, Sedação e Analgesia",
    "pharmacological_class": "Analgesia opioide sintética potente agonista mu (100x mais potente que a morfina)",
    "data": {
      "status": "posology_verified",
      "therapeutic_class": "SRI, Sedação e Analgesia · Analgésico Opioide de Ação Rápida",
      "indication": "Analgesia de 1ª linha em pacientes sob ventilação mecânica em UTI (abordagem Analgosedação / PADIS), pré-tratamento simpaticolítico na SRI, dor aguda intensa em instabilidade hemodinâmica (não libera histamina!) e sedoanalgesia para procedimentos.",
      "diseases": [
        "Analgesia em Ventilação Mecânica (UTI)",
        "Dor aguda grave no politrauma / instável",
        "Pré-tratamento na SRI e Cardioversão Elétrica"
      ],
      "products": [
        {
          "name": "Fentanil / Genérico",
          "type": "Hospitalar Controlado",
          "presentation": "Ampolas 50 mcg/mL (2 mL = 100 mcg; 5 mL = 250 mcg; 10 mL = 500 mcg)"
        }
      ],
      "formulations": [
        {
          "label": "Solução injetável 50 mcg/mL (ampolas de 2 mL, 5 mL e 10 mL)",
          "dose_text": "1) DOR AGUDA / PROCEDIMENTO / CARDIOVERSÃO: 0,5 a 1,5 mcg/kg IV lento em 2–3 min (Adulto 70 kg = 50 a 100 mcg = 1 a 2 mL IV lento). 2) PRÉ-TRATAMENTO NA SRI (3 min antes do indutor, se sem choque): 2 a 3 mcg/kg IV lento (150 mcg = 3 mL). 3) ANALGESIA CONTÍNUA EM UTI: 0,5 a 2 mcg/kg/h (35 a 150 mcg/h). Pode correr puro (50 mcg/mL: 1 a 3 mL/h) ou diluído (4 ampolas de 10 mL [2.000 mcg = 40 mL] + 160 mL SF 0,9% = 10 mcg/mL -> correr 3,5 a 15 mL/h).",
          "interval_text": "Início de ação imediato (1 a 2 minutos); duração do bolus de 30 a 60 minutos",
          "route": "Endovenosa (IV)",
          "duration_text": "Titular pela escala de dor (BPS / CPOT / EVA) e fazer despertar diário",
          "population": "Adultos e Pediatria",
          "max_daily_text": "Titulado conforme resposta analgésica e ventilatória",
          "administration": "Injetar SEMPRE lentamente (em 2 a 3 minutos)! A injeção em bolus rápido de doses altas causa a 'Síndrome do Tórax Rígido' (rigidez da parede torácica e glótica que impede até a ventilação com ambu!).",
          "prescription_type": "Notificação de Receita A (Amarela) / Uso hospitalar",
          "cautions": "Diferente da Morfina, o Fentanil NÃO libera histamina (mais estável hemodinamicamente no trauma/choque) e NÃO gera metabólitos ativos nefrotóxicos na insuficiência renal!",
          "source_url": "https://consultas.anvisa.gov.br/#/bulario/"
        }
      ],
      "contraindications": [
        "Depressão respiratória grave em paciente sem suporte ventilatório"
      ],
      "renal_adjustment": "Opioide de escolha na insuficiência renal grave / diálise (não acumula metabólitos ativos como a morfina-6-glucuronídeo).",
      "adverse_reactions": [
        "Depressão respiratória e apneia",
        "Rigidez muscular torácica/laríngea ('Tórax Rígido') se injetado em bolus rápido (tratada com bloqueador neuromuscular como Rocurônio/Succinilcolina ou Naloxona)",
        "Bradicardia vagal",
        "Constipação e íleo paralítico"
      ],
      "antidote": [
        "Naloxona 0,04 a 0,4 mg IV titulada a cada 2 minutos."
      ],
      "reviewed_at": "2026-10-26",
      "pregnancy_category": "Categoria C",
      "pregnancy_text": "Opioide de escolha em analgesia de parto e anestesia cirúrgica materna.",
      "hepatic_adjustment": "Depuração hepática reduzida em cirrose; titular com cautela e monitorar sedação."
    }
  },
  {
    "id": "seed-drug-enoxaparina",
    "name": "Enoxaparina Sódica (Clexane)",
    "active_ingredient": "Enoxaparina Sódica",
    "therapeutic_class": "Antitrombóticos e Trombolíticos",
    "pharmacological_class": "Heparina de Baixo Peso Molecular (HBPM — inibidora preferencial do Fator Xa)",
    "data": {
      "status": "posology_verified",
      "therapeutic_class": "Antitrombóticos e Trombolíticos · Anticoagulante Parenteral (HBPM)",
      "indication": "Profilaxia de Tromboembolismo Venoso (TEV) em pacientes clínicos e cirúrgicos; anticoagulação plena no tratamento de TVP, TEP e Síndromes Coronarianas Agudas (IAMCSST e SCASSST); anticoagulante de escolha na gestação.",
      "diseases": [
        "Trombose Venosa Profunda (TVP) e TEP",
        "Síndrome Coronariana Aguda (IAM)",
        "Profilaxia de TEV hospitalar",
        "Anticoagulação na Gestação"
      ],
      "products": [
        {
          "name": "Clexane / Versa",
          "type": "Hospitalar / Ambulatorial",
          "presentation": "Seringas preenchidas 20 mg/0,2 mL, 40 mg/0,4 mL, 60 mg/0,6 mL, 80 mg/0,8 mL e 100 mg/1,0 mL"
        }
      ],
      "formulations": [
        {
          "label": "Seringas preenchidas SC (20 mg, 40 mg, 60 mg, 80 mg e 100 mg)",
          "dose_text": "1) PROFILAXIA DE TEV (Clínico/Cirúrgico): 40 mg SC 1x ao dia (Se ClCr < 30 mL/min: reduzir para 20 mg SC 1x ao dia!). 2) ANTICOAGULAÇÃO PLENA (TVP, TEP, SCASSST): 1 mg/kg SC de 12 em 12 horas (ou 1,5 mg/kg SC 1x/dia em TVP não complicada). Se ClCr entre 15 e 29 mL/min: reduzir anticoagulação plena para 1 mg/kg SC 1x ao dia (de 24/24h)! 3) IAM COM SUPRA DE ST (Fibrinólise): < 75 anos: bolus de 30 mg IV + 1 mg/kg SC 12/12h; >= 75 anos: SEM bolus IV, fazer 0,75 mg/kg SC 12/12h.",
          "interval_text": "24/24h (profilaxia ou ajuste renal) ou 12/12h (anticoagulação plena)",
          "route": "Subcutânea (SC) no tecido celular subcutâneo da parede abdominal anterolateral (alternando lados)",
          "duration_text": "Conforme protocolo clínico",
          "population": "Adultos e Gestantes (1ª escolha na gravidez — não atravessa a barreira placentária!)",
          "max_daily_text": "No IAMCSST, limitar as duas primeiras doses SC a no máximo 100 mg cada",
          "administration": "Não expulsar a bolha de ar da seringa antes da aplicação subcutânea e não massagear o local após a injeção (evita hematoma).",
          "prescription_type": "Receita branca comum",
          "cautions": "SEMPRE calcular o Clearance de Creatinina (Cockcroft-Gault) antes de prescrever! Em ClCr < 30 mL/min, a meia-vida aumenta drasticamente com alto risco de sangramento retroperitoneal fatal se mantida de 12/12h!",
          "source_url": "https://consultas.anvisa.gov.br/#/bulario/"
        }
      ],
      "contraindications": [
        "Sangramento maior ativo",
        "História de Plaquetopenia Induzida por Heparina (HIT) recente",
        "Punção lombar/anestesia neuroaxial planejada nas próximas 12h (se dose profilática) ou 24h (se dose plena)"
      ],
      "renal_adjustment": "OBRIGATÓRIO se ClCr 15–29 mL/min: Profilaxia = 20 mg SC 1x/dia; Anticoagulação plena = 1 mg/kg SC 1x/dia (24/24h). Se ClCr < 15 mL/min / Diálise: preferir Heparina Não Fracionada.",
      "adverse_reactions": [
        "Sangramento e hematomas no sítio de aplicação",
        "Trombocitopenia induzida por heparina (HIT — incidência muito menor que a HNF)",
        "Elevação transitória assintomática de transaminases"
      ],
      "antidote": [
        "Reversão parcial (~60% da atividade anti-Xa): Sulfato de Protamina IV (se a enoxaparina foi aplicada há < 8 horas: 1 mg de Protamina — 0,1 mL — para cada 1 mg de Enoxaparina; se entre 8 e 12h: 0,5 mg de Protamina para cada 1 mg de Enoxaparina)."
      ],
      "pregnancy_category": "Categoria B — Segura (1ª escolha na Gestação e Lactação)",
      "pregnancy_text": "Anticoagulante de escolha em gestantes (não atravessa a placenta e não causa teratogenicidade).",
      "reviewed_at": "2026-10-26",
      "hepatic_adjustment": "Usar com cautela se coagulopatia associada."
    }
  },
  {
    "id": "seed-drug-ceftriaxona",
    "name": "Ceftriaxona (Rocefin)",
    "active_ingredient": "Ceftriaxona",
    "therapeutic_class": "Antimicrobianos",
    "pharmacological_class": "Cefalosporina de 3ª geração bactericida (beta-lactâmico)",
    "data": {
      "status": "posology_verified",
      "therapeutic_class": "Antimicrobianos · Cefalosporina de 3ª Geração",
      "indication": "Pneumonia adquirida na comunidade (PAC) internada, Pielonefrite aguda / Sepse de foco urinário, Meningite bacteriana aguda (em dose dobrada), Infecções intra-abdominais/biliares (associada a Metronidazol), Profilaxia de PBE na HDA do cirrótico e Gonorreia/Sífilis.",
      "diseases": [
        "Pneumonia Comunitária Grave (PAC)",
        "Pielonefrite e Sepse Urinária",
        "Meningite Bacteriana Aguda",
        "Profilaxia na Hemorragia Digestiva Alta Varicosa",
        "Uretrite / Cervicite Gonocócica"
      ],
      "products": [
        {
          "name": "Rocefin / Triaxon",
          "type": "Hospitalar / IM",
          "presentation": "Frasco-ampola 1 g IV ou IM"
        }
      ],
      "formulations": [
        {
          "label": "Pó para solução injetável 1 g (IV ou IM)",
          "dose_text": "1) DOSE PADRÃO ADULTO (PAC, Pielonefrite, Sepse abdominal, HDA no cirrótico): 1 g a 2 g IV a cada 24 horas. 2) MENINGITE BACTERIANA AGUDA (Dose Meníngea Dobrada Obrigatória!): 2 g IV de 12 em 12 horas (4 g/dia). 3) URETRITE / CERVICITE GONOCÓCICA: 500 mg IM em dose única (+ Azitromicina 1 g VO).",
          "interval_text": "24/24h (infecções sistêmicas gerais) ou 12/12h (Meningite e Endocardite)",
          "route": "Endovenosa (IV) diluída em 50–100 mL de SF 0,9% ou SG 5% em 30 min, ou Intramuscular profunda",
          "duration_text": "5 a 14 dias conforme foco infeccioso",
          "population": "Adultos, Gestantes e Pediatria (> 28 dias de vida: 50–100 mg/kg/dia)",
          "max_daily_text": "4 g/dia (2 g de 12/12h)",
          "administration": "JAMAIS diluir ou administrar simultaneamente na mesma linha venosa com soluções contendo CÁLCIO (Ringer Lactato, Gluconato de Cálcio, Nutrição Parenteral), pelo risco de precipitação intravascular de ceftriaxona cálcica nos pulmões e rins!",
          "prescription_type": "Receita de controle antimicrobiano / Uso hospitalar",
          "cautions": "NÃO possui atividade contra Pseudomonas aeruginosa, Enterococcus spp. nem Listeria monocytogenes (na meningite em > 50 anos, associar Ampicilina!).",
          "source_url": "https://consultas.anvisa.gov.br/#/bulario/"
        }
      ],
      "contraindications": [
        "Recém-nascidos hiperbilirrubinêmicos (especialmente prematuros — desloca a bilirrubina da albumina causando Kernicterus!)",
        "Recém-nascidos (<= 28 dias) que necessitem de qualquer solução endovenosa contendo cálcio",
        "Alergia anafilática grave a cefalosporinas ou penicilinas"
      ],
      "renal_adjustment": "NÃO requer ajuste de dose na insuficiência renal isolada (até 2 g/dia), pois possui dupla excreção (renal 50–60% e biliar 40–50%)!",
      "adverse_reactions": [
        "Pseudolitíase biliar (barro biliar reversível)",
        "Diarreia / Colite por Clostridioides difficile",
        "Reações de hipersensibilidade"
      ],
      "pregnancy_category": "Categoria B — Segura na Gestação",
      "reviewed_at": "2026-10-26",
      "hepatic_adjustment": "Não requer ajuste isolado; excreção biliar e renal equilibradas (ajustar apenas se falência hepatorrenal combinada)."
    }
  },
  {
    "id": "seed-drug-piperacilina-tazobactam",
    "name": "Piperacilina + Tazobactam (Tazocin)",
    "active_ingredient": "Piperacilina + Tazobactam",
    "therapeutic_class": "Antimicrobianos",
    "pharmacological_class": "Penicilina antipseudomonas de amplo espectro + inibidor de beta-lactamase",
    "data": {
      "status": "posology_verified",
      "therapeutic_class": "Antimicrobianos · Beta-lactâmico Antipseudomonas e Anaeróbios",
      "indication": "Sepse e Choque Séptico de foco abdominal, pulmonar nosocomial (PAV/PAH), urinário complicado, pé diabético grave, fasciíte necrosante e Neutropenia Febril de alto risco.",
      "diseases": [
        "Sepse abdominal / Peritonite / Colangite",
        "Pneumonia Nosocomial e Associada à Ventilação Mecânica (PAV)",
        "Neutropenia Febril",
        "Infecções de pele e partes moles graves"
      ],
      "products": [
        {
          "name": "Tazocin / Genérico",
          "type": "Hospitalar",
          "presentation": "Frasco-ampola 4,5 g (4 g Piperacilina + 0,5 g Tazobactam)"
        }
      ],
      "formulations": [
        {
          "label": "Pó liofilizado injetável 4,5 g (4 g + 0,5 g)",
          "dose_text": "DOSE ADULTO (Função renal normal > 40 mL/min): 4,5 g IV de 6 em 6 horas (18 g/dia, obrigatório para cobertura de Pseudomonas, Pneumonia Nosocomial e Neutropenia Febril) ou 4,5 g IV de 8 em 8 horas (infecções intra-abdominais moderadas). ESTRATÉGIA DE INFUSÃO ESTENDIDA EM SEPSE/UTI: Fazer a 1ª dose de 4,5 g em 30 min (ataque) e as doses seguintes de 4,5 g em infusão prolongada de 3 a 4 horas a cada 6h ou 8h (otimiza o tempo acima da CIM - %fT>MIC!).",
          "interval_text": "6/6h ou 8/8h (ou conforme clearance de creatinina)",
          "route": "Endovenosa (IV) diluída em 100 mL de SF 0,9% ou SG 5%",
          "duration_text": "7 a 14 dias conforme foco e descalonamento guiado por culturas",
          "population": "Adultos e Pediatria (> 2 meses)",
          "max_daily_text": "18 g/dia (4,5 g de 6/6h)",
          "administration": "Possui excelente cobertura para Gram-negativos (incluindo Pseudomonas), Gram-positivos (estreptococos, Enterococcus faecalis) e Anaeróbios (dispensa associar Metronidazol!).",
          "prescription_type": "Uso restrito hospitalar",
          "cautions": "Cuidado ao associar com Vancomicina empírica por > 48–72h: a combinação Vancomicina + Piperacilina-Tazobactam aumenta sinergicamente a incidência de Lesão Renal Aguda (descalonar assim que saírem as culturas!).",
          "source_url": "https://consultas.anvisa.gov.br/#/bulario/"
        }
      ],
      "contraindications": [
        "Alergia grave (anafilaxia / síndrome de Stevens-Johnson) a penicilinas, cefalosporinas ou inibidores de beta-lactamase"
      ],
      "renal_adjustment": "Ajuste para dose padrão: ClCr 20 a 40 mL/min = 2,25 g IV de 6/6h (ou 3,375 g 6/6h se pneumonia nosocomial). ClCr < 20 mL/min = 2,25 g IV de 8/8h. Hemodiálise = 2,25 g de 12/12h (ou 8/8h se nosocomial) + dose suplementar de 0,75 g após cada sessão de HD.",
      "adverse_reactions": [
        "Nefrotoxicidade (especialmente se associado à Vancomicina)",
        "Diarreia / Colite pseudomembranosa",
        "Plaquetopenia e leucopenia em uso prolongado (> 2 semanas)",
        "Neurotoxicidade/convulsões se não ajustado na insuficiência renal"
      ],
      "drug_interactions": [
        "Incompatível em Y com Aminoglicosídeos (Amicacina/Gentamicina) e Ringer Lactato; monitorar função renal diariamente se associado à Vancomicina"
      ],
      "reviewed_at": "2026-10-26",
      "pregnancy_category": "Categoria B",
      "pregnancy_text": "Seguro na gestação para infecções intra-abdominais e sepse hospitalar grave.",
      "hepatic_adjustment": "Não requer ajuste de dose."
    }
  },
  {
    "id": "seed-drug-meropenem",
    "name": "Meropenem",
    "active_ingredient": "Meropenem",
    "therapeutic_class": "Antimicrobianos",
    "pharmacological_class": "Carbapenêmico de amplo espectro (Beta-lactâmico antipseudomonas e ESBL)",
    "data": {
      "status": "posology_verified",
      "therapeutic_class": "Antimicrobianos · Carbapenêmico",
      "indication": "Infecções graves/sepse por bacilos Gram-negativos produtores de ESBL ou AmpC, Pseudomonas aeruginosa resistente, meningite bacteriana nosocomial, neutropenia febril de alto risco e infecções intra-abdominais graves.",
      "diseases": [
        "Sepse e Choque Séptico por ESBL / Multirresistentes",
        "Pneumonia Associada à Ventilação Mecânica (PAV)",
        "Meningite Bacteriana Nosocomial / Pós-Neurocirúrgica",
        "Neutropenia Febril"
      ],
      "products": [
        {
          "name": "Meronem / Genérico",
          "type": "Hospitalar",
          "presentation": "Frasco-ampola 500 mg e 1 g"
        }
      ],
      "formulations": [
        {
          "label": "Pó para solução injetável 1 g",
          "dose_text": "1) DOSE PADRÃO (Sepse, PAV, Intra-abdominal, ESBL): 1 g IV de 8 em 8 horas. 2) DOSE DOBRADA (Meningite bacteriana, Pseudomonas com MIC elevada, Fibrose Cística): 2 g IV de 8 em 8 horas (6 g/dia). INFUSÃO ESTENDIDA EM UTI: Fazer 1ª dose em 30 min e doses subsequentes em infusão prolongada de 3 horas a cada 8h.",
          "interval_text": "8/8h (ajustar se ClCr <= 50 mL/min)",
          "route": "Endovenosa (IV) diluída em 100 mL de SF 0,9% ou SG 5%",
          "duration_text": "7 a 14 dias conforme foco e culturas",
          "population": "Adultos e Pediatria (> 3 meses: 20 a 40 mg/kg de 8/8h)",
          "max_daily_text": "6 g/dia (2 g de 8/8h)",
          "administration": "Excelente cobertura para Gram-negativos (ESBL, AmpC, Pseudomonas), Gram-positivos sensíveis e Anaeróbios (dispensa associar Metronidazol!).",
          "prescription_type": "Uso restrito hospitalar",
          "cautions": "NÃO cobre MRSA, Enterococcus faecium (VRE) nem Stenotrophomonas maltophilia! Reduz drasticamente (em 60–90%) os níveis séricos de Ácido Valproico — alto risco de crise convulsiva em epilépticos usuários de valproato!",
          "source_url": "https://consultas.anvisa.gov.br/#/bulario/"
        }
      ],
      "contraindications": [
        "Alergia anafilática grave a carbapenêmicos ou beta-lactâmicos"
      ],
      "renal_adjustment": "Ajuste para dose padrão (1 g): ClCr 26 a 50 mL/min = 1 g IV de 12/12h; ClCr 10 a 25 mL/min = 500 mg IV de 12/12h; ClCr < 10 mL/min ou Hemodiálise = 500 mg IV a cada 24h (administrar após a sessão de HD).",
      "adverse_reactions": [
        "Diarreia / Colite por C. difficile",
        "Tromboflebite no local da infusão",
        "Convulsões (menor potencial epileptogênico que o Imipenem, mas exige ajuste renal)"
      ],
      "drug_interactions": [
        "Ácido Valproico / Divalproato de Sódio (queda abrupta e grave da valproemia em 24h — substituir anticonvulsivante!)"
      ],
      "reviewed_at": "2026-10-26",
      "pregnancy_category": "Categoria B",
      "pregnancy_text": "Carbapenêmico de escolha na gestação em infecções graves por Gram-negativos multirresistentes (ESBL).",
      "hepatic_adjustment": "Não requer ajuste de dose."
    }
  },
  {
    "id": "seed-drug-vancomicina",
    "name": "Vancomicina (Cloridrato de Vancomicina)",
    "active_ingredient": "Vancomicina",
    "therapeutic_class": "Antimicrobianos",
    "pharmacological_class": "Glicopeptídeo tricíclico bactericida (Inibidor da parede celular de Gram-positivos)",
    "data": {
      "status": "posology_verified",
      "therapeutic_class": "Antimicrobianos · Glicopeptídeo Anti-MRSA",
      "indication": "Infecções graves por Staphylococcus aureus resistente à meticilina/oxacilina (MRSA), Staphylococcus coagulase-negativo, Enterococcus resistente à ampicilina, meningite pneumocócica empiricamente e colite grave por Clostridioides difficile (via oral).",
      "diseases": [
        "Bacteremia e Endocardite por MRSA",
        "Pneumonia Nosocomial / PAV com risco de MRSA",
        "Meningite Bacteriana Aguda",
        "Infecção de Corrente Sanguínea associada a Cateter",
        "Colite Pseudomembranosa (Uso Oral)"
      ],
      "products": [
        {
          "name": "Vancocina / Genérico",
          "type": "Hospitalar",
          "presentation": "Frasco-ampola 500 mg e 1 g"
        }
      ],
      "formulations": [
        {
          "label": "Pó liofilizado injetável 500 mg",
          "dose_text": "1) DOSE DE ATAQUE (Sepse / Choque Séptico / Meningite / Pneumonia grave): 25 a 30 mg/kg IV (peso real, máx. 3 g) infundidos lentamente a <= 15 mg/min. 2) MANUTENÇÃO: 15 a 20 mg/kg IV a cada 8 a 12 horas, guiada por vancocinemia (meta de AUC/MIC 400–600 ou vale sérico de 15–20 mcg/mL antes da 4ª dose em infecções graves). 3) COLITE POR C. DIFFICILE: 125 mg a 500 mg diluídos por VIA ORAL / SNE de 6 em 6 horas por 10 dias.",
          "interval_text": "8/8h ou 12/12h (ou conforme função renal e vancocinemia)",
          "route": "Endovenosa (IV) lenta (NUNCA em bolus ou IM!) ou Via Oral exclusiva para colite por C. difficile",
          "duration_text": "7 a 42 dias conforme foco (endocardite/osteomielite exigem 4–6 semanas)",
          "population": "Adultos e Pediatria (10 a 15 mg/kg/dose de 6/6h)",
          "max_daily_text": "4 g/dia (salvo monitorização sérica estrita)",
          "administration": "Diluir cada 500 mg em pelo menos 100 mL de SF 0,9% ou SG 5% (conc. máx. <= 5 mg/mL em acesso periférico). Infundir em no mínimo 60 minutos (para doses > 1 g, infundir em 90 a 120 minutos para evitar Síndrome da Infusão da Vancomicina / Red Man!).",
          "prescription_type": "Uso restrito hospitalar",
          "cautions": "Cobre EXCLUSIVAMENTE bactérias Gram-positivas (não tem nenhuma ação contra Gram-negativos!). A vancomicina IV não é excretada no lúmen intestinal (não trata C. difficile por via IV; para colite, administrar por via oral/enteral).",
          "source_url": "https://consultas.anvisa.gov.br/#/bulario/"
        }
      ],
      "contraindications": [
        "Hipersensibilidade grave conhecida à vancomicina"
      ],
      "renal_adjustment": "Obrigatório ajuste pela função renal e nível sérico (vancocinemia): ClCr 30–50 mL/min = 15 mg/kg de 24/24h; ClCr 10–29 mL/min = 15 mg/kg a cada 48h ou guiado por nível sérico; Hemodiálise = ataque 20–25 mg/kg e manutenção de 7,5–10 mg/kg após cada sessão de HD.",
      "adverse_reactions": [
        "Reação de infusão por liberação de histamina (prurido, eritema em face/pescoço/tronco e hipotensão se infundida rápido)",
        "Nefrotoxicidade (potencializada por aminoglicosídeos, anfotericina B e piperacilina-tazobactam)",
        "Ototoxicidade",
        "Flebite química intensa"
      ],
      "antidote": [
        "Reação de infusão (Red Man): pausar a infusão, administrar anti-histamínico (Difenidramina 25–50 mg IV ou Prometazina) + SF 0,9% se hipotensão, e reiniciar na metade da velocidade (em 2h) após resolução."
      ],
      "reviewed_at": "2026-10-26",
      "pregnancy_category": "Categoria C",
      "pregnancy_text": "Glicopeptídeo indicado em infecções graves maternas por MRSA comprovado.",
      "hepatic_adjustment": "Não requer ajuste de dose."
    }
  },
  {
    "id": "seed-drug-amoxicilina-clavulanato",
    "name": "Amoxicilina + Clavulanato de Potássio",
    "active_ingredient": "Amoxicilina + Ácido Clavulânico",
    "therapeutic_class": "Antimicrobianos",
    "pharmacological_class": "Aminopenicilina + Inibidor de beta-lactamase",
    "data": {
      "status": "posology_verified",
      "therapeutic_class": "Antimicrobianos · Penicilina + Inibidor de Beta-lactamase",
      "indication": "Pneumonia adquirida na comunidade (com comorbidades), exacerbação de DPOC, rinossinusite bacteriana aguda, otite média aguda, mordeduras animais/humanas, infecção odontogênica grave, pé diabético leve/moderado e ITU.",
      "diseases": [
        "Pneumonia Adquirida na Comunidade (PAC)",
        "Exacerbação de DPOC",
        "Rinossinusite e Otite Média Aguda",
        "Mordedura de cão/gato/humana",
        "Infecções odontogênicas e cervicais"
      ],
      "products": [
        {
          "name": "Clavulin / Clavulin BD / Genérico",
          "type": "Farmácia / Hospitalar",
          "presentation": "Comp. 875/125 mg (12/12h), Comp. 500/125 mg (8/8h), Frasco-ampola IV 1 g + 200 mg"
        }
      ],
      "formulations": [
        {
          "label": "Comprimido revestido 875 mg + 125 mg (VO) e Frasco-ampola 1 g + 200 mg (IV)",
          "dose_text": "1) VIA ORAL (Adultos): 875/125 mg VO de 12 em 12 horas (preferencial — menor incidência de diarreia!) OU 500/125 mg VO de 8 em 8 horas por 5 a 10 dias. 2) VIA ENDOVENOSA (Hospitalar): 1 g + 200 mg IV de 8 em 8 horas (diluído em 50–100 mL de SF 0,9% em 30 min — NÃO diluir em SG 5% nem bicarbonato!). 3) PEDIATRIA: 50 a 90 mg/kg/dia (baseado no componente Amoxicilina) divididos de 12/12h.",
          "interval_text": "12/12h (apresentação BD 875/125 mg) ou 8/8h (500/125 mg VO e 1,2 g IV)",
          "route": "Via Oral (junto ao início das refeições para reduzir intolerância gástrica) ou Endovenosa",
          "duration_text": "5 a 7 dias (PAC/DPOC), 5 a 10 dias (Sinusite/Celulite/Mordedura)",
          "population": "Adultos, Gestantes (Categoria B) e Pediatria",
          "max_daily_text": "3 g de amoxicilina / 600 mg de ácido clavulânico por dia",
          "administration": "Atenção: 2 comprimidos de 250/125 mg NÃO equivalem a 1 comprimido de 500/125 mg (pois dobram a dose de clavulanato e causam diarreia intensa).",
          "prescription_type": "Receita de controle antimicrobiano em 2 vias",
          "cautions": "Cobre S. pneumoniae, H. influenzae produtor de beta-lactamase, Moraxella catarrhalis, MSSA, Enterococcus faecalis, Pasteurella multocida e Anaeróbios (inclusive Bacteroides). Não cobre Pseudomonas nem MRSA.",
          "source_url": "https://consultas.anvisa.gov.br/#/bulario/"
        }
      ],
      "contraindications": [
        "Alergia grave a penicilinas",
        "Histórico prévio de icterícia colestática/hepatotoxicidade induzida por amoxicilina-clavulanato"
      ],
      "renal_adjustment": "ClCr 10 a 30 mL/min: 500/125 mg VO de 12/12h (evitar apresentação 875/125 mg se ClCr < 30 mL/min!). ClCr < 10 mL/min: 500/125 mg a cada 24h.",
      "adverse_reactions": [
        "Diarreia osmótica pelo clavulanato (muito frequente; orientar tomar no início da refeição)",
        "Candidíase vulvovaginal/oral",
        "Hepatite colestática medicamentosa (idiossincrática)",
        "Exantema maculopapular (especialmente se prescrito em Mononucleose Infecciosa por EBV)"
      ],
      "pregnancy_category": "Categoria B — Seguro na gestação (evitar apenas em ruptura prematura de membranas pré-termo pelo risco neonatal de enterocolite necrosante)",
      "reviewed_at": "2026-10-26",
      "hepatic_adjustment": "Monitorar função hepática (ácido clavulânico pode induzir hepatite colestática idiossincrática rara)."
    }
  },
  {
    "id": "seed-drug-azitromicina",
    "name": "Azitromicina",
    "active_ingredient": "Azitromicina Di-hidratada",
    "therapeutic_class": "Antimicrobianos",
    "pharmacological_class": "Macrolídeo azalídeo bacteriostático (Subunidade ribossômica 50S)",
    "data": {
      "status": "posology_verified",
      "therapeutic_class": "Antimicrobianos · Macrolídeo (Cobertura de Atípicos e ISTs)",
      "indication": "Pneumonia adquirida na comunidade (cobertura de germes atípicos: Mycoplasma, Chlamydia, Legionella), uretrite/cervicite por Chlamydia trachomatis, cancro mole, coqueluche, diarreia do viajante/disenteria bacteriana (Campylobacter/Shigella) e exacerbação de DPOC.",
      "diseases": [
        "Pneumonia Adquirida na Comunidade (PAC)",
        "Uretrite e Cervicite (Clamídia / Gonorreia em associação)",
        "Sinusite / Faringoamigdalite em alérgicos graves à penicilina",
        "Diarreia invasiva / Disenteria"
      ],
      "products": [
        {
          "name": "Zitromax / Astro / Genérico",
          "type": "Farmácia / Hospitalar",
          "presentation": "Comp. 500 mg, Frasco-ampola IV 500 mg, Suspensão oral 200 mg/5 mL"
        }
      ],
      "formulations": [
        {
          "label": "Comprimido 500 mg (VO) e Pó liofilizado 500 mg (IV)",
          "dose_text": "1) PAC (Ambulatorial ou Internado em associação com Beta-lactâmico): 500 mg VO ou IV 1x ao dia por 3 a 5 dias. 2) URETRITE / CERVICITE (Clamídia / Cancro Mole): 1 g (2 comprimidos de 500 mg) VO em DOSE ÚNICA (associar Ceftriaxona 500 mg IM para cobertura gonocócica!). 3) PEDIATRIA: 10 mg/kg/dia VO 1x ao dia por 3 a 5 dias (máx. 500 mg/dia).",
          "interval_text": "24/24h (1x ao dia) ou Dose Única (1 g em ISTs)",
          "route": "Via Oral (com ou sem alimentos) ou Endovenosa lenta (diluída em 250–500 mL SF 0,9% infundida em >= 60 min)",
          "duration_text": "3 a 5 dias (infecções respiratórias) ou Dose Única (ISTs)",
          "population": "Adultos, Gestantes (Categoria B) e Pediatria",
          "max_daily_text": "500 mg/dia (ou 1 g em dose única para IST)",
          "administration": "Na via IV, nunca administrar em bolus ou IM! Monitorar intervalo QTc no ECG em pacientes críticos ou em uso de outros fármacos que prolongam o QT.",
          "prescription_type": "Receita de controle antimicrobiano em 2 vias",
          "cautions": "Prolonga o intervalo QTc (risco de Torsades de Pointes se associado a Amiodarona, Haloperidol, Ondansetrona ou Quinolonas, ou se K+/Mg2+ baixos).",
          "source_url": "https://consultas.anvisa.gov.br/#/bulario/"
        }
      ],
      "contraindications": [
        "Hipersensibilidade a macrolídeos",
        "Síndrome do QT longo congênito ou QTc > 500 ms",
        "Hepatotoxicidade prévia por azitromicina"
      ],
      "renal_adjustment": "Não requer ajuste de dose na insuficiência renal (excreção predominantemente biliar/hepática).",
      "adverse_reactions": [
        "Dor abdominal, náuseas e diarreia (efeito procinético sobre receptores de motilina)",
        "Prolongamento do intervalo QTc",
        "Hepatotoxicidade colestática rara"
      ],
      "pregnancy_category": "Categoria B — Macrolídeo de escolha na gestação",
      "reviewed_at": "2026-10-26",
      "hepatic_adjustment": "Usar com cautela em cirrose hepática grave (eliminação biliar predominante)."
    }
  },
  {
    "id": "seed-drug-ciprofloxacino",
    "name": "Ciprofloxacino (Cloridrato de Ciprofloxacino)",
    "active_ingredient": "Ciprofloxacino",
    "therapeutic_class": "Antimicrobianos",
    "pharmacological_class": "Fluoroquinolona de 2ª geração bactericida (Inibidor da DNA-girase e Topoisomerase IV)",
    "data": {
      "status": "posology_verified",
      "therapeutic_class": "Antimicrobianos · Fluoroquinolona Anti-Gram-Negativos e Pseudomonas",
      "indication": "Pielonefrite aguda não complicada, prostatite bacteriana aguda/crônica, infecções intra-abdominais (associado ao Metronidazol), diarreia infecciosa invasiva e infecções por Pseudomonas aeruginosa sensível (única opção oral antipseudomonas!).",
      "diseases": [
        "Pielonefrite Aguda",
        "Prostatite Bacteriana",
        "Infecções por Pseudomonas aeruginosa (Transição Oral)",
        "Diverticulite Aguda / Infecção Intra-abdominal (c/ Metronidazol)"
      ],
      "products": [
        {
          "name": "Cipro / Genérico",
          "type": "Farmácia / Hospitalar",
          "presentation": "Comp. 500 mg (VO), Bolsa pronta p/ infusão IV 200 mg/100 mL e 400 mg/200 mL"
        }
      ],
      "formulations": [
        {
          "label": "Comprimido 500 mg (VO) e Solução injetável 400 mg/200 mL (IV)",
          "dose_text": "1) PIELONEFRITE AGUDA / INFECÇÃO ABDOMINAL: 500 mg VO de 12 em 12 horas por 7 dias (ou 400 mg IV de 12/12h). 2) INFECÇÃO POR PSEUDOMONAS AERUGINOSA (Dose Antipseudomonas!): 750 mg VO de 12 em 12 horas OU 400 mg IV de 8 em 8 horas. 3) PROSTATITE BACTERIANA: 500 mg VO de 12/12h por 14 a 28 dias.",
          "interval_text": "12/12h (VO e IV padrão) ou 8/8h (IV para Pseudomonas/infecções graves)",
          "route": "Via Oral (excelente biodisponibilidade de ~70–80%!) ou Endovenosa lenta em 60 minutos",
          "duration_text": "7 a 14 dias (até 28 dias em prostatite)",
          "population": "Adultos",
          "max_daily_text": "1.500 mg/dia VO (750 mg 12/12h) ou 1.200 mg/dia IV (400 mg 8/8h)",
          "administration": "NÃO é quinolona respiratória! Ciprofloxacino NÃO possui atividade confiável contra Streptococcus pneumoniae — JAMAIS prescrever para Pneumonia Adquirida na Comunidade (PAC) ou Sinusite! Na via oral, afastar 2 horas de antiácidos, cálcio, ferro, sucralfato ou leite (quelação reduz absorção em até 90%).",
          "prescription_type": "Receita de controle antimicrobiano em 2 vias",
          "cautions": "Alertas de segurança graves (FDA/ANVISA): risco de tendinite e ruptura do tendão de Aquiles (maior em > 60 anos e usuários de corticoides), neuropatia periférica, delirium/convulsões em idosos, prolongamento do QTc e dissecção/aneurisma de aorta.",
          "source_url": "https://consultas.anvisa.gov.br/#/bulario/"
        }
      ],
      "contraindications": [
        "Miastenia Gravis (pode desencadear crise miastênica grave e insuficiência respiratória!)",
        "Gestação e lactação (exceto ausência de alternativa)",
        "Histórico de tendinite/ruptura tendínea por quinolonas"
      ],
      "renal_adjustment": "ClCr 30 a 50 mL/min: 250–500 mg VO de 12/12h (ou 400 mg IV 12/12h). ClCr < 30 mL/min ou Hemodiálise: 250–500 mg VO a cada 24h (ou 200–400 mg IV a cada 24h, após a diálise).",
      "adverse_reactions": [
        "Tendinopatia e ruptura de tendão de Aquiles",
        "Confusão mental, agitação e delirium em idosos",
        "Prolongamento do intervalo QTc",
        "Fototoxicidade e disgliemia"
      ],
      "drug_interactions": [
        "Varfarina (aumenta acentuadamente o INR — risco de sangramento!)",
        "Cátions bivalentes/trivalentes VO (Ca2+, Mg2+, Al3+, Fe2+, Zn2+ quelam e inativam o ciprofloxacino oral)",
        "Tizanidina (contraindicado — hipotensão e sedação graves)"
      ],
      "reviewed_at": "2026-10-26",
      "pregnancy_category": "Categoria C (Evitar no 1º trimestre se alternativa disponível)",
      "pregnancy_text": "Quinolonas associam-se a artropatia em modelos animais; reservar para pielonefrite ou sepse sem opção mais segura.",
      "hepatic_adjustment": "Não requer ajuste de dose."
    }
  },
  {
    "id": "seed-drug-metronidazol",
    "name": "Metronidazol",
    "active_ingredient": "Metronidazol",
    "therapeutic_class": "Antimicrobianos",
    "pharmacological_class": "Nitroimidazólico bactericida (Anaerobicida e Antiprotozoário)",
    "data": {
      "status": "posology_verified",
      "therapeutic_class": "Antimicrobianos · Anaerobicida e Antiprotozoário",
      "indication": "Infecções por bactérias anaeróbias estritas (Bacteroides fragilis — intra-abdominais, pélvicas, abscesso cerebral/hepático, pé diabético), colite por Clostridioides difficile (alternativa), vaginose bacteriana, tricomoníase, giardíase e amebíase.",
      "diseases": [
        "Infecções Intra-abdominais (Apendicite, Diverticulite, Peritonite — c/ Ceftriaxona ou Cipro)",
        "Doença Inflamatória Pélvica (DIP)",
        "Vaginose Bacteriana e Tricomoníase",
        "Abscesso Cerebral / Odontogênico / Hepático"
      ],
      "products": [
        {
          "name": "Flagyl / Genérico",
          "type": "Farmácia / Hospitalar",
          "presentation": "Bolsa IV 500 mg/100 mL, Comp. 250 mg e 400 mg, Gel vaginal 100 mg/g"
        }
      ],
      "formulations": [
        {
          "label": "Solução injetável 500 mg/100 mL (IV) e Comprimido 400 mg (VO)",
          "dose_text": "1) INFECÇÕES ANAERÓBIAS SISTÊMICAS / INTRA-ABDOMINAIS: 500 mg IV ou 400 mg VO de 8 em 8 horas (ou 1,5 g IV em dose única diária de 24/24h em combinação com Ceftriaxona). 2) VAGINOSE BACTERIANA: 400 a 500 mg VO de 12 em 12 horas por 7 dias (ou Gel vaginal 0,75% 1 aplicador à noite por 5 dias). 3) TRICOMONÍASE: 2 g VO em dose única (ou 400–500 mg VO 12/12h por 7 dias — tratar parceiro!).",
          "interval_text": "8/8h (infecções sistêmicas) ou 12/12h (ginecológicas)",
          "route": "Endovenosa (correr bolsa de 100 mL em 30–60 min), Via Oral (biodisponibilidade de ~100%!) ou Intravaginal",
          "duration_text": "5 a 14 dias conforme foco",
          "population": "Adultos e Pediatria (30 mg/kg/dia divididos de 8/8h)",
          "max_daily_text": "4 g/dia (habitual 1,5 g/dia)",
          "administration": "ALERTA DE STEWARDSHIP: Se o paciente já estiver em uso de Piperacilina+Tazobactam, Meropenem, Ertapenem, Imipenem ou Amoxicilina+Clavulanato, NÃO associar Metronidazol (redundância anaeróbia desnecessária, salvo se abscesso cerebral ou colite por C. difficile concomitante!).",
          "prescription_type": "Receita de controle antimicrobiano em 2 vias",
          "cautions": "Orientar abstinência absoluta de bebidas alcoólicas durante o tratamento e por até 48–72 horas após o término (Efeito Dissulfiram / Antabuse: rubor facial intenso, vômitos incoercíveis, taquicardia e hipotensão!).",
          "source_url": "https://consultas.anvisa.gov.br/#/bulario/"
        }
      ],
      "contraindications": [
        "Hipersensibilidade a nitroimidazólicos",
        "Consumo concomitante de álcool ou propilenoglicol"
      ],
      "renal_adjustment": "Não requer ajuste até ClCr >= 10 mL/min. Se ClCr < 10 mL/min sem diálise: reduzir dose em 50% (500 mg IV de 12/12h).",
      "hepatic_adjustment": "Na cirrose grave (Child-Pugh C): reduzir a dose diária total em 50% (ex.: 500 mg IV de 12/12h).",
      "adverse_reactions": [
        "Gosto metálico na boca e náuseas",
        "Efeito Dissulfiram com álcool",
        "Urina escurecida/avermelhada (metabólito benigno)",
        "Neuropatia periférica e encefalopatia cerebelar em uso prolongado (> 4 semanas)"
      ],
      "drug_interactions": [
        "Varfarina (inibe CYP2C9 e eleva perigosamente o INR!)",
        "Lítio (aumenta litemia e risco de nefro/neurotoxicidade)",
        "Álcool / Etanol"
      ],
      "reviewed_at": "2026-10-26",
      "pregnancy_category": "Categoria B",
      "pregnancy_text": "Seguro para tricomoníase e infecções anaeróbias na gestação; evitar uso no 1º trimestre em doses muito altas."
    }
  },
  {
    "id": "seed-drug-furosemida",
    "name": "Furosemida",
    "active_ingredient": "Furosemida",
    "therapeutic_class": "Cardiologia e Diuréticos",
    "pharmacological_class": "Diurético de alça de alta potência (Inibidor do cotransportador Na+-K+-2Cl- no ramo ascendente espesso da alça de Henle)",
    "data": {
      "status": "posology_verified",
      "therapeutic_class": "Cardiologia e Diuréticos · Diurético de Alça",
      "indication": "Edema agudo de pulmão cardiogênico, insuficiência cardíaca aguda e crônica congestiva (Perfis B e C), síndrome edematosa da cirrose/síndrome nefrótica, hipervolemia na LRA/DRC, hipercalemia aguda e crise hipercalcêmica.",
      "diseases": [
        "Edema Agudo de Pulmão (EAP)",
        "Insuficiência Cardíaca Descompensada",
        "Hipervolemia / Anasarca",
        "Hipercalemia Aguda"
      ],
      "products": [
        {
          "name": "Lasix / Genérico",
          "type": "Farmácia / Hospitalar",
          "presentation": "Ampola 20 mg/2 mL (10 mg/mL) e Comprimido 40 mg"
        }
      ],
      "formulations": [
        {
          "label": "Solução injetável 20 mg/2 mL (IV) e Comprimido 40 mg (VO)",
          "dose_text": "1) EDEMA AGUDO DE PULMÃO / IC DESCOMPENSADA (IV): Virgem de diurético: 20 a 40 mg (1 a 2 ampolas) IV em bolus lento (1–2 min). Usuário crônico de furosemida oral: iniciar com 1x a 2,5x a dose diária oral total em mg por via IV (ex.: se usa 80 mg/dia VO, fazer 80 a 160 mg IV). Reavaliar diurese em 2h (meta > 100–150 mL/h; se insuficiente, dobrar a dose IV e associar tiazídico). 2) INFUSÃO CONTÍNUA EM UTI: 5 a 20 mg/h IV em BIC. 3) USO ORAL: 20 a 80 mg VO 1 a 2x/dia (pela manhã e às 14h).",
          "interval_text": "Bolus IV a cada 6 a 12h conforme congestão ou infusão contínua",
          "route": "Endovenosa (IV) ou Via Oral (biodisponibilidade oral média de ~50%: 40 mg VO equivalem a 20 mg IV!)",
          "duration_text": "Uso agudo descongestivo e manutenção crônica titulada pelo peso seco",
          "population": "Adultos e Pediatria (1 a 2 mg/kg/dose)",
          "max_daily_text": "600 mg/dia (em insuficiência renal avançada/resistência diurética)",
          "administration": "Infundir doses altas (> 80–120 mg IV) em velocidade máxima de <= 4 mg/min (em 30 min) para evitar ototoxicidade/surdez!",
          "prescription_type": "Receita simples / Uso hospitalar",
          "cautions": "Na hiponatremia ou LRA por congestão venosa renal (síndrome cardiorrenal com B-lines e turgência jugular), a furosemida melhora a função renal ao aliviar o tamponamento venoso renal. Monitorar K+ e Mg2+ diariamente!",
          "source_url": "https://consultas.anvisa.gov.br/#/bulario/"
        }
      ],
      "contraindications": [
        "Anúria refratária sem sobrecarga volêmica",
        "Hipovolemia/desidratação grave",
        "Hipocalemia ou hiponatremia graves não corrigidas",
        "Encefalopatia hepática aguda descompensada"
      ],
      "renal_adjustment": "Na TFG reduzida (< 30 mL/min), requer doses maiores (80 a 200 mg IV) para atingir concentração tubular eficaz.",
      "adverse_reactions": [
        "Hipocalemia, hipomagnesemia e hiponatremia",
        "Alcalose metabólica de contração (hipoclorêmica)",
        "Hipotensão arterial se administrada em paciente hipovolêmico",
        "Hiperuricemia / crise de gota",
        "Ototoxicidade (zumbido/surdez transitória ou permanente em bolus rápidos de alta dose)"
      ],
      "drug_interactions": [
        "Aminoglicosídeos e Vancomicina (sinergismo ototóxico e nefrotóxico)",
        "Lítio (reduz excreção de lítio e causa intoxicação)",
        "Digoxina (hipocalemia induzida pela furosemida precipita intoxicação digitálica arritmogênica!)"
      ],
      "reviewed_at": "2026-10-26",
      "pregnancy_category": "Categoria C",
      "pregnancy_text": "Pode reduzir a perfusão uteroplacentária por hipovolemia; reservar para edema agudo de pulmão materno.",
      "hepatic_adjustment": "Na cirrose com ascite, associar sempre à Espironolactona (proporção 40:100 mg) para evitar hipocalemia e encefalopatia."
    }
  },
  {
    "id": "seed-drug-metoprolol",
    "name": "Metoprolol (Tartarato e Succinato de Metoprolol)",
    "active_ingredient": "Metoprolol",
    "therapeutic_class": "Cardiologia e Antiarrítmicos",
    "pharmacological_class": "Betabloqueador cardiosseletivo Beta-1 (Classe II de Vaughan-Williams)",
    "data": {
      "status": "posology_verified",
      "therapeutic_class": "Cardiologia e Antiarrítmicos · Betabloqueador Beta-1 Seletivo",
      "indication": "Controle rápido de frequência cardíaca na Fibrilação Atrial/Flutter de alta resposta e TSV, Dissecção Aguda de Aorta (1º passo obrigatório!), Síndrome Coronariana Aguda (sem sinais de congestão/choque), Insuficiência Cardíaca com FEVE reduzida (Succinato) e Tempestade Tireotóxica.",
      "diseases": [
        "Fibrilação Atrial / Flutter de Alta Resposta",
        "Dissecção Aguda de Aorta",
        "Síndrome Coronariana Aguda / Angina",
        "Insuficiência Cardíaca com Fração de Ejeção Reduzida (ICFEr)"
      ],
      "products": [
        {
          "name": "Seloken (Tartarato IV/VO) / Selozok (Succinato LP)",
          "type": "Farmácia / Hospitalar",
          "presentation": "Ampola IV 5 mg/5 mL (1 mg/mL de Tartarato), Comp. Succinato LP 25 mg, 50 mg e 100 mg"
        }
      ],
      "formulations": [
        {
          "label": "Solução injetável 5 mg/5 mL (Tartarato IV) e Comprimido liberação prolongada 25/50/100 mg (Succinato VO)",
          "dose_text": "1) EMERGÊNCIA / CONTROLE DE FC NA FA / DISSECÇÃO DE AORTA (Tartarato IV): 5 mg (1 ampola = 5 mL) IV lento em 2 a 5 minutos; pode repetir 5 mg IV a cada 5 minutos até dose máxima de 15 mg (3 ampolas), monitorando PA, FC e ausculta pulmonar. 2) INSUFICIÊNCIA CARDÍACA CRÔNICA ESTÁVEL (Exclusivamente SUCCINATO de Metoprolol VO): Iniciar 12,5 a 25 mg VO 1x/dia e dobrar a cada 2 semanas até a dose-alvo de 200 mg/dia.",
          "interval_text": "Bolus IV a cada 5 min (máx. 15 mg); Succinato VO 1x/dia; Tartarato VO de 12/12h",
          "route": "Endovenosa lenta (sem diluir ou diluída, 1–2 mg/min) ou Via Oral",
          "duration_text": "Uso agudo em sala de emergência ou contínuo (nunca suspender abruptamente pelo risco de efeito rebote isquêmico/taquicárdico!)",
          "population": "Adultos",
          "max_daily_text": "15 mg IV na fase aguda; 200 mg/dia VO (Succinato na IC) ou 400 mg/dia (Tartarato na HAS/Angina)",
          "administration": "REGRA DE OURO NO IAM E NA IC AGUDA: NUNCA administrar Metoprolol IV se houver estertores pulmonares (Killip >= II), perfil úmido/frio, PAS < 100–110 mmHg, FC < 60 bpm, PR > 240 ms ou risco de choque cardiogênico (Estudo COMMIT)!",
          "prescription_type": "Receita simples / Uso hospitalar",
          "cautions": "Na intoxicação aguda por Cocaína / Crack com dor torácica, evitar betabloqueadores isolados pelo risco teórico de vasoespasmo coronariano alfa-adrenérgico sem oposição (preferir Benzodiazepínicos + Nitratos).",
          "source_url": "https://consultas.anvisa.gov.br/#/bulario/"
        }
      ],
      "contraindications": [
        "Edema agudo de pulmão, IC descompensada congestiva ou Choque Cardiogênico",
        "Bradicardia sinusal (< 50–60 bpm) ou BAV de 2º/3º grau sem marcapasso",
        "Asma brônquica grave em crise ativa (broncoespasmo)",
        "FA pré-excitada (Síndrome de Wolff-Parkinson-White — risco de FV!)"
      ],
      "renal_adjustment": "Não requer ajuste de dose na insuficiência renal (metabolismo hepático via CYP2D6).",
      "adverse_reactions": [
        "Bradicardia sintomática e BAV",
        "Hipotensão arterial e piora aguda da IC se usado na congestão",
        "Broncoespasmo (em altas doses perde a seletividade beta-1)",
        "Mascaramento da taquicardia na hipoglicemia (mantém a sudorese)"
      ],
      "antidote": [
        "Superdosagem / Choque por Betabloqueador: 1º) Atropina 1 mg IV + SF 0,9%; 2º) GLUCAGON (antídoto específico que ativa adenilato ciclase independente do receptor beta!): bolus de 3 a 5 mg IV em 1–2 min (repetir até 10 mg), seguido de infusão contínua de 3 a 5 mg/h em SG 5%; 3º) Adrenalina/Noradrenalina + Insulina em alta dose com euglicemia (HIE)."
      ],
      "reviewed_at": "2026-10-26",
      "pregnancy_category": "Categoria C",
      "pregnancy_text": "Betabloqueador seguro; monitorar crescimento intrauterino e bradicardia fetal/neonatal.",
      "hepatic_adjustment": "Metabolismo hepático intenso via CYP2D6; titular doses baixas na insuficiência hepática."
    }
  },
  {
    "id": "seed-drug-deslanosideo",
    "name": "Deslanosídeo (Cedilanide)",
    "active_ingredient": "Deslanosídeo",
    "therapeutic_class": "Cardiologia e Antiarrítmicos",
    "pharmacological_class": "Glicosídeo cardíaco digitálico venoso (Inibidor da bomba Na+/K+-ATPase e vagomimético no nó AV)",
    "data": {
      "status": "posology_verified",
      "therapeutic_class": "Cardiologia e Antiarrítmicos · Digitálico Venoso",
      "indication": "Controle agudo da frequência ventricular na Fibrilação Atrial ou Flutter Atrial de alta resposta em pacientes com Insuficiência Cardíaca descompensada (FEVE reduzida / congestão pulmonar) ou hipotensão limítrofe onde betabloqueadores e bloqueadores de canal de cálcio estão contraindicados.",
      "diseases": [
        "Fibrilação Atrial de Alta Resposta com IC Descompensada",
        "Taquicardia Supraventricular em disfunção sistólica grave"
      ],
      "products": [
        {
          "name": "Cedilanide",
          "type": "Hospitalar",
          "presentation": "Ampola 0,4 mg/2 mL (0,2 mg/mL)"
        }
      ],
      "formulations": [
        {
          "label": "Solução injetável 0,4 mg/2 mL",
          "dose_text": "CONTROLE DE FC NA FA COM IC DESCOMPENSADA: Dose inicial de 0,4 mg (1 ampola = 2 mL) IV lento em 5 minutos (ou 0,2 mg = meia ampola em idosos/baixo peso/DRC). Se necessário, pode-se repetir 0,2 mg a 0,4 mg IV após 2 a 4 horas (dose máxima de digitalização em 24h: 0,8 a 1,2 mg).",
          "interval_text": "Dose inicial única; se necessário, repetir 0,2–0,4 mg após 2–4h",
          "route": "Endovenosa (IV) lenta (diluída em 10 mL de SF 0,9% ou SG 5%)",
          "duration_text": "Uso agudo em sala de emergência / UTI",
          "population": "Adultos",
          "max_daily_text": "0,8 a 1,2 mg nas primeiras 24h (em função renal normal)",
          "administration": "Checar obrigatoriamente POTÁSSIO, MAGNÉSIO e FUNÇÃO RENAL antes de administrar! O início de ação para controle de FC leva 30 a 60 minutos (pico em 2–4h).",
          "prescription_type": "Uso restrito hospitalar",
          "cautions": "Janela terapêutica estreita! Hipocalemia, hipomagnesemia e hipercalcemia aumentam drasticamente a toxicidade digitálica mesmo em doses normais.",
          "source_url": "https://consultas.anvisa.gov.br/#/bulario/"
        }
      ],
      "contraindications": [
        "Fibrilação Atrial Pré-Excitada (Síndrome de Wolff-Parkinson-White — bloqueia o nó AV e desvia estímulos pela via acessória, precipitando Fibrilação Ventricular fatal!)",
        "Bloqueio AV de 2º ou 3º grau e Doença do Nó Sinusal sem marcapasso",
        "Cardiomiopatia Hipertrófica Obstrutiva",
        "Hipocalemia não corrigida (< 3,5 mEq/L) ou suspeita de intoxicação digitálica prévia"
      ],
      "renal_adjustment": "Excreção predominantemente renal! Reduzir dose em 50% (fazer apenas 0,2 mg = 1 mL IV) se ClCr < 50 mL/min ou em idosos frágeis; evitar na DRC dialítica.",
      "adverse_reactions": [
        "Intoxicação digitálica: náuseas, vômitos, anorexia, xantopsia (visão amarelada/esverdeada)",
        "Bradiarritmias, BAV total, Taquicardia Atrial com bloqueio variável, Extrassístoles ventriculares bigeminadas e Taquicardia Ventricular Bidirecional"
      ],
      "antidote": [
        "Intoxicação Digitálica Grave: Anticorpo antidigoxina (Fab fragment - Digibind), correção de K+ para 4,0–5,0 mEq/L, Sulfato de Magnésio 2 g IV e Atropina se bradicardia. NUNCA administrar Cálcio IV na intoxicação digitálica!"
      ],
      "reviewed_at": "2026-10-26",
      "pregnancy_category": "Categoria C",
      "pregnancy_text": "Atravessa a placenta; monitorar toxicidade digitálica materna e fetal.",
      "hepatic_adjustment": "Não requer ajuste de dose."
    }
  },
  {
    "id": "seed-drug-acido-tranexamico",
    "name": "Ácido Tranexâmico (Transamin)",
    "active_ingredient": "Ácido Tranexâmico",
    "therapeutic_class": "Antídotos e Reversores",
    "pharmacological_class": "Antifibrinolítico sintético (Inibidor competitivo da ativação do plasminogênio em plasmina)",
    "data": {
      "status": "posology_verified",
      "therapeutic_class": "Antídotos e Reversores · Antifibrinolítico / Hemostático",
      "indication": "Choque hemorrágico no politrauma (CRASH-2), TCE com sangramento intracraniano leve/moderado nas primeiras 3h (CRASH-3), Hemorragia Pós-Parto (WOMAN trial), sangramento uterino anormal agudo, epistaxe e hemoptise.",
      "diseases": [
        "Choque Hemorrágico no Trauma",
        "Hemorragia Pós-Parto (HPP)",
        "Sangramento Uterino Anormal Agudo",
        "Hemoptise / Epistaxe"
      ],
      "products": [
        {
          "name": "Transamin / Genérico",
          "type": "Farmácia / Hospitalar",
          "presentation": "Ampola 250 mg/5 mL (50 mg/mL) e Comprimido 250 mg"
        }
      ],
      "formulations": [
        {
          "label": "Solução injetável 250 mg/5 mL (IV) e Comprimido 250 mg (VO)",
          "dose_text": "1) POLITRAUMA COM SANGRAMENTO E HEMORRAGIA PÓS-PARTO (Protocolo CRASH-2 / WOMAN — OBRIGATÓRIO NAS PRIMEIRAS 3 HORAS!): Dose de ataque de 1 g (4 ampolas de 250 mg = 20 mL) diluído em 100 mL de SF 0,9%, correr IV em 10 minutos. No Trauma: seguir com manutenção de 1 g (4 ampolas) em 250 mL SF 0,9% correr IV em 8 horas (na HPP: repetir 1 g IV se o sangramento persistir após 30 min). 2) SANGRAMENTO MUCOSO / UTERINO (VO ou IV): 500 mg a 1 g (2 a 4 ampolas IV ou 2 a 4 comp. VO) de 8 em 8 horas. 3) HEMOPTISE INALATÓRIA: nebulizar 500 mg (2 ampolas = 10 mL puras) de 8/8h.",
          "interval_text": "Bolus de 1 g em 10 min + 1 g em 8h (trauma) ou 8/8h (sangramentos gerais)",
          "route": "Endovenosa (IV) lenta em 10 min, Via Oral ou Inalatória (nebulização na hemoptise)",
          "duration_text": "Dose de emergência nas primeiras 3h do trauma/HPP, ou por 3 a 5 dias em sangramentos mucosos",
          "population": "Adultos, Gestantes/Puérperas e Pediatria (Trauma: ataque 15 mg/kg IV em 10 min, máx 1 g)",
          "max_daily_text": "3 a 4 g/dia",
          "administration": "REGRA DOS 180 MINUTOS (3 HORAS): No trauma e na HPP, o benefício em sobrevida ocorre quando administrado dentro de 3 horas do evento (idealmente na 1ª hora)! Administrar após 3 horas do trauma/parto é ineficaz e pode aumentar mortalidade! Infundir a <= 100 mg/min para evitar hipotensão.",
          "prescription_type": "Receita simples / Uso hospitalar",
          "cautions": "Na Hemorragia Digestiva Alta (HDA), o estudo HALT-IT demonstrou que o ácido tranexâmico NÃO reduz mortalidade e aumenta o risco de tromboembolismo venoso e convulsões (não usar de rotina na HDA!).",
          "source_url": "https://consultas.anvisa.gov.br/#/bulario/"
        }
      ],
      "contraindications": [
        "Hematúria macroscópica de origem renal/trato urinário superior (risco de formação de coágulos obstrutivos no ureter com anúria pós-renal!)",
        "Evento tromboembólico agudo ativo (TVP, TEP ou trombose arterial recente)",
        "Coagulação Intravascular Disseminada (CIVD) com predomínio trombótico"
      ],
      "renal_adjustment": "Excreção 95% renal! Na insuficiência renal crônica, reduzir doses de manutenção (Cr 1,4–2,8 mg/dL: 10 mg/kg 12/12h; Cr > 5,7 mg/dL: 10 mg/kg a cada 48h). A dose de ataque de 1 g na emergência do trauma não requer redução.",
      "adverse_reactions": [
        "Hipotensão arterial se injetado em bolus rápido",
        "Náuseas e vômitos",
        "Convulsões (em altas doses — antagonista competitivo de receptores GABA-A)",
        "Tromboembolismo venoso"
      ],
      "reviewed_at": "2026-10-26",
      "pregnancy_category": "Categoria B",
      "pregnancy_text": "Antifibrinolítico padrão na Hemorragia Pós-Parto (HPP - World Maternal Antifibrinolytic Trial - WOMAN).",
      "hepatic_adjustment": "Não requer ajuste de dose."
    }
  },
  {
    "id": "seed-drug-fenitoina",
    "name": "Fenitoína Sódica (Hidantal)",
    "active_ingredient": "Fenitoína",
    "therapeutic_class": "Neurologia e Psiquiatria",
    "pharmacological_class": "Anticonvulsivante bloqueador de canais de sódio voltagem-dependentes (Antiarrítmico Classe IB)",
    "data": {
      "status": "posology_verified",
      "therapeutic_class": "Neurologia e Psiquiatria · Anticonvulsivante de 2ª Linha no EME",
      "indication": "Estado de Mal Epiléptico (fármaco de 2ª linha após benzodiazepínico), crises epilépticas focais e tônico-clônicas generalizadas, profilaxia de crises precoces pós-TCE grave (primeiros 7 dias) e arritmias ventriculares por intoxicação digitálica.",
      "diseases": [
        "Estado de Mal Epiléptico (Status Epilepticus)",
        "Epilepsia Focal e Generalizada",
        "Profilaxia de Crise Precoce no TCE Grave"
      ],
      "products": [
        {
          "name": "Hidantal / Fenitoína",
          "type": "Farmácia / Hospitalar",
          "presentation": "Ampola 250 mg/5 mL (50 mg/mL) e Comprimido 100 mg"
        }
      ],
      "formulations": [
        {
          "label": "Solução injetável 250 mg/5 mL (IV) e Comprimido 100 mg (VO)",
          "dose_text": "1) DOSE DE ATAQUE (Hidantalização no Estado de Mal Epiléptico): 20 mg/kg IV (máx. 1.500 mg; para 70 kg = 1.400 mg ≈ 5,5 ampolas). Se a crise persistir após 20 min do término do ataque, pode-se fazer dose adicional de 5 a 10 mg/kg IV (máx. cumulativo 30 mg/kg). 2) MANUTENÇÃO: 100 mg IV ou VO de 8 em 8 horas (iniciar 12h após o ataque). 3) PEDIATRIA: Ataque 20 mg/kg IV (infundir a 1–3 mg/kg/min, máx 50 mg/min).",
          "interval_text": "Ataque em dose única + Manutenção de 8/8h",
          "route": "Endovenosa (IV) exclusiva em acesso calibroso com SF 0,9% ou Via Oral (JAMAIS administrar por via Intramuscular — causa cristalização e necrose muscular grave!)",
          "duration_text": "No TCE grave sem crise: suspender obrigatoriamente após 7 dias",
          "population": "Adultos e Pediatria",
          "max_daily_text": "Ataque até 1.500–2.000 mg; Manutenção 300 a 600 mg/dia",
          "administration": "REGRAS CRÍTICAS DE INFUSÃO DA FENITOÍNA: 1) Diluir EXCLUSIVAMENTE em Soro Fisiológico 0,9% (100 a 250 mL) — JAMAIS diluir em Soro Glicosado 5% ou Ringer Lactato (pH ácido precipita cristais imediatamente!). 2) Velocidade MÁXIMA de infusão: <= 50 mg/min em adultos (correr 1.000–1.500 mg em 30 minutos) e <= 25 mg/min em idosos ou cardiopatas! 3) Lavar o acesso venoso com 20 mL de SF 0,9% antes e depois.",
          "prescription_type": "Receita de controle especial C1",
          "cautions": "A infusão rápida (> 50 mg/min) causa hipotensão grave, bradicardia e parada cardíaca (pelo veículo propilenoglicol + bloqueio de canais de Na+ miocárdicos)! É ineficaz e pode agravar crises de Ausência, Mioclônicas e crises convulsivas por Abstinência Alcoólica ou Intoxicação por Teofilina/Isoniazida!",
          "source_url": "https://consultas.anvisa.gov.br/#/bulario/"
        }
      ],
      "contraindications": [
        "Bradicardia sinusal, bloqueio sinoatrial, BAV de 2º/3º grau ou Síndrome de Adams-Stokes",
        "Crises de ausência ou epilepsia mioclônica juvenil (pode precipitar estado de mal de ausência)",
        "Diluição em soluções glicosadas (SG 5%)"
      ],
      "renal_adjustment": "Na insuficiência renal ou hipoalbuminemia, a fração livre aumenta; calcular Fenitoína Corrigida pela equação de Sheiner-Tozer antes de ajustar a dose.",
      "adverse_reactions": [
        "Hipotensão arterial e bradiarritmias durante infusão IV rápida",
        "Síndrome da Luva Roxa (Purple Glove Syndrome) e necrose por extravasamento",
        "Nistagmo, ataxia cerebelar, diplopia e disartria (sinais clássicos de intoxicação aguda)",
        "Hiperplasia gengival, hirsutismo e teratogenicidade no uso crônico"
      ],
      "drug_interactions": [
        "Potente indutor enzimático do CYP3A4/CYP2C9: reduz drasticamente a eficácia de Anticoncepcionais Orais, Varfarina, DOACs (Rivaroxabana/Apixabana), Corticoides e Quimioterápicos",
        "Nutrição Enteral contínua reduz a absorção oral da fenitoína em até 70% (pausar dieta 1–2h antes e 1–2h após a dose por SNE!)"
      ],
      "reviewed_at": "2026-10-26",
      "pregnancy_category": "Categoria D (Síndrome da hidantoína fetal)",
      "pregnancy_text": "Teratogênica; na gestante com convulsão em 2ª metade SEMPRE pensar em eclâmpsia e usar sulfato de magnésio primeiro.",
      "hepatic_adjustment": "Metabolismo hepático saturável (cinética de Michaelis-Menten); titular com base em níveis séricos (10–20 mcg/mL)."
    }
  },
  {
    "id": "seed-drug-diazepam",
    "name": "Diazepam",
    "active_ingredient": "Diazepam",
    "therapeutic_class": "Neurologia e Psiquiatria",
    "pharmacological_class": "Benzodiazepínico de longa duração e início de ação ultrarrápido (Agonista alostérico GABA-A)",
    "data": {
      "status": "posology_verified",
      "therapeutic_class": "Neurologia e Psiquiatria · Benzodiazepínico (1ª Linha na Crise Convulsiva e Abstinência Alcoólica)",
      "indication": "Primeira linha na crise epiléptica aguda e Estado de Mal Epiléptico (fase de 0 a 5 min), Síndrome de Abstinência Alcoólica e Delirium Tremens (padrão-ouro!), intoxicação simpaticomimética aguda (cocaína/crack/anfetaminas), tétano e espasmo muscular agudo.",
      "diseases": [
        "Crise Convulsiva / Estado de Mal Epiléptico",
        "Síndrome de Abstinência Alcoólica e Delirium Tremens",
        "Dor Torácica / Agitação por Cocaína",
        "Espasmo Muscular Agudo"
      ],
      "products": [
        {
          "name": "Valium / Compaz / Genérico",
          "type": "Farmácia / Hospitalar",
          "presentation": "Ampola 10 mg/2 mL (5 mg/mL) e Comprimido 5 mg e 10 mg"
        }
      ],
      "formulations": [
        {
          "label": "Solução injetável 10 mg/2 mL (IV) e Comprimido 5 mg / 10 mg (VO)",
          "dose_text": "1) CRISE CONVULSIVA / ESTADO DE MAL EPILÉPTICO: Adultos: 10 mg (1 ampola = 2 mL) IV LENTO SEM DILUIR (velocidade máx. 2 a 5 mg/min = fazer em 2 minutos); pode repetir mais 10 mg IV após 5 minutos se a crise persistir (máx. 20–30 mg). Crianças: 0,2 a 0,3 mg/kg IV lento (máx. 10 mg/dose) ou 0,5 mg/kg por via retal se sem acesso venoso. 2) ABSTINÊNCIA ALCOÓLICA / DELIRIUM TREMENS (CIWA-Ar >= 8–10): 10 a 20 mg VO ou 5 a 10 mg IV lento a cada 1h (ou a cada 5–10 min no Delirium Tremens grave) até sedação leve (RASS 0 a -1).",
          "interval_text": "Crise convulsiva: repetir após 5 min (máx. 2 doses); Abstinência: titulado por sintomas (CIWA-Ar)",
          "route": "Endovenosa (IV) lenta PURA (sem diluir!), Via Oral ou Via Retal (pediatria). EVITAR VIA INTRAMUSCULAR (absorção errática e necrose muscular — se precisar de via IM, usar MIDAZOLAM!)",
          "duration_text": "Uso agudo emergencial",
          "population": "Adultos e Pediatria",
          "max_daily_text": "20 a 30 mg na crise convulsiva; na abstinência alcoólica grave pode exigir > 100–200 mg/dia em UTI",
          "administration": "NUNCA DILUIR O DIAZEPAM EM ÁGUA DESTILADA OU SORO FISIOLÓGICO! O diazepam é altamente lipofílico (veículo propilenoglicol) e precipita/fica turvo ao contato com água. Administrar PURO lentamente (2 mL em 2 minutos) em veia calibrosa.",
          "prescription_type": "Notificação de Receita B (Azul)",
          "cautions": "Embora o diazepam entre no cérebro em 10–20 segundos (cessando a convulsão rapidamente), ele se redistribui para o tecido adiposo em 15–30 minutos, fazendo com que a crise possa recorrer se não for iniciada a droga de 2ª linha (Fenitoína) no Estado de Mal Epiléptico!",
          "source_url": "https://consultas.anvisa.gov.br/#/bulario/"
        }
      ],
      "contraindications": [
        "Miastenia Gravis",
        "Insuficiência respiratória aguda grave descompensada (sem suporte ventilatório)",
        "Glaucoma de ângulo fechado agudo"
      ],
      "hepatic_adjustment": "Na cirrose hepática descompensada ou em idosos muito frágeis, possui meia-vida extremamente longa (até 100 horas pelo metabólito ativo nordiazepam); preferir Lorazepam VO na abstinência alcoólica do hepatopata grave.",
      "adverse_reactions": [
        "Depressão respiratória e apneia (especialmente se injetado rápido em bolus ou associado a opioides/álcool)",
        "Hipotensão arterial",
        "Flebite química no local da injeção",
        "Agitação paradoxal em idosos e crianças"
      ],
      "antidote": [
        "Flumazenil 0,2 mg IV em 15–30 segundos (NUNCA usar Flumazenil em pacientes epilépticos ou usuários crônicos de benzodiazepínicos pelo risco de Estado de Mal Epiléptico refratário!)."
      ],
      "reviewed_at": "2026-10-26",
      "pregnancy_category": "Categoria D",
      "pregnancy_text": "Evitar uso contínuo no 1º trimestre e próximo ao parto (risco de síndrome do bebê hipotônico e abstinência neonatal).",
      "renal_adjustment": "Não requer ajuste na insuficiência renal."
    }
  },
  {
    "id": "seed-drug-haloperidol",
    "name": "Haloperidol (Haldol)",
    "active_ingredient": "Haloperidol",
    "therapeutic_class": "Neurologia e Psiquiatria",
    "pharmacological_class": "Antipsicótico típico de alta potência (Butirofenona antagonista potente dos receptores D2 de dopamina)",
    "data": {
      "status": "posology_verified",
      "therapeutic_class": "Neurologia e Psiquiatria · Antipsicótico Típico (Agitação e Delirium)",
      "indication": "Agitação psicomotora aguda e surto psicótico na emergência, Delirium hiperativo em enfermaria/UTI, soluços incoercíveis e náuseas/vômitos refratários em cuidados paliativos.",
      "diseases": [
        "Agitação Psicomotora Aguda",
        "Delirium Hiperativo no Idoso / UTI",
        "Psicose Aguda / Esquizofrenia",
        "Vômitos Refratários em Cuidados Paliativos"
      ],
      "products": [
        {
          "name": "Haldol / Genérico",
          "type": "Farmácia / Hospitalar",
          "presentation": "Ampola 5 mg/1 mL, Solução oral gotas 2 mg/mL (1 gota = 0,1 mg), Comp. 1 mg e 5 mg"
        }
      ],
      "formulations": [
        {
          "label": "Solução injetável 5 mg/1 mL (IM) e Gotas 2 mg/mL / Comprimido 1 e 5 mg (VO)",
          "dose_text": "1) AGITAÇÃO PSICOMOTORA AGUDA NO ADULTO JOVEM (Tranquilização Rápida): 5 mg (1 ampola = 1 mL) por via INTRAMUSCULAR (IM), isolado ou associado a Prometazina 25–50 mg IM (ou Midazolam 5 mg IM se agitação gravíssima). Pode repetir após 30–60 min. 2) DELIRIUM HIPERATIVO EM IDOSOS / ENFERMARIA (Regra 'Start Low, Go Slow'!): 0,5 mg a 1 mg VO (5 a 10 gotas) ou 1 a 2,5 mg IM; reavaliar em 30–60 min (evitar doses altas em idosos!).",
          "interval_text": "Dose sob demanda na emergência (repetir após 30–60 min se necessário)",
          "route": "Intramuscular (IM — via preferencial e mais segura na emergência!), Via Oral ou Subcutânea (cuidados paliativos). A via IV exige monitorização eletrocardiográfica contínua pelo alto risco de Torsades de Pointes!",
          "duration_text": "Uso agudo puntual para controle de risco de auto/heteroagressão",
          "population": "Adultos e Idosos (reduzir dose para 0,5 a 2,5 mg no idoso)",
          "max_daily_text": "15 a 20 mg/dia (em idosos com delirium, manter idealmente <= 3 a 5 mg/dia)",
          "administration": "ALERTA DE SEGURANÇA: NUNCA prescrever Haloperidol em pacientes com Doença de Parkinson ou Demência por Corpos de Lewy (causa rigidez acinética extrema e síndrome neuroléptica maligna — usar Quetiapina 12,5–25 mg VO!). Na abstinência alcoólica (Delirium Tremens), o haloperidol NÃO substitui o benzodiazepínico e reduz o limiar convulsivo.",
          "prescription_type": "Receita de controle especial C1",
          "cautions": "Prolonga o intervalo QTc (especialmente se administrado por via IV ou em pacientes com hipocalemia/hipomagnesemia).",
          "source_url": "https://consultas.anvisa.gov.br/#/bulario/"
        }
      ],
      "contraindications": [
        "Doença de Parkinson e Demência por Corpos de Lewy (contraindicação absoluta!)",
        "Síndrome do QT longo ou QTc > 500 ms",
        "Depressão grave do SNC / Coma",
        "Histórico de Síndrome Neuroléptica Maligna"
      ],
      "renal_adjustment": "Não requer ajuste renal específico, mas titular com cautela.",
      "adverse_reactions": [
        "Distonia aguda (crise oculógira, torcicolo espasmódico, trismo — mais comum em homens jovens)",
        "Acatisia (inquietação motora intensa que pode ser confundida com piora da agitação!)",
        "Parkinsonismo medicamentoso",
        "Prolongamento de QTc e Torsades de Pointes",
        "Síndrome Neuroléptica Maligna (febre alta, rigidez em 'cano de chumbo', CPK muito elevada e instabilidade autonômica)"
      ],
      "antidote": [
        "Distonia Aguda Extrapiramidal (Imediato): Biperideno (Akineton) 5 mg (1 ampola) IM ou IV lento (resolve a distonia em 5 a 15 minutos!) ou Prometazina 25–50 mg IM. Síndrome Neuroléptica Maligna: suspender haloperidol imediatamente, resfriamento ativo, hidratação vigorosa, Benzodiazepínicos, Dantroleno IV e/ou Bromocriptina."
      ],
      "reviewed_at": "2026-10-26",
      "pregnancy_category": "Categoria C",
      "pregnancy_text": "Antipsicótico típico de escolha para delirium e agitação grave quando medidas não farmacológicas falham.",
      "hepatic_adjustment": "Metabolismo hepático; reduzir dose em 50% na cirrose hepática."
    }
  },
  {
    "id": "seed-drug-morfina",
    "name": "Morfina (Sulfato de Morfina)",
    "active_ingredient": "Morfina",
    "therapeutic_class": "Analgésicos e Antitérmicos",
    "pharmacological_class": "Analgesico opioide forte puro (Agonista dos receptores mu-opioides)",
    "data": {
      "status": "posology_verified",
      "therapeutic_class": "Analgésicos e Antitérmicos · Opioide Forte",
      "indication": "Dor aguda intensa (politrauma, pós-operatório, queimados, cólica nefrítica refratária a AINEs, dor isquêmica da SCA refratária a nitratos), dor oncológica moderada a intensa e dispneia refratária/fome de ar em cuidados paliativos.",
      "diseases": [
        "Dor Aguda Intensa (Trauma, Pós-Operatório, Abdome Agudo)",
        "Dor Oncológica e Cuidados Paliativos",
        "Síndrome Coronariana Aguda com dor refratária"
      ],
      "products": [
        {
          "name": "Dimorf / Genérico",
          "type": "Farmácia / Hospitalar",
          "presentation": "Ampola 10 mg/1 mL e 2 mg/2 mL; Comp. 10 mg e 30 mg; Solução oral 10 mg/mL"
        }
      ],
      "formulations": [
        {
          "label": "Solução injetável 10 mg/1 mL (IV/SC) e Comprimido 10 mg / 30 mg (VO)",
          "dose_text": "1) TITULAÇÃO DE DOR AGUDA NA EMERGÊNCIA (Regra da Diluição Decimal — 1 mg/mL): Diluir 1 ampola de 10 mg/1 mL + 9 mL de SF 0,9% ou Água Destilada (concentração final = 1 mg/mL). Administrar 2 a 4 mL (2 a 4 mg) IV lento a cada 5 a 15 minutos até alívio da dor (0,05 a 0,1 mg/kg). Em idosos ou frágeis: fazer 1 a 2 mg IV por vez. 2) DOR ONCOLÓGICA / PALIATIVOS (Virgem de opioide): 5 a 10 mg VO (ou 2 a 5 mg SC/IV) de 4 em 4 horas + dose de resgate de 1/6 da dose diária total.",
          "interval_text": "Titulação IV a cada 5–15 min; manutenção de 4/4h",
          "route": "Endovenosa (IV), Subcutânea (SC) ou Via Oral (Equivalência: 1 mg IV/SC equivale a 3 mg VO!)",
          "duration_text": "Conforme controle álgico",
          "population": "Adultos e Pediatria (0,05 a 0,1 mg/kg IV)",
          "max_daily_text": "Sem efeito teto analgésico (limitado por sedação e frequência respiratória)",
          "administration": "SEMPRE prescrever laxativo estimulante/osmótico (ex.: Bisacodil ou Lactulose) profilático quando iniciar morfina de horário (a constipação por opioide não desenvolve tolerância!). No Edema Agudo de Pulmão, a morfina NÃO deve ser usada de rotina (aumenta necessidade de IOT e mortalidade no registro ADHERE).",
          "prescription_type": "Notificação de Receita A (Amarela)",
          "cautions": "Causa liberação direta de histamina pelos mastócitos (prurido, vasodilatação venosa e broncoespasmo em asmáticos) e contração do esfíncter de Oddi.",
          "source_url": "https://consultas.anvisa.gov.br/#/bulario/"
        }
      ],
      "contraindications": [
        "Depressão respiratória aguda sem suporte ventilatório",
        "Asma brônquica aguda grave (liberação de histamina agrava o broncoespasmo)",
        "Íleo paralítico ou obstrução intestinal mecânica",
        "EVITAR na Insuficiência Renal Grave (ClCr < 30 mL/min) e Dialíticos!"
      ],
      "renal_adjustment": "CONTRAINDICADA/EVITAR se ClCr < 30 mL/min! A morfina é metabolizada no fígado em Morfina-6-Glicuronídeo (M6G, 10x mais potente) e Morfina-3-Glicuronídeo (neurotóxico), que são excretados exclusivamente pelos rins e acumulam rapidamente na LRA/DRC, causando coma, mioclonias e parada respiratória tardia! Na insuficiência renal, preferir FENTANIL ou METADONA.",
      "adverse_reactions": [
        "Depressão respiratória (sempre precedida por sonolência/sedação!)",
        "Náuseas, vômitos e constipação intestinal",
        "Hipotensão arterial e bradicardia",
        "Prurido e retenção urinária",
        "Neurotoxicidade induzida por opioides (mioclonias, hiperalgesia e delirium em renais)"
      ],
      "antidote": [
        "Naloxona (Narcan 0,4 mg/1 mL): diluir 1 ampola + 9 mL SF 0,9% (0,04 mg/mL) e titular 1 a 2 mL IV a cada 2 min até FR >= 12 irpm."
      ],
      "reviewed_at": "2026-10-26",
      "pregnancy_category": "Categoria C",
      "pregnancy_text": "Opioide padrão ouro para dor intensa; na gestante em trabalho de parto pode causar depressão respiratória neonatal reversível por naloxona.",
      "hepatic_adjustment": "Reduzir dose e aumentar intervalo na cirrose pelo risco de precipitar encefalopatia hepática."
    }
  },
  {
    "id": "seed-drug-dipirona",
    "name": "Dipirona Monoidratada (Metamizol)",
    "active_ingredient": "Dipirona",
    "therapeutic_class": "Analgésicos e Antitérmicos",
    "pharmacological_class": "Analgésico não opioide, antipirético e espasmolítico derivado pirazolônico",
    "data": {
      "status": "posology_verified",
      "therapeutic_class": "Analgésicos e Antitérmicos · Analgésico e Antitérmico de 1ª Linha",
      "indication": "Dor aguda leve a moderada (cefaleia, pós-operatório, cólica nefrítica e biliar — potente ação espasmolítica na musculatura lisa!) e febre refratária.",
      "diseases": [
        "Febre / Hipertermia",
        "Dor Aguda e Pós-Operatória",
        "Cólica Nefrítica e Biliar",
        "Enxaqueca / Cefaleia Tensional Aguda"
      ],
      "products": [
        {
          "name": "Novalgina / Genérico",
          "type": "Farmácia / Hospitalar",
          "presentation": "Ampola 1 g/2 mL (500 mg/mL), Comp. 500 mg e 1 g, Gotas 500 mg/mL (1 gota = 25 mg)"
        }
      ],
      "formulations": [
        {
          "label": "Solução injetável 1 g/2 mL (IV), Comprimido 500 mg / 1 g e Gotas 500 mg/mL (VO)",
          "dose_text": "1) ADULTOS (IV ou VO): 1 g (1 ampola de 2 mL IV ou 1 comp. de 1 g ou 40 gotas VO) de 6 em 6 horas (na enxaqueca ou cólica nefrítica aguda, fazer 1 g a 2 g IV diluídos). 2) PEDIATRIA (> 3 meses ou > 5 kg): 15 a 25 mg/kg/dose de 6 em 6 horas (Regra prática das gotas 500 mg/mL: ~0,6 a 1 gota por kg de peso por dose, máx. 40 gotas).",
          "interval_text": "6/6h",
          "route": "Endovenosa (IV) lenta, Via Oral ou Intramuscular",
          "duration_text": "Conforme dor ou febre",
          "population": "Adultos e Pediatria (> 3 meses e > 5 kg)",
          "max_daily_text": "4 g/dia em adultos (até 5 g/dia em ambiente hospitalar por curto prazo)",
          "administration": "Na via IV, diluir 1 ampola (2 mL) em 10 a 20 mL de SF 0,9% ou AD e injetar LENTAMENTE (em 3 a 5 minutos; máx. 500 mg/min) — a injeção rápida em bolus causa queda abrupta da pressão arterial por vasodilatação direta!",
          "prescription_type": "Isento de prescrição / Uso hospitalar",
          "cautions": "Diferente dos AINEs tradicionais (cetoprofeno/diclofenaco), a dipirona tem mínimo efeito lesivo sobre a mucosa gástrica e função renal em uso curto.",
          "source_url": "https://consultas.anvisa.gov.br/#/bulario/"
        }
      ],
      "contraindications": [
        "Alergia a pirazolônicos (dipirona) ou síndrome da asma induzida por analgésicos",
        "Discrasias sanguíneas / agranulocitose prévia",
        "Porfiria hepática aguda intermitente",
        "Deficiência congênita de G6PD",
        "Menores de 3 meses de idade ou peso < 5 kg"
      ],
      "renal_adjustment": "Em insuficiência renal ou hepática graves, evitar doses elevadas repetidas (reduzir frequência para 8/8h ou 12/12h).",
      "adverse_reactions": [
        "Hipotensão arterial transitória (se injetada rapidamente por via IV)",
        "Reações anafiláticas / broncoespasmo e urticária",
        "Agranulocitose idiossincrática (muito rara na população brasileira)"
      ],
      "reviewed_at": "2026-10-26",
      "pregnancy_category": "Categoria C (1º e 2º trimestres) / D (3º trimestre — fechamento de canal arterial)",
      "pregnancy_text": "Evitar no 3º trimestre da gravidez.",
      "hepatic_adjustment": "Reduzir dose em cirrose descompensada grave."
    }
  },
  {
    "id": "seed-drug-ondansetrona",
    "name": "Ondansetrona (Cloridrato de Ondansetrona)",
    "active_ingredient": "Ondansetrona",
    "therapeutic_class": "Gastroenterologia e Antieméticos",
    "pharmacological_class": "Antiemético antagonista seletivo dos receptores serotoninérgicos 5-HT3 (central e periférico)",
    "data": {
      "status": "posology_verified",
      "therapeutic_class": "Gastroenterologia e Antieméticos · Antiemético 5-HT3",
      "indication": "Prevenção e tratamento de náuseas e vômitos agudos (gastroenterite aguda, pós-operatório, quimioterapia/radioterapia, hiperêmese gravídica refratária, cólica nefrítica e enxaqueca).",
      "diseases": [
        "Náuseas e Vômitos Agudos",
        "Gastroenterite Aguda com Vômitos",
        "Vômitos Pós-Operatórios e Pós-Quimioterapia"
      ],
      "products": [
        {
          "name": "Zofran / Vonau Flash / Genérico",
          "type": "Farmácia / Hospitalar",
          "presentation": "Ampola 4 mg/2 mL e 8 mg/4 mL (2 mg/mL); Comp. orodispersível 4 mg e 8 mg"
        }
      ],
      "formulations": [
        {
          "label": "Solução injetável 4 mg/2 mL e 8 mg/4 mL (IV) e Comprimido sublingual/orodispersível 4 mg e 8 mg (VO)",
          "dose_text": "1) ADULTOS (Emergência / Enfermaria): 4 mg a 8 mg IV lento (em 2–5 min) ou 1 comprimido orodispersível de 4 a 8 mg VO de 8 em 8 horas. 2) PEDIATRIA (> 6 meses): 0,15 mg/kg/dose IV ou VO (Dose prática por peso na gastroenterite: 8 a 15 kg = 2 mg; 15 a 30 kg = 4 mg; > 30 kg = 8 mg).",
          "interval_text": "8/8h (ou dose única na gastroenterite aguda pediátrica antes da TRO)",
          "route": "Endovenosa (IV) ou Via Oral / Orodispersível (dissolve na língua sem precisar engolir água!)",
          "duration_text": "Uso sintomático curto (1 a 5 dias)",
          "population": "Adultos e Pediatria (> 6 meses)",
          "max_daily_text": "24 a 32 mg/dia (Dose única IV máxima de 16 mg pelo risco de prolongamento de QTc; em idosos >= 75 anos, dose única IV máxima de 8 mg)",
          "administration": "Vantagem clínica crucial: diferentemente da Metoclopramida (Plasil) e da Bromoprida, a Ondansetrona NÃO bloqueia receptores de dopamina e NÃO causa reação extrapiramidal/acatisia/distonia aguda!",
          "prescription_type": "Receita simples / Uso hospitalar",
          "cautions": "Prolonga o intervalo QTc de forma dose-dependente! Evitar doses > 8 mg IV de uma só vez e corrigir K+ e Mg2+ em pacientes com cardiopatia ou em uso de outros fármacos que alargam o QT.",
          "source_url": "https://consultas.anvisa.gov.br/#/bulario/"
        }
      ],
      "contraindications": [
        "Síndrome do QT longo congênito",
        "Uso concomitante com Apomorfina (hipotensão profunda)"
      ],
      "hepatic_adjustment": "Na insuficiência hepática grave (Child-Pugh C): NÃO ultrapassar a dose diária máxima total de 8 mg/dia!",
      "adverse_reactions": [
        "Cefaleia (efeito adverso mais comum)",
        "Constipação intestinal (reduz trânsito colônico)",
        "Prolongamento do intervalo QTc (Torsades de Pointes raro em altas doses IV)"
      ],
      "reviewed_at": "2026-10-26",
      "pregnancy_category": "Categoria B",
      "pregnancy_text": "Amplamente utilizada em hiperêmese gravídica refratária; estudos recentes mostram segurança geral.",
      "renal_adjustment": "Não requer ajuste de dose."
    }
  },
  {
    "id": "seed-drug-omeprazol",
    "name": "Omeprazol (Oral e Sódico Injetável)",
    "active_ingredient": "Omeprazol",
    "therapeutic_class": "Gastroenterologia e Antieméticos",
    "pharmacological_class": "Inibidor da Bomba de Prótons — IBP (Bloqueador irreversível da H+/K+-ATPase da célula parietal gástrica)",
    "data": {
      "status": "posology_verified",
      "therapeutic_class": "Gastroenterologia e Antieméticos · Inibidor da Bomba de Prótons (IBP)",
      "indication": "Hemorragia Digestiva Alta (HDA) por úlcera péptica gastroduodenal, doença ulcerosa péptica, DRGE e esofagite erosiva, erradicação de H. pylori, profilaxia de gastropatia por AINEs/DAPT e profilaxia de úlcera de estresse em UTI.",
      "diseases": [
        "Hemorragia Digestiva Alta (HDA Não-Varicosa)",
        "Úlcera Péptica Gástrica e Duodenal",
        "Doença do Refluxo Gastroesofágico (DRGE)",
        "Profilaxia de Úlcera de Estresse em UTI"
      ],
      "products": [
        {
          "name": "Losec / Genérico",
          "type": "Farmácia / Hospitalar",
          "presentation": "Frasco-ampola liofilizado 40 mg (IV) com diluente próprio; Cápsula 20 mg e 40 mg (VO)"
        }
      ],
      "formulations": [
        {
          "label": "Pó liofilizado injetável 40 mg (IV) e Cápsula 20 mg / 40 mg (VO)",
          "dose_text": "1) HEMORRAGIA DIGESTIVA ALTA AGUDA (Protocolo de Alta Dose): Dose de ataque imediata de 80 mg IV (2 frascos-ampola) em bolus lento; após hemostasia endoscópica de úlcera de alto risco (Forrest Ia, Ib, IIa ou IIb), manter 8 mg/h em infusão contínua por 72 horas OU 40 mg IV de 12 em 12 horas por 72 horas. 2) PROFILAXIA DE ÚLCERA DE ESTRESSE EM UTI (VM > 48h ou coagulopatia): 40 mg IV ou VO 1x/dia. 3) DRGE / ÚLCERA PÉPTICA AMBULATORIAL: 20 a 40 mg VO em jejum (30 minutos antes do café da manhã) por 4 a 8 semanas.",
          "interval_text": "12/12h (HDA nas primeiras 72h) ou 24/24h (manutenção em jejum)",
          "route": "Endovenosa (IV) ou Via Oral (cápsulas com microgrânulos gastrorresistentes — não macerar os grânulos!)",
          "duration_text": "72h IV na HDA seguido de 4–8 semanas VO",
          "population": "Adultos e Pediatria (1 mg/kg/dia)",
          "max_daily_text": "80 mg bolus + 8 mg/h (272 mg no 1º dia de HDA) ou 80 mg/dia",
          "administration": "Na via oral, o paciente DEVE tomar a cápsula em jejum, 30 minutos antes da refeição (pois o IBP só inibe as bombas de prótons que forem ativadas pelo estímulo alimentar subsequente!).",
          "prescription_type": "Receita simples / Uso hospitalar",
          "cautions": "Na HDA, o IBP eleva o pH gástrico para >= 6,0, o que é indispensável para estabilizar o coágulo plaquetário e impedir que a pepsina o dissolva.",
          "source_url": "https://consultas.anvisa.gov.br/#/bulario/"
        }
      ],
      "contraindications": [
        "Hipersensibilidade conhecida aos benzimidazóis substituídos (IBPs)"
      ],
      "hepatic_adjustment": "Na cirrose hepática avançada (Child-Pugh C), reduzir dose de manutenção para 20 mg/dia.",
      "adverse_reactions": [
        "Cefaleia, diarreia ou dor abdominal leve",
        "No uso crônico prolongado (> 1 ano): hipomagnesemia, deficiência de vitamina B12/ferro e nefrite intersticial aguda idiossincrática"
      ],
      "drug_interactions": [
        "Clopidogrel: o omeprazol inibe fortemente a enzima CYP2C19, necessária para converter o clopidogrel em seu metabólito ativo! Em pacientes em uso de Clopidogrel (pós-stent/SCA), preferir PANTOPRAZOL 40 mg/dia.",
        "Reduz a absorção de fármacos dependentes de pH ácido (Cetoconazol, Itraconazol, Atazanavir, Sulfato Ferroso e Levotiroxina)."
      ],
      "reviewed_at": "2026-10-26",
      "pregnancy_category": "Categoria B",
      "pregnancy_text": "Inibidor de bomba de prótons mais testado e seguro em todos os trimestres da gestação.",
      "renal_adjustment": "Não requer ajuste na insuficiência renal."
    }
  },
  {
    "id": "seed-drug-insulina-regular",
    "name": "Insulina Humana Regular (Ação Rápida)",
    "active_ingredient": "Insulina Humana Regular",
    "therapeutic_class": "Endocrinologia e Metabolismo",
    "pharmacological_class": "Insulina humana de ação rápida (Hexamérica — única insulina comum que pode ser administrada por via Endovenosa!)",
    "data": {
      "status": "posology_verified",
      "therapeutic_class": "Endocrinologia e Metabolismo · Insulina Rápida (CAD / EHH / Hipercalemia)",
      "indication": "Cetoacidose Diabética (CAD), Estado Hiperglicêmico Hiperosmolar (EHH), Solução Polarizante na Hipercalemia Aguda (junto com glicose), controle glicêmico contínuo em UTI e correção prandial/hiperglicemia hospitalar.",
      "diseases": [
        "Cetoacidose Diabética (CAD)",
        "Estado Hiperglicêmico Hiperosmolar (EHH)",
        "Hipercalemia Aguda (Solução Polarizante)",
        "Hiperglicemia Hospitalar / UTI"
      ],
      "products": [
        {
          "name": "Humulin R / Novolin R",
          "type": "Farmácia / Hospitalar",
          "presentation": "Frasco-ampola 10 mL com 100 UI/mL (Solução límpida e incolor!)"
        }
      ],
      "formulations": [
        {
          "label": "Solução injetável 100 UI/mL (Frasco 10 mL)",
          "dose_text": "1) CETOACIDOSE DIABÉTICA E EHH (Bomba de Infusão Contínua — APENAS SE K+ >= 3,3 mEq/L!): Diluição padrão (1 UI/mL): 100 UI de Insulina Regular (1 mL) + 99 mL de SF 0,9% (desprezar 20 mL no equipo antes de conectar para saturar o plástico!). Iniciar infusão contínua a 0,1 UI/kg/h (ex.: 70 kg = 7 mL/h), ou bolus de 0,1 UI/kg + 0,1 UI/kg/h. Quando glicemia atingir 200 mg/dL na CAD, reduzir para 0,02–0,05 UI/kg/h e associar SG 5%. 2) HIPERCALEMIA AGUDA (Solução Polarizante): 10 UI de Insulina Regular + 50 g de Glicose (100 mL de Glicose 50% ou 500 mL de SG 10%) correr IV em 30–60 min.",
          "interval_text": "Infusão contínua IV em BIC (glicemia capilar de 1/1h) ou Subcutânea de 4/4h a 6/6h",
          "route": "Endovenosa (IV — na CAD, EHH e Hipercalemia) ou Subcutânea (SC)",
          "duration_text": "Na CAD: manter IV até resolução da acidose (pH > 7,30, HCO3 >= 18 e AG <= 12) + 1 a 2h de sobreposição com insulina NPH/Glargina SC!",
          "population": "Adultos, Gestantes e Pediatria",
          "max_daily_text": "Titulado conforme glicemia e resolução da cetonemia",
          "administration": "3 REGRAS QUE SALVAM VIDAS: 1) JAMAIS iniciar Insulina na CAD/EHH se o Potássio sérico for < 3,3 mEq/L (repor KCl antes, sob risco de PCR!). 2) Na transição da bomba IV para o subcutâneo na CAD, aplicar a Insulina Basal (NPH ou Glargina) 1 a 2 HORAS ANTES de desligar a bomba de insulina IV (a meia-vida da insulina IV é de apenas 4–5 minutos; desligar sem overlap causa rebote imediato da cetoacidose!). 3) Nunca fazer Insulina NPH (leitosa) na veia!",
          "prescription_type": "Receita simples / Uso hospitalar",
          "cautions": "Na via IV: início de ação imediato, pico em 15–30 min e meia-vida de 4–5 min. Na via SC: início em 30 min, pico em 2–3h e duração de 6–8h.",
          "source_url": "https://consultas.anvisa.gov.br/#/bulario/"
        }
      ],
      "contraindications": [
        "Hipoglicemia",
        "Hipocalemia grave (< 3,3 mEq/L — corrigir K+ antes de iniciar insulina!)"
      ],
      "renal_adjustment": "Na insuficiência renal (ClCr < 50 mL/min), o rim reduz a degradação da insulina exógena! Na hipercalemia do paciente renal/dialítico, preferir usar apenas 5 UI de Insulina Regular + 50 g de Glicose e monitorar glicemia capilar até a 6ª hora pelo alto risco de hipoglicemia tardia.",
      "adverse_reactions": [
        "Hipoglicemia",
        "Hipocalemia, hipofosfatemia e hipomagnesemia (por influxo intracelular)",
        "Edema cerebral (se queda abrupta da glicemia/osmolaridade > 100 mg/dL/h em crianças com CAD)"
      ],
      "antidote": [
        "Hipoglicemia (< 70 mg/dL): Se consciente = 15 g de carboidrato rápido VO. Se rebaixado/inconsciente = 40 mL de Glicose 50% IV (4 ampolas de 10 mL) em bolus + manter SG 10% (ou Glucagon 1 mg IM se sem acesso venoso)."
      ],
      "reviewed_at": "2026-10-26",
      "pregnancy_category": "Categoria B (Insulina de escolha na gestação)",
      "pregnancy_text": "Tratamento padrão ouro no diabetes gestacional e descompensações agudas maternas.",
      "hepatic_adjustment": "Depuração hepática reduzida em cirrose; monitorar glicemia e risco aumentado de hipoglicemia."
    }
  },
  {
    "id": "seed-drug-hidrocortisona",
    "name": "Hidrocortisona (Succinato Sódico de Hidrocortisona)",
    "active_ingredient": "Hidrocortisona",
    "therapeutic_class": "Corticoides e Anti-inflamatórios",
    "pharmacological_class": "Glicocorticoide sistêmico de ação curta com atividade mineralocorticoide equivalente ao cortisol endógeno",
    "data": {
      "status": "posology_verified",
      "therapeutic_class": "Corticoides e Anti-inflamatórios · Corticoide Venoso (Choque Séptico e Crise Adrenal)",
      "indication": "Choque Séptico refratário a fluidos e doses moderadas/altas de vasopressores (Noradrenalina >= 0,25 mcg/kg/min), Crise Adrenal Aguda (Insuficiência Adrenal Aguda — droga de escolha!), crise de asma/DPOC grave (quando via oral é inviável) e Tempestade Tireotóxica.",
      "diseases": [
        "Choque Séptico Refratário",
        "Insuficiência Adrenal Aguda (Crise Adrenal)",
        "Crise Asmática Grave / Exacerbação de DPOC",
        "Tempestade Tireotóxica"
      ],
      "products": [
        {
          "name": "Solu-Cortef / Cortisonal / Genérico",
          "type": "Hospitalar",
          "presentation": "Frasco-ampola liofilizado 100 mg e 500 mg"
        }
      ],
      "formulations": [
        {
          "label": "Pó liofilizado injetável 100 mg e 500 mg (IV/IM)",
          "dose_text": "1) CHOQUE SÉPTICO REFRATÁRIO (Surviving Sepsis Campaign): 200 mg/dia IV divididos em 50 mg IV de 6 em 6 horas (ou infusão contínua de 200 mg/24h = 8,3 mg/h). 2) CRISE ADRENAL AGUDA (Insuficiência Adrenal Primária ou Secundária): Ataque imediato de 100 mg IV em bolus + 200 mg/24h (50 mg IV de 6/6h) + ressuscitação vigorosa com SF 0,9% e glicose. 3) ASMA GRAVE / ANAFILAXIA (Adjuvante): 200 mg IV de 6/6h a 8/8h (Pediatria: 4 a 8 mg/kg IV, máx. 250 mg).",
          "interval_text": "6/6h (ou infusão contínua em 24h)",
          "route": "Endovenosa (IV) em bolus lento (diluída em 2 a 10 mL de AD/SF) ou Intramuscular",
          "duration_text": "No choque séptico: manter enquanto em uso de vasopressor e suspender quando o paciente sair de vasopressor",
          "population": "Adultos, Gestantes e Pediatria",
          "max_daily_text": "200 a 400 mg/dia",
          "administration": "EQUIVALÊNCIA DE CORTICOIDES (Dose Anti-inflamatória Equivalente): Hidrocortisona 20 mg = Prednisona 5 mg = Metilprednisolona 4 mg = Dexametasona 0,75 mg! Na Crise Adrenal Primária (Doença de Addison), a Hidrocortisona em dose >= 100 mg/dia já fornece atividade mineralocorticoide suficiente (dispensa associar Fludrocortisona na fase aguda!).",
          "prescription_type": "Uso restrito hospitalar",
          "cautions": "Na anafilaxia, a hidrocortisona demora 4 a 6 horas para fazer efeito (serve apenas para prevenir reação bifásica tardia — NUNCA substitui a Adrenalina IM imediata!).",
          "source_url": "https://consultas.anvisa.gov.br/#/bulario/"
        }
      ],
      "contraindications": [
        "Infecções fúngicas sistêmicas não tratadas (relativa — nenhuma contraindicação absoluta na Crise Adrenal ou Choque Séptico!)"
      ],
      "renal_adjustment": "Não requer ajuste de dose na insuficiência renal.",
      "adverse_reactions": [
        "Hiperglicemia (monitorar glicemia capilar no paciente crítico)",
        "Hipernatremia e hipocalemia (efeito mineralocorticoide)",
        "Leucocitose neutrofilica por desmarginalização"
      ],
      "reviewed_at": "2026-10-26",
      "pregnancy_category": "Categoria C",
      "pregnancy_text": "Inativada pela enzima placentária 11-beta-HSD2, protegendo o feto; corticoide de escolha na crise adrenal materna.",
      "hepatic_adjustment": "Metabolismo hepático; monitorar efeitos sistêmicos em hepatopatas graves."
    }
  },
  {
    "id": "seed-drug-dexametasona",
    "name": "Dexametasona (Fosfato Dissódico de Dexametasona)",
    "active_ingredient": "Dexametasona",
    "therapeutic_class": "Corticoides e Anti-inflamatórios",
    "pharmacological_class": "Glicocorticoide fluorado de longa duração e altíssima potência (25–30x mais potente que a hidrocortisona e ZERO atividade mineralocorticoide!)",
    "data": {
      "status": "posology_verified",
      "therapeutic_class": "Corticoides e Anti-inflamatórios · Corticoide de Alta Potência (SNC / Meningite / Croup)",
      "indication": "Meningite Bacteriana Aguda (reduz surdez e mortalidade no pneumococo), Edema Cerebral Vasogênico (tumores cerebrais, metástases e abscesso cerebral) e Compressão Medular Neoplásica, Laringotraqueíte Viral Aguda (Crupe), Maturação Pulmonar Fetal (24 a 34 semanas) e Pneumonia por COVID-19 hipoxêmica.",
      "diseases": [
        "Meningite Bacteriana Aguda",
        "Edema Cerebral Vasogênico (Tumores / Metástases) e Compressão Medular",
        "Laringotraqueíte Aguda (Crupe Pediátrico)",
        "Maturação Pulmonar Fetal no Trabalho de Parto Prematuro"
      ],
      "products": [
        {
          "name": "Decadron / Genérico",
          "type": "Farmácia / Hospitalar",
          "presentation": "Ampola 4 mg/mL (2,5 mL = 10 mg) e 2 mg/mL (1 mL = 2 mg); Comp. 4 mg; Elixir 0,1 mg/mL"
        }
      ],
      "formulations": [
        {
          "label": "Solução injetável 4 mg/mL (Frasco-ampola 2,5 mL = 10 mg) e Comprimido 4 mg",
          "dose_text": "1) MENINGITE BACTERIANA AGUDA: 10 mg (1 ampola de 2,5 mL) IV de 6 em 6 horas por 4 dias (Pediatria: 0,15 mg/kg IV de 6/6h por 2–4 dias) — administrar 15 a 20 minutos ANTES ou junto com a 1ª dose do antibiótico! 2) EDEMA CEREBRAL TUMORAL / COMPRESSÃO MEDULAR: Ataque de 10 mg IV em bolus, seguido de 4 mg IV ou VO de 6 em 6 horas. 3) CRUPE (Laringotraqueíte Viral): 0,15 a 0,6 mg/kg VO, IM ou IV em DOSE ÚNICA (máx. 10–16 mg). 4) MATURAÇÃO PULMONAR FETAL (24 a 34 sem): 6 mg IM de 12 em 12 horas por 4 doses (total 24 mg).",
          "interval_text": "6/6h (Meningite e Edema Cerebral), 12/12h (Obstetrícia) ou Dose Única (Crupe)",
          "route": "Endovenosa (IV), Intramuscular (IM) ou Via Oral (biodisponibilidade oral excelente ~80–90%)",
          "duration_text": "Dose única a 4 dias (desmame gradual se uso > 10–14 dias)",
          "population": "Adultos, Gestantes e Pediatria",
          "max_daily_text": "40 mg/dia",
          "administration": "POR QUE USAR DEXAMETASONA NO EDEMA CEREBRAL E NÃO HIDROCORTISONA? Porque a Dexametasona tem 0% de efeito mineralocorticoide (não retém sódio e água!). ATENÇÃO: Corticoides são eficazes no edema cerebral VASOGÊNICO (tumores/abscessos), mas são CONTRAINDICADOS no Traumatismo Cranioencefálico (TCE — Estudo CRASH mostrou aumento de mortalidade!) e no AVC Isquêmico/Hemorrágico!",
          "prescription_type": "Receita simples / Uso hospitalar",
          "cautions": "Na suspeita de Crise Adrenal sem confirmação laboratorial prévia, a Dexametasona é o único corticoide que NÃO cruza no imunoensaio de dosagem de cortisol sérico (permite tratar e colher o teste de estímulo com ACTH simultaneamente).",
          "source_url": "https://consultas.anvisa.gov.br/#/bulario/"
        }
      ],
      "contraindications": [
        "Traumatismo Cranioencefálico (TCE — contraindicado! Aumenta mortalidade!)",
        "Infecções fúngicas sistêmicas sem cobertura antifúngica",
        "Estrongiloidíase disseminada (profilaxia com Ivermectina antes de cursos prolongados)"
      ],
      "renal_adjustment": "Não requer ajuste de dose na insuficiência renal.",
      "adverse_reactions": [
        "Hiperglicemia acentuada",
        "Prurido/queimação perineal transitória se injetada em bolus IV rápido sem diluir (diluir em 10–20 mL de SF e correr em 3–5 min!)",
        "Insônia, agitação/psicose induzida por corticoide",
        "Soluços"
      ],
      "reviewed_at": "2026-10-26",
      "pregnancy_category": "Categoria C (Atravessa a placenta)",
      "pregnancy_text": "Excelente para maturação pulmonar fetal (Betametasona ou Dexametasona 6 mg IM 12/12h por 4 doses entre 24–34 semanas).",
      "hepatic_adjustment": "Não requer ajuste de dose."
    }
  },
  {
    "id": "seed-drug-salbutamol",
    "name": "Salbutamol (Sulfato de Salbutamol / Albuterol)",
    "active_ingredient": "Salbutamol",
    "therapeutic_class": "Pneumologia e Broncodilatadores",
    "pharmacological_class": "Broncodilatador Beta-2 agonista adrenérgico seletivo de curta duração (SABA)",
    "data": {
      "status": "posology_verified",
      "therapeutic_class": "Pneumologia e Broncodilatadores · Broncodilatador SABA de Resgate",
      "indication": "Primeira linha no alívio imediato do broncoespasmo agudo na Crise de Asma, Exacerbação Aguda de DPOC, Broncoespasmo na Anafilaxia e terapia adjuvante de shift intracelular de potássio na Hipercalemia Aguda.",
      "diseases": [
        "Crise de Asma Aguda (GINA)",
        "Exacerbação Aguda de DPOC (GOLD)",
        "Broncoespasmo por Anafilaxia",
        "Hipercalemia Aguda (Terapia Adjuvante)"
      ],
      "products": [
        {
          "name": "Aerolin / Genérico",
          "type": "Farmácia / Hospitalar",
          "presentation": "Spray pressurizado (pMDI) 100 mcg/jato; Solução para nebulização 5 mg/mL (1 mL = 20 gotas = 5 mg)"
        }
      ],
      "formulations": [
        {
          "label": "Spray inalatório 100 mcg/jato (usar com espaçador!) e Solução p/ nebulização 5 mg/mL",
          "dose_text": "1) CRISE DE ASMA AGUDA / DPOC EXACERBADO (1ª Hora — Preferir Spray com Espaçador!): Spray 100 mcg/jato com espaçador: 4 a 10 jatos (400 a 1.000 mcg) a cada 20 minutos na 1ª hora (3 ciclos), depois a cada 1 a 4 horas conforme resposta (Associar Ipratrópio nas crises moderadas/graves!). Se usar Nebulização: 2,5 a 5 mg (10 a 20 gotas da solução 5 mg/mL) diluídos em 4 mL de SF 0,9% a cada 20 min na 1ª hora. 2) HIPERCALEMIA AGUDA (Dose 4x maior!): 10 a 20 mg em nebulização (2 a 4 mL = 40 a 80 gotas da solução 5 mg/mL) ou 10 a 20 jatos no espaçador em 10–15 min.",
          "interval_text": "A cada 20 min na 1ª hora da crise, depois de 1/1h a 4/4h",
          "route": "Inalatória (Spray pressurizado com espaçador ou Nebulização com fluxo de 6–8 L/min)",
          "duration_text": "Uso de resgate durante o broncoespasmo agudo",
          "population": "Adultos, Gestantes e Pediatria (Crianças <= 5 anos: 2 a 6 jatos com espaçador e máscara a cada 20 min na 1ª hora)",
          "max_daily_text": "Titulado na emergência conforme resposta clínica",
          "administration": "EVIDÊNCIA CLÍNICA (GINA / Cochrane): O uso de Spray pressurizado (pMDI) acoplado a um ESPAÇADOR é tão ou mais eficaz que o nebulizador, tem início mais rápido, causa menos taquicardia e não gera aerossóis contaminantes! Na Asma ambulatorial, NUNCA prescrever SABA isolado sem Corticoide Inalatório associado (aumenta risco de crise grave e óbito).",
          "prescription_type": "Receita simples / Uso hospitalar",
          "cautions": "Estimula a bomba Na+/K+-ATPase no músculo esquelético, deslocando potássio do sangue para o meio intracelular (reduz K+ sérico em 0,5 a 1,0 mEq/L) e aumenta lactato sérico (hiperlactatemia tipo B benigna).",
          "source_url": "https://consultas.anvisa.gov.br/#/bulario/"
        }
      ],
      "contraindications": [
        "Hipersensibilidade aos componentes da fórmula (não há contraindicação em crise de broncoespasmo; taquicardia sinusal pela hipóxia/ansiedade da asma NÃO contraindica o salbutamol!)"
      ],
      "renal_adjustment": "Não requer ajuste de dose.",
      "adverse_reactions": [
        "Tremor fino de extremidades (muito comum)",
        "Taquicardia sinusal reflexa e palpitações",
        "Hipocalemia (especialmente se associado a corticoides e diuréticos)",
        "Hiperglicemia e elevação transitória do lactato sérico"
      ],
      "reviewed_at": "2026-10-26",
      "pregnancy_category": "Categoria C",
      "pregnancy_text": "Broncodilatador de curta ação de escolha na crise asmática em gestantes.",
      "hepatic_adjustment": "Não requer ajuste na insuficiência hepática."
    }
  },
  {
    "id": "seed-drug-ipratropio",
    "name": "Brometo de Ipratrópio (Atrovent)",
    "active_ingredient": "Brometo de Ipratrópio",
    "therapeutic_class": "Pneumologia e Broncodilatadores",
    "pharmacological_class": "Broncodilatador anticolinérgico (antimuscarínico M3) de curta duração (SAMA)",
    "data": {
      "status": "posology_verified",
      "therapeutic_class": "Pneumologia e Broncodilatadores · Anticolinérgico SAMA (Asma Grave e DPOC)",
      "indication": "Terapia combinada obrigatória na 1ª hora da Crise de Asma Moderada a Grave (junto com Salbutamol — reduz significativamente a taxa de internação hospitalar!) e na Exacerbação Aguda de DPOC.",
      "diseases": [
        "Crise de Asma Moderada a Grave",
        "Exacerbação Aguda de DPOC"
      ],
      "products": [
        {
          "name": "Atrovent / Genérico",
          "type": "Farmácia / Hospitalar",
          "presentation": "Solução para nebulização 0,25 mg/mL (1 mL = 20 gotas = 0,25 mg = 250 mcg); Spray 20 mcg/jato"
        }
      ],
      "formulations": [
        {
          "label": "Solução para nebulização 0,25 mg/mL (250 mcg/20 gotas) e Spray 20 mcg/jato",
          "dose_text": "1) ADULTOS (Crise de Asma Moderada/Grave e DPOC Exacerbado): Spray com espaçador: 4 a 8 jatos (80 a 160 mcg) a cada 20 minutos na 1ª hora (depois de 4/4h a 6/6h). Nebulização: 40 gotas (2 mL = 0,5 mg = 500 mcg) diluídas em 3–4 mL de SF 0,9% (junto com Salbutamol) a cada 20 minutos na 1ª hora (3 doses), depois de 4/4h a 6/6h. 2) PEDIATRIA (< 20 kg): 20 gotas (1 mL = 250 mcg) nebulizadas ou 4 jatos no espaçador a cada 20 min na 1ª hora.",
          "interval_text": "A cada 20 min na 1ª hora (3 doses), depois de 4/4h a 6/6h",
          "route": "Inalatória exclusiva (NÃO ingerir as gotas!)",
          "duration_text": "Primeiras 24–48h da exacerbação aguda",
          "population": "Adultos e Pediatria",
          "max_daily_text": "2 mg/dia em nebulização",
          "administration": "Por ser uma amina quaternária, o ipratrópio tem baixíssima absorção sistêmica e não atravessa a barreira hematoencefálica (quase não causa taquicardia ou efeitos sistêmicos atropínicos).",
          "prescription_type": "Receita simples / Uso hospitalar",
          "cautions": "Ajustar bem a máscara facial durante a nebulização para evitar que a névoa atinja os olhos (o contato ocular direto causa midríase unilateral — 'anisocoria farmacológica benigna' — e pode precipitar glaucoma agudo de ângulo fechado!).",
          "source_url": "https://consultas.anvisa.gov.br/#/bulario/"
        }
      ],
      "contraindications": [
        "Hipersensibilidade à atropina ou seus derivados"
      ],
      "renal_adjustment": "Não requer ajuste de dose.",
      "adverse_reactions": [
        "Boca seca (xerostomia) e gosto amargo",
        "Midríase unilateral e turvação visual se a névoa do nebulizador entrar em contato com o olho",
        "Retenção urinária rara em idosos com hiperplasia prostática grave"
      ],
      "reviewed_at": "2026-10-26",
      "pregnancy_category": "Categoria B",
      "pregnancy_text": "Anticolinérgico inalatório seguro como adjuvante na crise de asma e DPOC na gestação.",
      "hepatic_adjustment": "Não requer ajuste de dose."
    }
  },
  {
    "id": "seed-drug-clopidogrel",
    "name": "Clopidogrel (Bissulfato de Clopidogrel)",
    "active_ingredient": "Clopidogrel",
    "therapeutic_class": "Anticoagulantes e Trombolíticos",
    "pharmacological_class": "Antiagregante plaquetário tienopiridínico (Inibidor irreversível do receptor P2Y12 de ADP)",
    "data": {
      "status": "posology_verified",
      "therapeutic_class": "Anticoagulantes e Trombolíticos · Antiagregante Plaquetário P2Y12",
      "indication": "Dupla Antiagregação Plaquetária (DAPT com AAS) na Síndrome Coronariana Aguda (IAMCSST, IAMSSST e Angina Instável), Pós-Implante de Stent Coronariano/Carotídeo, AVC Isquêmico Menor (NIHSS <= 3) ou AIT de Alto Risco (ABCD2 >= 4 — Estudos CHANCE/POINT por 21 dias) e Doença Arterial Periférica.",
      "diseases": [
        "Infarto Agudo do Miocárdio (IAMCSST e IAMSSST)",
        "Angina Instável / Pós-Angioplastia com Stent",
        "AVC Isquêmico Menor e AIT de Alto Risco",
        "Doença Arterial Obstrutiva Periférica"
      ],
      "products": [
        {
          "name": "Plavix / Iscover / Genérico",
          "type": "Farmácia / Hospitalar",
          "presentation": "Comprimido revestido 75 mg (e 300 mg hospitalar)"
        }
      ],
      "formulations": [
        {
          "label": "Comprimido revestido 75 mg",
          "dose_text": "1) IAM COM SUPRA DE ST SUBMETIDO À ANGIOPLASTIA PRIMÁRIA (Quando Ticagrelor/Prasugrel indisponíveis): Ataque de 600 mg VO (8 comprimidos de 75 mg) imediatamente. 2) IAM COM SUPRA SUBMETIDO À TROMBÓLISE COM ALTEPLASE/TENECTEPLASE (Regra da Idade de 75 anos!): Se <= 75 anos: ataque de 300 mg VO (4 comp. de 75 mg); Se > 75 anos: NÃO FAZER ATAQUE — administrar apenas 75 mg VO (1 comp.) pelo alto risco de hemorragia intracraniana! 3) AVC ISQUÊMICO MENOR (NIHSS <= 3) OU AIT DE ALTO RISCO (Não trombolisado): Ataque de 300 mg VO no Dia 1 + 75 mg/dia do Dia 2 ao Dia 21 (associado ao AAS 100 mg/dia por 21 dias, mantendo monoterapia depois). 4) MANUTENÇÃO CRÔNica: 75 mg VO 1x/dia.",
          "interval_text": "Ataque em dose única + Manutenção de 24/24h (1x/dia)",
          "route": "Via Oral (com ou sem alimentos)",
          "duration_text": "12 meses de DAPT após SCA (ou 21 dias de DAPT no AVEi menor/AIT)",
          "population": "Adultos",
          "max_daily_text": "600 mg (ataque) / 75 mg (manutenção)",
          "administration": "Suspender 5 a 7 dias antes de cirurgias eletivas de alto risco hemorrágico ou cirurgia de revascularização miocárdica (CRVM). Nunca suspender DAPT precocemente após stent sem discussão com a cardiologia (risco de trombose aguda de stent!).",
          "prescription_type": "Receita simples / Uso hospitalar",
          "cautions": "É um pró-fármaco que exige ativação hepática pela CYP2C19. Evitar associar com Omeprazol ou Esomeprazol (que inibem a CYP2C19 e reduzem o efeito antiplaquetário) — se precisar de protetor gástrico, prescrever PANTOPRAZOL 40 mg/dia!",
          "source_url": "https://consultas.anvisa.gov.br/#/bulario/"
        }
      ],
      "contraindications": [
        "Sangramento patológico ativo (úlcera péptica hemorrágica, hemorragia intracraniana)",
        "Primeiras 24 horas após trombólise venosa com Alteplase no AVC Isquêmico!"
      ],
      "renal_adjustment": "Não requer ajuste de dose na insuficiência renal.",
      "adverse_reactions": [
        "Sangramentos (gastrointestinal, epistaxe, hematomas)",
        "Púrpura Trombocitopênica Trombótica (PTT — rara, nas primeiras 2 semanas)",
        "Dispepsia e rash cutâneo"
      ],
      "drug_interactions": [
        "Omeprazol e Esomeprazol (inibem CYP2C19 — trocar por Pantoprazol)",
        "Anticoagulantes orais e AINEs (aumentam risco de sangramento digestivo)"
      ],
      "reviewed_at": "2026-10-26",
      "pregnancy_category": "Categoria B",
      "pregnancy_text": "Usar na gestante com SCA ou stent coronário recente quando indicado pelo cardiologista.",
      "hepatic_adjustment": "Pró-droga que requer bioativação hepática pelo CYP2C19; usar com cautela em cirróticos."
    }
  },
  {
    "id": "seed-drug-rivaroxabana",
    "name": "Rivaroxabana (Xarelto)",
    "active_ingredient": "Rivaroxabana",
    "therapeutic_class": "Anticoagulantes e Trombolíticos",
    "pharmacological_class": "Anticoagulante Oral Direto (DOAC) — Inibidor direto e seletivo do Fator Xa",
    "data": {
      "status": "posology_verified",
      "therapeutic_class": "Anticoagulantes e Trombolíticos · Anticoagulante Oral Direto (DOAC Anti-Xa)",
      "indication": "Prevenção de AVC e embolia sistêmica na Fibrilação Atrial não-valvar, tratamento e prevenção de recorrência de Trombose Venosa Profunda (TVP) e Tromboembolismo Pulmonar (TEP) — permite tratamento oral desde o Dia 1 sem necessidade de enoxaparina prévia! — e profilaxia de TEV em artroplastia de quadril/joelho.",
      "diseases": [
        "Fibrilação Atrial Não-Valvar",
        "Trombose Venosa Profunda (TVP)",
        "Tromboembolismo Pulmonar (TEP) de Baixo/Intermediário Risco"
      ],
      "products": [
        {
          "name": "Xarelto / Genérico",
          "type": "Farmácia / Hospitalar",
          "presentation": "Comprimidos revestidos 10 mg, 15 mg e 20 mg (e 2,5 mg)"
        }
      ],
      "formulations": [
        {
          "label": "Comprimido revestido 15 mg e 20 mg",
          "dose_text": "1) TRATAMENTO DE TVP E TEP AGUDOS (Esquema EINSTEIN — Sem necessidade de Heparina prévia!): Fase de ataque inicial: 15 mg VO de 12 em 12 horas (com alimentos!) pelos primeiros 21 dias (3 semanas). A partir do 22º dia (Manutenção): 20 mg VO 1x ao dia (com a principal refeição!) por pelo menos 3 a 6 meses. 2) FIBRILAÇÃO ATRIAL NÃO-VALVAR: Função renal com ClCr >= 50 mL/min = 20 mg VO 1x ao dia com o jantar; Se ClCr entre 15 e 49 mL/min = 15 mg VO 1x ao dia com o jantar. 3) PROFILAXIA ESTENDIDA PÓS-TEV (> 6 meses): 10 mg VO 1x/dia.",
          "interval_text": "12/12h nos primeiros 21 dias de TVP/TEP, depois 24/24h (1x/dia)",
          "route": "Via Oral — OBRIGATÓRIO tomar as doses de 15 mg e 20 mg JUNTO COM ALIMENTOS (em jejum a absorção da dose de 20 mg cai de ~100% para apenas 66% e perde eficácia anticoagulante!)",
          "duration_text": "3 a 6 meses (TVP/TEP provocado) ou uso contínuo (FA / TEV não provocado de alto risco)",
          "population": "Adultos",
          "max_daily_text": "30 mg/dia (nos primeiros 21 dias de TVP/TEP) ou 20 mg/dia (manutenção)",
          "administration": "Atenção à orientação alimentar: as apresentações de 15 mg e 20 mg DEVEM ser tomadas durante o almoço ou jantar! Além disso, se o paciente usar Sonda Nasoenteral (SNE) pós-pilórica (jejunal), a rivaroxabana não é absorvida adequadamente no intestino distal (preferir Apixabana ou Enoxaparina em pacientes com sonda jejunal).",
          "prescription_type": "Receita simples",
          "cautions": "Contraindicada em portadores de Prótese Valvar Mecânica, Estenose Mitral Reumática Moderada a Grave e Síndrome Antifosfolípide (SAF triplo-positiva ou arterial) — nesses 3 cenários, usar obrigatoriamente VARFARINA!",
          "source_url": "https://consultas.anvisa.gov.br/#/bulario/"
        }
      ],
      "contraindications": [
        "Sangramento ativo clinicamente significativo",
        "Prótese valvar cardíaca mecânica ou Estenose Mitral moderada a grave (usar Varfarina)",
        "Síndrome do Anticorpo Antifosfolípide (SAF — usar Varfarina)",
        "Cirrose hepática Child-Pugh B ou C com coagulopatia",
        "Insuficiência renal grave com ClCr < 15 mL/min",
        "Gestação e lactação (atravessa a placenta — usar Enoxaparina na gestante!)"
      ],
      "renal_adjustment": "Calcular ClCr pela fórmula de Cockcroft-Gault! Na FA: ClCr 15–49 mL/min = 15 mg VO 1x/dia; ClCr < 15 mL/min = Contraindicada! No tratamento de TVP/TEP: evitar se ClCr < 30 mL/min.",
      "adverse_reactions": [
        "Sangramento gastrointestinal, gengivorragia, epistaxe e hematúria",
        "Anemia pós-hemorrágica"
      ],
      "drug_interactions": [
        "Contraindicado o uso concomitante com inibidores potentes duplos de CYP3A4 e P-gp (Cetoconazol, Itraconazol, Voriconazol, Ritonavir) e indutores potentes (Rifampicina, Fenitoína, Carbamazepina, Fenobarbital)."
      ],
      "antidote": [
        "Sangramento Maior Ameaçador à Vida: 1ª escolha = Andexanet alfa (AndexXa); Se indisponível = Complexo Protrombínico de 4 Fatores (Beriplex/Octaplex) na dose de 25 a 50 UI/kg IV + Ácido Tranexâmico 1 g IV (e Carvão Ativado se última dose ingerida há < 2–4 horas)."
      ],
      "reviewed_at": "2026-10-26",
      "pregnancy_category": "Categoria C (CONTRAINDICADA na gestação e lactação)",
      "pregnancy_text": "Atravessa a barreira placentária com risco de sangramento e teratogenicidade; na gestante usar exclusivamente Enoxaparina/HNF.",
      "hepatic_adjustment": "CONTRAINDICADA em hepatopatia associada a coagulopatia e risco de sangramento clínico relevante (Child-Pugh B e C)."
    }
  },
  {
    "id": "seed-drug-apixabana",
    "name": "Apixabana (Eliquis)",
    "active_ingredient": "Apixabana",
    "therapeutic_class": "Anticoagulantes e Trombolíticos",
    "pharmacological_class": "Anticoagulante Oral Direto (DOAC) — Inibidor direto, seletivo e reversível do Fator Xa",
    "data": {
      "status": "posology_verified",
      "therapeutic_class": "Anticoagulantes e Trombolíticos · Anticoagulante Oral Direto (DOAC Anti-Xa)",
      "indication": "Prevenção de AVC e embolia sistêmica na Fibrilação Atrial não-valvar (menor risco de sangramento gastrointestinal e intracraniano dentre os anticoagulantes — estudo ARISTOTLE!), tratamento de TVP e TEP agudos desde o Dia 1 (estudo AMPLIFY) e tromboprofilaxia em artroplastia.",
      "diseases": [
        "Fibrilação Atrial Não-Valvar",
        "Trombose Venosa Profunda (TVP)",
        "Tromboembolismo Pulmonar (TEP)"
      ],
      "products": [
        {
          "name": "Eliquis / Genérico",
          "type": "Farmácia / Hospitalar",
          "presentation": "Comprimido revestido 2,5 mg e 5 mg"
        }
      ],
      "formulations": [
        {
          "label": "Comprimido revestido 2,5 mg e 5 mg",
          "dose_text": "1) FIBRILAÇÃO ATRIAL NÃO-VALVAR (Regra dos 3 Critérios ABC — Age, Body weight, Creatinine!): Dose padrão: 5 mg VO de 12 em 12 horas. Reduzir para 2,5 mg VO de 12 em 12 horas APENAS SE o paciente tiver >= 2 dos 3 critérios: Idade >= 80 anos, Peso corporal <= 60 kg, ou Creatinina sérica >= 1,5 mg/dL (ou isoladamente se ClCr 15–29 mL/min). 2) TRATAMENTO DE TVP E TEP AGUDOS (Sem heparina prévia!): Ataque inicial de 10 mg VO de 12 em 12 horas pelos primeiros 7 dias, seguido de manutenção de 5 mg VO de 12 em 12 horas por 3 a 6 meses.",
          "interval_text": "12/12h (independe da alimentação)",
          "route": "Via Oral (pode ser tomada com ou sem alimentos e pode ser macerada/administrada por SNE!)",
          "duration_text": "3 a 6 meses (TVP/TEP) ou uso contínuo (FA)",
          "population": "Adultos",
          "max_daily_text": "20 mg/dia (nos primeiros 7 dias de TVP/TEP) ou 10 mg/dia (manutenção padrão)",
          "administration": "ERRO DE PRESCRIÇÃO COMUM: Não subdosar para 2,5 mg 12/12h na FA quando o paciente apresenta apenas 1 critério isolado (ex.: apenas 82 anos com peso > 60 kg e Cr < 1,5 mg/dL deve receber 5 mg 12/12h!). A subdosagem indevida aumenta o risco de AVC cardioembólico sem benefício hemorrágico.",
          "prescription_type": "Receita simples",
          "cautions": "É o DOAC com menor percentual de excreção renal (~27% apenas!) e menor taxa de sangramento digestivo em idosos.",
          "source_url": "https://consultas.anvisa.gov.br/#/bulario/"
        }
      ],
      "contraindications": [
        "Sangramento ativo clinicamente significativo",
        "Prótese valvar mecânica ou Estenose Mitral moderada a grave",
        "Síndrome Antifosfolípide (SAF)",
        "Hepatopatia grave Child-Pugh C com coagulopatia"
      ],
      "renal_adjustment": "Na FA com ClCr 15 a 29 mL/min: 2,5 mg VO de 12/12h. Evitar se ClCr < 15 mL/min.",
      "adverse_reactions": [
        "Sangramentos (menor incidência que varfarina e rivaroxabana)",
        "Equimoses e epistaxe"
      ],
      "antidote": [
        "Andexanet alfa ou Complexo Protrombínico de 4 Fatores (CCP 25–50 UI/kg IV)."
      ],
      "reviewed_at": "2026-10-26",
      "pregnancy_category": "Categoria B/C (CONTRAINDICADA na gestação e lactação)",
      "pregnancy_text": "Usar Enoxaparina na gestante; DOACs não devem ser prescritos na gravidez.",
      "hepatic_adjustment": "CONTRAINDICADA em cirrose Child-Pugh C."
    }
  },
  {
    "id": "seed-drug-aas",
    "name": "Ácido Acetilsalicílico (AAS / Aspirina)",
    "active_ingredient": "Ácido Acetilsalicílico",
    "therapeutic_class": "Anticoagulantes e Trombolíticos",
    "pharmacological_class": "Antiagregante plaquetário (Inibidor irreversível da COX-1 plaquetária e síntese de Tromboxano A2)",
    "data": {
      "status": "posology_verified",
      "therapeutic_class": "Anticoagulantes e Trombolíticos · Antiagregante Plaquetário (COX-1)",
      "indication": "Primeira medida farmacológica imediata em toda Síndrome Coronariana Aguda (IAMCSST, IAMSSST e Angina Instável — reduz mortalidade em 23% no estudo ISIS-2!), prevenção secundária de DAC/AVC isquêmico/DAOP, Pericardite Aguda (alta dose), Doença de Kawasaki e profilaxia de Pré-Eclâmpsia em gestantes de alto risco.",
      "diseases": [
        "Infarto Agudo do Miocárdio (IAM) e Angina Instável",
        "AVC Isquêmico e AIT (Prevenção Secundária)",
        "Pericardite Aguda",
        "Profilaxia de Pré-Eclâmpsia (a partir de 12–16 semanas)"
      ],
      "products": [
        {
          "name": "AAS / Aspirina Prevent / Somalgin Cardio",
          "type": "Farmácia / Hospitalar",
          "presentation": "Comprimido simples 100 mg (mastigável no IAM!) e 500 mg; Comp. tamponado/revestido 81–100 mg"
        }
      ],
      "formulations": [
        {
          "label": "Comprimido simples 100 mg",
          "dose_text": "1) SÍNDROME CORONARIANA AGUDA (IAMCSST / IAMSSST / Angina Instável): Dose de ataque imediata de 160 a 300 mg VO (2 a 3 comprimidos simples de 100 mg MASTIGADOS e engolidos — nunca usar comprimido de liberação entérica no ataque!), seguida de manutenção de 100 mg VO 1x ao dia após o almoço. 2) AVC ISQUÊMICO AGUDO: 160 a 300 mg VO (se NÃO trombolisado, iniciar imediatamente após TC afastar sangramento; se trombolisado com Alteplase, aguardar 24h e TC de controle!). 3) PROFILAXIA DE PRÉ-ECLÂMPSIA: 100 a 150 mg VO à noite (das 12–16 semanas até 36 semanas).",
          "interval_text": "Ataque em dose única + Manutenção 1x/dia (24/24h)",
          "route": "Via Oral (mastigar no ataque do IAM para absorção sublingual/gástrica em 15 minutos!)",
          "duration_text": "Uso contínuo vitalício na prevenção cardiovascular secundária",
          "population": "Adultos e Gestantes de alto risco de pré-eclâmpsia",
          "max_daily_text": "300 mg no ataque antiplaquetário (até 2 a 4 g/dia apenas na Pericardite Aguda ou Doença de Kawasaki)",
          "administration": "No paciente intubado ou com vômitos na SCA, administrar 200–300 mg macerados por sonda nasogástrica/enteral.",
          "prescription_type": "Isento de prescrição / Uso hospitalar",
          "cautions": "Na suspeita de Dissecção Aguda de Aorta ou Hemorragia Intracraniana, NÃO administrar AAS até exclusão diagnóstica! Na Dengue, o AAS é formalmente contraindicado pelo risco de sangramento grave e Síndrome de Reye.",
          "source_url": "https://consultas.anvisa.gov.br/#/bulario/"
        }
      ],
      "contraindications": [
        "Alergia grave / anafilaxia a AAS ou DREA (Doença Respiratória Exacerbada por Aspirina)",
        "Úlcera péptica ativa com sangramento ou HDA ativa",
        "Dengue e outras febres hemorrágicas virais",
        "Crianças/adolescentes com infecção viral aguda (Síndrome de Reye — encefalopatia e esteatose hepática aguda)"
      ],
      "renal_adjustment": "Em dose antiagregante baixa (100 mg/dia) não requer ajuste renal; evitar doses anti-inflamatórias altas (> 500 mg) na DRC.",
      "adverse_reactions": [
        "Dispepsia, gastrite erosiva e hemorragia digestiva alta",
        "Broncoespasmo induzido por aspirina",
        "Sangramentos mucocutâneos"
      ],
      "antidote": [
        "Superdosagem aguda (Salicilismo — zumbido, alcalose respiratória + acidose metabólica de ânion gap elevado): Alcalinização urinária e sérica com Bicarbonato de Sódio IV (meta de pH urinário 7,5–8,0 para 'aprisionamento iônico' e excreção renal do salicilato!) + Hemodiálise se nível sérico > 90–100 mg/dL, edema pulmonar ou coma."
      ],
      "reviewed_at": "2026-10-26",
      "pregnancy_category": "Categoria C (Dose baixa 100–150 mg é Categoria B e indicada para prevenção de pré-eclâmpsia) / Categoria D (Dose alta no 3º trimestre)",
      "pregnancy_text": "Dose baixa (100 a 150 mg/dia iniciada entre 12–16 semanas) é formalmente recomendada para gestantes com alto risco de pré-eclâmpsia.",
      "hepatic_adjustment": "Evitar em insuficiência hepática grave associada a coagulopatia e varizes esofágicas."
    }
  },
  {
    "id": "seed-drug-hidralazina",
    "name": "Hidralazina (Cloridrato de Hidralazina)",
    "active_ingredient": "Hidralazina",
    "therapeutic_class": "Vasoativos e Choque",
    "pharmacological_class": "Vasodilatador arterial direto (Relaxante da musculatura lisa arteriolar)",
    "data": {
      "status": "posology_verified",
      "therapeutic_class": "Vasoativos e Choque · Anti-hipertensivo na Emergência Obstétrica (Pré-Eclâmpsia Grave)",
      "indication": "Primeira linha no controle agudo da crise hipertensiva na Gestação (Pré-Eclâmpsia Grave, Eclâmpsia e Síndrome HELLP com PAS >= 160 mmHg ou PAD >= 110 mmHg) e terapia vasodilatadora na Insuficiência Cardíaca com FEVE reduzida (em associação com Dinitrato de Isossorbida quando IECA/BRA/INRA são contraindicados pela função renal/potássio).",
      "diseases": [
        "Crise Hipertensiva na Pré-Eclâmpsia Grave e Eclâmpsia",
        "Insuficiência Cardíaca com FEVE Reduzida (Associada ao Nitrato em DRC/Hipercalemia)"
      ],
      "products": [
        {
          "name": "Nepresol / Apresolina / Genérico",
          "type": "Farmácia / Hospitalar",
          "presentation": "Ampola IV 20 mg/1 mL; Drágea/Comprimido 25 mg e 50 mg"
        }
      ],
      "formulations": [
        {
          "label": "Solução injetável 20 mg/1 mL (IV) e Comprimido 25 mg / 50 mg (VO)",
          "dose_text": "1) EMERGÊNCIA HIPERTENSIVA NA GESTAÇÃO (Pré-Eclâmpsia Grave / Eclâmpsia — PAS >= 160 ou PAD >= 110 mmHg): Diluir 1 ampola de 20 mg (1 mL) + 19 mL de Água Destilada ou SF 0,9% (concentração = 1 mg/mL!). Administrar 5 mL (5 mg) IV lento (em 2 minutos). Aferir PA a cada 5 min; se a PA não atingir a meta (PAS 140–150 e PAD 90–100 mmHg) após 20 minutos, administrar mais 5 mL a 10 mL (5 a 10 mg) IV lento a cada 20 minutos (dose máxima cumulativa de 20 a 30 mg). 2) IC COM FEVE REDUZIDA (Substituto de IECA/BRA na DRC/Hipercalemia): 25 a 50 mg VO de 8 em 8 horas (associada a Dinitrato de Isossorbida 20–40 mg VO 8/8h).",
          "interval_text": "Na emergência obstétrica: bolus de 5 mg IV a cada 20 minutos (NUNCA repetir antes de 20 min!)",
          "route": "Endovenosa (IV) lenta diluída (1 mg/mL) ou Via Oral",
          "duration_text": "Uso agudo na emergência obstétrica ou contínuo na ICFEr",
          "population": "Gestantes / Puérperas e Adultos",
          "max_daily_text": "20 a 30 mg IV na crise aguda; 200 a 300 mg/dia VO",
          "administration": "REGRA DOS 20 MINUTOS NA GESTANTE: O pico de ação da hidralazina IV leva 15 a 20 minutos! Nunca repetir doses com intervalo menor que 20 minutos, pois o acúmulo de doses causa hipotensão materna súbita, hipoperfusão uteroplacentária e sofrimento fetal agudo (bradicardia fetal)! Fora da obstetrícia (em pacientes não gestantes), NÃO usar hidralazina IV em emergências hipertensivas gerais pelo efeito imprevisível e taquicardia reflexa.",
          "prescription_type": "Receita simples / Uso hospitalar",
          "cautions": "Causa intensa ativação simpática e taquicardia reflexa (por isso é formalmente CONTRAINDICADA na Dissecção Aguda de Aorta e no IAM!).",
          "source_url": "https://consultas.anvisa.gov.br/#/bulario/"
        }
      ],
      "contraindications": [
        "Dissecção Aguda de Aorta (taquicardia reflexa aumenta dP/dt e propaga a dissecção!)",
        "Doença Arterial Coronariana aguda / IAM (roubo coronariano e taquicardia reflexa)",
        "Valvopatia mitral reumática grave"
      ],
      "renal_adjustment": "Em ClCr < 30 mL/min, espaçar intervalo oral para 8/8h ou 12/12h.",
      "adverse_reactions": [
        "Taquicardia reflexa, cefaleia pulsátil e rubor facial",
        "Hipotensão materna aguda com desaceleração cardíaca fetal (se doses repetidas < 20 min)",
        "Síndrome Lúpus-Like induzida por fármacos (no uso oral crônico > 6 meses em acetiladores lentos)"
      ],
      "pregnancy_category": "Segura e de 1ª escolha na emergência hipertensiva da gestação e puerpério",
      "reviewed_at": "2026-10-26",
      "hepatic_adjustment": "Metabolismo hepático via acetilação; titular cuidadosamente."
    }
  },
  {
    "id": "seed-drug-nifedipino",
    "name": "Nifedipino (Adalat)",
    "active_ingredient": "Nifedipino",
    "therapeutic_class": "Vasoativos e Choque",
    "pharmacological_class": "Bloqueador dos canais de cálcio di-hidropiridínico (Vasodilatador arterial periférico e tocolítico uterino)",
    "data": {
      "status": "posology_verified",
      "therapeutic_class": "Vasoativos e Choque · Bloqueador de Canal de Cálcio (Crise Hipertensiva na Gestação e Tocólise)",
      "indication": "Primeira linha por via oral na Crise Hipertensiva da Gestação (Pré-Eclâmpsia Grave com PAS >= 160 ou PAD >= 110 mmHg — tão eficaz quanto a Hidralazina IV!), Tocólise de 1ª escolha no Trabalho de Parto Prematuro (24 a 34 semanas) e hipertensão arterial crônica (apresentação retard/OROS).",
      "diseases": [
        "Crise Hipertensiva na Gestação (Pré-Eclâmpsia Grave)",
        "Trabalho de Parto Prematuro (Tocólise para Maturação Pulmonar)",
        "Hipertensão Arterial Sistêmica e Fenômeno de Raynaud"
      ],
      "products": [
        {
          "name": "Adalat / Adalat Retard / Adalat OROS / Genérico",
          "type": "Farmácia / Hospitalar",
          "presentation": "Comp. ação rápida 10 mg; Comp. Retard 20 mg; Comp. OROS 30 mg e 60 mg"
        }
      ],
      "formulations": [
        {
          "label": "Comprimido 10 mg (Ação Rápida — Uso Obstétrico!) e Comprimido Retard 20 mg",
          "dose_text": "1) CRISE HIPERTENSIVA NA GESTAÇÃO (Pré-Eclâmpsia Grave — Protocolo ACOG/FEBRASGO): 10 mg VO (1 comprimido de ação rápida DEGLUTIDO INTEIRO com água — NUNCA sublingual nem furar cápsula!). Reavaliar PA a cada 20 minutos; se persistir >= 160x110 mmHg, administrar 10 a 20 mg VO a cada 20 minutos até 3 doses (máx. 30 a 50 mg em 1h). 2) TOCÓLISE NO TRABALHO DE PARTO PREMATURO: Ataque de 10 a 20 mg VO a cada 20 min (máx. 3 doses na 1ª hora), seguido de manutenção de 20 mg VO de 6/6h ou 8/8h por 48 horas (tempo para ação do corticoide fetal). 3) HAS CRÔNICA: Retard 20 mg VO 12/12h.",
          "interval_text": "A cada 20 min na emergência obstétrica (10 mg VO deglutido) ou 12/12h (Retard)",
          "route": "Via Oral EXCLUSIVA (deglutir o comprimido!)",
          "duration_text": "Uso agudo obstétrico (ou 48h na tocólise)",
          "population": "Gestantes e Adultos",
          "max_daily_text": "60 a 120 mg/dia",
          "administration": "PROSCRITO O USO SUBLINGUAL EM ADULTOS NÃO GESTANTES! Fora da obstetrícia (em pseudocrises ou urgências hipertensivas gerais no PS), o Nifedipino 10 mg de ação rápida/sublingual é CONTRAINDICADO, pois causa queda abrupta e incontrolável da pressão arterial, precipitando AVC isquêmico por hipoperfusão e Infarto Agudo do Miocárdio!",
          "prescription_type": "Receita simples / Uso hospitalar",
          "cautions": "Cautela ao associar Nifedipino com Sulfato de Magnésio na pré-eclâmpsia (ambos bloqueiam a entrada de cálcio; monitorar PA e reflexos, embora o uso conjunto seja seguro e endossado pela FEBRASGO/OMS).",
          "source_url": "https://consultas.anvisa.gov.br/#/bulario/"
        }
      ],
      "contraindications": [
        "Choque cardiogênico e hipotensão arterial (< 90x60 mmHg)",
        "Síndrome Coronariana Aguda / Angina Instável (taquicardia reflexa e roubo coronariano na apresentação de ação curta)",
        "Estenose aórtica grave",
        "Uso sublingual em urgências hipertensivas gerais"
      ],
      "renal_adjustment": "Não requer ajuste de dose na insuficiência renal.",
      "adverse_reactions": [
        "Cefaleia facial, flushing (rubor e calor facial), taquicardia reflexa",
        "Edema maleolar pré-tibial no uso crônico (vasodilatação pré-capilar — não responde a furosemida!)"
      ],
      "pregnancy_category": "Fármaco de 1ª linha para crise hipertensiva na gestação e tocólise",
      "reviewed_at": "2026-10-26",
      "hepatic_adjustment": "Reduzir dose em insuficiência hepática grave."
    }
  },
  {
    "id": "seed-drug-levetiracetam",
    "name": "Levetiracetam (Keppra)",
    "active_ingredient": "Levetiracetam",
    "therapeutic_class": "Neurologia e Psiquiatria",
    "pharmacological_class": "Anticonvulsivante de amplo espectro ligante da proteína de vesícula sináptica SV2A (Sem interação com citocromo P450!)",
    "data": {
      "status": "posology_verified",
      "therapeutic_class": "Neurologia e Psiquiatria · Anticonvulsivante de Amplo Espectro (2ª Linha no EME)",
      "indication": "Estado de Mal Epiléptico refratário ao benzodiazepínico (tão eficaz quanto a Fenitoína no estudo ESETT, porém sem risco de arritmia/hipotensão!), epilepsia focal e generalizada (inclusive mioclônica), crises convulsivas em pacientes oncológicos, hepatopatas, idosos, cardiopatas e gestantes.",
      "diseases": [
        "Estado de Mal Epiléptico (Status Epilepticus)",
        "Epilepsia Focal e Generalizada",
        "Crises Convulsivas em Hepatopatas, Cardiopatas e Oncológicos"
      ],
      "products": [
        {
          "name": "Keppra / Etira / Genérico",
          "type": "Farmácia / Hospitalar",
          "presentation": "Frasco-ampola IV 500 mg/5 mL (100 mg/mL); Comp. 250 mg, 500 mg, 750 mg e 1.000 mg; Solução oral 100 mg/mL"
        }
      ],
      "formulations": [
        {
          "label": "Solução injetável 500 mg/5 mL (IV) e Comprimidos 500 mg / 1.000 mg (VO)",
          "dose_text": "1) ESTADO DE MAL EPILÉPTICO (Ataque de 2ª Linha — Estudo ESETT): 60 mg/kg IV (dose máxima de ataque: 4.500 mg!) diluídos em 100 mL de SF 0,9% ou SG 5%, infundidos em 10 a 15 minutos. 2) MANUTENÇÃO HOSPITALAR E AMBULATORIAL: Iniciar com 500 mg IV ou VO de 12 em 12 horas, podendo escalonar até 1.500 mg de 12 em 12 horas (3.000 mg/dia) conforme controle das crises.",
          "interval_text": "Ataque em dose única em 10–15 min + Manutenção de 12/12h",
          "route": "Endovenosa (IV) ou Via Oral (biodisponibilidade oral de ~100% — conversão 1:1 entre IV e VO!)",
          "duration_text": "Uso agudo e manutenção contínua",
          "population": "Adultos, Gestantes (um dos anticonvulsivantes mais seguros na gestação!) e Pediatria",
          "max_daily_text": "4.500 mg no ataque do EME; 3.000 mg/dia na manutenção",
          "administration": "VANTAGENS EM RELAÇÃO À FENITOÍNA: 1) Não causa hipotensão nem arritmias cardíacas; 2) Pode ser infundido rápido (em 10–15 min) tanto em SF 0,9% quanto em SG 5%; 3) Não tem metabolismo hepático pelo CYP450 e NÃO interage com Varfarina, DOACs, Quimioterápicos, Antirretrovirais ou Anticoncepcionais!",
          "prescription_type": "Receita de controle especial C1",
          "cautions": "Pode causar irritabilidade, labilidade emocional ou agitação comportamental ('Keppra rage' — que melhora com suplementação de Vitamina B6 / Piridoxina 50–100 mg/dia).",
          "source_url": "https://consultas.anvisa.gov.br/#/bulario/"
        }
      ],
      "contraindications": [
        "Hipersensibilidade conhecida ao levetiracetam ou derivados da pirrolidona"
      ],
      "renal_adjustment": "Excreção 66% renal inalterada — exige ajuste na manutenção renal: ClCr 50–79 mL/min = 500 a 1.000 mg 12/12h; ClCr 30–49 mL/min = 250 a 750 mg 12/12h; ClCr < 30 mL/min = 250 a 500 mg 12/12h; Hemodiálise = 500 a 1.000 mg 24/24h + dose suplementar de 250–500 mg após a HD.",
      "hepatic_adjustment": "Não requer ajuste na insuficiência hepática isolada (anticonvulsivante de escolha no cirrótico!).",
      "adverse_reactions": [
        "Sonolência, fadiga e tontura",
        "Irritabilidade, agressividade ou alteração de humor",
        "Ausência de efeitos hemodinâmicos"
      ],
      "reviewed_at": "2026-10-26",
      "pregnancy_category": "Categoria C (Antiepiléptico de menor risco teratogênico na gestação)",
      "pregnancy_text": "Perfil de segurança superior em relação a ácido valproico e carbamazepina; monitorar níveis séricos no 3º trimestre."
    }
  },
  {
    "id": "seed-drug-levofloxacino",
    "name": "Levofloxacino",
    "active_ingredient": "Levofloxacino Hemi-hidratado",
    "therapeutic_class": "Antimicrobianos",
    "pharmacological_class": "Fluoroquinolona respiratória de 3ª geração bactericida (Isômero L ativo do ofloxacino)",
    "data": {
      "status": "posology_verified",
      "therapeutic_class": "Antimicrobianos · Quinolona Respiratória e Urinária",
      "indication": "Pneumonia Adquirida na Comunidade (PAC — em pacientes com comorbidades ou alergia grave a beta-lactâmicos, cobrindo Pneumococo + Atípicos em monoterapia!), Pielonefrite Aguda, Prostatite Bacteriana e Rinossinusite Bacteriana Aguda refratária.",
      "diseases": [
        "Pneumonia Adquirida na Comunidade (PAC)",
        "Pielonefrite Aguda e ITU Complicada",
        "Prostatite Bacteriana Aguda/Crônica",
        "Exacerbação Grave de DPOC"
      ],
      "products": [
        {
          "name": "Tavanic / Levaquin / Genérico",
          "type": "Farmácia / Hospitalar",
          "presentation": "Comprimido 500 mg e 750 mg (VO); Bolsa pronta p/ infusão IV 500 mg/100 mL e 750 mg/150 mL"
        }
      ],
      "formulations": [
        {
          "label": "Comprimido 500 mg / 750 mg (VO) e Solução injetável 500 mg/100 mL (IV)",
          "dose_text": "1) PNEUMONIA ADQUIRIDA NA COMUNIDADE (PAC) E PIELONEFRITE AGUDA (Esquema de Alta Dose e Curta Duração!): 750 mg VO ou IV 1x ao dia (a cada 24h) por 5 dias (ou 500 mg VO/IV 1x ao dia por 7 a 10 dias). 2) PROSTATITE BACTERIANA: 500 mg VO 1x ao dia por 28 dias.",
          "interval_text": "24/24h (1x ao dia)",
          "route": "Via Oral (biodisponibilidade de ~99% — 500 mg VO equivalem exatamente a 500 mg IV!) ou Endovenosa lenta em 60 a 90 minutos",
          "duration_text": "5 dias (na dose de 750 mg/dia para PAC e Pielonefrite) ou 7 a 10 dias (500 mg/dia)",
          "population": "Adultos",
          "max_daily_text": "750 mg/dia",
          "administration": "ALERTA EPIDEMIOLÓGICO BRASILEIRO: No Brasil (área endêmica para Tuberculose), EVITAR o uso indiscriminado de fluoroquinolonas respiratórias (Levofloxacino/Moxifloxacino) como 1ª escolha empírica em quadros respiratórios subagudos sem antes afastar Tuberculose Pulmonar, pois o levofloxacino tem potente ação contra o M. tuberculosis, mascara os sintomas temporariamente, atrasa o diagnóstico e seleciona resistência!",
          "prescription_type": "Receita de controle antimicrobiano em 2 vias",
          "cautions": "Assim como o ciprofloxacino, possui alertas para tendinite/ruptura de tendão de Aquiles, delirium em idosos, prolongamento do QTc, hipo/hiperglicemia e piora da Miastenia Gravis.",
          "source_url": "https://consultas.anvisa.gov.br/#/bulario/"
        }
      ],
      "contraindications": [
        "Miastenia Gravis",
        "Síndrome do QT longo ou uso de antiarrítmicos Classe IA/III",
        "Gestação, lactação e menores de 18 anos"
      ],
      "renal_adjustment": "Obrigatório ajuste renal (para dose de 750 mg): ClCr 20 a 49 mL/min = 750 mg a cada 48 horas; ClCr < 20 mL/min ou Hemodiálise = ataque de 750 mg e manutenção de 500 mg a cada 48 horas.",
      "adverse_reactions": [
        "Tendinopatia e ruptura de tendão (maior risco em > 60 anos e uso de corticoides)",
        "Prolongamento do intervalo QTc",
        "Insônia, tontura e confusão mental/delirium no idoso",
        "Disglicemia (hipoglicemia grave se associado a sulfonilureias/insulina)"
      ],
      "reviewed_at": "2026-10-26",
      "pregnancy_category": "Categoria C",
      "pregnancy_text": "Evitar na gravidez pelo risco de lesão em cartilagens de crescimento fetal; preferir betalactâmicos.",
      "hepatic_adjustment": "Não requer ajuste na disfunção hepática."
    }
  },
  {
    "id": "seed-drug-oxacilina",
    "name": "Oxacilina Sódica",
    "active_ingredient": "Oxacilina",
    "therapeutic_class": "Antimicrobianos",
    "pharmacological_class": "Penicilina semissintética antiestafilocócica resistente às penicilinases (Droga de escolha para MSSA grave)",
    "data": {
      "status": "posology_verified",
      "therapeutic_class": "Antimicrobianos · Penicilina Antiestafilocócica (Padrão-Ouro para MSSA)",
      "indication": "Infecções graves e moderadas por Staphylococcus aureus sensível à meticilina/oxacilina (MSSA): bacteremia estafilocócica, endocardite infecciosa de valva nativa/protética, osteomielite aguda, artrite séptica, piomiosite, abscesso epidural e celulite/erisipela hospitalar.",
      "diseases": [
        "Bacteremia e Endocardite por S. aureus (MSSA)",
        "Artrite Séptica e Osteomielite",
        "Celulite Purulenta / Abscessos Graves",
        "Pneumonia Estafilocócica Necrosante (MSSA)"
      ],
      "products": [
        {
          "name": "Staficilin-N / Oxacilina Genérico",
          "type": "Hospitalar",
          "presentation": "Frasco-ampola 500 mg"
        }
      ],
      "formulations": [
        {
          "label": "Pó para solução injetável 500 mg (IV)",
          "dose_text": "1) INFECÇÕES DE PELE E PARTES MOLES GRAVES (Celulite/Abscesso): 1 g a 2 g IV de 6 em 6 horas (4 a 8 g/dia). 2) BACTEREMIA POR MSSA, ENDOCARDITE, OSTEOMIELITE, ARTRITE SÉPTICA E MENINGITE (Dose Máxima!): 2 g (4 frascos-ampola) IV de 4 em 4 horas (12 g/dia!). 3) PEDIATRIA: 100 a 200 mg/kg/dia IV divididos de 4/4h ou 6/6h (máx. 12 g/dia).",
          "interval_text": "4/4h (bacteremia/endocardite/SNC) ou 6/6h (partes moles)",
          "route": "Endovenosa (IV) diluída em 50 a 100 mL de SF 0,9% ou SG 5%, infundida em 30 a 60 minutos",
          "duration_text": "7 a 14 dias (partes moles), 14 dias (bacteremia não complicada) ou 4 a 6 semanas (endocardite/osteomielite)",
          "population": "Adultos e Pediatria",
          "max_daily_text": "12 g/dia (2 g de 4/4h)",
          "administration": "EVIDÊNCIA DE OURO: Na bacteremia ou endocardite por S. aureus sensível à oxacilina (MSSA), a Oxacilina (ou Cefazolina) é MUITO MAIS BACTERICIDA e reduz a mortalidade em comparação à Vancomicina! Descalonar da Vancomicina para Oxacilina assim que o antibiograma confirmar MSSA!",
          "prescription_type": "Uso restrito hospitalar",
          "cautions": "Muito irritante para o endotélio venoso (alta incidência de flebite química em acesso periférico — diluir bem e infundir em 30–60 min ou usar cateter central/PICC para tratamentos longos).",
          "source_url": "https://consultas.anvisa.gov.br/#/bulario/"
        }
      ],
      "contraindications": [
        "Alergia grave (anafilaxia / Stevens-Johnson) às penicilinas"
      ],
      "renal_adjustment": "NÃO requer ajuste de dose na insuficiência renal nem na hemodiálise (excreção predominantemente hepatobiliar)!",
      "adverse_reactions": [
        "Flebite química intensa no acesso venoso",
        "Nefrite intersticial aguda alérgica (monitorar creatinina e eosinofilia)",
        "Elevação reversível de transaminases (hepatite medicamentosa)",
        "Neutropenia reversível em uso prolongado (> 2 semanas)"
      ],
      "reviewed_at": "2026-10-26",
      "pregnancy_category": "Categoria B",
      "pregnancy_text": "Penicilina isoxazolil segura na gestação; droga de escolha para mastite puerperal e estafilococcias maternas.",
      "hepatic_adjustment": "Pode causar hepatite colestática reversível; monitorar enzimas em uso prolongado."
    }
  },
  {
    "id": "seed-drug-cefepima",
    "name": "Cefepima (Cloridrato de Cefepima)",
    "active_ingredient": "Cefepima",
    "therapeutic_class": "Antimicrobianos",
    "pharmacological_class": "Cefalosporina de 4ª geração bactericida (Amplo espectro Gram-positivo MSSA/Streptococcus e Gram-negativo incluindo Pseudomonas e AmpC)",
    "data": {
      "status": "posology_verified",
      "therapeutic_class": "Antimicrobianos · Cefalosporina de 4ª Geração Antipseudomonas",
      "indication": "Monoterapia empírica de 1ª linha na Neutropenia Febril de alto risco, Pneumonia Hospitalar e Associada à Ventilação Mecânica (PAV), infecções graves por Pseudomonas aeruginosa e bacilos Gram-negativos produtores de beta-lactamase cromossômica AmpC (Enterobacter, Citrobacter, Serratia) e meningite pós-neurocirúrgica.",
      "diseases": [
        "Neutropenia Febril de Alto Risco (Oncologia/Hematologia)",
        "Pneumonia Hospitalar (PAH) e PAV",
        "Sepse por Pseudomonas aeruginosa ou Enterobacterales (AmpC)"
      ],
      "products": [
        {
          "name": "Maxcef / Genérico",
          "type": "Hospitalar",
          "presentation": "Frasco-ampola 1 g e 2 g"
        }
      ],
      "formulations": [
        {
          "label": "Pó para solução injetável 1 g e 2 g (IV)",
          "dose_text": "1) NEUTROPENIA FEBRIL, PNEUMONIA NOSOCOMIAL (PAV), PSEUDOMONAS E MENINGITE (Dose Antipseudomonas Obrigatória!): 2 g IV de 8 em 8 horas (6 g/dia!). 2) INFECÇÕES URINÁRIAS COMPLICADAS / MODERADAS: 1 g a 2 g IV de 12 em 12 horas.",
          "interval_text": "8/8h (Neutropenia febril / Pseudomonas / UTI) ou 12/12h (moderadas)",
          "route": "Endovenosa (IV) diluída em 100 mL de SF 0,9% ou SG 5% (preferir infusão estendida em 3 horas em pacientes críticos!)",
          "duration_text": "7 a 14 dias (ou até recuperação neutrofílica > 500/mm3 e afebril por 48h)",
          "population": "Adultos e Pediatria (> 2 meses: 50 mg/kg/dose de 8/8h na neutropenia febril)",
          "max_daily_text": "6 g/dia (2 g de 8/8h)",
          "administration": "ATENÇÃO AO ESPECTRO: A Cefepima NÃO cobre Anaeróbios (Bacteroides fragilis), NÃO cobre MRSA e NÃO cobre Enterococcus spp.! Se houver foco intra-abdominal associado, é OBRIGATÓRIO associar Metronidazol 500 mg IV 8/8h!",
          "prescription_type": "Uso restrito hospitalar",
          "cautions": "ALERTA DE NEUROTOXICIDADE GRAVE NA INSUFICIÊNCIA RENAL: A cefepima atravessa a barreira hematoencefálica e antagoniza receptores GABA-A quando acumula na disfunção renal, causando encefalopatia, afasia, mioclonias, rebaixamento do sensório e Estado de Mal Epiléptico Não-Convulsivo! Ajustar rigorosamente pelo ClCr!",
          "source_url": "https://consultas.anvisa.gov.br/#/bulario/"
        }
      ],
      "contraindications": [
        "Alergia anafilática grave a cefalosporinas ou beta-lactâmicos"
      ],
      "renal_adjustment": "Ajuste para a dose de 2 g 8/8h: ClCr 30 a 60 mL/min = 2 g IV de 12/12h; ClCr 11 a 29 mL/min = 2 g IV a cada 24h; ClCr <= 10 mL/min ou Hemodiálise = 1 g IV a cada 24h (administrar após a sessão de HD).",
      "adverse_reactions": [
        "Encefalopatia por cefepima, mioclonias e estado de mal não-convulsivo (especialmente se ClCr < 50 mL/min sem ajuste)",
        "Teste de Coombs direto positivo",
        "Diarreia / Colite por C. difficile"
      ],
      "reviewed_at": "2026-10-26",
      "pregnancy_category": "Categoria B",
      "pregnancy_text": "Segura na gestação em infecções graves por Pseudomonas ou neutropenia febril.",
      "hepatic_adjustment": "Não requer ajuste de dose."
    }
  },
  {
    "id": "seed-drug-clindamicina",
    "name": "Clindamicina (Fosfato e Cloridrato de Clindamicina)",
    "active_ingredient": "Clindamicina",
    "therapeutic_class": "Antimicrobianos",
    "pharmacological_class": "Lincosamida bacteriostática inibidora da síntese proteica (Subunidade 50S — potente efeito antitoxina bacteriana!)",
    "data": {
      "status": "posology_verified",
      "therapeutic_class": "Antimicrobianos · Lincosamida (Gram-Positivos, Anaeróbios Acima do Diafragma e Antitoxina)",
      "indication": "Associação obrigatória na Fasciíte Necrosante e Síndrome do Choque Tóxico Estreptocócico/Estafilocócico (inibe a produção de exotoxinas e fator de necrose!), pneumonia aspirativa / abscesso pulmonar, infecções graves de pele/partes moles, infecções odontogênicas/cervicais (Angina de Ludwig), osteomielite, Doença Inflamatória Pélvica (c/ Gentamicina) e Neurotoxoplasmose (alternativa à Sulfadiazina).",
      "diseases": [
        "Fasciíte Necrosante e Gangrena de Fournier (Efeito Antitoxina)",
        "Pneumonia Aspirativa Necrosante e Abscesso Pulmonar",
        "Celulite, Erisipela e Abscessos Cutâneos",
        "Infecções Odontogênicas e Cervicais Graves"
      ],
      "products": [
        {
          "name": "Dalacin C / Genérico",
          "type": "Farmácia / Hospitalar",
          "presentation": "Ampola IV/IM 300 mg/2 mL e 600 mg/4 mL (150 mg/mL); Cápsula 300 mg (VO)"
        }
      ],
      "formulations": [
        {
          "label": "Solução injetável 600 mg/4 mL (IV) e Cápsula 300 mg (VO)",
          "dose_text": "1) INFECÇÕES GRAVES / FASCIÍTE NECROSANTE / CHOQUE TÓXICO / ABSCESSO PULMONAR (IV): 600 mg a 900 mg IV de 8 em 8 horas (na Fasciíte Necrosante: 900 mg IV de 8/8h associada a Piperacilina-Tazobactam ou Meropenem + Vancomicina). 2) INFECÇÕES DE PELE / ODONTOGÊNICAS AMBULATORIAIS (VO): 300 mg a 600 mg VO de 6/6h ou 8/8h (tomar com um copo cheio de água e não deitar por 30 min para evitar esofagite medicamentosa!).",
          "interval_text": "8/8h (IV e VO) ou 6/6h (VO)",
          "route": "Endovenosa (IV) diluída (NUNCA em bolus puro!) ou Via Oral (biodisponibilidade de ~90%!)",
          "duration_text": "7 a 14 dias conforme foco",
          "population": "Adultos, Gestantes (Categoria B) e Pediatria (20 a 40 mg/kg/dia divididos de 6/6h ou 8/8h)",
          "max_daily_text": "2.700 mg/dia IV (900 mg 8/8h) ou 1.800 mg/dia VO",
          "administration": "POR QUE ASSOCIAR CLINDAMICINA NA FASCIÍTE NECROSANTE? Os beta-lactâmicos (penicilina/ceftriaxona/meropenem) só agem em bactérias em divisão ativa (Efeito Inoculum / Eagle). A Clindamicina age no ribossomo 50S independente da fase de crescimento e desliga imediatamente a síntese de exotoxinas necrosantes e superantígenos do Streptococcus pyogenes e S. aureus! Na via IV, diluir 600 mg em 50–100 mL SF/SG e correr em 20–30 min (nunca injetar sem diluir em bolus pelo risco de PCR!).",
          "prescription_type": "Receita de controle antimicrobiano em 2 vias",
          "cautions": "Cobre cocos Gram-positivos (Streptococcus, MSSA e muitas cepas de CA-MRSA) e Anaeróbios ACIMA do diafragma (orofaringe e pulmão), mas tem alta taxa de resistência em Bacteroides fragilis (evitar como monoterapia anaeróbia intra-abdominal!).",
          "source_url": "https://consultas.anvisa.gov.br/#/bulario/"
        }
      ],
      "contraindications": [
        "Histórico de Colite Pseudomembranosa (Clostridioides difficile) ou enterite regional"
      ],
      "renal_adjustment": "NÃO requer ajuste de dose na insuficiência renal nem na hemodiálise (metabolismo hepático)!",
      "adverse_reactions": [
        "Diarreia associada a antibióticos e Colite Pseudomembranosa por Clostridioides difficile (principal fator de risco!)",
        "Esofagite ulcerativa medicamentosa (se cápsula ingerida com pouca água ou deitado)",
        "Rash maculopapular"
      ],
      "reviewed_at": "2026-10-26",
      "pregnancy_category": "Categoria B",
      "pregnancy_text": "Lincosamida segura em todos os trimestres da gestação; excelente para vaginose bacteriana e infecções anaeróbias/cutâneas.",
      "hepatic_adjustment": "Metabolismo hepático intenso; monitorar níveis e função hepática em cirróticos graves."
    }
  },
  {
    "id": "seed-drug-nitrofurantoina",
    "name": "Nitrofurantoína (Macrodantina)",
    "active_ingredient": "Nitrofurantoína",
    "therapeutic_class": "Antimicrobianos",
    "pharmacological_class": "Antisséptico/Bactericida urinário nitrofurano (Inibe acetil-CoA bacteriana e síntese de DNA/RNA/parede celular exclusivamente na urina)",
    "data": {
      "status": "posology_verified",
      "therapeutic_class": "Antimicrobianos · Antibiótico de 1ª Linha para Cistite Aguda",
      "indication": "Primeira escolha absoluta no tratamento empírico da Cistite Aguda Não Complicada (ITU baixa) em mulheres e gestantes (exceto a termo/G6PD), bacteriúria assintomática na gestante e profilaxia de ITU de repetição.",
      "diseases": [
        "Cistite Aguda Não Complicada (ITU Baixa)",
        "Bacteriúria Assintomática na Gestante",
        "Profilaxia de ITU Recorrente"
      ],
      "products": [
        {
          "name": "Macrodantina / Hantina / Genérico",
          "type": "Farmácia",
          "presentation": "Cápsula dura 100 mg (Macrocristais)"
        }
      ],
      "formulations": [
        {
          "label": "Cápsula 100 mg",
          "dose_text": "1) CISTITE AGUDA NÃO COMPLICADA / BACTERIÚRIA NA GESTANTE: 100 mg (1 cápsula) VO de 6 em 6 horas (4x ao dia) por 5 a 7 dias (tomar junto com alimentos ou leite para melhorar a absorção e reduzir náuseas!). 2) PROFILAXIA DE ITU DE REPETIÇÃO: 100 mg VO 1x à noite ao deitar (ou após o coito).",
          "interval_text": "6/6h (tratamento agudo) ou 1x à noite (profilaxia)",
          "route": "Via Oral exclusiva (junto às refeições)",
          "duration_text": "5 dias (mulheres não gestantes) a 7 dias (gestantes)",
          "population": "Adultos e Gestantes (1º e 2º trimestres; evitar após 38 semanas/termo)",
          "max_daily_text": "400 mg/dia",
          "administration": "3 ARMADILHAS CLÁSSICAS DE PROVA E PLANTÃO: 1) NUNCA prescrever Nitrofurantoína para Pielonefrite Aguda ou Prostatite! A droga não atinge concentração sérica nem no parênquima renal/prostático (concentra-se apenas na luz da bexiga!). 2) Proteus mirabilis, Pseudomonas aeruginosa e Serratia possuem RESISTÊNCIA INTRÍNSECA de 100% à nitrofurantoína (urina alcalina com pH >= 8 sugere Proteus -> não usar nitrofurantoína!). 3) É ineficaz se ClCr < 30 mL/min (não é filtrada para a urina!).",
          "prescription_type": "Receita de controle antimicrobiano em 2 vias",
          "cautions": "Pode deixar a urina com coloração amarelo-acastanhada intensa (benigno; avisar a paciente).",
          "source_url": "https://consultas.anvisa.gov.br/#/bulario/"
        }
      ],
      "contraindications": [
        "Insuficiência Renal com ClCr < 30 mL/min (não atinge concentração urinária bactericida e acumula no sangue causando neuropatia periférica!)",
        "Pielonefrite aguda, sepse urinária ou prostatite",
        "Gestantes a termo (>= 38 semanas / trabalho de parto) e recém-nascidos < 1 mês (risco de anemia hemolítica neonatal por imaturidade enzimática eritrocitária)",
        "Deficiência de G6PD"
      ],
      "renal_adjustment": "Contraindicada se ClCr < 30 mL/min (evitar se ClCr < 45 mL/min se houver alternativa).",
      "adverse_reactions": [
        "Náuseas e desconforto gástrico (reduzem drasticamente quando tomada com alimentos)",
        "Coloração acastanhada da urina",
        "Pneumonite intersticial aguda ou fibrose pulmonar (em uso profilático crônico > 6 meses)",
        "Neuropatia periférica se usada em renais"
      ],
      "reviewed_at": "2026-10-26",
      "pregnancy_category": "Categoria B (Até 36 semanas)",
      "pregnancy_text": "Segura nos dois primeiros trimestres da gestação; contraindicada nas últimas semanas de gravidez e no parto pelo risco de anemia hemolítica neonatal por imaturidade de enzimas eritrocitárias.",
      "hepatic_adjustment": "Contraindicada em insuficiência hepática grave ou história prévia de hepatotoxicidade por nitrofurantoína."
    }
  },
  {
    "id": "seed-drug-paracetamol",
    "name": "Paracetamol (Acetaminofeno)",
    "active_ingredient": "Paracetamol",
    "therapeutic_class": "Analgésicos e Antitérmicos",
    "pharmacological_class": "Analgésico e antipirético inibidor central da síntese de prostaglandinas",
    "data": {
      "status": "posology_verified",
      "therapeutic_class": "Analgésicos e Antitérmicos · 1ª Escolha em Gestantes e Dengue",
      "indication": "Dor leve a moderada (cefaleia, mialgia, dor de dente, osteoartrite) e febre. Analgésico e antitérmico de primeira escolha na suspeita de Dengue/Arboviroses e na gestação/lactação.",
      "diseases": [
        "Febre / Hipertermia",
        "Dengue / Chikungunya / Zika",
        "Cefaleia Tensional",
        "Dor Pós-Operatória Leve",
        "Osteoartrite"
      ],
      "products": [
        {
          "name": "Tylenol / Genérico",
          "type": "Farmácia / Hospitalar",
          "presentation": "Comprimidos 500 mg e 750 mg, Gotas 200 mg/mL (1 gota = 10 mg), Solução oral 32 mg/mL"
        }
      ],
      "formulations": [
        {
          "label": "Comprimidos 500 mg e 750 mg (Adultos e Adolescentes > 12 anos)",
          "dose_text": "500 mg a 1.000 mg (1 comp. de 750 mg ou 1–2 comp. de 500 mg) por via oral a cada 4 a 6 horas conforme necessidade.",
          "interval_text": "A cada 4 a 6 horas se dor ou febre (mínimo 4h entre doses)",
          "route": "Oral (VO)",
          "duration_text": "Enquanto persistirem dor ou febre (evitar uso contínuo > 5 a 7 dias sem reavaliação médica)",
          "population": "Adultos e Adolescentes > 12 anos (> 40 kg)",
          "max_daily_text": "Dose máxima absoluta: 4.000 mg (4 g/dia) em adultos hígidos; reduzir para 2.000 a 3.000 mg/dia em idosos desnutridos, etilistas crônicos ou hepatopatas.",
          "administration": "Ingerir com água, com ou sem alimentos.",
          "prescription_type": "Receita simples (Medicamento Isento de Prescrição - MIP)",
          "cautions": "Atenção ao risco fatal de hepatotoxicidade aguda por acúmulo do metabólito tóxico NAPQI se dose > 7,5 g ou > 150 mg/kg em 24h. Antídoto específico: N-Acetilcisteína (NAC) nas primeiras 8 a 10 horas.",
          "source_url": "https://consultas.anvisa.gov.br/#/bulario/"
        },
        {
          "label": "Gotas 200 mg/mL pediátrico (1 gota = 10 mg)",
          "dose_text": "Dose pediátrica padrão: 10 a 15 mg/kg/dose a cada 4 a 6 horas (equivalente a 1 a 1,5 gotas por kg de peso corporal por dose).",
          "interval_text": "A cada 4 a 6 horas (máximo 4 a 5 doses em 24h)",
          "route": "Oral (VO)",
          "duration_text": "3 a 5 dias para controle de febre ou dor aguda",
          "population": "Pediatria (Lactentes e Crianças)",
          "max_daily_text": "Máximo pediátrico: 75 mg/kg/dia ou 5 doses ao dia (não ultrapassar a dose máxima de adulto de 3 g/dia).",
          "administration": "Administrar as gotas diretamente na boca ou diluídas em pequena colher com água.",
          "prescription_type": "Receita simples (MIP)",
          "cautions": "Não confundir a apresentação gotas 200 mg/mL com a apresentação xarope/bebê (100 mg/mL). Checar sempre a concentração no frasco antes de orientar os pais.",
          "calculator": {
            "type": "pediatric_weight",
            "min_mg_kg_day": 40,
            "max_mg_kg_day": 75,
            "default_mg_kg_day": 60
          },
          "source_url": "https://consultas.anvisa.gov.br/#/bulario/"
        }
      ],
      "contraindications": [
        "Hipersensibilidade conhecida ao paracetamol",
        "Insuficiência hepática grave descompensada / hepatite aguda ativa"
      ],
      "renal_adjustment": "TFG > 50 mL/min: intervalo usual de 4 a 6h. TFG 10–50 mL/min: espaçar intervalo para cada 6 horas. TFG < 10 mL/min: espaçar para cada 8 horas.",
      "hepatic_adjustment": "Usar com cautela extrema; dose máxima diária reduzida para 2.000 mg (2 g/dia) na cirrose Child-Pugh A/B; evitar em cirrose descompensada Child-Pugh C.",
      "adverse_reactions": [
        "Elevação assintomática de transaminases",
        "Necrose hepática fulminante por superdosagem",
        "Reações cutâneas graves raras (Stevens-Johnson, NET)"
      ],
      "drug_interactions": [
        "Álcool etílico crônico induz CYP2E1 e aumenta drasticamente a toxicidade hepática",
        "Varfarina em uso prolongado de doses altas de paracetamol pode ter elevação discreta do INR"
      ],
      "antidote": [
        "N-Acetilcisteína (NAC) endovenosa ou oral segundo nomograma de Rumack-Matthew."
      ],
      "pregnancy_category": "Categoria B (Droga analgésica de escolha em todos os trimestres da gestação)",
      "pregnancy_text": "Considerado seguro na gestação e lactação nas doses recomendadas.",
      "reviewed_at": "2026-10-30"
    }
  },
  {
    "id": "seed-drug-ibuprofeno",
    "name": "Ibuprofeno",
    "active_ingredient": "Ibuprofeno",
    "therapeutic_class": "Anti-inflamatórios Não Esteroidais (AINEs)",
    "pharmacological_class": "AINE inibidor não seletivo da COX-1 e COX-2 derivado do ácido propiônico",
    "data": {
      "status": "posology_verified",
      "therapeutic_class": "AINEs e Analgésicos · Antipirético e Anti-inflamatório",
      "indication": "Dor aguda inflamatória (odontalgia, dismenorreia primária, artrite, dor pós-traumática, lombalgia) e febre refratária.",
      "diseases": [
        "Febre Pediátrica",
        "Dismenorreia Primária",
        "Cefaleia / Enxaqueca Aguda",
        "Lombalgia Mecânica Aguda",
        "Artrite / Sinovite"
      ],
      "products": [
        {
          "name": "Alivium / Advil / Genérico",
          "type": "Farmácia",
          "presentation": "Gotas 50 mg/mL e 100 mg/mL, Comprimidos 400 mg e 600 mg, Cápsulas gelatinosas 400 mg"
        }
      ],
      "formulations": [
        {
          "label": "Gotas 100 mg/mL pediátrico (1 gota = 5 mg)",
          "dose_text": "Dose pediátrica padrão: 5 a 10 mg/kg/dose a cada 6 a 8 horas (equivalente a 1 a 2 gotas por kg de peso da apresentação 100 mg/mL).",
          "interval_text": "A cada 6 a 8 horas se dor ou febre (mínimo 6h entre tomadas)",
          "route": "Oral (VO)",
          "duration_text": "3 a 5 dias (uso curto)",
          "population": "Crianças acima de 6 meses de idade",
          "max_daily_text": "Dose máxima pediátrica: 40 mg/kg/dia ou máx 2.400 mg/dia.",
          "administration": "Administrar preferencialmente após as refeições ou com leite para reduzir desconforto gástrico.",
          "prescription_type": "Receita simples (MIP)",
          "cautions": "CONTRAINDICADO em suspeita de Dengue (risco de plaquetopenia e hemorragia grave) e em desidratação (risco de nefrite e lesão renal aguda).",
          "calculator": {
            "type": "pediatric_weight",
            "min_mg_kg_day": 20,
            "max_mg_kg_day": 40,
            "default_mg_kg_day": 30
          },
          "source_url": "https://consultas.anvisa.gov.br/#/bulario/"
        },
        {
          "label": "Comprimidos 400 mg e 600 mg (Adultos)",
          "dose_text": "Adultos: 400 mg a 600 mg por via oral a cada 6 a 8 horas (dose analgésica habitual: 400 mg 8/8h; dose anti-inflamatória: 600 mg 8/8h ou 6/6h).",
          "interval_text": "A cada 6 a 8 horas",
          "route": "Oral (VO)",
          "duration_text": "3 a 7 dias (limitar ao menor tempo eficaz)",
          "population": "Adultos e Idosos hígidos",
          "max_daily_text": "Dose máxima de 2.400 mg/dia (4 comp. de 600 mg).",
          "administration": "Tomar junto ou após as refeições com copo cheio de água.",
          "prescription_type": "Receita simples",
          "cautions": "Risco de úlcera péptica, sangramento gastrintestinal, piora da hipertensão arterial, descompensação de insuficiência cardíaca e nefrotoxicidade.",
          "source_url": "https://consultas.anvisa.gov.br/#/bulario/"
        }
      ],
      "contraindications": [
        "Suspeita ou confirmação de Dengue / Febre Hemorrágica",
        "Úlcera péptica ativa ou hemorragia digestiva prévia por AINE",
        "Insuficiência renal grave (TFG < 30 mL/min)",
        "Insuficiência cardíaca descompensada (NYHA III/IV)",
        "Terceiro trimestre de gestação"
      ],
      "renal_adjustment": "TFG > 30 mL/min: usar menor dose pelo menor tempo. TFG < 30 mL/min: CONTRAINDICADO.",
      "hepatic_adjustment": "Evitar em insuficiência hepática moderada a grave.",
      "adverse_reactions": [
        "Dispepsia, epigastralgia, pirose",
        "Lesão renal aguda pré-renal por inibição de prostaglandinas vasodilatadoras",
        "Retenção hidrossalina e elevação pressórica"
      ],
      "drug_interactions": [
        "Aumenta níveis de Lítio e Metotrexato",
        "Reduz eficácia de anti-hipertensivos (IECAs, BRAs, Diuréticos)",
        "Aumenta risco hemorrágico com anticoagulantes e antiagregantes"
      ],
      "pregnancy_category": "Categoria C (1º e 2º trimestres) / Categoria D (3º trimestre — risco de fechamento prematuro do canal arterial e oligoâmnio)",
      "pregnancy_text": "CONTRAINDICADO no 3º trimestre da gravidez.",
      "reviewed_at": "2026-10-30"
    }
  },
  {
    "id": "seed-drug-cetoprofeno",
    "name": "Cetoprofeno (Profenid)",
    "active_ingredient": "Cetoprofeno",
    "therapeutic_class": "Anti-inflamatórios Não Esteroidais (AINEs)",
    "pharmacological_class": "AINE inibidor não seletivo de COX-1/COX-2 e inibidor da migração leucocitária",
    "data": {
      "status": "posology_verified",
      "therapeutic_class": "AINEs e Analgésicos · Emergência e Analgesia Parenteral",
      "indication": "Dor aguda intensa osteomuscular, cólica nefrítica aguda, crise de gota, lombalgia aguda e dor pós-operatória.",
      "diseases": [
        "Cólica Nefrítica Aguda",
        "Crise de Gota Aguda",
        "Lombalgia Aguda",
        "Tendinite / Bursite Aguda",
        "Dor Pós-Operatória"
      ],
      "products": [
        {
          "name": "Profenid / Genérico",
          "type": "Hospitalar / Farmácia",
          "presentation": "Frasco-ampola IV 100 mg pó liofilizado, Ampola IM 100 mg/2 mL, Comprimidos 100 mg e 150 mg"
        }
      ],
      "formulations": [
        {
          "label": "Solução injetável 100 mg pó liofilizado (Uso Endovenoso)",
          "dose_text": "100 mg IV diluídos em 100 mL de SF 0,9% ou SG 5% infundidos em 20 a 30 minutos a cada 12 horas.",
          "interval_text": "A cada 12 horas (máx 2 doses ao dia)",
          "route": "Endovenoso (IV)",
          "duration_text": "1 a 3 dias na sala de medicação / internação",
          "population": "Adultos",
          "max_daily_text": "Dose máxima de 200 mg/dia por via parenteral.",
          "administration": "Infundir em bomba ou gota a gota em no mínimo 20 minutos. Não aplicar em bolus IV direto.",
          "prescription_type": "Receita simples (Uso hospitalar/ambulatorial)",
          "cautions": "Hidratação adequada prévia obrigatória para prevenir necrose tubular aguda e insuficiência renal aguda por AINE.",
          "source_url": "https://consultas.anvisa.gov.br/#/bulario/"
        },
        {
          "label": "Comprimidos 100 mg ou 150 mg liberação prolongada (Uso Oral)",
          "dose_text": "100 mg VO de 12/12h ou 150 mg VO uma vez ao dia com alimentos.",
          "interval_text": "A cada 12 a 24 horas",
          "route": "Oral (VO)",
          "duration_text": "3 a 5 dias",
          "population": "Adultos",
          "max_daily_text": "200 mg/dia.",
          "administration": "Tomar inteiro com copo d'água durante as refeições.",
          "prescription_type": "Receita simples",
          "cautions": "Proteger mucosa gástrica com IBP (Omeprazol) se paciente > 60 anos ou história de dispepsia.",
          "source_url": "https://consultas.anvisa.gov.br/#/bulario/"
        }
      ],
      "contraindications": [
        "Dengue suspeita ou confirmada",
        "Úlcera péptica ativa",
        "Insuficiência renal grave (ClCr < 30 mL/min)",
        "Insuficiência cardíaca grave",
        "Terceiro trimestre de gestação"
      ],
      "renal_adjustment": "ClCr < 30 mL/min: CONTRAINDICADO.",
      "hepatic_adjustment": "Usar com cautela em cirrose compensada; contraindicado em cirrose descompensada.",
      "adverse_reactions": [
        "Epigastralgia, náuseas, hemorragia digestiva",
        "Insuficiência renal aguda funcional",
        "Reações anafilactoides e broncoespasmo em asmáticos intolerantes a aspirina"
      ],
      "drug_interactions": [
        "Potencializa anticoagulantes orais e heparinas",
        "Aumenta toxicidade do metotrexato e lítio"
      ],
      "pregnancy_category": "Categoria D (3º trimestre)",
      "pregnancy_text": "Contraindicado no terceiro trimestre da gravidez.",
      "reviewed_at": "2026-10-30"
    }
  },
  {
    "id": "seed-drug-tramadol",
    "name": "Tramadol (Cloridrato de Tramadol)",
    "active_ingredient": "Tramadol",
    "therapeutic_class": "Analgésicos Opioides",
    "pharmacological_class": "Opioide fraco agonista de receptores mu e inibidor da recaptação de serotonina e noradrenalina",
    "data": {
      "status": "posology_verified",
      "therapeutic_class": "Opioides · Degrau 2 da Escada Analgésica da OMS",
      "indication": "Dor moderada a intensa não controlada com analgésicos comuns e AINEs (cólica nefrítica, trauma, pós-operatório, dor oncológica).",
      "diseases": [
        "Cólica Nefrítica Refratária",
        "Dor Pós-Operatória Moderada",
        "Trauma Osteoarticular",
        "Lombalgia Aguda Grave",
        "Dor Oncológica"
      ],
      "products": [
        {
          "name": "Tramal / Dorflex Uno / Genérico",
          "type": "Farmácia / Hospitalar",
          "presentation": "Ampolas 50 mg/1 mL e 100 mg/2 mL, Cápsulas 50 mg, Gotas 100 mg/mL (1 gota = 2,5 mg)"
        }
      ],
      "formulations": [
        {
          "label": "Solução injetável 50 mg e 100 mg (Uso Endovenoso)",
          "dose_text": "50 mg a 100 mg IV diluídos em 100 mL de SF 0,9% ou SG 5% infundidos lentamente em 20 a 30 minutos a cada 6 a 8 horas conforme dor.",
          "interval_text": "A cada 6 a 8 horas se dor moderada a intensa",
          "route": "Endovenoso lento (IV)",
          "duration_text": "Uso hospitalar / sala de emergência enquanto durar a dor aguda",
          "population": "Adultos e Adolescentes > 12 anos",
          "max_daily_text": "Dose máxima de 400 mg/dia em adultos (reduzir para 300 mg/dia em idosos > 75 anos).",
          "administration": "NUNCA injetar em bolus rápido IV pelo alto risco de náuseas incoercíveis, vômitos em jato, tontura e hipotensão postural. Associar antiemético (Metoclopramida ou Ondansetrona) profilático.",
          "prescription_type": "Receita de Controle Especial (Lista C1 - Branca em 2 vias)",
          "cautions": "Risco de síndrome serotoninérgica quando associado a antidepressivos (ISRS, IRSN, Tricíclicos, IMAO) e redução do limiar convulsivo.",
          "source_url": "https://consultas.anvisa.gov.br/#/bulario/"
        },
        {
          "label": "Cápsulas 50 mg e Gotas 100 mg/mL (Uso Oral)",
          "dose_text": "50 mg a 100 mg VO (1 a 2 cápsulas ou 20 a 40 gotas) a cada 6 a 8 horas.",
          "interval_text": "A cada 6 a 8 horas se dor",
          "route": "Oral (VO)",
          "duration_text": "3 a 7 dias",
          "population": "Adultos",
          "max_daily_text": "400 mg/dia.",
          "administration": "Ingerir com água, com ou sem alimentos.",
          "prescription_type": "Receita de Controle Especial (Lista C1)",
          "cautions": "Orientar sobre sonolência, tontura e constipação; prescrever laxativo de rotina se uso prolongado.",
          "source_url": "https://consultas.anvisa.gov.br/#/bulario/"
        }
      ],
      "contraindications": [
        "Intoxicação aguda por álcool, hipnóticos ou outros opioides",
        "Uso concomitante ou recente (< 14 dias) de inibidores da MAO",
        "Epilepsia não controlada"
      ],
      "renal_adjustment": "ClCr < 30 mL/min: aumentar intervalo para a cada 12 horas e limitar dose máxima a 200 mg/dia.",
      "hepatic_adjustment": "Cirrose hepática: aumentar intervalo para a cada 12 horas (50 mg 12/12h).",
      "adverse_reactions": [
        "Náuseas e vômitos (muito frequentes sem antiemético)",
        "Tontura, sonolência, cefaleia",
        "Constipação intestinal",
        "Depressão respiratória (rara em doses usuais)"
      ],
      "drug_interactions": [
        "Inibidores da recaptação de serotonina aumentam risco de Síndrome Serotoninérgica",
        "Carbamazepina reduz acentuadamente a eficácia do tramadol"
      ],
      "antidote": [
        "Naloxona 0,04 a 0,4 mg IV (reverte sedação e depressão respiratória; pode não reverter totalmente convulsões causadas por tramadol)."
      ],
      "pregnancy_category": "Categoria C",
      "pregnancy_text": "Evitar na gravidez e lactação.",
      "reviewed_at": "2026-10-30"
    }
  },
  {
    "id": "seed-drug-metoclopramida",
    "name": "Metoclopramida (Plasil)",
    "active_ingredient": "Metoclopramida",
    "therapeutic_class": "Antieméticos e Pró-cinéticos",
    "pharmacological_class": "Antagonista dopaminérgico D2 periférico e central com ação colinérgica pró-cinética",
    "data": {
      "status": "posology_verified",
      "therapeutic_class": "Antieméticos · Pró-cinético Gastrointestinal",
      "indication": "Náuseas e vômitos de diversas etiologias (pós-operatório, infeccioso, enxaqueca, induzido por opioides) e estase gástrica / gastroparesia.",
      "diseases": [
        "Náuseas e Vômitos Agudos",
        "Crise de Enxaqueca",
        "Gastroparesia Diabética",
        "Refluxo Gastroesofágico Agudo"
      ],
      "products": [
        {
          "name": "Plasil / Genérico",
          "type": "Farmácia / Hospitalar",
          "presentation": "Ampola 10 mg/2 mL (5 mg/mL), Comprimido 10 mg, Gotas 4 mg/mL"
        }
      ],
      "formulations": [
        {
          "label": "Solução injetável 10 mg/2 mL (Uso Endovenoso ou Intramuscular)",
          "dose_text": "10 mg (1 ampola de 2 mL) IV lento em 2 a 3 minutos ou diluído em 50 a 100 mL de SF 0,9% a cada 8 horas.",
          "interval_text": "A cada 8 horas conforme náusea/vômitos",
          "route": "Endovenoso lento (IV) ou Intramuscular (IM)",
          "duration_text": "1 a 3 dias na fase aguda hospitalar",
          "population": "Adultos",
          "max_daily_text": "Dose máxima de 30 mg/dia (3 ampolas) ou 0,5 mg/kg/dia.",
          "administration": "Infundir IV lentamente em no mínimo 3 minutos. A infusão rápida em bolus causa agitação psicomotora súbita, ansiedade intensa e sensação de pânico.",
          "prescription_type": "Receita simples",
          "cautions": "Risco de Reações Extrapiramidais e Distonia Aguda (trismo, crise oculógira, torcicolo espasmódico), especialmente em jovens e mulheres. Antídoto: Biperideno 5 mg IM/IV ou Difenidramina 50 mg IV.",
          "source_url": "https://consultas.anvisa.gov.br/#/bulario/"
        },
        {
          "label": "Comprimidos 10 mg e Gotas 4 mg/mL (Uso Oral)",
          "dose_text": "10 mg VO (1 comprimido ou 50 gotas) até de 8 em 8 horas cerca de 30 minutos antes das refeições.",
          "interval_text": "A cada 8 horas (30 min antes das refeições)",
          "route": "Oral (VO)",
          "duration_text": "Até 5 dias (evitar uso crônico pelo risco de discinesia tardia)",
          "population": "Adultos",
          "max_daily_text": "30 mg/dia.",
          "administration": "Ingerir com água cerca de 30 minutos antes de comer.",
          "prescription_type": "Receita simples",
          "cautions": "Não utilizar em crianças menores de 1 ano pelo risco grave de reações extrapiramidais.",
          "source_url": "https://consultas.anvisa.gov.br/#/bulario/"
        }
      ],
      "contraindications": [
        "Hemorragia, obstrução mecânica ou perfuração gastrointestinal",
        "Feocromocitoma (risco de crise hipertensiva aguda por liberação de catecolaminas)",
        "Epilepsia e história de discinesia tardia por neurolépticos"
      ],
      "renal_adjustment": "ClCr 15–60 mL/min: reduzir dose em 50%. ClCr < 15 mL/min: reduzir dose em 75% (usar 2,5 a 5 mg).",
      "hepatic_adjustment": "Cirrose hepática grave: reduzir dose em 50%.",
      "adverse_reactions": [
        "Sedação, sonolência e astenia",
        "Reações distônicas agudas / acatisia",
        "Hiperprolactinemia e galactorreia"
      ],
      "drug_interactions": [
        "Potencializa efeitos depressores do SNC com álcool e sedativos",
        "Anticolinérgicos antagonizam o efeito pró-cinético da metoclopramida"
      ],
      "antidote": [
        "Biperideno (Akineton) 2,5 a 5 mg IM/IV lento para reversão imediata de distonia aguda."
      ],
      "pregnancy_category": "Categoria B",
      "pregnancy_text": "Pode ser utilizado na gestação quando estritamente necessário para hiperêmese gravídica.",
      "reviewed_at": "2026-10-30"
    }
  },
  {
    "id": "seed-drug-escopolamina",
    "name": "Butilbrometo de Escopolamina (Buscopan) e Buscopan Composto",
    "active_ingredient": "Butilbrometo de Escopolamina",
    "therapeutic_class": "Antiespasmódicos e Anticolinérgicos",
    "pharmacological_class": "Antiespasmódico anticolinérgico derivado quaternário de amônio",
    "data": {
      "status": "posology_verified",
      "therapeutic_class": "Antiespasmódicos · Cólica Abdominal e Nefrítica",
      "indication": "Espasmos agudos dos tratos gastrintestinal, biliar e geniturinário (cólica intestinal, cólica biliar, cólica nefrítica e dismenorreia espástica).",
      "diseases": [
        "Cólica Abdominal / Intestinal",
        "Cólica Biliar Aguda",
        "Cólica Nefrítica Aguda",
        "Dismenorreia Espástica"
      ],
      "products": [
        {
          "name": "Buscopan / Buscopan Composto (+ Dipirona) / Genérico",
          "type": "Farmácia / Hospitalar",
          "presentation": "Ampola Simples 20 mg/1 mL, Ampola Composta (20 mg escopolamina + 2.500 mg dipirona / 5 mL), Drágeas 10 mg"
        }
      ],
      "formulations": [
        {
          "label": "Ampola Composta 5 mL (20 mg escopolamina + 2,5 g dipirona) — Uso Endovenoso",
          "dose_text": "1 ampola (5 mL) diluída em 100 mL de SF 0,9% infundida por via endovenosa em 15 a 20 minutos.",
          "interval_text": "A cada 8 a 12 horas conforme dor em cólica",
          "route": "Endovenoso lento (IV)",
          "duration_text": "1 a 2 dias na emergência",
          "population": "Adultos",
          "max_daily_text": "Dose máxima de 3 ampolas ao dia.",
          "administration": "Infundir lentamente diluído em soro. A injeção rápida pode causar hipotensão súbita e taquicardia reflexa.",
          "prescription_type": "Receita simples",
          "cautions": "Apresenta efeito anticolinérgico: contraindicado em glaucoma de ângulo fechado, retenção urinária aguda e íleo paralítico.",
          "source_url": "https://consultas.anvisa.gov.br/#/bulario/"
        },
        {
          "label": "Drágeas 10 mg Simples e Drágeas Compostas (Uso Oral)",
          "dose_text": "10 a 20 mg (1 a 2 drágeas) por via oral de 6 em 6 horas ou de 8 em 8 horas.",
          "interval_text": "A cada 6 a 8 horas se dor",
          "route": "Oral (VO)",
          "duration_text": "3 a 5 dias",
          "population": "Adultos e Crianças > 6 anos",
          "max_daily_text": "Máximo de 6 drágeas simples (60 mg/dia).",
          "administration": "Engolir com água sem mastigar.",
          "prescription_type": "Receita simples (MIP)",
          "cautions": "Pode provocar boca seca, turvação visual por cicloplegia e taquicardia.",
          "source_url": "https://consultas.anvisa.gov.br/#/bulario/"
        }
      ],
      "contraindications": [
        "Glaucoma de ângulo fechado não tratado",
        "Megacólon e íleo adinâmico",
        "Hiperplasia prostática benigna com retenção urinária",
        "Miastenia gravis"
      ],
      "renal_adjustment": "Não requer ajuste na forma simples.",
      "hepatic_adjustment": "Usar com cautela em hepatopatias avançadas.",
      "adverse_reactions": [
        "Taquicardia sinusal",
        "Boca seca e pele seca",
        "Retenção urinária aguda em homens idosos",
        "Turvação visual"
      ],
      "drug_interactions": [
        "Potencializa os efeitos anticolinérgicos de antidepressivos tricíclicos, anti-histamínicos e antipsicóticos"
      ],
      "pregnancy_category": "Categoria C",
      "pregnancy_text": "Usar apenas se benefício superar riscos; evitar no final da gestação.",
      "reviewed_at": "2026-10-30"
    }
  },
  {
    "id": "seed-drug-captopril",
    "name": "Captopril",
    "active_ingredient": "Captopril",
    "therapeutic_class": "Anti-hipertensivos",
    "pharmacological_class": "Inibidor da Enzima Conversora de Angiotensina (IECA)",
    "data": {
      "status": "posology_verified",
      "therapeutic_class": "Anti-hipertensivos e Cardiovasculares · IECA de Curta Ação",
      "indication": "Hipertensão arterial sistêmica, insuficiência cardíaca crônica com fração de ejeção reduzida, pós-infarto do miocárdio e urgência hipertensiva / pseudocrise hipertensiva.",
      "diseases": [
        "Hipertensão Arterial Sistêmica",
        "Urgência Hipertensiva",
        "Insuficiência Cardíaca",
        "Pós-IAM",
        "Nefropatia Diabética"
      ],
      "products": [
        {
          "name": "Capoten / Genérico",
          "type": "Farmácia / Hospitalar",
          "presentation": "Comprimidos 12,5 mg, 25 mg e 50 mg"
        }
      ],
      "formulations": [
        {
          "label": "Comprimidos 25 mg (Uso Oral ou Sublingual em Urgência)",
          "dose_text": "Urgência Hipertensiva / Ambulatório: 25 mg a 50 mg via oral (ou sublingual para ação mais rápida em 15–30 min). Dose ambulatorial: 25 a 50 mg de 8 em 8 horas ou 12/12h.",
          "interval_text": "A cada 8 a 12 horas",
          "route": "Oral (VO) ou Sublingual (SL)",
          "duration_text": "Uso contínuo na HAS; dose pontual na urgência",
          "population": "Adultos",
          "max_daily_text": "150 mg/dia.",
          "administration": "Ingerir 1 hora antes das refeições (alimentos reduzem a absorção em 30 a 40%).",
          "prescription_type": "Receita simples",
          "cautions": "CONTRAINDICADO formalmente na gestação (teratogênico — oligohidrâmnio, anúria e malformações renais fetais) e em estenose bilateral de artérias renais.",
          "source_url": "https://consultas.anvisa.gov.br/#/bulario/"
        }
      ],
      "contraindications": [
        "Gestação em qualquer trimestre (Categoria X/D)",
        "História prévia de angioedema associado a IECA",
        "Estenose bilateral de artéria renal ou estenose em rim único",
        "Uso concomitante com Sacubitril/Valsartana (aguardar janela de 36h)"
      ],
      "renal_adjustment": "ClCr 10–50 mL/min: 75% da dose. ClCr < 10 mL/min: 50% da dose a cada 12 a 24 horas. Suspender se K+ > 5,5 mEq/L ou elevação de creatinina > 30-50%.",
      "hepatic_adjustment": "Não requer ajuste na insuficiência hepática.",
      "adverse_reactions": [
        "Tosse seca persistente (por acúmulo de bradicinina — ocorre em até 15-20% dos pacientes)",
        "Hipotensão postural na primeira dose",
        "Hipercalemia",
        "Angioedema de face, lábios e glote"
      ],
      "drug_interactions": [
        "AINEs reduzem o efeito anti-hipertensivo e aumentam nefrotoxicidade",
        "Suplementos de potássio e Espironolactona aumentam risco de hipercalemia grave"
      ],
      "pregnancy_category": "Categoria D/X (Teratogênico grave)",
      "pregnancy_text": "ABSOLUTAMENTE CONTRAINDICADO na gestação.",
      "reviewed_at": "2026-10-30"
    }
  },
  {
    "id": "seed-drug-losartana",
    "name": "Losartana Potássica",
    "active_ingredient": "Losartana",
    "therapeutic_class": "Anti-hipertensivos",
    "pharmacological_class": "Bloqueador dos Receptores de Angiotensina II (BRA - subtipo AT1)",
    "data": {
      "status": "posology_verified",
      "therapeutic_class": "Anti-hipertensivos · BRA de 1ª Escolha na HAS e Nefroproteção",
      "indication": "Hipertensão arterial sistêmica, insuficiência cardíaca crônica com fração de ejeção reduzida, nefropatia diabética com proteinúria e alternativa a IECAs em pacientes com tosse seca.",
      "diseases": [
        "Hipertensão Arterial Sistêmica",
        "Nefropatia Diabética",
        "Insuficiência Cardíaca",
        "Prevenção de AVC na Hipertensão"
      ],
      "products": [
        {
          "name": "Cozaar / Aradois / Genérico",
          "type": "Farmácia / UBS",
          "presentation": "Comprimidos revestidos 50 mg e 100 mg"
        }
      ],
      "formulations": [
        {
          "label": "Comprimidos 50 mg e 100 mg (Uso Oral)",
          "dose_text": "Dose inicial habitual: 50 mg por via oral uma vez ao dia (pela manhã). Pode ser titulada para 100 mg uma vez ao dia (ou 50 mg de 12/12h) se necessário para atingir a meta pressórica.",
          "interval_text": "A cada 24 horas (ou 12 horas)",
          "route": "Oral (VO)",
          "duration_text": "Uso contínuo crônico",
          "population": "Adultos e Idosos",
          "max_daily_text": "Dose máxima de 100 mg/dia.",
          "administration": "Ingerir com água, com ou sem alimentos.",
          "prescription_type": "Receita simples (Disponível gratuitamente no programa Farmácia Popular)",
          "cautions": "Monitorar eletrólitos (potássio sérico) e função renal (creatinina) antes e 2 a 4 semanas após o início ou aumento da dose.",
          "source_url": "https://consultas.anvisa.gov.br/#/bulario/"
        }
      ],
      "contraindications": [
        "Gestação (todos os trimestres)",
        "Estenose bilateral de artérias renais",
        "Hipersensibilidade conhecida à losartana"
      ],
      "renal_adjustment": "Não requer ajuste de dose inicial na insuficiência renal leve a moderada; monitorar potássio e suspender se K+ > 5,5 mEq/L persistente.",
      "hepatic_adjustment": "Cirrose hepática compensada: iniciar com dose menor de 25 mg uma vez ao dia.",
      "adverse_reactions": [
        "Tontura e hipotensão ortostática",
        "Hipercalemia",
        "Elevação transitória de creatinina sérica",
        "Angioedema (raro)"
      ],
      "drug_interactions": [
        "Espironolactona, suplementos de potássio e AINEs aumentam o risco de hipercalemia e lesão renal aguda"
      ],
      "pregnancy_category": "Categoria D (Teratogênico)",
      "pregnancy_text": "CONTRAINDICADO formalmente durante toda a gestação.",
      "reviewed_at": "2026-10-30"
    }
  },
  {
    "id": "seed-drug-anlodipino",
    "name": "Anlodipino (Besilato de Anlodipino)",
    "active_ingredient": "Anlodipino",
    "therapeutic_class": "Anti-hipertensivos e Antianginosos",
    "pharmacological_class": "Bloqueador dos canais de cálcio di-hidropiridínico de longa ação",
    "data": {
      "status": "posology_verified",
      "therapeutic_class": "Anti-hipertensivos · Vasodilatador Arterial Direto",
      "indication": "Hipertensão arterial sistêmica (excelente em monoterapia ou em combinação com IECA/BRA), angina de peito crônica estável e angina vasoespástica (Prinzmetal).",
      "diseases": [
        "Hipertensão Arterial Sistêmica",
        "Angina Estável",
        "Angina Vasoespástica",
        "Idoso Hipertenso com PAS Isolada"
      ],
      "products": [
        {
          "name": "Norvasc / Pressat / Genérico",
          "type": "Farmácia / UBS",
          "presentation": "Comprimidos 5 mg e 10 mg"
        }
      ],
      "formulations": [
        {
          "label": "Comprimidos 5 mg e 10 mg (Uso Oral)",
          "dose_text": "Dose inicial: 5 mg por via oral uma vez ao dia. Se necessário, titular após 2 a 4 semanas para a dose máxima de 10 mg uma vez ao dia. Em idosos frágeis ou hepatopatas: iniciar com 2,5 mg/dia.",
          "interval_text": "A cada 24 horas (dose única diária)",
          "route": "Oral (VO)",
          "duration_text": "Uso contínuo crônico",
          "population": "Adultos e Idosos",
          "max_daily_text": "Dose máxima de 10 mg/dia.",
          "administration": "Tomar em qualquer horário do dia, com ou sem alimentos.",
          "prescription_type": "Receita simples (Disponível no Farmácia Popular)",
          "cautions": "Efeito adverso típico: Edema maleolar periférico bilateral dependente da dose (ocorre por vasodilatação pré-capilar preferencial e transudação capilar, NÃO por retenção hidrossalina ou falência cardíaca). Responder melhor à associação com IECA/BRA do que a diuréticos.",
          "source_url": "https://consultas.anvisa.gov.br/#/bulario/"
        }
      ],
      "contraindications": [
        "Hipotensão grave (PAS < 90 mmHg)",
        "Choque cardiogênico",
        "Estenose aórtica grave sintomática",
        "Hipersensibilidade a di-hidropiridinas"
      ],
      "renal_adjustment": "Não requer ajuste na disfunção renal.",
      "hepatic_adjustment": "Cirrose ou insuficiência hepática: iniciar com 2,5 mg/dia devido à meia-vida prolongada (35–50 horas).",
      "adverse_reactions": [
        "Edema periférico de membros inferiores",
        "Rubor facial e cefaleia vasomotora",
        "Palpitações e tontura reflexa",
        "Hipertrofia gengival (rara)"
      ],
      "drug_interactions": [
        "Inibidores potentes do CYP3A4 (Claritromicina, Cetoconazol) aumentam os níveis plasmáticos de anlodipino",
        "Sinvastatina: dose máxima de sinvastatina deve ser limitada a 20 mg/dia quando associada ao anlodipino"
      ],
      "pregnancy_category": "Categoria C",
      "pregnancy_text": "Pode ser utilizado na gestação como droga de segunda linha quando Metildopa ou Hidralazina forem insuficientes.",
      "reviewed_at": "2026-10-30"
    }
  },
  {
    "id": "seed-drug-metformina",
    "name": "Metformina (Cloridrato de Metformina)",
    "active_ingredient": "Metformina",
    "therapeutic_class": "Antidiabéticos Orais",
    "pharmacological_class": "Biguanida sensibilizadora de insulina e inibidora da gliconeogênese hepática",
    "data": {
      "status": "posology_verified",
      "therapeutic_class": "Antidiabéticos Orais · Droga de 1ª Linha no Diabetes Mellitus Tipo 2",
      "indication": "Diabetes Mellitus tipo 2 em adultos e crianças >= 10 anos (droga de primeira escolha mundial e nas diretrizes SBD/ADA), pré-diabetes e Síndrome dos Ovários Policísticos (SOP).",
      "diseases": [
        "Diabetes Mellitus Tipo 2",
        "Pré-Diabetes / Resistência Insulínica",
        "Síndrome dos Ovários Policísticos (SOP)"
      ],
      "products": [
        {
          "name": "Glifage / Glifage XR / Genérico",
          "type": "Farmácia / UBS",
          "presentation": "Comprimidos convencionais 500 mg e 850 mg; Comprimidos de liberação prolongada (XR) 500 mg, 750 mg e 1.000 mg"
        }
      ],
      "formulations": [
        {
          "label": "Comprimidos convencionais 500 mg e 850 mg / XR 500 mg a 1.000 mg",
          "dose_text": "Iniciar com 500 mg no jantar ou 850 mg uma vez ao dia com alimentos. Aumentar gradualmente a cada 1 a 2 semanas para 1.000 mg 2x/dia (no café da manhã e jantar) ou 2.000 mg/dia (dose terapêutica plena recomendada: 2.000 a 2.550 mg/dia). A formulação XR reduz expressivamente efeitos colaterais gastrointestinais.",
          "interval_text": "A cada 12 ou 24 horas com as refeições",
          "route": "Oral (VO)",
          "duration_text": "Uso contínuo crônico",
          "population": "Adultos e Crianças >= 10 anos",
          "max_daily_text": "2.550 mg/dia da convencional ou 2.000 mg/dia da forma XR.",
          "administration": "OBRIGATÓRIO ingerir durante ou imediatamente após as principais refeições para minimizar náuseas, diarreia e desconforto abdominal.",
          "prescription_type": "Receita simples (Disponível gratuitamente no programa Farmácia Popular)",
          "cautions": "Risco raro porém potencialmente fatal de Acidose Lática se utilizada em hipóxia tecidual, choque séptico/cardiogênico ou insuficiência renal avançada (TFG < 30 mL/min). Suspender 48 horas antes de exames contrastados com iodo venoso e em internações agudas graves.",
          "source_url": "https://consultas.anvisa.gov.br/#/bulario/"
        }
      ],
      "contraindications": [
        "Insuficiência renal grave com TFG < 30 mL/min/1,73m²",
        "Acidose metabólica aguda ou crônica de qualquer etiologia",
        "Insuficiência cardíaca descompensada aguda, choque séptico ou hipoxemia grave",
        "Insuficiência hepática grave ou alcoolismo ativo"
      ],
      "renal_adjustment": "TFG >= 60 mL/min: dose plena normal (até 2.550 mg). TFG 45–59 mL/min: dose máxima de 2.000 mg/dia com monitoramento renal semestral. TFG 30–44 mL/min: dose máxima reduzida para 1.000 mg/dia e não iniciar novos pacientes. TFG < 30 mL/min: CONTRAINDICADA formalmente.",
      "hepatic_adjustment": "Contraindicada em insuficiência hepática descompensada devido ao risco de acidose lática por redução do clearance de lactato.",
      "adverse_reactions": [
        "Sintomas gastrointestinais iniciais: diarreia aquosa, náuseas, flatulência, gosto metálico na boca (frequentes, melhoram com titulação lenta)",
        "Deficiência crônica de vitamina B12 (dosar anualmente se uso > 3-4 anos)",
        "Acidose lática"
      ],
      "drug_interactions": [
        "Contraste iodado endovenoso aumenta risco de insuficiência renal aguda e acidose lática (suspender no dia e reintroduzir após 48h com função renal estável)",
        "Álcool agudo em excesso potencializa o risco de acidose lática"
      ],
      "pregnancy_category": "Categoria B",
      "pregnancy_text": "Segura na gestação; em diabetes gestacional a insulina é o tratamento padrão ouro, mas a metformina pode ser mantida ou utilizada em cenários selecionados.",
      "reviewed_at": "2026-10-30"
    }
  },
  {
    "id": "seed-drug-amoxicilina",
    "name": "Amoxicilina",
    "active_ingredient": "Amoxicilina",
    "therapeutic_class": "Antimicrobianos",
    "pharmacological_class": "Betalactâmico aminopenicilínico bactericida inibidor da síntese de peptideoglicano da parede bacteriana",
    "data": {
      "status": "posology_verified",
      "therapeutic_class": "Antimicrobianos · Penicilina de 1ª Linha em Vias Aéreas",
      "indication": "Infecções do trato respiratório superior e inferior (faringoamigdalite estreptocócica, otite média aguda, rinossinusite bacteriana, pneumonia adquirida na comunidade em crianças e adultos sem comorbidades), infecção odontológica e profilaxia de endocardite infecciosa.",
      "diseases": [
        "Faringoamigdalite Estreptocócica (GAS)",
        "Otite Média Aguda (OMA)",
        "Sinusite Bacteriana Aguda",
        "PAC Não Complicada",
        "Abscesso Dentário"
      ],
      "products": [
        {
          "name": "Amoxil / Genérico",
          "type": "Farmácia / UBS",
          "presentation": "Cápsulas 500 mg, Comprimidos 875 mg, Suspensão oral 250 mg/5 mL e 500 mg/5 mL"
        }
      ],
      "formulations": [
        {
          "label": "Cápsulas 500 mg e Comprimidos 875 mg (Adultos)",
          "dose_text": "500 mg por via oral a cada 8 horas OU 875 mg por via oral a cada 12 horas por 7 a 10 dias (faringoamigdalite: 10 dias completos para prevenção de febre reumática; PAC não complicada: 5 a 7 dias).",
          "interval_text": "A cada 8 horas (500 mg) ou 12 horas (875 mg)",
          "route": "Oral (VO)",
          "duration_text": "5 a 10 dias conforme o foco infeccioso",
          "population": "Adultos e Crianças > 40 kg",
          "max_daily_text": "Dose máxima de 3.000 mg a 4.000 mg/dia em infecções graves.",
          "administration": "Pode ser ingerido com ou sem alimentos (alimentos não interferem significativamente na absorção).",
          "prescription_type": "Receita de Controle Especial (Antimicrobianos - Branca em 2 vias, validade 10 dias)",
          "cautions": "Pesquisar história prévia de alergia a penicilinas (urticária, anafilaxia). Erupção cutânea maculopapular benigna pode ocorrer se prescrita inadvertidamente em mononucleose infecciosa por vírus Epstein-Barr (EBV).",
          "source_url": "https://consultas.anvisa.gov.br/#/bulario/"
        },
        {
          "label": "Suspensão oral 250 mg/5 mL e 500 mg/5 mL pediátrica",
          "dose_text": "Dose pediátrica usual: 50 mg/kg/dia divididos a cada 8 horas (ou 12h). Em Otite Média Aguda com suspeita de pneumococo com resistência intermediária: dose dobrada de 80 a 90 mg/kg/dia divididos de 12 em 12 horas.",
          "interval_text": "A cada 8 horas (dose padrão) ou a cada 12 horas (alta dose)",
          "route": "Oral (VO)",
          "duration_text": "7 a 10 dias",
          "population": "Pediatria (Lactentes e Crianças)",
          "max_daily_text": "Dose máxima pediátrica: 90 mg/kg/dia ou máx 3 g/dia.",
          "administration": "Agitar bem o frasco antes de cada administração. Guardar na geladeira após reconstituição por até 14 dias.",
          "prescription_type": "Receita de Antimicrobianos (2 vias)",
          "cautions": "Medir rigorosamente com seringa dosadora em mL; orientar a família a completar o tempo total mesmo se houver melhora no 3º dia.",
          "calculator": {
            "type": "pediatric_weight",
            "min_mg_kg_day": 40,
            "max_mg_kg_day": 90,
            "default_mg_kg_day": 50
          },
          "source_url": "https://consultas.anvisa.gov.br/#/bulario/"
        }
      ],
      "contraindications": [
        "Hipersensibilidade grave comprovada a penicilinas (reação anafilática, angioedema ou Stevens-Johnson)"
      ],
      "renal_adjustment": "TFG 10–30 mL/min: 500 mg a cada 12 horas. TFG < 10 mL/min: 500 mg a cada 24 horas. Hemodiálise: dose suplementar após a sessão.",
      "hepatic_adjustment": "Não requer ajuste de dose.",
      "adverse_reactions": [
        "Diarreia e náuseas leves",
        "Exantema maculopapular alérgico",
        "Monilíase / candidíase oral ou vaginal pós-antimicrobiano"
      ],
      "drug_interactions": [
        "Alopurinol aumenta a incidência de rash cutâneo alérgico",
        "Reduz circulação entero-hepática de estrógenos de contraceptivos orais (orientar método de barreira)"
      ],
      "pregnancy_category": "Categoria B (Antimicrobiano de escolha na gestação)",
      "pregnancy_text": "Segura e amplamente indicada na gestação e lactação.",
      "reviewed_at": "2026-10-30"
    }
  },
  {
    "id": "seed-drug-cefalexina",
    "name": "Cefalexina",
    "active_ingredient": "Cefalexina",
    "therapeutic_class": "Antimicrobianos",
    "pharmacological_class": "Cefalosporina de 1ª geração bactericida ativa contra Gram-positivos e alguns Gram-negativos comunitários",
    "data": {
      "status": "posology_verified",
      "therapeutic_class": "Antimicrobianos · Cefalosporina de 1ª Geração Oral",
      "indication": "Infecções bacterianas de pele e partes moles (celulite, erisipela, furunculose, impetigo), infecções do trato urinário não complicadas em gestantes, faringoamigdalite e mastite puerperal.",
      "diseases": [
        "Celulite e Erisipela Não Complicadas",
        "Impetigo Estreptocócico/Estafilocócico",
        "ITU Baixa na Gestante",
        "Mastite Puerperal"
      ],
      "products": [
        {
          "name": "Keflex / Genérico",
          "type": "Farmácia / UBS",
          "presentation": "Cápsulas e Comprimidos 500 mg, Suspensão oral 250 mg/5 mL"
        }
      ],
      "formulations": [
        {
          "label": "Cápsulas 500 mg (Adultos)",
          "dose_text": "500 mg por via oral a cada 6 horas (ou 1 g a cada 12 horas) por 7 a 10 dias. Em ITU não complicada: 500 mg de 6/6h por 7 dias.",
          "interval_text": "A cada 6 horas (ou 12 horas em infecções selecionadas)",
          "route": "Oral (VO)",
          "duration_text": "7 a 10 dias",
          "population": "Adultos e Adolescentes",
          "max_daily_text": "Dose máxima de 4.000 mg (4 g/dia).",
          "administration": "Ingerir com água, com ou sem alimentos.",
          "prescription_type": "Receita de Controle Especial (Antimicrobianos - 2 vias)",
          "cautions": "Não tem ação contra MRSA comunitário ou hospitalar (Staphylococcus aureus resistente à meticilina) nem contra Enterococo ou bactérias anaeróbias.",
          "source_url": "https://consultas.anvisa.gov.br/#/bulario/"
        },
        {
          "label": "Suspensão oral 250 mg/5 mL pediátrico",
          "dose_text": "Dose pediátrica padrão: 25 a 50 mg/kg/dia fracionados em 4 tomadas (de 6 em 6 horas). Em infecções cutâneas graves: até 75 a 100 mg/kg/dia.",
          "interval_text": "A cada 6 horas",
          "route": "Oral (VO)",
          "duration_text": "7 a 10 dias",
          "population": "Pediatria",
          "max_daily_text": "Máximo pediátrico de 100 mg/kg/dia ou máx 3 g/dia.",
          "administration": "Agitar o frasco antes de dosar. Manter refrigerado após reconstituição.",
          "prescription_type": "Receita de Antimicrobianos (2 vias)",
          "cautions": "Alergia cruzada com penicilinas ocorre em cerca de 3 a 5% dos pacientes; contraindicada se histórico de anafilaxia a penicilina.",
          "calculator": {
            "type": "pediatric_weight",
            "min_mg_kg_day": 25,
            "max_mg_kg_day": 75,
            "default_mg_kg_day": 50
          },
          "source_url": "https://consultas.anvisa.gov.br/#/bulario/"
        }
      ],
      "contraindications": [
        "Hipersensibilidade grave imediata prévia a cefalosporinas ou penicilinas"
      ],
      "renal_adjustment": "ClCr 40–50 mL/min: 500 mg 8/8h. ClCr 10–39 mL/min: 500 mg 12/12h. ClCr < 10 mL/min: 250 a 500 mg a cada 24 horas.",
      "hepatic_adjustment": "Não requer ajuste na insuficiência hepática.",
      "adverse_reactions": [
        "Náuseas, vômitos, queimação gástrica e diarreia",
        "Colite pseudomembranosa por Clostridioides difficile (rara)",
        "Candidíase genital"
      ],
      "drug_interactions": [
        "Probenecida reduz a excreção renal e eleva os níveis séricos de cefalexina"
      ],
      "pregnancy_category": "Categoria B (Antimicrobiano seguro na gestação)",
      "pregnancy_text": "Droga de escolha para cistite, bacteriúria assintomática e infecções de pele na gestante e lactante.",
      "reviewed_at": "2026-10-30"
    }
  },
  {
    "id": "seed-drug-cefazolina",
    "name": "Cefazolina Sódica",
    "active_ingredient": "Cefazolina",
    "therapeutic_class": "Antimicrobianos",
    "pharmacological_class": "Cefalosporina de 1ª geração injetável com potente ação antiestafilocócica (MSSA) e antiestreptocócica",
    "data": {
      "status": "posology_verified",
      "therapeutic_class": "Antimicrobianos · Padrão Ouro em Profilaxia Cirúrgica",
      "indication": "Profilaxia antimicrobiana cirúrgica hospitalar (padrão ouro mundial em cirurgias limpas e limpas-contaminadas), celulite e erisipela graves internadas, osteomielite e bacteremia por MSSA.",
      "diseases": [
        "Profilaxia Cirúrgica Antimicrobiana",
        "Celulite e Erisipela Hospitalar",
        "Bacteremia por S. aureus Sensível (MSSA)",
        "Artrite Séptica por MSSA"
      ],
      "products": [
        {
          "name": "Kefazol / Fazolina / Genérico",
          "type": "Hospitalar exclusivo",
          "presentation": "Frasco-ampola com 1 g e 2 g de pó liofilizado para reconstituição IV"
        }
      ],
      "formulations": [
        {
          "label": "Frasco-ampola 1 g e 2 g IV (Profilaxia Cirúrgica e Tratamento Hospitalar)",
          "dose_text": "Profilaxia Cirúrgica: 2 g IV em dose única 30 a 60 minutos ANTES da incisão cirúrgica na indução anestésica (se paciente com peso >= 120 kg, dose aumentada para 3 g IV). Repetir dose de reforço intraoperatório de 1 g a cada 4 horas se cirurgia prolongada ou perda volêmica > 1.500 mL. Tratamento terapêutico: 1 g a 2 g IV de 8 em 8 horas.",
          "interval_text": "Dose única pré-operatória (ou a cada 8h em tratamento clínico)",
          "route": "Endovenoso (IV lento em 3-5 min ou infusão curta em 30 min)",
          "duration_text": "Dose única na profilaxia cirúrgica (NÃO manter por > 24h pós-operatório salvo indicação formal)",
          "population": "Adultos e Pediatria hospitalar",
          "max_daily_text": "Dose terapêutica máxima de 6.000 mg (6 g/dia) ou 12 g/dia em infecções ameaçadoras.",
          "administration": "Diluir em 50 a 100 mL de SF 0,9% ou SG 5% e infundir em 30 minutos.",
          "prescription_type": "Uso restrito hospitalar",
          "cautions": "Não requer manutenção pós-operatória além de 24 horas; prolongar antibiótico cirúrgico no pós-operatório não previne infecção e seleciona germes multirresistentes.",
          "source_url": "https://consultas.anvisa.gov.br/#/bulario/"
        }
      ],
      "contraindications": [
        "Alergia grave imediata (choque anafilático) prévia a betalactâmicos"
      ],
      "renal_adjustment": "TFG 35–54 mL/min: dose plena a cada 8 horas. TFG 11–34 mL/min: 50% da dose usual a cada 12 horas. TFG < 10 mL/min: 50% da dose usual a cada 18 a 24 horas.",
      "hepatic_adjustment": "Não requer ajuste na disfunção hepática.",
      "adverse_reactions": [
        "Flebite no sítio de infusão venosa",
        "Eosinofilia e febre medicamentosa",
        "Reações alérgicas exantemáticas"
      ],
      "drug_interactions": [
        "Aminoglicosídeos administrados concomitantemente aumentam o potencial de nefrotoxicidade"
      ],
      "pregnancy_category": "Categoria B",
      "pregnancy_text": "Segura na gestação; padrão de profilaxia cirúrgica em cesarianas na indução anestésica.",
      "reviewed_at": "2026-10-30"
    }
  },
  {
    "id": "seed-drug-sulfametoxazol-trimetoprima",
    "name": "Sulfametoxazol + Trimetoprima (Bactrim / Cotrimoxazol)",
    "active_ingredient": "Sulfametoxazol + Trimetoprima",
    "therapeutic_class": "Antimicrobianos",
    "pharmacological_class": "Associação sinérgica de sulfonamida com diaminopirimidina bloqueadora sequencial da síntese de ácido fólico bacteriano",
    "data": {
      "status": "posology_verified",
      "therapeutic_class": "Antimicrobianos · Amplo Espectro e Profilaxia Imunossuprimidos",
      "indication": "Infecção do trato urinário (ITU baixa e prostatite aguda), infecções de pele por MRSA comunitário (CA-MRSA), pneumonia por Pneumocystis jirovecii (PCP/PJP — tratamento e profilaxia em HIV/transplantados), nocardiose e diarreia infecciosa bacteriana.",
      "diseases": [
        "Pneumocistose (PCP/PJP) no HIV",
        "Infecção de Pele por CA-MRSA",
        "Prostatite Bacteriana Aguda",
        "Cistite Aguda Alternativa",
        "Profilaxia em Imunossuprimidos"
      ],
      "products": [
        {
          "name": "Bactrim / Bactrim F / Genérico",
          "type": "Farmácia / Hospitalar",
          "presentation": "Comprimido simples 400/80 mg, Comprimido F 800/160 mg, Suspensão 200/40 mg por 5 mL, Ampola IV 400/80 mg por 5 mL"
        }
      ],
      "formulations": [
        {
          "label": "Comprimidos F 800/160 mg (Uso Oral)",
          "dose_text": "Dose habitual adultos: 1 comprimido F (800 mg SMX + 160 mg TMP) por via oral de 12 em 12 horas por 7 a 14 dias (em ITU baixa: 3 a 5 dias; em infecção cutânea por MRSA: 7 a 10 dias; em prostatite: 14 a 28 dias). Profilaxia de PCP no HIV: 1 comp. F uma vez ao dia ou 3 vezes por semana se CD4 < 200.",
          "interval_text": "A cada 12 horas (ou uma vez ao dia em profilaxia)",
          "route": "Oral (VO)",
          "duration_text": "3 a 14 dias conforme o sítio infeccioso",
          "population": "Adultos e Adolescentes",
          "max_daily_text": "Tratamento de PCP: até 15 a 20 mg/kg/dia de TMP dividido a cada 6 ou 8 horas por 21 dias.",
          "administration": "Ingerir com bastante líquido para prevenir cristalúria.",
          "prescription_type": "Receita de Controle Especial (Antimicrobianos - 2 vias)",
          "cautions": "Monitorar hemograma e eletrólitos: causa Hipercalemia (a trimetoprima atua nos canais epiteliais de sódio renais como o diurético poupador de potássio amilorida!) e elevação isolada da creatinina por bloqueio da secreção tubular sem queda real da TFG.",
          "source_url": "https://consultas.anvisa.gov.br/#/bulario/"
        }
      ],
      "contraindications": [
        "Hipersensibilidade grave a sulfonamidas",
        "Insuficiência hepática grave",
        "Insuficiência renal grave com ClCr < 15 mL/min sem hemodiálise",
        "Deficiência de G6PD (risco de anemia hemolítica aguda)",
        "Primeiro trimestre e final da gestação"
      ],
      "renal_adjustment": "ClCr 15–30 mL/min: reduzir dose em 50% (1 comp. F a cada 24 horas). ClCr < 15 mL/min: não recomendado.",
      "hepatic_adjustment": "Contraindicado em doença hepática parenquimatosa grave.",
      "adverse_reactions": [
        "Hipercalemia significativa",
        "Reações cutâneas graves (Síndrome de Stevens-Johnson e Necrólise Epidérmica Tóxica)",
        "Mielossupressão (leucopenia, anemia megaloblástica por depleção de folato)",
        "Náuseas e vômitos"
      ],
      "drug_interactions": [
        "Interação maior com Varfarina (eleva intensamente o INR por inibição do CYP2C9; risco de hemorragia grave)",
        "Potencializa toxicidade de Metotrexato e hipoglicemiantes orais"
      ],
      "pregnancy_category": "Categoria D (Antagonista do folato)",
      "pregnancy_text": "CONTRAINDICADO no 1º trimestre (risco de defeitos do tubo neural) e no termo/lactação (risco de kernicterus por deslocamento da bilirrubina da albumina).",
      "reviewed_at": "2026-10-30"
    }
  },
  {
    "id": "seed-drug-prednisona",
    "name": "Prednisona e Prednisolona",
    "active_ingredient": "Prednisona / Prednisolona",
    "therapeutic_class": "Corticosteroides Sistêmicos",
    "pharmacological_class": "Glicocorticoide sistêmico sintético anti-inflamatório e imunossupressor de ação intermediária",
    "data": {
      "status": "posology_verified",
      "therapeutic_class": "Corticosteroides · Potente Ação Anti-inflamatória e Imunossupressora",
      "indication": "Crise de asma aguda, exacerbação aguda de DPOC, anafilaxia (prevenção de reação bifásica), artrite reumatoide, lúpus eritematoso sistêmico, paralisia facial de Bell, gota aguda e doenças autoimunes.",
      "diseases": [
        "Crise Asmática Aguda",
        "Exacerbação de DPOC",
        "Paralisia Facial Periférica (Bell)",
        "Gota Aguda",
        "Doenças Autoimunes / LES"
      ],
      "products": [
        {
          "name": "Meticorten / Prelone / Genérico",
          "type": "Farmácia",
          "presentation": "Prednisona Comprimidos 5 mg e 20 mg; Prednisolona Solução oral 3 mg/mL e 1 mg/mL"
        }
      ],
      "formulations": [
        {
          "label": "Prednisona Comprimidos 5 mg e 20 mg (Adultos)",
          "dose_text": "Crise de Asma / Exacerbação de DPOC: 40 a 50 mg por via oral em dose única matinal por 5 a 7 dias (sem necessidade de desmame se uso < 14 dias). Doenças inflamatórias/autoimunes: 0,5 a 1 mg/kg/dia matinal.",
          "interval_text": "A cada 24 horas (em dose única pela manhã para respeitar o ciclo circadiano do cortisol)",
          "route": "Oral (VO)",
          "duration_text": "5 a 7 dias nas crises respiratórias agudas; doses prolongadas exigem desmame gradual lento para evitar insuficiência adrenal secundária",
          "population": "Adultos",
          "max_daily_text": "Dose máxima de 60 a 80 mg/dia em pulsos orais.",
          "administration": "Tomar pela manhã com alimentos ou após o café da manhã para reduzir dispepsia e insônia.",
          "prescription_type": "Receita simples",
          "cautions": "Uso prolongado (> 2-3 semanas): risco de Síndrome de Cushing iatrogênica, osteoporose, hiperglicemia severa em diabéticos, hipertensão, catarata e imunossupressão com reativação de infecções latentes (tuberculose, estrongiloidíase).",
          "source_url": "https://consultas.anvisa.gov.br/#/bulario/"
        },
        {
          "label": "Prednisolona Solução oral 3 mg/mL (Pediátrico)",
          "dose_text": "Crise de asma e laringite em pediatria: 1 a 2 mg/kg/dia por via oral (máx 40 a 60 mg/dia) em dose única matinal por 3 a 5 dias.",
          "interval_text": "A cada 24 horas pela manhã",
          "route": "Oral (VO)",
          "duration_text": "3 a 5 dias (curto período sem desmame)",
          "population": "Pediatria",
          "max_daily_text": "Máximo de 60 mg/dia.",
          "administration": "Administrar pela manhã com água ou suco.",
          "prescription_type": "Receita simples",
          "cautions": "Não requer desmame gradual em cursos curtos até 5 a 7 dias.",
          "calculator": {
            "type": "pediatric_weight",
            "min_mg_kg_day": 1,
            "max_mg_kg_day": 2,
            "default_mg_kg_day": 1
          },
          "source_url": "https://consultas.anvisa.gov.br/#/bulario/"
        }
      ],
      "contraindications": [
        "Infecções fúngicas sistêmicas não tratadas",
        "Vacinação recente com vírus vivos atenuados se em dose imunossupressora (> 20 mg/dia por > 14 dias)",
        "Hipersensibilidade conhecida"
      ],
      "renal_adjustment": "Não requer ajuste na disfunção renal.",
      "hepatic_adjustment": "Prednisona é uma pró-droga convertida no fígado em prednisolona; em cirrose hepática descompensada grave, preferir diretamente a Prednisolona.",
      "adverse_reactions": [
        "Hiperglicemia aguda e descompensação do diabetes",
        "Insônia, euforia ou labilidade emocional",
        "Retenção de sódio e água / elevação pressórica",
        "Gastrite e dispepsia"
      ],
      "drug_interactions": [
        "AINEs associados a corticoides aumentam em mais de 4 vezes o risco de úlcera péptica e sangramento digestivo",
        "Anticonvulsivantes (Fenitoína, Carbamazepina) aceleram a depuração do corticoide"
      ],
      "pregnancy_category": "Categoria C",
      "pregnancy_text": "Pode ser utilizado na gestação quando indicado; metabolizado em 90% pela placenta pela enzima 11-beta-HSD2, protegendo o feto.",
      "reviewed_at": "2026-10-30"
    }
  },
  {
    "id": "seed-drug-atropina",
    "name": "Atropina (Sulfato de Atropina)",
    "active_ingredient": "Atropina",
    "therapeutic_class": "Anticolinérgicos e Emergência",
    "pharmacological_class": "Antagonista competitivo muscarínico pós-ganglionar parassimpaticolítico",
    "data": {
      "status": "posology_verified",
      "therapeutic_class": "Emergência · Bradicardia Sintomática e Antídoto Colinérgico",
      "indication": "Bradicardia sinusal sintomática ou bloqueio AV de primeiro e segundo grau Mobitz I com instabilidade hemodinâmica (ACLS), antídoto de primeira linha para intoxicação por organofosforados e carbamatos (síndrome colinérgica) e reversão de bloqueio neuromuscular.",
      "diseases": [
        "Bradicardia Sintomática Instável (ACLS)",
        "Intoxicação por Organofosforados / Carbamatos",
        "Bloqueio AV com Instabilidade",
        "Assistolia / AESP histórica"
      ],
      "products": [
        {
          "name": "Atropina / Genérico",
          "type": "Hospitalar exclusivo",
          "presentation": "Ampola 0,25 mg/1 mL e 0,5 mg/1 mL"
        }
      ],
      "formulations": [
        {
          "label": "Solução injetável 0,5 mg/1 mL (Uso Endovenoso em Emergência)",
          "dose_text": "Bradicardia Sintomática Instável (Protocolo ACLS): 1 mg IV em bolus rápido imediato. Se bradicardia persistir, repetir 1 mg a cada 3 a 5 minutos até a dose cumulativa máxima de 3 mg (bloqueio vagal completo). Intoxicação por Organofosforados: 2 a 4 mg IV em bolus a cada 3 a 5 minutos sem limite de dose até atingir critérios de atropinização (pulmões limpos sem estertores/broncorreia, FC > 80 bpm e PAS > 90 mmHg).",
          "interval_text": "A cada 3 a 5 minutos em bolus na emergência",
          "route": "Endovenoso (IV direto)",
          "duration_text": "Fase aguda de reanimação / estabilização",
          "population": "Adultos e Pediatria hospitalar",
          "max_daily_text": "Bradicardia: 3 mg totais (0,04 mg/kg). Intoxicação colinérgica: sem dose máxima teto (pode exigir dezenas a centenas de miligramas).",
          "administration": "Infundir em bolus IV rápido seguido de flush de 20 mL de SF 0,9%. NUNCA aplicar doses subterapêuticas (< 0,5 mg em adultos) pelo risco paradoxal de bradicardia reflexa por estimulação de receptores muscarínicos centrais pré-sinápticos inibitórios.",
          "prescription_type": "Uso restrito hospitalar",
          "cautions": "Ineficaz em bloqueios infranodais de alto grau (BAV de 2º grau Mobitz II e BAV total de QRS largo) e em corações transplantados (desprovidos de inervação vagal autonômica) — nesses casos preparar Marca-passo Transcutâneo ou infusão de catecolaminas precocemente.",
          "source_url": "https://consultas.anvisa.gov.br/#/bulario/"
        }
      ],
      "contraindications": [
        "Não há contraindicações absolutas em situações de parada iminente ou bradicardia instável ameaçadora à vida"
      ],
      "renal_adjustment": "Não requer ajuste na insuficiência renal.",
      "hepatic_adjustment": "Não requer ajuste de dose.",
      "adverse_reactions": [
        "Taquicardia sinusal extrema e extrassístoles ventriculares",
        "Midríase paralítica e fotofobia intensa",
        "Boca seca, flushing cutâneo e hipertermia anhidrótica",
        "Retenção urinária aguda e delírio anticolinérgico"
      ],
      "drug_interactions": [
        "Efeitos potencializados por outros agentes com atividade anticolinérgica (antidepressivos tricíclicos, anti-histamínicos)"
      ],
      "pregnancy_category": "Categoria C",
      "pregnancy_text": "Usar imediatamente em emergências bradicárdicas maternas.",
      "reviewed_at": "2026-10-30"
    }
  },
  {
    "id": "seed-drug-kcl-19",
    "name": "Cloreto de Potássio 19,1% (KCl 19,1% Injetável)",
    "active_ingredient": "Cloreto de Potássio",
    "therapeutic_class": "Eletrólitos e Reposição Parenteral",
    "pharmacological_class": "Eletrólito concentrado de alta vigilância para reposição parenteral de potássio",
    "data": {
      "status": "posology_verified",
      "therapeutic_class": "Eletrólitos de Alta Vigilância · Reposição de Potássio IV",
      "indication": "Hipocalemia moderada a grave sintomática (K+ < 3,0 mEq/L, arritmias ventriculares, ECG com onda U ou intoxicação digitálica concomitante) e impossibilidade ou falha da reposição por via oral.",
      "diseases": [
        "Hipocalemia Grave (< 3,0 mEq/L)",
        "Cetoacidose Diabética (Reposição de K+)",
        "Arritmias Induzidas por Hipocalemia",
        "Alcalose Metabólica Hipocaliêmica"
      ],
      "products": [
        {
          "name": "Cloreto de Potássio 19,1% / Genérico",
          "type": "Hospitalar exclusivo (Medicamento de Alta Vigilância)",
          "presentation": "Ampola 10 mL (cada 1 mL contém 2,56 mEq de K+ e 2,56 mEq de Cl- = 25,6 mEq por ampola de 10 mL)"
        }
      ],
      "formulations": [
        {
          "label": "Ampola 10 mL a 19,1% (2,56 mEq/mL = 25,6 mEq/ampola) — Diluição Obrigatória",
          "dose_text": "Dose habitual: 1 ampola (10 mL = 25,6 mEq) a 2 ampolas (20 mL = 51,2 mEq) diluídas em 500 mL ou 1.000 mL de solução cristaloide (SF 0,9%). REGRAS DE SEGURANÇA: 1) Acesso Periférico: concentração MÁXIMA de 40 a 60 mEq/L e velocidade de infusão MÁXIMA de 10 mEq/hora (para evitar flebite e queimação venosa intensa). 2) Acesso Venoso Central: concentração de até 80 a 100 mEq/L e velocidade de até 20 mEq/hora sob monitorização eletrocardiográfica contínua em leito monitorizado.",
          "interval_text": "Infusão contínua em bomba de infusão (BIC)",
          "route": "Endovenoso exclusivo por infusão diluída (JAMAIS em bolus!)",
          "duration_text": "Até normalização do potássio sérico (alvo 4,0 a 4,5 mEq/L)",
          "population": "Adultos e Pediatria hospitalar",
          "max_daily_text": "Velocidade máxima: 10 mEq/h periférico e 20 mEq/h central. Dose diária habitual: 40 a 100 mEq/dia.",
          "administration": "NUNCA, SOB NENHUMA HIPÓTESE, ADMINISTRAR KCL CONCENTRADO EM BOLUS DIRETO (provoca parada cardíaca imediata em assistolia por fibrilação ventricular fatal!). Sempre homogeneizar bem a bolsa após adicionar a ampola.",
          "prescription_type": "Uso restrito hospitalar (Exige dupla checagem de enfermagem)",
          "cautions": "SEMPRE checar diurese antes de iniciar: paciente deve ter débito urinário documentado (> 0,5 mL/kg/h) para evitar hipercalemia iatrogênica aguda. Se hipocalemia for refratária, dosar e repor Magnésio (a hipomagnesemia impede a reabsorção renal de K+).",
          "source_url": "https://consultas.anvisa.gov.br/#/bulario/"
        }
      ],
      "contraindications": [
        "Hipercalemia (K+ > 5,0 mEq/L)",
        "Insuficiência renal anúrica ou oligúria grave sem diálise",
        "Administração endovenosa em bolus direto (letal)"
      ],
      "renal_adjustment": "Reduzir doses e monitorar níveis séricos a cada 2 a 4 horas em pacientes com insuficiência renal.",
      "hepatic_adjustment": "Não requer ajuste na disfunção hepática isolada.",
      "adverse_reactions": [
        "Flebite, dor local e esclerose venosa em acesso periférico",
        "Hipercalemia iatrogênica grave com arritmias fatais por superdosagem"
      ],
      "drug_interactions": [
        "Diuréticos poupadores de potássio (Espironolactona) e IECAs/BRAs aumentam expressivamente o risco de hipercalemia"
      ],
      "pregnancy_category": "Categoria C",
      "pregnancy_text": "Uso hospitalar monitorizado seguro para correção de distúrbio eletrolítico materno.",
      "reviewed_at": "2026-10-30"
    }
  },
  {
    "id": "seed-drug-glicose-50",
    "name": "Glicose 50% (G50% Hipertônica Injetável)",
    "active_ingredient": "Glicose Hipertônica",
    "therapeutic_class": "Soluções Eletrolíticas e Nutricionais",
    "pharmacological_class": "Carboidrato simples hiperosmolar de ação parenteral rápida",
    "data": {
      "status": "posology_verified",
      "therapeutic_class": "Emergência Metabólica · Reversão Imediata de Hipoglicemia Grave",
      "indication": "Hipoglicemia grave sintomática com alteração do nível de consciência, coma hipoglicêmico, convulsões por hipoglicemia e componente de solução polarizante (glico-insulina) no tratamento da hipercalemia.",
      "diseases": [
        "Hipoglicemia Grave com Rebaixamento",
        "Coma Hipoglicêmico",
        "Hipercalemia (Solução Polarizante)",
        "Crise Convulsiva Hipoglicêmica"
      ],
      "products": [
        {
          "name": "Glicose 50% / Glicose 25% / Genérico",
          "type": "Hospitalar / SAMU",
          "presentation": "Ampolas de 10 mL e 20 mL (500 mg/mL = 5 g e 10 g de glicose pura por ampola)"
        }
      ],
      "formulations": [
        {
          "label": "Ampolas 10 mL ou 20 mL a 50% (0,5 g/mL) — Uso Endovenoso em Bolus Lento",
          "dose_text": "Hipoglicemia Grave no Adulto: 40 a 50 mL de Glicose 50% IV (equivalente a 4 a 5 ampolas de 10 mL ou 2 ampolas de 20 mL = 20 a 25 g de glicose) infundidos em bolus lento em 3 a 5 minutos por veia calibrosa. Reavaliar glicemia capilar em 15 minutos; se mantiver < 70 mg/dL, repetir 40 a 50 mL. Solução Polarizante na Hipercalemia: 100 mL de G50% (50 g) associados a 10 UI de Insulina Regular em 20 a 30 minutos.",
          "interval_text": "Em bolus imediato; repetir em 15 min se necessário",
          "route": "Endovenoso lento (IV)",
          "duration_text": "Fase aguda de resgate emergencial",
          "population": "Adultos",
          "max_daily_text": "Conforme resposta glicêmica e monitorização capilar.",
          "administration": "Infundir em veia calibrosa de bom fluxo para evitar flebite química. Em pacientes com histórico de alcoolismo crônico ou desnutrição: administrar obrigatoriamente Tiamina (Vitamina B1) 100 mg IV/IM antes da glicose para prevenir Síndrome de Wernicke.",
          "prescription_type": "Uso restrito hospitalar e emergência pré-hospitalar",
          "cautions": "Solução acentuadamente hiperosmolar (~2.775 mOsm/L). Não infundir sem diluição em neonatos ou crianças pequenas (em pediatria utilizar Glicose 10% a 2 a 5 mL/kg para evitar hiperosmolaridade e hemorragia intraventricular).",
          "source_url": "https://consultas.anvisa.gov.br/#/bulario/"
        }
      ],
      "contraindications": [
        "Hiperglicemia prévia significativa",
        "Hemorragia intracraniana ativa (relativa, salvo se hipoglicemia concomitante confirmada)",
        "Desidratação sem reposição prévia de eletrólitos"
      ],
      "renal_adjustment": "Não requer ajuste na fase aguda.",
      "hepatic_adjustment": "Não requer ajuste de dose.",
      "adverse_reactions": [
        "Flebite química e dor no trajeto da veia periférica",
        "Necrose tecidual grave por extravasamento subcutâneo",
        "Hiperglicemia e diurese osmótica reflexa"
      ],
      "drug_interactions": [
        "Incompatível na mesma via com sangue total e soluções que contenham cálcio se houver risco de precipitação"
      ],
      "pregnancy_category": "Categoria C",
      "pregnancy_text": "Indicação mandatória na hipoglicemia materna sintomática.",
      "reviewed_at": "2026-10-30"
    }
  },
  {
    "id": "seed-drug-bicarbonato-84",
    "name": "Bicarbonato de Sódio 8,4% (1 mEq/mL)",
    "active_ingredient": "Bicarbonato de Sódio",
    "therapeutic_class": "Eletrólitos e Reposição Parenteral",
    "pharmacological_class": "Agente alcalinizante sistêmico e urinário",
    "data": {
      "status": "posology_verified",
      "therapeutic_class": "Emergência · Alcalinizante Sistêmico e Cardioprotetor",
      "indication": "Acidose metabólica grave com acidemia crítica (pH < 7,10 ou HCO3 < 6 a 8 mEq/L), hipercalemia grave refratária com acidose associada, intoxicação aguda por antidepressivos tricíclicos (alargamento de QRS > 100 ms) ou bloqueadores de canal de sódio, e alcalinização urinária na rabdomiólise.",
      "diseases": [
        "Acidose Metabólica Grave (pH < 7,10)",
        "Intoxicação por Antidepressivos Tricíclicos (QRS largo)",
        "Hipercalemia Grave Refratária",
        "Rabdomiólise com Mioglobinúria"
      ],
      "products": [
        {
          "name": "Bicarbonato de Sódio 8,4% / Genérico",
          "type": "Hospitalar exclusivo",
          "presentation": "Ampola 10 mL e Frasco 250 mL (1 mL contém 1 mEq de Na+ e 1 mEq de HCO3- = 84 mg/mL)"
        }
      ],
      "formulations": [
        {
          "label": "Ampolas 10 mL e Frascos 250 mL a 8,4% (1 mEq/mL) — Uso Endovenoso",
          "dose_text": "Intoxicação por Antidepressivos Tricíclicos (QRS > 100 ms ou arritmia): 1 a 2 mEq/kg (1 a 2 mL/kg da solução 8,4%) em bolus IV rápido em 2 a 3 minutos; repetir a cada 3 a 5 min até estreitamento do QRS e manter infusão contínua em BIC para alvo de pH sérico entre 7,50 e 7,55. Acidose Metabólica Crítica (pH < 7,10): 50 a 100 mEq (50 a 100 mL de 8,4%) diluídos em 250 mL de SG 5% ou água destilada infundidos em 30 a 60 minutos, com gasometria de controle seriado.",
          "interval_text": "Conforme gasometria e largura do QRS",
          "route": "Endovenoso (IV)",
          "duration_text": "Até reversão da acidemia crítica ou toxicidade elétrica",
          "population": "Adultos e Pediatria hospitalar",
          "max_daily_text": "Titular por gasometria arterial seriada para evitar alcalemia grave (pH > 7,55).",
          "administration": "Solução hiperosmolar (~2.000 mOsm/L). Preferir diluição em SG 5% ou água estéril para infusão ou administrar via cateter venoso central quando em concentração plena 8,4%.",
          "prescription_type": "Uso restrito hospitalar",
          "cautions": "A infusão de bicarbonato gera CO2 adicional que deve ser eliminado pelos pulmões; em pacientes com hipoventilação ou sem suporte ventilatório adequado, pode precipitar acidose hipercápnica e acidose liquórica paradoxal no SNC. Provoca hipocalcemia iônica aguda por aumento da ligação do cálcio à albumina.",
          "source_url": "https://consultas.anvisa.gov.br/#/bulario/"
        }
      ],
      "contraindications": [
        "Alcalose metabólica ou respiratória",
        "Hipocalcemia grave sintomática não corrigida",
        "Hipernatremia grave"
      ],
      "renal_adjustment": "Usar com extrema cautela em nefropatas anúricos pelo alto aporte de sódio e risco de edema agudo de pulmão.",
      "hepatic_adjustment": "Não requer ajuste na disfunção hepática.",
      "adverse_reactions": [
        "Alcalose metabólica e hipocalemia por shift intracelular",
        "Hipocalcemia iônica aguda com tetania ou convulsões",
        "Hipernatremia e hiperosmolaridade com sobrecarga de volume"
      ],
      "drug_interactions": [
        "INCOMPATÍVEL EM Y ABSOLUTO com sais de cálcio (precipita carbonato de cálcio insolúvel!), catecolaminas (noradrenalina e adrenalina sofrem inativação em pH alcalino) e amiodarona"
      ],
      "pregnancy_category": "Categoria C",
      "pregnancy_text": "Uso hospitalar de emergência para correção de acidose crítica materna.",
      "reviewed_at": "2026-10-30"
    }
  }
];
})();
