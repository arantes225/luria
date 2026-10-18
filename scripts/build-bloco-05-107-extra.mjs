// scripts/build-bloco-05-107-extra.mjs
// Seção extra para Aula 107: Hérnias da Parede Abdominal

export const secBiologiaTelas = {
  id: 'biologia-das-telas-sinteticas-e-reconstrucao-complexa',
  title: '4. Biologia das Telas Sintéticas, Biomateriais e Princípios de Reconstrução da Parede Abdominal Complexa',
  body_html: `
<h3>Ciência dos Materiais Cirúrgicos: Classificação Biomecânica das Telas</h3>
<p>O sucesso das hernioplastias modernas depende intrinsecamente da interação biológica entre a prótese sintética e os tecidos conjuntivos do hospedeiro. A escolha do biomaterial adequado requer a compreensão da classificação de Amid para telas cirúrgicas:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Tipo de Tela (Classificação de Amid)</th>
      <th>Estrutura Físico-Química e Tamanho dos Poros</th>
      <th>Exemplos Comerciais e Resposta Tecidual</th>
      <th>Indicações e Contraindicações Clínicas</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Tipo I (Macroporosas Monofilamentares)</strong></td>
      <td><strong>Poros &gt; 75 $\mu$m (idealmente &gt; 1 a 1,5 mm)</strong>, constituídas por fios monofilamentares de <strong>Polipropileno</strong> puro.</td>
      <td>Marlex, Prolene, Trelex. Permite livre trânsito e infiltração de macrófagos (15 a 20 $\mu$m), neutrófilos e neovascularização fibroblástica tecidual.</td>
      <td><strong>O padrão-ouro absoluto para hernioplastias abertas (Lichtenstein) e laparoscópicas (TAPP/TEP)</strong>. Altíssima resistência à infecção bacteriana; caso ocorra infecção superficial ou moderada de ferida, a tela habitualmente pode ser preservada com antibioticoterapia e curativos sem necessidade de explantação cirúrgica.</td>
    </tr>
    <tr>
      <td><strong>Tipo II (Microporosas)</strong></td>
      <td><strong>Poros &lt; 10 $\mu$m</strong>, constituídas por películas sólidas de <strong>ePTFE (Politetrafluoroetileno expandido)</strong>.</td>
      <td>Gore-Tex. O tamanho diminuto dos microporos impede a entrada de macrófagos e fibroblastos, mas permite a colonização por bactérias menores (como <em>Staphylococcus aureus</em>, 1 $\mu$m).</td>
      <td>Baixa aderência visceral (pode ficar em contato direto com o intestino). <strong>Desvantagem crítica:</strong> Se infectada, a colonização bacteriana intraluminal torna-se inatingível pelo sistema imune do paciente e antibióticos sistêmicos, <strong>exigindo a remoção cirúrgica mandatória da prótese</strong>. Rara utilização na virilha hoje.</td>
    </tr>
    <tr>
      <td><strong>Tipo III (Macroporosas com Componente Multifilamentar)</strong></td>
      <td>Telas macroporosas tecidas com fios trançados/multifilamentares (poliéster / dacron ou polipropileno trançado).</td>
      <td>Mersilene, Surgipro. As microfendas entre os filamentos individuais aprisionam colônias bacterianas.</td>
      <td>Altas taxas de infecção bacteriana persistente, formação de fístulas e extrusão de tela. Amplamente desaconselhadas na cirurgia moderna.</td>
    </tr>
    <tr>
      <td><strong>Tipo IV (Compostas / Dupla Face)</strong></td>
      <td>Biomateriais híbridos com duas faces distintas: uma face parietal macroporosa de polipropileno/poliéster para fixação na parede e uma face visceral antiaderente lisa (colágeno, celulose oxidada regenerada, ácido hialurônico ou hidrogel).</td>
      <td>Proceed, Parietex Composite, Ultrapro. A face lisa protege as alças intestinais contra aderências densas e fístulas entéricas durante as primeiras 2 a 4 semanas críticas.</td>
      <td>Indicadas em <strong>reparos de hérnias incisionais ventrais por via laparoscópica (IPOM - Intraperitoneal Onlay Mesh)</strong>, onde a tela fica necessariamente posicionada em contato íntimo direto com as alças intestinais na cavidade peritoneal.</td>
    </tr>
  </tbody>
</table>

<h3>A Gramatura das Telas: Telas Pesadas vs Telas de Baixa Gramatura (Leves)</h3>
<p>A reação inflamatória crônica induzida pelo corpo estranho resulta em formação de cápsula fibrótica e contração da tela (<em>shrinkage</em>), que pode encolher de 20% a 50% de sua área original:</p>
<ul>
  <li><strong>Telas Pesadas Convencionais (Heavyweight, $> 80$ g/m²):</strong> Possuem grande massa de polipropileno e poros menores. Induzem intensa fibrose rígida e espessa ("placa de couraça"), associando-se a maior sensação de corpo estranho, menor flexibilidade da parede e taxas mais altas de inguinodinia crônica nociceptiva;</li>
  <li><strong>Telas Leves / Baixa Gramatura (Lightweight, $< 35$ a $50$ g/m²):</strong> Possuem poros ultra-amplos ($> 2$ a 4 mm) e menor massa de plástico residual, com preservação de força biomecânica suficiente (a pressão intra-abdominal máxima fisiológica humana de pico durante tosse violenta não ultrapassa 150 a 180 mmHg, enquanto as telas leves suportam pressões $> 500$ mmHg). Oferecem menor reação inflamatória a corpo estranho, melhor elasticidade fisiológica da virilha e <strong>menor incidência de dor crônica pós-operatória</strong>.</li>
</ul>

<h3>Princípios de Fechamento da Parede e Prevenção de Hérnias Incisionais</h3>
<p>O ensaio clínico multicêntrico europeu <strong>STITCH (Lancet 2015)</strong> revolucionou as recomendações técnicas internacionais para o fechamento de laparotomias medianas:</p>
<ul>
  <li><strong>A Técnica das Pequenas Mordidas (Small Bites Technique):</strong> O fechamento aponeurótico em linha média deve ser realizado com sutura contínua com fio monofilamentar absorvível de absorção lenta (Polidioxanona / PDS 2-0 ou 3-0 com agulha pequena), aplicando mordidas de apenas <strong>5 mm da borda aponeurótica e com espaçamento entre pontos de 5 mm</strong>, avançando sem estrangulamento tecidual;</li>
  <li><strong>A Regra da Proporção Comprimento da Sutura : Comprimento da Ferida ($\ge 4:1$):</strong> Para cada 1 cm de ferida cirúrgica, devem ser gastos pelo menos 4 cm de fio de sutura. A técnica de pequenas mordidas (small bites) reduziu a taxa de hérnia incisional de 21% (na técnica clássica de grandes mordidas de 1 cm) para apenas <strong>13%</strong> após 1 ano de seguimento com significância estatística indiscutível.</li>
</ul>

<h3>Planos Anatômicos de Fixação de Telas em Hérnias Ventrais e Incisionais</h3>
<p>A localização da prótese em relação aos planos musculoaponeuróticos da parede abdominal determina o índice de complicações serofibrinosas e recidivas:</p>
<ol>
  <li><strong>Onlay (Pré-fascial / Subcutânea):</strong> A tela é suturada sobre a aponeurose anterior dos retos abdominais, logo abaixo do tecido celular subcutâneo. <em>Desvantagens:</em> Exige extenso descolamento do subcutâneo com desvascularização tecidual, cursando com altíssimas taxas de seroma volumoso (até 30% a 40%) e infecção de ferida operatória. Técnica em desuso;</li>
  <li><strong>Inlay (Interposicional):</strong> A tela é suturada nas bordas aponeuróticas retraídas, preenchendo o defeito como uma ponte sem fechar a linha média. Apresenta taxas inaceitáveis de recidiva (&gt; 50%) e não deve ser realizada;</li>
  <li><strong>Sublay / Retromuscular (Técnica de Rives-Stoppa):</strong> A tela é alocada no espaço retro-muscular pré-fascial (atrás do ventre do músculo reto abdominal e anteriormente ao folheto posterior da bainha dos retos e peritônio). <strong>É o padrão-ouro cirúrgico absoluto</strong>: a pressão intra-abdominal empurra a tela contra a parede muscular posterior, mantendo-a firmemente posicionada; excelente vascularização muscular que previne infecções; e isolamento completo das vísceras abdominais sem contato com as alças;</li>
  <li><strong>Underlay / IPOM (Intraperitoneal):</strong> A tela é fixada no interior da cavidade peritoneal diretamente sobre o peritônio parietal por videolaparoscopia. Exige obrigatoriamente tela composta com barreira antiaderente visceral.</li>
</ol>
`
};
