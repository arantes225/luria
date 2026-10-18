// scripts/build-bloco-05-112-part1.mjs
// Aula 112: Diverticulite Aguda - Parte 1: Seções 1 a 4

export const sec1 = {
  id: 'epidemiologia-fisiopatologia-pseudodiverticulos-microperfuracao',
  title: '1. Epidemiologia e Fisiopatologia: Formação dos Pseudodivertículos Cólicos e Cascata da Micro/Macroperfuração',
  body_html: `
<h3>Conceito e Epidemiologia da Doença Diverticular dos Cólons</h3>
<p>A <strong>Doença Diverticular dos Cólons (DDC)</strong> é uma afecção gastrointestinal de elevadíssima prevalência nas sociedades ocidentais industrializadas, exibindo forte correlação etiológica com o envelhecimento populacional, hábitos alimentares ultraprocessados com extrema escassez de fibras dietéticas solúveis e insolúveis, sedentarismo, constipação intestinal crônica e obesidade visceral. A prevalência da diverticulose cólica é inferior a 5% em indivíduos com menos de 40 anos, elevando-se vertiginosamente para <strong>30% aos 60 anos</strong> e superando <strong>65% a 70% na população octogenária (&gt; 80 anos)</strong>.</p>

<p>Historicamente, cerca de 80% a 85% das pessoas portadoras de divertículos colônicos permanecem completamente assintomáticas ao longo de toda a vida (<em>diverticulose assintomática</em> — achado incidental em colonoscopias ou tomografias computadorizadas). Entretanto, aproximadamente <strong>10% a 25% dos indivíduos com diverticulose manifestarão algum episódio sintomático ao longo da história natural da doença</strong>, subdividindo-se em duas síndromes clínicas maiores:</p>
<ol>
  <li><strong>Diverticulite Aguda (Inflamação e Perfuração Diverticular):</strong> Responde pela grande maioria das admissões hospitalares por dor abdominal na fossa ilíaca esquerda no adulto e idoso;</li>
  <li><strong>Hemorragia Digestiva Diverticular:</strong> Principal causa isolada de hemorragia digestiva baixa (HDB) maciça no idoso (responsável por 40% a 50% dos episódios de enterorragia aguda). Ocorre predominantemente em <em>cólon direito</em> por erosão mecânica e adelgaçamento excêntrico da arteríola nutridora sobre a cúpula do divertículo, cursando classicamente <strong>SEM inflamação concomitante</strong> (sangramento indolor).</li>
</ol>

<h3>Anatomia Patológica e a Formação dos "Pseudodivertículos"</h3>
<p>Diferentemente dos divertículos verdadeiros do trato gastrointestinal (como o divertículo de Meckel, que é uma malformação congênita composta por todas as camadas histológicas da parede intestinal: mucosa, submucosa, muscular própria circular e longitudinal, e serosa), os <strong>divertículos colônicos adquiridos são PSEUDODIVERTÍCULOS (ou divertículos falsos de pulsação)</strong>:</p>
<ul>
  <li><strong>Composição Histológica:</strong> São herniações saculares compostas <strong>exclusivamente pela camada mucosa e submucosa</strong>, revestidas externamente apenas pelo peritônio seroso (ou gordura subserosa pericólica). A <em>túnica muscular própria NÃO faz parte da parede do divertículo</em>;</li>
  <li><strong>Os Pontos de Fraqueza Anatômica da Parede Cólica:</strong> No cólon humano, a camada muscular longitudinal externa não é contínua e uniforme, mas sim agrupada em três feixes espessos longitudinais denominados <strong>tênias cólicas</strong> (tênia omental, mesocólica e livre). As arteríolas retas nutrientes (<em>vasa recta</em>) que se originam da artéria marginal de Drummond penetram na parede muscular cólica entre a tênia mesocólica e as duas tênias antimesentéricas para irrigar a mucosa. <strong>Esses orifícios microscópicos por onde os vasos sanguíneos perfuram a camada muscular circular representam zonas de fraqueza anatômica congênitas</strong>;</li>
  <li><strong>A Lei de Laplace e o Espasmo Segmentar do Sigmoide:</strong> Segundo a <em>Lei de Laplace</em> ($P = \frac{2T}{r}$), para uma dada tensão parietal ($T$), a pressão intraluminal ($P$) gerada é inversamente proporcional ao raio ($r$) da víscera tubular:
    $$\text{Pressão Intraluminal} \propto \frac{1}{\text{Raio Cólico}}$$
    Como o <strong>cólon sigmoide</strong> é o segmento de <strong>menor calibre (menor raio)</strong> de todo o trato cólico e o que desenvolve maior atividade motora segmentar peristáltica (contrações espasmódicas não propulsivas que isolam câmaras hiperbáricas fechadas), as pressões intraluminais no sigmoide alcançam patamares patológicos elevadíssimos. Por esse motivo biofísico, mais de <strong>90% a 95% dos pseudodivertículos cólicos na população ocidental localizam-se no CÓLON SIGMOIDE e cólon descendente</strong>.</li>
</ul>

<h3>A Fisiopatologia da Diverticulite Aguda: O Primado da Micro/Macroperfuração</h3>
<p>Durante décadas, a literatura médica ensinou que a diverticulite aguda decorria de um mecanismo primário similar ao da apendicite aguda — a impactação estéril ou séptica de um fecalito no colo estreito do divertículo com retenção de secreções e supuração intraluminal ("diverticulite como apendicite do lado esquerdo"). Estudos anatomopatológicos contemporâneos refutaram essa teoria simples e consagraram o modelo atual:</p>
<ol>
  <li><strong>Trauma Mecânico Focal e Abrasão Mucosa:</strong> Fezes ressecadas e endurecidas em câmara colônica hiperpressurizada exercem abrasão mecânica contínua sobre a delgada camada mucosa do fundo do divertículo, causando micro-ulcerações e quebra da barreira epitelial;</li>
  <li><strong>Isquemia Focal por Compressão da Vasa Recta:</strong> O alargamento progressivo do fundo do divertículo estira e comprime a arteríola reta penetrante que trafega intimamente aderida ao colo diverticular, gerando isquemia tecidual focal na cúpula do divertículo;</li>
  <li><strong>Microperfuração Transmural Primária:</strong> A necrose isquêmica da parede adelgaçada culmina na <strong>descontinuidade microscópica da mucosa e serosa (microperfuração)</strong>;</li>
  <li><strong>Translocação Bacteriana Polimicrobiana para o Espaço Pericólico:</strong> Bactérias comensais da microbiota colônica (aeróbios Gram-negativos facultativos como <em>Escherichia coli</em> e <em>Klebsiella pneumoniae</em>, associados a uma densa população de anaeróbios virulentos como <em>Bacteroides fragilis</em>, <em>Fusobacterium</em> e <em>Peptostreptococcus</em>) extravasam para a gordura mesocólica e apêndices epiploicos adjacentes;</li>
  <li><strong>A Dicootomia Biológica do Bloqueio Omental:</strong>
    <ul>
      <li><em>Diverticulite Não Complicada (Bloqueada):</em> Na grande maioria dos casos (75% a 80%), os mecanismos imunes e anatômicos de defesa do hospedeiro — em particular a migração precoce do <strong>grande omento (epíploon)</strong> e de alças de intestino delgado adjacentes — isolam com eficácia o processo inflamatório na gordura pericólica, circunscrevendo a inflamação como um flegmão localizado;</li>
      <li><em>Diverticulite Complicada (Macroperfuração):</em> Se a resposta de bloqueio falhar, se o inóculo bacteriano for maciço, ou se o paciente for imunossuprimido (diabético, desnutrido, usuário crônico de corticosteroides ou quimioterapia), a microperfuração progride para <strong>macroperfuração livre</strong> com formação de abscessos pericólicos ou pélvicos volumosos, fístulas para órgãos vizinhos (bexiga, vagina), estenoses obstrutivas ou peritonite fecal e purulenta generalizada.</li>
    </ul>
  </li>
</ol>
`
};

