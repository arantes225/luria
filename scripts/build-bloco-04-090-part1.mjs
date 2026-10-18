// Bloco 4 - Aula 090: Medidas de Associação e Impacto (Parte 1: Seções 1 a 4)

export const sec1 = {
  id: 'tabela-de-contingencia-2x2-e-fundamentos-associacao',
  title: '1. A Tabela de Contingência 2x2 e a Lógica Epistemológica das Medidas de Associação',
  body_html: `
<h3>Da Descrição à Inferência Causal: O Papel da Epidemiologia Analítica</h3>
<p>As medidas de frequência (como incidência e prevalência) respondem à pergunta clínica elementar: <em>"Qual é a magnitude e a velocidade com que a doença ocorre na população?"</em>. No entanto, a medicina científica e a prática médica baseada em evidências demandam respostas a perguntas causais mais profundas: <em>"O tabagismo causa câncer de pulmão?"</em>, <em>"O uso precoce de inibidores da SGLT2 reduz hospitalizações por insuficiência cardíaca?"</em>, <em>"A vacinação previne formas graves de infecção?"</em>.</p>

<p>Para responder a essas indagações etiológicas e de eficácia terapêutica, a epidemiologia analítica recorre às <strong>Medidas de Associação</strong>. O ponto de partida metodológico universal para correlacionar uma <strong>Exposição</strong> (fator de risco, marcador prognóstico ou intervenção farmacológica) a um <strong>Desfecho</strong> (adoecimento, cura, sequela ou óbito) é a clássica <strong>Tabela de Contingência 2x2 (Tabela Tetrachórica)</strong>:</p>

<table class="book-table">
  <thead>
    <tr>
      <th rowspan="2">Status da Exposição ao Fator Estudado</th>
      <th colspan="2">Status do Desfecho Clínico (Doença / Evento)</th>
      <th rowspan="2">Total Marginal de Exposição</th>
      <th rowspan="2">Incidência ou Risco no Grupo</th>
    </tr>
    <tr>
      <th>Com o Desfecho (Doentes)</th>
      <th>Sem o Desfecho (Sadios)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Expostos ao Fator ($E^+$)</strong></td>
      <td><strong>$a$</strong> (Verdadeiros Expostos Doentes)</td>
      <td><strong>$b$</strong> (Expostos Não Doentes)</td>
      <td><strong>$a + b$</strong> (Total de Expostos)</td>
      <td>$$I_{exp} = \\frac{a}{a + b}$$</td>
    </tr>
    <tr>
      <td><strong>NÃO Expostos ao Fator ($E^-$)</strong></td>
      <td><strong>$c$</strong> (Não Expostos Doentes)</td>
      <td><strong>$d$</strong> (Não Expostos Não Doentes)</td>
      <td><strong>$c + d$</strong> (Total de Não Expostos)</td>
      <td>$$I_{n\\tilde{a}o-exp} = \\frac{c}{c + d}$$</td>
    </tr>
    <tr>
      <td><strong>Total Marginal de Doença</strong></td>
      <td><strong>$a + c$</strong> (Total de Doentes)</td>
      <td><strong>$b + d$</strong> (Total de Sadios)</td>
      <td><strong>$N = a + b + c + d$</strong> (População Total)</td>
      <td>$$I_{global} = \\frac{a + c}{N}$$</td>
    </tr>
  </tbody>
</table>

<h3>A Natureza Relativa versus Absoluta da Comparação</h3>
<p>A comparação entre o risco no grupo exposto ($I_{exp}$) e o risco no grupo não exposto ($I_{n\\tilde{a}o-exp}$) pode ser realizada sob duas operações matemáticas fundamentais que geram interpretações clínicas completamente distintas e complementares:</p>
<ol>
  <li><strong>Medidas de Efeito Relativo (Razões):</strong> Obtidas pela <strong>divisão</strong> ($I_{exp} / I_{n\\tilde{a}o-exp}$). Avaliam a <strong>força biológica da associação causal</strong> entre o fator e a doença (Risco Relativo, Odds Ratio, Razão de Prevalências). São as medidas preferidas pelo cientista, pelo patologista e pelo pesquisador etiológico;</li>
  <li><strong>Medidas de Efeito Absoluto (Diferenças):</strong> Obtidas pela <strong>subtração direta</strong> ($I_{exp} - I_{n\\tilde{a}o-exp}$). Avaliam o <strong>impacto real na saúde pública</strong>, quantificando o excesso absoluto de casos atribuíveis àquela exposição ou o benefício concreto proporcionado pelo tratamento (Risco Atribuível, Redução Absoluta do Risco, NNT). São as medidas preferidas pelo gestor do SUS, pelo médico clínico à beira do leito e pelo paciente.</li>
</ol>
`
};

