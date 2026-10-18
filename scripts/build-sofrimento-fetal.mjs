import fs from 'fs';
import { htmlToBlocks, saveBook, countUsefulChars } from './bloco-04-utils.mjs';

const sourceHtmlPath = 'apostilas/avaliacao-vitalidade-fetal/index.html';
const sourceHtml = fs.readFileSync(sourceHtmlPath, 'utf8');

const sectionRegex = /<section\s+id=["']([^"']+)["'][^>]*>([\s\S]*?)<\/section>/gi;
let match;
const extractedSections = [];
const extractedToc = [];

while ((match = sectionRegex.exec(sourceHtml)) !== null) {
  const secId = match[1];
  const secBody = match[2];
  if (['referencias', 'resumo', 'sumario', 'capa'].includes(secId)) continue;
  const h2Match = secBody.match(/<h2[^>]*>([\s\S]*?)<\/h2>/i);
  const title = h2Match ? h2Match[1].replace(/<[^>]+>/g, '').trim() : secId;
  const blocks = htmlToBlocks(title, secBody);
  extractedSections.push([secId, 0, blocks]);
  extractedToc.push([secId, title]);
}

const deepSections = [
  [
    'fisiologia-oxigenacao-centralizacao',
    0,
    [
      ['2', 'Fisiologia da Oxigenação Fetal e o Fenômeno da Centralização (Brain-Sparing)'],
      ['p', 'O feto desenvolve-se em um ambiente de hipoxemia fisiológica relativa quando comparado ao adulto (pO2 no sangue venoso umbilical em torno de 28 a 32 mmHg). Essa aparente privação de oxigênio é perfeitamente compensada por adaptações fisiológicas refinadas:'],
      ['u', [
        '<strong>Alta Concentração e Afinidade da Hemoglobina Fetal (HbF):</strong> A HbF possui subunidades gama em vez de beta, o que reduz sua afinidade pelo 2,3-difosfoglicerato (2,3-DPG), desviando a curva de dissociação da oxi-hemoglobina para a esquerda. Isso permite que a HbF capture oxigênio com altíssima avidez da hemoglobina materna no espaço interviloso placentário;',
        '<strong>Elevado Débito Cardíaco Fetal Combinado:</strong> O coração fetal opera com débito cardíaco biventricular de aproximadamente 400 a 450 mL/kg/min (três a quatro vezes superior ao débito do adulto em repouso);',
        '<strong>Shunts Fisiológicos Fetais:</strong> O ducto venoso direciona sangue oxigenado preferencialmente através do forame oval para o átrio esquerdo e ventrículo esquerdo, perfundindo o miocárdio coronariano e as artérias carótidas cerebrais com o melhor sangue disponível.'
      ]],
      ['3', 'O Mecanismo da Centralização Fetal (Brain-Sparing Effect)'],
      ['p', 'Quando a insuficiência placentária crônica reduz a oferta de oxigênio abaixo do limiar crítico, quimiorreceptores nos corpos carotídeos e aórticos disparam um reflexo autonômico simpático com redistribuição hemodinâmica seletiva:'],
      ['o', [
        '<strong>Vasodilatação Arterial em Territórios Nobres:</strong> Ocorre vasodilatação maciça na circulação cerebral (queda do índice de pulsatilidade da Artéria Cerebral Média), circulação coronariana miocárdica e glândulas adrenais;',
        '<strong>Vasoconstrição Reflexa em Territórios Periféricos:</strong> Vasoconstrição intensa nos leitos vascular renal, esplâncnico mesentérico, cutâneo e muscular esquelético;',
        '<strong>Consequências Clínicas Diretas:</strong><br>' +
          '• A vasoconstrição renal reduz o ritmo de filtração glomerular fetal, causando oligúria intrauterina e culminando em <strong>oligoidrâmnio crônico</strong> (o líquido amniótico na segunda metade da gravidez é composto quase exclusivamente por urina fetal);<br>' +
          '• A vasoconstrição mesentérica predispõe o neonato a isquemia intestinal e <strong>enterocolite necrosante (ECN)</strong> precoce.'
      ]]
    ]
  ],
  [
    'cardiotocografia-intraparto-figo-desaceleracoes',
    0,
    [
      ['2', 'Cardiotocografia Intraparto Completa (FIGO 2015 / ACOG) e os Quatro DIPs'],
      ['p', 'A cardiotocografia (CTG) avalia a frequência cardíaca fetal e a contratilidade uterina de forma contínua, constituindo o método mais difundido de monitorização da vitalidade intraparto.'],
      ['3', 'Os Parâmetros Cardiotocográficos Fundamentais'],
      ['t', [
        'Parâmetro de FCF',
        'Definição e Valores de Referência',
        'Interpretação e Fisiopatologia'
      ], [
        ['<strong>Linha de Base da FCF</strong>', 'Normal: <strong>110 a 160 bpm</strong>.<br>Bradicardia: &lt; 110 bpm (&gt; 10 min).<br>Taquicardia: &gt; 160 bpm (&gt; 10 min).', 'Bradicardia severa (&lt; 100 bpm) indica asfixia ou bloqueio AV congênito. Taquicardia decorre de febre materna, corioamnionite, drogas ou hipóxia precoce compensatória.'],
        ['<strong>Variabilidade da FCF</strong>', 'Normal / Moderada: <strong>6 a 25 bpm</strong>.<br>Mínima: &le; 5 bpm.<br>Ausente: indetectável.<br>Aumentada / Saltatória: &gt; 25 bpm.', 'A variabilidade moderada é o <strong>marcador mais sensível e confiável de oxigenação adequada do SNC fetal</strong>. Variabilidade ausente reflete depressão acidótica profunda do tronco encefálico.'],
        ['<strong>Acelerações Transitórias</strong>', 'Aumento de &ge; 15 bpm durando &ge; 15s (&ge; 32 sem).<br>Em &lt; 32 sem: &ge; 10 bpm por &ge; 10s.', 'Marcador definitivo de integridade neurológica e ausência de acidose metabólica no momento do traçado.'],
        ['<strong>Padrão Sinusoidal</strong>', 'Ondulação suave e regular de 3 a 5 ciclos/min com variabilidade normal ausente.', '<strong>Patognomônico de anemia fetal grave</strong> (aloimunização Rh, transfusão feto-materna maciça, rotura de vasa prévia). Requer intervenção imediata.']
      ], 'book-table'],
      ['3', 'Semiologia dos Quatro Padrões de Desaceleração'],
      ['u', [
        '<strong>DIP 1 / Desaceleração Precoce:</strong> Queda gradual e uniforme da FCF cujo nadir (ponto mais baixo) <strong>coincide perfeitamente com o pico da contração uterina</strong> (imagem em espelho). Fisiopatologia: compressão mecânica transitória do polo cefálico fetal contra o colo, estimulando barorreceptores durais com reflexo vagal parassimpático. <strong>É um achado fisiológico, benigno, não associado a hipóxia ou acidose fetal</strong>, não exigindo intervenção tocúrgica;',
        '<strong>DIP 2 / Desaceleração Tardia:</strong> Queda gradual e uniforme da FCF cujo nadir ocorre de forma <strong>defasada e tardia APÓS o pico da contração uterina</strong> (intervalo &gt; 20 a 30 segundos entre o pico da contração e o nadir da FCF), com recuperação lenta após o término da contração. Fisiopatologia: <strong>insuficiência uteroplacentária aguda com hipóxia miocárdica direta</strong>. Durante a contração, a pO2 fetal cai abaixo do limiar crítico (18 mmHg), disparando quimiorreceptores e depressão miocárdica direta. <strong>É altamente patológica quando repetitiva</strong> (&gt; 50% das contrações), indicando acidose fetal iminente e exigindo ressuscitação intrauterina e parto se não revertida;',
        '<strong>DIP 3 / Desaceleração Variável:</strong> Queda abrupta da FCF (tempo do início ao nadir &lt; 30 segundos) com amplitude variável e morfologia angular típica em "V" ou "W". Fisiopatologia: <strong>compressão transitória do cordão umbilical</strong> (procúbito, circular cervical de cordão, oligoidrâmnio). A oclusão da veia umbilical causa queda do retorno venoso (aceleração inicial compensatória "ombro anterior"), seguida pela oclusão das artérias umbilicais gerando aumento abrupto da pós-carga e reflexo barorreceptor (nadir agudo). <strong>Critérios de Gravidade (DIP Variável Desfavorável):</strong> perda da variabilidade interna, retorno lento à linha de base, taquicardia compensatória pós-desaceleração e duração prolongada &gt; 60 segundos com nadir &lt; 70 bpm (regra dos 60);',
        '<strong>Desaceleração Prolongada:</strong> Queda da FCF &ge; 15 bpm com duração &ge; 2 minutos e &lt; 10 minutos. Se ultrapassar 10 minutos, configura mudança de linha de base (bradicardia sustentada).'
      ]],
      ['3', 'Classificação Consensual FIGO / ACOG em 3 Categorias'],
      ['t', [
        'Categoria CTG',
        'Achados Cardiotocográficos',
        'Probabilidade de Acidose e Conduta'
      ], [
        ['<strong>Categoria I (Normal / Verde)</strong>', 'Linha de base 110-160 bpm; variabilidade moderada (6-25 bpm); ausência de DIP 2 e DIP variável; acelerações presentes ou ausentes; DIP 1 permitido.', 'Feto não acidótico; bem-estar assegurado. <strong>Conduta expectante habitual</strong>.'],
        ['<strong>Categoria II (Suspeita / Amarela)</strong>', 'Taquicardia ou bradicardia sem perda de variabilidade; variabilidade mínima ou saltatória; ausência de acelerações; DIPs variáveis frequentes; DIP 2 ocasionais.', 'Risco indeterminado de hipóxia. <strong>Vigilância contínua, medidas de ressuscitação intrauterina e reavaliação seriada</strong>.'],
        ['<strong>Categoria III (Patológica / Vermelha)</strong>', '<strong>Variabilidade ausente</strong> associada a DIP 2 repetitivos, DIPs variáveis repetitivos ou bradicardia; ou <strong>Padrão Sinusoidal</strong>.', 'Altíssima probabilidade de acidose metabólica grave (pH &lt; 7,10 / BE &lt; -12). <strong>Indicação imediata de Parto de Emergência</strong> se não revertida instantaneamente.']
      ], 'book-table']
    ]
  ],
  [
    'perfil-biofisico-fetal-manning',
    0,
    [
      ['2', 'Perfil Biofísico Fetal (PBF de Manning): Parâmetros e Cascata Biofísica'],
      ['p', 'O Perfil Biofísico Fetal combina a cardiotocografia com a avaliação ultrassonográfica de quatro parâmetros dinâmicos fetais e ovulares, avaliados durante uma janela contínua de 30 minutos.'],
      ['3', 'Os Cinco Parâmetros do Escore de Manning'],
      ['t', [
        'Parâmetro Biofísico',
        'Critério de Normalidade (Pontuação = 2)',
        'Critério Alterado (Pontuação = 0)'
      ], [
        ['<strong>1. Cardiotocografia (CTG)</strong>', '&ge; 2 acelerações transitórias de &ge; 15 bpm por &ge; 15s em 20-30 min', '&lt; 2 acelerações ou hiporreatividade'],
        ['<strong>2. Movimentos Respiratórios</strong>', '&ge; 1 episódio de respiração fetal contínua durando &ge; 30 segundos', 'Ausência de respiração ou &lt; 30s de duração'],
        ['<strong>3. Movimentos Corporais Fetais</strong>', '&ge; 3 movimentos amplos distintos de tronco ou membros em 30 min', '&le; 2 episódios de movimentos corporais'],
        ['<strong>4. Tônus Fetal</strong>', '&ge; 1 episódio de extensão ativa de membro ou coluna com retorno à flexão', 'Membros em extensão flácida sem retorno à flexão'],
        ['<strong>5. Volume de Líquido Amniótico</strong>', 'Pelo menos 1 bolsão de líquido com &ge; 2 cm em diâmetro vertical (MBV &ge; 2 cm)', 'Maior Bolsão Vertical (MBV) &lt; 2 cm (Oligoidrâmnio)']
      ], 'book-table'],
      ['3', 'A Cascata Biofísica da Hipóxia Fetal'],
      ['p', 'A perda progressiva dos parâmetros biofísicos segue uma cronologia biológica estrita dependente da maturação ontogenética dos centros nervosos encefálicos:'],
      ['o', [
        '1º Parâmetro a desaparecer na acidose: <strong>Reatividade cardíaca (CTG)</strong> (centro regulador hipotalâmico/bulbar de maturação tardia);',
        '2º Parâmetro a desaparecer: <strong>Movimentos respiratórios fetais</strong> (centro no quarto ventrículo);',
        '3º Parâmetro a desaparecer: <strong>Movimentos corporais fetais</strong> (córtex motor fetal);',
        '4º Parâmetro a desaparecer: <strong>Tônus fetal</strong> (centro subcortical primitivo de maturação muito precoce — sua perda indica acidose grave e depressão neurológica terminal);',
        'Parâmetro crônico (não agudo): O <strong>Líquido Amniótico</strong> reflete a hipóxia crônica mantida ao longo de dias ou semanas decorrente da vasoconstrição renal seletiva.'
      ]]
    ]
  ],
  [
    'dopplerfluxometria-obstetrica-avancada',
    0,
    [
      ['2', 'Dopplervelocimetria Obstétrica: Artéria Umbilical, Cerebral Média e Ducto Venoso'],
      ['p', 'A avaliação por Doppler colorido e espectral revolucionou a medicina materno-fetal ao permitir a quantificação não invasiva da hemodinâmica nos compartimentos placentário, fetal e cardíaco.'],
      ['3', 'Artéria Umbilical (AU): O Compartimento Placentário'],
      ['p', 'Avalia a resistência vascular do leito capilar vilositário da placenta:'],
      ['u', [
        '<strong>Padrão Normal:</strong> Onda de velocidade de fluxo de baixa resistência com fluxo diastólico final amplo e contínuo;',
        '<strong>Aumento de Resistência:</strong> Elevação do Índice de Pulsatilidade (IP &gt; percentil 95), refletindo obliteração de mais de 30% a 50% dos vasos vilositários;',
        '<strong>Diástole Zero (Ausente):</strong> Ausência completa de fluxo sanguíneo na diástole; indica obliteração de 50% a 70% das vilosidades terciais placentárias;',
        '<strong>Diástole Reversa:</strong> Fluxo sanguíneo que reflui em sentido retrógrado durante a diástole ventricular em direção à placenta; indica obliteração maciça (&gt; 70%) com risco elevadíssimo de óbito fetal em 48 a 72 horas. Impõe interrupção imediata a partir de 30 a 32 semanas sob corticoterapia e sulfato de magnésio.'
      ]],
      ['3', 'Artéria Cerebral Média (ACM): Vasodilatação e Anemia Fetal'],
      ['p', 'A ACM desempenha papel duplo de extrema relevância clínica:'],
      ['o', [
        '<strong>Índice de Pulsatilidade da ACM (IP-ACM):</strong> Na centralização fetal, a vasodilatação compensatória reduz o IP para valores <strong>&lt; percentil 5</strong> para a idade gestacional. A <strong>Relação Cérebro-Placentária (RCP = IP-ACM / IP-AU)</strong> torna-se <strong>&lt; 1,0</strong>, sendo o marcador mais sensível de restrição de crescimento e centralização precoce;',
        '<strong>Pico de Velocidade Sistólica da ACM (PVS-ACM):</strong> Padrão-ouro não invasivo para diagnóstico de <strong>anemia fetal moderada a grave</strong> (por aloimunização Rh, parvovírus B19 ou transfusão gemelo-gemelar). Na anemia, a viscosidade sanguínea diminui e o débito cardíaco hiperdinâmico aumenta, elevando a velocidade de fluxo. Quando o <strong>PVS-ACM ultrapassa 1,5 Múltiplos da Mediana (MoM)</strong>, a sensibilidade para anemia severa aproxima-se de 100%, indicando cordocentese diagnóstica e transfusão intrauterina imediata.'
      ]],
      ['3', 'Ducto Venoso (DV): O Marcador Definitivo de Acidose e Descompensação Cardíaca'],
      ['p', 'O ducto venoso conecta a veia umbilical à veia cava inferior, conduzindo sangue oxigenado sob alta velocidade para o átrio esquerdo através do forame oval. Sua onda de velocidade possui três componentes: sístole ventricular (onda S), diástole ventricular (onda D) e <strong>contração atrial tele-diastólica (onda "a")</strong>.'],
      ['p', 'Quando a acidose miocárdica e a sobrecarga de câmaras direitas se instalam, o ventrículo direito torna-se rígido, aumentando a pressão telediastólica. Durante a contração atrial, o sangue não consegue avançar, resultando em <strong>onda "a" zero ou reversa (onda "a" negativa)</strong>. A onda "a" reversa no ducto venoso é o <strong>preditor mais potente de óbito fetal iminente e acidose metabólica grave</strong>, sendo o gatilho absoluto para interrupção imediata da gravidez por cesariana em qualquer idade gestacional viável (&ge; 26 a 28 semanas).']
    ]
  ],
  [
    'casos-clinicos-integradores-sofrimento-fetal',
    0,
    [
      ['2', 'Casos Clínicos Resolvidos de Sofrimento Fetal e Vitalidade'],
      ['3', 'Caso 1: Gestante com RCIU e Diástole Reversa na Artéria Umbilical'],
      ['p', 'Primigesta de 31 semanas com pré-eclâmpsia com sinais de gravidade apresenta ultrassom com peso fetal estimado no percentil &lt; 3 e oligoidrâmnio (MBV = 1,4 cm). Dopplerfluxometria revela Artéria Umbilical com <strong>diástole reversa sustentada</strong>, Artéria Cerebral Média com IP no percentil 2 (centralização acentuada) e Ducto Venoso com onda "a" positiva (IP = 0,95). CTG com variabilidade moderada de 8 bpm. <strong>Discussão e Conduta:</strong> Feto com insuficiência placentária gravíssima e centralização, porém sem falência cardíaca franca (onda "a" ainda positiva). Atingidas 31 semanas e com diástole reversa, o risco de óbito intrauterino supera o da prematuridade. Conduta: Internação imediata em UTI neonatal de referência, administração de Corticoterapia (Betametasona 12 mg IM 2 doses) associada a Sulfato de Magnésio para neuroproteção fetal e interrupção programada por <strong>Cesariana de urgência</strong> após 24 a 48h de corticoide (ou imediatamente se o ducto venoso alterar).'],
      ['3', 'Caso 2: Bradicardia Fetal Súbita Intraparto por Prolapso de Cordão'],
      ['p', 'Multípara em trabalho de parto na fase ativa com 7 cm de dilatação apresenta rotura espontânea de membranas ovulares. Imediatamente após a amniorrexe, a FCF cai abruptamente de 140 bpm para 70 bpm sustentada. Ao toque vaginal de emergência, palpa-se alça de cordão umbilical pulsátil protruindo através do canal cervical à frente do polo cefálico. <strong>Conduta Imediata:</strong> Diagnóstico de <strong>Prolapso Agudo de Cordão Umbilical</strong>. Conduta de emergência: 1) O examinador deve manter a mão na vagina elevando continuamente o polo cefálico fetal para descomprimir o funículo umbilical; 2) Posicionar a paciente em posição genupeitoral ou proclive invertida (Trendelenburg); 3) Encaminhamento em maca em disparada para o centro cirúrgico com a mão mantida no canal vaginal; 4) <strong>Cesariana emergencial imediata sob anestesia geral</strong>.'],
      ['3', 'Caso 3: Aloimunização Rh com Pico de Velocidade Sistólica da ACM Elevado'],
      ['p', 'Gestante Rh negativo com Coombs Indireto positivo com título de 1:64 na 28ª semana de gestação. Submetida a Doppler seriado da Artéria Cerebral Média que demonstra <strong>PVS-ACM de 68 cm/s (equivalente a 1,65 MoM)</strong>. Cardiotocografia basal com padrão sinusoidal sutil. <strong>Discussão e Conduta:</strong> O PVS-ACM &gt; 1,5 MoM associado ao padrão sinusoidal confirma anemia fetal moderada a grave por hemólise imune. Com 28 semanas, a interrupção acarretaria prematuridade extrema. A conduta padrão-ouro é a <strong>Cordocentese diagnóstica imediata em sala cirúrgica com sangue tipado O negativo e realização de Transfusão Intrauterina (TIU)</strong> guiada por ultrassom, corrigindo o hematócrito fetal para &gt; 35% a 40%.'],
      ['3', 'Caso 4: Taquissistolia por Ocitocina e DIP 2 Repetitivo Revertido com Terbutalina'],
      ['p', 'Nulípara de 39 semanas induzida com ocitocina atinge 6 contrações em 10 minutos. Cardiotocografia registra desacelerações tardias (DIP 2) consecutivas com perda de variabilidade. <strong>Conduta:</strong> Desligar a bomba de ocitocina imediatamente, decúbito lateral esquerdo, bólus de 500 mL de soro fisiológico e administração de <strong>Terbutalina 0,25 mg SC</strong>. Em 3 minutos, as contrações cessaram, a linha de base retornou para 135 bpm com variabilidade de 12 bpm e as desacelerações desapareceram, permitindo a condução segura do parto normal horas depois.']
    ]
  ],
  [
    'questoes-comentadas-residencia-sofrimento',
    0,
    [
      ['2', 'Questões de Concursos e Residência Médica com Comentários Exaustivos'],
      ['3', 'Questão 1: Marcador Mais Sensível de Oxigenação do SNC Fetal (USP)'],
      ['p', 'Na análise sistemática da cardiotocografia basal anteparto e intraparto, qual parâmetro semiológico é considerado o indicador mais sensível e precoce de oxigenação adequada do sistema nervoso central fetal?'],
      ['o', [
        'A) Frequência cardíaca basal exatamente em 120 bpm.',
        'B) Variabilidade moderada da frequência cardíaca fetal (entre 6 e 25 bpm).',
        'C) Presença de pelo menos 10 contrações uterinas por hora.',
        'D) Aparecimento regular de desacelerações precoces no traçado.',
        'E) Presença de padrão sinusoidal contínuo.'
      ]],
      ['p', '<strong>Gabarito Comentado: Alternativa B.</strong><br>' +
        'A variabilidade moderada (6 a 25 bpm) reflete a interação contínua entre o tônus simpático e parassimpático no nó sinusal fetal, exigindo tecido cerebral cortical e bulbar metabolicamente hígido e oxigenado.'],

      ['3', 'Questão 2: Fisiopatologia do DIP 1 vs. DIP 2 (UNICAMP)'],
      ['p', 'Durante a monitorização intraparto de duas parturientes, o traçado da Paciente A apresenta desacelerações cujo nadir coincide com o ápice das contrações uterinas. O traçado da Paciente B apresenta desacelerações graduais cujo nadir ocorre 30 segundos após o término do pico das contrações. Quais são os diagnósticos e os mecanismos fisiopatológicos?'],
      ['o', [
        'A) Paciente A: DIP 2 por compressão de cordão; Paciente B: DIP 1 por hipóxia miocárdica.',
        'B) Paciente A: DIP 1 (precoce) por compressão mecânica cefálica e reflexo vagal; Paciente B: DIP 2 (tardio) por insuficiência placentária e hipóxia miocárdica acidótica.',
        'C) Paciente A: Padrão sinusoidal; Paciente B: Taquicardia fetal reflexa.',
        'D) Ambas apresentam sofrimento fetal grave com indicação de cesariana de emergência.',
        'E) Paciente A exige tocolítico imediato; Paciente B deve receber ocitocina em alta dose.'
      ]],
      ['p', '<strong>Gabarito Comentado: Alternativa B.</strong><br>' +
        'O DIP 1 é precoce e decorre de compressão mecânica cefálica com reflexo vagal (benigno). O DIP 2 é tardio e expressa insuficiência uteroplacentária e acidose fetal, sendo altamente patológico.'],

      ['3', 'Questão 3: Rastreamento Não Invasivo de Anemia Fetal (ENARE)'],
      ['p', 'Em uma gestante isoimunizada com teste de Coombs indireto positivo com títulos elevados, qual método ultrassonográfico Doppler é atualmente o padrão-ouro de escolha não invasivo para estimar o risco de anemia fetal moderada a grave e indicar cordocentese?'],
      ['o', [
        'A) Índice de Resistência da Artéria Umbilical.',
        'B) Índice de Pulsatilidade do Ducto Venoso.',
        'C) Pico de Velocidade Sistólica da Artéria Cerebral Média (PVS-ACM &gt; 1,5 MoM).',
        'D) Espessura do miocárdio ventricular esquerdo.',
        'E) Diâmetro biparietal corrigido pelo fêmur.'
      ]],
      ['p', '<strong>Gabarito Comentado: Alternativa C.</strong><br>' +
        'O PVS-ACM &gt; 1,5 MoM apresenta sensibilidade superior a 95% para anemia fetal grave, substituindo a amniocentese com espectrofotometria (curva de Liley).'],

      ['3', 'Questão 4: Significado da Onda "a" Reversa no Ducto Venoso (SCMSP)'],
      ['p', 'Em um feto com restrição de crescimento intrauterino extremo com 29 semanas, o Doppler do Ducto Venoso revela índice de pulsatilidade elevado com onda "a" reversa (negativa). Esse achado hemodinâmico indica:'],
      ['o', [
        'A) Excelente prognóstico com feto hígido e permissão para aguardar 40 semanas.',
        'B) Falência miocárdica de câmaras direitas com elevação da pressão telediastólica e acidose fetal grave iminente, sendo indicação de parto imediato.',
        'C) Apenas compressão temporária do polo cefálico sem repercussão miocárdica.',
        'D) Malformação renal congênita isolada.',
        'E) Necessidade de iniciar imediatamente hidroclorotiazida materna.'
      ]],
      ['p', '<strong>Gabarito Comentado: Alternativa B.</strong><br>' +
        'A onda "a" reversa no ducto venoso reflete incapacidade do ventrículo direito de acomodar o fluxo atrial por acidose miocárdica terminal, com altíssimo risco de óbito intrauterino em 24-48h.'],

      ['3', 'Questão 5: Padrão Sinusoidal Patognomônico (UERJ)'],
      ['p', 'Uma cardiotocografia que exibe ondulações sinusoidais suaves e regulares com frequência de 3 a 5 ciclos por minuto, amplitude fixa de 5 a 15 bpm e ausência de variabilidade normal de curta duração é patognomônica de:'],
      ['o', [
        'A) Sono fetal tranquilo fisiológico.',
        'B) Anemia fetal grave por aloimunização Rh ou hemorragia feto-materna maciça.',
        'C) Bradicardia reflexa após administração de analgesia peridural.',
        'D) Gemelaridade monocoriônica com feto hígido.',
        'E) Ingestão materna recente de cafeína ou chocolate.'
      ]],
      ['p', '<strong>Gabarito Comentado: Alternativa B.</strong><br>' +
        'O padrão sinusoidal clássico é patognomônico de anemia fetal grave com hipóxia bulbar grave, exigindo intervenção resolutiva ou transfusão imediata.'],

      ['3', 'Questão 6: Primeiro Parâmetro Biofísico a Desaparecer na Hipóxia (UNIFESP)'],
      ['p', 'De acordo com a teoria da cascata biofísica e o desenvolvimento ontogenético do sistema nervoso central fetal, qual dos cinco parâmetros do Perfil Biofísico Fetal de Manning é o primeiro a ser suprimido na vigência de hipoxemia/acidose aguda?'],
      ['o', [
        'A) Tônus fetal.',
        'B) Movimentos corporais globais.',
        'C) Reatividade da frequência cardíaca fetal na cardiotocografia.',
        'D) Volume de líquido amniótico.',
        'E) Grau de maturação placentária de Grannum.'
      ]],
      ['p', '<strong>Gabarito Comentado: Alternativa C.</strong><br>' +
        'A reatividade da FCF é o centro mais sensível e de maturação mais tardia, sendo o primeiro a desaparecer na hipóxia. O tônus fetal é o último a desaparecer.'],

      ['3', 'Questão 7: Definição de Diástole Zero e Conduta (USP-RP)'],
      ['p', 'Gestante de 34 semanas com pré-eclâmpsia apresenta diástole zero mantida na Artéria Umbilical. O ducto venoso apresenta onda "a" positiva normal e a CTG é categoria I. Qual a interpretação e a conduta preconizada?'],
      ['o', [
        'A) A diástole zero é um artefato técnico irrelevante; alta hospitalar.',
        'B) Indica obliteração de mais de 50% do leito vilositário placentário; com 34 semanas completas, está indicada a interrupção da gravidez.',
        'C) Exige infusão de 5 litros de soro fisiológico para abrir os vasos placentários.',
        'D) Deve-se aguardar em casa até 41 semanas.',
        'E) Prescrever aspirina em dose de 500 mg de 6 em 6 horas.'
      ]],
      ['p', '<strong>Gabarito Comentado: Alternativa B.</strong><br>' +
        'A diástole zero na artéria umbilical atesta insuficiência placentária avançada. Ao atingir 34 semanas, o parto está formalmente indicado conforme diretrizes internacionais.'],

      ['3', 'Questão 8: Fisiopatologia do Oligoidrâmnio na Centralização (SURCE)'],
      ['p', 'Por que o feto com restrição de crescimento e centralização hemodinâmica desenvolve oligoidrâmnio progressivo?'],
      ['o', [
        'A) Porque o feto deglute três vezes mais líquido amniótico para saciar a sede.',
        'B) Devido à vasoconstrição reflexa da circulação renal para priorizar o cérebro, reduzindo a filtração glomerular e a produção de urina fetal.',
        'C) Porque a placenta absorve todo o líquido através da placa coriônica.',
        'D) Devido à rotura microscópica e imperceptível da bolsa amniótica.',
        'E) Por evaporação transcutânea acelerada.'
      ]],
      ['p', '<strong>Gabarito Comentado: Alternativa B.</strong><br>' +
        'O líquido amniótico no 2º e 3º trimestres provém quase exclusivamente da urina fetal. A vasoconstrição renal seletiva no fenômeno de centralização causa oligúria e oligoidrâmnio.'],

      ['3', 'Questão 9: Critérios de Categoria III da FIGO (AMP)'],
      ['p', 'Qual traçado cardiotocográfico classifica-se diretamente como Categoria III (Patológico / Anormal), exigindo intervenção obstétrica imediata?'],
      ['o', [
        'A) Linha de base em 130 bpm com variabilidade de 15 bpm e acelerações transitórias.',
        'B) Desacelerações variáveis isoladas com recuperação rápida e linha de base estável.',
        'C) Variabilidade da FCF ausente acompanhada de desacelerações tardias repetitivas ou padrão sinusoidal.',
        'D) Presença de 3 contrações em 10 minutos com DIP 1 esporádico.',
        'E) FCF basal de 155 bpm sem desacelerações.'
      ]],
      ['p', '<strong>Gabarito Comentado: Alternativa C.</strong><br>' +
        'A Categoria III define traçados de alto risco de acidose (variabilidade ausente + DIP 2/variáveis ou padrão sinusoidal), impondo parto imediato.'],

      ['3', 'Questão 10: Relação Cérebro-Placentária (RCP) (SCMSP)'],
      ['p', 'A Relação Cérebro-Placentária (RCP), calculada pela divisão do IP da Artéria Cerebral Média pelo IP da Artéria Umbilical (IP-ACM / IP-AU), é considerada alterada e sugestiva de centralização fetal quando seu valor é:'],
      ['o', [
        'A) Maior que 3,0.',
        'B) Menor que 1,0.',
        'C) Exatamente igual a 2,5.',
        'D) Maior que 5,0.',
        'E) Negativo.'
      ]],
      ['p', '<strong>Gabarito Comentado: Alternativa B.</strong><br>' +
        'Normalmente, a resistência na circulação cerebral é maior que na umbilical (RCP &gt; 1,0). Quando há vasodilatação cerebral e aumento da resistência placentária, a relação inverte-se, tornando-se &lt; 1,0.']
    ]
  ],
  [
    'referencias',
    0,
    [
      ['2', 'Referências'],
      ['p', '1. International Federation of Gynecology and Obstetrics (FIGO). <em>FIGO consensus guidelines on intrapartum fetal monitoring: Cardiotocography</em>. Int J Gynaecol Obstet, 2015; 131(1):13-24. https://doi.org/10.1016/j.ijgo.2015.06.020'],
      ['p', '2. American College of Obstetricians and Gynecologists (ACOG). <em>Practice Bulletin No. 229: Antepartum Fetal Surveillance</em>. Obstet Gynecol, 2021; 137(6):e116-e127. https://doi.org/10.1097/AOG.0000000000004410'],
      ['p', '3. Manning FA, Platt LD, Sipos L. <em>Antepartum fetal evaluation: development of a fetal biophysical profile score</em>. Am J Obstet Gynecol, 1980; 136(6):787-795. https://doi.org/10.1016/0002-9378(80)90457-3'],
      ['p', '4. Mari G, Deter RL, Carpenter RL, et al. <em>Noninvasive diagnosis by Doppler ultrasonography of fetal anemia due to maternal red-cell alloimmunization</em>. N Engl J Med, 2000; 342(1):9-14. https://doi.org/10.1056/NEJM200001063420102'],
      ['p', '5. Baschat AA, Cosmi E, Bilardo CM, et al. <em>Predictors of neonatal outcome in early-onset placental dysfunction</em>. Obstet Gynecol, 2007; 109(2 Pt 1):253-261. https://doi.org/10.1097/01.AOG.0000253215.79121.75'],
      ['p', '6. Federação Brasileira das Associações de Ginecologia e Obstetrícia (FEBRASGO). <em>Avaliação da Vitalidade Fetal Anteparto e Intraparto</em>. Manual de Orientação FEBRASGO, São Paulo, 2023.']
    ]
  ]
];