export const sec2 = {
  id: 'quadro-clinico-diagnostico-tc-contraindicacoes',
  title: '2. Quadro Clínico, Propedêutica Armada: Tomografia Computadorizada como Padrão-Ouro e Contraindicação Absoluta de Endoscopia',
  body_html: `
<h3>Manifestações Clínicas e Apresentação Típica na Fossa Ilíaca Esquerda</h3>
<p>O quadro clínico clássico da diverticulite aguda é consagrado na semiologia cirúrgica como a <strong>"Apendicite do Lado Esquerdo"</strong>:</p>
<ul>
  <li><strong>Dor Abdominal Cardinal:</strong> Dor contínua, de início insidioso a subagudo (evolução típica de 24 a 72 horas), localizada na <strong>Fossa Ilíaca Esquerda (FIE)</strong> e no flanco esquerdo. A dor piora aos movimentos, à tosse e à deambulação, irradiando-se frequentemente para o hipogástrio e região suprapúbica;</li>
  <li><strong>Alteração do Hábito Intestinal:</strong> Constipação intestinal recente (em mais de 50% dos casos, decorrente de íleo paralítico reflexo ou estreitamento luminal inflamatório pelo flegmão) ou diarreia aguda paradoxal (em 25% a 30%, por irritação reflexa do reto e sigmoide);</li>
  <li><strong>Sintomas Urinários Irritativos de Contiguidade:</strong> Disúria, polaciúria e urgência miccional ocorrem em até 15% a 20% dos pacientes. Decorrem da aderência inflamatória direta do cólon sigmoide flegmonoso à cúpula da bexiga urinária (irritação vesical adjacente), podendo induzir piúria estéril no exame de urina (EAS);</li>
  <li><strong>Sinais Sistêmicos de Infecção:</strong> Febre baixa a moderada (37,8 a 38,5 ºC), anorexia, náuseas e vômitos esparsos. A presença de febre alta com calafrios em agulha sugere bacteremia sistêmica, abscesso intracavitário volumoso ou pileflebite (tromboflebite séptica da veia porta);</li>
  <li><strong>Exame Físico Abdominal:</strong>
    <ul>
      <li>Dor à palpação profunda na FIE;</li>
      <li><strong>Massa Palpável Dolorosa na FIE (Plastrão Diverticular):</strong> Presente em cerca de 20% a 30% dos pacientes, correspondendo ao sigmoide espessado bloqueado pelo omento e alças intestinais;</li>
      <li><strong>Sinais de Irritação Peritoneal:</strong> Descompressão brusca dolorosa localizada na FIE (Sinal de Blumberg positivo na FIE); descompressão brusca difusa em todo o abdome e abdome "em tábua" denotam peritonite generalizada por perfuração livre (Hinchey III ou IV).</li>
    </ul>
  </li>
</ul>

<h3>Apresentações Atípicas: Diverticulite do Lado Direito e Cecal</h3>
<p>Embora incomum no Ocidente (onde responde por apenas 1,5% a 3% dos casos de diverticulite), a <strong>diverticulite cecal ou do cólon direito</strong> é extremamente prevalente em populações asiáticas (Japão, Coreia, China), nas quais atinge mais de 40% a 50% dos casos de doença diverticular. Diferentemente dos pseudodivertículos do sigmoide, os divertículos do cólon direito são frequentemente <strong>divertículos congênitos verdadeiros solitários</strong> localizados na parede anterior do ceco ou cólon ascendente. Manifesta-se clinicamente com <strong>dor aguda na Fossa Ilíaca Direita (FID), febre e leucocitose</strong>, tornando sua diferenciação pré-operatória da apendicite aguda praticamente indistinguível apenas pelo exame clínico, exigindo tomografia computadorizada multislice para evitar apendicectomias em branco ou hemicolectomias direitas desnecessárias.</p>

<h3>Tomografia Computadorizada de Abdome Total e Pelve: O Padrão-Ouro Absoluto</h3>
<p>A <strong>Tomografia Computadorizada (TC) de abdome e pelve com contraste intravenoso (IV)</strong> é o exame de escolha de primeira linha indiscutível para o diagnóstico, estadiamento e planejamento terapêutico da diverticulite aguda (com sensibilidade de 95% a 98% e especificidade de 96% a 99%):</p>
<ul>
  <li><strong>Achados Tomográficos Cardinais de Diverticulite:</strong>
    <ol>
      <li><strong>Presença de divertículos colônicos</strong> no segmento acometido;</li>
      <li><strong>Espessamento parietal circunferencial simétrico do cólon</strong> (espessura da parede cólica $> 4$ a 5 mm);</li>
      <li><strong>Densificação e borramento da gordura mesocólica pericólica (<em>fat stranding</em>):</strong> Marcador tomográfico mais precoce e sensível de inflamação aguda local;</li>
      <li><strong>Líquido livre pericólico ou pélvico</strong>;</li>
      <li><strong>Presença de ar extraluminal pericólico</strong> (pequenas bolhas gasosas retroperitoneais ou mesocólicas denotando microperfuração bloqueada);</li>
      <li><strong>Pneumoperitônio maciço livre sob as cúpulas diafragmáticas</strong> (sinal de perfuração para cavidade livre);</li>
      <li><strong>Coleções fluidas organizadas com realce periférico anelar pelo meio de contraste (abscessos intra-abdominais)</strong>.</li>
    </ol>
  </li>
  <li><strong>Papel da Ultrassonografia de Abdome:</strong> Possui boa sensibilidade em mãos experientes (dor à compressão graduada com transdutor sobre alça rígida espessada $> 4$ mm e divertículo não compressível), sendo a alternativa de escolha segura em <strong>gestantes</strong> e pacientes com insuficiência renal dialítica grave sem condições de contraste iodado ou indisponibilidade de TC.</li>
</ul>

<h3>A CONTRAINDICAÇÃO ABSOLUTA DA FASE AGUDA: Colonoscopia e Enema Baritado</h3>
<p>Este é um dos tópicos mais cobrados em concursos médicos em todo o país:</p>
<div class="formula-box">
  <p><strong>REGRA DE OURO DA PROPEDÊUTICA NA DIVERTICULITE AGUDA:</strong></p>
  <p>A realização de <strong>Colonoscopia e Enema Opaco Baritado é FORMALMENTE CONTRAINDICADA durante a fase aguda da diverticulite</strong> (e nas primeiras <strong>6 a 8 semanas</strong> após o início dos sintomas).</p>
  <p><strong>Racional Fisiopatológico:</strong></p>
  <ul>
    <li>A insuflação luminal forçada de ar durante a colonoscopia ou a introdução de bário sob pressão hidrostática <strong>converte uma microperfuração pericólica bloqueada benigna em uma MACROPERFURAÇÃO LIVRE CATASTRÓFICA</strong> com derramamento maciço de fezes e gás para a cavidade peritoneal livre, deflagrando peritonite fecal difusa e sepse grave;</li>
    <li>O extravasamento de bário (sulfato de bário) para o peritônio induz <em>peritonite química crônica baritada</em> fulminante, com formação de granulomas teciduais densos, sepse fúngica/bacteriana e mortalidade superior a 50%.</li>
  </ul>
</div>
`
};

