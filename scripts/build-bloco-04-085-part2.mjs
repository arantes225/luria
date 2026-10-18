// Bloco 4 - Aula 085: Medidas de Frequência: Incidência e Prevalência (Parte 2: Seções 5 a 8)

export const sec5 = {
  id: 'coeficientes-de-mortalidade-e-letalidade',
  title: '5. Coeficientes de Mortalidade Geral, Específica, Mortalidade Materna e Letalidade',
  body_html: `
<h3>O Conceito e o Escopo dos Coeficientes de Mortalidade</h3>
<p>A mortalidade é um dos indicadores mais sensíveis e amplamente consolidados para monitorar o estado de saúde, o desenvolvimento socioeconômico e a qualidade da atenção médica de uma nação. Os coeficientes de mortalidade quantificam a probabilidade ou o risco que os membros de uma determinada comunidade têm de falecer ao longo de um determinado período (geralmente um ano civil).</p>

<p>É fundamental compreender as distinções técnicas entre os três principais coeficientes de mortalidade cobrados nas provas do SUS e ENAMED:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Indicador Epidemiológico</th>
      <th>Fórmula Matemática Padronizada</th>
      <th>Base Demográfica Habitual</th>
      <th>Significado Clínico e Sanitário</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Coeficiente de Mortalidade Geral (CMG)</strong> ou Taxa Bruta de Mortalidade</td>
      <td>$$\\text{CMG} = \\frac{\\text{Total de óbitos por TODAS as causas no ano}}{\\text{População total residente no meio do ano}} \\times 1.000$$</td>
      <td>Por 1.000 habitantes</td>
      <td>Mede o risco global de morrer na comunidade. <strong>Limitação Crítica:</strong> É fortemente influenciado pela estrutura etária. Populações envelhecidas (como Itália, Japão ou o estado do Rio Grande do Sul) podem apresentar CMG maior do que países jovens e pobres (como Níger ou Bolívia), unicamente porque têm mais idosos na pirâmide etária. Para comparar CMG entre locais distintos, é <strong>obrigatório realizar a Padronização por Idade</strong> (método direto ou indireto).</td>
    </tr>
    <tr>
      <td><strong>Coeficiente de Mortalidade Específica por Causa</strong></td>
      <td>$$\\text{CME} = \\frac{\\text{Óbitos por uma CAUSA ESPECÍFICA no ano}}{\\text{População total sob risco no meio do ano}} \\times 100.000$$</td>
      <td>Por 100.000 habitantes</td>
      <td>Mede o risco biológico que um cidadão tem de morrer por aquela causa particular (ex.: infarto, neoplasia gástrica, acidente de trânsito). No Brasil, as principais causas gerais de óbito são: (1) Doenças do Aparelho Circulatório; (2) Neoplasias; (3) Causas Externas (trauma/violência); (4) Doenças do Aparelho Respiratório.</td>
    </tr>
    <tr>
      <td><strong>Taxa de Letalidade (Lethality Rate)</strong></td>
      <td>$$\\text{Letalidade} = \\frac{\\text{Número de óbitos por determinada DOENÇA}}{\\text{Número TOTAL de PESSOAS DIAGNOSTICADAS com a doença}} \\times 100$$</td>
      <td><strong>Porcentagem (%) pura</strong> (proporção de 0 a 100%)</td>
      <td><strong>Mede a GRAVIDADE BIOLÓGICA intrínseca da doença</strong> ou a eficácia/oportunidade dos cuidados médicos hospitalares. Não mede risco populacional!
      <br>• Raiva humana: letalidade $\\approx 100\\%$;
      <br>• Tétano neonatal: letalidade de 30% a 50%;
      <br>• Cólera tratada precocemente: letalidade $&lt; 1\\%$; sem tratamento: letalidade de 30% a 50%.</td>
    </tr>
  </tbody>
</table>

<h3>A Razão de Mortalidade Materna (RMM)</h3>
<p>A morte materna é considerada a mais trágica expressão da desigualdade em saúde e da negligência na assistência obstétrica. Define-se <strong>Óbito Materno</strong> (segundo a OMS e a CID-10) como a morte de uma mulher durante a gestação ou até <strong>42 dias após o término da gestação</strong> (puerpério precoce/tardio), devida a qualquer causa relacionada com ou agravada pela gravidez ou por medidas em relação a ela, mas <strong>NÃO por causas acidentais ou incidentais</strong> (ex.: homicídio, queda ou atropelamento de trânsito não são óbitos maternos!).</p>

<div class="formula-box">
  $$\\text{Razão de Mortalidade Materna (RMM)} = \\frac{\\text{Número de óbitos maternos (diretos e indiretos) no ano}}{\\text{Número de Nascidos Vivos (NV) no mesmo ano}} \\times 100.000$$
</div>

<p><strong>Por que o denominador é Nascidos Vivos e não a população de mulheres em idade fértil?</strong></p>
<p>Porque o número total de gestantes reais em uma população é praticamente impossível de mensurar (muitas gestações terminam em abortamentos precoces clandestinos ou subclínicos não registrados). O número de <strong>Nascidos Vivos</strong> funciona como a melhor aproximação demográfica confiável do volume de mulheres que efetivamente engravidaram e se expuseram ao risco obstétrico.</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Categoria de Óbito Materno</th>
      <th>Definição e Mecanismo Patológico</th>
      <th>Principais Causas no Brasil</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Causas Obstétricas Diretas (Aproximadamente 70% dos óbitos no Brasil)</strong></td>
      <td>Mortes decorrentes de <strong>complicações obstétricas do estado gravídico-puerperal</strong>, intervenções, omissões, tratamento incorreto ou de uma cadeia de eventos resultante de qualquer desses fatores. São quase 100% <strong>evitáveis</strong> com assistência qualificada.</td>
      <td>
        1. <strong>Síndromes Hipertensivas da Gestação</strong> (Pré-eclâmpsia grave, Eclâmpsia, Síndrome HELLP — 1ª causa disparada no Brasil);<br>
        2. <strong>Hemorragias Pós-parto</strong> (Atonia uterina, acretismo placentário, rotura uterina);<br>
        3. <strong>Infecções Puerperais / Sepse Obstétrica</strong> (Endometrite, sepse puerperal);<br>
        4. <strong>Abortamento Inseguro</strong> e suas complicações infecto-hemorrágicas.
      </td>
    </tr>
    <tr>
      <td><strong>Causas Obstétricas Indiretas (Aproximadamente 30% dos óbitos)</strong></td>
      <td>Mortes resultantes de <strong>doenças preexistentes</strong> ou de afecções que se desenvolveram durante a gravidez, não devidas a causas obstétricas diretas, mas que foram <strong>agravadas pelos efeitos fisiológicos normais da gestação</strong>.</td>
      <td>Cardiopatias congênitas ou reumáticas na gestante, nefropatias crônicas, lúpus eritematoso sistêmico, anemia falciforme, diabetes descompensado e infecções respiratórias graves (como H1N1 e COVID-19 em gestantes).</td>
    </tr>
    <tr>
      <td><strong>Morte Materna Tardia</strong></td>
      <td>Morte de uma mulher por causas obstétricas diretas ou indiretas ocorrida <strong>após 42 dias, mas antes de 1 ano completo após o término da gestação</strong>.</td>
      <td>Não entra no cálculo clássico da RMM oficial de 42 dias, mas deve ser notificada e investigada para monitoramento de sequelas graves.</td>
    </tr>
  </tbody>
</table>
`
};

