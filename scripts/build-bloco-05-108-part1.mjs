// Bloco 5 - Aula 108: Infecção Urinária na Criança - Part 1
export const sec1 = {
  id: 'epidemiologia-fatores-de-risco-e-patogenese',
  title: '1. Epidemiologia Pediátrica, Fatores Anatômicos e Fisiopatologia da Ascensão Bacteriana',
  body_html: `
<h3>Magnitude Epidemiológica e Distribuição por Faixa Etária e Sexo</h3>
<p>A <strong>Infecção do Trato Urinário (ITU)</strong> figura entre as infecções bacterianas potencialmente graves mais comuns da infância, superada em prevalência apenas pelas infecções das vias aéreas superiores e gastroenterites agudas. Estima-se que aproximadamente 8% das meninas e 2% dos meninos sofrerão pelo menos um episódio comprovado de ITU até completarem 7 anos de vida. Mais do que um evento infeccioso agudo e autolimitado, a ITU pediátrica — especialmente quando acomete o parênquima renal (Pielonefrite Aguda) — representa um <strong>marcador clínico cardinal de malformações congênitas do trato urinário</strong> e carrega o risco temido de cicatrizes renais parenquimatosas irreversíveis, que na vida adulta podem culminar em hipertensão arterial sistêmica secundária, proteinúria crônica e Doença Renal Crônica terminal dialítica.</p>

<p>A incidência da ITU na infância exibe uma clássica e dinâmica <strong>inversão de prevalência em função do sexo e da idade biológica</strong>:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Faixa Etária Pediátrica</th>
      <th>Predomínio de Sexo</th>
      <th>Mecanismo Fisiopatológico Predominante</th>
      <th>Fatores de Risco Anatômicos e Funcionais</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Período Neonatal e Lactente Jovem (< 3 meses)</strong></td>
      <td><strong>Predomínio MASCULINO (razão de até 3:1 a 5:1)</strong>.<br>Meninos não circuncidados apresentam risco até 10 vezes maior.</td>
      <td><strong>Disseminação Hematogênica associada à bacteremia neonatal precoce/tardia</strong> somada à ascensão bacteriana facilitada por anomalias obstrutivas congênitas graves.</td>
      <td>Válvula de Uretra Posterior (VUP), estenose de junção ureteropélvica (JUP), prepúcio fisiológico redundante com colonização periuretral densa por uropatógenos e imaturidade imunológica fagocítica.</td>
    </tr>
    <tr>
      <td><strong>Lactentes Maiores e Pré-Escolares (1 a 5 anos)</strong></td>
      <td><strong>Nítido predomínio FEMININO (razão de 10:1)</strong>.</td>
      <td><strong>Via Ascendente Retrógrada</strong>: Uropatógenos colonizadores do períneo e flora fecal migram pela uretra até a bexiga.</td>
      <td>Uretra feminina anatomicamente curta e retilínea próxima ao ânus, treinamento esfincteriano inadequado ("desfralde" traumático), retenção urinária voluntária e disfunção miccional.</td>
    </tr>
    <tr>
      <td><strong>Escolares e Adolescentes (> 5 anos)</strong></td>
      <td><strong>Franco predomínio FEMININO</strong>.<br>Em meninos, a ITU nessa faixa é rara e quase invariavelmente associada a anomalias estruturais ou cateterismo vesical.</td>
      <td>Ascensão retrógrada bacteriana facilitada por distúrbios miccionais, constipação intestinal crônica e início precoce de atividade sexual na adolescência.</td>
      <td>Disfunção do Trato Urinário Inferior (DTUI), síndrome de retenção/incoordenação miccional, bexiga neurogênica e hábitos higiênicos incorretos (limpeza perineal de trás para frente).</td>
    </tr>
  </tbody>
</table>

<h3>Etiologia Microbiológica: A Hegemonia da <em>Escherichia coli</em> Uropatogênica (UPEC)</h3>
<p>Em mais de 80% a 90% dos primeiros episódios de ITU comunitária na infância, o agente etiológico isolado é a <strong><em>Escherichia coli</em> Uropatogênica (UPEC)</strong>. Esse bacilo gram-negativo entérico não coloniza o trato urinário por mera contiguidade mecânica; ele dispõe de um arsenal sofisticado de fatores genéticos de virulência:</p>

<ul>
  <li><strong>Fímbrias Tipo 1 (Manose-Sensíveis):</strong> Permitem a adesão bacteriana inicial às uroplaquinas da mucosa vesical, sendo expressas principalmente nas cistites;</li>
  <li><strong>Fímbrias P ou Pili associados à Pielonefrite (Manose-Resistentes):</strong> Ligam-se especificamente aos glicoesfingolipídeos da linhagem do antígeno P presentes no epitélio dos túbulos coletores e do parênquima renal, permitindo que a bactéria escale o ureter contra o fluxo urinário e cause pielonefrite aguda grave;</li>
  <li><strong>Toxinas e Sideróforos:</strong> Liberação de hemolisina alfa e aerobactina, que sequestram ferro do hospedeiro e provocam apoptose e lise das células tubulares renais.</li>
</ul>

<p><strong>Outros Uropatógenos Pediátricos Relevantes em Provas:</strong></p>
<ol>
  <li><strong><em>Klebsiella pneumoniae</em> e <em>Enterobacter cloacae</em>:</strong> Frequentes em lactentes com anomalias anatômicas obstrutivas e exposição prévia a antibióticos de amplo espectro;</li>
  <li><strong><em>Proteus mirabilis</em> (O Produtor de Urease):</strong> Clássico em meninos não circuncidados com colonização subprepucial. A enzima urease desdobra a ureia urinária em amônia e dióxido de carbono, alcalinizando dramaticamente o pH urinário ($pH > 7,5-8,0$). Essa alcalinização maciça precipita cristais de fosfato de magnésio e amônio (estruvita), formando os temidos <strong>Cálculos Renais Coraliformes</strong>;</li>
  <li><strong><em>Enterococcus faecalis</em> (Gram-Positivo):</strong> Ocorre em neonatos em UTI, pacientes com bexiga neurogênica e crianças submetidas a cateterismo vesical intermitente crônico;</li>
  <li><strong><em>Staphylococcus saprophyticus</em>:</strong> Causa frequente de cistite aguda em meninas adolescentes após a coitarca;</li>
  <li><strong><em>Pseudomonas aeruginosa</em>:</strong> Indicador fidedigno de infecção hospitalar nosocomial, manipulação cirúrgica urológica recente ou uso prolongado de sonda vesical de demora.</li>
</ol>

<h3>Mecanismos de Defesa do Hospedeiro e a Cascata de Lesão Parenquimatosa</h3>
<p>O organismo pediátrico sadio mantém a esterilidade da urina através de mecanismos antibacterianos eficientes: o <strong>fluxo urinário unidirecional contínuo e o esvaziamento vesical completo e regular</strong> (lavagem mecânica bacteriana); a alta osmolaridade e o pH ácido da urina; a barreira mucosa vesical recoberta de glicosaminoglicanos; e a <strong>Proteína de Tamm-Horsfall (Uromodulina)</strong>, que atua como uma molécula solúvel chamariz, aprisionando as fímbrias da <em>E. coli</em> e impedindo sua fixação ao urotélio.</p>

<p>Quando esses mecanismos falham (devido a estase urinária por refluxo ou obstrução mecânica), a bactéria invade o interstício renal. A resposta inflamatória aguda do hospedeiro — com influxo maciço de neutrófilos, liberação de enzimas lisossomais proteolíticas e geração de espécies reativas de oxigênio (estresse oxidativo) — destrói o tecido infectado, gerando isquemia microvascular e necrose intersticial. Na cicatrização, esse tecido nobre tubular é substituído por tecido fibroso inelástico, consolidando a <strong>Cicatriz Renal Parenquimatosa Permanente</strong>.</p>
`
};

