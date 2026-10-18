// Bloco 4 - Aula 085: Medidas de Frequência: Incidência e Prevalência (Parte 1: Seções 1 a 4)

export const sec1 = {
  id: 'conceitos-fundamentais-razoes-proporcoes-taxas',
  title: '1. Fundamentos Matemáticos da Quantificação em Saúde: Razões, Proporções, Taxas e Índices',
  body_html: `
<h3>A Necessidade Epistemológica da Medição em Saúde Coletiva</h3>
<p>Em medicina clínica, o foco do raciocínio semiológico recai primariamente sobre o indivíduo: diagnosticar a afecção do paciente e definir a melhor terapêutica singular. Em saúde coletiva e epidemiologia, contudo, a unidade de observação é a <strong>população</strong>. Números absolutos de doentes ou de óbitos (frequência absoluta) raramente fornecem subsídios suficientes para a tomada de decisão em políticas públicas ou para a comparação fidedigna entre diferentes comunidades. Saber que um município registrou 500 mortes por infarto e outro registrou 50 mortes é insuficiente se não conhecermos o tamanho e a estrutura etária de suas respectivas populações.</p>

<p>Para conferir comparabilidade científica aos dados, a epidemiologia utiliza instrumentos matemáticos de quantificação divididos em quatro categorias operacionais rigorosamente cobradas em concursos médicos e no ENAMED:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Instrumento Matemático</th>
      <th>Definição Operacional e Relação Numerador / Denominador</th>
      <th>Propriedades Matemáticas e Intervalo de Valores</th>
      <th>Exemplos Clássicos em Saúde Pública</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Razão (Ratio)</strong></td>
      <td>Divisão direta entre duas quantidades mutuamente excludentes, em que <strong>o numerador NÃO está contido no denominador</strong> ($A / B$). As unidades de medida do numerador e do denominador podem ser iguais ou distintas.</td>
      <td>Adimensional ou com unidades compostas. Varia de 0 a $+\\infty$. Não é expressa em porcentagem.</td>
      <td>
        • <strong>Razão de Sexos (Razão Homem / Mulher):</strong> Número de homens dividido pelo número de mulheres em uma comunidade;<br>
        • <strong>Razão de Dependência:</strong> População de idosos ($\ge 65$ anos) e crianças ($&lt; 15$ anos) dividida pela população em idade ativa (15 a 64 anos);<br>
        • <strong>Razão Leito Hospitalar por Habitante:</strong> Número de leitos de UTI dividido pelo número total de residentes.
      </td>
    </tr>
    <tr>
      <td><strong>Proporção (Proportion)</strong></td>
      <td>Fração na qual <strong>o numerador ESTÁ OBRIGATORIAMENTE CONTIDO no denominador</strong> ($A / [A + B]$). Mede a fatia ou participação relativa de um subgrupo dentro do todo coletivo.</td>
      <td>Adimensional. Varia obrigatoriamente entre <strong>0 e 1 (ou de 0% a 100%)</strong>. Não inclui a dimensão temporal intrínseca em sua fórmula matemática.</td>
      <td>
        • <strong>Mortalidade Proporcional por Causa (Índice de Swaroop-Uemura):</strong> Percentual de todos os óbitos que ocorreram em pessoas com $\ge 50$ anos de idade;<br>
        • <strong>Mortalidade Proporcional por Doenças Cardiovasculares:</strong> Número de óbitos por IAM dividido pelo total geral de óbitos por todas as causas multiplicada por 100;<br>
        • <strong>Proporção de Partos Cesáreos:</strong> Partos cesáreos divididos pelo total de partos.
      </td>
    </tr>
    <tr>
      <td><strong>Taxa ou Coeficiente (Rate)</strong></td>
      <td>Medida dinâmica que quantifica a <strong>velocidade de ocorrência</strong> de um evento em uma população sob risco ao longo do <strong>tempo</strong>. O numerador representa os eventos novos observados em um período; o denominador representa a população sob risco multiplicada pela dimensão temporal ($A / [\\text{População sob risco} \\times \\text{Tempo}]$).</td>
      <td>Possui dimensão temporal estrita ($tempo^{-1}$). Multiplica-se rotineiramente por uma potência de 10 (habitualmente por 1.000, 10.000 ou 100.000 habitantes) para facilitar a interpretação epidemiológica.</td>
      <td>
        • <strong>Densidade de Incidência:</strong> Novos casos por pessoas-ano de seguimento;<br>
        • <strong>Coeficiente de Mortalidade Geral:</strong> Óbitos anuais por 1.000 habitantes;<br>
        • <strong>Taxa de Ataque:</strong> Novos casos em um surto restrito.
      </td>
    </tr>
    <tr>
      <td><strong>Índice (Index)</strong></td>
      <td>Termo de uso mais amplo e flexível na literatura, frequentemente empregado como sinônimo de razão ou indicador sintético composto construído para mensurar fenômenos multidimensionais complexos.</td>
      <td>Pode assumir diferentes escalas conforme a metodologia de ponderação.</td>
      <td>
        • <strong>Índice de Massa Corporal (IMC):</strong> Peso em quilogramas dividido pelo quadrado da altura em metros ($kg/m^2$);<br>
        • <strong>Índice de Desenvolvimento Humano (IDH):</strong> Média geométrica ponderada de longevidade, educação e renda per capita;<br>
        • <strong>Índice de Vulnerabilidade Social (IVS).</strong>
      </td>
    </tr>
  </tbody>
</table>

<h3>A Regra Básica de Ouro de Concursos: Taxa versus Proporção</h3>
<p>As bancas examinadoras de residência médica frequentemente constroem pegadinhas explorando a confusão entre <strong>Taxa de Mortalidade</strong> e <strong>Mortalidade Proporcional</strong>:</p>
<ul>
  <li><strong>Taxa / Coeficiente de Mortalidade por Câncer de Pulmão:</strong>
    $$\\text{Taxa} = \\frac{\\text{Óbitos por câncer de pulmão no ano}}{\\text{População total sob risco no meio do ano}} \\times 100.000$$
    Expressa o <strong>risco biológico real</strong> que um habitante daquela comunidade tem de morrer por câncer de pulmão.</li>
  <li><strong>Mortalidade Proporcional por Câncer de Pulmão:</strong>
    $$\\text{Mortalidade Proporcional} = \\frac{\\text{Óbitos por câncer de pulmão no ano}}{\\text{Total de óbitos por TODAS as causas no ano}} \\times 100$$
    Expressa apenas a <strong>fatia (importância relativa)</strong> que o câncer de pulmão representa dentro da mortalidade global daquele município. Se a mortalidade proporcional por infarto for alta (ex.: 30%), isso NÃO significa necessariamente que a população tem alto risco de morrer de infarto — pode significar apenas que as mortes por causas infecciosas e desnutrição infantil caíram drasticamente!</li>
</ul>
`
};

