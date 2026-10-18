// scripts/bloco-07-builders/build-150-part1.mjs

export const sec1 = {
  id: "envelhecimento-populacional-e-transicao-demografica-epidemiologica",
  title: "1. Envelhecimento Populacional e Transição Demográfica e Epidemiológica no Brasil",
  body_html: `
<h3>1.1 A Rápida Transição Demográfica Brasileira: Do País Jovem à Nação Envelhecida</h3>
<p>O Brasil experimenta um dos processos de envelhecimento populacional mais acelerados e dramáticos da história demográfica mundial contemporânea. Enquanto as nações europeias e a América do Norte levaram mais de um século para transitar de uma estrutura etária jovem para uma sociedade predominantemente idosa — permitindo que o desenvolvimento econômico, a infraestrutura urbana e os sistemas de seguridade social amadurecessem paralelamente —, o Brasil realizou essa mesma transição em menos de quatro décadas. O país envelheceu antes de enriquecer, defrontando-se com o desafio de prover atenção geriátrica de alta complexidade em um contexto de desigualdade social crônica e subfinanciamento do Sistema Único de Saúde (SUS).</p>

<p>A dinâmica demográfica brasileira é impulsionada por dois motores bioestatísticos complementares:</p>
<ol>
  <li><strong>Queda Vertiginosa da Taxa de Fecundidade Total (TFT):</strong> Na década de 1960, a taxa de fecundidade no Brasil era de aproximadamente 6,3 filhos por mulher em idade fértil. A urbanização acelerada, a inserção massiva da mulher no mercado de trabalho formal, o acesso ampliado à contracepção moderna e as transformações socioculturais provocaram um declínio abrupto da fecundidade, que atingiu cerca de 1,55 filho por mulher no Censo Demográfico do IBGE de 2022 — patamar substancialmente inferior à taxa de reposição populacional mínima (2,1 filhos por mulher). Como resultado, a base da pirâmide etária estreitou-se rapidamente.</li>
  <li><strong>Aumento Expressivo da Esperança de Vida ao Nascer:</strong> Os avanços sanitários, o saneamento básico, a expansão da Atenção Primária à Saúde com a Estratégia Saúde da Família, a vacinação em massa e os progressos terapêuticos cardiovasculares elevaram a expectativa de vida média do brasileiro de 45 anos na década de 1940 para mais de 76 a 77 anos na atualidade.</li>
</ol>

<div class="clinical-box highlight">
  <h4>Conceitos Demográficos e Indicadores Cardinais (Exigência em Concursos)</h4>
  <ul>
    <li><strong>Definição Legal e Operacional de Pessoa Idosa:</strong> No Brasil, pelo Estatuto da Pessoa Idosa (Lei nº 10.741/2003) e pela Organização Mundial da Saúde (OMS) para países em desenvolvimento, considera-se pessoa idosa o indivíduo com <strong>idade igual ou superior a 60 anos</strong> (em países desenvolvidos, a linha de corte tradicional é de 65 anos).</li>
    <li><strong>Prioridade Especial / Superidosos:</strong> A Lei nº 13.466/2017 introduziu a chamada <em>prioridade especial</em> para pessoas idosas com <strong>mais de 80 anos de idade</strong>, garantindo preferência no atendimento em serviços de saúde e órgãos públicos em relação aos demais idosos (exceto em casos de emergência médica triados por protocolo de Manchester).</li>
    <li><strong>Índice de Envelhecimento (IE):</strong> Relação matemática entre o número de pessoas idosas (&ge; 60 anos) e a população de jovens (&lt; 15 anos):
      <br>$$\\text{IE} = \\frac{\\text{População } \\ge 60 \\text{ anos}}{\\text{População de 0 a 14 anos}} \\times 100$$
      No Brasil, o índice de envelhecimento saltou de menos de 10 idosos por 100 jovens na década de 1970 para mais de 80 idosos por 100 jovens nos anos 2020, caminhando rapidamente para superar 100 idosos por 100 jovens até o final desta década.
    </li>
    <li><strong>Razão de Dependência Total (RDT):</strong> Mede o peso econômico potencial da população inativa sobre a população em idade ativa (PIA: 15 a 59 anos):
      <br>$$\\text{RDT} = \\frac{\\text{População de 0-14 anos} + \\text{População } \\ge 60 \\text{ anos}}{\\text{População de 15 a 59 anos}} \\times 100$$
      O esgotamento do chamado 'Bônus Demográfico' impõe sobrecarga sobre os sistemas previdenciários e sobre a Atenção Primária, que precisa se reestruturar para manejar a multimorbidade crônica.</li>
  </ul>
</div>

<h3>1.2 A Transição Epidemiológica: Da Tripla Carga de Doenças à Multimorbidade</h3>
<p>Diferentemente dos países ricos, que vivenciaram uma substituição sucessiva e ordenada das doenças infecciosas pelas doenças crônicas não transmissíveis (DCNT), o Brasil apresenta um modelo de <strong>transição epidemiológica sobreposta e polarizada</strong>, caracterizado pela <em>Tripla Carga de Doenças</em> que coexistem simultaneamente no território de saúde:</p>
<ul>
  <li><strong>1. Agenda Inconclusa de Doenças Infecciosas, Carenciais e de Saúde Materno-Infantil:</strong> Persistência de tuberculose, hanseníase, sífilis congênita, diarreia infecciosa, desnutrição e mortalidade materna evitável em bolsões de pobreza.</li>
  <li><strong>2. Epidemia Consolidada de Doenças Crônicas Não Transmissíveis (DCNT):</strong> Predomínio absoluto de morbimortalidade por hipertensão arterial sistêmica, insuficiência cardíaca, doença cerebrovascular (AVC), diabetes mellitus tipo 2, doença renal crônica, doença pulmonar obstrutiva crônica (DPOC), neoplasias malignas e demências neurodegenerativas.</li>
  <li><strong>3. Carga Crescente de Causas Externas:</strong> Violência urbana, homicídios, acidentes de trânsito e, na população idosa, acidentes domésticos e quedas graves com fraturas osteoporóticas.</li>
</ul>

<h3>1.3 Senescência versus Senilidade: A Fronteira Clínica Fundamental</h3>
<p>Um dos erros conceituais mais perniciosos na prática clínica médica é o <em>idadismo</em> (ou etarismo) — a tendência reducionista e iatrogênica de atribuir qualquer declínio cognitivo, incontinência urinária ou marcha instável à 'idade avançada':</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Dimensão Biológica</th>
      <th>Senescência (Envelhecimento Fisiológico Normal)</th>
      <th>Senilidade (Envelhecimento Patológico)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Conceito Central</strong></td>
      <td>Conjunto de alterações anatômicas, celulares e fisiológicas previsíveis decorrentes da passagem do tempo, sem prejuízo da autonomia e independência básica.</td>
      <td>Instalação de doenças crônicas, síndromes geriátricas ou agravos que determinam incapacidade funcional, dependência de terceiros e sofrimento.</td>
    </tr>
    <tr>
      <td><strong>Sistema Cardiovascular</strong></td>
      <td>Enrijecimento das artérias elásticas centrais por perda de elastina e deposição de colágeno; elevação fisiológica discreta da PAS com PAD estável/reduzida (aumento da pressão de pulso); hipertrofia miocárdica concêntrica discreta do VE; declínio da resposta beta-adrenérgica ao esforço físico.</td>
      <td>Hipertensão arterial estágio 3 não controlada; insuficiência cardíaca com fração de ejeção preservada ou reduzida sintomática; estenose aórtica calcificada grave sintomática; fibrilação atrial.</td>
    </tr>
    <tr>
      <td><strong>Sistema Nervoso Central e Cognição</strong></td>
      <td>Lentificação sutil da velocidade de processamento de informações e do tempo de reação psicomotor; dificuldade discreta para evocar nomes próprios não habituais com preservação da memória semântica e consolidação; capacidade preservada de aprender novas habilidades e tomar decisões autônomas.</td>
      <td>Comprometimento Cognitivo Leve (CCL) amnésico ou multidomínio; Transtorno Neurocognitivo Maior (Demência de Alzheimer, Demência Vascular, Demência por Corpos de Lewy, Degeneração Lobar Frontotemporal); afasia, apraxia, agnosia e desorientação têmporo-espacial.</td>
    </tr>
    <tr>
      <td><strong>Trato Geniturinário</strong></td>
      <td>Declínio progressivo da Taxa de Filtração Glomerular (queda média de 0,8 a 1,0 mL/min/1,73m² por ano após os 40 anos); redução da capacidade de concentração urinária e da resposta à sede; atrofia de mucosa urogenital por hipoestrogenismo; hiperplasia prostática histológica benigna.</td>
      <td>Incontinência urinária franca (de urgência, esforço ou transbordamento) que limita atividades sociais; insuficiência renal dialítica; retenção urinária aguda com hidronefrose obstrutiva.</td>
    </tr>
    <tr>
      <td><strong>Sistema Locomotor</strong></td>
      <td>Redução gradual da massa muscular esquelética (cerca de 1% ao ano após os 50 anos) e da velocidade de caminhada, compensável por treino resistido e boa nutrição.</td>
      <td><strong>Sarcopenia grave</strong> (perda drástica de massa, força e desempenho muscular); <strong>Osteoporose severa</strong> com fraturas de baixo impacto (fêmur proximal, rádio distal, vértebras colapsadas); quedas de repetição.</td>
    </tr>
  </tbody>
</table>
`
};

