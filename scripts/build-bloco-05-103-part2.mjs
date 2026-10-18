// Bloco 5 - Aula 103: Tuberculose na Infância (Parte 2: Seções 6 a 10)

export const sec6 = {
  id: 'manejo-do-recem-nascido-exposto-a-mae-bacilifera',
  title: '6. Profilaxia Primária: O Algoritmo Completo do Recém-Nascido Exposto a Mãe Bacilífera',
  body_html: `
<h3>O Dilema Biológico do Recém-Nascido e da Vacina BCG</h3>
<p>Um dos algoritmos mais cobrados, emblemáticos e com maior taxa de pegadinhas em provas de residência médica de todo o Brasil é a conduta preconizada pelo Ministério da Saúde diante do <strong>Recém-Nascido (RN) cuja mãe é portadora de tuberculose pulmonar bacilífera (ou laríngea) ativa</strong> no momento do parto.</p>

<p>A regra inegociável fundamental é: <strong>O RECÉM-NASCIDO EXPOSTO A MÃE BACILÍFERA NÃO DEVE RECEBER A VACINA BCG NA MATERNIDADE!</strong></p>

<p><em>Racional Fisiopatológico:</em> A vacina BCG é composta por bacilos vivos atenuados de <em>Mycobacterium bovis</em>. Se o RN receber a vacina BCG e concomitantemente iniciarmos a profilaxia farmacológica com Isoniazida ou Rifampicina, a medicação antimicrobiana destruirá os bacilos vacinais antes que eles possam deflagrar a resposta imune protetora, inutilizando completamente a vacina. Além disso, se o RN já tiver sido infectado no ambiente materno, a administração de BCG poderia induzir reações adversas severas.</p>

<h3>O Algoritmo Passo a Passo do Ministério da Saúde do Brasil</h3>
<ol>
  <li><strong>Passo 1: Avaliação Clínica Inicial do Recém-Nascido ao Nascer:</strong>
    <ul>
      <li>Avaliar meticulosamente sinais clínicos sugestivos de <strong>Tuberculose Congênita</strong> (baixo peso ao nascer, hepatoesplenomegalia maciça, linfadenopatia, icterícia persistente, desconforto respiratório neonatal inexplicado e febre);</li>
      <li>Se o RN apresentar sinais clínicos ou radiológicos de tuberculose ativa $\rightarrow$ <strong>Interromper a profilaxia e iniciar imediatamente o tratamento pleno com esquema RHZ pediátrico</strong>;</li>
      <li>Se o RN for perfeitamente <strong>ASSINTOMÁTICO</strong> (cenário habitual em mais de 95% das situações) $\rightarrow$ Prosseguir para o Passo 2;</li>
    </ul>
  </li>
  <li><strong>Passo 2: Início Imediato da Quimioprofilaxia Primária (Sem BCG!):</strong>
    <ul>
      <li><strong>NÃO vacinar com BCG ao nascimento!</strong> Adiar a vacinação;</li>
      <li>Iniciar imediatamente quimioprofilaxia primária com <strong>Isoniazida (H) na dose de 10 mg/kg/dia</strong> (máximo de 300 mg/dia) por via oral em tomada única matinal (ou <strong>Rifampicina 10 mg/kg/dia</strong> na indisponibilidade de isoniazida);</li>
      <li><strong>Amamentação:</strong> O aleitamento materno é <strong>PERMITIDO E ESTIMULADO</strong>, desde que a mãe utilize <strong>máscara cirúrgica simples e lave rigorosamente as mãos</strong> ao amamentar e cuidar do bebê, até que ela complete pelo menos 15 dias de tratamento bacilífero e apresente baciloscopias negativas. A mãe não deve beijar a face da criança;</li>
    </ul>
  </li>
  <li><strong>Passo 3: Avaliação aos 3 Meses de Vida com Prova Tuberculínica (PPD):</strong>
    <ul>
      <li>O RN mantém o uso diário da Isoniazida continuamente por <strong>3 meses (90 dias)</strong>;</li>
      <li>Ao completar 3 meses de vida sob uso da profilaxia, realiza-se a <strong>Prova Tuberculínica (PPD)</strong> na criança:</li>
    </ul>
  </li>
</ol>

<table class="book-table">
  <thead>
    <tr>
      <th>Resultado do PPD aos 3 Meses de Vida</th>
      <th>Interpretação Imunológica Real</th>
      <th>Conduta Farmacológica</th>
      <th>Conduta em Relação à Vacina BCG</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>PPD REATOR ($\ge 5\\text{ mm}$)</strong></td>
      <td><strong>O RN foi INFECTADO pelo bacilo de Koch</strong> materno antes de a profilaxia bloquear a infecção (converteu a imunidade celular para infecção latente).</td>
      <td><strong>MANTER A ISONIAZIDA por mais 3 meses</strong> adicionais (completando o tempo total de <strong>6 meses de tratamento da ILTB</strong>).</td>
      <td><strong>NUNCA MAIS VACINAR COM BCG!</strong> A criança já está imunologicamente infectada pelo <em>M. tuberculosis</em> selvagem; a vacina com <em>M. bovis</em> não traz nenhum benefício adicional e está contraindicada.</td>
    </tr>
    <tr>
      <td><strong>PPD NÃO REATOR ($&lt; 5\\text{ mm}$)</strong></td>
      <td><strong>O RN NÃO FOI INFECTADO pelo bacilo de Koch</strong> (a profilaxia foi 100% eficaz em impedir a fixação da primo-infecção).</td>
      <td><strong>SUSPENDER IMEDIATAMENTE A ISONIAZIDA!</strong> Encerrar a quimioprofilaxia aos 3 meses.</td>
      <td><strong>VACINAR COM A BCG IMEDIATAMENTE!</strong> Como o RN é virgem de infecção e a isoniazida foi suspensa, ele pode agora receber com total segurança a vacina BCG intradérmica para garantir proteção contra formas graves.</td>
    </tr>
  </tbody>
</table>
`
};

