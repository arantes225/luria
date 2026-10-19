// scripts/bloco07_group_a/cancer-colorretal-expansao2.mjs
export const secCancerColorretalExpansao2 = [
  {
    id: 'quimioterapia-adjuvante-estadios-ii-e-iii',
    title: '6.1 Terapia Sistêmica Adjuvante no Câncer de Cólon: Decisões no Estádio II de Alto Risco e Estádio III',
    body_html: `
<p>O benefício oncológico da quimioterapia adjuvante baseia-se na eliminação de micrometástases circulantes ocultas, diminuindo drasticamente as taxas de recidiva à distância após a ressecção cirúrgica curativa (R0):</p>

<h3>1. Estádio I (T1-T2 N0 M0) e Estádio II Habitual</h3>
<ul>
  <li><strong>Estádio I:</strong> Taxa de cura cirúrgica superior a 95%. <strong>A quimioterapia adjuvante é FORMALMENTE CONTRAINDICADA</strong> por não trazer nenhum benefício e expor o paciente a toxicidades desnecessárias;</li>
  <li><strong>Estádio II (T3-T4 N0 M0):</strong> A quimioterapia adjuvante de rotina não é recomendada universalmente. Ela é reservada estritamente para o subgrupo classificado como <strong>Estádio II de Alto Risco de Recidiva</strong>.</li>
</ul>

<div class="clinical-box warning-box">
  <h4>Critérios Patológicos de Alto Risco no Estádio II de Cólon (NCCN / ESMO)</h4>
  <p>A presença de <strong>pelo menos UM</strong> dos seguintes fatores indica quimioterapia adjuvante com fluoropirimidinas (Capecitabina oral ou 5-FU/LV), com ou sem oxaliplatina:</p>
  <ul>
    <li><strong>Amostragem Linfonodal Inadequada:</strong> Ressecção e exame de <strong>menos de 12 linfonodos regionais</strong> na peça cirúrgica (subestadiamento potencial);</li>
    <li><strong>Tumor T4 (T4a ou T4b):</strong> Perfuração da serosa visceral ou invasão de órgãos adjacentes;</li>
    <li><strong>Apresentação Clínica Inicial de Emergência:</strong> Obstrução intestinal mecânica aguda ou perfuração tumoral livre com peritonite;</li>
    <li><strong>Invasão Linfovascular ou Invasão Venosa Extramural (EMVI);</strong></li>
    <li><strong>Invasão Perineural (PNI);</strong></li>
    <li><strong>Histologia Indiferenciada / Alto Grau (Grau 3 ou 4 / células em anel de sinete);</strong></li>
    <li><strong>Margens Cirúrgicas Comprometidas ou Próximas (R1 / margem &lt; 1 mm).</strong></li>
  </ul>
  <p><em>Papel Fundamental do Teste de MMR/MSI no Estádio II:</em> Tumores Estádio II portadores de <strong>Instabilidade de Microssatélites (MSI-H / dMMR)</strong> possuem excelente prognóstico espontâneo e <strong>NÃO SE BENEFICIAM DE MONOTERAPIA COM 5-FU/CAPECITABINA</strong> (o 5-FU isolado pode inclusive piorar os desfechos). Se não houver fatores de altíssimo risco (como T4b), esses pacientes são manejados exclusivamente com observação clínica!</p>
</div>

<h3>2. Estádio III (Qualquer T, N1-N2 M0 - Linfonodos Positivos)</h3>
<p>Todos os pacientes com linfonodos metastáticos comprometidos no exame anatomopatológico (Estádio III) possuem indicação formal de <strong>Quimioterapia Adjuvante Dupla com Fluoropirimidina + Oxaliplatina</strong>:</p>
<ul>
  <li><strong>Regimes Consagrados:</strong> <strong>FOLFOX</strong> (5-FU em infusão contínua + Leucovorina + Oxaliplatina) OU <strong>CAPOX / XELOX</strong> (Capecitabina oral 1.000 mg/m² 12/12h por 14 dias + Oxaliplatina 130 mg/m² D1 a cada 3 semanas);</li>
  <li><strong>Duração do Tratamento Adjuvante (O Estudo Histórico IDEA Collaboration):</strong> Avaliou mais de 12.000 pacientes para comparar 3 meses versus 6 meses de quimioterapia adjuvante:
    <ul>
      <li><em>Grupo de Baixo Risco (T1-T3 e N1 - até 3 linfonodos acometidos):</em> <strong>O tratamento com CAPOX por apenas 3 MESES é equivalente e não inferior a 6 meses</strong>, com a imensa vantagem de reduzir em mais de 70% a temida <strong>neuropatia periférica sensitiva cumulativa e irreversível induzida pela oxaliplatina</strong>;</li>
      <li><em>Grupo de Alto Risco (T4 e/ou N2 - 4 ou mais linfonodos acometidos):</em> Recomenda-se manter o tratamento pleno por <strong>6 meses com FOLFOX ou 3 a 6 meses com CAPOX</strong>.</li>
    </ul>
  </li>
</ul>
`
  },
  {
    id: 'biomarcadores-avancados-metastatico-kras-nras-braf-msi',
    title: '7.2 Biomarcadores Moleculares no Câncer Colorretal Metastático: Painel RAS (KRAS/NRAS), BRAF, HER2 e Imunoterapia',
    body_html: `
<p>Na doença metastática (Estádio IV), a conduta oncológica é guiada obrigatoriamente pela determinação do perfil mutacional somático no tecido tumoral para seleção das terapias biológicas direcionadas:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Biomarcador Molecular</th>
      <th>Incidência no CCR</th>
      <th>Significado Biológico e Preditivo</th>
      <th>Conduta Farmacológica Específica</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Família RAS (KRAS e NRAS nos éxons 2, 3 e 4)</strong></td>
      <td>~50% dos tumores apresentam mutação</td>
      <td>Mutações ativadoras constitutivas em KRAS/NRAS ativam a cascata intracelular downstream MAPK independentemente do receptor de membrana EGFR.</td>
      <td>• Se <strong>RAS Selvagem (Wild-Type):</strong> Elegível para uso de <strong>Anticorpos Monoclonais Anti-EGFR (Cetuximabe ou Panitumumabe)</strong> associados à quimioterapia (FOLFOX/FOLFIRI), propiciando excelente resposta, <strong>particularmente em tumores originados no CÓLON ESQUERDO</strong>.<br>• Se <strong>RAS Mutado:</strong> <strong>Os anti-EGFR são FORMALMENTE CONTRAINDICADOS</strong> (não trazem benefício e aceleram a progressão tumoral). A terapia biológica de escolha é o <strong>Bevacizumabe (anti-VEGF)</strong>.</td>
    </tr>
    <tr>
      <td><strong>Mutação BRAF (V600E)</strong></td>
      <td>~8% a 10% dos tumores</td>
      <td>Ativação constitutiva da quinase BRAF; correlaciona-se com fenótipo CIMP, pólipos serrilhados, localização no cólon direito, disseminação peritoneal agressiva e <strong>prognóstico sombrio</strong>.</td>
      <td>Resistência aos anti-EGFR convencionais em monoterapia. O tratamento de segunda linha aprovado mundialmente (estudo <strong>BEACON CRC</strong>) é a combinação de <strong>Encorafenibe (inibidor de BRAF) + Cetuximabe (anti-EGFR)</strong>.</td>
    </tr>
    <tr>
      <td><strong>Instabilidade de Microssatélites (MSI-H / dMMR)</strong></td>
      <td>~5% no estádio IV</td>
      <td>Alta carga mutacional tumoral com neoantígenos imunogênicos abundantes e infiltração de linfócitos T citotóxicos.</td>
      <td><strong>Imunoterapia de Primeira Linha com Pembrolizumabe ou Nivolumabe + Ipilimumabe (estudo KEYNOTE-177 e CheckMate-8HW)</strong>: superou categoricamente a quimioterapia padrão, tornando-se o tratamento preferencial com sobrevida livre de progressão prolongada e respostas duradouras.</td>
    </tr>
    <tr>
      <td><strong>Lateralidade Tumoral (Cólon Direito vs Esquerdo)</strong></td>
      <td>—</td>
      <td>• <em>Cólon Esquerdo (Origem no intestino embrionário posterior):</em> Maior prevalência de RAS wild-type, instabilidade cromossômica (CIN), <strong>excelente resposta ao Cetuximabe/Panitumumabe</strong>.<br>• <em>Cólon Direito (Intestino embrionário médio):</em> Maior taxa de mutação BRAF, MSI-H e resistência intrínseca aos anti-EGFR.</td>
      <td>Em pacientes RAS wild-type: <strong>Anti-EGFR é preferido no cólon esquerdo; Anti-VEGF (Bevacizumabe) é preferido no cólon direito</strong> como primeira linha associado à quimioterapia.</td>
    </tr>
  </tbody>
</table>
`
  },
  {
    id: 'casos-discursivos-e-condutas-avancadas-cancer-colorretal',
    title: '8.1 Casos Clínicos Discursivos Avançados e Discussão de Padrão de Resposta LURIA',
    body_html: `
<div class="case-study">
  <h4>Caso Discursivo 2: Câncer de Reto Médio Localmente Avançado e Estratégia de Preservação de Órgão</h4>
  <p><strong>Cenário Clínico:</strong> Homem de 51 anos apresenta história de hematoquezia indolor intermitente e sensação de evacuação incompleta há 5 meses. Ao toque retal, palpa-se lesão vegetante e ulcerada na parede lateral esquerda do reto médio, cujo bordo inferior localiza-se a 6 cm da margem anal. A colonoscopia com biópsias confirmou adenocarcinoma moderadamente diferenciado. A Ressonância Magnética de alta resolução da pelve descreveu: lesão circunferencial invadindo a gordura mesorretal por 6 mm (cT3c), presença de 4 linfonodos mesorretais espiculados e arredondados com sinal heterogêneo (cN2), fáscia mesorretal livre com a menor distância entre o tumor e a fáscia de 3 mm (CRM negativa / não ameaçada) e ausência de invasão do esfíncter anal interno ou externo. TC de tórax e abdome sem metástases à distância (cM0).</p>

  <p><strong>Perguntas Formuladas pela Banca Examinadora:</strong></p>
  <ol>
    <li>Qual é a classificação estadiatória locorregional completa deste tumor e por que a cirurgia imediata isolada está contraindicada?</li>
    <li>Qual a conduta terapêutica contemporânea recomendada pelas diretrizes mundiais (RAPIDO e PRODIGE 23) antes de qualquer ato cirúrgico? Descreva os componentes deste protocolo.</li>
    <li>Se após 8 a 12 semanas do término do tratamento neoadjuvante completo o paciente for reavaliado e apresentar ausência total de lesão tumoral ao toque retal, apenas cicatriz esbranquiçada plana sem ulceração à retoscopia e ausência de tumor ou linfonodos na RM de pelve, qual estratégia de conduta conservadora pode ser proposta? Descreva seus fundamentos.</li>
    <li>Caso o paciente opte pela ressecção cirúrgica clássica ou apresente tumor residual de 1,5 cm, qual é o procedimento cirúrgico oncológico padrão, qual a margem cirúrgica circunferencial almejada e qual o papel do estoma de proteção?</li>
  </ol>

  <p><strong>Padrão de Resposta Esperado (LURIA):</strong></p>
  <ol>
    <li><strong>Estadiamento e Contraindicação de Cirurgia Direta:</strong> Tumor classificado como <strong>cT3c cN2 cM0 (Estádio III de Reto Médio)</strong>. A ressecção cirúrgica direta isolada está contraindicada porque tumores cT3/cT4 e/ou N+ apresentam taxas inaceitáveis de recidiva locorregional na pelve (25% a 35%) e metástases à distância se operados sem tratamento neoadjuvante multimodal.</li>
    <li><strong>Tratamento Padrão: Terapia Neoadjuvante Total (TNT):</strong> A conduta de escolha é a <strong>TNT</strong>, que integra <strong>Quimioterapia Sistêmica em dose plena (regimes como FOLFIRINOX ou FOLFOX/CAPOX por 3 a 4 meses) associada à Radioterapia pélvica</strong> (quimiorradioterapia longa fracionada de 50,4 Gy ou radioterapia de curso curto 5x5 Gy com quimioterapia de consolidação) <strong>administradas integralmente ANTES da intervenção cirúrgica</strong>. Esse protocolo eleva as taxas de resposta patológica completa (pCR de até 28%-30%) e reduz significativamente as metástases à distância.</li>
    <li><strong>Estratégia Conservadora (Watch-and-Wait de Angelita Habr-Gama):</strong> Perante a constatação de <strong>Resposta Clínica Completa (cCR)</strong>, o paciente é elegível para a estratégia de <strong>Watch-and-Wait (Observar e Esperar)</strong>. Essa conduta consiste em <strong>poupar o paciente da ressecção cirúrgica radical imediata</strong>, evitando a disfunção esfincteriana, sexual e urinária ou a necessidade de estomas, submetendo-o a um acompanhamento estrito e intensivo (toque retal, retossigmoidoscopia rígida/flexível e dosagem de CEA a cada 1 a 2 meses no primeiro ano, e RM de pelve a cada 3 a 6 meses). Se houver recidiva luminal local nos primeiros 2 anos (cerca de 25% a 30% dos casos), a cirurgia radical de resgate é realizada sem comprometer a sobrevida global.</li>
    <li><strong>Procedimento Cirúrgico se Houver Lesão Residual:</strong> Realiza-se <strong>Ressecção Anterior Baixa do Reto (LAR) com Excisão Total do Mesorreto (TME) no plano sagrado anatômico avascular e preservação dos plexos nervosos autonômicos hipogástricos e pélvicos</strong>. A margem circunferencial (CRM) deve ser &gt; 1 mm (livre) e a margem distal intramural de pelo menos 1 a 2 cm. Procede-se à confecção de anastomose colorretal mecânica ultrabaixa por duplo grampeamento protegida obrigatoriamente por <strong>Ileostomia em Alça Temporária</strong>, que desvia o trânsito fecal e previne a peritonite fecal pélvica em caso de deiscência da anastomose na pelve profunda.</li>
  </ol>
</div>
`
  }
];
