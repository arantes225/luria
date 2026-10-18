// scripts/build-bloco-06-117-part2.mjs
// Aula 117: Isquemia Mesentérica - Parte 2: Seções 5 a 8 (Isquemia Crônica, Colite Isquêmica, Casos Clínicos e Questões)

export const sec5 = {
  id: 'isquemia-mesenterica-cronica-e-colite-isquemica',
  title: '5. Isquemia Mesentérica Crônica (Angina Abdominal) e Colite Isquêmica',
  body_html: `
<h3>Isquemia Mesentérica Crônica: A "Angina Abdominal"</h3>
<p>A <strong>Isquemia Mesentérica Crônica (IMC)</strong> é uma condição vascular insidiosa resultante da insuficiência circulatória aterosclerótica crônica dos grandes troncos arteriais esplâncnicos, impedindo a resposta hiperêmica fisiológica demandada pelo intestino durante a digestão pós-prandial:</p>
<ul>
  <li><strong>Fisiopatologia da Estenose Multiarterial:</strong> Como a rede de colaterais entre o tronco celíaco, a AMS e a AMI é excepcionalmente rica, o aparecimento de sintomas clínicos exige tipicamente a <strong>estenose hemodinamicamente crítica ($\ge 70\%$) ou oclusão completa de PELO MENOS DOIS dos três troncos viscerais principais</strong> (habitualmente tronco celíaco + AMS);</li>
  <li><strong>A Tríade Clínica Clássica da Isquemia Mesentérica Crônica:</strong>
    <ol>
      <li><strong>Dor Abdominal Pós-Prandial ("Angina Abdominal"):</strong> Dor epigástrica ou periumbilical contínua em queimação ou cólica que se inicia tipicamente <strong>20 a 45 minutos após a ingesta alimentar</strong>, com pico de intensidade em 1 a 2 horas e alívio espontâneo após 3 a 4 horas (momento em que a demanda metabólica digestiva retorna aos níveis basais);</li>
      <li><strong>"Medo de se Alimentar" (Sitofobia):</strong> O paciente associa diretamente a dor dilacerante ao ato da alimentação, desenvolvendo aversão e pavor à comida, reduzindo progressivamente o volume e a frequência das refeições diárias;</li>
      <li><strong>Perda Ponderal Severa e Progressiva (Emagrecimento Marcante):</strong> Ocorre emagrecimento consumptivo profundo de 10 a 20 kg em poucos meses, decorrente da combinação de ingestão calórica mínima voluntária somada à má absorção intestinal isquêmica crônica;</li>
    </ol>
  </li>
  <li><strong>Exame Físico:</strong> Paciente idoso, caquético, desnutrido, sarcopênico, com evidência de vasculopatia periférica sistêmica (sopros carotídeos, pulsos pediosos diminuídos). Em até 50% dos casos, ausculta-se um <strong>sopro sistólico no epigástrio</strong>;</li>
  <li><strong>Diagnóstico Propedêutico:</strong>
    <ul>
      <li><em>Eco-Doppler de Artérias Mesentéricas:</em> Excelente método de triagem não invasivo (velocidade de pico sistólico $> 275$ cm/s na AMS e $> 200$ cm/s no tronco celíaco indicam estenose $\ge 70\%$);</li>
      <li><em>Angio-TC de Abdome Multislice ou Angiorressonância:</em> Padrão-ouro confirmatório para visualização tridimensional das placas ateroscleróticas calcificadas ostiais e planejamento da rota cirúrgica;</li>
    </ul>
  </li>
  <li><strong>Tratamento da Isquemia Crônica:</strong>
    <p>O objetivo é restaurar o fluxo arterial para aliviar a dor, recuperar o estado nutricional e <strong>prevenir a evolução catastrófica para isquemia mesentérica aguda por trombose sobreposta da AMS</strong> (que ocorre em até 30% a 50% dos pacientes não tratados):</p>
    <ul>
      <li><strong>Terapia Endovascular (Primeira Linha na maioria dos centros):</strong> Angioplastia transluminal percutânea com implante de <strong>Stent metálico balão-expansível</strong> na AMS e/ou tronco celíaco via acesso braquial ou femoral. Menor morbimortalidade peroperatória, ideal para pacientes idosos frágeis e desnutridos;</li>
      <li><strong>Cirurgia Aberta de Revascularização:</strong> Bypass aorto-mesentérico ou celíaco com enxerto de veia safena ou PTFE. Apresenta maior patência primária a longo prazo (superior a 85% em 5 anos), sendo indicada em falhas endovasculares ou lesões arteriais extensas em pacientes mais jovens com bom risco cirúrgico.</li>
    </ul>
  </li>
</ul>

<h3>Colite Isquêmica: A Forma Mais Comum de Isquemia Intestinal</h3>
<p>A <strong>Colite Isquêmica</strong> é a afecção isquêmica do trato gastrointestinal mais prevalente no mundo, respondendo por mais de <strong>60% a 70% de todos os episódios de isquemia intestinal hospitalar</strong>. Trata-se de uma condição fisiopatológica completamente diferente da isquemia mesentérica aguda:</p>
<ul>
  <li><strong>Fisiopatologia:</strong> Ocorre por <strong>hipoperfusão transitória da microcirculação da parede do cólon (baixo fluxo não oclusivo microvascular)</strong>, sem oclusão de grandes troncos arteriais por trombos ou êmbolos. Os fatores precipitantes clássicos incluem: episódios transitórios de hipotensão arterial sistêmica, desidratação, cirurgias cardiovasculares de grande porte (com pinçamento aórtico), choque hipovolêmico ou séptico, corrida de maratona (isquemia do corredor de longa distância) e fármacos vasoconstritores (descongestionantes com pseudoefedrina, cocaína, sumatriptano e digitálicos);</li>
  <li><strong>Localizações Anatômicas Prediletas:</strong> Acomete preferencialmente as zonas de bacia hidrográfica terminal:
    <ol>
      <li><strong>Ângulo Esplênico do Cólon (Ponto de Griffith):</strong> Mais comum de todos (borda distal entre AMS e AMI);</li>
      <li><strong>Junção Retossigmoide (Ponto de Sudeck):</strong> Transição entre artérias sigmoideas e retal superior;</li>
      <li><strong>Poupamento Típico do Reto:</strong> O reto distal é ricamente irrigado por vasos das artérias ilíacas internas (retais médias e inferiores), sendo <strong>poupado em mais de 95% dos casos de colite isquêmica</strong> (achado fundamental para diferenciar da retocolite ulcerativa na retosigmoidoscopia);</li>
    </ol>
  </li>
  <li><strong>Apresentação Clínica Clássica:</strong>
    <p>Paciente idoso que apresenta <strong>dor abdominal em cólica de início súbito localizada na Fossa Ilíaca Esquerda (FIE)</strong> e flanco esquerdo, seguida dentro de 12 a 24 horas por <strong>eliminação de fezes com sangue vermelho-vivo ou diarreia sanguinolenta (hematoquezia moderada)</strong>. O sangramento é autolimitado e raramente cursa com instabilidade hemodinâmica volumosa;</p>
  </li>
  <li><strong>Propedêutica Armada:</strong>
    <ul>
      <li><em>Radiografia de Abdome Simples:</em> Pode demonstrar o clássico <strong>Sinal do Thumbprinting (Impressões Digitais / Marcas do Polegar)</strong> na flexura esplênica ou cólon descendente, correspondendo a espessamento nodular da mucosa por edema e hemorragia submucosa;</li>
      <li><em>Tomografia Computadorizada de Abdome com Contraste:</em> Espessamento circunferencial contínuo segmentar da parede cólica com padrão em alvo / duplo halo; vasos mesentéricos principais completamente pérvios (sem trombos);</li>
      <li><em>Colonoscopia (ou Retossigmoidoscopia Flexível com Baixa Insuflação):</em> É o <strong>exame padrão-ouro confirmatório</strong> quando realizada dentro das primeiras 48 horas sob mínima insuflação de ar. Demonstra mucosa pálida, edemaciada, com petéquias hemorrágicas, úlceras lineares longitudinais ao longo da tênia mesocólica e <strong>poupa o reto distal</strong>;</li>
    </ul>
  </li>
  <li><strong>História Natural e Manejo Clínico:</strong>
    <ul>
      <li><em>Forma Transitória e Reversível (85% a 90% dos casos):</em> A lesão é restrita à mucosa e submucosa. Evolui para resolução clínica completa e cicatrização espontânea em 1 a 2 semanas. Tratamento é <strong>100% CONSERVADOR</strong>: jejum relativo ou dieta leve, hidratação intravenosa balanceada, correção da causa hemodinâmica precipitante e observação clínica estrita; antibióticos são reservados para casos com febre ou leucocitose;</li>
      <li><em>Forma Gangrenosa / Fuminante (10% a 15%):</em> Ocorre necrose transmural irreversível com peritonite difusa, perfuração cólica livre e choque séptico. Conduta: <strong>Laparotomia exploradora de urgência imediata com Colectomia Segmentar</strong> (hemicolectomia esquerda ou colectomia subtotal) com estoma terminal (sem anastomose primária).</li>
    </ul>
  </li>
</ul>
`
};

