// Bloco 4 - Aula 090: Medidas de Associação e Impacto (Parte 2: Seções 5 a 8)

export const sec5 = {
  id: 'casos-clinicos-estruturados-medidas-associacao',
  title: '5. Casos Clínicos Estruturados e Raciocínio Prático em Medidas de Associação e Impacto',
  body_html: `
<h3>Caso Clínico 1: Interpretação Completa de um Ensaio Clínico em Cardiologia (Cálculo de RR, RRR, RAR e NNT)</h3>
<p><strong>Cenário:</strong> Um grande ensaio clínico randomizado duplo-cego multicêntrico avalia a eficácia de um novo inibidor da SGLT2 (Dapagliflozina) em pacientes portadores de insuficiência cardíaca com fração de ejeção reduzida (ICFEr). Um total de 4.000 pacientes foi randomizado em dois grupos de 2.000 indivíduos cada e acompanhado por 18 meses:</p>
<ul>
  <li><strong>Grupo Intervenção (Dapagliflozina 10 mg/dia):</strong> Dos 2.000 pacientes tratados, 200 apresentaram o desfecho primário composto (hospitalização por IC ou morte cardiovascular);</li>
  <li><strong>Grupo Controle (Placebo padrão):</strong> Dos 2.000 pacientes que receberam placebo, 300 apresentaram o desfecho primário.</li>
</ul>

<p><strong>Cálculos Epidemiológicos e Clínicos Passo a Passo:</strong></p>
<ol>
  <li><em>Qual a taxa de eventos em cada grupo?</em>
    <ul>
      <li>Risco no Grupo Intervenção / Tratado ($EER$): $\\frac{200}{2.000} = 0,10 = 10,0\\%$;</li>
      <li>Risco no Grupo Controle / Placebo ($CER$): $\\frac{300}{2.000} = 0,15 = 15,0\\%$.</li>
    </ul>
  </li>
  <li><em>Qual o Risco Relativo (RR) do desfecho com o novo fármaco?</em>
    $$RR = \\frac{EER}{CER} = \\frac{10\\%}{15\\%} = \\frac{0,10}{0,15} = 0,667 \\approx 0,67$$
    <em>Interpretação:</em> Os pacientes tratados com o novo inibidor apresentaram 67% do risco de hospitalização/morte cardiovascular em comparação ao placebo (redução do risco).
  </li>
  <li><em>Qual a Redução Relativa do Risco (RRR) ou Eficácia Relativa?</em>
    $$RRR = 1 - RR = 1 - 0,667 = 0,333 = 33,3\\%$$
    <em>Interpretação:</em> O tratamento reduziu o risco relativo do desfecho primário em 33,3%.
  </li>
  <li><em>Qual a Redução Absoluta do Risco (RAR)?</em>
    $$RAR = CER - EER = 15,0\\% - 10,0\\% = 5,0\\% \\text{ (ou } 0,05\\text{)}$$
    <em>Interpretação:</em> Em termos absolutos, a droga evitou 5 eventos desfavoráveis a cada 100 pacientes tratados durante os 18 meses de estudo.
  </li>
  <li><em>Qual é o Número Necessário para Tratar (NNT)?</em>
    $$NNT = \\frac{1}{RAR} = \\frac{1}{0,05} = 20$$
    <em>Interpretação Clínica à Beira do Leito:</em> O cardiologista precisa tratar exatamente <strong>20 pacientes com insuficiência cardíaca durante 18 meses com Dapagliflozina para EVITAR UMA HOSPITALIZAÇÃO OU MORTE CARDIOVASCULAR ADICIONAL</strong>. Trata-se de um valor excelente de NNT na cardiologia contemporânea (valores de NNT entre 10 e 30 justificam plenamente a incorporação de novas tecnologias em diretrizes clínicas e no SUS).
  </li>
</ol>

<h3>Caso Clínico 2: Avaliação de Risco Ocupacional em Estudo de Caso-Controle (Cálculo de OR)</h3>
<p><strong>Cenário:</strong> Um serviço de Medicina Preventiva e Vigilância Ocupacional investiga a associação entre exposição a vapores de benzeno em frentistas de postos de combustíveis e o desenvolvimento de leucemia mieloide aguda (LMA). Os pesquisadores conduzem um estudo de caso-controle selecionando 100 pacientes com diagnóstico confirmado de LMA (Casos) e 200 indivíduos pareados por sexo e idade internados no mesmo hospital com afecções ortopédicas sem neoplasia (Controles). A investigação retrospectiva revelou que:</p>
<ul>
  <li>Entre os 100 pacientes com LMA (Casos), 40 trabalharam como frentistas com exposição prolongada ao benzeno;</li>
  <li>Entre os 200 pacientes do grupo Controle, apenas 20 relataram exposição profissional ao benzeno.</li>
</ul>

<p><strong>Estruturação da Tabela 2x2 e Resolução:</strong></p>
<table class="book-table">
  <thead>
    <tr>
      <th>Status de Exposição ao Benzeno</th>
      <th>Casos (com LMA)</th>
      <th>Controles (sem LMA)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Expostos ao Benzeno ($E^+$)</strong></td>
      <td><strong>40</strong> ($a$)</td>
      <td><strong>20</strong> ($b$)</td>
    </tr>
    <tr>
      <td><strong>NÃO Expostos ao Benzeno ($E^-$)</strong></td>
      <td><strong>60</strong> ($c$)</td>
      <td><strong>180</strong> ($d$)</td>
    </tr>
    <tr>
      <td><strong>Total</strong></td>
      <td><strong>100</strong></td>
      <td><strong>200</strong></td>
    </tr>
  </tbody>
</table>

<div class="formula-box">
  $$OR = \\frac{a \\times d}{b \\times c} = \\frac{40 \\times 180}{20 \\times 60} = \\frac{7.200}{1.200} = 6,0$$
</div>
<p><strong>Interpretação Epidemiológica:</strong> Os indivíduos portadores de leucemia mieloide aguda apresentaram <strong>uma chance 6 vezes maior de terem sido expostos ao benzeno</strong> do que os indivíduos controles sem leucemia ($OR = 6,0$). Como a LMA é uma doença de baixa incidência populacional (doença rara), o valor do Odds Ratio aproxima-se estreitamente do Risco Relativo biológico ($RR \\approx 6,0$), fundamentando o nexo causal ocupacional para aposentadoria especial e fiscalização sanitária.</p>

<h3>Caso Clínico 3: Avaliação de Fator de Risco em Estudo de Coorte (Cálculo de RR, RA e FA)</h3>
<p><strong>Cenário:</strong> Em um estudo de coorte prospectivo com 10 anos de seguimento sobre fatores de risco cardiovasculares, 1.000 homens tabagistas ativos e 1.000 homens não fumantes com idades entre 45 e 55 anos foram acompanhados. Ao final dos 10 anos, foram diagnosticados 120 casos de acidente vascular cerebral isquêmico (AVCi) entre os fumantes e 30 casos de AVCi entre os não fumantes.</p>

<p><strong>Resolução Epidemiológica:</strong></p>
<ol>
  <li><em>Incidência nos expostos ($I_{exp}$):</em> $\\frac{120}{1.000} = 0,12 = 12,0\\%$;</li>
  <li><em>Incidência nos não expostos ($I_{n\\tilde{a}o-exp}$):</em> $\\frac{30}{1.000} = 0,03 = 3,0\\%$;</li>
  <li><em>Risco Relativo (RR):</em> $RR = \\frac{12,0\\%}{3,0\\%} = 4,0$ (fumantes têm 4 vezes mais probabilidade de sofrer AVCi do que não fumantes);</li>
  <li><em>Risco Atribuível nos Expostos (RA):</em> $RA = 12,0\\% - 3,0\\% = 9,0\\%$ (ou 0,09). O tabagismo causou um excesso de 9 casos de AVC para cada 100 fumantes no período;</li>
  <li><em>Fração Atribuível nos Expostos (FA):</em>
    $$FA = \\frac{RR - 1}{RR} \\times 100 = \\frac{4,0 - 1}{4,0} \\times 100 = \\frac{3}{4} \\times 100 = 75,0\\%$$
    <em>Conclusão de Impacto:</em> <strong>75% de todos os AVCs ocorridos nos fumantes da coorte foram provocados pelo cigarro</strong> e poderiam ter sido evitados se eles tivessem cessado o tabagismo!
  </li>
</ol>
`
};

