import { saveBook } from './bloco-02-utils.mjs';

const bookEsf = {
  slug: 'estrategia-saude-da-familia',
  title: 'Estratégia Saúde da Família',
  area: 'Medicina Preventiva',
  materia: 'Atenção Primária e Saúde da Família',
  description: 'Tratado completo sobre a Estratégia Saúde da Família (ESF): bases históricas, atributos de Starfield, territorialização, processo de trabalho, acesso avançado, abordagem familiar (genograma, ecomapa, Coelho-Savassi), MCCP, e-SUS APS/CIAP-2, eMulti e novo cofinanciamento federal.',
  sections: [
    {
      id: 'evolucao-historica-pacs-psf-esf',
      title: '1. Evolução Histórica, Epistemológica e Institucional: Do PACS e PSF à Estratégia Saúde da Família',
      body_html: `
<h3>Raízes Históricas da Atenção Primária e a Reforma Sanitária Brasileira</h3>
<p>A construção da Estratégia Saúde da Família (ESF) no Brasil representa a mais profunda transformação estrutural do modelo tecnoassistencial do Sistema Único de Saúde (SUS) desde a promulgação da Constituição Federal de 1988 e das Leis Orgânicas da Saúde (Lei nº 8.080/1990 e Lei nº 8.142/1990). Durante décadas, o sistema público de assistência médica no país — hegemonizado pelo antigo Instituto Nacional de Assistência Médica da Previdência Social (INAMPS) — estruturou-se sob um paradigma hospitalocêntrico, médico-centrado, curativista, fragmentado e voltado prioritariamente aos trabalhadores inseridos no mercado formal urbano. Paralelamente, as ações de saúde pública sob responsabilidade do Ministério da Saúde limitavam-se a campanhas sanitárias verticalizadas e programas focalizados de controle de endemias, dissociados do cuidado clínico longitudinal.</p>
<p>A Conferência Internacional sobre Cuidados Primários de Saúde de Alma-Ata (1978), sob a égide da Organização Mundial da Saúde (OMS) e do UNICEF, consolidou o marco conceitual de que os cuidados primários constituem a chave para atingir a meta de "Saúde para Todos", integrando promoção, prevenção, cura e reabilitação no nível comunitário com participação social ativa. No Brasil, experiências pioneiras desenvolvidas ao longo das décadas de 1970 e 1980 — como o Serviço de Saúde Comunitária do Grupo Hospitalar Conceição (Porto Alegre/RS), os projetos de Medicina Comunitária em Montes Claros (MG), Niterói (RJ) e Londrina (PR), e a criação dos primeiros programas de Residência em Medicina Geral e Comunitária (atual Medicina de Família e Comunidade) — demonstraram a viabilidade técnica e a resolutividade de equipes generalistas inseridas diretamente no território.</p>

<h3>O Programa de Agentes Comunitários de Saúde (PACS, 1991) como Embrião</h3>
<p>A transição operacional para o modelo de Saúde da Família iniciou-se no sertão nordestino. Em 1987, o estado do Ceará implantou o Programa de Agentes de Saúde como frente emergencial de combate à seca e à altíssima mortalidade infantil, recrutando moradores das próprias comunidades, predominantemente mulheres com liderança local, para realizar visitas domiciliares mensais de estímulo ao aleitamento materno, terapia de reidratação oral (TRO), acompanhamento vacinal e captação precoce de gestantes. O impacto epidemiológico rápido e expressivo na queda da mortalidade infantil pós-neonatal levou o Ministério da Saúde a institucionalizar nacionalmente, em 1991, o Programa de Agentes Comunitários de Saúde (PACS).</p>
<p>O PACS introduziu na arquitetura do SUS três pilares operacionais que se tornariam definitivos na Atenção Primária à Saúde (APS) brasileira: a delimitação física de microáreas com adscrição de famílias a um trabalhador específico, a visita domiciliar sistemática como tecnologia de busca ativa e vigilância à saúde, e o enfoque na família (e não apenas no indivíduo isolado) como unidade nuclear de intervenção sanitária. Contudo, a prática cotidiana do PACS rapidamente evidenciou um estrangulamento assistencial: os Agentes Comunitários de Saúde (ACS) identificavam com alta sensibilidade os problemas clínicos e sociais no domicílio, mas não dispunham de retaguarda médica e de enfermagem estruturada na própria comunidade para resolver as demandas levantadas, gerando filas nas portas de pronto-socorros hospitalares.</p>

<h3>Do Programa de Saúde da Família (PSF, 1994) à Estratégia Saúde da Família (ESF, 2006)</h3>
<p>Para superar o gargalo de resolutividade clínica do PACS e responder à crise de financiamento e organização da rede básica municipalizada no início da década de 1990, o Ministério da Saúde lançou, em março de 1994, o Programa de Saúde da Família (PSF), inspirado nas experiências municipais de Quixadá (CE), Niterói (RJ — Médico de Família de inspiração cubana) e nos modelos de saúde pública do Reino Unido (National Health Service — NHS), Canadá e Cuba. Inicialmente concebido sob a ótica de um programa focalizado em áreas de maior vulnerabilidade socioeconômica e vazio assistencial (mapeadas pelo Mapa da Fome do IPEA), o PSF organizava equipes multiprofissionais mínimas compostas por médico generalista ou de família, enfermeiro, auxiliar de enfermagem e agentes comunitários de saúde.</p>
<p>Dois anos após sua criação, a edição da Norma Operacional Básica de 1996 (NOB-SUS 01/1996, implementada a partir de 1998) promoveu uma ruptura paradigmática no financiamento federal da saúde ao instituir o Piso da Atenção Básica (PAB), dividido em uma fração fixa per capita (PAB Fixo, transferido fundo a fundo de forma automática segundo a população total do município, rompendo com a lógica perversa do pagamento por procedimento da tabela SIA/SUS) e uma fração variável (PAB Variável), que criava incentivos financeiros progressivos diretamente atrelados à adesão municipal ao PSF e ao PACS. Esse desenho indutor desencadeou uma expansão vertiginosa de equipes em todo o território nacional.</p>
<p>Na esfera conceitual e jurídico-administrativa, o termo "Programa" revelou-se inadequado: na tradição da administração pública, um programa designa uma intervenção vertical, setorial e com temporalidade finita (início, meio e fim). Como a proposta visava reorganizar de modo permanente e estruturante toda a porta de entrada e o modelo assistencial do SUS, a primeira Política Nacional de Atenção Básica (PNAB, Portaria GM/MS nº 648/2006), publicada no escopo do Pacto pela Saúde, consagrou oficialmente a mudança de nomenclatura de Programa de Saúde da Família para <strong>Estratégia Saúde da Família (ESF)</strong>. A ESF deixou de ser vista como um pacote paralelo para populações carentes e afirmou-se como a estratégia prioritária, permanente e universal de expansão, qualificação e consolidação da Atenção Básica brasileira.</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Dimensão Analítica</th>
      <th>Modelo Biomédico Tradicional (Unidade Básica Tradicional / Pronto-Atendimento)</th>
      <th>Modelo da Estratégia Saúde da Família (ESF / APS Ordenadora)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Objeto e Foco da Atenção</strong></td>
      <td>A doença, o órgão afetado e a queixa aguda isolada do indivíduo que procura espontaneamente o serviço.</td>
      <td>A pessoa em sua integralidade biopsicossocial, inserida em seu contexto familiar, domiciliar e comunitário.</td>
    </tr>
    <tr>
      <td><strong>Relação com o Território</strong></td>
      <td>Passiva e desterritorializada; atende por livre demanda geográfica sem responsabilidade sanitária sobre quem não comparece.</td>
      <td>Ativa, territorializada e com adscrição de clientela; responsabilidade sanitária integral pela população residente na área e microáreas.</td>
    </tr>
    <tr>
      <td><strong>Organização da Demanda</strong></td>
      <td>Predomínio absoluto da demanda espontânea fragmentada ou de agendas rígidas por especialidades básicas (clínico, pediatra, GO).</td>
      <td>Equilíbrio dinâmico entre demanda espontânea acolhida com classificação de risco e cuidado continuado/programado longitudinal.</td>
    </tr>
    <tr>
      <td><strong>Processo de Trabalho</strong></td>
      <td>Trabalho médico isolado, centrado na prescrição medicamentosa, solicitação de exames e encaminhamento precoce a especialistas.</td>
      <td>Trabalho interprofissional em equipe (médico, enfermeiro, técnico, ACS, equipe de saúde bucal e eMulti), com clínica ampliada e matriciamento.</td>
    </tr>
    <tr>
      <td><strong>Conceito de Saúde-Doença</strong></td>
      <td>Ausência biológica de enfermidade; abordagem unicausal ou multicausal restrita a fatores de risco individuais.</td>
      <td>Determinação social do processo saúde-doença; articulação entre promoção da saúde, prevenção (primária a quaternária), cura, reabilitação e paliação.</td>
    </tr>
    <tr>
      <td><strong>Vínculo e Longitudinalidade</strong></td>
      <td>Episódico e pontual; cada consulta pode ocorrer com um plantonista ou profissional distinto, sem memória assistencial.</td>
      <td>Vínculo interpessoal duradouro ao longo do ciclo vital; a mesma equipe acompanha o indivíduo e sua família ao longo dos anos.</td>
    </tr>
  </tbody>
</table>
`
    },
    {
      id: 'atributos-starfield-modelo-assistencial',
      title: '2. Atributos Essenciais e Derivados da APS (Barbara Starfield) Aplicados à ESF',
      body_html: `
<h3>A Sistematização de Barbara Starfield e a Avaliação pelo PCATool</h3>
<p>A pesquisadora norte-americana Barbara Starfield (Universidade Johns Hopkins) estabeleceu a matriz teórico-metodológica mais cobrada em provas de residência médica e concursos do SUS para definir e mensurar a qualidade da Atenção Primária à Saúde. Segundo Starfield, um serviço de primeiro nível de contato somente pode ser caracterizado como verdadeira APS quando apresenta, de forma sinérgica e mensurável (por instrumentos validados como o <em>Primary Care Assessment Tool — PCATool</em>), quatro <strong>atributos essenciais</strong> e três <strong>atributos derivados</strong>. A Estratégia Saúde da Família é o arranjo organizacional brasileiro que apresenta os maiores escores no PCATool quando comparado às unidades básicas tradicionais.</p>

<h3>Os Quatro Atributos Essenciais da APS na Prática da ESF</h3>
<h4>1. Acesso de Primeiro Contato (Porta de Entrada Preferencial)</h4>
<p>O acesso de primeiro contato implica que a unidade de Saúde da Família deve ser procurada regularmente pela população adscrita a cada novo problema de saúde ou novo episódio de um mesmo problema, excetuando-se apenas as situações de urgência/emergência grave com risco iminente de morte. Na teoria de Starfield, é fundamental distinguir <strong>acessibilidade</strong> (elemento estrutural que possibilita que as pessoas cheguem ao serviço: localização geográfica no bairro, ausência de barreiras arquitetônicas, horário de funcionamento compatível com a rotina dos trabalhadores, disponibilidade de agendamento no mesmo dia ou em até 48 horas, ausência de cobrança financeira) de <strong>acesso / utilização</strong> (a efetivação do uso do serviço pelo cidadão a cada necessidade percebida). Na ESF, a presença capilar das Unidades Básicas de Saúde (UBS) nos bairros e a atuação cotidiana dos ACS mitigam barreiras geográficas, culturais e organizacionais.</p>

<h4>2. Longitudinalidade (Vínculo Longitudinal do Cuidado)</h4>
<p>A longitudinalidade define a existência de uma fonte contínua e regular de atenção ao longo do tempo, independentemente da presença ou ausência de doenças específicas. Trata-se de uma relação pessoal de longa duração entre os profissionais da equipe de Saúde da Família e os usuários de seu território, construída sobre confiança mútua, responsabilização e conhecimento acumulado da biografia clínica, familiar e social do paciente. Nas provas de residência, é clássico o cuidado para não confundir <strong>longitudinalidade</strong> com a mera "continuidade da atenção": a continuidade refere-se ao acompanhamento sequencial de um episódio específico de doença (por exemplo, fazer o pré-operatório, a cirurgia e a revisão pós-operatória de uma colecistectomia), podendo ocorrer na atenção secundária ou terciária sem vínculo duradouro; já a longitudinalidade acompanha a <em>pessoa</em> ao longo de anos e décadas através de múltiplos eventos vitais e condições clínicas distintas.</p>

<h4>3. Integralidade (Abrangência / Comprehensiveness)</h4>
<p>No referencial de Starfield, a integralidade possui um sentido operacional preciso (tradução de <em>comprehensiveness</em> ou abrangência de serviços): significa que a equipe da ESF deve reconhecer um amplo espectro de necessidades orgânicas, psíquicas e sociais da população adscrita e dispor de carteira de serviços capaz de ofertar ações de promoção da saúde, prevenção primária, secundária, terciária e quaternária, diagnóstico precoce, tratamento de condições agudas e crônicas, pequenos procedimentos ambulatoriais (sutura, drenagem de abscesso, exérese de lesões cutâneas, lavagem otológica, inserção de DIU, cantoplastia), reabilitação e cuidados paliativos domiciliares. Mesmo quando determinada intervenção tecnológica (como uma hemodiálise ou quimioterapia) precisa ser executada em outro ponto da Rede de Atenção à Saúde, cabe à equipe da ESF identificar a necessidade e garantir o encaminhamento oportuno, mantendo o acompanhamento compartilhado.</p>

<h4>4. Coordenação do Cuidado (Integração da Rede e dos Sistemas de Informação)</h4>
<p>A coordenação pressupõe a capacidade de garantir a continuidade e a articulação das informações clínicas e dos planos terapêuticos quando o usuário transita por diferentes profissionais dentro da própria UBS ou por outros níveis de atenção (ambulatórios de especialidades, CAPS, UPA, hospitais). Na linguagem consagrada pelas diretrizes ministeriais, a ESF atua como o "centro de comunicação" das Redes de Atenção à Saúde (RAS), ordenando os fluxos e contrafluxos de pessoas, produtos e informações. A coordenação depende de prontuários clínicos integrados (como o Prontuário Eletrônico do Cidadão — PEC e-SUS APS), protocolos de regulação clínica e mecanismos efetivos de referência e contrarreferência.</p>

<h3>Os Três Atributos Derivados da APS</h3>
<ul>
  <li><strong>Orientação Familiar (Centralidade na Família):</strong> O conhecimento dos fatores clínicos individuais é ampliado pela avaliação do contexto familiar. A equipe reconhece como a dinâmica intrafamiliar, o estágio do ciclo de vida, as crenças geracionais e a vulnerabilidade econômica da família influenciam a gênese das doenças, a adesão medicamentosa e a recuperação do paciente, utilizando ferramentas como o genograma e o ecomapa.</li>
  <li><strong>Orientação Comunitária:</strong> O reconhecimento de que as necessidades de saúde da população não podem ser compreendidas nem resolvidas apenas no consultório individual. Exige o cruzamento de dados epidemiológicos locais com o contato direto com a comunidade, lideranças locais, escolas e equipamentos sociais, planejando intervenções coletivas e intersetoriais sobre o território.</li>
  <li><strong>Competência Cultural:</strong> A capacidade de a equipe adaptar sua linguagem, suas práticas clínicas e suas propostas terapêuticas às especificidades culturais, étnico-raciais, religiosas, linguísticas e sociais da comunidade atendida (como populações ribeirinhas, quilombolas, indígenas, população em situação de rua, comunidades LGBTQIA+ ou grupos religiosos tradicionais), estabelecendo uma relação horizontal de respeito aos saberes populares sem abdicar do rigor técnico-científico.</li>
</ul>

<table class="book-table">
  <thead>
    <tr>
      <th>Atributo de Starfield</th>
      <th>Classificação</th>
      <th>Pergunta-Chave na Avaliação (PCATool)</th>
      <th>Expressão Prática na Rotina da ESF</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Acesso de Primeiro Contato</strong></td>
      <td>Essencial</td>
      <td>"Quando você tem um novo problema de saúde, você procura primeiro sua equipe da UBS antes de ir a outro lugar?"</td>
      <td>Acolhimento diário em todos os turnos, Acesso Avançado, ausência de fichas limitadas na madrugada, horário estendido (Saúde na Hora).</td>
    </tr>
    <tr>
      <td><strong>Longitudinalidade</strong></td>
      <td>Essencial</td>
      <td>"Você é atendido pelo mesmo médico/enfermeiro ao longo do tempo e sente que ele o conhece como pessoa?"</td>
      <td>Adscrição por microárea e equipe de referência; baixa rotatividade profissional; acompanhamento do pré-natal à senectude.</td>
    </tr>
    <tr>
      <td><strong>Integralidade</strong></td>
      <td>Essencial</td>
      <td>"Sua UBS resolve a grande maioria dos seus problemas (80% a 90%), incluindo procedimentos, saúde mental e prevenção?"</td>
      <td>Carteira de serviços ampla (CaSAPS), inserção de DIU, pequenas cirurgias, manejo de depressão/ansiedade, pré-natal e puericultura.</td>
    </tr>
    <tr>
      <td><strong>Coordenação do Cuidado</strong></td>
      <td>Essencial</td>
      <td>"Seu médico de família sabe dos resultados e tratamentos feitos quando você consultou com um especialista focal?"</td>
      <td>Prontuário Eletrônico do Cidadão (PEC), gestão de listas de espera no SISREG, discussão de casos via telessaúde e matriciamento.</td>
    </tr>
    <tr>
      <td><strong>Orientação Familiar</strong></td>
      <td>Derivado</td>
      <td>"Os profissionais perguntam sobre a opinião e as condições da sua família ao planejar seu tratamento?"</td>
      <td>Prontuário estruturado por núcleo domiciliar/familiar, construção de genograma, conferência familiar em cuidados paliativos.</td>
    </tr>
    <tr>
      <td><strong>Orientação Comunitária</strong></td>
      <td>Derivado</td>
      <td>"A equipe realiza pesquisas na comunidade, visitas domiciliares e participa do Conselho Local de Saúde?"</td>
      <td>Diagnóstico situacional participativo, atuação dos ACS nas microáreas, ações no Programa Saúde na Escola (PSE).</td>
    </tr>
    <tr>
      <td><strong>Competência Cultural</strong></td>
      <td>Derivado</td>
      <td>"Os profissionais compreendem e respeitam suas crenças, costumes locais e linguagem popular?"</td>
      <td>Comunicação clínica sem jargões inacessíveis, respeito à fitoterapia tradicional segura, equipes específicas (eSFR, eCR, eSE).</td>
    </tr>
  </tbody>
</table>
`
    },
    {
      id: 'territorializacao-adscricao-microareas',
      title: '3. Territorialização em Saúde, Diagnóstico Comunitário e Gestão de Microáreas',
      body_html: `
<h3>O Conceito Geográfico-Crítico de Território vivo (Milton Santos) na ESF</h3>
<p>Na Estratégia Saúde da Família, o território não é concebido sob a perspectiva meramente cartográfica ou político-administrativa de um espaço físico estático delimitado por ruas e CEP (território-solo). Inspirada na geografia crítica de Milton Santos, a Saúde Coletiva brasileira compreende o <strong>território como um espaço vivo, dinâmico e em permanente construção histórico-social</strong> (território-processo), onde se materializam as relações de produção, o trabalho, as redes de solidariedade, as iniquidades socioeconômicas, os riscos ambientais e o perfil epidemiológico de uma população.</p>
<p>A <strong>territorialização</strong> é, portanto, o processo contínuo de apropriação, reconhecimento, mapeamento e análise das condições de vida e saúde de uma área geográfica delimitada pela equipe da ESF, servindo de base indispensável para o planejamento local ascendente e para a vigilância em saúde. Sem territorialização ativa, a UBS reduz-se a um posto burocrático que aguarda passivamente os doentes que conseguem atravessar a porta.</p>

<h3>Taxonomia Territorial na Atenção Básica: Distrito, Área e Microárea</h3>
<p>Para fins de organização político-operacional do SUS municipal e da ESF, a divisão territorial obedece a uma hierarquia funcional precisa, recorrentemente cobrada em provas de residência médica:</p>
<ul>
  <li><strong>Município / Distrito Sanitário:</strong> Unidade político-administrativa que agrega múltiplas Unidades Básicas de Saúde e equipamentos de apoio diagnóstico, regulação e vigilância, dotada de coordenação gestora regionalizada em municípios de médio e grande porte.</li>
  <li><strong>Território de Abrangência (Unidade Básica de Saúde — UBS):</strong> Espaço geográfico sob responsabilidade sanitária global de uma UBS, podendo comportar uma ou mais equipes de Saúde da Família (recomenda-se até 3 ou 4 eSF por estrutura física de UBS para preservar a escala humana, a ambiência acolhedora e o vínculo com a comunidade).</li>
  <li><strong>Área de Abrangência (Equipe de Saúde da Família — eSF):</strong> Fração geográfica e populacional sob responsabilidade direta de <strong>uma única equipe de Saúde da Família (eSF)</strong>. De acordo com a PNAB 2017 (Portaria nº 2.436/2017), o parâmetro populacional de referência para uma eSF na modalidade padrão é de <strong>2.000 a 3.500 pessoas</strong>, mas o novo modelo de cofinanciamento federal instituído pela <strong>Portaria GM/MS nº 3.493/2024</strong> (que substituiu o Previne Brasil) redefiniu as faixas de parâmetro de cadastro por porte populacional do município e estrato de vulnerabilidade social (IED — Índice de Equidade e Dimensionamento), situando o parâmetro ideal ao redor de 2.000 a 3.000 pessoas por eSF (podendo ser menor em áreas de extrema vulnerabilidade ou dispersão rural).</li>
  <li><strong>Microárea (Agente Comunitário de Saúde — ACS):</strong> Subdivisão mínima do território da equipe, sob responsabilidade direta de <strong>um Agente Comunitário de Saúde (ACS)</strong>. Pela regra normativa da PNAB, cada microárea deve congregar no máximo <strong>750 pessoas</strong>. A divisão das microáreas não deve basear-se apenas na simetria geométrica de quarteirões, mas sim na densidade demográfica, nas barreiras geográficas (rios, rodovias, encostas de morro) e, crucialmente, no <strong>grau de vulnerabilidade socioambiental e sanitária</strong> (em bolsões de extrema pobreza, alta prevalência de acamados e violência, uma microárea deve ter contingente populacional reduzido — por exemplo, 350 a 500 pessoas — para permitir visitas mais frequentes e intensivas).</li>
  <li><strong>Unidade Domiciliar / Família:</strong> O lócus microscópico do cuidado, cadastrado no e-SUS APS por meio da Ficha de Cadastro Domiciliar e Territorial e da Ficha de Cadastro Individual de cada morador, vinculadas entre si pelo núcleo familiar.</li>
</ul>

<h3>Etapas Operacionais do Processo de Territorialização e Mapa Inteligente</h3>
<p>Quando uma equipe de Saúde da Família é implantada ou reorganiza seu território, o processo de territorialização desdobra-se em etapas metodológicas articuladas:</p>
<ol>
  <li><strong>Reconhecimento Geográfico e Ambiental (Estimativa Rápida Participativa):</strong> Caminhada sistemática pelo território (<em>walk-through</em>) com toda a equipe e informantes-chave da comunidade (líderes comunitários, comerciantes antigos, agentes de pastorais, professores), identificando limites físicos, barreiras de acesso (escadarias íngremes, pontes precárias, linhas de trem, fronteiras de conflito armado), condições de saneamento básico (esgoto a céu aberto, coleta de lixo, abastecimento de água), focos de vetores e áreas de risco geológico (deslizamentos e alagamentos).</li>
  <li><strong>Levantamento dos Equipamentos Sociais e Recursos Comunitários:</strong> Mapeamento de escolas, creches, centros comunitários, igrejas/terreiros/templos, associações de moradores, unidades do CRAS/CREAS, farmácias, feiras livres e espaços de lazer, que funcionarão como parceiros intersetoriais e espaços potenciais para grupos operativos.</li>
  <li><strong>Cadastramento Domiciliar e Individual (e-SUS APS):</strong> Visitação censitária de 100% dos domicílios das microáreas pelos ACS, preenchendo as condições habitacionais, socioeconômicas e sociodemográficas, além da identificação nominal de gestantes, puérperas, lactentes, hipertensos, diabéticos, tabagistas, acamados, pessoas com deficiência e sintomáticos respiratórios.</li>
  <li><strong>Construção do Mapa Inteligente (Mapa Vivo ou Georreferenciamento):</strong> Representação visual na sala da equipe (física com alfinetes/marcadores coloridos ou digital em Sistema de Informação Geográfica — SIG) onde são plotados espacialmente os agravos prioritários (gestantes de alto risco, casos de tuberculose em Tratamento Diretamente Observado, focos de <em>Aedes aegypti</em>, pacientes em internação domiciliar AD1/AD2, casos de violência notificada), permitindo visualizar <em>clusters</em> (aglomerados espaciais) de risco e direcionar ações imediatas de bloqueio e cuidado.</li>
</ol>
`
    },
    {
      id: 'composicao-equipes-atribuicoes-pnab',
      title: '4. Composição das Equipes na ESF, Modalidades Especiais, eMulti e Atribuições Profissionais',
      body_html: `
<h3>A Equipe de Saúde da Família (eSF) e suas Regras de Composição e Carga Horária</h3>
<p>De acordo com a Política Nacional de Atenção Básica (Portaria de Consolidação GM/MS nº 2, Anexo XXII — PNAB 2017) e atualizações normativas até 2024, a <strong>Equipe de Saúde da Família (eSF)</strong> é a modalidade prioritária e estruturante da APS no Brasil. Sua composição mínima obrigatória exige quatro categorias profissionais:</p>
<ul>
  <li><strong>Médico:</strong> Preferencialmente especialista em Medicina de Família e Comunidade (MFC), ou generalista;</li>
  <li><strong>Enfermeiro:</strong> Preferencialmente especialista em Saúde da Família, ou generalista;</li>
  <li><strong>Técnico e/ou Auxiliar de Enfermagem;</strong></li>
  <li><strong>Agente Comunitário de Saúde (ACS):</strong> O número de ACS por equipe deve ser definido de acordo com a base populacional, critérios demográficos, epidemiológicos e socioeconômicos, cobrindo <strong>100% da população cadastrada</strong> com um máximo de 750 pessoas por ACS.</li>
</ul>
<p>Além da equipe mínima, podem compor a eSF o <strong>Agente de Combate às Endemias (ACE)</strong> — integrando na base territorial as ações de vigilância epidemiológica, ambiental e controle zoonótico/vetorial com a atenção básica — e os profissionais de <strong>Saúde Bucal</strong>: Cirurgião-Dentista e Técnico em Saúde Bucal (TSB) e/ou Auxiliar em Saúde Bucal (ASB).</p>
<p>Quanto à <strong>carga horária na eSF</strong>, a regra vigente estabelece a obrigatoriedade de <strong>40 horas semanais para todos os profissionais integrantes da equipe de Saúde da Família</strong> (médicos, enfermeiros, técnicos de enfermagem e ACS). A PNAB 2017 flexibilizou a antiga exigência de que um único profissional médico cumprisse as 40 horas na mesma eSF, passando a permitir que haja até 3 profissionais por categoria (por exemplo, dois médicos de 20 horas semanais cada), desde que a soma da carga horária na equipe perfaça no mínimo 40 horas semanais e cada profissional cumpra no mínimo 20 horas na equipe. Contudo, os profissionais da equipe de Saúde da Família só podem estar cadastrados no SCNES em no máximo 2 (duas) equipes.</p>

<h3>Modalidades Complementares e Específicas de Equipes na APS</h3>
<p>Para atender à diversidade demográfica e às populações vulnerabilizadas do território brasileiro, o Ministério da Saúde financia e credencia modalidades específicas de equipes:</p>
<ul>
  <li><strong>Equipe de Atenção Primária (eAP):</strong> Criada na PNAB 2017 e regulamentada pela Portaria nº 2.539/2019 como modalidade alternativa e complementar (não prioritária frente à eSF), composta minimamente apenas por <strong>médico e enfermeiro</strong> (sem obrigatoriedade de ACS), dividida em <strong>Modalidade I</strong> (carga horária mínima de 20h semanais por categoria, atendendo metade da população de uma eSF) e <strong>Modalidade II</strong> (carga horária mínima de 30h semanais por categoria, atendendo até 75% da população de uma eSF).</li>
  <li><strong>Equipe de Saúde Bucal (eSB):</strong> Vinculada a uma eSF ou eAP, subdivide-se historicamente em <strong>Modalidade I</strong> (1 Cirurgião-Dentista + 1 ASB ou 1 TSB, 40h semanais) e <strong>Modalidade II</strong> (1 Cirurgião-Dentista + 1 TSB + 1 ASB ou outro TSB, 40h semanais), além das modalidades com carga horária reduzida (20h ou 30h) introduzidas para compatibilização com eAP.</li>
  <li><strong>Equipe de Consultório na Rua (eCR):</strong> Equipe multiprofissional móvel voltada exclusivamente à população em situação de rua, articulando cuidados clínicos, redução de danos, saúde mental, abordagem de tuberculose/ISTs e assistência social in loco. Organiza-se em três modalidades segundo o número de profissionais (Modalidade I com 4 profissionais; Modalidade II com 6 profissionais; Modalidade III com 6 profissionais acrescidos de um médico).</li>
  <li><strong>Equipes de Saúde da Família Ribeirinha (eSFR) e Fluvial (eSFF):</strong> Desenhadas para a Amazônia Legal e o Pantanal Sul-Mato-Grossense, contando com embarcações (UBS Fluvial dotada de consultórios, laboratório, sala de vacina e camarotes para deslocamentos de até 14–20 dias por mês) e pontos de apoio terrestres com técnicos de enfermagem e ACS residentes nas comunidades isoladas.</li>
  <li><strong>Equipe de Atenção Primária Prisional (eAPP):</strong> Atua dentro das unidades prisionais no âmbito da Política Nacional de Atenção Integral à Saúde das Pessoas Privadas de Liberdade no Sistema Prisional (PNAISP).</li>
</ul>

<h3>Da Extinção do NASF-AB à Criação das Equipes Multiprofissionais (eMulti — Portaria GM/MS nº 635/2023)</h3>
<p>Criados originalmente em 2008 (Portaria GM/MS nº 154/2008) como Núcleos de Apoio à Saúde da Família (NASF) e renomeados em 2017 como Núcleos Ampliados de Saúde da Família e Atenção Básica (NASF-AB), esses arranjos multiprofissionais operavam por meio do apoio matricial (clínico-assistencial e técnico-pedagógico) às equipes vinculadas, sem constituir porta de entrada aberta nem ter incentivo financeiro protegido após o programa Previne Brasil (2019), o que levou ao desmonte de centenas de núcleos no país.</p>
<p>Em maio de 2023, a <strong>Portaria GM/MS nº 635/2023</strong> reconstruiu e modernizou o cuidado multiprofissional na APS ao instituir o incentivo financeiro federal para as <strong>Equipes Multiprofissionais na Atenção Primária à Saúde (eMulti)</strong>. As eMulti ampliaram o escopo de especialidades médicas (incluindo cardiologista, endocrinologista, dermatologista, infectologista, ginecologista-obstetra, pediatra, psiquiatra, geriatra e médico acupunturista/homeopata) ao lado de psicólogos, fisioterapeutas, nutricionistas, farmacêuticos, fonoaudiólogos, terapeutas ocupacionais, assistentes sociais, profissionais de educação física, sanitaristas e arte-educadores. As eMulti também incorporaram incentivos específicos para o teleatendimento e telematriciamento, organizando-se em três modalidades:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Modalidade de eMulti (Portaria nº 635/2023)</th>
      <th>Quantidade de Equipes Vinculadas (eSF/eAP/eCR/eSFR/eSFF)</th>
      <th>Carga Horária Semanal Mínima da Equipe eMulti</th>
      <th>Carga Horária Mínima Individual por Profissional</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>eMulti Ampliada</strong></td>
      <td>Vinculada a 10 a 12 equipes da APS</td>
      <td>Mínimo de 300 horas semanais somadas</td>
      <td>Mínimo de 20h semanais (exceto médicos especialistas focais, que podem cumprir mínimo de 10h semanais)</td>
    </tr>
    <tr>
      <td><strong>eMulti Complementar</strong></td>
      <td>Vinculada a 5 a 9 equipes da APS</td>
      <td>Mínimo de 200 horas semanais somadas</td>
      <td>Mínimo de 20h semanais (médicos especialistas focais: mínimo de 10h semanais)</td>
    </tr>
    <tr>
      <td><strong>eMulti Estratégica</strong></td>
      <td>Vinculada a 1 a 4 equipes da APS</td>
      <td>Mínimo de 100 horas semanais somadas</td>
      <td>Mínimo de 20h semanais (médicos especialistas focais: mínimo de 10h semanais)</td>
    </tr>
  </tbody>
</table>

<h3>Atribuições Específicas e Limites Legais (PNAB 2017 e Lei nº 13.595/2018)</h3>
<p>Em provas de residência médica, as bancas exploram intensamente as atribuições privativas versus compartilhadas dentro da eSF:</p>
<ul>
  <li><strong>Médico e Enfermeiro:</strong> Ambos realizam consultas clínicas, estratificação de risco, visitas domiciliares e atividades em grupo. Contudo, ao <strong>enfermeiro</strong> cabe realizar consulta de enfermagem, solicitar exames complementares, <strong>prescrever medicações conforme protocolos, diretrizes clínicas e terapêuticas ou outras normativas técnicas estabelecidas pelo gestor federal, estadual ou municipal</strong> (observadas as disposições legais da profissão — Lei nº 7.498/1986), além de planejar, gerenciar e supervisionar tecnicamente o trabalho dos técnicos/auxiliares de enfermagem e coordenar as ações clínicas dos ACS. Ao <strong>médico</strong> cabe realizar consultas clínicas e pequenos procedimentos cirúrgicos na UBS, indicar internação hospitalar ou domiciliar e responsabilizar-se pelo diagnóstico nosológico e prescrição médica ampla.</li>
  <li><strong>Agente Comunitário de Saúde (ACS):</strong> Regido pela Lei nº 11.350/2006 (alterada pela Lei nº 13.595/2018 — "Lei Ruth Brilhante"). O ACS deve obrigatoriamente <strong>residir na área da comunidade em que atuar desde a data da publicação do edital do processo seletivo público</strong> e ter concluído o ensino médio e o curso introdutório de formação inicial. Além das atividades clássicas de cadastramento, orientação comunitária e visitas domiciliares periódicas, a PNAB 2017 e a Lei nº 13.595/2018 autorizaram o ACS, em caráter excepcional, assistido por profissional de nível superior da equipe e <strong>desde que possua curso técnico em Agente Comunitário de Saúde ou capacitação específica</strong>, a realizar no domicílio: aferição da pressão arterial, medição de glicemia capilar, aferição de temperatura axilar, medição antropométrica (peso e altura) e orientação/apoio para a correta administração de medicamentos prescritos a pacientes em situação de vulnerabilidade. É <strong>vedado</strong> ao ACS realizar curativos complexos, administrar injetáveis ou retirar pontos (atividades da equipe de enfermagem).</li>
</ul>
`
    },
    {
      id: 'processo-trabalho-acesso-avancado-acolhimento',
      title: '5. Processo de Trabalho na ESF: Acolhimento, Classificação de Risco e Acesso Avançado',
      body_html: `
<h3>Acolhimento como Postura Ético-Política e Dispositivo Tecnoassistencial</h3>
<p>No âmbito da Política Nacional de Humanização (PNH — HumanizaSUS) e dos Cadernos de Atenção Básica do Ministério da Saúde (especialmente o CAB nº 28 — <em>Acolhimento à Demanda Espontânea</em>), o <strong>acolhimento</strong> não se resume a um espaço físico (uma sala ou balcão de triagem), nem a um ato burocrático de distribuição de senhas na recepção, tampouco a uma triagem excludente cujo objetivo seja filtrar quem será atendido ou dispensado. O acolhimento é uma <strong>postura ética e uma tecnologia leve de relações</strong> presente em todos os encontros assistenciais, fundamentada na escuta qualificada do sofrimento do usuário, no compromisso de dar uma resposta positiva ao seu problema e na responsabilização compartilhada.</p>
<p>Operacionalmente, o acolhimento à demanda espontânea na ESF substitui a fila da madrugada por uma avaliação de risco e vulnerabilidade realizada ao longo de todo o período de funcionamento da UBS. Ao contrário dos serviços de urgência hospitalar (que utilizam protocolos estritamente biológicos de risco de morte, como o Protocolo de Manchester), a <strong>avaliação na APS articula duas dimensões indissociáveis: o Risco Clínico-Biológico e a Vulnerabilidade Psicossocial</strong>. Assim, um paciente com uma condição clinicamente não emergencial, mas em extrema vulnerabilidade social (como um morador em situação de rua, uma vítima de violência doméstica, um paciente psicótico desorganizado ou um trabalhador rural que caminhou horas até a UBS e não conseguirá retornar no dia seguinte), deve ter seu atendimento garantido no mesmo turno.</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Classificação na Demanda Espontânea da APS (CAB nº 28)</th>
      <th>Situação Clínica e/ou Vulnerabilidade</th>
      <th>Conduta e Tempo-Alvo de Atendimento na UBS</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Situação Não Aguda (Branco / Azul)</strong></td>
      <td>Demandas administrativas, renovação programada de receitas em paciente estável, avaliação de exames de rotina assintomático, puericultura ou pré-natal habitual sem queixas agudas.</td>
      <td>Intervenção programada: orientação imediata, resolução de pendências ou agendamento para consulta longitudinal em data próxima (preferencialmente na mesma semana).</td>
    </tr>
    <tr>
      <td><strong>Atendimento no Dia (Verde)</strong></td>
      <td>Quadros agudos de risco baixo ou moderado (disúria sem sinais sépticos, odinofagia, diarreia aguda hidratada, lombalgia aguda sem sinais de alarme) ou vulnerabilidade social acentuada.</td>
      <td>Consulta médica ou de enfermagem no mesmo dia (mesmo turno ou turno seguinte do mesmo dia), evitando que o usuário peregrine até a UPA.</td>
    </tr>
    <tr>
      <td><strong>Atendimento Prioritário / Urgência (Amarelo)</strong></td>
      <td>Pacientes que necessitam de intervenção rápida na sala de observação/consultório (crise asmática moderada, febre alta em lactente, crise hipertensiva sintomática/pseudocrise, dor intensa, agitação psicomotora).</td>
      <td>Atendimento imediato ou prioritário (em minutos), passando à frente dos agendados, com estabilização inicial na própria UBS.</td>
    </tr>
    <tr>
      <td><strong>Atendimento Imediato / Emergência (Vermelho)</strong></td>
      <td>Risco iminente de morte ou perda funcional grave (PCR, IAM com supra de ST, AVC agudo na janela, choque, anafilaxia, insuficiência respiratória aguda grave).</td>
      <td>Intervenção imediata na sala de procedimentos/estabilização pela equipe (médico e enfermeiro), acionamento do SAMU 192 e transferência segura regulada.</td>
    </tr>
  </tbody>
</table>

<h3>Modelos de Gestão da Agenda na ESF e o Acesso Avançado (Acesso Aberto)</h3>
<p>Historicamente, muitas equipes de Saúde da Família reproduziram o chamado <strong>modelo de agenda tradicional ou engessada (em "carimbos" ou semanas temáticas)</strong>: reservava-se a segunda-feira apenas para hipertensos e diabéticos ("dia do Hiperdia"), a terça-feira para gestantes, a quarta-feira para puericultura e preventivo, deixando pouquíssimas vagas diárias para casos agudos. Esse modelo gera três efeitos deletérios amplamente documentados: (1) longo tempo de espera para conseguir uma consulta agendada (semanas ou meses); (2) altíssima taxa de absenteísmo (25% a 40% dos pacientes faltam porque esqueceram a consulta marcada há 45 dias ou já melhoraram); e (3) expulsão dos casos agudos do território para as UPAs e pronto-socorros, destruindo o atributo do acesso de primeiro contato.</p>
<p>Para superar essa disfunção, Mark Murray e Catherine Tantau desenvolveram na década de 1990 o modelo de <strong>Acesso Avançado (<em>Advanced Access</em> ou Acesso Aberto)</strong>, cuja máxima central é: <strong>"Faça hoje o trabalho de hoje!"</strong>. No Acesso Avançado, a agenda não é bloqueada com semanas de antecedência nem dividida rigidamente entre "vagas de urgência" e "vagas de rotina". Cerca de <strong>65% a 80% das vagas diárias de médicos e enfermeiros permanecem livres no início de cada dia (ou com abertura de 24 a 48 horas)</strong> para absorver qualquer demanda do usuário de sua microárea no próprio dia em que ele procura a unidade — seja uma queixa aguda, seja uma demanda crônica ou preventiva. Os 20% a 35% restantes da agenda são reservados para agendamentos protegidos de pacientes que não podem depender da iniciativa própria ou exigem programação estrita (como recém-nascidos na primeira semana de vida, gestantes de alto risco, pacientes psiquiátricos graves, retornos pós-alta hospitalar e visitas domiciliares a acamados).</p>
<p>Outro arranjo intermediário utilizado em diversas redes municipais é o <strong>modelo Carve-Out (Agenda Mista ou Reserva de Vagas)</strong>, no qual aproximadamente 50% da agenda é pré-agendada e 50% fica reservada para o atendimento da demanda espontânea do dia. Embora superior à agenda engessada tradicional, o modelo <em>Carve-Out</em> ainda mantém fila de espera para consultas programadas, razão pela qual o Acesso Avançado é considerado o padrão-ouro contemporâneo na gestão da clínica em Medicina de Família e Comunidade, desde que o tamanho da população adscrita esteja equilibrado (idealmente 2.000 a 3.000 pessoas por equipe) e a equipe realize primeiro um mutirão de eliminação do passivo reprimido (<em>backlog reduction</em>).</p>
`
    },
    {
      id: 'visita-domiciliar-atencao-domiciliar-escala-coelho-savassi',
      title: '6. Visita Domiciliar, Atenção Domiciliar (AD1, AD2, AD3) e Escala de Coelho-Savassi',
      body_html: `
<h3>A Visita Domiciliar (VD) e o Atendimento Domiciliar na ESF</h3>
<p>A <strong>Visita Domiciliar (VD)</strong> e o cuidado no domicílio constituem tecnologias singulares da Estratégia Saúde da Família que rompem os muros da instituição de saúde e invertem a relação de poder entre profissional e usuário: no consultório, o paciente está no território do médico; no domicílio, o profissional é um convidado que adentra o espaço íntimo de vida da família. No ambiente domiciliar, tornam-se imediatamente visíveis determinantes ocultos na consulta ambulatorial: como os medicamentos estão realmente armazenados (muitas vezes misturados em sacolas plásticas ou fora da geladeira), a disponibilidade de alimentos na cozinha, o risco ambiental de quedas para idosos (tapetes soltos, degraus sem corrimão, iluminação precária), as barreiras arquitetônicas para cadeirantes e a real sobrecarga física e emocional do cuidador familiar.</p>
<p>Para que a visita domiciliar da equipe técnica (médico, enfermeiro, dentista, eMulti) não seja pulverizada de forma aleatória ou assistencialista, ela exige planejamento estruturado em quatro momentos: (1) <strong>Seleção e estratificação de prioridades</strong> (definindo quem precisa de visita domiciliar por impossibilidade de locomoção, busca ativa de faltosos prioritários, puérpera e recém-nascido na 1ª semana de vida — "Primeira Semana Saúde Integral" —, egressos de internação ou casos complexos para avaliação sociofamiliar); (2) <strong>Planejamento prévio em reunião de equipe</strong> (revisão do prontuário, pactuação do objetivo da visita e definição de quais profissionais irão ao domicílio); (3) <strong>Execução da visita com abordagem centrada na pessoa e na família</strong> (incluindo avaliação específica do cuidador quanto à síndrome de <em>burnout</em> do cuidador, mensurável pela Escala de Zarit); e (4) <strong>Registro estruturado no PEC (e-SUS APS) e monitoramento do plano terapêutico</strong>.</p>

<h3>Estratificação de Risco Familiar: A Escala de Coelho-Savassi</h3>
<p>Desenvolvida pelos médicos de família Flávio Lúcio Coelho e Leonardo Cançado Monteiro Savassi a partir dos dados da antiga Ficha A do SIAB (e plenamente aplicável aos cadastros domiciliares e individuais do e-SUS APS), a <strong>Escala de Risco Familiar de Coelho-Savassi</strong> é o instrumento validado mais cobrado em provas brasileiras para priorizar quais famílias do território necessitam de visitas domiciliares mais frequentes e de acompanhamento multiprofissional intensivo. A escala atribui uma pontuação específica (pesos de 1, 2 ou 3 pontos) a diversas <strong>sentinelas de risco epidemiológico, clínico e socioambiental</strong> presentes no domicílio:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Peso (Pontuação)</th>
      <th>Sentinelas de Risco Epidemiológico, Clínico e Socioambiental (Coelho-Savassi)</th>
      <th>Racional Clínico-Sanitário</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>3 Pontos cada</strong></td>
      <td>Acamado; Deficiência física; Deficiência mental; Baixas condições de saneamento (esgoto a céu aberto / ausência de banheiro); Desnutrição grave.</td>
      <td>Condições que impõem dependência funcional severa para o cuidado, restrição absoluta de mobilidade até a UBS ou altíssimo risco infectoparasitário e de mortalidade infantil.</td>
    </tr>
    <tr>
      <td><strong>2 Pontos cada</strong></td>
      <td>Drogadição (uso abusivo de álcool/outras drogas); Desemprego no núcleo familiar; Analfabetismo do chefe da família; Menor de 6 meses de idade; Maior de 70 anos de idade.</td>
      <td>Extremos etários de fragilidade biológica (lactentes jovens e idosos longevos) e determinantes sociais que comprometem severamente a renda, a compreensão de receitas e a estabilidade familiar.</td>
    </tr>
    <tr>
      <td><strong>1 Ponto cada</strong></td>
      <td>Hipertensão Arterial Sistêmica (HAS); Diabetes Mellitus (DM); Relação morador/cômodo:<br>• &gt; 1 morador por cômodo = <strong>3 pontos</strong><br>• Igual a 1 morador por cômodo = <strong>2 pontos</strong><br>• &lt; 1 morador por cômodo = <strong>0 ponto</strong></td>
      <td>Doenças crônicas não transmissíveis de alta prevalência que exigem longitudinalidade; a aglomeração intradomiciliar (morador/cômodo) eleva exponencialmente a transmissão de agravos respiratórios (como tuberculose) e o estresse familiar.</td>
    </tr>
  </tbody>
</table>

<p>A soma algébrica simples de todas as sentinelas presentes em todos os membros daquela família define o <strong>Escore Total de Risco Familiar de Coelho-Savassi</strong>, classificando o domicílio em quatro faixas operacionais:</p>
<ul>
  <li><strong>Escore de 0 a 4 pontos: Sem Risco Adicional (R0)</strong> — Acompanhamento habitual na UBS e visita mensal padrão do ACS.</li>
  <li><strong>Escore de 5 a 6 pontos: Risco Menor / Baixo (R1)</strong> — Vigilância ativa pelo ACS e programação regular de consultas na UBS.</li>
  <li><strong>Escore de 7 a 8 pontos: Risco Médio / Moderado (R2)</strong> — Prioridade intermediária para visitas domiciliares da equipe técnica (enfermeiro/médico) e discussão periódica do caso.</li>
  <li><strong>Escore &ge; 9 pontos: Risco Máximo / Alto (R3)</strong> — Prioridade máxima para visitas domiciliares frequentes e conjuntas (médico, enfermeiro, ACS e eMulti), com elaboração obrigatória de Projeto Terapêutico Singular (PTS).</li>
</ul>

<h3>Modalidades de Atenção Domiciliar no SUS (Melhor em Casa: AD1, AD2 e AD3)</h3>
<p>Quando o paciente apresenta restrição temporária ou definitiva ao leito ou ao domicílio, o cuidado é organizado pela Política Nacional de Atenção Domiciliar (Programa Melhor em Casa, regulamentado na Portaria de Consolidação GM/MS nº 5 e atualizado pela Portaria GM/MS nº 825/2016 e normativas subsequentes) em três modalidades hierarquizadas segundo a complexidade clínica, a densidade tecnológica e a frequência necessária de visitas:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Modalidade</th>
      <th>Equipe Responsável</th>
      <th>Perfil Clínico do Paciente e Critérios de Elegibilidade</th>
      <th>Frequência de Visitas Técnicas</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>AD1</strong></td>
      <td>Equipes da Atenção Primária (eSF / eAP / eMulti)</td>
      <td>Pacientes com problemas de saúde controlados/compensados, mas com dificuldade ou impossibilidade física de locomoção até a UBS, que necessitam de cuidados de menor complexidade e menor frequência (ex.: idoso restrito ao domicílio com sequela crônica estável de AVC, hipertenso e diabético compensado, troca periódica de sonda vesical de demora ou gastrostomia estabilizada).</td>
      <td>Mínimo de 1 vez por mês por profissional de nível superior (além do acompanhamento do ACS e técnico de enfermagem).</td>
    </tr>
    <tr>
      <td><strong>AD2</strong></td>
      <td>Serviço de Atenção Domiciliar (SAD): EMAD (Equipe Multiprofissional de Atenção Domiciliar) + EMAP</td>
      <td>Pacientes com afecções agudas ou crônicas agudizadas que demandam cuidados intensivos e sequenciais para evitar hospitalização ou abreviar internação: antibioticoterapia parenteral domiciliar, curativos complexos de lesões por pressão graus III/IV, adaptação a órteses/próteses, reabilitação motora intensiva pós-AVC recente ou cuidados paliativos oncológicos com necessidade de titulação frequente de opioides.</td>
      <td>Compromisso de visita técnica no mínimo <strong>1 vez por semana</strong> pela EMAD. Após estabilização, recebe alta da AD2 e retorna para AD1 (eSF).</td>
    </tr>
    <tr>
      <td><strong>AD3</strong></td>
      <td>Serviço de Atenção Domiciliar (SAD): EMAD + EMAP</td>
      <td>Pacientes com qualquer condição listada em AD2, somada à necessidade de uso contínuo (permanente ou prolongado) de <strong>equipamentos de suporte à vida ou procedimentos de maior complexidade</strong>, tais como ventilação mecânica invasiva ou não invasiva (VNI/BIPAP contínuo), paracentese domiciliar de repetição, nutrição parenteral ou transfusões.</td>
      <td>Visita técnica no mínimo 1 vez por semana (frequentemente múltiplas vezes na semana), com suporte telefônico de retaguarda.</td>
    </tr>
  </tbody>
</table>
`
    }
  ]
};

