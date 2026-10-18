// scripts/build-bloco-05-106-part1.mjs
// Aula 106: Lesão Renal Aguda (LRA) - Parte 1: Seções 1 a 4

export const sec1 = {
  id: 'definicao-criterios-kdigo-akin-rifle',
  title: '1. Definição Conceitual e Critérios Diagnósticos Oficiais: KDIGO 2012, AKIN e RIFLE',
  body_html: `
<h3>Evolução Histórica e Conceito Contemporâneo de Lesão Renal Aguda</h3>
<p>A <strong>Lesão Renal Aguda (LRA)</strong> — historicamente designada na literatura clássica como <em>Insuficiência Renal Aguda (IRA)</em> — é definida formalmente como a perda abrupta e sustentada da função de filtração glomerular renal, instalada no decurso de horas a poucos dias, resultando no acúmulo de escórias nitrogenadas (ureia e creatinina), retenção hidroeletrolítica, distúrbios da osmolalidade sérica e desequilíbrios graves do balanço ácido-base. A transição terminológica de "Insuficiência" para "Lesão" consagrou a compreensão moderna de que alterações sutis da cinética da creatinina sérica e oscilações discretas do débito urinário já denotam agressão celular tubular e glomerular precoce com impacto prognóstico desfavorável mensurável, elevando substancialmente a morbimortalidade hospitalar, a taxa de internação em unidade de terapia intensiva (UTI), a necessidade futura de diálise crônica e a progressão acelerada para doença renal crônica (DRC).</p>

<p>Historicamente, a ausência de definições operacionais uniformes gerava enorme heterogeneidade na literatura biomédica, com mais de 35 definições distintas concorrentes até os anos 2000. Essa fragmentação conceitual foi superada progressivamente pela estruturação dos consensos internacionais: o critério <strong>RIFLE</strong> (2004, proposto pelo grupo <em>Acute Dialysis Quality Initiative - ADQI</em>), o refinamento proposto pela rede <strong>AKIN</strong> (<em>Acute Kidney Injury Network</em>, 2007) e, finalmente, a diretriz global unificada <strong>KDIGO 2012</strong> (<em>Kidney Disease: Improving Global Outcomes</em>), adotada consensualmente em todo o mundo e cobrada de forma maciça nas provas de Residência Médica e no Exame Nacional de Revalidação de Diplomas Médicos (REVALIDA/ENAMED).</p>

<h3>Critérios Diagnósticos Formais do Consenso KDIGO 2012</h3>
<p>Segundo a diretriz oficial KDIGO 2012, o diagnóstico de Lesão Renal Aguda é estabelecido se o paciente preencher <strong>pelo menos um</strong> dos três critérios laboratoriais ou funcionais a seguir:</p>
<ul>
  <li><strong>Aumento da Creatinina Sérica $\ge 0,3$ mg/dL ($\ge 26,5\ \mu\text{mol/L}$)</strong> dentro de uma janela de <strong>48 horas</strong>; ou</li>
  <li><strong>Aumento da Creatinina Sérica $\ge 1,5$ vezes o valor basal conhecido ou presumido</strong>, desde que tenha ocorrido comprovadamente ou se presuma ter ocorrido dentro dos <strong>últimos 7 dias</strong>; ou</li>
  <li><strong>Volume Urinário (Débito Urinário) $&lt; 0,5$ mL/kg/hora</strong> por um período contínuo de <strong>pelo menos 6 horas consecutivas</strong>.</li>
</ul>

<p><strong>Atenção Metodológica de Prova:</strong> A creatinina sérica e o débito urinário são critérios <em>independentes e complementares</em>. O paciente é estadiado no estágio mais grave fornecido por qualquer um dos dois parâmetros. A mensuração rigorosa do débito urinário horário através de cateterismo vesical de demora constitui o método mais precoce e sensível para detecção da LRA no ambiente de terapia intensiva, pois a elevação sérica da creatinina é um marcador tardio que reflete o dano ocorrido 24 a 48 horas antes (efeito de histerese e dependência de cinética de geração muscular).</p>

<h3>Estadiamento da LRA segundo o KDIGO 2012</h3>
<p>O estadiamento da severidade da LRA guia diretamente o escalonamento da monitorização hemodinâmica, a suspensão de fármacos nefrotóxicos e a indicação de suporte dialítico:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Estágio KDIGO</th>
      <th>Critério da Creatinina Sérica ($Cr$)</th>
      <th>Critério do Débito Urinário ($DU$)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Estágio 1</strong></td>
      <td>Elevação de <strong>1,5 a 1,9 vezes</strong> o valor basal OU aumento absoluto de <strong>$\ge 0,3$ mg/dL</strong> em 48h</td>
      <td><strong>$&lt; 0,5$ mL/kg/h</strong> por <strong>6 a 12 horas</strong> consecutivas</td>
    </tr>
    <tr>
      <td><strong>Estágio 2</strong></td>
      <td>Elevação de <strong>2,0 a 2,9 vezes</strong> o valor basal</td>
      <td><strong>$&lt; 0,5$ mL/kg/h</strong> por período <strong>$\ge 12$ horas</strong> consecutivas</td>
    </tr>
    <tr>
      <td><strong>Estágio 3</strong></td>
      <td>Elevação de <strong>$\ge 3,0$ vezes</strong> o valor basal OU Creatinina sérica <strong>$\ge 4,0$ mg/dL</strong> com subida aguda de $\ge 0,5$ mg/dL OU Início de <strong>Terapia Renal Substitutiva (TRS / Diálise)</strong> OU Em pacientes $&lt; 18$ anos: queda da TFGe para $&lt; 35$ mL/min/1,73 m²</td>
      <td><strong>$&lt; 0,3$ mL/kg/h por $\ge 24$ horas</strong> consecutivas OU <strong>Anúria por $\ge 12$ horas</strong></td>
    </tr>
  </tbody>
</table>

<h3>Quadro Comparativo: Critérios RIFLE, AKIN e KDIGO</h3>
<p>Para fins de revisão histórica e resolução de questões de bancas que ainda citam sistemas anteriores, sintetizamos os três marcos taxonômicos:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Sistema de Classificação</th>
      <th>Ano de Criação</th>
      <th>Categorias e Classes</th>
      <th>Diferenciais e Particularidades Estruturais</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>RIFLE</strong></td>
      <td>2004 (ADQI)</td>
      <td><strong>R</strong> (Risk), <strong>I</strong> (Injury), <strong>F</strong> (Failure), <strong>L</strong> (Loss), <strong>E</strong> (End-Stage Kidney Disease)</td>
      <td>Utilizava variação da TFGe e aumento percentual da creatinina ($\times 1,5$, $\times 2$, $\times 3$). As classes Loss (perda completa $> 4$ semanas) e ESKD ($> 3$ meses) representavam desfechos clínicos e não gravidade aguda imediata. Não incluía o acréscimo absoluto de $0,3$ mg/dL.</td>
    </tr>
    <tr>
      <td><strong>AKIN</strong></td>
      <td>2007 (AKIN)</td>
      <td>Estágios 1, 2 e 3</td>
      <td>Introduziu o critério de elevação absoluta de $\ge 0,3$ mg/dL em 48h no estágio 1. Exigiu hidratação e correção hemodinâmica prévias. O início de diálise coloca automaticamente o paciente no estágio 3. Janela de tempo restrita a 48 horas.</td>
    </tr>
    <tr>
      <td><strong>KDIGO</strong></td>
      <td>2012 (KDIGO)</td>
      <td>Estágios 1, 2 e 3</td>
      <td>Harmonizou o RIFLE e o AKIN: manteve a subida de $\ge 0,3$ mg/dL em 48h E a subida $\ge 50\%$ em até 7 dias. Adotou os critérios de débito urinário idênticos ao RIFLE/AKIN. É o padrão internacional absoluto atual.</td>
    </tr>
  </tbody>
</table>

<h3>Limitações Fisiológicas da Creatinina Sérica na Urgência</h3>
<p>Embora a creatinina seja o marcador mais amplamente disponível na rotina hospitalar, o médico generalista e intensivista deve reconhecer suas armadilhas intrínsecas:</p>
<ol>
  <li><strong>Dependência da Massa Muscular e Idade:</strong> Pacientes caquéticos, idosos sarcopênicos, amputados, hepatopatas crônicos cirróticos e desnutridos produzem menos creatina hepática e muscular. Nesses indivíduos, uma creatinina sérica de $0,9$ mg/dL pode ocultar uma filtração glomerular real gravemente deprimida ($&lt; 30$ mL/min);</li>
  <li><strong>Atraso Temporal na Elevação (Cinética Lenta):</strong> Em um paciente que sofre agressão isquêmica renal total hiperaguda (ex.: parada cardiorrespiratória ou choque hemorrágico maciço), a filtração glomerular cai a zero imediatamente, mas a creatinina sérica acumula-se a uma taxa média de apenas $1,0$ a $2,0$ mg/dL por dia. Logo, nas primeiras 12 a 24 horas, o valor sérico pode permanecer dentro dos limites de referência laboratoriais apesar do colapso funcional renal estabelecido;</li>
  <li><strong>Diluição Volêmica por Hiper-hidratação:</strong> Pacientes sépticos ou politraumatizados submetidos à ressuscitação cristaloide agressiva sofrem hemodiluição de distribuição, o que reduz artificialmente a concentração sérica de creatinina, mascarando a LRA incipiente;</li>
  <li><strong>Secreção Tubular Proximal de Creatinina:</strong> Cerca de 10% a 15% da creatinina urinária é secretada ativamente pelas células do túbulo proximal (via transportadores de cátions orgânicos OCT2). Em estágios iniciais de queda da TFG, a secreção tubular aumenta como mecanismo compensatório, retardando ainda mais a subida sérica. Fármacos como trimetoprima e cimetidina inibem a OCT2, provocando aumento sérico da creatinina de $0,2$ a $0,5$ mg/dL <em>sem causar dano glomerular verdadeiro</em> (falsa LRA).</li>
</ol>
`
};

