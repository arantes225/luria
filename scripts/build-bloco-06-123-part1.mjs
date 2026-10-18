// Bloco 6 - Aula 123: Febre sem Sinais Localizatórios - Part 1
export const sec1 = {
  id: 'definicao-clinica-e-epidemiologia-pos-vacinal',
  title: '1. Definição Clínica, História Epidemiológica e o Impacto das Vacinas Conjugadas',
  body_html: `
<h3>A Angústia Diagnóstica da Febre no Paciente Pediátrico</h3>
<p>A elevação da temperatura corpórea figura como a queixa clínica mais frequente nos serviços de emergência pediátrica e nas unidades básicas de saúde em todo o mundo, respondendo por cerca de 20% a 30% de todos os atendimentos ambulatoriais na infância. Na grande maioria dos casos, o pediatra identifica com facilidade o foco infeccioso na oroscopia (hiperemia de fauces, exsudato amigdaliano), na otoscopia pneumática (otite média aguda com abaulamento e hiperemia da membrana timpânica), no exame respiratório (taquipneia, estertores crepitantes) ou gastrointestinal (diarreia aguda e vômitos).</p>

<p>Contudo, em aproximadamente 15% a 20% dos lactentes febris, o médico defronta-se com um dos cenários mais desafiadores da pediatria: a <strong>Febre sem Sinais Localizatórios (FSSL)</strong>, também amplamente denominada na literatura internacional como <em>Fever without Source (FWS)</em>.</p>

<div class="formula-box">
  <p><strong>Definição Clínica Canônica e Operacional de FSSL (SBP / AAP):</strong></p>
  <blockquote>
    "A Febre sem Sinais Localizatórios (FSSL) é definida rigorosamente pela presença de temperatura corpórea axilar $\ge 37,8 - 38,0$ ºC (ou temperatura retal $\ge 38,3$ ºC) com <strong>duração máxima de até 7 dias</strong>, na qual <strong>uma anamnese minuciosa associada a um exame físico pediátrico detalhado e completo não foram capazes de identificar qualquer foco evidente de infecção</strong>, acometendo tipicamente crianças <strong>menores de 36 meses (3 anos) de idade</strong>."
  </blockquote>
</div>

<h3>Distinção Conceitual Crítica: FSSL versus Febre de Origem Indeterminada (FOI)</h3>
<p>Uma pegadinha clássica em provas de residência médica é a confusão deliberada entre FSSL e FOI. Observe o contraste conceitual intransponível:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Critério Diferencial</th>
      <th>Febre sem Sinais Localizatórios (FSSL)</th>
      <th>Febre de Origem Indeterminada (FOI Pediátrica)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Duração Temporal da Febre</strong></td>
      <td><strong>Curta duração: menos de 7 dias</strong> (tipicamente 24 a 72 horas de evolução no pronto-socorro).</td>
      <td><strong>Longa duração: febre persistente por $\ge 8$ a 14 dias</strong> (segundo a SBP) ou $\ge 3$ semanas (critério clássico de Petersdorf).</td>
    </tr>
    <tr>
      <td><strong>Faixa Etária Típica</strong></td>
      <td><strong>Lactentes e crianças menores de 36 meses</strong> (período de extrema vulnerabilidade imunológica).</td>
      <td>Qualquer faixa etária pediátrica (pré-escolares, escolares e adolescentes).</td>
    </tr>
    <tr>
      <td><strong>Investigação Prévia</strong></td>
      <td>Nenhum exame prévio realizado; criança recém-chegada à emergência com exame físico normal.</td>
      <td>Paciente submetido a extensa investigação laboratorial e radiológica hospitalar prévia por 1 semana sem diagnóstico.</td>
    </tr>
    <tr>
      <td><strong>Etiologia Mais Frequente</strong></td>
      <td><strong>Infecções virais autolimitadas (90%)</strong> ou Infecção Bacteriana Grave Oculta (IBO - 10%).</td>
      <td>Doenças infecciosas atípicas crônicas (tuberculose, bartonelose, CMV, endocardite), <strong>doenças reumatológicas autoimunes</strong> (Doença de Kawasaki, Artrite Idiopática Juvenil) e <strong>neoplasias</strong> (leucemias, linfomas, neuroblastoma).</td>
    </tr>
  </tbody>
</table>

<h3>A Revolução Epidemiológica: A Era Pré-Vacinal versus A Era Pós-Vacinas Conjugadas</h3>
<p>A abordagem diagnóstica e a angústia em torno da FSSL sofreram uma transformação radical nas últimas três décadas, dividindo a história da infectologia pediátrica em duas eras distintas:</p>

<ul>
  <li><strong>1. A Era Pré-Vacinas Conjugadas (Décadas de 1970 a 1990): O Pavor da Bacteremia Oculta por Hib e Pneumococo</strong>
    <ul>
      <li>Nesse período histórico, aproximadamente <strong>3% a 5% de todos os lactentes febris sem foco</strong> apresentavam <strong>Bacteremia Oculta (BO)</strong> no sangue periférico;</li>
      <li>O principal agente etiológico era o <em>Streptococcus pneumoniae</em> (responsável por 80% a 85% das bacteremias ocultas), seguido pelo temido <strong><em>Haemophilus influenzae</em> tipo b (Hib)</strong> (responsável por 10% a 15% dos casos);</li>
      <li>A bacteremia oculta por Hib era uma catástrofe clínica silenciosa: até 20% a 30% desses lactentes aparentemente bem evoluíam rapidamente para <strong>Meningite Bacteriana fulminante purulenta, celulite periorbitária, pericardite ou choque séptico</strong>;</li>
      <li>Por essa razão, os protocolos clássicos da época (Protocolo de Boston, Rochester e Philadelphia da década de 1990) adotavam condutas agressivas: internação hospitalar universal e antibioticoterapia empírica maciça em quase todos os lactentes febris.</li>
    </ul>
  </li>
  <li><strong>2. A Era Pós-Vacinas Conjugadas Contemporânea (PNI Moderno no Brasil e no Mundo):</strong>
    <ul>
      <li>A introdução e consolidação universal da <strong>Vacina Pentavalente (contendo Hib)</strong> em 1999 e da <strong>Vacina Pneumocócica Conjugada 10-valente (VPC-10)</strong> e 13-valente (VPC-13) em 2010 no Programa Nacional de Imunizações (PNI) provocou uma <strong>queda vertiginosa superior a 95% nas taxas de bacteremia oculta</strong> em crianças vacinadas;</li>
      <li>Hoje, em crianças que receberam pelo menos <strong>duas doses da vacina pneumocócica conjugada e da vacina contra Hib</strong>, a taxa de bacteremia oculta despencou para <strong>menos de 0,2% a 0,5%</strong>!;</li>
      <li><strong>A Consequência Epidemiológica Soberana:</strong> A <strong>Infecção do Trato Urinário (ITU) Oculta assumiu o posto isolado de INFECÇÃO BACTERIANA GRAVE MAIS COMUM da criança com FSSL</strong> (responsável por mais de 80% a 90% de todas as infecções bacterianas ocultas na era pós-vacinal!).</li>
    </ul>
  </li>
</ul>
`
};

