// Bloco 6 - Aula 120: Medicina Baseada em Evidências - Part 4
export const sec7 = {
  id: 'tomada-de-decisao-compartilhada-e-comunicacao-de-riscos',
  title: '7. Tomada de Decisão Compartilhada (Shared Decision Making) e Ferramentas de Auxílio à Decisão',
  body_html: `
<h3>O Encontro de Dois Especialistas: A Tomada de Decisão Compartilhada (SDM)</h3>
<p>O terceiro pilar de Sackett — os valores e preferências do paciente — ganha vida prática na <strong>Tomada de Decisão Compartilhada (Shared Decision Making - SDM)</strong>. Longe de ser uma concessão paternalista onde o médico "dá permissão" para o paciente opinar, a SDM é conceituada como uma <strong>parceria colaborativa entre dois especialistas com saberes complementares</strong>:</p>

<ul>
  <li><strong>O Médico:</strong> É o especialista no conhecimento técnico biomédico, na literatura científica, nas probabilidades prognósticas, no diagnóstico e no catálogo de opções terapêuticas existentes com seus riscos e benefícios matemáticos;</li>
  <li><strong>O Paciente:</strong> É o especialista incontestável na sua própria vida, nas suas vivências subjetivas, na sua tolerância individual à dor, nas suas rotinas familiares, na sua situação financeira e nos seus valores espirituais e existenciais.</li>
</ul>

<p>A decisão compartilhada é imperativa nas chamadas <strong>Decisões Sensíveis às Preferências (Preference-Sensitive Decisions)</strong>, situações clínicas em que não existe uma conduta clinicamente soberana ou quando a evidência científica é de certeza moderada a baixa (ex.: cirurgia conservadora versus mastectomia no câncer de mama precoce; anticoagulação plena em idosos frágeis com alto risco de queda; rastreamento de câncer de próstata com PSA entre 55 e 69 anos).</p>

<h3>Os Três Passos do Modelo de Elwyn para a Consulta Compartilhada</h3>
<p>O modelo operacional mais consagrado na literatura de atenção centrada no paciente (desenvolvido por Glyn Elwyn e colaboradores no <em>BMJ</em> em 2012) estrutura a tomada de decisão em três etapas dialógicas sequenciais:</p>

<ol>
  <li><strong>Conversa da Escolha (Choice Talk):</strong> O médico explicita claramente ao paciente que existe mais de uma conduta médica razoável para o seu caso e que sua opinião pessoal é fundamental para a definição do plano terapêutico (<em>"Temos aqui uma encruzilhada com caminhos diferentes, e a escolha dependerá do que é mais importante para você"</em>);</li>
  <li><strong>Conversa das Opções (Option Talk):</strong> O médico apresenta as alternativas terapêuticas disponíveis, detalhando os prós e os contras de cada uma através de <strong>riscos absolutos transparentes</strong>, evitando termos subjetivos e ambíguos como "risco baixo" ou "cura frequente";</li>
  <li><strong>Conversa da Decisão (Decision Talk):</strong> O médico explora os valores do paciente diante das informações recebidas (<em>"O que mais preocupa o senhor: a possibilidade de sangramento ou o medo de ter um derrame?"</em>), deliberando conjuntamente a conduta final ou acordando um tempo para reflexão e conversa familiar.</li>
</ol>

<h3>Instrumentos de Auxílio à Decisão (Patient Decision Aids - PtDAs)</h3>
<p>Os <strong>Instrumentos de Auxílio à Decisão</strong> são recursos pedagógicos estruturados (folhetos ilustrados, vídeos interativos ou softwares web) desenvolvidos segundo as normas internacionais do <em>IPDAS (International Patient Decision Aid Standards)</em>. Eles apresentam:</p>
<ul>
  <li><strong>Gráficos de Ícones Pictográficos (Icon Arrays / Cates Plots):</strong> Painéis visuais contendo 100 ou 1.000 pessoinhas (rostinhos) com cores contrastantes ilustrando exatamente quantas pessoas se beneficiarão, quantas terão efeitos colaterais e quantas não experimentarão nenhuma alteração, permitindo a compreensão imediata por indivíduos de qualquer nível de letramento funcional em saúde;</li>
  <li><strong>Comparações com Denominadores Comuns Idênticos:</strong> Apresentar sempre os dados sob a mesma base (ex.: <em>"Em cada 1.000 pacientes tratados por 5 anos, 20 evitam infarto e 5 sofrem hemorragia grave"</em> em vez de misturar porcentagens relativas e absolutas).</li>
</ul>
`
};

