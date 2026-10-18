import { saveBook } from './bloco-04-utils.mjs';

const book = {
  slug: 'coledocolitiase-e-colangite',
  title: 'Coledocolitíase e Colangite',
  area: 'Cirurgia Geral',
  materia: 'Cirurgia do Aparelho Digestivo e Vias Biliares',
  description: 'Tratado completo de Coledocolitíase e Colangite Aguda Infecciosa para concursos de Residência Médica e ENAMED: anatomia cirúrgica da via biliar extra-hepática e dinâmica pressórica do esfíncter de Oddi; etiopatogenia dos cálculos do colédoco (secundários em > 90% vs primários de novo formados por estase e infecção bacteriana por beta-glicuronidase); quadro clínico clássico de icterícia colestática flutuante com colúria, acolia e prurido; critérios e algoritmo de estratificação de risco de coledocolitíase da ASGE/SAGES (alto risco para CPRE direta, risco intermediário para CPRM/EUS/colangiografia intraoperatória, e baixo risco para colecistectomia direta); fisiopatologia da colangite bacteriana sob hiperpressão biliar e translocação biliovenosa/biliolinfática; semiologia da Tríade de Charcot (dor em QSD, febre com calafrios e icterícia) e da Pêntade de Reynolds na colangite tóxica supurativa (Charcot + choque séptico + confusão mental); microbiologia entérica (E. coli, Klebsiella, Enterococcus, anaeróbios); critérios diagnósticos e estratificação de gravidade pelas Diretrizes de Tóquio (TG18/TG20); terapia antimicrobiana parenteral de amplo espectro; descompressão biliar de urgência imediata por CPRE com papilotomia/prótese biliar vs drenagem percutânea trans-hepática (DTP); cirurgia em tempo único vs dois tempos com colangiografia intraoperatória e dreno de Kehr; 4 casos clínicos estruturados e questões comentadas na íntegra.',
  sections: [
    {
      id: 'anatomia-e-dinamica-pressorica-biliar',
      title: '1. Anatomia da Via Biliar Principal, Fisiologia da Secreção Biliar e Pressões Intraductais',
      body_html: `
<h3>Anatomia Cirúrgica da Via Biliar Extra-Hepática</h3>
<p>O sistema biliar extra-hepático é constituído pela confluência dos ductos hepáticos direito e esquerdo na base do lobo hepático direito (hilo hepático ou placa hilar), formando o <strong>ducto hepático comum</strong>. O ducto hepático comum desce pelo ligamento hepatoduodenal (borda livre do omento menor) por cerca de 2 a 4 cm até receber a confluência do ducto cístico na sua borda lateral direita, passando a ser denominado <strong>ducto colédoco</strong> (ou ducto biliar comum).</p>
<p>O colédoco apresenta comprimento médio entre 7 e 10 cm e diâmetro luminal fisiológico normal de até <strong>5 a 6 mm</strong> em adultos jovens saudáveis. Didaticamente e cirurgicamente, subdivide-se em quatro porções anatômicas:</p>
<ol>
  <li><strong>Porção Supraduodenal:</strong> Trafega no interior da borda livre do ligamento hepatoduodenal, situando-se <em>anteriormente e à direita</em> em relação à veia porta (que se localiza posteriormente) e à direita da artéria hepática própria (que se situa anterior e à esquerda). É a porção mais facilmente acessível para exploração cirúrgica laparoscópica ou aberta (coledocotomia);</li>
  <li><strong>Porção Retroduodenal:</strong> Cruza posteriormente a primeira porção do duodeno, situando-se à direita da artéria gastroduodenal;</li>
  <li><strong>Porção Intrapancreática:</strong> Mergulha em um sulco ou túnel parenquimatoso na face posterior da cabeça do pâncreas;</li>
  <li><strong>Porção Intramural (Ampolar):</strong> Atravessa obliquamente a parede muscular posteromedial da segunda porção do duodeno, unindo-se em cerca de 80% dos indivíduos ao ducto pancreático principal (ducto de Wirsung) para formar a <strong>Ampola Hepatopancreática de Vater</strong>, que se projeta para o lúmen duodenal na papila duodenal maior.</li>
</ol>

<h3>O Complexo Esfincteriano de Oddi e a Fisiologia Pressórica</h3>
<p>A extremidade distal do colédoco, do ducto de Wirsung e da ampola de Vater é circundada por um anel muscular liso especializado denominado <strong>Esfíncter de Oddi</strong>. Em condições fisiológicas basais interdigestivas (em jejum):</p>
<ul>
  <li>O esfíncter de Oddi mantém uma zona de alta pressão basal de repouso entre <strong>10 e 15 mmHg (15 a 20 cm$H_2O$)</strong>, gerando ondas peristálticas reflexas intermitentes que impedem ativamente o refluxo retrógrado do conteúdo duodenal bacteriano para o interior da árvore biliar estéril;</li>
  <li>A pressão normal no interior do ducto colédoco oscila entre <strong>8 e 12 cm$H_2O$</strong>. A taxa máxima de pressão de secreção hepática contínua de bile pelos hepatócitos atinge aproximadamente <strong>25 a 30 cm$H_2O$</strong>;</li>
  <li>Quando ocorre uma obstrução mecânica aguda na luz do colédoco (ex: cálculo impactado na papila de Vater), a secreção biliar contínua eleva rapidamente a pressão intraductal. Quando a pressão excede o limite crítico de <strong>20 a 25 cm$H_2O$</strong>, a secreção de bile pelo hepatócito é completamente bloqueada e as junções de oclusão entre os canalículos biliares e os sinusoides hepáticos tornam-se permeáveis, iniciando a translocação retrógrada maciça de bile e bactérias para a circulação sistêmica.</li>
</ul>
`
    },
    {
      id: 'etiopatogenia-coledocolitiase-primaria-vs-secundaria',
      title: '2. Etiopatogenia da Coledocolitíase: Cálculos Secundários vs Cálculos Primários de Novo',
      body_html: `
<h3>Definição e Magnitude Clínica</h3>
<p>A <strong>coledocolitíase</strong> define-se como a presença de um ou múltiplos cálculos no interior da árvore biliar principal (ducto hepático comum ou colédoco). Constitui a principal causa de icterícia obstrutiva benigna no mundo e a complicação mais prevalente da colelitíase, acometendo entre <strong>10% e 15% de todos os pacientes portadores de cálculos na vesícula biliar</strong>. A sua distinção etiopatogênica entre cálculos secundários e primários é imperiosa para definir a estratégia terapêutica e o risco de recidiva:</p>

<h3>1. Cálculos Secundários (Mais de 90% dos Casos no Ocidente)</h3>
<ul>
  <li><strong>Mecanismo Patogênico:</strong> Os cálculos formam-se <em>originalmente no interior da vesícula biliar</em> (geralmente cálculos de colesterol ou mistos) e migram passivamente através de um ducto cístico complacente e calibroso até alcançarem a luz do colédoco, onde impactam ou continuam crescendo por aposição de bilirrubinato de cálcio;</li>
  <li><strong>Perfil Clínico:</strong> Pacientes com vesícula biliar intacta (<em>in situ</em>) contendo cálculos ecograficamente idênticos aos encontrados no colédoco;</li>
  <li><strong>Conduta Obrigatória:</strong> A remoção do cálculo do colédoco (via endoscópica ou cirúrgica) <strong>DEVE SER SEGUIDA OBRIGATORIAMENTE PELA COLECISTECTOMIA</strong>. Se a vesícula litiásica for mantida, a taxa de recorrência de migração de novos cálculos e novos episódios de colangite ou pancreatite biliar atinge mais de 30% a 50% em 1 a 2 anos.</li>
</ul>

<h3>2. Cálculos Primários de Novo (Menos de 5% a 10% dos Casos)</h3>
<ul>
  <li><strong>Mecanismo Patogênico:</strong> Os cálculos formam-se <em>diretamente ("de novo") no interior dos ductos biliares intra ou extra-hepáticos</em>, independentemente da vesícula biliar (frequentemente diagnosticados anos ou décadas após uma colecistectomia prévia);</li>
  <li><strong>Composição Química:</strong> São invariavelmente <strong>cálculos pigmentares castanhos (brown pigment stones)</strong>, constituídos por bilirrubinato de cálcio amorfo, sais de palmitato e estearato e restos bacterianos, exibindo consistência macia, terrosa e quebradiça ("lama/barro biliar ductal");</li>
  <li><strong>Fatores Fisiopatológicos Determinantes:</strong> A litogênese primária do colédoco exige uma tríade patogênica indispensável:
    <ol>
      <li><strong>Estase Biliar Crônica e Hipomotilidade:</strong> Decorrente de estenose cicatricial benigna da via biliar, estenose do esfíncter de Oddi (papilite estenosante crônica), dilatações congênitas císticas da via biliar (Cistos de Colédoco / Doença de Caroli) ou divertículos periampolares duodenais (Divertículo de Lemmel com compressão extrínseca do colédoco terminal);</li>
      <li><strong>Infecção / Colonização Bacteriana Crônica da Bile:</strong> Presença de bactérias entéricas aeróbias e anaeróbias produtoras da enzima <strong>beta-glicuronidase bacteriana</strong> (como <em>Escherichia coli</em> e <em>Klebsiella</em>) e fosfolipases. A beta-glicuronidase hidrolisa a bilirrubina conjugada (glicuronídeo de bilirrubina), liberando bilirrubina livre não conjugada que se precipita instantaneamente com íons de cálcio;</li>
      <li><strong>Infestações Parasitárias Endêmicas:</strong> Acometimento por <em>Clonorchis sinensis</em>, <em>Opisthorchis viverrini</em> ou migração errática de <em>Ascaris lumbricoides</em> adulto para dentro do colédoco, cujos ovos e corpos celulares formam o ninho central de nucleação do cálculo.</li>
    </ol>
  </li>
  <li><strong>Conduta Específica:</strong> O tratamento não se limita à extração do cálculo, mas exige a correção anatômica da estase biliar subjacente (esfincterotomia endoscópica ampla ou derivação biliodigestiva cirúrgica como a Coledocoduodenostomia ou Hepaticojejunostomia em Y de Roux).</li>
</ul>

<h3>Cálculo Residual vs Cálculo Recidivante (Critério Temporal Pós-Colecistectomia)</h3>
<p>Em pacientes que já foram submetidos previamente à colecistectomia e desenvolvem coledocolitíase sintomática tardia:</p>
<ul>
  <li><strong>Cálculo Retido ou Residual:</strong> Cálculo diagnosticado em até <strong>menos de 2 anos</strong> da data da cirurgia vesicular original. Trata-se de um cálculo que já existia no colédoco no momento da operação original e passou despercebido por omissão ou ausência de colangiografia intraoperatória;</li>
  <li><strong>Cálculo Recidivante ou Primário:</strong> Cálculo diagnosticado <strong>após 2 anos</strong> da colecistectomia prévia (frequentemente 5 a 15 anos depois). Trata-se de cálculo pigmentar castanho formado <em>de novo</em> na via biliar por estase e infecção bacteriana secundária.</li>
</ul>
`
    },
    {
      id: 'manifestacoes-clinicas-ictericia-flutuante',
      title: '3. Manifestações Clínicas da Coledocolitíase Não Complicada: O Perfil da Icterícia Flutuante',
      body_html: `
<h3>O Espectro Clínico da Coledocolitíase</h3>
<p>O quadro clínico da coledocolitíase não complicada é extremamente heterogêneo. Cerca de um terço dos pacientes permanece completamente oligossintomático ou assintomático, com o cálculo descoberto incidentalmente durante investigação de enzimas hepáticas alteradas ou na colangiografia intraoperatória durante uma colecistectomia de rotina. Nos pacientes sintomáticos, manifesta-se a clássica <strong>Síndrome Colestática Obstrutiva Benigna</strong>:</p>

<h3>O Mecanismo da "Icterícia Flutuante" (Válvula de Esfera de Fenger)</h3>
<p>A marca semiológica mais característica e cobrada em provas de residência que diferencia a coledocolitíase das neoplasias periampolares malignas (câncer de cabeça de pâncreas, colangiocarcinoma distal e ampuloma) é o comportamento temporal da icterícia:</p>
<table class="book-table">
  <thead>
    <tr>
      <th>Parâmetro de Diferenciação</th>
      <th>Coledocolitíase Benigna (Cálculo no Colédoco)</th>
      <th>Neoplasia Periampolar Maligna (Câncer de Pâncreas)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Comportamento da Icterícia</strong></td>
      <td><strong>Icterícia Flutuante (Intermitente):</strong> A icterícia tem períodos de piora e melhora espontânea. O paciente relata que os olhos ficaram amarelos por alguns dias, depois clarearam, e voltaram a amarelar.</td>
      <td><strong>Icterícia Colestática Progressiva e Implacável:</strong> Piora contínua, verde-escura ou rubínica, sem períodos de melhora espontânea.</td>
    </tr>
    <tr>
      <td><strong>Fisiopatologia do Padrão da Icterícia</strong></td>
      <td><strong>Efeito de Válvula de Esfera (Ball-valve de Fenger):</strong> O cálculo móvel impacta na papila duodenal estreita, bloqueia o fluxo biliar e eleva a pressão intraductal; a hipertensão biliar dilata o colédoco distal, fazendo com que o cálculo "flutue" e descole temporariamente da papila, permitindo a descompressão e passagem da bile represada; com a queda da pressão, o cálculo volta a descer e impactar. Além disso, edema inflamatório perilesional pode regredir temporariamente.</td>
      <td>Obstrução mecânica extrínseca e invasão transmural neoplásica contínua e fixa que infiltra e estrangula concentricamente a luz do colédoco de forma irreversível e progressiva.</td>
    </tr>
    <tr>
      <td><strong>Vesícula Biliar à Palpação (Lei de Courvoisier-Terrier)</strong></td>
      <td><strong>Vesícula Impalpável e Inelástica:</strong> A presença de cálculos crônicos gera fibrose cicatricial crônica na parede da vesícula (colecistite crônica calculosa), tornando-a escleroatrófica e incapaz de distender sob a hipertensão biliar retrógrada.</td>
      <td><strong>Sinal de Courvoisier-Terrier Positivo:</strong> <strong>Vesícula biliar palpável no hipocôndrio direito, indolor, globosa e tensa</strong> em paciente com icterícia colestática progressiva. Como a vesícula era previamente sadia e complacente, a obstrução tumoral distal dilata maciçamente todo o sistema.</td>
    </tr>
    <tr>
      <td><strong>Perfil da Dor Abdominal</strong></td>
      <td>Dor abdominal em cólica intensa no hipocôndrio direito que coincide com os picos de icterícia.</td>
      <td>Dor surda contínua no dorso/epigástrio ("em barra") associada a emagrecimento maciço constitucional rápido e astenia.</td>
    </tr>
  </tbody>
</table>

<h3>A Tétrade Clássica da Síndrome Colestática</h3>
<p>Quando a drenagem de bile para a luz intestinal é interrompida:</p>
<ol>
  <li><strong>Icterícia de Padrão Colestático:</strong> Coloração amarelada de escleras e mucosas decorrente do refluxo de <strong>Bilirrubina Direta (Conjugada)</strong> para a circulação sistêmica (geralmente bilirrubina total oscilando entre 3 e 10 mg/dL na coledocolitíase; níveis &gt; 15 a 20 mg/dL sugerem neoplasia maligna subjacente);</li>
  <li><strong>Colúria (Urina Escura cor de "Coca-Cola" ou "Chá Preto"):</strong> A bilirrubina conjugada é hidrossolúvel e filtrada livremente pelos glomérulos renais, excretando-se na urina (ao contrário da bilirrubina indireta, que é lipofílica e ligada à albumina plasmática, não causando colúria);</li>
  <li><strong>Acolia ou Hipocolia Fecal (Fezes Claras cor de "Massa de Vidraceiro"):</strong> Decorrente da ausência de chegada de bilirrubina ao lúmen intestinal, onde seria convertida pela microbiota em urobilinogênio e estercobilina (o pigmento castanho normal das fezes);</li>
  <li><strong>Prurido Cutâneo Intenso:</strong> Provocado pelo depósito tecidual de sais e ácidos biliares na derme, que estimulam diretamente terminações nervosas nociceptivas sensoriais livres, acompanhado de escoriações por coçadura, com piora noturna e palmar/plantar.</li>
</ol>
`
    },
    {
      id: 'estratificacao-asge-sages',
      title: '4. Estratificação de Risco de Coledocolitíase: As Diretrizes da ASGE / SAGES',
      body_html: `
<h3>O Racional da Estratificação de Risco Pré-Operatória</h3>
<p>A <strong>Colangiopancreatografia Retrógrada Endoscópica (CPRE)</strong> é um procedimento invasivo formidável de alta eficácia terapêutica, porém associado a taxas não desprezíveis de complicações maiores (pancreatite pós-CPRE em 5% a 10%, sangramento pós-papilotomia em 1% a 2%, perfuração duodenal em 0,5% a 1% e colangite iatrogênica). Por essa razão, a CPRE <strong>NUNCA DEVE SER UTILIZADA COMO MÉTODO PURAMENTE DIAGNÓSTICO</strong>!</p>
<p>Para determinar com precisão matemática quais pacientes candidatos à colecistectomia necessitam de CPRE terapêutica pré-operatória, quais exigem métodos diagnósticos não invasivos intermediários e quais devem ser operados diretamente sem exames adicionais, a <strong>American Society for Gastrointestinal Endoscopy (ASGE)</strong> e a <strong>Society of American Gastrointestinal and Endoscopic Surgeons (SAGES)</strong> padronizaram as diretrizes de estratificação de risco (atualizadas em 2019):</p>

<h3>Critérios Preditores da Diretriz ASGE / SAGES 2019</h3>
<table class="book-table">
  <thead>
    <tr>
      <th>Categoria de Preditores</th>
      <th>Critérios Clínicos, Laboratoriais e Radiológicos Específicos</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Preditores Fortes (Muito Fortes / Alta Probabilidade)</strong></td>
      <td>1. <strong>Cálculo Biliar Visualizado Diretamente no Colédoco</strong> em exame de ultrassonografia ou tomografia computadorizada prévia;<br>2. <strong>Presença Clínica de Colangite Aguda Ascendente</strong> (Tríade de Charcot);<br>3. <strong>Bilirrubina Total Sérica &gt; 4,0 mg/dL</strong> associada a <strong>Ducto Colédoco Dilatado &gt; 6 mm</strong> no USG (em paciente com vesícula biliar <em>in situ</em>).</td>
    </tr>
    <tr>
      <td><strong>Preditores Moderados (Risco Intermediário)</strong></td>
      <td>1. <strong>Perfil Enzimático Hepático Alterado:</strong> Elevação de Fosfatase Alcalina (FA), Gama-GT ou transaminases (AST/ALT) na ausência de BT &gt; 4;<br>2. <strong>Ducto Colédoco Dilatado &gt; 6 mm</strong> ao USG com bilirrubina normal ou discretamente elevada (&lt; 4,0 mg/dL);<br>3. <strong>Bilirrubina Total Sérica entre 1,8 e 4,0 mg/dL</strong> isolada;<br>4. <strong>História Recente de Pancreatite Aguda Biliar</strong> prévia resolvida.</td>
    </tr>
    <tr>
      <td><strong>Sem Preditores</strong></td>
      <td>Ausência de qualquer alteração clínica, laboratorial ou de imagem descrita acima.</td>
    </tr>
  </tbody>
</table>

<h3>Conduta Prática Conforme a Estratificação de Probabilidade</h3>
<p>Com base na combinação dos preditores, os pacientes são divididos em três grupos de probabilidade que norteiam a conduta médica:</p>
<ol>
  <li><strong>1. Grupo de Alto Risco (&gt; 50% de Probabilidade de Coledocolitíase):</strong>
    <ul>
      <li><em>Definição:</em> Presença de <strong>pelo menos UM preditor muito forte</strong> (cálculo visto ao USG, colangite clínica, ou BT &gt; 4 associada a colédoco dilatado &gt; 6 mm);</li>
      <li><em>Conduta Padronizada:</em> <strong>Indicação direta de CPRE Terapêutica Pré-Operatória</strong> com papilotomia e extração do cálculo, seguida de colecistectomia videolaparoscópica programada durante a mesma internação hospitalar; ou Colecistectomia com Exploração Cirúrgica do Colédoco em tempo único se equipe habilitada.</li>
    </ul>
  </li>
  <li><strong>2. Grupo de Risco Intermediário (10% a 50% de Probabilidade):</strong>
    <ul>
      <li><em>Definição:</em> Presença de <strong>preditores moderados</strong> (enzimas colestáticas alteradas, colédoco dilatado sem cálculo visível, BT entre 1,8 e 4, ou pancreatite biliar prévia);</li>
      <li><em>Conduta Padronizada:</em> <strong>Avaliação Adicional Obrigatória da Via Biliar com Exame Diagnóstico Não Invasivo ou Minimamente Invasivo</strong> antes da CPRE:
        <ul>
          <li><strong>Colangiopancreatografia por Ressonância Magnética (CPRM):</strong> Padrão-ouro não invasivo; se a CPRM confirmar cálculo no colédoco, o paciente migra para o grupo de alto risco e realiza CPRE terapêutica; se for negativa, realiza colecistectomia direta sem CPRE;</li>
          <li><strong>Ecoendoscopia (Ultrassom Endoscópico - EUS):</strong> Apresenta a maior sensibilidade para microcálculos (&lt; 3 a 5 mm) e cálculos no colédoco distal; se positivo, realiza-se CPRE no mesmo ato anestésico;</li>
          <li><strong>Colangiografia Intraoperatória (CIO):</strong> Realizada rotineiramente durante a colecistectomia laparoscópica; se demonstrar cálculo retido, procede-se à exploração laparoscópica do colédoco ou CPRE pós-operatória.</li>
        </ul>
      </li>
    </ul>
  </li>
  <li><strong>3. Grupo de Baixo Risco (&lt; 10% de Probabilidade):</strong>
    <ul>
      <li><em>Definição:</em> Ausência de qualquer preditor (enzimas normais, bilirrubina normal, colédoco fino &lt; 6 mm sem cálculos);</li>
      <li><em>Conduta Padronizada:</em> <strong>Colecistectomia Videolaparoscópica Direta</strong> sem necessidade de investigação colangiográfica pré-operatória nem de CPRE.</li>
    </ul>
  </li>
</ol>
`
    },
    {
      id: 'propedutica-armada-usg-cprm-cpre',
      title: '5. Propedêutica Armada da Coledocolitíase: USG, Colangiorressonância (CPRM), Ecoendoscopia (EUS) e CPRE',
      body_html: `
<h3>Comparação das Modalidades Diagnósticas e Terapêuticas</h3>
<p>O arsenal propedêutico para visualização da via biliar principal evoluiu substancialmente. A escolha do exame requer a compreensão exata das forças, limitações e riscos biológicos inerentes a cada método:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Método Diagnóstico / Terapêutico</th>
      <th>Sensibilidade / Especificidade para Coledocolitíase</th>
      <th>Vantagens e Indicações de Escolha</th>
      <th>Limitações Estruturais e Desvantagens</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Ultrassonografia Transabdominal (USG)</strong></td>
      <td>Sensibilidade baixa para o cálculo (<strong>30% a 50%</strong>); excelente para dilatação ductal (&gt; 80%).</td>
      <td>Exame inicial de triagem de primeira linha. Identifica a presença de cálculos na vesícula biliar e afere o <strong>diâmetro do colédoco</strong> (normal até 5-6 mm; colédoco &gt; 8 a 10 mm é patológico).</td>
      <td>O colédoco distal intrapancreático é frequentemente obscurecido pelo ar do duodeno e cólon; subestima gravemente cálculos pequenos impactados na ampola.</td>
    </tr>
    <tr>
      <td><strong>Colangiorressonância Magnética (CPRM)</strong></td>
      <td>Sensibilidade de <strong>90% a 95%</strong> e Especificidade de <strong>95% a 98%</strong>.</td>
      <td><strong>Padrão-ouro não invasivo de escolha</strong> no risco intermediário. Não requer contraste iodado (utiliza sequências pesadas em T2 onde a bile estagnada hiperintensa delineia o cálculo hipointenso como falha de enchimento arredondada). Isento de radiação ionizante e complicações pancreáticas.</td>
      <td>Exame puramente diagnóstico (não permite intervenção terapêutica simultânea); custo financeiro elevado; contraindicado em portadores de marca-passo antigo ou claustrofobia grave; menor sensibilidade para microcálculos &lt; 2 a 3 mm.</td>
    </tr>
    <tr>
      <td><strong>Ecoendoscopia (Ultrassom Endoscópico - EUS)</strong></td>
      <td>Sensibilidade de <strong>95% a 98%</strong> e Especificidade de <strong>98% a 100%</strong>.</td>
      <td><strong>Método diagnóstico de maior acurácia absoluta</strong> para a via biliar distal. O transdutor na luz duodenal fica a milímetros da ampola de Vater e colédoco terminal, identificando com precisão microcálculos e barro biliar (&lt; 2 mm).</td>
      <td>Método invasivo que exige endoscopia digestiva alta sob sedação profunda/anestesia; operador-dependente; disponibilidade restrita a centros terciários de referência.</td>
    </tr>
    <tr>
      <td><strong>CPRE (Colangiopancreatografia Retrógrada Endoscópica)</strong></td>
      <td>Sensibilidade e Especificidade terapêuticas &gt; 95%.</td>
      <td><strong>Padrão-ouro TERAPÊUTICO indiscutível.</strong> Permite canulação seletiva da papila de Vater, colangiografia fluoroscópica direta, <strong>Papilotomia / Esfincterotomia Biliar Endoscópica</strong>, extração dos cálculos com balão extrator ou cesta de Dormia e implante de próteses plásticas ou metálicas.</td>
      <td>Procedimento invasivo de alta complexidade; risco de <strong>pancreatite aguda pós-CPRE (5% a 10%)</strong>, sangramento digestivo, perfuração duodenal retroperitoneal e sepse. Proscrito para finalidade exclusivamente diagnóstica!</td>
    </tr>
    <tr>
      <td><strong>Colangiografia Intraoperatória (CIO)</strong></td>
      <td>Sensibilidade de 90% a 95% e Especificidade &gt; 95%.</td>
      <td>Realizada durante a colecistectomia por canulação direta do ducto cístico com cateter fluoroscópico e injeção de contraste iodado hidrossolúvel. Mapeia a anatomia biliar completa, previne lesões de via biliar e diagnostica cálculos insuspeitados.</td>
      <td>Prolonga o tempo cirúrgico em 15 a 20 minutos; exige equipamento de radioscopia (arco em C) ou raio-X na sala operatória.</td>
    </tr>
  </tbody>
</table>
`
    },
    {
      id: 'fisiopatologia-colangite-aguda',
      title: '6. Fisiopatologia da Colangite Aguda Infecciosa: Obstrução sob Hiperpressão e Translocação Biliovenosa',
      body_html: `
<h3>O Conceito e o Mecanismo Fisiopatológico Duplo</h3>
<p>A <strong>Colangite Aguda Infecciosa</strong> (historicamente denominada colangite ascendente) é uma das emergências infecciosas mais graves e potencialmente fatais da cirurgia do aparelho digestivo. Resulta da <strong>infecção bacteriana aguda da árvore biliar que ocorre obrigatoriamente na vigência de OBSTRUÇÃO MECÂNICA E HIPERPRESSÃO INTRADUCTAL</strong>.</p>
<p><strong>PRINCÍPIO BIOLÓGICO CARDINAL:</strong> A simples presença de bactérias no interior da via biliar (bacteriobilia) <em>NÃO é suficiente</em> para deflagrar colangite clínica. Em pacientes com próteses biliares, papilotomia prévia ou derivações biliodigestivas, a árvore biliar é cronicamente colonizada por bactérias duodenais, mas o indivíduo permanece completamente assintomático e afebril enquanto o fluxo biliar estiver livre e desimpedido. Para que a colangite se instale, é <strong>absolutamente necessária a combinação de DOIS FATORES CONCOMITANTES</strong>:</p>
<ol>
  <li><strong>Colonização / Proliferação Bacteriana na Bile; E</strong></li>
  <li><strong>Obstrução do Fluxo Biliar com Elevação Acentuada da Pressão Hidrostática Intraductal.</strong></li>
</ol>

<h3>A Cascata de Translocação Biliovenosa e Choque Séptico</h3>
<p>A sequência patogênica que transforma a obstrução biliar em choque séptico fulminante desenvolve-se com velocidade dramática:</p>
<ol>
  <li><strong>Obstrução Mecânica Aguda:</strong> Ocorre mais frequentemente por coledocolitíase impactada (60% a 70%), estenoses benignas ou malignas pós-cirúrgicas ou neoplásicas (colangiocarcinoma, câncer de pâncreas) ou obstrução de próteses biliares plásticas por biofilme bacteriano;</li>
  <li><strong>Proliferação Bacteriana sob Estase:</strong> A bile represada perde o seu fluxo laminar de lavagem contínua, permitindo que bactérias entéricas proliferem exponencialmente atingindo concentrações superiores a $10^8$ a $10^{11}$ unidades formadoras de colônias por mililitro ($UFC/mL$);</li>
  <li><strong>Elevação Crítica da Pressão Intraductal:</strong> À medida que o fígado continua secretando bile contra a resistência mecânica, a pressão no interior do ducto colédoco sobe dos valores normais (8 a 12 cm$H_2O$) para níveis patológicos superiores a <strong>20 a 25 cm$H_2O$</strong>;</li>
  <li><strong>Ruptura das Junções de Oclusão e Barreira Biliolinfática/Venosa:</strong> Sob pressões &gt; 20 cm$H_2O$, as junções de oclusão (<em>tight junctions</em>) que selam o espaço entre as membranas dos hepatócitos e canalículos biliares colapsam e rompem-se mecanicamente. Os microabscessos intraductais ulceram a lâmina própria;</li>
  <li><strong>O "Refluxo Colângio-Venoso":</strong> Ocorre o transbordamento retrógrado maciço e direto de <strong>bactérias viáveis e endotoxinas bacterianas (Lipopolissacarídeo - LPS de bactérias gram-negativas) dos canalículos biliares diretamente para o interior dos capilares sinusoides hepáticos e veias hepáticas</strong>;</li>
  <li><strong>Bacteremia Maciça e Tempestade de Citocinas:</strong> O LPS circulante liga-se ao receptor TLR-4 em macrófagos e células de Kupffer, deflagrando liberação sistêmica catastrófica de $TNF-\alpha$, $IL-1\beta$ e $IL-6$, vasodilatação distributiva sistêmica profunda, aumento da permeabilidade capilar, colapso circulatório (choque séptico) e coagulação intravascular disseminada (CIVD).</li>
</ol>
`
    },
    {
      id: 'semiologia-charcot-reynolds',
      title: '7. Semiologia da Colangite: Da Tríade de Charcot à Pêntade de Reynolds',
      body_html: `
<h3>A Evolução Semiológica Histórica</h3>
<p>O reconhecimento clínico precoce da colangite aguda é a diferença entre a sobrevivência e o óbito do paciente. Classicamente, a sintomatologia clínica é sistematizada em dois grandes epônimos semiológicos:</p>

<h3>1. A Tríade de Charcot (Descrita por Jean-Martin Charcot em 1877)</h3>
<p>Identifica a presença de <strong>Colangite Aguda Não Complicada (ou Supurada Leve a Moderada)</strong>, caracterizada pela presença simultânea de três sinais cardinais:</p>
<table class="book-table">
  <thead>
    <tr>
      <th>Componente da Tríade de Charcot</th>
      <th>Mecanismo Fisiopatológico Específico</th>
      <th>Características Semiológicas Detalhadas</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>1. Dor no Quadrante Superior Direito (QSD)</strong></td>
      <td>Distensão mecânica aguda da cápsula de Glisson hepática e dos ductos biliares intra e extra-hepáticos sob alta pressão hidrostática.</td>
      <td>Dor constante e profunda no hipocôndrio direito e epigástrio, de intensidade moderada a forte, que pode irradiar para a região dorsal interescapular direita.</td>
    </tr>
    <tr>
      <td><strong>2. Febre Alta com Calafrios Profusos</strong></td>
      <td>Translocação de bactérias e endotoxinas (LPS) para a circulação venosa portal e sistêmica estimulando o centro termorregulador hipotalâmico.</td>
      <td><strong>Febre em agulha / picos térmicos elevados (&gt; 38,5°C - 39,5°C)</strong> acompanhada de tremores e calafrios intensos (refletindo episódios de bacteremia aguda transitória). É o sintoma mais constante da tríade (&gt; 90% dos casos).</td>
    </tr>
    <tr>
      <td><strong>3. Icterícia</strong></td>
      <td>Refluxo colângio-venoso de bilirrubina direta conjugada para o sangue decorrente do bloqueio do fluxo biliar.</td>
      <td>Icterícia escleral e cutânea visível de padrão colestático, associada a colúria evidente e graus variáveis de hipocolia fecal.</td>
    </tr>
  </tbody>
</table>
<p><em>Frequência Clínica da Tríade Completa:</em> A tríade de Charcot clássica completa está presente em aproximadamente <strong>50% a 70% de todos os pacientes com colangite aguda</strong>. Nos demais pacientes (especialmente idosos e imunossuprimidos), ela pode apresentar-se incompleta (ex: apenas febre e icterícia sem dor abdominal importante).</p>

<h3>2. A Pêntade de Reynolds (Descrita por B.M. Reynolds e E.L. Dargan em 1959)</h3>
<p>Identifica a forma mais fulminante e catastrófica da doença: a <strong>Colangite Aguda Tóxica Supurativa com Choque Séptico</strong>. Caracteriza-se pela associação dos <strong>Três Elementos da Tríade de Charcot somados a DOIS NOVOS COMPONENTES DE FALÊNCIA ORGÂNICA SISTÊMICA</strong>:</p>
<ol>
  <li><strong>Tríade de Charcot:</strong>
    <ul>
      <li>1. Dor em Hipocôndrio Direito;</li>
      <li>2. Febre Alta com Calafrios;</li>
      <li>3. Icterícia;</li>
    </ul>
  </li>
  <li><strong>MAIS os Dois Componentes Adicionais da Pêntade de Reynolds:</strong>
    <ul>
      <li><strong>4. Hipotensão Arterial Sistêmica / Choque Séptico:</strong> Pressão arterial sistólica &lt; 90 mmHg ou PAM &lt; 65 mmHg decorrente de vasodilatação mediada por óxido nítrico e depressão miocárdica induzida por citocinas da sepse grave;</li>
      <li><strong>5. Alteração do Nível de Consciência / Confusão Mental Aguda:</strong> Encefalopatia séptica aguda, agitação psicomotora, desorientação têmporo-espacial, letargia profunda ou torpor / coma decorrente da hipoperfusão cerebral e toxicidade endotóxica direta.</li>
    </ul>
  </li>
</ol>
<p><strong>IMPORTÂNCIA TERAPÊUTICA CRÍTICA:</strong> A presença da Pêntade de Reynolds é um sinal inequívoco de <strong>urgência médica e cirúrgica absoluta</strong>. Sem a instituição imediata de ressuscitação volêmica intensiva, antibioticoterapia de amplo espectro e, fundamentalmente, <strong>DESCOMPRESSÃO BILIAR DE EMERGÊNCIA NAS PRIMEIRAS HORAS</strong>, a taxa de mortalidade aproxima-se de <strong>100%</strong>!</p>
`
    },
    {
      id: 'microbiologia-e-terapia-antimicrobiana',
      title: '8. Microbiologia Biliar e Terapia Antimicrobiana Empírica e Guiada',
      body_html: `
<h3>Microbiologia das Infecções da Árvore Biliar</h3>
<p>A cultura de bile colhida durante CPRE ou punção cirúrgica revela crescimento bacteriano em mais de 90% dos pacientes com colangite aguda. Em mais de metade dos casos, trata-se de uma <strong>infecção polimicrobiana</strong> combinando bacilos gram-negativos entéricos facultativos e cocos gram-positivos, frequentemente associados a anaeróbios:</p>
<ul>
  <li><strong>1. Bacilos Gram-Negativos Entéricos Facultativos (Mais Comuns — 70% a 80%):</strong>
    <ol>
      <li><strong>Escherichia coli (40% a 50%)</strong> — o agente etiológico isolado dominante;</li>
      <li><strong>Klebsiella pneumoniae (15% a 25%)</strong>;</li>
      <li><em>Enterobacter cloacae</em> e <em>Enterobacter aerogenes</em> (5% a 10%);</li>
      <li><em>Proteus mirabilis</em> e <em>Citrobacter</em> (5%);</li>
      <li><strong>Pseudomonas aeruginosa (5% a 15%)</strong> — particularmente prevalente em infecções nosocomiais, pacientes com próteses biliares prévias manipuladas endoscopicamente ou idosos institucionalizados.</li>
    </ol>
  </li>
  <li><strong>2. Cocos Gram-Positivos (20% a 30%):</strong>
    <ul>
      <li><strong>Enterococcus faecalis e Enterococcus faecium (15% a 25%)</strong>;</li>
      <li><em>Streptococcus</em> do grupo viridans.</li>
    </ul>
  </li>
  <li><strong>3. Bactérias Anaeróbias Estritas (15% a 20%):</strong>
    <ul>
      <li><strong>Bacteroides fragilis</strong> e espécies de <em>Clostridium</em>; mais frequentes em pacientes idosos, após anastomoses biliodigestivas prévias (onde o esfíncter de Oddi foi abolido) ou colangites graves supuradas.</li>
    </ul>
  </li>
</ul>

<h3>Regimes de Antibioticoterapia Empírica Parenteral</h3>
<p>A administração precoce de antibióticos por via intravenosa deve ser iniciada <strong>dentro da primeira hora da admissão hospitalar</strong> após a coleta imediata de duas amostras de hemoculturas (positivas em 40% a 60% dos casos de colangite):</p>
<table class="book-table">
  <thead>
    <tr>
      <th>Cenário Clínico / Gravidade da Colangite</th>
      <th>Esquema Antimicrobiano Empírico de Escolha</th>
      <th>Esquemas Alternativos (Alergia a Beta-Lactâmicos)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Colangite Comunitária Leve a Moderada (Grau I ou II de Tóquio)</strong></td>
      <td><strong>Ceftriaxona (1 a 2 g IV 1x/dia) + Metronidazol (500 mg IV 8/8h)</strong>; ou<br><strong>Ampicilina-Sulbactam (3 g IV 6/6h)</strong>.</td>
      <td><strong>Ciprofloxacino (400 mg IV 12/12h) + Metronidazol (500 mg IV 8/8h)</strong>; ou Gentamicina + Metronidazol.</td>
    </tr>
    <tr>
      <td><strong>Colangite Grave com Choque Séptico (Grau III / Pêntade de Reynolds) ou Hospitalar</strong></td>
      <td><strong>Piperacilina-Tazobactam (4,5 g IV 6/6h em infusão estendida)</strong>; ou<br><strong>Meropenem (1 g IV 8/8h em infusão contínua)</strong> (especialmente se risco de bactérias produtoras de ESBL).</td>
      <td>Ciprofloxacino (400 mg IV 8/8h) + Vancomicina (15 a 20 mg/kg IV) + Metronidazol; ou Polimixina B se bacilos multirresistentes.</td>
    </tr>
  </tbody>
</table>
<p><em>Duração da Antibioticoterapia:</em> O tratamento antimicrobiano intravenoso deve ser mantido habitualmente por <strong>4 a 7 dias após a realização bem-sucedida da descompressão biliar</strong> e resolução da bacteremia e da febre. Se houver hemoculturas persistentemente positivas para <em>Enterococcus</em> ou abscessos hepáticos secundários, o tratamento pode estender-se por 2 a 3 semanas.</p>
`
    },
    {
      id: 'criterios-de-toquio-tg18-colangite',
      title: '9. Critérios Diagnósticos e Classificação de Gravidade da Colangite segundo as Diretrizes de Tóquio (TG18/TG20)',
      body_html: `
<h3>Critérios Diagnósticos de Colangite Aguda (Tokyo Guidelines - TG18)</h3>
<p>Para aumentar a sensibilidade diagnóstica para além da Tríade de Charcot (que falha em identificar até 30% a 40% dos casos atípicos), a TG18 estabeleceu um sistema tripartite de critérios:</p>
<table class="book-table">
  <thead>
    <tr>
      <th>Grupo de Critérios</th>
      <th>Parâmetros Clínicos, Laboratoriais e Radiológicos Específicos</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>A. Inflamação Sistêmica</strong></td>
      <td>1. <strong>Febre (&gt; 38,0°C)</strong> e/ou calafrios;<br>2. Dados laboratoriais de resposta inflamatória: <strong>Leucocitose (&gt; 10.000/$mm^3$) ou leucopenia (&lt; 4.000/$mm^3$)</strong>, ou Proteína C Reativa (PCR) elevada (&ge; 3,0 mg/dL).</td>
    </tr>
    <tr>
      <td><strong>B. Colestase</strong></td>
      <td>1. <strong>Icterícia clínica</strong> (Bilirrubina Total &ge; 2,0 mg/dL);<br>2. Dados laboratoriais de colestase: <strong>Elevação de Fosfatase Alcalina (FA), Gama-GT, AST ou ALT</strong> para mais de 1,5 vez o limite superior da normalidade.</td>
    </tr>
    <tr>
      <td><strong>C. Achados de Imagem Biliar</strong></td>
      <td>1. <strong>Dilatação das vias biliares</strong> intra ou extra-hepáticas (&gt; 6 a 8 mm);<br>2. <strong>Evidência direta da etiologia da obstrução</strong> ao exame de imagem (cálculo, estenose, prótese entupida).</td>
    </tr>
  </tbody>
</table>

<p><strong>Classificação Diagnóstica TG18:</strong></p>
<ul>
  <li><strong>Diagnóstico Suspeito:</strong> Um item de A + um item de B;</li>
  <li><strong>Diagnóstico Definitivo:</strong> <strong>Pelo menos um item de A + um item de B + confirmação por imagem no item C</strong>.</li>
</ul>

<h3>Estratificação de Gravidade da Colangite Aguda (Tokyo Guidelines TG18)</h3>
<p>A estratificação de gravidade dita a janela temporal máxima permitida para a descompressão biliar urgente:</p>
<table class="book-table">
  <thead>
    <tr>
      <th>Grau de Gravidade (TG18)</th>
      <th>Critérios Clínicos e Laboratoriais de Definição</th>
      <th>Janela Temporal para Descompressão Biliar</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Grau I (Leve)</strong></td>
      <td>Colangite aguda que <strong>responde prontamente à terapia antimicrobiana inicial</strong> e não preenche critérios de gravidade moderada (Grau II) nem grave (Grau III). Paciente estável sem disfunção orgânica.</td>
      <td>Descompressão biliar <strong>eletiva ou semieletiva</strong> (geralmente realizada em <strong>24 a 48 horas</strong> ou após estabilização clínica durante a mesma internação).</td>
    </tr>
    <tr>
      <td><strong>Grau II (Moderada)</strong></td>
      <td>Colangite aguda que <strong>NÃO responde ao tratamento clínico inicial</strong> e apresenta alto risco de deterioração, caracterizada pela presença de <strong>QUALQUER DOIS dos seguintes 5 critérios</strong> (sem disfunção de órgãos):
        <ol>
          <li><strong>Leucocitose acentuada (&gt; 12.000/$mm^3$) ou leucopenia (&lt; 4.000/$mm^3$)</strong>;</li>
          <li><strong>Febre alta (&ge; 39,0°C)</strong>;</li>
          <li><strong>Idade avançada (&ge; 75 anos)</strong>;</li>
          <li><strong>Hiperbilirrubinemia acentuada (Bilirrubina Total &ge; 5,0 mg/dL)</strong>;</li>
          <li><strong>Hipoalbuminemia sérica (&lt; 0,7 vez o limite inferior normal / &lt; 3,0 g/dL)</strong>.</li>
        </ol>
      </td>
      <td><strong>Descompressão Biliar PRECOCE DE URGÊNCIA (nas primeiras 12 a 24 horas da admissão)</strong> associada a suporte clínico intensivo para prevenir evolução para sepse refratária.</td>
    </tr>
    <tr>
      <td><strong>Grau III (Grave)</strong></td>
      <td>Colangite aguda associada ao desenvolvimento de <strong>DISFUNÇÃO ORGÂNICA de pelo menos UM dos seguintes 6 sistemas vitais</strong>:
        <ol>
          <li><strong>Cardiovascular:</strong> Hipotensão arterial que exige drogas vasoativas (dopamina &ge; 5 $\mu$g/kg/min ou noradrenalina em qualquer dose);</li>
          <li><strong>Neurológico:</strong> Rebaixamento da consciência (Glasgow &lt; 15);</li>
          <li><strong>Respiratório:</strong> Relação $PaO_2 / FiO_2 &lt; 300$;</li>
          <li><strong>Renal:</strong> Oligúria e creatinina sérica &gt; 2,0 mg/dL;</li>
          <li><strong>Hepático:</strong> RNI &gt; 1,5;</li>
          <li><strong>Hematológico:</strong> Plaquetas &lt; 100.000 / $mm^3$.</li>
        </ol>
      </td>
      <td><strong>DESCOMPRESSÃO BILIAR DE EMERGÊNCIA IMEDIATA (&lt; 6 a 12 HORAS)</strong> associada à ressuscitação volêmica intensiva em UTI e suporte vasopressor! Adiar a descompressão acarreta mortalidade superior a 80%.</td>
    </tr>
  </tbody>
</table>
`
    },
    {
      id: 'descompressao-biliar-de-urgencia',
      title: '10. Descompressão Biliar de Urgência Imediata: CPRE vs Drenagem Trans-Hepática Percutânea vs Cirurgia Aberta',
      body_html: `
<h3>O Pilar Fundamental: "Pus sob Pressão Exige Drenagem Imediata"</h3>
<p>Em cirurgia geral, existe um aforismo secular inviolável: <em>coleção purulenta sob pressão mecânica fechada nunca se cura com antibióticos isolados</em>. Na colangite aguda grave, a antibioticoterapia venosa atua apenas como medida de suporte temporário para reduzir a bacteremia circulante; se a via biliar permanecer obstruída e hiperpressurizada, a penetração dos antibióticos na bile infectada é praticamente nula (a secreção biliar hepatocitária cessa em pressões &gt; 25 cm$H_2O$) e a translocação colângio-venosa continuará matando o paciente. A <strong>Descompressão Biliar de Urgência Imediata é a intervenção que efetivamente salva a vida</strong>.</p>

<h3>1. CPRE (Colangiopancreatografia Retrógrada Endoscópica): Padrão-Ouro de Escolha</h3>
<p>A descompressão por via endoscópica retrógrada é o <strong>método terapêutico de primeira escolha universal</strong> para descompressão biliar na colangite aguda, apresentando taxa de sucesso técnico superior a 90% a 95% e morbimortalidade dramaticamente inferior à cirurgia aberta:</p>
<ul>
  <li><strong>Técnicas Endoscópicas de Descompressão:</strong>
    <ol>
      <li><strong>Papilotomia / Esfincterotomia Endoscópica:</strong> Incisão térmica do esfíncter de Oddi com bisturi de papilotomia (papilótomo de tração) guiado por diatermia, permitindo a descompressão imediata e a saída de bile purulenta sob pressão para a luz duodenal;</li>
      <li><strong>Extração de Cálculos:</strong> Remoção dos cálculos obstrutivos com balão extrator ou cesta de Dormia;</li>
      <li><strong>Drenagem Biliar com Prótese Plástica (Stent Biliar) ou Dreno Nasobiliar:</strong> Em pacientes instáveis em choque séptico, o endoscopista deve ser rápido e pragmático. <em>NÃO SE DEVE PERDER TEMPO TENTANDO EXTRAIR CÁLCULOS COMPLEXOS OU DIFÍCEIS NO PACIENTE CHOCADO!</em> Basta canular a via biliar e <strong>inserir rapidamente uma prótese plástica biliar (stent 7 ou 10 French) ou um dreno nasobiliar transpassando o ponto de obstrução</strong>. A prótese drena a bile purulenta para o duodeno, descomprime a árvore biliar e reverte o choque séptico em poucas horas; a extração definitiva dos cálculos é realizada eletivamente dias após, com o paciente plenamente compensado.</li>
    </ol>
  </li>
</ul>

<h3>Manejo Avançado de Cálculos Difíceis e Volumosos no Colédoco</h3>
<p>Em aproximadamente 10% a 15% dos casos, os cálculos do colédoco são considerados "difíceis" (cálculos com diâmetro &gt; 15 mm, cálculos em formato de ampulheta, impactados acima de estenoses ou cálculos múltiplos em colédoco distal afilado). Nesses cenários, a papilotomia simples isolada não permite a passagem do cálculo. As diretrizes da ESGE e ASGE recomendam:</p>
<ol>
  <li><strong>Dilatação Papilar com Balão de Grande Diâmetro (EPLBD - Endoscopic Papillary Large-Balloon Dilation):</strong> Realização de papilotomia parcial associada à dilatação radial controlada da papila com balão de 12 a 20 mm, criando uma abertura ampla que permite a extração de macrocálculos sem aumentar a incidência de sangramento;</li>
  <li><strong>Colangioscopia Direta Peroral (Sistema SpyGlass) com Litotripsia Intraductal:</strong> Introdução de um microendoscópio flexível através do canal de trabalho do duodenoscópio diretamente para o interior da via biliar. Sob visualização direta digital em alta definição da superfície do cálculo, realiza-se a <strong>Litotripsia a Laser de Holmium (LL)</strong> ou a <strong>Litotripsia Eletro-Hidráulica (EHL)</strong>. Os pulsos de choque térmico e acústico fragmentam o macrocálculo em fragmentos milimétricos que são facilmente varridos com balão extrator, alcançando taxas de clareamento ductal superiores a 95%;</li>
  <li><strong>Litotripsia Mecânica Extracorpórea ou Intraductal com Cesta de Soehendra:</strong> Uso de cestas metálicas reforçadas de alta tração que esmagam o cálculo mecanicamente contra a bainha de aço quando a extração direta falha.</li>
</ol>

<h3>2. Drenagem Biliar Trans-Hepática Percutânea (DTP)</h3>
<p>Indicada como <strong>método de resgate de segunda linha imediato</strong> quando a CPRE for indisponível ou tecnicamente inviável:</p>
<ul>
  <li><strong>Principais Indicações da DTP:</strong>
    <ul>
      <li>Alterações anatômicas do trato digestivo alto decorrentes de cirurgias prévias que impedem o acesso endoscópico à papila duodenal maior (ex: <strong>Gastrectomia com reconstrução em Y de Roux</strong>, Bypass Gástrico em Y de Roux para obesidade, ou Duodenopancreatectomia de Whipple);</li>
      <li>Obstruções duodenais mecânicas por neoplasia estenosante que impedem a passagem do duodenoscópio;</li>
      <li>Falha técnica de canulação da papila por papilas intradiverticulares ou infiltração tumoral;</li>
      <li>Obstruções biliares altas hilares complexas (Tumor de Klatskin Bismuth III ou IV).</li>
    </ul>
  </li>
  <li><strong>Técnica:</strong> Punção trans-hepática percutânea de ducto biliar intra-hepático dilatado guiada por ultrassonografia e fluoroscopia através dos espaços intercostais direitos, seguida de inserção de cateter de drenagem biliar externa ou interna-externa;</li>
  <li><strong>Limitações e Riscos:</strong> Risco de sangramento hepático (hemobilia, hematoma subcapsular), vazamento de bile para a cavidade peritoneal (peritonite biliar) e pneumotórax.</li>
</ul>

<h3>3. Cirurgia Aberta de Descompressão Biliar de Emergência (Dreno de Kehr)</h3>
<p>Historicamente, a cirurgia aberta com coledocotomia e inserção de <strong>Tubo em T (Dreno de Kehr)</strong> era o único tratamento disponível. No entanto, em pacientes idosos com sepse biliar grave e disfunção orgânica, a laparotomia de emergência impõe taxas de mortalidade assustadoras de <strong>30% a 50%</strong>. Hoje, a cirurgia aberta de urgência reserva-se estritamente como <strong>último recurso heroico</strong> quando a CPRE e a drenagem percutânea tiverem falhado ou forem inacessíveis, ou quando houver perfuração duodenal ou peritonite biliar generalizada concomitante.</p>
`
    },
    {
      id: 'abordagem-cirurgica-integrada',
      title: '11. Abordagem Cirúrgica Integrada: Tratamento em Tempo Único vs Dois Tempos (CPRE + Colecistectomia vs Exploração Cirúrgica do Colédoco)',
      body_html: `
<h3>O Dilema Cirúrgico no Paciente com Colelitíase e Coledocolitíase Concomitantes</h3>
<p>Em pacientes que apresentam cálculos simultaneamente na vesícula biliar e no colédoco (situação frequente em mais de 80% dos casos de coledocolitíase secundária), existem duas abordagens terapêuticas curativas consagradas pela literatura cirúrgica internacional:</p>

<h3>1. Tratamento em Dois Tempos (CPRE Pré-Operatória Seguido de Colecistectomia Laparoscópica)</h3>
<ul>
  <li><strong>Estratégia Sequencial Mais Difundida:</strong>
    <ol>
      <li><strong>Primeiro Tempo (Endoscópico):</strong> Realização de CPRE com papilotomia e extração completa dos cálculos do colédoco com balão extrator;</li>
      <li><strong>Segundo Tempo (Cirúrgico):</strong> Realização de <strong>Colecistectomia Videolaparoscópica</strong> na mesma internação hospitalar (preferencialmente dentro das primeiras <strong>24 a 72 horas pós-CPRE</strong>).</li>
    </ol>
  </li>
  <li><strong>Vantagens:</strong> Abordagem minimamente invasiva pura; amplamente disponível na maioria dos serviços de referência; permite que a colecistectomia laparoscópica subsequente seja rápida e sem necessidade de instrumentação complexa do colédoco;</li>
  <li><strong>Desvantagens:</strong> Submete o paciente a dois atos anestésicos distintos; risco de pancreatite pós-CPRE prévia à cirurgia; e risco de falha da CPRE exigindo conversão cirúrgica posterior.</li>
</ul>

<h3>2. Tratamento em Tempo Único Cirúrgico (Colecistectomia + Exploração Laparoscópica do Colédoco)</h3>
<ul>
  <li><strong>Estratégia em Ato Anestésico Único:</strong> O paciente é submetido à colecistectomia laparoscópica e, no mesmo ato cirúrgico, o cirurgião realiza a <strong>Colangiografia Intraoperatória (CIO)</strong> e a <strong>Exploração Laparoscópica da Via Biliar Principal</strong>:
    <ul>
      <li><em>Via Transcística:</em> Se os cálculos forem pequenos (&lt; 5 a 6 mm) e o ducto cístico for amplo e complacente, introduz-se uma cesta de Dormia ou um coledocoscópio flexível através do próprio ducto cístico até o colédoco, extraindo os cálculos sob visão direta sem necessidade de incisar o colédoco;</li>
      <li><em>Via Coledocotomia Laparoscópica:</em> Se houver cálculos volumosos (&gt; 8 a 10 mm), cálculos múltiplos (&gt; 5) ou ducto cístico muito estreito e tortuoso, realiza-se incisão longitudinal na parede anterior da porção supraduodenal do colédoco dilatado (coledocotomia), extração dos cálculos com coledocoscópio e fechamento primário da via biliar ou fechamento sobre <strong>Dreno de Kehr (tubo em T)</strong>.</li>
    </ul>
  </li>
  <li><strong>Vantagens:</strong> Resolve integralmente a colelitíase e a coledocolitíase em uma única internação e sob uma única anestesia geral, preservando a anatomia do esfíncter de Oddi (sem necessidade de papilotomia endoscópica na abordagem transcística);</li>
  <li><strong>Desvantagens:</strong> Exige centro cirúrgico com instrumental avançado (coledocoscópio flexível digital e fluoroscopia intraoperatória) e equipe cirúrgica altamente treinada em sutura intracorpórea laparoscópica na via biliar.</li>
</ul>

<h3>O Manejo do Dreno de Kehr (Tubo em T) na Coledocotomia</h3>
<p>Quando o cirurgião opta pela colocação de um Dreno de Kehr após a abertura cirúrgica do colédoco:</p>
<ul>
  <li>O tubo em T é exteriorizado pela parede abdominal e mantido em <strong>drenagem livre por gravidade</strong>;</li>
  <li>A secreção biliar diária normal varia entre 300 e 500 mL nas primeiras 24 a 48 horas, reduzindo progressivamente à medida que o edema da ampola regride e a bile flui para o duodeno;</li>
  <li><strong>Colangiografia pelo Dreno de Kehr:</strong> Realizada rotineiramente entre o <strong>7º e o 10º dia de pós-operatório</strong> para checar a perviedade da via biliar, verificar o livre trânsito do contraste para o duodeno e descartar cálculos residuais ou extravasamentos;</li>
  <li><strong>Momento Seguro de Remoção do Dreno de Kehr:</strong> O dreno de Kehr <strong>NUNCA DEVE SER RETIRADO ANTES DE 2 A 3 SEMANAS (14 a 21 dias) DE PÓS-OPERATÓRIO</strong>! Esse tempo mínimo é rigorosamente indispensável para que se forme um <em>trajeto fistuloso fibroso maduro e selado</em> entre o colédoco e a parede abdominal anterior. Se o dreno for puxado precocemente antes de 14 dias, a bile extravasa livremente para a cavidade peritoneal, provocando coleperitônio, peritonite biliar grave e necessidade de reoperação!</li>
</ul>

<h3>Lesões Iatrogênicas da Via Biliar Principal: A Classificação de Strasberg-Bismuth</h3>
<p>A complicação mais temida da cirurgia biliar é a lesão iatrogênica do colédoco ou hepático comum, cuja incidência em colecistectomias laparoscópicas varia de 0,3% a 0,5%. A classificação consagrada mundialmente é a de <strong>Strasberg (Tipos A a E)</strong>:</p>
<table class="book-table">
  <thead>
    <tr>
      <th>Tipo (Strasberg)</th>
      <th>Descrição Anatômica da Lesão</th>
      <th>Manejo e Tratamento Específico</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Tipo A</strong></td>
      <td>Vazamento biliar de ductos menores em continuidade com a via biliar principal (fuga pelo coto do <strong>ducto cístico</strong> ou ductos de Luschka no leito hepático).</td>
      <td>Tratamento endoscópico por CPRE com esfincterotomia/papilotomia e passagem de prótese biliar plástica para reduzir o gradiente de pressão intraductal (resolução &gt; 90%).</td>
    </tr>
    <tr>
      <td><strong>Tipo B</strong></td>
      <td>Oclusão / ligadura inadvertida de um ducto hepático setorial aberrante (mais comumente o ducto setorial posterior direito).</td>
      <td>Geralmente assintomático com atrofia do segmento hepático correspondente, a menos que ocorra infecção com colangite segmentar exigindo reanastomose ou ressecção hepática.</td>
    </tr>
    <tr>
      <td><strong>Tipo C</strong></td>
      <td>Transecção sem ligadura (fístula biliar ativa) de um ducto hepático setorial aberrante.</td>
      <td>Drenagem percutânea de coleções (biloma) e reanastomose biliodigestiva ou ligadura do ducto.</td>
    </tr>
    <tr>
      <td><strong>Tipo D</strong></td>
      <td>Lesão lateral parcial (&lt; 50% da circunferência) da via biliar principal (colédoco ou hepático comum).</td>
      <td>Reparo primário da lesão com sutura fina absorvível (PDS 5-0) sobre Dreno de Kehr exteriorizado por contra-abertura; ou colocação de stent biliar por CPRE se lesão mínima.</td>
    </tr>
    <tr>
      <td><strong>Tipo E</strong></td>
      <td><strong>Transecção circunferencial completa da via biliar principal</strong> com perda de substância (subdividida segundo a <strong>Classificação de Bismuth</strong> conforme a distância da confluência dos ductos hepáticos):<br>
      - <em>E1:</em> Coto hepático comum &gt; 2 cm da confluência;<br>
      - <em>E2:</em> Coto hepático comum &lt; 2 cm da confluência;<br>
      - <em>E3:</em> Transecção no nível da confluência hilar (preservando o teto da confluência);<br>
      - <em>E4:</em> Destruição da confluência, separando os ductos hepáticos direito e esquerdo;<br>
      - <em>E5:</em> Lesão de ducto setorial direito associada a transecção da confluência.</td>
      <td><strong>Reconstrução Cirúrgica Especializada Obrigatória: Hepaticojejunostomia em Y de Roux término-lateral com sutura em plano único</strong>. A tentativa de sutura direta término-terminal do colédoco transecionado é formalmente contraindicada pelo risco quase inevitável de isquemia e estenose cicatricial refratária tardia.</td>
    </tr>
  </tbody>
</table>
`
    },
    {
      id: 'casos-clinicos-estruturados-coledocolitiase',
      title: '12. Casos Clínicos Estruturados e Discussões Práticas Baseadas em Evidências',
      body_html: `
<div class="book-case">
  <h3>Caso Clínico 1: Coledocolitíase de Alto Risco em Paciente Candidata a Colecistectomia</h3>
  <p><strong>Identificação:</strong> Mulher de 49 anos, com histórico de cólicas biliares pós-prandiais há 6 meses, procura atendimento com queixa de olhos amarelados (icterícia), urina escura cor de refrigerante de cola (colúria) e prurido nas palmas das mãos iniciado há 5 dias. Nega febre, calafrios ou dor abdominal no momento.</p>
  <p><strong>Exame Físico:</strong> Bom estado geral, corada, hidratada, ictérica (2+/4+), afebril (36,7°C), FC: 76 bpm, PA: 120/75 mmHg. Abdome flácido, indolor à palpação profunda em hipocôndrio direito, <strong>Sinal de Murphy negativo</strong>, sem massas ou visceromegalias palpáveis.</p>
  <p><strong>Exames Laboratoriais:</strong> Bilirrubina Total: 5,8 mg/dL com <strong>Bilirrubina Direta de 4,9 mg/dL</strong>. Fosfatase Alcalina: 380 U/L (VR &lt; 120), Gama-GT: 420 U/L (VR &lt; 50). AST: 65 U/L, ALT: 72 U/L. Amilase e Lipase normais. Leucócitos: 6.800/$mm^3$ sem desvio.</p>
  <p><strong>Ultrassonografia de Abdome Superior:</strong> Vesícula biliar repleta de múltiplos cálculos móveis de 4 a 6 mm, sem espessamento parietal (parede de 2 mm). <strong>Ducto colédoco dilatado medindo 10 mm de diâmetro transverso</strong> em todo o trajeto, com visualização de <strong>imagem hiperecogênica de 7 mm com sombra acústica posterior nítida alojada no colédoco distal</strong>.</p>
  
  <h4>Discussão Clínica Passo a Passo:</h4>
  <p><strong>1. Estratificação de Risco Segundo a Diretriz ASGE / SAGES:</strong></p>
  <ul>
    <li>A paciente apresenta cálculo diretamente visualizado no colédoco ao USG (Preditor Muito Forte) e Bilirrubina Total &gt; 4 mg/dL associada a colédoco &gt; 6 mm (Preditor Muito Forte);</li>
    <li>Classifica-se no <strong>Grupo de ALTO RISCO (&gt; 50% de probabilidade)</strong> de coledocolitíase;</li>
  </ul>
  <p><strong>2. Conduta Terapêutica Sequencial:</strong></p>
  <ul>
    <li>Não há indicação de realizar colangiorressonância prévia (o diagnóstico já está confirmado por imagem de alto risco);</li>
    <li><strong>Passo 1: CPRE Terapêutica Pré-Operatória</strong> com papilotomia endoscópica e extração do cálculo com balão extrator de Fogarty;</li>
    <li><strong>Passo 2: Colecistectomia Videolaparoscópica</strong> programada nas 24 a 72 horas subsequentes durante a mesma internação hospitalar para erradicar a fonte formadora dos cálculos e prevenir novas migrações e pancreatite biliar.</li>
  </ul>
</div>

<div class="book-case">
  <h3>Caso Clínico 2: Colangite Aguda Grave com Pêntade de Reynolds (Choque Séptico Biliar)</h3>
  <p><strong>Identificação:</strong> Homem de 72 anos, diabético e hipertenso, dá entrada na sala vermelha da emergência trazido pelo SAMU em estado grave com história de febre com tremores e icterícia iniciada há 2 dias, com piora aguda nas últimas 12 horas.</p>
  <p><strong>Exame Físico na Admissão:</strong> Sonolento, confuso, desorientado no tempo e no espaço (Glasgow 12), profundamente ictérico (3+/4+), pele fria e pegajosa com livedo reticular nos membros inferiores. <strong>Sinais Vitais:</strong> PA: 75/40 mmHg (PAM 51 mmHg), FC: 136 bpm rítmica filiforme, FR: 28 irpm, <strong>Temperatura axilar: 39,4°C</strong>, SatO2: 92% em ar ambiente. Exame abdominal: abdome discretamente distendido, com dor importante à palpação profunda no hipocôndrio direito, sem sinais de peritonite difusa.</p>
  <p><strong>Exames Laboratoriais Urgentes:</strong> Leucograma revelando 26.500 leucócitos/$mm^3$ com 18% de bastonetes e granulações tóxicas. Plaquetas: 74.000/$mm^3$. Gasometria arterial com acidose metabólica grave: pH 7,20, $HCO_3^-$ 12 mEq/L e <strong>Lactato Sérico de 7,8 mmol/L</strong>. Creatinina: 2,8 mg/dL (ureia: 110 mg/dL). Bilirrubina Total: 9,2 mg/dL (BD 8,1 mg/dL). RNI: 1,8.</p>
  <p><strong>Ultrassonografia Rápida à Beira do Leito:</strong> Vesícula com microcálculos e ducto colédoco com dilatação acentuada medindo 14 mm contendo cálculo obstrutivo impactado na porção distal.</p>
  
  <h4>Discussão Clínica Passo a Passo:</h4>
  <p><strong>1. Reconhecimento da Pêntade de Reynolds:</strong></p>
  <ol>
    <li>Dor em hipocôndrio direito;</li>
    <li>Febre alta com calafrios (39,4°C);</li>
    <li>Icterícia acentuada;</li>
    <li><strong>Hipotensão arterial refratária / Choque Séptico</strong> (PA 75/40);</li>
    <li><strong>Alteração do estado mental / Confusão mental aguda</strong> (Glasgow 12);</li>
  </ol>
  <p><strong>2. Classificação de Gravidade (TG18):</strong> O paciente preenche múltiplos critérios de disfunção de órgãos (disfunção cardiovascular com choque, neurológica com rebaixamento, renal com creatinina &gt; 2,0, hepática com RNI &gt; 1,5 e hematológica com plaquetas &lt; 100.000). Trata-se de <strong>Colangite Aguda Grau III (Grave)</strong>.</p>
  <p><strong>3. Conduta Médica de Emergência Imediata:</strong></p>
  <ul>
    <li>Internação imediata em CTI e ressuscitação volêmica vigorosa com cristaloides balanceados guiada por metas de PAM &ge; 65 mmHg;</li>
    <li>Início imediato de <strong>Noradrenalina em infusão contínua</strong> para restauração da pressão de perfusão tecidual;</li>
    <li>Coleta imediata de duas hemoculturas e início imediato na primeira hora de <strong>Piperacilina-Tazobactam 4,5 g IV</strong>;</li>
    <li><strong>DESCOMPRESSÃO BILIAR DE EMERGÊNCIA IMEDIATA (&lt; 6 a 12 HORAS)</strong>: Paciente encaminhado com suporte intensivo e infusão de vasopressor para realização de <strong>CPRE de Urgência</strong>. Realizada canulação da papila sob sedação e colocação rápida de uma <strong>prótese plástica biliar (stent 10 French)</strong> transpondo o cálculo impactado, com saída imediata de 50 mL de bile francamente purulenta sob pressão ("pus em esguicho"). Não se perdeu tempo com tentativas laboriosas de extração do cálculo no paciente chocado. Em 12 horas pós-descompressão, o paciente apresentou defervescência térmica, melhora da consciência e desmame completo da noradrenalina.</li>
  </ul>
</div>

<div class="book-case">
  <h3>Caso Clínico 3: Coledocolitíase de Risco Intermediário e Papel da Colangiorressonância</h3>
  <p><strong>Identificação:</strong> Homem de 41 anos, com diagnóstico prévio de colelitíase assintomática, procura consulta ambulatorial após apresentar episódio autolimitado de dor epigástrica de 2 horas de duração há 3 dias, que cessou espontaneamente. Refere que a urina ficou levemente alaranjada por 24 horas, já normalizada.</p>
  <p><strong>Exames Laboratoriais:</strong> Bilirrubina Total de 2,2 mg/dL (BD 1,6 mg/dL). <strong>Fosfatase Alcalina: 290 U/L (VR &lt; 120), Gama-GT: 310 U/L (VR &lt; 50)</strong>. AST: 45 U/L, ALT: 55 U/L. Leucócitos: 6.200/$mm^3$.</p>
  <p><strong>Ultrassonografia de Abdome:</strong> Vesícula biliar de paredes finas contendo múltiplos cálculos móveis. <strong>Ducto colédoco com diâmetro limítrofe de 7 mm, sem cálculos conclusivos visualizados no seu interior</strong> devido à interposição gasosa duodenal.</p>
  
  <h4>Discussão Clínica Passo a Passo:</h4>
  <p><strong>1. Estratificação de Risco ASGE / SAGES:</strong></p>
  <ul>
    <li>O paciente apresenta preditores moderados: elevação de enzimas colestáticas (FA e GGT), BT entre 1,8 e 4,0 mg/dL e colédoco com 7 mm (&gt; 6 mm);</li>
    <li>Não apresenta nenhum preditor muito forte (não há cálculo visto, não há colangite e BT não é &gt; 4);</li>
    <li>Classifica-se no <strong>Grupo de RISCO INTERMEDIÁRIO (10% a 50% de probabilidade)</strong>;</li>
  </ul>
  <p><strong>2. Conduta Propedêutica Indicada:</strong></p>
  <ul>
    <li>É formalmente contraindicada a solicitação direta de CPRE (risco desnecessário de pancreatite de 10% para um exame que pode ser negativo);</li>
    <li>Indicada <strong>Colangiopancreatografia por Ressonância Magnética (CPRM)</strong>: o exame evidenciou a via biliar pérvia em toda a sua extensão, com colédoco de 6 mm e <em>ausência completa de cálculos intraluminais</em> (o cálculo provavelmente migrou e passou espontaneamente para o duodeno durante o episódio álgico prévio);</li>
    <li>Conduta definitiva: o paciente foi liberado para realizar <strong>Colecistectomia Videolaparoscópica Eletiva direta</strong>, sem necessidade de CPRE ou colangiografia intraoperatória de rotina.</li>
  </ul>
</div>

<div class="book-case">
  <h3>Caso Clínico 4: Coledocolitíase em Paciente com Gastrectomia em Y de Roux Prévia</h3>
  <p><strong>Identificação:</strong> Mulher de 62 anos, com histórico de gastrectomia subtotal com reconstrução em Y de Roux por adenocarcinoma gástrico precoce curado há 8 anos, dá entrada com dor em hipocôndrio direito, icterícia franca e febre de 38,6°C com calafrios.</p>
  <p><strong>Diagnóstico:</strong> Colangite aguda bacteriana associada a coledocolitíase confirmada por tomografia (colédoco de 13 mm com cálculo de 10 mm impactado no terço distal).</p>
  <p><strong>O Desafio Anatômico:</strong> O serviço de endoscopia tentou realizar CPRE tradicional, porém a anatomia cirúrgica prévia com alça jejunal exclusa em Y de Roux de 80 cm impediu o avanço do duodenoscópio até a papila duodenal maior (inacessibilidade anatômica por via retrógrada convencional).</p>
  
  <h4>Discussão Clínica Passo a Passo:</h4>
  <p><strong>1. Falha de Acesso por CPRE Convencional:</strong> A reconstrução em Y de Roux afasta a papila de Vater a mais de 100 cm da boca, tornando a CPRE padrão inviável na esmagadora maioria dos serviços de emergência (salvo em centros com enteroscopia assistida por balão, que consome tempo e tem taxa de sucesso variável);</p>
  <p><strong>2. Conduta Salvadora Imediata de Escolha:</strong> Como a paciente apresenta colangite aguda com febre e icterícia sob obstrução mecânica e a CPRE é anatomicamente inviável, a conduta de escolha de emergência é a <strong>Drenagem Biliar Trans-Hepática Percutânea (DTP)</strong> guiada por ultrassom e radioscopia;</p>
  <p><strong>3. Evolução:</strong> Realizada punção percutânea de ducto biliar intra-hepático direito com inserção de dreno biliar externo-interno 8,5 French, ultrapassando o cálculo e drenando a bile purulenta para bolsa externa e duodeno. A paciente evoluiu afebril em 24h, com queda rápida das bilirrubinas. Posteriormente, em procedimento eletivo de radiologia intervencionista percutânea com litotripsia a laser ou abordagem cirúrgica laparoscópica transgástrica assistida, o cálculo foi removido definitivamente com sucesso.</p>
</div>
`
    },
    {
      id: 'questoes-comentadas-residencia-coledocolitiase',
      title: '13. Questões Comentadas de Residência Médica e Revalida/ENAMED',
      body_html: `
<div class="book-case">
  <p><strong>Questão 1 (Residência Médica / ENARE / USP):</strong><br>
  Homem de 68 anos dá entrada no pronto-socorro com história de dor em cólica no hipocôndrio direito há 2 dias, que evoluiu nas últimas 24 horas com febre de 39,0°C, calafrios intensos e icterícia evidente nas escleras. Ao exame físico: PA: 125/80 mmHg, FC: 104 bpm, lúcido e orientado, abdome doloroso à palpação profunda no quadrante superior direito, sem sinais de peritonite difusa. Exames laboratoriais: leucócitos de 15.800/$mm^3$ com 8% de bastões, bilirrubina total de 4,8 mg/dL (BD 3,9 mg/dL), fosfatase alcalina de 420 U/L. A ultrassonografia revela múltiplos cálculos na vesícula e colédoco com 11 mm de diâmetro contendo cálculo hiperecogênico em seu interior. Qual é o diagnóstico clínico clássico da síndrome apresentada por este paciente e qual a conduta prioritária imediata?</p>
  
  <p>A) Colecistite aguda gangrenosa; indicar colecistectomia aberta de urgência nas primeiras 6 horas.<br>
  B) Colangite aguda bacteriana (Tríade de Charcot); iniciar antibioticoterapia venosa de amplo espectro e programar descompressão biliar por CPRE.<br>
  C) Abscesso hepático piogênico solitário; indicar drenagem percutânea guiada por TC e ceftriaxona.<br>
  D) Hepatite aguda colestática por vírus B; prescrever tenofovir e isolamento de contato.<br>
  E) Síndrome de Mirizzi tipo IV; realizar hepaticojejunostomia em Y de Roux de emergência.</p>
  
  <h4>Comentário Detalhado:</h4>
  <p><strong>Alternativa Correta: B.</strong></p>
  <ul>
    <li>O paciente apresenta a clássica <strong>Tríade de Charcot</strong>: 1. Dor no hipocôndrio direito; 2. Febre alta com calafrios; 3. Icterícia colestática evidente, fechando o diagnóstico clínico definitivo de <strong>Colangite Aguda Infecciosa</strong> secundária a coledocolitíase;</li>
    <li>O paciente encontra-se hemodinamicamente estável e lúcido (não apresenta choque nem confusão mental da Pêntade de Reynolds);</li>
    <li>A conduta prioritária estabelecida pelas diretrizes de Tóquio (TG18) consiste em internação imediata, coleta de hemoculturas, <strong>início precoce de antibioticoterapia venosa de amplo espectro</strong> (ex: Ceftriaxona + Metronidazol ou Piperacilina-Tazobactam) e <strong>Descompressão Biliar por CPRE com papilotomia e extração do cálculo</strong>;</li>
    <li>As outras alternativas trazem diagnósticos incompatíveis com a clínica e o achado ecográfico de coledocolitíase obstrutiva com icterícia e febre.</li>
  </ul>
</div>

<div class="book-case">
  <p><strong>Questão 2 (SUS-SP / Revalida INEP):</strong><br>
  Mulher de 52 anos procura ambulatório cirúrgico para avaliação de colelitíase diagnosticada em ultrassonografia de rotina. Ela relata que há 1 mês apresentou um único episódio de dor epigástrica moderada com duração de 1 hora, que melhorou espontaneamente. O exame físico atual é normal, anictérica. O perfil laboratorial colhido recentemente revela: Bilirrubina Total: 2,4 mg/dL (BD 1,8 mg/dL), Fosfatase Alcalina: 280 U/L (VR &lt; 120), Gama-GT: 320 U/L (VR &lt; 50), AST e ALT normais. A ultrassonografia mostra vesícula biliar de paredes finas com cálculos móveis e colédoco com calibre de 7,0 mm, sem cálculos visualizados. Segundo os critérios de estratificação de risco de coledocolitíase da ASGE/SAGES, qual é a classificação de probabilidade da paciente e a conduta recomendada?</p>
  
  <p>A) Alto risco (&gt; 50%); indicar CPRE pré-operatória imediata.<br>
  B) Baixo risco (&lt; 10%); indicar colecistectomia laparoscópica direta sem outros exames.<br>
  C) Risco intermediário (10% a 50%); solicitar Colangiorressonância Magnética (CPRM) ou realizar Colangiografia Intraoperatória (CIO) durante a colecistectomia.<br>
  D) Alto risco (&gt; 50%); indicar drenagem biliar percutânea trans-hepática.<br>
  E) Risco muito baixo; suspender a indicação cirúrgica e prescrever ácido ursodesoxicólico.</p>
  
  <h4>Comentário Detalhado:</h4>
  <p><strong>Alternativa Correta: C.</strong></p>
  <ul>
    <li>De acordo com a diretriz de consenso da <strong>ASGE/SAGES</strong>:
      <ul>
        <li>A paciente NÃO tem nenhum preditor muito forte (não há cálculo visto ao USG, não há colangite clínica e a BT não é &gt; 4 mg/dL);</li>
        <li>A paciente possui <strong>preditores moderados</strong>: enzimas colestáticas alteradas (FA e GGT elevadas), bilirrubina entre 1,8 e 4,0 mg/dL e colédoco dilatado &gt; 6 mm (7 mm);</li>
      </ul>
    </li>
    <li>Isso a classifica estritamente no grupo de <strong>Risco Intermediário (10% a 50% de probabilidade de coledocolitíase)</strong>;</li>
    <li>A conduta preconizada nesse grupo intermediário é a <strong>investigação complementar não invasiva da via biliar com Colangiorressonância (CPRM)</strong> pré-operatória ou Ecoendoscopia (EUS), ou realização de <strong>Colangiografia Intraoperatória (CIO)</strong> no momento da colecistectomia laparoscópica, evitando os riscos de uma CPRE fútil se o colédoco estiver limpo.</li>
  </ul>
</div>

<div class="book-case">
  <p><strong>Questão 3 (UNICAMP / Cirurgia Geral / ENARE):</strong><br>
  Paciente de 75 anos é admitido em choque séptico na sala vermelha da emergência com pressão arterial de 70/40 mmHg, frequência cardíaca de 138 bpm, temperatura axilar de 39,6°C com calafrios profusos, icterícia escleral intensa e sonolência com rebaixamento da consciência (Glasgow 11). Exame abdominal revela dor em hipocôndrio direito. A ultrassonografia evidencia coledocolitíase obstrutiva com dilatação acentuada da via biliar. Além da ressuscitação volêmica intensiva com cristaloides, início imediato de noradrenalina e antibioticoterapia parenteral de amplo espectro na primeira hora, qual é a intervenção prioritária e determinante para a redução da mortalidade deste paciente?</p>
  
  <p>A) Laparotomia exploradora mediana imediata com ressecção hepática anatômica.<br>
  B) Descompressão Biliar de Urgência Imediata por CPRE com passagem rápida de prótese biliar plástica descompressiva.<br>
  C) Hepaticojejunostomia em Y de Roux aberta sob anestesia geral profunda.<br>
  D) Colecistectomia laparoscópica precoce de urgência.<br>
  E) Manutenção de suporte clínico exclusivo em UTI aguardando estabilização clínica por 48 horas antes de qualquer procedimento biliar.</p>
  
  <h4>Comentário Detalhado:</h4>
  <p><strong>Alternativa Correta: B.</strong></p>
  <ul>
    <li>O paciente apresenta a <strong>Pêntade de Reynolds</strong> (dor em QSD + febre alta com calafrios + icterícia + choque séptico + confusão mental/coma), caracterizando <strong>Colangite Aguda Tóxica Supurativa / Grau III (Grave) de Tóquio</strong>;</li>
    <li>Nesse cenário catastrófico, a mortalidade é próxima de 100% se a hiperpressão na via biliar não for desfeita imediatamente;</li>
    <li>A conduta prioritária que salva a vida do paciente é a <strong>Descompressão Biliar de Emergência Imediata (&lt; 6 a 12 horas)</strong> por <strong>CPRE</strong>. O procedimento deve ser rápido e pragmático: canulação da via biliar e <strong>passagem de prótese biliar plástica (stent) ou dreno nasobiliar</strong> para descompressão imediata do pus represado, sem perder tempo tentando extrair cálculos difíceis;</li>
    <li>A cirurgia aberta tem mortalidade proibitiva (&gt; 50%) e a conduta expectante em UTI (alternativa E) é fatal.</li>
  </ul>
</div>

<div class="book-case">
  <p><strong>Questão 4 (USP-RP / Residência Médica):</strong><br>
  Em relação à fisiopatologia da litogênese biliar na via biliar principal, assinale a afirmativa cientificamente CORRETA sobre os cálculos primários do colédoco:</p>
  
  <p>A) Os cálculos primários do colédoco são compostos predominantemente por cristais de colesterol puro supersaturados pela enzima HMG-CoA redutase hepática.<br>
  B) Os cálculos primários formam-se em bile estéril e exibem consistência pétrea e densamente radiopaca ao raio-X simples em mais de 90% dos casos.<br>
  C) Os cálculos primários são quase exclusivamente cálculos pigmentares castanhos, formados "de novo" nos ductos biliares na presença de estase biliar e infecção bacteriana crônica associada à produção de beta-glicuronidase bacteriana.<br>
  D) A presença de cálculo primário no colédoco é uma indicação formal de colecistectomia simples sem necessidade de abordagem do esfíncter de Oddi.<br>
  E) A infestação por parasitas intestinais como Clonorchis sinensis previne a precipitação de bilirrubinato de cálcio no colédoco.</p>
  
  <h4>Comentário Detalhado:</h4>
  <p><strong>Alternativa Correta: C.</strong></p>
  <ul>
    <li>Os <strong>cálculos primários ("de novo") da via biliar principal</strong> são compostos por <strong>pigmento castanho (brown pigment stones)</strong>;</li>
    <li>Sua gênese decorre obrigatoriamente de <strong>estase biliar associada a infecção bacteriana</strong> por bactérias entéricas (<em>E. coli</em>, <em>Klebsiella</em>) que secretam a enzima <strong>beta-glicuronidase bacteriana</strong>. Essa enzima desconjuga o glicuronídeo de bilirrubina solúvel, liberando bilirrubina não conjugada livre que se precipita com cálcio formando bilirrubinato de cálcio associado a lipídios e muco bacteriano;</li>
    <li><em>Erro da A e B:</em> Cálculos de colesterol e pigmentares pretos formam-se na vesícula biliar (cálculos secundários);</li>
    <li><em>Erro da D:</em> A coledocolitíase primária exige correção da estase com papilotomia ou derivação biliodigestiva ampla;</li>
    <li><em>Erro da E:</em> O <em>Clonorchis sinensis</em> é um dos principais fatores predisponentes mundiais para litíase primária castanha.</li>
  </ul>
</div>

<div class="book-case">
  <p><strong>Questão 5 (IAMSPE / Cirurgia Geral):</strong><br>
  Durante a realização de uma colecistectomia videolaparoscópica com exploração do colédoco por coledocotomia supraduodenal para extração de múltiplos cálculos, o cirurgião opta por posicionar um Dreno de Kehr (tubo em T) na via biliar. Qual é o tempo mínimo pós-operatório recomendado para a retirada segura do Dreno de Kehr e qual exame deve ser realizado previamente à sua remoção?</p>
  
  <p>A) Retirada no 3º dia pós-operatório; não necessita de exame radiológico prévio se o paciente estiver afebril.<br>
  B) Retirada no 7º dia pós-operatório; realizar ultrassonografia abdominal transvaginal.<br>
  C) Retirada após no mínimo 14 a 21 dias (2 a 3 semanas) de pós-operatório; precedida de Colangiografia pelo Dreno de Kehr entre o 7º e 10º dia comprovando ausência de cálculos residuais e livre passagem de contraste ao duodeno.<br>
  D) Retirada após 6 meses de pós-operatório; precedida obrigatoriamente de ressonância magnética nuclear.<br>
  E) O dreno de Kehr é permanente e não deve ser removido em hipótese alguma.</p>
  
  <h4>Comentário Detalhado:</h4>
  <p><strong>Alternativa Correta: C.</strong></p>
  <ul>
    <li>O <strong>Dreno de Kehr (tubo em T)</strong> exige um tempo mínimo de permanência de <strong>14 a 21 dias (2 a 3 semanas)</strong> para ser sacado com segurança;</li>
    <li><em>Justificativa anatômica e cirúrgica:</em> Esse período é estritamente necessário para que a reação tecidual do organismo forme um <strong>trajeto fistuloso fibroso maduro e selado</strong> ao redor do dreno, comunicando a parede anterior do colédoco com a pele. Se o dreno for retirado precocemente antes de 14 dias, a bile extravasa livremente para a cavidade peritoneal através do orifício da coledocotomia que ainda não cicatrizou, deflagrando peritonite biliar grave (coleperitônio);</li>
    <li>Antes da remoção, realiza-se entre o 7º e 10º dia a <strong>Colangiografia pelo Tubo em T</strong> para documentar se a via biliar está pérvia, sem extravasamentos e sem cálculos residuais negligenciados.</li>
  </ul>
</div>

<div class="book-case">
  <p><strong>Questão 6 (ENAMED / AMRIGS):</strong><br>
  Em relação às diferenças semiológicas e fisiopatológicas entre a coledocolitíase e o adenocarcinoma de cabeça de pâncreas, assinale a afirmativa INCORRETA:</p>
  
  <p>A) Na coledocolitíase, a icterícia é tipicamente flutuante e intermitente devido ao efeito de válvula de esfera exercido pelo cálculo móvel na papila duodenal.<br>
  B) O adenocarcinoma de cabeça de pâncreas cursa com icterícia colestática progressiva e contínua associada à presença do Sinal de Courvoisier-Terrier.<br>
  C) O Sinal de Courvoisier-Terrier caracteriza-se pela palpação de uma vesícula biliar distendida, indolor e tensa em paciente com icterícia obstrutiva maligna.<br>
  D) A vesícula biliar do paciente com coledocolitíase crônica costuma distender-se maciçamente e ser facilmente palpável ao exame físico devido à alta complacência da parede vesicular inflamada.<br>
  E) Os níveis de bilirrubina total na coledocolitíase não complicada raramente ultrapassam 10 a 12 mg/dL, enquanto em neoplasias periampolares malignas frequentemente superam 15 a 20 mg/dL.</p>
  
  <h4>Comentário Detalhado:</h4>
  <p><strong>Alternativa Incorreta: D.</strong></p>
  <ul>
    <li>Na coledocolitíase, a vesícula biliar sofre inflamação litiásica crônica de repetição (colecistite crônica calculosa), desenvolvendo extensa proliferação de colágeno, espessamento fibroso e retração esclerótica (vesícula escleroatrófica). Por isso, <strong>a vesícula do paciente com coledocolitíase é INELÁSTICA E NÃO SE DISTENDE sob hipertensão biliar retrógrada, permanecendo IMPALPÁVEL ao exame físico</strong> (Princípio da Lei de Courvoisier-Terrier);</li>
    <li>Todas as demais alternativas (A, B, C e E) são cientificamente exatas e cobram semiologia comparativa de alto rendimento.</li>
  </ul>
</div>

<div class="book-case">
  <p><strong>Questão 7 (USP-SP / Residência Médica):</strong><br>
  Mulher de 38 anos é submetida a CPRE para tratamento de coledocolitíase. O procedimento é tecnicamente difícil, exigindo múltiplas tentativas de canulação da papila duodenal e injeções acidentais de contraste no ducto de Wirsung. Cerca de 6 horas após o término do exame, a paciente desenvolve dor epigástrica em barra de forte intensidade que irradia para o dorso, acompanhada de náuseas e vômitos. A amilase sérica dosada é de 1.450 U/L (VR &lt; 100) e a lipase de 2.100 U/L. Qual é a medida farmacológica profilática comprovada por diretrizes internacionais (ESGE / ASGE) que deveria ter sido administrada por via retal imediatamente antes ou após a CPRE para reduzir a incidência desta complicação?</p>
  
  <p>A) Omeprazol 80 mg intravenoso em bólus.<br>
  B) Octreotide 100 mcg subcutâneo a cada 8 horas.<br>
  C) Indometacina ou Diclofenaco 100 mg por via retal (supositório retal).<br>
  D) Gabexato mesilato em infusão contínua por 24 horas.<br>
  E) Alopurinol 300 mg oral 2 horas antes da sedação.</p>
  
  <h4>Comentário Detalhado:</h4>
  <p><strong>Alternativa Correta: C.</strong></p>
  <ul>
    <li>A <strong>Pancreatite Aguda Pós-CPRE (PEP)</strong> é a complicação mais frequente da CPRE (incidência de 5% a 10% em populações gerais e até 15% a 25% em pacientes de alto risco como mulheres jovens com suspeita de disfunção do esfíncter de Oddi);</li>
    <li>Múltiplos ensaios clínicos randomizados e metanálises de alto impacto demonstraram que a administração de <strong>Anti-inflamatórios Não Esteroidais (AINEs) por via retal — Indometacina 100 mg ou Diclofenaco 100 mg via retal imediatamente antes ou logo após a CPRE</strong> — reduz a incidência de pancreatite pós-CPRE em mais de 50%, além de atenuar a gravidade dos casos que se desenvolvem;</li>
    <li>O mecanismo protetor decorre da inibição precoce da fosfolipase A2 e da ciclooxigenase (COX), bloqueando a cascata inflamatória intrapancreática deflagrada pelo trauma mecânico papilar;</li>
    <li>Outra medida física essencial em procedimentos de alto risco é a passagem de um <strong>stent pancreático profilático temporário</strong> no ducto de Wirsung;</li>
    <li>Omeprazol, octreotide e inibidores de protease (gabexato) não demonstraram benefício clínico consistente nas diretrizes contemporâneas.</li>
  </ul>
</div>

<div class="book-case">
  <p><strong>Questão 8 (UNICAMP / Cirurgia do Aparelho Digestivo):</strong><br>
  Homem de 60 anos, previamente hígido, é internado com quadro de Pancreatite Aguda Biliar leve (Ranson 1). A ultrassonografia revela vesícula com microcálculos e colédoco de 5 mm sem cálculos residuais aparentes. O paciente evolui com melhora rápida da dor abdominal, tolerando dieta sólida no 3º dia de internação, com amilase e bilirrubinas normais. Qual é a conduta preconizada em relação ao momento da colecistectomia para este paciente?</p>
  
  <p>A) Alta hospitalar com agendamento da colecistectomia eletiva após 6 a 8 semanas para esfriar o pâncreas.<br>
  B) Colecistectomia videolaparoscópica durante a mesma internação hospitalar, antes da alta médica.<br>
  C) Realização de CPRE eletiva de rotina antes da alta hospitalar sem cirurgia.<br>
  D) Tratamento medicamentoso permanente com ácido ursodesoxicólico para dissolver os microcálculos.<br>
  E) Laparotomia exploradora com necrosectomia profilática do parênquima pancreático.</p>
  
  <h4>Comentário Detalhado:</h4>
  <p><strong>Alternativa Correta: B.</strong></p>
  <ul>
    <li>Na <strong>Pancreatite Aguda Biliar Leve</strong>, as diretrizes mundiais (International Association of Pancreatology - IAP / American Gastroenterological Association - AGA) determinam categoricamente que a <strong>Colecistectomia Videolaparoscópica deve ser realizada DURANTE A MESMA INTERNAÇÃO HOSPITALAR, antes da alta médica</strong> (logo que a dor cessar e a dieta for tolerada);</li>
    <li>Dar alta ao paciente com vesícula litiásica para operar tardiamente após semanas associa-se a uma taxa alarmante de <strong>recidiva de eventos biliares graves (nova pancreatite, colangite ou colecistite) em até 25% a 30% dos pacientes dentro dos primeiros 30 dias</strong>;</li>
    <li>A CPRE profilática de rotina (alternativa C) é contraindicada na ausência de colangite ou coledocolitíase persistente documentada.</li>
  </ul>
</div>

<div class="book-case">
  <p><strong>Questão 9 (Revalida INEP / Cirurgia Geral):</strong><br>
  Sobre o papel da CPRE na Pancreatite Aguda Biliar, assinale a indicação formal absoluta em que a CPRE de URGÊNCIA (nas primeiras 24 a 72 horas) está inquestionavelmente recomendada:</p>
  
  <p>A) Em todos os pacientes com pancreatite aguda biliar leve independentemente dos exames laboratoriais.<br>
  B) Na presença de Colangite Aguda Infecciosa associada ou evidência de obstrução mecânica persistente da via biliar com icterícia progressiva.<br>
  C) Apenas após a formação de pseudocisto pancreático com mais de 6 cm de diâmetro.<br>
  D) Para confirmação diagnóstica etiológica quando a amilase sérica for duvidosa.<br>
  E) Como procedimento de rotina pré-operatório obrigatório antes de qualquer colecistectomia laparoscópica.</p>
  
  <h4>Comentário Detalhado:</h4>
  <p><strong>Alternativa Correta: B.</strong></p>
  <ul>
    <li>O papel da CPRE de urgência na Pancreatite Aguda Biliar está estritamente restrito a duas condições mandatórias:
      <ol>
        <li><strong>Colangite Aguda Bacteriana Concomitante:</strong> Paciente com pancreatite associada a febre com calafrios, icterícia e dor (Tríade de Charcot) $\rightarrow$ CPRE urgente em &lt; 24h para descompressão biliar;</li>
        <li><strong>Obstrução Biliar Persistente Documentada:</strong> Cálculo impactado na ampola com icterícia progressiva acentuada e dilatação biliar significativa.</li>
      </ol>
    </li>
    <li>Na ausência de colangite ou coledocolitíase persistente, a CPRE de urgência NÃO melhora desfechos e aumenta o risco de complicações infecciosas secundárias da necrose pancreática.</li>
  </ul>
</div>

<div class="book-case">
  <p><strong>Questão 10 (USP / ENARE):</strong><br>
  Homem de 65 anos, submetido a colecistectomia aberta com coledocoduodenostomia látero-lateral há 10 anos por coledocolitíase primária recidivante, procura atendimento com episódios recorrentes de dor em hipocôndrio direito, icterícia leve e febre baixa nos últimos meses. A colangiorressonância revela que o segmento distal do colédoco (abaixo da anastomose cirúrgica) encontra-se dilatado, repleto de bile estagnada, detritos alimentares e cálculos pigmentares castanhos. Qual é a denominação clínica dessa complicação tardia clássica da coledocoduodenostomia?</p>
  
  <p>A) Síndrome de Bouveret.<br>
  B) Síndrome do Poço Cego (Sump Syndrome).<br>
  C) Síndrome de Mirizzi tipo V.<br>
  D) Síndrome de Lemmel.<br>
  E) Síndrome de Boerhaave.</p>
  
  <h4>Comentário Detalhado:</h4>
  <p><strong>Alternativa Correta: B.</strong></p>
  <ul>
    <li>A <strong>Síndrome do Poço Cego (Sump Syndrome)</strong> é uma complicação tardia clássica e bem conhecida da <em>coledocoduodenostomia látero-lateral</em>;</li>
    <li>Ao confeccionar a anastomose entre o colédoco supraduodenal e a primeira porção do duodeno, o segmento distal do colédoco (entre a anastomose e a papila de Vater) é transformado em um fundo cego estagnado ("sump" / poço cego);</li>
    <li>Com o tempo, detritos alimentares que refluem do duodeno, bile estagnada e bactérias acumulam-se nesse reservatório cego desprovido de fluxo ativo, formando barro biliar e cálculos primários que provocam microabscessos e episódios repetidos de colangite bacteriana;</li>
    <li>O tratamento de escolha é a <strong>Papilotomia Endoscópica por CPRE</strong> (abertura ampla da papila de Vater para permitir o esvaziamento gravitacional e lavagem do poço cego) ou conversão cirúrgica para Hepaticojejunostomia em Y de Roux.</li>
  </ul>
</div>
`
    },
    {
      id: 'pontos-chave-enamed-coledocolitiase',
      title: '14. Pontos de Alto Rendimento e Diretrizes Práticas de Memorização para o ENAMED',
      body_html: `
<h3>Os Dez Mandamentos da Coledocolitíase e Colangite para Concursos</h3>
<ul>
  <li><strong>1. Origem dos Cálculos:</strong> Secundários em &gt; 90% (migrados da vesícula, compostos por colesterol ou mistos, exigem colecistectomia posterior mandatória); Primários em &lt; 10% (formados "de novo" nos ductos por estase crônica e infecção por <strong>beta-glicuronidase bacteriana</strong>, compostos por pigmento castanho).</li>
  <li><strong>2. Icterícia Flutuante vs Sinal de Courvoisier-Terrier:</strong> Coledocolitíase = icterícia flutuante por efeito de válvula de esfera de Fenger, vesícula impalpável e retraída por fibrose crônica; Neoplasia periampolar (câncer de cabeça de pâncreas) = icterícia progressiva contínua + <strong>Sinal de Courvoisier-Terrier positivo</strong> (vesícula distendida palpável e indolor).</li>
  <li><strong>3. Algoritmo ASGE/SAGES de Coledocolitíase:</strong>
    <ul>
      <li><em>Alto Risco (&gt; 50%):</em> Cálculo visto ao USG, colangite clínica ou BT &gt; 4 associada a colédoco &gt; 6 mm $\rightarrow$ <strong>CPRE direta terapêutica</strong>;</li>
      <li><em>Risco Intermediário (10-50%):</em> FA/GGT elevadas, BT entre 1,8 e 4, colédoco &gt; 6 mm ou pancreatite prévia $\rightarrow$ <strong>CPRM (Colangiorressonância)</strong> pré-operatória ou Colangiografia Intraoperatória (CIO);</li>
      <li><em>Baixo Risco (&lt; 10%):</em> Sem preditores $\rightarrow$ <strong>Colecistectomia videolaparoscópica direta</strong> sem exames adicionais.</li>
    </ul>
  </li>
  <li><strong>4. Fisiopatologia da Colangite Aguda:</strong> Requer <strong>obstrução mecânica associada a hiperpressão intraductal (&gt; 20-25 cmH2O)</strong> e infecção bacteriana. A hiperpressão rompe junções de oclusão entre canalículos e sinusoides hepáticos, deflagrando o <strong>refluxo colângio-venoso</strong> e sepse.</li>
  <li><strong>5. Tríade de Charcot (Jean-Martin Charcot, 1877):</strong> 1. Dor em QSD + 2. Febre alta com calafrios + 3. Icterícia. Presente em 50% a 70% dos casos de colangite aguda.</li>
  <li><strong>6. Pêntade de Reynolds (B.M. Reynolds, 1959):</strong> Tríade de Charcot + <strong>Hipotensão arterial (Choque Séptico) + Alteração da consciência (Confusão mental/coma)</strong>. Sinal patognomônico de colangite aguda tóxica supurativa grave com mortalidade próxima a 100% sem descompressão!</li>
  <li><strong>7. Microbiologia Dominante:</strong> Bactérias entéricas gram-negativas: <strong>Escherichia coli (40-50%)</strong>, <em>Klebsiella pneumoniae</em> (15-25%), <em>Enterococcus</em> e anaeróbios estritos (<em>Bacteroides fragilis</em>).</li>
  <li><strong>8. Gravidade TG18 da Colangite:</strong> Grau I = leve; Grau II = moderada (leucócitos &gt; 12.000 ou &lt; 4.000, febre &ge; 39°C, idade &ge; 75 anos, BT &ge; 5, hipoalbumina); Grau III = grave com disfunção orgânica de órgãos vitais (choque com nora, Glasgow &lt; 15, PaO2/FiO2 &lt; 300, creatinina &gt; 2,0, RNI &gt; 1,5 ou plaquetas &lt; 100.000).</li>
  <li><strong>9. Descompressão Biliar de Urgência Imediata:</strong> No Grau III / Pêntade de Reynolds, a descompressão deve ser feita nas primeiras horas (&lt; 6 a 12h). <strong>Método padrão-ouro de 1ª escolha: CPRE com passagem de prótese biliar plástica (stent) descompressiva</strong>. Se CPRE inviável (ex: gastrectomia em Y de Roux): <strong>Drenagem Trans-Hepática Percutânea (DTP)</strong>. Cirurgia aberta é último recurso.</li>
  <li><strong>10. Dreno de Kehr (Tubo em T):</strong> Nunca retirar antes de <strong>14 a 21 dias (2 a 3 semanas)</strong> para permitir a formação de trajeto fistuloso fibroso maduro até a pele, prevenindo peritonite biliar (coleperitônio). Realizar colangiografia pelo dreno entre o 7º e 10º dia pós-operatório.</li>
</ul>
`
    }
  ],
  references: [
    {
      title: 'ASGE / SAGES — Guidelines on the Role of Endoscopy in the Evaluation and Management of Choledocholithiasis',
      url: 'https://www.giejournal.org/article/S0016-5107(18)33170-0/fulltext'
    },
    {
      title: 'Tokyo Guidelines 2018 (TG18/TG20) — Management of Acute Cholangitis and Cholecystitis',
      url: 'https://onlinelibrary.wiley.com/doi/10.1002/jhbp.512'
    },
    {
      title: 'Colégio Brasileiro de Cirurgiões (CBC) — Diretrizes de Conduta na Coledocolitíase e Colangite Aguda',
      url: 'https://cbc.org.br/'
    },
    {
      title: 'European Society of Gastrointestinal Endoscopy (ESGE) — Endoscopic Management of Common Bile Duct Stones',
      url: 'https://www.esge.com/guidelines/'
    },
    {
      title: 'Blumgart’s Surgery of the Liver, Biliary Tract and Pancreas, 7th Edition: Choledocholithiasis and Cholangitis',
      url: 'https://www.elsevier.com/books/blumgarts-surgery-of-the-liver-biliary-tract-and-pancreas/jarnagin/978-0-323-34062-5'
    }
  ]
};

const charCount = saveBook(book);
console.log(`[COLEDOCOLITIASE DONE] Total characters: ${charCount}`);
