// Bloco 5 - Aula 115: Seção 9 de Guia Prático de Identificação e Controle de Vieses em Questões
export const sec9 = {
  id: 'guia-pratico-de-identificacao-de-vieses-em-provas',
  title: '9. Guia Prático de Identificação Rápida de Vieses, Confundimento e Causalidade em Questões',
  body_html: `
<h3>O Manual de Sobrevivência Metodológica para o ENAMED e Residência</h3>
<p>As questões de Medicina Preventiva sobre vieses e causalidade costumam ser as mais temidas pelos candidatos devido à aparente subjetividade dos cenários apresentados. Contudo, cada viés epidemiológico possui <strong>"palavras-chave patognomônicas" e gatilhos de enunciado</strong> que revelam imediatamente o erro metodológico embutido. Observe a matriz diagnóstica LURIA:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Pistas e Gatilhos Textuais no Enunciado</th>
      <th>Viés ou Fenômeno Metodológico Subjacente</th>
      <th>Explicação e Mecanismo Epidemiológico</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><em>"Casos e controles foram selecionados exclusivamente entre pacientes internados nas enfermarias do hospital X..."</em></td>
      <td><strong>Viés de Berkson</strong><br>(Viés de Admissão Hospitalar)</td>
      <td>Taxas de hospitalização aumentadas para indivíduos com multimorbidade criam associações espúrias que não existem na comunidade.</td>
    </tr>
    <tr>
      <td><em>"Mães de crianças que nasceram com malformações foram entrevistadas sobre uso de remédios no primeiro trimestre..."</em></td>
      <td><strong>Viés de Recordatório</strong><br>(Viés de Memória / Recall Bias)</td>
      <td>Mães com desfechos adversos lembram de detalhes insignificantes que mães de crianças sadias esquecem por completo.</td>
    </tr>
    <tr>
      <td><em>"Ao comparar trabalhadores de uma indústria química com a população geral do município, observou-se menor mortalidade entre os operários..."</em></td>
      <td><strong>Efeito do Trabalhador Sadio</strong><br>(Healthy Worker Effect)</td>
      <td>A força de trabalho empregada ativa exclui indivíduos incapacitados ou gravemente doentes, mascarando a toxicidade laboral.</td>
    </tr>
    <tr>
      <td><em>"Durante o período em que sabiam que estavam sendo filmados ou monitorados por auditores, os profissionais aumentaram a adesão..."</em></td>
      <td><strong>Efeito Hawthorne</strong></td>
      <td>Modificação comportamental temporária provocada pela simples consciência de estar sendo observado em um experimento.</td>
    </tr>
    <tr>
      <td><em>"O risco relativo bruto foi de 2,4; após estratificação por idade, o estrato jovem foi 1,1 e o estrato idoso foi 1,1..."</em></td>
      <td><strong>Fator de Confundimento</strong></td>
      <td>Os estratos são iguais entre si, mas ambos diferem marcadamente do valor bruto. A idade inflou a associação aparente.</td>
    </tr>
    <tr>
      <td><em>"O risco relativo bruto foi de 3,0; entre não fumantes o RR foi de 1,2, mas entre fumantes o RR saltou para 18,5..."</em></td>
      <td><strong>Modificação de Efeito</strong><br>(Interação Biológica Sinérgica)</td>
      <td>Os estratos são substancialmente diferentes entre si. A magnitude real da causalidade depende da presença do outro fator.</td>
    </tr>
    <tr>
      <td><em>"Ajustou-se a análise para uma variável que recebia setas simultâneas da exposição e do desfecho no DAG (X $\rightarrow$ Z $\leftarrow$ Y)..."</em></td>
      <td><strong>Viés de Colisor</strong><br>(Collider Stratification Bias)</td>
      <td>Condicionar ou ajustar em um colisor abre um caminho espúrio que estava naturalmente bloqueado, gerando correlação artificial.</td>
    </tr>
    <tr>
      <td><em>"Um tratamento parece superior na população global, mas ao fatiar por gravidade, o tratamento é inferior em todos os estratos..."</em></td>
      <td><strong>Paradoxo de Simpson</strong></td>
      <td>Inversão completa do efeito decorrente de confundimento massivo e distribuição assimétrica da gravidade clínica.</td>
    </tr>
    <tr>
      <td><em>"Pacientes com sintomas iniciais de uma doença ainda não diagnosticada passam a usar determinado fitoterápico para aliviar o mal-estar..."</em></td>
      <td><strong>Causalidade Reversa / Viés de Protopatia</strong><br>(Protopathic Bias)</td>
      <td>A droga foi iniciada em resposta aos primeiros pródromos subclínicos da doença, criando a falsa impressão de que a droga causou o agravo.</td>
    </tr>
  </tbody>
</table>

<h3>A Árvore de Decisão LURIA para Confundimento versus Modificação de Efeito</h3>
<div class="formula-box">
  <p><strong>Memorize o Fluxo Decisório Infalível:</strong></p>
  <ol>
    <li>Olhe para as medidas nos dois estratos ($RR_1$ e $RR_2$):
      <ul>
        <li>Se $RR_1 \neq RR_2$ $\rightarrow$ <strong>MODIFICAÇÃO DE EFEITO (INTERAÇÃO)</strong>. Fim de papo! Não junte os estratos!;</li>
        <li>Se $RR_1 = RR_2$ (ou valores muito próximos) $\rightarrow$ Não há modificação de efeito. Siga para a próxima etapa.</li>
      </ul>
    </li>
    <li>Compare os estratos com a medida Bruta ($RR_{bruto}$):
      <ul>
        <li>Se os estratos são iguais entre si, mas <strong>DIFEREM</strong> do bruto ($RR_{estrato} \neq RR_{bruto}$) $\rightarrow$ <strong>FATOR DE CONFUNDIMENTO</strong>. O valor bruto estava distorcido;</li>
        <li>Se os estratos são iguais entre si e <strong>IGUAIS</strong> ao bruto ($RR_{estrato} = RR_{bruto}$) $\rightarrow$ A variável é irrelevante (sem confundimento e sem interação).</li>
      </ul>
    </li>
  </ol>
</div>
`
};

