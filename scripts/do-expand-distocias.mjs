import fs from 'fs';

// Let's read build-distocias.mjs
let content = fs.readFileSync('build-scripts/build-distocias.mjs', 'utf8');

const extraSectionsStr = `
    [
      'atitudes-fetais-deflexoes',
      0,
      [
        ['2', 'Mecanismo de Parto nas Apresentações Cefálicas: Vértice e as Três Deflexões'],
        ['p', 'A atitude fetal cefálica em relação ao tronco determina o diâmetro ântero-posterior que se apresenta ao estreito superior da bacia materna, constituindo o fator primordial para a viabilidade mecânica do parto vaginal.'],
        ['3', 'A Apresentação Cefálica Fletida (Vértice ou Occipício)'],
        ['p', 'Na atitude de flexão máxima, o queixo fetal encosta firmemente na fúrcula esternal do tórax, oferecendo à bacia o menor diâmetro cefálico possível: o <strong>Diâmetro Suboccipitobregmático (SOB = 9,5 cm)</strong> e circunferência de 32 cm. O ponto de referência anatômico ao toque vaginal é o <strong>occipício (pequena fontanela ou fontanela lambdoide / fontanela posterior triangular)</strong> e a linha de orientação é a <strong>sutura sagital</strong>. É a apresentação fisiológica presente em mais de 95% a 96% dos nascimentos a termo, proporcionando excelente prognóstico de parto vaginal espontâneo.'],
        ['3', 'As Apresentações Cefálicas Defletidas: 1º, 2º e 3º Graus'],
        ['p', 'Quando ocorrem graus variáveis de extensão da cabeça sobre a coluna cervical, originam-se as apresentações defletidas:'],
        ['t', [
          'Grau de Deflexão',
          'Ponto de Referência Anatômico',
          'Linha de Orientação no Toque',
          'Diâmetro de Insinuação e Medida',
          'Viabilidade de Parto Vaginal'
        ], [
          ['<strong>Vértice / Fletida</strong>', 'Occipício / Fontanela Posterior (Lambda)', 'Sutura sagital', 'Suboccipitobregmático (SOB) = <strong>9,5 cm</strong>', '<strong>Fisiológico / Excelente</strong> (95% dos partos)'],
          ['<strong>Defletida de 1º Grau (Bregma)</strong>', 'Bregma / Fontanela Anterior (Losango)', 'Sutura sagitometópica', 'Occipitofrontal (OF) = <strong>12,0 cm</strong>', '<strong>Possível</strong>, mas trabalho de parto lento e arrastado'],
          ['<strong>Defletida de 2º Grau (Fronte)</strong>', 'Glabela / Raiz do Nariz', 'Sutura metópica', 'Occipitomentoniano (OM) = <strong>13,5 cm</strong>', '<strong>IMPOSSÍVEL A TERMO</strong>; <strong>Indicação absoluta de Cesariana</strong>'],
          ['<strong>Defletida de 3º Grau (Face)</strong>', 'Mento (Queixo)', 'Linha facial (sutura intermaxilar)', 'Submentobregmático (SMB) = <strong>9,5 cm</strong>', '<strong>Possível APENAS em Mento-Anterior</strong>; Mento-posterior exige Cesariana']
        ], 'book-table'],
        ['3', 'Particularidades Cruciais da Apresentação de Face: Mento-Anterior vs Mento-Posterior'],
        ['p', 'Na deflexão de 3º grau (apresentação de face), a cabeça fetal atinge extensão máxima (o occipício toca o dorso fetal), oferecendo um diâmetro compatível com a bacia (SMB = 9,5 cm). Contudo, a evolução do parto depende criticamente da rotação interna:'],
        ['u', [
          '<strong>Variedade Mento-Anterior:</strong> O mento fetal gira para a sínfise púbica da mãe. O queixo escorrega sob a arcada púbica e a cabeça realiza o desprendimento por movimento de flexão gradual da face, fronte e occipício sobre o períneo materno. <strong>O parto vaginal é plenamente viável</strong>;',
          '<strong>Variedade Mento-Posterior:</strong> O mento fetal gira para a concavidade sacral posterior da mãe. O queixo impacta contra o promontório sacral, enquanto o tórax fetal entra prematuramente no estreito superior e o pescoço curto não possui comprimento suficiente para permitir a extensão reversa. Ocorre encravamento mecânico absoluto. <strong>O parto vaginal é absolutamente IMPOSSÍVEL na variedade mento-posterior persistente</strong>, sendo a <strong>cesariana de emergência obrigatória</strong>. É terminantemente proibida a tentativa de fórcipe ou rotação manual forçada nessa posição.']
        ]]
      ]
    ],
    [
      'apresentacao-pelvica-manobras',
      0,
      [
        ['2', 'Apresentação Pélvica: Mecanismo de Parto, Variedades e Manobras Tocúrgicas Clássicas'],
        ['p', 'A apresentação pélvica ocorre quando o polo podálico do concepto ocupa o estreito superior da bacia materna, incidindo em 3% a 4% das gestações a termo.'],
        ['3', 'Variedades Anatômicas da Apresentação Pélvica'],
        ['u', [
          '<strong>Pélvica Incompleta Modo Nádegas (Aglocócica):</strong> As coxas encontram-se fletidas sobre o abdome e as pernas estendidas sobre a face anterior do tronco (o feto "abraça as próprias pernas"). É a variedade mais frequente (representando cerca de 65% a 70% das apresentações pélvicas a termo);',
          '<strong>Pélvica Completa:</strong> As coxas e as pernas encontram-se completamente fletidas, com o concepto "sentado de pernas cruzadas" (alfaiate) sobre a entrada da bacia (cerca de 25% a 30%);',
          '<strong>Pélvica Incompleta Modo Pés ou Joelhos:</strong> Uma ou ambas as extremidades inferiores encontram-se estendidas e prolapsadas no canal de parto (mais comum em prematuros extremos; alto risco de prolapso de cordão umbilical).'
        ]],
        ['3', 'As Grandes Manobras Obstétricas no Parto Pélvico'],
        ['p', 'O parto pélvico vaginal assistido segue a regra áurea do "hands-off" (não intervir) até o desprendimento espontâneo do polo pélvico até o nível das escápulas. A partir desse marco anatômico, executam-se manobras padronizadas se houver dificuldade de progressão:'],
        ['o', [
          '<strong>Manobra de Bracht:</strong> Manobra universal para auxílio simultâneo de ombros e cabeça. Quando o ângulo inferior das escápulas fetais se exterioriza pela vulva, o obstetra segura o polo pélvico e as coxas fetais com ambas as mãos (polegares nas faces posteriores das coxas e dedos sobre a região lombossacral) e realiza uma báscula contínua e suave do dorso fetal sobre o abdome materno em direção à sínfise púbica, mantendo a flexão da cabeça até o desprendimento simultâneo do queixo e da face;',
          '<strong>Manobra de Rojas (ou Lovset):</strong> Indicada para liberação dos braços e ombros quando há retenção escapular. O obstetra segura o tronco fetal com ambas as mãos e imprime uma rotação de 180 graus no sentido horário, provocando o desprendimento do braço anterior sob a sínfise púbica; em seguida, inverte o movimento rodando 180 graus no sentido anti-horário para exteriorizar o outro braço;',
          '<strong>Manobra de Mauriceau-Smellie-Veit:</strong> Manobra padrão-ouro manual para o desprendimento da <strong>cabeça derradeira retida</strong>. O corpo fetal é colocado cavalgando sobre o antebraço do obstetra; o dedo indicador (ou indicador e médio) da mão inferior é introduzido na vagina até a boca ou fossa canina da maxila fetal para promover a flexão ativa da cabeça sobre o peito, enquanto dois dedos da mão superior do obstetra apoiam-se sobre os ombros fetais em forma de garfo (ao redor do pescoço) exercendo tração oblíqua inicial para baixo até que o suboccipício engrene sob o púbis, seguido de movimento curvo para cima;',
          '<strong>Aplicação do Fórcipe de Piper:</strong> Quando as manobras manuais para a cabeça derradeira falham, o Fórcipe de Piper é aplicado enquanto um assistente eleva o corpo fetal envolvido em campo cirúrgico estéril, permitindo a tração simétrica sem tração cervical nociva.'
        ]]
      ]
    ],
    [
      'assinclitismo-mecanica-pelvica',
      0,
      [
        ['2', 'Assinclitismo: Sinclitismo vs. Assinclitismo Anterior e Posterior'],
        ['p', 'A descida do polo cefálico fetal através do estreito superior da bacia raramente ocorre de forma milimetricamente perpendicular. A inclinação lateral da cabeça fetal em relação aos diâmetros da pelve denomina-se assinclitismo.'],
        ['3', 'Sinclitismo Fisiológico'],
        ['p', 'No <strong>sinclitismo</strong>, a sutura sagital fetal encontra-se exatamente equidistante do promontório sacral e da borda superior da sínfise púbica materna durante a descida. Ambos os ossos parietais fetais descem no mesmo plano horizontal e transpõem o estreito superior simultaneamente.'],
        ['3', 'Assinclitismo Anterior (Oblíqua de Naegele)'],
        ['p', 'No <strong>assinclitismo anterior</strong> (manobra de Naegele), a sutura sagital fetal encontra-se inclinada e <strong>deslocada posteriormente em direção ao promontório sacral</strong>. Como consequência geométrica, o <strong>osso parietal anterior</strong> (voltado para a sínfise púbica) é o primeiro a descer e a ser tocado pelo examinador. É o tipo mais comum e favorável de assinclitismo, facilitando a passagem do polo cefálico em bacias platipeloides e ginecoides.'],
        ['3', 'Assinclitismo Posterior (Oblíqua de Litzmann)'],
        ['p', 'No <strong>assinclitismo posterior</strong> (manobra de Litzmann), a sutura sagital fetal encontra-se inclinada e <strong>deslocada anteriormente em direção à sínfise púbica materna</strong>. Como consequência, o <strong>osso parietal posterior</strong> (voltado para o sacro) é o primeiro a descer e a ser tocado. O osso parietal anterior fica temporariamente aprisionado atrás do púbis. Trata-se de uma distócia mais severa e de pior prognóstico; se persistente e irredutível associada a dinâmica forte, configura parada da insinuação e exige cesariana.']
      ]
    ],
    [
      'episiotomia-tecnica-reparo',
      0,
      [
        ['2', 'Episiotomia Seletiva: Mediana vs. Médio-Lateral e Prevenção de Lacerações Graves'],
        ['p', 'A episiotomia consiste na secção cirúrgica intencional do períneo com tesoura de Mayo reta ou curva durante o coroamento vulvar para ampliação do canal de parto.'],
        ['3', 'Abolição da Episiotomia de Rotina'],
        ['p', 'As evidências científicas modernas consolidadas pela OMS e FEBRASGO aboliram definitivamente a episiotomia profilática ou rotineira em nulíparas. A prática universal não previne incontinência urinária, não reduz o prolapso genital futuro e eleva significativamente as taxas de dor puerperal crônica, dispareunia e sangramento. A indicação moderna é <strong>estritamente seletiva</strong>, restrita a partos instrumentais complexos (fórcipe/vácuo), distócia de ombros com necessidade de manobras internas manuais ou sofrimento fetal agudo com períneo excessivamente rígido.'],
        ['3', 'Comparação Técnica: Episiotomia Médio-Lateral vs Mediana'],
        ['t', [
          'Critério Comparativo',
          'Episiotomia Mediana (Central)',
          'Episiotomia Médio-Lateral (Recomendada no Brasil)'
        ], [
          ['Incisão e Direção', 'Incisão na linha média vertical da fúrcula em direção ao ânus', 'Incisão a partir da fúrcula com ângulo de <strong>45° a 60°</strong> em direção à tuberosidade isquiática'],
          ['Estruturas Seccionadas', 'Rafe mediana do corpo perineal', 'Músculos bulbocavernoso e transverso superficial do períneo'],
          ['Risco de Lesão Esfincteriana (OASIS)', '<strong>MUITO ELEVADO</strong>; extensão fácil para esfíncter anal e reto (Graus 3 e 4)', '<strong>MUITO MENOR</strong>; protege ativamente o complexo esfincteriano anal'],
          ['Sangramento e Dor Pós-Parto', 'Menor sangramento cirúrgico; reparo fácil; menor dor', 'Maior sangramento cirúrgico; dor pós-parto mais acentuada nos primeiros dias'],
          ['Cicatrização e Dispareunia', 'Excelente cicatrização anatômica cosmética', 'Cicatrização mais lenta; maior risco de fibrose e dispareunia inicial'],
          ['Recomendação Oficial', 'Proscrita na maioria dos serviços com parto instrumental', '<strong>Técnica de escolha preferencial</strong> quando necessária']
        ], 'book-table']
      ]
    ],
    [
      'lesoes-plexo-braquial-auditoria',
      0,
      [
        ['2', 'Paralisia Braquial Obstétrica Perinatal: Duchenne-Erb vs. Klumpke e Aspectos Periciais'],
        ['p', 'A paralisia braquial obstétrica decorre da tração excessiva e estiramento ou avulsão das raízes nervosas do plexo braquial durante o nascimento, habitualmente no contexto de distócia de espáduas.'],
        ['3', 'Diagnóstico Diferencial Clínico'],
        ['u', [
          '<strong>Paralisia de Duchenne-Erb (Alta / Superior - C5, C6 e C7):</strong> Corresponde a <strong>mais de 80% a 90% dos casos</strong>. Acomete os músculos deltoide, bíceps braquial, braquial anterior e supinador. O membro superior acometido apresenta a atitude clássica do <strong>"braço em gorjeta de garçom" (porter\'s tip sign)</strong>: aduzido junto ao tronco, em extensão e rotação interna do ombro, com o antebraço pronado e o punho fletido. <strong>Achado neurológico reflexo fundamental:</strong> O <strong>reflexo de Moro é assimétrico ou ausente</strong> do lado lesado, porém o <strong>reflexo de preensão palmar está rigorosamente normal e preservado</strong> (pois as raízes de C8-T1 estão intactas);',
          '<strong>Paralisia de Dejerine-Klumpke (Baixa / Inferior - C8 e T1):</strong> Muito mais rara (menos de 2% a 5% dos casos). Acomete a musculatura intrínseca da mão e flexores do punho. A mão assume aspecto de <strong>"mão em garra"</strong>. O reflexo de Moro está preservado, mas o <strong>reflexo de preensão palmar está completamente AUSENTE</strong>. Pode associar-se à <strong>Síndrome de Horner</strong> (ptose palpebral, miose pupilar, enoftalmia e anidrose facial unilateral) quando há avulsão da raiz de T1 com comprometimento das fibras simpáticas cervicais.'
        ]],
        ['3', 'Auditoria Médico-Legal na Distócia de Ombros'],
        ['p', 'A presença de paralisia braquial neonatal é o principal motivador de ações cíveis indenizatórias de erro médico em obstetrícia. Para ilidir a alegação de negligência ou imperícia e demonstrar a inevitabilidade biológica do evento, o prontuário deve comprovar:'],
        ['o', [
          '1. Ausência de tração descendente forçada sobre o polo cefálico no momento do desprendimento;',
          '2. Registro minucioso do tempo decorrido entre a saída da cabeça e o corpo (idealmente &lt; 3 a 5 minutos);',
          '3. Descrição sequencial precisa das manobras executadas em ordem de complexidade (McRoberts, Rubin I, Rubin II/Woods, Jacquemier);',
          '4. Ausência de manobra de Kristeller (cuja anotação em prontuário gera presunção jurídica quase absoluta de culpa por dano corporal culposo).'
        ]]
      ]
    ],
`;

