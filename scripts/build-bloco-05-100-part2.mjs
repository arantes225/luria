// Bloco 5 - Aula 100: Testes Diagnósticos e Curvas ROC (Parte 2: Seções 6 a 10)

export const sec6 = {
  id: 'razoes-de-verossimilhanca-multiniveis-e-continuas',
  title: '6. Razões de Verossimilhança Multiníveis (Intervalares) e Contínuas na Curva ROC',
  body_html: `
<h3>Superando a Dicotomização Simplista: Por que Dividir o Exame em Faixas Estratificadas?</h3>
<p>Na prática clínica cotidiana, reduzir um exame quantitativo contínuo a uma resposta binária simples ("positivo" ou "negativo") destrói grande parte da riqueza informativa gerada pelo laboratório. Considere, por exemplo, um paciente que realiza uma dosagem sérica de ferritina para avaliação de anemia microcítica: um valor de 5 ng/mL tem um significado biológico radicalmente mais impactante para anemia ferropriva do que um valor de 28 ng/mL, embora ambos possam estar genericamente classificados abaixo de um ponto de corte arbitrário de 30 ng/mL.</p>

<p>Para explorar plenamente o potencial de exames quantitativos contínuos sem perdas estatísticas, a epidemiologia clínica utiliza as <strong>Razões de Verossimilhança Multiníveis (Intervalares ou por Estratos)</strong> e as <strong>Razões de Verossimilhança Contínuas</strong> derivadas diretamente da inclinação instantânea da curva ROC.</p>

<h3>Cálculo das Razões de Verossimilhança Multiníveis (Intervalares)</h3>
<p>Em vez de um único ponto de corte, dividimos a faixa de resultados do teste contínuo em múltiplos intervalos discretos ordenados (por exemplo, faixas de dosagem de troponina ou peptídeo natriurético). Para cada intervalo numérico específico $k$, a Razão de Verossimilhança desse intervalo ($\text{RV}_k$) é calculada dividindo-se a proporção de doentes que caem naquela faixa pela proporção de indivíduos sadios que caem na mesmíssima faixa:</p>

<div class="formula-box">
  $$\\text{RV}_k = \\frac{\\text{Proporção de Doentes no Intervalo } k}{\\text{Proporção de Hígidos no Intervalo } k} = \\frac{\\frac{\\text{Doentes no Intervalo } k}{\\text{Total de Doentes}}}{\\frac{\\text{Hígidos no Intervalo } k}{\\text{Total de Hígidos}}}$$
</div>

<p><strong>Exemplo Prático: Estratificação da Ferritina Sérica no Diagnóstico de Anemia Ferropriva em Adultos:</strong></p>
<table class="book-table">
  <thead>
    <tr>
      <th>Intervalo de Ferritina Sérica</th>
      <th>Proporção de Doentes Reais (Deficiência de Ferro)</th>
      <th>Proporção de Pacientes Hígidos (Outras Causas)</th>
      <th>Razão de Verossimilhança do Intervalo (RV)</th>
      <th>Impacto Clínico na Probabilidade Pós-Teste</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>$&lt; 15\\text{ ng/mL}$</strong></td>
      <td>$60\\%$ ($0,60$)</td>
      <td>$1,2\\%$ ($0,012$)</td>
      <td><strong>$\\text{RV} = \\frac{0,60}{0,012} = 50,0$</strong></td>
      <td>Confirmação praticamente inequívoca de ferropenia grave (Odds pós-teste multiplicado por 50!).</td>
    </tr>
    <tr>
      <td><strong>$15 - 45\\text{ ng/mL}$</strong></td>
      <td>$25\\%$ ($0,25$)</td>
      <td>$8,0\\%$ ($0,08$)</td>
      <td><strong>$\\text{RV} = \\frac{0,25}{0,08} = 3,1$</strong></td>
      <td>Elevação moderada na probabilidade clínica; compatível com ferropenia em fase inicial.</td>
    </tr>
    <tr>
      <td><strong>$46 - 100\\text{ ng/mL}$</strong></td>
      <td>$10\\%$ ($0,10$)</td>
      <td>$35,0\\%$ ($0,35$)</td>
      <td><strong>$\\text{RV} = \\frac{0,10}{0,35} = 0,29$</strong></td>
      <td>Redução expressiva na probabilidade de carência marcial; buscar anemia de doença crônica.</td>
    </tr>
    <tr>
      <td><strong>$&gt; 100\\text{ ng/mL}$</strong></td>
      <td>$5\\%$ ($0,05$)</td>
      <td>$55,8\\%$ ($0,558$)</td>
      <td><strong>$\\text{RV} = \\frac{0,05}{0,558} = 0,09$</strong></td>
      <td>Descarta com absoluta segurança a hipótese de anemia ferropriva descompensada.</td>
    </tr>
  </tbody>
</table>

<h3>A Derivada Geométrica da Curva ROC: A Razão de Verossimilhança Contínua Instantânea</h3>
<p>No formalismo matemático contínuo, a Razão de Verossimilhança em um ponto exato do exame nada mais é do que a <strong>derivada da curva ROC naquele ponto (a inclinação da reta tangente à curva ROC)</strong>:</p>

<div class="formula-box">
  $$\\text{RV}(c) = \\frac{d(\\text{Sensibilidade})}{d(1 - \\text{Especificidade})} = \\text{Inclinação da Tangente à Curva ROC}$$
</div>
<p><em>Conclusão Fascinante:</em> No início da curva ROC (próximo à origem, onde os valores do teste são altíssimos e extremamente anormais), a tangente é quase vertical, o que significa que a Razão de Verossimilhança tende ao infinito. À medida que caminhamos para a direita na curva ROC, a inclinação vai decrescendo progressivamente até tornar-se horizontal no canto superior direito, onde a inclinação é nula e a RV tende a zero.</p>
`
};