const combinedSections = [...extractedSections, ...deepSections];

const combinedToc = [
  ...extractedToc,
  ['fisiologia-oxigenacao-centralizacao', 'Fisiologia da Oxigenação Fetal e Centralização'],
  ['cardiotocografia-intraparto-figo-desaceleracoes', 'Cardiotocografia Intraparto Completa (FIGO)'],
  ['perfil-biofisico-fetal-manning', 'Perfil Biofísico Fetal (PBF de Manning)'],
  ['dopplerfluxometria-obstetrica-avancada', 'Dopplervelocimetria Obstétrica Avançada'],
  ['casos-clinicos-integradores-sofrimento-fetal', 'Casos Clínicos Resolvidos de Sofrimento Fetal'],
  ['questoes-comentadas-residencia-sofrimento', 'Questões de Concursos e Residência Médica Comentadas'],
  ['referencias', 'Referências']
];

const bookSofrimento = {
  v: 2,
  s: 'sofrimento-fetal-e-avaliacao-da-vitalidade-fetal',
  slug: 'sofrimento-fetal-e-avaliacao-da-vitalidade-fetal',
  t: 'Sofrimento Fetal e Avaliação da Vitalidade Fetal',
  title: 'Sofrimento Fetal e Avaliação da Vitalidade Fetal',
  p: 'Tratado completo sobre Sofrimento Fetal Agudo e Crônico e Métodos de Avaliação da Vitalidade Fetal: fisiologia da oxigenação fetal e centralização (brain-sparing), cardiotocografia anteparto e intraparto segundo FIGO e ACOG, análise minuciosa dos quatro tipos de desacelerações (DIP 1, DIP 2, DIP 3 e sinusoidal), Perfil Biofísico Fetal (PBF de Manning), Dopplervelocimetria obstétrica avançada (artéria umbilical com diástole zero/reversa, artéria cerebral média com PVS > 1,5 MoM e ducto venoso com onda "a" reversa), casos clínicos integradores e questões comentadas de residência médica.',
  o: combinedToc,
  h: [
    'Apostila LURIA',
    'Sofrimento Fetal e Avaliação da Vitalidade Fetal',
    'Tratado completo sobre Sofrimento Fetal Agudo e Crônico e Métodos de Avaliação da Vitalidade Fetal: fisiologia da oxigenação fetal e centralização (brain-sparing), cardiotocografia anteparto e intraparto segundo FIGO e ACOG, análise minuciosa dos quatro tipos de desacelerações (DIP 1, DIP 2, DIP 3 e sinusoidal), Perfil Biofísico Fetal (PBF de Manning), Dopplervelocimetria obstétrica avançada (artéria umbilical com diástole zero/reversa, artéria cerebral média com PVS > 1,5 MoM e ducto venoso com onda "a" reversa), casos clínicos integradores e questões comentadas de residência médica.',
    [
      'Área: Ginecologia e Obstetrícia',
      'Matéria: Obstetrícia e Medicina Fetal',
      'Tema: Sofrimento Fetal e Avaliação da Vitalidade Fetal'
    ],
    'apostila-identity'
  ],
  q: combinedSections
};

saveBook(bookSofrimento);