// Insert extra sections before casos-clinicos-integradores
const targetMarker = "    [\n      'casos-clinicos-integradores',";
if (content.includes(targetMarker)) {
  content = content.replace(targetMarker, extraSectionsStr + targetMarker);
  console.log('Successfully inserted extra sections in Q array.');
} else {
  console.log('Target marker not found in Q array!');
}

// Update bookDistocias.o
const tocExtra = `
    ['atitudes-fetais-deflexoes', 'Mecanismo de Parto nas Apresentações Cefálicas: Vértice e Deflexões'],
    ['apresentacao-pelvica-manobras', 'Apresentação Pélvica: Mecanismo de Parto e Manobras Tocúrgicas'],
    ['assinclitismo-mecanica-pelvica', 'Assinclitismo: Sinclitismo vs. Assinclitismo Anterior e Posterior'],
    ['episiotomia-tecnica-reparo', 'Episiotomia Seletiva: Mediana vs. Médio-Lateral'],
    ['lesoes-plexo-braquial-auditoria', 'Paralisia Braquial Obstétrica Perinatal e Auditoria Pericial'],
    ['casos-clinicos-integradores', 'Casos Clínicos Resolvidos de Distócias e Parto Instrumental'],`;

const tocTarget = "    ['casos-clinicos-integradores', '13. Casos Clínicos Resolvidos de Distócias e Parto Instrumental'],";
if (content.includes(tocTarget)) {
  content = content.replace(tocTarget, tocExtra);
  console.log('Successfully updated TOC.');
} else {
  console.log('TOC target not found!');
}

fs.writeFileSync('build-scripts/build-distocias.mjs', content, 'utf8');
console.log('Updated build-scripts/build-distocias.mjs');
