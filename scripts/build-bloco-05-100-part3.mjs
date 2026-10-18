// Bloco 5 - Aula 100: Testes Diagnósticos e Curvas ROC (Parte 3: Seções 11 a 15)

export const sec11 = {
  id: 'curvas-pr-precision-recall-para-desfechos-raros',
  title: '11. Curvas Precision-Recall (PRC) versus Curvas ROC em Desfechos Raros e Desbalanceamento Extremo',
  body_html: `
<h3>A Ilusão da Curva ROC em Doenças de Incidência Ínfima</h3>
<p>Embora a Curva ROC seja aclamada universalmente pela independência de seus eixos em relação à prevalência da doença (já que Sensibilidade e 1-Especificidade são calculadas nas colunas verticais isoladas de doentes e hígidos), essa mesmíssima propriedade matemática pode se tornar uma armadilha traiçoeira quando lidamos com <strong>bancos de dados massivamente desbalanceados</strong> (por exemplo, na inteligência artificial para detecção de eventos adversos raros hospitalares, rastreamento de doenças genéticas raras com prevalência de 1 em 10.000, ou identificação de choque séptico fulminante em prontuários eletrônicos).</p>

<p>Considere uma população de 100.000 indivíduos contendo apenas 100 doentes reais ($D^+ = 100$) e 99.900 indivíduos saudáveis ($D^- = 99.900$):</p>
<ul>
  <li>Se um algoritmo classificar erroneamente 999 indivíduos sadios como doentes (falsos-positivos), a Taxa de Falsos-Positivos ($1 - \\text{Especificidade}$) será calculada como $\\frac{999}{99.900} = 0,01 = 1\\%$;</li>
  <li>No gráfico ROC, um ponto com Sensibilidade de 90% e $1 - \\text{Especificidade}$ de 1% aparenta estar <strong>praticamente encostado no canto superior esquerdo perfeito $(0, 1)$</strong>, gerando uma falsa sensação de desempenho imbatível (AUC &gt; 0,98);</li>
  <li>No entanto, ao analisar o <strong>Valor Preditivo Positivo (Precisão)</strong> real na beira do leito:
    $$\\text{Precisão (VPP)} = \\frac{VP}{VP + FP} = \\frac{90}{90 + 999} = \\frac{90}{1.089} \\approx 0,0826 = 8,26\\%$$
  </li>
  <li><strong>O Desastre Prático:</strong> Mais de 91,7% de todos os alertas gerados pelo sistema serão alarmes falsos! A equipe clínica sofrerá de <em>fadiga de alarmes</em> e passará a ignorar o sistema.</li>
</ul>

<h3>A Solução Moderna: A Curva Precision-Recall (PRC)</h3>
<p>Em cenários de extremo desbalanceamento amostral, a literatura internacional de ciência de dados biomédicos e epidemiologia exige a apresentação da <strong>Curva Precision-Recall (PRC)</strong>:</p>
<table class="book-table">
  <thead>
    <tr>
      <th>Eixo da Curva PRC</th>
      <th>Conceito Epidemiológico Correspondente</th>
      <th>Fórmula Matemática</th>
      <th>Comportamento no Desbalanceamento</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Eixo Y (Ordenadas)</strong></td>
      <td><strong>Precisão (Precision)</strong><br>Equivale exatamente ao <strong>Valor Preditivo Positivo (VPP)</strong>.</td>
      <td>$$\\text{Precisão} = \\frac{VP}{VP + FP}$$</td>
      <td>Desaba imediatamente se o teste gerar um número excessivo de falsos-positivos na população hígida numericamente dominante.</td>
    </tr>
    <tr>
      <td><strong>Eixo X (Abscissas)</strong></td>
      <td><strong>Revocação (Recall)</strong><br>Equivale exatamente à <strong>Sensibilidade</strong>.</td>
      <td>$$\\text{Revocação} = \\frac{VP}{VP + FN}$$</td>
      <td>Avalia a proporção de verdadeiros doentes capturados pelo limiar do modelo.</td>
    </tr>
    <tr>
      <td><strong>Linha de Base do Acaso</strong></td>
      <td>Linha horizontal em $Y = \\text{Prevalência da Doença}$.</td>
      <td>$Y = P$</td>
      <td>Em doenças raras, a linha de base situa-se próxima de zero (ex: $Y = 0,001$). A Área Sob a Curva PR (AUPRC) reflete a real capacidade do modelo de superar a prevalência basal sem inundar o hospital com falsos-positivos.</td>
    </tr>
  </tbody>
</table>
`
};

