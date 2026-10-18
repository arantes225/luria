// Bloco 6 - Aula 120: Seção 11 de Sobrevida, Curvas de Kaplan-Meier e Hazard Ratio
export const sec11 = {
  id: 'analise-de-sobrevida-kaplan-meier-e-hazard-ratio',
  title: '11. Análise de Sobrevida, Curvas de Kaplan-Meier, Teste de Log-Rank e Hazard Ratio (HR)',
  body_html: `
<h3>O Tempo até o Desfecho: A Limitação das Proporções Estáticas</h3>
<p>Em pesquisas de oncologia, cardiologia e terapia intensiva, não basta responder binariamente <em>"O paciente faleceu ou sobreviveu?"</em>. É indispensável incorporar uma dimensão clínica crucial: <strong>EM QUANTO TEMPO o evento desfavorável ocorreu?</strong> Uma nova terapia oncológica pode não curar o paciente aos 5 anos, mas pode prolongar a sobrevida com qualidade em 18 meses em comparação ao cuidado padrão. Esse fenômeno é avaliado pela <strong>Análise de Sobrevida (Time-to-Event Analysis)</strong>.</p>

<p>A análise de sobrevida lida com um desafio estatístico peculiar: a <strong>Censura de Dados (Censoring)</strong>:</p>
<ul>
  <li>Ocorre quando o tempo exato até o desfecho não é conhecido para determinado participante;</li>
  <li><strong>Censura à Direita (Right-Censoring - A Mais Frequente):</strong> O estudo é encerrado formalmente aos 3 anos e o paciente ainda está vivo e sadio; ou o paciente muda de país e perde o contato antes de sofrer o evento. A análise de sobrevida utiliza a informação do tempo em que ele comprovadamente permaneceu livre da doença sem desperdiçar seu histórico.</li>
</ul>

<h3>A Curva de Kaplan-Meier e o Teste de Log-Rank</h3>
<p>A ferramenta gráfica consagrada da análise de sobrevida é a <strong>Curva de Sobrevida de Kaplan-Meier</strong>:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Componente da Curva de Kaplan-Meier</th>
      <th>Representação Gráfica e Significado Biológico</th>
      <th>Regra de Interpretação em Concursos</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Eixo Vertical ($Y$)</strong></td>
      <td>Probabilidade acumulada estimada de sobrevida (variando de $1,0$ ou $100\\%$ no início até $0\\%$).</td>
      <td>Inicia-se sempre em $100\\%$ em $T_0$ (todos os pacientes estão vivos no momento da inclusão).</td>
    </tr>
    <tr>
      <td><strong>Eixo Horizontal ($X$)</strong></td>
      <td>Tempo cronológico decorrido desde a randomização ou inclusão (dias, meses ou anos de seguimento).</td>
      <td>Permite ler a sobrevida média em qualquer marco temporal específico (ex.: sobrevida global aos 2 anos).</td>
    </tr>
    <tr>
      <td><strong>Formato em "Degraus de Escada" (Step-Function)</strong></td>
      <td>Cada queda vertical brusca ("degrau") marca a <strong>ocorrência de um ou mais desfechos clínicos (óbitos)</strong> naquele instante exato.</td>
      <td>Linhas horizontais planas representam intervalos de tempo onde nenhum paciente do grupo faleceu.</td>
    </tr>
    <tr>
      <td><strong>Marcadores em Cruzeta ou Traços Verticais Curtos</strong></td>
      <td>Indicam os <strong>pacientes que foram censurados</strong> (perda de seguimento ou término do estudo) naquele ponto temporal.</td>
      <td>O paciente censurado é removido do denominador do próximo degrau sem distorcer o cálculo dos demais.</td>
    </tr>
    <tr>
      <td><strong>A Mediana de Sobrevida (Median Survival Time)</strong></td>
      <td>Traça-se uma linha horizontal no ponto de <strong>$50\\%$ de probabilidade de sobrevida</strong> no eixo $Y$; o ponto onde essa linha cruza a curva de Kaplan-Meier projeta-se no eixo $X$ o tempo exato em que metade da população faleceu.</td>
      <td>É a métrica de escolha para comparar esquemas quimioterápicos (ex.: sobrevida mediana de 14 meses com droga nova vs 8 meses no controle).</td>
    </tr>
    <tr>
      <td><strong>Teste de Log-Rank (Log-Rank Test)</strong></td>
      <td>Teste estatístico não paramétrico que compara a distribuição global de duas ou mais curvas de Kaplan-Meier ao longo de todo o tempo de seguimento.</td>
      <td>Testa a hipótese nula de que não há diferença de sobrevida entre os braços. Se o valor de <strong>$p < 0,05$, as curvas são estatisticamente diferentes</strong>.</td>
    </tr>
  </tbody>
</table>

<h3>O Hazard Ratio (Razão de Riscos Instantâneos - HR) e o Modelo de Cox</h3>
<p>Em estudos longitudinais com análise de tempo até o evento, a medida de efeito preferencial não é o Risco Relativo tradicional, mas sim o <strong>Hazard Ratio (HR)</strong>, obtido através do <strong>Modelo de Riscos Proporcionais de Cox (Cox Proportional Hazards Regression)</strong>:</p>

<div class="formula-box">
  <p><strong>Definição Conceitual de Hazard e Hazard Ratio:</strong></p>
  <ul>
    <li>O <strong>Hazard (Risco Instantâneo - $h(t)$)</strong> representa a probabilidade matemática de que um indivíduo que sobreviveu até o momento $t$ sofra o desfecho clínico no instante imediatamente subsequente;</li>
    <li>O <strong>Hazard Ratio ($HR$)</strong> é a razão entre o risco instantâneo no grupo experimental e o risco instantâneo no grupo controle:
      $$HR = \\frac{h_{experimental}(t)}{h_{controle}(t)}$$
    </li>
    <li><strong>Interpretação Numérica do Hazard Ratio:</strong>
      <ul>
        <li>$HR = 1,0$: Efeito rigorosamente nulo (mesma velocidade de adoecimento/óbito em ambos os grupos);</li>
        <li>$HR < 1,0$: A intervenção é <strong>protetora</strong> (reduz a velocidade instantânea do desfecho). Exemplo: $HR = 0,70$ significa que os pacientes do grupo intervenção sofrem o desfecho a uma taxa $30\\%$ menor a qualquer momento do tempo ($1 - 0,70 = 0,30$ ou $30\\%$ de redução do risco instantâneo);</li>
        <li>$HR > 1,0$: A intervenção aumenta a taxa instantânea do evento (dano).</li>
      </ul>
    </li>
  </ul>
</div>

<p><strong>A Premissa dos Riscos Proporcionais:</strong> O modelo de Cox assume obrigatoriamente que a razão de riscos instantâneos ($HR$) permanece <strong>constante e proporcional ao longo de todo o período de acompanhamento</strong> (as duas curvas de sobrevida não podem se cruzar repetidamente!). Se as curvas de sobrevida se cruzarem, a premissa de proporcionalidade foi violada, invalidando o uso de um único $HR$ para resumir o estudo.</p>
`
};