export const sec7 = {
  id: 'construcao-passo-a-passo-de-uma-curva-roc-real',
  title: '7. Passo a Passo da Construção Manual de uma Curva ROC a partir de uma Coorte Clínica',
  body_html: `
<h3>Metodologia Prática de Construção Cartesiana</h3>
<p>Para fixar de forma indelével a lógica operacional das curvas ROC, acompanharemos a construção passo a passo a partir dos dados de uma coorte real de 10 pacientes admitidos em unidade de dor torácica com suspeita de infarto agudo do miocárdio, nos quais foi dosado um novo biomarcador cardíaco quantitativo (em ng/mL) e realizada cineangiocoronariografia invasiva como padrão-ouro definitivo (5 doentes confirmados e 5 sadios):</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Paciente</th>
      <th>Resultado do Biomarcador ($\text{ng/mL}$)</th>
      <th>Padrão-Ouro (CATE)</th>
      <th>Classificação Real</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>P1</td><td>95</td><td>Positivo</td><td>Doente ($D^+$)</td></tr>
    <tr><td>P2</td><td>82</td><td>Positivo</td><td>Doente ($D^+$)</td></tr>
    <tr><td>P3</td><td>68</td><td>Positivo</td><td>Doente ($D^+$)</td></tr>
    <tr><td>P4</td><td>55</td><td>Negativo</td><td>Sadio ($D^-$)</td></tr>
    <tr><td>P5</td><td>48</td><td>Positivo</td><td>Doente ($D^+$)</td></tr>
    <tr><td>P6</td><td>40</td><td>Negativo</td><td>Sadio ($D^-$)</td></tr>
    <tr><td>P7</td><td>35</td><td>Positivo</td><td>Doente ($D^+$)</td></tr>
    <tr><td>P8</td><td>28</td><td>Negativo</td><td>Sadio ($D^-$)</td></tr>
    <tr><td>P9</td><td>18</td><td>Negativo</td><td>Sadio ($D^-$)</td></tr>
    <tr><td>P10</td><td>10</td><td>Negativo</td><td>Sadio ($D^-$)</td></tr>
  </tbody>
</table>

<h3>Cálculo de Sensibilidade e 1-Especificidade para Diferentes Pontos de Corte</h3>
<table class="book-table">
  <thead>
    <tr>
      <th>Ponto de Corte Selecionado</th>
      <th>VP ($a$)</th>
      <th>FP ($b$)</th>
      <th>FN ($c$)</th>
      <th>VN ($d$)</th>
      <th>Sensibilidade ($Y$)</th>
      <th>$1 - \\text{Especificidade}$ ($X$)</th>
      <th>Índice de Youden ($J$)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>$&gt; 90$</strong></td>
      <td>1</td><td>0</td><td>4</td><td>5</td>
      <td>$1/5 = 0,20$</td>
      <td>$0/5 = 0,00$</td>
      <td>$0,20 + 1,00 - 1 = 0,20$</td>
    </tr>
    <tr>
      <td><strong>$&gt; 70$</strong></td>
      <td>2</td><td>0</td><td>3</td><td>5</td>
      <td>$2/5 = 0,40$</td>
      <td>$0/5 = 0,00$</td>
      <td>$0,40 + 1,00 - 1 = 0,40$</td>
    </tr>
    <tr>
      <td><strong>$&gt; 60$</strong></td>
      <td>3</td><td>0</td><td>2</td><td>5</td>
      <td>$3/5 = 0,60$</td>
      <td>$0/5 = 0,00$</td>
      <td>$0,60 + 1,00 - 1 = 0,60$</td>
    </tr>
    <tr>
      <td><strong>$&gt; 50$</strong></td>
      <td>3</td><td>1</td><td>2</td><td>4</td>
      <td>$3/5 = 0,60$</td>
      <td>$1/5 = 0,20$</td>
      <td>$0,60 + 0,80 - 1 = 0,40$</td>
    </tr>
    <tr>
      <td><strong>$&gt; 45$</strong> (Ponto Ótimo de Youden!)</td>
      <td>4</td><td>1</td><td>1</td><td>4</td>
      <td><strong>$4/5 = 0,80$</strong></td>
      <td><strong>$1/5 = 0,20$</strong></td>
      <td><strong>$0,80 + 0,80 - 1 = 0,60$</strong></td>
    </tr>
    <tr>
      <td><strong>$&gt; 30$</strong></td>
      <td>5</td><td>2</td><td>0</td><td>3</td>
      <td>$5/5 = 1,00$</td>
      <td>$2/5 = 0,40$</td>
      <td>$1,00 + 0,60 - 1 = 0,60$</td>
    </tr>
    <tr>
      <td><strong>$&gt; 5$</strong></td>
      <td>5</td><td>5</td><td>0</td><td>0</td>
      <td>$5/5 = 1,00$</td>
      <td>$5/5 = 1,00$</td>
      <td>$1,00 + 0,00 - 1 = 0,00$</td>
    </tr>
  </tbody>
</table>

<p><strong>Cálculo Numérico da AUC pelo Método dos Trapézios:</strong> Integrando a área sob esses segmentos retos conectados sequencialmente, a área total sob a curva (AUC) calculada para este biomarcador é de <strong>0,88</strong> (indicando excelente acurácia discriminatória na separação de infarto agudo do miocárdio).</p>
`
};