export const sec7 = {
  id: 'tratamento-da-infeccao-latente-pelo-mycobacterium-tuberculosis-iltb',
  title: '7. Tratamento da Infecção Latente por TB (ILTB): Esquemas Isoniazida e o Novo Esquema Rifapentina (3HP)',
  body_html: `
<h3>O Conceito e o Racional do Tratamento da ILTB</h3>
<p>O <strong>Tratamento da Infecção Latente pelo <em>Mycobacterium tuberculosis</em> (ILTB)</strong> — historicamente denominado <em>quimioprofilaxia secundária</em> — consiste na administração de antimicrobianos a indivíduos infectados pelo bacilo (comprovados por PPD reator ou IGRA positivo), porém <strong>clinicamente assintomáticos e com radiografia de tórax rigorosamente normal</strong>. O objetivo precípuo é erradicar os bacilos quiescentes dormentes nos granulomas, prevenindo a transição biológica para tuberculose ativa com destruição pulmonar ou disseminação meníngea.</p>

<h3>Indicações Formais de Tratamento da ILTB em Crianças e Adolescentes</h3>
<ol>
  <li><strong>Crianças Contatos Domiciliares de Adultos com Tuberculose Pulmonar Bacilífera:</strong>
    <ul>
      <li>Após exclusão de doença ativa (assintomáticas com raio-X de tórax normal);</li>
      <li>Se PPD $\ge 5\\text{ mm}$ (ou IGRA positivo) $\rightarrow$ Tratamento compulsório da ILTB;</li>
      <li>Se a criança tiver <strong>menos de 10 anos de idade e for contato domiciliar íntimo</strong> de caso bacilífero, a investigação da ILTB é prioritária absoluta no SUS;</li>
    </ul>
  </li>
  <li><strong>Crianças Vivendo com HIV (CVHIV):</strong> Qualquer criança infectada pelo HIV que apresente contato com TB (independentemente do PPD) OU que apresente PPD $\ge 5\\text{ mm}$ (mesmo sem histórico de contato conhecido);</li>
  <li><strong>Candidatos ao Uso de Terapia Imunossupressora:</strong> Crianças que iniciarão uso de inibidores de TNF-alfa (Infliximabe, Adalimumabe, Etanercepte) ou corticosteroides em doses imunossupressoras ($\ge 2\\text{ mg/kg/dia}$ de prednisona por mais de 14 dias) que apresentem PPD $\ge 5\\text{ mm}$ ou conversão tuberculínica recente.</li>
</ol>

<h3>Os Esquemas Farmacológicos Atuais do Ministério da Saúde do Brasil</h3>
<table class="book-table">
  <thead>
    <tr>
      <th>Regime Terapêutico</th>
      <th>Drogas, Doses e Frequência</th>
      <th>Duração Total / Tomadas</th>
      <th>Vantagens e Indicação Pediátrica</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Esquema 3HP<br>(Rifapentina &plusmn; Isoniazida)</strong><br>(O Novo Padrão de Escolha no Brasil)</td>
      <td><strong>Rifapentina (RPT) &plusmn; Isoniazida (H)</strong> administradas <strong>UMA ÚNICA VEZ POR SEMANA</strong>.<br>Doses ajustadas por faixa de peso (Rifapentina 300 a 900 mg + Isoniazida 300 a 900 mg semanais).</td>
      <td><strong>12 semanas (apenas 12 doses semanais supervisionadas!).</strong></td>
      <td><strong>Revolução na adesão terapêutica!</strong> Reduz o tempo de tratamento de 6-9 meses para meras 12 tomadas semanais. Menor hepatotoxicidade. <strong>Aprovado para crianças a partir de 2 anos de idade</strong>.</td>
    </tr>
    <tr>
      <td><strong>Esquema 4R<br>(Rifampicina Diária)</strong></td>
      <td><strong>Rifampicina (R)</strong> oral na dose de <strong>10 mg/kg/dia</strong> (máx. 600 mg/dia) em tomada única diária.</td>
      <td><strong>4 meses (120 doses diárias).</strong></td>
      <td>Excelente opção para <strong>crianças menores de 2 anos</strong>, para pacientes com intolerância à isoniazida ou quando o caso índice tiver tuberculose resistente à isoniazida e sensível à rifampicina. Menor risco de hepatotoxicidade que a isoniazida.</td>
    </tr>
    <tr>
      <td><strong>Esquema Clássico de Isoniazida (6H / 9H)</strong></td>
      <td><strong>Isoniazida (H)</strong> oral na dose de <strong>10 mg/kg/dia</strong> (máx. 300 mg/dia) em tomada única diária.</td>
      <td><strong>270 doses diárias (tomadas entre 9 e 12 meses)</strong> ou mínimo de 180 doses em 6 meses.</td>
      <td>Esquema tradicional amplamente disponível no SUS. Desvantagem: longa duração com taxas elevadas de abandono e esquecimento.</td>
    </tr>
  </tbody>
</table>
`
};

