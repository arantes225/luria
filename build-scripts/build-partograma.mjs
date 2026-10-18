import { saveBook } from '../scripts/bloco-04-utils.mjs';

const bookPartograma = {
  v: 2,
  s: 'partograma',
  slug: 'partograma',
  t: 'Partograma',
  title: 'Partograma',
  p: 'Tratado completo sobre o Partograma na prática obstétrica moderna: evolução histórica desde Friedman e Philpott, anatomia gráfica, critérios formais de abertura na fase ativa, linhas de alerta e de ação, semiologia das distócias funcionais e do motor uterino, diretrizes OMS 2018-2024 e Labour Care Guide (LCG), casos clínicos de alta complexidade e questões comentadas de residência médica.',
  o: [
    ['fundamentos-historico-conceito', '1. Fundamentos Históricos, Conceito e Importância do Partograma'],
    ['anatomia-grafica-eixos-simbologia', '2. Anatomia Gráfica do Partograma: Eixos, Escalas e Simbologia Padronizada'],
    ['criterios-abertura-fase-ativa', '3. Critérios de Abertura do Partograma e Definição da Fase Ativa'],
    ['linhas-alerta-acao-regras-registro', '4. Linhas de Alerta e Ação: Construção, Racional Clínico e Regras de Registro'],
    ['distocias-fase-ativa-prolongada', '5. Fase Ativa Prolongada: Diagnóstico Gráfico, Etiologia e Conduta Baseada em Evidências'],
    ['distocias-parada-secundaria-dilatacao', '6. Parada Secundária da Dilatação: Diferenciação entre Hipossistolia e Desproporção Cefalopélvica'],
    ['distocias-periodo-pelvico-descida', '7. Distócias do Período Expulsivo: Período Pélvico Prolongado e Parada Secundária da Descida'],
    ['distocias-parto-taquitocico-precipitado', '8. Parto Taquitócico ou Precipitado: Riscos Maternos, Fetais e Manejo Imediato'],
    ['vigilancia-fetal-dinamica-partograma', '9. Monitorização Materna e Fetal Integrada ao Gráfico: FCF, Dinâmica Uterina e Líquido Amniótico'],
    ['transicao-oms-labour-care-guide', '10. O Novo Labour Care Guide (LCG) da OMS: Superação do Limiar Fixo de 1 cm/h e Humanização'],
    ['casos-clinicos-integradores', '11. Casos Clínicos Resolvidos com Análise Minuciosa do Partograma'],
    ['questoes-comentadas-residencia', '12. Questões de Concursos e Residência Médica com Comentários Exaustivos'],
    ['referencias', 'Referências']
  ],
  h: [
    'Apostila LURIA',
    'Partograma',
    'Tratado completo sobre o Partograma na prática obstétrica moderna: evolução histórica desde Friedman e Philpott, anatomia gráfica, critérios formais de abertura na fase ativa, linhas de alerta e de ação, semiologia das distócias funcionais e do motor uterino, diretrizes OMS 2018-2024 e Labour Care Guide (LCG), casos clínicos de alta complexidade e questões comentadas de residência médica.',
    [
      'Área: Ginecologia e Obstetrícia',
      'Matéria: Obstetrícia e Tococirurgia',
      'Tema: Partograma'
    ],
    'apostila-identity'
  ],
  q: [
    [
      'fundamentos-historico-conceito',
      0,
      [
        ['2', '1. Fundamentos Históricos, Conceito e Importância do Partograma'],
        ['p', 'O partograma representa uma das maiores inovações tecnológicas do cuidado obstétrico do século XX. Trata-se de uma representação gráfica contínua da evolução do trabalho de parto, na qual são plotadas variáveis clínicas fundamentais da parturiente e do feto ao longo do tempo. Concebido com o propósito central de reduzir a morbimortalidade materna e perinatal, o partograma funciona como um instrumento de alerta precoce e de auditoria clínica, capaz de transformar dados semiológicos pontuais obtidos ao exame físico em uma curva visual dinâmica que permite identificar desvios da normalidade, orientar intervenções proporcionais e evitar tanto a protelação perigosa quanto o intervencionismo desnecessário.'],
        ['3', 'A Evolução Histórica: de Emanuel Friedman a Hugh Philpott'],
        ['p', 'A gênese do partograma moderno remonta aos trabalhos pioneiros do obstetra norte-americano Emanuel A. Friedman, que na década de 1950 publicou estudos seminais descrevendo a curva sigmoide que expressa a dilatação do colo uterino em função do tempo em horas. Friedman dividiu o trabalho de parto em duas fases funcionais distintas: a fase latente, caracterizada por apagamento e dilatação cervical lenta e gradual, e a fase ativa, em que a velocidade de dilatação se acelera de maneira expressiva. Friedman também descreveu a velocidade mínima de dilatação aceitável para nulíparas em torno de 1,2 cm por hora e para multíparas em 1,5 cm por hora, conceitos que fundamentaram a obstetrícia clássica por quase cinco décadas.'],
        ['p', 'Entretanto, a aplicação dos postulados de Friedman exigia a plotagem de curvas matemáticas complexas, de difícil operacionalização na rotina diária de maternidades com alta rotatividade e recursos limitados. Foi na Rodésia (atual Zimbábue), na década de 1970, que o obstetra escocês Hugh Philpott simplificou dramaticamente essa abordagem. Philpott concebeu um partograma prático para uso por parteiras e obstetras em áreas periféricas da África subsaariana, substituindo curvas complexas por linhas retas de progressão e introduzindo os conceitos revolucionários de <strong>Linha de Alerta</strong> e <strong>Linha de Ação</strong>. O objetivo precípuo de Philpott era definir o momento exato em que uma paciente em trabalho de parto obstrutivo ou disfuncional em um centro de saúde primário deveria ser transferida para um hospital de referência com capacidade cirúrgica cesariana antes que ocorressem complicações catastróficas, como rotura uterina, fístula vesicovaginal ou óbito intrauterino.'],
        ['3', 'A Adoção Global pela OMS e pelo Ministério da Saúde'],
        ['p', 'Em 1994, a Organização Mundial da Saúde (OMS) publicou os resultados de um gigantesco ensaio clínico multicêntrico conduzido em maternidades do Sudeste Asiático envolvendo mais de 35.000 parturientes. Esse ensaio demonstrou que a implementação universal do partograma reduziu significativamente o número de partos prolongados superiores a 18 horas de duração (queda de cerca de 50%), diminuiu a taxa de cesarianas de emergência e reduziu os índices de infecção pós-parto e natimortalidade. A partir dessa evidência incontestável, a OMS padronizou o modelo gráfico internacional do partograma e recomendou sua obrigatoriedade em todo o planeta.'],
        ['p', 'No Brasil, o Ministério da Saúde (MS) e a Federação Brasileira das Associações de Ginecologia e Obstetrícia (FEBRASGO) incorporaram formalmente o partograma nos Manuais Técnicos de Atenção ao Pré-natal e Parto. Mais do que uma recomendação de boa prática clínica, o partograma possui natureza <strong>médico-legal mandatória</strong>: nos termos da Resolução CFM nº 1.638/2002 e das portarias da Agência Nacional de Vigilância Sanitária (ANVISA), o partograma é componente obrigatório e indispensável do prontuário médico obstétrico em qualquer serviço hospitalar do país, seja público ou privado. A ausência do preenchimento do partograma em situações de litígio judicial relacionadas a asfixia perinatal, sofrimento fetal ou hemorragia intraparto costuma ser interpretada pelos tribunais como forte indício de negligência ou omissão de vigilância técnica contínua.']
      ]
    ],
    [
      'anatomia-grafica-eixos-simbologia',
      0,
      [
        ['2', '2. Anatomia Gráfica do Partograma: Eixos, Escalas e Simbologia Padronizada'],
        ['p', 'O modelo clássico de partograma adotado pelo Ministério da Saúde e pela OMS é estruturado em uma folha quadriculada padrão composta por vários compartimentos anatômicos inter-relacionados, concebidos para registrar simultaneamente a dinâmica cervical, a estática fetal e as condições biológicas maternas.'],
        ['3', 'O Grid Central: Eixo Vertical e Eixo Horizontal'],
        ['p', 'O coração do partograma reside no gráfico cartesiano principal de dilatação e descida:'],
        ['u', [
          '<strong>Eixo Vertical (Eixo das Ordenadas / Y):</strong> Representa duas grandezas clínicas fundamentais na mesma escala numérica de 0 a 10. Do lado esquerdo, mede a <strong>dilatação do colo uterino em centímetros (0 a 10 cm)</strong>. Paralelamente, mede a <strong>altura da apresentação fetal segundo os Planos de De Lee (-4 a +4 cm)</strong> ou, em alguns modelos históricos nacionais, segundo os Planos de Hodge (I, II, III e IV). Cada intervalo vertical de 1 centímetro no papel milimetrado corresponde a exatamente 1 cm de dilatação ou 1 cm de variação no plano de descida da apresentação fetal.',
          '<strong>Eixo Horizontal (Eixo das Abscissas / X):</strong> Representa o <strong>tempo decorrido em horas</strong>. O gráfico é subdividido em colunas verticais correspondentes às horas de observação (1 a 24 horas), sendo que cada quadrícula horizontal padrão equivale a exatamente <strong>1 hora</strong> (ou a 30 minutos nas versões subdivididas por meias horas). No rodapé das colunas de tempo, registra-se o horário cronológico real em que as avaliações foram efetuadas (por exemplo: 08:00, 09:00, 10:00, 11:00).'
        ]],
        ['3', 'Simbologia Obstétrica Padronizada e Normas de Plotagem'],
        ['p', 'Para evitar ambiguidades e permitir a leitura imediata por qualquer membro da equipe obstétrica e multidisciplinar, utilizam-se símbolos gráficos universais estritamente normatizados:'],
        ['u', [
          '<strong>Dilatação Cervical:</strong> Representada convencionalmente por um triângulo equilátero (&Delta;) ou por um círculo preenchido (&bull;), plotado exatamente na linha horizontal correspondente aos centímetros de dilatação verificados ao toque vaginal. Os pontos consecutivos de dilatação devem ser unidos por uma linha contínua, desenhando a curva de dilatação cervical.',
          '<strong>Altura e Descida da Apresentação Fetal:</strong> Representada convencionalmente por uma circunferência aberta (&Omicron;), por um sinal de adição (+) ou pela letra X, plotada na linha correspondente ao plano de De Lee atingido pelo ponto mais baixo da calota craniana (borda óssea, desconsiderando bossas serossanguíneas). Os pontos de altura são unidos por uma linha tracejada ou pontilhada, gerando a curva de descida fetal.',
          '<strong>Variedade de Posição da Apresentação:</strong> Registrada frequentemente acima ou ao lado do símbolo de altura fetal por meio do desenho esquemático da sutura sagital e das fontanelas (lambda e bregma) ou pelas siglas semiológicas padronizadas: OEA (occipito-esquerda anterior), ODA (occipito-direita anterior), OET (occipito-esquerda transversa), ODT (occipito-direita transversa), OEP (occipito-esquerda posterior), ODP (occipito-direita posterior), OP (occipito-púbica) ou OS (occipito-sacra).',
          '<strong>Bolsa das Águas e Aspecto do Líquido Amniótico:</strong> Registrado imediatamente abaixo do gráfico de dilatação com as siglas convencionais: <strong>I</strong> (membranas íntegras), <strong>R</strong> ou <strong>C</strong> (membranas rotas com líquido claro/transparente com grumos fisiológicos), <strong>M</strong> (líquido meconial fluido ou espesso, subdividido em +, ++ ou +++), <strong>S</strong> (líquido sanguinolento patológico, sugestivo de descolamento prematuro de placenta ou rotura de vasa prévia) e <strong>A</strong> (ausência de líquido visualizável).'
        ]],
        ['t', [
          'Parâmetro Gráfico',
          'Símbolo Convencional',
          'Significado Clínico',
          'Periodicidade Recomendada de Registro'
        ], [
          ['Dilatação cervical', 'Triângulo (&Delta;) ou Ponto (&bull;)', 'Abertura do orifício interno em cm (0 a 10)', 'A cada 2 a 4 horas (ou se mudança de conduta)'],
          ['Altura da apresentação', 'Círculo vazado (&Omicron;) ou Cruz (+)', 'Nível ósseo fetal em De Lee (-4 a +4 cm)', 'A cada 2 a 4 horas no mesmo toque vaginal'],
          ['Variedade de posição', 'Sigla (ex: OEA, ODT)', 'Relação do occipício com a bacia materna', 'Registrado junto com a altura fetal'],
          ['Estado das membranas', 'I / R / M / S / A', 'Íntegras, Rotas claras, Meconiais, Sanguinolentas', 'Avaliado a cada toque e inspecionado visualmente'],
          ['Frequência cardíaca fetal', 'Ponto na escala superior', 'FCF basal em bpm (110 a 160 normal)', 'A cada 15 a 30 min na fase ativa; a cada 5 min no expulsivo'],
          ['Dinâmica uterina', 'Quadrículas hachuradas', 'Número e duração das contrações em 10 min', 'A cada 30 a 60 minutos por palpação de 10 min']
        ], 'book-table'],
        ['3', 'Correlação Anatômica entre os Planos de De Lee e de Hodge'],
        ['p', 'Para a compreensão da altura fetal registrada no partograma, o aluno e o residente devem dominar a correlação anatômica entre os dois sistemas de planos obstétricos:'],
        ['p', 'O sistema de <strong>Planos de De Lee</strong> utiliza como marco zero anatômico absoluto a <strong>linha imaginária interespinhosa</strong> (nível das espinhas ciáticas ou isquiáticas da bacia materna). Quando a porção óssea mais avançada da calota craniana fetal tangencia a altura das espinhas ciáticas, considera-se que o diâmetro biparietal ultrapassou o estreito superior da bacia, configurando a <strong>insinuação fetal</strong>, classificada como <strong>plano 0 de De Lee</strong>. As distâncias acima das espinhas ciáticas são mensuradas em centímetros negativos (-1, -2, -3, -4 e -5 cm), e as distâncias abaixo das espinhas ciáticas são mensuradas em centímetros positivos (+1, +2, +3, +4 e +5 cm). O plano +4/+5 cm corresponde ao abaulamento e coroamento no introito perineal vulvar.'],
        ['p', 'O sistema clássico de <strong>Planos de Hodge</strong>, por sua vez, baseia-se em quatro planos teóricos paralelos entre si: o <strong>Primeiro Plano de Hodge</strong> estende-se do promontório sacral à borda superior da sínfise púbica (coincidindo com o estreito superior); o <strong>Segundo Plano de Hodge</strong> passa pela borda inferior da sínfise púbica; o <strong>Terceiro Plano de Hodge</strong> passa na altura das espinhas ciáticas (equivalente anatômico exato ao <strong>plano 0 de De Lee</strong>); e o <strong>Quarto Plano de Hodge</strong> passa pelo ápice do osso cóccix (equivalente ao <strong>plano +3/+4 de De Lee</strong>). Portanto, a correlação indispensável para qualquer prova é: <strong>Plano 0 de De Lee = III Plano de Hodge = Apresentação Insinuada</strong>.']
      ]
    ],
    [
      'criterios-abertura-fase-ativa',
      0,
      [
        ['2', '3. Critérios de Abertura do Partograma e Definição da Fase Ativa'],
        ['p', 'Um dos erros conceituais e práticos mais frequentes na assistência obstétrica — e causa primária de intervenções iatrogênicas e cesarianas abusivas — reside na abertura prematura do partograma durante a fase latente do trabalho de parto. A abertura do partograma deve ocorrer única e exclusivamente quando a parturiente ingressa na <strong>fase ativa franca do primeiro período do parto</strong>.'],
        ['3', 'A Fase Latente vs. Fase Ativa: Fisiologia e Cronologia'],
        ['p', 'A fase latente do trabalho de parto é o período no qual predominam as modificações bioquímicas do tecido conjuntivo cervical (remodelamento de colágeno, captação de água e amolecimento) associadas a contrações uterinas irregulares em intensidade e frequência. A dilatação cervical na fase latente evolui de maneira lenta, imprevisível e pode durar fisiologicamente 14 a 20 horas em nulíparas e 10 a 14 horas em multíparas, sem que isso represente qualquer anomalia ou sofrimento materno-fetal.'],
        ['p', 'Se o obstetra abrir o partograma durante a fase latente (por exemplo, com 2 ou 3 cm de dilatação) e aplicar as réguas de progressão horária da fase ativa (1 cm/h), o gráfico inevitavelmente cruzará as linhas de alerta e ação em poucas horas, gerando o falso diagnóstico de distócia e induzindo o uso intempestivo de ocitocina em altas doses, amniotomia precoce ou cesariana iatrogênica por falência de progressão em uma mulher que sequer havia iniciado o trabalho de parto ativo.'],
        ['3', 'Critérios Formais para Abertura do Partograma (Diretrizes MS, OMS e FEBRASGO)'],
        ['p', 'Para a abertura formal e legítima do partograma, é imperativo o preenchimento simultâneo de dois critérios clínicos obrigatórios:'],
        ['o', [
          '<strong>Critério de Dilatação Cervical:</strong> Presença de dilatação cervical igual ou superior a <strong>4 a 5 centímetros</strong> (a diretriz clássica da OMS e do MS previa &ge; 4 cm; as diretrizes mais recentes da OMS 2018 e da FEBRASGO recomendam fortemente o ponto de corte de <strong>5 cm</strong> para evitar confusão diagnóstica com fase latente prolongada), com colo uterino apagado (&ge; 50% a 70%), centralizado e de consistência amolecida.',
          '<strong>Critério de Dinâmica Uterina Efetiva:</strong> Presença de contrações uterinas coordenadas, rítmicas e dolorosas, na frequência mínima de <strong>2 a 3 contrações em 10 minutos</strong>, com duração palpável de pelo menos <strong>30 a 40 segundos</strong> cada.'
        ]],
        ['p', 'Somente quando a combinação desses dois fenômenos é confirmada pelo obstetra, realiza-se o primeiro registro gráfico. O momento do primeiro toque vaginal que constata a fase ativa marca o ponto zero no gráfico do partograma, plotando-se a dilatação cervical na linha correspondente à esquerda da folha.']
      ]
    ],
    [
      'linhas-alerta-acao-regras-registro',
      0,
      [
        ['2', '4. Linhas de Alerta e Ação: Construção, Racional Clínico e Regras de Registro'],
        ['p', 'As linhas de alerta e de ação constituem o instrumento visual diagnóstico do partograma de Philpott padronizado pela OMS. Elas estabelecem marcos temporais de segurança e fornecem um guia objetivo para a tomada de decisões clínicas.'],
        ['3', 'A Linha de Alerta: Traçado e Significado Fisiológico'],
        ['p', 'A <strong>Linha de Alerta</strong> é uma linha reta diagonal traçada a partir do primeiro registro gráfico na fase ativa (por exemplo, na interseção de 4 ou 5 cm de dilatação com a primeira hora de observação). A inclinação teórica da linha de alerta baseia-se na premissa fisiológica de uma velocidade média esperada de dilatação cervical de pelo menos <strong>1,0 cm por hora</strong>. Portanto, para cada hora avançada no eixo horizontal, a linha de alerta ascende exatamente 1 cm no eixo vertical, até alcançar a dilatação completa de 10 cm.'],
        ['p', 'Se a dilatação cervical da parturiente evoluir de maneira satisfatória, a curva real de dilatação permanecerá à <strong>esquerda da linha de alerta</strong> (indicando progressão rápida e desobstruída). Caso a dilatação cervical se torne lenta e o gráfico cruze a linha de alerta passando para o lado direito, acende-se o sinal de <strong>alerta clínico</strong>: a evolução do parto não está ideal e exige reavaliação minuciosa da pelve materna, do bem-estar fetal, da posição fetal e da contratilidade uterina, buscando causas tratáveis (como hipoatividade uterina ou discinesia).'],
        ['3', 'A Linha de Ação: O Intervalo Crítico de 4 Horas'],
        ['p', 'A <strong>Linha de Ação</strong> é traçada paralelamente à linha de alerta, posicionada exatamente <strong>4 horas à direita</strong> da linha de alerta. Por que exatamente 4 horas? Estudos prospectivos conduzidos por Philpott e validados pelo grande ensaio multicêntrico da OMS demonstraram que uma defasagem de até 4 horas em relação à linha de alerta em maternidades hospitalares é clinicamente segura e não acarreta aumento significativo de asfixia neonatal ou infecção intrauterina, desde que a vitalidade fetal esteja rigorosamente preservada. Esse intervalo de 4 horas proporciona uma janela de oportunidade essencial para que medidas corretivas conservadoras (como amniotomia, início de infusão de ocitocina e alívio da dor) façam efeito.'],
        ['p', 'No entanto, quando a curva real de dilatação <strong>atinge ou ultrapassa a linha de ação</strong>, esgotou-se o tempo aceitável para condutas expectantes. O alcance da linha de ação impõe uma <strong>ação resolutiva obrigatória</strong>: reavaliação obstétrica imediata por médico especialista com tomada de decisão definitiva — correção agressiva da dinâmica uterina ou, na suspeita de desproporção cefalopélvica, indicação imediata de interrupção pela via cesariana.']
      ]
    ],
    [
      'distocias-fase-ativa-prolongada',
      0,
      [
        ['2', '5. Fase Ativa Prolongada: Diagnóstico Gráfico, Etiologia e Conduta Baseada em Evidências'],
        ['p', 'As distócias de trabalho de parto diagnosticadas pelo partograma decorrem fundamentalmente de anormalidades nos três componentes clássicos do parto: o motor (contrações uterinas), o objeto (o feto) ou o trajeto (a pelve óssea e o canal de parto mole). A primeira grande distócia funcional do período de dilatação é a fase ativa prolongada.'],
        ['3', 'Definição e Caracterização Gráfica'],
        ['p', 'Define-se <strong>fase ativa prolongada</strong> como a progressão anormalmente lenta da dilatação cervical durante a fase ativa do trabalho de parto, com velocidade inferior a <strong>1,0 cm por hora</strong>. No partograma, essa alteração manifesta-se de forma inconfundível: a curva de dilatação cervical sobe de maneira muito suave e achatada, <strong>cruza a linha de alerta</strong> e ingressa na faixa de segurança compreendida entre a linha de alerta e a linha de ação, sem contudo ter havido estagnação total.'],
        ['3', 'Etiopatogenia Principal: A Hipossistolia Uterina'],
        ['p', 'A causa etiológica mais prevalente da fase ativa prolongada é a <strong>hipoatividade uterina primária ou secundária</strong> (hipossistolia ou bradissistolia), caracterizada por contrações débeis (intensidade menor que 30 mmHg), curtas (duração inferior a 30 segundos) e infrequentes (apenas 1 ou 2 contrações a cada 10 minutos). Outra causa comum é a <strong>discinesia uterina</strong> (incoordenação das contrações com perda do tríplice gradiente descendente). Em menor número de casos, a fase ativa prolongada pode representar o primeiro sinal sutil de um vício pélvico discreto ou de uma má atitude fetal (deflexões de primeiro grau ou variedades posteriores).'],
        ['3', 'Manejo Clínico Estruturado e Condutas Proibidas'],
        ['p', 'O manejo da fase ativa prolongada não consiste na indicação imediata de cesariana, mas sim na correção ativa do motor uterino através de uma sequência padronizada de intervenções:'],
        ['o', [
          '<strong>Amniotomia Artificial:</strong> Se as membranas ovulares estiverem íntegras e a apresentação fetal estiver bem adaptada ao colo uterino, realiza-se a ruptura artificial das membranas (amniotomia). A saída do líquido amniótico reduz o diâmetro do cilindro uterino, aumenta a aposição do polo cefálico fetal contra o segmento inferior e os receptores cervicais (reflexo de Ferguson) e estimula a síntese e liberação local de prostaglandinas endógenas pela decídua, regularizando o padrão contrátil em mais de 60% a 70% dos casos.',
          '<strong>Ocitocina Exógena em Infusão Contínua:</strong> Caso a amniotomia não restabeleça uma dinâmica uterina adequada (3 a 4 contrações em 10 minutos durando 40 a 50 segundos) após 1 a 2 horas de observação, inicia-se a infusão intravenosa controlada de ocitocina em bomba de infusão contínua em doses baixas escalonadas (iniciando em 2 a 4 mUI/min e titulando a cada 20 a 30 minutos).',
          '<strong>Suporte Materno e Não Farmacológico:</strong> Incentivo à deambulação, mudanças frequentes de postura corporal, imersão em água morna ou analgesia peridural quando a dor intensa estiver gerando liberação excessiva de catecolaminas (adrenalina), que sabidamente atua nos receptores &beta;2-adrenérgicos do miométrio inibindo as contrações fisiológicas.'
        ]]
      ]
    ],
    [
      'distocias-parada-secundaria-dilatacao',
      0,
      [
        ['2', '6. Parada Secundária da Dilatação: Diferenciação entre Hipossistolia e Desproporção Cefalopélvica'],
        ['p', 'A parada secundária da dilatação constitui uma das alterações mais críticas registradas no partograma e uma das que mais exigem raciocínio clínico refinado para diferenciar distócia funcional corrigível de obstrução mecânica intransponível.'],
        ['3', 'Definição e Critérios Diagnósticos Estritos'],
        ['p', 'Define-se <strong>parada secundária da dilatação</strong> quando a dilatação cervical permanece <strong>absolutamente inalterada em dois toques vaginais sucessivos realizados com intervalo mínimo de 2 horas</strong> durante a fase ativa do trabalho de parto. No partograma, o traçado de dilatação torna-se uma linha horizontal perfeita, paralela ao eixo do tempo, com inclinação zero.'],
        ['3', 'O Raciocínio Diagnóstico Diferencial: Motor vs. Obstrução Mecânica'],
        ['p', 'Diante de uma parada secundária da dilatação, o obstetra deve imediatamente avaliar o padrão da dinâmica uterina materna para definir o diagnóstico etiológico:'],
        ['u', [
          '<strong>Cenário A — Contrações Uterinas Insuficientes (Hipoatividade Uterina):</strong> A paciente apresenta dinâmica ineficaz (ex.: 1 ou 2 contrações fracas de 25 segundos em 10 minutos). A causa da parada é simplesmente a falta de motor. <strong>Conduta:</strong> Realizar amniotomia (se membranas íntegras) e iniciar infusão de ocitocina intravenosa. A reavaliação é programada para 2 a 4 horas após a obtenção de padrão contrátil adequado (3 a 5 contrações em 10 minutos).',
          '<strong>Cenário B — Contrações Uterinas Fortes e Eficientes (Suspeita Elevada de Desproporção Cefalopélvica - DCP):</strong> A paciente já apresenta excelente dinâmica uterina (4 a 5 contrações intensas e prolongadas em 10 minutos), o colo uterino não dilata há mais de 2 horas e o polo cefálico fetal permanece alto ou estacionado. Esse achado é altamente sugestivo de <strong>Desproporção Cefalopélvica (DCP)</strong> ou de variedade transversa/posterior impactada. Ao toque vaginal minucioso, encontram-se frequentemente <strong>cavalgamento acentuado de ossos cranianos fetais (++ ou +++)</strong>, edema de bordo cervical e formação de <strong>bossa serossanguínea exuberante (caput succedaneum)</strong>, indicando sofrimento mecânico da calota craniana contra a bacia óssea. <strong>Conduta:</strong> NUNCA aumentar a dose de ocitocina nessa situação; a conduta mandante é a <strong>indicação imediata de parto cirúrgico cesariano</strong> para prevenir a rotura uterina e o anel de Bandl-Frommel.'
        ]],
        ['t', [
          'Aspecto Avaliado',
          'Parada Secundária por Hipossistolia',
          'Parada Secundária por Desproporção Cefalopélvica (DCP)'
        ], [
          ['Dinâmica uterina ao toque', 'Fraca, 1 a 2 contrações curtas em 10 min', 'Forte e coordenada, 4 a 5 contrações em 10 min'],
          ['Altura fetal (De Lee)', 'Geralmente alta, móvel ou frouxa', 'Impactada no estreito superior ou médio'],
          ['Cavalgamento ósseo fetal', 'Ausente ou discreto (+/4)', 'Acentuado (++/4 a +++/4) irredutível'],
          ['Bossa serossanguínea', 'Ausente ou mínima', 'Exuberante, mascarando a sutura sagital'],
          ['Edema de colo uterino', 'Ausente; bordos finos e moles', 'Presente; colo espessado e doloroso'],
          ['Resposta à ocitocina', 'Evolução favorável com retomada da dilatação', 'Inalterada; risco catastrófico de rotura uterina'],
          ['Conduta obstétrica definitiva', 'Ocitocina IV + Amniotomia + Observar', 'Indicação imediata de Cesariana de urgência']
        ], 'book-table']
      ]
    ],
    [
      'distocias-periodo-pelvico-descida',
      0,
      [
        ['2', '7. Distócias do Período Expulsivo: Período Pélvico Prolongado e Parada Secundária da Descida'],
        ['p', 'O segundo período do trabalho de parto (período expulsivo) inicia-se no momento exato em que a dilatação cervical atinge 10 centímetros (dilatação completa) e termina com o desprendimento total do concepto. As distócias que ocorrem nessa fase relacionam-se à mecânica de descida fetal pela pelve óssea e musculatura do assoalho perineal.'],
        ['3', 'Período Pélvico Prolongado'],
        ['p', 'O <strong>período pélvico prolongado</strong> define-se quando a dilatação cervical completa (10 cm) foi alcançada, a descida da apresentação fetal ocorre de maneira contínua e progressiva, porém a uma velocidade excessivamente lenta, ultrapassando os limites temporais fisiológicos esperados para o segundo período:'],
        ['u', [
          'Em <strong>nulíparas sem analgesia de parto:</strong> duração superior a <strong>2 horas</strong> (ou superior a <strong>3 horas</strong> se sob analgesia peridural contínua);',
          'Em <strong>multíparas sem analgesia de parto:</strong> duração superior a <strong>1 hora</strong> (ou superior a <strong>2 horas</strong> se sob analgesia peridural contínua).'
        ]],
        ['p', 'A etiopatogenia relaciona-se à exaustão muscular materna, sedação excessiva por bloqueio peridural motor que reduz o tônus muscular dos puxos reflexos espontâneos ou resistência elástica perineal acentuada. O manejo inclui correção de dinâmica com ocitocina, mudanças para posições verticalizadas (cócoras, semi-sentada) e assistência ativa nos puxos coordenados. Se as condições fetais permitirem e a descida prosseguir, aguarda-se o parto espontâneo com monitorização contínua da FCF.'],
        ['3', 'Parada Secundária da Descida'],
        ['p', 'A <strong>parada secundária da descida</strong> é uma entidade obstétrica grave definida pela <strong>cessação completa da descida fetal por pelo menos 1 hora em multíparas ou 2 horas em nulíparas</strong> após o início dos puxos ativos com dilatação cervical de 10 cm confirmada. No gráfico do partograma, a curva de descida da apresentação fetal (símbolo &Omicron;) torna-se uma linha horizontal estagnada em um mesmo plano de De Lee por dois toques consecutivos.'],
        ['p', 'A causa etiológica primária da parada secundária da descida é a <strong>Desproporção Cefalopélvica ao nível do estreito médio ou inferior</strong> da bacia, frequentemente provocada por <strong>variedades posteriores persistentes</strong> (occipito-sacra ou occipito-posterior que falharam na rotação interna para anterior) ou <strong>assinclitismos acentuados</strong> (assinclitismo anterior de Naegele ou posterior de Litzmann) associados a espinhas ciáticas proeminentes e ângulo subpúbico estreito. O obstetra deve determinar a altura exata do polo cefálico: se a cabeça fetal estiver profundamente insinuada e baixa (plano &ge; +2 de De Lee), bacia compatível e operador experiente, o parto operatório vaginal (fórcipe de tração e rotação) pode ser viável; caso contrário, a cesariana imediata é mandatória.']
      ]
    ],
    [
      'distocias-parto-taquitocico-precipitado',
      0,
      [
        ['2', '8. Parto Taquitócico ou Precipitado: Riscos Maternos, Fetais e Manejo Imediato'],
        ['p', 'Na extremidade oposta das distócias por parada mecânica, encontra-se o <strong>parto taquitócico (ou trabalho de parto precipitado)</strong>, caracterizado por uma velocidade evolutiva anormalmente acelerada que culmina no nascimento em um intervalo de tempo excessivamente curto.'],
        ['3', 'Definição e Manifestação no Partograma'],
        ['p', 'Define-se parto taquitócico quando a duração total do trabalho de parto ativo — desde o início da fase ativa (4 a 5 cm) até a expulsão completa do feto — ocorre em <strong>menos de 2 a 3 horas</strong> (em geral menos de 2 horas em multíparas ou menos de 3 horas em nulíparas). No partograma, o traçado gráfico assume um perfil quase vertical, com a curva de dilatação ascendendo abruptamente a 4 a 5 cm por hora, muito à esquerda da linha de alerta, associada à descida fetal instantânea.'],
        ['3', 'Fisiopatologia da Hipersistolia e Taquissistolia'],
        ['p', 'O parto taquitócico é movido por uma hiperatividade contrátil miometrial desregulada, apresentando <strong>taquissistolia</strong> (mais de 5 contrações em 10 minutos), <strong>hipersistolia</strong> (intensidade &gt; 50-60 mmHg) e <strong>hipertonia uterina</strong> (tônus basal de repouso elevado &gt; 12-15 mmHg sem relaxamento completo entre as contrações). Pode decorrer de hipersensibilidade intrínseca dos receptores de ocitocina miometriais, uso abusivo ou iatrogênico de agentes uterotônicos (ocitocina em altas doses sem bomba de infusão ou doses inadequadas de misoprostol) e baixa resistência dos tecidos moles do canal de parto em multíparas.'],
        ['3', 'Riscos e Complicações Maternas e Neonatais Graves'],
        ['p', 'Embora leigos frequentemente considerem um parto muito rápido como um evento positivo, o parto taquitócico acarreta graves consequências clínicas:'],
        ['u', [
          '<strong>Complicações Maternas Graves:</strong> Lacerações extensas do trajeto genital (lacerações perineais de 3º e 4º graus com lesão do esfíncter anal e mucosa retal, lacerações de colo uterino em bordo de xícara e hematomas retroperitoneais volumosos); risco acentuado de <strong>rotura uterina catastrófica</strong> (especialmente se houver cicatriz uterina prévia oculta); <strong>atonia uterina puerperal imediata</strong> decorrente da exaustão bioquímica do miométrio após trabalho muscular anaeróbico excessivo, configurando uma das causas mais prevalentes de choque hemorrágico pós-parto; e embolia de líquido amniótico facilitada pela hiperpressão intramiometrial.',
          '<strong>Complicações Fetais e Neonatais Graves:</strong> <strong>Asfixia perinatal aguda intraparto:</strong> como o fluxo sanguíneo útero-placentário no espaço interviloso é completamente interrompido durante cada contração uterina que ultrapassa 30 mmHg, a taquissistolia sem intervalo de relaxamento impede a reoxigenação hemoglobínica do sangue fetal, provocando acidose respiratória e metabólica rápida; <strong>traumatismo craniano fetal e hemorragia intracraniana</strong> (hemorragia subdural e intraventricular) decorrentes do choque repetido e violento do polo cefálico contra o assoalho pélvico sem tempo biológico para a moldagem óssea gradual; e descompressão cefálica súbita ao nascimento.'
        ]],
        ['3', 'Conduta Médica Imediata'],
        ['p', 'Diante de um trabalho de parto taquitócico com hipertonia ou taquissistolia identificada, as medidas imediatas incluem:'],
        ['o', [
          '<strong>Suspensão imediata de qualquer uterotônico:</strong> Desligar instantaneamente a bomba de infusão de ocitocina exógena se estiver em uso;',
          '<strong>Tocolítico de Resgate Imediato:</strong> Administrar agente tocolítico de ação rápida para interromper a tempestade contrátil e permitir a reperfusão placentária. O fármaco de primeira escolha é a <strong>Terbutalina</strong> por via subcutânea na dose de 0,25 mg (ou salbutamol IV ou nitroglicerina sublingual/IV em serviços terciários);',
          '<strong>Ressuscitação Intrauterina:</strong> Colocar a parturiente em decúbito lateral esquerdo estrito (para descompressão da veia cava inferior e melhora do débito cardíaco materno), ofertar oxigenoterapia com máscara facial e iniciar hidratação intravenosa vigorosa com solução cristaloide;',
          '<strong>Preparo para Hemorragia Pós-Parto:</strong> Manter veias calibrosas puncionadas, garantir sangue tipado no banco de sangue e realizar manejo ativo do terceiro período com 10 UI de ocitocina intramuscular no desprendimento do ombro anterior, além de inspeção minuciosa de todo o canal de parto com valvas ginecológicas após a dequitação.'
        ]]
      ]
    ],
    [
      'vigilancia-fetal-dinamica-partograma',
      0,
      [
        ['2', '9. Monitorização Materna e Fetal Integrada ao Gráfico: FCF, Dinâmica Uterina e Líquido Amniótico'],
        ['p', 'O partograma não é apenas um gráfico mecânico de dilatação e descida; ele integra simultaneamente a vigilância hemodinâmica materna e o bem-estar fetal em compartimentos específicos organizados de cima para baixo.'],
        ['3', 'Vigilância da Frequência Cardíaca Fetal (FCF)'],
        ['p', 'No topo do partograma situa-se o compartimento de registro da <strong>Frequência Cardíaca Fetal basal</strong>, graduado em batimentos por minuto de 80 a 200 bpm. A ausculta intermitente da FCF deve ser realizada com sonar Doppler ou estetoscópio de Pinard imediatamente após o término de uma contração uterina (para detectar desacelerações tardias), com a seguinte periodicidade mínima recomendada:'],
        ['u', [
          'Na <strong>fase ativa do primeiro período:</strong> auscultar a cada <strong>15 a 30 minutos</strong> por 60 segundos completos;',
          'No <strong>segundo período (período expulsivo):</strong> auscultar a cada <strong>5 minutos</strong> ou após cada puxo materno.'
        ]],
        ['p', 'A FCF basal normal situa-se estritamente entre <strong>110 e 160 bpm</strong>. Valores abaixo de 110 bpm configuram bradicardia fetal (sendo &lt; 100 bpm indicativo de asfixia grave iminente), e valores acima de 160 bpm por mais de 10 minutos configuram taquicardia fetal ( frequentemente secundária a corioamnionite, febre materna, desidratação, drogas simpaticomiméticas ou hipóxia precoce compensatória).'],
        ['3', 'Registro Gráfico da Dinâmica Uterina'],
        ['p', 'Abaixo do grid de dilatação, encontra-se a faixa quadriculada de registro da contratilidade uterina, composta por 5 quadrículas verticais que representam o número de contrações a cada 10 minutos. O preenchimento das quadrículas segue a convenção internacional de duração temporal das contrações:'],
        ['u', [
          '<strong>Contração Leve (Duração &lt; 20 segundos):</strong> Preenchimento da quadrícula apenas com pontilhado leve;',
          '<strong>Contração Moderada (Duração de 20 a 40 segundos):</strong> Preenchimento da quadrícula com linhas diagonais hachuradas;',
          '<strong>Contração Forte (Duração &gt; 40 segundos):</strong> Preenchimento total e sólido (enegrecido) da quadrícula.'
        ]],
        ['3', 'Monitorização Hemodinâmica Materna'],
        ['p', 'No rodapé do partograma, registram-se a pressão arterial materna (a cada 2 a 4 horas em baixo risco ou a cada 15 a 30 minutos em hipertensas), o pulso materno (a cada 1 a 2 horas), a temperatura axilar (a cada 2 horas para detecção precoce de corioamnionite em bolsa rota), a diurese, a pesquisa de cetonúria/proteinúria em fita reagente e a administração detalhada de medicamentos, hidratação venosa e infusão de ocitocina com dosagem exata em gotas/min ou mL/h em bomba de infusão.']
      ]
    ],
    [
      'transicao-oms-labour-care-guide',
      0,
      [
        ['2', '10. O Novo Labour Care Guide (LCG) da OMS: Superação do Limiar Fixo de 1 cm/h e Humanização'],
        ['p', 'Durante mais de 40 anos, o partograma de Philpott baseado no limiar fixo de dilatação de 1,0 cm por hora serviu de padrão mundial. Contudo, nas últimas duas décadas, grandes pesquisas epidemiológicas contemporâneas — destacando-se o estudo do consórcio norte-americano de Zhang et al. (2010) e os estudos multicêntricos da OMS com dezenas de milhares de mulheres — revelaram que a progressão fisiológica do parto é consideravelmente mais lenta do que Friedman e Philpott postularam.'],
        ['3', 'As Evidências Científicas que Derrubaram o Limiar Fixo de 1 cm/hora'],
        ['p', 'Os dados científicos modernos demonstraram que uma velocidade de dilatação de <strong>0,5 cm por hora pode ser perfeitamente fisiológica</strong> e compatível com excelente desfecho neonatal em nulíparas hígidas. Além disso, a fase ativa franca acelera-se mais tardiamente, frequentemente a partir dos <strong>5 centímetros</strong> de dilatação, e não dos 3 ou 4 cm. Como consequência direta, a imposição dogmática da linha de alerta clássica de 1 cm/h vinha classificando milhares de partos fisiológicos como "patológicos", impulsionando intervenções desnecessárias, toques vaginais repetidos com risco infeccioso e taxas desmedidas de cesariana.'],
        ['3', 'Apresentação do NextGen Labour Care Guide (LCG) da OMS (2018-2024)'],
        ['p', 'Em resposta a essas evidências, a Organização Mundial da Saúde publicou em 2018 a diretriz global sobre cuidados intraparto e lançou em 2020 o <strong>Labour Care Guide (LCG)</strong>, endossado no Brasil pela FEBRASGO e pelo Ministério da Saúde. O LCG não é apenas uma atualização gráfica; trata-se de uma verdadeira mudança de paradigma obstétrico:'],
        ['u', [
          '<strong>Abolição das Linhas Rígidas de Alerta e Ação Arbitrárias:</strong> O LCG aboliu o desenho da linha de alerta fixa de 1 cm/h. Em seu lugar, adota colunas com <strong>limiares de alerta baseados em tempo individualizado</strong> conforme a paridade e a dilatação inicial;',
          '<strong>Início da Fase Ativa aos 5 cm:</strong> Estabelece consensualmente os <strong>5 centímetros</strong> como marco universal para início da fase ativa;',
          '<strong>Registro Obrigatório da Experiência Positiva do Parto:</strong> O LCG possui uma seção dedicada e pioneira para avaliar o <strong>bem-estar emocional materno</strong>, presença de acompanhante de livre escolha garantido por lei, alívio não farmacológico e farmacológico da dor, ingestão de líquidos/dieta leve e respeito à autonomia e posições de escolha da mulher;',
          '<strong>Seção de Resposta Clínica Integrada:</strong> Em vez de apenas traçar um alerta gráfico, o profissional deve registrar explicitamente a ação clínica adotada e a justificativa para qualquer intervenção ou decisão de aguardar.'
        ]],
        ['t', [
          'Aspecto Técnico',
          'Partograma Clássico da OMS (1994)',
          'NextGen Labour Care Guide (LCG) da OMS (2020-2026)'
        ], [
          ['Início da fase ativa', '4 centímetros de dilatação cervical', '5 centímetros de dilatação cervical'],
          ['Velocidade mínima de dilatação', '1,0 cm/hora obrigatório para todas', 'Flexível; reconhece variações de até 0,5 cm/h'],
          ['Linhas de Alerta e Ação', 'Retas desenhadas no gráfico a cada 4 horas', 'Colunas de tempo limite sem linhas diagonais fixas'],
          ['Foco da ferramenta', 'Predominantemente mecânico e temporal', 'Integrado: clínico, fetal e experiência materna'],
          ['Acompanhante e alívio da dor', 'Não contemplados no gráfico padrão', 'Registro obrigatório e contínuo no formulário'],
          ['Ingestão oral no parto', 'Tradicionalmente restrita / jejum', 'Incentivo explícito a líquidos e dieta leve'],
          ['Impacto nas taxas de cesárea', 'Risco de cesariana iatrogênica por falso alerta', 'Redução segura de cesarianas por falsa distócia']
        ], 'book-table']
      ]
    ],
    [
      'casos-clinicos-integradores',
      0,
      [
        ['2', '11. Casos Clínicos Resolvidos com Análise Minuciosa do Partograma'],
        ['p', 'A seguir, são apresentados quatro casos clínicos estruturados com complexidade progressiva, refletindo situações frequentes da rotina hospitalar e de provas práticas e teóricas de residência médica.'],
        ['3', 'Caso Clínico 1: Nulípara com Fase Ativa Lenta e Cruzamento da Linha de Alerta'],
        ['p', '<strong>Identificação e História:</strong> Primigesta de 24 anos, 39 semanas e 4 dias de gestação calculada por ultrassonografia de primeiro trimestre, internada em maternidade terciária com queixa de contrações dolorosas. Exame de admissão (08:00): colo uterino 100% apagado, centrado, dilatação de 5 cm, apresentação cefálica fletida em plano -2 de De Lee, membranas ovulares íntegras. Dinâmica uterina: 2 contrações fracas de 25 segundos a cada 10 minutos. FCF basal: 136 bpm com boa variabilidade. O partograma foi aberto às 08:00 com 5 cm.'],
        ['p', '<strong>Evolução às 10:00 (2 horas após):</strong> Toque vaginal revela colo com 6 cm de dilatação, apresentação cefálica mantida em plano -2 de De Lee, membranas íntegras. Dinâmica uterina: 2 contrações moderadas de 30 segundos em 10 minutos. FCF: 140 bpm. O traçado gráfico de dilatação cruzou a linha de alerta, posicionando-se à sua direita.'],
        ['p', '<strong>Evolução às 12:00 (4 horas após abertura):</strong> Toque vaginal revela dilatação de 7 cm, altura em -1 de De Lee. Dinâmica: 2 contrações de 30 segundos em 10 minutos. A curva de dilatação aproxima-se da linha de ação.'],
        ['p', '<strong>Discussão Diagnóstica e Conduta Passo a Passo:</strong> Trata-se do diagnóstico clássico de <strong>fase ativa prolongada</strong> por hipoatividade uterina secundária (progressão de apenas 2 cm em 4 horas, velocidade de 0,5 cm/h). Não há critérios para desproporção cefalopélvica, pois o colo continuou dilatando lentamente e a apresentação descendeu para -1 de De Lee sem cavalgamento ósseo. A conduta correta imediata consiste em: 1) Realizar amniotomia artificial com autorização da paciente para avaliar o aspecto do líquido e potencializar as contrações; 2) Se em 1 hora a dinâmica não alcançar 3 a 4 contrações em 10 minutos com duração &gt; 40 segundos, iniciar infusão de ocitocina em bomba de infusão contínua em dose baixa escalonada (2 mUI/min); 3) Proporcionar métodos não farmacológicos de alívio da dor e liberdade de posição. A indicação de cesariana nessa fase é absolutamente contraindicada e errônea.'],
        ['3', 'Caso Clínico 2: Secundigesta com Parada Secundária da Dilatação por Desproporção Cefalopélvica'],
        ['p', '<strong>Identificação e História:</strong> Secundigesta de 28 anos, 1 parto vaginal prévio há 3 anos (RN com 3.100 g), idade gestacional de 40 semanas. Partograma aberto às 14:00 quando apresentava 6 cm de dilatação, colo 80% apagado, apresentação cefálica no plano 0 de De Lee, membranas rotas com líquido amniótico claro há 1 hora, dinâmica uterina de 3 contrações de 40 segundos em 10 minutos. FCF: 144 bpm.'],
        ['p', '<strong>Evolução às 16:00:</strong> Ao toque vaginal, a dilatação permanece em 8 cm, altura fetal no plano 0 de De Lee, dinâmica excelente com 4 contrações de 45 segundos em 10 minutos. FCF: 138 bpm.'],
        ['p', '<strong>Evolução às 18:00:</strong> Novo toque vaginal realizado 2 horas após: dilatação permanece estritamente em <strong>8 cm</strong> (inalterada há 2 horas completas). A apresentação fetal continua rigorosamente no plano 0 de De Lee. A dinâmica uterina é espontaneamente muito vigorosa: 5 contrações fortes de 50 segundos em 10 minutos. Ao exame cuidadoso da calota craniana fetal, palpa-se cavalgamento ósseo importante dos parietais (+++/4), edema acentuado de bordo cervical anterior e grande bossa serossanguínea que impede a identificação nítida da fontanela posterior. A parturiente queixa-se de dor excruciante no segmento inferior uterino.'],
        ['p', '<strong>Discussão Diagnóstica e Conduta Passo a Passo:</strong> Configura-se o diagnóstico incontestável de <strong>parada secundária da dilatação por Desproporção Cefalopélvica (DCP)</strong> real. O motor uterino é supereficiente (5 contrações fortes em 10 min), porém a dilatação não progrediu por 2 horas e a apresentação fetal impactou no plano 0 de De Lee com cavalgamento ósseo acentuado e caput exuberante. A prescrição de ocitocina ou a manutenção da conduta expectante neste cenário constitui imperícia médica gravíssima, sob risco iminente de rotura uterina (síndrome de Bandl-Frommel). A conduta mandatória e imediata é a <strong>interrupção do trabalho de parto por via Cesariana de emergência</strong>, com comunicação detalhada à equipe cirúrgica e pediátrica.'],
        ['3', 'Caso Clínico 3: Multípara com Parto Taquitócico e Risco de Atonia Uterina'],
        ['p', '<strong>Identificação e História:</strong> Multigesta (G4P3), 32 anos, 3 partos normais prévios sem intercorrências, admitida em centro obstétrico às 19:00 com contrações intensas e frequentes iniciadas há 1 hora. Exame de admissão: colo uterino com 5 cm de dilatação, 80% apagado, polo cefálico no plano -1 de De Lee, bolsa íntegra tensa. O partograma é aberto às 19:00 com registro de 5 cm.'],
        ['p', '<strong>Evolução às 20:00 (apenas 1 hora após):</strong> A paciente refere sensação incontrolável de puxo involuntário. Ao exame: dilatação total de 10 cm, bolsa rota espontaneamente com líquido amniótico claro abundante, polo cefálico no plano +3 de De Lee, em coroamento vulvar. O nascimento ocorre às 20:15 por via vaginal sem necessidade de instrumentação (duração total da fase ativa até o parto: 1 hora e 15 minutos). Recém-nascido vigoroso, chorando, Apgar 9/10, peso de 3.650 g.'],
        ['p', '<strong>Intercorrência Imediata no Terceiro Período:</strong> Após a dequitação placentária completa às 20:25 por tração controlada do cordão umbilical, a paciente apresenta sangramento vaginal maciço em jato com coágulos abundantes. Ao exame físico abdominal, o fundo uterino encontra-se flácido, amolecido, ultrapassando a cicatriz umbilical.'],
        ['p', '<strong>Discussão Diagnóstica e Conduta Passo a Passo:</strong> Trata-se de <strong>parto taquitócico (precipitado)</strong> complicado por <strong>atonia uterina puerperal pós-parto</strong>. A hiperatividade miometrial severa exauriu os estoques intracelulares de trifosfato de adenosina (ATP) e cálcio das fibras musculares lisas do miométrio, impedindo a ligadura viva de Pinard imediata. Conduta emergencial conforme o protocolo de Hemorragia Pós-Parto (HPP): 1) Massagem uterina bimanual imediata (manobra de Hamilton); 2) Ocitocina IV em bólus inicial e infusão rápida (20 a 40 UI em 500 mL de Ringer lactato); 3) Administração concomitante de Ácido Tranexâmico 1 g IV nas primeiras 3 horas; 4) Fármacos uterotônicos de segunda linha se refratário: Metilergonovina 0,2 mg IM (se normotensa) e Misoprostol 800 mcg retal; 5) Se persistir hipotonia, tamponamento intrauterino com balão de Bakri antes de medidas cirúrgicas descompressivas.'],
        ['3', 'Caso Clínico 4: Nulípara em Período Expulsivo com Parada Secundária da Descida'],
        ['p', '<strong>Identificação e História:</strong> Primigesta de 21 anos, 40 semanas e 2 dias, em trabalho de parto assistido em maternidade pública sob analgesia combinada raqui-peridural. Atingiu dilatação total de 10 cm às 10:00, com apresentação fetal em vértice no plano +1 de De Lee em variedade occipito-esquerda transversa (OET). Membranas rotas há 3 horas com líquido amniótico claro. Iniciou puxos maternos orientados durante as contrações.'],
        ['p', '<strong>Evolução às 11:30:</strong> Após 1 hora e 30 minutos de puxos ativos regulares, o toque vaginal revela apresentação fetal mantida exatamente no plano +1 de De Lee, persistindo em variedade transversa (OET). FCF monitorizada por cardiotocografia com linha de base em 130 bpm, variabilidade de 10 bpm, ausência de desacelerações patológicas.'],
        ['p', '<strong>Evolução às 12:30:</strong> Decorridas 2 horas e 30 minutos de período expulsivo com puxos eficientes e dinâmica sustentada de 4 contrações em 10 minutos com suporte de ocitocina, o toque vaginal confirma: polo cefálico estagnado no <strong>plano +1 de De Lee</strong>, sem rotação interna (mantém-se em OET), com presença de caput succedaneum moderado e cavalgamento leve (+/4). A paciente demonstra fadiga física extrema.'],
        ['p', '<strong>Discussão Diagnóstica e Conduta Passo a Passo:</strong> Configura-se o quadro de <strong>parada secundária da descida no período expulsivo</strong> associada a <strong>falha de rotação interna da apresentação fetal (variedade transversa persistente)</strong>. Na nulípara sob analgesia de parto, o limite máximo tolerável de período expulsivo com puxos é de 3 horas; contudo, a completa falta de progressão entre 10:00 e 12:30 (&gt; 2 horas de parada de descida em plano +1) define a distócia. Como a cabeça fetal encontra-se ainda no plano +1 de De Lee (acima da altura de segurança +2 para aplicação de fórcipe de tração simples por médicos gerais), o desprendimento instrumental por vácuo ou fórcipe baixo não é prudente sem treinamento especializado em fórcipe rotador de Kielland. A conduta mais segura e padronizada para prevenir asfixia fetal e sofrimento materno é a <strong>indicação de cesariana</strong>, preparando-se para a extração de cabeça fetal impactada no canal de parto (técnica do empurrão reverso vaginal ou extração pélvica invertida de Patwardhan).']
      ]
    ],
    [
      'questoes-comentadas-residencia',
      0,
      [
        ['2', '12. Questões de Concursos e Residência Médica com Comentários Exaustivos'],
        ['p', 'Para consolidar o aprendizado e dominar as pegadinhas mais recorrentes nos concursos de Acesso Direto para Residência Médica e no Exame Nacional de Revalidação de Diplomas Médicos (Revalida/ENAMED), apresentamos questões minuciosamente comentadas alternativa por alternativa.'],
        ['3', 'Questão 1: Conceito e Traçado das Linhas do Partograma (ENAMED / Revalida INEP)'],
        ['p', 'Parturiente primigesta de 22 anos, com 39 semanas de gestação, encontra-se internada em trabalho de parto espontâneo. O partograma foi aberto no momento em que ela apresentava 5 cm de dilatação cervical e contrações rítmicas coordenadas. A respeito da construção e do significado clínico das Linhas de Alerta e Ação no partograma preconizado pelo Ministério da Saúde e OMS, assinale a alternativa CORRETA:'],
        ['o', [
          'A) A linha de alerta é desenhada como uma reta horizontal a partir do primeiro registro na fase ativa, indicando a dilatação máxima que o colo deve atingir.',
          'B) A linha de alerta possui inclinação calculada para uma velocidade teórica de dilatação cervical de 1,0 cm por hora, e a linha de ação é traçada paralelamente 4 horas à sua direita.',
          'C) Quando a curva real de dilatação cruza a linha de alerta, está indicada imediatamente a realização de cesariana de emergência por desproporção cefalopélvica.',
          'D) A linha de ação deve ser traçada 2 horas à direita da linha de alerta nas nulíparas e 4 horas nas multíparas, devido à maior rapidez do parto nestas últimas.',
          'E) O partograma deve ser obrigatoriamente iniciado durante a fase latente, logo que a paciente relate as primeiras cólicas com 2 cm de dilatação.'
        ]],
        ['p', '<strong>Gabarito Comentado: Alternativa B.</strong>'],
        ['p', '<em>Análise detalhada dos distratores:</em><br>' +
          '• A alternativa A está incorreta: a linha de alerta é uma reta diagonal ascendente com velocidade de 1 cm/h, e não uma reta horizontal.<br>' +
          '• A alternativa B está <strong>CORRETA</strong>: a linha de alerta inicia-se no ponto de abertura na fase ativa com velocidade de progressão teórica de 1 cm por hora. A linha de ação é traçada paralela e 4 horas à direita da linha de alerta no modelo padrão da OMS e Ministério da Saúde.<br>' +
          '• A alternativa C está incorreta: o cruzamento da linha de alerta é um sinal de advertência que exige reavaliação clínica, suporte e eventuais correções da dinâmica (amniotomia, ocitocina), e NUNCA indicação automática de cesariana.<br>' +
          '• A alternativa D está incorreta: no partograma da OMS, a linha de ação é universalmente posicionada a 4 horas da linha de alerta, independentemente da paridade materna.<br>' +
          '• A alternativa E está incorreta: abrir o partograma na fase latente (2 cm) é erro grave que induz diagnósticos falsos de distócia e cesarianas iatrogênicas.'],
        ['3', 'Questão 2: Diagnóstico Diferencial de Parada Secundária da Dilatação (USP / ENARE)'],
        ['p', 'Primigesta de 19 anos, com gestação a termo, encontra-se em trabalho de parto na fase ativa. Às 15:00 horas, o exame de toque revelou colo com 7 cm de dilatação, apresentação em vértex no plano 0 de De Lee, membranas íntegras e 2 contrações moderadas a cada 10 minutos. Às 17:00 horas (2 horas após), novo toque constatou exatamente a mesma dilatação de 7 cm e o mesmo plano 0 de De Lee, mantendo dinâmica de apenas 2 contrações fracas de 25 segundos em 10 minutos. FCF normal. Diante desse quadro registrado no partograma, qual é o diagnóstico e a conduta preconizada?'],
        ['o', [
          'A) Desproporção cefalopélvica absoluta; indicação imediata de cesariana de urgência.',
          'B) Parada secundária da dilatação por hipoatividade uterina; realizar amniotomia e iniciar ocitocina intravenosa.',
          'C) Fase latente prolongada do parto; transferir a paciente para enfermaria e aguardar contrações espontâneas.',
          'D) Período pélvico prolongado; realizar analgesia de parto e aplicar fórcipe de alívio no plano 0 de De Lee.',
          'E) Parto taquitócico; administrar tocolítico subcutâneo (terbutalina) imediatamente.'
        ]],
        ['p', '<strong>Gabarito Comentado: Alternativa B.</strong>'],
        ['p', '<em>Análise detalhada dos distratores:</em><br>' +
          '• A alternativa A está incorreta: não se pode falar em DCP antes de garantir um motor uterino eficaz. A paciente tem contrações fracas e ineficazes.<br>' +
          '• A alternativa B está <strong>CORRETA</strong>: a dilatação mantida em 7 cm por 2 horas com dinâmica insuficiente (2 contrações fracas em 10 min) caracteriza parada secundária da dilatação por hipossistolia funcional. O tratamento é a correção do motor com amniotomia e ocitocina.<br>' +
          '• A alternativa C está incorreta: a paciente já estava em fase ativa confirmada aos 7 cm; não se pode retroceder para fase latente nem desospitalizar.<br>' +
          '• A alternativa D está incorreta: período pélvico prolongado ocorre no segundo período (com 10 cm de dilatação total), e aplicação de fórcipe no plano 0 é contraindicada por segurança.<br>' +
          '• A alternativa E está incorreta: a dinâmica é fraca e o parto está parado; tocolítico seria catastrófico nesse contexto.'],
        ['3', 'Questão 3: Distócias do Período Expulsivo (UNICAMP / SMS-SP)'],
        ['p', 'Puérpera potencial, multípara (G3P2), admitida em centro de parto normal. O partograma foi conduzido adequadamente e registrou dilatação total de 10 cm às 11:00 horas, com polo cefálico no plano +1 de De Lee. Às 12:15 horas (1 hora e 15 minutos após início dos puxos ativos), o médico obstetra examina a paciente e constata que a apresentação fetal permanece exatamente no plano +1 de De Lee, sem qualquer descida, apesar de haver 4 contrações fortes em 10 minutos e esforços expulsivos contínuos. O diagnóstico obstétrico e o mecanismo etiopatogênico são:'],
        ['o', [
          'A) Fase ativa prolongada decorrente de discinesia uterina hipertônica.',
          'B) Parada secundária da descida, com provável desproporção ao nível do estreito médio ou variedade posterior impactada.',
          'C) Parto precipitado com exaustão dos mecanismos de rotação pélvica.',
          'D) Período expulsivo fisiológico normal de multíparas, devendo-se aguardar mais 3 horas antes de intervir.',
          'E) Insinuação fetal incompleta decorrente de bacia platipeloide pura com indicação de sinfisiotomia.'
        ]],
        ['p', '<strong>Gabarito Comentado: Alternativa B.</strong>'],
        ['p', '<em>Análise detalhada dos distratores:</em><br>' +
          '• A alternativa A está incorreta: a paciente já completou a dilatação (10 cm); trata-se de distócia do segundo período e não de fase ativa.<br>' +
          '• A alternativa B está <strong>CORRETA</strong>: na multípara, a ausência completa de descida fetal por mais de 1 hora no período expulsivo com boa dinâmica configura parada secundária da descida, sendo a DCP de estreito médio e as más posições fetais as causas preponderantes.<br>' +
          '• A alternativa C está incorreta: o parto está parado e não acelerado (precipitado).<br>' +
          '• A alternativa D está incorreta: em multíparas sem analgesia, o período expulsivo dura habitualmente menos de 30 a 60 minutos; tolerar mais 3 horas com parada de descida acarretaria asfixia grave.<br>' +
          '• A alternativa E está incorreta: a sinfisiotomia é manobra de exceção desusada na obstetrícia moderna para distócia de descida habitual.'],
        ['3', 'Questão 4: Atualizações das Diretrizes da OMS e o Labour Care Guide (SURCE / ENARE)'],
        ['p', 'A Organização Mundial da Saúde (OMS), a partir de suas diretrizes de recomendações intraparto para uma experiência positiva no parto (2018) e do lançamento do Labour Care Guide (LCG), revisou paradigmas históricos do partograma clássico. Sobre essas atualizações, assinale a opção CORRETA:'],
        ['o', [
          'A) Manteve-se a exigência rígida de que toda parturiente deve progredir a uma taxa mínima estrita de 1,0 cm de dilatação por hora para ser considerada normal.',
          'B) Fixou-se a abertura da fase ativa exclusivamente a partir de 8 cm de dilatação cervical, dispensando qualquer monitorização prévia.',
          'C) Aboliu-se o limiar arbitrário de 1,0 cm/hora como régua diagnóstica única para indicação de cesariana e consagrou-se os 5 cm de dilatação como marco usual de início da fase ativa.',
          'D) O novo modelo da OMS contraindica formalmente a presença de acompanhante de escolha da mulher para evitar contaminações no centro de parto.',
          'E) Determinou-se o jejum absoluto para líquidos e alimentos durante todas as fases do trabalho de parto para prevenir broncoaspiração em cesarianas.'
        ]],
        ['p', '<strong>Gabarito Comentado: Alternativa C.</strong>'],
        ['p', '<em>Análise detalhada dos distratores:</em><br>' +
          '• A alternativa A está incorreta: a OMS superou exatamente a taxa fixa de 1 cm/h, reconhecendo que taxas de 0,5 cm/h podem ser fisiológicas.<br>' +
          '• A alternativa B está incorreta: o marco de início da fase ativa foi atualizado para 5 cm, e não 8 cm.<br>' +
          '• A alternativa C está <strong>CORRETA</strong>: as diretrizes contemporâneas aboliram a linha de alerta fixa de 1 cm/h e estabeleceram os 5 cm como limiar de transição para a fase ativa franca.<br>' +
          '• A alternativa D está incorreta: a presença contínua do acompanhante de escolha é uma das recomendações mais fortes da OMS para humanização e segurança.<br>' +
          '• A alternativa E está incorreta: a ingestão de líquidos claros e dieta leve para parturientes de baixo risco é estimulada pela OMS.'],
        ['3', 'Questão 5: Parto Taquitócico e Complicações Puerperais (AMP / SCMSP)'],
        ['p', 'Secundigesta de 30 anos, com história de parto normal prévio, dá entrada no hospital com queixa de contrações intensas e frequentes iniciadas subitamente. O médico constata dilatação de 5 cm às 22:00 horas, e o nascimento ocorre às 23:10 horas (70 minutos de fase ativa). Imediatamente após a saída da placenta, a paciente evolui com sangramento vaginal volumoso e hipotonia uterina à palpação. Assinale a complicação fetal comumente associada ao parto taquitócico e o mecanismo da complicação puerperal observada:'],
        ['o', [
          'A) Hiperglicemia fetal e inversão uterina crônica.',
          'B) Hemorragia intracraniana fetal por descompressão súbita e atonia uterina materna por exaustão da musculatura miometrial.',
          'C) Doença da membrana hialina precoce e laceração espontânea de artéria uterina contralateral.',
          'D) Oligoidrâmnio agudo intraparto e rotura do ligamento redondo com hemoperitônio.',
          'E) Policitemia neonatal com hiperviscosidade sanguínea e infecção puerperal ascendente fulminante.'
        ]],
        ['p', '<strong>Gabarito Comentado: Alternativa B.</strong>'],
        ['p', '<em>Análise detalhada dos distratores:</em><br>' +
          '• A alternativa A está incorreta: o feto sofre estresse e hipóxia por vasoconstrição, e não hiperglicemia; a complicação materna é atonia, não inversão crônica.<br>' +
          '• A alternativa B está <strong>CORRETA</strong>: o parto precipitado impõe traumas mecânicos violentos à calota craniana e descompressão rápida, podendo causar hemorragia intracraniana no neonato. Na mãe, a atividade muscular miometrial violenta esgota as reservas energéticas, gerando atonia uterina e hemorragia puerperal imediata.<br>' +
          '• As alternativas C, D e E citam mecanismos incorretos e desprovidos de correlação fisiopatológica com o parto taquitócico.'],
        ['3', 'Questão 6: Interpretação de Variedades de Posição e Altura no Partograma (UERJ / UFRJ)'],
        ['p', 'Ao analisar um partograma de uma parturiente em trabalho de parto ativo, o médico observa a seguinte anotação gráfica: o símbolo de dilatação está plotado no número 8, e o símbolo de altura fetal (círculo aberto) está plotado na linha zero (0), acompanhado da notação "OEA". O que essas marcações indicam correta e anatomicamente?'],
        ['o', [
          'A) Colo com 8 cm de dilatação, apresentação cefálica fletida atingindo a altura das espinhas ciáticas (insinuada), com o occipício fetal voltado para a eminência ileopectínea esquerda da bacia materna.',
          'B) Colo com 8 cm de dilatação, apresentação cefálica defletida de 2º grau no estreito superior, com a fronte voltada para o promontório sacral materno.',
          'C) Colo com 8 cm de dilatação, apresentação pélvica completa coroando no assoalho perineal materno.',
          'D) Colo com 8 cm de dilatação, feto transversal com acrômio esquerdo impactado na borda superior da sínfise púbica.',
          'E) Colo com dilatação de 8 mm, apresentação fetal não insinuada no plano -4 de De Lee, exigindo cesariana imediata.'
        ]],
        ['p', '<strong>Gabarito Comentado: Alternativa A.</strong>'],
        ['p', '<em>Análise detalhada dos distratores:</em><br>' +
          '• A alternativa A está <strong>CORRETA</strong>: a dilatação é de 8 cm; plano 0 de De Lee corresponde anatomicamente à altura das espinhas ciáticas e define a insinuação do polo cefálico (biparietal ultrapassou o estreito superior); OEA significa occipito-esquerda anterior, na qual a fontanela posterior (occipício) aponta para a eminência ileopectínea anterior esquerda da bacia materna.<br>' +
          '• A alternativa B está incorreta: OEA refere-se à apresentação cefálica fletida (vértice), e não defletida de 2º grau (apresentação de fronte, cuja sigla envolveria o nariz: ex. NEA).<br>' +
          '• As alternativas C, D e E trazem conceitos anatômicos e de escala estapafúrdios (8 mm não existe no partograma; OEA não é pélvica nem córmica).'],
        ['3', 'Questão 7: Condução da Fase Ativa Prolongada e Intervenções (UNIFESP)'],
        ['p', 'Gestante de 26 anos, primípara, 40 semanas, internada com 5 cm de dilatação cervical, colo 70% apagado e membranas íntegras. Após 3 horas de observação no partograma, o traçado de dilatação cervical cruzou a linha de alerta, estando atualmente com 6 cm de dilatação e dinâmica de 2 contrações moderadas a cada 10 minutos. FCF de 142 bpm basal. A paciente encontra-se ansiosa, com dor moderada. Qual conduta é a mais recomendada segundo os consensos atuais da FEBRASGO?'],
        ['o', [
          'A) Interrupção imediata por cesariana por ultrapassagem da linha de alerta.',
          'B) Amniotomia artificial com consentimento da paciente, estimulando a deambulação e métodos de alívio da dor, reavaliando a dinâmica em 1 a 2 horas para considerar ocitocina.',
          'C) Aplicação imediata de fórcipe de Simpson para abreviar o período de dilatação.',
          'D) Indução com misoprostol 50 mcg via oral a cada 4 horas.',
          'E) Sedação materna com morfina intravenosa e repouso estrito em decúbito dorsal.'
        ]],
        ['p', '<strong>Gabarito Comentado: Alternativa B.</strong>'],
        ['p', '<em>Análise detalhada dos distratores:</em><br>' +
          '• A alternativa A está incorreta: cruzar a linha de alerta indica fase ativa prolongada e exige medidas corretivas (amniotomia, ocitocina), e não cesárea imediata.<br>' +
          '• A alternativa B está <strong>CORRETA</strong>: a amniotomia aumenta o contato da cabeça fetal com o colo e favorece a secreção de prostaglandinas; a movimentação e o alívio da dor reduzem catecolaminas; se necessário, associa-se ocitocina venosa em seguida.<br>' +
          '• A alternativa C está incorreta: fórcipe só pode ser aplicado no período expulsivo com dilatação de 10 cm.<br>' +
          '• A alternativa D está incorreta: misoprostol é usado para indução em colo desfavorável antes do trabalho de parto, e não para correção de dinâmica na fase ativa.<br>' +
          '• A alternativa E está incorreta: sedação profunda e decúbito dorsal comprimem a veia cava e inibem o parto.'],
        ['3', 'Questão 8: Taquissistolia e Conduta de Ressuscitação Intrauterina (USP-RP)'],
        ['p', 'Durante a condução de um trabalho de parto com uso de ocitocina em bomba de infusão, o partograma registra 6 contrações uterinas em 10 minutos por dois períodos consecutivos, associadas ao aparecimento de desacelerações tardias repetitivas da frequência cardíaca fetal. A conduta prioritária e emergencial consiste em:'],
        ['o', [
          'A) Aumentar a infusão de ocitocina para acelerar o nascimento antes que o feto descompense.',
          'B) Suspender imediatamente a infusão de ocitocina, posicionar a gestante em decúbito lateral esquerdo, administrar oxigênio e considerar tocolítico como a terbutalina subcutânea.',
          'C) Realizar manobra de Kristeller para expulsão rápida do concepto.',
          'D) Iniciar sulfato de magnésio em esquema de Zuspan para neuroproteção fetal e manter ocitocina.',
          'E) Solicitar radiografia de pelve materna para avaliar estreito inferior.'
        ]],
        ['p', '<strong>Gabarito Comentado: Alternativa B.</strong>'],
        ['p', '<em>Análise detalhada dos distratores:</em><br>' +
          '• A alternativa A está incorreta: aumentar a ocitocina agrava a isquemia placentária e pode levar à morte fetal.<br>' +
          '• A alternativa B está <strong>CORRETA</strong>: o quadro é de taquissistolia uterina (&gt; 5 contrações em 10 min) gerando sofrimento fetal agudo; a conduta é suspensão imediata da ocitocina, DLE, hidratação e tocolítico de alívio rápido (terbutalina 0,25 mg SC).<br>' +
          '• A alternativa C está incorreta: a manobra de Kristeller é proscrita na obstetrícia moderna pelos riscos de rotura uterina e lesão visceral fetal.<br>' +
          '• As alternativas D e E são condutas errôneas e sem indicação para o quadro agudo descrito.'],
        ['3', 'Questão 9: Critérios da OMS 2018 para o Trabalho de Parto Fisiológico (ENARE)'],
        ['p', 'Uma médica recém-formada no Programa de Residência Médica em Medicina de Família e Comunidade atua no centro de parto normal de um hospital distrital. Ela atende uma primigesta saudável, com dilatação de 5 cm, que após 2 horas apresenta dilatação de 6 cm (progressão de 0,5 cm/hora). O feto está bem, com FCF de 138 bpm e bolsa íntegra. Com base nas diretrizes da OMS (2018) sobre a evolução fisiológica do parto, qual deve ser a conduta?'],
        ['o', [
          'A) Diagnosticar distócia absoluta e encaminhar imediatamente para cesariana de emergência.',
          'B) Reconhecer que taxas de dilatação inferiores a 1 cm/h (como 0,5 cm/h) podem ser fisiológicas na fase ativa em nulíparas, mantendo suporte, hidratação, liberdade de posição e vigilância contínua sem intervir intempestivamente.',
          'C) Indicar analgesia raquidiana imediata e forçar puxos voluntários no plano -2 de De Lee.',
          'D) Administrar misoprostol 100 mcg sublingual a cada 2 horas até atingir 1 cm/hora.',
          'E) Realizar cesariana em até 30 minutos sob o diagnóstico de parada secundária.'
        ]],
        ['p', '<strong>Gabarito Comentado: Alternativa B.</strong>'],
        ['p', '<em>Análise detalhada dos distratores:</em><br>' +
          '• A alternativa B está <strong>CORRETA</strong>: a OMS 2018 esclarece que a dilatação mínima de 1 cm/h não deve ser usada isoladamente para diagnosticar falha de progressão ou indicar cesariana; velocidades em torno de 0,5 cm/h são comuns e seguras se o bem-estar materno-fetal estiver preservado.<br>' +
          '• As demais alternativas representam condutas intervencionistas incorretas e danosas.'],
        ['3', 'Questão 10: Sinais de Alerta para Desproporção Cefalopélvica (DCP) no Partograma (UERJ)'],
        ['p', 'Em uma parturiente com trabalho de parto estacionado em 7 cm de dilatação há 3 horas, a despeito de 4 contrações vigorosas em 10 minutos, o médico suspeita de desproporção cefalopélvica (DCP). Qual dos seguintes conjuntos de achados semiológicos reforça e consolida essa suspeita clínica?'],
        ['o', [
          'A) Feto em plano +3 de De Lee, colo fino e ausência de deformidades na calota craniana.',
          'B) Cavalgamento acentuado dos ossos parietais (+++/4), formação de grande bossa serossanguínea (caput succedaneum), edema de bordo cervical e estagnação da altura da apresentação.',
          'C) Batimentos cardíacos fetais acelerados transitoriamente após a movimentação fetal ativa.',
          'D) Dilatação cervical rápida de 3 cm em 30 minutos com eliminação de mecônio fluido antigo.',
          'E) Presença de relaxamento miometrial completo entre as contrações com tônus basal de 8 mmHg.'
        ]],
        ['p', '<strong>Gabarito Comentado: Alternativa B.</strong>'],
        ['p', '<em>Análise detalhada dos distratores:</em><br>' +
          '• A alternativa B está <strong>CORRETA</strong>: o cavalgamento ósseo intenso irredutível, o caput succedaneum exuberante e o edema cervical em presença de contrações fortes e dilatação parada são os sinais patognomônicos de obstrução mecânica e DCP intraparto.<br>' +
          '• As demais alternativas descrevem achados fisiológicos normais ou de parto rápido.']
      ]
    ],
    [
      'auditoria-medico-legal-partograma',
      0,
      [
        ['2', '13. Auditoria do Partograma e Aspectos Médico-Legais na Prática Obstétrica'],
        ['p', 'O partograma não é apenas um guia clínico intraparto; ele constitui o principal documento probatório de assistência obstétrica em auditorias hospitalares, comissões de óbito materno e neonatal e processos ético-disciplinares e jurídicos. Em litígios periciais por asfixia perinatal, paralisia cerebral infantil ou rotura uterina, o primeiro documento requisitado pelo perito judicial é a folha do partograma.'],
        ['3', 'Requisitos de Validade Médico-Legal do Registro'],
        ['p', 'Para ter pleno valor probatório e proteger a equipe assistencial e a parturiente, o partograma deve preencher requisitos formais inegociáveis:'],
        ['u', [
          '<strong>Identificação Completa e Legível:</strong> Nome completo da paciente, número do prontuário hospitalar, idade gestacional exata e método de cálculo (DUM ou ultrassom de primeiro trimestre), paridade, data e hora exata de admissão;',
          '<strong>Registro em Tempo Real:</strong> As plotagens de dilatação, altura, FCF e dinâmica uterina devem ser efetuadas contemporaneamente ao exame físico, sendo terminantemente vedado o preenchimento retroativo ("partograma de gaveta" preenchido após o desfecho do parto);',
          '<strong>Identificação dos Profissionais:</strong> Cada toque vaginal e cada avaliação clínica deve conter a assinatura, carimbo legível ou rubrica com número de inscrição no CRM/COREN do profissional executor;',
          '<strong>Registro Explícito de Condutas e Justificativas:</strong> Toda decisão de romper membranas, iniciar ocitocina, solicitar analgesia ou indicar cesariana deve estar cronologicamente articulada com o traçado do gráfico.'
        ]],
        ['3', 'Principais Falhas Auditadas e Implicações Jurídicas'],
        ['p', 'As comissões de mortalidade materna e os tribunais de justiça costumam penalizar as seguintes irregularidades graves:'],
        ['o', [
          '<strong>Abertura Tardia do Partograma:</strong> Iniciar o registro somente quando a paciente atinge 8 ou 9 cm de dilatação, privando a equipe do histórico de progressão;',
          '<strong>Manutenção Indevida da Ocitocina em Curva Estacionada:</strong> Continuar ou aumentar a infusão de ocitocina após o gráfico ter ultrapassado a linha de ação em vigência de dinâmica forte, configurando imperícia médica que precipita a rotura uterina;',
          '<strong>Intervalos Excessivos entre Toques e Auscultas:</strong> Lacunas temporais de mais de 4 a 6 horas sem nenhum toque vaginal registrado durante a fase ativa ou ausência de monitorização periódica da FCF;',
          '<strong>Omissão do Partograma no Prontuário:</strong> Conforme jurisprudência pacífica do Superior Tribunal de Justiça (STJ), a ausência do partograma no prontuário médico de um parto complicado por anóxia neonatal inverte o ônus da prova contra o serviço hospitalar e os médicos assistentes, presumindo-se a falha na vigilância contínua da vitalidade fetal e do trabalho de parto.'
        ]]
      ]
    ],
    [
      'referencias',
      0,
      [
        ['2', 'Referências'],
        ['p', '1. Organização Mundial da Saúde (OMS). <em>WHO recommendations: intrapartum care for a positive childbirth experience</em>. Genebra: World Health Organization, 2018. Disponível em: https://www.who.int/publications/i/item/9789241550215'],
        ['p', '2. Organização Mundial da Saúde (OMS). <em>WHO Labour Care Guide: user\'s manual</em>. Genebra: World Health Organization, 2020. Disponível em: https://www.who.int/publications/i/item/9789240017566'],
        ['p', '3. Federação Brasileira das Associações de Ginecologia e Obstetrícia (FEBRASGO). <em>Diretrizes Nacionais de Assistência ao Parto Normal</em>. São Paulo: FEBRASGO, 2023.'],
        ['p', '4. Ministério da Saúde (Brasil). <em>Diretrizes Nacionais de Assistência ao Parto Normal</em>. Brasília: Ministério da Saúde, 2022.'],
        ['p', '5. American College of Obstetricians and Gynecologists (ACOG). <em>Obstetric Care Consensus No. 1: Safe prevention of the primary cesarean delivery</em>. Obstet Gynecol, 2014 (reaffirmed 2023); 123:693-711. https://doi.org/10.1097/01.AOG.00004444410.04111.1d'],
        ['p', '6. Zhang J, Landy HJ, Branch DW, et al. <em>Contemporary patterns of spontaneous labor with normal neonatal outcomes</em>. Obstet Gynecol, 2010; 116(6):1281-1287. https://doi.org/10.1097/AOG.0b013e3181fdd6f1'],
        ['p', '7. Philpott RH, Castle WM. <em>Cervicographs in the management of labour in primigravidae</em>. J Obstet Gynaecol Br Commonw, 1972; 79(7):592-598.']
      ]
    ]
  ]
};

