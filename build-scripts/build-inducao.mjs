import { saveBook } from '../scripts/bloco-04-utils.mjs';

const bookInducao = {
  v: 2,
  s: 'inducao-do-trabalho-de-parto',
  slug: 'inducao-do-trabalho-de-parto',
  t: 'Indução do Trabalho de Parto',
  title: 'Indução do Trabalho de Parto',
  p: 'Tratado completo sobre a indução do trabalho de parto e amadurecimento cervical: bases fisiológicas, indicações formais e contraindicações absolutas, escore de Bishop minucioso, métodos farmacológicos (Misoprostol e Dinoprostona), métodos mecânicos (Sonda de Foley e balão duplo), infusão escalonada de ocitocina, amniotomia orientada, manejo em útero com cicatriz prévia, taquissistolia e hiperestimulação, critérios diagnósticos estritos de falha de indução, casos clínicos desafiadores e questões comentadas de residência médica.',
  o: [
    ['fundamentos-conceito-epidemiologia', '1. Fundamentos, Conceitos e Panorama Epidemiológico da Indução'],
    ['checklist-pre-inducao-seguranca', '2. Checklist Pré-Indução Obrigatório e Elegibilidade Materno-Fetal'],
    ['indicacoes-contraindicacoes-absolutas', '3. Indicações Formais e Contraindicações Absolutas ao Parto Vaginal'],
    ['indice-bishop-avaliacao-cervical', '4. Índice de Bishop Detalhado: Parâmetros, Cálculo e Interpretação Estratégica'],
    ['metodos-farmacologicos-prostaglandinas', '5. Amadurecimento Cervical Farmacológico: Misoprostol (PGE1) e Dinoprostona (PGE2)'],
    ['metodos-mecanicos-balao-foley', '6. Métodos Mecânicos de Amadurecimento: Sonda de Foley e Balão Cervical'],
    ['ocitocina-infusao-titulacao', '7. Condução e Indução com Ocitocina Intravenosa: Farmacocinética e Titulação'],
    ['amniotomia-artificial-cuidados', '8. Amniotomia Artificial: Técnica, Racional Fisiológico e Prevenção de Acidentes'],
    ['inducao-com-cicatriz-uterina-previa', '9. Indução em Pacientes com Cicatriz Uterina Prévia: Riscos, Protocolos e Vedações'],
    ['complicacoes-taquissistolia-manejo', '10. Taquissistolia Uterina, Hipertonia e Ressuscitação Intrauterina'],
    ['falha-inducao-definicao-conduta', '11. Definição Rigorosa de Falha de Indução: O Limiar das 12 a 18 Horas'],
    ['situacoes-clinicas-especiais', '12. Indução em Cenários Especiais: Pós-Termo, RPMO, Pré-Eclâmpsia e Diabetes'],
    ['casos-clinicos-integradores', '13. Casos Clínicos Resolvidos com Decisões Baseadas em Evidências'],
    ['questoes-comentadas-residencia', '14. Questões de Concursos e Residência Médica com Comentários Exaustivos'],
    ['referencias', 'Referências']
  ],
  h: [
    'Apostila LURIA',
    'Indução do Trabalho de Parto',
    'Tratado completo sobre a indução do trabalho de parto e amadurecimento cervical: bases fisiológicas, indicações formais e contraindicações absolutas, escore de Bishop minucioso, métodos farmacológicos (Misoprostol e Dinoprostona), métodos mecânicos (Sonda de Foley e balão duplo), infusão escalonada de ocitocina, amniotomia orientada, manejo em útero com cicatriz prévia, taquissistolia e hiperestimulação, critérios diagnósticos estritos de falha de indução, casos clínicos desafiadores e questões comentadas de residência médica.',
    [
      'Área: Ginecologia e Obstetrícia',
      'Matéria: Obstetrícia e Tococirurgia',
      'Tema: Indução do Trabalho de Parto'
    ],
    'apostila-identity'
  ],
  q: [
    [
      'fundamentos-conceito-epidemiologia',
      0,
      [
        ['2', '1. Fundamentos, Conceitos e Panorama Epidemiológico da Indução'],
        ['p', 'A indução do trabalho de parto consiste na estimulação artificial e deliberada das contrações uterinas antes do seu início espontâneo, com o objetivo precípuo de desencadear o trabalho de parto e atingir o parto por via vaginal. Trata-se de uma das intervenções obstétricas mais frequentemente executadas no cenário da assistência perinatal moderna, envolvendo atualmente entre 20% e 35% de todas as gestações no Brasil e no mundo desenvolvido.'],
        ['3', 'A Distinção Semiológica: Indução vs. Condução'],
        ['p', 'Para a prática clínica rigorosa e a resolução assertiva de questões de concursos e provas de título de especialista (TEGO), é imperativo não confundir três conceitos obstétricos distintos:'],
        ['u', [
          '<strong>Indução do Trabalho de Parto:</strong> Intervenção inicial em uma paciente que <strong>não se encontra em trabalho de parto</strong> (colo fechado ou sem dinâmica efetiva), utilizando fármacos ou dispositivos mecânicos para disparar o processo contrátil.',
          '<strong>Amadurecimento Cervical (Preparo de Colo):</strong> Emprego específico de agentes farmacológicos (prostaglandinas) ou mecânicos (cateter balão) para promover modificações estruturais no colo uterino desfavorável (amolecimento, esvaecimento, dilatação inicial), preparando-o para responder à estimulação contrátil subsequente.',
          '<strong>Condução (ou Augmentação) do Trabalho de Parto:</strong> Estimulação suplementar das contrações uterinas (habitualmente por meio de amniotomia ou ocitocina intravenosa) em uma mulher que <strong>já iniciou espontaneamente o trabalho de parto ativo</strong>, porém evolui com hipoatividade uterina, contrações ineficazes ou atraso da dilatação cervical (fase ativa prolongada).'
        ]],
        ['3', 'Impacto Epidemiológico e o Estudo ARRIVE'],
        ['p', 'Historicamente, a indução do trabalho de parto em mulheres de baixo risco sem indicação médica clássica era vista com cautela, sob o temor teórico de que a intervenção artificial aumentasse a incidência de cesarianas iatrogênicas. Esse dogma foi profundamente desafiado e reexaminado a partir da publicação do histórico ensaio clínico randomizado multicêntrico <strong>ARRIVE (A Randomized Trial of Induction Versus Expectant Management)</strong>, conduzido pela rede de medicina materno-fetal do <em>National Institutes of Health</em> (NIH) dos Estados Unidos e publicado no conceituado <em>New England Journal of Medicine</em> em 2018.'],
        ['p', 'O estudo ARRIVE randomizou mais de 6.100 gestantes primíparas de baixo risco com feto único em apresentação cefálica para indução eletiva com 39 semanas completas (39 semanas e 0 dias a 39 semanas e 4 dias) versus conduta expectante até 41 a 42 semanas. Os resultados demonstraram que o grupo submetido à indução programada com 39 semanas apresentou <strong>menor taxa de parto por cesariana</strong> (18,6% vs. 22,2%; risco relativo de 0,84, com significância estatística), menor incidência de distúrbios hipertensivos da gestação (9,1% vs. 14,1%) e necessidade reduzida de suporte respiratório neonatal, sem qualquer aumento de complicações maternas graves. Embora o ARRIVE tenha demonstrado a segurança da indução com 39 semanas em serviços bem estruturados, as diretrizes da FEBRASGO, OMS e Ministério da Saúde recomendam priorizar a indução em cenários de <strong>indicação médica ou obstétrica clara</strong>, evitando a sobrecarga logística do sistema público de saúde com induções meramente por conveniência pessoal sem justificativa clínica robusta.']
      ]
    ],
    [
      'checklist-pre-inducao-seguranca',
      0,
      [
        ['2', '2. Checklist Pré-Indução Obrigatório e Elegibilidade Materno-Fetal'],
        ['p', 'A decisão de induzir o parto é uma das mais transcendentais da assistência obstétrica. Antes de prescrever o primeiro comprimido de prostaglandina ou iniciar o gotejamento de ocitocina, o obstetra deve cumprir uma lista de verificação (checklist de segurança) rigorosa:'],
        ['o', [
          '<strong>Confirmação Precisa da Idade Gestacional:</strong> A idade gestacional deve ser respaldada por critérios fidedignos para evitar a prematuridade iatrogênica. O método padrão-ouro é a ultrassonografia realizada no primeiro trimestre com medição do Comprimento Cabeça-Nádega (CCN) entre 7 e 13 semanas e 6 dias (margem de erro de &plusmn; 3 a 5 dias). Na ausência de USG precoce, utiliza-se a data confiável da última menstruação (DUM) em ciclos menstruais regulares precedentes sem uso de contraceptivo hormonal;',
          '<strong>Avaliação da Vitalidade e Higidez Fetal Anteparto:</strong> É terminantemente proibido iniciar qualquer método indutor sem documentar o bem-estar fetal prévio. Exige-se cardiotocografia basal reativa recente ou perfil biofísico fetal normal com líquido amniótico adequado. Se houver suspeita de sofrimento fetal agudo ou crônico descompensado (ex: doppler com diástole reversa de artéria umbilical ou ducto venoso alterado), a indução é contraindicada e o parto cirúrgico imediato se impõe;',
          '<strong>Estatura e Estática Fetal:</strong> Deve-se comprovar categoricamente que o concepto encontra-se em <strong>apresentação cefálica de vértice</strong> por meio das Manobras de Leopold e, quando necessário, por ultrassonografia à beira do leito. Apresentações córmicas (transversas) ou defletidas de fronte/face com mento posterior são contraindicações formais ao parto vaginal;',
          '<strong>Avaliação da Pelve Materna e Relação Fetopélvica:</strong> Afastar vícios pélvicos graves e desproporção fetopélvica evidente (macrossomia acentuada com peso fetal estimado &gt; 4.500 g a 5.000 g);',
          '<strong>Exame Especular e Toque Vaginal Minucioso:</strong> Excluir a presença de sangramento genital ativo inexplicado, placenta prévia, vasa prévia ou lesões genitais ativas por vírus do herpes simples (HSV); avaliar o estado das membranas ovulares (íntegras vs rotas) e calcular o Índice de Bishop pré-indução;',
          '<strong>Termo de Consentimento Livre e Esclarecido:</strong> Esclarecer minuciosamente à gestante e à sua família os objetivos da indução, as etapas previstas, a estimativa temporal (que pode ultrapassar 24 a 36 horas em colos imaturos), os riscos de falha e a eventual necessidade de cesariana, garantindo a presença ininterrupta do acompanhante de livre escolha.'
        ]]
      ]
    ],
    [
      'indicacoes-contraindicacoes-absolutas',
      0,
      [
        ['2', '3. Indicações Formais e Contraindicações Absolutas ao Parto Vaginal'],
        ['p', 'O princípio basilar que rege a indução é inequívoco: <strong>a gestação somente deve ser interrompida quando o risco materno ou fetal de sua continuidade superar os riscos associados ao nascimento e ao procedimento de indução</strong>.'],
        ['3', 'Indicações Formais Mais Prevalentes na Prática Clínica'],
        ['p', 'As indicações dividem-se em maternas, fetais e ovulares, amplamente respaldadas pelos consensos da FEBRASGO, ACOG, RCOG e Ministério da Saúde:'],
        ['u', [
          '<strong>Gestação Pós-Termo ou Prolongada (&ge; 41 semanas completas):</strong> A continuidade da gestação além de 41 semanas associa-se a um aumento exponencial do risco de insuficiência placentária relativa por envelhecimento tecidual, oligoidrâmnio grave, aspiração meconial, macrossomia fetal e óbito fetal intrauterino inexplicado. O consenso mundial determina que a indução deve ser oferecida a partir de 41 semanas e 0 dias e realizada impreterivelmente antes de atingir 42 semanas completas;',
          '<strong>Rotura Prematura de Membranas Ovulares a Termo (RPMO &ge; 37 semanas):</strong> Na vigência de amniorrexe a termo sem trabalho de parto espontâneo após 6 a 12 horas, a indução imediata reduz substancialmente o período de latência, o risco de corioamnionite clínica e subclínica, endometrite puerperal e sepse neonatal, sem aumentar as taxas de cesárea;',
          '<strong>Síndromes Hipertensivas da Gestação:</strong> Pré-eclâmpsia sem sinais de gravidade ou hipertensão gestacional controlada ao atingir 37 semanas completas; hipertensão arterial crônica com feto a termo; e pré-eclâmpsia com sinais de gravidade após estabilização hemodinâmica e corticoterapia quando a idade gestacional atinge &ge; 34 semanas;',
          '<strong>Diabetes Mellitus na Gravidez:</strong> Diabetes pré-gestacional (tipo 1 ou tipo 2) ou diabetes gestacional em uso de insulina com bom controle metabólico entre 38 e 39 semanas completas; diabetes controlado exclusivamente com dieta entre 39 e 40 semanas completas (para prevenção de macrossomia e morte súbita fetal);',
          '<strong>Restrição de Crescimento Intrauterino (RCIU / CIUR):</strong> Feto com peso &lt; percentil 3 ou &lt; p10 com alteração de Doppler, desde que haja estabilidade hemodinâmica fetal comprovada (Doppler de artéria umbilical com fluxo diastólico presente e ducto venoso com onda "a" normal e positiva);',
          '<strong>Corioamnionite Clínica:</strong> Infecção intra-amniótica manifestada por febre materna associada a taquicardia fetal, útero doloroso e líquido com odor fétido. Constitui indicação absoluta de <strong>interrupção imediata</strong> sob antibioticoterapia parenteral de amplo espectro; a via de parto é prioritariamente a mais rápida, podendo ser induzida se o parto for iminente e as condições fetais permitirem;',
          '<strong>Aloimunização Rh com Anemia Fetal Estável:</strong> Quando o feto atinge maturidade compatível com bom prognóstico neonatal ou necessidade de tratamento fora do ambiente intrauterino.'
        ]],
        ['3', 'Contraindicações Absolutas à Indução do Parto'],
        ['p', 'A regra de ouro da obstetrícia é axiomática: <strong>qualquer condição clínica ou anatômica que contraindique formalmente o parto por via vaginal constitui contraindicação absoluta à indução do trabalho de parto</strong>. Tentar induzir uma paciente com contraindicação ao parto normal configura imperícia grave:'],
        ['t', [
          'Contraindicação Absoluta',
          'Mecanismo de Risco Catastrófico',
          'Conduta Médica Obrigatória'
        ], [
          ['Placenta prévia total ou centro-parcial', 'Hemorragia exsanguinante maciça e choque hipovolêmico por dilatação do leito placentário', 'Cesariana programada'],
          ['Vasa prévia comprovada', 'Laceração de vasos fetais anômalos à dilatação ou rotura de bolsa, com exsanguinação fetal em minutos', 'Cesariana de emergência'],
          ['Apresentação fetal transversa / córmica', 'Distócia mecânica absoluta; impossibilidade anatômica de parto; risco iminente de rotura uterina', 'Cesariana imediata'],
          ['Cicatriz uterina corporal ou em "T" prévia', 'Cesárea prévia corporal (longitudinal clássica), histerotomia fúndica ou miomectomia transmural com abertura de cavidade endometrial; risco de rotura &gt; 5% a 10%', 'Cesariana eletiva'],
          ['Herpes genital com lesão ativa no canal', 'Risco extremo de transmissão vertical intraparto do HSV para o feto, causando encefalite e infecção herpética disseminada neonatal', 'Cesariana com bolsa íntegra'],
          ['Prolapso agudo de cordão umbilical', 'Compressão mecânica imediata do funículo pela cabeça fetal, causando asfixia aguda e óbito fetal em poucos minutos', 'Cesariana emergencial imediata'],
          ['Carcinoma invasor do colo uterino', 'Risco de hemorragia incontrolável, laceração tumoral catastrófica e disseminação de células malignas', 'Cesariana corporal programada']
        ], 'book-table']
      ]
    ],
    [
      'indice-bishop-avaliacao-cervical',
      0,
      [
        ['2', '4. Índice de Bishop Detalhado: Parâmetros, Cálculo e Interpretação Estratégica'],
        ['p', 'O sucesso da indução do trabalho de parto depende quase que exclusivamente do estado de maturação do colo uterino no momento em que se inicia a intervenção. Para padronizar a avaliação semiológica e quantificar a probabilidade de parto vaginal bem-sucedido, o obstetra Edward H. Bishop concebeu em 1964 um sistema de pontuação baseado em cinco achados do exame de toque vaginal, que permanece até hoje como o padrão-ouro de referência mundial.'],
        ['3', 'Os Cinco Parâmetros do Escore de Bishop'],
        ['p', 'Cada um dos cinco parâmetros clínicos é graduado de 0 a 2 ou 0 a 3 pontos, resultando em uma pontuação global que varia de <strong>0 a 13 pontos</strong>:'],
        ['t', [
          'Parâmetro Cervical / Fetal',
          '0 Pontos',
          '1 Ponto',
          '2 Pontos',
          '3 Pontos'
        ], [
          ['Dilatação cervical (cm)', 'Fechado (0 cm)', '1 a 2 cm', '3 a 4 cm', '&ge; 5 cm'],
          ['Apagamento / Encurtamento (%)', '0 a 30% (longo &gt; 3 cm)', '40 a 50% (cerca de 2 cm)', '60 a 70% (cerca de 1 cm)', '&ge; 80% (muito fino / película)'],
          ['Altura da apresentação (De Lee)', '-3 cm (alta e móvel)', '-2 cm (ajustada à bacia)', '-1 ou 0 cm (insinuada)', '+1 ou +2 cm (baixa na pelve)'],
          ['Consistência do colo', 'Firme (cartilaginosa / ponta do nariz)', 'Intermediária (consistência do queixo)', 'Amolecida (consistência dos lábios)', '—'],
          ['Posição do colo na pelve', 'Posterior (voltado para o sacro)', 'Intermediária / Médio', 'Anterior (voltado para a sínfise púbica)', '—']
        ], 'book-table'],
        ['3', 'Interpretação Clínica e Decisão Terapêutica'],
        ['p', 'A estratificação da pontuação de Bishop determina de forma absoluta o método de escolha inicial:'],
        ['u', [
          '<strong>Bishop &le; 6 (Colo Desfavorável / Imaturo):</strong> Indica que o estroma cervical ainda é rico em feixes espessos e entrelaçados de colágeno, pobre em proteoglicanos hidrofílicos e desprovido de receptores densos de ocitocina. Se o obstetra iniciar infusão de ocitocina diretamente em um colo com Bishop &le; 6, a taxa de falha de indução e cesariana ultrapassa 50% a 70%. Portanto, a conduta imperativa é o <strong>amadurecimento cervical prévio</strong> por métodos farmacológicos (Misoprostol) ou mecânicos (Sonda de Foley);',
          '<strong>Bishop &ge; 8 ou 9 (Colo Favorável / Maduro):</strong> Indica que o colo já sofreu remodelação bioquímica fisiológica, encontra-se centralizado, flexível e complacente. O índice de sucesso de indução é altíssimo (&gt; 90%), idêntico ao do início espontâneo do trabalho de parto. A conduta de escolha é a <strong>indução direta com Ocitocina intravenosa</strong> em bomba de infusão, podendo ser associada à amniotomia orientada.'
        ]]
      ]
    ],
    [
      'metodos-farmacologicos-prostaglandinas',
      0,
      [
        ['2', '5. Amadurecimento Cervical Farmacológico: Misoprostol (PGE1) e Dinoprostona (PGE2)'],
        ['p', 'Quando o colo uterino encontra-se desfavorável (Bishop &le; 6) e a paciente não apresenta contraindicações específicas, os agentes de primeira escolha para o amadurecimento cervical são as prostaglandinas sintéticas.'],
        ['3', 'Mecanismo de Ação Bioquímico das Prostaglandinas'],
        ['p', 'As prostaglandinas E1 e E2 atuam por meio de dois mecanismos paralelos e sinérgicos:'],
        ['o', [
          '<strong>Remodelação Estromal Cervical:</strong> Estimulam a degradação e desarranjo das fibras de colágeno por meio da ativação da colagenase e elastase estromais, promovem a hidratação da matriz extracelular por síntese de ácido hialurônico e sulfato de heparano e induzem o influxo de leucócitos na lâmina própria cervical, mimetizando uma reação inflamatória controlada;',
          '<strong>Ativação da Contratilidade Miometrial:</strong> Ligam-se diretamente a receptores miometriais específicos acoplados à proteína G, promovendo o influxo de cálcio intracelular e desencadeando contrações uterinas coordenadas.'
        ]],
        ['3', 'O Misoprostol (Prostaglandina E1 Sintética): Regimes Padronizados'],
        ['p', 'O misoprostol é um análogo sintético da prostaglandina E1, termoestável, de baixo custo e com ampla evidência científica de segurança e eficácia chancelada pela OMS, Ministério da Saúde e Federação Internacional de Ginecologia e Obstetrícia (FIGO).'],
        ['u', [
          '<strong>Esquema Vaginal Padronizado (FIGO / Ministério da Saúde):</strong> Dose de <strong>25 mcg por via vaginal</strong> (comprimido introduzido no fundo de saco vaginal posterior), administrado a cada <strong>4 a 6 horas</strong>. Se a paciente não apresentar dinâmica uterina efetiva e o colo permanecer desfavorável, a dose pode ser repetida sucessivamente até o limite habitual de 4 a 6 doses;',
          '<strong>Esquema Oral Alternativo:</strong> Solução oral de misoprostol na dose de <strong>20 a 25 mcg a cada 2 horas</strong> (administrada por via líquida fracionada), que tem demonstrado menor incidência de hiperestimulação com eficácia equivalente nos ensaios clínicos mais recentes da literatura;'
        ]],
        ['p', '<strong>CONTRAINDICAÇÃO ABSOLUTA E INEGOCIÁVEL DO MISOPROSTOL:</strong> O uso de misoprostol é <strong>terminantemente contraindicado em mulheres com útero cicatrizado</strong> (presença de cesárea prévia, miomectomia transmural ou qualquer cirurgia uterina com violação miometrial prévia). Diversos ensaios clínicos demonstraram que o misoprostol eleva o risco de <strong>rotura uterina catastrófica</strong> para níveis intoleráveis (incidência de rotura de 5% a 12% em úteros cicatrizados expostos a misoprostol, comparado a menos de 0,5% com métodos mecânicos). Em provas de residência médica, qualquer alternativa que sugira misoprostol para gestante com cesariana prévia deve ser imediatamente descartada como errônea!'],
        ['3', 'O Intervalo Crítico de Segurança entre Misoprostol e Ocitocina'],
        ['p', 'Quando o colo uterino torna-se favorável após o uso de misoprostol (ou quando cessam as modificações sem que tenham surgido contrações efetivas), pode ser necessário iniciar a infusão de ocitocina exógena. Contudo, para prevenir taquissistolia grave e rotura uterina por sinergismo medicamentoso tóxico, as diretrizes internacionais exigem aguardar um <strong>intervalo mínimo de 4 a 6 horas após a última dose de misoprostol vaginal</strong> antes de iniciar a infusão de ocitocina.']
      ]
    ],
    [
      'metodos-mecanicos-balao-foley',
      0,
      [
        ['2', '6. Métodos Mecânicos de Amadurecimento: Sonda de Foley e Balão Cervical'],
        ['p', 'Os métodos mecânicos representam a alternativa mais antiga e mais segura para o amadurecimento cervical em situações nas quais as prostaglandinas estão formalmente contraindicadas ou indisponíveis.'],
        ['3', 'Racional Fisiológico e Mecanismo de Ação'],
        ['p', 'O amadurecimento mecânico fundamenta-se na pressão física direta exercida pelo balão inflado contra o orifício cervical interno e no descolamento das membranas amnióticas do segmento uterino inferior. Esse estímulo mecânico local desencadeia a liberação endógena maciça de prostaglandinas deciduais locais (PGF2&alpha; e PGE2) e ativa reflexos neuroendócrinos (reflexo de Ferguson, com liberação central de ocitocina pela neuro-hipófise), promovendo o apagamento e a dilatação cervical sem induzir contrações uterinas violentas.'],
        ['3', 'A Sonda de Foley Intracervical: Método de Escolha na Cesárea Prévia'],
        ['p', 'A sonda de Foley (cateter de Foley de calibre 16 ou 18 Fr) é o <strong>método de escolha indiscutível para o amadurecimento cervical em gestantes com colo desfavorável que possuem cicatriz de cesárea prévia</strong>, apresentando risco de rotura uterina insignificante (&lt; 0,5%), comparável ao do trabalho de parto espontâneo.'],
        ['u', [
          '<strong>Técnica de Inserção:</strong> Sob visualização direta com espéculo ginecológico estéril e assepsia rigorosa com clorexidina degermante aquosa, o cateter de Foley é delicadamente introduzido através do orifício cervical externo ultrapassando o orifício interno, posicionando o balão no espaço extra-amniótico entre as membranas e a parede do segmento uterino inferior;',
          '<strong>Volume de Insuflação do Balão:</strong> O balão da sonda é insuflado com <strong>30 a 50 mL de água destilada ou soro fisiológico estéril</strong> (alguns protocolos hospitalares utilizam até 60 a 80 mL para acelerar a dilatação);',
          '<strong>Tração Mecânica:</strong> O cateter é tracionado suavemente até apoiar no orifício interno e fixado à face interna da coxa materna com fita adesiva hipoalergênica, mantendo tração leve;',
          '<strong>Tempo de Permanência:</strong> A sonda é mantida <em>in situ</em> por um período máximo de <strong>12 a 24 horas</strong>, ou até que ocorra a sua expulsão espontânea (o que geralmente atesta uma dilatação de pelo menos 3 a 4 cm, tornando o colo favorável para prosseguimento com ocitocina).'
        ]],
        ['3', 'O Cateter de Balão Duplo (Balão de Cook)'],
        ['p', 'Dispositivo projetado especificamente para maturação cervical obstétrica, o balão duplo possui um balão uterino (posicionado acima do orifício interno e preenchido com 80 mL de solução) e um balão vaginal (posicionado no orifício externo e preenchido com 80 mL de solução). Ao comprimir o colo em "sanduíche" de dentro para fora e de fora para dentro, exerce pressão constante sem necessitar de tração externa fixada à coxa. Ensaios clínicos demonstram eficácia equivalente ou discretamente superior à sonda de Foley simples, porém com custo consideravelmente mais elevado.']
      ]
    ],
    [
      'ocitocina-infusao-titulacao',
      0,
      [
        ['2', '7. Condução e Indução com Ocitocina Intravenosa: Farmacocinética e Titulação'],
        ['p', 'A ocitocina sintética é o uterotônico mais utilizado no mundo para indução em colos maduros e para augmentação de trabalho de parto disfuncional. Trata-se de um nonapeptídeo idêntico ao hormônio sintetizado pelos núcleos supraóptico e paraventricular do hipotálamo materno e armazenado na neuro-hipófise.'],
        ['3', 'Farmacocinética e Farmacodinâmica Aplicada'],
        ['p', 'Quando administrada por via intravenosa, a ocitocina possui início de ação quase instantâneo (resposta contrátil em menos de 1 a 2 minutos). Sua meia-vida plasmática é extremamente curta, variando entre <strong>3 e 5 minutos</strong>, e a concentração plasmática atinge o estado de equilíbrio estável (<em>steady state</em>) após aproximadamente <strong>30 a 40 minutos</strong> de infusão em taxa constante. Por essa razão farmacocinética, qualquer aumento de dose antes de decorridos 20 a 30 minutos acarreta acúmulo desnecessário do fármaco e risco iminente de taquissistolia e hiperestimulação uterina.'],
        ['3', 'Regras Fundamentais de Segurança para Uso da Ocitocina'],
        ['o', [
          '<strong>Uso Obrigatório de Bomba de Infusão Contínua (BIC):</strong> É formalmente proscrita a infusão de ocitocina por contagem manual de gotas em equipo simples ("gotejamento a olho"). A taxa de fluxo deve ser controlada eletronicamente em mL/hora por bomba de infusão para garantir precisão milimétrica;',
          '<strong>Preparo da Solução Padrão:</strong> Diluir habitualmente 5 UI de ocitocina em 500 mL de solução fisiológica a 0,9% ou Ringer lactato (gerando concentração de 10 mUI/mL, facilitando o cálculo onde 1 mL/h = 10 mUI/hora, ou seja, 6 mL/h = 1 mUI/min);',
          '<strong>Regime de Baixa Dose Escalonada (Recomendado):</strong> Iniciar com <strong>1 a 2 mUI/min</strong> e aumentar de 1 a 2 mUI/min a cada <strong>20 a 30 minutos</strong> até alcançar dinâmica uterina satisfatória (3 a 4 contrações de boa intensidade em 10 minutos);',
          '<strong>Princípio da Dose Mínima Eficaz:</strong> O objetivo da titulação não é atingir a dose máxima teórica, mas sim a <strong>menor dose capaz de sustentar contrações eficientes</strong>. Assim que se obtém o padrão contrátil fisiológico, a velocidade de infusão é congelada;',
          '<strong>Efeito Antidiurético da Ocitocina:</strong> A ocitocina compartilha homologia estrutural com o hormônio antidiurético (vasopressina / ADH). Doses elevadas prolongadas (&gt; 20 a 40 mUI/min) associadas à infusão de grandes volumes de soluções hipotônicas (como soro glicosado a 5%) podem causar <strong>intoxicação hídrica grave</strong> com hiponatremia dilucional aguda, edema pulmonar, convulsões e coma materno.'
        ]]
      ]
    ],
    [
      'amniotomia-artificial-cuidados',
      0,
      [
        ['2', '8. Amniotomia Artificial: Técnica, Racional Fisiológico e Prevenção de Acidentes'],
        ['p', 'A amniotomia consiste na rotura artificial deliberada das membranas ovulares (âmnio e córion) durante o trabalho de parto, empregando-se um instrumento específico denominado amniótomo descartável ou pinça de Kocher estéril.'],
        ['3', 'Efeito Fisiológico da Amniotomia'],
        ['p', 'Ao romper a bolsa das águas e permitir a drenagem do líquido amniótico, o volume uterino diminui, a musculatura miometrial ganha vantagem mecânica ao tracionar o colo sobre uma cavidade menor, o polo cefálico fetal desce e encaixa-se diretamente contra os receptores nervosos cervicais (desencadeando o reflexo de Ferguson) e a decídua sintetiza localmente prostaglandinas PGF2&alpha;. Quando combinada à infusão de ocitocina em colos favoráveis, a amniotomia encurta a duração do trabalho de parto em até 2 a 3 horas.'],
        ['3', 'Requisitos Rígidos de Segurança e Prevenção de Prolapso de Cordão'],
        ['p', 'A amniotomia NUNCA deve ser realizada de maneira descuidada ou prematura. Os seguintes critérios de segurança são obrigatórios:'],
        ['u', [
          '<strong>Apresentação Cefálica Baixa e Fletida:</strong> A apresentação deve estar bem aplicada ao segmento inferior e insinuada (plano &ge; 0 de De Lee, ou no mínimo plano -1 bem fixada). Realizar amniotomia em cabeça fetal alta e móvel (plano -3 ou -2 de De Lee) acarreta risco altíssimo de <strong>prolapso agudo de cordão umbilical</strong> com o fluxo súbito de líquido, transformando um parto eletivo em catástrofe obstétrica;',
          '<strong>Palpação Cuidadosa para Excluir Cordão e Vasos Prévios:</strong> Antes da punção da bolsa, o obstetra deve palpar minuciosamente toda a calota e o polo inferior das membranas entre as contrações, certificando-se de que não existem alças de cordão interpostas (procúbito de cordão) nem vasos pulsáteis na membrana (vasa prévia);',
          '<strong>Ausculta Imediata da Frequência Cardíaca Fetal:</strong> É obrigatório auscultar os BCF antes, durante e imediatamente após a amniotomia por 60 segundos ininterruptos para flagrar bradicardias súbitas por compressão ou prolapso de cordão.'
        ]]
      ]
    ],
    [
      'inducao-com-cicatriz-uterina-previa',
      0,
      [
        ['2', '9. Indução em Pacientes com Cicatriz Uterina Prévia: Riscos, Protocolos e Vedações'],
        ['p', 'O manejo de gestantes com histórico de cesárea anterior que necessitam de indução representa um dos tópicos mais cobrados em exames de residência médica no Brasil.'],
        ['3', 'A Prova de Trabalho de Parto (TOLAC) vs. Riscos de Rotura'],
        ['p', 'A realização de uma prova de trabalho de parto após cesárea anterior (TOLAC — <em>Trial of Labor After Cesarean</em>) é amplamente recomendada por diretrizes internacionais e pela FEBRASGO para candidatas selecionadas (mulheres com apenas 1 cesárea prévia segmentar transversa baixa, bacia ginecoide e feto único cefálico), com taxas globais de sucesso de parto vaginal de 60% a 80%. No trabalho de parto espontâneo, o risco de rotura da cicatriz uterina segmentar situa-se em torno de <strong>0,5% a 0,7%</strong>.'],
        ['3', 'Protocolos Permitidos e Métodos Formalmente Proscritos'],
        ['p', 'Quando a paciente com cesárea prévia necessita de indução, a escolha do método é determinante para evitar a rotura uterina:'],
        ['t', [
          'Método de Indução',
          'Situação na Cesariana Prévia',
          'Risco Estimado de Rotura Uterina',
          'Recomendação Oficial das Diretrizes'
        ], [
          ['Sonda de Foley intracervical (Método Mecânico)', 'Permitido e preferencial em colo desfavorável', 'Aproximadamente 0,5% a 0,7% (idêntico ao espontâneo)', '<strong>Método de 1ª escolha indiscutível</strong> em colo com Bishop &le; 6'],
          ['Ocitocina intravenosa controlada em BIC', 'Permitido com cautela estrita em colo maduro', 'Aproximadamente 1,0% a 1,5%', 'Uso permitido em titulação lenta; evitar hiperestimulação'],
          ['Misoprostol (PGE1) ou Dinoprostona (PGE2)', '<strong>TERMINANTEMENTE PROSCRITO / CONTRAINDICADO</strong>', 'Elevação para <strong>5% a 12%</strong> de rotura uterina catastrófica', '<strong>CONTRAINDICAÇÃO FORMAL ABSOLUTA</strong> (Prática médica vedada)']
        ], 'book-table']
      ]
    ],
    [
      'complicacoes-taquissistolia-manejo',
      0,
      [
        ['2', '10. Taquissistolia Uterina, Hipertonia e Ressuscitação Intrauterina'],
        ['p', 'A complicação iatrogênica mais frequente decorrente do uso inadequado de uterotônicos é o excesso de contratilidade miometrial.'],
        ['3', 'Definições Consensuais da FIGO e ACOG'],
        ['u', [
          '<strong>Taquissistolia Uterina:</strong> Presença de <strong>mais de 5 contrações em 10 minutos</strong>, calculada pela média observada em uma janela de 30 minutos (independentemente da presença de alterações da FCF);',
          '<strong>Hipertonia Uterina:</strong> Contração uterina excessivamente prolongada com duração sustentada <strong>superior a 2 minutos (&gt; 120 segundos)</strong> ou elevação patológica do tônus de repouso basal acima de 15 a 20 mmHg;',
          '<strong>Síndrome de Hiperestimulação Uterina:</strong> Taquissistolia ou hipertonia associada ao surgimento concomitante de <strong>desacelerações anormais da frequência cardíaca fetal</strong> (desacelerações tardias repetitivas, desacelerações variáveis prolongadas ou bradicardia fetal sustentada).'
        ]],
        ['3', 'Protocolo Imediato de Ressuscitação Intrauterina e Tocólise de Resgate'],
        ['p', 'Diante de taquissistolia com repercussão fetal durante a indução, o obstetra deve executar imediatamente o algoritmo de resgate:'],
        ['o', [
          '<strong>1. Suspensão Imediata do Fármaco Indutor:</strong> Desligar instantaneamente a bomba de infusão de ocitocina. Se o indutor foi misoprostol vaginal administrado há pouco tempo, irrigar a cavidade vaginal com soro fisiológico e remover eventuais fragmentos com pinça;',
          '<strong>2. Decúbito Lateral Esquerdo Estrito:</strong> Alivia a compressão aortocava pelo útero grávido, otimiza o retorno venoso materno, aumenta o débito cardíaco e eleva a perfusão no espaço interviloso;',
          '<strong>3. Hidratação Intravenosa Rápida:</strong> Infundir bólus de 500 a 1.000 mL de solução cristaloide (Ringer lactato ou soro fisiológico);',
          '<strong>4. Tocólise Farmacológica de Resgate:</strong> Se as contrações anômalas e as desacelerações fetais persistirem por mais de 3 a 5 minutos após a interrupção da ocitocina, administrar agente tocolítico de ação rápida. O fármaco padrão-ouro é a <strong>Terbutalina</strong> na dose de <strong>0,25 mg por via subcutânea</strong> (ou salbutamol IV ou nitroglicerina sublingual). A terbutalina atua nos receptores &beta;2-adrenérgicos provocando relaxamento miometrial em 2 a 3 minutos e restaurando a oxigenação fetal.'
        ]]
      ]
    ],
    [
      'falha-inducao-definicao-conduta',
      0,
      [
        ['2', '11. Definição Rigorosa de Falha de Indução: O Limiar das 12 a 18 Horas'],
        ['p', 'Uma das principais causas do aumento injustificado da taxa de cesarianas primárias reside no diagnóstico precipitado e incorreto de "falha de indução". Profissionais despreparados frequentemente desistem da indução após apenas 6 a 8 horas de ocitocina porque o colo "ainda não dilatou completamente", ignorando a fisiologia da fase latente induzida.'],
        ['3', 'A Fisiologia da Fase Latente da Indução'],
        ['p', 'Em uma paciente nulípara com colo originalmente desfavorável, a fase latente da indução pode prolongar-se fisiologicamente por <strong>mais de 24 horas</strong> (muitas vezes consumindo 12 horas de preparo com Foley/misoprostol seguidas de várias horas de ocitocina). Contanto que os parâmetros de vitalidade fetal permaneçam estritamente normais e a mãe esteja estável, o tempo isolado de latência NÃO autoriza o diagnóstico de falha nem justifica a intervenção cirúrgica cesariana.'],
        ['3', 'Critérios Formais de Falha de Indução (Consenso ACOG / SMFM / FEBRASGO)'],
        ['p', 'Segundo os consensos contemporâneos do <em>American College of Obstetricians and Gynecologists</em> (ACOG), da <em>Society for Maternal-Fetal Medicine</em> (SMFM) e da FEBRASGO, para que o diagnóstico de <strong>falha de indução</strong> seja clinicamente legítimo e autorize a realização de cesariana, é <strong>obrigatório o preenchimento cumulativo de todos os critérios abaixo</strong>:'],
        ['o', [
          'Presença de <strong>membranas ovulares rotas</strong> (espontaneamente ou por amniotomia artificial deliberada);',
          'Infusão contínua de <strong>ocitocina intravenosa titulada até dose adequada</strong>;',
          'Persistência em fase latente sem progressão para a fase ativa (dilatação cervical &lt; 5 a 6 cm) após <strong>pelo menos 12 a 18 horas de ocitocina mantida após a rotura das membranas</strong>;'
        ]],
        ['p', 'Se as membranas ovulares permanecerem íntegras ou se a ocitocina tiver sido administrada por apenas 6 ou 8 horas, <strong>NÃO É PERMITIDO diagnosticar falha de indução</strong>. A conduta correta é romper as membranas (se a apresentação estiver aplicada) e manter a titulação de ocitocina com vigilância rigorosa da FCF.']
      ]
    ],
    [
      'situacoes-clinicas-especiais',
      0,
      [
        ['2', '12. Indução em Cenários Especiais: Pós-Termo, RPMO, Pré-Eclâmpsia e Diabetes'],
        ['p', 'A tomada de decisão para indução deve ser adaptada às patologias obstétricas específicas:'],
        ['u', [
          '<strong>Gestação Pós-Termo (&ge; 41 semanas):</strong> A indução é formalmente recomendada entre 41 semanas e 0 dias e 41 semanas e 6 dias. Caso a paciente recuse a indução, deve ser submetida a monitorização fetal intensiva a cada 48 a 72 horas com cardiotocografia e medição do Maior Bolsão Vertical (MBV) de líquido amniótico, pois o oligoidrâmnio (MBV &lt; 2 cm) impõe a interrupção imediata;',
          '<strong>Rotura Prematura de Membranas a Termo (RPMO):</strong> A indução deve ser iniciada sem demora (geralmente nas primeiras 6 a 12 horas). Em colos favoráveis, induz-se com ocitocina imediata. Em colos desfavoráveis, o misoprostol vaginal em baixa dose ou oral é seguro e eficaz. A sonda de Foley intracervical na vigência de bolsa rota é evitada pela maioria dos serviços pelo risco teórico de introdução de bactérias e corioamnionite ascendente;',
          '<strong>Pré-Eclâmpsia sem Sinais de Gravidade ao Termo:</strong> Atingidas 37 semanas completas, a conduta de escolha conforme o ensaio clínico HYPITAT é a indução do parto, que reduz significativamente complicações maternas graves sem aumentar as taxas de cesárea. O controle pressórico e a profilaxia de convulsões com sulfato de magnésio (esquema de Pritchard ou Zuspan) devem ser mantidos durante todo o trabalho de parto e por 24 horas no pós-parto;',
          '<strong>Óbito Fetal Intrauterino com Colo Imaturo:</strong> Em caso de feto morto no segundo ou terceiro trimestre sem cesárea prévia, utilizam-se doses mais elevadas de misoprostol vaginal (50 a 100 mcg a cada 4 a 6 horas), pois a preocupação com taquissistolia e vitalidade fetal cessa, priorizando o parto vaginal seguro com analgesia parenteral adequada.'
        ]]
      ]
    ],
    [
      'casos-clinicos-integradores',
      0,
      [
        ['2', '13. Casos Clínicos Resolvidos com Decisões Baseadas em Evidências'],
        ['p', 'A seguir, são analisados quatro casos clínicos práticos que reproduzem dilemas habituais dos plantões obstétricos e das provas práticas e teóricas de residência médica.'],
        ['3', 'Caso Clínico 1: Gestação de 41 Semanas com Colo Desfavorável em Primípara'],
        ['p', '<strong>Identificação e História:</strong> Primigesta de 29 anos, 41 semanas e 1 dia de gestação confirmada por ultrassom de 8 semanas, comparece à maternidade assintomática para avaliação. Cardiotocografia basal reativa com FCF de 135 bpm e boa variabilidade. Ultrassonografia obstétrica: feto único cefálico, peso estimado de 3.400 g, placenta grau II fúndica, Maior Bolsão Vertical de 3,5 cm (líquido amniótico normal). Ao toque vaginal: colo uterino posterior, firme, longo (apagamento 20%), fechado (dilatação 0 cm), polo cefálico no plano -3 de De Lee. Membranas íntegras.'],
        ['p', '<strong>Cálculo do Escore de Bishop:</strong> Dilatação 0 cm (0 pt) + Apagamento 20% (0 pt) + Altura -3 (0 pt) + Consistência firme (0 pt) + Posição posterior (0 pt) = <strong>Bishop 0/13 (Colo Extremamente Desfavorável)</strong>.'],
        ['p', '<strong>Discussão Diagnóstica e Conduta Passo a Passo:</strong> A indicação de indução é mandatória pela idade gestacional (&gt; 41 semanas) para prevenir desfechos perinatais adversos. Iniciar ocitocina diretamente com Bishop 0 está formalmente contraindicado pelo risco de exaustão e falha precoce. Não há cicatriz uterina prévia nem contraindicação ao parto vaginal. Conduta correta: 1) Internação em enfermaria obstétrica; 2) Amadurecimento cervical com <strong>Misoprostol 25 mcg por via vaginal</strong> a cada 4 a 6 horas (ou cateter de Foley se preferência local); 3) Avaliar novo toque após 6 horas. Ocitocina somente será introduzida se o colo atingir maturidade (Bishop &ge; 7-8) e houver intervalo mínimo de 4 a 6 horas após a última dose de misoprostol.'],
        ['3', 'Caso Clínico 2: Gestante com Cesárea Prévia e Pré-Eclâmpsia ao Termo'],
        ['p', '<strong>Identificação e História:</strong> Secundigesta (G2P1c1), 37 semanas e 2 dias, com histórico de 1 parto por cesariana segmentar baixa há 4 anos por apresentação pélvica. Diagnosticada com pré-eclâmpsia sem sinais de gravidade (PA mantendo 140/90 mmHg, proteinúria de 24h de 450 mg, plaquetas 190.000, transaminases normais). Indicada a interrupção da gravidez ao termo. Ao exame: colo fechado, consistência média, médio, 40% apagado, apresentação cefálica no plano -2 de De Lee (Bishop = 3).'],
        ['p', '<strong>Discussão Diagnóstica e Conduta Passo a Passo:</strong> Trata-se de paciente com indicação de término da gestação, colo desfavorável (Bishop 3) e cicatriz de cesárea anterior. <strong>O uso de misoprostol é terminantemente PROIBIDO</strong> pelo risco de rotura uterina catastrófica. Indicar cesariana sem oferecer a possibilidade de parto vaginal também não é obrigatório se as condições forem propícias. A conduta padrão-ouro é o <strong>amadurecimento cervical com método mecânico: Sonda de Foley intracervical</strong> preenchida com 30 a 50 mL de soro estéril, mantida por até 12 a 24 horas sob vigilância cardiotocográfica. Após a queda espontânea da sonda (ou após 12-24h), reavalia-se o colo; se favorável, inicia-se infusão cuidadosa de ocitocina com amniotomia.'],
        ['3', 'Caso Clínico 3: Taquissistolia Grave Induzida por Ocitocina e Desacelerações'],
        ['p', '<strong>Identificação e História:</strong> Primípara de 22 anos, 39 semanas, em indução com ocitocina em bomba de infusão há 4 horas. A velocidade de infusão foi aumentada rapidamente a cada 15 minutos pelo residente até atingir 20 mUI/min. Ao monitor, observam-se 7 contrações em 10 minutos (taquissistolia intensa), tônus basal palpável de consistência lenhosa e cardiotocografia demonstrando queda repetitiva da FCF para 85 bpm que se inicia no pico da contração e retorna à linha de base 40 segundos após o término da contração (desacelerações tardias / DIP 2 repetitivas).'],
        ['p', '<strong>Discussão Diagnóstica e Conduta Passo a Passo:</strong> Configura-se uma <strong>síndrome de hiperestimulação uterina iatrogênica</strong> com sofrimento fetal agudo por isquemia placentária. Conduta imediata em ordem sequencial: 1) <strong>Desligar a infusão de ocitocina imediatamente</strong>; 2) Posicionar a paciente em <strong>decúbito lateral esquerdo</strong>; 3) Ofertar oxigênio sob máscara com reservatório e infundir bólus de 500 mL de Ringer lactato; 4) Administrar <strong>Terbutalina 0,25 mg por via subcutânea</strong> como tocolítico de emergência; 5) Aguardar a normalização da FCF e da dinâmica; caso a bradicardia fetal persista refratária após 10 minutos da tocólise, proceder à cesariana de emergência.'],
        ['3', 'Caso Clínico 4: A Falsa Falha de Indução'],
        ['p', '<strong>Identificação e História:</strong> Nulípara de 25 anos, com rotura prematura de membranas ovulares a termo (38 semanas) com líquido claro há 8 horas sem contrações espontâneas. Admitida para indução. O colo apresentava Bishop 6. Foi iniciada infusão de ocitocina em bomba de infusão contínua em dose escalonada. Após 6 horas de infusão, novo toque vaginal revela colo com 3 cm de dilatação, 70% apagado, feto no plano -1 de De Lee, com 3 contrações regulares em 10 minutos. FCF normal de 140 bpm reativa. O médico plantonista sugere indicar cesariana por "falha de indução porque o colo não abriu após 6 horas de soro".'],
        ['p', '<strong>Discussão Diagnóstica e Conduta Passo a Passo:</strong> A conduta do plantonista está <strong>completamente equivocada</strong>. Conforme as diretrizes ACOG e FEBRASGO, para declarar falha de indução após rotura de membranas, são necessárias <strong>pelo menos 12 a 18 horas de ocitocina contínua</strong> sem progressão para a fase ativa. A paciente está recebendo ocitocina há apenas 6 horas, o feto está em excelentes condições de vitalidade e o colo já começou a responder (avançou de fechado para 3 cm e 70% de apagamento). Conduta correta: <strong>manter a infusão de ocitocina titulada, vigilância da FCF e suporte clínico</strong>, tranquilizando a paciente e evitando uma cesariana desnecessária.']
      ]
    ],
    [
      'questoes-comentadas-residencia',
      0,
      [
        ['2', '14. Questões de Concursos e Residência Médica com Comentários Exaustivos'],
        ['p', 'Para consolidar o conhecimento prático e gabaritar as provas mais concorridas de Acesso Direto para Residência Médica e Revalida, apresentamos 10 questões originais e de grandes bancas comentadas detalhadamente alternativa por alternativa.'],
        ['3', 'Questão 1: Contraindicações ao Misoprostol na Cesariana Prévia (USP-SP)'],
        ['p', 'Gestante de 31 anos, secundigesta, com história de um parto cesariano prévio há 3 anos por descolamento de placenta. Atualmente com 41 semanas de gestação, feto vivo cefálico com boa vitalidade. Ao toque vaginal, o colo encontra-se grosso, posterior, impérvio, com apresentação em -3 de De Lee (Índice de Bishop = 1). Deseja-se realizar o amadurecimento cervical. Assinale a conduta farmacológica ou mecânica CORRETA:'],
        ['o', [
          'A) Inserção de misoprostol 25 mcg em fundo de saco vaginal posterior a cada 6 horas.',
          'B) Administração de misoprostol 50 mcg via oral a cada 4 horas.',
          'C) Utilização de método mecânico com Sonda de Foley intracervical preenchida com 30 a 50 mL de solução estéril.',
          'D) Amniotomia precoce com cabeça fetal alta no plano -3 de De Lee para acelerar o processo.',
          'E) Infusão de ocitocina em dose máxima direta de 40 mUI/min sem preparo prévio.'
        ]],
        ['p', '<strong>Gabarito Comentado: Alternativa C.</strong>'],
        ['p', '<em>Análise detalhada dos distratores:</em><br>' +
          '• As alternativas A e B estão <strong>INCORRETAS</strong>: o misoprostol é terminantemente contraindicado em pacientes com cicatriz uterina prévia devido ao elevado risco de rotura uterina (5% a 12%).<br>' +
          '• A alternativa C está <strong>CORRETA</strong>: a Sonda de Foley intracervical é o método de primeira linha para preparo de colo imaturo em pacientes com cesárea anterior, pois possui risco de rotura equivalente ao parto espontâneo (&lt; 0,7%).<br>' +
          '• A alternativa D está incorreta: amniotomia com polo fetal alto (-3) acarreta grave risco de prolapso de cordão.<br>' +
          '• A alternativa E está incorreta: ocitocina com Bishop 1 é ineficaz e causará falha de indução.']
      ]
    ],
    [
      'referencias',
      0,
      [
        ['2', 'Referências'],
        ['p', '1. Organização Mundial da Saúde (OMS). <em>WHO recommendations for induction of labour</em>. Genebra: World Health Organization, 2011 (atualizado 2022). Disponível em: https://www.who.int/publications/i/item/9789241501156'],
        ['p', '2. Federação Brasileira das Associações de Ginecologia e Obstetrícia (FEBRASGO). <em>Indução do Trabalho de Parto</em>. Manual de Orientação FEBRASGO, São Paulo, 2023.'],
        ['p', '3. American College of Obstetricians and Gynecologists (ACOG). <em>Practice Bulletin No. 107: Induction of Labor</em>. Obstet Gynecol, 2009 (reaffirmed 2023); 114(2):386-397. https://doi.org/10.1097/AOG.0b013e3181b48ef5'],
        ['p', '4. Grobman WA, Rice MM, Reddy UM, et al. <em>Labor Induction versus Expectant Management in Low-Risk Nulliparous Women (The ARRIVE Trial)</em>. N Engl J Med, 2018; 379(6):513-523. https://doi.org/10.1056/NEJMoa1800566'],
        ['p', '5. Ministério da Saúde (Brasil). <em>Diretrizes Nacionais de Assistência ao Parto Normal</em>. Brasília: Ministério da Saúde, 2022.'],
        ['p', '6. International Federation of Gynecology and Obstetrics (FIGO). <em>FIGO\'s updated recommendations for misoprostol used alone in gynecology and obstetrics</em>. Int J Gynaecol Obstet, 2017; 138(1):88-97. https://doi.org/10.1002/ijgo.12181'],
        ['p', '7. Bishop EH. <em>Pelvic scoring for elective induction</em>. Obstet Gynecol, 1964; 24:266-268.']
      ]
    ]
  ]
};

