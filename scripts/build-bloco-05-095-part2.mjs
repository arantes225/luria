// Bloco 5 - Aula 095: Sensibilidade, Especificidade e Valores Preditivos (Parte 2: Seções 5 a 8)

export const sec5 = {
  id: 'casos-clinicos-estruturados-validade-diagnostica',
  title: '5. Casos Clínicos Estruturados e Raciocínio Probabilístico na Tomada de Decisão Médica',
  body_html: `
<h3>Caso Clínico 1: Rastreamento em Massa vs Ambulatório Especializado (O Paradoxo da Prevalência)</h3>
<p><strong>Cenário:</strong> Um novo teste rápido imunocromatográfico de saliva é desenvolvido para detecção de infecção aguda pelo vírus da Hepatite C. Os estudos de validação clínica contra o padrão-ouro (RT-PCR sérico) demonstraram que o teste possui <strong>Sensibilidade de 90%</strong> e <strong>Especificidade de 90%</strong>.</p>

<p>O teste é aplicado em duas populações completamente distintas com 10.000 pessoas cada:</p>
<ul>
  <li><strong>População A (Banco de Sangue / Triagem Geral):</strong> Indivíduos assintomáticos com <strong>Prevalência da doença de 1%</strong> (100 doentes reais e 9.900 sadios em 10.000 pessoas);</li>
  <li><strong>População B (Ambulatório Especializado de Hepatologia):</strong> Pacientes referenciados com elevação crônica de transaminases, onde a <strong>Prevalência da doença é de 50%</strong> (5.000 doentes reais e 5.000 sadios em 10.000 pessoas).</li>
</ul>

<p><strong>Construção das Tabelas 2x2 e Cálculos Comparativos:</strong></p>

<h4>Análise da População A (Prevalência Baixa = 1%):</h4>
<table class="book-table">
  <thead>
    <tr>
      <th>Resultado do Teste Rápido</th>
      <th>Doentes Reais ($D^+$ = 100)</th>
      <th>Sadios Reais ($D^-$ = 9.900)</th>
      <th>Total do Teste</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Teste Positivo ($T^+$)</strong></td>
      <td><strong>90</strong> ($VP = 90\\% \\text{ de } 100$)</td>
      <td><strong>990</strong> ($FP = 10\\% \\text{ de } 9.900$)</td>
      <td><strong>1.080</strong></td>
    </tr>
    <tr>
      <td><strong>Teste Negativo ($T^-$)</strong></td>
      <td><strong>10</strong> ($FN = 10\\% \\text{ de } 100$)</td>
      <td><strong>8.910</strong> ($VN = 90\\% \\text{ de } 9.900$)</td>
      <td><strong>8.920</strong></td>
    </tr>
    <tr>
      <td><strong>Total</strong></td>
      <td><strong>100</strong></td>
      <td><strong>9.900</strong></td>
      <td><strong>10.000</strong></td>
    </tr>
  </tbody>
</table>
<div class="formula-box">
  $$VPP_A = \\frac{VP}{\\text{Total Positivos}} = \\frac{90}{1.080} = 0,0833 = 8,33\\%$$
  $$VPN_A = \\frac{VN}{\\text{Total Negativos}} = \\frac{8.910}{8.920} = 0,9989 = 99,89\\%$$
</div>
<p><em>Lição Prática Chocante na População A:</em> Quando o teste rápido dá positivo no banco de sangue, a probabilidade real de o indivíduo ter hepatite C é de apenas <strong>8,3%</strong>! Mais de <strong>91,7% de todos os resultados positivos são FALSOS-POSITIVOS</strong> (990 falsos contra apenas 90 verdadeiros).</p>

<h4>Análise da População B (Prevalência Alta = 50%):</h4>
<table class="book-table">
  <thead>
    <tr>
      <th>Resultado do Teste Rápido</th>
      <th>Doentes Reais ($D^+$ = 5.000)</th>
      <th>Sadios Reais ($D^-$ = 5.000)</th>
      <th>Total do Teste</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Teste Positivo ($T^+$)</strong></td>
      <td><strong>4.500</strong> ($VP = 90\\% \\text{ de } 5.000$)</td>
      <td><strong>500</strong> ($FP = 10\\% \\text{ de } 5.000$)</td>
      <td><strong>5.000</strong></td>
    </tr>
    <tr>
      <td><strong>Teste Negativo ($T^-$)</strong></td>
      <td><strong>500</strong> ($FN = 10\\% \\text{ de } 5.000$)</td>
      <td><strong>4.500</strong> ($VN = 90\\% \\text{ de } 5.000$)</td>
      <td><strong>5.000</strong></td>
    </tr>
    <tr>
      <td><strong>Total</strong></td>
      <td><strong>5.000</strong></td>
      <td><strong>5.000</strong></td>
      <td><strong>10.000</strong></td>
    </tr>
  </tbody>
</table>
<div class="formula-box">
  $$VPP_B = \\frac{VP}{\\text{Total Positivos}} = \\frac{4.500}{5.000} = 0,9000 = 90,0\\%$$
  $$VPN_B = \\frac{VN}{\\text{Total Negativos}} = \\frac{4.500}{5.000} = 0,9000 = 90,0\\%$$
</div>
<p><em>Lição Prática na População B:</em> No ambulatório especializado, com o mesmíssimo teste, um resultado positivo tem <strong>90,0% de chance de ser verdadeiro-positivo</strong>! O VPP subiu de 8,3% para 90% unicamente em decorrência da elevação da prevalência pré-teste da doença.</p>

<h3>Caso Clínico 2: Descarte Seguro de Tromboembolismo Pulmonar no Pronto-Socorro</h3>
<p><strong>Cenário:</strong> Uma mulher de 28 anos, usuária de anticoncepcional oral, procura a UPA com dor torácica pleurítica ventilatório-dependente à direita e taquipneia súbita há 4 horas. O escore de Wells para embolia pulmonar é de 1,5 ponto (baixa probabilidade clínica pré-teste). O médico solicita dosagem de D-dímero por método ELISA de alta sensibilidade.</p>

<p><strong>Raciocínio Clínico:</strong></p>
<ul>
  <li>O teste de D-dímero possui <strong>Sensibilidade ultrassensível de 98% a 99%</strong>, porém <strong>baixa especificidade (40% a 50%)</strong>, pois eleva-se em infecções, inflamações, cirurgias e gestação;</li>
  <li>O resultado do D-dímero retorna <strong>NEGATIVO (&lt; 500 ng/mL)</strong>;</li>
  <li><strong>Conduta Mandatória:</strong> O médico aplica o princípio <em>SnNout</em>: diante de um teste com 99% de sensibilidade e resultado NEGATIVO em uma paciente de baixo risco pré-teste, o <strong>Valor Preditivo Negativo (VPN) é de 99,8%</strong>. A hipótese de TEP está <strong>definitivamente DESCARTADA</strong>, dispensando a realização de Angiotomografia Computadorizada de Tórax e poupando a paciente de radiação ionizante e contraste iodado nefrotóxico.</li>
</ul>
`
};