bookEsf.sections.push(
  {
    id: 'metodo-clinico-centrado-pessoa-consulta-mfc',
    title: '7. Método Clínico Centrado na Pessoa (MCCP), Demanda Oculta e Prevenção Quaternária',
    body_html: `
<h3>A Crise do Modelo Biomédico Reducionista e a Gênese do MCCP</h3>
<p>Na prática cotidiana da Medicina de Família e Comunidade dentro da Estratégia Saúde da Família, cerca de 50% dos sintomas apresentados nos encontros iniciais permanecem sem um diagnóstico anatomopatológico fechado imediato, ou entrelaçam-se intimamente ao sofrimento psicossocial, às transições do ciclo de vida familiar e a determinantes laborais. Para lidar com essa complexidade sem incorrer na cascata iatrogênica de exames desnecessários, Moira Stewart, Ian McWhinney, Judith Belle Brown e colaboradores (Universidade de Western Ontario, Canadá) estruturaram o <strong>Método Clínico Centrado na Pessoa (MCCP)</strong>. Em sua 3ª edição (2014), o MCCP foi consolidado em <strong>quatro componentes interativos</strong> (após a incorporação transversal dos antigos componentes de prevenção/promoção e de uso realista do tempo/recursos na própria estrutura dos demais componentes):</p>

<h4>1º Componente: Explorando a Saúde, a Doença e a Experiência da Doença</h4>
<p>O pilar inaugural do MCCP baseia-se na distinção semântica e antropológica fundamental entre dois conceitos que a língua inglesa separa em vocábulos distintos: <strong><em>Disease</em> (Doença)</strong> versus <strong><em>Illness</em> (Experiência da Doença / Adoecimento)</strong>. Enquanto <em>disease</em> corresponde à alteração fisiopatológica, bioquímica ou anatômica objetivável pelo médico através da anamnese biomédica, do exame físico e dos exames complementares (por exemplo, uma hemoglobina glicada de 9,8% ou uma úlcera péptica duodenal), a <em>illness</em> representa a vivência subjetiva, emocional e biográfica única daquela pessoa frente ao seu adoecer. Para explorar sistematicamente a <em>illness</em>, o médico de família utiliza o acrônimo clássico <strong>SIFE</strong> (em inglês, <strong>FIFE</strong>):</p>
<ul>
  <li><strong>Sentimentos (<em>Feelings</em>):</strong> Quais emoções e temores o sintoma desperta? O paciente tem medo de que sua cefaleia tensional seja um tumor cerebral (como ocorreu com um parente próximo) ou que a dor torácica atípica seja um infarto fulminante?</li>
  <li><strong>Ideias (<em>Ideas</em>):</strong> Qual é o modelo explicativo do próprio paciente sobre o que está acontecendo em seu corpo? O que ele acredita que causou o quadro (estresse no trabalho, efeito colateral de um remédio, castigo espiritual, alimentação)?</li>
  <li><strong>Funcionalidade (<em>Function</em>):</strong> Qual é o impacto concreto dos sintomas na rotina diária, no sono, na sexualidade, na capacidade laboral e no cuidado dos filhos?</li>
  <li><strong>Expectativas (<em>Expectations</em>):</strong> O que o paciente espera especificamente daquela consulta médica? Muitas vezes o médico imagina que o paciente deseja uma prescrição antibiótica ou uma tomografia, quando na verdade ele busca apenas tranquilização (<em>reassurance</em>) após um exame físico atento, uma explicação clara ou um atestado laboral.</li>
</ul>
<p>Além de <em>disease</em> e <em>illness</em>, o 1º componente inclui a avaliação ativa do conceito positivo de <strong>Saúde (<em>Health</em>)</strong> — isto é, as percepções da pessoa sobre o que significa ter uma vida saudável, suas aspirações vitais, seu grau de resiliência e salutogênese.</p>

<h4>2º Componente: Entendendo a Pessoa como um Todo (Contexto Próximo e Distante)</h4>
<p>O segundo componente situa o indivíduo em suas múltiplas camadas sistêmicas. O médico integra a avaliação clínica ao conhecimento da <strong>pessoa</strong> (personalidade, história biográfica, estágio do desenvolvimento individual e espiritualidade), do <strong>contexto próximo</strong> (família nuclear e extensa, rede de apoio imediata, condições financeiras e do domicílio, ambiente de trabalho e segurança no emprego) e do <strong>contexto distante ou amplo</strong> (comunidade, determinantes culturais, ecossistema, barreiras de transporte, violência urbana e políticas públicas locais).</p>

<h4>3º Componente: Elaborando um Plano Conjunto de Manejo dos Problemas</h4>
<p>Aqui reside a essência da <strong>decisão compartilhada (<em>shared decision-making</em>)</strong>, que supera tanto o paternalismo médico autoritário ("você tem que tomar este remédio e parar de comer sal agora") quanto o consumismo médico passivo ("faço qualquer exame que o paciente pedir"). O médico e o usuário buscam terreno comum em três esferas: (1) <strong>Definição conjunta e priorização dos problemas</strong> (quando o modelo explicativo do paciente diverge do diagnóstico médico, negocia-se uma compreensão partilhada sem desqualificar o saber do usuário); (2) <strong>Estabelecimento das metas do tratamento</strong> (metas realistas e escalonadas, como reduzir o tabagismo ou caminhar 20 minutos três vezes por semana); e (3) <strong>Definição clara dos papéis de cada um</strong> (o que cabe ao paciente, o que cabe ao médico, o que cabe ao enfermeiro, ao ACS ou à eMulti).</p>

<h4>4º Componente: Intensificando a Relação entre a Pessoa e o Médico</h4>
<p>Reconhece que cada encontro clínico constrói e aprofunda a aliança terapêutica longitudinal por meio de compaixão, empatia, constância, compartilhamento de poder, autoconhecimento do médico sobre seus próprios vieses (transferência e contratransferência) e o efeito terapêutico da própria figura do profissional (aquilo que Michael Balint denominou a <strong>"droga Médico"</strong>).</p>

<h3>Habilidades de Comunicação Clínica, Demanda Oculta e Prevenção Quaternária</h3>
<p>Estudos clássicos de comunicação clínica (como os de Beckman e Frankel) demonstraram que médicos costumam interromper a fala inicial do paciente em média aos 18 a 23 segundos. Na ESF, o treino em habilidades de comunicação orienta o uso do <strong>"minuto de ouro"</strong>: iniciar a consulta com perguntas abertas ("Em que posso ajudá-lo hoje?", "Conte-me mais sobre isso"), sustentar a escuta ativa com facilitadores verbais e não verbais (contato visual, postura inclinada, silêncio atento) sem interromper nos primeiros 60 a 90 segundos, utilizar técnicas de <strong>espelhamento, paráfrase, legitimação de sentimentos e sumarização</strong>. É igualmente essencial estar atento à <strong>demanda oculta</strong> — muitas vezes revelada apenas ao final da consulta, com a mão na maçaneta da porta (<em>"sindrome da maçaneta"</em> ou <em>"by the way syndrome"</em>: "Ah, doutor, já que estou aqui, queria falar de uma manchinha / de uma tristeza / de uma falha na ereção").</p>
<p>Intrinsecamente ligada ao MCCP está a <strong>Prevenção Quaternária (P4)</strong>, conceito cunhado pelo médico de família belga <strong>Marc Jamoulle</strong> (1986) e oficializado pela WONCA: trata-se da <em>"ação realizada para identificar o paciente em risco de sobremedicalização (overmedicalization), protegê-lo de novas intervenções médicas invasivas ou desnecessárias e sugerir-lhe procedimentos científica e eticamente aceitáveis"</em>. Na matriz 2×2 de Jamoulle (que cruza a percepção do paciente — sente-se bem vs. sente-se doente — com a avaliação médica — doença ausente vs. doença presente), a Prevenção Quaternária situa-se no quadrante em que <strong>o paciente se sente doente (ou teme adoecer), mas o médico constata ausência de doença biológica que justifique intervenção agressiva</strong>. Exemplos clássicos na ESF incluem: evitar o rastreamento mamográfico oportunístico em mulheres abaixo de 40 anos de risco padrão; não solicitar PSA indiscriminado como <em>check-up</em> populacional assintomático sem decisão compartilhada; evitar solicitar ressonância magnética de coluna em lombalgia mecânica aguda inespecífica sem sinais de alarme (<em>red flags</em>); praticar a <strong>demora permitida (<em>watchful waiting</em>)</strong> em quadros virais autolimitados com rede de segurança (<em>safety netting</em>); e realizar a <strong>desprescrição</strong> ativa na polifarmácia do idoso.</p>
`
  },
  {
    id: 'abordagem-familiar-genograma-ecomapa-ciclo-vida',
    title: '8. Ferramentas de Abordagem Familiar: Genograma, Ecomapa, Ciclo de Vida, FIRO, PRACTICE e APGAR',
    body_html: `
<h3>Teoria Geral dos Sistemas e o Ciclo de Vida Familiar (Carter &amp; McGoldrick)</h3>
<p>Na Estratégia Saúde da Família, a família é compreendida à luz da <strong>Teoria Geral dos Sistemas</strong> (Ludwig von Bertalanffy) como um sistema aberto, complexo e autorregulado, no qual o todo é maior do que a soma das partes (não-soma) e qualquer alteração clínica ou emocional em um de seus membros repercute inevitavelmente sobre todos os demais (<strong>circularidade</strong> e busca de <strong>homeostase vs. morfogênese</strong>). Ao longo do tempo, a família atravessa transições previsíveis (<strong>crises normativas ou evolutivas</strong>) e eventos inesperados e disruptivos (<strong>crises paranormativas ou acidentais</strong>, como morte precoce de um filho, desemprego súbito, diagnóstico de câncer ou acidente incapacitante). A classificação mais utilizada de <strong>Ciclo de Vida Familiar</strong> (Betty Carter e Monica McGoldrick, adaptada à realidade brasileira) contempla seis estágios evolutivos, cada qual com tarefas emocionais específicas e vulnerabilidades clínicas próprias:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Estágio do Ciclo de Vida Familiar</th>
      <th>Mudança de Segunda Ordem Necessária (Tarefa Nuclear)</th>
      <th>Principais Riscos Clínicos e Conflitos Frequentes na ESF</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>1. Saindo de Casa: Jovens Solteiros</strong></td>
      <td>Diferenciação do self em relação à família de origem; desenvolvimento de relações íntimas com pares; início da autonomia financeira e laboral.</td>
      <td>Infecções Sexualmente Transmissíveis (ISTs), gestação não planejada, abuso de álcool e psicoativos, acidentes de trânsito, transtornos ansiosos.</td>
    </tr>
    <tr>
      <td><strong>2. O Novo Casal (União de Famílias pelo Casamento/União Estável)</strong></td>
      <td>Comprometimento com um novo sistema conjugal; realinhamento das relações com as famílias extensas e amigos para incluir o cônjuge.</td>
      <td>Conflitos de lealdade com sogros/família de origem, disfunções sexuais, planejamento reprodutivo, queixas psicossomáticas iniciais.</td>
    </tr>
    <tr>
      <td><strong>3. Famílias com Filhos Pequenos</strong></td>
      <td>Aceitação de novos membros no sistema; ajuste do espaço conjugal para criar espaço para os filhos; divisão das tarefas de criação, domésticas e financeiras; realinhamento com os avós.</td>
      <td>Depressão pós-parto, privação de sono e exaustão materna, dificuldades no aleitamento, hiperutilização da UBS por infecções respiratórias agudas da infância, conflitos conjugais.</td>
    </tr>
    <tr>
      <td><strong>4. Famílias com Adolescentes</strong></td>
      <td>Aumento da flexibilidade das fronteiras familiares para permitir a independência progressiva dos filhos e a fragilização dos avós; foco renovado nas questões conjugais e profissionais da meia-idade ("geração sanduíche").</td>
      <td>Conflitos intergeracionais de autoridade, experimentação de drogas, transtornos alimentares, sofrimento mental na adolescência, surgimento de HAS e DM2 nos pais.</td>
    </tr>
    <tr>
      <td><strong>5. Lançando os Filhos e Seguindo em Frente</strong></td>
      <td>Aceitação de múltiplas saídas e entradas no sistema familiar; renegociação do sistema conjugal como díade; desenvolvimento de relações de adulto para adulto com os filhos crescidos; manejo da incapacidade/morte dos pais idosos.</td>
      <td><strong>Síndrome do Ninho Vazio</strong> (depressão e somatização após a saída dos filhos), sobrecarga de cuidador de pais idosos dementados, descompensação de doenças crônicas.</td>
    </tr>
    <tr>
      <td><strong>6. Famílias no Estágio Tardio da Vida</strong></td>
      <td>Aceitação da mudança dos papéis geracionais; manutenção do funcionamento e interesses próprios face ao declínio fisiológico; elaboração da perda do cônjuge e preparação para a finitude.</td>
      <td>Luto patológico por viuvez, isolamento social, polifarmácia, síndrome da fragilidade, quedas, demências, institucionalização ou violência/negligência contra o idoso.</td>
    </tr>
  </tbody>
</table>

<h3>O Genograma (Árvore Familiar Estrutural, Demográfica e Relacional)</h3>
<p>O <strong>Genograma</strong> (padronizado internacionalmente por McGoldrick e Gerson) é a representação gráfica multigeracional (devendo conter <strong>no mínimo 3 gerações</strong>) da estrutura anatômica, dos eventos demográficos, do histórico de morbimortalidade e dos padrões de relacionamento intrafamiliar. Nas provas de residência médica, a simbologia do genograma é cobrada com rigor cirúrgico:</p>
<ul>
  <li><strong>Gênero e Identificação:</strong> Homens são representados por um <strong>quadrado</strong> (posicionado à esquerda nos casais heterossexuais) e mulheres por um <strong>círculo</strong> (posicionado à direita). A <strong>pessoa-índice (paciente identificado)</strong> é destacada por uma <strong>linha dupla</strong> ao redor do quadrado ou círculo (ou uma seta apontando para o símbolo). A idade atual é anotada dentro da figura e o ano de nascimento (e de óbito) acima ou ao lado.</li>
  <li><strong>Óbito e Gestação:</strong> O falecimento é representado por um <strong>"X" traçado dentro do quadrado ou círculo</strong> (ou uma cruz), registrando-se a idade no óbito e a causa mortis. A <strong>gestação atual</strong> é representada por um <strong>triângulo</strong> pendendo da linha dos pais; o aborto espontâneo por um pequeno círculo cheio (preto) e o aborto provocado por um "X" pequeno sem figura ao redor; natimorto por um quadrado/círculo pequeno com um "X" interno.</li>
  <li><strong>Filhos e Ordem de Nascimento:</strong> Os filhos são dispostos horizontalmente abaixo da linha do casal em <strong>ordem cronológica decrescente da esquerda para a direita</strong> (o primogênito fica sempre mais à esquerda e o caçula mais à direita). Gêmeos dizigóticos possuem linhas que convergem no mesmo ponto da linha parental; gêmeos monozigóticos possuem, além das linhas convergentes, uma barra horizontal ligando os dois irmãos. Filhos adotivos têm linha tracejada ligando-os aos pais (ou colchetes).</li>
  <li><strong>Relações Conjugais (Linhas Estruturais):</strong> Casamento legal é indicado por uma linha contínua em "U" ligando marido e mulher; união estável (coabitação/amasiamento) por uma linha tracejada; separação conjugal por <strong>uma barra oblíqua (/)</strong> cortando a linha de união; e divórcio legal por <strong>duas barras oblíquas (//)</strong> cortando a linha de união.</li>
  <li><strong>Coabitação Domiciliar:</strong> Uma <strong>linha pontilhada ou tracejada contínua fechada (como um "laço" ou nuvem)</strong> circunda todos os indivíduos que <strong>residem atualmente sob o mesmo teto (mesmo domicílio)</strong>, permitindo diferenciar imediatamente a família nuclear extensa que divide a mesma casa dos parentes que moram em outros domicílios.</li>
  <li><strong>Padrões de Relacionamento Funcional (Linhas Relacionais):</strong> Relação próxima/harmônica = duas linhas paralelas contínuas; relação fundida/aglutinada (emaranhada) = três linhas paralelas contínuas; relação conflituosa/hostil = linha em zigue-zague ("raios"); relação fundida e conflituosa = três linhas paralelas sobrepostas por um zigue-zague; relação distante/pobre = linha pontilhada/tracejada; rompimento total (corte emocional) = linha interrompida no meio por duas pequenas barras verticais.</li>
</ul>

<h3>O Ecomapa e os Instrumentos FIRO, PRACTICE e APGAR Familiar</h3>
<p>Enquanto o genograma olha para "dentro" da família através das gerações, o <strong>Ecomapa</strong> (desenvolvido por Ann Hartman em 1978) é um diagrama ecológico sincrônico que representa as <strong>relações e conexões da família nuclear com o meio externo (comunidade, instituições e rede de apoio social)</strong> no momento presente. No centro do ecomapa desenha-se um grande círculo contendo o genograma dos moradores do domicílio; ao redor dele distribuem-se círculos menores representando os sistemas externos (UBS/ESF, Escola, Igreja, Trabalho, Vizinhança, Família Extensa, CRAS, Grupo de Alcoólicos Anônimos, Lazer). As linhas que conectam a família (ou membros específicos dela) a cada círculo externo indicam a natureza do vínculo (forte = linha grossa ou dupla; tênue/fraco = linha pontilhada; estressante/conflituoso = linha cortada por barras ou zigue-zague) e setas ao longo das linhas indicam a <strong>direção do fluxo de energia e recursos</strong> (se a rede apoia a família, se a família drena energia para o sistema externo ou se há reciprocidade).</p>
<p>Para complementar a avaliação funcional da família, o médico de família dispõe de três ferramentas clássicas:</p>
<ul>
  <li><strong>APGAR Familiar (Smilkstein, 1978):</strong> Questionário rápido de 5 perguntas (0 a 2 pontos cada, escore total de 0 a 10) que avalia a percepção subjetiva de satisfação de um membro com o funcionamento de sua família nas dimensões: <strong>A</strong>daptação (<em>Adaptation</em> — uso de recursos intra e extrafamiliares nas crises), <strong>P</strong>articipação (<em>Partnership</em> — compartilhamento de decisões e responsabilidades), <strong>G</strong>anho/Crescimento (<em>Growth</em> — apoio ao amadurecimento e mudanças individuais), <strong>A</strong>feição (<em>Affection</em> — demonstração de carinho e amor) e <strong>R</strong>esolução (<em>Resolve</em> — compromisso de dedicar tempo e recursos uns aos outros). Escore de <strong>7 a 10 pontos = família altamente funcional</strong>; <strong>4 a 6 pontos = disfunção familiar moderada</strong>; <strong>0 a 3 pontos = disfunção familiar acentuada/grave</strong>.</li>
  <li><strong>Modelo FIRO (<em>Fundamental Interpersonal Relations Orientation</em> — Schutz / Doherty &amp; Colangelo):</strong> Analisa as interações familiares em três dimensões sequenciais prioritárias durante transições ou crises: (1) <strong>Inclusão</strong> (quem está dentro ou fora do sistema familiar, definição de fronteiras, papéis e pertencimento); (2) <strong>Controle</strong> (como o poder e as decisões são distribuídos: interações simétricas, complementares ou coalizões de poder); e (3) <strong>Intimidade</strong> (troca de afeto, abertura emocional e vulnerabilidade mútua). Na teoria do FIRO, quando uma família sofre uma mudança estrutural (ex.: nascimento de um filho ou AVC incapacitante do patriarca), ela precisa reorganizar primeiro a <em>Inclusão</em>, depois o <em>Controle</em> e só então consegue restabelecer a <em>Intimidade</em>.</li>
  <li><strong>Modelo PRACTICE (Walters):</strong> Roteiro estruturado para conduzir uma <strong>Conferência Familiar</strong> diante de problemas complexos: <strong>P</strong>roblema apresentado (<em>Presenting problem</em>), <strong>R</strong>uéis e estrutura (<em>Roles and structure</em>), <strong>A</strong>feto (<em>Affect</em>), <strong>C</strong>omunicação (<em>Communication</em>), <strong>T</strong>empo no ciclo de vida (<em>Time in life cycle</em>), <strong>I</strong>nfermidades na família no passado e presente (<em>Illness in family</em>), <strong>C</strong>oping / Enfrentamento do estresse (<em>Coping with stress</em>) e <strong>E</strong>cologia / Rede de apoio ambiental (<em>Ecology</em>).</li>
</ul>
`
  },
  {
    id: 'abordagem-comunitaria-educacao-popular-intersetorialidade',
    title: '9. Abordagem Comunitária, Educação Popular em Saúde, Grupos Operativos e Intersetorialidade',
    body_html: `
<h3>Educação em Saúde Bancária versus Educação Popular em Saúde (Paulo Freire)</h3>
<p>Um dos erros mais frequentes na rotina das equipes de Atenção Básica consiste em confundir "abordagem comunitária e educação em saúde" com a realização de palestras expositivas verticais ("grupos de Hiperdia" em que o médico ou enfermeiro fala durante 40 minutos sobre proibições alimentares como condição obrigatória para que os pacientes recebam a renovação da receita ou os comprimidos da farmácia). Esse modelo, denominado por Paulo Freire de <strong>educação bancária</strong>, trata o usuário como um recipiente vazio e ignorante no qual o profissional "deposita" normas higiênicas, gerando culpa na vítima (<em>blaming the victim</em>), baixa adesão e alienação.</p>
<p>Em contrapartida, a <strong>Política Nacional de Educação Popular em Saúde no SUS (PNEPS-SUS, Portaria GM/MS nº 2.761/2013)</strong> fundamenta a atuação comunitária da ESF nos princípios freireanos do <strong>diálogo horizontal, da problematização, da amorosidade, da construção compartilhada do conhecimento e da emancipação (empoderamento/autonomia)</strong>. Na Educação Popular, parte-se sempre da leitura da realidade concreta e dos saberes prévios da comunidade para construir coletivamente estratégias de superação das situações-limite que geram adoecimento.</p>

<h3>Metodologias de Trabalho com Grupos na ESF e Terapia Comunitária Integrativa</h3>
<p>Para que as atividades coletivas na ESF tenham potência clínica e pedagógica, utilizam-se referenciais técnicos específicos:</p>
<ul>
  <li><strong>Grupos Operativos (Enrique Pichon-Rivière):</strong> Diferentemente de uma palestra, o Grupo Operativo é um conjunto restrito de pessoas ligadas por constantes de tempo e espaço e articuladas por sua mútua representação interna, que se propõe, de forma explícita ou implícita, à realização de uma <strong>tarefa</strong> que constitui sua finalidade (por exemplo, aprender a conviver com o diabetes, cessar o tabagismo, preparar-se para a maternidade/paternidade). No grupo operativo, o profissional de saúde atua como <strong>coordenador (facilitador)</strong> que faz circular a palavra horizontalmente em roda, ajudando o grupo a superar a resistência à mudança (medo da perda do já conhecido e medo do ataque frente ao novo) e a transformar os integrantes em agentes ativos de aprendizagem.</li>
  <li><strong>Terapia Comunitária Integrativa (TCI — Adalberto Barreto):</strong> Nascida na comunidade do Pirambu (Fortaleza/CE) e incorporada às Práticas Integrativas e Complementares no SUS, a TCI é uma roda aberta de partilha de sofrimentos e sabedorias de vida (e não psicoterapia clínica de patologias psiquiátricas graves). Seu lema central é: <em>"Quando a boca cala, os órgãos falam; quando a boca fala, os órgãos saram"</em>. Segue um ritual em seis etapas (Acolhimento, Escolha do tema por votação, Contextualização, Problematização através do "mote" que convoca a experiência do grupo sem dar conselhos diretivos nem julgar, Conotação positiva/Encerramento e Avaliação), fortalecendo os vínculos solidários e a resiliência comunitária.</li>
  <li><strong>Programa Saúde na Escola (PSE — Decreto nº 6.286/2007):</strong> Articulação intersetorial permanente entre as equipes de Saúde da Família e as escolas públicas de educação básica de seu território, desenvolvendo 13 ações prioritárias que incluem avaliação antropométrica, atualização vacinal, acuidade visual/auditiva, saúde bucal, promoção da cultura de paz, prevenção de violências e educação para a saúde sexual e reprodutiva.</li>
</ul>
`
  },
  {
    id: 'esus-aps-pec-cofinanciamento-indicadores',
    title: '10. e-SUS APS, Registro Clínico SOAP/CIAP-2 e Novo Cofinanciamento Federal (Portaria GM/MS nº 3.493/2024)',
    body_html: `
<h3>A Estratégia e-SUS APS, o SISAB e o Registro Clínico Orientado por Problemas (RCOP / SOAP)</h3>
<p>A partir de 2013, o Ministério da Saúde substituiu o antigo Sistema de Informação da Atenção Básica (SIAB — que operava com dados agregados em papel nas fichas A, B, C e D) pela <strong>Estratégia e-SUS Atenção Primária (e-SUS APS)</strong>, que alimenta a base nacional do <strong>Sistema de Informação em Saúde para a Atenção Básica (SISAB)</strong> com dados individualizados identificados pelo Cartão Nacional de Saúde (CNS) ou pelo CPF do cidadão. A coleta de dados na ponta ocorre principalmente pelo <strong>Prontuário Eletrônico do Cidadão (PEC e-SUS APS)</strong> (ou pela Coleta de Dados Simplificada — CDS em locais sem conectividade plena, além dos aplicativos móveis <em>e-SUS Território</em> para os ACS e <em>e-SUS Atividade Coletiva</em>).</p>
<p>O PEC e-SUS APS estrutura-se integralmente sobre o <strong>Registro Clínico Orientado por Problemas (RCOP)</strong> idealizado por Lawrence Weed (1968), organizando a evolução de cada encontro clínico através do método <strong>SOAP</strong> e utilizando como vocabulário padrão a <strong>Classificação Internacional de Atenção Primária — 2ª Edição (CIAP-2)</strong> (ao lado da CID-10):</p>
<ul>
  <li><strong>S — Subjetivo (<em>Subjective</em>):</strong> Registra os motivos da consulta (queixas, sintomas, demandas) exatamente sob a ótica da pessoa, a história do problema atual e os quatro elementos da experiência do adoecimento (<strong>SIFE</strong>: Sentimentos, Ideias, Funcionalidade e Expectativas). Aqui os motivos de consulta são codificados pela CIAP-2 (por exemplo, K86 para hipertensão não complicada ou N01 para cefaleia).</li>
  <li><strong>O — Objetivo (<em>Objective</em>):</strong> Registra exclusivamente os dados positivos e negativos relevantes do exame físico geral e segmentar, sinais vitais, dados antropométricos (peso, estatura, IMC, perímetro cefálico, circunferência abdominal) e resultados de exames complementares trazidos ou realizados no ponto de cuidado.</li>
  <li><strong>A — Avaliação (<em>Assessment</em>):</strong> Síntese diagnóstica ou lista de problemas ativos resolvida ou atualizada naquele atendimento. A grande vantagem da <strong>CIAP-2</strong> na Avaliação do SOAP é que ela permite classificar um problema no nível real de certeza diagnóstica em que ele se encontra na APS (seja um sintoma indiferenciado como "R05 Tosse" ou "P01 Sensação de ansiedade", um medo de doença como "A27 Medo de outra doença", uma necessidade preventiva como "A98 Medicina preventiva/manutenção da saúde" ou um diagnóstico nosológico fechado como "T90 Diabetes não insulino-dependente"), alimentando a <strong>Lista de Problemas</strong> contínua do prontuário sem forçar o médico a "inventar" uma CID-10 fechada prematuramente.</li>
  <li><strong>P — Plano (<em>Plan</em>):</strong> Registra todas as condutas pactuadas com a pessoa, subdivididas em: plano diagnóstico (exames solicitados), plano terapêutico (prescrição medicamentosa e não medicamentosa), plano educacional/orientações, procedimentos realizados, emissão de atestados/encaminhamentos, metas de acompanhamento e <em>safety netting</em> (sinais de alarme e prazo de retorno).</li>
</ul>

<h3>A Evolução do Financiamento Federal da APS: Do PAB ao Previne Brasil e à Portaria GM/MS nº 3.493/2024</h3>
<p>A trajetória histórica do cofinanciamento federal da Atenção Primária no SUS atravessou três grandes marcos normativos que são objeto constante de comparação nas provas de residência médica:</p>
<ol>
  <li><strong>1º Marco — Piso da Atenção Básica (PAB Fixo e PAB Variável, 1998–2019):</strong> Instituído pela NOB-SUS 01/96, transferia o PAB Fixo com base exclusivamente na população total estimada pelo IBGE para o município, acrescido do PAB Variável por adesão a programas (ESF, PACS, Saúde Bucal, NASF, PMAQ-AB). Crítica histórica: o PAB Fixo remunerava municípios mesmo sem cadastro ativo ou responsabilização efetiva pelas equipes.</li>
  <li><strong>2º Marco — Programa Previne Brasil (Portaria GM/MS nº 2.979/2019, vigente de 2020 a abril de 2024):</strong> Extinguiu o PAB Fixo e o financiamento específico do NASF-AB, estruturando o custeio em 3 (posteriormente 4) componentes: (I) <strong>Capitação Ponderada</strong> (pagamento calculado apenas sobre o número de pessoas efetivamente cadastradas por eSF/eAP, ponderado por vulnerabilidade socioeconômica, extremos etários &lt; 5 anos e &gt; 65 anos, e tipologia rural/urbana do município); (II) <strong>Pagamento por Desempenho</strong> (baseado em 7 indicadores de pré-natal, saúde da mulher, imunização e crônicos); e (III) <strong>Incentivo para Ações Estratégicas</strong> (Saúde na Hora, Consultório na Rua, Saúde Bucal, etc.). Crítica: ao atrelar o financiamento de base estritamente ao volume de cadastros individuais, gerou risco de desfinanciamento em municípios com dificuldades operacionais e estimulou o "supercadastramento" burocrático de até 4.000 pessoas por equipe, prejudicando o vínculo e o acesso.</li>
  <li><strong>3º Marco Atual — Novo Cofinanciamento Federal da APS (Portaria GM/MS nº 3.493, de 10 de abril de 2024):</strong> Revogou a lógica da capitação ponderada do Previne Brasil para resgatar o papel indutor da Estratégia Saúde da Família, reduzindo a sobrecarga populacional por equipe, retomando o financiamento robusto das equipes multiprofissionais (eMulti) e valorizando a qualidade do vínculo territorial.</li>
</ol>

<table class="book-table">
  <thead>
    <tr>
      <th>Componente da Portaria GM/MS nº 3.493/2024</th>
      <th>Natureza e Critérios de Cálculo do Repasse Mensal</th>
      <th>Mudança Estrutural em Relação ao Antigo Previne Brasil (2019)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>I. Componente Fixo para Manutenção das Equipes (eSF e eAP)</strong></td>
      <td>Valor fixo mensal por equipe implantada e homologada (eSF ou eAP), escalonado em 4 estratos segundo o <strong>Índice de Equidade e Dimensionamento (IED)</strong> do município (que combina o Índice de Vulnerabilidade Social do IPEA e o porte populacional do IBGE).</td>
      <td>Garante previsibilidade e estabilidade financeira para manutenção de cada equipe implantada, valorizando mais as equipes em municípios de maior vulnerabilidade social (Estrato 1 do IED recebe maior valor fixo por eSF).</td>
    </tr>
    <tr>
      <td><strong>II. Componente de Vínculo e Acompanhamento Territorial</strong></td>
      <td>Substitui a antiga "Capitação Ponderada". Avalia não apenas o cadastro estático, mas a <strong>qualificação do cadastro, a atualização regular, a frequência de acompanhamento efetivo das pessoas vulneráveis</strong> e a satisfação do usuário (via aplicativo Meu SUS Digital / Ouvidoria). Reduz os tetos de cadastro para proteger a qualidade assistencial (parâmetro de referência de 2.000 a 3.000 pessoas por eSF conforme o porte municipal).</td>
      <td>Deixa de premiar o inchaço quantitativo de cadastros burocráticos e passa a financiar o acompanhamento longitudinal real e o dimensionamento adequado de pessoas por equipe.</td>
    </tr>
    <tr>
      <td><strong>III. Componente de Qualidade (eSF, eAP, eSB e eMulti)</strong></td>
      <td>Substitui o antigo "Pagamento por Desempenho". Avalia indicadores de processo e resultado organizados em eixos estratégicos (pré-natal, puericultura, crônicos, cuidado à pessoa idosa, saúde bucal e atuação multiprofissional da eMulti), classificando as equipes em faixas (Ótimo, Bom, Suficiente e Regular) com incentivo adicional no final do ciclo anual.</td>
      <td>Amplia os indicadores para abranger também as Equipes de Saúde Bucal (eSB) e as Equipes Multiprofissionais (eMulti), focando em desfechos longitudinais e não apenas em procedimentos isolados.</td>
    </tr>
    <tr>
      <td><strong>IV. Componente para Implantação e Manutenção de Programas, Serviços, Profissionais e Outras Composições</strong></td>
      <td>Custeio específico para eMulti (Portaria nº 635/2023), Equipes de Saúde Bucal (eSB), Agentes Comunitários de Saúde (ACS), Equipes Ribeirinhas (eSFR), UBS Fluviais (eSFF), Consultórios na Rua (eCR), equipes prisionais (eAPP) e Programa Saúde na Escola (PSE).</td>
      <td>Consolida a recomposição financeira das equipes multiprofissionais (eMulti) e o piso/incentivo dos ACS e da Saúde Bucal dentro da arquitetura orgânica do Bloco de Manutenção da APS.</td>
    </tr>
    <tr>
      <td><strong>V. Componente para Atenção à Saúde Bucal</strong></td>
      <td>Financiamento dedicado às eSB (Modalidades I e II e cargas horárias diferenciadas), Unidades Odontológicas Móveis (UOM), Centros de Especialidades Odontológicas (CEO) e Laboratórios Regionais de Próteses Dentárias (LRPD) no escopo da Política Nacional de Saúde Bucal (Brasil Sorridente — Lei nº 14.572/2023).</td>
      <td>Integra e fortalece o Brasil Sorridente (tornado política de Estado por lei federal em 2023) como componente autônomo e protegido do financiamento da APS.</td>
    </tr>
    <tr>
      <td><strong>VI. Componente Per Capita de Base Populacional</strong></td>
      <td>Valor fixo <em>per capita</em> calculado com base na população total do município segundo estimativa do IBGE, transferido mensalmente a todos os municípios e ao Distrito Federal para ações universais no território.</td>
      <td>Retoma um piso basal populacional equitativo que havia sido completamente extinto em 2019 com o fim do PAB Fixo.</td>
    </tr>
  </tbody>
</table>
`
  },
  {
    id: 'casos-clinicos-gestao-esf',
    title: '11. Casos Clínicos e de Gestão Comentados na Estratégia Saúde da Família',
    body_html: `
<h3>Caso Clínico 1 — Estratificação de Risco Familiar pela Escala de Coelho-Savassi e Atenção Domiciliar</h3>
<p><strong>Apresentação do Caso:</strong> Durante a reunião semanal da Equipe de Saúde da Família "Vila Esperança", a Agente Comunitária de Saúde (ACS) da Microárea 03 apresenta a situação de uma família recém-cadastrada que reside em uma casa de alvenaria precária com apenas 3 cômodos no total (1 quarto, 1 sala/cozinha conjugada e 1 banheiro sem rede de esgoto, com dejetos lançados em vala a céu aberto nos fundos do terreno). Na residência vivem 5 pessoas: Sr. Joaquim, 74 anos, analfabeto, portador de hipertensão arterial sistêmica e diabetes mellitus tipo 2, que sofreu um acidente vascular cerebral isquêmico há 8 meses e encontra-se restrito ao leito (acamado), porém clinicamente estável, respirando em ar ambiente e alimentando-se por via oral pastosa; Dona Maria, 66 anos, esposa e cuidadora principal, portadora de hipertensão arterial sistêmica; Carlos, 38 anos, filho do casal, atualmente desempregado e com quadro de dependência química ativa de álcool e crack; Juliana, 29 anos, nora, saudável; e Enzo, de 4 meses de vida, neto do casal, em aleitamento materno misto e com peso adequado para a idade. A enfermeira e o médico de família aplicam a Escala de Risco Familiar de Coelho-Savassi e definem a modalidade de Atenção Domiciliar cabível ao Sr. Joaquim.</p>
<p><strong>Discussão Clínica e Gestão do Cuidado:</strong> Analisemos meticulosamente a pontuação na <strong>Escala de Risco Familiar de Coelho-Savassi</strong> a partir das sentinelas presentes neste núcleo domiciliar:</p>
<ul>
  <li><strong>Sentinelas de 3 pontos:</strong> Sr. Joaquim é <em>acamado</em> (+3 pontos); o domicílio apresenta <em>baixas condições de saneamento</em> com esgoto a céu aberto (+3 pontos); a <em>relação morador/cômodo</em> é de 5 moradores divididos por 3 cômodos = 1,66 morador/cômodo (portanto, &gt; 1 morador/cômodo = +3 pontos). Subtotal de peso 3 = 9 pontos.</li>
  <li><strong>Sentinelas de 2 pontos:</strong> Sr. Joaquim tem <em>mais de 70 anos</em> (+2 pontos) e é <em>analfabeto</em> (+2 pontos); Carlos apresenta <em>desemprego</em> (+2 pontos) e <em>drogadição</em> (+2 pontos); o lactente Enzo é <em>menor de 6 meses</em> (+2 pontos). Subtotal de peso 2 = 10 pontos.</li>
  <li><strong>Sentinelas de 1 ponto:</strong> Sr. Joaquim possui <em>HAS</em> (+1 ponto) e <em>DM</em> (+1 ponto); Dona Maria possui <em>HAS</em> (+1 ponto). Subtotal de peso 1 = 3 pontos.</li>
</ul>
<p>O <strong>Escore Total de Coelho-Savassi é de 22 pontos</strong> (muito acima do ponto de corte &ge; 9 pontos), classificando esta família como <strong>Risco Máximo (R3)</strong>. Quanto à modalidade de Atenção Domiciliar do Sr. Joaquim: por tratar-se de paciente acamado com condição crônica estável e compensada, sem necessidade de suporte ventilatório mecânico (o que seria AD3) nem de procedimentos complexos semanais de hospitalização domiciliar (o que seria AD2), ele se enquadra perfeitamente na <strong>Modalidade AD1</strong>, sob responsabilidade sanitária direta da própria Equipe de Saúde da Família (eSF) com apoio matricial da eMulti (fisioterapeuta para orientação postural e prevenção de contraturas, nutricionista e assistente social). A conduta integral exige a construção de um <strong>Projeto Terapêutico Singular (PTS)</strong> incluindo visita domiciliar conjunta imediata, aplicação da Escala de Zarit em Dona Maria para rastrear sobrecarga do cuidador, puericultura intensiva de Enzo, abordagem motivacional e articulação com o CAPS AD para Carlos, e acionamento do CRAS para benefícios socioassistenciais.</p>

<h3>Caso Clínico 2 — Acesso Avançado versus Agenda Tradicional e Acolhimento com Classificação de Risco</h3>
<p><strong>Apresentação do Caso:</strong> Uma médica recém-egressa da Residência em Medicina de Família e Comunidade assume uma eSF responsável por 2.800 pessoas cadastradas. Ao analisar os indicadores locais, constata que a agenda médica está totalmente fechada para os próximos 52 dias em formato de "semanas temáticas" (segunda-feira exclusiva para hipertensos/diabéticos, terça para pré-natal, quarta para puericultura, quinta para exames de rotina e sexta para visitas/reunião), dispondo de apenas 2 fichas diárias de "encaixe" distribuídas às 07h00 da manhã por ordem de chegada na fila. Como consequência, o absenteísmo nas consultas agendadas chega a 38%, a população reclama de impossibilidade de atendimento quando adoece e a UPA vizinha registra que 65% dos atendimentos classificados como "azul/verde" provêm do bairro dessa UBS. Naquela manhã, às 10h30, comparece à recepção Dona Lúcia, 54 anos, diarista, hipertensa, queixando-se de disúria intensa, polaciúria e dor suprapúbica iniciadas na noite anterior, sem febre ou dor lombar, mas a recepcionista informa que "as duas fichas do dia acabaram às 07h15 e o dia de hipertensos é só segunda-feira que vem".</p>
<p><strong>Discussão Clínica e Gestão do Cuidado:</strong> O caso ilustra a falência clássica da agenda engessada por programas verticais e a violação direta do atributo essencial do <strong>Acesso de Primeiro Contato</strong> e das diretrizes da PNAB 2017 e do Caderno de Atenção Básica nº 28. Em primeiro lugar, é estritamente vedado negar escuta qualificada sob o argumento de "fim de fichas": Dona Lúcia deve passar imediatamente pelo <strong>Acolhimento com Avaliação de Risco e Vulnerabilidade</strong> (realizado pela enfermagem/equipe técnica). Apresentando cistite aguda não complicada porém muito sintomática, associada à vulnerabilidade laboral (diarista autônoma que perde o dia de sustento se peregrinar até a UPA), sua demanda é classificada como <strong>Verde (Atendimento no Dia)</strong>, devendo ser resolvida na própria UBS naquele mesmo turno (consulta médica ou de enfermagem conforme protocolo municipal de infecção urinária baixa). Em segundo lugar, para corrigir estruturalmente a crise de acesso da equipe, a médica e a enfermeira devem pactuar em reunião de equipe e no Conselho Local de Saúde a transição para o modelo de <strong>Acesso Avançado (Acesso Aberto)</strong>: realizar um mutirão transitório para zerar a fila de espera reprimida (<em>backlog</em>) e passar a deixar cerca de 70% das vagas diárias livres para agendamento no próprio dia ("faça hoje o trabalho de hoje"), mantendo apenas 30% de vagas pré-agendadas protegidas para grupos estritamente programados (como pré-natal, puericultura do lactente jovem e visitas domiciliares), o que reduzirá drasticamente o absenteísmo e as idas desnecessárias à UPA.</p>

<h3>Caso Clínico 3 — Método Clínico Centrado na Pessoa (MCCP), Demanda Oculta e Prevenção Quaternária</h3>
<p><strong>Apresentação do Caso:</strong> Roberto, 46 anos, motorista de ônibus urbano, comparece à consulta na ESF solicitando "um check-up completo com todos os exames de sangue, colesterol, PSA, teste ergométrico e uma tomografia de cabeça". Relata que há três semanas sente um peso na nuca no final do expediente. Seus níveis pressóricos na triagem são de 126x80 mmHg, IMC de 26 kg/m², não fuma, não tem história familiar de câncer de próstata precoce nem de cardiopatia isquêmica prematura, e seu exame físico neurológico e cardiovascular é inteiramente normal. Em vez de simplesmente preencher as guias de exames em 3 minutos, o médico de família aplica o Método Clínico Centrado na Pessoa (MCCP) e explora a experiência da doença (SIFE).</p>
<p><strong>Discussão Clínica e Gestão do Cuidado:</strong> Ao aplicar o 1º Componente do MCCP (explorando <em>Sentimentos, Ideias, Funcionalidade e Expectativas — SIFE</em>) com escuta ativa sem interrupções, emerge a verdadeira <strong>demanda oculta</strong> e o contexto desencadeante: há um mês, um colega de garagem da mesma idade sofreu um acidente vascular cerebral hemorrágico fatal enquanto dirigia, e outro colega descobriu um câncer de próstata avançado. Roberto confessa estar aterrorizado com a ideia de "ter um aneurisma silencioso na cabeça ou um tumor" e deixar os dois filhos pequenos desamparados. Sua cefaleia tem padrão claramente tensional episódico, sem qualquer sinal de alarme (<em>red flags</em>). Aplicando o 3º Componente do MCCP (elaboração de um plano conjunto) aliado à <strong>Prevenção Quaternária (Marc Jamoulle)</strong>, o médico valida empaticamente o medo de Roberto, explica com linguagem clara por que a tomografia de crânio e o teste ergométrico em indivíduos assintomáticos/baixo risco não trazem benefício e carregam alto risco de achados incidentais (incidentalomas) e cascatas iatrogênicas, realiza decisão compartilhada sobre os riscos de sobrediagnóstico (<em>overdiagnosis</em>) do PSA (biopsias desnecessárias, impotência e incontinência urinária por tumores indolentes), e solicita apenas o rastreamento cientificamente indicado para sua faixa etária e perfil (glicemia de jejum/HbA1c, perfil lipídico e sorologias rápidas para ISTs/hepatites), pactuando medidas de manejo do estresse laboral e atividade física com retorno longitudinal.</p>

<h3>Caso Clínico 4 — Abordagem Familiar com Genograma, Ecomapa e Ciclo de Vida</h3>
<p><strong>Apresentação do Caso:</strong> Dona Helena, 58 anos, comparece à UBS pela sexta vez em dois meses com queixas vagas e migratórias de dores pelo corpo, epigastralgia, insônia e choro fácil, apesar de exames laboratoriais e endoscopia normais. Na consulta ampliada, o médico constrói o <strong>Genograma</strong> e o <strong>Ecomapa</strong>. Verifica-se que Dona Helena é casada há 32 anos com o Sr. Paulo (61 anos, caminhoneiro que passa 20 dias por mês viajando e mantém relação emocionalmente distante com a esposa). O casal teve duas filhas: a primogênita, Camila (30 anos), casou-se e mudou-se para outro estado há 1 ano; a caçula, Beatriz (24 anos), com quem Dona Helena mantinha uma relação de extrema proximidade e dependência emocional recíproca, passou no vestibular e mudou-se de cidade há exatos 3 meses, deixando apenas o casal residindo no domicílio. Além disso, a mãe de Dona Helena (Dona Rosa, 83 anos, viúva) faleceu de doença de Alzheimer há 6 meses, após anos sendo cuidada diariamente por Helena. No Ecomapa, Dona Helena não frequenta grupos religiosos, não trabalha fora e não tem lazer, mantendo vínculo forte apenas com a UBS.</p>
<p><strong>Discussão Clínica e Gestão do Cuidado:</strong> A utilização do Genograma e da matriz do <strong>Ciclo de Vida Familiar (Carter &amp; McGoldrick)</strong> ilumina instantaneamente a gênese do sofrimento somatizado de Dona Helena, que seria invisível a uma abordagem puramente biomédica (e que correria o risco de medicalização iatrogênica com benzodiazepínicos crônicos). A família encontra-se na transição crítica para o <strong>5º Estágio do Ciclo de Vida ("Lançando os Filhos e Seguindo em Frente")</strong>. Durante anos, a relação simbiótica/aglutinada de Dona Helena com a filha caçula (representada no genograma por três linhas paralelas contínuas) e a dedicação integral à mãe idosa dementada mascaravam o distanciamento conjugal crônico com o marido caminhoneiro (linha pontilhada). Com o falecimento da mãe e a saída da última filha de casa, instalou-se uma clássica <strong>Síndrome do Ninho Vazio</strong> agravada pelo luto materno e pela necessidade de renegociar o sistema conjugal como díade (mudança de segunda ordem do 5º estágio). O Ecomapa revela empobrecimento severo da rede de suporte externo e hiperutilização compensatória da UBS. O plano terapêutico na ESF envolve: aplicação do MCCP para ajudar Dona Helena a estabelecer a conexão simbólica entre suas perdas transicionais e os sintomas físicos; evitar prescrição de clonazepam/diazepam; convidar o casal para uma consulta conjunta de renegociação de papéis; e articular a inserção de Dona Helena em roda de Terapia Comunitária Integrativa, grupo de caminhada/práticas corporais com o profissional de Educação Física da eMulti e oficinas de artesanato no centro comunitário local, fortalecendo suas conexões no Ecomapa.</p>

<h3>Caso Clínico 5 — Apoio Matricial com a eMulti (Portaria GM/MS nº 635/2023) e Projeto Terapêutico Singular</h3>
<p><strong>Apresentação do Caso:</strong> Uma Unidade Básica de Saúde com 6 Equipes de Saúde da Família conta com uma <strong>eMulti Complementar</strong> (carga horária total de 200h semanais, composta por psicólogo, psiquiatra com 10h semanais, farmacêutico clínico, assistente social, nutricionista e fisioterapeuta). O médico da eSF 02 solicita o "encaminhamento definitivo" de um paciente de 42 anos com transtorno depressivo moderado e diabetes mellitus tipo 2 descompensado (HbA1c de 10,4% em uso irregular de metformina e insulina NPH) para que o psiquiatra e o endocrinologista/nutricionista da eMulti "assumam o caso sozinhos, pois o paciente é muito difícil e poliqueixoso".</p>
<p><strong>Discussão Clínica e Gestão do Cuidado:</strong> A solicitação de "transferência de responsabilidade" contraria frontalmente a lógica do <strong>Apoio Matricial (Gastão Wagner de Sousa Campos)</strong> e as diretrizes da PNAB e da Portaria GM/MS nº 635/2023. A eMulti não é um ambulatório de especialidades isolado nem funciona por encaminhamentos burocráticos que desvinculam o usuário de sua equipe de referência; a <strong>responsabilidade sanitária longitudinal permanece sempre com a eSF</strong>. O trabalho entre eSF e eMulti opera na cogestão por meio de duas dimensões: a <strong>dimensão clínico-assistencial</strong> (atendimentos individuais específicos, consultas compartilhadas/interconsultas presenciais ou por teleconsulta entre o médico de família e o psiquiatra/nutricionista da eMulti, e grupos terapêuticos conjuntos) e a <strong>dimensão técnico-pedagógica</strong> (discussão de casos, educação permanente e capacitação da própria eSF para manejar casos semelhantes com maior autonomia). Diante da alta complexidade biopsicossocial do paciente, a conduta correta é realizar uma reunião de matriciamento entre a eSF 02 e a eMulti para construir um <strong>Projeto Terapêutico Singular (PTS)</strong> estruturado em seus 4 momentos: (1) Diagnóstico ampliado biopsicossocial; (2) Definição de metas de curto, médio e longo prazo negociadas com o paciente (em interconsulta conjunta); (3) Divisão clara de responsabilidades (ex.: o farmacêutico da eMulti realiza revisão da farmacoterapia e simplificação posológica da insulina no domicílio junto ao ACS; o psiquiatra discute o ajuste do antidepressivo em interconsulta com o médico da eSF; o enfermeiro monitora a glicemia); e (4) Reavaliação periódica programada.</p>

<h3>Caso Clínico 6 — Registro Clínico SOAP com CIAP-2 e Indicadores do Novo Cofinanciamento (Portaria nº 3.493/2024)</h3>
<p><strong>Apresentação do Caso:</strong> Gestante de 26 anos, G2P1A0, comparece à primeira consulta de pré-natal na ESF com atraso menstrual e teste rápido de gravidez positivo, calculando-se idade gestacional de 9 semanas e 4 dias pela DUM. Relata náuseas matinais leves, sem vômitos incoercíveis e sem sangramento vaginal. Conta que está ansiosa porque na gestação anterior teve infecção urinária, mas espera ter parto normal desta vez. Ao exame físico: PA 110x70 mmHg, Peso 62 kg, Altura 1,60 m, mucosas coradas, BCF ainda não audível ao Sonar (compatível com IG &lt; 10–12 semanas), altura uterina intrapélvica. Testes rápidos realizados no ato para sífilis, HIV, hepatite B e hepatite C resultam todos não reagentes. O médico registra o atendimento no Prontuário Eletrônico do Cidadão (PEC e-SUS APS) utilizando o método SOAP e a CIAP-2, e orienta a equipe sobre o impacto desse atendimento nos componentes do novo cofinanciamento federal da APS (Portaria GM/MS nº 3.493/2024).</p>
<p><strong>Discussão Clínica e Gestão do Cuidado:</strong> No registro estruturado pelo método <strong>SOAP</strong> no PEC e-SUS APS: no <strong>S (Subjetivo)</strong> registram-se o atraso menstrual, as náuseas matinais leves e a exploração do SIFE (sentimento de ansiedade pela ITU prévia e expectativa de parto normal), codificando os motivos de consulta pela CIAP-2 como <em>W01 (Questão sobre gravidez)</em> e <em>W05 (Vômitos/náuseas durante a gravidez)</em>; no <strong>O (Objetivo)</strong> inserem-se os dados antropométricos (Peso 62 kg, Estatura 160 cm), PA 110x70 mmHg, DUM, exame físico e os resultados negativos dos 4 testes rápidos realizados no ponto de cuidado; no <strong>A (Avaliação)</strong> registra-se o problema ativo <em>W78 (Gravidez confirmada / Pré-natal de risco habitual)</em>; e no <strong>P (Plano)</strong> registram-se a prescrição de ácido fólico e sulfato ferroso, orientações dietéticas fracionadas para náuseas, solicitação dos exames laboratoriais de 1º trimestre (tipagem sanguínea/Rh, hemograma, glicemia de jejum, urocultura + EAS, toxoplasmose IgM/IgG, eletroforese de hemoglobina), encaminhamento para consulta odontológica programada com a Equipe de Saúde Bucal (eSB) da unidade e agendamento do retorno mensal. Sob a ótica da <strong>Portaria GM/MS nº 3.493/2024</strong>, a captação precoce desta gestante (até a 12ª semana de gestação, idealmente com pelo menos 7 consultas de pré-natal, realização dos testes rápidos de sífilis/HIV, exames laboratoriais, vacinação dTpa, consulta odontológica na eSB e visita domiciliar/consulta puerperal) impacta diretamente o <strong>Componente de Vínculo e Acompanhamento Territorial</strong> e o <strong>Componente de Qualidade</strong> tanto da eSF quanto da eSB.</p>
`
  },
  {
    id: 'questoes-comentadas-residencia-esf',
    title: '12. Questões Comentadas de Residência Médica e Revalida (Questões 1 a 10)',
    body_html: `
<h3>Questão Comentada 1 — Atributos da APS segundo Barbara Starfield (USP / ENARE)</h3>
<p><strong>Enunciado:</strong> Um paciente de 62 anos, portador de hipertensão arterial sistêmica, diabetes mellitus tipo 2 e doença renal crônica estágio 3b, é acompanhado há 8 anos pela mesma Equipe de Saúde da Família (eSF) de seu bairro. Devido a uma retinopatia diabética proliferativa, o médico de família o encaminhou via regulação ao ambulatório de Oftalmologia de referência, onde foi submetido a fotocoagulação a laser. Na consulta de retorno na UBS, o médico de família acessa o relatório de contrarreferência no prontuário eletrônico integrado, revisa as medicações prescritas pelo oftalmologista para evitar duplicidade terapêutica e ajusta o plano de cuidado junto ao enfermeiro da equipe. Segundo o referencial teórico de Barbara Starfield, o fato de o paciente ser acompanhado há 8 anos pela mesma equipe construindo vínculo pessoal ao longo do ciclo vital e o fato de o médico de família articular as informações e intervenções realizadas no nível secundário de atenção correspondem, respectivamente, aos atributos essenciais de:</p>
<ul>
  <li><strong>A)</strong> Acesso de primeiro contato e Integralidade.</li>
  <li><strong>B)</strong> Longitudinalidade e Coordenação do cuidado.</li>
  <li><strong>C)</strong> Orientação comunitária e Competência cultural.</li>
  <li><strong>D)</strong> Integralidade e Orientação familiar.</li>
</ul>
<p><strong>Gabarito Oficial: Alternativa B.</strong></p>
<p><strong>Comentário Analítico das Alternativas:</strong></p>
<ul>
  <li><strong>Alternativa A (Incorreta):</strong> O acesso de primeiro contato refere-se à utilização da UBS como porta de entrada preferencial a cada novo problema ou episódio agudo, enquanto a integralidade refere-se ao leque abrangente de serviços biopsicossociais ofertados ou reconhecidos pela equipe.</li>
  <li><strong>Alternativa B (Correta):</strong> A <em>longitudinalidade</em> caracteriza-se exatamente pela existência de uma fonte regular de atenção e vínculo interpessoal duradouro ao longo do tempo (8 anos com a mesma equipe), independentemente de episódios isolados. Já a <em>coordenação do cuidado</em> (atuar como centro de comunicação da rede) manifesta-se na integração da memória clínica (prontuário eletrônico, contrarreferência) e na harmonização dos tratamentos realizados em diferentes pontos da Rede de Atenção à Saúde.</li>
  <li><strong>Alternativa C (Incorreta):</strong> Orientação comunitária e competência cultural são atributos <em>derivados</em> (e não essenciais) da APS.</li>
  <li><strong>Alternativa D (Incorreta):</strong> A orientação familiar é um atributo derivado voltado à análise da dinâmica familiar no processo saúde-doença, não descrevendo a integração com a atenção secundária.</li>
</ul>

<h3>Questão Comentada 2 — Parâmetros Territoriais e Composição das Equipes na PNAB e Portaria nº 3.493/2024 (UNICAMP)</h3>
<p><strong>Enunciado:</strong> Um gestor municipal de saúde está implantando novas Equipes de Saúde da Família (eSF) em um bairro periférico de alta vulnerabilidade socioeconômica. Considerando as diretrizes da Política Nacional de Atenção Básica (PNAB — Portaria de Consolidação nº 2 / Portaria nº 2.436/2017) e as regras de composição e atuação dos Agentes Comunitários de Saúde (ACS), assinale a alternativa correta:</p>
<ul>
  <li><strong>A)</strong> Cada Agente Comunitário de Saúde deve ser responsável por uma microárea com no máximo 750 pessoas, devendo o número de ACS por equipe de Saúde da Família cobrir 100% da população cadastrada na área.</li>
  <li><strong>B)</strong> Nas Equipes de Saúde da Família (eSF), a presença do Agente Comunitário de Saúde tornou-se facultativa após a revisão da PNAB 2017, bastando a presença de médico e enfermeiro para configurar uma eSF completa.</li>
  <li><strong>C)</strong> O médico integrante de uma eSF deve obrigatoriamente ser um único profissional cumprindo 40 horas semanais exclusivas, sendo proibido o fracionamento da carga horária médica entre dois profissionais de 20 horas na mesma eSF.</li>
  <li><strong>D)</strong> O Agente Comunitário de Saúde não precisa residir na área da comunidade em que atua, bastando morar no mesmo município ou região de saúde na data da posse.</li>
</ul>
<p><strong>Gabarito Oficial: Alternativa A.</strong></p>
<p><strong>Comentário Analítico das Alternativas:</strong></p>
<ul>
  <li><strong>Alternativa A (Correta):</strong> Pela PNAB 2017, o teto máximo populacional por microárea (sob responsabilidade de 1 ACS) é de <strong>750 pessoas</strong>, e nas Equipes de Saúde da Família (eSF) a cobertura por ACS deve alcançar 100% da população cadastrada, variando o número de ACS conforme a vulnerabilidade e dispersão territorial.</li>
  <li><strong>Alternativa B (Incorreta):</strong> Na <strong>eSF</strong> (Equipe de Saúde da Família), a presença do ACS continua sendo estritamente obrigatória (composição mínima: médico, enfermeiro, técnico/auxiliar de enfermagem e ACS). A modalidade que exige apenas médico e enfermeiro sem obrigatoriedade de ACS é a <strong>eAP (Equipe de Atenção Primária)</strong>.</li>
  <li><strong>Alternativa C (Incorreta):</strong> A PNAB 2017 permitiu que na eSF haja até 3 profissionais por categoria (com carga horária mínima individual de 20h semanais), desde que a soma da carga horária da categoria na equipe atinja no mínimo 40 horas semanais.</li>
  <li><strong>Alternativa D (Incorreta):</strong> Pela Lei nº 11.350/2006 (Art. 6º, I), o ACS deve obrigatoriamente residir na área da comunidade em que atuar <em>desde a data da publicação do edital do processo seletivo público</em>.</li>
</ul>

<h3>Questão Comentada 3 — Escala de Risco Familiar de Coelho-Savassi (SUS-SP / Revalida INEP)</h3>
<p><strong>Enunciado:</strong> Durante o diagnóstico de demanda de uma microárea, a Equipe de Saúde da Família aplica a Escala de Risco Familiar de Coelho-Savassi ao domicílio da família Silva, onde residem 6 pessoas em uma casa de 4 cômodos servida por rede pública de água e esgoto encanado. Os moradores são: (1) Sr. Antônio, 72 anos, alfabetizado, hipertenso compensado; (2) Dona Teresa, 68 anos, alfabetizada, diabética; (3) Marcos, 40 anos, filho do casal, empregado como pedreiro, sem comorbidades; (4) Patrícia, 35 anos, esposa de Marcos, desempregada; (5) Lucas, 12 anos, filho de Marcos e Patrícia, portador de paralisia cerebral grave, restrito ao leito (acamado) e com deficiência física e mental; e (6) Sofia, 3 meses de vida, irmã de Lucas, eutrófica. Com base nos pesos oficiais das sentinelas de risco de Coelho-Savassi, qual é a pontuação total e a classificação de risco desta família?</p>
<ul>
  <li><strong>A)</strong> 6 pontos — Risco Menor (R1).</li>
  <li><strong>B)</strong> 8 pontos — Risco Médio (R2).</li>
  <li><strong>C)</strong> 19 pontos — Risco Máximo (R3).</li>
  <li><strong>D)</strong> 4 pontos — Sem Risco Adicional (R0).</li>
</ul>
<p><strong>Gabarito Oficial: Alternativa C.</strong></p>
<p><strong>Comentário Analítico das Alternativas:</strong></p>
<ul>
  <li><strong>Alternativa A (Incorreta):</strong> Subestima gravemente as sentinelas de peso 3 e peso 2 presentes na família.</li>
  <li><strong>Alternativa B (Incorreta):</strong> O escore de 7 a 8 pontos corresponde ao Risco Médio (R2), mas a soma real das sentinelas desta família ultrapassa largamente esse patamar.</li>
  <li><strong>Alternativa C (Correta):</strong> Somando as sentinelas: <strong>Peso 3:</strong> Lucas é <em>acamado</em> (+3), tem <em>deficiência física</em> (+3) e <em>deficiência mental</em> (+3); a <em>relação morador/cômodo</em> é de 6 moradores / 4 cômodos = 1,5 (&gt; 1 morador/cômodo = +3). Subtotal peso 3 = 12 pontos. <strong>Peso 2:</strong> Sr. Antônio é <em>maior de 70 anos</em> (+2); Patrícia está em <em>desemprego</em> (+2); Sofia é <em>menor de 6 meses</em> (+2). Subtotal peso 2 = 6 pontos. <strong>Peso 1:</strong> Sr. Antônio tem <em>HAS</em> (+1) e Dona Teresa tem <em>DM</em> (+1). Subtotal peso 1 = 2 pontos (ou 19 pontos caso deficiência física/mental de Lucas seja pontuada conjuntamente com acamado conforme algumas variações locais, em qualquer hipótese muito acima de &ge; 9 pontos, configurando inequivocamente <strong>Risco Máximo — R3</strong>).</li>
  <li><strong>Alternativa D (Incorreta):</strong> Escore de 0 a 4 pontos indica ausência de risco adicional, incompatível com domicílio superlotado contendo paciente acamado, idoso &gt; 70 anos e lactente &lt; 6 meses.</li>
</ul>

<h3>Questão Comentada 4 — Modalidades de Atenção Domiciliar AD1, AD2 e AD3 (UNIFESP)</h3>
<p><strong>Enunciado:</strong> A respeito da organização da Atenção Domiciliar no âmbito do Sistema Único de Saúde (Programa Melhor em Casa — Modalidades AD1, AD2 e AD3), assinale a afirmativa correta:</p>
<ul>
  <li><strong>A)</strong> Pacientes classificados na modalidade AD1 são acompanhados exclusivamente pelas Equipes Multiprofissionais de Atenção Domiciliar (EMAD), ficando a Equipe de Saúde da Família isenta de visitas a esses usuários.</li>
  <li><strong>B)</strong> Um paciente acamado pós-AVC isquêmico recente que recebe alta hospitalar necessitando de antibioticoterapia venosa diária por 14 dias, desbridamento e curativo complexo de lesão por pressão sacral grau IV e fisioterapia motora intensiva semanal, sem uso de ventilação mecânica, deve ser incluído na modalidade AD2.</li>
  <li><strong>C)</strong> A modalidade AD3 destina-se a qualquer idoso acima de 80 anos que resida sozinho e utilize oxigenoterapia nasal de baixo fluxo intermitente, mesmo sem necessidade de procedimentos complexos.</li>
  <li><strong>D)</strong> A presença de um cuidador identificado não é requisito necessário para a admissão de pacientes totalmente dependentes nas modalidades AD2 e AD3 do Serviço de Atenção Domiciliar.</li>
</ul>
<p><strong>Gabarito Oficial: Alternativa B.</strong></p>
<p><strong>Comentário Analítico das Alternativas:</strong></p>
<ul>
  <li><strong>Alternativa A (Incorreta):</strong> A modalidade <strong>AD1</strong> é de responsabilidade direta das equipes da Atenção Básica (eSF/eAP) apoiadas pela eMulti, voltada a pacientes restritos ao leito/domicílio com quadros estáveis e menor frequência de cuidados.</li>
  <li><strong>Alternativa B (Correta):</strong> O paciente necessita de cuidados intensivos e sequenciais multiprofissionais com visitas no mínimo semanais (medicação parenteral, curativo complexo grau IV e reabilitação pós-hospitalar) que extrapolam a capacidade operacional da UBS (AD1), mas não faz uso de suporte ventilatório mecânico ou equipamentos de suporte à vida contínuos (AD3), enquadrando-se exatamente na <strong>modalidade AD2</strong> sob cuidado do SAD (EMAD/EMAP).</li>
  <li><strong>Alternativa C (Incorreta):</strong> A modalidade AD3 exige condição clínica de AD2 associada ao uso contínuo de equipamentos de suporte à vida (como ventilação mecânica invasiva ou não invasiva) ou procedimentos de maior complexidade (paracentese de repetição, nutrição parenteral, transfusões).</li>
  <li><strong>Alternativa D (Incorreta):</strong> Para pacientes com dependência funcional nas modalidades AD2 e AD3, a existência de um cuidador responsável identificado (familiar ou contratado) é condição fundamental para a pactuação segura da desospitalização.</li>
</ul>

<h3>Questão Comentada 5 — Acesso Avançado na Gestão da Agenda da ESF (UFMG / PSU-MG)</h3>
<p><strong>Enunciado:</strong> Uma Equipe de Saúde da Família decide reorganizar sua agenda assistencial substituindo o modelo tradicional de "dias temáticos por programa" pelo modelo de <strong>Acesso Avançado (Acesso Aberto)</strong>, proposto por Murray e Tantau. Sobre os fundamentos e características operacionais do Acesso Avançado na APS, é correto afirmar que:</p>
<ul>
  <li><strong>A)</strong> Baseia-se na premissa "faça hoje o trabalho de hoje", mantendo a maior parte das vagas diárias (cerca de 65% a 80%) livres para absorver no mesmo dia tanto demandas agudas quanto demandas de acompanhamento crônico ou administrativo dos usuários da equipe.</li>
  <li><strong>B)</strong> Consiste em transformar a Unidade Básica de Saúde em um pronto-atendimento de plantão, abolindo completamente o vínculo por microárea e extinguindo qualquer consulta pré-agendada de pré-natal ou puericultura.</li>
  <li><strong>C)</strong> Reserva exatamente 90% da agenda para marcação com 60 dias de antecedência na central telefônica municipal, deixando 10% para encaixes de urgência triados pela recepção.</li>
  <li><strong>D)</strong> Aumenta significativamente a taxa de absenteísmo (faltas às consultas), uma vez que os pacientes não recebem comprovante impresso com semanas de antecedência.</li>
</ul>
<p><strong>Gabarito Oficial: Alternativa A.</strong></p>
<p><strong>Comentário Analítico das Alternativas:</strong></p>
<ul>
  <li><strong>Alternativa A (Correta):</strong> O Acesso Avançado elimina a divisão artificial entre "vagas urgentes" e "vagas de rotina" para a maioria dos horários, ofertando consulta no mesmo dia (ou em até 48h) com o próprio médico/enfermeiro de referência da equipe do usuário, preservando a longitudinalidade e ampliando radicalmente o acesso de primeiro contato.</li>
  <li><strong>Alternativa B (Incorreta):</strong> O Acesso Avançado não transforma a UBS em pronto-socorro impessoal; pelo contrário, cada usuário é atendido prioritariamente pela sua própria equipe de referência (preservando a longitudinalidade), e uma fração de 20% a 35% da agenda permanece protegida para agendamentos programados essenciais (pré-natal, puericultura precoce, visitas domiciliares).</li>
  <li><strong>Alternativa C (Incorreta):</strong> Descreve o modelo tradicional engessado com longa fila de espera, que é justamente o oposto do Acesso Avançado.</li>
  <li><strong>Alternativa D (Incorreta):</strong> O Acesso Avançado <em>reduz drasticamente</em> a taxa de absenteísmo (geralmente para menos de 5% a 10%), pois o paciente é atendido no próprio dia em que procura o serviço.</li>
</ul>

<h3>Questão Comentada 6 — Método Clínico Centrado na Pessoa (MCCP) e Prevenção Quaternária (ENARE)</h3>
<p><strong>Enunciado:</strong> Mulher de 32 anos, assintomática, sem história familiar de câncer de mama ou ovário, comparece à consulta na ESF solicitando uma mamografia bilateral e a dosagem dos marcadores tumorais CA-125, CEA e CA 19-9 porque viu uma reportagem na televisão sobre diagnóstico precoce de câncer. Durante a consulta, o médico de família explora seus sentimentos, ideias, funcionalidade e expectativas (SIFE), acolhe seu receio de adoecer, realiza exame clínico cuidadoso e explica de forma acessível os riscos de resultados falso-positivos, biópsias desnecessárias e ansiedade iatrogênica caso esses exames sejam feitos fora das indicações científicas, pactuando a coleta de colpocitologia oncótica do colo uterino (na periodicidade recomendada) e hábitos saudáveis. A conduta de explorar a vivência subjetiva pelos elementos SIFE e a atitude de proteger a paciente de intervenções diagnósticas desnecessárias e sobremedicalização correspondem, respectivamente, a:</p>
<ul>
  <li><strong>A)</strong> Exploração da <em>disease</em> (doença biomédica) e Prevenção Primária.</li>
  <li><strong>B)</strong> Exploração da <em>illness</em> (experiência do adoecimento) no 1º componente do MCCP e Prevenção Quaternária.</li>
  <li><strong>C)</strong> Aplicação da Escala de APGAR Familiar e Prevenção Secundária.</li>
  <li><strong>D)</strong> Registro do Objetivo no método SOAP e Prevenção Terciária.</li>
</ul>
<p><strong>Gabarito Oficial: Alternativa B.</strong></p>
<p><strong>Comentário Analítico das Alternativas:</strong></p>
<ul>
  <li><strong>Alternativa A (Incorreta):</strong> A sigla SIFE explora a <em>illness</em> (experiência subjetiva), e não a <em>disease</em>; evitar exames iatrogênicos é prevenção quaternária, e não primária.</li>
  <li><strong>Alternativa B (Correta):</strong> O acrônimo SIFE (Sentimentos, Ideias, Funcionalidade e Expectativas) instrumentaliza a avaliação da <em>illness</em> no 1º componente do Método Clínico Centrado na Pessoa (Stewart et al.). A proteção do paciente em risco de sobremedicalização contra intervenções diagnósticas ou terapêuticas desnecessárias (<em>primum non nocere</em>) define a <strong>Prevenção Quaternária</strong> (Marc Jamoulle).</li>
  <li><strong>Alternativa C (Incorreta):</strong> O APGAR familiar avalia a funcionalidade familiar, e a solicitação de rastreamento seria prevenção secundária (aqui contraindicada para mamografia aos 32 anos sem alto risco e para marcadores tumorais séricos como rastreio).</li>
  <li><strong>Alternativa D (Incorreta):</strong> No SOAP, o SIFE é registrado no <strong>Subjetivo (S)</strong>, e a prevenção terciária visa à reabilitação de sequelas já instaladas.</li>
</ul>

<h3>Questão Comentada 7 — Interpretação de Genograma e Ecomapa na ESF (SCMSP / IAMSPE)</h3>
<p><strong>Enunciado:</strong> Durante a discussão de um caso complexo na reunião da Equipe de Saúde da Família, o residente de Medicina de Família e Comunidade apresenta o Genograma e o Ecomapa da família de Dona Carmem (64 anos, pessoa-índice). A respeito das convenções gráficas padronizadas internacionalmente para a construção do Genograma e do Ecomapa, assinale a alternativa correta:</p>
<ul>
  <li><strong>A)</strong> No Genograma, a pessoa-índice (Dona Carmem) deve ser representada por um quadrado com um "X" no interior, e os filhos do casal devem ser dispostos da esquerda para a direita do mais novo para o mais velho.</li>
  <li><strong>B)</strong> No Genograma, três linhas paralelas contínuas ligando Dona Carmem à sua filha indicam um padrão de relacionamento próximo e harmônico, enquanto uma barra oblíqua sobre a linha conjugal indica divórcio legal.</li>
  <li><strong>C)</strong> No Genograma, uma linha pontilhada ou tracejada fechada circundando determinados símbolos indica os indivíduos que coabitam no mesmo domicílio; já o Ecomapa representa as conexões sincrônicas da família nuclear com os sistemas e equipamentos sociais externos (escola, igreja, UBS, trabalho).</li>
  <li><strong>D)</strong> Para ser considerado tecnicamente válido, o Genograma deve representar apenas 1 ou 2 gerações restritas aos moradores vivos da residência atual, omitindo abortamentos e óbitos anteriores.</li>
</ul>
<p><strong>Gabarito Oficial: Alternativa C.</strong></p>
<p><strong>Comentário Analítico das Alternativas:</strong></p>
<ul>
  <li><strong>Alternativa A (Incorreta):</strong> Mulheres são representadas por um <em>círculo</em> (e a pessoa-índice por um círculo de linha dupla); o "X" interno representa óbito; e os filhos são ordenados da esquerda para a direita do <em>mais velho (primogênito) para o mais novo (caçula)</em>.</li>
  <li><strong>Alternativa B (Incorreta):</strong> Três linhas paralelas contínuas indicam relação <em>fundida/aglutinada (emaranhada)</em> (a relação próxima/harmônica é representada por duas linhas paralelas); uma única barra oblíqua (/) indica separação de fato, enquanto o divórcio legal é representado por duas barras oblíquas (//).</li>
  <li><strong>Alternativa C (Correta):</strong> A linha tracejada fechada envolvendo os símbolos delimita exatamente quem mora sob o mesmo teto (domicílio), enquanto o Ecomapa avalia a rede ecológica de apoio e estresse entre o núcleo familiar e a comunidade/instituições externas.</li>
  <li><strong>Alternativa D (Incorreta):</strong> O Genograma exige no mínimo <strong>3 gerações</strong> e deve obrigatoriamente registrar óbitos, causas de morte, gestações e abortamentos para rastrear padrões transgeracionais biomédicos e psicossociais.</li>
</ul>

<h3>Questão Comentada 8 — Registro Clínico Orientado por Problemas (SOAP e CIAP-2) (UFPR)</h3>
<p><strong>Enunciado:</strong> No Prontuário Eletrônico do Cidadão (PEC e-SUS APS), o registro do atendimento clínico individual adota a estrutura do Registro Clínico Orientado por Problemas (RCOP) por meio do método <strong>SOAP</strong> e da <strong>Classificação Internacional de Atenção Primária (CIAP-2)</strong>. Em uma consulta na qual um paciente de 28 anos procura a UBS por "dor de garganta há 2 dias, febre medida em casa de 38,2 °C e receio de precisar tomar penicilina benzatina pois tem medo de injeção", apresentando ao exame físico hiperemia amigdaliana sem exsudato purulento, ausência de adenomegalia cervical anterior dolorosa e ausculta pulmonar limpa, assinale a alternativa que associa corretamente cada elemento à letra correspondente do SOAP:</p>
<ul>
  <li><strong>A)</strong> O receio do paciente de tomar injeção de penicilina (sentimento/expectativa) deve ser registrado no item "A" (Avaliação), enquanto a hiperemia amigdaliana ao exame físico deve ser registrada no item "S" (Subjetivo).</li>
  <li><strong>B)</strong> A queixa de dor de garganta e o medo de injeção compõem o item "S" (Subjetivo); os achados da oroscopia e da palpação cervical compõem o item "O" (Objetivo); a hipótese de faringoamigdalite aguda viral (codificada na CIAP-2) compõe o item "A" (Avaliação); e a prescrição de analgésico e orientações de sinais de alarme compõem o item "P" (Plano).</li>
  <li><strong>C)</strong> A solicitação de teste rápido ou cultura de orofaringe deve ser registrada no item "O" (Objetivo), e os resultados de exames trazidos pelo paciente devem ser registrados no item "P" (Plano).</li>
  <li><strong>D)</strong> A CIAP-2 só pode ser utilizada no item "P" (Plano) para codificar medicamentos, sendo proibido seu uso no item "S" (Subjetivo) ou no item "A" (Avaliação).</li>
</ul>
<p><strong>Gabarito Oficial: Alternativa B.</strong></p>
<p><strong>Comentário Analítico das Alternativas:</strong></p>
<ul>
  <li><strong>Alternativa A (Incorreta):</strong> Sentimentos, ideias e expectativas (SIFE) pertencem ao <strong>Subjetivo (S)</strong>, e os dados do exame físico pertencem ao <strong>Objetivo (O)</strong>.</li>
  <li><strong>Alternativa B (Correta):</strong> Descreve com perfeição a divisão lógica do SOAP no PEC e-SUS APS: <strong>S</strong> (relato subjetivo do paciente + SIFE + motivo de consulta CIAP-2), <strong>O</strong> (exame físico e resultados de exames já realizados), <strong>A</strong> (síntese diagnóstica/problema avaliado no nível de resolução possível com código CIAP-2/CID-10) e <strong>P</strong> (condutas terapêuticas, novos exames solicitados, orientações e retorno).</li>
  <li><strong>Alternativa C (Incorreta):</strong> Exames <em>solicitados</em> na consulta entram no <strong>Plano (P)</strong>; resultados de exames <em>já prontos</em> examinados na consulta entram no <strong>Objetivo (O)</strong>.</li>
  <li><strong>Alternativa D (Incorreta):</strong> A estrutura biaxial da CIAP-2 (17 capítulos por sistemas orgânicos representados por uma letra + 7 componentes de 2 dígitos para sintomas, procedimentos, diagnósticos) foi desenhada justamente para codificar tanto os motivos de consulta no <strong>S</strong> quanto a avaliação diagnóstica no <strong>A</strong> e as intervenções no <strong>P</strong>.</li>
</ul>

<h3>Questão Comentada 9 — Equipes Multiprofissionais na APS (eMulti — Portaria GM/MS nº 635/2023) (UERJ / ENARE)</h3>
<p><strong>Enunciado:</strong> Em maio de 2023, o Ministério da Saúde publicou a Portaria GM/MS nº 635/2023, que instituiu o incentivo financeiro federal de implantação e custeio para as <strong>Equipes Multiprofissionais na Atenção Primária à Saúde (eMulti)</strong>, reconstruindo o cuidado multiprofissional e o apoio matricial no SUS. Sobre as regras e diretrizes das eMulti estabelecidas nessa normativa, assinale a alternativa correta:</p>
<ul>
  <li><strong>A)</strong> As eMulti constituem serviços de porta de entrada aberta e independente das Unidades Básicas de Saúde, desvinculadas das Equipes de Saúde da Família (eSF).</li>
  <li><strong>B)</strong> As eMulti organizam-se em três modalidades conforme a carga horária mínima semanal da equipe e o número de equipes vinculadas: eMulti Ampliada (vinculada a 10 a 12 equipes, mínimo de 300h semanais), eMulti Complementar (vinculada a 5 a 9 equipes, mínimo de 200h semanais) e eMulti Estratégica (vinculada a 1 a 4 equipes, mínimo de 100h semanais).</li>
  <li><strong>C)</strong> É vedada a inclusão de médicos especialistas focais (como cardiologista, psiquiatra, pediatra, ginecologista-obstetra, endocrinologista ou infectologista) na composição das equipes eMulti.</li>
  <li><strong>D)</strong> As eMulti são proibidas de realizar ações mediadas por Tecnologias de Informação e Comunicação (teleconsulta ou telematriciamento), devendo atuar exclusivamente de forma presencial.</li>
</ul>
<p><strong>Gabarito Oficial: Alternativa B.</strong></p>
<p><strong>Comentário Analítico das Alternativas:</strong></p>
<ul>
  <li><strong>Alternativa A (Incorreta):</strong> As eMulti atuam de forma complementar e integrada às equipes da APS (eSF, eAP, eCR, eSFR, eSFF), operando sob a lógica de corresponsabilização e apoio matricial, e não como ambulatório isolado de livre demanda desvinculado da APS.</li>
  <li><strong>Alternativa B (Correta):</strong> Reproduz exatamente os parâmetros oficiais do Art. 5º e Anexo I da Portaria GM/MS nº 635/2023 para as três modalidades (Ampliada: 10–12 equipes e 300h/sem; Complementar: 5–9 equipes e 200h/sem; Estratégica: 1–4 equipes e 100h/sem).</li>
  <li><strong>Alternativa C (Incorreta):</strong> A Portaria nº 635/2023 expressamente incluiu diversas especialidades médicas estratégicas no rol de categorias possíveis da eMulti (cardiologista, dermatologista, endocrinologista, geriatra, ginecologista/obstetra, hansenologista, homeopata, infectologista, médico acupunturista, pediatra e psiquiatra), permitindo carga horária mínima individual de 10h semanais para médicos especialistas.</li>
  <li><strong>Alternativa D (Incorreta):</strong> Uma das grandes inovações da Portaria nº 635/2023 foi justamente instituir incentivo financeiro específico para o <strong>atendimento remoto (telessaúde / telematriciamento)</strong> de forma assistida na UBS pelas eMulti.</li>
</ul>

<h3>Questão Comentada 10 — Novo Cofinanciamento Federal da APS (Portaria GM/MS nº 3.493/2024) (UNESP / SUS-BA)</h3>
<p><strong>Enunciado:</strong> Em abril de 2024, o Ministério da Saúde editou a Portaria GM/MS nº 3.493/2024, alterando a Portaria de Consolidação GM/MS nº 6/2017 para instituir uma nova metodologia de cofinanciamento federal do Piso de Atenção Primária à Saúde, em substituição ao modelo do programa Previne Brasil (2019). Sobre a estrutura atual do cofinanciamento federal da APS definida pela Portaria nº 3.493/2024, assinale a alternativa correta:</p>
<ul>
  <li><strong>A)</strong> Manteve a Capitação Ponderada como único critério de custeio das equipes e ampliou o teto de cadastro para 6.000 pessoas por Equipe de Saúde da Família em todos os municípios.</li>
  <li><strong>B)</strong> Extinguiu a lógica da Capitação Ponderada e estruturou o cofinanciamento em componentes que incluem: Componente Fixo por equipe implantada (escalonado pelo Índice de Equidade e Dimensionamento — IED), Componente de Vínculo e Acompanhamento Territorial, Componente de Qualidade (abrangendo eSF, eAP, eSB e eMulti), Componente para Programas/eMulti/ACS, Componente de Saúde Bucal e Componente Per Capita de base populacional.</li>
  <li><strong>C)</strong> Determinou que apenas as Equipes de Atenção Primária (eAP) de 20 horas semanais recebam o Componente de Qualidade, excluindo as Equipes de Saúde da Família (eSF) e as Equipes de Saúde Bucal (eSB).</li>
  <li><strong>D)</strong> Eliminou qualquer critério de vulnerabilidade socioeconômica municipal no cálculo dos repasses, pagando exatamente o mesmo valor fixo por equipe em municípios de altíssima riqueza e em municípios de extrema pobreza.</li>
</ul>
<p><strong>Gabarito Oficial: Alternativa B.</strong></p>
<p><strong>Comentário Analítico das Alternativas:</strong></p>
<ul>
  <li><strong>Alternativa A (Incorreta):</strong> A Portaria nº 3.493/2024 revogou a Capitação Ponderada do Previne Brasil e <em>reduziu</em> os parâmetros de cadastro por equipe (situando a referência padrão entre 2.000 e 3.000 pessoas conforme o porte populacional do município) para combater a sobrecarga assistencial e qualificar o cuidado.</li>
  <li><strong>Alternativa B (Correta):</strong> Sintetiza com exatidão os 6 componentes estruturantes da Portaria GM/MS nº 3.493/2024, destacando o retorno do componente fixo por equipe ponderado pelo IED, a substituição da capitação estática pelo Componente de Vínculo e Acompanhamento Territorial, a expansão do Componente de Qualidade para eSF, eAP, eSB e eMulti, e a retomada de um componente per capita de base populacional.</li>
  <li><strong>Alternativa C (Incorreta):</strong> O Componente de Qualidade abrange prioritariamente as eSF, além das eAP, eSB e eMulti.</li>
  <li><strong>Alternativa D (Incorreta):</strong> A equidade é o eixo central da Portaria nº 3.493/2024 por meio do <strong>Índice de Equidade e Dimensionamento (IED)</strong>, que classifica os municípios em 4 estratos combinando o Índice de Vulnerabilidade Social (IVS/IPEA) e o porte populacional, destinando valores maiores aos municípios mais vulneráveis (Estrato 1).</li>
</ul>

<h3>Síntese Executiva de Alta Retenção para Provas de Residência</h3>
<ul>
  <li><strong>Linha do Tempo Histórica:</strong> PACS (1991, foco na família, microárea e visita domiciliar pelo ACS) &rarr; PSF (1994, equipe mínima multiprofissional) &rarr; NOB 01/1996 (criação do PAB Fixo e Variável, grande expansão municipal) &rarr; PNAB 2006 (mudança de "Programa" para "Estratégia Saúde da Família" como modelo permanente ordenador da rede).</li>
  <li><strong>Atributos de Starfield:</strong> 4 Essenciais = <em>Acesso de Primeiro Contato, Longitudinalidade, Integralidade e Coordenação do Cuidado</em>. 3 Derivados = <em>Orientação Familiar, Orientação Comunitária e Competência Cultural</em>.</li>
  <li><strong>Parâmetros da PNAB 2017 e Portaria 3.493/2024:</strong> Microárea = até <strong>750 pessoas por ACS</strong> (cobertura de 100% da população na eSF). Área da eSF = 2.000 a 3.500 na PNAB 2017 (ajustada para parâmetro de 2.000 a 3.000 no componente de vínculo de 2024). Composição mínima da eSF: Médico + Enfermeiro + Técnico/Auxiliar de Enfermagem + ACS (40h semanais por categoria).</li>
  <li><strong>Escala de Risco Familiar de Coelho-Savassi:</strong> Peso 3 = Acamado, Deficiência física, Deficiência mental, Baixas condições de saneamento, Desnutrição grave, Relação morador/cômodo &gt; 1. Peso 2 = Drogadição, Desemprego, Analfabetismo, &lt; 6 meses, &gt; 70 anos, Relação morador/cômodo = 1. Peso 1 = HAS, DM. Classificação: 0–4 sem risco; 5–6 R1 (baixo); 7–8 R2 (médio); &ge; 9 R3 (máximo).</li>
  <li><strong>Atenção Domiciliar (Melhor em Casa):</strong> AD1 = responsabilidade da APS (eSF/eAP/eMulti), estáveis/visita mensal; AD2 = responsabilidade do SAD (EMAD/EMAP), cuidados intensivos semanais (ATB venoso, úlcera grau III/IV, pós-hospitalização); AD3 = SAD (EMAD/EMAP), critérios de AD2 + suporte ventilatório mecânico (VNI/VMI) ou procedimentos complexos contínuos.</li>
</ul>
`
  }
);

