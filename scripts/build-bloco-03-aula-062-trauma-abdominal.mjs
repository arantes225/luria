import { saveBook } from './bloco-03-utils.mjs';

const book = {
  slug: 'trauma-abdominal',
  title: 'Trauma Abdominal',
  area: 'Cirurgia Geral',
  materia: 'Cirurgia do Trauma e Emergências Cirúrgicas',
  description: 'Tratado completo sobre Trauma Abdominal Contuso e Penetrante: indicações imediatas de laparotomia, protocolo eFAST em 4 janelas, critérios e falha do Tratamento Não Operatório (TNO) em lesões de baço e fígado (escalas AAST), hematomas retroperitoneais (Zonas 1, 2 e 3), cirurgia de controle de danos (damage control surgery), síndrome compartimental abdominal e casos clínicos comentados.',
  sections: [
    {
      id: 'fisiopatologia-mecanismos-trauma-abdominal',
      title: '1. Fisiopatologia, Mecanismos de Lesão e Anatomia Cirúrgica Aplicada',
      body_html: `
<h3>Mecanismos de Energia Cinética no Trauma Abdominal</h3>
<p>O abdome é uma região anatômica ampla e desprovida de arcabouço ósseo protetor anterior completo, abrigando órgãos parenquimatosos ricamente vascularizados (fígado, baço, rins, pâncreas), vísceras ocas com conteúdo enzimático e séptico (estômago, duodeno, intestino delgado, cólon), além dos maiores eixos vasculares do organismo (aorta abdominal, veia cava inferior, vasos ilíacos e mesentéricos). As lesões abdominais representam a principal causa de morte evitável ou tardia no politraumatizado decorrente de hemorragia exsanguinante não contida ou sepse secundária à peritonite fecal.</p>
<p>A abordagem diagnóstica e terapêutica depende primordialmente do mecanismo do trauma:</p>
<ul>
  <li><strong>Trauma Abdominal Fechado (Contuso):</strong> Decorrente de desaceleração horizontal/vertical brusca (acidentes com veículos automotores) ou impacto direto de alta energia (atropelamentos, agressões, quedas). As forças de compressão transmitem ondas de pressão que esmagam vísceras sólidas contra a coluna vertebral e arcos costais posteriores. Forças de cisalhamento laceram pedículos vasculares e pontos de fixação mesentérica (ligamento de Treitz, ângulo ileocecal). <strong>O baço (40% a 55%) é o órgão mais comumente lesado no trauma contuso</strong>, seguido de perto pelo fígado (35% a 45%) e intestino delgado (5% a 10%).</li>
  <li><strong>Trauma Abdominal Penetrante por Arma Branca (FAB):</strong> Lesão de baixa velocidade com trajeto linear previsível dependente do comprimento da lâmina e da espessura da parede do paciente. <strong>O fígado (40%) é o órgão mais acometido nas FABs</strong>, seguido pelo intestino delgado (30%), diafragma (20%) e cólon (15%). Cerca de 25% a 30% das FABs abdominais anteriores não penetram a aponeurose e não causam lesão visceral.</li>
  <li><strong>Trauma Abdominal Penetrante por Arma de Fogo (FAF):</strong> Lesão de alta ou média energia cinética ($E = \frac{1}{2} m v^2$), provocando lesão direta por perfuração, fragmentação óssea secundária e cavitação temporária violenta ao redor do trajeto. Mais de 90% a 95% das FAFs que penetram a cavidade peritoneal produzem lesão visceral significativa, sendo <strong>o intestino delgado (50%) o órgão mais acometido</strong>, seguido por cólon (40%), fígado (30%) e vasos retroperitoneais (25%).</li>
</ul>
<h3>Regiões Anatômicas e Espaços Peritoneais</h3>
<p>O cirurgião divide a cavidade abdominal em quatro compartimentos para guiar o raciocínio clínico: 1. Abdome anterior (entre os rebordos costais, ligamentos inguinais e linhas axilares anteriores); 2. Dorso e flancos (entre as linhas axilares anteriores e a coluna vertebral); 3. Pelve verdadeira; 4. Região toracoabdominal (delimitada superiormente pelo 4º espaço intercostal anterior / 6º lateral / 8º posterior e inferiormente pelo rebordo costal). Qualquer trauma penetrante na região toracoabdominal tem risco iminente de lesão diafragmática oculta, exigindo laparoscopia ou toracoscopia diagnóstica.</p>
`
    },
    {
      id: 'indicacoes-laparotomia-imediata-vs-efast',
      title: '2. Avaliação Inicial, Indicações Absolutas de Laparotomia e Papel do eFAST',
      body_html: `
<h3>Indicações Formais de Laparotomia Exploradora Imediata</h3>
<p>Na sala de trauma, o cirurgião não deve hesitar nem submeter o paciente instável a exames demorados quando há indicação cirúrgica imediata definida pelo ATLS:</p>
<table class="book-table">
  <thead>
    <tr>
      <th>Cenário Clínico do Paciente</th>
      <th>Indicações Absolutas de Laparotomia Imediata</th>
      <th>Conduta Proscrita (O que NUNCA fazer)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Trauma Contuso</strong></td>
      <td>• Instabilidade hemodinâmica (choque) com eFAST positivo para líquido livre abdominal;<br>• Peritonite franca (dor à descompressão brusca difusa, abdome em tábua);<br>• Pneumoperitônio radiológico ou tomográfico;<br>• Evisceração de órgãos abdominais;<br>• Lavado Peritoneal Diagnóstico (LPD) francamente positivo (&ge; 10 mL de sangue vivo aspirado).</td>
      <td>NUNCA transportar paciente instável para a Tomografia Computadorizada (a TC é exclusiva do paciente estabilizado).</td>
    </tr>
    <tr>
      <td><strong>Ferimento por Arma de Fogo (FAF)</strong></td>
      <td>• Qualquer FAF penetrante com orifício de entrada anterior entre o 4º espaço intercostal e a sínfise púbica;<br>• FAF tangencial com choque, peritonite ou evisceração;<br>• FAF no dorso ou flanco com instabilidade ou peritonite.</td>
      <td>NUNCA tentar tratamento conservador de FAF em abdome anterior sem laparotomia mandatória.</td>
    </tr>
    <tr>
      <td><strong>Ferimento por Arma Branca (FAB)</strong></td>
      <td>• Instabilidade hemodinâmica;<br>• Sinais evidentes de peritonite;<br>• Evisceração (omento, alça intestinal);<br>• Sangramento gastrointestinal ativo (hematêmese, enterorragia);<br>• Exploração local da ferida evidenciando violação da aponeurose posterior em paciente sintomático.</td>
      <td>NUNCA reintroduzir víscera eviscerada na sala de emergência (deve-se cobrir com compressas estéreis úmidas com soro fisiológico morno).</td>
    </tr>
  </tbody>
</table>

<h3>Protocolo FAST (Focused Assessment with Sonography for Trauma) em 4 Janelas</h3>
<p>O ultrassom na sala de emergência tem acurácia diagnóstica superior a 95% para detecção de hemoperitônio (&ge; 100 a 200 mL de sangue livre):</p>
<ul>
  <li><strong>1. Espaço Hepatorrenal (Recesso de Morison):</strong> Local mais dependente da cavidade peritoneal supramesocólica em decúbito dorsal. A presença de lâmina anecoica (preta) entre o fígado e o rim direito é o sinal mais sensível e precoce de hemoperitônio.</li>
  <li><strong>2. Espaço Esplenorrenal:</strong> Avalia líquido livre entre o baço e o rim esquerdo e no espaço subfrênico esquerdo.</li>
  <li><strong>3. Janela Pélvica (Fundo de Saco de Douglas / Espaço Retovesical):</strong> Avalia líquido livre atrás da bexiga urinária (que deve estar preferencialmente preenchida para janela acústica).</li>
  <li><strong>4. Janela Subxifóidea / Pericárdica:</strong> Avalia a integridade do saco pericárdico para excluir tamponamento cardíaco concomitante.</li>
</ul>
<p>O <strong>eFAST estendido</strong> inclui a avaliação dos ápices e bases pulmonares anteriores bilateralmente, pesquisando a ausência do sinal do deslizamento pleural (descartando pneumotórax) e a presença do sinal da praia ao modo M.</p>
`
    },
    {
      id: 'abordagem-ferimentos-arma-branca-algoritmo',
      title: '3. Algoritmo de Abordagem do Ferimento por Arma Branca no Abdome Anterior',
      body_html: `
<h3>Conduta Racional Diante do Ferimento por Arma Branca (FAB)</h3>
<p>Diferentemente da FAF, a maioria dos ferimentos por faca no abdome anterior não requer laparotomia imediata se o paciente estiver estável e assintomático. O fluxograma oficial do ATLS e CBC estabelece três etapas ordenadas:</p>
<ol>
  <li><strong>Avaliação de Critérios Cirúrgicos Imediatos:</strong> Choque hemorrágico, peritonite franca ou evisceração determinam laparotomia sem necessidade de qualquer outro exame.</li>
  <li><strong>Exploração Local da Ferida sob Anestesia Local:</strong> Se o paciente estiver estável e assintomático, o cirurgião realiza antissepsia, anestesia local e explora a ferida com pinças e afastadores sob visualização direta para avaliar a aponeurose anterior do músculo reto abdominal. Se a aponeurose estiver comprovadamente ÍNTEGRA, o ferimento é classificado como não penetrante; realiza-se sutura da pele e alta hospitalar com orientações.</li>
  <li><strong>Conduta se a Aponeurose estiver VIOLADA (ou exploração inconclusiva):</strong> O paciente penetrou a cavidade peritoneal. Existem duas estratégias validadas internacionalmente:
    <ul>
      <li><strong>Exame Físico Seriado em Ambiente Hospitalar:</strong> Monitorização clínica e exame abdominal repetido a cada 2 a 4 horas pela mesma equipe cirúrgica por 24 a 48 horas, associada a hemograma seriado. Se desenvolver dor progressiva, febre, taquicardia ou leucocitose, indica-se laparotomia. Possui sensibilidade e segurança superiores a 95%.</li>
      <li><strong>Tomografia Computadorizada Contrastada / Videolaparoscopia:</strong> A videolaparoscopia é o exame padrão-ouro para ferimentos na transição toracoabdominal para avaliar laceração do diafragma.</li>
    </ul>
  </li>
</ol>
`
    },
    {
      id: 'tratamento-nao-operatorio-baco-figado',
      title: '4. Tratamento Não Operatório (TNO) de Baço e Fígado: Escalas AAST e Critérios de Falha',
      body_html: `
<h3>Pilares do Tratamento Não Operatório (TNO) no Trauma Contuso</h3>
<p>A conservação do baço e do fígado transformou-se no padrão-ouro assistencial para mais de 80% dos traumas contusos viscerais no paciente <strong>hemodinamicamente estável</strong>. A conduta não operatória evita laparotomias não terapêuticas, previne infecções fulminantes pós-esplenectomia (OPSI por germes encapsulados: <em>S. pneumoniae</em>, <em>N. meningitidis</em>, <em>H. influenzae</em>) e reduz o tempo de hospitalização.</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Escala AAST</th>
      <th>Lesão Esplênica (Baço)</th>
      <th>Lesão Hepática (Fígado)</th>
      <th>Estratégia Terapêutica Habitual</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Grau I</strong></td>
      <td>Hematoma subcapsular &lt; 10% da superfície; laceração capsular &lt; 1 cm de profundidade parenquimatosa.</td>
      <td>Hematoma subcapsular &lt; 10% da superfície; laceração capsular &lt; 1 cm de profundidade.</td>
      <td>TNO: internação em enfermaria/UTI, repouso absoluto no leito por 24 a 48h, monitorização seriada de sinais vitais e hematócrito a cada 6 horas.</td>
    </tr>
    <tr>
      <td><strong>Grau II</strong></td>
      <td>Hematoma subcapsular 10% a 50%; hematoma intraparenquimatoso &lt; 5 cm; laceração de 1 a 3 cm de profundidade.</td>
      <td>Hematoma subcapsular 10% a 50%; hematoma intraparenquimatoso &lt; 10 cm; laceração de 1 a 3 cm de profundidade.</td>
      <td>TNO hospitalar monitorizado; retorno gradual da deambulação após estabilidade clínica laboratorial.</td>
    </tr>
    <tr>
      <td><strong>Grau III</strong></td>
      <td>Hematoma subcapsular &gt; 50% ou roto com sangramento ativo contido; hematoma intraparenquimatoso &ge; 5 cm; laceração &gt; 3 cm de profundidade.</td>
      <td>Hematoma subcapsular &gt; 50% ou roto; hematoma intraparenquimatoso &gt; 10 cm; laceração &gt; 3 cm de profundidade.</td>
      <td>TNO em leito de Terapia Intensiva. Na presença de <em>blush</em> arterial de contraste à angiotomografia, indicar <strong>Arteriografia com Angioembolização Seletiva</strong> de imediato.</td>
    </tr>
    <tr>
      <td><strong>Grau IV</strong></td>
      <td>Laceração envolvendo vasos segmentares ou hilares com desvascularização de mais de 25% do baço.</td>
      <td>Laceração parenquimatosa envolvendo 25% a 75% de um lobo hepático ou de 1 a 3 segmentos de Couinaud no mesmo lobo.</td>
      <td>TNO viável se paciente perfeitamente estável e em centro com UTI, cirurgião 24h e hemodinâmica. Angioembolização profilática/terapêutica frequente. Se instabilidade: cirurgia imediata.</td>
    </tr>
    <tr>
      <td><strong>Grau V</strong></td>
      <td>Baço completamente fragmentado / estilhaçado ('shattered spleen') ou avulsão do pedículo vascular hilar esplênico.</td>
      <td>Laceração parenquimatosa de mais de 75% do lobo hepático ou avulsão vascular retro-hepática (veia cava inferior retro-hepática / veias supra-hepáticas principais).</td>
      <td>Cirurgia de urgência na maioria esmagadora dos casos (Esplenectomia Total no baço; manobra de Pringle, empacotamento hepático [packing] e controle de danos no fígado).</td>
    </tr>
  </tbody>
</table>

<h3>Critérios Rígidos de Falha do TNO (Indicação de Laparotomia)</h3>
<ul>
  <li>Queda sustentada do hematócrito necessitando de mais de 2 a 4 concentrados de hemácias nas primeiras 24 horas para manter estabilidade;</li>
  <li>Deterioração hemodinâmica (taquicardia progressiva &gt; 120 bpm, hipotensão com PAS &lt; 90 mmHg persistente);</li>
  <li>Surgimento de dor abdominal progressiva em descompressão brusca (peritonite bacteriana por perfuração despercebida de víscera oca ou peritonite biliar por fístula hepática);</li>
  <li>Falha da angioembolização ou extravasamento ativo volumoso de contraste não contido.</li>
</ul>
`
    },
    {
      id: 'tecnicas-cirurgicas-hemostasia-figado-esplenectomia',
      title: '5. Técnicas Cirúrgicas de Urgência: Manobra de Pringle, Packing Hepático e Esplenectomia',
      body_html: `
<h3>Manobra de Pringle: Princípios Anatômicos e Limites Temporais</h3>
<p>A Manobra de Pringle consiste no clampeamento digital ou com pinça vascular atraumática (pinça de Satinsky ou bulldog) do <strong>ligamento hepatoduodenal</strong>, que contém os elementos da tríade portal: a veia porta posteriormente, a artéria hepática própria anteromedialmente e o ducto colédoco anterolateralmente. Ao clampear o forame omental de Winslow, interrompe-se 100% do influxo vascular arterial e venoso aferente ao parênquima hepático.</p>
<p>Interpretação do teste cirúrgico:</p>
<ul>
  <li>Se o sangramento hepático <strong>cessar ou diminuir drasticamente</strong> após o clampeamento, a lesão localiza-se nos ramos intraparenquimatosos da artéria hepática ou da veia porta. Procede-se à hemostasia cirúrgica direta com sutura hepática (hepatorrafia com pontos em 'U' profundos de fio absorvível rombo) ou aplicação de agentes tópicos hemostáticos.</li>
  <li>Se o sangramento <strong>persistir maciço e inalterado</strong> apesar da Manobra de Pringle eficaz, o sangramento é de origem retro-hepática: lesão da <strong>veia cava inferior retro-hepática ou das veias supra-hepáticas principais</strong> (veias hepáticas direita, média e esquerda). Essa lesão vascular tem mortalidade cirúrgica superior a 70% a 90%; o cirurgião não deve tentar dissecção cega no hematoma, devendo realizar o <strong>empacotamento peri-hepático compressivo (packing)</strong> com compressas estéreis e transferir o paciente para suporte intensivo ou centro terciário.</li>
  <li><strong>Limite Temporal de Segurança:</strong> O tempo máximo de isquemia hepática contínua normotérmica segura é de <strong>30 a 60 minutos</strong> (ou períodos intermitentes de 15 minutos com 5 minutos de desclampeamento para reperfusão).</li>
</ul>

<h3>Esplenectomia Total vs Preservação Esplênica</h3>
<p>Na vigência de instabilidade hemodinâmica, choque hemorrágico grave ou lesões esplênicas graus IV/V estilhaçadas, a <strong>Esplenectomia Total</strong> é mandatória. Os passos cirúrgicos fundamentais envolvem: 1. Mobilização medial do baço através da secção do ligamento esplenorrenal avascular; 2. Rotação medial do baço e cauda do pâncreas para o campo cirúrgico; 3. Ligadura individualizada dos vasos do hilo esplênico (artéria e veia esplênicas) junto à borda do órgão, com extremo cuidado para não pinçar ou lacerar a cauda do pâncreas (prevenindo fístula pancreática pós-operatória); 4. Ligadura cuidadosa dos vasos gástricos curtos no ligamento gastroesplênico.</p>
<p><strong>Profilaxia Pós-Esplenectomia:</strong> Todo paciente esplenectomizado deve receber vacinação obrigatória contra germes encapsulados (Pneumococo 13-valente e 23-valente, Meningocócica ACWY e B, e <em>Haemophilus influenzae</em> tipo b) administrada preferencialmente cerca de <strong>14 dias após o procedimento cirúrgico</strong> (quando o sistema imunológico recupera a capacidade de resposta vacinal pós-trauma) e orientações rigorosas sobre profilaxia antibiótica precoce diante de qualquer febre aguda (risco de Sepse Fulminante Pós-Esplenectomia - OPSI).</p>
`
    },
    {
      id: 'trauma-visceras-ocas-duodeno-pancreas-colon',
      title: '6. Trauma de Vísceras Ocas: Intestino Delgado, Cólon, Duodeno e Pâncreas',
      body_html: `
<h3>Lesões de Delgado e Mesentério</h3>
<p>O intestino delgado é a víscera oca mais comumente perfurada no trauma abdominal contuso (frequentemente por compressão do cinto de segurança de dois pontos - <em>sinal do cinto de segurança</em> com equimose transversa na parede abdominal). As lesões variam de desvascularização isquêmica mesentérica a transecção total da alça:</p>
<ul>
  <li>Perfurações pequenas e isoladas (&lt; 50% da circunferência) sem comprometimento da vascularização mesentérica são tratadas com <strong>desbridamento mínimo e rafia primária transversa em plano único ou duplo</strong> com fio absorvível (Vicryl 3-0), preservando a luz intestinal para não causar estenose.</li>
  <li>Lesões múltiplas contíguas, lacerações extensas (&gt; 50% do diâmetro) ou desvascularização mesentérica requerem <strong>ressecção segmentar de delgado com anastomose término-terminal ou látero-lateral</strong>.</li>
</ul>

<h3>Trauma de Cólon: Reparo Primário vs Colostomia</h3>
<p>Historicamente, todas as lesões de cólon eram exteriorizadas em colostomia pelo medo de deiscência anastomótica fecal. Atualmente, múltiplos ensaios clínicos demonstraram que o <strong>Reparo Primário (rafia simples ou ressecção com anastomose primária) é seguro e preferível na maioria dos pacientes</strong>, mesmo em ferimentos penetrantes por arma de fogo no cólon esquerdo, independentemente do tempo de evolução ou contaminação peritoneal moderada, desde que o paciente não esteja em choque refratário ou coagulopatia. A colostomia derivativa (ou procedimento de Hartmann) reserva-se estritamente aos pacientes em choque profundo classe IV com acidose e hipotermia grave submetidos a cirurgia de controle de danos.</p>

<h3>O Desafio Cirúrgico do Complexo Duodeno-Pancreático</h3>
<p>O duodeno e o pâncreas situam-se profundamente no retroperitônio anterior (Zona 1), e suas lesões são frequentemente silenciosas nas primeiras horas de trauma contuso (impacto do guidão de bicicleta ou volante no epigástrio):</p>
<table class="book-table">
  <thead>
    <tr>
      <th>Órgão e Lesão</th>
      <th>Apresentação Diagnóstica Típica</th>
      <th>Conduta Cirúrgica Baseada no Ducto de Wirsung</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Hematoma Intramural Duodenal</strong></td>
      <td>Comum em crianças após trauma epigástrico contuso. O hematoma na submucosa oclui progressivamente o lúmen da 2ª/3ª porção duodenal, manifestando-se por vômitos biliosos incoercíveis 24 a 48h após o trauma. EED ou TC revela sinal da 'mola em espiral' ou 'bico de pássaro'.</td>
      <td><strong>Tratamento Conservador por 2 a 3 semanas:</strong> descompressão gástrica com sonda nasogástrica e nutrição parenteral total (NPT). Mais de 90% dos hematomas reabsorvem espontaneamente sem cirurgia.</td>
    </tr>
    <tr>
      <td><strong>Perfuração Duodenal Retroperitoneal</strong></td>
      <td>Dor lombar/epigástrica insidiosa. A radiografia de abdome ou TC evidencia presença de ar retroperitoneal delineando a silhueta do rim direito (enfisema retroperitoneal) ou extravasamento de contraste oral na fase tardia.</td>
      <td>Desbridamento e sutura primária transversa protegida com dreno abdominal. Se lesão complexa: exclusão pilórica com gastrostomia e gastrojejunostomia.</td>
    </tr>
    <tr>
      <td><strong>Trauma Pancreático com Ducto Íntegro (Graus I e II)</strong></td>
      <td>Contusão ou laceração superficial do parênquima pancreático sem rotura do ducto pancreático principal (Ducto de Wirsung).</td>
      <td>Tratamento conservador ou hemostasia hemostática simples com drenagem ampla fechada de sucção por contra-abertura.</td>
    </tr>
    <tr>
      <td><strong>Trauma Pancreático com Lesão do Ducto Principal (Graus III, IV e V)</strong></td>
      <td>Transecção do parênquima com rotura do ducto de Wirsung comprovada por colangiorressonância, CPRE ou exploração cirúrgica direta.</td>
      <td>• Lesão distal (à esquerda dos vasos mesentéricos / cauda e corpo): <strong>Pancreatectomia Distal com preservação ou não do baço</strong>;<br>• Lesão proximal (cabeça do pâncreas com envolvimento duodenal grave - Grau V): <strong>Duodenopancreatectomia (Cirurgia de Whipple)</strong>, habitualmente realizada em dois tempos no controle de danos.</td>
    </tr>
  </tbody>
</table>
`
    },
    {
      id: 'hematomas-retroperitoneais-zonas',
      title: '7. Hematomas Retroperitoneais: Classificação por Zonas e Conduta Cirúrgica',
      body_html: `
<h3>Zonas Anatômicas do Retroperitônio e Regras de Exploração Cirúrgica</h3>
<p>O retroperitônio abdominal é dividido cirurgicamente em três zonas distintas que orientam a decisão do cirurgião durante uma laparotomia exploradora:</p>
<table class="book-table">
  <thead>
    <tr>
      <th>Zona Retroperitoneal</th>
      <th>Limites Anatômicos e Estruturas Contidas</th>
      <th>Conduta no Trauma Penetrante (FAB/FAF)</th>
      <th>Conduta no Trauma Contuso (Fechado)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Zona 1 (Central / Medial)</strong></td>
      <td>Estende-se do hiato aórtico diafragmático até a bifurcação dos vasos ilíacos (promontório sacral). Contém: aorta abdominal, veia cava inferior, tronco celíaco, artérias e veias mesentéricas superiores e duodeno-pâncreas.</td>
      <td><strong>Exploração Cirúrgica Obrigatória</strong> imediata para hemostasia direta e rafia vascular.</td>
      <td><strong>Exploração Cirúrgica Obrigatória</strong> imediata após controle vascular proximal e distal, devido ao altíssimo risco de exsanguinação por lesão de grandes vasos.</td>
    </tr>
    <tr>
      <td><strong>Zona 2 (Lateral / Flancos)</strong></td>
      <td>Fossas lombares direita e esquerda. Contém: rins, glândulas suprarrenais, ureteres e cólon ascendente/descendente retroperitoneal.</td>
      <td><strong>Exploração Cirúrgica Obrigatória</strong> para afastar perfuração colônica oculta e lesão do pedículo renal ou ureteral.</td>
      <td><strong>Tratamento Conservador (NÃO explorar)</strong> se o hematoma for estável e não expansivo, com fáscia de Gerota íntegra e sem pulsos anormais. Abrir o hematoma na contusão frequentemente despressuriza o leito e culmina em nefrectomia desnecessária. Explorar apenas se expansivo, pulsátil ou roto livremente na cavidade.</td>
    </tr>
    <tr>
      <td><strong>Zona 3 (Pélvica)</strong></td>
      <td>Pelve verdadeira abaixo da bifurcação dos vasos ilíacos. Contém: vasos ilíacos internos e externos, plexo venoso pré-sacral e reto.</td>
      <td><strong>Exploração Cirúrgica Obrigatória</strong> com controle hemostático direto de vasos ilíacos lacerados.</td>
      <td><strong>Tratamento Conservador (NÃO abrir)</strong> se o hematoma for estável. A abertura cirúrgica rompe o tamponamento pélvico natural e causa sangramento venoso incontrolável. A conduta é o empacotamento pré-peritoneal (packing) e fixação pélvica, seguida de angioembolização.</td>
    </tr>
  </tbody>
</table>
`
    },
    {
      id: 'cirurgia-controle-danos-sindrome-compartimental',
      title: '8. Cirurgia de Controle de Danos e Síndrome Compartimental Abdominal',
      body_html: `
<h3>A Tríade Letal e as Três Fases do Controle de Danos (Damage Control)</h3>
<p>No paciente politraumatizado grave em choque descompensado, a morte precoce não decorre da incapacidade de suturar lesões, mas do colapso metabólico da <strong>Tríade Letal: Hipotermia (&lt; 35 °C), Acidose Metabólica (pH &lt; 7,20) e Coagulopatia</strong>. Procedimentos cirúrgicos longos e complexos (ressecções com anastomoses, reconstruções definitivas) nessa fase selam a falência orgânica irreversível.</p>
<p>O conceito de <strong>Cirurgia de Controle de Danos</strong> é executado em três etapas sequenciais estritas:</p>
<ul>
  <li><strong>Fase I (Cirurgia Abreviada - Máximo 60 a 90 minutos):</strong> Laparotomia rápida com incisão mediana xifopúbica ampla. Objetivos exclusivos: <strong>1. Controle rápido da hemorragia</strong> (ligaduras vasculares, shunts vasculares temporários, empacotamento com compressas / packing de fígado e pelve); <strong>2. Controle rápido da contaminação entérica</strong> (clampeamento, sutura simples ou ligadura de alças pérvias com fios grossos ou grampeadores sem reconstrução de trânsito); <strong>3. Fechamento temporário sem tensão</strong> com bolsa de Bogotá ou curativo a vácuo (peritoniostomia / laparostomia), prevenindo hipertensão intra-abdominal.</li>
  <li><strong>Fase II (Ressuscitação em UTI - 24 a 48 horas):</strong> Reaquecimento ativo gradual, correção da coagulopatia com protocolo transfusional balanceado (concentrado de hemácias, plasma fresco e plaquetas 1:1:1), infusão de fibrinogênio / crioprecipitado se fibrinogênio &lt; 150-200 mg/dL, correção de cálcio ionizável e acidose, e estabilização ventilatória e hemodinâmica.</li>
  <li><strong>Fase III (Reoperação Programada - 'Second Look'):</strong> Retorno ao centro cirúrgico após restauração da homeostase fisiológica (habitualmente 48 a 72 horas). Remoção meticulosa das compressas empacotadas, revisão de hemostasia, ressecções definitivas com anastomoses intestinais ou confecção de estomias e fechamento da parede aponeurótica.</li>
</ul>

<h3>Hipertensão Intra-Abdominal (HIA) e Síndrome Compartimental Abdominal (SCA)</h3>
<p>A Pressão Intra-Abdominal (PIA) normal varia de 5 a 7 mmHg em pacientes adultos em repouso. A mensuração padrão-ouro é realizada por via <strong>intravesical</strong> (medindo-se a coluna de pressão através de sonda de Foley acoplada a manômetro e infundindo-se 25 mL de SF 0,9% estéril na bexiga):</p>
<table class="book-table">
  <thead>
    <tr>
      <th>Classificação Oficial WSACS</th>
      <th>Nível da Pressão Intra-Abdominal (PIA)</th>
      <th>Fisiopatologia e Repercussões Clínicas</th>
      <th>Conduta Terapêutica</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Hipertensão Intra-Abdominal (Graus I a IV)</strong></td>
      <td>• Grau I: 12 a 15 mmHg<br>• Grau II: 16 a 20 mmHg<br>• Grau III: 21 a 25 mmHg<br>• Grau IV: &gt; 25 mmHg</td>
      <td>Elevação sustentada da PIA sem disfunção orgânica instalada. Compressão da veia cava inferior e diafragma.</td>
      <td>Medidas clínicas: sonda nasogástrica descompressiva, enema retal, restrição de fluidos, sedação, paralisia neuromuscular e drenagem percutânea de coleções.</td>
    </tr>
    <tr>
      <td><strong>Síndrome Compartimental Abdominal (SCA)</strong></td>
      <td><strong>PIA sustentada &gt; 20 mmHg associada obrigatoriamente a uma NOVA disfunção orgânica</strong></td>
      <td>• Renal: oligúria &lt; 0,5 mL/kg/h e elevação de escórias por compressão da veia renal e arteríolas;<br>• Respiratória: pico pressórico inspiratório elevado, hipercapnia e hipoxemia por elevação diafragmática;<br>• Cardiovascular: queda do débito cardíaco por colapso do retorno venoso.</td>
      <td><strong>Descompressão Cirúrgica de Emergência (Laparostomia Descompressiva):</strong> Abertura imediata da aponeurose e instalação de curativo de pressão negativa (VAC abdominal) ou bolsa de Bogotá. Salva a função renal e a vida do paciente.</td>
    </tr>
  </tbody>
</table>
`
    },
    {
      id: 'casos-clinicos-comentados-complexos-trauma',
      title: '9. Casos Clínicos Comentados de Alta Complexidade Cirúrgica',
      body_html: `
<div class="book-case">
  <h4>Caso Clínico 1: Trauma Contuso em Paciente Instável e eFAST Positivo</h4>
  <p><strong>História:</strong> Homem de 26 anos é trazido pelo SAMU após colisão moto contra anteparo em alta velocidade. Na admissão: via aérea pérvia com colar cervical, murmúrio vesicular presente bilateralmente, frequência respiratória 28 irpm, oximetria 95%. Na etapa C: pele fria, pulsos periféricos finos, FC 136 bpm, PA 75/40 mmHg. Abdome tenso e distendido. O emergencista realiza eFAST na sala vermelha, demonstrando lâmina anecoica volumosa no recesso hepatorrenal e no fundo de saco de Douglas. Não há derrame pericárdico ou pleural.</p>
  <p><strong>Discussão e Conduta:</strong> Paciente com <strong>Trauma Abdominal Contuso com Choque Hemorrágico Descompensado e eFAST Positivo para Hemoperitônio</strong>. Não há indicação de tomografia computadorizada (o transporte para a TC levaria à PCR por choque). A conduta mandatória é a <strong>Laparotomia Exploradora Imediata no Centro Cirúrgico</strong>, associada à ativação imediata do protocolo de transfusão maciça 1:1:1 e administração de ácido tranexâmico (1 g IV nas primeiras 3 horas). Na laparotomia, constatada lesão esplênica grau V com avulsão hilar; procede-se à esplenectomia de urgência.</p>
</div>

<div class="book-case">
  <h4>Caso Clínico 2: Lesão Hepática Grau IV e Falha de TNO por Hemorragia Tardia</h4>
  <p><strong>História:</strong> Mulher de 38 anos, vítima de colisão automobilística com cinto de segurança de 3 pontos. Deu entrada estável com PA 120/75 mmHg e FC 82 bpm. A tomografia de abdome revelou laceração hepática profunda no lobo direito estendendo-se por 4 cm sem extravasamento ativo de contraste (Trauma Hepático Grau IV). Optou-se por TNO na UTI. No 3º dia de internação, a paciente evolui subitamente com taquicardia (FC 128 bpm), hipotensão (PA 85/50 mmHg), dor abdominal intensa e queda de 4 pontos no hematócrito (de 33% para 22%).</p>
  <p><strong>Discussão e Conduta:</strong> Trata-se de <strong>Falha Tardia do Tratamento Não Operatório por Rotura de Hematoma Subcapsular Hepático</strong>. A deterioração hemodinâmica com queda abrupta da hemoglobina e choque hemorrágico impõe a conversão imediata para <strong>Laparotomia Cirúrgica</strong>. Intraoperatoriamente, o cirurgião realiza a <strong>Manobra de Pringle</strong> (clampeamento temporário do ligamento hepatoduodenal com pinça atraumática para ocluir o fluxo da artéria hepática própria e veia porta). O sangramento arterial diminui sensivelmente, confirmando origem no pedículo hepático; realiza-se hemostasia direta com pontos em 'U' de categute cromado, aplicação de agentes hemostáticos tópicos e empacotamento com compressas (packing peri-hepático) para controle de danos.</p>
</div>

<div class="book-case">
  <h4>Caso Clínico 3: Perfuração Duodenal Oculta Diagnosticada Tardiamente por Retroperitonite</h4>
  <p><strong>História:</strong> Jovem de 19 anos sofre impacto direto do guidão de bicicleta no epigástrio em alta velocidade. No atendimento inicial na UPA, queixava-se de leve desconforto epigástrico, estando afebril e normotenso. O raio-X de abdome inicial foi laudado como normal, e o paciente recebeu alta com analgésicos. Retorna 36 horas após com dor lombar direita intensa, febre de 39 °C, vômitos biliosos incoercíveis e taquicardia (FC 120 bpm). Ao exame: dor à palpação profunda do flanco direito e hipogástrio com crepitação retroperitoneal discreta. A tomografia de abdome revela ar e líquido circundando o rim direito e a segunda porção duodenal.</p>
  <p><strong>Discussão e Conduta:</strong> Trata-se de <strong>Perfuração Duodenal Retroperitoneal Oculta em 2ª Porção Duodenal</strong>. O trauma contuso contra a coluna vertebral comprimiu a alça duodenal fixa, provocando rotura em alça fechada com extravasamento de bile e suco pancreático para o espaço retroperitoneal. A TC com contraste oral e venoso é mandatória. O paciente é submetido à laparotomia de emergência através de ampla <strong>Manobra de Kocher</strong> (incisão do peritônio parietal lateral ao duodeno e rotação medial do complexo duodeno-pancreático). Identificada laceração de 2 cm com necrose de bordas; realiza-se desbridamento, rafia primária transversa em dois planos, exclusão pilórica com gastrostomia descompressiva e gastrojejunostomia em Y de Roux para proteção da sutura, associada a drenagem tubular retroperitoneal ampla.</p>
</div>

<div class="book-case">
  <h4>Caso Clínico 4: Síndrome Compartimental Abdominal Pós-Ressuscitação Maciça</h4>
  <p><strong>História:</strong> Homem de 45 anos é submetido à cirurgia de controle de danos por múltiplos ferimentos por arma de fogo em abdome com laceração de cólon e veia ilíaca. Durante o procedimento, recebeu 12 concentrados de hemácias, 10 plasmas frescos e 6 litros de cristaloides. No pós-operatório imediato na UTI, sob ventilação mecânica, o médico intensivista observa elevação súbita do pico pressórico inspiratório de 22 para 45 cmH2O, dessaturação (SpO2 88%), oligúria progressiva (débito de 10 mL/h nas últimas 3 horas) e abdome extremamente tenso e globoso. A mensuração da Pressão Intra-Abdominal (PIA) por cateter vesical revela 28 mmHg.</p>
  <p><strong>Discussão e Conduta:</strong> O paciente preenche critérios formais de <strong>Síndrome Compartimental Abdominal (PIA &gt; 20 mmHg com disfunção orgânica respiratória e renal aguda)</strong> provocada pelo edema maciço visceral e retroperitoneal decorrente da ressuscitação volêmica agressiva e choque. A conduta salvadora de vidas é a <strong>Laparostomia Descompressiva de Emergência no próprio leito da UTI ou no Centro Cirúrgico</strong>. A abertura dos pontos da aponeurose e instalação de curativo de peritoniostomia à vácuo (VAC abdominal) reduz imediatamente a PIA para 10 mmHg, normaliza o pico pressórico pulmonar para 24 cmH2O e restabelece a diurese para 65 mL/h na primeira hora pós-descompressão.</p>
</div>
`
    },
    {
      id: 'questoes-comentadas-residencia-trauma-abdominal',
      title: '10. Bateria Completa de Questões Comentadas com Análise de Distratores',
      body_html: `
<div class="book-question">
  <h4>Questão Comentada 1: ENARE 2024 — Ferimento por Arma Branca e Conduta Inicial</h4>
  <p><strong>Enunciado:</strong> Homem de 30 anos chega ao pronto-socorro após sofrer ferimento por faca no flanco esquerdo há 1 hora. Ao exame físico: lúcido e orientado, corado, hidratado, PA: 125/80 mmHg, FC: 78 bpm, abdome flácido, indolor, sem sinais de peritonite. A ferida mede 3 cm de extensão. Qual a conduta indicada para o manejo desse paciente?</p>
  <p>A) Laparotomia exploradora imediata para todos os ferimentos penetrantes em flanco.<br>
  B) Tomografia computadorizada de abdome e pelve com triplo contraste (oral, venoso e retal) ou exame físico seriado por equipe cirúrgica.<br>
  C) Alta hospitalar imediata após sutura simples da pele e antibioticoterapia oral.<br>
  D) Laparoscopia diagnóstica de urgência para avaliação da cavidade peritoneal.</p>
  <p><strong>Gabarito Oficial: Alternativa B.</strong></p>
  <p><strong>Comentário Detalhado:</strong> Em ferimentos por arma branca em flanco ou dorso em paciente hemodinamicamente estável e assintomático, o exame de escolha preconizado pelo Colégio Americano de Cirurgiões e CBC é a <strong>Tomografia Computadorizada com Triplo Contraste</strong> (venoso, oral e retal), que avalia com excelência o retroperitônio e o cólon retroperitoneal, ou a observação clínica seriada com exame físico repetido a cada 2 a 4 horas por 24 a 48 horas pela mesma equipe cirúrgica. A laparotomia imediata (A) é reservada aos casos de choque ou peritonite. Suturar e dar alta (C) é imperícia médica pelo risco de lesão retroperitoneal despercebida.</p>
</div>

<div class="book-question">
  <h4>Questão Comentada 2: USP / CBC — Hematoma Retroperitoneal e Regras de Exploração</h4>
  <p><strong>Enunciado:</strong> Durante laparotomia exploradora em vítima de trauma abdominal fechado por colisão com volante, o cirurgião identifica hematoma retroperitoneal volumoso não expansivo restrito à fossa lombar direita (Zona 2 lateral), com fáscia de Gerota íntegra e sem pulsações anormais. O paciente encontra-se estável após rafia de pequena lesão de jejuno. Qual a conduta correta em relação ao hematoma da Zona 2?</p>
  <p>A) Abrir imediatamente a fáscia de Gerota e dissecar o pedículo renal para rafia da artéria renal.<br>
  B) Realizar nefrectomia direita de urgência profilática para prevenir abscesso perinefrético.<br>
  C) Manter conduta conservadora, NÃO abrindo a fáscia de Gerota nem explorando o hematoma.<br>
  D) Puncionar o hematoma com agulha grossa para aspirar o sangue acumulado.</p>
  <p><strong>Gabarito Oficial: Alternativa C.</strong></p>
  <p><strong>Comentário Detalhado:</strong> No <strong>trauma contuso</strong>, os hematomas retroperitoneais de <strong>Zona 2 (lateral/renal) estáveis e não expansivos NÃO devem ser explorados cirurgicamente</strong>. A integridade da fáscia de Gerota garante o tamponamento pressórico natural do parênquima renal; violar essa fáscia na cirurgia de emergência habitualmente despressuriza o leito, reativa sangramentos venosos profundos e frequentemente culmina em nefrectomia desnecessária em um rim viável. Apenas hematomas expansivos, pulsáteis ou rotos para a cavidade livre devem ser abertos.</p>
</div>

<div class="book-question">
  <h4>Questão Comentada 3: UNIFESP — eFAST e Trauma Contuso Instável</h4>
  <p><strong>Enunciado:</strong> Motociclista de 22 anos dá entrada na sala vermelha após derrapagem em pista molhada. Apresenta-se hipotenso (PA 70/40 mmHg), taquicárdico (FC 140 bpm), com palidez intensa e rebaixamento do sensório (Glasgow 12). Tórax estável com murmúrio simétrico. Abdome discretamente distendido. O emergencista realiza o ultrassom eFAST na sala de trauma e identifica lâmina líquida no espaço de Morison. Qual a conduta mandatória imediata?</p>
  <p>A) Encaminhar imediatamente para angiotomografia computadorizada de abdome e pelve.<br>
  B) Indicar Laparotomia Exploradora de emergência no Centro Cirúrgico associada a transfusão de hemoderivados 1:1:1.<br>
  C) Realizar paracentese diagnóstica no leito da emergência para avaliar o hematócrito do líquido.<br>
  D) Infundir 3 litros de Soro Fisiológico a 0,9% aquecido em 15 minutos e reavaliar o eFAST.</p>
  <p><strong>Gabarito Oficial: Alternativa B.</strong></p>
  <p><strong>Comentário Detalhado:</strong> A presença de <strong>instabilidade hemodinâmica associada a eFAST positivo para líquido livre abdominal no trauma contuso é indicação absoluta de Laparotomia Exploradora Imediata</strong>. O paciente está sangrando ativamente dentro da cavidade peritoneal. O transporte para tomografia (A) é contraindicado em paciente chocado. Infundir 3 litros de cristaloide (D) é erro crasso que induz coagulopatia dilucional e acidose hiperclorêmica, devendo-se utilizar reposição volêmica balanceada com sangue total ou hemoderivados 1:1:1 associados ao controle hemostático cirúrgico imediato.</p>
</div>

<div class="book-question">
  <h4>Questão Comentada 4: SURCE / Residência Médica — Cirurgia de Controle de Danos</h4>
  <p><strong>Enunciado:</strong> Durante laparotomia em paciente politraumatizado grave com múltiplas lesões por FAF, após 50 minutos de cirurgia, o anestesiologista informa que o paciente atingiu temperatura central de 34,2 °C, pH de 7,15, déficit de base de -12 mEq/L e sangramento difuso em 'napa' nas superfícies cruentas (coagulopatia clínica). O cirurgião já realizou ligadura da veia mesentérica superior e ressecção em bloco de alças ileais desvitalizadas. Qual a decisão cirúrgica mandatória segundo o conceito de controle de danos?</p>
  <p>A) Realizar imediatamente anastomose manual em dois planos das alças intestinais e fechar a parede com pontos capitonados reforçados.<br>
  B) Interromper a cirurgia definitiva, ocluir os cotos intestinais sem reconstrução, realizar empacotamento com compressas (packing) e instalar peritoniostomia com bolsa de Bogotá ou vácuo.<br>
  C) Manter o paciente no centro cirúrgico por mais 3 horas até que todos os órgãos estejam completamente reparados.<br>
  D) Fechar a cavidade abdominal sob forte tensão com fio inabsorvível para conter o sangramento por pressão física.</p>
  <p><strong>Gabarito Oficial: Alternativa B.</strong></p>
  <p><strong>Comentário Detalhado:</strong> O paciente instalou a clássica <strong>Tríade Letal (Hipotermia &lt; 35 °C, Acidose com pH &lt; 7,20 e Coagulopatia)</strong>. Insistir na cirurgia definitiva ou confeccionar anastomoses intestinais nessa fase culminará em deiscência anastomótica por hipoperfusão e parada cardiorrespiratória irreversível intraoperatória. O cirurgião deve abortar a cirurgia formal (Fase I do Controle de Danos), ocluir cotos com grampeador ou fio grosso, empacotar focos hemorrágicos com compressas e fechar a parede sem tensão (bolsa de Bogotá ou VAC), encaminhando o paciente imediatamente à UTI para ressuscitação (Fase II).</p>
</div>
`
    }
  ],
  references: [
    { label: 'American College of Surgeons - ATLS 10th and 11th Edition', url: 'https://www.facs.org/quality-programs/trauma/education/advanced-trauma-life-support/' },
    { label: 'Colégio Brasileiro de Cirurgiões (CBC) - Diretrizes de Trauma Abdominal', url: 'https://cbc.org.br' },
    { label: 'World Society of Abdominal Compartment Syndrome (WSACS) Guidelines', url: 'https://www.wsacs.org' },
    { label: 'World Society of Emergency Surgery (WSES) Guidelines on Splenic and Liver Trauma', url: 'https://wses.biomedcentral.com' }
  ]
};

console.log('Compilando Aula 062: Trauma Abdominal...');
saveBook(book);
