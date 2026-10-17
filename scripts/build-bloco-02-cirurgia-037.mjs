import { saveBook } from './bloco-02-utils.mjs';

const book = {
  slug: 'infeccao-do-sitio-cirurgico-e-antibioticoprofilaxia',
  title: 'Infecção do Sítio Cirúrgico e Antibioticoprofilaxia',
  area: 'Cirurgia Geral',
  materia: 'Infecções Cirúrgicas e Segurança Perioperatória',
  description: 'Tratado completo sobre Infecção do Sítio Cirúrgico (ISC) e Antibioticoprofilaxia Perioperatória: critérios diagnósticos oficiais CDC/NHSN e ANVISA, microbiologia por sítio, classificação das cirurgias por potencial de contaminação, bundles de prevenção da OMS/ANVISA, farmacocinética e repiques de antimicrobianos, diagnóstico da febre pós-operatória e casos comentados.',
  sections: [
    {
      id: 'definicoes-criterios-anvisa-cdc-nhsn',
      title: '1. Critérios Diagnósticos Oficiais: Classificação da ISC segundo ANVISA e CDC/NHSN',
      body_html: `
<h3>Definição Epidemiológica e Impacto da Infecção do Sítio Cirúrgico</h3>
<p>A <strong>Infecção do Sítio Cirúrgico (ISC)</strong> é definida pela Agência Nacional de Vigilância Sanitária (ANVISA) e pelo <em>Centers for Disease Control and Prevention</em> (CDC/NHSN) como a infecção relacionada a um procedimento cirúrgico com ou sem colocação de implante/prótese, manifestando-se nos tecidos manipulados durante o ato operatório. No Brasil e no mundo, a ISC ocupa historicamente a segunda ou terceira posição entre todas as Infecções Relacionadas à Assistência à Saúde (IRAS), representando entre 14% e 18% do total de infecções hospitalares e configurando a principal causa de readmissão hospitalar não planejada em pacientes cirúrgicos. O desenvolvimento de uma ISC eleva a mortalidade pós-operatória em duas a três vezes, prolonga a internação hospitalar em média de 7 a 14 dias adicionais e quadruplica os custos assistenciais diretos.</p>
<p>Os critérios de vigilância epidemiológica diferenciam rigorosamente as infecções cirúrgicas em <strong>três categorias anatômicas</strong>, cujos prazos e requisitos diagnósticos são alvos frequentes em provas de residência médica e concursos públicos:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Categoria Anatômica da ISC</th>
      <th>Planos Teciduais Acometidos</th>
      <th>Prazo de Vigilância Epidemiológica</th>
      <th>Critérios Diagnósticos Obrigatórios (Basta 1)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>1. ISC Incisional Superficial</strong></td>
      <td>Envolve <strong>apenas a pele e o tecido celular subcutâneo (TCSC)</strong> da incisão cirúrgica.</td>
      <td>Ocorre em até <strong>30 dias</strong> após a data do procedimento cirúrgico (mesmo se houver prótese/implante).</td>
      <td>• Drenagem purulenta da incisão superficial;<br>• Isolamento de microrganismo em cultura de fluido ou tecido obtido assepticamente da incisão superficial;<br>• Abertura deliberada da incisão superficial pelo cirurgião na presença de pelo menos um sinal flogístico local (dor, edema local, calor ou hiperemia), a menos que a cultura seja negativa;<br>• Diagnóstico clínico de ISC superficial firmado pelo cirurgião assistente.</td>
    </tr>
    <tr>
      <td><strong>2. ISC Incisional Profunda</strong></td>
      <td>Envolve os planos anatômicos profundos da parede: <strong>fáscia/aponeurose e músculo</strong>.</td>
      <td>Ocorre em até <strong>30 dias</strong> após o procedimento sem implante, ou em até <strong>90 dias</strong> se houver colocação de <strong>prótese ou implante permanente</strong> (ex.: tela de hérnia, prótese vascular, prótese ortopédica, válvula cardíaca).</td>
      <td>• Drenagem purulenta proveniente dos planos profundos da incisão (fáscia/músculo);<br>• Deiscência espontânea da fáscia profunda ou abertura deliberada pelo cirurgião quando o paciente apresenta febre (> 38 °C), dor local ou dor à palpação profunda, a menos que a cultura seja negativa;<br>• Abscesso ou evidência de infecção envolvendo os planos profundos identificada em reoperação, exame histopatológico ou exame de imagem (TC, USG).</td>
    </tr>
    <tr>
      <td><strong>3. ISC de Órgão / Espaço</strong></td>
      <td>Envolve qualquer parte da anatomia (órgãos ou cavidades) <strong>manipulada ou aberta durante a cirurgia</strong> além da incisão da parede.</td>
      <td>Ocorre em até <strong>30 dias</strong> após o procedimento sem implante, ou em até <strong>90 dias</strong> se houver colocação de <strong>prótese ou implante</strong>.</td>
      <td>• Drenagem purulenta através de dreno colocado na cavidade/órgão por contra-abertura;<br>• Isolamento de microrganismo em cultura de fluido ou tecido colhido assepticamente do órgão/espaço;<br>• Abscesso ou evidência de infecção de órgão/espaço identificada em reoperação, exame histopatológico ou imagem (ex.: abscesso subfrênico após gastrectomia, empiema pleural após toracotomia, peritonite purulenta por fístula anastomótica).</td>
    </tr>
  </tbody>
</table>

<h3>Armadilhas Diagnósticas de Prova (O que NÃO é considerado ISC)</h3>
<ul>
  <li><strong>Ponto de Sutura Inflamado com Micropústula Localizada:</strong> A inflamação mínima e o rubor confinados estritamente ao orifício do ponto de sutura (reação de corpo estranho ao fio de sutura) <strong>NÃO</strong> preenchem critério para ISC incisional superficial;</li>
  <li><strong>Infecção em Queimaduras e Feridas Traumáticas Abertas Prévias:</strong> A infecção secundária de uma área cruenta de queimadura ou de uma ferida traumática aberta que não foi sintetizada primariamente é categorizada como infecção de pele e partes moles, e não como infecção de sítio cirúrgico operatório;</li>
  <li><strong>Infecção da Episiotomia ou Circuncisão Neonatal:</strong> Por convenção epidemiológica internacional do NHSN/CDC, as infecções pós-episiotomia no parto vaginal e pós-circuncisão no recém-nascido são notificadas em categorias específicas de vigilância reprodutiva/urológica e não no formulário padrão de ISC hospitalar;</li>
  <li><strong>Celulite Sem Secreção Purulenta:</strong> A presença de hiperemia peri-incisional discreta nas primeiras 24 a 48 horas pode representar apenas resposta inflamatória fisiológica ao trauma cirúrgico (fase exsudativa do reparo tecidual), exigindo acompanhamento seriado antes de ser rotulada e tratada precocemente com antibióticos sistêmicos.</li>
</ul>
`
    },
    {
      id: 'fisiopatologia-infeccao-cirurgica-biofilme',
      title: '2. Fisiopatologia da Infecção Cirúrgica, Inóculo Bacteriano e Formação de Biofilmes',
      body_html: `
<h3>A Equação Biofísica da Infecção de Altemeier e Elek</h3>
<p>A ocorrência de uma infecção no sítio operatório resulta da ruptura do equilíbrio biológico entre as defesas imunológicas do hospedeiro e a contaminação microbiana introduzida durante a intervenção. Essa interação foi expressa classicamente por <strong>Altemeier</strong> na seguinte fórmula matemática conceitual:</p>
<div class="formula">Risco de Infecção = (Inóculo Bacteriano × Fatores de Virulência) / Defesa do Hospedeiro (Local e Sistêmica)</div>
<p>Em tecidos saudáveis com perfusão vascular íntegra e sem corpo estranho, os experimentos seminais de <strong>Elek e Conen</strong> demonstraram que são necessárias no mínimo <strong>10⁵ unidades formadoras de colônias (UFC) de bactérias por grama de tecido</strong> para vencer a fagocitose dos neutrófilos e macrófagos teciduais e desencadear infecção clínica purulenta. Contudo, essa relação sofre alterações drásticas na presença de alterações locais no microambiente da ferida:</p>
<ul>
  <li><strong>Presença de Corpo Estranho (Fio de Sutura, Tela, Prótese, Dreno):</strong> A presença de um simples fragmento de fio de sutura multifilamentar de seda ou categute <strong>reduz a dose infectante necessária em dez mil vezes</strong>: apenas <strong>10² UFC/g de tecido</strong> tornam-se suficientes para deflagrar supuração profunda;</li>
  <li><strong>Tecido Desvitalizado, Isquemia e Gordura Adiposa Esmagada:</strong> O tecido necrótico e os hematomas atuam como escudo protetor contra o sistema complemento e as imunoglobulinas, além de servirem como meio de cultura enriquecido com ferro livre e nutrientes para proliferação bacteriana exponencial;</li>
  <li><strong>Espaço Morto e Coleções Serosas (Seroma):</strong> O acúmulo de fluido seroso estagnado impede a aposição anatômica dos planos teciduais, cria ambiente anaeróbio de baixa tensão de oxigênio ($pO_2$ tecidual reduzida) e reduz a capacidade de <em>burst oxidativo</em> (explosão respiratória) dos neutrófilos polimorfonucleares.</li>
</ul>

<h3>A Biologia dos Biofilmes em Implantes Cirúrgicos</h3>
<p>Quando microrganismos colonizadores entram em contato com superfícies abióticas (telas de polipropileno, próteses ortopédicas de titânio, enxertos vasculares de PTFE ou Dacron, válvulas cardíacas mecânicas e biológicas, cateteres venosos centrais e drenos cirúrgicos), eles abandonam o estado planctônico (livre) e iniciam a formação de <strong>biofilmes microbianos estruturados</strong>. Esse processo envolve quatro etapas sequenciais:</p>
<ol>
  <li><strong>Adesão Inicial Reversível e Irreversível:</strong> As bactérias ligam-se às proteínas da matriz extracelular do hospedeiro (fibronectina, fibrinogênio, colágeno) adsorvidas na superfície do implante, mediada por adesinas bacterianas e MSCRAMMs (<em>Microbial Surface Components Recognizing Adhesive Matrix Molecules</em>);</li>
  <li><strong>Proliferação Celular e Secreção de Matriz Polimérica Extracelular (EPS):</strong> As bactérias secretam uma matriz gelatinosa e hidratada composta por exopolissacarídeos, proteínas estruturais e DNA extracelular (eDNA), formando uma barreira mecânica intransponível;</li>
  <li><strong>Maturação do Biofilme e Comunicação Intercelular (Quorum Sensing):</strong> As bactérias estabelecem canais de água e nutrientes, reduzem sua taxa metabólica basal (entrando em estado de dormência funcional ou células <em>persisters</em>) e comunicam-se quimicamente por pequenas moléculas autoindutoras;</li>
  <li><strong>Desprendimento e Disseminação Hematogênica:</strong> Fragmentos do biofilme destacam-se periodicamente, liberando bactérias planctônicas na circulação sistêmica e provocando febre recorrente e bacteremia persistente.</li>
</ol>
<p><strong>Implicações clínicas do biofilme:</strong> As bactérias no interior de um biofilme tornam-se de <strong>100 a 1.000 vezes mais resistentes aos antimicrobianos sistêmicos</strong> do que quando em estado livre, além de ficarem totalmente protegidas da fagocitose por neutrófilos e da opsonização por anticorpos. Por essa razão, a antibioticoterapia sistêmica isolada <strong>nunca erradica uma ISC com biofilme maduro em prótese</strong>; a cura clínica exige obrigatoriamente a <strong>remoção cirúrgica do implante contaminado</strong> associada ao desbridamento radical dos tecidos adjacentes.</p>
`
    },
    {
      id: 'classificacao-potencial-contaminacao-cirurgias',
      title: '3. Classificação das Cirurgias por Potencial de Contaminação e Taxas de Infecção',
      body_html: `
<h3>As Quatro Classes Tradicionais de Ferida Operatória</h3>
<p>A estratificação do potencial de contaminação bacteriana intraoperatória foi estabelecida pelo <em>National Academy of Sciences / National Research Council</em> (NRC) e é padronizada no Brasil pelo Ministério da Saúde e ANVISA. Essa classificação reflete a probabilidade estatística basal de desenvolvimento de ISC na ausência de antibioticoprofilaxia, norteando a indicação formal de prevenção farmacológica:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Classe de Contaminação</th>
      <th>Definição Fisiopatológica e Critérios Técnicos</th>
      <th>Exemplos Clássicos de Prova</th>
      <th>Taxa Histórica de ISC (Sem Profilaxia)</th>
      <th>Indicação de Antibioticoprofilaxia</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Classe I: Limpa</strong></td>
      <td>Cirurgias eletivas realizadas em <strong>pele íntegra</strong>, sem trauma prévio, sob técnica asséptica rigorosa, <strong>SEM penetração nos tratos respiratório, alimentar/digestivo, genital ou urinário</strong>, e sem processo inflamatório ou infeccioso prévio. Fechamento primário obrigatório.</td>
      <td>• Herniorrafia inguinal eletiva sem tela;<br>• Mastectomia / biópsia de mama;<br>• Tireoidectomia eletiva;<br>• Artroplastia eletiva / cirurgia ortopédica fechada;<br>• Revascularização do miocárdio (cirurgia cardíaca).</td>
      <td><strong>&lt; 1% a 2%</strong></td>
      <td><strong>NÃO indicada por rotina</strong>, EXCETO se: colocação de <strong>prótese ou implante permanente</strong> (tela de hérnia, prótese articular, enxerto vascular), cirurgias <strong>cardíacas e neurocirurgias</strong>, ou pacientes imunossuprimidos graves.</td>
    </tr>
    <tr>
      <td><strong>Classe II: Potencialmente Contaminada (Limpa-Contaminada)</strong></td>
      <td>Cirurgias eletivas nas quais os <strong>tratos respiratório, digestivo, genital ou urinário são abertos sob condições controladas</strong>, sem extravasamento grosseiro de conteúdo ou infecção prévia. Inclui cirurgias biliares e do trato orofaríngeo sob técnica controlada.</td>
      <td>• Colecistectomia eletiva (aberta ou videolaparoscópica);<br>• Gastrectomia eletiva;<br>• Colectomia eletiva com preparo;<br>• Apendicectomia em apendicite sem supuração/perfuração (fase catarral);<br>• Histerectomia vaginal ou abdominal eletiva;<br>• Ressecção transuretral de próstata (RTU) com urina estéril prévia.</td>
      <td><strong>3% a 10%</strong></td>
      <td><strong>INDICAÇÃO UNIVERSAL</strong> de antibioticoprofilaxia cirúrgica (dose única pré-incisão ou com repiques intraoperatórios).</td>
    </tr>
    <tr>
      <td><strong>Classe III: Contaminada</strong></td>
      <td>Cirurgias em <strong>feridas traumáticas abertas recentes (&lt; 4 a 6 horas)</strong>, intervenções com <strong>falha maior de técnica asséptica</strong> (ex.: quebra de esterilidade de campo, massagem cardíaca aberta de urgência) ou cirurgias do TGI com <strong>extravasamento grosseiro de conteúdo de víscera oca</strong> na cavidade sem peritonite bacteriana purulenta prévia.</td>
      <td>• Colectomia com derrame fecal intraoperatório importante;<br>• Colecistectomia com bile francamente infectada e extravasamento de cálculos/lama biliar;<br>• Ferimento perfurocortante abdominal recente com menos de 4 horas sem peritonite estabelecida;<br>• Cirurgia do trato biliar ou urinário na presença de bile ou urina infectada.</td>
      <td><strong>10% a 20%</strong></td>
      <td><strong>INDICAÇÃO UNIVERSAL</strong> de antibioticoterapia profilática ou transição imediata para terapêutica conforme achados cirúrgicos.</td>
    </tr>
    <tr>
      <td><strong>Classe IV: Infectada (Suja)</strong></td>
      <td>Procedimentos cirúrgicos realizados em <strong>feridas traumáticas com tratamento tardio (&gt; 4 a 6 horas)</strong> com tecido desvitalizado, ou intervenções na presença de <strong>infecção bacteriana clínica purulenta ativa prévia</strong> ou <strong>víscera oca perfurada</strong>. Os microrganismos causadores da ISC pós-operatória já estavam presentes no sítio antes da incisão.</td>
      <td>• Apendicite aguda perfurada com peritonite fecal ou abscesso apendicular retrocecal;<br>• Diverticulite aguda perfurada com peritonite fecal difusa (Hinchey IV);<br>• Drenagem de abscesso isquiorretal ou subfrênico;<br>• Úlcera péptica perfurada há mais de 24 horas com peritonite franca;<br>• Desbridamento de fasciíte necrosante / gangrena de Fournier.</td>
      <td><strong>20% a 40% (ou mais)</strong></td>
      <td><strong>NÃO É PROFILAXIA, É TRATAMENTO!</strong> Prescreve-se <strong>antibioticoterapia terapêutica de pleno espectro</strong> por tempo clinicamente adequado (habitualmente 4 a 7 dias após controle eficaz de fonte).</td>
    </tr>
  </tbody>
</table>
`
    },
    {
      id: 'microbiologia-especifica-por-sitio-cirurgico',
      title: '4. Microbiologia das Infecções Cirúrgicas conforme a Topografia Anatômica',
      body_html: `
<h3>Origem da Flora Contaminante na Cirurgia</h3>
<p>Em mais de 80% das infecções de sítio cirúrgico, o microrganismo causador provém da <strong>própria microbiota endógena da pele ou das mucosas do paciente</strong> colonizadas no momento da incisão. A contaminação exógena (a partir do ar ambiente do centro cirúrgico, instrumentos cirúrgicos mal esterilizados ou mãos da equipe operatória) é menos comum nas técnicas modernas de fluxo laminar e barreiras estéreis, embora seja a principal fonte nos surtos intra-hospitalares por patógenos multirresistentes.</p>
<p>A compreensão da microbiota predominante em cada sítio operatório é a chave biológica para a escolha precisa do antibiótico profilático:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Topografia Cirúrgica</th>
      <th>Microbiota Predominante Esperada</th>
      <th>Microrganismos Patogênicos Típicos</th>
      <th>Esquema de Antibioticoprofilaxia de Escolha</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Cirurgias Cardíacas, Vasculares, Torácicas Não Pulmonares e Neurocirurgias</strong></td>
      <td>Flora cutânea residente e transitória (Gram-positivos)</td>
      <td>• <em>Staphylococcus aureus</em> (sensível e MRSA);<br>• <em>Staphylococcus epidermidis</em> e outros estafilococos coagulase-negativos (adesão e biofilme em próteses e fios);<br>• <em>Streptococcus pneumoniae</em> e estreptococos do grupo viridans.</td>
      <td><strong>Cefazolina</strong> 2 g IV na indução.<br><em>Se hospital com alta prevalência de MRSA (&gt; 20–30%) ou colonização conhecida por MRSA:</em> <strong>Vancomicina</strong> 15 mg/kg IV iniciada 60–120 min antes.</td>
    </tr>
    <tr>
      <td><strong>Cirurgias Ortopédicas Limpas com Implante (Artroplastias, Fixação de Fraturas)</strong></td>
      <td>Flora cutânea Gram-positiva</td>
      <td>• <em>Staphylococcus aureus</em>;<br>• <em>Staphylococcus epidermidis</em>;<br>• <em>Cutibacterium (Propionibacterium) acnes</em> (especialmente cirurgias do ombro).</td>
      <td><strong>Cefazolina</strong> 2 g IV (3 g se &ge; 120 kg) dose única ou mantida por no máximo 24 horas pós-operatórias.</td>
    </tr>
    <tr>
      <td><strong>Cirurgia Gastrointestinal Alta (Esôfago, Estômago, Duodeno, Vias Biliares)</strong></td>
      <td>Bacilos Gram-negativos entéricos, cocos Gram-positivos e anaeróbios orofaríngeos</td>
      <td>• <em>Escherichia coli</em>;<br>• <em>Klebsiella pneumoniae</em>;<br>• <em>Enterococcus faecalis</em>;<br>• <em>Streptococcus</em> spp.;<br>• Estafilococos;<br>• Anaeróbios em baixa concentração (exceto se obstrução ou acloridria).</td>
      <td><strong>Cefazolina</strong> 2 g IV.<br><em>Se estômago hipoclorídrico, obstrução gastroduodenal ou sangramento tumoral:</em> <strong>Cefazolina + Metronidazol</strong> ou Ampicilina/Sulbactam.</td>
    </tr>
    <tr>
      <td><strong>Cirurgia Colorretal, Apêndice Cecal e Intestino Delgado Baixo</strong></td>
      <td>Flora mista fecaloide exuberante: bacilos Gram-negativos entéricos + anaeróbios estritos (relação anaeróbio:aeróbio de 1.000:1)</td>
      <td>• <strong>Bacteroides fragilis</strong> e outras espécies de <em>Bacteroides</em> (anaeróbio obrigatório produtor de abscessos);<br>• <em>Escherichia coli</em>;<br>• <em>Klebsiella</em> spp., <em>Proteus</em> spp., <em>Enterobacter</em> spp.;<br>• <em>Enterococcus faecalis</em> e <em>E. faecium</em>.</td>
      <td><strong>Cefazolina</strong> 2 g IV + <strong>Metronidazol</strong> 500 mg IV (ou Cefoxitina 2 g IV isolada).<br><em>Em cirurgia colorretal eletiva:</em> associar preparo mecânico com antibióticos orais não absorvíveis (Neomicina + Metronidazol VO na véspera).</td>
    </tr>
    <tr>
      <td><strong>Cirurgia Ginecológica e Obstétrica (Histerectomia, Cesariana)</strong></td>
      <td>Flora vaginal mista: Gram-negativos entéricos, anaeróbios e estreptococos</td>
      <td>• <em>Escherichia coli</em>;<br>• <em>Bacteroides</em> spp., <em>Prevotella</em> spp., <em>Peptostreptococcus</em>;<br>• <em>Streptococcus agalactiae</em> (GBS);<br>• <em>Enterococcus</em> spp.</td>
      <td><strong>Cefazolina</strong> 2 g IV na indução (na cesariana, administrar <strong>antes da incisão da pele</strong>, e não após o clampeamento do cordão, conforme diretriz atual).</td>
    </tr>
    <tr>
      <td><strong>Cirurgia Urológica com Entrada no Trato Urinário</strong></td>
      <td>Uropatógenos Gram-negativos e enterococos</td>
      <td>• <em>Escherichia coli</em>;<br>• <em>Klebsiella pneumoniae</em>;<br>• <em>Proteus mirabilis</em>;<br>• <em>Pseudomonas aeruginosa</em>;<br>• <em>Enterococcus faecalis</em>.</td>
      <td><strong>Cefazolina</strong> 2 g IV ou <strong>Ciprofloxacino</strong> 400 mg IV ou Gentamicina (dependendo do perfil de resistência local e resultado da urocultura prévia estéril obrigatória).</td>
    </tr>
  </tbody>
</table>
`
    },
    {
      id: 'fatores-risco-estratificacao-indice-nnis',
      title: '5. Fatores de Risco do Hospedeiro e Estratificação pelo Índice de Risco Cirúrgico (NNIS / NHSN)',
      body_html: `
<h3>Fatores de Risco Intrínsecos e Extrínsecos</h3>
<p>O desenvolvimento de ISC depende da conjugação de fatores de risco não modificáveis e potencialmente modificáveis, divididos didaticamente em intrínsecos (do paciente) e extrínsecos (do ambiente e do ato cirúrgico):</p>
<ul>
  <li><strong>Fatores Intrínsecos do Hospedeiro:</strong>
    <ul>
      <li><em>Extremos de idade:</em> Neonatos prematuros e idosos fragilizados apresentam imunossenescência e menor perfusão microvascular periférica;</li>
      <li><em>Diabetes Mellitus e Hiperglicemia Perioperatória:</em> A glicemia sérica &ge; 180–200 mg/dL no período perioperatório inibe diretamente a quimiotaxia, diapedese e fagocitose mediada pelos neutrófilos, elevando em três a quatro vezes o risco de ISC;</li>
      <li><em>Obesidade (IMC &ge; 30 kg/m² e especialmente &ge; 40 kg/m²):</em> O tecido adiposo é hipovascularizado e hipóxico, predispõe à formação de grandes seromas e espaços mortos, dificulta a exposição cirúrgica e exige aumento da dose de cefazolina para 3 g pelo maior volume de distribuição;</li>
      <li><em>Tabagismo Ativo:</em> O monóxido de carbono reduz a capacidade de transporte de $O_2$ pela hemoglobina e a nicotina promove vasoconstrição microvascular tecidual intensa; a cessação do tabagismo por no mínimo 4 a 6 semanas antes de cirurgias eletivas reduz significativamente o risco de ISC;</li>
      <li><em>Desnutrição Calórico-Proteica Grave e Hipoalbuminemia:</em> Albumina sérica &lt; 3,0 g/dL compromete a síntese de colágeno, fibroblastos e componentes do sistema imune humoral;</li>
      <li><em>Colonização Nasal por Staphylococcus aureus:</em> Cerca de 20% a 30% da população é carreadora nasal crônica de <em>S. aureus</em>, apresentando risco dez vezes maior de ISC estafilocócica em cirurgias limpas ortopédicas e cardíacas.</li>
    </ul>
  </li>
  <li><strong>Fatores Extrínsecos Perioperatórios:</strong>
    <ul>
      <li><em>Duração Prolongada do Procedimento:</em> Cada hora adicional de cirurgia eleva exponencialmente o risco de contaminação aérea e a perda de concentração sérica do antimicrobiano profilático;</li>
      <li><em>Hipotermia Intraoperatória Inadvertida (Temperatura Central &lt; 36,0 °C):</em> Provoca vasoconstrição reflexa da microcirculação cutânea, reduz a tensão tecidual de oxigênio, inibe a coagulação e triplica a incidência de infecção;</li>
      <li><em>Tricotomia Inadequada com Lâmina de Barbear:</em> Causa microescoriações na epiderme que são colonizadas rapidamente por bactérias durante a noite anterior;</li>
      <li><em>Perda Sanguínea Volumosa (&gt; 1.500 mL) e Choque:</em> Promove hipoperfusão esplâncnica e tecidual, além de "lavar" o antimicrobiano profilático da circulação.</li>
    </ul>
  </li>
</ul>

<h3>O Índice de Risco Cirúrgico do NNIS / NHSN</h3>
<p>Para permitir comparações epidemiológicas justas entre hospitais de diferentes complexidades, o CDC desenvolveu o <strong>Índice de Risco Cirúrgico do NNIS (National Nosocomial Infections Surveillance)</strong>, adotado oficialmente pela ANVISA. O índice varia de <strong>0 a 3 pontos</strong>, somando 1 ponto para cada um dos seguintes três critérios de risco independentes:</p>
<ol>
  <li><strong>Escore ASA (American Society of Anesthesiologists) Pré-Operatório:</strong> Pontua <strong>1 ponto se ASA &ge; 3</strong> (paciente portador de doença sistêmica grave que limita a atividade funcional, ou pior);</li>
  <li><strong>Potencial de Contaminação da Cirurgia:</strong> Pontua <strong>1 ponto se a cirurgia for classificada como Contaminada (Classe III) ou Infectada/Suja (Classe IV)</strong>;</li>
  <li><strong>Tempo Cirúrgico Prolongado (Percentil 75 do Procedimento):</strong> Pontua <strong>1 ponto se a duração da cirurgia ultrapassar o tempo limite T (em horas)</strong>, definido como o percentil 75 do tempo padrão para aquele tipo específico de procedimento cirúrgico (ex.: T = 2 horas para colecistectomia, T = 3 horas para colectomia).</li>
</ol>
<p>A taxa predita de ISC salta de aproximadamente <strong>1,5% em pacientes com índice NNIS 0</strong> para cerca de <strong>13% a 15% em pacientes com índice NNIS 3</strong>.</p>
`
    },
    {
      id: 'bundles-prevencao-oms-anvisa-evidencias',
      title: '6. Bundles de Prevenção da OMS e ANVISA: As Medidas Baseadas em Evidências',
      body_html: `
<h3>O Conceito de Pacote de Medidas (Bundle)</h3>
<p>Um <em>bundle</em> de prevenção é um conjunto restrito de intervenções baseadas em forte evidência científica que, quando aplicadas de forma coletiva e simultânea em 100% dos pacientes cirúrgicos, resultam em melhora desproporcionalmente maior do que a aplicação isolada de cada medida individual. As diretrizes da Organização Mundial da Saúde (OMS 2018) e o Protocolo de Prevenção de ISC da ANVISA estabelecem os seguintes pilares obrigatórios:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Medida Preventiva do Bundle</th>
      <th>Recomendação Oficial Padronizada</th>
      <th>Práticas Proibidas ou Desaconselhadas (Pegadinhas de Prova)</th>
      <th>Nível de Evidência Científica</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>1. Manejo dos Pelos (Tricotomia)</strong></td>
      <td><strong>NÃO remover pelos por rotina!</strong> Pelos no sítio cirúrgico não aumentam infecção. Se os pelos interferirem diretamente no campo de incisão ou na aderência dos curativos, removê-los <strong>imediatamente antes do ato cirúrgico no centro cirúrgico</strong>, utilizando exclusivamente <strong>tricotomizador elétrico com lâmina descartável (clipper)</strong> ou tesoura cirúrgica.</td>
      <td><strong>É TERMINANTEMENTE PROIBIDO O USO DE LÂMINA DE BARBEAR (GILETTE)</strong> e a realização de tricotomia na noite anterior no quarto/enfermaria, pois as microabrasões cutâneas infectam em poucas horas.</td>
      <td>Forte / Alta Certeza</td>
    </tr>
    <tr>
      <td><strong>2. Antissepsia Cirúrgica da Pele do Paciente</strong></td>
      <td>Aplicar solução antisséptica alcoólica à base de <strong>Gliconato de Clorexidina alcoólica a 2%</strong> (ou PVPI alcoólico em caso de contraindicação formal). A clorexidina é superior ao PVPI por possuir <strong>efeito residual prolongado (até 6 horas)</strong> e não ser inativada por sangue ou matéria orgânica. Aguardar a <strong>secagem completa e espontânea (mínimo 2 a 3 minutos)</strong> antes da colocação dos campos.</td>
      <td>Nunca aproximar bisturi elétrico ou eletrocautério de campo com álcool ainda úmido (risco gravíssimo de fogo e queimaduras operatórias catastróficas). Evitar clorexidina em cirurgias de orelha média/interna (ototoxicidade) e meninges/olhos.</td>
      <td>Forte / Moderada Certeza</td>
    </tr>
    <tr>
      <td><strong>3. Manutenção da Normotermia Perioperatória</strong></td>
      <td>Monitorar ativamente a temperatura central e manter a temperatura corporal do paciente <strong>acima de 36,0 °C (&ge; 36,0 °C)</strong> durante todo o procedimento e na recuperação anestésica, utilizando <strong>mantas térmicas de ar forçado aquecido</strong> e infusão de fluidos/hemoderivados aquecidos a 37 °C.</td>
      <td>Não permitir que o paciente permaneça exposto e desaquecido sob o ar condicionado frio da sala de cirurgia, pois a hipotermia reduz a fagocitose neutrofílica e eleva sangramentos.</td>
      <td>Forte / Moderada Certeza</td>
    </tr>
    <tr>
      <td><strong>4. Controle Glicêmico Perioperatório</strong></td>
      <td>Manter a glicemia capilar e plasmática <strong>abaixo de 180 mg/dL (&lt; 180 mg/dL ou 10 mmol/L)</strong> em pacientes diabéticos e não diabéticos no período intra e pós-operatório imediato, por meio de protocolo de insulinoterapia regular fracionada ou contínua.</td>
      <td>Não buscar controle glicêmico ultrarrigoroso agressivo (&lt; 110 mg/dL), pois ensaios clínicos (como o NICE-SUGAR) demonstraram aumento inaceitável de episódios de hipoglicemia grave e mortalidade cardiovascular.</td>
      <td>Forte / Moderada Certeza</td>
    </tr>
    <tr>
      <td><strong>5. Otimização da Oxigenação Tecidual (FiO₂)</strong></td>
      <td>Em pacientes adultos sob anestesia geral com intubação orotraqueal e função pulmonar normal, ofertar fração inspirada de oxigênio de <strong>FiO₂ = 80% durante o intraoperatório e por 2 a 6 horas após a extubação</strong> para maximizar a pressão parcial de oxigênio tecidual ($pO_2$ tecidual) e o <em>burst oxidativo</em> neutrofílico na ferida.</td>
      <td>Ajustar a FiO₂ individualmente em pacientes portadores de DPOC retentores crônicos de CO₂ ou com risco elevado de atelectasia por absorção.</td>
      <td>Forte / Moderada Certeza (OMS)</td>
    </tr>
    <tr>
      <td><strong>6. Banho Pré-Operatório</strong></td>
      <td>Orientar a realização de <strong>banho corporal completo com sabonete comum ou antisséptico (clorexidina) na véspera e na manhã da cirurgia</strong> para redução mecânica da carga bacteriana transitória da pele.</td>
      <td>O banho não substitui a antissepsia cirúrgica rigorosa no centro cirúrgico.</td>
      <td>Moderada</td>
    </tr>
    <tr>
      <td><strong>7. Descolonização Nasal em Cirurgias de Alto Risco</strong></td>
      <td>Em cirurgias ortopédicas de grande porte com prótese e cirurgias cardiovasculares, realizar rastreamento pré-operatório para <em>S. aureus</em> e aplicar <strong>mupirocina pomada nasal a 2% duas vezes ao dia por 5 dias</strong> associada a banho diário com clorexidina degermante a 4%.</td>
      <td>Não aplicar mupirocina nasal indiscriminadamente em todos os procedimentos sem indicação, para evitar indução de resistência bacteriana.</td>
      <td>Forte para Cardíaca/Ortopédica</td>
    </tr>
  </tbody>
</table>
`
    },
    {
      id: 'principios-farmacologia-antibioticoprofilaxia',
      title: '7. Princípios da Antibioticoprofilaxia: Escolha, Momento Exato, Doses e Repiques',
      body_html: `
<h3>O Conceito Farmacocinético Fundamental de Miles e Burke</h3>
<p>A finalidade exclusiva da <strong>antibioticoprofilaxia cirúrgica</strong> é atingir e manter concentrações teciduais bactericidas do antimicrobiano no sítio da incisão operatória desde o exato segundo em que a lâmina do bisturi corta a epiderme, estendendo-se por todo o período em que os tecidos permanecem expostos à contaminação ambiental e visceral. Conforme demonstrado classicamente por <strong>Burke</strong>, existe uma <strong>janela de oportunidade de ouro de apenas 3 a 4 horas</strong> a partir do momento da contaminação tecidual: se o antimicrobiano for administrado após esse intervalo, ele é incapaz de impedir o estabelecimento da infecção.</p>

<h3>O Momento Exato da Infusão Inicial (Timing)</h3>
<p>O momento de administração do antibiótico profilático é um dos indicadores de qualidade hospitalar mais fiscalizados no mundo:</p>
<ul>
  <li><strong>Regra Geral para a Maioria dos Antimicrobianos (Betalactâmicos — Cefazolina, Cefoxitina, Ampicilina/Sulbactam):</strong> Administrar por via intravenosa no intervalo de <strong>30 a 60 minutos antes da incisão cirúrgica da pele</strong> (idealmente durante a indução anestésica na própria sala operatória);</li>
  <li><strong>Exceção Formal para Vancomicina e Fluoroquinolonas (Ciprofloxacino):</strong> Pelo risco de hipotensão e síndrome de liberação histamínica (Síndrome do Homem Vermelho no caso da vancomicina), esses fármacos exigem infusão lenta ao longo de 60 minutos; portanto, devem ser <strong>iniciados entre 60 e 120 minutos antes da incisão da pele</strong> para que a infusão termine imediatamente antes do corte cirúrgico;</li>
  <li><strong>Cesariana:</strong> As diretrizes contemporâneas (OMS, ACOG, FEBRASGO) aboliram definitivamente a antiga prática de administrar o antibiótico somente após o clampeamento do cordão: a <strong>cefazolina deve ser infundida 30 a 60 minutos antes da incisão da pele da gestante</strong>, resultando em redução comprovada de 50% na taxa de endometrite e infecção de parede sem qualquer malefício ao recém-nascido;</li>
  <li><strong>Cirurgias com Garrote / Torniquete Pneumático (Ortopedia de Membros):</strong> A dose total do antimicrobiano deve ser completamente infundida <strong>antes da insuflação do garrote</strong>, garantindo que o fármaco atinja o tecido isquêmico antes da interrupção do fluxo vascular.</li>
</ul>

<h3>Por que a Cefazolina é o Padrão-Ouro Universal?</h3>
<p>A <strong>Cefazolina</strong> (cefalosporina de 1ª geração) é a droga de primeira escolha para quase 90% de todas as cirurgias limpas e potencialmente contaminadas no mundo por quatro razões farmacológicas:</p>
<ol>
  <li>Excelente atividade bactericida contra <em>Staphylococcus aureus</em> sensível à meticilina (MSSA) e estreptococos da pele;</li>
  <li>Atividade satisfatória contra os principais bacilos Gram-negativos entéricos comunitários (<em>E. coli</em>, <em>Klebsiella</em>, <em>Proteus</em>);</li>
  <li>Excelente penetração em tecidos moles, fáscias, osso e líquido sinovial;</li>
  <li>Meia-vida biológica favorável de aproximadamente <strong>1,8 a 2,0 horas</strong> (superior à cefalotina, cuja meia-vida de 30 a 45 minutos exige repiques excessivamente frequentes que a tornaram obsoleta na cirurgia moderna).</li>
</ol>
<p><strong>Posologia correta da Cefazolina:</strong> A dose padrão para adultos é de <strong>2 g por via intravenosa</strong>. Em pacientes obesos com peso corporal <strong>igual ou superior a 120 kg</strong> (ou IMC &ge; 40 kg/m²), a dose deve ser obrigatoriamente aumentada para <strong>3 g IV</strong> devido ao maior volume de distribuição.</p>

<h3>Regras Claras de Repique Intraoperatório (Redose)</h3>
<p>Para garantir que a concentração tecidual do fármaco não caia abaixo da Concentração Inibitória Mínima (CIM) durante o ato cirúrgico, uma nova dose intraoperatória (repique) deve ser administrada sempre que ocorrer uma das seguintes situações:</p>
<table class="book-table">
  <thead>
    <tr>
      <th>Critério para Indicação de Repique Intraoperatório</th>
      <th>Regra Farmacocinética Padronizada</th>
      <th>Exemplos Práticos com Drogas Comuns</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>1. Duração Cirúrgica Prolongada</strong></td>
      <td>Administrar nova dose se a duração do procedimento ultrapassar <strong>duas meias-vidas de eliminação do fármaco</strong> (em pacientes com função renal normal), contadas a partir da primeira dose.</td>
      <td>• <strong>Cefazolina (meia-vida ~2h):</strong> Repique a cada <strong>4 horas</strong>;<br>• <strong>Cefoxitina (meia-vida ~1h):</strong> Repique a cada <strong>2 horas</strong>;<br>• <strong>Ampicilina/Sulbactam (meia-vida ~1h):</strong> Repique a cada <strong>2 horas</strong>;<br>• <strong>Metronidazol (meia-vida ~8h):</strong> Não requer repique em cirurgias usuais;<br>• <strong>Vancomicina (meia-vida 4–8h):</strong> Não requer repique em cirurgias &lt; 10 horas.</td>
    </tr>
    <tr>
      <td><strong>2. Perda Sanguínea Volumosa Intraoperatória</strong></td>
      <td>Administrar repique imediato se a perda sanguínea estimada ultrapassar <strong>1.500 mL</strong> em adultos (ou se houver reposição volêmica agressiva com hemodiluição aguda).</td>
      <td>Repetir dose cheia de Cefazolina (2 g) independentemente do tempo decorrido desde a primeira dose.</td>
    </tr>
    <tr>
      <td><strong>3. Insuficiência Renal Grave</strong></td>
      <td>O intervalo para repique intraoperatório deve ser <strong>ampliado proporcionalmente à queda do clearance de creatinina</strong>.</td>
      <td>Em pacientes com ClCr &lt; 30 mL/min, o repique de cefazolina pode ser postergado para 8 a 12 horas.</td>
    </tr>
  </tbody>
</table>

<h3>Duração da Profilaxia: Quando Parar?</h3>
<p><strong>A regra de ouro baseada em evidências é que a antibioticoprofilaxia deve ser suspensa imediatamente no momento do fechamento da pele no centro cirúrgico (DOSE ÚNICA)</strong>, ou mantida por no máximo <strong>24 horas</strong> (dose única na indução + no máximo 2 doses pós-operatórias). Em cirurgias cardíacas, algumas diretrizes admitem extensão por até 48 horas, embora estudos recentes indiquem equivalência em 24 horas.</p>
<p><strong>A PRESENÇA DE DRENO CIRÚRGICO NUNCA JUSTIFICA A MANUTENÇÃO DE ANTIBIÓTICO PROFILÁTICO!</strong> Prolongar o antibiótico até a retirada do dreno de aspiração ou por 7 a 10 dias <strong>NÃO reduz o risco de ISC</strong> e promove intensamente a seleção de bactérias multirresistentes (MRSA, KPC, <em>Clostridioides difficile</em> e infecções fúngicas sistêmicas).</p>
`
    },
    {
      id: 'alergia-betalactamicos-esquemas-alternativos',
      title: '8. Manejo da Alergia a Betalactâmicos e Esquemas Antimicrobianos Especiais',
      body_html: `
<h3>Estratificação Real da Alergia à Penicilina e Cefalosporinas</h3>
<p>Cerca de 10% dos pacientes relatam história prévia de "alergia à penicilina", mas mais de 90% deles toleram perfeitamente cefalosporinas na prática médica. As provas de residência exigem diferenciar reações imunoalérgicas graves mediadas por IgE daquelas leves ou não alérgicas:</p>
<ul>
  <li><strong>Reação Alérgica Grave Mediada por IgE (Tipo I) ou Reação Cutânea Grave (SCAR):</strong> Anafilaxia, broncoespasmo agudo, edema de glote/laringoespamo, choque anafilático, urticária generalizada imediata (&lt; 1 hora pós-dose), Síndrome de Stevens-Johnson (SSJ), Necrólise Epidérmica Tóxica (NET) ou DRESS. Nesses pacientes, <strong>TODOS OS BETALACTÂMICOS (PENICILINAS E CEFALOSPORINAS) ESTÃO ESTRITAMENTE CONTRAINDICADOS</strong>;</li>
  <li><strong>Reação Não Grave (Intolerância Gastrointestinal, Exantema Maculopapular Tardio Não Urticariforme sem Descolamento Epidérmico):</strong> Apresentam reatividade cruzada inferior a 1% com cefalosporinas de 1ª geração (como cefazolina), sendo a <strong>cefazolina perfeitamente segura e autorizada</strong> pelas diretrizes da SIS/IDSA/ASHP.</li>
</ul>

<h3>Esquemas Alternativos Padronizados para Alergia Grave a Betalactâmicos</h3>
<table class="book-table">
  <thead>
    <tr>
      <th>Topografia Cirúrgica</th>
      <th>Esquema Profilático em Pacientes com Alergia Grave a Betalactâmicos</th>
      <th>Peculiaridades de Administração</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Cirurgias Limpas (Cardíaca, Ortopédica, Vascular, Mama, Hérnia com Tela)</strong></td>
      <td><strong>Vancomicina</strong> (15 mg/kg IV em 60–120 min) OU <strong>Clindamicina</strong> (900 mg IV em 30 min).</td>
      <td>A clindamicina é excelente alternativa para Gram-positivos e não exige tempo prolongado de infusão; vancomicina é obrigatória se suspeita de MRSA.</td>
    </tr>
    <tr>
      <td><strong>Cirurgias do Trato Digestivo Alto, Vias Biliares e Ginecológicas</strong></td>
      <td><strong>Clindamicina</strong> (900 mg IV) OU <strong>Vancomicina</strong> (15 mg/kg IV)<br><strong>+</strong><br><strong>Gentamicina</strong> (5 mg/kg IV dose única) OU <strong>Ciprofloxacino</strong> (400 mg IV) OU <strong>Aztreonam</strong> (2 g IV).</td>
      <td>O aminoglicosídeo (Gentamicina) ou Aztreonam fornece cobertura seletiva contra bacilos Gram-negativos entéricos, enquanto a Clindamicina cobre Gram-positivos e anaeróbios. O Aztreonam é um monobactâmico que não tem reatividade cruzada com penicilinas.</td>
    </tr>
    <tr>
      <td><strong>Cirurgias Colorretais e Apendicectomias</strong></td>
      <td><strong>Gentamicina</strong> (5 mg/kg IV) + <strong>Metronidazol</strong> (500 mg IV)<br>OU<br><strong>Ciprofloxacino</strong> (400 mg IV) + <strong>Metronidazol</strong> (500 mg IV).</td>
      <td>Gentamicina cobre Gram-negativos entéricos e Metronidazol fornece excelente cobertura bactericida contra <em>Bacteroides fragilis</em> e anaeróbios estritos.</td>
    </tr>
  </tbody>
</table>
`
    },
    {
      id: 'diagnostico-diferencial-febre-pos-operatoria',
      title: '9. Diagnóstico Diferencial da Febre Pós-Operatória: A Regra dos Ws e Infecções Precoces Fatais',
      body_html: `
<h3>A Cronologia Clássica da Febre no Pós-Operatório (Mnemônico dos 5 "Ws")</h3>
<p>A investigação diagnóstica da febre após um procedimento cirúrgico exige raciocínio cronológico rigoroso. No pós-operatório imediato (primeiras 24 a 48 horas), a elevação térmica é frequentemente não infecciosa, decorrente da liberação fisiológica de citocinas pró-inflamatórias (IL-1, IL-6 e TNF-alfa) na Resposta Metabólica ao Trauma (RMIT). O mnemônico clássico em língua inglesa auxilia na memorização temporal:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Dia Pós-Operatório</th>
      <th>Mnemônico Clássico</th>
      <th>Etiologia Principal</th>
      <th>Fisiopatologia e Achados Clínicos</th>
      <th>Conduta Propedêutica e Terapêutica</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>D1 a D2 (24–48 horas)</strong></td>
      <td><strong>Wind</strong> (Pulmão)</td>
      <td><strong>Atelectasia Pulmonar</strong></td>
      <td>Colapso alveolar por dor à expansão torácica, sedação residual e ventilação superficial; subfebril (&lt; 38,5 °C), taquipneia leve, murmúrio reduzido em bases.</td>
      <td>Incentivo respiratório, fisioterapia motora, analgesia otimizada e deambulação precoce. <strong>NÃO PRESCREVER ANTIBIÓTICO!</strong></td>
    </tr>
    <tr>
      <td><strong>D3 (48–72 horas)</strong></td>
      <td><strong>Water</strong> (Urina)</td>
      <td><strong>Infecção do Trato Urinário (ITU)</strong></td>
      <td>Relacionada ao uso de Cateter Vesical de Demora (CVD / ITU-AC); febre, disúria, urina turva, dor suprapúbica.</td>
      <td>EAS (uroanálise) e Urocultura; retirada imediata do cateter vesical se possível; antibioticoterapia direcionada.</td>
    </tr>
    <tr>
      <td><strong>D5 a D7 (5 a 7 dias)</strong></td>
      <td><strong>Wound</strong> (Ferida)</td>
      <td><strong>Infecção do Sítio Cirúrgico (ISC)</strong></td>
      <td>Tempo biológico necessário para proliferação bacteriana tecidual expressiva; febre contínua, dor crescente, hiperemia, edema, calor e secreção purulenta na ferida.</td>
      <td>Inspeção da ferida, abertura de pontos cirúrgicos, drenagem da coleção, cultura de secreção e curativos diários.</td>
    </tr>
    <tr>
      <td><strong>D7 a D10 (7 a 10 dias)</strong></td>
      <td><strong>Walking</strong> (Veias/Marcha)</td>
      <td><strong>Tromboembolismo Venoso (TVP / TEP)</strong></td>
      <td>Estase venosa prolongada pela imobilização; edema assimétrico de panturrilha, dor à dorsiflexão (sinal de Homans) ou dispneia súbita e taquicardia.</td>
      <td>Ultrassom Doppler venoso de membros inferiores ou Angiotomografia pulmonar; início imediato de anticoagulação plena.</td>
    </tr>
    <tr>
      <td><strong>> 7 a 14 dias</strong></td>
      <td><strong>Wonder Drugs</strong> (Fármacos)</td>
      <td><strong>Febre Farmacológica</strong></td>
      <td>Reação de hipersensibilidade a antibióticos (betalactâmicos, sulfas), anticonvulsivantes (fenitoína), heparina; paciente clinicamente bem ("febre feliz") com eosinofilia.</td>
      <td>Suspensão dos medicamentos suspeitos com defervescência térmica típica em 48 a 72 horas.</td>
    </tr>
  </tbody>
</table>

<h3>A Exceção Fatal de Prova: Febre Hiperaguda nas Primeiras 24–48 Horas por ISC Necrosante</h3>
<p>Embora a esmagadora maioria das ISCs incisionais comuns se manifeste entre o 5º e o 7º dia pós-operatório, existe uma <strong>emergência cirúrgica catastrófica que se manifesta com febre alta e toxemia nas primeiras 24 a 48 horas</strong>: a <strong>Infecção Necrosante de Partes Moles e Fasciíte Necrosante</strong> provocada por dois patógenos clássicos:</p>
<ol>
  <li><strong>Streptococcus pyogenes (Estreptococo Beta-Hemolítico do Grupo A):</strong> Manifesta-se com febre alta precoce (&gt; 39 °C), taquicardia desproporcional, dor lancinante na ferida operatória <strong>totalmente desproporcional aos achados físicos iniciais</strong>, eritema violáceo de rápida progressão centrífuga, bolhas hemorrágicas e secreção serossanguinolenta rala ("água de carne de lavagem");</li>
  <li><strong>Clostridium perfringens (Gangrena Gasosa Clostridiana):</strong> Infecção anaeróbia formadora de gás, manifestando-se em 24 a 48 horas com dor extrema, toxemia profunda, choque séptico hiperagudo, crepitação subcutânea à palpação local e presença de gás nos planos fasciais e musculares na radiografia/tomografia.</li>
</ol>
<p><strong>Conduta salvadora obrigatória:</strong> Diante de dor desproporcional e febre alta nas primeiras 24–48 horas, a conduta <strong>NÃO É</strong> aguardar exames de imagem ou manter observação clínica; exige <strong>abertura imediata da sutura à beira-leito para inspeção da fáscia</strong>, exploração cirúrgica de urgência em centro cirúrgico com <strong>desbridamento tecidual radical de todos os tecidos desvitalizados</strong> e antibioticoterapia intravenosa bactericida de amplo espectro combinando <strong>Penicilina Cristalina (ou Ceftriaxona) + Clindamicina</strong> (a clindamicina inibe a síntese ribossômica das toxinas bacterianas superantigênicas — efeito Eagle) ou Meropenem + Vancomicina.</p>
`
    },
    {
      id: 'tratamento-isc-deiscencia-aponeurotica',
      title: '10. Manejo Terapêutico da ISC: Drenagem, Desbridamento, Antibioticoterapia e Deiscência de Aponeurose',
      body_html: `
<h3>Princípios Gerais do Tratamento da ISC</h3>
<p>O tratamento da infecção do sítio cirúrgico baseia-se fundamentalmente no <strong>princípio mecânico e cirúrgico do controle do foco infeccioso</strong>:</p>
<ul>
  <li><strong>Manejo da ISC Incisional Superficial:</strong>
    <ul>
      <li>O tratamento primordial é a <strong>abertura mecânica dos pontos de sutura</strong> na extensão da coleção flutuante ou purulenta à beira-leito, com <strong>drenagem completa do pus e do hematoma</strong>;</li>
      <li>Coleta de amostra de secreção profunda para bacterioscopia (Gram) e cultura com antibiograma (evitar swab superficial da pele, preferindo aspiração com seringa e agulha ou swab do fundo da coleção drenada);</li>
      <li>Desbridamento de restos fibrinosos ou necróticos superficiais e lavagem abundante com soro fisiológico a 0,9%;</li>
      <li>Manutenção da ferida aberta cicatrizando por <strong>segunda intenção</strong> ou preparo para fechamento primário retardado no 4º–5º dia com curativos úmidos absorventes (alginato, espuma de poliuretano ou terapia por pressão negativa / VAC);</li>
      <li><strong>Quando prescrever antibiótico sistêmico na ISC superficial?</strong> O uso de antibióticos sistêmicos <strong>NÃO é necessário</strong> na grande maioria das ISCs superficiais após drenagem adequada. O antibiótico sistêmico está formalmente indicado apenas se houver: celulite/eritema peri-incisional extenso (&gt; 5 cm da borda da incisão), sinais de repercussão sistêmica (febre persistente &gt; 38 °C, taquicardia, leucocitose), presença de implante/prótese subjacente ou paciente com imunossupressão grave / diabetes descompensado.</li>
    </ul>
  </li>
  <li><strong>Manejo da ISC Incisional Profunda e de Órgão/Espaço:</strong>
    <ul>
      <li>Exige drenagem ampla em centro cirúrgico ou por radiologia intervencionista percutânea guiada por tomografia/ultrassonografia (padrão-ouro em coleções intra-abdominais bloqueadas como abscessos subfrênicos ou pélvicos);</li>
      <li>Antibioticoterapia sistêmica terapêutica direcionada aos patógenos mais prováveis do sítio manipulado até o resultado definitivo do antibiograma.</li>
    </ul>
  </li>
</ul>

<h3>Deiscência Aponeurótica Aguda e Evisceração Abdominal</h3>
<p>A deiscência da fáscia aponeurótica da parede abdominal após laparotomia mediana ocorre habitualmente entre o <strong>5º e o 8º dia pós-operatório</strong>. Resulta da combinação de falha técnica de sutura (tensão excessiva que corta a aponeurose, nós frouxos, poucas laçadas ou grandes tomadas isquemiantes), ISC profunda da parede e elevação abrupta da pressão intra-abdominal (tosse vigorosa, vômitos, íleo paralítico prolongado ou ascite sob tensão).</p>
<p><strong>O Sinal Clínico Patognomônico:</strong> O sinal de alarme clássico de deiscência aponeurótica oculta que antecede a abertura visível da ferida é a <strong>saída súbita e abundante de secreção serossanguinolenta transparente ("líquido em aspecto de água de melão" ou "água de lavagem de carne rosa clara") através dos pontos da pele</strong>, encharcando o curativo no 5º ao 7º dia pós-operatório.</p>
<p><strong>Diferenciação e Conduta entre Deiscência Bloqueada e Evisceração:</strong></p>
<table class="book-table">
  <thead>
    <tr>
      <th>Condição Clínica da Parede</th>
      <th>Apresentação Clínica</th>
      <th>Conduta Imediata e Definitiva</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Deiscência Aponeurótica Completa com Evisceração Aguda</strong></td>
      <td>Abertura de todos os planos da parede abdominal (pele, TCSC, aponeurose e peritônio) com <strong>exteriorização franca de vísceras abdominais (alças de intestino delgado ou omento) para o meio externo</strong>.</td>
      <td><strong>Emergência cirúrgica imediata!</strong><br>• No leito: cobrir imediatamente as alças intestinais expostas com <strong>compressas estéreis embebidas em soro fisiológico morno</strong> (jamais tentar empurrar as alças para dentro sob tensão no leito); prescrever analgesia, jejum absoluto, sonda nasogástrica descompressiva e antibióticos profiláticos/terapêuticos;<br>• Em centro cirúrgico: laparotomia exploradora sob anestesia geral para lavagem da cavidade e <strong>ressutura da parede abdominal</strong> com pontos totais capitonados (monofilamento espesso nylon 1 ou 2) ou contenção temporária com bolsa de Bogotá / vácuo se houver risco de síndrome compartimental abdominal.</td>
    </tr>
    <tr>
      <td><strong>Deiscência Aponeurótica Oculta / Bloqueada (Evisceração Coberta)</strong></td>
      <td>A aponeurose rompeu-se nos planos profundos, mas a <strong>pele permanece íntegra e fechada</strong>; nota-se abaulamento expansível da incisão à manobra de Valsalva ou tosse, com saída de secreção serossanguinolenta.</td>
      <td>Exame tomográfico da parede abdominal para confirmar a extensão do defeito; reoperação programada em caráter de urgência para ressutura aponeurótica antes que ocorra rotura cutânea secundária.</td>
    </tr>
  </tbody>
</table>
`
    },
    {
      id: 'seis-casos-clinicos-isc-antibioticoprofilaxia',
      title: '11. Casos Clínicos Comentados: Cenários Desafiadores de ISC e Profilaxia',
      body_html: `
<div class="drive-block">
  <h4>Caso Clínico 1 — Timing Inadequado da Antibioticoprofilaxia em Cirurgia Eletiva</h4>
  <p><strong>Vinheta Clínica:</strong> Homem de 62 anos, diabético e hipertenso, é internado para realização de colectomia esquerda eletiva com anastomose primária por adenocarcinoma de sigmoide. O cirurgião prescreve cefazolina 2 g IV + metronidazol 500 mg IV de profilaxia. Por atraso na liberação da farmácia hospitalar, a infusão dos antibióticos é iniciada na enfermaria 3 horas antes da cirurgia, tendo terminado às 06h30min. O paciente é conduzido ao centro cirúrgico, onde a indução anestésica ocorre às 09h15min e a incisão cirúrgica da pele é realizada às 09h40min (mais de 3 horas após o término da infusão da cefazolina). No intraoperatório, o procedimento dura 4 horas e 30 minutos sem perda volêmica expressiva, não sendo administrada nenhuma dose adicional de antibiótico. No 6º dia pós-operatório, o paciente evolui com febre de 38,8 °C, dor intensa e saída de secreção purulenta fétida na fossa ilíaca esquerda.</p>
  <p><strong>Discussão dos Erros Técnicos e Conduta:</strong> Ocorreram <strong>dois erros graves de antibioticoprofilaxia</strong> que deixaram o paciente desprotegido durante a fase crítica da manipulação bacteriana:
  <ul>
    <li><em>1º Erro de Timing Inicial:</em> A cefazolina possui meia-vida de ~1,8 a 2,0 horas. Como a infusão terminou às 06h30min e a incisão só ocorreu às 09h40min (mais de 3 horas depois), a concentração tecidual do fármaco na pele e no cólon já havia caído para níveis subinibitórios antes do início da contaminação operatória. A conduta correta seria <strong>administrar a cefazolina na sala operatória 30 a 60 minutos antes da incisão da pele</strong> (entre 08h40min e 09h10min);</li>
    <li><em>2º Erro de Ausência de Repique Intraoperatório:</em> Como a cirurgia durou 4 horas e 30 minutos (tempo superior a duas meias-vidas da cefazolina), era <strong>obrigatória a administração de um repique de 2 g de cefazolina 4 horas após a primeira dose</strong>.</li>
  </ul>
  Diante da ISC incisional estabelecida no 6º dia, a conduta correta é a abertura dos pontos cirúrgicos, drenagem da coleção, coleta de material para cultura, desbridamento e curativos frequentes, associando antibioticoterapia sistêmica direcionada a Gram-negativos e anaeróbios caso haja celulite extensa circundante ou sinais sistêmicos de sepse.</p>
</div>

<div class="drive-block">
  <h4>Caso Clínico 2 — Dor Desproporcional no 1º Dia Pós-Operatório: Fasciíte Necrosante por Streptococcus pyogenes</h4>
  <p><strong>Vinheta Clínica:</strong> Mulher de 45 anos, previamente hígida, é submetida a histerectomia abdominal eletiva por miomatose uterina sintomática. O procedimento transcorreu sem intercorrências, com profilaxia padrão de cefazolina 2 g IV. Com 20 horas de pós-operatório, a paciente desenvolve febre súbita de 39,5 °C, calafrios intensos, taquicardia de 130 bpm e PA de 90/60 mmHg. Queixa-se de dor lancinante e intolerável na ferida operatória, não aliviada por opioides potentes. À inspeção, a incisão cirúrgica apresenta apenas discreto eritema róseo nas bordas sem secreção purulenta evidente, mas a palpação abdominal além das bordas da incisão desperta dor extrema e revela área de pele violácea acinzentada mal delimitada com edema endurecido estendendo-se para os flancos.</p>
  <p><strong>Discussão Diagnóstica e Conduta Salvadora:</strong> Trata-se da apresentação clássica e fulminante de <strong>Infecção Necrosante de Partes Moles / Fasciíte Necrosante por Streptococcus pyogenes (Estreptococo do Grupo A)</strong>. A tríade patognomônica consiste em: <strong>(1) início hiperagudo nas primeiras 24 a 48 horas; (2) febre alta com toxemia/choque séptico precoce; e (3) dor extrema completamente desproporcional à aparência externa da incisão</strong>. Como a infecção progride ao longo dos planos fasciais profundos e da gordura subcutânea antes de destruir a pele superficial, o cirurgião inexperiente pode subestimar a gravidade pelo aspecto externo da ferida. A conduta <strong>imediata e inegociável</strong> é a abertura de todos os pontos da incisão à beira-leito (observando a clássica secreção serossanguinolenta aquosa em "água de lavagem de carne" e fáscia acinzentada desvitalizada que se descola facilmente com o dedo), ressuscitação volêmica agressiva, encaminhamento imediato ao centro cirúrgico para <strong>desbridamento cirúrgico radical de toda a fáscia e tecido necrótico</strong> e início de antibioticoterapia bactericida venosa associando <strong>Penicilina Cristalina (ou Meropenem) + Clindamicina</strong> (para bloqueio da síntese ribossômica de exotoxinas pirogênicas e toxina do choque tóxico estreptocócico).</p>
</div>

<div class="drive-block">
  <h4>Caso Clínico 3 — Ajuste de Dose da Cefazolina em Paciente com Obesidade Grave</h4>
  <p><strong>Vinheta Clínica:</strong> Mulher de 38 anos, peso de 135 kg, altura de 1,62 m (IMC = 51,4 kg/m²), sem outras comorbidades, é admitida para realização de colecistectomia videolaparoscópica eletiva por colelitíase sintomática. Na prescrição pré-operatória, o médico residente prescreve cefazolina 1 g IV 30 minutos antes da incisão da pele. O farmacêutico clínico do hospital intervém e solicita alteração da dose.</p>
  <p><strong>Discussão Farmacológica:</strong> A conduta do farmacêutico está perfeitamente correta com base nas diretrizes internacionais da SIS/IDSA/ASHP e da ANVISA:
  <ul>
    <li>A dose padrão de cefazolina para adultos de peso habitual é de <strong>2 g IV</strong> (e não 1 g, que é dose pediátrica ou histórica insuficiente para adultos modernos);</li>
    <li>Em pacientes com <strong>peso corporal &ge; 120 kg</strong>, o volume de distribuição do antimicrobiano hidrofílico no tecido adiposo e muscular é significativamente maior, resultando em concentrações plasmáticas e teciduais subterapêuticas se utilizada a dose de 2 g. Portanto, a dose formal recomendada para pacientes com peso &ge; 120 kg é de <strong>3 g de Cefazolina IV</strong> administrada 30 a 60 minutos antes da incisão cirúrgica.</li>
  </ul>
</div>

<div class="drive-block">
  <h4>Caso Clínico 4 — Abertura e Drenagem de ISC Superficial vs Uso Indiscriminado de Antibiótico</h4>
  <p><strong>Vinheta Clínica:</strong> Homem de 52 anos no 7º dia pós-operatório de herniorrafia inguinal eletiva procura o ambulatório de retorno cirúrgico. Refere sensação de peso local e febrícula de 37,8 °C no dia anterior. Ao exame físico: paciente em bom estado geral, eupnéico, afebril no momento (36,7 °C), PA 120/80 mmHg. A ferida operatória na região inguinal direita apresenta abaulamento flutuante de 3 cm com hiperemia perilesional restrita a 1 cm das bordas da incisão. À palpação, há drenagem de cerca de 15 mL de secreção purulenta espessa amarelada sem odor fétido através do terço médio da incisão.</p>
  <p><strong>Discussão Técnica e Conduta:</strong> Trata-se de <strong>ISC incisional superficial típica</strong>. A conduta correta consiste em:
  <ul>
    <li>Remoção dos pontos cirúrgicos no segmento comprometido da incisão;</li>
    <li>Abertura mecânica com pinça hemostática delicada e exploração digital cuidadosa da cavidade para desfazer loculações de pus;</li>
    <li>Inspeção visual e palpação da fáscia aponeurótica subjacente para garantir que a aponeurose está íntegra e fechada (excluindo ISC profunda e deiscência fascial);</li>
    <li>Lavagem abundante com soro fisiológico a 0,9% e curativo absorvente;</li>
    <li><strong>NÃO há indicação de antibioticoterapia sistêmica oral ou venosa neste momento!</strong> O paciente é imunocompetente, afebril, não possui sinais sistêmicos de toxemia e o eritema perilesional é mínimo (&lt; 2 cm). A simples drenagem mecânica adequada é curativa em mais de 90% das ISCs incisionais superficiais isoladas. Antibiótico só seria indicado se houvesse celulite extensa (&gt; 5 cm), febre alta persistente ou imunossupressão.</li>
  </ul>
</div>

<div class="drive-block">
  <h4>Caso Clínico 5 — Febre Pós-Operatória no 2º Dia: Atelectasia vs Suspeita Errada de Infecção</h4>
  <p><strong>Vinheta Clínica:</strong> Homem de 67 anos, tabagista de 40 maços-ano, é submetido a gastrectomia subtotal com reconstrução em Y de Roux por adenocarcinoma gástrico através de laparotomia mediana supraumbilical. No 2º dia pós-operatório (D2), o paciente apresenta temperatura axilar de 38,2 °C, frequência respiratória de 24 irpm, SpO₂ de 93% em ar ambiente e FC de 96 bpm. A ferida cirúrgica está limpa, seca, sem hiperemia ou secreção, e o abdome é flácido com dor apenas no local da incisão à palpação. Na ausculta pulmonar, notam-se murmúrios vesiculares reduzidos com estertores crepitantes teleinspiratórios finos em ambas as bases pulmonares. O cirurgião de plantão suspeita de "infecção hospitalar precoce" e prescreve ceftriaxona + metronidazol.</p>
  <p><strong>Discussão Diagnóstica e Conduta:</strong> A conduta do plantonista foi <strong>incorreta e precipitada</strong>:
  <ul>
    <li>A causa mais comum de febre isolada nas primeiras 24 a 48 horas de pós-operatório (D1–D2) é a <strong>Atelectasia Pulmonar</strong> (mnemônico <em>Wind</em>), especialmente em pacientes idosos, tabagistas, submetidos a incisões abdominais altas dolorosas que restringem a inspiração profunda;</li>
    <li>Atelectasia é um evento mecânico inflamatório decorrente do colapso dos alvéolos e liberação de citocinas pró-inflamatórias pelos macrófagos alveolares, e <strong>NÃO uma infecção bacteriana bacteriana em sua fase inicial</strong>;</li>
    <li>A conduta correta é: <strong>otimização rigorosa da analgesia</strong> (bloqueio peridural ou analgesia multimodal poupadora de opioides para permitir respiração sem dor), <strong>fisioterapia respiratória ativa com exercícios de expansão pulmonar e incentivadores a fluxo/volume (ex.: Voldyne)</strong> e <strong>deambulação precoce</strong>. O uso empírico precoce de antibióticos nessa fase não acelera a resolução da febre e seleciona flora resistente.</li>
  </ul>
</div>

<div class="drive-block">
  <h4>Caso Clínico 6 — Saída de Secreção em "Água de Melão" e Deiscência Aponeurótica</h4>
  <p><strong>Vinheta Clínica:</strong> Paciente obesa de 59 anos, no 6º dia pós-operatório de laparotomia mediana por abdome agudo obstrutivo (liberação de bridas), refere tosse persistente na última noite. Durante o banho, percebeu que o curativo abdominal ficou subitamente ensopado por grande quantidade de líquido alaranjado/rosado claro sem odor. Ao retirar o curativo no leito, a enfermeira observa que a pele permanece aproximada pelas suturas de náilon, mas há drenagem contínua de secreção serossanguinolenta transparente aos jatos durante episódios de tosse.</p>
  <p><strong>Discussão Diagnóstica e Conduta:</strong> A drenagem súbita e abundante de líquido serossanguinolento claro ("em água de melão" ou "água de lavagem de carne") entre o 5º e o 8º dia pós-operatório de laparotomia mediana é o <strong>sinal clínico patognomônico de deiscência da aponeurose profunda</strong> com integridade temporária da pele (evisceração coberta). A tensão dos episódios de tosse associada à obesidade e à provável isquemia na linha de sutura rompeu os pontos da linha alba. A conduta correta é:
  <ul>
    <li>Repouso absoluto no leito em decúbito dorsal horizontal com os membros inferiores semifletidos (posição de Fowler ou pernas fletidas para reduzir a tensão sobre a parede abdominal);</li>
    <li>Curativo compressivo estéril e faixa abdominal de contenção temporária;</li>
    <li>Solicitação de avaliação cirúrgica urgente e exame tomográfico da parede abdominal se houver dúvida;</li>
    <li>Indicação de <strong>reoperação em caráter de urgência para ressutura da aponeurose</strong> em centro cirúrgico sob anestesia geral, preferencialmente utilizando a técnica de <em>small bites</em> com fio monofilamentar de absorção lenta (PDS) ou pontos totais capitonados caso os tecidos aponeuróticos estejam friáveis, evitando a progressão catastrófica para evisceração franca com exposição de alças.</li>
  </ul>
</div>
`
    },
    {
      id: 'dez-questoes-comentadas-residencia-isc',
      title: '12. Questões Comentadas de Residência Médica e Concursos (Comentários Passo a Passo)',
      body_html: `
<h3>Questão Comentada 1 — Timing Exato da Antibioticoprofilaxia Cirúrgica (ENARE / USP)</h3>
<p><strong>Enunciado:</strong> A antibioticoprofilaxia cirúrgica visa garantir níveis teciduais bactericidas do fármaco no sítio operatório no momento da incisão cirúrgica da pele. De acordo com os protocolos internacionais da Organização Mundial da Saúde (OMS), do CDC e da ANVISA, qual é o momento ideal para a administração intravenosa da cefazolina na profilaxia cirúrgica em adultos?</p>
<ul>
  <li><strong>A)</strong> Imediatamente após o paciente acordar na enfermaria, 4 a 6 horas antes da cirurgia.</li>
  <li><strong>B)</strong> Entre 30 e 60 minutos antes da incisão da pele, habitualmente durante a indução anestésica na sala de cirurgia.</li>
  <li><strong>C)</strong> Exclusivamente após a dequitação placentária na cesariana e após o término da cirurgia nas demais especialidades.</li>
  <li><strong>D)</strong> No momento em que o cirurgião fecha a aponeurose e inicia a sutura da pele.</li>
</ul>
<p><strong>Gabarito Oficial: Alternativa B.</strong></p>
<p><strong>Comentário Analítico das Alternativas:</strong></p>
<ul>
  <li><strong>Alternativa B (Correta):</strong> Para betalactâmicos como a cefazolina, o intervalo farmacocinético ideal é de <strong>30 a 60 minutos antes da incisão da pele</strong>, garantindo pico de concentração tecidual no exato momento da abertura cutânea.</li>
  <li><strong>Alternativa A (Incorreta):</strong> Administrar 4 a 6 horas antes deixa a ferida sem cobertura no momento da incisão, pois a cefazolina já foi depurada pelos rins.</li>
  <li><strong>Alternativas C e D (Incorretas):</strong> Administrar o antibiótico após o corte cirúrgico ou no final da cirurgia viola o conceito de profilaxia (conforme demonstrado por Burke, antibióticos iniciados após 3 a 4 horas da contaminação são ineficazes). Na cesariana, o antibiótico deve ser administrado 30–60 min antes da incisão materna.</li>
</ul>

<h3>Questão Comentada 2 — Critérios de Repique Intraoperatório da Cefazolina (UNICAMP / ENARE)</h3>
<p><strong>Enunciado:</strong> Durante uma gastrectomia total oncológica eletiva iniciada às 08h00min com incisão da pele às 08h30min (tendo a cefazolina 2 g sido administrada às 08h00min), a equipe cirúrgica enfrenta dificuldades técnicas de dissecção vascular. Às 12h30min, o procedimento ainda está em andamento sem previsão de término na próxima hora. O paciente possui função renal normal e sangramento estimado de 300 mL. Qual é a conduta farmacológica correta em relação à antibioticoprofilaxia?</p>
<ul>
  <li><strong>A)</strong> Manter a conduta expectante sem administrar novas doses, pois a profilaxia cirúrgica deve ser sempre em dose única estrita.</li>
  <li><strong>B)</strong> Administrar uma nova dose de repique de Cefazolina (2 g IV), pois decorreram 4 horas (duas meias-vidas) desde a primeira dose em cirurgia ainda em andamento.</li>
  <li><strong>C)</strong> Substituir imediatamente a cefazolina por vancomicina + meropenem para cobrir infecção hospitalar intraoperatória.</li>
  <li><strong>D)</strong> Suspender a cirurgia imediatamente pelo risco iminente de choque séptico.</li>
</ul>
<p><strong>Gabarito Oficial: Alternativa B.</strong></p>
<p><strong>Comentário Analítico das Alternativas:</strong></p>
<ul>
  <li><strong>Alternativa B (Correta):</strong> A regra farmacocinética internacional determina a administração de repique intraoperatório sempre que o procedimento ultrapassar <strong>duas meias-vidas do fármaco</strong>. Como a meia-vida da cefazolina é de aproximadamente 2 horas, o repique deve ser administrado a cada <strong>4 horas</strong> enquanto a ferida estiver aberta.</li>
  <li><strong>Alternativa A (Incorreta):</strong> Em procedimentos prolongados, a dose única é insuficiente para manter níveis teciduais protetores até o fechamento da ferida.</li>
  <li><strong>Alternativas C e D (Incorretas):</strong> Não há infecção intraoperatória instalada que justifique escalonamento empírico para meropenem/vancomicina ou suspensão cirúrgica.</li>
</ul>

<h3>Questão Comentada 3 — Classificação de Cirurgia por Potencial de Contaminação (FUVEST / USP)</h3>
<p><strong>Enunciado:</strong> Um paciente de 24 anos é submetido a apendicectomia laparoscópica de urgência por apendicite aguda. No intraoperatório, o cirurgião encontra o apêndice cecal edemaciado e hiperemiado com fibrina na serosa (apendicite aguda flegmonosa), sem perfuração, sem necrose e sem saída de pus ou fezes para a cavidade peritoneal livre. De acordo com a classificação do Ministério da Saúde e do CDC/NHSN, essa intervenção é classificada como:</p>
<ul>
  <li><strong>A)</strong> Cirurgia Limpa (Classe I).</li>
  <li><strong>B)</strong> Cirurgia Potencialmente Contaminada / Limpa-Contaminada (Classe II).</li>
  <li><strong>C)</strong> Cirurgia Contaminada (Classe III).</li>
  <li><strong>D)</strong> Cirurgia Infectada / Suja (Classe IV).</li>
</ul>
<p><strong>Gabarito Oficial: Alternativa B.</strong></p>
<p><strong>Comentário Analítico das Alternativas:</strong></p>
<ul>
  <li><strong>Alternativa B (Correta):</strong> Na apendicite aguda inicial (fases catarral e flegmonosa), o trato digestivo é aberto de forma controlada para a secção da base apendicular sem extravasamento grosseiro de fezes e sem necrose/perfuração prévia, enquadrando-se classicamente como <strong>Cirurgia Potencialmente Contaminada (Classe II)</strong>.</li>
  <li><strong>Alternativa A (Incorreta):</strong> Cirurgia limpa não abre tratos colonizados como o gastrointestinal.</li>
  <li><strong>Alternativa C (Incorreta):</strong> Seria contaminada se houvesse extravasamento grosseiro acidental de secreção intestinal ou contaminação peritoneal recente.</li>
  <li><strong>Alternativa D (Incorreta):</strong> Só é classificada como Classe IV (Infectada/Suja) na presença de apendicite perfurada, peritonite purulenta/fecal ou abscesso formado.</li>
</ul>

<h3>Questão Comentada 4 — Tricotomia Pré-Operatória Baseada em Evidências (UERJ)</h3>
<p><strong>Enunciado:</strong> Em relação às recomendações atuais da ANVISA e da Organização Mundial da Saúde (OMS) para o manejo dos pelos no preparo cirúrgico de pacientes agendados para cirurgias eletivas, assinale a conduta correta:</p>
<ul>
  <li><strong>A)</strong> Realizar raspagem minuciosa de toda a região operatória com lâmina de barbear na noite anterior à cirurgia na enfermaria.</li>
  <li><strong>B)</strong> Não remover pelos por rotina; quando a remoção for estritamente necessária por interferir no campo ou curativo, utilizar tricotomizador elétrico com lâmina descartável imediatamente antes do procedimento no centro cirúrgico.</li>
  <li><strong>C)</strong> Aplicar cera depilatória quente 24 horas antes do procedimento para remover os bulbos capilares.</li>
  <li><strong>D)</strong> A presença de pelos no campo operatório contraindica a realização de qualquer cirurgia no Brasil.</li>
</ul>
<p><strong>Gabarito Oficial: Alternativa B.</strong></p>
<p><strong>Comentário Analítico das Alternativas:</strong></p>
<ul>
  <li><strong>Alternativa B (Correta):</strong> A recomendação de grau forte da OMS e ANVISA é não remover pelos por rotina. Se indispensável, utilizar <strong>tricotomizador elétrico (clipper)</strong> no centro cirúrgico imediatamente antes da cirurgia.</li>
  <li><strong>Alternativa A (Incorreta):</strong> A lâmina de barbear (gilete) é formalmente contraindicada porque provoca microlesões na pele que são colonizadas rapidamente por bactérias durante a noite, aumentando significativamente a taxa de ISC.</li>
  <li><strong>Alternativas C e D (Incorretas):</strong> Cera quente causa queimaduras e dermatite inflamatória; pelos não contraindicam a operação.</li>
</ul>

<h3>Questão Comentada 5 — Duração da Antibioticoprofilaxia e Presença de Drenos (SCMSP)</h3>
<p><strong>Enunciado:</strong> Paciente de 58 anos foi submetido a ressecção anterior do reto com anastomose colorretal baixa e colocação de dreno de aspiração fechada (Jackson-Pratt) na pelve. O paciente evolui bem no 3º dia pós-operatório, afebril, com abdome indolor e débito de 50 mL de secreção serossanguinolenta no dreno. O cirurgião deseja manter o antibiótico profilático até a retirada do dreno. De acordo com as diretrizes da ANVISA e do Colégio Brasileiro de Cirurgiões (CBC), qual é a melhor recomendação?</p>
<ul>
  <li><strong>A)</strong> O antibiótico profilático deve ser mantido obrigatoriamente por 14 dias para proteger o orifício do dreno contra colonização ascendente.</li>
  <li><strong>B)</strong> A presença de dreno cirúrgico não justifica a manutenção da antibioticoprofilaxia; o antibiótico deve ser suspenso no pós-operatório imediato (máximo de 24 horas), pois seu prolongamento não previne infecções e induz resistência bacteriana.</li>
  <li><strong>C)</strong> Deve-se associar vancomicina e anfotericina B enquanto o dreno estiver na cavidade.</li>
  <li><strong>D)</strong> Trocar o antibiótico venoso por pomada antibiótica aplicada no trajeto do dreno a cada 2 horas.</li>
</ul>
<p><strong>Gabarito Oficial: Alternativa B.</strong></p>
<p><strong>Comentário Analítico das Alternativas:</strong></p>
<ul>
  <li><strong>Alternativa B (Correta):</strong> É consenso universal nas diretrizes modernas que a <strong>presença de dreno nunca é motivo para manter antibiótico profilático</strong>. A profilaxia deve ser encerrada na sala operatória ou no máximo em 24 horas.</li>
  <li><strong>Alternativas A, C e D (Incorretas):</strong> Prolongar antimicrobianos por causa de dreno não impede contaminação bacteriana e eleva o risco de seleção de patógenos resistentes e colite por <em>Clostridioides difficile</em>.</li>
</ul>

<h3>Questão Comentada 6 — Febre no 6º Dia Pós-Operatório e Conduta na ISC (IAMSPE)</h3>
<p><strong>Enunciado:</strong> No 6º dia após uma colecistectomia aberta eletiva, um paciente de 50 anos comparece ao ambulatório com queixa de febre de 38,5 °C há 24 horas e dor crescente no hipocôndrio direito. O exame da ferida operatória evidencia hiperemia de 1 cm ao redor da incisão, edema e abaulamento flutuante com saída de secreção purulenta à palpação. O paciente está hemodinamicamente estável e sem sinais de peritonite. Qual é a conduta primária e definitiva mais adequada?</p>
<ul>
  <li><strong>A)</strong> Internar imediatamente na UTI e iniciar vancomicina + meropenem sem mexer na ferida.</li>
  <li><strong>B)</strong> Retirar pontos cirúrgicos no local da flutuação, realizar drenagem mecânica ampla da secreção purulenta, lavar a ferida e colher cultura, sem necessidade inicial de antibioticoterapia sistêmica de rotina.</li>
  <li><strong>C)</strong> Prescrever antitérmico e orientar compressas quentes de camomila, mantendo os pontos fechados para evitar contaminação ambiental.</li>
  <li><strong>D)</strong> Realizar nova laparotomia exploradora imediata sob anestesia geral.</li>
</ul>
<p><strong>Gabarito Oficial: Alternativa B.</strong></p>
<p><strong>Comentário Analítico das Alternativas:</strong></p>
<ul>
  <li><strong>Alternativa B (Correta):</strong> O tratamento clássico da ISC incisional superficial é essencialmente <strong>mecânico: abertura de pontos, drenagem ampla da secreção e curativos</strong>. Em pacientes hígidos e sem toxemia, a drenagem adequada dispensa o uso de antibióticos sistêmicos.</li>
  <li><strong>Alternativa A (Incorreta):</strong> Antibióticos potentes não substituem a drenagem do pus e não curam abscesso fechado.</li>
  <li><strong>Alternativas C e D (Incorretas):</strong> Manter pontos fechados perpetua a infecção e pode levar a necrose tecidual; laparotomia seria desproporcional sem evidência de peritonite ou complicação profunda.</li>
</ul>

<h3>Questão Comentada 7 — Cirurgia Limpa com Indicação de Profilaxia (SUS-SP)</h3>
<p><strong>Enunciado:</strong> Em cirurgias classificadas como Limpas (Classe I), a antibioticoprofilaxia cirúrgica não é indicada de rotina na grande maioria dos casos. Em qual das seguintes cirurgias limpas a antibioticoprofilaxia com Cefazolina está FORMALMENTE INDICADA?</p>
<ul>
  <li><strong>A)</strong> Herniorrafia inguinal eletiva primária realizada sem colocação de tela (técnica de Shouldice).</li>
  <li><strong>B)</strong> Artroplastia total de quadril eletiva com colocação de prótese metálica e cimento ortopédico.</li>
  <li><strong>C)</strong> Exérese de lipoma subcutâneo de 3 cm no dorso em paciente hígido.</li>
  <li><strong>D)</strong> Biópsia cirúrgica de linfonodo cervical sob anestesia local.</li>
</ul>
<p><strong>Gabarito Oficial: Alternativa B.</strong></p>
<p><strong>Comentário Analítico das Alternativas:</strong></p>
<ul>
  <li><strong>Alternativa B (Correta):</strong> Nas cirurgias limpas, a profilaxia é formalmente indicada quando há <strong>colocação de prótese ou implante permanente</strong> (como artroplastias, telas de hérnia, próteses vasculares), cirurgias cardíacas ou neurocirurgias, onde o inóculo bacteriano necessário para causar infecção catastrófica cai drasticamente.</li>
  <li><strong>Alternativas A, C e D (Incorretas):</strong> São cirurgias limpas sem prótese em tecidos de baixo risco, onde a taxa de infecção é &lt; 1% a 2%, não havendo benefício demonstrado da profilaxia.</li>
</ul>

<h3>Questão Comentada 8 — Prazos Epidemiológicos de Notificação da ISC (UNIFESP)</h3>
<p><strong>Enunciado:</strong> Um paciente submetido a revascularização do miocárdio com implante de prótese valvar biológica de pericárdio bovino há 75 dias procura o hospital com dor esternal, instabilidade do esterno à palpação e drenagem de secreção purulenta profunda com febre. O cirurgião cardíaco diagnostica mediastinite pós-operatória. De acordo com os critérios de vigilância epidemiológica de IRAS da ANVISA e do CDC/NHSN, esse caso:</p>
<ul>
  <li><strong>A)</strong> Não pode ser considerado infecção de sítio cirúrgico, pois qualquer infecção após 30 dias do procedimento é considerada comunitária.</li>
  <li><strong>B)</strong> É classificado como Infecção do Sítio Cirúrgico de Órgão/Espaço (Mediastinite), pois em cirurgias com colocação de implante/prótese o período de vigilância epidemiológica estende-se por até 90 dias após o ato cirúrgico.</li>
  <li><strong>C)</strong> É classificado como ISC Incisional Superficial decorrente de má higiene no domicílio.</li>
  <li><strong>D)</strong> Só poderia ser notificado se o paciente permanecesse internado ininterruptamente no hospital desde a cirurgia.</li>
</ul>
<p><strong>Gabarito Oficial: Alternativa B.</strong></p>
<p><strong>Comentário Analítico das Alternativas:</strong></p>
<ul>
  <li><strong>Alternativa B (Correta):</strong> O prazo de vigilância para ISC profunda ou de órgão/espaço é de até <strong>30 dias para cirurgias sem prótese</strong> e de até <strong>90 dias para procedimentos com colocação de implante ou prótese permanente</strong> (como a prótese valvar cardíaca). Como ocorreu no 75º dia, enquadra-se perfeitamente nos critérios oficiais de vigilância.</li>
  <li><strong>Alternativas A, C e D (Incorretas):</strong> Ignoram a ampliação do prazo de vigilância para 90 dias em implantes e o fato de que a notificação independe de internação contínua.</li>
</ul>

<h3>Questão Comentada 9 — Alergia Grave a Betalactâmicos em Cirurgia Colorretal (ENARE / UFRJ)</h3>
<p><strong>Enunciado:</strong> Paciente de 64 anos com antecedente de choque anafilático documentado após uso de amoxicilina necessita realizar retossigmoidectomia aberta eletiva por neoplasia de reto. Considerando a contraindicação absoluta ao uso de betalactâmicos (penicilinas e cefalosporinas), qual é o esquema de antibioticoprofilaxia parenteral alternativo mais adequado?</p>
<ul>
  <li><strong>A)</strong> Cefazolina + Metronidazol em dose dobrada.</li>
  <li><strong>B)</strong> Gentamicina (ou Ciprofloxacino) associada a Metronidazol (ou Clindamicina).</li>
  <li><strong>C)</strong> Amoxicilina associada a Clavulanato de potássio com pré-medicação de difenidramina.</li>
  <li><strong>D)</strong> Não administrar nenhum antimicrobiano, realizando apenas lavagem com água boricada.</li>
</ul>
<p><strong>Gabarito Oficial: Alternativa B.</strong></p>
<p><strong>Comentário Analítico das Alternativas:</strong></p>
<ul>
  <li><strong>Alternativa B (Correta):</strong> Em caso de alergia grave mediada por IgE (choque anafilático), todos os betalactâmicos são proibidos. Em cirurgia colorretal, a cobertura deve abranger Gram-negativos entéricos (suprida pela <strong>Gentamicina ou Ciprofloxacino</strong>) e anaeróbios estritos como <em>B. fragilis</em> (suprida pelo <strong>Metronidazol</strong>).</li>
  <li><strong>Alternativas A e C (Incorretas):</strong> Cefazolina e amoxicilina/clavulanato são betalactâmicos e podem desencadear novo choque anafilático letal.</li>
  <li><strong>Alternativa D (Incorreta):</strong> Deixar cirurgia colorretal sem profilaxia resulta em taxa de infecção de 30% a 40%.</li>
</ul>

<h3>Questão Comentada 10 — Deiscência Aponeurótica e Evisceração Abdominal (FMRP-USP)</h3>
<p><strong>Enunciado:</strong> No 7º dia de pós-operatório de uma laparotomia exploradora mediana por trauma abdominal, o médico plantonista da enfermaria é chamado com urgência ao leito de um paciente que, após um acesso intenso de tosse, apresentou exteriorização espontânea de alças de intestino delgado através da incisão cirúrgica aberta. Ao exame, o paciente está ansioso, taquicárdico, com PA de 110/70 mmHg e alças intestinais viáveis sobre o abdome. Qual é a conduta sequencial correta a ser adotada imediatamente no leito antes da condução ao centro cirúrgico?</p>
<ul>
  <li><strong>A)</strong> Tentar reintroduzir imediatamente as alças intestinais para a cavidade abdominal à beira-leito com compressas secas e fechar a pele com grampeador metálico.</li>
  <li><strong>B)</strong> Cobrir as alças intestinais expostas com compressas estéreis embebidas em soro fisiológico morno a 0,9%, manter jejum absoluto, prescrever analgesia e antibiótico parenteral e encaminhar imediatamente para laparotomia exploradora em centro cirúrgico.</li>
  <li><strong>C)</strong> Aplicar pomada de sulfadiazina de prata sobre as alças e solicitar tomografia de abdome com contraste oral.</li>
  <li><strong>D)</strong> Conceder alta com orientação de retornar em 48 horas se houver piora da dor.</li>
</ul>
<p><strong>Gabarito Oficial: Alternativa B.</strong></p>
<p><strong>Comentário Analítico das Alternativas:</strong></p>
<ul>
  <li><strong>Alternativa B (Correta):</strong> A conduta imediata diante de evisceração é <strong>proteger as alças com compressas estéreis umedecidas em soro fisiológico morno</strong> para evitar ressecamento, necrose e hipotermia, mantendo jejum e suporte até o reparo cirúrgico definitivo de emergência.</li>
  <li><strong>Alternativa A (Incorreta):</strong> É terminantemente proibido tentar reduzir alças evisceradas no leito sob dor e tensão muscular, pois há risco de perfuração iatrogênica e estrangulamento herniário.</li>
  <li><strong>Alternativas C e D (Incorretas):</strong> Condutas absurdas que postergam intervenção salvadora de emergência cirúrgica.</li>
</ul>
`
    },
    {
      id: 'sintese-retencao-referencias-oficiais-isc',
      title: '13. Síntese Executiva de Alta Retenção e Referências Oficiais da ANVISA, CDC e OMS',
      body_html: `
<h3>Síntese Executiva de Alta Retenção para Provas de Residência Médica</h3>
<ul>
  <li><strong>Definições e Prazos Oficiais da ISC (ANVISA / CDC):</strong>
    <ul>
      <li><em>Incisional Superficial:</em> Pele e subcutâneo; prazo de até <strong>30 dias</strong> (mesmo com prótese). Tratamento: abertura de pontos e drenagem ampla (antibiótico apenas se celulite &gt; 5 cm ou toxemia).</li>
      <li><em>Incisional Profunda:</em> Fáscia/aponeurose e músculo; prazo de até <strong>30 dias sem implante</strong> ou até <strong>90 dias com implante/prótese</strong>.</li>
      <li><em>Órgão/Espaço:</em> Qualquer cavidade ou víscera manipulada (abscesso cavitário, peritonite, empiema); prazo de <strong>30 dias (sem prótese) ou 90 dias (com prótese)</strong>.</li>
    </ul>
  </li>
  <li><strong>Potencial de Contaminação das Cirurgias:</strong>
    <ul>
      <li><em>Classe I (Limpa):</em> Não abre tratos colonizados; sem profilaxia rotineira (exceto prótese, cardíaca e neurocirurgia).</li>
      <li><em>Classe II (Potencialmente Contaminada):</em> Abre TGI, respiratório, biliar ou geniturinário sob controle; profilaxia universal recomendada.</li>
      <li><em>Classe III (Contaminada):</em> Trauma recente &lt; 4h, extravasamento grosseiro de fezes/bile sem peritonite prévia; profilaxia/tratamento imediato.</li>
      <li><em>Classe IV (Infectada/Suja):</em> Trauma tardio &gt; 4h, víscera perfurada, peritonite ou abscesso prévio; <strong>antibioticoterapia terapêutica de pleno espectro</strong> (não é profilaxia!).</li>
    </ul>
  </li>
  <li><strong>Bundle de Prevenção da OMS e ANVISA:</strong>
    <ul>
      <li><em>Tricotomia:</em> Não remover por rotina; se indispensável, com <strong>tricotomizador elétrico (clipper)</strong> no centro cirúrgico imediatamente antes (PROIBIDO lâmina de barbear!).</li>
      <li><em>Antissepsia da Pele:</em> <strong>Clorexidina alcoólica a 2%</strong> com secagem completa de 2–3 min antes do bisturi elétrico (prevenção de fogo).</li>
      <li><em>Normotermia:</em> Manter temperatura central <strong>&ge; 36,0 °C</strong> com mantas de ar aquecido.</li>
      <li><em>Controle Glicêmico:</em> Glicemia perioperatória <strong>&lt; 180 mg/dL</strong> em diabéticos e não diabéticos.</li>
      <li><em>Oxigenação:</em> FiO₂ a 80% intraoperatória e pós-extubação precoce sob ventilação mecânica.</li>
    </ul>
  </li>
  <li><strong>Regras Práticas de Antibioticoprofilaxia:</strong>
    <ul>
      <li><em>Droga de Escolha:</em> <strong>Cefazolina</strong> 2 g IV (aumentar para <strong>3 g se peso &ge; 120 kg</strong>).</li>
      <li><em>Timing de Infusão:</em> <strong>30 a 60 minutos antes da incisão da pele</strong> (inclusive na cesariana). Vancomicina e Ciprofloxacino: 60 a 120 minutos antes.</li>
      <li><em>Repiques Intraoperatórios:</em> Administrar nova dose a cada <strong>duas meias-vidas</strong> (Cefazolina a cada <strong>4 horas</strong>) ou se <strong>sangramento &gt; 1.500 mL</strong>.</li>
      <li><em>Duração:</em> Dose única na indução ou mantida por no <strong>máximo 24 horas</strong>. <strong>Dreno cirúrgico NUNCA justifica manter antibiótico!</strong></li>
      <li><em>Alergia Grave a Betalactâmicos (Choque/Anafilaxia):</em> Vancomicina ou Clindamicina + Gentamicina (ou Ciprofloxacino ou Aztreonam).</li>
    </ul>
  </li>
  <li><strong>Febre Pós-Operatória e Deiscência:</strong>
    <ul>
      <li>D1–D2: Atelectasia (Wind) -> analgesia, fisioterapia e deambulação (não usar antibiótico!).</li>
      <li>D3: ITU associada a cateter (Water).</li>
      <li>D5–D7: Infecção do Sítio Cirúrgico (Wound) -> inspecionar, drenar pus.</li>
      <li>D7–D10: Trombose Venosa Profunda / TEP (Walking).</li>
      <li><em>Exceção Hiperaguda (D1–D2):</em> Dor lancinante desproporcional + toxemia = <strong>Fasciíte Necrosante por S. pyogenes ou C. perfringens</strong> (emergência cirúrgica radical imediata!).</li>
      <li><em>Sinal da "Água de Melão" (D5–D8):</em> Saída súbita de secreção serossanguinolenta transparente pela incisão = <strong>deiscência aponeurótica aguda</strong> (reoperação urgente para ressutura).</li>
    </ul>
  </li>
</ul>
`
    }
  ],
  references: [
    {
      label: 'BRASIL. Agência Nacional de Vigilância Sanitária (ANVISA). Critérios Diagnósticos de Infecções Relacionadas à Assistência à Saúde (Série Segurança do Paciente e Qualidade em Serviços de Saúde). Brasília: ANVISA, 2023.',
      url: 'https://www.gov.br/anvisa/pt-br/centraisdeconteudo/publicacoes/servicosdesaude/publicacoes/modulo-2-criterios-diagnosticos-de-infeccao-relacionada-a-assistencia-a-saude.pdf'
    },
    {
      label: 'WORLD HEALTH ORGANIZATION (WHO). Global guidelines for the prevention of surgical site infection. 2. ed. Geneva: World Health Organization, 2018.',
      url: 'https://www.who.int/publications/i/item/9789241550475'
    },
    {
      label: 'BERRIOS-TORRES, S. I. et al. Centers for Disease Control and Prevention Guideline for the Prevention of Surgical Site Infection, 2017. JAMA Surgery, v. 152, n. 8, p. 784-791, 2017.',
      url: 'https://jamanetwork.com/journals/jamasurgery/fullarticle/2623725'
    },
    {
      label: 'BRATZLER, D. W. et al. Clinical practice guidelines for antimicrobial prophylaxis in surgery. American Journal of Health-System Pharmacy (ASHP/IDSA/SIS/SHEA), v. 70, n. 3, p. 195-283, 2013.',
      url: 'https://academic.oup.com/ajhp/article/70/3/195/5112111'
    },
    {
      label: 'COLÉGIO BRASILEIRO DE CIRURGIÕES (CBC). Diretrizes de Antibioticoprofilaxia em Cirurgia. Rio de Janeiro: CBC, 2022.',
      url: 'https://cbc.org.br/wp-content/uploads/2022/10/Diretrizes-Antibioticoprofilaxia-CBC.pdf'
    },
    {
      label: 'BRASIL. Ministério da Saúde. Protocolo de Cirurgia Segura. Brasília: Ministério da Saúde / ANVISA / Fiocruz, 2022.',
      url: 'https://www.gov.br/saude/pt-br/composicao/saes/seguranca-do-paciente/protocolos-de-seguranca-do-paciente/protocolo-cirurgia-segura.pdf'
    }
  ]
};

saveBook(book);
