import { saveBook } from './bloco-04-utils.mjs';

const book = {
  slug: 'apendicite-aguda',
  title: 'Apendicite Aguda',
  area: 'Cirurgia Geral',
  materia: 'Cirurgia Geral e Urgências Abdominais',
  description: 'Tratado completo de Apendicite Aguda para concursos de Residência Médica e ENAMED: anatomia cirúrgica e variações topográficas do apêndice cecal (retrocecal, pélvico, subcecal, pré e pós-ileal); fisiopatologia da obstrução mecânica intraluminal por hiperplasia linfoide (60% em jovens) e fecalito/apendicolito (35% em adultos), corpos estranhos, parasitas (Enterobius vermicularis, Ascaris lumbricoides) e tumores carcinoides neuroendócrinos e adenocarcinoma; as 4 fases histopatológicas evolutivas (edematosa/catarral, flegmonosa/supurada, gangrenosa/necrosante e perfurada); cronologia clássica de Murphy e anorexia como sintoma cardinal; semiologia de alta sensibilidade: ponto de McBurney, sinais de Blumberg, Rovsing, Psoas, Obturador, Dunphy e Lapinsky; escore de Alvarado e escore AIR; propedêutica armada com USG (critérios de compressão graduada, diâmetro > 6 mm e sombra acústica) e TC multislice de abdome total com contraste IV; apendicectomia videolaparoscópica como padrão-ouro cirúrgico vs via aberta; manejo do plastrão apendicular bloqueado com antibioticoterapia venosa, drenagem percutânea de coleções e apendicectomia de intervalo; regimes de antibioticoprofilaxia com cefazolina + metronidazol; 4 casos clínicos estruturados e questões de prova comentadas alternativa por alternativa.',
  sections: [
    {
      id: 'anatomia-e-epidemiologia-apendice',
      title: '1. Anatomia Cirúrgica, Posições do Apêndice e Epidemiologia',
      body_html: `
<h3>Embriologia e Anatomia Cirúrgica do Apêndice Vermiforme</h3>
<p>O apêndice cecal (ou vermiforme) é um divertículo tubular verdadeiro originado na confluência das três tênias cólicas (tênia anterior livre, tênia omental e tênia mesocólica) na porção póstero-medial do ceco, aproximadamente 2 a 3 cm abaixo da válvula ileocecal. Seu comprimento varia comumente entre 6 e 10 cm (podendo atingir de 1 a 25 cm), com diâmetro externo normal variando entre 4 e 6 mm e um lúmen estreito de apenas 1 a 3 mm.</p>
<p>A vascularização arterial é fornecida pela <strong>artéria apendicular</strong>, um ramo terminal da artéria ileocólica (ramo da artéria mesentérica superior). A artéria apendicular trafega no interior do mesoapêndice — uma prega peritoneal triangular derivada do mesentério do íleo terminal. Trata-se de uma <strong>artéria terminal funcional sem circulação colateral significativa</strong>; qualquer compressão extrínseca ou trombose infecciosa da artéria apendicular acarreta isquemia transmural precoce e necrose tecidual rápida, predominantemente na borda antimesentérica do terço distal do apêndice.</p>

<h3>Variações Anatômicas de Posição da Ponta Apendicular</h3>
<p>Enquanto a base do apêndice cecal é anatomicamente fixa e constante (localizada no ponto de convergência das três tênias cólicas na parede do ceco), a sua ponta é livre e altamente móvel, podendo assumir diferentes orientações no interior da cavidade peritoneal e retroperitônio. O conhecimento dessas variações anatômicas é essencial para correlacionar a semiologia física e entender as apresentações clínicas atípicas:</p>
<table class="book-table">
  <thead>
    <tr>
      <th>Posição Anatômica da Ponta</th>
      <th>Frequência Relativa na População</th>
      <th>Particularidades Clínicas e Manobras Semiológicas Específicas</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Retrocecal (Ascendente)</strong></td>
      <td><strong>60% a 65%</strong> (a mais frequente de todas)</td>
      <td>O apêndice situa-se atrás do ceco, podendo ser intraperitoneal ou verdadeiramente retroperitoneal fixo. A dor anterior na fossa ilíaca direita pode ser discreta ou tardia, com ausência de descompressão dolorosa anterior evidente. O paciente queixa-se de dor lombar baixa ou no flanco direito. <strong>Sinal do Psoas positivo</strong> por atrito com o músculo psoas maior retroperitoneal.</td>
    </tr>
    <tr>
      <td><strong>Pélvica (Descendente)</strong></td>
      <td><strong>25% a 30%</strong> (segunda mais comum)</td>
      <td>A ponta apendicular repousa sobre a borda da pelve verdadeira, adjacente à bexiga, reto, ureter direito e, nas mulheres, ao ovário e trompa direita. Manifesta-se por sintomas urinários (disúria, polaciúria, piúria estéril no EAS por irritação vesical adjacente), tenesmo retal e diarreia. <strong>Sinal do Obturador positivo</strong>; grande dor ao toque retal ou vaginal bimanual.</td>
    </tr>
    <tr>
      <td><strong>Subcecal</strong></td>
      <td>2% a 3%</td>
      <td>Localiza-se imediatamente abaixo do polo inferior do ceco na fossa ilíaca direita. Apresentação clássica típica no ponto de McBurney.</td>
    </tr>
    <tr>
      <td><strong>Pré-ileal e Pós-ileal</strong></td>
      <td>1% a 2%</td>
      <td>A ponta cruza anterior ou posteriormente o íleo terminal. A irritação do íleo adjacente promove hipermotilidade reflexa, apresentando-se frequentemente com vômitos precoces e diarreia aquosa que simula gastroenterite aguda viral.</td>
    </tr>
    <tr>
      <td><strong>Mesocílica / Medial</strong></td>
      <td>1%</td>
      <td>Ponta voltada medialmente em direção às alças de intestino delgado e promontório sacral, promovendo íleo paralítico regional precoce.</td>
    </tr>
  </tbody>
</table>

<h3>Epidemiologia e Fatores de Risco</h3>
<p>A apendicite aguda é a <strong>causa mais comum de abdome agudo cirúrgico no mundo</strong>, acometendo aproximadamente 7% a 8% da população global ao longo da vida (risco cumulativo de 8,6% para o sexo masculino e 6,7% para o feminino). A incidência máxima ocorre na segunda e terceira décadas de vida (entre os <strong>10 e 30 anos de idade</strong>), sendo comparativamente rara em lactentes menores de 2 anos (graças ao formato infundibular amplo do apêndice nessa faixa) e crescendo novamente em incidência e letalidade na população idosa em virtude de diagnósticos tardios.</p>
`
    },
    {
      id: 'fisiopatologia-obstrucao-luminal',
      title: '2. Fisiopatologia da Obstrução Luminal e Cascata Isquêmica',
      body_html: `
<h3>O Evento Primário Desencadeante: Obstrução da Luz Apendicular</h3>
<p>A fisiopatologia da apendicite aguda segue uma sequência cronológica e biológica universal iniciada, em mais de 90% dos casos, pela <strong>obstrução mecânica da luz apendicular</strong>. As etiologias responsáveis por essa oclusão luminal variam de forma nítida de acordo com a faixa etária:</p>
<ul>
  <li><strong>Hiperplasia dos Folículos Linfoides Submucosos (60% dos casos):</strong> É a causa etiológica primordial em <em>crianças, adolescentes e adultos jovens</em>. O apêndice cecal é rico em tecido linfoide associado à mucosa (MALT / folículos linfoides de Stöhr), que atinge o pico de volume imunológico entre os 10 e 20 anos. Episódios prévios de infecções virais sistêmicas ou gastrointestinais (ex: gastroenterites por rotavírus ou adenovírus, infecções de vias aéreas superiores, mononucleose infecciosa e sarampo) deflagram hiperplasia proliferativa intensa do tecido linfoide da submucosa, que se projeta para a luz e oblitera o lúmen apendicular estreito;</li>
  <li><strong>Fecalito ou Apendicolito (30% a 35% dos casos):</strong> É a causa prevalente em <em>adultos e idosos</em>. Consiste na precipitação concêntrica de fezes desidratadas ao redor de um núcleo de muco inorgânico e sais de cálcio e magnésio, formando uma concreção pétrea endurecida que impacta no colo ou terço proximal do apêndice. A presença de apendicolito calcificado correlaciona-se com evolução mais rápida para gangrena e perfuração precoce;</li>
  <li><strong>Corpos Estranhos Ingeridos (1% a 2%):</strong> Sementes de frutas (goiaba, melancia, tomate), espinhas de peixe, fragmentos de ossos pequenos e projéteis balísticos de chumbo retidos;</li>
  <li><strong>Parasitoses Intestinais (1% a 2%):</strong> Infestação por <em>Enterobius vermicularis</em> (oxiúros que se enovelam e ocluem o lúmen apendicular), <em>Ascaris lumbricoides</em> (obstrução mecânica por áscaris adulto que invade o orifício apendicular), <em>Taenia</em> e <em>Schistosoma mansoni</em> (granulomas teciduais na parede);</li>
  <li><strong>Neoplasias Cecais ou Apendiculares (1% a 3%):</strong> Devem ser ativamente suspeitadas em pacientes com idade <strong>&gt; 40 a 50 anos</strong> com apendicite aguda. As lesões tumorais incluem o <strong>Tumor Neuroendócrino Apendicular (antigo Carcinoide)</strong> — que acomete tipicamente a ponta do órgão —, o <strong>Adenocarcinoma mucinoso ou não mucinoso do ceco/apêndice</strong> e as neoplasias mucinosas apendiculares (LAMN/HAMN com risco de pseudomixoma peritoneal).</li>
</ul>

<h3>A Cascata Fisiopatológica de Isquemia e Infecção</h3>
<p>Uma vez bloqueada a luz apendicular, deflagra-se uma cascata contínua e autossustentada de eventos fisiopatológicos em alça fechada:</p>
<ol>
  <li><strong>Produção Contínua de Muco e Elevação da Pressão Intraluminal:</strong> As glândulas tubulares de Lieberkühn da mucosa continuam secretando ativamente muco a uma taxa de aproximadamente 1 a 2 mL/dia. Como o lúmen está obstruído, o muco estagna e acumula-se. A pressão intraluminal sobe rapidamente dos valores basais normais de 2 a 5 mmHg para patamares patológicos de <strong>40 a 60 mmHg</strong>;</li>
  <li><strong>Bloqueio da Drenagem Linfática e Venosa (Fase Edematosa):</strong> Quando a pressão intraluminal supera a pressão venular e linfática parietal (cerca de 15 a 20 mmHg), a drenagem é completamente interrompida. Inicia-se congestão venosa passiva, edema transmural maciço e hiperemia parietal;</li>
  <li><strong>Proliferação Bacteriana Exponencial:</strong> O lúmen estagnado e hiperpressurizado torna-se uma câmara ideal de proliferação bacteriana. Inicialmente proliferam bactérias aeróbias facultativas (<em>Escherichia coli</em>); com a rápida queda da tensão de oxigênio tecidual intraluminal, ocorre explosão de bacilos e cocos anaeróbios virulentos (com destaque absoluto para <em>Bacteroides fragilis</em>, <em>Fusobacterium nucleatum</em> e <em>Peptostreptococcus</em>);</li>
  <li><strong>Isquemia Arterial e Necrose Coagulativa (Fase Gangrenosa):</strong> À medida que a pressão intraluminal atinge e supera a pressão sistólica arteriolar na parede apendicular, o fluxo arterial para a mucosa cessa. Os enterócitos e a barreira epitelial sofrem necrose isquêmica coagulativa transmural;</li>
  <li><strong>Perfuração Transmural:</strong> As bactérias anaeróbias invadem a parede gangrenada destruída, culminando na descontinuidade anatômica da serosa. A perfuração ocorre tipicamente na borda antimesentérica distal (onde o suprimento vascular terminal é mais frágil e precário).</li>
</ol>
`
    },
    {
      id: 'fases-evolutivas-histopatologicas',
      title: '3. As Quatro Fases Evolutivas Histopatológicas da Apendicite Aguda',
      body_html: `
<h3>Cronopatologia da Apendicite Aguda</h3>
<p>A apendicite aguda não é uma doença estática, mas sim um processo biológico inflamatório-infeccioso dinâmico e evolutivo contínuo. Classicamente, a evolução anatomopatológica subdivide-se em quatro fases sucessivas bem delimitadas, que se correlacionam de forma direta com o tempo de evolução dos sintomas, os achados operatórios e o prognóstico cirúrgico:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Fase Histopatológica</th>
      <th>Tempo Médio de Evolução</th>
      <th>Alterações Macroscópicas e Microscópicas</th>
      <th>Quadro Clínico e Mecanismo da Dor Dominante</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Fase 1: Catarral, Edematosa ou Congestiva</strong></td>
      <td>Primeiras <strong>6 a 12 horas</strong></td>
      <td>Apêndice discretamente dilatado, com vasos serosos ingurgitados e hiperemiados, mucosa edemaciada com infiltrado inflamatório incipiente na lâmina própria. Presença de muco espesso retido na luz.</td>
      <td><strong>Dor puramente VISCERAL:</strong> Vaga, em cólica ou peso, localizada estritamente na <strong>linha média (epigástrio ou mesogástrio/periumbilical)</strong>. Acompanhada por anorexia marcante e náuseas discretas. <em>Ausência de peritonismo no exame físico.</em></td>
    </tr>
    <tr>
      <td><strong>Fase 2: Flegmonosa, Supurada ou Ulcerosa</strong></td>
      <td><strong>12 a 24 horas</strong></td>
      <td>Edema transmural exuberante; erosões e microulcerações na mucosa; exsudato fibrino-purulento recobre a serosa externa; infiltrado maciço de neutrófilos atinge a muscular própria e a serosa. Proliferação de bactérias anaeróbias.</td>
      <td><strong>Dor SOMÁTICA / PARIETAL:</strong> Ocorre a <strong>migração clássica da dor para a Fossa Ilíaca Direita (FID)</strong>. A dor torna-se aguda, pontual, contínua e intensa. Surge <strong>dor focal no ponto de McBurney e Sinal de Blumberg positivo localizado</strong>. Febre baixa (37,8°C - 38,2°C).</td>
    </tr>
    <tr>
      <td><strong>Fase 3: Gangrenosa ou Necrosante</strong></td>
      <td><strong>24 a 36 horas</strong></td>
      <td>Microtrombose arterial na parede apendicular; áreas transmurais extensas de infarto isquêmico e necrose tecidual com coloração arroxeada, esverdeada ou enegrecida. Parede friável e adelgaçada. Exsudato purulento fétido intracavitário ao redor do apêndice.</td>
      <td>Dor somática contínua lancinante na FID; <strong>defesa muscular involuntária nítida</strong>; taquicardia descompensada; leucocitose neutrofílica importante (&gt; 14.000/$mm^3$) com desvio à esquerda proeminente.</td>
    </tr>
    <tr>
      <td><strong>Fase 4: Perfurada</strong></td>
      <td>Habitualmente <strong>&gt; 36 a 48 horas</strong></td>
      <td>Ruptura macroscópica completa da parede do apêndice, com extravasamento de pus fétido, muco e eventualmente saída de apendicolito livre na cavidade. Pode evoluir para duas vias: <em>1. Bloqueio peritoneal</em> (plastrão/abscesso apendicular localizado circundado por omento e alças de íleo) ou <em>2. Peritonite bacteriana difusa livre</em>.</td>
      <td>Pode haver um <strong>alívio transitório enganoso da dor no exato momento da ruptura</strong> (pela súbita descompressão da tensão intraluminal), seguido minutos depois por piora catastrófica com <strong>peritonite generalizada (dor difusa em todos os quadrantes, abdome em tábua, febre alta e choque séptico)</strong>.</td>
    </tr>
  </tbody>
</table>
`
    },
    {
      id: 'manifestacoes-clinicas-e-murphy',
      title: '4. Manifestações Clínicas e a Cronologia Clássica de Murphy',
      body_html: `
<h3>A Cronologia Clássica de Murphy: O Padrão Semiológico de Ouro</h3>
<p>Em 1889, o eminente cirurgião norte-americano John Benjamin Murphy descreveu a sequência temporal típica dos sintomas que consagrou o diagnóstico clínico da apendicite aguda. Esta cronologia, denominada <strong>Tríade ou Cronologia de Murphy</strong>, está presente de forma completa em cerca de 60% a 70% dos pacientes e representa um dos temas mais repetidos em bancas de concursos:</p>
<ol>
  <li><strong>1º Evento — Dor Abdominal Epigástrica ou Periumbilical (Dor Visceral Inicial):</strong>
    <ul>
      <li>Inicia-se de forma insidiosa, imprecisa e difusa ao redor do umbigo ou no epigástrio. O paciente tem dificuldade de apontar a dor, espalmando a mão aberta sobre a região central do abdome;</li>
      <li><em>Base Fisiopatológica:</em> A distensão e o espasmo do apêndice estimulam fibras C amielínicas viscerais que trafegam pelo plexo mesentérico superior até os segmentos medulares de T9, T10 e T11 (que correspondem ao dermátomo periumbilical).</li>
    </ul>
  </li>
  <li><strong>2º Evento — Anorexia e Sintomas Digestivos Associados:</strong>
    <ul>
      <li>A <strong>anorexia (inapetência absoluta)</strong> é um sintoma cardinal extraordinariamente constante (&gt; 95% dos pacientes). Em semiologia cirúrgica consagrada: <em>se o paciente refere fome voraz e apetite plenamente preservado, o diagnóstico de apendicite aguda torna-se altamente improvável</em>;</li>
      <li>A anorexia é sucedida por <strong>náuseas e vômitos</strong> (em geral 1 a 3 episódios discretos de vômitos alimentares ou biliosos). <em>Importante detalhe de prova:</em> Na apendicite aguda, a dor abdominal <strong>SEMPRE PRECEDE OS VÔMITOS</strong>. Se os vômitos incoercíveis precederem o início da dor abdominal, deve-se suspeitar fortemente de gastroenterite aguda infecciosa viral ou bacteriana!</li>
    </ul>
  </li>
  <li><strong>3º Evento — Migração da Dor para a Fossa Ilíaca Direita (Dor Somática Secundária):</strong>
    <ul>
      <li>Após um período de latência de <strong>6 a 12 horas</strong> (podendo variar de 4 a 24 horas) do início dos sintomas centrais, a dor migra e fixa-se com precisão na <strong>fossa ilíaca direita (ponto de McBurney)</strong>;</li>
      <li><em>Base Fisiopatológica:</em> O processo inflamatório ultrapassou a serosa do apêndice (fase flegmonosa) e entrou em contato direto com o <strong>peritônio parietal anterior da fossa ilíaca direita</strong>, ativando fibras somáticas A-delta mielínicas rápidas dos nervos intercostais T11-T12 e L1. A dor torna-se lancinante, contínua, pontual e exacerbada pela tosse ou deambulação.</li>
    </ul>
  </li>
  <li><strong>4º Evento — Febre Baixa / Térmica Subfebril:</strong>
    <ul>
      <li>Geralmente entre 37,8°C e 38,3°C nas fases não complicadas (edematosa e flegmonosa);</li>
      <li><em>Alerta:</em> Picos febris elevados (&gt; 38,5°C - 39,0°C) acompanhados de calafrios profusos sugerem fortemente <strong>perfuração apendicular com abscesso intracavitário bloqueado ou peritonite generalizada</strong>, ou pileflebite (tromboflebite séptica da veia porta com múltiplos microabscessos hepáticos).</li>
    </ul>
  </li>
</ol>

<h3>Alterações do Hábito Intestinal</h3>
<p>A constipação intestinal reflexa (íleo adinâmico localizado ao redor do ceco inflamado) é o achado mais frequente. Contudo, em crianças pequenas ou quando o apêndice adota <em>posição pélvica</em> (irritando diretamente o reto) ou <em>retroileal</em> (irritando o íleo terminal), podem ocorrer episódios de <strong>diarreia inflamatória com fezes pastosas e tenesmo</strong>, induzindo o médico ao erro diagnóstico de colite ou diarreia infecciosa.</p>
`
    },
    {
      id: 'semiologia-completa-e-manobras-especiais',
      title: '5. Semiologia Completa e Manobras Especiais (Blumberg, Rovsing, Psoas, Obturador, Dunphy e Lapinsky)',
      body_html: `
<h3>O Exame Físico Abdominal Meticuloso</h3>
<p>O diagnóstico da apendicite aguda em suas fases iniciais repousa na propedêutica armada das mãos do cirurgião. O abdome deve ser examinado de forma sistemática, iniciando-se suavemente pelo quadrante mais distante da queixa (fossa ilíaca esquerda) e progredindo gradualmente em direção à fossa ilíaca direita para evitar defesa muscular voluntária precoce pelo medo da dor.</p>

<h3>Os Epônimos e Sinais Semiológicos Clássicos de Prova</h3>
<table class="book-table">
  <thead>
    <tr>
      <th>Sinal Semiológico</th>
      <th>Técnica Exata de Execução da Manobra</th>
      <th>Mecanismo Fisiopatológico Específico</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Ponto de McBurney</strong></td>
      <td>Ponto anatômico situado na junção do <strong>terço lateral com os dois terços mediais</strong> de uma linha imaginária traçada entre a espinha ilíaca ântero-superior (EIAS) direita e a cicatriz umbilical.</td>
      <td>Projeta exatamente a localização da base do apêndice cecal e da confluência das tênias no ceco sob a parede abdominal anterior. A palpação com a ponta dos dedos nesse ponto deflagra dor localizada intensa.</td>
    </tr>
    <tr>
      <td><strong>Sinal de Blumberg</strong></td>
      <td>Realiza-se compressão manual profunda, gradual e sustentada sobre o ponto de McBurney (ou qualquer ponto da FID) por cerca de 10 a 15 segundos, seguida de <strong>descompressão súbita e rápida da mão do examinador</strong>.</td>
      <td><strong>Descompressão dolorosa positiva.</strong> A descompressão brusca provoca o recuo elástico violento e a fricção das duas lâminas inflamadas do peritônio parietal anterior contra o peritônio visceral do apêndice, deflagrando um pico agudo de dor lancinante. Traduz <strong>irritação peritoneal (peritonite parietal localizada)</strong>.</td>
    </tr>
    <tr>
      <td><strong>Sinal de Rovsing</strong></td>
      <td>O examinador realiza <strong>compressão manual profunda e retrógrada contínua a partir da Fossa Ilíaca Esquerda (FIE)</strong> em direção ao cólon descendente, transverso e ceco (no sentido anti-horário).</td>
      <td>A manobra mobiliza e empurra a coluna gasosa colônica de volta para o cólon ascendente e ceco. A distensão retrógrada súbita da parede do ceco traciona e desloca o apêndice inflamado, <strong>despertando dor referida na Fossa Ilíaca DIREITA</strong> (e não no local comprimido à esquerda).</td>
    </tr>
    <tr>
      <td><strong>Sinal do Psoas</strong></td>
      <td>Paciente posicionado em <strong>decúbito lateral esquerdo</strong> com membros estendidos. O examinador estabiliza a pelve com uma mão e realiza a <strong>hiperextensão passiva da coxa direita</strong> para trás; alternativamente, em decúbito dorsal, solicita-se ao paciente que flexione ativamente a coxa direita contra a resistência da mão do examinador.</td>
      <td>A manobra estira e contrai o <strong>músculo psoas maior</strong> retroperitoneal. Quando o apêndice inflamado encontra-se em <strong>posição RETROCECAL</strong>, ele repousa diretamente sobre a fáscia do psoas; o atrito muscular mecânico direto provoca dor intensa na FID e flanco direito.</td>
    </tr>
    <tr>
      <td><strong>Sinal do Obturador</strong></td>
      <td>Paciente em decúbito dorsal com o quadril direito e joelho direito flexionados a 90 graus. O examinador segura o joelho e realiza a <strong>rotação interna passiva da coxa direita</strong> (movendo o tornozelo para fora enquanto o joelho é estabilizado medialmente).</td>
      <td>A manobra estira a fáscia e as fibras do <strong>músculo obturador interno</strong> na parede lateral da bacia. É altamente sugestivo de apêndice inflamado em <strong>posição PÉLVICA</strong>, em contato anatômico íntimo com o músculo obturador na pelve profunda.</td>
    </tr>
    <tr>
      <td><strong>Sinal de Dunphy</strong></td>
      <td>Solicita-se ao paciente que tussa com vigor, ou avalia-se a dor referida na FID durante episódios espontâneos de tosse.</td>
      <td>O aumento súbito e vigoroso da pressão intra-abdominal e o choque mecânico do diafragma contra o peritônio parietal inflamado provocam <strong>exacerbação aguda da dor pontual na fossa ilíaca direita</strong>. Excelente teste de triagem precoce em crianças.</td>
    </tr>
    <tr>
      <td><strong>Sinal de Lapinsky</strong></td>
      <td>O examinador realiza a compressão do ponto de McBurney enquanto o paciente eleva ativamente o membro inferior direito completamente estendido.</td>
      <td>A contração da musculatura abdominal anterior somada à elevação da tensão do psoas intensifica a dor apendicular na FID.</td>
    </tr>
    <tr>
      <td><strong>Sinal de Lenander</strong></td>
      <td>Aferição simultânea da temperatura axilar e da temperatura retal.</td>
      <td>Presença de uma <strong>diferença &gt; 1,0°C</strong> entre a temperatura retal (mais quente) e a temperatura axilar (<strong>dissociação axilo-retal</strong>), traduzindo hipertermia regional pélvica decorrente de processo infeccioso ativo intra-abdominal/pélvico.</td>
    </tr>
  </tbody>
</table>
`
    },
    {
      id: 'estratificacao-alvarado-e-air-score',
      title: '6. Estratificação de Risco Clínico e o Escore de Alvarado / Escore AIR',
      body_html: `
<h3>O Papel dos Escores Preditivos Clínicos</h3>
<p>Para sistematizar a tomada de decisão, padronizar o raciocínio médico e racionalizar a solicitação de exames de imagem avançados (evitando radiação desnecessária e reduzindo custos), diversos escores preditivos validados foram incorporados às diretrizes cirúrgicas mundiais (World Society of Emergency Surgery - WSES). O mais clássico e amplamente cobrado em concursos é o <strong>Escore de Alvarado (MANTRELS)</strong>, complementado modernamente pelo <strong>Escore AIR (Appendicitis Inflammatory Response)</strong>.</p>

<h3>O Escore de Alvarado Clássico (Mnemônico MANTRELS — 10 Pontos)</h3>
<table class="book-table">
  <thead>
    <tr>
      <th>Categoria / Componente do Escore</th>
      <th>Manifestação Clínica ou Laboratorial Específica</th>
      <th>Pontuação Atribuída</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>M</strong>igration of pain</td>
      <td>Migração da dor do epigástrio/umbigo para a Fossa Ilíaca Direita</td>
      <td>1 ponto</td>
    </tr>
    <tr>
      <td><strong>A</strong>norexia</td>
      <td>Anorexia (inapetência) ou presença de corpos cetônicos na urina</td>
      <td>1 ponto</td>
    </tr>
    <tr>
      <td><strong>N</strong>ausea and/or vomiting</td>
      <td>Náuseas e/ou vômitos alimentares/biliosos</td>
      <td>1 ponto</td>
    </tr>
    <tr>
      <td><strong>T</strong>enderness in RLQ</td>
      <td><strong>Dor / Sensibilidade à palpação na Fossa Ilíaca Direita</strong></td>
      <td><strong>2 PONTOS</strong></td>
    </tr>
    <tr>
      <td><strong>R</strong>ebound tenderness</td>
      <td>Descompressão dolorosa positiva na FID (Sinal de Blumberg)</td>
      <td>1 ponto</td>
    </tr>
    <tr>
      <td><strong>E</strong>levation of temperature</td>
      <td>Febre / Temperatura corporal &ge; 37,3°C (ou &ge; 37,8°C retal)</td>
      <td>1 ponto</td>
    </tr>
    <tr>
      <td><strong>L</strong>eukocytosis</td>
      <td><strong>Leucocitose sérica &gt; 10.000 / $mm^3$</strong></td>
      <td><strong>2 PONTOS</strong></td>
    </tr>
    <tr>
      <td><strong>S</strong>hift to the left</td>
      <td>Desvio de neutrófilos à esquerda (&gt; 75% de segmentados/bastonetes)</td>
      <td>1 ponto</td>
    </tr>
    <tr>
      <td colspan="2"><strong>PONTUAÇÃO TOTAL MÁXIMA</strong></td>
      <td><strong>10 PONTOS</strong></td>
    </tr>
  </tbody>
</table>
<p><em>Mnemônico Didático dos Valores Duplos:</em> Repare que apenas dois critérios recebem <strong>2 pontos</strong>: a <strong>dor focal à palpação na FID (Tenderness)</strong> e a <strong>leucocitose &gt; 10.000 (Leukocytosis)</strong>. Todos os demais recebem 1 ponto cada.</p>

<h3>Conduta Prática Baseada na Estratificação do Escore de Alvarado</h3>
<ul>
  <li><strong>Pontuação de 0 a 4 Pontos — BAIXO RISCO (Apendicite Praticamente Descartada):</strong>
    <ul>
      <li>Probabilidade de apendicite aguda &lt; 5%;</li>
      <li><em>Conduta:</em> Não requer exames de imagem tomográficos nem cirurgia de rotina. Investigar causas alternativas de dor abdominal; alta segura com orientações estritas sobre sinais de alarme e reavaliação ambulatorial em 24 a 48 horas se persistirem os sintomas.</li>
    </ul>
  </li>
  <li><strong>Pontuação de 5 a 6 Pontos — RISCO INTERMEDIÁRIO (Indeterminado / Duvidoso):</strong>
    <ul>
      <li>Probabilidade de apendicite em torno de 30% a 50%;</li>
      <li><em>Conduta:</em> <strong>Investigação complementar obrigatória com Exame de Imagem</strong> (USG na criança/gestante ou TC de abdome total com contraste IV no adulto e idoso) ou internação para observação clínica seriada com reavaliação abdominal a cada 6 a 8 horas pelo mesmo examinador.</li>
    </ul>
  </li>
  <li><strong>Pontuação de 7 a 10 Pontos — ALTO RISCO (Apendicite Altamente Provável):</strong>
    <ul>
      <li>Probabilidade de apendicite confirmada &gt; 80% a 90%;</li>
      <li><em>Conduta:</em> Em homens adultos jovens com Alvarado &ge; 7 a 8 e quadro clínico clássico inequívoco, a diretriz clássica autoriza <strong>indicação cirúrgica imediata (Apendicectomia)</strong> sem necessidade obrigatória de exames de imagem prévios, embora a tendência contemporânea de serviços terciários preconize a confirmação pré-operatória por TC para descartar diagnósticos alternativos ou quantificar complicações. Em mulheres em idade fértil, idosos e crianças, o exame de imagem segue mandatório mesmo com escores elevados para evitar falso-positivos ginecológicos ou neoplasias cecais.</li>
    </ul>
  </li>
</ul>

<h3>O Escore AIR (Appendicitis Inflammatory Response Score)</h3>
<p>Desenvolvido para superar as limitações do Escore de Alvarado (que superestima apendicites em mulheres e não utiliza a Proteína C Reativa), o <strong>Escore AIR</strong> foi incorporado com grande entusiasmo pelas diretrizes da WSES. Ele introduz a dosagem da <strong>Proteína C Reativa (PCR)</strong> e gradua os parâmetros inflamatórios em níveis de intensidade:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Critério Clínico / Laboratorial do Escore AIR</th>
      <th>Graduação do Parâmetro</th>
      <th>Pontuação Atribuída</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Vômitos</strong></td>
      <td>Presentes</td>
      <td>1 ponto</td>
    </tr>
    <tr>
      <td><strong>Dor na Fossa Ilíaca Direita</strong></td>
      <td>Presente</td>
      <td>1 ponto</td>
    </tr>
    <tr>
      <td><strong>Descompressão Dolorosa ou Defesa Muscular</strong></td>
      <td>Discreta / Leve<br>Moderada<br>Grave / Intensa</td>
      <td>1 ponto<br>2 pontos<br>3 pontos</td>
    </tr>
    <tr>
      <td><strong>Temperatura Corporal</strong></td>
      <td>&ge; 38,5°C</td>
      <td>1 ponto</td>
    </tr>
    <tr>
      <td><strong>Contagem de Leucócitos</strong></td>
      <td>10.000 a 14.900 / $mm^3$<br>&ge; 15.000 / $mm^3$</td>
      <td>1 ponto<br>2 pontos</td>
    </tr>
    <tr>
      <td><strong>Proporção de Neutrófilos</strong></td>
      <td>70% a 84%<br>&ge; 85%</td>
      <td>1 ponto<br>2 pontos</td>
    </tr>
    <tr>
      <td><strong>Proteína C Reativa (PCR)</strong></td>
      <td>10 a 49 mg/L<br>&ge; 50 mg/L</td>
      <td>1 ponto<br>2 pontos</td>
    </tr>
    <tr>
      <td colspan="2"><strong>PONTUAÇÃO TOTAL MÁXIMA DO ESCORE AIR</strong></td>
      <td><strong>12 PONTOS</strong></td>
    </tr>
  </tbody>
</table>

<p><strong>Estratificação Prática pelo Escore AIR:</strong></p>
<ul>
  <li><strong>0 a 4 Pontos — Baixa Probabilidade:</strong> Alta com seguimento ambulatorial se clinicamente estável; valor preditivo negativo &gt; 97%;</li>
  <li><strong>5 a 8 Pontos — Grupo Indeterminado:</strong> Observação em enfermaria com exames de imagem sequenciais (USG/TC) ou reavaliação clínica e laboratorial em 4 a 6 horas;</li>
  <li><strong>9 a 12 Pontos — Alta Probabilidade:</strong> Exploração cirúrgica laparoscópica imediata recomendada (acurácia superior ao Alvarado no diagnóstico de apendicites avançadas).</li>
</ul>
`
    },
    {
      id: 'diagnostico-por-imagem-usg-tc-rm',
      title: '7. Diagnóstico por Imagem: Ultrassonografia, Tomografia Computadorizada e Ressonância Magnética',
      body_html: `
<h3>Quando Indicar Imagem no Diagnóstico da Apendicite?</h3>
<p>Embora a apendicite clássica no homem jovem seja eminentemente clínica, o uso disseminado dos métodos de imagem reduziu as taxas de apendicectomias negativas ("laparotomia branca") de 20-25% para menos de 3% a 5% dos procedimentos operatórios modernos. A escolha da modalidade de imagem deve ser guiada estritamente pela faixa etária, sexo e perfil biológico:</p>

<h3>1. Ultrassonografia de Abdome com Técnica de Compressão Graduada (USG)</h3>
<p>Desenvolvida pioneiramente por Puylaert em 1986, a USG com compressão gradual é o <strong>exame de primeira linha indiscutível na criança, no adolescente e na paciente gestante</strong> (isenta de radiação ionizante e contrastes nefrotóxicos):</p>
<ul>
  <li><strong>Critérios Ultrassonográficos Diagnósticos de Apendicite Aguda:</strong>
    <ol>
      <li><strong>Estrutura tubular com fundo cego não peristáltica que se origina da base cecal</strong>;</li>
      <li><strong>Diâmetro transverso externo aumentado &gt; 6 mm</strong> (aferido de parede externa a parede externa; diâmetro entre 6 e 8 mm pode ser limítrofe, mas &gt; 8 mm é francamente diagnóstico);</li>
      <li><strong>Incompressibilidade à compressão graduada do transdutor</strong> (o apêndice inflamado não colaba sob pressão manual devido ao edema transmural e hipertensão luminal);</li>
      <li><strong>Espessamento da parede apendicular &gt; 2 mm</strong> com perda da estratificação normal das camadas teciduais;</li>
      <li><strong>Presença de Apendicolito:</strong> Imagem hiperecogênica intraluminal com <strong>sombra acústica posterior nítida</strong> (presente em 30% dos casos);</li>
      <li><strong>Halo hiperecogênico periapendicular:</strong> Correspondendo à densificação e inflamação da gordura mesoapendicular adjacente;</li>
      <li><strong>Sinal do Doppler em Cores:</strong> Hiperemia vascular periapendicular periférica nas fases flegmonosas iniciais ("sinal do anel de fogo"); na fase gangrenosa tardia, o Doppler revela ausência completa de fluxo sanguíneo por trombose microvascular.</li>
    </ol>
  </li>
  <li><strong>Limitações do Método:</strong> Sensibilidade global de 75% a 85% e especificidade de 85% a 90%; fortemente prejudicada por obesidade, distensão gasosa de alças intestinais e apêndices em <em>posição retrocecal profunda</em> (que ficam ocultos atrás do ceco preenchido por ar).</li>
</ul>

<h3>2. Tomografia Computadorizada de Abdome e Pelve com Contraste (TC Multislice)</h3>
<p>A <strong>TC com contraste iodado intravenoso</strong> é o <strong>padrão-ouro absoluto em adultos masculinos, idosos e mulheres pós-menopáusicas</strong>, exibindo sensibilidade superior a 95% a 98% e especificidade de 96% a 99%:</p>
<table class="book-table">
  <thead>
    <tr>
      <th>Achado Tomográfico</th>
      <th>Significado Fisiopatológico</th>
      <th>Sensibilidade / Especificidade</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Diâmetro transverso externo &gt; 6 mm</strong></td>
      <td>Dilatação luminal por estase de muco e edema parietal.</td>
      <td>Alta sensibilidade (&gt; 95%).</td>
    </tr>
    <tr>
      <td><strong>Espessamento da parede (&gt; 2 a 3 mm) com realce anelar pós-contraste</strong></td>
      <td>Hiperemia e neovascularização da submucosa inflamada ("sinal do alvo").</td>
      <td>Alta especificidade (&gt; 96%).</td>
    </tr>
    <tr>
      <td><strong>Densificação / Borramento da gordura periapendicular</strong></td>
      <td>Extravasamento do processo inflamatório para o omento e mesocólon (flegmão).</td>
      <td>Achado mais precoce e confiável de inflamação local ativa.</td>
    </tr>
    <tr>
      <td><strong>Apendicolito Hiperdenso Calcificado</strong></td>
      <td>Cálculo intraluminal hiperatenuante com atenuação cálcica (&gt; 100 UH).</td>
      <td>Presente em 30% a 40% dos casos; indica alto risco de perfuração.</td>
    </tr>
    <tr>
      <td><strong>Descontinuidade focal da parede com coleções gasosas extraluminais</strong></td>
      <td>Perfuração apendicular estabelecida com peritonite localizada ou abscesso.</td>
      <td>Confirmação definitiva de apendicite complicada (fase 4).</td>
    </tr>
  </tbody>
</table>

<h3>3. Ressonância Magnética (RM) de Abdome sem Gadolínio</h3>
<p>Modalidade de escolha como exame de resgate na <strong>gestante com suspeita de apendicite cujo exame de ultrassonografia foi duvidoso, inconclusivo ou negativo com persistência de suspeita clínica</strong>. Apresenta acurácia diagnóstica idêntica à da TC (&gt; 95%), não emite radiação ionizante para o feto e dispensa o uso de gadolínio (o gadolínio atravessa a barreira placentária e é contraindicado na gestação).</p>
`
    },
    {
      id: 'diagnosticos-diferenciais-por-faixa-etaria',
      title: '8. Diagnósticos Diferenciais por Faixa Etária e Sexo',
      body_html: `
<h3>O Camaleão da Cirurgia Abdominal</h3>
<p>Em virtude das múltiplas posições anatômicas do apêndice cecal e da diversidade de afecções que acometem a fossa ilíaca direita, a apendicite aguda mimetiza dezenas de patologias médicas e cirúrgicas. O diagnóstico diferencial varia radicalmente em função da idade e do sexo do paciente:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>População-Alvo</th>
      <th>Principais Diagnósticos Diferenciais</th>
      <th>Elementos Distintivos Cruciais no Diagnóstico</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Mulheres em Idade Fértil (15 a 45 anos)</strong></td>
      <td>1. Gravidez Ectópica Rota;<br>2. Rotura de Cisto Folicular ou Luteínico (Mittelschmerz);<br>3. Doença Inflamatória Pélvica (DIP / salpingite);<br>4. Torção de Anexo / Ovário;<br>5. Endometriose profunda de íleo/ceco.</td>
      <td>Histórico menstrual detalhado (atraso menstrual recente); dosagem mandatória de <strong>$\beta$-hCG sérico</strong> em toda mulher em idade fértil com dor abdominal; corrimento vaginal purulento com dor ao colo (DIP); USG transvaginal com Doppler (detecta fluxo ovariano ausente na torção e massas anexiais).</td>
    </tr>
    <tr>
      <td><strong>Crianças e Jovens (&lt; 15 anos)</strong></td>
      <td>1. Linfadenite Mesentérica Aguda;<br>2. Divertículo de Meckel complicado (diverticulite);<br>3. Intussuscepção Intestinal (íleo-cólica);<br>4. Gastroenterite Aguda Viral;<br>5. Púrpura de Henoch-Schönlein.</td>
      <td><strong>Linfadenite Mesentérica:</strong> Frequentemente precedida por IVAS recente (amigdalite/faringite), dor menos localizada na FID, febre mais alta precoce, USG revela múltiplos linfonodos mesentéricos aumentados (&gt; 8 mm) com apêndice normal.<br><strong>Divertículo de Meckel:</strong> Sangramento digestivo baixo indolor (enterorragia) ou diverticulite que simula apendicite indistinguível (requer cintilografia com hemácias marcadas ou Tc-99m pertecnetato).</td>
    </tr>
    <tr>
      <td><strong>Adultos e Idosos (&gt; 50 anos)</strong></td>
      <td>1. Neoplasia de Ceco / Cólon Ascendente perfurada ou estenosante;<br>2. Diverticulite de Cólon Direito ou Cecal;<br>3. Isquemia Mesentérica Aguda;<br>4. Úlcera Duodenal perfurada com líquido na goteira parietocólica direita (Sinal de Valentino);<br>5. Aneurisma de Aorta Abdominal roto.</td>
      <td>Anemia microcítica ferropriva inexplicada e perda ponderal sugerem câncer de ceco; TC de abdome é obrigatória para afastar adenocarcinoma cecal simulador. Na úlcera duodenal perfurada, o suco gástrico escorre pela goteira parietocólica direita acumulando-se na FID, simulando apendicite (<strong>Sinal de Valentino</strong>).</td>
    </tr>
  </tbody>
</table>
`
    },
    {
      id: 'tratamento-cirurgico-laparoscopia-vs-aberta',
      title: '9. Tratamento Cirúrgico: Apendicectomia Videolaparoscópica vs Laparotomia Aberta',
      body_html: `
<h3>O Tratamento Definitivo: A Apendicectomia</h3>
<p>O tratamento padrão-ouro indiscutível da apendicite aguda é a <strong>remoção cirúrgica do apêndice cecal (Apendicectomia)</strong>. Embora estudos recentes tenham avaliado o tratamento puramente clínico com antibioticoterapia isolada em casos não complicados selecionados, as diretrizes da <em>World Society of Emergency Surgery (WSES)</em> e do Colégio Brasileiro de Cirurgiões (CBC) mantêm a apendicectomia como o padrão de referência resolutivo de primeira linha, haja vista a taxa de falha primária do tratamento conservador em torno de 10% a 20% e a taxa de recorrência da apendicite em 1 ano superior a 30% a 40%.</p>

<h3>Apendicectomia Videolaparoscópica: O Padrão-Ouro Atual</h3>
<p>A via videolaparoscópica consolidou-se como a <strong>técnica cirúrgica preferencial</strong> para o tratamento da apendicite aguda em todos os estágios evolutivos (fases 1 a 4, não complicadas ou complicadas), salvo contraindicações formais ao pneumoperitônio:</p>
<ul>
  <li><strong>Vantagens Cientificamente Comprovadas da Laparoscopia:</strong>
    <ol>
      <li><strong>Menor Dor Pós-Operatória</strong> com redução expressiva da necessidade de opioides parenterais;</li>
      <li><strong>Redução Significativa da Infecção de Sítio Cirúrgico (ISC) de parede</strong> (redução de mais de 50% em comparação à via aberta);</li>
      <li><strong>Tempo de Internação Hospitalar Reduzido</strong> e retorno mais rápido às atividades profissionais e laborais (média de 1 a 2 dias);</li>
      <li><strong>Exploração Completa de Toda a Cavidade Abdominal:</strong> Permite inspecionar a pelve, os anexos ginecológicos, o fígado, o espaço subfrênico e o íleo terminal (pesquisa de divertículo de Meckel se o apêndice estiver normal), lavando coleções purulentas distantes sob visão direta;</li>
      <li><strong>Resultados Cosméticos Superiores</strong> e incidência substancialmente menor de hérnias incisionais tardias.</li>
    </ol>
  </li>
  <li><strong>Indicações de Máxima Superioridade da Laparoscopia:</strong>
    <ul>
      <li><em>Pacientes Obesos:</em> Na via aberta, a espessura do panículo adiposo exige incisões enormes com altíssima taxa de infecção de ferida e seroma; na laparoscopia, os mesmos três trocartes de 5 a 10 mm são suficientes;</li>
      <li><em>Mulheres em Idade Fértil:</em> Permite visualizar e resolver diagnósticos ginecológicos associados ou alternativos;</li>
      <li><em>Pacientes Idosos e Atletas.</em></li>
    </ul>
  </li>
  <li><strong>Técnica dos Trocartes:</strong> Habitualmente realizada com 3 portais: um umbilical de 10 mm (para ótica de 30°), um suprapúbico de 5 mm e um na fossa ilíaca esquerda de 5 mm (ou fossa ilíaca direita/flanco esquerdo). Realiza-se ligadura da artéria apendicular no mesoapêndice com bipolar, bisturi harmônico ou clipes metálicos/polímero, e ligadura da base apendicular na parede cecal com fio laçado (Endoloop), grampeador endoscópico linear (EndoGIA) ou clipes Hem-o-lok.</li>
</ul>

<h3>Apendicectomia por Laparotomia Aberta Convencional</h3>
<p>A cirurgia aberta preserva seu espaço insubstituível em hospitais desprovidos de torre de laparoscopia, na vigência de instabilidade hemodinâmica grave com choque séptico refratário ou em casos de conversão por distensão colônica maciça extrema ou flegmão cecal neoplásico invasivo:</p>
<ul>
  <li><strong>Incisão de McBurney (Oblíqua):</strong> Incisão oblíqua de 4 a 6 cm perpendicular à linha espinoumbilical sobre o ponto de McBurney, realizada no sentido das linhas de força da pele com secção por divulsão muscular das fibras dos músculos oblíquo externo, interno e transverso do abdome;</li>
  <li><strong>Incisão de Davis-Rockey (Transversa):</strong> Incisão transversa horizontal na FID com divulsão muscular, oferecendo excelente resultado estético;</li>
  <li><strong>Incisão Mediana Infraumbilical:</strong> Reservada para casos de peritonite difusa purulenta/fecal generalizada grave, dúvida diagnóstica importante com suspeita de outra catástrofe abdominal ou sepse grave.</li>
</ul>

<h3>Achado Inesperado de Apêndice Cecal Normal na Cirurgia: O que Fazer?</h3>
<p><strong>REGRA CIRÚRGICA CLÁSSICA:</strong> Se, durante a exploração laparotômica ou laparoscópica por suspeita de apendicite, o apêndice cecal for encontrado macroscopicamente sadio e sem qualquer sinal inflamatório:</p>
<ol>
  <li><strong>Explorar Obrigatoriamente Toda a Cavidade Abdominal:</strong> Inspecionar o íleo terminal nos seus últimos 100 cm em busca de <strong>Divertículo de Meckel</strong> inflamado ou ileíte terminal aguda por Doença de Crohn; inspecionar os anexos femininos (ovários e trompas) pesquisando torção ou DIP; inspecionar a raiz do mesentério pesquisando linfadenite mesentérica; inspecionar estômago, duodeno e vias biliares;</li>
  <li><strong>Remover ou Não o Apêndice Normal?</strong> A conduta preconizada na cirurgia é <strong>realizar a apendicectomia incidental</strong>, exceto se a base cecal estiver envolvida por doença inflamatória intestinal grave ativa (Doença de Crohn com fístula em ceco). A remoção previne que o paciente venha a ter apendicite no futuro (evitando confusão diagnóstica em um paciente que já ostenta cicatriz cirúrgica na FID) e permite análise anatomopatológica histológica para afastar apendicite endoluminal microscópica incipiente ou lesões parasitárias/tumorais ocultas.</li>
</ol>

<h3>Principais Complicações Pós-Operatórias da Apendicectomia</h3>
<p>Embora a apendicectomia seja uma das cirurgias mais realizadas no planeta, o pós-operatório pode cursar com intercorrências graves que devem ser reconhecidas precocemente:</p>
<ul>
  <li><strong>1. Abscesso Intra-Abdominal Residual (Pélvico ou Subfrênico):</strong> Ocorre em 2% a 5% das apendicites complicadas perfuradas. O paciente apresenta piora clínica entre o <strong>5º e o 8º dia pós-operatório</strong>, caracterizada por retorno de febre em picos, taquicardia, dor pélvica, tenesmo retal ou diarreia e leucocitose reativa. Diagnóstico: TC de abdome e pelve com contraste. Tratamento de escolha: <strong>Drenagem percutânea guiada por TC ou USG</strong> (ou transretal se coleção pélvica flutuante adjacente ao reto) associada a antibioticoterapia venosa;</li>
  <li><strong>2. Infecção de Sítio Cirúrgico (ISC) de Parede:</strong> Complicação mais comum da cirurgia aberta (até 10% a 15% na apendicite perfurada vs &lt; 2% na laparoscopia). Manifesta-se no 4º a 6º dia por eritema, calor, edema e flutuação na incisão. Tratamento: abertura dos pontos da pele e celular subcutâneo, drenagem do exsudato purulento, curativos diários por segunda intenção e desbridamento;</li>
  <li><strong>3. Deiscência do Coto Apendicular e Fístula Estercorácea:</strong> Resulta de necrose da parede cecal friável adjacente à ligadura da base ou escape do coto apendicular. Apresenta-se como peritonite fecal localizada ou saída de fezes pelo orifício do dreno ou ferida operatória. Tratamento: se bem drenada e sem peritonite, manejo conservador com nutrição, proteção de pele e suporte clínico; se peritonite difusa livre, laparotomia com ressecção ileocecal;</li>
  <li><strong>4. Pileflebite (Tromboflebite Séptica da Veia Porta):</strong> Complicação rara, porém catastrófica e com altíssima letalidade. Consiste na embolização bacteriana séptica através das veias apendiculares e veia mesentérica superior para a veia porta, provocando trombose séptica da circulação portal e múltiplos microabscessos hepáticos purulentos. Apresenta-se com febre alta remitente, calafrios severos, icterícia e dor em hipocôndrio direito. Tratamento: antibioticoterapia venosa de amplo espectro prolongada em doses altas e anticoagulação plena com heparina.</li>
</ul>
`
    },
    {
      id: 'apendicite-complicada-e-plastrao',
      title: '10. Apendicite Complicada, Plastrão Apendicular e Apendicectomia de Intervalo',
      body_html: `
<h3>O Conceito de Plastrão Apendicular (Bloqueio Peritoneal)</h3>
<p>Quando a perfuração apendicular ocorre de forma gradual e insidiosa em um hospedeiro imunocompetente, os mecanismos naturais de contenção da cavidade peritoneal entram em ação. O grande omento (epíplon maior), as alças adjacentes de íleo terminal e a parede do ceco migram em direção à fossa ilíaca direita, circundando e "envelopando" o apêndice perfurado. Cria-se assim um <strong>plastrão inflamatório apendicular ou fleimão</strong>, que isola o foco séptico do restante do peritônio livre, impedindo a progressão para peritonite difusa mortal.</p>
<p>Clinicamente, o paciente com plastrão apendicular apresenta tipicamente uma <strong>história arrastada de dor na FID com mais de 5 a 7 dias de evolução</strong>, associada a febre baixa ou moderada, anorexia e a palpação de uma <strong>massa tumoral endurecida, mal delimitada e dolorosa na fossa ilíaca direita</strong>.</p>

<h3>A Conduta Conservadora Inicial no Plastrão Apendicular</h3>
<p>Operar de urgência um paciente com plastrão apendicular organizado com massa palpável de mais de 5 a 7 dias é um dos maiores erros cirúrgicos técnicos. Nessa fase, a anatomia local encontra-se completamente distorcida por um tecido inflamatório denso, friável e hipervascularizado ("tecido em borracha"), e as alças de íleo e ceco estão fundidas em bloco ao apêndice necrótico. A tentativa de dissecção forçada resulta frequentemente em <strong>lesões inadvertidas de alças entéricas, perfurações iatrogênicas de ceco com peritonite fecal e necessidade de hemicolectomia direita mutiladora de urgência com ileostomia</strong>:</p>
<p>Por esse motivo, as diretrizes internacionais preconizam o <strong>Tratamento Clínico Conservador Inicial (Estratégia Ochsner)</strong>:</p>
<ol>
  <li><strong>Internação Hospitalar e Repouso Intestinal</strong>;</li>
  <li><strong>Antibioticoterapia Venosa de Amplo Espectro</strong> cobrindo gram-negativos e anaeróbios entéricos (ex: Ceftriaxona + Metronidazol ou Piperacilina-Tazobactam) por 7 a 14 dias;</li>
  <li><strong>Avaliação Tomográfica Obrigatória (TC de Abdome Total):</strong>
    <ul>
      <li>Se a TC evidenciar <em>apenas fleimão sólido sem abscesso organizado</em>: manter antibioticoterapia isolada com vigilância clínica seriada;</li>
      <li>Se a TC evidenciar <strong>abscesso apendicular volumoso (&gt; 3 a 4 cm de diâmetro)</strong>: realizar <strong>Drenagem Percutânea guiada por TC ou Ultrassonografia</strong> com colocação de dreno de "pig-tail" percutâneo associada a antibioticoterapia venosa contínua. Essa estratégia descomprime o foco purulento sem abrir a cavidade abdominal!</li>
    </ul>
  </li>
  <li><strong>Critérios de Sucesso e Conversão Cirúrgica:</strong> Acompanhamento diário com curva térmica, leucograma e PCR. Em mais de 80% a 90% dos casos ocorre melhora expressiva da dor, desaparecimento da massa e normalização dos leucócitos. Se houver piora clínica, sepse progressiva, distensão obstrutiva ou sinais de peritonite difusa livre, indica-se cirurgia aberta ou laparoscópica de urgência.</li>
</ol>

<h3>Apendicectomia de Intervalo e o Rastreio Colonoscópico Obrigatório</h3>
<ul>
  <li><strong>Apendicectomia de Intervalo:</strong> Após a resolução clínica completa do plastrão e alta hospitalar, programa-se a ressecção cirúrgica eletiva do apêndice (apendicectomia videolaparoscópica de intervalo) após um período de <strong>6 a 12 semanas (habitualmente 8 a 10 semanas)</strong>. Nessa janela tardia, todo o exsudato fibrinoso e inflamatório foi reabsorvido, os planos de clivagem anatômicos estão restaurados e a cirurgia torna-se tecnicamente limpa, segura e simples;</li>
  <li><strong>ATENÇÃO CRUCIAL PARA PROVAS DE RESIDÊNCIA E ENAMED:</strong> Em todo paciente com <strong>idade &ge; 40 anos</strong> tratado conservadoramente por plastrão apendicular, é <strong>MANDATÓRIA A REALIZAÇÃO DE COLONOSCOPIA TOTAL PRÉVIA</strong> (após resolução do quadro agudo e antes ou concomitante à cirurgia)! O objetivo precípuo é descartar formalmente um <strong>Adenocarcinoma de Ceco ou Neoplasia Neuroendócrina / Mucinosa Apendicular oculta</strong> que se apresentou primariamente mimetizando apendicite complicada (presente em 5% a 12% dos pacientes acima de 40 a 50 anos com plastrão apendicular).</li>
</ul>
`
    },
    {
      id: 'antibioticoprofilaxia-e-terapeutica',
      title: '11. Antibioticoprofilaxia e Antibioticoterapia Terapêutica',
      body_html: `
<h3>Racionalidade do Uso de Antimicrobianos na Apendicite</h3>
<p>A antibioticoterapia é um componente indissociável do manejo da apendicite aguda. No entanto, deve-se distinguir de forma rigorosa a <strong>antibioticoprofilaxia perioperatória</strong> da <strong>antibioticoterapia terapêutica curativa</strong>:</p>

<h3>1. Antibioticoprofilaxia Cirúrgica (Apendicite Não Complicada — Fases 1 e 2)</h3>
<p>Em pacientes com apendicite aguda não complicada (fases edematosa e flegmonosa, sem gangrena, necrose ou perfuração macroscópica):</p>
<ul>
  <li><strong>Objetivo:</strong> Reduzir a taxa de infecção de sítio cirúrgico (incisional superficial e profunda) induzida pela translocação bacteriana transitória durante a manipulação da víscera;</li>
  <li><strong>Momento de Administração:</strong> Administrar dose única por via intravenosa no momento da indução anestésica (dentro dos <strong>30 a 60 minutos antes da incisão cirúrgica</strong>);</li>
  <li><strong>Esquemas Padronizados de Escolha:</strong>
    <ul>
      <li><strong>Cefazolina (2 g IV) + Metronidazol (500 mg IV)</strong> — excelente custo-efetividade; ou</li>
      <li><strong>Cefoxitina (2 g IV)</strong> — cefalosporina de 2ª geração com atividade antianaeróbia intrínseca contra <em>Bacteroides fragilis</em>; ou</li>
      <li><strong>Ampicilina-Sulbactam (3 g IV)</strong>.</li>
      <li><em>Pacientes com alergia grave a beta-lactâmicos:</em> Ciprofloxacino (400 mg IV) + Metronidazol (500 mg IV) ou Gentamicina + Clindamicina.</li>
    </ul>
  </li>
  <li><strong>Duração do Tratamento:</strong> <strong>DOSE ÚNICA PERIOPERATÓRIA.</strong> As diretrizes da WSES e do CDC determinam categoricamente que, em apendicite não complicada ressecada completamente, <strong>NÃO HÁ INDICAÇÃO DE MANTER ANTIBIÓTICOS NO PÓS-OPERATÓRIO</strong>. Manter antibióticos por 24 ou 48 horas não traz benefícios clínicos e seleciona bactérias hospitalares resistentes.</li>
</ul>

<h3>2. Antibioticoterapia Terapêutica (Apendicite Complicada — Fases 3 e 4)</h3>
<p>Em pacientes com apendicite complicada (fase gangrenosa avançada com necrose da base, apendicite perfurada, peritonite purulenta localizada ou difusa e abscessos intracavitários):</p>
<ul>
  <li><strong>Objetivo:</strong> Erradicar bactérias entéricas gram-negativas e anaeróbias que invadiram a cavidade peritoneal e prevenir a formação tardia de abscessos intracavitários residuais e sepse sistêmica;</li>
  <li><strong>Regimes Antimicrobianos Recomendados:</strong>
    <ul>
      <li><em>Esquema 1:</em> <strong>Ceftriaxona (1 g IV 12/12h ou 2 g 1x/dia) + Metronidazol (500 mg IV 8/8h)</strong>;</li>
      <li><em>Esquema 2:</em> <strong>Ampicilina-Sulbactam (3 g IV 6/6h)</strong>;</li>
      <li><em>Esquema para Sepse Grave / Pacientes Críticos / Hospitalar:</em> <strong>Piperacilina-Tazobactam (4,5 g IV 6/6h ou 8/8h infusão estendida)</strong> ou Meropenem (1 g IV 8/8h).</li>
    </ul>
  </li>
  <li><strong>Duração do Tratamento no Pós-Operatório:</strong>
    <ul>
      <li>Estudos clínicos randomizados robustos de alta qualidade (com destaque para o clássico <em>Trial STOP-IT</em> de Sawyer et al.) demonstraram que, após a remoção cirúrgica adequada da fonte séptica (apendicectomia e lavagem peritoneal adequada), um curso curto de <strong>3 a 5 dias (habitualmente 4 dias pós-operatórios)</strong> é absolutamente equivalente em eficácia e cura à terapia clássica prolongada de 7 a 10 dias;</li>
      <li>Critérios para descalonamento e suspensão: paciente afebril por mais de 24 horas, tolerando dieta oral plena, com trânsito intestinal restabelecido e leucograma em regressão.</li>
    </ul>
  </li>
</ul>
`
    },
    {
      id: 'casos-clinicos-estruturados-apendicite',
      title: '12. Casos Clínicos Estruturados e Discussões Práticas Baseadas em Evidências',
      body_html: `
<div class="book-case">
  <h3>Caso Clínico 1: Apendicite Aguda Típica com Cronologia de Murphy em Adulto Jovem</h3>
  <p><strong>Identificação:</strong> Homem de 22 anos, estudante universitário, previamente hígido, procura a UPA queixando-se de dor abdominal iniciada há 14 horas.</p>
  <p><strong>História Clínica:</strong> Relata que a dor teve início na noite anterior como um desconforto vago em volta do umbigo, acompanhado de recusa alimentar absoluta (anorexia) e sensação de plenitude. Vomitou duas vezes durante a madrugada (vômitos biliosos). Pela manhã, a dor "mudou de lugar", descendo para o lado inferior direito da barriga, tornando-se contínua, em pontadas fortes que pioram ao tossir e ao caminhar.</p>
  <p><strong>Exame Físico:</strong> Bom estado geral, corado, febril (Temp axilar: 38,0°C), FC: 96 bpm, PA: 120/75 mmHg. Abdome: plano, com dor à palpação profunda na fossa ilíaca direita. <strong>Dor intensa no ponto de McBurney associada a descompressão dolorosa positiva e nítida (Sinal de Blumberg positivo)</strong>. <strong>Sinal de Rovsing positivo</strong> (dor na FID ao comprimir a FIE). Sinais do psoas e obturador negativos.</p>
  <p><strong>Exames Laboratoriais:</strong> Hemograma com 14.800 leucócitos/$mm^3$ (desvio à esquerda com 78% de neutrófilos e 6% de bastonetes). Exame de urina (EAS) normal sem leucocitúria ou bacteriúria.</p>
  
  <h4>Discussão Clínica Passo a Passo:</h4>
  <p><strong>1. Reconhecimento Clínico-Semiológico:</strong> O paciente apresenta a <strong>Cronologia de Murphy completa</strong> (dor periumbilical visceral $\rightarrow$ anorexia $\rightarrow$ vômitos $\rightarrow$ migração para a FID somática em 12-14 horas). Os sinais de McBurney, Blumberg e Rovsing fecham irritação peritoneal localizada típica na fossa ilíaca direita.</p>
  <p><strong>2. Aplicação do Escore de Alvarado:</strong></p>
  <ul>
    <li>Migração da dor para FID: 1 ponto;</li>
    <li>Anorexia: 1 ponto;</li>
    <li>Náuseas/vômitos: 1 ponto;</li>
    <li>Dor à palpação na FID: <strong>2 pontos</strong>;</li>
    <li>Descompressão dolorosa na FID (Blumberg): 1 ponto;</li>
    <li>Elevação térmica (&ge; 37,3°C): 1 ponto;</li>
    <li>Leucocitose &gt; 10.000: <strong>2 pontos</strong>;</li>
    <li>Desvio à esquerda (&gt; 75%): 1 ponto;</li>
    <li><strong>Escore Total = 10 PONTOS (Risco Altíssimo)!</strong></li>
  </ul>
  <p><strong>3. Conduta Terapêutica:</strong> Em homem jovem com quadro clínico patognomônico e Alvarado máximo (10 pontos), não há necessidade mandatória de postergar o tratamento com exames tomográficos demorados. Conduta: jejum oral, hidratação venosa, <strong>antibioticoprofilaxia em dose única (Cefazolina 2 g + Metronidazol 500 mg IV na indução)</strong> e <strong>Apendicectomia Videolaparoscópica de Urgência</strong>. Achado intraoperatório confirmou apendicite flegmonosa (fase 2) por fecalito intraluminal. Alta no primeiro dia pós-operatório sem antibióticos em casa.</p>
</div>

<div class="book-case">
  <h3>Caso Clínico 2: Apendicite Retrocecal Atípica com Sinal do Psoas</h3>
  <p><strong>Identificação:</strong> Homem de 35 anos, motorista rodoviário, procura pronto-socorro com dor em flanco direito e região lombar direita há 36 horas. Já passou por duas consultas ambulatoriais prévias recebendo analgésicos e diagnóstico presuntivo de cólica nefrética.</p>
  <p><strong>Exame Físico:</strong> Abdome flácido, com sensibilidade profunda discreta em FID, <strong>sem sinal de Blumberg evidente à palpação anterior</strong>. Ausência de massas palpáveis. Giordano negativo à punho-percussão lombar. Ao posicionar o paciente em <strong>decúbito lateral esquerdo e realizar a hiperextensão passiva da coxa direita para trás, o paciente refere dor lancinante na profundidade da FID e flanco direito (Sinal do Psoas intensamente positivo)</strong>.</p>
  <p><strong>Laboratório e Imagem:</strong> Hemograma com 16.200 leucócitos/$mm^3$ com desvio à esquerda. EAS com 12 leucócitos por campo e raras hemácias (leucocitúria asséptica por contiguidade ureteral). Tomografia computadorizada de abdome e pelve com contraste IV evidenciou <strong>apêndice cecal em topografia retrocecal ascendente</strong>, distendido com 11 mm de diâmetro, parede espessada com realce anelar, borramento acentuado do plano adiposo retrocecal e contato anatômico direto com o ventre do músculo psoas maior direito.</p>
  
  <h4>Discussão Clínica Passo a Passo:</h4>
  <p><strong>1. Fisiopatologia da Apresentação Atípica:</strong> O apêndice retrocecal (posição mais frequente na anatomia humana, 65%) encontra-se protegido anteriormente pelo ceco e cólon ascendente repletos de ar. Por esse motivo, a palpação abdominal anterior superficial é frequentemente indolente e o sinal de Blumberg anterior costuma ser negativo ou duvidoso nas fases iniciais.</p>
  <p><strong>2. Valor da Manobra do Psoas:</strong> A tração e o estiramento passivo do músculo psoas deflagram atrito mecânico direto contra o apêndice retrocecal em chamas, confirmando o foco patológico.</p>
  <p><strong>3. Conduta:</strong> Paciente encaminhado para <strong>Apendicectomia Videolaparoscópica</strong>. A laparoscopia permitiu mobilização segura do cólon ascendente pela goteira parietocólica direita (manobra de Cattell-Braasch parcial), exposição do espaço retroperitoneal, clipagem do mesoapêndice e apendicectomia com lavagem local. Evolução excelente.</p>
</div>

<div class="book-case">
  <h3>Caso Clínico 3: Plastrão Apendicular em Paciente Idoso e Conduta de Intervalo</h3>
  <p><strong>Identificação:</strong> Mulher de 58 anos, diabética tipo 2, dá entrada no hospital com queixa de dor na fossa ilíaca direita associada a febre intermitente e perda de apetite iniciada há 8 dias.</p>
  <p><strong>Exame Físico:</strong> Encontra-se em regular estado geral, afebril no momento da triagem (37,4°C), PA: 130/80 mmHg, FC: 84 bpm. Abdome globoso, com ruídos hidroaéreos presentes. À palpação da fossa ilíaca direita, nota-se <strong>massa tumoral palpável endurecida, dolorosa, medindo cerca de 6 a 7 cm de extensão</strong>, circundada por tecido tenso, sem sinais de peritonite difusa nos demais quadrantes.</p>
  <p><strong>Tomografia Computadorizada de Abdome com Contraste IV:</strong> Demonstra <strong>plastrão apendicular bloqueado</strong> composto por espessamento inflamatório maciço do ceco, apêndice perfurado contendo apendicolito na base, circundado pelo omento maior e alças de íleo aderidas, associado a uma <strong>coleção líquida com realce periférico em anel medindo 5,2 cm no maior diâmetro (abscesso apendicular bloqueado)</strong>.</p>
  
  <h4>Discussão Clínica Passo a Passo:</h4>
  <p><strong>1. Por que NÃO Operar de Urgência?</strong> A paciente apresenta evolução tardia (&gt; 7 dias) com plastrão apendicular organizado. A cirurgia de emergência nesse cenário apresenta risco exorbitante de fístula estercorácea cecal, rotura iatrogênica de alças e conversão mandatória para hemicolectomia direita aberta desnecessária.</p>
  <p><strong>2. Conduta Inicial Conservadora de Escolha:</strong></p>
  <ul>
    <li>Internação hospitalar e jejum inicial;</li>
    <li><strong>Antibioticoterapia venosa de amplo espectro</strong> com Ceftriaxona + Metronidazol;</li>
    <li>Como o abscesso mede <strong>5,2 cm (&gt; 3 a 4 cm)</strong>, está indicada formalmente a <strong>Drenagem Percutânea guiada por Tomografia Computadorizada</strong> com posicionamento de cateter de drenagem externa. Saída de 45 mL de secreção purulenta fétida na punção inicial;</li>
    <li>A paciente evoluiu afebril em 48h, a coleção reduziu e o dreno foi sacado no 6º dia pós-drenagem. Alta hospitalar no 8º dia com antibioticoterapia oral completando 14 dias de tratamento ambulatorial.</li>
  </ul>
  <p><strong>3. Conduta Tardia Obrigatória:</strong></p>
  <ul>
    <li>Como a paciente tem 58 anos (&ge; 40 anos), realizou-se <strong>Colonoscopia Total após 6 semanas da alta</strong> para afastar formalmente Adenocarcinoma de ceco ou lesão mucinosa apendicular (colonoscopia revelou mucosa cecal normal com orifício apendicular cicatricial);</li>
    <li>Submetida a <strong>Apendicectomia Videolaparoscópica de Intervalo com 10 semanas de evolução</strong> em procedimento eletivo limpo e sem intercorrências.</li>
  </ul>
</div>

<div class="book-case">
  <h3>Caso Clínico 4: Apendicite Aguda na Gestação (Segundo Trimestre)</h3>
  <p><strong>Identificação:</strong> Gestante de 27 anos, primigesta na 22ª semana de idade gestacional, procura a maternidade de alto risco com dor no flanco direito e hipocôndrio direito iniciada há 20 horas, acompanhada de dois episódios de vômitos e febre de 38,1°C.</p>
  <p><strong>Exame Físico:</strong> Altura uterina de 20 cm compatível com a idade gestacional. Batimentos cardiofetais (BCF) rítmicos a 148 bpm com boa vitalidade. Abdome: dor à palpação profunda localizada no <strong>flanco direito e hipocôndrio direito</strong> (acima do ponto clássico de McBurney), com descompressão dolorosa positiva localizada. Ausência de contrações uterinas ou perdas vaginais.</p>
  <p><strong>Exames Complementares:</strong> Leucograma revelando 17.500 leucócitos/$mm^3$ com 8% de bastões (desvio à esquerda patológico além da leucocitose fisiológica gestacional). A <strong>Ultrassonografia obstétrica e abdominal com compressão gradual foi inconclusiva</strong> em virtude da interposição do útero gravídico e gases colônicos que impediram a visualização completa do ceco e apêndice.</p>
  
  <h4>Discussão Clínica Passo a Passo:</h4>
  <p><strong>1. Variação Anatômica Topográfica na Gestação:</strong> O útero gravídico volumoso desloca o ceco e o apêndice cefalicamente e lateralmente. No final do 2º trimestre e durante o 3º trimestre, o ponto de maior dor situa-se no flanco ou hipocôndrio direito, mimetizando colecistite aguda ou pielonefrite;</p>
  <p><strong>2. Próximo Passo Propedêutico:</strong> Como a USG foi inconclusiva e a paciente é gestante, o exame de imagem complementar de escolha é a <strong>Ressonância Magnética (RM) de Abdome sem gadolínio</strong>. A RM confirmou apêndice de 9 mm com hiperintensidade de sinal em T2, líquido livre peri-apendicular e edema parietal no flanco direito;</p>
  <p><strong>3. Tratamento Cirúrgico:</strong> <strong>Apendicectomia Videolaparoscópica de Urgência</strong> com técnica adaptada para gestantes: pneumoperitônio suave com pressão intra-abdominal reduzida (10 a 12 mmHg), posicionamento do primeiro trocarte guiado pela altura uterina (trocarte supraumbilical aberto por técnica de Hasson) e monitorização contínua dos batimentos cardiofetais. Procedimento realizado sem intercorrências, com preservação da integridade fetal e alta no 2º dia de pós-operatório.</p>
</div>
`
    },
    {
      id: 'questoes-comentadas-residencia-apendicite',
      title: '13. Questões Comentadas de Residência Médica e Revalida/ENAMED',
      body_html: `
<div class="book-case">
  <p><strong>Questão 1 (Residência Médica / ENARE / USP):</strong><br>
  Homem de 21 anos é admitido com história de dor periumbilical vaga iniciada há 16 horas, que migrou para a fossa ilíaca direita nas últimas 6 horas, acompanhada de náuseas e inapetência. Ao exame físico: corado, hidratado, temperatura axilar de 37,9°C. Abdome plano, ruídos hidroaéreos diminuídos. Apresenta dor intensa à compressão do ponto de McBurney com descompressão dolorosa brusca positiva na fossa ilíaca direita. Ao comprimir a fossa ilíaca esquerda de forma retrógrada em direção ao cólon descendente, o paciente refere dor intensa na fossa ilíaca direita. Qual é a denominação semiológica dessa manobra executada na fossa ilíaca esquerda e qual o mecanismo fisiopatológico subjacente?</p>
  
  <p>A) Sinal de Blumberg; irritação peritoneal parietal direta por atrito de lâminas serosas.<br>
  B) Sinal de Rovsing; deslocamento retrógrado de gases colônicos distendendo o ceco inflamado.<br>
  C) Sinal do Psoas; estiramento das fibras musculares do psoas em apêndice retrocecal.<br>
  D) Sinal do Obturador; compressão da fáscia muscular pélvica em apêndice pélvico descendente.<br>
  E) Sinal de Dunphy; elevação súbita da pressão intra-abdominal provocada pela tosse voluntária.</p>
  
  <h4>Comentário Detalhado:</h4>
  <p><strong>Alternativa Correta: B.</strong></p>
  <ul>
    <li>O <strong>Sinal de Rovsing</strong> consiste no despertar de dor na Fossa Ilíaca DIREITA durante a compressão manual contínua retrógrada da Fossa Ilíaca ESQUERDA e cólon descendente;</li>
    <li>O mecanismo fisiopatológico consiste no <em>deslocamento retrógrado da coluna de gás colônico</em> no sentido anti-horário (do cólon descendente para o transverso, ascendente e ceco). Ao atingir o ceco, o gás distende a parede cecal e traciona o apêndice inflamado, deflagrando dor na FID;</li>
    <li><em>Erro da A:</em> Blumberg é a descompressão dolorosa direta na FID;</li>
    <li><em>Erro da C e D:</em> Psoas e Obturador envolvem manobras articulares com a coxa;</li>
    <li><em>Erro da E:</em> Dunphy é dor na FID ao tossir.</li>
  </ul>
</div>

<div class="book-case">
  <p><strong>Questão 2 (UNICAMP / Revalida INEP):</strong><br>
  Sobre a etiopatogenia e fisiopatologia da apendicite aguda, assinale a alternativa que correlaciona CORRETAMENTE a faixa etária à causa mais frequente de obstrução luminal apendicular:</p>
  
  <p>A) Em crianças e adolescentes, a causa predominante é o fecalito intraluminal calcificado decorrente de dieta pobre em fibras.<br>
  B) Em adultos jovens e escolares, a causa mais comum é a hiperplasia dos folículos linfoides submucosos associada a infecções virais prévias.<br>
  C) Em idosos acima de 65 anos, a obstrução luminal decorre exclusivamente de corpos estranhos de origem alimentar.<br>
  D) A infestação por Enterobius vermicularis é a principal causa isolada de apendicite aguda em todas as faixas etárias nos países tropicais.<br>
  E) O adenocarcinoma cecal estenosante responde por mais de 50% de todos os casos de apendicite aguda em homens com menos de 30 anos.</p>
  
  <h4>Comentário Detalhado:</h4>
  <p><strong>Alternativa Correta: B.</strong></p>
  <ul>
    <li>A <strong>hiperplasia linfoide submucosa</strong> é responsável por aproximadamente <strong>60% dos casos</strong> de apendicite aguda em crianças, adolescentes e adultos jovens. O apêndice cecal possui rica população de tecido linfoide associado à mucosa (MALT) que reage a infecções virais respiratórias e digestivas com edema e hipertrofia tecidual volumosa, ocluindo a luz estreita do órgão;</li>
    <li><em>Erro da A:</em> O fecalito (ou apendicolito) responde por cerca de 35% dos casos e é a causa predominante em adultos e idosos (e não em crianças);</li>
    <li><em>Erro da C:</em> No idoso, fecalitos e neoplasias colorretais são muito mais frequentes que corpos estranhos;</li>
    <li><em>Erro da D:</em> Parasitoses respondem por menos de 1% a 2% das etiologias;</li>
    <li><em>Erro da E:</em> O adenocarcinoma cecal ocorre em idosos (&gt; 50 anos) e responde por 1% a 3% do total de casos.</li>
  </ul>
</div>

<div class="book-case">
  <p><strong>Questão 3 (SUS-SP / Cirurgia Geral):</strong><br>
  Jovem de 19 anos comparece à sala de emergência com história de dor abdominal periumbilical que migrou para a fossa ilíaca direita há 10 horas, anorexia, dois episódios de náuseas, sem vômitos. Exame físico: dor à palpação profunda na fossa ilíaca direita com descompressão dolorosa moderada (Blumberg positivo). Temperatura axilar de 37,5°C. Hemograma colhido revela 12.500 leucócitos/$mm^3$ com 79% de neutrófilos segmentados. Calcule a pontuação deste paciente no Escore de Alvarado e defina a conduta preconizada:</p>
  
  <p>A) Alvarado 5 pontos (Baixo Risco); alta hospitalar com sintomáticos.<br>
  B) Alvarado 7 pontos (Alto Risco); indicação de apendicectomia cirúrgica.<br>
  C) Alvarado 9 pontos (Alto Risco); indicação de apendicectomia cirúrgica.<br>
  D) Alvarado 6 pontos (Risco Intermediário); TC de abdome obrigatória.<br>
  E) Alvarado 10 pontos (Altíssimo Risco); laparotomia exploradora imediata.</p>
  
  <h4>Comentário Detalhado:</h4>
  <p><strong>Alternativa Correta: C.</strong></p>
  <ul>
    <li>Vamos pontuar minuciosamente segundo os critérios do Escore de Alvarado:
      <ol>
        <li>Migração da dor para FID: <strong>1 ponto</strong>;</li>
        <li>Anorexia: <strong>1 ponto</strong>;</li>
        <li>Náuseas ou vômitos: <strong>1 ponto</strong>;</li>
        <li>Dor à palpação na FID (Tenderness): <strong>2 PONTOS</strong>;</li>
        <li>Descompressão dolorosa (Blumberg): <strong>1 ponto</strong>;</li>
        <li>Elevação de temperatura (&ge; 37,3°C): <strong>1 ponto</strong> (37,5°C);</li>
        <li>Leucocitose &gt; 10.000: <strong>2 PONTOS</strong> (12.500);</li>
        <li>Desvio à esquerda (&gt; 75%): <strong>1 ponto</strong> (79%);</li>
      </ol>
    </li>
    <li>$\text{Soma Total} = 1 + 1 + 1 + 2 + 1 + 1 + 2 + 1 = \mathbf{9\text{ PONTOS}}$;</li>
    <li>Com pontuação de 9 pontos, o paciente situa-se na faixa de <strong>Alto Risco (Alvarado 7 a 10)</strong>, com probabilidade &gt; 90% de apendicite confirmada, justificando a indicação de tratamento cirúrgico (apendicectomia videolaparoscópica).</li>
  </ul>
</div>

<div class="book-case">
  <p><strong>Questão 4 (ENAMED / AMRIGS):</strong><br>
  Mulher de 54 anos apresenta-se no pronto-atendimento com dor na fossa ilíaca direita há 8 dias, febre diária de 38,0°C e astenia. Ao exame abdominal, palpa-se massa dolorosa, fixa, de limites imprecisos na FID medindo cerca de 6 cm. A tomografia computadorizada confirma plastrão apendicular bloqueado por omento e alças de delgado, com abscesso organizado medindo 5,0 cm de diâmetro. A paciente encontra-se hemodinamicamente estável, sem sinais de peritonite difusa. Qual é a conduta sequencial mais adequada recomendada pelas diretrizes atuais?</p>
  
  <p>A) Laparotomia exploradora mediana imediata com apendicectomia e drenagem aberta da cavidade.<br>
  B) Hemicolectomia direita de urgência com anastomose íleo-transversa primária.<br>
  C) Tratamento clínico inicial com antibioticoterapia venosa associada a drenagem percutânea do abscesso guiada por TC/USG; colonoscopia após 6 semanas e apendicectomia de intervalo tardia.<br>
  D) Apendicectomia videolaparoscópica de urgência com lise imediata de todas as aderências do plastrão.<br>
  E) Alta hospitalar com ciprofloxacino oral e acompanhamento clínico sem necessidade de cirurgia.</p>
  
  <h4>Comentário Detalhado:</h4>
  <p><strong>Alternativa Correta: C.</strong></p>
  <ul>
    <li>O quadro é de <strong>apendicite complicada com plastrão apendicular e abscesso volumoso (5,0 cm) com mais de 7 dias de evolução</strong>;</li>
    <li>A cirurgia de urgência (laparotomia ou laparoscopia precoce) é formalmente desaconselhada pelo alto risco de lesão de alças friáveis e fístula cecal com necessidade de ressecção extensa;</li>
    <li>A conduta padrão ouro consagrada pelas diretrizes (WSES / CBC) é a <strong>estratégia conservadora inicial</strong>: internação, antibioticoterapia parenteral de amplo espectro e <strong>Drenagem Percutânea do abscesso guiada por imagem</strong> (indicada para coleções &gt; 3 a 4 cm);</li>
    <li>Após resolução completa, como a paciente tem 54 anos (&ge; 40 anos), é <strong>obrigatória a realização de Colonoscopia de intervalo</strong> para afastar neoplasia de ceco, seguida de <strong>apendicectomia de intervalo após 6 a 12 semanas</strong>.</li>
  </ul>
</div>

<div class="book-case">
  <p><strong>Questão 5 (USP-RP / Cirurgia Geral):</strong><br>
  Em relação à profilaxia e terapia antimicrobiana na apendicite aguda, assinale a afirmativa correta:</p>
  
  <p>A) Na apendicite aguda não complicada (fases 1 e 2), a antibioticoprofilaxia com Cefazolina e Metronidazol deve ser iniciada na indução anestésica e mantida por 48 horas após a cirurgia.<br>
  B) Na apendicite aguda não complicada completamente ressecada, a antibioticoprofilaxia restringe-se a uma dose única no perioperatório, não devendo ser mantida no pós-operatório.<br>
  C) Na apendicite perfurada com peritonite purulenta difusa, a antibioticoterapia terapêutica deve ser mantida obrigatoriamente por 14 a 21 dias de internação hospitalar.<br>
  D) O uso de antimicrobianos de amplo espectro dispensa a intervenção cirúrgica mesmo na vigência de peritonite purulenta livre.<br>
  E) A cefazolina em monoterapia é suficiente para profilaxia em apendicite por cobrir com excelência o Bacteroides fragilis.</p>
  
  <h4>Comentário Detalhado:</h4>
  <p><strong>Alternativa Correta: B.</strong></p>
  <ul>
    <li>Em casos de <strong>apendicite não complicada</strong> (catarral e flegmonosa), a recomendação formal das sociedades mundiais de cirurgia (WSES/SIS) é a administração de <strong>DOSE ÚNICA na indução anestésica</strong> (até 60 min antes da incisão). Manter antibióticos no pós-operatório é erro grosseiro que não traz benefícios e seleciona flora resistente;</li>
    <li><em>Erro da A:</em> Não deve ser mantida por 48 horas;</li>
    <li><em>Erro da C:</em> Na apendicite perfurada com controle adequado do foco (estudo STOP-IT), um curso curto de <strong>3 a 5 dias (habitualmente 4 dias)</strong> de antibióticos pós-operatórios é plenamente suficiente e seguro;</li>
    <li><em>Erro da E:</em> A cefazolina é cefalosporina de 1ª geração ativa contra gram-positivos e alguns gram-negativos, mas <em>não possui nenhuma ação contra anaeróbios</em> como o <em>Bacteroides fragilis</em>, exigindo associação com Metronidazol.</li>
  </ul>
</div>

<div class="book-case">
  <p><strong>Questão 6 (IAMSPE / Residência Médica):</strong><br>
  Durante a realização de apendicectomia laparoscópica em um homem de 28 anos com suspeita clínica de apendicite aguda, o cirurgião inspeciona o apêndice cecal e constata que ele está absolutamente normal, desprovido de qualquer sinal macroscópico inflamatório. Diante desse achado intraoperatório, qual deve ser a conduta cirúrgica imediata?</p>
  
  <p>A) Interromper a cirurgia imediatamente, desinsuflar o pneumoperitônio e encaminhar o paciente à enfermaria sem retirar o apêndice.<br>
  B) Realizar a apendicectomia incidental e encerrar o procedimento sem examinar o restante do abdome.<br>
  C) Explorar sistematicamente a cavidade abdominal (especialmente os últimos 100 cm de íleo terminal para pesquisa de divertículo de Meckel e anexos) e realizar a apendicectomia incidental.<br>
  D) Converter imediatamente para laparotomia mediana para realizar hemicolectomia direita profilática.<br>
  E) Coletar apenas lavado peritoneal para citologia oncótica e fechar os portais.</p>
  
  <h4>Comentário Detalhado:</h4>
  <p><strong>Alternativa Correta: C.</strong></p>
  <ul>
    <li>Ao deparar-se com um apêndice cecal macroscopicamente normal, a conduta imperativa é <strong>explorar toda a cavidade abdominal</strong> em busca da causa real da dor: inspecionar o íleo terminal retrogradamente por cerca de 100 cm procurando <strong>Divertículo de Meckel</strong> inflamado ou Doença de Crohn; avaliar linfonodos da raiz mesentérica (linfadenite mesentérica); em mulheres, checar ovários e trompas; e inspecionar vesícula e estômago;</li>
    <li>A realização da <strong>apendicectomia incidental</strong> é a regra recomendada, pois evita confusões diagnósticas futuras em um paciente que ostenta cicatriz de apendicectomia e permite o exame anatomopatológico descartar inflamação intraluminal microscópica incipiente ou tumores carcinoides precoces.</li>
  </ul>
</div>

<div class="book-case">
  <p><strong>Questão 7 (UNICAMP / Cirurgia Oncológica / Residência):</strong><br>
  Mulher de 46 anos é submetida a apendicectomia videolaparoscópica não complicada por apendicite aguda flegmonosa. O laudo anatomopatológico definitivo revela: Tumor Neuroendócrino Bem Diferenciado (antigo Carcinoide) do apêndice cecal, localizado na ponta do apêndice, medindo 0,8 cm no maior diâmetro, grau G1 (Ki-67 &lt; 2%), com margem cirúrgica na base apendicular livre (&gt; 15 mm), sem invasão angiolinfática ou perineural e sem infiltração do mesoapêndice. Qual é a conduta oncológica subsequente preconizada pelas diretrizes internacionais (ENETS / NANETS)?</p>
  
  <p>A) Indicar Hemicolectomia Direita Oncológica com linfadenectomia ileocólica imediata.<br>
  B) Indicar quimioterapia adjuvante sistêmica com capecitabina associada a análogos de somatostatina.<br>
  C) Nenhuma intervenção cirúrgica adicional necessária; a apendicectomia isolada foi curativa.<br>
  D) Realizar colectomia transversa com anastomose primária.<br>
  E) Indicar radioterapia de feixe externo dirigida à fossa ilíaca direita.</p>
  
  <h4>Comentário Detalhado:</h4>
  <p><strong>Alternativa Correta: C.</strong></p>
  <ul>
    <li>O <strong>Tumor Neuroendócrino (TNE / Carcinoide)</strong> é a neoplasia primária mais frequente do apêndice cecal (~60% de todas as neoplasias apendiculares). Localiza-se tipicamente na <em>ponta do apêndice</em> e é um achado incidental em 0,3% a 0,9% das apendicectomias de rotina;</li>
    <li><strong>Critérios de Curabilidade com Apendicectomia Simples:</strong>
      <ul>
        <li>Tamanho tumoral <strong>&lt; 1,0 cm (ou &lt; 2,0 cm sem fatores de alto risco)</strong>;</li>
        <li>Localização na ponta ou corpo com <strong>margem da base cirúrgica livre</strong>;</li>
        <li>Grau histológico G1 com índice proliferativo baixo ($Ki-67 &lt; 2\%$);</li>
        <li>Ausência de invasão do mesoapêndice &gt; 3 mm e sem invasão linfovascular ou perineural;</li>
      </ul>
    </li>
    <li>A paciente preenche todos os critérios de baixo risco com tumor de 0,8 cm e margens amplamente livres. A apendicectomia já realizada foi plenamente <strong>curativa</strong>, não necessitando de reintervenção nem quimioterapia;</li>
    <li><em>Quando indicar Hemicolectomia Direita formal para TNE apendicular?</em> Quando o tumor mede <strong>&gt; 2,0 cm</strong>, quando há comprometimento da base apendicular com margem positiva, invasão profunda do mesoapêndice (&gt; 3 mm), invasão angiolinfática/perineural de alto risco ou histologia de alto grau (G2/G3 ou carcinoma neuroendócrino).</li>
  </ul>
</div>

<div class="book-case">
  <p><strong>Questão 8 (USP / ENARE):</strong><br>
  Criança de 4 anos é trazida pela mãe ao pronto-socorro com febre de 38,5°C, irritabilidade, dor abdominal difusa e recusa alimentar iniciadas há 48 horas. A mãe relata que a criança chorava muito ao sentar ou deambular. Ao exame físico: fácies de dor, hipoativa, taquicárdica (FC 130 bpm). Abdome distendido, com dor difusa e defesa involuntária em quadrante inferior direito. Qual é a principal particularidade anatômica e fisiopatológica da apendicite aguda em crianças menores de 5 anos que justifica a elevada incidência de perfuração precoce nessa faixa etária?</p>
  
  <p>A) Presença de omento maior longo e redundante que bloqueia precocemente o apêndice formando plastrão palpável.<br>
  B) Parede apendicular fina e hipodesenvolvimento do omento maior (epíplon curto), que é incapaz de conter o processo infeccioso, propiciando peritonite difusa rápida.<br>
  C) Ausência completa de folículos linfoides submucosos no apêndice da criança pequena.<br>
  D) Diâmetro intraluminal apendicular extremamente amplo que impede a proliferação bacteriana.<br>
  E) Predomínio absoluto de bactérias anaeróbias estritas desde as primeiras 2 horas de vida.</p>
  
  <h4>Comentário Detalhado:</h4>
  <p><strong>Alternativa Correta: B.</strong></p>
  <ul>
    <li>Em crianças menores de 4 a 5 anos, a taxa de perfuração apendicular atinge alarmantes <strong>50% a 80% dos casos</strong> na admissão hospitalar;</li>
    <li>Os fatores determinantes são:
      <ol>
        <li><strong>Parede apendicular extremamente delgada</strong> que sofre necrose isquêmica e ruptura em prazos muito mais curtos que no adulto;</li>
        <li><strong>Hipodesenvolvimento anatômico do grande omento (epíplon curto e delgado):</strong> O omento da criança pequena não possui comprimento suficiente para alcançar a fossa ilíaca direita e "bloquear" o apêndice perfurado; assim, a ruptura extravasa diretamente para o peritônio livre gerando <strong>peritonite bacteriana generalizada precoce e sepse</strong>;</li>
        <li>Dificuldade de comunicação verbal da criança que retarda o diagnóstico médico inicial.</li>
      </ol>
    </li>
  </ul>
</div>

<div class="book-case">
  <p><strong>Questão 9 (Revalida INEP / Cirurgia Geral):</strong><br>
  Em relação às vias de acesso cirúrgico na apendicite aguda, assinale a alternativa que descreve a INCISÃO DE ROCKEY-DAVIS:</p>
  
  <p>A) Incisão oblíqua na fossa ilíaca direita perpendicular à linha espinoumbilical sobre o ponto de McBurney.<br>
  B) Incisão transversa horizontal na fossa ilíaca direita, cerca de 2 a 3 cm abaixo do umbigo, com divulsão da musculatura da parede abdominal.<br>
  C) Incisão mediana longitudinal estendendo-se do processo xifoide até a sínfise púbica.<br>
  D) Incisão subcostal direita paralela ao rebordo costal para visualização do ligamento falciforme.<br>
  E) Incisão paramediana pararetal interna com secção transversa do músculo reto do abdome.</p>
  
  <h4>Comentário Detalhado:</h4>
  <p><strong>Alternativa Correta: B.</strong></p>
  <ul>
    <li>A <strong>Incisão de Rockey-Davis (ou Davis-Rockey)</strong> é uma <strong>incisão transversa (horizontal)</strong> na fossa ilíaca direita, posicionada sobre o ponto de McBurney, realizada paralelamente às linhas de clivagem natural da pele de Langer, com divulsão das fibras musculares dos músculos oblíquos e transverso do abdome. Oferece excelente visualização e resultado estético superior à incisão oblíqua tradicional;</li>
    <li><em>Erro da A:</em> A incisão oblíqua clássica é a <strong>Incisão de McBurney</strong>;</li>
    <li><em>Erro da C:</em> É a laparotomia mediana ampla xifopúbica;</li>
    <li><em>Erro da D:</em> É a incisão de Kocher (utilizada para vias biliares e fígado).</li>
  </ul>
</div>

<div class="book-case">
  <p><strong>Questão 10 (UNICAMP / Residência Médica):</strong><br>
  Homem de 65 anos apresenta apendicite aguda confirmada por TC e é submetido a apendicectomia. O exame histopatológico da peça cirúrgica revela: Adenocarcinoma do Apêndice Cecal, infiltrativo, moderadamente diferenciado, invadindo a camada muscular própria e subserosa (pT2), com margem cirúrgica na base apendicular microscopicamente comprometida por células neoplásicas. Qual é a conduta cirúrgica e oncológica indicada para este paciente?</p>
  
  <p>A) Alta com seguimento colonoscópico anual sem nova cirurgia.<br>
  B) Reoperação para realização de Hemicolectomia Direita Oncológica com linfadenectomia da cadeia ileocólica.<br>
  C) Radioterapia adjuvante pélvica associada a 5-Fluorouracil sistêmico.<br>
  D) Ressecção em cunha do ceco por videolaparoscopia com margem de 1 cm.<br>
  E) Drenagem percutânea da fossa ilíaca direita e antibioticoterapia por 6 meses.</p>
  
  <h4>Comentário Detalhado:</h4>
  <p><strong>Alternativa Correta: B.</strong></p>
  <ul>
    <li>O <strong>Adenocarcinoma do Apêndice Cecal</strong> é uma neoplasia epitelial maligna agressiva que se comporta biologicamente de forma idêntica ao adenocarcinoma de cólon/ceco;</li>
    <li>Ao contrário do tumor neuroendócrino pequeno (onde a apendicectomia pode ser curativa), <strong>todo adenocarcinoma invasivo do apêndice cecal (pT1 a pT4) ou com margem comprometida EXIGE A REALIZAÇÃO DE HEMICOLECTOMIA DIREITA ONCOLÓGICA FORMAL</strong>;</li>
    <li>A apendicectomia isolada é oncológica e tecnicamente insuficiente, pois não remove a bacia de drenagem linfática ileocólica (risco elevado de metástases linfonodais regionais &gt; 30% a 40%) e deixa margem cirúrgica residual positiva no ceco.</li>
  </ul>
</div>
`
    },
    {
      id: 'pontos-chave-enamed-apendicite',
      title: '14. Pontos de Alto Rendimento e Diretrizes Práticas de Memorização para o ENAMED',
      body_html: `
<h3>Os Dez Mandamentos da Apendicite Aguda para Concursos</h3>
<ul>
  <li><strong>1. Cronologia de Murphy é Regra de Ouro:</strong> Dor visceral periumbilical $\rightarrow$ anorexia absoluta $\rightarrow$ náuseas/vômitos discretos $\rightarrow$ migração para a FID somática contínua em 6 a 12 horas. A dor SEMPRE precede os vômitos.</li>
  <li><strong>2. Causas de Obstrução Luminal por Idade:</strong> Crianças e jovens = hiperplasia linfoide submucosa em 60% (pós-virose respiratória ou diarreica); Adultos e idosos = fecalito/apendicolito em 35%. Acima de 40-50 anos: pensar em neoplasia cecal ou tumor neuroendócrino.</li>
  <li><strong>3. As Quatro Fases Evolutivas:</strong> 1. Edematosa/catarral (dor visceral medial, peritônio íntegro); 2. Flegmonosa/supurada (dor somática na FID, Blumberg positivo); 3. Gangrenosa/necrosante (isquemia arterial, microtrombose, peritonismo franco); 4. Perfurada (alívio fugaz da tensão seguido de peritonite difusa ou abscesso bloqueado).</li>
  <li><strong>4. Sinal de Rovsing:</strong> Compressão retrógrada da fossa ilíaca ESQUERDA gera dor na fossa ilíaca DIREITA por deslocamento aéreo no cólon até o ceco.</li>
  <li><strong>5. Apêndice Retrocecal vs Pélvico:</strong> Retrocecal (65%) = dor lombar/flanco, Blumberg anterior negativo, <strong>Sinal do Psoas positivo</strong> (dor à hiperextensão da coxa); Pélvico = disúria, piúria estéril, tenesmo, <strong>Sinal do Obturador positivo</strong> (dor à rotação interna da coxa flexionada a 90°).</li>
  <li><strong>6. Escore de Alvarado (MANTRELS):</strong> 0-4 descarta (baixo risco); 5-6 observação e imagem (risco intermediário); 7-10 cirurgia indicada (alto risco). Ganham 2 pontos apenas: dor na FID (Tenderness) e leucocitose &gt; 10.000 (Leukocytosis).</li>
  <li><strong>7. Métodos de Imagem:</strong> USG com compressão graduada (diâmetro &gt; 6 mm incompressível, halo periapendicular, apendicolito com sombra acústica) de 1ª linha na criança e gestante; TC com contraste IV padrão-ouro no adulto e idoso; RM sem gadolínio de resgate na gestante.</li>
  <li><strong>8. Laparoscopia é Padrão-Ouro:</strong> Menor dor, menor infecção de ferida e retorno rápido. Superior especialmente em obesos e mulheres em idade fértil.</li>
  <li><strong>9. Plastrão Apendicular (&gt; 5-7 dias):</strong> Tratamento conservador com antibióticos venosos; drenagem percutânea por TC se abscesso &gt; 3 a 4 cm; colonoscopia em &ge; 40 anos para descartar câncer cecal; e <strong>apendicectomia de intervalo eletiva após 6 a 12 semanas</strong>.</li>
  <li><strong>10. Antibióticos:</strong> Dose única pré-operatória de Cefazolina + Metronidazol na apendicite não complicada (NÃO manter no pós-operatório!). Na apendicite complicada perfurada, manter 3 a 5 dias no pós-operatório (Ceftriaxona + Metronidazol).</li>
</ul>
`
    }
  ],
  references: [
    {
      title: 'World Society of Emergency Surgery (WSES) — Jerusalem Guidelines for Diagnosis and Management of Acute Appendicitis',
      url: 'https://wses.biomedcentral.com/articles/10.1186/s13017-020-00306-3'
    },
    {
      title: 'Colégio Brasileiro de Cirurgiões (CBC) — Recomendações e Diretrizes no Manejo da Apendicite Aguda',
      url: 'https://cbc.org.br/'
    },
    {
      title: 'The New England Journal of Medicine (NEJM) — Trial of Short-Course Antimicrobial Therapy for Intraabdominal Infection (STOP-IT Trial)',
      url: 'https://www.nejm.org/doi/full/10.1056/NEJMoa1411162'
    },
    {
      title: 'European Association for Endoscopic Surgery (EAES) — Consensus Development Conference on Laparoscopic Appendectomy',
      url: 'https://eaes.eu/'
    },
    {
      title: 'American College of Radiology (ACR) — ACR Appropriateness Criteria: Suspected Appendicitis',
      url: 'https://www.acr.org/Clinical-Resources/ACR-Appropriateness-Criteria'
    }
  ]
};

const charCount = saveBook(book);
console.log(`[APENDICITE DONE] Total characters: ${charCount}`);
