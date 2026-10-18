import { saveBook } from './bloco-04-utils.mjs';

const book = {
  slug: 'colecistite-e-colelitiase',
  title: 'Colecistite e Colelitíase',
  area: 'Cirurgia Geral',
  materia: 'Cirurgia do Aparelho Digestivo e Vias Biliares',
  description: 'Tratado completo de Colecistite Aguda e Colelitíase para concursos de Residência Médica e ENAMED: anatomia cirúrgica da vesícula biliar, Trígono Hepatocístico de Budde / Calot e Visão Crítica de Segurança de Strasberg; fisiopatologia da litogênese biliar comparando cálculos de colesterol (80%, fatores dos 4 Fs, perda ponderal rápida) vs pigmentares pretos (hemólise crônica, cirrose) e castanhos (infecções bacterianas e parasitárias); cólica biliar simples vs colecistite aguda litiásica; semiologia do Sinal de Murphy clássico e ultrassonográfico; Critérios de Tóquio vigentes (TG18/TG20) para diagnóstico e classificação de gravidade (Graus I, II e III); ultrassonografia de abdome superior como padrão-ouro e seus critérios patognomônicos (espessamento parietal > 4 mm, cálculo impactado, líquido pericolecístico); colecistite alitiásica no paciente crítico de CTI e indicação de colecistostomia percutânea trans-hepática; complicações graves: empiema, gangrena, perfuração com peritonite biliar, fístulas colecistoentéricas e íleo biliar com a clássica Tríade de Rigler (pneumobilia, cálculo ectópico e distensão de delgado); Síndrome de Mirizzi com classificação de Csendes (tipos I a V); tratamento cirúrgico definitivo com Colecistectomia Videolaparoscópica Precoce nas primeiras 72 horas; 4 casos clínicos estruturados e questões comentadas na íntegra.',
  sections: [
    {
      id: 'anatomia-cirurgica-e-strasberg',
      title: '1. Anatomia Cirúrgica da Vesícula e Vias Biliares: Trígono de Calot e Visão Crítica de Segurança de Strasberg',
      body_html: `
<h3>Anatomia Macroscópica da Vesícula Biliar</h3>
<p>A vesícula biliar é uma víscera oca piriforme localizada na face inferior do lobo hepático direito, alojada na fossa vesicular (ou fossa cística) entre os segmentos hepáticos IVB e V. Possui capacidade volumétrica fisiológica de 30 a 50 mL (podendo expandir-se para mais de 150 a 200 mL em condições de hidropsia vesicular patológica) e divide-se anatomicamente em quatro porções funcionais:</p>
<ol>
  <li><strong>Fundo:</strong> Extremidade distal cega e arredondada, que habitualmente se projeta além da margem inferior do fígado, coincidindo topograficamente com a junção da 9ª cartilagem costal com a borda lateral do músculo reto abdominal direito (o ponto cístico de Murphy);</li>
  <li><strong>Corpo:</strong> Porção intermediária mais ampla, em íntimo contato com o parênquima hepático e a primeira e segunda porções do duodeno e cólon transverso;</li>
  <li><strong>Infundíbulo (ou Colo):</strong> Estreitamento infundibular contorcido em formato de "S". Frequentemente apresenta uma projeção sacular lateral excêntrica póstero-inferior denominada <strong>Bolsa de Hartmann</strong>, sítio anatômico de predileção para a impactação mecânica inicial de cálculos biliares;</li>
  <li><strong>Ducto Cístico:</strong> Conduz a bile da vesícula para o ducto hepático comum, formando o colédoco. Seu comprimento médio varia de 2 a 4 cm, com diâmetro interno de 2 a 3 mm. O terço proximal do ducto cístico contém as <strong>Válvulas Espirais de Heister</strong> — dobras mucosas espiraladas com fibras musculares lisas que regulam o fluxo bidirecional da bile e frequentemente impedem a passagem retrógrada fácil de cateteres ou a eliminação espontânea de cálculos.</li>
</ol>

<h3>O Trígono Hepatocístico vs Trígono de Calot Histórico</h3>
<p>A dissecção precisa das estruturas hilares biliares é o passo mais crítico da colecistectomia para evitar a mais temida complicação cirúrgica: a <strong>Lesão Iatrogênica da Via Biliar Principal (LVI)</strong>. É fundamental distinguir os dois conceitos anatômicos frequentemente cobrados em provas:</p>
<ul>
  <li><strong>Trígono de Calot Histórico (descrito por Jean-François Calot em 1891):</strong> Delimitado pelo <em>Ducto Cístico</em> (inferiormente), pelo <em>Ducto Hepático Comum</em> (medialmente) e pela <em>Artéria Cística</em> (superiormente). O conteúdo clássico no interior desse triângulo é o linfonodo cístico de Mascagni (ou linfonodo de Calot);</li>
  <li><strong>Trígono Hepatocístico Moderno (ou Trígono de Budde):</strong> É a referência cirúrgica anatômica real adotada universalmente na colecistectomia laparoscópica. Seus limites são:
    <ul>
      <li><strong>Inferolateral:</strong> Ducto Cístico;</li>
      <li><strong>Medial:</strong> Ducto Hepático Comum;</li>
      <li><strong>Superior:</strong> Borda inferior do segmento V do Fígado;</li>
      <li><em>Conteúdo Real:</em> No interior do Trígono Hepatocístico trafegam a <strong>Artéria Cística</strong> (que se divide em ramos anterior e posterior na parede vesicular) e, frequentemente, uma artéria hepática direita anômala ou ductos biliares aberrantes (ductos de Luschka).</li>
    </ul>
  </li>
</ul>

<h3>A Visão Crítica de Segurança de Strasberg (Critical View of Safety - CVS)</h3>
<p>Em 1995, Steven Strasberg formulou um protocolo padronizado de segurança cirúrgica obrigatório na colecistectomia laparoscópica para prevenir a transecção inadvertida do ducto colédoco (erro que ocorre quando o colédoco é erroneamente identificado como ducto cístico). Para atingir a <strong>Visão Crítica de Segurança</strong>, o cirurgião deve cumprir estritamente <strong>TRÊS REQUISITOS OBRIGATÓRIOS</strong> antes de aplicar qualquer clipe ou seccionar qualquer estrutura:</p>
<table class="book-table">
  <thead>
    <tr>
      <th>Critério da Visão Crítica de Strasberg</th>
      <th>Etapa Técnica de Execução Cirúrgica</th>
      <th>Objetivo Fisiopatológico de Segurança</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>1. Limpeza Completa do Trígono Hepatocístico</strong></td>
      <td>Dissecção circunferencial e remoção de todo o tecido adiposo e fibroso dentro do trígono hepatocístico.</td>
      <td>Expor completamente o fundo e as estruturas vasculares e ductais, eliminando faixas que mascarem variantes anatômicas.</td>
    </tr>
    <tr>
      <td><strong>2. Descolamento do Terço Inferior da Vesícula da Placa Cística</strong></td>
      <td>A base do corpo e o infundíbulo vesicular devem ser dissecados e liberados do leito hepático em seu terço inferior.</td>
      <td>Permite visualizar diretamente a <strong>Placa Hepática Cística</strong> nua por trás da vesícula, garantindo que não existam outras estruturas entrando na vesícula.</td>
    </tr>
    <tr>
      <td><strong>3. Visualização de Apenas DUAS Estruturas Entrando na Vesícula</strong></td>
      <td>Devem ser identificadas cabalmente <strong>APENAS e TÃO SOMENTE DUAS estruturas</strong> conectadas à vesícula: o <strong>Ducto Cístico</strong> e a <strong>Artéria Cística</strong>.</td>
      <td>Garante com 100% de certeza que a estrutura tubular clipada não é o ducto hepático comum ou o colédoco principal.</td>
    </tr>
  </tbody>
</table>
`
    },
    {
      id: 'fisiologia-biliar-e-litogenese',
      title: '2. Fisiologia Biliar e Fisiopatologia da Litogênese: Cálculos de Colesterol vs Pigmentares Pretos e Castanhos',
      body_html: `
<h3>Composição da Bile Hepática e o Equilíbrio Físico-Químico</h3>
<p>O fígado humano produz diariamente de 500 a 1.000 mL de bile isotônica, constituída por água (97%), ácidos e sais biliares conjugados (ácido cólico e quenodesoxicólico conjugados com glicina ou taurina: 80% dos solutos), fosfolipídios (predominantemente a <em>lecitina / fosfatidilcolina</em>: 16%), colesterol não esterificado (4%), bilirrubina conjugada e eletrólitos. O colesterol é uma molécula puramente lipofílica e insolúvel em meio aquoso; sua solubilização e transporte estável na bile dependem obrigatoriamente da sua incorporação em estruturas supramoleculares mistas denominadas <strong>micelas mistas</strong> e <strong>vesículas unilamelares</strong> formadas por sais biliares e lecitina.</p>
<p>O triângulo de solubilidade de Admirand e Small define a saturação teórica: quando a proporção molar de colesterol ultrapassa a capacidade emulsificante micelar dos sais biliares e fosfolipídios, a bile torna-se <strong>litogênica (supersaturada de colesterol)</strong>, criando o terreno para a nucleação e agregação de cristais sólidos de monohidrato de colesterol.</p>

<h3>Os Três Tipos Principais de Cálculos Biliares</h3>
<table class="book-table">
  <thead>
    <tr>
      <th>Tipo de Cálculo Biliar</th>
      <th>Frequência Relativa</th>
      <th>Composição Química Central</th>
      <th>Fisiopatologia e Fatores de Risco Clássicos</th>
      <th>Aspecto Radiológico (Raio-X Simples)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Cálculos de Colesterol (Amarelos / Mistos)</strong></td>
      <td><strong>75% a 80%</strong> (o mais comum no Ocidente)</td>
      <td>Mais de 50% a 70% de colesterol cristalino puro ou associado a cálcio e bilirrubina.</td>
      <td><strong>Tétrade clássica dos "4 Fs"</strong>: <em>Female</em> (sexo feminino: estrogênio aumenta secreção biliar de colesterol), <em>Forty</em> (idade &ge; 40 anos), <em>Fat</em> (obesidade: hiperprodução hepática de colesterol), <em>Fertile</em> (multiparidade).<br>Outros fatores: <strong>perda ponderal ultrarrápida</strong> (pós-cirurgia bariátrica ou dietas restritivas por mobilização maciça de colesterol tecidual), uso de fibratos (inibem a enzima 7-$\alpha$-hidroxilase bloqueando a conversão de colesterol em sais biliares), uso de análogos de somatostatina (octreotide: estase vesicular), nutrição parenteral total (NPT prolongada por perda do estímulo colecistoquinético) e ressecção do íleo terminal (doença de Crohn com perda de sais biliares na circulação entero-hepática).</td>
      <td><strong>Radiotransparentes em 80% a 85% dos casos</strong> (não são visualizados na radiografia simples de abdome, exigindo ultrassonografia). Apenas 15% calcificam perifericamente tornando-se radiopacos.</td>
    </tr>
    <tr>
      <td><strong>Cálculos Pigmentares Pretos (Black Pigment Stones)</strong></td>
      <td>10% a 15%</td>
      <td>Bilirrubinato de cálcio polimerizado amorfo, sais de fosfato e carbonato de cálcio; conteúdo de colesterol &lt; 20%.</td>
      <td>Formam-se quase que <strong>exclusivamente dentro da vesícula biliar em bile estéril</strong> em vigência de <strong>hipersecreção de bilirrubina não conjugada</strong>. Principais causas: <strong>Hemólise Crônica</strong> (anemia falciforme, esferocitose hereditária, talassemia maior, próteses valvares mecânicas cardíacas), <strong>Cirrose Hepática</strong> com hipertensão portal (hiperesplenismo e redução da conjugação hepática) e fibrose cística.</td>
      <td><strong>Radiopacos em 50% a 70% dos casos</strong> (visíveis ao raio-X simples devido à alta concentração de sais inorgânicos de cálcio).</td>
    </tr>
    <tr>
      <td><strong>Cálculos Pigmentares Castanhos (Brown Pigment Stones)</strong></td>
      <td>5%</td>
      <td>Bilirrubinato de cálcio, palmitato e estearato de cálcio e restos bacterianos; consistência macia e friável ("barro biliar").</td>
      <td>Formam-se <strong>tipicamente "de novo" nos ductos biliares intra e extra-hepáticos</strong> (e não na vesícula) associados a <strong>estase biliar e infecção bacteriana ou parasitária crônica</strong>. As bactérias entéricas (<em>E. coli</em>) e parasitas (<em>Clonorchis sinensis</em>, <em>Opisthorchis</em>, <em>Ascaris lumbricoides</em>) secretam a enzima <strong>beta-glicuronidase bacteriana</strong>, que hidrolisa a bilirrubina conjugada hidrossolúvel, liberando bilirrubina não conjugada que se precipita com íons cálcio livres; secretam também fosfolipases bacterianas que clivam lecitina gerando ácidos graxos livres insolúveis.</td>
      <td><strong>Radiotransparentes</strong> (baixa densidade radiológica; não visíveis ao raio-X simples).</td>
    </tr>
  </tbody>
</table>
`
    },
    {
      id: 'colelitiase-assintomatica-vs-colica-biliar',
      title: '3. História Natural da Colelitíase Assintomática vs Cólica Biliar Simples',
      body_html: `
<h3>História Natural da Colelitíase Assintomática</h3>
<p>Aproximadamente 60% a 80% de todos os indivíduos portadores de cálculos na vesícula biliar permanecem completamente <strong>assintomáticos</strong> por toda a vida. Estudos epidemiológicos de seguimento longitudinal demonstram que o risco anual de um paciente assintomático desenvolver sintomas clínicos de cólica biliar é de apenas <strong>1% a 2% ao ano</strong>, e o risco de evoluir diretamente com uma complicação grave (colecistite, pancreatite ou colangite) sem sintomas prévios é inferior a 0,3% ao ano.</p>
<p><strong>REGRA DE OURO PARA PROVAS:</strong> <strong>Colelitíase assintomática NÃO tem indicação de colecistectomia profilática de rotina na grande maioria dos pacientes!</strong> Recomenda-se apenas orientação clínica e conduta expectante.</p>

<h3>Indicações Formais de Colecistectomia Profilática na Colelitíase Assintomática</h3>
<p>A colecistectomia profilática reserva-se estritamente a situações especiais nas quais o risco cumulativo de câncer de vesícula biliar (adenocarcinoma) ou complicações letais supera os riscos cirúrgicos da videolaparoscopia:</p>
<ul>
  <li><strong>Vesícula em Porcelana:</strong> Calcificação distrófica parietal extensa da parede vesicular decorrente de inflamação crônica. Risco histórico elevado de transformação maligna para adenocarcinoma de vesícula (5% a 15%);</li>
  <li><strong>Pólipos de Vesícula Biliar Associados a Cálculos:</strong> Presença de qualquer pólipo em vesícula com cálculos, ou pólipos isolados com tamanho <strong>&ge; 10 mm (1,0 cm)</strong>, pólipos sésseis de base larga, crescimento documentado em exames seriados ou em pacientes &gt; 50 anos;</li>
  <li><strong>Cálculos Grandes / Volumosos (&gt; 2,5 a 3,0 cm):</strong> O atrito mecânico crônico prolongado de macrocálculos sobre o epitélio mucoso eleva exponencialmente o risco de displasia e adenocarcinoma, além de aumentar o risco de erosão para o duodeno gerando fístula colecistoduodenal e íleo biliar;</li>
  <li><strong>Cálculos Minúsculos (&lt; 2 a 3 mm) associados a ducto cístico amplo:</strong> Risco aumentado de migração trans-cística para o colédoco com pancreatite biliar aguda grave;</li>
  <li><strong>Anemia Hemolítica Crônica Hereditária (ex: Anemia Falciforme, Esferocitose):</strong> Indicação de colecistectomia eletiva programada concomitante à esplenectomia para evitar crises vaso-oclusivas ou colecistites recorrentes que confundem crises álgicas;</li>
  <li><strong>Populações de Altíssimo Risco Epidemiológico de Câncer Biliar:</strong> Nativos indígenas da América do Sul e descendentes andinos (Chile, Bolívia e norte da Argentina);</li>
  <li><strong>Anomalias Congênitas da Junção Biliopancreática:</strong> Junção anômala dos ductos pancreático e biliar fora da parede duodenal com refluxo de suco pancreático e risco maciço de degeneração neoplásica.</li>
</ul>

<h3>A Cólica Biliar Simples: Manifestação e Manejo</h3>
<p>A <strong>cólica biliar simples</strong> é a manifestação clínica inaugural da litíase biliar sintomática não complicada:</p>
<ul>
  <li><strong>Fisiopatologia:</strong> Ocorre a <strong>obstrução mecânica puramente TRANSITÓRIA do ducto cístico</strong> ou infundíbulo por um cálculo móvel. A ingestão de alimentos gordurosos estimula as células I da mucosa do duodeno a liberar o hormônio <strong>Colecistoquinina (CCK)</strong> na corrente sanguínea. A CCK deflagra contração vigorosa do músculo liso da vesícula biliar contra o ducto cístico obstruído pelo cálculo. A elevação súbita da tensão intraluminal estimula fibras C viscerais;</li>
  <li><strong>Perfil Clínico da Dor:</strong>
    <ul>
      <li>Inicia-se tipicamente 30 a 90 minutos após refeição rica em lipídios ou copiosa;</li>
      <li>Localiza-se no <strong>epigástrio e hipocôndrio direito</strong>, irradiando comumente para o dorso, região interescapular ou ângulo inferior da escápula direita (dor referida pelos dermátomos T7-T9);</li>
      <li>Apesar do nome "cólica", a dor atinge um platô de intensidade constante após 15 a 30 minutos e <strong>DURA HABITUALMENTE MENOS DE 4 A 6 HORAS</strong> (média de 1 a 3 horas), cessando espontaneamente ou após antiespasmódicos quando o cálculo desimpacta da bolsa de Hartmann e retorna para o fundo da vesícula;</li>
      <li><em>Importante:</em> Na cólica biliar simples <strong>NÃO HÁ FEBRE, NÃO HÁ SINAIS DE IRRITAÇÃO PERITONEAL (MURPHY NEGATIVO) E O LEUCOGRAMA É RIGOROSAMENTE NORMAL</strong>;</li>
    </ul>
  </li>
  <li><strong>Tratamento da Crise:</strong> Anti-inflamatórios não esteroidais (AINEs como Cetorolaco, Diclofenaco ou Dipirona IV) são mais eficazes que opioides simples porque bloqueiam a síntese local de prostaglandinas mediada pela COX, reduzindo a secreção líquida intraluminal e a pressão vesicular;</li>
  <li><strong>Conduta Definitiva:</strong> Uma vez sintomático com cólica biliar comprovada por ultrassonografia, o paciente apresenta taxa de recorrência sintomática de mais de 70% em 2 anos. Está indicada formalmente a <strong>Colecistectomia Videolaparoscópica Eletiva Programada</strong>.</li>
</ul>
`
    },
    {
      id: 'fisiopatologia-colecistite-litiasica',
      title: '4. Fisiopatologia da Colecistite Aguda Litiásica: Obstrução, Inflamação Química e Infecção Bacteriana',
      body_html: `
<h3>O Mecanismo Fisiopatológico Central da Colecistite Aguda</h3>
<p>Em mais de 90% a 95% dos casos, a <strong>Colecistite Aguda Litiásica</strong> decorre da <strong>obstrução mecânica PERSISTENTE e prolongada (&gt; 6 horas) do ducto cístico ou colo vesicular</strong> por um cálculo biliar impactado firmemente na bolsa de Hartmann. Ao contrário da cólica biliar (onde o cálculo desobstrui espontaneamente), na colecistite aguda o bloqueio luminal desencadeia uma cascata biológica destrutiva em três fases consecutivas:</p>

<h3>1ª Fase — Inflamação Química Inicial Mediada por Fosfolipases</h3>
<p>Com o bloqueio permanente do ducto cístico, o epitélio mucoso da vesícula continua secretando ativamente muco glicoproteico, enquanto a absorção normal de água é bloqueada. A pressão hidrostática intraluminal eleva-se rapidamente para níveis superiores a <strong>40 a 50 cm$H_2O$</strong>, causando distensão vesicular extrema (hidropsia da vesícula biliar):</p>
<ul>
  <li>O estiramento traumático da mucosa deflagra a liberação da enzima tecidual endógena <strong>Fosfolipase $A_2$</strong>;</li>
  <li>A Fosfolipase $A_2$ atua sobre a <em>lecitina (fosfatidilcolina)</em> presente na bile estagnada, convertendo-a em <strong>Lisolecitina</strong>;</li>
  <li>A <strong>Lisolecitina</strong> é um composto altamente detergente, citotóxico e liso-osmótico que destrói diretamente as junções oclusivas e a camada de muco protetor dos enterócitos vesiculares. Simultaneamente, a agressão mecânica estimula a via da ciclooxigenase-2 (COX-2) com síntese maciça de <strong>Prostaglandinas ($PGE_2$ e $PGI_2$)</strong>, que amplificam a vasodilatação, o edema transmural e a transudação de líquido para a luz vesicular, perpetuando o ciclo vicioso de hiperpressão intraluminal.</li>
</ul>

<h3>2ª Fase — Isquemia e Comprometimento Microvascular Parietal</h3>
<p>À medida que a pressão intraluminal supera a pressão de perfusão venular e arteriolar na parede da vesícula (especialmente no fundo, que é o segmento com vascularização terminal mais precária):</p>
<ul>
  <li>Ocorre estase venosa retrógrada, edema transmural acentuado (espessando a parede vesicular para além de 4 a 5 mm com aspecto de duplo halo) e isquemia tecidual focal;</li>
  <li>Sem oxigenação adequada, a mucosa sofre descamação celular, ulceração e necrose isquêmica transmural focal (<strong>Colecistite Gangrenosa</strong>), predispondo à perfuração parietal.</li>
</ul>

<h3>3ª Fase — Proliferação e Invasão Bacteriana Secundária</h3>
<p><strong>DETALHE CRUCIAL DE FISIOPATOLOGIA:</strong> <em>A colecistite aguda litiásica inicia-se como um processo inflamatório puramente QUÍMICO e MECÂNICO asséptico!</em> A infecção bacteriana não é a causa desencadeante da colecistite, mas sim uma complicação secundária sobreposta que ocorre em 50% a 70% dos pacientes dentro de 24 a 72 horas após a impactação inicial do cálculo.</p>
<p>As bactérias ascendem do duodeno através do esfíncter de Oddi ou alcançam a vesícula por translocação hematogênica portal ou linfática. A microbiologia da bile infectada revela flora mista aeróbia e anaeróbia entérica clássica:</p>
<ul>
  <li><strong>Gram-negativos Entéricos (mais prevalentes):</strong>
    <ol>
      <li><strong>Escherichia coli (40% a 50%)</strong> — o patógeno isolado mais frequente;</li>
      <li><strong>Klebsiella pneumoniae (15% a 20%)</strong>;</li>
      <li><em>Enterobacter cloacae</em> e <em>Proteus mirabilis</em> (5% a 10%);</li>
      <li><em>Pseudomonas aeruginosa</em> (em pacientes idosos, imunossuprimidos ou hospitalizados).</li>
    </ol>
  </li>
  <li><strong>Cocos Gram-positivos:</strong>
    <ul>
      <li><strong>Enterococcus faecalis e Enterococcus faecium (10% a 15%)</strong>;</li>
      <li><em>Streptococcus</em> do grupo viridans.</li>
    </ul>
  </li>
  <li><strong>Anaeróbios Estritos (presentes em 15% a 25% dos casos complicados):</strong>
    <ul>
      <li><strong>Bacteroides fragilis</strong> e espécies de <strong>Clostridium</strong> (incluindo <em>Clostridium perfringens</em> na <strong>Colecistite Enfisematosa</strong>, onde bactérias produtoras de gás geram dissecção aérea da parede vesicular).</li>
    </ul>
  </li>
</ul>
`
    },
    {
      id: 'manifestacoes-clinicas-e-murphy',
      title: '5. Manifestações Clínicas e Semiologia Especial: Sinal de Murphy e Diagnósticos Diferenciais',
      body_html: `
<h3>O Quadro Clínico Clássico da Colecistite Aguda</h3>
<p>A colecistite aguda litiásica manifesta-se tipicamente pelo prolongamento sustentado de uma dor que se iniciou com características semelhantes às da cólica biliar, porém que não cede e ultrapassa <strong>6 horas de duração contínua</strong>:</p>
<ul>
  <li><strong>Características da Dor:</strong> Dor de forte intensidade, constante e progressiva, localizada no <strong>hipocôndrio direito (QSD) e epigástrio</strong>, com irradiação clássica para a região interescapular dorsal, dorso inferior e ombro direito (dor de Boas);</li>
  <li><strong>Sintomas Gerais e Digestivos:</strong> Anorexia acentuada, náuseas e vômitos repetidos (em 60% a 70%), plenitude e distensão abdominal superior reflexa;</li>
  <li><strong>Sinais Inflamatórios Sistêmicos:</strong> Presença de <strong>febre baixa a moderada (38,0°C a 38,5°C)</strong>, taquicardia proporcional e mal-estar geral. Picos febris elevados (&gt; 39,0°C) acompanhados de calafrios profusos e instabilidade hemodinâmica sinalizam complicações supurativas graves: <strong>empiema vesicular, gangrena, perfuração com peritonite biliar ou colangite aguda associada</strong>;</li>
  <li><strong>Icterícia na Colecistite:</strong> Em geral, a colecistite não complicada <strong>NÃO cursa com icterícia clínica franca</strong> (bilirrubinas totais normais ou discretamente elevadas &lt; 2 a 3 mg/dL por edema periductal inflamatório sobre o colédoco). <em>A presença de icterícia moderada a grave com colúria e acolia fecal sugere fortemente:</em> 1. Coledocolitíase concomitante (presente em 10-15% dos casos); 2. Colangite aguda ascendente; ou 3. <strong>Síndrome de Mirizzi</strong> (compressão extrínseca do hepático comum).</li>
</ul>

<h3>O Sinal de Murphy Físico Clássico: Técnica e Interpretação</h3>
<p>Descrito pelo cirurgião John Benjamin Murphy, o <strong>Sinal de Murphy</strong> é a manobra propedêutica patognomônica da inflamação aguda da vesícula biliar:</p>
<ol>
  <li><strong>Posicionamento do Paciente e Técnica do Examinador:</strong> O paciente deve ser posicionado em decúbito dorsal relaxado com os joelhos discretamente fletidos. O médico examinador posiciona a ponta dos dedos de sua mão (ou o polegar) profundamente no <strong>ponto cístico</strong> (localizado na interseção entre a margem costal inferior direita e a borda lateral do músculo reto abdominal, correspondendo à 9ª cartilagem costal);</li>
  <li><strong>Execução da Manobra Respiratória:</strong> Mantendo a compressão manual suave e profunda no ponto cístico, solicita-se ao paciente que realize uma <strong>inspiração profunda e lenta</strong>;</li>
  <li><strong>O Fenômeno Semiológico:</strong> Durante a inspiração, a descida fisiológica do diafragma empurra o fígado e a vesícula biliar inflamada para baixo. No momento em que o fundo da vesícula hiperemiada entra em contato mecânico forçado com os dedos do examinador, deflagra-se uma dor lancinante aguda que provoca a <strong>interrupção súbita e reflexa da inspiração profunda (o paciente "trava" a respiração e solta um gemido ou queixa álgica)</strong>;</li>
  <li><strong>Interpretação e Valor Preditivo:</strong> Para que o Sinal de Murphy seja considerado formalmente <em>positivo</em>, deve haver a <strong>interrupção inspiratória involuntária</strong> (apenas referir dor à palpação sem travar a respiração não caracteriza Murphy positivo verdadeiro). O sinal de Murphy possui especificidade de 80% a 95%, embora sua sensibilidade em idosos e diabéticos seja de apenas 50% a 65% em virtude da neuropatia autonômica e atrofia muscular da parede abdominal.</li>
</ol>

<h3>Massa Palpável em Hipocôndrio Direito</h3>
<p>Em cerca de 20% a 35% dos pacientes com mais de 48 a 72 horas de evolução, palpa-se uma <strong>massa dolorosa de consistência firme e limites imprecisos no hipocôndrio direito</strong>. Esta massa corresponde à própria vesícula biliar hidrópica e espessada envolta por aderências fibrinosas espessas do omento maior e do cólon (plastrão vesicular inflamatório).</p>
`
    },
    {
      id: 'criterios-de-toquio-tg18-tg20',
      title: '6. Critérios Diagnósticos e Estratificação de Gravidade segundo as Diretrizes de Tóquio (Tokyo Guidelines - TG18/TG20)',
      body_html: `
<h3>O Papel Universal das Diretrizes de Tóquio</h3>
<p>As <strong>Diretrizes de Tóquio (Tokyo Guidelines — formuladas inicialmente em 2007, atualizadas em 2013 e consolidadas em 2018/2020: TG13/TG18)</strong> são a referência mundial absoluta para a padronização do diagnóstico e classificação de gravidade da Colecistite Aguda. O domínio dos seus critérios é mandatória para concursos de residência médica:</p>

<h3>Critérios Diagnósticos de Colecistite Aguda das Diretrizes de Tóquio (TG18)</h3>
<table class="book-table">
  <thead>
    <tr>
      <th>Grupo de Critérios</th>
      <th>Parâmetros Clínicos, Laboratoriais e Radiológicos Específicos</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>A. Sinais Locais de Inflamação</strong></td>
      <td>1. <strong>Sinal de Murphy Positivo</strong> (físico ou ultrassonográfico);<br>2. <strong>Dor, sensibilidade ou massa palpável no quadrante superior direito (QSD)</strong> / hipocôndrio direito / epigástrio.</td>
    </tr>
    <tr>
      <td><strong>B. Sinais Sistêmicos de Inflamação</strong></td>
      <td>1. <strong>Febre (&gt; 37,8°C - 38,0°C)</strong> ou calafrios;<br>2. <strong>Leucocitose (&gt; 10.000 / $mm^3$) ou leucopenia (&lt; 4.000 / $mm^3$)</strong>;<br>3. <strong>Proteína C Reativa (PCR) elevada (&ge; 3,0 mg/dL ou &ge; 30 mg/L)</strong>.</td>
    </tr>
    <tr>
      <td><strong>C. Achados de Imagem Confirmatórios</strong></td>
      <td>Achados tomográficos, ultrassonográficos ou por RM característicos de colecistite aguda (cálculo impactado, espessamento da parede &gt; 4 mm, líquido pericolecístico, distensão vesicular).</td>
    </tr>
  </tbody>
</table>

<p><strong>Regras de Fechamento Diagnóstico da TG18:</strong></p>
<ul>
  <li><strong>Diagnóstico Suspeito:</strong> Pelo menos <strong>um item de A + um item de B</strong>;</li>
  <li><strong>Diagnóstico Definitivo (Confirmado):</strong> Pelo menos <strong>um item de A + um item de B + confirmação por imagem no item C</strong>.</li>
</ul>

<h3>Classificação de Gravidade da Colecistite Aguda (Tokyo Guidelines TG18)</h3>
<p>A estratificação de gravidade dita diretamente a conduta cirúrgica e o momento ideal da intervenção:</p>
<table class="book-table">
  <thead>
    <tr>
      <th>Grau de Gravidade (TG18)</th>
      <th>Critérios Fisiopatológicos e Clínicos de Definição</th>
      <th>Estratégia Terapêutica Recomendada</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Grau I (Leve)</strong></td>
      <td>Colecistite aguda em paciente saudável, <strong>sem disfunção orgânica de nenhum sistema</strong> e <strong>com apenas alterações inflamatórias leves na vesícula biliar</strong>. O paciente não preenche nenhum critério dos graus II ou III. Apresenta baixo risco cirúrgico operatório.</td>
      <td><strong>Colecistectomia Videolaparoscópica Precoce de Urgência</strong> imediata. Excelente prognóstico.</td>
    </tr>
    <tr>
      <td><strong>Grau II (Moderada)</strong></td>
      <td>Colecistite aguda associada a <strong>grave inflamação local</strong>, mas AINDA SEM disfunção orgânica de órgãos vitais. Definida pela presença de <strong>QUALQUER UM dos seguintes 4 critérios</strong>:
        <ol>
          <li><strong>Leucocitose acentuada (&gt; 18.000 / $mm^3$)</strong>;</li>
          <li><strong>Massa dolorosa palpável no quadrante superior direito</strong>;</li>
          <li><strong>Duração dos sintomas clínicos superior a 72 horas (&gt; 72 horas)</strong>;</li>
          <li><strong>Inflamação local marcante</strong> confirmada por imagem ou cirurgia (colecistite gangrenosa, enfisematosa, abscesso pericolecístico ou peritonite biliar).</li>
        </ol>
      </td>
      <td><strong>Colecistectomia Videolaparoscópica de Urgência Precoce</strong> realizada por cirurgião experiente (procedimento tecnicamente difícil com dissecção complexa). Antibioticoterapia venosa de amplo espectro. Se o paciente apresentar comorbidades cirúrgicas graves que elevem o risco anestésico, pode-se considerar drenagem percutânea (colecistostomia).</td>
    </tr>
    <tr>
      <td><strong>Grau III (Grave)</strong></td>
      <td>Colecistite aguda associada a <strong>DISFUNÇÃO ORGÂNICA de pelo menos UM dos seguintes 6 sistemas vitais</strong>:
        <ol>
          <li><strong>Disfunção Cardiovascular:</strong> Hipotensão arterial que exige infusão de vasopressores (dopamina &ge; 5 $\mu$g/kg/min ou noradrenalina em qualquer dose);</li>
          <li><strong>Disfunção Neurológica:</strong> Rebaixamento do nível de consciência (Glasgow &lt; 15);</li>
          <li><strong>Disfunção Respiratória:</strong> Relação $PaO_2 / FiO_2 &lt; 300$;</li>
          <li><strong>Disfunção Renal:</strong> Oligúria e creatinina sérica &gt; 2,0 mg/dL;</li>
          <li><strong>Disfunção Hepática:</strong> RNI &gt; 1,5 (coagulopatia);</li>
          <li><strong>Disfunção Hematológica:</strong> Plaquetopenia &lt; 100.000 / $mm^3$.</li>
        </ol>
      </td>
      <td>Suporte intensivo em CTI com ressuscitação volêmica e controle de disfunções de órgãos. Antibioticoterapia de amplo espectro (ex: Piperacilina-Tazobactam ou Meropenem). A conduta de urgência padrão para controle imediato do foco infeccioso em pacientes de altíssimo risco cirúrgico é a <strong>Colecistostomia Percutânea Trans-Hepática</strong> de emergência à beira do leito! A colecistectomia precoce só é indicada se houver rápida melhora hemodinâmica e equipe altamente treinada.</td>
    </tr>
  </tbody>
</table>
`
    },
    {
      id: 'padrao-ouro-ultrassonografico',
      title: '7. Propedêutica Armada e Padrão-Ouro Ultrassonográfico: Critérios Ecográficos Maiores e Menores',
      body_html: `
<h3>A Ultrassonografia de Abdome Superior como Padrão-Ouro</h3>
<p>A <strong>Ultrassonografia (USG) de Abdome Superior</strong> é universalmente consagrada como o <strong>exame de imagem de primeira escolha e padrão-ouro indiscutível</strong> para a avaliação diagnóstica da colelitíase e da colecistite aguda litiásica, apresentando sensibilidade entre 90% e 95% e especificidade entre 85% e 90%. É um exame rápido, amplamente disponível, executável à beira do leito, de baixo custo e isento de radiação ionizante e de nefrotoxicidade.</p>

<h3>Critérios Ultrassonográficos Diagnósticos de Colecistite Aguda</h3>
<p>O diagnóstico ecográfico baseia-se na identificação de uma constelação de sinais morfológicos diretos e indiretos que refletem a inflamação e a hipertensão intraluminal da vesícula:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Achado Ultrassonográfico</th>
      <th>Critério Quantitativo / Descritivo</th>
      <th>Significado Fisiopatológico Específico</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Cálculo Biliar Ecotípico</strong></td>
      <td>Imagem hiperecogênica no interior do lúmen vesicular com <strong>sombra acústica posterior nítida e móvel com a mudança de decúbito</strong>.</td>
      <td>Confirma a presença de colelitíase. Na colecistite aguda, o cálculo está <strong>impactado de forma imóvel no colo ou infundíbulo vesicular</strong>.</td>
    </tr>
    <tr>
      <td><strong>Espessamento da Parede Vesicular</strong></td>
      <td><strong>Espessura parietal &gt; 4 mm</strong> (ou &gt; 3 mm com jejum adequado).</td>
      <td>Edema transmural exsudativo inflamatório. Frequentemente exibe aspecto estratificado em <strong>duplo halo hipoecoico</strong> (edema da camada subserosa).</td>
    </tr>
    <tr>
      <td><strong>Sinal de Murphy Ultrassonográfico</strong></td>
      <td>Dor focal aguda extrema provocada pela <strong>pressão mecânica direta do transdutor do ultrassom exatamente sobre a vesícula biliar visualizada na tela</strong>.</td>
      <td>É o <strong>achado ultrassonográfico isolado mais específico (&gt; 95%)</strong> para confirmar que a vesícula visualizada é a verdadeira fonte anatômica da dor do paciente.</td>
    </tr>
    <tr>
      <td><strong>Líquido Pericolecístico</strong></td>
      <td>Faixa anecoica líquida entre a parede externa da vesícula e o parênquima hepático na fossa cística (na ausência de ascite livre generalizada).</td>
      <td>Extravasamento e transudação de fluido inflamatório perivesicular; marcador de inflamação local avançada (risco iminente de perfuração ou microabscessos).</td>
    </tr>
    <tr>
      <td><strong>Sobredistensão Vesicular (Hidropsia)</strong></td>
      <td>Diâmetro longitudinal &gt; 8 a 10 cm e diâmetro transversal &gt; 4 cm.</td>
      <td>Acúmulo de muco e bile sob pressão a montante da obstrução completa do ducto cístico.</td>
    </tr>
    <tr>
      <td><strong>Lama Biliar (Biliary Sludge)</strong></td>
      <td>Ecos puntiformes móveis de baixa amplitude sem sombra acústica posterior formando nível líquido-líquido.</td>
      <td>Estase biliar crônica com microcristais de colesterol e bilirrubinato de cálcio agregados.</td>
    </tr>
  </tbody>
</table>

<h3>Diagnósticos Diferenciais do Espessamento da Parede Vesicular</h3>
<p><strong>ARMADILHA CLÁSSICA DE PROVA:</strong> <em>Nem todo espessamento parietal de vesícula biliar &gt; 4 mm é colecistite aguda!</em> Diversas afecções sistêmicas provocam edema passivo da parede vesicular na ausência total de inflamação primária biliar:</p>
<ul>
  <li><strong>Hepatite Aguda Viral ou Medicamentosa:</strong> Cursa com edema difuso exuberante da parede vesicular secundário à hepatite, frequentemente associado a transaminases &gt; 1.000 U/L e icterícia;</li>
  <li><strong>Cirrose Hepática com Hipertensão Portal e Hipoalbuminemia:</strong> Queda da pressão coloidosmótica com transudação de líquido para a parede;</li>
  <li><strong>Insuficiência Cardíaca Congestiva (ICC Direita / Congestão Sistêmica):</strong> Hipertensão venosa na veia cava inferior e veias supra-hepáticas transmitida retrógradamente para a veia cística;</li>
  <li><strong>Insuficiência Renal Crônica e Síndrome Nefrótica</strong> (anasarca e hipoalbuminemia grave);</li>
  <li><strong>Dengue Grave / Febre Hemorrágica do Dengue:</strong> O extravasamento capilar sistêmico induz espessamento acentuado da parede vesicular (utilizado como marcador ultrassonográfico precoce de gravidade do choque na dengue pediátrica e adulta).</li>
</ul>

<h3>Outros Métodos de Imagem: Tomografia Computadorizada e Cintilografia (HIDA Scan)</h3>
<ul>
  <li><strong>Tomografia Computadorizada (TC) de Abdome:</strong> Excelente para detectar complicações avançadas da colecistite aguda (perfuração com gás extraluminal, abscesso pericolecístico, colecistite enfisematosa e íleo biliar). Todavia, a TC é <em>inferior à ultrassonografia para a detecção de cálculos biliares</em>, pois mais de 75% dos cálculos de colesterol são radiotransparentes e isodensos à bile na TC;</li>
  <li><strong>Cintilografia Biliar com Ácido Iminodiacético Marcado com Tecnécio-99m (HIDA Scan):</strong> É o <strong>exame de imagem com maior acurácia (sensibilidade &gt; 97% e especificidade &gt; 95%)</strong> para o diagnóstico de colecistite aguda. O radiofármaco é captado pelos hepatócitos e excretado na bile. Em condições normais, o traçador preenche a vesícula biliar, o colédoco e o duodeno em até 30 a 60 minutos. Na colecistite aguda, como o ducto cístico está mecanicamente obstruído, <strong>a vesícula biliar NÃO é visualizada (não se enche de contraste)</strong>, enquanto o colédoco e o intestino delgado correm normalmente. Reserva-se para casos de dúvida diagnóstica persistente após USG inconclusivo.</li>
</ul>
`
    },
    {
      id: 'colecistite-alitasica-paciente-critico',
      title: '8. Colecistite Aguda Alitiásica em Pacientes Críticos: Etiopatogenia e Colecistostomia Percutânea',
      body_html: `
<h3>Epidemiologia e Fatores Desencadeantes na UTI</h3>
<p>A <strong>Colecistite Aguda Alitiásica (CAA)</strong> é uma forma fulminante e devastadora de inflamação aguda da vesícula biliar que ocorre na <strong>ausência completa de cálculos biliares no interior da vesícula ou no ducto cístico</strong>. Responde por cerca de 5% a 10% de todas as colecistites agudas, acometendo quase que invariavelmente pacientes gravemente enfermos internados em Unidades de Terapia Intensiva (UTI):</p>
<ul>
  <li><strong>Pacientes de Maior Risco:</strong>
    <ol>
      <li><strong>Grandes Queimados (&gt; 30% a 40% da SCQ)</strong> e politraumatizados graves;</li>
      <li><strong>Pós-operatório imediato de grandes cirurgias cardiovasculares</strong> (com circulação extracorpórea prolongada) e cirurgias aórticas de grande porte;</li>
      <li><strong>Pacientes em Choque Séptico, Hipovolêmico ou Cardiogênico</strong> em uso prolongado de drogas vasoativas vasoconstritoras (noradrenalina, vasopressina);</li>
      <li><strong>Pacientes sob Nutrição Parenteral Total (NPT) prolongada</strong> e jejum oral prolongado em ventilação mecânica invasiva;</li>
      <li>Pacientes imunocomprometidos graves (portadores de HIV/AIDS com infecções oportunistas por citomegalovírus [CMV] ou <em>Cryptosporidium</em>).</li>
    </ol>
  </li>
</ul>

<h3>Fisiopatologia da Colecistite Alitiásica: A Isquemia e a Estase</h3>
<p>A fisiopatologia da CAA decorre de um mecanismo duplo de agressão:</p>
<ol>
  <li><strong>Estase Biliar Maciça com Bile Litogênica Concentrada:</strong> A ausência crônica de estimulação alimentar entérica no duodeno abole a liberação fisiológica de Colecistoquinina (CCK). Sem CCK, a vesícula biliar não se contrai e permanece cronicamente relaxada e imóvel por semanas. A bile acumula-se, sofre absorção excessiva de água e torna-se um lodo biliar viscoso e hiperconcentrado, repleto de sais biliares citotóxicos e lisolecitina que agridem quimicamente o epitélio mucoso;</li>
  <li><strong>Isquemia Microvascular e Hipoperfusão Esplâncnica:</strong> A vesícula biliar recebe suprimento arterial terminal exclusivo através da artéria cística, sem vasos colaterais protetores. Nos pacientes chocados com hipotensão, sepse e altas doses de noradrenalina, a circulação esplâncnica sofre vasoconstrição extrema. A pressão de perfusão na parede vesicular colapsa, deflagrando <strong>isquemia transmural aguda primária</strong>, necrose endotelial microvascular e trombose.</li>
</ol>
<p>Como consequência dessa isquemia primária, a colecistite alitiásica apresenta uma propensão aterradora para evoluir rapidamente com <strong>gangrena de parede (em mais de 50% dos casos) e perfuração precoce</strong>, associada a taxas históricas de mortalidade global entre <strong>30% e 50%</strong>.</p>

<h3>Quadro Clínico e Desafio Diagnóstico na UTI</h3>
<p>O diagnóstico da CAA no paciente de UTI é um dos maiores desafios da medicina intensiva. O paciente frequentemente encontra-se intubado, profundamente sedado, em uso de bloqueadores neuromusculares e analgésicos potentes, sendo incapaz de verbalizar dor ou apresentar sinal de Murphy voluntário. O médico deve suspeitar ativamente de colecistite alitiásica diante de:</p>
<ul>
  <li><strong>Febre de origem indeterminada persistente na UTI</strong> sem foco infeccioso pulmonar, urinário ou de cateter identificado;</li>
  <li><strong>Piora inexplicada de leucocitose</strong> ou trombocitopenia com consumo de plaquetas;</li>
  <li><strong>Necessidade de escalonamento progressivo de drogas vasoativas</strong> em paciente que vinha estável;</li>
  <li>Íleo adinâmico com distensão abdominal inexplicada e elevação discreta de bilirrubinas e enzimas hepáticas.</li>
</ul>

<h3>Achados Ultrassonográficos no CTI</h3>
<p>O diagnóstico é confirmado pelo USG à beira do leito demonstrando ausência de cálculos, vesícula intensamente distendida com volume &gt; 150 mL, <strong>espessamento acentuado da parede vesicular &gt; 4 a 5 mm com edema intramural</strong>, presença de líquido pericolecístico e descolamento mucoso ou gás intramural.</p>

<h3>Conduta Terapêutica de Emergência: A Colecistostomia Percutânea</h3>
<p>Em pacientes críticos de UTI em instabilidade hemodinâmica grave ou falência de múltiplos órgãos, o estresse cirúrgico e anestésico de uma colecistectomia aberta ou laparoscópica de urgência impõe mortalidade inaceitável. O procedimento de escolha indiscutível para o controle emergencial da infecção é a:</p>
<p><strong>Colecistostomia Percutânea Trans-Hepática Guiada por Ultrassonografia ou Tomografia</strong>:</p>
<ul>
  <li>Realizada sob anestesia local e sedação suave à beira do leito na própria UTI;</li>
  <li>Consiste na punção da vesícula biliar através do parênquima hepático (o trajeto trans-hepático através do segmento V é fundamental porque o fígado circundante ancora o cateter e sela o trajeto, impedindo o vazamento de bile livre para o peritônio);</li>
  <li>Introdução de um cateter de drenagem externa em rabo de porco (<em>pigtail</em> 8 a 10 French) com descompressão imediata e aspiração de bile espessa purulenta ou fétida;</li>
  <li>Taxa de resposta clínica dramática com defervescência da febre e desmame de noradrenalina em mais de 85% a 90% dos casos em 24 a 48 horas;</li>
  <li>O cateter deve ser mantido aberto em drenagem por no mínimo 4 a 6 semanas para permitir a maturação de um trajeto fistuloso fibroso firme antes de sua remoção ou realização de colecistectomia eletiva tardia.</li>
</ul>
`
    },
    {
      id: 'complicacoes-graves-e-ileo-biliar',
      title: '9. Complicações Graves da Colecistite: Empiema, Gangrena, Perfuração e Íleo Biliar (Tríade de Rigler)',
      body_html: `
<h3>O Espectro das Complicações Evolutivas</h3>
<p>Quando a colecistite aguda não é tratada precocemente ou ocorre em hospedeiros com baixa reserva fisiológica (idosos e diabéticos), a doença evolui rapidamente para complicações de alta letalidade:</p>

<h3>1. Empiema Vesicular (Colecistite Supurada)</h3>
<p>Ocorre quando a luz da vesícula biliar distendida torna-se completamente preenchida por <strong>pus espesso sob alta pressão</strong> decorrente de proliferação bacteriana descontrolada em alça fechada. O paciente apresenta-se toxêmico, com febre alta em agulha (&gt; 39°C), calafrios intensos, leucocitose acentuada (&gt; 20.000/$mm^3$) com desvio à esquerda e dor intolerável em hipocôndrio direito. Tratamento: antibioticoterapia parenteral imediata associada a colecistectomia de urgência ou colecistostomia percutânea descompressiva.</p>

<h3>2. Colecistite Gangrenosa</h3>
<p>Complicação isquêmica que atinge até 20% a 30% dos pacientes idosos e do sexo masculino com colecistite aguda. A trombose microvascular obliterativa da artéria cística gera necrose transmural irregular em placas da parede da vesícula. <em>Armadilha Semiológica Crucial:</em> Como a necrose transmural destrói as terminações nervosas sensoriais da parede vesicular, <strong>o Sinal de Murphy pode tornar-se paradoxalmente NEGATIVO na colecistite gangrenosa</strong>, mascarando a gravidade extrema da afecção!</p>

<h3>3. Perfuração da Vesícula Biliar (Classificação de Niemeier)</h3>
<p>Acomete cerca de 5% a 10% dos casos, decorrente da ruptura de uma área de necrose transmural. Classifica-se classicamente em três tipos conforme Niemeier (1934):</p>
<ul>
  <li><strong>Niemeier Tipo 1 (Perfuração Livre para o Peritônio):</strong> Ruptura aguda súbita da parede com extravasamento maciço de bile purulenta para a cavidade peritoneal. Ocorre peritonite biliar química e bacteriana difusa violenta, choque séptico fulminante e abdome em tábua. Mortalidade superior a 30%;</li>
  <li><strong>Niemeier Tipo 2 (Perfuração Bloqueada / Subaguda):</strong> A ruptura ocorre de forma lenta e é contida pelo grande omento e alças adjacentes, formando um <strong>abscesso pericolecístico</strong> no leito hepático da fossa cística;</li>
  <li><strong>Niemeier Tipo 3 (Perfuração Crônica com Fístula Colecistoentérica):</strong> A inflamação crônica e a isquemia contínua promovem aderência firme da vesícula biliar a uma víscera oca vizinha, com erosão progressiva e abertura de uma fístula biliar interna.</li>
</ul>

<h3>4. A Fístula Colecistoentérica e o Íleo Biliar</h3>
<p>A <strong>fístula colecistoentérica</strong> mais comum é a <strong>fístula colecistoduodenal</strong> (em 70% a 80% dos casos, decorrente da contiguidade anatômica entre o fundo/corpo da vesícula e a primeira ou segunda porção do duodeno), seguida pela fístula colecistocólica (15% a 20%) e colecistogástrica (5%). A abertura dessa fístula interna acarreta duas manifestações patológicas clássicas:</p>

<h3>O Íleo Biliar e a Tríade de Rigler</h3>
<p>O <strong>íleo biliar</strong> é uma forma singular de abdome agudo obstrutivo mecânico de intestino delgado provocada pela <strong>impactação intraluminal de um cálculo biliar volumoso (habitualmente com diâmetro &ge; 2,5 cm)</strong> que migrou da vesícula biliar para o duodeno através de uma fístula colecistoduodenal:</p>
<ul>
  <li><strong>Epidemiologia:</strong> Tipicamente acomete <strong>mulheres idosas (&gt; 70 a 75 anos)</strong> com história pregressa de múltiplos episódios de cólica biliar mal controlados;</li>
  <li><strong>Sítio Anatômico de Impactação:</strong> O cálculo transita livremente pelo duodeno e jejuno graças ao calibre amplo dessas alças. O bloqueio mecânico obstrutivo ocorre caracteristicamente na porção mais estreita e com peristaltismo menos vigoroso de todo o trato digestivo: o <strong>Íleo Terminal (imediatamente proximal à Válvula Ileocecal) em mais de 60% a 70% dos casos</strong> (outros sítios raros incluem o duodeno na <em>Síndrome de Bouveret</em> e o sigmoide estenosado);</li>
  <li><strong>Apresentação Clínica:</strong> O paciente apresenta sintomas obstrutivos intermitentes ("obstrução em degraus" ou "rolamento"), com dor em cólica, vômitos e alívio transitório conforme o cálculo progride e trava temporariamente nas alças, até fixar-se definitivamente no íleo distal com parada de fezes e distensão abdominal;</li>
  <li><strong>A Tríade de Rigler ao Raio-X e Tomografia Computadorizada (Marca de Prova):</strong>
    <ol>
      <li><strong>Pneumobilia (Aerobilia):</strong> Presença de ar no interior da árvore biliar intra-hepática ou ducto colédoco, decorrente da comunicação anômala direta com o trato digestivo através da fístula colecistoduodenal;</li>
      <li><strong>Cálculo Biliar Ectópico Radiopaco:</strong> Visualização de um cálculo biliar calcificado fora da sua topografia normal, repousando na fossa ilíaca direita ou pelve profunda;</li>
      <li><strong>Distensão Mecânica de Delgado com Níveis Hidroaéreos:</strong> Sinais radiológicos típicos de obstrução de intestino delgado a montante do ponto de impacto ileal.</li>
    </ol>
  </li>
  <li><strong>Conduta Cirúrgica no Íleo Biliar:</strong> Em pacientes idosas e fragilizadas com obstrução intestinal e desidratação, o objetivo cirúrgico primordial e prioritário é <strong>RESOLVER A OBSTRUÇÃO INTESTINAL IMEDIATAMENTE (Enterolitotomia)</strong>: realiza-se laparotomia ou laparoscopia com incisão longitudinal na borda antimesentérica do íleo viável imediatamente proximal ao cálculo impactado, ordenha e extração do cálculo, e sutura transversa da alça (enterorrafia). <strong>NÃO SE DEVE TENTAR ABORDAR A VESÍCULA BILIAR OU DESFAZER A FÍSTULA COLECISTODUODENAL NA CIRURGIA DE URGÊNCIA</strong>, pois a dissecção em tecido intensamente inflamado eleva a mortalidade cirúrgica para mais de 20% a 30%! O fechamento da fístula e colecistectomia só são programados tardiamente em segundo tempo se o paciente persistir sintomático.</li>
</ul>
`
    },
    {
      id: 'sindrome-de-mirizzi-e-csendes',
      title: '10. Síndrome de Mirizzi e Fístulas Biliares: Classificação de Csendes e Manejo Cirúrgico',
      body_html: `
<h3>Conceito e Fisiopatologia da Síndrome de Mirizzi</h3>
<p>Descrita em 1948 pelo cirurgião argentino Pablo Luis Mirizzi, a <strong>Síndrome de Mirizzi</strong> é uma complicação crônica rara da colelitíase (incidência de 0,5% a 1,5% de todos os pacientes submetidos a colecistectomia) caracterizada pela <strong>impactação de um grande cálculo biliar no infundíbulo vesicular (bolsa de Hartmann) ou no ducto cístico, provocando compressão mecânica extrínseca sobre o Ducto Hepático Comum</strong>, resultando em dilatação biliar a montante e icterícia obstrutiva colestática.</p>
<p>Fatores anatômicos predisponentes incluem um <em>ducto cístico longo que trafega paralelamente ao ducto hepático comum</em> compartilhado por uma bainha conectiva fibrosa comum. O processo inflamatório crônico de repetição associado ao atrito mecânico contínuo do cálculo sobre a parede do ducto hepático comum causa isquemia transmural, erosão tecidual e necrose progressiva, culminando na formação de uma <strong>fístula colecistobiliar interna</strong> (comunicação direta entre o lúmen da vesícula e a via biliar principal).</p>

<h3>A Classificação de Csendes (Tipos I a V)</h3>
<p>Em 1989, Attila Csendes padronizou a classificação anatômica que dita a complexidade técnica e a conduta cirúrgica específica da Síndrome de Mirizzi (atualizada em 2008 para incluir a fístula colecistoentérica):</p>
<table class="book-table">
  <thead>
    <tr>
      <th>Tipo (Classificação de Csendes)</th>
      <th>Descrição Anatômica da Lesão</th>
      <th>Grau de Erosão / Comunicação Fistulosa</th>
      <th>Conduta Cirúrgica Preconizada</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Tipo I</strong></td>
      <td><strong>Compressão extrínseca simples</strong> do ducto hepático comum por cálculo impactado no cístico/infundíbulo.</td>
      <td><strong>Sem fístula colecistobiliar</strong> (a parede da via biliar principal está absolutamente íntegra).</td>
      <td>Colecistectomia parcial ou total (preferencialmente laparoscópica com dissecção cuidadosa) + remoção do cálculo obstrutivo.</td>
    </tr>
    <tr>
      <td><strong>Tipo II</strong></td>
      <td>Presença de <strong>fístula colecistobiliar estabelecida</strong>.</td>
      <td>O orifício fistuloso compromete <strong>menos de um terço (&lt; 33%)</strong> da circunferência da via biliar principal.</td>
      <td>Colecistectomia subtotal (preservando o folheto do coto vesicular ao redor da fístula) + fechamento da fístula sobre <strong>Dreno de Kehr (Tubo em T)</strong> exteriorizado por contra-abertura no colédoco distal.</td>
    </tr>
    <tr>
      <td><strong>Tipo III</strong></td>
      <td>Presença de fístula colecistobiliar intermediária.</td>
      <td>O orifício fistuloso compromete entre <strong>um terço e dois terços (33% a 66%)</strong> da circunferência da via biliar principal.</td>
      <td>Fechamento do defeito com retalho da parede vesicular viável sobre Dreno de Kehr ou, se bordas friáveis/estenose, <strong>Derivação Biliodigestiva (Hepaticojejunostomia em Y de Roux)</strong>.</td>
    </tr>
    <tr>
      <td><strong>Tipo IV</strong></td>
      <td>Destruição transmural completa da via biliar principal.</td>
      <td>A fístula compromete <strong>mais de dois terços (&gt; 66%) da circunferência</strong> do ducto hepático comum, fundindo completamente o colo da vesícula ao colédoco em bloco com perda de substância ductal.</td>
      <td><strong>Derivação Biliodigestiva Obrigatória: Hepaticojejunostomia em Y de Roux término-lateral</strong> sobre alça jejunal exclusa. O reparo primário com Kehr é formalmente contraindicado pelo risco de estenose cicatricial completa da via biliar.</td>
    </tr>
    <tr>
      <td><strong>Tipo V</strong></td>
      <td>Qualquer um dos Tipos I a IV associado à presença concomitante de <strong>Fístula Colecistoentérica</strong>.</td>
      <td>- <strong>Tipo Va:</strong> Sem íleo biliar.<br>- <strong>Tipo Vb:</strong> Com íleo biliar associado.</td>
      <td>Tratamento do íleo biliar se presente (enterolitotomia) associado ao manejo escalonado da fístula biliar conforme os princípios dos tipos I a IV.</td>
    </tr>
  </tbody>
</table>

<h3>Apresentação Clínica e Suspeita Pré-Operatória</h3>
<p>O paciente manifesta-se com quadro clássico de colecistite ou cólicas biliares recorrentes associadas a <strong>icterícia colestática progressiva, colúria e prurido</strong>, mimetizando perfeitamente coledocolitíase ou colangiocarcinoma hilar (Tumor de Klatskin). A <strong>Colangiorressonância Magnética (CPRM)</strong> é o exame padrão-ouro não invasivo de escolha pré-operatória: evidencia cálculo impactado no colo vesicular, dilatação proeminente das vias biliares intra-hepáticas e do ducto hepático comum até o ponto de compressão extrínseca lateral, com calibre normal ou colabado do colédoco distal.</p>
`
    },
    {
      id: 'tratamento-cirurgico-laparoscopico-precoce',
      title: '11. Tratamento Cirúrgico: Colecistectomia Videolaparoscópica Precoce de Urgência, Tempo Ideal e Cuidados Técnicos',
      body_html: `
<h3>O Dogma Quebrado: Cirurgia Precoce vs Cirurgia Tardia</h3>
<p>Durante décadas, imperou na cirurgia geral o dogma conservador de internar o paciente com colecistite aguda, "esfriar o processo" com antibioticoterapia venosa e repouso intestinal por 6 a 8 semanas, e operá-lo eletivamente após a resolução da inflamação. Múltiplos ensaios clínicos randomizados multicêntricos internacionais e metanálises da Colaboração Cochrane sepultaram definitivamente essa conduta retrógrada:</p>
<p><strong>A DIRETRIZ VIGENTE MUNDIAL (TG18, WSES e CBC) RECOMENDA FORTEMENTE:</strong><br>
<strong>A Colecistectomia Videolaparoscópica PRECOCE de Urgência realizada nas primeiras 24 a 72 horas da admissão hospitalar (e até 7 a 10 dias do início dos sintomas) é o tratamento de escolha padrão-ouro absoluto!</strong></p>

<h3>Por que a Cirurgia Precoce é Incontestavelmente Superior?</h3>
<ol>
  <li><strong>Existência de um Plano de Clivagem Edematoso Favorável:</strong> Nas primeiras 72 horas pós-impactação, a inflamação transmural manifesta-se predominantemente por <em>edema aquoso frouxo</em> entre a vesícula e o leito hepático. Esse edema atua como um plano de clivagem hidráulico natural que facilita a divulsão e dissecação dos tecidos; após 7 a 10 dias, esse edema frouxo é substituído por tecido de granulação denso, neovascularização friável e fibrose cicatricial densa em bloco ("vesícula colada"), que dificulta a identificação anatômica e multiplica o risco de hemorragias e lesão iatrogênica da via biliar;</li>
  <li><strong>Redução Drástica do Tempo Total de Hospitalização:</strong> Evita duas internações hospitalares consecutivas, reduz custos financeiros para o sistema de saúde e permite o retorno precoce ao trabalho em 7 a 14 dias;</li>
  <li><strong>Eliminação das Falhas do Tratamento Clínico:</strong> Cerca de 20% a 25% dos pacientes tratados conservadoramente para "esfriar o processo" apresentam falha terapêutica precoce durante a mesma internação (com perfuração, sepse biliar ou empiema exigindo laparotomia de emergência desfavorável), e outros 15% sofrem recorrências agudas graves durante o período de espera domiciliar;</li>
  <li><strong>Equivalência de Complicações e Taxas de Conversão:</strong> A cirurgia precoce apresenta a mesma taxa de lesão de via biliar (&lt; 0,3% a 0,5%) e taxa de mortalidade (&lt; 0,5%) da cirurgia eletiva tardia quando executada sob princípios da Visão Crítica de Strasberg.</li>
</ol>

<h3>Manobras Cirúrgicas em Casos Difíceis ("Vesícula Hostil")</h3>
<p>Quando o cirurgião depara-se com uma vesícula intensamente inflamada, tensa, gangrenada ou com anatomia distorcida:</p>
<ul>
  <li><strong>Descompressão por Punção Aspirativa Inicial:</strong> A vesícula hidrópica tensa não pode ser apreendida com pinças laparoscópicas convencionais (a pinça escorrega ou rasga a parede friável). Deve-se realizar a <strong>punção descompressiva prévia com agulha longa de aspiração percutânea</strong> introduzida pelo hipocôndrio, aspirando todo o conteúdo mucopurulento ou biliar sob pressão. Isso colaba a vesícula, permitindo tração firme e segura do infundíbulo para expor o trígono de Calot;</li>
  <li><strong>Colecistectomia Subtotal (Técnica de Resgate de Segurança):</strong> Se houver inflamação extrema, fusão fibrosa do trígono hepatocístico ou "fossa congelada" onde a dissecção anatômica colocar a integridade do colédoco em risco iminente, <strong>o cirurgião NUNCA deve insistir em dissecções às cegas</strong>. Deve-se realizar a <strong>Colecistectomia Subtotal (reconstituinte ou fenestrada)</strong>: abre-se a vesícula, removem-se todos os cálculos da luz, resseca-se o fundo e todo o corpo anterior da vesícula, deixando o folheto posterior aderido ao leito hepático, e fecha-se o coto infundibular por sutura interna ou mantém-se dreno sub-hepático tubular. É uma manobra de maturidade cirúrgica que salva a via biliar do paciente!</li>
</ul>
`
    },
    {
      id: 'casos-clinicos-estruturados-colecistite',
      title: '12. Casos Clínicos Estruturados e Discussões Práticas Baseadas em Evidências',
      body_html: `
<div class="book-case">
  <h3>Caso Clínico 1: Colecistite Aguda Litiásica Típica com Sinal de Murphy</h3>
  <p><strong>Identificação:</strong> Mulher de 44 anos, multípara (G3P3), obesa (IMC: 33 kg/m²), procura a emergência com dor no quadrante superior direito do abdome iniciada há 18 horas após jantar em uma churrascaria.</p>
  <p><strong>Exame Físico:</strong> Lúcida, afebril (Temp: 37,9°C), FC: 98 bpm, PA: 130/80 mmHg, anictérica. Abdome globoso, doloroso à palpação profunda no hipocôndrio direito. <strong>Durante a palpação profunda do ponto cístico, a paciente interrompe subitamente a inspiração profunda por dor intensa (Sinal de Murphy positivo nítido)</strong>. Ausência de descompressão dolorosa nos demais quadrantes.</p>
  <p><strong>Exames Laboratoriais:</strong> Leucograma revelando 13.500 leucócitos/$mm^3$ com 7% de bastões. Proteína C Reativa (PCR): 45 mg/L (VR &lt; 5). Bilirrubina Total: 1,1 mg/dL, AST: 28 U/L, ALT: 32 U/L, Fosfatase Alcalina: 85 U/L, Amilase: 42 U/L.</p>
  <p><strong>Ultrassonografia de Abdome Superior:</strong> Vesícula biliar distendida, contendo múltiplos cálculos móveis e um <strong>cálculo de 18 mm firmemente impactado no colo vesicular</strong> com sombra acústica posterior. <strong>Parede vesicular espessada medindo 5,5 mm</strong> com aspecto em duplo halo hipoecoico. Presença de discreta lâmina de líquido pericolecístico na fossa hepática. Sinal de Murphy ecográfico positivo. Colédoco com calibre de 4 mm sem cálculos.</p>
  
  <h4>Discussão Clínica Passo a Passo:</h4>
  <p><strong>1. Aplicação dos Critérios de Tóquio (TG18):</strong></p>
  <ul>
    <li>Critério A (Inflamação Local): Sinal de Murphy positivo e dor em QSD presentes;</li>
    <li>Critério B (Inflamação Sistêmica): Leucocitose (13.500) e PCR elevada (45 mg/L) presentes;</li>
    <li>Critério C (Imagem Confirmatória): Cálculo impactado, parede de 5,5 mm e líquido pericolecístico;</li>
    <li><strong>Diagnóstico: Colecistite Aguda Litiásica Confirmada (TG18)</strong>.</li>
  </ul>
  <p><strong>2. Classificação de Gravidade (TG18):</strong> O paciente não possui disfunções orgânicas (não é Grau III) e não apresenta leucócitos &gt; 18.000, massa palpável ou sintomas &gt; 72h (não é Grau II). Enquadra-se como <strong>Grau I (Leve)</strong>.</p>
  <p><strong>3. Conduta Terapêutica Definitiva:</strong> Internação, jejum, hidratação venosa com cristaloides, analgesia com AINEs e <strong>Colecistectomia Videolaparoscópica Precoce de Urgência realizada nas primeiras 24 horas da admissão</strong> sob antibioticoprofilaxia na indução. Cirurgia transcorreu sem intercorrências com Visão Crítica de Strasberg demonstrada. Alta no 1º DPO.</p>
</div>

<div class="book-case">
  <h3>Caso Clínico 2: Colecistite Alitiásica em Paciente de Terapia Intensiva</h3>
  <p><strong>Identificação:</strong> Homem de 61 anos, vítima de politraumatismo grave com fratura pélvica e contusão pulmonar há 14 dias, internado na UTI em ventilação mecânica, sedado e sob Nutrição Parenteral Total exclusiva desde a admissão.</p>
  <p><strong>Evolução no CTI:</strong> Nas últimas 24 horas, o paciente que vinha afebril e com doses mínimas de vasopressores passa a apresentar picos térmicos de 38,8°C e piora hemodinâmica súbita, exigindo escalonamento de noradrenalina de 0,05 para 0,45 $\mu$g/kg/min. Exames de rotina: leucócitos subiram de 9.000 para 23.000/$mm^3$, plaquetas caíram para 85.000/$mm^3$, bilirrubina total de 2,8 mg/dL com predomínio direto. Culturas de sangue, urina e aspirado traqueal coletadas sem foco bacteriano evidente.</p>
  <p><strong>Ultrassonografia à Beira do Leito na UTI:</strong> Vesícula biliar intensamente sobredistendida (medindo 11 x 5 cm), <strong>completamente anecoica e sem nenhum cálculo ou sombra acústica na luz</strong>. Parede vesicular espessada medindo 6,5 mm, com halo hipoecoico intramural e lâmina de líquido pericolecístico volumosa na fossa cística.</p>
  
  <h4>Discussão Clínica Passo a Passo:</h4>
  <p><strong>1. Fisiopatologia e Diagnóstico:</strong> Trata-se de uma <strong>Colecistite Aguda Alitiásica (CAA)</strong> clássica em paciente crítico. A conjunção de NPT prolongada (estase biliar por ausência de CCK) somada à hipoperfusão esplâncnica por choque e drogas vasoativas deflagrou isquemia transmural da vesícula;</p>
  <p><strong>2. Gravidade (TG18):</strong> Apresenta disfunção cardiovascular (necessidade de altas doses de noradrenalina) e plaquetopenia &lt; 100.000, enquadrando-se como <strong>Grau III (Grave)</strong>;</p>
  <p><strong>3. Tomada de Decisão Cirúrgica de Emergência:</strong> O paciente encontra-se em choque séptico refratário instável, proibindo o estresse cirúrgico de uma laparotomia ou colecistectomia laparoscópica. A conduta salvadora de escolha é a <strong>Colecistostomia Percutânea Trans-Hepática Guiada por Ultrassonografia à Beira do Leito</strong> na UTI associada a Piperacilina-Tazobactam. A descompressão imediata drenou 80 mL de secreção purulenta espessa, permitindo defervescência e desmame gradual da noradrenalina em 36 horas.</p>
</div>

<div class="book-case">
  <h3>Caso Clínico 3: Íleo Biliar e a Tríade de Rigler em Paciente Idosa</h3>
  <p><strong>Identificação:</strong> Mulher de 79 anos, hipertensa, com histórico de múltiplos episódios de dor em hipocôndrio direito nos últimos 5 anos atribuídos a "gastrite", dá entrada na emergência com parada de eliminação de fezes e gases há 3 dias, associada a vômitos fecaloides e dor abdominal difusa em cólica.</p>
  <p><strong>Exame Físico:</strong> Desidratada (3+/4+), afebril, abdome difusamente distendido, hipertimpânico à percussão, ruídos hidroaéreos com timbres metálicos de luta, sem sinais de peritonite localizada.</p>
  <p><strong>Radiografia e Tomografia Computadorizada de Abdome:</strong> Demonstram dilatação proeminente de múltiplas alças de intestino delgado com níveis hidroaéreos escalonados, <strong>presença de ar desenhando as vias biliares intra-hepáticas (pneumobilia / aerobilia)</strong> e uma <strong>massa intraluminal calcificada ovalada medindo 3,2 cm impactada no íleo terminal</strong> a cerca de 15 cm da válvula ileocecal.</p>
  
  <h4>Discussão Clínica Passo a Passo:</h4>
  <p><strong>1. Diagnóstico Sindrômico e Fisiopatológico:</strong> Trata-se de um <strong>Abdome Agudo Obstrutivo por Íleo Biliar</strong>. A paciente desenvolveu uma fístula colecistoduodenal crônica que permitiu a passagem de um megacálculo de 3,2 cm para a luz digestiva, o qual migrou e obstruiu mecanicamente o íleo terminal;</p>
  <p><strong>2. Reconhecimento da Tríade de Rigler:</strong> 1. Pneumobilia; 2. Cálculo ectópico radiopaco no quadrante inferior direito; 3. Distensão mecânica de delgado com níveis hidroaéreos;</p>
  <p><strong>3. Conduta Cirúrgica de Emergência:</strong> Ressuscitação volêmica vigorosa, passagem de sonda nasogástrica descompressiva e <strong>Laparotomia Exploradora Imediata para Enterolitotomia</strong>: incisão longitudinal na borda antimesentérica do íleo viável imediatamente proximal ao cálculo, extração do cálculo de 3,2 cm e enterorrafia transversa. <em>Proscrição cirúrgica de urgência:</em> Não se deve manipular a vesícula biliar ou desfazer a fístula duodenal neste momento para não elevar a morbimortalidade da idosa fragilizada.</p>
</div>

<div class="book-case">
  <h3>Caso Clínico 4: Síndrome de Mirizzi Tipo II</h3>
  <p><strong>Identificação:</strong> Homem de 55 anos apresenta histórico de dor em hipocôndrio direito há 1 mês que evoluiu nos últimos 7 dias com icterícia progressiva nas escleras, colúria e febre baixa de 37,8°C.</p>
  <p><strong>Exames Laboratoriais:</strong> Bilirrubina Total de 8,4 mg/dL com Bilirrubina Direta de 7,2 mg/dL. Fosfatase Alcalina: 480 U/L (VR &lt; 120), Gama-GT: 510 U/L (VR &lt; 50). Leucócitos: 11.200/$mm^3$.</p>
  <p><strong>Colangiorressonância Magnética (CPRM):</strong> Revela vesícula biliar retraída de paredes espessadas contendo um grande cálculo de 2,5 cm impactado no infundíbulo/ducto cístico. O cálculo exerce compressão extrínseca e <strong>erosão parcial sobre a parede lateral do ducto hepático comum</strong>, com comunicação fistulosa estimada em cerca de 25% da circunferência ductal. Há dilatação acentuada das vias biliares intra-hepáticas a montante da obstrução e colédoco distal com calibre fino de 4 mm sem coledocolitíase intraluminal.</p>
  
  <h4>Discussão Clínica Passo a Passo:</h4>
  <p><strong>1. Diagnóstico e Classificação de Csendes:</strong> <strong>Síndrome de Mirizzi Tipo II</strong> (presença de fístula colecistobiliar que compromete menos de um terço [&lt; 33%] da circunferência do ducto hepático comum);</p>
  <p><strong>2. Planejamento Cirúrgico:</strong> Laparotomia subcostal direita com dissecção cuidadosa da vesícula biliar. Realizada <strong>Colecistectomia Subtotal</strong> preservando um retalho da parede do colo vesicular adjacente à fístula, extração do grande cálculo sob visão direta e <strong>fechamento primário do orifício fistuloso sobre um Dreno de Kehr (tubo em T)</strong> exteriorizado distalmente no colédoco. Colangiografia pós-operatória pelo Kehr após 3 semanas revelou vias biliares pérvias sem extravasamentos ou estenoses, permitindo a retirada segura do dreno.</p>
</div>
`
    },
    {
      id: 'questoes-comentadas-residencia-colecistite',
      title: '13. Questões Comentadas de Residência Médica e Revalida/ENAMED',
      body_html: `
<div class="book-case">
  <p><strong>Questão 1 (Residência Médica / USP / ENARE):</strong><br>
  Mulher de 42 anos, previamente hígida, procura o pronto-atendimento com dor em cólica no hipocôndrio direito iniciada há cerca de 12 horas, acompanhada de náuseas, vômitos e febre de 38,2°C. Ao exame físico: lúcida, afebril no momento, FC: 102 bpm, anictérica. Palpação abdominal evidencia dor localizada no hipocôndrio direito com interrupção abrupta da inspiração profunda durante a compressão do ponto cístico (Sinal de Murphy positivo). Exames laboratoriais: leucócitos de 14.200/$mm^3$ com 6% de bastões e PCR de 38 mg/L. A ultrassonografia confirma cálculo de 15 mm impactado no colo da vesícula, espessamento da parede de 5,0 mm e ausência de dilatação de vias biliares. Segundo as Diretrizes de Tóquio vigentes (TG18), qual é o diagnóstico, a classificação de gravidade e o momento cirúrgico preconizado?</p>
  
  <p>A) Colecistite Aguda Grau II (Moderada); indicar drenagem percutânea por colecistostomia.<br>
  B) Colecistite Aguda Grau I (Leve); indicar Colecistectomia Videolaparoscópica precoce de urgência nas primeiras 24 a 72 horas.<br>
  C) Cólica biliar simples; prescrever antiespasmódicos e indicar colecistectomia ambulatorial após 6 semanas.<br>
  D) Colecistite Aguda Grau III (Grave); internar em CTI e iniciar meropenem em monoterapia.<br>
  E) Coledocolitíase primária; indicar CPRE com papilotomia prévia mandatória antes de qualquer cirurgia.</p>
  
  <h4>Comentário Detalhado:</h4>
  <p><strong>Alternativa Correta: B.</strong></p>
  <ul>
    <li>A paciente preenche todos os critérios das <strong>Diretrizes de Tóquio (TG18)</strong> para Colecistite Aguda: Sinal de Murphy e dor em QSD (Critério A) + Febre, leucocitose e PCR elevada (Critério B) + Cálculo impactado e parede &gt; 4 mm ao USG (Critério C);</li>
    <li><em>Classificação de Gravidade TG18:</em> A paciente NÃO apresenta disfunção orgânica de nenhum sistema (não é Grau III) e NÃO apresenta leucócitos &gt; 18.000, massa dolorosa palpável ou duração &gt; 72h (não é Grau II). Trata-se de <strong>Grau I (Leve)</strong>;</li>
    <li>A diretriz contemporânea mundial recomenda categoricamente a <strong>Colecistectomia Videolaparoscópica Precoce de Urgência</strong> realizada nas primeiras 24 a 72 horas da admissão (e não postergar para esfriar o processo por semanas).</li>
  </ul>
</div>

<div class="book-case">
  <p><strong>Questão 2 (SUS-SP / Revalida INEP):</strong><br>
  Em relação à colecistite aguda alitiásica (CAA), assinale a alternativa INCORRETA:</p>
  
  <p>A) Acomete tipicamente pacientes internados em terapia intensiva, politraumatizados graves, grandes queimados e indivíduos em jejum oral prolongado sob nutrição parenteral.<br>
  B) A ausência de contração vesicular mediada por colecistoquinina (CCK) gera estase biliar extrema com bile hiperconcentrada e tóxica.<br>
  C) Apresenta evolução clínica habitualmente benigna com baixíssima incidência de gangrena e perfuração vesicular quando comparada à forma litiásica.<br>
  D) A isquemia microvascular induzida por choque circulatório e uso de vasopressores é um dos pilares fisiopatológicos centrais.<br>
  E) Em pacientes hemodinamicamente instáveis, a colecistostomia percutânea trans-hepática à beira do leito é o procedimento de escolha para controle da sepse.</p>
  
  <h4>Comentário Detalhado:</h4>
  <p><strong>Alternativa Incorreta: C.</strong></p>
  <ul>
    <li>Ao contrário do que afirma a proposição C, a colecistite alitiásica é uma doença <strong>altamente agressiva e de extrema gravidade</strong>, com evolução clínica rápida para <strong>gangrena de parede em mais de 50% dos casos</strong> e perfuração precoce, acarretando taxas de mortalidade alarmantes entre 30% e 50%;</li>
    <li>Todas as demais alternativas (A, B, D e E) estão absolutamente corretas e sintetizam com rigor a fisiopatologia e o manejo intensivo da CAA.</li>
  </ul>
</div>

<div class="book-case">
  <p><strong>Questão 3 (UNICAMP / Cirurgia Geral):</strong><br>
  Mulher de 82 anos, com histórico de colelitíase sintomática de longa data sem acompanhamento regular, é trazida com parada de eliminação de fezes e gases há 4 dias, vômitos biliosos escuros frequentes e distensão abdominal. A radiografia simples e tomografia de abdome demonstram pneumobilia intra-hepática, alças de intestino delgado intensamente distendidas com níveis hidroaéreos e uma imagem ovalada densamente calcificada de 3 cm no quadrante inferior direito. Qual é a denominação dessa tríade radiológica e qual a conduta cirúrgica de emergência preconizada?</p>
  
  <p>A) Tríade de Charcot; indicar CPRE com papilotomia e passagem de prótese biliar imediata.<br>
  B) Tríade de Rigler; indicar laparotomia com enterolitotomia para desobstrução mecânica do delgado.<br>
  C) Pêntade de Reynolds; indicar descompressão biliar urgente por drenagem percutânea trans-hepática.<br>
  D) Tríade de Virchow; iniciar anticoagulação plena com heparina e trombolítico.<br>
  E) Tríade de Saint; indicar colecistectomia laparoscópica associada a colectomia direita em tempo único.</p>
  
  <h4>Comentário Detalhado:</h4>
  <p><strong>Alternativa Correta: B.</strong></p>
  <ul>
    <li>O quadro descreve com perfeição a <strong>Tríade de Rigler</strong> (pneumobilia + cálculo biliar ectópico calcificado + distensão de intestino delgado com níveis hidroaéreos), patognomônica de <strong>Íleo Biliar</strong> secundário a fístula colecistoentérica (colecistoduodenal);</li>
    <li>Em paciente idosa e fragilizada com obstrução intestinal estabelecida, a conduta de emergência consiste na <strong>Enterolitotomia isolada</strong> (incisão no íleo proximal à obstrução, extração do cálculo e enterorrafia);</li>
    <li>A correção da fístula e a colecistectomia NÃO devem ser realizadas na urgência para evitar mortalidade cirúrgica proibitiva.</li>
  </ul>
</div>

<div class="book-case">
  <p><strong>Questão 4 (ENARE / Cirurgia do Aparelho Digestivo):</strong><br>
  Homem de 58 anos apresenta icterícia colestática flutuante associada a dor em hipocôndrio direito. A colangiorressonância revela um cálculo volumoso de 2,2 cm impactado no infundíbulo vesicular que comprime e estenosa o ducto hepático comum, com orifício de fístula colecistobiliar estimado em cerca de 50% da circunferência ductal. Segundo a classificação de Csendes para a Síndrome de Mirizzi, qual é o tipo correspondente e qual a conduta cirúrgica recomendada?</p>
  
  <p>A) Tipo I; colecistectomia videolaparoscópica simples.<br>
  B) Tipo II; colecistectomia total com rafia primária do colédoco sem dreno.<br>
  C) Tipo III; colecistectomia subtotal com fechamento sobre Kehr ou derivação biliodigestiva em Y de Roux.<br>
  D) Tipo IV; drenagem percutânea trans-hepática definitiva sem cirurgia.<br>
  E) Tipo V; papilotomia endoscópica isolada sem intervenção operatória.</p>
  
  <h4>Comentário Detalhado:</h4>
  <p><strong>Alternativa Correta: C.</strong></p>
  <ul>
    <li>Na classificação de Csendes para Síndrome de Mirizzi:
      <ul>
        <li>Tipo I: compressão extrínseca sem fístula;</li>
        <li>Tipo II: fístula colecistobiliar &lt; 33% da circunferência;</li>
        <li><strong>Tipo III: fístula colecistobiliar comprometendo entre 33% e 66% da circunferência da via biliar principal</strong> (o enunciado descreve 50%);</li>
        <li>Tipo IV: destruição &gt; 66% da circunferência ductal em bloco;</li>
        <li>Tipo V: qualquer tipo associado a fístula colecistoentérica;</li>
      </ul>
    </li>
    <li>Para o Tipo III de Csendes, a conduta preconizada é a colecistectomia subtotal com fechamento da fístula com retalho vesicular viável sobre Dreno de Kehr ou confecção formal de <strong>Hepaticojejunostomia em Y de Roux</strong> se houver perda substancial de tecido ductal ou risco de estenose cicatricial.</li>
  </ul>
</div>

<div class="book-case">
  <p><strong>Questão 5 (USP-RP / Residência Médica):</strong><br>
  Sobre a Visão Crítica de Segurança de Strasberg na colecistectomia laparoscópica, assinale a alternativa que descreve os TRÊS elementos mandatórios obrigatórios que devem ser alcançados antes da colocação de clipes ou secção de qualquer estrutura:</p>
  
  <p>A) Transecção profilática do colédoco, descolamento do fundo vesicular e dissecção da artéria hepática direita.<br>
  B) Limpeza completa do tecido fibroadiposo do trígono hepatocístico, descolamento do terço inferior da vesícula expondo a placa cística hepática e identificação de exatamente duas (e apenas duas) estruturas entrando na vesícula (ducto e artéria císticos).<br>
  C) Realização de colangiografia intraoperatória em 100% dos pacientes, dissecção da veia porta e ligadura da artéria mesentérica superior.<br>
  D) Descolamento do lobo esquerdo do fígado, secção das válvulas de Heister e aspiração de 100% da bile intraluminal.<br>
  E) Mobilização completa de todo o colédoco retroduodenal, identificação do ducto de Wirsung e cateterização do canal de Santorini.</p>
  
  <h4>Comentário Detalhado:</h4>
  <p><strong>Alternativa Correta: B.</strong></p>
  <ul>
    <li>A <strong>Visão Crítica de Segurança (CVS) de Strasberg</strong> exige:
      <ol>
        <li>Limpeza de todo o tecido gorduroso e fibroso dentro do trígono hepatocístico;</li>
        <li>Descolamento do terço inferior da vesícula biliar do leito hepático, expondo a placa cística nua;</li>
        <li>Visualização direta e categórica de <strong>apenas duas estruturas anatômicas penetrando na vesícula</strong>: o ducto cístico e a artéria cística;</li>
      </ol>
    </li>
    <li>Esse protocolo impede a confusão do colédoco principal ou ducto hepático comum com o ducto cístico, prevenindo a temida transecção iatrogênica da via biliar principal.</li>
  </ul>
</div>

<div class="book-case">
  <p><strong>Questão 6 (IAMSPE / Cirurgia Geral):</strong><br>
  Em qual das seguintes situações clínicas de colelitíase assintomática a colecistectomia profilática eletiva está FORMALMENTE INDICADA?</p>
  
  <p>A) Mulher de 35 anos, assintomática, com cálculo único de 8 mm na vesícula biliar ao USG de rotina.<br>
  B) Homem de 45 anos, hipertenso, com múltiplos cálculos biliares móveis de 5 mm sem alterações parietais.<br>
  C) Paciente de 52 anos com achado tomográfico de "vesícula em porcelana" com calcificação parietal extensa.<br>
  D) Gestante de 28 anos no primeiro trimestre com cálculo assintomático de 12 mm.<br>
  E) Homem de 60 anos com microcálculos de 4 mm e episódios de refluxo gastroesofágico leve.</p>
  
  <h4>Comentário Detalhado:</h4>
  <p><strong>Alternativa Correta: C.</strong></p>
  <ul>
    <li>A <strong>Vesícula em Porcelana</strong> (calcificação distrófica parietal da vesícula associada a inflamação crônica litiásica) é uma indicação clássica e formal de colecistectomia profilática devido ao risco cumulativo elevado de transformação maligna para <strong>Adenocarcinoma da Vesícula Biliar (5% a 15%)</strong>;</li>
    <li>Outras indicações formais no paciente assintomático: cálculos &gt; 2,5 a 3,0 cm, pólipos associados a cálculos ou &ge; 10 mm, anemia hemolítica crônica (anemia falciforme) e populações de risco étnico elevado (indígenas andinos);</li>
    <li>Cálculos assintomáticos habituais (&lt; 2 cm) em adultos saudáveis têm indicação de seguimento clínico expectante sem cirurgia.</li>
  </ul>
</div>
`
    },
    {
      id: 'pontos-chave-enamed-colecistite',
      title: '14. Pontos de Alto Rendimento e Diretrizes Práticas de Memorização para o ENAMED',
      body_html: `
<h3>Os Dez Mandamentos da Litíase e Colecistite para Concursos</h3>
<ul>
  <li><strong>1. Fisiopatologia Litogênica:</strong> Cálculos de colesterol (80%, 4 Fs, perda rápida de peso, radiotransparentes em 80%); Pigmentares Pretos (hemólise crônica e cirrose, radiopacos em 50%); Pigmentares Castanhos (infecção bacteriana por beta-glicuronidase e parasitas, formam-se nos ductos biliares).</li>
  <li><strong>2. Colelitíase Assintomática:</strong> NÃO OPERAR DE ROTINA! Operar apenas em: Vesícula em Porcelana (risco de câncer), cálculos volumosos &gt; 2,5-3,0 cm, pólipos &ge; 10 mm ou associados a cálculos, e anemia falciforme.</li>
  <li><strong>3. Cólica Biliar vs Colecistite Aguda:</strong> Cólica = obstrução transitória &lt; 6h, afebril, leucograma normal, Murphy negativo; Colecistite Aguda = obstrução persistente &gt; 6h com inflamação química/isquemia e infecção secundária, febre, leucocitose com desvio e <strong>Sinal de Murphy positivo</strong>.</li>
  <li><strong>4. Sinal de Murphy:</strong> Interrupção súbita e involuntária da inspiração profunda durante a palpação profunda do ponto cístico (9ª cartilagem costal). Sinal de Murphy ultrassonográfico é o achado mais específico de colecistite aguda ao USG.</li>
  <li><strong>5. Critérios de Tóquio (TG18):</strong> A (Sinais locais: Murphy, dor QSD) + B (Sinais sistêmicos: febre, leucocitose, PCR) + C (Imagem confirmatória: cálculo impactado, parede &gt; 4 mm, halo duplo, líquido pericolecístico).</li>
  <li><strong>6. Gravidade TG18:</strong> Grau I = leve sem disfunção; Grau II = moderada (leucócitos &gt; 18.000, massa dolorosa, duração &gt; 72h, inflamação local); Grau III = grave com disfunção orgânica de órgãos vitais (choque com nora, Glasgow &lt; 15, PaO2/FiO2 &lt; 300, creatinina &gt; 2,0, RNI &gt; 1,5 ou plaquetas &lt; 100.000).</li>
  <li><strong>7. Cirurgia Precoce é a Regra:</strong> Colecistectomia videolaparoscópica PRECOCE nas primeiras <strong>24 a 72 horas da admissão</strong>. Não se posterga mais para esfriar o processo por semanas!</li>
  <li><strong>8. Colecistite Alitiásica em UTI:</strong> Paciente crítico sob NPT, choque e vasopressores com sepse sem foco. Mortalidade altíssima por gangrena rápida. Conduta salvadora de emergência: <strong>Colecistostomia Percutânea Trans-Hepática</strong> à beira do leito.</li>
  <li><strong>9. Íleo Biliar e Tríade de Rigler:</strong> Mulher idosa com obstrução de delgado no íleo terminal por migração de cálculo através de fístula colecistoduodenal. Tríade de Rigler = Pneumobilia + Cálculo ectópico calcificado na FID + Distensão com níveis hidroaéreos. Conduta: Enterolitotomia isolada de urgência sem mexer na fístula!</li>
  <li><strong>10. Síndrome de Mirizzi e Csendes:</strong> Cálculo no cístico/Hartmann comprime o hepático comum com icterícia obstrutiva. Tipos de Csendes: I (sem fístula); II (&lt; 33% da circunferência - dreno de Kehr); III (33-66% - retalho sobre Kehr ou Y de Roux); IV (&gt; 66% - Hepaticojejunostomia em Y de Roux obrigatória); V (com fístula colecistoentérica).</li>
</ul>
`
    }
  ],
  references: [
    {
      title: 'Tokyo Guidelines 2018 (TG18/TG20) — Diagnostic Criteria and Severity Grading of Acute Cholecystitis',
      url: 'https://onlinelibrary.wiley.com/doi/10.1002/jhbp.515'
    },
    {
      title: 'World Society of Emergency Surgery (WSES) — Guidelines for the Management of Acute Calculus Cholecystitis',
      url: 'https://wses.biomedcentral.com/articles/10.1186/s13017-020-00336-x'
    },
    {
      title: 'Colégio Brasileiro de Cirurgiões (CBC) — Diretrizes de Cirurgia Hepatobiliopancreática: Colelitíase e Colecistite',
      url: 'https://cbc.org.br/'
    },
    {
      title: 'Strasberg SM et al. — An Analysis of the Problem of Biliary Injury During Laparoscopic Cholecystectomy (The Critical View of Safety)',
      url: 'https://pubmed.ncbi.nlm.nih.gov/8987111/'
    },
    {
      title: 'European Association for the Study of the Liver (EASL) — Clinical Practice Guidelines on the Prevention, Diagnosis and Treatment of Gallstones',
      url: 'https://www.journal-of-hepatology.eu/'
    }
  ]
};

const charCount = saveBook(book);
console.log(`[COLECISTITE DONE] Total characters: ${charCount}`);