export const sec2 = {
  id: 'fisiopatologia-etiopatogenia-classificacao-tripartida',
  title: '2. Fisiopatologia e Etiopatogenia: LRA Pré-Renal, Renal Intrínseca e Pós-Renal',
  body_html: `
<h3>O Modelo Clássico Tripartite da Lesão Renal Aguda</h3>
<p>Para fins propedêuticos, semiológicos e terapêuticos, a abordagem diagnóstica da LRA é estruturada tradicionalmente em três compartimentos anatômicos e funcionais: <strong>Pré-Renal</strong> (hipoperfusão renal funcional sem lesão parenquimatosa estrutural inicial), <strong>Renal Intrínseca</strong> (comprometimento estrutural do parênquima: túbulos, interstício, glomérulos ou microvasos) e <strong>Pós-Renal ou Obstrutiva</strong> (impedimento mecânico ou funcional ao fluxo urinário no trato urinário excretor).</p>

<h3>1. LRA Pré-Renal (Azotemia Pré-Renal)</h3>
<p>A azotemia pré-renal representa a causa mais comum de LRA em pacientes ambulatoriais e internados em enfermarias clínicas (respondendo por aproximadamente 50% a 60% dos casos de LRA na comunidade e 30% a 40% no hospital). Caracteriza-se pela <strong>queda da pressão de perfusão capilar glomerular</strong> na ausência de necrose celular estrutural. Trata-se de uma resposta fisiológica protetora reversível: se a perfusão renal for prontamente restabelecida, a filtração glomerular normaliza-se em 24 a 72 horas.</p>

<p><strong>Mecanismos de Autorregulação Glomerular e Falha Adaptativa:</strong> Em condições normais, o fluxo sanguíneo renal (FSR) e a taxa de filtração glomerular (TFG) são mantidos constantes em uma ampla faixa de pressão arterial média (PAM de 80 a 180 mmHg) por dois mecanismos autoregulatórios intrínsecos:</p>
<ul>
  <li><strong>Vasodilatação da Arteriola Aferente:</strong> Mediada por prostaglandinas intrarrenais vasodilatadoras (PGE2 e PGI2/prostaciclina) e óxido nítrico endotelial, que reduzem a resistência de entrada para manter o fluxo intraglomerular;</li>
  <li><strong>Vasoconstrição da Arteriola Eferente:</strong> Mediada pelo sistema renina-angiotensina-aldosterona (SRAA) através da <em>Angiotensina II</em>, que contrai a arteríola de saída, aumentando a pressão hidrostática intracapilar glomerular ($P_{CG}$) e sustentando a fração de filtração.</li>
</ul>

<p><strong>A "Tempestade Perfeita" Farmacológica: AINEs e Bloqueadores do SRAA:</strong> Quando a pressão de perfusão sistêmica cai (hipovolemia, desidratação, diuréticos excessivos), esses dois mecanismos mantêm a TFG. Se o paciente faz uso de <strong>Anti-inflamatórios Não Esteroidais (AINEs)</strong>, a síntese de prostaglandinas é inibida, bloqueando a vasodilatação aferente e provocando intensa vasoconstrição de entrada. Se o paciente usa concomitantemente <strong>Inibidores da ECA (IECA: enalapril, captopril)</strong> ou <strong>Bloqueadores do Receptor de Angiotensina (BRA: losartana, valsartana)</strong>, a ação constritora da Angiotensina II sobre a arteríola eferente é abortada, promovendo vasodilatação eferente descontrolada. O resultado hemodinâmico é o colapso súbito da pressão hidrostática intraglomerular e precipitação aguda de LRA pré-renal severa.</p>

<p><strong>Principais Etiologias de LRA Pré-Renal:</strong></p>
<ol>
  <li><strong>Hipovolemia Absoluta:</strong> Hemorragias digestivas ou traumáticas, desidratação grave (vômitos incoercíveis, diarreia profusa, poliúria osmótica no DM, insolação), perdas renais excessivas por abuso de diuréticos de alça, perdas cutâneas por queimaduras extensas;</li>
  <li><strong>Redução do Volume Arterial Efetivo (Hipo-osmolaridade com Hipervolemia Total):</strong> Insuficiência cardíaca descompensada com baixo débito (Síndrome Cardiorrenal tipo 1), cirrose hepática com hipertensão portal e ascite volumosa (Síndrome Hepatorrenal), síndrome nefrótica grave com anasarca e hipoalbuminemia crítica;</li>
  <li><strong>Vasodilatação Sistêmica Excessiva:</strong> Choque distributivo séptico, choque anafilático, síndrome da resposta inflamatória sistêmica pós-circulação extracorpórea (CEC), uso inadvertido de anti-hipertensivos potentes;</li>
  <li><strong>Vasoconstrição Renal Intensa:</strong> Sepse inicial precoce, inibidores da calcineurina (ciclosporina, tacrolimus), hipercalcemia severa (vasoconstrição aferente direta), contraste iodado em fase hiperaguda, síndrome hepatorrenal.</li>
</ol>

<h3>2. LRA Renal Intrínseca (Parenquimatosa)</h3>
<p>Ocorre quando há dano histopatológico estrutural estabelecido em qualquer um dos quatro componentes anatômicos do parênquima renal:</p>

<h4>A. Necrose Tubular Aguda (NTA) — 85% das LRAs Intrínsecas</h4>
<p>A NTA é o estágio final da agressão isquêmica ou tóxica mantida sobre as células do epitélio tubular. Ocorre desprendimento de células epiteliais necróticas para o lúmen dos túbulos, obstrução intraluminal por cilindros celulares, refluxo trans-tubular do filtrado (<em>back-leak</em>) e vasoconstrição arteriolar reflexa sustentada por feedback tubuloglomerular mediado pela mácula densa.</p>
<ul>
  <li><strong>NTA Isquêmica:</strong> É a evolução natural da LRA pré-renal não tratada ou prolongada. Choque séptico, choque cardiogênico, choque hemorrágico, grandes cirurgias vasculares com clampeamento aórtico. As regiões mais vulneráveis à isquemia são o <strong>segmento reto do túbulo proximal (S3)</strong> e a <strong>porção espessa da alça ascendente de Henle na medula externa</strong>, por possuírem altíssima taxa metabólica de consumo de ATP (bomba Na+/K+ ATPase) operando sob uma pressão parcial de oxigênio fisiologicamente baixa;</li>
  <li><strong>NTA Tóxica Exógena:</strong>
    <ul>
      <li><strong>Aminoglicosídeos (Gentamicina, Amicacina):</strong> Acumulam-se nos lisossomos das células tubulares proximais por pinocitose mediada pelo receptor megalina-cubilina, gerando necrose celular tóxica. O dano manifesta-se tipicamente após <strong>5 a 10 dias</strong> de exposição contínua e apresenta-se classicamente como <em>LRA não oligúrica</em> associada a hipocalemia e hipomagnesemia por lesão tubular espoliadora;</li>
      <li><strong>Contraste Radiológico Iodado:</strong> Nefropatia induzida por contraste (NIC). Gera vasoconstrição medular intensa seguida de toxicidade tubular oxidativa direta. O pico de creatinina ocorre em 48 a 72 horas, com recuperação em 7 a 10 dias;</li>
      <li><strong>Vancomicina e Anfotericina B:</strong> A vancomicina gera estresse oxidativo e precipitação tubular de cilindros; a anfotericina B induz vasoconstrição da arteríola aferente e formação de poros líticos na membrana celular tubular, provocando hipocalemia grave e acidose tubular renal tipo 1;</li>
      <li><strong>Quimioterápicos:</strong> Cisplatina (necrose tubular proximal profunda) e Metotrexato (precipitação intraluminal de cristais sob pH urinário ácido);</li>
    </ul>
  </li>
  <li><strong>NTA Tóxica Endógena (Pigmentos e Cristais):</strong>
    <ul>
      <li><strong>Rabdomiólise (Mioglobinúria):</strong> Lesão muscular maciça (trauma por esmagamento, estátinas, convulsões prolongadas, infecções, hipocalemia grave) libera mioglobina na circulação. A mioglobina é filtrada no glomérulo, precipita-se nos túbulos com a proteína de Tamm-Horsfall sob pH urinário ácido formando cilindros de mioglobina obstrutivos e gera toxicidade oxidativa direta por radicais livres de ferro;</li>
      <li><strong>Hemólise Maciça (Hemoglobinúria):</strong> Reações transfusionais hemolíticas agudas, malária grave (febre da água preta), venenos de serpentes peçonhentas;</li>
      <li><strong>Síndrome de Lise Tumoral (Hiperuricemia Aguda):</strong> Liberação massiva de ácidos nucleicos após quimioterapia para neoplasias hematológicas (linfomas de alto grau, leucemias agudas). O ácido úrico precipita-se maciçamente nos túbulos coletores quando a concentração urinária excede sua solubilidade.</li>
    </ul>
  </li>
</ul>

<h4>B. Nefrite Intersticial Aguda (NIA)</h4>
<p>Processo inflamatório imunoalérgico que infiltra predominantemente o interstício renal e poupa relativamente os glomérulos na fase inicial. Mais de 70% a 80% dos casos são causados por <strong>hipersensibilidade medicamentosa tardia</strong> (independente de dose):</p>
<ul>
  <li><strong>Fármacos Causadores Típicos:</strong> Antibióticos betalactâmicos (oxacilina, ampicilina, penicilina cristalina, cefalosporinas), sulfas (sulfametoxazol-trimetoprima), fluoroquinolonas (ciprofloxacino), AINEs, inibidores da bomba de prótons (omeprazol, pantoprazol), rifampicina, alopurinol;</li>
  <li><strong>Tríade Clínica Clássica de Hipersensibilidade (presente em apenas 10% a 30% dos casos):</strong> Febre, exantema cutâneo maculopapular e artralgia. A eosinofilia periférica e a eosinofilúria sustentam a suspeita diagnóstica. O padrão-ouro diagnóstico definitivo é a biópsia renal percutânea (infiltrado mononuclear intersticial com linfócitos, plasmócitos e eosinófilos, edema intersticial e tubulite).</li>
</ul>

<h4>C. Glomerulonefrites Agudas e Doenças Vasculares Renais</h4>
<ul>
  <li><strong>Glomerulonefrite Rapidamente Progressiva (GNRP):</strong> Síndrome nefrítica fulminante acompanhada de perda rápida da função renal em dias a semanas, caracterizada histopatologicamente por <em>crescentes celulares em mais de 50% dos glomérulos</em>. Subdivide-se em Tipo 1 (doença antimembrana basal glomerular / Síndrome de Goodpasture com anticorpos anti-MBG), Tipo 2 (imunocomplexos: lúpus eritematoso sistêmico, pós-estreptocócica, crioglobulinemia) e Tipo 3 (pauci-imune associada a ANCA: granulomatose com poliangiite / Wegener e poliangiite microscópica);</li>
  <li><strong>Ateroembolismo Renal (Doença Ateroembólica / Embolia por Cristais de Colesterol):</strong> Ocorre tipicamente após manipulação vascular invasiva da aorta (cateterismo cardíaco, arteriografia, cirurgia de aneurisma) ou início de anticoagulação plena em pacientes idosos com aterosclerose aórtica severa. Fissuração de placas aórticas libera microêmbolos de colesterol que ocluem arteríolas arqueadas e interlobulares. Quadro sistêmico florido: LRA subaguda oscilante, livedo reticular em membros inferiores, síndrome dos dedos azuis (<em>blue toe syndrome</em>), necrose digital com pulsos distais preservados, eosinofilia periférica, hipocomplementemia e placas de Hollenhorst observadas na fundoscopia óptica da retina;</li>
  <li><strong>Microangiopatias Trombóticas (MAT):</strong> Púrpura Trombocitopênica Trombótica (PTT - deficiência grave da ADAMTS13 com predomínio neurológico) e Síndrome Hemolítico-Urêmica (SHU típica mediada por toxina Shiga de <em>E. coli</em> O157:H7 em crianças ou SHU atípica mediada por desregulação da via alternativa do complemento). Manifestam-se pela tríade: anemia hemolítica microangiopática com esquizócitos no esfregaço de sangue periférico, plaquetopenia de consumo e LRA com trombose microvascular.</li>
</ul>

<h3>3. LRA Pós-Renal (Obstrutiva)</h3>
<p>Representa 5% a 10% das causas de LRA hospitalar, mas deve ser <strong>obrigatoriamente a primeira causa a ser ativamente investigada e descartada</strong> por meio de ultrassonografia das vias urinárias à beira do leito (POCUS), visto que sua identificação precoce possibilita resolução mecânica descompressiva imediata, prevenindo perda nefrônica irreversível.</p>

<p><strong>Condição Anatômica Primordial para LRA Pós-Renal:</strong> Para que uma obstrução cause insuficiência renal aguda com elevação significativa de ureia e creatinina em indivíduos com anatomia renal prévia normal, o obstáculo mecânico deve ser <strong>bilateral</strong> ou acometer o <strong>trato de saída vesical comum (uretra/colo da bexiga)</strong>. Uma obstrução ureteral unilateral em um indivíduo com dois rins pérvios é compensada hemodinamicamente pelo rim contralateral sadio e cursa com função renal sérica estável (a menos que o paciente seja previamente monorrimo anatômico ou funcional).</p>

<p><strong>Principais Etiologias de LRA Obstrutiva:</strong></p>
<ul>
  <li><strong>Nível Uretral e Colo Vesical (Causas Baixas):</strong> Hiperplasia prostática benigna (HPB) complicada com retenção urinária aguda (bexigoma palpável em hipogástrio), adenocarcinoma avançado de próstata, estenose de uretra, cálculo vesical impactado, disfunção vesical neurogênica (trauma raquimedular, esclerose múltipla, neuropatia diabética autonômica, uso de anticolinérgicos e opioides);</li>
  <li><strong>Nível Ureteral Bilateral (Causas Altas):</strong> Nefrolitíase bilateral com cálculos impactados, fibrose retroperitoneal idiopática (Doença de Ormond), tumores pélvicos malignos ginecológicos avançados (câncer de colo uterino infiltrativo de paramétrios — causa clássica em provas), câncer de reto, linfomas retroperitoneais volumosos, ligadura iatrogênica acidental de ureteres durante histerectomia total abdominal;</li>
  <li><strong>Nível Intratubular Intrínseco:</strong> Precipitação aguda de cilindros de cadeias leves de imunoglobulinas (rim do mieloma / nefropatia por cilindros no Mieloma Múltiplo), precipitação massiva de ácido úrico na lise tumoral ou depósito de cristais de oxalato de cálcio na intoxicação por etilenoglicol.</li>
</ul>
`
};

