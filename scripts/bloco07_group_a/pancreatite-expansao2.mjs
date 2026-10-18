// scripts/bloco07_group_a/pancreatite-expansao2.mjs
export const secPancreatiteExpansao2 = [
  {
    id: 'diagnostico-por-imagem-tc-rm-eus',
    title: '3.1 Propedêutica por Imagem Avançada: TC Dinâmica com Protocolo Pancreático, Índice de Gravidade Tomográfico de Balthazar e Ressonância Magnética',
    body_html: `
<p>Embora a avaliação tomográfica não seja recomendada nas primeiras 48 a 72 horas em pacientes estáveis com diagnóstico clínico-laboratorial consolidado, a Tomografia Computadorizada (TC) helicoidal com contraste endovenoso e protocolo pancreático dedicado de dupla fase (fase arterial pancreática tardia aos 40 segundos e fase venosa portal aos 65-70 segundos) representa o padrão de referência para caracterizar complicações necróticas e estruturais.</p>

<h3>Índice de Gravidade Tomográfica de Balthazar Modificado (MCTSI)</h3>
<p>O índice tomográfico modificado por Mortele e Balthazar correlaciona-se com acurácia superior à mortalidade hospitalar, tempo de permanência em UTI e necessidade de intervenção percutânea ou cirúrgica quando comparado ao escore original de Balthazar de 1985:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Critério Avaliado</th>
      <th>Descrição Radiológica Específica</th>
      <th>Pontuação</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Inflamação Pancreática</strong></td>
      <td>Pâncreas normal.<br>Alteração intrínseca com edema e borramento do plano adiposo peripancreático.<br>Coleção líquida peripancreática única ou necrose da gordura peripancreática.<br>Duas ou mais coleções líquidas peripancreáticas ou presença de gás retroperitoneal.</td>
      <td>0 pontos<br>2 pontos<br>4 pontos<br>4 pontos</td>
    </tr>
    <tr>
      <td><strong>Extensão da Necrose Parenquimatosa</strong></td>
      <td>Ausência de necrose parenquimatosa (realce homogêneo pelo meio de contraste).<br>Necrose &lt;= 30% do parênquima glandular.<br>Necrose &gt; 30% do parênquima glandular.</td>
      <td>0 pontos<br>2 pontos<br>4 pontos</td>
    </tr>
    <tr>
      <td><strong>Complicações Extrapancreáticas</strong></td>
      <td>Presença de derrame pleural volumoso, ascite pericólica/pélvica, trombose venosa esplênica/portal ou complicações vasculares pseudoaneurismáticas.</td>
      <td>2 pontos adicionais</td>
    </tr>
  </tbody>
</table>

<p><strong>Estratificação Prognóstica do Índice Modificado (MCTSI):</strong></p>
<ul>
  <li><strong>Leve (0 a 2 pontos):</strong> Mortalidade 0%; morbidade e complicações &lt; 5%;</li>
  <li><strong>Moderada (4 a 6 pontos):</strong> Mortalidade &lt; 5%; complicações locais e sistêmicas em até 35%;</li>
  <li><strong>Grave (8 a 10 pontos):</strong> Mortalidade de 15% a 25%; necessidade de intervenção ou internação em UTI superior a 80%.</li>
</ul>

<h3>Papel Estratégico da Ressonância Magnética (RM) e Colangiorressonância</h3>
<p>A Ressonância Magnética abdominal com sequências ponderadas em T2, difusão (DWI) e colangiorressonância magnética (CPRM) oferece vantagens cruciais sobre a tomografia computadorizada em situações selecionadas:</p>
<ul>
  <li><strong>Pacientes com Insuficiência Renal ou Alergia Severa ao Iodo:</strong> A RM não requer contraste iodado e pode dispensar o gadolínio em casos de taxa de filtração glomerular crítica (&lt; 15 mL/min);</li>
  <li><strong>Diferenciação Superior de Conteúdo Líquido versus Necrose Sólida:</strong> Em sequências pesadas em T2, os restos necróticos sólidos (<em>debris</em>) apresentam hipossinal heterogêneo entremeado pelo hipersinal líquido homogêneo, permitindo diferenciar com precisão absoluta uma WON (necrose encapsulada com debris) de um pseudocisto (líquido puro), o que dita a escolha do calibre do dreno ou tipo de prótese metálica de aposição luminal (LAMS);</li>
  <li><strong>Avaliação da Integridade do Ducto de Wirsung (Síndrome do Ducto Desconectado):</strong> A CPRM com reconstrução tridimensional identifica se houve necrose transmural do colo ou corpo pancreático, desconectando a cauda viável remanescente da papila duodenal, complicação que predispõe a fístulas pancreáticas externas crônicas e pseudocistos recidivantes.</li>
</ul>
`
  },
  {
    id: 'complicacoes-vasculares-e-hemorragicas',
    title: '5.1 Complicações Vasculares e Hemorrágicas: Trombose Esplenoportal e Pseudoaneurisma Arterial',
    body_html: `
<p>A proximidade anatômica íntima do leito pancreático com as grandes estruturas vasculares abdominais expõe o sistema venoso portal e as artérias peripancreáticas à ação lítica direta de elastases e proteases extravasadas durante os episódios de pancreatite necrosante grave.</p>

<h3>1. Trombose do Eixo Venoso Esplenoportal e Hipertensão Portal Segmentar</h3>
<p>A veia esplênica repousa diretamente na face posterior do corpo e da cauda do pâncreas. Em decorrência do espessamento inflamatório adjacente e da lesão endotelial por contiguidade, a trombose da veia esplênica ocorre em 10% a 25% dos pacientes com pancreatite necrosante.</p>
<ul>
  <li><strong>Consequência Hemodinâmica:</strong> Instala-se o quadro clássico de <strong>Hipertensão Portal Sinistral ou Segmentar (Esquerda)</strong>. Como a pressão venosa esplênica se eleva retrogradamente, o fluxo sanguíneo do baço desvia-se pelos vasos gástricos curtos e veia gastroepiploica esquerda, desaguando na veia gástrica coronária ou sistema ázigos;</li>
  <li><strong>Quadro Clínico e Endoscópico:</strong> Formação de <strong>varizes gástricas fúndicas isoladas</strong> sem varizes de esôfago e associadas a esplenomegalia progressiva. A função hepática é rigorosamente normal e a veia porta é habitualmente pérvia;</li>
  <li><strong>Manejo:</strong> Na fase aguda assintomática, a anticoagulação plena sistêmica é controversa pelo risco concomitante de sangramento na necrose retroperitoneal, sendo reservada para casos com extensão da trombose para a veia mesentérica superior ou tronco da veia porta. Se o paciente apresentar hemorragia digestiva alta varicosa fúndica maciça refratária ao controle endoscópico por cianoacrilato, a <strong>esplenectomia cirúrgica</strong> é o tratamento curativo definitivo, interrompendo o hiperfluxo venoso para o fundo gástrico.</li>
</ul>

<h3>2. Pseudoaneurisma Arterial e Hemorragia Maciça Retroperitoneal</h3>
<p>A elastase pancreática ativada digere seletivamente as túnicas elásticas média e adventícia das artérias regionais, enfraquecendo a parede vascular e permitindo a dilatação pulsátil pseudoaneurismática, contida apenas por fibrina e tecidos perivasculares frouxos:</p>
<ul>
  <li><strong>Artérias mais comumente acometidas:</strong> Artéria esplênica (40%-50%), artéria gastroduodenal (20%-30%), artéria pancreatoduodenal e artéria hepática própria;</li>
  <li><strong>Apresentação Clínica:</strong> Queda súbita e inexplicável do hematócrito, choque hipovolêmico abrupto com dor abdominal em pontada, ou hemorragia digestiva maciça exteriorizada por hematêmese ou melena devido à fístula da artéria no ducto pancreático (<strong>hemossucus pancreático</strong> - exteriorização de sangue vivo através da papila duodenal de Vater à EDA) ou fístula em víscera oca adjacente (estômago ou duodeno);</li>
  <li><strong>Tratamento Padrão-Ouro:</strong> <strong>Arteriografia diagnóstica de emergência associada a embolização transcateter</strong> (com molas/<em>coils</em>, cola biológica ou stent vascular recoberto). A embolização endovascular alcança sucesso imediato em &gt; 80%-90% dos casos com taxa de mortalidade significativamente inferior à exploração cirúrgica aberta de urgência em campo retroperitoneal friável e hostil.</li>
</ul>
`
  }
];