export const sec2 = {
  id: 'infeccoes-bacterianas-graves-ibg-e-o-espectro-oculto',
  title: '2. O Espectro das Infecções Bacterianas Graves (IBG/IBO): Foco Urinário, Sepse e Bacteremia Oculta',
  body_html: `
<h3>O Conceito de Infecção Bacteriana Oculta (IBO / SBI - Serious Bacterial Infection)</h3>
<p>Embora mais de 85% a 90% dos lactentes que se apresentam com FSSL tenham como agente etiológico uma <strong>infecção viral benigna e autolimitada</strong> (vírus respiratórios sinciciais, enterovírus, adenovírus, herpes-vírus humano tipo 6 causando Exantema Súbito / Roséola, rinovírus, influenza e metapneumovírus), a missão do médico emergencista não é diagnosticar o vírus. Sua responsabilidade vital e indelegável é <strong>identificar os 10% a 15% de lactentes que albergam uma Infecção Bacteriana Grave Oculta (IBO)</strong> antes que ela evolua para choque séptico irreversível ou destruição parenquimatosa permanente.</p>

<p>O espectro clínico das Infecções Bacterianas Ocultas divide-se em quatro entidades patológicas essenciais:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Entidade Clínica Oculta</th>
      <th>Etiologia Microbiológica Típica</th>
      <th>Prevalência na Era Vacinal Atual</th>
      <th>Fisiopatologia e Risco Clínico Potencial</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>1. Infecção do Trato Urinário Oculta (ITU)</strong><br>(Pielonefrite Aguda)</td>
      <td><strong><em>Escherichia coli</em> Uropatogênica (UPEC)</strong> (> 80%), <em>Klebsiella pneumoniae</em>, <em>Proteus mirabilis</em>, <em>Enterococcus faecalis</em>.</td>
      <td><strong>A Mais Frequente de Todas: 5% a 10%</strong> de todos os lactentes com FSSL (chega a 15% em meninas < 1 ano e 10% em meninos não circuncidados).</td>
      <td>Ascensão bacteriana imperceptível pela uretra até o parênquima renal. Apresenta-se com febre isolada sem nenhum sintoma urinário verbalizável. Risco temido de cicatrizes renais parenquimatosas crônicas e hipertensão arterial secundária.</td>
    </tr>
    <tr>
      <td><strong>2. Bacteremia Oculta (BO)</strong></td>
      <td><em>Streptococcus pneumoniae</em> (sorotipos não vacinais residuais), <em>Neisseria meningitidis</em>, <em>Staphylococcus aureus</em>, <em>Salmonella enterica</em> não tifóide.</td>
      <td><strong>Rara na era vacinal atual: < 0,5%</strong> em crianças imunizadas com 2+ doses de VPC-10/13.</td>
      <td>Presença temporária e silenciosa de bactérias viáveis proliferando na corrente sanguínea de um lactente febril que <strong>não aparenta toxemia nem foco clínico inicial</strong>. Risco de "semeadura hematogênica metastática" para meninges, articulações e ossos.</td>
    </tr>
    <tr>
      <td><strong>3. Pneumonia Oculta (Bacteriana Sem Taquipneia Inicial)</strong></td>
      <td><em>Streptococcus pneumoniae</em>, <em>Staphylococcus aureus</em>.</td>
      <td><strong>1% a 3%</strong> dos lactentes com leucocitose expressiva no sangue.</td>
      <td>Consolidação alveolar lobar ou segmentar profunda em lobos inferiores ou retrocardíacos que não produz estertores auscultatórios audíveis nem tiragem precoce. Clássica em lactentes com leucocitose $> 20.000/\text{mm}^3$ e febre $> 39,0$ ºC.</td>
    </tr>
    <tr>
      <td><strong>4. Osteomielite Aguda e Artrite Séptica Oculta</strong></td>
      <td><em>Staphylococcus aureus</em> (incluindo CA-MRSA), <em>Kingella kingae</em> (em lactentes < 2 anos), <em>Streptococcus pyogenes</em>.</td>
      <td>$< 1\%$ dos casos de FSSL.</td>
      <td>Instalação insidiosa na metáfise de ossos longos (fêmur, tíbia) ou articulações profundas (quadril, joelho). O lactente manifesta febre e irritabilidade difusa ao ser manipulado na troca de fraldas (pseudoparalisia antálgica do membro), sem calor ou rubor óbvio inicial.</td>
    </tr>
  </tbody>
</table>

<div class="book-case">
  <h4>A Definição de Ouro da Bacteremia Oculta (BO):</h4>
  <p><em>"A Bacteremia Oculta é a presença confirmada de hemocultura positiva em uma criança com febre sem foco, com idade entre 3 e 36 meses, que <strong>apresenta BOM ESTADO GERAL e aparência clínica não toxêmica à inspeção médica inicial</strong>."</em></p>
  <p>Se a criança febril com hemocultura positiva apresentar letargia, palidez terrosa, má perfusão periférica, cianose ou hipotensão, o quadro <strong>NÃO É BACTEREMIA OCULTA, MAS SIM SEPSE / CHOQUE SÉPTICO DECLARADO</strong>, exigindo ressuscitação volêmica imediata e antibioticoterapia venosa na primeira hora (Golden Hour)!</p>
</div>
`
};