export const sec3 = {
  id: 'biomarcadores-laboratoriais-sedimentoscopia-fracoes-excrecao',
  title: '3. Propedêutica Armada: Diferenciação Pré-Renal vs NTA, Biomarcadores e Sedimentoscopia Urinária',
  body_html: `
<h3>O Desafio Central do Raciocínio Clínico: Diferenciar LRA Pré-Renal de Necrose Tubular Aguda</h3>
<p>A diferenciação entre azotemia pré-renal funcional e necrose tubular aguda (NTA) isquêmica/tóxica é um dos temas mais recorrentes na prática médica e nas provas de título e residência. Essa distinção reside na <strong>integridade funcional do epitélio tubular</strong>:</p>
<ul>
  <li>Na <strong>LRA Pré-Renal</strong>, os túbulos renais estão anatomicamente intactos e sob máxima estimulação neuro-hormonal (aldosterona, angiotensina II, hormônio antidiurético - ADH e tônus simpático). Portanto, os túbulos respondem retendo avidamente sódio e água na tentativa de restaurar o volume intravascular. A urina resultante é <strong>extremamente concentrada (hiperosmolar)</strong> e <strong>pobre em sódio</strong>;</li>
  <li>Na <strong>NTA</strong>, o epitélio tubular está necrótico, descamado e desprovido de capacidade de reabsorção ativa e concentração medular contracorrente. A urina resultante é <strong>isostenúrica (densidade e osmolaridade semelhantes ao plasma)</strong> e <strong>rica em sódio</strong> (perda tubular obrigatória de sódio).</li>
</ul>

<h3>Tabela Clássica de Diferenciação Laboratorial Urinária</h3>
<p>Os índices urinários devem ser coletados preferencialmente <em>antes</em> do início de reposição volêmica vigorosa ou administração de diuréticos de alça:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Parâmetro Laboratorial</th>
      <th>LRA Pré-Renal (Túbulo Íntegro)</th>
      <th>LRA Renal Intrínseca / NTA (Túbulo Lesado)</th>
      <th>Mecanismo Fisiopatológico Subjacente</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Fração de Excreção de Sódio ($FeNa$)</strong></td>
      <td><strong>$&lt; 1\%$</strong> (frequentemente $&lt; 0,5\%$)</td>
      <td><strong>$&gt; 2\%$</strong> (podendo atingir $> 3\%$)</td>
      <td>Na pré-renal, aldosterona promove reabsorção máxima de Na+ nos túbulos coletores; na NTA, as bombas Na+/K+ ATPase necróticas perdem Na+ na urina.</td>
    </tr>
    <tr>
      <td><strong>Fração de Excreção de Ureia ($FeUreia$)</strong></td>
      <td><strong>$&lt; 35\%$</strong></td>
      <td><strong>$&gt; 50\%$</strong></td>
      <td><strong>Índice de escolha quando o paciente usou diuréticos de alça (Furosemida).</strong> A reabsorção de ureia no túbulo proximal não depende da alça de Henle.</td>
    </tr>
    <tr>
      <td><strong>Sódio Urinário Isolado ($Na_U$)</strong></td>
      <td><strong>$&lt; 20$ mEq/L</strong></td>
      <td><strong>$&gt; 40$ mEq/L</strong></td>
      <td>Reflete a avidez biológica tubular por retenção eletrolítica na hipovolemia.</td>
    </tr>
    <tr>
      <td><strong>Relação Ureia / Creatinina Sérica</strong></td>
      <td><strong>$&gt; 40 : 1$</strong></td>
      <td><strong>$&lt; 20 a 30 : 1$</strong></td>
      <td>A ureia é reabsorvida passivamente com a água no túbulo proximal estimulado pela angiotensina II; a creatinina não é reabsorvida.</td>
    </tr>
    <tr>
      <td><strong>Osmolaridade Urinária ($Osm_U$)</strong></td>
      <td><strong>$&gt; 500$ mOsm/kg</strong></td>
      <td><strong>$&lt; 350$ mOsm/kg (Isostenúria)</strong></td>
      <td>ADH elevado concentra a urina na medula hiperosmolar intacta; na NTA, o gradiente medular é perdido e a urina mimetiza o plasma (~300 mOsm/kg).</td>
    </tr>
    <tr>
      <td><strong>Densidade Urinária (EAS / Urina 1)</strong></td>
      <td><strong>$&gt; 1.020$</strong></td>
      <td><strong>$&le; 1.010 - 1.012$</strong></td>
      <td>Acompanha a capacidade tubular de concentrar o filtrado glomerular.</td>
    </tr>
    <tr>
      <td><strong>Relação Creatinina Urinária / Plasmática</strong></td>
      <td><strong>$&gt; 40$</strong></td>
      <td><strong>$&lt; 20$</strong></td>
      <td>Grande absorção de água concentra a creatinina no lúmen urinário na pré-renal.</td>
    </tr>
  </tbody>
</table>

<h3>Fórmulas das Frações de Excreção</h3>
<div class="formula-box">
  <p><strong>Fração de Excreção de Sódio ($FeNa$):</strong></p>
  <p>$$FeNa\ (\%) = \frac{Na_U \times Cr_P}{Na_P \times Cr_U} \times 100$$</p>
  <p><em>Onde: $Na_U$ = sódio urinário (mEq/L), $Cr_P$ = creatinina plasmática (mg/dL), $Na_P$ = sódio plasmático (mEq/L), $Cr_U$ = creatinina urinária (mg/dL).</em></p>
</div>

<div class="formula-box">
  <p><strong>Fração de Excreção de Ureia ($FeUreia$):</strong></p>
  <p>$$FeUreia\ (\%) = \frac{Ureia_U \times Cr_P}{Ureia_P \times Cr_U} \times 100$$</p>
  <p><strong>Regra Prática Fundamental:</strong> Se o paciente recebeu qualquer dose de furosemida nas últimas 24 horas, o bloqueio do carreador Na+/K+/2Cl- na alça de Henle força a perda urinária de sódio ($Na_U > 40$ mEq/L e $FeNa > 2\%$), invalidando o $FeNa$. Nesses casos, <strong>calcula-se obrigatoriamente a $FeUreia$</strong>: valor $&lt; 35\%$ confirma padrão pré-renal.</p>
</div>

<h3>Exceções Notáveis: Situações de NTA com $FeNa &lt; 1\%$</h3>
<p>Determinadas causas de lesão renal intrínseca cursam atipicamente com fração de excreção de sódio baixa ($&lt; 1\%$), gerando frequentes pegadinhas em provas de alto rendimento:</p>
<ol>
  <li><strong>Nefropatia Induzida por Contraste Iodado:</strong> A vasoconstrição arteriolar renal pré-glomerular intensa e prolongada reduz a carga filtrada de sódio, mantendo $FeNa &lt; 1\%$ apesar do dano tubular;</li>
  <li><strong>Rabdomiólise com Mioglobinúria Aguda:</strong> A mioglobina causa vasoconstrição intrarrenal severa por sequestro de óxido nítrico endotelial antes que ocorra necrose tubular extensa;</li>
  <li><strong>Queimaduras Graves e Pancreatite Aguda Necrosante com NTA Inicial:</strong> Intensa vasodilatação esplâncnica e terceiro espaço;</li>
  <li><strong>Glomerulonefrite Aguda e Vasculite Renal:</strong> Como a lesão primária é glomerular (inflamação e queda severa do coeficiente de ultrafiltração $K_f$), os túbulos permanecem histologicamente intactos e retêm sódio avidamente ($FeNa &lt; 1\%$).</li>
</ol>

<h3>Sedimentoscopia Urinária: O "Eletrocardiograma do Rim"</h3>
<p>O exame microscópico do sedimento urinário fresco centrifugado fornece informações etiológicas imediatas:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Achado Microscópico do Sedimento</th>
      <th>Descrição Morfológica</th>
      <th>Correlação Clínica e Doença Etiológica Típica</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Cilindros Granulosos Pardos (<em>Muddy Brown Casts</em>)</strong></td>
      <td>Cilindros granulares escuros formados pela coalescência de debris e células tubulares necróticas</td>
      <td><strong>Patognomônico de Necrose Tubular Aguda (NTA)</strong> isquêmica ou nefrotóxica. Altíssima especificidade.</td>
    </tr>
    <tr>
      <td><strong>Cilindros Hialinos</strong></td>
      <td>Moldes proteicos homogêneos translúcidos formados exclusivamente pela mucoproteína de Tamm-Horsfall</td>
      <td><strong>Típico de LRA Pré-Renal</strong>, desidratação, estados de baixo fluxo urinário, febre ou exercício físico extenuante. Não indica dano celular intrínseco.</td>
    </tr>
    <tr>
      <td><strong>Cilindros Hemáticos e Hemácias Dismórficas</strong></td>
      <td>Hemácias fragmentadas no interior de matriz proteica; dismorfismo eritrocitário $\ge 40\%$ a $80\%$ com acantócitos (células G1)</td>
      <td><strong>Patognomônico de Glomerulonefrite Aguda</strong> (Glomerulopatia, GNRP, Síndrome Nefrítica, Vasculite Renal). Indica sangramento de origem glomerular.</td>
    </tr>
    <tr>
      <td><strong>Cilindros Leucocitários e Eosinofilúria</strong></td>
      <td>Aglomerados de leucócitos intraluminais; coloração especial de Hansel ou Wright confirmando eosinófilos urinários</td>
      <td><strong>Nefrite Intersticial Aguda (NIA)</strong> imunoalérgica, pielonefrite bacteriana aguda ou nefrite lúpica.</td>
    </tr>
    <tr>
      <td><strong>Células Epiteliais Tubulares Renais Descamadas</strong></td>
      <td>Células poliédricas mononucleadas maiores que leucócitos com núcleos redondos vesiculosos</td>
      <td>NTA ativa em fase de descamação celular maciça, rejeição aguda de aloenxerto renal.</td>
    </tr>
    <tr>
      <td><strong>Cristais de Oxalato de Cálcio Monoidratados</strong></td>
      <td>Cristais em formato de agulha ou haltere (biconvexos)</td>
      <td><strong>Intoxicação por Etilenoglicol</strong> (aditivos de radiador automotivo), associada a acidose metabólica grave com ânion-gap aumentado e gap osmolar elevado.</td>
    </tr>
    <tr>
      <td><strong>Cristais de Ácido Úrico</strong></td>
      <td>Cristais amorfos losângicos ou prismáticos amarelos/castanhos</td>
      <td><strong>Nefropatia Aguda por Ácido Úrico / Síndrome de Lise Tumoral</strong> após quimioterapia.</td>
    </tr>
  </tbody>
</table>

<h3>Novos Biomarcadores de Dano Renal Precoce: Além da Creatinina</h3>
<p>Para mitigar o atraso diagnóstico inerente à creatinina, a nefrologia contemporânea desenvolveu biomarcadores moleculares capazes de detectar <em>estresse celular e necrose tubular</em> horas antes de qualquer elevação da creatinina sérica (fase pré-clínica ou "LRA subclínica"):</p>
<ul>
  <li><strong>NGAL (<em>Neutrophil Gelatinase-Associated Lipocalin</em>):</strong> Proteína expressa constitutivamente em baixos níveis pelos granulócitos, mas hiperinduzida maciçamente pelas células tubulares renais proximais e distais em resposta à agressão isquêmica ou tóxica. Eleva-se na urina e no plasma dentro de <strong>2 a 4 horas</strong> após a lesão (marcador ultra-precoce de NTA);</li>
  <li><strong>KIM-1 (<em>Kidney Injury Molecule-1</em>):</strong> Glicoproteína transmembrana altamente específica do túbulo proximal, superexpressa na membrana apical de enterócitos desdiferenciados após isquemia ou agressão por cisplatina/aminoglicosídeos. Elevada na urina a partir de 6 horas;</li>
  <li><strong>[TIMP-2] $\times$ [IGFBP7] (NephroCheck):</strong> Produto da multiplicação das concentrações urinárias do <em>Inibidor Tecidual de Metaloproteinase-2</em> e da <em>Proteína de Ligação ao Fator de Crescimento Semelhante à Insulina 7</em>. Atuam como marcadores de <strong>parada do ciclo celular na fase G1</strong> em resposta ao estresse celular. Um valor $&gt; 0,3$ identifica pacientes sob alto risco de evolução para LRA moderada a grave nas próximas 12 horas.</li>
</ul>
`
};