export const sec12 = {
  id: 'analise-de-subgrupos-e-heterogeneidade-em-curvas-roc',
  title: '12. Heterogeneidade Clínica, Efeito Espectro e Análise de Subgrupos na Curva ROC',
  body_html: `
<h3>A Ilusão de uma Curva ROC Universal: O Efeito Espectro em Detalhes</h3>
<p>É uma falácia comum acreditar que a Curva ROC de um exame é uma propriedade física fixa e imutável do teste (como a massa molecular de uma proteína). O desempenho da curva ROC depende diretamente da <strong>composição da população em que o estudo foi conduzido</strong>. A alteração na gravidade clínica dos doentes ou na prevalência de condições comórbidas nos indivíduos sadios altera a forma e a área da curva ROC — fenômeno denominado <strong>Viés ou Efeito de Espectro</strong>:</p>

<ol>
  <li><strong>Espectro dos Doentes:</strong> Se o grupo de doentes for composto predominantemente por casos exuberantes, avançados e com falência orgânica franca (por exemplo, insuficiência cardíaca classe funcional IV de NYHA com fração de ejeção de 15%), o teste diagnóstico terá valores laboratoriais estratosféricos, gerando sensibilidade elevadíssima em quase todos os pontos de corte e inflando artificialmente a AUC. Por outro lado, se a coorte incluir doentes oligossintomáticos ou em estágios subclínicos precoces, a sensibilidade cai e a AUC diminui de forma realista;</li>
  <li><strong>Espectro dos Hígidos (Controles):</strong> Se o grupo de controles for composto por doadores de sangue jovens sem qualquer comorbidade, o teste apresentará especificidade próxima de 100%. Entretanto, se o grupo controle for composto por pacientes que procuram o pronto-socorro com <em>diagnósticos diferenciais reais</em> (por exemplo, avaliar troponina comparando infarto com pericardite, miocardite, taquiarritmias e insuficiência renal), a especificidade é severamente desafiada, revelando a verdadeira acurácia do método na trincheira hospitalar.</li>
</ol>

<h3>Análise Estratificada Mandatória por Subgrupos Clínicos</h3>
<p>Em conformidade com as diretrizes metodológicas do protocolo STARD, todo estudo de validação diagnóstica de excelência deve reportar a Curva ROC e a AUC estratificadas pelos principais modificadores de efeito biológico:</p>
<ul>
  <li><strong>Faixa Etária:</strong> Marcadores renais, cardíacos e inflamatórios alteram sua distribuição fisiológica com o envelhecimento vascular e a perda progressiva de néfrons;</li>
  <li><strong>Sexo Biológico:</strong> Diferenças de massa muscular (creatinina), volume plasmático e limiares de troponina (a curva ROC de troponina ultrassensível exige pontos de corte específicos para o sexo feminino, sob pena de subdiagnóstico sistemático de infarto em mulheres);</li>
  <li><strong>Função Renal Basal:</strong> Pacientes com taxa de filtração glomerular reduzida acumulam peptídeos e metabólitos por retenção urinária;</li>
  <li><strong>Tempo de Evolução dos Sintomas:</strong> Um exame coletado nas primeiras 2 horas do início da dor torácica possui curva ROC completamente diferente do mesmo exame coletado com 12 horas de evolução.</li>
</ul>
`
};

