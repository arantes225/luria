// scripts/bloco07_group_a/ulcera-expansao3.mjs
export const secUlceraExpansao3 = [
  {
    id: 'fisiopatologia-mucosa-e-prostaglandinas',
    title: '1.2 Mecanismos Moleculares de Barreira Mucosa, Óxido Nítrico, Hsp70 e Síntese de Prostaglandinas',
    body_html: `
<p>A proteção da mucosa gastroduodenal contra o gradiente eletroquímico adverso de íons hidrogênio (que chega a ser de um milhão para um entre a luz gástrica e o espaço intracelular) reside em refinados mecanismos celulares regulados por eicosanoides e mensageiros gasosos.</p>

<h3>O Eixo COX-1/COX-2 e as Prostaglandinas Citoprotetoras</h3>
<p>O ácido araquidônico, liberado das membranas celulares pela fosfolipase A2, é convertido em prostaglandinas pelas isoenzimas ciclo-oxigenase (COX):</p>
<ul>
  <li><strong>Ciclo-oxigenase 1 (COX-1):</strong> Expressa constitutivamente no epitélio gástrico, endotélio vascular e plaquetas. Gera predominantemente <strong>prostaglandina E2 (PGE2)</strong> e <strong>prostaciclina (PGI2)</strong>. A PGE2 liga-se a receptores acoplados à proteína Gi (receptores EP3) nas células parietais, inibindo a adenilil ciclase e suprimindo a secreção ácida induzida por histamina. Simultaneamente, através dos receptores EP4 nas células epiteliais superficiais, ativa a síntese e exocitose de grânulos de mucina e estimula o trocador apical de cloreto/bicarbonato (SLC26A6/DRA), criando a barreira pré-epitelial de muco-bicarbonato;</li>
  <li><strong>Ciclo-oxigenase 2 (COX-2):</strong> Enzima induzível por citocinas inflamatórias, mas que no leito gastroduodenal também desempenha papel fisiológico basal na cicatrização de microerosões e na angiogênese tecidual reparadora. A inibição seletiva da COX-2 (coxibes como celecoxibe) reduz em cerca de 50% o risco de lesões ulcerosas quando comparada a AINEs não seletivos, porém não zera o risco e eleva eventos cardiovasculares trombóticos;</li>
  <li><strong>Papel do Óxido Nítrico (NO) e Peptídeos Trefoil:</strong> O óxido nítrico sintetizado pela eNOS endotelial atua em sinergia com a PGE2 mantendo a perfusão da microcirculação submucosa. Os peptídeos trefoil (TFF1 no estômago e TFF2 no duodeno) ancoram-se na camada de muco, estabilizando as ligações dissulfeto das macromoléculas de mucina MUC5AC e MUC6, facilitando a rápida restituição celular (migração de células viáveis sobre a membrana basal denudada em minutos após o dano).</li>
</ul>
`
  },
  {
    id: 'profilaxia-ulceras-estresse-curling-cushing',
    title: '3.2 Úlceras de Estresse em Pacientes Críticos: Úlceras de Curling, Cushing e Profilaxia de Sangramento na UTI',
    body_html: `
<p>Em pacientes internados em Unidades de Terapia Intensiva sob estresse fisiológico extremo, a patogênese da lesão aguda da mucosa gástrica (LAMG) diverge da doença ulcerosa péptica crônica clássica.</p>

<h3>Úlcera de Curling versus Úlcera de Cushing</h3>
<table class="book-table">
  <thead>
    <tr>
      <th>Entidade</th>
      <th>Contexto Clínico Primário</th>
      <th>Mecanismo Fisiopatológico Central</th>
      <th>Características Clínicas</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Úlcera de Curling</strong></td>
      <td><strong>Grandes Queimados</strong> (acometimento de &gt; 25% a 30% da superfície corporal queimada).</td>
      <td>Hipovolemia profunda decorrente da perda plasmática na área queimada, gerando vasoconstrição esplâncnica isquêmica intensa, colapso da barreira mucosa e necrose epitelial.</td>
      <td>Ulcerações comumente superficiais, múltiplas, no fundo e corpo gástrico ou duodeno; alto potencial hemorrágico nas primeiras 72 horas pós-queimadura.</td>
    </tr>
    <tr>
      <td><strong>Úlcera de Cushing</strong></td>
      <td><strong>Traumatismo Cranioencefálico (TCE) Grave, Hemorragia Intracraniana ou Neoplasias do SNC</strong> com Hipertensão Intracraniana (HIC).</td>
      <td>Hiperestimulação dos núcleos vagais no tronco encefálico (estímulo colinérgico central excessivo), levando à <strong>HIPERSECREÇÃO ÁCIDA MACIÇA</strong> por aumento do tônus parassimpático e liberação de gastrina.</td>
      <td>Úlcera habitualmente única, profunda e de alta agressividade, com elevada tendência a <strong>PERFURAÇÃO LIVRE</strong> gástrica ou duodenal e sangramento maciço.</td>
    </tr>
  </tbody>
</table>

<h3>Critérios Rígidos de Profilaxia da Úlcera de Estresse na UTI</h3>
<p>O uso indiscriminado de IBP em todos os pacientes hospitalizados é deletério, associando-se a infecção por <em>Clostridioides difficile</em>, pneumonia associada à ventilação mecânica e fraturas ósseas. As diretrizes internacionais de terapia intensiva indicam <strong>profilaxia farmacológica (com IBP ou antagonista H2) apenas na presença de FATORES DE RISCO MAIORES COMPROVADOS</strong>:</p>
<ol>
  <li><strong>Ventilação Mecânica Invasiva por mais de 48 horas;</strong></li>
  <li><strong>Coagulopatia Grave:</strong> Plaquetas &lt; 50.000/mm³, RNI &gt; 1,5 ou TTPa &gt; 2x o controle basal;</li>
  <li><strong>Traumatismo Cranioencefálico Grave</strong> (Glasgow &lt;= 8);</li>
  <li><strong>Grandes Queimados</strong> (&gt; 30% da área de superfície corporal);</li>
  <li><strong>Choque Séptico com necessidade de vasopressores contínuos;</strong></li>
  <li><strong>Histórico documentado de sangramento gastrointestinal alto no último ano.</strong></li>
</ol>
`
  }
];