export const sec4 = {
  id: 'manejo-clinico-reposicao-volemica-diureticos',
  title: '4. Manejo Terapêutico Inicial: Ressuscitação Volêmica Balanceada vs Diuréticos e Nefroproteção',
  body_html: `
<h3>Princípios Fundamentais da Abordagem Inicial da LRA</h3>
<p>O manejo da Lesão Renal Aguda é eminentemente preventivo e sindrômico, guiado pelo reconhecimento imediato e reversão da causa desencadeante, otimização hemodinâmica e restauração da perfusão renal, suspensão imediata de agentes nefrotóxicos e prevenção de complicações metabólicas fatais.</p>

<h3>1. Ressuscitação Volêmica e Escolha da Solução Cristaloide</h3>
<p>Nos pacientes com LRA pré-renal confirmada ou suspeita por depleção de volume (desidratação, perdas gastrointestinais, choque hemorrágico, sepse), a reposição volêmica imediata é a intervenção de maior impacto prognóstico:</p>
<ul>
  <li><strong>Cristaloides Balanceados vs Soro Fisiológico a 0,9%:</strong> Grandes ensaios clínicos randomizados contemporâneos (SMART, SALT-ED e BaSICS) demonstraram conclusivamente que a infusão volumosa de <strong>Soro Fisiológico a 0,9% (Cloreto de Sódio)</strong> — que contém 154 mEq/L de Na+ e 154 mEq/L de Cl-, apresentando um <em>strong ion difference (SID)</em> de zero — acarreta <strong>acidose metabólica hiperclorêmica</strong>. A hipercloremia atinge a mácula densa tubular, ativando intensamente o feedback tubuloglomerular com <strong>vasoconstrição sustentada da arteríola aferente renal</strong>, redução da perfusão cortical renal e aumento da incidência de LRA com necessidade de diálise;</li>
  <li><strong>A Escolha de Primeira Linha:</strong> As <strong>soluções cristaloides balanceadas (Ringer Lactato ou Plasma-Lyte)</strong>, com concentrações de cloro mais próximas da fisiologia plasmática (98 a 109 mEq/L) e tamponadas com lactato ou acetato/gluconato, são as soluções de escolha para a ressuscitação volêmica na LRA e sepse;</li>
  <li><strong>Alvos Hemodinâmicos de Ressuscitação:</strong> O objetivo hemodinâmico é garantir uma <strong>Pressão Arterial Média (PAM) $\ge 65$ mmHg</strong>. Em pacientes idosos previamente hipertensos crônicos mal controlados, o limiar de autorregulação renal encontra-se desviado para a direita; nesses casos específicos, alvos de PAM ligeiramente superiores (75 a 85 mmHg) reduzem a necessidade de diálise;</li>
  <li><strong>Drogas Vasoativas de Escolha:</strong> Se a reposição volêmica guiada por parâmetros dinâmicos (variação da pressão de pulso - $\Delta PP$, elevação passiva das pernas ou ultrassonografia de veia cava inferior e pulmão) indicar término da fase de responsividade a volume e a PAM persistir $&lt; 65$ mmHg, inicia-se prontamente o vasopressor de escolha: <strong>Noradrenalina</strong> em infusão contínua. A noradrenalina restaura o tônus arteriolar sistêmico e da arteríola eferente renal, elevando o gradiente de ultrafiltração glomerular sem comprometer a microcirculação medular renal quando associada à volemia corrigida.</li>
</ul>

<h3>2. O Perigo da Sobrecarga Hídrica (Fluid Overload)</h3>
<p>Se a hipovolemia é deletéria, a <strong>hiper-hidratação descontrolada (sobrecarga hídrica)</strong> é igualmente letal para o rim. O rim é um órgão capsulado e complacente; o aumento da pressão venosa central e o edema intersticial renal gerado por acúmulo hídrico causam congestão venosa renal retrógrada, elevação da pressão intersticial intracapsular e compressão extrínseca dos capilares peritubulares e vasa recta. Isso reduz drasticamente o gradiente de perfusão renal transvascular ($PAM - PVC$), perpetuando a isquemia parenquimatosa e a oligúria.</p>
<p><strong>Definição e Corte de Alerta:</strong> A sobrecarga hídrica é definida como o ganho de peso cumulativo decorrente de balanço hídrico positivo <strong>$&gt; 10\%$ em relação ao peso corporal basal</strong>. Estudos epidemiológicos associam a sobrecarga hídrica $> 10\%$ a aumento dramático de mortalidade, falência de desmame ventilatório e não recuperação da função renal.</p>

<h3>3. O Papel dos Diuréticos de Alça: Mitos, Fatos e o Teste de Estresse com Furosemida (FST)</h3>
<p>O uso indiscriminado de diuréticos de alça (Furosemida) na LRA gerou intensa controvérsia clínica durante décadas:</p>
<ul>
  <li><strong>O que a Furosemida NÃO faz:</strong> A furosemida <strong>não previne a LRA</strong>, não altera a mortalidade global, não reduz a progressão de LRA pré-renal para NTA e não antecipa a recuperação da filtração glomerular. O uso de diurético em paciente hipovolêmico é contraindicado e precipita isquemia renal grave;</li>
  <li><strong>Quando a Furosemida DEVE ser usada:</strong> Sua indicação é restrita ao controle sintomático e manejo da <strong>hipervolemia refratária e congestão pulmonar aguda (edema agudo de pulmão hipertensivo ou cardiogênico)</strong> com retenção de sal e água;</li>
  <li><strong>O Teste de Estresse com Furosemida (<em>Furosemide Stress Test - FST</em>):</strong> Desenvolvido como uma ferramenta funcional preditiva de alta sensibilidade para identificar a integridade tubular medular funcional e antecipar a necessidade de diálise em pacientes com LRA estágio 1 ou 2 que já estejam <strong>rigorosamente euvolêmicos ou hipervolêmicos</strong>:
    <ul>
      <li><strong>Protocolo Operacional:</strong> Administra-se Furosemida intravenosa em bólus na dose de <strong>1,0 mg/kg</strong> em pacientes virgens de diurético, ou <strong>1,5 mg/kg</strong> em pacientes com uso prévio crônico de furosemida;</li>
      <li><strong>Interpretação Prognóstica:</strong> Mede-se o débito urinário nas <strong>duas horas subsequentes</strong>. Uma resposta urinária <strong>$&lt; 200$ mL em 2 horas</strong> (teste negativo) possui sensibilidade de 87% e especificidade de 84% para prever progressão para LRA estágio 3 e necessidade imperativa de terapia renal substitutiva (denotando extensa necrose e bloqueio dos transportadores NKCC2 medulares).</li>
    </ul>
  </li>
</ul>

<h3>4. Revisão e Suspensão de Fármacos Nefrotóxicos</h3>
<p>Todo paciente com LRA estabelecida ou sob risco iminente deve ter seu prontuário e prescrição minuciosamente auditados para suspensão de agentes lesivos:</p>
<ol>
  <li><strong>Suspensão Imediata:</strong> AINEs (incluindo inibidores seletivos da COX-2 como celecoxibe), aminoglicosídeos (substituir por betalactâmico ou quinolona guiada por antibiograma), contraste iodado (adiar exames não emergenciais ou utilizar ressonância sem gadolínio se viável);</li>
  <li><strong>Manejo de IECA / BRA:</strong> Em vigência de LRA isquêmica ou sepse com instabilidade hemodinâmica, IECA e BRA devem ser <strong>temporariamente suspensos</strong> para permitir a vasoconstrição compensatória da arteríola eferente e recuperação da taxa de filtração;</li>
  <li><strong>Ajuste Obrigatório de Dose pela TFGe:</strong> Antibióticos (meropenem, vancomicina, piperacilina-tazobactam, cefepime), anticoagulantes (enoxaparina — risco de sangramento fatal por acúmulo de heparina de baixo peso molecular, devendo ser substituída por heparina não fracionada quando TFGe $< 30$ mL/min), hipoglicemiantes orais (metformina — risco de acidose lática grave; sulfonilureias — hipoglicemia prolongada) e opioides (morfina e codeína acumulam metabólitos neurotóxicos como morfina-6-glicuronídeo, optando-se por fentanil ou metadona).</li>
</ol>
`
};
