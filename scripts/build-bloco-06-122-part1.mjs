// scripts/build-bloco-06-122-part1.mjs
// Aula 122: Perfuração de Víscera Oca - Parte 1: Seções 1 a 4

export const sec1 = {
  id: 'etiopatogenia-viscera-oca-ulcera-diverticulite-iatrogenias',
  title: '1. Etiopatogenia do Abdome Agudo Perfurativo: Úlcera Péptica, Diverticulite, Perfurações Traumáticas, Iatrogênicas e Corpos Estranhos',
  body_html: `
<h3>Conceito e Epidemiologia do Abdome Agudo Perfurativo</h3>
<p>O <strong>Abdome Agudo Perfurativo (AAP)</strong> é a síndrome clínica cirúrgica resultante da solução de continuidade e descontinuidade anatômica da parede de qualquer órgão oco do trato gastrointestinal (esôfago, estômago, duodeno, jejuno, íleo, apêndice cecal, cólons ou reto), culminando na liberação súbita ou progressiva de seu conteúdo intraluminal (ar, ácido clorídrico, pepsina, suco biliar, enzimas pancreáticas, restos alimentares, fezes e bactérias) para a cavidade peritoneal livre ou para o espaço retroperitoneal. Responde por cerca de <strong>10% a 15% de todos os atendimentos por abdome agudo cirúrgico</strong> nas salas de emergência mundiais, apresentando potencial de letalidade fulminante quando o reconhecimento e a abordagem operatória são postergados.</p>

<h3>Principais Etiologias e Fatores de Risco no Adulto e Idoso</h3>
<p>A etiopatogenia da perfuração gastrointestinal varia de acordo com o segmento anatômico afetado e a idade do paciente:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Etiologia Específica</th>
      <th>Segmento Anatômico Mais Comum</th>
      <th>Fisiopatologia e Mecanismo da Perfuração</th>
      <th>Perfil Clínico e Fatores Precipitantes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Úlcera Péptica Perfurada (Gastroduodenal)</strong></td>
      <td><strong>Parede Anterior da Primeira Porção do Duodeno (Bulbo Duodenal)</strong> (60% a 70%) e Pequena Curvatura Gástrica (Pré-pilórica/Antro) (30% a 40%).</td>
      <td>A inflamação crônica e a necrose péptica transmural erodem progressivamente a muscular própria e a serosa. Na parede anterior, como não há órgãos retroperitoneais aderidos, a perfuração abre-se <strong>diretamente para a grande cavidade peritoneal livre</strong>.</td>
      <td>Historicamente associada à infecção crônica por <em>Helicobacter pylori</em> e, contemporaneamente, ao <strong>uso abusivo de Anti-inflamatórios Não Esteroidais (AINEs, incluindo AAS e inibidores seletivos de COX-2)</strong>, tabagismo, etilismo e estresse metabólico grave (Úlceras de Curling em queimados graves e Úlceras de Cushing em traumatismos cranioencefálicos).</td>
    </tr>
    <tr>
      <td><strong>Diverticulite Cólica Perfurada</strong></td>
      <td><strong>Cólon Sigmoide</strong> (mais de 90% a 95% dos casos).</td>
      <td>Abrasão por fecalito endurecido, isquemia focal da vasa recta sobre o fundo do pseudodivertículo e micro/macroperfuração transmural com saída de ar e fezes para o mesocólon ou peritônio livre (Hinchey III e IV).</td>
      <td>Adultos idosos (&gt; 60 anos), constipados crônicos, obesos e imunossuprimidos sob uso de corticosteroides ou imunobiológicos.</td>
    </tr>
    <tr>
      <td><strong>Neoplasias Gastrointestinais Perfuradas</strong></td>
      <td>Adenocarcinoma de Cólon (sigmoide/ceco) e Adenocarcinoma Gástrico avançado.</td>
      <td>Necrose tumoral central por descompasso entre angiogênese e crescimento tumoral rápido, ou <strong>perfuração à montante (perfuração do ceco por hiperdistensão mecânica em alça fechada provocada por tumor obstrutivo de sigmoide com válvula ileocecal continente)</strong>.</td>
      <td>Pacientes idosos com perda ponderal prévia, anemia ferropriva inexplicada e astenia.</td>
    </tr>
    <tr>
      <td><strong>Perfurações Iatrogênicas em Procedimentos Endoscópicos</strong></td>
      <td>Cólon sigmoide/reto (na Colonoscopia) e Duodeno peripapilar / ducto biliar (na CPRE).</td>
      <td>Barotrauma por insuflação excessiva de ar, trauma mecânico direto pela ponta do aparelho endoscópico, ou perfuração térmica/elétrica durante <strong>polipectomias complexas, mucosectomias (EMR) e dissecções submucosas (ESD)</strong>. Na CPRE, a papilotomia térmica pode lacerar o duodeno retroperitoneal (Classificação de Stapfer tipos I a IV).</td>
      <td>Procedimentos terapêuticos avançados, cólon com aderências prévias ou divertículos espásticos e estenoses inflamatórias.</td>
    </tr>
    <tr>
      <td><strong>Ingestão de Corpos Estranhos</strong></td>
      <td><strong>Íleo Terminal e Válvula Ileocecal</strong>, seguido pelo ângulo duodenojejunal (Treitz) e flexura retossigmoide.</td>
      <td>Espinhas de peixe, ossos finos de aves, palitos de dente, baterias botão (necrose por queimadura cáustica e liquefação química) e fragmentos de próteses dentárias que impactam nas zonas de estreitamento luminal fisiológico e perfuram a parede por erosão de contato.</td>
      <td>Usuários de próteses dentárias (perda da sensibilidade tátil palatina), crianças, idosos desdentados, etilistas e portadores de transtornos psiquiátricos.</td>
    </tr>
    <tr>
      <td><strong>Perfuração Traumática (Trauma Abdominal Fechado ou Penetrante)</strong></td>
      <td>Jejuno proximal e íleo terminal (no trauma fechado por desaceleração); qualquer víscera no trauma penetrante (arma branca / projétil de arma de fogo).</td>
      <td>No trauma fechado (acidentes automobilísticos com cinto de segurança de dois pontos - "sinal do cinto de segurança"), ocorre esmagamento da alça contra a coluna lombar ou rotura por hiperpressão hidráulica súbita em alça fechada.</td>
      <td>Politraumatizados com dor abdominal progressiva e íleo pós-traumático.</td>
    </tr>
    <tr>
      <td><strong>Síndrome de Boerhaave (Rotura Esofágica Espontânea)</strong></td>
      <td>Terço distal do esôfago intratorácico, 2 a 3 cm acima da junção esofagogástrica na <strong>parede póstero-lateral esquerda</strong>.</td>
      <td>Aumento hiperagudo e catastrófico da pressão intraluminal esofágica durante esforços violentos de vômito contra a glote e o cricofaríngeo fechados. Cursa com contaminação mediastinal maciça (mediastinite química e bacteriana fulminante), enfisema subcutâneo cervical e choque séptico.</td>
      <td>Etilistas pesados após libação alimentar e alcoólica excessiva (Tríade clássica de Mackler: vômitos violentos + dor torácica retroesternal lancinante + enfisema subcutâneo).</td>
    </tr>
  </tbody>
</table>
`
};

