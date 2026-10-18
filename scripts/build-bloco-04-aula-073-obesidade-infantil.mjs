import { saveBook } from './bloco-04-utils.mjs';

const book = {
  slug: 'obesidade-infantil',
  title: 'Obesidade Infantil',
  area: 'Pediatria',
  materia: 'Nutrologia Pediátrica e Endocrinologia Pediátrica',
  description: 'Tratado completo de Obesidade Infantil e na Adolescência: epidemiologia brasileira e transição nutricional com dados SISVAN/POF-IBGE; avaliação antropométrica pelas curvas de crescimento OMS 2006/2007 (escores-z e percentis para 0 a 5 anos e 5 a 19 anos); diagnóstico diferencial minucioso entre obesidade exógena/nutricional (95%) e causas endógenas e sindrômicas (5%), incluindo Prader-Willi, hipotireoidismo, Cushing e craniofaringioma; complicações metabólicas e cardiovasculares precoces (Síndrome Metabólica pelos critérios IDF/SBP, MASLD/esteatose hepática dismetabólica pediátrica, dislipidemia aterogênica e DM2); afecções ortopédicas mecânicas (epifisiólise proximal do fêmur e doença de Blount); SAHOS e pseudotumor cerebral; manejo terapêutico escalonado com intervenção multiprofissional no estilo de vida, tempo de tela, farmacoterapia pediátrica (Liraglutida, Semaglutida e Orlistate) e critérios formais para cirurgia bariátrica na adolescência; casos clínicos detalhados e questões comentadas de provas de residência médica e ENAMED.',
  sections: [
    {
      id: 'epidemiologia-transicao-nutricional-brasil',
      title: '1. Epidemiologia e Transição Nutricional na Infância Brasileira',
      body_html: `
<h3>O Fenômeno da Transição Nutricional no Brasil</h3>
<p>Nas últimas cinco décadas, o Brasil vivenciou uma das transições demográficas, epidemiológicas e nutricionais mais aceleradas do mundo. Historicamente marcado pela prevalência alarmante de desnutrição energético-proteica primária e carências de micronutrientes em crianças menores de cinco anos (com destaque para a xeroftalmia e o bócio endêmico), o perfil epidemiológico pediátrico nacional deslocou-se de forma contundente em direção ao sobrepeso e à obesidade em todos os estratos socioeconômicos e faixas etárias.</p>
<p>Esse fenômeno, denominado <strong>transição nutricional</strong>, foi impulsionado por profundas modificações estruturais na sociedade brasileira:</p>
<ul>
  <li><strong>Urbanização acelerada e modificação dos padrões de moradia:</strong> Migração maciça para centros urbanos, verticalização das residências, redução drástica de espaços públicos seguros para lazer e recreação ativa ao ar livre;</li>
  <li><strong>Industrialização alimentar e expansão do consumo de ultraprocessados:</strong> Barateamento e penetração massiva de alimentos de alta densidade calórica, ricos em açúcares livres, gorduras saturadas, gorduras hidrogenadas, aditivos químicos e sódio, em detrimento dos alimentos <em>in natura</em> ou minimamente processados da dieta tradicional brasileira (arroz, feijão, hortaliças e frutas);</li>
  <li><strong>Revolução digital e expansão do comportamento sedentário:</strong> Substituição precoce de atividades lúdicas ativas por telas digitais (smartphones, tablets, videogames e televisores), reduzindo o gasto energético diário e induzindo o consumo passivo de publicidade de alimentos hiperpalatáveis e pouco saudáveis;</li>
  <li><strong>Inserção materna no mercado de trabalho sem suporte estrutural:</strong> Redução do tempo disponível para o preparo doméstico das refeições, desmame precoce inadvertido e uso precoce de fórmulas infantis inadequadamente preparadas ou leite de vaca integral associado a farináceos açucarados nos primeiros meses de vida.</li>
</ul>

<h3>Dados Epidemiológicos Atuais: SISVAN, POF e ENANI</h3>
<p>Os inquéritos populacionais mais recentes do Ministério da Saúde e do Instituto Brasileiro de Geografia e Estatística (IBGE) consolidam a magnitude da epidemia de obesidade na infância e adolescência:</p>
<table class="book-table">
  <thead>
    <tr>
      <th>Fonte de Dados e Ano</th>
      <th>Faixa Etária Avaliada</th>
      <th>Prevalência Encontrada</th>
      <th>Implicações Clínico-Epidemiológicas</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>ENANI-2019</strong><br>(Estudo Nacional de Alimentação e Nutrição Infantil)</td>
      <td>Crianças menores de 5 anos (0 a 59 meses)</td>
      <td>• Risco de sobrepeso (escore-z IMC &gt; +1): 18,3%<br>• Sobrepeso efetivo (escore-z IMC &gt; +2): 7,0%<br>• Obesidade infantil (escore-z IMC &gt; +3): 3,0%</td>
      <td>Aproximadamente 3 em cada 10 lactentes e pré-escolares brasileiros apresentam excesso de peso corporal antes mesmo de completarem cinco anos de vida, com maior concentração nas regiões Sul e Sudeste.</td>
    </tr>
    <tr>
      <td><strong>SISVAN / Ministério da Saúde</strong><br>(Sistema de Vigilância Alimentar e Nutricional - Dados Consolidados Recentes)</td>
      <td>Crianças de 5 a 9 anos atendidas na Atenção Primária à Saúde</td>
      <td>• Excesso de peso total (sobrepeso + obesidade + obesidade grave): ~31,5%<br>• Obesidade isolada: 14,8%<br>• Obesidade grave: 5,3%</td>
      <td>Mais de 1 em cada 3 crianças em idade escolar no SUS apresenta excesso de peso, evidenciando o fracasso das abordagens puramente individuais e a necessidade de políticas públicas estruturadas.</td>
    </tr>
    <tr>
      <td><strong>POF / IBGE e PeNSE</strong><br>(Pesquisa Nacional de Saúde do Escolar)</td>
      <td>Adolescentes de 10 a 19 anos</td>
      <td>• Sobrepeso: ~24% a 28%<br>• Obesidade: ~8% a 10%<br>• Consumo diário de ultraprocessados &gt; 80% dos escolares</td>
      <td>Cerca de 80% dos adolescentes que chegam à fase final da puberdade obesos permanecerão obesos na vida adulta, com risco 3 a 5 vezes maior de eventos cardiovasculares prematuros.</td>
    </tr>
  </tbody>
</table>

<h3>A Dupla Carga de Má Nutrição no Cenário Brasileiro</h3>
<p>Um aspecto de extrema relevância para a saúde pública e frequentemente explorado em provas de Medicina Preventiva e Pediatria é a <strong>dupla carga de má nutrição</strong> (<em>double burden of malnutrition</em>). Trata-se da coexistência, no mesmo país, na mesma comunidade ou até mesmo no interior da mesma unidade familiar, de problemas nutricionais decorrentes de déficit (desnutrição crônica com baixa estatura, anemia ferropriva, carência de vitamina A) e problemas decorrentes de excesso (obesidade, dislipidemia, resistência insulínica e hipertensão arterial).</p>
<p>Em famílias em situação de vulnerabilidade socioeconômica, é comum encontrar a mãe ou um dos irmãos com obesidade e baixa estatura (fruto de alimentação hipercalórica barata, porém extremamente pobre em micronutrientes e proteínas nobres), enquanto um lactente apresenta anemia ferropriva grave ou desnutrição pregressa.</p>
`
    },
    {
      id: 'avaliacao-antropometrica-curvas-oms-escore-z',
      title: '2. Avaliação Antropométrica e Curvas de Crescimento da OMS 2006/2007',
      body_html: `
<h3>Padrões de Crescimento da Organização Mundial da Saúde</h3>
<p>O diagnóstico de sobrepeso e obesidade na infância e na adolescência baseia-se primordialmente em critérios antropométricos padronizados internacionalmente. Em 2006, a Organização Mundial da Saúde publicou as Curvas de Crescimento Infantil para crianças de 0 a 5 anos (0 a 59 meses), construídas a partir do estudo multicêntrico <em>Multicentre Growth Reference Study</em> (MGRS), que acompanhou crianças em condições ideais de saúde, nutrição e aleitamento materno exclusivo em seis países (incluindo o Brasil, na cidade de Pelotas-RS). Em 2007, a OMS estendeu esse padrão para a faixa etária de 5 a 19 anos (revisão baseada em dados históricos do NCHS de 1977 com refinamento estatístico).</p>
<p>O Ministério da Saúde do Brasil e a Sociedade Brasileira de Pediatria (SBP) adotam oficialmente as curvas da OMS expressas em <strong>Escore-z (desvio-padrão)</strong> para a avaliação do Índice de Massa Corporal para a idade (IMC/I).</p>

<h3>Classificação do IMC para Idade por Escore-z: A Divisão por Faixas Etárias</h3>
<p>Esta é uma das tabelas mais cobradas em provas de residência médica de todo o país. O candidato precisa atentar obrigatoriamente para a diferença dos pontos de corte entre as faixas etárias de <strong>0 a 5 anos</strong> e de <strong>5 a 19 anos</strong>:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Escore-z de IMC para Idade (IMC/I)</th>
      <th>Crianças de 0 a 5 anos incompletos<br>(0 a 59 meses) — Padrão OMS 2006</th>
      <th>Crianças e Adolescentes de 5 a 19 anos<br>(60 a 228 meses) — Padrão OMS 2007</th>
      <th>Percentil Equivalente Aproximado</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>&lt; Escore-z -3</strong></td>
      <td>Magreza acentuada</td>
      <td>Magreza acentuada</td>
      <td>&lt; P 0,1</td>
    </tr>
    <tr>
      <td><strong>&ge; Escore-z -3 e &lt; -2</strong></td>
      <td>Magreza</td>
      <td>Magreza</td>
      <td>P 0,1 a P 3</td>
    </tr>
    <tr>
      <td><strong>&ge; Escore-z -2 e &le; +1</strong></td>
      <td><strong>Eutrofia</strong></td>
      <td><strong>Eutrofia</strong></td>
      <td>P 3 a P 85</td>
    </tr>
    <tr>
      <td><strong>&gt; Escore-z +1 e &le; +2</strong></td>
      <td><strong>Risco de sobrepeso</strong></td>
      <td><strong>Sobrepeso</strong></td>
      <td>&gt; P 85 e &le; P 97</td>
    </tr>
    <tr>
      <td><strong>&gt; Escore-z +2 e &le; +3</strong></td>
      <td><strong>Sobrepeso</strong></td>
      <td><strong>Obesidade</strong></td>
      <td>&gt; P 97 e &le; P 99,9</td>
    </tr>
    <tr>
      <td><strong>&gt; Escore-z +3</strong></td>
      <td><strong>Obesidade</strong></td>
      <td><strong>Obesidade grave</strong></td>
      <td>&gt; P 99,9</td>
    </tr>
  </tbody>
</table>

<h3>Armadilha Conceitual Decisiva para o ENAMED</h3>
<p>Observe com atenção cirúrgica a assimetria entre os dois grupos:</p>
<ul>
  <li><strong>Na criança menor de 5 anos:</strong> O escore-z &gt; +1 é chamado apenas de <strong>"Risco de sobrepeso"</strong> (não é doença consolidada; indica sinal de alerta para orientação nutricional). O <strong>"Sobrepeso"</strong> ocorre entre &gt; +2 e &le; +3, e a <strong>"Obesidade"</strong> é diagnosticada apenas quando o escore-z ultrapassa <strong>+3</strong>. Não existe a categoria "obesidade grave" nessa faixa etária na tabela do SISVAN/OMS.</li>
  <li><strong>Na criança de 5 a 19 anos:</strong> Houve um "deslocamento para baixo" nos nomes das categorias. O escore-z &gt; +1 já configura <strong>"Sobrepeso"</strong>; o escore-z &gt; +2 já configura <strong>"Obesidade"</strong>; e o escore-z &gt; +3 passa a denominar-se <strong>"Obesidade grave"</strong>!</li>
</ul>

<h3>Outros Índices Antropométricos e Medidas Complementares</h3>
<p>Além do IMC para idade, outros parâmetros antropométricos são cruciais na consulta pediátrica:</p>
<ol>
  <li><strong>Peso para Estatura (P/E) em menores de 5 anos:</strong> Muito útil no lactente jovem para diferenciar se o ganho ponderal está desproporcional ao comprimento linear. Seus pontos de corte espelham os do IMC/I (&gt; +1 risco de sobrepeso, &gt; +2 sobrepeso, &gt; +3 obesidade);</li>
  <li><strong>Circunferência da Cintura (CC) / Perímetro Abdominal:</strong> Excelente marcador de adiposidade visceral e acúmulo de gordura ectópica intra-abdominal. Deve ser aferida no ponto médio entre a borda inferior da última costela e a crista ilíaca ântero-superior, ao final de uma expiração normal. Valores &ge; percentil 90 para idade e sexo constituem o critério diagnóstico mandatário de obesidade abdominal para a definição de Síndrome Metabólica;</li>
  <li><strong>Relação Cintura/Estatura (RCE):</strong> Razão matemática simples (Cintura em cm / Estatura em cm). Valores &ge; 0,5 em crianças acima de 5 anos e adolescentes são altamente preditivos de risco cardiovascular e dismetabolismo, independentemente da etnia;</li>
  <li><strong>Prega Cutânea Tricipital (PCT) e Subescapular (PCSE):</strong> Avaliam a espessura do tecido celular subcutâneo periférico e central. Embora úteis em pesquisa, têm grande variabilidade interobservador na prática da atenção primária.</li>
</ol>
`
    },
    {
      id: 'fisiopatologia-obesidade-exogena-versus-endogena',
      title: '3. Fisiopatologia: Obesidade Exógena (Nutricional) versus Endógena (Sindrômica)',
      body_html: `
<h3>A Divisão Etiológica Fundamental: 95% vs 5%</h3>
<p>Diante de uma criança com excesso de peso no consultório, a primeira e mais decisiva pergunta clínica que o pediatra deve responder é: <em>trata-se de uma obesidade comum (exógena/nutricional) ou de uma obesidade secundária/endógena (genética, sindrômica ou neuroendócrina)?</em></p>
<p>Em mais de <strong>95% dos casos pediátricos</strong>, a etiologia é <strong>exógena ou nutricional</strong>, resultante da interação entre vulnerabilidade genética poligênica e ambiente obesogênico (balanço energético positivo crônico). Apenas <strong>menos de 5% dos casos</strong> decorrem de causas endógenas ou sindrômicas monogênicas.</p>

<h3>O Eixo Decisor Clínico: Velocidade de Crescimento e Estatura</h3>
<p>O divisor de águas clínico mais poderoso para separar a obesidade exógena da obesidade endógena é o <strong>comportamento da curva de crescimento estatural (Estatura para Idade e Velocidade de Crescimento)</strong>:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Parâmetro Clínico</th>
      <th>Obesidade Exógena / Nutricional (Comum)<br>(95% dos casos)</th>
      <th>Obesidade Endógena / Secundária / Sindrômica<br>(&lt; 5% dos casos)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Velocidade de Crescimento Linear</strong></td>
      <td><strong>Normal ou Acelerada.</strong> A criança cresce na média ou acima do percentil familiar durante a fase pré-puberal.</td>
      <td><strong>Diminuída / Desacelerada.</strong> Ocorre parada, queda de canal de crescimento ou velocidade de crescimento francamente patológica (&lt; 4-5 cm/ano).</td>
    </tr>
    <tr>
      <td><strong>Estatura para a Idade (E/I)</strong></td>
      <td><strong>Normal ou Alta para a Idade.</strong> Quase sempre no percentil 50 ou acima dele (frequentemente p75-p90).</td>
      <td><strong>Baixa Estatura Desproporcional ou Proporcional.</strong> Quase sempre abaixo do percentil 3 ou escore-z &lt; -2.</td>
    </tr>
    <tr>
      <td><strong>Idade Óssea (RX de mãos e punhos)</strong></td>
      <td><strong>Compatível ou Ligeiramente Adiantada</strong> em relação à idade cronológica (devido ao hiperinsulinismo e conversão periférica de androgênios em estrogênios pela aromatase adipocitária).</td>
      <td><strong>Atrasada</strong> (no hipotireoidismo, deficiência de GH) ou desregulada (em displasias esqueléticas).</td>
    </tr>
    <tr>
      <td><strong>Desenvolvimento Neuropsicomotor</strong></td>
      <td>Normal. Criança sem atraso cognitivo nem déficits neurológicos.</td>
      <td>Frequentemente associado a <strong>atraso neuropsicomotor, déficit intelectual</strong> ou hipotonia neonatal marcante.</td>
    </tr>
    <tr>
      <td><strong>Exame Físico Específico</strong></td>
      <td>Distribuição generalizada de gordura corporal, acantose nigricans comum, ausência de dismorfismos faciais ou alterações esqueléticas congênitas.</td>
      <td><strong>Estigmas dismórficos:</strong> fácies sindrômica, hipogonadismo, micropênis, criptorquidia, polidactilia, mãos/pés pequenos, estrias violáceas largas (&gt; 1 cm), bócio.</td>
    </tr>
    <tr>
      <td><strong>História Familiar</strong></td>
      <td>Presença constante de pais e irmãos com sobrepeso, obesidade, diabetes mellitus tipo 2 e dislipidemia.</td>
      <td>História de consanguinidade familiar (nas síndromes autossômicas recessivas) ou mutações de novo.</td>
    </tr>
  </tbody>
</table>

<h3>Fisiopatologia Molecular da Obesidade Comum</h3>
<p>O tecido adiposo branco deixou de ser considerado um mero reservatório inerte de triglicerídeos e passou a ser reconhecido como o maior órgão endócrino e imunológico do organismo humano. Na obesidade exógena, a sobrecarga calórica crônica provoca:</p>
<ol>
  <li><strong>Hipertrofia e Hiperplasia Adipocitária:</strong> O adipócito expande seu volume intracelular até um ponto crítico de estresse mecânico e hipóxia tecidual. Quando a capacidade de hipertrofia se esgota, ocorre diferenciação de pré-adipócitos (hiperplasia), com perda da regulação homeostática;</li>
  <li><strong>Infiltração Macrofágica e Inflamação Estéril de Baixo Grau:</strong> A hipóxia adipocitária recruta monócitos circulantes que se diferenciam em macrófagos M1 pró-inflamatórios, organizando-se em coroas ao redor de adipócitos necróticos (estruturas tipo <em>crown-like structures</em>). Esses macrófagos secretam citocinas inflamatórias, incluindo Fator de Necrose Tumoral Alfa (TNF-&alpha;), Interleucina-6 (IL-6) e proteína quimiotática de monócitos 1 (MCP-1);</li>
  <li><strong>Resistência à Insulina Molecular:</strong> O TNF-&alpha; e os ácidos graxos livres intracelulares (DAGs e ceramidas) ativam quinases de estresse (JNK, IKK-&beta;), promovendo a fosforilação anômala em resíduos de serina/treonina do substrato do receptor de insulina 1 (IRS-1). Isso bloqueia a cascata PI3K/Akt e impede a translocação do transportador de glicose <strong>GLUT-4</strong> para a membrana dos miócitos e adipócitos;</li>
  <li><strong>Disregulação das Adipocinas (Leptina vs Adiponectina):</strong> Ocorre aumento acentuado da <strong>leptina circulante</strong>, gerando <em>resistência central à leptina</em> nos receptores do núcleo arqueado hipotalâmico (o cérebro não recebe o sinal de saciedade e mantém a sensação de fome). Concomitantemente, há redução drástica da <strong>adiponectina</strong>, uma adipocina protetora que possui ações anti-inflamatórias, antiaterogênicas e sensibilizadoras de insulina.</li>
</ol>
`
    },
    {
      id: 'sindromes-geneticas-endocrinopatias-obesidade',
      title: '4. Causas Endógenas e Sindrômicas: Prader-Willi, Hipotireoidismo, Cushing e Craniofaringioma',
      body_html: `
<h3>Síndromes Genéticas com Obesidade</h3>
<p>As síndromes genéticas e defeitos monogênicos do eixo leptina-melanocortina constituem modelos patológicos clássicos cobrados com frequência em exames de alto nível:</p>

<h3>1. Síndrome de Prader-Willi (SPW)</h3>
<p>A Síndrome de Prader-Willi é a causa genética mais comum de obesidade mórbida sindrômica na infância (incidência aproximada de 1:15.000 a 1:25.000 nascidos vivos). Decorre da <strong>ausência de expressão de genes de herança paterna na região cromossômica 15q11-q13</strong>, decorrente de:</p>
<ul>
  <li>Deleção da região 15q11-q13 paterna (70% dos casos);</li>
  <li>Dissomia uniparental materna do cromossomo 15 (dois cromossomos 15 herdados da mãe, nenhum do pai — 25% dos casos);</li>
  <li>Defeito no centro de imprinting genômico (1-3%).</li>
</ul>
<p><strong>Apresentação Clínica Bifásica Típica:</strong></p>
<ol>
  <li><strong>Fase Neonatal e de Lactente (0 a 1-2 anos):</strong> Marcada por <em>hipotonia muscular severa ("bebê mole" ou floppy infant)</em>, reflexo de sucção extremamente débil, dificuldade alimentar com recusa de mamadas e falha de crescimento pôndero-estatural (<em>failure to thrive</em>). O choro é fraco e a letargia é comum;</li>
  <li><strong>Fase de Transição e Infância (a partir de 2 a 4 anos):</strong> Resolução da hipotonia seguida por <em>hiperfagia compulsiva, insaciável e incontrolável</em> decorrente de falha grave nos circuitos hipotalâmicos de saciedade (disfunção da via POMC/MC4R associada a níveis marcadamente elevados de <strong>grelina</strong> circulante). A criança desenvolve comportamento obsessivo por comida (rouba alimentos, come do lixo, quebra trincos de despensas), culminando em obesidade mórbida rápida e refratária;</li>
  <li><strong>Estigmas Físicos e Endócrinos Clássicos:</strong> Baixa estatura desproporcional (deficiência funcional de GH), mãos e pés notavelmente pequenos (acromicria), fendas palpebrais amendoadas com diâmetro bitemporal estreito, boca em tenda de peixe, estrabismo, pele e cabelos mais claros que os familiares (hipopigmentação), <em>hipogonadismo hipogonadotrófico</em> (criptorquidia bilateral, micropênis, hipoplasia escrotal) e déficit intelectual leve a moderado com labilidade comportamental.</li>
</ol>

<h3>2. Síndrome de Down (Trissomia do 21)</h3>
<p>A criança com Síndrome de Down apresenta predisposição biológica marcante ao sobrepeso e à obesidade, desencadeada por menor taxa metabólica basal de repouso (em torno de 10% a 15% inferior à esperada), hipotonia muscular com menor gasto energético ativo, alta prevalência de hipotireoidismo autoimune associado e preferências alimentares restritas. A obesidade piora drasticamente o risco de SAHOS em virtude da hipoplasia do terço médio da face, macroglossia relativa e laringomalácia associadas.</p>

<h3>3. Síndrome de Bardet-Biedl e Síndrome de Alström</h3>
<p>São ciliopatias genéticas raras caracterizadas por obesidade precoce grave associada a distrofia retiniana (retinite pigmentosa com cegueira progressiva), polidactilia pós-axial (em Bardet-Biedl), hipogonadismo, disfunção renal progressiva e déficit cognitivo.</p>

<h3>Endocrinopatias Clássicas que Cursam com Obesidade</h3>
<table class="book-table">
  <thead>
    <tr>
      <th>Endocrinopatia</th>
      <th>Mecanismo Fisiopatológico</th>
      <th>Quadro Clínico Distintivo</th>
      <th>Exames Diagnósticos Iniciais</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Hipotireoidismo (Adquirido / Tireoidite de Hashimoto)</strong></td>
      <td>Queda dos níveis de T4 livre e T3, resultando em diminuição expressiva da taxa metabólica basal e retenção tecidual de glicosaminoglicanos hidrofílicos (mixedema subcutâneo).</td>
      <td><strong>Atenção:</strong> O hipotireoidismo causa ganho ponderal DISCRETO (2 a 4 kg, primariamente líquido), mas <strong>parada dramática do crescimento estatural</strong>. A criança fica "baixa e roliça". Pele seca e fria, bócio tireoidiano palpável, constipação crônica, bradicardia, intolerância ao frio, lentidão cognitiva e reflexo aquileu com fase de relaxamento lentificada.</td>
      <td><strong>TSH sérico elevado</strong> com <strong>T4 livre reduzido</strong>; Anticorpos anti-TPO (tireoperoxidase) e antitireoglobulina positivos na etiologia autoimune.</td>
    </tr>
    <tr>
      <td><strong>Síndrome de Cushing (Hipercortisolismo Pediátrico)</strong></td>
      <td>Excesso suprafisiológico crônico de glicocorticoides (exógeno por uso inadvertido de corticoides orais/tópicos/inalatórios; ou endógeno por adenoma hipofisário secretor de ACTH - Doença de Cushing, ou adenoma/carcinoma adrenal).</td>
      <td><strong>Parada imediata do crescimento linear associada a ganho de peso centrípeto rápido</strong> (o cortisol inibe o GH e a placa epifisária). Fácies em "lua cheia", rubor malar, giba gordurosa dorsal ("giba de búfalo"), <strong>estrias violáceas largas (&gt; 1 cm)</strong> no abdome, flancos e coxas, equimoses espontâneas, osteopenia grave com fraturas patológicas, hipertensão arterial sistêmica e hirsutismo/acne por co-secreção de androgênios adrenais.</td>
      <td>Cortisol salivar noturno (23h), cortisol livre urinário de 24 horas e/ou teste de supressão noturna com dose baixa de dexametasona (1 mg ou 20 mcg/kg). ACTH sérico para localização etiológica.</td>
    </tr>
    <tr>
      <td><strong>Obesidade Hipotalâmica (Craniofaringioma e Lesões do SNC)</strong></td>
      <td>Destruição mecânica ou inflamatória dos núcleos ventromediais e paraventriculares do hipotálamo (centros de saciedade e tônus simpático), frequentemente por <em>craniofaringioma</em> (tumor embrionário benigno derivado da bolsa de Rathke) ou cirurgia/radioterapia de fossa posterior.</td>
      <td>Hiperfagia hiperaguda descontrolada associada a <strong>sinais de hipertensão intracraniana</strong> (cefaleia matinal com vômitos em jato), <strong>alterações campimétricas visuais</strong> (hemianopsia bitemporal por compressão do quiasma óptico), pan-hipopituitarismo (deficiência de GH, ACTH, TSH e diabetes insipidus com poliúria e polidipsia).</td>
      <td><strong>Ressonância Magnética de Encéfalo / Sela Túrcica</strong> demonstrando lesão tumoral sólida/cística com calcificações selar e suprasselar características; dosagem hormonal hipofisária completa.</td>
    </tr>
  </tbody>
</table>
`
    },
    {
      id: 'complicacoes-metabolicas-cardiovasculares-masld',
      title: '5. Complicações Metabólicas e Cardiovasculares: Síndrome Metabólica e MASLD Pediátrica',
      body_html: `
<h3>A Síndrome Metabólica na Criança e no Adolescente</h3>
<p>A Síndrome Metabólica (SM) é uma constelação complexa de fatores de risco cardiometabólicos interligados que compartilham uma base fisiopatológica comum: <strong>a resistência à insulina decorrente do excesso de adiposidade visceral</strong>. Na infância, a SM não é um diagnóstico nosológico isolado com CID único, mas sim um escore clínico-laboratorial de alerta máximo para risco precoce de infarto agudo do miocárdio, acidente vascular cerebral e diabetes mellitus tipo 2 prematuro.</p>
<p>Os critérios mais aceitos e exigidos nas bancas de residência são os da <em>International Diabetes Federation (IDF 2007)</em>, adotados pelo Departamento de Nutrologia e Endocrinologia da Sociedade Brasileira de Pediatria (SBP):</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Critério da IDF / SBP</th>
      <th>Faixa Etária de 6 a 9 anos</th>
      <th>Faixa Etária de 10 a 16 anos incompletos</th>
      <th>Faixa Etária &ge; 16 anos (Critérios de Adulto)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Obesidade Abdominal<br>(Pré-requisito Obrigatório)</strong></td>
      <td><strong>Circunferência da Cintura (CC) &ge; percentil 90</strong> para idade e sexo</td>
      <td><strong>Circunferência da Cintura (CC) &ge; percentil 90</strong> para idade e sexo</td>
      <td>Cintura &ge; 90 cm (rapazes) ou &ge; 80 cm (moças)</td>
    </tr>
    <tr>
      <td><strong>Componentes Adicionais<br>(Necessário preencher pelo menos 2)</strong></td>
      <td><em>Não se fecha diagnóstico formal de SM abaixo de 10 anos</em>, mas a presença de CC &ge; p90 exige acompanhamento intensivo e rastreamento de dislipidemia e glicemia.</td>
      <td><strong>Pelo menos 2 dos seguintes:</strong><br>
      1. <strong>Triglicerídeos:</strong> &ge; 150 mg/dL;<br>
      2. <strong>HDL-colesterol:</strong> &lt; 40 mg/dL;<br>
      3. <strong>Pressão Arterial:</strong> PAS &ge; 130 mmHg OU PAD &ge; 85 mmHg (ou PA &ge; percentil 90 para idade, sexo e estatura);<br>
      4. <strong>Glicemia de Jejum:</strong> &ge; 100 mg/dL (ou DM2 diagnosticado).</td>
      <td><strong>Pelo menos 2 dos seguintes:</strong><br>
      1. Triglicerídeos &ge; 150 mg/dL;<br>
      2. HDL &lt; 40 (homens) ou &lt; 50 (mulheres);<br>
      3. PAS &ge; 130 ou PAD &ge; 85 mmHg (ou em uso de anti-hipertensivo);<br>
      4. Glicemia &ge; 100 mg/dL (ou DM2).</td>
    </tr>
  </tbody>
</table>

<h3>Doença Hepática Esteatótica Associada à Disfunção Metabólica (MASLD Pediátrica)</h3>
<p>Recentemente rebatizada pelo consenso internacional de hepatologia (anteriormente chamada de Esteatose Hepática Não Alcoólica - NAFLD), a <strong>MASLD (Metabolic Dysfunction-Associated Steatotic Liver Disease)</strong> tornou-se a causa mais frequente de doença hepática crônica na infância e adolescência no mundo ocidental.</p>
<p><strong>Fisiopatologia do "Múltiplo Golpe" (Multiple-Hit Hypothesis):</strong></p>
<ol>
  <li><strong>Sobrecarga Lipídica Hepatocitária:</strong> A resistência insulínica periférica impede a supressão da lipólise no tecido adiposo, gerando fluxo torrencial de ácidos graxos livres em direção ao fígado. Ocorre lipogênese hepática <em>de novo</em> exacerbada e acúmulo patológico de triglicerídeos nos hepatócitos (esteatose simples: esteatose macrovesicular acometendo mais de 5% dos hepatócitos);</li>
  <li><strong>Estresse Oxidativo e Disfunção Mitocondrial:</strong> O acúmulo de lipídios citotóxicos gera radicais livres de oxigênio (ROS), peroxidação lipídica das membranas celulares e estresse do retículo endoplasmático;</li>
  <li><strong>Esteato-hepatite (MASH) e Fibrogênese:</strong> A inflamação ativa as células estreladas hepáticas (células de Ito), que transdiferenciam-se em miofibroblastos contráteis secretores de colágeno tipo I e III, deflagrando fibrose portal e perisinusoidal. Se não interrompida, a MASLD pediátrica progride para cirrose hepática em idade jovem (segunda e terceira décadas de vida) e aumenta o risco futuro de carcinoma hepatocelular.</li>
</ol>

<p><strong>Rastreamento e Abordagem Prática:</strong></p>
<ul>
  <li><strong>Quem rastrear?</strong> Todas as crianças com <em>obesidade</em> a partir dos 9 a 10 anos de idade, ou crianças com <em>sobrepeso</em> que apresentem fatores de risco adicionais (acantose nigricans, histórico familiar de MASH, dislipidemia ou hipertensão);</li>
  <li><strong>Exame de Triagem Inicial:</strong> Dosagem de <strong>Alanina Aminotransferase (ALT / TGP)</strong>. Considera-se alterado quando ALT &gt; 22 U/L em meninas e &gt; 26 U/L em meninos (pontos de corte específicos para pediatria, muito inferiores aos limites laboratoriais genéricos de adultos que chegam a 40-50 U/L!). Elevações persistentes de ALT &gt; 2 vezes o limite superior normal por mais de 3 a 6 meses exigem investigação diagnóstica aprofundada;</li>
  <li><strong>Ultrassonografia Abdominal:</strong> Demonstra hiperecogenicidade difusa do parênquima hepático ("fígado brilhante") com atenuação acústica posterior e apagamento dos contornos dos vasos intra-hepáticos e do diafragma. Possui excelente especificidade quando a esteatose acomete &gt; 30% dos hepatócitos, mas não avalia com precisão o grau de inflamação ou fibrose inicial;</li>
  <li><strong>Padrão-Ouro:</strong> Biópsia hepática guiada por USG (reservada para casos com suspeita de fibrose avançada, diagnóstico diferencial duvidoso com hepatite autoimune ou doença de Wilson, ou ausência de melhora após perda ponderal).</li>
</ul>
`
    },
    {
      id: 'complicacoes-mecanicas-ortopedicas-epifisiolise-blount',
      title: '6. Complicações Ortopédicas Mecânicas: Epifisiólise Proximal do Fêmur e Doença de Blount',
      body_html: `
<h3>Sobrecarga Mecânica no Esqueleto em Crescimento</h3>
<p>O esqueleto imaturo da criança e do adolescente possui placas epifisárias de crescimento cartilaginosas (fises) que são altamente vulneráveis a forças anormais de cisalhamento. A associação de ganho de peso corporal excessivo com desaceleração relativa da maturação da cartilagem fisária predispõe a duas afecções ortopédicas de alto impacto funcional:</p>

<h3>1. Epifisiólise Proximal da Cabeça Femoral (SCFE - Slipped Capital Femoral Epiphysis)</h3>
<p>A epifisiólise é o escorregamento da epífise proximal do fêmur em relação ao colo femoral através da zona hipertrófica da placa fisária. Trata-se da afecção de quadril mais comum da adolescência:</p>
<ul>
  <li><strong>Perfil Epidemiológico Típico:</strong> Adolescente masculino (relação 2:1 a 3:1), entre 11 e 15 anos de idade, obeso ou com sobrepeso acentuado, durante o estirão puberal ou na fase pré-puberal tardia;</li>
  <li><strong>Fisiopatologia:</strong> As forças mecânicas verticais de cisalhamento que atuam sobre o quadril ultrapassam a resistência tênsil da camada hipertrófica da placa fisária femoral proximal. A cabeça femoral permanece ancorada no acetábulo, enquanto o colo e a diáfise femorais deslocam-se <em>ântero-superiormente e em rotação externa</em>;</li>
  <li><strong>Quadro Clínico e Armadilha Semiológica:</strong>
    <ul>
      <li>Início insidioso de claudicação antálgica (mancar);</li>
      <li><strong>Dor referida no joelho ou na coxa anterior/medial</strong> em até 30% a 50% dos casos! Isso ocorre por inervação compartilhada pelo nervo obturador e nervo femoral. <em>Armadilha clássica:</em> O médico examina apenas o joelho doloroso (cujo exame físico e RX são completamente normais) e atrasa o diagnóstico da epifisiólise, permitindo a progressão para deformidade articular permanente;</li>
      <li><strong>Sinal de Drehmann:</strong> Durante a flexão passiva do quadril com o paciente em decúbito dorsal, o membro inferior desvia-se espontaneamente e obrigatoriamente para <strong>abdução e rotação externa</strong>;</li>
      <li>Limitação importante da rotação interna do quadril e da abdução quando comparado ao membro contralateral;</li>
    </ul>
  </li>
  <li><strong>Diagnóstico Radiológico:</strong>
    <ul>
      <li>Radiografia de bacia em incidências Ântero-Posterior (AP) e em <strong>posição de rã (incidência de Lauenstein)</strong>. A incidência de Lauenstein é mandatória para detectar escorregamentos sutis iniciais;</li>
      <li><strong>Linha de Klein:</strong> Linha traçada tangenciando a borda superior do colo femoral na incidência AP. Em um quadril normal, essa linha cruza uma porção da epífise femoral superior. Na epifisiólise, a linha de Klein <strong>não cruza a epífise</strong> ou cruza uma porção significativamente menor que no lado contralateral saudável (Sinal de Trethowan positivo);</li>
    </ul>
  </li>
  <li><strong>Tratamento e Conduta de Emergência:</strong>
    <ul>
      <li><strong>Suspensão Imediata de Carga:</strong> A partir do momento da suspeita, o paciente é estritamente proibido de pisar no chão e deve ser transportado em cadeira de rodas ou maca para o serviço de cirurgia ortopédica (risco de conversão de epifisiólise estável em instável e necrose avascular);</li>
      <li><strong>Tratamento Cirúrgico:</strong> Fixação <em>in situ</em> com parafuso canulado único sob controle fluoroscópico, impedindo a progressão do escorregamento e promovendo o fechamento fisiário prematuro terapêutico.</li>
    </ul>
  </li>
</ul>

<h3>2. Doença de Blount (Tíbia Vara do Desenvolvimento)</h3>
<p>A Doença de Blount é uma deformidade progressiva em varo dos membros inferiores (geno varo patológico) decorrente da ossificação encondral desordenada da porção póstero-medial da cartilagem fisária proximal da tíbia:</p>
<table class="book-table">
  <thead>
    <tr>
      <th>Características</th>
      <th>Forma Infantil (Precoce)</th>
      <th>Forma do Adolescente (Tardia)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Idade de Início</strong></td>
      <td>1 a 3 anos de idade</td>
      <td>&gt; 8 a 10 anos de idade</td>
    </tr>
    <tr>
      <td><strong>Relação com Obesidade</strong></td>
      <td>Presente em muitas crianças que começaram a andar precocemente (&lt; 10 meses) com sobrepeso</td>
      <td><strong>Fortemente associada à obesidade grave</strong> e ganho de peso acelerado</td>
    </tr>
    <tr>
      <td><strong>Lateralidade</strong></td>
      <td>Frequentemente bilateral (&gt; 50-80%)</td>
      <td>Mais frequentemente unilateral</td>
    </tr>
    <tr>
      <td><strong>Achados Clínicos e Radiológicos</strong></td>
      <td>Geno varo progressivo acentuado com torção tibial interna, claudicação e saliência palpável na face medial do joelho. Radiografia revela depressão em cunha da metáfise tibial medial, alargamento e fragmentação da fise medial (Classificação de Langenskiöld).</td>
      <td>Deformidade em varo progressiva do joelho, dor articular na face medial sob estresse biomecânico e instabilidade ligamentar.</td>
    </tr>
    <tr>
      <td><strong>Manejo Terapêutico</strong></td>
      <td>Ortotização com órteses longas (KAFO) nos estágios iniciais de Langenskiöld (I e II). Osteotomia tibial desrotativa e corretiva nos estágios avançados ou refratários.</td>
      <td>Tratamento cirúrgico quase sempre necessário: epifisiodese lateral seletiva ou osteotomia valgizante tibial proximal associada à perda ponderal rigorosa.</td>
    </tr>
  </tbody>
</table>
`
    },
    {
      id: 'complicacoes-respiratorias-neurologicas-psicossociais',
      title: '7. Complicações Respiratórias, Neurológicas e Psicossociais: SAHOS e Pseudotumor Cerebral',
      body_html: `
<h3>Afecções Respiratórias Associadas ao Excesso de Peso</h3>
<p>O aparelho respiratório da criança sofre impacto direto e indireto do excesso de adiposidade:</p>

<h3>1. Síndrome da Apneia-Hipopneia Obstrutiva do Sono (SAHOS)</h3>
<p>A SAHOS na infância é caracterizada por episódios recorrentes de obstrução parcial prolongada (hipopneia) ou obstrução total intermitente (apneia) das vias aéreas superiores durante o sono, fragmentando a arquitetura do sono e provocando hipoxemia e hipercapnia transitórias:</p>
<ul>
  <li><strong>Fisiopatologia Pediátrica:</strong> Em crianças com sobrepeso, a deposição excessiva de gordura nas paredes faríngeas, no palato mole e na base da língua reduz a área de secção transversa da via aérea superior e aumenta a colapsabilidade tecidual durante a atonia muscular do sono REM. Quando combinada à hipertrofia de tonsilas palatinas e faríngeas (amígdalas e adenoides), o risco de colapso respiratório noturno é exponencialmente amplificado;</li>
  <li><strong>Quadro Clínico:</strong> Roncos noturnos altos e contínuos, respiração ruidosa com esforço toracoabdominal paradoxal, pausas respiratórias presenciadas pelos pais, sono agitado com hiperextensão cervical, enurese noturna secundária, sudorese profusa noturna e despertar matinal difícil com cefaleia;</li>
  <li><strong>Repercussões Diurnas:</strong> Ao contrário dos adultos que manifestam quase exclusivamente sonolência excessiva diurna, a criança com SAHOS frequentemente apresenta <em>hiperatividade paradoxal, deficit de atenção, agressividade, irritabilidade e queda acentuada do rendimento escolar</em>, mimetizando TDAH;</li>
  <li><strong>Complicação Cardiovascular Grave:</strong> Vasoconstrição pulmonar hipóxica crônica noturna conduzindo à Hipertensão Arterial Pulmonar (HAP), hipertrofia ventricular direita e cor pulmonale crônico em estágios avançados;</li>
  <li><strong>Diagnóstico e Tratamento:</strong> O exame padrão-ouro é a <strong>Polissonografia Noturna em laboratório</strong> (critérios pediátricos: Índice de Apneia-Hipopneia - IAH &gt; 1 evento/hora já é considerado patológico em crianças!). O tratamento inclui adenotonsilectomia cirúrgica (primeira linha se houver hipertrofia amigdaliana associada), controle ponderal intensivo e pressão positiva contínua em vias aéreas (CPAP nasal) nos casos refratários ou graves.</li>
</ul>

<h3>2. Asma de Difícil Controle e "Fenótipo de Asma da Obesidade"</h3>
<p>A obesidade infantil duplica o risco de desenvolvimento de asma brônquica e confere um perfil de pior resposta terapêutica aos corticoides inalatórios. Esse fenótipo asmático não decorre unicamente de atopia mediada por IgE, mas de:</p>
<ol>
  <li><strong>Mecânica Ventilatória Alterada:</strong> A sobrecarga adiposa na parede torácica e no abdome reduz a complacência da caixa torácica e a Capacidade Residual Funcional (CRF), promovendo fechamento precoce das pequenas vias aéreas e hiper-reatividade brônquica por alteração na dinâmica do músculo liso bronquiolar;</li>
  <li><strong>Inflamação Sistêmica Sistematizada:</strong> As citocinas pró-inflamatórias (IL-6, TNF-&alpha;, leptina) migram para o parênquima pulmonar, estimulando inflamação neutrofílica intrabrônquica resistente à ação anti-inflamatória tópica dos esteroides inalatórios.</li>
</ol>

<h3>Hipertensão Intracraniana Idiopática (Pseudotumor Cerebral)</h3>
<p>O Pseudotumor Cerebral é uma síndrome neurológica caracterizada por elevação sustentada da pressão intracraniana (PIC) na ausência de lesão expansiva intracraniana, hidrocefalia, infecção liquórica ou trombose de seios venosos durais:</p>
<ul>
  <li><strong>Perfil Epidemiológico:</strong> Ocorre predominantemente em meninas adolescentes com obesidade recente ou ganho ponderal acelerado;</li>
  <li><strong>Fisiopatologia Proposta:</strong> Aumento crônico da pressão intra-abdominal e intratorácica transmitido pelo sistema venoso vertebral (plexo de Batson), provocando elevação da pressão venosa jugular e cerebral, o que reduz o gradiente de reabsorção de líquor através das granulações aracnóideas de Pacchioni; associado a estado pró-trombótico de baixo grau e citocinas neuroinflamatórias;</li>
  <li><strong>Manifestações Clínicas:</strong>
    <ul>
      <li>Cefaleia pulsátil, holocraniana ou retro-orbitária, que piora com manobras de Valsalva, ao acordar ou ao inclinar a cabeça para a frente;</li>
      <li>Turvação visual transitória (escurecimento visual com duração de segundos ao mudar de postura);</li>
      <li>Diplopia horizontal decorrente de paresia uni ou bilateral do <strong>nervo abducente (VI par craniano)</strong> — que possui longo trajeto subaracnóideo na base do crânio e sofre compressão mecânica pelo deslocamento caudal decorrente da PIC elevada (sinal falso-localizatório!);</li>
      <li>Zumbido pulsátil síncrono com os batimentos cardíacos;</li>
      <li><strong>Achado Físico Mandatório: Papiledema bilateral</strong> visível ao exame de fundo de olho;</li>
    </ul>
  </li>
  <li><strong>Investigação Diagnóstica:</strong>
    <ol>
      <li><strong>Ressonância Magnética de Crânio com Angiorressonância Venosa (Angio-RM):</strong> Obrigatória para afastar trombose de seios venosos e neoplasias. Sinais indiretos de hipertensão liquórica: sela túrcica vazia ou parcialmente vazia por herniação aracnóidea, achatamento posterior dos globos oculares e dilatação da bainha do nervo óptico com tortuosidade;</li>
      <li><strong>Punção Lombar Diagnóstica com Manometria:</strong> Líquor límpido, com contagem celular, glicose e proteínas rigorosamente normais. <strong>Pressão de abertura liquórica marcadamente elevada (&gt; 25 a 28 cmH2O</strong> com o paciente em decúbito lateral e membros relaxados);</li>
    </ol>
  </li>
  <li><strong>Tratamento e Prognóstico:</strong> O grande perigo é a <strong>atrofia óptica irreversível com perda definitiva da acuidade visual</strong>. Tratamento inclui: perda ponderal rápida orientada, inibidor da anidrase carbônica (<strong>Acetazolamida oral</strong> em doses progressivas para reduzir a síntese de líquor pelo plexo coroide), punções lombares de alívio e, em casos refratários com risco iminente de cegueira, derivação lombo-peritoneal ou fenestração da bainha do nervo óptico.</li>
</ul>

<h3>Impacto Psicossocial e Transtornos do Comportamento Alimentar</h3>
<p>O sofrimento psicológico é a complicação mais prevalente e precoce da obesidade infantil. Crianças obesas são vítimas habituais de estigmatização social, exclusão de grupos de pares e <em>bullying</em> escolar sistemático. Essa dinâmica deflagra sintomas depressivos, ansiedade generalizada, baixa autoestima e desenvolvimento de <strong>Transtorno da Compulsão Alimentar Periódica (TCAP)</strong> ou episódios de hiperfagia noturna, gerando um ciclo vicioso biopsicossocial de isolamento e compensação afetiva através do consumo de alimentos hiperpalatáveis.</p>
`
    },
    {
      id: 'abordagem-terapeutica-mudancas-estilo-vida',
      title: '8. Abordagem Terapêutica Multiprofissional: Mudanças no Estilo de Vida, Telas e Nutrição',
      body_html: `
<h3>Princípios Centrais da Abordagem Multiprofissional</h3>
<p>O tratamento da obesidade infantil é essencialmente centrado na <strong>família e no ambiente compartilhado</strong>. Não existe intervenção pediátrica isolada na criança: se o ambiente doméstico, os hábitos de compras dos pais e as rotinas familiares não forem transformados de maneira sustentável, qualquer plano terapêutico está fadado ao fracasso. O acompanhamento exige equipe multiprofissional integrada: pediatra, nutricionista, educador físico e psicólogo.</p>

<h3>Os Quatro Pilares da Mudança de Estilo de Vida (MEV)</h3>

<h3>1. Reeducação Alimentar Estruturada</h3>
<ul>
  <li><strong>Classificação NOVA e Alimentos Ultraprocessados:</strong> Banimento estrito de alimentos ultraprocessados (refrigerantes, sucos artificiais em pó ou caixinha, achocolatados líquidos, biscoitos recheados, salgadinhos de pacote, embutidos e macarrão instantâneo). Adoção da regra de ouro do Guia Alimentar para a População Brasileira: <em>preferir sempre alimentos in natura ou minimamente processados</em>;</li>
  <li><strong>Eliminação das Calorias Líquidas:</strong> A água filtrada deve ser a única fonte primária de hidratação diária, associada a leite pasteurizado integral ou desnatado (conforme a idade). Bebidas adoçadas com açúcar ou xarope de milho rico em frutose não geram saciedade hipotalâmica e causam picos rápidos de glicemia e lipogênese hepática;</li>
  <li><strong>Proibição de Dietas Extremamente Restritivas:</strong> Em crianças em fase de crescimento linear ativo, dietas hipocalóricas severas, regimes cetogênicos drásticos ou jejum intermitente prolongado são formalmente contraindicados pelo risco iminente de interrupção do crescimento estatural e indução de distúrbios da conduta alimentar;</li>
  <li><strong>Comensalidade e Rotina de Refeições:</strong> Estabelecer três refeições principais e dois lanches intermediários saudáveis em horários regulares. Proibição absoluta de realizar refeições em frente a televisores, computadores ou celulares;</li>
  <li><strong>Metas Ponderais Realistas:</strong> Em pré-escolares e escolares em fase de crescimento linear (sem comorbidades graves imediatas), a meta principal não é necessariamente a perda abrupta de peso, mas sim a <strong>manutenção do peso corporal ("estabilização ponderal") enquanto a criança continua crescendo em estatura</strong>, permitindo que o IMC/I se normalize progressivamente ao longo dos meses. Em adolescentes pós-puberais ou com obesidade grave associada a complicações, preconiza-se perda gradual de 0,5 a 1 kg por semana.</li>
</ul>

<h3>2. Controle Estrito do Tempo de Tela (Diretriz SBP 2024 / OMS)</h3>
<p>O excesso de exposição a telas digitais desregula os circuitos dopaminérgicos de recompensa, reduz o gasto energético basal e induz a ingestão compulsiva de lanches calóricos automatizada pela distração visual. As diretrizes oficiais determinam:</p>
<table class="book-table">
  <thead>
    <tr>
      <th>Faixa Etária</th>
      <th>Limite Máximo Recomendado de Telas</th>
      <th>Recomendações Específicas de Segurança e Ambiente</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Menores de 2 anos incompletos</strong></td>
      <td><strong>ZERO tela (Exclusão Total)</strong></td>
      <td>Proibir totalmente qualquer exposição passiva ou ativa a celulares, tablets, TVs ou computadores. Exceção única: videochamadas breves e interativas com familiares distantes mediadas pelos pais.</td>
    </tr>
    <tr>
      <td><strong>Crianças de 2 a 5 anos</strong></td>
      <td><strong>No máximo 1 hora por dia</strong></td>
      <td>Sempre com conteúdo educativo de alta qualidade e com a supervisão e mediação ativa dos pais ou cuidadores.</td>
    </tr>
    <tr>
      <td><strong>Crianças de 6 a 10 anos</strong></td>
      <td><strong>No máximo 1 a 2 horas por dia</strong></td>
      <td>Nunca durante os horários das refeições e banir telas do quarto de dormir.</td>
    </tr>
    <tr>
      <td><strong>Adolescentes de 11 a 18 anos</strong></td>
      <td><strong>No máximo 2 horas por dia</strong> de uso recreativo</td>
      <td>Desconectar todas as telas digitais pelo menos 1 a 2 horas antes do horário de dormir para evitar o bloqueio da secreção fisiológica de melatonina pela luz azul.</td>
    </tr>
  </tbody>
</table>

<h3>3. Atividade Física e Redução do Comportamento Sedentário</h3>
<ul>
  <li><strong>Recomendação Mínima Oficial:</strong> Pelo menos <strong>60 minutos diários de atividade física de intensidade moderada a vigorosa</strong> para todas as crianças e adolescentes de 6 a 17 anos (esportes coletivos, natação, artes marciais, ciclismo, dança ou corrida recreativa);</li>
  <li><strong>Atividades de Fortalecimento Muscular e Ósseo:</strong> Devem ser incorporadas pelo menos três vezes por semana;</li>
  <li><strong>Interrupção do Sedentarismo Prolongado:</strong> Orientar a criança a não permanecer sentada continuamente por mais de 60 minutos seguidos durante o período de vigília (levantar, alongar-se, caminhar pela casa).</li>
</ul>

<h3>4. Higiene do Sono e Ritmo Circadiano</h3>
<p>A privação crônica de sono altera os hormônios hipotalâmicos reguladores do apetite: ocorre <strong>elevação da grelina</strong> (hormônio orexígeno secretado pelo estômago que estimula a fome) e <strong>redução da leptina</strong> (hormônio da saciedade), além de elevação do cortisol noturno e agravamento da resistência insulínica. Recomenda-se sono noturno de:</p>
<ul>
  <li>11 a 14 horas/dia para crianças de 1 a 2 anos;</li>
  <li>10 a 13 horas/dia para crianças de 3 a 5 anos;</li>
  <li>9 a 12 horas/dia para escolares de 6 a 12 anos;</li>
  <li>8 a 10 horas/dia para adolescentes de 13 a 18 anos.</li>
</ul>
`
    },
    {
      id: 'farmacoterapia-pediatrica-cirurgia-bariatrica',
      title: '9. Farmacoterapia de Exceção e Critérios para Cirurgia Bariátrica no Adolescente',
      body_html: `
<h3>Princípios Gerais da Farmacoterapia na Obesidade Pediátrica</h3>
<p>O uso de medicamentos no tratamento da obesidade em pediatria é estritamente uma terapia adjuvante e <strong>de exceção</strong>. Nunca deve ser prescrito como monoterapia isolada e jamais substitui as mudanças de estilo de vida. É indicado exclusivamente quando um programa estruturado multidisciplinar de estilo de vida de pelo menos 6 a 12 meses não resultou em estabilização ou perda ponderal em pacientes com obesidade grave ou obesidade associada a comorbidades clínicas ativas.</p>

<h3>Medicamentos Aprovados no Brasil (Anvisa / FDA) para Faixa Pediátrica</h3>

<table class="book-table">
  <thead>
    <tr>
      <th>Fármaco</th>
      <th>Classe e Mecanismo de Ação</th>
      <th>Idade Mínima Aprovada (Anvisa/FDA)</th>
      <th>Posologia e Via</th>
      <th>Efeitos Adversos e Monitorização</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Liraglutida<br>(Saxenda)</strong></td>
      <td><strong>Agonista do Receptor de GLP-1 (GLP-1 RA).</strong> Estimula a secreção glicose-dependente de insulina, inibe o glucagon, lentifica o esvaziamento gástrico e atua diretamente nos receptores hipotalâmicos de POMC/CART promovendo saciedade precoce e redução do apetite.</td>
      <td><strong>&ge; 12 anos</strong><br>(com peso corporal &gt; 60 kg e escore-z de IMC &ge; +2 e IMC &ge; 30 kg/m² para idade/sexo)</td>
      <td>Injeção subcutânea diária. Inicia-se com 0,6 mg/dia SC, com escalonamento semanal progressivo de 0,6 mg a cada 7 dias até atingir a dose de manutenção de <strong>3,0 mg/dia SC</strong>.</td>
      <td>• Sintomas gastrointestinais comuns: náuseas, vômitos, diarreia, constipação e dispepsia (geralmente autolimitados durante o escalonamento);<br>• Risco de pancreatite aguda e colelitíase;<br>• Contraindicação absoluta: história pessoal ou familiar de carcinoma medular de tireoide ou síndrome de neoplasia endócrina múltipla tipo 2 (NEM 2).</td>
    </tr>
    <tr>
      <td><strong>Semaglutida<br>(Wegovy)</strong></td>
      <td><strong>Agonista do Receptor de GLP-1 de longa duração.</strong> Apresenta 94% de homologia com o GLP-1 nativo com modificações que retardam a degradação pela enzima DPP-4 e prolongam a ligação à albumina, permitindo posologia semanal.</td>
      <td><strong>&ge; 12 anos</strong><br>(com escore-z de IMC &ge; +2 correspondente ao percentil &ge; 95)</td>
      <td>Injeção subcutânea <strong>semanal</strong>. Escalonamento mensal: 0,25 mg/sem (mês 1), 0,5 mg/sem (mês 2), 1,0 mg/sem (mês 3), 1,7 mg/sem (mês 4) até a dose-alvo de <strong>2,4 mg/semana SC</strong>.</td>
      <td>Maior magnitude de perda de peso demonstrada nos ensaios clínicos pediátricos (ensaio STEP Teens: redução média do IMC de ~16% em relação ao placebo). Monitorar náuseas, vômitos, colelitíase e hidratação.</td>
    </tr>
    <tr>
      <td><strong>Orlistate<br>(Xenical)</strong></td>
      <td><strong>Inibidor de lipases gástrica e pancreática.</strong> Liga-se covalentemente aos sítios de serina das lipases no lúmen gastrointestinal, impedindo a hidrólise de cerca de 30% dos triglicerídeos dietéticos em ácidos graxos livres absorvíveis, eliminando-os intactos nas fezes. Não possui absorção sistêmica significativa.</td>
      <td><strong>&ge; 12 anos</strong></td>
      <td>120 mg por via oral, três vezes ao dia, imediatamente antes, durante ou até 1 hora após as três principais refeições contendo gordura.</td>
      <td>• Efeitos gastrointestinais limitantes: <strong>esteatorreia profusa, flatulência com perdas fecais oleosas</strong>, urgência evacuatória e incontinência fecal (baixa adesão terapêutica em adolescentes!);<br>• Risco de má absorção de vitaminas lipossolúveis (A, D, E e K); <strong>obrigatório suplementar polivitamínico diário</strong> com intervalo de pelo menos 2 horas da tomada do orlistate.</td>
    </tr>
  </tbody>
</table>

<p><em>Nota sobre Metformina:</em> A Metformina é um sensibilizador de insulina da classe das biguanidas aprovado a partir dos 10 anos de idade para o tratamento de <em>Diabetes Mellitus Tipo 2</em>. Embora frequentemente utilizada em regime <em>off-label</em> em adolescentes obesos com resistência insulínica severa e acantose nigricans, seu efeito sobre a perda ponderal isolada é muito discreto (redução modesta de 1 a 2 kg) e não é aprovada formalmente como fármaco antiobesidade primário.</p>

<h3>Critérios Rigorosos para Cirurgia Bariátrica no Adolescente</h3>
<p>A cirurgia metabólica e bariátrica na adolescência é uma intervenção extrema de última linha, restrita a um subgrupo muito bem selecionado de pacientes que falharam em múltiplos ciclos de tratamento conservador supervisionado e apresentam risco iminente de morbidade grave irreversível. As diretrizes da Sociedade Brasileira de Pediatria (SBP), Associação Brasileira para o Estudo da Obesidade (ABESO) e <em>American Academy of Pediatrics (AAP 2023)</em> estabelecem os seguintes critérios formais:</p>

<ol>
  <li><strong>Critérios de Idade e Maturidade Esquelética:</strong>
    <ul>
      <li>Idade cronológica geralmente &ge; 14 a 15 anos;</li>
      <li><strong>Maturidade esquelética quase completa:</strong> Avaliada por radiografia de mãos e punhos demonstrando idade óssea &ge; 14 anos em meninas e &ge; 16 anos em meninos, ou comprovação de estirão de crescimento puberal finalizado (estágio de Tanner IV ou V) com fechamento de pelo menos 95% das fises epifisárias de crescimento (evita interrupção irreversível da estatura final);</li>
    </ul>
  </li>
  <li><strong>Critérios Antropométricos de IMC:</strong>
    <ul>
      <li><strong>IMC &ge; 35 kg/m²</strong> (ou escore-z &gt; +3) associado à presença de pelo menos uma <strong>comorbidade maior grave</strong>: Diabetes Mellitus tipo 2, Síndrome da Apneia Obstrutiva do Sono moderada a grave (IAH &gt; 5-10), Doença Hepática Esteatótica (MASLD) com esteato-hepatite/fibrose comprovada, Hipertensão Intracraniana Idiopática (pseudotumor cerebral) ou Epifisiólise proximal do fêmur; <strong>OU</strong></li>
      <li><strong>IMC &ge; 40 kg/m²</strong> (obesidade extrema / grau III), com ou sem a presença de comorbidades menores;</li>
    </ul>
  </li>
  <li><strong>Critérios Cognitivos, Psicológicos e Familiares:</strong>
    <ul>
      <li>Capacidade cognitiva demonstrada do adolescente para compreender a irreversibilidade anatômica, as restrições alimentares permanentes e os riscos operatórios;</li>
      <li>Ausência de psicopatologia psiquiátrica descompensada ativa (ex.: depressão maior não tratada, psicose, drogadição, ideação suicida ativa);</li>
      <li><strong>Ambiente familiar estruturado e comprometido</strong>: suporte contínuo dos pais ou responsáveis para garantir a adesão irrestrita ao seguimento pós-operatório por toda a vida e uso perene de polivitamínicos;</li>
      <li>Falha comprovada de pelo menos 6 a 12 meses de tratamento clínico multidisciplinar intensivo supervisionado;</li>
    </ul>
  </li>
  <li><strong>Técnicas Cirúrgicas Aceitas:</strong>
    <ul>
      <li><strong>Gastrectomia Vertical (Sleeve Gástrico):</strong> Técnica mais realizada atualmente em adolescentes. É puramente restritiva (ressecação do fundo gástrico, reduzindo a grelina e o volume gástrico em ~80%), com menores taxas de desnutrição proteica e deficiências de micronutrientes a longo prazo;</li>
      <li><strong>Bypass Gástrico em Y de Roux:</strong> Técnica mista (restritiva e disabsortiva). Alta eficácia metabólica no controle do DM2, mas exige vigilância intensiva por toda a vida para deficiência de ferro, cálcio, vitamina B12, folato e tiamina.</li>
    </ul>
  </li>
</ol>
`
    },
    {
      id: 'casos-clinicos-antropometria-diagnostico-diferencial',
      title: '10. Casos Clínicos Estruturados com Discussão Diagnóstica Aprofundada',
      body_html: `
<h3>Caso Clínico 1: A Armadilha do Escore-z na Criança Menor de 5 Anos</h3>
<p><strong>Identificação e Queixa:</strong> Menino de 3 anos e 6 meses é trazido pela mãe à Unidade Básica de Saúde para consulta de puericultura de rotina. A mãe relata que a criança "come muito bem, adora mamadeiras de leite com farinha láctea e biscoitos recheados, e quase não para em casa assistindo vídeos no tablet".</p>
<p><strong>Exame Físico e Antropometria:</strong></p>
<ul>
  <li>Peso: 19,5 kg; Estatura: 98 cm;</li>
  <li>Cálculo do IMC: 19,5 / (0,98)² = 20,3 kg/m²;</li>
  <li>Plotagem nas curvas da OMS 2006 (Meninos de 0 a 5 anos): IMC para a idade situa-se entre <strong>escore-z +2,3</strong>;</li>
  <li>Estatura para a idade: situa-se no escore-z +0,5 (dentro da faixa de normalidade);</li>
  <li>Pressão arterial: 92/58 mmHg; sem acantose nigricans, sem dismorfismos faciais; fise do quadril e marcha normais.</li>
</ul>
<p><strong>Discussão Clínica e Diagnóstico:</strong></p>
<p>O médico residente desatento poderia classificar esse paciente de 3 anos e 6 meses como portador de "obesidade" por estar com escore-z &gt; +2. Contudo, <strong>nas crianças menores de 5 anos (0 a 59 meses), o escore-z entre +2 e +3 classifica-se formalmente como SOBREPESO</strong>! Para ser classificado como obesidade nessa faixa etária, o escore-z deveria ser estritamente &gt; +3.</p>
<p><strong>Conduta Baseada em Evidências:</strong> Não se deve prescrever dietas restritivas nem medicamentos. A intervenção foca-se na reeducação familiar: eliminar a mamadeira e farináceos açucarados, substituir ultraprocessados por comida de verdade, incentivar o consumo de frutas e água, banir o uso de telas para refeições e limitar as telas a no máximo 1 hora diária supervisionada, estimulando brincadeiras ativas por pelo menos 60 minutos diários. A meta antropométrica é a estabilização do peso corporal enquanto a criança cresce em estatura, promovendo a normalização gradual do escore-z de IMC.</p>

<h3>Caso Clínico 2: Hipotonia Neonatal, Atraso do Desenvolvimento e Hiperfagia Compulsiva</h3>
<p><strong>Identificação e História:</strong> Menina de 4 anos de idade é trazida ao ambulatório de especialidades pediátricas com quadro de ganho de peso monstruoso e incontrolável nos últimos 18 meses. A mãe relata que, durante o período neonatal e de lactente, a paciente foi internada diversas vezes por fraqueza extrema, não conseguia sugar o seio materno nem a mamadeira ("era um bebê muito mole, que mal chorava") e necessitou de sonda nasogástrica até os 8 meses de vida. Contudo, por volta dos 2 anos e meio de idade, a fraqueza melhorou e a criança desenvolveu uma fome insaciável: acorda de madrugada para comer, chora desesperadamente se a comida é negada, esconde restos de alimentos e busca comida em latas de lixo. Apresenta também atraso na fala e no caminhar (iniciou a marcha apenas com 2 anos e 4 meses).</p>
<p><strong>Exame Físico:</strong></p>
<ul>
  <li>Peso: 32 kg (escore-z &gt; +3); Estatura: 92 cm (escore-z &lt; -2,5 — <em>baixa estatura marcante</em>);</li>
  <li>IMC: 37,8 kg/m² (escore-z &gt; +4);</li>
  <li>Face: fendas palpebrais amendoadas, estreitamento bitemporal, lábio superior fino e cantos da boca voltados para baixo;</li>
  <li>Extremidades: mãos e pés notavelmente pequenos para a idade corporal (acromicria); hipopigmentação relativa de pele e olhos; obesidade de tronco exuberante.</li>
</ul>
<p><strong>Raciocínio Clínico e Conduta:</strong></p>
<p>A história bifásica clássica (hipotonia muscular neonatal severa com dificuldade alimentar inicial seguida por hiperfagia compulsiva insaciável associada a baixa estatura marcante, acromicria e atraso neuropsicomotor) é a descrição patognomônica da <strong>Síndrome de Prader-Willi</strong>. A associação de ganho de peso acelerado com <em>velocidade de crescimento diminuída e baixa estatura</em> afasta completamente a obesidade exógena comum e exige investigação genética imediata.</p>
<p><strong>Exame Diagnóstico Definitivo:</strong> Teste genético de <strong>metilação do DNA na região 15q11-q13</strong> (detecta mais de 99% dos casos decorrentes de deleção paterna, dissomia uniparental materna ou defeito de imprinting). Se confirmado, o manejo exige controle rigoroso de acesso aos alimentos (trancar despensas e geladeiras), acompanhamento multidisciplinar e introdução de hormônio de crescimento recombinante humano (rhGH) para melhorar a composição corporal, massa magra e estatura.</p>

<h3>Caso Clínico 3: Adolescente Obeso com Dor no Joelho e Marcha Claudicante</h3>
<p><strong>Identificação e Queixa:</strong> Menino de 13 anos, previamente hígido, comparece à Unidade de Pronto Atendimento queixando-se de dor insidiosa na face medial do joelho direito há cerca de 4 semanas, que piorou progressivamente nos últimos dias após uma aula de educação física, associada a mancar para andar. Nega febre, nega traumas locais diretos ou queixas em outras articulações.</p>
<p><strong>Exame Físico:</strong></p>
<ul>
  <li>Adolescente obeso: Peso: 78 kg; Estatura: 1,58 m; IMC: 31,2 kg/m² (escore-z IMC &gt; +2,5 — Obesidade grave para faixa de 5 a 19 anos);</li>
  <li><strong>Exame do Joelho Direito:</strong> Sem derrame articular, sem calor local, sem dor à palpação das interlinhas articulares fêmoro-tibiais, meniscos estáveis, ligamentos íntegros, amplitude de movimento passivo e ativo do joelho completa e indolor;</li>
  <li><strong>Exame do Quadril Direito:</strong> Marcha em claudicação antálgica com apoio encurtado no membro inferior direito. À manobra de flexão passiva do quadril com o paciente em decúbito dorsal, o membro inferior direito assume posição de <strong>abdução e rotação externa espontânea obrigatória (Sinal de Drehmann positivo)</strong>. A rotação interna do quadril direito encontra-se marcadamente restrita e dolorosa.</li>
</ul>
<p><strong>Raciocínio Clínico e Conduta Imediata:</strong></p>
<p>Trata-se do clássico quadro de <strong>Epifisiólise Proximal da Cabeça Femoral (SCFE)</strong> com <em>dor referida no joelho</em> decorrente de inervação sensitiva compartilhada pelo nervo obturador. O examinador incauto que confia apenas na queixa de dor no joelho e não examina o quadril deixará de diagnosticar uma urgência ortopédica.</p>
<p><strong>Conduta:</strong> Proibir imediatamente o apoio do peso sobre o membro inferior direito (colocar em cadeira de rodas/maca). Solicitar radiografias de bacia em incidências AP e em posição de rã (Lauenstein). A radiografia confirmará o escorregamento com a linha de Klein não cruzando a epífise femoral superior. Encaminhar imediatamente para internação hospitalar e fixação cirúrgica percutânea <em>in situ</em> com parafuso canulado pelo ortopedista pediátrico.</p>

<h3>Caso Clínico 4: Cefaleia Noturna, Diplopia e Esteatose Hepática em Adolescente com Obesidade</h3>
<p><strong>Identificação e História:</strong> Menina de 12 anos e 8 meses, com antecedente de obesidade progressiva nos últimos 3 anos, é trazida ao pronto-socorro infantil com queixa de dor de cabeça diária e progressiva há cerca de 3 semanas. A cefaleia é holocraniana, em pressão, mais intensa no início da manhã ao acordar e piora ao tossir ou agachar. Há 4 dias passou a relatar visão dupla (diplopia) ao olhar para os lados e episódios de escurecimento visual transitório quando se levanta rapidamente. Nega febre ou convulsões.</p>
<p><strong>Exame Físico e Complementares:</strong></p>
<ul>
  <li>Peso: 74 kg; Estatura: 1,52 m; IMC: 32,0 kg/m² (escore-z &gt; +2,7);</li>
  <li>PA: 128/82 mmHg; acantose nigricans acentuada na região cervical posterior e axilas;</li>
  <li>Neurológico: Criança consciente e orientada. Pares cranianos: limitação na abdução do olho direito com diplopia horizontal em olhar lateral (paresia do VI par craniano direito);</li>
  <li><strong>Fundo de Olho:</strong> Borramento nítido das margens do disco óptico bilateralmente com elevação papilar e ingurgitamento venoso (<strong>papiledema bilateral franco</strong>);</li>
  <li>Laboratório prévio do posto de saúde: ALT (TGP) = 58 U/L (elevada para o padrão pediátrico de referência de 22 U/L), Triglicerídeos = 195 mg/dL, Glicemia de jejum = 104 mg/dL.</li>
</ul>
<p><strong>Raciocínio Clínico Integrado:</strong></p>
<p>A paciente apresenta duas complicações de alta gravidade da obesidade infantil:</p>
<ol>
  <li><strong>Hipertensão Intracraniana Idiopática (Pseudotumor Cerebral):</strong> Confirmada pela presença de cefaleia com sinais de alarme para PIC elevada, papiledema bilateral e paresia do VI par craniano (falso sinal localizatório por compressão do nervo abducente). A Ressonância Magnética de Encéfalo com Angio-RM venosa é mandatória para afastar lesões tumorais expansivas e trombose venosa cerebral. A punção lombar evidenciará pressão de abertura &gt; 28 cmH2O com liquor quimicamente normal. O tratamento imediato com <strong>Acetazolamida oral</strong> visa reduzir a produção de líquor e proteger o nervo óptico de cegueira definitiva;</li>
  <li><strong>MASLD (Doença Hepática Esteatótica Associada à Disfunção Metabólica) e Síndrome Metabólica:</strong> A paciente apresenta ALT persistentemente elevada (&gt; 2x limite), triglicerídeos &gt; 150 mg/dL e glicemia alterada associados à obesidade abdominal e acantose nigricans, configurando Síndrome Metabólica completa e esteato-hepatite metabólica.</li>
</ol>
`
    },
    {
      id: 'questoes-concursos-comentadas-enamed',
      title: '11. Questões Comentadas de Concursos e Residência Médica',
      body_html: `
<h3>Questão 1 (ENAMED / PSU-MG — Inédita Comentada)</h3>
<p>Um menino de 4 anos e 2 meses é levado à consulta pediátrica para avaliação do desenvolvimento. A aferição antropométrica revela peso de 20,4 kg e estatura de 102 cm. Ao plotar os dados nas curvas de crescimento da Organização Mundial da Saúde (OMS 2006) adotadas pelo Ministério da Saúde, o Índice de Massa Corporal para a idade (IMC/I) situa-se no escore-z +2,4. A velocidade de crescimento estatural no último ano foi de 6,5 cm/ano. O exame físico não revela dismorfismos, a pressão arterial está normal para o percentil de estatura e o desenvolvimento neuropsicomotor é adequado. De acordo com a classificação oficial do SISVAN / OMS e as diretrizes da Sociedade Brasileira de Pediatria, assinale a alternativa que indica corretamente o diagnóstico nutricional e a conduta recomendada para este paciente:</p>
<p><strong>A)</strong> Obesidade; indicação imediata de dieta hipocalórica estrita e encaminhamento para endocrinologia pediátrica para início de farmacoterapia.</p>
<p><strong>B)</strong> Sobrepeso; intervenção no estilo de vida com reeducação alimentar familiar, incentivo à atividade física lúdica diária e limitação rigorosa do tempo de tela a no máximo 1 hora por dia.</p>
<p><strong>C)</strong> Risco de sobrepeso; conduta expectante, sem necessidade de alterações na rotina alimentar, uma vez que a velocidade de crescimento está preservada.</p>
<p><strong>D)</strong> Obesidade grave; solicitação obrigatória de polissonografia noturna e ressonância magnética de crânio para afastar craniofaringioma.</p>
<p><strong>E)</strong> Eutrofia; o escore-z até +3 é considerado variante normal na faixa etária pré-escolar.</p>

<p><strong>Comentário Detalhado:</strong></p>
<p><strong>Gabarito: B.</strong></p>
<p><em>Análise das Alternativas:</em></p>
<ul>
  <li><strong>Por que a alternativa B está CORRETA?</strong> O paciente tem 4 anos e 2 meses (faixa etária de <strong>0 a 5 anos incompletos</strong>). Pelas curvas de IMC/I da OMS 2006 adotadas pelo SISVAN/MS: escore-z &gt; +1 e &le; +2 é <em>Risco de sobrepeso</em>; escore-z <strong>&gt; +2 e &le; +3 é SOBREPESO</strong>; e escore-z &gt; +3 é <em>Obesidade</em>. Como a criança apresenta escore-z de +2,4, seu diagnóstico antropométrico oficial é <strong>Sobrepeso</strong>. A conduta é a reeducação no estilo de vida familiar, sem restrições calóricas severas, e para essa faixa etária (2 a 5 anos), a diretriz da SBP/OMS determina o limite de tela de <strong>no máximo 1 hora diária</strong> supervisionada;</li>
  <li><strong>Por que a A está INCORRETA?</strong> Na faixa menor de 5 anos, escore-z +2,4 não é obesidade (seria obesidade apenas se fosse &gt; +3). Além disso, dietas hipocalóricas estritas e farmacoterapia são formalmente contraindicadas nessa idade;</li>
  <li><strong>Por que a C está INCORRETA?</strong> Escore-z +2,4 não é "risco de sobrepeso" (o risco vai até +2,0). Não se deve adotar conduta passiva/expectante, pois o sobrepeso já está estabelecido;</li>
  <li><strong>Por que a D está INCORRETA?</strong> A categoria obesidade grave sequer existe na tabela de 0 a 5 anos da OMS/SISVAN, e a criança não tem sinais de alarme que justifiquem neuroimagem de emergência;</li>
  <li><strong>Por que a E está INCORRETA?</strong> A faixa de eutrofia estende-se apenas de &ge; -2 até &le; +1.</li>
</ul>

<h3>Questão 2 (USP-SP / Revalidação — Inédita Comentada)</h3>
<p>Menino de 12 anos e 6 meses é trazido pela mãe por excesso de peso. A mãe refere que a criança começou a ganhar muito peso aos 9 anos. Ao exame: peso no percentil 98, estatura no percentil 85 (velocidade de crescimento de 6 cm/ano nos últimos dois anos). Ao exame físico, nota-se distribuição uniforme de gordura, acantose nigricans na nuca, genitália externa masculina com estadiamento puberal de Tanner G3P3, testículos com volume de 12 mL bilateralmente e ausência de dismorfismos. A idade óssea por radiografia de punhos é compatível com 13 anos. Em relação a esse caso clínico, é correto afirmar que:</p>
<p><strong>A)</strong> Trata-se de uma obesidade endógena secundária a hipotireoidismo adquirido, devendo-se solicitar TSH e T4 livre imediatamente.</p>
<p><strong>B)</strong> O quadro é altamente sugestivo de obesidade monogênica por deficiência congênita de leptina, indicada pela puberdade normal.</p>
<p><strong>C)</strong> Os achados de estatura no percentil 85, velocidade de crescimento normal/alta e idade óssea compatível/ligeiramente adiantada são patognomônicos de obesidade exógena (nutricional).</p>
<p><strong>D)</strong> A presença de acantose nigricans e puberdade precoce obriga o rastreamento imediato de tumor adrenal produtor de cortisol.</p>
<p><strong>E)</strong> O paciente deve ser imediatamente submetido à cirurgia bariátrica por gastrectomia vertical.</p>

<p><strong>Comentário Detalhado:</strong></p>
<p><strong>Gabarito: C.</strong></p>
<p><em>Análise das Alternativas:</em></p>
<ul>
  <li><strong>Por que a alternativa C está CORRETA?</strong> Esta é a distinção mais importante da semiologia pediátrica da obesidade: a <strong>obesidade exógena/nutricional</strong> (responsável por mais de 95% dos casos) associa-se caracteristicamente à estatura normal ou alta para a idade (p85), velocidade de crescimento preservada ou até acelerada e idade óssea compatível ou ligeiramente avançada (devido ao hiperinsulinismo e conversão periférica de estrogênios pela aromatase);</li>
  <li><strong>Por que a A está INCORRETA?</strong> O hipotireoidismo provoca queda drástica da velocidade de crescimento, baixa estatura marcante e atraso importante da idade óssea;</li>
  <li><strong>Por que a B está INCORRETA?</strong> A deficiência congênita de leptina é uma síndrome rara que causa obesidade mórbida no primeiro ano de vida e hipogonadismo hipogonadotrófico com ausência total de puberdade;</li>
  <li><strong>Por que a D está INCORRETA?</strong> Tanner G3P3 com testículos de 12 mL aos 12 anos e meio é a puberdade fisiológica normal masculina. A acantose nigricans decorre da resistência à insulina periférica;</li>
  <li><strong>Por que a E está INCORRETA?</strong> A cirurgia bariátrica exige falha documentada de tratamento clínico multidisciplinar, IMC &ge; 35 com comorbidades maiores graves ou &ge; 40, e maturidade esquelética quase completa.</li>
</ul>

<h3>Questão 3 (UNICAMP / ENARE — Inédita Comentada)</h3>
<p>Adolescente do sexo feminino, 14 anos, obesa (IMC = 36 kg/m²), comparece à consulta ambulatorial. Traz exames laboratoriais solicitados na UBS: Glicemia de jejum = 108 mg/dL; Triglicerídeos = 180 mg/dL; HDL-colesterol = 36 mg/dL; e Pressão arterial = 134/86 mmHg (percentil &gt; 95). A circunferência da cintura encontra-se no percentil 95 para idade e sexo. De acordo com os critérios da <em>International Diabetes Federation (IDF)</em> adaptados pela Sociedade Brasileira de Pediatria para adolescentes entre 10 e 16 anos, qual o diagnóstico e a interpretação correta do perfil clínico desta paciente?</p>
<p><strong>A)</strong> A paciente preenche critérios diagnósticos completos para Síndrome Metabólica.</p>
<p><strong>B)</strong> Não é possível diagnosticar Síndrome Metabólica, pois o único critério laboratorial aceito para esta faixa etária é o diabetes mellitus tipo 2 estabelecido.</p>
<p><strong>C)</strong> A paciente apresenta apenas hipertensão arterial isolada associada a sobrepeso leve.</p>
<p><strong>D)</strong> O diagnóstico de Síndrome Metabólica é descartado pela ausência de microalbuminúria de 24 horas.</p>
<p><strong>E)</strong> A circunferência da cintura não é pré-requisito obrigatório na classificação da IDF na faixa pediátrica.</p>

<p><strong>Comentário Detalhado:</strong></p>
<p><strong>Gabarito: A.</strong></p>
<p><em>Análise das Alternativas:</em></p>
<ul>
  <li><strong>Por que a alternativa A está CORRETA?</strong> Pelos critérios da IDF/SBP para a faixa de 10 a 16 anos incompletos:
    <ol>
      <li><strong>Pré-requisito obrigatório:</strong> Obesidade abdominal avaliada por Circunferência da Cintura &ge; percentil 90 (a paciente tem CC no p95 — PRESENTE);</li>
      <li><strong>Critérios adicionais (necessário pelo menos 2):</strong>
        <ul>
          <li>Triglicerídeos &ge; 150 mg/dL (paciente: 180 mg/dL — PRESENTE);</li>
          <li>HDL &lt; 40 mg/dL (paciente: 36 mg/dL — PRESENTE);</li>
          <li>PA &ge; 130/85 mmHg ou &ge; p90 (paciente: 134/86 mmHg — PRESENTE);</li>
          <li>Glicemia de jejum &ge; 100 mg/dL (paciente: 108 mg/dL — PRESENTE).</li>
        </ul>
      </li>
    </ol>
    A paciente apresenta <strong>o pré-requisito e TODOS os 4 critérios adicionais</strong>, preenchendo com folga o diagnóstico de Síndrome Metabólica;</li>
  <li><strong>Por que as alternativas B, C, D e E estão INCORRETAS?</strong> A IDF não exige DM2 estabelecido (glicemia &ge; 100 mg/dL já pontua); a microalbuminúria não faz parte dos critérios diagnósticos da IDF; e a circunferência da cintura &ge; p90 é justamente o elemento central e obrigatório do diagnóstico.</li>
</ul>

<h3>Questão 4 (CERMAM / AMRIGS — Inédita Comentada)</h3>
<p>Um adolescente de 13 anos, com IMC no percentil 99, procura atendimento ortopédico com história de dor no joelho esquerdo e claudicação há cerca de 3 semanas. Ao exame, o joelho esquerdo é normal. Ao fletir passivamente o quadril esquerdo a 90 graus, observa-se que o membro inferior entra involuntariamente em rotação externa e abdução. O diagnóstico clínico mais provável e a conduta radiológica mandatória são, respectivamente:</p>
<p><strong>A)</strong> Doença de Blount; Radiografia panorâmica com carga dos membros inferiores.</p>
<p><strong>B)</strong> Sinovite transitória do quadril; Ultrassonografia de articulação coxofemoral.</p>
<p><strong>C)</strong> Epifisiólise proximal da cabeça femoral; Radiografia da bacia em incidências Ântero-Posterior (AP) e em posição de rã (Lauenstein).</p>
<p><strong>D)</strong> Doença de Legg-Calvé-Perthes; Cintilografia óssea com tecnécio-99m.</p>
<p><strong>E)</strong> Apofisite de tração de Osgood-Schlatter; Radiografia de perfil estrito do joelho.</p>

<p><strong>Comentário Detalhado:</strong></p>
<p><strong>Gabarito: C.</strong></p>
<p><em>Análise das Alternativas:</em></p>
<ul>
  <li><strong>Por que a alternativa C está CORRETA?</strong> O caso descreve a clássica <strong>Epifisiólise Proximal da Cabeça Femoral (SCFE)</strong>: adolescente obeso masculino no estirão puberal, dor referida no joelho (por inervação do nervo obturador) com exame do joelho normal, e o patognomônico <strong>Sinal de Drehmann positivo</strong> (ao fletir o quadril, o membro desvia-se para abdução e rotação externa). A investigação radiológica mandatória requer incidência AP de bacia e <strong>incidência em posição de rã (Lauenstein)</strong> para detectar escorregamentos sutis da cabeça femoral em relação ao colo (ausência de cruzamento da linha de Klein);</li>
  <li><strong>Por que a A está INCORRETA?</strong> Blount é a tíbia vara e não altera a mobilidade passiva do quadril;</li>
  <li><strong>Por que a B está INCORRETA?</strong> Sinovite transitória ocorre em crianças menores (3 a 8 anos), com quadro agudo após IVAS, sem relação com obesidade de estirão;</li>
  <li><strong>Por que a D está INCORRETA?</strong> Legg-Calvé-Perthes (necrose avascular idiopática) incide classicamente entre 4 e 8 anos de idade em meninos magros e hiperativos;</li>
  <li><strong>Por que a E está INCORRETA?</strong> Osgood-Schlatter é dor e proeminência palpável na tuberosidade anterior da tíbia, sem acometimento de rotação do quadril.</li>
</ul>

<h3>Questão 5 (SURCE / SES-RJ — Inédita Comentada)</h3>
<p>Em relação às opções farmacológicas e cirúrgicas para o tratamento da obesidade em crianças e adolescentes, de acordo com as evidências atuais e aprovações da Anvisa e do FDA, analise as afirmativas a seguir:</p>
<p>I. A liraglutida e a semaglutida são agonistas do receptor de GLP-1 aprovados para o tratamento da obesidade a partir dos 12 anos de idade.<br>
II. O orlistate inibe as lipases gastrointestinais, impedindo a absorção de parte das gorduras da dieta, mas exige cautela e monitorização pelo risco de redução na absorção de vitaminas lipossolúveis (A, D, E e K).<br>
III. A cirurgia bariátrica pode ser indicada para adolescentes em fase inicial de crescimento pré-puberal (estágio de Tanner I ou II), independentemente da idade óssea, desde que o IMC ultrapasse 30 kg/m².<br>
IV. A metformina é a primeira escolha farmacológica formalmente aprovada pela Anvisa como medicação antiobesidade em pré-escolares.</p>
<p>Estão corretas apenas as afirmativas:</p>
<p><strong>A)</strong> I e II.</p>
<p><strong>B)</strong> I, II e III.</p>
<p><strong>C)</strong> II e IV.</p>
<p><strong>D)</strong> III e IV.</p>
<p><strong>E)</strong> I e IV.</p>

<p><strong>Comentário Detalhado:</strong></p>
<p><strong>Gabarito: A.</strong></p>
<p><em>Análise dos Itens:</em></p>
<ul>
  <li><strong>Item I: CORRETO.</strong> Tanto a liraglutida (Saxenda) quanto a semaglutida (Wegovy) estão aprovadas no Brasil e nos EUA para o tratamento da obesidade em adolescentes a partir de 12 anos de idade, com excelente perfil de eficácia na perda ponderal e melhora metabólica;</li>
  <li><strong>Item II: CORRETO.</strong> O orlistate atua inibindo cerca de 30% da absorção de triglicerídeos intraluminais por inibição das lipases gástrica e pancreática. O principal risco nutricional é a deficiência de vitaminas lipossolúveis (A, D, E, K), exigindo suplementação polivitamínica profilática;</li>
  <li><strong>Item III: INCORRETO.</strong> A cirurgia bariátrica é terminantemente contraindicada em fases pré-puberais (Tanner I ou II). É pré-requisito mandatório que o adolescente tenha completado quase totalmente o crescimento esquelético (estágio de Tanner IV ou V, idade óssea &ge; 14 anos em meninas e &ge; 16 anos em meninos), além de exigir IMC &ge; 35 com comorbidades graves ou &ge; 40;</li>
  <li><strong>Item IV: INCORRETO.</strong> A metformina não é aprovada como medicação antiobesidade em pré-escolares (sua aprovação é para DM2 a partir de 10 anos) e não deve ser prescrita como redutor ponderal isolado.</li>
</ul>

<h3>Questão 6 (IAMSPE / USP-RP — Inédita Comentada)</h3>
<p>Menina de 11 anos com obesidade grave (IMC no percentil &gt; 99) apresenta queixa de roncos noturnos altos diários, respiração ruidosa durante o sono com pausas respiratórias presenciadas pela mãe e enurese noturna secundária. Na escola, a professora relata desatenção marcante, agressividade e queda no rendimento pedagógico. Ao exame orofaríngeo, constata-se hipertrofia de amígdalas palatinas grau III de Brodsky. Qual o exame complementar considerado padrão-ouro para o diagnóstico confirmatório e qual a complicação cardiovascular crônica mais temida dessa condição não tratada?</p>
<p><strong>A)</strong> Nasofibroscopia flexível; Coarctação da aorta.</p>
<p><strong>B)</strong> Polissonografia noturna; Hipertensão arterial pulmonar e cor pulmonale.</p>
<p><strong>C)</strong> Tomografia computadorizada de tórax; Tromboembolismo pulmonar maciço.</p>
<p><strong>D)</strong> Eletroencefalograma de sono; Aneurisma de artéria comunicante anterior.</p>
<p><strong>E)</strong> Radiografia de cavum; Miocardiopatia hipertrófica obstrutiva congênita.</p>

<p><strong>Comentário Detalhado:</strong></p>
<p><strong>Gabarito: B.</strong></p>
<p><em>Análise das Alternativas:</em></p>
<ul>
  <li><strong>Por que a alternativa B está CORRETA?</strong> O quadro clínico descreve perfeitamente a <strong>Síndrome da Apneia-Hipopneia Obstrutiva do Sono (SAHOS)</strong> da infância, cujos sintomas diurnos clássicos incluem desatenção e hiperatividade. O exame diagnóstico padrão-ouro é a <strong>Polissonografia Noturna em laboratório</strong> (IAH &gt; 1 evento/hora já é patológico em crianças). A complicação cardiovascular mais temida da hipoxemia e hipercapnia noturnas recorrentes não tratadas é a vasoconstrição arterial pulmonar reflexa sustentada, que culmina em <strong>Hipertensão Arterial Pulmonar (HAP), hipertrofia de ventrículo direito e insuficiência cardíaca direita (cor pulmonale)</strong>;</li>
  <li><strong>Por que as alternativas A, C, D e E estão INCORRETAS?</strong> A nasofibroscopia e o RX de cavum avaliam a anatomia da via aérea, mas não quantificam eventos obstrutivos dinâmicos do sono; coarctação da aorta é cardiopatia congênita; o EEG avalia epilepsia (não apneia); e miocardiopatia hipertrófica obstrutiva é afecção sarcomérica genética.</li>
</ul>
`
    },
    {
      id: 'sintese-pratica-e-diretrizes-enamed',
      title: '12. Guia Rápido de Conduta e Síntese para o ENAMED',
      body_html: `
<h3>Os Dez Mandamentos da Obesidade Pediátrica para Provas</h3>
<ol>
  <li><strong>Curvas da OMS de 0 a 5 anos incompletos:</strong>
    <ul>
      <li>Escore-z &gt; +1 a &le; +2: <strong>Risco de sobrepeso</strong>;</li>
      <li>Escore-z &gt; +2 a &le; +3: <strong>Sobrepeso</strong>;</li>
      <li>Escore-z &gt; +3: <strong>Obesidade</strong> (não existe o termo "obesidade grave" nessa faixa etária na OMS/SISVAN!).</li>
    </ul>
  </li>
  <li><strong>Curvas da OMS de 5 a 19 anos:</strong>
    <ul>
      <li>Escore-z &gt; +1 a &le; +2: <strong>Sobrepeso</strong>;</li>
      <li>Escore-z &gt; +2 a &le; +3: <strong>Obesidade</strong>;</li>
      <li>Escore-z &gt; +3: <strong>Obesidade grave</strong>.</li>
    </ul>
  </li>
  <li><strong>Obesidade Exógena vs Endógena:</strong> O grande divisor de águas é a <strong>velocidade de crescimento e a estatura</strong>. Exógena (95%): alta ou normal para a idade, crescimento preservado/acelerado, idade óssea compatível ou adiantada. Endógena (&lt; 5%): baixa estatura, desaceleração do crescimento, idade óssea atrasada.</li>
  <li><strong>Síndrome de Prader-Willi:</strong> Perda da região 15q11-q13 paterna. Fase 1: hipotonia neonatal grave + sucção débil. Fase 2 (após 2-3 anos): hiperfagia compulsiva insaciável + baixa estatura + acromicria + hipogonadismo hipogonadotrófico + déficit cognitivo.</li>
  <li><strong>Síndrome Metabólica na Pediatria (IDF/SBP):</strong>
    <ul>
      <li>Pré-requisito obrigatório: <strong>Circunferência da cintura &ge; percentil 90</strong>;</li>
      <li>Mais 2 critérios adicionais entre: Triglicerídeos &ge; 150 mg/dL, HDL &lt; 40 mg/dL, PA &ge; 130/85 ou &ge; p90, Glicemia de jejum &ge; 100 mg/dL.</li>
    </ul>
  </li>
  <li><strong>MASLD Pediátrica (Antiga NAFLD):</strong> Rastrear com <strong>ALT a partir dos 9-10 anos</strong>. Ponto de corte alterado em pediatria: ALT &gt; 22 U/L em meninas e &gt; 26 U/L em meninos!</li>
  <li><strong>Epifisiólise Proximal do Fêmur (SCFE):</strong> Adolescente obeso em estirão com dor referida no joelho ou coxa. Sinal de Drehmann positivo (flexão do quadril com rotação externa espontânea). RX bacia em AP e Lauenstein (posição de rã) demonstrando alteração na linha de Klein. Suspensão imediata de carga e cirurgia <em>in situ</em> urgente.</li>
  <li><strong>Pseudotumor Cerebral (Hipertensão Intracraniana Idiopática):</strong> Menina adolescente com obesidade recente, cefaleia matinal, papiledema bilateral e paresia do VI par (diplopia). Pressão de abertura liquórica &gt; 28 cmH2O com neuroimagem sem tumores. Tratar com acetazolamida e perda de peso para evitar atrofia óptica irreversível.</li>
  <li><strong>Regras de Telas (SBP/OMS):</strong> Menores de 2 anos = ZERO tela; 2 a 5 anos = máximo 1 hora/dia; maiores de 6 anos = máximo 2 horas/dia. Proibido telas durante refeições e antes de dormir.</li>
  <li><strong>Farmacoterapia e Bariátrica:</strong> Farmacoterapia aprovada a partir de 12 anos: Liraglutida, Semaglutida e Orlistate. Bariátrica apenas após maturidade esquelética quase completa (&ge; 14a em meninas, &ge; 16a em meninos) com IMC &ge; 35 com comorbidades maiores graves ou &ge; 40 após falha de tratamento multidisciplinar estruturado.</li>
</ol>
`
    }
  ],
  references: [
    {
      title: 'Sociedade Brasileira de Pediatria (SBP) — Departamento Científico de Nutrologia e Endocrinologia Pediátrica. Manual de Obesidade na Infância e Adolescência',
      url: 'https://www.sbp.com.br/departamentos-cientificos/nutrologia/diretrizes/'
    },
    {
      title: 'World Health Organization (WHO) — The WHO Child Growth Standards: Length/height-for-age, weight-for-age, weight-for-length and body mass index-for-age',
      url: 'https://www.who.int/tools/child-growth-standards'
    },
    {
      title: 'Ministério da Saúde do Brasil — Orientações para a coleta e análise de dados antropométricos em serviços de saúde: Norma Técnica do Sistema de Vigilância Alimentar e Nutricional (SISVAN)',
      url: 'https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/s/sisvan'
    },
    {
      title: 'American Academy of Pediatrics (AAP) — Clinical Practice Guideline for the Evaluation and Treatment of Children and Adolescents With Obesity (Pediatrics 2023)',
      url: 'https://publications.aap.org/pediatrics/article/151/2/e2022060640/190443/'
    },
    {
      title: 'International Diabetes Federation (IDF) — The IDF Consensus Definition of the Metabolic Syndrome in Children and Adolescents',
      url: 'https://idf.org/our-activities/advocacy-awareness/resources-and-tools/162-idf-consensus-definition-of-the-metabolic-syndrome-in-children-and-adolescents.html'
    },
    {
      title: 'Sociedade Brasileira de Pediatria (SBP) — Departamento de Adolescência e Saúde Mental. Manual de Saúde de Crianças e Adolescentes na Era Digital (#MenosTelas #MaisSaúde)',
      url: 'https://www.sbp.com.br/especiais/pediatria-para-familias/desenvolvimento/menos-telas-mais-saude/'
    }
  ]
};

const chars = saveBook(book);
console.log(`Finalizado ${book.slug}: ${chars} caracteres úteis.`);