export const sec6 = {
  id: 'casos-clinicos-estruturados-isquemia-mesenterica',
  title: '6. Casos Clínicos Estruturados e Raciocínio Diagnóstico-Cirúrgico Passo a Passo',
  body_html: `
<h3>Caso Clínico 1: Dor Desproporcional, Fibrilação Atrial e Embolia da AMS</h3>
<div class="book-case">
  <p><strong>Identificação:</strong> Mulher de 74 anos, hipertensa e portadora de Fibrilação Atrial crônica em uso irregular de anticoagulante oral (varfarina com suspensão por conta própria há 2 semanas), é trazida à emergência médica com quadro de dor abdominal súbita, de intensidade máxima (10/10 na escala visual analógica), que teve início abrupto há 3 horas enquanto assistia à televisão.</p>
  <p><strong>Evolução Inicial:</strong> Refere que, imediatamente após o início da dor lancinante no mesogástrio, apresentou dois episódios de vômitos alimentares seguidos por diarreia aquosa profusa. Recebeu 10 mg de morfina intravenosa no trajeto do resgate móvel com alívio mínimo da dor.</p>
  <p><strong>Exame Físico na Admissão:</strong> Paciente agitada, gritando e contorcendo-se na maca por dor severa, pálida, sudoreica e taquipneica (FR 26 irpm). Ritmo cardíaco irregular com FC de 118 bpm (fibrilação atrial de alta resposta ventricular), PA 135/85 mmHg, afebril (T 36,8 ºC). <strong>Palpação do Abdome:</strong> O abdome encontra-se completamente <strong>plano, flácido, sem qualquer rigidez ou defesa muscular, indolor à descompressão brusca superficial e profunda (Blumberg rigorosamente negativo)</strong>, com ruídos hidroaéreos discretamente aumentados. Ausência de massas palpáveis ou sopros audíveis.</p>
  <p><strong>Laboratório Imediato:</strong> Hemograma: 18.400 leucócitos/mm³ com 11% de bastonetes; Gasometria arterial: pH 7,32, pCO2 32 mmHg, HCO3- 16 mEq/L, Lactato sérico de 2,8 mmol/L (hiperlactatemia inicial). Creatinina: 1,1 mg/dL; D-Dímero: 4.800 ng/mL.</p>
  <p><strong>Discussão Diagnóstica e Conduta Terapêutica Escalonada:</strong></p>
  <ul>
    <li><em>Raciocínio Clínico:</em> A clássica <strong>dissociação clínico-semiológica</strong> entre uma dor abdominal visceral dilacerante e um abdome completamente flácido e desprovido de peritonite ao exame físico, em uma paciente idosa com fibrilação atrial não anticoagulada que apresentou esvaziamento intestinal reativo e leucocitose marcante, sela a <strong>Isquemia Mesentérica Aguda por Embolia da Artéria Mesentérica Superior (EAMS)</strong> como hipótese obrigatória de urgência máxima;</li>
    <li><em>Propedêutica Armada de Escolha Imediata:</em> Realização imediata de <strong>Angiotomografia Computadorizada (Angio-TC) de abdome total com contraste intravenoso</strong>: confirma falha de enchimento intraluminal focal na AMS situada a cerca de 5 cm de sua origem aórtica, logo após a emergência dos primeiros ramos jejunais (padrão embólico clássico), com hipoatenuação e ausência de realce na parede do íleo terminal, sem pneumatose ou perfuração;</li>
    <li><em>Conduta Cirúrgica de Emergência:</em>
      <ol>
        <li>Início imediato de <strong>Heparinização plena com Heparina Não Fracionada intravenosa</strong> e antibioticoterapia intravenosa com Piperacilina-Tazobactam;</li>
        <li>Encaminhamento direto para centro cirúrgico para <strong>Laparotomia Exploradora de Urgência</strong>;</li>
        <li>Dissecção da AMS na raiz do mesocólon e realização de <strong>Embolectomia com Cateter de Fogarty 3F/4F</strong> através de arteriotomia transversa, com aspiração de êmbolo cardioembólico e recuperação imediata de fluxo pulsátil vigoroso;</li>
        <li>Inspeção de viabilidade: observa-se retorno da coloração rósea e pulsações palpáveis em praticamente todo o delgado, restando apenas um segmento de 20 cm de íleo terminal com coloração mosqueada duvidosa;</li>
        <li><strong>Estratégia de Controle de Danos e Second-Look:</strong> Como o segmento limítrofe não apresenta necrose evidente, o cirurgião opta por <em>não ressecar</em> a alça imediatamente; fecha temporariamente a parede abdominal com curativo a vácuo (laparostomia) e programa <strong>laparotomia de second-look em 24 a 36 horas</strong>;</li>
        <li>Na reoperação programada em 30 horas na UTI com paciente estabilizada, a alça ileal recuperou completamente o peristaltismo e coloração, sendo poupada de enterectomia, realizando-se a síntese definitiva da parede abdominal.</li>
      </ol>
    </li>
  </ul>
</div>

<h3>Caso Clínico 2: Paciente Crítico em Choque e Isquemia Não Oclusiva (IMNO)</h3>
<div class="book-case">
  <p><strong>Identificação:</strong> Homem de 69 anos, internado na Unidade de Terapia Intensiva no 5º dia pós-operatório de cirurgia de revascularização do miocárdio de urgência complicada por choque cardiogênico severo, mantido sob ventilação mecânica invasiva e sob suporte hemodinâmico com Noradrenalina (0,8 $\mu$g/kg/min) e Vasopressina (0,04 UI/min).</p>
  <p><strong>Evolução Clínica:</strong> A equipe de enfermagem da UTI nota distensão abdominal progressiva nas últimas 12 horas, saída de secreção com aspecto em borra de café pela sonda nasogástrica (1.200 mL/24h) e parada completa da eliminação de gases pelo cateter retal. O paciente evolui com piora metabólica fulminante: a gasometria revela acidose metabólica grave refratária com pH 7,14, HCO3- 9 mEq/L e <strong>Lactato sérico disparando de 1,8 para 7,4 mmol/L</strong>.</p>
  <p><strong>Exame Físico e Imagem:</strong> Paciente sedado e curarizado. Abdome maciçamente distendido, tenso, com ruídos hidroaéreos completamente abolidos. Angio-TC de abdome demonstra: <strong>Artéria Mesentérica Superior, Tronco Celíaco e Veia Mesentérica amplamente PÉRVIOS, SEM trombos ou falhas de enchimento</strong>; contudo, observa-se afilamento severo difuso e espasmo difuso de todos os ramos arteriais jejunais e ileais ("árvore desfolhada"), com líquido livre peritoneal e hipoatenuação difusa da parede do intestino delgado.</p>
  <p><strong>Discussão e Decisão Terapêutica:</strong></p>
  <ul>
    <li><em>Diagnóstico:</em> <strong>Isquemia Mesentérica Não Oclusiva (IMNO)</strong> secundária ao choque cardiogênico com hipoperfusão sistêmica e vasoconstrição induzida por altas doses de aminas vasopressoras;</li>
    <li><em>Fisiopatologia e Desafio Clínico:</em> Trata-se da causa de pior prognóstico e mais difícil manejo, pois o vaso condutor está livre de obstrução mecânica e o problema reside no espasmo microvascular terminal protetor que tentou priorizar o miocárdio e o cérebro;</li>
    <li><em>Conduta Terapêutica Específica:</em>
      <ol>
        <li>Otimização hemodinâmica do débito cardíaco (reavaliação de inotrópicos como Milrinona ou Dobutamina, uso de balão intra-aórtico de contrapulsação);</li>
        <li>Tentativa de desmame progressivo da vasopressina e redução da noradrenalina assim que a perfusão coronariana permitir;</li>
        <li><strong>Arteriografia Mesentérica Seletiva de Emergência com Cateterismo da AMS:</strong> Introdução de microcateter diretamente no tronco da AMS e início de <strong>Infusão Contínua de Vasodilatador Seletivo (Papaverina intravenosa intra-arterial a 30 a 60 mg/hora)</strong> para reverter o espasmo microcirculatório mesentérico;</li>
        <li>Vigilância rigorosa para sinais de perfuração ou peritonite: se o lactato persistir em ascensão descontrolada ou surgir pneumoperitônio/pneumatose, indicar laparotomia de controle de danos.</li>
      </ol>
    </li>
  </ul>
</div>

<h3>Caso Clínico 3: Idosa com Dor na FIE e Hematoquezia Autolimitada</h3>
<div class="book-case">
  <p><strong>Identificação:</strong> Mulher de 78 anos, hipertensa, diabética e portadora de insuficiência cardíaca crônica compensada, comparece à UPA referindo dor em cólica de início súbito na Fossa Ilíaca Esquerda há cerca de 16 horas, de moderada intensidade. Relata que, 8 horas após o início da dor, apresentou três episódios de evacuações amolecidas contendo sangue vermelho-escuro e coágulos (hematoquezia).</p>
  <p><strong>Exame Físico:</strong> Lúcida, orientada, corada e estável hemodinamicamente (PA 130/80 mmHg, FC 78 bpm, afebril). Abdome levemente distendido, com dor à palpação moderada no flanco e fossa ilíaca esquerda, <strong>sem descompressão brusca dolorosa (Blumberg negativo)</strong> e sem massas palpáveis. Toque retal: dedo de luva com fezes sanguinolentas escuras, sem lesões parietais palpáveis.</p>
  <p><strong>Exames Complementares:</strong> Hemoglobina: 11,4 g/dL; Leucócitos: 11.200/mm³; Lactato: 1,3 mmol/L (normal). TC de abdome com contraste IV: espessamento parietal circunferencial simétrico do cólon descendente e da flexura esplênica (Ponto de Griffith), com densificação da gordura mesocólica e preservação da raiz dos vasos mesentéricos inferiores e superiores. Colonoscopia com baixa insuflação: mucosa da flexura esplênica hiperemiada, friável, com petéquias hemorrágicas confluentes e exsudato fibrinoso longitudinal, com reto distal e sigmoide inferior rigorosamente normais.</p>
  <p><strong>Discussão e Resolução:</strong></p>
  <ul>
    <li><em>Diagnóstico:</em> <strong>Colite Isquêmica Transitória Não Gangrenosa (no Ponto de Griffith)</strong>;</li>
    <li><em>Diferenciais com Doença Diverticular e Câncer:</em> A presença de sangramento associado à dor cólica de início agudo em paciente idosa no território de transição vascular (ângulo esplênico) com reto poupado caracteriza a colite isquêmica;</li>
    <li><em>Manejo Clínico Conservador de Primeira Linha:</em>
      <ol>
        <li>Internação hospitalar em enfermaria cirúrgica para observação seriada;</li>
        <li>Jejum oral nas primeiras 24 a 48 horas associado a hidratação parenteral com cristaloide balanceado;</li>
        <li>Otimização hemodinâmica para garantir PAM satisfatória ($> 70-75$ mmHg) e suspensão temporária de fármacos constritores ou anti-hipertensivos em excesso;</li>
        <li>Analgesia escalonada;</li>
        <li>Evolução esperada: melhora completa da dor e do sangramento em 48 a 72 horas, com progressão para dieta oral e alta hospitalar programada sem necessidade de ressecção cirúrgica.</li>
      </ol>
    </li>
  </ul>
</div>
`
};