export const sec13 = {
  id: 'curva-roc-para-escores-clinicos-e-inteligencia-artificial',
  title: '13. Curvas ROC em Escores de Gravidade de Terapia Intensiva e Algoritmos de Inteligência Artificial',
  body_html: `
<h3>Validação Discriminatória dos Grandes Escores de UTI</h3>
<p>Na Medicina Intensiva e nas Emergências Médicas, as Curvas ROC são rotineiramente empregadas para validar o poder preditivo de escores multiparamétricos de gravidade clínica e prognóstico de mortalidade:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Escore Clínico Validado</th>
      <th>População Alvo e Cenário de Uso</th>
      <th>AUC-ROC Típica na Literatura</th>
      <th>Desfecho Clínico Primário Avaliado</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>SOFA (Sequential Organ Failure Assessment)</strong></td>
      <td>Pacientes com suspeita de sepse em leitos de UTI (Consenso Sepsis-3).</td>
      <td><strong>$0,84 - 0,88$</strong></td>
      <td>Mortalidade hospitalar intra-UTI e necessidade de suporte vasoativo ou ventilatório.</td>
    </tr>
    <tr>
      <td><strong>qSOFA (Quick SOFA)</strong></td>
      <td>Triagem rápida à beira do leito fora da UTI (Enfermaria e UPA).</td>
      <td><strong>$0,70 - 0,76$</strong></td>
      <td>Predição de deterioração clínica e transferência para cuidados intensivos.</td>
    </tr>
    <tr>
      <td><strong>APACHE II / APACHE IV</strong></td>
      <td>Primeiras 24 horas de internação em unidade de terapia intensiva geral.</td>
      <td><strong>$0,85 - 0,90$</strong></td>
      <td>Mortalidade hospitalar ajustada por comorbidades e idade avançada.</td>
    </tr>
    <tr>
      <td><strong>Escore de Wells / Genebra</strong></td>
      <td>Pronto-socorro diante de suspeita clínica de embolia pulmonar.</td>
      <td><strong>$0,75 - 0,82$</strong></td>
      <td>Estratificação da probabilidade pré-teste para indicação de D-dímero ou Angio-TC.</td>
    </tr>
    <tr>
      <td><strong>Escore HEART</strong></td>
      <td>Unidade de dor torácica para suspeita de síndrome coronariana aguda.</td>
      <td><strong>$0,88 - 0,92$</strong></td>
      <td>Eventos Cardíacos Adversos Maiores (MACE) em 30 dias a partir da admissão.</td>
    </tr>
  </tbody>
</table>

<h3>Aplicações em Inteligência Artificial e Aprendizado de Máquina (Machine Learning)</h3>
<p>Na era dos grandes modelos de linguagem (LLMs) e redes neurais convolucionais (CNNs) aplicadas ao diagnóstico por imagem (radiografias de tórax, tomografias e dermatoscopia digital de melanomas), a Curva ROC é a métrica regulatória mandatória exigida por agências como a Anvisa e a FDA norte-americana para a concessão de registro de dispositivos médicos baseados em software (SaMD):</p>
<ul>
  <li>O algoritmo deve comprovar que sua AUC-ROC não é estatisticamente inferior à AUC de médicos especialistas humanos (radiologistas ou dermatologistas certificados);</li>
  <li>O desenvolvedor deve explicitar a matriz de confusão associada ao ponto de corte de operação implantado no software comercial, demonstrando que a sensibilidade é prioritária na triagem preliminar de neoplasias malignas ocultas.</li>
</ul>
`
};