export const sec3 = {
  id: 'classificacao-hinchey-estadiamento-tomografico',
  title: '3. A Classificação de Hinchey Modificada: Estratificação Tomográfica e Prognóstica',
  body_html: `
<h3>Evolução da Classificação de Hinchey: Da Laparotomia à Tomografia Multislice</h3>
<p>Em 1978, E. John Hinchey propôs uma classificação pioneira baseada exclusivamente nos achados intraoperatórios da laparotomia exploradora em pacientes com diverticulite perfurada. Com a consolidação da tomografia computadorizada multislice como o método diagnóstico padrão no final do século XX, a classificação foi refinada por Wasvary (1999) e Kaiser (2005), dando origem à <strong>Classificação de Hinchey Modificada por TC</strong>, amplamente adotada pela <em>World Society of Emergency Surgery (WSES)</em> e pela <em>American Society of Colon and Rectal Surgeons (ASCRS)</em>:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Estágio Hinchey Modificado</th>
      <th>Achados Tomográficos e Anatomopatológicos Precisos</th>
      <th>Gravidade Clínica e Classificação Operatória</th>
      <th>Conduta Terapêutica Padrão Recomendada</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Estágio 0</strong></td>
      <td>Espessamento da parede do cólon sigmoide com presença de divertículos e discreto borramento da gordura pericólica, <strong>SEM gás extraluminal e sem coleções fluidas</strong>.</td>
      <td><strong>Diverticulite Aguda Não Complicada Leve</strong>.</td>
      <td>Tratamento ambulatorial com dieta líquida/branda; antibióticos reservados conforme estratificação de risco (diretrizes WSES/AGA).</td>
    </tr>
    <tr>
      <td><strong>Estágio Ia</strong></td>
      <td>Inflamação pericólica confinada e flegmão pericólico/mesocólico; espessamento parietal do cólon com <strong>pequenas bolhas de gás pericólicas restritas ao mesocólon</strong> (&lt; 5 cm do cólon), SEM formação de abscesso evidente.</td>
      <td><strong>Diverticulite Complicada Localizada (Flegmão Pericólico)</strong>.</td>
      <td>Tratamento clínico com antibioticoterapia (ambulatorial ou internação conforme tolerância oral e dor).</td>
    </tr>
    <tr>
      <td><strong>Estágio Ib</strong></td>
      <td>Presença de <strong>Abscesso Pericólico ou Mesocólico Confinado</strong> (coleção líquida com realce parietal) adjacente ao segmento do cólon inflamado, medindo tipicamente <strong>$&lt; 3$ a $4$ cm</strong> ou $\ge 4$ cm no mesocólon.</td>
      <td><strong>Diverticulite Complicada com Abscesso Pericólico</strong>.</td>
      <td>Internação hospitalar, antibioticoterapia intravenosa de amplo espectro; se abscesso $\ge 3$ a 4 cm: <em>Drenagem Percutânea Guiada por TC</em>.</td>
    </tr>
    <tr>
      <td><strong>Estágio II</strong></td>
      <td><strong>Abscesso Pélvico à Distância, Retroperitoneal ou Intra-abdominal Volumoso</strong> (distante do foco cólico primário, habitualmente localizado no fundo de saco de Douglas, goteira parietocólica ou entre alças de delgado), decorrente de migração exsudativa bloqueada.</td>
      <td><strong>Diverticulite Complicada com Abscesso Pélvico à Distância</strong>.</td>
      <td>Internação mandatória, antibioticoterapia venosa estrita e <strong>Drenagem Percutânea Guiada por TC ou Ultrassom</strong> (se coleção acessível e $\ge 3$ a 4 cm). Cirurgia se falha ou sepse refratária.</td>
    </tr>
    <tr>
      <td><strong>Estágio III</strong></td>
      <td><strong>Peritonite Purulenta Generalizada</strong>. Ocorre rotura de um abscesso pericólico/pélvico para a cavidade peritoneal livre, preenchendo todos os quadrantes do abdome com líquido exsudativo purulento, <strong>sem comunicação macroscópica aberta com o lúmen fecal</strong> (sem contaminação fecal grosseira visível).</td>
      <td><strong>Diverticulite Complicada com Peritonite Purulenta</strong>. Emergência Cirúrgica.</td>
      <td><strong>Cirurgia de Emergência</strong>: Procedimento de Hartmann vs Ressecção Primária com Anastomose e Ileostomia de Proteção vs Laparoscopia com Lavagem Peritoneal (controversa).</td>
    </tr>
    <tr>
      <td><strong>Estágio IV</strong></td>
      <td><strong>Peritonite Fecal Generalizada</strong>. Macroperfuração transmural livre do cólon com extravasamento contínuo de fezes e material fecalóide fétido para a grande cavidade peritoneal.</td>
      <td><strong>Emergência Cirúrgica de Risco Máximo de Choque Séptico e Óbito</strong> (mortalidade histórica de 20% a 40%).</td>
      <td><strong>Cirurgia de Emergência Imediata: Cirurgia de Hartmann Clássica</strong> (ressecção do sigmoide, colostomia terminal em FIE e sepultamento do coto retal).</td>
    </tr>
  </tbody>
</table>

<h3>A Nova Classificação da WSES (World Society of Emergency Surgery)</h3>
<p>Para agilizar a tomada de decisão no ambiente de pronto-socorro cirúrgico, a diretriz internacional da WSES simplificou o estadiamento em duas categorias pragmáticas:</p>
<ol>
  <li><strong>Diverticulite Não Complicada:</strong> Inflamação restrita à parede do cólon com borramento da gordura pericólica (Hinchey 0 e Ia);</li>
  <li><strong>Diverticulite Complicada:</strong>
    <ul>
      <li><em>Complicada Estágio 1 (Abscesso Localizado):</em> Abscesso pericólico $\le 4$ cm (1A) ou $> 4$ cm (1B);</li>
      <li><em>Complicada Estágio 2 (Abscesso Distante):</em> Abscesso pélvico ou abdominal distante $\ge 4$ cm;</li>
      <li><em>Complicada Estágio 3 (Peritonite Difusa sem Fecal):</em> Gás e líquido livre distante sem fezes (Peritonite purulenta);</li>
      <li><em>Complicada Estágio 4 (Peritonite Fecal):</em> Fezes livres na cavidade peritoneal.</li>
    </ul>
  </li>
</ol>
`
};