export const sec7 = {
  id: 'questoes-concurso-comentadas-isquemia-mesenterica',
  title: '7. Questões de Concursos de Residência Médica e Título de Especialista Comentadas Alternativa por Alternativa',
  body_html: `
<h3>Questão 1 (USP - Universidade de São Paulo / Residência Médica)</h3>
<p>Homem de 72 anos, hipertenso, diabético e portador de fibrilação atrial em tratamento irregular, dá entrada no pronto-socorro com queixa de dor abdominal de início súbito há 4 horas, de intensidade insuportável no mesogástrio, acompanhada de dois episódios de vômitos e uma evacuação diarreica líquida. Ao exame físico, o paciente está muito agitado e taquicárdico (FC 112 bpm irregular), porém a palpação abdominal revela abdome flácido, depressível, sem qualquer defesa ou descompressão dolorosa à palpação profunda. Os ruídos hidroaéreos estão presentes. A gasometria arterial demonstra pH 7,30, bicarbonato de 15 mEq/L e lactato sérico de 3,2 mmol/L (valor de referência: até 2,0 mmol/L). O leucograma acusa 19.500 leucócitos/mm³ com 12% de bastonetes. Diante desse quadro clínico e laboratorial, assinale a hipótese diagnóstica mais provável e a melhor conduta imediata:</p>

<ol type="A">
  <li>Apendicite aguda na fase flegmonosa; indicar apendicectomia videolaparoscópica de urgência após ultrassonografia de abdome.</li>
  <li>Pancreatite aguda biliar grave; indicar hidratação vigorosa, dieta zero e realização de colangiopancreatografia retrógrada endoscópica (CPRE) imediata.</li>
  <li>Isquemia mesentérica aguda por embolia da artéria mesentérica superior; realizar Angiotomografia de abdome com contraste intravenoso e preparar o paciente para laparotomia exploradora com embolectomia.</li>
  <li>Gastroenterite viral aguda complicada por desidratação; iniciar hidratação oral ambulatorial e prescrever antieméticos e probióticos com alta após reidratação.</li>
</ol>

<p><strong>Gabarito Oficial: Alternativa C.</strong></p>
<p><strong>Comentário Editorial Detalhado:</strong> A apresentação é a clássica e indispensável <strong>dissociação clínico-semiológica da Isquemia Mesentérica Aguda (IMA)</strong>: dor de intensidade máxima em paciente idoso cardiopata com fibrilação atrial contrastando com um exame físico abdominal inocente (abdome flácido sem peritonite). A presença de acidose metabólica com hiperlactatemia e leucocitose com desvio confirma hipóxia tecidual. A causa primária mais provável é a embolia da AMS (coração desprendendo êmbolo da FA). O exame padrão-ouro imediato é a <strong>Angiotomografia Computadorizada de abdome</strong>, e a conduta cirúrgica é a laparotomia com embolectomia por cateter de Fogarty (Alternativa C correta). Apendicite (A) e pancreatite (B) não explicam o quadro de dor súbita desproporcional sem sinais locais.</p>

<hr>

<h3>Questão 2 (ENAMED / Revalidação e Residência Médica Nacional)</h3>
<p>Durante a abordagem cirúrgica de uma isquemia mesentérica aguda por embolia de artéria mesentérica superior em uma paciente de 68 anos, o cirurgião realiza com sucesso a arteriotomia da AMS com retirada de volumoso êmbolo através de cateter de Fogarty, obtendo excelente fluxo pulsátil retrógrado e anterógrado. Após aguardar 20 minutos com as alças intestinais envolvidas em compressas mornas sob oxigênio a 100%, observa-se que cerca de 80 cm de alça ileal recuperaram a cor rósea e os pulsos palpáveis, mas um segmento de cerca de 40 cm de jejuno médio persiste com aspecto arroxeado mosqueado, com motilidade duvidosa e pulsação arterial fraca na borda mesentérica, porém sem sinais óbvios de necrose transmural ou perfuração. De acordo com as diretrizes contemporâneas de cirurgia vascular e do trauma, qual é a conduta intraoperatória correta?</p>

<ol type="A">
  <li>Ressecar imediatamente os 40 cm de jejuno duvidoso e confeccionar uma jejunostomia proximal definitiva com fístula mucosa distal.</li>
  <li>Ressecar todo o intestino delgado desde o ângulo de Treitz até a válvula ileocecal para evitar qualquer risco de recidiva tardia.</li>
  <li>Preservar o segmento intestinal de viabilidade limítrofe, não realizar anastomoses de risco neste momento, manter o abdome aberto em laparostomia (curativo a vácuo) e programar formalmente uma laparotomia de second-look em 24 a 48 horas.</li>
  <li>Suturar a parede abdominal com pontos totais definitivos e dar alta da UTI em 24 horas caso a paciente não apresente febre.</li>
</ol>

<p><strong>Gabarito Oficial: Alternativa C.</strong></p>
<p><strong>Comentário Editorial Detalhado:</strong> O princípio basilar moderno da cirurgia na isquemia mesentérica é a <strong>preservação máxima de parênquima intestinal para prevenir a Síndrome do Intestino Curto</strong>. Alças francamente necróticas (cinzento-escuras liquefeitas) são ressecadas; porém, <strong>alças limítrofes / duvidosas devem ser temporariamente PRESERVADAS</strong>. Conduz-se a estratégia de controle de danos: mantém-se o abdome em laparostomia (com curativo a vácuo ou bolsa de Bogotá) e programa-se obrigatoriamente a <strong>Laparotomia de Reavaliação Programada (Second-Look) em 24 a 48 horas</strong> (Alternativa C correta). Após a estabilização hemodinâmica na UTI, a maioria dessas alças duvidosas se recupera completamente, evitando enterectomias desnecessárias.</p>

<hr>

<h3>Questão 3 (SURCE - Seleção Unificada para Residência Médica do Ceará)</h3>
<p>Homem de 65 anos, tabagista pesado, com histórico de infarto agudo do miocárdio prévio e claudicação intermitente em membros inferiores, procura atendimento ambulatorial queixando-se de dor abdominal epigástrica em cólica que se inicia cerca de 30 minutos após as refeições e dura cerca de 2 horas. Refere que, devido à intensidade da dor, passou a evitar comer ("medo de se alimentar"), tendo perdido 14 kg nos últimos 4 meses. Ao exame físico, apresenta-se emagrecido, com IMC de 18,2 kg/m² e sopro sistólico audível no epigástrio. Qual é o diagnóstico clínico mais provável e a fisiopatologia subjacente?</p>

<ol type="A">
  <li>Úlcera gástrica perfurada bloqueada; decorrente de infecção crônica por Helicobacter pylori resistente.</li>
  <li>Isquemia Mesentérica Crônica (Angina Abdominal); decorrente da incapacidade de aumentar o fluxo sanguíneo esplâncnico após a alimentação por estenose aterosclerótica de múltiplos troncos arteriais viscerais.</li>
  <li>Câncer de cabeça de pâncreas invasivo; decorrente de compressão extrínseca do ducto pancreático principal de Wirsung.</li>
  <li>Doença celíaca do adulto com atrofia vilositária induzida por glúten.</li>
</ol>

<p><strong>Gabarito Oficial: Alternativa B.</strong></p>
<p><strong>Comentário Editorial Detalhado:</strong> A clássica tríade da <strong>Isquemia Mesentérica Crônica (Angina Abdominal)</strong> é composta por: 1) Dor abdominal pós-prandial precoce (início em 20-30 min pós-refeição por incapacidade de fornecer hiperemia esplâncnica fisiológica); 2) Sitofobia ("medo de comer"); e 3) Perda ponderal acentuada (emagrecimento consumptivo). Ocorre em idosos com aterosclerose difusa grave que acomete <strong>ao menos dois dos três troncos viscerais (Tronco Celíaco, AMS e AMI)</strong>. O sopro epigástrico reforça a estenose arterial (Alternativa B correta).</p>

<hr>

<h3>Questão 4 (UNICAMP - Universidade Estadual de Campinas)</h3>
<p>Em relação às quatro principais etiologias da Isquemia Mesentérica Aguda, assinale a afirmativa <strong>CORRETA</strong> de acordo com a literatura cirúrgica contemporânea:</p>

<ol type="A">
  <li>Na embolia da artéria mesentérica superior, a oclusão ocorre invariavelmente na origem da artéria na aorta, levando à necrose completa de todo o jejuno e duodeno.</li>
  <li>A trombose venosa mesentérica é a etiologia de pior prognóstico e cursa com indicação obrigatória de laparotomia com ressecção de todo o cólon nas primeiras duas horas.</li>
  <li>A Isquemia Mesentérica Não Oclusiva (IMNO) ocorre por vasoespasmo arteriolar difuso em resposta ao baixo débito cardíaco ou choque, sem oclusão mecânica vascular por êmbolos, sendo seu tratamento inicial preferencialmente farmacológico e angiográfico com vasodilatadores seletivos na AMS.</li>
  <li>O uso de heparina não fracionada é contraindicado na fase aguda da isquemia mesentérica devido ao alto risco de hemorragia intraperitoneal induzida por heparinização.</li>
</ol>

<p><strong>Gabarito Oficial: Alternativa C.</strong></p>
<p><strong>Comentário Editorial Detalhado:</strong>
- A <strong>IMNO</strong> decorre de vasoespasmo esplâncnico sustentado induzido por baixo débito sistêmico (choque cardiogênico ou séptico) e drogas vasoconstritoras, <strong>sem oclusão mecânica intraluminal</strong>. O tratamento inicial baseia-se na correção do choque e na <strong>infusão seletiva de vasodilatadores (papaverina) diretamente na AMS via angiografia</strong> (Alternativa C correta);
- Na embolia da AMS, o êmbolo impacta 3 a 8 cm distal à origem, <strong>poupando o jejuno proximal</strong> (a trombose é que acomete o óstio aórtico - elimina A);
- A trombose venosa mesentérica é a de <em>melhor prognóstico</em> e seu tratamento de escolha inicial é a <strong>anticoagulação plena com heparina</strong> (elimina B);
- A heparina plena é mandatória para evitar a propagação do trombo no leito distal (elimina D).</p>

<hr>

<h3>Questão 5 (UERJ - Universidade do Estado do Rio de Janeiro)</h3>
<p>Mulher de 82 anos, internada em enfermaria de cardiologia por insuficiência cardíaca descompensada, desenvolve dor abdominal em cólica no flanco esquerdo de início súbito, seguida por evacuação de fezes com rajas de sangue vivo e coágulos após 12 horas. Ao exame físico, apresenta abdome com dor discreta no flanco esquerdo, sem sinais de peritonite ou Blumberg. A colonoscopia realizada com baixa insuflação evidencia mucosa da flexura esplênica com petéquias hemorrágicas, edema e ulcerações longitudinais, com poupamento rigoroso do reto distal. Qual é o diagnóstico e o sítio anatômico mais frequentemente acometido nessa condição?</p>

<ol type="A">
  <li>Retocolite ulcerativa em fase aguda fulminante; acomete preferencialmente o reto distal com progressão proximal contínua.</li>
  <li>Colite isquêmica; acomete classicamente o ângulo esplênico do cólon (Ponto de Griffith), por ser uma zona de bacia hidrográfica terminal entre a AMS e a AMI.</li>
  <li>Diverticulite aguda estenosante do ceco; acomete o ponto de Sudeck na flexura hepática.</li>
  <li>Doença de Crohn com fístula colovesical; acomete preferencialmente a válvula ileocecal com estenose de íleo terminal.</li>
</ol>

<p><strong>Gabarito Oficial: Alternativa B.</strong></p>
<p><strong>Comentário Editorial Detalhado:</strong> O caso retrata a <strong>Colite Isquêmica</strong> em sua apresentação clássica: paciente idosa cardiopata com baixo débito que apresenta dor no flanco esquerdo seguida por diarreia sanguinolenta (hematoquezia) autolimitada. Acomete preferencialmente o <strong>Ponto de Griffith (ângulo esplênico do cólon)</strong> — zona de transição e bacia hidrográfica entre o território da cólica média (AMS) e da cólica esquerda (AMI) — com o <strong>poupamento característico do reto</strong> (Alternativa B correta).</p>

<hr>

<h3>Questão 6 (IAMSPE - Instituto de Assistência Médica ao Servidor Público Estadual)</h3>
<p>Em relação à anatomia das arcadas colaterais esplâncnicas, qual vaso conecta diretamente o território da Artéria Mesentérica Superior com o território da Artéria Mesentérica Inferior através do mesocólon transverso e se hipertrofia classicamente na oclusão crônica da AMS?</p>

<ol type="A">
  <li>Arcada Pancreaticoduodenal de Haller.</li>
  <li>Artéria Gastroduodenal de Winslow.</li>
  <li>Arco de Riolan (Arcada Meandrina).</li>
  <li>Artéria Apendicular terminal de Treves.</li>
</ol>

<p><strong>Gabarito Oficial: Alternativa C.</strong></p>
<p><strong>Comentário Editorial Detalhado:</strong> O <strong>Arco de Riolan (ou Arcada Meandrina)</strong> é a comunicação anatômica profunda no mesocólon transverso que une o ramo esquerdo da <em>Artéria Cólica Média (ramo da AMS)</em> com a <em>Artéria Cólica Esquerda (ramo da AMI)</em>. Na vigência de estenose aterosclerótica crônica grave da AMS, o arco de Riolan hipertrofia-se de forma monumental para levar fluxo colateral retrógrado da AMI para a AMS e salvar o intestino delgado de infarto agudo (Alternativa C correta).</p>
`
};

