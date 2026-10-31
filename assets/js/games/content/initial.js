/* Initial, locally curated educational content. No automatic conversion of private cards.
 * Each scenario specifies its assumptions. Order variants encode equivalent clinical orders.
 * Review this file independently of the engines before expanding the clinical curriculum. */
(() => {
  "use strict";
  const sources = {
    hypo: {
      title: "SBD · Correção da hipoglicemia",
      url: "https://diabetes.org.br/hipoglicemia-qual-a-melhor-forma-de-corrigir/",
    },
    cdc: {
      title: "CDC · Treatment of low blood sugar",
      url: "https://www.cdc.gov/diabetes/treatment/treatment-low-blood-sugar-hypoglycemia.html",
    },
    hospital: {
      title: "SBD · Hiperglicemia hospitalar",
      url: "https://diretriz.diabetes.org.br/hiperglicemia-hospitalar-em-paciente-nao-critico/",
    },
    dengue: {
      title: "MS · Manejo clínico da dengue",
      url: "https://www.gov.br/saude/pt-br/centrais-de-conteudo/publicacoes/svsa/dengue/dengue-diagnostico-e-manejo-clinico-adulto-e-crianca/view",
    },
    dengueaps: {
      title: "MS · Suporte à decisão em dengue",
      url: "https://sisaps.saude.gov.br/sistemas/esusaps/docs/manual/PEC/PEC_16_suporte_decisaoclinica_dengue/",
    },
    hands: {
      title: "Anvisa · Higiene das mãos",
      url: "https://www.gov.br/anvisa/pt-br/centraisdeconteudo/publicacoes/servicosdesaude/publicacoes/protocolo-de-higiene-das-maos",
    },
    handnote: {
      title: "Anvisa · Indicações da higiene das mãos",
      url: "https://www.gov.br/anvisa/pt-br/assuntos/noticias-anvisa/2018/higienizacao-das-maos-nota-orienta-profissionais",
    },
    surgery: {
      title: "OMS · Cirurgia segura",
      url: "https://www.who.int/teams/integrated-health-services/patient-safety/research/safe-surgery/tool-and-resources",
    },
    identity: {
      title: "MS · Identificação do paciente",
      url: "https://www.gov.br/saude/pt-br/composicao/saes/seguranca-do-paciente/publicacoes/protocolos-de-seguranca-do-paciente/protocolo-de-identificacao-do-paciente/view",
    },
    child: {
      title: "MS · Condições agudas na infância",
      url: "https://linhasdecuidado.saude.gov.br/portal/puericultura/unidade-de-atencao-primaria/condicoes-agudas/index.php",
    },
    aidpi: {
      title: "MS · AIDPI, sinais gerais de perigo",
      url: "https://bvsms.saude.gov.br/bvs/publicacoes/cd07_03_1.pdf",
    },
    pregnancy: {
      title: "MS · Gestação de alto risco",
      url: "https://bvsms.saude.gov.br/bvs/publicacoes/gestacao_alto_risco.pdf",
    },
    eclampsia: {
      title: "MS · Pré-eclâmpsia e eclâmpsia",
      url: "https://bvsms.saude.gov.br/pre-eclampsia-eclampsia/",
    },
    stroke: {
      title: "MS · Acidente vascular cerebral",
      url: "https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/a/avc/avc",
    },
    latent: {
      title: "MS · Assistência à pessoa com tuberculose",
      url: "https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/t/tuberculose/publicacoes/ferramenta-instrumentalizadora-assistencia-do-enfermeiro-a-pessoa-com-tuberculose-na-atencao-primaria.pdf",
    },
  };
  const questions = [];
  function q(id, specialty, level, prompt, options, answer, explanation, refs) {
    questions.push({
      id,
      specialty,
      level,
      prompt,
      options,
      answer,
      explanation,
      refs,
    });
  }
  q(
    "cm1",
    "Clínica Médica",
    1,
    "Adulto com diabetes, consciente, deglutição segura e glicemia de 62 mg/dL no domicílio. Qual correção inicial é adequada?",
    [
      "Carboidrato de rápida absorção por via oral",
      "Insulina rápida subcutânea",
      "Apenas aguardar a próxima refeição",
      "Exercício físico imediato",
    ],
    0,
    "Neste contexto, a correção oral é apropriada. É necessário medir novamente e avaliar a causa.",
    ["hypo"],
  );
  q(
    "cm2",
    "Clínica Médica",
    1,
    "Na suspeita de AVC, qual informação temporal deve ser esclarecida imediatamente?",
    [
      "Última consulta de rotina",
      "Última vez em que estava sem o déficit atual",
      "Horário da última refeição apenas",
      "Data da primeira internação",
    ],
    1,
    "A última vez sem o déficit ajuda a estabelecer a janela de avaliação terapêutica.",
    ["stroke"],
  );
  q(
    "cm3",
    "Clínica Médica",
    2,
    "Após tratar uma hipoglicemia leve com carboidrato de rápida absorção, em quanto tempo se recomenda habitualmente reavaliar a glicemia?",
    [
      "Ao fim do dia",
      "Em 2 horas",
      "Em 15 minutos",
      "Somente se houver convulsão",
    ],
    2,
    "A reavaliação precoce verifica a resposta e a necessidade de repetir a correção.",
    ["hypo"],
  );
  q(
    "cm4",
    "Clínica Médica",
    2,
    "Déficit focal de início súbito. Qual exame de imagem inicial ajuda a excluir hemorragia intracraniana antes de decidir sobre reperfusão?",
    [
      "Eletroencefalograma",
      "Radiografia de crânio",
      "Doppler de membros inferiores",
      "TC de crânio sem contraste",
    ],
    3,
    "A neuroimagem inicial distingue hemorragia de outras possibilidades; a decisão depende também de critérios clínicos.",
    ["stroke"],
  );
  q(
    "cm5",
    "Clínica Médica",
    3,
    "Paciente internado com hipoglicemia, rebaixamento da consciência e acesso venoso disponível. Qual via de correção evita o risco de aspiração da oferta oral?",
    [
      "Glicose intravenosa conforme protocolo",
      "Suco por via oral",
      "Comprimido oral de metformina",
      "Dieta sólida antes da avaliação",
    ],
    0,
    "A via oral é insegura no rebaixamento de consciência. A correção parenteral exige monitorização e reavaliação.",
    ["hospital"],
  );
  q(
    "cm6",
    "Clínica Médica",
    3,
    "Suspeita de dengue, febre em queda e dor abdominal intensa contínua. Como interpretar a melhora da temperatura?",
    [
      "Comprova resolução do quadro",
      "Pode coincidir com a fase de risco; o sinal de alarme exige reavaliação",
      "Exclui extravasamento plasmático",
      "Dispensa retorno se a febre não reaparecer",
    ],
    1,
    "A defervescência não garante recuperação. O achado descrito requer avaliação de gravidade.",
    ["dengue"],
  );
  q(
    "cg1",
    "Cirurgia",
    1,
    "A pausa de segurança imediatamente antes da incisão ocorre em qual momento do checklist cirúrgico?",
    ["Sign out", "Alta hospitalar", "Time out", "Consulta pós-operatória"],
    2,
    "O time out é uma verificação conjunta anterior à incisão.",
    ["surgery"],
  );
  q(
    "cg2",
    "Cirurgia",
    1,
    "Antes de um procedimento, qual identificação é mais segura?",
    [
      "Número do leito",
      "Diagnóstico presumido",
      "Reconhecimento visual apenas",
      "Pelo menos dois identificadores do paciente",
    ],
    3,
    "Nome completo e data de nascimento são exemplos; leito não identifica uma pessoa com segurança.",
    ["identity"],
  );
  q(
    "cg3",
    "Cirurgia",
    2,
    "Qual verificação pertence ao momento anterior à indução anestésica?",
    [
      "Confirmar identidade, procedimento e consentimento",
      "Registrar apenas o número de compressas ao final",
      "Liberar a sala sem identificação",
      "Adiar a checagem de alergias até a alta",
    ],
    0,
    "A etapa pré-anestésica confere condições de segurança antes da indução.",
    ["surgery"],
  );
  q(
    "cg4",
    "Cirurgia",
    2,
    "Ao conferir a pulseira antes de administrar medicamento, a data de nascimento diverge do prontuário. Qual é a conduta?",
    [
      "Usar o número do quarto para resolver",
      "Interromper a administração e esclarecer a identificação",
      "Administrar e corrigir depois",
      "Ignorar a divergência se o nome for parecido",
    ],
    1,
    "A divergência deve ser resolvida antes da intervenção, sem usar o leito como substituto.",
    ["identity"],
  );
  q(
    "cg5",
    "Cirurgia",
    3,
    "O paciente está prestes a sair da sala cirúrgica. Qual conjunto é compatível com a verificação final?",
    [
      "Apenas programação da limpeza",
      "Só confirmação da dieta",
      "Contagens, identificação de amostras e preocupações para recuperação",
      "Apenas o nome do anestésico",
    ],
    2,
    "O sign out inclui comunicação sobre o procedimento e a continuidade segura dos cuidados.",
    ["surgery"],
  );
  q(
    "cg6",
    "Cirurgia",
    3,
    "No time out, um membro relata discordância sobre o sítio operatório. O que a equipe deve fazer antes da incisão?",
    [
      "Prosseguir pela agenda impressa",
      "Votar rapidamente pelo lado mais provável",
      "Delegar a conferência para depois da incisão",
      "Suspender o avanço e resolver a discordância com os registros e o paciente quando possível",
    ],
    3,
    "A pausa tem a finalidade de impedir que dúvidas de segurança atravessem o ponto de início do procedimento.",
    ["surgery"],
  );
  q(
    "pd1",
    "Pediatria",
    1,
    "Criança de 18 meses com infecção aguda. Qual achado é um sinal geral de perigo na AIDPI?",
    [
      "Não consegue beber nem mamar",
      "Aceita líquidos normalmente",
      "Brinca entre os episódios de febre",
      "Coriza sem dificuldade respiratória",
    ],
    0,
    "Incapacidade de beber ou mamar exige avaliação urgente, junto aos demais sinais clínicos.",
    ["child"],
  );
  q(
    "pd2",
    "Pediatria",
    1,
    "Criança doente está letárgica e difícil de despertar. Qual interpretação é adequada?",
    [
      "Sonolência sem relevância clínica",
      "Sinal de perigo que exige atendimento urgente",
      "Critério isolado de alta",
      "Indicação de aguardar uma noite em casa",
    ],
    1,
    "Letargia no contexto de doença aguda deve ser reconhecida como sinal de gravidade.",
    ["aidpi"],
  );
  q(
    "pd3",
    "Pediatria",
    2,
    "Criança de 2 anos vomita tudo que ingere. Na avaliação AIDPI, o que isso representa?",
    [
      "Dado irrelevante se não há diarreia",
      "Indicação de apenas aumentar o volume oral",
      "Sinal geral de perigo",
      "Confirmação de doença benigna",
    ],
    2,
    "A incapacidade de reter qualquer ingestão é diferente de episódios isolados de vômito.",
    ["aidpi"],
  );
  q(
    "pd4",
    "Pediatria",
    2,
    "Na suspeita de dengue em criança, qual achado exige atenção por possível alarme?",
    [
      "Apetite em recuperação",
      "Prurido isolado",
      "Coriza isolada",
      "Vômitos persistentes",
    ],
    3,
    "A persistência dos vômitos deve ser valorizada na classificação e no acompanhamento.",
    ["dengue"],
  );
  q(
    "pd5",
    "Pediatria",
    3,
    "Responsável relata convulsão durante a doença atual de uma criança de 3 anos, agora sem crise. Qual abordagem corresponde à triagem AIDPI?",
    [
      "Reconhecer o relato como sinal de perigo e avaliar com urgência",
      "Descartar gravidade porque a crise cessou",
      "Orientar retorno apenas se durar mais de um dia",
      "Presumir diagnóstico benigno sem avaliação",
    ],
    0,
    "Uma convulsão no episódio atual integra a pesquisa de perigo; isso não define por si só a etiologia.",
    ["aidpi"],
  );
  q(
    "pd6",
    "Pediatria",
    3,
    "Criança com suspeita de dengue fica fria, com pulso fraco e enchimento capilar lento. Qual prioridade é apropriada?",
    [
      "Aguardar apenas resultado sorológico",
      "Avaliação e tratamento imediato por possível choque",
      "Alta porque a febre cedeu",
      "Orientar exercício para aquecer extremidades",
    ],
    1,
    "Sinais de hipoperfusão exigem abordagem urgente e reavaliação contínua.",
    ["dengue"],
  );
  q(
    "go1",
    "Ginecologia e Obstetrícia",
    1,
    "Gestante com hipertensão apresenta convulsão sem outra causa evidente. Qual complicação deve ser considerada?",
    [
      "Hiperêmese isolada",
      "Cistite não complicada",
      "Eclâmpsia",
      "Pródromos de trabalho de parto isoladamente",
    ],
    2,
    "A suspeita é uma emergência obstétrica e demanda estabilização e avaliação da equipe.",
    ["eclampsia"],
  );
  q(
    "go2",
    "Ginecologia e Obstetrícia",
    1,
    "Na eclâmpsia, qual fármaco é utilizado preferencialmente para controle e prevenção de novas convulsões?",
    ["Ácido fólico", "Ocitocina", "Metformina", "Sulfato de magnésio"],
    3,
    "O magnésio é parte do manejo, que também inclui suporte e controle pressórico quando indicado.",
    ["pregnancy"],
  );
  q(
    "go3",
    "Ginecologia e Obstetrícia",
    2,
    "Gestante hipertensa desenvolve cefaleia intensa e alteração visual. Qual encaminhamento é adequado?",
    [
      "Avaliação imediata por possível complicação hipertensiva",
      "Aguardar a próxima consulta mensal",
      "Tratar apenas como desconforto fisiológico",
      "Suspender toda avaliação se o feto se move",
    ],
    0,
    "Sintomas neurológicos nesse contexto precisam de investigação urgente.",
    ["pregnancy"],
  );
  q(
    "go4",
    "Ginecologia e Obstetrícia",
    2,
    "Em gestante recebendo sulfato de magnésio, qual conjunto integra a vigilância clínica de toxicidade?",
    [
      "Cor do cabelo e apetite",
      "Respiração, reflexos e diurese",
      "Somente peso semanal",
      "Somente altura uterina",
    ],
    1,
    "A vigilância clínica acompanha sinais de acúmulo e segurança da administração.",
    ["pregnancy"],
  );
  q(
    "go5",
    "Ginecologia e Obstetrícia",
    3,
    "Durante infusão de magnésio, surgem arreflexia e depressão respiratória. Qual resposta inicial é adequada?",
    [
      "Aumentar a infusão",
      "Aguardar a próxima dose",
      "Suspender a infusão, acionar suporte e tratar possível toxicidade conforme protocolo",
      "Prescrever apenas hidratação oral",
    ],
    2,
    "A suspeita de toxicidade exige interrupção e suporte imediato, com antídoto conforme protocolo assistencial.",
    ["pregnancy"],
  );
  q(
    "go6",
    "Ginecologia e Obstetrícia",
    3,
    "Na eclâmpsia, qual afirmação descreve melhor o papel do sulfato de magnésio?",
    [
      "Substitui toda avaliação obstétrica",
      "É o único cuidado necessário",
      "Substitui o controle de hipertensão grave",
      "Controla convulsões; não substitui o manejo da hipertensão e a decisão obstétrica",
    ],
    3,
    "O tratamento é integrado e depende das condições maternas e fetais.",
    ["pregnancy"],
  );
  q(
    "mp1",
    "Medicina Preventiva",
    1,
    "Antes de examinar um paciente, qual medida reduz transmissão por contato?",
    [
      "Higienizar as mãos no momento indicado",
      "Apenas vestir jaleco",
      "Usar luvas sem higiene das mãos",
      "Higienizar somente ao fim do turno",
    ],
    0,
    "A higiene deve acompanhar os momentos assistenciais, mesmo quando há uso de luvas.",
    ["hands"],
  );
  q(
    "mp2",
    "Medicina Preventiva",
    1,
    "Mãos visivelmente sujas após atendimento. Qual método é indicado?",
    [
      "Somente luvas novas",
      "Água e sabonete",
      "Apenas papel seco",
      "Apenas perfume",
    ],
    1,
    "A sujidade visível é indicação de lavagem com água e sabonete.",
    ["handnote"],
  );
  q(
    "mp3",
    "Medicina Preventiva",
    2,
    "Qual dado NÃO deve ser usado como identificador do paciente?",
    [
      "Nome completo",
      "Data de nascimento",
      "Número do leito",
      "Número de prontuário individual",
    ],
    2,
    "O leito muda e não é um identificador pessoal seguro.",
    ["identity"],
  );
  q(
    "mp4",
    "Medicina Preventiva",
    2,
    "As mãos estão limpas visualmente e é necessário higienizá-las entre contatos. Qual opção é apropriada, ausentes indicações específicas de lavagem?",
    [
      "Somente água",
      "Trocar o jaleco",
      "Esperar o fim da visita",
      "Preparação alcoólica apropriada",
    ],
    3,
    "A preparação alcoólica pode ser utilizada quando não há sujidade visível ou outra indicação de água e sabonete.",
    ["handnote"],
  );
  q(
    "mp5",
    "Medicina Preventiva",
    3,
    "Pessoa com teste para infecção tuberculosa positivo e tosse persistente. Antes de considerar tratamento de infecção latente, qual cuidado é essencial?",
    [
      "Investigar e excluir tuberculose ativa",
      "Presumir latência pelo teste positivo",
      "Tratar latência sem avaliar os sintomas",
      "Repetir apenas o teste anualmente",
    ],
    0,
    "Um teste de infecção positivo não distingue, sozinho, latência de doença ativa.",
    ["latent"],
  );
  q(
    "mp6",
    "Medicina Preventiva",
    3,
    "Paciente com suspeita de dengue, sem alarme na avaliação, recebe orientação de retorno. Qual informação deve constar?",
    [
      "Voltar somente se a febre aumentar",
      "Reconhecer sinais de alarme e retornar também na melhora da febre conforme plano",
      "Dispensar hidratação se a temperatura normalizar",
      "Usar anti-inflamatório como rotina",
    ],
    1,
    "O retorno programado e o reconhecimento de piora são parte do acompanhamento.",
    ["dengueaps"],
  );
  const sequences = [
    {
      id: "oral4",
      specialty: "Clínica Médica",
      level: 1,
      title: "Correção oral, com reavaliação",
      context:
        "Adulto consciente, deglutição segura, glicemia de 62 mg/dL em acompanhamento ambulatorial. Ordene apenas o ciclo de correção; a avaliação clínica ocorre em paralelo.",
      steps: [
        "Reconhecer a hipoglicemia e confirmar que a via oral é segura",
        "Oferecer 15 g de carboidrato de rápida absorção",
        "Aguardar 15 minutos e medir novamente",
        "Decidir se é preciso repetir a correção conforme a glicemia",
      ],
      variants: [[0, 1, 2, 3]],
      explanation:
        "A medida após a correção determina o próximo passo; a melhora subjetiva não substitui a rechecagem.",
      refs: ["hypo", "cdc"],
    },
    {
      id: "hand4",
      specialty: "Medicina Preventiva",
      level: 1,
      title: "Mãos visivelmente sujas",
      context:
        "Agrupamento didático da higiene simples com água e sabonete. As manobras de fricção estão agrupadas; não se avalia uma ordem rígida entre elas.",
      steps: [
        "Molhar as mãos",
        "Aplicar sabonete e realizar a fricção completa das superfícies",
        "Enxaguar, removendo o sabonete",
        "Secar com papel descartável e fechar torneira manual sem recontaminar as mãos",
      ],
      variants: [[0, 1, 2, 3]],
      explanation:
        "A fricção acontece antes do enxágue; a secagem e o fechamento seguro evitam recontaminação.",
      refs: ["hands"],
    },
    {
      id: "surgery4",
      specialty: "Cirurgia",
      level: 1,
      title: "As pausas têm seu momento",
      context:
        "Paciente já encaminhado para cirurgia eletiva. Ordene os grandes marcos temporais; os itens de cada pausa não têm ordem interna obrigatória.",
      steps: [
        "Realizar a verificação de segurança antes da indução",
        "Realizar a indução anestésica",
        "Realizar a pausa conjunta antes da incisão",
        "Realizar a incisão após resolver dúvidas de segurança",
      ],
      variants: [[0, 1, 2, 3]],
      explanation:
        "O exercício representa marcos temporais do checklist, e não uma lista completa de condutas cirúrgicas.",
      refs: ["surgery"],
    },
    {
      id: "oral5",
      specialty: "Clínica Médica",
      level: 2,
      title: "A glicemia ainda está baixa",
      context:
        "Adulto consciente e com deglutição segura. A rechecagem após a primeira correção oral mostra 65 mg/dL. Organize o ciclo completo, sem incluir o cuidado simultâneo.",
      steps: [
        "Identificar glicemia inicial abaixo de 70 mg/dL",
        "Administrar 15 g de carboidrato de rápida absorção",
        "Medir novamente após 15 minutos: resultado 65 mg/dL",
        "Repetir a correção oral pela persistência da hipoglicemia",
        "Medir novamente após outros 15 minutos e reavaliar",
      ],
      variants: [[0, 1, 2, 3, 4]],
      explanation:
        "A segunda correção responde a uma medição persistente baixa. Não se repete de forma cega sem reavaliar.",
      refs: ["hypo", "cdc"],
    },
    {
      id: "sample5",
      specialty: "Cirurgia",
      level: 2,
      title: "Uma amostra com identidade",
      context:
        "Fluxo didático de uma única amostra cirúrgica: paciente e procedimento confirmados, frasco disponível. Rótulo e conferência devem ocorrer no local da coleta. Nome e data podem ser conferidos em qualquer ordem.",
      steps: [
        "Confirmar o nome completo com os registros do paciente",
        "Confirmar a data de nascimento com os registros do paciente",
        "Coletar e acondicionar a amostra conforme a técnica indicada",
        "Identificar o frasco e conferir a correspondência com a requisição",
        "Encaminhar a amostra identificada ao laboratório",
      ],
      variants: [
        [0, 1, 2, 3, 4],
        [1, 0, 2, 3, 4],
      ],
      explanation:
        "Os dois identificadores têm a mesma prioridade. O envio depende da identificação e da correspondência verificadas.",
      refs: ["identity", "surgery"],
    },
    {
      id: "surgery6",
      specialty: "Cirurgia",
      level: 2,
      title: "Do preparo à saída de sala",
      context:
        "Ordene os marcos de uma cirurgia eletiva sem intercorrências. As verificações internas de cada pausa são agrupadas.",
      steps: [
        "Concluir a verificação pré-anestésica",
        "Iniciar a indução anestésica",
        "Concluir o time out antes da incisão",
        "Iniciar o procedimento cirúrgico",
        "Concluir o sign out com contagens e plano de recuperação",
        "Transferir o paciente para recuperação com passagem de cuidados",
      ],
      variants: [[0, 1, 2, 3, 4, 5]],
      explanation:
        "As três pausas se vinculam a momentos diferentes. A saída ocorre após a verificação final e comunicação dos cuidados.",
      refs: ["surgery"],
    },
    {
      id: "oral6",
      specialty: "Clínica Médica",
      level: 3,
      title: "Duas correções e uma decisão",
      context:
        "Adulto em casa, consciente, com deglutição segura. Glicemia inicial 58 mg/dL; depois da primeira correção 64; depois da segunda 92. O foco é a dependência entre resultado e ação.",
      steps: [
        "Reconhecer 58 mg/dL e confirmar segurança da via oral",
        "Oferecer 15 g de carboidrato de rápida absorção",
        "Após 15 minutos, medir: 64 mg/dL",
        "Repetir 15 g de carboidrato de rápida absorção",
        "Após outros 15 minutos, medir: 92 mg/dL",
        "Com correção documentada, planejar alimentação e investigar o fator precipitante",
      ],
      variants: [[0, 1, 2, 3, 4, 5]],
      explanation:
        "A alimentação após recuperação e a investigação da causa reduzem recorrência; não substituem a correção inicial.",
      refs: ["hypo", "cdc"],
    },
    {
      id: "hand7",
      specialty: "Medicina Preventiva",
      level: 3,
      title: "Não recontaminar no último gesto",
      context:
        "Torneira com acionamento manual. Mãos com sujidade visível. As fricções estão agrupadas. O objetivo é preservar a higiene até o encerramento da técnica.",
      steps: [
        "Abrir a torneira e molhar as mãos sem encostar na pia",
        "Aplicar sabonete em quantidade suficiente",
        "Friccionar todas as superfícies, incluindo dedos, polegares e punhos",
        "Enxaguar, evitando contato com a torneira",
        "Secar as mãos com papel descartável",
        "Fechar a torneira manual utilizando papel",
        "Descartar o papel sem tocar na superfície contaminada",
      ],
      variants: [[0, 1, 2, 3, 4, 5, 6]],
      explanation:
        "O fechamento com barreira após a secagem evita que o último gesto desfaça a higiene realizada.",
      refs: ["hands"],
    },
    {
      id: "surgery7",
      specialty: "Cirurgia",
      level: 3,
      title: "Uma divergência antes da incisão",
      context:
        "Cirurgia eletiva. No time out, surge dúvida sobre o sítio. Ordene os marcos deste cenário. A reconciliação dos registros é concluída antes da incisão.",
      steps: [
        "Completar a verificação pré-anestésica",
        "Realizar a indução anestésica",
        "Iniciar o time out e identificar a divergência",
        "Interromper o avanço e resolver a divergência com a equipe e documentação",
        "Confirmar o consenso de segurança e realizar a incisão",
        "Concluir o procedimento e o sign out antes da saída",
        "Transferir com comunicação do plano pós-operatório",
      ],
      variants: [[0, 1, 2, 3, 4, 5, 6]],
      explanation:
        "Uma checagem com discordância não está concluída. A incisão depende da resolução, e a transferência depende do fechamento seguro.",
      refs: ["surgery"],
    },
  ];
  const chapters = ["A chegada", "A rotina complica", "Encerrando o plantão"];
  const adventure = [
    {
      id: "arrival",
      chapter: 0,
      room: "Recepção",
      type: "choice",
      title: "18h · O primeiro chamado",
      story:
        "Você chega ao Hospital Aurora, um cenário fictício. A equipe está disponível. Entre os pacientes aguardando, quem exige avaliação imediata?",
      prompt: "Reconheça a prioridade clínica.",
      options: [
        "Adulto pedindo renovação de receita, sem sintomas",
        "Criança de 2 anos letárgica e incapaz de beber",
        "Adulto com coriza, conversando normalmente",
        "Paciente solicitando cópia de exame antigo",
      ],
      answer: 1,
      explanation:
        "Letargia e incapacidade de beber são sinais de perigo. Acione a equipe e avalie imediatamente.",
      refs: ["child"],
    },
    {
      id: "identity",
      chapter: 0,
      room: "Posto de cuidados",
      type: "select",
      title: "18h20 · Antes de cuidar",
      story:
        "A criança já está sob cuidados da equipe. Você vai conferir a identificação de outro paciente antes de uma intervenção. O prontuário está aberto.",
      prompt:
        "Selecione os DOIS identificadores pessoais adequados entre estes dados.",
      options: [
        "Nome completo",
        "Número do leito",
        "Data de nascimento",
        "Cor do pijama",
      ],
      answers: [0, 2],
      explanation:
        "Nome e data de nascimento identificam a pessoa; localização e aparência não são identificadores seguros.",
      refs: ["identity"],
    },
    {
      id: "hands",
      chapter: 0,
      room: "Higienização",
      type: "sort",
      title: "19h · Um cuidado entre atendimentos",
      story:
        "Após atendimento, suas mãos estão visivelmente sujas. Há pia, sabonete e papel disponíveis.",
      prompt: "Organize as quatro etapas agrupadas da lavagem.",
      steps: [
        "Molhar as mãos",
        "Aplicar sabonete e friccionar todas as superfícies",
        "Enxaguar",
        "Secar e fechar a torneira manual sem recontaminar",
      ],
      variants: [[0, 1, 2, 3]],
      explanation:
        "A limpeza precede o enxágue e a secagem; proteja as mãos de novo contato contaminado.",
      refs: ["hands"],
    },
    {
      id: "dengue",
      chapter: 1,
      room: "Observação",
      type: "select",
      title: "21h · A febre baixou, mas…",
      story:
        "Uma paciente com suspeita de dengue retorna no quarto dia. Ela diz que a febre melhorou. Na entrevista você precisa reconhecer o que modifica a avaliação de risco.",
      prompt: "Selecione os DOIS sinais de alarme apresentados abaixo.",
      options: [
        "Vômitos persistentes",
        "Apetite retomando",
        "Dor abdominal intensa e contínua",
        "Prurido isolado",
      ],
      answers: [0, 2],
      explanation:
        "A piora pode aparecer na defervescência. Vômitos persistentes e dor intensa exigem reclassificação e avaliação imediata.",
      refs: ["dengue"],
    },
    {
      id: "glucose",
      chapter: 1,
      room: "Consultório",
      type: "choice",
      title: "22h · Uma decisão de via",
      story:
        "Adulto com diabetes está alerta, deglute com segurança e apresenta glicemia de 61 mg/dL. Não há rebaixamento da consciência.",
      prompt: "Qual plano inicial atende ao contexto?",
      options: [
        "Correção oral com carboidrato rápido e rechecagem em 15 minutos",
        "Insulina rápida e alta sem reavaliar",
        "Apenas água e observação até amanhã",
        "Alimento por via oral mesmo se perder a consciência",
      ],
      answer: 0,
      explanation:
        "A via oral é adequada enquanto a deglutição é segura. A glicemia deve ser novamente aferida.",
      refs: ["hypo"],
    },
    {
      id: "time-out",
      chapter: 1,
      room: "Centro cirúrgico",
      type: "choice",
      title: "23h · A pausa que muda o rumo",
      story:
        "Durante o time out de uma cirurgia eletiva, a equipe identifica registros divergentes de lateralidade.",
      prompt: "O que libera o próximo marco com segurança?",
      options: [
        "Preferir a agenda sem consultar a equipe",
        "Incisar e esclarecer durante o procedimento",
        "Resolver a discordância e confirmar o sítio antes da incisão",
        "Registrar a divergência apenas na alta",
      ],
      answer: 2,
      explanation:
        "A pausa é uma barreira de segurança. A discordância precisa ser resolvida antes do avanço.",
      refs: ["surgery"],
    },
    {
      id: "recheck",
      chapter: 2,
      room: "Reavaliação",
      type: "sort",
      title: "01h · Fechar o ciclo",
      story:
        "O adulto corrigido por via oral continua consciente. A próxima glicemia é 64 mg/dL. Ordene a continuação do ciclo.",
      prompt: "Cada decisão depende da resposta observada.",
      steps: [
        "Reconhecer persistência da hipoglicemia na rechecagem",
        "Repetir a correção oral de rápida absorção",
        "Aguardar 15 minutos e medir novamente",
        "Reavaliar necessidade de nova correção e plano de alimentação",
      ],
      variants: [[0, 1, 2, 3]],
      explanation:
        "É necessário verificar a resposta, sem supor que a primeira oferta resolveu o episódio.",
      refs: ["hypo", "cdc"],
    },
    {
      id: "handoff",
      chapter: 2,
      room: "Passagem de turno",
      type: "select",
      title: "05h30 · O que não pode se perder",
      story:
        "A paciente com suspeita de dengue permanece em observação. A equipe seguinte precisa conhecer a mudança clínica e acompanhar as pendências.",
      prompt: "Selecione as TRÊS informações úteis à continuidade do cuidado.",
      options: [
        "Sinais de alarme observados e evolução",
        "Reavaliações pendentes e responsável pelo seguimento",
        "Plano de monitorização e sinais para acionar a equipe",
        "Apenas o número do leito, dispensando a identidade",
      ],
      answers: [0, 1, 2],
      explanation:
        "Uma passagem segura comunica risco, plano e responsabilidades. O leito isolado não identifica o paciente.",
      refs: ["identity", "dengueaps"],
    },
    {
      id: "ending",
      chapter: 2,
      room: "Saída",
      type: "choice",
      title: "06h · Uma saída responsável",
      story:
        "As reavaliações estão documentadas. Um paciente em acompanhamento ambulatorial por suspeita de dengue está sem sinais de alarme na avaliação e tem condições para seguir o plano de retorno.",
      prompt: "Qual orientação deve acompanhar a saída?",
      options: [
        "A melhora da febre elimina qualquer risco",
        "Retorno conforme plano, hidratação orientada e procura imediata se aparecerem sinais de alarme",
        "Retorno somente quando houver sangramento intenso",
        "Anti-inflamatório rotineiro sem avaliação",
      ],
      answer: 1,
      explanation:
        "A orientação de alarme e retorno é parte do cuidado, inclusive no período em que a febre melhora.",
      refs: ["dengueaps"],
    },
  ];
  window.TraubeGameContent = Object.freeze({
    version: 1,
    status: "initial",
    sources,
    questions,
    sequences,
    chapters,
    adventure,
  });
})();
