import { saveBook } from './bloco-04-utils.mjs';

const book = {
  slug: 'bronquiolite-viral-aguda',
  title: 'Bronquiolite Viral Aguda',
  area: 'Pediatria',
  materia: 'Pneumologia Pediátrica e Medicina Intensiva',
  description: 'Tratado completo e aprofundado de Bronquiolite Viral Aguda (BVA) na infância: definição clínica clássica (primeiro episódio de sibilância e desconforto respiratório associado a pródromo catarral em lactentes menores de 2 anos, com pico de 2 a 6 meses); etiologia pelo Vírus Sincicial Respiratório (VSR em 60% a 80%), Rinovírus e Metapneumovírus; fisiopatologia minuciosa da necrose do epitélio ciliar dos bronquíolos terminais, edema inflamatório submucoso, debris intraluminais, mecanismo em "válvula de esfera", hiperinsuflação pulmonar difusa, atelectasias laminares e desequilíbrio ventilação/perfusão (V/Q) com hipoxemia e risco de SIADH; diagnóstico estritamente clínico e critérios de imagem/laboratório; escores de gravidade de Wood-Downes modificado e Escore de Tal; fatores de risco de hospitalização imediata (prematuridade < 37 semanas, idade < 6-12 semanas, cardiopatia congênita, displasia broncopulmonar); diretrizes terapêuticas SBP 2024 / AAP: o que FAZER (oxigenoterapia para SpO2 >= 90-92%, Cânula Nasal de Alto Fluxo - CNAF, lavagem nasal com SF 0,9% e hidratação cuidadosa por SNG) versus o que NÃO FAZER (contraindicação formal de broncodilatadores inalatórios rotineiros, contraindicação absoluta de corticoides sistêmicos, salina hipertônica 3% na emergência e antibióticos); profilaxia imunobiológica moderna com Palivizumabe, Nirsevimabe em dose única e vacina materna contra o VSR; casos clínicos detalhados e questões comentadas para o ENAMED e residência médica.',
  sections: [
    {
      id: 'definicao-conceito-epidemiologia-bva',
      title: '1. Definição Conceitual, Epidemiologia e Impacto na Saúde Pública',
      body_html: `
<h3>Definição Clínica Clássica de Bronquiolite Viral Aguda</h3>
<p>A Bronquiolite Viral Aguda (BVA) é classicamente definida pelo critério consensual de McConnochie (1983), referendado pelas diretrizes contemporâneas da <em>American Academy of Pediatrics (AAP)</em> e da Sociedade Brasileira de Pediatria (SBP):</p>
<div class="book-alert">
<p><strong>DEFINIÇÃO CLÍNICA CLÁSSICA DE BVA:</strong><br>
Trata-se do <strong>primeiro episódio de sibilância e/ou estertores crepitantes associado a desconforto respiratório agudo, precedido por pródromo infeccioso catarral de vias aéreas superiores (coriza, febre baixa e tosse), acometendo lactentes com idade menor de 2 anos (24 meses)</strong>.</p>
</div>

<p>Dois aspectos conceituais são decisivos para provas e para a prática clínica diária:</p>
<ol>
  <li><strong>Idade estritamente delimitada:</strong> A definição aplica-se exclusivamente a crianças com <strong>menos de 24 meses de vida</strong>, concentrando seu pico de incidência e de internação entre os <strong>2 e os 6 meses de idade</strong> (período de maior vulnerabilidade anatômica e declínio fisiológico dos anticorpos maternos transplacentários da classe IgG);</li>
  <li><strong>Primeiro episódio:</strong> Episódios subsequentes de sibilância em uma mesma criança deixam de ser denominados BVA e passam a ser classificados como <strong>"Lactente Sibilante Recorrente"</strong> ou asma em desenvolvimento, cuja fisiopatologia e resposta a broncodilatadores e corticoides inalatórios são distintas.</li>
</ol>

<h3>Epidemiologia e Sazonalidade no Brasil</h3>
<p>A BVA é a principal causa isolada de internação hospitalar no primeiro ano de vida em todo o planeta:</p>
<ul>
  <li>Estima-se que mais de <strong>90% a 95% de todas as crianças entrem em contato e se infectem pelo Vírus Sincicial Respiratório (VSR) até os 2 anos de idade</strong>, e aproximadamente 40% a 50% desenvolverão infecção de vias aéreas inferiores (bronquiolite ou pneumonia viral);</li>
  <li>Cerca de <strong>1% a 3% de todos os lactentes hígidos</strong> com menos de 1 ano de vida necessitam de hospitalização por BVA durante a estação sazonal anual; em populações de alto risco (prematuros extremos, portadores de displasia broncopulmonar ou cardiopatias congênitas), a taxa de internação hospitalar atinge alarmantes 15% a 30%;</li>
  <li><strong>Padrão Sazonal Brasileiro:</strong> Devido à extensão continental do Brasil, o Ministério da Saúde e a SBP identificam variações regionais marcantes na circulação sazonal do VSR:
    <ul>
      <li><strong>Regiões Sul, Sudeste e Centro-Oeste:</strong> Circulação viral predominantemente nos meses de <strong>outono e inverno (março a agosto)</strong>, com pico típico entre abril e junho;</li>
      <li><strong>Região Nordeste:</strong> Período sazonal prolongado coincidindo com a estação das chuvas (<strong>fevereiro a julho</strong>);</li>
      <li><strong>Região Norte:</strong> Padrão sazonal antecipado, iniciando no período chuvoso amazônico (<strong>janeiro a junho</strong>).</li>
    </ul>
  </li>
</ul>
`
    },
    {
      id: 'etiologia-virologia-vr-rinovirus',
      title: '2. Etiologia Viral: O Vírus Sincicial Respiratório e Outros Agentes',
      body_html: `
<h3>O Vírus Sincicial Respiratório (VSR): O Agente Predominante</h3>
<p>O <strong>Vírus Sincicial Respiratório (VSR)</strong>, pertencente à família <em>Pneumoviridae</em> (gênero <em>Orthopneumovirus</em>), é o agente etiológico primordial da bronquiolite viral aguda, isolado em <strong>60% a 80% de todos os casos clínicos confirmados</strong> e em mais de 80% das internações hospitalares em enfermarias e Unidades de Terapia Intensiva pediátricas.</p>
<p>Trata-se de um vírus envelopado de RNA fita simples senso negativo, dividido em dois grandes subgrupos antigênicos: <strong>VSR-A e VSR-B</strong>, que co-circulam nas comunidades em proporções variáveis ano a ano (com o subgrupo A frequentemente associado a quadros clínicos de maior gravidade respiratória).</p>

<p><strong>A Maquinaria Molecular do VSR e Proteínas Estruturais Críticas:</strong></p>
<table class="book-table">
  <thead>
    <tr>
      <th>Proteína Viral</th>
      <th>Localização e Estrutura</th>
      <th>Papel Patogênico e Relevância Terapêutica</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Glicoproteína F (Fusion Protein)</strong></td>
      <td>Espícula transmembrana na superfície do envelope viral; altamente conservada entre os subgrupos A e B.</td>
      <td>Promove a fusão do envelope viral com a membrana plasmática da célula epitelial do hospedeiro e, subsequentemente, induz a <strong>fusão de células epiteliais infectadas vizinhas, formando sincícios celulares multinucleados gigantes</strong> (origem do nome do vírus!). É o <strong>alvo molecular exclusivo dos anticorpos monoclonais neutralizantes profiláticos (Palivizumabe e Nirsevimabe) e das vacinas maternas</strong>. A conformação de pré-fusão (pre-F) é a forma antigênica mais potente para desencadear anticorpos protetores.</td>
    </tr>
    <tr>
      <td><strong>Glicoproteína G (Attachment Protein)</strong></td>
      <td>Espícula de superfície densamente glicosilada; altamente hipervariável entre as cepas.</td>
      <td>Responsável pela fixação e adesão primária do vírion aos receptores de glicosaminoglicanos da superfície das células ciliadas do trato respiratório. A hipervariabilidade da proteína G explica por que uma mesma criança pode ter reinfecções repetidas pelo VSR ao longo da vida, sem imunidade duradoura.</td>
    </tr>
    <tr>
      <td><strong>Proteína SH (Small Hydrophobic)</strong></td>
      <td>Proteína de membrana de canal iônico viral (viroporina).</td>
      <td>Inibe a apoptose da célula hospedeira infectada e bloqueia a sinalização inflamatória do TNF-&alpha;, prolongando a sobrevivência do vírus e a replicação intraluminal.</td>
    </tr>
  </tbody>
</table>

<h3>Outros Agentes Virais Envolvidos na BVA</h3>
<p>Embora o VSR seja o líder absoluto, outros patógenos respiratórios causam quadros clínicos de bronquiolite indistinguíveis:</p>
<ol>
  <li><strong>Rinovírus Humano (HRV):</strong> Segundo agente mais prevalente (15% a 25% dos casos), especialmente a espécie <strong>Rinovírus C (HRV-C)</strong>. É frequentemente isolado em lactentes mais velhos (&gt; 6 meses) e em crianças com predisposição atópica pessoal ou familiar, associando-se fortemente a sibilância recorrente e diagnóstico futuro de asma brônquica;</li>
  <li><strong>Metapneumovírus Humano (hMPV):</strong> Membro da família <em>Pneumoviridae</em> identificado em 5% a 10% dos casos; causa quadro idêntico ao VSR, podendo produzir bronquiolite grave em prematuros;</li>
  <li><strong>Vírus Parainfluenza (tipos 1, 2 e 3):</strong> O tipo 3 acomete vias aéreas inferiores provocando bronquiolite e broncopneumonia em lactentes jovens;</li>
  <li><strong>Bocavírus Humano (HBoV):</strong> Frequentemente detectado em coinfecções, com eliminação viral respiratória prolongada por semanas;</li>
  <li><strong>Vírus Influenza A e B:</strong> Cursam com febre mais alta, calafrios, toxemia sistêmica e risco de insuficiência respiratória hipoxêmica rápida;</li>
  <li><strong>Adenovírus Humano:</strong> Menos de 5% dos casos, porém associado a formas necrotizantes graves e sequelas pulmonares permanentes irreversíveis, como a <strong>Bronquiolite Obliterante pós-infecciosa (síndrome do pulmão hipertransparente unilateral / Síndrome de Swyer-James-MacLeod)</strong>.</li>
</ol>
<p><em>Coinfecções Virais:</em> A detecção simultânea de dois ou mais vírus respiratórios na nasofaringe (ex.: VSR + Rinovírus) ocorre em 15% a 30% dos lactentes hospitalizados. Embora existam controvérsias na literatura, a coinfecção viral geralmente duplica o risco de tempo prolongado de oxigenoterapia e de suporte ventilatório.</p>
`
    },
    {
      id: 'fisiopatologia-necrose-obstrucao-valvula-esfera',
      title: '3. Fisiopatologia: Da Necrose Ciliar à Obstrução em Válvula de Esfera',
      body_html: `
<h3>A Cascata Patológica nos Bronquíolos Terminais</h3>
<p>A fisiopatologia da BVA é uma obra-prima de lesão mecânica e inflamatória nos condutos aéreos de menor calibre do pulmão humano — os <strong>bronquíolos terminais e respiratórios (vias aéreas com diâmetro interno inferior a 1 a 2 mm, desprovidas de cartilagem de sustentação)</strong>:</p>

<ol>
  <li><strong>Inoculação e Propagação Centrípeta:</strong> O vírus replica-se inicialmente na mucosa do epitélio nasofaríngeo. Após 2 a 3 dias de incubação, dissemina-se distalmente ao longo da árvore respiratória através de aspiração de secreções e propagação célula a célula de sincícios até alcançar os bronquíolos terminais periféricos;</li>
  <li><strong>Reconhecimento por Receptores de Padrão (TLR-4) e Imunopatologia:</strong> O VSR liga-se a receptores Toll-like tipo 4 (TLR-4) nas células epiteliais e macrófagos alveolares, deflagrando a liberação massiva de quimiocinas potentes, destacando-se a <strong>Interleucina-8 (IL-8 / CXCL8)</strong>. Essa sinalização recruta ondas sucessivas de neutrófilos ativados para o parênquima pulmonar. Os neutrófilos sofrem morte por NETose, liberando redes extracelulares de DNA e histonas (NETs - <em>Neutrophil Extracellular Traps</em>), que se misturam ao muco e aumentam dramaticamente a viscosidade intraluminal;</li>
  <li><strong>Necrose Celular e Perda Ciliar:</strong> A replicação viral maciça provoca <strong>citólise direta e necrose focal das células epiteliais ciliadas</strong> do revestimento bronquiolar. Ocorre destruição do aparelho mucociliar, com perda irreversível da capacidade de depuração de muco e partículas para fora do pulmão;</li>
  <li><strong>Edema Inflamatório Submucoso e Hipersecreção de Mucinas:</strong> Ocorre hiperplasia de células caliciformes e secreção exuberante das mucinas MUC5AC e MUC5B. A infiltração peribronquiolar por linfócitos T e monócitos gera edema tecidual submucoso volumoso;</li>
  <li><strong>Acúmulo de Debris Celulares e Tampões de Muco:</strong> As células epiteliais necróticas e descamadas, associadas a leucócitos mortos, fibrina e secreção mucosa densa rica em DNA, desprendem-se para o interior do lúmen bronquiolar, formando <strong>rolhas de muco espesso e tampões intraluminais obstrutivos</strong>;</li>
  <li><strong>A Lei de Poiseuille e a Resistência da Via Aérea:</strong> De acordo com a física respiratória (Lei de Hagen-Poiseuille), a resistência ao fluxo aéreo em um conduto cilíndrico é inversamente proporcional ao raio elevado à quarta potência:
  <p style="text-align:center; font-weight:bold; font-size:1.1em;">Resistência &prop; 1 / Raio⁴</p>
  Em um lactente jovem, cujo bronquíolo terminal tem diâmetro normal de apenas 1 mm, um edema de apenas 0,2 mm na mucosa somado a rolhas intraluminais reduz o raio pela metade, <strong>aumentando a resistência da via aérea em nada menos que 16 VEZES</strong>! Em recém-nascidos e prematuros, esse aumento da resistência pode ultrapassar 30 vezes os valores basais.</li>
</ol>

<h3>O Mecanismo Obstrutivo em "Válvula de Esfera" (Ball-Valve Mechanism)</h3>
<p>A dinâmica ventilatória intratorácica explica o padrão radiológico e clínico clássico da bronquiolite:</p>
<ul>
  <li><strong>Durante a Inspiração:</strong> As forças de tração radial elástica do parênquima pulmonar e a pressão intrapleural negativa tracionam e dilatam passivamente os bronquíolos, permitindo que uma fração de ar consiga vencer a obstrução parcial e penetrar nos alvéolos distais;</li>
  <li><strong>Durante a Expiração:</strong> A pressão intrapleural torna-se positiva e os bronquíolos sofrem estreitamento fisiológico passivo. O lúmen já estenosado pelo edema e pelo muco <strong>colapsa completamente, bloqueando a saída do ar expiratório</strong>.</li>
</ul>
<p>Esse mecanismo de sentido único (permite entrada de ar, mas impede a saída) é denominado <strong>obstrução em válvula de esfera</strong> e deflagra duas consequências anatomopatológicas simultâneas:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Consequência Mecânica</th>
      <th>Mecanismo Fisiopatológico</th>
      <th>Achado Radiológico e Físico Típico</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Hiperinsuflação Pulmonar Difusa<br>(Aprisionamento Aéreo)</strong></td>
      <td>Obstrução bronquiolar parcial. O ar aprisionado progressivamente expande os alvéolos sob pressão.</td>
      <td>• Tórax em tonel / hiperinsuflado;<br>• <strong>Rebaixamento e retificação das cúpulas diafragmáticas</strong> (RX perfil e AP);<br>• Aumento dos espaços intercostais e horizontalização das costelas;<br>• Fígado e baço palpáveis abaixo do rebordo costal (por rebaixamento diafragmático mecânico, NÃO por hepatomegalia verdadeira!);<br>• Hipersonoridade à percussão torácica.</td>
    </tr>
    <tr>
      <td><strong>Atelectasias Laminares Subsegmentares</strong></td>
      <td>Obstrução bronquiolar total por tampão de muco. O ar alveolar residual é totalmente reabsorvido pela circulação capilar e o parênquima colapsa.</td>
      <td>• Opacidades lineares ou em faixa (atelectasias laminares);<br>• Desvio de estruturas mediastinais homolaterais se colapso lobar (frequente no lobo superior direito);<br>• <strong>Armadilha em provas:</strong> Frequentemente confundida com consolidação pneumônica bacteriana!.</td>
    </tr>
  </tbody>
</table>

<h3>Desequilíbrio Ventilação/Perfusão (V/Q Mismatch) e Risco de SIADH</h3>
<p>A heterogeneidade pulmonar (áreas hiperinsufladas com hipoperfusão e áreas atelectasiadas perfundidas sem ventilação — <em>efeito shunt intrapulmonar verdadeiro</em>) provoca <strong>hipoxemia arterial precoce e desproporcional</strong>. O lactente tenta compensar elevando a frequência respiratória (taquipneia) e recrutando a musculatura acessória (tiragens intercostais, subcostais, retração de fúrcula e batimento de asa de nariz).</p>
<p>A musculatura diafragmática do lactente jovem é biologicamente imatura: enquanto o diafragma do adulto possui cerca de 50% a 55% de fibras musculares oxidativas tipo I (de contração lenta e altamente resistentes à fadiga), o diafragma do recém-nascido e lactente possui apenas <strong>10% a 25% de fibras tipo I</strong>, sendo predominantemente constituído por fibras tipo II (de contração rápida e facilmente fatigáveis). Quando as reservas de glicogênio muscular se esgotam sob trabalho respiratório sustentado, surge a <strong>fadiga diafragmática com hipoventilação alveolar, hipercapnia progressiva e acidose respiratória mista</strong>.</p>
<p><em>Atenção especial à SIADH:</em> O estresse hipóxico agudo, as pressões intratorácicas alteradas e o esforço ventilatório estimulam a liberação não osmótica exacerbada de Hormônio Antidiurético (ADH / Vasopressina) pela neuro-hipófise, deflagrando a <strong>Síndrome da Secreção Inapropriada de ADH (SIADH)</strong> em lactentes graves, com risco de hiponatremia hipoosmolar grave e edema cerebral se submetidos a sobrecarga hídrica hipotônica venosa inadvertida!</p>
`
    },
    {
      id: 'quadro-clinico-evolucao-semiologia-pulmonar',
      title: '4. Manifestações Clínicas, Evolução Temporal e Semiologia Pulmonar',
      body_html: `
<h3>A História Natural Típica: O Curso Trifásico da Doença</h3>
<p>O quadro clínico da BVA segue uma evolução temporal clássica e reprodutível, cujo reconhecimento previne condutas diagnósticas precipitadas:</p>

<ol>
  <li><strong>Fase Prodrômica Catarral (Dias 1 a 3):</strong>
    <ul>
      <li>Inicia-se com sinais típicos de infecção viral de vias aéreas superiores: espirros repetidos, obstrução nasal e coriza serosa/hialina abundante ("nariz escorrendo");</li>
      <li>Febre de baixa intensidade ou moderada (geralmente entre 37,8°C e 38,5°C); cerca de 30% dos lactentes cursam totalmente afebris;</li>
      <li>Apetite discretamente reduzido pela dificuldade de conciliar a respiração nasal com a mamada;</li>
    </ul>
  </li>
  <li><strong>Fase de Acometimento de Vias Aéreas Inferiores e Pico dos Sintomas (Dias 3 a 5):</strong>
    <ul>
      <li>A tosse seca inicial torna-se mais frequente, intensa e paroxística;</li>
      <li>Aparecimento súbito ou progressivo de <strong>taquipneia</strong> (elevação da frequência respiratória acima dos limites etários de corte);</li>
      <li>Surgimento de <strong>sinais de esforço respiratório por recrutamento muscular acessório</strong>: tiragem subcostal (afundamento da parede abdominal inferior), tiragem intercostal, retração de fúrcula esternal e batimento de asas nasais (BAN);</li>
      <li>Dificuldade alimentar evidente: o lactente solta o seio materno ou bico da mamadeira repetidamente para respirar, tosse durante as deglutições e apresenta engasgos frequentes com vômitos pós-prandiais, levando ao risco iminente de desidratação;</li>
      <li><strong>O 4º e o 5º dia de doença correspondem quase invariavelmente ao PICO DA GRAVIDADE clínica</strong>. Alertar os pais de que a piora respiratória no 3º ao 5º dia faz parte da história natural do VSR e não indica necessariamente superinfecção bacteriana;</li>
    </ul>
  </li>
  <li><strong>Fase de Convalescença e Resolução (Dias 6 a 14-21):</strong>
    <ul>
      <li>Resolução progressiva da taquipneia, da febre e do esforço respiratório em torno de 7 a 10 dias na grande maioria dos casos;</li>
      <li>A tosse residual pós-infecciosa e ruídos respiratórios esparsos podem persistir por <strong>duas a três semanas completas</strong> até a regeneração biológica definitiva dos cílios do epitélio bronquiolar.</li>
    </ul>
  </li>
</ol>

<h3>Semiologia do Aparelho Respiratório na BVA</h3>
<p>O exame físico pulmonar do lactente com bronquiolite fornece achados semiológicos de alto valor:</p>
<table class="book-table">
  <thead>
    <tr>
      <th>Etapa do Exame Físico</th>
      <th>Achados Físicos Típicos na BVA</th>
      <th>Interpretação Fisiopatológica</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Inspeção Estática e Dinâmica</strong></td>
      <td>• Tórax globoso e hiperinsuflado;<br>• Taquipneia marcante;<br>• <strong>Báscula toracoabdominal (respiração paradoxal):</strong> dissincronia entre expansão torácica e abdominal, indicando fadiga iminente do diafragma;<br>• Tiragens subcostais e intercostais severas;<br>• Batimento de asas de nariz;<br>• <strong>Gemência expiratória:</strong> esforço das cordas vocais para manter a PEEP fisiológica alveolar.</td>
      <td>Aumento da capacidade residual funcional e sobrecarga extrema dos músculos da respiração para vencer a alta resistência bronquiolar de Poiseuille.</td>
    </tr>
    <tr>
      <td><strong>Palpação e Percussão</strong></td>
      <td>• Fígado e baço palpáveis a 2-3 cm do rebordo costal;<br>• Hipersonoridade difusa à percussão torácica;<br>• Redução da mobilidade diafragmática.</td>
      <td>Rebaixamento forçado das cúpulas frênicas pelo aprisionamento gasoso alveolar difuso (pseudo-hepatomegalia).</td>
    </tr>
    <tr>
      <td><strong>Ausculta Pulmonar</strong></td>
      <td>• <strong>Tempo expiratório marcadamente prolongado</strong> (a expiração torna-se ativa e demorada para esvaziar os pulmões);<br>• <strong>Estertores crepitantes finos (subcrepitantes) bilaterais difusos:</strong> audíveis no final da inspiração e início da expiração em ambas as bases e campos médios;<br>• <strong>Sibilos tele-expiratórios e polifônicos:</strong> ruídos agudos disseminados gerados pela passagem do ar por vias aéreas colabadas;<br>• <strong>Redução do murmúrio vesicular:</strong> áreas de "silêncio respiratório" por hipoventilação grave.</td>
      <td>Os estertores finos decorrem da abertura súbita de bronquíolos ocluídos por exsudato purulento e muco; os sibilos refletem o broncoespasmo relativo e a estenose mecânica intraluminal.</td>
    </tr>
  </tbody>
</table>

<h3>Armadilha Semiológica: Roncos de Transmissão vs Sibilos Verdadeiros</h3>
<p>Um dos erros semiológicos mais habituais do médico recém-formado é confundir <strong>roncos de transmissão de vias aéreas superiores com sibilos bronquiolares verdadeiros</strong>. O lactente com resfriado acumula secreção mucopurulenta espessa na nasofaringe; ao respirar, essa secreção vibra e transmite ruídos rudes e graves para todo o arcabouço torácico. Para diferenciá-los com segurança:</p>
<ul>
  <li>Realizar <strong>lavagem nasal abundante com SF 0,9% e aspiração suave das narinas</strong> antes de realizar a ausculta pulmonar definitiva;</li>
  <li>Os roncos de transmissão modificam-se ou desaparecem completamente após a tosse ou lavagem nasal, enquanto os estertores crepitantes finos e os sibilos intratorácicos da bronquiolite persistem inalterados.</li>
</ul>

<h3>A Apneia do Lactente Jovem: Um Sinal de Alarme Específico</h3>
<p>Em recém-nascidos e lactentes muito jovens com <strong>menos de 2 meses de vida</strong> (especialmente prematuros), a infecção pelo VSR pode manifestar-se primariamente como <strong>episódios súbitos de apneia central presenciada</strong> (pausa respiratória prolongada superior a 20 segundos ou associada a cianose e bradicardia), <em>mesmo antes do aparecimento da tosse ou dos sibilos respiratórios</em>. O VSR penetra no sistema nervoso central através de transporte retrógrado pelos neurônios sensitivos do nervo vago e desregula os centros respiratórios bulbares, constituindo indicação absoluta de internação com monitorização cardiorrespiratória contínua.</p>
`
    },
    {
      id: 'diagnostico-estritamente-clinico-e-exames-complementares',
      title: '5. Diagnóstico Estritamente Clínico e Uso Racional de Exames Complementares',
      body_html: `
<h3>O Princípio da Abordagem Conservadora: O Diagnóstico é Clínico!</h3>
<p>Todas as diretrizes internacionais contemporâneas (AAP, SBP, NICE britânico e Sociedade Espanhola de Pediatria) são taxativas e unânimes:</p>
<div class="book-alert">
<p><strong>REGRA FUNDAMENTAL PARA O ENAMED:</strong><br>
O diagnóstico da Bronquiolite Viral Aguda é <strong>ESTRITAMENTE CLÍNICO</strong>, baseado na anamnese (primeiro episódio em lactente &lt; 2 anos precedido de coriza/tosse) e no exame físico detalhado (taquipneia, estertores crepitantes bilaterais e sibilos). <strong>Nenhum exame laboratorial ou de imagem é necessário para o diagnóstico ou manejo da apresentação clássica leve a moderada!</strong></p>
</div>

<h3>Radiografia de Tórax: Quando Solicitar e Quando Evitar?</h3>
<p>A solicitação indiscriminada de radiografias de tórax em lactentes com bronquiolite clássica é uma das falhas assistenciais mais comuns no pronto-socorro infantil. A literatura demonstra que a realização do raio-X não altera o desfecho clínico nem reduz o tempo de internação, mas <strong>aumenta em até cinco vezes a prescrição inadequada de antibióticos</strong> (porque o médico interpreta atelectasias laminares como consolidações bacterianas!).</p>

<p><strong>Quando a Radiografia de Tórax é Formalmente Indicada?</strong></p>
<ul>
  <li>Dúvida diagnóstica substancial ou apresentação clínica atípica (ex.: ausência total de sintomas de vias aéreas superiores prévios);</li>
  <li>Lactente com desconforto respiratório grave necessitando de suporte em UTI pediátrica ou intubação traqueal iminente;</li>
  <li>Piora clínica rápida, abrupta ou inexplicável da mecânica respiratória (suspeita de pneumotórax secundário ao barotrauma do aprisionamento de ar);</li>
  <li>Febre muito elevada (&ge; 39,5°C) associada a toxemia sistêmica grave e prostração incomum para infecção viral pura;</li>
  <li>Presença de comorbidades prévias graves (cardiopatia congênita, displasia broncopulmonar).</li>
</ul>

<p><strong>Achados Radiológicos Típicos da BVA:</strong></p>
<ol>
  <li><strong>Sinais de Hiperinsuflação Pulmonar Difusa:</strong> Retificação e rebaixamento das cúpulas diafragmáticas (visualização de mais de 8 a 9 arcos costais posteriores na radiografia em AP), aumento dos espaços intercostais, hipertransparência difusa dos campos pulmonares e aumento do espaço aéreo retroesternal no perfil;</li>
  <li><strong>Infiltrado Intersticial e Peribroncovascular:</strong> Espessamento das paredes brônquicas ("sinal do manguito peribrônquico" ou traves densas irradiando a partir dos hilos pulmonares);</li>
  <li><strong>Atelectasias Laminares Subsegmentares:</strong> Opacidades densas, lineares, de contornos nítidos, com redução volumétrica local (frequentemente observadas no lobo superior direito ou nos segmentos basais posteriores).</li>
</ol>

<h3>Pesquisa Viral na Secreção Nasofaríngea (Painel Molecular por RT-PCR)</h3>
<p>O teste rápido imunocromatográfico de antígeno ou o painel molecular multiplex por RT-PCR em aspirado/swab de nasofaringe confirma a presença do VSR, Rinovírus e outros patógenos:</p>
<ul>
  <li><strong>No atendimento ambulatorial:</strong> Totalmente <strong>dispensável</strong>, pois o resultado positivo não modifica a conduta médica de suporte;</li>
  <li><strong>No ambiente hospitalar / Enfermaria de internação:</strong> <strong>Altamente recomendado</strong> para fins de <strong>controle de infecção hospitalar, vigilância epidemiológica e isolamento de coorte</strong> (agrupar pacientes infectados pelo mesmo vírus em enfermarias compartilhadas, prevenindo a transmissão nosocomial cruzada para lactentes com outros vírus ou cardiopatas).</li>
</ul>

<h3>Hemograma e Proteína C Reativa (PCR sérica)</h3>
<p>Rotineiramente <strong>dispensáveis</strong>. O hemograma no VSR pode apresentar leucocitose discreta com linfocitose ou neutrofilia relativa, e a PCR sérica pode estar levemente elevada em virtude da destruição celular inflamatória bronquiolar. Esses marcadores não conseguem discriminar infecção viral pura de superinfecção bacteriana e não devem guiar o início de antibióticos.</p>

<h3>Gasometria Arterial ou Venosa</h3>
<p>Indicada exclusivamente para pacientes admitidos em terapia intensiva ou com insuficiência respiratória grave com sinais de fadiga diafragmática, avaliando a presença de acidose respiratória (pH &lt; 7,25 e pCO2 &gt; 50-60 mmHg), orientando a necessidade de suporte ventilatório não invasivo (VNI) ou invasivo.</p>
`
    },
    {
      id: 'estratificacao-gravidade-indicacoes-hospitalizacao',
      title: '6. Escores Clínicos de Gravidade (Wood-Downes e Tal) e Fatores de Risco de Hospitalização',
      body_html: `
<h3>Estratificação de Gravidade Clínica</h3>
<p>A avaliação da gravidade do lactente com bronquiolite deve ser dinâmica e repetida ao longo da permanência na unidade de saúde, pois a doença é altamente flutuante nas primeiras 48 a 72 horas. A SBP e a AAP categorizam a BVA em três níveis:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Classificação de Gravidade</th>
      <th>Parâmetros Clínicos, Frequência Respiratória e Oximetria</th>
      <th>Local de Cuidado Recomendado</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>BVA Leve</strong></td>
      <td>• Frequência respiratória normal ou discretamente elevada para a idade;<br>• Tiragens torácicas ausentes ou intercostais leves ocasionais;<br>• <strong>Saturação de Oxigênio (SpO2) &ge; 92% em ar ambiente</strong>;<br>• Aceitação alimentar preservada (&gt; 75% do habitual), sem engasgos;<br>• Criança ativa, sorridente e interagindo bem no colo materno.</td>
      <td><strong>Tratamento Ambulatorial / Domiciliar</strong> com lavagem nasal frequente, hidratação oral e orientações rigorosas de sinais de alarme para retorno imediato.</td>
    </tr>
    <tr>
      <td><strong>BVA Moderada</strong></td>
      <td>• <strong>Taquipneia evidente</strong> (FR entre 50 e 70 irpm);<br>• Tiragens subcostais e intercostais evidentes e contínuas, batimento de asa de nariz leve;<br>• <strong>SpO2 no limite inferior (entre 90% e 92% em ar ambiente)</strong>;<br>• Redução moderada da ingestão de líquidos/leite (aceitação de 50% a 75% do habitual);<br>• Irritabilidade alternada com períodos de sonolência.</td>
      <td><strong>Observação em Pronto-Socorro Infantil por 6 a 12 horas</strong> para suporte de oxigênio, lavagem nasal e teste de alimentação. Se mantiver estabilidade e SpO2 &gt; 92%, pode ter alta; se persistir com esforço, internar em enfermaria.</td>
    </tr>
    <tr>
      <td><strong>BVA Grave / Insuficiência Respiratória</strong></td>
      <td>• <strong>Taquipneia severa (FR &gt; 70 irpm) ou Bradipneia com esforço ineficaz</strong>;<br>• Tiragens severas com retração de fúrcula, gemência expiratória audível sem estetoscópio e <strong>báscula toracoabdominal (respiração paradoxal)</strong>;<br>• <strong>SpO2 &lt; 90% em ar ambiente de forma persistente</strong>;<br>• Presença de <strong>apneias presenciadas</strong> ou episódios de cianose central;<br>• Recusa alimentar quase total (&lt; 50% do habitual) e sinais de desidratação clínica;<br>• Letargia, sonolência excessiva, torpor ou agitação extrema.</td>
      <td><strong>Internação Hospitalar Imediata em Enfermaria Pediátrica ou Leito de UTI Pediátrica</strong> com suporte de oxigenoterapia de fluxo otimizado (CNAF) e monitorização contínua.</td>
    </tr>
  </tbody>
</table>

<h3>Escores Validados de Avaliação Clínica</h3>
<p>Em pesquisas clínicas e protocolos de UTIP, dois escores são amplamente utilizados:</p>

<h3>1. Escore de Wood-Downes Modificado por Ferrés</h3>
<table class="book-table">
  <thead>
    <tr>
      <th>Parâmetro</th>
      <th>0 pontos</th>
      <th>1 ponto</th>
      <th>2 pontos</th>
      <th>3 pontos</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Sibilos</strong></td>
      <td>Ausentes</td>
      <td>Fim da expiração</td>
      <td>Toda a expiração</td>
      <td>Inspiração e expiração (ou silêncio)</td>
    </tr>
    <tr>
      <td><strong>Tiragem</strong></td>
      <td>Ausente</td>
      <td>Intercostal leve</td>
      <td>Subcostal e intercostal</td>
      <td>Universal + batimento de asa</td>
    </tr>
    <tr>
      <td><strong>Frequência Respiratória</strong></td>
      <td>&le; 40 irpm</td>
      <td>41 a 55 irpm</td>
      <td>56 a 70 irpm</td>
      <td>&gt; 70 irpm</td>
    </tr>
    <tr>
      <td><strong>Frequência Cardíaca</strong></td>
      <td>&le; 100 bpm</td>
      <td>101 a 120 bpm</td>
      <td>121 a 140 bpm</td>
      <td>&gt; 140 bpm</td>
    </tr>
    <tr>
      <td><strong>Ventilação / Entrada de Ar</strong></td>
      <td>Boa e simétrica</td>
      <td>Regular / Simétrica</td>
      <td>Muito diminuída</td>
      <td>Tórax silencioso</td>
    </tr>
    <tr>
      <td><strong>Cianose</strong></td>
      <td>Ausente</td>
      <td>Ausente</td>
      <td>Perioral com choro</td>
      <td>Cianose em repouso</td>
    </tr>
  </tbody>
</table>
<p><em>Interpretação:</em> 1 a 3 pontos = Leve; 4 a 7 pontos = Moderada; 8 a 14 pontos = Grave (indicação imediata de UTIP).</p>

<h3>2. Escore de Tal Modificado</h3>
<p>Avalia Frequência Respiratória, Sibilância, Cianose e Uso de Musculatura Acessória com pontuação de 0 a 12 (0-4 leve, 5-8 moderada, 9-12 grave). Muito utilizado pela praticidade à beira do leito.</p>

<h3>Fatores de Risco Individuais para Evolução Desfavorável</h3>
<p>Determinados lactentes possuem vulnerabilidade biológica intrínseca que multiplica o risco de progressão rápida para insuficiência respiratória grave, apneia e óbito. A presença de qualquer um desses fatores reduz o limiar para internação hospitalar precoce:</p>
<ol>
  <li><strong>Idade Cronológica Muito Jovem (&lt; 6 a 12 semanas de vida):</strong> Lactentes menores de 2 a 3 meses têm vias aéreas extremamente estreitas, sistema imunológico virgem e alta suscetibilidade à apneia bulbar induzida pelo VSR;</li>
  <li><strong>Prematuridade (Idade Gestacional &lt; 37 semanas):</strong> Especialmente prematuros moderados e extremos (&lt; 32 a 35 semanas), que apresentam alvéolos e bronquíolos com menor diâmetro e transferência transplacentária diminuída de IgG materna;</li>
  <li><strong>Displasia Broncopulmonar (Doença Pulmonar Crônica da Prematuridade):</strong> Histórico de lesão pulmonar prévia, fibrose e arquitetura vascular pulmonar alterada;</li>
  <li><strong>Cardiopatias Congênitas Hemodinamicamente Relevantes:</strong> Cardiopatias congênitas com hiperfluxo pulmonar (shunts esquerda-direita volumosos, como CIV grande, persistência do canal arterial ou defeito do septo atrioventricular) ou com hipertensão arterial pulmonar associada;</li>
  <li><strong>Doenças Neuromusculares e Paralisia Cerebral:</strong> Fraqueza diafragmática, tosse ineficaz e clearance mucociliar diminuído;</li>
  <li><strong>Imunodeficiências Congênitas ou Adquiridas.</strong></li>
</ol>
`
    },
    {
      id: 'manejo-terapeutico-baseado-evidencias-o-que-fazer',
      title: '7. Manejo Terapêutico Baseado em Evidências: O Que FAZER (Pilares de Suporte)',
      body_html: `
<h3>A Filosofia Terapêutica da BVA: Cuidado de Suporte Fisiológico</h3>
<p>Não existe até o momento nenhum fármaco antiviral curativo eficaz aprovado para a BVA na prática clínica diária. O tratamento fundamenta-se estritamente em <strong>garantir a oxigenação tecidual adequada, desobstruir as vias aéreas superiores, manter o equilíbrio hidroeletrolítico e aguardar a regeneração espontânea do epitélio bronquiolar</strong>.</p>

<h3>Os Três Pilares do Manejo Hospitalar Baseado em Evidências</h3>

<h3>1. Oxigenoterapia Racional e Criteriosa</h3>
<ul>
  <li><strong>Quando Iniciar Oxigênio Suplementar?</strong>
    <ul>
      <li>Segundo as diretrizes da SBP e da AAP, o oxigênio suplementar deve ser administrado quando a <strong>Saturação Periférica de Oxigênio (SpO2) mantiver-se persistentemente inferior a 90% a 92% em ar ambiente</strong> com o paciente respirando em vigília tranquila;</li>
      <li>Em lactentes com fatores de risco de alta gravidade (cardiopatas, prematuros extremos), o alvo de SpO2 é mantido com margem de segurança &ge; 92% a 94%;</li>
    </ul>
  </li>
  <li><strong>Dispositivos de Oxigenoterapia:</strong>
    <ul>
      <li><strong>Cânula Nasal Convencional (Óculos de Oxigênio):</strong> Fluxos de 0,5 a 2 L/min de oxigênio umidificado; é o dispositivo inicial de primeira escolha para quadros leves a moderados;</li>
      <li><strong>Cânula Nasal de Alto Fluxo (CNAF / HFNC - High Flow Nasal Cannula):</strong> Dispositivo moderno que fornece mistura aquecida e 100% umidificada de ar e oxigênio com fluxos elevados de <strong>1 a 2 L/kg/min</strong> (com FiO2 ajustada de 21% a 60%). Reduz expressivamente a necessidade de intubação traqueal e a fadiga muscular.</li>
    </ul>
  </li>
</ul>

<h3>2. Desobstrução Mecânica e Lavagem Nasal com Solução Fisiológica (SF 0,9%)</h3>
<ul>
  <li>Como os lactentes são respiradores nasais preferenciais, a obstrução da nasofaringe por muco espesso amplifica em até 50% o trabalho respiratório total;</li>
  <li><strong>Instilação / Lavagem Nasal com SF 0,9%:</strong> Aplicar 1 a 3 mL de solução salina isotônica em cada narina com seringa ou spray nasal antes das mamadas, antes das inalações e antes de dormir;</li>
  <li><strong>Aspiração Nasal Superficial e Cautelosa:</strong> Realizar com pera de borracha ou sonda flexível suave apenas para remover o excesso de secreção externa. <em>Atenção:</em> Evitar aspirações nasofaríngeas profundas vigorosas e repetidas com sondas rígidas, pois provocam microtraumas na mucosa, edema inflamatório reativo e laringoespasmo reflexo.</li>
</ul>

<h3>3. Suporte Nutricional e Hidratação Sem Sobrecarga Hídrica</h3>
<ul>
  <li><strong>Avaliação da Capacidade de Deglutição:</strong>
    <ul>
      <li>Se FR &lt; 60 irpm e sem esforço respiratório importante: <strong>manter o aleitamento materno sob livre demanda</strong> ou mamadas habituais em pequenos volumes fracionados para evitar distensão gástrica que empurre o diafragma;</li>
      <li>Se <strong>FR &gt; 60 a 70 irpm ou tiragens torácicas moderadas/graves</strong>: a via oral deve ser <strong>IMEDIATAMENTE SUSPENSA</strong> devido ao risco elevadíssimo de incoordenação entre sucção-deglutição-respiração com microaspiração e broncoaspiração maciça de leite para a via aérea!;</li>
    </ul>
  </li>
  <li><strong>Vias Alternativas de Hidratação e Alimentação:</strong>
    <ul>
      <li><strong>Sonda Nasogástrica ou Orogástrica (SNG / SOG):</strong> É a via enteral preferencial de escolha para ofertar leite materno ou fórmula em infusão lenta contínua ou fracionada em pequenos volumes a cada 2 a 3 horas. Apresenta menos complicações infecciosas que o cateter venoso e mantém o trofismo mucosal;</li>
      <li><strong>Hidratação Venosa Parenteral:</strong> Indicada se vômitos incoercíveis, distensão abdominal, choque circulatório ou intolerância à SNG;</li>
      <li><strong>Cuidado Decisivo com o Balanço Hídrico (Risco de SIADH):</strong> Pelo risco estabelecido de secreção inadequada de ADH na bronquiolite grave, deve-se prescrever <strong>soluções hidroeletrolíticas isotônicas (soro com concentração fisiológica de sódio de ~140 mEq/L) com volume restrito a 70% a 80% das necessidades basais de manutenção (Holiday-Segar)</strong>, evitando sobrecarga volêmica que precipite edema pulmonar intersticial ou hiponatremia convulsiva! Dosar eletrólitos séricos (sódio e potássio) a cada 24 horas em pacientes sob hidratação parenteral.</li>
    </ul>
  </li>
</ul>
`
    },
    {
      id: 'praticas-desaconselhadas-o-que-nao-fazer-sbp-aap',
      title: '8. Práticas Desaconselhadas nas Diretrizes Atuais: O Que NÃO FAZER',
      body_html: `
<h3>A "Lista Negra" da Bronquiolite: As Práticas Proibidas pelo ENAMED</h3>
<p>Nos exames de Residência Médica, Revalida e ENAMED, as questões sobre Bronquiolite Viral Aguda concentram-se predominantemente no <strong>reconhecimento de condutas e prescrições médicas DESACONSELHADAS, INEFICAZES ou FORMALMENTE PROIBIDAS</strong> pelas diretrizes da SBP (2024), AAP (2014/reafirmada) e NICE. Conhecer essa lista é sinônimo de pontuação máxima:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Conduta / Medicamento Desaconselhado</th>
      <th>Por Que é Desaconselhado nas Diretrizes Vigentes? (Mecanismo Fisiopatológico)</th>
      <th>Exceções Clínicas e Riscos Associados</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>1. NÃO Prescrever Broncodilatadores Inalatórios de Rotina<br>(Salbutamol / Fenoterol)</strong></td>
      <td>A obstrução na BVA não decorre de broncoespasmo muscular reversível, mas sim de <strong>necrose ciliar, edema de submucosa e tampões densos de muco/debris intraluminais</strong>. Além disso, lactentes jovens possuem escassa musculatura lisa bronquiolar e baixa densidade de receptores beta-2 adrenérgicos. Múltiplas meta-análises comprovam que o salbutamol <strong>não altera o desfecho clínico, não diminui as taxas de hospitalização e não reduz o tempo de internação</strong>.</td>
      <td><strong>Efeitos adversos comuns:</strong> Taquicardia importante, tremores, arritmias e piora do desequilíbrio V/Q (a vasodilatação em áreas pulmonares não ventiladas piora a hipoxemia!).<br><em>Exceção:</em> Um teste terapêutico isolado de resgate com salbutamol inalatório só é tolerado se o lactente for mais velho (&gt; 6-12 meses) com forte histórico pessoal de atopia/eczema ou pais asmáticos; se não houver melhora objetiva documentada em 30 min, suspender imediatamente.</td>
    </tr>
    <tr>
      <td><strong>2. NÃO Prescrever Corticosteroides Sistêmicos<br>(Prednisolona, Prednisona, Dexametasona, Hidrocortisona)</strong></td>
      <td>Ensaios clínicos randomizados de grande porte (incluindo estudos multicêntricos da rede PED-NET) demonstraram de forma inequívoca que o corticoide oral ou venoso <strong>não tem qualquer benefício na BVA: não acelera a melhora respiratória, não diminui o tempo de internação e não reduz a necessidade de ventilação mecânica</strong>. A resposta inflamatória tecidual bronquiolar ao VSR é resistente aos esteroides nas doses clínicas usuais.</td>
      <td><strong>Riscos e Danos:</strong> Aumento dos custos, imunossupressão transitória que prolonga o tempo de eliminação (shedding) do vírus na secreção nasofaríngea, hiperglicemia e irritabilidade severa. Corticoide na BVA não deve ser prescrito!</td>
    </tr>
    <tr>
      <td><strong>3. NÃO Realizar Nebulização com Salina Hipertônica 3% de Rotina na Emergência</strong></td>
      <td>Embora teoricamente a salina a 3% promova atração osmótica de água para o lúmen, reduzindo o edema e fluidificando o muco, ensaios clínicos demonstraram que <strong>sua administração aguda e isolada no pronto-socorro infantil não reduz a taxa de admissão hospitalar</strong>.</td>
      <td>As diretrizes da SBP/AAP <strong>desaconselham o uso de salina hipertônica 3% na sala de emergência</strong>. Seu uso só encontra respaldo discreto em lactentes já internados em enfermaria por períodos superiores a 72 horas para auxiliar no clearance de muco.</td>
    </tr>
    <tr>
      <td><strong>4. NÃO Prescrever Antibióticos Empíricos<br>(Amoxicilina, Azitromicina, Cefalosporinas)</strong></td>
      <td>A BVA é uma infecção <strong>viral primária pura</strong>. A taxa de infecção bacteriana secundária associada (especialmente bacteremia oculta e meningite) em lactentes com bronquiolite clássica é <strong>inferior a 1% a 2%</strong> (a taxa de infecção do trato urinário associada é de cerca de 3% a 5% em menores de 2 meses com febre alta). O uso de azitromicina não possui ação anti-inflamatória protetora demonstrada em BVA.</td>
      <td>O uso desnecessário de antibióticos seleciona microbiota multirresistente hospitalar, provoca diarreia associada a <em>Clostridioides difficile</em> e eleva custos. Antibiótico só é prescrito se houver confirmação objetiva de coinfecção bacteriana (ex.: OMA supurativa bacteriana concomitante ou pneumonia lobar documentada).</td>
    </tr>
    <tr>
      <td><strong>5. NÃO Prescrever Fisioterapia Respiratória Motora Convencional de Rotina</strong></td>
      <td>Manobras torácicas intempestivas de vibrocompressão, tapotagem e drenagem postural não aceleram a resolução da BVA e <strong>aumentam o estresse do lactente, provocando agitação, choro vigoroso e piora transitória da hipoxemia</strong>.</td>
      <td>Desaconselhada na fase aguda de obstrução mecânica e sibilância ativa.</td>
    </tr>
  </tbody>
</table>
`
    },
    {
      id: 'suporte-ventilatorio-avancado-cnaf-vni-uti',
      title: '9. Suporte Ventilatório Avançado: Cânula de Alto Fluxo (CNAF), VNI e UTI Pediátrica',
      body_html: `
<h3>O Desafio da Falência Respiratória na BVA</h3>
<p>Aproximadamente 5% a 15% dos lactentes hospitalizados por bronquiolite viral aguda evoluem com fadiga da musculatura respiratória, hipoxemia refratária à cânula convencional e hipercapnia progressiva, demandando transferência e manejo intensivo em Unidade de Terapia Intensiva Pediátrica (UTIP).</p>

<h3>1. Cânula Nasal de Alto Fluxo (CNAF / HFNC)</h3>
<p>A introdução da CNAF revolucionou a terapia intensiva pediátrica nas últimas duas décadas, tornando-se a ponte terapêutica não invasiva de primeira escolha na bronquiolite moderada a grave:</p>
<ul>
  <li><strong>Mecanismos Fisiológicos de Ação da CNAF:</strong>
    <ol>
      <li><strong>Lavagem do Espaço Morto Anatômico Nasofaríngeo (Washout de CO2):</strong> O fluxo contínuo de gás varre o CO2 aprisionado na nasofaringe entre os ciclos respiratórios, fornecendo um reservatório limpo de oxigênio fresco a cada inspiração e reduzindo o trabalho respiratório;</li>
      <li><strong>Geração de Pressão Positiva Contínua nas Vias Aéreas (PEEP funcional):</strong> Com a boca fechada da criança, o alto fluxo gera uma pressão expiratória final de aproximadamente <strong>2 a 5 cmH2O</strong> nas vias aéreas intratorácicas, o que impede o colapso expiratório dos bronquíolos terminais e recruta alvéolos atelectasiados;</li>
      <li><strong>Condicionamento dos Gases (100% Umidificação e Aquecimento a 37°C):</strong> Gás aquecido e úmido preserva a função do epitélio ciliar residual, fluidifica os tampões de muco ressecados e previne o broncoespasmo reflexo provocado pelo gás frio e seco dos fluxômetros tradicionais;</li>
      <li><strong>Atenuação da Resistência Inspiratória Nasofaríngea:</strong> O fluxo fornecido atinge ou ultrapassa o pico de fluxo inspiratório do paciente, reduzindo o trabalho elástico muscular.</li>
    </ol>
  </li>
  <li><strong>Parâmetros de Início da CNAF:</strong> Inicia-se com fluxo de <strong>1 a 2 L/kg/min</strong> (frequentemente ajustado para 2 L/kg/min no primeiro ano de vida) e FiO2 titulada para manter SpO2 entre 92% e 96%;</li>
  <li><strong>Critérios de Sucesso e Resposta:</strong> Redução significativa da frequência respiratória (queda de &ge; 10 a 15 irpm), alívio das tiragens e estabilização da frequência cardíaca dentro dos primeiros 60 a 90 minutos de uso;</li>
  <li><strong>Protocolo de Desmame da CNAF:</strong> Primeiro reduz-se a FiO2 progressivamente até níveis &le; 30% a 40%; em seguida, reduz-se o fluxo em degraus de 0,5 L/kg/min até alcançar fluxos basais (&lt; 2 L/min totais), transicionando para cânula nasal convencional.</li>
</ul>

<h3>2. Ventilação Não Invasiva (VNI - CPAP e BiPAP)</h3>
<p>Se a CNAF falhar em reverter o esforço respiratório ou na presença de acidose mista descompensada:</p>
<ul>
  <li><strong>CPAP Nasal (Continuous Positive Airway Pressure):</strong> Aplicação de pressão positiva contínua de 5 a 8 cmH2O por meio de interface nasal tipo pronga ou máscara facial. Excelente capacidade de recrutamento de atelectasias difusas;</li>
  <li><strong>BiPAP (Bilevel Positive Airway Pressure):</strong> Combina pressão inspiratória (IPAP de 10 a 14 cmH2O) para vencer a resistência das vias aéreas e descarregar o esforço diafragmático com pressão expiratória (EPAP de 5 a 7 cmH2O) para manter a capacidade residual funcional e a oxigenação.</li>
</ul>

<h3>3. Indicações de Intubação Traqueal e Ventilação Mecânica Invasiva (VMI)</h3>
<p>A intubação traqueal e conexão à ventilação invasiva é uma medida de resgate extremo, reservada para cerca de 2% a 5% dos internados que apresentam:</p>
<ul>
  <li>Apneias recorrentes graves com hipoxemia e bradicardia refratárias ao estímulo tátil e à VNI;</li>
  <li>Insuficiência respiratória hipercapnica grave com exaustão/fadiga diafragmática (pH &lt; 7,20 e pCO2 &gt; 65-70 mmHg com hipoxemia persistente com FiO2 &gt; 60%);</li>
  <li>Alteração grave do nível de consciência (torpor, coma, incapacidade de proteger via aérea);</li>
  <li>Parada cardiorrespiratória iminente.</li>
</ul>
<p><em>Estratégia Ventilatória na VMI da Bronquiolite:</em> Padrão puramente <strong>obstrutivo com constante de tempo respiratória muito longa</strong>. Requer: tempos expiratórios longos (relação I:E de 1:3 a 1:4), frequências respiratórias baixas para permitir o esvaziamento pulmonar completo e evitar o acúmulo de <strong>Auto-PEEP (hiperinsuflação dinâmica perigosa com risco de pneumotórax hipertensivo e colapso hemodinâmico)</strong>, aceitando-se a estratégia de <strong>hipercapnia permissiva</strong> (manter pH &gt; 7,20).</p>
<p><em>Sedoanalgesia na UTIP:</em> Priorizar agentes que preservem o tônus ventilatório e o drive respiratório próprio, como a <strong>Dexmedetomidina</strong> (agonista alfa-2 seletivo com propriedades sedativas e ansiolíticas sem depressão respiratória) associada à <strong>Cetamina</strong> (efeito broncodilatador e analgésico sem hipotensão), evitando benzodiazepínicos e bloqueadores neuromusculares que prolongam o tempo de ventilação mecânica.</p>
`
    },
    {
      id: 'profilaxia-imunobiologica-palivizumabe-nirsevimabe-vacina-materna',
      title: '10. Profilaxia Imunobiológica Moderna: Palivizumabe, Nirsevimabe e Vacina Materna',
      body_html: `
<h3>A Revolução na Prevenção do Vírus Sincicial Respiratório</h3>
<p>Nos últimos anos, a imunoprofilaxia contra o VSR passou pela maior transformação tecnológica da história da pediatria moderna. Saímos de uma estratégia restrita a poucos prematuros extremos para uma nova era de proteção quase universal de todos os lactentes através de novos anticorpos monoclonais de longa duração e vacinação materna.</p>

<h3>1. Palivizumabe (Synagis)</h3>
<p>O Palivizumabe é um anticorpo monoclonal humanizado da classe IgG1 direcionado especificamente contra um epítopo antigênico conservado na <strong>Glicoproteína F do VSR</strong>, bloqueando a fusão do vírus com o epitélio do hospedeiro:</p>
<ul>
  <li><strong>Farmacocinética:</strong> Possui meia-vida de aproximadamente 20 dias, <strong>exigindo injeções intramusculares MENSAIS repetidas (15 mg/kg/dose IM)</strong> durante todo o período de sazonalidade viral (geralmente até 5 doses consecutivas por temporada);</li>
  <li><strong>Critérios Oficiais de Indicação do Ministério da Saúde / SBP no SUS:</strong>
    <ol>
      <li><strong>Prematuros com Idade Gestacional ao nascer &lt; 29 semanas (28 semanas e 6 dias ou menos)</strong>, durante o primeiro ano de vida (até 11 meses e 29 dias);</li>
      <li><strong>Crianças com menos de 2 anos de idade (até 23 meses e 29 dias) com Doença Pulmonar Crônica da Prematuridade (Displasia Broncopulmonar)</strong> que necessitaram de tratamento médico (oxigênio, corticoide, diurético ou broncodilatador) nos 6 meses anteriores ao início da temporada do VSR;</li>
      <li><strong>Crianças com menos de 2 anos de idade portadoras de Cardiopatia Congênita com repercussão hemodinâmica significativa</strong> (insuficiência cardíaca descompensada, cianose persistente ou em uso de medicações para controle hemodinâmico).</li>
    </ol>
  </li>
</ul>

<h3>2. O Novo Anticorpo Monoclonal de Meia-Vida Estendida: Nirsevimabe (Beyfortus)</h3>
<p>O <strong>Nirsevimabe</strong> representa a maior inovação biológica recente contra o VSR, aprovado pela Anvisa, FDA e EMA e incorporado progressivamente nas diretrizes internacionais:</p>
<table class="book-table">
  <thead>
    <tr>
      <th>Aspecto Comparativo</th>
      <th>Palivizumabe (Primeira Geração)</th>
      <th>Nirsevimabe (Nova Geração de Anticorpos Monoclonais)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Engenharia Molecular</strong></td>
      <td>Anticorpo monoclonal IgG1 convencional não modificado.</td>
      <td>Anticorpo monoclonal humano IgG1 kappa recombinante direcionado contra a conformação de pré-fusão (pre-F) da proteína F do VSR, contendo a <strong>mutação de triplo aminoácido YTE (M252Y/S254T/T256E) na região Fc</strong>.</td>
    </tr>
    <tr>
      <td><strong>Meia-Vida e Posologia</strong></td>
      <td>Meia-vida de ~20 dias.<br><strong>Exige injeções intramusculares MENSAIS (até 5 doses na temporada)</strong>.</td>
      <td>A mutação YTE aumenta drasticamente a afinidade pelo receptor neonatal Fc (FcRn), prolongando a <strong>meia-vida terminal para 60 a 70 dias</strong>.<br><strong>DOSE ÚNICA INTRAMUSCULAR fornece proteção biológica protetora contínua por pelo menos 5 a 6 meses</strong> (cobre toda a temporada de circulação do VSR!).</td>
    </tr>
    <tr>
      <td><strong>População-Alvo de Indicação</strong></td>
      <td>Restrito estritamente a prematuros extremos (&lt; 29 semanas) e cardiopatas/displásicos de alto risco.</td>
      <td><strong>INDICAÇÃO UNIVERSAL:</strong> Recomendado para <strong>TODOS os recém-nascidos e lactentes saudáveis</strong> nascidos durante ou que entram na sua <strong>primeira temporada de circulação do VSR</strong>, além de crianças de alto risco até 24 meses em sua segunda temporada.</td>
    </tr>
    <tr>
      <td><strong>Eficácia Clínica Comprovada</strong></td>
      <td>Redução de ~55% nas hospitalizações em prematuros.</td>
      <td><strong>Redução de mais de 75% a 83% nas infecções de vias aéreas inferiores atendidas e nas hospitalizações por VSR</strong> em lactentes a termo e prematuros (estudos MELODY e HARMONIE).</td>
    </tr>
  </tbody>
</table>

<h3>3. Vacinação Materna contra o VSR (Abrysvo)</h3>
<p>Outra conquista sanitária histórica foi o desenvolvimento e aprovação da <strong>vacina bivalente recombinante da proteína F pré-fusão do VSR para gestantes</strong>:</p>
<ul>
  <li><strong>Mecanismo de Ação:</strong> A vacina é administrada na gestante entre a <strong>32ª e a 36ª semana de idade gestacional</strong>. O sistema imune materno produz títulos extraordinariamente elevados de anticorpos IgG neutralizantes específicos contra a proteína F do VSR, que são ativamente transportados através da barreira placentária para a circulação fetal;</li>
  <li><strong>Proteção Neonatal:</strong> Ao nascer, o recém-nascido possui anticorpos maternos circulantes protetores que conferem <strong>proteção superior a 80% contra infecções graves de vias aéreas inferiores por VSR nos primeiros 90 dias de vida</strong> e mais de 60% a 70% de proteção sustentada até os 6 meses de idade (o período de maior letalidade da bronquiolite!).</li>
</ul>
`
    },
    {
      id: 'casos-clinicos-estruturados-bronquiolite',
      title: '11. Casos Clínicos Estruturados com Discussão Diagnóstica e Decisões Críticas',
      body_html: `
<h3>Caso Clínico 1: O Lactente Típico no Pico da Bronquiolite e o Erro do Salbutamol</h3>
<p><strong>Identificação e Queixa:</strong> Lactente masculino de 4 meses de vida, previamente hígido, nascido a termo (39 semanas), em aleitamento materno exclusivo, é levado à UPA pelos pais. A mãe relata que há 4 dias a criança iniciou quadro de espirros, obstrução nasal e coriza clara, com febre de 38,1°C no segundo dia. Desde ontem, a tosse piorou muito e hoje o bebê passou a "respirar muito rápido e com a barriga afundando", com dificuldade para mamar no peito.</p>
<p><strong>Exame Físico de Entrada:</strong></p>
<ul>
  <li>Estado Geral: Lactente irritado, corado, hidratado, afebril no momento;</li>
  <li>Aparelho Respiratório: Frequência respiratória = 64 irpm (taquipneia acentuada); presença de tiragens subcostais moderadas e tiragens intercostais; batimento de asa nasal discreto; sem gemência ou estridor;</li>
  <li>Oximetria: Saturação de O2 = 91% em ar ambiente;</li>
  <li>Ausculta Pulmonar: Murmúrio vesicular presente bilateralmente, tempo expiratório discretamente prolongado, com <strong>estertores crepitantes finos bilaterais difusos em ambas as bases e campos médios e sibilos tele-expiratórios esparsos</strong>;</li>
  <li>Abdome: Fígado palpável a 2,5 cm do rebordo costal direito, com consistência habitual e borda lisa. Sem outras massas.</li>
</ul>
<p><strong>Conduta Inicial Incorreta do Plantonista Inexperiente:</strong></p>
<p>O médico prescreveu nebulização com 10 gotas de fenoterol + 20 gotas de ipratrópio em 3 mL de SF 0,9% a cada 20 minutos por 3 ciclos consecutivos, associada a 1 mg/kg de prednisolona oral e solicitou radiografia de tórax e hemograma.</p>

<p><strong>Discussão e Raciocínio Clínico Baseado em Evidências:</strong></p>
<ol>
  <li><strong>Diagnóstico:</strong> Trata-se do <strong>primeiro episódio de sibilância e desconforto respiratório associado a pródromo catarral em lactente de 4 meses</strong>, o que fecha com perfeição o diagnóstico de <strong>Bronquiolite Viral Aguda típica (provavelmente por VSR)</strong> no seu 4º dia de evolução (pico dos sintomas);</li>
  <li><strong>O Fígado Palpável:</strong> O fígado palpável a 2,5 cm decorre da <em>hiperinsuflação pulmonar com rebaixamento diafragmático mecânico</em> (pseudo-hepatomegalia), e não de insuficiência cardíaca congestiva ou hepatopatia!;</li>
  <li><strong>Erros Graves da Prescrição:</strong>
    <ul>
      <li>O uso de beta-2 agonista (fenoterol/salbutamol) é ineficaz na BVA porque a obstrução é por necrose e muco (não broncoespasmo), gerando apenas taquicardia e piora da hipoxemia;</li>
      <li>O corticoide sistêmico (prednisolona) é formalmente desaconselhado na BVA pelas diretrizes da SBP e AAP por não ter benefício clínico comprovado;</li>
      <li>O raio-X e hemograma são dispensáveis na apresentação clássica;</li>
    </ul>
  </li>
  <li><strong>Conduta Correta e Atualizada da SBP 2024:</strong>
    <ul>
      <li>Instalar <strong>oxigenoterapia por cânula nasal convencional a 1 L/min umidificado</strong> para manter SpO2 &ge; 92%;</li>
      <li>Realizar <strong>lavagem nasal vigorosa com 2 mL de solução fisiológica 0,9%</strong> em cada narina com aspiração suave do excesso de secreção;</li>
      <li>Suspender mamadas orais vigorosas transitoriamente enquanto a FR mantiver-se &gt; 60 irpm; passar sonda nasogástrica (SNG) e ofertar leite materno ordenhado fracionado;</li>
      <li>Internar em enfermaria pediátrica para suporte e monitorização.</li>
    </ul>
  </li>
</ol>

<h3>Caso Clínico 2: Prematuro com Apneia e Indicação de CNAF</h3>
<p><strong>Identificação e História:</strong> Lactente do sexo feminino, com idade cronológica de 7 semanas (1 mês e 3 semanas) e idade corrigida de 35 semanas (nasceu prematura de 32 semanas de gestação). É admitida na emergência pediátrica com história de pródromo catarral há 48 horas. A mãe relata que, enquanto o bebê dormia, percebeu que a criança "ficou roxa, parou de respirar completamente por mais de 25 segundos e ficou mole", voltando a respirar após estímulo vigoroso no dorso.</p>
<p><strong>Exame Físico de Entrada:</strong></p>
<ul>
  <li>Estado Geral: Sonolenta, hipoativa, pálida, com cianose perioral transitória;</li>
  <li>Sinais Vitais: FC = 175 bpm; FR = 72 irpm; SpO2 = 88% em ar ambiente; Temperatura = 37,9°C;</li>
  <li>Mecânica Respiratória: Esforço respiratório severo com tiragem subcostal importante, retração esternal e batimento de asas nasais; ausculta com estertores subcrepitantes bilaterais e tempo expiratório longo.</li>
</ul>
<p><strong>Raciocínio Clínico e Conduta de Terapia Intensiva:</strong></p>
<p>A paciente apresenta múltiplos critérios de <strong>BVA Grave e Risco Crítico</strong>: idade jovem (&lt; 2 meses), antecedente de prematuridade moderada (&lt; 37 semanas), <strong>apneia central presenciada</strong> e SpO2 &lt; 90% com taquipneia &gt; 70 irpm.</p>
<p><strong>Conduta Imediata:</strong></p>
<ol>
  <li>Internação imediata em leito de <strong>UTI Pediátrica</strong> com monitorização cardiorrespiratória e oximetria de pulso contínuas;</li>
  <li>Iniciar suporte com <strong>Cânula Nasal de Alto Fluxo (CNAF)</strong>: fluxo inicial de <strong>2 L/kg/min</strong> com gases aquecidos a 37°C e 100% umidificados, titulando FiO2 inicial de 40% a 50% para atingir SpO2 &ge; 92% a 94%;</li>
  <li>Lavagem nasal com SF 0,9%; jejum oral absoluto; instalar sonda nasogástrica aberta e iniciar hidratação venosa isotônica com restrição hídrica relativa (75% a 80% das necessidades basais) pelo risco de SIADH;</li>
  <li>Coletar swab de nasofaringe para painel viral por RT-PCR (para isolamento de coorte);</li>
  <li>Preparar material para intubação traqueal de emergência à beira do leito caso haja novas apneias ou exaustão respiratória.</li>
</ol>

<h3>Caso Clínico 3: O Erro Diagnóstico da Atelectasia Laminar Confundida com Pneumonia</h3>
<p><strong>Identificação e Queixa:</strong> Menina de 8 meses, previamente saudável, em atendimento no pronto-socorro no 4º dia de BVA clássica (coriza prévia, tosse, taquipneia de 54 irpm, estertores finos bibasais e SpO2 de 93% em ar ambiente). O médico do plantão anterior solicitou uma radiografia de tórax de rotina. O laudo do radiologista descreve: "Hiperinsuflação pulmonar difusa e opacidade homogênea em faixa triangular no lobo superior direito".</p>
<p><strong>A Dúvida Clínica:</strong> O médico assistente assume que a paciente apresenta pneumonia bacteriana secundária e decide prescrever Ceftriaxona intramuscular associada a claritromicina oral.</p>

<p><strong>Discussão Crítica e Esclarecimento:</strong></p>
<p>Esta é uma das armadilhas mais clássicas da pediatria de emergência: a imagem descrita no lobo superior direito corresponde a uma <strong>Atelectasia Segmentar/Lobar por tampão mucoso bronquiolar</strong>, complicação mecânica puramente viral extremamente frequente na bronquiolite (especialmente no lobo superior direito, cujo brônquio de drenagem é anatômica e desfavoravelmente angulado no lactente em decúbito). Não se trata de condensação bacteriana!</p>
<p>Como a criança não apresenta febre alta tóxica, o estado geral é preservado e a saturação é estável, <strong>o uso de antibióticos é TOTALMENTE INADEQUADO e deve ser suspenso</strong>. A atelectasia na BVA resolve-se espontaneamente com a fluidificação do muco, aspiração nasal e suporte ventilatório.</p>

<h3>Caso Clínico 4: Elegibilidade e Escolha da Imunoprofilaxia Moderna</h3>
<p><strong>Identificação e História:</strong> Lactente com 3 semanas de vida, nascido com idade gestacional de 27 semanas e 4 dias (peso de nascimento 980g), internado na UTI Neonatal. Recebe alta hospitalar planejada para o final do mês de março (início da estação sazonal do VSR no Sudeste brasileiro). Os pais questionam a equipe sobre as medidas de proteção biológica disponíveis contra o VSR.</p>
<p><strong>Discussão dos Critérios e Diretrizes:</strong></p>
<ol>
  <li><strong>Critérios de Palivizumabe no SUS:</strong> A criança possui <strong>Idade Gestacional ao nascer de 27 semanas e 4 dias (&lt; 29 semanas)</strong> e encontra-se no primeiro ano de vida na temporada sazonal. Preenche critério absoluto da Portaria do Ministério da Saúde para receber <strong>Palivizumabe mensal (15 mg/kg/dose IM) durante os meses de sazonalidade (até 5 doses)</strong>;</li>
  <li><strong>Perspectiva do Nirsevimabe:</strong> Se disponível no serviço privado ou rede estruturada, o <strong>Nirsevimabe em dose única intramuscular (50 mg IM se peso &lt; 5 kg)</strong> é a alternativa preferencial moderna, pois fornece proteção contínua por mais de 5 a 6 meses com apenas uma injeção, eliminando as reinjeções mensais do palivizumabe e conferindo maior proteção contra hospitalizações.</li>
</ol>
`
    },
    {
      id: 'questoes-concursos-comentadas-bronquiolite',
      title: '12. Questões Comentadas de Residência Médica e Concursos Oficiais',
      body_html: `
<h3>Questão 1 (ENAMED / ENARE — Inédita Comentada)</h3>
<p>Lactente de 3 meses de vida, sem comorbidades prévias conhecidas, é trazido à Unidade de Pronto Atendimento com história de coriza hialina e tosse há 3 dias. Há 24 horas evoluiu com piora da tosse, cansaço respiratório e recusa parcial das mamadas. Ao exame físico: paciente afebril, com taquipneia (FR = 66 irpm), tiragem subcostal moderada, batimento de asa de nariz discreto e saturação de O2 de 89% em ar ambiente. A ausculta pulmonar revela estertores crepitantes finos bilaterais difusos e sibilos tele-expiratórios esparsos. Trata-se do primeiro episódio do quadro. De acordo com a Diretriz mais recente da Sociedade Brasileira de Pediatria (2024) para o manejo da Bronquiolite Viral Aguda, assinale a conduta terapêutica CORRETA:</p>
<p><strong>A)</strong> Iniciar nebulização com salbutamol em doses repetidas a cada 20 minutos, prescrever prednisolona oral por 5 dias e solicitar radiografia de tórax.</p>
<p><strong>B)</strong> Instalar oxigenoterapia suplementar para manter SpO2 &ge; 90-92%, realizar lavagem nasal com solução fisiológica 0,9%, suspender mamadas orais pela taquipneia e fornecer hidratação enteral por sonda nasogástrica, sem indicação de corticoide ou broncodilatador.</p>
<p><strong>C)</strong> Iniciar imediatamente antibioticoterapia parenteral com ampicilina associada a claritromicina, nebulização contínua com salina hipertônica a 3% e corticoterapia venosa.</p>
<p><strong>D)</strong> Prescrever brometo de ipratrópio inalatório e sulfato de magnésio intravenoso, por se tratar de crise asmática desencadeada por vírus.</p>
<p><strong>E)</strong> Realizar intubação traqueal imediata e iniciar ventilação mecânica com parâmetros restritivos.</p>

<p><strong>Comentário Detalhado:</strong></p>
<p><strong>Gabarito: B.</strong></p>
<p><em>Análise das Alternativas:</em></p>
<ul>
  <li><strong>Por que a alternativa B está CORRETA?</strong> O paciente apresenta o quadro clássico de <strong>Bronquiolite Viral Aguda (BVA)</strong>: primeiro episódio de sibilância/estertores em menor de 2 anos com pródromo catarral. Apresenta critérios de hospitalização: SpO2 &lt; 90-92%, FR &gt; 60 irpm e tiragem subcostal. O tratamento preconizado pela SBP e AAP é estritamente de suporte: <strong>oxigenoterapia para manter SpO2 &ge; 90-92%</strong>, <strong>lavagem nasal com SF 0,9%</strong> para desobstrução, suspensão da via oral livre pela taquipneia (risco de broncoaspiração se FR &gt; 60 irpm) e hidratação/alimentação fracionada por <strong>sonda nasogástrica</strong>. Broncodilatadores, corticoides e antibióticos são formalmente desaconselhados;</li>
  <li><strong>Por que a A está INCORRETA?</strong> Salbutamol e prednisolona não têm eficácia comprovada na BVA e são contraindicados de rotina; o RX é dispensável;</li>
  <li><strong>Por que a C está INCORRETA?</strong> A infecção é viral (antibiótico não indicado); corticoide não tem benefício; e a salina hipertônica 3% na emergência não reduz internação;</li>
  <li><strong>Por que a D está INCORRETA?</strong> BVA aos 3 meses de vida não é asma; sulfato de magnésio não tem indicação;</li>
  <li><strong>Por que a E está INCORRETA?</strong> O paciente tem indicação de cânula de oxigênio ou CNAF; a intubação é reservada para apneias graves ou falha ventilatória refratária.</li>
</ul>

<h3>Questão 2 (USP-SP / FMUSP — Inédita Comentada)</h3>
<p>Em relação à fisiopatologia e aos métodos diagnósticos na Bronquiolite Viral Aguda (BVA) em lactentes, analise as afirmativas a seguir:</p>
<p>I. A obstrução bronquiolar na BVA é caracterizada pelo mecanismo em "válvula de esfera", no qual a expansão torácica na inspiração permite a entrada de ar nos alvéolos, mas o colapso bronquiolar na expiração aprisiona o ar distalmente, gerando hiperinsuflação pulmonar e atelectasias laminares.<br>
II. A radiografia de tórax é o exame confirmatório obrigatório de primeira escolha para fechar o diagnóstico de BVA em todos os lactentes sintomáticos.<br>
III. O Vírus Sincicial Respiratório (VSR) é responsável pela maioria dos casos e expressa a glicoproteína F, que medeia a fusão com as células epiteliais do hospedeiro e é o alvo de anticorpos monoclonais como o palivizumabe e o nirsevimabe.<br>
IV. A presença de consolidação lobar na radiografia de tórax e leucocitose com desvio à esquerda é a regra fisiopatológica da infecção isolada pelo VSR.</p>
<p>Estão corretas apenas as afirmativas:</p>
<p><strong>A)</strong> I e III.</p>
<p><strong>B)</strong> I, II e IV.</p>
<p><strong>C)</strong> II e III.</p>
<p><strong>D)</strong> III e IV.</p>
<p><strong>E)</strong> I, II e III.</p>

<p><strong>Comentário Detalhado:</strong></p>
<p><strong>Gabarito: A.</strong></p>
<p><em>Análise dos Itens:</em></p>
<ul>
  <li><strong>Item I: CORRETO.</strong> O mecanismo em "válvula de esfera" (ball-valve mechanism) é o conceito fisiopatológico basilar da BVA: o diâmetro da via aérea aumenta na inspiração e diminui na expiração; as rolhas de muco e o edema colapsam o lúmen expiratório, gerando hiperinsuflação e atelectasias;</li>
  <li><strong>Item II: INCORRETO.</strong> O diagnóstico de BVA é <strong>estritamente clínico</strong>. A radiografia de tórax de rotina é formalmente desaconselhada pelas diretrizes;</li>
  <li><strong>Item III: CORRETO.</strong> O VSR causa 60% a 80% dos casos; sua glicoproteína F promove a formação de sincícios e é o alvo farmacológico dos monoclonais (Palivizumabe e Nirsevimabe) e vacinas maternas;</li>
  <li><strong>Item IV: INCORRETO.</strong> Consolidação lobar franca sugere pneumonia bacteriana secundária, e não o padrão viral típico de infiltrado peribronquial e hiperinsuflação.</li>
</ul>

<h3>Questão 3 (UNICAMP / SMS-Campinas — Inédita Comentada)</h3>
<p>Lactente de 1 mês e meio de vida (nascido de parto a termo, peso de nascimento 3.200g) é trazido ao pronto-socorro infantil com tosse e desconforto respiratório moderado associado a pródromo catarral, com diagnóstico clínico de Bronquiolite Viral Aguda. O médico assistente considera a possibilidade de internação hospitalar. Além da saturação de pulso em ar ambiente, qual fator clínico presente na história deste paciente constitui, por si só, um fator de risco independente formalmente reconhecido para evolução grave e potencial desenvolvimento de apneias centrais?</p>
<p><strong>A)</strong> Idade cronológica inferior a 6 a 12 semanas de vida.</p>
<p><strong>B)</strong> Parto vaginal não complicado.</p>
<p><strong>C)</strong> Uso prévio de vacina BCG na maternidade.</p>
<p><strong>D)</strong> Tipo sanguíneo Rh negativo da mãe.</p>
<p><strong>E)</strong> Ausência de irmãos em idade escolar.</p>

<p><strong>Comentário Detalhado:</strong></p>
<p><strong>Gabarito: A.</strong></p>
<p><em>Análise das Alternativas:</em></p>
<ul>
  <li><strong>Por que a alternativa A está CORRETA?</strong> A <strong>idade cronológica menor de 6 a 12 semanas (menores de 2 a 3 meses de vida)</strong> é um dos fatores de risco biológicos independentes mais críticos para gravidade na BVA. Lactentes jovens têm menor calibre de vias aéreas, reserva mecânica diafragmática exígua e alta propensão a <strong>apneias centrais por invasão ou reflexo sobre o tronco encefálico</strong>. A prematuridade, cardiopatias congênitas e displasia broncopulmonar são os outros grandes fatores de risco;</li>
  <li><strong>Por que as alternativas B, C, D e E estão INCORRETAS?</strong> Parto vaginal, BCG, tipagem sanguínea materna e ausência de irmãos não são fatores de risco para apneia na BVA (a presença de irmãos mais velhos aumenta o risco de contágio domiciliar, mas não de gravidade intrínseca).</li>
</ul>

<h3>Questão 4 (UERJ / UFRJ — Inédita Comentada)</h3>
<p>De acordo com as diretrizes do Ministério da Saúde do Brasil e da Sociedade Brasileira de Pediatria para a imunoprofilaxia contra o Vírus Sincicial Respiratório (VSR) no Sistema Único de Saúde (SUS), assinale o paciente que possui indicação formal de receber a imunização passiva com o anticorpo monoclonal Palivizumabe:</p>
<p><strong>A)</strong> Criança de 3 anos de idade com asma grave resistente a corticoide inalatório.</p>
<p><strong>B)</strong> Criança de 8 meses de idade, nascida de parto prematuro com 27 semanas e 2 dias de idade gestacional.</p>
<p><strong>C)</strong> Lactente de 5 meses de idade, nascido a termo com 38 semanas, sem comorbidades, frequentador de creche pública.</p>
<p><strong>D)</strong> Criança de 18 meses de vida com antecedente de prematuridade de 34 semanas, sem histórico de displasia broncopulmonar ou cardiopatia.</p>
<p><strong>E)</strong> Recém-nascido a termo de 15 dias de vida, cuja mãe teve diagnóstico de infecção por VSR no puerpério.</p>

<p><strong>Comentário Detalhado:</strong></p>
<p><strong>Gabarito: B.</strong></p>
<p><em>Análise das Alternativas:</em></p>
<ul>
  <li><strong>Por que a alternativa B está CORRETA?</strong> Os critérios oficiais do Ministério da Saúde para o fornecimento de Palivizumabe no SUS incluem:
    <ol>
      <li><strong>Prematuros com IG ao nascer &lt; 29 semanas (até 28 semanas e 6 dias)</strong> no primeiro ano de vida (até 11 meses e 29 dias);</li>
      <li>Crianças com menos de 2 anos de idade com <strong>Doença Pulmonar Crônica da Prematuridade (Displasia Broncopulmonar)</strong> com necessidade de medicação nos últimos 6 meses;</li>
      <li>Crianças com menos de 2 anos de idade com <strong>Cardiopatia Congênita com repercussão hemodinâmica</strong>.</li>
    </ol>
    O paciente da alternativa B nasceu com 27 semanas e 2 dias (&lt; 29 semanas) e tem 8 meses de vida (&lt; 1 ano), enquadrando-se perfeitamente no critério 1;</li>
  <li><strong>Por que as alternativas A, C, D e E estão INCORRETAS?</strong> Asmáticos maiores de 2 anos não têm indicação de palivizumabe; crianças a termo sem cardiopatia grave não são elegíveis no SUS; prematuros de 34 semanas só seriam elegíveis se tivessem displasia com suporte medicamentoso recente; e infecção materna não é critério para o anticorpo.</li>
</ul>

<h3>Questão 5 (SCMSP / AMRIGS — Inédita Comentada)</h3>
<p>Recentemente, a Anvisa aprovou um novo agente imunobiológico inovador para a proteção de recém-nascidos e lactentes contra infecções do trato respiratório inferior causadas pelo Vírus Sincicial Respiratório (VSR), denominado <strong>Nirsevimabe</strong>. Em comparação com o anticorpo monoclonal convencional (Palivizumabe), a principal vantagem farmacocinética e posológica do Nirsevimabe consiste em:</p>
<p><strong>A)</strong> Ser administrado por via inalatória oral diária através de nebulizador ultrassônico.</p>
<p><strong>B)</strong> Possuir uma mutação na porção Fc (mutação YTE) que prolonga significativamente sua meia-vida, permitindo proteção durante toda a temporada viral com uma única dose intramuscular.</p>
<p><strong>C)</strong> Induzir imunidade celular ativa mediada por linfócitos T citotóxicos com produção perene de anticorpos por toda a vida adulta.</p>
<p><strong>D)</strong> Apresentar eficácia restrita a cepas bacterianas encapsuladas, não tendo ação sobre vírus envelopados.</p>
<p><strong>E)</strong> Substituir o uso de surfactante exógeno na síndrome do desconforto respiratório do prematuro.</p>

<p><strong>Comentário Detalhado:</strong></p>
<p><strong>Gabarito: B.</strong></p>
<p><em>Análise das Alternativas:</em></p>
<ul>
  <li><strong>Por que a alternativa B está CORRETA?</strong> O <strong>Nirsevimabe</strong> é um anticorpo monoclonal humano recombinante direcionado contra a proteína F do VSR que possui uma alteração estrutural no domínio Fc (a mutação <strong>YTE</strong>: M252Y/S254T/T256E). Essa modificação aumenta a afinidade de ligação ao receptor Fc neonatal (FcRn) em pH endossomal, retardando a depuração do anticorpo e estendendo sua <strong>meia-vida terminal para mais de 60 a 70 dias</strong>. Essa inovação possibilita a proteção eficaz por mais de 5 a 6 meses com uma <strong>ÚNICA DOSE INTRAMUSCULAR</strong>, superando as injeções mensais do palivizumabe e permitindo sua indicação universal para recém-nascidos e lactentes;</li>
  <li><strong>Por que a A está INCORRETA?</strong> É administrado por via intramuscular (não inalatória);</li>
  <li><strong>Por que a C está INCORRETA?</strong> Trata-se de imunização passiva (administração de anticorpos pré-formados), não induzindo imunidade ativa com memória celular permanente;</li>
  <li><strong>Por que as alternativas D e E estão INCORRETAS?</strong> O nirsevimabe é específico para o VSR (não para bactérias) e não tem nenhuma relação com o surfactante pulmonar.</li>
</ul>

<h3>Questão 6 (PSU-MG / SES-MG — Inédita Comentada)</h3>
<p>Lactente de 5 meses com BVA moderada a grave é admitido na enfermaria de pediatria em uso de oxigênio por cânula nasal convencional a 2 L/min, mantendo taquipneia de 68 irpm, tiragem subcostal acentuada e SpO2 oscilando em 90%. A equipe opta por instalar suporte com Cânula Nasal de Alto Fluxo (CNAF). Assinale a alternativa que descreve CORRETAMENTE um dos principais mecanismos fisiopatológicos benéficos da CNAF na bronquiolite:</p>
<p><strong>A)</strong> Redução da temperatura do gás inspirado para 25°C a fim de reduzir a taxa metabólica basal do pulmão.</p>
<p><strong>B)</strong> Lavagem contínua (washout) do CO2 aprisionado no espaço morto anatômico nasofaríngeo, associada à geração de PEEP dinâmica que reduz o colapso expiratório dos bronquíolos.</p>
<p><strong>C)</strong> Fornecimento de pressão positiva inspiratória superior a 30 cmH2O para vencer mecanicamente o espasmo das cordas vocais.</p>
<p><strong>D)</strong> Inibição farmacológica direta da replicação da proteína G viral mediada pelo alto fluxo de nitrogênio.</p>
<p><strong>E)</strong> Substituição total da necessidade de hidratação enteral por absorção direta do vapor de água transalveolar.</p>

<p><strong>Comentário Detalhado:</strong></p>
<p><strong>Gabarito: B.</strong></p>
<p><em>Análise das Alternativas:</em></p>
<ul>
  <li><strong>Por que a alternativa B está CORRETA?</strong> A CNAF opera através de múltiplos mecanismos fisiológicos integrados: 1) <strong>Lavagem (washout) contínua do espaço morto nasofaríngeo</strong>, removendo o CO2 expirado e criando um reservatório de oxigênio fresco para a próxima inspiração, o que reduz substancialmente o trabalho muscular respiratório; 2) <strong>Geração de pressão positiva moderada na via aérea (PEEP funcional de 2 a 5 cmH2O)</strong>, que contrabalança a tendência ao colapso expiratório bronquiolar; 3) <strong>Aquecimento a 37°C e 100% de umidificação</strong>, preservando a motilidade ciliar e fluidificando o muco;</li>
  <li><strong>Por que a A está INCORRETA?</strong> O gás é aquecido a 37°C (gás frio causaria broncoespasmo e lesão ciliar);</li>
  <li><strong>Por que as alternativas C, D e E estão INCORRETAS?</strong> A CNAF não atinge pressões de 30 cmH2O (isso causaria barotrauma grave); não tem ação farmacológica antiviral direta; e a água inalada não substitui a hidratação sistêmica.</li>
</ul>

<h3>Questão 7 (FMJ / IAMSPE — Inédita Comentada)</h3>
<p>Um lactente de 14 meses é levado ao pronto-socorro com história de tosse e sibilância súbitas iniciadas há 2 horas. A mãe relata que a criança estava previamente bem, brincando no chão da sala com brinquedos de peças pequenas do irmão mais velho, quando subitamente começou a engasgar, tossir intensamente e apresentar respiração chiada. Nega febre, nega coriza prévia ou espirros. Ao exame: afebril, acianótico, com esforço respiratório leve e ausculta pulmonar evidenciando murmúrio vesicular marcadamente diminuído no hemitórax direito com sibilos unilaterais inspiratórios e expiratórios restritos ao pulmão direito. O hemitórax esquerdo tem murmúrio limpo e simétrico. Em relação ao diagnóstico diferencial com Bronquiolite Viral Aguda, o diagnóstico mais provável e a conduta imediata são:</p>
<p><strong>A)</strong> Bronquiolite viral aguda clássica por Rinovírus C; iniciar lavagem nasal e observação por 48 horas.</p>
<p><strong>B)</strong> Aspiração de corpo estranho em via aérea; solicitar radiografia de tórax em inspiração e expiração (ou decúbito lateral) e indicar broncoscopia rígida de urgência.</p>
<p><strong>C)</strong> Crise de laringite estridulosa; nebulizar imediatamente com adrenalina pura 1:1.000.</p>
<p><strong>D)</strong> Asma desencadeada por refluxo gastroesofágico; prescrever omeprazol oral e salbutamol spray.</p>
<p><strong>E)</strong> Abscesso periamigdalino unilateral; indicar drenagem cirúrgica imediata da orofaringe.</p>

<p><strong>Comentário Detalhado:</strong></p>
<p><strong>Gabarito: B.</strong></p>
<p><em>Análise das Alternativas:</em></p>
<ul>
  <li><strong>Por que a alternativa B está CORRETA?</strong> O caso ilustra o principal diagnóstico diferencial de sibilância súbita no lactente/andador: a <strong>aspiração de corpo estranho</strong>. Caracteriza-se por: <strong>início hiperagudo súbito (síndrome de penetração com tosse e engasgo) sem pródromo catarral infeccioso prévio (sem coriza ou febre)</strong> e com <strong>achados físicos estritamente UNILATERAIS</strong> (assimetria auscultatória com murmúrio abolido ou diminuído e sibilos em apenas um hemitórax, quase sempre à direita devido à maior retificação anatômica do brônquio-fonte direito). A conduta é radiológica e <strong>broncoscopia rígida para remoção do corpo estranho</strong>;</li>
  <li><strong>Por que a A está INCORRETA?</strong> A BVA tem pródromo catarral de 2 a 3 dias, febre e ausculta com estertores e sibilos <em>bilaterais difusos</em> (nunca unilaterais súbitos);</li>
  <li><strong>Por que a C está INCORRETA?</strong> Laringite acomete via aérea superior com tosse ladrante e estridor (não sibilância intratorácica unilateral);</li>
  <li><strong>Por que as alternativas D e E estão INCORRETAS?</strong> Não há história de refluxo ou abscesso amigdaliano que justifique quadro asfíctico unilateral súbito.</li>
</ul>
`
    },
    {
      id: 'guia-rapido-sintese-bva-enamed',
      title: '13. Guia Rápido de Conduta e Síntese da Bronquiolite para o ENAMED',
      body_html: `
<h3>Os Dez Mandamentos da Bronquiolite Viral Aguda para o ENAMED</h3>
<ol>
  <li><strong>Definição e Faixa Etária:</strong> Primeiro episódio de sibilância e/ou estertores associado a pródromo catarral em lactentes <strong>menores de 2 anos (24 meses)</strong>. Pico entre 2 e 6 meses de vida.</li>
  <li><strong>Etiologia Dominante:</strong> <strong>Vírus Sincicial Respiratório (VSR) em 60% a 80% dos casos</strong>. A proteína F medeia a formação de sincícios e é o alvo dos anticorpos monoclonais e vacinas.</li>
  <li><strong>Fisiopatologia de Válvula de Esfera:</strong> Necrose celular ciliar, edema de submucosa e rolhas de debris intraluminais. Pela lei de Poiseuille, a resistência expiratória sobe exponencialmente, gerando hiperinsuflação e atelectasias laminares.</li>
  <li><strong>Diagnóstico Estritamente Clínico:</strong> Exames radiológicos e laboratoriais são formalmente dispensáveis na BVA típica leve/moderada. Raio-X só é indicado se dúvida atípica, piora súbita ou internação em UTI.</li>
  <li><strong>Critérios de Hospitalização:</strong> Saturação de O2 &lt; 90-92% em ar ambiente, apneia presenciada, FR &gt; 60-70 irpm, tiragem moderada/grave, recusa alimentar &lt; 50%, prematuridade &lt; 37 semanas ou idade &lt; 6-12 semanas.</li>
  <li><strong>O que FAZER:</strong> Oxigenoterapia para manter SpO2 &ge; 90-92% (cânula convencional ou CNAF 1-2 L/kg/min); lavagem nasal com SF 0,9% antes das mamadas; suspender via oral livre se FR &gt; 60 irpm e passar SNG; hidratação sem sobrecarga hídrica pelo risco de <strong>SIADH</strong>.</li>
  <li><strong>O que NÃO FAZER (Proibições de Diretriz):</strong>
    <ul>
      <li>NÃO prescrever broncodilatadores inalatórios de rotina (não alteram desfecho);</li>
      <li>NÃO prescrever corticoides sistêmicos (sem benefício e aumentam shedding viral);</li>
      <li>NÃO prescrever salina hipertônica 3% na sala de emergência de rotina;</li>
      <li>NÃO prescrever antibióticos empíricos (superinfecção bacteriana &lt; 1-2%).</li>
    </ul>
  </li>
  <li><strong>Palivizumabe no SUS:</strong> Injeção <strong>mensal</strong> durante a temporada para: prematuros &lt; 29 semanas no 1º ano; displásicos em tratamento médico até 2 anos; cardiopatas congênitos com repercussão até 2 anos.</li>
  <li><strong>Nirsevimabe (Inovação):</strong> Anticorpo monoclonal com mutação YTE e meia-vida estendida. <strong>Dose única IM</strong> protege por 5 a 6 meses. Indicado universalmente para recém-nascidos e lactentes na 1ª temporada de VSR.</li>
  <li><strong>Vacina Materna contra o VSR:</strong> Administrada em gestantes entre 32 e 36 semanas de idade gestacional, transferindo anticorpos transplacentários que protegem o bebê nos primeiros 6 meses de vida.</li>
</ol>
`
    }
  ],
  references: [
    {
      title: 'Sociedade Brasileira de Pediatria (SBP) — Departamento Científico de Pneumologia Pediátrica. Diretrizes para o Diagnóstico e Manejo da Bronquiolite Viral Aguda',
      url: 'https://www.sbp.com.br/departamentos-cientificos/pneumologia/diretrizes/'
    },
    {
      title: 'American Academy of Pediatrics (AAP) — Clinical Practice Guideline: The Diagnosis, Management, and Prevention of Bronchiolitis (Pediatrics 2014, Reaffirmed)',
      url: 'https://publications.aap.org/pediatrics/article/134/5/e1474/32952/Clinical-Practice-Guideline-The-Diagnosis'
    },
    {
      title: 'Ministério da Saúde do Brasil — Portaria Conjunta SAS/SVS: Protocolo de Uso do Palivizumabe para Prevenção da Infecção pelo Vírus Sincicial Respiratório',
      url: 'https://www.gov.br/saude/pt-br/assuntos/protocolos-clinicos-e-diretrizes-terapeuticas-pcdt'
    },
    {
      title: 'World Health Organization (WHO) — Respiratory Syncytial Virus (RSV) Disease and Immunization Surveillance Guidelines',
      url: 'https://www.who.int/teams/immunization-vaccines-and-biologicals/diseases/respiratory-syncytial-virus'
    },
    {
      title: 'National Institute for Health and Care Excellence (NICE) — Bronchiolitis in children: diagnosis and management (NICE Guideline NG9)',
      url: 'https://www.nice.org.uk/guidance/ng9'
    }
  ]
};

const chars = saveBook(book);
console.log(`Finalizado ${book.slug}: ${chars} caracteres úteis.`);
