// scripts/bloco-07-builders/build-155-part3.mjs

export const sec5 = {
  id: "rastreamento-e-estratificacao-de-risco-de-suicidio-na-aps",
  title: "5. Rastreamento e Estratificação de Risco de Suicídio na APS: Acolhimento Multiprofissional e Manejo de Crise",
  body_html: `
<h3>5.1 O Tabu do Suicídio na Prática Médica e o Mito de que 'Perguntar Induz'</h3>
<p>O suicídio configura um problema grave de saúde pública mundial e nacional, respondendo por mais de 14.000 mortes anuais no Brasil — a imensa maioria em jovens de 15 a 29 anos e em idosos com mais de 70 anos. Estudos epidemiológicos clássicos revelam um dado estarrecedor: <strong>cerca de 50% a 70% das pessoas que cometeram suicídio haviam consultado um médico da Atenção Primária no mês anterior ao óbito</strong>, frequentemente com queixas somáticas inespecíficas (fadiga, insônia, dores difusas), sem que o risco de autoextermínio tivesse sido adequadamente investigado.</p>

<div class="clinical-box highlight">
  <h4>Desconstrução dos Mitos Mais Prejudiciais sobre o Suicídio</h4>
  <ul>
    <li><strong>Mito 1: 'Perguntar sobre pensamentos de suicídio pode induzir ou plantar a ideia na cabeça do paciente':</strong> FALSO e IATROGÊNICO. Evidências científicas sólidas comprovam que perguntar de maneira direta, compassiva e técnica <strong>NÃO induz o ato</strong>; ao contrário, proporciona alívio emocional imenso ao indivíduo, que finalmente encontra um espaço seguro e livre de julgamentos para expressar uma dor psíquica insuportável (<em>psicodinia</em>) mantida em segredo.</li>
    <li><strong>Mito 2: 'Quem fala que vai se matar só quer chamar a atenção e não tem coragem de fazer':</strong> FALSO. A imensa maioria das pessoas que se suicidam deu sinais explícitos ou implícitos de suas intenções para amigos, familiares ou profissionais de saúde nos dias ou semanas anteriores. Qualquer verbalização de morte deve ser levada com gravidade máxima.</li>
    <li><strong>Mito 3: 'O suicídio é um ato puramente impulsivo e imprevisível':</strong> Embora haja momentos de impulsividade terminal (frequentemente deflagrados por álcool ou término afetivo), o processo suicida é quase sempre precedido por um período de ambivalência e sofrimento prolongado, no qual a pessoa não deseja morrer, mas anseia desesperadamente por <em>cessar uma dor psíquica insuportável</em>.</li>
    <li><strong>Mito 4: 'A melhora súbita do humor significa que o perigo passou':</strong> PERIGO IMINENTE. Quando um paciente gravemente deprimido apresenta uma melhora repentina, inexplicável e serena do humor, isso frequentemente indica que ele finalmente tomou a decisão irrevogável de cometer o suicídio e traçou seu plano, sentindo um alívio temporário da angústia. O risco de execução é máximo nesse momento!</li>
  </ul>
</div>

<h3>5.2 Fatores de Risco e Fatores de Proteção</h3>
<p>A avaliação clínica baseia-se no equilíbrio dinâmico entre fatores de vulnerabilidade e âncoras protetivas de vida:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Fatores de Risco Clínicos e Demográficos</th>
      <th>Fatores de Risco Circunstanciais Agudos</th>
      <th>Fatores de Proteção Primordiais</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        - <strong>Tentativa prévia de suicídio:</strong> É o <em>preditor isolado mais poderoso e fidedigno de suicídio consumado</em> (risco 30 a 40 vezes maior);<br>
        - <strong>Presença de Transtorno Mental Diagnosticado:</strong> Presente em &gt; 90% dos casos consumados (Depressão Maior unipolar, Transtorno Bipolar na fase mista ou depressiva, Dependência de Álcool e outras substâncias, Esquizofrenia e Transtorno de Personalidade Borderline);<br>
        - <strong>Sexo Masculino:</strong> Homens morrem 3 a 4 vezes mais por suicídio do que mulheres (utilizam métodos de maior letalidade: enforcamento e armas de fogo); mulheres realizam cerca de 3 vezes mais tentativas não fatais (intoxicação exógena medicamentosa);<br>
        - Idosos (&ge; 70-75 anos) e adultos jovens (15-29 anos);<br>
        - Populações vulneráveis: indígenas, pessoas LGBTQIA+ marginalizadas.
      </td>
      <td>
        - Perda recente aguda e traumática (luto conjugal, separação, divórcio, falência financeira, desemprego súbito);<br>
        - Desesperança profunda (crença inabalável de que o futuro não trará qualquer alívio);<br>
        - Doença física crônica incapacitante, dor intratável ou diagnóstico recente de neoplasia maligna terminal;<br>
        - <strong>Acesso facilitado a métodos letais:</strong> armas de fogo no domicílio, agrotóxicos em áreas rurais, medicamentos sedativos em grandes quantidades estocados em casa;<br>
        - Impulsividade aumentada sob efeito agudo de álcool ou cocaína.
      </td>
      <td>
        - Rede de apoio social e familiar acolhedora e presente (vínculos afetivos sólidos);<br>
        - Senso de responsabilidade em relação a filhos pequenos dependentes ou familiares vulneráveis;<br>
        - Crenças religiosas ou espirituais que valorizam a vida e condenam o suicídio;<br>
        - Capacidade de buscar ajuda profissional e boa aliança terapêutica com a equipe da ESF;<br>
        - Habilidades consolidadas de resolução de problemas e flexibilidade cognitiva.
      </td>
    </tr>
  </tbody>
</table>

<h3>5.3 Estratificação de Risco e Algoritmo de Conduta Clínica na APS</h3>
<p>O Ministério da Saúde e a Organização Mundial da Saúde estruturam a estratificação do risco de suicídio em três níveis operacionais determinantes:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Nível de Risco</th>
      <th>Critérios Clínicos e Fenomenológicos</th>
      <th>Conduta Imediata e Fluxo na Rede de Saúde</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Risco Baixo</strong></td>
      <td>
        - Pensamentos passageiros de morte ('gostaria de sumir', 'queria dormir e não acordar');<br>
        - <strong>Ausência de planejamento</strong> (não sabe como faria, sem método);<br>
        - Ausência de intenção ativa de autoextermínio;<br>
        - Presença de múltiplos fatores de proteção sólidos e bom suporte familiar.
      </td>
      <td>
        - Atendimento na própria Atenção Primária pela equipe da ESF e eMulti;<br>
        - Escuta empática e validação do sofrimento;<br>
        - Tratar a condição psiquiátrica de base (depressão, ansiedade);<br>
        - Envolver a família no cuidado com consentimento do paciente;<br>
        - Agendar retorno médico breve (em 7 a 14 dias) e orientar busca imediata da UBS ou UPA se piora dos pensamentos;<br>
        - Disponibilizar contatos de apoio emergencial (CVV - Centro de Valorização da Vida: <strong>Ligue 188</strong>).
      </td>
    </tr>
    <tr>
      <td><strong>Risco Médio</strong></td>
      <td>
        - Ideação suicida frequente e estruturada ('quero me matar');<br>
        - <strong>Presença de plano mental vago</strong> (já pensou em pular ou tomar remédios), mas sem método de letalidade imediata disponível e sem data definida;<br>
        - Apresenta ambivalência marcante e aceita ajuda profissional;<br>
        - Histórico de tentativa prévia distante ou desesperança moderada.
      </td>
      <td>
        - <strong>Manejo Compartilhado Prioritário entre APS e CAPS do território</strong> (agendamento em até 24 a 48 horas ou matriciamento imediato);<br>
        - <strong>Retirada Imediata do Acesso a Métodos Letais:</strong> pactuar com a família o recolhimento e trancamento de armas de fogo, venenos, objetos cortantes e medicamentos (a família deve assumir a administração rigorosa de todos os remédios comprimido a comprimido);<br>
        - Elaboração conjunta do <strong>Plano de Segurança / Plano de Crise</strong> escrito (lista de sinais de alerta pessoais, estratégias de distração, contatos de amigos de confiança e telefones de emergência);<br>
        - <em>Evitar o uso de 'Contratos de Não Suicídio' formais</em> (não possuem eficácia comprovada na redução de mortes e geram falsa segurança na equipe).
      </td>
    </tr>
    <tr>
      <td><strong>Risco Alto / Iminente</strong></td>
      <td>
        - <strong>Plano suicida detalhado, concreto e letal</strong> (já escolheu o local, comprou a corda, tem a arma ou juntou centenas de comprimidos);<br>
        - Intenção inequívoca de morrer; atos preparatórios em curso (despedidas formais, doação de pertences de estimação, redação de bilhetes de adeus, regularização de testamento);<br>
        - Agitação psicomotora intensa, desespero incontrolável ou sintomas psicóticos (vozes de comando imperativas ordenando a morte);<br>
        - Ausência total de rede de apoio e recusa de ajuda.
      </td>
      <td>
        - <strong>EMERGÊNCIA MÉDICA ABSOLUTA: NÃO DEIXAR O PACIENTE SOZINHO EM NENHUM MOMENTO</strong> (nem para ir ao banheiro na unidade!);<br>
        - Permanecer em observação clínica contínua na sala de emergência da UBS acompanhado por membro da equipe;<br>
        - <strong>Acionar o SAMU 192 para remoção urgente para Unidade de Pronto Atendimento (UPA) ou Emergência Hospitalar / Leito de Saúde Mental</strong>;<br>
        - Avaliação de indicação de <strong>Internação Psiquiátrica Involuntária de emergência</strong> para resguardo da vida física, com comunicação ao Ministério Público em até 72 horas;<br>
        - Notificação compulsória imediata de tentativa de suicídio no SINAN (em até 24 horas).
      </td>
    </tr>
  </tbody>
</table>
`
};