export const sec8 = {
  id: 'casos-clinicos-estruturados-e-aplicacao-pratica-de-curvas-roc',
  title: '8. Casos Clínicos Estruturados: Aplicação de Curvas ROC na Tomada de Decisão Médica',
  body_html: `
<h3>Caso Clínico 1: Dilema de Ponto de Corte de Troponina Ultrassensível na Sala de Emergência</h3>
<p><strong>Identificação:</strong> Homem de 64 anos, portador de insuficiência renal crônica estágio 3b (taxa de filtração glomerular estimada de 38 mL/min/1,73m²), admitido com dor torácica retroesternal atípica em aperto com 3 horas de evolução. O ECG inicial demonstra apenas alterações inespecíficas de repolarização ventricular sem supradesnivelamento de segmento ST.</p>

<p><strong>Dilema Clínico e Análise ROC:</strong></p>
<ul>
  <li>Em pacientes com disfunção renal crônica, os níveis basais de troponina ultrassensível são frequentemente cronicamente elevados acima do percentil 99 clássico da população sadia jovem (14 ng/L para troponina T), decorrente de redução do clearance renal e sobrecarga miocárdica crônica subclínica;</li>
  <li>Se o médico aplicar cegamente o ponto de corte clássico de 14 ng/L, a <strong>especificidade do teste cai de 95% para medíocres 45%</strong>, provocando uma enxurrada de falsos-positivos e cateterismos cardíacos desnecessários;</li>
  <li>A análise por curva ROC específica para a subpopulação de renais crônicos demonstra que a <strong>AUC permanece excelente (AUC = 0,89)</strong>, porém o <strong>Ponto de Corte Ótimo pelo Índice de Youden desloca-se para a direita: 35 ng/L</strong>;</li>
  <li>Além disso, o protocolo moderno preconiza a análise da <strong>cinética delta ($\Delta$) em 1 hora ou 2 horas</strong>: uma ascensão dinâmica absoluta superior a 7 ng/L na curva ROC apresenta sensibilidade de 94% e especificidade de 96% para infarto tipo 1, permitindo fechar o diagnóstico com maestria e afastar a elevação crônica isolada.</li>
</ul>

<h3>Caso Clínico 2: Avaliação da Curva ROC do Peptídeo Natriurético (BNP) na Dispneia Aguda</h3>
<p><strong>Identificação:</strong> Mulher de 73 anos, com história prévia de DPOC e insuficiência cardíaca de fração de ejeção preservada (ICFEP), comparece à sala de emergência com piora acentuada da dispneia aos esforços, tosse com expectoração esbranquiçada e edema discreto de membros inferiores há 4 dias. À ausculta respiratória, há sibilos difusos e crepitações tele-inspiratórias em bases pulmonares.</p>

<p><strong>Interpretação Baseada na Curva ROC de BNP / NT-proBNP:</strong></p>
<ol>
  <li>O estudo clássico <em>Breathing Not Properly</em> estabeleceu a curva ROC do BNP plasmático para discriminar dispneia cardiogênica de dispneia de origem pulmonar/obstrutiva, revelando uma extraordinária <strong>AUC de 0,91</strong>;</li>
  <li><strong>Ponto de Corte Inferior de Exclusão (Rule-Out):</strong> BNP &lt; 100 pg/mL (ou NT-proBNP &lt; 300 pg/mL) apresenta <strong>Sensibilidade de 98% com RVN de 0,05</strong>. Se o exame da paciente fosse inferior a esse limiar, a insuficiência cardíaca estaria definitivamente descartada, confirmando exacerbação isolada de DPOC;</li>
  <li><strong>Ponto de Corte Superior de Confirmação (Rule-In):</strong> BNP &gt; 400 pg/mL (ou NT-proBNP ajustado para idade &gt; 1.800 pg/mL para pacientes acima de 75 anos) apresenta <strong>Especificidade de 95% com RVP de 12</strong>;</li>
  <li>No caso da paciente, o laudo revelou BNP de 850 pg/mL. O ponto de corte situa-se confortavelmente na zona confirmatória de alta especificidade, confirmando descompensação aguda de insuficiência cardíaca congestiva como o gatilho primário da dispneia e orientando a imediata administração intravenosa de furosemida em bólus e nitrato tópico/endovenoso.</li>
</ol>
`
};