export const sec6 = {
  id: 'criterios-de-causalidade-de-bradford-hill',
  title: '6. Os Critérios de Causalidade de Sir Austin Bradford Hill e a Inferência Causal',
  body_html: `
<h3>Associação Estatística Não Implica Causalidade Biológica</h3>
<p>Um dos axiomas mais sagrados da ciência biomédica estabelece: <em>"Correlação estatística não é sinônimo de causalidade"</em>. Um estudo observacional pode demonstrar uma associação matemática altamente significante ($p &lt; 0,001$) entre o hábito de carregar fósforos no bolso e o desenvolvimento de câncer de pulmão. Essa associação existe estatisticamente, mas não é causal — ela é fruto de uma variável de confusão clássica: o tabagismo (fumantes carregam fósforos e fumantes têm câncer de pulmão).</p>

<p>Para sistematizar o julgamento científico e discernir associações meramente estatísticas (espúrias ou confundidas) de verdadeiras relações de causa e efeito, o epidemiologista e estatístico britânico Sir Austin Bradford Hill propôs em 1965 <strong>nove critérios de plausibilidade causal</strong>, até hoje cobrados exaustivamente em exames de residência:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Critério de Bradford Hill</th>
      <th>Definição Conceitual e Operacional</th>
      <th>Relevância e Hierarquia de Prova</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>1. Temporalidade (Temporality)</strong></td>
      <td>A causa (exposição) deve <strong>preceder obrigatoriamente no tempo</strong> o efeito (desfecho). O paciente precisa ter fumado ANTES de desenvolver a neoplasia.</td>
      <td><strong>O ÚNICO CRITÉRIO ABSOLUTAMENTE INDISPENSÁVEL (SINE QUA NON):</strong> Se a temporalidade não for comprovada, a causalidade é sumariamente descartada! (Limitação dos estudos transversais, que não garantem temporalidade).</td>
    </tr>
    <tr>
      <td><strong>2. Força da Associação (Strength)</strong></td>
      <td>Magnitudes elevadas de $RR$ ou $OR$ (ex.: $RR = 15$ ou $OR = 20$) tornam muito mais improvável que a associação decorra puramente de viés residual ou variáveis de confusão não mensuradas.</td>
      <td>Associações muito fortes reforçam a hipótese causal, mas associações fracas ($RR = 1,2$) ainda podem ser causais se o agravo for multifatorial.</td>
    </tr>
    <tr>
      <td><strong>3. Relação Dose-Resposta / Gradiente Biológico</strong></td>
      <td>Níveis crescentes de exposição associam-se a riscos progressivamente maiores de adoecimento (ex.: fumar 5 maços/ano dá $RR = 2$; fumar 40 maços/ano dá $RR = 15$).</td>
      <td>Forte evidência de causalidade biológica (embora possa haver efeitos de limiar de saturação).</td>
    </tr>
    <tr>
      <td><strong>4. Consistência dos Resultados (Consistency)</strong></td>
      <td>A associação é observada repetidamente por diferentes pesquisadores, em diferentes países, em diferentes épocas e utilizando diferentes desenhos de estudo.</td>
      <td>A reprodutibilidade protege contra achados espúrios locais.</td>
    </tr>
    <tr>
      <td><strong>5. Plausibilidade Biológica (Plausibility)</strong></td>
      <td>Existe um mecanismo biológico, anatomopatológico, fisiológico ou farmacológico conhecido na literatura médica que explica como a exposição deflagra a doença.</td>
      <td>Critério dependente do estado da arte do conhecimento científico da época.</td>
    </tr>
    <tr>
      <td><strong>6. Coerência (Coherence)</strong></td>
      <td>A hipótese causal não entra em conflito com a história natural geral e a biologia da doença.</td>
      <td>Integração harmônica com achados de laboratório e autópsias.</td>
    </tr>
    <tr>
      <td><strong>7. Evidência Experimental (Experiment)</strong></td>
      <td>A intervenção controlada em ensaios laboratoriais ou ensaios clínicos (ex.: cessação da exposição ou uso de droga que remove o agente) reduz ou elimina a incidência da doença.</td>
      <td>Considerada a mais forte evidência empírica na ciência moderna.</td>
    </tr>
    <tr>
      <td><strong>8. Especificidade da Associação (Specificity)</strong></td>
      <td>Uma única causa leva a um único efeito específico.</td>
      <td><strong>Critério mais fraco e ultrapassado na medicina moderna:</strong> A maioria dos fatores de risco crônicos é inespecífica (o tabaco causa dezenas de doenças distintas: câncer de bexiga, enfisema, IAM e AVC).</td>
    </tr>
    <tr>
      <td><strong>9. Analogia (Analogy)</strong></td>
      <td>Existência de efeitos análogos conhecidos para substâncias ou patógenos estruturalmente semelhantes (ex.: efeito teratogênico da talidomida sugerindo potencial teratogênico de nova molécula correlata).</td>
      <td>Auxilia no julgamento prévio por semelhança teórica.</td>
    </tr>
  </tbody>
</table>
`
};