export const sec6 = {
  id: "intervencoes-breves-e-entrevista-motivacional",
  title: "6. Intervenções Breves e Técnicas de Entrevista Motivacional na Prática da Atenção Primária",
  body_html: `
<h3>6.1 A Entrevista Motivacional: Filosofia e Princípios de Miller e Rollnick</h3>
<p>Tradicionalmente, a abordagem médica de comportamentos de risco e dependência química era fundamentada na coerção, na confrontação agressiva e na imposição de regras morais ('Você precisa parar de beber imediatamente, senão vai morrer de cirrose'). Estudos psicológicos e neurocientíficos comprovaram que essa postura inquisitória gera <strong>reatância psicológica (resistência defensiva aumentada)</strong>, afastando o paciente dos serviços de saúde.</p>

<p>Desenvolvida por William R. Miller e Stephen Rollnick, a <strong>Entrevista Motivacional (EM)</strong> é um estilo de aconselhamento clínico diretivo e centrado na pessoa, projetado para <strong>explorar e resolver a ambivalência interna</strong>, estimulando a motivação intrínseca para a mudança comportamental positiva.</p>

<div class="clinical-box highlight">
  <h4>Os Quatro Princípios Fundamentais da Entrevista Motivacional</h4>
  <ul>
    <li><strong>1. Expressar Empatia:</strong> Escuta reflexiva ativa e respeitosa, aceitando a perspectiva do paciente sem julgar, rotular ou criticar. A ambivalência é compreendida como uma fase natural e previsível de qualquer processo de mudança humana.</li>
    <li><strong>2. Desenvolver a Discrepância:</strong> Auxiliar o paciente a enxergar com clareza o abismo existente entre o seu comportamento atual de risco e seus valores fundamentais, sonhos e objetivos de vida a longo prazo (ex.: 'Como o uso diário de bebida alcoólica tem impactado o seu sonho de ver seus filhos formados na faculdade?'). Quando o paciente verbaliza a discrepância, a motivação para a mudança parte dele mesmo, e não de um sermão externo.</li>
    <li><strong>3. Lidar com a Resistência (Acompanhar a Resistência):</strong> Não debater nem confrontar diretamente quando o paciente expressa relutância ou nega problemas. A resistência não é vista como 'falta de caráter', mas como um sinal clínico de que o médico está correndo rápido demais ou impondo soluções antes da hora. Muda-se o foco e utiliza-se a reflexão simples.</li>
    <li><strong>4. Apoiar a Autoeficácia:</strong> Fortalecer a crença do paciente em sua própria capacidade de realizar mudanças e superar recaídas. Resgatar sucessos passados e reconhecer pequenos avanços cotidianos.</li>
  </ul>
</div>

<h3>6.2 As Habilidades Comunicacionais Cardinais da EM: O Mnemônico OARS</h3>
<p>Para aplicar a Entrevista Motivacional nas consultas cotidianas de 15 a 20 minutos na Atenção Primária, o profissional utiliza o conjunto de microhabilidades representado pelo acrônimo <strong>OARS</strong>:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Habilidade (OARS)</th>
      <th>Definição Técnica</th>
      <th>Exemplos Práticos na Consulta da APS</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>O - Open-ended questions (Perguntas Abertas)</strong></td>
      <td>Perguntas que não podem ser respondidas com um simples 'sim' ou 'não', incentivando o paciente a elaborar sua narrativa e refletir sobre seus sentimentos.</td>
      <td>'O que você acha do seu hábito de fumar ultimamente?'<br>'Quais são as coisas boas que a bebida lhe traz e quais são as coisas que começaram a lhe incomodar?'<br>'Como você gostaria que sua saúde estivesse daqui a cinco anos?'</td>
    </tr>
    <tr>
      <td><strong>A - Affirmations (Afirmações e Reconhecimento)</strong></td>
      <td>Reconhecimento genuíno das forças, qualidades, esforços e sucessos prévios do paciente, fortalecendo sua autoestima e vínculo terapêutico.</td>
      <td>'Percebo que você teve muita coragem em vir hoje à unidade conversar abertamente sobre esse assunto.'<br>'Você conseguiu ficar três semanas sem fumar no ano passado, o que prova que você tem uma determinação impressionante dentro de si.'</td>
    </tr>
    <tr>
      <td><strong>R - Reflective listening (Escuta Reflexiva)</strong></td>
      <td>O médico parafraseia ou reflete o que o paciente acabou de dizer, demonstrando que compreendeu não apenas as palavras, mas o sentimento subjacente. É a ferramenta mais poderosa da EM.</td>
      <td><em>Paciente:</em> 'Eu sei que não devia beber todo dia, mas chego em casa tão estressado do trabalho que parece que só a cerveja me desliga.'<br><em>Médico:</em> 'Parece que o trabalho tem sido muito exaustivo e a bebida tem funcionado como uma válvula de escape para aliviar a tensão.'</td>
    </tr>
    <tr>
      <td><strong>S - Summaries (Resumos Estruturados)</strong></td>
      <td>Pequenas sínteses periódicas do que foi discutido, amarrando pontos importantes, destacando a ambivalência e preparando a transição para o plano de ação.</td>
      <td>'Deixe-me ver se compreendi tudo até aqui: de um lado, fumar lhe ajuda a relaxar nas pausas do trabalho; por outro lado, você está preocupado com a tosse matinal, com o dinheiro gasto e quer muito ser um exemplo saudável para sua filha pequena. É isso mesmo? Para onde você gostaria de ir a partir daqui?'</td>
    </tr>
  </tbody>
</table>

<h3>6.3 O Modelo Transteórico de Estágios de Mudança de Prochaska e DiClemente</h3>
<p>O indivíduo não decide mudar de estilo de vida em um clique instantâneo; ele percorre etapas dinâmicas e circulares:</p>
<ol>
  <li><strong>1. Pré-contemplação:</strong> O indivíduo <strong>não reconhece que tem um problema</strong> e não pretende mudar o comportamento nos próximos 6 meses. Rejeita orientações ('Eu bebo porque gosto, meu avô bebeu até os 90 anos e não morreu'). <em>Conduta médica:</em> Não insistir em planos de ação; apenas plantar a dúvida de forma empática e manter as portas abertas.</li>
  <li><strong>2. Contemplação:</strong> O indivíduo <strong>reconhece o problema, mas está profundamente ambivalente</strong> ('Eu sei que preciso parar de fumar, mas não consigo imaginar minha vida sem o cigarro'). Pensa em mudar nos próximos 6 meses, mas hesita. <em>Conduta médica:</em> Balança decisional (pesar prós e contras) e explorar a discrepância.</li>
  <li><strong>3. Preparação:</strong> O indivíduo <strong>decide que quer mudar no futuro próximo (próximos 30 dias)</strong> e já dá pequenos passos práticos (compra chicletes, pesquisa sobre tratamentos, reduz alguns cigarros). <em>Conduta médica:</em> Fixar a 'Data de Parada' (o 'Dia D'), escolher métodos e antecipar gatilhos.</li>
  <li><strong>4. Ação:</strong> O indivíduo <strong>interrompe o comportamento de risco há menos de 6 meses</strong>. É a fase de maior vulnerabilidade biológica a sintomas de abstinência e fissura aguda. <em>Conduta médica:</em> Suporte intensivo, farmacoterapia e reforço positivo.</li>
  <li><strong>5. Manutenção:</strong> O indivíduo <strong>sustenta a mudança por mais de 6 meses</strong>. Consolidação de novos hábitos saudáveis e prevenção ativa de recaídas.</li>
  <li><em>Recaída:</em> Não é um fracasso moral, mas parte integrante e esperada do processo de aprendizagem comportamental. O paciente retorna a estágios anteriores (geralmente contemplação ou preparação), devendo ser acolhido com compaixão imediata pela equipe.</li>
</ol>

<h3>6.4 Intervenção Breve Estruturada: O Protocolo FRAMES</h3>
<p>Para intervenções rápidas (5 a 15 minutos) em tabagismo e álcool na atenção primária, utiliza-se internacionalmente o modelo <strong>FRAMES</strong>:</p>
<ul>
  <li><strong>F - Feedback:</strong> Devolução clara e individualizada dos riscos e resultados de exames (ex.: 'O seu teste AUDIT revelou uma pontuação de 18 pontos, indicando que o seu consumo atual já está sobrecarregando o seu fígado e elevando sua pressão');</li>
  <li><strong>R - Responsibility:</strong> Enfatizar que a responsabilidade e o poder de mudar pertencem exclusivamente ao paciente (ex.: 'A decisão de reduzir ou parar é totalmente sua; ninguém pode fazer isso por você, mas nós estamos aqui para lhe apoiar no que você escolher');</li>
  <li><strong>A - Advice:</strong> Conselho médico claro, objetivo e sem julgamentos (ex.: 'Como seu médico, eu recomendo fortemente que você reduza o consumo para proteger seu coração');</li>
  <li><strong>M - Menu of options:</strong> Oferecer um cardápio variado de alternativas viáveis (redução gradual, parada abrupta, participação em grupos da UBS, tratamento medicamentoso, apoio psicológico);</li>
  <li><strong>E - Empathy:</strong> Postura calorosa, acolhedora e compreensiva;</li>
  <li><strong>S - Self-efficacy:</strong> Estímulo otimista à autoconfiança do sujeito em sua capacidade de triunfar.</li>
</ul>
`
};