export const sec9 = {
  id: 'bateria-de-questoes-comentadas-curvas-roc',
  title: '9. Bateria de Questões Comentadas do ENAMED e Grandes Concursos Médicos de Residência',
  body_html: `
<h3>Questões com Discussão Profunda de Gabarito e Distratores</h3>

<h4>Questão 1: ENARE / ENAMED — Interpretação dos Eixos da Curva ROC</h4>
<p><strong>Enunciado:</strong> Um pesquisador desenvolveu um novo algoritmo de inteligência artificial para detecção de estenose coronariana significativa a partir de eletrocardiogramas convencionais de 12 derivações. Para apresentar o desempenho diagnóstico do algoritmo em um congresso internacional de cardiologia, ele elaborou uma Curva ROC. No gráfico gerado, o eixo das ordenadas (eixo vertical) e o eixo das abscissas (eixo horizontal) representam, respectivamente:</p>
<p>A) Acurácia global e taxa de falsos-positivos.<br>
B) Sensibilidade e $1 - \\text{Especificidade}$ (ou Taxa de Falsos-Positivos).<br>
C) Valor preditivo positivo e valor preditivo negativo.<br>
D) Razão de verossimilhança positiva e razão de verossimilhança negativa.<br>
E) Sensibilidade e Especificidade.</p>
<p><strong>Gabarito Oficial: Alternativa B.</strong></p>
<p><strong>Comentário Detalhado:</strong><br>
• <strong>Alternativa B (Correta):</strong> Na convenção universal e estrita da análise ROC:
1. O <strong>Eixo Y (Vertical / Ordenadas)</strong> plota a <strong>Sensibilidade</strong> (Taxa de Verdadeiros-Positivos - TPR);<br>
2. O <strong>Eixo X (Horizontal / Abscissas)</strong> plota $1 - \\text{Especificidade}$ (Taxa de Falsos-Positivos - FPR).<br>
<em>Pegadinha Clássica de Banca:</em> A alternativa E tenta induzir o candidato ao erro afirmando "Sensibilidade e Especificidade". Se o eixo X fosse a especificidade simples, a curva correria no sentido oposto (da direita para a esquerda). O eixo X é obrigatoriamente o complemento da especificidade ($1 - \\text{Especificidade}$). A alternativa B é a única correta.</p>

<h4>Questão 2: USP-SP — Comparação de Testes Diagnósticos pela AUC</h4>
<p><strong>Enunciado:</strong> Três novos biomarcadores séricos (Marcador Alfa, Marcador Beta e Marcador Gama) foram avaliados em um estudo multicêntrico para o diagnóstico precoce de apendicite aguda complicada em crianças. A análise estatística revelou os seguintes resultados de Área Sob a Curva ROC (AUC): Marcador Alfa = 0,92 (IC 95%: 0,88 - 0,96); Marcador Beta = 0,74 (IC 95%: 0,69 - 0,79); e Marcador Gama = 0,51 (IC 95%: 0,46 - 0,56). Diante desses dados bioestatísticos, é correto afirmar que:</p>
<p>A) O Marcador Gama possui excelente poder de discriminação diagnóstica.<br>
B) O Marcador Beta é superior ao Marcador Alfa, pois apresenta maior especificidade em todos os pontos de corte.<br>
C) O Marcador Alfa possui acurácia discriminatória excelente e globalmente superior aos demais marcadores avaliados na coorte.<br>
D) O Marcador Gama é clinicamente útil, pois seu intervalo de confiança inclui o valor 0,50.<br>
E) Não é possível comparar os biomarcadores apenas pela AUC sem conhecer a prevalência da doença.</p>
<p><strong>Gabarito Oficial: Alternativa C.</strong></p>
<p><strong>Comentário Detalhado:</strong><br>
• <strong>Alternativa C (Correta):</strong> A Área Sob a Curva ROC (AUC) resume a capacidade discriminatória global do teste de forma totalmente independente da prevalência populacional. Uma AUC de 0,92 confere ao Marcador Alfa uma classificação excelente (praticamente ímpar no diagnóstico de abdome agudo infantil). O Marcador Beta tem discriminação apenas moderada/aceitável (0,74). Já o Marcador Gama, com AUC de 0,51 e cujo intervalo de confiança de 95% cruza a linha de 0,50, é estatisticamente inútil (equivalente ao lançamento aleatório de uma moeda). A alternativa C é a única incontestável.</p>

<h4>Questão 3: UNIFESP — O Ponto de Corte e o Índice de Youden</h4>
<p><strong>Enunciado:</strong> Durante a análise da curva ROC de um biomarcador para sepse em pacientes internados na UTI, o estatístico do hospital informa à equipe clínica que o ponto de corte de 2,0 ng/mL foi selecionado utilizando o Índice $J$ de Youden. O preceptor da terapia intensiva solicita ao residente que explique o significado desse critério de seleção. A resposta correta do residente deve ser:</p>
<p>A) O ponto de corte selecionado garante sensibilidade de 100%, descartando qualquer falso-negativo.<br>
B) O ponto de corte de Youden é aquele que maximiza conjuntamente a Sensibilidade e a Especificidade do método, correspondendo ao ponto de maior distância vertical em relação à linha diagonal de chance pura.<br>
C) O critério de Youden foi desenhado exclusivamente para priorizar a especificidade em detrimento da sensibilidade.<br>
D) O índice de Youden depende diretamente da prevalência da sepse na UTI naquele momento.<br>
E) O índice de Youden é calculado dividindo-se o valor preditivo positivo pelo valor preditivo negativo.</p>
<p><strong>Gabarito Oficial: Alternativa B.</strong></p>
<p><strong>Comentário Detalhado:</strong><br>
• <strong>Alternativa B (Correta):</strong> O Índice de Youden é definido pela equação algébrica $J = \\text{Sensibilidade} + \\text{Especificidade} - 1$. Seu objetivo bioestatístico primordial é identificar o limiar de corte que <strong>maximiza simultaneamente a taxa de verdadeiros-positivos e a taxa de verdadeiros-negativos</strong>, sem atribuir peso desigual a nenhum dos tipos de erro. Geometricamente, é o ponto de maior afastamento vertical da reta diagonal $Y = X$. Alternativa B perfeita.</p>
`
};