export const sec8 = {
  id: 'esquemas-terapeuticos-pediatricos-rhz-rhze-e-neurotuberculose',
  title: '8. Esquemas Terapêuticos da TB Ativa na Infância: O Esquema RHZ Pediátrico e o Esquema RHZE de Meningite',
  body_html: `
<h3>Por que Crianças Menores de 10 Anos Não Usam Etambutol na Forma Pulmonar?</h3>
<p>No tratamento padrão de adultos e adolescentes maiores com tuberculose pulmonar, o esquema clássico é composto por 4 drogas associadas no regime RIPE: <strong>Rifampicina (R) + Isoniazida (H) + Pirazinamida (Z) + Etambutol (E)</strong>. Contudo, em <strong>crianças menores de 10 anos de idade</strong>, o esquema padrão para tuberculose pulmonar é composto por apenas <strong>TRÊS DROGAS: Esquema RHZ (sem Etambutol!)</strong>.</p>

<p><em>Racional Farmacológico e Toxicológico:</em> O principal efeito adverso temido do Etambutol é a <strong>Neurite Óptica Tóxica Retrobulbar</strong>, manifestada clinicamente por redução precoce da acuidade visual e perda da discriminação das cores verde e vermelha (discromatopsia). Crianças menores de 10 anos (especialmente lactentes e pré-escolares) são incapazes de verbalizar que estão perdendo a visão de cores ou que sua nitidez visual está decaindo. Como a neurite óptica pode progredir para atrofia do nervo óptico e cegueira permanente se a droga não for suspensa precocemente, e como a carga bacilar pediátrica é baixa (paucibacilar), as diretrizes do Ministério da Saúde e da OMS <strong>dispensam com segurança o uso do Etambutol em menores de 10 anos com formas pulmonares</strong>.</p>

<h3>1. Esquema Básico para Tuberculose Pulmonar e Extrapolar (Exceto Meningoencefálica e Osteoarticular)</h3>
<table class="book-table">
  <thead>
    <tr>
      <th>Faixa Etária</th>
      <th>Fase de Ataque / Intensiva (2 Primeiros Meses)</th>
      <th>Fase de Manutenção / Consolidação (4 Meses Seguintes)</th>
      <th>Tempo Total de Tratamento</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Crianças Menores de 10 Anos</strong> (&lt; 10 anos)</td>
      <td><strong>2 Meses de RHZ:</strong><br><strong>Rifampicina (R)</strong> 15 mg/kg/dia<br><strong>Isoniazida (H)</strong> 10 mg/kg/dia<br><strong>Pirazinamida (Z)</strong> 35 mg/kg/dia</td>
      <td><strong>4 Meses de RH:</strong><br><strong>Rifampicina (R)</strong> 15 mg/kg/dia<br><strong>Isoniazida (H)</strong> 10 mg/kg/dia</td>
      <td><strong>6 Meses</strong> (2 RHZ / 4 RH)</td>
    </tr>
    <tr>
      <td><strong>Adolescentes a Partir de 10 Anos e Adultos</strong> ($\ge 10$ anos)</td>
      <td><strong>2 Meses de RHZE (RIPE):</strong><br>Rifampicina (10 mg/kg) + Isoniazida (5 mg/kg) + Pirazinamida (20-30 mg/kg) + <strong>Etambutol (E)</strong> (15-20 mg/kg) em comprimido de dose fixa combinada 4 em 1.</td>
      <td><strong>4 Meses de RH:</strong><br>Rifampicina + Isoniazida</td>
      <td><strong>6 Meses</strong> (2 RHZE / 4 RH)</td>
    </tr>
  </tbody>
</table>

<h3>2. Esquema para Meningoencefalite Tuberculosa e Forma Osteoarticular (12 Meses!)</h3>
<p>A neurotuberculose e a tuberculose óssea (Mal de Pott) exigem penetração liquórica e tecidual óssea profundas e esquemas farmacológicos muito mais prolongados e potentes:</p>

<ul>
  <li><strong>Drogas e Doses:</strong> Utiliza-se obrigatoriamente o <strong>Esquema com 4 Drogas: RHZE (com Etambutol!)</strong> mesmo em crianças menores de 10 anos de idade, pois a barreira hematoencefálica inflamada exige máxima potência antimicrobiana e o risco iminente de morte ou herniação encefálica supera os potenciais riscos oculares;</li>
  <li><strong>Duração Estendida de 12 Meses:</strong>
    <ul>
      <li><strong>Fase Intensiva (2 Meses):</strong> 2 meses de <strong>RHZE</strong> (Rifampicina + Isoniazida + Pirazinamida + Etambutol);</li>
      <li><strong>Fase de Manutenção (10 Meses):</strong> 10 meses de <strong>RH</strong> (Rifampicina + Isoniazida);</li>
    </ul>
  </li>
  <li><strong>Corticoterapia Adjuvante Obrigatória na Neurotuberculose:</strong> A associação de <strong>Prednisona oral (1 a 2 mg/kg/dia por 4 a 8 semanas com desmame gradual)</strong> ou <strong>Dexametasona intravenosa (0,4 mg/kg/dia nas primeiras semanas)</strong> é inegociável! Meta-análises internacionais comprovaram que o corticoide reduz a aracnoidite basal, diminui as vasculites e os infartos cerebrais, reduz a hidrocefalia e <strong>diminui significativamente a mortalidade</strong> de pacientes com meningite tuberculosa.</li>
</ul>
`
};