export const sec6 = {
  id: 'vieses-em-estudos-de-testes-diagnosticos',
  title: '6. Ameaças Metodológicas: Viés de Verificação, Viés do Espectro e Viés de Aferição em Diagnóstico',
  body_html: `
<h3>Erros Sistemáticos que Iludem a Acurácia de Exames Complementares</h3>
<p>Ao avaliar um artigo científico que propõe um novo método diagnóstico ou biomarcador, o médico revisor deve checar se a pesquisa esteve protegida contra três vieses clássicos da literatura diagnóstica:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Viés Diagnóstico</th>
      <th>Mecanismo Metodológico de Distorção</th>
      <th>Impacto nos Parâmetros do Teste</th>
      <th>Como Prevenir no Desenho do Estudo</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>1. Viés de Verificação (Work-Up Bias ou Verification Bias)</strong></td>
      <td>Ocorre quando os pacientes que apresentam resultado <strong>POSITIVO no novo teste têm maior probabilidade de serem encaminhados para realizar o Padrão-Ouro</strong> (especialmente se o padrão-ouro for invasivo, como cateterismo cardíaco ou biópsia), enquanto os pacientes com teste negativo são liberados para casa sem verificação.</td>
      <td><strong>Superestima grosseiramente a Sensibilidade</strong> e <strong>subestima a Especificidade</strong> do exame avaliado (pois a maioria dos falsos-negativos nunca chega a fazer o padrão-ouro e fica oculta).</td>
      <td>Submeter <strong>uma amostra aleatória homogênea de pacientes positivos E negativos</strong> ao padrão-ouro de forma compulsória ou realizar seguimento clínico longitudinal padronizado.</td>
    </tr>
    <tr>
      <td><strong>2. Viés de Espectro (Spectrum Bias)</strong></td>
      <td>Ocorre quando o teste é avaliado comparando <strong>casos extremos</strong>: um grupo de doentes graves em estágio terminal internados em hospital terciário versus um grupo de controles jovens voluntários sadios olímpicos sem qualquer queixa médica.</td>
      <td>Na vida real, a população clínica é cinzenta e intermediária (doentes oligossintomáticos leves e sadios com comorbidades que mimetizam a afecção). Essa comparação extrema <strong>inflaciona artificialmente tanto a Sensibilidade quanto a Especificidade</strong>.</td>
      <td>Avaliar o teste em uma população consecutiva real de pacientes que apresentam o sintoma de dúvida clínica inicial no ambiente ambulatorial cotidiano.</td>
    </tr>
    <tr>
      <td><strong>3. Ausência de Cegamento (Reviewer Bias)</strong></td>
      <td>O patologista ou radiologista que analisa o padrão-ouro sabe previamente o resultado que o paciente teve no teste avaliado (ou vice-versa).</td>
      <td>O examinador é induzido a reinterpretar achados duvidosos para que concordem com o teste anterior (viés de confirmação).</td>
      <td><strong>Cegamento Duplo Estrito:</strong> Quem avalia o teste experimental desconhece o padrão-ouro, e quem lauda o padrão-ouro desconhece o teste experimental.</td>
    </tr>
  </tbody>
</table>
`
};