export const sec2 = {
  id: 'risco-relativo-odds-ratio-e-razao-de-prevalencias',
  title: '2. Medidas de Associação Relativas: Risco Relativo (RR), Odds Ratio (OR) e Razão de Prevalências (RP)',
  body_html: `
<h3>O Risco Relativo (RR) e seus Desenhos Epidemiológicos Pertinentes</h3>
<p>O <strong>Risco Relativo (RR)</strong> (ou Razão de Riscos) é a razão entre a incidência do desfecho no grupo exposto e a incidência do desfecho no grupo não exposto:</p>

<div class="formula-box">
  $$RR = \\frac{\\text{Incidência nos Expostos}}{\\text{Incidência nos Não Expostos}} = \\frac{\\frac{a}{a + b}}{\\frac{c}{c + d}}$$
</div>

<p><strong>Regra de Ouro Metodológica de Provas:</strong> O Risco Relativo <strong>SÓ PODE SER CALCULADO DIRETAMENTE</strong> em estudos epidemiológicos longitudinais que acompanham a população ao longo do tempo e medem a <strong>INCIDÊNCIA REAL</strong>:</p>
<ul>
  <li><strong>Estudos de Coorte</strong> (prospectivos ou retrospectivos);</li>
  <li><strong>Ensaios Clínicos Randomizados (ECR)</strong>.</li>
</ul>
<p><em>É formalmente PROIBIDO calcular Risco Relativo diretamente em Estudos de Caso-Controle</em>, pois o pesquisador fixa artificialmente o número de casos e controles no início, tornando o cálculo de incidência populacional matematicamente impossível!</p>

<h3>O Odds Ratio (OR) ou Razão de Chances nos Estudos de Caso-Controle</h3>
<p>No <strong>Estudo de Caso-Controle</strong>, os pacientes já iniciam o estudo selecionados pelo seu status de doença (o grupo dos "Casos" que já têm o infarto ou câncer, e o grupo dos "Controles" sadios). O pesquisador olha para trás no passado (retrospectivamente) para investigar a exposição prévia.</p>

<p>Como não há denominadores populacionais sob risco para calcular incidência, calcula-se a <strong>Chance (Odds)</strong> de exposição entre os casos e a Chance de exposição entre os controles, dividindo uma pela outra para gerar o <strong>Odds Ratio (OR)</strong> ou <strong>Razão de Produtos Cruzados</strong>:</p>

<div class="formula-box">
  $$\\text{Chance de Exposição nos Casos} = \\frac{a}{c}$$
  $$\\text{Chance de Exposição nos Controles} = \\frac{b}{d}$$
  $$OR = \\frac{\\frac{a}{c}}{\\frac{b}{d}} = \\frac{a \\times d}{b \\times c}$$
</div>

<h3>A Suposição de Doença Rara (Rare Disease Assumption)</h3>
<p>Quando a doença estudada na população é <strong>rara</strong> (incidência acumulada ou prevalência $&lt; 5\\%$ a $10\\%$), o número de doentes ($a$ e $c$) é infinitesimalmente pequeno em relação ao número de não doentes ($b$ e $d$). Nesses cenários:
$$a + b \\approx b \\quad \\text{e} \\quad c + d \\approx d$$
Substituindo esses valores na fórmula do RR:
$$RR = \\frac{\\frac{a}{a+b}}{\\frac{c}{c+d}} \\approx \\frac{\\frac{a}{b}}{\\frac{c}{d}} = \\frac{a \\times d}{b \\times c} = OR$$
<strong>Conclusão Crítica:</strong> Para doenças raras na população, <strong>o Odds Ratio ($OR$) é uma excelente e quase perfeita aproximação numérica do Risco Relativo ($RR$)</strong>!</p>

<h3>A Razão de Prevalências (RP) nos Estudos Transversais</h3>
<p>Nos <strong>Estudos Transversais (Seccionais ou de Prevalência)</strong>, a exposição e a doença são aferidas simultaneamente em um único ponto do tempo ("fotografia instantânea"). Como não há acompanhamento temporal, não se mede incidência. A medida analítica de associação indicada é a <strong>Razão de Prevalências (RP)</strong>:</p>

<div class="formula-box">
  $$RP = \\frac{\\text{Prevalência nos Expostos}}{\\text{Prevalência nos Não Expostos}} = \\frac{\\frac{a}{a + b}}{\\frac{c}{c + d}}$$
</div>

<h3>Quadro Sinóptico de Escolha da Medida Relativa conforme o Desenho de Estudo</h3>
<table class="book-table">
  <thead>
    <tr>
      <th>Desenho Epidemiológico</th>
      <th>Eixo Temporal do Estudo</th>
      <th>Medida de Frequência Medida</th>
      <th>Medida Analítica de Associação Oficial</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Ensaio Clínico Randomizado (ECR)</strong></td>
      <td>Longitudinal prospectivo com intervenção do pesquisador</td>
      <td>Incidência</td>
      <td><strong>Risco Relativo (RR)</strong></td>
    </tr>
    <tr>
      <td><strong>Estudo de Coorte</strong></td>
      <td>Longitudinal observacional (da exposição para o desfecho)</td>
      <td>Incidência (risco ou densidade)</td>
      <td><strong>Risco Relativo (RR)</strong> ou Razão de Taxas</td>
    </tr>
    <tr>
      <td><strong>Estudo de Caso-Controle</strong></td>
      <td>Longitudinal observacional retrospectivo (do desfecho para a exposição)</td>
      <td>Não mede frequência direta</td>
      <td><strong>Odds Ratio (OR)</strong> (Razão de Chances)</td>
    </tr>
    <tr>
      <td><strong>Estudo Transversal (Seccional)</strong></td>
      <td>Instantâneo (exposição e desfecho aferidos juntos)</td>
      <td>Prevalência</td>
      <td><strong>Razão de Prevalências (RP)</strong> (ou OR de prevalência)</td>
    </tr>
  </tbody>
</table>
`
};