export const sec7 = {
  id: 'vieses-e-confundimento-na-inferencia-epidemiologica',
  title: '7. Ameaças à Validade Interna: Viés de Seleção, Viés de Aferição e Fatores de Confundimento',
  body_html: `
<h3>Validade Interna versus Validade Externa</h3>
<p>Em epidemiologia analítica, a <strong>Validade Interna</strong> de um estudo é a garantia metodológica de que os resultados obtidos refletem com precisão a verdade biológica para aquela amostra estudada, estando livres de erros sistemáticos. A <strong>Validade Externa (Generalizabilidade)</strong> é a capacidade de extrapolar esses achados para a população geral.</p>

<p>Os desvios que podem falsear uma medida de associação dividem-se em duas categorias estatísticas fundamentais:</p>
<ul>
  <li><strong>Erro Aleatório (Random Error):</strong> Variação randômica decorrente do acaso amostral. É minimizado aumentando-se o tamanho da amostra ($N$), o que estreita o Intervalo de Confiança;</li>
  <li><strong>Erro Sistemático (Viés / Bias):</strong> Distorção direcional introduzida por falha metodológica no desenho, na seleção dos participantes ou na coleta dos dados. O erro sistemático <strong>NÃO É CORRIGIDO aumentando o tamanho da amostra</strong> (se o método for enviesado, estudar 1 milhão de pessoas apenas tornará o resultado enviesado mais preciso!).</li>
</ul>

<h3>As Três Principais Classes de Erros Metodológicos em Provas</h3>

<table class="book-table">
  <thead>
    <tr>
      <th>Categoria de Erro</th>
      <th>Mecanismo Fisiopatológico / Metodológico</th>
      <th>Exemplos Clássicos de Prova</th>
      <th>Como Controlar ou Prevenir</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>1. Viés de Seleção</strong></td>
      <td>A forma como os participantes foram selecionados ou retidos no estudo distorce a representatividade dos grupos em relação à exposição ou ao desfecho.</td>
      <td>
        • <strong>Viés de Berkson (Viés de Admissão Hospitalar):</strong> Selecionar casos e controles exclusivamente em pacientes hospitalizados (indivíduos internados têm maior taxa de comorbidades e exposições múltiplas);<br>
        • <strong>Efeito do Trabalhador Sadio (Healthy Worker Effect):</strong> Populações ativas empregadas são mais saudáveis do que a população geral (que inclui aposentados por invalidez e doentes crônicos);<br>
        • <strong>Perda Diferencial de Seguimento:</strong> Em um estudo de coorte, os pacientes mais graves do grupo exposto abandonam o estudo antes dos outros.
      </td>
      <td>Randomização adequada, seleção de controles de base populacional comunitária e minimização ativa de perdas de seguimento.</td>
    </tr>
    <tr>
      <td><strong>2. Viés de Aferição (Informação)</strong></td>
      <td>Erros sistemáticos na medição, classificação ou coleta dos dados de exposição ou desfecho entre os grupos comparados.</td>
      <td>
        • <strong>Viés de Memória (Recall Bias):</strong> Típico de estudos de caso-controle. Mães de crianças nascidas com malformação congênita lembram-se com riqueza de detalhes obsessiva de qualquer gripe ou remédio tomado na gestação, enquanto mães de bebês perfeitos esquecem esses episódios corriqueiros;<br>
        • <strong>Viés do Aferidor / Observador:</strong> O médico pesquisador examina com mais rigor o paciente se souber que ele tomou a droga ativa;<br>
        • <strong>Efeito Hawthorne:</strong> Os participantes mudam seu comportamento espontâneo apenas pelo fato de saberem que estão sendo observados.
      </td>
      <td><strong>Mascaramento / Cegamento (Blinding):</strong> Estudos duplo-cegos (onde nem o paciente nem o médico sabem quem recebe droga ou placebo); uso de prontuários médicos objetivos prévios em vez de memória retrospectiva.</td>
    </tr>
    <tr>
      <td><strong>3. Fator de Confundimento (Confounding)</strong></td>
      <td>Distorção provocada por uma <strong>terceira variável externa</strong> que está simultaneamente associada à exposição E ao desfecho, sem ser um intermediário na cadeia causal.</td>
      <td>
        • Fumo como fator de confusão na associação entre consumo de café e infarto do miocárdio (bebedores de café fumam mais, e o cigarro causa infarto);<br>
        • Idade como confundidor universal na mortalidade.
      </td>
      <td>
        • <em>Na Fase de Desenho:</em> <strong>Randomização</strong> (o método mais potente para equilibrar confundidores conhecidos e desconhecidos), <strong>Pareamento (Matching)</strong> e <strong>Restrição</strong> de critérios de inclusão;<br>
        • <em>Na Fase de Análise dos Dados:</em> <strong>Estratificação</strong> (analisar o risco separadamente em cada estrato de idade ou tabagismo) e <strong>Regressão Multivariável</strong> (ajuste estatístico por regressão logística ou modelo de Cox).
      </td>
    </tr>
  </tbody>
</table>
`
};