export const sec7 = {
  id: 'sintese-de-alto-rendimento-e-armadilhas-diagnosticas',
  title: '7. Síntese de Alto Rendimento e Diretrizes para o ENAMED e Concursos Médicos',
  body_html: `
<h3>Tabela Mestra de Regras de Ouro em Testes Diagnósticos</h3>
<table class="book-table">
  <thead>
    <tr>
      <th>Conceito / Indicador</th>
      <th>Fórmula na Tabela 2x2</th>
      <th>Depende da Prevalência?</th>
      <th>Regra Inegociável para Provas</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Sensibilidade</strong></td>
      <td>$$\\frac{VP}{VP + FN} = \\frac{a}{a + c}$$</td>
      <td><strong>NÃO</strong> (Propriedade intrínseca)</td>
      <td>Avalia doentes reais; ideal para triagem (screening) e para DESCARTAR doenças quando dá negativo (<em>SnNout</em>).</td>
    </tr>
    <tr>
      <td><strong>Especificidade</strong></td>
      <td>$$\\frac{VN}{VN + FP} = \\frac{d}{b + d}$$</td>
      <td><strong>NÃO</strong> (Propriedade intrínseca)</td>
      <td>Avalia sadios reais; ideal para CONFIRMAR diagnósticos quando dá positivo (<em>SpPin</em>).</td>
    </tr>
    <tr>
      <td><strong>Valor Preditivo Positivo (VPP)</strong></td>
      <td>$$\\frac{VP}{VP + FP} = \\frac{a}{a + b}$$</td>
      <td><strong>SIM! Diretamente proporcional</strong></td>
      <td>Se a prevalência sobe, o VPP sobe. Se a prevalência é muito baixa, a maioria dos positivos é FALSO-POSITIVO!</td>
    </tr>
    <tr>
      <td><strong>Valor Preditivo Negativo (VPN)</strong></td>
      <td>$$\\frac{VN}{VN + FN} = \\frac{d}{c + d}$$</td>
      <td><strong>SIM! Inversamente proporcional</strong></td>
      <td>Se a prevalência cai, o VPN sobe e aproxima-se de 100%.</td>
    </tr>
    <tr>
      <td><strong>Testes em Paralelo</strong></td>
      <td>Positivo se $T_1^+$ OU $T_2^+$</td>
      <td>-</td>
      <td><strong>Aumenta a Sensibilidade e o VPN</strong>; diminui a especificidade. Usado em emergências.</td>
    </tr>
    <tr>
      <td><strong>Testes em Série</strong></td>
      <td>Positivo se $T_1^+$ E $T_2^+$</td>
      <td>-</td>
      <td><strong>Aumenta a Especificidade e o VPP</strong>; diminui a sensibilidade. Usado em triagem confirmatória.</td>
    </tr>
  </tbody>
</table>
`
};