// Update table of contents array bookPartograma.o
bookPartograma.o = [
  ['fundamentos-historico-conceito', '1. Fundamentos Históricos, Conceito e Importância do Partograma'],
  ['anatomia-grafica-eixos-simbologia', '2. Anatomia Gráfica do Partograma: Eixos, Escalas e Simbologia Padronizada'],
  ['criterios-abertura-fase-ativa', '3. Critérios de Abertura do Partograma e Definição da Fase Ativa'],
  ['linhas-alerta-acao-regras-registro', '4. Linhas de Alerta e Ação: Construção, Racional Clínico e Regras de Registro'],
  ['distocias-fase-ativa-prolongada', '5. Fase Ativa Prolongada: Diagnóstico Gráfico, Etiologia e Conduta Baseada em Evidências'],
  ['distocias-parada-secundaria-dilatacao', '6. Parada Secundária da Dilatação: Diferenciação entre Hipossistolia e Desproporção Cefalopélvica'],
  ['distocias-periodo-pelvico-descida', '7. Distócias do Período Expulsivo: Período Pélvico Prolongado e Parada Secundária da Descida'],
  ['distocias-parto-taquitocico-precipitado', '8. Parto Taquitócico ou Precipitado: Riscos Maternos, Fetais e Manejo Imediato'],
  ['vigilancia-fetal-dinamica-partograma', '9. Monitorização Materna e Fetal Integrada ao Gráfico: FCF, Dinâmica Uterina e Líquido Amniótico'],
  ['transicao-oms-labour-care-guide', '10. O Novo Labour Care Guide (LCG) da OMS: Superação do Limiar Fixo de 1 cm/h e Humanização'],
  ['casos-clinicos-integradores', '11. Casos Clínicos Resolvidos com Análise Minuciosa do Partograma'],
  ['questoes-comentadas-residencia', '12. Questões de Concursos e Residência Médica com Comentários Exaustivos'],
  ['auditoria-medico-legal-partograma', '13. Auditoria do Partograma e Aspectos Médico-Legais na Prática Obstétrica'],
  ['referencias', 'Referências']
];

saveBook(bookPartograma);

