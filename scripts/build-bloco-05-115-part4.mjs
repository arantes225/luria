// Bloco 5 - Aula 115: Vieses, Confundimento e Causalidade - Part 4
export const sec7 = {
  id: 'casos-clinicos-e-questoes-comentadas',
  title: '7. Casos Clínicos Estruturados e Bateria de Questões Comentadas com Distratores',
  body_html: `
<h3>Casos Clínicos Aplicados à Prática Epidemiológica</h3>

<div class="book-case">
  <h4>Caso Clínico 1: O Dilema do Café, Idade e Hipertensão</h4>
  <p><strong>Cenário:</strong> Um pesquisador avaliou a relação entre o consumo diário de café e a incidência de Hipertensão Arterial Sistêmica (HAS) em uma coorte de 5.000 bancários acompanhados por 8 anos. Na análise bruta inicial, encontrou-se uma associação estatisticamente significante: o consumo de $> 4$ xícaras de café por dia esteve associado a um Risco Relativo bruto de $RR_{bruto} = 1,85$ para HAS ($IC95\\%: 1,40 - 2,45$).</p>
  <p>Suspeitando que a <strong>Idade</strong> pudesse influenciar os resultados, o bioestatístico dividiu a população em dois estratos etários homogêneos:</p>
  <ul>
    <li>Estrato 1 (Participantes com Idade $< 45$ anos): $RR = 1,02$ ($IC95\\%: 0,85 - 1,22$);</li>
    <li>Estrato 2 (Participantes com Idade $\ge 45$ anos): $RR = 1,04$ ($IC95\\%: 0,88 - 1,24$);</li>
    <li>Risco Relativo Ajustado combinado de Mantel-Haenszel: $RR_{ajustado} = 1,03$ ($IC95\\%: 0,90 - 1,18$).</li>
  </ul>
  <p><strong>Julgamento Epidemiológico:</strong> Os dois estratos específicos são virtualmente idênticos entre si ($1,02 \\approx 1,04$), demonstrando que <strong>NÃO HÁ modificação de efeito</strong>. Porém, ambos os estratos diferem radicalmente do valor bruto ($1,03$ versus $1,85$). Isso comprova com certeza matemática absoluta que a <strong>Idade atuou como um clássico Fator de Confundimento</strong> (indivíduos mais velhos tomam mais café por hábitos ocupacionais e, independentemente do café, desenvolvem mais hipertensão por enrijecimento arterial senil). A conduta correta do pesquisador é reportar que, após o ajuste para idade, <strong>o café não aumenta o risco de hipertensão ($RR = 1,03$; nulo!)</strong>.</p>
</div>

<div class="book-case">
  <h4>Caso Clínico 2: A Avaliação de Eficácia de Vacinação em Doença Respiratória</h4>
  <p><strong>Cenário:</strong> Em um estudo observacional avaliando a efetividade de uma nova vacina contra internações por pneumonia bacteriana grave em idosos da comunidade, observou-se que o grupo de idosos vacinados apresentou 40% a mais de hospitalizações do que o grupo que não se vacinou ($RR = 1,40; p = 0,01$). Investigando a fundo a seleção dos pacientes, constatou-se que os médicos dos postos de saúde recomendaram enfaticamente a vacina para idosos institucionalizados, portadores de DPOC grave, insuficiência cardíaca e dependência funcional, enquanto idosos atletas e hígidos optaram por não comparecer à campanha.</p>
  <p><strong>Diagnóstico do Erro Metodológico:</strong> Trata-se do clássico <strong>Viés de Indicação (Confounding by Indication)</strong>, uma variante devastadora do viés de confusão/seleção. A indicação clínica do tratamento está atrelada à gravidade basal do paciente; a gravidade intrínseca da doença de base é que causou o desfecho hospitalar desfavorável, e não a vacina!</p>
</div>

<h3>Bateria de Questões Comentadas com Distratores Analisados</h3>

<h4>Questão 1 (USP / FMUSP - Residência Médica)</h4>
<p>Um estudo epidemiológico avaliou a associação entre o uso crônico de anti-inflamatórios não esteroidais (AINEs) e o risco de úlcera péptica complicada com hemorragia digestiva alta. Na análise bruta, observou-se um Odds Ratio de $OR = 3,5$ ($IC95\\%: 2,2 - 5,6$). Os autores estratificaram a análise pela presença de infecção gástrica pelo <em>Helicobacter pylori</em>:</p>
<p>- Entre os pacientes <em>H. pylori</em> negativos: $OR = 3,6$ ($IC95\\%: 2,1 - 5,8$);<br>
- Entre os pacientes <em>H. pylori</em> positivos: $OR = 3,4$ ($IC95\\%: 2,0 - 5,5$);<br>
- O Odds Ratio combinado ajustado por Mantel-Haenszel foi de $OR = 3,5$ ($IC95\\%: 2,2 - 5,5$).</p>
<p>A partir desses achados, a correta interpretação metodológica sobre o papel da infecção por <em>H. pylori</em> nessa relação causal é:</p>
<ul>
  <li>A) A infecção por <em>H. pylori</em> é um fator de confundimento positivo da associação.</li>
  <li>B) A infecção por <em>H. pylori</em> é uma modificadora de efeito sinérgica.</li>
  <li>C) A infecção por <em>H. pylori</em> não atua como fator de confundimento nem como modificadora de efeito.</li>
  <li>D) O estudo incorreu em viés de Berkson incontornável pela ausência de pareamento multivariado.</li>
</ul>
<p><strong>Gabarito Comentado: Letra C.</strong></p>
<p><em>Justificativa:</em> Observe os três passos do algoritmo LURIA: (1) As medidas específicas por estrato são praticamente idênticas entre si ($3,6 \\approx 3,4$), logo <em>não há modificação de efeito</em>; (2) A medida ajustada de Mantel-Haenszel ($3,5$) é absolutamente idêntica à medida bruta original ($3,5$), logo <em>não há confundimento</em>! A presença de <em>H. pylori</em> é independente do uso de AINEs nessa população e não distorceu a associação. A resposta é a Letra C.</p>

<h4>Questão 2 (ENARE / Exame Nacional de Residência)</h4>
<p>Dentre os nove critérios propostos por Sir Austin Bradford Hill para sustentar uma inferência de causalidade a partir de uma associação estatística observacional em saúde, assinale a alternativa que indica o ÚNICO critério considerado estritamente indispensável e obrigatório para que uma relação seja julgada como causal:</p>
<ul>
  <li>A) Plausibilidade biológica.</li>
  <li>B) Temporalidade.</li>
  <li>C) Força da associação ($RR > 2,0$).</li>
  <li>D) Relação dose-resposta (gradiente biológico).</li>
</ul>
<p><strong>Gabarito Comentado: Letra B.</strong></p>
<p><em>Justificativa:</em> Conforme Hill afirmou taxativamente em 1965 e como preconizam todas as diretrizes de epidemiologia moderna, a <strong>Temporalidade</strong> é a única condição <em>sine qua non</em> para causalidade: a causa deve necessariamente preceder o efeito no tempo real. Se o efeito antecedeu a exposição, qualquer hipótese causal é imediatamente aniquilada. Todos os outros critérios (plausibilidade, força, dose-resposta) podem estar ausentes sem invalidar a relação etiológica (Letra B).</p>

<h4>Questão 3 (UNICAMP - Residência Médica)</h4>
<p>Para investigar a hipótese de que o uso materno de determinados antidepressivos no primeiro trimestre gestacional causa cardiopatias congênitas graves no concepto, pesquisadores selecionaram 100 recém-nascidos com diagnóstico confirmado de tetralogia de Fallot atendidos em um hospital terciário e 200 crianças sem cardiopatias nascidas na mesma maternidade. As mães dos dois grupos foram submetidas a uma exaustiva entrevista com questionário recordatório retrospectivo sobre uso de fármacos na gravidez. O maior risco de viés metodológico inerente a esse desenho de pesquisa atende pelo nome de:</p>
<ul>
  <li>A) Viés de Atrição (perda de seguimento não aleatória).</li>
  <li>B) Viés de Recordatório ou de Memória (Recall Bias).</li>
  <li>C) Erro de Classificação Não Diferencial.</li>
  <li>D) Falácia Ecológica de Robinson.</li>
</ul>
<p><strong>Gabarito Comentado: Letra B.</strong></p>
<p><em>Justificativa:</em> Em um estudo de caso-controle baseado em entrevistas com mães de crianças com malformações congênitas graves (casos) versus mães de crianças sadias (controles), a mãe cujo filho nasceu com uma cardiopatia grave vasculhou obsessivamente seu passado gestacional e relatará com facilidade qualquer pílula tomada, enquanto a mãe do controle sadio esquecerá exposições irrelevantes. Isso configura o clássico <strong>Viés de Memória / Recordatório</strong> (Letra B).</p>

<h4>Questão 4 (Revalida INEP)</h4>
<p>Em um hospital universitário, a comissão de controle de infecção hospitalar conduziu uma auditoria observacional aberta sobre a taxa de higienização das mãos entre médicos residentes de cirurgia geral. Durante o mês em que os médicos sabiam que estavam sendo filmados e auditados para uma pesquisa acadêmica, a adesão à lavagem das mãos atingiu 95%, com drástica redução nas taxas de infecção de sítio cirúrgico. Três meses após o término formal da pesquisa e retirada dos avisos, nova inspeção sigilosa revelou que a taxa de lavagem retornou para 38%. Essa alteração comportamental temporária provocada pela simples consciência de estar sendo observado em um estudo denomina-se:</p>
<ul>
  <li>A) Efeito Hawthorne.</li>
  <li>B) Efeito Pigmalião.</li>
  <li>C) Viés de Berkson.</li>
  <li>D) Paradoxo de Simpson.</li>
</ul>
<p><strong>Gabarito Comentado: Letra A.</strong></p>
<p><em>Justificativa:</em> A modificação de comportamento do indivíduo decorrente do fato de saber que está sob vigilância, monitoramento ou observação em uma pesquisa científica é a definição conceitual exata do <strong>Efeito Hawthorne</strong> (Letra A).</p>

<h4>Questão 5 (Hospital Sírio-Libanês / Residência Médica)</h4>
<p>Na teoria causal moderna baseada em Gráficos Acíclicos Direcionados (DAGs), considere três variáveis: Tabagismo ($X$), Fibrinogênio Sanguíneo Elevado ($Z$) e Infarto Agudo do Miocárdio ($Y$). Sabendo-se que o tabagismo promove a elevação dos níveis séricos de fibrinogênio, o qual, por sua vez, induz hipercoagulabilidade e precipita o infarto ($X \rightarrow Z \rightarrow Y$), a variável $Z$ atua causalmente como um:</p>
<ul>
  <li>A) Fator de Confundimento tradicional (Fork).</li>
  <li>B) Colisor (Collider).</li>
  <li>C) Mediador Biológico intermediário (Intermediate Mediator).</li>
  <li>D) Modificador de efeito de base genética.</li>
</ul>
<p><strong>Gabarito Comentado: Letra C.</strong></p>
<p><em>Justificativa:</em> Uma variável que se situa na cadeia causal entre a exposição primária e o desfecho ($X \rightarrow Z \rightarrow Y$) é denominada <strong>Mediador Biológico</strong>. Se o bioestatístico ajustar a análise para o nível de fibrinogênio sérico, ele bloqueará a via biológica pela qual o tabaco causa o infarto, mascarando o verdadeiro efeito causal total do fumo! Um mediador jamais pode ser tratado como um fator de confusão convencional (Letra C).</p>

<h4>Questão 6 (SURCE / Seleção Unificada para Residência do Ceará)</h4>
<p>Um epidemiologista deseja investigar a toxicidade pulmonar de um solvente volátil entre trabalhadores de uma grande fábrica de calçados. Ao comparar a taxa de mortalidade por doenças respiratórias dos trabalhadores fabris contra a taxa de mortalidade da população geral do mesmo município, ele observa, surpreso, que os trabalhadores da fábrica apresentavam menor coeficiente de mortalidade geral e respiratória ($RR = 0,72; p = 0,02$). O fenômeno metodológico que explica essa falsa proteção aparente é o:</p>
<ul>
  <li>A) Efeito do Trabalhador Sadio (Healthy Worker Effect).</li>
  <li>B) Viés de Detecção Subclínica.</li>
  <li>C) Efeito Placebo Institucional.</li>
  <li>D) Erro Alfa decorrente de sobredispersão.</li>
</ul>
<p><strong>Gabarito Comentado: Letra A.</strong></p>
<p><em>Justificativa:</em> Indivíduos ativos no mercado de trabalho são inerentemente mais saudáveis, jovens e livres de incapacidades graves do que a população geral (que inclui idosos dependentes, acamados e doentes crônicos fora do mercado de trabalho). Comparar operários contra a população geral mascara a toxicidade do solvente através do clássico <strong>Efeito do Trabalhador Sadio</strong> (Letra A).</p>
`
};