export const sec8 = {
  id: 'bateria-de-questoes-comentadas-diagnosticos',
  title: '8. Bateria de Questões Comentadas do ENAMED e Concursos Médicos de Residência',
  body_html: `
<h3>Questões com Análise Completa de Alternativas e Distratores</h3>

<h4>Questão 1: ENARE / ENAMED — Impacto da Prevalência no VPP</h4>
<p><strong>Enunciado:</strong> Um teste sorológico para diagnóstico de uma virose emergente apresenta sensibilidade de 95% e especificidade de 95%. Um gestor municipal de saúde propõe aplicar o exame de forma universal em uma cidade com 100.000 habitantes onde a prevalência real da virose na população é de 0,2% (200 doentes reais). O médico auditor da Secretaria de Saúde alerta que essa triagem em massa gerará um número expressivo de resultados falso-positivos. O Valor Preditivo Positivo (VPP) aproximado desse teste na referida população é de:</p>
<p>A) 95,0%.<br>
B) 50,0%.<br>
C) 27,5%.<br>
D) 3,7%.<br>
E) 0,2%.</p>
<p><strong>Gabarito Oficial: Alternativa D.</strong></p>
<p><strong>Comentário Detalhado:</strong><br>
• <strong>Alternativa D (Correta):</strong> Construção imediata da tabela 2x2 para a população de 100.000 habitantes:
1. <strong>Doentes Reais ($D^+$):</strong> $0,2\\% \\text{ de } 100.000 = 200 \\text{ doentes}$.
  • Verdadeiros-Positivos ($VP$): $95\\% \\text{ de } 200 = 190 \\text{ pacientes}$;<br>
  • Falsos-Negativos ($FN$): $5\\% \\text{ de } 200 = 10 \\text{ pacientes}$.<br>
2. <strong>Sadios Reais ($D^-$):</strong> $100.000 - 200 = 99.800 \\text{ indivíduos hígidos}$.
  • Verdadeiros-Negativos ($VN$): $95\\% \\text{ de } 99.800 = 94.810$;<br>
  • Falsos-Positivos ($FP$): $5\\% \\text{ de } 99.800 = 4.990 \\text{ indivíduos sadios que deram positivo!}$.<br>
3. <strong>Cálculo do VPP:</strong>
$$VPP = \\frac{VP}{VP + FP} = \\frac{190}{190 + 4.990} = \\frac{190}{5.180} \\approx 0,03668 = 3,67\\% \\approx 3,7\\%$$
<em>Conclusão Chocante:</em> Apenas 3,7% de todos os cidadãos que receberem o laudo "Positivo" estarão realmente doentes! Mais de 96,3% serão pessoas sadias indevidamente alarmadas. A alternativa D é a única matematicamente correta.</p>

<h4>Questão 2: USP-SP — Testes em Paralelo vs em Série</h4>
<p><strong>Enunciado:</strong> Um médico intensivista atende um paciente com choque séptico grave e suspeita de meningococcemia. Ele decide colher simultaneamente bacterioscopia com Gram de raspado de lesão purpúrica de pele e teste rápido de antígeno capsular meningocócico na urina (ambos colhidos na admissão), considerando o paciente infectado se QUALQUER UM dos dois exames for positivo. Por outro lado, no ambulatório de pré-natal, o ginecologista solicita teste rápido treponêmico de triagem para sífilis e, caso venha reagente, solicita VDRL confirmatório com titulação para fechar o diagnóstico de sífilis ativa. As estratégias diagnósticas empregadas pelo intensivista e pelo ginecologista são denominadas, respectivamente:</p>
<p>A) Testes em série e testes em paralelo; a primeira aumenta a especificidade e a segunda aumenta a sensibilidade.<br>
B) Testes em paralelo e testes em série; a primeira estratégia aumenta a sensibilidade global e o VPN, enquanto a segunda aumenta a especificidade global e o VPP.<br>
C) Testes redundantes e testes dicotômicos; ambas reduzem a acurácia diagnóstica global.<br>
D) Testes pareados e testes independentes; a prevalência é alterada pela ordem dos exames.<br>
E) Testes em paralelo em ambos os casos clínicos.</p>
<p><strong>Gabarito Oficial: Alternativa B.</strong></p>
<p><strong>Comentário Detalhado:</strong><br>
• <strong>Alternativa B (Correta):</strong>
1. <strong>Intensivista:</strong> Realizou <strong>Testes em Paralelo</strong> (simultâneos, positivo se $T_1$ OU $T_2$). Essa abordagem <strong>aumenta expressivamente a sensibilidade e o valor preditivo negativo</strong>, garantindo que nenhum caso letal de meningococcemia escape sem tratamento nas primeiras horas de UTI;<br>
2. <strong>Ginecologista:</strong> Realizou <strong>Testes em Série</strong> (sequenciais, o segundo teste só é feito se o primeiro der positivo, positivo apenas se $T_1$ E $T_2$). Essa abordagem <strong>aumenta a especificidade global e o valor preditivo positivo</strong>, eliminando falsos-positivos e garantindo que gestantes só recebam penicilina benzatínica se houver confirmação laboratorial sólida. Alternativa B impecável.</p>

<h4>Questão 3: UNIFESP — Propriedades Intrínsecas vs Extrínsecas</h4>
<p><strong>Enunciado:</strong> Durante discussão clínica sobre exames laboratoriais na residência médica, o preceptor pergunta aos residentes quais parâmetros diagnósticos sofrem alteração direta quando um mesmo kit laboratorial é aplicado em populações que apresentam prevalências distintas da doença estudada. A resposta teoricamente correta é:</p>
<p>A) Apenas a sensibilidade e a especificidade sofrem alteração com a prevalência.<br>
B) A sensibilidade, a especificidade e os valores preditivos são todos alterados pela prevalência.<br>
C) A sensibilidade e a especificidade permanecem constantes (propriedades intrínsecas), enquanto o Valor Preditivo Positivo (VPP) e o Valor Preditivo Negativo (VPN) variam diretamente em função da prevalência da doença na população testada.<br>
D) Apenas a acurácia global e a razão de verossimilhança positiva são modificadas.<br>
E) Nenhum parâmetro se altera, pois exames laboratoriais dependem unicamente da calibração bioquímica do aparelho.</p>
<p><strong>Gabarito Oficial: Alternativa C.</strong></p>
<p><strong>Comentário Detalhado:</strong><br>
• <strong>Alternativa C (Correta):</strong> Sensibilidade e Especificidade são <strong>propriedades biológicas intrínsecas do teste</strong> (calculadas na vertical da tabela entre os verdadeiros doentes e os verdadeiros sadios); em condições ideais de amostragem, são independentes da frequência da doença na comunidade. Em contrapartida, os <strong>Valores Preditivos (VPP e VPN)</strong> são propriedades extrínsecas que dependem visceralmente da probabilidade pré-teste (prevalência) da população avaliada. Alternativa C perfeita.</p>
`
};