export const sec2 = {
  id: 'prevalencia-pontual-e-periodal',
  title: '2. Prevalência: Prevalência Pontual, Prevalência Periodal e Fatores Determinantes da Flutuação',
  body_html: `
<h3>O Conceito de Prevalência</h3>
<p>A <strong>Prevalência</strong> é a medida de frequência que quantifica o <strong>número total de casos existentes</strong> (casos antigos somados aos casos novos) de uma doença ou condição de saúde em um dado momento, dividida pela população total naquele mesmo instante. Em termos estatísticos, a prevalência é uma <strong>proporção pura</strong> (adimensional, variando de 0 a 100%), funcionando epidemiologicamente como uma <strong>fotografia instantânea</strong> da carga de morbidade da comunidade.</p>

<h3>Prevalência Pontual (ou Momentânea) versus Prevalência Periodal</h3>
<table class="book-table">
  <thead>
    <tr>
      <th>Modalidade de Prevalência</th>
      <th>Definição Operacional e Janela Temporal</th>
      <th>Fórmula Matemática Básica</th>
      <th>Cenários de Aplicação Prática</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Prevalência Pontual (Ponto no Tempo)</strong></td>
      <td>Quantifica os casos existentes em um <strong>dia ou instante calendário exato</strong> no tempo (uma data fixa específica).</td>
      <td>$$\\text{Prev Pontual} = \\frac{\\text{Nº de casos ativos no dia } T}{\\text{População total no dia } T} \\times 100$$</td>
      <td>Inquérito transversal em um asilo realizado em 10 de outubro de 2026 avaliando quantos idosos são portadores de hipertensão arterial cadastrada; prevalência de asma em uma escola no dia do exame médico admissional.</td>
    </tr>
    <tr>
      <td><strong>Prevalência Periodal (Período de Tempo)</strong></td>
      <td>Quantifica o número total de indivíduos que apresentaram a doença <strong>em qualquer momento ao longo de um intervalo temporal delimitado</strong> (um mês, um ano ou ao longo da vida - <em>lifetime prevalence</em>). O numerador engloba: (1) indivíduos que já estavam doentes no início do período, MAIS (2) indivíduos saudáveis que adoeceram durante o intervalo.</td>
      <td>$$\\text{Prev Periodal} = \\frac{\\text{Casos pré-existentes } + \\text{ Casos novos no período}}{\\text{População média estimada no período}} \\times 100$$</td>
      <td>"Qual a prevalência de depressão na população adulta brasileira nos últimos 12 meses?" (inquérito domiciliar anual); prevalência de enxaqueca ao longo da vida em estudantes de medicina.</td>
    </tr>
  </tbody>
</table>

<h3>A Dinâmica de Entrada e Saída: Fatores que Aumentam e Diminuem a Prevalência</h3>
<p>A prevalência de uma doença em uma população comporta-se analogamente ao nível de água dentro de uma represa:</p>
<ul>
  <li>A torneira que enche a represa é a <strong>Incidência</strong> (surgimento contínuo de casos novos);</li>
  <li>O ralo que esvazia a represa é a <strong>Cura</strong> ou o <strong>Óbito</strong> (saída definitiva de indivíduos da condição de doente).</li>
</ul>

<table class="book-table">
  <thead>
    <tr>
      <th>Fatores que ELEVAM a Prevalência</th>
      <th>Fatores que REDUZEM a Prevalência</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        • <strong>Aumento da Incidência:</strong> Aumento do número de casos novos entrando na população;<br>
        • <strong>Maior Sobrevida sem Cura (Prolongamento da Duração da Doença):</strong> Introdução de novos tratamentos farmacológicos que <em>não curam</em> a doença, mas <em>evitam o óbito precoce</em> (ex.: introdução da terapia antirretroviral altamente potente - TARV para o HIV/AIDS transformou uma doença aguda rapidamente fatal em afecção crônica de longa sobrevida, fazendo a prevalência de pessoas vivendo com HIV disparar!);<br>
        • <strong>Imigração de Casos Doentes:</strong> Chegada de indivíduos já infectados ou doentes procedentes de outras regiões;<br>
        • <strong>Emigração de Pessoas Sadias:</strong> Êxodo de indivíduos saudáveis, reduzindo o denominador e elevando a proporção relativa de doentes;<br>
        • <strong>Melhoria nos Recursos Diagnósticos e Rastreamento:</strong> Campanhas proativas de rastreamento com testes ultrassensíveis que detectam casos subclínicos e assintomáticos previamente ignorados.
      </td>
      <td>
        • <strong>Diminuição da Incidência:</strong> Medidas preventivas ou vacinação eficaz que impedem o surgimento de novos casos;<br>
        • <strong>Aumento das Taxas de Cura Rápida:</strong> Desenvolvimento de novos antibióticos ou procedimentos cirúrgicos curativos que encurtam a duração da doença (ex.: esquemas curativos de ação direta para Hepatite C que curam &gt; 95% dos pacientes em 12 semanas reduzem a prevalência rapidamente);<br>
        • <strong>Aumento da Letalidade (Morte Rápida):</strong> Se a doença for altamente letal e matar o paciente em poucas horas ou dias (ex.: Raiva humana, Ébola), o indivíduo permanece doente por pouquíssimo tempo antes de falecer, mantendo a prevalência extremamente baixa a despeito da gravidade!;<br>
        • <strong>Imigração de Pessoas Sadias:</strong> Chegada massiva de contingente populacional sem a doença (expansão do denominador);<br>
        • <strong>Emigração de Doentes:</strong> Deslocamento de pacientes para buscar tratamento em grandes centros hospitalares fora do município.
      </td>
    </tr>
  </tbody>
</table>
`
};