export const sec2 = {
  id: 'fisiopatologia-peritonite-quimica-para-bacteriana-choque',
  title: '2. Fisiopatologia da Peritonite: A Transição da Fase Química para a Fase Bacteriana e o Choque Séptico',
  body_html: `
<h3>A Membrana Peritoneal e sua Resposta Inflamatória Dinâmica</h3>
<p>O peritônio é uma membrana serosa contínua e bidimensional com área de superfície equivalente à superfície corporal humana total (cerca de <strong>1,7 a 2,0 m²</strong>), composta por uma monocamada de células mesoteliais sobreposta a uma rica matriz de tecido conjuntivo frouxo contendo densas redes de capilares sanguíneos e linfáticos. Essa vasta superfície atua como uma barreira semipermeável para troca de fluidos e defesa imunológica contra patógenos. Quando ocorre a perfuração de uma víscera oca, a resposta inflamatória peritoneal deflagra-se em duas fases cronológicas e biológicas bem delimitadas:</p>

<h3>1. Fase Precoce: A Peritonite Química Aéptica (Primeiras 6 a 12 horas)</h3>
<p>Nos momentos iniciais após a perfuração de vísceras do trato gastrointestinal alto (estômago e duodeno proximal), o conteúdo derramado na cavidade peritoneal consiste predominantemente em <strong>ácido clorídrico puro (pH entre 1,0 e 2,0), pepsina gástrica ativa, bile e suco pancreático</strong>:</p>
<ul>
  <li><strong>Baixa Carga Bacteriana Inicial:</strong> Sob condições de acidez gástrica normal íntegra, o estômago e o duodeno são cavidades praticamente estéreis ou albergam uma microbiota transitória mínima ($&lt; 10³$ UFC/mL, composta por estreptococos e lactobacilos orais);</li>
  <li><strong>Queimadura Química Peritoneal Maciça:</strong> O contato direto do ácido clorídrico concentrado com o peritônio parietal e visceral deflagra uma intensa <strong>queimadura química e necrose coagulativa das células mesoteliais</strong>;</li>
  <li><strong>O Espasmo Muscular Reflexo (O "Abdome em Tábua"):</strong> A estimulação nociceptiva extrema das terminações nervosas livres somáticas dos nervos intercostais inferiores (T7 a T12) que inervam o peritônio parietal anterior deflagra um arco reflexo motor espinhal involuntário de contração tetânica contínua da musculatura dos músculos retos abdominais, oblíquos e transverso. O abdome torna-se pétreo, rígido e totalmente imóvel à palpação — o clássico <strong>"Abdome em Tábua" (Ventre de Madeira)</strong>;</li>
  <li><strong>Vasodilatação e Formação Maciça de Terceiro Espaço:</strong> A liberação local de histamina, bradicinina, substância P e prostaglandinas promove vasodilatação capilar peritoneal monumental com aumento brutal da permeabilidade microvascular. Litros de líquido rico em proteínas e eletrólitos extravasam do plasma para a cavidade peritoneal (ascite inflamatória exsudativa), levando à hipovolemia intravascular e hemoconcentração precoces.</li>
</ul>

<h3>2. Fase Tardia: A Peritonite Bacteriana e o Choque Séptico (Após 12 a 24 horas)</h3>
<p>Se a perfuração ocorrer em víscera distal rica em bactérias (como cólon sigmoide ou apêndice cecal), a peritonite é <strong>bacteriana polimicrobiana desde o primeiro minuto</strong>. Já na úlcera péptica alta, após 12 a 24 horas de perfuração, ocorre colonização bacteriana secundária maciça da cavidade:</p>
<ol>
  <li><strong>Proliferação Bacteriana Exponencial e Sinergismo Polimicrobiano:</strong>
    <ul>
      <li>Inicialmente proliferam os aeróbios facultativos (<em>Escherichia coli</em>, <em>Klebsiella</em>, <em>Enterobacter</em>), que consomem avidamente o oxigênio residual nos recessos peritoneais e diminuem o potencial de oxirredução tecidual;</li>
      <li>A hipóxia local permite a proliferação descontrolada dos anaeróbios estritos virulentos, com destaque absoluto para o <strong>Bacteroides fragilis</strong>;</li>
      <li>O <em>B. fragilis</em> possui uma cápsula polissacarídica complexa que inibe a fagocitose neutrofílica e promove a formação de <strong>depósitos de fibrina densos e abscessos intra-abdominais secundários</strong>;</li>
    </ul>
  </li>
  <li><strong>Paralisia do Trânsito e Íleo Paralítico Reflexo:</strong> A inflamação estende-se à túnica muscular própria das alças intestinais, inibindo os plexos mioentéricos autonômicos. Ocorre cessação do peristaltismo (íleo adinâmico generalizado) com distensão passiva de alças por gás e líquido;</li>
  <li><strong>Translocação para a Circulação Sistêmica e Choque Séptico:</strong> A via linfática transdiafragmática (estômatos peritoneais do diafragma) absorve bactérias e endotoxinas diretamente para o ducto torácico e circulação sanguínea. A cascata de citocinas inflamatórias sistêmicas (TNF-$\alpha$, IL-1, IL-6 e óxido nítrico sintase induzível - iNOS) provoca vasodilatação arteriolar sistêmica generalizada, colapso da resistência vascular periférica, disfunção miocárdica e choque séptico distributivo hiperlactatêmico refratário.</li>
</ol>
`
};

