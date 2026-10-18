import { saveBook } from './bloco-04-utils.mjs';

const book = {
  slug: 'pneumonia-na-crianca',
  title: 'Pneumonia na Criança',
  area: 'Pediatria',
  materia: 'Infectologia Pediátrica e Pneumologia',
  description: 'Tratado completo de Pneumonia Adquirida na Comunidade (PAC) na infância: epidemiologia global e brasileira como principal causa infecciosa de mortalidade em menores de 5 anos; classificação etiológica estratificada por faixa etária (recém-nascidos, lactentes de 1 a 3 meses, crianças de 2 meses a 5 anos e escolares maiores de 5 anos); Pneumonia Afebril do Lactente por Chlamydia trachomatis (tosse em staccato, eosinofilia periférica, infiltrado intersticial e tratamento com azitromicina); pneumonias atípicas por Mycoplasma pneumoniae e Chlamydia pneumoniae; diagnóstico clínico segundo a estratégia AIDPI da OMS / Ministério da Saúde (a taquipneia aferida em 1 minuto completo como o sinal mais sensível: < 2 meses >= 60 irpm, 2 a 11 meses >= 50 irpm, 1 a 4 anos >= 40 irpm, >= 5 anos >= 20-30 irpm); estratificação de gravidade (pneumonia ambulatorial versus pneumonia grave com tiragem subcostal versus pneumonia muito grave com sinais gerais de perigo); diretrizes de antibioticoterapia ambulatorial (Amoxicilina 50 a 90 mg/kg/dia) e hospitalar (Ampicilina IV ou Penicilina Cristalina IV); complicações pleuropulmonares (derrame parapneumônico e empiema pleural: toracocentese diagnóstica, critérios bioquímicos de pH < 7,20 e glicose < 40 mg/dL, drenagem tubular em selo d\'água, videotoracoscopia precoce) e pneumonia estafilocócica necrotizante com pneumatoceles; casos clínicos estruturados e questões comentadas para o ENAMED e residência médica.',
  sections: [
    {
      id: 'epidemiologia-fisiopatologia-mecanismos-defesa',
      title: '1. Epidemiologia Global e Brasileira, Mecanismos de Defesa e Fisiopatologia',
      body_html: `
<h3>Magnitude Epidemiológica da Pneumonia Pediátrica</h3>
<p>A Pneumonia Adquirida na Comunidade (PAC) permanece como a <strong>principal causa infecciosa isolada de mortalidade em crianças menores de 5 anos de idade em todo o mundo</strong>, superando as mortes causadas por malária, sarampo e diarreia combinadas. Segundo dados da Organização Mundial da Saúde (OMS) e do Fundo das Nações Unidas para a Infância (UNICEF), a pneumonia é responsável por aproximadamente 700.000 a 800.000 óbitos pediátricos anuais globalmente, a imensa maioria concentrada em países de média e baixa renda da África Subsaariana e do Sul da Ásia.</p>
<p>No Brasil, a introdução universal da <strong>Vacina Pneumocócica Conjugada 10-valente (VPC-10)</strong> e da vacina pentavalente (contendo o componente contra o <em>Haemophilus influenzae</em> tipo b - Hib) no Programa Nacional de Imunizações (PNI) em 2010 provocou uma redução histórica superior a 50% nas hospitalizações e mortes infantis por pneumonia bacteriana. Não obstante essa conquista sanitária notável, a PAC ainda figura entre as três maiores causas de internação e óbito no período pós-neonatal em território nacional, com disparidades regionais marcantes que penalizam populações em situação de vulnerabilidade socioeconômica, desnutrição e habitação precária nas regiões Norte e Nordeste.</p>

<h3>Mecanismos de Defesa do Trato Respiratório e Vias de Invasão</h3>
<p>O aparelho respiratório da criança dispõe de uma sofisticada rede integrada de defesas mecânicas, anatômicas, celulares e humorais para preservar a esterilidade biológica dos alvéolos pulmonares:</p>
<ul>
  <li><strong>Filtração Mecânica e Impactação Nasal:</strong> As vibrissas nasais e a turbulência nas conchas nasais retêm partículas e gotículas superiores a 10 micrômetros de diâmetro;</li>
  <li><strong>Aparelho Mucociliar:</strong> As células epiteliais ciliadas da árvore traqueobrônquica realizam batimentos rítmicos em direção à orofaringe ("escada rolante mucociliar"), expelindo o muco que aprisiona microrganismos inalados;</li>
  <li><strong>Reflexo da Tosse e Espirro:</strong> Expulsão mecânica sob alta pressão de secreções e corpos estranhos das vias aéreas proximais;</li>
  <li><strong>Defesas Humorais e Celulares da Superfície Alveolar:</strong>
    <ul>
      <li><strong>Surfactante Pulmonar:</strong> As proteínas SP-A e SP-D funcionam como opsoninas solúveis (colectinas), aglutinando bactérias e facilitando sua fagocitose;</li>
      <li><strong>Macrófagos Alveolares:</strong> Células fagocíticas residentes que ingerem e destroem patógenos sem deflagrar resposta inflamatória exuberante destrutiva quando a carga bacteriana é baixa;</li>
      <li><strong>Imunoglobulinas:</strong> IgA secretora nas vias aéreas condutoras e IgG transudada no espaço alveolar promovem neutralização de toxinas e opsonização bacteriana.</li>
    </ul>
  </li>
</ul>

<h3>Vias Patogênicas de Inoculação Pulmonar</h3>
<p>A invasão pulmonar pelo microrganismo ocorre por três rotas principais:</p>
<ol>
  <li><strong>Microaspiração de Conteúdo Orofaríngeo (Rota Mais Comum):</strong> As vias aéreas superiores de crianças hígidas são densamente colonizadas por bactérias potencialmente patogênicas (<em>Streptococcus pneumoniae</em>, <em>H. influenzae</em>, <em>Moraxella catarrhalis</em> e <em>Staphylococcus aureus</em>). Durante o sono ou na vigência de uma infecção viral concomitante que danifica o epitélio ciliar, ocorre microaspiração dessas secreções colonizadas para o trato respiratório inferior;</li>
  <li><strong>Inalação de Gotículas e Aerossóis:</strong> Rota característica de vírus respiratórios (VSR, Influenza, Adenovírus) e de bactérias atípicas (<em>Mycoplasma pneumoniae</em> e <em>Chlamydia pneumoniae</em>), bem como do <em>Mycobacterium tuberculosis</em>;</li>
  <li><strong>Disseminação Hematogênica:</strong> Ocorre na sepse neonatal precoce ou tardia (por <em>Streptococcus agalactiae</em>, <em>Escherichia coli</em> ou <em>Listeria monocytogenes</em>) ou a partir de focos infecciosos distantes (ex.: osteomielite, artrite séptica ou celulite complicada por <em>Staphylococcus aureus</em>, que atinge os pulmões pela circulação venosa gerando êmbolos sépticos e pneumonias estafilocócicas multifocais).</li>
</ol>

<h3>Fisiopatologia da Lesão Alveolar na Pneumonia Típica</h3>
<p>Quando a virulência do microrganismo e a carga de inóculo sobrepujam as defesas dos macrófagos alveolares, desencadeia-se uma resposta inflamatória aguda coordenada:</p>
<ul>
  <li><strong>Fase de Congestão / Edema Inicial:</strong> Liberação de citocinas pró-inflamatórias (IL-1, TNF-&alpha;, IL-8), provocando vasodilatação capilar e transudação de líquido seroso rico em proteínas para o interior dos sacos alveolares. O pneumococo prolifera rapidamente nesse líquido rico em nutrientes e dissemina-se para alvéolos vizinhos através dos <strong>Poros de Kohn</strong> e dos <strong>Canais de Lambert</strong>;</li>
  <li><strong>Fase de Hepatização Vermelha:</strong> Influxo maciço de neutrófilos, hemácias extravasadas e filamentos de fibrina que preenchem os alvéolos, conferindo ao lobo pulmonar uma consistência firme e avermelhada semelhante à do fígado;</li>
  <li><strong>Fase de Hepatização Cinzenta:</strong> Lise das hemácias, desagregação leucocitária e deposição densa de fibrina comprimindo os capilares alveolares;</li>
  <li><strong>Fase de Resolução:</strong> Macrófagos fagocitam os debris celulares e a fibrina, restabelecendo a aeração alveolar sem destruição da arquitetura do estroma elástico (na ausência de germes necrotizantes).</li>
</ul>
<p>O preenchimento dos alvéolos por exsudato purulento impede a difusão gasosa nas unidades afetadas enquanto a perfusão capilar se mantém (<strong>efeito shunt intrapulmonar direito-esquerdo</strong>). O resultado hemodinâmico e respiratório imediato é a <strong>hipoxemia arterial precoce</strong>, compensada inicialmente pelo aumento reflexo da frequência respiratória (taquipneia central induzida por quimiorreceptores carotídeos e mecano-receptores pulmonares J).</p>
`
    },
    {
      id: 'etiologia-faixa-etaria-pediatrica',
      title: '2. Classificação Etiológica Estratificada por Faixa Etária Pediátrica',
      body_html: `
<h3>A Idade como a Bússola Etiológica da Pneumonia</h3>
<p>O isolamento microbiológico do patógeno causador da PAC na criança é um dos maiores desafios da infectologia pediátrica. Como a coleta de escarro é inviável na grande maioria dos menores de 7 a 8 anos e métodos invasivos (lavado broncoalveolar, punção pulmonar transtorácica) são reservados exclusivamente para pacientes graves em UTI, <strong>a idade da criança é o elemento isolado mais fidedigno para prever a etiologia microbiana provável</strong> e orientar a antibioticoterapia empírica imediata.</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Faixa Etária Pediátrica</th>
      <th>Agentes Etiológicos Mais Comuns (Ordem de Prevalência)</th>
      <th>Particularidades Fisiopatológicas e Clínicas</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Recém-Nascido<br>(0 a 28 dias de vida)</strong></td>
      <td>1. <strong>Streptococcus agalactiae</strong> (Streptococo do Grupo B - GBS);<br>
      2. <strong>Escherichia coli</strong> e outros bacilos Gram-negativos entéricos (<em>Klebsiella</em>);<br>
      3. <strong>Listeria monocytogenes</strong>;<br>
      4. <em>Staphylococcus aureus</em> e vírus respiratórios adquiridos na comunidade.</td>
      <td>Infecção congênita ou de transmissão vertical adquirida durante a passagem pelo canal de parto ou por aspiração de líquido amniótico infectado (corioamnionite). Frequentemente manifesta-se como sepse neonatal com envolvimento pulmonar primário (gemência, taquipneia, instabilidade térmica, apneias e hipoxemia precoce).</td>
    </tr>
    <tr>
      <td><strong>Lactentes de 1 a 3 meses<br>(30 a 90 dias)</strong></td>
      <td>1. <strong>Vírus Respiratórios</strong> (VSR, Rinovírus, Metapneumovírus);<br>
      2. <strong>Chlamydia trachomatis</strong> (Pneumonia Afebril do Lactente);<br>
      3. <strong>Streptococcus pneumoniae</strong> (início da colonização e suscetibilidade bacteriana);<br>
      4. <em>Bordetella pertussis</em> (Coqueluche);<br>
      5. <em>Staphylococcus aureus</em>.</td>
      <td>Faixa etária de transição crítica: coexistem patógenos de transmissão vertical do parto (<em>Chlamydia</em>), vírus respiratórios comunitários e os primeiros episódios de bactérias encapsuladas típicas. A diferenciação clínica da pneumonia afebril é mandatória.</td>
    </tr>
    <tr>
      <td><strong>Crianças de 2 meses a 5 anos<br>(Faixa Pré-Escolar)</strong></td>
      <td>1. <strong>Vírus Respiratórios isolados ou em coinfecção (50% a 70% dos casos globais):</strong> VSR, Rinovírus, Influenza A/B, Parainfluenza, Adenovírus;<br>
      2. <strong>Streptococcus pneumoniae (Pneumococo):</strong> O agente <strong>bacteriano típico mais comum em todas as idades pediátricas</strong> além do período neonatal;<br>
      3. <strong>Haemophilus influenzae</strong> não tipável (ou Hib em crianças desvacinadas);<br>
      4. <strong>Staphylococcus aureus:</strong> Menos comum (&lt; 5%), porém altamente virulento e associado a complicações graves (pneumonia necrotizante, pneumatocele, empiema).</td>
      <td>Nesta faixa etária, a etiologia viral pura ou viral-bacteriana mista é extraordinariamente frequente. A decisão de tratar com antibiótico baseia-se na presença de sinais clínicos de pneumonia bacteriana provável segundo o AIDPI.</td>
    </tr>
    <tr>
      <td><strong>Maiores de 5 anos e Escolares<br>(5 a 19 anos)</strong></td>
      <td>1. <strong>Streptococcus pneumoniae</strong> (continua sendo o principal agente bacteriano de pneumonias consolidadas lobares clássicas);<br>
      2. <strong>Bactérias Atípicas:</strong><br>
      • <strong>Mycoplasma pneumoniae</strong> (pico epidemiológico dos 5 aos 15 anos);<br>
      • <strong>Chlamydia pneumoniae</strong>;<br>
      3. Vírus respiratórios (Influenza, Adenovírus).</td>
      <td>A emergência das bactérias atípicas intracelulares é a grande marca dos escolares e adolescentes. O <em>Mycoplasma</em> caracteriza-se pela tosse seca irritativa prolongada associada a sintomas constitucionais e manifestações extrapulmonares.</td>
    </tr>
  </tbody>
</table>
`
    },
    {
      id: 'pneumonia-afebril-lactente-chlamydia',
      title: '3. Pneumonia Afebril do Lactente por Chlamydia trachomatis',
      body_html: `
<h3>O Protótipo da Síndrome Infecciosa Subaguda do Lactente Jovem</h3>
<p>A Pneumonia Afebril do Lactente é uma afecção respiratória infecciosa clássica, altamente prevalente em serviços de puericultura e pediatria ambulatorial, cobrada com frequência nos concursos médicos. Seu agente etiológico primordial é a <strong>Chlamydia trachomatis</strong> (sorotipos D a K):</p>

<h3>Mecanismo de Transmissão e Período de Incubação</h3>
<ul>
  <li><strong>Transmissão Vertical Perinatal:</strong> Ocorre durante a passagem do feto pelo canal de parto de mães colonizadas com cervicite ou infecção genital por <em>C. trachomatis</em> não tratada no pré-natal (o parto cesáreo com bolsa íntegra é altamente protetor);</li>
  <li><strong>Acometimento Bimodal Típico:</strong>
    <ol>
      <li><strong>Conjuntivite Neonatal de Inclusão:</strong> Surge tipicamente entre a <strong>1ª e a 3ª semana de vida (5 a 14 dias de vida)</strong>, caracterizada por hiperemia conjuntival bilateral, quemose e secreção ocular mucopurulenta profusa. Cerca de 30% a 50% dos recém-nascidos expostos desenvolvem conjuntivite;</li>
      <li><strong>Pneumonia Afebril:</strong> Surge mais tardiamente, entre a <strong>4ª e a 12ª semana de vida (1 a 3 meses de idade)</strong>, decorrente da aspiração retrógrada ou inoculação direta de secreções nasofaríngeas colonizadas durante o parto. Cerca de 10% a 20% dos lactentes expostos desenvolvem a afecção pulmonar;</li>
      <li><em>História prévia:</em> Em até 50% dos casos de pneumonia por <em>Chlamydia</em>, há relato materno explícito de história de conjuntivite neonatal tratada apenas com colírios tópicos no primeiro mês de vida!</li>
    </ol>
  </li>
</ul>

<h3>A Tétrade Clínica Clássica da Pneumonia por Chlamydia trachomatis</h3>
<p>O quadro clínico instala-se de forma lenta, insidiosa e subaguda ao longo de dias ou semanas. A presença dos seguintes quatro pilares é patognomônica em questões de prova:</p>
<ol>
  <li><strong>Tosse Paroxística em "Staccato":</strong> A criança apresenta acessos de tosse seca, entrecortada, rítmica e entremeada por pausas respiratórias ("tosse metralhadora"), frequentemente acompanhada de engasgos ou vômitos pós-tosse, <em>porém sem o guincho inspiratório clássico da coqueluche</em>;</li>
  <li><strong>Ausência Completa de Febre (Quadro Rigorosamente Afebril):</strong> O lactente permanece ativo, com excelente estado geral ("criança bem-disposta que tosse muito"), sem toxicidade e sem febre aferida ou relatada;</li>
  <li><strong>Taquipneia com Ausculta Pulmonar Rica:</strong> Presença de aumento da frequência respiratória com <strong>estertores crepitantes finos bilaterais difusos</strong> à ausculta pulmonar. Os sibilos são tipicamente raros ou ausentes;</li>
  <li><strong>Excelente Estado Nutricional Inicial:</strong> A despeito da tosse contínua, o ganho de peso inicial é habitualmente preservado nos primeiros dias de doença.</li>
</ol>

<h3>Achados Laboratoriais e Radiológicos Típicos</h3>
<table class="book-table">
  <thead>
    <tr>
      <th>Exame Complementar</th>
      <th>Alterações Clássicas Encontradas</th>
      <th>Significado e Diagnóstico Diferencial</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Hemograma Completo</strong></td>
      <td><strong>Eosinofilia Periférica Marcante:</strong> Contagem absoluta de eosinófilos &ge; 400 a 500/mm³ (frequentemente &gt; 1.000/mm³ ou &gt; 5% a 10% do total leucocitário), associada a leucocitose discreta ou normal.</td>
      <td>A eosinofilia periférica no primeiro trimestre de vida associada à tosse sem febre é um marcador clínico altamente sugestivo de infecção por <em>C. trachomatis</em>.</td>
    </tr>
    <tr>
      <td><strong>Radiografia de Tórax (AP e Perfil)</strong></td>
      <td><strong>Infiltrado Intersticial Reticular Difuso Bilateral</strong> associado a <strong>sinais de hiperinsuflação pulmonar difusa</strong> (retificação diafragmática, aumento dos espaços intercostais) e áreas esparsas de atelectasias laminares subsegmentares.</td>
      <td>O infiltrado intersticial bilateral exuberante contrasta fortemente com o estado geral bom e afebril do lactente ("dissociação clínico-radiológica").</td>
    </tr>
    <tr>
      <td><strong>Exames Específicos de Confirmação</strong></td>
      <td>Pesquisa de DNA de <em>C. trachomatis</em> por Teste de Amplificação de Ácidos Nucleicos (<strong>NAAT / PCR</strong>) em secreção nasofaríngea ou ocular (método padrão-ouro de escolha).</td>
      <td>A sorologia por microimunofluorescência (títulos elevados de IgM específica &gt; 1:32) é diagnóstica, mas raramente disponível na urgência.</td>
    </tr>
  </tbody>
</table>

<h3>Esquema Terapêutico de Escolha e Risco de Estenose Hipertrófica do Piloro</h3>
<p>O tratamento de escolha é a antibioticoterapia sistêmica por via oral com <strong>macrolídeos</strong> para erradicar o reservatório nasofaríngeo e traqueobrônquico:</p>
<ul>
  <li><strong>Azitromicina Oral:</strong> Dose de <strong>10 mg/kg/dia administrada em tomada única diária por 5 dias consecutivos</strong>;</li>
  <li><strong>Claritromicina Oral:</strong> Dose de 15 mg/kg/dia dividida em duas tomadas diárias (de 12/12h) por 10 a 14 dias;</li>
  <li><strong>Eritromicina Oral (Regime Histórico):</strong> 50 mg/kg/dia dividida de 6/6h por 14 dias. <em>Atenção para Provas:</em> O uso de eritromicina (e em menor grau outros macrolídeos) em lactentes menores de 6 semanas de vida associa-se ao risco potencial de <strong>Estenose Hipertrófica de Piloro (EHP)</strong>, demandando vigilância para vômitos em jato não biliosos após o término do tratamento;</li>
  <li><strong>Conduta Obrigatória com os Pais:</strong> O diagnóstico de clamídia no lactente denuncia infecção genital materna não tratada. É <strong>mandatório convocar a mãe e seu parceiro sexual para avaliação e tratamento simultâneo</strong> (Doxiciclina ou Azitromicina), prevenindo doença inflamatória pélvica, infertilidade futura e reinfecção.</li>
</ul>
`
    },
    {
      id: 'pneumonia-atipica-mycoplasma-chlamydophila',
      title: '4. Pneumonias Atípicas em Escolares: Mycoplasma pneumoniae e Manifestações Extrapulmonares',
      body_html: `
<h3>O Conceito Clínico de "Pneumonia Atípica"</h3>
<p>O termo "pneumonia atípica" foi originalmente cunhado para descrever quadros de infecção pulmonar que diferiam da pneumonia bacteriana pneumocócica clássica em três aspectos fundamentais:</p>
<ol>
  <li>Início clínico mais lento, gradual e arrastado (subagudo);</li>
  <li>Ausência de consolidação lobar homogênea e ausência de resposta terapêutica aos antibióticos betalactâmicos convencionais (penicilinas e cefalosporinas) — uma vez que os agentes atípicos <strong>não possuem parede celular de peptideoglicano (como o <em>Mycoplasma</em>)</strong> ou são parasitas intracelulares obrigatórios (como as <em>Chlamydias</em>);</li>
  <li>Presença frequente de manifestações sistêmicas extrapulmonares associadas.</li>
</ol>

<h3>Mycoplasma pneumoniae: O Líder dos Escolares e Adolescentes</h3>
<p>O <em>Mycoplasma pneumoniae</em> é a bactéria de vida livre de menor tamanho conhecida pela ciência. É desprovido de parede celular rígida (envolto apenas por uma membrana de camada tripla rica em colesterol), o que confere <strong>resistência biológica intrínseca natural a todos os antibióticos betalactâmicos</strong> (penicilinas, amoxicilina, cefalosporinas, carbapenêmicos). Sua aderência ao epitélio respiratório é mediada pela adesina P1, paralisando os cílios e produzindo a exotoxina CARDS (<em>Community-Acquired Respiratory Distress Syndrome toxin</em>), que induz inflamação e vacuolização celular.</p>

<p><strong>Quadro Clínico Respiratório do Mycoplasma:</strong></p>
<ul>
  <li><strong>Faixa Etária de Pico:</strong> Crianças <strong>maiores de 5 anos de idade, escolares e adolescentes</strong> (com surtos frequentes em escolas, colégios internos e aglomerados urbanos a cada 3 a 7 anos);</li>
  <li><strong>Início Gradual e Pródromo Constitucional:</strong> Cefaleia frontal ou holocraniana intensa, astenia, mialgia difusa, dor de garganta (faringite sem exsudato) e febre baixa a moderada por 3 a 5 dias;</li>
  <li><strong>A Tosse Seca Intratável:</strong> Surge progressivamente uma <strong>tosse seca, irritativa, espasmódica e extenuante</strong>, que frequentemente impede o sono e piora ao longo de 2 a 3 semanas ("pneumonia que anda" ou <em>walking pneumonia</em>, pois o paciente mantém atividades habituais apesar da tosse intensa);</li>
  <li><strong>Dissociação Clínico-Radiológica Marcante:</strong> À ausculta pulmonar, o murmúrio pode estar apenas discretamente diminuído com estertores finos esparsos ou discretos sibilos; contudo, a radiografia de tórax revela <strong>infiltrados reticulares bilaterais ou broncopneumônicos extensos e exuberantes</strong>, muito mais graves do que o exame físico aparentava.</li>
</ul>

<h3>Manifestações Extrapulmonares do Mycoplasma (O Que as Bancas Adoram Cobrar)</h3>
<p>A infecção por <em>M. pneumoniae</em> deflagra respostas autoimunes secundárias mediadas por mimetismo molecular e formação de imunocomplexos circulantes, gerando alterações em múltiplos órgãos:</p>
<table class="book-table">
  <thead>
    <tr>
      <th>Sistema Acometido</th>
      <th>Manifestação Clínica Específica</th>
      <th>Mecanismo Fisiopatológico</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Hematológico</strong></td>
      <td><strong>Anemia Hemolítica Autoimune por Crioaglutininas (IgM):</strong><br>Palidez, icterícia e colúria. Teste de Coombs direto positivo para fração C3 do complemento.</td>
      <td>Produção transitória de anticorpos da classe IgM policlonais contra o <strong>antígeno eritrocitário I</strong> da membrana das hemácias, que aglutinam os glóbulos vermelhos em temperaturas inferiores a 37°C. Ocorre em até 50% dos infectados.</td>
    </tr>
    <tr>
      <td><strong>Dermatológico</strong></td>
      <td>• <strong>Eritema Multiforme Maior / Síndrome de Stevens-Johnson</strong>;<br>
      • <strong>MIRM (Mycoplasma-Induced Rash and Mucositis):</strong> Mucosite grave oral e ocular isolada com poucas ou nenhuma lesão cutânea periférica;<br>
      • Exantemas urticariformes e eritema nodoso.</td>
      <td>Deposição tecidual de imunocomplexos e hipersensibilidade mediada por linfócitos T aos antígenos microbianos.</td>
    </tr>
    <tr>
      <td><strong>Neurológico</strong></td>
      <td>• <strong>Encefalite aguda e meningite asséptica</strong>;<br>
      • Síndrome de Guillain-Barré;<br>
      • Ataxia cerebelar aguda e mielite transversa.</td>
      <td>Reatividade cruzada autoimune de anticorpos antigangliosídeos induzida pelo mimetismo dos glicolipídios do <em>Mycoplasma</em>.</td>
    </tr>
    <tr>
      <td><strong>Cardíaco e Articular</strong></td>
      <td>• Pericardite e miocardite aguda;<br>
      • Artralgias migratórias e artrite asséptica de grandes articulações.</td>
      <td>Inflamação mediada por citocinas e anticorpos circulantes.</td>
    </tr>
  </tbody>
</table>

<h3>Tratamento das Pneumonias Atípicas</h3>
<p>Como os agentes atípicos não possuem parede celular de peptideoglicano, os betalactâmicos são ineficazes. O tratamento de escolha fundamenta-se em antibióticos que inibem a síntese proteica ribossômica bacteriana:</p>
<ul>
  <li><strong>Macrolídeos (Primeira Escolha):</strong>
    <ul>
      <li><strong>Azitromicina Oral:</strong> 10 mg/kg/dia (máx. 500 mg) no 1º dia, seguido por 5 mg/kg/dia (máx. 250 mg) do 2º ao 5º dia (total de 5 dias); OU 10 mg/kg/dia 1x/dia por 5 dias consecutivos;</li>
      <li><strong>Claritromicina Oral:</strong> 15 mg/kg/dia dividida em 2 doses de 12/12h por 7 a 10 dias;</li>
    </ul>
  </li>
  <li><strong>Alternativa para Maiores de 8 Anos com Suspeita de Resistência a Macrolídeos:</strong>
    <ul>
      <li><strong>Doxiciclina Oral:</strong> 2 a 4 mg/kg/dia dividida em 2 tomadas por 7 a 10 dias (excelente eficácia contra cepas resistentes de <em>Mycoplasma</em>).</li>
    </ul>
  </li>
</ul>
`
    },
    {
      id: 'diagnostico-clinico-protocolo-aidpi-oms',
      title: '5. Diagnóstico Clínico segundo o Protocolo AIDPI da OMS / Ministério da Saúde',
      body_html: `
<h3>A Estratégia AIDPI (Atenção Integrada às Doenças Prevalentes na Infância)</h3>
<p>Nos países em desenvolvimento, a escassez de aparelhos de radiografia e de laboratórios em unidades de Atenção Primária à Saúde levou a Organização Mundial da Saúde (OMS) e o Ministério da Saúde do Brasil a desenvolverem a estratégia <strong>AIDPI (Atenção Integrada às Doenças Prevalentes na Infância)</strong>. O protocolo AIDPI baseia-se em <strong>regras semiológicas clínicas simples, altamente sensíveis, reprodutíveis e de baixo custo</strong>, capazes de serem aplicadas por qualquer profissional de saúde na triagem imediata de crianças com tosse ou dificuldade respiratória.</p>

<h3>A Taquipneia: O Sinal Semiológico Isolado Mais Precoce e Sensível</h3>
<div class="book-alert">
<p><strong>A REGRA DE OURO DO AIDPI / ENAMED:</strong><br>
A <strong>TAQUIPNEIA</strong> (respiração rápida) é o <strong>sinal clínico isolado mais sensível e precoce para o diagnóstico de pneumonia na infância</strong>. Na ausência de taquipneia, o diagnóstico de pneumonia torna-se altamente improvável (alto valor preditivo negativo!).</p>
</div>

<h3>Técnica Correta de Aferição da Frequência Respiratória</h3>
<p>Para que a frequência respiratória seja clinicamente válida e não sofra viés do examinador, o profissional deve seguir estritamente o protocolo técnico do Ministério da Saúde:</p>
<ol>
  <li>A criança deve estar <strong>rigorosamente calma, tranquila, preferencialmente dormindo ou em repouso no colo da mãe</strong>. Se a criança estiver chorando copiosamente, agitada ou acabou de mamar, a frequência respiratória estará fisiologicamente acelerada (falso-positivo!);</li>
  <li>O tórax e o abdome da criança devem estar despidos para visualização direta dos movimentos respiratórios;</li>
  <li><strong>O examinador deve contar os movimentos respiratórios durante UM MINUTO COMPLETO (60 SEGUNDOS) no relógio</strong>. É formalmente proibido contar por 15 segundos e multiplicar por 4, devido à respiração periódica e irregular fisiológica dos lactentes jovens;</li>
  <li>Se a criança apresentar febre alta no momento do exame (&gt; 38,5°C), deve-se administrar um antitérmico, aguardar 30 a 40 minutos para a defervescência térmica e recontar a frequência respiratória (a febre isolada eleva a FR em cerca de 5 a 7 irpm para cada 1°C de aumento de temperatura!).</li>
</ol>

<h3>Os Quatro Pontos de Corte Oficiais da Frequência Respiratória (AIDPI / OMS)</h3>
<p>Esta tabela é uma das mais consagradas e repetidas em todas as provas de residência médica e concursos públicos do Brasil:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Faixa Etária da Criança</th>
      <th>Limite Superior Normal</th>
      <th>Ponto de Corte que Define TAQUIPNEIA (Pneumonia pelo AIDPI)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Menor de 2 meses de vida<br>(0 a 59 dias)</strong></td>
      <td>Até 59 incursões por minuto</td>
      <td><strong>FR &ge; 60 irpm (incursões respiratórias por minuto)</strong></td>
    </tr>
    <tr>
      <td><strong>Lactentes de 2 a 11 meses de vida</strong></td>
      <td>Até 49 incursões por minuto</td>
      <td><strong>FR &ge; 50 irpm</strong></td>
    </tr>
    <tr>
      <td><strong>Crianças de 1 a 4 anos de vida<br>(12 a 59 meses)</strong></td>
      <td>Até 39 incursões por minuto</td>
      <td><strong>FR &ge; 40 irpm</strong></td>
    </tr>
    <tr>
      <td><strong>Crianças com 5 anos ou mais<br>(&ge; 60 meses e escolares)</strong></td>
      <td>Até 19 a 29 incursões por minuto</td>
      <td><strong>FR &ge; 20 a 30 irpm</strong><br>(SBP preconiza corte &ge; 20-25 irpm em adolescentes)</td>
    </tr>
  </tbody>
</table>

<h3>A Semiologia Respiratória Além da Taquipneia</h3>
<p>Enquanto a taquipneia é o sinal de maior sensibilidade, outros achados semiológicos no tórax agregam especificidade:</p>
<ul>
  <li><strong>Tiragem Subcostal (Retração Subcostal):</strong> Afundamento nítido e permanente da parede torácica inferior/rebordo costal durante a inspiração. É o marcador semiológico definidor de <strong>gravidade no AIDPI</strong> (indica complacência pulmonar marcadamente reduzida e alto trabalho elástico);</li>
  <li><strong>Batimento de Asa de Nariz (BAN):</strong> Dilatação ativa das narinas durante a inspiração, indicando esforço ventilatório moderado a grave;</li>
  <li><strong>Gemência Expiratória:</strong> Ruído emitido pela expiração forçada contra as cordas vocais parcialmente fechadas (manobra biológica reflexa para criar PEEP e prevenir o colapso alveolar expiratório na pneumonia alveolar extensa);</li>
  <li><strong>Ausculta Pulmonar:</strong> Estertores crepitantes finos e localizados (sopros tubários e broncofonia aumentada na área da condensação) ou áreas focais de redução do murmúrio vesicular.</li>
</ul>
`
    },
    {
      id: 'estratificacao-gravidade-aidpi-sbp',
      title: '6. Estratificação de Gravidade segundo AIDPI e Sociedade Brasileira de Pediatria',
      body_html: `
<h3>Os Três Degraus de Gravidade do AIDPI / Ministério da Saúde</h3>
<p>O protocolo AIDPI classifica as crianças com tosse ou dificuldade respiratória em três categorias operacionais de tomada de decisão terapêutica imediata:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Classificação AIDPI</th>
      <th>Critérios Clínicos e Sinais Semiológicos</th>
      <th>Conduta Terapêutica e Destino do Paciente</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>1. PNEUMONIA<br>(Pneumonia Leve / Não Grave)</strong></td>
      <td>• Presença de <strong>TAQUIPNEIA</strong> para a faixa etária;<br>• <strong>SEM tiragem subcostal</strong>;<br>• <strong>SEM sinais gerais de perigo</strong>.</td>
      <td><strong>Tratamento Ambulatorial no Domicílio:</strong><br>
      • Iniciar <strong>Amoxicilina oral na dose de 50 mg/kg/dia (ou 80-90 mg/kg/dia)</strong> dividida em 2 doses diárias (de 12/12h) por <strong>5 a 7 dias</strong>;<br>
      • Orientar ingestão abundante de líquidos e lavagem nasal;<br>
      • <strong>Reavaliação médica ambulatorial OBRIGATÓRIA em 48 a 72 horas</strong> (ou retorno imediato se piora).</td>
    </tr>
    <tr>
      <td><strong>2. PNEUMONIA GRAVE</strong></td>
      <td>• Presença de taquipneia associada a <strong>TIRAGEM SUBCOSTAL</strong> (afundamento da parede torácica inferior na inspiração);<br>• OU presença de <strong>batimento de asa de nariz (BAN)</strong> ou gemência intermitente;<br>• <strong>SEM sinais gerais de perigo</strong>.</td>
      <td><strong>Indicação Formal de INTERNAÇÃO HOSPITALAR:</strong><br>
      • Não tratar em casa!<br>
      • Primeira dose de antibiótico no local (se transferência necessária);<br>
      • Iniciar <strong>Ampicilina venosa (150 a 200 mg/kg/dia) dividida de 6/6 horas</strong> OU Penicilina Cristalina IV (200.000 UI/kg/dia);<br>
      • Suporte de oxigenoterapia se SpO2 &lt; 92%.</td>
    </tr>
    <tr>
      <td><strong>3. PNEUMONIA MUITO GRAVE<br>(ou Doença Muito Grave)</strong></td>
      <td>• Presença de taquipneia ou esforço associada a pelo menos <strong>UM SINAL GERAL DE PERIGO</strong>:<br>
      1. Incapacidade de beber líquidos ou sugar o seio materno;<br>
      2. Vômitos incoercíveis (vomita tudo o que ingere);<br>
      3. Convulsões ativas ou recentes na vigência da doença;<br>
      4. Letargia, sonolência anormal ou inconsciência/coma;<br>
      5. Estridor em repouso;<br>
      6. Desnutrição grave associada;<br>
      7. <strong>Cianose central ou SpO2 &lt; 90-92% em ar ambiente</strong>.</td>
      <td><strong>INTERNAÇÃO HOSPITALAR DE EMERGÊNCIA / UTI PEDIÁTRICA:</strong><br>
      • Estabilização imediata da via aérea e oxigenoterapia contínua;<br>
      • Acesso venoso imediato para hidratação fracionada;<br>
      • <strong>Antibioticoterapia parenteral de amplo espectro:</strong><br>
      - Lactente jovem &lt; 2 meses: <strong>Ampicilina IV + Gentamicina IV</strong> (ou Cefotaxima);<br>
      - &gt; 2 meses com choque ou toxemia grave: <strong>Ceftriaxona IV (100 mg/kg/dia) associada a Oxacilina IV (150-200 mg/kg/dia)</strong> (para cobrir pneumococo resistente e <em>S. aureus</em>).</td>
    </tr>
  </tbody>
</table>

<h3>Atenção Especial ao Lactente Menor de 2 Meses</h3>
<p>No protocolo AIDPI, <strong>todo lactente com menos de 2 meses de vida que apresenta tosse ou dificuldade respiratória com FR &ge; 60 irpm ou tiragem subcostal é automaticamente classificado como "DOENÇA GRAVE / SEPSE POSSÍVEL"</strong>, exigindo internação hospitalar imediata, coleta de exames sépticos (hemoculturas, líquor e urocultura) e início de ampicilina venosa associada a um aminoglicosídeo (gentamicina) parenteral!</p>
`
    },
    {
      id: 'exames-complementares-radiologia-laboratorio',
      title: '7. Avaliação Complementar: Radiografia de Tórax, Ultrassonografia e Biomarcadores',
      body_html: `
<h3>Indicações Formais da Radiografia de Tórax na Pneumonia Pediátrica</h3>
<p>Diferente da prática do adulto em que o raio-X é mandatório para todos, na pediatria a <em>Sociedade Brasileira de Pediatria</em> e a <em>British Thoracic Society (BTS)</em> determinam que:</p>
<div class="book-alert">
<p><strong>RECOMENDAÇÃO DE DIRETRIZ:</strong><br>
Crianças com quadro clínico ambulatorial clássico de pneumonia leve (taquipneia sem tiragem subcostal e sem sinais de perigo) <strong>NÃO NECESSITAM de radiografia de tórax de rotina</strong> para o início do tratamento com amoxicilina oral na Atenção Primária à Saúde!</p>
</div>

<p><strong>Quando a Radiografia de Tórax é Formalmente Obrigatória?</strong></p>
<ol>
  <li>Todas as crianças com critérios de <strong>Pneumonia Grave ou Muito Grave que necessitam de internação hospitalar</strong>;</li>
  <li>Pacientes com <strong>falha terapêutica ou persistência de febre alta após 48 a 72 horas</strong> de antibioticoterapia adequada (suspeita de derrame pleural, empiema ou abscesso);</li>
  <li>Dúvida diagnóstica substancial (ex.: diferenciação com aspiração de corpo estranho, insuficiência cardíaca congestiva, malformações congênitas da via aérea);</li>
  <li>Pneumonias recorrentes no mesmo lobo pulmonar (suspeita de sequestro pulmonar, malformação adenomatoide cística ou compressão brônquica por linfonodo).</li>
</ol>

<h3>Padrões Radiológicos Clássicos</h3>
<table class="book-table">
  <thead>
    <tr>
      <th>Padrão Radiológico</th>
      <th>Descrição Radiológica</th>
      <th>Agentes Etiológicos Típicos Associados</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Consolidação Lobar ou Segmentar com Broncograma Aéreo</strong></td>
      <td>Opacidade homogênea densa, delimitada por fissuras anatômicas, contendo lumens brônquicos preenchidos por ar contrastando com os alvéolos exsudativos radiopacos (broncograma aéreo).</td>
      <td><strong>Streptococcus pneumoniae (Pneumococo):</strong> O protótipo absoluto da pneumonia lobar típica clássica. Pode também ocorrer por <em>Klebsiella</em> e <em>Haemophilus</em>.</td>
    </tr>
    <tr>
      <td><strong>Broncopneumonia Multifocal</strong></td>
      <td>Opacidades algodonosas esparsas, multifocais, bilaterais e assimétricas, com margens mal definidas acometendo múltiplos lóbulos.</td>
      <td><strong>Staphylococcus aureus</strong>, <em>Streptococcus pyogenes</em>, bactérias Gram-negativas e coinfecções bacterianas.</td>
    </tr>
    <tr>
      <td><strong>Infiltrado Intersticial Reticular e Peribroncovascular</strong></td>
      <td>Espessamento dos septos interlobulares e peribrônquicos com infiltrado reticulonodular difuso bilateral, sem broncograma aéreo franco.</td>
      <td><strong>Vírus Respiratórios</strong> (VSR, Rinovírus, Influenza), <strong>Mycoplasma pneumoniae</strong> e <strong>Chlamydia trachomatis</strong>.</td>
    </tr>
    <tr>
      <td><strong>Pneumatocele e Cavitações</strong></td>
      <td>Espaços aéreos císticos de paredes finas intraparênquimatosos formados por necrose alveolar e aprisionamento de ar em válvula.</td>
      <td><strong>Pneumonia Estafilocócica (<em>S. aureus</em>)</strong> e <em>S. pneumoniae</em> sorotipo 3 ou 19A.</td>
    </tr>
  </tbody>
</table>

<h3>O Papel Moderno da Ultrassonografia de Tórax (Point-of-Care Ultrasound - POCUS)</h3>
<p>A ultrassonografia pulmonar pediátrica consolidou-se como um método diagnóstico de altíssima acurácia, superando a radiografia simples na detecção de consolidações subpleurais milimétricas e, especialmente, na <strong>avaliação de derrames pleurais</strong>: diferencia com facilidade fluido anecoico livre de coleções septadas espessas com fibrina, orientando o local exato da toracocentese e drenagem torácica com radiação ionizante zero.</p>

<h3>Exames Laboratoriais no Paciente Hospitalizado</h3>
<ul>
  <li><strong>Hemograma Completo:</strong> Na pneumonia bacteriana pneumocócica, observa-se habitualmente leucocitose expressiva (&gt; 15.000 a 20.000 leucócitos/mm³) com predomínio de neutrófilos e desvio escalonado à esquerda (presença de bastonetes &gt; 5% a 10%);</li>
  <li><strong>Proteína C Reativa (PCR) e Procalcitonina (PCT):</strong> Biomarcadores de fase aguda. A Procalcitonina &gt; 1 a 2 ng/mL possui alta especificidade para infecção bacteriana invasiva grave e pneumonia bacteriana verdadeira, auxiliando na decisão de início e desmame de antibióticos em UTI;</li>
  <li><strong>Hemoculturas (Dois Pares em Sítios Distintos):</strong> Devem ser coletadas obrigatoriamente antes do início do antibiótico em todos os pacientes hospitalizados com pneumonia grave. Embora sua positividade na PAC pediátrica gire em torno de 5% a 10% a 15% (bacteremia pneumocócica é frequentemente transitória), quando positiva confirma o agente e o perfil de sensibilidade aos antimicrobianos.</li>
</ul>
`
    },
    {
      id: 'tratamento-antimicrobiano-ambulatorial-hospitalar',
      title: '8. Manejo Terapêutico e Antibioticoterapia Ambulatorial e Hospitalar',
      body_html: `
<h3>Princípios Gerais do Tratamento da PAC Pediátrica</h3>
<p>O pilar fundamental da terapia da PAC é a administração precoce do antimicrobiano adequado na dose e duração corretas, associado a medidas essenciais de suporte (oxigenoterapia, controle térmico, hidratação e analgesia torácica).</p>

<h3>1. Tratamento Ambulatorial da Pneumonia (Sem Gravidade)</h3>
<p>Indicado para crianças com taquipneia isolada, sem tiragem subcostal, sem sinais gerais de perigo e com boa tolerância à via oral:</p>
<ul>
  <li><strong>Antimicrobiano de Primeira Escolha Oficial:</strong> <strong>Amoxicilina oral</strong>:
    <ul>
      <li><strong>Dose Convencional:</strong> <strong>50 mg/kg/dia</strong> dividida em 2 doses (de 12/12h) ou 3 doses (de 8/8h) — recomendada pelo AIDPI/MS em regiões com baixas taxas de resistência pneumocócica;</li>
      <li><strong>Dose Alta (Preconizada pela SBP e AAP em áreas de resistência):</strong> <strong>80 a 90 mg/kg/dia</strong> dividida em duas tomadas diárias (de 12/12h), para superar com segurança cepas de <em>Streptococcus pneumoniae</em> com sensibilidade intermediária por alteração de PBPs;</li>
    </ul>
  </li>
  <li><strong>Duração do Tratamento Ambulatorial:</strong> Ensaios clínicos randomizados recentes (como o estudo CAP-IT e SAFER) comprovaram que esquemas curtos de <strong>5 DIAS COMPLETOS</strong> de amoxicilina oral possuem eficácia clínica e microbiológica rigorosamente idêntica a esquemas tradicionais de 7 a 10 dias em pneumonias leves, com menos efeitos adversos gastrointestinais e menor seleção de resistência bacteriana;</li>
  <li><strong>Alternativa para Alérgicos à Penicilina:</strong>
    <ul>
      <li>Alergia não grave (exantema tardio sem anafilaxia): Cefuroxima axetil oral (30 mg/kg/dia) ou Cefprozil;</li>
      <li>Alergia anafilática tipo I (IgE-mediada): <strong>Azitromicina oral</strong> (10 mg/kg/dia no 1º dia, seguido por 5 mg/kg/dia por mais 4 dias) ou Claritromicina (15 mg/kg/dia dividida 12/12h por 7 a 10 dias);</li>
    </ul>
  </li>
  <li><strong>A Regra da Reavaliação Obrigatória em 48 a 72 Horas:</strong> Toda criança tratada em domicílio deve retornar obrigatoriamente para reavaliação médica presencial após 48 a 72 horas. Se houver desaparecimento da febre e normalização da frequência respiratória, completa-se o ciclo; se houver persistência da febre, surgimento de tiragem subcostal ou prostração, a criança deve ser imediatamente transferida para internação hospitalar.</li>
</ul>

<h3>2. Tratamento Hospitalar da Pneumonia Grave</h3>
<p>Indicado para crianças admitidas por presença de tiragem subcostal, batimento de asa nasal ou saturação &lt; 92%:</p>
<table class="book-table">
  <thead>
    <tr>
      <th>Linha Terapêutica</th>
      <th>Antimicrobiano Parenteral e Posologia</th>
      <th>Indicação Clínica e Observações</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Primeira Escolha Hospitalar Padrão</strong></td>
      <td><strong>Ampicilina venosa: 150 a 200 mg/kg/dia</strong> dividida em 4 doses (de 6/6 horas) IV;<br>
      OU <strong>Penicilina G Cristalina venosa: 150.000 a 200.000 UI/kg/dia</strong> dividida em 4 a 6 doses (de 4/4h ou 6/6h) IV.</td>
      <td>Esquema padrão-ouro da SBP e OMS para crianças vacinadas contra Hib. Excelente penetração pulmonar e cobertura bactericida bacteriana contra <em>Streptococcus pneumoniae</em>. A via venosa é mantida até a criança ficar afebril por 24 a 48 horas e sem esforço respiratório, momento em que se realiza a transição segura para <strong>Amoxicilina oral</strong> para completar 7 a 10 dias totais.</td>
    </tr>
    <tr>
      <td><strong>Alternativa / Segunda Escolha Parenteral</strong></td>
      <td><strong>Ceftriaxona venosa: 50 a 100 mg/kg/dia</strong> IV em dose única diária ou dividida de 12/12h;<br>
      OU <strong>Cefotaxima IV: 150 mg/kg/dia</strong> de 6/6h ou 8/8h.</td>
      <td>Indicada nos casos de: desvacinação para Hib, falha terapêutica documentada após 48-72h de ampicilina, pneumonia associada a derrame pleural purulento ou paciente admitido com sepse grave/choque séptico.</td>
    </tr>
    <tr>
      <td><strong>Pneumonia Muito Grave / Suspeita de <em>S. aureus</em></strong></td>
      <td><strong>Oxacilina venosa (150 a 200 mg/kg/dia de 6/6h) ASSOCIADA à Ceftriaxona IV (100 mg/kg/dia)</strong>.<br>
      Se suspeita de MRSA comunitário (CA-MRSA): substituir oxacilina por <strong>Vancomicina IV</strong> (40-60 mg/kg/dia) ou <strong>Clindamicina IV</strong> (40 mg/kg/dia).</td>
      <td>Indicada diante de: pneumonia com rápida progressão multifocal, pneumatoceles, pneumotórax espontâneo, empiema loculado espesso ou histórico de furunculose e abscesso cutâneo prévio na criança ou familiares. A clindamicina possui a vantagem adicional de inibir a síntese da toxina leucocidina de Panton-Valentine (PVL).</td>
    </tr>
  </tbody>
</table>
`
    },
    {
      id: 'complicacoes-pleuropulmonares-derrame-empiema',
      title: '9. Complicações Pleuropulmonares: Derrame Parapneumônico e Empiema Pleural',
      body_html: `
<h3>O Alerta da Falha Terapêutica: A Febre que Persiste após 48 a 72 Horas</h3>
<p>A complicação supurativa mais comum da pneumonia adquirida na comunidade na infância é o <strong>Derrame Parapneumônico</strong>, que ocorre em até 20% a 40% das crianças hospitalizadas com PAC bacteriana. O cenário clínico típico nas provas de residência médica é clássico e inconfundível:</p>
<div class="book-alert">
<p><strong>CENÁRIO CLÁSSICO DE PROVA:</strong><br>
Criança internada com pneumonia em uso de ampicilina ou penicilina venosa adequada que, <strong>após 48 a 72 horas de tratamento correto, mantém febre alta diária contínua, piora do desconforto respiratório ou apresenta assimetria na ausculta pulmonar</strong> (macicez à percussão e murmúrio vesicular abolido no hemitórax afetado). A suspeita obrigatória número um é <strong>DERRAME PLEURAL PARAPNEUMÔNICO / EMPIEMA PLEURAL</strong>!</p>
</div>

<h3>Fases Evolutivas do Derrame Parapneumônico</h3>
<p>A invasão bacteriana do espaço pleural desencadeia uma sequência inflamatória progressiva dividida em três fases bem definidas:</p>
<ol>
  <li><strong>Fase Exsudativa (Derrame Parapneumônico Simples / Não Complicado):</strong> A inflamação do parênquima pulmonar adjacente aumenta a permeabilidade dos capilares da pleura visceral, acumulando líquido seroso estéril no espaço pleural. O pH é &gt; 7,20, a glicose é normal (&gt; 60 mg/dL), a DHL é baixa (&lt; 1.000 U/L) e a bacterioscopia/cultura é negativa. Responde frequentemente apenas ao antibiótico sistêmico;</li>
  <li><strong>Fase Fibrinopurulenta (Derrame Complicado e Empiema Inicial):</strong> Ocorre translocação bacteriana para o espaço pleural e influxo torrencial de neutrófilos ativados. Ocorre deposição progressiva de malhas espessas de fibrina nas superfícies pleurais parietal e visceral, formando <strong>septações, lojas e loculações líquidas fechadas</strong>. O metabolismo anaeróbio das bactérias e leucócitos consome a glicose e produz ácido láctico, gerando acidose pleural acentuada e lise celular com liberação maciça de DHL;</li>
  <li><strong>Fase de Organização (Fibrotórax / Paquipleuris):</strong> Proliferação de fibroblastos com formação de uma membrana fibrosa inelástica espessa (carapaça pleural) que aprisiona o pulmão ("pulmão encarcerado"), restringindo de forma irreversível a expansão ventilatória se não houver intervenção cirúrgica.</li>
</ol>

<h3>Diagnóstico e Critérios Bioquímicos do Líquido Pleural</h3>
<p>Todo derrame pleural significativo (espessura &gt; 10 mm na radiografia em decúbito lateral com raios horizontais - incidência de Hjelm-Laurell, ou visível na ultrassonografia de tórax) deve ser submetido à <strong>toracocentese diagnóstica imediata</strong> para análise citológica, bioquímica e microbiológica:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Parâmetro do Líquido Pleural</th>
      <th>Derrame Parapneumônico Não Complicado</th>
      <th>Empiema Pleural / Derrame Parapneumônico Complicado</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Aspecto Macroscópico</strong></td>
      <td>Límpido, citrino ou levemente turvo</td>
      <td><strong>Francamente purulento ("pus espesso")</strong> ou turvo leitoso</td>
    </tr>
    <tr>
      <td><strong>pH do Líquido Pleural</strong></td>
      <td><strong>&gt; 7,20</strong></td>
      <td><strong>&lt; 7,20 (Marcador de extrema acurácia de acidose!)</strong></td>
    </tr>
    <tr>
      <td><strong>Glicose Pleural</strong></td>
      <td><strong>&gt; 60 mg/dL</strong> (ou &gt; 50% da glicemia)</td>
      <td><strong>&lt; 40 mg/dL</strong> (consumo bacteriano e neutrofílico maciço)</td>
    </tr>
    <tr>
      <td><strong>Desidrogenase Láctica (DHL)</strong></td>
      <td>&lt; 1.000 U/L</td>
      <td><strong>&gt; 1.000 U/L</strong> (destruição tecidual intensa)</td>
    </tr>
    <tr>
      <td><strong>Gram / Bacterioscopia e Cultura</strong></td>
      <td>Negativos (estéril)</td>
      <td><strong>Presença visível de bactérias no Gram ou Cultura Positiva</strong></td>
    </tr>
  </tbody>
</table>

<h3>Indicação e Conduta Terapêutica no Empiema Pediátrico</h3>
<p>A presença de <strong>aspecto purulento franco</strong>, ou <strong>pH &lt; 7,20</strong>, ou <strong>glicose &lt; 40 mg/dL</strong>, ou <strong>Gram/Cultura positivos</strong> define <strong>EMPIEMA PLEURAL</strong> e exige obrigatoriamente:</p>
<ol>
  <li><strong>Drenagem Torácica Tubular Fechada em Selo d'Água Imediata:</strong> Inserção de dreno torácico tubular calibroso posicionado no 5º ou 6º espaço intercostal entre a linha axilar média e anterior, conectado a sistema de frasco de selo d'água;</li>
  <li><strong>Otimização Antimicrobiana Parenteral:</strong> Cobertura venosa plena para <em>Streptococcus pneumoniae</em> e <em>Staphylococcus aureus</em>: <strong>Ceftriaxona IV associada a Oxacilina IV</strong> (ou Vancomicina se risco de MRSA) por pelo menos 14 a 21 dias totais;</li>
  <li><strong>Conduta no Derrame Loculado / Septado Complexo:</strong> Se a ultrassonografia demonstrar múltiplos septos espessos de fibrina impedindo a drenagem adequada pelo tubo:
    <ul>
      <li><strong>Videotoracoscopia Precoce (VATS - Video-Assisted Thoracoscopic Surgery):</strong> Método de escolha padrão em centros cirúrgicos pediátricos de referência, permitindo debridamento mecânico direto dos septos de fibrina, lise de aderências, aspiração do pus e posicionamento preciso do dreno sob visão óptica direta;</li>
      <li><strong>Instilação Intrapleural de Fibrinolíticos:</strong> Alternativa clínica não invasiva à cirurgia: instilação de <strong>Alteplase (r-tPA)</strong> ou Estreptoquinase através do dreno de tórax para lisar as traves de fibrina e desobstruir as loculações.</li>
    </ul>
  </li>
</ol>
`
    },
    {
      id: 'pneumonia-necrotizante-abscesso-estafilococo',
      title: '10. Pneumonia Necrotizante, Pneumatocele e Abscesso Pulmonar Estafilocócico',
      body_html: `
<h3>Pneumonia Necrotizante e Abscesso Pulmonar na Infância</h3>
<p>A necrose do parênquima pulmonar é uma complicação grave decorrente da liberação de toxinas citolíticas bacterianas que provocam trombose microvascular capilar alveolar e necrose isquêmica e liquefativa dos alvéolos e septos interlobulares:</p>
<ul>
  <li><strong>Agentes Etiológicos Clássicos:</strong>
    <ol>
      <li><strong>Staphylococcus aureus (Especialmente cepas produtoras de Leucocidina de Panton-Valentine - PVL):</strong> O <em>S. aureus</em> resistente à meticilina adquirido na comunidade (CA-MRSA) ou sensível (MSSA) carreador do gene da leucocidina PVL produz uma toxina formadora de poros que perfura a membrana dos neutrófilos, liberando enzimas proteolíticas maciças que dissolvem o parênquima pulmonar;</li>
      <li><strong>Streptococcus pneumoniae:</strong> Notadamente os sorotipos hipervirulentos <strong>sorotipo 3 e sorotipo 19A</strong>, frequentemente associados a pneumonia necrotizante com evolução para empiema em lactentes e pré-escolares previamente vacinados com VPC-10.</li>
    </ol>
  </li>
</ul>

<h3>Espectro Lesional Radiológico: Da Necrose à Pneumatocele e Pneumotórax</h3>
<table class="book-table">
  <thead>
    <tr>
      <th>Lesão Anatomorradiológica</th>
      <th>Características Tomográficas e Radiológicas</th>
      <th>Mecanismo e Manejo Específico</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Pneumonia Necrotizante</strong></td>
      <td>Áreas parenquimatosas heterogêneas com perda do realce ao meio de contraste na TC de tórax, com múltiplas pequenas cavitações radiotransparentes sem nível hidroaéreo inicial.</td>
      <td>Necrose de liquefação tecidual. Tratamento primariamente clínico com antibioticoterapia venosa prolongada (3 a 4 semanas). Evitar ressecções cirúrgicas agressivas na fase aguda (o pulmão da criança possui extraordinária capacidade de regeneração elástica espontânea a longo prazo!).</td>
    </tr>
    <tr>
      <td><strong>Pneumatocele</strong></td>
      <td>Espaços aéreos císticos intrapulmonares de <strong>paredes finas e regulares</strong>, contendo ar ou nível hidroaéreo mínimo, surgindo tipicamente durante a evolução de pneumonias estafilocócicas.</td>
      <td>Decorrem da necrose bronquiolar com mecanismo valvular que aprisiona ar nos tecidos peribronquiais. <strong>Conduta: EXPECTANTE! Não puncionar nem drenar pneumatoceles de rotina</strong> (risco de criar fístula broncopleural de alto débito). Regridem espontaneamente em semanas a meses.</td>
    </tr>
    <tr>
      <td><strong>Pneumotórax Espontâneo / Pio-Pneumotórax</strong></td>
      <td>Acúmulo súbito de ar livre no espaço pleural com colapso do parênquima pulmonar homolateral e desvio de estruturas do mediastino se hipertensivo.</td>
      <td>Ruptura de uma pneumatocele subpleural periférica para o interior da cavidade pleural. Constitui urgência cirúrgica com indicação imediata de <strong>drenagem torácica tubular em selo d'água</strong> e descompressão torácica de emergência com agulha no 2º espaço intercostal se sinais de pneumotórax hipertensivo.</td>
    </tr>
    <tr>
      <td><strong>Abscesso Pulmonar Verdadeiro</strong></td>
      <td>Cavidade parenquimatosa única ou confluente espessa com <strong>nível hidroaéreo nítido</strong> no seu interior, circundada por consolidação inflamatória.</td>
      <td>Geralmente decorre de aspiração maciça de secreções com flora mista anaeróbia em crianças com neuropatias crônicas ou refluxo grave. Exige antibioticoterapia com cobertura para anaeróbios (Ampicilina-Sulbactam ou Clindamicina IV) por 4 a 6 semanas.</td>
    </tr>
  </tbody>
</table>

<h3>Ajuste Antimicrobiano Específico na Suspeita de CA-MRSA com Toxina PVL</h3>
<p>Diante de uma criança com pneumonia necrotizante grave com rápida piora clínica e toxemia severa:</p>
<ul>
  <li>Associar imediatamente <strong>Clindamicina IV (40 mg/kg/dia)</strong> ao esquema antibiótico (a clindamicina atua na subunidade ribossômica 50S inibindo diretamente a síntese proteica ribossômica bacteriana e <strong>bloqueando a produção da toxina leucocidina de Panton-Valentine</strong>, com potente efeito antitoxina!);</li>
  <li>Se o perfil microbiológico local indicar alta prevalência de CA-MRSA resistente à clindamicina: utilizar <strong>Vancomicina IV</strong> (com monitorização da vancocinemia sérica de vale entre 15 e 20 mcg/mL) ou <strong>Linezolida IV</strong> (que também possui ação inibidora de toxinas ribossômicas).</li>
</ul>
`
    },
    {
      id: 'casos-clinicos-estruturados-pneumonia',
      title: '11. Casos Clínicos Estruturados com Discussão Diagnóstica e Decisões Críticas',
      body_html: `
<h3>Caso Clínico 1: O Reconhecimento da Pneumonia Não Grave pelo AIDPI na UBS</h3>
<p><strong>Identificação e Queixa:</strong> Menino de 18 meses de vida é levado pela mãe à Unidade Básica de Saúde com história de tosse e "nariz escorrendo" há 4 dias. A mãe relata que há 24 horas a criança passou a "respirar muito rápido" e apresentou febre de 38,4°C controlada com dipirona. Nega vômitos, a criança está mamando e bebendo água normalmente e não teve convulsões.</p>
<p><strong>Exame Físico Rigoroso:</strong></p>
<ul>
  <li>Estado Geral: Criança corada, hidratada, calma no colo da mãe, afebril no momento (37,1°C);</li>
  <li>Aferição da Frequência Respiratória: O médico afere no relógio durante <strong>60 segundos completos com o tórax despido: FR = 46 irpm</strong>;</li>
  <li>Inspeção: <strong>Ausência de tiragem subcostal</strong>; sem retração de fúrcula ou batimento de asas de nariz;</li>
  <li>Ausculta Pulmonar: Murmúrio vesicular diminuído em base pulmonar direita com estertores crepitantes finos tele-inspiratórios localizados; sem sibilos;</li>
  <li>Sinais de Perigo: Ausentes. A criança sorri, bebe água sem engasgos e interage normalmente; SpO2 = 96% em ar ambiente.</li>
</ul>

<p><strong>Raciocínio Clínico e Conduta segundo o AIDPI / Ministério da Saúde:</strong></p>
<ol>
  <li><strong>Interpretação da Taquipneia:</strong> A criança tem 18 meses de idade (faixa de 12 a 59 meses). O ponto de corte que define taquipneia nessa faixa etária é <strong>FR &ge; 40 irpm</strong>. Como apresenta 46 irpm na ausência de febre e com a criança calma, <strong>a taquipneia está formalmente configurada</strong>;</li>
  <li><strong>Estratificação de Gravidade:</strong> Presença de taquipneia, sem tiragem subcostal e sem sinais gerais de perigo classifica o paciente como <strong>PNEUMONIA (Pneumonia Não Grave / Ambulatorial)</strong>;</li>
  <li><strong>Dispensa de Exames Complementares:</strong> Não há necessidade de solicitar radiografia de tórax ou exames de sangue para início do tratamento na UBS;</li>
  <li><strong>Prescrição Baseada em Evidências:</strong> <strong>Amoxicilina oral na dose de 50 mg/kg/dia (ou 80-90 mg/kg/dia) dividida de 12/12h por 5 a 7 dias</strong>;</li>
  <li><strong>Orientação aos Pais:</strong> Hidratação, lavagem nasal com SF 0,9% e <strong>retorno obrigatório agendado em 48 a 72 horas</strong> para reavaliação clínica presencial, ou retorno imediato caso surja tiragem subcostal, gemência ou incapacidade de ingerir líquidos.</li>
</ol>

<h3>Caso Clínico 2: A Pneumonia Afebril do Lactente por Chlamydia trachomatis</h3>
<p><strong>Identificação e História:</strong> Lactente feminina de 7 semanas de vida (1 mês e 3 semanas), nascida de parto vaginal hospitalar a termo, sem intercorrências neonatais imediatas. A mãe procura a UBS referindo que a filha apresenta tosse seca e engasgos que se iniciaram há cerca de 10 dias e vêm piorando progressivamente. Refere que a tosse ocorre em acessos rápidos repetidos ("tosse aos pedaços, parece uma metralhadora"), deixando o bebê vermelho. A mãe enfatiza repetidamente que a criança <strong>nunca teve febre em nenhum momento</strong>. Ao ser interrogada sobre o período neonatal, relata que a bebê teve "uma remela amarela nos dois olhos com 10 dias de vida", tratada na época com colírio de tobramicina.</p>
<p><strong>Exame Físico e Complementares:</strong></p>
<ul>
  <li>Estado Geral: Bom estado geral, corada, hidratada, rigorosamente <strong>afebril (36,7°C)</strong>;</li>
  <li>Frequência Respiratória: <strong>56 irpm (taquipneia para a faixa de 1 a 2 meses, cujo corte é &ge; 50-60 irpm)</strong>; sem tiragem subcostal;</li>
  <li>Ausculta Pulmonar: Estertores crepitantes finos bilaterais difusos em ambos os hemitórax; ausência de sibilos;</li>
  <li>Hemograma: Hemoglobina 11,2 g/dL; Leucócitos 12.800/mm³ com <strong>12% de eosinófilos (contagem absoluta de 1.536 eosinófilos/mm³ — eosinofilia periférica maciça)</strong>; plaquetas normais;</li>
  <li>Radiografia de Tórax: Infiltrado intersticial reticulonodular difuso bilateral com hiperinsuflação pulmonar difusa e retificação diafragmática.</li>
</ul>

<p><strong>Raciocínio Clínico e Tratamento:</strong></p>
<p>O quadro preenche de forma impecável a <strong>Pneumonia Afebril do Lactente por <em>Chlamydia trachomatis</em></strong>: histórico prévio de conjuntivite neonatal tratada topicamente, tosse paroxística em staccato sem guincho, ausência completa de febre com bom estado geral, estertores crepitantes bilaterais, infiltrado intersticial difuso e <strong>eosinofilia periférica exuberante (&gt; 1.000/mm³)</strong>.</p>
<p><strong>Prescrição Correta:</strong></p>
<ul>
  <li><strong>Azitromicina oral:</strong> 10 mg/kg/dia em tomada única diária por <strong>5 dias consecutivos</strong>;</li>
  <li>Alternativa: Claritromicina oral 15 mg/kg/dia dividida de 12/12h por 14 dias;</li>
  <li><strong>Conduta de Saúde Pública:</strong> Notificar e tratar a mãe e o parceiro sexual com Doxiciclina oral 100 mg 12/12h por 7 dias ou Azitromicina 1g dose única.</li>
</ul>

<h3>Caso Clínico 3: Pneumonia Grave com Tiragem Subcostal e Indicação de Ampicilina IV</h3>
<p><strong>Identificação e Queixa:</strong> Menina de 3 anos é levada ao pronto-socorro infantil com história de febre de 39,0°C, prostração e tosse há 3 dias. A mãe refere que a criança "está muito cansada para respirar e com o peito afundando".</p>
<p><strong>Exame Físico:</strong></p>
<ul>
  <li>Estado Geral: Regular estado geral, sonolenta, corada, febril (38,8°C);</li>
  <li>Frequência Respiratória: <strong>52 irpm (taquipneia marcante para 3 anos, corte &ge; 40 irpm)</strong>;</li>
  <li>Mecânica Respiratória: Presença nítida e contínua de <strong>tiragem subcostal acentuada</strong> e batimento discreto de asas nasais; ausência de gemência;</li>
  <li>Oximetria: Saturação de O2 = 91% em ar ambiente;</li>
  <li>Ausculta: Murmúrio vesicular diminuído em terço médio e inferior do hemitórax esquerdo, com presença de sopro tubário e estertores crepitantes focais;</li>
  <li>Sinais de Perigo: Consegue ingerir pequenos goles de água, não teve vômitos incoercíveis ou convulsões.</li>
</ul>

<p><strong>Raciocínio Clínico e Decisão Terapêutica:</strong></p>
<ol>
  <li><strong>Classificação:</strong> Pelo protocolo AIDPI / SBP, a presença de <strong>tiragem subcostal</strong> define formalmente o diagnóstico de <strong>PNEUMONIA GRAVE</strong>. A hipoxemia (SpO2 91%) reforça a gravidade;</li>
  <li><strong>Indicação Formal de Internação Hospitalar:</strong> Pacientes com pneumonia grave <strong>NÃO PODEM ser tratados em domicílio</strong> com amoxicilina oral!;</li>
  <li><strong>Exames Complementares Hospitalares:</strong> Radiografia de tórax (evidenciou consolidação lobar homogênea em lobo inferior esquerdo com broncograma aéreo, sem derrame pleural associado) e dois pares de hemoculturas;</li>
  <li><strong>Tratamento Farmacológico Hospitalar:</strong>
    <ul>
      <li>Instalar <strong>oxigênio por cânula nasal a 1 L/min</strong> para manter SpO2 &ge; 92% a 94%;</li>
      <li>Iniciar <strong>Ampicilina venosa na dose de 150 a 200 mg/kg/dia dividida em 4 doses de 6/6 horas IV</strong>;</li>
      <li>Transicionar para amoxicilina oral assim que a criança estiver afebril e sem esforço respiratório por 24 a 48 horas, completando 7 a 10 dias totais.</li>
    </ul>
  </li>
</ol>

<h3>Caso Clínico 4: Falha Terapêutica após 72h e Empiema Pleural Pediátrico</h3>
<p><strong>Identificação e Evolução:</strong> Menino de 4 anos e meio foi internado na enfermaria de pediatria há 3 dias com diagnóstico de pneumonia pneumocócica lobar em base direita, iniciando tratamento com Ampicilina venosa (150 mg/kg/dia). Hoje, no 3º dia de internação hospitalar (72 horas completas de antibiótico venoso), a equipe médica nota que o paciente <strong>mantém febre alta diária em picos de 39,2°C a 39,5°C</strong>, aumento da prostração e nova piora do cansaço respiratório.</p>
<p><strong>Exame Físico Atual:</strong></p>
<ul>
  <li>Paciente em mau estado geral, taquipneico (FR = 48 irpm), pálido, com tiragem intercostal moderada;</li>
  <li>Aparelho Respiratório: <strong>Expansibilidade torácica marcadamente diminuída no hemitórax direito</strong>. À percussão: <strong>macicez pétrea em toda a metade inferior do hemitórax direito</strong>. À ausculta: <strong>murmúrio vesicular completamente abolido</strong> da linha mamilar até a base pulmonar direita; hemitórax esquerdo com murmúrio limpo e compensatório;</li>
  <li>Ultrassonografia de Tórax: Demonstra volumoso derrame pleural à direita com espessura de 28 mm, com presença de múltiplos septos espessos de fibrina e ecos internos móveis em suspensão ("lojas septadas");</li>
  <li>Toracocentese Diagnóstica: Punção de líquido turvo-leitoso com aspecto de pus franco; análise bioquímica revela <strong>pH = 6,95; glicose = 18 mg/dL; DHL = 3.400 U/L</strong>; bacterioscopia pelo Gram revela diplococos Gram-positivos lanceolados encapsulados aos pares (<em>Streptococcus pneumoniae</em>).</li>
</ul>

<p><strong>Raciocínio Clínico Integrado e Conduta Cirúrgica de Emergência:</strong></p>
<p>O paciente desenvolveu a complicação supurativa clássica da pneumonia: <strong>Empiema Pleural Fibrinopurulento Loculado</strong>. Todos os quatro critérios bioquímicos de empiema estão preenchidos com folga: aspecto francamente purulento, pH marcadamente ácido (&lt; 7,20), glicose consumida (&lt; 40 mg/dL), DHL &gt; 1.000 U/L e presença bacteriana no Gram.</p>
<p><strong>Conduta Multidisciplinar Imediata:</strong></p>
<ol>
  <li><strong>Drenagem Torácica Tubular Fechada em Selo d'Água:</strong> Instalação urgente de dreno torácico tubular para evacuação imediata do exsudato purulento sob pressão;</li>
  <li><strong>Videotoracoscopia Precoce (VATS):</strong> Como a ultrassonografia comprovou múltiplas lojas septadas de fibrina espessas, a conduta ideal é a <strong>debridamento mecânico e lise de aderências por VATS em centro cirúrgico</strong> pelo cirurgião pediátrico;</li>
  <li><strong>Escalonamento Antimicrobiano Parenteral:</strong> Trocar a ampicilina por <strong>Ceftriaxona venosa (100 mg/kg/dia) associada a Oxacilina venosa (150 mg/kg/dia)</strong>, cobrindo pneumococo com resistência intermediária e eventual coinfecção por <em>Staphylococcus aureus</em>, mantendo a terapia parenteral por 14 a 21 dias.</li>
</ol>
`
    },
    {
      id: 'questoes-concursos-comentadas-pneumonia',
      title: '12. Questões Comentadas de Residência Médica e Concursos Oficiais',
      body_html: `
<h3>Questão 1 (ENAMED / ENARE — Inédita Comentada)</h3>
<p>Um lactente de 8 meses de vida, sem antecedentes mórbidos relevantes e com vacinação em dia de acordo com o Programa Nacional de Imunizações, é levado pela mãe à Unidade Básica de Saúde com história de tosse e coriza há 3 dias. A mãe queixa-se de que a criança "está ofegante e cansada". O médico solicita que a mãe dispa o tórax do lactente enquanto ele se acalma em seu colo. Com a criança afebril e tranquila, o médico conta os movimentos respiratórios durante 60 segundos completos no relógio, constatando frequência respiratória de 54 irpm. Ao exame físico, não há tiragem subcostal, batimento de asas de nariz, estridor ou gemência. A ausculta pulmonar revela estertores crepitantes finos localizados na base pulmonar esquerda. A criança está alerta, mamando no peito normalmente e afebril. De acordo com as diretrizes do protocolo AIDPI da Organização Mundial da Saúde e do Ministério da Saúde do Brasil, assinale a classificação da doença e a conduta recomendada para este paciente:</p>
<p><strong>A)</strong> Resfriado comum com tosse; lavagem nasal abundante com soro fisiológico e alta sem necessidade de antibióticos.</p>
<p><strong>B)</strong> Pneumonia grave; encaminhamento imediato para internação hospitalar e início de Penicilina Cristalina intravenosa.</p>
<p><strong>C)</strong> Pneumonia; prescrição de Amoxicilina oral na dose de 50 mg/kg/dia (ou 80-90 mg/kg/dia) por 5 a 7 dias em tratamento domiciliar, com reavaliação obrigatória em 48 a 72 horas.</p>
<p><strong>D)</strong> Doença muito grave; solicitação imediata de vaga de UTI pediátrica, punção lombar e início de Ceftriaxona associada a Oxacilina.</p>
<p><strong>E)</strong> Crise de broncoespasmo; nebulização com salbutamol em 3 ciclos sucessivos a cada 20 minutos.</p>

<p><strong>Comentário Detalhado:</strong></p>
<p><strong>Gabarito: C.</strong></p>
<p><em>Análise das Alternativas:</em></p>
<ul>
  <li><strong>Por que a alternativa C está CORRETA?</strong> A criança tem 8 meses de vida (faixa etária de <strong>2 a 11 meses</strong>). O ponto de corte que define taquipneia pelo protocolo AIDPI/MS nessa faixa é <strong>FR &ge; 50 irpm</strong>. Como o paciente apresenta 54 irpm aferida corretamente durante 1 minuto completo com a criança calma, <strong>a taquipneia está presente</strong>. Como <em>não há tiragem subcostal</em> e <em>não há sinais gerais de perigo</em> (a criança está alerta, hidratada e mamando bem), classifica-se obrigatoriamente como <strong>PNEUMONIA (Pneumonia Não Grave / Ambulatorial)</strong>. A conduta preconizada é o tratamento ambulatorial com <strong>Amoxicilina oral (50 a 90 mg/kg/dia) por 5 a 7 dias</strong> e retorno obrigatório para <strong>reavaliação em 48 a 72 horas</strong>;</li>
  <li><strong>Por que a A está INCORRETA?</strong> A presença de taquipneia com estertores focais afasta o diagnóstico de mero resfriado comum; o antibiótico é obrigatório;</li>
  <li><strong>Por que a B está INCORRETA?</strong> Para ser classificada como "Pneumonia Grave", exigiria a presença de <em>tiragem subcostal</em> ou batimento de asas de nariz, que estão ausentes;</li>
  <li><strong>Por que a D está INCORRETA?</strong> A criança não tem sinais gerais de perigo (vomita tudo, convulsões, letargia/inconsciência, incapacidade de beber, estridor em repouso);</li>
  <li><strong>Por que a E está INCORRETA?</strong> Não há relato de sibilância difusa ou histórico de asma; o quadro é infeccioso alveolar com estertores focais.</li>
</ul>

<h3>Questão 2 (USP-SP / FMUSP — Inédita Comentada)</h3>
<p>Lactente de 2 meses de vida é trazido ao pronto-atendimento com história de tosse há duas semanas. A mãe relata que a tosse ocorre em acessos paroxísticos sucessivos ("em staccato") seguidos de engasgo, mas nega febre durante todo o período. Ao exame físico: paciente em bom estado geral, afebril, com taquipneia (FR = 56 irpm) e estertores crepitantes finos bilaterais difusos à ausculta. O hemograma demonstra 13.500 leucócitos/mm³ com 14% de eosinófilos (contagem absoluta de 1.890 eosinófilos/mm³). A radiografia de tórax evidencia infiltrado intersticial reticulonodular difuso bilateral com hiperinsuflação pulmonar difusa. Em relação ao diagnóstico mais provável e seu manejo terapêutico, assinale a alternativa correta:</p>
<p><strong>A)</strong> Pneumonia por <em>Streptococcus pneumoniae</em>; tratamento ambulatorial com amoxicilina oral por 10 dias.</p>
<p><strong>B)</strong> Pneumonia afebril do lactente por <em>Chlamydia trachomatis</em>; tratamento com Azitromicina oral por 5 dias e convocação da mãe e parceiro sexual para tratamento.</p>
<p><strong>C)</strong> Coqueluche por <em>Bordetella pertussis</em> em fase catarral; isolamento respiratório e penicilina cristalina intravenosa.</p>
<p><strong>D)</strong> Bronquiolite viral aguda por Vírus Sincicial Respiratório; internação em UTI para corticoterapia venosa e salina a 3%.</p>
<p><strong>E)</strong> Tuberculose congênita miliar; início imediato do esquema RIP (Rifampicina, Isoniazida e Pirazinamida) por 6 meses.</p>

<p><strong>Comentário Detalhado:</strong></p>
<p><strong>Gabarito: B.</strong></p>
<p><em>Análise das Alternativas:</em></p>
<ul>
  <li><strong>Por que a alternativa B está CORRETA?</strong> O quadro descreve a apresentação patognomônica da <strong>Pneumonia Afebril do Lactente por <em>Chlamydia trachomatis</em></strong>: lactente jovem (1 a 3 meses), tosse paroxística em staccato sem guincho inspiratório, ausência completa de febre, bom estado geral com taquipneia e estertores difusos, infiltrado intersticial difuso e a marcante <strong>eosinofilia periférica acentuada (&gt; 1.000 eosinófilos/mm³)</strong>. O tratamento de escolha é a <strong>Azitromicina oral por 5 dias</strong> (ou claritromicina por 14 dias), sendo obrigatório convocar os pais para tratamento da infecção genital por clamídia;</li>
  <li><strong>Por que a A está INCORRETA?</strong> Pneumonia pneumocócica causa febre alta súbita, condensação lobar e neutrofilia com desvio à esquerda (não cursa com eosinofilia e curso afebril insidioso);</li>
  <li><strong>Por que a C está INCORRETA?</strong> A coqueluche cursa com <em>linfocitose absoluta exuberante</em> (frequentemente &gt; 20.000 a 30.000 linfócitos/mm³), e não com eosinofilia; além disso, a droga para coqueluche é macrolídeo (não penicilina);</li>
  <li><strong>Por que a D está INCORRETA?</strong> Corticoide não tem indicação em BVA e BVA não causa eosinofilia de 1.890/mm³;</li>
  <li><strong>Por que a E está INCORRETA?</strong> Tuberculose congênita cursa com hepatoesplenomegalia, icterícia, desnutrição grave e história epidemiológica materna de TB ativa grave.</li>
</ul>

<h3>Questão 3 (UNICAMP / SMS-Campinas — Inédita Comentada)</h3>
<p>Menina de 7 anos de idade, previamente hígida, é trazida à consulta médica com queixa de tosse seca contínua há 12 dias, acompanhada de dor de cabeça diária, mal-estar e febre baixa no início do quadro. A tosse é irritativa, piora à noite e não respondeu ao uso de xaropes sintomáticos. Ao exame físico: paciente em bom estado geral, eupnéica em repouso, afebril, com ausculta pulmonar apresentando apenas discretos estertores finos esparsos em hemitórax direito. A radiografia de tórax revela infiltrado reticular e broncopneumônico extenso bilateral, muito mais exuberante do que o exame físico sugeria. O exame dermatológico revela algumas lesões em alvo eritematosas em membros superiores sugestivas de eritema multiforme. Diante deste quadro clínico, qual o agente etiológico mais provável e a droga de escolha para o tratamento?</p>
<p><strong>A)</strong> <em>Streptococcus pneumoniae</em>; Amoxicilina oral em dose alta.</p>
<p><strong>B)</strong> <em>Mycoplasma pneumoniae</em>; Azitromicina oral (ou Claritromicina).</p>
<p><strong>C)</strong> <em>Staphylococcus aureus</em>; Cefalexina oral associada a clindamicina.</p>
<p><strong>D)</strong> <em>Klebsiella pneumoniae</em>; Ciprofloxacino oral.</p>
<p><strong>E)</strong> Vírus Influenza A; Oseltamivir oral.</p>

<p><strong>Comentário Detalhado:</strong></p>
<p><strong>Gabarito: B.</strong></p>
<p><em>Análise das Alternativas:</em></p>
<ul>
  <li><strong>Por que a alternativa B está CORRETA?</strong> O caso ilustra o padrão clássico da <strong>Pneumonia Atípica por <em>Mycoplasma pneumoniae</em></strong>: idade escolar (&gt; 5 anos), pródromo constitucional com cefaleia, tosse seca intratável e arrastada há mais de 10 dias, <strong>dissociação clínico-radiológica evidente</strong> (exame físico pobre contrastando com infiltrado radiológico extenso) e presença de manifestações extrapulmonares imunomediadas clássicas (<strong>lesões de eritema multiforme</strong>). Como o <em>Mycoplasma</em> não possui parede celular, os betalactâmicos são ineficazes. O tratamento de escolha são os <strong>macrolídeos (Azitromicina ou Claritromicina)</strong>;</li>
  <li><strong>Por que a A está INCORRETA?</strong> O pneumococo causa pneumonia típica hiperaguda com febre alta e condensação lobar com broncograma aéreo;</li>
  <li><strong>Por que a C está INCORRETA?</strong> O estafilococo produz quadro agudo grave necrotizante em lactentes, com rápida prostração e empiema;</li>
  <li><strong>Por que as alternativas D e E estão INCORRETAS?</strong> <em>Klebsiella</em> causa pneumonia em etilistas/imunodeprimidos e influenza causa síndrome gripal hiperaguda nos primeiros 2 a 3 dias.</li>
</ul>

<h3>Questão 4 (UERJ / UFRJ — Inédita Comentada)</h3>
<p>Menino de 3 anos e 8 meses foi internado há 48 horas em enfermaria de pediatria com diagnóstico de Pneumonia Adquirida na Comunidade, recebendo Ampicilina venosa (150 mg/kg/dia). A equipe médica de plantão é chamada pela enfermagem porque o paciente mantém picos febris de 39,4°C e aumento do cansaço respiratório. Ao exame físico: paciente irritado, com taquipneia (FR = 50 irpm), tiragem intercostal e subcostal e <strong>macicez acentuada à percussão de todo o terço inferior do hemitórax direito, com murmúrio vesicular abolido no mesmo sítio</strong>. Foi realizada toracocentese diagnóstica imediata. Assinale a alternativa que apresenta o conjunto de achados laboratoriais do líquido pleural que indica <strong>diagnóstico de EMPIEMA PLEURAL e conduta de DRENAGEM TORÁCICA TUBULAR IMEDIATA EM SELO D'ÁGUA</strong>:</p>
<p><strong>A)</strong> Líquido citrino, pH 7,38, glicose 75 mg/dL, DHL 320 U/L e bacterioscopia negativa.</p>
<p><strong>B)</strong> Líquido límpido, pH 7,28, glicose 58 mg/dL, DHL 850 U/L e ausência de células inflamatórias.</p>
<p><strong>C)</strong> Líquido francamente purulento, pH 6,98, glicose 18 mg/dL, DHL 2.800 U/L e presença de diplococos Gram-positivos no Gram.</p>
<p><strong>D)</strong> Líquido sero-hemorrágico, pH 7,42, glicose 90 mg/dL, DHL 200 U/L e predomínio linfocítico.</p>
<p><strong>E)</strong> Líquido quiloso leitoso, pH 7,40, triglicerídeos 350 mg/dL e colesterol baixo.</p>

<p><strong>Comentário Detalhado:</strong></p>
<p><strong>Gabarito: C.</strong></p>
<p><em>Análise das Alternativas:</em></p>
<ul>
  <li><strong>Por que a alternativa C está CORRETA?</strong> O <strong>Empiema Pleural</strong> é definido na pediatria pela presença de: <strong>aspecto macroscópico francamente purulento</strong>, <strong>pH &lt; 7,20</strong>, <strong>glicose consumida &lt; 40 mg/dL</strong>, <strong>DHL marcadamente elevada (&gt; 1.000 U/L)</strong> e/ou presença de bactérias identificadas no Gram ou cultura. Diante desses achados, a conduta mandatória imediata é a <strong>Drenagem Torácica Tubular Fechada em Selo d'Água</strong> associada à antibioticoterapia parenteral otimizada;</li>
  <li><strong>Por que as alternativas A e B estão INCORRETAS?</strong> Descrevem derrames parapneumônicos simples / não complicados (pH &gt; 7,20 e glicose normal), que não exigem drenagem torácica mandatória, respondendo apenas ao antibiótico sistêmico;</li>
  <li><strong>Por que a D está INCORRETA?</strong> Líquido hemorrágico com pH normal e predomínio de linfócitos sugere tuberculose pleural ou malignidade;</li>
  <li><strong>Por que a E está INCORRETA?</strong> Descreve um quilotórax (acúmulo de linfa por lesão do ducto torácico com triglicerídeos &gt; 110 mg/dL).</li>
</ul>

<h3>Questão 5 (SCMSP / AMRIGS — Inédita Comentada)</h3>
<p>Lactente de 11 meses de vida é admitido na emergência pediátrica com quadro grave de pneumonia com toxemia severa, febre de 40,0°C e desconforto respiratório importante. A radiografia de tórax de admissão revela consolidação broncopneumônica multifocal com áreas cavitadas de paredes finas contendo ar (pneumatoceles) e pneumotórax hipertensivo laminar à direita. A mãe relata que o irmão mais velho teve furunculose cutânea extensa na semana anterior. Qual o agente etiológico clássico mais provável responsável por este padrão patológico e qual a abordagem medicamentosa com ação inibidora de toxinas ribossômicas recomendada?</p>
<p><strong>A)</strong> <em>Streptococcus pneumoniae</em> sorotipo 1; Penicilina Cristalina intravenosa em altas doses.</p>
<p><strong>B)</strong> <em>Staphylococcus aureus</em> produtor de Leucocidina de Panton-Valentine (PVL); associação de Oxacilina ou Vancomicina com Clindamicina intravenosa.</p>
<p><strong>C)</strong> <em>Mycoplasma pneumoniae</em>; Doxiciclina oral associada a corticoterapia sistêmica.</p>
<p><strong>D)</strong> <em>Pseudomonas aeruginosa</em>; Ciprofloxacino oral associado a tobramicina inalatória.</p>
<p><strong>E)</strong> <em>Haemophilus influenzae</em> tipo b; Ampicilina venosa em monoterapia.</p>

<p><strong>Comentário Detalhado:</strong></p>
<p><strong>Gabarito: B.</strong></p>
<p><em>Análise das Alternativas:</em></p>
<ul>
  <li><strong>Por que a alternativa B está CORRETA?</strong> A associação de pneumonia rapidamente destrutiva em lactente, presença de <strong>pneumatoceles, pneumotórax espontâneo e histórico familiar de infecções cutâneas purulentas (furunculose)</strong> é a clássica assinatura do <strong><em>Staphylococcus aureus</em></strong> (especialmente cepas comunitárias produtoras de Leucocidina de Panton-Valentine - PVL). A adição de <strong>Clindamicina</strong> é preconizada pelas diretrizes porque seu mecanismo de inibição da subunidade ribossômica 50S bloqueia a síntese proteica e <strong>suprime a produção da toxina PVL</strong>, reduzindo a destruição tecidual pulmonar;</li>
  <li><strong>Por que as alternativas A, C, D e E estão INCORRETAS?</strong> O pneumococo comum, o <em>Mycoplasma</em>, a <em>Pseudomonas</em> e o Hib não são a etiologia típica de pneumatoceles com pneumotórax e história de furunculose de contato.</li>
</ul>

<h3>Questão 6 (PSU-MG / SMS-BH — Inédita Comentada)</h3>
<p>De acordo com o protocolo AIDPI (Atenção Integrada às Doenças Prevalentes na Infância) adotado pelo Ministério da Saúde, assinale a opção que indica corretamente o ponto de corte da frequência respiratória para definir <strong>taquipneia</strong> em uma criança com <strong>3 anos e 4 meses de idade</strong>, devendo ser aferida durante 60 segundos com a criança tranquila:</p>
<p><strong>A)</strong> FR &ge; 60 irpm.</p>
<p><strong>B)</strong> FR &ge; 50 irpm.</p>
<p><strong>C)</strong> FR &ge; 40 irpm.</p>
<p><strong>D)</strong> FR &ge; 30 irpm.</p>
<p><strong>E)</strong> FR &ge; 20 irpm.</p>

<p><strong>Comentário Detalhado:</strong></p>
<p><strong>Gabarito: C.</strong></p>
<p><em>Análise das Alternativas:</em></p>
<ul>
  <li><strong>Por que a alternativa C está CORRETA?</strong> A criança tem 3 anos e 4 meses (40 meses de vida), enquadrando-se na faixa etária de <strong>1 a 4 anos (12 a 59 meses)</strong>. Pelos critérios formais da OMS e do Ministério da Saúde:
    <ul>
      <li>Menores de 2 meses: FR &ge; 60 irpm;</li>
      <li>2 a 11 meses: FR &ge; 50 irpm;</li>
      <li><strong>1 a 4 anos (12 a 59 meses): FR &ge; 40 irpm</strong>;</li>
      <li>5 anos ou mais: FR &ge; 20-30 irpm.</li>
    </ul>
    Portanto, o ponto de corte para a criança de 3 anos e 4 meses é <strong>FR &ge; 40 irpm</strong>;</li>
  <li><strong>Por que as alternativas A, B, D e E estão INCORRETAS?</strong> 60 irpm é para &lt; 2 meses; 50 irpm é para 2 a 11 meses; 30 irpm e 20 irpm são para maiores de 5 anos.</li>
</ul>
`
    },
    {
      id: 'guia-rapido-sintese-pneumonia-enamed',
      title: '13. Guia Rápido de Conduta e Síntese da Pneumonia Pediátrica para o ENAMED',
      body_html: `
<h3>Os Dez Mandamentos da Pneumonia na Criança para o ENAMED</h3>
<ol>
  <li><strong>Taquipneia como Sinal Cardinal do AIDPI:</strong> É o sinal clínico isolado mais sensível e precoce de pneumonia. Deve ser aferida em <strong>1 minuto completo no relógio</strong> com a criança calma e despida:
    <ul>
      <li>Menor de 2 meses: FR &ge; 60 irpm;</li>
      <li>2 a 11 meses: FR &ge; 50 irpm;</li>
      <li>1 a 4 anos (12 a 59 meses): FR &ge; 40 irpm;</li>
      <li>5 anos ou mais: FR &ge; 20-30 irpm.</li>
    </ul>
  </li>
  <li><strong>Estratificação de Gravidade AIDPI:</strong>
    <ul>
      <li>Pneumonia (Ambulatorial): Taquipneia sem tiragem subcostal e sem sinais de perigo. Tratar com <strong>Amoxicilina oral (50 a 90 mg/kg/dia) por 5 a 7 dias</strong> com retorno obrigatório em 48 a 72 horas;</li>
      <li>Pneumonia Grave: Presença de <strong>tiragem subcostal</strong> ou batimento de asas de nariz. <strong>Internação hospitalar obrigatória e Ampicilina venosa (150 a 200 mg/kg/dia)</strong>;</li>
      <li>Pneumonia Muito Grave: Presença de sinais gerais de perigo (vômitos incoercíveis, convulsões, letargia/inconsciência, incapacidade de beber, estridor em repouso ou SpO2 &lt; 90-92%). UTI e Ceftriaxona + Oxacilina.</li>
    </ul>
  </li>
  <li><strong>Lactente Menor de 2 Meses:</strong> Todo lactente &lt; 2 meses com tosse e taquipneia (&ge; 60 irpm) ou tiragem tem "Doença Muito Grave / Sepse Possível" no AIDPI. Internação hospitalar e Ampicilina + Gentamicina IV.</li>
  <li><strong>Radiografia de Tórax:</strong> NÃO é necessária de rotina para casos leves ambulatoriais na Atenção Primária. Obrigatória apenas para internados, piora clínica ou suspeita de complicações.</li>
  <li><strong>Pneumonia Afebril do Lactente (<em>Chlamydia trachomatis</em>):</strong> Lactente de 1 a 3 meses, parto vaginal, história prévia de conjuntivite neonatal, tosse em staccato, <strong>ausência completa de febre</strong>, estertores finos difusos, infiltrado intersticial e <strong>eosinofilia periférica maciça (&gt; 1.000/mm³)</strong>. Tratar com <strong>Azitromicina oral por 5 dias</strong> e tratar os pais.</li>
  <li><strong>Pneumonias Atípicas em Escolares (<em>Mycoplasma pneumoniae</em>):</strong> Crianças &gt; 5 anos, tosse seca intratável e arrastada, cefaleia, dissociação clínico-radiológica e manifestações extrapulmonares (eritema multiforme, anemia hemolítica por crioaglutininas). Tratar com macrolídeos (Azitromicina ou Claritromicina). Betalactâmicos não funcionam porque o <em>Mycoplasma</em> não tem parede celular!</li>
  <li><strong>Agente Bacteriano Mais Comum:</strong> O <strong><em>Streptococcus pneumoniae</em> (Pneumococo)</strong> é o agente bacteriano típico mais comum em todas as faixas etárias acima do período neonatal, causando clássica condensação lobar com broncograma aéreo.</li>
  <li><strong>Derrame Parapneumônico / Empiema:</strong> Suspeitar sempre que houver <strong>persistência de febre após 48 a 72 horas de antibiótico adequado</strong> associada a macicez e murmúrio abolido. Avaliar com USG e toracocentese diagnóstica.</li>
  <li><strong>Critérios de Empiema e Conduta:</strong> Pus franco, <strong>pH &lt; 7,20, glicose &lt; 40 mg/dL</strong>, DHL &gt; 1.000 e bactérias no Gram/cultura definem empiema. Conduta: <strong>Drenagem torácica tubular imediata em selo d'água</strong> e Ceftriaxona + Oxacilina IV; indicar videotoracoscopia precoce (VATS) se septações complexas.</li>
  <li><strong>Pneumonia Estafilocócica (<em>S. aureus</em> PVL):</strong> Evolução fulminante, necrose tecidual, <strong>pneumatoceles, pneumotórax espontâneo e empiema espesso</strong>. Tratar com Oxacilina/Vancomicina associada a <strong>Clindamicina IV</strong> (efeito antitoxina inibidor da leucocidina PVL). Pneumatoceles não devem ser puncionadas de rotina!</li>
</ol>
`
    }
  ],
  references: [
    {
      title: 'Ministério da Saúde do Brasil — Manual de Atenção Integrada às Doenças Prevalentes na Infância (AIDPI Criança) e Manejo das Infecções Respiratórias Agudas',
      url: 'https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/s/saude-da-crianca'
    },
    {
      title: 'Sociedade Brasileira de Pediatria (SBP) — Departamento Científico de Pneumologia e Infectologia Pediátrica. Diretrizes para o Manejo das Pneumonias Adquiridas na Comunidade na Infância',
      url: 'https://www.sbp.com.br/departamentos-cientificos/pneumologia/diretrizes/'
    },
    {
      title: 'World Health Organization (WHO) — Revised WHO classification and treatment of childhood pneumonia at health facilities',
      url: 'https://www.who.int/publications/i/item/9789241507812'
    },
    {
      title: 'Infectious Diseases Society of America (IDSA) / Pediatric Infectious Diseases Society (PIDS) — Clinical Practice Guideline by the PIDS and IDSA: The Management of Community-Acquired Pneumonia in Infants and Children Older Than 3 Months of Age',
      url: 'https://www.idsociety.org/practice-guideline/community-acquired-pneumonia-in-infants-and-children/'
    },
    {
      title: 'British Thoracic Society (BTS) — Guidelines for the Management of Community Acquired Pneumonia in Children: update 2011 (Thorax)',
      url: 'https://www.brit-thoracic.org.uk/quality-improvement/guidelines/children-community-acquired-pneumonia/'
    }
  ]
};

const chars = saveBook(book);
console.log(`Finalizado ${book.slug}: ${chars} caracteres úteis.`);
