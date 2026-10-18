// Bloco 5 - Aula 105: Seção 8 de Aprofundamento Metodológico
export const sec8 = {
  id: 'comparativo-critico-e-roteiro-de-decisao-em-questoes',
  title: '8. Guia Prático de Resolução Rápida, Roteiro Decisório e Matriz Comparativa para Concursos',
  body_html: `
<h3>O Algoritmo Mental de Resolução em 15 Segundos para Provas</h3>
<p>Diante de uma questão clínica ou epidemiológica do ENAMED ou das bancas de residência médica que descreva um estudo e peça a identificação do desenho metodológico, o médico examinando deve seguir rigorosamente o <strong>Algoritmo LURIA de Três Perguntas Estruturais</strong>:</p>

<ol>
  <li><strong>Pergunta 1: Houve intervenção deliberada do pesquisador?</strong>
    <ul>
      <li><strong>SIM:</strong> O estudo é <strong>Experimental</strong>. Se a alocação foi individual e aleatória $\rightarrow$ <strong>Ensaio Clínico Randomizado (ECR)</strong>. Se a alocação foi em bairros, cidades ou escolas inteiras $\rightarrow$ <strong>Ensaio Comunitário</strong>;</li>
      <li><strong>NÃO:</strong> O estudo é <strong>Observacional</strong> $\rightarrow$ Avançar imediatamente para a Pergunta 2.</li>
    </ul>
  </li>
  <li><strong>Pergunta 2: A unidade primária de análise é o indivíduo isolado ou um grupo agregado?</strong>
    <ul>
      <li><strong>GRUPO / AGREGADO POPULACIONAL / CIDADES / PAÍSES:</strong> O estudo é categoricamente <strong>Ecológico</strong> (Alerta máximo para a Falácia Ecológica e coeficiente de correlação $r$);</li>
      <li><strong>INDIVÍDUO HUMANO ISOLADO:</strong> Avançar imediatamente para a Pergunta 3.</li>
    </ul>
  </li>
  <li><strong>Pergunta 3: Qual é o ponto de partida do pesquisador e a direcionalidade temporal?</strong>
    <ul>
      <li><strong>Parte da EXPOSIÇÃO e acompanha no tempo até o DESFECHO:</strong> Trata-se de um <strong>Estudo de Coorte</strong> (se acompanha para frente no tempo a partir de hoje é <em>Prospectiva</em>; se resgata fichas do passado e acompanha até o presente é <em>Retrospectiva/Histórica</em>). Permite calcular Incidência e Risco Relativo ($RR$);</li>
      <li><strong>Parte do DESFECHO (Doentes vs Sadios) e olha para trás buscando a EXPOSIÇÃO:</strong> Trata-se de um <strong>Estudo de Caso-Controle</strong>. A medida canônica de associação é o Odds Ratio ($OR$) pelo produto cruzado;</li>
      <li><strong>Mede EXPOSIÇÃO e DESFECHO SIMULTANEAMENTE em um único momento no tempo:</strong> Trata-se de um <strong>Estudo Transversal (Seccional ou Inquérito)</strong>. A medida calculada é a Prevalência e a Razão de Prevalências ($RP$). Atenção para a Causalidade Reversa e o Viés de Sobrevivência/Neyman.</li>
    </ul>
  </li>
</ol>

<h3>Quadro Sinóptico Integrador: Todos os Desenhos Lado a Lado</h3>
<table class="book-table">
  <thead>
    <tr>
      <th>Critério Comparativo</th>
      <th>Estudo Ecológico</th>
      <th>Estudo Transversal</th>
      <th>Estudo de Caso-Controle</th>
      <th>Estudo de Coorte</th>
      <th>Ensaio Clínico Randomizado</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Unidade de Análise</strong></td>
      <td>População / Agregado</td>
      <td>Indivíduo</td>
      <td>Indivíduo</td>
      <td>Indivíduo</td>
      <td>Indivíduo</td>
    </tr>
    <tr>
      <td><strong>Direcionalidade</strong></td>
      <td>Sem direção individual</td>
      <td>Simultânea (Instantânea)</td>
      <td>Do Desfecho $\rightarrow$ Exposição</td>
      <td>Da Exposição $\rightarrow$ Desfecho</td>
      <td>Da Intervenção $\rightarrow$ Desfecho</td>
    </tr>
    <tr>
      <td><strong>Temporalidade</strong></td>
      <td>Geralmente Transversal</td>
      <td>Transversal (Ponto único)</td>
      <td>Longitudinal Retrospectivo</td>
      <td>Longitudinal (Prosp. ou Retrosp.)</td>
      <td>Longitudinal Prospectivo</td>
    </tr>
    <tr>
      <td><strong>Custo e Duração</strong></td>
      <td>Mínimo e curtíssimo</td>
      <td>Baixo e rápido</td>
      <td>Intermediário e rápido</td>
      <td>Elevadíssimo e longo</td>
      <td>Extremamente elevado</td>
    </tr>
    <tr>
      <td><strong>Doenças Raras</strong></td>
      <td>Inadequado</td>
      <td>Inadequado</td>
      <td><strong>Excelente (Padrão-Ouro)</strong></td>
      <td>Péssimo / Inviável</td>
      <td>Inviável</td>
    </tr>
    <tr>
      <td><strong>Exposições Raras</strong></td>
      <td>Útil em contrastes geográficos</td>
      <td>Ruim</td>
      <td>Péssimo</td>
      <td><strong>Excelente (Padrão-Ouro)</strong></td>
      <td>Aplicável a novas drogas</td>
    </tr>
    <tr>
      <td><strong>Múltiplos Efeitos de 1 Fator</strong></td>
      <td>Limitado</td>
      <td>Limitado</td>
      <td>Não (Foco em 1 desfecho)</td>
      <td><strong>Sim (Excelente)</strong></td>
      <td>Sim (Desfechos 1º e 2º)</td>
    </tr>
    <tr>
      <td><strong>Múltiplas Causas de 1 Doença</strong></td>
      <td>Limitado</td>
      <td>Limitado</td>
      <td><strong>Sim (Excelente)</strong></td>
      <td>Limitado à exposição foco</td>
      <td>Não aplicável</td>
    </tr>
    <tr>
      <td><strong>Causalidade / Temporalidade</strong></td>
      <td>Nula</td>
      <td>Fraca (Causalidade Reversa)</td>
      <td>Boa (Risco de viés de memória)</td>
      <td><strong>Forte e Inconteste</strong></td>
      <td><strong>Máxima (Padrão-Ouro)</strong></td>
    </tr>
    <tr>
      <td><strong>Medida Canônica de Efeito</strong></td>
      <td>Coeficiente $r$ de Pearson</td>
      <td>Razão de Prevalências ($RP$)</td>
      <td>Odds Ratio ($OR$)</td>
      <td>Risco Relativo ($RR$)</td>
      <td>Risco Relativo, RRR, NNT</td>
    </tr>
  </tbody>
</table>

<h3>Armadilhas Conceituais Recorrentes nas Bancas</h3>
<div class="formula-box">
  <ul>
    <li><strong>Armadilha 1: Coorte Histórica vs Caso-Controle:</strong> Na coorte histórica, o estudo olha para trás apenas para <em>resgatar os dados de quem estava exposto</em> em $T_0$, mas os indivíduos são acompanhados prospectivamente a partir da exposição até o adoecimento. No caso-controle, o ponto de partida são os <em>indivíduos já doentes hoje</em>!</li>
    <li><strong>Armadilha 2: O Falso "Risco Relativo" em Caso-Controle:</strong> Jamais aceite uma alternativa que calcule Risco Relativo a partir de um estudo de caso-controle padrão, a não ser que a questão mencione explicitamente a <em>suposição de doença rara</em> e afirme que o Odds Ratio <em>estima</em> o RR;</li>
    <li><strong>Armadilha 3: Prevalência em Coorte:</strong> Estudos de coorte medem <strong>INCIDÊNCIA</strong> (casos novos que surgem ao longo do tempo), e não prevalência acumulada;</li>
    <li><strong>Armadilha 4: O "Ensaio Clínico Quase-Experimental":</strong> Se os participantes foram alocados para o tratamento sem processo aleatório (ex.: alocação por dia da semana, número de prontuário par/ímpar ou escolha do médico assistente), o estudo <strong>não é randomizado</strong>, perdendo a capacidade de balancear confundidores não mensurados.</li>
  </ul>
</div>
`
};