export const sec3 = {
  id: 'quadro-clinico-semiologia-sinal-jobert-sindrome-peritonite',
  title: '3. Quadro Clínico e Semiologia Física: A Dor Súbita, O Abdome em Tábua e o Sinal de Jobert',
  body_html: `
<h3>Cronologia Clínica e Semiologia da Perfuração Aguda</h3>
<p>O quadro clínico clássico do abdome agudo perfurativo instala-se como um evento dramático, onde o paciente é capaz de relatar o minuto exato em que a catástrofe se iniciou:</p>
<ul>
  <li><strong>Início Hiperagudo e em "Facada":</strong> O sintoma inicial em mais de 90% dos casos de úlcera péptica perfurada é uma <strong>dor abdominal súbita, de intensidade lancinante, comparada pelo paciente a um "golpe de punhal" ou "facada"</strong> no epigástrio, que rapidamente irradia-se para o hipocôndrio direito e desce pela goteira parietocólica direita em direção à fossa ilíaca direita (simulando apendicite aguda pelo escorrimento de suco gástrico ácido);</li>
  <li><strong>Atitude Antálgica Imóvel:</strong> Diferentemente do paciente com cólica nefrética ou obstrução intestinal inicial (que se contorce e não encontra posição de alívio na maca), <strong>o paciente com peritonite perfurativa permanece imóvel em decúbito dorsal, com os membros inferiores fletidos e respiração superficial exclusivamente torácica</strong>, pois qualquer mínimo movimento da parede abdominal ou contração do diafragma intensifica desesperadamente o atrito das alças inflamadas contra o peritônio parietal;</li>
  <li><strong>Fácies Hipocrática e Sinais de Toxemia Tardia:</strong> Olhos encovados, palidez cutânea acinzentada, sudorese fria e cianose periférica.</li>
</ul>

<h3>A Semiologia Física Mestra da Perfuração: O Sinal de Jobert</h3>
<p>O exame físico da região tóraco-abdominal fornece os sinais semiológicos cardinais consagrados nas bancas de residência:</p>

<div class="formula-box">
  <p><strong>O SINAL DE JOBERT (PNEUMOPERITÔNIO À PERCUSSÃO HEPÁTICA):</strong></p>
  <ul>
    <li><strong>Definição e Manobra Semiológica:</strong> Realiza-se a percussão dígito-digital metódica de cima para baixo ao longo da linha hemiclavicular direita e linha axilar anterior direita, desde o 4º espaço intercostal até a borda costal inferior;</li>
    <li><strong>Achado Fisiológico Normal:</strong> Em indivíduos saudáveis, a percussão sobre o fígado revela <strong>macicez hepática</strong> (som maciço absoluto entre o 5º ou 6º espaço intercostal e a borda costal direita);</li>
    <li><strong>O Achado Positivo (Sinal de Jobert Positivo):</strong> Ocorre o <strong>desaparecimento da macicez hepática, que é substituída por TIMPANISMO à percussão da área de projeção do lobo hepático direito</strong>;</li>
    <li><strong>Significado Fisiopatológico:</strong> O ar ou gás intraluminal extravasado da víscera perfurada é menos denso que as vísceras sólidas e sobe para o ponto mais alto do abdome sob decúbito dorsal ou semi-ortostase, interpondo-se entre a face diafragmática do fígado e a parede torácica anterior. <strong>O Sinal de Jobert é PATOGNOMÔNICO DE PNEUMOPERITÔNIO</strong>;</li>
    <li><strong>O Diagnóstico Diferencial Semiológico: O Sinal de Chilaiditi:</strong> Consiste na <em>interposição anatômica congênita ou adquirida do cólon transverso (ou alça de intestino delgado) entre o fígado e a hemicúpula diafragmática direita</em>. Pode gerar falso Sinal de Jobert positivo em indivíduos assintomáticos (Síndrome de Chilaiditi quando associada a sintomas obstrutivos/dor). A tomografia computadorizada diferencia facilmente as duas condições ao demonstrar as haustrações cólicas no ar interposto.</li>
  </ul>
</div>

<h3>Outros Sinais Físicos Clássicos de Peritonite e Perfuração</h3>
<table class="book-table">
  <thead>
    <tr>
      <th>Sinal Semiológico</th>
      <th>Manobra e Definição Física</th>
      <th>Significado Clínico</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Sinal de Blumberg Generalizado</strong></td>
      <td>Descompressão brusca dolorosa difusa e intensamente positiva em todos os quadrantes do abdome.</td>
      <td>Indica inflamação do peritônio parietal somático (peritonite generalizada ativa).</td>
    </tr>
    <tr>
      <td><strong>Sinal do Ventre em Tábua</strong></td>
      <td>Rigidez e hipertonia muscular involuntária permanente da parede abdominal que impede a palpação profunda.</td>
      <td>Espasmo reflexo espinhal protetor contra a queimadura química/bacteriana peritoneal.</td>
    </tr>
    <tr>
      <td><strong>Grito de Douglas (Sinal de Proust)</strong></td>
      <td>Dor excruciante referida pelo paciente ao toque retal ou vaginal durante a palpação do fundo de saco de Douglas.</td>
      <td>Indica presença de líquido inflamatório ácido, sangue ou pus acumulado no ponto mais declive da cavidade peritoneal.</td>
    </tr>
    <tr>
      <td><strong>Sinal de Mondor</strong></td>
      <td>Presença de distensão abdominal progressiva com empastamento profundo na peritonite tardia.</td>
      <td>Reflete o íleo adinâmico generalizado pós-perfurativo com líquido livre volumoso.</td>
    </tr>
  </tbody>
</table>
`
};

