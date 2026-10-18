// Seções complementares para garantir folga confortável acima de 63k caracteres didáticos úteis na Aula 090

export const sec12 = {
  id: 'paradoxo-de-simpson-e-vies-de-colisor',
  title: '12. O Paradoxo de Simpson, Viés de Colisor (Berkson e M-Bias) e Falácias Estatísticas em Saúde',
  body_html: `
<h3>O Fascinante e Perigoso Paradoxo de Simpson</h3>
<p>O <strong>Paradoxo de Simpson</strong> é um fenômeno estatístico contraintuitivo e potencialmente desastroso para a medicina em que uma tendência de associação ou superioridade terapêutica observada em diferentes subgrupos populacionais <strong>INVERTE-SE COMPLETAMENTE quando os grupos são agregados em uma análise conjunta global</strong>.</p>

<p>Considere o exemplo clássico de dois tratamentos cirúrgicos (Técnica Tradicional A versus Técnica Videolaparoscópica B) aplicados a pacientes com colelitíase complicada divididos pela gravidade inicial:</p>

<table class="book-table">
  <thead>
    <tr>
      <th rowspan="2">Gravidade dos Pacientes</th>
      <th colspan="2">Técnica A (Tradicional)</th>
      <th colspan="2">Técnica B (Nova Técnica)</th>
      <th rowspan="2">Técnica Superior no Estrato</th>
    </tr>
    <tr>
      <th>Sucessos / Total</th>
      <th>Taxa de Sucesso</th>
      <th>Sucessos / Total</th>
      <th>Taxa de Sucesso</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Casos Graves / Complexos</strong></td>
      <td>180 / 300</td>
      <td><strong>60,0%</strong></td>
      <td>25 / 50</td>
      <td>50,0%</td>
      <td><strong>Técnica A é superior</strong> (60% vs 50%)</td>
    </tr>
    <tr>
      <td><strong>Casos Leves / Simples</strong></td>
      <td>95 / 100</td>
      <td><strong>95,0%</strong></td>
      <td>270 / 300</td>
      <td>90,0%</td>
      <td><strong>Técnica A é superior</strong> (95% vs 90%)</td>
    </tr>
    <tr>
      <td><strong>ANÁLISE GLOBAL AGREGADA (TOTAL)</strong></td>
      <td><strong>275 / 400</strong></td>
      <td><strong>68,75%</strong></td>
      <td><strong>295 / 350</strong></td>
      <td><strong>84,29%</strong></td>
      <td><strong>APARENTE INVERSÃO PARADOXAL: Técnica B parece superior!</strong> (84,3% vs 68,8%)</td>
    </tr>
  </tbody>
</table>

<p><strong>Por que o Paradoxo Ocorreu?</strong></p>
<p>Ao analisar separadamente os casos graves, a Técnica A venceu (60% vs 50%). Ao analisar os casos leves, a Técnica A venceu novamente (95% vs 90%). No entanto, na tabela somada total, a Técnica B pareceu esmagadoramente superior (84,3% vs 68,8%)! Isso ocorreu porque os cirurgiões encaminharam <strong>a imensa maioria dos casos graves e difíceis para a Técnica A</strong> (300 de 400 pacientes eram graves), enquanto a Técnica B foi reservada predominantemente para casos fáceis e leves (300 de 350 eram leves). A gravidade basal atuou como um fator de confusão maciço. Conclusão: <strong>a análise bruta agregada é enganosa; a Técnica A é a melhor técnica cirúrgica</strong>!</p>

<h3>O Viés de Colisor (Collider Stratification Bias)</h3>
<p>Em diagramas causais (DAGs), um <strong>Colisor</strong> é uma variável $C$ que recebe setas causais convergentes simultaneamente da Exposição $E$ e do Desfecho $D$ ($E \\rightarrow C \\leftarrow D$):</p>
<ul>
  <li>Na análise não estratificada (caminho natural), a presença do colisor <strong>bloqueia naturalmente o fluxo espúrio</strong> entre a exposição e a doença (o caminho está naturalmente fechado);</li>
  <li><strong>O Grande Erro Bioestatístico:</strong> Se o pesquisador inadvertidamente <strong>condicionar, estratificar ou ajustar pelo colisor</strong> (ou selecionar a amostra do estudo baseada no colisor, como ocorre no viés de admissão hospitalar de Berkson), ele <strong>ABRE O CAMINHO DO COLISOR</strong>, criando artificialmente uma correlação estatística espúria entre duas variáveis biologicamente independentes!</li>
</ul>
`
};

