// scripts/bloco07_group_a/cancer-gastrico-expansao4.mjs
export const secCancerGastricoExpansao4 = [
  {
    id: 'fisiopatologia-da-nutricao-e-seguimento-oncologico',
    title: '5.4 Repercussões Nutricionais, Anemia Pós-Gastrectomia e Rotina de Seguimento Oncológico',
    body_html: `
<p>A perda do estômago acarreta perturbações profundas na fisiologia digestiva e na homeostase de micronutrientes, exigindo suporte nutricional e reposição preventiva contínua:</p>

<h3>Fisiopatologia dos Déficits Nutricionais Pós-Gastrectomia</h3>
<ul>
  <li><strong>Deficiência de Vitamina B12 (Cobalamina):</strong> As células parietais gástricas do corpo e fundo são as únicas produtoras do <strong>fator intrínseco (glicoproteína de 44 kDa)</strong>. Na gastrectomia total, a ausência absoluta de fator intrínseco impede a formação do complexo cobalamina-FI e sua captação pelos receptores de cubilina no íleo terminal. Como as reservas hepáticas de B12 duram de 2 a 3 anos, o paciente evoluirá invariavelmente para anemia megaloblástica grave e mielopatia desmielinizante se não receber <strong>suplementação intramuscular mensal de hidroxocobalamina / cianocobalamina por toda a vida</strong>;</li>
  <li><strong>Deficiência de Ferro (Anemia Ferropriva Refratária):</strong> O ácido clorídrico gástrico é indispensável para dissociar o ferro férrico (Fe3+) ligado às proteínas da dieta e reduzi-lo a ferro ferroso (Fe2+), forma prontamente absorvível pelo transportador DMT1 no duodeno. A ressecção gástrica com desvio duodenal na reconstrução em Y de Roux exclui o duodeno do trânsito alimentar, levando a má-absorção profunda de ferro que frequentemente exige reposição endovenosa periódica;</li>
  <li><strong>Doença Óssea Metabólica (Osteomalácia e Osteoporose):</strong> Ocorre devido à exclusão duodenal (principal sítio de absorção ativa de cálcio dependente de vitamina D) e digestão inadequada de lipídios por assincronia entre o esvaziamento da alça alimentar e a secreção de sais biliares (esteatorreia leve com perda fecal de vitamina D e saponificação de cálcio).</li>
</ul>

<h3>Protocolo de Seguimento Oncológico Pós-Ressecção Curativa</h3>
<table class="book-table">
  <thead>
    <tr>
      <th>Intervalo Pós-Operatório</th>
      <th>Exames Clínicos, Laboratoriais e de Imagem Recomendados</th>
      <th>Objetivo Principal</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Anos 1 a 3 (Período Crítico de Maior Recidiva)</strong></td>
      <td>• Consulta clínica oncológica e exame físico minucioso a cada <strong>3 a 6 meses</strong>.<br>• Hemograma completo, ferritina, vitamina B12, função renal e hepática e marcadores tumorais séricos (<strong>CEA e CA 19-9</strong>).<br>• <strong>Tomografia Computadorizada de Tórax, Abdome e Pelve com contraste</strong> a cada 6 meses.<br>• Endoscopia Digestiva Alta anual (fundamental para avaliar o coto gástrico residual após gastrectomia subtotal).</td>
      <td>Detecção ultraprecoce de recidiva locorregional na anastomose, leito cirúrgico ou metástases hepáticas e peritoneais potencialmente resgatáveis.</td>
    </tr>
    <tr>
      <td><strong>Anos 4 e 5</strong></td>
      <td>• Consulta clínica e laboratoriais a cada 6 a 12 meses.<br>• Tomografia computadorizada anual.<br>• EDA anual se gastrectomia subtotal.</td>
      <td>Consolidação da sobrevida livre de doença em 5 anos (marco histórico de cura).</td>
    </tr>
  </tbody>
</table>
`
  },
  {
    id: 'biomarcadores-avancados-e-imunoterapia-gastrico',
    title: '6.2 Biomarcadores Moleculares Preditivos no Câncer Gástrico Avançado: HER2, PD-L1 (CPS) e Claudina-18.2',
    body_html: `
<p>Na era da oncologia de precisão, o tratamento paliativo e perioperatório do adenocarcinoma gástrico avançado ou metastático (Estádio IV) é estritamente personalizado a partir de um painel de quatro biomarcadores moleculares obrigatórios avaliados na biópsia inicial:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Biomarcador Molecular</th>
      <th>Método de Avaliação Patológica</th>
      <th>Critério de Positividade</th>
      <th>Terapia-Alvo Indicada e Ensaios Clínicos Pivô</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>HER2 / neu (ERBB2)</strong></td>
      <td>Imuno-histoquímica (IHQ) e Hibridização Fluorescente in situ (FISH).</td>
      <td>IHQ 3+ (marcação de membrana basolateral forte em &gt;= 10% das células) OU IHQ 2+ associada a FISH positivo (relação HER2/CEP17 &gt;= 2,0). Presente em 15%-20% dos tumores (especialmente tipo intestinal da JEG).</td>
      <td>Adição de <strong>Trastuzumabe</strong> à quimioterapia de primeira linha com fluoropirimidina e platina (estudo ToGA). Recentemente, o estudo <strong>KEYNOTE-811</strong> aprovou a adição de <strong>Pembrolizumabe</strong> ao regime Trastuzumabe + Quimioterapia em tumores HER2-positivos com PD-L1 positivo.</td>
    </tr>
    <tr>
      <td><strong>PD-L1 (Escore de Positividade Combinada - CPS)</strong></td>
      <td>Imuno-histoquímica com clone 22C3 ou 28-8.</td>
      <td><strong>CPS &gt;= 5</strong> (ou CPS &gt;= 1 em subgrupos específicos). O CPS calcula a proporção de células tumorais e imunes (linfócitos e macrófagos) coradas para PD-L1 dividida pelo total de células tumorais viáveis vezes 100.</td>
      <td>Adição de <strong>Nivolumabe</strong> à quimioterapia de primeira linha (estudo <strong>CheckMate-649</strong>), propiciando ganho sem precedentes de sobrevida global em tumores HER2-negativos com CPS &gt;= 5.</td>
    </tr>
    <tr>
      <td><strong>Claudina-18.2 (CLDN18.2)</strong></td>
      <td>Imuno-histoquímica na membrana celular de células gástricas.</td>
      <td>Intensidade de coloração de membrana moderada a forte (2+/3+) em <strong>pelo menos 75% das células tumorais</strong>.</td>
      <td>Anticorpo monoclonal <strong>Zolbetuximabe</strong> associado à quimioterapia (estudos <strong>SPOTLIGHT e GLOW</strong>), aprovado mundialmente como nova primeira linha para tumores HER2-negativos e Claudina-18.2 positivos.</td>
    </tr>
    <tr>
      <td><strong>Instabilidade de Microssatélites (MSI-H / dMMR)</strong></td>
      <td>IHQ para 4 proteínas (MLH1, MSH2, MSH6, PMS2) e PCR molecular para microssatélites.</td>
      <td>Perda de expressão nuclear de uma ou mais proteínas do sistema MMR.</td>
      <td><strong>Monoterapia ou combinação com imunoterapia (Pembrolizumabe / Nivolumabe)</strong> com taxas extraordinárias de controle duradouro da doença mesmo sem quimioterapia citotóxica.</td>
    </tr>
  </tbody>
</table>
`
  }
];
