// Bloco 5 - Aula 095: Sensibilidade, Especificidade e Valores Preditivos (Parte 5: Seções 18 a 20)

export const sec18 = {
  id: 'paradoxo-de-simpson-e-estratificacao-diagnostica',
  title: '18. O Paradoxo de Simpson e Estratificação em Testes Diagnósticos',
  body_html: `
<h3>Quando a Agregação de Dados Distorce a Realidade Clínica</h3>
<p>O <strong>Paradoxo de Simpson</strong> (ou efeito de reversão de Yule-Simpson) é um fenômeno estatístico fascinante e perigoso na avaliação de tecnologias diagnósticas e terapêuticas. Ele ocorre quando uma tendência, correlação ou superioridade aparente de um teste diagnóstico observada em múltiplos grupos ou estratos populacionais independentes <strong>desaparece completamente ou se inverte de forma paradoxal</strong> quando os dados de todos os estratos são agregados em uma única tabela de contingência 2x2 consolidada.</p>

<p>Na prática médica e nas provas de residência de alta complexidade, o paradoxo manifesta-se tipicamente quando existe uma <strong>variável de confundimento oculta</strong> (como a gravidade basal do paciente, a faixa etária, o subtipo histológico ou o centro assistencial) que está associada tanto à escolha/aplicação do método diagnóstico quanto à prevalência real da doença no estrato.</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Estrato Clínico</th>
      <th>Acurácia do Teste A</th>
      <th>Acurácia do Teste B</th>
      <th>Interpretação Estratificada Correta</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Pacientes Graves / UTI</strong></td>
      <td><strong>85% de acertos</strong> (170/200)</td>
      <td><strong>75% de acertos</strong> (30/40)</td>
      <td>O Teste A é clinicamente <strong>superior</strong> ao Teste B no estrato de pacientes críticos.</td>
    </tr>
    <tr>
      <td><strong>Pacientes Ambulatoriais Leves</strong></td>
      <td><strong>95% de acertos</strong> (38/40)</td>
      <td><strong>90% de acertos</strong> (180/200)</td>
      <td>O Teste A é clinicamente <strong>superior</strong> ao Teste B no estrato de pacientes ambulatoriais.</td>
    </tr>
    <tr>
      <td><strong>Dados Agregados Totais (Paradoxo!)</strong></td>
      <td><strong>86,7% global</strong> (208/240)</td>
      <td><strong>87,5% global</strong> (210/240)</td>
      <td><strong>Distorção Paradoxal:</strong> O Teste B parece artificialmente superior na análise global combinada, unicamente porque foi aplicado com muito mais frequência na população leve e fácil de acertar!</td>
    </tr>
  </tbody>
</table>

<p><strong>A Lição Metodológica Inegociável:</strong> Nunca avaliar acurácia diagnóstica em dados globais agrupados sem antes realizar análise estratificada multivariada pelos fatores prognósticos basais e subgrupos clínicos relevantes.</p>
`
};

export const sec19 = {
  id: 'bateria-de-questoes-comentadas-top-tier-complementares',
  title: '19. Questões de Concursos Top-Tier: Paradoxo de Simpson e Estratégias Diagnósticas',
  body_html: `
<h3>Questões com Análise Completa de Alternativas e Raciocínio Clínico Aprofundado</h3>

<h4>Questão 10: FMUSP — Estratégia de Testes em Paralelo na Sala de Emergência</h4>
<p><strong>Enunciado:</strong> Um homem de 68 anos dá entrada no pronto-socorro com confusão mental aguda e febre alta há 12 horas. Há suspeita de encefalite herpética viral vs meningoencefalite bacteriana. O médico assistente solicita punção lombar e encaminha o líquor simultaneamente para pesquisa rápida de antígeno bacteriano por látex e ensaio de reação em cadeia da polimerase multiplex (PCR multiplex), estabelecendo como protocolo que o tratamento antiviral específico e a antibioticoterapia empírica serão mantidos se qualquer um dos dois exames acusar positividade. Essa abordagem clínica diagnóstica caracteriza-se operacionalmente por:</p>
<p>A) Testes em série, visando maximizar o valor preditivo positivo.<br>
B) Testes em paralelo, promovendo elevação da sensibilidade diagnóstica global e do valor preditivo negativo à custa da redução da especificidade global.<br>
C) Testes mutuamente exclusivos, com redução da acurácia global.<br>
D) Aplicação direta do modelo de triagem sequencial de Wilson e Jungner.<br>
E) Testes dicotômicos de alta especificidade com proteção contra falsos-positivos.</p>
<p><strong>Gabarito Oficial: Alternativa B.</strong></p>
<p><strong>Comentário Detalhado:</strong><br>
• <strong>Alternativa B (Correta):</strong> Em infecções agudas do sistema nervoso central com altíssima taxa de letalidade e sequelas permanentes, o clínico não pode tolerar falsos-negativos. A utilização de <strong>testes em paralelo (simultâneos, positivo se $T_1$ OU $T_2$)</strong> eleva a sensibilidade a níveis quase absolutos e maximiza o valor preditivo negativo, assegurando que nenhum agente etiológico passe despercebido na admissão, mesmo que isso acarrete algum incremento no número de resultados falso-positivos.</p>
`
};