export const sec8 = {
  id: 'sintese-de-alto-rendimento-e-armadilhas-associacao',
  title: '8. Síntese de Alto Rendimento e Fórmulas de Memorização para o ENAMED',
  body_html: `
<h3>Tabela Mestra de Fórmulas e Interpretações Clínicas</h3>
<table class="book-table">
  <thead>
    <tr>
      <th>Indicador de Associação / Impacto</th>
      <th>Fórmula Matemática</th>
      <th>Interpretação Numérica do Resultado</th>
      <th>Desenho de Estudo Aplicável</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Risco Relativo (RR)</strong></td>
      <td>$$RR = \\frac{I_{exp}}{I_{n\\tilde{a}o-exp}}$$</td>
      <td>• $RR = 1,0$: Neutro (sem associação)<br>• $RR &gt; 1,0$: Fator de Risco<br>• $RR &lt; 1,0$: Fator de Proteção</td>
      <td>Coorte e Ensaio Clínico Randomizado</td>
    </tr>
    <tr>
      <td><strong>Odds Ratio (OR)</strong></td>
      <td>$$OR = \\frac{a \\times d}{b \\times c}$$</td>
      <td>Razão de chances; aproxima-se do RR em doenças raras ($&lt; 5\\%$)</td>
      <td>Caso-Controle (e Coorte/Transversal)</td>
    </tr>
    <tr>
      <td><strong>Razão de Prevalências (RP)</strong></td>
      <td>$$RP = \\frac{P_{exp}}{P_{n\\tilde{a}o-exp}}$$</td>
      <td>Compara prevalências no mesmo instante</td>
      <td>Estudos Transversais (Seccionais)</td>
    </tr>
    <tr>
      <td><strong>Risco Atribuível nos Expostos (RA)</strong></td>
      <td>$$RA = I_{exp} - I_{n\\tilde{a}o-exp}$$</td>
      <td>Excesso absoluto de risco nos expostos que cessaria com a retirada do fator</td>
      <td>Coorte e Ensaio Clínico</td>
    </tr>
    <tr>
      <td><strong>Fração Atribuível nos Expostos (FA)</strong></td>
      <td>$$FA = \\frac{RR - 1}{RR} \\times 100$$</td>
      <td>Proporção percentual de casos nos expostos decorrente da exposição</td>
      <td>Coorte e Ensaio Clínico</td>
    </tr>
    <tr>
      <td><strong>Redução Absoluta do Risco (RAR)</strong></td>
      <td>$$RAR = CER - EER$$</td>
      <td>Diferença absoluta de eventos favoráveis entre placebo e droga</td>
      <td>Ensaio Clínico Randomizado</td>
    </tr>
    <tr>
      <td><strong>Número Necessário para Tratar (NNT)</strong></td>
      <td>$$NNT = \\frac{1}{RAR}$$</td>
      <td>Pacientes a tratar para evitar 1 desfecho adverso (arredondar para cima!)</td>
      <td>Ensaio Clínico Randomizado</td>
    </tr>
    <tr>
      <td><strong>Número Necessário para Danificar (NNH)</strong></td>
      <td>$$NNH = \\frac{1}{ARI}$$</td>
      <td>Pacientes tratados para surgir 1 evento adverso grave (quanto maior, mais seguro)</td>
      <td>Ensaio Clínico Randomizado</td>
    </tr>
  </tbody>
</table>
`
};