export const sec6 = {
  id: 'mortalidade-infantil-e-seus-componentes',
  title: '6. Mortalidade Infantil e seus Componentes Temporais: Neonatal Precoce, Tardio e Pós-Neonatal',
  body_html: `
<h3>O Coeficiente de Mortalidade Infantil (CMI) como Termômetro Social</h3>
<p>O <strong>Coeficiente de Mortalidade Infantil (CMI)</strong> quantifica o risco que os recém-nascidos vivos têm de falecer antes de completar o <strong>primeiro ano de vida (menos de 365 dias)</strong>. Ele é universalmente reconhecido como o indicador isolado mais representativo do nível de desenvolvimento humano, infraestrutura de saneamento básico, escolaridade materna, nutrição e efetividade da atenção primária e hospitalar de uma nação:</p>

<div class="formula-box">
  $$\\text{Coeficiente de Mortalidade Infantil (CMI)} = \\frac{\\text{Número de óbitos em crianças menores de 1 ano no ano}}{\\text{Número total de Nascidos Vivos no mesmo ano}} \\times 1.000$$
</div>

<h3>Os Três Componentes Cronológicos da Mortalidade Infantil</h3>
<p>Para intervir de forma direcionada, a epidemiologia fragmenta a mortalidade do primeiro ano de vida em três períodos cronológicos estritos com determinantes fisiopatológicos e sociais completamente distintos:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Componente Cronológico</th>
      <th>Intervalo Etário Estrito</th>
      <th>Fórmula do Coeficiente (por 1.000 NV)</th>
      <th>Principais Causas de Óbito e Fatores Determinantes</th>
      <th>Estratégia de Redução no SUS</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>1. Neonatal Precoce</strong> (Representa a MAIOR parcela da mortalidade infantil no Brasil atual: ~50% a 55% dos óbitos)</td>
      <td>Do nascimento até <strong>6 dias completos de vida</strong> (0 a 6 dias).</td>
      <td>$$\\frac{\\text{Óbitos de 0 a 6 dias}}{\\text{Nascidos Vivos}} \\times 1.000$$</td>
      <td>
        • <strong>Prematuridade extrema</strong> e Síndrome do Desconforto Respiratório;<br>
        • <strong>Asfixia perinatal</strong> / anóxia ao nascer;<br>
        • Infecções congênitas e malformações congênitas graves.<br>
        <em>Determinante:</em> Qualidade da atenção médica no <strong>pré-natal, parto e assistência imediata em UTI neonatal</strong>.
      </td>
      <td>Fortalecimento da rede de urgência obstétrica, leitos de UTI neonatal e transporte neonatal de alta complexidade.</td>
    </tr>
    <tr>
      <td><strong>2. Neonatal Tardio</strong></td>
      <td>De <strong>7 dias até 27 dias completos de vida</strong> (7 a 27 dias).</td>
      <td>$$\\frac{\\text{Óbitos de 7 a 27 dias}}{\\text{Nascidos Vivos}} \\times 1.000$$</td>
      <td>
        • Complicações crônicas da prematuridade (displasia broncopulmonar, enterocolite necrosante);<br>
        • <strong>Infecções nosocomiais tardias</strong> em UTIs neonatais;<br>
        • Cardiopatias congênitas descompensadas.
      </td>
      <td>Controle de infecção hospitalar neonatal e acompanhamento ambulatorial de prematuros de alto risco (Método Canguru).</td>
    </tr>
    <tr>
      <td><strong>3. Pós-Neonatal (ou Infantil Tardio)</strong> (Componente que mais DESPENCOU no Brasil nas últimas décadas)</td>
      <td>De <strong>28 dias até 364 dias de vida</strong> (28 dias a 11 meses e 29 dias).</td>
      <td>$$\\frac{\\text{Óbitos de 28 a 364 dias}}{\\text{Nascidos Vivos}} \\times 1.000$$</td>
      <td>
        • <strong>Doenças Infecciosas e Parasitárias:</strong> Doença diarreica aguda e desidratação grave;<br>
        • <strong>Pneumonias e infecções respiratórias agudas</strong>;<br>
        • <strong>Desnutrição proteico-calórica</strong>.<br>
        <em>Determinante:</em> Condições socioeconômicas, <strong>saneamento básico, água tratada, moradia, aleitamento materno e vacinação infantil</strong>.
      </td>
      <td>Atenção Primária à Saúde (Estratégia Saúde da Família), expansão da rede de água/esgoto, vacinação universal (rotavírus, pneumocócica) e programas de transferência de renda.</td>
    </tr>
  </tbody>
</table>

<h3>A Transição Epidemiológica da Mortalidade Infantil no Brasil</h3>
<p>Historicamente, nas décadas de 1970 e 1980, a maior parte das mortes de crianças brasileiras ocorria no período <strong>pós-neonatal</strong>, provocada por desidratação secundária a gastroenterites, sarampo, desnutrição e broncopneumonias comunitárias em decorrência da miséria e ausência de saneamento. Com a expansão do saneamento, do aleitamento materno exclusivo, da vacinação infantil e da ESF, o componente pós-neonatal registrou uma queda espetacular de mais de 80%.</p>

<p>Como consequência dessa transição, o perfil inverteu-se: atualmente, mais de <strong>60% a 70% de todas as mortes no primeiro ano de vida concentram-se no período NEONATAL (0 a 27 dias)</strong>, especialmente na primeira semana (neonatal precoce). A redução do CMI hoje exige tecnologias médicas duras de alta complexidade: assistência obstétrica de excelência para prevenir partos prematuros e asfixia perinatal, e leitos qualificados de UTI neonatal.</p>

<h3>Coeficiente de Mortalidade Natimorta (ou Natimortalidade) e Perinatal</h3>
<ul>
  <li><strong>Natimortalidade (Óbito Fetal):</strong> Número de perdas fetais a partir de 22 semanas de gestação (ou peso fetal $\ge 500$ g) dividido pelo total de nascimentos (Nascidos Vivos + Natimortos) multiplicado por 1.000;</li>
  <li><strong>Mortalidade Perinatal:</strong> Engloba as perdas fetais a partir de 22 semanas MAIS os óbitos neonatais precoces (0 a 6 dias de vida) divididos pelo total de nascimentos por 1.000. É o indicador mais fidedigno da assistência obstétrica intraparto e perinatal global.</li>
</ul>
`
};