export const sec9 = {
  id: 'casos-clinicos-estruturados-e-tomada-de-decisao-em-tb-pediatrica',
  title: '9. Casos Clínicos Estruturados: Aplicação Prática do Escore de Pontos e Diagnóstico de TB',
  body_html: `
<h3>Caso Clínico 1: Aplicação Fiel do Escore de Pontos do Ministério da Saúde na UBS</h3>
<p><strong>Identificação:</strong> Menino de 3 anos e 6 meses de vida é levado pela avó à Unidade Básica de Saúde (UBS) com queixa de tosse diária iniciada há cerca de 3 semanas (21 dias). A avó relata que a criança "está quente no final da tarde" todos os dias, come muito mal e perdeu 1,5 kg no último mês (a análise da curva de crescimento comprova desaceleração ponderal acentuada). A criança já fez uso de Amoxicilina por 10 dias prescrita na UPA há duas semanas, sem qualquer melhora do quadro.</p>

<p><strong>Investigação Epidemiológica:</strong> Ao ser interrogada ativamente sobre contatos na residência, a avó informa que o pai da criança mora na mesma casa e foi diagnosticado há 4 meses com tuberculose pulmonar bacilífera (baciloscopia positiva ++/4), estando atualmente no 4º mês de tratamento com RIPE.</p>

<p><strong>Exames Complementares Realizados:</strong></p>
<ul>
  <li><strong>Radiografia de Tórax (PA e Perfil):</strong> Evidencia condensação parenquimatosa heterogênea no lobo superior direito persistente associada a nítido <strong>alargamento do hilo pulmonar homolateral com linfadenomegalia hilar direita</strong> evidente no perfil;</li>
  <li><strong>Prova Tuberculínica (PPD):</strong> Aplicado no antebraço e lido após 72 horas com régua milimetrada: <strong>Induração de 12 mm</strong> (PPD Reator Forte).</li>
</ul>

<p><strong>Cálculo do Escore de Pontos do Ministério da Saúde:</strong></p>
<ol>
  <li><strong>Quadro Clínico:</strong> Tosse, febre e emagrecimento por $\ge 15$ dias $\rightarrow$ <strong>$+15$ Pontos</strong>;</li>
  <li><strong>Quadro Radiológico:</strong> Condensação parenquimatosa com linfadenomegalia hilar por $\ge 15$ dias $\rightarrow$ <strong>$+15$ Pontos</strong>;</li>
  <li><strong>História de Contato:</strong> Contato íntimo domiciliar com caso de tuberculose bacilífera nos últimos 2 anos $\rightarrow$ <strong>$+10$ Pontos</strong>;</li>
  <li><strong>Prova Tuberculínica (PPD):</strong> PPD reator $\ge 10\\text{ mm}$ $\rightarrow$ <strong>$+10$ Pontos</strong>.</li>
</ol>
<p><strong>Pontuação Total Acumulada: 15 + 15 + 10 + 10 = 50 PONTOS!</strong></p>
<p><strong>Conduta Médica Imediata:</strong> Com 50 pontos ($\ge 40$ pontos), o diagnóstico é <strong>MUITO PROVÁVEL</strong>. A conduta mandatória é: <strong>NÃO PERDER TEMPO COM PROCEDIMENTOS INVASIVOS DE COLETA</strong>. Realizar a Notificação Compulsória Imediata no SINAN e <strong>INICIAR IMEDIATAMENTE O TRATAMENTO PARA TUBERCULOSE COM O ESQUEMA RHZ PEDIÁTRICO</strong> (Rifampicina 15 mg/kg + Isoniazida 10 mg/kg + Pirazinamida 35 mg/kg por 2 meses, seguidos de 4 meses de RH). A criança evoluiu com ganho ponderal acelerado e resolução clínica completa.</p>

<h3>Caso Clínico 2: Conduta no RN Exposto a Mãe com TB Pulmonar Bacilífera</h3>
<p><strong>Identificação:</strong> Gestante de 24 anos com 38 semanas de idade gestacional dá à luz por parto vaginal hospitalar a um recém-nascido a termo, peso de 3.200 g, Apgar 9/10, assintomático. Durante o internamento no alojamento conjunto, a puérpera informa que está tratando tuberculose pulmonar bacilífera há apenas 5 dias (baciloscopia de escarro colhida há 1 semana revelou BAAR +++).</p>

<p><strong>Conduta Racional do Neonatologista:</strong></p>
<ul>
  <li>O recém-nascido é examinado detalhadamente: exame físico perfeitamente normal, sem hepatoesplenomegalia nem desconforto;</li>
  <li><strong>Comando 1: SUSPENDER A VACINAÇÃO COM BCG NA MATERNIDADE!</strong> Orientar formalmente a equipe de enfermagem da sala de vacinas a não aplicar a BCG;</li>
  <li><strong>Comando 2: Iniciar Isoniazida Oral na dose de 10 mg/kg/dia (32 mg/dia)</strong> em dose única diária contínua;</li>
  <li><strong>Comando 3: Estimular a Amamentação Natural:</strong> O leite materno não transmite o bacilo; a mãe deve utilizar máscara cirúrgica facial e higienizar as mãos antes de tocar e amamentar o bebê;</li>
  <li><strong>Comando 4: Programar a Reavaliação aos 3 Meses com PPD:</strong> O bebê retorna aos 3 meses de vida em uso contínuo de isoniazida. Realiza-se o PPD:
    <ul>
      <li>Se PPD &lt; 5 mm: suspender a isoniazida e vacinar com a BCG imediatamente;</li>
      <li>Se PPD $\ge 5$ mm: manter a isoniazida por mais 3 meses adicionais (totalizando 6 meses de ILTB) e nunca vacinar com BCG.</li>
    </ul>
  </li>
</ul>
`
};

