// scripts/bloco07_group_a/pancreatite-expansao.mjs
export const secPancreatiteExpansao = [
  {
    id: 'fisiopatologia-avancada-imunologia-celular',
    title: '2.1 Fisiopatologia Celular Avançada: Estresse de Retículo, Autofagia e Apoptose versus Necrose',
    body_html: `
<p>O aprofundamento nos eventos intracelulares que antecedem a lise acinar revelou que a pancreatite aguda não é meramente um acidente de autodigestão mecânica, mas uma orquestração patológica complexa que envolve estresse organelar, falha do fluxo autofágico e desregulação das vias de morte celular programada.</p>

<h3>Sobrecarga de Cálcio Citosólico e Estresse do Retículo Endoplasmático</h3>
<p>O evento desencadeante proximal compartilhado pela maioria dos agentes indutores de pancreatite aguda (ácidos biliares, metabólitos do etanol e ésteres de ácidos graxos) é a abertura patológica e sustentada dos canais de liberação de cálcio no retículo endoplasmático, mediada pelos receptores de inositol 1,4,5-trifosfato (IP3R) e receptores de rianodina (RyR), associada à inibição da recaptação pela bomba de cálcio SERCA. Essa liberação maciça provoca uma onda patológica sustentada de cálcio citosólico livre.</p>

<p>A elevação sustentada do cálcio intracelular desencadeia dois efeitos fatais imediatos no ácino pancreático:</p>
<ul>
  <li><strong>Colapso do Potencial Transmembrana Mitocondrial:</strong> O influxo excessivo de cálcio para a matriz mitocondrial abre o poro de transição de permeabilidade mitocondrial (mPTP), dissipando o gradiente eletroquímico de prótons, interrompendo a síntese de adenosina trifosfato (ATP) e levando à necrose celular por depleção energética aguda. Quando os níveis de ATP são preservados, a célula acinar ainda consegue ativar a maquinaria das caspases e morrer por apoptose, processo muito menos inflamatório; contudo, a perda catastrófica e rápida de ATP desvia a via de morte obrigatoriamente para a necrose celular lítica e pró-inflamatória;</li>
  <li><strong>Fusão Lisossomal Aberrante:</strong> O cálcio ativado induz a fusão ectópica das vesículas lisossomais com os grânulos de zimogênio, permitindo que a catepsina B ative proteoliticamente o tripsinogênio dentro da própria célula acinar.</li>
</ul>

<h3>Bloqueio do Fluxo Autofágico e Acúmulo de Proteínas Agregadas</h3>
<p>A autofagia é o processo fisiológico essencial pelo qual os ácinos degradam organelas senescentes e agregados proteicos anômalos. Na pancreatite aguda, ocorre um bloqueio grave na etapa final de degradação nos lisossomos, resultante de deficiência relativa da atividade de catepsinas L e acúmulo de vacúolos autofágicos repletos de zimogênios imaturos. Esse bloqueio do fluxo autofágico gera estresse severo no retículo endoplasmático rugoso, ativando a resposta a proteínas não enoveladas (UPR - <em>Unfolded Protein Response</em>), mediada pelos transdutores PERK, IRE1 e ATF6. A exaustão da UPR culmina na transcrição de fatores pró-apoptóticos e pró-necróticos como CHOP (proteína homóloga a C/EBP), amplificando a liberação de padrões moleculares associados ao dano (DAMPs).</p>

<h3>Liberação de DAMPs e a Tempestade de Citocinas Sistêmica</h3>
<p>A ruptura da membrana plasmática acinar libera no interstício e no leito vascular retroperitoneal um conjunto de DAMPs, incluindo a proteína nuclear HMGB1 (<em>high mobility group box 1</em>), DNA mitocondrial livre de fita dupla, histonas e ATP extracelular. Essas moléculas ligam-se avidamente aos receptores de reconhecimento de padrão (PRRs), notadamente os receptores Toll-like tipo 4 (TLR4) e tipo 9 (TLR9) e receptores para produtos de glicação avançada (RAGE) expressos em macrófagos residentes pancreáticos e células endoteliais.</p>

<p>Essa sinalização converge para a ativação do fator de transcrição nuclear kappa B (NF-kB) e para a montagem do inflamassoma NLRP3. O inflamassoma recruta e ativa a pró-caspase-1, responsável por clivar enzimaticamente a pró-IL-1beta e a pró-IL-18 em suas formas biologicamente ativas e maduras. A secreção estromal de IL-1beta, TNF-alfa e IL-6 recruta uma primeira onda massiva de neutrófilos periféricos (estimulados pela quimiocina CXCL8/IL-8), cujas armadilhas extracelulares de neutrófilos (NETs) obstruem ductos acinares e provocam trombose na microcirculação capilar do pâncreas, transformando áreas de isquemia transitória em necrose parenquimatosa confluente e irreversível.</p>
`
  },
  {
    id: 'complicacoes-sistemicas-e-hemodinamica-uti',
    title: '4.1 Complicações Cardiovasculares, Renais, Pulmonares e Hipertensão Intra-Abdominal',
    body_html: `
<p>A mortalidade precoce na pancreatite aguda grave decorre predominantemente da falência orgânica múltipla refratária. A compreensão da fisiopatologia de cada sistema orgânico afetado orienta a atuação precisa do médico intensivista.</p>

<h3>1. Síndrome do Desconforto Respiratório Agudo (SDRA) e Lesão Pulmonar Aguda</h3>
<p>O pulmão é o primeiro e mais frequente órgão à distância comprometido na pancreatite aguda, desenvolvendo disfunção em até 30% a 50% dos casos graves. O mecanismo envolve:</p>
<ul>
  <li>Liberação sistêmica de fosfolipase A2 circulante, que degrada o dipalmitoilfosfatidilcolina, componente lipídico essencial do surfactante alveolar pulmonar, causando atelectasias difusas e colapso alveolar;</li>
  <li>Sequestro de neutrófilos ativados nos capilares pulmonares com liberação de elastase, espécies reativas de oxigênio (ROS) e aumento acentuado da permeabilidade alvéolo-capilar (edema pulmonar não cardiogênico);</li>
  <li>Elevação da cúpula diafragmática por distensão gasosa decorrente de íleo adinâmico, ascite enzimática e hipertensão intra-abdominal, reduzindo a complacência da caixa torácica e a capacidade residual funcional (CRF);</li>
  <li><em>Manejo Ventilatório Protetor:</em> Ventilação mecânica invasiva com volume corrente baixo (6 mL/kg de peso predito), pressão de platô &lt; 30 cmH2O, pressão de distensão (<em>driving pressure</em>) &lt; 15 cmH2O e titulação individualizada da PEEP para prevenir atelectrauma.</li>
</ul>

<h3>2. Choque Distributivo e Hipovolêmico Combinado</h3>
<p>O choque na pancreatite aguda possui natureza mista complexa:</p>
<ul>
  <li><strong>Componente Hipovolêmico:</strong> Sequestro massivo de 4 a 8 litros de plasma no retroperitônio e cavidade peritoneal nas primeiras 48 horas (o "terceiro espaço"), associado a perdas externas por vômitos e redução da ingesta;</li>
  <li><strong>Componente Distributivo:</strong> Semelhante ao choque séptico hiperdinâmico, mediado por vasodilatação arteriolar sistêmica generalizada provocada por níveis elevados de bradicinina, fator de ativação plaquetária e óxido nítrico endotelial;</li>
  <li><strong>Componente Miocárdico Tóxico:</strong> Depressão miocárdica transitória decorrente do fator depressor miocárdico (MDF) e altas concentrações de TNF-alfa;</li>
  <li><em>Suporte Farmacológico:</em> Se a pressão arterial média (PAM) não atingir 65 mmHg apesar de ressuscitação volêmica prudente com Ringer Lactato, deve-se introduzir precocemente noradrenalina em infusão contínua para restaurar o tônus vascular sistêmico e evitar a sobrecarga hídrica pulmonar.</li>
</ul>

<h3>3. Injúria Renal Aguda (IRA) Pró-Renal e Necrose Tubular Aguda</h3>
<p>A disfunção renal decorre da combinação deletéria de hipoperfusão glomerular (hipovolemia grave e vasoconstrição da arteríola aferente mediada pelo sistema renina-angiotensina-aldosterona e endotelina) com a toxicidade tubular direta exercida por citocinas inflamatórias e mioglobina livre gerada por rabdomiólise tecidual associada. A presença de oligúria (&lt; 0,5 mL/kg/h) e ascensão da creatinina &gt; 1,9 mg/dL persistente por mais de 48 horas configura falência orgânica renal grave com necessidade frequente de hemodiafiltração venovenosa contínua precoce para clareamento de citocinas e controle eletrolítico.</p>

<h3>4. Hipertensão Intra-Abdominal (HIA) e Síndrome Compartimental Abdominal (SCA)</h3>
<p>O edema maciço retroperitoneal, o íleo paralítico grave e, principalmente, a ressuscitação volêmica agressiva e desenfreada culminam frequentemente em elevação crítica da Pressão Intra-Abdominal (PIA), monitorada através da sonda vesical de demora conectada a transdutor de pressão (pressão intravesical com infusão de 20 a 25 mL de soro):</p>
<table class="book-table">
  <thead>
    <tr>
      <th>Classificação</th>
      <th>Valores de Pressão Intra-Abdominal (PIA)</th>
      <th>Repercussões e Conduta Médica</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Pressão Normal</strong></td>
      <td>0 a 5 mmHg (até 7-10 mmHg em pacientes críticos em UTI)</td>
      <td>Condições fisiológicas preservadas sem comprometimento da perfusão esplâncnica.</td>
    </tr>
    <tr>
      <td><strong>Hipertensão Intra-Abdominal (Graus I e II)</strong></td>
      <td>Grau I: 12 a 15 mmHg<br>Grau II: 16 a 20 mmHg</td>
      <td>Descompressão gástrica por sonda nasogástrica, uso de prócinéticos, drenagem de ascite volumosa por paracentese percutânea, analgesia e relaxamento muscular; restrição estrita de infusão volêmica positiva.</td>
    </tr>
    <tr>
      <td><strong>Síndrome Compartimental Abdominal (SCA)</strong></td>
      <td><strong>PIA &gt; 20 mmHg</strong> associada ao surgimento de <strong>nova disfunção ou falência de órgãos</strong> (queda do débito urinário, hipotensão refratária, aumento da pressão de pico ventilatória).</td>
      <td>Emergência médica e cirúrgica com risco iminente de morte. Requer bloqueio neuromuscular profundo, descompressão percutânea de coleções e, se refratária, <strong>laparostomia descompressiva de urgência</strong> com manutenção de abdome aberto (bolsa de Bogotá ou sistema de curativo a vácuo).</td>
    </tr>
  </tbody>
</table>
`
  },
  {
    id: 'diagnostico-etiologico-e-casos-especiais',
    title: '8.1 Investigação Etiológica Detalhada, Pancreatite Oculta e Casos Especiais',
    body_html: `
<p>Quando a história clínica e a ultrassonografia inicial não revelam litíase biliar nem consumo alcoólico evidente (pancreatite aguda inicialmente classificada como "idiopática"), uma rotina estruturada de investigação diagnóstica deve ser deflagrada para identificar etiologias ocultas tratáveis e prevenir recidivas potencialmente fatais.</p>

<h3>Algoritmo Propedêutico para Pancreatite sem Causa Aparente</h3>
<ol>
  <li><strong>Avaliação Bioquímica Completa:</strong> Perfil lipídico completo com dosagem de triglicerídeos séricos (se colhidos na admissão, pois a hipertrigliceridemia grave pode sofrer redução transitória pelo jejum hospitalar); cálcio total, albumina e cálcio iônico (para detectar hiperparatireoidismo primário); enzimas hepáticas seriadas (ALT persistentemente elevada sugere microlitíase oculta);</li>
  <li><strong>Ultrassonografia Abdominal Seriada:</strong> A USG inicial pode ser prejudicada pela presença de gases decorrentes de íleo adinâmico em até 30% a 40% dos casos. A repetição do exame ultrassonográfico após alguns dias ou a realização de USG dedicada à procura de barro biliar (<em>sludge</em>) e cálculos &lt; 3 mm tem alto rendimento diagnóstico;</li>
  <li><strong>Colangiorressonância Magnética (CPRM):</strong> Método de imagem não invasivo com alta resolução espacial para o estudo da árvore biliar e ducto de Wirsung. Detecta coledocolitíase distal não obstrutiva, anomalias anatômicas como pâncreas divisum (fusão incompleta dos ductos dorsal e ventral, sobrecarregando a papila menor) e tumores periampulares ou ductais incipientes (como Neoplasia Mucinosa Papilar Intraductal - IPMN);</li>
  <li><strong>Ecoendoscopia (Ultrassonografia Endoscópica - EUS):</strong> É o exame padrão-ouro para investigar pancreatite recorrente de etiologia indeterminada. Apresenta sensibilidade superior a 95% para detectar microlitíases da vesícula biliar, cálculos milimétricos no colédoco distal, tumores neuroendócrinos ou adenocarcinomas pancreáticos milimétricos e sinais parenquimatosos sutis de pancreatite crônica incipiente;</li>
  <li><strong>Pesquisa de Pancreatite Autoimune:</strong> Dosagem de imunoglobulina G subclasse 4 (IgG4). A pancreatite autoimune tipo 1 cursa com aumento de IgG4 e acometimento sistêmico (colangite esclerosante, fibrose retroperitoneal), enquanto o tipo 2 é restrito ao pâncreas e associado à Retocolite Ulcerativa. Ambas respondem dramaticamente à corticoterapia sistêmica com prednisona;</li>
  <li><strong>Painel Genético Molecular:</strong> Indicado em casos com histórico familiar positivo em primeiro grau ou episódios recorrentes na infância/adolescência. Pesquisa de mutações em <em>PRSS1</em> (pancreatite hereditária autossômica dominante de alta penetrância e risco cumulativo de câncer pancreático de 40%), <em>SPINK1</em>, <em>CFTR</em> (mucoviscidose/fibrose cística) e <em>CTRC</em>.</li>
</ol>

<h3>Manejo Específico da Pancreatite por Hipertrigliceridemia Grave</h3>
<p>Na pancreatite induzida por hipertrigliceridemia (níveis de triglicerídeos superiores a 1.000 mg/dL), além do suporte volêmico habitual, instituem-se medidas metabólicas específicas com o objetivo de reduzir rapidamente a trigliceridemia para níveis seguros (&lt; 500 mg/dL):</p>
<ul>
  <li><strong>Infusão Contínua de Insulina Regular Endovenosa:</strong> A insulina estimula diretamente a síntese e a atividade enzimática da lipoproteína lipase (LPL) no endotélio vascular capilar, enzima responsável por degradar quilomícrons e triglicerídeos séricos em ácidos graxos livres e glicerol. Administra-se infusão contínua de 0,1 a 0,3 U/kg/hora, associada a soro glicosado a 5% ou 10% concomitante para manter a glicemia entre 150 e 200 mg/dL e prevenir hipoglicemia iatrogênica grave;</li>
  <li><strong>Plasmaférese (Aférese de Lipídios):</strong> Indicada em centros especializados para pacientes com hipertrigliceridemia maciça (&gt; 2.000 mg/dL) que apresentam sinais clínicos de pancreatite grave, acidose lática refratária, hipocalcemia severa ou falência orgânica progressiva. Uma única sessão de plasmaférese consegue extrair mecanicamente 50% a 70% dos triglicerídeos circulantes em poucas horas;</li>
  <li><strong>Uso de Heparina:</strong> Embora a heparina libere estoques de LPL endotelial, seu uso prolongado esgota os estoques da enzima e eleva o risco hemorrágico na presença de necrose retroperitoneal, sendo hoje preterida em relação ao protocolo de insulina contínua.</li>
</ul>
`
  }
];
