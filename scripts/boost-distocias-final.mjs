import fs from 'fs';

let content = fs.readFileSync('build-scripts/build-distocias.mjs', 'utf8');

const finalSection = `
    [
      'simulacao-treinamento-debriefing-distocia',
      0,
      [
        ['2', 'Simulação Realística, Debriefing e Protocolos de Equipe em Emergências Tocúrgicas'],
        ['p', 'A ocorrência de distócia de espáduas ou a necessidade de parto operatório urgente exige perfeita sincronia da equipe multiprofissional. Estudos prospectivos demonstram que a capacitação sistemática com simulação em manequins obstétricos de alta fidelidade reduz a incidência de lesão permanente do plexo braquial neonatal em mais de 70% e diminui drasticamente o tempo entre o desprendimento cefálico e o desprendimento do corpo.'],
        ['3', 'O Papel do Líder e a Distribuição de Tarefas no HELPERR'],
        ['p', 'Assim que o Sinal da Tartaruga é identificado, o médico responsável deve assumir verbalmente a liderança da sala e designar funções imediatas em voz alta:'],
        ['o', [
          '<strong>Líder Obstétrico:</strong> Permanece no comando do períneo, suspende os puxos da paciente, orienta a flexão das pernas e realiza a tração suave e as manobras internas (Rubin II, Woods, Jacquemier);',
          '<strong>Assistente 1 (Enfermagem / Residente):</strong> Posiciona-se imediatamente na sínfise púbica materna e executa a manobra de Rubin I (pressão suprapúbica externa contínua ou rítmica de 30 a 60 segundos com o calcanhar da mão ou punho em direção oblíqua);',
          '<strong>Assistentes 2 e 3 (Profissionais de Apoio):</strong> Seguram as pernas da paciente e realizam a manobra de McRoberts (hiperflexão e abdução dos membros inferiores até que os joelhos toquem a parede torácica ou axilas maternas);',
          '<strong>Cronometrista / Anotador de Prontuário:</strong> Registra em voz alta o tempo decorrido a cada 30 segundos (30s, 60s, 90s, 120s), anotando no prontuário o minuto exato de cada manobra executada;',
          '<strong>Equipe Pediátrica e Anestésica:</strong> O pediatra prepara a unidade de reanimação neonatal com aquecimento radiante, fonte de oxigênio e bolsa-valva-máscara; o anestesiologista posiciona-se na cabeceira da paciente para eventual anestesia geral de emergência ou relaxamento miometrial para Zavanelli.'
        ]],
        ['3', 'O Debriefing Pós-Evento e Comunicação Familiar'],
        ['p', 'Após a resolução da emergência, a equipe deve reunir-se para o <em>debriefing</em> técnico, revisando a linha do tempo, a integridade anatômica do canal de parto e a condição do neonato. É mandatório realizar uma conversa empática e detalhada com a puérpera e seus familiares, explicando a natureza imprevisível da distócia mecânica, as manobras empregadas para a preservação da vida do concepto e o plano de seguimento conjunto com a fisioterapia e neurologia pediátrica em caso de déficit motor transitório.']
      ]
    ],
`;

const target = "    [\n      'casos-clinicos-integradores',";
content = content.replace(target, finalSection + target);