export const sec10 = {
  id: 'bateria-de-questoes-comentadas-tb-infancia',
  title: '10. Bateria de Questões Comentadas do ENAMED e Grandes Concursos Médicos de Residência',
  body_html: `
<h3>Questões com Discussão Profunda de Gabarito e Distratores</h3>

<h4>Questão 1: ENARE / ENAMED — Sistema de Escore de Pontos do Ministério da Saúde</h4>
<p><strong>Enunciado:</strong> Uma menina de 4 anos é levada ao centro de saúde com história de tosse seca há 25 dias, febre diária vespertina e perda de peso de 1 kg no período. A radiografia de tórax evidencia condensação parenquimatosa no terço médio do hemitórax direito associada a linfadenomegalia hilar homolateral. O teste tuberculínico (PPD) revela enduração palpável de 11 mm. A família nega qualquer conhecimento de contato com adultos com tosse crônica ou tuberculose na vizinhança ou domicílio. De acordo com o sistema de pontuação do Ministério da Saúde para o diagnóstico de tuberculose pulmonar na infância, a pontuação acumulada e a conduta recomendada são:</p>
<p>A) 30 pontos; diagnóstico possível, devendo-se solicitar tomografia computadorizada e aguardar 3 meses para novo PPD.<br>
B) 40 pontos; diagnóstico muito provável, recomendando-se o início imediato do tratamento para tuberculose.<br>
C) 25 pontos; diagnóstico pouco provável, devendo-se prescrever azitromicina oral por 5 dias.<br>
D) 50 pontos; diagnóstico de tuberculose multirresistente, indicando-se esquema com amicacina e levofloxacino.<br>
E) 15 pontos; iniciar apenas quimioprofilaxia secundária com isoniazida em monoterapia.</p>
<p><strong>Gabarito Oficial: Alternativa B.</strong></p>
<p><strong>Comentário Detalhado:</strong><br>
• <strong>Alternativa B (Correta):</strong> Cálculo detalhado do escore oficial:
1. Quadro clínico com tosse, febre e emagrecimento por $\ge 15$ dias: <strong>$+15$ pontos</strong>;
2. Radiografia com condensação e adenopatia hilar por $\ge 15$ dias: <strong>$+15$ pontos</strong>;
3. Ausência de história conhecida de contato com tuberculose: <strong>$0$ ponto</strong>;
4. PPD reator $\ge 10$ mm: <strong>$+10$ pontos</strong>.<br>
<strong>Soma Total: $15 + 15 + 0 + 10 = 40$ PONTOS!</strong><br>
Pela regra ministerial, pontuação <strong>$\ge 40$ pontos</strong> classifica o caso como <strong>Diagnóstico Muito Provável</strong>, autorizando e determinando o <strong>início imediato do tratamento com o esquema RHZ pediátrico</strong>, dispensando exames invasivos. Alternativa B impecável.</p>

<h4>Questão 2: USP-SP — Manejo do Recém-Nascido Filho de Mãe Bacilífera</h4>
<p><strong>Enunciado:</strong> Um recém-nascido a termo, com peso de 3.100 g, sem malformações, nasce de parto cesáreo indicado por sofrimento fetal agudo. A mãe tem diagnóstico confirmado de tuberculose pulmonar bacilífera (baciloscopia positiva), tendo iniciado o tratamento farmacológico com RIPE há 3 dias. Em relação aos cuidados com este recém-nascido na maternidade, a conduta correta é:</p>
<p>A) Aplicar a vacina BCG e iniciar quimioprofilaxia com isoniazida por 6 meses; contraindicar formalmente o aleitamento materno.<br>
B) Não aplicar a vacina BCG ao nascimento, iniciar quimioprofilaxia primária com isoniazida (ou rifampicina) por 3 meses e realizar teste tuberculínico (PPD) ao final deste período; permitir a amamentação com o uso de máscara cirúrgica pela mãe.<br>
C) Aplicar a vacina BCG no braço direito e vacina contra hepatite B no braço esquerdo; isolar o recém-nascido da mãe até a negativação do escarro materno.<br>
D) Iniciar esquema quádruplo com RHZE para o recém-nascido por 2 meses.<br>
E) Realizar lavado gástrico imediato no recém-nascido e, se negativo, liberar para casa vacinado com BCG sem medicamentos.</p>
<p><strong>Gabarito Oficial: Alternativa B.</strong></p>
<p><strong>Comentário Detalhado:</strong><br>
• <strong>Alternativa B (Correta):</strong> O protocolo do Ministério da Saúde para o RN exposto à mãe bacilífera estabelece:
1. <strong>NÃO vacinar com BCG ao nascer</strong> (o antibiótico profilático inativaria a cepa vacinal atenuada de <em>M. bovis</em>);
2. <strong>Iniciar quimioprofilaxia com Isoniazida (10 mg/kg/dia) por 3 meses</strong>;
3. <strong>Avaliar com PPD aos 3 meses de vida</strong> (se &lt; 5 mm, suspende a droga e aplica a BCG; se $\ge 5$ mm, completa 6 meses de isoniazida e nunca vacina com BCG);
4. <strong>Amamentação é permitida</strong> com o uso de máscara cirúrgica pela mãe e higiene das mãos, pois o bacilo não é transmitido pelo leite materno. A alternativa B é a única correta.</p>

<h4>Questão 3: UNICAMP — Por que Não Usar Etambutol em Menores de 10 Anos?</h4>
<p><strong>Enunciado:</strong> No Brasil, o esquema de tratamento preconizado para tuberculose pulmonar em crianças com idade inferior a 10 anos é composto por Rifampicina, Isoniazida e Pirazinamida (RHZ), omitindo-se o Etambutol utilizado em adultos. O motivo farmacológico e toxicológico primordial para a exclusão do Etambutol nesta faixa etária pediátrica é:</p>
<p>A) Alto risco de hepatotoxicidade fulminante sinérgica com a pirazinamida.<br>
B) Risco de neurite óptica tóxica retrobulbar, de difícil monitoramento e detecção precoce em crianças menores que não verbalizam alterações visuais.<br>
C) Falta de absorção intestinal do etambutol decorrente da imaturidade das vilosidades entéricas.<br>
D) Risco aumentado de nefrotoxicidade com nefrite intersticial aguda grave em lactentes.<br>
E) O etambutol é ineficaz contra cepas de <em>Mycobacterium tuberculosis</em> que acometem a infância.</p>
<p><strong>Gabarito Oficial: Alternativa B.</strong></p>
<p><strong>Comentário Detalhado:</strong><br>
• <strong>Alternativa B (Correta):</strong> O Etambutol possui como principal efeito colateral adverso a <strong>Neurite Óptica Tóxica Retrobulbar</strong>, que causa perda precoce da discriminação de cores (verde-vermelho) e redução de acuidade visual. Em menores de 10 anos de idade, o monitoramento clínico subjetivo da visão de cores é inviável, criando o risco de sequela visual irreversível e cegueira por detecção tardia. Como a carga bacilar pediátrica na forma pulmonar é paucibacilar e 3 drogas são plenamente suficientes, a exclusão do etambutol é uma diretriz de segurança inegociável. Alternativa B impecável.</p>
`
};