export const sec2 = {
  id: 'manifestacoes-clinicas-por-faixa-etaria-e-localizacao',
  title: '2. Apresentação Clínica Estratificada: O Desafio Neonatal, ITU Alta vs Baixa e Pielonefrite',
  body_html: `
<h3>O Desafio Diagnóstico: A Inespecificidade dos Sintomas no Lactente</h3>
<p>A maior armadilha diagnóstica na pediatria reside na seguinte verdade clínica: <strong>quanto mais jovem a criança, mais atípicos, inespecíficos e frustros são os sintomas de uma infecção urinária</strong>. Enquanto o escolar e o adolescente queixam-se verbalmente da tríade miccional clássica, o recém-nascido e o lactente jovem manifestam a ITU como uma afecção sistêmica grave e silenciosa.</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Faixa Etária</th>
      <th>Sinais e Sintomas Mais Frequentes</th>
      <th>Pistas Clínicas de Alerta Máximo</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Recém-Nascidos (< 28 dias)</strong></td>
      <td><strong>Quadro indistinguível de Sepse Neonatal:</strong> Instabilidade térmica (hipotermia ou febre), letargia, irritabilidade extrema, recusa alimentar / sucção débil, distensão abdominal, perda ponderal acentuada, vômitos e hipoatividade.</td>
      <td><strong>Icterícia Colestática Prolongada</strong> (elevação de bilirrubina direta tardia induzida por endotoxinas bacterianas gram-negativas que inibem a excreção biliar canalicular).</td>
    </tr>
    <tr>
      <td><strong>Lactentes (< 2 anos)</strong></td>
      <td><strong>Febre sem Foco Aparente (FWS - Fever without Source):</strong> Febre alta (> 38,5 ºC a 39 ºC) isolada de início agudo sem qualquer sinal respiratório, catarral ou gastrointestinal. Vômitos intermitentes, estagnação ou perda da curva ponderal, diarreia leve e irritabilidade à micção (choro ao urinar).</td>
      <td>Urina turva com odor fétido forte e histórico prévio de irmãos com refluxo vesicoureteral ou anomalias fetais diagnosticadas na ultrassonografia obstétrica.</td>
    </tr>
    <tr>
      <td><strong>Pré-Escolares e Escolares (> 2 a 5 anos)</strong></td>
      <td><strong>Sintomas Urinários Específicos Localizatórios:</strong> Disúria (dor ou ardência miccional), polaciúria (micções frequentes de pequeno volume), urgência miccional, dor suprapúbica em cólica e enurese secundária (a criança que já havia adquirido controle esfincteriano noturno e diurno volta a urinar na cama e na roupa).</td>
      <td>Manobras de contenção miccional involuntárias: cruzar as pernas vigorosamente, agachar-se sentando sobre os calcanhares (Manobra de Vincent) para evitar a perda urinária dolorosa.</td>
    </tr>
  </tbody>
</table>

<h3>A Diferenciação Anatômica Crítica: ITU Alta versus ITU Baixa</h3>
<p>A distinção clínica e laboratorial entre o acometimento restrito à bexiga (Cistite) e a invasão do parênquima renal (Pielonefrite) é vital para definir o local de tratamento (ambulatorial versus internação), a escolha do antibiótico e a necessidade de investigação radiológica invasiva posterior:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Parâmetro Clínico-Laboratorial</th>
      <th>ITU Baixa (Cistite Aguda)</th>
      <th>ITU Alta (Pielonefrite Aguda)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Localização Anatômica</strong></td>
      <td>Mucosa vesical e uretra (Trato urinário baixo).</td>
      <td>Bacinete, cálices e parênquima renal (Néfrons).</td>
    </tr>
    <tr>
      <td><strong>Febre</strong></td>
      <td><strong>Ausente</strong> ou febrícula baixa (< 38,0 ºC).</td>
      <td><strong>Febre Alta ($\ge 38,5 - 39,0$ ºC)</strong>, frequentemente com calafrios e tremores.</td>
    </tr>
    <tr>
      <td><strong>Estado Geral / Toxicidade</strong></td>
      <td>Bom estado geral preservado, criança ativa e hidratada.</td>
      <td>Comprometimento sistêmico, prostração, toxemia, vômitos e recusa hídrica.</td>
    </tr>
    <tr>
      <td><strong>Dor Abdominal / Lombar</strong></td>
      <td>Desconforto ou queimação hipogástrica/suprapúbica.</td>
      <td>Dor em flancos ou lombar; <strong>Sinal de Giordano positivo</strong> (punho-percussão dolorosa na loja renal em maiores).</td>
    </tr>
    <tr>
      <td><strong>Provas de Fase Aguda (PCR / VHS)</strong></td>
      <td>Normais ou discretamente elevadas.</td>
      <td><strong>Marcantemente elevadas</strong>: Proteína C-Reativa (PCR) $> 20-40$ mg/L, VHS acelerado e procalcitonina alta.</td>
    </tr>
    <tr>
      <td><strong>Leucograma Periférico</strong></td>
      <td>Normal.</td>
      <td>Leucocitose importante com desvio escalonado para a esquerda (bastoneirada).</td>
    </tr>
    <tr>
      <td><strong>Risco de Cicatriz Renal Permanente</strong></td>
      <td><strong>NULO</strong> (não atinge o parênquima néfrico).</td>
      <td><strong>ELEVADO</strong> (risco real de dano parenquimatoso crônico).</td>
    </tr>
  </tbody>
</table>

<div class="book-case">
  <h4>A Regra de Ouro Pediátrica de Bolso (Diretriz SBP / AAP):</h4>
  <p><em>"Em lactentes e crianças com menos de 2 anos de idade, <strong>TODO episódio de infecção do trato urinário cursando com febre ($\ge 38,0$ ºC) deve ser presumido, abordado e tratado clinicamente como PIELONEFRITE AGUDA</strong> até prova em contrário, em virtude da incapacidade de localização semiológica confiável e do risco iminente de dano renal irreversível."</em></p>
</div>
`
};