export const sec8 = {
  id: 'conclusao-recomendações-finais-referencias-isquemia',
  title: '8. Síntese do Manejo Clínico-Cirúrgico Integrado e Referências Internacionais Oficiais',
  body_html: `
<h3>Algoritmo Decisório Integrado na Isquemia Mesentérica</h3>
<ol>
  <li><strong>Alta Suspeição Clínica Imediata:</strong> Dor abdominal lancinante desproporcional ao exame físico em idoso, vasculopata ou com arritmia $\rightarrow$ <strong>Angiotomografia de abdome total com contraste IV na primeira hora</strong>;</li>
  <li><strong>Suporte Intensivo Imediato:</strong> Ressuscitação volêmica cristaloide, jejum oral, sonda nasogástrica, antibioticoterapia de amplo espectro (Piperacilina-Tazobactam) e <strong>Heparinização plena intravenosa imediata</strong>;</li>
  <li><strong>Etiologia e Conduta Operatória:</strong>
    <ul>
      <li><em>Embolia de AMS:</em> Laparotomia exploradora $\rightarrow$ Embolectomia com Cateter de Fogarty 3F/4F;</li>
      <li><em>Trombose de AMS:</em> Laparotomia $\rightarrow$ Revascularização vascular (Bypass aorto-mesentérico ou trombectomia);</li>
      <li><em>Trombose Venosa Mesentérica (TVM):</em> Anticoagulação plena intravenosa; cirurgia apenas se peritonite/gangrena;</li>
      <li><em>IMNO:</em> Correção do choque sistêmico, desmame de vasoconstritores e infusão seletiva de Papaverina na AMS por arteriografia;</li>
    </ul>
  </li>
  <li><strong>Preservação de Alças e Laparotomia de Second-Look:</strong> Ressecar apenas o intestino francamente necrosado. Preservar alças limítrofes, deixar abdome em laparostomia e reoperar obrigatoriamente em <strong>24 a 48 horas (Second-Look)</strong>;</li>
  <li><strong>Isquemia Crônica:</strong> Triade de dor pós-prandial, sitofobia e perda de peso $\rightarrow$ Angioplastia com Stent ou Bypass cirúrgico eletivo para prevenir infarto agudo da AMS.</li>
</ol>
`
};