export const sec10 = {
  id: 'inferencia-causal-avancada-e-variaveis-instrumentais',
  title: '10. Métodos Quase-Experimentais Avançados: Variáveis Instrumentais e Modelos Contrafatuais',
  body_html: `
<h3>O Modelo Causal Contrafatual de Rubin (Potential Outcomes Framework)</h3>
<p>O alicerce da inferência causal moderna repousa sobre a <strong>Teoria dos Resultados Potenciais (Potential Outcomes)</strong> formulada pelo estatístico Donald Rubin na década de 1970. Para definir de forma epistemologicamente perfeita o que significa "a droga $A$ causou a cura do paciente João", a ciência precisa comparar dois mundos paralelos mutuamente excludentes:</p>

<ol>
  <li><strong>O Mundo Factual:</strong> O resultado clínico observado no paciente João quando ele recebeu a droga ativa ($Y^1$);</li>
  <li><strong>O Mundo Contrafatual:</strong> O resultado clínico que teria ocorrido <em>no exato mesmo paciente João, no mesmo instante temporal e nas mesmas circunstâncias biológicas</em>, se ele NÃO tivesse recebido a droga ($Y^0$).</li>
</ol>

<p><strong>O Problema Fundamental da Inferência Causal:</strong> É fisicamente impossível observar simultaneamente o estado factual e o contrafatual no mesmo indivíduo humano (o paciente não pode simultaneamente tomar e não tomar o remédio no mesmo átimo de tempo). Por essa razão ontológica intransponível, <strong>a epidemiologia substitui a comparação individual contrafatual pela comparação de médias populacionais entre grupos expostos e não expostos</strong>.</p>

<p>Para que o grupo controle represente com perfeição o contrafatual do grupo intervenção, é obrigatório preencher a <strong>Condição de Intercambiabilidade (Exchangeability / Sem Confundimento)</strong>: se trocássemos os dois grupos de lugar, o grupo controle se comportaria de forma idêntica ao grupo intervenção caso recebesse o tratamento.</p>

<h3>O Método das Variáveis Instrumentais (Instrumental Variables - IV)</h3>
<p>Quando estamos diante de um estudo observacional em que existem múltiplos confundidores não mensurados que impossibilitam o controle por regressão ou pareamento, a bioestatística recorre ao método quase-experimental das <strong>Variáveis Instrumentais (VI)</strong>:</p>

<div class="formula-box">
  <p>Uma <strong>Variável Instrumental ($Z$)</strong> é uma variável externa que atua como um "sorteador natural", preenchendo três condições rigorosas no DAG:</p>
  <ul>
    <li>1. <strong>Relevância:</strong> A variável instrumental $Z$ deve estar fortemente associada à probabilidade de receber a Exposição primária ($X$);</li>
    <li>2. <strong>Independência:</strong> A variável $Z$ não compartilha nenhuma causa comum com o Desfecho ($Y$), sendo independente de todos os fatores de confusão ($U$);</li>
    <li>3. <strong>Restrição de Exclusão (Exclusion Restriction):</strong> A variável $Z$ só afeta o Desfecho ($Y$) <em>única e exclusivamente através do seu impacto na Exposição $X$</em> (não existe caminho causal direto de $Z$ para $Y$ que não passe por $X$!).</li>
  </ul>
</div>

<div class="book-case">
  <h4>Exemplo Clínico Clássico: Distância Geográfica como Variável Instrumental</h4>
  <p>Pesquisadores desejam comparar se pacientes infartados que são submetidos a Cateterismo Cardíaco com Angioplastia Primária imediata sobrevivem mais do que aqueles tratados com trombólise venosa medicamentosa. Em estudos observacionais puros, os pacientes submetidos à angioplastia são mais jovens e atendidos em hospitais de elite (confundimento massivo por gravidade e status socioeconômico).</p>
  <p><strong>A Variável Instrumental Genial: A Distância Diferencial do Domicílio até o Centro de Hemodinâmica!</strong></p>
  <p>A distância física da casa do paciente até o hospital de hemodinâmica atua como uma Variável Instrumental perfeita: (1) Quem mora a menos de 5 km tem chance muito maior de receber angioplastia do que quem mora a 80 km; (2) A distância geográfica do domicílio é sorteada pelo endereço de residência e não tem relação biológica direta com a anatomia das coronárias; (3) A distância física em si não mata nem cura o infarto se não for pelo fato de definir qual tratamento o paciente recebeu. Através de regressão em dois estágios (Two-Stage Least Squares - 2SLS), a VI isola o efeito causal puro da angioplastia livre de qualquer confundimento!</p>
</div>
`
};
