import { saveBook } from './bloco-03-utils.mjs';

// ==========================================
// AULA 062: TRAUMA ABDOMINAL (Cirurgia Geral)
// ==========================================
const book062 = {
  slug: 'trauma-abdominal',
  title: 'Trauma Abdominal',
  area: 'Cirurgia Geral',
  materia: 'Cirurgia do Trauma e Emergências Cirúrgicas',
  description: 'Tratado completo sobre Trauma Abdominal Contuso e Penetrante: indicações imediatas de laparotomia, protocolo eFAST em 4 janelas, critérios e falha do Tratamento Não Operatório (TNO) em lesões de baço e fígado (escalas AAST), hematomas retroperitoneais (Zonas 1, 2 e 3), cirurgia de controle de danos (damage control surgery), síndrome compartimental abdominal e casos clínicos comentados.',
  sections: [
    {
      id: 'fisiopatologia-mecanismos-trauma-abdominal',
      title: '1. Fisiopatologia, Mecanismos de Lesão e Anatomia Cirúrgica Aplicada',
      body_html: `
<h3>Mecanismos de Energia Cinética no Trauma Abdominal</h3>
<p>O abdome é uma região anatômica ampla e desprovida de arcabouço ósseo protetor anterior completo, abrigando órgãos parenquimatosos ricamente vascularizados (fígado, baço, rins, pâncreas), vísceras ocas com conteúdo enzimático e séptico (estômago, duodeno, intestino delgado, cólon), além dos maiores eixos vasculares do organismo (aorta abdominal, veia cava inferior, vasos ilíacos e mesentéricos). As lesões abdominais representam a principal causa de morte evitável ou tardia no politraumatizado decorrente de hemorragia exsanguinante não contida ou sepse secundária à peritonite fecal.</p>
<p>A abordagem diagnóstica e terapêutica depende primordialmente do mecanismo do trauma:</p>
<ul>
  <li><strong>Trauma Abdominal Fechado (Contuso):</strong> Decorrente de desaceleração horizontal/vertical brusca (acidentes com veículos automotores) ou impacto direto de alta energia (atropelamentos, agressões, quedas). As forças de compressão transmitem ondas de pressão que esmagam vísceras sólidas contra a coluna vertebral e arcos costais posteriores. Forças de cisalhamento laceram pedículos vasculares e pontos de fixação mesentérica (ligamento de Treitz, ângulo ileocecal). <strong>O baço (40% a 55%) é o órgão mais comumente lesado no trauma contuso</strong>, seguido de perto pelo fígado (35% a 45%) e intestino delgado (5% a 10%).</li>
  <li><strong>Trauma Abdominal Penetrante por Arma Branca (FAB):</strong> Lesão de baixa velocidade com trajeto linear previsível dependente do comprimento da lâmina e da espessura da parede do paciente. <strong>O fígado (40%) é o órgão mais acometido nas FABs</strong>, seguido pelo intestino delgado (30%), diafragma (20%) e cólon (15%). Cerca de 25% a 30% das FABs abdominais anteriores não penetram a aponeurose e não causam lesão visceral.</li>
  <li><strong>Trauma Abdominal Penetrante por Arma de Fogo (FAF):</strong> Lesão de alta ou média energia cinética ($E = \frac{1}{2} m v^2$), provocando lesão direta por perfuração, fragmentação óssea secundária e cavitação temporária violenta ao redor do trajeto. Mais de 90% a 95% das FAFs que penetram a cavidade peritoneal produzem lesão visceral significativa, sendo <strong>o intestino delgado (50%) o órgão mais acometido</strong>, seguido por cólon (40%), fígado (30%) e vasos retroperitoneais (25%).</li>
</ul>
`
    },
    {
      id: 'indicacoes-laparotomia-imediata-vs-efast',
      title: '2. Avaliação Inicial, Indicações Absolutas de Laparotomia e Papel do eFAST',
      body_html: `
<h3>Indicações Formais de Laparotomia Exploradora Imediata</h3>
<p>Na sala de trauma, o cirurgião não deve hesitar nem submeter o paciente instável a exames demorados quando há indicação cirúrgica imediata definida pelo ATLS:</p>
<table class="book-table">
  <thead>
    <tr>
      <th>Cenário Clínico do Paciente</th>
      <th>Indicações Absolutas de Laparotomia Imediata</th>
      <th>Conduta Proscrita (O que NUNCA fazer)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Trauma Contuso</strong></td>
      <td>• Instabilidade hemodinâmica (choque) com eFAST positivo para líquido livre abdominal;<br>• Peritonite franca (dor à descompressão brusca difusa, abdome em tábua);<br>• Pneumoperitônio radiológico ou tomográfico;<br>• Evisceração de órgãos abdominais;<br>• Lavado Peritoneal Diagnóstico (LPD) francamente positivo (&ge; 10 mL de sangue vivo aspirado).</td>
      <td>NUNCA transportar paciente instável para a Tomografia Computadorizada (a TC é exclusiva do paciente estabilizado).</td>
    </tr>
    <tr>
      <td><strong>Ferimento por Arma de Fogo (FAF)</strong></td>
      <td>• Qualquer FAF penetrante com orifício de entrada anterior entre o 4º espaço intercostal e a sínfise púbica;<br>• FAF tangencial com choque, peritonite ou evisceração;<br>• FAF no dorso ou flanco com instabilidade ou peritonite.</td>
      <td>NUNCA tentar tratamento conservador de FAF em abdome anterior sem laparotomia mandatória.</td>
    </tr>
    <tr>
      <td><strong>Ferimento por Arma Branca (FAB)</strong></td>
      <td>• Instabilidade hemodinâmica;<br>• Sinais evidentes de peritonite;<br>• Evisceração (omento, alça intestinal);<br>• Sangramento gastrointestinal ativo (hematêmese, enterorragia);<br>• Exploração local da ferida evidenciando violação da aponeurose posterior em paciente sintomático.</td>
      <td>NUNCA reintroduzir víscera eviscerada na sala de emergência (deve-se cobrir com compressas estéreis úmidas com soro fisiológico morno).</td>
    </tr>
  </tbody>
</table>

<h3>Protocolo FAST (Focused Assessment with Sonography for Trauma) em 4 Janelas</h3>
<p>O ultrassom na sala de emergência tem acurácia diagnóstica superior a 95% para detecção de hemoperitônio (&ge; 100 a 200 mL de sangue livre):</p>
<ul>
  <li><strong>1. Espaço Hepatorrenal (Recesso de Morison):</strong> Local mais dependente da cavidade peritoneal supramesocólica em decúbito dorsal. A presença de lâmina anecoica (preta) entre o fígado e o rim direito é o sinal mais sensível e precoce de hemoperitônio.</li>
  <li><strong>2. Espaço Esplenorrenal:</strong> Avalia líquido livre entre o baço e o rim esquerdo e no espaço subfrênico esquerdo.</li>
  <li><strong>3. Janela Pélvica (Fundo de Saco de Douglas / Espaço Retovesical):</strong> Avalia líquido livre atrás da bexiga urinária (que deve estar preferencialmente preenchida para janela acústica).</li>
  <li><strong>4. Janela Subxifóidea / Pericárdica:</strong> Avalia a integridade do saco pericárdico para excluir tamponamento cardíaco concomitante.</li>
</ul>
`
    },
    {
      id: 'tratamento-nao-operatorio-baco-figado',
      title: '3. Tratamento Não Operatório (TNO) de Baço e Fígado: Critérios e Falha',
      body_html: `
<h3>Pilares do Tratamento Não Operatório (TNO) no Trauma Contuso</h3>
<p>A conservação do baço e do fígado transformou-se no padrão-ouro assistencial para mais de 80% dos traumas contusos viscerais no paciente <strong>hemodinamicamente estável</strong>. A conduta não operatória evita laparotomias não terapêuticas, previne infecções fulminantes pós-esplenectomia (OPSI por germes encapsulados: <em>S. pneumoniae</em>, <em>N. meningitidis</em>, <em>H. influenzae</em>) e reduz o tempo de hospitalização.</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Escala AAST</th>
      <th>Lesão Esplênica (Baço)</th>
      <th>Lesão Hepática (Fígado)</th>
      <th>Estratégia Terapêutica Habitual</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Grau I</strong></td>
      <td>Hematoma subcapsular &lt; 10% da superfície; laceração capsular &lt; 1 cm de profundidade parenquimatosa.</td>
      <td>Hematoma subcapsular &lt; 10% da superfície; laceração capsular &lt; 1 cm de profundidade.</td>
      <td>TNO: internação em enfermaria/UTI, repouso absoluto no leito por 24 a 48h, monitorização seriada de sinais vitais e hematócrito a cada 6 horas.</td>
    </tr>
    <tr>
      <td><strong>Grau II</strong></td>
      <td>Hematoma subcapsular 10% a 50%; hematoma intraparenquimatoso &lt; 5 cm; laceração de 1 a 3 cm de profundidade.</td>
      <td>Hematoma subcapsular 10% a 50%; hematoma intraparenquimatoso &lt; 10 cm; laceração de 1 a 3 cm de profundidade.</td>
      <td>TNO hospitalar monitorizado; retorno gradual da deambulação após estabilidade clínica laboratorial.</td>
    </tr>
    <tr>
      <td><strong>Grau III</strong></td>
      <td>Hematoma subcapsular &gt; 50% ou roto com sangramento ativo contido; hematoma intraparenquimatoso &ge; 5 cm; laceração &gt; 3 cm de profundidade.</td>
      <td>Hematoma subcapsular &gt; 50% ou roto; hematoma intraparenquimatoso &gt; 10 cm; laceração &gt; 3 cm de profundidade.</td>
      <td>TNO em leito de Terapia Intensiva. Na presença de <em>blush</em> arterial de contraste à angiotomografia, indicar <strong>Arteriografia com Angioembolização Seletiva</strong> de imediato.</td>
    </tr>
    <tr>
      <td><strong>Grau IV</strong></td>
      <td>Laceração envolvendo vasos segmentares ou hilares com desvascularização de mais de 25% do baço.</td>
      <td>Laceração parenquimatosa envolvendo 25% a 75% de um lobo hepático ou de 1 a 3 segmentos de Couinaud no mesmo lobo.</td>
      <td>TNO viável se paciente perfeitamente estável e em centro com UTI, cirurgião 24h e hemodinâmica. Angioembolização profilática/terapêutica frequente. Se instabilidade: cirurgia imediata.</td>
    </tr>
    <tr>
      <td><strong>Grau V</strong></td>
      <td>Baço completamente fragmentado / estilhaçado ('shattered spleen') ou avulsão do pedículo vascular hilar esplênico.</td>
      <td>Laceração parenquimatosa de mais de 75% do lobo hepático ou avulsão vascular retro-hepática (veia cava inferior retro-hepática / veias supra-hepáticas principais).</td>
      <td>Cirurgia de urgência na maioria esmagadora dos casos (Esplenectomia Total no baço; manobra de Pringle, empacotamento hepático [packing] e controle de danos no fígado).</td>
    </tr>
  </tbody>
</table>

<h3>Critérios Rígidos de Falha do TNO (Indicação de Laparotomia)</h3>
<ul>
  <li>Queda sustentada do hematócrito necessitando de mais de 2 a 4 concentrados de hemácias nas primeiras 24 horas para manter estabilidade;</li>
  <li>Deterioração hemodinâmica (taquicardia progressiva &gt; 120 bpm, hipotensão com PAS &lt; 90 mmHg persistente);</li>
  <li>Surgimento de dor abdominal progressiva em descompressão brusca (peritonite bacteriana por perfuração despercebida de víscera oca ou peritonite biliar por fístula hepática);</li>
  <li>Falha da angioembolização ou extravasamento ativo volumoso de contraste não contido.</li>
</ul>
`
    },
    {
      id: 'hematomas-retroperitoneais-zonas',
      title: '4. Hematomas Retroperitoneais: Classificação por Zonas e Conduta Cirúrgica',
      body_html: `
<h3>Zonas Anatômicas do Retroperitônio e Regras de Exploração Cirúrgica</h3>
<p>O retroperitônio abdominal é dividido cirurgicamente em três zonas distintas que orientam a decisão do cirurgião durante uma laparotomia exploradora:</p>
<table class="book-table">
  <thead>
    <tr>
      <th>Zona Retroperitoneal</th>
      <th>Limites Anatômicos e Estruturas Contidas</th>
      <th>Conduta no Trauma Penetrante (FAB/FAF)</th>
      <th>Conduta no Trauma Contuso (Fechado)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Zona 1 (Central / Medial)</strong></td>
      <td>Estende-se do hiato aórtico diafragmático até a bifurcação dos vasos ilíacos (promontório sacral). Contém: aorta abdominal, veia cava inferior, tronco celíaco, artérias e veias mesentéricas superiores e duodeno-pâncreas.</td>
      <td><strong>Exploração Cirúrgica Obrigatória</strong> imediata para hemostasia direta e rafia vascular.</td>
      <td><strong>Exploração Cirúrgica Obrigatória</strong> imediata após controle vascular proximal e distal, devido ao altíssimo risco de exsanguinação por lesão de grandes vasos.</td>
    </tr>
    <tr>
      <td><strong>Zona 2 (Lateral / Flancos)</strong></td>
      <td>Fossas lombares direita e esquerda. Contém: rins, glândulas suprarrenais, ureteres e cólon ascendente/descendente retroperitoneal.</td>
      <td><strong>Exploração Cirúrgica Obrigatória</strong> para afastar perfuração colônica oculta e lesão do pedículo renal ou ureteral.</td>
      <td><strong>Tratamento Conservador (NÃO explorar)</strong> se o hematoma for estável e não expansivo, com fáscia de Gerota íntegra e sem pulsos anormais. Abrir o hematoma na contusão frequentemente despressuriza o leito e culmina em nefrectomia desnecessária. Explorar apenas se expansivo, pulsátil ou roto livremente na cavidade.</td>
    </tr>
    <tr>
      <td><strong>Zona 3 (Pélvica)</strong></td>
      <td>Pelve verdadeira abaixo da bifurcação dos vasos ilíacos. Contém: vasos ilíacos internos e externos, plexo venoso pré-sacral e reto.</td>
      <td><strong>Exploração Cirúrgica Obrigatória</strong> com controle hemostático direto de vasos ilíacos lacerados.</td>
      <td><strong>Tratamento Conservador (NÃO abrir)</strong> se o hematoma for estável. A abertura cirúrgica rompe o tamponamento pélvico natural e causa sangramento venoso incontrolável. A conduta é o empacotamento pré-peritoneal (packing) e fixação pélvica, seguida de angioembolização.</td>
    </tr>
  </tbody>
</table>
`
    },
    {
      id: 'cirurgia-controle-danos-sindrome-compartimental',
      title: '5. Cirurgia de Controle de Danos e Síndrome Compartimental Abdominal',
      body_html: `
<h3>A Tríade Letal e as Três Fases do Controle de Danos (Damage Control)</h3>
<p>No paciente politraumatizado grave em choque descompensado, a morte precoce não decorre da incapacidade de suturar lesões, mas do colapso metabólico da <strong>Tríade Letal: Hipotermia (&lt; 35 °C), Acidose Metabólica (pH &lt; 7,20) e Coagulopatia</strong>. Procedimentos cirúrgicos longos e complexos (ressecções com anastomoses, reconstruções definitivas) nessa fase selam a falência orgânica irreversível.</p>
<p>O conceito de <strong>Cirurgia de Controle de Danos</strong> é executado em três etapas sequenciais estritas:</p>
<ul>
  <li><strong>Fase I (Cirurgia Abreviada - Máximo 60 a 90 minutos):</strong> Laparotomia rápida com incisão mediana xifopúbica ampla. Objetivos exclusivos: <strong>1. Controle rápido da hemorragia</strong> (ligaduras vasculares, shunts vasculares temporários, empacotamento com compressas / packing de fígado e pelve); <strong>2. Controle rápido da contaminação entérica</strong> (clampeamento, sutura simples ou ligadura de alças pérvias com fios grossos ou grampeadores sem reconstrução de trânsito); <strong>3. Fechamento temporário sem tensão</strong> com bolsa de Bogotá ou curativo a vácuo (peritoniostomia / laparostomia), prevenindo hipertensão intra-abdominal.</li>
  <li><strong>Fase II (Ressuscitação em UTI - 24 a 48 horas):</strong> Reaquecimento ativo gradual, correção da coagulopatia com protocolo transfusional balanceado (concentrado de hemácias, plasma fresco e plaquetas 1:1:1), infusão de fibrinogênio / crioprecipitado se fibrinogênio &lt; 150-200 mg/dL, correção de cálcio ionizável e acidose, e estabilização ventilatória e hemodinâmica.</li>
  <li><strong>Fase III (Reoperação Programada - 'Second Look'):</strong> Retorno ao centro cirúrgico após restauração da homeostase fisiológica (habitualmente 48 a 72 horas). Remoção meticulosa das compressas empacotadas, revisão de hemostasia, ressecções definitivas com anastomoses intestinais ou confecção de estomias e fechamento da parede aponeurótica.</li>
</ul>

<h3>Hipertensão Intra-Abdominal (HIA) e Síndrome Compartimental Abdominal (SCA)</h3>
<p>A Pressão Intra-Abdominal (PIA) normal varia de 5 a 7 mmHg em pacientes adultos em repouso. A mensuração padrão-ouro é realizada por via <strong>intravesical</strong> (medindo-se a coluna de pressão através de sonda de Foley acoplada a manômetro e infundindo-se 25 mL de SF 0,9% estéril na bexiga):</p>
<table class="book-table">
  <thead>
    <tr>
      <th>Classificação Oficial WSACS</th>
      <th>Nível da Pressão Intra-Abdominal (PIA)</th>
      <th>Fisiopatologia e Repercussões Clínicas</th>
      <th>Conduta Terapêutica</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Hipertensão Intra-Abdominal (Graus I a IV)</strong></td>
      <td>• Grau I: 12 a 15 mmHg<br>• Grau II: 16 a 20 mmHg<br>• Grau III: 21 a 25 mmHg<br>• Grau IV: &gt; 25 mmHg</td>
      <td>Elevação sustentada da PIA sem disfunção orgânica instalada. Compressão da veia cava inferior e diafragma.</td>
      <td>Medidas clínicas: sonda nasogástrica descompressiva, enema retal, restrição de fluidos, sedação, paralisia neuromuscular e drenagem percutânea de coleções.</td>
    </tr>
    <tr>
      <td><strong>Síndrome Compartimental Abdominal (SCA)</strong></td>
      <td><strong>PIA sustentada &gt; 20 mmHg associada obrigatoriamente a uma NOVA disfunção orgânica</strong></td>
      <td>• Renal: oligúria &lt; 0,5 mL/kg/h e elevação de escórias por compressão da veia renal e arteríolas;<br>• Respiratória: pico pressórico inspiratório elevado, hipercapnia e hipoxemia por elevação diafragmática;<br>• Cardiovascular: queda do débito cardíaco por colapso do retorno venoso.</td>
      <td><strong>Descompressão Cirúrgica de Emergência (Laparostomia Descompressiva):</strong> Abertura imediata da aponeurose e instalação de curativo de pressão negativa (VAC abdominal) ou bolsa de Bogotá. Salva a função renal e a vida do paciente.</td>
    </tr>
  </tbody>
</table>
`
    },
    {
      id: 'casos-clinicos-questoes-trauma-abdominal',
      title: '6. Casos Clínicos Comentados e Questões Originais de Prova',
      body_html: `
<h3>Casos Clínicos de Alta Complexidade</h3>
<div class="book-case">
  <h4>Caso Clínico 1: Trauma Contuso em Paciente Instável e eFAST Positivo</h4>
  <p><strong>História:</strong> Homem de 26 anos é trazido pelo SAMU após colisão moto contra anteparo em alta velocidade. Na admissão: via aérea pérvia com colar cervical, murmúrio vesicular presente bilateralmente, frequência respiratória 28 irpm, oximetria 95%. Na etapa C: pele fria, pulsos periféricos finos, FC 136 bpm, PA 75/40 mmHg. Abdome tenso e distendido. O emergencista realiza eFAST na sala vermelha, demonstrando lâmina anecoica volumosa no recesso hepatorrenal e no fundo de saco de Douglas. Não há derrame pericárdico ou pleural.</p>
  <p><strong>Discussão e Conduta:</strong> Paciente com <strong>Trauma Abdominal Contuso com Choque Hemorrágico Descompensado e eFAST Positivo para Hemoperitônio</strong>. Não há indicação de tomografia computadorizada (o transporte para a TC levaria à PCR por choque). A conduta mandatória é a <strong>Laparotomia Exploradora Imediata no Centro Cirúrgico</strong>, associada à ativação imediata do protocolo de transfusão maciça 1:1:1 e administração de ácido tranexâmico (1 g IV nas primeiras 3 horas). Na laparotomia, constatada lesão esplênica grau V com avulsão hilar; procede-se à esplenectomia de urgência.</p>
</div>

<div class="book-case">
  <h4>Caso Clínico 2: Lesão Hepática Grau IV e Falha de TNO por Hemorragia Tardia</h4>
  <p><strong>História:</strong> Mulher de 38 anos, vítima de colisão automobilística com cinto de segurança de 3 pontos. Deu entrada estável com PA 120/75 mmHg e FC 82 bpm. A tomografia de abdome revelou laceração hepática profunda no lobo direito estendendo-se por 4 cm sem extravasamento ativo de contraste (Trauma Hepático Grau IV). Optou-se por TNO na UTI. No 3º dia de internação, a paciente evolui subitamente com taquicardia (FC 128 bpm), hipotensão (PA 85/50 mmHg), dor abdominal intensa e queda de 4 pontos no hematócrito (de 33% para 22%).</p>
  <p><strong>Discussão e Conduta:</strong> Trata-se de <strong>Falha Tardia do Tratamento Não Operatório por Rotura de Hematoma Subcapsular Hepático</strong>. A deterioração hemodinâmica com queda abrupta da hemoglobina e choque hemorrágico impõe a conversão imediata para <strong>Laparotomia Cirúrgica</strong>. Intraoperatoriamente, o cirurgião realiza a <strong>Manobra de Pringle</strong> (clampeamento temporário do ligamento hepatoduodenal com pinça atraumática para ocluir o fluxo da artéria hepática própria e veia porta). O sangramento arterial diminui sensivelmente, confirmando origem no pedículo hepático; realiza-se hemostasia direta com pontos em 'U' de categute cromado, aplicação de agentes hemostáticos tópicos e empacotamento com compressas (packing peri-hepático) para controle de danos.</p>
</div>

<h3>Questões Comentadas de Residência Médica</h3>
<div class="book-question">
  <h4>Questão Comentada 1: ENARE / Cirurgia Geral — Ferimento por Arma Branca e Conduta</h4>
  <p><strong>Enunciado:</strong> Homem de 30 anos chega ao pronto-socorro após sofrer ferimento por faca no flanco esquerdo há 1 hora. Ao exame físico: lúcido e orientado, corado, hidratado, PA: 125/80 mmHg, FC: 78 bpm, abdome flácido, indolor, sem sinais de peritonite. A ferida mede 3 cm de extensão. Qual a conduta indicada para o manejo desse paciente?</p>
  <p>A) Laparotomia exploradora imediata para todos os ferimentos penetrantes em flanco.<br>
  B) Tomografia computadorizada de abdome e pelve com triplo contraste (oral, venoso e retal) ou exame físico seriado por equipe cirúrgica.<br>
  C) Alta hospitalar imediata após sutura simples da pele e antibioticoterapia oral.<br>
  D) Laparoscopia diagnóstica de urgência para avaliação da cavidade peritoneal.</p>
  <p><strong>Gabarito Oficial: Alternativa B.</strong></p>
  <p><strong>Comentário Detalhado:</strong> Em ferimentos por arma branca em flanco ou dorso em paciente hemodinamicamente estável e assintomático, o exame de escolha preconizado pelo Colégio Americano de Cirurgiões e CBC é a <strong>Tomografia Computadorizada com Triplo Contraste</strong> (venoso, oral e retal), que avalia com excelência o retroperitônio e o cólon retroperitoneal, ou a observação clínica seriada com exame físico repetido a cada 2 a 4 horas por 24 a 48 horas pela mesma equipe cirúrgica. A laparotomia imediata (A) é reservada aos casos de choque ou peritonite. Suturar e dar alta (C) é imperícia médica pelo risco de lesão retroperitoneal despercebida.</p>
</div>
`
    }
  ],
  references: [
    { label: 'American College of Surgeons - ATLS 10th and 11th Edition', url: 'https://www.facs.org/quality-programs/trauma/education/advanced-trauma-life-support/' },
    { label: 'Colégio Brasileiro de Cirurgiões (CBC) - Diretrizes de Trauma Abdominal', url: 'https://cbc.org.br' },
    { label: 'World Society of Abdominal Compartment Syndrome (WSACS) Guidelines', url: 'https://www.wsacs.org' },
    { label: 'World Society of Emergency Surgery (WSES) Guidelines on Splenic and Liver Trauma', url: 'https://wses.biomedcentral.com' }
  ]
};