bookEsf.references = [
  {
    label: 'BRASIL. Ministério da Saúde. Portaria GM/MS nº 2.436, de 21 de setembro de 2017 (e Portaria de Consolidação nº 2, Anexo XXII). Aprova a Política Nacional de Atenção Básica (PNAB).',
    url: 'https://bvsms.saude.gov.br/bvs/saudelegis/gm/2017/prt2436_22_09_2017.html'
  },
  {
    label: 'BRASIL. Ministério da Saúde. Portaria GM/MS nº 3.493, de 10 de abril de 2024. Institui nova metodologia de cofinanciamento federal do Piso de Atenção Primária à Saúde no âmbito do SUS.',
    url: 'https://www.in.gov.br/en/web/dou/-/portaria-gm/ms-n-3.493-de-10-de-abril-de-2024-553573811'
  },
  {
    label: 'BRASIL. Ministério da Saúde. Portaria GM/MS nº 635, de 22 de maio de 2023. Institui, define e cria incentivo financeiro federal para as Equipes Multiprofissionais na Atenção Primária à Saúde (eMulti).',
    url: 'https://www.in.gov.br/en/web/dou/-/portaria-gm/ms-n-635-de-22-de-maio-de-2023-484773799'
  },
  {
    label: 'GUSSO, Gustavo; LOPES, José Mauro Ceratti; DIAS, Lêda Chaves (Org.). Tratado de Medicina de Família e Comunidade: Princípios, Formação e Prática. 2. ed. Porto Alegre: Artmed, 2019.',
    url: 'https://www.sbmfc.org.br/'
  },
  {
    label: 'STARFIELD, Barbara. Atenção Primária: equilíbrio entre necessidades de saúde, serviços e tecnologia. Brasília: UNESCO, Ministério da Saúde, 2002.',
    url: 'https://bvsms.saude.gov.br/bvs/publicacoes/atencao_primaria_p1.pdf'
  },
  {
    label: 'STEWART, Moira et al. Medicina Centrada na Pessoa: Transformando o Método Clínico. 3. ed. Porto Alegre: Artmed, 2017.',
    url: 'https://apsredes.org/'
  },
  {
    label: 'BRASIL. Ministério da Saúde. Cadernos de Atenção Básica, n. 28: Acolhimento à Demanda Espontânea. Brasília: Ministério da Saúde, 2013.',
    url: 'https://bvsms.saude.gov.br/bvs/publicacoes/acolhimento_demanda_espontanea_cab28v1.pdf'
  }
];