export const sec4 = {
  id: 'propedutica-imagem-rotina-abdome-agudo-sinais-radiograficos-tc',
  title: '4. Propedêutica Armada: Rotina Radiológica de Abdome Agudo e Sinais Tomográficos (Pneumoperitônio, Rigler e Ligamento Falciforme)',
  body_html: `
<h3>A Rotina Radiológica Clássica de Abdome Agudo</h3>
<p>A investigação armada do paciente com suspeita de abdome agudo perfurativo inicia-se pela clássica <strong>Rotina Radiológica de Abdome Agudo (Três Incidências Radiográficas Básicas)</strong>:</p>
<ol>
  <li><strong>Radiografia de Tórax em Posição Ortostática (PA):</strong> É o exame radiológico simples <strong>mais sensível de todos para a detecção de pneumoperitônio</strong> (capaz de detectar volumes mínimos de apenas <strong>1 a 2 mL de ar livre</strong> na cavidade). Em ortostase, o gás sobe e desenha uma meia-lua radiotransparente (preta) curvilínea logo abaixo da hemicúpula diafragmática (predominantemente à direita, separando o diafragma da borda superior do fígado);</li>
  <li><strong>Radiografia Simples de Abdome em Posição Ortostática (AP em Pé):</strong> Demonstra níveis hidroaéreos e ar subdiafragmático;</li>
  <li><strong>Radiografia Simples de Abdome em Decúbito Dorsal (AP Deitado):</strong> Avalia distribuição gasosa, espessamento de alças e sinais radiográficos específicos de grandes pneumoperitônios.</li>
</ol>

<p><strong>A Conduta Quando o Paciente Não Consegue Ficar em Pé (Idosos, Chocados ou Comatosos):</strong></p>
<div class="formula-box">
  <p><strong>Incidência Radiológica Alternativa Mandatória:</strong></p>
  <p>Se o paciente estiver gravemente instável, acamado ou impossibilitado de adotar a posição ortostática por mais de 5 a 10 minutos, a radiografia de tórax em pé torna-se inviável. Nessa circunstância de prova, deve-se realizar obrigatoriamente a <strong>Radiografia de Abdome em Decúbito Lateral Esquerdo com Raios Horizontais (Incidência de Hjelm-Laurell)</strong>.</p>
  <p><em>Racional Anatômico:</em> O paciente fica em decúbito sobre o lado esquerdo; o ar livre peritoneal sobe e projeta-se entre a <strong>borda lateral do fígado e a parede lateral direita do abdome</strong>, contrastando o gás radiotransparente escuro contra a densidade homogênea do fígado, sem confusão com a câmara de gás gástrica.</p>
</div>

<h3>Sinais Radiográficos Específicos de Pneumoperitônio na Radiografia em Decúbito Dorsal</h3>
<p>Quando a radiografia é realizada com o paciente deitado em decúbito dorsal, o ar não se aloja sob o diafragma, mas distribui-se anteriormente sob a parede abdominal, gerando sinais radiológicos clássicos frequentemente cobrados em concursos:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Sinal Radiográfico</th>
      <th>Descrição Radiológica</th>
      <th>Mecanismo Fisiopatológico Subjacente</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Sinal de Rigler (Sinal da Dupla Parede)</strong></td>
      <td>Visualização nítida e simultânea tanto da <strong>superfície interna da mucosa quanto da superfície externa serosa</strong> da parede da alça intestinal.</td>
      <td>Em condições normais, apenas o ar no interior do lúmen contrasta a mucosa; na presença de pneumoperitônio volumoso, há ar dentro e fora da alça, tornando a fina espessura da parede da alça visível como uma linha branca contrastada por ar de ambos os lados.</td>
    </tr>
    <tr>
      <td><strong>Sinal do Ligamento Falciforme</strong></td>
      <td>Visualização de uma faixa linear densa vertical radiopaca no quadrante superior direito do abdome, paralela à coluna vertebral.</td>
      <td>O ar livre intraperitoneal em ambos os lados do ligamento falciforme hepático contrasta e torna visível a prega peritoneal do ligamento (normalmente invisível).</td>
    </tr>
    <tr>
      <td><strong>Sinal da Bola de Futebol Americano (Football Sign)</strong></td>
      <td>Grande área radiotransparente ovalada contínua que ocupa todo o centro da cavidade abdominal em formato de bola de rugby ou futebol americano.</td>
      <td>Pneumoperitônio maciço volumoso acumulado na cavidade anterior sob a parede abdominal em decúbito dorsal (mais comum em neonatos com enterocolite necrosante perfurada ou rotura gástrica).</td>
    </tr>
    <tr>
      <td><strong>Sinal do Triângulo (Sinal de Miller)</strong></td>
      <td>Pequena coleção triangular de gás radiotransparente delimitada entre três alças intestinais adjacentes ou entre alças e a parede abdominal.</td>
      <td>Gás livre extraluminal aprisionado no espaço virtual interalças.</td>
    </tr>
    <tr>
      <td><strong>Sinal do V Invertido (Ligamentos Umbilicais Laterais)</strong></td>
      <td>Delineamento das artérias umbilicais obliteradas no hipogástrio formando um "V" invertido contrastado pelo ar livre na pelve.</td>
      <td>Grande acúmulo de gás extraluminal na cavidade pélvica peritoneal.</td>
    </tr>
  </tbody>
</table>

<h3>Tomografia Computadorizada (TC) de Abdome e Pelve com Contraste IV: O Padrão-Ouro</h3>
<p>Embora a presença de pneumoperitônio evidente na radiografia simples associada a peritonite em tábua seja suficiente para indicar laparotomia imediata em pacientes instáveis, a <strong>Tomografia Computadorizada multislice</strong> é o <strong>padrão-ouro diagnóstico para identificar a topografia exata da perfuração e sua etiologia</strong> (sensibilidade superior a 98% a 100%):</p>
<ul>
  <li>Detecta micro-volumes de gás extraluminal imperceptíveis na radiografia simples (tão diminutos quanto 0,5 mL);</li>
  <li>Identifica a <strong>descontinuidade focal da parede da víscera</strong> (o ponto exato do orifício perfurativo no bulbo duodenal, antro gástrico ou sigmoide);</li>
  <li>Diferencia perfuração intraperitoneal livre de <strong>perfuração retroperitoneal bloqueada</strong> (ex.: úlcera de parede posterior do duodeno ou diverticulite de cólon ascendente/descendente com gás dissecando na fáscia de Gerota e espaço pararrenal);</li>
  <li>Permite o diagnóstico diferencial com outras causas graves de abdome agudo (pancreatite aguda necrosante, isquemia mesentérica e rotura de aneurisma de aorta abdominal).</li>
</ul>
`
};
