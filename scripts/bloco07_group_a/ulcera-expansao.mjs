// scripts/bloco07_group_a/ulcera-expansao.mjs
export const secUlceraExpansao = [
  {
    id: 'fisiologia-secretora-e-anatomia-vagal',
    title: '1.1 Anatomia Cirúrgica do Estômago, Inervação Vagal e Fisiologia da Secreção Ácida',
    body_html: `
<p>O conhecimento anatômico minucioso da vascularização e da inervação do estômago é a base sobre a qual se estruturaram todas as cirurgias clássicas e contemporâneas para doença ulcerosa péptica e suas complicações.</p>

<h3>Arcos Vasculares Gástricos e Risco de Sangramento Maciço</h3>
<p>O estômago é ricamente vascularizado por uma rede anastomótica submucosa exuberante alimentada por três ramos principais do tronco celíaco:</p>
<ul>
  <li><strong>Pequena Curvatura:</strong> Formada pela anastomose entre a <strong>artéria gástrica esquerda</strong> (ramo direto do tronco celíaco, a maior artéria que supre o estômago) e a <strong>artéria gástrica direita</strong> (ramo da artéria hepática própria ou comum). As úlceras gástricas de pequena curvatura (Johnson I e IV) erodem esses ramos primários, provocando sangramentos arteriais de difícil controle;</li>
  <li><strong>Grande Curvatura:</strong> Suprida pelo arco formado pela <strong>artéria gastroepiploica esquerda</strong> (ramo da artéria esplênica) e pela <strong>artéria gastroepiploica direita</strong> (ramo da artéria gastroduodenal, que emerge da artéria hepática comum);</li>
  <li><strong>Fundo Gástrico:</strong> Irrigado pelas <strong>artérias gástricas curtas</strong> (ramos terminais da artéria esplênica que transitam pelo ligamento gastroesplênico);</li>
  <li><strong>A Artéria Gastroduodenal e o Bulbo Duodenal Posterior:</strong> A artéria gastroduodenal transita imediatamente posterior à primeira porção do duodeno (bulbo duodenal). As úlceras localizadas na <strong>parede posterior do bulbo duodenal</strong> penetram diretamente no trajeto dessa artéria calibrosa, desencadeando hemorragia digestiva alta cataclísmica com instabilidade hemodinâmica extrema (choque hipovolêmico de classe III ou IV).</li>
</ul>

<h3>Inervação Vagal e Tipos Clássicos de Vagotomia Cirúrgica</h3>
<p>O nervo vago (X par craniano) fornece os estímulos colinérgicos essenciais para a secreção cloridropéptica das células parietais. No hiato esofágico, o vago anterior (esquerdo) divide-se em ramo hepático e nervo principal anterior de Latarjet (que corre ao longo da pequena curvatura); o vago posterior (direito) divide-se em ramo celíaco e nervo principal posterior de Latarjet (com o nervo da "pequena curvatura de Grassi" que inerva o fundo gástrico):</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Tipo de Vagotomia</th>
      <th>Nível Anatômico de Secção Cirúrgica</th>
      <th>Efeitos Fisiológicos e Consequências Motores</th>
      <th>Necessidade de Procedimento de Drenagem Pilórica</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Vagotomia Troncular (VT)</strong></td>
      <td>Secção dos troncos vagais anterior e posterior no nível do esôfago distal abdominal, imediatamente acima do cárdia.</td>
      <td>Desnervação parassimpática completa de todo o estômago, vesícula biliar, árvore biliar, pâncreas e intestino até a flexura esplênica do cólon. Causa atonia gástrica com espasmo pilórico permanente.</td>
      <td><strong>OBRIGATÓRIA</strong> drenagem gástrica (Piloroplastia de Heineke-Mikulicz, gastroduodenostomia ou gastroenterostomia) para evitar retenção gástrica intratável.</td>
    </tr>
    <tr>
      <td><strong>Vagotomia Seletiva (VS)</strong></td>
      <td>Secção dos ramos gástricos dos vagos abaixo da emergência dos ramos hepático e celíaco.</td>
      <td>Preserva a inervação parassimpática da vesícula biliar e intestino delgado, mas desnerva integralmente a musculatura gástrica corporal e antral.</td>
      <td><strong>OBRIGATÓRIA</strong> drenagem gástrica concomitante (piloroplastia).</td>
    </tr>
    <tr>
      <td><strong>Vagotomia Superseletiva (VSS) / Gástrica Proximal</strong></td>
      <td>Secção minuciosa apenas dos pequenos ramos nervosos parietais que atingem o corpo e fundo gástrico, <strong>preservando os nervos de Latarjet e a inervação da "pata de corvo" antral (esfíncter pilórico)</strong>.</td>
      <td>Reduz seletivamente a massa ácida sem paralisar o esvaziamento motor do antro e piloro. Mantém a motilidade gástrica fisiológica.</td>
      <td><strong>NÃO necessita de procedimento de drenagem pilórica</strong>. Menor incidência de síndrome de dumping e diarreia, porém com maior índice de recidiva ulcerosa se realizada por mãos inexperientes.</td>
    </tr>
  </tbody>
</table>
`
  },
  {
    id: 'sindromes-pos-gastrectomia-e-dumping',
    title: '4.1 Complicações Cirúrgicas Tardias: Síndromes Pós-Gastrectomia, Dumping e Gastrite por Refluxo Alcalino',
    body_html: `
<p>A despeito da redução acentuada das cirurgias eletivas de úlcera após a introdução dos IBPs e dos regimes de erradicação do <em>H. pylori</em>, inúmeros pacientes que foram submetidos a ressecções gástricas parciais ou totais (Billroth I, Billroth II ou reconstruções em Y de Roux) continuam a demandar acompanhamento ambulatorial pelas síndromes pós-gastrectomia.</p>

<h3>1. Síndrome de Dumping (Esvaziamento Gástrico Rápido)</h3>
<p>A perda do mecanismo regulador de esfíncter pilórico e da capacidade de reservatório gástrico permite que quimos hiperosmolares concentrados cheguem abruptamente ao jejuno proximal:</p>
<ul>
  <li><strong>Dumping Precoce (15 a 30 minutos pós-prandial):</strong> A chegada de quimo hiperosmolar no jejuno promove um desvio osmótico maciço de fluidos vasculares para a luz intestinal, gerando hipovolemia intravascular aguda, hipotensão arterial, taquicardia reflexa, palpitações, sudorese fria, tontura e diarreia osmótica explosiva com cólicas abdominais. <em>Tratamento:</em> Modificações dietéticas (refeições fracionadas e pequenas, diminuição drástica de carboidratos simples, evitar ingestão de líquidos durante as refeições alimentares e repousar em decúbito dorsal após comer);</li>
  <li><strong>Dumping Tardio (1 a 3 horas pós-prandial):</strong> Decorre da absorção ultrarrápida de glicose no jejuno, disparando um pico maciço de secreção de insulina pelas células beta pancreáticas. Quando a glicose intraluminal já foi totalmente absorvida, os altos níveis circulantes de insulina promovem <strong>hipoglicemia hiperinsulinêmica reativa</strong>, com tremores, sudorese, confusão mental, fome intensa e síncope. <em>Tratamento:</em> Fracionamento de carboidratos complexos ricos em fibras e uso de acarbose (inibidor da alfa-glicosidase).</li>
</ul>

<h3>2. Gastrite por Refluxo Alcalino (Biliar)</h3>
<p>Ocorre tipicamente após reconstruções à <strong>Billroth II</strong> (gastrojejunostomia em alça com trânsito de bile e suco pancreático banhando diretamente o coto gástrico). O contato constante de ácidos biliares e enzimas pancreáticas com a mucosa gástrica residual desencadeia quebra severa da barreira mucosa com gastrite erosiva intensa:</p>
<ul>
  <li><strong>Quadro Clínico:</strong> Dor epigástrica contínua e em queimação, que <strong>NÃO melhora e comumente piora com a alimentação e antiácidos</strong>, associada a vômitos biliosos que NÃO aliviam a dor;</li>
  <li><strong>Tratamento Padrão-Ouro:</strong> Conversão cirúrgica da reconstrução de Billroth II para <strong>Gastrojejunostomia em Y de Roux com alça alimentar jejunal de pelo menos 50 a 60 cm</strong>, desviando o trânsito biliopancreático para longe do coto gástrico.</li>
</ul>

<h3>3. Síndrome da Alça Aferente e Síndrome da Alça Eferente</h3>
<table class="book-table">
  <thead>
    <tr>
      <th>Entidade</th>
      <th>Mecanismo Fisiopatológico</th>
      <th>Apresentação Clínica Típica e Conduta</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Síndrome da Alça Aferente (Billroth II)</strong></td>
      <td>Obstrução mecânica parcial ou intermitente da alça duodenojejunal aferente por torção, volvo, hérnia interna ou aderências, acumulando secreção biliar e pancreática sob alta pressão.</td>
      <td>Dor intensa e sensação de plenitude epigástrica pós-prandial que é aliviada subitamente por <strong>vômitos biliosos em jato sem restos alimentares</strong>. Tratamento cirúrgico com conversão para Y de Roux ou enteroenterostomia de Braun.</td>
    </tr>
    <tr>
      <td><strong>Síndrome da Alça Eferente</strong></td>
      <td>Obstrução mecânica da alça jejunal que conduz os alimentos (alça eferente), por estenose cicatricial, brida ou intussuscepção.</td>
      <td>Vômitos pós-prandiais volumosos <strong>contendo restos alimentares</strong> associados a cólica abdominal severa. Requer reintervenção cirúrgica com desobstrução mecânica.</td>
    </tr>
  </tbody>
</table>
`
  },
  {
    id: 'diagnostico-diferencial-e-zollinger-ellison',
    title: '7.1 Diagnóstico Diferencial de Úlceras Refratárias e Síndrome de Zollinger-Ellison (Gastrinoma)',
    body_html: `
<p>Embora a imensa maioria das úlceras decorra de <em>H. pylori</em> ou AINEs, a persistência de úlcera ativa após tratamento pleno com IBP por 8 a 12 semanas exige investigação sistemática de causas atípicas e síndromes hipersecretórias.</p>

<h3>Critérios de Suspeição da Síndrome de Zollinger-Ellison (SZE)</h3>
<p>A SZE decorre de um tumor neuroendócrino produtor ectópico de gastrina (gastrinoma), localizado no chamado <strong>Triângulo dos Gastrinomas (de Stabile e Passaro)</strong>: delimitado pela confluência dos ductos cístico e colédoco superiormente, transição entre a segunda e terceira porção do duodeno inferiormente e colo/corpo do pâncreas medialmente. Cerca de 60% a 90% dos gastrinomas originam-se na parede duodenal ou cabeça pancreática.</p>

<p>Deve-se suspeitar ativamente de gastrinoma diante de:</p>
<ul>
  <li>Úlceras pépticas refratárias ao tratamento clínico habitual ou recidivas frequentes na ausência de <em>H. pylori</em> e AINEs;</li>
  <li>Úlceras em localizações anatômicas anômalas (segunda, terceira ou quarta porção duodenal ou jejuno proximal);</li>
  <li>Úlceras múltiplas simultâneas ou associadas a esofagite erosiva severa e estenoses pépticas extensas;</li>
  <li>Diarreia crônica aquosa que melhora dramaticamente com a administração de IBP em doses elevadas (a hiperacidez gástrica inativa a lipase pancreática intraluminal e lesa as vilosidades jejunais, gerando má-absorção lipídica e diarreia osmótica);</li>
  <li>História familiar de hiperparatireoidismo, nefrolitíase recorrente ou adenomas hipofisários, configurando a <strong>Neoplasia Endócrina Múltipla tipo 1 (NEM-1)</strong>, responsável por cerca de 20% a 25% dos casos de SZE (mutação no gene da menina no cromossomo 11q13).</li>
</ul>

<h3>Propedêutica Diagnóstica na Síndrome de Zollinger-Ellison</h3>
<ol>
  <li><strong>Gastrina Sérica em Jejum:</strong> Valores basais superiores a 1.000 pg/mL na presença de pH gástrico &lt; 2,0 são diagnósticos de gastrinoma. Em pacientes com gastrina moderadamente elevada (150 a 1.000 pg/mL), é mandatório realizar o <strong>Teste de Estímulo com Secretina</strong>;</li>
  <li><strong>Teste de Estímulo com Secretina:</strong> A secretina fisiologicamente inibe a liberação de gastrina pelas células G normais; entretanto, nas células tumorais do gastrinoma, ela estimula paradoxalmente a secreção hormonal. Uma elevação da gastrina sérica <strong>&gt; 120 a 200 pg/mL sobre o valor basal</strong> após a injeção endovenosa de secretina confirma inequivocamente a presença de gastrinoma;</li>
  <li><strong>Localização Topográfica Tumoral:</strong> Realizada por Cintilografia de Receptores de Somatostatina (Octreoscan) ou preferencialmente pelo <strong>PET/CT com Gálio-68 DOTATATO</strong> (método com sensibilidade superior a 90%), associado a Ecoendoscopia biliopancreática (EUS) para guiar a ressecção cirúrgica curativa (enucleação tumoral ou duodenotomia com ressecção).</li>
</ol>
`
  }
];
