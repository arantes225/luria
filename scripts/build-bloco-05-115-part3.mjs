// Bloco 5 - Aula 115: Vieses, Confundimento e Causalidade - Part 3
export const sec5 = {
  id: 'criterios-de-causalidade-de-bradford-hill',
  title: '5. Critérios de Causalidade de Sir Austin Bradford Hill: Análise Exaustiva Ponto a Ponto',
  body_html: `
<h3>O Marco Histórico da Causalidade em Saúde Pública (1965)</h3>
<p>Em 1965, perante a Seção de Medicina Ocupacional da <em>Royal Society of Medicine</em> em Londres, o epidemiologista e estatístico britânico <strong>Sir Austin Bradford Hill</strong> proferiu uma conferência que redefiniria para sempre os rumos da ciência médica: <em>"The Environment and Disease: Association or Causation?"</em>. Após décadas de debates ferozes capitaneados pela indústria do tabaco — que argumentava cinicamente que a correlação estatística entre fumar cigarros e ter câncer de pulmão não provava que o fumo era a causa biológica do tumor —, Hill sistematizou <strong>nove pontos de vista ou critérios de julgamento</strong> para auxiliar a mente humana a distinguir uma mera associação estatística espúria de uma relação causal biológica verdadeira.</p>

<p><strong>A Advertência Fundamental de Bradford Hill:</strong> Nenhum desses critérios (com a única e solene exceção da <strong>Temporalidade</strong>) pode ser tomado como uma condição <em>sine qua non</em> rígida ou indispensável para afirmar causalidade. Eles funcionam como vetores probatórios de convergência indutiva.</p>

<h3>Os Nove Critérios de Bradford Hill Analisados Detalhadamente</h3>

<ol>
  <li><strong>1. Temporalidade (Temporality): O ÚNICO CRITÉRIO OBRIGATÓRIO E INDISPENSÁVEL</strong>
    <ul>
      <li>Exige de forma inegociável que <strong>a Causa (Exposição) PREVIAMENTE ANTECEDA o Efeito (Doença) na linha cronológica real do tempo</strong>;</li>
      <li>É o único critério cuja ausência destrói completamente qualquer hipótese causal. Se um fator surgiu <em>depois</em> do início dos primeiros danos fisiopatológicos da doença, ele pode ser um sintoma, um biomarcador, uma consequência reativa ou um achado fortuito, mas jamais a causa etiológica primária;</li>
      <li><strong>Desenhos que garantem a temporalidade:</strong> Ensaios Clínicos Randomizados e Estudos de Coorte Prospectiva. Desenhos incapazes de garantir a temporalidade: Estudos Transversais e Inquéritos (devido à causalidade reversa).</li>
    </ul>
  </li>
  <li><strong>2. Força da Associação (Strength of Association)</strong>
    <ul>
      <li>Quanto maior for a magnitude numérica da medida de efeito relativo ($RR$ ou $OR$), maior é a probabilidade de a relação ser verdadeiramente causal;</li>
      <li>Associações de magnitude astronômica (ex.: fumantes pesados de dois maços de cigarro por dia apresentam um Risco Relativo de desenvolver carcinoma broncogênico de pequenas células superior a $RR = 20,0$ ou $30,0$) dificilmente poderiam ser explicadas inteiramente por um fator de confundimento oculto ou por vieses metodológicos residuais;</li>
      <li><em>Ressalva:</em> Uma associação fraca ($RR = 1,2$ ou $1,3$, como o sedentarismo e hipertensão arterial) não nega a causalidade, apenas demanda maior rigor para afastar confundimento residual.</li>
    </ul>
  </li>
  <li><strong>3. Relação Dose-Resposta ou Gradiente Biológico (Biological Gradient)</strong>
    <ul>
      <li>À medida que aumenta a intensidade, a frequência, a concentração ou a duração cronológica cumulativa da exposição ao fator, <strong>observa-se uma elevação proporcional e monótona na incidência ou gravidade do desfecho clínico</strong>;</li>
      <li>Exemplo: O risco de cirrose hepática ou de adenocarcinoma de esôfago cresce linearmente em função do número de gramas de álcool etílico consumidos diariamente; o risco de mesotelioma pleural cresce progressivamente com a carga cumulativa de fibras de asbesto inaladas (fibras/mL-ano);</li>
      <li><em>Ressalva:</em> A ausência de gradiente linear não refuta a causalidade, pois fenômenos biológicos podem operar através de "efeito limiar" (threshold effect, onde qualquer dose acima de um limite mínimo deflagra a patologia) ou apresentar curvas em formato de "J" ou "U" (como o consumo leve de álcool ou curvas de pressão arterial).</li>
    </ul>
  </li>
  <li><strong>4. Consistência dos Resultados (Consistency)</strong>
    <ul>
      <li>A associação foi observada e replicada repetidamente por <strong>pesquisadores diferentes, em momentos temporais distintos, em países e etnias variadas, utilizando desenhos epidemiológicos diversos</strong> (coortes, caso-controle, ensaios clínicos);</li>
      <li>Se a relação entre tabagismo e câncer pulmonar foi documentada por Doll & Hill em médicos britânicos, replicada no estudo dos veteranos de guerra norte-americanos por Hammond e confirmada em populações asiáticas e latino-americanas, a probabilidade de se tratar de um artefato estatístico local reduz-se a zero;</li>
      <li>É o pilar fundamental que sustenta o racional das <strong>Revisões Sistemáticas e Metanálises</strong>.</li>
    </ul>
  </li>
  <li><strong>5. Plausibilidade Biológica (Biological Plausibility)</strong>
    <ul>
      <li>A relação etiológica proposta possui consonância e fundamentação com os conhecimentos biomédicos, celulares, bioquímicos e patológicos vigentes na época;</li>
      <li>Exemplo: É perfeitamente plausível que substâncias químicas presentes no tabaco (benzopirenos e nitrosaminas aromáticas) causem câncer, pois demonstrou-se em biologia molecular que elas provocam mutações transversais específicas no gene supressor tumoral <em>TP53</em>;</li>
      <li><em>Ressalva Histórica Crítica:</em> Hill alertou sabiamente que a plausibilidade biológica depende do estado da arte da ciência no momento presente. A hipótese de Ignaz Semmelweis de que "partículas cadavéricas" transportadas nas mãos dos médicos causavam febre puerperal era considerada biológica e cientificamente "implausível e ridícula" pelos maiores catedráticos de Viena em 1847, antes da descoberta da teoria microbiana por Louis Pasteur e Robert Koch!</li>
    </ul>
  </li>
  <li><strong>6. Evidência Experimental (Experiment)</strong>
    <ul>
      <li>A intervenção deliberada na exposição — seja a introdução da substância em um ensaio clínico, seja a <strong>cessação/remoção do fator de risco na população</strong> — provoca a reversão ou diminuição correspondente da incidência do agravo;</li>
      <li>Exemplo: Quando indivíduos que fumavam há 20 anos abandonam o tabagismo, observa-se após 10 a 15 anos de cessação uma redução progressiva e dramática de sua taxa de incidência de infarto agudo do miocárdio e câncer de pulmão, aproximando-se progressivamente dos não fumantes;</li>
      <li>Considerado por muitos epidemiologistas o teste probatório mais contundente em seres humanos.</li>
    </ul>
  </li>
  <li><strong>7. Coerência com a História Natural (Coherence)</strong>
    <ul>
      <li>A hipótese causal não entra em conflito frontal com o que já se conhece solidamente a respeito da biologia, história natural e epidemiologia descritiva da doença;</li>
      <li>Exemplo: O aumento exponencial do tabagismo manufaturado entre as mulheres após a Segunda Guerra Mundial foi seguido, com uma latência temporal perfeitamente compatível de 25 a 30 anos, por uma escalada correspondente e idêntica na mortalidade por câncer de pulmão no sexo feminino.</li>
    </ul>
  </li>
  <li><strong>8. Analogia (Analogy)</strong>
    <ul>
      <li>A existência de relações causais análogas previamente comprovadas na ciência biomédica confere maior credibilidade a uma nova associação etiológica semelhante;</li>
      <li>Exemplo: Uma vez comprovado de forma irrefutável que o vírus da Rubéola contraído no primeiro trimestre gestacional atravessa a barreira placentária e causa microcefalia e malformações no feto, tornou-se imediatamente muito mais aceitável para a comunidade médica a hipótese de que um vírus biologicamente correlato (o vírus Zika) pudesse provocar a Síndrome da Zika Congênita e microcefalia grave em fetos de gestantes picadas pelo <em>Aedes aegypti</em> no Nordeste brasileiro em 2015.</li>
    </ul>
  </li>
  <li><strong>9. Especificidade da Associação (Specificity)</strong>
    <ul>
      <li>Uma causa específica levaria a um desfecho único e determinado (um fator $\rightarrow$ uma doença);</li>
      <li><strong>O Critério Mais Frágil e Ultrapassado de Todos:</strong> Hill reconheceu abertamente que a especificidade advém do paradigma bacteriológico mecanicista dos postulados de Koch (onde o <em>Mycobacterium tuberculosis</em> causa especificamente a tuberculose). Na medicina das doenças crônicas não transmissíveis contemporâneas, <strong>a regra universal é a causalidade multifatorial e inespecífica</strong>: o mesmo tabagismo causa câncer de pulmão, câncer de bexiga, aterosclerose coronariana, enfisema e aneurisma de aorta abdominal. Portanto, <strong>a ausência de especificidade JAMAIS afasta a causalidade</strong> na epidemiologia moderna!</li>
    </ul>
  </li>
</ol>
`
};