export const sec7 = {
  id: 'casos-clinicos-estruturados-medidas-frequencia',
  title: '7. Casos Clínicos Estruturados e Raciocínio Prático em Medidas de Frequência',
  body_html: `
<h3>Caso Clínico 1: Acompanhamento de Coorte de Trabalhadores e Pessoas-Tempo</h3>
<p><strong>Cenário:</strong> Um serviço de Medicina do Trabalho e Vigilância em Saúde acompanha uma coorte de 1.000 soldadores assintomáticos admitidos em uma indústria naval para monitorar o desenvolvimento de asma ocupacional ao longo de 4 anos de operação. No primeiro ano, todos os 1.000 trabalhadores foram acompanhados e 10 desenvolveram asma. No segundo ano, os 990 trabalhadores restantes foram acompanhados e 20 desenvolveram asma, enquanto 30 soldadores sadios pediram demissão no meio do ano (foram acompanhados por 0,5 ano cada). No terceiro ano, 940 trabalhadores iniciaram o ano; 15 desenvolveram asma e nenhum foi perdido. No quarto ano, os 925 restantes foram acompanhados até o fim e 10 desenvolveram asma.</p>

<p><strong>Questões Analíticas Práticas:</strong></p>
<ol>
  <li><em>Como calcular o total de pessoas-ano de seguimento acumulado?</em>
    <ul>
      <li>Ano 1: $1.000 \\text{ trabalhadores} \\times 1 \\text{ ano} = 1.000 \\text{ pessoas-ano}$;</li>
      <li>Ano 2: Para os 20 que adoeceram (tempo médio sob risco de 0,5 ano = 10 pessoas-ano), para os 30 que demitiram-se (0,5 ano = 15 pessoas-ano) e para os 940 sadios que completaram o ano (940 pessoas-ano) $\\rightarrow 10 + 15 + 940 = 965 \\text{ pessoas-ano}$;</li>
      <li>Ano 3: Para os 15 que adoeceram (0,5 ano = 7,5 pessoas-ano) e 925 sadios (925 pessoas-ano) $\\rightarrow 932,5 \\text{ pessoas-ano}$;</li>
      <li>Ano 4: Para os 10 que adoeceram (0,5 ano = 5 pessoas-ano) e 915 sadios (915 pessoas-ano) $\\rightarrow 920 \\text{ pessoas-ano}$;</li>
      <li><strong>Total de Pessoas-Ano Acumulado:</strong> $1.000 + 965 + 932,5 + 920 = 3.817,5 \\text{ pessoas-ano}$.</li>
    </ul>
  </li>
  <li><em>Qual foi a Densidade de Incidência de Asma Ocupacional?</em>
    $$\\text{DI} = \\frac{10 + 20 + 15 + 10}{3.817,5} = \\frac{55}{3.817,5} = 0,0144 \\text{ casos por pessoa-ano} = 14,4 \\text{ casos por } 1.000 \\text{ pessoas-ano}$$
  </li>
  <li><em>Qual a importância clínica desse dado?</em> Permite comparar a taxa de adoecimento dessa indústria naval com estaleiros internacionais que utilizam diferentes sistemas de exaustão de gases tóxicos, sem sofrer distorções pelo turnover de operários.</li>
</ol>

<h3>Caso Clínico 2: Avaliação Crítica da Mortalidade Infantil em Município do Interior</h3>
<p><strong>Cenário:</strong> Um gestor de saúde municipal comemora em coletiva de imprensa que o Coeficiente de Mortalidade Infantil do seu município caiu de 28 para 14 por 1.000 NV nos últimos 10 anos. Entretanto, ao analisar minuciosamente o Sistema de Informações sobre Mortalidade (SIM), a equipe de auditoria médica constata que o componente pós-neonatal despencou de 18 para 2 por 1.000 NV, enquanto a mortalidade neonatal precoce (0 a 6 dias) manteve-se estagnada em 10 por 1.000 NV e a natimortalidade subiu de 8 para 12 por 1.000 nascimentos.</p>

<p><strong>Interpretação e Condutas Mandatórias:</strong></p>
<ul>
  <li><strong>Diagnóstico de Saúde Coletiva:</strong> O município teve êxito pleno nas ações de saneamento ambiental, vacinação e atenção primária (o que eliminou as mortes pós-neonatais por diarreia e desnutrição), mas apresenta uma <strong>GRAVE FALHA NA REDE DE ATENÇÃO AO PRÉ-NATAL E AO PARTO HOSPITALAR</strong>;</li>
  <li>A persistência de alta taxa de mortalidade neonatal precoce e o aumento de natimortos traduzem mortes por asfixia perinatal, falta de leitos obstétricos de alto risco, transporte tardio de gestantes com pré-eclâmpsia descompensada e déficit de reanimação neonatal na sala de parto;</li>
  <li><strong>Plano de Ação Imediato:</strong> Implantação de auditoria obrigatória de todos os óbitos infantis e fetais pelo Comitê de Prevenção da Mortalidade Materno-Infantil, capacitação das equipes hospitalares na reanimação do prematuro e credenciamento de leitos de UTI neonatal regional.</li>
</ul>

<h3>Caso Clínico 3: Análise do Impacto de Novo Antirretroviral na Prevalência e Incidência</h3>
<p><strong>Cenário:</strong> Em um estudo populacional sobre HIV/AIDS em uma capital brasileira, observa-se que, após a introdução de novos esquemas antirretrovirais com inibidores de integrase de alta barreira genética (Dolutegravir), a taxa de mortalidade por AIDS caiu 70% e a incidência anual de novas infecções estabilizou-se em 25 casos por 100.000 habitantes. No entanto, o coeficiente de prevalência de pessoas vivendo com HIV subiu de 320 para 580 por 100.000 habitantes nos últimos 8 anos.</p>

<p><strong>Raciocínio Epidemiológico:</strong></p>
<p>A elevação da prevalência no cenário de incidência estável deve-se unicamente ao <strong>prolongamento dramático da sobrevida dos pacientes infectados ($D$)</strong> proporcionado pela terapia eficaz ($P \\approx I \\times D$). O paciente com HIV não morre mais precocemente por infecções oportunistas, mantendo-se vivo, assintomático e com carga viral indetectável por décadas. A prevalência acumulada reflete, portanto, o sucesso terapêutico absoluto do SUS, e não um fracasso preventivo!</p>
`
};

