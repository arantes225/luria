// scripts/bloco-07-builders/build-156-part2.mjs

export const sec3 = {
  id: "leucemia-linfoide-aguda-lla-infantil-e-do-adulto",
  title: "3. Leucemia Linfoide Aguda (LLA): Particularidades Clínicas na Infância e no Adulto, Santuários Anatômicos e Estratificação de Risco",
  body_html: `
<h3>3.1 Epidemiologia e a Neoplasia Pediátrica Mais Comum</h3>
<p>A <strong>Leucemia Linfoide Aguda (LLA)</strong> é a <strong>neoplasia maligna mais frequente da faixa etária pediátrica</strong>, respondendo por aproximadamente 75% a 80% de todas as leucemias na infância e cerca de 25% de todos os cânceres pediátricos. Sua incidência máxima ocorre entre os <strong>2 e 5 anos de idade</strong>, com um segundo pico menor de incidência em idosos com mais de 65 anos. A grande maioria dos casos pediátricos (cerca de 85%) origina-se de precursores da linhagem linfoide B (LLA pré-B), enquanto 15% derivam da linhagem linfoide T (LLA-T).</p>

<p>Nas últimas cinco décadas, a LLA pediátrica tornou-se o maior paradigma de sucesso da história da oncologia clínica: as taxas de sobrevida livre de eventos e cura definitiva, que eram inferiores a 10% na década de 1960, ultrapassam <strong>90% das crianças tratadas atualmente com protocolos quimioterápicos contemporâneos baseados em estratificação de risco e doença residual mensurável (DRM / MRD)</strong>. Em contrapartida, a LLA no paciente adulto apresenta perfil biológico muito mais desfavorável, com taxas de cura que raramente ultrapassam 40% a 50% sem transplante alogênico de células-tronco hematopoéticas.</p>

<h3>3.2 Quadro Clínico e os 'Santuários Anatômicos' da LLA</h3>
<p>Além da clássica Síndrome de Insuficiência Medular (palidez cutânea, astenia, febre e manifestações hemorrágicas purpúricas), a LLA apresenta particularidades clínicas marcantes associadas à natureza biológica dos linfoblastos:</p>
<ul>
  <li><strong>Dores Ósseas e Artralgias Intensas:</strong> Presentes em mais de 50% das crianças ao diagnóstico, decorrentes da hipertrofia expansiva subperióstica e invasão cortical óssea pela proliferação dos linfoblastos. Frequentemente confunde-se erradamente com 'dores do crescimento', osteomielite ou Artrite Idiopática Juvenil (AIJ). <em>Armadilha diagnóstica clássica:</em> prescrever corticoide empírico para uma suposta 'artrite infantil', o que induz remissão parcial temporária da leucemia e atrasa catastroficamente o diagnóstico oncológico definitivo.</li>
  <li><strong>Linfadenomegalia Generalizada e Hepatoesplenomegalia Volumosa:</strong> Presentes em até 70% a 80% dos casos, decorrentes da infiltração de órgãos do sistema reticuloendotelial por linfoblastos.</li>
  <li><strong>Massa Mediastinal Anterior na LLA de Células T:</strong> A LLA da linhagem T acomete tipicamente adolescentes do sexo masculino, manifestando-se frequentemente com uma volumosa massa tímica em mediastino anterior associada a <strong>Síndrome da Veia Cava Superior (SVCS)</strong>: edema em escafandro (face e pescoço), turgência jugular patológica bilateral, estridor laríngeo, dispneia intensa e ortopneia. Configura emergência médica oncológica imediata!</li>
</ul>

<div class="clinical-box highlight">
  <h4>Os Dois Santuários Anatômicos da LLA: Barreira Hematoencefálica e Testículos</h4>
  <p>Os linfoblastos possuem capacidade biológica singular de se infiltrar em tecidos corporais isolados por barreiras imunológicas e endoteliais estritas — os chamados <strong>Santuários Anatômicos</strong> —, onde as concentrações dos quimioterápicos sistêmicos habituais não conseguem penetrar em níveis terapêuticos eficazes:</p>
  <ol>
    <li><strong>1. Sistema Nervoso Central (SNC):</strong> Infiltração das leptomeninges e líquor (leucemia meníngea). Manifesta-se como síndrome de hipertensão intracraniana (cefaleia matinal intensa, vômitos em jato, papiledema bilateral) ou paralisia isolada de pares cranianos (especialmente paralisia do VI e VII pares). <em>Prevenção e Tratamento Mandatório:</em> <strong>Quimioterapia Intratecal Profilática Universal</strong> (administração de metotrexato, citarabina e dexametasona diretamente no espaço subaracnóideo via punção lombar seriada) em todos os pacientes, mesmo que o líquor inicial seja normal! A ausência de profilaxia intratecal leva a taxas de recidiva no SNC superiores a 50%.</li>
    <li><strong>2. Testículos (Santuário Gonadal):</strong> Acomete meninos, manifestando-se clinicamente como <strong>aumento de volume testicular indolor, unilateral ou bilateral, de consistência pétrea e assimétrica</strong>, sem sinais flogísticos agudos. Trata-se de sítio clássico de recidiva tardia isolada pós-quimioterapia.</li>
  </ol>
</div>

<h3>3.3 Estratificação de Risco na LLA Pediátrica (Critérios do NCI / Rome Criteria)</h3>
<p>A intensidade do tratamento quimioterápico baseia-se na estratificação precoce em categorias de risco:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Parâmetro Clínico-Biológico</th>
      <th>Baixo / Risco Padrão (Excelente Prognóstico)</th>
      <th>Alto Risco (Prognóstico Desfavorável)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Faixa Etária ao Diagnóstico</strong></td>
      <td><strong>1 a 9 anos de idade completos</strong> (idade de ouro da LLA).</td>
      <td><strong>Lactentes menores de 1 ano</strong> (altíssima taxa de rearranjo gênico <em>KMT2A / MLL</em> com prognóstico sombrio) OU <strong>Adolescentes &ge; 10 anos</strong> e adultos.</td>
    </tr>
    <tr>
      <td><strong>Contagem Inicial de Leucócitos</strong></td>
      <td>Leucócitos basais <strong>&lt; 50.000/mm³</strong>.</td>
      <td>Hiperleucocitose inicial com <strong>leucócitos &ge; 50.000/mm³</strong>.</td>
    </tr>
    <tr>
      <td><strong>Linhagem Imunofenotípica</strong></td>
      <td>Linhagem B comum (CD10 positivo / antígeno CALLA positivo).</td>
      <td>Linhagem T (LLA-T) ou Linhagem B pró-B imatura (CD10 negativo).</td>
    </tr>
    <tr>
      <td><strong>Alterações Citogenéticas e Moleculares</strong></td>
      <td><strong>Hiperdiploidia maciça (&gt; 50 cromossomos)</strong> e translocação favorável <strong>t(12;21)(p13;q22) gerando a fusão ETV6-RUNX1 (TEL-AML1)</strong> (presente em 25% das crianças).</td>
      <td><strong>Hipodiploidia (&lt; 44 cromossomos)</strong>; rearranjo do gene <em>KMT2A (MLL)</em> em 11q23; e a temida presença do <strong>Cromossomo Filadélfia t(9;22) gene BCR-ABL1</strong> (presente em 3-5% das crianças, mas em até 25-30% dos adultos com LLA!).</td>
    </tr>
    <tr>
      <td><strong>Resposta Terapêutica Precoce</strong></td>
      <td>Boa resposta inicial aos corticoides no 8º dia de indução (&lt; 1.000 blastos/mm³ no sangue) e <strong>Doença Residual Mensurável (DRM) negativa por citometria de fluxo ao final da indução (D28)</strong>.</td>
      <td>Má resposta precoce aos corticoides no 8º dia e persistência de DRM positiva ao final da indução no 28º dia (indicação de escalonamento para transplante alogênico ou terapia celular com CAR-T cells).</td>
    </tr>
  </tbody>
</table>

<h3>3.4 Protocolos Modernos de Tratamento na LLA: Das Quimioterapias Clássicas à Imunoterapia Avançada</h3>
<p>O tratamento da LLA é dividido classicamente em quatro fases consecutivas ao longo de 2 a 2,5 anos:</p>
<ol>
  <li><strong>1. Fase de Indução de Remissão:</strong> Quatro a cinco drogas (Vincristina, Corticoide [Dexametasona ou Prednisona], L-Asparaginase e Antraciclina [Daunorrubicina]) associadas à terapia intratecal precoce, visando erradicar a massa blástica visível e restaurar a hematopoiese normal (atingir &lt; 5% de blastos na medula e DRM negativa).</li>
  <li><strong>2. Fase de Consolidação / Intensificação:</strong> Bloqueio com altas doses de Metotrexato (HD-MTX com resgate de ácido folínico/leucovorina) e Citarabina em altas doses para eliminar clones resistentes.</li>
  <li><strong>3. Terapia Direcionada ao SNC:</strong> Manutenção de quimioterapia intratecal periódica.</li>
  <li><strong>4. Fase de Manutenção:</strong> Quimioterapia oral ambulatorial contínua de baixa intensidade com 6-Mercaptopurina diária e Metotrexato semanal por 2 anos.</li>
</ol>
<p><em>Imunoterapias Revolucionárias na LLA B Recidivada/Refratária:</em> O advento do <strong>Blinatumomabe</strong> (anticorpo biespecífico BiTE que engaja receptores CD3 de linfócitos T aos antígenos CD19 dos linfoblastos B, induzindo lise imunológica direta), do <strong>Inotuzumabe ozogamicina</strong> (conjugado anti-CD22 ligado à caliqueamicina) e da terapia com <strong>Células CAR-T (Chimeric Antigen Receptor T-cell therapy - Tisagenlecleucel)</strong> redefiniu a sobrevida de pacientes previamente refratários.</p>
`
};