saveBook(bookEsf);

const bookPnab = {
  slug: 'politica-nacional-de-atencao-basica',
  title: 'Política Nacional de Atenção Básica',
  area: 'Medicina Preventiva',
  materia: 'Políticas de Saúde e APS',
  description: 'Análise normativa, histórica e operacional exaustiva da Política Nacional de Atenção Básica (PNAB — Portaria GM/MS nº 2.436/2017 e Portaria de Consolidação nº 2), comparativo entre PNAB 2006, 2011 e 2017, atribuições profissionais, modalidades de equipes (eSF, eAP, eSB, eCR, eSFR, eSFF, eMulti) e novo cofinanciamento federal (Portaria GM/MS nº 3.493/2024).',
  sections: [
    {
      id: 'trajetoria-normativa-pnab-2006-2011-2017-2024',
      title: '1. Trajetória Histórica e Normativa das Edições da PNAB (2006, 2011 e 2017) e Marcos Recentes',
      body_html: `
<h3>A Institucionalização da Política Nacional de Atenção Básica no SUS</h3>
<p>A regulamentação normativa da Atenção Básica no Brasil reflete as disputas políticas, financeiras e organizacionais travadas nas Comissões Intergestores (CIT e CIB) entre o Ministério da Saúde, o Conselho Nacional de Secretários de Saúde (CONASS) e o Conselho Nacional de Secretarias Municipais de Saúde (CONASEMS). Antes de 2006, as regras de funcionamento do Programa de Agentes Comunitários de Saúde (PACS) e do Programa de Saúde da Família (PSF) encontravam-se dispersas em dezenas de portarias ministeriais fragmentadas e nas Normas Operacionais Básicas (NOB 01/93 e NOB 01/96). A publicação da primeira <strong>Política Nacional de Atenção Básica (PNAB)</strong> ocorreu em 2006, por meio da <strong>Portaria GM/MS nº 648/2006</strong>, integrando o arcabouço do Pacto pela Saúde (Pacto pela Vida, em Defesa do SUS e de Gestão). Essa primeira edição unificou as regras nacionais, oficializou a equivalência conceitual entre "Atenção Básica" e "Atenção Primária à Saúde" (preferindo o termo Atenção Básica como marca política brasileira de defesa de um sistema público universal, em oposição às propostas internacionais de "APS seletiva" de cesta mínima do Banco Mundial) e transformou o antigo PSF em Estratégia Saúde da Família (ESF).</p>

<h3>A Segunda Edição da PNAB (Portaria GM/MS nº 2.488/2011)</h3>
<p>Em outubro de 2011, em consonância com o Decreto nº 7.508/2011 e com a organização das Redes de Atenção à Saúde (Portaria nº 4.279/2010), o Ministério da Saúde editou a segunda versão da PNAB (<strong>Portaria GM/MS nº 2.488/2011</strong>). Seus principais avanços consistiram na flexibilização da carga horária especificamente para a categoria médica dentro das Equipes de Saúde da Família (permitindo composições de 20h ou 30h médicas para enfrentar a escassez de médicos no interior e nas periferias, enquanto mantinha 40h obrigatórias para enfermeiros, técnicos e ACS), na criação e expansão de modalidades voltadas à equidade (Consultórios na Rua, Equipes de Saúde da Família Ribeirinhas e Unidades Básicas de Saúde Fluviais), na incorporação do Programa Saúde na Escola (PSE) e no lançamento do <strong>Programa Nacional de Melhoria do Acesso e da Qualidade da Atenção Básica (PMAQ-AB)</strong> e do programa de infraestrutura <strong>Requalifica UBS</strong>.</p>

<h3>A Terceira Edição da PNAB (Portaria GM/MS nº 2.436/2017 — Portaria de Consolidação nº 2, Anexo XXII)</h3>
<p>Em 21 de setembro de 2017, foi aprovada a terceira e atual edição da Política Nacional de Atenção Básica por meio da <strong>Portaria GM/MS nº 2.436/2017</strong>, cujo texto integral foi imediatamente incorporado ao <strong>Anexo XXII da Portaria de Consolidação GM/MS nº 2, de 28 de setembro de 2017</strong>. A PNAB 2017 promoveu profundas inflexões normativas que constituem o núcleo central das questões de Medicina Preventiva em todas as bancas examinadoras do país:</p>
<ul>
  <li><strong>Equivalência Terminológica Explícita:</strong> O Art. 2º, § 1º da PNAB 2017 declara textualmente que os termos <em>"Atenção Básica (AB)"</em> e <em>"Atenção Primária à Saúde (APS)"</em> são considerados <strong>termos equivalentes</strong> nas diretrizes atuais, associando a ambos os princípios e diretrizes da política.</li>
  <li><strong>Reconhecimento Financeiro das Equipes de Atenção Básica (eAB), posteriormente denominadas Equipes de Atenção Primária (eAP):</strong> Enquanto as edições de 2006 e 2011 direcionavam o financiamento federal prioritariamente para a ESF, a PNAB 2017 (complementada pela Portaria nº 2.539/2019) institucionalizou o repasse federal para equipes compostas apenas por médico e enfermeiro (sem obrigatoriedade de ACS) e com cargas horárias de 20h ou 30h semanais, mantendo, contudo, a afirmação textual de que a <strong>Estratégia Saúde da Família (eSF) permanece como a estratégia prioritária</strong> para expansão e consolidação da Atenção Básica.</li>
  <li><strong>Flexibilização do Número de ACS por Equipe e Ampliação de Atribuições Clínicas:</strong> Na PNAB 2011, exigia-se um mínimo de 4 ACS por equipe (ou cobertura de 100% com teto de 750 pessoas por ACS e máximo de 12 ACS por equipe). Na PNAB 2017, suprimiu-se o número mínimo fixo de 4 ACS no texto da portaria, estabelecendo que nas eSF o número de ACS por equipe deverá ser definido de acordo com base populacional, critérios demográficos, epidemiológicos e socioeconômicos, de acordo com legislação vigente, cobrindo 100% da população cadastrada com máximo de 750 pessoas por ACS; e ampliou-se o escopo do ACS (em consonância com a Lei nº 13.595/2018) para aferir PA, glicemia capilar, temperatura axilar e antropometria no domicílio quando possuir formação técnica ou capacitação específica.</li>
  <li><strong>Integração Territorial entre ACS e ACE:</strong> A PNAB 2017 tornou obrigatória a unificação territorial e a integração do processo de trabalho entre os Agentes Comunitários de Saúde (ACS) e os Agentes de Combate às Endemias (ACE).</li>
  <li><strong>Figura do Gerente de Atenção Básica:</strong> Recomendou a inclusão de um profissional específico de nível superior para exercer a função de <strong>Gerente de UBS</strong> (com carga horária de 40h semanais, vedado ser integrante de equipe assistencial vinculada àquela UBS), visando qualificar a gestão administrativa, de insumos e de fluxos sem sobrecarregar o enfermeiro da eSF.</li>
</ul>

<table class="book-table">
  <thead>
    <tr>
      <th>Eixo Comparativo</th>
      <th>PNAB 2006 (Portaria nº 648/2006)</th>
      <th>PNAB 2011 (Portaria nº 2.488/2011)</th>
      <th>PNAB 2017 (Portaria nº 2.436/2017) e Atualizações (2019–2024)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>População Adscrita por eSF</strong></td>
      <td>Máximo de 4.000 pessoas por equipe, sendo a média recomendada de 3.000 pessoas.</td>
      <td>Máximo de 4.000 pessoas por equipe, sendo a média recomendada de 3.000 pessoas (menor conforme vulnerabilidade).</td>
      <td>PNAB 2017: <strong>2.000 a 3.500 pessoas por eSF</strong>. Portaria GM/MS nº 3.493/2024: parâmetro de cadastro por porte municipal situado entre 2.000 e 3.000 pessoas por eSF.</td>
    </tr>
    <tr>
      <td><strong>População por Microárea (ACS)</strong></td>
      <td>Máximo de 750 pessoas por ACS (até 12 ACS por equipe).</td>
      <td>Máximo de 750 pessoas por ACS (até 12 ACS por equipe), cobrindo 100% da população cadastrada.</td>
      <td>Máximo de <strong>750 pessoas por ACS</strong>, cobrindo 100% da população cadastrada na eSF (sem fixar no texto da portaria o teto antigo de 12 ACS).</td>
    </tr>
    <tr>
      <td><strong>Carga Horária na eSF</strong></td>
      <td>40 horas semanais obrigatórias e exclusivas para cada profissional individual da eSF.</td>
      <td>40h semanais para enfermeiro, técnico e ACS; flexibilizou apenas o médico em múltiplas modalidades (20h, 30h ou 40h).</td>
      <td><strong>40 horas semanais para todas as categorias na eSF</strong>, permitindo até 3 profissionais por categoria (mínimo de 20h semanais cada) para somar as 40h na equipe.</td>
    </tr>
    <tr>
      <td><strong>Equipes de Atenção Primária (eAP / antiga eAB)</strong></td>
      <td>Não contavam com financiamento específico equiparado no PAB Variável de equipes.</td>
      <td>Reconhecidas apenas de forma transitória para adesão ao PMAQ-AB.</td>
      <td>Institucionalizadas com financiamento federal próprio: Modalidade I (20h semanais — médico e enfermeiro) e Modalidade II (30h semanais — médico e enfermeiro).</td>
    </tr>
    <tr>
      <td><strong>Apoio Multiprofissional</strong></td>
      <td>Surge em 2008 com a criação dos NASF (Modalidades 1 e 2).</td>
      <td>NASF 1, 2 e 3 (criado em 2012 para universalizar a adesão de municípios pequenos).</td>
      <td>PNAB 2017 renomeou para <strong>NASF-AB</strong>; Previne Brasil (2019) extinguiu o custeio federal específico; <strong>Portaria nº 635/2023 criou as eMulti</strong> (Ampliada, Complementar e Estratégica).</td>
    </tr>
    <tr>
      <td><strong>Padrões de Oferta de Serviços</strong></td>
      <td>Ações programáticas definidas por áreas estratégicas nacionais (hanseníase, TB, HAS, DM, criança, mulher, idoso).</td>
      <td>Ampliação da carteira assistencial e avaliação externa pelo PMAQ-AB.</td>
      <td>Divisão explícita na PNAB 2017 em <strong>Padrões Essenciais</strong> (ações básicas obrigatórias em todo o país) e <strong>Padrões Ampliados</strong> (ações estratégicas adicionais conforme realidade local), consolidados na CaSAPS.</td>
    </tr>
  </tbody>
</table>
`
    },
    {
      id: 'principios-diretrizes-aps-pnab',
      title: '2. Conceito, Princípios e Diretrizes da Atenção Básica segundo a PNAB 2017',
      body_html: `
<h3>A Definição Legal de Atenção Básica no Artigo 2º da PNAB 2017</h3>
<p>De acordo com o Art. 2º da Portaria GM/MS nº 2.436/2017, a <strong>Atenção Básica é o conjunto de ações de saúde individuais, familiares e coletivas que envolvem promoção, prevenção, proteção, diagnóstico, tratamento, reabilitação, redução de danos, cuidados paliativos e vigilância em saúde</strong>, desenvolvida por meio de práticas de cuidado integrado e gestão qualificada, realizada com equipe multiprofissional e dirigida à população em território definido, sobre as quais as equipes assumem responsabilidade sanitária. Observe com atenção redobrada que a PNAB 2017 incluiu expressamente no conceito oficial de Atenção Básica duas práticas que não constavam com esse destaque na redação original de 2006: a <strong>redução de danos</strong> e os <strong>cuidados paliativos</strong>, além da integração orgânica com a <strong>vigilância em saúde</strong>.</p>
<p>A Atenção Básica é definida como a <strong>principal porta de entrada</strong> do Sistema Único de Saúde e o <strong>centro de comunicação das Redes de Atenção à Saúde (RAS)</strong>, desempenhando o papel de <strong>coordenadora do cuidado e ordenadora das ações e serviços</strong> disponibilizados na rede. Além disso, o Art. 2º, § 3º estabelece uma garantia fundamental frequentemente cobrada em provas: <strong>é proibida qualquer exclusão baseada em idade, gênero, raça/cor, etnia, crença, condição socioeconômica, orientação sexual, identidade de gênero, estado de saúde ou qualquer outra característica</strong>.</p>

<h3>Tríade de Princípios e Nove Diretrizes Operacionais da PNAB 2017</h3>
<p>Uma armadilha recorrente nas provas de residência médica consiste em trocar a lista de <strong>Princípios</strong> pela lista de <strong>Diretrizes</strong> do Anexo XXII da Portaria de Consolidação nº 2 (PNAB 2017). A sistematização normativa exata da PNAB 2017 divide-os da seguinte maneira:</p>

<h4>Os 3 Princípios da Atenção Básica na PNAB 2017</h4>
<ul>
  <li><strong>1. Universalidade:</strong> Possibilitar o acesso universal e contínuo a serviços de saúde de qualidade e resolutivos, caracterizados como a porta de entrada aberta e preferencial da RAS, acolhendo as pessoas e promovendo a vinculação e corresponsabilização pela atenção às suas necessidades de saúde.</li>
  <li><strong>2. Equidade:</strong> Ofertar o cuidado reconhecendo as diferenças nas condições de vida e saúde e de acordo com as necessidades das pessoas, considerando que o direito à saúde passa pelas diferenciações sociais e deve atender à diversidade. Na prática, significa tratar de forma diferenciada os desiguais (investindo mais tempo, visitas domiciliares e equipes específicas onde a vulnerabilidade é maior), proibindo qualquer discriminação negativa.</li>
  <li><strong>3. Integralidade:</strong> É o conjunto de serviços executados pela equipe de saúde que atendam às necessidades da população adscrita nos campos do cuidado, da promoção e manutenção da saúde, da prevenção de doenças e agravos, da cura, da reabilitação, redução de danos e dos cuidados paliativos. Inclui a responsabilização pela oferta de serviços em outros pontos de atenção da rede e o reconhecimento adequado dos problemas biológicos, psicológicos e sociais que causam as doenças.</li>
</ul>

<h4>As 9 Diretrizes da Atenção Básica na PNAB 2017</h4>
<ol>
  <li><strong>Regionalização e Hierarquização:</strong> Considera a Atenção Básica como ponto de comunicação entre os pontos de atenção da RAS, distribuídos espacialmente para garantir alimentação ótima de fluxos e escala.</li>
  <li><strong>Territorialização e Adstrição:</strong> De forma a permitir o planejamento, a programação descentralizada e o desenvolvimento de ações setoriais e intersetoriais com foco em um território específico, com população adscrita que estimule o vínculo.</li>
  <li><strong>População Adscrita:</strong> População que está presente no território da UBS, de forma a estimular o desenvolvimento de relações de vínculo e responsabilização entre as equipes e a população, garantindo a continuidade das ações de saúde e a longitudinalidade do cuidado.</li>
  <li><strong>Cuidado Centrado na Pessoa:</strong> Aponta para o desenvolvimento de ações de cuidado de forma singularizada, que auxilie as pessoas a desenvolverem os conhecimentos, aptidões, competências e a confiança necessária para gerir e tomar decisões embasadas sobre sua própria saúde (autonomia e autocuidado apoiado).</li>
  <li><strong>Resolutividade:</strong> Reforça a importância de a Atenção Básica ser resolutiva, utilizando e articulando diferentes tecnologias de cuidado individual e coletivo, por meio de uma clínica ampliada capaz de construir vínculos positivos e intervenções clínica e sanitariamente efetivas, resolvendo a grande maioria (cerca de 85% a 90%) dos problemas de saúde no próprio nível primário.</li>
  <li><strong>Longitudinalidade do Cuidado:</strong> Pressupõe a continuidade da relação de cuidado, com construção de vínculo e responsabilização entre profissionais e usuários ao longo do tempo e de modo permanente e consistente, acompanhando os efeitos das intervenções em saúde e de outros elementos na vida das pessoas.</li>
  <li><strong>Coordenação do Cuidado:</strong> Elaborar, acompanhar e organizar o fluxo dos usuários entre os pontos de atenção das RAS. Atuando como o centro de comunicação entre os diversos pontos de atenção, responsabilizando-se pelo cuidado dos usuários em qualquer destes pontos através de uma relação horizontal, contínua e integrada.</li>
  <li><strong>Ordenação da Rede:</strong> Reconhecer as necessidades de saúde da população sob sua responsabilidade, organizando as necessidades desta população em relação aos outros pontos de atenção à saúde, contribuindo para que a programação dos serviços de saúde (como a oferta de consultas especializadas e exames na atenção secundária) parta das necessidades reais identificadas na Atenção Básica.</li>
  <li><strong>Participação da Comunidade:</strong> Estimular a participação das pessoas, a orientação comunitária das ações de saúde na Atenção Básica e a competência cultural no cuidado, como forma de ampliar sua autonomia e capacidade na construção do cuidado à sua saúde e das pessoas e coletividades do território.</li>
</ol>
`
    },
    {
      id: 'responsabilidades-tripartites-uniao-estados-municipios',
      title: '3. Responsabilidades Comuns e Específicas das Três Esferas de Gestão na PNAB',
      body_html: `
<h3>A Governança Federativa Tripartite da Atenção Básica</h3>
<p>No pacto federativo do Sistema Único de Saúde, a execução direta dos serviços de Atenção Básica é municipalizada (e distrital, no caso do Distrito Federal), mas o financiamento, a normatização, o apoio institucional, a educação permanente e o monitoramento são responsabilidades solidárias das três esferas de governo (União, Estados/DF e Municípios). As bancas examinadoras costumam cobrar a distinção precisa entre o que é <strong>responsabilidade comum a todas as esferas</strong> e o que compete especificamente ao Ministério da Saúde, às Secretarias Estaduais de Saúde (SES) e às Secretarias Municipais de Saúde (SMS).</p>

<h3>Responsabilidades Comuns a Todas as Esferas de Governo (União, Estados, DF e Municípios)</h3>
<ul>
  <li>Contribuir para a reorientação do modelo de atenção e de gestão com base nos princípios e diretrizes contidos na PNAB;</li>
  <li>Apoiar e estimular a adoção da <strong>Estratégia Saúde da Família (ESF)</strong> como estratégia prioritária de expansão, consolidação e qualificação da Atenção Básica;</li>
  <li>Garantir a infraestrutura necessária ao funcionamento das UBS, dotando-as de recursos materiais, equipamentos e insumos suficientes para o conjunto de ações propostas;</li>
  <li>Contribuir com o <strong>financiamento tripartite</strong> para fortalecimento da Atenção Básica;</li>
  <li>Estabelecer, nos respectivos Planos Municipais, Estaduais e Nacional de Saúde, prioridades, estratégias e metas para a organização da Atenção Básica;</li>
  <li>Desenvolver mecanismos técnicos e estratégias organizacionais de qualificação da força de trabalho para gestão e atenção à saúde, estimulando a Educação Permanente em Saúde;</li>
  <li>Garantir formas institucionais de participação social e controle social;</li>
  <li>Divulgar as informações e os resultados alcançados pelas equipes da Atenção Básica, fomentando a transparência ativa.</li>
</ul>

<table class="book-table">
  <thead>
    <tr>
      <th>Esfera de Gestão</th>
      <th>Competências e Responsabilidades Específicas na PNAB 2017</th>
      <th>Pegadinha Clássica de Prova</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Ministério da Saúde (União)</strong></td>
      <td>• Definir e rever periodicamente, de forma pactuada na <strong>CIT (Comissão Intergestores Tripartite)</strong>, as diretrizes da PNAB;<br>• Garantir fontes de recursos federais para compor o financiamento da Atenção Básica e transferir de forma regular e automática (fundo a fundo) os incentivos do Bloco de Manutenção;<br>• Definir os parâmetros nacionais do Sistema de Informação em Saúde para a Atenção Básica (SISAB / e-SUS APS);<br>• Apoiar a articulação de instituições em parceria com as Secretarias Estaduais e Municipais para formação e garantia de educação permanente.</td>
      <td>O Ministério da Saúde <strong>não</strong> contrata diretamente os ACS nem gerencia a escala diária das UBS municipais; seu papel é normativo nacional (via CIT) e indutor financeiro/técnico.</td>
    </tr>
    <tr>
      <td><strong>Secretarias Estaduais de Saúde (Estados e DF)</strong></td>
      <td>• Pactuar na <strong>CIB (Comissão Intergestores Bipartite)</strong> estratégias, diretrizes e normas de implementação da Atenção Básica no estado, respeitadas as normas nacionais;<br>• Destinar recursos estaduais para compor o financiamento tripartite da Atenção Básica, prevendo cofinanciamento estadual regular;<br>• <strong>Prestar apoio institucional aos municípios</strong> no processo de implantação, acompanhamento e qualificação da Atenção Básica e de ampliação e consolidação da ESF;<br>• Analisar os dados de interesse estadual gerados pelos sistemas de informação, divulgando resultados e corrigindo distorções;<br>• Assumir transitoriamente a execução apenas em situações extraordinárias pactuadas na CIB (ou no caso específico do Distrito Federal, que acumula competências estaduais e municipais).</td>
      <td>As bancas tentam afirmar que "o Estado não tem responsabilidade financeira nem técnica sobre a Atenção Básica por ser esta municipalizada". Falso! O cofinanciamento é <strong>tripartite</strong> (inclui o Estado) e cabe à SES o apoio institucional e a coordenação regional via CIB/CIR.</td>
    </tr>
    <tr>
      <td><strong>Secretarias Municipais de Saúde (Municípios)</strong></td>
      <td>• <strong>Organizar, executar e gerenciar os serviços e ações de Atenção Básica, de forma universal, dentro do seu território</strong>, incluindo as unidades próprias e as cedidas pelo estado e pela União;<br>• Programar as ações da Atenção Básica a partir de sua base territorial de acordo com as necessidades de saúde identificadas;<br>• Organizar o fluxo de pessoas visando à garantia das referências a serviços e ações de saúde fora do âmbito da Atenção Básica;<br>• Manter atualizado mensalmente o <strong>cadastramento no SCNES</strong> (Sistema de Cadastro Nacional de Estabelecimentos de Saúde) dos profissionais, cargas horárias e equipes;<br>• <strong>Selecionar, contratar e remunerar os profissionais</strong> que compõem as equipes multiprofissionais da Atenção Básica em conformidade com a legislação vigente;<br>• Garantir recursos materiais, equipamentos e insumos (incluindo medicamentos básicos e vacinas) nas UBS;<br>• Alimentar e analisar regularmente a base de dados do SISAB / e-SUS APS.</td>
      <td>É competência exclusiva do gestor <strong>municipal</strong> (e distrital) a execução direta das ações, a contratação/remuneração da força de trabalho, a definição das microáreas no território e a alimentação mensal do SCNES e do SISAB.</td>
    </tr>
  </tbody>
</table>
`
    },
    {
      id: 'infraestrutura-ambiencia-funcionamento-ubs',
      title: '4. Infraestrutura, Ambiência, Funcionamento das UBS, Padrões de Serviços e Saúde na Hora',
      body_html: `
<h3>A Unidade Básica de Saúde (UBS) e o Conceito de Ambiência</h3>
<p>Na arquitetura da PNAB 2017, toda Unidade Básica de Saúde (UBS) é considerada um estabelecimento público de saúde destinado à prestação de ações e serviços de Atenção Básica, independentemente de abrigar Equipes de Saúde da Família (eSF) ou Equipes de Atenção Primária (eAP). A PNAB enfatiza que os municípios não devem criar diferenciação pejorativa entre "Posto de Saúde", "Centro de Saúde" ou "Unidade de Saúde da Família", unificando a identidade visual e assistencial sob a denominação de <strong>Unidade Básica de Saúde (UBS)</strong>.</p>
<p>A infraestrutura física das UBS deve respeitar as normas sanitárias da ANVISA (RDC nº 50/2002 e atualizações), as normas de acessibilidade para pessoas com deficiência ou mobilidade reduzida (ABNT NBR 9050) e a diretriz da <strong>Ambiência</strong> da Política Nacional de Humanização: espaços físicos iluminados, ventilados, com conforto térmico e acústico, garantia de privacidade visual e auditiva nos consultórios e salas de acolhimento, sinalização clara e espaços para atividades coletivas. Uma UBS padrão deve dispor minimamente de: recepção sem grades ou vidros que impeçam o contato humano; sala de espera acolhedora; sala de acolhimento à demanda espontânea; consultórios médicos e de enfermagem (com sanitário anexo para exames ginecológicos/pré-natal); consultório odontológico equipado; sala de vacinas (com rede de frio monitorada); sala de procedimentos/coleta; sala de curativos; sala de nebulização/observação; farmácia/dispensação de medicamentos; central de material esterilizado simplificada (expurgo e esterilização); sala de reunião de equipe e dos ACS/ACE; copa e sanitários acessíveis para usuários e funcionários.</p>

<h3>Regras de Horário de Funcionamento da UBS e o Programa Saúde na Hora</h3>
<p>De acordo com a PNAB 2017, recomenda-se que as Unidades Básicas de Saúde tenham seu funcionamento com carga horária mínima de <strong>40 horas semanais</strong>, no mínimo <strong>5 dias da semana</strong> e nos <strong>12 meses do ano</strong>, possibilitando acesso facilitado à população. Para evitar a barreira clássica do "fechamento para horário de almoço" (quando justamente muitos trabalhadores teriam disponibilidade para procurar a unidade), orienta-se que a UBS permaneça aberta de forma ininterrupta durante os turnos matutino e vespertino, podendo pactuar horários alternativos (noturnos ou finais de semana) conforme a necessidade da população adscrita.</p>
<p>Para incentivar financeiramente a ampliação do horário de funcionamento das UBS em municípios de médio e grande porte, o Ministério da Saúde instituiu o programa <strong>Saúde na Hora</strong> (atualmente consolidado nas normativas da APS e mantido nos incentivos da Portaria nº 3.493/2024), que prevê formatos operacionais de horário estendido sem fechar no horário de almoço:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Formato do Programa Saúde na Hora</th>
      <th>Horário Mínimo de Funcionamento Semanal</th>
      <th>Regras Operacionais de Dias da Semana</th>
      <th>Número Mínimo de Equipes na UBS</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>UBS 60 Horas Simplificado</strong></td>
      <td>Mínimo de 60 horas semanais ininterruptas</td>
      <td>12 horas diárias de segunda a sexta-feira (ex.: das 07h às 19h ou das 08h às 20h), ou 11h diárias de segunda a sexta + 5h no sábado/domingo.</td>
      <td>Mínimo de 2 equipes (eSF ou eAP, totalizando no mínimo 60h de cobertura médica e de enfermagem).</td>
    </tr>
    <tr>
      <td><strong>UBS 60 Horas</strong></td>
      <td>Mínimo de 60 horas semanais ininterruptas</td>
      <td>12 horas diárias de segunda a sexta-feira (ou 11h de segunda a sexta + 5h no fim de semana), sem fechar no intervalo de almoço.</td>
      <td>Mínimo de 3 Equipes de Saúde da Família (eSF), podendo contar com Equipes de Saúde Bucal (eSB).</td>
    </tr>
    <tr>
      <td><strong>UBS 60 Horas com Saúde Bucal</strong></td>
      <td>Mínimo de 60 horas semanais ininterruptas</td>
      <td>Mesma regra de 60h semanais, garantindo oferta contínua de atendimento odontológico em todos os turnos.</td>
      <td>Mínimo de 3 eSF + mínimo de 2 Equipes de Saúde Bucal (eSB).</td>
    </tr>
    <tr>
      <td><strong>UBS 75 Horas com Saúde Bucal</strong></td>
      <td>Mínimo de 75 horas semanais ininterruptas</td>
      <td>15 horas diárias de segunda a sexta-feira (ex.: das 07h às 22h) ou 14h diárias de segunda a sexta + 5h no sábado/domingo.</td>
      <td>Mínimo de 6 Equipes de Saúde da Família (eSF) + mínimo de 3 Equipes de Saúde Bucal (eSB).</td>
    </tr>
  </tbody>
</table>

<h3>Padrões Essenciais versus Padrões Ampliados na PNAB 2017</h3>
<p>A PNAB 2017 organizou a oferta nacional de ações e serviços da Atenção Básica em dois níveis de padrões de qualidade e escopo:</p>
<ul>
  <li><strong>Padrões Essenciais:</strong> Correspondem às ações e procedimentos básicos relacionados a condições básicas/essenciais de acesso e qualidade na Atenção Básica, cuja oferta deve ser <strong>obrigatoriamente garantida em todas as Unidades Básicas de Saúde do país</strong>, assegurando equidade nacional (consultas médicas, de enfermagem e odontológicas, pré-natal, puericultura, vacinação de rotina, testes rápidos de HIV/sífilis/hepatites/gravidez, curativos, dispensação de medicamentos essenciais, manejo de hipertensão, diabetes, tuberculose e hanseníase, coleta de citopatológico do colo uterino).</li>
  <li><strong>Padrões Ampliados:</strong> Correspondem a ações e procedimentos estratégicos adicionais que permitem alcançar elevados padrões de acesso e qualidade na Atenção Básica, considerando as especificidades locais, indicadores epidemiológicos e capacidade instalada (pequenas cirurgias ambulatoriais avançadas, inserção de DIU, Práticas Integrativas e Complementares, teleinterconsultas especializadas, dispensação de psicotrópicos e insulinas especiais, reabilitação multiprofissional).</li>
</ul>
`
    },
    {
      id: 'tipologias-equipes-esf-eap-esb-emulti',
      title: '5. Tipologias de Equipes na PNAB: eSF, eAP, eSB e o Gerente de Atenção Básica',
      body_html: `
<h3>Distinção Normativa entre Equipe de Saúde da Família (eSF) e Equipe de Atenção Primária (eAP)</h3>
<p>Um dos pontos mais exigidos em provas de residência médica após a publicação da PNAB 2017 e da Portaria nº 2.539/2019 (que instituiu as Equipes de Atenção Primária — eAP em substituição à sigla eAB) é a comparação detalhada entre a composição, a carga horária e o parâmetro populacional da <strong>eSF</strong> e da <strong>eAP</strong>:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Critério Normativo</th>
      <th>Equipe de Saúde da Família (eSF)</th>
      <th>Equipe de Atenção Primária (eAP) — Modalidade I</th>
      <th>Equipe de Atenção Primária (eAP) — Modalidade II</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Status Estratégico na PNAB</strong></td>
      <td><strong>Estratégia prioritária</strong> para expansão, consolidação e qualificação da Atenção Básica no SUS.</td>
      <td>Modalidade complementar/alternativa, que deve modelar-se progressivamente para tornar-se eSF.</td>
      <td>Modalidade complementar/alternativa, com carga horária intermediária.</td>
    </tr>
    <tr>
      <td><strong>Composição Mínima Obrigatória</strong></td>
      <td>1 Médico + 1 Enfermeiro + 1 Técnico/Auxiliar de Enfermagem + Agentes Comunitários de Saúde (ACS).</td>
      <td>Apenas <strong>Médico e Enfermeiro</strong> (preferencialmente especialistas em MFC / Saúde da Família).</td>
      <td>Apenas <strong>Médico e Enfermeiro</strong> (preferencialmente especialistas em MFC / Saúde da Família).</td>
    </tr>
    <tr>
      <td><strong>Presença de Técnico de Enfermagem e ACS</strong></td>
      <td><strong>Obrigatória</strong> (com cobertura de 100% da população cadastrada da equipe por ACS).</td>
      <td>Facultativa (podem ser agregados auxiliar/técnico de enfermagem e ACS, mas não são obrigatórios na composição mínima).</td>
      <td>Facultativa.</td>
    </tr>
    <tr>
      <td><strong>Carga Horária Mínima Semanal por Categoria</strong></td>
      <td><strong>40 horas semanais</strong> para todas as categorias (médico, enfermeiro, técnico e ACS).</td>
      <td><strong>20 horas semanais</strong> para o médico e <strong>20 horas semanais</strong> para o enfermeiro.</td>
      <td><strong>30 horas semanais</strong> para o médico e <strong>30 horas semanais</strong> para o enfermeiro.</td>
    </tr>
    <tr>
      <td><strong>Fracionamento de Profissionais por Categoria</strong></td>
      <td>Permitido até 3 profissionais por categoria, com carga horária mínima individual de 20h semanais (somando 40h na equipe).</td>
      <td>Carga horária mínima individual de 20h semanais por profissional.</td>
      <td>Carga horária mínima individual de 20h ou 30h semanais (somando no mínimo 30h por categoria).</td>
    </tr>
    <tr>
      <td><strong>Parâmetro Populacional de Adscrição</strong></td>
      <td>100% do parâmetro de referência de uma eSF (2.000 a 3.500 na PNAB 2017; 2.000 a 3.000 na Portaria nº 3.493/2024 conforme porte municipal).</td>
      <td><strong>50% (metade)</strong> da população adscrita preconizada para uma eSF no mesmo município.</td>
      <td><strong>75% (três quartos)</strong> da população adscrita preconizada para uma eSF no mesmo município.</td>
    </tr>
  </tbody>
</table>

<h3>Equipes de Saúde Bucal (eSB) e a Lei Federal nº 14.572/2023 (Brasil Sorridente no SUS)</h3>
<p>As <strong>Equipes de Saúde Bucal (eSB)</strong> atuam vinculadas às eSF ou às eAP para garantir atenção odontológica integral (promoção, prevenção com fluoretação e escovação supervisionada, restaurações, exodontias, endodontia básica, diagnóstico precoce de câncer de boca e reabilitação protética). Em maio de 2023, a sanção da <strong>Lei Federal nº 14.572/2023</strong> alterou a Lei Orgânica da Saúde (Lei nº 8.080/1990) para incluir a <strong>Política Nacional de Saúde Bucal (Brasil Sorridente)</strong> como política permanente de Estado no âmbito do SUS, impedindo sua interrupção por governos futuros. Na PNAB, as eSB de 40 horas semanais dividem-se em duas modalidades clássicas:</p>
<ul>
  <li><strong>eSB Modalidade I:</strong> Composta por 1 Cirurgião-Dentista + 1 Técnico em Saúde Bucal (TSB) <strong>OU</strong> 1 Auxiliar em Saúde Bucal (ASB).</li>
  <li><strong>eSB Modalidade II:</strong> Composta por 1 Cirurgião-Dentista + 1 Técnico em Saúde Bucal (TSB) <strong>E</strong> 1 Auxiliar em Saúde Bucal (ASB) (ou outro TSB). A presença obrigatória do TSB na Modalidade II permite ampliar a produtividade clínica com ações diretas na cavidade bucal sob supervisão do dentista (profilaxia, inserção e condensação de substâncias restauradoras, tomada radiográfica, remoção de sutura).</li>
  <li>Além das modalidades de 40h, o Ministério da Saúde também credencia eSB com cargas horárias de <strong>20 horas ou 30 horas semanais</strong> para vinculação proporcional às Equipes de Atenção Primária (eAP).</li>
</ul>

<h3>O Gerente de Atenção Básica na PNAB 2017</h3>
<p>A PNAB 2017 instituiu formalmente a recomendação e o incentivo financeiro para o <strong>Gerente de Atenção Básica (Gerente de UBS)</strong>, com o objetivo de aprimorar e qualificar o processo de trabalho administrativo e gerencial das Unidades Básicas de Saúde, fortalecendo a atenção à saúde prestada pelos profissionais das equipes. As regras normativas para o Gerente de UBS exigem:</p>
<ul>
  <li>Ser um profissional qualificado, obrigatoriamente com <strong>nível superior</strong> (preferencialmente com experiência na Atenção Básica e formação em gestão em saúde);</li>
  <li>Cumprir carga horária de <strong>40 horas semanais</strong> dedicadas exclusivamente à gestão da UBS;</li>
  <li><strong>Não fazer parte de nenhuma equipe vinculada à UBS</strong> que gerencia (isto é, o enfermeiro ou o médico de uma eSF daquela unidade não pode acumular o cadastro de Gerente de Atenção Básica da mesma unidade, pois o propósito do cargo é justamente liberar o enfermeiro e o médico para o cuidado clínico e territorial).</li>
</ul>
`
    },
    {
      id: 'populacoes-especificas-ecr-esfr-esff-eapp',
      title: '6. Equipes para Populações Específicas: Consultório na Rua (eCR), Ribeirinhas (eSFR), Fluviais (eSFF) e Prisionais (eAPP)',
      body_html: `
<h3>A Equidade Operacionalizada: Equipes Específicas na PNAB</h3>
<p>Para materializar o princípio da <strong>Equidade</strong> e evitar que barreiras geográficas extremas ou condições de exclusão social impeçam o acesso universal à Atenção Primária, a PNAB regulamenta quatro arranjos organizacionais desenhados sob medida para populações específicas:</p>

<h4>1. Equipes de Consultório na Rua (eCR)</h4>
<p>As <strong>Equipes de Consultório na Rua (eCR)</strong> integram o componente Atenção Básica da Rede de Atenção Psicossocial (RAPS) e têm como finalidade exclusiva ampliar o acesso da <strong>população em situação de rua</strong> aos serviços de saúde, ofertando de maneira oportuna atenção integral à saúde para esse grupo populacional que se encontra em condições de vulnerabilidade e com os vínculos familiares interrompidos ou fragilizados. As eCR desempenham suas atividades <em>in loco</em>, de forma itinerante (utilizando veículos adaptados), desenvolvendo ações compartilhadas e integradas às UBS do território, aos CAPS, aos serviços de Urgência e Emergência e aos equipamentos do SUAS (Centro POP, albergues e abrigos).</p>
<p>A carga horária das eCR é de no mínimo <strong>30 horas semanais</strong> (podendo ser 40h), em horário diurno e/ou noturno em todos os dias da semana conforme a dinâmica da população em situação de rua local. As categorias profissionais que podem compor as eCR (agrupadas em <strong>Modalidade I</strong> com 4 profissionais — 2 de nível superior e 2 de nível médio; <strong>Modalidade II</strong> com 6 profissionais — 3 de nível superior e 3 de nível médio; e <strong>Modalidade III</strong>, que é a Modalidade II acrescida obrigatoriamente de um <strong>profissional médico</strong>) incluem: enfermeiro, psicólogo, assistente social, terapeuta ocupacional, médico, cirurgião-dentista, profissional/professor de educação física, farmacêutico, técnico/auxiliar de enfermagem, técnico/auxiliar de saúde bucal, agente social e arte-educador. Uma diretriz ética e legal inegociável no atendimento à população em situação de rua (Portaria GM/MS nº 940/2011) é que <strong>nenhum cidadão pode ter seu atendimento ou cadastramento negado na UBS ou no Consultório na Rua por ausência de comprovante de residência fixa ou de documento de identidade / Cartão SUS</strong>.</p>

<h4>2. Equipes de Saúde da Família Ribeirinhas (eSFR) e Unidades Básicas de Saúde Fluviais (UBSF / eSFF)</h4>
<p>Voltadas prioritariamente às populações dispersas às margens de rios na <strong>Amazônia Legal</strong> (Acre, Amapá, Amazonas, Mato Grosso, Pará, Rondônia, Roraima, Tocantins e parte do Maranhão) e no <strong>Pantanal Sul-Mato-Grossense</strong>:</p>
<ul>
  <li><strong>Equipe de Saúde da Família Ribeirinha (eSFR):</strong> Desempenha a maior parte de suas funções em UBS construídas e/ou localizadas nas comunidades pertencentes à área adscrita, cujo acesso se dá por meio fluvial. Pela grande dispersão territorial, as eSFR recebem incentivo logístico para até <strong>4 embarcações de pequeno porte</strong> exclusivas para o deslocamento dos profissionais e até <strong>4 unidades de apoio</strong> (ou satélites) para atenção descentralizada, podendo contar com equipe ampliada (até 24 ACS, até 12 microscopistas de malária em áreas endêmicas, até 11 auxiliares/técnicos de enfermagem residentes nas comunidades remotas e até 2 profissionais de nível superior adicionais).</li>
  <li><strong>Equipe de Saúde da Família Fluvial (eSFF):</strong> Desempenha suas funções dentro de <strong>Unidades Básicas de Saúde Fluviais (UBSF)</strong> — barcos-hospitais de atenção primária equipados com consultório médico, consultório de enfermagem, consultório odontológico, laboratório de análises clínicas básico, farmácia, sala de vacinas, sala de procedimentos e camarotes com cozinha para acomodar a equipe. Nas regiões onde não há UBS fixa, a eSFF realiza circuitos fluviais programados de <strong>14 a 20 dias mensais de deslocamento</strong> pelas comunidades ribeirinhas (garantindo retorno periódico a cada 60 dias no máximo a cada comunidade), complementados por dias de planejamento, educação permanente e manutenção no porto sede.</li>
</ul>

<h4>3. Equipes de Atenção Primária Prisional (eAPP)</h4>
<p>Regulamentadas no âmbito da <strong>Política Nacional de Atenção Integral à Saúde das Pessoas Privadas de Liberdade no Sistema Prisional (PNAISP)</strong> (Portaria Interministerial MS/MJ nº 1/2014 e atualizações de 2021), as <strong>eAPP</strong> são equipes multiprofissionais cadastradas no SCNES e vinculadas à Secretaria Municipal ou Estadual de Saúde que atuam diretamente nas unidades básicas de saúde instaladas dentro dos estabelecimentos penais. Organizam-se em modalidades Essencial ou Ampliada (com cargas horárias de 6h, 20h ou 30h semanais de acordo com o número de custodiados na unidade prisional, e possibilidade de complementação com equipe de saúde mental prisional), garantindo que a população carcerária tenha acesso integral ao SUS (rastreamento sistemático de tuberculose, HIV, sífilis, hepatites virais, imunização, saúde mental, pré-natal de mulheres privadas de liberdade e controle de doenças crônicas) sob responsabilidade sanitária da rede pública de saúde.</p>
`
    }
  ]
};