export const sec8 = {
  id: 'casos-clinicos-e-questoes-comentadas-mbe',
  title: '8. Casos Clínicos Estruturados e Bateria de Questões Comentadas com Distratores',
  body_html: `
<h3>Casos Clínicos Aplicados à Prática da Medicina Baseada em Evidências</h3>

<div class="book-case">
  <h4>Caso Clínico 1: O Raciocínio Bayesiano na Suspeita de Embolia Pulmonar</h4>
  <p><strong>Cenário:</strong> Uma mulher de 62 anos comparece à UPA com dispneia súbita e dor torácica pleurítica iniciadas há 6 horas. O médico assistente aplica o escore de Wells clínico, obtendo 3 pontos, o que classifica a paciente como de <strong>baixa probabilidade clínica pré-teste para Tromboembolismo Pulmonar (TEP), estimada em 10% ($P_{pr\\acute{e}} = 0,10$)</strong>.</p>
  <p>O médico solicita a dosagem de <strong>D-dímero de alta sensibilidade por método ELISA</strong>, cujo teste possui sensibilidade de $98\\%$ e especificidade de $40\\%$. O resultado do exame vem <strong>NEGATIVO</strong>.</p>
  <p><strong>Cálculo Passo a Passo da Probabilidade Pós-Teste:</strong></p>
  <div class="formula-box">
    <p>1. Razão de Verossimilhança Negativa ($LR-$):</p>
    $$LR- = \\frac{1 - \\text{Sensibilidade}}{\\text{Especificidade}} = \\frac{1 - 0,98}{0,40} = \\frac{0,02}{0,40} = \\mathbf{0,05}$$
    <p>2. Conversão da Probabilidade Pré-Teste em Chance Pré-Teste:</p>
    $$Odds_{pr\\acute{e}} = \\frac{0,10}{1 - 0,10} = \\frac{0,10}{0,90} = 0,111$$
    <p>3. Cálculo da Chance Pós-Teste:</p>
    $$Odds_{p\\acute{o}s} = Odds_{pr\\acute{e}} \\times LR- = 0,111 \\times 0,05 = 0,00555$$
    <p>4. Conversão da Chance Pós-Teste em Probabilidade Pós-Teste:</p>
    $$P_{p\\acute{o}s} = \\frac{Odds_{p\\acute{o}s}}{Odds_{p\\acute{o}s} + 1} = \\frac{0,00555}{1,00555} = 0,0055 \\approx \\mathbf{0,55\\%}$$
  </div>
  <p><strong>Conclusão Clínica:</strong> A probabilidade pós-teste despencou de 10% para <strong>menos de 1% ($0,55\%$)</strong>, situando-se muito abaixo do limiar de tratamento ou de necessidade de angiotomografia. O diagnóstico de TEP está confiavelmente <strong>DESCARTADO</strong> sem necessidade de radiação ionizante ou contraste iodado!</p>
</div>

<div class="book-case">
  <h4>Caso Clínico 2: A Deliberação Ética pelo Sistema GRADE na Prática</h4>
  <p><strong>Cenário:</strong> Uma comissão hospitalar de infectologia avalia se deve recomendar a administração profilática de um antiviral caríssimo para todos os profissionais de saúde expostos a pacientes com gripe H1N1. A revisão sistemática Cochrane disponível relata que o antiviral reduz o tempo de sintomas gripais em 12 horas, mas o corpo de evidências foi classificado pelo GRADE como de <strong>Baixa Certeza</strong> (rebaixado por alto risco de viés de relato seletivo do patrocinador e imprecisão grave), associado a aumento importante de náuseas e vômitos ($NNH = 15$).</p>
  <p><strong>Julgamento da Força da Recomendação:</strong> O benefício clínico é ínfimo (12 horas a menos de tosse), a certeza probatória é baixa, há efeitos colaterais frequentes e o custo financeiro é elevado. O painel deve emitir uma <strong>Recomendação Forte CONTRA o uso profilático universal do antiviral</strong>, priorizando a vacinação anual prévia como medida de alta eficácia.</p>
</div>

<h3>Bateria de 7 Questões Comentadas com Distratores Analisados</h3>

<h4>Questão 1 (USP / FMUSP - Residência Médica)</h4>
<p>Um médico deseja avaliar a eficácia de um novo anticorpo monoclonal na redução de mortalidade em pacientes internados com choque séptico refratário. Ao formular a pergunta de pesquisa no modelo estruturado PICO, o componente correspondente ao "C" (Comparador) é mais bem representado por:</p>
<ul>
  <li>A) Pacientes adultos internados em UTI com choque séptico e lactato sérico elevado.</li>
  <li>B) Taxa de sobrevida global livre de disfunção orgânica aos 28 dias de internação.</li>
  <li>C) Tratamento suporte hemodinâmico e antibioticoterapia padrão da Surviving Sepsis Campaign associada a placebo.</li>
  <li>D) Novo anticorpo monoclonal administrado por via intravenosa em dose fixa nas primeiras 6 horas.</li>
</ul>
<p><strong>Gabarito Comentado: Letra C.</strong></p>
<p><em>Justificativa:</em> No modelo PICO: P (População) = adultos com choque séptico (Alternativa A); I (Intervenção) = novo anticorpo monoclonal (Alternativa D); C (Comparador/Controle) = terapia padrão vigente com placebo (Alternativa C); O (Outcome/Desfecho) = mortalidade e sobrevida aos 28 dias (Alternativa B). A resposta é a Letra C.</p>

<h4>Questão 2 (ENARE / Exame Nacional de Residência)</h4>
<p>A publicação de Murad et al. (2016), amplamente adotada nos consensos modernos de Medicina Baseada em Evidências, propôs uma releitura fundamental da Pirâmide Tradicional de Evidências. Segundo esse novo modelo, as Revisões Sistemáticas com Metanálise:</p>
<ul>
  <li>A) Deixaram de figurar no ápice da pirâmide e passaram a atuar como uma lente de aumento crítica através da qual os estudos primários são avaliados.</li>
  <li>B) Foram rebaixadas para o nível inferior aos estudos de coorte observacionais devido à presença crônica de heterogeneidade estatística.</li>
  <li>C) Passaram a ser consideradas como o único desenho metodológico capaz de comprovar causalidade sem necessidade de ensaios clínicos primários.</li>
  <li>D) Foram excluídas da prática médica, sendo substituídas pela inteligência artificial generativa na síntese de evidências.</li>
</ul>
<p><strong>Gabarito Comentado: Letra A.</strong></p>
<p><em>Justificativa:</em> No modelo de Murad (2016), a revisão sistemática com metanálise deixa de ser o "topo estático" da pirâmide e passa a funcionar como a <strong>lente de aumento integradora</strong> que inspeciona criticamente os estudos primários através do sistema GRADE e das ferramentas de risco de viés (Letra A).</p>

<h4>Questão 3 (UNICAMP - Residência Médica)</h4>
<p>Um ensaio clínico randomizado duplo-cego comparou um novo anti-hipertensivo contra placebo em 5.000 pacientes por 3 anos. No grupo placebo, a incidência de AVC foi de 5% (125 eventos em 2.500 pacientes). No grupo do novo fármaco, a incidência foi de 3% (75 eventos em 2.500 pacientes). A Redução Relativa do Risco (RRR), a Redução Absoluta do Risco (RRA) e o Número Necessário para Tratar (NNT) são, respectivamente:</p>
<ul>
  <li>A) $RRR = 40\\%$; $RRA = 2\\%$; $NNT = 50$.</li>
  <li>B) $RRR = 2\\%$; $RRA = 40\\%$; $NNT = 50$.</li>
  <li>C) $RRR = 40\\%$; $RRA = 20\\%$; $NNT = 5$.</li>
  <li>D) $RRR = 60\\%$; $RRA = 2\\%$; $NNT = 25$.</li>
</ul>
<p><strong>Gabarito Comentado: Letra A.</strong></p>
<p><em>Justificativa:</em> Aplicando as fórmulas: $CER = 0,05$ ($5\\%$); $EER = 0,03$ ($3\\%$); $RRA = CER - EER = 0,05 - 0,03 = 0,02$ ou $\\mathbf{2\\%}$; $RR = 0,03 / 0,05 = 0,60$; $RRR = 1 - 0,60 = 0,40$ ou $\\mathbf{40\\%}$; $NNT = 1 / RRA = 1 / 0,02 = \\mathbf{50}$. A resposta é a Letra A.</p>

<h4>Questão 4 (Revalida INEP)</h4>
<p>Um médico de família atende um paciente de 45 anos assintomático que realizou um exame laboratorial de triagem por conta própria. O teste possui sensibilidade de 95% e especificidade de 95%. Sabendo-se que a prevalência da doença na população geral assintomática é de apenas 1 em 1.000 indivíduos (0,1%), a probabilidade de esse paciente verdadeiramente ter a doença após o teste dar POSITIVO (Valor Preditivo Positivo) é de aproximadamente:</p>
<ul>
  <li>A) 95%.</li>
  <li>B) Mais de 90%.</li>
  <li>C) Menos de 2% a 5%.</li>
  <li>D) 50%.</li>
</ul>
<p><strong>Gabarito Comentado: Letra C.</strong></p>
<p><em>Justificativa:</em> Em uma população hipotética de 1.000 pessoas: haverá 1 doente e 999 sadios. O único doente testará positivo ($1 \\times 0,95 \\approx 1$). Dos 999 sadios, 5% testarão falsamente positivo ($999 \\times 0,05 \\approx 50$ falso-positivos!). Portanto, teremos 1 verdadeiro positivo entre 51 testes positivos no total ($1 / 51 \\approx 1,96\\%$!). O VPP é de menos de 2%! Isso comprova o perigo de solicitar exames em populações com baixíssima probabilidade pré-teste (Letra C).</p>

<h4>Questão 5 (Hospital Israelita Albert Einstein / Residência Médica)</h4>
<p>No sistema GRADE (Grading of Recommendations Assessment, Development and Evaluation), qual dos seguintes fatores é formalmente considerado um critério para REBAIXAR (downgrade) o nível de certeza de um corpo de evidências originado de Ensaios Clínicos Randomizados?</p>
<ul>
  <li>A) Presença de gradiente dose-resposta biológico.</li>
  <li>B) Grande magnitude de efeito observada ($RR > 5,0$).</li>
  <li>C) Imprecisão refletida em intervalos de confiança amplos que abrangem tanto o benefício quanto o dano.</li>
  <li>D) Ausência de significância estatística no teste Q de Cochran ($p > 0,10$).</li>
</ul>
<p><strong>Gabarito Comentado: Letra C.</strong></p>
<p><em>Justificativa:</em> Os cinco fatores de rebaixamento no GRADE são: risco de viés, inconsistência, evidência indireta, imprecisão e viés de publicação. Intervalos de confiança amplos que geram incerteza clínica caracterizam <strong>Imprecisão</strong> (Letra C). As alternativas A e B são fatores de elevação para estudos observacionais; a D indica homogeneidade (fator positivo).</p>

<h4>Questão 6 (SURCE / Seleção Unificada para Residência do Ceará)</h4>
<p>Um teste diagnóstico com Razão de Verossimilhança Positiva ($LR+$) igual a 18 e Razão de Verossimilhança Negativa ($LR-$) igual a 0,04 foi aplicado na avaliação de dor torácica aguda. Sobre as propriedades diagnósticas desse exame, é CORRETO afirmar que:</p>
<ul>
  <li>A) O teste positivo não altera a probabilidade pós-teste e o teste negativo confirma a doença.</li>
  <li>B) O teste tem excelente poder para confirmar a doença quando positivo ($LR+ > 10$) e excelente poder para descartar a doença quando negativo ($LR- < 0,1$).</li>
  <li>C) Trata-se de um teste imprestável porque a soma de LR+ e LR- deve ser igual a 1,0.</li>
  <li>D) O teste só pode ser interpretado se a prevalência pré-teste da doença for exatamente de 50%.</li>
</ul>
<p><strong>Gabarito Comentado: Letra B.</strong></p>
<p><em>Justificativa:</em> $LR+ > 10$ confere aumento superior a 45% na probabilidade pós-teste (excelente poder confirmatório), e $LR- < 0,1$ reduz em mais de 45% a probabilidade pós-teste (excelente poder para afastar a doença) (Letra B).</p>

<h4>Questão 7 (Santa Casa de São Paulo / Residência Médica)</h4>
<p>A diretriz internacional que estabelece uma lista de verificação com fluxograma padronizado em 4 fases (Identificação, Triagem, Elegibilidade e Inclusão) para o relato rigoroso e transparente de Revisões Sistemáticas e Metanálises denomina-se:</p>
<ul>
  <li>A) STROBE.</li>
  <li>B) PRISMA 2020.</li>
  <li>C) CONSORT.</li>
  <li>D) CARE.</li>
</ul>
<p><strong>Gabarito Comentado: Letra B.</strong></p>
<p><em>Justificativa:</em> A diretriz <strong>PRISMA 2020</strong> é o padrão internacional consagrado para relato de revisões sistemáticas e metanálises. STROBE é para estudos observacionais, CONSORT para ensaios clínicos e CARE para relatos de caso (Letra B).</p>
`
};