export const sec8 = {
  id: 'sintese-de-alto-rendimento-e-armadilhas-frequencia',
  title: '8. Síntese de Alto Rendimento e Diretrizes para o ENAMED e Residência Médica',
  body_html: `
<h3>Tabela Comparativa de Fórmulas Críticas para Memorização</h3>
<table class="book-table">
  <thead>
    <tr>
      <th>Indicador</th>
      <th>Numerador</th>
      <th>Denominador</th>
      <th>Multiplicador Habitual</th>
      <th>Conceito Central de Prova</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Prevalência</strong></td>
      <td>Casos existentes (antigos + novos)</td>
      <td>População total no mesmo instante</td>
      <td>$\times 100$ (%)</td>
      <td>Fotografia estática da carga de doença; não mede risco.</td>
    </tr>
    <tr>
      <td><strong>Incidência Acumulada</strong></td>
      <td>Casos novos no período $\Delta t$</td>
      <td>População sadia sob risco no início</td>
      <td>$\times 100$ ou $\times 1.000$</td>
      <td>Mede risco/probabilidade individual de adoecer.</td>
    </tr>
    <tr>
      <td><strong>Densidade de Incidência</strong></td>
      <td>Casos novos observados</td>
      <td>Soma das Pessoas-Tempo de seguimento</td>
      <td>$\times 1.000$ pessoas-ano</td>
      <td>Mede a velocidade instantânea em coortes dinâmicas.</td>
    </tr>
    <tr>
      <td><strong>Razão de Mortalidade Materna</strong></td>
      <td>Óbitos maternos (até 42 dias)</td>
      <td>Nascidos Vivos</td>
      <td>$\times 100.000$</td>
      <td>Denominador é NV (aproximação de gestantes reais).</td>
    </tr>
    <tr>
      <td><strong>Mortalidade Infantil</strong></td>
      <td>Óbitos em $&lt; 1$ ano de vida</td>
      <td>Nascidos Vivos</td>
      <td>$\times 1.000$</td>
      <td>Neonatal precoce (0 a 6d) é a maior causa hoje no Brasil.</td>
    </tr>
    <tr>
      <td><strong>Letalidade</strong></td>
      <td>Óbitos por determinada doença</td>
      <td>Total de doentes diagnosticados</td>
      <td>$\times 100$ (%)</td>
      <td>Mede gravidade intrínseca; não mede risco populacional.</td>
    </tr>
  </tbody>
</table>
`
};
