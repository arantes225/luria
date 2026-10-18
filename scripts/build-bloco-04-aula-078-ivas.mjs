import { saveBook } from './bloco-04-utils.mjs';

const book = {
  slug: 'infeccoes-de-vias-aereas-superiores',
  title: 'Infecções de Vias Aéreas Superiores',
  area: 'Pediatria',
  materia: 'Infectologia Pediátrica e Otorrinolaringologia',
  description: 'Tratado completo de Infecções de Vias Aéreas Superiores (IVAS) na infância: abordagem sindrômica e diagnóstico diferencial das afecções respiratórias altas; Rinofaringite Viral Aguda (Resfriado Comum), agentes virais, história natural e contraindicação formal absoluta de descongestionantes, vasoconstritores e antitussígenos em menores de 2 a 6 anos; Faringoamigdalite Aguda com diferenciação etiológica viral versus bacteriana por Streptococcus pyogenes (SBHGA), escores de Centor e McIsaac, Teste Rápido Estreptocócico (TRG) e erradicação obrigatória com Penicilina Benzatina IM ou Amoxicilina 10 dias para prevenção primária de Febre Reumática; complicações supurativas: abscesso periamigdalino (trismo, sialorreia, desvio contralateral da úvula) e abscesso retrofaríngeo; Otite Média Aguda (OMA), tuba auditiva infantil, microbiologia (S. pneumoniae, H. influenzae, M. catarrhalis), otoscopia com abaulamento timpânico, conduta expectante versus amoxicilina em dose alta (80-90 mg/kg/dia) e indicações de amoxicilina-clavulanato; Mastoidite Aguda; Rinossinusite Bacteriana Aguda (critérios de persistência > 10 dias, início severo e curso bifásico "double sickening") e complicações orbitárias de Chandler; Laringite Estridulosa Aguda (Crupe Viral por Parainfluenza, tosse ladrante, estridor, sinal da torre de igreja, escore de Westley, Dexametasona dose única e Adrenalina inalatória com observação de rebote) versus Epiglotite Aguda Bacteriana (sinal do polegar, posição em tripé, sialorreia profusa, não manipular orofaringe e via aérea cirúrgica); casos clínicos e questões comentadas para o ENAMED e residência médica.',
  sections: [
    {
      id: 'anatomia-epidemiologia-abordagem-sindromica-ivas',
      title: '1. Anatomia Funcional, Epidemiologia e Abordagem Sindrômica das IVAS',
      body_html: `
<h3>Magnitude Epidemiológica das IVAS na Infância</h3>
<p>As Infecções das Vias Aéreas Superiores (IVAS) representam a causa isolada mais comum de procura por atendimento médico pediátrico em nível ambulatorial, de urgência e emergência em todo o mundo. Em países em desenvolvimento como o Brasil, estima-se que uma criança hígida que frequenta creches ou pré-escolas apresente em média entre <strong>6 a 8 episódios de IVAS virais por ano</strong> durante os primeiros cinco anos de vida — podendo atingir até 10 a 12 episódios anuais no primeiro ano de frequência escolar coletiva, sem que isso configure qualquer defeito imunológico congênito ou adquirido.</p>
<p>A imaturidade imunológica fisiológica da infância, associada à exposição inicial a múltiplos sorotipos virais respiratórios circulantes e ao contato físico estreito característico das instituições educacionais infantis, explica essa alta frequência episódica. O desafio médico primordial não reside em impedir tais infecções, mas sim em:</p>
<ol>
  <li>Reconhecer a natureza autolimitada e viral da imensa maioria dos casos;</li>
  <li>Evitar a prescrição desnecessária e prejudicial de antibióticos de amplo espectro;</li>
  <li>Banir o uso perigoso de medicamentos sintomáticos contraindicados em lactentes e crianças pequenas;</li>
  <li>Identificar oportunamente as complicações bacterianas secundárias (otite média aguda, rinossinusite bacteriana, mastoidite e abscessos cervicais profundos);</li>
  <li>Diferenciar emergências de via aérea com risco iminente de asfixia (laringite estridulosa grave e epiglotite aguda).</li>
</ol>

<h3>Peculiaridades Anatômicas da Via Aérea Pediátrica</h3>
<p>A via aérea superior da criança difere substancialmente da via aérea do adulto em múltiplos aspectos geométricos, anatômicos e fisiológicos:</p>
<table class="book-table">
  <thead>
    <tr>
      <th>Estrutura Anatômica</th>
      <th>Particularidade Pediátrica</th>
      <th>Consequência Clínica e Fisiopatológica</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Cavidade Nasal e Coanas</strong></td>
      <td>Lúmen nasal proporcionalmente muito estreito e vascularizado; lactentes até os 3 a 6 meses de vida são <strong>respiradores nasais preferenciais obrigatórios</strong>.</td>
      <td>Qualquer pequeno edema inflamatório submucoso ou acúmulo de secreção catarral nas conchas nasais provoca obstrução nasal significativa, com respiração ruidosa, desconforto respiratório reflexo, engasgos e dificuldade de sucção ao seio materno durante as mamadas.</td>
    </tr>
    <tr>
      <td><strong>Língua e Orofaringe</strong></td>
      <td>Língua proporcionalmente maior em relação à cavidade oral (macroglossia relativa) com tonsilas palatinas e faríngeas (amígdalas e adenoides) volumosas.</td>
      <td>Maior facilidade de colapso posterior da língua contra a orofaringe em estados de relaxamento muscular ou depressão do nível de consciência; hipertrofia amigdaliana agrava o ronco e a apneia.</td>
    </tr>
    <tr>
      <td><strong>Epiglote e Laringe</strong></td>
      <td>Laringe mais cefálica (nível vertebral C3-C4 no lactente vs C5-C6 no adulto); epiglote mais longa, estreita, flácida e em formato de "ômega" (&Omega;) ou ferradura, posicionada obliquamente sobre a glote.</td>
      <td>Dificuldade de visualização glótica direta na laringoscopia; maior propensão ao colapso estriduloso dinâmico (laringomalácia) e rápida oclusão em processos infecciosos agudos da supraglote.</td>
    </tr>
    <tr>
      <td><strong>Ponto Mais Estreito da Via Aérea</strong></td>
      <td>A <strong>região subglótica (cartilagem cricoide)</strong> é o ponto anatômico mais estreito e afunilado da via aérea na criança (formato de funil/cone), enquanto no adulto o ponto mais estreito situa-se na rima glótica (cordas vocais).</td>
      <td>A cartilagem cricoide é um anel cartilaginoso completo e inelástico. Apenas <strong>1 mm de edema inflamatório circular na mucosa subglótica reduz a área de secção transversa da via aérea em mais de 50% a 75%</strong> no lactente jovem, gerando o clássico estridor inspiratório do crupe.</td>
    </tr>
    <tr>
      <td><strong>Tuba Auditiva (Trompa de Eustáquio)</strong></td>
      <td>Mais curta, mais larga, mais horizontalizada e com menor rigidez cartilaginosa do que no adulto.</td>
      <td>Facilita o refluxo retrógrado direto de secreções nasofaríngeas colonizadas por patógenos bacterianos para a orelha média durante episódios de resfriado, espirros ou sucção de mamadeiras em decúbito dorsal plano, deflagrando a Otite Média Aguda.</td>
    </tr>
  </tbody>
</table>
`
    },
    {
      id: 'resfriado-comum-rinofaringite-viral-aguda',
      title: '2. Rinofaringite Viral Aguda (Resfriado Comum) e Segurança Farmacológica',
      body_html: `
<h3>Etiologia Viral e Patogênese</h3>
<p>O Resfriado Comum, ou Rinofaringite Viral Aguda, é a afecção respiratória infecciosa mais incidente da espécie humana. Trata-se de uma infecção viral aguda autolimitada da mucosa do nariz e da nasofaringe, caracterizada por hiperemia, edema inflamatório submucoso e aumento acentuado da produção de muco glandular.</p>
<p><strong>Principais Agentes Etiológicos:</strong></p>
<ul>
  <li><strong>Rinovírus Humanos (HRV):</strong> Responsáveis por mais de <strong>50% dos episódios</strong> ao longo de todo o ano, com picos sazonais no início do outono e na primavera. Existem mais de 160 sorotipos diferentes distribuídos nas espécies A, B e C, o que impede a imunidade esterilizante definitiva;</li>
  <li><strong>Coronavírus humanos convencionais</strong> (cepas 229E, OC43, NL63, HKU1): 10% a 15% dos casos;</li>
  <li><strong>Vírus Sincicial Respiratório (VSR) e Metapneumovírus humano:</strong> Podem manifestar-se inicialmente como resfriado comum em crianças maiores antes do acometimento bronquiolar;</li>
  <li><strong>Adenovírus e Bocavírus humano:</strong> Associados frequentemente à febre mais persistente e sintomas gastrointestinais ou conjuntivite associada;</li>
  <li><strong>Vírus Influenza e Parainfluenza:</strong> Frequentemente cursam com quadro sistêmico mais prostrador.</li>
</ul>

<h3>Transmissão e História Natural</h3>
<p>A transmissão ocorre primordialmente por <strong>contato direto pessoa a pessoa através de mãos contaminadas</strong> que tocam secreções infectadas e entram em contato com as mucosas nasal ou conjuntival, bem como por <strong>fômites inanimados</strong> (brinquedos, superfícies) e perdigotos de gotículas respiratórias emitidas por espirros ou tosse.</p>
<p>A evolução clínica natural e temporal do resfriado comum não complicado segue um padrão previsível:</p>
<ol>
  <li><strong>Dias 1 a 3 (Fase Inicial):</strong> Sensação de prurido ou queimação orofaríngea ("garganta arranhando"), espirros frequentes, obstrução nasal e coriza líquida, hialina e abundante. Febre de intensidade variável (frequentemente presente em lactentes e pré-escolares, podendo atingir 38,5°C a 39,0°C nos primeiros dois dias);</li>
  <li><strong>Dias 3 a 5 (Pico dos Sintomas):</strong> A coriza nasal torna-se mais espessa, viscosa e <strong>muda de coloração, assumindo aspecto amarelado ou esverdeado</strong>. <em>Atenção para Provas e Prática Clínica:</em> A presença de secreção nasal espessa, mucopurulenta ou esverdeada decorre do influxo maciço de neutrófilos ativados ricos na enzima mieloperoxidase e <strong>NÃO é sinônimo de infecção bacteriana secundária nem indicação de antibioticoterapia</strong>!;</li>
  <li><strong>Dias 6 a 10 (Fase de Resolução):</strong> Melhora espontânea da febre e do estado geral. A tosse (especialmente noturna, por gotejamento pós-nasal) e a obstrução nasal residual podem persistir por até 10 a 14 dias em até 20% das crianças hígidas.</li>
</ol>

<h3>Contraindicação Formal e Perigo Fatal de Medicamentos Sintomáticos em Menores</h3>
<p>Este é um dos tópicos mais cobrados nas provas do ENAMED e residência médica nos últimos anos, respaldado por resoluções formais da ANVISA, da FDA norte-americana e da Sociedade Brasileira de Pediatria (SBP):</p>
<div class="book-alert">
<p><strong>ALERTA DE SEGURANÇA MÁXIMA: É FORMALMENTE CONTRAINDICADO O USO DE:</strong></p>
<ul>
  <li><strong>Descongestionantes sistêmicos orais (Pseudoefedrina, Fenilefrina)</strong> e anti-histamínicos de primeira geração combinados em crianças menores de 6 anos;</li>
  <li><strong>Vasoconstritores tópicos nasais (Nafazolina, Oximetazolina)</strong> em menores de 6 anos (e terminantemente proibidos em menores de 2 anos): risco elevadíssimo de intoxicação acidental com hipotermia, coma, bradicardia grave, hipotensão e choque cardiogênico;</li>
  <li><strong>Antitussígenos de ação central (Codeína, Dextrometorfano)</strong> em menores de 6 anos: risco de depressão respiratória central e óbito;</li>
  <li><strong>Mucolíticos e expectorantes (Acetilcisteína, Ambroxol, Bromexina)</strong> em menores de 2 anos: broncoespasmo paradoxal e aumento da obstrução bronquiolar.</li>
</ul>
</div>

<h3>Tratamento Padrão-Ouro Baseado em Evidências</h3>
<p>O tratamento do resfriado comum na infância é puramente sintomático e de suporte:</p>
<ul>
  <li><strong>Lavagem Nasal Abundante com Solução Fisiológica (SF 0,9%):</strong> Realizada com seringa sem agulha ou spray nasal, várias vezes ao dia, obrigatoriamente antes das mamadas/refeições e antes de dormir. Remove o muco intraluminal, descongestiona os óstios sinusais e melhora a dinâmica alimentar do lactente;</li>
  <li><strong>Hidratação Oral Abundante:</strong> Oferta livre de leite materno, água e líquidos naturais para fluidificar as secreções respiratórias;</li>
  <li><strong>Antitérmicos / Analgésicos Simples:</strong> Dipirona (10 a 25 mg/kg/dose) ou Paracetamol (10 a 15 mg/kg/dose) por via oral, administrados exclusivamente se houver febre acompanhada de desconforto, dor ou irritabilidade (nunca em esquema fixo profilático);</li>
  <li><strong>Mel de Abelha Natural (Atenção à Idade):</strong> Recomendado como demulcente natural eficaz para tosse noturna irritativa em <strong>crianças MAIORES de 1 ano de idade</strong> (meia colher de chá antes de dormir). <em>Contraindicação estrita em menores de 12 meses pelo risco grave de Botulismo Infantil</em> por esporos de <em>Clostridium botulinum</em>.</li>
</ul>
`
    },
    {
      id: 'faringoamigdalite-viral-versus-estreptococica',
      title: '3. Faringoamigdalite Aguda: Diferenciação Viral versus Bacteriana',
      body_html: `
<h3>Importância do Diagnóstico Diferencial Preciso</h3>
<p>A faringoamigdalite aguda é uma inflamação infecciosa das tonsilas palatinas e da mucosa faríngea. A diferenciação entre etiologia viral e bacteriana é uma das tomadas de decisão clínica mais rotineiras na pediatria. O uso indiscriminado de antibióticos na faringite atinge níveis inaceitáveis de até 70% das prescrições ambulatoriais, embora apenas uma minoria dos casos seja causada por bactérias.</p>

<h3>Etiologia Viral (Mais de 70% a 85% dos Casos Globais)</h3>
<p>Em lactentes e crianças <strong>menores de 3 anos de idade</strong>, a etiologia viral é responsável por mais de <strong>90% a 95% das faringites</strong>. Os principais agentes e apresentações específicas incluem:</p>
<ul>
  <li><strong>Adenovírus:</strong> Febre alta que dura 5 a 7 dias, faringite exsudativa (com placas esbranquiçadas que mimetizam perfeitamente a bactéria!), <strong>conjuntivite folicular não purulenta</strong> (Síndrome Febre Faringoconjuntival) e linfadenomegalia cervical;</li>
  <li><strong>Enterovírus (Coxsackievírus A e B):</strong>
    <ul>
      <li><strong>Herpangina:</strong> Múltiplas pequenas vesículas milimétricas (1 a 2 mm) que ulceram rapidamente, circundadas por halo eritematoso, localizadas no <em>palato mole, úvula e pilares amigdalianos anteriores</em> (poupa a gengiva e a mucosa jugal anterior), associadas a disfagia dolorosa aguda e febre alta;</li>
      <li><strong>Doença Mão-Pé-Boca (Coxsackievírus A16 e Enterovírus 71):</strong> Vesículas em orofaringe associadas a pápulas e vesículas eritematosas características nas palmas das mãos, plantas dos pés, joelhos e nádegas;</li>
    </ul>
  </li>
  <li><strong>Vírus Epstein-Barr (EBV - Mononucleose Infecciosa):</strong> Causa clássica de faringite exsudativa em pré-escolares e adolescentes, associada a febre prolongada, linfadenopatia generalizada exuberante (especialmente cadeia cervical posterior), esplenomegalia e <strong>exantema maculopapular desencadeado pelo uso inadvertido de amoxicilina</strong>;</li>
  <li><strong>Sintomas Virais Sugestivos de Resfriado Associado:</strong> Presença de <strong>tosse, coriza nasal, espirros, rouquidão, estomatite anterior e diarreia</strong> praticamente exclui a faringite bacteriana estreptocócica!</li>
</ul>

<h3>Etiologia Bacteriana: O Estreptococo Beta-Hemolítico do Grupo A (SBHGA)</h3>
<p>O <em>Streptococcus pyogenes</em> (SBHGA) é o único agente bacteriano comum em faringoamigdalites pediátricas que demanda tratamento antibiótico mandatório, visando primariamente à <strong>prevenção primária da Febre Reumática Aguda</strong> e de complicações supurativas locais.</p>
<p><strong>Aspectos Epidemiológicos Críticos para Provas:</strong></p>
<ul>
  <li><strong>Faixa Etária de Pico:</strong> Crianças entre <strong>3 e 15 anos de idade</strong> (especialmente escolares de 5 a 12 anos);</li>
  <li><strong>Raridade em Menores de 3 Anos:</strong> A faringite estreptocócica clássica com exsudato é <strong>excepcional em crianças com menos de 3 anos de idade</strong>. Nessa faixa, os enterócitos e queratinócitos faríngeos expressam baixa densidade de receptores celulares para a proteína F e ácido lipoteicoico do SBHGA. Quando ocorre em lactentes, manifesta-se de forma atípica como "estreptococose" (rinorreia purulenta crônica excoriante nas narinas, febre baixa e irritabilidade), sem placas amigdalianas;</li>
  <li><strong>Quadro Clínico Clássico:</strong> Início <strong>abrupto/súbito de febre alta (&ge; 38,5°C)</strong>, dor de garganta intensa (odinofagia acentuada), cefaleia, náuseas, vômitos e dor abdominal (frequente em escolares). Ao exame: hiperemia faríngea intensa, tonsilas hipertrofiadas e cobertas por <strong>exsudato purulento em placas confluentes</strong>, <strong>petéquias no palato mole e duro ("céu da boca em morango")</strong> e <strong>adenomegalia submandibular / cervical anterior satélite dolorosa à palpação</strong>. Ausência total de tosse ou coriza.</li>
</ul>

<h3>Tabela Comparativa Diagnóstica: Viral vs Estreptocócica</h3>
<table class="book-table">
  <thead>
    <tr>
      <th>Critério Clínico-Epidemiológico</th>
      <th>Faringite Viral (Enterovírus, Adenovírus, EBV, Rinovírus)</th>
      <th>Faringite Bacteriana por SBHGA (<em>S. pyogenes</em>)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Faixa Etária Típica</strong></td>
      <td>Qualquer idade; responsável por <strong>&gt; 90% das faringites em &lt; 3 anos</strong>.</td>
      <td><strong>Pico entre 3 e 15 anos</strong>; raríssima antes dos 3 anos de vida.</td>
    </tr>
    <tr>
      <td><strong>Início dos Sintomas</strong></td>
      <td>Insidioso, precedido ou acompanhado de sintomas catarrais.</td>
      <td><strong>Súbito e agudo</strong>, em poucas horas.</td>
    </tr>
    <tr>
      <td><strong>Sintomas Respiratórios Associados</strong></td>
      <td><strong>Presentes:</strong> Coriza, tosse, rouquidão, espirros, conjuntivite.</td>
      <td><strong>Ausentes:</strong> A ausência de tosse e coriza é a regra.</td>
    </tr>
    <tr>
      <td><strong>Sintomas Gastrointestinais</strong></td>
      <td>Diarreia e cólicas comuns (enterovírus).</td>
      <td>Náuseas, vômitos e dor abdominal mesogástrica reflexa.</td>
    </tr>
    <tr>
      <td><strong>Oroscopia</strong></td>
      <td>Hiperemia difusa, vesículas em palato (herpangina), ulcerações orais.</td>
      <td>Amígdalas congestas com placas purulentas, <strong>petéquias em palato</strong>.</td>
    </tr>
    <tr>
      <td><strong>Linfonodos Regionais</strong></td>
      <td>Linfadenopatia generalizada ou ausente; cadeia posterior (EBV).</td>
      <td><strong>Linfonodomegalia cervical anterior/angular dolorosa</strong> e móvel.</td>
    </tr>
  </tbody>
</table>
`
    },
    {
      id: 'escore-centor-mcisaac-tratamento-faringite',
      title: '4. Critérios de Centor/McIsaac, Teste Rápido e Tratamento da Faringite',
      body_html: `
<h3>Escore Clínico de Centor Modificado por McIsaac</h3>
<p>Para sistematizar a probabilidade pré-teste de infecção por SBHGA e racionalizar o uso de testes microbiológicos e antibióticos, utiliza-se internacionalmente o <strong>Escore de McIsaac</strong> (modificação do escore de Centor para incluir a variável idade):</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Critério Avaliado</th>
      <th>Pontuação Atribuída</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Febre relatada ou aferida &gt; 38,0°C</strong></td>
      <td>+1 ponto</td>
    </tr>
    <tr>
      <td><strong>Ausência de tosse</strong></td>
      <td>+1 ponto</td>
    </tr>
    <tr>
      <td><strong>Presença de exsudato amigdaliano ou aumento de tonsilas</strong></td>
      <td>+1 ponto</td>
    </tr>
    <tr>
      <td><strong>Linfonodomegalia cervical anterior dolorosa à palpação</strong></td>
      <td>+1 ponto</td>
    </tr>
    <tr>
      <td><strong>Faixa Etária:</strong><br>• 3 a 14 anos de idade<br>• 15 a 44 anos de idade<br>• &ge; 45 anos de idade</td>
      <td><br><strong>+1 ponto</strong><br>0 ponto<br>-1 ponto</td>
    </tr>
  </tbody>
</table>

<p><strong>Conduta Baseada na Pontuação Total do Escore de McIsaac:</strong></p>
<ul>
  <li><strong>0 ou 1 ponto:</strong> Risco de SBHGA &lt; 5% a 10%. <em>Conduta:</em> Não realizar testes laboratoriais; não prescrever antibióticos; tratamento puramente sintomático;</li>
  <li><strong>2 ou 3 pontos:</strong> Risco intermediário de SBHGA (15% a 30%). <em>Conduta:</em> <strong>Realizar Teste Rápido de Detecção de Antígeno Estreptocócico (TRG)</strong> ou cultura de swab de orofaringe. Se positivo, iniciar antibiótico; se negativo em crianças, a diretriz recomenda enviar cultura de orofaringe para confirmação;</li>
  <li><strong>4 ou 5 pontos:</strong> Risco alto de SBHGA (50% a 60%). <em>Conduta:</em> Realizar TRG e, se positivo, iniciar antibioticoterapia imediatamente (ou iniciar empírico se indisponibilidade de testes e quadro tóxico típico).</li>
</ul>

<h3>Objetivo Principal da Antibioticoterapia: Prevenção Primária de Febre Reumática</h3>
<p>Diferente de outras infecções pediátricas em que o antibiótico visa apenas acelerar a cura clínica, na faringite estreptocócica o objetivo basilar da antibioticoterapia é a <strong>prevenção primária da Febre Reumática Aguda</strong> e da cardiopatia reumática crônica valvar, além de prevenir complicações supurativas locais (como abscesso periamigdalino) e interromper a cadeia de transmissão em 24 horas.</p>
<p><em>Dado Crucial para Provas:</em> A antibioticoterapia pode ser iniciada com segurança <strong>em até 9 dias após o início dos sintomas da dor de garganta</strong> sem perder a eficácia protetora absoluta contra a Febre Reumática! (Não é uma urgência que precise ser iniciada na primeira hora sem confirmação diagnóstica!). Por outro lado, <strong>o antibiótico NÃO previne a Glomerulonefrite Difusa Aguda Pós-Estreptocócica (GNPE)</strong>, que é uma complicação mediada por imunocomplexos circulantes que decorre da resposta imune já desencadeada.</p>

<h3>Esquemas Terapêuticos Padronizados</h3>
<table class="book-table">
  <thead>
    <tr>
      <th>Fármaco e Regime</th>
      <th>Posologia Recomendada</th>
      <th>Vantagens e Particularidades Clínicas</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Penicilina G Benzatina<br>(Padrão-Ouro / Primeira Escolha Oficial)</strong></td>
      <td><strong>Dose Única Intramuscular (IM) profunda:</strong><br>
      • Peso &lt; 27 kg: <strong>600.000 UI IM</strong>;<br>
      • Peso &ge; 27 kg: <strong>1.200.000 UI IM</strong>.</td>
      <td><strong>Vantagem absoluta: 100% de adesão assegurada</strong> com aplicação única supervisionada. Elimina o risco de abandono precoce. Não existe até hoje relato de cepa de <em>S. pyogenes</em> resistente à penicilina no planeta! Desvantagem: dor no local da injeção.</td>
    </tr>
    <tr>
      <td><strong>Amoxicilina Oral</strong></td>
      <td><strong>50 mg/kg/dia por via oral (máx. 1.000 mg/dia)</strong> dividida em 2 doses (de 12/12h) ou em dose única diária, administrada por <strong>10 DIAS COMPLETOS</strong>.</td>
      <td>Excelente aceitabilidade e sabor em suspensão oral. <strong>Atenção obrigatória:</strong> A duração do tratamento <strong>precisa ser de rigorosos 10 dias</strong> para erradicação microbiológica faríngea do SBHGA. Tratamentos orais mais curtos (5 a 7 dias) curam os sintomas clínicos, mas falham em erradicar a bactéria e não garantem proteção contra Febre Reumática!</td>
    </tr>
    <tr>
      <td><strong>Alternativas em Alérgicos à Penicilina:</strong><br>
      • Alergia não anafilática (reação leve):<br>
      • Alergia anafilática grave (IgE-mediada):</td>
      <td><br>
      • Cefalexina oral por 10 dias;<br>
      • <strong>Azitromicina oral</strong> (12 mg/kg/dia 1x/dia por 5 dias) OU Claritromicina (15 mg/kg/dia dividida 12/12h por 10 dias).</td>
      <td>Em alérgicos anafiláticos a betalactâmicos, os macrolídeos são as drogas de escolha. Monitorar taxas locais de resistência de SBHGA aos macrolídeos (em torno de 5% a 15% no Brasil).</td>
    </tr>
  </tbody>
</table>
`
    },
    {
      id: 'complicacoes-supurativas-faringite-abscessos',
      title: '5. Complicações Supurativas da Faringite: Abscesso Periamigdalino e Retrofaríngeo',
      body_html: `
<h3>Diagnóstico Diferencial das Emergências Supurativas Cervicais Profundas</h3>
<p>Quando a infecção bacteriana tonsilar transpassa a cápsula fibrosa da amígdala ou drena para os linfonodos profundos do pescoço, formam-se coleções purulentas de alto risco de obstrução de via aérea superior e disseminação mediastinal:</p>

<h3>1. Abscesso Periamigdalino (Quinsy)</h3>
<p>É a complicação supurativa mais comum das infecções de garganta, incidindo tipicamente em <strong>adolescentes e adultos jovens</strong> (embora possa ocorrer em escolares maiores):</p>
<ul>
  <li><strong>Fisiopatologia:</strong> Ocorre disseminação da infecção tonsilar através dos túbulos de Weber na cápsula amigdaliana para o espaço virtual frouxo situado entre a cápsula da amígdala e o músculo constritor superior da faringe;</li>
  <li><strong>Manifestações Clínicas Clássicas:</strong>
    <ul>
      <li>Piora unilateral aguda da dor de garganta após alguns dias de faringite, com febre alta e prostração;</li>
      <li><strong>Trismo Marcante:</strong> Espasmo muscular reflexo doloroso do músculo pterigoideo medial, impedindo a abertura completa da boca;</li>
      <li><strong>Sialorreia Intensa:</strong> A odinofagia é tão excruciante que o paciente não consegue engolir a própria saliva e cospe continuamente;</li>
      <li><strong>"Voz em batata quente" (voz anasalada e empastada):</strong> Alteração na ressonância vocal pela tumefação faríngea;</li>
      <li><strong>Achado Físico Patognomônico:</strong> Abaulamento assimétrico exuberante da tonsila e do pilar amigdaliano anterior afetado, com <strong>desvio nítido da úvula para o lado CONTRALATERAL sadio</strong>!</li>
    </ul>
  </li>
  <li><strong>Tratamento e Abordagem:</strong>
    <ul>
      <li>Procedimento imediato de <strong>punção aspirativa com agulha calibrosa ou incisão e drenagem cirúrgica</strong> do abscesso sob anestesia local por otorrinolaringologista (alívio imediato da dor e do trismo);</li>
      <li>Internação hospitalar e antibioticoterapia parenteral de amplo espectro cobrindo <em>S. pyogenes</em>, <em>Staphylococcus aureus</em> e anaeróbios orais: <strong>Ampicilina-Sulbactam IV</strong> ou Ceftriaxona + Clindamicina IV.</li>
    </ul>
  </li>
</ul>

<h3>2. Abscesso Retrofaríngeo</h3>
<p>O abscesso retrofaríngeo acomete predominantemente <strong>lactentes e crianças menores de 3 a 4 anos de idade</strong>:</p>
<ul>
  <li><strong>Bases Anatômicas:</strong> O espaço retrofaríngeo (situado entre a fáscia bucofaríngea e a fáscia alar) contém duas cadeias de linfonodos paramedianos (linfonodos de Gilette) que recebem a drenagem linfática das fossas nasais, seios paranasais, tuba auditiva e nasofaringe. Esses linfonodos atrofiam-se e regridem fisiologicamente após os 4 a 5 anos de vida. Portanto, infecções bacterianas das vias aéreas superiores no lactente podem provocar linfadenite supurativa retrofaríngea que se rompe e forma o abscesso;</li>
  <li><strong>Quadro Clínico Típico:</strong> Lactente com febre alta, recusa alimentar completa, <strong>estridor inspiratório</strong>, salivação excessiva (sialorreia), <strong>postura de hiperextensão cervical rígida ("pescoço estendido para abrir a via aérea")</strong> e irritabilidade extrema ao tentar fletir o pescoço (mimetizando meningite!);</li>
  <li><strong>Diagnóstico por Imagem:</strong>
    <ul>
      <li><strong>Radiografia cervical em perfil estrito em inspiração e extensão:</strong> Demonstra <em>alargamento patológico do espaço retrofaríngeo pré-vertebral</em> (em C2, espessura normal &lt; 7 mm; em C6, normal &lt; 14 mm em crianças ou maior que a largura do corpo vertebral adjacente);</li>
      <li><strong>Tomografia Computadorizada de Pescoço com Contraste:</strong> Exame padrão-ouro de escolha para confirmar a coleção líquida hipodensa com realce anelar periférico e planejar a abordagem cirúrgica;</li>
    </ul>
  </li>
  <li><strong>Conduta de Emergência:</strong> Manutenção rigorosa da permeabilidade da via aérea, antibioticoterapia venosa ampla (Ampicilina-Sulbactam ou Ceftriaxona + Clindamicina ou Vancomicina se sepse estafilocócica) e <strong>drenagem cirúrgica em centro cirúrgico</strong> via transoral ou transcervical externa. Risco temido: mediastinite descendente necrotizante se o abscesso atingir o "espaço perigoso" (<em>danger space</em>).</li>
</ul>
`
    },
    {
      id: 'otite-media-aguda-fisiopatologia-diagnostico',
      title: '6. Otite Média Aguda (OMA): Fisiopatologia, Microbiologia e Otoscopia',
      body_html: `
<h3>Conceito e Epidemiologia da OMA</h3>
<p>A Otite Média Aguda (OMA) é uma infecção inflamatória bacteriana ou viral supurativa do revestimento mucoperiosteal da orelha média, de início agudo e curta duração. Constitui o principal motivo de prescrição de antibióticos na infância no mundo ocidental. Mais de 80% das crianças apresentarão pelo menos um episódio de OMA antes de completar três anos de vida, com pico de incidência entre os <strong>6 e 18 meses de idade</strong>.</p>

<h3>Fisiopatologia da Disfunção Tubária</h3>
<p>A patogênese da OMA é indissociável da anatomia e funcionalidade da <strong>Tuba Auditiva</strong>:</p>
<ol>
  <li><strong>Gatilho Inicial:</strong> Um episódio de infecção viral de vias aéreas superiores (resfriado comum) induz inflamação e edema submucoso na nasofaringe e na porção cartilaginosa da tuba auditiva;</li>
  <li><strong>Obstrução Tubária e Pressão Negativa:</strong> O edema obstrui o lúmen tubário, impedindo a aeração fisiológica da orelha média. O oxigênio e os gases aprisionados na caixa timpânica são absorvidos pela microcirculação mucosa, criando <strong>pressão negativa intratimpânica</strong>;</li>
  <li><strong>Transudação e Refluxo Bacteriano:</strong> A pressão negativa aspira secreções nasofaríngeas colonizadas por bactérias patogênicas em direção à orelha média e promove transudação serosa do endotélio capilar;</li>
  <li><strong>Supuração e Abaulamento:</strong> As bactérias proliferam no fluido estagnado, recrutam neutrófilos e produzem exsudato purulento sob alta pressão positiva, gerando <strong>dor intensa (otalgia pulsátil), abaulamento externo da membrana timpânica</strong> e, eventualmente, perfuração timpânica espontânea com otorreia purulenta.</li>
</ol>

<h3>Microbiologia da OMA Pediátrica</h3>
<p>Após a introdução e consolidação da Vacina Pneumocócica Conjugada 10-valente e 13-valente no Calendário Básico de Vacinação infantil, o perfil bacteriológico da OMA sofreu modificações dinâmicas:</p>
<table class="book-table">
  <thead>
    <tr>
      <th>Agente Patogênico</th>
      <th>Frequência Histórica vs Atual</th>
      <th>Mecanismos de Resistência aos Antimicrobianos</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Streptococcus pneumoniae<br>(Pneumococo)</strong></td>
      <td>~30% a 40% dos isolados (ainda o agente bacteriano mais comum e o mais associado a otalgia intensa, febre alta e mastoidite).</td>
      <td><strong>Alteração estrutural de PBPs (Penicillin-Binding Proteins):</strong> O pneumococo NÃO produz beta-lactamase! Sua resistência à penicilina decorre de mutações nas PBPs (1a, 2x, 2b), diminuindo a afinidade pelo fármaco. <em>Implicação decisiva:</em> Essa resistência pode ser plenamente vencida elevando-se a concentração sérica e intratimpânica da amoxicilina mediante <strong>uso de dose alta (80 a 90 mg/kg/dia)</strong>!</td>
    </tr>
    <tr>
      <td><strong>Haemophilus influenzae<br>não tipável (NTHi)</strong></td>
      <td>~35% a 45% dos isolados (frequência crescente em vacinados para pneumococo; frequentemente associado à <em>Síndrome Otite-Conjuntivite</em> simultânea).</td>
      <td><strong>Produção de Beta-lactamase (TEM-1 ou ROB-1)</strong> em até 30% a 40% das cepas, inativando a amoxicilina isolada. <em>Implicação:</em> Requer a adição de um inibidor suicida de beta-lactamase (<strong>Ácido Clavulânico</strong>) para restaurar a sensibilidade.</td>
    </tr>
    <tr>
      <td><strong>Moraxella catarrhalis</strong></td>
      <td>~10% a 15% dos isolados (geralmente causa quadros clínicos mais brandos, com menor febre e alta taxa de resolução espontânea).</td>
      <td><strong>Produção quase universal (&gt; 95%) de beta-lactamase (BRO-1 e BRO-2)</strong>. Também exige associação com ácido clavulânico.</td>
    </tr>
    <tr>
      <td><strong>Vírus Respiratórios Isolados ou em Coinfecção</strong></td>
      <td>VSR, Rinovírus, Influenza e Adenovírus estão presentes em até 20% a 40% dos aspirados de orelha média.</td>
      <td>Explicam por que muitos casos leves de OMA não respondem de imediato aos antibióticos ou resolvem-se espontaneamente.</td>
    </tr>
  </tbody>
</table>

<h3>A Otoscopia Diagnóstica Rigorosa</h3>
<p>O diagnóstico de OMA exige obrigatoriamente a combinação de três critérios:</p>
<ol>
  <li><strong>Início Agudo e Recente dos Sintomas:</strong> Otalgia relatada pela criança ou sinalizada pelo lactente (levar as mãos repetidamente aos ouvidos, esfregar a orelha, choro inconsolável noturno ao deitar, recusa alimentar e irritabilidade);</li>
  <li><strong>Presença de Efusão / Exsudato na Orelha Média:</strong> Confirmada visualmente por <strong>abaulamento da membrana timpânica</strong> ou otorreia aguda não decorrente de otite externa;</li>
  <li><strong>Sinais Inflamatórios Timpânicos Marcantes:</strong> Hiperemia intensa (eritema vermelho-fogo), opacidade e perda dos pontos de reparo anatômicos (perda do triângulo luminoso de Politzer e do processo curto do martelo).</li>
</ol>
<p><em>Sinal Semiológico de Maior Valor Preditivo:</em> <strong>O abaulamento moderado a severo da membrana timpânica é o achado otoscópico isolado com maior valor preditivo positivo (&gt; 95%)</strong> para o diagnóstico de OMA bacteriana verdadeira! A hiperemia timpânica isolada sem abaulamento possui baixíssima especificidade, pois pode ser provocada pelo choro vigoroso da criança durante o exame físico, febre alta isolada ou remoção traumática de cerume.</p>
`
    },
    {
      id: 'tratamento-oma-conduta-expectante-versus-antibioticos',
      title: '7. Conduta Terapêutica na OMA: Abordagem Expectante versus Antibioticoterapia Imediata',
      body_html: `
<h3>O Dilema Terapêutico: Tratar Todos com Antibiótico?</h3>
<p>Aproximadamente 70% a 80% dos episódios de OMA não complicada em crianças resolvem-se espontaneamente sem o uso de antibióticos em até 7 a 14 dias (especialmente as causadas por <em>M. catarrhalis</em> e vírus). As diretrizes da <em>American Academy of Pediatrics (AAP)</em> e da Sociedade Brasileira de Pediatria (SBP) estabelecem critérios rigorosos para definir quem deve receber antibioticoterapia imediata e quem pode ser mantido sob <strong>observação expectante por 48 a 72 horas</strong>:</p>

<h3>Critérios para Antibioticoterapia Imediata Obrigatória</h3>
<p>O início imediato do antibiótico é mandatário diante de qualquer um dos seguintes cenários:</p>
<ul>
  <li><strong>Idade menor de 6 meses de vida:</strong> Sempre tratar com antibiótico, independentemente da intensidade dos sintomas (alto risco de complicações e infecções bacterianas graves invasivas);</li>
  <li><strong>Qualquer criança com OMA Grave:</strong> Presença de <strong>febre &ge; 39,0°C</strong> OU <strong>otalgia moderada a severa com dor prolongada &ge; 48 horas</strong> OU toxemia aparente;</li>
  <li><strong>Crianças entre 6 meses e 24 meses incompletos com OMA Bilateral:</strong> Mesmo que o quadro seja leve/moderado, a bilateralidade nessa faixa etária associa-se fortemente a infecções bacterianas com falha espontânea;</li>
  <li><strong>Presença de Otorreia Aguda:</strong> Drenagem espontânea de secreção purulenta por perfuração timpânica aguda (não atribuível a otite externa).</li>
</ul>

<h3>Critérios para Conduta Expectante Inicial (Watchful Waiting - 48 a 72h)</h3>
<p>A conduta expectante consiste em prescrever analgesia otimizada e agendar reavaliação clínica presencial rigorosa em 48 a 72 horas (ou entregar receita médica "de resgate" para os pais comprarem o antibiótico somente se a criança não melhorar ou piorar em 48-72h). <strong>Pode ser adotada exclusivamente quando:</strong></p>
<ol>
  <li>A criança tem <strong>idade &ge; 6 meses a 2 anos com OMA unilateral leve</strong> (sem febre &ge; 39°C e com dor leve); OU</li>
  <li>A criança tem <strong>idade &ge; 2 anos com OMA unilateral ou bilateral leve</strong>; E</li>
  <li><strong>Condição essencial:</strong> Os pais são comprovadamente confiáveis, compreendem as orientações de alarme e existe garantia irrestrita de acompanhamento e reavaliação médica em 48 a 72 horas! Se o seguimento não puder ser plenamente assegurado (família em situação de vulnerabilidade, que mora longe do serviço), o antibiótico deve ser iniciado imediatamente.</li>
</ol>

<h3>Esquema Antimicrobiano de Escolha: Por que Dose Alta de Amoxicilina?</h3>
<table class="book-table">
  <thead>
    <tr>
      <th>Linha de Tratamento</th>
      <th>Antimicrobiano e Posologia</th>
      <th>Justificativa Farmacológica e Indicação Clínica</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Primeira Escolha Padrão</strong></td>
      <td><strong>Amoxicilina oral em DOSE ALTA:<br>80 a 90 mg/kg/dia</strong> dividida em 2 tomadas diárias (de 12/12 horas).<br>
      • Duração: <strong>10 dias</strong> se &lt; 2 anos ou casos graves;<br>
      • <strong>7 dias</strong> se 2 a 5 anos leve/moderada;<br>
      • <strong>5 a 7 dias</strong> se &ge; 6 anos leve.</td>
      <td>A dose convencional de amoxicilina (40 a 50 mg/kg/dia) não atinge concentração inibitória mínima (CIM) suficiente no líquido da orelha média para erradicar cepas de <em>Streptococcus pneumoniae</em> com resistência intermediária por alteração de PBPs. A dose dobrada de <strong>80-90 mg/kg/dia satura as PBPs mutadas e cura mais de 90% dos casos</strong> com segurança e baixo custo.</td>
    </tr>
    <tr>
      <td><strong>Primeira Escolha Alternativa:<br>Amoxicilina + Clavulanato</strong></td>
      <td><strong>Amoxicilina-Clavulanato oral em DOSE ALTA:<br>90 mg/kg/dia de amoxicilina + 6,4 mg/kg/dia de clavulanato</strong> (proporção 14:1) de 12/12 horas.</td>
      <td><strong>Indicações formais para iniciar diretamente com Clavulanato:</strong><br>
      1. Criança que usou amoxicilina ou outro betalactâmico nos <strong>últimos 30 dias</strong> (alta probabilidade de colonização por <em>H. influenzae</em> produtor de beta-lactamase);<br>
      2. <strong>Síndrome Otite-Conjuntivite simultânea</strong> (conjuntivite purulenta ipsilateral associada à OMA quase sempre causada por <em>H. influenzae</em> não tipável);<br>
      3. História de OMA recorrente não responsiva à amoxicilina isolada.</td>
    </tr>
    <tr>
      <td><strong>Falha Terapêutica após 48 a 72h de Amoxicilina</strong></td>
      <td>Trocar para <strong>Amoxicilina-Clavulanato (90 mg/kg/dia)</strong> OU<br>
      <strong>Ceftriaxona intramuscular (50 mg/kg/dia) por 3 dias consecutivos</strong>.</td>
      <td>Se a criança persistir com febre ou otalgia importante após 72 horas de amoxicilina dose alta, assume-se infecção por <em>H. influenzae</em> produtor de beta-lactamase ou pneumococo altamente resistente.</td>
    </tr>
    <tr>
      <td><strong>Alérgicos à Penicilina:</strong><br>• Alergia não severa:<br>• Anafilaxia imediata:</td>
      <td><br>• Cefuroxima axetil oral (30 mg/kg/dia) ou Cefdinir;<br>• Claritromicina oral ou Azitromicina.</td>
      <td>Em reações anafiláticas tipo I, macrolídeos são alternativas, embora tenham taxas de falha microbiológica de até 20% a 30% em OMA.</td>
    </tr>
  </tbody>
</table>
`
    },
    {
      id: 'mastoidite-aguda-e-complicacoes-da-oma',
      title: '8. Complicação Grave: Mastoidite Aguda e Disseminação Infecciosa',
      body_html: `
<h3>Mastoidite Aguda: O Que o Pediatra Precisa Reconhecer</h3>
<p>A orelha média comunica-se diretamente com as células aeradas da mastoide através do <em>aditus ad antrum</em>. Embora uma inflamação subclínica da mucosa mastóidea ocorra na maioria das OMAs (mastoidismo), a <strong>Mastoidite Aguda Supurativa Coalescente</strong> constitui uma infecção bacteriana destrutiva com reabsorção e lise dos septos ósseos das trabéculas mastóideas (osteíte necrotizante):</p>
<ul>
  <li><strong>Incidência e Fatores de Risco:</strong> Complicação bacteriana mais frequente da OMA, acometendo principalmente crianças menores de 2 anos de idade, frequentemente após episódio de OMA tratado inadequadamente ou com falha terapêutica;</li>
  <li><strong>Tríade Clínica Semiológica Clássica:</strong>
    <ol>
      <li><strong>Dor, edema, calor e eritema na região retroauricular</strong> sobre a apófise mastoide;</li>
      <li><strong>Apagamento do sulco retroauricular</strong> pelo edema subperiosteal inflamatório;</li>
      <li><strong>Desvio anterolateral do pavilhão auricular ("orelha em abano" unilateral patológica)</strong>.</li>
    </ol>
  </li>
  <li><strong>Sinais de Gravidade Adicionais:</strong> Febre alta persistente, toxemia, abaulamento com flutuação local (indicando formação de abscesso subperiosteal) e queda da parede póstero-superior do canal auditivo externo na otoscopia;</li>
  <li><strong>Conduta Hospitalar Imediata:</strong>
    <ul>
      <li><strong>Internação hospitalar obrigatória</strong>;</li>
      <li><strong>Tomografia Computadorizada de Ossos Temporais com Contraste:</strong> Exame padrão-ouro mandatória para confirmar a coalescência dos septos ósseos trabeculares e descartar complicações intracranianas;</li>
      <li><strong>Antibioticoterapia Parenteral de Amplo Espectro:</strong> <strong>Ceftriaxona IV (100 mg/kg/dia)</strong> associada a <strong>Oxacilina IV</strong> (ou Vancomicina se suspeita de MRSA), mantida por via venosa até melhora clínica franca e completando 14 a 21 dias totais;</li>
      <li><strong>Abordagem Otorrinolaringológica:</strong> Timpanocentese/miringotomia para alívio de pressão e cultura do exsudato; drenagem cirúrgica de abscesso subperiosteal e mastoidectomia cortical nos casos com coalescência óssea avançada ou refratários ao tratamento venoso após 48 horas.</li>
    </ul>
  </li>
</ul>

<h3>Outras Complicações da OMA</h3>
<p>As complicações da OMA dividem-se em intratemporais e intracranianas:</p>
<table class="book-table">
  <thead>
    <tr>
      <th>Complicações Intratemporais</th>
      <th>Complicações Intracranianas (Potencialmente Fatais)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>• <strong>Mastoidite Aguda</strong> (mais frequente);<br>
      • <strong>Paralisia Facial Periférica (VII par craniano):</strong> Por deiscência congênita do canal de Falópio e compressão inflamatória do nervo facial;<br>
      • <strong>Labirintite Supurativa:</strong> Vertigem intensa, nistagmo espontâneo e perda auditiva neurossensorial irreversível;<br>
      • <strong>Petrosite Aguda (Síndrome de Gradenigo):</strong> Tríade de OMA supurativa + dor retro-orbitária por nevralgia do trigêmeo (V par) + paralisia do nervo abducente (VI par).</td>
      <td>• <strong>Meningite Bacteriana Secundária</strong> (complicação intracraniana mais comum);<br>
      • <strong>Trombose Séptica do Seio Lateral / Sigmoide:</strong> Febre em picos sépticos, cefaleia e hipertensão intracraniana;<br>
      • <strong>Abscesso Cerebral Temporal ou Cerebelar;</strong><br>
      • <strong>Abscesso Epidural e Subdural (Empiema Subdural).</strong></td>
    </tr>
  </tbody>
</table>
`
    },
    {
      id: 'rinossinusite-bacteriana-aguda-e-chandler',
      title: '9. Rinossinusite Bacteriana Aguda e Complicações Orbitárias de Chandler',
      body_html: `
<h3>Desenvolvimento Anatômico dos Seios Paranasais na Infância</h3>
<p>Para diagnosticar a rinossinusite na criança, é indispensável conhecer a cronologia de pneumatização dos seios da face:</p>
<ul>
  <li><strong>Seios Etmoidais e Maxilares:</strong> Presentes desde o nascimento e já pneumatizados nos primeiros meses de vida. Portanto, o lactente jovem e o pré-escolar já podem desenvolver <em>etmoidite</em> e <em>sinusite maxilar</em>!;</li>
  <li><strong>Seios Esfenoidais:</strong> Iniciam pneumatização em torno dos 3 a 5 anos de vida;</li>
  <li><strong>Seios Frontais:</strong> São os últimos a se desenvolverem; iniciam sua aeração por volta dos 6 a 8 anos e completam seu desenvolvimento apenas na adolescência (10 a 14 anos). <em>Armadilha:</em> Jamais diagnosticar sinusite frontal em lactentes ou pré-escolares!</li>
</ul>

<h3>Os Três Critérios Diagnósticos Clínicos da Rinossinusite Bacteriana Aguda</h3>
<p>Mais de 90% a 95% dos episódios de sinusite na infância iniciam-se como rinossinusite viral autolimitada associada ao resfriado comum. A <strong>Rinossinusite Bacteriana Aguda (RBA)</strong> ocorre como complicação bacteriana secundária em apenas 5% a 10% dos resfriados. As diretrizes da SBP e da AAP determinam que o diagnóstico de RBA é <strong>estritamente clínico</strong> e exige a presença de um dos três padrões evolutivos:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Padrão Clínico Diagnóstico</th>
      <th>Descrição Semiológica e Critérios Temporais</th>
      <th>Implicação Terapêutica</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>1. Sintomas Persistentes<br>(Mais Comum — ~70% dos casos)</strong></td>
      <td>Secreção nasal (qualquer aspecto: hialina, mucopurulenta ou espessa) e/ou tosse diurna que <strong>persistem por mais de 10 dias consecutivos sem qualquer sinal de melhora clínica</strong>.</td>
      <td>O resfriado comum melhora entre o 7º e o 10º dia. Se não há melhora aos 10 dias completos, fecha-se diagnóstico de RBA. Iniciar Amoxicilina.</td>
    </tr>
    <tr>
      <td><strong>2. Início Severo / Grave<br>(~10% a 15% dos casos)</strong></td>
      <td>Quadro agudo que se inicia com <strong>febre alta (&ge; 39,0°C) acompanhada de coriza nasal francamente purulenta</strong> por pelo menos <strong>3 a 4 dias consecutivos</strong>, com toxemia ou dor facial.</td>
      <td>Diferencia-se do resfriado comum porque a febre do resfriado dura apenas 24 a 48h. Febre &ge; 39°C purulenta por 3-4 dias contínuos indica infecção bacteriana imediata.</td>
    </tr>
    <tr>
      <td><strong>3. Piora Consecutiva ou Curso Bifásico<br>("Double Sickening" — ~15% dos casos)</strong></td>
      <td>Criança com resfriado comum que vinha apresentando melhora clínica progressiva após os primeiros dias, mas subitamente apresenta <strong>piora abrupta com novo pico febril, aumento da tosse e ressurgimento de secreção purulenta</strong> por volta do 6º ao 7º dia.</td>
      <td>Indica sobreinfecção bacteriana secundária em cavidade sinusal previamente bloqueada pelo vírus.</td>
    </tr>
  </tbody>
</table>

<p><em>Exames Radiológicos:</em> <strong>A radiografia simples de seios da face (incidências de Waters e Caldwell) é formalmente CONTRAINDICADA e desaconselhada</strong> na criança menor de 6 anos! Possui altas taxas de falsos-positivos (o resfriado comum viral gera espessamento mucoso e velamento sinusal transitório indistinguíveis da sinusite bacteriana) e submete a criança à radiação ionizante inútil. A Tomografia Computadorizada é reservada exclusivamente para suspeita de complicações orbitárias ou intracranianas.</p>

<h3>Tratamento Antimicrobiano da Rinossinusite</h3>
<p>Primeira escolha: <strong>Amoxicilina oral em dose alta (80 a 90 mg/kg/dia) por 10 a 14 dias</strong> (ou até 7 dias após a resolução completa dos sintomas). Se houver histórico de antibiótico nos últimos 30 dias, creche ou falha terapêutica em 72h: associar Clavulanato (90 mg/kg/dia de amoxicilina).</p>

<h3>Complicações Orbitárias da Sinusite: A Classificação de Chandler</h3>
<p>Pela extrema proximidade anatômica entre os seios etmoidais e a órbita (separados apenas pela delgada e perfurada <em>lâmina papirácea</em> do etmoide), a celulite orbitária é a complicação supurativa mais frequente da etmoidite na infância. A <strong>Classificação de Chandler</strong> estratifica a gravidade:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Grau de Chandler</th>
      <th>Denominação Clínica</th>
      <th>Achados Clínicos Distintivos</th>
      <th>Conduta Terapêutica</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Grau I</strong></td>
      <td><strong>Celulite Pré-Septal (Periorbitária)</strong></td>
      <td>Edema e eritema inflamatório restritos à pálpebra e tecidos <strong>anteriores ao septo orbitário</strong>. Acuidade visual normal, motilidade ocular extrínseca <strong>totalmente preservada e indolor</strong>, sem proptose e reflexos pupilares normais.</td>
      <td>Amoxicilina-Clavulanato oral se criança &gt; 1 ano e quadro leve com acompanhamento ambulatorial assegurado; internar se lactente ou quadro febril moderado.</td>
    </tr>
    <tr>
      <td><strong>Grau II</strong></td>
      <td><strong>Celulite Pós-Septal (Orbitária Verdadeira)</strong></td>
      <td>A infecção ultrapassou o septo orbitário. Surge <strong>quemose (edema conjuntival), proptose (globo ocular projetado para a frente), dor à movimentação ocular e limitação da motilidade extrínseca (oftalmoplegia)</strong>. Acuidade visual pode estar preservada inicialmente.</td>
      <td><strong>Internação hospitalar obrigatória de emergência</strong>; TC de órbitas e seios com contraste; Ceftriaxona IV + Oxacilina (ou Vancomicina); avaliação da oftalmologia e otorrino.</td>
    </tr>
    <tr>
      <td><strong>Grau III</strong></td>
      <td><strong>Abscesso Subperiosteal</strong></td>
      <td>Coleção purulenta entre a lâmina papirácea e o periósteo orbitário. Proptose acentuada com desvio ocular inferolateral, oftalmoplegia e risco de compressão do nervo óptico com queda da acuidade visual.</td>
      <td>Internação hospitalar, antibioticoterapia parenteral e <strong>drenagem cirúrgica urgente</strong> (endoscópica nasal ou externa).</td>
    </tr>
    <tr>
      <td><strong>Grau IV</strong></td>
      <td><strong>Abscesso Orbitário Retrobulbar</strong></td>
      <td>Coleção purulenta no interior do cone muscular retrobulbar. Oftalmoplegia completa, proptose severa, dor intensa e <strong>perda visual rápida e progressiva</strong>.</td>
      <td>Drenagem cirúrgica de emergência absoluta para descompressão orbitária e antibióticos IV de amplo espectro.</td>
    </tr>
    <tr>
      <td><strong>Grau V</strong></td>
      <td><strong>Trombose Séptica do Seio Cavernoso</strong></td>
      <td>Disseminação retrógrada da infecção pelas veias oftálmicas avalvulares para o seio cavernoso intracraniano. <strong>Sintomas tornam-se bilaterais</strong>: proptose contralateral rápida, quemose bilateral, acometimento dos pares cranianos III, IV, V1, V2 e VI (oftalmoplegia total fixa e anestesia frontal), toxemia extrema e coma.</td>
      <td>UTI pediátrica, antibioticoterapia parenteral tripla em doses meníngeas (Ceftriaxona + Oxacilina/Vancomicina + Metronidazol) e anticoagulação plena seletiva. Mortalidade elevadíssima.</td>
    </tr>
  </tbody>
</table>
`
    },
    {
      id: 'laringite-aguda-crupe-viral-versus-epiglotite',
      title: '10. Laringite Estridulosa (Crupe Viral) versus Epiglotite Aguda Bacteriana',
      body_html: `
<h3>O Estridor Laríngeo na Emergência Pediátrica</h3>
<p>O <strong>estridor</strong> é um som respiratório ruidoso, áspero e de tonalidade musical aguda, gerado pelo fluxo aéreo turbulento que passa através de um segmento estreitado da via aérea extratorácica (laringe, traqueia subglótica ou hipofaringe). É predominantemente <strong>inspiratório</strong> nas obstruções glóticas e subglóticas.</p>
<p>O grande desafio do médico de plantão é diferenciar com rapidez cirúrgica as duas causas clássicas de estridor inflamatório agudo: a <strong>Laringite Estridulosa Aguda (Crupe Viral)</strong> e a temida <strong>Epiglotite Aguda Bacteriana</strong>.</p>

<h3>1. Laringite Estridulosa Aguda (Crupe Viral / Laringotraqueobronquite Aguda)</h3>
<p>É a causa mais comum de obstrução respiratória alta na infância, com pico de incidência entre os <strong>6 meses e 3 anos de idade</strong> (especialmente no 2º ano de vida), com predomínio no outono e inverno:</p>
<ul>
  <li><strong>Etiologia Viral:</strong> <strong>Vírus Parainfluenza humano tipos 1 e 2</strong> (responsáveis por mais de 70% a 80% dos casos), seguidos por VSR, Adenovírus, Rinovírus e Influenza A e B;</li>
  <li><strong>Fisiopatologia:</strong> Inflamação e edema submucoso na <strong>região subglótica (abaixo das cordas vocais, ao nível do anel cricoide)</strong>, diminuindo drasticamente o lúmen da via aérea;</li>
  <li><strong>Tríade Clínica Clássica:</strong>
    <ol>
      <li><strong>Tosse metálica característica</strong> (frequentemente descrita como "tosse de cachorro", "tosse ladrante" ou "tosse de foca");</li>
      <li><strong>Rouquidão ou disfonia</strong> (acometimento das cordas vocais);</li>
      <li><strong>Estridor inspiratório</strong> (que piora com o choro, agitação ou esforço físico).</li>
    </ol>
  </li>
  <li><strong>Evolução Típica:</strong> Precedida por 1 a 3 dias de sintomas catarrais leves (coriza, febre baixa), com piora súbita da tosse ladrante e do estridor durante a madrugada;</li>
  <li><strong>Escore de Gravidade de Westley:</strong> Avalia 5 parâmetros (estridor, tiragens, entrada de ar, cianose e nível de consciência) para classificar o crupe em leve, moderado, grave e insuficiência respiratória iminente;</li>
  <li><strong>Achado Radiológico Típico (Cervical em AP):</strong> <strong>Sinal da "Torre de Igreja" ou "Ponta de Lápis"</strong> (estreitamento cônico e afunilado simétrico da coluna aérea traqueal subglótica). <em>Nota:</em> O raio-X é dispensável nos casos típicos e nunca deve atrasar o tratamento medicamentoso imediato!</li>
</ul>

<h3>Tratamento Padrão-Ouro do Crupe Viral</h3>
<table class="book-table">
  <thead>
    <tr>
      <th>Gravidade do Crupe</th>
      <th>Quadro Clínico Apresentado</th>
      <th>Conduta Farmacológica Padrão-Ouro</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Crupe Leve</strong></td>
      <td>Tosse ladrante e rouquidão ocasionais; <strong>estridor inspiratório AUSENTE em repouso</strong> (surge apenas quando a criança chora vigorosamente ou se agita); sem tiragens de esforço respiratório.</td>
      <td><strong>Dexametasona oral em dose única: 0,15 a 0,6 mg/kg (máx. 16 mg)</strong>.<br>
      Orientações gerais, hidratação, manter a criança calma no colo dos pais. Alta hospitalar com orientações de retorno.</td>
    </tr>
    <tr>
      <td><strong>Crupe Moderado a Grave</strong></td>
      <td><strong>Estridor inspiratório PRESENTE em repouso</strong>; tiragens subcostais/intercostais, batimento de asa nasal, agitação psicomotora ou retração de fúrcula esternal.</td>
      <td>1. <strong>Nebulização imediata com Adrenalina comum (1:1.000):</strong> Dose de <strong>0,5 mL/kg (mínimo 2 a 3 mL, máximo 5 mL pura, sem diluir)</strong> em oxigênio a 6-8 L/min. A adrenalina produz vasoconstrição alfa-adrenérgica rápida dos capilares mucosos, reduzindo o edema subglótico em 10 a 30 minutos;<br>
      2. <strong>Dexametasona oral, IM ou IV: 0,6 mg/kg em dose única</strong>;<br>
      3. <strong>Período Obrigatório de Observação no Pronto-Socorro: MÍNIMO DE 2 A 4 HORAS</strong> após a nebulização com adrenalina! <em>Motivo crucial:</em> A adrenalina tem ação curta (meia-vida de 1 a 2 horas). Se houver <strong>efeito rebote</strong> (reaparecimento do estridor e do desconforto quando o efeito da adrenalina passa), a criança necessita de novas nebulizações e internação em enfermaria ou UTI!</td>
    </tr>
  </tbody>
</table>

<h3>2. Epiglotite Aguda Bacteriana (Supraglotite)</h3>
<p>A Epiglotite Aguda é uma emergência infecciosa hiperaguda com <strong>risco iminente de óbito por asfixia mecânica total em questão de minutos ou poucas horas</strong>:</p>
<ul>
  <li><strong>Etiologia Clássica:</strong> <em>Haemophilus influenzae</em> tipo b (Hib). Historicamente era uma das infecções mais temidas da pediatria. Com a inclusão da vacina conjugada contra Hib no calendário básico de vacinação (vacina Pentavalente no Brasil aos 2, 4 e 6 meses), sua incidência despencou em mais de 95% a 99%! Atualmente ocorre quase exclusivamente em <strong>crianças desvacinadas ou com esquema incompleto</strong> (ou por <em>Streptococcus pneumoniae</em> e <em>S. aureus</em> em vacinados);</li>
  <li><strong>Quadro Clínico Dramático ("Os Quatro D's"):</strong>
    <ul>
      <li>Início hiperagudo fulminante (evolução em menos de 6 a 12 horas);</li>
      <li>Febre alta (&gt; 39°C a 40°C), aspecto séptico/tóxico exuberante;</li>
      <li><strong>Disfagia grave e Dor de garganta intolerável;</strong></li>
      <li><strong>Drooling (Sialorreia profusa):</strong> A criança não consegue engolir saliva e baba continuamente;</li>
      <li><strong>Dysphonia:</strong> Voz abafada e sussurrada ("voz em batata quente"), sem tosse ladrante;</li>
      <li><strong>Dyspnea:</strong> Desconforto respiratório grave com estridor inspiratório;</li>
      <li><strong>Posição em Tripé (Patognomônica):</strong> A criança senta-se inclinada para a frente, apoiada sobre as mãos estendidas, com o pescoço hiperextendido e a mandíbula projetada para a frente, tentando desesperadamente manter a via aérea permeável.</li>
    </ul>
  </li>
  <li><strong>A REGRA DE OURO DA EMERGÊNCIA: NÃO MANIPULAR A OROFARINGE!</strong>
    <div class="book-alert">
    <p><strong>ATENÇÃO MÁXIMA PARA PROVAS: É FORMALMENTE PROIBIDO:</strong><br>
    • Utilizar abaixador de língua para examinar a garganta da criança;<br>
    • Tentar puncionar veias periféricas ou realizar coletas de sangue com a criança agitada;<br>
    • Deitar a criança em decúbito dorsal forçado;<br>
    • Transportar a criança desacompanhada para setores distantes de radiologia.<br>
    <em>Justificativa:</em> O estímulo doloroso, o choro vigoroso ou o toque do abaixador na base da língua deflagram <strong>laringoespasmo reflexo súbito com colapso respiratório completo e parada cardiorrespiratória imediata</strong>!</p>
    </div>
  </li>
  <li><strong>Achado Radiológico (Cervical em Perfil):</strong> Realizado apenas se o paciente estiver estável e dentro da sala de emergência com via aérea assegurada. Revela o <strong>"Sinal do Polegar" (Thumb Sign)</strong> — epiglote tumefeita, edemaciada e arredondada projetando-se na via aérea supraglótica;</li>
  <li><strong>Manejo de Emergência Definitivo:</strong>
    <ol>
      <li>Manter a criança o mais calma possível, no colo da mãe, com oxigênio inalatório umidificado passivo ("em tenda");</li>
      <li><strong>Transferência imediata para o Centro Cirúrgico</strong> acompanhado pelo anestesiologista, cirurgião pediátrico ou otorrinolaringologista de retaguarda;</li>
      <li><strong>Intubação Traqueal Sob Anestesia Geral Inalatória</strong> (com tubo traqueal 0,5 a 1 número menor que o habitual devido ao edema da glote) ou realização de traqueostomia/cricotireoidostomia de resgate se intubação impossível;</li>
      <li>Após a via aérea cirúrgica assegurada: coletar hemoculturas e iniciar <strong>Ceftriaxona IV (100 mg/kg/dia)</strong> ou Cefotaxima associada a Oxacilina/Vancomicina por 7 a 10 dias.</li>
    </ol>
  </li>
</ul>

<h3>Tabela de Diagnóstico Diferencial Rápido: Crupe Viral vs Epiglotite Aguda</h3>
<table class="book-table">
  <thead>
    <tr>
      <th>Parâmetro Clínico</th>
      <th>Laringite Estridulosa (Crupe Viral)</th>
      <th>Epiglotite Aguda Bacteriana</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Agente Etiológico</strong></td>
      <td><strong>Vírus Parainfluenza 1 e 2</strong> (viral autolimitada).</td>
      <td><strong><em>Haemophilus influenzae</em> tipo b (Hib)</strong> em não vacinados.</td>
    </tr>
    <tr>
      <td><strong>Faixa Etária Típica</strong></td>
      <td><strong>6 meses a 3 anos</strong> (lactentes e pré-escolares).</td>
      <td><strong>2 a 7 anos</strong> (crianças maiores em creches/escolas).</td>
    </tr>
    <tr>
      <td><strong>Início do Quadro</strong></td>
      <td>Pródromo catarral de 1 a 3 dias; piora noturna.</td>
      <td><strong>Hiperagudo e fulminante (poucas horas)</strong>.</td>
    </tr>
    <tr>
      <td><strong>Estado Geral / Toxemia</strong></td>
      <td>Estado geral preservado ou moderado; não tóxico.</td>
      <td><strong>Aparência séptica grave, toxemia extrema</strong>.</td>
    </tr>
    <tr>
      <td><strong>Febre</strong></td>
      <td>Ausente ou febre baixa a moderada (&lt; 38,5°C).</td>
      <td><strong>Febre alta constante (&gt; 39,0°C a 40°C)</strong>.</td>
    </tr>
    <tr>
      <td><strong>Tosse</strong></td>
      <td><strong>Tosse metálica "ladrante" / de cachorro marcante</strong>.</td>
      <td><strong>AUSENTE</strong> (dói demais para tossir).</td>
    </tr>
    <tr>
      <td><strong>Sialorreia (Babar)</strong></td>
      <td>Ausente (a deglutição está preservada).</td>
      <td><strong>PRESENTE e profusa (drooling)</strong> pela disfagia extrema.</td>
    </tr>
    <tr>
      <td><strong>Postura Corporal</strong></td>
      <td>Decúbito variável; prefere o colo dos pais.</td>
      <td><strong>Posição em tripé obrigatória</strong> (tronco anteriorizado).</td>
    </tr>
    <tr>
      <td><strong>Exame da Orofaringe</strong></td>
      <td>Pode ser examinado com cuidado.</td>
      <td><strong>TERMINANTEMENTE PROIBIDO manipular!</strong></td>
    </tr>
    <tr>
      <td><strong>Sinal Radiológico Típico</strong></td>
      <td><strong>Sinal da Torre de Igreja / Ponta de Lápis</strong> (AP).</td>
      <td><strong>Sinal do Polegar (Thumb Sign)</strong> (Perfil estrito).</td>
    </tr>
    <tr>
      <td><strong>Tratamento Inicial</strong></td>
      <td><strong>Dexametasona dose única + Adrenalina inalatória</strong>.</td>
      <td><strong>Via aérea cirúrgica em CC + Ceftriaxona venosa</strong>.</td>
    </tr>
  </tbody>
</table>
`
    },
    {
      id: 'casos-clinicos-estruturados-ivas',
      title: '11. Casos Clínicos Estruturados com Discussão Diagnóstica Passo a Passo',
      body_html: `
<h3>Caso Clínico 1: O Perigo da Intoxicação por Descongestionante Tópico no Lactente</h3>
<p><strong>Identificação e História:</strong> Lactente de 11 meses de vida, previamente hígido, é trazido em estado de extrema sonolência e hipotermia à sala de emergência pediátrica. A mãe relata que a criança apresentava quadro de resfriado comum há dois dias, com muita congestão nasal e dificuldade para mamar. Orientada por uma vizinha, a mãe comprou em uma farmácia um frasco de descongestionante nasal à base de <strong>Nafazolina</strong> e instilou 3 a 4 gotas em cada narina a cada 3 horas ao longo do dia. Cerca de duas horas após a última dose, a criança tornou-se profundamente prostrada, fria e difícil de acordar.</p>
<p><strong>Exame Físico de Entrada:</strong></p>
<ul>
  <li>Estado Geral: Criança torporosa, com resposta apenas a estímulos dolorosos intensos, hipotônica;</li>
  <li>Sinais Vitais: Frequência Cardíaca = 62 bpm (bradicardia severa para a idade, cujo limite inferior normal é ~100 bpm); Frequência Respiratória = 18 irpm com respiração irregular e superficial; Pressão Arterial = 65/38 mmHg (hipotensão arterial grave); Temperatura axilar = 34,8°C (hipotermia grave); Saturação de O2 = 91% em ar ambiente;</li>
  <li>Pupilas: Miose puntiforme bilateral simétrica; perfusão periférica lentificada (tempo de enchimento capilar de 4 segundos).</li>
</ul>
<p><strong>Raciocínio Clínico e Conduta de Emergência:</strong></p>
<p>O quadro clínico decorre de <strong>intoxicação exógena grave por derivados imidazólicos (Nafazolina / Oximetazolina)</strong>. Essas substâncias são potentes agonistas dos receptores alfa-2 adrenérgicos centrais e alfa-1 periféricos. Na criança pequena, a absorção mucosa é quase total e a barreira hematoencefálica é imatura, mimetizando uma intoxicação por clonidina ou opioides: sedação central profunda, bradicardia, hipotensão, bradipneia e hipotermia.</p>
<p><strong>Manejo:</strong> Estabilização de via aérea (intubação se apneia), expansão volêmica cautelosa com cristaloide, aquecimento corporal progressivo e monitorização contínua em UTI pediátrica. O resfriado deve ser manejado estritamente com lavagem nasal com solução fisiológica a 0,9%!</p>

<h3>Caso Clínico 2: Faringite Estreptocócica com Petéquias no Palato</h3>
<p><strong>Identificação e Queixa:</strong> Menino de 8 anos é levado à UBS com história de início súbito de febre de 39,2°C e dor de garganta intensa iniciadas há 24 horas. Queixa-se de náuseas e dor abdominal periumbilical. A mãe nega tosse, nega espirros, coriza ou diarreia.</p>
<p><strong>Exame Físico:</strong></p>
<ul>
  <li>Criança febril, fácies de dor ao engolir;</li>
  <li>Oroscopia: Tonsilas palatinas hipertrofiadas (grau III), intensamente congestas, cobertas por exsudato purulento esbranquiçado em placas confluentes; presença de <strong>inúmeras petéquias puntiformes no palato mole</strong>; língua com papilas hipertrofiadas ("língua em morango");</li>
  <li>Pescoço: Linfonodomegalia submandibular e jugulodigástrica anterior bilateral, com gânglios palpáveis de 2 cm, móveis e extremamente dolorosos;</li>
  <li>Aparelho respiratório: murmúrio vesicular universalmente audível, sem ruídos adventícios. Ausência total de tosse ou coriza.</li>
</ul>
<p><strong>Raciocínio Clínico e Prescrição:</strong></p>
<p>O paciente preenche <strong>5 pontos no Escore de McIsaac</strong>: febre &gt; 38°C (+1), ausência de tosse (+1), exsudato tonsilar (+1), adenomegalia cervical anterior dolorosa (+1) e idade entre 3 e 14 anos (+1). A probabilidade de infecção por <em>Streptococcus pyogenes</em> (SBHGA) é superior a 50% a 60%. As petéquias no palato são fortemente sugestivas.</p>
<p><strong>Conduta Terapêutica:</strong> O objetivo prioritário é a <strong>prevenção primária de Febre Reumática</strong>. Como o paciente pesa 28 kg (&ge; 27 kg), a prescrição padrão-ouro é <strong>Penicilina G Benzatina 1.200.000 UI em dose única intramuscular profunda</strong>. Alternativa oral: Amoxicilina 50 mg/kg/dia dividida de 12/12h por 10 dias completos.</p>

<h3>Caso Clínico 3: Otite Média Aguda com Perfuração e Abaulamento</h3>
<p><strong>Identificação e História:</strong> Lactente feminina de 14 meses é levada à UPA pelos pais por febre de 38,8°C e irritabilidade extrema iniciadas há 2 dias. Os pais referem que a criança chora copiosamente durante a noite, acorda aos gritos e passa o dia puxando e esfregando a orelha direita. Teve pródromo de coriza hialina há 4 dias. Nega uso de antibióticos nos últimos 6 meses. Não frequenta creche.</p>
<p><strong>Exame Físico:</strong></p>
<ul>
  <li>Otoscopia da Orelha Esquerda: Membrana timpânica translúcida, cinza-perolada, com triângulo luminoso preservado e boa mobilidade;</li>
  <li>Otoscopia da Orelha Direita: <strong>Abaulamento externo acentuado da membrana timpânica</strong>, coloração vermelho-fogo intensa, perda de todos os pontos de reparo ósseos e ausência de mobilidade timpânica; sem secreção no canal auditivo externo; mastoide sem sinais flogísticos.</li>
</ul>
<p><strong>Discussão e Conduta Farmacológica:</strong></p>
<p>Trata-se de <strong>Otite Média Aguda unilateral</strong> em lactente de 14 meses, confirmada pelo abaulamento timpânico evidente (valor preditivo &gt; 95%). Por ter febre &ge; 38,8°C e dor intensa, classifica-se como moderada a grave, exigindo antibioticoterapia imediata.</p>
<p><strong>Prescrição de Primeira Escolha: Amoxicilina oral em dose alta de 90 mg/kg/dia</strong> dividida em duas tomadas de 12/12h, com duração de <strong>10 dias completos</strong> (pela idade &lt; 2 anos). Como a criança não usou antibióticos nos últimos 30 dias e não apresenta conjuntivite associada, <em>não há indicação inicial de clavulanato</em>. Analgesia associada com dipirona ou ibuprofeno.</p>

<h3>Caso Clínico 4: Laringite Estridulosa (Crupe) com Estridor em Repouso</h3>
<p><strong>Identificação e Queixa:</strong> Menino de 2 anos e 3 meses acorda às 2 horas da madrugada com tosse muito rouca, descrita pela mãe como "latido de cachorro", e uma respiração ruidosa e estridente. É trazido imediatamente ao pronto-socorro infantil. A mãe relata que ele estava apenas com nariz escorrendo nos últimos 2 dias, sem febre.</p>
<p><strong>Exame Físico de Entrada:</strong></p>
<ul>
  <li>Criança ansiosa no colo da mãe, afebril (37,2°C), com rouquidão marcante;</li>
  <li>Ao respirar tranquilamente em repouso, ausculta-se <strong>estridor inspiratório evidente e constante</strong>;</li>
  <li>Presença de tiragem subcostal leve e retração moderada de fúrcula esternal; ausência de batimento de asa de nariz;</li>
  <li>Saturação de O2 = 94% em ar ambiente; cavidade oral sem sialorreia, aceita água normalmente, sem postura em tripé.</li>
</ul>
<p><strong>Raciocínio Clínico e Conduta Imediata:</strong></p>
<p>O paciente apresenta <strong>Crupe Viral Moderado a Grave</strong>, definido pela presença de <strong>estridor em repouso associado a retrações da caixa torácica</strong>. O agente etiológico clássico é o vírus Parainfluenza.</p>
<p><strong>Conduta Farmacológica e Observação:</strong></p>
<ol>
  <li><strong>Nebulização imediata com Adrenalina comum (1:1.000):</strong> 3 a 5 mL pura, sob fluxo contínuo de oxigênio a 6-8 L/min;</li>
  <li><strong>Dexametasona por via oral:</strong> 0,6 mg/kg em dose única;</li>
  <li><strong>Observação Clínica Obrigatória de 2 a 4 Horas:</strong> Manter a criança monitorizada no pronto-socorro para vigiar o <em>efeito rebote</em> após o término da ação da adrenalina. Se após 3 a 4 horas a criança mantiver-se sem estridor em repouso e sem desconforto, poderá receber alta segura para o domicílio.</li>
</ol>
`
    },
    {
      id: 'questoes-concursos-comentadas-ivas',
      title: '12. Questões Comentadas de Residência Médica e Concursos Oficiais',
      body_html: `
<h3>Questão 1 (ENAMED / ENARE — Inédita Comentada)</h3>
<p>Uma menina de 6 anos de idade é levada à Unidade de Pronto Atendimento com queixa de febre alta de 39,4°C e odinofagia intensa iniciadas abruptamente há 24 horas. Ao exame físico, o médico constata amígdalas hipertrofiadas e hiperemiadas, recobertas por espesso exsudato purulento esbranquiçado, petéquias na transição do palato mole com o palato duro e linfadenomegalia cervical anterior satélite palpável e dolorosa de 2,5 cm. A paciente não apresenta coriza, espirros ou tosse. Sabendo que o teste rápido para estreptococo resultou positivo, assinale a conduta farmacológica prioritária indicada para a prevenção primária de sua principal complicação não supurativa tardia:</p>
<p><strong>A)</strong> Azitromicina oral por 3 dias, visando à prevenção da Glomerulonefrite Difusa Aguda Pós-Estreptocócica.</p>
<p><strong>B)</strong> Amoxicilina associada a Clavulanato oral por 5 dias, para cobrir cepas produtoras de beta-lactamase.</p>
<p><strong>C)</strong> Penicilina G Benzatina intramuscular em dose única (ou Amoxicilina oral por 10 dias), visando à prevenção da Febre Reumática Aguda.</p>
<p><strong>D)</strong> Sulfametoxazol-Trimetoprima por 7 dias, droga de escolha pelo baixo índice de efeitos adversos gastrointestinais.</p>
<p><strong>E)</strong> Prednisolona oral associada a sintomáticos, uma vez que a infecção é autolimitada e não requer antibiótico.</p>

<p><strong>Comentário Detalhado:</strong></p>
<p><strong>Gabarito: C.</strong></p>
<p><em>Análise das Alternativas:</em></p>
<ul>
  <li><strong>Por que a alternativa C está CORRETA?</strong> O quadro é de faringoamigdalite estreptocócica por <em>Streptococcus pyogenes</em> (SBHGA). O objetivo primordial da antibioticoterapia não é apenas aliviar a dor, mas sim a <strong>prevenção primária mandatória da Febre Reumática Aguda</strong>. O esquema de primeira escolha é a <strong>Penicilina G Benzatina em dose única IM</strong> (600.000 UI se &lt; 27 kg ou 1.200.000 UI se &ge; 27 kg) ou <strong>Amoxicilina oral por 10 dias completos</strong>;</li>
  <li><strong>Por que a A está INCORRETA?</strong> A antibioticoterapia <strong>NÃO previne a GNPE</strong> (a GNPE é mediada por deposição de imunocomplexos circulantes que se formam independentemente do uso do antibiótico); além disso, o curso padrão de azitromicina é de 5 dias em alérgicos;</li>
  <li><strong>Por que a B está INCORRETA?</strong> O <em>S. pyogenes</em> nunca produz beta-lactamase (não há resistência mediada por beta-lactamase descrita em SBHGA); o clavulanato é totalmente desnecessário e 5 dias de amoxicilina não previnem a Febre Reumática;</li>
  <li><strong>Por que a D está INCORRETA?</strong> Sulfas não erradicam o SBHGA da orofaringe e são formalmente contraindicadas para o tratamento da faringite estreptocócica;</li>
  <li><strong>Por que a E está INCORRETA?</strong> A faringite bacteriana requer antibioticoterapia bactericida para profilaxia da febre reumática.</li>
</ul>

<h3>Questão 2 (USP / UNIFESP — Inédita Comentada)</h3>
<p>Lactente de 10 meses é trazido ao pronto-socorro com história de febre de 38,5°C, irritabilidade e choro fácil há 2 dias. A otoscopia revela membrana timpânica direita hiperemiada, opaca e com abaulamento acentuado em sua porção superior e posterior. A orelha esquerda é normal. A criança não apresenta outras comorbidades e nunca usou antibióticos. A mãe tem excelente nível de esclarecimento e o serviço garante retorno em 48 horas. Qual a conduta correta recomendada de acordo com as diretrizes da Sociedade Brasileira de Pediatria e da <em>American Academy of Pediatrics</em>?</p>
<p><strong>A)</strong> Conduta expectante com analgesia oral rigorosa e reavaliação em 48 a 72 horas, dispensando antibiótico inicial.</p>
<p><strong>B)</strong> Início imediato de Amoxicilina oral na dose de 80 a 90 mg/kg/dia por 10 dias.</p>
<p><strong>C)</strong> Início imediato de Amoxicilina associada a Clavulanato na dose de 50 mg/kg/dia por 5 dias.</p>
<p><strong>D)</strong> Realização de timpanocentese diagnóstica de urgência sob sedação em centro cirúrgico.</p>
<p><strong>E)</strong> Prescrição de gotas otológicas de ciprofloxacino com corticoide três vezes ao dia.</p>

<p><strong>Comentário Detalhado:</strong></p>
<p><strong>Gabarito: B.</strong></p>
<p><em>Análise das Alternativas:</em></p>
<ul>
  <li><strong>Por que a alternativa B está CORRETA?</strong> A paciente tem 10 meses de vida e apresenta <strong>Otite Média Aguda com abaulamento evidente</strong>. Em menores de 2 anos com febre e OMA com abaulamento e dor importante, ou em qualquer menor de 6 meses, a recomendação é <strong>antibioticoterapia imediata</strong>. A droga de primeira escolha é a <strong>Amoxicilina oral em dose alta (80 a 90 mg/kg/dia)</strong> por <strong>10 dias completos</strong> (duração mandatória em menores de 2 anos para prevenir falha e recidiva);</li>
  <li><strong>Por que a A está INCORRETA?</strong> A conduta expectante em lactentes de 6 a 24 meses é reservada exclusivamente para casos de OMA <em>leve e unilateral</em> em que não haja dor intensa ou febre e a membrana não apresente abaulamento grave;</li>
  <li><strong>Por que a C está INCORRETA?</strong> A paciente nunca usou antibióticos e não tem conjuntivite purulenta associada; não há indicação inicial de clavulanato; além disso, a dose seria de 90 mg/kg/dia e a duração de 10 dias;</li>
  <li><strong>Por que a D está INCORRETA?</strong> Timpanocentese é reservada para complicações graves, OMA neonatal ou falhas múltiplas;</li>
  <li><strong>Por que a E está INCORRETA?</strong> Gotas otológicas não atravessam a membrana timpânica íntegra e são contraindicadas na OMA sem perfuração.</li>
</ul>

<h3>Questão 3 (UNICAMP / SMS-SP — Inédita Comentada)</h3>
<p>Menino de 15 anos procura atendimento médico com história de dor de garganta que se iniciou há 4 dias e piorou drasticamente nas últimas 24 horas, tornando-se unilateral à esquerda. Ao exame: paciente febril, sialorreico, com voz empastada ("em batata quente") e trismo importante (dificuldade acentuada de abrir a cavidade oral). À inspeção da orofaringe com iluminação adequada, observa-se abaulamento acentuado do pilar amigdaliano anterior esquerdo e a úvula encontra-se nitidamente desviada para o lado direito. O diagnóstico e a conduta imediata são:</p>
<p><strong>A)</strong> Abscesso retrofaríngeo; intubação traqueal em decúbito dorsal imediata.</p>
<p><strong>B)</strong> Mononucleose infecciosa complicada; corticoterapia oral em dose imunossupressora.</p>
<p><strong>C)</strong> Angina de Ludwig; antibioticoterapia tópica com neomicina.</p>
<p><strong>D)</strong> Abscesso periamigdalino; punção/drenagem cirúrgica da coleção e antibioticoterapia parenteral cobrindo estreptococos e anaeróbios.</p>
<p><strong>E)</strong> Epiglotite aguda; nebulização imediata com adrenalina 1:1.000 e observação por 2 horas.</p>

<p><strong>Comentário Detalhado:</strong></p>
<p><strong>Gabarito: D.</strong></p>
<p><em>Análise das Alternativas:</em></p>
<ul>
  <li><strong>Por que a alternativa D está CORRETA?</strong> O quadro descreve a apresentação patognomônica do <strong>Abscesso Periamigdalino</strong> em adolescente: odinofagia unilateral excruciante, sialorreia, trismo (por irritação do músculo pterigoideo medial), voz em "batata quente", abaulamento periamigdaliano unilateral e <strong>desvio contralateral da úvula</strong>. A conduta mandatória imediata é a <strong>punção aspirativa ou drenagem cirúrgica do abscesso</strong> associada à antibioticoterapia parenteral com cobertura para <em>S. pyogenes</em>, <em>S. aureus</em> e anaeróbios orais (Ampicilina-Sulbactam ou Ceftriaxona + Clindamicina);</li>
  <li><strong>Por que a A está INCORRETA?</strong> Abscesso retrofaríngeo acomete lactentes menores de 3 a 4 anos, cursa com estridor e hiperextensão cervical, sem desvio lateral da úvula;</li>
  <li><strong>Por que a B está INCORRETA?</strong> Mononucleose cursa com esplenomegalia e adenopatia cervical posterior bilateral, sem trismo ou coleção purulenta unilateral com desvio de úvula;</li>
  <li><strong>Por que a C está INCORRETA?</strong> Angina de Ludwig é celulite do assoalho da boca e espaço submandibular bilateral com elevação da língua;</li>
  <li><strong>Por que a E está INCORRETA?</strong> Epiglotite acomete a via aérea supraglótica com postura em tripé, sem trismo ou abaulamento amigdaliano assimétrico.</li>
</ul>

<h3>Questão 4 (SCMSP / AMRIGS — Inédita Comentada)</h3>
<p>Menino de 2 anos é trazido ao pronto-socorro às 3 horas da manhã com início súbito de tosse ladrante ("tosse de cachorro"), rouquidão e respiração ruidosa. Ao exame físico: paciente vigil, no colo da mãe, afebril, com estridor inspiratório audível apenas durante os períodos de choro e agitação. Quando a criança se acalma no colo materno, o estridor desaparece e não há tiragens subcostais ou retração de fúrcula esternal. A saturação de pulso de oxigênio é de 97% em ar ambiente. De acordo com as diretrizes da Sociedade Brasileira de Pediatria para o Crupe Viral Leve, a conduta correta é:</p>
<p><strong>A)</strong> Nebulização imediata com 5 mL de adrenalina 1:1.000 pura e internação hospitalar na UTI pediátrica.</p>
<p><strong>B)</strong> Prescrição de Dexametasona oral em dose única (0,15 a 0,6 mg/kg), orientações gerais aos pais e alta hospitalar.</p>
<p><strong>C)</strong> Solicitação urgente de radiografia cervical e tomografia de pescoço para descartar corpo estranho.</p>
<p><strong>D)</strong> Prescrição de xarope antitussígeno à base de clobutinol e descongestionante nasal oral.</p>
<p><strong>E)</strong> Início imediato de Amoxicilina oral por 10 dias para evitar sobreinfecção bacteriana.</p>

<p><strong>Comentário Detalhado:</strong></p>
<p><strong>Gabarito: B.</strong></p>
<p><em>Análise das Alternativas:</em></p>
<ul>
  <li><strong>Por que a alternativa B está CORRETA?</strong> A criança apresenta <strong>Crupe Viral Leve</strong> (presença de tosse ladrante e rouquidão, mas com <strong>estridor ausente em repouso</strong> e sem desconforto respiratório). Todas as diretrizes internacionais e da SBP preconizam <strong>Dexametasona oral em dose única (0,15 a 0,6 mg/kg, máx. 16 mg) para TODOS os graus de crupe</strong>, incluindo o leve! A dose única de dexametasona reduz a taxa de retorno ao pronto-socorro, diminui o tempo de sintomas e previne a progressão para crupe grave. Como o estridor não está presente em repouso, <em>não há indicação de nebulização com adrenalina</em>;</li>
  <li><strong>Por que a A está INCORRETA?</strong> A adrenalina inalatória é indicada apenas para crupe moderado a grave (com estridor em repouso e tiragens);</li>
  <li><strong>Por que a C está INCORRETA?</strong> O quadro é típico de crupe e não necessita de exames radiológicos ou tomográficos que aumentam o estresse da criança;</li>
  <li><strong>Por que a D está INCORRETA?</strong> Antitussígenos e descongestionantes são formalmente contraindicados em crianças pequenas pelo risco de toxicidade grave;</li>
  <li><strong>Por que a E está INCORRETA?</strong> O crupe é uma infecção viral pura por Parainfluenza; antibióticos são contraindicados.</li>
</ul>

<h3>Questão 5 (UERJ / SES-RJ — Inédita Comentada)</h3>
<p>Menino de 4 anos e meio, previamente vacinado com todas as vacinas do PNI, apresenta há 12 dias tosse contínua diurna e noturna associada a secreção nasal espessa de coloração amarelada persistente, sem melhora ao longo dos dias. A mãe refere que a febre inicial durou dois dias e cessou, mas a coriza e a tosse não desapareceram. Ao exame: bom estado geral, afebril, gotejamento pós-nasal purulento visível na orofaringe e conchas nasais edemaciadas. Não há dor à palpação ocular e a motilidade ocular é normal. Qual o diagnóstico clínico mais provável e a melhor abordagem inicial segundo a Sociedade Brasileira de Pediatria?</p>
<p><strong>A)</strong> Resfriado comum prolongado; conduta expectante com lavagem nasal e orientação de que o quadro dura até 30 dias.</p>
<p><strong>B)</strong> Rinossinusite bacteriana aguda não complicada; tratamento com Amoxicilina oral em dose alta (80-90 mg/kg/dia) por 10 a 14 dias.</p>
<p><strong>C)</strong> Abscesso periorbitário de Chandler grau I; solicitar tomografia de seios e internar para ceftriaxona venosa.</p>
<p><strong>D)</strong> Asma desencadeada por vírus; iniciar corticoide inalatório e broncodilatador de curta ação.</p>
<p><strong>E)</strong> Corpo estranho nasal unilateral; remoção instrumental urgente sob anestesia geral.</p>

<p><strong>Comentário Detalhado:</strong></p>
<p><strong>Gabarito: B.</strong></p>
<p><em>Análise das Alternativas:</em></p>
<ul>
  <li><strong>Por que a alternativa B está CORRETA?</strong> A criança preenche o critério mais comum de <strong>Rinossinusite Bacteriana Aguda (RBA)</strong>: <strong>sintomas de tosse e coriza persistentes por mais de 10 dias consecutivos sem qualquer melhora clínica</strong>. O resfriado viral autolimitado melhora tipicamente até o 7º a 10º dia. O tratamento padrão de primeira escolha preconizado pela SBP é a <strong>Amoxicilina oral em dose alta (80 a 90 mg/kg/dia) por 10 a 14 dias</strong>;</li>
  <li><strong>Por que a A está INCORRETA?</strong> O resfriado viral comum não deve ser considerado normal quando a secreção e a tosse persistem sem melhora por mais de 10 dias completos;</li>
  <li><strong>Por que a C está INCORRETA?</strong> O paciente não tem edema palpebral, eritema ou alterações orbitárias;</li>
  <li><strong>Por que a D está INCORRETA?</strong> A tosse decorre de gotejamento pós-nasal sinusal (não de broncoespasmo; o exame pulmonar é limpo);</li>
  <li><strong>Por que a E está INCORRETA?</strong> O corpo estranho cursa classicamente com secreção nasal <em>unilateral</em> fétida/sanguinolenta sem tosse bilateral prolongada.</li>
</ul>

<h3>Questão 6 (FMABC / SUS-SP — Inédita Comentada)</h3>
<p>Criança de 3 anos de idade, cuja família é adepta do movimento antivacinas e não recebeu nenhuma vacina do calendário oficial desde o nascimento, é trazida com urgência ao pronto-socorro. Apresenta-se extremamente prostrada, com febre de 40,0°C, dificuldade respiratória rapidamente progressiva nas últimas 6 horas, voz abafada e sialorreia profusa escorrendo pela boca. Não há tosse ladrante. A criança recusa-se a deitar e permanece sentada, inclinada para a frente, com os braços apoiados na maca e o pescoço hiperextendido. O médico assistente deve:</p>
<p><strong>A)</strong> Colocar um abaixador de língua imediatamente para inspecionar a laringe e afastar corpo estranho.</p>
<p><strong>B)</strong> Deitar o paciente em decúbito dorsal e puncionar dois acessos venosos periféricos imediatamente para colher hemoculturas e líquor.</p>
<p><strong>C)</strong> Encaminhar a criança para o setor de radiologia para realizar tomografia computadorizada cervical.</p>
<p><strong>D)</strong> Não manipular a orofaringe, manter a criança calma no colo dos pais, ofertar oxigênio inalatório e acionar imediatamente a equipe de centro cirúrgico para intubação traqueal ou via aérea cirúrgica de emergência.</p>
<p><strong>E)</strong> Realizar nebulização imediata com adrenalina 1:1.000 e prescrever dexametasona oral.</p>

<p><strong>Comentário Detalhado:</strong></p>
<p><strong>Gabarito: D.</strong></p>
<p><em>Análise das Alternativas:</em></p>
<ul>
  <li><strong>Por que a alternativa D está CORRETA?</strong> O quadro é o clássico e temido caso de <strong>Epiglotite Aguda Bacteriana</strong> por <em>Haemophilus influenzae</em> tipo b (Hib) em criança não vacinada: febre alta (&gt; 39-40°C), toxemia extrema, início fulminante em poucas horas, ausência de tosse, disfagia grave com sialorreia profusa e <strong>posição em tripé patognomônica</strong>. A conduta mandatória absoluta é: <strong>NÃO MANIPULAR A OROFARINGE</strong> (risco de laringoespasmo fatal imediato), manter no colo dos responsáveis, ofertar oxigênio passivo e conduzir imediatamente ao centro cirúrgico para intubação traqueal sob anestesia inalatória com retaguarda cirúrgica para traqueostomia/cricotireoidostomia;</li>
  <li><strong>Por que as alternativas A e B estão INCORRETAS?</strong> Usar abaixador de língua, deitar a criança à força ou puncionar acessos venosos com a criança agitada pode deflagrar parada cardiorrespiratória reflexa por asfixia imediata;</li>
  <li><strong>Por que a C está INCORRETA?</strong> O paciente não tem estabilidade para ser transportado a setores diagnósticos;</li>
  <li><strong>Por que a E está INCORRETA?</strong> Nebulização com adrenalina e corticoide é o tratamento do crupe viral subglótico, não tendo benefício comprovado na epiglotite supraglótica bacteriana fulminante.</li>
</ul>
`
    },
    {
      id: 'guia-rapido-sintese-ivas-enamed',
      title: '13. Guia Rápido de Conduta e Síntese das IVAS para o ENAMED',
      body_html: `
<h3>Os Dez Mandamentos das IVAS Pediátricas para Concursos</h3>
<ol>
  <li><strong>Coriza esverdeada NÃO é sinônimo de bactéria:</strong> No resfriado comum, a secreção nasal torna-se naturalmente espessa e amarelada/esverdeada do 3º ao 5º dia pela presença de neutrófilos e mieloperoxidase. Antibióticos são contraindicados.</li>
  <li><strong>Segurança Farmacológica em Menores de 2 a 6 anos:</strong> Contraindicação formal e absoluta de descongestionantes sistêmicos, vasoconstritores tópicos (nafazolina - risco de coma e choque), antitussígenos de ação central e expectorantes. O tratamento é lavagem nasal com SF 0,9% e hidratação.</li>
  <li><strong>Mel de Abelha:</strong> Excelente demulcente para tosse noturna exclusivamente em <strong>maiores de 1 ano</strong>. Contraindicado em menores de 12 meses pelo risco grave de botulismo infantil.</li>
  <li><strong>Faringite Estreptocócica (SBHGA):</strong> Pico entre <strong>3 e 15 anos</strong> (raríssima antes dos 3 anos). Início súbito, febre alta, placas amigdalianas, petéquias no palato e adenomegalia anterior dolorosa, sem tosse/coriza. Padrão-ouro: <strong>Penicilina G Benzatina dose única IM</strong> (600.000 UI se &lt; 27 kg ou 1.200.000 UI se &ge; 27 kg) ou Amoxicilina oral por 10 dias para prevenção primária de <strong>Febre Reumática</strong>. Não previne GNPE!</li>
  <li><strong>Abscesso Periamigdalino:</strong> Adolescente com piora unilateral da dor de garganta, febre, trismo, sialorreia, "voz em batata quente" e <strong>desvio contralateral da úvula</strong>. Drenagem cirúrgica e ampicilina-sulbactam IV.</li>
  <li><strong>Abscesso Retrofaríngeo:</strong> Lactente &lt; 3 anos com febre, estridor, sialorreia e <strong>hiperextensão cervical rígida</strong>. Alargamento do espaço pré-vertebral no RX perfil. Drenagem e antibiótico parenteral.</li>
  <li><strong>Otite Média Aguda (OMA):</strong> O achado semiológico de maior valor preditivo positivo (&gt; 95%) é o <strong>abaulamento da membrana timpânica</strong>. Tratamento de escolha: <strong>Amoxicilina oral em dose alta (80 a 90 mg/kg/dia)</strong> por 10 dias em menores de 2 anos. Associar clavulanato se uso prévio de antibiótico nos últimos 30 dias ou síndrome otite-conjuntivite.</li>
  <li><strong>Mastoidite Aguda:</strong> Dor, calor e eritema retroauricular com <strong>apagamento do sulco e desvio anterior do pavilhão auricular ("orelha em abano")</strong>. Internação mandatória, TC de ossos temporais e Ceftriaxona IV.</li>
  <li><strong>Rinossinusite Bacteriana Aguda:</strong> Diagnóstico clínico (dispensa RX de seios da face!). Critérios: sintomas persistentes &gt; 10 dias sem melhora; início severo com febre &ge; 39°C e purulência por 3-4 dias consecutivos; ou piora em dois tempos ("double sickening"). Tratar com amoxicilina 80-90 mg/kg/dia.</li>
  <li><strong>Crupe Viral vs Epiglotite Aguda:</strong>
    <ul>
      <li>Crupe (Parainfluenza): tosse de cachorro, estridor, sinal da torre de igreja. Tratar com <strong>Dexametasona dose única</strong> para todos e <strong>Adrenalina inalatória</strong> se estridor em repouso (observação de 2 a 4h pelo efeito rebote);</li>
      <li>Epiglotite (Hib em não vacinados): início fulminante, febre 40°C, ausência de tosse, sialorreia profusa e <strong>posição em tripé</strong>. <strong>NÃO MANIPULAR A OROFARINGE!</strong> Encaminhar imediatamente ao centro cirúrgico para via aérea artificial.</li>
    </ul>
  </li>
</ol>
`
    }
  ],
  references: [
    {
      title: 'Sociedade Brasileira de Pediatria (SBP) — Departamento Científico de Otorrinolaringologia e Infectologia Pediátrica. Guia Prático de Infecções de Vias Aéreas Superiores na Infância',
      url: 'https://www.sbp.com.br/departamentos-cientificos/otorrinolaringologia/diretrizes/'
    },
    {
      title: 'American Academy of Pediatrics (AAP) — Clinical Practice Guideline: The Diagnosis and Management of Acute Otitis Media (Pediatrics 2013, Reaffirmed)',
      url: 'https://publications.aap.org/pediatrics/article/131/3/e964/30902/The-Diagnosis-and-Management-of-Acute-Otitis-Media'
    },
    {
      title: 'American Academy of Pediatrics (AAP) — Clinical Practice Guideline for the Diagnosis and Management of Acute Bacterial Sinusitis in Children Aged 1 to 18 Years',
      url: 'https://publications.aap.org/pediatrics/article/132/1/e262/31737/Clinical-Practice-Guideline-for-the-Diagnosis-and'
    },
    {
      title: 'Infectious Diseases Society of America (IDSA) — Clinical Practice Guideline for the Diagnosis and Management of Group A Streptococcal Pharyngitis',
      url: 'https://www.idsociety.org/practice-guideline/group-a-streptococcal-pharyngitis/'
    },
    {
      title: 'World Health Organization (WHO) — Pocket Book of Hospital Care for Children: Guidelines for the Management of Common Illnesses with Limited Resources',
      url: 'https://www.who.int/publications/i/item/9789241548373'
    },
    {
      title: 'Ministério da Saúde do Brasil — Protocolo Clínico e Diretrizes Terapêuticas: Prevenção da Febre Reumática e Manejo das Faringoamigdalites no SUS',
      url: 'https://www.gov.br/saude/pt-br/assuntos/protocolos-clinicos-e-diretrizes-terapeuticas-pcdt'
    }
  ]
};

const chars = saveBook(book);
console.log(`Finalizado ${book.slug}: ${chars} caracteres úteis.`);
