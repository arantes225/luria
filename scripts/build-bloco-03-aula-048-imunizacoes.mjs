import { saveBook } from './bloco-03-utils.mjs';

const book = {
  slug: 'imunizacoes-na-infancia',
  title: 'Imunizações na Infância',
  area: 'Pediatria',
  materia: 'Puericultura e Infectologia Pediátrica',
  description: 'Tratado completo de Imunizações na Infância baseado no Programa Nacional de Imunizações (PNI 2026), Sociedade Brasileira de Pediatria (SBP) e manuais dos Centros de Referência para Imunobiológicos Especiais (CRIE). Abrange o calendário nacional atualizado, abolição da VOP com adoção da VIP exclusiva, transição pneumocócica, vacinação contra dengue, Covid-19 e prevenção do VSR com anticorpo monoclonal nirsevimabe; regras imunológicas de vacinas vivas e inativadas; vacinação de prematuros, imunodeprimidos, cardiopatas e asplênicos; eventos adversos pós-vacinação (EAPV) graves e condutas substitutivas; casos clínicos aprofundados e questões de residência comentadas.',
  sections: [
    {
      id: 'fundamentos-imunologia-vacinal',
      title: '1. Fundamentos da Imunologia Vacinal e Classificação dos Imunobiológicos',
      body_html: `
<h3>Princípios Gerais da Resposta Imune à Vacinação</h3>
<p>A imunização ativa consiste na estimulação deliberada e controlada do sistema imunológico por meio da introdução de antígenos modificados, atenuados ou purificados, mimetizando a infecção natural sem produzir a doença clínica manifesta. O objetivo biológico fundamental é a indução de clones de linfócitos T e B de memória de longa sobrevida e a produção sustentada de anticorpos neutralizantes com alta avidez (afinidade funcional).</p>
<p>Após o primeiro contato com o imunógeno (resposta imune primária), ocorre uma fase de latência (lag phase) de aproximadamente 7 a 14 dias, na qual predominam anticorpos da classe imunoglobulina M (IgM) com afinidade intermediária, antes da troca de classe gênica (isotype switching) mediada pelos linfócitos T auxiliares (CD4+ Th2 e linfócitos T foliculares auxiliares - Tfh) nos centros germinativos dos linfonodos, gerando imunoglobulina G (IgG), imunoglobulina A (IgA) secretora e células plasmáticas de medula óssea. Em doses subsequentes ou no contato com o patógeno selvagem (resposta imune secundária ou anamnética), o período de latência é encurtado para 24 a 72 horas, com produção exponencial e acelerada de títulos elevados de IgG hipermutada e altamente protetora.</p>

<h3>Classificação Biológica dos Imunobiológicos</h3>
<p>Os imunobiológicos dividem-se em duas grandes categorias imunológicas, cujas propriedades determinam todas as regras de administração, intervalos, número de doses e contraindicações:</p>
<table class="book-table">
  <thead>
    <tr>
      <th>Característica Imunológica</th>
      <th>Vacinas Vivas Atenuadas</th>
      <th>Vacinas Inativadas / Subunitárias / Plataformas Não Replicativas</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Mecanismo de Ação e Replicação</strong></td>
      <td>Contêm microrganismos vivos atenuados por passagens sucessivas em meios de cultura ou engenharia genética. <em>Replicam-se no hospedeiro</em>, simulando uma infecção subclínica natural transitória.</td>
      <td>Não contêm agentes replicativos. Compostos por microrganismos inteiros inativados por calor/formol, frações proteicas, toxoides bacterianos inativados, polissacarídeos puros, conjugados proteicos ou RNA mensageiro.</td>
    </tr>
    <tr>
      <td><strong>Tipo de Resposta Imune Induzida</strong></td>
      <td>Induzem resposta imune humoral (IgG e IgA secretora de mucosas) e resposta celular potente (linfócitos T CD4+ e citotóxicos CD8+). Apresentação via moléculas de MHC de classe I e II.</td>
      <td>Resposta predominantemente humoral (produção de anticorpos neutralizantes). Exigem quase invariavelmente a presença de <strong>adjuvantes</strong> (como sais de alumínio) para estimular receptores de reconhecimento de padrões (TLRs) e a imunidade inata.</td>
    </tr>
    <tr>
      <td><strong>Número de Doses e Duração da Memória</strong></td>
      <td>Geralmente eficazes com uma ou duas doses, promovendo imunidade celular e humoral duradoura ou por toda a vida.</td>
      <td>Exigem múltiplas doses para esquema primário (geralmente 2 a 3 doses) e reforços periódicos, pois os títulos de anticorpos sofrem decaimento gradual com o tempo.</td>
    </tr>
    <tr>
      <td><strong>Interferência por Anticorpos Circulantes</strong></td>
      <td><strong>Alta suscetibilidade.</strong> Anticorpos passivos maternos (transplacentários) ou imunoglobulinas administradas exogenamente neutralizam o vírus atenuado antes da replicação, bloqueando a soroconversão.</td>
      <td><strong>Mínima ou nula interferência.</strong> Anticorpos circulantes não impedem o processamento antigênico dos toxoides ou frações inativadas.</td>
    </tr>
    <tr>
      <td><strong>Risco em Imunossuprimidos e Gestantes</strong></td>
      <td><strong>CONTRAINDICADAS</strong> em gestantes e imunodeprimidos graves (risco de replicação descontrolada do agente atenuado, disseminação sistêmica e doença fulminante).</td>
      <td><strong>SEGURAS</strong> em gestantes e imunodeprimidos (não há risco de replicação nem reversão de virulência). A imunogenicidade pode estar reduzida em imunodeprimidos, mas não há dano infeccioso.</td>
    </tr>
    <tr>
      <td><strong>Exemplos Clínicos Pediátricos</strong></td>
      <td>BCG, Vacina Oral contra Rotavírus Humano (VORH), Febre Amarela, Tríplice Viral (Sarampo, Caxumba, Rubéola), Tetra Viral / Varicela atenuada, Dengue viva atenuada (Qdenga).</td>
      <td>Hepatite B recombinante, VIP (pólio inativada Salk), Pentavalente (DTPw-Hib-HepB), DTPa acelular, Pneumocócica conjugada, Meningocócicas C e ACWY conjugadas, Hepatite A inativada, HPV recombinante, Influenza inativada, Covid-19 (RNAm / recombinante).</td>
    </tr>
  </tbody>
</table>

<h3>Conjugação Proteica: O Salto Biológico contra Bactérias Encapsuladas</h3>
<p>Bactérias encapsuladas patogênicas para a infância (<em>Streptococcus pneumoniae</em>, <em>Neisseria meningitidis</em> e <em>Haemophilus influenzae</em> tipo b) possuem cápsulas de polissacarídeos puros. Em menores de dois anos de idade, o sistema imune é incapaz de montar resposta eficaz a antígenos polissacarídicos puros (antígenos T-independentes tipo 2), devido à imaturidade da zona marginal esplênica e dos linfócitos B CD27+. Dessa forma, vacinas polissacarídicas puras (como a Pneumo 23 polissacarídica antiga ou Meningo polissacarídica A/C) não induzem memória imunológica duradoura, geram apenas IgM transitória e sofrem o fenômeno da hiporresponsividade imunológica (tolerância) após doses repetidas.</p>
<p>O desenvolvimento das <strong>vacinas conjugadas</strong> revolucionou a pediatria: ao ligar covalentemente o polissacarídeo bacteriano a uma proteína carreadora imunogênica (como o toxoide tetânico, toxoide diftérico ou a proteína mutante CRM197 não tóxica da difteria), o complexo passa a ser endocitado e processado pelo linfócito B, que apresenta peptídeos da proteína carreadora aos linfócitos T auxiliares via MHC de classe II. Essa cooperação T-B induz troca de classe gênica para IgG1 e IgG3 de alta avidez, gera linfócitos B de memória e reduz drasticamente o estado de portador são nasofaríngeo, promovendo imunidade de rebanho (proteção indireta comunitária para não vacinados).</p>
`
    },
    {
      id: 'regras-intervalos-coadministracao',
      title: '2. Regras Imunológicas de Intervalos, Coadministração e Falsas Contraindicações',
      body_html: `
<h3>Regras Fundamentais de Interação entre Vacinas</h3>
<p>Para o planejamento vacinal na atenção primária, ambulatório e enfermaria pediátrica, quatro regras de ouro devem ser dominadas com rigor:</p>
<ul>
  <li><strong>Regra 1: Vacinas Inativadas entre Si:</strong> Duas ou mais vacinas inativadas podem ser administradas simultaneamente (em locais anatômicos distintos) ou com <em>qualquer intervalo de tempo</em> entre si. Não há interferência imunológica nem exacerbação de reatogenicidade sistêmica. Exemplo: Pentavalente e Pneumocócica 10 aplicadas simultaneamente aos 2 meses de idade em coxas diferentes.</li>
  <li><strong>Regra 2: Vacina Inativada com Vacina Viva Atenuada:</strong> Podem ser administradas simultaneamente ou com <em>qualquer intervalo</em> entre si. Exemplo: VIP (inativada) e Rotavírus oral (viva) aos 2 meses de vida; ou Febre Amarela e Meningo C aos 9 meses.</li>
  <li><strong>Regra 3: Duas Vacinas Vivas Atenuadas Parenterais:</strong> Duas vacinas vivas parenterais (ex: Febre Amarela e Tríplice Viral; ou Tríplice Viral e Varicela) devem ser aplicadas <strong>simultaneamente no mesmo dia</strong> (em sítios anatômicos diferentes) OU, se não forem administradas no mesmo dia, deve-se respeitar um <strong>intervalo mínimo absoluto de 30 dias</strong> (idealmente 4 semanas) entre as aplicações. <em>Mecanismo biológico:</em> a primeira vacina viva parenteral estimula a liberação sistêmica precoce de interferons do tipo I (IFN-alfa e IFN-beta) e ativação inata vigorosa, o que bloquearia a replicação intracelular e diminuiria drasticamente a imunogenicidade da segunda vacina viva parenteral caso aplicada nos dias subsequentes. Exceção pediátrica importante: a vacina oral contra Rotavírus (VORH), por ser administrada por via digestiva e mucosal, não sofre interferência da regra dos 30 dias com vacinas parenterais vivas, podendo ser administrada com qualquer intervalo em relação a imunobiológicos parenterais.</li>
  <li><strong>Regra 4: Particularidade Pediátrica Febre Amarela e Tríplice Viral:</strong> Em crianças com menos de 2 anos de idade recebendo a primeira dose de ambas as vacinas, estudos epidemiológicos demonstraram discreta redução dos títulos protetores contra a Febre Amarela quando coadministradas com a Tríplice Viral. Portanto, o PNI e a SBP recomendam aplicar preferencialmente com <strong>intervalo mínimo de 30 dias</strong> entre elas em menores de 2 anos (Tríplice Viral aos 12 meses e Febre Amarela aos 9 meses ou aos 13 meses). Contudo, em situações de surto, alto risco de contágio ou risco iminente de perda de seguimento vacinal, a administração simultânea é formalmente autorizada para evitar oportunidades perdidas.</li>
</ul>

<h3>Interferência entre Vacinas Vivas e Testes Tuberculínicos (PPD / Derivado Proteico Purificado)</h3>
<p>A administração de vacinas de vírus vivos parenterais (em particular a Tríplice Viral contra o sarampo) induz um estado de anergia cutânea transitória e supressão temporária da resposta imune celular mediada por linfócitos T. Caso um teste tuberculínico (PPD ou IGRA) seja necessário:</p>
<ol>
  <li>O PPD pode ser aplicado no mesmo dia da vacina viva parenteral; OU</li>
  <li>Caso a vacina viva parenteral (ex: Tríplice Viral) tenha sido administrada previamente, deve-se aguardar um período mínimo de <strong>30 a 42 dias</strong> (4 a 6 semanas) para realizar o PPD, a fim de evitar resultados <em>falso-negativos</em> causados pela anergia induzida pelo vírus vacinal;</li>
  <li>Por outro lado, a realização prévia do PPD não contraindica nem atrasa a aplicação de vacinas vivas: após a leitura do teste tuberculínico (72 a 96 horas), qualquer vacina pode ser aplicada imediatamente.</li>
</ol>

<h3>Intervalos com Sangue, Hemoderivados e Imunoglobulinas</h3>
<p>A infusão prévia de sangue total, concentrado de hemácias, plasma fresco ou imunoglobulina humana policlonal/hiperimune transfere passivamente títulos elevados de anticorpos séricos IgG neutralizantes. Esses anticorpos não interferem com vacinas inativadas, mas <strong>inativam vacinas virais vivas atenuadas parenterais</strong> (Tríplice Viral, Tetraviral e Varicela monovalente). O intervalo obrigatório entre a administração de hemoderivados e a vacinação com Tríplice Viral/Varicela varia de <strong>3 a 11 meses</strong>, dependendo da dose e do tipo de hemoderivado (ex: 3 meses para concentrado de hemácias padrão desprovido de plasma; 6 meses para concentrado de hemácias total; 8 a 11 meses para imunoglobulina venosa em dose imunomoduladora de 2 g/kg na Síndrome de Kawasaki). Caso a vacina tenha sido aplicada menos de 14 dias antes da infusão de hemoderivado, a dose deve ser considerada nula e repetida após o tempo de intervalo recomendado.</p>

<h3>Falsas Contraindicações que Geram Oportunidades Perdidas na Prática Clínica</h3>
<table class="book-table">
  <thead>
    <tr>
      <th>Situação Clínica Frequente</th>
      <th>Mito / Erro Comum</th>
      <th>Realidade Científica e Conduta Correta</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Sintomas Catarrais Leves e Febre Baixa</strong></td>
      <td>Adiar a vacinação até desaparecimento completo da coriza.</td>
      <td><strong>VACINAR NORMALMENTE.</strong> Infecções respiratórias altas leves (rinofaringite, resfriado comum), tosse seca, diarreia leve sem febre alta ou coriza hialina não reduzem a resposta imune nem aumentam reatogenicidade. Apenas doenças agudas febris moderadas a graves (temperatura axilar &ge; 38,5 ºC) justificam o adiamento temporário para não mascarar a evolução da doença de base.</td>
    </tr>
    <tr>
      <td><strong>Uso de Antibióticos e Antivirais Não Específicos</strong></td>
      <td>Aguardar o término do curso de amoxicilina ou cefalosporina.</td>
      <td><strong>VACINAR NORMALMENTE.</strong> Antibacterianos comuns não interferem na resposta imune a nenhuma vacina viral ou bacteriana do calendário (exceto a vacina viva atenuada contra febre tifoide oral Ty21a).</td>
    </tr>
    <tr>
      <td><strong>Uso de Corticoides Tópicos, Inalatórios ou Sistêmicos em Dose Baixa</strong></td>
      <td>Suspender vacinas vivas por suposta imunodepressão.</td>
      <td><strong>VACINAR NORMALMENTE.</strong> Corticoides inalatórios (fluticasona, budesonida), pomadas dermatológicas, colírios e doses sistêmicas de reposição fisiológica ou curtos cursos (&lt; 14 dias) em dose &lt; 2 mg/kg/dia de prednisona (ou equivalente) <em>não causam imunossupressão clinicamente relevante</em>. Vacinas vivas e inativadas podem ser administradas sem restrição.</td>
    </tr>
    <tr>
      <td><strong>Desnutrição Energético-Proteica Leve ou Moderada</strong></td>
      <td>Aguardar recuperação antropométrica completa.</td>
      <td><strong>VACINAR COM PRIORIDADE.</strong> Crianças desnutridas apresentam maior vulnerabilidade a desfechos letais de sarampo, coqueluche e meningite; a vacinação é mandatória e eficaz.</td>
    </tr>
    <tr>
      <td><strong>Aleitamento Materno e Icterícia Fisiológica</strong></td>
      <td>Interromper amamentação ou adiar vacinas.</td>
      <td><strong>VACINAR NORMALMENTE.</strong> O aleitamento materno não inativa nenhuma vacina do calendário (inclusive Rotavírus oral e BCG). Crianças ictéricas sem encefalopatia e sem patologia colestática grave devem ser imunizadas conforme o cronograma.</td>
    </tr>
    <tr>
      <td><strong>Histórico Familiar de Convulsão ou Alergias Não Anafiláticas</strong></td>
      <td>Suspender DTP ou contraindicar componentes vacinais.</td>
      <td><strong>VACINAR NORMALMENTE.</strong> Histórico familiar de convulsão febril, epilepsia ou alergias inespecíficas não constitui contraindicação para nenhuma vacina.</td>
    </tr>
  </tbody>
</table>
`
    },
    {
      id: 'calendario-pni-2026-passo-a-passo',
      title: '3. Calendário Nacional de Vacinação do PNI 2026 da Criança ao Adolescente',
      body_html: `
<h3>Estrutura Cronológica do Calendário Infantil Brasileiro</h3>
<p>O Programa Nacional de Imunizações (PNI) do Brasil, reconhecido mundialmente pela sua abrangência universal e equidade pelo Sistema Único de Saúde (SUS), passou por marcos decisivos consolidados em 2026: a <strong>abolição definitiva da vacina oral contra poliomielite (VOPb)</strong>, com a adoção do <strong>esquema 100% exclusivo com vacina inativada (VIP)</strong> injetável; o avanço da transição da vacina pneumocócica conjugada; a consolidação da vacina HPV em dose única aos 9 a 14 anos; a expansão da vacina contra dengue tetravalente e a incorporação do anticorpo monoclonal de meia-vida estendida <strong>nirsevimabe</strong> para prevenção da infecção pelo vírus sincicial respiratório (VSR).</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Idade Recomendada</th>
      <th>Vacina / Imunobiológico</th>
      <th>Via e Local Anatômico</th>
      <th>Dose e Apresentação</th>
      <th>Prevenção Específica e Notas Clínicas</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="2"><strong>Ao nascer</strong><br>(idealmente &lt; 12 horas)</td>
      <td><strong>BCG</strong> (Bacilo de Calmette-Guérin)</td>
      <td>Intradérmica estrita no braço direito (inserção do músculo deltoide).</td>
      <td>0,1 mL (ou 0,05 mL conforme laboratório produtor).</td>
      <td>Prevenção de formas graves de tuberculose (meningoencefalite tuberculosa e tuberculose miliar disseminada). Dose única. Aplicar apenas em recém-nascidos com peso &ge; 2.000 g. Não revacinar na ausência de cicatriz vacinal prévia.</td>
    </tr>
    <tr>
      <td><strong>Hepatite B</strong> (recombinante)</td>
      <td>Intramuscular profunda no vasto lateral da coxa esquerda.</td>
      <td>0,5 mL (10 mcg).</td>
      <td>Prevenção da transmissão vertical e perinatal do vírus da hepatite B (HBV). Administrar nas primeiras 12 horas de vida. Se mãe HBsAg positiva, associar Imunoglobulina Humana Anti-Hepatite B (HBIg) nas primeiras 12 a 24 horas em membro oposto.</td>
    </tr>
    <tr>
      <td rowspan="4"><strong>2 meses</strong></td>
      <td><strong>Pentavalente</strong> (DTPw + Hib + HepB)</td>
      <td>Intramuscular profunda no vasto lateral da coxa esquerda.</td>
      <td>0,5 mL.</td>
      <td>1ª dose: Difteria, Tétano, Pertussis (células inteiras), <em>Haemophilus influenzae</em> b e Hepatite B.</td>
    </tr>
    <tr>
      <td><strong>VIP</strong> (Vacina Inativada Poliomielite)</td>
      <td>Intramuscular profunda no vasto lateral da coxa direita.</td>
      <td>0,5 mL.</td>
      <td>1ª dose: Poliomielite tipos 1, 2 e 3 (vírus inativados - Salk). Totalmente isenta de risco de paralisia associada à vacina.</td>
    </tr>
    <tr>
      <td><strong>Pneumocócica 10-valente</strong> (VPC10 conjugada)</td>
      <td>Intramuscular profunda no vasto lateral da coxa direita (ou esquerda distanciada).</td>
      <td>0,5 mL.</td>
      <td>1ª dose: Prevenção de doença pneumocócica invasiva (meningite, sepse, bacteremia) e otite média aguda por sorotipos de <em>S. pneumoniae</em>.</td>
    </tr>
    <tr>
      <td><strong>Rotavírus Humano G1P[8]</strong> (VORH - monovalente)</td>
      <td>Via oral estrita.</td>
      <td>1,5 mL (solução líquida oral).</td>
      <td>1ª dose: Gastroenterite grave por rotavírus. Limite de idade: dose 1 deve ser administrada a partir de 1 mês e 15 dias até 3 meses e 15 dias de vida (ou até 11 meses e 29 dias nos protocolos de transição/resgate da instrução 2026 sob avaliação de risco). Se a criança regurgitar, cuspir ou vomitar após a deglutição, <strong>NÃO REPETIR A DOSE</strong>.</td>
    </tr>
    <tr>
      <td><strong>3 meses</strong></td>
      <td><strong>Meningocócica C</strong> (conjugada)</td>
      <td>Intramuscular profunda no vasto lateral da coxa.</td>
      <td>0,5 mL.</td>
      <td>1ª dose: Doença meningocócica invasiva (meningococcemia e meningite) causada pela <em>Neisseria meningitidis</em> sorogrupo C.</td>
    </tr>
    <tr>
      <td rowspan="4"><strong>4 meses</strong></td>
      <td><strong>Pentavalente</strong></td>
      <td>Intramuscular (vasto lateral).</td>
      <td>0,5 mL.</td>
      <td>2ª dose: DTPw-Hib-HepB. Intervalo mínimo de 30 a 60 dias da 1ª dose.</td>
    </tr>
    <tr>
      <td><strong>VIP</strong></td>
      <td>Intramuscular (vasto lateral).</td>
      <td>0,5 mL.</td>
      <td>2ª dose: Poliomielite inativada.</td>
    </tr>
    <tr>
      <td><strong>Pneumocócica 10-valente</strong></td>
      <td>Intramuscular (vasto lateral).</td>
      <td>0,5 mL.</td>
      <td>2ª dose: VPC10.</td>
    </tr>
    <tr>
      <td><strong>Rotavírus Humano</strong></td>
      <td>Via oral estrita.</td>
      <td>1,5 mL.</td>
      <td>2ª dose: Limite máximo clássico de 7 meses e 29 dias (intervalo mínimo de 4 semanas da 1ª dose).</td>
    </tr>
    <tr>
      <td><strong>5 meses</strong></td>
      <td><strong>Meningocócica C</strong></td>
      <td>Intramuscular (vasto lateral).</td>
      <td>0,5 mL.</td>
      <td>2ª dose: MenC conjugada.</td>
    </tr>
    <tr>
      <td rowspan="2"><strong>6 meses</strong></td>
      <td><strong>Pentavalente</strong></td>
      <td>Intramuscular (vasto lateral).</td>
      <td>0,5 mL.</td>
      <td>3ª dose: Completa o esquema primário pentavalente infantil.</td>
    </tr>
    <tr>
      <td><strong>VIP</strong></td>
      <td>Intramuscular (vasto lateral).</td>
      <td>0,5 mL.</td>
      <td>3ª dose: Completa o esquema primário básico contra poliomielite.</td>
    </tr>
    <tr>
      <td><strong>9 meses</strong></td>
      <td><strong>Febre Amarela</strong> (viva atenuada)</td>
      <td>Subcutânea no membro superior (deltoide/tríceps).</td>
      <td>0,5 mL.</td>
      <td>Dose inicial para todo o território nacional. Vírus vivo atenuado cepa 17D.</td>
    </tr>
    <tr>
      <td rowspan="3"><strong>12 meses</strong> (1 ano)</td>
      <td><strong>Tríplice Viral</strong> (SCR - Sarampo, Caxumba, Rubéola)</td>
      <td>Subcutânea no deltoide/tríceps.</td>
      <td>0,5 mL.</td>
      <td>1ª dose: Vírus vivos atenuados. Início da proteção humoral duradoura contra sarampo.</td>
    </tr>
    <tr>
      <td><strong>Pneumocócica 10-valente</strong> (reforço)</td>
      <td>Intramuscular.</td>
      <td>0,5 mL.</td>
      <td>Dose de reforço (booster) essencial para consolidação da memória imune no segundo ano de vida.</td>
    </tr>
    <tr>
      <td><strong>Meningocócica ACWY</strong> (conjugada)</td>
      <td>Intramuscular.</td>
      <td>0,5 mL.</td>
      <td>Dose de reforço/ampliação aos 12 meses: confere proteção ampliada contra os sorogrupos A, C, W e Y da <em>N. meningitidis</em>.</td>
    </tr>
    <tr>
      <td rowspan="4"><strong>15 meses</strong></td>
      <td><strong>DTP</strong> (tríplice bacteriana infantil)</td>
      <td>Intramuscular no vasto lateral ou deltoide.</td>
      <td>0,5 mL.</td>
      <td>1º reforço contra difteria, tétano e coqueluche (células inteiras).</td>
    </tr>
    <tr>
      <td><strong>VIP</strong> (1º reforço exclusivo)</td>
      <td>Intramuscular profunda.</td>
      <td>0,5 mL.</td>
      <td><strong>Abolição definitiva da VOP:</strong> agora administrada como VIP injetável aos 15 meses, eliminando o vírus atenuado Sabin de circulação comunitária.</td>
    </tr>
    <tr>
      <td><strong>Hepatite A</strong> (inativada)</td>
      <td>Intramuscular no deltoide ou vasto lateral.</td>
      <td>0,5 mL.</td>
      <td>Dose única no PNI para proteção duradoura contra hepatite viral aguda por HAV.</td>
    </tr>
    <tr>
      <td><strong>Tetraviral</strong> (SCRV) ou <strong>Tríplice Viral + Varicela</strong></td>
      <td>Subcutânea em sítios anatômicos distintos.</td>
      <td>0,5 mL cada.</td>
      <td>2ª dose de Sarampo, Caxumba, Rubéola + 1ª dose de Varicela (catapora).</td>
    </tr>
    <tr>
      <td rowspan="4"><strong>4 anos</strong></td>
      <td><strong>DTP</strong></td>
      <td>Intramuscular no deltoide.</td>
      <td>0,5 mL.</td>
      <td>2º reforço infantil. Garante imunidade antitoxina diftérica e tetânica antes do ingresso escolar.</td>
    </tr>
    <tr>
      <td><strong>VIP</strong> (2º reforço exclusivo)</td>
      <td>Intramuscular no deltoide.</td>
      <td>0,5 mL.</td>
      <td>2º reforço de poliomielite injetável (VIP), totalizando 5 doses de VIP no esquema de infância (2m, 4m, 6m, 15m e 4 anos).</td>
    </tr>
    <tr>
      <td><strong>Varicela</strong> (monovalente atenuada)</td>
      <td>Subcutânea.</td>
      <td>0,5 mL.</td>
      <td>2ª dose da vacina contra varicela, reduzindo falhas primárias e surtos em ambiente pré-escolar.</td>
    </tr>
    <tr>
      <td><strong>Febre Amarela</strong> (reforço aos 4 anos)</td>
      <td>Subcutânea.</td>
      <td>0,5 mL.</td>
      <td>Dose de reforço recomendada para crianças que receberam a primeira dose aos 9 meses de vida, consolidando títulos protetores por toda a vida.</td>
    </tr>
    <tr>
      <td rowspan="3"><strong>9 a 14 anos</strong> (Adolescentes)</td>
      <td><strong>HPV</strong> (Papilomavírus Humano recombinante)</td>
      <td>Intramuscular profunda no deltoide.</td>
      <td>0,5 mL.</td>
      <td><strong>Esquema de Dose Única</strong> para meninas e meninos de 9 a 14 anos de idade no PNI. Protege contra os tipos oncogênicos 16 e 18 (câncer de colo uterino, ânus, pênis e orofaringe) e 6 e 11 (condilomas acuminados).</td>
    </tr>
    <tr>
      <td><strong>Meningocócica ACWY</strong> (conjugada)</td>
      <td>Intramuscular no deltoide.</td>
      <td>0,5 mL.</td>
      <td>Dose única ou reforço para adolescentes de 11 a 14 anos de idade (combate a elevação da taxa de portadores nasofaríngeos de meningococo nesta faixa etária).</td>
    </tr>
    <tr>
      <td><strong>dT</strong> (Dupla bacteriana tipo adulto)</td>
      <td>Intramuscular no deltoide.</td>
      <td>0,5 mL.</td>
      <td>Reforço de difteria e tétano aos 14 anos (e a cada 10 anos subsequentemente por toda a vida adulta).</td>
    </tr>
  </tbody>
</table>

<h3>Abolição Definitiva da VOP e Consolidação da VIP Exclusiva</h3>
<p>Um dos marcos históricos mais relevantes da saúde pública brasileira e global é a transição da vacina oral atenuada contra a poliomielite (VOP - cepas Sabin) para a vacina inativada injetável (VIP - cepas Salk). Embora a VOP tenha desempenhado papel crucial na erradicação da poliomielite selvagem devido à fácil administração e indução de imunidade de mucosa intestinal robusta com disseminação secundária (imunidade de contato), o vírus atenuado carrega dois riscos biológicos graves:</p>
<ol>
  <li><strong>Poliomielite Paralítica Associada à Vacina (VAPP):</strong> Ocorrência de paralisia flácida aguda irreversível causada pela reversão genética de neurovirulência da cepa Sabin durante a replicação no hospedeiro imunocompetente (incidência aproximada de 1 caso para cada 750.000 primeiras doses);</li>
  <li><strong>PolioVírus Derivados da Vacina Circulantes (cVDPV):</strong> Em bolsões populacionais com baixas coberturas vacinais, a replicação prolongada e excreção fecal do vírus atenuado levam ao acúmulo de mutações genéticas, restaurando o potencial patogênico e transmissibilidade do vírus, gerando surtos de poliomielite por vírus derivado da vacina (especialmente do tipo 2).</li>
</ol>
<p>Com o esquema 100% VIP (2 meses, 4 meses, 6 meses, reforço aos 15 meses e segundo reforço aos 4 anos), o risco de VAPP e cVDPV é completamente eliminado, mantendo o território livre do vírus selvagem e vacinal.</p>

<h3>Vacina contra Dengue (Tetraviral Atenuada - Qdenga)</h3>
<p>Incorporada pelo Ministério da Saúde, a vacina contra a dengue contém vírus atenuados tetravalentes com esqueleto quimérico do sorotipo 2 (TAK-003). É indicada para crianças e adolescentes de <strong>10 a 14 anos de idade</strong>, faixa etária que concentra taxas elevadas de hospitalização por dengue após os idosos no cenário epidemiológico nacional. O esquema preconizado é de <strong>2 doses, administradas por via subcutânea, com intervalo de 3 meses</strong> entre elas. Por se tratar de vacina viva atenuada, é <strong>contraindicada</strong> em gestantes, mulheres em amamentação e indivíduos imunodeprimidos graves.</p>

<h3>Anticorpo Monoclonal de Ação Prolongada contra o VSR: Nirsevimabe</h3>
<p>Diferente de uma vacina ativa, o <strong>nirsevimabe</strong> é uma imunoglobulina monoclonal recombinante humana (IgG1 kappa) de meia-vida estendida (mutação YTE no fragmento Fc) dirigida contra a conformação pré-fusão da proteína F do Vírus Sincicial Respiratório (VSR). Uma única aplicação intramuscular confere proteção passiva imediata com níveis séricos protetores sustentados por no mínimo 5 a 6 meses, cobrindo integralmente toda a sazonalidade do vírus.</p>
<p>No SUS e CRIE, suas indicações prioritárias contemplam: prematuros extremos com idade gestacional &lt; 29 semanas no primeiro ano de vida; crianças com cardiopatia congênita com repercussão hemodinâmica significativa; e crianças com displasia broncopulmonar (doença pulmonar crônica da prematuridade) com necessidade de suporte de oxigênio ou diuréticos nos últimos 6 meses. O nirsevimabe substitui progressivamente o palivizumabe (que exigia 5 aplicações mensais sucessivas), oferecendo eficácia superior (&gt; 80% de redução nas hospitalizações por bronquiolite e pneumonia por VSR) em dose única pré-sazonal.</p>
`
    },
    {
      id: 'particularidades-bcg-rotavirus-febre-amarela',
      title: '4. Aspectos Críticos: BCG, Rotavírus, Febre Amarela e HPV',
      body_html: `
<h3>Manejo Clínico Pediátrico da BCG</h3>
<p>A vacina BCG (cepa viva atenuada de <em>Mycobacterium bovis</em>) deve ser aplicada rotineiramente nas primeiras horas de vida, idealmente antes da alta da maternidade. A evolução da lesão vacinal segue uma cronologia estrita esperada pelos pais e pediatras:</p>
<ul>
  <li><strong>1ª a 2ª semana:</strong> Mácula eritematosa e nódulo inflamatório endurecido no local da punção;</li>
  <li><strong>3ª a 4ª semana:</strong> Formação de pústula central que evolui para crosta;</li>
  <li><strong>4ª a 5ª semana:</strong> Ulceração indolor com diâmetro de 4 a 7 mm, com saída de secreção seropurulenta não fétida (é a evolução normal; <em>orientar a família a não colocar pomadas, curativos oclusivos ou antissépticos</em>, lavando apenas com água e sabão durante o banho);</li>
  <li><strong>6ª a 12ª semana:</strong> Cicatrização progressiva, resultando na cicatriz vacinal definitiva deprimida (de 4 a 6 mm).</li>
</ul>
<p><strong>Crianças que não desenvolveram a cicatriz vacinal após 6 meses:</strong> A diretriz consolidada do Ministério da Saúde e da Sociedade Brasileira de Pediatria estabelece formalmente que <strong>NÃO SE DEVE REPETIR A VACINA BCG</strong> na ausência de cicatriz, desde que haja comprovação documental de vacinação no prontuário ou caderneta de saúde. Estudos de eficácia demonstraram que a ausência de cicatriz não significa ausência de proteção celular contra as formas graves da tuberculose.</p>
<p><strong>Contraindicações da BCG:</strong> Recém-nascidos com peso inferior a 2.000 g (adiar até que atinjam &ge; 2.000 g); afecções dermatológicas extensas no local de punção; recém-nascidos expostos ao HIV sintomáticos ou com evidência laboratorial de imunossupressão grave; e recém-nascidos contactantes domiciliares de caso índice de tuberculose pulmonar bacilífera ativa. Nesse último caso, a conduta mandatória é: <strong>NÃO APLICAR A BCG AO NASCER</strong>, iniciar imediatamente Quimioprofilaxia Primária (terapia preventiva com Isoniazida 10 mg/kg/dia ou Rifampicina 15 mg/kg/dia) por 3 meses; após 3 meses, realizar teste tuberculínico (PPD): se PPD não reator (&lt; 5 mm), suspender a quimioprofilaxia e aplicar a vacina BCG; se PPD reator (&ge; 5 mm), completar o tratamento da infecção latente por tuberculose (ILTB) e <em>não</em> vacinar com BCG.</p>

<h3>Vacina Oral contra Rotavírus Humano (VORH): Janelas e Precauções</h3>
<p>O rotavírus é o principal agente etiológico de diarreia grave desidratante e letalidade por choque hipovolêmico em lactentes em todo o mundo. A vacina viva atenuada monovalente (G1P[8]) apresenta normas técnicas muito específicas de administração:</p>
<table class="book-table">
  <thead>
    <tr>
      <th>Parâmetro Clínico</th>
      <th>1ª Dose do Rotavírus</th>
      <th>2ª Dose do Rotavírus</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Idade Recomendada pelo Calendário</strong></td>
      <td>Aos 2 meses de vida (60 dias).</td>
      <td>Aos 4 meses de vida (120 dias).</td>
    </tr>
    <tr>
      <td><strong>Idade Mínima Permitida</strong></td>
      <td>1 mês e 15 dias de vida (45 dias).</td>
      <td>3 meses e 7 dias de vida (97 dias).</td>
    </tr>
    <tr>
      <td><strong>Idade Máxima Permitida (Janela Estrita)</strong></td>
      <td>Até 3 meses e 15 dias (105 dias de vida).</td>
      <td>Até 7 meses e 29 dias (239 dias de vida).</td>
    </tr>
    <tr>
      <td><strong>Intervalo Mínimo Obrigatório</strong></td>
      <td>-</td>
      <td>Intervalo mínimo de 4 semanas (30 dias) em relação à primeira dose.</td>
    </tr>
    <tr>
      <td><strong>Conduta se a Criança Vomitar ou Regurgitar</strong></td>
      <td colspan="2"><strong>NÃO REPETIR A DOSE EM NENHUMA HIPÓTESE.</strong> A quantidade deglutida e adsorvida pela mucosa orofaríngea é suficiente para a imunogênese; repetir a dose aumentaria desnecessariamente a carga antigênica intestinal e o risco potencial de invaginação. A dose é computada normalmente na caderneta.</td>
    </tr>
  </tbody>
</table>
<p><strong>Contraindicações Absolutas da Vacina Rotavírus:</strong> Histórico prévio confirmado de <strong>invaginação intestinal</strong> (intussuscepção); malformação congênita não corrigida do trato gastrointestinal que predisponha à invaginação (divertículo de Meckel, duplicação intestinal); imunodeficiência combinada grave (SCID); e reação anafilática prévia grave à vacina.</p>

<h3>Febre Amarela: Particularidades Pediátricas e Amamentação</h3>
<p>A vacina contra a Febre Amarela é composta pelo vírus vivo atenuado cepa 17D cultivado em embrião de galinha. Desde a expansão de casos no sudeste e sul do Brasil, o Ministério da Saúde unificou a recomendação da vacina para <strong>todo o território nacional</strong>:</p>
<ul>
  <li><strong>Dose aos 9 meses de vida</strong> e uma <strong>dose de reforço aos 4 anos de idade</strong>. Para crianças que receberam a primeira dose com 5 anos ou mais, a dose é considerada única para toda a vida.</li>
  <li><strong>Contraindicação em Nutrizes (Mulheres em Amamentação):</strong> Mulheres amamentando lactentes com <em>menos de 6 meses de vida</em> NÃO devem receber a vacina de Febre Amarela. O vírus atenuado vacinal pode ser excretado no leite materno e infectar o sistema nervoso central do lactente jovem, cuja barreira hematoencefálica é imatura, causando <strong>doença neurológica grave associada à vacina (encefalite por vírus vacinal)</strong>. Se a mãe não puder evitar a vacinação (área com transmissão ativa intensa inadiável), o aleitamento materno deve ser suspenso temporariamente e o leite ordenhado desprezado por 10 dias (mínimo de 14 dias se possível), alimentando a criança com fórmula infantil adequada. Para lactentes com 6 meses de vida ou mais, o aleitamento não precisa ser interrompido.</li>
  <li><strong>Anafilaxia ao Ovo:</strong> Reações alérgicas leves a moderadas ao ovo de galinha (urticária isolada) <strong>não contraindicam</strong> a vacina febre amarela. Crianças com histórico de anafilaxia grave comprovada ao ovo devem ser vacinadas em ambiente hospitalar especializado (CRIE) sob monitorização com leito de reanimação e suporte médico disponível.</li>
</ul>

<h3>Papilomavírus Humano (HPV): Esquema Atualizado em Dose Única</h3>
<p>O Programa Nacional de Imunizações adota a <strong>vacina HPV quadrivalente recombinante (tipos 6, 11, 16 e 18) em Esquema de Dose Única</strong> para meninas e meninos de <strong>9 a 14 anos de idade (14 anos, 11 meses e 29 dias)</strong>. Evidências científicas de acompanhamento populacional em larga escala (revisões da OMS de 2022 a 2026) demonstraram que uma única dose induz níveis de anticorpos neutralizantes robustos e proteção sustentada equivalente ao regime de duas doses contra a infecção persistente e lesões pré-neoplásicas do colo uterino e anogenitais.</p>
<p><em>Exceção crucial para imunocomprometidos:</em> Indivíduos de 9 a 45 anos que vivam com HIV/AIDS, transplantados de órgãos sólidos ou células-tronco hematopoéticas, pacientes oncológicos e pacientes em imunossupressão grave devem receber obrigatoriamente o <strong>esquema de 3 doses (0, 2 e 6 meses)</strong>, independentemente da idade.</p>
`
    },
    {
      id: 'crie-imunossuprimidos-prematuros-cardiopatas',
      title: '5. Centros de Referência para Imunobiológicos Especiais (CRIE): Prematuros, Imunodeprimidos e Cardiopatas',
      body_html: `
<h3>O Papel do CRIE no Sistema Único de Saúde</h3>
<p>Os Centros de Referência para Imunobiológicos Especiais (CRIE) são unidades públicas de referência do SUS destinadas a fornecer vacinas, imunoglobulinas e soros hiperimunes de alto custo que não estão disponíveis nas salas de vacina da rede básica. Atendem pacientes com maior suscetibilidade infecciosa, risco de formas fatais de doenças imunopreveníveis ou que apresentam contraindicações formais aos produtos da rotina por eventos adversos prévios graves.</p>

<h3>Imunização do Prematuro Extremo e de Muito Baixo Peso</h3>
<p>Recém-nascidos prematuros apresentam menor transferência transplacentária de anticorpos maternos (que ocorre preferencialmente após a 32ª semana de gestação) e imaturidade da resposta inata e adaptativa. Regras essenciais:</p>
<ol>
  <li><strong>Critério de Idade Cronológica:</strong> O prematuro clinicamente estável deve ser vacinado de acordo com a sua <strong>idade cronológica</strong> (pós-natal) e NÃO de acordo com a idade gestacional corrigida. Não se deve atrasar o calendário básico por causa da prematuridade.</li>
  <li><strong>Vacina BCG no Prematuro:</strong> Exige peso corporal mínimo de <strong>2.000 g</strong>. Se o recém-nascido prematuro nascer com peso inferior a 2.000 g, a vacina é adiada até que ele atinja o peso mínimo de 2 kg na enfermaria neonatal ou ambulatorialmente.</li>
  <li><strong>Substituição da DTPw por DTPa (Acelular):</strong> Prematuros extremos com idade gestacional &lt; 31 semanas (ou &lt; 33 semanas conforme manual do CRIE) ou com peso de nascimento &lt; 1.000 g têm indicação formal de receber a vacina <strong>Pentavalente acelular ou DTPa</strong> para minimizar o risco de episódios de apnéia grave, bradicardia reflexa e episódios hipotônico-hiporresponsivos (EHH) desencadeados pelo componente pertussis de células inteiras.</li>
  <li><strong>Pneumocócica Especial:</strong> Esquema sequencial com vacinas conjugadas ampliadas (VPC13 ou VPC15/VPC20) e seguimento com Pneumo 23 após os 2 anos de vida.</li>
  <li><strong>Prevenção do VSR:</strong> Administração de anticorpo monoclonal <strong>Nirsevimabe</strong> em dose única pré-sazonal (ou Palivizumabe em 5 doses mensais se nirsevimabe indisponível) para prematuros com &lt; 29 semanas de idade gestacional durante o primeiro ano de vida.</li>
</ol>

<h3>Imunização em Crianças Vivendo com HIV e Imunodeficiências Primárias</h3>
<table class="book-table">
  <thead>
    <tr>
      <th>Categoria de Vacina</th>
      <th>Recomendação em Crianças HIV Positivas / Imunodeprimidas</th>
      <th>Critérios Laboratoriais e Cuidados Específicos</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Vacinas Inativadas</strong> (Penta/DTPa, VIP, HepB, HepA, Pneumo, MenACWY, MenB, HPV, Influenza)</td>
      <td><strong>INDICADAS E ALTAMENTE RECOMENDADAS.</strong> Não há risco de replicação microbiana.</td>
      <td>A resposta sorológica pode ser subótima. Em hepatite B, utiliza-se dose dobrada com esquema de 4 doses (0, 1, 2 e 6 meses). A vacina Pneumocócica conjugada é associada à Pneumocócica 23 polissacarídica após 2 anos de vida. A vacina HPV é realizada em 3 doses (0, 2 e 6 meses) até 45 anos.</td>
    </tr>
    <tr>
      <td><strong>Vacina BCG</strong></td>
      <td><strong>CONTRAINDICADA</strong> em crianças sintomáticas ou com imunossupressão grave.</td>
      <td>Pode ser administrada ao nascer em filhos de mães HIV positivas apenas se o recém-nascido estiver totalmente assintomático e sem sinais clínicos de imunodeficiência. Em crianças maiores com HIV confirmado, exige contagem de linfócitos T CD4+ &ge; 25% (ou &ge; 500 céls/mm³). Em imunodeficiência combinada grave (SCID) ou defeitos da via IL-12/IFN-gama, é <strong>absolutamente contraindicada</strong> (risco fatal de BCGose disseminada).</td>
    </tr>
    <tr>
      <td><strong>Vacina Rotavírus (VORH)</strong></td>
      <td><strong>CONTRAINDICADA</strong> em imunodeficiências primárias (SCID).</td>
      <td>Em lactentes filhos de mães infectadas pelo HIV em acompanhamento sem confirmação laboratorial da criança, a vacina pode ser administrada se a criança estiver assintomática e estável.</td>
    </tr>
    <tr>
      <td><strong>Tríplice Viral e Varicela</strong></td>
      <td><strong>PERMITIDAS APENAS SE IMUNOCOMPETÊNCIA PRESERVADA.</strong></td>
      <td>Contraindicadas se linfócitos T CD4+ &lt; 15% em menores de 5 anos (ou &lt; 200 céls/mm³ em maiores de 5 anos). Se CD4 &ge; 15% (imunossupressão ausente ou leve), a vacinação contra sarampo e varicela é recomendada em doses monovalentes isoladas com intervalo de 30 dias para prevenir formas complicadas.</td>
    </tr>
    <tr>
      <td><strong>Febre Amarela</strong></td>
      <td><strong>CONTRAINDICADA</strong> se imunossupressão presente.</td>
      <td>Permitida exclusivamente após avaliação individualizada criteriosa do CRIE se CD4 &ge; 25% em área com transmissão viral ativa grave inadiável.</td>
    </tr>
  </tbody>
</table>

<h3>Cardiopatias Congênitas, Pneumopatias Crônicas e Asplenia Anatômica / Funcional</h3>
<p>Pacientes portadores de cardiopatias congênitas com hiperfluxo pulmonar, hipertensão arterial pulmonar ou descompensação clínica, bem como pneumopatas crônicos (fibrose cística, displasia broncopulmonar):</p>
<ul>
  <li>Têm acesso no CRIE à vacina <strong>DTPa (acelular)</strong> para evitar instabilidade cardiorrespiratória por picos febris altos pós-DTPw;</li>
  <li>Recebem vacinação antipneumocócica de espectro estendido e vacinação anual contra <em>Influenza</em>;</li>
  <li>Profilaxia passiva contra o VSR com Nirsevimabe no primeiro ano de vida.</li>
</ul>
<p><strong>Crianças com Asplenia Anatômica (Pós-Esplenectomia) ou Funcional (Anemia Falciforme):</strong> Apresentam risco catastrófico de infecção bacteriana fulminante por micro-organismos encapsulados (<em>overwhelming post-splenectomy infection - OPSI</em>), com evolução letal em menos de 24 horas por sepse meningocócica ou pneumocócica. Esquema imunoterápico obrigatório:</p>
<ol>
  <li>Vacinação pneumocócica conjugada (VPC13/15) seguida da vacina Pneumo 23 polissacarídica (intervalo mínimo de 8 semanas entre a conjugada e a 23; com dose de reforço da Pneumo 23 após 3 a 5 anos);</li>
  <li>Vacinação contra Meningococo com <strong>Meningo ACWY conjugada</strong> e <strong>Meningo B recombinante</strong>;</li>
  <li>Reforço contra <em>Haemophilus influenzae</em> tipo b (Hib);</li>
  <li><strong>Quimioprofilaxia Contínua com Penicilina Oral:</strong> Penicilina V potássica oral (ou Amoxicilina) em doses diárias profiláticas iniciadas precocemente e mantidas obrigatoriamente até no mínimo os 5 anos de vida em crianças com anemia falciforme, e por pelo menos 2 a 5 anos após esplenectomia cirúrgica.</li>
</ol>
`
    },
    {
      id: 'eventos-adversos-pos-vacinacao-condutas',
      title: '6. Eventos Adversos Pós-Vacinação (EAPV): Diagnóstico Diferencial e Condutas Substitutivas',
      body_html: `
<h3>Vigilância de Eventos Adversos e Notificação Compulsória</h3>
<p>Um evento adverso pós-vacinação (EAPV) é qualquer ocorrência médica indesejável que se segue à administração de uma vacina e que não necessariamente possui uma relação causal demonstrada com o imunobiológico. A segurança das vacinas modernas é monitorada continuamente pelo Sistema de Vigilância Epidemiológica de EAPV do PNI, integrado ao SINAN e à Anvisa. Todos os eventos graves, inusitados, óbitos ou erros de imunização devem ser notificados em caráter imediato (em até 24 horas).</p>

<h3>Classificação e Condutas Clínicas nos Principais EAPV</h3>
<table class="book-table">
  <thead>
    <tr>
      <th>Evento Adverso Específico</th>
      <th>Vacina Tipicamente Associada e Intervalo Temporal</th>
      <th>Quadro Clínico e Critérios Diagnósticos</th>
      <th>Conduta para as Próximas Doses do Calendário</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Episódio Hipotônico-Hiporresponsivo (EHH)</strong></td>
      <td>Pentavalente / DTPw (componente pertussis celular). Ocorre quase sempre nas primeiras 48 horas (pico entre 1 e 6 horas pós-dose).</td>
      <td>Tríade clássica de início súbito: <strong>1. Palidez cutânea acentuada (ou cianose); 2. Diminuição expressiva ou perda do tônus muscular (hipotonia grave / flacidez); 3. Redução ou ausência de resposta a estímulos (hiporresponsividade / alteração de consciência)</strong>. É um evento autolimitado e benigno, que regride espontaneamente em minutos a poucas horas, sem deixar sequelas neurológicas motoras ou cognitivas.</td>
      <td><strong>NÃO contraindica a vacinação!</strong> Para as próximas doses, <strong>SUBSTITUIR a DTPw por DTPa (acelular)</strong> no CRIE.</td>
    </tr>
    <tr>
      <td><strong>Convulsão Febril ou Afebril</strong></td>
      <td>Pentavalente / DTPw (nas primeiras 72 horas) ou Tríplice Viral (entre o 5º e 12º dia pós-dose).</td>
      <td>Crise convulsiva clônica, tônica ou tônico-clônica generalizada, de curta duração (&lt; 15 minutos), na vigência de ascensão térmica rápida ou afebril.</td>
      <td>Se associada à DTPw: <strong>SUBSTITUIR as doses seguintes por DTPa (acelular)</strong> no CRIE. O histórico de convulsão febril não impede a vacinação contra o sarampo (Tríplice Viral), devendo-se apenas orientar controle térmico profilático caso surja febre no período de replicação viral (7 a 10 dias).</td>
    </tr>
    <tr>
      <td><strong>Encefalopatia Aguda Grave</strong></td>
      <td>Pentavalente / DTPw (ocorre nos primeiros <strong>7 dias</strong> após a vacinação).</td>
      <td>Quadro neurológico grave caracterizado por alteração persistente do nível de consciência (coma, estupor), crises convulsivas intratáveis de difícil controle e déficits neurológicos focais agudos sem outra etiologia identificada.</td>
      <td><strong>CONTRAINDICAÇÃO DEFINITIVA E ABSOLUTA DO COMPONENTE PERTUSSIS</strong> (tanto de células inteiras quanto acelular). As doses subsequentes devem ser completadas exclusivamente com a <strong>vacina Dupla Infantil (DT)</strong> associada a Hib e Hepatite B monovalentes.</td>
    </tr>
    <tr>
      <td><strong>Anafilaxia (Choque Anafilático)</strong></td>
      <td>Qualquer vacina (geralmente mediada por IgE contra antígenos virais, gelatina, neomicina ou látex da tampa do frasco). Início em minutos até 2 horas.</td>
      <td>Comprometimento multissistêmico rápido: urticária difusa, angioedema de lábios/glote, estridor laríngeo, broncoespasmo grave, hipotensão arterial e choque circulatório.</td>
      <td><strong>Tratamento Imediato: ADRENALINA INTRAMUSCULAR (1:1.000) na dose de 0,01 mg/kg (máximo de 0,3 mg em crianças e 0,5 mg em adolescentes) no vasto lateral da coxa</strong>, repetida a cada 5 a 15 minutos se refratária. <em>Contraindicação definitiva para doses subsequentes da mesma vacina</em> ou componente alergênico específico.</td>
    </tr>
    <tr>
      <td><strong>Invaginação Intestinal (Intussuscepção)</strong></td>
      <td>Vacina Oral contra Rotavírus Humano (VORH). Maior risco nas primeiras 1 a 3 semanas após a 1ª dose.</td>
      <td>Dor abdominal em cólica paroxística intensa com choro inconsolável, flexão das coxas sobre o abdome, palidez súbita, vômitos biliosos e fezes em "geleia de morango" (sangue com muco).</td>
      <td><strong>CONTRAINDICAÇÃO ABSOLUTA</strong> para a segunda dose da vacina contra Rotavírus. A criança deve ser encaminhada a centro cirúrgico/radiológico pediátrico para descompressão por enema aéreo/líquido guiado por USG ou laparotomia.</td>
    </tr>
    <tr>
      <td><strong>Apneia em Prematuro Extremo</strong></td>
      <td>Pentavalente / DTPw ou vacinas múltiplas no primeiro ano em RN &lt; 28 semanas. Início em até 48 horas.</td>
      <td>Pausa respiratória prolongada (&gt; 20 segundos) associada a bradicardia e dessaturação de oxigênio.</td>
      <td>Prematuros extremos internados devem ser monitorizados continuamente por 48 a 72 horas pós-vacina. Indicação de <strong>DTPa (acelular)</strong> no CRIE.</td>
    </tr>
    <tr>
      <td><strong>Linfadenite Supurada Pós-BCG (Becegite)</strong></td>
      <td>Vacina BCG intradérmica. Surge entre 1 e 6 meses após a aplicação.</td>
      <td>Aumento ganglionar axilar, supraclavicular ou cervical homolateral à punção &gt; 3 cm de diâmetro, com amolecimento central, flutuação e supuração espontânea ou fistulização cutânea.</td>
      <td><strong>NÃO fazer incisão cirúrgica ou drenagem aberta</strong> (risco de fístulas crônicas de difícil cicatrização). Se linfonodo &gt; 3 cm fistulizado com saída purulenta: tratar com <strong>Isoniazida oral na dose de 10 mg/kg/dia (máximo de 300 mg/dia) por 3 meses</strong>. Se abscesso frio sem fístula, realizar punção aspirativa com agulha calibrosa estéril e iniciar Isoniazida.</td>
    </tr>
  </tbody>
</table>
`
    },
    {
      id: 'resgate-esquemas-atrasados',
      title: '7. Estratégias de Atualização e Resgate de Esquemas em Atraso',
      body_html: `
<h3>O Princípio Áureo da Vacinologia: "Dose Aplicada é Dose Computada"</h3>
<p>No atendimento ambulatorial ou em campanhas de busca ativa, uma das maiores dúvidas do médico reside na conduta diante de crianças com atraso no calendário vacinal. O princípio fundamental do PNI e de todas as sociedades internacionais de imunização é categórico: <strong>NÃO SE RECOMEÇA ESQUEMA VACINAL EM HIPÓTESE ALGUMA!</strong></p>
<p>As células de memória (linfócitos B de memória e plasmócitos de longa vida na medula óssea) persistem ativas por meses ou anos após o estímulo antigênico primário. Portanto, independentemente do tempo decorrido desde a última dose (se meses ou anos), as doses anteriores são <em>sempre válidas e computadas</em>. A conduta consiste exclusivamente em <strong>completar o número de doses preconizadas</strong>, respeitando apenas os intervalos mínimos recomendados entre as doses subsequentes.</p>

<h3>Regras de Intervalo Mínimo para Resgate Rápido</h3>
<table class="book-table">
  <thead>
    <tr>
      <th>Vacina do Calendário</th>
      <th>Esquema Recomendado na Rotina</th>
      <th>Intervalo Mínimo entre Doses para Resgate em Atraso</th>
      <th>Idade Limite e Regras de Transição</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Pentavalente (DTPw-Hib-HepB)</strong></td>
      <td>3 doses aos 2, 4 e 6 meses de vida.</td>
      <td>Intervalo mínimo de <strong>4 semanas (30 dias)</strong> entre as doses 1, 2 e 3.</td>
      <td>Administrada até os <strong>6 anos, 11 meses e 29 dias</strong>. A partir dos 7 anos completos, o componente pertussis de células inteiras (DTPw) não é mais recomendado; resgatar com <strong>dT (dupla adulto)</strong> e completar Hepatite B monovalente.</td>
    </tr>
    <tr>
      <td><strong>VIP (Poliomielite inativada)</strong></td>
      <td>3 doses (2, 4, 6m) + 2 reforços (15m e 4 anos).</td>
      <td>Intervalo mínimo de 4 semanas entre as 3 doses básicas. Intervalo mínimo de <strong>6 meses</strong> entre a 3ª dose básica e o 1º reforço.</td>
      <td>Até os 4 anos, 11 meses e 29 dias. Todas as doses são realizadas exclusivamente com VIP injetável.</td>
    </tr>
    <tr>
      <td><strong>Pneumocócica 10 conjugada</strong></td>
      <td>2 doses (2 e 4 meses) + reforço aos 12 meses.</td>
      <td>Se iniciada entre 12 e 23 meses sem doses prévias: 2 doses com intervalo de 60 dias (ou 1 dose + reforço). Se entre 2 e 4 anos de idade não vacinada: dose única de resgate.</td>
      <td>O PNI disponibiliza a VPC10 para resgate em crianças não vacinadas até os <strong>4 anos, 11 meses e 29 dias</strong>.</td>
    </tr>
    <tr>
      <td><strong>Meningocócica C / ACWY</strong></td>
      <td>2 doses de MenC (3 e 5m) + reforço aos 12m com MenACWY.</td>
      <td>Se a criança chegar entre 12 meses e 4 anos de vida sem nenhuma dose prévia: administrar <strong>1 dose de MenACWY</strong> (ou MenC).</td>
      <td>Dose de reforço ou resgate com MenACWY garantida aos 11 a 14 anos de idade.</td>
    </tr>
    <tr>
      <td><strong>Tríplice Viral (SCR)</strong></td>
      <td>1ª dose aos 12 meses; 2ª dose (SCRV) aos 15 meses.</td>
      <td>Intervalo mínimo de <strong>30 dias</strong> entre a 1ª e a 2ª dose.</td>
      <td>Toda pessoa até 29 anos de idade deve ter comprovadamente <strong>duas doses</strong> de Tríplice Viral. Dos 30 aos 59 anos de idade, exige-se pelo menos uma dose comprovada.</td>
    </tr>
    <tr>
      <td><strong>Hepatite A</strong></td>
      <td>1 dose aos 15 meses de vida.</td>
      <td>Dose única administrada pelo PNI.</td>
      <td>Disponível para resgate no SUS até os <strong>4 anos, 11 meses e 29 dias</strong> de idade.</td>
    </tr>
    <tr>
      <td><strong>Febre Amarela</strong></td>
      <td>1 dose aos 9 meses e reforço aos 4 anos.</td>
      <td>Intervalo mínimo de 30 dias entre doses caso necessário.</td>
      <td>Crianças que iniciam a vacinação com &ge; 5 anos de idade recebem <strong>dose única</strong> para toda a vida.</td>
    </tr>
  </tbody>
</table>

<h3>Aproveitamento de Oportunidades: Não Fracionar Agendamentos</h3>
<p>Quando uma criança com atraso vacinal comparece à unidade básica de saúde ou serviço de emergência pediátrica, é um grave erro da equipe agendar vacinas em dias separados por conveniência administrativa ("venha na semana que vem para tomar mais duas"). Todas as vacinas atrasadas que forem clinicamente compatíveis devem ser administradas na <strong>mesma visita</strong>, utilizando locais anatômicos diferentes e seringas separadas. O fracionamento de consultas vacinais resulta em taxas superiores a 40% de evasão e abandono definitivo de esquemas.</p>
`
    },
    {
      id: 'prevencao-vr-dengue-covid',
      title: '8. Novas Fronteiras e Vacinas Especiais: VSR, Dengue, Covid-19 e Febre Amarela Expandida',
      body_html: `
<h3>Prevenção da Bronquiolite Viral Aguda: Imunização Materna vs Anticorpo Monoclonal Neonatal</h3>
<p>O Vírus Sincicial Respiratório (VSR) é responsável por mais de 70% das hospitalizações por bronquiolite viral aguda e pneumonia em lactentes no primeiro ano de vida. A estratégia preventiva moderna baseia-se em duas abordagens complementares altamente eficazes:</p>
<ol>
  <li><strong>Vacinação Materna na Gestação (Vacina Bivalente Recombinante de Proteína F Pré-Fusão - Abrysvo):</strong> Indicada para gestantes entre a <strong>32ª e a 36ª semana de idade gestacional</strong>. A imunização ativa materna eleva drasticamente os títulos séricos de anticorpos IgG neutralizantes específicos, que são transferidos ativamente através da placenta para o feto via receptores Fc neonatais (FcRn). Esse mecanismo confere proteção indireta ao lactente nascido a termo durante os primeiros 6 meses de vida, período de maior vulnerabilidade clínica para complicações respiratórias graves;</li>
  <li><strong>Anticorpo Monoclonal Neonatal de Ação Prolongada (Nirsevimabe):</strong> Para recém-nascidos que não receberam a proteção materna (mães não vacinadas, partos prematuros antes de decorridas 2 semanas da imunização materna) ou populações de altíssimo risco clínico no CRIE (prematuros extremos &lt; 29 semanas, cardiopatas graves e portadores de displasia broncopulmonar), o nirsevimabe fornece proteção passiva direta imediata, com eficácia superior a 80% na prevenção de admissões em UTI pediátrica.</li>
</ol>

<h3>Vacina contra a Dengue: Racional Imunológico da Qdenga (TAK-003)</h3>
<p>As infecções subsequentes por sorotipos heterólogos do vírus da dengue carregam o risco de <em>amplificação dependente de anticorpos (antibody-dependent enhancement - ADE)</em>, onde anticorpos prévios subneutralizantes facilitam a entrada viral em monócitos e macrófagos através dos receptores Fc-gama, disparando tempestade de citocinas inflamatórias, aumento da permeabilidade capilar, choque circulatório e manifestações hemorrágicas graves. Por esse motivo, a vacina de primeira geração (CYD-TDV - Dengvaxia) exigia sorologia prévia obrigatória e era contraindicada em soronegativos.</p>
<p>A vacina <strong>Qdenga (TAK-003)</strong>, desenvolvida sobre a espinha dorsal quimérica do vírus da dengue sorotipo 2 vivo atenuado, demonstrou eficácia clínica e segurança robustas <strong>tanto em indivíduos previamente expostos (soropositivos) quanto em indivíduos virgens de infecção prévia (soronegativos)</strong>, eliminando a necessidade de testes sorológicos pré-vacinais. No PNI, a priorização estratégica dos 10 aos 14 anos visa reduzir o impacto assistencial no SUS, sendo preconizado o intervalo de 3 meses entre a 1ª e a 2ª dose.</p>

<h3>Vacinação contra Covid-19 na Faixa Pediátrica</h3>
<p>A vacina contra Covid-19 foi incorporada de forma definitiva ao Calendário Nacional de Vacinação do PNI para crianças a partir dos <strong>6 meses de idade até 4 anos, 11 meses e 29 dias</strong>. Crianças pequenas não vacinadas apresentam risco não desprezível de hospitalização por Síndrome Respiratória Aguda Grave (SRAG) e desenvolvimento da <strong>Síndrome Inflamatória Multissistêmica Pediátrica associada ao SARS-CoV-2 (SIM-P / MIS-C)</strong>, caracterizada por choque vasodilatador, miocardite com disfunção ventricular, aneurismas de artérias coronárias e inflamação exuberante. O esquema pediátrico atual utiliza vacinas atualizadas contendo as linhagens variantes de circulação predominante (plataforma de RNA mensageiro ou recombinante proteica).</p>
`
    },
    {
      id: 'casos-clinicos-imunizacoes',
      title: '9. Casos Clínicos Pediátricos Aprofundados e Discussão Diagnóstica',
      body_html: `
<h3>Caso Clínico 1: Prematuro Extremo em Alta Hospitalar</h3>
<p><strong>Identificação:</strong> Lactente do sexo masculino, com 2 meses e 10 dias de vida cronológica (nascido de parto cesáreo por descolamento prematuro com idade gestacional de 27 semanas e 4 dias; peso de nascimento: 920 gramas). Permaneceu internado em UTI Neonatal por 65 dias, evoluindo com síndrome do desconforto respiratório do recém-nascido, displasia broncopulmonar leve (sem necessidade atual de oxigênio suplementar) e icterícia neonatal fisiológica tratada com fototerapia. Atualmente encontra-se clinicamente estável, em aleitamento materno complementado com fortificante, pesando 2.150 g. Recebeu apenas a dose da vacina Hepatite B monovalente nas primeiras 12 horas de vida. Não recebeu a vacina BCG até o momento.</p>
<p><strong>Discussão Clínica e Conduta Sequencial:</strong></p>
<ol>
  <li><strong>Vacina BCG:</strong> O paciente agora atingiu peso superior a 2.000 g (está com 2.150 g) e encontra-se hemodinamicamente compensado. Deve receber a vacina BCG intradérmica imediatamente na alta da maternidade.</li>
  <li><strong>Vacinas dos 2 Meses:</strong> A vacinação do prematuro deve seguir rigorosamente a <strong>idade cronológica</strong> (ele possui 2 meses e 10 dias de vida). As vacinas do calendário dos 2 meses devem ser administradas imediatamente: VIP (inativada), Pneumocócica conjugada e Rotavírus oral (VORH).</li>
  <li><strong>Indicação de Vacina Acelular no CRIE:</strong> Por ter nascido com peso &lt; 1.000 g (920 g) e idade gestacional &lt; 31 semanas (27 semanas), a criança possui indicação formal de receber a vacina <strong>Pentavalente acelular (DTPa-Hib-HepB)</strong> no CRIE, visando prevenir episódios graves de apneia e hiporresponsividade que poderiam ser deflagrados pelo componente pertussis de células inteiras (DTPw).</li>
  <li><strong>Profilaxia contra o Vírus Sincicial Respiratório (VSR):</strong> Por ser prematuro com idade gestacional inferior a 29 semanas e história de displasia broncopulmonar no primeiro ano de vida, o paciente tem indicação formal de receber profilaxia com o anticorpo monoclonal <strong>Nirsevimabe</strong> em dose única intramuscular antes do início do período de circulação sazonal do VSR.</li>
</ol>

<h3>Caso Clínico 2: Evento Adverso Pós-Pentavalente em Lactente</h3>
<p><strong>Identificação:</strong> Lactente feminina de 2 meses de vida, sem comorbidades prévias, compareceu à UBS onde recebeu a primeira dose das vacinas Pentavalente, VIP, Pneumocócica 10 e Rotavírus oral às 10 horas da manhã. Às 14 horas do mesmo dia (4 horas após a aplicação), a mãe notou que a criança começou a chorar intensamente por cerca de 20 minutos e, em seguida, apresentou subitamente palidez cutânea extrema, ficando extremamente "mole", flácida, sem conseguir sustentar a cabeça e sem responder aos chamados verbais da mãe ou a estímulos táteis, com olhar vago. A mãe a levou imediatamente à Unidade de Pronto Atendimento (UPA). Ao exame médico de admissão (30 minutos após o início do quadro): criança afebril (temperatura axilar 36,4 ºC), eupneica, com perfusão periférica de 2 segundos, tônus muscular globalmente diminuído e sonolência importante. Glicemia capilar de 96 mg/dL. Não apresentou abalos musculares ou desvio do olhar. Após 2 horas de observação em leito de hidratação, a criança acordou espontaneamente, começou a mamar vorazmente no seio materno e recuperou tônus muscular fisiológico completo, recebendo alta assintomática.</p>
<p><strong>Discussão Diagnóstica e Conduta:</strong></p>
<ol>
  <li><strong>Diagnóstico Sindrômico:</strong> Trata-se de um clássico <strong>Episódio Hipotônico-Hiporresponsivo (EHH)</strong>, caracterizado pela tríade de hipotonia, hiporresponsividade e palidez cutânea nas primeiras 48 horas após a vacinação contendo o componente pertussis de células inteiras.</li>
  <li><strong>Prognóstico e Notificação:</strong> O EHH é um evento autolimitado e benigno. Estudos de seguimento longitudinal de lactentes com EHH comprovam que o episódio não provoca sequelas neurológicas, atraso do neurodesenvolvimento ou risco aumentado de epilepsia futura. O caso deve ser notificado obrigatoriamente no sistema de vigilância de EAPV.</li>
  <li><strong>Conduta para o Próximo Esquema aos 4 Meses:</strong> O EHH <em>NÃO CONTRAINDICA</em> a continuidade da vacinação contra a coqueluche. A conduta mandatória no CRIE é a <strong>SUBSTITUIÇÃO da vacina Pentavalente celular (DTPw) pela Pentavalente Acelular (DTPa-Hib-HepB)</strong> para as doses subsequentes (aos 4 meses, 6 meses e reforço aos 15 meses). As demais vacinas (VIP, Pneumo 10 e Rotavírus) devem ser administradas normalmente.</li>
</ol>

<h3>Caso Clínico 3: Resgate Vacinal de Pré-Escolar com Esquema em Atraso</h3>
<p><strong>Identificação:</strong> Menino de 3 anos e 4 meses de idade, trazido pela avó a uma consulta de puericultura na Estratégia Saúde da Família (ESF). A avó relata que os pais perderam o acompanhamento de saúde da criança e solicita atualização. Ao examinar a Caderneta de Vacinação da Criança, o médico observa os seguintes registros confirmados: recebeu BCG e Hepatite B ao nascer; Pentavalente (1ª e 2ª doses aos 2 e 4 meses); VIP (1ª e 2ª doses aos 2 e 4 meses); Pneumo 10 (1ª e 2ª doses aos 2 e 4 meses); MenC (1ª dose aos 3 meses); Rotavírus (1ª e 2ª doses aos 2 e 4 meses). Não há nenhum registro vacinal após os 4 meses de vida. A criança nunca recebeu Tríplice Viral, Varicela, Febre Amarela, Hepatite A nem a 3ª dose de Pentavalente/VIP.</p>
<p><strong>Discussão de Resgate Imediato:</strong></p>
<ol>
  <li><strong>Planejamento Imediato no Dia da Consulta (Visita 1):</strong> Não recomeçar nenhuma série! Aplicar simultaneamente em sítios diferentes:
    <ul>
      <li><strong>Pentavalente:</strong> Aplicar a 3ª dose do esquema básico (a criança tem &lt; 7 anos de idade);</li>
      <li><strong>VIP:</strong> Aplicar a 3ª dose da poliomielite injetável;</li>
      <li><strong>Tríplice Viral (SCR):</strong> Aplicar a 1ª dose imediatamente;</li>
      <li><strong>Febre Amarela:</strong> Aplicar a 1ª dose (como a criança tem mais de 2 anos, a coadministração de Tríplice Viral e Febre Amarela em sítios anatômicos diferentes é perfeitamente segura e autorizada);</li>
      <li><strong>Hepatite A:</strong> Aplicar a dose única recomendada até os 4 anos e 11 meses.</li>
    </ul>
  </li>
  <li><strong>Agendamento para Daqui a 30 a 60 Dias (Visita 2):</strong>
    <ul>
      <li><strong>Pneumocócica 10:</strong> Aplicar a dose de reforço (a criança tem menos de 5 anos de idade);</li>
      <li><strong>Meningocócica ACWY (ou MenC):</strong> Aplicar a dose de resgate/reforço;</li>
      <li><strong>Segunda Dose de Tríplice Viral + 1ª Dose de Varicela (ou Tetraviral):</strong> Aplicar respeitando o intervalo mínimo de 30 dias em relação à Tríplice Viral da visita anterior.</li>
    </ul>
  </li>
  <li><strong>Planejamento dos Reforços de DTP e VIP:</strong> O 1º reforço de DTP e VIP deverá ser agendado para <strong>6 meses após a 3ª dose</strong> administrada na Visita 1.</li>
  <li><strong>Vacina do Rotavírus:</strong> Não aplicar! A criança tem 3 anos e 4 meses de idade, tendo ultrapassado a idade máxima limite permitida (7 meses e 29 dias).</li>
</ol>

<h3>Caso Clínico 4: Criança em Quimioterapia Exposta à Varicela</h3>
<p><strong>Identificação:</strong> Menina de 4 anos e 8 meses de idade, com diagnóstico de Leucemia Linfoide Aguda (LLA) de linhagem B, em fase de quimioterapia de manutenção (em uso contínuo de 6-mercaptopurina diária e metotrexato semanal). O hemograma recente revela neutropenia moderada (neutrófilos totais: 850/mm³) e linfopenia (linfócitos totais: 600/mm³). A mãe comparece em pânico ao pronto-atendimento onco-pediátrico relatando que o primo da paciente, que mora na mesma casa, foi diagnosticado há 48 horas com varicela clássica (catapora), apresentando lesões pleomórficas ativas em estágio de vesículas e crostas. A paciente paciente nunca teve catapora anteriormente e nunca recebeu a vacina contra a varicela devido ao início precoce da quimioterapia.</p>
<p><strong>Discussão e Conduta de Profilaxia Pós-Exposição:</strong></p>
<ol>
  <li><strong>Risco Clínico:</strong> Pacientes com neoplasias hematológicas sob quimioterapia imunossupressora que entram em contato com o vírus varicela-zóster selvagem apresentam risco de até 30% a 50% de desenvolver <strong>varicela hemorrágica disseminada</strong>, com pneumonite intersticial necrotizante fulminante, encefalite, hepatite aguda fulminante e coagulação intravascular disseminada (CIVD), com letalidade superior a 20%.</li>
  <li><strong>Contraindicação da Vacina Ativa:</strong> A vacina contra varicela é composta por vírus vivo atenuado cepa Oka. Em pacientes imunodeprimidos graves sob quimioterapia, ela é <strong>absolutamente contraindicada</strong> pelo risco de replicação sistêmica descontrolada do vírus vacinal. Portanto, a vacina de bloqueio pós-exposição NÃO pode ser utilizada.</li>
  <li><strong>Indicação Formal de Imunoglobulina Humana Hiperimune Anti-Varicela-Zóster (VZIG):</strong> A paciente cumpre todos os critérios mandatórios de indicação de VZIG do Ministério da Saúde: 1. Contato domiciliar íntimo e prolongado com caso índice infectante; 2. Paciente suscetível (sem história prévia da doença e não vacinada); 3. Condição de imunossupressão grave de base; 4. Atendimento dentro da janela terapêutica de <strong>até 96 horas</strong> (podendo ser estendida até 10 dias em situações excepcionais) após a exposição.</li>
  <li><strong>Prescrição:</strong> Solicitar imediatamente a VZIG ao CRIE na dose de 125 UI/10 kg de peso por via intramuscular profunda (dose mínima de 125 UI e dose máxima de 625 UI). Caso a VZIG não esteja disponível no CRIE em tempo hábil (&lt; 96 horas), a conduta alternativa recomendada consiste na administração de Imunoglobulina Humana Polivalente Intravenosa (IGIV) na dose de 400 mg/kg em dose única ou início de <strong>Aciclovir oral/venoso profilático</strong> a partir do 7º ao 9º dia após a exposição mantido por 7 dias.</li>
</ol>
`
    },
    {
      id: 'questoes-comentadas-residencia',
      title: '10. Questões Comentadas no Padrão ENAMED e Principais Bancas de Residência',
      body_html: `
<h3>Questão 1 (ENAMED / Inep - Revalidação e Residência)</h3>
<p>Um lactente de 2 meses de vida é levado à Unidade de Saúde da Família para consulta de rotina e aplicação das vacinas do calendário do PNI 2026. A mãe refere que a criança está ótima, ganhando peso adequadamente, mas apresenta discreta secreção nasal serosa há 2 dias, sem febre, mantendo sucção vigorosa ao seio materno. Ao exame físico: temperatura axilar de 36,7 ºC, corado, hidratado, oroscopia com hiperemia leve de pilares amigdalianos sem exsudato, ausculta pulmonar limpa. A mãe relata ainda que o pai do lactente possui antecedente de epilepsia na infância e pergunta se a vacina que causa "moleza" pode ser aplicada. De acordo com as diretrizes vigentes do PNI e do Ministério da Saúde, a conduta correta é:</p>
<p>A) Contraindicar a administração das vacinas Pentavalente e VIP até a completa resolução da coriza, aplicando apenas a vacina Pneumocócica 10-valente.<br>
B) Administrar normalmente todas as vacinas preconizadas aos 2 meses de vida (Pentavalente, VIP, Pneumocócica 10-valente e Rotavírus oral), pois coriza leve não é contraindicação e história familiar de epilepsia não justifica substituição da DTPw.<br>
C) Substituir a vacina Pentavalente de células inteiras pela vacina acelular no CRIE devido ao antecedente paterno de epilepsia, adiando a vacina contra Rotavírus devido ao risco de broncoaspiração.<br>
D) Adiar todas as vacinas da visita por 14 dias para evitar sobrecarga imune durante a infecção viral respiratória em curso.<br>
E) Administrar apenas a vacina VIP e adiar as vacinas orais e bacterianas até que a criança atinja 3 meses de vida.</p>
<p><strong>Gabarito Comentado: Alternativa B.</strong><br>
<em>Justificativa:</em> Sintomas catarrais leves de vias aéreas superiores (como coriza hialina ou tosse leve), afebril ou com febre baixa (&lt; 38,5 ºC), constituem <strong>falsas contraindicações</strong> à vacinação e não justificam o adiamento de nenhuma vacina do calendário. O adiamento desnecessário cria oportunidades perdidas de imunização. Além disso, o histórico familiar de epilepsia ou convulsão febril em parentes de primeiro grau NÃO contraindica o componente pertussis de células inteiras (DTPw) e NÃO é indicação de imunobiológico especial (DTPa) no CRIE. Portanto, todas as 4 vacinas do calendário dos 2 meses (Pentavalente, VIP, Pneumo 10 e VORH) devem ser administradas na mesma visita.<br>
<em>Comentário dos Distratores:</em><br>
A incorreta: A coriza leve não contraindica a vacinação.<br>
C incorreta: História familiar de epilepsia não é critério do CRIE para vacina acelular; a vacina oral de rotavírus pode ser dada normalmente.<br>
D incorreta: Não existe conceito de "sobrecarga imune" por vacinas do calendário em infecções leves.<br>
E incorreta: Adiar vacinas expõe o lactente ao risco iminente de coqueluche e meningite por pneumococo.</p>

<h3>Questão 2 (USP / FUVEST - Residência Médica)</h3>
<p>Lactente de 3 meses e 10 dias de idade é trazido à UBS pela mãe. Ao checar a caderneta de vacinação, o médico verifica que a criança recebeu a vacina BCG e a vacina contra Hepatite B nas primeiras 24 horas de vida na maternidade, mas não compareceu para tomar as vacinas programadas para os 2 meses. A mãe relata que a criança esteve assintomática e não sabe explicar o motivo da falta. Considerando as normas técnicas do PNI 2026, a conduta correta em relação à vacinação é:</p>
<p>A) Aplicar imediatamente a 1ª dose de Pentavalente, VIP e Pneumocócica 10; e administrar a 1ª dose da vacina oral contra Rotavírus, pois a criança ainda está dentro da janela máxima permitida de 3 meses e 15 dias de vida.<br>
B) Contraindicar a vacina oral contra Rotavírus, pois a idade máxima permitida para a primeira dose é impreterivelmente de 2 meses e 29 dias de vida.<br>
C) Recomeçar todo o esquema vacinal, repetindo inclusive as vacinas BCG e Hepatite B administradas ao nascimento.<br>
D) Administrar apenas a vacina contra Rotavírus e agendar as vacinas injetáveis para 30 dias depois, a fim de evitar interferência com a replicação do vírus vacinal atenuado intestinal.<br>
E) Encaminhar a criança ao CRIE para receber esquema especial acelerado com vacinas acelulares.</p>
<p><strong>Gabarito Comentado: Alternativa A.</strong><br>
<em>Justificativa:</em> Para a vacina oral contra o Rotavírus (VORH), a idade máxima para a administração da <strong>primeira dose</strong> é de <strong>3 meses e 15 dias de vida (105 dias)</strong>. Como o lactente tem 3 meses e 10 dias de idade (aproximadamente 100 dias), ele encontra-se rigorosamente dentro da janela permitida e DEVE receber a 1ª dose do Rotavírus oral. As vacinas inativadas atrasadas dos 2 meses (Pentavalente, VIP e Pneumocócica 10) devem ser aplicadas na mesma visita, sem qualquer prejuízo imunológico.<br>
<em>Comentário dos Distratores:</em><br>
B incorreta: A idade máxima para a primeira dose não é de 2 meses e 29 dias, mas sim de 3 meses e 15 dias.<br>
C incorreta: Erro grave; doses aplicadas nunca são repetidas.<br>
D incorreta: A vacina oral de rotavírus não sofre interferência de vacinas inativadas injetáveis nem exige espaçamento de 30 dias.<br>
E incorreta: Criança hígida com atraso vacinal simples é atendida na sala de vacina da UBS da rede básica.</p>

<h3>Questão 3 (Unicamp - Residência Médica)</h3>
<p>Recém-nascido a termo, pesando 3.200 g, filho de mãe sabidamente portadora crônica de hepatite B (HBsAg positivo, HBeAg positivo e carga viral de HBV-DNA elevada), nasceu de parto vaginal sem intercorrências. De acordo com o protocolo nacional de profilaxia da transmissão vertical do vírus da hepatite B do Ministério da Saúde e da Sociedade Brasileira de Pediatria, a conduta correta imediata na sala de parto / alojamento conjunto é:</p>
<p>A) Administrar apenas a vacina monovalente contra Hepatite B nas primeiras 12 horas de vida, pois a imunoglobulina só está indicada se o recém-nascido for prematuro.<br>
B) Administrar a vacina contra Hepatite B monovalente e a Imunoglobulina Humana Anti-Hepatite B (HBIg) nas primeiras 12 horas de vida (máximo de até 7 dias), em locais anatômicos diferentes.<br>
C) Iniciar aleitamento materno cruzado e aguardar o resultado do HBsAg do recém-nascido antes de qualquer imunização.<br>
D) Contraindicar a vacina BCG e administrar a vacina contra Hepatite B associada a interferon alfa nas primeiras 24 horas.<br>
E) Administrar a HBIg e contraindicar a vacina contra Hepatite B até o 6º mês de vida para evitar o bloqueio dos anticorpos pela imunoglobulina.</p>
<p><strong>Gabarito Comentado: Alternativa B.</strong><br>
<em>Justificativa:</em> O recém-nascido exposto à mãe HBsAg positiva (especialmente com HBeAg positivo, que traduz alta replicação viral) possui um risco superior a 90% de transmissão perinatal e cronificação da infecção, evoluindo precocemente para cirrose hepática e carcinoma hepatocelular na vida adulta jovem. A profilaxia combinada imediata consiste na administração de: 1. Vacina recombinante monovalente contra Hepatite B (imunização ativa) aplicada nas primeiras 12 horas de vida; associada a 2. Imunoglobulina Humana Específica Anti-Hepatite B (HBIg - imunização passiva) na dose de 0,5 mL intramuscular, administrada preferencialmente nas primeiras 12 a 24 horas de vida (podendo ser realizada no máximo até o 7º dia pós-parto), <em>obrigatoriamente em membro anatômico diferente</em> (ex: vacina na coxa esquerda e HBIg na coxa direita). A eficácia combinada excede 95% na prevenção da cronificação.<br>
<em>Comentário dos Distratores:</em><br>
A incorreta: Apenas a vacina não é suficiente em mães HBsAg positivas; a HBIg é indispensável.<br>
C incorreta: Aleitamento cruzado é formalmente proibido pelo risco de transmissão de patógenos (incluindo HIV e HTLV); não se espera sorologia do RN.<br>
D incorreta: A vacina BCG é aplicada normalmente e interferon não tem papel no RN exposto.<br>
E incorreta: A vacina inativada não sofre interferência negativa clinicamente relevante da HBIg quando administradas em sítios diferentes, sendo fundamental a imunização ativa concomitante.</p>

<h3>Questão 4 (UERJ - Residência Médica)</h3>
<p>Menina de 15 meses de vida é trazida à UBS para avaliação e vacinação de rotina. Ao checar o histórico, a médica constata que ela cumpriu o esquema básico dos 2, 3, 4, 5, 6 e 9 meses e recebeu a dose dos 12 meses (Tríplice Viral, Pneumo 10 e MenACWY). Para a consulta dos 15 meses de vida, em consonância com as atualizações recentes do PNI 2026, as vacinas indicadas são:</p>
<p>A) 1º reforço de DTP (ou DTPa se indicada), 1º reforço de VIP (injetável), Hepatite A e Tetraviral (ou Tríplice Viral + Varicela).<br>
B) 1º reforço de DTP, 1º reforço de VOP (gotinha oral), Febre Amarela e Meningo C.<br>
C) DTPa acelular obrigatória para todas as crianças, VOP oral e HPV dose única.<br>
D) Pentavalente de reforço, VIP e vacina oral contra Rotavírus dose de reforço.<br>
E) Apenas Hepatite A e reforço de Meningo C, sendo proscritas quaisquer vacinas virais aos 15 meses.</p>
<p><strong>Gabarito Comentado: Alternativa A.</strong><br>
<em>Justificativa:</em> O calendário dos 15 meses do PNI 2026 contempla: 1. Primeiro reforço contra difteria, tétano e coqueluche com a vacina DTP (tríplice bacteriana infantil); 2. <strong>Primeiro reforço de poliomielite com a vacina VIP injetável (abolição definitiva da VOP oral)</strong>; 3. Dose única da vacina contra Hepatite A inativada; e 4. Segunda dose contra sarampo, caxumba e rubéola associada à primeira dose de varicela, administrada sob a forma da vacina Tetraviral (SCRV) ou pela aplicação simultânea de Tríplice Viral + Varicela monovalente em locais diferentes.<br>
<em>Comentário dos Distratores:</em><br>
B incorreta: A VOP foi formalmente abolida do calendário brasileiro; a febre amarela não faz parte dos 15 meses (é feita aos 9 meses e aos 4 anos).<br>
C incorreta: A DTPa não é universal no SUS (é reservada para indicações do CRIE); HPV é aplicada dos 9 aos 14 anos.<br>
D incorreta: Não existe dose de reforço de Rotavírus (idade máxima é 7m29d); aos 15 meses não se usa Pentavalente (usa-se DTP).<br>
E incorreta: A alternativa omite as vacinas fundamentais dos 15 meses.</p>

<h3>Questão 5 (AMRIGS - Residência Médica)</h3>
<p>Um lactente de 6 meses de vida, nascido pré-termo com 32 semanas de idade gestacional, recebeu a segunda dose da vacina Pentavalente (DTPw-Hib-HepB) há 2 dias. Há 6 horas, apresentou quadro súbito de febre de 39,2 ºC acompanhado de crise convulsiva tônico-clônica generalizada com duração de 3 minutos, seguida de sonolência pós-ictal transitória de 15 minutos, recuperando o sensório completamente. A avaliação neurológica e os exames laboratoriais na emergência não evidenciaram infecção do sistema nervoso central ou distúrbios hidroeletrolíticos, firmando-se o diagnóstico de convulsão febril associada à vacina. De acordo com as normas de Eventos Adversos Pós-Vacinação do Ministério da Saúde, a conduta para a 3ª dose contra coqueluche aos 6 meses é:</p>
<p>A) Contraindicar definitivamente qualquer vacina contra coqueluche, substituindo por DT (dupla infantil).<br>
B) Substituir a vacina DTPw pela vacina DTPa (acelular) no CRIE.<br>
C) Manter a vacina Pentavalente com DTPw convencional associada a diazepam profilático contínuo por 7 dias.<br>
D) Contraindicar todas as vacinas subsequentes do PNI por risco de epilepsia refratária.<br>
E) Suspender temporariamente a vacinação até que a criança atinja 2 anos de idade completos.</p>
<p><strong>Gabarito Comentado: Alternativa B.</strong><br>
<em>Justificativa:</em> A ocorrência de convulsão febril (ou afebril) nas primeiras 72 horas após a administração da vacina contendo o componente pertussis de células inteiras (DTPw) constitui <strong>indicação formal de substituição da DTPw pela vacina acelular (DTPa)</strong> nas doses subsequentes, a ser fornecida no Centro de Referência para Imunobiológicos Especiais (CRIE). A convulsão febril pós-vacina DTPw NÃO é contraindicação definitiva de pertussis (a contraindicação absoluta do componente pertussis aplica-se apenas à encefalopatia aguda nos primeiros 7 dias pós-vacina ou choque anafilático prévio).<br>
<em>Comentário dos Distratores:</em><br>
A incorreta: A substituição por DT (dupla infantil) é reservada exclusivamente para os casos de encefalopatia aguda grave em até 7 dias.<br>
C incorreta: Não se deve repetir a DTPw de células inteiras após crise convulsiva relacionada ao imunobiológico; diazepam contínuo profilático não é recomendado.<br>
D e E incorretas: Condutas abusivas e iatrogênicas que privam a criança da proteção vacinal.</p>

<h3>Questão 6 (SURCE / PSU-CE - Residência Médica)</h3>
<p>Menino de 11 anos de idade, previamente hígido e com vacinação básica completa na infância, comparece à consulta com os pais na Unidade de Atenção Primária para revisão de saúde do adolescente. A mãe apresenta a caderneta e solicita orientação sobre quais imunizações são indicadas nessa faixa etária pelo PNI 2026. A conduta correta é ofertar:</p>
<p>A) Vacina HPV quadrivalente em esquema de dose única e vacina Meningocócica ACWY conjugada em dose única.<br>
B) Vacina HPV quadrivalente em 3 doses (0, 2 e 6 meses) e vacina BCG de reforço.<br>
C) Apenas reforço da vacina Febre Amarela e vacina Tríplice Viral.<br>
D) Vacina HPV apenas para meninas, sendo contraindicada para o sexo masculino no SUS.<br>
E) Vacina Meningocócica C conjugada e suspensão de qualquer outra vacina até os 15 anos.</p>
<p><strong>Gabarito Comentado: Alternativa A.</strong><br>
<em>Justificativa:</em> Na faixa etária dos 11 aos 14 anos de idade, o Calendário Nacional de Vacinação do PNI preconiza rotineiramente duas vacinas centrais: 1. <strong>Vacina contra o HPV (Papilomavírus Humano)</strong>: administrada para meninas e meninos de 9 a 14 anos em <strong>Esquema de Dose Única</strong>; e 2. <strong>Vacina Meningocócica ACWY conjugada</strong>: administrada na faixa de 11 a 14 anos de idade em dose única ou reforço, visando conter a transmissão e o estado de portador nasofaríngeo de meningococo em adolescentes.<br>
<em>Comentário dos Distratores:</em><br>
B incorreta: Esquema de 3 doses de HPV aos 11 anos é reservado para imunossuprimidos; BCG não tem reforço na adolescência.<br>
C incorreta: Ignora as vacinas eletivas e fundamentais do adolescente (HPV e MenACWY).<br>
D incorreta: Desde 2017 a vacina HPV contempla igualmente meninos no SUS.<br>
E incorreta: A vacina recomendada para adolescentes é a MenACWY (tetravalente) e não a MenC isolada.</p>
`
    },
    {
      id: 'resumo-estrategico-pratica-clinica',
      title: '11. Guia Prático e Resumo Estratégico de Condutas para Provas e Plantão',
      body_html: `
<h3>Tabela Mnemônica: As Vacinas Vivas Atenuadas e Suas Peculiaridades</h3>
<table class="book-table">
  <thead>
    <tr>
      <th>Vacina Viva Atenuada</th>
      <th>Via e Apresentação</th>
      <th>Idade Crítica</th>
      <th>Pegadinha Clássica de Prova</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>BCG</strong></td>
      <td>Intradérmica (deltoide direito).</td>
      <td>Ao nascer (&ge; 2.000 g).</td>
      <td>Não se repete a vacina se não houver cicatriz vacinal prévia documentada! Becegite supurada &gt; 3 cm trata-se com Isoniazida 10 mg/kg/dia por 3 meses (NUNCA drenar cirurgicamente).</td>
    </tr>
    <tr>
      <td><strong>VORH (Rotavírus)</strong></td>
      <td>Oral estrita.</td>
      <td>Dose 1 (1m15d até 3m15d); Dose 2 (3m7d até 7m29d).</td>
      <td>Se a criança cuspir ou vomitar, NUNCA REPETIR A DOSE! Contraindicada absolutamente se história de invaginação intestinal prévia.</td>
    </tr>
    <tr>
      <td><strong>Febre Amarela (17D)</strong></td>
      <td>Subcutânea.</td>
      <td>9 meses (reforço aos 4 anos).</td>
      <td>Contraindicada em nutrizes amamentando lactentes &lt; 6 meses (risco de encefalite pelo vírus vacinal transmitido pelo leite materno; suspender aleitamento por 10 a 14 dias se vacinação materna for inadiável).</td>
    </tr>
    <tr>
      <td><strong>Tríplice Viral (SCR)</strong></td>
      <td>Subcutânea.</td>
      <td>12 meses e 15 meses (Tetraviral).</td>
      <td>Pode dar falso-negativo no PPD se aplicado menos de 30 dias após a vacina. Se recebeu sangue/hemoderivados, aguardar 3 a 11 meses antes de aplicar a Tríplice Viral.</td>
    </tr>
    <tr>
      <td><strong>Varicela</strong></td>
      <td>Subcutânea.</td>
      <td>15 meses (Tetra) e 4 anos (monovalente).</td>
      <td>Em imunodeprimidos graves sob quimioterapia expostos à catapora, a vacina é contraindicada; deve-se prescrever a Imunoglobulina Hiperimune (VZIG) em até 96 horas pós-contato.</td>
    </tr>
    <tr>
      <td><strong>Dengue (Qdenga)</strong></td>
      <td>Subcutânea (2 doses, intervalo de 3 meses).</td>
      <td>10 a 14 anos no PNI.</td>
      <td>Não exige teste sorológico prévio (eficaz em soronegativos e soropositivos). Contraindicada em gestantes e imunodeprimidos.</td>
    </tr>
  </tbody>
</table>

<h3>Algoritmo Decisório Diante de Eventos Adversos pós-Pentavalente (DTPw)</h3>
<p>O fluxograma mais cobrado em provas de residência médica sobre EAPV segue uma lógica direta:</p>
<ol>
  <li><strong>Febre alta (&gt; 39,5 ºC) ou choro persistente inconsolável por &ge; 3 horas:</strong> Conduta: <em>MANTER DTPw</em> para as próximas doses, utilizando antitérmicos profiláticos no momento da vacinação. Não é critério de vacina acelular!</li>
  <li><strong>Episódio Hipotônico-Hiporresponsivo (EHH) nas primeiras 48 horas OU Convulsão (febril ou afebril) nas primeiras 72 horas:</strong> Conduta: <em>SUBSTITUIR DTPw POR DTPa (ACELULAR)</em> no CRIE para as doses seguintes. Não contraindica a vacinação!</li>
  <li><strong>Encefalopatia Aguda Grave nos primeiros 7 dias pós-vacinação:</strong> Conduta: <em>CONTRAINDICAÇÃO DEFINITIVA DO COMPONENTE PERTUSSIS</em> (tanto DTPw quanto DTPa). Completar esquema exclusivamente com <strong>DT (Dupla Infantil)</strong>.</li>
  <li><strong>Reação Anafilática Comprovada:</strong> Conduta: <em>CONTRAINDICAÇÃO DEFINITIVA</em> da vacina responsável.</li>
</ol>
`
    },
    {
      id: 'pontos-chave-enamed-pni-2026',
      title: '12. Pontos de Alto Rendimento para o ENAMED e Diretrizes Finais',
      body_html: `
<h3>Dez Mandamentos das Imunizações para a Prova de Título e Residência</h3>
<ul>
  <li><strong>1. Abolição Definitiva da VOP:</strong> O esquema da poliomielite no Brasil é agora 100% VIP (injetável) aos 2, 4, 6 meses, 15 meses e 4 anos. A vacina de gotinha foi extinta do calendário de rotina.</li>
  <li><strong>2. "Dose aplicada é dose computada":</strong> NUNCA recomeçar esquemas vacinais atrasados; apenas completar as doses faltantes respeitando os intervalos mínimos.</li>
  <li><strong>3. Regra dos 30 dias para vacinas vivas parenterais:</strong> Duas vacinas vivas injetáveis (ex: Tríplice Viral e Febre Amarela) devem ser feitas simultaneamente no mesmo dia OU com intervalo mínimo de 30 dias entre elas. Vacinas orais (Rotavírus) e inativadas não obedecem a essa restrição.</li>
  <li><strong>4. Limite Estrito do Rotavírus:</strong> A 1ª dose da vacina oral de rotavírus não pode ser administrada após 3 meses e 15 dias de vida; a 2ª dose não pode ser administrada após 7 meses e 29 dias. Se a criança cuspir ou regurgitar, nunca repetir a dose.</li>
  <li><strong>5. Cicatriz de BCG ausente:</strong> Crianças que não apresentaram cicatriz vacinal após a BCG NÃO devem ser revacinadas se houver comprovação documental prévia.</li>
  <li><strong>6. Conduta no EHH:</strong> Episódio Hipotônico-Hiporresponsivo não deixa sequelas e NÃO contraindica pertussis; substitui-se a DTPw por DTPa no CRIE.</li>
  <li><strong>7. Encefalopatia em até 7 dias:</strong> Única complicação neurológica que contraindica definitivamente todo componente pertussis (celular e acelular), obrigando a continuidade com vacina DT.</li>
  <li><strong>8. Profilaxia Materna e Neonatal do VSR:</strong> Vacina materna (Abrysvo) entre 32 e 36 semanas de gestação ou anticorpo monoclonal (Nirsevimabe) em dose única para prematuros &lt; 29 semanas, cardiopatas e pneumopatas crônicos.</li>
  <li><strong>9. HPV em Dose Única:</strong> Administrado dos 9 aos 14 anos para ambos os sexos em dose única. Esquema em 3 doses (0, 2 e 6 meses) exclusivo para imunossuprimidos até 45 anos.</li>
  <li><strong>10. Febre Amarela e Lactação:</strong> Mulheres amamentando bebês &lt; 6 meses não podem tomar a vacina de Febre Amarela pelo risco de encefalite vacinal no bebê. Se a vacinação for inadiável, suspender o aleitamento por 10 a 14 dias.</li>
</ul>
`
    }
  ],
  references: [
    {
      title: 'Ministério da Saúde do Brasil — Programa Nacional de Imunizações (PNI). Calendário Nacional de Vacinação da Criança e do Adolescente',
      url: 'https://www.gov.br/saude/pt-br/vacinacao/calendario'
    },
    {
      title: 'Ministério da Saúde do Brasil — Manual dos Centros de Referência para Imunobiológicos Especiais (CRIE), 6ª edição revisada',
      url: 'https://www.gov.br/saude/pt-br/centrais-de-conteudo/publicacoes/svsa/vacinacao-imunizacao-pni/manual-centros-de-referencia-imunobiologicos-especiais'
    },
    {
      title: 'Sociedade Brasileira de Pediatria (SBP) — Departamento Científico de Imunizações. Calendário de Vacinação da Criança e do Adolescente',
      url: 'https://www.sbp.com.br/departamentos-cientificos/imunizacoes/calendarios-de-vacinacao/'
    },
    {
      title: 'Ministério da Saúde do Brasil — Manual de Vigilância Epidemiológica de Eventos Adversos Pós-Vacinação (EAPV)',
      url: 'https://www.gov.br/saude/pt-br/centrais-de-conteudo/publicacoes/svsa/vacinacao-imunizacao-pni/manual-de-vigilancia-epidemiologica-de-eventos-adversos-pos-vacinacao-4a-edicao'
    },
    {
      title: 'Organização Mundial da Saúde (OMS) — Weekly Epidemiological Record (WER). Poliomyelitis Eradication and HPV Vaccination Strategies',
      url: 'https://www.who.int/teams/immunization-vaccines-and-biologicals'
    }
  ]
};

const chars = saveBook(book);
console.log(`Finished ${book.slug}: ${chars} useful characters.`);