export const sec10 = {
  id: 'bateria-de-questoes-comentadas-avancadas-roc',
  title: '10. Bateria Complementar de Questões de Alto Nível de Dificuldade: Calibração e NRI',
  body_html: `
<h3>Questões com Foco em Erros Conceituais Frequentes e Estatística Avançada</h3>

<h4>Questão 4: UNICAMP — Discriminação versus Calibração</h4>
<p><strong>Enunciado:</strong> Um grupo de pesquisadores da epidemiologia clínica criou um modelo preditivo para estimar o risco de mortalidade hospitalar em 30 dias após cirurgia de revascularização miocárdica. Ao testar o modelo em um hospital universitário externo, os autores observaram que o modelo apresentou uma Estatística C (AUC-ROC) de 0,86 (indicando excelente capacidade de discriminar quem faleceu de quem sobreviveu). No entanto, o teste de calibração de Hosmer-Lemeshow revelou um valor de $p &lt; 0,001$, e a análise do gráfico de calibração mostrou que a taxa real de óbitos observada nos pacientes foi sistematicamente o dobro da probabilidade predita pelo modelo em todos os decis de risco. A interpretação metodológica correta desse achado é:</p>
<p>A) O modelo possui alta discriminação, porém apresenta má calibração (subestima sistematicamente a mortalidade real observada).<br>
B) O modelo não discrimina os pacientes, devendo ser sumariamente descartado.<br>
C) A discriminação e a calibração são métricas equivalentes; portanto, o valor de $p &lt; 0,001$ anula a AUC de 0,86.<br>
D) O modelo superestima a taxa de mortalidade nos pacientes cirúrgicos.<br>
E) A Estatística C não pode ser utilizada para desfechos de mortalidade hospitalar.</p>
<p><strong>Gabarito Oficial: Alternativa A.</strong></p>
<p><strong>Comentário Detalhado:</strong><br>
• <strong>Alternativa A (Correta):</strong> Esta questão explora com perfeição a independência conceitual entre discriminação e calibração:
1. <strong>Discriminação ($C = 0,86$):</strong> O modelo ordena com grande precisão os pacientes (os que morreram tinham escores mais altos que os que viveram);
2. <strong>Calibração ($p &lt; 0,001$ no teste de Hosmer-Lemeshow com óbitos observados dobrando os preditos):</strong> As probabilidades numéricas absolutas fornecidas pelo modelo estão totalmente desafinadas com a realidade daquele hospital (o modelo dizia 5% de risco, mas morriam 10%; dizia 15%, mas morriam 30%). O modelo subestima sistematicamente a mortalidade real. Ele precisa ser <em>recalibrado</em> antes de ser adotado na prática assistencial daquela instituição.</p>

<h4>Questão 5: FMUSP — Efeito da Dicotomização e Reclassificação Líquida (NRI)</h4>
<p><strong>Enunciado:</strong> Um novo escore baseado em biomarcadores ultrassensíveis foi proposto para reclassificar o risco de acidente vascular cerebral em pacientes com fibrilação atrial não valvar previamente estratificados pelo escore CHA2DS2-VASc. Os autores relataram um Net Reclassification Improvement (NRI) global de 0,22 ($p &lt; 0,01$). O significado bioestatístico desse resultado é que:</p>
<p>A) A sensibilidade do escore tradicional foi reduzida em 22%.<br>
B) Houve uma melhoria líquida de 22% na correta reclassificação dos pacientes nas categorias adequadas de risco para ocorrência ou não de AVC com o novo escore.<br>
C) A área sob a curva ROC subiu obrigatoriamente de 0,78 para 1,00.<br>
D) O novo escore elimina a necessidade de anticoagulação oral em 22% dos pacientes.<br>
E) A especificidade do método decaiu em 22% em relação ao padrão-ouro.</p>
<p><strong>Gabarito Oficial: Alternativa B.</strong></p>
<p><strong>Comentário Detalhado:</strong><br>
• <strong>Alternativa B (Correta):</strong> O NRI (Net Reclassification Improvement) mede precisamente a proporção líquida de indivíduos que são movidos para faixas de risco mais condizentes com seus desfechos reais (pacientes que tiveram AVC foram promovidos para estratos de maior risco terapêutico e pacientes que não tiveram AVC foram rebaixados para estratos de menor risco), subtraídos dos erros de reclassificação. Um NRI de 0,22 indica que a adição do novo escore melhorou de forma líquida em 22% a precisão de alocação de risco dos indivíduos da coorte.</p>
`
};