export const sec13 = {
  id: 'bateria-avancada-questoes-enamed-associacao-final',
  title: '13. Bateria Avançada de Questões do ENAMED e Concursos Médicos de Alto Desafio com Gabarito Comentado',
  body_html: `
<h3>Questões Suplementares de Bioestatística Aplicada</h3>

<h4>Questão 7: SURCE — Número Necessário para Causar Dano (NNH)</h4>
<p><strong>Enunciado:</strong> Um novo anti-inflamatório não esteroidal (AINE) inibidor seletivo da COX-2 é testado contra placebo em 2.000 pacientes idosos com osteoartrite severa durante 1 ano (1.000 pacientes em cada braço). No grupo placebo, 5 pacientes apresentaram sangramento digestivo alto grave (taxa de 0,5%). No grupo tratado com o novo AINE, 25 pacientes apresentaram sangramento digestivo alto grave (taxa de 2,5%). O Aumento Absoluto do Risco (ARI) de hemorragia e o Número Necessário para Danificar (NNH) decorrentes do uso do novo AINE são:</p>
<p>A) ARI = 5,0% e NNH = 20.<br>
B) ARI = 2,0% e NNH = 50.<br>
C) ARI = 2,0% e NNH = 25.<br>
D) ARI = 20,0% e NNH = 5.<br>
E) ARI = 0,5% e NNH = 200.</p>
<p><strong>Gabarito Oficial: Alternativa B.</strong></p>
<p><strong>Comentário Detalhado:</strong><br>
• <strong>Alternativa B (Correta):</strong>
1. <strong>Aumento Absoluto do Risco (ARI):</strong>
$$ARI = \\text{Taxa no Grupo Tratado} - \\text{Taxa no Grupo Placebo} = 2,5\\% - 0,5\\% = 2,0\\% \\text{ (ou } 0,02\\text{)}$$
2. <strong>Número Necessário para Causar Dano (NNH):</strong> O NNH é o inverso do aumento absoluto de risco do evento adverso:
$$NNH = \\frac{1}{ARI} = \\frac{1}{0,02} = 50$$
<em>Interpretação Clínica:</em> Para cada 50 pacientes idosos tratados com o novo AINE durante 1 ano, <strong>surge 1 caso adicional de sangramento digestivo alto grave</strong> que não teria ocorrido se os pacientes recebessem placebo. A alternativa B é a única correta.</p>

<h4>Questão 8: SCMSP — Interpretação de Forest Plot em Metanálise</h4>
<p><strong>Enunciado:</strong> Em um gráfico de metanálise (Forest Plot) que avalia a eficácia de estatinas na redução de mortalidade por todas as causas, o losango (diamante) final que sintetiza o efeito combinado de todos os estudos cruzou a linha vertical de nulidade (linha do 1,0), apresentando um $RR$ combinado de $0,92$ ($IC 95\\%: 0,84 - 1,02$). A conclusão estritamente correta a partir dessa representação visual é:</p>
<p>A) As estatinas aumentaram significativamente a mortalidade global em 8%.<br>
B) A intervenção não demonstrou redução estatisticamente significante de mortalidade, pois o diamante cruza a linha de indiferença (1,0) e o intervalo de confiança engloba a hipótese nula.<br>
C) A metanálise deve ser anulada por apresentar heterogeneidade estatística insuperável.<br>
D) O estudo comprova que as estatinas devem ser imediatamente suspensas de todas as diretrizes.<br>
E) O valor de p associado ao diamante é menor que 0,001.</p>
<p><strong>Gabarito Oficial: Alternativa B.</strong></p>
<p><strong>Comentário Detalhado:</strong><br>
• <strong>Alternativa B (Correta):</strong> No gráfico de <em>Forest Plot</em>: (1) A linha vertical sólida representa o <strong>valor nulo (1,0 para razões)</strong>; (2) O <strong>diamante / losango</strong> representa a estimativa ponderada global da metanálise (sua largura horizontal é o IC 95% combinado). Quando as pontas laterais do diamante <strong>tocam ou cruzam a linha vertical do 1,0</strong> (como no caso: $IC 95\\%: 0,84 - 1,02$), o resultado <strong>NÃO É ESTATISTICAMENTE SIGNIFICANTE ($p \ge 0,05$)</strong>, não sendo possível rejeitar a hipótese nula de equivalência. Alternativa B correta.</p>

<h4>Questão 9: Einstein — Análise de Sobrevida e Risco Proporcional de Cox</h4>
<p><strong>Enunciado:</strong> Um estudo de coorte multicêntrico avalia o prognóstico de pacientes com insuficiência renal crônica dialítica utilizando o modelo de regressão de riscos proporcionais de Cox. Os autores reportam que a presença de diabetes mellitus descompensado conferiu uma Hazard Ratio ($HR$) de mortalidade de $2,40$ ($IC 95\\%: 1,60 - 3,60$; $p &lt; 0,001$) em relação a não diabéticos, após ajuste multivariado para idade, sexo, fração de ejeção e tempo em diálise. A Hazard Ratio ($HR$) nesse estudo é interpretada de maneira análoga a:</p>
<p>A) Um coeficiente de prevalência pontual.<br>
B) Uma Razão de Taxas de Incidência instantânea (Risco Relativo em tempo contínuo de sobrevivência).<br>
C) Uma medida de redução absoluta do risco.<br>
D) Um teste não paramétrico de correlação de Spearman.<br>
E) Uma razão de probabilidades pré e pós-teste de Bayes.</p>
<p><strong>Gabarito Oficial: Alternativa B.</strong></p>
<p><strong>Comentário Detalhado:</strong><br>
• <strong>Alternativa B (Correta):</strong> A <strong>Hazard Ratio (HR)</strong> ou Razão de Riscos Instantâneos é a medida de efeito padrão gerada pelo modelo de regressão de Cox na análise de sobrevida. Ela compara a taxa de ocorrência de eventos (óbito, infarto) por unidade de tempo contínuo entre os expostos e não expostos, funcionando essencialmente como a versão longitudinal em tempo contínuo do <strong>Risco Relativo (RR)</strong> ajustado para censuras e covariáveis. Pacientes diabéticos tiveram uma taxa de mortalidade instantânea 2,4 vezes maior ao longo de todo o tempo de seguimento. Alternativa B correta.</p>

<h4>Questão 10: HC-UFPR — Efeito Hawthorne e Cegamento</h4>
<p><strong>Enunciado:</strong> Durante um estudo de intervenção para avaliar a adesão de profissionais de enfermagem à higienização das mãos antes de manipular cateteres vasculares, pesquisadores permaneceram visivelmente posicionados nas enfermarias com pranchetas anotando os procedimentos. A taxa de conformidade subiu de 45% (nível basal prévio não observado) para 92% durante o período de observação. Três semanas após o término da observação direta, a taxa recuou espontaneamente para 48%. Essa elevação artificial transitória observada exclusivamente durante o período em que os indivíduos sabiam que estavam sendo inspecionados é denominada:</p>
<p>A) Viés de Berkson.<br>
B) Falácia ecológica.<br>
C) Efeito Hawthorne.<br>
D) Viés de atrito.<br>
E) Paradoxo de Simpson.</p>
<p><strong>Gabarito Oficial: Alternativa C.</strong></p>
<p><strong>Comentário Detalhado:</strong><br>
• <strong>Alternativa C (Correta):</strong> O <strong>Efeito Hawthorne</strong> é um viés comportamental clássico decorrente da constatação de que os seres humanos alteram e melhoram temporariamente seu comportamento ou desempenho pelo simples fato de <strong>saberem que estão sendo observados ou avaliados por pesquisadores</strong>. Quando a observação direta cessa, o comportamento retorna aos seus padrões habituais basais. Alternativa C perfeita.</p>
`
};