export const bookReferencesIsquemia = [
  {
    label: 'World Society of Emergency Surgery (WSES) — Guidelines for the management of acute mesenteric ischemia',
    url: 'https://wjes.biomedcentral.com/articles/10.1186/s13017-022-00443-x'
  },
  {
    label: 'Society for Vascular Surgery (SVS) — Clinical practice guidelines for the management of mesenteric arterial disease',
    url: 'https://www.jvascsurg.org/article/S0741-5214(16)00049-7/fulltext'
  },
  {
    label: 'American College of Gastroenterology (ACG) — Clinical Guideline: Epidemiology, Risk Factors, Patterns of Presentation, Diagnosis, and Management of Colon Ischemia',
    url: 'https://journals.lww.com/ajg/fulltext/2015/01000/the_american_college_of_gastroenterology.12.aspx'
  },
  {
    label: 'European Society for Vascular Surgery (ESVS) — Clinical Practice Guidelines on the Management of the Diseases of Mesenteric Arteries and Veins',
    url: 'https://www.ejves.com/article/S1078-5884(19)30872-3/fulltext'
  },
  {
    label: 'Colégio Brasileiro de Cirurgiões (CBC) e Sociedade Brasileira de Angiologia e Cirurgia Vascular (SBACV) — Diretrizes Nacionais em Isquemia Mesentérica',
    url: 'https://cbc.org.br/'
  }
];
