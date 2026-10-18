// Bloco 6 - Aula 120: Seções 14 e 15 de Economia da Saúde e Prevenção Quaternária em MBE
export const sec14 = {
  id: 'analises-farmacoeconomicas-em-mbe',
  title: '14. Avaliação de Tecnologias em Saúde (ATS): Custo-Efetividade, Custo-Utilidade, QALY e ICER',
  body_html: `
<h3>Da Eficácia Clínica à Sustentabilidade do Sistema de Saúde</h3>
<p>Um medicamento ou dispositivo pode demonstrar eficácia estatisticamente significante em um ensaio clínico de fase III ($p < 0,001$) e ainda assim ser completamente inviável para incorporação no Sistema Único de Saúde (SUS) ou na saúde suplementar. Em um mundo de recursos financeiros finitos e demandas sanitárias infinitas, a Medicina Baseada em Evidências funde-se à <strong>Avaliação de Tecnologias em Saúde (ATS)</strong> e à <strong>Farmacoeconomia</strong> para orientar a alocação justa do orçamento público através da <strong>CONITEC (Comissão Nacional de Incorporação de Tecnologias no SUS)</strong>.</p>

<p>As avaliações farmacoeconômicas dividem-se em <strong>quatro modalidades metodológicas principais</strong>:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Tipo de Análise Econômica</th>
      <th>Mensuração dos Custos (Moeda)</th>
      <th>Mensuração das Consequências Clínicas (Desfechos)</th>
      <th>Aplicação Prática e Decisão no SUS</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Custo-Minimização (CMA)</strong></td>
      <td>Unidades Monetárias (Reais / Dólares).</td>
      <td><strong>Desfechos clínicos rigorosamente idênticos comprovados</strong> (ex.: comparar dois medicamentos genéricos bioequivalentes da mesma molécula).</td>
      <td>Identifica simplesmente qual é a opção mais barata entre alternativas terapeuticamente equivalentes.</td>
    </tr>
    <tr>
      <td><strong>Custo-Efetividade (CEA)</strong></td>
      <td>Unidades Monetárias.</td>
      <td><strong>Unidades Clínicas Naturais de Saúde</strong>: anos de vida ganhos, mmHg de pressão arterial reduzidos, casos de AVC evitados, número de infecções prevenidas.</td>
      <td>Compara intervenções que competem pelo mesmo objetivo clínico, gerando a Razão de Custo-Efetividade Incremental ($ICER$).</td>
    </tr>
    <tr>
      <td><strong>Custo-Utilidade (CUA)</strong><br>(O Padrão-Ouro da CONITEC)</td>
      <td>Unidades Monetárias.</td>
      <td><strong>Anos de Vida Ajustados pela Qualidade (QALY - Quality-Adjusted Life Years)</strong> ou Anos de Vida Perdidos Ajustados por Incapacidade (DALY).</td>
      <td><strong>Permite comparar intervenções em áreas médicas completamente distintas</strong> (ex.: comparar o custo por QALY de um novo stent coronário versus uma vacina infantil versus um antiviral para hepatite C!).</td>
    </tr>
    <tr>
      <td><strong>Custo-Benefício (CBA)</strong></td>
      <td>Unidades Monetárias.</td>
      <td><strong>Consequências convertidas em valor monetário puro (Reais)</strong> através de métodos como a "disposição a pagar" (Willingness to Pay).</td>
      <td>Raramente utilizada na prática médica devido a dilemas éticos profundos de atribuir um preço em dinheiro à vida humana.</td>
    </tr>
  </tbody>
</table>

<h3>A Métrica QALY (Quality-Adjusted Life Year) e o ICER</h3>
<p>O <strong>QALY</strong> sintetiza em um único número a <strong>quantidade de tempo vivida multiplicada pelo peso da qualidade de vida (Utilidade)</strong> experimentada naquele estado de saúde:</p>

<div class="formula-box">
  <p><strong>Cálculo do QALY:</strong></p>
  $$\text{QALY} = \text{Anos de Vida Ganhos} \times \text{Escore de Utilidade (0 a 1,0)}$$
  <ul>
    <li>Utilidade $= 1,0$: Estado de saúde perfeito, sem dor, limitação funcional ou sofrimento;</li>
    <li>Utilidade $= 0$: Estado equivalente à morte;</li>
    <li><em>Exemplo:</em> Viver 10 anos acamado com sequela grave de AVC com utilidade de $0,4$ equivale numericamente a $10 \times 0,4 = \mathbf{4 \text{ QALYs}}$.</li>
  </ul>
  <p><strong>Razão de Custo-Efetividade Incremental (ICER - Incremental Cost-Effectiveness Ratio):</strong></p>
  $$ICER = \frac{\text{Custo da Droga Nova} - \text{Custo do Tratamento Padrão}}{\text{Efetividade da Droga Nova (QALY)} - \text{Efetividade do Padrão (QALY)}} = \frac{\Delta \text{Custo}}{\Delta \text{Efetividade}}$$
</div>

<p><strong>Limiar de Disposição a Pagar da CONITEC no Brasil:</strong> A CONITEC adota como parâmetro de referência que uma nova tecnologia é considerada custo-efetiva para incorporação no SUS se o seu $ICER$ for de até <strong>1 a 3 vezes o Produto Interno Bruto (PIB) per capita brasileiro por QALY ganho</strong> (para doenças raras ou pediátricas graves, admitem-se limiares mais flexíveis de até 3 vezes o PIB per capita).</p>
`
};

