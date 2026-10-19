// scripts/bloco-07-builders/build-156-part3.mjs

export const sec5 = {
  id: "linfoma-de-hodgkin-reed-sternberg-e-esclerose-nodular",
  title: "5. Linfoma de Hodgkin: Biologia das Células de Reed-Sternberg (CD15+ e CD30+), Subtipos Histológicos, Sintomas 'B' e Estadiamento de Ann Arbor",
  body_html: `
<h3>5.1 Epidemiologia e a Distribuição Bimodal Típica</h3>
<p>O <strong>Linfoma de Hodgkin (LH)</strong> representa cerca de 10% a 15% de todos os linfomas diagnosticados. Apresenta uma curva epidemiológica de distribuição etária <strong>bimodal característica</strong>:</p>
<ol>
  <li>O primeiro pico — de maior magnitude — ocorre em <strong>adultos jovens entre 15 e 35 anos de idade</strong> (sendo uma das neoplasias malignas mais comuns do adulto jovem no mundo ocidental);</li>
  <li>O segundo pico ocorre em <strong>idosos com mais de 55 a 60 anos</strong>, com histologias mais agressivas.</li>
</ol>
<p>Diferentemente dos linfomas não-Hodgkin, o linfoma de Hodgkin apresenta um padrão de disseminação linfática <strong>ordenado, previsível e contíguo por contiguidade anatômica</strong> ao longo das cadeias linfonodais adjacentes (do pescoço para o mediastino e daí para o abdome), com acometimento extranodal primário extraordinariamente raro.</p>

<h3>5.2 Histopatologia: A Célula Neoplásica Gigante de Reed-Sternberg</h3>
<p>O aspecto microscópico do Linfoma de Hodgkin é um dos fenômenos mais peculiares da patologia oncológica: <strong>as verdadeiras células tumorais clonais malignas representam menos de 1% a 2% de toda a massa tumoral palpável!</strong> Os 98% a 99% restantes da massa consistem em um infiltrado inflamatório e imune reativo policlonal exuberantíssimo (linfócitos T reativos, plasmócitos, eosinófilos abundantes, macrófagos, neutrófilos e bandas de fibrose colágena), recrutados ativamente pelas citocinas e quimiocinas secretadas pela célula neoplásica.</p>

<div class="clinical-box highlight">
  <h4>A Morfologia e a Imunofenotipagem da Célula de Reed-Sternberg (RS)</h4>
  <ul>
    <li><strong>Origem Biológica:</strong> Estudos moleculares comprovaram que a célula de Reed-Sternberg origina-se de um <strong>Linfócito B pré-apoptótico do centro germinativo do linfonodo</strong> que sofreu mutações somáticas hipervariáveis defeituosas (<em>crippled B-cell</em>), mas escapou da apoptose fisiológica pela ativação patológica da via antiapoptótica NF-kappa-B (frequentemente impulsionada pela infecção prévia do vírus Epstein-Barr - EBV).</li>
    <li><strong>Morfologia Citológica Clássica:</strong> Célula gigante multinucleada ou binucleada (com 20 a 50 micrômetros de diâmetro), apresentando núcleos em imagem espelhada ('núcleos gêmeos'), cromatina vesicular frouxa e <strong>nucléolos colossais eosinofílicos avermelhados</strong> circundados por um halo claro perinuclear, conferindo o aspecto clássico inconfundível de <strong>'Olhos de Coruja' (<em>Owl-eyes</em>)</strong>.</li>
    <li><strong>Célula Mononuclear de Hodgkin:</strong> Variante neoplásica com núcleo único gigante e nucléolo volumoso proeminente.</li>
    <li><strong>Perfil Imunofenotípico Obrigatório no Linfoma de Hodgkin Clássico:</strong>
      <br><strong>CD30 POSITIVO (100% dos casos / marcador de membrana e golgi)</strong>;
      <br><strong>CD15 POSITIVO (em 75-85% dos casos)</strong>;
      <br><strong>PAX5 fracamente positivo</strong>;
      <br><em>Geralmente NEGATIVO para CD45 (antígeno leucocitário comum) e NEGATIVO para CD20 clássico</em> (o linfócito B neoplásico perdeu a expressão normal de seus marcadores de superfície).
    </li>
  </ul>
</div>

<h3>5.3 Classificação Histopatológica do Linfoma de Hodgkin da OMS</h3>
<p>Divide-se em dois grandes grupos biológicos: o <strong>Linfoma de Hodgkin Clássico (LHC - 95% dos casos)</strong> e o raro <strong>Linfoma de Hodgkin com Predomínio Linfocítico Nodular (LHPLN - 5% dos casos)</strong>:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Subtipo Histológico</th>
      <th>Frequência</th>
      <th>Características Histológicas e Epidemiologia</th>
      <th>Prognóstico</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>1. Esclerose Nodular (EN)</strong></td>
      <td><strong>65% a 70% (O Mais Comum de Todos!)</strong></td>
      <td>
        - <strong>Subtipo mais frequente no mundo ocidental</strong>;<br>
        - Acomete predominantemente <strong>mulheres adultas jovens (15 a 35 anos)</strong>;<br>
        - <strong>Comprometimento mediastinal maciço em &gt; 80% dos casos</strong> (massa volumosa em mediastino anterior com tosse e dispneia);<br>
        - Histologia: Linfonodo subdividido em nódulos celulares por <strong>espessas bandas colágenas birrefringentes de fibrose acelular</strong>; presença da variante morfológica denominada <strong>Célula Lacunar</strong> (célula de RS cujo citoplasma se retrai durante a fixação em formalina, deixando um espaço vazio semelhante a uma lacuna).
      </td>
      <td><strong>Excelente prognóstico</strong> (altíssimas taxas de cura com quimioterapia ABVD + radioterapia).</td>
    </tr>
    <tr>
      <td><strong>2. Celularidade Mista (CM)</strong></td>
      <td>20% a 25% (2º mais comum)</td>
      <td>
        - Mais comum em <strong>homens idosos e indivíduos vivendo com HIV</strong> em países em desenvolvimento;<br>
        - <strong>Forte associação causal com o Vírus Epstein-Barr (EBV positivo em &gt; 70%)</strong>;<br>
        - Apresentação frequente com <strong>Sintomas 'B' sistêmicos intensos</strong> e doença abdominal/esplênica;<br>
        - Histologia: Infiltrado celular pleomórfico rico em eosinófilos, plasmócitos, neutrófilos e abundantes células de RS típicas, sem bandas fibrosas.
      </td>
      <td>Bom a intermediário.</td>
    </tr>
    <tr>
      <td><strong>3. Rico em Linfócitos (RL)</strong></td>
      <td>&lt; 5% (Raro)</td>
      <td>
        - Acomete homens de meia-idade; linfadenopatia periférica isolada cervical/axilar sem massa mediastinal grande;<br>
        - Histologia: Fundo microscópico composto quase exclusivamente por pequenos linfócitos maduros normais com raríssimas células de RS clássicas CD15+/CD30+.
      </td>
      <td>Excelente prognóstico.</td>
    </tr>
    <tr>
      <td><strong>4. Depleção Linfocitária (DL)</strong></td>
      <td>&lt; 1% (O Mais Raro)</td>
      <td>
        - Subtipo mais agressivo e de pior prognóstico;<br>
        - Idosos, desnutridos e pacientes com infecção avançada por HIV/aids;<br>
        - Histologia: Parênquima linfonodal desértico de linfócitos normais, preenchido por proliferação caótica de células de RS bizarras pleomórficas e necrose tecidual extensa; estágio IV habitual ao diagnóstico.
      </td>
      <td>Pior prognóstico do grupo clássico.</td>
    </tr>
    <tr>
      <td><strong>5. Predomínio Linfocítico Nodular (LHPLN)</strong></td>
      <td>~ 5% (Entidade Biológica Separada)</td>
      <td>
        - Doença indolente que não expressa CD15 nem CD30; <strong>expressa fortemente marcadores B normais: CD20+ e CD45+</strong>;<br>
        - Presença da célula neoplásica variante em <strong>'Pipoca' (<em>Popcorn cell</em> / Célula L&amp;H)</strong>;<br>
        - Tratamento semelhante a Linfoma Não-Hodgkin indolente (Rituximabe isolado ou associado a esquemas leves).
      </td>
      <td>Excelente sobrevida a longo prazo.</td>
    </tr>
  </tbody>
</table>

<h3>5.4 Quadro Clínico: Sintomas 'B', Prurido e o Sinal de Pel-Ebstein</h3>
<p>A apresentação clínica paradigmática do Linfoma de Hodgkin consiste no surgimento de <strong>Linfadenopatia periférica indolor, progressiva e de consistência elástica ou fibroelástica ('em borracha de apagar'), assimétrica e coalescente</strong>, localizada comumente em cadeias <strong>cervicais e supraclaviculares (em 60% a 80% dos pacientes)</strong>, axilares ou mediastinais à radiografia.</p>

<div class="clinical-box highlight">
  <h4>Manifestações Sistêmicas Cardinais do Linfoma de Hodgkin</h4>
  <ul>
    <li><strong>Os Sintomas 'B' Oficiais (Marcador de Estadiamento e Mau Prognóstico):</strong> A presença de <strong>pelo menos UM dos três sintomas a seguir define o sufixo 'B' no estadiamento</strong>, refletindo a liberação massiva de citocinas pró-inflamatórias (IL-1, IL-6 e TNF-alfa) pelo estroma tumoral:
      <ol>
        <li><strong>Febre Inexplicada:</strong> Temperatura axilar documentada $\ge 38,0$ ºC de caráter persistente ou recorrente sem foco infeccioso;</li>
        <li><strong>Sudorese Noturna Profusa:</strong> Sudorese intensa que obriga o paciente a acordar no meio da noite para trocar de pijama e lençol da cama;</li>
        <li><strong>Perda Ponderal Não Intencional:</strong> Redução &ge; 10% do peso corpóreo habitual nos últimos 6 meses precedentes ao diagnóstico.</li>
      </ol>
      <em>Nota importante:</em> Sintomas como astenia, fraqueza, anorexia ou prurido isolados <strong>NÃO configuram sintomas 'B'</strong> para fins de estadiamento formal!
    </li>
    <li><strong>Prurido Colestático / Sine Materia:</strong> Prurido cutâneo intratável e generalizado (sem lesões dermatológicas primárias além de escoriações por coçadura) decorrente da liberação de histamina e quimiocinas; pode preceder a adenomegalia em meses.</li>
    <li><strong>Sinal de Pel-Ebstein (Febre de Pel-Ebstein):</strong> Padrão clássico de febre cíclica: períodos de 1 a 2 semanas de febre alta diária seguidos por períodos de 1 a 2 semanas afebris espontâneos.</li>
    <li><strong>Dor Linfonodal Induzida por Ingestão Alcoólica:</strong> Raríssimo (ocorre em 2% a 5%), mas patognomônico de LH quando presente: o paciente refere dor aguda lancinante nos linfonodos acometidos imediatamente (poucos minutos) após ingerir mesmo pequenas doses de bebida alcoólica, por vasodilatação reflexa mediada por prostaglandinas nas cápsulas nodais tensas.</li>
  </ul>
</div>

<h3>5.5 Estadiamento Anatômico de Ann Arbor Modificado por Cotswolds</h3>
<p>O estadiamento do Linfoma de Hodgkin (e também utilizado nos Linfomas Não-Hodgkin) fundamenta-se na relação topográfica entre as cadeias linfonodais acometidas e o <strong>músculo diafragma</strong> como linha divisória anatômica mestre:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Estágio Ann Arbor</th>
      <th>Critérios Anatômicos de Comprometimento Tumoral</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Estágio I</strong></td>
      <td>Acometimento de uma <strong>única região linfonodal</strong> (ex.: apenas linfonodos cervicais esquerdos); OU acometimento localizado de um único sítio extranodal isolado (Estágio IE).</td>
    </tr>
    <tr>
      <td><strong>Estágio II</strong></td>
      <td>Acometimento de <strong>duas ou mais regiões linfonodais NO MESMO LADO DO DIAFRAGMA</strong> (ex.: linfonodos cervicais + axilares esquerdos; ou cervicais + mediastinais — todos acima do diafragma); OU acometimento contíguo localizado extranodal (IIE).</td>
    </tr>
    <tr>
      <td><strong>Estágio III</strong></td>
      <td>Acometimento de regiões linfonodais <strong>EM AMBOS OS LADOS DO DIAFRAGMA (acima E abaixo do diafragma)</strong> (ex.: linfonodos cervicais + linfonodos para-aórticos abdominais ou inguinais); pode envolver o baço (Estágio IIIS).</td>
    </tr>
    <tr>
      <td><strong>Estágio IV</strong></td>
      <td><strong>Disseminação hematogênica difusa ou multifocal para um ou mais órgãos ou tecidos extranodais</strong> além de linfonodos/baço (ex.: infiltração tumoral da <strong>medula óssea</strong>, múltiplos nódulos pulmonares, metástases hepáticas, ossos).</td>
    </tr>
  </tbody>
</table>
<p><em>Sufixos Obrigatórios de Ann Arbor:</em></p>
<ul>
  <li><strong>A:</strong> Ausência completa de sintomas constitucionais B (assintomático);</li>
  <li><strong>B:</strong> Presença de um ou mais sintomas B (febre &ge; 38ºC, sudorese noturna profusa ou perda de peso &ge; 10% em 6 meses);</li>
  <li><strong>X (Bulky disease / Massa Volumosa):</strong> Presença de massa linfonodal volumosa &ge; 10 cm de maior diâmetro; ou massa mediastinal que ocupa &gt; um terço do diâmetro torácico interno à radiografia;</li>
  <li><strong>E:</strong> Envolvimento extranodal localizado por contiguidade direta a partir de um linfonodo adjacente.</li>
</ul>

<p><em>Pilar Terapêutico Padrão:</em> Esquema <strong>ABVD</strong> (Doxorrubicina / Adriamicina, Bleomicina, Vinblastina e Dacarbazina) por 2 a 6 ciclos, guiado por <strong>PET-CT com FDG-18 intermediário (PET-2)</strong> para desescalonamento precoce; esquemas modernos associam anticorpo-droga conjugado anti-CD30 (<strong>Brentuximabe vedotina</strong>) ou inibidores de checkpoint imune anti-PD1 (<strong>Nivolumabe, Pembrolizumabe</strong>).</p>
`
};