export const sec3 = {
  id: 'interpretacao-do-intervalo-de-confianca-e-p-valor',
  title: '3. Interpretação do Intervalo de Confiança de 95% (IC 95%), Valor de p e Hipótese Nula',
  body_html: `
<h3>O Valor Nulo nas Medidas de Associação Relativas ($RR = 1,0$ / $OR = 1,0$)</h3>
<p>Em qualquer medida expressa sob a forma de razão ($A / B$), o resultado numérico <strong>1,0</strong> representa a perfeita igualdade matemática entre o numerador e o denominador. Portanto, em epidemiologia analítica:</p>
<ul>
  <li><strong>$RR = 1,0$ ou $OR = 1,0$ (Valor Nulo / Hipótese Nula $H_0$):</strong> A incidência ou chance no grupo exposto é <em>exatamente igual</em> à incidência no grupo não exposto. Conclusão: <strong>A exposição NÃO ESTÁ associada ao desfecho</strong> (fator neutro ou indiferente);</li>
  <li><strong>$RR &gt; 1,0$ ou $OR &gt; 1,0$:</strong> O desfecho ocorre com maior frequência entre os expostos. Conclusão: A exposição é um <strong>FATOR DE RISCO</strong> para a doença (ex.: $RR = 3,5$ significa que os expostos têm 3,5 vezes mais probabilidade de adoecer do que os não expostos);</li>
  <li><strong>$RR &lt; 1,0$ ou $OR &lt; 1,0$:</strong> O desfecho ocorre com menor frequência entre os expostos. Conclusão: A exposição é um <strong>FATOR DE PROTEÇÃO</strong> contra a doença (ex.: vacina ou droga preventiva, onde $RR = 0,30$ indica que o grupo vacinado teve apenas 30% do risco do grupo controle placebo).</li>
</ul>

<h3>A Regra de Ouro do Intervalo de Confiança de 95% (IC 95%) em Provas</h3>
<p>O <strong>Intervalo de Confiança de 95%</strong> delimita uma faixa de valores dentro da qual se tem 95% de certeza estatística de que reside o verdadeiro parâmetro populacional desconhecido. A interpretação do IC 95% em uma questão de concurso obedece a uma regra simples, direta e infalível:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Comportamento do Intervalo de Confiança de 95%</th>
      <th>Cruza o Valor Nulo (1,0)?</th>
      <th>Significância Estatística ($p &lt; 0,05$)</th>
      <th>Interpretação Clínica e Conclusão Epidemiológica</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Ambos os limites são MAIORES que 1,0</strong><br>(ex.: $RR = 2,8$ [$IC 95\\%: 1,4 - 4,6$])</td>
      <td><strong>NÃO CRUZA 1,0</strong> (o limite inferior é $> 1,0$)</td>
      <td><strong>Estatisticamente Significante</strong> ($p &lt; 0,05$)</td>
      <td>Comprova-se formalmente que o fator é um <strong>FATOR DE RISCO</strong> real. Rejeita-se a hipótese nula $H_0$.</td>
    </tr>
    <tr>
      <td><strong>Ambos os limites são MENORES que 1,0</strong><br>(ex.: $RR = 0,40$ [$IC 95\\%: 0,22 - 0,75$])</td>
      <td><strong>NÃO CRUZA 1,0</strong> (o limite superior é $< 1,0$)</td>
      <td><strong>Estatisticamente Significante</strong> ($p &lt; 0,05$)</td>
      <td>Comprova-se formalmente que o fator é um <strong>FATOR DE PROTEÇÃO</strong> real. Rejeita-se a hipótese nula $H_0$.</td>
    </tr>
    <tr>
      <td><strong>O limite inferior é menor que 1,0 e o superior é maior que 1,0</strong><br>(ex.: $RR = 1,8$ [$IC 95\\%: 0,85 - 3,40$])</td>
      <td><strong>CRUZA O VALOR NULO 1,0!</strong></td>
      <td><strong>NÃO É Estatisticamente Significante</strong> ($p \ge 0,05$)</td>
      <td><strong>Não se pode afastar o acaso!</strong> O fator pode ser de risco, pode ser nulo ou pode ser de proteção. Aceita-se a hipótese nula $H_0$. Não há comprovação de associação causal estatística.</td>
    </tr>
  </tbody>
</table>

<h3>Precisão Estimativa e Amplitude do Intervalo de Confiança</h3>
<p>A largura (amplitude) do Intervalo de Confiança reflete a <strong>precisão estatística</strong> do estudo, que é diretamente determinada pelo <strong>tamanho da amostra ($N$)</strong>:</p>
<ul>
  <li><strong>Amostras Grandes ($N$ elevado):</strong> Erro-padrão muito pequeno $\rightarrow$ <strong>Intervalo de Confiança estreito / preciso</strong> (ex.: $RR = 1,45$ [$IC 95\\%: 1,38 - 1,52$]);</li>
  <li><strong>Amostras Pequenas ($N$ reduzido / poucos eventos):</strong> Grande variabilidade aleatória $\rightarrow$ <strong>Intervalo de Confiança largo / impreciso</strong> (ex.: $RR = 2,50$ [$IC 95\\%: 0,95 - 6,80$]), frequentemente cruzando o valor 1,0 por falta de poder estatístico (erro beta ou tipo II).</li>
</ul>
`
};