export const sec7 = {
  id: "casos-clinicos-e-questoes-comentadas-saude-mental",
  title: "7. Casos Clínicos Estruturados e Questões Comentadas de Concursos Médicos",
  body_html: `
<h3>7.1 Casos Clínicos da Prática de Saúde Mental na Atenção Primária</h3>

<div class="clinical-box highlight">
  <h4>Caso Clínico 1: Dependência Crônica de Benzodiazepínico e Desprescrição Compartilhada</h4>
  <p><strong>Identificação:</strong> Dona Neusa, 64 anos, viúva, costureira, comparece à UBS do seu bairro solicitando uma nova receita azul de clonazepam 2 mg comprimidos. Relata que faz uso de um comprimido todas as noites para dormir há mais de 12 anos, desde o falecimento do marido. Relata que recentemente tem sentido lapsos frequentes de memória para fatos recentes e sofreu uma queda no banheiro há duas semanas durante a madrugada, quebrando uma costela.</p>
  <p><strong>Diálogo Clínico Centrado na Pessoa:</strong> O médico da ESF não se limita a assinar a receita mecanicamente. Convida a paciente a sentar, valida seu sofrimento histórico e pergunta gentilmente: 'Dona Neusa, como tem sido para a senhora tomar o clonazepam por tantos anos?'. A paciente desabafa: 'Doutor, eu tenho pavor de ficar sem ele. Quando viajo e esqueço o vidro, parece que vou enlouquecer, fico tremendo, o coração dispara e não prego o olho a noite inteira. Sei que faz mal, mas sou viciada e não consigo largar'.</p>
  <p><strong>Conduta e Pactuação do Plano de Desprescrição:</strong></p>
  <ol>
    <li><em>Psicoeducação e Desculpabilização:</em> O médico esclarece que a paciente não tem 'culpa' pela dependência; o clonazepam provocou tolerância física nos receptores cerebrais e o que ela sente quando fica sem a medicação é a abstinência física real. Tranquiliza a paciente garantindo que o remédio não será retirado de um dia para o outro.</li>
    <li><em>Conversão para Equivalência com Diazepam:</em> Clonazepam 2 mg/dia equivale a aproximadamente 40 mg de Diazepam/dia. Devido à dose elevada e ao tempo prolongado de uso (12 anos), o médico pactua um plano de desmame lento ao longo de 4 a 6 meses.</li>
    <li><em>Estratégia de Redução:</em> Substitui-se o clonazepam comprimido por clonazepam solução oral (gotas) ou converte-se para diazepam. Reduz-se aproximadamente 10% a 15% da dose a cada 3 a 4 semanas.</li>
    <li><em>Manejo Não Farmacológico da Insônia:</em> Orientações estruturadas de Higiene do Sono (levantar sempre no mesmo horário, sem TV na cama, sem telas à noite); encaminhamento para o grupo de práticas corporais e Lian Gong conduzido pela fisioterapeuta do eMulti na quadra da UBS.</li>
  </ol>
</div>

<div class="clinical-box highlight">
  <h4>Caso Clínico 2: Acolhimento e Manejo de Ideação Suicida com Risco Alto na UBS</h4>
  <p><strong>Identificação:</strong> Lucas, 22 anos, estudante universitário desempregado, procura a Unidade Básica de Saúde sem agendamento prévio (demanda espontânea), solicitando atendimento médico porque 'está com uma dor de cabeça que não passa e uma tristeza infinita'.</p>
  <p><strong>Abordagem Clínica e Investigação de Risco:</strong> O médico da ESF o acolhe com gentileza e explora a experiência do adoecimento. Ao perceber um discurso permeado por desesperança profunda e choro convulsivo, o médico pergunta diretamente: 'Lucas, diante de tanto sofrimento e cansaço, você já teve pensamentos de que a vida não vale mais a pena ou pensamentos de sumir, dormir e não acordar mais?'.</p>
  <p>O paciente responde afirmativamente: 'Doutor, eu não aguento mais decepcionar minha mãe. Eu comprei uma corda no depósito semana passada e deixei amarrada no caibro da edícula no fundo da casa. Hoje cedo eu escrevi uma carta de desculpas para a minha mãe e vim aqui só porque estava com muita dor de cabeça antes de fazer isso'.</p>
  <p><strong>Raciocínio Clínico e Conduta Imediata de Emergência:</strong></p>
  <ol>
    <li><em>Estratificação de Risco:</em> <strong>RISCO ALTO / IMINENTE DE SUICÍDIO</strong> (Presença de plano concreto detalhado e letal preparado, compra de método letal, carta de despedida redigida e desesperança absoluta).</li>
    <li><em>Segurança Física Imediata:</em> <strong>NÃO DEIXAR O PACIENTE SOZINHO EM NENHUM MOMENTO</strong>. O médico permanece ao lado do paciente na sala de observação com porta aberta, comunicando discretamente à enfermeira para acionar a rede.</li>
    <li><em>Acionamento da Rede de Urgência:</em> Acionamento imediato do <strong>SAMU 192</strong> para transferência assistida e monitorada para a <strong>Unidade de Pronto Atendimento (UPA 24h) com leito de saúde mental</strong> para avaliação psiquiátrica de urgência e estabilização de crise aguda.</li>
    <li><em>Comunicação Familiar e Acolhimento:</em> Com o consentimento do jovem, a equipe entra em contato telefônico com a mãe para que ela compareça à unidade imediatamente, acolhendo a família com sensibilidade e sem julgamentos. Preenchimento da notificação compulsória no SINAN em até 24 horas.</li>
  </ol>
</div>

<h3>7.2 Questões de Concursos e Residência Médica Comentadas</h3>

<div class="clinical-box highlight">
  <h4>Questão 1 (Enare / Exame Nacional de Residência Médica)</h4>
  <p>Homem de 34 anos, portador de esquizofrenia paranoide em tratamento irregular, reside com sua mãe idosa em território coberto pela Estratégia Saúde da Família. A mãe comparece desesperada à UBS relatando que o filho suspendeu os antipsicóticos há duas semanas e iniciou quadro de agitação psicomotora violenta, ameaçando-a de morte com uma faca de cozinha por acreditar que ela foi substituída por um clone alienígena. A mãe recusa-se a voltar para casa sozinha com medo de ser assassinada. A equipe da ESF reúne-se para discutir a conduta legal e assistencial. Considerando os ditames da Lei Federal nº 10.216/2001 (Lei da Reforma Psiquiátrica), qual é a modalidade de internação cabível para este caso e qual é o procedimento formal obrigatório a ser adotado?</p>
  <p>A) Internação voluntária; aguardar o paciente aceitar o tratamento por escrito após visita domiciliar persuasiva.<br>
  B) Internação compulsória; que só pode ser solicitada pelo delegado de polícia do bairro.<br>
  C) Internação involuntária; requer laudo médico circunstanciado emitido por profissional competente e comunicação obrigatória ao Ministério Público Estadual no prazo máximo de 72 horas.<br>
  D) Internação asilar em hospital psiquiátrico judiciário por tempo indeterminado.<br>
  E) Não há previsão legal para internação sem a concordância expressa do paciente maior de idade no ordenamento jurídico brasileiro.</p>
  <p><strong>Gabarito Oficial Comentado: Alternativa C.</strong></p>
  <p><em>Comentário Didático:</em> Trata-se de uma situação clássica de <strong>Internação Psiquiátrica Involuntária</strong> (Artigo 6º, parágrafo único, inciso II e Artigo 8º da Lei nº 10.216/2001). A internação involuntária ocorre sem o consentimento do paciente, solicitada por familiar de primeiro grau (no caso, a mãe), exigindo autorização prévia por laudo médico fundamentado que comprove a falência dos recursos extra-hospitalares e o risco iminente à integridade física de terceiros. A lei determina com rigor absoluto que <strong>a internação e a respectiva alta devem ser comunicadas formalmente ao Ministério Público Estadual no prazo improrrogável de até 72 horas</strong>, como salvaguarda jurídica contra privações ilegais de liberdade. A alternativa A é inviável pelo risco de homicídio. A alternativa B é incorreta porque a internação compulsória é determinada exclusivamente por juiz de direito, e não por delegados. A alternativa D viola a Reforma Psiquiátrica e os direitos humanos.</p>
</div>

<div class="clinical-box highlight">
  <h4>Questão 2 (SUS-SP / Residência Médica em Medicina de Família e Comunidade)</h4>
  <p>Durante uma consulta na Unidade Básica de Saúde, um homem de 48 anos, tabagista e hipertenso, relata que sabe que o fumo está prejudicando sua capacidade física de jogar futebol com os amigos e que tem pensado em parar de fumar nos próximos meses, mas sente muito medo de não conseguir suportar a ansiedade sem o cigarro. De acordo com o Modelo Transteórico de Estágios de Mudança de Prochaska e DiClemente e a Entrevista Motivacional, em qual estágio de mudança o paciente se encontra e qual é a conduta do médico da ESF mais adequada?</p>
  <p>A) Pré-contemplação; confrontar imediatamente o paciente com imagens de câncer de pulmão para induzir o medo.<br>
  B) Contemplação; explorar e trabalhar a ambivalência do paciente, utilizando a escuta reflexiva para desenvolver a discrepância entre seus valores de vida e o comportamento atual.<br>
  C) Preparação; prescrever imediatamente vareniclina e fixar o 'Dia D' de parada para os próximos 3 dias.<br>
  D) Ação; parabenizar o paciente pelo sucesso alcançado e focar na prevenção de recaídas.<br>
  E) Manutenção; encaminhar o paciente para o grupo de cessação tabágica do CAPS AD.</p>
  <p><strong>Gabarito Oficial Comentado: Alternativa B.</strong></p>
  <p><em>Comentário Didático:</em> O paciente encontra-se no estágio de <strong>Contemplação</strong>: ele já reconhece que o comportamento é danoso à sua saúde e pensa em mudar no horizonte dos próximos 6 meses, mas está imerso em profunda <strong>ambivalência</strong> (quer parar de fumar para jogar futebol, mas teme a ansiedade sem o fumo). Na entrevista motivacional, o objetivo essencial no estágio contemplativo é <strong>acolher e explorar a ambivalência</strong> por meio da escuta reflexiva, ajudando o paciente a desenvolver a discrepância interna entre seu sonho (saúde, esporte) e o hábito atual. A alternativa A está errada porque a confrontação agressiva gera resistência. A alternativa C é típica do estágio de Preparação (quando a pessoa já decidiu parar nos próximos 30 dias). As alternativas D e E descrevem estágios onde o paciente já interrompeu o uso do tabaco.</p>
</div>

<div class="clinical-box highlight">
  <h4>Questão 3 (USP / Secretaria Municipal de Saúde de São Paulo)</h4>
  <p>Mulher de 58 anos comparece à UBS para consulta de acolhimento em saúde mental. Ela utiliza Clonazepam 2 mg ao dia há 8 anos, prescrito inicialmente após a morte de sua mãe. Nega sintomas depressivos atuais, mas refere que nos últimos meses tem sentido grande sonolência diurna, prejuízos de memória e medo de sofrer quedas, manifestando desejo espontâneo de interromper o uso do remédio. Considerando as diretrizes de prevenção quaternária e o protocolo seguro de desprescrição de benzodiazepínicos na Atenção Primária à Saúde, assinale a conduta CORRETA:</p>
  <p>A) Suspender imediatamente o clonazepam de um dia para o outro e introduzir amitriptilina 75 mg à noite para controlar a insônia rebote.<br>
  B) Manter o clonazepam indefinidamente na dose habitual, pois após 8 anos de uso contínuo a dependência é irreversível e o desmame é contraindicado.<br>
  C) Pactuar com a paciente um plano de desmame gradual, podendo-se converter a dose para o equivalente em diazepam e reduzir cerca de 10% a 25% da dose a cada 2 a 4 semanas, associando medidas de higiene do sono e suporte multiprofissional.<br>
  D) Substituir o clonazepam por zolpidem 10 mg à noite, pois os hipnóticos 'não benzodiazepínicos' não causam tolerância, dependência ou risco de quedas.<br>
  E) Prescrever haloperidol 5 mg à noite para sedação durante o desmame rápido do benzodiazepínico em 5 dias.</p>
  <p><strong>Gabarito Oficial Comentado: Alternativa C.</strong></p>
  <p><em>Comentário Didático:</em> A desprescrição de benzodiazepínicos de uso prolongado exige planejamento <strong>gradual, consentido e escalonado</strong>. A suspensão abrupta (Alternativa A) é absolutamente contraindicada pelo risco extremo de síndrome de abstinência grave, delirium e convulsões tônico-clônicas. A alternativa B é incorreta porque a idade avançada eleva substancialmente o risco de quedas, fraturas e demência, sendo a desprescrição altamente indicada e viável. A alternativa C descreve com exatidão o protocolo internacional de desprescrição (conversão opcional para diazepam devido à meia-vida longa estável, redução lenta de 10% a 25% da dose quinzenal ou mensal e suporte não farmacológico com higiene do sono). A alternativa D é falsa porque as drogas 'Z' (zolpidem) atuam no mesmo sítio do receptor GABA-A, compartilhando riscos idênticos de dependência, amnésia, quedas e sonambulismo complexo. A alternativa E prescreve antipsicótico típico de alta potência de forma iatrogênica e perigosa.</p>
</div>
`
};
