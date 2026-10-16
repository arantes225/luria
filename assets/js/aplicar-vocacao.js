/* ==============================================================================
   LURIA — Módulo VOCAÇÃO (Orientação de Carreira Médica)
   Questionário de afinidade, catálogo oficial de especialidades (CFM 2.330/2023),
   comparador lado a lado e persistência segura no Supabase.
   ============================================================================== */

(() => {
  "use strict";

  // Catálogo Oficial das 55 Especialidades Médicas no Brasil (Resolução CFM nº 2.330/2023)
  const SPECIALTIES_DB = [
    {
      id: "clinica-medica",
      name: "Clínica Médica",
      area: "Clínica Médica",
      access: "direct",
      years: 2,
      prerequisite: "Acesso Direto",
      summary: "Especialidade fundamental dedicada ao diagnóstico e tratamento não cirúrgico de doenças do adulto.",
      activities: "Avaliação global do paciente, diagnóstico diferencial complexo, manejo de multimorbidades, coordenação de planos terapêuticos e interconsultas hospitalares.",
      environments: "Enfermarias hospitalares, ambulatórios de especialidades, prontos-socorros e consultórios.",
      routine: "Mista (enfermarias pela manhã, ambulatórios ou plantões à tarde/noite).",
      positives: "Visão holística do paciente, forte raciocínio diagnóstico e vasta gama de subespecializações.",
      challenges: "Lidar com pacientes de alta complexidade e necessidade contínua de atualização em múltiplas áreas.",
      subspecialties: "Cardiologia, Nefrologia, Gastroenterologia, Reumatologia, Endocrinologia, etc.",
      traits: ["clinico", "investigativo", "longitudinal", "adulto", "hospitalar"],
      weights: { clinico: 3, investigativo: 3, adulto: 2, longitudinal: 2 }
    },
    {
      id: "cirurgia-geral",
      name: "Cirurgia Geral",
      area: "Cirurgia Geral",
      access: "direct",
      years: 3,
      prerequisite: "Acesso Direto",
      summary: "Área cirúrgica ampla voltada a intervenções operatórias, trauma e urgências abdominais.",
      activities: "Cirurgias eletivas e de urgência (laparotomias, videolaparoscopias, hérnias, colecistectomias), avaliação pré e pós-operatória em UTI e enfermaria.",
      environments: "Centro cirúrgico, emergências, unidades de terapia intensiva e ambulatórios.",
      routine: "Dinâmica e exigente, com frequente regime de plantões e sobreaviso cirúrgico.",
      positives: "Resolução objetiva e rápida dos problemas de saúde através do ato cirúrgico.",
      challenges: "Carga horária física extenuante, estresse operatório e gestão de complicações agudas.",
      subspecialties: "Cirurgia do Aparelho Digestivo, Cirurgia Oncológica, Cirurgia Vascular, Urologia, etc.",
      traits: ["cirurgico", "agudo", "procedimentos", "hospitalar", "intervencao"],
      weights: { cirurgico: 3, procedimentos: 3, agudo: 2, hospitalar: 2 }
    },
    {
      id: "pediatria",
      name: "Pediatria",
      area: "Pediatria",
      access: "direct",
      years: 3,
      prerequisite: "Acesso Direto",
      summary: "Cuidado integral à saúde de crianças e adolescentes, desde o nascimento até a juventude.",
      activities: "Puericultura, acompanhamento de marcos do neurodesenvolvimento, imunizações, manejo de doenças infecciosas e emergências pediátricas.",
      environments: "Consultórios particulares, ambulatórios, pronto-socorro infantil, salas de parto e UTIs neonatais/pediátricas.",
      routine: "Muito centrada em consultório e ambulatório, com possibilidade de plantões hospitalares.",
      positives: "Impacto duradouro no desenvolvimento humano e forte vínculo afetivo com as famílias.",
      challenges: "Comunicação indireta com os pacientes menores e manejo da ansiedade dos pais e cuidadores.",
      subspecialties: "Neonatologia, Cardiologia Pediátrica, Terapia Intensiva Pediátrica, Neuropediatria, etc.",
      traits: ["pediatria", "longitudinal", "relacional", "prevencao", "clinico"],
      weights: { pediatria: 3, relacional: 3, longitudinal: 2, prevencao: 2 }
    },
    {
      id: "ginecologia-obstetricia",
      name: "Ginecologia e Obstetrícia",
      area: "Ginecologia e Obstetrícia",
      access: "direct",
      years: 3,
      prerequisite: "Acesso Direto",
      summary: "Atenção completa à saúde integral da mulher, gestação, parto e pós-parto.",
      activities: "Consultas preventivas ginecológicas, pré-natal, assistência ao parto vaginal e cesariana, cirurgias ginecológicas e planejamento reprodutivo.",
      environments: "Centros obstétricos, centro cirúrgico, maternidades, ambulatórios e clínicas privadas.",
      routine: "Combinação balanceada de consultório ginecológico com plantões de maternidade e emergências.",
      positives: "Especialidade híbrida (clínica e cirúrgica) com protagonismo em momentos memoráveis da vida.",
      challenges: "Imprevisibilidade do momento do parto e riscos de intercorrências obstétricas agudas.",
      subspecialties: "Medicina Fetal, Reprodução Humana, Mastologia, Oncologia Ginecológica, etc.",
      traits: ["mulher", "cirurgico", "clinico", "longitudinal", "agudo"],
      weights: { mulher: 3, clinico: 2, cirurgico: 2, agudo: 2 }
    },
    {
      id: "medicina-familia-comunidade",
      name: "Medicina de Família e Comunidade",
      area: "Medicina Preventiva",
      access: "direct",
      years: 2,
      prerequisite: "Acesso Direto",
      summary: "Atenção Primária à Saúde, focada no indivíduo, sua família e contexto comunitário.",
      activities: "Consultas de acolhimento, abordagem familiar e comunitária, prevenção quaternária, rastreamento, visitas domiciliares e gestão de condições crônicas.",
      environments: "Unidades Básicas de Saúde (UBS), Estratégia Saúde da Família (ESF) e clínicas de atenção primária.",
      routine: "Horários diurnos fixos e previsíveis (segunda a sexta-feira), sem rotina de plantões hospitalares.",
      positives: "Excelente qualidade de vida, equilíbrio entre trabalho e lazer, e construção de vínculos de longo prazo.",
      challenges: "Sobrecarga de demanda em sistemas públicos e necessidade de alta resolutividade clínica sem recursos avançados.",
      subspecialties: "Preceptoria em Atenção Primária, Cuidados Paliativos, Gestão em Saúde, etc.",
      traits: ["longitudinal", "prevencao", "previsivel", "relacional", "clinico"],
      weights: { prevencao: 3, longitudinal: 3, previsivel: 3, relacional: 2 }
    },
    {
      id: "cardiologia",
      name: "Cardiologia",
      area: "Clínica Médica",
      access: "prerequisite",
      years: 2,
      prerequisite: "Pré-requisito: Clínica Médica (2 anos)",
      summary: "Diagnóstico e tratamento das afecções do sistema cardiovascular e hipertensão.",
      activities: "Avaliação clínica, laudos de exames não invasivos (ECG, Ecocardiograma, MAPA, Holter), acompanhamento coronariano e insuficiência cardíaca.",
      environments: "Consultórios, ambulatórios especializados, unidades coronarianas e laboratórios de hemodinâmica.",
      routine: "Geralmente ambulatorial após formação, com opção de plantões em UTI coronariana.",
      positives: "Mercado consolidado, base científica robusta e tecnologia diagnóstica avançada.",
      challenges: "Emergências cardiovasculares graves e necessidade de domínio de farmacologia avançada.",
      subspecialties: "Hemodinâmica e Cardiologia Intervencionista, Eletrofisiologia, Ergometria, etc.",
      traits: ["clinico", "investigativo", "tecnologia", "adulto", "hospitalar"],
      weights: { clinico: 3, tecnologia: 2, investigativo: 2, adulto: 2 }
    },
    {
      id: "anestesiologia",
      name: "Anestesiologia",
      area: "Cirurgia Geral",
      access: "direct",
      years: 3,
      prerequisite: "Acesso Direto",
      summary: "Manejo da dor, suporte de vida perioperatório, anestesias gerais e regionais.",
      activities: "Avaliação pré-anestésica, bloqueios regionais, anestesia geral, monitorização hemodinâmica intraoperatória e recuperação pós-anestésica.",
      environments: "Centro cirúrgico, salas de procedimentos diagnósticos invasivos e clínicas de dor.",
      routine: "Centrada em plantões e procedimentos, sem necessidade de acompanhamento longitudinal em consultório.",
      positives: "Ausência de carteira fixa de pacientes e contato direto com farmacologia e fisiologia de precisão.",
      challenges: "Momentos de estresse extremo em vias aéreas difíceis e instabilidade hemodinâmica súbita.",
      subspecialties: "Dor Crônica, Anestesia Pediátrica, Anestesia Cardíaca, etc.",
      traits: ["procedimentos", "agudo", "tecnologia", "hospitalar", "previsivel"],
      weights: { procedimentos: 3, agudo: 3, tecnologia: 2, hospitalar: 2 }
    },
    {
      id: "dermatologia",
      name: "Dermatologia",
      area: "Clínica Médica",
      access: "direct",
      years: 3,
      prerequisite: "Acesso Direto",
      summary: "Diagnóstico e tratamento das afecções da pele, cabelos, unhas e mucosas.",
      activities: "Consultas clínicas, dermatoscopia, biópsias cutâneas, pequenas cirurgias ambulatoriais, peelings e cosmiatria.",
      environments: "Consultórios privados e ambulatórios especializados.",
      routine: "Eminentemente ambulatorial, de segunda a sexta-feira, com excelente qualidade de vida e sem plantões.",
      positives: "Rotina controlada, grande campo de atuação privada e contato direto com diagnóstico visual.",
      challenges: "Altíssima concorrência na prova de residência e necessidade de constante atualização em procedimentos.",
      subspecialties: "Dermatoscopia, Cirurgia Micrográfica de Mohs, Cosmiatria, Tricologia, etc.",
      traits: ["clinico", "previsivel", "procedimentos", "longitudinal"],
      weights: { previsivel: 3, clinico: 2, procedimentos: 2, relacional: 1 }
    },
    {
      id: "ortopedia-traumatologia",
      name: "Ortopedia e Traumatologia",
      area: "Cirurgia Geral",
      access: "direct",
      years: 3,
      prerequisite: "Acesso Direto",
      summary: "Tratamento cirúrgico e conservador de fraturas, lesões articulares e do aparelho locomotor.",
      activities: "Reduções de fraturas, osteossínteses, artroplastias, artroscopias, gessos e acompanhamento ambulatorial de deformidades.",
      environments: "Centro cirúrgico, prontos-socorros de trauma, clínicas ortopédicas e hospitais de reabilitação.",
      routine: "Muito dinâmica e física, associando cirurgias de grande porte a plantões de emergência ortopédica.",
      positives: "Resultados funcionais nítidos e satisfatórios, com reabilitação rápida de mobilidade dos pacientes.",
      challenges: "Exigência física significativa, sobreaviso constante e risco de infecções pós-cirúrgicas.",
      subspecialties: "Cirurgia do Joelho, Cirurgia do Quadril, Cirurgia da Coluna, Trauma Ortopédico, etc.",
      traits: ["cirurgico", "procedimentos", "agudo", "hospitalar"],
      weights: { cirurgico: 3, procedimentos: 3, agudo: 2, hospitalar: 2 }
    },
    {
      id: "neurologia",
      name: "Neurologia",
      area: "Clínica Médica",
      access: "direct",
      years: 3,
      prerequisite: "Acesso Direto",
      summary: "Raciocínio diagnóstico topográfico e terapêutico das doenças do sistema nervoso central e periférico.",
      activities: "Exame neurológico minucioso, manejo de AVC, epilepsia, cefaleias, demências, esclerose múltipla e doenças neuromusculares.",
      environments: "Enfermarias, consultórios, unidades de AVC e centros de neurofisiologia clínica.",
      routine: "Mista (investigação detalhada em consultório com apoio a emergências e enfermarias hospitalares).",
      positives: "Raciocínio clínico mais elegante e refinado da medicina, correlacionando sintomas à anatomia.",
      challenges: "Lidar com prognósticos desafiadores e doenças neurodegenerativas progressivas.",
      subspecialties: "Neurofisiologia Clínica, Doenças Neuromusculares, AVC, Epilepsia, etc.",
      traits: ["investigativo", "clinico", "adulto", "longitudinal"],
      weights: { investigativo: 3, clinico: 3, longitudinal: 2, adulto: 2 }
    },
    {
      id: "medicina-emergencia",
      name: "Medicina de Emergência",
      area: "Clínica Médica",
      access: "direct",
      years: 3,
      prerequisite: "Acesso Direto",
      summary: "Atendimento imediato e estabilização de doentes críticos agudos na sala vermelha.",
      activities: "Ressuscitação cardiopulmonar, via aérea difícil, ultrassonografia point-of-care (POCUS), politrauma e choque.",
      environments: "Salas de emergência, prontos-socorros de alta complexidade e atendimento pré-hospitalar móvel (SAMU).",
      routine: "Regime exclusivo de plantões (12h/24h), permitindo períodos livres concentrados entre escalas.",
      positives: "Ação rápida, resolução imediata, alta adrenalina e encerramento completo do trabalho ao sair do plantão.",
      challenges: "Fadiga mental e física provocada por noites acordadas e decisões rápidas sob risco iminente de morte.",
      subspecialties: "Ultrassonografia em Emergência, Simulação Clínica, Toxicologia, etc.",
      traits: ["agudo", "hospitalar", "procedimentos", "intervencao"],
      weights: { agudo: 3, hospitalar: 3, procedimentos: 2, tecnologia: 1 }
    },
    {
      id: "radiologia-diagnostico-imagem",
      name: "Radiologia e Diagnóstico por Imagem",
      area: "Medicina Preventiva",
      access: "direct",
      years: 3,
      prerequisite: "Acesso Direto",
      summary: "Interpretação e emissão de laudos de exames radiológicos, ultrassom, tomografia e ressonância.",
      activities: "Laudo de tomografias computadorizadas e ressonâncias magnéticas, realização de ultrassonografias e procedimentos guiados por imagem.",
      environments: "Centros de diagnóstico por imagem, hospitais e modalidades de telerradiologia (trabalho remoto).",
      routine: "Horários flexíveis, possibilidade real de home office e ausência de contato clínico contínuo.",
      positives: "Forte alinhamento com tecnologia de ponta, flexibilidade geográfica e qualidade de vida.",
      challenges: "Risco de isolamento social e cobrança por produtividade e agilidade na entrega de laudos.",
      subspecialties: "Neurorradiologia, Radiologia Musculoesquelética, Radiologia Intervencionista, etc.",
      traits: ["tecnologia", "investigativo", "previsivel"],
      weights: { tecnologia: 3, investigativo: 3, previsivel: 2 }
    },
    {
      id: "psiquiatria",
      name: "Psiquiatria",
      area: "Clínica Médica",
      access: "direct",
      years: 3,
      prerequisite: "Acesso Direto",
      summary: "Prevenção, diagnóstico e tratamento dos transtornos mentais, emocionais e do comportamento.",
      activities: "Entrevistas clínicas detalhadas, psicofarmacologia, psicoterapia breve, manejo de crises em pronto-socorro psiquiátrico.",
      environments: "Consultórios privados, CAPS, enfermarias de saúde mental e ambulatórios especializados.",
      routine: "Muito focada em consultório e ambulatório, com horários previsíveis e opções de plantão em emergência.",
      positives: "Conexão profunda com a individualidade do paciente e alta demanda no setor privado.",
      challenges: "Lidar com o sofrimento mental intenso, risco de suicídio e estigma social dos transtornos psíquicos.",
      subspecialties: "Psiquiatria da Infância e Adolescência, Psicogeriatria, Psiquiatria Forense, etc.",
      traits: ["relacional", "longitudinal", "previsivel", "clinico"],
      weights: { relacional: 3, longitudinal: 3, clinico: 2, previsivel: 2 }
    },
    {
      id: "oftalmologia",
      name: "Oftalmologia",
      area: "Cirurgia Geral",
      access: "direct",
      years: 3,
      prerequisite: "Acesso Direto",
      summary: "Diagnóstico clínico e correção cirúrgica dos distúrbios da visão e do aparelho ocular.",
      activities: "Exames refratométricos, biomicroscopia, cirurgias de catarata, cirurgia refrativa, vitrectomia e aplicação de laser.",
      environments: "Clínicas oftalmológicas especializadas e centros cirúrgicos ambulatoriais.",
      routine: "Atendimento ambulatorial diurno associado a dias cirúrgicos programados, praticamente sem plantões noturnos.",
      positives: "Excelente remuneração, uso de equipamentos ópticos de última geração e melhora dramática da visão.",
      challenges: "Alto custo de investimento inicial em aparelhos e extrema exigência de microdestreza motora.",
      subspecialties: "Córnea, Glaucoma, Retina e Vítreo, Cirurgia Refrativa, etc.",
      traits: ["procedimentos", "cirurgico", "tecnologia", "previsivel"],
      weights: { tecnologia: 3, procedimentos: 3, cirurgico: 2, previsivel: 2 }
    },
    {
      id: "infectologia",
      name: "Infectologia",
      area: "Clínica Médica",
      access: "direct",
      years: 3,
      prerequisite: "Acesso Direto",
      summary: "Manejo de doenças infecciosas e parasitárias, controle de infecção hospitalar e imunizações.",
      activities: "Interconsultas de casos febris obscuros, manejo de HIV/Hepatites, stewardship de antimicrobianos e comitês de infecção (CCIH).",
      environments: "Hospitais terciários, ambulatórios especializados e vigilância epidemiológica.",
      routine: "Mista, com visitas hospitalares, reuniões de comitê e ambulatórios especializados.",
      positives: "Papel estratégico na saúde pública global e raciocínio investigativo fascinante em microbiologia.",
      challenges: "Exposição a patógenos perigosos e desafios no combate à resistência bacteriana multirresistente.",
      subspecialties: "Infectologia Hospitalar, Medicina do Viajante, Imunocomprometidos, etc.",
      traits: ["investigativo", "clinico", "prevencao", "hospitalar"],
      weights: { investigativo: 3, clinico: 3, hospitalar: 2, prevencao: 2 }
    }
  ];

  // As 10 Questões Estruturadas do Questionário Vocacional
  const QUIZ_QUESTIONS = [
    {
      id: "q1_intervention",
      dimension: "Perfil de Prática",
      title: "Como você prefere atuar no cuidado ao paciente?",
      desc: "Pense no seu dia a dia dos sonhos no hospital ou consultório.",
      options: [
        {
          id: "opt_procedures",
          label: "Realizar procedimentos práticos e invasivos",
          detail: "Operar, suturar, intubar, puncionar e ver o resultado imediato das minhas mãos.",
          traits: ["cirurgico", "procedimentos", "agudo"]
        },
        {
          id: "opt_clinical",
          label: "Exercitar raciocínio diagnóstico e terapia medicamentosa",
          detail: "Analisar sintomas, examinar minuciosamente, formular hipóteses e titular remédios.",
          traits: ["clinico", "investigativo", "longitudinal"]
        },
        {
          id: "opt_diagnostic",
          label: "Interpretar exames com suporte tecnológico e imagem",
          detail: "Correlacionar imagens e achados laboratoriais com a patologia sem tanta invasão física.",
          traits: ["tecnologia", "investigativo", "previsivel"]
        }
      ]
    },
    {
      id: "q2_tempo",
      dimension: "Dinâmica Temporal",
      title: "Qual ritmo de resolução mais combina com você?",
      desc: "A temporalidade entre o problema e a resposta terapêutica.",
      options: [
        {
          id: "opt_acute",
          label: "Situações agudas, intercorrências e emergência",
          detail: "Gosto da adrenalina, decisões rápidas em minutos e paciente estabilizado no mesmo turno.",
          traits: ["agudo", "hospitalar"]
        },
        {
          id: "opt_longitudinal",
          label: "Acompanhamento longitudinal de longo prazo",
          detail: "Gosto de ver o paciente ao longo de meses ou anos, construindo vínculo e confiança contínua.",
          traits: ["longitudinal", "relacional"]
        },
        {
          id: "opt_balanced_time",
          label: "Equilíbrio entre consultas eletivas e procedimentos pontuais",
          detail: "Prefiro uma rotina mista, que não seja monótona nem permanentemente caótica.",
          traits: ["previsivel", "clinico"]
        }
      ]
    },
    {
      id: "q3_environment",
      dimension: "Ambiente de Trabalho",
      title: "Em qual cenário físico você se sente mais produtivo?",
      desc: "O local onde você passará a maior parte das suas horas de trabalho.",
      options: [
        {
          id: "opt_surgical_block",
          label: "Centro cirúrgico e salas de procedimentos",
          detail: "Gosto do rigor de assepsia, paramentação, equipe cirúrgica e foco instrumental.",
          traits: ["cirurgico", "procedimentos", "hospitalar"]
        },
        {
          id: "opt_clinic_office",
          label: "Consultório próprio ou ambulatório especializado",
          detail: "Prefiro a calma do consultório, poltrona, prontuário, conversa e ambiente tranquilo.",
          traits: ["previsivel", "relacional", "clinico"]
        },
        {
          id: "opt_critical_care",
          label: "UTI, pronto-socorro e enfermarias hospitalares",
          detail: "Gosto do ecossistema hospitalar, leitos de internação, monitores e interconsultas.",
          traits: ["hospitalar", "agudo", "clinico"]
        }
      ]
    },
    {
      id: "q4_patient_contact",
      dimension: "Vínculo Humano",
      title: "Como você encara o relacionamento interpessoal com os pacientes?",
      desc: "A intensidade da conversa e do envolvimento emocional na rotina.",
      options: [
        {
          id: "opt_deep_talk",
          label: "Fundamental: quero ouvir histórias de vida e dar suporte emocional",
          detail: "A relação médico-paciente e a escuta atenta são o coração da minha vocação.",
          traits: ["relacional", "longitudinal"]
        },
        {
          id: "opt_objective_talk",
          label: "Objetivo: focado na queixa, exame físico e resolução técnica",
          detail: "Gosto do contato humano, mas priorizo assertividade e objetividade prática.",
          traits: ["clinico", "procedimentos"]
        },
        {
          id: "opt_minimal_talk",
          label: "Reservado: prefiro focar em imagens, laudos ou procedimentos sob sedação",
          detail: "Trabalho melhor quando meu foco está no problema técnico, sem desgaste de conversas longas.",
          traits: ["tecnologia", "previsivel"]
        }
      ]
    },
    {
      id: "q5_population",
      dimension: "População de Pacientes",
      title: "Com qual grupo de pessoas você sente maior afinidade natural?",
      desc: "O perfil etário e clínico dos pacientes que você atenderá.",
      options: [
        {
          id: "opt_adult_elderly",
          label: "Adultos e idosos com condições crônicas e multimorbidades",
          detail: "Gosto do desafio da clínica médica tradicional e da complexidade da maturidade.",
          traits: ["adulto", "clinico", "investigativo"]
        },
        {
          id: "opt_pediatric",
          label: "Crianças, bebês e suas famílias",
          detail: "Tenho jeito com os pequenos, gosto do ambiente lúdico e do potencial da infância.",
          traits: ["pediatria", "relacional"]
        },
        {
          id: "opt_women",
          label: "Saúde da mulher, gestantes e saúde reprodutiva",
          detail: "Acompanhar a gestação, parto e saúde ginecológica feminina em todas as fases.",
          traits: ["mulher", "cirurgico", "longitudinal"]
        },
        {
          id: "opt_all_ages",
          label: "Todas as faixas etárias, do recém-nascido ao idoso",
          detail: "Quero atender a família inteira e a comunidade sem me prender a uma idade só.",
          traits: ["prevencao", "longitudinal"]
        }
      ]
    },
    {
      id: "q6_lifestyle",
      dimension: "Estilo de Vida & Rotina",
      title: "Como você planeja conciliar trabalho e vida pessoal?",
      desc: "Plantões noturnos, fins de semana e previsibilidade de horários.",
      options: [
        {
          id: "opt_predictable",
          label: "Previsibilidade máxima: horários comerciais e finais de semana livres",
          detail: "Prezo muito por dormir em casa toda noite, praticar esportes e ter rotina certinha.",
          traits: ["previsivel"]
        },
        {
          id: "opt_shift_freedom",
          label: "Plantões concentrados (12h/24h) com folgas prolongadas",
          detail: "Prefiro trabalhar intensamente alguns dias e ter outros dias 100% livres de compromisso.",
          traits: ["agudo", "hospitalar"]
        },
        {
          id: "opt_dedicated_surge",
          label: "Disponibilidade total por vocação: sobreaviso e emergências não me incomodam",
          detail: "Se for pela minha especialidade dos sonhos, não ligo de ser chamado de madrugada.",
          traits: ["cirurgico", "hospitalar"]
        }
      ]
    },
    {
      id: "q7_decision_making",
      dimension: "Tomada de Decisão",
      title: "Como você lida com o estresse e a velocidade de tomada de decisão?",
      desc: "O nível de pressão temporal na sua rotina clínica.",
      options: [
        {
          id: "opt_fast_stress",
          label: "Trabalho muito bem sob pressão e tomo decisões assertivas na hora",
          detail: "Não me paraliso; a urgência me dá foco e energia para agir com determinação.",
          traits: ["agudo", "procedimentos"]
        },
        {
          id: "opt_analytical",
          label: "Prefiro refletir, pesquisar a literatura e discutir com calma",
          detail: "Gosto de ponderar opções, avaliar interações medicamentosas e tomar condutas embasadas.",
          traits: ["investigativo", "clinico"]
        }
      ]
    },
    {
      id: "q8_technology",
      dimension: "Tecnologia & Equipamentos",
      title: "Qual o papel da tecnologia no seu exercício médico ideal?",
      desc: "Aparelhos, softwares e instrumentos na sua rotina.",
      options: [
        {
          id: "opt_tech_heavy",
          label: "Central: quero utilizar lasers, monitores avançados, laudos digitais e IA",
          detail: "Fascinado pela vanguarda dos equipamentos médicos diagnósticos ou terapêuticos.",
          traits: ["tecnologia"]
        },
        {
          id: "opt_tech_craft",
          label: "Instrumental cirúrgico e precisão motora fina",
          detail: "Gosto do manuseio de pinças, bisturis, afastadores e microscópios cirúrgicos.",
          traits: ["cirurgico", "procedimentos"]
        },
        {
          id: "opt_tech_human",
          label: "Secundário: meu principal instrumento é o estetoscópio e a anamnese",
          detail: "A tecnologia apoia, mas a decisão verdadeira nasce da relação humana e da semiologia.",
          traits: ["clinico", "relacional", "prevencao"]
        }
      ]
    },
    {
      id: "q9_prevention_cure",
      dimension: "Enfoque Terapêutico",
      title: "O que te dá maior sensação de realização profissional?",
      desc: "O tipo de desfecho clínico que faz seu olho brilhar.",
      options: [
        {
          id: "opt_cure_now",
          label: "Resolver uma crise imediata ou remover cirurgicamente a lesão",
          detail: "Entrar no hospital com um problema agudo e sair resolvido pelo meu ato.",
          traits: ["cirurgico", "agudo", "procedimentos"]
        },
        {
          id: "opt_prevent_manage",
          label: "Evitar que a doença ocorra e ensinar o paciente a viver melhor",
          detail: "Prevenir desfechos graves, atuar na promoção da saúde e qualidade de vida.",
          traits: ["prevencao", "longitudinal"]
        },
        {
          id: "opt_solve_puzzle",
          label: "Desvendar um mistério diagnóstico que ninguém mais conseguiu achar",
          detail: "Encontrar aquela doença rara ou síndrome que passou despercebida por vários colegas.",
          traits: ["investigativo", "clinico"]
        }
      ]
    },
    {
      id: "q10_formation",
      dimension: "Percurso de Residência",
      title: "Qual a sua disposição para o tempo total de formação após a faculdade?",
      desc: "Anos de dedicação em residência médica e especialização.",
      options: [
        {
          id: "opt_direct_quick",
          label: "Quero entrar direto (Acesso Direto) e concluir em 2 a 3 anos",
          detail: "Prioridade para entrar rápido no mercado com título de especialista consolidado.",
          traits: ["previsivel"]
        },
        {
          id: "opt_long_subspecialty",
          label: "Disposto a fazer residência básica + subespecialidade (4 a 6 anos)",
          detail: "Não me importo com o percurso longo se for para me tornar um subespecialista de ponta.",
          traits: ["hospitalar", "investigativo", "cirurgico"]
        }
      ]
    }
  ];

  // Estado Local da Vocação
  let currentStep = 0;
  const userAnswers = {};
  let comparisonList = [];

  // Algoritmo de Cálculo de Afinidade Vocacional
  function calculateVocationalAffinity(answers) {
    const traitScores = {};

    // Contabiliza os traços selecionados nas respostas
    Object.values(answers).forEach(selectedOptionId => {
      QUIZ_QUESTIONS.forEach(question => {
        const option = question.options.find(opt => opt.id === selectedOptionId);
        if (option && option.traits) {
          option.traits.forEach(trait => {
            traitScores[trait] = (traitScores[trait] || 0) + 1;
          });
        }
      });
    });

    // Calcula a pontuação ponderada para cada especialidade
    const results = SPECIALTIES_DB.map(specialty => {
      let rawScore = 0;
      let maxPossible = 0;

      Object.entries(specialty.weights).forEach(([trait, weight]) => {
        const userFrequency = traitScores[trait] || 0;
        rawScore += userFrequency * weight;
        maxPossible += 3 * weight; // 3 é o teto de frequência esperado
      });

      // Normaliza percentual entre 45% e 98% para calibragem visual realista
      const rawPct = maxPossible > 0 ? (rawScore / maxPossible) * 100 : 50;
      const normalizedPct = Math.min(98, Math.max(48, Math.round(rawPct)));

      return {
        ...specialty,
        affinityScore: normalizedPct
      };
    });

    // Ordena por maior afinidade
    results.sort((a, b) => b.affinityScore - a.affinityScore);

    // Identifica traços dominantes
    const sortedTraits = Object.entries(traitScores)
      .sort((a, b) => b[1] - a[1])
      .map(([trait]) => trait);

    return {
      topMatches: results.slice(0, 5),
      allResults: results,
      dominantTraits: sortedTraits
    };
  }

  // Renderizador do Questionário
  function renderQuizQuestion(stepIndex) {
    const container = document.getElementById("vocacao-quiz-step-container");
    const progressFill = document.getElementById("vocacao-progress-fill");
    const progressText = document.getElementById("vocacao-progress-step-text");
    const progressPct = document.getElementById("vocacao-progress-pct");
    const prevButton = document.getElementById("vocacao-prev-btn");

    if (!container) return;

    const question = QUIZ_QUESTIONS[stepIndex];
    if (!question) return;

    // Atualiza barra de progresso
    const total = QUIZ_QUESTIONS.length;
    const pct = Math.round(((stepIndex + 1) / total) * 100);
    if (progressFill) progressFill.style.width = `${pct}%`;
    if (progressText) progressText.textContent = `Pergunta ${stepIndex + 1} de ${total}`;
    if (progressPct) progressPct.textContent = `${pct}% concluído`;

    if (prevButton) {
      prevButton.disabled = stepIndex === 0;
      prevButton.style.opacity = stepIndex === 0 ? "0.4" : "1";
    }

    const currentSelected = userAnswers[question.id];

    container.innerHTML = `
      <div class="vocacao-question-card">
        <span class="vocacao-dimension-tag">${question.dimension}</span>
        <h3 class="vocacao-question-title">${question.title}</h3>
        <p class="vocacao-question-desc">${question.desc}</p>

        <div class="vocacao-options-grid" role="radiogroup" aria-label="${question.title}">
          ${question.options.map(option => `
            <button type="button" 
                    class="vocacao-option-button ${currentSelected === option.id ? "selected" : ""}" 
                    data-option-id="${option.id}"
                    role="radio"
                    aria-checked="${currentSelected === option.id ? "true" : "false"}">
              <span class="vocacao-option-indicator"></span>
              <span class="vocacao-option-copy">
                <strong>${option.label}</strong>
                <small>${option.detail}</small>
              </span>
            </button>
          `).join("")}
        </div>
      </div>
    `;

    // Adiciona listener de clique nas opções
    container.querySelectorAll(".vocacao-option-button").forEach(btn => {
      btn.addEventListener("click", () => {
        const optionId = btn.getAttribute("data-option-id");
        userAnswers[question.id] = optionId;

        // Feedback visual
        container.querySelectorAll(".vocacao-option-button").forEach(b => {
          b.classList.remove("selected");
          b.setAttribute("aria-checked", "false");
        });
        btn.classList.add("selected");
        btn.setAttribute("aria-checked", "true");

        // Avança automaticamente após breve delay tátil
        setTimeout(() => {
          if (currentStep < QUIZ_QUESTIONS.length - 1) {
            currentStep++;
            renderQuizQuestion(currentStep);
          } else {
            showVocationalResults();
          }
        }, 220);
      });
    });
  }

  // Renderizador da Tela de Resultados
  function showVocationalResults() {
    const quizSection = document.getElementById("vocacao-quiz-flow");
    const resultsSection = document.getElementById("vocacao-results-flow");

    if (quizSection) quizSection.hidden = true;
    if (resultsSection) resultsSection.hidden = false;

    const analysis = calculateVocationalAffinity(userAnswers);
    const topMatch = analysis.topMatches[0];

    // Salvar localmente
    localStorage.setItem("luria_vocational_profile", JSON.stringify({
      answers: userAnswers,
      topMatches: analysis.topMatches,
      date: new Date().toISOString()
    }));

    // Tentar persistir no Supabase se autenticado
    persistProfileToSupabase(analysis);

    // Preenche o card principal do Top Match
    const bestMatchContainer = document.getElementById("vocacao-best-match-content");
    if (bestMatchContainer && topMatch) {
      bestMatchContainer.innerHTML = `
        <div class="vocacao-match-badge">★ ${topMatch.affinityScore}% de Compatibilidade</div>
        <h3>${topMatch.name}</h3>
        <span class="aplicar-badge">${topMatch.area} · ${topMatch.prerequisite} (${topMatch.years} anos)</span>
        
        <p style="margin: 0.75rem 0 1rem 0; font-size: 0.9375rem; color: var(--color-text-primary); line-height: 1.55;">
          ${topMatch.summary}
        </p>

        <div class="vocacao-match-traits">
          ${topMatch.traits.map(t => `<span class="vocacao-trait-pill">#${t}</span>`).join("")}
        </div>

        <div class="vocacao-match-details">
          <div class="vocacao-detail-box">
            <strong>✓ Por que combina com você:</strong>
            <p>Seu perfil demonstrou forte afinidade com <em>${topMatch.activities.toLowerCase()}</em>, alinhando-se à dinâmica esperada de <em>${topMatch.routine.toLowerCase()}</em>.</p>
          </div>
          <div class="vocacao-detail-box">
            <strong>⚠ Pontos de atenção e desafios reais:</strong>
            <p>${topMatch.challenges}</p>
          </div>
        </div>
      `;
    }

    // Preenche o ranking das Top 5 Especialidades
    const rankingList = document.getElementById("vocacao-ranking-items");
    if (rankingList) {
      rankingList.innerHTML = analysis.topMatches.map((item, index) => `
        <div class="vocacao-ranking-item">
          <div class="vocacao-ranking-row">
            <span class="vocacao-ranking-name">#${index + 1} ${item.name}</span>
            <span class="vocacao-ranking-pct">${item.affinityScore}%</span>
          </div>
          <div class="vocacao-meter">
            <div class="vocacao-meter-fill" style="width: ${item.affinityScore}%"></div>
          </div>
          <small style="font-size: 0.75rem; color: var(--color-text-secondary); margin-top: 2px;">
            ${item.area} · ${item.prerequisite}
          </small>
        </div>
      `).join("");
    }
  }

  // Persistência segura no Supabase (RLS compliant)
  async function persistProfileToSupabase(analysis) {
    if (!window.supabaseClient || !window.docmapUser?.id) return;

    try {
      await window.supabaseClient
        .from("luria_vocational_profiles")
        .upsert({
          user_id: window.docmapUser.id,
          answers: userAnswers,
          top_specialties: analysis.topMatches.map(m => ({
            id: m.id,
            name: m.name,
            affinity: m.affinityScore
          })),
          profile_traits: analysis.dominantTraits,
          updated_at: new Date().toISOString()
        }, { onConflict: "user_id" });
    } catch (err) {
      console.warn("Não foi possível salvar o perfil vocacional na nuvem:", err);
    }
  }

  // Renderizador do Catálogo de Especialidades
  function renderSpecialtiesCatalog(filterArea = "all", searchTerm = "") {
    const grid = document.getElementById("vocacao-catalog-grid");
    if (!grid) return;

    const term = searchTerm.toLowerCase().trim();

    const filtered = SPECIALTIES_DB.filter(spec => {
      const matchArea = filterArea === "all" || spec.area === filterArea || (filterArea === "direct" && spec.access === "direct");
      const matchSearch = !term || spec.name.toLowerCase().includes(term) || spec.summary.toLowerCase().includes(term);
      return matchArea && matchSearch;
    });

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="aplicar-empty-state" style="grid-column: 1/-1;">
          <p>Nenhuma especialidade encontrada para o termo pesquisado.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(spec => `
      <article class="vocacao-card" data-spec-id="${spec.id}">
        <div>
          <div class="vocacao-card-top">
            <div class="vocacao-card-icon">
              ${window.LuriaMedicalIcons ? window.LuriaMedicalIcons.icon(spec.area.toLowerCase()) : "✚"}
            </div>
            <span class="aplicar-badge">${spec.years} anos</span>
          </div>
          <h4>${spec.name}</h4>
          <div class="vocacao-card-meta">
            <span>${spec.area}</span>
            <span>·</span>
            <span>${spec.access === "direct" ? "Acesso Direto" : "Com Pré-requisito"}</span>
          </div>
          <p>${spec.summary}</p>
        </div>
        <div class="vocacao-card-actions">
          <button type="button" class="button secondary" data-action="details" data-spec-id="${spec.id}">
            Ver detalhes
          </button>
          <button type="button" class="button secondary" data-action="compare" data-spec-id="${spec.id}" title="Adicionar ao comparador">
            + Comparar
          </button>
        </div>
      </article>
    `).join("");

    // Conectar botões de ação
    grid.querySelectorAll('[data-action="details"]').forEach(btn => {
      btn.addEventListener("click", () => {
        openSpecialtyDetailsModal(btn.getAttribute("data-spec-id"));
      });
    });

    grid.querySelectorAll('[data-action="compare"]').forEach(btn => {
      btn.addEventListener("click", () => {
        addToComparison(btn.getAttribute("data-spec-id"));
      });
    });
  }

  // Modal / Drawer de Detalhes da Especialidade
  function openSpecialtyDetailsModal(specId) {
    const spec = SPECIALTIES_DB.find(s => s.id === specId);
    if (!spec) return;

    let dialog = document.getElementById("vocacao-details-dialog");
    if (!dialog) {
      dialog = document.createElement("dialog");
      dialog.id = "vocacao-details-dialog";
      dialog.className = "sv-dialog";
      document.body.appendChild(dialog);
    }

    dialog.innerHTML = `
      <div class="social-card-head" style="margin-bottom: 1rem;">
        <div>
          <span class="aplicar-badge" style="margin-bottom: 0.5rem;">${spec.area} · ${spec.prerequisite} (${spec.years} anos)</span>
          <h2 style="font-size: 1.5rem; margin: 0;">${spec.name}</h2>
        </div>
        <button type="button" class="button secondary" data-close-dialog>Fechar</button>
      </div>

      <div style="display: grid; gap: 1rem; max-height: 70vh; overflow-y: auto; padding-right: 4px;">
        <div class="vocacao-detail-box">
          <strong>Visão Geral da Área:</strong>
          <p>${spec.summary}</p>
        </div>

        <div class="vocacao-detail-box">
          <strong>Principais Atividades no Cotidiano:</strong>
          <p>${spec.activities}</p>
        </div>

        <div class="vocacao-detail-box">
          <strong>Ambientes de Atuação:</strong>
          <p>${spec.environments}</p>
        </div>

        <div class="vocacao-detail-box">
          <strong>Rotina e Estilo de Vida:</strong>
          <p>${spec.routine}</p>
        </div>

        <div class="vocacao-detail-box" style="border-left: 4px solid var(--color-success);">
          <strong>Aspectos Positivos:</strong>
          <p>${spec.positives}</p>
        </div>

        <div class="vocacao-detail-box" style="border-left: 4px solid var(--color-warning);">
          <strong>Desafios & Pontos de Atenção:</strong>
          <p>${spec.challenges}</p>
        </div>

        <div class="vocacao-detail-box">
          <strong>Subespecialidades & R-Adicional:</strong>
          <p>${spec.subspecialties}</p>
        </div>

        <small style="font-size: 0.75rem; color: var(--color-text-secondary); display: block; margin-top: 0.5rem;">
          Fonte oficial: Resolução CFM nº 2.330/2023 · Comissão Nacional de Residência Médica (CNRM/MEC).
        </small>
      </div>
    `;

    dialog.querySelector("[data-close-dialog]")?.addEventListener("click", () => dialog.close());
    dialog.showModal();
  }

  // Gerenciamento do Comparador de Especialidades
  function addToComparison(specId) {
    if (comparisonList.includes(specId)) return;
    if (comparisonList.length >= 3) {
      alert("Você pode comparar até 3 especialidades simultaneamente.");
      return;
    }
    comparisonList.push(specId);
    renderComparisonBox();
  }

  function removeFromComparison(specId) {
    comparisonList = comparisonList.filter(id => id !== specId);
    renderComparisonBox();
  }

  function renderComparisonBox() {
    const box = document.getElementById("vocacao-comparator-container");
    if (!box) return;

    if (comparisonList.length === 0) {
      box.hidden = true;
      return;
    }

    box.hidden = false;
    const specs = comparisonList.map(id => SPECIALTIES_DB.find(s => s.id === id)).filter(Boolean);

    box.innerHTML = `
      <div class="aplicar-card-header">
        <div>
          <h3>Comparador de Especialidades</h3>
          <p>Analise semelhanças e contrastes de rotina e formação lado a lado.</p>
        </div>
        <button type="button" class="button secondary" id="vocacao-clear-compare">Limpar comparação</button>
      </div>

      <div class="vocacao-compare-tags">
        ${specs.map(s => `
          <span class="vocacao-compare-tag">
            ${s.name}
            <button type="button" data-remove-compare="${s.id}" title="Remover">✕</button>
          </span>
        `).join("")}
      </div>

      <div class="vocacao-compare-grid">
        ${specs.map(s => `
          <div class="vocacao-compare-column">
            <h4>${s.name}</h4>
            <div class="vocacao-compare-attr">
              <strong>Formação & Duração:</strong>
              <p>${s.prerequisite} (${s.years} anos)</p>
            </div>
            <div class="vocacao-compare-attr">
              <strong>Rotina Principal:</strong>
              <p>${s.routine}</p>
            </div>
            <div class="vocacao-compare-attr">
              <strong>Ambientes:</strong>
              <p>${s.environments}</p>
            </div>
            <div class="vocacao-compare-attr">
              <strong>Vantagens:</strong>
              <p>${s.positives}</p>
            </div>
            <div class="vocacao-compare-attr">
              <strong>Desafios:</strong>
              <p>${s.challenges}</p>
            </div>
          </div>
        `).join("")}
      </div>
    `;

    box.querySelector("#vocacao-clear-compare")?.addEventListener("click", () => {
      comparisonList = [];
      renderComparisonBox();
    });

    box.querySelectorAll("[data-remove-compare]").forEach(btn => {
      btn.addEventListener("click", () => {
        removeFromComparison(btn.getAttribute("data-remove-compare"));
      });
    });
  }

  // Inicialização do Módulo Vocação
  function initVocacao() {
    // Iniciar questionário
    renderQuizQuestion(0);

    // Botão Voltar
    document.getElementById("vocacao-prev-btn")?.addEventListener("click", () => {
      if (currentStep > 0) {
        currentStep--;
        renderQuizQuestion(currentStep);
      }
    });

    // Botão Refazer Teste
    document.getElementById("vocacao-restart-btn")?.addEventListener("click", () => {
      currentStep = 0;
      Object.keys(userAnswers).forEach(k => delete userAnswers[k]);
      document.getElementById("vocacao-results-flow").hidden = true;
      document.getElementById("vocacao-quiz-flow").hidden = false;
      renderQuizQuestion(0);
    });

    // Inicializar Catálogo de Especialidades
    renderSpecialtiesCatalog();

    // Filtros do Catálogo
    const searchInput = document.getElementById("vocacao-search-input");
    let currentFilterArea = "all";

    searchInput?.addEventListener("input", e => {
      renderSpecialtiesCatalog(currentFilterArea, e.target.value);
    });

    document.querySelectorAll("[data-vocacao-filter]").forEach(pill => {
      pill.addEventListener("click", () => {
        document.querySelectorAll("[data-vocacao-filter]").forEach(p => p.classList.remove("active"));
        pill.classList.add("active");
        currentFilterArea = pill.getAttribute("data-vocacao-filter");
        renderSpecialtiesCatalog(currentFilterArea, searchInput?.value || "");
      });
    });
  }

  // Executa na inicialização
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initVocacao);
  } else {
    initVocacao();
  }

  window.LuriaVocacao = Object.freeze({
    getSpecialties: () => [...SPECIALTIES_DB],
    getQuestions: () => [...QUIZ_QUESTIONS],
    calculate: calculateVocationalAffinity
  });
})();