// ==========================================
// AULA 056: PNEUMONIAS ADQUIRIDAS NA COMUNIDADE (Clínica Médica)
// ==========================================
const book056 = {
  slug: 'pneumonias-adquiridas-na-comunidade',
  title: 'Pneumonias Adquiridas na Comunidade',
  area: 'Clínica Médica',
  materia: 'Pneumologia e Infectologia',
  description: 'Tratado completo sobre Pneumonia Adquirida na Comunidade (PAC) no adulto: microbiologia e resistência bacteriana, diagnóstico clínico-radiológico, estratificação de risco (CURB-65, CRB-65 e PSI/Fine), critérios ATS/IDSA para admissão em UTI, escolha racional de antimicrobianos ambulatoriais e hospitalares, duração guiada por biomarcadores (procalcitonina), complicações pleurais (derrame parapneumônico e empiema) e casos clínicos comentados.',
  sections: [
    {
      id: 'fisiopatologia-etiologia-pac',
      title: '1. Fisiopatologia, Definição e Microbiologia da PAC no Adulto',
      body_html: `
<h3>Definição Epidemiológica e Mecanismos de Quebra das Defesas Pulmonares</h3>
<p>A <strong>Pneumonia Adquirida na Comunidade (PAC)</strong> é uma infecção aguda do parênquima pulmonar (alvéolos, bronquíolos respiratórios e interstício circundante) adquirida fora do ambiente hospitalar ou manifestada em até 48 horas após a admissão em um serviço de internação hospitalar. No Brasil e no mundo, a PAC configura a principal causa infecciosa de morte em todas as faixas etárias e a principal causa de internação hospitalar no Sistema Único de Saúde (SUS) entre as doenças do aparelho respiratório, determinando morbimortalidade desproporcional em idosos com mais de 65 anos e portadores de comorbidades crônicas (DPOC, insuficiência cardíaca, diabetes mellitus, hepatopatias e insuficiência renal crônica).</p>
<p>O desenvolvimento da pneumonia reflete a falência dos mecanismos fisiológicos normais de defesa do trato respiratório (depuração mucociliar, tosse reflexa, secreção de imunoglobulinas A e G, surfactante alveolar e fagocitose por macrófagos alveolares). A via patogênica primária e mais frequente é a <strong>microaspiração contínua de secreções da orofaringe colonizada</strong> durante o sono, superando a capacidade de eliminação dos macrófagos e desencadeando uma intensa cascata inflamatória rica em citocinas (TNF-alfa, IL-1, IL-6 e IL-8). Isso acarreta vasodilatação capilar alveolar, extravasamento de exsudato inflamatório rico em neutrófilos e fibrina para os alvéolos (fase de consolidação pulmonar) e desequilíbrio na relação ventilação/perfusão ($\dot{V}/\dot{Q}$), produzindo efeito <em>shunt</em> intrapulmonar com hipoxemia arterial refratária.</p>

<h3>Microbiologia da PAC: Típicos, Atípicos e Patógenos Especiais</h3>
<table class="book-table">
  <thead>
    <tr>
      <th>Categoria Microbiológica</th>
      <th>Principais Agentes Etiológicos</th>
      <th>Características Clínicas e Fatores de Risco Específicos</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Bactérias Típicas (Mais Comuns)</strong></td>
      <td>• <strong><em>Streptococcus pneumoniae</em> (Pneumococo):</strong> Agente mais frequente em todas as idades e gravidades (30% a 50% dos casos identificados);<br>• <strong><em>Haemophilus influenzae</em>:</strong> Comum em tabagistas, idosos e DPOC;<br>• <strong><em>Moraxella catarrhalis</em>:</strong> Frequente em pneumopatias crônicas preexistentes.</td>
      <td>Quadro clássico agudo: febre alta de início súbito com calafrios, tosse produtiva com expectoração purulenta ou herrumbrosa (cor de tijolo), dor torácica pleurítica e consolidação lobar bem delimitada ao raio-X com broncograma aéreo.</td>
    </tr>
    <tr>
      <td><strong>Bactérias Atípicas</strong></td>
      <td>• <strong><em>Mycoplasma pneumoniae</em>:</strong> Comum em jovens, escolares e adultos jovens em ambientes comunitários fechados;<br>• <strong><em>Chlamydia pneumoniae</em>:</strong> Quadro subagudo insidioso;<br>• <strong><em>Legionella pneumophila</em>:</strong> Transmitida por aerossóis de água climatizada (ar-condicionado central, torres de resfriamento).</td>
      <td>Início gradual e insidioso: febre baixa, tosse seca persistente e intratável, sintomas extrapulmonares exuberantes (cefaleia, mialgia, artralgia, faringite, miringite bolhosa no <em>Mycoplasma</em>). A <em>Legionella</em> causa quadro grave com hiponatremia, diarreia profusa, confusão mental e elevação de transaminases.</td>
    </tr>
    <tr>
      <td><strong>Vírus Respiratórios</strong></td>
      <td>• Influenza A e B;<br>• Vírus Sincicial Respiratório (VSR);<br>• SARS-CoV-2;<br>• Adenovírus e Metapneumovírus.</td>
      <td>Representam 15% a 30% das PACs em adultos. Frequentemente atuam como evento primário desestruturador da mucosa respiratória, predispondo a <strong>superinfecção bacteriana secundária grave</strong> (principalmente por <em>S. aureus</em> e pneumococo pós-influenza).</td>
    </tr>
    <tr>
      <td><strong>Patógenos Especiais / Resistentes</strong></td>
      <td>• <strong><em>Staphylococcus aureus</em> (MSSA e MRSA comunitário):</strong> Necrotizante, cavitações, choque pós-gripe;<br>• <strong><em>Pseudomonas aeruginosa</em>:</strong> Bronquiectasias, DPOC grave com uso frequente de corticoides/antibióticos;<br>• <strong>Bactérias Anaeróbias da cavidade oral:</strong> Macroaspiração, etilistas, distúrbios de deglutição, dentes em mau estado.</td>
      <td>Associados a pneumonia necrotizante, abscesso pulmonar e empiema pleural de alta letalidade.</td>
    </tr>
  </tbody>
</table>
`
    },
    {
      id: 'estratificacao-gravidade-curb65-psi',
      title: '2. Diagnóstico Clínico-Radiológico e Estratificação de Risco (CURB-65 e ATS/IDSA)',
      body_html: `
<h3>Escores de Risco para Decisão de Local de Tratamento: CURB-65 e CRB-65</h3>
<p>A decisão mais crítica no atendimento do paciente com PAC é definir com precisão e segurança o <strong>local de tratamento: ambulatorial, enfermaria hospitalar ou Unidade de Terapia Intensiva (UTI)</strong>. A internação desnecessária expõe o paciente a bactérias nosocomiais multirresistentes e tromboembolismo venoso, enquanto a alta indevida de um paciente em risco de descompensação eleva a mortalidade em até 10 a 20 vezes.</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Critério do Escore CURB-65</th>
      <th>Pontuação Atribuída</th>
      <th>Estratificação de Gravidade e Mortalidade Estimada em 30 Dias</th>
      <th>Recomendação Formal de Local de Manejo (Diretriz SBPT / ATS)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>C - Confusão Mental</strong> (novo déficit cognitivo ou AMTS &le; 8)</td>
      <td>1 ponto</td>
      <td rowspan="5"><strong>0 a 1 ponto (Baixo Risco):</strong><br>Mortalidade &lt; 1,5% a 2,0%.<br><br><strong>2 pontos (Risco Intermediário):</strong><br>Mortalidade de 6% a 9%.<br><br><strong>3 pontos (Risco Elevado):</strong><br>Mortalidade de 15% a 20%.<br><br><strong>4 a 5 pontos (Gravidade Extrema):</strong><br>Mortalidade de 30% a 50%.</td>
      <td rowspan="5"><strong>CURB-65 = 0 ou 1:</strong> Tratamento <strong>Ambulatorial</strong> em domicílio com antibiótico oral seguro.<br><br><strong>CURB-65 = 2:</strong> Considerar <strong>Internação em Enfermaria</strong> ou observação clínica hospitalar rigorosa.<br><br><strong>CURB-65 &ge; 3:</strong> <strong>Internação Hospitalar Obrigatória</strong>, devendo-se avaliar critérios de admissão imediata em UTI.</td>
    </tr>
    <tr>
      <td><strong>U - Ureia sérica &gt; 50 mg/dL</strong> (ou BUN &gt; 19-20 mg/dL)</td>
      <td>1 ponto</td>
    </tr>
    <tr>
      <td><strong>R - Respiração (FR &ge; 30 irpm)</strong></td>
      <td>1 ponto</td>
    </tr>
    <tr>
      <td><strong>B - Blood Pressure (PAS &lt; 90 mmHg ou PAD &le; 60 mmHg)</strong></td>
      <td>1 ponto</td>
    </tr>
    <tr>
      <td><strong>65 - Idade &ge; 65 anos</strong></td>
      <td>1 ponto</td>
    </tr>
  </tbody>
</table>
<p><em>Nota Prática para Atenção Primária:</em> Na ausência de dosagem laboratorial rápida de ureia, utiliza-se o escore simplificado <strong>CRB-65</strong> (0 pontos = tratamento domiciliar; 1 ou 2 pontos = avaliar hospitalização; &ge; 3 pontos = internação hospitalar urgente).</p>

<h3>Critérios da ATS/IDSA para Internação Direta em Unidade de Terapia Intensiva (UTI)</h3>
<p>O paciente deve ser admitido imediatamente em leito de UTI se apresentar <strong>pelo menos 1 Critério Maior OU pelo menos 3 Critérios Menores</strong>:</p>
<ul>
  <li><strong>Critérios Maiores (Basta 1):</strong>
    <ol>
      <li><strong>Choque séptico</strong> com necessidade de uso de drogas vasoativas (noradrenalina);</li>
      <li><strong>Insuficiência respiratória aguda grave</strong> com necessidade de suporte de ventilação mecânica invasiva.</li>
    </ol>
  </li>
  <li><strong>Critérios Menores (Necessários &ge; 3):</strong>
    <ol>
      <li>Frequência respiratória &ge; 30 irpm;</li>
      <li>Relação $\text{PaO}_2 / \text{FiO}_2 \le 250$;</li>
      <li>Infiltrados pulmonares multilobares ao raio-X ou TC;</li>
      <li>Confusão mental / desorientação;</li>
      <li>Ureia sérica elevada (&ge; 43 a 50 mg/dL);</li>
      <li>Leucopenia induzida por sepse (&lt; 4.000 leucócitos/mm³);</li>
      <li>Trombocitopenia (&lt; 100.000 plaquetas/mm³);</li>
      <li>Hipotermia central (&lt; 36,0 °C);</li>
      <li>Hipotensão arterial necessitando de ressuscitação volêmica agressiva.</li>
    </ol>
  </li>
</ul>
`
    },
    {
      id: 'terapeutica-antimicrobiana-pac',
      title: '3. Esquemas Antimicrobianos Empíricos e Guiados por Biomarcadores',
      body_html: `
<h3>Seleção Racional de Esquemas Terapêuticos Baseados em Evidências (SBPT / ATS / IDSA)</h3>
<table class="book-table">
  <thead>
    <tr>
      <th>Local de Manejo Clínico</th>
      <th>Perfil do Paciente</th>
      <th>Esquemas Antimicrobianos de Primeira Escolha</th>
      <th>Duração Típica do Tratamento</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="2"><strong>Ambulatorial (Domicílio)</strong></td>
      <td><strong>Hígido, sem comorbidades</strong>, sem uso prévio de antibióticos nos últimos 90 dias.</td>
      <td>• <strong>Amoxicilina oral 500 mg a 1.000 mg de 8/8h</strong> (padrão SBPT no Brasil devido às baixas taxas de pneumococo resistente a altas doses de amoxicilina);<br>• Alternativa: <strong>Azitromicina 500 mg 1x/dia</strong> ou Claritromicina 500 mg 12/12h; ou Doxiciclina 100 mg 12/12h.</td>
      <td>5 a 7 dias (desde que atinja critérios de estabilidade clínica por pelo menos 48h).</td>
    </tr>
    <tr>
      <td><strong>Com comorbidades</strong> (DPOC, DM, ICC, doença renal/hepática, etilismo, imunossupressão) ou uso recente de antibióticos.</td>
      <td>• <strong>Betalactâmico + Macrolídeo:</strong> Amoxicilina-Clavulanato 875/125 mg 12/12h (ou Cefuroxima 500 mg 12/12h) associado a Azitromicina 500 mg/dia ou Claritromicina 500 mg 12/12h;<br>• Alternativa em monoterapia: <strong>Fluoroquinolona respiratória</strong> (Levofloxacino 750 mg 1x/dia ou Moxifloxacino 400 mg 1x/dia).</td>
      <td>5 a 7 dias.</td>
    </tr>
    <tr>
      <td><strong>Hospitalar (Enfermaria)</strong></td>
      <td>PAC internada sem critérios para UTI.</td>
      <td>• <strong>Betalactâmico IV + Macrolídeo IV/VO:</strong> <strong>Ceftriaxona 1g a 2g IV 1x/dia (ou Ampicilina-Sulbactam 1,5g a 3g IV 6/6h) + Azitromicina 500 mg IV/VO 1x/dia</strong>;<br>• Alternativa: Levofloxacino 750 mg IV/VO 1x/dia em monoterapia (preferível em alergia a betalactâmicos).</td>
      <td>5 a 7 dias. Transição para via oral assim que tolerar dieta e estiver afebril por 24-48h.</td>
    </tr>
    <tr>
      <td><strong>Hospitalar (UTI)</strong></td>
      <td>PAC grave com critérios para terapia intensiva.</td>
      <td>• <strong>Ceftriaxona 2g IV 1x/dia (ou Ampicilina-Sulbactam 3g 6/6h) + Azitromicina 500 mg IV 1x/dia</strong> (ou Levofloxacino 750 mg IV 1x/dia);<br>• Se fator de risco para <em>P. aeruginosa</em>: Piperacilina-Tazobactam (4,5g 6/6h) ou Cefepima (2g 8/8h) + Levofloxacino (750 mg/dia) ou Ciprofloxacino;<br>• Se fator de risco para MRSA: associar Vancomicina ou Linezolida.</td>
      <td>7 a 10 dias (guiado por biomarcadores).</td>
    </tr>
  </tbody>
</table>

<h3>Critérios Objetivos de Estabilidade Clínica para Alta Hospitalar e Descontinuação de Antibióticos</h3>
<p>O tratamento da PAC não deve ser prolongado arbitrariamente por 14 ou 21 dias. O uso de antibióticos pode ser suspenso com segurança após <strong>mínimo de 5 dias</strong> se o paciente atingir os seguintes critérios de estabilidade clínica por no mínimo 48 horas:</p>
<ul>
  <li>Temperatura axilar &le; 37,8 °C;</li>
  <li>Frequência cardíaca &le; 100 bpm;</li>
  <li>Frequência respiratória &le; 24 irpm;</li>
  <li>Pressão arterial sistólica &ge; 90 mmHg;</li>
  <li>Saturação de oxigênio em ar ambiente &ge; 90% (ou PaO2 &ge; 60 mmHg);</li>
  <li>Capacidade de ingestão oral e manutenção do estado de consciência basal;</li>
  <li>Queda da <strong>Procalcitonina sérica em mais de 80% do valor de pico</strong> ou dosagem &lt; 0,25 mcg/L.</li>
</ul>
`
    },
    {
      id: 'complicacoes-derrame-pleural-parapneumonico',
      title: '4. Complicações da PAC: Abordagem do Derrame Parapneumônico e Empiema',
      body_html: `
<h3>Fisiopatologia e Classificação do Derrame Pleural Parapneumônico</h3>
<p>Cerca de 20% a 40% dos pacientes hospitalizados com pneumonia bacteriana desenvolvem derrame pleural parapneumônico associado. A correta diferenciação entre um derrame não complicado (que responde exclusivamente a antibióticos) e um derrame complicado ou empiema (que exige drenagem cirúrgica mandatória) é crucial para evitar sepse pleural e encarceramento pulmonar crônico:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Fase Evolutiva</th>
      <th>Características Bioquímicas e Microbiológicas do Líquido Pleural</th>
      <th>Conduta Terapêutica Mandatória</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>1. Derrame Parapneumônico Não Complicado (Fase Exsudativa)</strong></td>
      <td>• Líquido seroso claro e fluido;<br>• <strong>pH &gt; 7,20</strong>;<br>• <strong>Glicose &gt; 40 a 60 mg/dL</strong>;<br>• DHL &lt; 1.000 UI/L;<br>• Gram e cultura ausentes (estéril).</td>
      <td><strong>Tratamento exclusivamente clínico</strong> com a antibioticoterapia sistêmica adequada para a PAC. Não necessita de drenagem torácica.</td>
    </tr>
    <tr>
      <td><strong>2. Derrame Parapneumônico Complicado (Fase Fibrinopurulenta)</strong></td>
      <td>Invasão bacteriana do espaço pleural com consumo metabólico acelerado de substratos:<br>• <strong>pH &lt; 7,20</strong>;<br>• <strong>Glicose &lt; 40 mg/dL</strong>;<br>• <strong>DHL &gt; 1.000 UI/L</strong>;<br>• Bacterioscopia (Gram) ou cultura podem ser positivas;<br>• Formação de septações e fibrina locada.</td>
      <td><strong>Drenagem Pleural Fechada em Selo d'Água Imediata</strong>. Se houver multiloculações e septações complexas, associar instilação intrapleural de fibrinolíticos (Alteplase / DNase) ou proceder à videotoracoscopia (VATS) para debridamento precoce.</td>
    </tr>
    <tr>
      <td><strong>3. Empiema Pleural Franco (Fase Organizacional)</strong></td>
      <td>• Presença de <strong>pus macroscópico franco</strong> aspirado na toracocentese, independentemente de valores bioquímicos;<br>• Presença de bactérias na bacterioscopia direta;<br>• Deposição de carapaça espessa de colágeno encarcerando o pulmão.</td>
      <td><strong>Drenagem torácica tubular calibrosa imediata</strong>. Se houver encarceramento pulmonar com pulmão não expansível após a drenagem, indicar <strong>Decorticação Pulmonar por Videotoracoscopia ou Toracotomia aberta</strong>.</td>
    </tr>
  </tbody>
</table>
`
    },
    {
      id: 'casos-clinicos-questoes-pac',
      title: '5. Casos Clínicos Comentados e Questões de Prova',
      body_html: `
<h3>Casos Clínicos Comentados</h3>
<div class="book-case">
  <h4>Caso Clínico 1: PAC Grave em Idoso com Indicação de UTI pelos Critérios ATS</h4>
  <p><strong>História:</strong> Homem de 72 anos, hipertenso e diabético, é admitido com febre de 38,8 °C, tosse produtiva e dispneia progressiva há 3 dias. Ao exame: confuso e sonolento, FR: 34 irpm, SpO2: 86% em ar ambiente, FC: 118 bpm, PA: 80/45 mmHg que não normaliza após infusão de 1.000 mL de cristaloides. Radiografia de tórax evidencia infiltrado alveolar bilateral em lobo inferior direito e lobo médio. Gasometria arterial revela PaO2 de 52 mmHg com máscara a 10 L/min (relação PaO2/FiO2 de 104). Exames: Ureia de 78 mg/dL e leucócitos de 2.800/mm³.</p>
  <p><strong>Discussão e Conduta:</strong> Paciente com pontuação de <strong>CURB-65 = 5 pontos</strong> (Confusão, Ureia &gt; 50, FR &ge; 30, Baixa PA e &ge; 65 anos). Além disso, preenche <strong>Critério Maior da ATS (Choque Séptico necessitando de vasopressor)</strong> e múltiplos critérios menores (relação PaO2/FiO2 &lt; 250, acometimento multilobar, leucopenia e hipotensão). A conduta mandatória é a <strong>admissão imediata em Unidade de Terapia Intensiva (UTI)</strong>, início de suporte vasopressor com Noradrenalina para manter PAM &ge; 65 mmHg, coleta de 2 pares de hemoculturas e início precoce na primeira hora de <strong>Ceftriaxona 2g IV associada a Azitromicina 500 mg IV</strong>.</p>
</div>

<h3>Questões Comentadas de Residência Médica</h3>
<div class="book-question">
  <h4>Questão Comentada 1: USP / Residência Médica — Tratamento Ambulatorial de PAC com Comorbidades</h4>
  <p><strong>Enunciado:</strong> Mulher de 58 anos, portadora de DPOC leve e diabetes mellitus tipo 2, comparece à consulta ambulatorial com história de tosse produtiva há 4 dias, febre de 38,2 °C e dor torácica ventilatório-dependente à direita. Ao exame físico: lúcida, orientada, FR: 20 irpm, FC: 84 bpm, PA: 120/75 mmHg e SpO2: 95% em ar ambiente. Ausculta pulmonar com estertores crepitantes no terço médio do hemitórax direito. Radiografia de tórax confirma consolidação no lobo médio direito sem derrame pleural. Ureia: 32 mg/dL. Segundo as diretrizes da Sociedade Brasileira de Pneumologia e Tisiologia (SBPT), qual a estratificação pelo CURB-65 e a conduta terapêutica indicada?</p>
  <p>A) CURB-65 = 2 pontos; indicar internação em enfermaria e ceftriaxona IV.<br>
  B) CURB-65 = 0 pontos; prescrever tratamento ambulatorial com Amoxicilina + Clavulanato associado a Azitromicina (ou Fluoroquinolona respiratória em monoterapia).<br>
  C) CURB-65 = 1 ponto; indicar tratamento ambulatorial com claritromicina isolada.<br>
  D) CURB-65 = 0 pontos; prescrever sulfametoxazol-trimetoprima por 14 dias.</p>
  <p><strong>Gabarito Oficial: Alternativa B.</strong></p>
  <p><strong>Comentário Detalhado:</strong> A paciente possui <strong>CURB-65 = 0 pontos</strong> (não tem confusão, ureia é &lt; 50, FR &lt; 30, PA é normal e idade é &lt; 65 anos). Logo, a indicação é de <strong>tratamento ambulatorial em domicílio</strong>. Entretanto, por ser portadora de comorbidades significativas (DPOC e diabetes), a diretriz da SBPT preconiza a cobertura ampliada para bactérias produtoras de betalactamase (<em>H. influenzae</em>, <em>M. catarrhalis</em>) e germes atípicos. A terapia de primeira linha consiste na combinação de <strong>Betalactâmico com inibidor de betalactamase (Amoxicilina-Clavulanato) + Macrolídeo (Azitromicina)</strong> ou uma <strong>Fluoroquinolona respiratória oral (Levofloxacino ou Moxifloxacino)</strong> por 5 a 7 dias. A monoterapia com macrolídeo (C) é insuficiente em portadores de comorbidades devido às taxas de resistência do pneumococo.</p>
</div>
`
    }
  ],
  references: [
    { label: 'Sociedade Brasileira de Pneumologia e Tisiologia (SBPT) - Diretrizes Brasileiras para PAC', url: 'https://sbpt.org.br' },
    { label: 'ATS/IDSA Guidelines on Community-Acquired Pneumonia', url: 'https://www.thoracic.org' },
    { label: 'Ministério da Saúde - Protocolo Clínico e Diretrizes Terapêuticas de Pneumonia', url: 'https://www.gov.br/saude' }
  ]
};