export const sec4 = {
  id: 'medidas-de-impacto-absolutas-ra-fa-rar-nnt',
  title: '4. Medidas de Impacto e Diferenças Absolutas: Risco Atribuível (RA), Fração Atribuível (FA), RAR, NNT e NNH',
  body_html: `
<h3>Por que as Medidas Relativas São Insuficientes para a Tomada de Decisão Clínica?</h3>
<p>Uma intervenção medicamentosa pode apresentar um Risco Relativo espetacular ($RR = 0,50$, ou seja, uma redução de 50% no risco relativo de adoecer), mas ter um impacto prático quase nulo na vida do paciente se a doença de base for extremamente rara. Se o risco de morrer por uma complicação rara for de 2 em 10.000 (0,02%) e o remédio reduzir para 1 em 10.000 (0,01%), a redução relativa é de 50%, mas a redução absoluta real foi de apenas 1 em 10.000 (0,01%)!</p>

<p>Para mensurar o impacto concreto na prática médica e na alocação de recursos do SUS, a bioestatística utiliza as <strong>Medidas de Efeito Absoluto e Impacto Potencial</strong>:</p>

<h3>1. Risco Atribuível nos Expostos (RA) ou Diferença de Riscos (DR)</h3>
<p>O <strong>Risco Atribuível no grupo exposto</strong> quantifica o <strong>excesso absoluto de risco</strong> de adoecimento que é diretamente atribuível ao fator de risco estudado. É obtido pela subtração direta das incidências:</p>

<div class="formula-box">
  $$RA = I_{exp} - I_{n\\tilde{a}o-exp}$$
</div>
<p><em>Interpretação Prática:</em> Se a incidência de infarto em fumantes for de 15% e em não fumantes for de 5%, o $RA = 15\\% - 5\\% = 10\\%$. Isso significa que o tabagismo foi responsável por um excesso de 10 infartos a cada 100 fumantes acompanhados. Se todos os fumantes parassem de fumar, 10 casos de infarto em cada 100 indivíduos seriam evitados.</p>

<h3>2. Fração Atribuível no Grupo Exposto (FA) ou Risco Atribuível Proporcional</h3>
<p>A <strong>Fração Atribuível</strong> responde: <em>"De todos os casos de doença que surgiram entre os expostos, qual a porcentagem que decorreu exclusivamente da exposição e que seria evitada se o fator de risco fosse eliminado?"</em>:</p>

<div class="formula-box">
  $$FA = \\frac{I_{exp} - I_{n\\tilde{a}o-exp}}{I_{exp}} \\times 100 = \\frac{RR - 1}{RR} \\times 100$$
</div>
<p><em>Exemplo:</em> Se fumantes têm $RR = 4,0$ de desenvolver câncer de pulmão em relação a não fumantes:
$$FA = \\frac{4,0 - 1}{4,0} \\times 100 = \\frac{3}{4} \\times 100 = 75\\%$$
Isso significa que <strong>75% de todos os cânceres de pulmão diagnosticados em fumantes decorrem exclusivamente do cigarro</strong> e desapareceriam se o tabaco fosse extinto!</p>

<h3>3. Fração Atribuível Populacional (FAP)</h3>
<p>Mede a proporção de casos de uma doença na <strong>população geral inteira</strong> (não apenas entre os expostos) que cessariam se o fator de risco fosse completamente erradicado de toda a comunidade. Depende da força do $RR$ e da <strong>prevalência da exposição na população ($p$)</strong>:</p>

<div class="formula-box">
  $$FAP = \\frac{I_{global} - I_{n\\tilde{a}o-exp}}{I_{global}} = \\frac{p \\times (RR - 1)}{p \\times (RR - 1) + 1}$$
</div>

<h3>4. Redução Absoluta do Risco (RAR) em Ensaios Clínicos</h3>
<p>Em ensaios clínicos terapêuticos ou preventivos, a intervenção visa <em>reduzir</em> o risco de um desfecho indesejável (morte, reinfarto, internação). A <strong>Redução Absoluta do Risco (RAR)</strong> é a diferença entre a taxa de eventos no grupo controle placebo ($CER$) e a taxa de eventos no grupo intervenção experimental ($EER$):</p>

<div class="formula-box">
  $$RAR = \\text{Risco no Grupo Controle } (CER) - \\text{Risco no Grupo Tratado } (EER)$$
</div>

<h3>5. Número Necessário para Tratar (NNT - Number Needed to Treat)</h3>
<p>O <strong>NNT</strong> é considerado a medida clínica mais intuitiva e relevante para a tomada de decisão médica. Ele quantifica <strong>quantos pacientes um médico precisa tratar com a nova terapia durante um determinado tempo para EVITAR UM DESFECHO DESFAVORÁVEL ADICIONAL</strong> (uma morte, um infarto ou um AVC). Matematicamente, o NNT é o <strong>inverso exato da Redução Absoluta do Risco (RAR)</strong>:</p>

<div class="formula-box">
  $$NNT = \\frac{1}{RAR}$$
  <p><em>Atenção para o arredondamento:</em> O NNT deve ser <strong>SEMPRE arredondado PARA CIMA</strong> para o próximo número inteiro (ex.: se o cálculo der $NNT = 14,2$, arredonda-se para 15)! Quanto <strong>MENOR</strong> for o NNT, mais potente e clinicamente eficaz é o tratamento.</p>
</div>

<h3>6. Número Necessário para Causar Dano (NNH - Number Needed to Harm)</h3>
<p>Mede a toxicidade ou risco de eventos adversos graves causados por uma intervenção farmacológica. Representa o número de pacientes que precisam receber a droga para que <strong>UM PACIENTE ADICIONAL SOFRA UM EFEITO ADVERSO GRAVE</strong> (ex.: sangramento digestivo grave, hepatotoxicidade). É o inverso do Aumento Absoluto do Risco ($ARI$):</p>

<div class="formula-box">
  $$NNH = \\frac{1}{ARI} = \\frac{1}{I_{tratados} - I_{controle}}$$
  <p>Ao contrário do NNT, aqui a regra de segurança inverte-se: <strong>QUANTO MAIOR FOR O NNH, MAIS SEGURO É O MEDICAMENTO</strong> (significa que muitos pacientes precisam ser tratados para que um único efeito adverso se manifeste).</p>
</div>
`
};