export const sec3 = {
  id: 'incidencia-acumulada-e-densidade-de-incidencia',
  title: '3. Incidência: Incidência Acumulada (Risco), Densidade de Incidência (Tempo-Pessoa) e Coortes Dinâmicas',
  body_html: `
<h3>O Conceito de Incidência</h3>
<p>Enquanto a prevalência reflete a carga estática dos casos existentes, a <strong>Incidência</strong> é a medida epidemiológica soberana para quantificar o <strong>surgimento de CASOS NOVOS</strong> de uma doença ao longo do tempo em uma população previamente livre do agravo. A incidência é a única medida epidemiológica capaz de estimar diretamente o <strong>RISCO</strong> ou a <strong>VELOCIDADE</strong> de adoecimento, sendo indispensável para estabelecer associações causais e avaliar o impacto de intervenções preventivas.</p>

<p>A incidência mensura-se sob duas formas metodológicas complementares:</p>

<h3>1. Incidência Acumulada (IA) ou Risco (Cumulative Incidence / Proportion)</h3>
<p>A <strong>Incidência Acumulada</strong> é a proporção de indivíduos inicialmente sadios e sob risco que desenvolvem a doença ao longo de um período de tempo predeterminado de acompanhamento. Ela parte da premissa teórica de que todos os indivíduos do estudo foram acompanhados de maneira homogênea durante todo o intervalo de seguimento (coorte fixa fechada):</p>

<div class="formula-box">
  $$\\text{Incidência Acumulada (IA)} = \\frac{\\text{Número de casos NOVOS surgidos no intervalo de tempo } \\Delta t}{\\text{Número de pessoas sob risco e livres da doença no INÍCIO do período}}$$
</div>

<p><strong>Propriedades da Incidência Acumulada:</strong></p>
<ul>
  <li>É uma <strong>proporção matemática</strong> (varia de 0 a 1 ou de 0% a 100%);</li>
  <li>Representa a <strong>probabilidade média (risco individual)</strong> de um membro daquela população desenvolver a doença no período considerado;</li>
  <li><strong>Exige sempre a menção explícita ao período de tempo:</strong> Dizer apenas que "a incidência acumulada foi de 5%" é incompleto; é indispensável afirmar "a incidência acumulada em 5 anos foi de 5%".</li>
</ul>

<h3>2. Densidade de Incidência (DI) ou Taxa de Incidência Pessoa-Tempo (Incidence Rate)</h3>
<p>Em estudos longitudinais da vida real (coortes abertas ou dinâmicas), nem todos os participantes entram no estudo na mesma data, nem permanecem em acompanhamento pelo mesmo tempo: alguns entram tardiamente, outros mudam de cidade (perda de seguimento), outros morrem por outras causas concorrentes e outros desenvolvem a doença no meio do seguimento, deixando de estar "sob risco".</p>

<p>Para contornar essa heterogeneidade de tempo de observação, a epidemiologia utiliza a <strong>Densidade de Incidência</strong>, cujo denominador não é a contagem simples de cabeças no início, mas sim a <strong>soma exata do tempo em que cada indivíduo da coorte permaneceu hígido e sob observação (Pessoas-Tempo ou Pessoas-Ano)</strong>:</p>

<div class="formula-box">
  $$\\text{Densidade de Incidência (DI)} = \\frac{\\text{Número de casos NOVOS observados}}{\\sum (\\text{Tempo de seguimento de cada indivíduo sob risco})}$$
</div>

<h3>Exemplo Prático de Cálculo de Pessoas-Ano de Seguimento</h3>
<p>Imagine uma coorte prospectiva de 5 indivíduos sadios acompanhados por um período máximo de 5 anos para avaliar o desenvolvimento de hipertensão arterial:</p>
<table class="book-table">
  <thead>
    <tr>
      <th>Indivíduo</th>
      <th>Histórico de Seguimento no Estudo</th>
      <th>Contribuição em Pessoas-Ano</th>
      <th>Desfecho Final</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Paciente A</strong></td>
      <td>Acompanhado durante os 5 anos completos sem adoecer.</td>
      <td>5 pessoas-ano</td>
      <td>Permaneceu sadio</td>
    </tr>
    <tr>
      <td><strong>Paciente B</strong></td>
      <td>Desenvolveu hipertensão arterial exatamente ao final do 2º ano de estudo.</td>
      <td>2 pessoas-ano</td>
      <td><strong>Caso Novo</strong> (cessou tempo sob risco aos 2 anos)</td>
    </tr>
    <tr>
      <td><strong>Paciente C</strong></td>
      <td>Mudou-se de cidade no final do 3º ano (perda de seguimento).</td>
      <td>3 pessoas-ano</td>
      <td>Censurado (perda de seguimento)</td>
    </tr>
    <tr>
      <td><strong>Paciente D</strong></td>
      <td>Faleceu vítima de acidente automobilístico ao final do 1º ano sem hipertensão.</td>
      <td>1 pessoa-ano</td>
      <td>Censurado (óbito concorrente)</td>
    </tr>
    <tr>
      <td><strong>Paciente E</strong></td>
      <td>Desenvolveu hipertensão arterial ao final do 4º ano de estudo.</td>
      <td>4 pessoas-ano</td>
      <td><strong>Caso Novo</strong> (cessou tempo sob risco aos 4 anos)</td>
    </tr>
    <tr>
      <td><strong>TOTAIS</strong></td>
      <td><strong>2 Casos Novos observados</strong></td>
      <td><strong>15 Pessoas-Ano totais</strong></td>
      <td>-</td>
    </tr>
  </tbody>
</table>

<div class="formula-box">
  $$\\text{Densidade de Incidência} = \\frac{2 \\text{ casos novos}}{15 \\text{ pessoas-ano}} = 0,1333 \\text{ casos por pessoa-ano} = 133,3 \\text{ casos por } 1.000 \\text{ pessoas-ano}$$
</div>
<p>Esse cálculo revela a verdadeira velocidade instantânea com que a hipertensão acomete os participantes da coorte, computando com precisão absoluta as perdas e períodos heterogêneos de observação.</p>
`
};