export const sec6 = {
  id: 'directed-acyclic-graphs-dags-e-vies-de-colisor',
  title: '6. Gráficos Acíclicos Direcionados (DAGs), Teoria Causal Moderna e o Viés de Colisor (Collider)',
  body_html: `
<h3>A Revolução Causal de Judea Pearl: O Nascimento dos DAGs</h3>
<p>Durante décadas, a epidemiologia dependeu exclusivamente de modelos estatísticos regressivos tradicionais e do conceito intuitivo da tríade de confundimento de Rothman. No entanto, o avanço da inferência causal moderna — laureado com o Prêmio Turing de Ciências da Computação concedido ao matemático e filósofo <strong>Judea Pearl</strong> em 2011 — introduziu uma linguagem visual e matemática que transformou a epidemiologia: os <strong>Gráficos Acíclicos Direcionados (Directed Acyclic Graphs - DAGs)</strong>.</p>

<p>Um DAG é um modelo estrutural causal probabilístico composto por:</p>
<ul>
  <li><strong>Nós (Nodes / Vértices):</strong> Representam as variáveis biológicas, comportamentais, ambientais ou sociais envolvidas no sistema causal (ex.: Exposição $E$, Desfecho $D$, Covariáveis $C$);</li>
  <li><strong>Setas Direcionadas (Arrows / Arestas):</strong> Indicam a direção direta causal da relação no tempo ($A \rightarrow B$ significa que $A$ causa diretamente $B$);</li>
  <li><strong>Acíclico (Acyclic):</strong> Não pode haver "ciclos" ou "loops" temporais fechados no gráfico (uma variável jamais pode ser causa de si mesma no passado!).</li>
</ul>

<h3>As Três Estruturas Elementares de Conexão Causal em Tripletos</h3>
<p>Em um DAG, qualquer conjunto de três variáveis conectadas assume uma de <strong>três arquiteturas universais de fluxo de informação estatística</strong>:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Estrutura do Tripleto</th>
      <th>Representação Gráfica Vetorial</th>
      <th>Status do Fluxo Sem Ajuste (Aberto / Fechado)</th>
      <th>Efeito do Ajuste ou Condicionamento em $Z$</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>1. Cadeia Causal</strong><br>(Chain / Mediador)</td>
      <td>$$X \rightarrow Z \rightarrow Y$$</td>
      <td><strong>Caminho ABERTO</strong> (Há associação estatística entre $X$ e $Y$).</td>
      <td><strong>BLOQUEIA O CAMINHO</strong> (O ajuste em $Z$ extingue a associação entre $X$ e $Y$). Bloquear um mediador anula o efeito indireto da causa primária!</td>
    </tr>
    <tr>
      <td><strong>2. Causa Comum</strong><br>(Fork / Confundidor Tradicional)</td>
      <td>$$X \leftarrow Z \rightarrow Y$$</td>
      <td><strong>Caminho ABERTO</strong> (Associação espúria não causal fluindo pela porta dos fundos - Backdoor path).</td>
      <td><strong>BLOQUEIA O CAMINHO</strong> (O ajuste na causa comum $Z$ fecha a porta dos fundos, eliminando o confundimento e isolando a verdadeira causalidade!).</td>
    </tr>
    <tr>
      <td><strong>3. Efeito Comum</strong><br>(Collider / Colisor Invertido)</td>
      <td>$$X \rightarrow Z \leftarrow Y$$</td>
      <td><strong>Caminho NATURALMENTE BLOQUEADO</strong> (Em estado bruto natural, $X$ e $Y$ são independentes!).</td>
      <td><strong>ABRE O CAMINHO E CRIA ASSOCIAÇÃO ESPÚRIA!</strong> O condicionamento, ajuste ou seleção amostral restrita ao colisor $Z$ induz correlação artificial enganosa entre $X$ e $Y$.</td>
    </tr>
  </tbody>
</table>

<h3>O Viés de Colisor (Collider Stratification Bias) e o Paradoxo de Simpson</h3>
<p>O <strong>Colisor (Collider)</strong> é a variável sobre a qual convergem duas ou mais setas no DAG ($X \rightarrow \mathbf{Z} \leftarrow Y$). Na natureza não manipulada, a porta do colisor está hermeticamente fechada; a exposição $X$ e o desfecho $Y$ não transmitem confundimento através dele.</p>

<p>No entanto, se o pesquisador cometer o erro gravíssimo de <strong>ajustar estatisticamente por um colisor na regressão multivariada</strong>, ou se <strong>selecionar a amostra restringindo os participantes a um valor fixo do colisor</strong>, a porta que estava fechada <strong>ABRE-SE VIOLENTAMENTE</strong>, gerando uma associação estatística distorcida e enganosa entre duas variáveis que eram biologicamente independentes!</p>

<div class="book-case">
  <h4>O Caso Histórico do Paradoxo de Berkson Explicado por DAGs</h4>
  <p>Considere o seguinte cenário hospitalar modelado por DAG:</p>
  <ul>
    <li>$X$: Doença Locomotora Grave (Artrite Reumatoide);</li>
    <li>$Y$: Doença Respiratória Grave (Doença Pulmonar Obstrutiva Crônica - DPOC);</li>
    <li>$Z$: Internação em Hospital Terciário (Hospitalization).</li>
  </ul>
  <p>Tanto a Artrite Reumatoide grave quanto a exacerbação de DPOC causam de forma independente a internação hospitalar do paciente ($X \rightarrow Z \leftarrow Y$). A internação ($Z$) é, portanto, um <strong>Colisor Clássico</strong>!</p>
  <p>Na comunidade em geral, a Artrite e a DPOC não possuem qualquer relação biológica causal direta. Porém, se o médico conduzir um estudo de caso-controle recrutando <strong>exclusivamente pacientes internados nas enfermarias do hospital (condicionando no colisor $Z$)</strong>, ele constatará um fenômeno bizarro: entre os pacientes internados, ter Artrite Reumatoide parecerá "proteger" contra ter DPOC! Por quê? Porque se um paciente internado <em>não tem</em> DPOC, ele quase que obrigatoriamente precisou de outra doença grave (como a Artrite) para justificar estar naquele leito! Essa associação espúria reversa artificial é o <strong>Viés de Colisor (Paradoxo de Berkson)</strong>.</p>
</div>

<h3>O Paradoxo de Simpson</h3>
<p>O <strong>Paradoxo de Simpson</strong> (ou Reversão de Yule-Simpson) é uma anomalia estatística espetacular decorrente do confundimento severo e da estratificação: um determinado tratamento ou exposição parece demonstrar um efeito benéfico ou superior quando analisado na <strong>população global agregada</strong>, mas quando a população é dividida e analisada <strong>separadamente em cada um dos seus subgrupos estratificados</strong>, o efeito inverte-se categoricamente, demonstrando que o tratamento é prejudicial em todos os subgrupos!</p>

<p>Isso ocorre quando a variável de estratificação está associada tanto à gravidade basal dos doentes quanto à probabilidade de receber o tratamento experimental (os médicos tendem a indicar o novo tratamento com entusiasmo para os pacientes em estado desesperador e quase terminal, fazendo com que a mortalidade bruta da droga pareça maior, quando na realidade a droga é superior para pacientes leves e superior para pacientes graves).</p>
`
};