bookPnab.sections.push(
  {
    id: 'atribuicoes-comuns-especificas-profissionais-acs-ace',
    title: '7. Atribuições Comuns e Específicas dos Profissionais na PNAB e Integração ACS/ACE (Leis nº 11.350/2006 e nº 13.595/2018)',
    body_html: `
<h3>Atribuições Comuns a Todos os Membros das Equipes de Atenção Básica</h3>
<p>O Capítulo 4 do Anexo XXII da Portaria de Consolidação nº 2 (PNAB 2017) discrimina de forma taxativa quais atividades constituem <strong>atribuições comuns a todos os profissionais</strong> que atuam na Atenção Básica (médico, enfermeiro, cirurgião-dentista, técnico/auxiliar de enfermagem, técnico/auxiliar de saúde bucal, ACS, ACE e profissionais da eMulti) e quais são as atribuições específicas de cada categoria. São atribuições comuns a todos os membros da equipe:</p>
<ul>
  <li>Participar do processo de <strong>territorialização e mapeamento da área de atuação da equipe</strong>, identificando grupos, famílias e indivíduos expostos a riscos e vulnerabilidades;</li>
  <li>Cadastrar e manter atualizado o cadastramento e outros dados de saúde das famílias e dos indivíduos no sistema de informação da Atenção Básica vigente (<strong>e-SUS APS / SISAB</strong>), utilizando as informações sistematicamente para a análise da situação de saúde;</li>
  <li>Realizar o cuidado integral à saúde da população adscrita, prioritariamente no âmbito da Unidade Básica de Saúde, e, quando necessário, no domicílio e nos demais espaços comunitários (escolas, associações, entre outros), com atenção especial às populações que apresentem necessidades específicas (em situação de rua, em medida socioeducativa, privada de liberdade, ribeirinha, fluvial);</li>
  <li>Realizar ações de atenção à saúde conforme a necessidade de saúde da população local, bem como aquelas previstas nas prioridades, protocolos, diretrizes clínicas e terapêuticas, assim como na oferta nacional de <strong>Padrões Essenciais e Ampliados</strong>;</li>
  <li>Garantir a atenção à saúde da população adscrita, buscando a integralidade por meio da realização de ações de promoção, proteção e recuperação da saúde, prevenção de doenças e agravos e da garantia de atendimento da <strong>demanda espontânea, da realização das ações programáticas, coletivas e de vigilância em saúde</strong>, e incorporando diversas racionalidades em saúde, inclusive Práticas Integrativas e Complementares;</li>
  <li>Participar do <strong>acolhimento dos usuários</strong>, proporcionando atendimento humanizado, realizando classificação de risco, identificando as necessidades de intervenções de cuidado, responsabilizando-se pela continuidade da atenção e viabilizando o estabelecimento do vínculo;</li>
  <li>Responsabilizar-se pelo acompanhamento da população adscrita ao longo do tempo no que se refere às múltiplas situações de doenças e agravos, e às necessidades de cuidados preventivos, permitindo a <strong>longitudinalidade do cuidado</strong>;</li>
  <li>Praticar cuidado individual, familiar e dirigido a pessoas, famílias e grupos sociais, visando propor intervenções que possam influenciar os processos saúde-doença individual, das famílias e da própria comunidade;</li>
  <li>Realizar busca ativa e notificar doenças e agravos de notificação compulsória, bem como outras situações de importância local, identificando e registrando situações de risco ambiental e sanitário;</li>
  <li>Realizar visitas domiciliares e atendimentos em domicílio às famílias e pessoas em residências, Instituições de Longa Permanência (ILPI), abrigos, entre outros tipos de moradia existentes em seu território, de acordo com o planejamento da equipe e necessidades e prioridades estabelecidas;</li>
  <li>Participar de reuniões de equipes a fim de acompanhar e discutir em conjunto o planejamento e avaliação sistemática das ações da equipe, a partir da utilização dos dados disponíveis, visando à readequação constante do processo de trabalho;</li>
  <li>Promover a mobilização e a participação da comunidade, buscando efetivar o controle social (Conselhos Locais e Municipais de Saúde).</li>
</ul>

<h3>Atribuições Específicas por Categoria Profissional na PNAB 2017</h3>
<table class="book-table">
  <thead>
    <tr>
      <th>Categoria Profissional</th>
      <th>Atribuições Específicas Nucleares na PNAB 2017</th>
      <th>Distinção Crítica para Provas de Residência</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Médico</strong></td>
      <td>• Realizar consultas clínicas, pequenos procedimentos cirúrgicos, atividades em grupo na UBS e, quando indicado ou necessário, no domicílio e/ou nos demais espaços comunitários;<br>• Realizar estratificação de risco e elaborar plano de cuidados para as pessoas que possuem condições crônicas no território, junto aos demais membros da equipe;<br>• Encaminhar, quando necessário, usuários a outros pontos de atenção, respeitando fluxos locais, mantendo sob sua responsabilidade o acompanhamento do plano terapêutico;<br>• Indicar a necessidade de internação hospitalar ou domiciliar, mantendo a responsabilização pelo acompanhamento da pessoa;<br>• Planejar, gerenciar e avaliar as ações desenvolvidas pelos ACS e ACE em conjunto com os outros membros da equipe.</td>
      <td>A indicação de internação hospitalar ou domiciliar e o diagnóstico médico amplo com prescrição irrestrita (fora de protocolos de enfermagem) são atribuições específicas do médico na equipe.</td>
    </tr>
    <tr>
      <td><strong>Enfermeiro</strong></td>
      <td>• Realizar atenção à saúde aos indivíduos e famílias vinculadas às equipes e, quando indicado ou necessário, no domicílio e/ou nos demais espaços comunitários, em todas as fases do desenvolvimento humano;<br>• Realizar consulta de enfermagem, procedimentos, <strong>solicitar exames complementares, prescrever medicações conforme protocolos, diretrizes clínicas e terapêuticas, ou outras normativas técnicas estabelecidas pelo gestor federal, estadual, municipal ou do Distrito Federal</strong>, observadas as disposições legais da profissão;<br>• Planejar, gerenciar, coordenar, executar e avaliar a USF/UBS, em conjunto com a equipe;<br>• <strong>Supervisionar as ações do técnico/auxiliar de enfermagem e dos ACS</strong>; implementar e manter atualizados rotinas, protocolos e fluxos relacionados à sua área de competência na UBS.</td>
      <td>O enfermeiro na Atenção Básica <strong>pode solicitar exames complementares e prescrever medicamentos</strong>, desde que respaldado por protocolos ou normativas técnicas oficiais do gestor (federal, estadual, municipal ou DF). Além disso, a supervisão técnica dos técnicos/auxiliares de enfermagem é privativa do enfermeiro (Lei nº 7.498/1986).</td>
    </tr>
    <tr>
      <td><strong>Técnico e/ou Auxiliar de Enfermagem</strong></td>
      <td>• Participar das atividades de atenção à saúde realizando procedimentos regulamentados no exercício de sua profissão na UBS e, quando indicado ou necessário, no domicílio e/ou nos demais espaços comunitários;<br>• Realizar procedimentos de enfermagem, como curativos, administração de medicamentos, vacinas, coleta de material para exames, lavagem, preparação e esterilização de materiais, entre outras atividades delegadas pelo enfermeiro, de acordo com sua área de atuação e regulamentação;<br>• Exercer outras atribuições que sejam de responsabilidade na sua área de atuação.</td>
      <td>Atua sempre sob a supervisão direta do enfermeiro; executa vacinação, curativos complexos, administração de injetáveis e esterilização de materiais.</td>
    </tr>
    <tr>
      <td><strong>Cirurgião-Dentista</strong></td>
      <td>• Realizar a atenção em saúde bucal (promoção e proteção da saúde, prevenção de agravos, diagnóstico, tratamento, acompanhamento, reabilitação e manutenção da saúde) individual e coletiva a todas as famílias, a indivíduos e a grupos específicos, de acordo com planejamento da equipe, com resolutividade;<br>• Realizar diagnóstico com a finalidade de obter o perfil epidemiológico para o planejamento e a programação em saúde bucal no território;<br>• Realizar os procedimentos clínicos e cirúrgicos da Atenção Básica em saúde bucal, incluindo atendimento das urgências, pequenas cirurgias ambulatoriais e procedimentos relacionados com a fase clínica da instalação de próteses dentárias elementares;<br>• Coordenar e participar de ações coletivas voltadas à promoção da saúde e à prevenção de doenças bucais; supervisionar o trabalho do TSB e do ASB.</td>
      <td>A fase clínica de instalação de próteses dentárias elementares pode e deve ser realizada na própria Atenção Básica pela eSB, em articulação com os Laboratórios Regionais de Próteses Dentárias (LRPD).</td>
    </tr>
  </tbody>
</table>

<h3>Integração entre ACS e ACE e a Lei nº 13.595/2018 (Lei Ruth Brilhante)</h3>
<p>A PNAB 2017 e a Lei nº 13.595/2018 promoveram a convergência operacional entre o <strong>Agente Comunitário de Saúde (ACS)</strong> e o <strong>Agente de Combate às Endemias (ACE)</strong> sobre uma base geográfica única. Enquanto o ACS tem como atribuição nuclear o exercício de atividades de prevenção de doenças e de promoção da saúde mediante ações domiciliares ou comunitárias, individuais ou coletivas, desenvolvidas em conformidade com as diretrizes do SUS que normatizam a saúde da família e a atenção básica, o ACE tem como atribuição o exercício de atividades de vigilância, prevenção e controle de doenças e promoção da saúde (vistoria de imóveis, identificação e eliminação de focos de vetores como <em>Aedes aegypti</em>, aplicação de larvicidas quando indicado, pesquisa entomológica e controle de zoonoses).</p>
<p>Na PNAB 2017, foram criadas as <strong>"Atribuições comuns do ACS e do ACE"</strong> para eliminar a fragmentação em que dois agentes entravam na mesma casa sem conversar entre si: ambos devem realizar diagnóstico demográfico, social, cultural, ambiental, epidemiológico e sanitário do território em que atuam, atualizado periodicamente; desenvolver atividades de promoção da saúde e prevenção de doenças; identificar e registrar situações que interfiram no curso das doenças ou que tenham importância epidemiológica; mobilizar a comunidade para mutirões ambientais; e realizar visitas domiciliares regulares. Além disso, conforme a Lei nº 13.595/2018 e a PNAB 2017, o ACS que tiver concluído curso técnico em Agente Comunitário de Saúde (Programa Saúde com Agente / Mais Saúde com Agente) ou capacitação específica, assistido por profissional de nível superior da equipe, está legalmente habilitado a realizar no domicílio: (1) aferição da pressão arterial; (2) medição de glicemia capilar; (3) aferição de temperatura axilar; (4) medição de peso e altura (antropometria); e (5) orientação e apoio em domicílio para a correta administração de medicação de paciente em situação de vulnerabilidade.</p>
`
  },
  {
    id: 'processo-trabalho-carteira-servicos-casaps',
    title: '8. Processo de Trabalho na PNAB, Carteira de Serviços da APS (CaSAPS) e Educação Permanente',
    body_html: `
<h3>Características do Processo de Trabalho das Equipes na PNAB 2017</h3>
<p>O Capítulo 5 da PNAB 2017 estabelece as diretrizes operacionais que regem o processo de trabalho cotidiano das equipes de Atenção Básica em todo o território nacional:</p>
<ul>
  <li><strong>Definição do Território e Territorialização:</strong> As equipes devem atuar em território geograficamente definido, realizando o mapeamento de áreas de risco, equipamentos sociais e barreiras de acesso, vedada qualquer recusa de atendimento de urgência a pessoas fora de sua área de abrangência (que devem ser acolhidas, estabilizadas e posteriormente referenciadas à equipe de seu domicílio).</li>
  <li><strong>Responsabilização Sanitária e Cadastramento:</strong> Cadastramento atualizado de todas as pessoas residentes no território no e-SUS APS, vinculando cada usuário a uma equipe de referência.</li>
  <li><strong>Porta de Entrada Preferencial e Acolhimento em Todos os Turnos:</strong> O acolhimento com escuta qualificada e classificação de risco e vulnerabilidade deve ocorrer durante todo o horário de funcionamento da UBS, equilibrando a absorção da demanda espontânea aguda com a oferta de cuidado continuado/programado.</li>
  <li><strong>Trabalho Multiprofissional e Interdisciplinar:</strong> Superação da fragmentação corporativa por meio de reuniões periódicas de equipe, construção de Projetos Terapêuticos Singulares (PTS) para casos complexos, consultas compartilhadas e apoio matricial com a eMulti e com os demais pontos da Rede de Atenção à Saúde.</li>
  <li><strong>Atenção Domiciliar e Ações Comunitárias:</strong> Garantia de reserva de carga horária na agenda de todos os profissionais (inclusive médicos, enfermeiros e cirurgiões-dentistas) para a realização de visitas domiciliares aos usuários restritos ao leito/domicílio (AD1) e para ações coletivas no território (como o Programa Saúde na Escola).</li>
</ul>

<h3>A Carteira de Serviços da Atenção Primária à Saúde (CaSAPS)</h3>
<p>Publicada pelo Ministério da Saúde para operacionalizar os Padrões Essenciais e Ampliados da PNAB e fortalecer o atributo essencial da <strong>Integralidade (Abrangência)</strong>, a <strong>Carteira de Serviços da Atenção Primária à Saúde (CaSAPS)</strong> define o escopo clínico e assistencial esperado nas UBS brasileiras, combatendo a tendência de transformar a APS em mero "balcão de encaminhamentos" para especialistas focais. A CaSAPS organiza as ações em quatro grandes blocos: (1) Atenção à Saúde do Adulto e do Idoso; (2) Atenção à Saúde da Mulher e Gestante; (3) Atenção à Saúde da Criança e do Adolescente; e (4) Procedimentos na APS e Saúde Bucal.</p>
<p>Entre os <strong>procedimentos clínicos e cirúrgicos ambulatoriais</strong> que integram a carteira da APS e que devem ser realizados na própria UBS pelos médicos e enfermeiros (conforme competência legal de cada profissão), destacam-se:</p>
<ul>
  <li>Inserção e retirada de Dispositivo Intrauterino (DIU de cobre TCu 380A) e coleta de exame citopatológico do colo do útero (Papanicolaou);</li>
  <li>Sutura de ferimentos superficiais de pele e mucosas e retirada de pontos;</li>
  <li>Drenagem de abscesso cutâneo superficial e de furúnculo/antraz simples;</li>
  <li>Cantoplastia (tratamento cirúrgico de unha encravada / onicocriptose);</li>
  <li>Exérese de pequenas lesões de pele e tecido subcutâneo (cistos epidermoides/sebáceos, lipomas pequenos, granuloma piogênico, molusco contagioso, cauterização química de verrugas vulgares e condilomas acuminados com ácido tricloroacético — ATA);</li>
  <li>Biópsia de pele (<em>punch</em> ou <em>shaving</em>) para investigação diagnóstica de hanseníase e neoplasias cutâneas;</li>
  <li>Lavagem otológica (remoção de rolha de cerume) e retirada de corpo estranho simples de ouvido, cavidade nasal ou subcutâneo;</li>
  <li>Tamponamento nasal anterior em epistaxe anterior aguda;</li>
  <li>Sondagem vesical de alívio e troca de sonda vesical de demora (cistostomia/SVD), troca de cânula de traqueostomia estabilizada e passagem de sonda nasoenteral/nasogástrica;</li>
  <li>Realização e interpretação de Eletrocardiograma (ECG) de 12 derivações (com apoio de telediagnóstico/Telessaúde Brasil Redes), testes rápidos (HIV, sífilis, hepatites B e C, gravidez, dengue, malária), glicemia capilar, espirometria simples/pico de fluxo expiratório (<em>peak flow</em>) e índice tornozelo-braquial (ITB).</li>
</ul>

<h3>Educação Permanente em Saúde (EPS) versus Educação Continuada na PNAB</h3>
<p>A PNAB 2017 (em alinhamento com a Política Nacional de Educação Permanente em Saúde — Portaria GM/MS nº 198/2004 e Portaria GM/MS nº 1.996/2007) enfatiza que a qualificação das equipes deve ocorrer prioritariamente sob a lógica da <strong>Educação Permanente em Saúde (EPS)</strong>, que se diferencia radicalmente da tradicional Educação Continuada:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Dimensão Pedagógica</th>
      <th>Educação Continuada Tradicional</th>
      <th>Educação Permanente em Saúde (EPS — PNAB / SUS)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Ponto de Partida</strong></td>
      <td>Atualização técnico-científica abstrata definida por especialistas externos ou grades acadêmicas prévias.</td>
      <td>Os <strong>problemas reais, nós críticos e necessidades concretas identificados no processo de trabalho cotidiano</strong> da própria equipe no território.</td>
    </tr>
    <tr>
      <td><strong>Público-Alvo</strong></td>
      <td>Uniprofissional e fragmentado (curso separado só para médicos, outro só para enfermeiros, outro só para ACS).</td>
      <td><strong>Multiprofissional e interdisciplinar</strong> (envolve conjuntamente toda a equipe de saúde, gestores e controle social).</td>
    </tr>
    <tr>
      <td><strong>Metodologia e Lócus</strong></td>
      <td>Transmissão vertical de conhecimentos (aulas expositivas, congressos, cursos pontuais fora do serviço).</td>
      <td><strong>Aprendizagem significativa e problematizadora no próprio cotidiano do trabalho</strong> (reuniões de equipe, discussão de casos, apoio matricial, auditoria clínica, Telessaúde).</td>
    </tr>
    <tr>
      <td><strong>Objetivo Final</strong></td>
      <td>Acúmulo individual de informação teórica pelo profissional.</td>
      <td><strong>Transformação das práticas profissionais e da própria organização do processo de trabalho</strong> na UBS e na rede.</td>
    </tr>
  </tbody>
</table>
`
  },
  {
    id: 'integracao-vigilancia-saude-atencao-basica',
    title: '9. Integração entre Atenção Básica e Vigilância em Saúde na PNAB 2017 e na Portaria nº 1.378/2013',
    body_html: `
<h3>A Superação da Dicotomia Histórica entre Assistência Clínica e Vigilância em Saúde</h3>
<p>Um dos avanços mais expressivos da PNAB 2017 e da Política Nacional de Vigilância em Saúde (PNVS — Resolução CNS nº 588/2018) consiste na determinação de que a <strong>integração entre a Vigilância em Saúde e a Atenção Básica é condição obrigatória para o alcance de resultados que atendam às necessidades de saúde da população</strong>, na ótica da integralidade da atenção à saúde e visando estabelecer processos de trabalho que considerem os determinantes, os riscos e os danos à saúde, na perspectiva da intra e intersetorialidade.</p>
<p>A Vigilância em Saúde não é um departamento isolado na Secretaria Municipal de Saúde; ela deve permear o cotidiano de cada Equipe de Saúde da Família por meio da articulação de seus quatro componentes clássicos no território da UBS:</p>
<ul>
  <li><strong>1. Vigilância Epidemiológica na UBS:</strong> Detecção precoce e <strong>notificação compulsória</strong> (imediata em até 24h ou semanal no SINAN) de casos suspeitos ou confirmados de doenças transmissíveis e agravos; investigação epidemiológica de campo no domicílio; busca ativa de sintomáticos respiratórios para tuberculose (meta de examinar pelo menos 1% da população adscrita ao ano com teste rápido molecular — TRM-TB ou baciloscopia); exame de contatos intradomiciliares de tuberculose e hanseníase (com avaliação dermatoneurológica e aplicação de BCG conforme protocolo); bloqueio vacinal seletivo diante de casos suspeitos de sarampo, meningite meningocócica ou febre amarela; e monitoramento da cobertura vacinal por microárea.</li>
  <li><strong>2. Vigilância Ambiental em Saúde na UBS:</strong> Mapeamento e intervenção sobre fatores de risco biológicos (vetores como <em>Aedes aegypti</em>, flebotomíneos transmissores de leishmaniose, triatomíneos transmissores de doença de Chagas, caramujos <em>Biomphalaria</em> da esquistossomose, roedores transmissores de leptospirose, animais peçonhentos e reservatórios de raiva) e fatores não biológicos (qualidade da água para consumo humano — VIGIAGUA, contaminantes químicos do solo, agrotóxicos em áreas rurais, poluição atmosférica e desastres naturais como enchentes e deslizamentos), mediante trabalho integrado entre ACS e ACE.</li>
  <li><strong>3. Vigilância em Saúde do Trabalhador (VISAT) na UBS:</strong> Mapeamento das atividades produtivas formais, informais e domiciliares existentes no território (oficinas mecânicas, confecções têxteis, reciclagem de resíduos, agricultura familiar com uso de praguicidas, trabalho infantil); inclusão sistemática da ocupação atual e pregressa na anamnese clínica (respondendo à pergunta de Ramazzini: <em>"Qual é a sua ocupação?"</em>); diagnóstico e notificação no SINAN dos agravos relacionados ao trabalho (acidentes de trabalho graves/fatais, acidentes com material biológico, LER/DORT, perda auditiva induzida por ruído — PAIR, pneumoconioses, intoxicações exógenas por agrotóxicos/metais pesados, transtornos mentais relacionados ao trabalho / <em>burnout</em>); e articulação matricial com o Centro de Referência em Saúde do Trabalhador (CEREST).</li>
  <li><strong>4. Vigilância Sanitária (VISA) na UBS:</strong> Controle de qualidade, armazenamento, validade e rastreabilidade de medicamentos na farmácia da UBS, monitoramento rigoroso da cadeia de frio dos imunobiológicos na sala de vacinas (conservação entre +2 °C e +8 °C, sendo +5 °C a temperatura ideal), biossegurança na esterilização de instrumentais odontológicos e cirúrgicos, gerenciamento adequado de resíduos de serviços de saúde (PGRSS) e notificação de eventos adversos pós-vacinação (ESAVI) e farmacovigilância (VigiMed/Notivisa).</li>
</ul>
`
  },
  {
    id: 'cofinanciamento-federal-aps-pab-previne-portaria-3493',
    title: '10. Arquitetura Jurídico-Financeira da APS: Portaria de Consolidação nº 6 e Portaria GM/MS nº 3.493/2024',
    body_html: `
<h3>Regras de Financiamento, Credenciamento e Suspensão de Recursos na PNAB</h3>
<p>No âmbito da Portaria de Consolidação GM/MS nº 2 (Anexo XXII — PNAB 2017) e da Portaria de Consolidação GM/MS nº 6 (que regulamenta o financiamento e a transferência dos recursos federais para as ações e os serviços de saúde do SUS, dividida nos dois grandes blocos da Portaria nº 3.992/2017: <strong>Bloco de Manutenção das Ações e Serviços Públicos de Saúde</strong> e <strong>Bloco de Estruturação da Rede de Serviços Públicos de Saúde</strong>), a implantação e o custeio federal das equipes da Atenção Básica obedecem a um fluxo administrativo trifásico:</p>
<ol>
  <li><strong>Elaboração e Aprovação Municipal e Estadual:</strong> O gestor municipal elabora o projeto de implantação de novas equipes (eSF, eAP, eSB, eMulti, eCR, eSFR, eSFF), submete ao conhecimento do Conselho Municipal de Saúde e encaminha a solicitação via sistema eletrônico oficial (e-Gestor AB) ao Ministério da Saúde, dando ciência à Comissão Intergestores Bipartite (CIB).</li>
  <li><strong>Credenciamento e Homologação pelo Ministério da Saúde:</strong> O Ministério da Saúde analisa a disponibilidade orçamentária e os critérios técnicos e publica portaria de credenciamento no Diário Oficial da União (DOU). Após o credenciamento, o município deve cadastrar os profissionais e a equipe no <strong>SCNES (Sistema de Cadastro Nacional de Estabelecimentos de Saúde)</strong> e enviar a produção no <strong>SISAB (e-SUS APS)</strong> para que o código INE (Identificador Nacional de Equipe) seja homologado e passe a receber o repasse mensal fundo a fundo.</li>
  <li><strong>Hipóteses Normativas de Suspensão dos Repasses Federais das Equipes:</strong> A PNAB 2017 estabelece situações objetivas em que o Ministério da Saúde pode <strong>suspender a transferência dos incentivos financeiros</strong> referentes às equipes da Atenção Básica (eSF, eAP, eSB, eMulti):
    <ul>
      <li>Inexistência de unidade básica de saúde cadastrada para o trabalho das equipes e/ou ausência de qualquer um dos profissionais da composição mínima exigida para a equipe por um período superior a <strong>60 (sessenta) dias</strong> (ou 2 competências consecutivas do SCNES), exceto nos períodos de férias regulamentares ou licenças legalmente previstas quando houver substituição;</li>
      <li>Descumprimento da carga horária mínima prevista para os profissionais das equipes (ex.: médico ou enfermeiro cadastrado com menos horas do que o exigido na modalidade ou acumulando mais de 2 equipes);</li>
      <li>Ausência de envio de informações de produção à base de dados nacional do <strong>SISAB (e-SUS APS) por 3 (três) competências consecutivas</strong>;</li>
      <li>Constatada irregularidade na execução dos recursos ou fraude no cadastramento/SCNES apontada por órgãos de controle interno ou externo (DENASUS / Sistema Nacional de Auditoria, CGU, TCU).</li>
    </ul>
  </li>
</ol>

<h3>Detalhamento Metodológico da Portaria GM/MS nº 3.493/2024 (Novo Cofinanciamento Federal da APS)</h3>
<p>A <strong>Portaria GM/MS nº 3.493, de 10 de abril de 2024</strong>, reformulou o Título II da Portaria de Consolidação GM/MS nº 6/2017, extinguindo o modelo do Previne Brasil (Portaria nº 2.979/2019). Para as provas de residência médica, é fundamental dominar os parâmetros quantitativos e qualitativos dessa nova arquitetura:</p>
<ul>
  <li><strong>Índice de Equidade e Dimensionamento (IED):</strong> Criado pelo Ministério da Saúde em pactuação na CIT, o IED substitui a antiga tipologia meramente urbano/rural e classifica todos os 5.570 municípios brasileiros em <strong>4 estratos (Estrato 1 a Estrato 4)</strong> a partir do cruzamento entre o <strong>Índice de Vulnerabilidade Social (IVS, elaborado pelo IPEA)</strong> e o <strong>porte populacional municipal (IBGE)</strong>. O <strong>Estrato 1</strong> reúne os municípios de maior vulnerabilidade social e menor porte, recebendo os maiores valores financeiros no Componente Fixo por equipe, enquanto o <strong>Estrato 4</strong> reúne os municípios de menor vulnerabilidade social.</li>
  <li><strong>Parâmetros de Cadastro por Equipe no Componente de Vínculo e Acompanhamento Territorial:</strong> Enquanto a PNAB 2017 falava genericamente em 2.000 a 3.500 pessoas por eSF e o Previne Brasil exigia até 4.000 cadastros nas capitais para atingir o teto, a Portaria nº 3.493/2024 estabeleceu parâmetros mais protetores da qualidade clínica conforme o porte populacional do município:
    <ul>
      <li>Municípios com <strong>até 20.000 habitantes:</strong> parâmetro de <strong>2.000 pessoas</strong> por eSF (1.000 para eAP 20h; 1.500 para eAP 30h);</li>
      <li>Municípios de <strong>20.001 a 50.000 habitantes:</strong> parâmetro de <strong>2.500 pessoas</strong> por eSF (1.250 para eAP 20h; 1.875 para eAP 30h);</li>
      <li>Municípios de <strong>50.001 a 100.000 habitantes:</strong> parâmetro de <strong>2.750 pessoas</strong> por eSF (1.375 para eAP 20h; 2.063 para eAP 30h);</li>
      <li>Municípios com <strong>mais de 100.000 habitantes:</strong> parâmetro de <strong>3.000 pessoas</strong> por eSF (1.500 para eAP 20h; 2.250 para eAP 30h).</li>
    </ul>
  </li>
  <li><strong>Critérios de Ponderação no Componente de Vínculo e Acompanhamento:</strong> Na análise da população vinculada e efetivamente acompanhada pela equipe (e não apenas cadastrada no papel), têm peso maior as pessoas em situação de vulnerabilidade socioeconômica (beneficiárias do Programa Bolsa Família ou Benefício de Prestação Continuada — BPC) e as pessoas em extremos etários (crianças até 5 anos de idade e pessoas idosas com 60 anos ou mais — note que o corte etário para idoso foi ajustado para <strong>60 anos ou mais</strong>, em harmonia com o Estatuto da Pessoa Idosa, corrigindo o antigo corte de 65 anos do Previne Brasil).</li>
</ul>
`
  },
  {
    id: 'casos-clinicos-gestao-pnab',
    title: '11. Casos Clínicos e de Gestão Sanitária Aplicados à PNAB (Casos 1 a 6)',
    body_html: `
<h3>Caso Clínico 1 — Regras de Carga Horária, Composição de Equipes (eSF vs. eAP) e SCNES na PNAB 2017</h3>
<p><strong>Apresentação do Caso:</strong> Um município de 45.000 habitantes enfrenta dificuldades para fixar médicos de 40 horas semanais em duas Unidades Básicas de Saúde periféricas. O Secretário Municipal de Saúde reúne sua equipe técnica e apresenta três propostas para manter o cofinanciamento federal sem sofrer suspensão no SCNES: (Proposta 1) Na Equipe de Saúde da Família "Jardim das Flores" (eSF), contratar dois médicos clínicos/MFC que cumprirão 20 horas semanais cada um na mesma equipe, somando 40 horas médicas semanais, mantendo 1 enfermeiro de 40h, 1 técnico de enfermagem de 40h e 5 ACS de 40h; (Proposta 2) Na Equipe de Saúde da Família "Bela Vista" (eSF), contratar quatro médicos cumprindo 10 horas semanais cada um para somar 40 horas médicas na eSF; e (Proposta 3) Credenciar uma Equipe de Atenção Primária (eAP) Modalidade I composta por 1 médico de 20h semanais e 1 enfermeiro de 20h semanais para cobrir uma área central com 1.250 moradores. O coordenador da Atenção Básica analisa a legalidade de cada proposta à luz da PNAB 2017.</p>
<p><strong>Discussão Clínica e Gestão do Cuidado:</strong> Analisando estritamente os dispositivos do Anexo XXII da Portaria de Consolidação nº 2 (PNAB 2017) e da Portaria nº 2.539/2019: a <strong>Proposta 1 é perfeitamente legal e válida</strong>, pois a PNAB 2017 permite que na eSF haja até 3 profissionais por categoria profissional, desde que a carga horária mínima individual seja de 20 horas semanais e a soma por categoria perfaça no mínimo 40 horas semanais na equipe (dois médicos de 20h = 40h). Já a <strong>Proposta 2 é ilegal e causará bloqueio/suspensão da equipe no SCNES</strong>, por dois motivos simultâneos: na eSF o número máximo de profissionais por categoria é de 3 (e não 4), e a carga horária mínima individual permitida na eSF é de 20 horas semanais (sendo vedado médico de 10h semanais em eSF; a carga de 10h para médicos especialistas só é admitida nas equipes <em>eMulti</em> pela Portaria nº 635/2023). Por fim, a <strong>Proposta 3 é plenamente legal e adequada</strong>: a eAP Modalidade I exige minimamente apenas médico (20h semanais) e enfermeiro (20h semanais) e responsabiliza-se por 50% do parâmetro populacional de uma eSF (como o município tem entre 20.001 e 50.000 habitantes, o parâmetro da eSF pela Portaria nº 3.493/2024 é de 2.500 pessoas, sendo 50% exatamente 1.250 pessoas).</p>

<h3>Caso Clínico 2 — Atribuições do Enfermeiro na Atenção Básica: Prescrição e Solicitação de Exames</h3>
<p><strong>Apresentação do Caso:</strong> Durante consulta de pré-natal de risco habitual de uma gestante de 22 anos na 10ª semana de gestação, a enfermeira da Equipe de Saúde da Família realiza o teste rápido treponêmico para sífilis na própria UBS, cujo resultado é reagente (positivo). A gestante nega tratamento prévio para sífilis e não apresenta alergia a penicilina. Seguindo o Protocolo Clínico e Diretrizes Terapêuticas (PCDT) de Infecções Sexualmente Transmissíveis do Ministério da Saúde e o protocolo municipal de enfermagem devidamente aprovado pela Secretaria Municipal de Saúde e pelo COREN, a enfermeira coleta sangue para o teste não treponêmico (VDRL), prescreve e supervisiona a aplicação imediata da primeira dose de Penicilina G Benzatina 2.400.000 UI intramuscular na própria UBS (esquema total de 3 doses semanais de 2,4 milhões UI, totalizando 7,2 milhões UI por tratar-se de sífilis de duração ignorada/latente tardia), convoca o parceiro sexual para testagem e tratamento, notifica o caso de sífilis em gestante no SINAN e agenda a consulta intercalada com o médico da equipe. Um profissional recém-chegado questiona se a enfermeira não teria cometido "exercício ilegal da medicina" ao solicitar o VDRL e prescrever a penicilina benzatina.</p>
<p><strong>Discussão Clínica e Gestão do Cuidado:</strong> A atuação da enfermeira está <strong>100% respaldada pela legislação federal (Lei do Exercício Profissional da Enfermagem — Lei nº 7.498/1986, Art. 11, II, "c"), pela PNAB 2017 (Portaria nº 2.436/2017) e pelas notas técnicas conjuntas do Ministério da Saúde e do COFEN</strong>. Constitui atribuição específica expressa do enfermeiro na Atenção Básica: <em>"realizar consulta de enfermagem, procedimentos, solicitar exames complementares, prescrever medicações conforme protocolos, diretrizes clínicas e terapêuticas, ou outras normativas técnicas estabelecidas pelo gestor federal, estadual, municipal ou do Distrito Federal, observadas as disposições legais da profissão"</em>. No enfrentamento da sífilis congênita no Brasil, a prescrição e administração imediata de penicilina benzatina pela enfermagem e pelos médicos na APS diante de teste rápido reagente em gestante é uma conduta salvadora de vidas que impede a transmissão vertical, sendo a reação anafilática grave extremamente rara (cerca de 0,002%) e devendo a penicilina ser administrada obrigatoriamente na própria UBS.</p>

<h3>Caso Clínico 3 — População em Situação de Rua, Equidade e Equipe de Consultório na Rua (eCR)</h3>
<p><strong>Apresentação do Caso:</strong> Um homem de 39 anos em situação de rua, dormindo sob um viaduto há 8 meses, comparece espontaneamente a uma Unidade Básica de Saúde do centro da cidade apresentando tosse produtiva há 4 semanas, febre vespertina, sudorese noturna intensa e emagrecimento acentuado, além de uma úlcera infectada no membro inferior direito. Ele não possui documento de identidade (RG/CPF), não tem Cartão Nacional de Saúde (Cartão SUS) em mãos e, obviamente, não dispõe de comprovante de residência. O funcionário da recepção recusa o cadastro e o atendimento, alegando que "sem comprovante de endereço da área da UBS e sem RG o sistema PEC não aceita abrir ficha, devendo ele procurar o pronto-socorro municipal". A Equipe de Consultório na Rua (eCR) do município toma ciência do ocorrido e intervém junto à gerência da UBS.</p>
<p><strong>Discussão Clínica e Gestão do Cuidado:</strong> A recusa de atendimento na recepção configura grave violação da Constituição Federal (Art. 196), da Lei nº 8.080/1990, da <strong>Portaria GM/MS nº 940/2011</strong> e dos princípios de <strong>Universalidade e Equidade da PNAB 2017</strong>. A Portaria nº 940/2011 (que regulamenta o Sistema Cartão Nacional de Saúde) determina expressamente em seu Art. 23, § 1º que <strong>não constitui impedimento para a realização do cadastramento e do atendimento em qualquer estabelecimento do SUS a inexistência ou ausência de comprovante de residência, especialmente para a população em situação de rua, ciganos, nômades e itinerantes</strong>, tampouco a ausência de documentos civis no momento do atendimento. Clinicamente, o paciente é um sintomático respiratório clássico com altíssima probabilidade de tuberculose pulmonar bacilífera (cujo risco na população em situação de rua é 50 a 60 vezes maior que na população geral) associado a infecção bacteriana cutânea. A conduta imediata obrigatória da UBS, em articulação compartilhada com a <strong>Equipe de Consultório na Rua (eCR)</strong>, inclui: acolhimento imediato em ambiente ventilado com oferta de máscara cirúrgica ao paciente; realização de curativo da úlcera e antibioticoterapia; coleta imediata de escarro para Teste Rápido Molecular para Tuberculose (TRM-TB / GeneXpert) e cultura com teste de sensibilidade; realização de testes rápidos para HIV, sífilis e hepatites B e C; início imediato do esquema básico RHZE (rifampicina, isoniazida, pirazinamida e etambutol) sob regime de <strong>Tratamento Diretamente Observado (TDO)</strong> articulado entre a UBS, a eCR e o Centro POP/abrigo municipal; e acionamento do serviço social para emissão gratuita de segunda via de documentos civis e benefícios eventuais.</p>

<h3>Caso Clínico 4 — Atribuições do Agente Comunitário de Saúde (Lei nº 13.595/2018) e Limites Legais</h3>
<p><strong>Apresentação do Caso:</strong> Em uma Unidade Básica de Saúde rural, todos os 6 Agentes Comunitários de Saúde (ACS) concluíram com êxito o Curso Técnico em Agente Comunitário de Saúde (1.200 horas, Programa Saúde com Agente do Ministério da Saúde) e receberam esfigmomanômetros validados, glicosímetros, termômetros e fitas antropométricas. Durante o planejamento das visitas domiciliares da semana a pacientes acamados (AD1), um médico recém-contratado solicita que o ACS da Microárea 02 vá sozinho à casa de uma idosa diabética para: (1) aferir a pressão arterial e a glicemia capilar em jejum; (2) aplicar a dose subcutânea matinal de insulina NPH na paciente; e (3) realizar o desbridamento instrumental e a retirada de pontos de uma ferida operatória no pé da paciente.</p>
<p><strong>Discussão Clínica e Gestão do Cuidado:</strong> Este caso testa o domínio exato da fronteira legal estabelecida pela <strong>Lei nº 11.350/2006 (com a redação dada pela Lei nº 13.595/2018 — Lei Ruth Brilhante)</strong> e pela PNAB 2017. A tarefa (1) — <strong>aferição da pressão arterial e medição da glicemia capilar no domicílio</strong> (bem como aferição de temperatura axilar e medição de peso e altura) — é <strong>plenamente legal e permitida ao ACS</strong>, uma vez que ele possui o Curso Técnico em ACS concluído, atua assistido por profissional de nível superior da equipe e utiliza os dados para alimentar a vigilância e o cuidado longitudinal. Além disso, o ACS pode <em>orientar e apoiar</em> a família quanto à correta administração de medicamentos prescritos. Entretanto, as tarefas (2) e (3) — <strong>administrar diretamente medicação injetável (insulina subcutânea) e realizar desbridamento/curativo cirúrgico complexo e retirada de pontos</strong> — são <strong>estritamente vedadas ao ACS</strong>, pois constituem atos privativos da equipe de enfermagem (técnico de enfermagem sob supervisão do enfermeiro, ou o próprio enfermeiro/médico). Portanto, o enfermeiro e o médico devem corrigir a escala: o ACS realiza as aferições de PA/glicemia e a educação em saúde, enquanto o técnico de enfermagem ou o enfermeiro desloca-se ao domicílio para a retirada de pontos, curativo especial e treinamento prático do cuidador familiar na aplicação de insulina.</p>

<h3>Caso Clínico 5 — Suspensão de Recursos Federais e Gestão do SCNES/SISAB na PNAB</h3>
<p><strong>Apresentação do Caso:</strong> O prefeito de um município do interior recebe uma notificação do Fundo Nacional de Saúde informando a suspensão da transferência mensal dos incentivos federais referentes a duas Equipes de Saúde da Família (eSF 01 e eSF 02). Ao auditar a situação junto à Secretaria Municipal de Saúde, o novo gestor descobre dois problemas distintos: na eSF 01, o único médico da equipe pediu demissão há 95 dias (três competências consecutivas do SCNES) e a secretaria não contratou substituto, deixando a equipe apenas com enfermeiro, técnico e ACS; já na eSF 02, todos os profissionais estão trabalhando normalmente com 40 horas semanais, mas uma falha no servidor de informática da secretaria impediu a transmissão dos lotes do e-SUS APS para a base nacional do SISAB durante as últimas 4 competências mensais consecutivas.</p>
<p><strong>Discussão Clínica e Gestão do Cuidado:</strong> Ambas as suspensões aplicadas pelo Ministério da Saúde estão estritamente previstas no Capítulo 6 da <strong>PNAB 2017 (Portaria nº 2.436/2017) e na Portaria de Consolidação nº 6</strong>. No caso da eSF 01, a <strong>ausência de qualquer um dos profissionais da composição mínima obrigatória (médico, enfermeiro, técnico/auxiliar de enfermagem ou ACS) por período superior a 60 dias (duas competências consecutivas do SCNES)</strong> acarreta a suspensão automática do repasse federal daquela equipe até que a composição seja regularizada (seja pela contratação de um médico de 40h, seja pela contratação de dois médicos de 20h, ou ainda pela conversão temporária da equipe em outra modalidade compatível). No caso da eSF 02, a <strong>ausência de envio de informações de produção à base de dados do SISAB (e-SUS APS) por 3 (três) competências consecutivas</strong> também determina a suspensão imediata dos recursos federais, uma vez que a alimentação regular dos sistemas nacionais de informação é obrigação legal do gestor municipal (Lei nº 8.080/1990, Decreto nº 7.508/2011 e PNAB). A regularização exige o restabelecimento imediato da transmissão dos lotes retroativos do PEC e-SUS APS ao SISAB e a recomposição do quadro médico no SCNES.</p>

<h3>Caso Clínico 6 — Integração entre Atenção Básica e Vigilância em Saúde (Surto de Dengue e Saúde do Trabalhador)</h3>
<p><strong>Apresentação do Caso:</strong> No início do período chuvoso, uma Equipe de Saúde da Família atende na demanda espontânea, em apenas 3 dias, 18 moradores procedentes das Microáreas 01 e 02 com quadro de febre aguda (2 a 5 dias), cefaleia retro-orbitária, mialgia intensa, exantema maculopapular e prova do laço positiva em 4 deles, confirmando-se dengue pelo teste rápido NS1 na própria UBS. Ao plotar os casos no Mapa Inteligente da sala de reunião, o ACS e o Agente de Combate às Endemias (ACE) vinculado à equipe percebem que 14 dos 18 casos concentram-se ao redor de um depósito clandestino de reciclagem de pneus e sucatas a céu aberto, onde trabalham 8 catadores informais sem equipamentos de proteção individual (dois deles também atendidos com dengue e um terceiro com ferimento corto-contuso contaminado no pé e esquema antitetânico incompleto).</p>
<p><strong>Discussão Clínica e Gestão do Cuidado:</strong> O caso demonstra na prática a potência da diretriz de <strong>integração entre Atenção Básica e Vigilância em Saúde (Epidemiológica, Ambiental e Saúde do Trabalhador)</strong> preconizada pela PNAB 2017. No plano clínico-assistencial e de <strong>Vigilância Epidemiológica</strong>, a equipe classifica os pacientes com dengue nos Grupos A, B, C ou D do Ministério da Saúde: os pacientes do Grupo A recebem hidratação oral domiciliar prescrita (60 mL/kg/dia, sendo 1/3 com sais de reidratação oral e 2/3 com líquidos caseiros), antitérmico seguro (dipirona ou paracetamol, contraindicando formalmente AAS e AINEs) e cartão de acompanhamento da dengue com sinais de alarme; os pacientes do Grupo B (com prova do laço positiva / sangramento cutâneo espontâneo ou comorbidades/extremos etários) têm hemograma coletado imediatamente na UBS com hidratação oral supervisionada na sala de observação e reavaliação diária até 48h após a defervescência; e todos os casos suspeitos são notificados no SINAN. No plano de <strong>Vigilância Ambiental</strong>, a atuação conjunta imediata dos ACS e do ACE realiza a vistoria e eliminação mecânica/tratamento focal dos criadouros de <em>Aedes aegypti</em> no depósito de sucatas e nos quarteirões adjacentes, mobilizando a comunidade e o serviço municipal de limpeza urbana. No plano de <strong>Vigilância em Saúde do Trabalhador (VISAT)</strong>, o catador com ferimento no pé recebe limpeza, profilaxia do tétano (vacina dT e soro/imunoglobulina antitetânica conforme histórico vacinal), notificação de Acidente de Trabalho no SINAN e ação intersetorial com o CEREST e o CRAS para adequação sanitária da cooperativa de reciclagem e fornecimento de EPIs.</p>
`
  },
  {
    id: 'questoes-comentadas-residencia-pnab',
    title: '12. Questões Comentadas de Residência Médica e Revalida sobre a PNAB (Questões 1 a 10)',
    body_html: `
<h3>Questão Comentada 1 — Princípios versus Diretrizes na PNAB 2017 (USP-SP / ENARE)</h3>
<p><strong>Enunciado:</strong> De acordo com o Anexo XXII da Portaria de Consolidação GM/MS nº 2/2017 (que aprova a Política Nacional de Atenção Básica — PNAB 2017), as ações e os serviços da Atenção Básica no âmbito do Sistema Único de Saúde orientam-se por um conjunto específico de <strong>Princípios</strong> e de <strong>Diretrizes</strong>. Assinale a alternativa que apresenta exclusivamente os três <strong>Princípios</strong> da Atenção Básica segundo a classificação literal da PNAB 2017:</p>
<ul>
  <li><strong>A)</strong> Regionalização, Hierarquização e Territorialização.</li>
  <li><strong>B)</strong> Universalidade, Equidade e Integralidade.</li>
  <li><strong>C)</strong> Longitudinalidade do cuidado, Coordenação do cuidado e Ordenação da rede.</li>
  <li><strong>D)</strong> Descentralização político-administrativa, Comando único e Participação da comunidade.</li>
</ul>
<p><strong>Gabarito Oficial: Alternativa B.</strong></p>
<p><strong>Comentário Analítico das Alternativas:</strong></p>
<ul>
  <li><strong>Alternativa A (Incorreta):</strong> Regionalização, Hierarquização e Territorialização/Adstrição são classificadas na PNAB 2017 como <em>Diretrizes</em> (e não Princípios) da Atenção Básica.</li>
  <li><strong>Alternativa B (Correta):</strong> A Seção I do Capítulo 1 da PNAB 2017 estabelece taxativamente que os <strong>Princípios</strong> da Atenção Básica são exatamente três: <strong>Universalidade, Equidade e Integralidade</strong>. Já as <strong>Diretrizes</strong> são nove: Regionalização e Hierarquização; Territorialização e Adstrição; População Adscrita; Cuidado Centrado na Pessoa; Resolutividade; Longitudinalidade do Cuidado; Coordenação do Cuidado; Ordenação da Rede; e Participação da Comunidade.</li>
  <li><strong>Alternativa C (Incorreta):</strong> Longitudinalidade, Coordenação e Ordenação da rede figuram na PNAB 2017 como <em>Diretrizes</em> operacionais.</li>
  <li><strong>Alternativa D (Incorreta):</strong> Descentralização com direção única e participação da comunidade são diretrizes constitucionais do SUS (Art. 198 da CF/88 e Art. 7º da Lei nº 8.080/90), sendo a Participação da Comunidade classificada como <em>Diretriz</em> na PNAB 2017.</li>
</ul>

<h3>Questão Comentada 2 — Comparativo entre eSF e eAP na PNAB (UNICAMP / SUS-SP)</h3>
<p><strong>Enunciado:</strong> Considerando as regras vigentes da Política Nacional de Atenção Básica (PNAB 2017 e Portaria GM/MS nº 2.539/2019) acerca da composição, carga horária e funcionamento das Equipes de Saúde da Família (eSF) e das Equipes de Atenção Primária (eAP), assinale a alternativa correta:</p>
<ul>
  <li><strong>A)</strong> A Equipe de Atenção Primária (eAP) substituiu a Equipe de Saúde da Família (eSF) como modelo prioritário do SUS, exigindo obrigatoriamente a presença de 6 Agentes Comunitários de Saúde em sua composição mínima.</li>
  <li><strong>B)</strong> A eAP tem como composição mínima obrigatória apenas médico e enfermeiro, dividindo-se em Modalidade I (carga horária mínima de 20h semanais por categoria e cobertura de 50% da população de uma eSF) e Modalidade II (carga horária mínima de 30h semanais por categoria e cobertura de 75% da população de uma eSF).</li>
  <li><strong>C)</strong> Na Equipe de Saúde da Família (eSF), o enfermeiro e o técnico de enfermagem podem cumprir jornada de 20 horas semanais sem necessidade de outro profissional para completar as 40 horas da categoria na equipe.</li>
  <li><strong>D)</strong> Um mesmo profissional médico pode estar cadastrado simultaneamente em até 5 Equipes de Saúde da Família no SCNES, desde que não ultrapasse 60 horas semanais.</li>
</ul>
<p><strong>Gabarito Oficial: Alternativa B.</strong></p>
<p><strong>Comentário Analítico das Alternativas:</strong></p>
<ul>
  <li><strong>Alternativa A (Incorreta):</strong> A <strong>Estratégia Saúde da Família (eSF)</strong> continua sendo expressamente a estratégia prioritária para expansão e consolidação da Atenção Básica no Brasil; além disso, na eAP a presença de ACS é facultativa (não obrigatória).</li>
  <li><strong>Alternativa B (Correta):</strong> Descreve com precisão cirúrgica as regras da Portaria nº 2.539/2019 e da PNAB para as Equipes de Atenção Primária (eAP): composição mínima de médico + enfermeiro; Modalidade I (20h semanais cada, 50% do parâmetro populacional de uma eSF) e Modalidade II (30h semanais cada, 75% do parâmetro populacional de uma eSF).</li>
  <li><strong>Alternativa C (Incorreta):</strong> Na eSF, a carga horária total de <strong>todas</strong> as categorias da composição mínima (médico, enfermeiro, técnico/auxiliar de enfermagem e ACS) deve ser obrigatoriamente de <strong>40 horas semanais por categoria na equipe</strong> (se um enfermeiro ou médico fizer 20h, é obrigatória a presença de outro profissional da mesma categoria cumprindo mais 20h naquela mesma equipe).</li>
  <li><strong>Alternativa D (Incorreta):</strong> Pela PNAB 2017, os profissionais da Atenção Básica só podem estar cadastrados no SCNES em no máximo <strong>2 (duas) equipes</strong>.</li>
</ul>

<h3>Questão Comentada 3 — Atribuições do Enfermeiro e do Médico na PNAB 2017 (Revalida INEP)</h3>
<p><strong>Enunciado:</strong> Em uma Unidade Básica de Saúde que opera sob as diretrizes da Política Nacional de Atenção Básica (PNAB 2017), surgem dúvidas durante a reunião de equipe sobre os limites legais das atribuições específicas do médico, do enfermeiro e do Agente Comunitário de Saúde. De acordo com o texto normativo da PNAB 2017, é correto afirmar que:</p>
<ul>
  <li><strong>A)</strong> Ao enfermeiro é vedado solicitar exames laboratoriais ou prescrever quaisquer medicamentos na UBS, sendo sua atuação restrita à triagem de sinais vitais e supervisão de curativos.</li>
  <li><strong>B)</strong> Cabe especificamente ao enfermeiro realizar consulta de enfermagem, procedimentos, solicitar exames complementares e prescrever medicações conforme protocolos, diretrizes clínicas e terapêuticas ou outras normativas técnicas estabelecidas pelo gestor federal, estadual, municipal ou do Distrito Federal, observadas as disposições legais da profissão.</li>
  <li><strong>C)</strong> Cabe tanto ao enfermeiro quanto ao Agente Comunitário de Saúde emitir laudo de Autorização de Internação Hospitalar (AIH) e realizar pequenas cirurgias ambulatoriais como cantoplastia e exérese de cisto sebáceo.</li>
  <li><strong>D)</strong> A realização de visitas domiciliares é atribuição exclusiva dos Agentes Comunitários de Saúde, sendo proibido que médicos e cirurgiões-dentistas se ausentem da UBS para atender pacientes acamados no território.</li>
</ul>
<p><strong>Gabarito Oficial: Alternativa B.</strong></p>
<p><strong>Comentário Analítico das Alternativas:</strong></p>
<ul>
  <li><strong>Alternativa A (Incorreta):</strong> A consulta de enfermagem com solicitação de exames e prescrição medicamentosa protocolada é um dos pilares da resolutividade da APS brasileira (no pré-natal, puericultura, ISTs, tuberculose, hanseníase, hipertensão, diabetes e saúde da mulher).</li>
  <li><strong>Alternativa B (Correta):</strong> Reproduz literalmente o item 4.2.1 (Atribuições específicas do Enfermeiro) do Anexo XXII da Portaria de Consolidação nº 2 (PNAB 2017), exigindo apenas que a solicitação de exames e a prescrição de medicamentos pelo enfermeiro obedeçam a protocolos ou normativas técnicas oficiais do gestor (federal, estadual, municipal ou DF).</li>
  <li><strong>Alternativa C (Incorreta):</strong> A realização de pequenas cirurgias ambulatoriais e a indicação de internação hospitalar são atribuições específicas do <em>médico</em> na PNAB.</li>
  <li><strong>Alternativa D (Incorreta):</strong> A realização de visitas domiciliares e atendimentos em domicílio consta na PNAB 2017 como <strong>atribuição comum a todos os membros da equipe</strong> (incluindo médicos, enfermeiros, dentistas, técnicos e ACS).</li>
</ul>

<h3>Questão Comentada 4 — Gerente de Atenção Básica e Horário de Funcionamento da UBS (PSU-MG / UFMG)</h3>
<p><strong>Enunciado:</strong> A Política Nacional de Atenção Básica (Portaria GM/MS nº 2.436/2017) introduziu diretrizes específicas sobre o funcionamento das Unidades Básicas de Saúde (UBS) e sobre a figura do <strong>Gerente de Atenção Básica</strong>. A respeito desses temas na PNAB 2017, assinale a alternativa correta:</p>
<ul>
  <li><strong>A)</strong> O Gerente de Atenção Básica deve ser um profissional de nível superior com carga horária de 40 horas semanais, sendo vedado que ele faça parte de qualquer equipe assistencial vinculada à UBS que gerencia.</li>
  <li><strong>B)</strong> Qualquer Agente Comunitário de Saúde de nível médio pode acumular a função de Gerente de Atenção Básica da UBS durante meio período (20 horas semanais), mantendo suas visitas na microárea no outro turno.</li>
  <li><strong>C)</strong> A PNAB 2017 recomenda que as UBS funcionem apenas 20 horas semanais, fechando obrigatoriamente durante duas horas no intervalo de almoço e durante o mês de janeiro para férias coletivas.</li>
  <li><strong>D)</strong> A PNAB 2017 obriga os municípios a manterem nomes diferentes para os estabelecimentos conforme o tipo de equipe ("Posto de Assistência" para eAP e "Clínica da Família" para eSF), proibindo o uso do nome Unidade Básica de Saúde (UBS).</li>
</ul>
<p><strong>Gabarito Oficial: Alternativa A.</strong></p>
<p><strong>Comentário Analítico das Alternativas:</strong></p>
<ul>
  <li><strong>Alternativa A (Correta):</strong> Conforme a PNAB 2017, o Gerente de Atenção Básica deve possuir nível superior, cumprir 40 horas semanais e <strong>não integrar nenhuma equipe assistencial vinculada à UBS</strong>, justamente para dedicar-se integralmente à gestão administrativa, de insumos, ambiência e fluxos da unidade.</li>
  <li><strong>Alternativa B (Incorreta):</strong> Exige-se nível superior, 40h semanais e dedicação exclusiva à gerência (sem compor equipe assistencial da UBS).</li>
  <li><strong>Alternativa C (Incorreta):</strong> Recomenda-se funcionamento mínimo de <strong>40 horas semanais, no mínimo 5 dias por semana e nos 12 meses do ano</strong>, evitando fechar no horário de almoço.</li>
  <li><strong>Alternativa D (Incorreta):</strong> A PNAB 2017 recomenda expressamente a padronização de todas as unidades sob a denominação única de <strong>Unidade Básica de Saúde (UBS)</strong>.</li>
</ul>

<h3>Questão Comentada 5 — Equipes para Populações Específicas: Consultório na Rua, Ribeirinhas e Fluviais (SUS-BA / UFBA)</h3>
<p><strong>Enunciado:</strong> Para assegurar o princípio da Equidade a grupos populacionais com especificidades territoriais ou vulnerabilidades extremas, a PNAB regulamenta as Equipes de Consultório na Rua (eCR), as Equipes de Saúde da Família Ribeirinhas (eSFR) e as Equipes de Saúde da Família Fluviais (eSFF). Sobre essas modalidades, assinale a alternativa correta:</p>
<ul>
  <li><strong>A)</strong> As Equipes de Consultório na Rua (eCR) organizam-se em três modalidades (I, II e III), sendo a presença do profissional médico obrigatória apenas na Modalidade III, e desenvolvem suas ações <em>in loco</em> de forma itinerante e articulada à UBS e à RAPS.</li>
  <li><strong>B)</strong> As Unidades Básicas de Saúde Fluviais (UBSF) são exclusivas para capitais litorâneas da Região Sudeste e Sul, sendo proibida sua implantação na Amazônia Legal ou no Pantanal.</li>
  <li><strong>C)</strong> Para que uma pessoa em situação de rua seja atendida pela Equipe de Consultório na Rua ou por uma UBS, a PNAB exige a apresentação prévia de comprovante de endereço de um parente e certidão negativa de antecedentes criminais.</li>
  <li><strong>D)</strong> As Equipes de Saúde da Família Ribeirinhas (eSFR) não podem contar com embarcações de pequeno porte nem com pontos de apoio terrestres para técnicos de enfermagem e microscopistas.</li>
</ul>
<p><strong>Gabarito Oficial: Alternativa A.</strong></p>
<p><strong>Comentário Analítico das Alternativas:</strong></p>
<ul>
  <li><strong>Alternativa A (Correta):</strong> As eCR dividem-se em Modalidade I (4 profissionais: 2 superiores e 2 médios), Modalidade II (6 profissionais: 3 superiores e 3 médios) e Modalidade III (Modalidade II acrescida obrigatoriamente de 1 médico), atuando <em>in loco</em> com a população em situação de rua.</li>
  <li><strong>Alternativa B (Incorreta):</strong> As UBS Fluviais (eSFF) e as equipes Ribeirinhas (eSFR) destinam-se prioritariamente à <strong>Amazônia Legal e ao Pantanal Sul-Mato-Grossense</strong>.</li>
  <li><strong>Alternativa C (Incorreta):</strong> É estritamente proibido exigir comprovante de residência ou negar atendimento por falta de documentos à população em situação de rua (Portaria nº 940/2011 e PNAB).</li>
  <li><strong>Alternativa D (Incorreta):</strong> As eSFR recebem custeio federal adicional justamente para manter até 4 embarcações de pequeno porte, até 4 unidades/pontos de apoio satélites e profissionais adicionais (técnicos de enfermagem, ACS e microscopistas).</li>
</ul>

<h3>Questão Comentada 6 — Atribuições do ACS e do ACE segundo a Lei nº 13.595/2018 e PNAB 2017 (FAMERP / UNESP)</h3>
<p><strong>Enunciado:</strong> A Lei Federal nº 13.595/2018 (que alterou a Lei nº 11.350/2006) e a Política Nacional de Atenção Básica (PNAB 2017) redefiniram o escopo de atuação e a integração entre os Agentes Comunitários de Saúde (ACS) e os Agentes de Combate às Endemias (ACE). Assinale a alternativa correta sobre essa regulamentação:</p>
<ul>
  <li><strong>A)</strong> O ACS e o ACE devem atuar em bases geográficas completamente separadas e incomunicáveis, sendo proibido que o ACS registre focos de vetores ou que o ACE participe de reuniões na UBS.</li>
  <li><strong>B)</strong> O ACS que houver concluído curso técnico e dispuser dos equipamentos adequados, assistido por profissional de nível superior da equipe, pode realizar em caráter excepcional no domicílio a aferição da pressão arterial, a medição de glicemia capilar, a aferição de temperatura axilar e a verificação antropométrica.</li>
  <li><strong>C)</strong> A partir da PNAB 2017, o ACS passou a ter autorização legal para realizar suturas simples, prescrever anti-hipertensivos e aplicar vacinas intramusculares no domicílio sem supervisão de enfermagem.</li>
  <li><strong>D)</strong> O requisito de escolaridade mínima para ingresso na carreira de ACS ou ACE na legislação atual é o ensino fundamental incompleto, sem exigência de curso introdutório.</li>
</ul>
<p><strong>Gabarito Oficial: Alternativa B.</strong></p>
<p><strong>Comentário Analítico das Alternativas:</strong></p>
<ul>
  <li><strong>Alternativa A (Incorreta):</strong> A PNAB 2017 determinou a <strong>integração obrigatória</strong> entre ACS e ACE sob base geográfica comum e planejamento integrado na UBS.</li>
  <li><strong>Alternativa B (Correta):</strong> Reproduz exatamente as atividades incorporadas pela PNAB 2017 e pela Lei nº 13.595/2018 ao ACS devidamente habilitado com curso técnico e assistido por profissional de nível superior: aferição de PA, glicemia capilar, temperatura axilar, antropometria (peso/altura) e orientação/apoio na administração de medicamentos em domicílio.</li>
  <li><strong>Alternativa C (Incorreta):</strong> Suturas e prescrição médica ampla cabem ao médico (ou prescrição por protocolo ao enfermeiro), e vacinação parenteral cabe à equipe de enfermagem; tais atos são vedados ao ACS.</li>
  <li><strong>Alternativa D (Incorreta):</strong> A Lei nº 11.350/2006 exige conclusão do <strong>ensino médio</strong> e conclusão com aproveitamento de curso de formação inicial com carga horária mínima de 40 horas.</li>
</ul>

<h3>Questão Comentada 7 — Responsabilidades das Esferas de Gestão e Suspensão de Recursos na PNAB (UNIFESP)</h3>
<p><strong>Enunciado:</strong> A respeito da divisão de responsabilidades entre União, Estados e Municípios na Política Nacional de Atenção Básica (PNAB 2017) e das hipóteses de suspensão do repasse federal de custeio das equipes, assinale a alternativa correta:</p>
<ul>
  <li><strong>A)</strong> Compete exclusivamente ao Ministério da Saúde selecionar, contratar, remunerar e definir a escala de férias de todos os médicos, enfermeiros e ACS das Unidades Básicas de Saúde do país.</li>
  <li><strong>B)</strong> As Secretarias Estaduais de Saúde não possuem qualquer responsabilidade de cofinanciamento nem de apoio institucional à Atenção Básica, visto que a atenção primária é 100% municipalizada.</li>
  <li><strong>C)</strong> O Ministério da Saúde pode suspender a transferência dos incentivos financeiros referentes à equipe caso ocorra ausência de qualquer um dos profissionais da composição mínima por período superior a 60 dias (duas competências consecutivas do SCNES) ou ausência de envio de dados ao SISAB por 3 competências consecutivas.</li>
  <li><strong>D)</strong> O cadastramento mensal dos profissionais no SCNES e a alimentação do e-SUS APS / SISAB são facultativos para municípios com menos de 50.000 habitantes.</li>
</ul>
<p><strong>Gabarito Oficial: Alternativa C.</strong></p>
<p><strong>Comentário Analítico das Alternativas:</strong></p>
<ul>
  <li><strong>Alternativa A (Incorreta):</strong> Selecionar, contratar, remunerar a força de trabalho e gerenciar diretamente as UBS é competência específica das <strong>Secretarias Municipais de Saúde (e do DF)</strong>.</li>
  <li><strong>Alternativa B (Incorreta):</strong> O financiamento da Atenção Básica é <strong>tripartite</strong> (União, Estados e Municípios), cabendo às Secretarias Estaduais de Saúde destinar recursos estaduais regulares, pactuar normas na CIB e prestar apoio institucional aos municípios.</li>
  <li><strong>Alternativa C (Correta):</strong> Retrata com fidelidade os prazos normativos da PNAB 2017 / Portaria de Consolidação nº 6 para suspensão de custeio: vacância de profissional obrigatório por &gt; 60 dias (2 competências do SCNES) ou falta de envio de informação ao SISAB por 3 competências consecutivas.</li>
  <li><strong>Alternativa D (Incorreta):</strong> A manutenção atualizada do SCNES e o envio mensal ao SISAB são obrigatórios para 100% dos municípios brasileiros, independentemente do porte populacional.</li>
</ul>

<h3>Questão Comentada 8 — Equipes de Saúde Bucal (eSB) e Programa Saúde na Hora (ENARE / UFRJ)</h3>
<p><strong>Enunciado:</strong> Um município de grande porte decide aderir ao formato "UBS 60 Horas com Saúde Bucal" do Programa Saúde na Hora, ampliando o atendimento de uma Unidade Básica de Saúde que possui Equipes de Saúde da Família (eSF) e Equipes de Saúde Bucal (eSB) Modalidade II. De acordo com a PNAB e as normativas do Programa Saúde na Hora, qual é a composição da eSB Modalidade II e qual é o requisito mínimo de funcionamento e de equipes para o formato "UBS 60 Horas com Saúde Bucal"?</p>
<ul>
  <li><strong>A)</strong> A eSB Modalidade II é composta por 1 Cirurgião-Dentista, 1 Técnico em Saúde Bucal (TSB) e 1 Auxiliar em Saúde Bucal (ASB) (ou outro TSB); o formato UBS 60 Horas com Saúde Bucal exige funcionamento mínimo de 60h semanais (sem fechar no almoço) com no mínimo 3 eSF e 2 eSB.</li>
  <li><strong>B)</strong> A eSB Modalidade II é composta apenas por 1 Cirurgião-Dentista sem profissionais auxiliares; o formato UBS 60 Horas exige apenas 1 eSF funcionando das 08h às 17h de segunda a sexta-feira.</li>
  <li><strong>C)</strong> A eSB Modalidade I exige 2 Cirurgiões-Dentistas e 3 Técnicos de Prótese Dentária dentro da UBS, funcionando 24 horas por dia como pronto-socorro odontológico.</li>
  <li><strong>D)</strong> No Programa Saúde na Hora, a UBS é obrigada a fechar das 12h às 14h para horário de almoço, compensando as horas aos domingos.</li>
</ul>
<p><strong>Gabarito Oficial: Alternativa A.</strong></p>
<p><strong>Comentário Analítico das Alternativas:</strong></p>
<ul>
  <li><strong>Alternativa A (Correta):</strong> Na PNAB, a eSB Modalidade I tem 2 profissionais (1 Cirurgião-Dentista + 1 TSB <em>ou</em> 1 ASB), enquanto a <strong>eSB Modalidade II</strong> tem 3 profissionais (1 Cirurgião-Dentista + 1 TSB + 1 ASB ou outro TSB). No Saúde na Hora, o formato "UBS 60h com Saúde Bucal" exige funcionamento ininterrupto de no mínimo 60h semanais (12h/dia de segunda a sexta, ou 11h/dia de segunda a sexta + 5h no fim de semana, sem fechar no almoço) e presença mínima de <strong>3 eSF e 2 eSB</strong>.</li>
  <li><strong>Alternativa B (Incorreta):</strong> Não existe eSB sem auxiliar/técnico, e 8h às 17h soma apenas 45h semanais.</li>
  <li><strong>Alternativa C (Incorreta):</strong> A eSB Modalidade I possui apenas 1 dentista e 1 auxiliar/técnico, e a UBS não funciona 24h como UPA.</li>
  <li><strong>Alternativa D (Incorreta):</strong> Regra pétrea do Saúde na Hora é o funcionamento <strong>ininterrupto sem fechamento no intervalo de almoço</strong>, garantindo acesso ao trabalhador nesse horário.</li>
</ul>

<h3>Questão Comentada 9 — Educação Permanente em Saúde versus Educação Continuada (UNICAMP / IAMSPE)</h3>
<p><strong>Enunciado:</strong> Durante a reunião semanal de uma Equipe de Saúde da Família, os profissionais analisam o alto índice de abandono do tratamento de tuberculose e de sífilis em gestantes na Microárea 04. A partir dessa problematização concreta do próprio processo de trabalho, médicos, enfermeiros, técnicos de enfermagem, ACS e farmacêutico da eMulti estudam juntos o protocolo ministerial, identificam falhas no fluxo de acolhimento dos parceiros sexuais e na oferta do Tratamento Diretamente Observado, e redesenham a rotina assistencial da unidade. Segundo a PNAB 2017 e a Política Nacional de Educação Permanente em Saúde, essa prática pedagógica caracteriza-se como:</p>
<ul>
  <li><strong>A)</strong> Educação Continuada tradicional, por ocorrer fora do ambiente de trabalho e ser voltada exclusivamente à atualização teórica uniprofissional dos médicos.</li>
  <li><strong>B)</strong> Educação Permanente em Saúde (EPS), pois parte da problematização do processo de trabalho real, envolve a equipe multiprofissional no cotidiano do serviço e tem como finalidade transformar as práticas e a organização do cuidado.</li>
  <li><strong>C)</strong> Educação Bancária, visto que deposita conhecimentos verticais nos usuários sem participação dos trabalhadores.</li>
  <li><strong>D)</strong> Estágio probatório administrativo, desvinculado da gestão da clínica e da vigilância em saúde.</li>
</ul>
<p><strong>Gabarito Oficial: Alternativa B.</strong></p>
<p><strong>Comentário Analítico das Alternativas:</strong></p>
<ul>
  <li><strong>Alternativa A (Incorreta):</strong> A Educação Continuada é tipicamente uniprofissional, acadêmica, fragmentada e externa ao processo de trabalho.</li>
  <li><strong>Alternativa B (Correta):</strong> A <strong>Educação Permanente em Saúde (EPS)</strong> é a aprendizagem no trabalho, pelo trabalho e para o trabalho: utiliza a problematização dos nós críticos reais da equipe multiprofissional (neste caso, o abandono de tratamento de TB e sífilis na microárea) para produzir aprendizagem significativa e reorganizar o próprio processo assistencial.</li>
  <li><strong>Alternativa C (Incorreta):</strong> A educação bancária (criticada por Paulo Freire) é a transmissão vertical e passiva de conteúdos, oposta à problematização coletiva.</li>
  <li><strong>Alternativa D (Incorreta):</strong> Trata-se da essência pedagógica da EPS integrada à vigilância epidemiológica na APS.</li>
</ul>

<h3>Questão Comentada 10 — Parâmetros de Cadastro e IED na Portaria GM/MS nº 3.493/2024 (ENARE / SES-PE)</h3>
<p><strong>Enunciado:</strong> Com a publicação da Portaria GM/MS nº 3.493/2024, o Ministério da Saúde substituiu o modelo do Previne Brasil por uma nova metodologia de cofinanciamento federal da Atenção Primária à Saúde. A respeito do <strong>Índice de Equidade e Dimensionamento (IED)</strong> e dos novos parâmetros de população vinculada por Equipe de Saúde da Família (eSF) estabelecidos nessa portaria, assinale a alternativa correta:</p>
<ul>
  <li><strong>A)</strong> O IED classifica os municípios em 4 estratos a partir do Índice de Vulnerabilidade Social (IVS/IPEA) e do porte populacional (IBGE), destinando maiores valores no Componente Fixo às equipes dos municípios de maior vulnerabilidade (Estrato 1), e o parâmetro de cadastro por eSF varia de 2.000 pessoas (municípios até 20 mil hab.) a 3.000 pessoas (municípios acima de 100 mil hab.).</li>
  <li><strong>B)</strong> O IED premia financeiramente os municípios mais ricos (Estrato 4) com o dobro do valor fixo pago aos municípios mais pobres (Estrato 1), fixando o parâmetro único de 5.000 pessoas por eSF em todo o território nacional.</li>
  <li><strong>C)</strong> A Portaria nº 3.493/2024 extinguiu o financiamento das Equipes de Saúde Bucal (eSB) e dos Agentes Comunitários de Saúde (ACS), transferindo esses recursos para o bloco hospitalar de média e alta complexidade.</li>
  <li><strong>D)</strong> No Componente de Vínculo e Acompanhamento Territorial, os beneficiários do Bolsa Família/BPC, as crianças até 5 anos e as pessoas idosas com 60 anos ou mais têm peso reduzido (0,5x) em comparação aos adultos jovens de alta renda.</li>
</ul>
<p><strong>Gabarito Oficial: Alternativa A.</strong></p>
<p><strong>Comentário Analítico das Alternativas:</strong></p>
<ul>
  <li><strong>Alternativa A (Correta):</strong> Descreve com exatidão os parâmetros da Portaria GM/MS nº 3.493/2024: o IED cruza IVS (IPEA) e porte populacional (IBGE) em 4 estratos (sendo o Estrato 1 o mais vulnerável e com maior repasse fixo por equipe), e os parâmetros populacionais de referência por eSF foram reduzidos para 2.000 (até 20 mil hab.), 2.500 (20 a 50 mil hab.), 2.750 (50 a 100 mil hab.) e 3.000 pessoas (acima de 100 mil hab.).</li>
  <li><strong>Alternativa B (Incorreta):</strong> Inverte o princípio da equidade (o Estrato 1 recebe mais que o Estrato 4) e inventa um parâmetro de 5.000 pessoas inexistente na norma.</li>
  <li><strong>Alternativa C (Incorreta):</strong> A Portaria nº 3.493/2024 fortaleceu e destacou os componentes específicos de Saúde Bucal e de programas/ACS/eMulti dentro do Bloco de Manutenção da APS.</li>
  <li><strong>Alternativa D (Incorreta):</strong> Pessoas vulneráveis socioeconomicamente (Bolsa Família/BPC), crianças até 5 anos e idosos &ge; 60 anos possuem <strong>peso maior (ponderação positiva)</strong> no cálculo do Componente de Vínculo e Acompanhamento Territorial.</li>
</ul>

<h3>Síntese Executiva de Alta Retenção para Provas de Residência</h3>
<ul>
  <li><strong>Edições da PNAB:</strong> 1ª Edição = Portaria nº 648/2006 (mudou PSF para ESF); 2ª Edição = Portaria nº 2.488/2011 (criou Consultório na Rua, eSFR/UBSF, PMAQ-AB e flexibilizou CH médica); 3ª Edição (Vigente) = <strong>Portaria GM/MS nº 2.436/2017</strong> (consolidada no Anexo XXII da Portaria de Consolidação nº 2/2017).</li>
  <li><strong>Princípios (3) vs. Diretrizes (9) na PNAB 2017:</strong> Princípios = <em>Universalidade, Equidade e Integralidade</em>. Diretrizes = <em>Regionalização e Hierarquização; Territorialização e Adstrição; População Adscrita; Cuidado Centrado na Pessoa; Resolutividade; Longitudinalidade do Cuidado; Coordenação do Cuidado; Ordenação da Rede; Participação da Comunidade</em>.</li>
  <li><strong>eSF vs. eAP:</strong> eSF (prioritária) = Médico + Enfermeiro + Técnico/Auxiliar Enf. + ACS (todos 40h/semana por categoria, até 3 profissionais por categoria com mínimo de 20h cada; máximo de 2 equipes por profissional no SCNES). eAP (complementar) = Médico + Enfermeiro (Modalidade I: 20h cada, 50% da pop. de eSF; Modalidade II: 30h cada, 75% da pop. de eSF).</li>
  <li><strong>Suspensão de Repasses Federais (PNAB 2017):</strong> Vacância de profissional mínimo obrigatório por &gt; 60 dias (2 competências do SCNES), descumprimento de carga horária, ausência de envio ao SISAB por 3 competências consecutivas ou fraude/irregularidade auditada.</li>
</ul>
`
  }
);