export const sec4 = {
  id: 'relacao-matematica-prevalencia-incidencia-duracao',
  title: '4. A Relação Fundamental entre Prevalência, Incidência e Duração Média da Doença (P ≈ I × D)',
  body_html: `
<h3>A Equação de Estado Estacionário: $P \\approx I \\times D$</h3>
<p>Em populações estáveis (onde a taxa de imigração iguala a taxa de emigração e a incidência e a sobrevida permanecem constantes ao longo do tempo), existe uma relação matemática direta, elegante e amplamente cobrada em provas que une a <strong>Prevalência ($P$)</strong>, a <strong>Incidência ($I$)</strong> e a <strong>Duração Média da Doença ($D$)</strong>:</p>

<div class="formula-box">
  $$P = \\frac{I \\times D}{1 + (I \\times D)}$$
</div>

<p>Quando a doença estudada apresenta uma prevalência baixa na população geral (como ocorre com a grande maioria das doenças crônicas ou infecciosas, onde $P &lt; 0,10$ ou $&lt; 10\\%$), o produto no denominador $1 + (I \\times D)$ aproxima-se de 1. Nesses cenários, a fórmula simplifica-se para a equação clássica de prova:</p>

<div class="formula-box">
  $$P \\approx I \\times D$$
  <p>Onde:<br>
  • $P$: Prevalência pontual da doença (proporção);<br>
  • $I$: Incidência da doença (casos por unidade de tempo);<br>
  • $D$: Duração média da doença na população (expressa na mesma unidade de tempo da incidência).</p>
</div>

<h3>Aplicações Clínicas e de Concurso da Fórmula $P \\approx I \\times D$</h3>
<p>As bancas utilizam essa relação para exigir do candidato a compreensão de quatro cenários paradigmáticos de saúde pública:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Cenário Epidemiológico Real</th>
      <th>Comportamento das Variáveis ($I$ e $D$)</th>
      <th>Impacto na Prevalência ($P$)</th>
      <th>Interpretação Clínica e Pegadinha de Prova</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Doenças Crônicas Incuráveis de Longa Duração</strong> (ex.: Diabetes Mellitus, Hipertensão, Artrite Reumatoide)</td>
      <td>Incidência moderada ou baixa ($I$), mas <strong>duração média extremamente prolongada ($D$ de 20 a 40 anos)</strong>.</td>
      <td><strong>Prevalência muito mais ALTA do que a Incidência anual ($P &gt;&gt; I$).</strong></td>
      <td>A constatação de alta prevalência NÃO significa que muitos casos novos estão surgindo naquele ano; significa apenas que os doentes acumulam-se ao longo de décadas sem falecer e sem curar.</td>
    </tr>
    <tr>
      <td><strong>Doenças Agudas Autolimitadas ou Hiperletais</strong> (ex.: Resfriado Comum, Dengue, Raiva Humana, Cólera grave)</td>
      <td>Incidência sazonal que pode ser explosiva ($I$ altíssima), mas <strong>duração média curtíssima ($D$ de poucos dias a semanas)</strong>.</td>
      <td><strong>Prevalência pontual muito mais BAIXA do que a Incidência acumulada anual ($P &lt;&lt; I$).</strong></td>
      <td>Se medirmos a prevalência pontual de resfriado em um dia qualquer de verão, ela será de apenas 1 a 2%, a despeito de a incidência acumulada ao longo do ano atingir 200 a 300 episódios por 100 habitantes.</td>
    </tr>
    <tr>
      <td><strong>Introdução de Terapia Medicamentosa que Evita o Óbito sem Curar</strong> (ex.: Insulina no Diabetes em 1922; TARV no HIV a partir de 1996)</td>
      <td>A Incidência ($I$) permanece inalterada, mas <strong>a Duração ($D$) aumenta vertiginosamente</strong> (aumenta a sobrevida dos doentes).</td>
      <td><strong>A Prevalência ($P$) SOBE expressivamente.</strong></td>
      <td><strong>Pegadinha Clássica:</strong> O aluno desatento conclui erroneamente que o tratamento falhou porque "aumentou o número de doentes". Na verdade, a elevação da prevalência decorreu do <strong>sucesso da droga em manter os pacientes vivos</strong>!</td>
    </tr>
    <tr>
      <td><strong>Introdução de Tratamento Curativo Rápido</strong> (ex.: Esquemas com Sofosbuvir/Velpatasvir na Hepatite C crônica)</td>
      <td>A Incidência ($I$) permanece igual ou cai, mas <strong>a Duração ($D$) despenca de décadas para 12 semanas</strong> (cura bacteriológica/virológica).</td>
      <td><strong>A Prevalência ($P$) DESPENCA rapidamente.</strong></td>
      <td>A redução da prevalência neste cenário decorre diretamente do aumento das taxas de cura definitiva, retirando centenas de milhares de pacientes do numerador.</td>
    </tr>
  </tbody>
</table>
`
};