export const sec2 = {
  id: "politica-nacional-de-saude-da-pessoa-idosa-pnspi",
  title: "2. Política Nacional de Saúde da Pessoa Idosa (PNSPI): Paradigmas da Capacidade Funcional e Diretrizes Operacionais",
  body_html: `
<h3>2.1 A Reorientação do Conceito de Saúde no Idoso: A Centralidade da Capacidade Funcional</h3>
<p>Instituída pela <strong>Portaria GM/MS nº 2.528/2006</strong>, a <strong>Política Nacional de Saúde da Pessoa Idosa (PNSPI)</strong> operou uma revolução epistemológica na gerontologia pública brasileira ao redefinir o próprio conceito de 'saúde' na velhice. No idoso, a saúde não é medida pela presença ou ausência de doenças crônicas, mas sim pelo grau de <strong>Capacidade Funcional</strong> — isto é, a habilidade de gerir a própria vida e tomar decisões de forma independente e autônoma, participando ativamente da vida comunitária.</p>

<p>Um indivíduo de 75 anos portador de hipertensão arterial, diabetes mellitus controlado, artrose de joelhos e hipotireoidismo que vive sozinho, cozinha suas refeições, administra sua medicação, gere seu dinheiro e passeia com amigos é considerado um <strong>idoso hígido e funcionalmente independente</strong>. Em contrapartida, um indivíduo de 68 anos sem diagnósticos clínicos prévios que sofre um AVC isquêmico extenso e evolui com hemiplegia, disfagia e imobilismo no leito tornou-se um <strong>idoso frágil e dependente</strong>. O foco da prática médica na APS migra da cura para a <strong>preservação e recuperação da capacidade funcional</strong>.</p>

<div class="clinical-box highlight">
  <h4>Autonomia versus Independência: A Dualidade Essencial da Funcionalidade</h4>
  <ul>
    <li><strong>Autonomia (Dimensão Decisória / Cognitiva e Volitiva):</strong> Capacidade individual de autogoverno, liberdade de escolha, julgamento e autodeterminação. Envolve a tomada de decisões sobre sua própria vida, seu corpo, suas finanças e seus tratamentos de saúde. <em>Condição que compromete primariamente a autonomia:</em> Síndromes demenciais avançadas, delirium, transtornos psiquiátricos com psicose.</li>
    <li><strong>Independência (Dimensão Executora / Motora e Física):</strong> Capacidade física e motora de realizar as atividades cotidianas sem o auxílio mecânico ou humano de terceiros. Envolve caminhar, alimentar-se, vestir-se, transferir-se. <em>Condição que compromete a independência com preservação da autonomia:</em> Sequela motora isolada de AVC (hemiplegia com cognição intacta), tetraplegia por trauma, osteoartrose grave avançada, cegueira bilateral. O paciente não consegue executar a ação fisicamente, mas mantém perfeita capacidade de decidir e delegar.</li>
  </ul>
</div>

<h3>2.2 Diretrizes Operacionais Estruturantes da PNSPI</h3>
<p>A PNSPI elenca diretrizes estratégicas que orientam as ações das equipes da Estratégia Saúde da Família e dos gestores municipais do SUS:</p>
<ul>
  <li><strong>Promoção do Envelhecimento Ativo e Saudável:</strong> Estímulo à manutenção da atividade física contínua, alimentação balanceada, engajamento social, convivência comunitária intergeracional e aprendizagem ao longo de toda a vida.</li>
  <li><strong>Atenção Integral e Integrada à Saúde da Pessoa Idosa:</strong> Garantia de linhas de cuidado continuadas que articulam a Atenção Primária, os Centros de Convivência, os Ambulatórios Médicos de Especialidades (AME), as Unidades de Pronto Atendimento (UPA), os hospitais gerais e geriátricos e a Atenção Domiciliar (Programa Melhor em Casa).</li>
  <li><strong>Estímulo às Ações Intersetoriais:</strong> Parcerias estreitas entre o setor saúde, a assistência social (CRAS, CREAS e Centros-Dia do Idoso), transporte público acessível, previdência social e judiciário para garantia de direitos de cidadania.</li>
  <li><strong>Provimento de Recursos Capazes de Assegurar Qualidade da Atenção:</strong> Capacitação permanente das equipes de saúde da família em geriatria e gerontologia básica, erradicando práticas etaristas e iatrogênicas.</li>
  <li><strong>Apoio ao Desenvolvimento de Cuidados Domiciliares:</strong> Reconhecimento formal da família como parceira do cuidado, com capacitação, orientação técnica e suporte psicossocial aos cuidadores familiares, prevenindo a exaustão emocional (<em>Síndrome de Burnout do Cuidador</em>).</li>
</ul>

<h3>2.3 Os Três Níveis de Classificação da População Idosa na APS</h3>
<p>Para fins de estratificação populacional, planejamento da assistência e alocação equitativa de visitas domiciliares na Estratégia Saúde da Família, a PNSPI e os cadernos de atenção básica dividem as pessoas idosas em três perfis operacionais:</p>
<ol>
  <li><strong>Idoso Hígido / Robusto:</strong> Indivíduo plenamente autônomo e independente para todas as atividades básicas e instrumentais da vida diária, com boa reserva fisiológica e capacidade de adaptação a estressores agudos. As ações da APS concentram-se na promoção da saúde, imunização, estilo de vida ativo e prevenção primária e secundária.</li>
  <li><strong>Idoso em Risco de Fragilização / Pré-Frágil:</strong> Indivíduo com declínio incipiente de velocidade de marcha, perda de peso não intencional leve, relato de fadiga, polifarmácia ou quedas esporádicas. Apresenta vulnerabilidade aumentada a eventos adversos (hospitalizações, declínio funcional agudo). É o grupo de maior prioridade para intervenção preventiva multiprofissional da APS (eMulti/NASF), visando reverter o processo de fragilização antes da perda irreversível de autonomia.</li>
  <li><strong>Idoso Frágil:</strong> Indivíduo com comprometimento estabelecido da autonomia e/ou dependência funcional para atividades de vida diária; portador de síndromes geriátricas consolidadas, imobilismo no leito, demência em estágio moderado a grave ou desnutrição grave. Demanda plano de cuidados domiciliares contínuos, suporte intensivo a cuidadores e coordenação do cuidado intersetorial.</li>
</ol>
`
};