bookPnab.references = [
  {
    label: 'BRASIL. Ministério da Saúde. Portaria GM/MS nº 2.436, de 21 de setembro de 2017. Aprova a Política Nacional de Atenção Básica, estabelecendo a revisão de diretrizes para a organização da Atenção Básica no âmbito do SUS.',
    url: 'https://bvsms.saude.gov.br/bvs/saudelegis/gm/2017/prt2436_22_09_2017.html'
  },
  {
    label: 'BRASIL. Ministério da Saúde. Portaria de Consolidação GM/MS nº 2, de 28 de setembro de 2017. Consolidação das normas sobre as políticas nacionais de saúde do SUS (Anexo XXII — PNAB).',
    url: 'https://bvsms.saude.gov.br/bvs/saudelegis/gm/2017/prc0002_03_10_2017.html'
  },
  {
    label: 'BRASIL. Ministério da Saúde. Portaria GM/MS nº 3.493, de 10 de abril de 2024. Altera a Portaria de Consolidação GM/MS nº 6/2017 para instituir nova metodologia de cofinanciamento federal do Piso de Atenção Primária à Saúde.',
    url: 'https://www.in.gov.br/en/web/dou/-/portaria-gm/ms-n-3.493-de-10-de-abril-de-2024-553573811'
  },
  {
    label: 'BRASIL. Presidência da República. Lei nº 13.595, de 5 de janeiro de 2018 (Lei Ruth Brilhante). Altera a Lei nº 11.350/2006 para dispor sobre a reformulação das atribuições dos Agentes Comunitários de Saúde e Agentes de Combate às Endemias.',
    url: 'https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13595.htm'
  },
  {
    label: 'BRASIL. Ministério da Saúde. Carteira de Serviços da Atenção Primária à Saúde (CaSAPS): versão profissionais de saúde e gestores. Brasília: Ministério da Saúde, 2020.',
    url: 'https://bvsms.saude.gov.br/bvs/publicacoes/carteira_servicos_atencao_primaria_saude.pdf'
  },
  {
    label: 'BRASIL. Ministério da Saúde. Portaria GM/MS nº 635, de 22 de maio de 2023. Institui, define e cria incentivo financeiro federal de implantação, custeio e desempenho para as modalidades de equipes Multiprofissionais na Atenção Primária à Saúde (eMulti).',
    url: 'https://www.in.gov.br/en/web/dou/-/portaria-gm/ms-n-635-de-22-de-maio-de-2023-484773799'
  }
];

saveBook(bookPnab);
