import { saveBook } from './bloco-03-utils.mjs';

const book054 = {
  slug: 'doenca-trofoblastica-gestacional',
  title: 'Doença Trofoblástica Gestacional',
  area: 'Ginecologia e Obstetrícia',
  materia: 'Obstetrícia e Neoplasias Trofoblásticas',
  description: 'Tratado completo sobre Doença Trofoblástica Gestacional (DTG) e Neoplasia Trofoblástica Gestacional (NTG): genética e histopatologia da mola hidatiforme completa (diploide androgenética, p57 negativo) e parcial (triploide dispermia, p57 positivo), gravidez gemelar com feto normal e mola completa coexistente, manifestações clínicas clássicas e atípicas (sangramento em borra de café, cistos tecaluteínicos, hiperêmese incoercível, hipertireoidismo por subunidade alfa do hCG, pré-eclâmpsia precoce &lt; 20 semanas), achados ultrassonográficos em tempestade de neve e favo de mel, esvaziamento por vácuo-aspiração/AMIU com contraindicação formal de ocitocina prévia, protocolo estrito de monitorização de beta-hCG, critérios diagnósticos de NTG segundo a FIGO 2026, estadiamento anatômico e escore de risco FIGO/OMS (baixo risco, alto risco e ultra-alto risco), esquemas quimioterápicos (monoterapia MTX/Actinomicina D vs poliquimioterapia EMA-CO), manejo cirúrgico do PSTT e ETT, imunoterapia com anti-PD-1 no coriocarcinoma refratário, profilaxia anti-D, contracepção e aconselhamento reprodutivo, casos clínicos reais e questões comentadas de residência médica.',
  sections: [
    {
      id: 'conceito-espectro-epidemiologia',
      title: '1. Conceito, Classificação Biológica e Epidemiologia Global da DTG',
      body_html: `
<h3>Definição e Espectro Nosológico da Doença Trofoblástica Gestacional</h3>
<p>A <strong>Doença Trofoblástica Gestacional (DTG)</strong> compreende um grupo heterogêneo de anomalias proliferativas originadas do trofoblasto placentário humano (citotrofoblasto, sinciciotrofoblasto e trofoblasto intermediário). Biologicamente, caracteriza-se pela hipersecreção da subunidade beta da gonadotrofina coriônica humana (&beta;-hCG), que atua como marcador tumoral quantitativo de sensibilidade e especificidade quase perfeitas para triagem, monitorização terapêutica e diagnóstico de recidiva.</p>
<p>Didática e clinicamente, o espectro da DTG divide-se em duas grandes categorias:</p>
<ol>
  <li><strong>Formas Benignas (Pré-Malignas):</strong> As <em>Molas Hidatiformes</em>, subdivididas em <strong>Mola Hidatiforme Completa (MHC)</strong> e <strong>Mola Hidatiforme Parcial (MHP)</strong>. São caracterizadas por edema hidrópico das vilosidades coriônicas e proliferação do epitélio trofoblástico, sem invasão profunda do miométrio ou disseminação sistêmica à distância;</li>
  <li><strong>Formas Malignas — Neoplasia Trofoblástica Gestacional (NTG):</strong> Caracterizadas por potencial invasivo local destrutivo, embolização vascular e capacidade de metastatização à distância. Englobam a <strong>Mola Invasora</strong> (corioadenoma destruens), o <strong>Coriocarcinoma Gestacional</strong>, o <strong>Tumor Trofoblástico do Sítio Placentário (PSTT — Placental Site Trophoblastic Tumor)</strong> e o <strong>Tumor Trofoblástico Epitelioide (ETT — Epithelioid Trophoblastic Tumor)</strong>.</li>
</ol>

<h3>Epidemiologia e Fatores de Risco Estabelecidos</h3>
<p>A incidência da mola hidatiforme apresenta marcantes variações geográficas e demográficas globais:</p>
<ul>
  <li><strong>Incidência Geográfica:</strong> Na América do Norte e Europa, ocorre em cerca de 1 a cada 1.000 a 1.500 gestações. Em regiões do Sudeste Asiático, América Latina e partes da África, a prevalência atinge patamares substancialmente mais elevados, variando de 1 em 400 a 1 em cada 120 gestações. No Brasil, estima-se uma frequência média de 1 a 2 casos para cada 1.000 partos;</li>
  <li><strong>Extremos de Idade Materna (O Principal Fator de Risco):</strong>
    <ul>
      <li>Mulheres com <strong>idade &lt; 16-20 anos</strong> apresentam discreta elevação do risco relativo (1,5 a 2 vezes);</li>
      <li>Mulheres com <strong>idade &gt; 35 anos</strong> têm risco multiplicado por 2 a 5 vezes;</li>
      <li>Mulheres com <strong>idade &ge; 40-45 anos</strong> experimentam um risco relativo astronômico, chegando a ser <strong>10 a 20 vezes superior</strong> ao de mulheres no pico da idade reprodutiva. A fertilização de óvulos envelhecidos com erros meióticos ou desprovidos de núcleo viável explica a correlação biológica direta;</li>
    </ul>
  </li>
  <li><strong>História Prévia de Mola Hidatiforme:</strong> Paciente com um antecedente de mola apresenta risco de recorrência na gestação subsequente de aproximadamente <strong>1% a 2%</strong> (risco 10 a 20 vezes maior que a população basal). Caso apresente dois episódios molares prévios, o risco de um terceiro episódio ultrapassa <strong>15% a 25%</strong>;</li>
  <li><strong>Fatores Nutricionais:</strong> Dietas deficientes em caroteno (vitamina A) e gorduras animais têm sido epidemiologicamente correlacionadas a maior risco específico de Mola Completa.</li>
</ul>
`
    },
    {
      id: 'genetica-histopatologia-mola-completa-parcial',
      title: '2. Bases Genéticas, Fisiopatologia e Imuno-Histoquímica: Mola Completa vs Parcial',
      body_html: `
<h3>Citogenética e Mecanismos Moleculares de Fertilização</h3>
<p>A diferenciação entre Mola Completa e Parcial baseia-se na constituição cromossômica e na origem parental dos genomas, determinando características histopatológicas e potenciais biológicos de malignização absolutamente distintos:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Característica Diferencial</th>
      <th>Mola Hidatiforme Completa (MHC)</th>
      <th>Mola Hidatiforme Parcial (MHP)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Cariótipo e Ploidia</strong></td>
      <td><strong>Diploide (46 cromossomos)</strong> em mais de 90% a 95% dos casos.<br>• 46,XX (90%): fecundação de óvulo "vazio" por 1 espermatozoide haploide (23,X) que duplica seu DNA;<br>• 46,XY (10%): fecundação de óvulo "vazio" por 2 espermatozoides (dispermia).</td>
      <td><strong>Triploide (69 cromossomos)</strong> em &gt; 99% dos casos.<br>• 69,XXY (70%), 69,XXX (27%) ou 69,XYY (3%): fertilização de 1 óvulo haploide normal materno (23,X) por <strong>2 espermatozoides paternos (dispermia)</strong> ou por 1 espermatozoide diploide não reduzido.</td>
    </tr>
    <tr>
      <td><strong>Origem do Genoma Nuclear</strong></td>
      <td><strong>100% de Origem Paterna (Androgenética pura).</strong> Não há contribuição cromossômica nuclear materna viável (o genoma materno é inativado ou expulso na meiose anômala).</td>
      <td><strong>Diândrica-Monogínica:</strong> 2 conjuntos cromossômicos paternos e 1 conjunto cromossômico materno.</td>
    </tr>
    <tr>
      <td><strong>Tecido Fetal ou Embrionário</strong></td>
      <td><strong>Completamente AUSENTE.</strong> Não há formação de embrião, vesícula vitelínica, cordão umbilical ou hemácias fetais nucleadas.</td>
      <td><strong>Frequentemente PRESENTE.</strong> Pode haver embrião/feto (quase sempre malformado, não viável, com estigmas de triploidia como sindactilia e restrição de crescimento grave), âmnio e hemácias fetais nucleadas nas vilosidades.</td>
    </tr>
    <tr>
      <td><strong>Hidropisia e Edema Vilositário</strong></td>
      <td><strong>Difuso e Generalizado.</strong> Todas as vilosidades mostram-se macroscopicamente distendidas, formando vesículas translúcidas ("em cacho de uvas"), com cisternas centrais e ausência de vasos funcionais.</td>
      <td><strong>Focal e Irregular.</strong> Coexistem vilosidades normais com outras apresentando edema hidrópico e contornos entalhados (vilosidades "em vieira" ou serrilhadas) com inclusões trofoblásticas estromais.</td>
    </tr>
    <tr>
      <td><strong>Proliferação Trofoblástica</strong></td>
      <td><strong>Difusa, Exuberante e Circunferencial</strong> acometendo sinciciotrofoblasto e citotrofoblasto com acentuada atipia nuclear.</td>
      <td><strong>Focal, Discreta a Moderada</strong>, limitada preferencialmente ao sinciciotrofoblasto.</td>
    </tr>
    <tr>
      <td><strong>Marcador Imuno-Histoquímico p57 (CDKN1C)</strong></td>
      <td><strong>NEGATIVO (Ausência de Expressão no Estroma Vilositário e Citotrofoblasto).</strong> O gene <em>CDKN1C</em> sofre <em>imprinting</em> genômico e é expresso exclusivamente a partir do alelo materno. Como a MHC não possui genoma materno, não há produção de p57.</td>
      <td><strong>POSITIVO (Expressão Preservada).</strong> Devido à presença do conjunto cromossômico materno haploide, há marcação nuclear positiva intensa para p57 nos núcleos das células do estroma e do citotrofoblasto.</td>
    </tr>
    <tr>
      <td><strong>Níveis Séricos Típicos de &beta;-hCG</strong></td>
      <td>Excessivamente elevados, frequentemente <strong>&gt; 100.000 mUI/mL</strong> no momento do diagnóstico.</td>
      <td>Níveis normais para a idade gestacional ou discretamente elevados (habitualmente &lt; 50.000-100.000 mUI/mL).</td>
    </tr>
    <tr>
      <td><strong>Risco de Evolução para NTG Maligna</strong></td>
      <td><strong>15% a 20%</strong> evoluem para Neoplasia Trofoblástica Gestacional (Mola Invasora ou Coriocarcinoma).</td>
      <td><strong>Apenas 1% a 5%</strong> evoluem para NTG (potencial maligno consideravelmente menor).</td>
    </tr>
  </tbody>
</table>
`
    },
    {
      id: 'manifestacoes-clinicas-sindromes-associadas',
      title: '3. Quadro Clínico Clássico, Sintomas Atípicos e Síndromes Endócrino-Metabólicas',
      body_html: `
<h3>Manifestações Clínicas Clássicas da Mola Hidatiforme</h3>
<p>O quadro clínico clássico exuberante é tipicamente observado nas pacientes com Mola Hidatiforme Completa no final do primeiro trimestre ou início do segundo trimestre. Em centros com acesso precoce à ultrassonografia, muitas pacientes são diagnosticadas precocemente de forma assintomática ou apenas com sangramento vaginal discreto.</p>
<ol>
  <li><strong>Sangramento Genital Anormal (90% a 95% dos casos):</strong> É a manifestação clínica mais constante. Caracteriza-se por perda hemática indolor ou acompanhada de cólicas hipogástricas discretas, intermitente ou contínua, de coloração escura amarronzada (em "borra de café") ou avermelhada (aspecto em "geleia de framboesa"). Ocorre pela separação do tecido molar da decídua com acúmulo de sangue retrovesicular oxigenado e oxidado;</li>
  <li><strong>Eliminação Vaginal de Vesículas Hidrópicas (Patognomônica):</strong> A paciente relata a exteriorização de pequenas vesículas translúcidas, brilhantes, semelhantes a "bagas de uva", "ovos de sapo" ou "sagu". Ocorre em menos de 10% a 15% das pacientes nas fases precoces, mas sela o diagnóstico clínico definitivo de mola hidatiforme;</li>
  <li><strong>Desproporção Entre o Tamanho Uterino e a Idade Gestacional:</strong> Em cerca de 50% dos casos de Mola Completa, a altura do fundo uterino ao exame físico é <strong>significativamente maior que a esperada para a idade gestacional</strong> cronológica (por exemplo, útero ao nível da cicatriz umbilical com apenas 10 ou 11 semanas de atraso). O útero apresenta consistência amolecida, elástica e textura "pastosa" (útero em esponja). Nos casos de Mola Parcial, o útero costuma ser compatível ou até menor que a idade gestacional.</li>
</ol>

<h3>Síndromes Clínicas Específicas Induzidas pela Hipersecreção de &beta;-hCG</h3>
<table class="book-table">
  <thead>
    <tr>
      <th>Síndrome Clínica</th>
      <th>Fisiopatologia Molecular</th>
      <th>Apresentação Clínica e Conduta Específica</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Hiperêmese Gravídica Incoercível</strong></td>
      <td>A concentração astronômica de &beta;-hCG sérico estimula de forma supramáxima os receptores quimiorreceptores do centro do vômito no tronco encefálico e os receptores de TSH.</td>
      <td>Náuseas incoercíveis, vômitos profusos contínuos, perda ponderal (&gt; 5% do peso corporal), desidratação grave, cetonúria e distúrbios hidroeletrolíticos (hipocalemia, hiponatremia e alcalose metabólica hipoclorêmica). Requer hidratação parenteral vigorosa, antieméticos escalonados e reposição de tiamina (vitamina B1) antes da glicose para prevenir Encefalopatia de Wernicke.</td>
    </tr>
    <tr>
      <td><strong>Pré-Eclâmpsia Precoce (&lt; 20 Semanas)</strong></td>
      <td>Hipertrofia trofoblástica aberrante com liberação maciça de fatores antiangiogênicos circulantes (sFlt-1 e Endoglina solúvel), provocando disfunção endotelial sistêmica e vasoespasmo capilar generalizado antes da 20ª semana de gestação.</td>
      <td><strong>Achado patognomônico de DTG no primeiro trimestre!</strong> Hipertensão arterial severa (&ge; 140/90 mmHg) associada a proteinúria significativa e edema antes de 20 semanas de gestação é sinônimo de Mola Hidatiforme Completa até prova em contrário. O tratamento definitivo consiste no esvaziamento uterino imediato.</td>
    </tr>
    <tr>
      <td><strong>Cistos Tecaluteínicos Ovarianos Bilaterais</strong></td>
      <td>A subunidade beta do hCG possui homologia estrutural com o hormônio luteinizante (LH). Em concentrações superiores a 100.000 mUI/mL, o &beta;-hCG hiperestimula a camada tecal dos folículos ovarianos bilaterais.</td>
      <td>Grandes cistos ovarianos multiloculados, de paredes finas e conteúdo sero-hemorrágico, frequentemente bilaterais, atingindo diâmetros superiores a 6 a 10 cm (palpáveis ao exame bimanual ou abaulando fossas ilíacas). <strong>Conduta estritamente CONSERVADORA:</strong> regridem espontaneamente em 2 a 4 meses após a evacuação molar quando o &beta;-hCG cai. A punção ou ressecção cirúrgica é proscrita, salvo se ocorrer complicação aguda comprovada como torção anexial ou rotura com hemoperitônio.</td>
    </tr>
    <tr>
      <td><strong>Hipertireoidismo Gestacional por Mimetismo Molecular</strong></td>
      <td>A subunidade alfa do hCG é 100% idêntica à subunidade alfa do TSH, LH e FSH. Em níveis &gt; 100.000 a 200.000 mUI/mL, a ligação do hCG nos receptores tirotróficos da tireoide (TSH-R) ativa a adenilciclase e estimula a síntese autônoma de T3 e T4.</td>
      <td>Taquicardia sinusal persistente de repouso, sudorese cutânea profusa, tremores finos de extremidades, pele quente e úmida, intolerância ao calor e níveis de T4 livre elevados com TSH indetectável (&lt; 0,01 &mu;UI/mL). Risco iminente de <strong>tempestade tireotóxica</strong> durante a anestesia do esvaziamento. Requer preparo pré-operatório imediato com betabloqueadores (propranolol) e antitireoidianos (propiltiouracil) se houver sintomas cardiovasculares exuberantes.</td>
    </tr>
    <tr>
      <td><strong>Insuficiência Respiratória Aguda por Embolização Trofoblástica</strong></td>
      <td>Células e vilosidades trofoblásticas penetram nos seios venosos uterinos lacerados e embolizam para o leito microvascular pulmonar, associadas ao efeito de sobrecarga volêmica.</td>
      <td>Dispneia súbita, taquipneia, hipoxemia arterial, tosse e infiltrado alveolar difuso na radiografia de tórax durante ou logo após a manipulação ou evacuação de úteros excessivamente volumosos (&gt; 16 semanas). Requer suporte de oxigenoterapia, ventilação mecânica se necessário e diuréticos.</td>
    </tr>
  </tbody>
</table>
`
    },
    {
      id: 'diagnostico-diferencial-complexo-gemelar',
      title: '4. Diagnósticos Diferenciais Complexos e Gestação Gemelar Molar com Feto Normal Coexistente',
      body_html: `
<h3>Diagnóstico Diferencial Clínico e Histopatológico</h3>
<p>O diagnóstico diferencial da Doença Trofoblástica Gestacional envolve tanto entidades gineco-obstétricas do primeiro trimestre quanto anomalias cromossômicas e afecções neoplásicas:</p>
<ol>
  <li><strong>Abortamento Espontâneo Hidrópico Não Molar:</strong>
    <p>Ocorre em perdas gestacionais retidas em que as vilosidades coriônicas sofrem edema e degeneração hidrópica secundária pós-morte embrionária. Ao contrário da mola, <em>não há proliferação trofoblástica verdadeira e a imuno-histoquímica para p57 é positiva</em>. O cariótipo costuma ser diploide normal ou apresentar trissomias autossômicas não molares (trissomia do 16, 21, etc.). A dosagem sérica de &beta;-hCG é baixa ou francamente decrescente, não exigindo vigilância oncológica pós-evacuação;</p>
  </li>
  <li><strong>Displasia Mesenquimal Placentária:</strong>
    <p>Rara anomalia vascular da placenta caracterizada por aumento placentário marcante com vesículas semelhantes a mola e dilatação aneurismática dos vasos coriônicos, porém com cariótipo fetal e placentário diploide normal e <em>níveis séricos de &beta;-hCG normais</em>, associada frequentemente à síndrome de Beckwith-Wiedemann;</p>
  </li>
  <li><strong>Gravidez Ectópica ou Doença de Von Recklinghausen com Envolvimento Pélvico:</strong> Excluem-se pela ultrassonografia e cinética hormonal.</li>
</ol>

<h3>O Dilema Perinatal: Gestação Gemelar com Mola Completa e Feto Sadio Coexistente</h3>
<p>Trata-se de uma entidade rara com incidência estimada em <strong>1 para cada 20.000 a 100.000 gestações</strong>, cuja frequência tem se elevado proporcionalmente ao uso de técnicas de reprodução assistida (indução de ovulação e transferência de múltiplos embriões). Ocorre a fecundação simultânea de dois óvulos distintos (gestação gemelar dizigótica, dicoriônica e diamniótica):</p>
<ul>
  <li>Um concepto desenvolve-se como um <strong>feto estruturalmente normal</strong> derivado de uma placenta tópica normal (cariótipo diploide bifilial 46,XX ou 46,XY);</li>
  <li>O segundo concepto desenvolve-se como uma <strong>Mola Hidatiforme Completa pura</strong> (cariótipo diploide androgenético 46,XX ou 46,XY).</li>
</ul>

<p><strong>Desafios Clínicos e Decisão Perinatal Compartilhada:</strong></p>
<table class="book-table">
  <thead>
    <tr>
      <th>Parâmetro de Avaliação</th>
      <th>Riscos Maternos Potenciais</th>
      <th>Chance de Sucesso Fetal e Conduta Recomendada</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Gemelar com Mola Completa + Feto Normal</strong></td>
      <td>• Risco elevado de <strong>pré-eclâmpsia precoce grave (&gt; 30% a 50%)</strong>;<br>• Risco de hemorragia vaginal de grande volume com anemia materna;<br>• Risco de hipertiroidismo tireotóxico e cistos ovarianos gigantes;<br>• O risco relativo de evolução para Neoplasia Trofoblástica Gestacional (NTG) pós-parto é de cerca de <strong>15% a 20%</strong> (idêntico ao de uma mola completa isolada; a manutenção da gestação não eleva a taxa intrínseca de NTG).</td>
      <td>• Se o cariótipo fetal por amniocentese for normal e a ultrassonografia morfológica não demonstrar malformações estruturais grosseiras, a gestação <strong>PODE SER MANTIDA sob vigilância estrita em centro terciário</strong> caso seja o desejo expresso dos pais;<br>• A taxa de nascidos vivos viáveis a termo situa-se em torno de <strong>35% a 45%</strong>;<br>• <strong>Indicação de Interrupção Imediata:</strong> Surgimento de pré-eclâmpsia grave refratária, hemorragia genital com instabilidade materna, insuficiência respiratória ou sofrimento fetal agudo.</td>
    </tr>
  </tbody>
</table>
`
    },
    {
      id: 'diagnostico-ultrassonografico-laboratorial',
      title: '5. Diagnóstico Ultrassonográfico e Avaliação Laboratorial Pré-Operatória',
      body_html: `
<h3>Padrões Ultrassonográficos Patognomônicos</h3>
<p>A ultrassonografia pélvica e transvaginal é o exame de escolha para a suspeição e confirmação diagnóstica da doença trofoblástica gestacional, apresentando acurácia diagnóstica superior a 90% na mola completa:</p>
<ul>
  <li><strong>Mola Hidatiforme Completa:</strong>
    <ul>
      <li>Ausência total de saco gestacional verdadeiro, vesícula vitelínica ou embrião/feto intrauterino;</li>
      <li>Cavidade uterina difusamente preenchida por massa heterogênea ecogênica contendo inúmeras pequenas áreas anecoicas císticas circulares (vesículas hidrópicas de 2 a 10 mm de diâmetro), classicamente descrita como imagem em <strong>"tempestade de neve" (snowstorm)</strong>, aspecto em <strong>"flocos de neve"</strong> ou <strong>"favo de mel"</strong>;</li>
      <li>Presença de fluxo de baixa resistência e alta vascularização ao Doppler colorido no miométrio adjacente;</li>
      <li>Visualização de <strong>cistos tecaluteínicos bilaterais</strong> multiloculados no inventário anexial ovariano em 30% a 50% dos casos.</li>
    </ul>
  </li>
  <li><strong>Mola Hidatiforme Parcial:</strong>
    <ul>
      <li>Presença de saco gestacional intrauterino com feto ou concepto (frequentemente demonstrando anomalias estruturais grosseiras ou óbito embrionário precoce);</li>
      <li>Placenta anormalmente espessada com áreas focais de ecogenicidade vesicular cística ("queijo suíço");</li>
      <li>Relação diâmetro transverso/anteroposterior do saco gestacional aumentada (saco gestacional achatado).</li>
    </ul>
  </li>
</ul>

<h3>Propêutica Laboratorial Pré-Operatória Mandatória</h3>
<p>Antes de encaminhar a paciente para o esvaziamento uterino, é imprescindível solicitar uma bateria de exames laboratoriais e radiológicos para quantificar a repercussão sistêmica da moléstia e garantir a segurança anestésico-cirúrgica:</p>
<ol>
  <li><strong>&beta;-hCG Quantitativo Sérico Basal:</strong> Dosagem precisa com diluição sérica para evitar o "efeito gancho" (hook effect), permitindo mensurar valores acima de 100.000 a 1.000.000 mUI/mL;</li>
  <li><strong>Hemograma Completo com Contagem de Plaquetas:</strong> Avaliar gravidade da anemia secundária ao sangramento vaginal crônico e rastrear plaquetopenia;</li>
  <li><strong>Tipagem Sanguínea e Fator Rh(D):</strong> Indispensável para programar reserva de concentrado de hemácias e indicar imunoprofilaxia com Imunoglobulina Anti-D em mulheres RhD negativo não sensibilizadas;</li>
  <li><strong>Coagulograma Completo (TP, TTPa e Fibrinogênio):</strong> Rastrear coagulopatias de consumo e hipofibrinogenemia decorrentes da liberação de tromboplastina trofoblástica;</li>
  <li><strong>Função Renal e Hepática (Creatinina, Ureia, AST, ALT, Bilirrubinas):</strong> Avaliar dano de órgãos-alvo por pré-eclâmpsia precoce e estabelecer valores basais antes de eventual quimioterapia;</li>
  <li><strong>Função Tireoidiana (TSH e T4 Livre):</strong> Rastrear hipertireoidismo por mimetismo molecular em pacientes taquicárdicas;</li>
  <li><strong>Radiografia de Tórax em PA e Perfil:</strong> Exame basal fundamental para excluir a presença de <em>êmbolos trofoblásticos</em> ou <em>metástases pulmonares macronodulares</em> no momento da admissão.</li>
</ol>
`
    },
    {
      id: 'tratamento-esvaziamento-uterino-padrao-ouro',
      title: '6. Tratamento Primário: Vácuo-Aspiração Uterina e a Proibição de Ocitocina Prévia',
      body_html: `
<h3>Técnica de Escolha: Vácuo-Aspiração Elétrica (V-A) ou AMIU</h3>
<p>O <strong>esvaziamento uterino por aspiração a vácuo (aspiração por sucção elétrica ou aspiração manual intrauterina — AMIU)</strong> é a conduta terapêutica de escolha padrão-ouro mundial para qualquer caso de mola hidatiforme, independentemente do volume uterino.</p>
<p><strong>Justificativas Clínicas e Vantagens da Vácuo-Aspiração:</strong></p>
<ul>
  <li>A aspiração com cânulas plásticas calibrosas (nº 10 a 14) permite a evacuação rápida e completa de grandes volumes de tecido vesicular amolecido;</li>
  <li>Reduz dramaticamente a taxa de perfuração uterina mecânica em comparação com a curetagem metálica cortante tradicional, haja vista que a parede miometrial em úteros molares encontra-se extremamente delgada, amolecida e suscetível a roturas iatrogênicas;</li>
  <li>A curetagem cortante instrumental convencional com cureta metálica <strong>é formalmente desaconselhada como procedimento primário isolado</strong>. Permite-se apenas uma <em>curetagem delicada e suave das paredes com cureta romba</em> ao término da aspiração exclusivamente para certificar que a cavidade uterina se encontra totalmente vazia.</li>
</ul>

<h3>A Regra de Ouro da Segurança: Proibição Formal de Ocitocina Prévia</h3>
<div style="border-left: 4px solid #d9534f; padding: 10px 15px; margin: 15px 0; background-color: #fdf7f7;">
<h4 style="color: #d9534f; margin-top: 0;">ATENÇÃO MÁXIMA — REGRA CRÍTICA PARA A VIDA E PARA AS PROVAS</h4>
<p><strong>NUNCA, sob hipótese alguma, administrar ocitocina ou misoprostol ANTES de iniciar a aspiração mecânica do conteúdo molar!</strong></p>
<p>A administração prévia de uterotônicos induz contrações miometriais violentas e desorganizadas sobre um útero repleto de tecido trofoblástico friável e seios venosos calibrosos abertos. Esse mecanismo ejeta fragmentos molares viáveis e microêmbolos diretamente para a circulação venosa pélvica e cava, provocando <strong>embolização trofoblástica maciça para o leito pulmonar</strong>, que cursa com colapso respiratório hiperagudo, edema agudo de pulmão não cardiogênico, choque cardiogênico e parada cardiorrespiratória na sala operatória. Além disso, a ocitocina prévia aumenta a disseminação de células trofoblásticas para a circulação sistêmica, elevando a taxa de evolução tardia para Neoplasia Trofoblástica Gestacional metastática.</p>
</div>

<p><strong>O Momento Correto da Ocitocina:</strong></p>
<p>A infusão contínua de ocitocina (20 a 30 UI diluídas em 500 mL de soro glicosado ou fisiológico) só deve ser <strong>iniciada APÓS o início efetivo da aspiração e o esvaziamento da maior parte do tecido molar volumoso</strong>. Nesse momento, a ocitocina atua favoravelmente, induzindo a contração das fibras miometriais e o fechamento mecânico dos seios venosos (ligaduras vivas de Pinard), o que reduz a perda sanguínea transoperatória e torna a parede miometrial mais firme e resistente, minimizando o risco de perfuração instrumental residual.</p>

<h3>Papel da Histerectomia com Mola in Situ</h3>
<p>A histerectomia total abdominal simples com preservação anexial bilateral (mantendo os ovários com seus cistos tecaluteínicos) é uma alternativa terapêutica cirúrgica primária que pode ser discutida individualmente nos seguintes cenários:</p>
<ul>
  <li>Mulheres com <strong>idade &ge; 40 anos</strong>;</li>
  <li><strong>Prole previamente constituída</strong> e desejo formal de esterilização definitiva;</li>
  <li>Presença de hemorragia uterina incoercível com instabilidade hemodinâmica durante a tentativa de aspiração.</li>
</ul>
<p><strong>Dado Estatístico Decisivo:</strong> A histerectomia com mola <em>in situ</em> reduz o risco subsequente de desenvolvimento de NTG de cerca de 20% para <strong>menos de 3% a 5%</strong>. No entanto, ela <strong>NÃO zera o risco de malignização</strong> (células trofoblásticas já podem ter embolizado para o leito pulmonar antes da cirurgia). Portanto, <strong>a paciente histerectomizada DEVE cumprir rigorosamente o mesmo protocolo de seguimento e dosagens séricas de &beta;-hCG pós-molar que as pacientes submetidas à vácuo-aspiração</strong>!</p>
`
    },
    {
      id: 'monitorizacao-pos-molar-bhcg',
      title: '7. Monitorização Pós-Molar do β-hCG: Protocolos FIGO 2025/2026 e FEBRASGO',
      body_html: `
<h3>Racional Biológico do Seguimento Laboratorial</h3>
<p>Após a evacuação cirúrgica completa do tecido molar, células do sinciciotrofoblasto residual no miométrio iniciam um processo de regressão e senescência programada. A meia-vida sérica do &beta;-hCG circulante é de aproximadamente 24 a 36 horas. Espera-se que seus títulos séricos decaiam continuamente de forma logarítmica nas semanas subsequentes até a completa indetectabilidade.</p>

<h3>Cronograma Oficial de Dosagens Séricas de &beta;-hCG</h3>
<p>A diretriz nacional consolidada da FEBRASGO em convergência com os Centros de Referência de DTG do Brasil estabelece o seguinte algoritmo rigoroso de seguimento:</p>
<ol>
  <li><strong>Fase Semanal (Fase de Declínio Inicial):</strong>
    <ul>
      <li>Dosagens séricas quantitativas de &beta;-hCG realizadas a cada <strong>7 a 14 dias (semanalmente)</strong>, iniciando-se 48 horas a 7 dias após o esvaziamento;</li>
      <li>Essa fase semanal é mantida até que se obtenham <strong>TRÊS dosagens semanais consecutivas de &beta;-hCG estritamente NORMAIS (indetectáveis, &lt; 5 mUI/mL)</strong> (denominada <em>remissão clínica e laboratorial</em>);</li>
    </ul>
  </li>
  <li><strong>Fase Mensal (Fase de Consolidação da Remissão):</strong>
    <ul>
      <li><strong>Na Mola Hidatiforme Completa:</strong> Após a obtenção dos 3 valores semanais negativos, o seguimento prossegue com dosagens de &beta;-hCG <strong>MENSAIS durante 6 MESES CONSECUTIVOS</strong>;</li>
      <li><strong>Na Mola Hidatiforme Parcial (Atualização FIGO 2025/2026):</strong> Em virtude do baixíssimo risco biológico de malignização da Mola Parcial após a normalização hormonal (&lt; 0,5%), as diretrizes internacionais da FIGO 2025/2026 e diversos serviços modernos estabelecem que, uma vez obtida a primeira dosagem normal de &beta;-hCG, realiza-se <strong>uma única dosagem confirmatória 1 mês após</strong>. Se confirmada negativa, a paciente recebe alta do seguimento pós-molar, ficando liberada para engravidar. No Brasil, alguns centros ainda mantêm o seguimento mensal por 1 a 3 meses na mola parcial por extrema cautela.</li>
    </ul>
  </li>
</ol>

<h3>Contracepção Durante o Seguimento Pós-Molar</h3>
<p>A instituição de um método contraceptivo seguro e altamente eficaz é <strong>absolutamente mandatória durante todo o período de monitorização pós-molar</strong>:</p>
<ul>
  <li><strong>Por que a gestação é proibida durante o seguimento?</strong> A ocorrência de uma nova gestação resulta na elevação fisiológica exponencial do &beta;-hCG produzido pelo novo concepto, tornando <strong>impossível distinguir laboratorialmente entre uma nova gravidez tópica e a malignização para Neoplasia Trofoblástica Gestacional (NTG)</strong>, o que pode atrasar o diagnóstico de coriocarcinoma ou induzir a administração equivocada de quimioterapia tóxica sobre um feto intrauterino sadio;</li>
  <li><strong>Métodos Contraceptivos de Primeira Linha:</strong>
    <ul>
      <li><strong>Anticoncepcionais Hormonais Combinados Orais</strong> ou <strong>Progestágenos Isolados</strong> (orais, injetáveis intramusculares mensais/trimestrais ou implantes subdérmicos de etonogestrel);</li>
      <li>Ao contrário do mito antigo, estudos científicos comprovaram que os contraceptivos hormonais combinados orais NÃO elevam o risco de evolução para NTG e podem ser iniciados no próprio dia do esvaziamento uterino;</li>
    </ul>
  </li>
  <li><strong>Dispositivo Intrauterino (DIU de Cobre ou de Levonorgestrel):</strong>
    <p>O DIU está <strong>contraindicado na fase inicial pós-esvaziamento</strong> enquanto os títulos de &beta;-hCG permanecerem elevados, em decorrência do risco aumentado de perfuração na parede uterina amolecida e da possibilidade de confusão diagnóstica entre sangramentos de adaptação endometrial do DIU e sangramentos por invasão miometrial da mola invasora. O DIU pode ser inserido com segurança apenas após a documentação da normalização do &beta;-hCG sérico.</p>
  </li>
</ul>
`
    },
    {
      id: 'criterios-figo-2026-ntg',
      title: '8. Critérios Diagnósticos de Malignização da FIGO 2026 para NTG',
      body_html: `
<h3>Quando a Curva Hormonal Transforma-se em Neoplasia</h3>
<p>A Neoplasia Trofoblástica Gestacional (NTG) pós-molar não requer necessariamente confirmação histopatológica por biópsia tecidual para que o tratamento quimioterápico seja iniciado. Na esmagadora maioria dos casos, o diagnóstico é puramente <strong>bioquímico e evolutivo</strong>, estabelecido pela análise do comportamento cinético da curva sérica de &beta;-hCG.</p>

<h3>Critérios Formais da FIGO (Federação Internacional de Ginecologia e Obstetrícia) — Revisão 2026</h3>
<p>O diagnóstico de Neoplasia Trofoblástica Gestacional pós-molar é formalmente firmado quando <strong>PELO MENOS UM</strong> dos seguintes critérios for preenchido:</p>
<ol>
  <li><strong>Platô do &beta;-hCG Sérico:</strong>
    <p>Caracterizado pela estabilização dos níveis séricos de &beta;-hCG com variação inferior a 10% (para mais ou para menos) documentada em <strong>4 dosagens semanais consecutivas ao longo de pelo menos 3 semanas (Dias 1, 7, 14 e 21)</strong>;</p>
  </li>
  <li><strong>Ascensão (Elevação) do &beta;-hCG Sérico:</strong>
    <p>Caracterizada por um aumento superior a 10% nos títulos de &beta;-hCG documentado em <strong>3 dosagens semanais consecutivas ao longo de pelo menos 2 semanas (Dias 1, 7 e 14)</strong>;</p>
  </li>
  <li><strong>Diagnóstico Histopatológico de Malignidade:</strong>
    <p>Laudo anatomopatológico demonstrando a presença de <strong>Coriocarcinoma Gestacional</strong>, <strong>Tumor Trofoblástico do Sítio Placentário (PSTT)</strong> ou <strong>Tumor Trofoblástico Epitelioide (ETT)</strong> em material obtido por biópsia ou histerectomia;</p>
  </li>
  <li><strong>Presença de Metástases à Distância:</strong>
    <p>Detecção de lesões metastáticas comprovadas (pulmonares, vaginais, hepáticas, cerebrais ou gastrointestinais) associadas a níveis séricos elevados de &beta;-hCG;</p>
  </li>
  <li><strong>Persistência de &beta;-hCG Elevado por Tempo Prolongado:</strong>
    <p>Níveis séricos de &beta;-hCG persistentemente detectáveis por <strong>6 meses ou mais pós-esvaziamento</strong> (embora a revisão FIGO 2026 tenha focado na curva precoce das primeiras semanas para evitar atrasos terapêuticos desnecessários, o critério dos 6 meses permanece amplamente aceito na diretriz da FEBRASGO).</p>
  </li>
</ol>

<p><strong>Cuidado com Falsos Positivos e Armadilhas Diagnósticas:</strong></p>
<ul>
  <li><strong>Nova Gestação Intrauterina Tópica:</strong> Sempre descartar nova gravidez solicitando ultrassonografia pélvica antes de iniciar quimioterapia se a curva voltar a subir;</li>
  <li><strong>"hCG Fantasma" (Phantom hCG):</strong> Ocorre em pacientes assintomáticas com níveis persistentemente baixos e fixos de &beta;-hCG sérico (habitualmente entre 20 e 150 mUI/mL) decorrentes de interferência analítica de anticorpos heterófilos humanos contra o anticorpo animal do imunoensaio. Diferenciação: o hCG fantasma <strong>NÃO é excretado na urina</strong> (teste de &beta;-hCG urinário é negativo) e seus títulos séricos não mudam após diluição seriada. O hCG fantasma não é neoplasia e não deve receber quimioterapia!</li>
</ul>
`
    },
    {
      id: 'estadiamento-anatomico-escore-figo-oms',
      title: '9. Estadiamento Anatômico e Escore Prognóstico de Risco FIGO/OMS (2026)',
      body_html: `
<h3>Estadiamento Anatômico da FIGO para NTG</h3>
<p>Uma vez diagnosticada a NTG, a paciente deve ser submetida a estadiamento anatômico para determinar a extensão topográfica da disseminação tumoral:</p>
<table class="book-table">
  <thead>
    <tr>
      <th>Estádio Anatômico</th>
      <th>Definição Topográfica da Extensão Tumoral</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Estádio I</strong></td>
      <td>Neoplasia trofoblástica estritamente confinada ao <strong>corpo uterino</strong> e colo.</td>
    </tr>
    <tr>
      <td><strong>Estádio II</strong></td>
      <td>O tumor estende-se para fora do útero, mas encontra-se limitado às <strong>estruturas genitais</strong> (anexos uterinos, ovários, tubas, ligamento largo ou vagina).</td>
    </tr>
    <tr>
      <td><strong>Estádio III</strong></td>
      <td>Presença de <strong>metástases pulmonares</strong>, com ou sem envolvimento do trato genital.</td>
    </tr>
    <tr>
      <td><strong>Estádio IV</strong></td>
      <td>Presença de <strong>qualquer outro sítio metastático à distância</strong> (cérebro, fígado, rins, trato gastrointestinal, baço) ou metástases linfonodais distantes.</td>
    </tr>
  </tbody>
</table>

<h3>Sistema de Escore Prognóstico de Risco FIGO/OMS (Revisão 2026)</h3>
<p>O sistema de escore prognóstico modificado da OMS adotado pela FIGO pontua múltiplos fatores biológicos independentes para prever a probabilidade de resistência tumoral à quimioterapia com agente único (monoterapia):</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Fator de Escore Prognóstico</th>
      <th>0 Pontos</th>
      <th>1 Ponto</th>
      <th>2 Pontos</th>
      <th>4 Pontos</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Idade Materna (anos)</strong></td>
      <td>&lt; 40 anos</td>
      <td>&ge; 40 anos</td>
      <td>—</td>
      <td>—</td>
    </tr>
    <tr>
      <td><strong>Gravidez Antecedente</strong></td>
      <td>Mola Hidatiforme</td>
      <td>Abortamento</td>
      <td>Gestação a Termo</td>
      <td>—</td>
    </tr>
    <tr>
      <td><strong>Intervalo da Gravidez Antecedente (meses)</strong></td>
      <td>&lt; 4 meses</td>
      <td>4 a 6 meses</td>
      <td>7 a 12 meses</td>
      <td>&gt; 12 meses</td>
    </tr>
    <tr>
      <td><strong>&beta;-hCG Pré-Tratamento (mUI/mL)</strong></td>
      <td>&lt; 10³ (&lt; 1.000)</td>
      <td>10³ a 10⁴ (1.000 a 10.000)</td>
      <td>&gt; 10⁴ a 10⁵ (10.000 a 100.000)</td>
      <td>&gt; 10⁵ (&gt; 100.000)</td>
    </tr>
    <tr>
      <td><strong>Maior Diâmetro Tumoral (incluindo o útero)</strong></td>
      <td>&lt; 3 cm</td>
      <td>3 a 4 cm</td>
      <td>&ge; 5 cm</td>
      <td>—</td>
    </tr>
    <tr>
      <td><strong>Sítio das Metástases</strong></td>
      <td>Pulmão</td>
      <td>Baço, Rim</td>
      <td>Trato Gastrointestinal</td>
      <td>Fígado, Cérebro</td>
    </tr>
    <tr>
      <td><strong>Número Total de Metástases Identificadas</strong></td>
      <td>Nenhuma</td>
      <td>1 a 4 metástases</td>
      <td>5 a 8 metástases</td>
      <td>&gt; 8 metástases</td>
    </tr>
  </tbody>
</table>

<p><strong>Classificação e Estratificação de Risco Clínico Terapêutico:</strong></p>
<ul>
  <li><strong>Baixo Risco (Escore Total &le; 6 pontos):</strong>
    <p>Pacientes com tumores de excelente prognóstico que apresentam taxas de cura próximas a <strong>98% a 100%</strong> quando tratadas com <em>quimioterapia em agente único (monoterapia)</em>;</p>
  </li>
  <li><strong>Alto Risco (Escore Total &ge; 7 a 12 pontos):</strong>
    <p>Pacientes com alto risco biológico de resistência secundária à monoterapia, exigindo <strong>poliquimioterapia intensiva de combinação (múltiplas drogas)</strong> como tratamento primário imediato em centros oncológicos terciários;</p>
  </li>
  <li><strong>Ultra-Alto Risco (Escore Total &ge; 13 pontos ou Metástases Cerebrais/Hepáticas Extensas):</strong>
    <p>Categoria individualizada na FIGO 2026. Apresenta risco gravíssimo de morte precoce nas primeiras semanas pós-quimioterapia decorrente de hemorragias catastróficas por lise tumoral maciça. Exige regimes de <strong>indução suave escalonada</strong> antes da quimioterapia plena.</p>
  </li>
</ul>
`
    },
    {
      id: 'tratamento-ntg-monoterapia-poliquimioterapia',
      title: '10. Tratamento Farmacológico da NTG: Monoterapia, Poliquimioterapia e Manejo Cirúrgico',
      body_html: `
<h3>Tratamento da NTG de Baixo Risco (Escore &le; 6 Pontos)</h3>
<p>O tratamento de escolha é a <strong>quimioterapia com agente único (monoterapia)</strong>, sendo os dois agentes mais eficazes e consolidados no mundo:</p>
<ol>
  <li><strong>Protocolo com Metotrexato (MTX) e Resgate com Ácido Folínico (Protocolo Bagshawe / Charing Cross — Padrão-Ouro):</strong>
    <ul>
      <li><strong>Metotrexato 1,0 mg/kg IM</strong> (ou 50 mg fixo) nos Dias 1, 3, 5 e 7; alternado com:</li>
      <li><strong>Ácido Folínico (Leucovorina) 0,1 mg/kg IM ou VO</strong> nos Dias 2, 4, 6 e 8 (administrado 24 a 30 horas após a dose de MTX);</li>
      <li>Ciclos repetidos a cada 14 dias (duas semanas de intervalo);</li>
      <li>Vantagem: Menor toxicidade medular, preservação capilar e índice de cura primária &gt; 85% a 90%;</li>
    </ul>
  </li>
  <li><strong>Protocolo com Actinomicina D (Dactinomicina):</strong>
    <ul>
      <li>Utilizado como alternativa primária ou como terapia de resgate de segunda linha nos casos de resistência bioquímica ou toxicidade hepática/renal ao MTX;</li>
      <li>Esquema em pulsoterapia quinzenal (1,25 mg/m² EV em bolus a cada 14 dias) ou esquema fracionado de 5 dias (0,5 mg EV/dia por 5 dias a cada 14 dias). Taxa de cura global como resgate &gt; 95%.</li>
    </ul>
  </li>
</ol>
<p><strong>Critério de Consolidação da Cura:</strong> A quimioterapia na NTG de baixo risco não cessa na primeira dosagem negativa. Deve-se administrar <strong>de 2 a 3 ciclos de quimioterapia de consolidação</strong> após o &beta;-hCG atingir níveis estritamente normais (&lt; 5 mUI/mL) para erradicar clones microscópicos residuais.</p>

<h3>Tratamento da NTG de Alto Risco (Escore &ge; 7 Pontos e Estádio IV)</h3>
<p>Pacientes com escore alto (&ge; 7) ou qualquer paciente no Estádio IV têm indicação absoluta de <strong>poliquimioterapia combinada de alta intensidade</strong>. O regime padrão-ouro adotado internacionalmente é o esquema <strong>EMA-CO</strong>:</p>
<ul>
  <li><strong>Curso 1 (EMA) — Dias 1 e 2:</strong>
    <ul>
      <li><strong>Etoposídeo (VP-16):</strong> 100 mg/m² EV em infusão de 30 minutos;</li>
      <li><strong>Metotrexato (MTX):</strong> 100 mg/m² EV em bolus, seguido de 200 mg/m² em infusão venosa contínua de 12 horas no D1;</li>
      <li><strong>Actinomicina D:</strong> 0,5 mg EV em bolus no D1 e D2;</li>
      <li><strong>Ácido Folínico (Leucovorina):</strong> 15 mg IM ou VO a cada 12 horas por 4 doses, iniciando 24 horas após o início do MTX.</li>
    </ul>
  </li>
  <li><strong>Curso 2 (CO) — Dia 8:</strong>
    <ul>
      <li><strong>Ciclofosfamida:</strong> 600 mg/m² EV em infusão;</li>
      <li><strong>Oncovin (Vincristina):</strong> 1,0 mg/m² EV em bolus (dose máxima de 2,0 mg).</li>
    </ul>
  </li>
  <li>O ciclo se repete a cada 14 dias (D15 passa a ser o novo D1 do próximo ciclo), desde que haja recuperação hematológica.</li>
  <li><strong>Consolidação no Alto Risco:</strong> Exige <strong>de 3 a 4 ciclos adicionais de consolidação</strong> após a normalização do &beta;-hCG sérico. A taxa global de sobrevida a longo prazo ultrapassa 85% a 90% mesmo em doença metastática volumosa quando tratada em centros terciários experientes.</li>
</ul>

<h3>Entidades Histopatológicas Especiais: PSTT e ETT (Manejo Cirúrgico Primário)</h3>
<p>O <strong>Tumor Trofoblástico do Sítio Placentário (PSTT)</strong> e o <strong>Tumor Trofoblástico Epitelioide (ETT)</strong> são neoplasias trofoblásticas raras originadas do trofoblasto intermediário. Apresentam peculiaridades biológicas fundamentais:</p>
<ul>
  <li><strong>Baixa Produção de &beta;-hCG:</strong> Secretam quantidades modestas de &beta;-hCG (frequentemente &lt; 1.000-2.000 mUI/mL) e altas concentrações de lactogênio placentário humano (hPL);</li>
  <li><strong>Resistência Intrínseca à Quimioterapia Convencional:</strong> Ao contrário do coriocarcinoma e da mola invasora, o PSTT e o ETT respondem precariamente aos esquemas à base de MTX ou EMA-CO;</li>
  <li><strong>Tratamento Primário de Escolha:</strong> <strong>Histerectomia total com linfadenectomia pélvica/retroperitoneal</strong>. A ressecção cirúrgica completa precoce da doença confinada ao útero é potencialmente curativa. Em doença avançada ou metastática, utiliza-se poliquimioterapia contendo platina e etoposídeo (esquema EP-EMA).</li>
</ul>
`
    },
    {
      id: 'imunoterapia-metastases-especiais-anti-pd1',
      title: '11. Manejo de Metástases Especiais, Imunoterapia Anti-PD-1 e Quimiorresistência',
      body_html: `
<h3>Abordagem das Metástases Vaginais: Proibição Estrita de Biópsia</h3>
<p>As metástases vaginais ocorrem em cerca de 4% a 5% dos casos de NTG e localizam-se preferencialmente no fórnice anterior ou sob a uretra. Apresentam-se como nódulos vermelho-arroxeados ou azulados, ulcerados ou subepiteliais, extremamente hipervascularizados por angiogênese trofoblástica.</p>
<div style="border-left: 4px solid #d9534f; padding: 10px 15px; margin: 15px 0; background-color: #fdf7f7;">
<h4 style="color: #d9534f; margin-top: 0;">ALERTA CIRÚRGICO CRÍTICO — PROIBIÇÃO DE BIÓPSIA</h4>
<p><strong>NUNCA realizar biópsia de nódulos ou massas vaginais com suspeita de metástase de doença trofoblástica!</strong></p>
<p>O tecido trofoblástico tumoral consiste em lagos vasculares e seios venosos desprovidos de camada muscular elástica verdadeira. A realização de biópsia incisional ou punção na vagina desencadeia <strong>hemorragia exsanguinante incoercível imediata</strong>, de controle cirúrgico extremamente difícil, necessitando frequentemente de tamponamento vaginal rígido de urgência, suturas hemostáticas em massa ou embolização angiográfica de artérias hipogástricas. O diagnóstico de metástase vaginal é clínico e ultrassonográfico, guiado pela ascensão do &beta;-hCG.</p>
</div>

<h3>Manejo das Metástases Cerebrais e Hepáticas: Risco de Herniação e Hemoperitônio</h3>
<ul>
  <li><strong>Metástases Cerebrais (Estádio IV):</strong> Ocorrem quase que exclusivamente no coriocarcinoma. Apresentam elevado risco de hemorragia intracraniana espontânea e hipertensão intracraniana. O manejo envolve quimioterapia intensiva com altas doses de metotrexato (1 g/m² EV com infusão contínua de 24 horas), corticoterapia com Dexametasona em altas doses para redução do edema vasogênico peritumoral e Radioterapia Holocraniana estereotáxica fracionada (30 Gy) ou radiocirurgia (Gamma Knife);</li>
  <li><strong>Metástases Hepáticas:</strong> Frequentemente múltiplas e periféricas. A rotura subcapsular hepática pode precipitar choque hemorrágico agudo na cavidade peritoneal. O tratamento primário é clínico com poliquimioterapia, podendo-se recorrer à <em>embolização transcateter seletiva da artéria hepática</em> em episódios de sangramento ativo.</li>
</ul>

<h3>A Revolução da Imunoterapia: Bloqueio do Checkpoint Imunológico Anti-PD-1 (Pembrolizumab)</h3>
<p>As células do trofoblasto placentário expressam constitutivamente níveis extraordinariamente altos de <strong>PD-L1 (Programmed Death-Ligand 1)</strong>, mecanismo fisiológico essencial utilizado pela placenta para suprimir a resposta citotóxica dos linfócitos T maternos contra os antígenos fetais paternos. Nas neoplasias trofoblásticas malignas (coriocarcinoma e tumores trofoblásticos intermediários), a superexpressão de PD-L1 atinge praticamente 100% das células tumorais.</p>
<p>Em pacientes com NTG avançada que desenvolvem <strong>quimiorresistência multirresistente</strong> aos regimes convencionais de platina e etoposídeo, o uso de anticorpos monoclonais inibidores de PD-1, como o <strong>Pembrolizumab</strong>, tem demonstrado respostas terapêuticas extraordinárias com taxas de remissão completa sustentada superiores a 70% a 80%, consolidando a imunoterapia como o novo marco divisor na oncologia ginecológica para casos refratários.</p>
`
    },
    {
      id: 'aspectos-reprodutivos-casos-clinicos',
      title: '12. Casos Clínicos Estruturados e Raciocínio Diagnóstico na Prática',
      body_html: `
<h3>Caso Clínico 1: Mola Hidatiforme Completa com Complicações Multissistêmicas</h3>
<p><strong>Identificação:</strong> Primigesta de 17 anos é trazida pela mãe ao pronto-socorro obstétrico com história de atraso menstrual de 14 semanas, náuseas e vômitos incoercíveis há 1 mês com perda de 7 kg, associados a sangramento vaginal escuro em "borra de café" há 3 dias. Refere palpitações constantes, sudorese excessiva e cefaleia holocraniana pulsátil iniciada nas últimas 24 horas.</p>
<p><strong>Exame Físico:</strong> Emagrecida, desidratada 2+/4+, fácies de angústia. PA = 165/105 mmHg, FC = 124 bpm (taquicardia sinusal regular), FR = 20 irpm. Exame neurológico: hiperreflexia patelar difusa com clônus esgotável de 2 batimentos. Palpação abdominal: útero de consistência amolecida e pastosa, com <strong>fundo uterino localizado 3 cm acima da cicatriz umbilical (compatível com 24 semanas!)</strong>, indolor, sem contrações rítmicas. Ausculta com sonar Doppler fetal: ausência de batimentos cardíacos fetais em todos os quadrantes. Exame especular: colo entreaberto com saída contínua de secreção sanguinolenta escura contendo <strong>pequenas vesículas arredondadas translúcidas</strong> que se assemelham a cachos de uva.</p>
<p><strong>Investigação Laboratorial e Ultrassonográfica:</strong></p>
<ul>
  <li>&beta;-hCG quantitativo sérico basal: <strong>890.000 mUI/mL</strong>;</li>
  <li>USTV: Cavidade uterina distendida por massa ecogênica heterogênea com incontáveis microcistos anecoicos ("tempestade de neve"), sem saco gestacional ou feto identificável; ovários aumentados bilateralmente exibindo <strong>múltiplos cistos tecaluteínicos</strong> de 8 cm à direita e 9 cm à esquerda;</li>
  <li>Laboratório: TSH &lt; 0,01 &mu;UI/mL; T4 Livre = 3,4 ng/dL (elevado); Fita urinária com proteinúria 3+ (300 mg/dL); Hemoglobina = 8,6 g/dL; Plaquetas = 185.000/mm³; Creatinina = 0,9 mg/dL; Ácido úrico = 6,8 mg/dL; AST = 32 U/L; Radiografia de tórax: ausência de êmbolos ou nódulos pulmonares.</li>
</ul>
<p><strong>Discussão Diagnóstica e Conduta Emergencial:</strong></p>
<p>Trata-se de <strong>Mola Hidatiforme Completa</strong> complicada por uma tétrade de manifestações induzidas pela tempestade de &beta;-hCG: (1) <strong>Pré-eclâmpsia grave precoce antes de 20 semanas</strong>; (2) <strong>Hipertireoidismo clínico com taquicardia por mimetismo tireotrófico</strong>; (3) <strong>Hiperêmese gravídica grave com desnutrição</strong>; e (4) <strong>Cistos tecaluteínicos ovarianos volumosos bilaterais</strong>.</p>
<p><strong>Sequência Terapêutica Adotada:</strong></p>
<ol>
  <li>Estabilização clínica pré-operatória na UTI/sala de estabilização: controle da hipertensão arterial com Hidralazina EV; controle da taquicardia com Propranolol VO; início de Sulfato de Magnésio (protocolo de Zuspan) para profilaxia de eclâmpsia; hidratação vigorosa com reposição prévia de Tiamina e correção eletrolítica;</li>
  <li>Transporte imediato ao centro cirúrgico sob anestesia geral e intubação orotraqueal (evitando bloqueios espinhais devido ao risco de colapso autonômico);</li>
  <li><strong>Vácuo-Aspiração Uterina Elétrica com cânula calibrosa nº 12</strong>;</li>
  <li><strong>Proibição de ocitocina antes da aspiração:</strong> A infusão contínua de ocitocina só foi ligada após o esvaziamento de 80% do volume vesicular para contrair o miométrio e estancar o sangramento venoso;</li>
  <li>Os cistos tecaluteínicos NÃO foram manipulados cirurgicamente;</li>
  <li>Envio de todo o material aspirado para exame anatomopatológico e imuno-histoquímico (p57);</li>
  <li>Pós-operatório: normalização da PA em 48 horas e resolução dos sintomas tireotóxicos; início de seguimento semanal de &beta;-hCG com anticoncepcional oral combinado.</li>
</ol>

<h3>Caso Clínico 2: Neoplasia Trofoblástica Gestacional Pós-Molar de Baixo Risco</h3>
<p><strong>Identificação:</strong> Paciente de 28 anos, G1P0, submetida à vácuo-aspiração por Mola Hidatiforme Completa há 6 semanas. Comparece à consulta ambulatorial assintomática para revisão da curva de &beta;-hCG.</p>
<p><strong>Evolução Laboratorial Pós-Esvaziamento:</strong></p>
<ul>
  <li>Semana 1 pós-esvaziamento: &beta;-hCG = 42.000 mUI/mL;</li>
  <li>Semana 2: &beta;-hCG = 8.500 mUI/mL;</li>
  <li>Semana 3: &beta;-hCG = 1.950 mUI/mL;</li>
  <li>Semana 4 (Dia 1 da curva FIGO): &beta;-hCG = <strong>480 mUI/mL</strong>;</li>
  <li>Semana 5 (Dia 7): &beta;-hCG = <strong>495 mUI/mL</strong>;</li>
  <li>Semana 6 (Dia 14): &beta;-hCG = <strong>510 mUI/mL</strong>;</li>
  <li>Semana 7 (Dia 21): &beta;-hCG = <strong>505 mUI/mL</strong>.</li>
</ul>
<p><strong>Discussão e Conduta:</strong></p>
<p>A paciente documenta <strong>platô nos níveis séricos de &beta;-hCG ao longo de 4 dosagens em 3 semanas</strong> consecutivas (variação &lt; 10% entre 480 e 510 mUI/mL), preenchendo formalmente o critério FIGO de malignização para <strong>Neoplasia Trofoblástica Gestacional (NTG) pós-molar (Mola Invasora provável)</strong>.</p>
<p><strong>Cálculo do Escore Prognóstico FIGO/OMS:</strong></p>
<ul>
  <li>Idade: 28 anos (&lt; 40) = 0 pontos;</li>
  <li>Gravidez antecedente: Mola hidatiforme = 0 pontos;</li>
  <li>Intervalo desde a gravidez: &lt; 4 meses = 0 pontos;</li>
  <li>&beta;-hCG pré-tratamento atual: 505 mUI/mL (&lt; 1.000) = 0 pontos;</li>
  <li>Estadiamento por imagem (USTV pélvica evidenciando nódulo miometrial hipervascular de 1,8 cm; TC de tórax e abdome normais): Maior tumor &lt; 3 cm = 0 pontos; Sítio de metástases: nenhum = 0 pontos; Número de metástases: 0 = 0 pontos.</li>
  <li><strong>Escore Total = 0 pontos (Estádio I:0 — Baixo Risco).</strong></li>
</ul>
<p><strong>Conduta Terapêutica:</strong> A paciente foi tratada com quimioterapia em agente único ambulatorial no protocolo de <strong>Metotrexato com resgate de Ácido Folínico por 8 dias (esquema quinzenal)</strong>. Obteve negativação do &beta;-hCG no 2º ciclo, recebendo 2 ciclos adicionais de consolidação. Permaneceu em remissão completa sustentada.</p>

<h3>Caso Clínico 3: Coriocarcinoma Pós-Parto a Termo com Metástases Pulmonares e Hemoptise</h3>
<p><strong>Identificação:</strong> Mulher de 33 anos, G2P2 (dois partos vaginais anteriores a termo, o último há 9 meses), procura atendimento em emergência clínica referindo tosse seca persistente há 2 meses, com surgimento de episódios diários de escarros hemóicos e hemoptise franca nos últimos 5 dias, associada a dispneia progressiva aos esforços e sangramento vaginal intermitente de pequeno volume atribuído errônea e previamente a irregularidade menstrual pós-parto.</p>
<p><strong>Exame Físico e Tomografia:</strong> Emagrecida, taquipneica leve (FR = 22 irpm), SpO2 = 94% em ar ambiente. Exame ginecológico: exame especular demonstrando colo uterino hiperemiado com nódulo arroxeado de 1 cm na parede vaginal anterior (suspeita de metástase vascularizada; a equipe absteve-se acertadamente de biopsiar a lesão). Tomografia computadorizada de tórax: múltiplos nódulos densos bilaterais esparsos em "bala de canhão" (cannonball metastases) em ambos os campos pulmonares. TC de crânio e abdome sem evidência de lesões.</p>
<p><strong>Laboratório e Diagnóstico:</strong></p>
<ul>
  <li>&beta;-hCG sérico quantitativo: <strong>210.000 mUI/mL</strong>;</li>
  <li>Diagnóstico estabelecido: <strong>Coriocarcinoma Gestacional Metastático (Estádio III da FIGO)</strong> decorrente de gestação a termo prévia.</li>
</ul>
<p><strong>Cálculo do Escore Prognóstico FIGO/OMS:</strong></p>
<ul>
  <li>Idade: 33 anos (&lt; 40) = 0 pontos;</li>
  <li>Gravidez antecedente: Parto a termo = <strong>2 pontos</strong>;</li>
  <li>Intervalo desde a gravidez: 9 meses (entre 7 e 12 meses) = <strong>2 pontos</strong>;</li>
  <li>&beta;-hCG pré-tratamento: 210.000 mUI/mL (&gt; 100.000) = <strong>4 pontos</strong>;</li>
  <li>Maior diâmetro tumoral uterino: 4,2 cm (3 a 4 cm) = <strong>1 ponto</strong>;</li>
  <li>Sítio de metástases: Pulmão e vagina = <strong>0 pontos</strong>;</li>
  <li>Número de metástases: &gt; 8 nódulos pulmonares = <strong>4 pontos</strong>;</li>
  <li><strong>Escore Total = 13 pontos (Estádio III:13 — Ultra-Alto Risco!).</strong></li>
</ul>
<p><strong>Tratamento e Desfecho:</strong> Devido à alta carga tumoral pulmonar e risco de insuficiência respiratória por lise tumoral e hemorragia alveolar maciça, a paciente recebeu 2 ciclos de indução suave escalonada com Etoposídeo e Cisplatina em doses reduzidas na UTI oncológica, seguidos pela transição para o protocolo de poliquimioterapia <strong>EMA-CO pleno</strong>. Apresentou remissão completa dos sintomas respiratórios e negativação sustentada do &beta;-hCG ao término de 8 ciclos (incluindo 3 ciclos de consolidação), encontrando-se curada em seguimento oncológico.</p>
`
    },
    {
      id: 'questoes-concursos-comentadas',
      title: '13. Questões de Provas de Residência Médica e ENAMED com Gabaritos Exaustivos',
      body_html: `
<h3>Questão 1 (ENAMED / Revalidação de Diploma)</h3>
<p>Uma primigesta de 19 anos, com idade gestacional estimada em 11 semanas por data da última menstruação, procura a emergência obstétrica com queixa de náuseas intensas, sangramento genital intermitente em borra de café e eliminação de pequenas vesículas translúcidas semelhantes a uvas. Ao exame físico: PA = 150/95 mmHg, FC = 110 bpm; altura uterina ao nível da cicatriz umbilical (compatível com 20 semanas), sem batimentos cardiofetais audíveis ao sonar Doppler. A ultrassonografia transvaginal evidencia cavidade uterina preenchida por material heterogêneo ecogênico com múltiplas áreas microcísticas em aspecto de tempestade de neve, sem feto ou saco gestacional, além de cistos ovarianos multiloculados bilaterais de 7 cm. O &beta;-hCG quantitativo é de 450.000 mUI/mL. Com base nas diretrizes clínicas da FEBRASGO para a Doença Trofoblástica Gestacional, assinale a assertiva correta referente à conduta terapêutica e aos riscos do procedimento:</p>
<p><strong>A)</strong> Deve-se iniciar imediatamente infusão venosa de ocitocina em altas doses por 12 horas antes da dilatação cervical mecânica para estimular a expulsão espontânea do conteúdo molar e evitar hemorragias.<br>
<strong>B)</strong> O esvaziamento uterino de escolha é a vácuo-aspiração; a administração de ocitocina é proscrita antes do início da aspiração, pelo risco iminente de embolização trofoblástica pulmonar maciça e insuficiência respiratória aguda.<br>
<strong>C)</strong> Está indicada laparotomia exploradora imediata para drenagem e punção esvaziadora dos cistos ovarianos bilaterais, a fim de prevenir a tempestade tireotóxica intraoperatória.<br>
<strong>D)</strong> A presença de hipertensão arterial associada à proteinúria em gestação com menos de 20 semanas afasta o diagnóstico de mola hidatiforme, confirmando glomerulonefrite membranosa lúpica primária.<br>
<strong>E)</strong> A histerectomia total abdominal simples com ooforectomia bilateral é mandatória nessa paciente devido ao risco de 100% de transformação maligna dos cistos ovarianos.</p>
<p><strong>Gabarito Comentado:</strong></p>
<p><strong>Alternativa B está CORRETA.</strong> A técnica padrão-ouro de esvaziamento uterino na mola hidatiforme é a vácuo-aspiração (elétrica ou manual intrauterina). A regra basilar de segurança determina que a ocitocina NUNCA deve ser infundida antes do início da aspiração do tecido molar, pois as contrações sobre um útero repleto de tecido friável empurram fragmentos trofoblásticos para os seios venosos pélvicos abertos, precipitando embolização trofoblástica pulmonar maciça catastrófica com edema pulmonar e colapso circulatório. A ocitocina só deve ser ligada após a aspiração da maior parte do volume molar.<br>
<em>Análise dos distratores:</em><br>
A: Errada e letal; ocitocina prévia causa embolização trofoblástica pulmonar.<br>
C: Errada; os cistos tecaluteínicos regridem espontaneamente após a queda do &beta;-hCG, sendo contraindicada sua ressecção ou punção.<br>
D: Errada; pré-eclâmpsia precoce (&lt; 20 semanas) é patognomônica de mola hidatiforme completa.<br>
E: Errada; a paciente tem 19 anos, nulípara, e os cistos tecaluteínicos são benignos e reversíveis.</p>

<h3>Questão 2 (Residência Médica / USP)</h3>
<p>A respeito da diferenciação citogenética, histopatológica e imuno-histoquímica entre a Mola Hidatiforme Completa e a Mola Hidatiforme Parcial, assinale a alternativa que apresenta a correlação correta:</p>
<p><strong>A)</strong> A mola completa é habitualmente triploide (69,XXY), possui embrião viável e apresenta imuno-histoquímica fortemente positiva para a proteína p57 no estroma vilositário.<br>
<strong>B)</strong> A mola parcial tem cariótipo diploide androgenético puro (46,XX), ausência de tecido fetal e expressão nula (negativa) de p57.<br>
<strong>C)</strong> A mola completa possui cariótipo diploide de origem exclusivamente paterna (androgenética), não apresenta tecido fetal e caracteriza-se por imunonegatividade para p57 em virtude da ausência de genoma materno.<br>
<strong>D)</strong> A mola parcial não decorre de fertilização por múltiplos espermatozoides, sendo causada por duplicação do genoma exclusivamente materno (ginogenética pura).<br>
<strong>E)</strong> Ambas as formas apresentam risco idêntico de evolução para Neoplasia Trofoblástica Gestacional maligna (aproximadamente 20%), exigindo quimioterapia adjuvante profilática em todas as pacientes.</p>
<p><strong>Gabarito Comentado:</strong></p>
<p><strong>Alternativa C está CORRETA.</strong> A mola hidatiforme completa tem cariótipo diploide (46,XX na maioria ou 46,XY), com todo o genoma nuclear de origem estritamente paterna (androgênese pura por óvulo vazio fecundado por espermatozoide que duplicou ou por dispermia). Não há formação de embrião ou hemácias fetais. Como o gene <em>CDKN1C</em> (que codifica a proteína p57) sofre <em>imprinting</em> e só é transcrito a partir do alelo materno, a ausência de cromossomos maternos na mola completa torna a imuno-histoquímica para p57 <strong>negativa</strong>.<br>
<em>Análise dos distratores:</em><br>
A: Errada, descreve características da mola parcial.<br>
B: Errada, a mola parcial é triploide (69 cromossomos) e p57 positiva.<br>
D: Errada, a mola parcial é causada por dispermia paterna fecundando óvulo materno normal.<br>
E: Errada, a mola completa tem risco de 15% a 20% de NTG, enquanto a parcial tem risco muito menor (1% a 5%); quimioterapia profilática de rotina é proscrita.</p>

<h3>Questão 3 (Residência Médica / UNIFESP)</h3>
<p>Mulher de 26 anos comparece para acompanhamento ambulatorial pós-esvaziamento de mola hidatiforme completa realizado há 8 semanas. As dosagens séricas quantitativas de &beta;-hCG realizadas nas últimas quatro semanas mostram os seguintes resultados semanais consecutivos: 1.250 mUI/mL, 1.280 mUI/mL, 1.300 mUI/mL e 1.290 mUI/mL. A paciente encontra-se assintomática e em uso correto de contraceptivo oral combinado. De acordo com os critérios diagnósticos da FIGO (revisão 2026), qual é a conclusão diagnóstica e a conduta preconizada?</p>
<p><strong>A)</strong> Trata-se de involução normal lenta do trofoblasto residual; manter seguimento clínico e repetir o &beta;-hCG após 6 meses.<br>
<strong>B)</strong> Configura diagnóstico de Neoplasia Trofoblástica Gestacional (NTG) pós-molar por platô de &beta;-hCG; deve-se estadiar a paciente, calcular o escore prognóstico FIGO/OMS e iniciar quimioterapia.<br>
<strong>C)</strong> Houve cura da doença molar porque o hormônio parou de subir; suspender o seguimento laboratorial e liberar para gestação.<br>
<strong>D)</strong> Indicar curetagem uterina instrumental de repetição semanal até que o laudo patológico afaste coriocarcinoma.<br>
<strong>E)</strong> Realizar histerectomia total de urgência com ressecção de paramétrios como única forma de tratamento permitida pela FIGO.</p>
<p><strong>Gabarito Comentado:</strong></p>
<p><strong>Alternativa B está CORRETA.</strong> Pelos critérios formais da FIGO (endossados na revisão 2026 e pela FEBRASGO), a presença de um <strong>platô nos níveis de &beta;-hCG sérico</strong> (definido como estabilização com flutuação menor que 10%) em <strong>quatro dosagens semanais consecutivas abrangendo um período de pelo menos três semanas (Dias 1, 7, 14 e 21)</strong> sela o diagnóstico de <strong>Neoplasia Trofoblástica Gestacional (NTG) pós-molar</strong>. A conduta mandatória imediata consiste em realizar exames de estadiamento anatômico (USTV pélvica, TC ou radiografia de tórax e exames abdominais), calcular a pontuação prognóstica FIGO/OMS e instituir o tratamento quimioterápico adequado.<br>
<em>Análise dos distratores:</em><br>
A: Errada, estabilização acima de 1.000 mUI/mL por 1 mês é neoplasia em atividade proliferativa.<br>
C: Absurdo que atrasaria o tratamento oncológico de doença invasora.<br>
D: Errada, recuretagens repetidas aumentam risco de perfuração uterina e sinéquias e não tratam invasão profunda do miométrio.<br>
E: Errada, a NTG responde de forma magnífica à quimioterapia sistêmica, preservando a fertilidade da mulher jovem.</p>

<h3>Questão 4 (Residência Médica / ENARE)</h3>
<p>No sistema de estadiamento e escore prognóstico da Federação Internacional de Ginecologia e Obstetrícia (FIGO/OMS) para Neoplasia Trofoblástica Gestacional (NTG), qual das seguintes opções corresponde a um fator associado a alto risco de resistência à quimioterapia em monoterapia, conferindo pontuação elevada no escore?</p>
<p><strong>A)</strong> Gravidez antecedente resultante de mola hidatiforme.<br>
<strong>B)</strong> Intervalo inferior a 4 meses entre o término da gestação e o diagnóstico da NTG.<br>
<strong>C)</strong> Níveis séricos basais pré-tratamento de &beta;-hCG inferiores a 1.000 mUI/mL.<br>
<strong>D)</strong> Metástases hepáticas ou cerebrais documentadas.<br>
<strong>E)</strong> Maior diâmetro tumoral medido no exame de imagem inferior a 3 cm.</p>
<p><strong>Gabarito Comentado:</strong></p>
<p><strong>Alternativa D está CORRETA.</strong> No escore prognóstico FIGO/OMS, o sítio das metástases é um fator prognóstico crucial: metástases pulmonares pontuam 0; baço e rins pontuam 1; trato gastrointestinal pontua 2; e <strong>metástases em fígado ou cérebro pontuam 4 pontos</strong> (pontuação máxima para sítio anatômico), em virtude do risco elevado de hemorragia fatal e menor penetração/resposta de esquemas quimioterápicos simples.<br>
<em>Análise dos distratores:</em><br>
A: Mola hidatiforme pontua 0 (antecedente de termo pontua 2).<br>
B: Intervalo &lt; 4 meses pontua 0 (&gt; 12 meses pontua 4).<br>
C: &beta;-hCG &lt; 1.000 mUI/mL pontua 0 (&gt; 100.000 pontua 4).<br>
E: Tumor &lt; 3 cm pontua 0 (&ge; 5 cm pontua 2).</p>

<h3>Questão 5 (Residência Médica / AMRIGS)</h3>
<p>Uma mulher de 38 anos, mãe de três filhos, com prole constituída, é submetida à histerectomia total abdominal simples mantendo ovários com mola hidatiforme completa <em>in situ</em> por opção conjunta da paciente e da equipe assistente. Em relação ao seguimento pós-operatório dessa paciente, assinale a orientação correta:</p>
<p><strong>A)</strong> A histerectomia elimina completamente a possibilidade de malignização para NTG, dispensando qualquer controle posterior de &beta;-hCG.<br>
<strong>B)</strong> A paciente deve realizar dosagens séricas semanais de &beta;-hCG até três resultados negativos, seguidas de dosagens mensais por 6 meses, pois células trofoblásticas microscópicas podem persistir em leito vascular extrauterino ou pulmão.<br>
<strong>C)</strong> Os ovários deveriam ter sido obrigatoriamente ressecados durante a cirurgia, devendo a paciente ser reoperada para ooforectomia bilateral preventiva.<br>
<strong>D)</strong> A paciente deve receber quatro ciclos profiláticos de poliquimioterapia com EMA-CO antes da alta hospitalar.<br>
<strong>E)</strong> O seguimento laboratorial deve ser feito exclusivamente por dosagem de TSH e T4 livre, pois o &beta;-hCG zera imediatamente após a retirada do útero.</p>
<p><strong>Gabarito Comentado:</strong></p>
<p><strong>Alternativa B está CORRETA.</strong> Embora a histerectomia com mola <em>in situ</em> reduza expressivamente a incidência subsequente de NTG de 20% para cerca de 3% a 5%, ela <strong>não zera o risco de malignização metastática</strong>. Células trofoblásticas podem ter embolizado para vasos pulmonares ou sítios extrapélvicos antes da operação. Por conseguinte, o seguimento pós-molar com dosagens semanais de &beta;-hCG até 3 valores normais e, a seguir, mensais por 6 meses é rigorosamente idêntico e mandatório.<br>
<em>Análise dos distratores:</em><br>
A: Errada, pois a histerectomia não elimina o risco de metástases à distância.<br>
C: Errada, os ovários e seus cistos tecaluteínicos são benignos e devem ser preservados.<br>
D: Errada, poliquimioterapia profilática tem toxicidade inaceitável e não é indicada de rotina.<br>
E: Errada, o marcador padrão de acompanhamento da DTG é o &beta;-hCG sérico quantitativo.</p>

<h3>Questão 6 (Residência Médica / SMS-RJ)</h3>
<p>Dentre as neoplasias trofoblásticas gestacionais malignas, o Tumor Trofoblástico do Sítio Placentário (PSTT) e o Tumor Trofoblástico Epitelioide (ETT) destacam-se clinicamente por apresentarem uma particularidade terapêutica fundamental que os diferencia do coriocarcinoma gestacional clássico. Qual é essa particularidade?</p>
<p><strong>A)</strong> Apresentam sensibilidade extrema à quimioterapia em monoterapia com metotrexato oral em dose baixa.<br>
<strong>B)</strong> Não produzem qualquer tipo de hormônio trofoblástico, sendo o &beta;-hCG sérico estritamente indetectável em 100% dos casos.<br>
<strong>C)</strong> Apresentam resistência intrínseca relativa aos esquemas quimioterápicos convencionais (como MTX e EMA-CO), sendo a ressecção cirúrgica (histerectomia total) o pilar primário do tratamento curativo na doença localizada.<br>
<strong>D)</strong> Ocorrem exclusivamente durante o primeiro trimestre de gestações molares completas, nunca após gestações a termo.<br>
<strong>E)</strong> Regridem espontaneamente com a simples administração de anticoncepcionais orais combinados de alta dosagem.</p>
<p><strong>Gabarito Comentado:</strong></p>
<p><strong>Alternativa C está CORRETA.</strong> Ao contrário do coriocarcinoma e da mola invasora (que se originam da proliferação mista de sincicio e citotrofoblasto e são altamente quimiossensíveis), o PSTT e o ETT originam-se do <strong>trofoblasto intermediário</strong>. Caracterizam-se por secreção modesta de &beta;-hCG, crescimento mais indolente e acentuada <strong>quimiorresistência relativa</strong> aos regimes padrão de quimioterapia. Por esse motivo, as diretrizes da FIGO 2026 estabelecem estadiamento anatômico específico e indicam a <strong>histerectomia total com ressecção linfonodal</strong> como pilar primário curativo fundamental para lesões confinadas ao útero.<br>
<em>Análise dos distratores:</em><br>
A: Incorreta, são quimiorresistentes à monoterapia.<br>
B: Incorreta, secretam &beta;-hCG em baixas concentrações e lactogênio placentário humano (hPL).<br>
D: Incorreta, ocorrem frequentemente meses ou anos após gestações a termo normais, abortos ou ectópicas.<br>
E: Incorreta, são neoplasias malignas verdadeiras com potencial de disseminação linfonodal e metastática.</p>

<h3>Questão 7 (Concurso Médico / IAMSPE)</h3>
<p>Durante o exame ginecológico especular de uma paciente com diagnóstico de coriocarcinoma gestacional metastático para o pulmão, o médico observa um nódulo violáceo friável de 2,0 cm na parede vaginal anterior logo abaixo do meato uretral. A respeito da abordagem semiológica e terapêutica dessa lesão vaginal, a conduta correta é:</p>
<p><strong>A)</strong> Realizar biópsia excisional imediata no consultório sob anestesia local para confirmação histológica rápida.<br>
<strong>B)</strong> Realizar punção aspirativa por agulha fina para citologia oncótica do nódulo.<br>
<strong>C)</strong> Não biopsiar ou manipular a lesão vaginal devido ao risco de hemorragia maciça incoercível; a lesão regredirá com a poliquimioterapia sistêmica.<br>
<strong>D)</strong> Realizar eletrocauterização ampla de toda a parede vaginal anterior com bisturi elétrico monopolar.<br>
<strong>E)</strong> Indicar colpectomia total imediata para controle oncológico local da doença.</p>
<p><strong>Gabarito Comentado:</strong></p>
<p><strong>Alternativa C está CORRETA.</strong> As metástases vaginais da NTG são extremamente vascularizadas e formadas por ectasias vasculares friáveis sem estroma de suporte muscular adequado. Qualquer tentativa de biópsia ou punção desencadeia hemorragias profusas e incontroláveis com risco iminente de choque hemorrágico. O diagnóstico é firmado clinicamente na presença de &beta;-hCG elevado e nódulos violáceos característicos. A conduta correta é NÃO biopsiar e iniciar a quimioterapia sistêmica (que promove a regressão e trombose vascular do nódulo em poucos ciclos).<br>
<em>Análise dos distratores:</em><br>
A e B: Fatais pelo risco de sangramento exsanguinante imediato.<br>
D e E: Proscritas e mutiladoras sem qualquer benefício oncológico sobre a quimioterapia.</p>

<h3>Questão 8 (Residência Médica / CERMAM)</h3>
<p>Mulher de 22 anos, nulípara, Rh negativo não sensibilizada, foi submetida a esvaziamento por vácuo-aspiração de mola hidatiforme completa com 10 semanas de gestação. Sobre a profilaxia com imunoglobulina anti-D e o aconselhamento contraceptivo no seguimento pós-molar, assinale a opção correta:</p>
<p><strong>A)</strong> A paciente não necessita de imunoglobulina anti-D, pois a mola completa não possui eritrócitos fetais com antígenos Rh(D).<br>
<strong>B)</strong> Deve-se administrar imunoglobulina humana anti-D em até 72 horas pós-esvaziamento e prescrever contracepção hormonal oral eficaz, estando o DIU contraindicado na fase inicial com &beta;-hCG positivo.<br>
<strong>C)</strong> O DIU de cobre é o método contraceptivo de primeira escolha imediata no momento da aspiração molar para garantir adesão.<br>
<strong>D)</strong> A paciente está liberada para engravidar assim que o primeiro &beta;-hCG semanal atingir valor inferior a 100 mUI/mL.<br>
<strong>E)</strong> A imunoglobulina anti-D deve ser administrada somente se a paciente evoluir para Neoplasia Trofoblástica Gestacional.</p>
<p><strong>Gabarito Comentado:</strong></p>
<p><strong>Alternativa B está CORRETA.</strong> Embora a mola completa não possua feto, antígenos da linhagem trofoblástica podem sensibilizar a mãe Rh negativo. Além disso, no momento inicial não se pode descartar com 100% de certeza mola parcial ou gravidez gemelar. Portanto, a diretriz da FEBRASGO e do Ministério da Saúde orienta administrar imunoglobulina anti-D em até 72 horas após a aspiração. A contracepção hormonal deve ser imediata e o DIU é contraindicado até a negativação do hormônio pelo risco de perfuração miometrial e confusão diagnóstica de sangramento.<br>
<em>Análise dos distratores:</em><br>
A: Errada, a profilaxia é formalmente recomendada em todas as pacientes Rh negativo.<br>
C: Errada, DIU é contraindicado na fase aguda pós-molar.<br>
D: Errada, gravidez é terminantemente proibida até o término de todo o protocolo de consolidação semestral.<br>
E: Errada, a profilaxia é para o evento hemorrágico da aspiração primária.</p>

<h3>Questão 9 (Residência Médica / SCMSP)</h3>
<p>Paciente de 29 anos, tratada com sucesso com poliquimioterapia no esquema EMA-CO por Neoplasia Trofoblástica Gestacional de alto risco (Estádio III:8), concluiu o terceiro ciclo de consolidação após normalização do &beta;-hCG sérico. A paciente indaga à equipe médica quando poderá planejar uma nova gestação com segurança e quais são os riscos para sua fertilidade futura e para o feto. De acordo com as diretrizes da FIGO e da FEBRASGO, a orientação correta é:</p>
<p><strong>A)</strong> A paciente tornou-se estéril irreversivelmente devido ao uso de Ciclofosfamida e Etoposídeo, devendo ser encaminhada para adoção.<br>
<strong>B)</strong> A nova gestação deve ser postergada por no mínimo 12 meses após o término da poliquimioterapia, mantendo-se contracepção eficaz durante todo o período de remissão sustentada; a fertilidade futura é habitualmente preservada e as taxas de malformações congênitas em gestações futuras são comparáveis às da população geral.<br>
<strong>C)</strong> A paciente pode engravidar no mês subsequente ao término do tratamento, pois os quimioterápicos são eliminados em 72 horas.<br>
<strong>D)</strong> A paciente só poderá engravidar após 10 anos de remissão completa, com necessidade de histerossalpingografia semestral.<br>
<strong>E)</strong> Qualquer gestação futura deverá ser obrigatoriamente interrompida no primeiro trimestre devido a um risco de 90% de recorrência de coriocarcinoma.</p>
<p><strong>Gabarito Comentado:</strong></p>
<p><strong>Alternativa B está CORRETA.</strong> Após o tratamento de NTG com quimioterapia (especialmente poliquimioterapia de alto risco), a diretriz internacional da FIGO e os Centros de Referência de DTG recomendam rigorosa contracepção por <strong>pelo menos 12 meses após a conclusão da quimioterapia</strong>. Esse intervalo é crucial porque cerca de 80% das recidivas tumorais ocorrem no primeiro ano de seguimento. Estudos a longo prazo demonstram que mais de 80% a 85% das mulheres recuperam ciclos ovulatórios normais e fertilidade plena, sem aumento estatisticamente significativo de abortamentos espontâneos, malformações congênitas ou anomalias cromossômicas em conceptos futuros.<br>
<em>Análise dos distratores:</em><br>
A: Errada, a maioria mantém fertilidade preservada.<br>
C: Errada, o risco de recidiva no primeiro ano é elevado e a gestação confunde o &beta;-hCG.<br>
D e E: Proposições falsas e desprovidas de fundamentação científica.</p>

<h3>Questão 10 (Residência Médica / HC-UFPR)</h3>
<p>Uma mulher de 32 anos apresenta sangramento vaginal persistente e discreto que se iniciou 18 meses após um parto vaginal a termo sem intercorrências. O &beta;-hCG sérico quantitativo revela valor persistentemente baixo e estável de 450 mUI/mL. A ultrassonografia transvaginal e a ressonância magnética pélvica mostram uma lesão tumoral infiltrativa miometrial nodular de 3,5 cm no fundo uterino. A biópsia endometrial guiada por histeroscopia revela proliferação monomórfica de células trofoblásticas intermediárias com atipias nucleares, ausência de elementos vilositários e imuno-histoquímica com forte positividade para Lactogênio Placentário Humano (hPL) e positividade focal fraca para &beta;-hCG, confirmando Tumor Trofoblástico do Sítio Placentário (PSTT). Diante do diagnóstico, qual é a conduta terapêutica definitiva preconizada pelas diretrizes FIGO 2026?</p>
<p><strong>A)</strong> Iniciar imediatamente quimioterapia em monoterapia com Metotrexato em baixas doses.<br>
<strong>B)</strong> Prescrever radioterapia pélvica exclusiva associada a progestágenos orais contínuos.<br>
<strong>C)</strong> Indicar histerectomia total abdominal com estadiamento e linfadenectomia pélvica, pois o PSTT é intrinsecamente quimiorresistente e a ressecção cirúrgica completa é o pilar curativo primário.<br>
<strong>D)</strong> Realizar embolização das artérias uterinas e liberar a paciente para gestação subsequente em 3 meses.<br>
<strong>E)</strong> Indicar curetagem uterina esvaziadora de repetição a cada 15 dias até negativar o hPL.</p>
<p><strong>Gabarito Comentado:</strong></p>
<p><strong>Alternativa C está CORRETA.</strong> O Tumor Trofoblástico do Sítio Placentário (PSTT) e o Tumor Trofoblástico Epitelioide (ETT) originam-se do trofoblasto intermediário extraviloso. Ao contrário do coriocarcinoma clássico, o PSTT apresenta baixos níveis de &beta;-hCG, intensa produção de hPL e <strong>marcada quimiorresistência aos esquemas quimioterápicos convencionais</strong> (como monoterapia ou EMA-CO). Nas formas localizadas restritas ao útero (Estádio I), a <strong>histerectomia total com ressecção cirúrgica ampla e inventário linfonodal</strong> é o tratamento curativo primário de escolha preconizado pela FIGO 2026.<br>
<em>Análise dos distratores:</em><br>
A: Errada, PSTT é quimiorresistente à monoterapia.<br>
B: Errada, radioterapia não é tratamento primário para PSTT uterino.<br>
D e E: Ineficazes e contraindicadas para neoplasia trofoblástica infiltrativa.</p>
`
    },
    {
      id: 'aconselhamento-reprodutivo-longo-prazo',
      title: '14. Aconselhamento Reprodutivo, Reserva Ovariana e Vigilância Oncológica Futura',
      body_html: `
<h3>Recuperação da Função Ovariana e Reserva Folicular</h3>
<p>Um dos questionamentos mais angustiantes para as pacientes jovens com diagnóstico de Doença Trofoblástica Gestacional ou Neoplasia Trofoblástica Gestacional diz respeito ao seu futuro reprodutivo. As evidências científicas acumuladas pelos maiores Centros de Referência mundiais (Charing Cross Trophoblastic Centre no Reino Unido e centros de referência brasileiros da FEBRASGO) trazem dados extremamente tranquilizadores:</p>
<ul>
  <li><strong>Preservação da Fertilidade Após Esvaziamento de Mola Hidatiforme Simples:</strong> O esvaziamento por vácuo-aspiração não afeta negativamente a anatomia endometrial ou a reserva ovariana. Mais de 95% das mulheres que desejam engravidar após o término do período de seguimento alcançam gestações tópicas espontâneas a termo sem qualquer complicação reprodutiva atribuível ao episódio molar prévio;</li>
  <li><strong>Impacto da Quimioterapia em Monoterapia (Metotrexato):</strong> O MTX em baixas doses não provoca lesão folicular ovariana permanente ou falência ovariana prematura. A menstruação e os ciclos ovulatórios normais retornam habitualmente dentro de 2 a 6 meses após o término do tratamento;</li>
  <li><strong>Impacto da Poliquimioterapia de Combinação (Esquema EMA-CO):</strong> Embora agentes alquilantes como a Ciclofosfamida possuam toxicidade folicular dose-dependente, mais de 80% a 85% das pacientes tratadas com EMA-CO em idade fértil (&lt; 35-38 anos) retomam a função ovariana normal e conseguem conceber espontaneamente. Observa-se apenas uma antecipação média da menopausa em aproximadamente 1 a 3 anos nas pacientes submetidas a múltiplos ciclos de poliquimioterapia;</li>
  <li><strong>Desfechos Perinatais em Gestações Futuras:</strong> Gestações concebidas após o intervalo de segurança de 12 meses pós-quimioterapia não apresentam risco aumentado de abortamento, prematuridade, anomalias congênitas maiores ou anomalias cromossômicas em comparação com a população geral.</li>
</ul>

<h3>Protocolo de Pré-Natal Obrigatório em Gestações Futuras</h3>
<p>Embora o risco de recorrência de mola hidatiforme seja baixo (cerca de 1% a 2% após um episódio), toda paciente com antecedente de DTG deve seguir um protocolo especializado em qualquer gravidez subsequente:</p>
<ol>
  <li><strong>Ultrassonografia Transvaginal Precoce no Primeiro Trimestre (com 6 a 8 semanas):</strong> Para documentar a implantação intrauterina tópica normal e excluir recorrência molar ou anomalias trofoblásticas precoces;</li>
  <li><strong>Envio da Placenta para Exame Histopatológico Após o Parto:</strong> Independentemente de o parto ser cesárea ou vaginal, a placenta e as membranas ovulares devem ser encaminhadas para análise anatomopatológica criteriosa para afastar microfocos de trofoblasto atípico;</li>
  <li><strong>Dosagem de &beta;-hCG Sérico 6 Semanas Pós-Parto:</strong> Toda puérpera com história prévia de DTG deve realizar uma dosagem sérica de &beta;-hCG quantitativo na consulta de puerpério tardio (6 semanas pós-parto ou pós-abortamento) para certificar a involução hormonal completa e excluir coriocarcinoma oculto de nova gestação.</li>
</ol>
`
    }
  ],
  references: [
    {
      title: 'FIGO Committee on Gynecologic Oncology — FIGO Staging for Gestational Trophoblastic Neoplasia: 2026 Update',
      url: 'https://obgyn.onlinelibrary.wiley.com'
    },
    {
      title: 'Ngan HYS et al. Diagnosis and management of gestational trophoblastic disease: FIGO 2025 update',
      url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC12411817/'
    },
    {
      title: 'FEBRASGO — Manual de Orientação em Doença Trofoblástica Gestacional e Centros de Referência no Brasil',
      url: 'https://www.febrasgo.org.br'
    },
    {
      title: 'RCOG Green-top Guideline No. 38 — The Management of Gestational Trophoblastic Disease',
      url: 'https://www.rcog.org.uk'
    },
    {
      title: 'ACOG Practice Bulletin No. 212 — Gestational Trophoblastic Disease',
      url: 'https://www.acog.org'
    }
  ]
};

const chars = saveBook(book054);
console.log(`[CONCLUIDO] Aula 054 - Doenca Trofoblastica Gestacional gravada com ${chars} caracteres uteis.`);