export const sec4 = {
  id: 'conduta-clinica-ambulatorial-vs-internacao-antibioticos',
  title: '4. Manejo Terapêutico da Diverticulite Não Complicada: A Mudança de Paradigma dos Antibióticos e Critérios de Internação',
  body_html: `
<h3>A Revolução no Tratamento da Diverticulite Não Complicada: O Fim dos Antibióticos Obrigatórios</h3>
<p>Historicamente, todo paciente diagnosticado com diverticulite aguda recebia compulsoriamente antibioticoterapia de amplo espectro por 7 a 14 dias, sob o pressuposto de que a doença constituía uma infecção bacteriana bacterêmica primária. Grandes ensaios clínicos randomizados contemporâneos multicêntricos (com destaque para o estudo sueco <strong>AVOD</strong> em 2012 e o ensaio holandês <strong>DIABOLO</strong> em 2017) quebraram esse paradigma clássico:</p>
<ul>
  <li><strong>Evidências dos Ensaios Clínicos (AVOD e DIABOLO Trials):</strong>
    <ul>
      <li>Compararam o tratamento puramente sintomático (analgesia com paracetamol/dipirona e hidratação) <em>versus</em> tratamento sintomático somado a antibioticoterapia em pacientes imunocompetentes com diverticulite não complicada comprovada por TC (Hinchey 0 e Ia);</li>
      <li><strong>Resultados:</strong> Não houve nenhuma diferença estatisticamente significativa no tempo até a resolução da dor, na taxa de complicações secundárias (formação de abscessos ou perfurações), no tempo de internação hospitalar ou na taxa de recidiva em 6 e 12 meses;</li>
    </ul>
  </li>
  <li><strong>Diretrizes Internacionais Contemporâneas (WSES, AGA e ASCRS):</strong>
    <p>O tratamento <strong>SEM ANTIBIÓTICOS</strong> (apenas repouso intestinal relativo com dieta líquida e analgesia) é seguro, eficaz e formalmente recomendado para pacientes com <strong>Diverticulite Não Complicada (Hinchey 0) que sejam IMUNOCOMPETENTES e apresentem sintomas LEVES sem sinais de resposta inflamatória sistêmica (SIRS)</strong>.</p>
  </li>
</ul>

<h3>Indicações Formais para Antibioticoterapia na Diverticulite Não Complicada</h3>
<p>Os antibióticos continuam formalmente indicados na diverticulite não complicada caso o paciente apresente qualquer uma das seguintes condições de alto risco:</p>
<ol>
  <li><strong>Imunossupressão Conhecida:</strong> Pacientes em uso crônico de corticosteroides, imunobiológicos ou quimioterapia, transplantados de órgãos sólidos, portadores de HIV avançado com baixa contagem de linfócitos CD4, desnutrição grave ou insuficiência renal crônica dialítica;</li>
  <li><strong>Presença de Critérios de SIRS ou Sepsis:</strong> Febre elevada ($T \ge 38,5$ ºC), taquicardia ($FC > 90$ bpm), taquipneia ($FR > 20$ irpm) ou hipotensão arterial;</li>
  <li><strong>Leucocitose Acentuada ou Proteína C Reativa (PCR) Muito Elevada:</strong> Leucócitos $> 15.000/\text{mm}³$ ou PCR $> 140$ a $150$ mg/L na admissão;</li>
  <li><strong>Doenças Crônicas Descompensadas Associadas:</strong> Diabetes Mellitus descompensado, cirrose hepática descompensada ou cardiopatia grave;</li>
  <li><strong>Pacientes com Sintomas Refratários ou Piora Clínica:</strong> Pacientes inicialmente manejados sem antibióticos que não apresentam alívio da dor após 48 a 72 horas de observação.</li>
</ol>

<h3>Critérios de Internação Hospitalar vs Tratamento Ambulatorial</h3>
<p>O paciente pode receber tratamento <strong>ambulatorial com segurança</strong> se atender simultaneamente aos seguintes critérios: dor leve a moderada na FIE, ausência de vômitos incoercíveis com capacidade comprovada de ingesta de líquidos e medicamentos por via oral, ausência de sepse/febre alta, suporte familiar/social confiável no domicílio e garantia de retorno imediato caso surjam sinais de alarme.</p>
<p><strong>Critérios Mandatórios de Internação Hospitalar:</strong></p>
<ul>
  <li>Intolerância à via oral (náuseas e vômitos incoercíveis que impedem hidratação);</li>
  <li>Dor intensa desproporcional exigindo analgesia com opioides parenterais;</li>
  <li>Sinais de toxemia, peritonite ou instabilidade hemodinâmica;</li>
  <li>Diverticulite Complicada (Hinchey $\ge$ Ib: abscessos, fístulas ou perfuração livre);</li>
  <li>Idosos fragilizados ou pacientes sem condições psicossociais de suporte domiciliar.</li>
</ul>

<h3>Regimes Farmacológicos de Antibioticoterapia</h3>
<p>O espectro antimicrobiano deve cobrir obrigatoriamente <strong>Bacilos Gram-negativos entéricos (Enterobacteriaceae)</strong> e <strong>Anaeróbios estritos (Bacteroides fragilis)</strong>:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Cenário Clínico / Via</th>
      <th>Regime de Primeira Escolha</th>
      <th>Regimes Alternativos / Alergia a Penicilinas</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Ambulatorial (Via Oral)</strong></td>
      <td><strong>Amoxicilina-Clavulanato (875/125 mg VO a cada 12 horas ou 1000/62,5 mg 2x/dia)</strong> por 7 a 10 dias.</td>
      <td><strong>Ciprofloxacino (500 mg VO a cada 12h)</strong> associado a <strong>Metronidazol (400 a 500 mg VO a cada 8h)</strong> OU Sulfametoxazol-Trimetoprima (800/160 mg VO 12/12h) + Metronidazol.</td>
    </tr>
    <tr>
      <td><strong>Hospitalar (Via Intravenosa)</strong></td>
      <td><strong>Ceftriaxona (1 g a 2 g IV a cada 24 horas) + Metronidazol (500 mg IV a cada 8 horas)</strong> OU Ampicilina-Sulbactam (1,5 g a 3 g IV a cada 6 horas).</td>
      <td><strong>Piperacilina-Tazobactam (4,5 g IV a cada 6 ou 8 horas)</strong> em pacientes graves sépticos de UTI OU Ciprofloxacino (400 mg IV 12/12h) + Metronidazol em alérgicos.</td>
    </tr>
  </tbody>
</table>
`
};
