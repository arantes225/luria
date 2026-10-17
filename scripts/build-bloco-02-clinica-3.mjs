import { saveBook } from './bloco-02-utils.mjs';

const book = {
  slug: 'tromboembolismo-venoso-e-embolia-pulmonar',
  title: 'Tromboembolismo Venoso e Embolia Pulmonar',
  area: 'Clínica Médica',
  materia: 'Cardiologia, Pneumologia e Medicina Intensiva',
  description: 'Tratado completo sobre Tromboembolismo Venoso (TVP) e Embolia Pulmonar (TEP): Tríade de Virchow, trombofilias, espiral da morte do VD, escores de Wells, Genebra, PERC e YEARS, imagem multimodal, estratificação de risco ESC/SBC, trombólise, DOACs, gestação, oncologia e HPTEC.',
  sections: [
    {
      id: 'triade-virchow-fatores-risco-trombofilias',
      title: '1. Tríade de Virchow, Fatores de Risco Provocados e Trombofilias Hereditárias e Adquiridas',
      body_html: `
<h3>O Espectro Clínico do Tromboembolismo Venoso (TEV) e a Tríade de Virchow</h3>
<p>O <strong>tromboembolismo venoso (TEV)</strong> compreende uma única entidade nosológica contínua que se manifesta sob duas apresentações clínicas inter-relacionadas: a <strong>trombose venosa profunda (TVP)</strong> — habitualmente originada nos seios valvulares das veias profundas dos membros inferiores ou da pelve — e a <strong>embolia pulmonar (TEP ou tromboembolismo pulmonar)</strong>, resultante do desprendimento e migração de fragmentos trombóticos através do coração direito até a árvore arterial pulmonar. O TEV representa a <strong>terceira síndrome cardiovascular aguda mais frequente no mundo</strong> (superada apenas pelo infarto agudo do miocárdio e pelo acidente vascular cerebral) e a principal causa evitável de óbito hospitalar.</p>
<p>A patogênese do trombo venoso (classicamento denominado "trombo vermelho", rico em hemácias aprisionadas em densa rede de fibrina e relativamente pobre em plaquetas quando comparado ao trombo arterial branco) fundamenta-se na clássica <strong>Tríade de Virchow</strong>, formulada em 1856 por Rudolf Virchow:</p>
<ol>
  <li><strong>Estase Venosa:</strong> redução da velocidade do fluxo sanguíneo e turbilhonamento nos bolsões retrovalvares das veias profundas da panturrilha e da coxa, onde a hipóxia endotelial local inibe a expressão de trombomodulina e promove o acúmulo de fatores de coagulação ativados sem diluição nem depuração hepática. Exemplos clássicos: imobilização no leito (&ge; 3 dias), pós-operatório, paralisia de membro inferior pós-AVC/trauma raquimedular, insuficiência cardíaca congestiva descompensada, compressão extrínseca da veia ilíaca comum esquerda pela artéria ilíaca comum direita (<strong>Síndrome de May-Thurner ou Cockett</strong>) e viagens aéreas prolongadas (&gt; 4 a 6 horas — "síndrome da classe econômica").</li>
  <li><strong>Lesão ou Disfunção Endotelial:</strong> ruptura mecânica, inflamatória ou hipóxica da barreira endotelial antitrombótica, expondo o fator tecidual subendotelial e o colágeno. Exemplos: trauma ortopédico (fraturas de quadril, pelve e fêmur), cirurgias de grande porte, cateteres venosos centrais ou <em>picc lines</em> (principal causa de TVP de membros superiores), quimioterapia citotóxica e vasculites (como a doença de Behçet).</li>
  <li><strong>Hipercoagulabilidade Sanguínea (Trombofilia):</strong> desequilíbrio pró-trombótico hereditário ou adquirido entre os fatores pró-coagulantes (aumento dos fatores VIII, IX, XI, fibrinogênio ou resistência à clivagem do fator Va) e os anticoagulantes naturais endógenos (antitrombina, proteína C e proteína S) ou o sistema fibrinolítico.</li>
</ol>

<h3>Classificação Epidemiológica dos Fatores de Risco (Diretriz ESC / SBC): Provocados vs. Não Provocados</h3>
<p>Categorizar se um episódio de TVP/TEP foi <strong>provocado</strong> por um fator transitório ou persistente ou se foi <strong>não provocado (idiopático)</strong> é a decisão clínica mais importante para definir a <strong>duração da anticoagulação</strong> (3 meses vs. tempo indeterminado):</p>
<ul>
  <li><strong>Fatores de Risco Fortes / Maiores (Odds Ratio &gt; 10):</strong> Fratura de membro inferior (quadril/fêmur/tíbia); hospitalização por insuficiência cardíaca ou fibrilação/flutter atrial nos últimos 3 meses; artroplastia total de quadril ou joelho; trauma maior / politrauma; infarto agudo do miocárdio nos últimos 3 meses; TEV prévio; e lesão medular aguda com paralisia. (Quando transitórios e reversíveis — como cirurgia geral com anestesia &gt; 30 min ou fratura — conferem risco de recorrência muito baixo, &lt; 3% ao ano após suspender a anticoagulação aos 3 meses).</li>
  <li><strong>Fatores de Risco Moderados (Odds Ratio entre 2 e 9):</strong> Cirurgia artroscópica de joelho; doenças autoimunes; transfusão sanguínea; cateter venoso central; quimioterapia; insuficiência cardíaca ou respiratória crônica; agentes estimuladores da eritropoiese; terapia de reposição hormonal oral e <strong>anticoncepcionais orais combinados (especialmente os de 3ª e 4ª geração contendo desogestrel, gestodeno, drospirenona ou ciproterona)</strong>; fertilização <em>in vitro</em>; gestação e <strong>puerpério (o risco diário de TEV nas primeiras 6 semanas pós-parto é até 5 vezes maior que durante a própria gestação!)</strong>; infecção aguda (pneumonia, ITU, COVID-19); doença inflamatória intestinal (Retocolite Ulcerativa e Doença de Crohn); acidente vascular cerebral paralítico; tromboflebite superficial; e trombofilias hereditárias.</li>
  <li><strong>Fatores de Risco Fracos / Menores (Odds Ratio &lt; 2):</strong> Repouso no leito &gt; 3 dias; diabetes mellitus; hipertensão arterial; imobilidade sentada prolongada (viagem de carro ou avião); idade avançada; cirurgia laparoscópica; obesidade; gestação anteparto isolada; e veias varicosas.</li>
</ul>

<h3>Trombofilias Hereditárias e Adquiridas: O Que Todo Residente Precisa Saber</h3>
<p>As trombofilias hereditárias dividem-se em dois grandes grupos fisiopatológicos: (1) <strong>defeitos de ganho de função pró-coagulante</strong> (mais prevalentes na população geral, mas de menor potencial trombogênico individual — trombofilias de "baixo risco"); e (2) <strong>deficiências dos inibidores fisiológicos naturais da coagulação</strong> (mais raras, porém de altíssimo potencial trombogênico — trombofilias de "alto risco").</p>

<h4>1. Fator V de Leiden (Resistência à Proteína C Ativada) — A Trombofilia Hereditária Mais Comum</h4>
<p>Resulta de uma mutação pontual missense no gene do Fator V (substituição de arginina por glutamina na posição 506 — <strong>Arg506Gln ou R506Q</strong>), que destrói exatamente o sítio de clivagem proteolítica onde a <strong>Proteína C Ativada (APC)</strong> inativaria o Fator Va. Consequentemente, o Fator Va permanece ativo por mais tempo gerando trombina. Está presente em 3% a 7% da população caucasiana e em ~20% dos pacientes com primeiro episódio de TEV. Na forma <strong>heterozigota</strong>, aumenta o risco de primeiro TEV em 3 a 7 vezes (trombofilia leve, mas que interage de forma multiplicativa com anticoncepcionais orais estrogenados, elevando o risco em mais de 30 vezes!); na forma <strong>homozigota</strong>, o risco sobe em 50 a 80 vezes.</p>

<h4>2. Mutação do Gene da Protrombina (G20210A) — A 2ª Trombofilia Hereditária Mais Comum</h4>
<p>Consiste na transição de guanina para adenina no nucleotídeo 20210 da região 3' não traduzida do gene da protrombina (Fator II), o que estabiliza o RNA mensageiro e eleva os níveis plasmáticos basais de protrombina em cerca de 30%. Presente em 2% da população caucasiana, aumenta em 2 a 4 vezes o risco de TEV na forma heterozigota.</p>

<h4>3. Deficiências de Antitrombina, Proteína C e Proteína S (Trombofilias Hereditárias Graves)</h4>
<ul>
  <li><strong>Deficiência de Antitrombina (AT, antiga Antitrombina III):</strong> é a trombofilia hereditária de <strong>maior risco relativo individual</strong> para trombose (50% a 80% dos portadores desenvolvem TEV ao longo da vida, frequentemente antes dos 40 anos). A antitrombina inibe fisiologicamente a trombina (IIa) e os fatores Xa, IXa e XIa. <em>Pegadinha clássica de prova:</em> Como a heparina não fracionada (HNF) e a enoxaparina dependem obrigatoriamente da ligação à antitrombina para exercerem sua ação anticoagulante, pacientes com deficiência grave de antitrombina (congênita ou adquirida na <strong>síndrome nefrótica</strong> por perda urinária de antitrombina, na cirrose ou no uso de L-asparaginase) apresentam <strong>resistência clínica à heparina</strong> (mesmo doses altíssimas de HNF não alargam o TTPa nem atingem nível anti-Xa terapêutico, exigindo reposição de concentrado de antitrombina ou uso de inibidores diretos que independem da antitrombina, como os DOACs ou argatroban/bivalirudina)!</li>
  <li><strong>Deficiência de Proteína C e de Proteína S:</strong> A proteína C e seu cofator (proteína S) são glicoproteínas sintetizadas no fígado de forma <strong>dependente da vitamina K</strong> que inativam proteoliticamente os fatores <strong>Va e VIIIa</strong>. Possuem meia-vida plasmática muito curta (a proteína C tem meia-vida de apenas <strong>6 a 8 horas</strong>, muito menor que os fatores pró-coagulantes II, IX e X, sendo que a protrombina tem meia-vida de 60–72 horas!). <em>Pegadinha clássica de prova — Necrose Cutânea Induzida por Varfarina:</em> Se um paciente com deficiência de proteína C ou S iniciar <strong>varfarina em dose alta sem cobertura concomitante com heparina parenteral (ponte de heparina)</strong>, a queda abrupta da proteína C nas primeiras 24–48 horas — enquanto os fatores II e X ainda estão normais — cria um estado paradoxal de hipercoagulabilidade extrema na microcirculação dérmica, causando trombose microvascular e <strong>necrose cutânea hemorrágica induzida por cumarínicos</strong> (acometendo mamas, nádegas, coxas e abdome)!</li>
</ul>

<h4>4. Trombofilias Adquiridas: Síndrome Antifosfolípide (SAF) e HPN</h4>
<p>A <strong>Síndrome do Anticorpo Antifosfolípide (SAF)</strong> é a trombofilia adquirida mais importante, podendo ser primária ou secundária ao Lúpus Eritematoso Sistêmico. Caracteriza-se por tromboses venosas, arteriais ou microvasculares e/ou morbidade obstétrica (abortamentos recorrentes, óbito fetal &ge; 10 semanas ou prematuridade por insuficiência placentária/pré-eclâmpsia grave) associadas à presença persistente (em &ge; 2 ocasiões com intervalo mínimo de <strong>12 semanas</strong>) de pelo menos um dos três anticorpos antifosfolípides: <strong>Anticoagulante Lúpico</strong> (que paradoxalmente prolonga o TTPa <em>in vitro</em>, mas causa trombose <em>in vivo</em>!), <strong>Anticorpo Anticardiolipina (IgG ou IgM em títulos moderados/altos)</strong> ou <strong>Anticorpo Anti-&beta;2-glicoproteína I (IgG ou IgM)</strong>. Pacientes com <strong>SAF triplo-positiva</strong> (positivos para os 3 anticorpos) têm altíssimo risco de recorrência trombótica; neles, os <strong>DOACs (rivaroxabana, apixabana) são CONTRAINDICADOS</strong> (estudo TRAPS mostrou maior taxa de eventos arteriais com rivaroxabana vs. varfarina), sendo a <strong>Varfarina (INR 2,0–3,0)</strong> o anticoagulante oral de escolha obrigatória! Outras condições adquiridas altamente trombogênicas incluem a <strong>Hemoglobinúria Paroxística Noturna (HPN)</strong> e as neoplasias mieloproliferativas (Policitemia Vera e Trombocitemia Essencial com mutação <em>JAK2 V617F</em>), que tipicamente causam trombose em sítios venosos incomuns (veias supra-hepáticas — <strong>Síndrome de Budd-Chiari</strong>, veia porta, mesentérica e seios venosos cerebrais).</em></p>

<h4>Quando Pesquisar Trombofilia e Como Evitar Falsos-Positivos Laboratoriais?</h4>
<p>Não se deve solicitar painel de trombofilia para todo paciente com TEV (ex.: é desnecessário em TEV provocado por cirurgia ou trauma, ou em idosos). A investigação restringe-se a: (1) <strong>TEV não provocado em pacientes jovens (&lt; 50 anos)</strong> associado a história familiar forte de TEV em parentes de 1º grau; (2) <strong>trombose venosa recorrente</strong>; (3) <strong>trombose em sítios anatômicos incomuns</strong> (cerebral, mesentérica, porta, supra-hepática — onde se pesquisa SAF, JAK2 e HPN); ou (4) necrose cutânea induzida por varfarina / púrpura fulminante neonatal. <strong>Cuidado técnico essencial de prova:</strong> NUNCA se deve dosar níveis funcionais de <strong>Proteína C, Proteína S ou Antitrombina durante a fase aguda do trombo</strong> (pois estão consumidos pelo próprio coágulo agudo!), nem na vigência de <strong>varfarina</strong> (que reduz proteína C e S) ou <strong>heparina/DOACs</strong> (que reduzem antitrombina e interferem nos ensaios coagulométricos do anticoagulante lúpico). Os únicos exames que não sofrem interferência do trombo agudo nem dos anticoagulantes são os testes genéticos de DNA (PCR para Fator V de Leiden e mutação G20210A da protrombina) e os imunoensaios ELISA de fase sólida para anticardiolipina e anti-&beta;2-glicoproteína I.</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Trombofilia</th>
      <th>Mecanismo Fisiopatológico</th>
      <th>Risco Trombótico / Peculiaridade de Prova</th>
      <th>Interferência na Fase Aguda / Anticoagulantes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Fator V de Leiden (Arg506Gln)</strong></td>
      <td>Resistência do Fator Va à clivagem pela Proteína C Ativada (APC)</td>
      <td><strong>Mais comum das hereditárias</strong>; heterozigoto tem risco moderado; sinergismo forte com anticoncepcional oral</td>
      <td>Teste genético (PCR) <strong>não sofre interferência</strong> na fase aguda nem com anticoagulantes</td>
    </tr>
    <tr>
      <td><strong>Mutação da Protrombina G20210A</strong></td>
      <td>Aumento de ~30% nos níveis plasmáticos basais do Fator II (protrombina)</td>
      <td><strong>2ª mais comum das hereditárias</strong>; risco leve a moderado na forma heterozigota</td>
      <td>Teste genético (PCR) <strong>não sofre interferência</strong> na fase aguda nem com anticoagulantes</td>
    </tr>
    <tr>
      <td><strong>Deficiência de Antitrombina</strong></td>
      <td>Falta de inibição endógena da trombina (IIa) e do Fator Xa</td>
      <td><strong>Maior risco relativo individual</strong> entre as hereditárias; causa <strong>resistência à heparina</strong> (também adquirida na síndrome nefrótica)</td>
      <td>Consumida no trombo agudo e reduzida pelo uso de heparina (dosar fora da fase aguda)</td>
    </tr>
    <tr>
      <td><strong>Deficiência de Proteína C ou S</strong></td>
      <td>Falta de inativação dos fatores Va e VIIIa (dependentes de vitamina K)</td>
      <td>Causa <strong>necrose cutânea induzida por varfarina</strong> se iniciada sem ponte de heparina (meia-vida curta da Proteína C: 6–8h)</td>
      <td>Consumidas no trombo agudo e reduzidas pela varfarina, gestação e hepatopatia</td>
    </tr>
    <tr>
      <td><strong>Síndrome Antifosfolípide (SAF)</strong></td>
      <td>Autoanticorpos (Anticoagulante Lúpico, Anticardiolipina, Anti-&beta;2GPI) ativam endotélio e plaquetas</td>
      <td>Trombose venosa e <strong>arterial</strong> + perdas gestacionais; exige 2 testes com &ge; 12 sem de intervalo; <strong>usar Varfarina (DOAC contraindicado na SAF triplo-positiva)</strong></td>
      <td>Heparina e DOACs (especialmente rivaroxabana) causam falso-positivo no Anticoagulante Lúpico</td>
    </tr>
  </tbody>
</table>
`
    },
    {
      id: 'fisiopatologia-tep-espiral-morte-vd',
      title: '2. Fisiopatologia da Embolia Pulmonar: A "Espiral da Morte" do Ventrículo Direito e Trocas Gasosas',
      body_html: `
<h3>Por Que o Paciente com TEP Agudo Morre? A "Espiral da Morte" do Ventrículo Direito</h3>
<p>A causa primária de óbito na embolia pulmonar aguda não é a hipoxemia isolada, mas sim a <strong>falência aguda do ventrículo direito (VD) levando ao choque obstrutivo cardiogênico</strong>! A árvore arterial pulmonar normal é um sistema de alta capacitância e baixíssima resistência vascular; por isso, a oclusão embólica de até 20% a 25% do leito vascular pulmonar quase não eleva a pressão arterial pulmonar. Todavia, quando a obstrução anatômica pelos trombos ultrapassa <strong>30% a 50% da área de secção transversal do leito arterial pulmonar</strong>, somada à intensa <strong>vasoconstrição pulmonar hipóxica e humoral</strong> (mediada pela liberação maciça de <strong>tromboxano A2, serotonina / 5-HT, endotelina-1 e fator ativador plaquetário</strong> pelas plaquetas aderidas ao êmbolo), ocorre elevação abrupta da <strong>pós-carga do ventrículo direito (Resistência Vascular Pulmonar — RVP)</strong>.</p>
<p>Diferentemente do ventrículo esquerdo, o ventrículo direito normal possui parede livre fina (3 a 4 mm) adaptada para bombear grandes volumes contra baixa pressão, sendo incapaz de sustentar agudamente uma pressão arterial pulmonar média superior a <strong>40 mmHg</strong> (ou pressão sistólica da artéria pulmonar &gt; 50–60 mmHg).<em>(Dica de prova: se um paciente sem cardiopatia prévia chega com dispneia aguda e o ecocardiograma mostra PSAP de 85 mmHg com hipertrofia da parede livre do VD &gt; 7 mm, esse paciente NÃO tem apenas um TEP agudo isolado, mas sim uma hipertensão pulmonar crônica preexistente agudizada ou HPTEC!).</em></p>
<p>Diante do aumento súbito da pós-carga pulmonar, desencadeia-se a clássica cascata fisiopatológica conhecida como <strong>"Espiral da Morte do Ventrículo Direito"</strong>:</p>
<ol>
  <li><strong>Aumento Abrupto da Pós-Carga do VD $\rightarrow$ Dilatação Aguda do VD:</strong> O VD não hipertrofiado dilata-se agudamente (pela lei de Frank-Starling), o que traciona o anel valvar tricúspide e gera insuficiência tricúspide funcional aguda.</li>
  <li><strong>Aumento da Tensão Parietal do VD (Lei de Laplace: $T = \frac{P \times r}{2h}$) e Tempo de Contração Prolongado:</strong> A dilatação do raio ($r$) e o aumento da pressão intracavitária ($P$) elevam dramaticamente o consumo miocárdico de oxigênio ($\text{MVO}_2$) do VD e ativam mecanoceptores que disparam inflamação miocárdica e liberação sérica de <strong>BNP/NT-proBNP</strong>.</li>
  <li><strong>Desincronia Eletromecânica e Desvio do Septo Interventricular para a Esquerda (Interdependência Ventricular):</strong> O tempo de contração sistólica do VD sobrecarregado prolonga-se de tal modo que o VD continua contraindo quando o ventrículo esquerdo (VE) já iniciou sua diástole. Como ambos compartilham o saco pericárdico inextensível, o VD dilatado empurra o septo interventricular para a esquerda (conferindo ao VE um formato em "D" no corte paraesternal eixo curto), <strong>comprimindo a cavidade do ventrículo esquerdo e impedindo seu enchimento diastólico (subenchimento do VE / redução da pré-carga do VE)</strong>!</li>
  <li><strong>Queda do Débito Cardíaco Esquerdo e Hipotensão Arterial Sistêmica:</strong> Com o VE subenchido tanto pela compressão septal quanto pela redução do fluxo sanguíneo que consegue atravessar os pulmões obstruídos, o volume sistólico esquerdo despenca, gerando hipotensão arterial e choque obstrutivo.</li>
  <li><strong>Isquemia e Infarto do Ventrículo Direito (O Golpe Final):</strong> Diferentemente do ventrículo esquerdo (que é perfundido apenas na diástole), a artéria coronária direita perfunde o ventrículo direito normal tanto na sístole quanto na diástole. A pressão de perfusão coronariana do VD depende do gradiente entre a pressão arterial média na aorta e a pressão intracavitária do VD ($\text{PPC}_{\text{VD}} = \text{PAM} - \text{PDFVD}$). Quando a <strong>PAM cai (hipotensão sistêmica)</strong> e simultaneamente a <strong>pressão intramural do VD sobe acentuadamente</strong>, o fluxo coronariano para a parede livre do VD cessa, provocando <strong>isquemia e microinfarto subendocárdico do VD</strong> (com liberação de <strong>Troponina I e T</strong>), queda catastrófica da contratilidade do VD, piora do choque e parada cardiorrespiratória (tipicamente em <strong>Atividade Elétrica Sem Pulso — AESP</strong>)!</li>
</ol>

<h3>Fisiopatologia Respiratória e Gasométrica no TEP</h3>
<p>Por que o paciente com embolia pulmonar apresenta dispneia, hipoxemia e hipocapnia? Embora a obstrução arterial de alvéolos ventilados crie inicialmente áreas de <strong>efeito espaço morto alveolar</strong> (relação ventilação/perfusão $V/Q = \infty$, onde há ventilação sem perfusão), o mecanismo principal que causa a <strong>hipoxemia arterial</strong> no TEP é a redistribuição forçada de todo o débito sanguíneo do ventrículo direito para as zonas pulmonares não embolizadas: essas áreas recebem um fluxo sanguíneo excessivo em relação à sua ventilação (somado à atelectasia alveolar induzida pela perda de surfactante e broncoconstrição reflexa nas zonas isquêmicas), gerando áreas de <strong>baixa relação $V/Q$ (efeito <em>shunt</em> funcional)</strong>! Nos casos graves com pressão atrial direita muito elevada, pode ocorrer abertura de um <strong>forame oval patente</strong> (presente em ~25% da população) com <em>shunt</em> intracardíaco direita-esquerda verdadeiro e hipoxemia refratária ao oxigênio suplementar.</p>
<p>Portanto, o padrão gasométrico clássico da embolia pulmonar aguda é:</p>
<ul>
  <li><strong>Hipoxemia arterial</strong> ($\text{PaO}_2 &lt; 80\text{ mmHg}$) acompanhada de <strong>Hipocapnia ($\text{PaCO}_2 &lt; 35\text{ mmHg}$) e Alcalose Respiratória</strong> (secundárias à hiperventilação reflexa estimulada por receptores J justacapilares pulmonares e quimiorreceptores periféricos); e</li>
  <li><strong>Aumento do gradiente alvéolo-arterial de oxigênio ($P(\text{A-a})\text{O}_2 &gt; 15\text{–}20\text{ mmHg}$).</strong> <em>Nota de prova: até 15% a 20% dos pacientes com TEP submaciço/pequeno e reserva cardiopulmonar jovem podem apresentar $\text{PaO}_2$ e $\text{SpO}_2$ normais em ar ambiente, mas quase sempre terão aumento do gradiente alvéolo-arterial de $\text{O}_2$ ou hipocapnia! Nos casos de TEP maciço com exaustão muscular respiratória ou choque profundo, pode instalar-se acidose mista (láctica + hipercapnia pelo enorme espaço morto fisiológico).</em></li>
</ul>
`
    },
    {
      id: 'diagnostico-tvp-wells-doppler',
      title: '3. Trombose Venosa Profunda (TVP): Semiologia, Escore de Wells para TVP e USG Doppler Compressivo',
      body_html: `
<h3>Anatomia Venosa Profunda, Quadro Clínico e as Formas Extremas (Phlegmasia)</h3>
<p>A trombose venosa profunda acomete os membros inferiores em mais de 90% dos casos e divide-se anatomicamente em duas categorias com implicações prognósticas muito distintas:</p>
<ul>
  <li><strong>TVP Distal (Infrapoplítea ou de Panturrilha):</strong> restrita às veias tibiais anteriores, tibiais posteriores, fibulares e plexos musculares gastrocnêmio e solear. É a localização onde a maioria dos trombos se inicia, mas possui baixo potencial emboligênico imediato caso permaneça restrita à panturrilha (cerca de 15% a 20% das TVPs distais não tratadas propagam-se proximalmente para a veia poplítea em 1 a 2 semanas).</li>
  <li><strong>TVP Proximal (Poplítea, Femoral e Ilíaca):</strong> acomete a <strong>veia poplítea, a veia femoral, a veia femoral comum e/ou as veias ilíacas</strong>. Possui <strong>altíssimo potencial emboligênico</strong> (até 50% dos pacientes com TVP proximal não tratada desenvolvem embolia pulmonar clinicamente significativa!) e exige anticoagulação plena imediata em 100% dos casos. <em>Atenção para uma pegadinha clássica de nomenclatura anatômica em provas:</em> a antiga "veia femoral superficial" (hoje corretamente chamada apenas de <strong>veia femoral</strong>) <strong>FAZ PARTE DO SISTEMA VENOSO PROFUNDO PROXIMAL</strong>! Portanto, uma trombose da "veia femoral superficial" é uma <strong>TVP proximal verdadeira</strong> e deve receber anticoagulação plena (nunca confundi-la com tromboflebite superficial da veia safena magna ou parva!).</li>
</ul>
<p>Clinicamente, a TVP manifesta-se por <strong>edema unilateral assimétrico</strong> do membro inferior (particularmente uma diferença de circunferência da panturrilha <strong>&gt; 3 cm</strong> medida 10 cm abaixo da tuberosidade tibial anterior, que é o sinal isolado mais específico ao exame físico), dor espontânea ou à palpação do trajeto venoso profundo, empastamento muscular da panturrilha, calor local, eritema/cianose pendente e dilatação de veias superficiais colaterais não varicosas. Os sinais semiológicos clássicos (<strong>Sinal de Homans</strong> — dor na panturrilha à dorsiflexão passiva do pé; <strong>Sinal da Bandeira</strong> — redução da mobilidade/balanço passivo da panturrilha; e <strong>Sinal de Bancroff ou Moses</strong> — dor à compressão anteroposterior da panturrilha contra a membrana interóssea tibial) possuem baixa sensibilidade e especificidade (&lt; 50%), não podendo jamais confirmar nem excluir o diagnóstico isoladamente.</p>
<p>Nas tromboses iliofemorais maciças que ocluem quase toda a drenagem venosa do membro inferior, podem surgir duas síndromes vasculares extremas:</p>
<ul>
  <li><strong><em>Phlegmasia Alba Dolens</em> ("Perna Branca Dolorosa" ou <em>Milk Leg</em>):</strong> trombose iliofemoral extensa associada a espasmo arterial reflexo e edema intersticial que comprime os capilares dérmicos superficiais, deixando o membro edemaciado, doloroso e pálido/esbranquiçado, porém ainda sem isquemia tecidual irreversível (pulsos distais presentes ou levemente diminuídos). Muito associada à gestação/puerpério e à síndrome de May-Thurner.</li>
  <li><strong><em>Phlegmasia Cerulea Dolens</em> ("Perna Azul Dolorosa"):</strong> oclusão trombótica maciça e quase total de todas as vias de drenagem venosa profunda e colateral superficial do membro. A pressão venosa e intersticial sobe a níveis tão extremos que supera a pressão de perfusão arterial, sequestrando litros de fluido no membro (choque hipovolêmico) e interrompendo o influxo arterial! O membro torna-se intensamente cianótico/violáceo, frio, com flictenas hemorrágicas, dor excruciante, déficit sensitivo-motor e perda dos pulsos arteriais, evoluindo para <strong>gangrena venosa</strong> e amputação se não for submetido a trombólise dirigida por cateter, trombectomia cirúrgica/mecânica ou fasciotomia de emergência!</li>
</ul>

<h3>Escore de Wells para Trombose Venosa Profunda (TVP)</h3>
<p>Como a clínica isolada é imprecisa, a abordagem diagnóstica da TVP inicia-se obrigatoriamente pelo cálculo da probabilidade clínica pré-teste utilizando o <strong>Escore de Wells para TVP</strong>:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Critério Clínico do Escore de Wells para TVP</th>
      <th>Pontuação</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Câncer em atividade (tratamento atual, nos últimos 6 meses ou paliativo)</td>
      <td><strong>+1,0 ponto</strong></td>
    </tr>
    <tr>
      <td>Paralisia, paresia ou imobilização gessada recente de membros inferiores</td>
      <td><strong>+1,0 ponto</strong></td>
    </tr>
    <tr>
      <td>Restrição ao leito por &ge; 3 dias, ou cirurgia de grande porte nas últimas 12 semanas com anestesia geral/regional</td>
      <td><strong>+1,0 ponto</strong></td>
    </tr>
    <tr>
      <td>Dor localizada à palpação ao longo da distribuição do sistema venoso profundo</td>
      <td><strong>+1,0 ponto</strong></td>
    </tr>
    <tr>
      <td>Edema de todo o membro inferior acometido</td>
      <td><strong>+1,0 ponto</strong></td>
    </tr>
    <tr>
      <td>Edema da panturrilha &gt; 3 cm em comparação com a perna assintomática (medido 10 cm abaixo da tuberosidade tibial)</td>
      <td><strong>+1,0 ponto</strong></td>
    </tr>
    <tr>
      <td>Edema depressível (cacifo / sinal de Godet) restrito à perna sintomática</td>
      <td><strong>+1,0 ponto</strong></td>
    </tr>
    <tr>
      <td>Veias superficiais colaterais visíveis (não varicosas)</td>
      <td><strong>+1,0 ponto</strong></td>
    </tr>
    <tr>
      <td>História prévia documentada de TVP</td>
      <td><strong>+1,0 ponto</strong></td>
    </tr>
    <tr>
      <td><strong>Diagnóstico alternativo pelo menos tão provável quanto TVP</strong> (ex.: cisto de Baker roto, celulite/erisipela, estiramento muscular)</td>
      <td><strong>-2,0 pontos</strong></td>
    </tr>
  </tbody>
</table>

<h4>Interpretação do Escore de Wells para TVP e Algoritmo Diagnóstico</h4>
<ul>
  <li><strong>Classificação em 2 níveis (Dicotômica):</strong> <strong>TVP Improvável (&le; 1 ponto)</strong> vs. <strong>TVP Provável (&ge; 2 pontos)</strong>. (Na classificação original em 3 níveis: Baixa probabilidade &le; 0; Moderada 1 a 2; Alta &ge; 3 pontos).</li>
  <li><strong>Conduta na TVP Improvável (Wells &le; 1 ponto) ou Baixa Probabilidade:</strong> Solicitar inicialmente a dosagem do <strong>D-dímero plasmático de alta sensibilidade (ELISA)</strong>. Como o D-dímero possui altíssimo valor preditivo negativo (&gt; 99%), se o <strong>D-dímero for negativo (&lt; 500 ng/mL ou ajustado para idade)</strong>, o diagnóstico de TVP está <strong>excluído com segurança</strong> sem necessidade de ultrassonografia! Se o D-dímero for positivo, realiza-se o <strong>Ultrassom Doppler Venoso Compressivo (CUS)</strong>.</li>
  <li><strong>Conduta na TVP Provável (Wells &ge; 2 pontos) ou Alta Probabilidade:</strong> O valor preditivo negativo do D-dímero não é suficiente para descartar a doença sozinho; portanto, deve-se realizar <strong>diretamente o Ultrassom Doppler Venoso Compressivo (CUS) dos membros inferiores</strong>! O critério ultrassonográfico primário e definitivo que confirma TVP é a <strong>perda da compressibilidade (incompressibilidade) da luz venosa sob pressão direta do transdutor</strong>. (Caso se realize apenas CUS proximal de 2 pontos — femoral comum e poplítea — em paciente de alta probabilidade e o resultado inicial seja negativo, mas o D-dímero seja positivo, deve-se repetir o CUS em 5 a 7 dias para descartar propagação de trombo distal da panturrilha; já se for realizado o Doppler colorido completo de toda a perna desde o início e for negativo, exclui-se TVP).</li>
</ul>
`
    },
    {
      id: 'diagnostico-clinico-tep-wells-genebra-perc',
      title: '4. Diagnóstico Clínico da Embolia Pulmonar: Escores de Wells, Genebra Revisado e Critérios PERC',
      body_html: `
<h3>Síndromes Clínicas de Apresentação do TEP Agudo</h3>
<p>A embolia pulmonar é conhecida como "a grande imitadora" da medicina de emergência, pois seus sinais e sintomas são inespecíficos. Os sintomas mais frequentes nos grandes registros (PIOPED II) são: <strong>dispneia de início súbito ou piora abrupta (presente em ~80% dos casos)</strong>, <strong>dor torácica pleurítica (~50%)</strong>, tosse (~20%), síncope ou pré-síncope (~15%, muito associada a embolia central/em sela com obstrução aguda do fluxo de saída do VD), dor/edema unilateral em panturrilha (~25%) e <strong>hemoptise (~10%)</strong>. Classicamente, o TEP apresenta-se sob uma de três síndromes clínicas correlacionadas à topografia do êmbolo:</p>
<ol>
  <li><strong>Síndrome do Infarto Pulmonar e Hemoptise (Embolia Periférica / Subsegmentar):</strong> êmbolos menores que se alojam nas artérias pulmonares distais próximas à pleura visceral (onde a circulação brônquica nutridora pode ser insuficiente se houver congestão venosa), causando necrose hemorrágica alveolar focal. Manifesta-se pela tríade de <strong>dor torácica pleurítica bem localizada, hemoptise de pequeno volume e atrito pleural ou pequeno derrame pleural exsudativo/hemorrágico</strong>, geralmente com estabilidade hemodinâmica preservada.</li>
  <li><strong>Síndrome da Dispneia Isolada Súbita e Hipoxemia inexplicada (Embolia Lobar / Segmentar Moderada):</strong> dispneia aguda, taquipneia (FR &gt; 20 irpm) e taquicardia sinusal sem dor pleurítica e sem achados na ausculta pulmonar.</li>
  <li><strong>Síndrome do Colapso Circulatório / Choque Obstrutivo ou Síncope (Embolia Central / Maciça ou "Em Sela"):</strong> grandes trombos alojados na bifurcação do tronco da artéria pulmonar ou nos ramos principais direito e esquerdo, causando síncope, hipotensão arterial, turgência jugular, cianose central e parada cardiorrespiratória em AESP.</li>
</ol>

<h3>Estratificação da Probabilidade Clínica Pré-Teste: Escore de Wells para TEP e Genebra Revisado</h3>
<p>Toda suspeita de TEP hemodinamicamente estável deve iniciar pela aplicação de uma regra validada de predição clínica — o <strong>Escore de Wells para TEP</strong> ou o <strong>Escore de Genebra Revisado</strong>:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Critério Clínico do Escore de Wells para TEP</th>
      <th>Pontos (Original)</th>
      <th>Pontos (Simplificado)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Sinais e sintomas clínicos de TVP</strong> (edema de membro inferior e dor à palpação das veias profundas)</td>
      <td><strong>+3,0</strong></td>
      <td>+1,0</td>
    </tr>
    <tr>
      <td><strong>Diagnóstico alternativo é MENOS provável que TEP</strong> (TEP é a 1ª hipótese diagnóstica)</td>
      <td><strong>+3,0</strong></td>
      <td>+1,0</td>
    </tr>
    <tr>
      <td><strong>Frequência cardíaca &gt; 100 bpm</strong> (taquicardia)</td>
      <td><strong>+1,5</strong></td>
      <td>+1,0</td>
    </tr>
    <tr>
      <td><strong>Imobilização (&ge; 3 dias consecutivos) ou cirurgia nas últimas 4 semanas</strong></td>
      <td><strong>+1,5</strong></td>
      <td>+1,0</td>
    </tr>
    <tr>
      <td><strong>História prévia de TVP ou TEP objetivamente diagnosticados</strong></td>
      <td><strong>+1,5</strong></td>
      <td>+1,0</td>
    </tr>
    <tr>
      <td><strong>Hemoptise</strong></td>
      <td><strong>+1,0</strong></td>
      <td>+1,0</td>
    </tr>
    <tr>
      <td><strong>Câncer em atividade</strong> (tratamento atual, nos últimos 6 meses ou paliativo)</td>
      <td><strong>+1,0</strong></td>
      <td>+1,0</td>
    </tr>
  </tbody>
</table>

<h4>Pontos de Corte do Escore de Wells para TEP (Domínio Obrigatório de Prova!)</h4>
<ul>
  <li><strong>Escore de 3 Níveis (Clássico):</strong> <strong>Baixa probabilidade: &lt; 2 pontos (0 a 1,5)</strong>; <strong>Probabilidade Intermediária (Moderada): 2 a 6 pontos</strong>; <strong>Alta probabilidade: &gt; 6 pontos (&ge; 6,5)</strong>.</li>
  <li><strong>Escore de 2 Níveis (Dicotômico — Preferido nos fluxogramas de D-dímero):</strong> <strong>TEP Improvável: &le; 4,0 pontos (0 a 4,0)</strong> vs. <strong>TEP Provável: &gt; 4,0 pontos (&ge; 4,5)</strong>. (Na versão simplificada: TEP Improvável &le; 1 ponto; TEP Provável &ge; 2 pontos).</li>
  <li><em>Nota sobre o Escore de Genebra Revisado:</em> Ao contrário do escore de Wells (que inclui o item subjetivo "diagnóstico alternativo menos provável que TEP", valendo 3 pontos), o <strong>Escore de Genebra Revisado é 100% objetivo</strong>, avaliando: idade &gt; 65 anos (+1), TVP/TEP prévio (+3), cirurgia ou fratura no último mês (+2), neoplasia ativa (+2), dor unilateral em membro inferior (+3), hemoptise (+2), FC de 75–94 bpm (+3) ou FC &ge; 95 bpm (+5), e dor à palpação venosa profunda e edema unilateral (+4).</li>
</ul>

<h3>Critérios PERC (<em>Pulmonary Embolism Rule-out Criteria</em>): Quando Nem o D-dímero é Necessário!</h3>
<p>Para evitar a solicitação excessiva de D-dímero (que gera falsos-positivos e angiotomografias desnecessárias) em pacientes atendidos no pronto-socorro com queixas vagas e <strong>baixa probabilidade clínica pré-teste</strong>, Kline et al. desenvolveram a regra <strong>PERC</strong>, composta por <strong>8 critérios clínicos</strong>:</p>
<ol>
  <li><strong>Idade &lt; 50 anos;</strong></li>
  <li><strong>Frequência cardíaca &lt; 100 bpm;</strong></li>
  <li><strong>Saturação arterial de oxigênio ($\text{SpO}_2$) &ge; 95% em ar ambiente;</strong></li>
  <li><strong>Ausência de edema unilateral de membro inferior;</strong></li>
  <li><strong>Ausência de hemoptise;</strong></li>
  <li><strong>Ausência de trauma ou cirurgia que exigiu hospitalização nas últimas 4 semanas;</strong></li>
  <li><strong>Ausência de história prévia de TVP ou TEP;</strong></li>
  <li><strong>Ausência de uso de estrogênios exógenos</strong> (anticoncepcional oral combinado ou terapia de reposição hormonal).</li>
</ol>
<p><strong>Como aplicar o PERC na prova:</strong> Se o paciente tem <strong>baixa probabilidade pré-teste</strong> e preenche todos os 8 critérios de segurança acima (ou seja, não apresenta nenhum fator de risco do PERC: <strong>PERC = 0</strong>), o risco residual de TEP é inferior a 1% e o <strong>diagnóstico de TEP está descartado clinicamente, SEM necessidade de solicitar D-dímero nem Angio-TC</strong>! Se falhar em qualquer um dos 8 itens, prossegue-se com a dosagem do D-dímero.</p>
`
    },
    {
      id: 'd-dimero-ajustado-idade-algoritmo-years',
      title: '5. Biomarcadores Diagnósticos e Algoritmos de Exclusão: D-Dímero Ajustado para Idade e Algoritmo YEARS',
      body_html: `
<h3>Fisiologia do D-Dímero: Altíssima Sensibilidade, Baixa Especificidade</h3>
<p>O <strong>D-dímero</strong> é um produto específico de degradação da fibrina estabilizada (com ligações cruzadas covalentes promovidas pelo Fator XIIIa) pela ação proteolítica da plasmina endógena. A formação de qualquer trombo agudo intravascular aciona simultaneamente a fibrinólise endógena, elevando o D-dímero plasmático. Quando medido por ensaios quantitativos de alta sensibilidade (ELISA ou imunoturbidimetria automatizada), o D-dímero apresenta <strong>sensibilidade &ge; 95% a 98%</strong> para TEV agudo, conferindo-lhe um <strong>excelente Valor Preditivo Negativo (VPN &gt; 99%)</strong> em pacientes com probabilidade clínica baixa ou intermediária (ou "TEP improvável").</p>
<p>Em contrapartida, sua <strong>especificidade é baixa (~40% a 50%)</strong>, pois o D-dímero eleva-se fisiológica ou patologicamente em inúmeras condições sem tromboembolismo: idade avançada, gestação e puerpério, câncer, pós-operatório recente, trauma, infecções graves/sepse, coagulação intravascular disseminada (CIVD), insuficiência renal, hepatopatia e pacientes internados há vários dias. <strong>Regra de Ouro: Um D-dímero positivo NUNCA confirma o diagnóstico de TVP ou TEP</strong> (apenas indica a realização do exame de imagem confirmatório), e nos pacientes com <strong>alta probabilidade pré-teste (ou "TEP provável", Wells &gt; 4)</strong>, <strong>NÃO se deve solicitar D-dímero</strong> (pois mesmo que viesse negativo, não teria poder estatístico suficiente para excluir a doença), devendo-se partir diretamente para a Angio-TC de artérias pulmonares!</p>

<h3>D-Dímero Ajustado para a Idade (Estudo ADJUST-PE e Diretriz ESC 2019 / SBC)</h3>
<p>Em indivíduos acima de 50 anos, os níveis basais de D-dímero aumentam fisiologicamente com o envelhecimento, fazendo com que a especificidade do ponto de corte fixo tradicional de <strong>500 ng/mL (ou 0,5 mcg/mL FEU)</strong> caia para apenas 10% a 15% em idosos octogenários! Para aumentar a especificidade e evitar angiotomografias desnecessárias sem perder a segurança diagnóstica (validado no estudo multicêntrico <em>ADJUST-PE</em>), a Diretriz ESC 2019 e a SBC recomendam como Classe IIa o uso do <strong>ponto de corte de D-dímero ajustado para a idade em pacientes com &gt; 50 anos</strong>:</p>
<ul>
  <li><strong>Pacientes com idade &le; 50 anos:</strong> ponto de corte padrão fixo de <strong>&lt; 500 ng/mL</strong> (unidades equivalentes de fibrinogênio — FEU).</li>
  <li><strong>Pacientes com idade &gt; 50 anos:</strong> <strong>$\text{Ponto de Corte Máximo Normal (ng/mL)} = \text{Idade (em anos)} \times 10\text{ ng/mL}$</strong>!
    <br><em>Exemplo prático de prova:</em> Uma paciente de <strong>74 anos</strong> chega ao pronto-socorro com dispneia leve, escore de Wells = 2,0 pontos (TEP improvável) e apresenta D-dímero = <strong>680 ng/mL</strong>. Pelo corte antigo (500 ng/mL), seria considerado positivo; porém, aplicando o corte ajustado para a idade ($74 \times 10 = 740\text{ ng/mL}$), como $680 &lt; 740\text{ ng/mL}$, o <strong>D-dímero é NEGATIVO</strong> e o diagnóstico de TEP está <strong>totalmente descartado</strong>, sem necessidade de Angio-TC!</li>
</ul>

<h3>O Algoritmo YEARS (Ajuste do D-Dímero pela Probabilidade Clínica e Uso na Gestação)</h3>
<p>Uma alternativa moderna e simplificada ao escore de Wells e ao corte ajustado por idade é o <strong>Algoritmo YEARS</strong> (validado tanto na população geral quanto em gestantes — estudo <em>ARTEMIS</em>). No algoritmo YEARS, avaliam-se simultaneamente o D-dímero e apenas <strong>3 itens clínicos (Critérios YEARS)</strong>:</p>
<ol>
  <li><strong>Sinais clínicos de TVP;</strong></li>
  <li><strong>Hemoptise;</strong></li>
  <li><strong>TEP é o diagnóstico mais provável</strong> do que qualquer hipótese alternativa.</li>
</ol>
<p>A interpretação do algoritmo YEARS utiliza dois limiares distintos de D-dímero:</p>
<ul>
  <li>Se o paciente tem <strong>ZERO critérios YEARS (0 itens presentes)</strong>: o TEP é excluído com segurança se o <strong>D-dímero for &lt; 1.000 ng/mL</strong>! (Só realiza Angio-TC se o D-dímero for &ge; 1.000 ng/mL).</li>
  <li>Se o paciente tem <strong>&ge; 1 critério YEARS presente (1, 2 ou 3 itens)</strong>: o TEP só é excluído se o <strong>D-dímero for &lt; 500 ng/mL</strong>! (Se o D-dímero for &ge; 500 ng/mL, realiza Angio-TC).</li>
  <li><em>Adaptação do YEARS na Gestação (ARTEMIS):</em> se a gestante apresentar sinais clínicos de TVP, realiza-se primeiro ultrassonografia venosa compressiva dos membros inferiores; se a USG confirmar TVP, inicia-se anticoagulação com enoxaparina sem precisar irradiar o tórax com Angio-TC! Se a USG for negativa ou não houver sintomas de TVP, aplica-se a regra dos 1.000 ng/mL (0 critérios YEARS) vs. 500 ng/mL (&ge; 1 critério YEARS).</li>
</ul>
`
    },
    {
      id: 'exames-complementares-ecg-rx-angiotc-vq',
      title: '6. Exames Complementares no TEP: ECG (S1Q3T3), Radiografia (Westermark/Hampton), Angio-TC e Cintilografia V/Q',
      body_html: `
<h3>Eletrocardiograma (ECG) na Embolia Pulmonar: Taquicardia Sinusal vs. S1Q3T3</h3>
<p>Esta é uma das perguntas mais clássicas de todas as provas de residência médica: <em>"Qual é a alteração eletrocardiográfica MAIS COMUM no tromboembolismo pulmonar?"</em> e <em>"Qual é a alteração MAIS ESPECÍFICA / CLÁSSICA de sobrecarga aguda de VD?"</em></p>
<ul>
  <li><strong>Alteração eletrocardiográfica MAIS COMUM no TEP:</strong> é a <strong>Taquicardia Sinusal</strong> (presente em 40% a 70% dos casos), seguida de alterações inespecíficas do segmento ST e da onda T.</li>
  <li><strong>Sinal Eletrocardiográfico de Maior Valor Prognóstico Adverso (Sobrecarga Isquêmica de VD):</strong> é a <strong>inversão das ondas T nas derivações precordiais direitas/anteriores de V1 a V4</strong> (frequentemente acompanhada de inversão de T nas derivações inferiores D2, D3 e aVF), que reflete dilatação e isquemia aguda da parede anterior do ventrículo direito!</li>
  <li><strong>Padrão Clássico de McGinn-White ($S_1Q_3T_3$):</strong> consiste na presença simultânea de uma <strong>onda S profunda na derivação D1</strong> ($&gt; 1,5\text{ mm}$, refletindo atraso final de condução para a direita), uma <strong>onda Q na derivação D3</strong> (poupando D2) e uma <strong>onda T negativa (invertida) na derivação D3</strong>. Embora seja o sinal mais famoso de sobrecarga aguda do ventrículo direito (<em>cor pulmonale</em> agudo), o padrão $S_1Q_3T_3$ tem baixa sensibilidade, estando presente em apenas <strong>10% a 20% dos pacientes com TEP</strong> (sobretudo nos casos graves/maciços). Outros achados de sobrecarga direita incluem bloqueio completo ou incompleto do ramo direito (BRD novo), desvio agudo do eixo elétrico do QRS para a direita (&gt; +90°), onda P <em>pulmonale</em> (apiculada em D2 &gt; 2,5 mm) e Complexo QRS do tipo $qR$ na derivação V1.</li>
</ul>

<h3>Radiografia de Tórax no TEP: Os Três Sinais Epônimos Clássicos</h3>
<p>Na maioria dos pacientes com embolia pulmonar, a radiografia de tórax é <strong>anormal, porém com achados inespecíficos</strong> (atelectasias laminares subsegmentares de Fleischner, elevação da hemicúpula diafragmática ipsilateral e pequeno derrame pleural), ou é <strong>completamente normal</strong> (15% a 25% dos casos — sendo importante notar que uma radiografia de tórax limpa em um paciente francamente dispneico e hipoxêmico é altamente sugestiva de TEP!). Três sinais radiográficos clássicos (raros, porém específicos) são sistematicamente cobrados em provas:</p>
<ol>
  <li><strong>Sinal de Westermark (Oligoemia Focal):</strong> hipertransparência localizada do parênquima pulmonar com desaparecimento abrupto (pobreza) da trama vascular pulmonar distal ao ponto de oclusão embólica de um ramo arterial lobar ou segmentar.</li>
  <li><strong>Corcova de Hampton (<em>Hampton's Hump</em>):</strong> opacidade parenquimatosa periférica densa, homogênea, em <strong>formato de cunha triangular</strong>, cuja <strong>base apoia-se amplamente sobre a superfície pleural</strong> (frequentemente no seio costofrênico) e cujo <strong>ápice truncado (arredondado como uma corcova) aponta em direção ao hilo pulmonar</strong>. Representa radiograficamente a zona de <strong>infarto pulmonar hemorrágico</strong> distal à artéria ocluída.</li>
  <li><strong>Sinal de Fleischner (ou Sinal de Palla):</strong> dilatação proeminente da artéria pulmonar central descendente direita (Sinal de Palla, assemelhando-se a uma "salsicha" hilar) ou de uma artéria pulmonar principal central (Sinal de Fleischner) com amputação súbita do calibre vascular distalmente (causada pela impactação de um grande êmbolo central e pela hipertensão pulmonar aguda).</li>
</ol>

<h3>Angiotomografia Computadorizada de Artérias Pulmonares (Angio-TC) vs. Cintilografia V/Q</h3>
<p>A <strong>Angiotomografia Computadorizada de Artérias Pulmonares com múltiplos detectores (Angio-TC / CTPA)</strong> é o <strong>exame de imagem de primeira escolha (padrão-ouro prático atual)</strong> para confirmação diagnóstica da embolia pulmonar (sensibilidade de 83% a 96% e especificidade de 95% a 98%). O critério diagnóstico direto na Angio-TC é a visualização de uma <strong>falha de enchimento hipodensa intraluminal</strong> central (circundada por contraste — "sinal do trilho de trem" no corte longitudinal ou "sinal do alvo/<em>polo mint</em>" no corte transversal) ou oclusão total de um ramo arterial pulmonar com interrupção abrupta da coluna de contraste, além de fornecer diagnósticos alternativos (pneumonia, dissecção aórtica, pneumotórax) e permitir medir a <strong>razão entre o diâmetro do VD e do VE ($\text{VD/VE}$)</strong> para estratificação prognóstica.</p>
<p>A <strong>Cintilografia Pulmonar de Ventilação/Perfusão (Cintilografia V/Q ou SPECT V/Q)</strong> utiliza macroagregados de albumina marcados com $\text{Tc}^{99\text{m}}$ (fase de perfusão) e gases/aerossóis radioativos (fase de ventilação). O diagnóstico cintilográfico de TEP baseia-se na presença de <strong>defeitos perfusionais segmentares em cunha com ventilação preservada (discordância ou <em>mismatch</em> V/Q)</strong>. Por utilizar menor dose de radiação sobre o tecido mamário materno e não empregar contraste iodado nefrotóxico, a Cintilografia V/Q é o exame de escolha nas seguintes situações clássicas de prova:</p>
<ul>
  <li><strong>Insuficiência renal grave (TFGe &lt; 30 mL/min/1,73 m²);</strong></li>
  <li><strong>Alergia anafilática grave documentada ao meio de contraste iodado;</strong></li>
  <li><strong>Gestantes com radiografia de tórax normal</strong> (se a radiografia de tórax for anormal — com infiltrado ou derrame pleural —, a cintilografia V/Q terá alta taxa de resultados "indeterminados/não diagnósticos", preferindo-se então a Angio-TC com protocolo de baixa dose ou apenas a fase de perfusão isolada);</li>
  <li><strong>Investigação inicial de escolha da Hipertensão Pulmonar Tromboembólica Crônica (HPTEC)!</strong></li>
</ul>
<p>Por fim, em um paciente com suspeita de TEP que apresente sinais de TVP (ou seja gestante ou renal crônico), a realização de <strong>Ultrassonografia Doppler Compressiva (CUS) de membros inferiores</strong> que demonstre <strong>TVP proximal já é suficiente para confirmar o diagnóstico de TEV e autorizar o início imediato da anticoagulação plena</strong>, dispensando a realização de Angio-TC em pacientes estáveis!</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Sinal ou Exame Propedêutico no TEP</th>
      <th>Achado Clássico / Descrição</th>
      <th>Significado Clínico e Aplicabilidade de Prova</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>ECG — Alteração Mais Comum</strong></td>
      <td><strong>Taquicardia Sinusal</strong> (&gt; 100 bpm)</td>
      <td>Achado mais frequente (40–70%), porém inespecífico; pontua +1,5 no Wells</td>
    </tr>
    <tr>
      <td><strong>ECG — Sobrecarga de VD / $S_1Q_3T_3$</strong></td>
      <td>Onda S em D1, onda Q em D3 e T negativa em D3; inversão de T de V1 a V4</td>
      <td>Inversão de T em V1–V4 indica isquemia/sobrecarga grave do VD; $S_1Q_3T_3$ é específico, mas ocorre em apenas 10–20%</td>
    </tr>
    <tr>
      <td><strong>RX de Tórax — Sinal de Westermark</strong></td>
      <td>Oligoemia / hipertransparência focal com pobreza vascular distal</td>
      <td>Reflete obstrução do fluxo arterial pulmonar para um lobo/segmento</td>
    </tr>
    <tr>
      <td><strong>RX de Tórax — Corcova de Hampton</strong></td>
      <td>Opacidade triangular periférica com base pleural e ápice voltado ao hilo</td>
      <td>Representa <strong>infarto pulmonar hemorrágico</strong> (geralmente êmbolos periféricos com dor pleurítica e hemoptise)</td>
    </tr>
    <tr>
      <td><strong>RX de Tórax — Sinal de Fleischner / Palla</strong></td>
      <td>Dilatação central da artéria pulmonar principal ou interlobar descendente direita</td>
      <td>Sugere grande êmbolo central impactado e hipertensão pulmonar aguda</td>
    </tr>
    <tr>
      <td><strong>Angio-TC de Artérias Pulmonares</strong></td>
      <td>Falha de enchimento intraluminal na árvore arterial pulmonar</td>
      <td><strong>Exame confirmatório de 1ª escolha</strong>; avalia também razão VD/VE (&ge; 1,0 indica disfunção de VD)</td>
    </tr>
    <tr>
      <td><strong>Cintilografia Pulmonar V/Q</strong></td>
      <td>Hipoperfusão segmentar com ventilação normal (<em>mismatch</em> V/Q)</td>
      <td>Escolha em <strong>alergia grave ao iodo, DRC grave (TFG &lt; 30), gestantes com RX normal e triagem de HPTEC</strong></td>
    </tr>
  </tbody>
</table>
`
    },
    {
      id: 'estratificacao-gravidade-risco-esc-pesi',
      title: '7. Estratificação de Risco e Gravidade no TEP Agudo (Diretriz ESC / SBC): PESI, sPESI, Eco e Biomarcadores',
      body_html: `
<h3>Os 4 Níveis de Risco de Mortalidade Precoce no TEP (ESC 2019 / SBC)</h3>
<p>Uma vez confirmado (ou diante de alta suspeita com choque) o diagnóstico de embolia pulmonar, o passo imediato e obrigatório para definir se o paciente receberá <strong>trombólise sistêmica na UTI, anticoagulação hospitalar monitorada ou alta precoce com DOAC oral</strong> é a <strong>estratificação prognóstica de risco de morte precoce (intra-hospitalar ou em 30 dias)</strong>. A Diretriz da Sociedade Europeia de Cardiologia (ESC) e a SBC integram quatro pilares prognósticos: (1) <strong>Estabilidade Hemodinâmica</strong>; (2) <strong>Escores Clínicos de Gravidade (PESI ou sPESI)</strong>; (3) <strong>Disfunção do Ventrículo Direito em exames de imagem (Ecocardiograma ou Angio-TC)</strong>; e (4) <strong>Biomarcadores de Injúria Miocárdica (Troponina I ou T) e de Estiramento Ventricular (BNP ou NT-proBNP)</strong>.</p>

<h4>1. Definição Oficial de Instabilidade Hemodinâmica (TEP de ALTO RISCO / "TEP Maciço")</h4>
<p>Um paciente com TEP é classificado como de <strong>Alto Risco (mortalidade precoce &gt; 15% a 30%, historicamente chamado de TEP Maciço)</strong> quando apresenta qualquer uma das três apresentações de <strong>instabilidade hemodinâmica</strong> abaixo:</p>
<ol>
  <li><strong>Parada Cardiorrespiratória (PCR):</strong> necessidade de ressuscitação cardiopulmonar (habitualmente em AESP);</li>
  <li><strong>Choque Obstrutivo:</strong> pressão arterial sistólica (PAS) <strong>&lt; 90 mmHg</strong>, ou necessidade de vasopressores para manter PAS &ge; 90 mmHg apesar de volemia adequada, <strong>associada a sinais clínicos/laboratoriais de hipoperfusão orgânica</strong> (alteração do estado mental/confusão, pele fria e pegajosa, oligúria/anúria e elevação do lactato arterial &gt; 2 mmol/L);</li>
  <li><strong>Hipotensão Arterial Persistente:</strong> PAS <strong>&lt; 90 mmHg</strong> OU uma <strong>queda da pressão arterial sistólica &ge; 40 mmHg em relação ao basal, sustentada por mais de 15 minutos</strong>, não explicada por arritmia de início recente, hipovolemia ou sepse.</li>
</ol>
<p><em>Nota conceitual fundamental de prova:</em> O termo "TEP Maciço" (Alto Risco) é uma definição <strong>estritamente hemodinâmica (choque/hipotensão)</strong>, e NÃO anatômica! Um paciente com um grande trombo "em sela" na bifurcação do tronco pulmonar que esteja com PA 125 × 80 mmHg, lúcido e bem perfundido <strong>NÃO tem TEP de alto risco (maciço)</strong>, mas sim TEP de risco intermediário!</p>

<h4>2. Escore PESI Simplificado (sPESI) — Triagem Clínica dos Pacientes Estáveis</h4>
<p>Nos pacientes hemodinamicamente estáveis (sem hipotensão), aplica-se o <strong>Índice de Gravidade da Embolia Pulmonar (PESI original de 11 variáveis, onde Classes I e II são baixo risco e Classes III a V são risco intermediário)</strong> ou sua versão prática amplamente cobrada em provas: o <strong>PESI Simplificado (sPESI)</strong>, composto por <strong>6 variáveis que valem 1 ponto cada</strong>:</p>
<ul>
  <li><strong>1. Idade &gt; 80 anos</strong> (+1 ponto);</li>
  <li><strong>2. História de Câncer</strong> (+1 ponto);</li>
  <li><strong>3. História de Insuficiência Cardíaca Crônica OU Doença Pulmonar Crônica</strong> (+1 ponto);</li>
  <li><strong>4. Frequência Cardíaca &ge; 110 bpm</strong> (+1 ponto);</li>
  <li><strong>5. Pressão Arterial Sistólica &lt; 100 mmHg</strong> (entre 90 e 99 mmHg) (+1 ponto);</li>
  <li><strong>6. Saturação Arterial de Oxigênio ($\text{SpO}_2$) &lt; 90% em ar ambiente</strong> (+1 ponto).</li>
</ul>
<p><strong>Interpretação do sPESI:</strong> Se <strong>sPESI = 0 pontos</strong> (e não houver disfunção de VD nem elevação de troponina), o risco de mortalidade em 30 dias é inferior a 1% (<strong>TEP de Baixo Risco</strong>). Se <strong>sPESI &ge; 1 ponto</strong>, a mortalidade sobe para ~10,9%, classificando o paciente como <strong>TEP de Risco Intermediário (Historicamente "TEP Submaciço")</strong>.</p>

<h4>3. Avaliação da Disfunção do Ventrículo Direito (Imagem) e Injúria Miocárdica (Troponina)</h4>
<p>Para subdividir o Risco Intermediário em <strong>Intermediário-Alto</strong> e <strong>Intermediário-Baixo</strong>, avaliam-se a imagem do VD e os biomarcadores:</p>
<ul>
  <li><strong>Sinais de Disfunção do VD na Angio-TC ou no Ecocardiograma:</strong>
    <br>• Na Angio-TC ou no ETT (corte apical 4 câmaras): <strong>Razão entre o diâmetro diastólico final do VD e do VE ($\text{VD/VE}$) &ge; 1,0 (ou &gt; 0,9)</strong> e retificação/abaulamento do septo interventricular em formato de "D";
    <br>• No Ecocardiograma: hipocinesia da parede livre do VD, redução da excursão sistólica do plano do anel tricúspide (<strong>TAPSE &lt; 16 mm</strong>), velocidade sistólica tecidual do anel tricúspide ($S' &lt; 9,5\text{ cm/s}$), dilatação da veia cava inferior sem colapso inspiratório e dois sinais ecocardiográficos altamente específicos de TEP agudo:
    <br>— <strong>Sinal de McConnell:</strong> acinesia ou hipocinesia acentuada dos segmentos basal e médio da parede livre do ventrículo direito com <strong>preservação (normocinesia ou hipercinesia) da contratilidade do ápice do VD</strong> (porque o ápice do VD está ancorado ao ápice hiperdinâmico do ventrículo esquerdo!);
    <br>— <strong>Sinal 60/60:</strong> tempo de aceleração do fluxo na via de saída pulmonar <strong>&lt; 60 ms</strong> associado a um gradiente sistólico máximo de regurgitação tricúspide <strong>&lt; 60 mmHg (porém &gt; 30 mmHg)</strong>.</li>
  <li><strong>Biomarcadores Laboratoriais:</strong> elevação de <strong>Troponina I ou T de alta sensibilidade</strong> (indicando injúria isquêmica subendocárdica do VD) e elevação de <strong>BNP (&gt; 100 pg/mL) ou NT-proBNP (&gt; 600 pg/mL)</strong> (indicando estiramento mecânico do VD).</li>
</ul>

<table class="book-table">
  <thead>
    <tr>
      <th>Categoria de Risco (ESC / SBC)</th>
      <th>Instabilidade Hemodinâmica (Choque / PAS &lt; 90)</th>
      <th>PESI Classe III–V ou sPESI &ge; 1</th>
      <th>Disfunção de VD na Imagem (Eco ou Angio-TC)</th>
      <th>Troponina Cardíaca Elevada</th>
      <th>Conduta Terapêutica Primária</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>ALTO RISCO ("Maciço")</strong></td>
      <td><strong>SIM (Presente)</strong></td>
      <td>(+)</td>
      <td><strong>SIM (Presente)</strong></td>
      <td>(+)</td>
      <td><strong>UTI + Reperfusão Imediata (Trombólise Sistêmica com Alteplase) + Anticoagulação Parenteral (HNF)</strong></td>
    </tr>
    <tr>
      <td><strong>RISCO INTERMEDIÁRIO-ALTO ("Submaciço Grave")</strong></td>
      <td>Não (Estável)</td>
      <td>SIM (+)</td>
      <td><strong>SIM (Presente)</strong></td>
      <td><strong>SIM (Positiva)</strong><br><em>(Ambos positivos: VD + Troponina!)</em></td>
      <td><strong>Internação em UTI/Semi-intensiva + Anticoagulação Plena</strong> (NÃO trombolisar de rotina; fazer <strong>trombólise de resgate</strong> se deteriorar!)</td>
    </tr>
    <tr>
      <td><strong>RISCO INTERMEDIÁRIO-BAIXO</strong></td>
      <td>Não (Estável)</td>
      <td>SIM (+)</td>
      <td colspan="2"><strong>Apenas UM positivo</strong> (só VD alterado OU só Troponina positiva) <strong>ou AMBOS negativos</strong></td>
      <td><strong>Internação em Enfermaria + Anticoagulação Plena</strong> (preferencialmente DOAC ou HBPM)</td>
    </tr>
    <tr>
      <td><strong>BAIXO RISCO</strong></td>
      <td>Não (Estável)</td>
      <td>Não (PESI I–II e sPESI = 0)</td>
      <td><strong>Ausente (Normal)</strong></td>
      <td><strong>Negativa (Normal)</strong></td>
      <td><strong>Alta Hospitalar Precoce (&lt; 24–48h) ou Tratamento Domiciliar com DOAC oral</strong> (se suporte social adequado)</td>
    </tr>
  </tbody>
</table>
`
    },
    {
      id: 'tratamento-tep-alto-risco-trombolise',
      title: '8. Manejo do TEP de Alto Risco (Maciço): Suporte Hemodinâmico do VD, Trombólise Sistêmica e Embolectomia',
      body_html: `
<h3>Manejo Hemodinâmico do Ventrículo Direito Agudamente Falente na UTI</h3>
<p>No paciente com TEP de Alto Risco (choque obstrutivo ou hipotensão persistente), o manejo hemodinâmico exige extrema precisão fisiológica para não acelerar a "espiral da morte" do ventrículo direito:</p>
<ul>
  <li><strong>1. Oxigenoterapia e Perigo da Ventilação Mecânica Invasiva:</strong> Administra-se suplementação de $\text{O}_2$ para manter $\text{SpO}_2 &ge; 90\%$ (corrigindo a vasoconstrição pulmonar hipóxica). Deve-se <strong>evitar ao máximo a intubação orotraqueal e a ventilação com pressão positiva</strong>: os sedativos de indução causam vasodilatação venosa e arterial, e a pressão positiva intratorácica reduz o retorno venoso e <strong>aumenta ainda mais a resistência vascular pulmonar (pós-carga do VD)</strong>, precipitando parada cardiorrespiratória imediata pós-intubação! Caso a intubação seja inevitável, utilizam-se indutores hemodinamicamente estáveis (etomiadato ou quetamina), volume corrente baixo ($6\text{ mL/kg}$ de peso predito) para manter pressão de platô $&lt; 30\text{ cmH}_2\text{O}$ e <strong>PEEP baixa/moderada</strong>.</li>
  <li><strong>2. Expansão Volêmica Extremamente Cautelosa ($\le 500\text{ mL}$):</strong> Esta é uma regra de ouro em terapia intensiva! Em um ventrículo direito já severamente dilatado e com pressão venosa central elevada, infundir 2.000 ou 3.000 mL de soro fisiológico <strong>NÃO aumenta o débito cardíaco</strong>; pelo contrário, superdistende a parede livre do VD (agravando a isquemia coronariana direita) e empurra o septo interventricular ainda mais contra o ventrículo esquerdo, <strong>piorando o choque obstrutivo</strong>! Portanto, apenas uma prova de volume modesta de <strong>no máximo 250 a 500 mL de cristaloide em 15 a 30 minutos</strong> pode ser tentada, e somente se o paciente não apresentar sinais francos de sobrecarga direita maciça (VCI muito dilatada/PVC alta).</li>
  <li><strong>3. Vasopressores e Inotrópicos de Escolha (Noradrenalina + Dobutamina):</strong> O vasopressor de <strong>primeira escolha absoluta</strong> no TEP com choque é a <strong>Noradrenalina (0,1 a 1,0 mcg/kg/min)</strong>! A noradrenalina exerce duplo benefício salvador: estimula os receptores $\beta_1$ miocárdicos (aumentando o inotropismo do VD) e estimula os receptores $\alpha_1$ arteriais periféricos, elevando a pressão arterial média (PAM) na raiz da aorta e <strong>restaurando a pressão de perfusão da artéria coronária direita ($\text{PPC}_{\text{VD}} = \text{PAM} - \text{PDFVD}$)</strong>, o que interrompe a isquemia do VD! Quando o débito cardíaco permanece baixo após otimizar a PAM com noradrenalina, associa-se o inotrópico <strong>Dobutamina (2 a 10 mcg/kg/min)</strong> (evitando doses altas de dobutamina em monoterapia sem noradrenalina, pois a vasodilatação $\beta_2$ periférica poderia agravar a hipotensão). Em choque refratário ou PCR, considera-se suporte circulatório mecânico com <strong>ECMO venoarterial (ECMO-VA)</strong> como ponte para embolectomia.</li>
</ul>

<h3>Terapia de Reperfusão Primária: Trombólise Sistêmica (Fibrinólise)</h3>
<p>Em todo paciente com <strong>TEP de Alto Risco (instabilidade hemodinâmica)</strong>, está indicada como <strong>Classe I</strong> a realização imediata de <strong>anticoagulação parenteral com Heparina Não Fracionada (HNF) IV em bolus seguida de infusão contínua</strong> E <strong>Trombólise Sistêmica (Fibrinólise intravenosa)</strong>, desde que não haja contraindicações absolutas. A trombólise dissolve rapidamente parte do trombo central, reduz em poucas horas a pressão arterial pulmonar e a dilatação do VD, e reduz significativamente a mortalidade e o colapso hemodinâmico:</p>
<ul>
  <li><strong>Regime Trombolítico de 1ª Escolha:</strong> <strong>Alteplase (rt-PA — ativador do plasminogênio tecidual recombinante)</strong> na dose de <strong>100 mg IV infundidos em 2 horas</strong> (ou regime acelerado de 0,6 mg/kg em 15 minutos — máximo de 50 mg — em situações de parada cardiorrespiratória iminente ou instalada!). Alternativas onde o rt-PA não estiver disponível: Estreptoquinase (1.500.000 UI em 2 horas) ou Tenecteplase. <em>Nota importante:</em> durante a infusão de 2 horas da alteplase, a HNF pode ser mantida ou suspensa temporariamente e retomada logo que o TTPa cair abaixo de 2 vezes o limite superior normal; em caso de PCR por TEP confirmado ou altamente suspeito, após administrar o trombolítico, <strong>as manobras de ressuscitação cardiopulmonar (RCP) devem ser mantidas por pelo menos 60 a 90 minutos</strong> antes de declarar óbito, para dar tempo ao fármaco de circular e lisar o êmbolo!</li>
  <li><strong>Janela Terapêutica da Trombólise no TEP (Difere radicalmente do IAM e do AVC!):</strong> Enquanto no AVC isquêmico a janela do rt-PA é de 4,5h e no IAMCSST é de 12h, na <strong>embolia pulmonar a trombólise sistêmica é eficaz e indicada em até 14 DIAS (2 semanas) após o início dos sintomas</strong> (com benefício máximo nas primeiras 48 horas)!</li>
  <li><strong>Por que NÃO se faz trombólise de rotina no TEP de Risco Intermediário-Alto (Estudo PEITHO)?</strong> No famoso ensaio clínico randomizado <strong>PEITHO</strong>, pacientes normotensos com TEP de Risco Intermediário-Alto (disfunção de VD + troponina positiva) foram randomizados para receber trombólise (tenecteplase) vs. placebo + heparina. Embora a trombólise tenha reduzido a descompensação hemodinâmica, ela <strong>multiplicou por 5 a 10 vezes o risco de acidente vascular cerebral hemorrágico (2,0% vs. 0,2%) e sangramento maior extracraniano (6,3% vs. 1,2%), sem reduzir a mortalidade global</strong>! Por isso, no TEP de Risco Intermediário-Alto, a conduta padrão é <strong>anticoagulação plena isolada em UTI/Unidade Semi-Intensiva</strong>, reservando-se a <strong>trombólise de resgate</strong> apenas se o paciente evoluir com deterioração hemodinâmica (queda da PA, aumento da necessidade de $\text{O}_2$, piora da taquicardia/lactato)!</li>
</ul>

<h4>Contraindicações Absolutas e Relativas à Trombólise Sistêmica</h4>
<ul>
  <li><strong>Contraindicações ABSOLUTAS à Trombólise:</strong> (1) História de <strong>AVC hemorrágico ou AVC de origem indeterminada em qualquer momento da vida</strong>; (2) <strong>AVC isquêmico nos últimos 6 meses</strong>; (3) <strong>Neoplasia ou lesão estrutural vascular do sistema nervoso central</strong> (ex.: malformação arteriovenosa, aneurisma intracraniano); (4) <strong>Trauma maior, cirurgia de grande porte ou traumatismo cranioencefálico nas últimas 3 semanas</strong>; (5) <strong>Sangramento ativo</strong> em curso (exceto menstruação) ou diátese hemorrágica conhecida; (6) Suspeita de dissecção aórtica; (7) Punção lombar ou em sítio vascular não compressível nas últimas 24 horas.</li>
  <li><strong>Contraindicações RELATIVAS à Trombólise:</strong> Ataque isquêmico transitório (AIT) nos últimos 6 meses; uso atual de anticoagulantes orais; gestação ou primeira semana pós-parto; hipertensão arterial refratária (PAS &gt; 180 mmHg ou PAD &gt; 110 mmHg); hepatopatia avançada; endocardite infecciosa; úlcera péptica ativa; ressuscitação cardiopulmonar traumática prolongada.</li>
  <li><strong>Conduta quando a Trombólise é Contraindicada ou Falha no TEP de Alto Risco:</strong> Indica-se <strong>Embolectomia Cirúrgica Pulmonar aberta com circulação extracorpórea</strong> OU <strong>Tratamento Percutâneo Dirigido por Cateter</strong> (trombectomia mecânica aspirativa/reolítica por cateter ou trombólise farmacomecânica local guiada por ultrassom com baixa dose de rt-PA).</li>
</ul>
`
    },
    {
      id: 'anticoagulacao-parenteral-oral-doacs',
      title: '9. Anticoagulação Parenteral e Oral no TEV/TEP: Heparinas, Fondaparinux, DOACs e Varfarina',
      body_html: `
<h3>O Pilar Terapêutico Universal do TEV: Anticoagulação Plena</h3>
<p>Ao contrário dos trombolíticos (que lisam ativamente o coágulo), os <strong>anticoagulantes</strong> não dissolvem diretamente o trombo já formado; sua função primordial é <strong>bloquear imediatamente a propagação da rede de fibrina e prevenir a embolização recorrente</strong>, permitindo que o próprio sistema fibrinolítico endógeno do paciente (plasmina endotelial) degrade e recanalize o vaso ao longo das semanas seguintes. Em pacientes com probabilidade clínica pré-teste alta ou intermediária para TEP ou TVP, a anticoagulação parenteral já deve ser iniciada enquanto se aguarda a realização dos exames de imagem confirmatórios.</p>

<h3>1. Anticoagulantes Parenterais para a Fase Aguda</h3>
<ul>
  <li><strong>Heparina de Baixo Peso Molecular (HBPM — Enoxaparina):</strong> Atua potencializando a antitrombina com ação predominante contra o <strong>Fator Xa</strong> (relação anti-Xa : anti-IIa de ~4:1). Possui biodisponibilidade subcutânea previsível (&gt; 90%), não exige controle laboratorial de rotina e apresenta menor risco de trombocitopenia induzida por heparina (HIT) e osteoporose que a HNF.
    <br>• <strong>Dose terapêutica plena:</strong> <strong>1 mg/kg SC a cada 12 horas</strong> (ou 1,5 mg/kg SC uma vez ao dia).
    <br>• <strong>Ajuste na Insuficiência Renal Grave (Regra obrigatória de prova!):</strong> Como a enoxaparina tem excreção predominantemente renal, quando o <strong>clearance de creatinina (ClCr) é &lt; 30 mL/min</strong>, ela é contraindicada nas diretrizes europeias ou exige <strong>redução da dose para 1 mg/kg SC UMA VEZ AO DIA (24/24h)</strong> com monitorização da atividade anti-Xa!</li>
  <li><strong>Fondaparinux:</strong> Pentassacarídeo sintético que se liga seletivamente à antitrombina para inibir <strong>exclusivamente o Fator Xa</strong>. Administrado em dose única diária subcutânea ajustada pelo peso (5 mg se &lt; 50 kg; 7,5 mg se 50–100 kg; 10 mg se &gt; 100 kg). Não induz anticorpos causadores de HIT (sendo excelente opção na suspeita ou história de HIT!), mas é <strong>absolutamente contraindicado se ClCr &lt; 30 mL/min</strong> (meia-vida longa de 17–21h e eliminação 100% renal).</li>
  <li><strong>Heparina Não Fracionada (HNF) Intravenosa:</strong> Inibe em proporção 1:1 tanto o <strong>Fator Xa quanto a Trombina (Fator IIa)</strong> via antitrombina. Dose: bolus inicial de <strong>80 UI/kg IV</strong> seguido de infusão contínua de <strong>18 UI/kg/hora</strong>, ajustada a cada 6 horas para manter o <strong>TTPa entre 1,5 e 2,5 vezes o controle normal</strong>.
    <br><em>Quais são as 4 indicações preferenciais em que a HNF supera a Enoxaparina/DOACs?</em>
    <br>1. <strong>Instabilidade hemodinâmica (TEP de Alto Risco)</strong> ou risco iminente de descompensação com indicação de trombólise/embolectomia (pela meia-vida curtíssima de 60–90 min e reversão imediata com <strong>sulfato de protamina</strong>);
    <br>2. <strong>Insuficiência renal grave (ClCr &lt; 30 mL/min) ou paciente em diálise</strong> (pois a HNF tem depuração reticuloendotelial e hepática, não acumulando na falência renal!);
    <br>3. <strong>Obesidade mórbida extrema (IMC &gt; 40–50 kg/m²) ou anasarca grave</strong> (onde a absorção subcutânea é errática);
    <br>4. <strong>Alto risco de sangramento agudo ou necessidade de procedimento cirúrgico invasivo em poucas horas.</strong></li>
</ul>

<h3>2. Anticoagulantes Orais Diretos (DOACs) — A Primeira Escolha Atual</h3>
<p>Para a grande maioria dos pacientes com TVP e/ou TEP hemodinamicamente estáveis (sem insuficiência renal grave, sem síndrome antifosfolípide e fora da gestação/lactação), as diretrizes (ESC 2019, CHEST 2021 e SBC) recomendam os <strong>Anticoagulantes Orais Diretos (DOACs) como PRIMEIRA ESCOLHA (Classe I) em relação aos antagonistas da vitamina K (varfarina)</strong>, devido à eficácia não inferior na prevenção de recorrência associada a uma <strong>redução significativa de 40% a 60% nos sangramentos maiores e intracranianos</strong>, início de ação rápido (2 a 4 horas), meia-vida previsível e dispensa de monitorização de INR.</p>
<p><strong>Diferença Farmacológica Crucial para Provas de Residência: Quais DOACs podem ser iniciados em MONOTERAPIA desde o Dia 1 vs. Quais exigem 5 dias prévios de Heparina Parenteral?</strong></p>
<ul>
  <li><strong>DOACs que permitem Terapia de Droga Única (<em>Single-Drug Approach</em> — iniciados diretamente por via oral desde o 1º dia, SEM necessidade de heparina parenteral prévia, mas com DOSE DE ATAQUE maior nas primeiras semanas):</strong>
    <br>• <strong>Rivaroxabana (Inibidor direto do Fator Xa):</strong> <strong>15 mg VO de 12/12 horas com alimentos durante os primeiros 21 dias (3 semanas)</strong>; a partir do 22º dia, passa para <strong>20 mg VO uma vez ao dia (24/24h)</strong>.
    <br>• <strong>Apixabana (Inibidor direto do Fator Xa):</strong> <strong>10 mg VO de 12/12 horas durante os primeiros 7 dias (1 semana)</strong>; a partir do 8º dia, passa para <strong>5 mg VO de 12/12 horas</strong>.</li>
  <li><strong>DOACs que EXIGEM obrigatoriamente pelo menos 5 a 10 dias de Anticoagulação Parenteral Prévia (Enoxaparina, Fondaparinux ou HNF) antes de serem iniciados:</strong>
    <br>• <strong>Dabigatrana (Inibidor direto da Trombina — Fator IIa):</strong> após &ge; 5 dias de heparina parenteral, suspende-se a heparina e inicia-se Dabigatrana <strong>150 mg VO de 12/12 horas</strong> (ou 110 mg 12/12h em idosos &ge; 80 anos ou usuários de verapamil).
    <br>• <strong>Edoxabana (Inibidor direto do Fator Xa):</strong> após &ge; 5 dias de heparina parenteral, suspende-se a heparina e inicia-se Edoxabana <strong>60 mg VO uma vez ao dia</strong> (reduzindo para 30 mg 1x/dia se o paciente tiver peso <strong>&le; 60 kg</strong>, ClCr entre <strong>15 e 50 mL/min</strong> ou uso concomitante de inibidores potentes da glicoproteína-P como ciclosporina, dronedarona, eritromicina ou cetoconazol).</li>
</ul>

<h4>Antídotos Específicos dos DOACs e Contraindicações Formais aos DOACs</h4>
<ul>
  <li><strong>Antídoto da Dabigatrana:</strong> <strong>Idarucizumabe</strong> (fragmento de anticorpo monoclonal humanizado, 5 g IV).</li>
  <li><strong>Antídoto da Rivaroxabana, Apixabana e Edoxabana (Inibidores do Xa):</strong> <strong>Andexanet alfa</strong> (proteína recombinante modificada do fator Xa que funciona como isca molecular) ou, na sua ausência, Complexo Protrombínico de 4 fatores (50 UI/kg IV).</li>
  <li><strong>Quando os DOACs são CONTRAINDICADOS (situações em que se deve usar Varfarina ou HBPM)?</strong> (1) <strong>Gestação e Aleitamento Materno</strong> (atravessam a placenta e o leite; usar HBPM); (2) <strong>Insuficiência Renal Crônica terminal / diálise</strong> (ClCr &lt; 15 mL/min para rivaroxabana, edoxabana e apixabana; e ClCr &lt; 30 mL/min para dabigatrana, que tem 80% de excreção renal!); (3) <strong>Síndrome Antifosfolípide (SAF)</strong>, especialmente triplo-positiva ou com trombose arterial (usar Varfarina); (4) <strong>Próteses valvares cardíacas mecânicas ou estenose mitral reumática moderada a grave</strong> (usar Varfarina); e (5) <strong>Hepatopatia grave com coagulopatia (Child-Pugh C)</strong>.</li>
</ul>

<h3>3. Antagonistas da Vitamina K (Varfarina) e a Obrigatoriedade da "Ponte de Heparina"</h3>
<p>Quando se opta pelo uso da <strong>Varfarina</strong> (que inibe a enzima epóxido-redutase da vitamina K — VKORC1 —, impedindo a gama-carboxilação hepática dos fatores <strong>II, VII, IX e X</strong> e das proteínas anticoagulantes <strong>C e S</strong>), a varfarina <strong>NUNCA pode ser iniciada isoladamente no TEV agudo</strong>! Como a Proteína C tem meia-vida de apenas 6–8h e a Protrombina (Fator II) tem meia-vida de 60–72h, nos primeiros dias o paciente fica hipercoagulável mesmo que o INR já comece a subir às custas da queda do Fator VII. Portanto, a varfarina deve ser iniciada no mesmo dia que a <strong>heparina parenteral (HNF, HBPM ou fondaparinux)</strong>, e a heparina deve ser mantida de forma concomitante por <strong>pelo menos 5 dias E até que o INR esteja na faixa terapêutica de 2,0 a 3,0 por 2 dias consecutivos (24 horas de intervalo)</strong>!</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Fármaco Anticoagulante</th>
      <th>Alvo Molecular</th>
      <th>Necessita Heparina Parenteral Prévia?</th>
      <th>Posologia no Tratamento do TEV Agudo</th>
      <th>Contraindicação / Ajuste Renal</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Rivaroxabana</strong></td>
      <td>Inibidor direto do Fator Xa</td>
      <td><strong>NÃO</strong> (Monoterapia desde o Dia 1)</td>
      <td><strong>15 mg VO 12/12h por 21 dias</strong> $\rightarrow$ depois <strong>20 mg VO 24/24h</strong> (após 6 meses, pode reduzir para 10 mg/dia na prevenção estendida)</td>
      <td>Evitar se ClCr &lt; 15 mL/min (cautela entre 15–29 mL/min); tomar com refeição</td>
    </tr>
    <tr>
      <td><strong>Apixabana</strong></td>
      <td>Inibidor direto do Fator Xa</td>
      <td><strong>NÃO</strong> (Monoterapia desde o Dia 1)</td>
      <td><strong>10 mg VO 12/12h por 7 dias</strong> $\rightarrow$ depois <strong>5 mg VO 12/12h</strong> (após 6 meses, pode reduzir para 2,5 mg 12/12h na prevenção estendida)</td>
      <td>Menor excreção renal entre os DOACs (~27%); evitar se ClCr &lt; 15 mL/min</td>
    </tr>
    <tr>
      <td><strong>Edoxabana</strong></td>
      <td>Inibidor direto do Fator Xa</td>
      <td><strong>SIM</strong> (Exige 5–10 dias prévios de HBPM/HNF)</td>
      <td>Após 5 dias de heparina: <strong>60 mg VO 24/24h</strong> (ou 30 mg 24/24h se peso &le; 60 kg, ClCr 15–50 mL/min ou inibidor de P-gp)</td>
      <td>Evitar se ClCr &lt; 15 mL/min (e menor eficácia em hiperfiltradores com ClCr &gt; 95 mL/min)</td>
    </tr>
    <tr>
      <td><strong>Dabigatrana</strong></td>
      <td>Inibidor direto da Trombina (IIa)</td>
      <td><strong>SIM</strong> (Exige 5–10 dias prévios de HBPM/HNF)</td>
      <td>Após 5 dias de heparina: <strong>150 mg VO 12/12h</strong> (110 mg 12/12h se &ge; 80 anos ou uso de verapamil)</td>
      <td><strong>80% de excreção renal</strong>; <strong>contraindicada se ClCr &lt; 30 mL/min</strong>! Antídoto: Idarucizumabe</td>
    </tr>
    <tr>
      <td><strong>Varfarina</strong></td>
      <td>Inibe VKORC1 (Fatores II, VII, IX, X; Proteínas C e S)</td>
      <td><strong>SIM</strong> (Sobreposição / Ponte obrigatória por &ge; 5 dias)</td>
      <td>Dose ajustada para manter <strong>INR entre 2,0 e 3,0</strong> (suspender heparina apenas após &ge; 5 dias E INR &ge; 2,0 por 24h)</td>
      <td>Permitida na DRC dialítica, na SAF triplo-positiva e em próteses mecânicas; teratogênica na gestação</td>
    </tr>
  </tbody>
</table>
`
    },
    {
      id: 'duracao-anticoagulacao-filtro-veia-cava',
      title: '10. Duração da Anticoagulação e Indicações Restritas do Filtro de Veia Cava Inferior',
      body_html: `
<h3>Por Quanto Tempo Anticoagular o Paciente com TVP ou TEP?</h3>
<p>Todo paciente com diagnóstico confirmado de TVP proximal ou embolia pulmonar deve receber um <strong>período mínimo obrigatório de 3 meses de anticoagulação terapêutica</strong> (fase de tratamento ativo, que previne a extensão aguda e a embolização precoce). Ao completar 3 meses, o médico deve decidir entre <strong>suspender definitivamente o anticoagulante</strong> ou <strong>manter anticoagulação estendida (por tempo indeterminado, com reavaliação anual do risco de sangramento)</strong>.<em>(Nota de prova: não existe benefício em anticoagular por "6 meses ou 12 meses fixos e depois parar" nos casos idiopáticos — porque assim que o anticoagulante é suspenso aos 6 ou 12 meses, o risco de recorrência volta exatamente ao mesmo patamar de quem parou aos 3 meses — fenômemo "catch-up"! Portanto, a decisão moderna é binária: ou se trata por <strong>3 meses</strong>, ou se mantém por <strong>tempo indeterminado/enquanto durar o fator de risco</strong>!).</em></p>
<ul>
  <li><strong>1. Primeiro Episódio de TEV Provocado por Fator de Risco Transitório/Reversível Maior (ex.: cirurgia com anestesia &gt; 30 min, fratura de membro inferior, trauma maior, internação aguda por doença clínica com imobilização &ge; 3 dias) ou Menor Reversível (ex.: viagem longa, terapia estrogênica suspensa, gestação/puerpério):</strong>
    <br>• <strong>Duração recomendada:</strong> <strong>EXATAMENTE 3 MESES</strong> e suspender! (Taxa de recorrência anual após suspensão &lt; 1% a 3%).</li>
  <li><strong>2. Primeiro Episódio de TEV NÃO PROVOCADO (Idiopático — sem fator desencadeante identificável) e Baixo/Moderado Risco de Sangramento:</strong>
    <br>• Como o risco acumulado de recorrência após suspender o anticoagulante no TEV não provocado chega a 10% no primeiro ano e &gt; 30% em 5 a 10 anos (especialmente em homens), as diretrizes (ESC 2019 e CHEST 2021) recomendam <strong>Anticoagulação Estendida por Tempo Indeterminado</strong>! Após completar os primeiros 6 meses em dose plena, pode-se utilizar <strong>dose reduzida profilática estendida de Apixabana (2,5 mg VO 12/12h — estudo AMPLIFY-EXT) ou Rivaroxabana (10 mg VO 24/24h — estudo EINSTEIN CHOICE)</strong>, que mantém proteção antitrombótica com risco hemorrágico mínimo similar ao da aspirina/placebo!</li>
  <li><strong>3. TEV Recorrente (&ge; 2 episódios de TVP ou TEP não provocados) ou Trombofilia de Alto Risco (Síndrome Antifosfolípide, Deficiência de Antitrombina, Proteína C ou S, Homozigose do Fator V de Leiden ou Dupla Heterozigose):</strong>
    <br>• <strong>Duração recomendada:</strong> <strong>Anticoagulação por Tempo Indeterminado (Perpétua)</strong> em dose plena.</li>
  <li><strong>4. TEV Associado a Câncer em Atividade:</strong>
    <br>• <strong>Duração recomendada:</strong> <strong>Anticoagulação Estendida (no mínimo 6 meses e mantida por tempo indeterminado enquanto o câncer estiver ativo</strong>, metastático ou em tratamento quimioterápico/radioterápico).</li>
</ul>

<h3>Indicações Reais e Restritas do Filtro de Veia Cava Inferior (Pegadinha Clássica de Prova!)</h3>
<p>Os filtros de veia cava inferior (preferencialmente modelos temporários/recuperáveis implantados por via percutânea abaixo da desembocadura das veias renais — posição infrarrenal) impedem mecanicamente que grandes trombos oriundos das veias profundas dos membros inferiores e da pelve alcancem a circulação pulmonar. Contudo, os filtros <strong>NÃO tratam a hipercoagulabilidade, aumentam a taxa de trombose venosa profunda recorrente nos membros inferiores e de trombose da própria veia cava, e NÃO reduzem a mortalidade quando adicionados à anticoagulação</strong> (estudo PREPIC-2)!</p>
<p>Portanto, segundo a Diretriz ESC 2019, ACCP/CHEST e SBC, existem apenas <strong>DUAS INDICAÇÕES FORMAIS (Classe I)</strong> para o implante de filtro de veia cava inferior:</p>
<ol>
  <li><strong>Pacientes com TVP proximal aguda e/ou TEP agudo que possuam CONTRAINDICAÇÃO ABSOLUTA À ANTICOAGULAÇÃO PLENA</strong> (ex.: sangramento gastrointestinal maciço ativo, hemorragia intracraniana recente, neurocirurgia ou cirurgia de grande porte imediata inadiável, plaquetopenia grave &lt; 20.000–30.000/mm³). <em>Regra obrigatória: assim que a contraindicação ao sangramento for resolvida, deve-se iniciar imediatamente a anticoagulação plena e programar a retirada do filtro recuperável!</em></li>
  <li><strong>Recorrência documentada de embolia pulmonar apesar de anticoagulação comprovadamente em faixa terapêutica plena</strong> (e após descartar causas de falha terapêutica como falta de adesão, dose subótima, trombocitopenia induzida por heparina, síndrome antifosfolípide em uso de DOAC ou neoplasia oculta).</li>
</ol>
<p><strong>Quando o Filtro de Veia Cava NÃO é indicado (Classe III):</strong> Uso rotineiro em adição à anticoagulação plena; presença de trombo flutuante livre iliofemoral em paciente que pode ser anticoagulado normalmente; ou pacientes submetidos a trombólise sistêmica sem contraindicação à anticoagulação.</p>
`
    },
    {
      id: 'cenarios-especiais-gestacao-cancer-hit-hptec',
      title: '11. Cenários Especiais de Alta Cobrança: Gestação, Paciente Oncológico, HIT e HPTEC',
      body_html: `
<h3>1. TEV e Embolia Pulmonar na Gestação e no Puerpério</h3>
<p>O tromboembolismo venoso é uma das principais causas diretas de mortalidade materna em países desenvolvidos e no Brasil. A gestação induz os três componentes da Tríade de Virchow: hipercoagulabilidade fisiológica preparatória para o parto (aumento dos fatores I, VII, VIII, IX, X e fator de von Willebrand, queda da proteína S livre e aumento do inibidor do ativador do plasminogênio — PAI-1 e PAI-2 placentário), estase venosa (progesterona venodilatadora + compressão mecânica da veia cava inferior e da <strong>veia ilíaca comum esquerda pelo útero gravídico e pela artéria ilíaca direita</strong> — razão pela qual <strong>mais de 80% a 85% das TVPs na gestação ocorrem no membro inferior ESQUERDO!</strong>) e lesão endotelial no parto/cesariana.</p>
<ul>
  <li><strong>Diagnóstico de TEP na Gestante:</strong> O D-dímero sobe fisiologicamente ao longo dos três trimestres, mas o <strong>Algoritmo YEARS adaptado para a gestação (estudo ARTEMIS)</strong> permite excluir TEP com segurança em uma parcela expressiva de gestantes. Caso haja sinais de TVP, realiza-se primeiro <strong>USG Doppler compressivo dos membros inferiores</strong> (se positivo para TVP proximal, já confirma o diagnóstico e inicia o tratamento sem irradiar o tórax!). Se o Doppler for negativo e a investigação de imagem torácica for necessária, solicita-se <strong>Radiografia de Tórax</strong>: se a radiografia for <strong>normal</strong>, prefere-se a <strong>Cintilografia Pulmonar de Perfusão/Ventilação (menor radiação para o tecido mamário materno proliferativo)</strong>; se a radiografia for <strong>anormal</strong> (ou a cintilografia não estiver disponível), realiza-se a <strong>Angio-TC de artérias pulmonares com protocolo de baixa dose</strong> (ambos os métodos expõem o feto a doses de radiação ionizante muito inferiores ao limiar teratogênico de 50–100 mGy, jamais devendo ser omitidos quando há suspeita real de TEP!).</li>
  <li><strong>Tratamento Anticoagulante de Escolha na Gestação (Regra Absoluta de Prova!):</strong> O anticoagulante de <strong>primeira escolha absoluta durante toda a gestação é a Heparina de Baixo Peso Molecular (Enoxaparina 1 mg/kg SC de 12/12h)</strong> (ou Heparina Não Fracionada no periparto imediato / insuficiência renal grave), pois as heparinas são macromoléculas polares que <strong>NÃO atravessam a barreira placentária</strong> e não causam teratogenicidade nem hemorragia fetal!
    <br>• <strong>Fármacos PROIBIDOS na Gestação:</strong> A <strong>Varfarina atravessa a placenta e é teratogênica</strong> no 1º trimestre (entre a 6ª e a 12ª semanas, causando a <strong>Embriopatia Varfarínica / Síndrome de Conradi-Hünermann</strong>: hipoplasia nasal, calcificações epifisárias pontilhadas — condrodisplasia punctata — e anomalias ópticas/SNC) e causa hemorragia fetal/intracraniana no 3º trimestre e parto! Os <strong>DOACs (rivaroxabana, apixabana, edoxabana, dabigatrana) também atravessam a placenta e o leite materno, sendo formalmente CONTRAINDICADOS tanto na gestação quanto na amamentação!</strong>
    <br>• <strong>E no Puerpério (Amamentação)?</strong> No pós-parto, a paciente que está amamentando pode manter a <strong>Enoxaparina</strong> OU ser transicionada com total segurança para a <strong>Varfarina</strong> (pois a varfarina é altamente ligada à albumina plasmática e não é excretada em forma ativa no leite materno!). A anticoagulação deve ser mantida por pelo menos 3 meses no total e obrigatoriamente até completar pelo menos <strong>6 semanas pós-parto (puerpério)</strong>. Para analgesia neuroaxial (raquianestesia ou peridural no parto), deve-se aguardar um intervalo mínimo de <strong>24 horas após a última dose terapêutica plena de enoxaparina</strong> (ou 12 horas após dose profilática) pelo risco de hematoma espinhal!</li>
</ul>

<h3>2. Tratamento do TEV Associado ao Câncer (Evolução dos Estudos CLOT para Hokusai, SELECT-D e CARAVAGGIO)</h3>
<p>Pacientes oncológicos apresentam risco 4 a 7 vezes maior de TEV (Síndrome de Trousseau) e maior risco tanto de recorrência trombótica quanto de sangramento sob anticoagulação. Historicamente, com base no estudo <em>CLOT</em>, a <strong>Heparina de Baixo Peso Molecular (Enoxaparina ou Dalteparina SC)</strong> era o padrão-ouro isolado superior à varfarina.</p>
<p>Nos últimos anos, três grandes ensaios clínicos randomizados — <strong>Hokusai VTE Cancer (Edoxabana)</strong>, <strong>SELECT-D (Rivaroxabana)</strong> e <strong>CARAVAGGIO (Apixabana)</strong> — revolucionaram as diretrizes (ESC, ASCO, NCCN e CHEST): ficou demonstrado que os <strong>DOACs inibidores do Fator Xa (Apixabana, Edoxabana e Rivaroxabana) têm eficácia igual ou superior à HBPM na prevenção de TEV recorrente, com a comodidade da via oral</strong>! Contudo, observou-se um detalhe crítico cobrado em provas:</p>
<ul>
  <li>Em pacientes com <strong>câncer não luminal (ex.: mama, pulmão, próstata, cólon ressecado, linfoma, cérebro)</strong>, os DOACs (<strong>Apixabana, Edoxabana ou Rivaroxabana</strong>) ou a HBPM são recomendados como primeira linha;</li>
  <li>Em pacientes com <strong>neoplasia maligna luminal não ressecada do trato gastrointestinal superior (câncer de esôfago ou estômago/gástrico) ou do trato urotelial/geniturinário com lesão mucosa</strong>, a rivaroxabana e a edoxabana aumentaram o risco de sangramento digestivo/mucoso, razão pela qual nesses tumores luminais prefere-se a <strong>Heparina de Baixo Peso Molecular (Enoxaparina)</strong> (ou Apixabana com cautela, que no estudo CARAVAGGIO não aumentou sangramento maior gastrointestinal em comparação à dalteparina).</li>
</ul>

<h3>3. Trombocitopenia Induzida por Heparina (HIT Tipo II) e o Escore dos 4 Ts</h3>
<p>A <strong>Trombocitopenia Induzida por Heparina (HIT tipo II)</strong> é uma reação adversa imunomediada protrombótica grave (5 a 10 vezes mais frequente com HNF do que com HBPM) causada pela formação de autoanticorpos <strong>IgG dirigidos contra o complexo Fator Plaquetário 4 (PF4) + Heparina</strong>. O complexo imune IgG-PF4-heparina liga-se aos receptores Fc$\gamma$IIa na superfície das plaquetas e dos monócitos, provocando ativação plaquetária maciça, liberação de micropartículas pró-coagulantes, consumo plaquetário e <strong>tromboses venosas e arteriais devastadoras (HITT)</strong>!</p>
<ul>
  <li><strong>Os 4 Ts do Diagnóstico Clínico da HIT:</strong>
    <br>1. <strong>Trombocitopenia:</strong> queda da contagem plaquetária <strong>&gt; 50% em relação ao valor basal</strong>, atingindo um nadir moderado tipicamente entre <strong>20.000 e 100.000/mm³</strong> (raramente cai abaixo de 20.000/mm³ e raramente causa sangramento espontâneo!);
    <br>2. <strong>Tempo (<em>Timing</em>):</strong> surge tipicamente entre o <strong>5º e o 10º dia</strong> após o início da heparina (ou em &lt; 24 horas se o paciente já recebeu heparina nos últimos 30 a 100 dias e possui anticorpos circulantes preformados);
    <br>3. <strong>Trombose:</strong> surgimento de nova trombose venosa ou arterial, necrose cutânea nos sítios de injeção subcutânea de heparina ou reação anafilactoide após bolus de HNF;
    <br>4. <strong>Outras causas (<em>oTher causes</em>):</strong> ausência de outras causas evidentes de plaquetopenia (sepse grave, CIVD, quimioterapia).</li>
  <li><strong>Conduta Imediata na Suspeita de HIT (Probabilidade Intermediária ou Alta pelos 4 Ts):</strong>
    <br>1. <strong>Suspender IMEDIATAMENTE toda e qualquer exposição à heparina</strong> (HNF, enoxaparina, lavagem heparinizada de cateteres);
    <br>2. <strong>Iniciar IMEDIATAMENTE um anticoagulante não heparínico em dose terapêutica plena</strong> (mesmo que o paciente ainda não tenha trombose clinicamente visível, pois até 50% desenvolvem trombose nos dias seguintes se apenas suspender a heparina!): <strong>Fondaparinux, Argatroban (preferido na insuficiência renal), Bivalirudina ou um DOAC (Rivaroxabana / Apixabana)</strong>!
    <br>3. <strong>O que é PROIBIDO na fase aguda da HIT?</strong> É proibido trocar HNF por HBPM (há reação cruzada!), é proibido transfundir concentrado de plaquetas (alimenta a trombose arterial!) e é <strong>proibido iniciar Varfarina enquanto as plaquetas estiverem baixas (&lt; 150.000/mm³)</strong> (pois a queda da proteína C induzida pela varfarina na vigência de HIT precipita <strong>gangrena venosa de extremidades</strong>!).</li>
</ul>

<h3>4. Hipertensão Pulmonar Tromboembólica Crônica (HPTEC — Grupo 4 da Classificação de HP)</h3>
<p>Em cerca de <strong>2% a 4% dos sobreviventes de um episódio de embolia pulmonar aguda</strong>, os trombos não sofrem lise completa e passam por um remodelamento fibrótico endotelizado organizado que obstrui cronicamente as artérias pulmonares elásticas, acompanhado de arteriopatia microvascular secundária nos vasos não ocluídos, resultando na <strong>Hipertensão Pulmonar Tromboembólica Crônica (HPTEC — Grupo 4 da OMS)</strong>.</p>
<ul>
  <li><strong>Quando suspeitar:</strong> todo paciente que permaneça com dispneia aos esforços, limitação funcional ou sinais de sobrecarga de VD após completar pelo menos <strong>3 meses de anticoagulação efetiva</strong> para um TEP agudo.</li>
  <li><strong>Exame de Rastreamento (Triagem) de Escolha:</strong> A <strong>Cintilografia Pulmonar de Ventilação/Perfusão (V/Q)</strong> é o exame de triagem de primeira escolha para HPTEC (sensibilidade de 96% a 97%, muito superior à Angio-TC convencional de rotina na detecção de membranas e estenoses trombóticas crônicas distais): uma cintilografia V/Q normal <strong>exclui HPTEC</strong>! A confirmação definitiva exige <strong>Cateterismo Cardíaco Direito</strong> (demonstrando pressão arterial pulmonar média $\text{PAPm} &gt; 20\text{ mmHg}$, pressão de oclusão capilar pulmonar $\text{POAP} \le 15\text{ mmHg}$ e resistência vascular pulmonar $\text{RVP} &gt; 2\text{ unidades Wood}$) associado à <strong>Angiografia Pulmonar por Subtração Digital</strong>.</li>
  <li><strong>Tratamento Definitivo e Curativo:</strong> A HPTEC é a única forma de hipertensão pulmonar potencialmente curável por cirurgia: o tratamento de primeira escolha para lesões proximais/acessíveis é a <strong>Tromboendarterectomia Pulmonar Cirúrgica (TEA)</strong> sob circulação extracorpórea e parada circulatória hipotérmica profunda, aliada à <strong>anticoagulação oral vitalícia (preferencialmente com Varfarina)</strong>. Para pacientes inoperáveis ou com hipertensão pulmonar residual pós-endarterectomia, indicam-se a <strong>Angioplastia Pulmonar por Balão (BPA)</strong> e o vasodilatador estimulador da guanilato ciclase solúvel <strong>Riociguate</strong>!</li>
</ul>
`
    },
    {
      id: 'casos-clinicos-comentados',
      title: '12. Casos Clínicos Aplicados à Prática e às Provas de Residência',
      body_html: `
<h3>Caso Clínico 1 — Exclusão Segura de TEP pelo D-Dímero Ajustado para a Idade</h3>
<p><strong>Vinheta Clínica:</strong> Mulher de 76 anos, hipertensa controlada com losartana, sem história de tabagismo, câncer ou trombose prévia, comparece ao pronto-socorro referindo desconforto torácico atípico e leve cansaço há 24 horas após esforço doméstico. Ao exame físico: lúcida, corada, eupneica (FR 18 irpm), PA 134 × 82 mmHg, FC 84 bpm, SpO2 96% em ar ambiente. Ausculta cardiopulmonar normal; membros inferiores simétricos, indolores e sem edema. Radiografia de tórax e eletrocardiograma normais, troponina negativa. Diante da possibilidade clínica remota de embolia pulmonar (embora dor osteomuscular pareça mais provável), o plantonista calcula o Escore de Wells para TEP e solicita D-dímero quantitativo (ELISA), cujo resultado é de <strong>690 ng/mL</strong> (valor de referência padrão do laboratório: &lt; 500 ng/mL).</p>
<p><strong>Discussão e Conduta Racional:</strong> No cálculo do Escore de Wells para TEP, a paciente pontua <strong>0 pontos</strong> (ausência de sinais de TVP, diagnóstico alternativo mais provável que TEP, FC &le; 100 bpm, sem cirurgia/imobilização, sem TEV prévio, sem hemoptise e sem câncer), configurando <strong>baixa probabilidade clínica pré-teste ("TEP improvável", Wells &le; 4,0)</strong>. Como a paciente tem <strong>76 anos (&gt; 50 anos)</strong>, não se deve utilizar o ponto de corte fixo de 500 ng/mL, mas sim o <strong>ponto de corte de D-dímero ajustado para a idade ($\text{Idade} \times 10\text{ ng/mL}$)</strong>: $76 \times 10 = \mathbf{760\text{ ng/mL}}$. Como o valor encontrado ($690\text{ ng/mL}$) é inferior ao limiar ajustado de $760\text{ ng/mL}$, o teste é considerado <strong>NEGATIVO</strong> e o diagnóstico de embolia pulmonar está <strong>excluído com segurança superior a 99%</strong>, poupando a paciente idosa da exposição à radiação e à nefrotoxicidade do contraste iodado da Angio-TC! (Observe também que, pelo algoritmo YEARS, com 0 critérios YEARS presentes e D-dímero &lt; 1.000 ng/mL, o TEP também estaria imediatamente descartado!).</p>

<h3>Caso Clínico 2 — TEP de Risco Intermediário-Alto (Submaciço) e a Decisão sobre Trombólise</h3>
<p><strong>Vinheta Clínica:</strong> Homem de 62 anos, submetido a artroplastia total de joelho direito há 18 dias (tendo interrompido a profilaxia anticoagulante por conta própria no 10º dia), dá entrada no pronto-socorro com dispneia súbita intensa e episódio de pré-síncope ao levantar-se do sofá. Ao exame físico: ansioso, taquipneico (FR 28 irpm), PA <strong>114 × 72 mmHg</strong>, FC <strong>118 bpm</strong>, SpO2 <strong>88%</strong> em ar ambiente (subindo para 95% com cateter nasal de $\text{O}_2$ a 3 L/min), extremidades quentes e tempo de enchimento capilar de 2 segundos. Panturrilha direita edemaciada (+3,5 cm em relação à esquerda) e dolorosa. O ECG mostra taquicardia sinusal de 118 bpm, padrão $S_1Q_3T_3$ e inversão de ondas T de V1 a V4. A Angio-TC de artérias pulmonares confirma volumoso trombo "em sela" estendendo-se para as artérias pulmonares principais direita e esquerda, com razão diastólica $\text{VD/VE} = 1,3$. O ecocardiograma transtorácico mostra hipocinesia da parede livre do VD com contratilidade apical preservada (sinal de McConnell) e TAPSE de 13 mm. Exames laboratoriais: troponina I de alta sensibilidade = 420 ng/L (VR &lt; 34 ng/L), NT-proBNP = 3.800 pg/mL e lactato arterial = 1,4 mmol/L.</p>
<p><strong>Discussão e Conduta Racional:</strong> Este é o caso clássico que separa o candidato preparado nas provas de residência: apesar de o trombo ser anatomicamente volumoso ("em sela"), de o paciente apresentar taquicardia (FC 118 bpm), hipoxemia corrigida com $\text{O}_2$ (sPESI = 2 pontos), franca disfunção do ventrículo direito na Angio-TC/Eco ($\text{VD/VE} = 1,3$, sinal de McConnell) e injúria miocárdica positiva (troponina e NT-proBNP elevados), sua pressão arterial é de <strong>114 × 72 mmHg com perfusão periférica e lactato normais</strong>! Portanto, ele <strong>NÃO tem TEP de Alto Risco (Maciço)</strong>, mas sim <strong>TEP de RISCO INTERMEDIÁRIO-ALTO (Submaciço Grave: sPESI &ge; 1 + Disfunção de VD na imagem + Troponina positiva)</strong>! Com base no estudo <em>PEITHO</em> e na Diretriz ESC 2019 / SBC, a <strong>trombólise sistêmica de rotina NÃO está indicada</strong> neste momento devido ao risco elevado de hemorragia intracraniana sem benefício em mortalidade. A conduta correta é <strong>internar em UTI / Unidade Semi-Intensiva sob monitorização rigorosa e iniciar anticoagulação plena imediata com Heparina de Baixo Peso Molecular (Enoxaparina 1 mg/kg SC 12/12h) ou HNF</strong>, mantendo vigilância armada para realizar <strong>trombólise de resgate</strong> caso o paciente evolua com instabilidade hemodinâmica (PAS &lt; 90 mmHg ou sinais de choque).</p>

<h3>Caso Clínico 3 — TEP de Alto Risco (Maciço) com Choque Obstrutivo</h3>
<p><strong>Vinheta Clínica:</strong> Mulher de 51 anos, sem antecedentes hemorrágicos ou neurológicos, internada na enfermaria de ginecologia no 4º dia pós-histerectomia abdominal total por miomatose uterina volumosa, apresenta quadro dramático de dispneia aguda, dor retroesternal e síncope no banheiro. Levada à sala de emergência, encontra-se torporosa, pálida, cianótica, com pele fria e sudoreica, PA <strong>68 × 42 mmHg</strong>, FC 136 bpm, FR 34 irpm, SpO2 82% com máscara não reinalante, turgência jugular patológica e oligúria. Gasometria arterial mostra pH 7,26, $\text{PaO}_2\ 54\text{ mmHg}$, $\text{PaCO}_2\ 28\text{ mmHg}$, $\text{HCO}_3^-\ 14\text{ mEq/L}$ e lactato de 5,8 mmol/L. Como a paciente está instável demais para transporte até a tomografia, realiza-se ecocardiograma transtorácico à beira do leito (POCUS), que demonstra ventrículo direito severamente dilatado ($\text{VD/VE} = 1,5$), septo interventricular retificado comprimindo o VE, sinal de McConnell positivo, veia cava inferior de 25 mm sem colabamento e trombo móvel visível no tronco da artéria pulmonar.</p>
<p><strong>Discussão e Conduta Racional:</strong> Diante de suspeita de TEP com <strong>choque obstrutivo franco (PAS &lt; 90 mmHg + hipoperfusão tecidual e hiperlactatemia)</strong>, a Diretriz ESC 2019 estabelece que a demonstração ecocardiográfica à beira do leito de sobrecarga/disfunção aguda do ventrículo direito (especialmente com trombo em trânsito nas câmaras direitas ou tronco pulmonar) <strong>já confirma o TEP de ALTO RISCO (Maciço) e autoriza a reperfusão imediata sem necessidade de aguardar Angio-TC</strong>! No suporte hemodinâmico, deve-se <strong>evitar expansão volêmica agressiva</strong> (no máximo 250–500 mL, pois o VD já está hiperdistendido) e iniciar imediatamente <strong>Noradrenalina IV</strong> (para elevar a PAM e restaurar a perfusão coronariana direita) associada a <strong>Heparina Não Fracionada (HNF) IV em bolus</strong>. Como a paciente está no 4º dia pós-operatório de histerectomia abdominal (cirurgia de grande porte há &lt; 3 semanas constitui contraindicação relativa/absoluta à trombólise sistêmica pelo risco de hemopericárdio/hemoperitônio maciço na pelve operada!), a equipe multidisciplinar (<em>PERT — Pulmonary Embolism Response Team</em>) deve priorizar <strong>trombectomia mecânica percutânea por cateter ou embolectomia cirúrgica pulmonar</strong> (ou, se indisponíveis e em risco de PCR iminente, trombólise sistêmica/dirigida assumindo o risco hemorrágico e preparando suporte transfusional).</p>

<h3>Caso Clínico 4 — Embolia Pulmonar na Gestação</h3>
<p><strong>Vinheta Clínica:</strong> Primigesta de 28 anos, na 26ª semana de gestação, comparece à maternidade com dor e edema assimétrico em todo o membro inferior esquerdo há 3 dias, associados a dispneia súbita e dor pleurítica no hemitórax direito iniciadas há 4 horas. Ao exame físico: PA 115 × 70 mmHg, FC 104 bpm, FR 24 irpm, SpO2 94% em ar ambiente, altura uterina compatível com a idade gestacional, batimentos cardiofetais normais (144 bpm) e edema depressível na coxa e panturrilha esquerdas (+4 cm). O ultrassom Doppler venoso compressivo do membro inferior esquerdo revela incompressibilidade e trombo oclusivo na veia femoral comum e na veia ilíaca externa esquerdas.</p>
<p><strong>Discussão e Conduta Racional:</strong> A gestante apresenta clínica clássica de TVP proximal iliofemoral esquerda (lado predominante na gestação devido à compressão da veia ilíaca comum esquerda pela artéria ilíaca comum direita e pelo útero gravídico) complicada com embolia pulmonar hemodinamicamente estável. Como o <strong>USG Doppler compressivo já confirmou TVP proximal</strong>, o diagnóstico de doença tromboembólica venosa está fechado e <strong>não é necessário expor a gestante e o feto à radiação da Angio-TC nem da Cintilografia V/Q</strong>, pois a conduta terapêutica já está integralmente definida! O tratamento de escolha absoluta durante toda a gestação é a <strong>Heparina de Baixo Peso Molecular em dose terapêutica plena: Enoxaparina 1 mg/kg SC de 12/12 horas</strong> (já que a varfarina e os DOACs atravessam a placenta e são formalmente contraindicados na gestação). A enoxaparina deverá ser suspensa 24 horas antes do parto programado/raquianestesia e retomada no pós-parto, mantendo-se a anticoagulação (com enoxaparina ou varfarina durante a amamentação) até completar pelo menos 3 meses de tratamento total e pelo menos 6 semanas de puerpério.</p>

<h3>Caso Clínico 5 — Trombocitopenia Induzida por Heparina (HIT Tipo II)</h3>
<p><strong>Vinheta Clínica:</strong> Homem de 69 anos está no 7º dia de internação hospitalar recebendo Heparina Não Fracionada (HNF) intravenosa em bomba de infusão contínua para tratamento de embolia pulmonar e insuficiência renal moderada. Na admissão, suas plaquetas eram de $260.000/\text{mm}^3$; hoje (no 7º dia de HNF), o hemograma de rotina revela queda abrupta das plaquetas para <strong>$48.000/\text{mm}^3$</strong> (queda de 81%), sem qualquer sinal de sangramento mucocutâneo. Pelo contrário, no mesmo dia o paciente passa a queixar-se de dor e aumento do edema no membro inferior direito (progressão da trombose venosa) e isquemia digital no hálux esquerdo. Não há sinais de sepse e o fibrinogênio sérico é normal.</p>
<p><strong>Discussão e Conduta Racional:</strong> O paciente preenche pontuação máxima no <strong>Escore dos 4 Ts para Trombocitopenia Induzida por Heparina (HIT tipo II)</strong>: queda plaquetária &gt; 50% com nadir entre 20.000 e 100.000/mm³ (+2 pontos), início típico entre o 5º e o 10º dia de uso de heparina (+2 pontos), surgimento paradoxal de nova trombose venosa e arterial na vigência de heparina (+2 pontos) e ausência de outras causas de plaquetopenia (+2 pontos = 8 pontos, alta probabilidade). A fisiopatologia decorre de anticorpos IgG contra o complexo PF4-heparina que ativam intensamente as plaquetas. A conduta imediata obrigatória é: (1) <strong>Suspender imediatamente toda heparina (HNF e HBPM)</strong>; (2) Solicitar pesquisa de anticorpos anti-PF4/heparina (ELISA e ensaio funcional de liberação de serotonina); e (3) <strong>Iniciar IMEDIATAMENTE anticoagulação plena com um agente não heparínico</strong> (como <strong>Fondaparinux, Argatroban, Bivalirudina ou Rivaroxabana/Apixabana</strong>). Jamais se deve transfundir plaquetas e jamais se deve iniciar varfarina antes que a contagem plaquetária se recupere acima de $150.000/\text{mm}^3$ (pelo risco de gangrena venosa de membro).</p>

<h3>Caso Clínico 6 — Hipertensão Pulmonar Tromboembólica Crônica (HPTEC)</h3>
<p><strong>Vinheta Clínica:</strong> Homem de 53 anos sofreu episódio de embolia pulmonar bilateral de risco intermediário há 8 meses, tendo recebido tratamento regular e supervisionado com Rivaroxabana durante todo esse período. Apesar da adesão rigorosa ao anticoagulante, procura o ambulatório de pneumologia por persistência e piora progressiva de dispneia aos médios esforços (NYHA III), fadiga e edema maleolar vespertino. Ao exame físico: hiperfonese acentuada do componente pulmonar da segunda bulha ($P_2$), sopro holossistólico de regurgitação tricúspide na borda esternal esquerda baixa e turgência jugular. O ecocardiograma transtorácico estima pressão sistólica da artéria pulmonar (PSAP) em 78 mmHg, com hipertrofia e dilatação do ventrículo direito.</p>
<p><strong>Discussão e Conduta Racional:</strong> A persistência de dispneia e sinais ecocardiográficos de hipertensão pulmonar após mais de <strong>3 meses de anticoagulação efetiva</strong> para um episódio de TEP agudo impõe a investigação de <strong>Hipertensão Pulmonar Tromboembólica Crônica (HPTEC — Grupo 4 da classificação de hipertensão pulmonar)</strong>. O exame de <strong>triagem (rastreamento) de primeira escolha</strong> é a <strong>Cintilografia Pulmonar de Ventilação/Perfusão (V/Q)</strong>, que possui sensibilidade superior (96%–97%) à Angio-TC para detectar defeitos perfusionais crônicos em cunha. Confirmados os defeitos perfusionais na cintilografia V/Q, o paciente deve ser encaminhado a um centro de referência para realização de <strong>cateterismo cardíaco direito</strong> ($\text{PAPm} &gt; 20\text{ mmHg}$, $\text{POAP} \le 15\text{ mmHg}$ e $\text{RVP} &gt; 2\text{ Wood}$) e <strong>arteriografia pulmonar</strong> visando ao tratamento definitivo e potencialmente curativo de primeira linha: a <strong>Tromboendarterectomia Pulmonar Cirúrgica (TEA)</strong> (ou angioplastia pulmonar por balão + Riociguate nos casos inoperáveis), além de anticoagulação vitalícia.
`
    },
    {
      id: 'questoes-comentadas-residencia',
      title: '13. Questões Comentadas de Residência Médica e ENAMED',
      body_html: `
<h3>Questão Comentada 1 — Probabilidade Pré-Teste e D-Dímero Ajustado para a Idade</h3>
<p><strong>Enunciado:</strong> Homem de 68 anos procura a unidade de pronto-atendimento queixando-se de dor ventilatório-dependente discreta na base do hemitórax direito iniciada há 12 horas, sem dispneia, sem tosse e sem hemoptise. Não possui antecedentes de câncer, cirurgia, imobilização ou tromboembolismo prévio. Ao exame físico: PA 126 × 78 mmHg, FC 82 bpm, FR 16 irpm, SpO2 97% em ar ambiente, ausculta pulmonar limpa e membros inferiores sem edema ou dor à palpação. A equipe considera dor osteomuscular costal como principal hipótese, mas aplica o Escore de Wells para TEP (pontuação = 0) e solicita dosagem de D-dímero pelo método ELISA quantitativo, cujo resultado é de <strong>640 ng/mL</strong> (valor de referência padrão: &lt; 500 ng/mL). De acordo com a Diretriz da Sociedade Europeia de Cardiologia (ESC) e da SBC, qual é a conduta correta?</p>
<ul>
  <li>A) Iniciar imediatamente enoxaparina 1 mg/kg SC de 12/12h e solicitar angiotomografia computadorizada de artérias pulmonares de urgência, pois o D-dímero é superior a 500 ng/mL.</li>
  <li>B) Considerar o D-dímero negativo utilizando o ponto de corte ajustado para a idade ($68 \times 10 = 680\text{ ng/mL}$), excluindo com segurança o diagnóstico de embolia pulmonar sem necessidade de exames de imagem adicionais.</li>
  <li>C) Solicitar arteriografia pulmonar invasiva por cateterismo direito, visto que o D-dímero entre 500 e 1.000 ng/mL confirma embolia subsegmentar em idosos.</li>
  <li>D) Indicar implante profilático de filtro de veia cava inferior e alta hospitalar com ácido acetilsalicílico.</li>
  <li>E) Repetir a dosagem do D-dímero a cada 6 horas durante 48 horas em regime de internação em UTI.</li>
</ul>
<p><strong>Gabarito: Alternativa B.</strong></p>
<p><strong>Comentário Detalhado:</strong></p>
<ul>
  <li><strong>Alternativa A (Incorreta):</strong> Utilizar o ponto de corte fixo de 500 ng/mL em pacientes acima de 50 anos reduz drasticamente a especificidade do D-dímero e leva à realização desnecessária de angiotomografias.</li>
  <li><strong>Alternativa B (Correta):</strong> Em pacientes com probabilidade clínica baixa ou intermediária (ou "TEP improvável", Wells &le; 4,0) e <strong>idade &gt; 50 anos</strong>, o limite superior da normalidade do D-dímero é calculado pela fórmula <strong>$\text{Idade} \times 10\text{ ng/mL}$</strong> (estudo <em>ADJUST-PE</em>). Para este paciente de 68 anos, o corte é de <strong>680 ng/mL</strong>. Como o resultado foi de 640 ng/mL (&lt; 680 ng/mL), o teste é negativo e o TEP está descartado com segurança.</li>
  <li><strong>Alternativa C (Incorreta):</strong> O D-dímero nunca confirma TEP isoladamente, e a arteriografia invasiva foi substituída pela Angio-TC quando há indicação de imagem.</li>
  <li><strong>Alternativa D (Incorreta):</strong> Não há TVP nem TEP, sendo absurdo indicar filtro de cava.</li>
  <li><strong>Alternativa E (Incorreta):</strong> Não existe curva seriada de D-dímero no diagnóstico do TEP.</li>
</ul>

<h3>Questão Comentada 2 — Aplicação dos Critérios PERC na Sala de Emergência</h3>
<p><strong>Enunciado:</strong> Mulher de 34 anos procura o pronto-socorro por sensação passageira de falta de ar associada a parestesias periorais após discussão familiar. Ao exame físico: bom estado geral, PA 118 × 74 mmHg, FC 88 bpm, FR 18 irpm, SpO2 98% em ar ambiente, ausculta cardiopulmonar normal e membros inferiores sem edema ou dor. Nega hemoptise, cirurgias ou traumas recentes e nega história pessoal de trombose. Contudo, relata fazer uso diário regular de anticoncepcional oral combinado (etinilestradiol + drospirenona). Considerando que a probabilidade pré-teste para TEP é baixa, como deve ser conduzida a investigação segundo a regra PERC (<em>Pulmonary Embolism Rule-out Criteria</em>)?</p>
<ul>
  <li>A) Como a paciente tem menos de 50 anos e sinais vitais normais, o critério PERC é considerado negativo e nenhum exame precisa ser solicitado.</li>
  <li>B) A regra PERC não é integralmente preenchida porque a paciente faz uso de estrogênio exógeno (anticoncepcional oral combinado); portanto, o TEP não pode ser descartado apenas clinicamente pelo PERC, sendo indicado solicitar a dosagem de D-dímero.</li>
  <li>C) O uso de anticoncepcional oral classifica automaticamente a paciente como "TEP Provável" pelo Escore de Wells (+5 pontos), obrigando à realização direta de Angio-TC sem D-dímero.</li>
  <li>D) Deve-se realizar trombólise empírica com alteplase 100 mg IV antes de qualquer exame laboratorial.</li>
  <li>E) Deve-se solicitar pesquisa de Fator V de Leiden e mutação da protrombina de emergência para decidir sobre a alta do pronto-socorro.</li>
</ul>
<p><strong>Gabarito: Alternativa B.</strong></p>
<p><strong>Comentário Detalhado:</strong></p>
<ul>
  <li><strong>Alternativa A (Incorreta):</strong> Para excluir TEP sem solicitar D-dímero pela regra PERC, o paciente de baixa probabilidade deve preencher <strong>todos os 8 critérios de ausência de risco</strong> (idade &lt; 50 anos, FC &lt; 100 bpm, SpO2 &ge; 95%, sem edema unilateral de perna, sem hemoptise, sem cirurgia/trauma nas últimas 4 semanas, sem TEV prévio e <strong>sem uso de hormônio estrogênico</strong>).</li>
  <li><strong>Alternativa B (Correta):</strong> Como a paciente faz uso de <strong>anticoncepcional oral combinado (estrogênio exógeno)</strong>, ela pontua +1 no PERC (falha na regra PERC). Por conseguinte, o TEP não pode ser excluído apenas pela avaliação clínica do PERC, devendo-se prosseguir para o próximo passo do fluxograma de baixa probabilidade: solicitar o <strong>D-dímero plasmático</strong> (se negativo &lt; 500 ng/mL, aí sim o TEP estará descartado).</li>
  <li><strong>Alternativa C (Incorreta):</strong> O uso de anticoncepcional oral faz parte dos critérios PERC, mas <strong>não faz parte do Escore de Wells nem do Escore de Genebra</strong>!</li>
  <li><strong>Alternativa D (Incorreta):</strong> A paciente está estável e sem diagnóstico de TEP.</li>
  <li><strong>Alternativa E (Incorreta):</strong> Pesquisa de trombofilia jamais é utilizada para diagnóstico de TEP agudo na emergência.</li>
</ul>

<h3>Questão Comentada 3 — Alterações Eletrocardiográficas e Radiográficas no TEP</h3>
<p><strong>Enunciado:</strong> A respeito dos achados nos exames complementares básicos (eletrocardiograma, radiografia de tórax e gasometria arterial) em pacientes com embolia pulmonar aguda, assinale a alternativa CORRETA:</p>
<ul>
  <li>A) O complexo de McGinn-White ($S_1Q_3T_3$) está presente em mais de 85% de todos os pacientes com embolia pulmonar, sendo o achado eletrocardiográfico mais sensível da doença.</li>
  <li>B) A alteração eletrocardiográfica mais frequente na embolia pulmonar é a taquicardia sinusal, enquanto a inversão das ondas T nas derivações precordiais direitas (V1 a V4) correlaciona-se com sobrecarga e isquemia aguda do ventrículo direito.</li>
  <li>C) O Sinal de Westermark à radiografia de tórax consiste em uma condensação alveolar triangular com base voltada para a pleura e ápice voltado para o hilo, representando infarto pulmonar.</li>
  <li>D) A Corcova de Hampton corresponde à hipertransparência focal do parênquima pulmonar por oligoemia distal ao trombo.</li>
  <li>E) Uma gasometria arterial demonstrando $\text{PaO}_2 = 88\text{ mmHg}$ e $\text{SpO}_2 = 96\%$ exclui definitivamente o diagnóstico de embolia pulmonar aguda.</li>
</ul>
<p><strong>Gabarito: Alternativa B.</strong></p>
<p><strong>Comentário Detalhado:</strong></p>
<ul>
  <li><strong>Alternativa A (Incorreta):</strong> O padrão $S_1Q_3T_3$ reflete sobrecarga aguda do VD (<em>cor pulmonale</em> agudo), mas possui baixa sensibilidade, ocorrendo em apenas 10% a 20% dos casos de TEP.</li>
  <li><strong>Alternativa B (Correta):</strong> A <strong>taquicardia sinusal</strong> é o achado eletrocardiográfico mais comum no TEP, e a <strong>inversão de onda T de V1 a V4</strong> é o sinal eletrocardiográfico mais fortemente associado à disfunção/isquemia aguda do VD e pior prognóstico.</li>
  <li><strong>Alternativa C (Incorreta):</strong> A descrição de opacidade triangular periférica com base pleural e ápice truncado voltado ao hilo (infarto pulmonar) corresponde à <strong>Corcova de Hampton</strong>, e não ao sinal de Westermark.</li>
  <li><strong>Alternativa D (Incorreta):</strong> A hipertransparência por oligoemia focal distal ao vaso ocluído é o <strong>Sinal de Westermark</strong>.</li>
  <li><strong>Alternativa E (Incorreta):</strong> Até 15% a 20% dos pacientes com TEP confirmado (especialmente jovens sem pneumopatia prévia) apresentam $\text{PaO}_2$ e $\text{SpO}_2$ dentro da faixa normal, frequentemente às custas de hiperventilação (hipocapnia) e aumento do gradiente alvéolo-arterial de oxigênio.</li>
</ul>

<h3>Questão Comentada 4 — Estratificação de Risco ESC e Conduta no TEP Submaciço</h3>
<p><strong>Enunciado:</strong> Mulher de 67 anos é admitida com dispneia súbita há 6 horas. Ao exame físico: lúcida, orientada, boa perfusão periférica, PA 122 × 76 mmHg, FC 116 bpm, FR 26 irpm, SpO2 89% em ar ambiente. A angiotomografia de tórax confirma falha de enchimento nos ramos principais direito e esquerdo das artérias pulmonares e demonstra dilatação do ventrículo direito com razão $\text{VD/VE} = 1,2$. O ecocardiograma confirma hipocinesia da parede livre do VD com preservação da contratilidade apical (sinal de McConnell). A dosagem de troponina T de alta sensibilidade é de 95 ng/L (VR &lt; 14 ng/L) e o BNP é de 620 pg/mL. Como este caso é classificado segundo a Diretriz ESC/SBC e qual é o tratamento inicial recomendado?</p>
<ul>
  <li>A) TEP de Alto Risco (Maciço); administrar imediatamente Alteplase 100 mg IV em 2 horas associada a Heparina Não Fracionada.</li>
  <li>B) TEP de Baixo Risco; prescrever Rivaroxabana 15 mg de 12/12h e conceder alta hospitalar imediata do pronto-socorro.</li>
  <li>C) TEP de Risco Intermediário-Alto; internar em unidade monitorada (UTI/Semi-intensiva) e iniciar anticoagulação plena isolada (sem trombólise sistêmica de rotina, reservando a trombólise de resgate caso surja instabilidade hemodinâmica).</li>
  <li>D) TEP de Risco Intermediário-Baixo; iniciar apenas Ácido Acetilsalicílico 100 mg/dia e compressão pneumática intermitente.</li>
  <li>E) TEP de Alto Risco; encaminhar diretamente para tromboendarterectomia pulmonar crônica e prescrever Riociguate.</li>
</ul>
<p><strong>Gabarito: Alternativa C.</strong></p>
<p><strong>Comentário Detalhado:</strong></p>
<ul>
  <li><strong>Alternativa A (Incorreta):</strong> Para ser classificado como TEP de Alto Risco (Maciço) e ter indicação de trombólise primária imediata, o paciente precisa apresentar <strong>instabilidade hemodinâmica</strong> (PCR, choque obstrutivo ou PAS &lt; 90 mmHg / queda &ge; 40 mmHg por &gt; 15 min). A paciente tem PA 122 × 76 mmHg e boa perfusão.</li>
  <li><strong>Alternativa B (Incorreta):</strong> A paciente apresenta sPESI = 2 pontos (FC &ge; 110 bpm e SpO2 &lt; 90%), disfunção de VD na imagem e troponina positiva, o que contraindica totalmente a alta precoce.</li>
  <li><strong>Alternativa C (Correta):</strong> Paciente hemodinamicamente estável (sem hipotensão), com sPESI &ge; 1 ponto, associado simultaneamente a <strong>disfunção do VD na imagem ($\text{VD/VE} = 1,2$ e sinal de McConnell) E troponina cardíaca elevada</strong> define exatamente o <strong>TEP de Risco Intermediário-Alto</strong>. Pelo estudo <em>PEITHO</em>, a trombólise de rotina nesse grupo causa excesso de AVC hemorrágico sem reduzir mortalidade; portanto, a conduta padrão (Classe I) é <strong>anticoagulação plena sob monitorização intensiva</strong>, reservando a trombólise de resgate apenas se houver descompensação hemodinâmica.</li>
  <li><strong>Alternativa D (Incorreta):</strong> No risco intermediário-baixo apenas um dos marcadores (VD ou troponina) é positivo ou ambos são negativos; além disso, o tratamento do TEP exige anticoagulação plena, e nunca antiagregante isolado.</li>
  <li><strong>Alternativa E (Incorreta):</strong> Tromboendarterectomia e riociguate são tratamentos da HPTEC (crônica), e não do TEP agudo.</li>
</ul>

<h3>Questão Comentada 5 — Farmacologia Clínica dos DOACs no Tratamento do TEV</h3>
<p><strong>Enunciado:</strong> Homem de 48 anos, sem comorbidades renais ou hepáticas (clearance de creatinina = 92 mL/min), recebe diagnóstico de trombose venosa profunda da veia poplítea e veia femoral esquerdas associada a embolia pulmonar segmentar de baixo risco (sPESI = 0, VD normal e troponina negativa). O médico opta por tratamento com Anticoagulante Oral Direto (DOAC) sem utilizar heparina parenteral prévia (abordagem de droga única desde o primeiro dia). Assinale a alternativa que apresenta um fármaco e uma posologia validados para início em <strong>monoterapia oral desde o Dia 1</strong>:</p>
<ul>
  <li>A) Dabigatrana 150 mg VO de 12/12 horas desde o primeiro dia, sem heparina prévia.</li>
  <li>B) Edoxabana 60 mg VO uma vez ao dia desde o primeiro dia, sem heparina prévia.</li>
  <li>C) Rivaroxabana 15 mg VO de 12/12 horas durante os primeiros 21 dias, seguida de 20 mg VO uma vez ao dia; OU Apixabana 10 mg VO de 12/12 horas durante os primeiros 7 dias, seguida de 5 mg VO de 12/12 horas.</li>
  <li>D) Varfarina 5 mg VO uma vez ao dia em monoterapia desde o primeiro dia, sem heparina concomitante.</li>
  <li>E) Rivaroxabana 10 mg VO uma vez ao dia desde o primeiro dia por 3 meses.</li>
</ul>
<p><strong>Gabarito: Alternativa C.</strong></p>
<p><strong>Comentário Detalhado:</strong></p>
<ul>
  <li><strong>Alternativa A (Incorreta):</strong> Nos ensaios pivotais (<em>RE-COVER</em>), a <strong>Dabigatrana</strong> exigiu obrigatoriamente <strong>5 a 10 dias de anticoagulação parenteral prévia (HBPM ou HNF)</strong> antes de iniciar os 150 mg 12/12h.</li>
  <li><strong>Alternativa B (Incorreta):</strong> No estudo <em>Hokusai-VTE</em>, a <strong>Edoxabana</strong> também exigiu obrigatoriamente <strong>pelo menos 5 dias de anticoagulação parenteral prévia</strong> antes de iniciar os 60 mg 24/24h.</li>
  <li><strong>Alternativa C (Correta):</strong> Apenas dois DOACs possuem aprovação e validação clínica para início direto em monoterapia oral desde o Dia 1 (<em>single-drug regimen</em>), utilizando uma dose de ataque inicial maior para conter a alta carga de trombina aguda: a <strong>Rivaroxabana (15 mg 12/12h por 21 dias $\rightarrow$ depois 20 mg 1x/dia)</strong> e a <strong>Apixabana (10 mg 12/12h por 7 dias $\rightarrow$ depois 5 mg 12/12h)</strong>!</li>
  <li><strong>Alternativa D (Incorreta):</strong> A varfarina jamais pode ser iniciada em monoterapia no TEV agudo devido à queda precoce das proteínas C e S (exigindo ponte de heparina por &ge; 5 dias até INR 2,0–3,0 por 24h).</li>
  <li><strong>Alternativa E (Incorreta):</strong> A dose de 10 mg/dia de rivaroxabana é sub-terapêutica na fase aguda do TEV (sendo usada apenas para profilaxia ortopédica ou prevenção secundária estendida após completar os primeiros 6 meses de tratamento pleno).</li>
</ul>

<h3>Questão Comentada 6 — Indicações do Filtro de Veia Cava Inferior</h3>
<p><strong>Enunciado:</strong> Paciente masculino de 59 anos foi submetido há 48 horas a craniotomia neurocirúrgica para drenagem de hematoma intraparenquimatoso espontâneo. Hoje evolui com edema acentuado e dor em todo o membro inferior direito, e o ultrassom Doppler venoso compressivo confirma trombose venosa profunda aguda oclusiva das veias poplítea, femoral e ilíaca externa direitas. Qual é a conduta terapêutica mais adequada neste momento?</p>
<ul>
  <li>A) Iniciar imediatamente Alteplase 100 mg IV em 2 horas para lisar o trombo iliofemoral antes que embolize.</li>
  <li>B) Iniciar Enoxaparina 1 mg/kg SC de 12/12h associada a Rivaroxabana 15 mg VO de 12/12h.</li>
  <li>C) Indicar o implante percutâneo de um filtro de veia cava inferior recuperável (infrarrenal) e iniciar anticoagulação farmacológica somente quando a equipe neurocirúrgica liberar a segurança hemostática intracraniana.</li>
  <li>D) Realizar ligadura cirúrgica aberta da aorta abdominal infrarrenal.</li>
  <li>E) Manter apenas observação clínica sem nenhuma medida mecânica ou intervencionista, pois trombos iliofemorais têm menos de 1% de risco de embolia pulmonar.</li>
</ul>
<p><strong>Gabarito: Alternativa C.</strong></p>
<p><strong>Comentário Detalhado:</strong></p>
<ul>
  <li><strong>Alternativa A (Incorreta):</strong> Hemorragia intracraniana e neurocirurgia recente são contraindicações absolutas à trombólise e à anticoagulação plena.</li>
  <li><strong>Alternativa B (Incorreta):</strong> Anticoagulação plena em um paciente com 48 horas de pós-operatório de hematoma intraparenquimatoso cerebral causaria ressangramento intracraniano fatal.</li>
  <li><strong>Alternativa C (Correta):</strong> Este é o cenário clássico da <strong>indicação Classe I de implante de Filtro de Veia Cava Inferior</strong>: paciente com <strong>TVP proximal aguda (poplítea/femoral/ilíaca) ou TEP agudo que apresenta contraindicação absoluta à anticoagulação terapêutica</strong> (aqui, hemorragia intracraniana e neurocirurgia há 48 horas). Implanta-se um filtro recuperável para impedir a migração de êmbolos fatais para o pulmão e, tão logo o risco de sangramento intracraniano cesse, inicia-se a anticoagulação e retira-se o filtro.</li>
  <li><strong>Alternativa D (Incorreta):</strong> Conduta absurda; o filtro é posicionado por via endovenosa na veia cava inferior abaixo das veias renais.</li>
  <li><strong>Alternativa E (Incorreta):</strong> A TVP proximal iliofemoral não tratada apresenta risco de até 50% de embolia pulmonar sintomática e alta mortalidade.</li>
</ul>

<h3>Questão Comentada 7 — Tratamento da Embolia Pulmonar no Paciente com Insuficiência Renal Grave</h3>
<p><strong>Enunciado:</strong> Mulher de 72 anos, portadora de doença renal crônica avançada (creatinina de 4,2 mg/dL; taxa de filtração glomerular estimada = 11 mL/min/1,73 m²), é internada com diagnóstico confirmado por cintilografia V/Q de embolia pulmonar bilateral hemodinamicamente estável. Qual é o esquema de anticoagulação inicial e de manutenção mais seguro e recomendado para esta paciente?</p>
<ul>
  <li>A) Dabigatrana 150 mg VO de 12/12 horas por 6 meses.</li>
  <li>B) Fondaparinux 7,5 mg SC de 24/24 horas por 3 meses.</li>
  <li>C) Heparina Não Fracionada (HNF) IV em bolus e infusão contínua guiada pelo TTPa, iniciando simultaneamente Varfarina oral (mantendo a HNF por pelo menos 5 dias e até o INR atingir 2,0 a 3,0 por 2 dias consecutivos).</li>
  <li>D) Enoxaparina na dose padrão de 1 mg/kg SC de 12/12 horas por 6 meses sem ajuste e sem monitorização de anti-Xa.</li>
  <li>E) Rivaroxabana 20 mg VO de 8/8 horas associada a Clopidogrel.</li>
</ul>
<p><strong>Gabarito: Alternativa C.</strong></p>
<p><strong>Comentário Detalhado:</strong></p>
<ul>
  <li><strong>Alternativa A (Incorreta):</strong> A dabigatrana possui 80% de excreção renal inalterada, sendo formalmente <strong>contraindicada quando o ClCr é &lt; 30 mL/min</strong> pelo risco de acúmulo e hemorragia grave.</li>
  <li><strong>Alternativa B (Incorreta):</strong> O fondaparinux tem eliminação exclusivamente renal e é formalmente <strong>contraindicado quando o ClCr é &lt; 30 mL/min</strong>.</li>
  <li><strong>Alternativa C (Correta):</strong> Na insuficiência renal grave / estágio 5 (TFGe &lt; 15 mL/min), a <strong>Heparina Não Fracionada (HNF)</strong> é o anticoagulante parenteral de escolha porque sua depuração ocorre predominantemente no sistema reticuloendotelial e no fígado, não sofrendo acúmulo renal, e a <strong>Varfarina</strong> (metabolizada pelo citocromo P450 hepático, com INR alvo 2,0–3,0) é o anticoagulante oral clássico seguro após a ponte obrigatória de &ge; 5 dias com HNF.</li>
  <li><strong>Alternativa D (Incorreta):</strong> Usar enoxaparina na dose plena de 12/12h em paciente com TFGe de 11 mL/min causa bioacumulação grave e choque hemorrágico.</li>
  <li><strong>Alternativa E (Incorreta):</strong> Rivaroxabana é contraindicada quando ClCr &lt; 15 mL/min e a dose de 20 mg 8/8h não existe.</li>
</ul>

<h3>Questão Comentada 8 — Escolha do Anticoagulante na Síndrome Antifosfolípide (SAF)</h3>
<p><strong>Enunciado:</strong> Mulher de 29 anos, com história obstétrica de três abortamentos espontâneos consecutivos antes da 10ª semana e um óbito fetal na 16ª semana, apresenta quadro de trombose venosa profunda femoropoplítea esquerda e embolia pulmonar lobar. A investigação laboratorial (confirmada em segunda coleta após 12 semanas) demonstra positividade em altos títulos para Anticoagulante Lúpico, Anticorpo Anticardiolipina IgG e Anticorpo Anti-&beta;2-glicoproteína I IgG (SAF triplo-positiva). A paciente não está gestante no momento e apresenta função renal normal. Qual é o anticoagulante oral de manutenção de escolha e por quanto tempo deve ser mantido?</p>
<ul>
  <li>A) Rivaroxabana 20 mg/dia VO por apenas 3 meses.</li>
  <li>B) Dabigatrana 150 mg 12/12h VO por 6 meses.</li>
  <li>C) Varfarina oral (ajustada para manter INR entre 2,0 e 3,0, precedida por ponte de heparina) por tempo indeterminado, sendo contraindicado o uso de DOACs na SAF triplo-positiva.</li>
  <li>D) Apixabana 2,5 mg 12/12h VO por 3 meses.</li>
  <li>E) Apenas Hidroxicloroquina 400 mg/dia associada a AAS 100 mg/dia, sem necessidade de anticoagulação após o 10º dia.</li>
</ul>
<p><strong>Gabarito: Alternativa C.</strong></p>
<p><strong>Comentário Detalhado:</strong></p>
<ul>
  <li><strong>Alternativas A, B e D (Incorretas):</strong> Com base nos ensaios clínicos randomizados (especialmente o estudo <em>TRAPS</em> e <em>ASTRO-APS</em>), o uso de DOACs (rivaroxabana, apixabana, edoxabana, dabigatrana) em pacientes com <strong>Síndrome Antifosfolípide (sobretudo triplo-positiva ou com eventos arteriais)</strong> associou-se a um <strong>aumento significativo de eventos tromboembólicos recorrentes (especialmente AVC isquêmico e IAM)</strong> em comparação à varfarina! Além disso, como a SAF é uma trombofilia adquirida persistente de alto risco, suspender a anticoagulação aos 3 ou 6 meses leva a taxas proibitivas de recorrência.</li>
  <li><strong>Alternativa C (Correta):</strong> Na <strong>Síndrome Antifosfolípide (SAF) trombótica — particularmente nos pacientes triplo-positivos</strong> —, os DOACs são formalmente <strong>contraindicados (Classe III)</strong>, e o tratamento padrão-ouro consiste em <strong>anticoagulação por tempo indeterminado (perpétua) com antagonista da vitamina K (Varfarina, mantendo INR alvo entre 2,0 e 3,0)</strong>!</li>
  <li><strong>Alternativa E (Incorreta):</strong> AAS e hidroxicloroquina isolados são insuficientes para a prevenção secundária da SAF trombótica.</li>
</ul>

<h3>Questão Comentada 9 — Suporte Hemodinâmico e Trombólise no TEP de Alto Risco em Parada Cardiorrespiratória</h3>
<p><strong>Enunciado:</strong> Paciente masculino de 54 anos, internado com trombose venosa profunda proximal conhecida, apresenta súbita dispneia grave, turgência jugular, cianose e evolui em 5 minutos para parada cardiorrespiratória em ritmo de Atividade Elétrica Sem Pulso (AESP). Além das compressões torácicas de alta qualidade e epinefrina conforme o ACLS, qual é a conduta específica recomendada pelas diretrizes para reverter a causa desta PCR (5 Hs e 5 Ts — Tromboembolismo Pulmonar) e por quanto tempo as manobras de RCP devem ser mantidas após sua administração?</p>
<ul>
  <li>A) Infundir 4.000 mL de soro fisiológico em 10 minutos e interromper as manobras de RCP após 10 minutos se não houver retorno da circulação espontânea.</li>
  <li>B) Administrar trombolítico sistêmico em bolus/infusão acelerada (ex.: Alteplase 50 mg IV em bolus ou 0,6 mg/kg em 15 minutos) e manter as manobras de ressuscitação cardiopulmonar por pelo menos 60 a 90 minutos antes de considerar a interrupção dos esforços.</li>
  <li>C) Administrar Sulfato de Protamina 50 mg IV e Amiodarona 300 mg IV.</li>
  <li>D) Realizar pericardiocentese subxifóidea cega e suspender a RCP em 15 minutos.</li>
  <li>E) Administrar apenas Clopidogrel 600 mg por sonda nasogástrica.</li>
</ul>
<p><strong>Gabarito: Alternativa B.</strong></p>
<p><strong>Comentário Detalhado:</strong></p>
<ul>
  <li><strong>Alternativa A (Incorreta):</strong> A infusão maciça de 4 litros de cristaloide superdistende ainda mais o ventrículo direito já obstruído, colabando o ventrículo esquerdo por desvio septal, e interromper a RCP em 10 minutos impede a ação de qualquer terapia de reperfusão.</li>
  <li><strong>Alternativa B (Correta):</strong> A embolia pulmonar maciça é uma das clássicas causas reversíveis de PCR em AESP ("5 Hs e 5 Ts"). Diante de PCR por TEP confirmado ou altamente presumido, está indicada a administração imediata de <strong>trombolítico sistêmico em regime acelerado (Alteplase 0,6 mg/kg em 15 min — máx. 50 mg — ou bolus de 50 mg IV, podendo repetir 50 mg após 15 min, ou Tenecteplase em bolus)</strong>. Como o fármaco fibrinolítico necessita de circulação mecânica gerada pelas compressões torácicas e de tempo bioquímico para converter plasminogênio em plasmina e lisar o trombo pulmonar, as diretrizes (ESC e ERC/AHA) recomendam <strong>continuar a RCP por pelo menos 60 a 90 minutos</strong> após a administração do trombolítico antes de declarar o óbito!</li>
  <li><strong>Alternativa C (Incorreta):</strong> Protamina é o antídoto da heparina (pró-coagulante) e amiodarona é usada para FV/TV sem pulso refratária.</li>
  <li><strong>Alternativa D (Incorreta):</strong> Pericardiocentese trata tamponamento cardíaco, e não embolia pulmonar.</li>
  <li><strong>Alternativa E (Incorreta):</strong> Antiagregante plaquetário enteral não tem qualquer papel na PCR por TEP.</li>
</ul>

<h3>Questão Comentada 10 — Duração da Anticoagulação (TEV Provocado vs. Não Provocado)</h3>
<p><strong>Enunciado:</strong> Compare o planejamento terapêutico de dois pacientes que completaram hoje 3 meses de anticoagulação regular com Apixabana (sem intercorrências hemorrágicas e com recuperação clínica completa):
<br>• <strong>Paciente 1:</strong> Mulher de 40 anos que apresentou TVP femoropoplítea 10 dias após cirurgia eletiva de osteossíntese de fratura de tíbia (com mobilidade atual já totalmente recuperada e sem outros fatores de risco).
<br>• <strong>Paciente 2:</strong> Homem de 55 anos que apresentou embolia pulmonar lobar bilateral espontânea (não provocada / idiopática), tendo tido um episódio prévio de TVP espontânea há 4 anos, e que possui baixo risco de sangramento.
<br>Qual é a conduta correta quanto à duração da anticoagulação para o Paciente 1 e para o Paciente 2, respectivamente?</p>
<ul>
  <li>A) Suspender a anticoagulação no Paciente 1 (completou 3 meses para TEV provocado por fator transitório maior); e manter anticoagulação estendida por tempo indeterminado no Paciente 2 (TEV recorrente não provocado).</li>
  <li>B) Manter anticoagulação perpétua no Paciente 1; e suspender a anticoagulação aos 3 meses no Paciente 2.</li>
  <li>C) Manter anticoagulação por exatamente mais 3 meses em ambos e suspender definitivamente aos 6 meses nos dois casos.</li>
  <li>D) Substituir a apixabana por filtro de veia cava definitivo em ambos os pacientes aos 3 meses.</li>
  <li>E) Suspender a anticoagulação em ambos os pacientes e iniciar apenas meia elástica de alta compressão.</li>
</ul>
<p><strong>Gabarito: Alternativa A.</strong></p>
<p><strong>Comentário Detalhado:</strong></p>
<ul>
  <li><strong>Alternativa A (Correta):</strong> O <strong>Paciente 1</strong> apresentou um primeiro episódio de TEV claramente <strong>provocado por um fator de risco transitório e reversível maior</strong> (fratura e cirurgia ortopédica de membro inferior já resolvidas). Nesse cenário, o risco de recorrência após a suspensão do anticoagulante é inferior a 1%–3% ao ano, sendo a recomendação formal (Classe I) <strong>tratar por exatamente 3 meses e suspender o anticoagulante</strong>! Já o <strong>Paciente 2</strong> apresenta <strong>TEV não provocado (idiopático) e recorrente (2º episódio)</strong>, além de ser do sexo masculino (maior risco de recorrência): seu risco de novo evento tromboembólico caso pare o anticoagulante ultrapassa 30%–40% em 5 anos, tendo indicação formal (Classe I) de <strong>anticoagulação estendida por tempo indeterminado</strong>!</li>
  <li><strong>Alternativa B (Incorreta):</strong> Inverte completamente as indicações baseadas no risco de recorrência.</li>
  <li><strong>Alternativa C (Incorreta):</strong> Prolongar de 3 para 6 meses no TEV cirúrgico transitório apenas aumenta o sangramento sem benefício adicional, e suspender aos 6 meses no TEV não provocado recorrente não protege contra a recorrência tardia.</li>
  <li><strong>Alternativa D (Incorreta):</strong> Filtro de cava nunca substitui anticoagulação em pacientes sem contraindicação a anticoagulantes.</li>
  <li><strong>Alternativa E (Incorreta):</strong> Suspender o anticoagulante no Paciente 2 expõe-no a alto risco de TEP fatal recorrente; além disso, meias elásticas não previnem recorrência de TEV.</li>
</ul>
`
    }
  ],
  references: [
    {
      label: 'Konstantinides SV, Meyer G, Becattini C, et al. 2019 ESC Guidelines for the diagnosis and management of acute pulmonary embolism developed in collaboration with the European Respiratory Society (ERS). European Heart Journal. 2020;41(4):543-603.',
      url: 'https://academic.oup.com/eurheartj/article/41/4/543/5556136'
    },
    {
      label: 'Stevens SM, Woller SC, Kreuziger LB, et al. Antithrombotic Therapy for VTE Disease: Second Update of the CHEST Guideline and Expert Panel Report. Chest. 2021;160(6):e545-e608.',
      url: 'https://journal.chestnet.org/article/S0012-3692(21)01506-3/fulltext'
    },
    {
      label: 'Albricker ACL, Freire CMV, Santos SN, et al. Diretriz Conjunta sobre Tromboembolismo Venoso – 2022 (SBC / DIC / SBACV / CBR). Arquivos Brasileiros de Cardiologia. 2022;118(4):797-857.',
      url: 'https://abccardiol.org/article/diretriz-conjunta-sobre-tromboembolismo-venoso-2022/'
    },
    {
      label: 'Meyer G, Vicaut E, Danays T, et al. Fibrinolysis for Patients with Intermediate-Risk Pulmonary Embolism (PEITHO Trial). New England Journal of Medicine. 2014;370(15):1402-1411.',
      url: 'https://www.nejm.org/doi/full/10.1056/NEJMoa1302097'
    },
    {
      label: 'Righini M, Van Es J, Den Exter PL, et al. Age-Adjusted D-Dimer Cutoff Levels to Rule Out Pulmonary Embolism: The ADJUST-PE Study. JAMA. 2014;311(11):1117-1124.',
      url: 'https://jamanetwork.com/journals/jama/fullarticle/1841967'
    },
    {
      label: 'Agnelli G, Becattini C, Meyer G, et al. Apixaban for the Treatment of Venous Thromboembolism Associated with Cancer (CARAVAGGIO Trial). New England Journal of Medicine. 2020;382(17):1599-1607.',
      url: 'https://www.nejm.org/doi/full/10.1056/NEJMoa1915103'
    }
  ]
};

saveBook(book);