export const sec14 = {
  id: 'guia-definitivo-de-equacoes-e-formulario-para-curvas-roc',
  title: '14. Compêndio Algébrico e Formulário Mestre de Bolso sobre Curvas ROC para Concursos',
  body_html: `
<h3>Tabela Mestra de Relações Algébricas e Fórmulas da Análise ROC</h3>
<table class="book-table">
  <thead>
    <tr>
      <th>Parâmetro ou Indicador</th>
      <th>Expressão Algébrica Fundamental</th>
      <th>Interpretação Geométrica / Cartesiana</th>
      <th>Valor de Referência / Padrão-Ouro</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Eixo Y da Curva ROC</strong></td>
      <td>$$Y = \\text{Sensibilidade} = \\frac{VP}{VP + FN}$$</td>
      <td>Taxa de Verdadeiros-Positivos (TPR)</td>
      <td>Varia de 0 a 1 (100%). Ponto ideal no topo ($Y = 1$).</td>
    </tr>
    <tr>
      <td><strong>Eixo X da Curva ROC</strong></td>
      <td>$$X = 1 - \\text{Especificidade} = \\frac{FP}{FP + VN}$$</td>
      <td>Taxa de Falsos-Positivos (FPR)</td>
      <td>Varia de 0 a 1. Ponto ideal na extrema esquerda ($X = 0$).</td>
    </tr>
    <tr>
      <td><strong>Área Sob a Curva (AUC / C-index)</strong></td>
      <td>$$\\text{AUC} = \\int_{0}^{1} \\text{Sensibilidade}(x) \\, dx$$</td>
      <td>Probabilidade de $T(D^+) &gt; T(D^-)$ em pares aleatórios</td>
      <td>$0,50$ = acaso puro; $0,80 - 0,89$ = excelente; $\ge 0,90$ = excepcional.</td>
    </tr>
    <tr>
      <td><strong>Índice $J$ de Youden</strong></td>
      <td>$$J = S + E - 1 = S - (1 - E)$$</td>
      <td>Distância vertical máxima até a reta diagonal de 45°</td>
      <td>Varia de 0 (inútil) a 1 (perfeito). Maximiza a soma de $S + E$.</td>
    </tr>
    <tr>
      <td><strong>Distância Euclidiana $d(0, 1)$</strong></td>
      <td>$$d = \\sqrt{(1 - S)^2 + (1 - E)^2}$$</td>
      <td>Distância vetorial direta ao canto superior esquerdo</td>
      <td>Ponto ótimo de corte é aquele que minimiza a distância $d$.</td>
    </tr>
    <tr>
      <td><strong>Razão de Verossimilhança Contínua</strong></td>
      <td>$$\\text{RV}(c) = \\frac{d(\\text{Sensibilidade})}{d(1 - \\text{Especificidade})}$$</td>
      <td>Inclinação da reta tangente à curva ROC no ponto $c$</td>
      <td>Alta inclinação no início (RV alta); horizontal no final (RV nula).</td>
    </tr>
    <tr>
      <td><strong>Razão de Verossimilhança do Intervalo $k$</strong></td>
      <td>$$\\text{RV}_k = \\frac{\\% \\text{ Doentes no estrato } k}{\\% \\text{ Hígidos no estrato } k}$$</td>
      <td>Estratificação por faixas de valores do exame</td>
      <td>Permite cálculo bayesiano individualizado sem dicotomização.</td>
    </tr>
    <tr>
      <td><strong>Net Benefit (Curva de Decisão DCA)</strong></td>
      <td>$$\\text{NB} = \\frac{VP}{N} - \\left( \\frac{FP}{N} \\times \\frac{p_t}{1 - p_t} \\right)$$</td>
      <td>Ponderação do benefício de tratar pelo custo de tratar falsos-positivos</td>
      <td>Deve superar as estratégias cegas de "tratar todos" ou "tratar ninguém".</td>
    </tr>
  </tbody>
</table>
`
};