// Also add 4 more extensive residency questions (Questions 11 to 14)
const extraQuestions = `
  ['3', 'Questão 11: Distócia por Apresentação de Fronte (UNIFESP)'],
  ['p', 'Multípara com 39 semanas de gestação em trabalho de parto na fase ativa é avaliada pelo obstetra. Ao toque vaginal, identifica-se dilatação de 6 cm, bolsa rota com líquido claro, palpa-se a raiz do nariz (glabela) e a sutura metópica como pontos de referência no centro da bacia. O occipício e o mento não são palpáveis. Qual é a apresentação fetal, o diâmetro de insinuação e a conduta recomendada?'],
  ['o', [
    'A) Apresentação de vértice; diâmetro suboccipitobregmático de 9,5 cm; aguardar parto normal espontâneo.',
    'B) Apresentação defletida de 1º grau; diâmetro occipitofrontal de 12 cm; aplicar vácuo-extrator de alívio.',
    'C) Apresentação defletida de 2º grau (fronte); diâmetro occipitomentoniano de 13,5 cm; indicação de cesariana por impossibilidade mecânica de parto vaginal a termo.',
    'D) Apresentação defletida de 3º grau (face); diâmetro submentobregmático de 9,5 cm; manobra de versão externa.',
    'E) Apresentação pélvica modo pés; indicação de manobra de Bracht.'
  ]],
  ['p', '<strong>Gabarito Comentado: Alternativa C.</strong><br>' +
    'A apresentação de fronte (deflexão de 2º grau) apresenta a glabela como ponto anatômico e oferece o diâmetro occipitomentoniano de 13,5 cm, que ultrapassa todos os diâmetros da pelve feminina a termo, sendo o parto vaginal impossível e a cesariana obrigatória.'],

  ['3', 'Questão 12: Manobra de Gaskin e Posição em Quatro Apoios (SCMSP)'],
  ['p', 'Na distócia de espáduas refratária às manobras de McRoberts e pressão suprapúbica, qual manobra postural consiste em colocar a parturiente na posição de quatro apoios (mãos e joelhos apoiados na cama de parto) para ampliar os diâmetros pélvicos e facilitar o desprendimento do ombro posterior?'],
  ['o', [
    'A) Manobra de Zavanelli.',
    'B) Manobra de Gaskin.',
    'C) Manobra de Jacquemier.',
    'D) Manobra de Woods.',
    'E) Manobra de Rubin II.'
  ]],
  ['p', '<strong>Gabarito Comentado: Alternativa B.</strong><br>' +
    'A Manobra de Gaskin (all fours) utiliza a gravidade e o movimento da bacia em quatro apoios para liberar a impactação escapular com segurança e rapidez.'],

  ['3', 'Questão 13: Diagnóstico e Fisiopatologia da Paralisia de Dejerine-Klumpke (UERJ)'],
  ['p', 'Recém-nascido a termo após parto difícil com distócia de espáduas apresenta motricidade do braço e antebraço preservada, reflexo de Moro simétrico e normal, porém com deformidade em garra da mão, reflexo de preensão palmar completamente ausente e presença de ptose palpebral e miose ipsilateral (Síndrome de Horner). Qual é o diagnóstico neurológico?'],
  ['o', [
    'A) Paralisia de Duchenne-Erb por lesão de C5 e C6.',
    'B) Paralisia de Dejerine-Klumpke por avulsão das raízes de C8 e T1 com acometimento da cadeia simpática cervical.',
    'C) Paralisia cerebral espástica congênita.',
    'D) Hemorragia subgaleal traumática compressiva.',
    'E) Fratura diafisária de úmero sem lesão neurológica.'
  ]],
  ['p', '<strong>Gabarito Comentado: Alternativa B.</strong><br>' +
    'A lesão das raízes inferiores do plexo braquial (C8-T1) caracteriza a Paralisia de Dejerine-Klumpke (mão em garra, ausência de preensão palmar e Síndrome de Horner por comprometimento simpático de T1).'],

  ['3', 'Questão 14: Manejo Cirúrgico da Cabeça Impactada na Cesariana (UNICAMP)'],
  ['p', 'Durante uma cesariana indicada por parada de descida no segundo período após 3 horas de puxos com feto no plano +1 de De Lee, o cirurgião realiza a histerotomia segmentar transversa e constata que a cabeça fetal está profundamente impactada no estreito médio da pelve materna, não sendo possível insinuar a mão por baixo do polo cefálico. A conduta cirúrgica recomendada para evitar lacerações vasculares graves é:'],
  ['o', [
    'A) Forçar a alavanca com espátula metálica cortante sobre a bexiga materna.',
    'B) Solicitar a um assistente estéril que empurre a cabeça fetal suavemente pela vagina para cima (Push technique) ou optar pela técnica de extração podálica invertida de Patwardhan (Pull technique).',
    'C) Fechar a histerotomia e abandonar a cirurgia.',
    'D) Injetar ocitocina diretamente no miométrio para forçar a cabeça para fora.',
    'E) Realizar manobra de Kristeller vigorosa no tórax materno.'
  ]],
  ['p', '<strong>Gabarito Comentado: Alternativa B.</strong><br>' +
    'A técnica de empurrão vaginal reverso (push) ou a extração pélvica invertida (pull / manobra de Patwardhan) são os métodos seguros consagrados para evitar lacerações do segmento uterino e vasos uterinos.']
`;

const qTarget = "  ['3', 'Questão 10: Classificação de Lesão Perineal de Grau 3b (AMP)'],";
if (content.includes(qTarget)) {
  const insertIndex = content.lastIndexOf("  ['3', 'Questão 10: Classificação de Lesão Perineal de Grau 3b (AMP)'],");
  // Find the end of Questao 10
  const q10End = content.indexOf(");", insertIndex);
  content = content.slice(0, q10End) + ",\n" + extraQuestions + content.slice(q10End);
  console.log('Successfully inserted extra questions 11-14.');
}

// Add to TOC
const tocExtra2 = `
    ['simulacao-treinamento-debriefing-distocia', 'Simulação Realística e Debriefing em Distócia'],
    ['casos-clinicos-integradores', '13. Casos Clínicos Resolvidos de Distócias e Parto Instrumental'],`;

const tocTarget2 = "    ['casos-clinicos-integradores', '13. Casos Clínicos Resolvidos de Distócias e Parto Instrumental'],";
content = content.replace(tocTarget2, tocExtra2);

fs.writeFileSync('build-scripts/build-distocias.mjs', content, 'utf8');
console.log('Successfully updated build-distocias.mjs!');