export const sec4 = {
  id: "leucemia-mieloide-cronica-lmc-e-leucemia-linfoide-cronica-llc",
  title: "4. As Leucemias Crônicas: Leucemia Mieloide Crônica (LMC) com Cromossomo Filadélfia e Leucemia Linfoide Crônica (LLC) com Estadiamentos de Rai e Binet",
  body_html: `
<h3>4.1 Leucemia Mieloide Crônica (LMC): O Triunfo da Oncologia de Precisão</h3>
<p>A <strong>Leucemia Mieloide Crônica (LMC)</strong> é uma neoplasia mieloproliferativa crônica clonal originada na célula-tronco hematopoética pluripotente. Acomete predominantemente adultos de meia-idade e idosos (idade mediana de 55 a 65 anos), com discreto predomínio masculino. O curso natural da doença divide-se em três fases sucessivas:</p>
<ol>
  <li><strong>Fase Crônica (FC - 85% a 90% dos diagnósticos):</strong> Fase indolente, com sintomas insidiosos de plenitude pós-prandial precoce por compressão gástrica, astenia, sudorese noturna e perda ponderal discreta; menos de 10% de blastos em medula e sangue.</li>
  <li><strong>Fase Acelerada (FA):</strong> Instalação progressiva de refratariedade ao tratamento, piora da esplenomegalia, plaquetopenia ou trombocitose persistente refratária, anemia progressiva, alterações citogenéticas clonais adicionais e contagem de blastos entre 10% e 19%.</li>
  <li><strong>Fase Blástica / Crise Blástica (CB):</strong> Transformação fulminante em leucemia aguda franca, definida pela presença de <strong>&ge; 20% de blastos</strong> na medula óssea ou sangue periférico, ou infiltração blástica extramedular (linfonodos, ossos). Cerca de 70% das crises blásticas são de linhagem mieloide e 30% são de linhagem linfoide (comprovando que a LMC origina-se da célula-tronco pluripotente mais primitiva!).</li>
</ol>

<div class="clinical-box highlight">
  <h4>A Genética da LMC: O Cromossomo Filadélfia e a Oncoproteína BCR-ABL1</h4>
  <ul>
    <li><strong>Descoberta Histórica:</strong> Descrito em 1960 em Filadélfia por Nowell e Hungerford, foi a primeira anomalia cromossômica recorrente associada de forma causal e inequívoca a um câncer na história da medicina.</li>
    <li><strong>Mecanismo Citogenético:</strong> <strong>Translocação cromossômica recíproca equilibrada entre os braços longos dos cromossomos 9 e 22: t(9;22)(q34;q11)</strong>. O braço longo do cromossomo 22 encurtado resultante dessa troca recebe a denominação de <strong>Cromossomo Filadélfia (Ph)</strong>, presente em &gt; 95% dos pacientes com LMC.</li>
    <li><strong>Fusão Gênica e Oncoproteína:</strong> A translocação justapõe o proto-oncogene tirosina-quinase <em>ABL1</em> (do cromossomo 9) à região do gene <em>BCR</em> (do cromossomo 22), gerando o oncogene de fusão quimérico <strong>BCR-ABL1</strong>. Esse gene codifica a proteína de fusão oncogênica <strong>p210 BCR-ABL1</strong>, dotada de <strong>atividade enzimática tirosina-quinase constitutivamente hiperativa e desregulada</strong>. Essa enzima fosforila continuamente cascatas proliferativas intracelulares (JAK-STAT, RAS-MAPK, PI3K-AKT), inibindo a apoptose e conferindo vantagem proliferativa maciça aos progenitores mieloides.</li>
  </ul>
</div>

<p><em>Quadro Hematológico Clássico da LMC:</em> <strong>Leucocitose neutrofílica exuberante</strong> (geralmente entre 50.000 e 500.000 leucócitos/mm³) acompanhada do chamado <strong>'Desvio à Esquerda Escalonado Completo'</strong> no sangue periférico: visualizam-se todas as etapas sequenciais da maturação mieloide em proporções harmônicas decrescentes (mieloblastos &lt; 5%, promielócitos, mielócitos, metamielócitos, bastonetes e neutrófilos segmentados exuberantes). Acompanha-se obrigatoriamente de <strong>Basofilia absoluta marcante</strong> (aumento sustentado de basófilos &ge; 2-3% é achado cardinal de LMC) e eosinofilia frequente, além de plaquetose inicial. O baço atinge dimensões colossais (<strong>esplenomegalia maciça</strong> ultrapassando a cicatriz umbilical e atingindo a fossa ilíaca direita).</p>

<div class="clinical-box highlight">
  <h4>A Revolução Terapêutica: Os Inibidores da Tirosina-Quinase (ITQ)</h4>
  <ul>
    <li><strong>Imatinibe (Glivec):</strong> Pequena molécula sintética projetada racionalmente para se encaixar com alta afinidade e especificidade no sítio de ligação de ATP da tirosina-quinase BCR-ABL1, bloqueando a transferência de fosfato e desligando os sinais proliferativos celulares. Transformou uma doença antes fatal (que exigia transplante medular precoce e cuja sobrevida média era de 3 a 5 anos) em uma condição crônica controlável por uso oral diário, com expectativa de vida idêntica à da população geral hígida!</li>
    <li><strong>ITQs de Segunda e Terceira Geração (Dasatinibe, Nilotinibe, Bosutinibe, Ponatinibe):</strong> Indicados para pacientes com falha terapêutica ou intolerância ao imatinibe, ou portadores de mutações de resistência (com destaque para a mutação de ponto <strong>T315I</strong>, a 'mutação guardiã' que confere resistência cruzada a todos os ITQs exceto o Ponatinibe).</li>
  </ul>
</div>

<h3>4.2 Leucemia Linfoide Crônica (LLC): A Neoplasia dos Idosos Indolentes</h3>
<p>A <strong>Leucemia Linfoide Crônica (LLC)</strong> é a leucemia mais comum no mundo ocidental, respondendo por cerca de 30% a 40% de todas as leucemias em adultos em países europeus e norte-americanos. É uma afecção quase exclusiva do idoso (idade mediana de 72 anos ao diagnóstico, sendo extremamente rara antes dos 40 anos), com predomínio de 2:1 no sexo masculino. Trata-se da proliferação e acúmulo clonal progressivo de <strong>pequenos linfócitos B maduros, imunoincompetentes e morfologicamente monoclonais</strong> no sangue periférico, medula óssea, baço e linfonodos.</p>

<p><em>Critério Diagnóstico Mandatório:</em> Presença de <strong>Linfocitose Absoluta no sangue periférico &ge; 5.000 linfócitos B clonais/mm³ (5 x 10⁹/L) sustentada por pelo menos 3 meses</strong>, com imunofenotipagem característica por citometria de fluxo: coexpressão anômala de marcadores B (CD19+, CD20+ fraco, CD23+) juntamente com o marcador de células T <strong>CD5+</strong> e restrição de cadeia leve de imunoglobulina (kappa ou lambda). Ao esfregaço de sangue periférico, observam-se linfócitos pequenos com cromatina nuclear densa em 'casca de tartaruga' e os clássicos <strong>Restos Nucleares de Gümprecht (Manchas de Gümprecht / <em>Smudge cells</em>)</strong>, que são núcleos celulares frágeis rompidos durante o espalhamento manual da lâmina.</p>

<div class="clinical-box highlight">
  <h4>Os Dois Sistemas Clássicos de Estadiamento Clínico da LLC: Rai e Binet (Essenciais em Concursos)</h4>
  <p>Os sistemas de Rai (EUA) e Binet (Europa) baseiam-se estritamente no exame físico segmentar e no hemograma para estimar a sobrevida e definir o momento exato de iniciar o tratamento:</p>

  <table class="book-table">
    <thead>
      <tr>
        <th>Estágio Rai</th>
        <th>Critérios Clínicos e Hematológicos</th>
        <th>Grupo de Risco</th>
        <th>Sobrevida Média</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Rai 0</strong></td>
        <td>Linfocitose isolada no sangue periférico (&ge; 5.000/mm³) e medula (&gt; 30%), sem linfadenopatia ou hepatoesplenomegalia; hemácias e plaquetas normais.</td>
        <td>Baixo Risco</td>
        <td>&gt; 12 a 15 anos</td>
      </tr>
      <tr>
        <td><strong>Rai I</strong></td>
        <td>Linfocitose associada a <strong>Linfadenomegalia</strong> palpável em qualquer sítio anatômico.</td>
        <td>Risco Intermediário</td>
        <td>~ 8 a 10 anos</td>
      </tr>
      <tr>
        <td><strong>Rai II</strong></td>
        <td>Linfocitose associada a <strong>Hepato e/ou Esplenomegalia</strong> (com ou sem linfadenomegalia).</td>
        <td>Risco Intermediário</td>
        <td>~ 5 a 7 anos</td>
      </tr>
      <tr>
        <td><strong>Rai III</strong></td>
        <td>Linfocitose associada a <strong>Anemia (Hemoglobina &lt; 11,0 g/dL)</strong> decorrente de ocupação medular.</td>
        <td>Alto Risco</td>
        <td>~ 2 a 3 anos (sem tratamento)</td>
      </tr>
      <tr>
        <td><strong>Rai IV</strong></td>
        <td>Linfocitose associada a <strong>Trombocitopenia (Plaquetas &lt; 100.000/mm³)</strong> por ocupação medular.</td>
        <td>Alto Risco</td>
        <td>~ 1 a 2 anos (sem tratamento)</td>
      </tr>
    </tbody>
  </table>

  <table class="book-table">
    <thead>
      <tr>
        <th>Estágio Binet</th>
        <th>Critérios Definidores (Envolvimento de 5 Áreas Linfoides: Cervical, Axilar, Inguinal, Fígado e Baço)</th>
        <th>Grupo de Risco</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Binet A</strong></td>
        <td>Hb &ge; 10 g/dL, Plaquetas &ge; 100.000/mm³ e <strong>menos de 3 áreas linfoides acometidas</strong> (0, 1 ou 2 áreas).</td>
        <td>Baixo Risco</td>
      </tr>
      <tr>
        <td><strong>Binet B</strong></td>
        <td>Hb &ge; 10 g/dL, Plaquetas &ge; 100.000/mm³ e <strong>3 ou mais áreas linfoides acometidas</strong> (3, 4 ou 5 áreas).</td>
        <td>Risco Intermediário</td>
      </tr>
      <tr>
        <td><strong>Binet C</strong></td>
        <td>Presença de <strong>Anemia (Hb &lt; 10,0 g/dL) OU Plaquetopenia (&lt; 100.000/mm³)</strong>, independente do número de áreas linfoides acometidas.</td>
        <td>Alto Risco</td>
      </tr>
    </tbody>
  </table>
</div>

<p><em>Conduta Terapêutica na LLC: A Filosofia do 'Watch and Wait' (Observar e Esperar):</em> <strong>Pacientes assintomáticos em estágios iniciais (Rai 0 a II / Binet A e B sem progressão rápida) NÃO DEVEM SER TRATADOS COM QUIMIOTERAPIA!</strong> Múltiplos ensaios clínicos demonstraram que iniciar tratamento precocemente no idoso assintomático com LLC não prolonga a sobrevida global e apenas acrescenta toxicidade farmacológica e infecções iatrogênicas. O tratamento é reservado exclusivamente para pacientes sintomáticos, com anemia/plaquetopenia progressivas (Rai III/IV / Binet C), esplenomegalia maciça sintomática ou duplicação rápida dos linfócitos em menos de 6 meses. O tratamento moderno utiliza inibidores de BTK (<strong>Ibrutinibe, Acalabrutinibe</strong>), inibidores de BCL-2 (<strong>Venetoclax</strong>) associados a anticorpos monoclonais anti-CD20 (<strong>Obinutuzumabe, Rituximabe</strong>).</p>

<p><em>Complicação Temida: A Síndrome de Richter:</em> Ocorre em 2% a 10% dos pacientes com LLC, caracterizada pela <strong>transformação histológica abrupta da LLC indolente em um Linfoma Não-Hodgkin de Grandes Células B agressivo fulminante</strong>, manifestando-se por crescimento galopante de um linfonodo isolado, febre alta diária, emagrecimento rápido e aumento desproporcional do LDH sérico.</p>
`
};