export const sec15 = {
  id: 'bateria-de-questoes-comentadas-padrao-enamed-revalida-roc',
  title: '15. Bateria Exaustiva de Questões Comentadas Padrão ENAMED, USP, UNICAMP e Revalida',
  body_html: `
<h3>Questões com Discussão Profunda de Gabarito e Pegadinhas</h3>

<h4>Questão 6: ENAMED — Seleção de Ponto de Corte para Triagem de HIV</h4>
<p><strong>Enunciado:</strong> Um pesquisador desenvolveu uma nova plataforma automatizada de quimioluminescência para detecção de antígeno/anticorpo de HIV em centros de triagem de doadores de sangue e serviços de atendimento a vítimas de violência sexual. O estudo gerou uma curva ROC com AUC de 0,98. A tabela abaixo exibe três pontos de corte preliminares avaliados pelo pesquisador:</p>
<table class="book-table">
  <thead>
    <tr>
      <th>Ponto de Corte Numérico</th>
      <th>Sensibilidade</th>
      <th>Especificidade</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>Ponto de Corte 1 (0,80 S/CO)</td><td>99,9%</td><td>91,0%</td></tr>
    <tr><td>Ponto de Corte 2 (1,00 S/CO - Youden)</td><td>96,5%</td><td>96,5%</td></tr>
    <tr><td>Ponto de Corte 3 (1,50 S/CO)</td><td>88,0%</td><td>99,8%</td></tr>
  </tbody>
</table>
<p>Considerando que o exame será implantado prioritariamente para <strong>triagem universal de bolsas de sangue no Hemocentro Estadual</strong>, o ponto de corte que deve ser formalmente escolhido pelo gestor médico é:</p>
<p>A) Ponto de Corte 3, pois maximiza a especificidade, evitando o descarte indevido de bolsas sadias.<br>
B) Ponto de Corte 2, pois o critério de Youden é a única escolha estatística aceitável em epidemiologia clínica.<br>
C) Ponto de Corte 1, pois em bancos de sangue a sensibilidade deve ser máxima (minimizando falsos-negativos para garantir segurança transfusional absoluta aos receptores), mesmo ao custo de uma menor especificidade inicial.<br>
D) Qualquer um dos três pontos de corte terá a mesma eficiência, uma vez que a AUC é de 0,98.<br>
E) Nenhum dos pontos de corte é viável, pois a quimioluminescência requer confirmação por Western Blot em todos os doadores.</p>
<p><strong>Gabarito Oficial: Alternativa C.</strong></p>
<p><strong>Comentário Detalhado:</strong><br>
• <strong>Alternativa C (Correta):</strong> Esta questão clássica aborda a transposição do rigor estatístico para a realidade clínica e ética da saúde pública:
1. Em hemoterapia, a transmissão transfusional de um vírus incurável como o HIV é um evento catastrófico inaceitável. O custo de um <strong>falso-negativo</strong> é infinitamente superior ao custo de um falso-positivo (que acarreta apenas o descarte da bolsa e a reconvocação do doador para teste confirmatório);
2. Portanto, o gestor de um banco de sangue deve SEMPRE selecionar o <strong>Ponto de Corte 1</strong>, que garante <strong>Sensibilidade máxima de 99,9%</strong>, ainda que sua especificidade seja inferior à do ponto de Youden. A alternativa C é a única correta.</p>

<h4>Questão 7: USP-RP — Avaliação de Discriminação pela AUC</h4>
<p><strong>Enunciado:</strong> Um estudo publicado em periódico internacional de alto impacto avaliou o desempenho diagnóstico de um algoritmo de ultrassonografia com inteligência artificial para detecção de esteatose hepática não alcoólica moderada a grave, reportando uma Área Sob a Curva ROC (AUC) de 0,87 (Intervalo de Confiança de 95%: 0,82 a 0,92). A interpretação conceitual e probabilística exata desse resultado é que:</p>
<p>A) O teste acerta o diagnóstico em 87% da população geral submetida ao exame.<br>
B) Ao sortear aleatoriamente um paciente com esteatose hepática moderada/grave e um indivíduo controle sadio, a probabilidade de o algoritmo atribuir um escore de risco mais elevado ao indivíduo verdadeiramente doente é de 87%.<br>
C) O Valor Preditivo Positivo do algoritmo é garantido em 87% em qualquer serviço de saúde.<br>
D) A sensibilidade do teste é igual a 87% quando a especificidade é fixada em 13%.<br>
E) O algoritmo possui acurácia perfeita, livre de qualquer viés de espectro.</p>
<p><strong>Gabarito Oficial: Alternativa B.</strong></p>
<p><strong>Comentário Detalhado:</strong><br>
• <strong>Alternativa B (Correta):</strong> A definição matemática formal e rigorosa da Estatística C / Área Sob a Curva ROC é a <strong>probabilidade de concordância de ordenamento de pares díspares</strong>: dado um par aleatório formado por um doente e um não doente, o teste apontará o valor mais alterado para o indivíduo doente em exatamente 87% das vezes. A alternativa A erra ao confundir AUC com acurácia global proporcional simples. A alternativa C erra porque o VPP depende da prevalência. A alternativa B é primorosa.</p>
`
};