export const sec15 = {
  id: 'prevencao-quaternaria-sobrediagnostico-e-deprescricao',
  title: '15. Prevenção Quaternária, Sobrediagnóstico (Overdiagnosis) e Desprescrição Baseada em Evidências',
  body_html: `
<h3>O Princípio Hipocrático Supremo: Primum Non Nocere</h3>
<p>No final do século XX, o médico de família belga <strong>Marc Jamoulle</strong> e a Organização Mundial dos Médicos de Família (WONCA) formalizaram um quarto nível de prevenção que se tornou indissociável da Medicina Baseada em Evidências: a <strong>Prevenção Quaternária ($P_4$)</strong>.</p>

<blockquote>
  "Prevenção Quaternária é a ação realizada para identificar o paciente em risco de sobremedicalização, protegê-lo de intervenções médicas desnecessárias e excessivas, e sugerir alternativas eticamente aceitáveis."
</blockquote>

<p>Enquanto a prevenção primária atua antes da doença surgir, a secundária no rastreamento e a terciária na reabilitação, a <strong>Prevenção Quaternária protege o ser humano contra o furor intervencionista do próprio sistema médico (iatrogenias)</strong>.</p>

<h3>A Anatomia do Sobrediagnóstico (Overdiagnosis) e do Sobretratamento (Overtreatment)</h3>
<p>Uma das maiores falácias do senso comum é acreditar que "quanto mais precoce o diagnóstico, melhor para a saúde". A MBE contemporânea demonstra que a ultrassensibilidade dos modernos exames laboratoriais e tomográficos deflagrou uma epidemia de <strong>Sobrediagnóstico (Overdiagnosis)</strong>:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Fenômeno Iatrogênico</th>
      <th>Definição Epistemológica Precisa</th>
      <th>Exemplo Clínico Paradigmático da Prática Médica</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Sobrediagnóstico</strong><br>(Overdiagnosis)</td>
      <td>Diagnóstico correto de uma alteração histológica ou lesão anatômica verdadeira que <strong>jamais causaria sintomas, incapacidade ou morte ao paciente durante toda a sua vida biológica natural</strong> caso não tivesse sido rastreada.</td>
      <td>Rastreamento ultrassonográfico da tireoide descobrindo microcarcinomas papilares indolentes de 4 mm em mulheres assintomáticas; o tumor nunca cresceria, mas a paciente é submetida a tireoidectomia total, fica hipoparatireoidea e dependente de levotiroxina para o resto da vida!</td>
    </tr>
    <tr>
      <td><strong>Sobretratamento</strong><br>(Overtreatment)</td>
      <td>Administração de intervenções cirúrgicas, radioterápicas ou medicamentosas agressivas para tratar lesões indolentes decorrentes de sobrediagnóstico.</td>
      <td>Quimioterapia tóxica ou prostatectomia radical gerando incontinência urinária e disfunção erétil definitiva em idosos de 80 anos com adenocarcinoma de próstata microscópico indolente Gleason 6 (Gauges baixos).</td>
    </tr>
    <tr>
      <td><strong>Sobrerastreamento</strong><br>(Overtesting)</td>
      <td>Solicitação indiscriminada de exames complementares em pessoas assintomáticas sem fundamentação por ensaios clínicos randomizados.</td>
      <td>Check-ups anuais laboratoriais com dosagem de 60 exames de sangue em jovens saudáveis, resultando em falsos-positivos aleatórios que deflagram cascatas diagnósticas invasivas e angiografias desnecessárias.</td>
    </tr>
    <tr>
      <td><strong>Doença Iatrogênica / Efeito Cascata</strong><br>(Cascata Diagnóstica)</td>
      <td>Cadeia ininterrupta de exames, biópsias, ansiedade e complicações geradas a partir de um achado incidental falso-positivo ("Incidentaloma").</td>
      <td>Encontrar um cisto renal benigno simples incidental na tomografia, realizar biópsia desnecessária que complica com hematoma retroperitoneal e nefrectomia de emergência.</td>
    </tr>
  </tbody>
</table>

<div class="book-case">
  <h4>A Arte da Desprescrição Médica Baseada em Evidências</h4>
  <p>Na população idosa com polifarmácia (uso simultâneo de $\ge 5$ medicamentos diários), o papel soberano da MBE não é adicionar mais drogas, mas sim conduzir a <strong>Desprescrição Sistematizada</strong>: processo planejado de redução de dose ou suspensão definitiva de fármacos cujo risco de dano supera qualquer benefício prospectivo.</p>
  <p><strong>Exemplos Clássicos de Desprescrição Mandatória em Idosos:</strong></p>
  <ul>
    <li>Suspensão de Inibidores de Bomba de Prótons (Omeprazol) mantidos por anos sem indicação de úlcera ativa ou DRGE grave (risco de fraturas osteoporóticas, hipomagnesemia e infecção por <em>Clostridioides difficile</em>);</li>
    <li>Desmame de Benzodiazepínicos prescritos para insônia (causa líder de quedas noturnas, fratura de fêmur e declínio cognitivo mimetizando demência);</li>
    <li>Relaxamento de metas agressivas de hemoglobina glicada ($HbA1c < 7,0\%$) em diabéticos frágeis com expectativa de vida reduzida, tolerando metas de até $8,0-8,5\%$ para evitar a hipoglicemia fatal.</li>
  </ul>
</div>
`
};
