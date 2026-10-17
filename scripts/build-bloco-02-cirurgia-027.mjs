import fs from 'node:fs';
import path from 'node:path';
import { saveBook } from './bloco-02-utils.mjs';

// 1. Ensure Aula 042 canonical alias folder exists and has updated canonical link
const src42 = path.join('apostilas', 'tecnica-cirurgica', 'index.html');
const dst42Dir = path.join('apostilas', 'principios-de-tecnica-cirurgica');
const dst42 = path.join(dst42Dir, 'index.html');
if (fs.existsSync(src42)) {
  fs.mkdirSync(dst42Dir, { recursive: true });
  let html42 = fs.readFileSync(src42, 'utf8');
  if (/<link\s+rel=["']canonical["'][^>]*>/i.test(html42)) {
    html42 = html42.replace(
      /<link\s+rel=["']canonical["'][^>]*>/i,
      '<link rel="canonical" href="/apostilas/principios-de-tecnica-cirurgica/">'
    );
  } else {
    html42 = html42.replace(
      '</title>',
      '</title>\n<link rel="canonical" href="/apostilas/principios-de-tecnica-cirurgica/">'
    );
  }
  fs.writeFileSync(dst42, html42, 'utf8');
  console.log('[OK] Alias Aula 042 criado em apostilas/principios-de-tecnica-cirurgica/index.html');
}

const book = {
  slug: 'nutricao-no-paciente-cirurgico',
  title: 'Nutrição no Paciente Cirúrgico',
  area: 'Cirurgia Geral',
  materia: 'Cuidados Perioperatórios e Metabolismo Cirúrgico',
  description: 'Tratado completo de terapia nutricional perioperatória, triagem NRS-2002, ASG, critérios GLIM, protocolos ACERTO e ERAS, imunonutrição, nutrição enteral e parenteral, síndrome de realimentação e manejo nutricional das fístulas digestivas.',
  sections: [
    {
      id: 'sec-01-fisiopatologia-desnutricao-cirurgica',
      title: '1. Fisiopatologia da Desnutrição Cirúrgica e Impacto na Morbimortalidade Operatória',
      body_html: `
        <h3>1.1 A Intersecção entre Desnutrição Prévia e Resposta Endócrino-Metabólica ao Trauma</h3>
        <p>O estado nutricional do paciente candidato a uma intervenção cirúrgica constitui um dos determinantes independentes mais poderosos de desfecho clínico-operatório em Cirurgia Geral, Cirurgia do Aparelho Digestivo e Cirurgia Oncológica. Diferentemente do jejum simples em indivíduos saudáveis — no qual o organismo adapta-se progressivamente à cetogênese, reduzindo a taxa metabólica basal e poupando a massa proteica visceral e muscular esquelética —, a desnutrição associada à doença cirúrgica e ao trauma operatório desenvolve-se sob um estado pró-inflamatório e hipercatabólico contínuo. A liberação de citocinas inflamatórias (interleucina-1 beta [IL-1&beta;], interleucina-6 [IL-6] e fator de necrose tumoral alfa [TNF-&alpha;]) somada à ativação neuroendócrina hipotalâmica-hipofisária-adrenal (cortisol, catecolaminas, glucagon e hormônio do crescimento) bloqueia os mecanismos fisiológicos de adaptação ao jejum e promove proteólise muscular acelerada, resistência periférica à insulina, glicogenólise rápida e lipólise desregulada.</p>
        <p>No paciente já depletado antes da incisão cirúrgica — como portadores de neoplasias malignas do trato gastrointestinal superior (esôfago, estômago, pâncreas), doença inflamatória intestinal em atividade, estenoses benignas cáusticas ou pépticas, e síndromes disabsortivas —, a reserva de glicogênio hepático (aproximadamente 150 a 200 g no adulto eutrófico) esgota-se em menos de 12 a 24 horas de jejum. A partir desse instante, a gliconeogênese hepática necessária para sustentar tecidos glicose-dependentes (sistema nervoso central, eritrócitos, medula renal e leucócitos ativados na ferida operatória) passa a depender quase exclusivamente da degradação da proteína muscular esquelética, com mobilização maciça de alanina e glutamina. Quando o trauma cirúrgico se sobrepõe a essa reserva exaurida, instala-se um balanço nitrogenado intensamente negativo (frequentemente superior a 15 a 25 g de nitrogênio por dia, o que equivale à perda de 450 a 750 g de massa muscular magra diariamente), precipitando falência orgânica múltipla caso não haja intervenção nutricional oportuna.</p>

        <h3>1.2 Consequências Estruturais e Funcionais da Depleção Proteico-Calórica</h3>
        <p>A perda de massa magra corporal (sarcopenia primária ou secundária à doença) repercute diretamente sobre sistemas vitais durante o período perioperatório. Quando a perda ponderal aguda ou subaguda ultrapassa 10% a 15% do peso habitual em seis meses, ou quando a depleção da proteína corporal total atinge mais de 20%, ocorrem alterações fisiológicas críticas que elevam exponencialmente a taxa de complicações maiores:</p>
        <ul>
          <li><strong>Prejuízo na síntese de colágeno e deiscência anastomótica:</strong> A resistência mecânica das suturas aponeuróticas e, sobretudo, das anastomoses gastrointestinais depende da deposição e maturação de colágeno tipos I e III na submucosa intestinal pelos fibroblastos. Na desnutrição proteico-calórica e na deficiência de micronutrientes cofatores (vitamina C, zinco, ferro, cobre) e de aminoácidos específicos (arginina, prolina, glicina, glutamina), há redução acentuada da atividade da prolil-hidroxilase e da lisil-hidroxilase. O resultado clínico direto é o aumento de duas a quatro vezes na incidência de fístulas e deiscências anastomóticas, bem como de evisceração por deiscência da parede abdominal.</li>
          <li><strong>Imunoparesia e suscetibilidade a infecções cirúrgicas:</strong> A desnutrição compromete profundamente a imunidade celular mediada por linfócitos T (redução da relação CD4+/CD8+ e anergia cutânea), diminui a produção de imunoglobulina A secretora (sIgA) na mucosa intestinal, reduz a síntese hepática de componentes do sistema complemento (C3, C4) e prejudica a quimiotaxia, fagocitose e explosão respiratória (produção de radicais livres dependentes de NADPH-oxidase) dos neutrófilos e macrófagos. Consequentemente, pacientes desnutridos apresentam taxas significativamente mais altas de infecção do sítio cirúrgico (incisional superficial, profunda e de órgão/espaço), pneumonia nosocomial, infecção do trato urinário e sepse pós-operatória.</li>
          <li><strong>Disfunção muscular respiratória e falha de desmame ventilatório:</strong> A proteólise não poupa o músculo diafragma nem a musculatura intercostal. A redução da força contrátil diafragmática reduz a capacidade vital, a capacidade residual funcional e a eficácia do reflexo de tosse, predispondo a atelectasias pós-operatórias, retenção de secreções traqueobrônquicas, hipoxemia e dependência prolongada de ventilação mecânica invasiva na Unidade de Terapia Intensiva.</li>
          <li><strong>Disfunção da barreira mucosa intestinal e translocação bacteriana:</strong> Os enterócitos do intestino delgado dependem prioritariamente da glutamina luminal e sistêmica como substrato energético, enquanto os colonócitos utilizam ácidos graxos de cadeia curta (especialmente o butirato) derivados da fermentação de fibras solúveis. O jejum prolongado e a desnutrição causam atrofia das vilosidades intestinais, perda das proteínas das junções firmes (<em>tight junctions</em>, como ocludina e claudinas), queda da barreira de muco e de sIgA, favorecendo a translocação de bactérias Gram-negativas e endotoxinas (lipopolissacarídeo — LPS) para os linfonodos mesentéricos e circulação portal, perpetuando a resposta inflamatória sistêmica (SIRS) e a disfunção de múltiplos órgãos.</li>
          <li><strong>Alterações farmacocinéticas e edema tecidual:</strong> A queda da síntese hepática de proteínas carreadoras (albumina, alfa-1-glicoproteína ácida) associada ao extravasamento capilar inflamatório reduz a pressão coloidosmótica plasmática e altera a fração livre de fármacos anestésicos, opioides e antimicrobianos. O edema intersticial estende-se à parede das alças intestinais (edema esplâncnico), provocando íleo paralítico prolongado, estase gástrica, intolerância alimentar e compressão microvascular nas linhas de sutura.</li>
        </ul>

        <h3>1.3 Epidemiologia Hospitalar: O Estudo IBRANUTRI e a Realidade Cirúrgica</h3>
        <p>No Brasil, o clássico Inquérito Brasileiro de Avaliação Nutricional Hospitalar (IBRANUTRI), coordenado por Waitzberg e colaboradores, demonstrou que aproximadamente 48,1% dos pacientes internados na rede pública apresentavam algum grau de desnutrição, sendo 12,6% classificados como desnutridos graves. Entre pacientes cirúrgicos submetidos a operações de grande porte — particularmente ressecções oncológicas esofagogástricas, pancreatoduodenectomias (cirurgia de Whipple), cistectomias radicais e grandes ressecções colorretais —, a prevalência de risco nutricional ou desnutrição instalada varia de 35% a 65%. Além disso, a taxa de desnutrição aumenta progressivamente conforme o tempo de internação hospitalar pré-operatória, em grande parte devido a períodos repetidos de jejum para exames diagnósticos, baixa aceitação da dieta hospitalar e prescrição tardia de terapia nutricional especializada.</p>

        <table class="book-table">
          <thead>
            <tr>
              <th>Sistema / Processo Fisiológico</th>
              <th>Alteração Físico-Patológica na Desnutrição Cirúrgica</th>
              <th>Desfecho Clínico-Cirúrgico Associado</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Reparo Tecidual e Síntese de Matriz</strong></td>
              <td>Deficiência de prolina, arginina, glutamina, vitamina C e zinco; queda da hidroxilação do pró-colágeno e atraso na fibroplasia e angiogênese.</td>
              <td>Deiscência de anastomoses digestivas, fístulas enterocutâneas, deiscência aponeurótica (evisceração) e hérnia incisional.</td>
            </tr>
            <tr>
              <td><strong>Sistema Imunológico</strong></td>
              <td>Linfopenia T, depleção de sIgA mucosa, queda de complemento e disfunção fagocitária/bactericida de polimorfonucleares.</td>
              <td>Infecção do sítio cirúrgico (ISC), abscessos intracavitários, pneumonia pós-operatória e sepse grave.</td>
            </tr>
            <tr>
              <td><strong>Musculatura Esquelética e Diafragmática</strong></td>
              <td>Ativação da via ubiquitina-proteassoma muscular mediada por IL-6, TNF-&alpha; e hipercortisolismo; perda de fibras tipo II.</td>
              <td>Astenia profunda, imobilismo no leito (maior risco de TEV), atelectasia pulmonar e falha de extubação.</td>
            </tr>
            <tr>
              <td><strong>Trato Gastrointestinal</strong></td>
              <td>Atrofia vilositária, redução de dissacaridases da borda em escova, quebra das <em>tight junctions</em> e edema submucoso.</td>
              <td>Íleo adinâmico prolongado, diarreia absortiva, intolerância à dieta e translocação bacteriana/endotoxínica.</td>
            </tr>
            <tr>
              <td><strong>Homeostase Hídrica e Oncótica</strong></td>
              <td>Hipoalbuminemia secundária ao extravasamento transcapilar (aumento de permeabilidade) e priorização hepática de proteínas de fase aguda.</td>
              <td>Edema generalizado (anasarca), edema de parede intestinal, atraso no esvaziamento gástrico e cicatrização deficiente.</td>
            </tr>
          </tbody>
        </table>
      `
    },
    {
      id: 'sec-02-triagem-e-avaliacao-nutricional',
      title: '2. Triagem e Avaliação Nutricional Perioperatória: NRS-2002, ASG, GLIM e Marcadores Laboratoriais',
      body_html: `
        <h3>2.1 Diferença Conceitual entre Triagem (Rastreamento) e Avaliação Nutricional</h3>
        <p>Nas provas de residência médica e na prática perioperatória padronizada pelas diretrizes da ESPEN (<em>European Society for Clinical Nutrition and Metabolism</em>), ASPEN (<em>American Society for Parenteral and Enteral Nutrition</em>) e BRASPEN (Sociedade Brasileira de Nutrição Parenteral e Enteral), todo paciente cirúrgico hospitalizado deve ser submetido à <strong>triagem nutricional nas primeiras 24 a 48 horas da admissão</strong> (ou na consulta ambulatorial pré-operatória). A triagem é um método rápido e sensível para identificar indivíduos sob risco nutricional. Caso a triagem seja positiva, realiza-se a <strong>avaliação nutricional completa</strong>, que confirma o diagnóstico, quantifica a gravidade da desnutrição e orienta o plano terapêutico.</p>

        <h3>2.2 Nutritional Risk Screening 2002 (NRS-2002)</h3>
        <p>O <strong>NRS-2002</strong> é a ferramenta de triagem padrão-ouro recomendada pela ESPEN e pelo projeto ACERTO para pacientes cirúrgicos e clínicos hospitalizados. Ele se divide em uma pré-triagem de quatro perguntas simples (1. O IMC é &lt; 20,5 kg/m²? 2. O paciente perdeu peso nos últimos 3 meses? 3. O paciente reduziu a ingestão alimentar na última semana? 4. O paciente está gravemente doente / em UTI?). Se qualquer resposta for "SIM", prossegue-se para a triagem final, que soma três domínios:</p>
        <h4>Domínio 1: Comprometimento do Estado Nutricional (0 a 3 pontos)</h4>
        <ul>
          <li><strong>0 ponto (Ausente):</strong> Estado nutricional normal, sem perda ponderal significativa nem queda da ingestão.</li>
          <li><strong>1 ponto (Leve):</strong> Perda de peso &gt; 5% em 3 meses OU ingestão alimentar entre 50% e 75% da necessidade normal na última semana.</li>
          <li><strong>2 pontos (Moderado):</strong> Perda de peso &gt; 5% em 2 meses OU IMC entre 18,5 e 20,5 kg/m² com queda do estado geral OU ingestão alimentar entre 25% e 50% da necessidade normal na última semana.</li>
          <li><strong>3 pontos (Grave):</strong> Perda de peso &gt; 5% em 1 mês (ou &gt; 15% em 3 meses) OU IMC &lt; 18,5 kg/m² com queda do estado geral OU ingestão alimentar entre 0% e 25% da necessidade normal na última semana.</li>
        </ul>
        <h4>Domínio 2: Gravidade da Doença / Estresse Metabólico (0 a 3 pontos)</h4>
        <ul>
          <li><strong>0 ponto (Ausente):</strong> Necessidades nutricionais normais.</li>
          <li><strong>1 ponto (Leve):</strong> Fratura de quadril, pacientes crônicos com complicações agudas (cirrose, DPOC, hemodiálise, diabetes, oncologia clínica), cirurgias de pequeno/médio porte.</li>
          <li><strong>2 pontos (Moderado):</strong> <strong>Cirurgia abdominal de grande porte</strong>, acidente vascular cerebral, pneumonia grave, neoplasias hematológicas.</li>
          <li><strong>3 pontos (Grave):</strong> Traumatismo cranioencefálico, transplante de medula óssea, pacientes em terapia intensiva com APACHE II &gt; 10.</li>
        </ul>
        <h4>Domínio 3: Ajuste para Idade (+1 ponto)</h4>
        <ul>
          <li><strong>Idade &ge; 70 anos:</strong> Adiciona-se <strong>+1 ponto</strong> ao escore total obtido pela soma dos domínios nutricional e de gravidade da doença.</li>
        </ul>
        <p><strong>Interpretação do NRS-2002:</strong> Um escore total <strong>&ge; 3 pontos define Risco Nutricional</strong> e indica a elaboração imediata de um plano de suporte nutricional. Um escore &lt; 3 pontos indica reavaliação semanal durante a internação; porém, se o paciente com escore &lt; 3 for sabidamente candidato a uma cirurgia de grande porte, deve-se instituir um plano nutricional preventivo para evitar a deterioração associada ao estresse cirúrgico.</p>

        <h3>2.3 Avaliação Subjetiva Global (ASG) de Detsky</h3>
        <p>Criada por Detsky e colaboradores em 1987 exatamente em uma coorte de pacientes cirúrgicos gastrointestinais, a <strong>Avaliação Subjetiva Global (ASG)</strong> é um método clínico validado, reprodutível e de baixo custo que dispensa exames laboratoriais ou aparelhos sofisticados. Baseia-se na história clínica e no exame físico direcionado:</p>
        <ul>
          <li><strong>Anamnese nutricional (5 componentes):</strong> (1) Perda ponderal nos últimos 6 meses (percentual de perda: &lt; 5% pequena, 5% a 10% potencialmente significativa, &gt; 10% definitivamente significativa) e evolução nas últimas 2 semanas (estabilização, ganho ou perda contínua); (2) Alteração da ingestão alimentar em relação ao habitual (duração e tipo: dieta hipocalórica sólida, líquida exclusiva ou jejum); (3) Sintomas gastrointestinais persistentes por mais de 2 semanas (anorexia, náuseas, vômitos, diarreia, disfagia); (4) Capacidade funcional física (normal, trabalho subótimo/deambulação reduzida ou restrito ao leito); (5) Demanda metabólica segundo o diagnóstico principal (estresse baixo, moderado ou elevado).</li>
          <li><strong>Exame físico nutricional:</strong> Avalia perda de gordura subcutânea (região do tríceps, linha axilar média sobre as costelas inferiores, bola gordurosa de Bichat), perda de massa muscular estriada (músculos têmporas, deltoides, supra e infraespinhosos, interósseos das mãos, quadríceps femoral e panturrilha), presença de edema sacral ou maleolar e ascite.</li>
          <li><strong>ASG — Categoria A (Bem Nutrido):</strong> Paciente sem perda ponderal significativa ou com perda recente já em recuperação franca de peso, apetite e capacidade funcional, sem sinais físicos de depleção muscular ou subcutânea.</li>
          <li><strong>ASG — Categoria B (Moderadamente Desnutrido ou Suspeita de Desnutrição):</strong> Paciente com perda ponderal de 5% a 10% nos últimos 6 meses sem estabilização ou ganho recente, redução comprovada da ingestão dietética e perda leve a moderada de tecido subcutâneo e massa muscular.</li>
          <li><strong>ASG — Categoria C (Gravemente Desnutrido):</strong> Paciente com perda ponderal contínua e severa (&gt; 10% em 6 meses), sintomas digestivos persistentes limitantes, perda funcional importante e sinais físicos inequívocos de atrofia muscular temporal/quadríceps, perda acentuada de gordura subcutânea e/ou edema nutricional.</li>
        </ul>

        <h3>2.4 Critérios GLIM (Global Leadership Initiative on Malnutrition)</h3>
        <p>Publicados como consenso global entre ESPEN, ASPEN, FELANPE e PENSA, os <strong>critérios GLIM</strong> padronizam o diagnóstico de desnutrição em duas etapas após a triagem positiva. Para diagnosticar desnutrição pelo GLIM, é obrigatória a presença de pelo menos <strong>1 critério fenotípico + 1 critério etiológico</strong>:</p>
        <h4>Critérios Fenotípicos do GLIM (necessário pelo menos 1)</h4>
        <ul>
          <li><strong>Perda de peso não intencional:</strong> &gt; 5% nos últimos 6 meses, ou &gt; 10% além de 6 meses (sendo classificada como desnutrição grave se &gt; 10% em 6 meses ou &gt; 20% além de 6 meses).</li>
          <li><strong>Índice de Massa Corporal (IMC) reduzido:</strong> &lt; 20 kg/m² se idade &lt; 70 anos, ou &lt; 22 kg/m² se idade &ge; 70 anos (classificada como grave se &lt; 18,5 kg/m² em &lt; 70 anos ou &lt; 20 kg/m² em &ge; 70 anos).</li>
          <li><strong>Redução da massa muscular:</strong> Comprovada por métodos validados de composição corporal (DEXA, bioimpedância elétrica, tomografia computadorizada ao nível de L3 avaliando o índice muscular esquelético, ultrassonografia muscular ou antropometria como circunferência da panturrilha ajustada e força de preensão palmar por dinamometria).</li>
        </ul>
        <h4>Critérios Etiológicos do GLIM (necessário pelo menos 1)</h4>
        <ul>
          <li><strong>Ingestão alimentar reduzida ou assimilação comprometida:</strong> &le; 50% das necessidades energéticas por &gt; 1 semana, ou qualquer redução por &gt; 2 semanas, ou qualquer condição gastrointestinal crônica que impacte adversamente a absorção ou digestão (síndrome do intestino curto, insuficiência pancreática exócrina, estenose esofágica/pilórica).</li>
          <li><strong>Carga inflamatória / Gravidade da doença:</strong> Inflamação aguda (trauma maior, queimadura, sepse, pancreatite aguda grave) ou inflamação crônica associada a doença maligna, DPOC, insuficiência cardíaca congestiva ou doença renal crônica.</li>
        </ul>

        <h3>2.5 Indicadores Laboratoriais e Proteínas Viscerais: Interpretação Crítica</h3>
        <p>Um ponto clássico e recorrente em provas de residência médica é a interpretação das proteínas séricas sintetizadas pelo fígado (albumina, transferrina, pré-albumina/transtirretina e proteína ligadora do retinol). Embora historicamente chamadas de "marcadores nutricionais", na presença de inflamação aguda ou trauma cirúrgico elas funcionam como <strong>reagentes negativos de fase aguda</strong>. Sob ação da IL-6 e do TNF-&alpha;, o hepatócito desvia sua maquinaria ribossômica para sintetizar proteínas positivas de fase aguda (proteína C-reativa [PCR], fibrinogênio, haptoglobina, ceruloplasmina, alfa-1-antitripsina) e reduz drasticamente a transcrição de RNA mensageiro da albumina e da pré-albumina, além de ocorrer extravasamento transcapilar de albumina para o interstício.</p>
        <p>Portanto, a <strong>albumina sérica isolada não reflete o estado nutricional agudo</strong> em pacientes inflamados, mas sim a gravidade da doença de base e o grau de resposta inflamatória, sendo um <strong>excelente preditor prognóstico de morbimortalidade operatória</strong>: níveis de albumina pré-operatória &lt; 3,0 g/dL (e especialmente &lt; 2,5 g/dL) associam-se a aumento dramático de deiscência anastomótica, infecção e óbito. Para interpretar corretamente a pré-albumina no monitoramento da eficácia da terapia nutricional, deve-se dosá-la sempre em conjunto com a <strong>Proteína C-Reativa (PCR)</strong>: se a PCR estiver em queda e a pré-albumina em ascensão, confirma-se anabolismo proteico efetivo.</p>

        <table class="book-table">
          <thead>
            <tr>
              <th>Proteína Sérico-Visceral</th>
              <th>Meia-Vida Biológica</th>
              <th>Valores de Referência Normais</th>
              <th>Aplicação Clínica e Limitações na Cirurgia</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Albumina</strong></td>
              <td>18 a 21 dias</td>
              <td>3,5 a 5,0 g/dL (Grave: &lt; 3,0 g/dL)</td>
              <td>Meia-vida longa e grande <em>pool</em> extravascular; inútil para monitorar resposta aguda à terapia nutricional, mas é o principal marcador prognóstico de risco cirúrgico e deiscência.</td>
            </tr>
            <tr>
              <td><strong>Transferrina</strong></td>
              <td>8 a 10 dias</td>
              <td>200 a 400 mg/dL (Grave: &lt; 100 mg/dL)</td>
              <td>Meia-vida intermediária; sofre forte interferência do metabolismo do ferro (falso aumento na ferropenia; queda em doenças hepáticas, síndrome nefrótica e inflamação).</td>
            </tr>
            <tr>
              <td><strong>Pré-albumina (Transtirretina)</strong></td>
              <td>2 a 3 dias</td>
              <td>18 a 40 mg/dL (Grave: &lt; 10 mg/dL)</td>
              <td>Excelente marcador para monitorar a resposta aguda à terapia nutricional (sobe 1 mg/dL/dia com suporte adequado), desde que interpretada em conjunto com a queda da PCR; aumenta falsamente na insuficiência renal crônica.</td>
            </tr>
            <tr>
              <td><strong>Proteína Ligadora do Retinol (RBP)</strong></td>
              <td>12 horas</td>
              <td>3 a 6 mg/dL</td>
              <td>Meia-vida ultracurta; muito sensível a restrições calórico-proteicas agudas, porém excretada pelo rim (eleva-se falsamente na disfunção renal) e dependente do status de vitamina A e zinco.</td>
            </tr>
          </tbody>
        </table>
      `
    },
    {
      id: 'sec-03-risco-nutricional-grave-e-terapia-pre-operatoria',
      title: '3. Risco Nutricional Grave (ESPEN/BRASPEN) e Indicação de Terapia Nutricional Pré-Operatória',
      body_html: `
        <h3>3.1 Os Quatro Critérios Clássicos de Risco Nutricional Grave</h3>
        <p>Uma das decisões mais cobradas em provas de Cirurgia Geral consiste em responder: <em>"Quando devemos adiar uma cirurgia eletiva de grande porte para nutrir o paciente no pré-operatório?"</em>. A terapia nutricional pré-operatória indiscriminada em pacientes bem nutridos ou com desnutrição leve não reduz complicações e apenas prolonga a internação. Contudo, em pacientes portadores de <strong>Risco Nutricional Grave</strong>, a instituição de suporte nutricional pré-operatório reduz em até 35% a 50% as complicações infecciosas e não infecciosas (incluindo fístulas anastomóticas). Segundo as diretrizes da ESPEN e da BRASPEN/ACERTO, define-se <strong>Risco Nutricional Grave</strong> pela presença de <strong>pelo menos UM</strong> dos seguintes quatro parâmetros:</p>
        <ol>
          <li><strong>Perda ponderal não intencional &gt; 10% a 15% do peso corporal habitual nos últimos 6 meses</strong> (ou &gt; 5% em 1 mês);</li>
          <li><strong>Índice de Massa Corporal (IMC) &lt; 18,5 kg/m²</strong> (ou &lt; 20,0 kg/m² em idosos &ge; 70 anos);</li>
          <li><strong>Avaliação Subjetiva Global classificada como Categoria C (ASG C) OU escore NRS-2002 &ge; 5 pontos</strong> (nota: NRS-2002 &ge; 3 define risco nutricional geral, e &ge; 5 caracteriza altíssimo risco nos critérios clássicos da ESPEN);</li>
          <li><strong>Albumina sérica &lt; 3,0 g/dL</strong> (na ausência de evidência de disfunção hepática ou perda renal/síndrome nefrótica).</li>
        </ol>

        <h3>3.2 Duração e Via da Terapia Nutricional Pré-Operatória</h3>
        <p>Quando o paciente preenche qualquer um dos critérios de risco nutricional grave e é candidato a uma cirurgia eletiva de médio ou grande porte (inclusive cirurgia oncológica digestiva, como gastrectomia total/subtotal, esofagectomia, colectomia ou duodenopancreatectomia), a operação eletiva <strong>deve ser postergada por 7 a 14 dias</strong> para realização de terapia nutricional pré-operatória intensiva. Períodos inferiores a 5 a 7 dias são insuficientes para recompor os estoques intracelulares de potássio, fósforo, magnésio, recuperar a função mitocondrial e linfocitária e reverter o estado pró-inflamatório; por outro lado, adiar uma cirurgia oncológica por 7 a 14 dias não compromete o estadiamento nem a ressecabilidade tumoral, mas salva o paciente de uma deiscência anastomótica letal no pós-operatório.</p>
        <p>A escolha da via no pré-operatório obedece à regra fisiológica: <strong>"Se o intestino funciona, use-o!"</strong>:</p>
        <ul>
          <li><strong>Suplementação Nutricional Oral (SNO):</strong> É a primeira escolha sempre que o paciente consegue deglutir e atingir pelo menos 60% a 70% de suas metas calórico-proteicas pela soma da dieta oral com suplementos hiperproteicos/imunomoduladores.</li>
          <li><strong>Terapia Nutricional Enteral (TNE) por sonda:</strong> Indicada quando a ingestão oral (mesmo com suplementos) é incapaz de suprir &ge; 50% a 60% das necessidades energéticas e proteicas (por exemplo, tumores obstrutivos parciais de cabeça e pescoço, esôfago ou estômago nos quais ainda é possível passar uma sonda nasoenteral fina por via endoscópica ultrapassando a estenose). Sempre que possível, a TNE pré-operatória deve ser realizada em regime domiciliar ou ambulatorial para evitar colonização hospitalar por germes multirresistentes antes da cirurgia.</li>
          <li><strong>Terapia Nutricional Parenteral (TNP) pré-operatória:</strong> Reservada exclusivamente para pacientes com risco nutricional grave nos quais o trato gastrointestinal está <strong>totalmente obstruído, inacessível ou não funcionante</strong> (ex.: estenose pilórica maligna completa sem passagem para sonda nasoenteral, obstrução intestinal subaguda, isquemia mesentérica crônica grave) ou quando a via enteral não consegue atingir mais de 50% das necessidades calórico-proteicas após 3 a 5 dias de tentativa. Nesses casos, a TNP pré-operatória deve ser mantida por 7 a 14 dias antes do procedimento cirúrgico.</li>
        </ul>

        <h3>3.3 Conduta na Emergência Cirúrgica em Paciente Gravemente Desnutrido</h3>
        <p>É fundamental destacar que a postergação de 7 a 14 dias aplica-se a procedimentos <strong>eletivos ou semieletivos</strong>. Na vigência de urgência ou emergência cirúrgica — como perfuração de víscera oca com peritonite difusa, sangramento digestivo maciço refratário, obstrução em alça fechada com sofrimento vascular ou sepse abdominal não controlada —, <strong>não se adia a cirurgia para nutrir o paciente</strong>. Nesses cenários, a prioridade absoluta é a ressuscitação hemodinâmica, o controle do foco séptico/hemorrágico e a adaptação da tática operatória: em um paciente com albumina de 2,1 g/dL, peritonite fecal e perda ponderal de 18%, evita-se a realização de anastomose primária de alto risco (optando-se por derivação externa / ostomia terminal ou protetora) e planeja-se no próprio ato operatório um acesso nutricional definitivo (como jejunostomia alimentar à Witzel ou passagem de sonda nasojejunal) para início precoce da terapia nutricional assim que a estabilidade hemodinâmica for alcançada.</p>
      `
    },
    {
      id: 'sec-04-abreviacao-jejum-acerto-eras',
      title: '4. Abreviação do Jejum Pré-Operatório e Protocolos Multimodais (ACERTO e ERAS)',
      body_html: `
        <h3>4.1 A Queda do Dogma do "Jejum a Partir da Meia-Noite"</h3>
        <p>Durante décadas, a prática anestésico-cirúrgica baseou-se no dogma instituído após a descrição da síndrome de Mendelson (pneumonite química aspirativa em gestantes submetidas a anestesia geral sem intubação traqueal na década de 1940), determinando "nada pela boca a partir da meia-noite" (<em>NPO after midnight</em>) para todos os pacientes cirúrgicos. Na prática hospitalar real, como cirurgias frequentemente ocorrem à tarde ou sofrem atrasos, esse protocolo resultava em períodos de jejum pré-operatório de 12, 16 ou até 20 horas.</p>
        <p>O jejum prolongado antes da cirurgia desencadeia uma cascata metabólica deletéria: depleta completamente o glicogênio hepático antes mesmo da incisão, eleva os níveis circulantes de glucagon, cortisol e ácidos graxos livres, e induz intensa <strong>resistência periférica à insulina</strong> mediada pela inativação do transportador GLUT-4 no músculo esquelético e no tecido adiposo (via defeito na fosforilação pós-receptor da PI3-quinase). No pós-operatório, essa resistência insulínica manifesta-se como hiperglicemia de estresse (que prejudica a quimiotaxia neutrofilica e aumenta a taxa de infecção do sítio cirúrgico), intensifica a proteólise muscular, aumenta a incidência de náuseas e vômitos pós-operatórios (NVPO) e gera sede, fome, ansiedade e desconforto extremo ao paciente.</p>

        <h3>4.2 Fisiologia do Esvaziamento Gástrico e o Protocolo de Abreviação do Jejum</h3>
        <p>Estudos cintilográficos e ultrassonográficos demonstraram de forma inequívoca que líquidos claros sem resíduos e sem lipídios abandonam o estômago muito rapidamente (meia-vida de esvaziamento gástrico de 15 a 20 minutos, com esvaziamento completo em 60 a 90 minutos). Com base nessa evidência, tanto o protocolo europeu <strong>ERAS</strong> (<em>Enhanced Recovery After Surgery</em>) quanto o protocolo brasileiro <strong>ACERTO</strong> (<em>Aceleração da Recuperação Total Pós-Operatória</em>, desenvolvido pela UFMT e endossado pelo Colégio Brasileiro de Cirurgiões [CBC] e pela Sociedade Brasileira de Anestesiologia [SBA]) estabeleceram a <strong>abreviação do jejum pré-operatório</strong>:</p>
        <ul>
          <li><strong>Jejum para alimentos sólidos, refeições completas e leite não humano:</strong> <strong>6 a 8 horas</strong> antes da indução anestésica (6 horas para refeições leves como torrada e chá; 8 horas para alimentos fritos, gordurosos ou carne vermelha).</li>
          <li><strong>Jejum para líquidos claros enriquecidos com carboidratos:</strong> Permitido e fortemente recomendado até <strong>2 horas antes da indução anestésica</strong>.</li>
          <li><strong>Composição padrão da solução pré-operatória (ACERTO):</strong> Oferta de <strong>200 a 400 mL de líquido claro contendo maltodextrina a 12,5%</strong> (geralmente 200 mL na noite anterior e 200 mL exatamente 2 horas antes da cirurgia; o uso de 50 g de maltodextrina diluídos em 400 mL de água fornece uma solução de baixa osmolaridade [~280 mOsm/L], que não retarda o esvaziamento gástrico, ao contrário da glicose hipertônica simples).</li>
          <li><strong>Fórmula com adição de fonte nitrogenada:</strong> Em versões avançadas do projeto ACERTO, utiliza-se solução de maltodextrina associada a proteína do soro do leite hidrolisada (<em>whey protein</em>) ou glutamina até 2 a 3 horas antes da operação, mantendo esvaziamento gástrico seguro e potencializando o efeito anticatabólico.</li>
        </ul>

        <h3>4.3 Benefícios Clínicos Comprovados da Abreviação do Jejum com Maltodextrina</h3>
        <p>A ingestão de 200 a 400 mL de maltodextrina a 12,5% duas horas antes da anestesia promove um pico fisiológico de insulina endógena (~50 a 60 &mu;UI/mL), fazendo com que o paciente entre no centro cirúrgico em estado metabólico alimentado (anabólico) em vez de estado de jejum (catabólico). Os benefícios comprovados em ensaios clínicos randomizados e metanálises incluem:</p>
        <ul>
          <li>Redução de até 50% na resistência periférica à insulina no pós-operatório e melhor controle glicêmico perioperatório;</li>
          <li>Preservação da massa magra muscular e atenuação do balanço nitrogenado negativo;</li>
          <li>Redução significativa de náuseas e vômitos pós-operatórios (NVPO);</li>
          <li>Redução da sede, fome, ansiedade e mal-estar pré-operatório;</li>
          <li>Retorno mais precoce do trânsito gastrointestinal e redução do tempo de internação hospitalar, <strong>sem nenhum aumento no volume residual gástrico, na acidez gástrica ou no risco de broncoaspiração na indução anestésica</strong>.</li>
        </ul>

        <h3>4.4 Contraindicações (Exceções Obrigatórias) à Abreviação do Jejum Pré-Operatório</h3>
        <p>Nas provas de residência, é essencial dominar quais pacientes <strong>NÃO podem</strong> receber a solução de carboidratos 2 horas antes da cirurgia devido ao retardo patológico do esvaziamento gástrico ou risco elevado de regurgitação/broncoaspiração:</p>
        <ol>
          <li><strong>Obstrução ou suboclusão gastrointestinal mecânica</strong> (ex.: estenose pilórica, obstrução intestinal alta ou baixa, acalasia da cárdia);</li>
          <li><strong>Gastroparesia conhecida ou suspeita</strong> (ex.: diabetes mellitus de longa data com neuropatia autonômica mal controlada, uso crônico de altas doses de opioides ou agonistas do receptor de GLP-1 sem suspensão prévia adequada);</li>
          <li><strong>Doença do Refluxo Gastroesofágico (DRGE) grave ou sintomática</strong> e hérnia hiatal volumosa;</li>
          <li><strong>Cirurgias de urgência ou emergência</strong> (abdome agudo inflamatório, perfurativo, obstrutivo, vascular ou hemorrágico, trauma agudo);</li>
          <li><strong>Gestantes em trabalho de parto ativo</strong> ou candidatas a cesariana de urgência;</li>
          <li><strong>Obesidade mórbida associada a refluxo importante ou via aérea difícil prevista</strong> (embora obesos sem gastroparesia/DRGE grave possam se beneficiar de líquidos claros, casos com refluxo significativo exigem cautela individualizada).</li>
        </ol>

        <table class="book-table">
          <thead>
            <tr>
              <th>Tipo de Alimento / Líquido</th>
              <th>Tempo Mínimo de Jejum Pré-Anestésico (ASA / SBA / ACERTO)</th>
              <th>Justificativa Fisiológica</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Líquidos claros sem resíduos (água, chá sem açúcar, maltodextrina 12,5%)</strong></td>
              <td><strong>2 horas</strong></td>
              <td>Baixa osmolaridade e ausência de lipídios/fibras permitem esvaziamento gástrico completo em 60 a 90 minutos.</td>
            </tr>
            <tr>
              <td><strong>Leite materno (em lactentes)</strong></td>
              <td><strong>4 horas</strong></td>
              <td>Menor teor de caseína e maior proporção de proteínas do soro facilitam a digestão gástrica em comparação ao leite de vaca.</td>
            </tr>
            <tr>
              <td><strong>Fórmulas infantis, leite não humano e refeições leves (torrada + chá)</strong></td>
              <td><strong>6 horas</strong></td>
              <td>Formação de coágulo de caseína no ambiente ácido gástrico e digestão intermediária de amidos simples.</td>
            </tr>
            <tr>
              <td><strong>Alimentos sólidos completos, carnes, frituras e alimentos gordurosos</strong></td>
              <td><strong>8 horas</strong></td>
              <td>Lipídios e proteínas complexas estimulam colecistoquinina (CCK), que inibe o tônus do fundo gástrico e contrai o piloro, retardando o esvaziamento.</td>
            </tr>
          </tbody>
        </table>
      `
    },
    {
      id: 'sec-05-realimentacao-precoce-pos-operatoria',
      title: '5. Realimentação Precoce no Pós-Operatório e a Desmistificação do Íleo Fisiológico',
      body_html: `
        <h3>5.1 Fisiologia do Íleo Pós-Operatório por Segmento Digestivo</h3>
        <p>Outro paradigma tradicional derrubado pela medicina baseada em evidências (protocolos ERAS e ACERTO) era a conduta de manter o paciente em "dieta zero até a eliminação de flatos ou fezes e o retorno dos ruídos hidroaéreos (RHA)", além do uso rotineiro e prolongado de sonda nasogástrica descompressiva após laparotomias. Para compreender por que esse dogma estava incorreto, é indispensável analisar o tempo de recuperação da motilidade de cada segmento do trato gastrointestinal após uma cirurgia abdominal:</p>
        <ul>
          <li><strong>Intestino delgado:</strong> Recupera sua atividade mioelétrica e capacidade contrátil/absortiva muito precocemente, em apenas <strong>4 a 8 horas</strong> (no máximo 12 horas) após o término da cirurgia, muitas vezes já apresentando complexo motor migrante durante o fechamento da pele;</li>
          <li><strong>Estômago:</strong> Recupera o esvaziamento coordenado em <strong>24 a 48 horas</strong>;</li>
          <li><strong>Cólon:</strong> É o último segmento a recuperar a motilidade propulsiva completa, levando cerca de <strong>48 a 72 horas</strong> (sendo o cólon esquerdo e o sigmoide os mais lentos).</li>
        </ul>
        <p>Como os gases deglutidos acumulam-se e dependem da propulsão colônica para serem eliminados sob a forma de flatos, aguardar a eliminação de flatos ou fezes significa aguardar a recuperação do cólon (72 horas ou mais), privando desnecessariamente o paciente de nutrientes quando o intestino delgado já está plenamente apto a digerir e absorver desde o primeiro dia de pós-operatório. Além disso, a presença de ruídos hidroaéreos à ausculta abdominal não se correlaciona com a tolerância à dieta nem com a integridade anastomótica.</p>

        <h3>5.2 Segurança da Realimentação Precoce (&lt; 24 horas) nas Anastomoses Digestivas</h3>
        <p>Durante muito tempo, temia-se que a oferta de dieta oral ou enteral nas primeiras 24 horas após uma anastomose intestinal aumentasse o risco de fístula ou deiscência por "trânsito mecânico sobre a linha de sutura". Estudos clínicos prospectivos e metanálises comprovaram exatamente o oposto: todos os dias o trato gastrointestinal secreta espontaneamente cerca de <strong>6 a 8 litros de secreções endógenas</strong> (saliva, suco gástrico, bile, secreção pancreática e suco entérico) que transitam obrigatoriamente pela anastomose mesmo quando o paciente está em dieta zero! Portanto, deixar o paciente em jejum não "poupa" mecanicamente a anastomose, mas priva a mucosa intestinal de substratos luminais essenciais (como glutamina e ácidos graxos de cadeia curta).</p>
        <p>A <strong>realimentação precoce nas primeiras 24 horas de pós-operatório</strong> (seja por via oral em cirurgias colorretais, ginecológicas e gastrointestinais baixas, seja por sonda nasojejunal/jejunostomia em cirurgias esofágicas e gástricas totais):</p>
        <ul>
          <li>Estimula o reflexo gastrocólico e a secreção de hormônios pró-cinéticos (motilina, colecistoquinina), <strong>abreviando a duração do íleo pós-operatório</strong>;</li>
          <li>Mantém o trofismo vilositário, aumenta o fluxo sanguíneo esplâncnico microvascular na linha de sutura e eleva a deposição de hidroxiprolina/colágeno, <strong>protegendo a anastomose contra deiscência</strong>;</li>
          <li>Reduz a translocação bacteriana e a incidência de complicações infecciosas pós-operatórias (pneumonia, abscesso intra-abdominal, sepse);</li>
          <li>Reduz o tempo total de internação hospitalar e a mortalidade perioperatória.</li>
        </ul>
        <p>O único efeito adverso discretamente mais frequente com a realimentação precoce em alguns estudos antigos foi a ocorrência de episódios isolados de vômito quando não se associava profilaxia antiemética multimodal e restrição hídrica venosa; porém, sem qualquer aumento na taxa de broncoaspiração, reoperação ou fístula anastomótica.</p>

        <h3>5.3 Pilares Sinérgicos do ACERTO e ERAS para Tolerância à Dieta Precoce</h3>
        <p>Para que a realimentação precoce nas primeiras 6 a 24 horas seja bem tolerada, ela deve estar inserida no pacote multimodal perioperatório:</p>
        <ol>
          <li><strong>Restrição de fluidos intravenosos perioperatórios (balanço hídrico próximo de zero):</strong> A hiper-hidratação venosa com soro fisiológico 0,9% (rico em sódio e cloro) causa sobrecarga hidrossalina, acidose hiperclorêmica e edema da parede intestinal, que é a principal causa iatrogênica de íleo paralítico prolongado e deiscência anastomótica. Prefere-se solução cristaloide balanceada (Ringer lactato ou Plasma-Lyte) guiada por metas e suspensão precoce da hidratação venosa assim que a ingesta oral é retomada.</li>
          <li><strong>Analgesia multimodal poupadora de opioides:</strong> O uso de bloqueio peridural torácico contínuo (T7–T10) com anestésico local em laparotomias abertas ou bloqueios de parede abdominal (TAP block) associados a anti-inflamatórios e dipirona reduz o tônus simpático esplâncnico inibitório e evita o bloqueio dos receptores mu-opioides no plexo mioentérico de Auerbach.</li>
          <li><strong>Abolição do uso rotineiro de sonda nasogástrica (SNG) e do preparo mecânico de cólon isolado:</strong> A SNG profilática aumenta atelectasia, pneumonia e refluxo faringolaríngeo sem prevenir deiscência.</li>
          <li><strong>Mobilização ultraconservadora/precoce:</strong> Retirar o paciente do leito nas primeiras 24 horas estimula o trânsito intestinal e preserva a síntese proteica muscular.</li>
        </ol>
      `
    },
    {
      id: 'sec-06-escolha-da-via-nutricional',
      title: '6. Escolha da Via de Terapia Nutricional: Oral, Enteral (Gástrica vs Pós-Pilórica, Ostomias) e Parenteral',
      body_html: `
        <h3>6.1 Algoritmo Decisório da Via Nutricional</h3>
        <p>A escolha da via de administração nutricional no paciente cirúrgico segue uma hierarquia fisiológica estrita baseada na funcionalidade, integridade e acessibilidade do trato gastrointestinal (TGI):</p>
        <ul>
          <li><strong>1ª Escolha — Via Oral + Suplementação Nutricional Oral (SNO):</strong> Indicada sempre que o paciente está lúcido, com reflexo de proteção laríngea preservado, sem disfagia ou risco de broncoaspiração, com TGI funcionante, mas cuja ingestão espontânea da dieta hospitalar é inferior a 75% das necessidades diárias calóricas e proteicas.</li>
          <li><strong>2ª Escolha — Terapia Nutricional Enteral (TNE):</strong> Indicada quando a ingestão oral é impossível, insegura ou insuficiente (&lt; 50% a 60% das metas calórico-proteicas por mais de 3 a 5 dias no paciente eutrófico, ou imediatamente no desnutrido/pós-operatório de grande porte), porém o intestino delgado encontra-se íntegro e com capacidade absortiva preservada.</li>
          <li><strong>3ª Escolha (Modalidade A) — Terapia Nutricional Parenteral Complementar (Suplementar):</strong> Indicada quando o paciente em TNE otimizada (mesmo após uso de agentes procinéticos e posicionamento pós-pilórico da sonda) não consegue atingir pelo menos 60% de suas metas calórico-proteicas após 4 a 7 dias de tentativa. Nessa situação, mantém-se a TNE na velocidade máxima tolerada (para preservar o trofismo mucoso e a secreção de sIgA) e complementa-se o déficit calórico-proteico por via venosa.</li>
          <li><strong>3ª Escolha (Modalidade B) — Terapia Nutricional Parenteral Exclusiva (Total — NPT):</strong> Indicada exclusivamente quando o trato gastrointestinal está completamente <strong>não funcionante, inacessível ou com contraindicação absoluta ao uso luminal</strong>, incluindo obstrução intestinal mecânica completa sem possibilidade de descompressão/transposição, íleo paralítico grave e refratário, isquemia mesentérica aguda em investigação ou choque hemodinâmico não controlado, peritonite difusa em programação de reabordagem, síndrome do intestino curto na fase aguda hipersecretora imediata, fístula digestiva de alto débito sem possibilidade de acesso enteral distal (fistuloclise) ou hemorragia digestiva ativa com instabilidade hemodinâmica.</li>
        </ul>

        <h3>6.2 Nutrição Enteral: Posição Gástrica vs Pós-Pilórica e Sondas vs Ostomias</h3>
        <p>Dentro da Terapia Nutricional Enteral, duas decisões técnicas fundamentais são exigidas do cirurgião: a localização da ponta distal da sonda (gástrica vs pós-pilórica/jejunal) e o tempo previsto de uso da terapia enteral (&lt; 4–6 semanas vs &gt; 4–6 semanas):</p>
        <ul>
          <li><strong>Posição Gástrica (Sonda Nasogástrica de fino calibre — Dobbhoff em posição gástrica, ou Gastrostomia):</strong> É a posição mais fisiológica, de mais fácil passagem à beira do leito, permite administração intermitente/em <em>bolus</em> ou contínua, aproveita a capacidade de reservatório e a barreira bactericida ácida do estômago (ácido clorídrico e pepsina), e tolera fórmulas poliméricas intactas de maior osmolaridade. É a via padrão na maioria dos pacientes cirúrgicos sem retardo do esvaziamento gástrico.</li>
          <li><strong>Posição Pós-Pilórica / Duodeno-Jejunal (Sonda Nasojejunal ou Jejunostomia):</strong> Obrigatória quando há: (1) <strong>Alto risco de broncoaspiração</strong> ou histórico de pneumonia aspirativa; (2) <strong>Gastroparesia grave ou estase gástrica refratária</strong> a procinéticos (metoclopramida, bromoprida, eritromicina); (3) <strong>Pós-operatório de cirurgias do trato digestivo superior</strong> nas quais a infusão deve ocorrer distalmente à anastomose recém-confeccionada (esofagectomia, gastrectomia total ou subtotal, duodenopancreatectomia); (4) <strong>Pancreatite aguda grave</strong> quando houver intolerância à infusão gástrica por compressão extrínseca gastroduodenal pelo flegmão pancreático. <em>Atenção:</em> Como o jejuno não possui função de reservatório nem capacidade de diluição osmótica rápida, a infusão jejunal deve ser sempre <strong>contínua em bomba de infusão</strong>, evitando-se administração rápida em <em>bolus</em> (que provocaria síndrome de <em>dumping</em>, cólicas abdominais intensas e diarreia osmótica).</li>
          <li><strong>Critério Temporal de Curto Prazo (&lt; 4 a 6 semanas):</strong> Indica-se <strong>sonda nasogástrica ou nasoenteral</strong> de poliuretano ou silicone, flexível, de fino calibre (8 a 12 French) e radiopaca. Não se deve utilizar sonda de polivinil (Levin calibrosa de 16–20 Fr) para nutrição enteral, pois a sonda de Levin rígida é destinada apenas à drenagem/descompressão gástrica e, se mantida para dieta, causa úlceras de decúbito na mucosa esofagogástrica, estenose esofágica, sinusite bacteriana e incompetência mecânica do esfíncter esofágico inferior com broncoaspiração.</li>
          <li><strong>Critério Temporal de Longo Prazo (&gt; 4 a 6 semanas):</strong> Indica-se <strong>ostomia nutricional definitiva</strong> (Gastrostomia Endoscópica Percutânea — PEG, gastrostomia cirúrgica à Stamm ou à Witzel, ou jejunostomia cirúrgica à Witzel), prevenindo sinusite maxilar, necrose de asa nasal, esofagite de refluxo e deslocamentos acidentais repetidos. Na técnica de <strong>Stamm</strong>, confeccionam-se bolsas concêntricas (suturas em bolsa de tabaco) na parede gástrica anterior ao redor da sonda e fixa-se o estômago ao peritônio parietal anterior; na técnica de <strong>Witzel</strong> (usada tanto no estômago quanto, classicamente, no jejuno proximal a 20–30 cm do ângulo de Treitz), cria-se um túnel seromuscular longitudinal de 4 a 6 cm sobre o cateter antes de exteriorizá-lo na parede abdominal, o que cria um mecanismo valvular que impede o refluxo e permite fechamento rápido do trajeto após a retirada da sonda.</li>
        </ul>

        <h3>6.3 Nutrição Parenteral Periférica (NPP) vs Nutrição Parenteral Central / Total (NPT)</h3>
        <p>Quando a via intravenosa é necessária, a escolha entre acesso venoso periférico e acesso venoso central depende da <strong>osmolaridade da solução</strong> e do <strong>tempo previsto de suporte parenteral</strong>:</p>
        <ul>
          <li><strong>Nutrição Parenteral Periférica (NPP):</strong> Administrada em veia periférica de membro superior. Como o endotélio das veias periféricas sofre flebite química e tromboflebite rapidamente sob alta osmolaridade, a NPP <strong>não pode ultrapassar a osmolaridade de 850 a 900 mOsm/L</strong>. Por essa limitação físico-química, a NPP tem menor densidade calórica (depende de maior proporção calórica lipídica, já que emulsões lipídicas são isotônicas, ao passo que glicose hipertônica e aminoácidos elevam muito a osmolaridade) e exige maior volume hídrico. É indicada apenas como suporte de <strong>curtíssimo prazo (até 7 a 10 dias, no máximo 14 dias)</strong>, como ponte ou complementação nutricional.</li>
          <li><strong>Nutrição Parenteral Total / Central (NPT):</strong> Administrada obrigatoriamente através de um cateter venoso central cuja ponta esteja posicionada na <strong>junção da veia cava superior com o átrio direito</strong> (acesso subclávio, jugular interno ou cateter central de inserção periférica — PICC). O alto fluxo sanguíneo da veia cava superior (~2,0 a 2,5 L/min) dilui instantaneamente soluções hiperosmolares com <strong>osmolaridade &gt; 900 mOsm/L (frequentemente 1.300 a 1.800 mOsm/L)</strong>, permitindo suprir 100% das necessidades calórico-proteicas em pacientes com restrição hídrica ou necessidade de suporte por período superior a 7 a 10 dias. Entre os acessos centrais de curta permanência no hospital, a <strong>veia subclávia</strong> apresenta a menor taxa de infecção de corrente sanguínea relacionada ao cateter (ICSRC) em comparação à veia jugular interna e à veia femoral (sendo a femoral contraindicada para NPT eletiva pelo altíssimo risco infeccioso e trombótico). Para suporte parenteral domiciliar prolongado (&gt; 30 dias, como na falência intestinal crônica), opta-se por PICC ou cateteres totalmente implantáveis/tunelizados de longa permanência (ex.: Hickman, Broviac).</li>
        </ul>

        <table class="book-table">
          <thead>
            <tr>
              <th>Modalidade de Acesso Nutricional</th>
              <th>Indicação Clínica Principal</th>
              <th>Duração Prevista</th>
              <th>Limite de Osmolaridade e Particularidades Técnicas</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Sonda Nasogástrica / Nasoenteral (Dobbhoff)</strong></td>
              <td>TGI funcionante com ingestão oral &lt; 60%; pós-operatório de cirurgia esofagogástrica (pós-pilórica).</td>
              <td>&lt; 4 a 6 semanas</td>
              <td>Radiografia simples pós-passagem é obrigatória antes de iniciar a dieta para excluir posicionamento na árvore brônquica.</td>
            </tr>
            <tr>
              <td><strong>Gastrostomia (PEG ou Stamm) / Jejunostomia (Witzel)</strong></td>
              <td>Disfagia neurológica crônica, tumores obstrutivos de cabeça/pescoço ou esôfago, acesso cirúrgico definitivo.</td>
              <td>&gt; 4 a 6 semanas</td>
              <td>PEG é contraindicada em ascite volumosa, carcinomatose peritoneal, coagulopatia não corrigida e ausência de transiluminação gástrica.</td>
            </tr>
            <tr>
              <td><strong>Nutrição Parenteral Periférica (NPP)</strong></td>
              <td>Suporte complementar ou ponte em jejum curto quando acesso central não está disponível ou indicado.</td>
              <td>&le; 7 a 10 dias</td>
              <td><strong>Osmolaridade máxima de 850 a 900 mOsm/L</strong>; alto risco de flebite química periférica; requer rodízio venoso a cada 72–96h.</td>
            </tr>
            <tr>
              <td><strong>Nutrição Parenteral Central (NPT)</strong></td>
              <td>Falência intestinal aguda/crônica, fístula de alto débito, íleo prolongado, obstrução mecânica, TNP &gt; 7–10 dias.</td>
              <td>&gt; 7 a 10 dias</td>
              <td><strong>Osmolaridade &gt; 900 mOsm/L</strong>; ponta na veia cava superior distal; via subclávia ou PICC preferenciais para reduzir ICSRC.</td>
            </tr>
          </tbody>
        </table>
      `
    },
    {
      id: 'sec-07-calculo-metas-caloricas-proteicas',
      title: '7. Cálculo de Metas Calóricas, Proteicas, Lipídicas, Glicídicas e Micronutrientes',
      body_html: `
        <h3>7.1 Determinação do Gasto Energético: Calorimetria Indireta, Equação de Weir e Regra de Bolso</h3>
        <p>O padrão-ouro para aferir o gasto energético de repouso (GER) em pacientes cirúrgicos complexos ou críticos em ventilação mecânica é a <strong>calorimetria indireta</strong>, que mede o consumo de oxigênio ($VO_2$) e a produção de gás carbônico ($VCO_2$) através da equação de Weir ($GER = [3,94 \times VO_2 + 1,11 \times VCO_2] \times 1,44$), permitindo também calcular o <strong>Quociente Respiratório ($QR = VCO_2 / VO_2$)</strong>. A interpretação do QR é frequentemente cobrada em provas de terapia intensiva cirúrgica: a oxidação pura de lipídios gera um $QR = 0,70$; a oxidação pura de proteínas gera um $QR \approx 0,80\text{ a }0,82$; a oxidação fisiológica mista de substratos mantém o $QR\text{ entre }0,82\text{ e }0,85$; a oxidação pura de carboidratos gera um $QR = 1,00$; e um <strong>$QR &gt; 1,00$ (entre 1,05 e 1,30) diagnostica hiperalimentação (<em>overfeeding</em>) com lipogênese líquida</strong>, situação na qual o excesso de glicose está sendo convertido em gordura com liberação maciça de $CO_2$, precipitando acidose respiratória e falha no desmame do ventilador mecânico.</p>
        <p>Na ausência de calorimetria indireta, as diretrizes da ESPEN e da BRASPEN recomendam o uso da <strong>fórmula de bolso (regra prática por quilograma de peso)</strong> em vez de equações preditivas antigas (como Harris-Benedict multiplicada por fatores de estresse exagerados):</p>
        <ul>
          <li><strong>Fase inicial aguda de estresse cirúrgico / UTI (primeiros 3 a 4 dias — Fase Ebb/Flow precoce):</strong> Oferta hipocalórica trófica/progressiva de <strong>15 a 20 kcal/kg/dia</strong> (ou até 70% do gasto medido), evitando hiperalimentação (<em>overfeeding</em>) enquanto há intensa produção endógena de glicose por gliconeogênese hepática (cerca de 1.000 a 1.500 kcal/dia endógenas) que não é suprimida pela infusão exógena.</li>
          <li><strong>Fase de manutenção perioperatória padrão (paciente cirúrgico estável / enfermaria / após o 4º dia de UTI):</strong> Meta calórica plena de <strong>25 a 30 kcal/kg/dia</strong>.</li>
          <li><strong>Fase de reabilitação nutricional / anabolismo tardio ou grandes queimados:</strong> Pode atingir <strong>30 a 35 kcal/kg/dia</strong> conforme tolerância metabólica e controle glicêmico.</li>
        </ul>

        <h3>7.2 Metas Proteicas, Balanço Nitrogenado e Relação Caloria Não Proteica por Grama de Nitrogênio</h3>
        <p>No paciente cirúrgico, a proteína é o macronutriente mais importante para a cicatrização de feridas, síntese de colágeno anastomótico, manutenção da massa muscular diafragmática e produção de imunoglobulinas e proteínas de fase aguda. Ao contrário do indivíduo saudável (cuja recomendação proteica basal é de 0,8 g/kg/dia), o paciente cirúrgico sob estresse metabólico requer:</p>
        <ul>
          <li><strong>Cirurgia eletiva de médio/grande porte sem complicação grave:</strong> <strong>1,2 a 1,5 g de proteína/kg/dia</strong>;</li>
          <li><strong>Paciente cirúrgico crítico, politraumatizado, séptico ou com fístula digestiva de alto débito:</strong> <strong>1,5 a 2,0 g de proteína/kg/dia</strong> (podendo chegar a 2,0 a 2,5 g/kg/dia em grandes queimados ou pacientes em terapia de substituição renal contínua — hemodiafiltração venovenosa contínua, que espolia 10 a 15 g de aminoácidos por dia no dialisato).</li>
        </ul>
        <p>Cada grama de nitrogênio ($N$) corresponde a <strong>6,25 g de proteína</strong> (pois a proteína contém em média 16% de nitrogênio: $100 / 16 = 6,25$). O <strong>Balanço Nitrogenado ($BN$)</strong> é calculado pela fórmula clássica: $BN = (\text{Proteína ingerida em g} / 6,25) - (\text{Ureia urinária de 24h em g} \times 0,46 + 4)$, onde a constante $+4$ representa as perdas nitrogenadas não ureicas na urina (amônia, creatinina, ácido úrico, ~2 g) somadas às perdas insensíveis fecais e cutâneas (~2 g). Para que os aminoácidos administrados sejam utilizados na síntese proteica tecidual (anabolismo) e não sejam desviados para oxidação energética (gliconeogênese), é necessário fornecer uma quantidade adequada de calorias não proteicas (carboidratos + lipídios). A <strong>relação caloria não proteica por grama de nitrogênio (kcal não proteica : g N)</strong> muda conforme o grau de estresse metabólico:</p>
        <ul>
          <li><strong>Paciente sem estresse metabólico (jejum simples / reabilitação ambulatorial):</strong> 120:1 a 150:1 kcal não proteicas/g N;</li>
          <li><strong>Paciente cirúrgico com estresse moderado:</strong> 100:1 a 120:1 kcal não proteicas/g N;</li>
          <li><strong>Paciente cirúrgico crítico / hipercatabólico / séptico:</strong> <strong>70:1 a 100:1 kcal não proteicas/g N</strong> (menor relação porque a oferta proteica é proporcionalmente muito mais alta enquanto o aporte calórico é moderado para evitar hiperalimentação).</li>
        </ul>

        <h3>7.3 Ajustes Especiais no Paciente Obeso Cirúrgico</h3>
        <p>No paciente obeso ($IMC \ge 30\text{ kg/m}^2$) submetido a cirurgia de grande porte ou internado em UTI, utilizar o peso atual na regra de 25 a 30 kcal/kg/dia causaria grave hiperalimentação, esteatose hepática e hiperglicemia refratária. Por outro lado, o obeso perde massa magra aceleradamente (sarcopenia oculta ou obesidade sarcopênica). Por isso, a diretriz padrão (ASPEN/ESPEN/BRASPEN) para o obeso crítico/cirúrgico preconiza a <strong>nutrição hipocalórica e hiperproteica</strong>:</p>
        <ul>
          <li><strong>Meta Calórica no Obeso Classe I, II e III (IMC entre 30 e 50 kg/m²):</strong> <strong>11 a 14 kcal/kg de peso ATUAL/dia</strong> (equivalente a 65%–70% do gasto energético medido por calorimetria indireta);</li>
          <li><strong>Meta Calórica no Superobeso (IMC &gt; 50 kg/m²):</strong> <strong>22 a 25 kcal/kg de peso IDEAL/dia</strong>;</li>
          <li><strong>Meta Proteica no Obeso Classe I e II (IMC entre 30 e 40 kg/m²):</strong> <strong>2,0 g de proteína/kg de peso IDEAL/dia</strong>;</li>
          <li><strong>Meta Proteica no Obeso Classe III / Mórbido (IMC &ge; 40 kg/m²):</strong> <strong>2,0 a 2,5 g de proteína/kg de peso IDEAL/dia</strong>.</li>
        </ul>

        <h3>7.4 Densidade Energética e Limites de Infusão dos Macronutrientes na Nutrição Parenteral</h3>
        <p>É obrigatório conhecer o valor calórico exato e a taxa máxima de oxidação de cada macronutriente em soluções parenterais e enterais:</p>
        <ul>
          <li><strong>Carboidratos (Glicose):</strong> Na dieta enteral/oral, 1 g de carboidrato fornece <strong>4,0 kcal</strong>. Na Nutrição Parenteral, utiliza-se a <strong>glicose monoidratada (dextrose)</strong>, que fornece <strong>3,4 kcal/g</strong>. A velocidade máxima de oxidação hepática de glicose na NPT é de <strong>4 a 5 mg/kg/min</strong> (cerca de 3,5 a 4,0 g/kg/dia). Taxas de infusão de glicose superiores a 5 mg/kg/min não geram mais ATP; ao contrário, são convertidas em triglicerídeos no fígado (lipogênese <em>de novo</em>), causando esteatose hepática aguda, hiperglicemia refratária e aumento excessivo da produção de $CO_2$ ($QR &gt; 1,0$), o que precipita retenção de $CO_2$ e dificulta o desmame da ventilação mecânica.</li>
          <li><strong>Lipídios (Emulsões Lipídicas Intravenosas — ELIV):</strong> Na dieta enteral/oral, 1 g de lipídio fornece <strong>9,0 kcal</strong>. Na Nutrição Parenteral, as emulsões lipídicas a 10% ou 20% contêm glicerol e fosfolipídios de gema de ovo como emulsificantes, fornecendo aproximadamente <strong>10,0 kcal/g</strong> (ou seja, emulsão lipídica a 20% fornece 2,0 kcal/mL; a 10% fornece 1,1 kcal/mL). A dose recomendada de lipídios na NPT é de <strong>0,7 a 1,5 g/kg/dia</strong> (nunca ultrapassando a taxa máxima de infusão de 0,11 g/kg/hora ou o limite sérico de triglicerídeos de <strong>400 mg/dL</strong> — se triglicerídeos &gt; 400 mg/dL, suspende-se a emulsão lipídica pelo risco de pancreatite aguda hipertrigliceridêmica, síndrome de sobrecarga lipídica e imunossupressão reticuloendotelial). Além disso, pacientes em NPT exclusiva sem lipídios por mais de 2 a 3 semanas desenvolvem <strong>Deficiência de Ácidos Graxos Essenciais (ácido linoleico e alfa-linolênico)</strong>, caracterizada clinicamente por dermatite descamativa eczematoide generalizada, alopecia, trombocitopenia e atraso na cicatrização de feridas (prevenida ofertando pelo menos 2% a 4% das calorias totais como ácido linoleico). As emulsões modernas misturam óleo de soja (ômega-6), triglicerídeos de cadeia média (TCM), azeite de oliva (ômega-9) e óleo de peixe (ômega-3 — SMOF lipid), reduzindo o efeito pró-inflamatório e hepatotóxico das antigas emulsões exclusivas de óleo de soja.</li>
          <li><strong>Proteínas / Aminoácidos:</strong> Fornecem <strong>4,0 kcal/g</strong> tanto na via enteral quanto na parenteral.</li>
        </ul>

        <table class="book-table">
          <thead>
            <tr>
              <th>Substrato Nutricional</th>
              <th>Valor Calórico Enteral / Oral</th>
              <th>Valor Calórico Parenteral (NPT)</th>
              <th>Taxa / Dose Recomendada e Limite de Segurança na NPT</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Carboidratos / Dextrose</strong></td>
              <td>4,0 kcal/g</td>
              <td><strong>3,4 kcal/g</strong> (dextrose monoidratada)</td>
              <td>Dose usual: 3 a 4 g/kg/dia. <strong>Limite máximo de oxidação: 4 a 5 mg/kg/min</strong> (acima disso: hiperglicemia, esteatose e hipercapnia com $QR &gt; 1,0$).</td>
            </tr>
            <tr>
              <td><strong>Lipídios / Emulsão Lipídica</strong></td>
              <td>9,0 kcal/g</td>
              <td><strong>~10,0 kcal/g</strong> (2,0 kcal/mL na emulsão a 20%)</td>
              <td>Dose usual: 0,7 a 1,5 g/kg/dia (25% a 35% das calorias não proteicas). <strong>Suspender se triglicerídeos séricos &gt; 400 mg/dL</strong>.</td>
            </tr>
            <tr>
              <td><strong>Proteínas / Aminoácidos</strong></td>
              <td>4,0 kcal/g</td>
              <td><strong>4,0 kcal/g</strong> (1 g N = 6,25 g proteína)</td>
              <td>Dose cirúrgica: 1,2 a 2,0 g/kg/dia. Ajustar em encefalopatia hepática grave não controlada ou uremia sem diálise.</td>
            </tr>
          </tbody>
        </table>
      `
    },
    {
      id: 'sec-08-imunonutricao-perioperatoria',
      title: '8. Imunonutrição Perioperatória: Arginina, Ômega-3, Nucleotídeos e Glutamina',
      body_html: `
        <h3>8.1 Conceito e Mecanismo Farmacológico dos Imunonutrientes</h3>
        <p>A <strong>imunonutrição</strong> (ou dieta imunomoduladora) consiste na administração de nutrientes específicos em doses suprafisiológicas com o objetivo de modular a resposta inflamatória exacerbada do trauma cirúrgico, preservar a função imune celular (linfócitos T e macrófagos), acelerar a síntese de colágeno nas anastomoses e proteger a integridade da barreira mucosa intestinal. Os quatro principais imunonutrientes estudados em cirurgia são:</p>
        <ul>
          <li><strong>L-Arginina:</strong> Aminoácido condicionalmente essencial no estresse cirúrgico. É o substrato direto da enzima óxido nítrico sintase (NOS) para síntese de <strong>óxido nítrico (NO)</strong>, promovendo vasodilatação esplâncnica e melhorando a microcirculação na borda das anastomoses. Além disso, é convertida pela arginase em <strong>ornitina e prolina</strong> (precursores diretos da síntese de hidroxiprolina e colágeno pelos fibroblastos), estimula a secreção de hormônio do crescimento (GH), prolactina e IGF-1, e é indispensável para a expressão da cadeia zeta do receptor de células T (TCR), restaurando a proliferação e citotoxicidade dos linfócitos T. <em>Atenção crítica de prova:</em> Em pacientes com <strong>sepse grave ou choque séptico instalado</strong>, o excesso de arginina enteral/parenteral é <strong>contraindicado</strong>, pois a ativação maciça da óxido nítrico sintase induzível (iNOS) gera superprodução de óxido nítrico no endotélio sistêmico, agravando a vasodilatação refratária e a instabilidade hemodinâmica.</li>
          <li><strong>Ácidos Graxos Poli-insaturados Ômega-3 (EPA — ácido eicosapentaenoico e DHA — ácido docosa-hexaenoico, derivados do óleo de peixe):</strong> Competem com o ácido araquidônico (ômega-6) pelas enzimas ciclo-oxigenase (COX) e 5-lipoxigenase (5-LOX) nas membranas celulares dos leucócitos. Enquanto o ômega-6 origina eicosanoides fortemente pró-inflamatórios e imunossupressores das séries pares (prostaglandina $E_2$ [$PGE_2$], tromboxano $A_2$ e leucotrieno $B_4$), o ômega-3 gera prostanoides da série 3 ($PGE_3$, tromboxano $A_3$), leucotrienos da série 5 ($LTB_5$) e mediadores especializados pró-resolução (resolvinas, protectinas e maresinas), atenuando a tempestade de citocinas pós-operatória sem causar imunossupressão.</li>
          <li><strong>Nucleotídeos Dietéticos (RNA/DNA exógenos):</strong> Células de rápida proliferação — como os enterócitos da cripta intestinal e os linfócitos T ativados após o trauma cirúrgico — têm capacidade limitada de síntese <em>de novo</em> de bases púricas e pirimídicas. A oferta exógena de nucleotídeos preserva a altura das vilosidades intestinais, estimula a maturação de linfócitos T auxiliares e aumenta a produção de imunoglobulinas.</li>
          <li><strong>L-Glutamina:</strong> O aminoácido livre mais abundante do corpo humano (~60% do <em>pool</em> intracelular muscular). É o combustível respiratório preferencial das células de rápida divisão (enterócitos, colonócitos, linfócitos e macrófagos), precursora da síntese de <strong>glutationa</strong> (principal antioxidante intracelular) e reguladora da expressão das proteínas de choque térmico (<em>Heat Shock Proteins</em> — HSP-70). Previne a atrofia mucosa e a translocação bacteriana. Na nutrição parenteral (como dipeptídeo alanil-glutamina), pode ser utilizada em pacientes cirúrgicos em TNP exclusiva que não tenham insuficiência renal nem insuficiência hepática; contudo, com base no estudo REDOXS (Heyland et al., NEJM), altas doses de glutamina são <strong>estritamente contraindicadas em pacientes críticos em choque com disfunção de múltiplos órgãos, insuficiência renal ou insuficiência hepática</strong> devido ao aumento de mortalidade.</li>
        </ul>

        <h3>8.2 Indicações Formais e Posologia Perioperatória (ESPEN / ACERTO / BRASPEN)</h3>
        <p>Em quais pacientes a fórmula imunomoduladora (contendo arginina + ômega-3 + nucleotídeos) é formalmente recomendada com nível de evidência A?</p>
        <ol>
          <li><strong>Pacientes submetidos a Cirurgia Oncológica de Grande Porte do Trato Gastrointestinal Superior e Inferior</strong> (esofagectomia, gastrectomia total ou subtotal, duodenopancreatectomia/Whipple, colectomia/retossigmoidectomia oncológica);</li>
          <li><strong>Pacientes submetidos a Cirurgia Oncológica de Grande Porte de Cabeça e Pescoço</strong> (laringectomia total, faringolaringectomia, glossectomia com esvaziamento cervical e reconstrução com retalho);</li>
          <li><strong>Pacientes com trauma grave (ISS &gt; 18 ou ATI &gt; 20)</strong> sem choque séptico ativo.</li>
        </ol>
        <p><strong>Protocolo de Administração Perioperatória:</strong></p>
        <ul>
          <li><strong>No Pré-Operatório:</strong> Iniciar <strong>5 a 7 dias antes da cirurgia</strong> (em volume de 500 a 1.000 mL/dia, geralmente 2 a 3 unidades de suplemento oral imunomodulador ao dia, ou via enteral se disfágico). Segundo o projeto ACERTO e a ESPEN, em cirurgias oncológicas digestivas de grande porte, o benefício pré-operatório por 5 a 7 dias é observado especialmente nos pacientes com risco nutricional, sendo estendido por muitos protocolos para todos os candidatos a grandes ressecções esofagogástricas/pancreáticas;</li>
          <li><strong>No Pós-Operatório:</strong> Manter por mais <strong>5 a 7 dias após a cirurgia</strong> (por via oral ou sonda enteral pós-pilórica/jejunostomia) nos pacientes desnutridos ou em cirurgias de grande porte.</li>
          <li><strong>Desfechos comprovados:</strong> Redução de 40% a 50% nas complicações infecciosas pós-operatórias (ISC, pneumonia, infecção urinária), redução significativa na taxa de fístulas anastomóticas e redução média de 2 a 3 dias no tempo de permanência hospitalar.</li>
        </ul>
      `
    },
    {
      id: 'sec-09-complicacoes-nutricao-enteral-e-parenteral',
      title: '9. Complicações da Terapia Nutricional Enteral (TNE) e Parenteral (TNP): Prevenção e Manejo',
      body_html: `
        <h3>9.1 Complicações da Terapia Nutricional Enteral (TNE)</h3>
        <p>Embora a nutrição enteral seja muito mais segura e fisiológica que a parenteral, ela apresenta complicações mecânicas, gastrointestinais, infecciosas/pulmonares e metabólicas que exigem reconhecimento imediato:</p>
        <ul>
          <li><strong>Complicações Pulmonares / Infecciosas (Broncoaspiração):</strong> É a complicação mais temida e potencialmente letal da TNE. Para preveni-la, é obrigatório: (1) Confirmar a posição da sonda por <strong>radiografia simples toracoabdominal antes da primeira infusão</strong> (a ausculta epigástrica da injeção de ar não é confiável, pois uma sonda alojada no brônquio fonte inferior ou espaço pleural transmite som perfeitamente audível no epigástrio!); (2) Manter a <strong>cabeceira do leito elevada entre 30&deg; e 45&deg;</strong> durante toda a infusão; (3) Posicionar a sonda em região pós-pilórica (duodeno distal/jejuno) em pacientes com gastroparesia, refluxo ou antecedente de aspiração; (4) Utilizar procinéticos (metoclopramida 10 mg IV de 8/8h ou eritromicina) se houver estase gástrica. Nota: as diretrizes atuais (ASPEN/BRASPEN) desaconselham a checagem rotineira de volume residual gástrico (VRG) a cada 4 horas em pacientes assintomáticos, e quando aferido, apenas volumes &gt; 500 mL associados a sinais clínicos de intolerância justificam suspensão temporária da dieta.</li>
          <li><strong>Complicações Gastrointestinais (Diarreia, Distensão e Constipação):</strong> A <strong>diarreia em paciente com TNE</strong> é a intercorrência mais comum na prática clínica, mas um erro grave de prova é suspender imediatamente a dieta enteral atribuindo a diarreia exclusivamente à fórmula! Na maioria das vezes, a diarreia no paciente cirúrgico em TNE deve-se a: (1) Uso concomitante de medicamentos líquidos hiperosmolares contendo <strong>sorbitol</strong> (xaropes de cloreto de potássio, elixires, soluções orais) ou procinéticos em excesso; (2) Infusão rápida demais ou de fórmula hiperosmolar; (3) Hipoalbuminemia grave (&lt; 2,5 g/dL) causando edema da mucosa intestinal; (4) Contaminação bacteriana do equipo/fórmula (sistema aberto); ou (5) <strong>Colite pseudomembranosa por <em>Clostridioides difficile</em></strong> secundária ao uso de antibióticos de amplo espectro. A conduta correta diante da diarreia sem instabilidade é <strong>manter a TNE</strong>, revisar a prescrição medicamentosa (suspender elixires com sorbitol), reduzir a velocidade de infusão em bomba contínua, adicionar <strong>fibras solúveis</strong> (goma guar parcialmente hidrolisada, pectina — que são fermentadas em butirato no cólon, estimulando a reabsorção de água e sódio pelos colonócitos), pesquisar toxina A/B de <em>C. difficile</em> nas fezes e, se houver síndrome disabsortiva grave refratária, trocar fórmula polimérica por fórmula oligomérica/semi-elementar (baseada em peptídeos e TCM).</li>
          <li><strong>Complicações Mecânicas:</strong> Obstrução do lúmen da sonda (causada por trituração inadequada de comprimidos ou precipitação de caseína com medicamentos ácidos; previne-se lavando a sonda com 20 a 30 mL de água filtrada antes e após cada medicação e desobstruindo com água morna sob pressão suave), deslocamento acidental, erosão/necrose de asa nasal e sinusite aguda. Na gastrostomia endoscópica percutânea (PEG), uma complicação específica é a <strong>Síndrome do Anteparo Sepultado (<em>Buried Bumper Syndrome</em>)</strong>, na qual a tração excessiva do fixador externo comprime a parede gástrica, fazendo com que o disco interno migre para dentro da submucosa gástrica ou parede abdominal, manifestando-se por dor local, impossibilidade de mobilizar/girar a sonda, extravasamento periestomal e resistência à infusão.</li>
        </ul>

        <h3>9.2 Complicações da Terapia Nutricional Parenteral (TNP)</h3>
        <p>As complicações da TNP dividem-se em três grandes grupos: relacionadas ao acesso venoso (mecânicas), infecciosas e metabólicas/hepatobiliares:</p>
        <ul>
          <li><strong>Complicações Mecânicas da Punção Central:</strong> Pneumotórax, hemotórax, punção arterial inadvertida, lesão do ducto torácico (quilotórax nas punções à esquerda), embolia gasosa, posicionamento anômalo da ponta do cateter e trombose venosa profunda relacionada ao cateter (subclávia/jugular).</li>
          <li><strong>Complicações Infecciosas (ICSRC):</strong> A Infecção da Corrente Sanguínea Relacionada ao Cateter é uma complicação grave da NPT, pois a bolsa parenteral (especialmente com lipídios e glicose) e o canhão (<em>hub</em>) do cateter favorecem a colonização por <em>Staphylococcus epidermidis</em> (coagulase-negativo), <em>Staphylococcus aureus</em>, bacilos Gram-negativos e fungos (particularmente <strong><em>Candida</em> spp.</strong> — a NPT é um dos principais fatores de risco independentes para candidemia hospitalar!). Para reduzir o risco, utiliza-se um lúmen exclusivo para a NPT, técnica estritamente asséptica com clorexidina alcoólica 2% na inserção e manutenção do curativo. Na vigência de candidemia, infecção por <em>S. aureus</em>, <em>Pseudomonas</em> ou choque séptico sem outro foco, a remoção do cateter central e o envio da ponta para cultura semiquantitativa (método de Maki &ge; 15 UFC) acompanhada de hemoculturas periféricas pareadas são mandatórios.</li>
          <li><strong>Complicações Metabólicas Agudas — Hiperglicemia e Hipoglicemia de Rebote:</strong> A hiperglicemia é a complicação metabólica mais frequente da NPT; deve-se manter a glicemia entre <strong>140 e 180 mg/dL</strong>, evitando tanto a hiperglicemia (&gt; 180 mg/dL, que causa diurese osmótica e disfunção neutrofílica) quanto a hipoglicemia (&lt; 70 mg/dL). Já a <strong>hipoglicemia de rebote</strong> ocorre quando uma infusão de NPT com alta concentração de glicose é interrompida abruptamente (ex.: perda do acesso ou obstrução do cateter), pois os níveis séricos de insulina endógena permanecem elevados por 30 a 60 minutos. Caso a NPT precise ser suspensa subitamente, deve-se instalar imediatamente infusão de <strong>soro glicosado a 10% (SG 10%)</strong> na mesma velocidade da NPT ou reduzir a velocidade da NPT gradualmente (desmame em 2 a 4 horas).</li>
          <li><strong>Complicações Hepatobiliares Crônicas (IFALD / PNALD):</strong> A Doença Hepática Associada à Nutrição Parenteral manifesta-se em três espectros: (1) <strong>Esteatose hepática</strong> (comum após 1 a 2 semanas em adultos, causada por excesso calórico/glicídico; eleva transaminases TGO/TGP); (2) <strong>Colestase intra-hepática</strong> (mais grave em neonatos e pacientes com síndrome do intestino curto, associada a fitosteróis das emulsões de óleo de soja, falta de estímulo enteral e episódios repetidos de translocação bacteriana/sepse; eleva fosfatase alcalina, GGT e bilirrubina direta); (3) <strong>Barro biliar (lama biliar) e Colecistite Aguda Alitiásica</strong>: como o paciente em NPT exclusiva sem estímulo oral/enteral não libera <strong>colecistoquinina (CCK)</strong> pelas células I do duodeno, a vesícula biliar permanece atônica e distendida, levando à estase biliar, formação de barro biliar em quase 100% dos pacientes após 4 a 6 semanas de NPT exclusiva e alto risco de colecistite alitiásica. A melhor prevenção é manter uma <strong>nutrição enteral mínima (trófica, 10 a 20 mL/h)</strong> sempre que possível para estimular a contração vesicular via CCK.</li>
        </ul>

        <table class="book-table">
          <thead>
            <tr>
              <th>Complicação da Terapia Nutricional</th>
              <th>Mecanismo Fisiopatológico Principal</th>
              <th>Conduta Preventiva e Terapêutica</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Diarreia durante TNE</strong></td>
              <td>Medicamentos com sorbitol, infusão rápida, disbiose por antibióticos ou colite por <em>C. difficile</em>.</td>
              <td>Não suspender TNE de imediato; retirar sorbitol, infundir em bomba contínua, adicionar fibra solúvel e pesquisar toxina de <em>C. difficile</em>.</td>
            </tr>
            <tr>
              <td><strong>Broncoaspiração na TNE</strong></td>
              <td>Refluxo gastroesofágico por gastroparesia, decúbito dorsal horizontal (0&deg;) ou sonda deslocada no esôfago.</td>
              <td>Cabeceira elevada a 30&deg;–45&deg;, radiografia pós-passagem, uso de procinéticos e migração da sonda para posição pós-pilórica.</td>
            </tr>
            <tr>
              <td><strong>Hipoglicemia de rebote na NPT</strong></td>
              <td>Interrupção abrupta da glicose hipertônica na presença de hiperinsulinemia endógena persistente.</td>
              <td>Desmame escalonado da velocidade da NPT ou instalação imediata de Soro Glicosado a 10% (SG 10%) em veia periférica.</td>
            </tr>
            <tr>
              <td><strong>Lama biliar e Colecistite Alitiásica na NPT</strong></td>
              <td>Ausência de nutrientes no duodeno abole a liberação de colecistoquinina (CCK), gerando estase vesicular.</td>
              <td>Associar dieta enteral trófica mínima (10–20 mL/h) assim que houver trânsito mínimo para estimular contração da vesícula.</td>
            </tr>
            <tr>
              <td><strong>Esteatose e Hipercapnia na NPT</strong></td>
              <td>Taxa de infusão de glicose &gt; 5 mg/kg/min causando lipogênese hepática e $QR &gt; 1,0$.</td>
              <td>Reduzir aporte total de calorias e limitar glicose a &le; 4 mg/kg/min, balanceando com emulsão lipídica mista (com ômega-3).</td>
            </tr>
          </tbody>
        </table>
      `
    },
    {
      id: 'sec-10-sindrome-de-realimentacao',
      title: '10. Síndrome de Realimentação (Refeeding Syndrome): Fisiopatologia, Eletrólitos, Tiamina e Protocolo de Manejo',
      body_html: `
        <h3>10.1 Fisiopatologia: Da Depleção Intracelular Oculta ao Pico Insulínico</h3>
        <p>A <strong>Síndrome de Realimentação (<em>Refeeding Syndrome</em>)</strong> é uma emergência metabólica aguda e potencialmente fatal que ocorre quando se reintroduz suporte nutricional (seja por via oral, enteral ou parenteral — sendo mais rápida e grave na via parenteral ou enteral agressiva) em pacientes previamente submetidos a jejum prolongado, inanição ou desnutrição energético-proteica grave. Para acertar todas as questões de prova sobre esse tema, é preciso dominar sua sequência fisiopatológica exata:</p>
        <ol>
          <li><strong>Fase de Jejum / Catabolismo Prolongado:</strong> Durante dias ou semanas de privação alimentar (anorexia, caquexia neoplásica, estenose esofágica/pilórica, etilismo crônico, pós-operatório em jejum sem reposição), os níveis de insulina permanecem muito baixos e predominam glucagon e cortisol. O organismo consome gordura e proteína muscular, e ocorre perda contínua e silenciosa dos <strong>íons predominantemente intracelulares: Fósforo ($PO_4^{3-}$), Potássio ($K^+$) e Magnésio ($Mg^{2+}$)</strong>, além de depleção dos estoques de vitaminas hidrossolúveis, especialmente a <strong>Vitamina B1 (Tiamina)</strong>. Crucialmente, <em>antes de iniciar a dieta, os níveis séricos (extracelulares) de fósforo, potássio e magnésio podem estar falsamente normais</em> devido à saída desses íons do meio intracelular atrofiado para o plasma!</li>
          <li><strong>Fase de Realimentação e o "Switch" Anabólico:</strong> Quando o paciente recebe subitamente uma carga de carboidratos (glicose), o pâncreas libera um <strong>pico maciço de insulina</strong>. A insulina muda abruptamente o metabolismo da oxidação lipídica para a glicólise e síntese de glicogênio/proteínas, promovendo o <strong>influxo rápido e maciço de glicose, Fósforo, Potássio e Magnésio do sangue para o interior das células</strong> (via ativação da bomba $Na^+/K^+$-ATPase e fosforilação intracelular da glicose em glicose-6-fosfato). Simultaneamente, a insulina exerce efeito antinatriurético nos túbulos renais, provocando <strong>retenção aguda de sódio e água</strong> no espaço extracelular.</li>
        </ol>

        <h3>10.2 A Tríade Eletrolítica Clássica e a Deficiência de Tiamina</h3>
        <p>O deslocamento transcelular desencadeia, tipicamente entre <strong>24 e 72 horas (1º ao 4º dia) após o início da terapia nutricional</strong>, as quatro alterações cardinais da Síndrome de Realimentação:</p>
        <ul>
          <li><strong>1. Hipofosfatemia (A Marca Registrada / <em>Hallmark</em> da Síndrome):</strong> O fósforo é consumido avidamente para formar ATP, creatina-fosfato e <strong>2,3-difosfoglicerato (2,3-DPG)</strong> eritrocitário. Quando o fósforo sérico cai abaixo de 2,5 mg/dL (e criticamente <strong>&lt; 1,0 a 1,5 mg/dL</strong> na hipofosfatemia grave), a depleção de ATP e de 2,3-DPG (que desloca a curva de dissociação da hemoglobina para a esquerda, impedindo a entrega de $O_2$ aos tecidos periféricos) provoca: <strong>insuficiência respiratória aguda por fraqueza diafragmática</strong> (incapacidade de desmame ventilatório), insuficiência cardíaca aguda por depressão contrátil miocárdica, arritmias ventriculares, rabdomiólise, hemólise aguda, disfunção leucocitária/plaquetária, parestesias, confusão mental, convulsões e coma.</li>
          <li><strong>2. Hipocalemia ($K^+ &lt; 3,5\text{ mEq/L}$):</strong> O influxo intracelular de potássio altera o potencial de repouso da membrana celular, causando fraqueza muscular generalizada, íleo paralítico acentuado, rabdomiólise e <strong>arritmias cardíacas malignas</strong> (achatamento de onda T, surgimento de onda U, extrassístoles, taquicardia ventricular, <em>torsades de pointes</em> e parada cardiorrespiratória).</li>
          <li><strong>3. Hipomagnesemia ($Mg^{2+} &lt; 1,7\text{ mg/dL}$):</strong> Como o magnésio é cofator obrigatório da bomba $Na^+/K^+$-ATPase e da secreção de paratormônio (PTH), sua queda causa tetania, tremores, hiper-reflexia, convulsões, arritmias atriais e ventriculares, e torna a <strong>hipocalemia e a hipocalcemia refratárias à reposição</strong> enquanto o magnésio não for corrigido.</li>
          <li><strong>4. Deficiência Aguda de Tiamina (Vitamina B1):</strong> A tiamina pirofosfato é cofator obrigatório das enzimas <strong>piruvato desidrogenase</strong> (que converte o piruvato da glicólise em acetil-CoA para entrar no ciclo de Krebs), alfa-cetoglutarato desidrogenase e transcetolase. Se infundirmos glicose em um paciente desnutrido sem antes administrar tiamina, o piruvato acumula-se e é desviado pela lactato desidrogenase, gerando <strong>acidose lática grave refratária (tipo B)</strong>, além de precipitar a <strong>Encefalopatia de Wernicke</strong> (tríade clássica: confusão mental/delirium, ataxia cerebelar e oftalmoplegia/nistagmo do VI par craniano) e o <strong>Beribéri úmido</strong> (insuficiência cardíaca de alto débito e edema).</li>
          <li><strong>5. Retenção Hidrossalina e Sobrecarga Volêmica:</strong> O efeito antinatriurético da insulina somado a um miocárdio depletado de ATP e atrofiado pela desnutrição precipita edema periférico, anasarca e edema agudo de pulmão cardiogênico.</li>
        </ul>

        <h3>10.3 Critérios de Risco (NICE / ASPEN) e Protocolo Passo a Passo de Prevenção e Tratamento</h3>
        <p>Segundo as diretrizes do NICE (<em>National Institute for Health and Care Excellence</em>) e da ASPEN, considera-se um paciente em <strong>Alto Risco de Síndrome de Realimentação</strong> se apresentar <strong>1 critério maior</strong> (IMC &lt; 16 kg/m²; perda de peso não intencional &gt; 15% em 3 a 6 meses; jejum ou ingestão mínima por &gt; 10 dias; ou níveis baixos de fósforo, potássio ou magnésio já antes de iniciar a dieta) OU <strong>2 critérios menores</strong> (IMC &lt; 18,5 kg/m²; perda de peso &gt; 10% em 3 a 6 meses; jejum/ingestão mínima por &gt; 5 dias; ou história de etilismo crônico, uso de insulina, quimioterapia, antiácidos ou diuréticos).</p>
        <p><strong>Protocolo Obrigatório de Prevenção e Manejo em Pacientes de Alto Risco:</strong></p>
        <ol>
          <li><strong>Passo 1 (Antes de ligar a dieta!):</strong> Dosar eletrólitos basais ($P$, $K$, $Mg$, $Ca$, $Na$, glicemia, função renal) e <strong>corrigir imediatamente os distúrbios eletrolíticos</strong> (repor fosfato de potássio ou fosfato de sódio, cloreto de potássio e sulfato de magnésio por via venosa).</li>
          <li><strong>Passo 2 (Tiamina ANTES da glicose!):</strong> Administrar <strong>Tiamina (Vitamina B1) 100 a 300 mg IV ou VO pelo menos 30 minutos antes de iniciar a dieta ou soro glicosado</strong>, mantendo 100 a 300 mg/dia pelos primeiros 3 a 10 dias, juntamente com complexo B e polivitamínico diário.</li>
          <li><strong>Passo 3 (Regra "Start Low, Go Slow" — Início Hipocalórico Cauteloso):</strong> Nunca iniciar a terapia nutricional com 100% da meta calórica! Iniciar com apenas <strong>5 a 10 kcal/kg/dia</strong> (em pacientes de extremo risco, com IMC &lt; 14 kg/m² ou jejum &gt; 15 dias) ou <strong>10 a 15 kcal/kg/dia</strong> (ou 25% a 50% da meta estimada), aumentando gradualmente em 3 a 5 dias apenas se os eletrólitos permanecerem estáveis, atingindo a meta plena somente entre o 4º e o 7º dia.</li>
          <li><strong>Passo 4 (Restrição de Sódio e Fluidos + Monitoramento Diário):</strong> Restringir aporte de sódio e volume hídrico nos primeiros dias para evitar congestão pulmonar e monitorar $P$, $K$, $Mg$ e glicemia a cada 12 a 24 horas durante os primeiros 4 dias. Se a síndrome se instalar durante a infusão, deve-se reduzir drasticamente a taxa calórica (ou pausar temporariamente por 12–24h nos casos graves refratários), repor agressivamente fósforo, potássio, magnésio e tiamina intravenosos e monitorar o ECG continuamente.</li>
        </ol>
      `
    },
    {
      id: 'sec-11-fistulas-digestivas-e-intestino-curto',
      title: '11. Suporte Nutricional nas Fístulas Digestivas Pós-Operatórias e Síndrome do Intestino Curto',
      body_html: `
        <h3>11.1 Fisiopatologia e Classificação das Fístulas Enterocutâneas Pós-Operatórias</h3>
        <p>As <strong>fístulas digestivas (enterocutâneas)</strong> são comunicações anômalas entre o lúmen do trato gastrointestinal e a pele (ou ferida operatória), sendo que <strong>75% a 85% delas decorrem de complicações cirúrgicas pós-operatórias</strong> (deiscência de anastomose, lesão térmica/iatrogênica inadvertida de alça durante lise de aderências ou inclusão de alça no fechamento da aponeurose), enquanto 15% a 25% são espontâneas (doença de Crohn, neoplasia maligna, enterite actínica, diverticulite). A mortalidade histórica das fístulas enterocutâneas atingia 40% a 60%, e hoje gira em torno de 5% a 20%, sendo determinada pela <strong>Tríade de Edmunds (1960): Sepse, Desequilíbrio Hidroeletrolítico e Desnutrição Proteico-Calórica</strong>.</p>
        <p>Quanto ao <strong>volume de débito em 24 horas</strong>, as fístulas digestivas classificam-se em:</p>
        <ul>
          <li><strong>Fístulas de Baixo Débito:</strong> Drenagem <strong>&lt; 200 mL/24 horas</strong>;</li>
          <li><strong>Fístulas de Médio (Moderado) Débito:</strong> Drenagem entre <strong>200 e 500 mL/24 horas</strong>;</li>
          <li><strong>Fístulas de Alto Débito:</strong> Drenagem <strong>&gt; 500 mL/24 horas</strong> (originadas quase sempre no duodeno, jejuno proximal ou íleo, ricas em água, sódio, potássio, bicarbonato, zinco, magnésio e enzimas proteolíticas pancreáticas/biliares que corroem a pele periestomal).</li>
        </ul>
        <p>Além da classificação funcional pelo débito, é indispensável recordar os fatores locais e sistêmicos que <strong>impedem o fechamento espontâneo da fístula</strong>, resumidos no clássico mnemônico <strong>FRIENDS</strong>: <strong>F</strong> (<em>Foreign body</em> — corpo estranho, tela sintética ou fio inabsorvível no trajeto), <strong>R</strong> (<em>Radiation</em> — enterite actínica por radioterapia prévia), <strong>I</strong> (<em>Inflammation / Infection</em> — doença de Crohn ativa ou abscesso intracavitário não drenado adjacente à fístula), <strong>E</strong> (<em>Epithelialization</em> — epitelização completa do trajeto fistuloso, comum em trajetos curtos &lt; 2 cm ou fístulas labiadas), <strong>N</strong> (<em>Neoplasm</em> — tumor maligno na origem ou no trajeto), <strong>D</strong> (<em>Distal obstruction</em> — obstrução mecânica distal à fístula, que força todo o conteúdo luminal a sair pelo orifício fistuloso) e <strong>S</strong> (<em>Sepsis / Steroids / Short tract</em> — sepse persistente, corticoterapia em altas doses, descontinuidade completa do coto intestinal ou defeito lateral &gt; 50% da circunferência da alça).</p>

        <h3>11.2 O Protocolo SOWATS e a Estratégia Nutricional conforme o Débito e a Topografia</h3>
        <p>O manejo moderno das fístulas digestivas segue a sequência cronológica <strong>SOWATS</strong> (<em>Sepsis control, Optimization of nutritional state, Wound care, Anatomy definition, Timing of surgery, Surgical strategy</em>):</p>
        <ul>
          <li><strong>Fase 1 — Estabilização Hidroeletrolítica e Controle da Sepse (Primeiras 24 a 72 horas):</strong> Nunca se inicia nutrição plena (especialmente NPT) nas primeiras horas enquanto o paciente está hipovolêmico, acidótico e séptico. A prioridade é repor volemia com cristaloides, corrigir acidose metabólica hiperclorêmica (nas fístulas duodenais/pancreáticas/jejunais por perda de bicarbonato) ou alcalose metabólica hipoclorêmica (nas fístulas gástricas), drenar abscessos intracavitários por punção percutânea guiada por TC, proteger a pele com bolsas coletoras/barreiras de pectina e reduzir a secreção digestiva (inibidores de bomba de prótons IV para reduzir o volume gástrico que chega ao delgado, loperamida e análogos da somatostatina — octreotide — em fístulas pancreáticas ou enterocutâneas selecionadas de altíssimo débito).</li>
          <li><strong>Fase 2A — Suporte Nutricional nas Fístulas de Baixo Débito (&lt; 200 mL/dia) ou Fístulas Distais (ileais terminais / colônicas):</strong> A via preferencial é a <strong>Terapia Nutricional Enteral (TNE) ou Oral</strong> com dieta de baixo resíduo ou fórmula polimérica/oligomérica. O intestino proximal à fístula absorve quase todos os nutrientes, preservando o trofismo mucoso e estimulando a síntese proteica para o fechamento espontâneo.</li>
          <li><strong>Fase 2B — Suporte Nutricional nas Fístulas de Alto Débito (&gt; 500 mL/dia) e Fístulas Proximais (duodenais/jejunais altas):</strong> A administração oral ou gástrica proximal à fístula aumenta drasticamente o débito fistuloso, espolia água e eletrólitos e impede a cicatrização. Nesses casos, a conduta padrão inicial é o repouso luminal proximal associado à <strong>Nutrição Parenteral Total (NPT)</strong> com meta hiperproteica (<strong>1,5 a 2,0 g de proteína/kg/dia</strong> e 25 a 30 kcal/kg/dia), acrescida de reposição generosa de <strong>vitamina C (500 a 1.000 mg/dia) e Zinco (15 a 30 mg/dia</strong>, pois cada litro de secreção entérica fistulosa perde cerca de 12 a 17 mg de zinco!).</li>
          <li><strong>Fase 2C — Exceções Inteligentes para Uso da Via Enteral em Fístulas Altas (Sonda Pós-Fístula e Fistuloclise):</strong> (a) Nas fístulas esofágicas, gástricas ou duodenais (como fístula do coto duodenal pós-Billroth II), é perfeitamente possível e recomendável passar uma <strong>sonda nasojejunal (ou confeccionar jejunostomia) posicionada pelo menos 20 a 30 cm distalmente ao orifício fistuloso</strong>, permitindo TNE plena sem passar pela fístula! (b) Nas fístulas jejunais nas quais existe pelo menos <strong>75 cm de intestino delgado íntegro e desobstruído distalmente à fístula</strong>, pode-se realizar a <strong>Fistuloclise</strong>: cateterização da alça eferente através do próprio orifício fistuloso para reinfundir o quimo drenado e administrar dieta enteral oligomérica diretamente no intestino distal, permitindo suspender a NPT e recuperar o trofismo intestinal antes da cirurgia reconstrutiva definitiva (que só deve ser realizada após 6 a 12 semanas se não houver fechamento espontâneo com suporte nutricional).</li>
        </ul>

        <h3>11.3 Síndrome do Intestino Curto (SIC) e Falência Intestinal Pós-Ressecção</h3>
        <p>A <strong>Síndrome do Intestino Curto (SIC)</strong> ocorre em adultos quando o comprimento residual de intestino delgado pós-enterectomia maciça (por isquemia mesentérica aguda, volvo de intestino médio, doença de Crohn multifocal ou trauma vascular mesentérico) é <strong>inferior a 200 cm</strong>. Define-se <strong>Falência Intestinal</strong> quando a massa enterocitária funcionante é insuficiente para manter a autonomia nutricional e hidroeletrolítica, tornando o paciente dependente de Nutrição Parenteral e/ou hidratação venosa. A anatomia do remanescente determina a gravidade e a capacidade de adaptação intestinal (que leva de 1 a 2 anos por hiperplasia vilositária mediada por GLP-2):</p>
        <ul>
          <li><strong>Tipo I (Jejunostomia terminal sem cólon em continuidade):</strong> É a forma mais grave de espoliação hidroeletrolítica (paciente "secretor"). Quando restam <strong>&lt; 100 a 115 cm de jejuno sem cólon</strong>, o paciente geralmente depende de NPT domiciliar definitiva se não houver reabilitação farmacológica.</li>
          <li><strong>Tipo II (Anastomose jejunocólica — sem íleo terminal e sem válvula ileocecal, mas com cólon preservado):</strong> A presença do cólon é extremamente valiosa porque reabsorve água/sódio e fermenta carboidratos mal-absorvidos em ácidos graxos de cadeia curta (capazes de fornecer até 1.000 kcal/dia adicionais!). Aqui, a dependência crônica de NPT ocorre quando restam <strong>&lt; 60 a 65 cm de jejuno</strong>.</li>
          <li><strong>Tipo III (Anastomose jejunoileocólica — com parte do íleo, válvula ileocecal e cólon preservados):</strong> É a forma de melhor prognóstico, pois o <strong>íleo tem enorme capacidade de adaptação estrutural</strong> (ao contrário do jejuno), absorve especificamente <strong>vitamina B12 (no íleo terminal) e sais biliares</strong>, e possui o "freio ileal" (secreção de peptídeo YY e GLP-1/GLP-2 que lentificam o esvaziamento gástrico) além da barreira mecânica da válvula ileocecal. Dependência de NPT só costuma ocorrer se restarem <strong>&lt; 35 cm de intestino delgado</strong>.</li>
        </ul>
        <p><strong>Manejo Nutricional Específico na SIC (Detalhe Clássico de Prova):</strong> Na fase aguda hipersecretora (primeiras semanas), o paciente necessita de NPT, reposição agressiva de água, sódio, potássio, magnésio e bloqueio ácido gástrico com IBP venoso (pois a perda de enterormônios inibitórios causa hipergastrinemia e hipersecreção ácida gástrica nos primeiros 6 meses!). Na fase de adaptação, se o paciente <strong>TEM cólon em continuidade (Tipos II e III)</strong>, prescreve-se dieta rica em carboidratos complexos e <strong>hipolipídica com restrição de oxalato e suplementação oral de cálcio</strong>. Por quê? Na perda do íleo terminal, os sais biliares não são reabsorvidos (causando esteatorreia); os ácidos graxos livres não absorvidos quelam o cálcio intraluminal (saponificação), deixando o oxalato alimentar livre para ser absorvido passivamente no cólon, o que causa <strong>hiperoxalúria entérica e nefrolitíase por oxalato de cálcio</strong>! Já nos pacientes <strong>SEM cólon (Tipo I)</strong>, não há risco de hiperoxalúria entérica, permitindo dieta com maior teor lipídico. Em pacientes selecionados com SIC dependentes de NPT, o análogo recombinante do GLP-2 (<strong>teduglutida</strong>) promove hipertrofia das vilosidades intestinais e reduz a necessidade de suporte parenteral.</p>

        <table class="book-table">
          <thead>
            <tr>
              <th>Cenário Clínico-Cirúrgico</th>
              <th>Característica Anatômica / Funcional</th>
              <th>Conduta Nutricional de Escolha</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Fístula Enterocutânea de Baixo Débito (&lt; 200 mL/dia)</strong></td>
              <td>Geralmente ileal ou colônica; menor perda hidroeletrolítica e boa capacidade absortiva proximal.</td>
              <td>Dieta oral de baixo resíduo ou TNE polimérica/oligomérica; taxa de fechamento espontâneo &gt; 70% em 4 a 6 semanas se ausentes fatores FRIENDS.</td>
            </tr>
            <tr>
              <td><strong>Fístula Enterocutânea de Alto Débito (&gt; 500 mL/dia)</strong></td>
              <td>Geralmente duodenal ou jejunal alta; perda maciça de fluido rico em $HCO_3^-$, $Na^+$, $K^+$, $Mg^{2+}$ e Zinco.</td>
              <td>Controle da sepse + NPT hiperproteica (1,5–2,0 g/kg/dia) + Zinco e Vitamina C; considerar TNE pós-fístula ou fistuloclise se houver &ge; 75 cm de delgado distal.</td>
            </tr>
            <tr>
              <td><strong>Síndrome do Intestino Curto COM Cólon (Tipos II e III)</strong></td>
              <td>Perda ileal gera esteatorreia; ácidos graxos livres quelam cálcio no lúmen, aumentando absorção colônica de oxalato.</td>
              <td>Dieta fracionada hipercalórica, rica em carboidratos complexos, <strong>hipolipídica, pobre em oxalato e suplementada com cálcio oral e vitamina B12 parenteral</strong>.</td>
            </tr>
            <tr>
              <td><strong>Síndrome do Intestino Curto SEM Cólon (Tipo I — Jejunostomia)</strong></td>
              <td>Grande perda secretora de sódio e água pelo estoma; ausência de fermentação colônica e sem risco de hiperoxalúria entérica.</td>
              <td>Soluções de reidratação oral isotônicas glicofisiológicas (com &ge; 90 mEq/L de $Na^+$ — evitar água pura hipotônica, que aumenta o débito!), antissecretores, antidiarreicos e NPT se &lt; 100–115 cm.</td>
            </tr>
          </tbody>
        </table>
      `
    },
    {
      id: 'sec-12-situacoes-especiais-cirurgicas',
      title: '12. Situações Especiais em Cirurgia: Pancreatite Aguda, Queimados, Cirurgia Bariátrica e Idoso Sarcopênico',
      body_html: `
        <h3>12.1 Nutrição na Pancreatite Aguda Leve vs Grave</h3>
        <p>O manejo nutricional da pancreatite aguda biliar ou alcoólica sofreu uma revolução completa nas últimas duas décadas e é presença obrigatória nos exames de Cirurgia Geral:</p>
        <ul>
          <li><strong>Pancreatite Aguda Leve (80% dos casos):</strong> Não há falência orgânica nem complicações locais. A dieta oral (já iniciada com dieta branda/hipolipídica, sem necessidade de progressão lenta a partir de líquidos claros) deve ser reintroduzida <strong>precocemente (nas primeiras 24 a 48 horas)</strong>, assim que houver controle da dor abdominal e das náuseas/vômitos, independentemente da normalização completa da amilase ou da lipase sérica!</li>
          <li><strong>Pancreatite Aguda Moderadamente Grave e Grave (Necrosante):</strong> Antigos livros preconizavam "deixar o pâncreas em repouso absoluto em jejum com NPT". Estudos randomizados provaram que a NPT na pancreatite grave causa atrofia da mucosa intestinal, aumenta a translocação bacteriana do cólon/delgado para a necrose pancreática (transformando necrose estéril em <strong>necrose pancreática infectada</strong>) e eleva a mortalidade! Portanto, a conduta padrão-ouro na pancreatite aguda grave é a <strong>Terapia Nutricional Enteral (TNE) precoce (nas primeiras 24 a 72 horas da admissão)</strong>.</li>
          <li><strong>Via Gástrica vs Nasojejunal na Pancreatite Grave:</strong> Ensaios clínicos (como o estudo PYTHON e metanálises da Cochrane) demonstraram que a <strong>infusão enteral por sonda nasogástrica é tão segura e eficaz quanto a sonda nasojejunal</strong> na maioria dos pacientes com pancreatite aguda grave, sendo tecnicamente mais simples e rápida de iniciar. A sonda nasojejunal pós-pilórica (guiada por endoscopia) fica reservada para os casos que apresentam intolerância à via gástrica (vômitos ou estase persistente por compressão extrínseca do estômago/duodeno por coleções necróticas agudas). A Nutrição Parenteral na pancreatite grave só é indicada quando a via enteral for totalmente impossível ou não tolerada (ex.: síndrome compartimental abdominal grave, íleo paralítico refratário ou isquemia mesentérica).</li>
        </ul>

        <h3>12.2 Nutrição no Grande Queimado</h3>
        <p>A queimadura térmica extensa (&ge; 20% da superfície corporal queimada — SCQ em adultos) desencadeia a resposta hipermetabólica e hipercatabólica mais intensa conhecida na medicina, com elevação das catecolaminas urinárias em até 10 a 20 vezes o valor basal e aumento do gasto energético de repouso em até 180% a 200%. Nesse cenário:</p>
        <ul>
          <li><strong>Início Ultraprecoce da TNE:</strong> Deve ser iniciada nas primeiras <strong>4 a 12 horas (no máximo 24 horas) após a queimadura</strong>, assim que a ressuscitação hemodinâmica inicial estiver em andamento, pois atenua a resposta hipercatabólica, preserva a perfusão esplâncnica e reduz úlceras de Curling e translocação bacteriana.</li>
          <li><strong>Metas Hiperproteicas e Modulação Farmacológica:</strong> A necessidade proteica atinge <strong>1,5 a 2,5 g/kg/dia em adultos</strong> (e até 2,5 a 3,0 g/kg/dia em crianças queimadas), com suplementação obrigatória de glutamina enteral (0,3 a 0,5 g/kg/dia), vitamina C, vitamina A, vitamina D, zinco, cobre e selênio. Associa-se ainda modulação não nutricional do hipercatabolismo: manutenção da temperatura ambiente aquecida (28&deg;C a 32&deg;C), excisão precoce da escara necrótica com enxertia, betabloqueio não seletivo com <strong>propranolol</strong> (para bloquear a lipólise e proteólise beta-adrenérgica) e, na fase de recuperação, agonistas anabólicos como a oxandrolona.</li>
        </ul>

        <h3>12.3 Deficiências Nutricionais Pós-Cirurgia Bariátrica (Gastrectomia Vertical vs Bypass Gástrico em Y-de-Roux)</h3>
        <p>Com o crescimento exponencial das cirurgias bariátricas e metabólicas, o cirurgião geral é frequentemente chamado na emergência ou no ambulatório para diagnosticar complicações nutricionais pós-operatórias:</p>
        <ul>
          <li><strong>Encefalopatia de Wernicke Pós-Bariátrica (Deficiência de Tiamina — B1):</strong> Ocorre tipicamente entre <strong>3 e 12 semanas após a cirurgia</strong> (tanto no <em>Sleeve</em>/Gastrectomia Vertical quanto no <em>Bypass</em> Gástrico em Y-de-Roux) em pacientes que desenvolvem <strong>vômitos incoercíveis</strong> (por estenose da anastomose gastrojejunal, torção/estenose da incisura angular no <em>sleeve</em> ou intolerância alimentar). O paciente chega ao pronto-socorro com diplopia/nistagmo, ataxia de marcha, confusão mental ou polineuropatia periférica aguda ("beribéri bariátrico"). A conduta imediata de emergência é administrar <strong>Tiamina 500 mg IV 3x/dia por 3 a 5 dias</strong> seguida de 250 mg IV/IM/dia antes de qualquer infusão de glicose, além de investigar endoscopicamente a causa mecânica dos vômitos.</li>
          <li><strong>Deficiência de Ferro (Anemia Microcítica e Hipocrômica):</strong> Extremamente prevalente no <em>Bypass</em> Gástrico em Y-de-Roux (especialmente em mulheres em idade fértil), pois a exclusão do antro gástrico reduz o ácido clorídrico necessário para converter o ferro férrico ($Fe^{3+}$) em ferroso ($Fe^{2+}$), e a derivação gastrojejunal exclui o duodeno e o jejuno proximal (sítios primários do transportador divalente de metais DMT-1).</li>
          <li><strong>Deficiência de Vitamina B12 (Cobalamina) e Ácido Fólico:</strong> Causa anemia megaloblástica hipersegmentada e degeneração combinada subaguda da medula espinhal (parestesias e perda da propriocepção/sensibilidade vibratória nos cordões posteriores). A clivagem da vitamina B12 das proteínas alimentares depende da pepsina e do HCl gástrico, a ligação ao Fator Intrínseco (produzido pelas células parietais) ocorre no duodeno após ação das proteases pancreáticas sobre a proteína R, e a absorção ocorre no íleo terminal; por isso, pacientes submetidos a BGYR ou gastrectomia total requerem suplementação de vitamina B12 por via intramuscular, sublingual ou oral em altas doses (que utiliza difusão passiva de 1%).</li>
          <li><strong>Deficiência de Cálcio, Vitamina D e Cobre:</strong> A exclusão duodenal prejudica a absorção ativa de cálcio, levando a <strong>hiperparatireoidismo secundário</strong> (PTH elevado com cálcio sérico normal à custa de reabsorção óssea e osteopenia/osteoporose); deve-se suplementar obrigatoriamente <strong>citrato de cálcio</strong> (que independe de acidez gástrica, ao contrário do carbonato de cálcio) associado à colecalciferol (vitamina D3). Já a deficiência de <strong>cobre</strong> pós-BGYR é um diagnóstico diferencial clássico da deficiência de B12, pois provoca anemia sideroblástica refratária ao ferro, neutropenia e mieloneuropatia atáxica idêntica à degeneração combinada subaguda!</li>
        </ul>

        <h3>12.4 Pré-Habilitação Multimodal no Idoso Sarcopênico e Fragilidade Cirúrgica</h3>
        <p>No paciente idoso (&ge; 65 a 70 anos) candidato a cirurgia abdominal ou torácica de grande porte, a presença de <strong>sarcopenia</strong> (definida pelo consenso europeu EWGSOP2 pela tríade: 1. Baixa força muscular medida por dinamometria de preensão palmar [&lt; 27 kg em homens e &lt; 16 kg em mulheres]; 2. Baixa quantidade/qualidade muscular confirmada por TC em L3 ou DEXA; e 3. Baixo desempenho físico na velocidade de marcha &le; 0,8 m/s) multiplica por três a taxa de complicações maiores, <em>delirium</em> pós-operatório, perda de independência funcional e mortalidade em 90 dias. Nesses pacientes, a resistência anabólica do músculo senil exige um protocolo de <strong>Pré-Habilitação Trimodal</strong> durante 2 a 4 semanas antes da cirurgia eletiva: (1) <strong>Suporte nutricional hiperproteico</strong> (1,2 a 1,5 g/kg/dia, fracionado em refeições contendo 25 a 30 g de proteína de alto valor biológico rica em <strong>leucina</strong> [2,5 a 3,0 g de leucina por tomada], aminoácido essencial de cadeia ramificada que ativa diretamente o complexo intracelular <strong>mTORC1</strong> para disparar a síntese proteica miofibrilar); (2) <strong>Treinamento físico resistido e aeróbico supervisionado</strong> + fisioterapia muscular inspiratória; e (3) <strong>Otimização psicológica e clínica</strong> (correção de anemia ferropênica com carboximaltose férrica IV e cessação de tabagismo/etilismo).</p>
      `
    },
    {
      id: 'sec-13-casos-clinicos',
      title: '13. Casos Clínicos Comentados de Alta Complexidade Cirúrgica',
      body_html: `
        <h3>Caso Clínico 1 — Preparo Nutricional Pré-Operatório no Câncer Gástrico Semiobstrutivo</h3>
        <p><strong>Apresentação Clínica:</strong> Homem de 68 anos é encaminhado ao ambulatório de Cirurgia do Aparelho Digestivo com diagnóstico endoscópico e histopatológico de adenocarcinoma gástrico Borrmann III de antro, estadiamento tomográfico cT3N1M0, sem metástases peritoneais ou hepáticas. Relata plenitude pós-prandial precoce, náuseas ocasionais e redução da ingestão alimentar para menos de 40% do habitual nas últimas 6 semanas. Seu peso habitual há 5 meses era de 72 kg; hoje pesa 58 kg (altura: 1,70 m). Ao exame físico, apresenta atrofia importante da musculatura temporal e do quadríceps, perda de coxim adiposo subcutâneo e leve edema maleolar bilateral. Exames laboratoriais: hemoglobina 10,2 g/dL, albumina sérica 2,6 g/dL, pré-albumina 9 mg/dL, PCR 18 mg/L, potássio 3,6 mEq/L, fósforo 2,7 mg/dL. A endoscopia digestiva alta mostra lesão ulcerada vegetante em antro distal, mas o aparelho pediátrico consegue transpor o piloro até a segunda porção duodenal.</p>
        <p><strong>Discussão e Conduta Cirúrgica:</strong> O paciente apresenta perda ponderal de 13,99 kg em 5 meses (<strong>19,4% do peso habitual</strong>), $IMC = 58 / 1,70^2 = 20,0\text{ kg/m}^2$, Avaliação Subjetiva Global categoria <strong>ASG C</strong>, escore <strong>NRS-2002 = 5 pontos</strong> (3 pontos pelo estado nutricional + 2 pontos pela cirurgia abdominal de grande porte planejada) e <strong>albumina sérica de 2,6 g/dL (&lt; 3,0 g/dL)</strong>. Portanto, preenche múltiplos critérios da ESPEN/BRASPEN para <strong>Risco Nutricional Grave</strong>. Operar esse paciente amanhã para realizar uma gastrectomia subtotal com reconstrução em Y-de-Roux acarretaria risco proibitivo de deiscência do coto duodenal e da anastomose gastrojejunal. A conduta correta é <strong>postergar a cirurgia eletiva por 10 a 14 dias</strong> para terapia nutricional pré-operatória. Como o endoscópio transpõe a lesão até o duodeno e o intestino delgado está íntegro, a via de escolha é a <strong>Terapia Nutricional Enteral (TNE) por sonda nasojejunal pós-pilórica</strong> passada endoscopicamente (ultrapassando o tumor antral), utilizando <strong>fórmula imunomoduladora (rica em arginina, ômega-3 e nucleotídeos)</strong>. Devido à perda ponderal acentuada e baixa ingesta prévia, deve-se administrar tiamina profilática (200 mg/dia) antes do início da dieta e progredir o aporte calórico gradualmente nos primeiros 3 dias até atingir 25 a 30 kcal/kg/dia e 1,5 g de proteína/kg/dia.</p>

        <h3>Caso Clínico 2 — Síndrome de Realimentação Aguda em Paciente com Megaesôfago Chagásico Grau IV</h3>
        <p><strong>Apresentação Clínica:</strong> Mulher de 62 anos, natural do interior de Minas Gerais, portadora de megaesôfago chagásico grau IV (dolicomegaesôfago), é internada com disfagia para líquidos há 15 dias e perda de 22% do peso corporal nos últimos 4 meses ($IMC = 15,8\text{ kg/m}^2$). Como houve falha na passagem endoscópica de sonda nasoenteral devido à tortuosidade extrema do esôfago distal, a equipe de plantão puncionou a veia subclávia direita e prescreveu Nutrição Parenteral Total (NPT) iniciando já no primeiro dia com 32 kcal/kg/dia (rica em glicose hipertônica a 50%), sem prescrição prévia de vitaminas específicas. No terceiro dia de NPT, a paciente evolui com confusão mental aguda, diplopia com paralisia do músculo reto lateral bilateral (VI par), ataxia apendicular, dispneia progressiva com uso de musculatura acessória, estertores crepitantes nas bases pulmonares e extrassístoles ventriculares frequentes no monitor cardíaco.</p>
        <p><strong>Discussão e Conduta Cirúrgica:</strong> Trata-se do quadro clássico e dramático de <strong>Síndrome de Realimentação associada a Encefalopatia de Wernicke aguda</strong>, precipitada pelo erro iatrogênico de iniciar NPT hipercalórica plena em paciente com inanição grave ($IMC &lt; 16\text{ kg/m}^2$, perda &gt; 15% e jejum &gt; 10 dias) sem administração prévia de tiamina e sem escalonamento calórico lento. O pico insulínico induzido pela carga de dextrose promoveu influxo maciço de fósforo, potássio e magnésio para o intracelular e consumiu a reserva residual de tiamina (vitamina B1). A dispneia e a arritmia decorrem de <strong>hipofosfatemia grave (&lt; 1,0–1,5 mg/dL), hipocalemia, hipomagnesemia e retenção hidrossalina aguda</strong>; a confusão mental, oftalmoplegia e ataxia caracterizam a Encefalopatia de Wernicke. <strong>Conduta imediata:</strong> (1) Reduzir drasticamente a taxa de infusão da NPT (para 5 a 10 kcal/kg/dia ou pausar temporariamente mantendo infusão basal controlada para evitar hipoglicemia de rebote); (2) Administrar imediatamente <strong>Tiamina 500 mg IV diluída infundida em 30 minutos, 3 vezes ao dia</strong>; (3) Repor por via intravenosa <strong>fosfato de potássio</strong> (ou fosfato de sódio + KCl) e <strong>sulfato de magnésio</strong> sob monitorização eletrocardiográfica contínua e checagem laboratorial a cada 6 a 12 horas até estabilização.</p>

        <h3>Caso Clínico 3 — Abreviação do Jejum e Realimentação Precoce na Retossigmoidectomia Oncológica (ACERTO/ERAS)</h3>
        <p><strong>Apresentação Clínica:</strong> Homem de 59 anos, hipertenso controlado com losartana, eutrófico ($IMC = 24,5\text{ kg/m}^2$, perda de peso de 2% em 6 meses, albumina 4,1 g/dL, NRS-2002 = 2 pontos), será submetido a retossigmoidectomia videolaparoscópica eletiva com anastomose colorretal primária grampeada por adenocarcinoma de cólon sigmoide às 10h da manhã. O médico residente do 1º ano sugere prescrever jejum absoluto a partir das 22h da véspera, manter sonda nasogástrica aberta no pós-operatório, hidratar com 3.500 mL de soro fisiológico 0,9% por dia e liberar dieta líquida apenas no 4º dia de pós-operatório após eliminação de flatos.</p>
        <p><strong>Discussão e Conduta Cirúrgica:</strong> A proposta do residente contraria frontalmente todas as evidências dos protocolos <strong>ACERTO e ERAS</strong>. Como o paciente não possui obstrução intestinal, gastroparesia ou DRGE grave, a prescrição perioperatória correta consiste em: (1) <strong>Jejum de sólidos de 6 a 8 horas</strong>, porém com <strong>abreviação do jejum para líquidos claros contendo maltodextrina a 12,5% (200 a 400 mL) administrados às 08h da manhã (2 horas antes da indução anestésica)</strong>, reduzindo a resistência insulínica e o catabolismo; (2) Retirada da sonda nasogástrica ainda na sala cirúrgica antes da extubação; (3) Restrição hídrica venosa intra e pós-operatória com solução balanceada (Ringer lactato), evitando sobrecarga de sódio e edema da anastomose colorretal; (4) Analgesia multimodal poupadora de opioides e deambulação precoce; (5) <strong>Realimentação oral precoce nas primeiras 6 a 24 horas de pós-operatório</strong> (iniciando dieta líquida/pastosa já na tarde/noite do mesmo dia ou na manhã do 1º PO), sem aguardar retorno de RHA ou eliminação de flatos, com suspensão precoce da hidratação venosa.</p>

        <h3>Caso Clínico 4 — Manejo de Fístula Enterocutânea Pós-Operatória de Alto Débito</h3>
        <p><strong>Apresentação Clínica:</strong> Paciente de 54 anos, submetido há 7 dias a laparotomia exploradora com lise extensa de bridas e enterectomia segmentar de jejuno proximal por obstrução intestinal, evolui com febre ($38,6^\circ\text{C}$), taquicardia (112 bpm), leucocitose ($17.800/\text{mm}^3$) e saída de <strong>850 mL/24h de secreção biliosa-entérica</strong> pela ferida operatória mediana, causando intensa dermatite química perilesional. Gasometria arterial mostra acidose metabólica hiperclorêmica ($pH = 7,28$, $HCO_3^- = 15\text{ mEq/L}$), sódio 131 mEq/L, potássio 3,1 mEq/L e albumina 2,3 g/dL.</p>
        <p><strong>Discussão e Conduta Cirúrgica:</strong> Trata-se de uma <strong>fístula enterocutânea pós-operatória de alto débito (&gt; 500 mL/24h)</strong> originada no jejuno proximal. Reoperar imediatamente esse paciente no 7º dia de pós-operatório (auge da reação inflamatória peritoneal obliterante ou "peritônio congelado" — que ocorre entre o 10º dia e a 6ª semana) sem peritonite livre difusa é um erro grave, com altíssima taxa de novas enterotomias, síndrome do intestino curto e óbito. Seguindo o protocolo <strong>SOWATS</strong>: (1) <strong>Primeiro passo imediato:</strong> Ressuscitação volêmica com cristaloide balanceado e reposição de bicarbonato/potássio, controle da sepse (solicitar TC de abdome e pelve para identificar e realizar <strong>drenagem percutânea guiada por imagem</strong> de coleções/abscessos intra-abdominais mais antibioticoterapia de amplo espectro) e proteção da pele com bolsa coletora/aspiração contínua; (2) <strong>Segundo passo (Nutrição):</strong> Como é uma fístula jejunal alta de alto débito (850 mL/dia), a dieta oral aumentaria o débito e a espoliação; institui-se jejum oral, inibidor de bomba de prótons IV e <strong>Nutrição Parenteral Total (NPT)</strong> por acesso venoso central (subclávia ou PICC) com 25 a 30 kcal/kg/dia, <strong>1,5 a 2,0 g de proteína/kg/dia</strong> e suplementação reforçada de <strong>zinco (15 a 30 mg/dia) e vitamina C</strong>. Caso o estudo contrastado posterior (fistulografia após 7–14 dias de estabilidade) demonstre alça distal pérvia com &ge; 75 cm de intestino delgado sem obstrução distal, pode-se transicionar da NPT para <strong>fistuloclise</strong>. A cirurgia reconstrutiva definitiva só será indicada caso a fístula não feche espontaneamente após 6 a 12 semanas de suporte nutricional ótimo e resolução completa da sepse.</p>

        <h3>Caso Clínico 5 — Suporte Nutricional na Pancreatite Aguda Grave Necrosante</h3>
        <p><strong>Apresentação Clínica:</strong> Homem de 46 anos está internado na UTI no 2º dia de evolução de pancreatite aguda biliar grave (escore APACHE II = 14, PCR = 280 mg/L, creatinina = 2,1 mg/dL revertida após ressuscitação volêmica inicial com Ringer lactato, pressão arterial média de 75 mmHg sem vasopressores). Apresenta abdome distendido, doloroso em andar superior, com ruídos hidroaéreos diminuídos, mas sem sinais de síndrome compartimental abdominal (pressão intra-abdominal aferida por via vesical = 11 mmHg). A equipe discute quando e por qual via iniciar a terapia nutricional.</p>
        <p><strong>Discussão e Conduta Cirúrgica:</strong> Na pancreatite aguda grave, o início precoce da <strong>Terapia Nutricional Enteral (TNE) dentro de 24 a 72 horas</strong> após a estabilização hemodinâmica é uma intervenção modificadora de mortalidade, pois preserva a integridade das <em>tight junctions</em> intestinais e reduz significativamente a translocação bacteriana e a infecção da necrose pancreática. A <strong>Nutrição Parenteral Total NÃO deve ser usada como primeira escolha</strong>. A TNE pode ser iniciada com segurança através de <strong>sonda em posição gástrica (nasogástrica)</strong> ou pós-pilórica (nasojejunal) em bomba de infusão contínua. Caso o paciente desenvolva vômitos ou alto resíduo gástrico por compressão duodenal pelo processo inflamatório pancreático, migra-se a sonda por via endoscópica para a terceira/quarta porção duodenal ou jejuno proximal (após o ângulo de Treitz).</p>

        <h3>Caso Clínico 6 — Diarreia Aguda durante Nutrição Enteral no Pós-Operatório de Esofagectomia</h3>
        <p><strong>Apresentação Clínica:</strong> Paciente de 64 anos, no 6º dia de pós-operatório de esofagectomia subtotal com reconstrução por tubo gástrico retroesternal devido a carcinoma espinocelular de esôfago médio, recebe dieta enteral polimérica via jejunostomia alimentar à Witzel a 65 mL/h em bomba de infusão. Nas últimas 24 horas, apresentou 5 episódios de evacuações líquidas, sem sangue ou muco, afebril, hemodinamicamente estável, com abdome flácido e indolor. Ao revisar a prescrição médica, observa-se administração via jejunostomia de bromoprida gotas, cloreto de potássio xarope (6%) de 8/8h e dipirona solução oral.</p>
        <p><strong>Discussão e Conduta Cirúrgica:</strong> Suspender a dieta enteral da jejunostomia e iniciar NPT seria uma conduta inadequada e iatrogênica. A principal causa de diarreia osmótica em pacientes sob TNE que recebem múltiplos medicamentos líquidos pela sonda é a presença de <strong>sorbitol e alta osmolaridade nos veículos farmacêuticos (especialmente xarope de KCl, elixires e soluções orais)</strong>, que ao serem injetados diretamente no jejuno (que não tem capacidade de diluição gástrica) atraem grande volume de água para o lúmen intestinal. A conduta correta é: (1) <strong>Manter a TNE em bomba de infusão contínua</strong> (reduzindo temporariamente a velocidade se necessário); (2) Substituir os xaropes hiperosmolares com sorbitol por formulações adequadas ou reposição eletrolítica venosa; (3) Adicionar <strong>fibra solúvel</strong> à dieta enteral para estimular a produção colônica de ácidos graxos de cadeia curta (butirato) e a reabsorção hidrossalina; e (4) Solicitar pesquisa de toxina A e B para <em>Clostridioides difficile</em> nas fezes caso o paciente tenha recebido antibioticoterapia prolongada ou apresente febre/leucocitose.</p>
      `
    },
    {
      id: 'sec-14-questoes-residencia',
      title: '14. Questões Originais no Estilo Residência Médica / ENAMED com Gabarito Comentado',
      body_html: `
        <h3>Questão 1 — Indicação de Terapia Nutricional Pré-Operatória (ESPEN / BRASPEN)</h3>
        <p><strong>Enunciado:</strong> Paciente masculino, 66 anos, portador de adenocarcinoma de cárdia Siewert II (cT3N1M0), comparece à consulta pré-operatória para programação de gastrectomia total com esofagectomia distal. Relata disfagia progressiva para sólidos há 3 meses, tendo passado de 80 kg para 66 kg nesse período ($IMC\text{ atual} = 21,5\text{ kg/m}^2$). Ao exame físico, apresenta perda moderada a acentuada de massa muscular bitemporal e em quadríceps, sendo classificado como ASG C. Exames laboratoriais mostram hemoglobina de 10,8 g/dL e albumina sérica de 2,8 g/dL. Endoscopia digestiva alta permite a passagem de aparelho fino até o duodeno. De acordo com as diretrizes atuais da ESPEN e da BRASPEN/ACERTO, qual é a conduta perioperatória mais adequada?</p>
        <ul>
          <li>A) Realizar a cirurgia imediatamente na próxima vaga cirúrgica, pois trata-se de neoplasia maligna e o IMC do paciente ainda se encontra acima de 18,5 kg/m², iniciando Nutrição Parenteral Total no 1º dia de pós-operatório.</li>
          <li>B) Adiar a cirurgia eletiva por 7 a 14 dias e instituir Terapia Nutricional Enteral (preferencialmente com fórmula imunomoduladora) por sonda nasoenteral pós-pilórica antes do procedimento operatório.</li>
          <li>C) Internar o paciente para administração exclusiva de albumina humana a 20% por via intravenosa durante 5 dias até atingir albumina sérica &ge; 3,5 g/dL e operar em seguida.</li>
          <li>D) Adiar a cirurgia por 30 dias e iniciar Nutrição Parenteral Total exclusiva por cateter venoso central em veia subclávia, mantendo o trato digestivo em repouso absoluto.</li>
          <li>E) Manter dieta oral livre sem suplementos e prescrever jejum absoluto de 12 horas antes da anestesia para evitar broncoaspiração devido à lesão da cárdia.</li>
        </ul>
        <p><strong>Gabarito: Alternativa B.</strong></p>
        <ul>
          <li><strong>Comentário da A (Incorreta):</strong> Embora o IMC seja 21,5 kg/m², os quatro critérios de risco nutricional grave da ESPEN são independentes (basta UM deles para indicar terapia pré-operatória). O paciente possui 3 dos 4 critérios: perda ponderal de 17,5% em 3 meses (&gt; 10–15% em 6 meses), ASG C e albumina de 2,8 g/dL (&lt; 3,0 g/dL). Operar sem preparo nutricional prévio eleva drasticamente o risco de fístula esofagojejunal.</li>
          <li><strong>Comentário da B (Correta):</strong> Na presença de risco nutricional grave em candidato a cirurgia oncológica digestiva de grande porte, deve-se postergar a operação eletiva por 7 a 14 dias para terapia nutricional pré-operatória. Como o trato digestivo distal à cárdia está funcionante e pérvio à endoscopia, a via de escolha é a enteral (sonda nasoenteral pós-pilórica), associando-se imunonutrição (arginina, ômega-3 e nucleotídeos).</li>
          <li><strong>Comentário da C (Incorreta):</strong> A infusão de albumina exógena não corrige a desnutrição proteico-calórica nem reduz a taxa de deiscência anastomótica; a hipoalbuminemia é um marcador de risco e inflamação que só melhora com suporte nutricional efetivo e resolução da doença.</li>
          <li><strong>Comentário da D (Incorreta):</strong> A NPT pré-operatória só é indicada quando a via enteral é impossível ou incapaz de atingir &gt; 50–60% da meta calórica; além disso, o tempo preconizado é de 7 a 14 dias, e não 30 dias.</li>
          <li><strong>Comentário da E (Incorreta):</strong> O paciente tem disfagia e desnutrição grave, não conseguindo atingir suas metas apenas com dieta oral comum.</li>
        </ul>

        <h3>Questão 2 — Abreviação do Jejum Pré-Operatório (Protocolos ACERTO e ERAS)</h3>
        <p><strong>Enunciado:</strong> Mulher de 45 anos, hígida (ASA I, $IMC = 26\text{ kg/m}^2$), será submetida a colecistectomia videolaparoscópica eletiva com início previsto para as 14h00. Não possui queixas de pirose, regurgitação ou gastroparesia. Sobre a prescrição do jejum pré-operatório segundo o projeto ACERTO e as diretrizes da Sociedade Brasileira de Anestesiologia (SBA), assinale a afirmativa correta:</p>
        <ul>
          <li>A) Deve-se prescrever jejum absoluto de sólidos e líquidos a partir das 24h00 da noite anterior para garantir esvaziamento gástrico completo na indução anestésica.</li>
          <li>B) A paciente pode ingerir refeição sólida leve até 6 horas antes da cirurgia e deve receber 200 mL de líquido claro enriquecido com maltodextrina a 12,5% até 2 horas antes da indução anestésica (às 12h00).</li>
          <li>C) A abreviação do jejum para 2 horas deve ser feita com 400 mL de leite integral ou fórmula polimérica rica em lipídios, pois os lipídios aceleram o esvaziamento pilórico.</li>
          <li>D) A administração de maltodextrina 2 horas antes da cirurgia aumenta o volume residual gástrico na indução anestésica, exigindo intubação em sequência rápida em todos os casos.</li>
          <li>E) O principal benefício metabólico da maltodextrina pré-operatória é inibir a secreção pancreática de insulina e estimular o glucagon, mantendo o paciente em cetogênese durante a cirurgia.</li>
        </ul>
        <p><strong>Gabarito: Alternativa B.</strong></p>
        <ul>
          <li><strong>Comentário da A (Incorreta):</strong> O jejum prolongado ("NPO após a meia-noite") aumenta a resistência periférica à insulina, a proteólise muscular e a incidência de náuseas e vômitos pós-operatórios sem qualquer benefício adicional de segurança contra aspiração.</li>
          <li><strong>Comentário da B (Correta):</strong> O protocolo ACERTO/ERAS preconiza jejum de 6 a 8 horas para sólidos e oferta de 200 a 400 mL de bebida clara contendo carboidrato (maltodextrina a 12,5%) até 2 horas antes da anestesia em pacientes sem contraindicações ao esvaziamento gástrico.</li>
          <li><strong>Comentário da C (Incorreta):</strong> Leite não humano e fórmulas com lipídios exigem no mínimo 6 horas de jejum, pois a gordura estimula colecistoquinina (CCK) e retarda o esvaziamento gástrico.</li>
          <li><strong>Comentário da D (Incorreta):</strong> Líquidos claros com maltodextrina 12,5% esvaziam completamente do estômago em 60 a 90 minutos, não aumentando o volume residual gástrico nem o risco de broncoaspiração.</li>
          <li><strong>Comentário da E (Incorreta):</strong> O mecanismo fisiológico da maltodextrina é exatamente o oposto: ela estimula a liberação endógena de insulina, colocando o paciente em estado metabólico alimentado (anabólico) e reduzindo a resistência insulínica pós-operatória.</li>
        </ul>

        <h3>Questão 3 — Contraindicações à Abreviação do Jejum Pré-Operatório</h3>
        <p><strong>Enunciado:</strong> Durante a visita pré-anestésica na enfermaria cirúrgica, o residente avalia cinco pacientes escalados para procedimentos no dia seguinte a fim de prescrever a solução de maltodextrina a 12,5% duas horas antes da operação. Em qual dos pacientes abaixo a abreviação do jejum pré-operatório está <strong>melhor indicada e segura</strong>?</p>
        <ul>
          <li>A) Paciente de 61 anos com diabetes mellitus tipo 1 há 28 anos, retinopatia proliferativa e gastroparesia diabética documentada por cintilografia, candidato a hernioplastia incisional.</li>
          <li>B) Gestante de 39 semanas em trabalho de parto ativo, com indicação de cesariana por parada secundária da dilatação.</li>
          <li>C) Paciente de 70 anos com tumor de cabeça de pâncreas invadindo a segunda porção duodenal e vômitos de estase alimentar de repetição.</li>
          <li>D) Paciente de 55 anos, hipertenso controlado, sem sintomas dispépticos ou refluxo, candidato a hemicolectomia direita eletiva por adenocarcinoma de cólon ascendente não obstrutivo.</li>
          <li>E) Paciente de 38 anos com doença do refluxo gastroesofágico grave, esofagite erosiva Los Angeles D e hérnia hiatal mista de 7 cm, candidato a fundoplicatura laparoscópica.</li>
        </ul>
        <p><strong>Gabarito: Alternativa D.</strong></p>
        <ul>
          <li><strong>Comentário da A (Incorreta):</strong> Gastroparesia diabética é contraindicação clássica à abreviação do jejum pelo retardo grave do esvaziamento gástrico.</li>
          <li><strong>Comentário da B (Incorreta):</strong> Gestantes em trabalho de parto ativo ou urgência obstétrica apresentam retardo do esvaziamento gástrico e risco elevado de síndrome de Mendelson.</li>
          <li><strong>Comentário da C (Incorreta):</strong> Obstrução gastroduodenal mecânica contraindica absolutamente a oferta de líquidos pré-operatórios; exige descompressão por SNG e indução em sequência rápida.</li>
          <li><strong>Comentário da D (Correta):</strong> Cirurgia colorretal eletiva sem obstrução intestinal e sem gastroparesia ou DRGE grave é a indicação clássica dos protocolos ACERTO e ERAS para abreviação do jejum com maltodextrina 2h antes da cirurgia.</li>
          <li><strong>Comentário da E (Incorreta):</strong> DRGE grave sintomática associada a hérnia hiatal volumosa constitui exceção ao protocolo de abreviação do jejum devido ao risco de regurgitação na indução anestésica.</li>
        </ul>

        <h3>Questão 4 — Fisiologia do Íleo Pós-Operatório e Realimentação Precoce</h3>
        <p><strong>Enunciado:</strong> A respeito da recuperação da motilidade gastrointestinal após laparotomias e da prática de realimentação precoce no pós-operatório, assinale a alternativa correta:</p>
        <ul>
          <li>A) O cólon é o primeiro segmento do trato digestivo a recuperar sua atividade contrátil propulsiva (em 4 a 8 horas), enquanto o intestino delgado permanece atônico por 48 a 72 horas.</li>
          <li>B) A presença de ruídos hidroaéreos audíveis e a eliminação de flatos são pré-requisitos fisiológicos indispensáveis antes de se iniciar dieta oral ou enteral após anastomoses intestinais.</li>
          <li>C) O intestino delgado recupera sua motilidade e capacidade absortiva em 4 a 8 horas após a cirurgia, permitindo que a realimentação precoce (&lt; 24h) seja segura, reduza complicações infecciosas e proteja a anastomose.</li>
          <li>D) A realimentação precoce nas primeiras 24 horas após ressecções intestinais aumenta significativamente a incidência de deiscência anastomótica e mortalidade.</li>
          <li>E) A hiper-hidratação intravenosa com 4.000 mL/dia de soro fisiológico a 0,9% acelera a resolução do íleo pós-operatório por aumentar a perfusão mucosa.</li>
        </ul>
        <p><strong>Gabarito: Alternativa C.</strong></p>
        <ul>
          <li><strong>Comentário da A (Incorreta):</strong> A ordem cronológica real é o inverso: o intestino delgado recupera a motilidade em 4 a 8 horas, o estômago em 24 a 48 horas, e o cólon é o último (48 a 72 horas).</li>
          <li><strong>Comentário da B (Incorreta):</strong> Flatos dependem da motilidade colônica; aguardar flatos ou RHA atrasa desnecessariamente a nutrição quando o delgado já funciona plenamente.</li>
          <li><strong>Comentário da C (Correta):</strong> A recuperação ultrarrápida do intestino delgado fundamenta a segurança da realimentação precoce nas primeiras 24 horas pós-operatórias, que nutre o enterócito, aumenta a síntese de colágeno na anastomose e reduz infecções e tempo de internação.</li>
          <li><strong>Comentário da D (Incorreta):</strong> Metanálises demonstram que a realimentação precoce não aumenta (e tende a reduzir) o risco de deiscência anastomótica e reduz a mortalidade e complicações infecciosas.</li>
          <li><strong>Comentário da E (Incorreta):</strong> O excesso de soro fisiológico 0,9% causa sobrecarga hidrossalina, edema da parede intestinal e prolongamento do íleo paralítico.</li>
        </ul>

        <h3>Questão 5 — Síndrome de Realimentação: Marcador Eletrolítico e Prevenção</h3>
        <p><strong>Enunciado:</strong> Paciente de 52 anos, portador de neoplasia estenosante de esôfago médio com perda de 20% do peso corporal em 3 meses e ingestão mínima há 12 dias, inicia terapia nutricional. Qual é o distúrbio eletrolítico considerado a marca registrada (<em>hallmark</em>) da Síndrome de Realimentação, qual é o seu mecanismo fisiopatológico desencadeante e qual vitamina deve ser obrigatoriamente administrada antes do início do aporte de glicose?</p>
        <ul>
          <li>A) Hiperfosfatemia; pico de glucagon induzido pela proteína; Vitamina B12 (Cianocobalamina).</li>
          <li>B) Hipofosfatemia; pico de insulina induzido pelos carboidratos promovendo influxo celular de fósforo, potássio e magnésio; Vitamina B1 (Tiamina).</li>
          <li>C) Hipercalemia; lise celular muscular induzida pelos lipídios; Vitamina C (Ácido ascórbico).</li>
          <li>D) Hiponatremia hiposmolar; secreção inapropriada de ADH induzida por aminoácidos; Vitamina B6 (Piridoxina).</li>
          <li>E) Hipermagnesemia; redução da filtração glomerular pela insulina; Vitamina K (Fitomenadiona).</li>
        </ul>
        <p><strong>Gabarito: Alternativa B.</strong></p>
        <ul>
          <li><strong>Comentário da A (Incorreta):</strong> Ocorre hipofosfatemia (e não hiperfosfatemia), mediada pela insulina (e não glucagon), e a vitamina crítica aguda é a B1 (tiamina).</li>
          <li><strong>Comentário da B (Correta):</strong> A oferta de carboidratos após jejum prolongado dispara a secreção de insulina, que promove captação celular rápida de glicose, fósforo (para síntese de ATP e 2,3-DPG), potássio e magnésio, causando hipofosfatemia (marca cardinal da síndrome), hipocalemia e hipomagnesemia. A tiamina (B1, 100 a 300 mg) deve preceder a glicose para evitar encefalopatia de Wernicke e acidose lática.</li>
          <li><strong>Comentário da C (Incorreta):</strong> Na síndrome de realimentação ocorre hipocalemia severa por entrada de potássio na célula via bomba $Na^+/K^+$-ATPase estimulada pela insulina.</li>
          <li><strong>Comentário da D (Incorreta):</strong> A insulina promove retenção renal de sódio e água, e a vitamina essencial na glicólise aeróbica (piruvato desidrogenase) é a tiamina (B1).</li>
          <li><strong>Comentário da E (Incorreta):</strong> Ocorre hipomagnesemia, e não hipermagnesemia.</li>
        </ul>

        <h3>Questão 6 — Nutrição Parenteral Periférica vs Central e Limites Metabólicos</h3>
        <p><strong>Enunciado:</strong> Em relação à prescrição, osmolaridade, vias de acesso e limites metabólicos da Terapia Nutricional Parenteral (TNP) no paciente cirúrgico, assinale a alternativa correta:</p>
        <ul>
          <li>A) A Nutrição Parenteral Periférica (NPP) pode conter soluções com osmolaridade de até 1.600 mOsm/L e é indicada quando o suporte parenteral for previsto por mais de 21 dias.</li>
          <li>B) Na Nutrição Parenteral Total (NPT), a velocidade máxima recomendada de oxidação de glicose é de 4 a 5 mg/kg/min, e a emulsão lipídica deve ser suspensa caso os triglicerídeos séricos ultrapassem 400 mg/dL.</li>
          <li>C) A dextrose monoidratada utilizada nas bolsas de NPT fornece 5,0 kcal/g, enquanto as emulsões lipídicas intravenosas fornecem 4,0 kcal/g.</li>
          <li>D) Caso uma infusão de NPT central a 80 mL/h seja interrompida por perda acidental do cateter, o paciente apresentará hiperglicemia de rebote imediata, exigindo administração de insulina regular intravenosa em <em>bolus</em>.</li>
          <li>E) A veia femoral é o sítio de punção venosa central de primeira escolha para NPT devido à menor taxa de colonização bacteriana e trombose.</li>
        </ul>
        <p><strong>Gabarito: Alternativa B.</strong></p>
        <ul>
          <li><strong>Comentário da A (Incorreta):</strong> A NPP tem limite estrito de osmolaridade entre 850 e 900 mOsm/L (para evitar tromboflebite periférica) e só deve ser utilizada por curto período (&le; 7 a 10 dias).</li>
          <li><strong>Comentário da B (Correta):</strong> Taxas de infusão de glicose &gt; 4 a 5 mg/kg/min excedem a capacidade máxima de oxidação hepática, gerando esteatose, hiperglicemia e hipercapnia ($QR &gt; 1,0$). Níveis de triglicerídeos &gt; 400 mg/dL contraindicam a infusão lipídica pelo risco de pancreatite aguda e sobrecarga lipídica.</li>
          <li><strong>Comentário da C (Incorreta):</strong> A dextrose monoidratada parenteral fornece 3,4 kcal/g, os aminoácidos fornecem 4,0 kcal/g e as emulsões lipídicas intravenosas fornecem aproximadamente 10,0 kcal/g (2,0 kcal/mL na emulsão a 20%).</li>
          <li><strong>Comentário da D (Incorreta):</strong> A interrupção abrupta da NPT causa <strong>hipoglicemia de rebote</strong> (devido à hiperinsulinemia endógena residual), exigindo infusão imediata de Soro Glicosado a 10% (SG 10%).</li>
          <li><strong>Comentário da E (Incorreta):</strong> O acesso femoral possui a maior taxa de infecção de corrente sanguínea e trombose venosa, sendo a veia subclávia (ou PICC) a via preferencial para NPT.</li>
        </ul>

        <h3>Questão 7 — Imunonutrição Perioperatória e Contraindicação na Sepse</h3>
        <p><strong>Enunciado:</strong> As fórmulas nutricionais imunomoduladoras contêm nutrientes específicos em doses farmacológicas capazes de modular a resposta inflamatória e cicatricial. Sobre esses imunonutrientes no paciente cirúrgico, é correto afirmar que:</p>
        <ul>
          <li>A) A L-arginina é precursora de óxido nítrico (via NOS) e de prolina/hidroxiprolina (via arginase), melhorando a cicatrização e a função dos linfócitos T em cirurgias oncológicas eletivas de grande porte, mas seu excesso deve ser evitado em pacientes com choque séptico instalado.</li>
          <li>B) Os ácidos graxos ômega-6 (ácido linoleico e araquidônico) são os principais responsáveis pelo efeito anti-inflamatório das dietas imunomoduladoras por aumentarem a síntese de prostaglandina $E_2$ e leucotrieno $B_4$.</li>
          <li>C) A glutamina em altas doses intravenosas e enterais combinadas (0,8 g/kg/dia) é formalmente indicada como terapia de primeira linha em pacientes em choque séptico com insuficiência renal aguda e falência hepática (estudo REDOXS).</li>
          <li>D) A imunonutrição perioperatória não demonstrou redução nas taxas de infecção de sítio cirúrgico nem no tempo de internação em cirurgias de câncer gástrico, pancreático ou de cabeça e pescoço.</li>
          <li>E) Os nucleotídeos adicionados às fórmulas imunomoduladoras têm como única função elevar a osmolaridade da solução para acelerar o trânsito colônico.</li>
        </ul>
        <p><strong>Gabarito: Alternativa A.</strong></p>
        <ul>
          <li><strong>Comentário da A (Correta):</strong> A arginina estimula a síntese de colágeno (via ornitina/prolina), a perfusão microvascular (via óxido nítrico) e a imunidade celular T, reduzindo infecções e fístulas em grandes cirurgias oncológicas. Porém, na sepse grave/choque séptico, a conversão maciça de arginina em óxido nítrico pela iNOS agrava a vasodilatação e a hipotensão refratária.</li>
          <li><strong>Comentário da B (Incorreta):</strong> Os ácidos graxos anti-inflamatórios e imunomoduladores são os da família <strong>ômega-3 (EPA e DHA do óleo de peixe)</strong>; os ômega-6 geram eicosanoides pró-inflamatórios ($PGE_2$ e $LTB_4$).</li>
          <li><strong>Comentário da C (Incorreta):</strong> O estudo REDOXS demonstrou que altas doses de glutamina em pacientes críticos com choque e disfunção de múltiplos órgãos (especialmente insuficiência renal e hepática) aumentam significativamente a mortalidade, sendo contraindicadas nesse grupo.</li>
          <li><strong>Comentário da D (Incorreta):</strong> Há evidência robusta (grau A nas diretrizes ESPEN/ACERTO) de redução de complicações infecciosas e tempo de hospitalização em cirurgias oncológicas digestivas e de cabeça e pescoço.</li>
          <li><strong>Comentário da E (Incorreta):</strong> Os nucleotídeos fornecem bases púricas e pirimídicas prontas para células de rápida divisão (enterócitos e linfócitos T).</li>
        </ul>

        <h3>Questão 8 — Fístulas Digestivas Pós-Operatórias e Fatores FRIENDS</h3>
        <p><strong>Enunciado:</strong> Paciente no 10º dia de pós-operatório de enterectomia desenvolve fístula enterocutânea. Após controle da sepse e suporte nutricional adequado por 6 semanas, a fístula permanece aberta com débito constante de 400 mL/dia. Qual dos fatores abaixo <strong>FAVORECE</strong> o fechamento espontâneo de uma fístula enterocutânea com tratamento conservador/nutricional?</p>
        <ul>
          <li>A) Presença de estenose neoplásica ou brida obstrutiva no segmento intestinal distal à fístula.</li>
          <li>B) Trajeto fistuloso longo (&gt; 2 cm), fístula lateral pequena (&lt; 1 cm), ausência de sepse intracavitária e trânsito distal livre.</li>
          <li>C) Epitelização completa do trajeto fistuloso (fístula labiada mucocutânea) associada a tela de polipropileno exposta no leito.</li>
          <li>D) Origem da fístula em segmento ileal previamente irradiado (enterite actínica) ou acometido por doença de Crohn em atividade.</li>
          <li>E) Descontinuidade completa das bocas intestinais (coto proximal e distal totalmente separados) com abscesso adjacente.</li>
        </ul>
        <p><strong>Gabarito: Alternativa B.</strong></p>
        <ul>
          <li><strong>Comentário da A (Incorreta):</strong> Obstrução distal (letra <strong>D</strong> de FRIENDS — <em>Distal obstruction</em>) impede que o fluxo siga pelo lúmen normal, mantendo a fístula perpetuamente aberta.</li>
          <li><strong>Comentário da B (Correta):</strong> Trajetos longos (&gt; 2 cm) sem epitelização, defeito lateral pequeno (&lt; 1 cm ou &lt; 50% da circunferência), ausência de sepse/abscesso, ausência de corpo estranho e trânsito distal pérvio são os principais determinantes de fechamento espontâneo sob suporte nutricional.</li>
          <li><strong>Comentário da C (Incorreta):</strong> Epitelização do trajeto (<strong>E</strong> — <em>Epithelialization</em>) e corpo estranho/tela (<strong>F</strong> — <em>Foreign body</em>) impedem o fechamento espontâneo.</li>
          <li><strong>Comentário da D (Incorreta):</strong> Radiação (<strong>R</strong> — <em>Radiation</em>) e doença inflamatória intestinal/infecção (<strong>I</strong> — <em>Inflammation/Infection</em>) impedem o fechamento espontâneo.</li>
          <li><strong>Comentário da E (Incorreta):</strong> Descontinuidade completa da alça e sepse intracavitária impedem a cicatrização espontânea.</li>
        </ul>

        <h3>Questão 9 — Síndrome do Intestino Curto e Hiperoxalúria Entérica</h3>
        <p><strong>Enunciado:</strong> Paciente de 49 anos sofreu trombose da artéria mesentérica superior há 8 meses, sendo submetido a enterectomia extensa com preservação de 55 cm de jejuno proximal anastomosado diretamente ao cólon transverso (ausência de todo o íleo e da válvula ileocecal). Atualmente, queixa-se de cólica nefrítica recorrente, e a tomografia evidencia múltiplos cálculos renais radiopacos compostos por oxalato de cálcio. Qual é o mecanismo fisiopatológico dessa complicação e a orientação dietética específica para preveni-la?</p>
        <ul>
          <li>A) Excesso de reabsorção ileal de sais biliares que se convertem em oxalato no fígado; orientar dieta hiperlipídica e restrição absoluta de cálcio oral.</li>
          <li>B) Má absorção de sais biliares por ausência do íleo terminal gera esteatorreia; os ácidos graxos livres não absorvidos quelam o cálcio no lúmen intestinal, deixando o oxalato alimentar livre para ser absorvido no cólon; orientar dieta hipolipídica, restrita em oxalato e suplementada com cálcio oral às refeições.</li>
          <li>C) Hiperparatireoidismo primário desencadeado pela ressecção jejunal; indicar paratireoidectomia subtotal imediata.</li>
          <li>D) Ausência de fermentação bacteriana no cólon; orientar suspensão de carboidratos complexos e ingestão exclusiva de triglicerídeos de cadeia longa.</li>
          <li>E) A nefrolitíase por oxalato de cálcio ocorre exclusivamente nos pacientes com jejunostomia terminal sem cólon preservado (SIC Tipo I).</li>
        </ul>
        <p><strong>Gabarito: Alternativa B.</strong></p>
        <ul>
          <li><strong>Comentário da A (Incorreta):</strong> Sem o íleo terminal, não há reabsorção entero-hepática de sais biliares; além disso, dieta hiperlipídica e restrição de cálcio agravam drasticamente a absorção colônica de oxalato!</li>
          <li><strong>Comentário da B (Correta):</strong> Em condições normais, o cálcio alimentar liga-se ao oxalato no lúmen intestinal, formando oxalato de cálcio insolúvel que é eliminado nas fezes. Na ressecção ileal com cólon preservado (SIC Tipos II e III), a falta de sais biliares causa esteatorreia; os ácidos graxos intraluminais ligam-se avidamente ao cálcio (saponificação), deixando o oxalato livre e solúvel para ser absorvido pela mucosa do cólon e excretado pelo rim (hiperoxalúria entérica). O tratamento exige dieta pobre em gorduras (ou substituição parcial por TCM), restrição de alimentos ricos em oxalato (espinafre, beterraba, chocolate, chá preto, nozes) e suplementação oral de cálcio durante as refeições para quelar o oxalato no lúmen.</li>
          <li><strong>Comentário da C (Incorreta):</strong> O mecanismo é entérico absortivo, e não hiperparatireoidismo primário.</li>
          <li><strong>Comentário da D (Incorreta):</strong> No paciente com cólon em continuidade, os carboidratos complexos são fundamentais porque sofrem fermentação colônica em ácidos graxos de cadeia curta, resgatando energia.</li>
          <li><strong>Comentário da E (Incorreta):</strong> A hiperoxalúria entérica <strong>exige a presença do cólon em continuidade</strong> (local onde o oxalato livre é absorvido); pacientes com jejunostomia terminal sem cólon não desenvolvem hiperoxalúria entérica.</li>
        </ul>

        <h3>Questão 10 — Complicações Hepatobiliares da Nutrição Parenteral e Terapia no Obeso Crítico</h3>
        <p><strong>Enunciado:</strong> Paciente masculino de 42 anos, obeso ($IMC = 36\text{ kg/m}^2$, peso atual = 115 kg, peso ideal = 75 kg), encontra-se no 28º dia de internação em UTI por abdome agudo perfurativo complicado com peritonite e íleo prolongado, em uso de Nutrição Parenteral Total (NPT) exclusiva há 3 semanas. Evolui com febre, leucocitose, elevação de fosfatase alcalina, GGT e bilirrubina direta, e a ultrassonografia à beira do leito revela vesícula biliar distendida, com paredes espessadas (6 mm), líquido pericolecístico, intenso barro biliar e ausência de cálculos. Sobre o caso e as diretrizes nutricionais, assinale a alternativa correta:</p>
        <ul>
          <li>A) O quadro corresponde a colecistite aguda alitiásica secundária à estase biliar por ausência de estímulo enteral para liberação de colecistoquinina (CCK); a meta nutricional recomendada para esse paciente obeso ($IMC = 36\text{ kg/m}^2$) é hipocalórica (11 a 14 kcal/kg de peso atual/dia) e hiperproteica (2,0 g de proteína/kg de peso ideal/dia).</li>
          <li>B) A NPT exclusiva estimula excessivamente a secreção duodenal de colecistoquinina (CCK), causando hipercontratilidade e espasmo do esfíncter de Oddi.</li>
          <li>C) No paciente obeso crítico ($IMC = 36\text{ kg/m}^2$), deve-se prescrever dieta hipercalórica de 35 kcal/kg de peso atual/dia e restrição proteica de 0,6 g/kg de peso ideal/dia para forçar a queima de tecido adiposo.</li>
          <li>D) A presença de barro biliar na NPT decorre exclusivamente da deficiência de vitamina B12 e não tem relação com o jejum enteral.</li>
          <li>E) A manutenção de dieta enteral trófica mínima (10 a 20 mL/h) é contraindicada pois aumenta o risco de colecistite alitiásica.</li>
        </ul>
        <p><strong>Gabarito: Alternativa A.</strong></p>
        <ul>
          <li><strong>Comentário da A (Correta):</strong> A ausência de nutrientes no lúmen duodenal durante a NPT exclusiva abole a liberação de CCK, gerando hipomotilidade vesicular, lama biliar e colecistite aguda alitiásica. Além disso, para obesos críticos com IMC entre 30 e 40 kg/m², as diretrizes ASPEN/BRASPEN preconizam nutrição hipocalórica (11 a 14 kcal/kg de peso atual/dia) e hiperproteica (2,0 g de proteína/kg de peso ideal/dia).</li>
          <li><strong>Comentário da B (Incorreta):</strong> A NPT exclusiva reduz (abole) a liberação de CCK por falta de estímulo luminal de lipídios e aminoácidos no duodeno.</li>
          <li><strong>Comentário da C (Incorreta):</strong> Prescrever 35 kcal/kg de peso atual no obeso causaria grave hiperalimentação, e restringir proteína agravaria a sarcopenia.</li>
          <li><strong>Comentário da D (Incorreta):</strong> O barro biliar resulta diretamente da estase vesicular pela falta de estímulo enteral (CCK).</li>
          <li><strong>Comentário da E (Incorreta):</strong> A nutrição enteral trófica mínima é justamente a principal medida preventiva contra a estase biliar e a atrofia mucosa.</li>
        </ul>
      `
    }
  ],
  references: [
    {
      label: 'Weimann A, Braga M, Carli F, et al. ESPEN practical guideline: Clinical nutrition in surgery. Clinical Nutrition, 2021;40(7):4745-4761.',
      url: 'https://www.clinicalnutritionjournal.com/article/S0261-5614(21)00178-3/fulltext'
    },
    {
      label: 'Aguilar-Nascimento JE, Bicudo-Salomão A, Waitzberg DL, et al. Diretriz ACERTO de intervenções nutricionais no perioperatório em cirurgia geral eletiva. Rev Col Bras Cir / BRASPEN Journal, 2017.',
      url: 'https://www.scielo.br/j/rcbc/a/Qr765fX8J9Y7G6v5/'
    },
    {
      label: 'Cederholm T, Jensen GL, Correia MITD, et al. GLIM criteria for the diagnosis of malnutrition — A consensus report from the global clinical nutrition community. Clinical Nutrition, 2019;38(1):1-9.',
      url: 'https://pubmed.ncbi.nlm.nih.gov/30181091/'
    },
    {
      label: 'da Silva JSV, Seres DS, Sabino K, et al. ASPEN Consensus Recommendations for Refeeding Syndrome. Nutrition in Clinical Practice, 2020;35(2):178-195.',
      url: 'https://pubmed.ncbi.nlm.nih.gov/32115791/'
    },
    {
      label: 'Townsend CM, Beauchamp RD, Evers BM, Mattox KL. Sabiston Textbook of Surgery: The Biological Basis of Modern Surgical Practice. 21st ed. Elsevier, 2021.',
      url: 'https://www.elsevier.com/books/sabiston-textbook-of-surgery/townsend/978-0-323-64062-6'
    },
    {
      label: 'Ministério da Saúde / ANVISA. Regulamento Técnico para a Terapia de Nutrição Parenteral e Enteral (Portaria SVS/MS nº 272 e RDC nº 503/2021).',
      url: 'https://www.gov.br/anvisa/pt-br'
    }
  ]
};

saveBook(book);
