// scripts/bloco07_group_a/cancer-gastrico-expansao.mjs
export const secCancerGastricoExpansao = [
  {
    id: 'classificacao-molecular-tcga-e-asian-cancer-consortium',
    title: '2.1 Classificação Molecular do Câncer Gástrico (Consórcio TCGA) e Terapias-Alvo Contemporâneas',
    body_html: `
<p>O Consórcio do Atlas do Genoma do Câncer (TCGA - <em>The Cancer Genome Atlas</em>) revolucionou a compreensão da biologia tumoral do adenocarcinoma gástrico em 2014, superando as limitações puramente morfológicas e dividindo a doença em <strong>quatro subtipos moleculares intrínsecos distintos</strong> com implicações terapêuticas diretas:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Subtipo Molecular TCGA</th>
      <th>Frequência Relativa</th>
      <th>Características Genéticas, Epigenéticas e Mecanísticas</th>
      <th>Topografia, Histologia e Resposta Terapêutica</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>1. Positivo para Vírus Epstein-Barr (EBV+)</strong></td>
      <td>~9% dos casos</td>
      <td>Presença do genoma do EBV nas células tumorais; <strong>hipermetilação extensa de ilhas CpG (CIMP extremo)</strong>; mutações frequentes em <em>PIK3CA</em> (~80%) e <em>ARID1A</em>; ausência de mutações em <em>TP53</em>. Marcante <strong>amplificação gênica dos ligantes de morte celular programada PD-L1 e PD-L2</strong> (locus 9p24.1).</td>
      <td>Mais comum no <strong>fundo e corpo gástrico</strong>; predomínio masculino jovem. Histologia com <strong>carcinoma gástrico com estroma linfoide exuberante</strong>. Excelente prognóstico clínico e <strong>taxa de resposta impressionante à imunoterapia com inibidores de checkpoint imune (anti-PD-1: Nivolumabe, Pembrolizumabe)</strong>.</td>
    </tr>
    <tr>
      <td><strong>2. Instabilidade de Microssatélites (MSI-H / dMMR)</strong></td>
      <td>~22% dos casos</td>
      <td>Deficiência das enzimas do sistema de reparo de incompatibilidade do DNA (<em>Mismatch Repair</em> - dMMR: MLH1, MSH2, MSH6, PMS2), decorrente principalmente da <strong>hipermetilação do promotor do gene MLH1</strong> (epigenética somática esporádica) ou raramente mutação germinativa (Síndrome de Lynch). Cursa com <strong>alta carga mutacional tumoral (TMB-high)</strong> e geração massiva de neoantígenos atípicos.</td>
      <td>Idade mais avançada, sexo feminino, localização no antro gástrico, tipo <strong>Intestinal de Lauren</strong>. Excelente prognóstico em estádios iniciais; <strong>resistência relativa à quimioterapia convencional baseada em 5-FU/platina perioperatória</strong>, mas <strong>resposta profunda e duradoura aos inibidores de PD-1 (Nivolumabe/Pembrolizumabe)</strong>, inclusive com taxas elevadas de regressão patológica completa em regimes neoadjuvantes.</td>
    </tr>
    <tr>
      <td><strong>3. Geneticamente Estável (GS - Genomically Stable)</strong></td>
      <td>~20% dos casos</td>
      <td>Baixa frequência de aberrações no número de cópias cromossômicas e baixa taxa de mutações de ponto. Caracteriza-se por <strong>mutações no gene CDH1 (E-caderina)</strong> e fusões gênicas envolvendo a família <strong>RHOA</strong> (que regula motilidade e contratilidade actomiosínica do citoesqueleto) ou fusões <em>CLDN18-ARHGAP</em>.</td>
      <td>Corresponde morfologicamente ao <strong>Tipo Difuso de Lauren (células em anel de sinete / linite plástica)</strong>. Diagnosticado em pacientes mais jovens, com disseminação peritoneal precoce, pior sobrevida global e resposta limitada à quimioterapia convencional. Alvo terapêutico emergente: anticorpo monoclonal anti-Claudina-18.2 (Zolbetuximabe).</td>
    </tr>
    <tr>
      <td><strong>4. Instabilidade Cromossômica (CIN - Chromosomal Instability)</strong></td>
      <td>~50% dos casos (o mais frequente)</td>
      <td>Aneuploidia cromossômica marcante, amplificação e perda massiva de segmentos genômicos. Quase universalmente portador de <strong>mutações inativadoras em TP53</strong> e amplificação focal de receptores tirosina-quinase: <strong>HER2 (ERBB2 em 15%-20%), EGFR, MET, FGFR2</strong> e genes de ciclo celular (<em>CCNE1</em>).</td>
      <td>Predomina na <strong>junção esofagogástrica (JEG) e cárdia</strong>; morfologia típica do <strong>Tipo Intestinal de Lauren</strong>. Responde favoravelmente à quimioterapia com fluoropirimidinas e platinas (FLOT/FOLFOX) e é a população elegível para terapia biológica anti-HER2 com <strong>Trastuzumabe</strong> (ensaio ToGA) ou anti-angiogênicos anti-VEGFR2 (<strong>Ramucirumabe</strong> - estudos REGARD e RAINBOW).</td>
    </tr>
  </tbody>
</table>
`
  },
  {
    id: 'anatomia-linfonodal-japonesa-jgca-estacoes-1-a-16',
    title: '5.1 Anatomia Linfática Topográfica: As 16 Estações Linfonodais da JGCA e Níveis de Dissecção D1, D1+, D2 e D3',
    body_html: `
<p>O controle locorregional oncológico na cirurgia do câncer gástrico é estritamente dependente da anatomia linfonodal sistematizada pela Associação Japonesa de Câncer Gástrico (JGCA), que divide a drenagem gástrica em 16 estações numéricas agrupadas em três compartimentos principais:</p>

<h3>Mapeamento Anatômico das 16 Estações Linfonodais</h3>
<table class="book-table">
  <thead>
    <tr>
      <th>Grupo / Compartimento</th>
      <th>Número da Estação</th>
      <th>Denominação Anatômica Precisa e Localização Cirúrgica</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="6"><strong>Grupo 1: Linfonodos Perigástricos Imediatos (Cadeias 1 a 6)</strong></td>
      <td><strong>Estação 1</strong></td>
      <td>Linfonodos paracardiais direitos (ao longo dos ramos da artéria gástrica direita no cárdia).</td>
    </tr>
    <tr>
      <td><strong>Estação 2</strong></td>
      <td>Linfonodos paracardiais esquerdos (ao longo dos vasos gástricos curtos próximos ao cárdia).</td>
    </tr>
    <tr>
      <td><strong>Estação 3</strong></td>
      <td>Linfonodos ao longo da <strong>pequena curvatura gástrica</strong> (ramos da gástrica esquerda e direita).</td>
    </tr>
    <tr>
      <td><strong>Estação 4sa e 4sb</strong></td>
      <td>Linfonodos da grande curvatura superior e anterior: <strong>4sa</strong> (vasos gástricos curtos) e <strong>4sb</strong> (artéria gastroepiploica esquerda).</td>
    </tr>
    <tr>
      <td><strong>Estação 4d</strong></td>
      <td>Linfonodos da grande curvatura inferior: ao longo da <strong>artéria gastroepiploica direita</strong>.</td>
    </tr>
    <tr>
      <td><strong>Estações 5 e 6</strong></td>
      <td><strong>Estação 5:</strong> Linfonodos suprapilóricos (artéria gástrica direita no piloro);<br><strong>Estação 6:</strong> Linfonodos infrapilóricos (confluência dos vasos gastroepiploicos direitos e gastroduodenais).</td>
    </tr>
    <tr>
      <td rowspan="6"><strong>Grupo 2: Linfonodos ao Longo dos Troncos Celíacos e Retroperitônio (Cadeias 7 a 12)</strong></td>
      <td><strong>Estação 7</strong></td>
      <td>Linfonodos ao longo do tronco da <strong>artéria gástrica esquerda</strong> (entre o tronco celíaco e a bifurcação gástrica).</td>
    </tr>
    <tr>
      <td><strong>Estação 8a e 8p</strong></td>
      <td>Linfonodos ao longo da <strong>artéria hepática comum</strong>: 8a (ramo anterossuperior) e 8p (ramo posterior).</td>
    </tr>
    <tr>
      <td><strong>Estação 9</strong></td>
      <td>Linfonodos ao redor da raiz do <strong>tronco celíaco</strong> (tripé de Haller).</td>
    </tr>
    <tr>
      <td><strong>Estação 10</strong></td>
      <td>Linfonodos do <strong>hilo esplênico</strong> (entre a ponta da cauda pancreática e a superfície medial do baço).</td>
    </tr>
    <tr>
      <td><strong>Estação 11p e 11d</strong></td>
      <td>Linfonodos ao longo da <strong>artéria esplênica</strong>: 11p (segmento proximal da artéria) e 11d (segmento distal da artéria).</td>
    </tr>
    <tr>
      <td><strong>Estação 12a, 12b e 12p</strong></td>
      <td>Linfonodos do <strong>ligamento hepatoduodenal</strong>: 12a (artéria hepática própria), 12b (ao longo do ducto biliar comum) e 12p (veia porta posterior).</td>
    </tr>
    <tr>
      <td rowspan="4"><strong>Grupo 3: Linfonodos Extra-Regionais / Distantes (M1 se Acometidos)</strong></td>
      <td><strong>Estação 13</strong></td>
      <td>Linfonodos retropancreáticos (face posterior da cabeça do pâncreas).</td>
    </tr>
    <tr>
      <td><strong>Estação 14v</strong></td>
      <td>Linfonodos ao longo da veia mesentérica superior (na borda inferior do pâncreas).</td>
    </tr>
    <tr>
      <td><strong>Estação 15</strong></td>
      <td>Linfonodos ao longo da artéria cólica média (no mesocólon transverso).</td>
    </tr>
    <tr>
      <td><strong>Estação 16 (16a1, 16a2, 16b1, 16b2)</strong></td>
      <td>Linfonodos <strong>paraaórticos abdominais</strong> (ao redor da aorta abdominal entre o hiato diafragmático e a bifurcação ilíaca). Metástase nesta cadeia equivale a <strong>M1 sistêmico (Estádio IV)</strong>.</td>
    </tr>
  </tbody>
</table>

<h3>Diferenças Formais entre Níveis de Linfadenectomia</h3>
<ul>
  <li><strong>Linfadenectomia D1:</strong> Ressecção completa e exclusiva das estações perigástricas 1 a 6;</li>
  <li><strong>Linfadenectomia D1+:</strong> Ressecção de D1 associada à dissecção de estações perivasculares selecionadas (estações 7, 8a e 9 na gastrectomia subtotal); indicada em câncer gástrico precoce com risco linfonodal intermediário que não preenche critérios de ESD;</li>
  <li><strong>Linfadenectomia D2:</strong>
    <ul>
      <li><em>Na Gastrectomia Subtotal:</em> Ressecção em monobloco das estações 1, 3, 4sb, 4d, 5, 6 (D1) + estações 7, 8a, 9, 11p e 12a;</li>
      <li><em>Na Gastrectomia Total:</em> Ressecção de D1 (estações 1 a 6) + estações 7, 8a, 9, 10 (se indicado), 11p, 11d e 12a;</li>
    </ul>
  </li>
  <li><strong>Linfadenectomia D3 / D2 Estendida (Dissecção Paraaórtica Estação 16):</strong> Ensaios clínicos prospectivos randomizados (notadamente o estudo japonês JCOG 9501) demonstraram que a adição rotineira da linfadenectomia paraaórtica (D3) NÃO acrescenta benefício de sobrevida em comparação com a linfadenectomia D2 padrão e eleva significativamente a morbidade e mortalidade cirúrgica, estando formalmente proscrita de rotina.</li>
</ul>
`
  },
  {
    id: 'neoplasias-gastricas-nao-adenocarcinoma-gist-linfoma',
    title: '6.1 Neoplasias Gástricas Não Adenocarcinoma: Linfoma MALT Gástrico e Tumor Estromal Gastrointestinal (GIST)',
    body_html: `
<p>Nem toda neoplasia maligna gástrica é um adenocarcinoma. Cerca de 5% a 10% dos tumores gástricos possuem biologia celular, estadiamento e estratégias terapêuticas inteiramente distintas.</p>

<h3>1. Linfoma Gástrico MALT (Tecido Linfoide Associado à Mucosa)</h3>
<p>O estômago normal é desprovido de tecido linfoide organizado. A colonização crônica pelo <em>Helicobacter pylori</em> induz a formação de folículos linfoides secundários na lâmina própria (gastrite folicular), a partir dos quais pode se desenvolver proliferação neoplásica monoclonal de linfócitos B da zona marginal, configurando o <strong>Linfoma MALT Gástrico Extranodal</strong>:</p>
<ul>
  <li><strong>Dependência Fisiopatológica de Antígenos Bacterianos:</strong> Nas fases iniciais, os linfócitos B neoplásicos dependem dos estímulos antigênicos contínuos e da ajuda de células T ativadas pelo <em>H. pylori</em> para proliferar;</li>
  <li><strong>Histopatologia Patognomônica:</strong> Proliferação de linfócitos B centrocyte-like que infiltram e destroem o epitélio glandular foveolar gástrico, formando as clássicas <strong>Lesões Linfoepiteliais</strong>;</li>
  <li><strong>Genética Molecular e Preditores de Resposta:</strong> A presença da translocação cromossômica recíproca <strong>t(11;18)(q21;q21)</strong>, que funde os genes <em>API2</em> e <em>MALT1</em>, confere ativação constitutiva de NF-kB independente de estímulo bacteriano. Pacientes portadores de t(11;18) raramente respondem à erradicação antibiótica isolada;</li>
  <li><strong>Tratamento Padrão-Ouro de Primeira Linha:</strong> <strong>ERRADICAÇÃO EXCLUSIVA DO HELICOBACTER PYLORI com antibióticos orais</strong> (esquema quádruplo por 14 dias). Nos tumores restritos à mucosa/submucosa (estádio I de Ann Arbor) e negativos para t(11;18), a simples erradicação bacteriana propicia <strong>remissão oncológica completa em 75% a 85% dos pacientes sem necessidade de quimioterapia, radioterapia ou cirurgia!</strong>;</li>
  <li>Em caso de falha da erradicação ou tumores com t(11;18), indica-se radioterapia locorregional em dose moderada ou imunoterapia com anticorpo monoclonal anti-CD20 (Rituximabe).</li>
</ul>

<h3>2. Tumor Estromal Gastrointestinal (GIST) Gástrico</h3>
<p>Neoplasia mesenquimal mais comum do trato gastrointestinal, tendo o <strong>estômago como localização primária mais frequente (60% dos casos)</strong>:</p>
<ul>
  <li><strong>Origem Celular:</strong> Células intersticiais de Cajal (os "marcapassos" da motilidade intestinal que coordenam o ritmo elétrico básico da muscular própria);</li>
  <li><strong>Bases Moleculares e Diagnóstico Imuno-Histoquímico:</strong> Cerca de 85% dos GISTs apresentam <strong>mutações ativadoras no oncogene c-KIT (CD117)</strong>, que codifica um receptor tirosina-quinase de membrana. Outros 5% a 10% apresentam mutações em <strong>PDGFR-alfa</strong> (receptor do fator de crescimento derivado de plaquetas alfa). O diagnóstico confirmatório exige <strong>positividade imuno-histoquímica para CD117 (c-KIT) e DOG-1 (<em>Discovered on GIST-1</em>)</strong>;</li>
  <li><strong>Critérios de Estratificação de Risco de Recidiva (Classificação de Miettinen e Fletcher):</strong> Baseia-se no <strong>Tamanho Tumoral</strong> (maior diâmetro em cm), <strong>Índice Mitótico</strong> (número de mitoses por 50 campos de grande aumento - CGA) e <strong>Localização Anatômica</strong> (GISTs gástricos possuem prognóstico biológico significativamente mais favorável do que GISTs do intestino delgado de mesmo tamanho);</li>
  <li><strong>Princípios da Cirurgia Oncológica no GIST:</strong> O GIST <strong>NÃO se dissemina por via linfática</strong> (metástases linfonodais ocorrem em menos de 1% a 2% dos casos). Portanto, <strong>A LINFADENECTOMIA É FORMALMENTE DESNECESSÁRIA</strong>. O tratamento curativo de escolha é a <strong>Ressecção Cirúrgica em Cunha (Gastrectomia em Cunha / R0) com margens microscópicas livres</strong>, manipulando o tumor com extremo cuidado para evitar a ruptura da pseudocápsula tumoral (a ruptura capsular intraoperatória eleva o risco de recidiva peritoneal para praticamente 100%!);</li>
  <li><strong>Terapia-Alvo Farmacológica com Imatinibe (Glivec):</strong> Inibidor oral de tirosina-quinase. Indicado como tratamento adjuvante por 3 anos em pacientes de alto risco de recidiva (tamanho &gt; 5-10 cm ou &gt; 5 mitoses/50 CGA), e como terapia neoadjuvante para <em>downstaging</em> em GISTs gástricos volumosos que exigiriam gastrectomia total mutilante.</li>
</ul>
`
  }
];