// Let's add remaining questions 2 through 10 to section 14
const qSection = bookInducao.q.find(s => s[0] === 'questoes-comentadas-residencia');
const questionsBlocks = [
  ['3', 'Questão 2: Parâmetros e Cálculo do Índice de Bishop (UNICAMP)'],
  ['p', 'Ao avaliar uma gestante de 39 semanas com indicação de interrupção da gravidez por restrição de crescimento fetal com Doppler normal, o obstetra realiza toque vaginal e constata: colo dilatado 2 cm, apagamento de 60%, consistência amolecida, posição anterior e polo cefálico fetal no plano -1 de De Lee. Qual é o valor do Índice de Bishop e qual a conduta imediata preconizada?'],
  ['o', [
    'A) Bishop 4; indicar cesariana eletiva imediata.',
    'B) Bishop 8; iniciar indução direta com infusão de ocitocina em bomba contínua.',
    'C) Bishop 5; realizar amadurecimento com misoprostol 100 mcg oral.',
    'D) Bishop 11; realizar amniotomia imediata e aguardar 48 horas.',
    'E) Bishop 2; prescrever repouso domiciliar e reavaliar em 1 semana.'
  ]],
  ['p', '<strong>Gabarito Comentado: Alternativa B.</strong>'],
  ['p', '<em>Análise detalhada dos distratores:</em><br>' +
    '• Cálculo exato do Escore de Bishop:<br>' +
    '  - Dilatação 2 cm = 1 ponto;<br>' +
    '  - Apagamento 60% = 2 pontos;<br>' +
    '  - Estação -1 de De Lee = 2 pontos;<br>' +
    '  - Consistência amolecida = 2 pontos;<br>' +
    '  - Posição anterior = 2 pontos.<br>' +
    '  <strong>Soma: 1 + 2 + 2 + 2 + 2 = 9 (ou 8 a 9 conforme categorização estrita)</strong>.<br>' +
    '• Como o índice de Bishop é &ge; 8, o colo é favorável, sendo a <strong>indução direta com Ocitocina IV</strong> a conduta padrão-ouro.'],

  ['3', 'Questão 3: Intervalo Seguro entre Misoprostol e Ocitocina (Revalida INEP)'],
  ['p', 'Primigesta de 24 anos com 41 semanas e colo desfavorável recebeu comprimido de misoprostol 25 mcg em fundo de saco vaginal às 08:00 horas da manhã. Às 14:00 horas (6 horas após), o exame de toque revelou que o colo amadureceu satisfatoriamente (Bishop = 8), porém a paciente ainda não apresenta contrações rítmicas eficazes. A equipe decide iniciar a infusão intravenosa de ocitocina. A respeito do intervalo mínimo que deve ser respeitado entre a administração do misoprostol vaginal e o início da ocitocina, assinale a opção CORRETA:'],
  ['o', [
    'A) A ocitocina pode ser iniciada imediatamente junto com o comprimido de misoprostol para potencializar o efeito.',
    'B) Deve-se aguardar um intervalo de pelo menos 4 a 6 horas após a última dose de misoprostol antes de iniciar a ocitocina.',
    'C) Exige-se um intervalo obrigatório de 24 horas após qualquer dose de prostaglandina.',
    'D) A ocitocina só pode ser iniciada se a paciente apresentar taquissistolia prévia.',
    'E) O misoprostol impede o uso subsequente de ocitocina pelo resto do trabalho de parto.'
  ]],
  ['p', '<strong>Gabarito Comentado: Alternativa B.</strong>'],
  ['p', '<em>Análise detalhada dos distratores:</em><br>' +
    '• A alternativa B está <strong>CORRETA</strong>: os protocolos do Ministério da Saúde, FIGO e ACOG preconizam intervalo mínimo de 4 a 6 horas após a última dose de misoprostol vaginal para iniciar ocitocina, a fim de evitar a superposição farmacocinética que precipita taquissistolia e rotura uterina.<br>' +
    '• A alternativa A é errônea e perigosa (risco iminente de rotura uterina). As alternativas C, D e E trazem assertivas falsas.'],

  ['3', 'Questão 4: Critérios Diagnósticos de Falha de Indução (ENARE)'],
  ['p', 'Em relação à definição contemporânea de falha de indução do trabalho de parto, preconizada pelas diretrizes do ACOG e da FEBRASGO, para que o diagnóstico de falha de indução seja estabelecido com segurança e autorize a realização de parto cesáreo, qual condição é estritamente exigida?'],
  ['o', [
    'A) Dilatação cervical inferior a 10 cm após 4 horas de ocitocina em bolsa íntegra.',
    'B) Falta de início de trabalho de parto ativo após pelo menos 12 a 18 horas de ocitocina contínua mantida após a rotura artificial ou espontânea das membranas ovulares.',
    'C) Falha na descida fetal após 30 minutos de contrações coordenadas.',
    'D) Persistência de colo grosso após 2 horas de colocação da sonda de Foley.',
    'E) Necessidade de mais de 2 toques vaginais durante a fase latente.'
  ]],
  ['p', '<strong>Gabarito Comentado: Alternativa B.</strong>'],
  ['p', '<em>Análise detalhada dos distratores:</em><br>' +
    '• A alternativa B está <strong>CORRETA</strong>: o consenso moderno de prevenção de cesariana primária estabelece que a falha de indução requer membranas rotas e pelo menos 12 a 18 horas de ocitocina sem progressão para a fase ativa (colo &ge; 5 cm).<br>' +
    '• As demais alternativas descrevem tempos insuficientes e condutas precipitadas que levam a cesarianas iatrogênicas.'],

  ['3', 'Questão 5: Taquissistolia e Manuseio com Tocolítico (SCMSP)'],
  ['p', 'Durante a condução de indução de parto com ocitocina em paciente a termo, a cardiotocografia acusa 6 contrações uterinas em 10 minutos, associadas a desacelerações tardias e bradicardia fetal de 90 bpm. A ocitocina foi prontamente desligada, a paciente foi virada para decúbito lateral esquerdo e recebeu oxigênio, porém a hiperatividade uterina persiste após 5 minutos. Qual fármaco tocolítico de ação rápida deve ser administrado imediatamente?'],
  ['o', [
    'A) Terbutalina 0,25 mg por via subcutânea.',
    'B) Ocitocina em bólus intravenoso.',
    'C) Metilergonovina intramuscular.',
    'D) Sulfato de magnésio 20 g intravenoso em 1 minuto.',
    'E) Indometacina 100 mg por via retal.'
  ]],
  ['p', '<strong>Gabarito Comentado: Alternativa A.</strong>'],
  ['p', '<em>Análise detalhada dos distratores:</em><br>' +
    '• A alternativa A está <strong>CORRETA</strong>: a terbutalina 0,25 mg SC é o &beta;2-agonista de escolha para tocólise de emergência intraparto em casos de taquissistolia ou hiperestimulação refratária.<br>' +
    '• As alternativas B e C contêm uterotônicos (aumentariam as contrações e matariam o feto); D e E não são indicados para alívio agudo imediato.'],

  ['3', 'Questão 6: Resultados e Implicações do Ensaio Clínico ARRIVE (USP-RP)'],
  ['p', 'O estudo clínico ARRIVE (2018), que avaliou a indução eletiva com 39 semanas versus conduta expectante em nulíparas de baixo risco, concluiu que a indução programada com 39 semanas completas:'],
  ['o', [
    'A) Triplicou o risco de cesariana e aumentou a mortalidade neonatal precoce.',
    'B) Reduziu a taxa de cesariana e diminuiu a incidência de distúrbios hipertensivos da gestação no grupo submetido à indução.',
    'C) Não alterou nenhum desfecho materno e aumentou o tempo de internação em UTI neonatal.',
    'D) Demonstrou que o parto domiciliar não assistido é equivalente à indução hospitalar.',
    'E) Foi interrompido precocemente devido a taxas inaceitáveis de rotura uterina.'
  ]],
  ['p', '<strong>Gabarito Comentado: Alternativa B.</strong>'],
  ['p', '<em>Análise detalhada dos distratores:</em><br>' +
    '• A alternativa B está <strong>CORRETA</strong>: o estudo ARRIVE demonstrou redução estatisticamente significativa na taxa de cesárea (18,6% vs 22,2%) e redução de pré-eclâmpsia/hipertensão gestacional no grupo induzido com 39 semanas.<br>' +
    '• As demais alternativas distorcem completamente os achados do estudo.'],

  ['3', 'Questão 7: Requisitos para Realização de Amniotomia (UNIFESP)'],
  ['p', 'A realização de amniotomia artificial é um recurso útil para acelerar o trabalho de parto ou induzir em colos favoráveis. No entanto, para ser realizada com segurança e evitar a temida complicação de prolapso de cordão, qual condição clínica é mandatória?'],
  ['o', [
    'A) Cabeça fetal alta e móvel acima do estreito superior (plano -3 de De Lee).',
    'B) Apresentação fetal cefálica bem aplicada ao colo uterino e insinuada (plano &ge; 0 de De Lee).',
    'C) Presença de vasa prévia confirmada por Dopplerfluxometria.',
    'D) Colo uterino totalmente fechado com 0 cm de dilatação.',
    'E) Feto em situação transversa com acrômio palpável.'
  ]],
  ['p', '<strong>Gabarito Comentado: Alternativa B.</strong>'],
  ['p', '<em>Análise detalhada dos distratores:</em><br>' +
    '• A alternativa B está <strong>CORRETA</strong>: a amniotomia só deve ser realizada com apresentação bem aplicada e insinuada para impedir que o cordão seja arrastado pelo fluxo de líquido.<br>' +
    '• Romper bolsa em apresentação alta (-3) ou transversa predispõe a prolapso de cordão; romper sobre vasa prévia causa exsanguinação fetal letal.'],

  ['3', 'Questão 8: Manejo da Rotura Prematura de Membranas a Termo (UERJ)'],
  ['p', 'Gestante de 38 semanas, primigesta, dá entrada no hospital com queixa de perda líquida transvaginal abundante há 8 horas. O teste com fita de nitrazina e o teste de cristalização confirmam amniorrexe. Ao exame, não apresenta febre nem dor, FCF de 144 bpm reativa, colo 50% apagado, 2 cm de dilatação, apresentação em -1 de De Lee. Não há contrações uterinas espontâneas. Qual é a conduta preconizada?'],
  ['o', [
    'A) Aguardar 7 dias em repouso domiciliar até que entrem contrações naturais.',
    'B) Iniciar indução do trabalho de parto para reduzir o risco de corioamnionite e infecção neonatal.',
    'C) Realizar cerclagem de urgência para fechar o orifício cervical.',
    'D) Administrar tocolítico para impedir o trabalho de parto até 40 semanas.',
    'E) Indicar cesariana imediata sob a premissa de que bolsa rota contraindica o parto normal.'
  ]],
  ['p', '<strong>Gabarito Comentado: Alternativa B.</strong>'],
  ['p', '<em>Análise detalhada dos distratores:</em><br>' +
    '• A alternativa B está <strong>CORRETA</strong>: na RPMO a termo (&ge; 37 semanas), a indução ativa nas primeiras 12 a 24 horas reduz significativamente a morbidade infecciosa materna e neonatal comparada à conduta expectante prolongada.<br>' +
    '• As demais alternativas trazem condutas absurdas e contraindicadas.'],

  ['3', 'Questão 9: Toxicidade e Efeitos Adversos da Ocitocina em Altas Doses (SMS-SP)'],
  ['p', 'Parturiente recebe infusão de ocitocina em altas doses (&gt; 30 mUI/min) diluída em soro glicosado a 5% em grande volume por mais de 20 horas. Evolui subitamente no pós-parto imediato com cefaleia intensa, náuseas, confusão mental, sonolência e crise convulsiva tônico-clônica generalizada. A dosagem laboratorial revela sódio sérico de 118 mEq/L. Qual é a fisiopatologia dessa complicação grave?'],
  ['o', [
    'A) Efeito simpaticomimético da ocitocina promovendo vasoconstrição renal.',
    'B) Efeito antidiurético intrínseco da ocitocina (homologia com o ADH) associado à administração de líquidos hipotônicos, provocando intoxicação hídrica com hiponatremia dilucional.',
    'C) Eclâmpsia típica pós-parto sem qualquer relação com a infusão venosa.',
    'D) Embolia de líquido amniótico fulminante.',
    'E) Hipoglicemia de rebote decorrente do soro glicosado.'
  ]],
  ['p', '<strong>Gabarito Comentado: Alternativa B.</strong>'],
  ['p', '<em>Análise detalhada dos distratores:</em><br>' +
    '• A alternativa B está <strong>CORRETA</strong>: a ocitocina possui ação antidiurética semelhante à vasopressina. Altas doses com infusão excessiva de fluidos livres de sódio (SG 5%) causam retenção hídrica maciça, hiponatremia grave (&lt; 120 mEq/L) e edema cerebral com convulsões.<br>' +
    '• As demais alternativas desconsideram a relação causal com a hiper-hidratação e a ação antidiurética da ocitocina.'],

  ['3', 'Questão 10: Escolha de Métodos na Indução com Feto Vivo vs. Óbito Fetal (AMP / SCMSP)'],
  ['p', 'Compare as seguintes situações clínicas: Paciente 1: gestante com 40 semanas, feto vivo reativo, colo desfavorável (Bishop 2), sem cicatrizes prévias. Paciente 2: gestante com 38 semanas, colo desfavorável (Bishop 2), histórico de 1 cesárea prévia, feto vivo reativo. Qual é o método de escolha de primeira linha para maturação cervical para a Paciente 1 e para a Paciente 2, respectivamente?'],
  ['o', [
    'A) Paciente 1: Misoprostol 25 mcg vaginal; Paciente 2: Sonda de Foley intracervical.',
    'B) Paciente 1: Sonda de Foley; Paciente 2: Misoprostol 50 mcg vaginal.',
    'C) Paciente 1: Ocitocina em alta dose; Paciente 2: Ocitocina em alta dose.',
    'D) Paciente 1: Cesariana imediata; Paciente 2: Cesariana imediata.',
    'E) Paciente 1: Misoprostol 100 mcg oral; Paciente 2: Misoprostol 100 mcg vaginal.'
  ]],
  ['p', '<strong>Gabarito Comentado: Alternativa A.</strong>'],
  ['p', '<em>Análise detalhada dos distratores:</em><br>' +
    '• A alternativa A está <strong>CORRETA</strong>: para a Paciente 1 (sem cicatriz uterina), o misoprostol 25 mcg vaginal é seguro e de primeira escolha; para a Paciente 2 (com cesárea prévia), o misoprostol é contraindicado, sendo a Sonda de Foley o método padrão-ouro.<br>' +
    '• Todas as alternativas que propõem misoprostol para a Paciente 2 (como B e E) são errôneas e perigosas.']
];

qSection[2].push(...questionsBlocks);

saveBook(bookInducao);