// ==========================================
// AULA 061: TUBERCULOSE PULMONAR (Clínica Médica)
// ==========================================
const book061 = {
  slug: 'tuberculose-pulmonar',
  title: 'Tuberculose Pulmonar',
  area: 'Clínica Médica',
  materia: 'Infectologia e Pneumologia Sanitária',
  description: 'Tratado completo sobre Tuberculose Pulmonar no Brasil: microbiologia do Mycobacterium tuberculosis, transmissão e patogênese (infecção primária, latente e pós-primária), manifestações clínicas no sintomático respiratório, métodos diagnósticos bacteriológicos e moleculares (TRM-TB / GeneXpert, baciloscopia de Ziehl-Neelsen e cultura com TSA), esquema básico RIPE em dose fixa combinada, toxicidades farmacológicas e hepatotoxicidade, infecção latente (ILTB) e coinfecção TB-HIV com casos comentados.',
  sections: [
    {
      id: 'fisiopatologia-transmissao-tuberculose',
      title: '1. Agente Etiológico, Fisiopatologia, Transmissão e Formas Clínicas',
      body_html: `
<h3>Microbiologia e Mecanismo de Transmissão por Aerossóis</h3>
<p>A <strong>Tuberculose (TB)</strong> é uma doença infectocontagiosa crônica causada pelo <em>Mycobacterium tuberculosis</em> (bacilo de Koch - BK), um bacilo álcool-ácido resistente (BAAR) estritamente aeróbio, de crescimento intracelular lento e parede celular peculiar riquíssima em lipídios complexos (ácidos micólicos, arabinogalactanos e lipoarabinomanana). Essa arquitetura parietal confere alta resistência à dessecação, aos desinfetantes químicos comuns, à ação lítica do complemento e à destruição fagocitária pelos macrófagos alveolares.</p>
<p>A transmissão ocorre exclusivamente por <strong>via aérea através de aerossóis de gotículas minúsculas (núcleos de Wells com diâmetro de 1 a 5 micrômetros)</strong> expelidos por pacientes com tuberculose pulmonar ou laríngea bacilífera ao tossir, espirrar ou falar. Essas partículas minúsculas permanecem suspensas no ar por várias horas e conseguem ultrapassar a barreira mucociliar da árvore traqueobrônquica, atingindo diretamente os alvéolos pulmonares periféricos. Objetos inanimados, fômites, roupas, talheres ou alimentos NÃO transmitem a doença.</p>

<h3>História Natural da Infecção: Primária, Latente e Reativação Pós-Primária</h3>
<table class="book-table">
  <thead>
    <tr>
      <th>Etapa Fisiopatológica</th>
      <th>Mecanismos Imunológicos e Celulares</th>
      <th>Manifestações Clínicas e Radiológicas</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Infecção Primária e Complexo de Ghon</strong></td>
      <td>Inalação alveolar inicial. Os macrófagos fagocitam os bacilos, mas não conseguem destruí-los, ocorrendo multiplicação intracelular. Ativação de linfócitos T CD4+ (resposta celular Th1 com produção de IFN-gama e TNF-alfa), que recrutam monócitos e formam o <strong>granuloma tuberculoide com necrose caseosa central</strong>. A drenagem linfática do foco parenquimatoso para os linfonodos hilares regionais constitui o <strong>Complexo Bipolar de Ghon</strong>. A calcificação posterior do nódulo e do linfonodo origina o <strong>Complexo de Ranke</strong>.</td>
      <td>A maioria é assintomática (mais de 90% a 95%). Cerca de 5% desenvolvem tuberculose primária ativa precoce (comum em crianças e imunodeprimidos), caracterizada por febre arrastada, adenomegalia hilar unilateral volumosa, consolidação subpleural e atelectasias por compressão extrínseca bronquial.</td>
    </tr>
    <tr>
      <td><strong>Infecção Latente pelo Mycobacterium tuberculosis (ILTB)</strong></td>
      <td>O sistema imune contém eficazmente a proliferação bacilar dentro do granuloma caseoso calcificado. Os bacilos permanecem em estado de latência metabólica (dormentes), viáveis por décadas.</td>
      <td>Indivíduo <strong>completamente assintomático e NÃO transmissor</strong>. Radiografia de tórax habitualmente normal (ou apenas com nódulo calcificado). Diagnóstico demonstrado exclusivamente por teste de imunidade celular: <strong>Prova Tuberculínica (PT / PPD) ou IGRA positivo</strong>.</td>
    </tr>
    <tr>
      <td><strong>Tuberculose Secundária / Pós-Primária (Reativação do Adulto)</strong></td>
      <td>Ocorre em cerca de 5% a 10% dos indivíduos infectados ao longo da vida, decorrente de reativação endógena de focos latentes (ou reinfecção exógena) quando há declínio da imunidade celular (envelhecimento, desnutrição, diabetes mellitus, uso de corticoides, imunobiológicos anti-TNF ou infecção pelo HIV).</td>
      <td>Predileção patognomônica pelos <strong>segmentos apicais e posteriores dos lobos superiores e segmento superior dos lobos inferiores</strong> (áreas de maior tensão alveolar de oxigênio $\text{PO}_2$, favoráveis ao bacilo estritamente aeróbio). Ocorre necrose caseosa maciça com liquefação e esvaziamento para a luz bronquial, formando <strong>cavidades tuberculosas</strong> repletas de bacilos que comunicam com o meio exterior.</td>
    </tr>
  </tbody>
</table>
`
    },
    {
      id: 'diagnostico-bacteriologico-molecular-trmtb',
      title: '2. Quadro Clínico, Sintomático Respiratório e Métodos Diagnósticos Oficiais (MS)',
      body_html: `
<h3>Definição Operacional de Sintomático Respiratório (SR)</h3>
<p>No Brasil, a estratégia prioritária de busca ativa de casos de tuberculose pulmonar preconizada pelo Ministério da Saúde define como <strong>Sintomático Respiratório (SR)</strong>:</p>
<ul>
  <li>Na <strong>população geral</strong>: todo indivíduo com <strong>tosse há 3 semanas ou mais</strong>;</li>
  <li>Em <strong>populações de maior vulnerabilidade</strong> (pessoas privadas de liberdade, pessoas vivendo em situação de rua, povos indígenas e pessoas vivendo com HIV): qualquer tosse <strong>independentemente da duração</strong> (mesmo &lt; 2 a 3 semanas).</li>
</ul>
<p>O quadro clínico clássico do adulto é marcado por tosse persistente seca ou produtiva (podendo haver hemoptise nos casos avançados), febre vespertina baixa (38,0 °C) com sudorese noturna profusa ('acorda molhado de suor'), perda ponderal inexplicada, astenia e anorexia.</p>

<h3>Hierarquia dos Métodos Laboratoriais Diagnósticos no SUS</h3>
<table class="book-table">
  <thead>
    <tr>
      <th>Método Diagnóstico</th>
      <th>Princípio Metodológico e Sensibilidade</th>
      <th>Tempo de Resposta e Vantagens Principais</th>
      <th>Indicações Oficiais no SUS</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Teste Rápido Molecular para TB (TRM-TB / GeneXpert MTB/RIF)</strong></td>
      <td>Reação em Cadeia da Polimerase (RT-PCR em tempo real) automatizada em cartucho fechado. Detecta DNA do complexo <em>M. tuberculosis</em> e <strong>mutações no gene rpoB que conferem resistência à Rifampicina</strong>.</td>
      <td>Resultado definitivo em cerca de <strong>2 horas</strong>. Altíssima sensibilidade (&gt; 90%) e especificidade (&gt; 98%).</td>
      <td><strong>Método diagnóstico de primeira escolha</strong> preconizado pelo Ministério da Saúde para o diagnóstico de casos novos de TB pulmonar e laríngea em adultos e crianças em municípios com equipamento implantado. <em>Não serve para controle de cura (detecta DNA de bacilos mortos).</em></td>
    </tr>
    <tr>
      <td><strong>Baciloscopia Direta do Escarro (BAAR)</strong></td>
      <td>Microscopia óptica direta com coloração de Ziehl-Neelsen (ou fluorescência com auramina-rodamina). Requer pelo menos 5.000 a 10.000 bacilos por mL de escarro para positividade.</td>
      <td>Baixo custo, rápida execução em qualquer laboratório básico do SUS.</td>
      <td>• Diagnóstico nos locais sem TRM-TB disponível (recomenda-se colheita de 2 amostras: 1ª no primeiro contato e 2ª na manhã seguinte em jejum);<br>• <strong>Método obrigatório universal para monitoramento mensal de controle de cura durante o tratamento farmacológico</strong>.</td>
    </tr>
    <tr>
      <td><strong>Cultura para Micobactérias (Meio Sólido Ogawa-Kudoh / Löwenstein-Jensen ou Meio Líquido Automatizado MGIT)</strong></td>
      <td>Isolamento do bacilo viável por multiplicação. Detecta cargas baixas (10 a 100 bacilos/mL). Permite a realização do <strong>Teste de Sensibilidade aos Antimicrobianos (TSA)</strong>.</td>
      <td>Cultura sólida: 14 a 42 dias. Cultura líquida: 7 a 21 dias. Padrão-ouro microbiológico absoluto.</td>
      <td>Indicada em: suspeita de falência terapêutica, retratamento, populações vulneráveis, pacientes HIV positivos, profissionais de saúde, crianças, casos com TRM-TB com resistência à rifampicina detectada e espécimes extrapulmonares.</td>
    </tr>
  </tbody>
</table>
`
    },
    {
      id: 'esquema-basico-ripe-farmacologia-toxicidades',
      title: '3. Tratamento Farmacológico: Esquema Básico RIPE e Toxicidades Críticas',
      body_html: `
<h3>Regime Terapêutico Padronizado do Ministério da Saúde: Esquema RIPE</h3>
<p>O tratamento da tuberculose ativa no Brasil é padronizado nacionalmente, fornecido gratuitamente e com exclusividade pelo SUS, e administrado prioritariamente sob a modalidade de <strong>Tratamento Diretamente Observado (TDO)</strong> na Atenção Primária para garantir adesão e evitar emergência de bacilos multirresistentes (TB-MDR). Para indivíduos com 10 anos ou mais de idade, utiliza-se a apresentação de comprimidos em <strong>Dose Fixa Combinada (DFC 4 em 1 e DFC 2 em 1)</strong> ajustada por faixas de peso corporal:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Fase do Tratamento</th>
      <th>Duração Temporal</th>
      <th>Fármacos Utilizados e Siglas Oficiais</th>
      <th>Mecanismo de Ação e Papel Clínico Específico</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Fase Intensiva (Fase de Ataque)</strong></td>
      <td><strong>2 meses</strong> (60 doses diárias)</td>
      <td><strong>RIPE:</strong><br>• <strong>R</strong>ifampicina (R) - 150 mg<br>• <strong>I</strong>soniazida (I) - 75 mg<br>• <strong>P</strong>irazinamida (P) - 400 mg<br>• <strong>E</strong>tambutol (E) - 275 mg<br>(Apresentação DFC 4 em 1: 4 comprimidos/dia para peso &ge; 50 kg em jejum).</td>
      <td>Ação bactericida potente rápida para reduzir a carga bacilar, esterilizar o escarro, eliminar rapidamente a transmissão comunitária (habitualmente em 15 dias de tratamento correto) e prevenir seleção de mutantes resistentes.</td>
    </tr>
    <tr>
      <td><strong>Fase de Manutenção</strong></td>
      <td><strong>4 meses</strong> (120 doses diárias)</td>
      <td><strong>RI:</strong><br>• <strong>R</strong>ifampicina (R) - 300 mg<br>• <strong>I</strong>soniazida (I) - 150 mg<br>(Apresentação DFC 2 em 1: 2 cápsulas/dia para peso &ge; 50 kg).</td>
      <td>Ação esterilizante prolongada para eliminar bacilos de multiplicação intermitente e intracelulares dormentes, prevenindo recaídas e recidivas da doença.</td>
    </tr>
  </tbody>
</table>
<p><em>Exceção Fundamental:</em> Na <strong>Tuberculose Meníngea (Meningite Tuberculosa) e Osteoarticular</strong>, a fase de ataque é de 2 meses com RHZE e a fase de manutenção é prolongada para <strong>10 meses com RH (total de 12 meses)</strong>, associando-se corticoterapia sistêmica (Prednisona 1 a 2 mg/kg/dia ou Dexametasona IV) nas primeiras 4 a 8 semanas com desmame gradual.</p>

<h3>Manejo das Toxicidades Farmacológicas e Hepatotoxicidade Induzida por Drogas (DILI)</h3>
<p>Os principais efeitos colaterais e sua condução segundo as normas do Ministério da Saúde incluem:</p>
<ul>
  <li><strong>Rifampicina (R):</strong> Coloração avermelhada/alaranjada inócua da urina, suor e lágrimas (orientar o paciente previamente para evitar pânico); indução enzimática potente do citocromo P450 (reduz eficácia de anticoncepcionais hormonais, varfarina, antirretrovirais e anticonvulsivantes); intolerância gástrica e reações imunoalérgicas raras (plaquetopenia, anemia hemolítica, nefrite intersticial).</li>
  <li><strong>Isoniazida (I):</strong> Neuropatia periférica periférica sensitiva por antagonismo com a vitamina B6 (piridoxina). Deve-se prescrever <strong>Piridoxina profilática (50 mg/dia)</strong> em gestantes, etilistas, diabéticos e renais crônicos.</li>
  <li><strong>Pirazinamida (P):</strong> O fármaco mais hepatotóxico do esquema RIPE. Pode provocar hiperuricemia assintomática (artralgia sem gota; não exige suspensão do esquema, manejada com hidratação e analgésicos).</li>
  <li><strong>Etambutol (E):</strong> <strong>Neurite óptica retrobulbar dose-dependente</strong>, manifestada por perda precoce da acuidade visual e discromatopsia (perda da discriminação entre as cores verde e vermelho). Exige suspensão imediata e definitiva do etambutol ao primeiro sinal de alteração visual.</li>
</ul>

<h3>Protocolo de Hepatotoxicidade Grave (Critérios de Suspensão Imediata do RIPE)</h3>
<p>Deve-se suspender imediatamente todos os quatro fármacos do esquema RIPE quando:</p>
<ol>
  <li>Elevação de transaminases (AST/TGO ou ALT/TGP) <strong>&gt; 5 vezes o limite superior da normalidade (LSN)</strong> na ausência de sintomas;</li>
  <li>Elevação de transaminases <strong>&gt; 3 vezes o LSN associada a sintomas dispépticos</strong> (náuseas, vômitos, dor em hipocôndrio direito, anorexia);</li>
  <li><strong>Icterícia clínica evidente ou Bilirrubina Total &gt; 2,0 mg/dL</strong>.</li>
</ol>
<p><em>Conduta:</em> Suspender todo o esquema RIPE. Coletar sorologias virais e função hepática semanal até normalização ou queda das transaminases para &lt; 2 vezes o LSN e clareamento da icterícia. Em seguida, procede-se à <strong>reintrodução sequencial e escalonada dos fármacos</strong>: 1º Rifampicina (com ou sem etambutol); após 3 a 7 dias sem elevação enzimática, 2º Isoniazida; após mais 3 a 7 dias estáveis, 3º Pirazinamida. Se a toxicidade reaparecer com algum fármaco, este é definitivamente excluído do esquema e substituído por fármaco de segunda linha (Levofloxacino).</p>
`
    },
    {
      id: 'co-infeccao-tb-hiv-iltb',
      title: '4. Coinfecção TB-HIV e Manejo da Infecção Latente (ILTB)',
      body_html: `
<h3>Coinfecção Tuberculose e HIV: Quando Iniciar a TARV e Como Evitar a SIRI</h3>
<p>A tuberculose é a principal causa infecciosa de óbito em pessoas vivendo com HIV (PVHIV) no mundo. A abordagem da coinfecção obedece a regras cronológicas estritas do Ministério da Saúde para prevenir a <strong>Síndrome Inflamatória de Reconstituição Imune (SIRI / IRIS)</strong>:</p>
<ul>
  <li><strong>Prioridade de Início:</strong> Sempre iniciar o tratamento da tuberculose <strong>imediatamente</strong> após o diagnóstico;</li>
  <li><strong>Momento de Início da Terapia Antirretroviral (TARV):</strong>
    <ul>
      <li>Se contagem de <strong>CD4 &lt; 50 células/mm³</strong>: Iniciar a TARV precocemente em até <strong>2 semanas</strong> após o início do esquema anti-TB (reduz mortalidade, sob vigilância estrita para SIRI);</li>
      <li>Se contagem de <strong>CD4 &ge; 50 células/mm³</strong>: Iniciar a TARV até o final da <strong>8ª semana</strong> de tratamento anti-TB (habitualmente no início da fase de manutenção com RI);</li>
      <li><strong>Meningite Tuberculosa em PVHIV:</strong> Exceção crítica: NUNCA iniciar a TARV precocemente. A TARV deve ser postergada para após 4 a 6 semanas de tratamento anti-TB devido ao risco letal de edema cerebral e hipertensão intracraniana fulminante por SIRI meníngea.</li>
    </ul>
  </li>
  <li><strong>Interação Medicamentosa Rifampicina x TARV:</strong> A Rifampicina reduz dramaticamente os níveis séricos do Dolutegravir (DTG) por indução do CYP3A4 e UGT1A1. A conduta mandatória no Brasil é o <strong>aumento da dose de Dolutegravir para 50 mg de 12/12h</strong> (em vez de 1x/dia), mantendo essa posologia dobrada até 15 dias após o término da rifampicina.</li>
</ul>

<h3>Indicações e Esquemas de Tratamento da Infecção Latente (ILTB)</h3>
<p>O tratamento da ILTB visa impedir a progressão para tuberculose ativa. Está formalmente indicado em:</p>
<ul>
  <li>Contatos domiciliares de casos bacilíferos com <strong>Prova Tuberculínica (PT) &ge; 5 mm ou IGRA positivo</strong> (após exclusão clínica e radiológica de TB ativa);</li>
  <li>PVHIV com PT &ge; 5 mm, IGRA positivo, ou história de contato com TB, ou CD4 &le; 350 células/mm³ independentemente do teste;</li>
  <li>Candidatos ao uso de imunobiológicos anti-TNF-alfa ou corticoterapia imunossupressora prolongada (&gt; 15 mg/dia de prednisona por &gt; 1 mês) com PT &ge; 5 mm;</li>
  <li>Convertentes recentes da PT (aumento &ge; 10 mm no segundo teste dentro de 1 a 2 anos).</li>
</ul>
<p><em>Esquemas Preferenciais no SUS:</em></p>
<ol>
  <li><strong>Esquema 3HP (Rifapentina + Isoniazida semanal por 3 meses - 12 doses semanais):</strong> Padrão-ouro preferencial por conveniência, alta adesão e menor hepatotoxicidade;</li>
  <li><strong>Isoniazida isolada diária por 9 meses (270 doses)</strong> ou 6 meses (180 doses);</li>
  <li><strong>Rifampicina isolada diária por 4 meses (120 doses)</strong>: preferível em intolerância à isoniazida, hepatopatas e crianças menores de 10 anos.</li>
</ol>
`
    },
    {
      id: 'casos-clinicos-questoes-tb',
      title: '5. Casos Clínicos Comentados e Questões de Concursos',
      body_html: `
<h3>Casos Clínicos Comentados</h3>
<div class="book-case">
  <h4>Caso Clínico 1: Sintomático Respiratório com Resistência à Rifampicina no TRM-TB</h4>
  <p><strong>História:</strong> Homem de 44 anos, morador de rua e etilista, procura a Unidade Básica de Saúde com tosse produtiva e hemoptoicos há 4 semanas, febre vespertina diária e perda ponderal de 8 kg. A equipe colhe escarro e realiza o Teste Rápido Molecular (TRM-TB). O laudo retorna em 2 horas: 'Detectável complexo Mycobacterium tuberculosis; Resistência à Rifampicina DETECTADA'.</p>
  <p><strong>Discussão e Conduta:</strong> A detecção de resistência à rifampicina pelo TRM-TB indica suspeita imediata de <strong>Tuberculose Multirresistente (TB-MDR)</strong> (pois mais de 90% das cepas resistentes à rifampicina são concomitantemente resistentes à isoniazida). A conduta mandatória é: <strong>NÃO iniciar o esquema básico RIPE</strong>. Deve-se coletar imediatamente uma nova amostra de escarro para <strong>Cultura e Teste de Sensibilidade aos Antimicrobianos (TSA)</strong> e teste molecular para drogas de segunda linha. O paciente deve ser encaminhado urgentemente ao Centro de Referência para início de esquema especial padronizado para TB resistente (contendo Bedaquilina, Linezolida, Levofloxacino e Clofazimina) sob Tratamento Diretamente Observado (TDO).</p>
</div>

<h3>Questões Comentadas de Residência Médica</h3>
<div class="book-question">
  <h4>Questão Comentada 1: ENARE 2024 — Monitoramento Terapêutico e Controle de Cura da TB</h4>
  <p><strong>Enunciado:</strong> Homem de 35 anos iniciou tratamento para tuberculose pulmonar bacilífera há 4 semanas com esquema RIPE em DFC. Comparece à consulta de acompanhamento na Unidade Básica de Saúde assintomático, relatando melhora do apetite e ganho de 3 kg. Qual o exame obrigatório preconizado pelo Ministério da Saúde para o monitoramento mensal da resposta terapêutica ao longo de todo o tratamento e qual exame NÃO deve ser utilizado para essa finalidade?</p>
  <p>A) Obrigatória a Baciloscopia Direta mensal do escarro; proscrito o uso do TRM-TB (GeneXpert) para controle de cura.<br>
  B) Obrigatório o TRM-TB mensal; proscrita a baciloscopia de escarro.<br>
  C) Obrigatória a Tomografia Computadorizada de tórax mensal; proscrita a cultura de escarro.<br>
  D) Obrigatória a Prova Tuberculínica (PPD) bimestral; proscrita a radiografia de tórax.</p>
  <p><strong>Gabarito Oficial: Alternativa A.</strong></p>
  <p><strong>Comentário Detalhado:</strong> Segundo o Manual de Recomendações para o Controle da Tuberculose no Brasil (Ministério da Saúde), o exame preconizado para o <strong>controle mensal de cura é a Baciloscopia Direta do Escarro</strong>, realizada todo mês até o 6º mês. O <strong>TRM-TB (GeneXpert) é formalmente CONTRAINDICADO para controle de cura</strong> e monitoramento do tratamento, pois baseia-se na detecção de DNA micobacteriano por PCR, mantendo-se positivo por meses ou anos após a morte dos bacilos, detectando fragmentos de material genético inviável e gerando falsos diagnósticos de falência terapêutica.</p>
</div>
`
    }
  ],
  references: [
    { label: 'Ministério da Saúde - Manual de Recomendações para o Controle da Tuberculose no Brasil (2024)', url: 'https://www.gov.br/saude' },
    { label: 'Sociedade Brasileira de Pneumologia e Tisiologia (SBPT) - Diretrizes sobre Tuberculose', url: 'https://sbpt.org.br' },
    { label: 'WHO Consolidated Guidelines on Tuberculosis - Treatment of Drug-Susceptible and Drug-Resistant TB', url: 'https://www.who.int' }
  ]
};

console.log('Compilando Grupo A do Bloco 3...');
saveBook(book062);
saveBook(book056);
saveBook(book061);
console.log('Grupo A concluído com sucesso!');
