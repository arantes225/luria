# LURIA — Apostila 110: Ensaios clínicos, revisões sistemáticas e metanálise

**Lote 5 • Medicina Preventiva / Epidemiologia Clínica • Residência / ENAMED / Internato**  
**Estado:** manuscrito autoral em produção editorial, SEM APROVAÇÃO CIENTÍFICA DEFINITIVA; NÃO PUBLICADO.  
**Referências centrais:** CONSORT 2025, SPIRIT 2025, PRISMA 2020, Cochrane Handbook 6.5, RoB 2, AMSTAR 2 e Core GRADE 2025.

> **Como estudar:** primeiro identificar qual decisão cada desenho consegue apoiar; depois examinar o que poderia tornar a resposta errada; em seguida converter números em benefício, dano e incerteza. Uma revisão sistemática com diagrama elegante não corrige um ensaio mal feito. Um ensaio com p inferior a 0,05 não define automaticamente a melhor conduta para seu paciente.

## 0. Etapa zero — recorte curricular e proveniência das referências

**Inventário:** antes da produção desta aula 110 não havia arquivo dedicado no caminho editorial. A aula **105 — Desenhos de estudos epidemiológicos** já desenvolve coortes, estudos caso-controle, transversal, ecológico, questões de temporalidade e base de classificações. É preservada integralmente. A aula **115 — Vieses, confundimento e causalidade** aprofundará DAGs, controle de confundidores, collider bias, mediação e inferência causal em desenhos diversos; a aula 110 cobre as manifestações práticas desses problemas em ECR e síntese de evidências sem duplicar seu escopo.

**Benchmark privado:** a busca no Drive pelo termo ensaio clínico recuperou apenas o PDF geral “Estudos Epidemiológicos.pdf” e documentos clínicos indiretos; não apareceu uma aula equivalente dedicada a ECR, revisão sistemática e metanálise. Não se reutilizaram textos de terceiros cuja licença comercial não foi comprovada.

**Evidência e fontes públicas identificadas em outubro de 2026:**

- **CONSORT 2025:** atualiza a diretriz de *relato de ensaios randomizados*, publicada em abril de 2025, com 30 itens essenciais e fluxograma; substitui CONSORT 2010 no uso corrente. https://www.bmj.com/content/389/bmj-2024-081123
- **SPIRIT 2025:** diretriz de relato de *protocolos* de ensaios randomizados, 34 itens. https://www.bmj.com/content/389/bmj-2024-081477
- **PRISMA 2020:** diretriz de relato de revisões sistemáticas, 27 itens, e fluxos documentais. https://www.prisma-statement.org/prisma-2020
- **Cochrane Handbook, versão 6.5 (2024)** segundo página de versão corrente consultada. https://www.cochrane.org/authors/handbooks-and-manuals/handbook/current
- **AMSTAR 2:** avaliação crítica de revisões de intervenções, 16 itens e domínios críticos, **não é pontuação aditiva simples**. https://www.bmj.com/content/358/bmj.j4008
- **Core GRADE 2025:** atualização do raciocínio sobre certeza na estimativa do efeito para desfechos específicos. https://www.bmj.com/content/389/bmj-2024-081903
- **PROSPERO:** registro prospectivo internacional de revisões em saúde. https://www.crd.york.ac.uk/PROSPERO/

**Os números clínicos usados nos exercícios são fictícios e didáticos**, sem representação de resultados de ensaios históricos ou eficácia real de fármacos. Reporte transparente, qualidade metodológica, ausência de viés, certeza da evidência e importância clínica são propriedades distintas.

## 1. Por que conduzir ensaio clínico se já existe estudo de coorte?

A epidemiologia clínica procura estimar a consequência de escolhas no mundo real. Uma coorte observa a exposição tal como aconteceu; um ensaio randomizado procura **atribuir uma intervenção por mecanismo aleatório**, criando em expectativa grupos comparáveis quanto a fatores prognósticos observados e não observados. Essa atribuição diminui confundimento de origem, mas não remove automaticamente falhas de medida, perdas, abandono da intervenção, contaminação entre braços ou mudança oportunista do desfecho.

**Pergunta típica:** em pessoas hospitalizadas com uma doença, tratamento A reduz mortalidade em comparação a cuidado usual? Uma coorte pode mostrar mortalidade menor no grupo que recebeu A porque a equipe escolheu esse tratamento para pessoas menos graves. A randomização protege o contraste inicial contra essa preferência clínica — desde que tenha sido realizada e ocultada adequadamente e o seguimento não destrua sua utilidade.

A pergunta causal implica definir intervenção, controle, população-alvo, momento zero e desfecho. Esse é o fio que une planejamento, ECR e revisão sistemática: **a decisão clínica deve ser vinculada ao efeito estimado para um desfecho e população bem especificados**.

### 1.1. Hierarquia de evidências: ferramenta, não religião

A ideia de colocar “metanálise de ECR” no topo de uma pirâmide ajuda a lembrar que randomização e síntese podem reduzir erros; mas é perigoso se se ignora contexto. Uma metanálise de cinco ensaios pequenos, mal alocados, com eventos substitutos e perdas seletivas pode fornecer evidência de certeza menor que outra fonte robusta para a pergunta correta. Para efeitos nocivos raros, seguimento longo e dados de vigilância observacional podem ser indispensáveis.

A certeza **GRADE é por desfecho**, não uma nota fixa do artigo. A recomendação clínica também incorpora magnitude absoluta, dano, custo, preferências, equidade e viabilidade. O aluno que decora apenas “ECR é nível 1” pode deixar de perceber resultados não transportáveis para SUS ou populações excluídas do estudo.

### 1.2. A estrutura PICO como contrato operacional

**P (população):** quem é elegível, comorbidades, faixa etária, gravidade, estágio e cenário. **I (intervenção):** dose, duração, início, cointervenções, equipe e tecnologia necessária. **C (comparador):** placebo, intervenção ativa, não intervenção ou cuidado usual explicitado. **O (desfechos):** resultados centrados no paciente (mortalidade, incapacidade, sintomas, qualidade de vida) e danos; separar marcadores substitutos de benefício clínico. Adicionar **T** quando a janela temporal é crucial.

Exemplo didático: “Em adultos com doença crônica X acompanhados em unidades básicas, oferecer acompanhamento remoto estruturado versus seguimento habitual por 12 meses reduz internações não programadas?” A pergunta define unidade de intervenção, comparador e desfecho. Se a intervenção é aplicada por toda uma UBS, há risco de contaminação individual e pode ser mais coerente randomizar unidades (ensaio por clusters).

## 2. O ECR começa antes da inclusão: registro, protocolo e plano analítico

O protocolo deve especificar por que o estudo importa, quem entrará, qual intervenção, como será sorteada e ocultada a sequência, o desfecho primário, tempo de seguimento, cálculo amostral, procedimentos de segurança e análises. O plano estatístico prévio reduz oportunidades de escolher a análise mais favorável depois de olhar dados, embora mudanças justificadas possam ocorrer — nesse caso devem ser documentadas e datadas.

O **SPIRIT 2025** organiza 34 elementos essenciais de protocolo e recomenda transparência do desenho. A **CONSORT 2025** organiza 30 elementos de relatório de resultados, incluindo fluxo, registro, protocolo, dados compartilháveis, análise de danos e diferenças entre intervenção planejada e aplicada. Nenhuma lista garante execução correta: **um artigo pode relatar honestamente um ensaio metodologicamente fraco**.

**Registro prospectivo:** antes do recrutamento, em registro aceito pelo contexto, por exemplo ClinicalTrials.gov ou plataforma apropriada na rede internacional de registros. A plataforma brasileira **ReBEC** é relevante para estudos submetidos a requisitos brasileiros; confirmar obrigação e trâmite da instituição e legislação. Registro facilita comparar desfechos prometidos com desfechos relatados. Um estudo registrado apenas após ver resultados demanda escrutínio adicional; registro por si só não elimina fraude ou seletividade.

### 2.1. Desfecho primário deve existir antes da primeira análise

Se pesquisadores medem trinta desfechos e só publicam o que cruzou p de 0,05, o leitor verá “resultado positivo” selecionado. **Multiplicidade** eleva chance de pelo menos um falso positivo quando não há plano adequado. Mudança legítima no desfecho primário pode ocorrer por motivo externo ao resultado (ex.: revisão de consenso clínico), mas precisa explicar momento, motivo e efeito na interpretação.

**Boa prática didática:** criar tabela “registro/protocolo → artigo → suplemento → dados” e marcar desfechos omitidos/adicionados, análise alterada, subgrupos não previstos e tempo de acompanhamento realmente observado.

### 2.2. Comitês, segurança e ética

Randomização não dispensa consentimento válido, aprovação ética, avaliação da relação risco-benefício, governança de dados e possibilidade de interromper estudos diante de dano ou benefício extremo sob regras predefinidas. No Brasil, os requisitos éticos e regulatórios variam por instituição, tipo de produto e período; o investigador deve verificar o arcabouço CNS/CEP e normas específicas da Anvisa vigentes. **Não tratar aprovação ética como certificado de validade estatística.**

Comitês independentes de monitoramento de dados podem avaliar segurança e eficácia em estudos de maior risco, seguindo limites para análises interinas. Se pesquisadores olham repetidamente os dados e param assim que p cai abaixo de 0,05 sem ajuste, o erro tipo I pode se inflar. O mecanismo de parada precisa ser descrito no plano.

## 3. Randomização: sequência aleatória, ocultação e cegamento são três coisas diferentes

**Geração da sequência:** selecionar alocação usando processo genuinamente aleatório, idealmente informatizado e reprodutível sob governança. Alternância A/B, números pares de prontuário, dia da semana e ordem de chegada **não são randomização** no sentido metodológico rigoroso, pois são previsíveis.

**Ocultação da alocação:** proteger a sequência de quem recruta e decide elegibilidade **até a pessoa ser definitivamente incluída**. Central eletrônica ou farmácia independente com mecanismo idôneo podem ajudar. Envelopes só são adequados se forem opacos, sequenciais, invioláveis e operados corretamente. Uma sequência aleatória conhecida antecipadamente por recrutador permite excluir ou atrasar pessoas conforme braço seguinte, gerando viés de seleção.

**Cegamento:** impedir que participantes, equipes, avaliadores ou analistas saibam o braço **após randomização**. Atua sobre comportamento, cointervenções, avaliação subjetiva e decisões de saída. Nem sempre é factível: cirurgia versus fisioterapia pode ser evidente a quem recebe intervenção. Mesmo assim, cegamento de avaliador ou desfecho objetivo e protocolo simétrico pode reduzir vieses.

### 3.1. Exemplo do sorteio perfeito, execução imperfeita

Um sistema sorteou A ou B por algoritmo. A enfermeira que inclui pacientes viu uma lista das próximas dez alocações e, por boa intenção, excluiu participantes graves quando o próximo braço era A. O ensaio tem geração aleatória, **mas não possui ocultação adequada**. As características basais podem ficar desequilibradas por seleção. A frase “duplo-cego e randomizado” não repararia esse problema.

**Estratificação** (ex.: centro ou gravidade) pode reduzir desequilíbrio em características importantes, mas exige método correto. **Blocos** mantêm proporção entre braços; blocos pequenos de tamanho fixo podem se tornar previsíveis se houver conhecimento do andamento, razão para ocultação rigorosa e eventualmente tamanhos variáveis.

### 3.2. Diferenças basais após randomização

Como o mecanismo é aleatório, algumas características diferirão por acaso, especialmente em amostras pequenas. Usar testes de significância para provar “igualdade basal” não é recomendado como principal garantia de randomização. Examinar relevância clínica das diferenças, adequação do processo e ajustes pré-especificados. Uma diferença importante não comprova fraude automaticamente, mas solicita investigação, particularmente se acompanhada de falhas de ocultação.

## 4. Desenhos experimentais: paralelo, cluster, crossover, fatorial e pragmático

### 4.1. Paralelo individual

Cada participante é randomizado uma vez para A ou B e acompanhado, eventualmente com repetidas medidas. É o formato mais didático e aquele para o qual CONSORT 2025 foi especialmente estruturada; extensões específicas se aplicam a desenhos menos usuais. Não confundir medidas repetidas do mesmo paciente com indivíduos independentes.

### 4.2. Cluster

Randomizam-se grupos, como UBS, escolas, hospitais ou comunidades. Indicado quando intervenção é entregue ao grupo, há grande risco de contaminação ou mudança de sistema. O **efeito de correlação intraclasse (ICC)** torna pacientes do mesmo cluster parcialmente semelhantes; **analisar 2.000 pessoas de 20 UBS como se fossem 2.000 sorteios independentes** pode superestimar precisão. O cálculo amostral e a análise devem reconhecer clusters, número de unidades e eventuais desigualdades de tamanho. Equidade entre unidades e recrutamento depois de conhecido o braço exigem atenção.

### 4.3. Crossover

Cada pessoa pode receber A e B em períodos diferentes, com sequência randomizada (AB/BA). É útil em condições relativamente estáveis e intervenções com efeito reversível. **Carryover** (efeito residual) e tendência temporal confundem comparação se não controlados; período de washout precisa ter justificativa clínica. Não é apropriado cruzar terapias curativas irreversíveis, desfecho morte ou progressão que altere permanentemente estado de base.

### 4.4. Fatorial

Dois fatores são randomizados independentemente para estimar efeitos isolados e potencial interação (ex.: A versus não A; B versus não B). Em esquema 2x2 surgem quatro combinações. A economia amostral depende de hipóteses sobre interação e objetivos; se efeitos interagem de modo importante, uma análise simples de “efeito principal médio” pode ocultar heterogeneidade clínica.

### 4.5. Pragmático e explicativo

ECR explicativo pergunta se intervenção funciona sob condições mais controladas, buscando alta aderência e população selecionada. Pragmático procura estimar efeito de oferecê-la em serviço real: diversos profissionais, comorbidades, adesão imperfeita e desfechos importantes para políticas públicas. Não é dicotomia perfeita: um ensaio pode ser pragmático em elegibilidade, mas altamente controlado na medição.

**Pulo do Gato:** randomizar **atribuição** de tratamento é diferente de obrigar **recebimento e adesão**; muitas decisões de SUS envolvem o efeito de **oferecer** uma tecnologia no mundo real.

### 4.6. Ensaios adaptativos e plataforma

Alguns estudos usam adaptações pré-especificadas, por exemplo alteração da probabilidade de alocação, abandono de braços fúteis ou inclusão de novos tratamentos. Esses desenhos demandam simulações e métodos capazes de preservar validade estatística e operacional; “adaptativo” não significa escolher braço vencedor por intuição. **Ensaios de plataforma** permitem comparações ao longo do tempo sob protocolo-mestre, mas alterações de padrão de cuidado e controle não contemporâneo exigem análise cuidadosa.

## 5. Comparador e equivalência clínica: placebo não é sinônimo de controle adequado

Comparador ideal responde pergunta ética e clinicamente útil. **Placebo** pode estimar efeito específico onde não se retira tratamento efetivo essencial. **Controle ativo** pergunta se nova intervenção supera, não é inferior ou equivale à alternativa já adotada. **Cuidado usual** necessita descrição: pode variar entre serviços, períodos e países, reduzindo transportabilidade.

“Placebo” não significa automaticamente cegamento adequado: efeitos adversos reconhecíveis ou procedimentos diferentes podem revelar braço. **Co-intervenções** (outros antibióticos, fisioterapia, aconselhamento, exames) devem ser monitoradas, porque mudanças assimétricas podem explicar parte do contraste.

### 5.1. Supervisão, contaminação e aderência

Se participantes do controle passam a receber A, o contraste entre braços na análise por atribuição geralmente diminui (não necessariamente sempre). Mas simplesmente excluir “quem trocou” destrói parcialmente a proteção da randomização: a decisão de trocar tratamento pode estar ligada à evolução clínica. Essas situações precisam ser antecipadas na pergunta estimada e no plano de análise.

**Intervenções complexas:** treinamento de equipe, adesão de profissionais e fidelity da intervenção são fundamentais. Uma estratégia de educação na APS que não foi efetivamente implementada em metade das unidades pode falhar por execução, não por ausência de eficácia biológica.

## 6. Superioridade, não inferioridade e equivalência — três perguntas distintas

**Superioridade:** testar se A é melhor que B para um desfecho definido, normalmente H0 de igualdade e análise baseada em estimativa/IC. Um resultado não significativo **não prova equivalência** nem ausência de efeito; pode refletir amostra insuficiente.

**Não inferioridade:** verificar se o desempenho de A **não é pior que B além de margem clinicamente aceitável** predefinida. A margem Δ deve ser justificada por efeito histórico do comparador, contexto de benefício/dano e diferença absoluta clinicamente aceitável. Uma inovação pode valer pequena perda de eficácia se reduz toxicidade, custo ou facilita acesso, mas essa avaliação não autoriza escolher margem excessiva só para facilitar êxito.

**Equivalência:** testar se diferença entre A e B está inteiramente dentro de margem bidirecional (-Δ, +Δ), em desenho e análise adequados. Não é “p maior que 0,05”.

### 6.1. Leitura de intervalo em não inferioridade

Suponha desfecho de **cura**, diferença absoluta definida como A menos B, de modo que valores negativos desfavorecem A. Margem de não inferioridade de **-5 pontos percentuais**. Estimativa A − B = -1 pp, IC de 95% de -3 a +1 pp. Como **todo o intervalo está acima de -5 pp**, os dados são compatíveis com não inferioridade na margem escolhida, se desenho e análise preservam validade. Não houve demonstração de superioridade, porque o IC cruza zero. E o estudo **não provou igualdade exata**.

Se IC fosse -7 a +2 pp, não inferioridade não estaria demonstrada: o intervalo inclui perda pior que a margem. Se IC fosse -3 a -0,5 pp, A seria inferior em diferença estatística, mas ainda poderia satisfazer não inferioridade de 5 pp; isso é distinto de ser preferível clinicamente.

### 6.2. O risco especial de erro por baixa aderência

Em ECR de superioridade, contaminação entre braços frequentemente dilui diferenças e torna mais difícil demonstrar vantagem. Em não inferioridade, essa diluição pode **falsamente favorecer a conclusão** de que resultados são similares. Por isso estudos de não inferioridade exigem rigor de adesão, comparador ativo com efeito comprovado, qualidade da execução e análises complementares bem justificadas. **ITT e per-protocol não são rivais com vencedor universal**; devem ser interpretadas segundo estimando, viés e desenho.

## 7. Amostra, poder, alfa, beta e diferença clinicamente importante

**Alfa (erro tipo I):** risco de rejeitar H0 verdadeira sob plano de teste, geralmente 5% em exemplos. **Beta (erro tipo II):** risco de não rejeitar H0 falsa sob diferença alternativa específica; **poder** = 1 − beta. Um estudo com poder planejado de 80% significa que, se a diferença assumida for verdadeira e premissas valerem, teria cerca de 80% de probabilidade de gerar resultado que cumpre critério de teste. Não significa “80% de probabilidade de hipótese ser verdadeira” nem “os resultados têm 80% de precisão”.

**Parâmetros de cálculo:** efeito esperado, variância/taxa de eventos no controle, nível alfa, poder, razão de alocação, perdas previstas, clusterização quando relevante e tipo de teste. Efeitos previstos superotimistas produzem estudos subdimensionados. O **MCID** ou diferença minimamente importante para paciente deve entrar na escolha de efeito-alvo quando justificável, sem transformar limiar único em consenso absoluto.

**Teste unilateral/bilateral:** não usar unilateral apenas por conveniência para reduzir amostra quando dano no sentido oposto seria clinicamente relevante. Protocolos de não inferioridade usam lógica específica de margem e intervalo; reportar lado do teste e equivalência da inferência.

### 7.1. P pequeno não mede grandeza

Com 100 mil participantes, diferença absoluta de 0,2 ponto percentual pode gerar p pequeno e ser clinicamente modesta — ou importante para população enorme, se baixo dano/custo. Com 100 pessoas, redução absoluta de 10 pp pode não atingir significância, embora efeito seja potencialmente relevante e altamente incerto. A conduta depende de **estimativa, intervalo, dano, custo e valores**, não só de limiar de p.

### 7.2. Intervalo e compatibilidade

O intervalo de confiança de 95% não significa, na interpretação frequentista padrão, “há 95% de probabilidade de o parâmetro fixo estar dentro do intervalo observado”. Representa desempenho de procedimento que, sob premissas adequadas e repetição de amostragens, cobre o parâmetro em cerca de 95% dos intervalos construídos. Para o clínico, seu valor prático é exibir **valores plausíveis compatíveis com os dados e modelo** e verificar se incluem benefício relevante, ausência de efeito e dano.

## 8. Do desfecho relativo ao benefício absoluto: RR, OR, RD, ARR, NNT e NNH

### 8.1. Tabela 2x2 fictícia

| Braço | Evento | Sem evento | Total | Risco de evento |
|---|---:|---:|---:|---:|
| A | 20 | 180 | 200 | 20/200 = 10% |
| B | 40 | 160 | 200 | 40/200 = 20% |

**Risco relativo RR = 0,10 / 0,20 = 0,50**: risco observado de evento no braço A foi metade daquele no B. **Redução relativa do risco (RRR) = 1 − RR = 0,50 = 50%**. **Redução absoluta do risco ARR = 0,20 − 0,10 = 0,10 = 10 pontos percentuais.** **NNT = 1/ARR = 10** pessoas tratadas no horizonte do estudo para prevenir, em média, um evento adicional em relação ao comparador. Esses valores são estimativas de exemplo, não garantia para indivíduo.

A **odds** de evento em A é 20/180 = 0,111; em B é 40/160 = 0,25. **OR = 0,111/0,25 ≈ 0,444**. Logo **OR não é RR**, mesmo com estudo randomizado. Quando o evento é comum, a distância tende a aumentar. O leitor deve identificar a medida calculada, não reinterpretar odds ratio como “metade do risco” em qualquer cenário.

### 8.2. Por que NNT não é constante universal?

NNT depende de **risco basal**, horizonte de acompanhamento, desfecho e tamanho do efeito absoluto, que pode mudar entre cenários. Se a redução relativa fosse constante em 50%, mas o risco basal de certo grupo fosse apenas 2%, o risco com A seria 1% e **ARR = 1 pp → NNT = 100**. Em grupo com risco basal 40%, A poderia levar a 20% e **NNT = 5**. **Essas extrapolações assumem RR estável**, hipótese nem sempre verdadeira. Não transplantar NNT de hospital terciário para UBS sem avaliar população e tempo.

**NNH:** número necessário para causar um dano adicional relativo a comparador, usando **aumento absoluto de risco** no horizonte especificado. Exemplo: dano em 8% versus 3% → ARI = 5 pp → NNH = 20. Benefício e dano devem ser apresentados por desfecho, severidade e duração; um NNT menor que NNH não implica automaticamente melhor decisão, porque gravidade e preferências diferem.

### 8.3. Aritmética simples com efeito negativo e zero

Se ARR = 0, NNT de benefício tende a infinito no modelo pontual, mas há incerteza e intervalo do efeito: não interpretar o símbolo infinito como prova de inexistência de benefício em todas as circunstâncias. Se A aumenta risco do evento indesejável, comunicar dano e NNH, evitando apresentar “NNT = -12” de modo confuso para quem vai decidir.

**Intervalo do NNT:** a transformação recíproca do intervalo de redução absoluta pode atravessar zero, produzindo intervalos descontinuados envolvendo benefício infinito e dano. Não inventar IC simétrico de NNT a partir de erro-padrão da estimativa pontual; métodos e apresentação exigem cuidado.

### 8.4. HR não é risco relativo simples

**Hazard ratio** compara taxas instantâneas de ocorrência entre braços ao longo do seguimento sob modelo de risco temporal, como Cox, com hipóteses de proporcionalidade quando aplicável. HR 0,70 não significa que 30% das pessoas serão salvas ou que probabilidade acumulada caiu exatamente 30% em qualquer horizonte. É necessário examinar curvas de Kaplan–Meier, eventos absolutos em tempo definido, censura, riscos competitivos e mudanças no efeito ao longo do tempo.

**Substitutos:** uma droga reduzir marcador laboratorial em grande proporção não garante melhora em mortalidade ou qualidade de vida. Desfechos compostos podem misturar morte e necessidade de exame de controle, eventos de importâncias diferentes, e ser dominados pelo componente mais frequente e menos grave.

## 9. O que analisar: intenção de tratar, per-protocol, as-treated e estimandos

**Intenção de tratar (ITT):** em interpretação clássica, analisar pessoas no grupo ao qual foram originalmente randomizadas, independentemente de aderência/crossover. Preserva melhor a comparação criada pelo sorteio, mas **não resolve automaticamente ausência de desfechos**, truncamento por morte ou outras intercorrências. O CONSORT 2025 prefere descrição operacional explícita de **quem foi incluído, em qual grupo e como faltantes foram tratados**, evitando rótulo ITT usado indevidamente para análise parcial.

**Per-protocol:** restringir/ajustar análise para pessoas que cumpriram protocolo conforme definição prévia. Pode aproximar efeito sob adesão, mas **aderência é evento pós-randomização** associado a prognóstico; simples exclusão dos não aderentes pode induzir viés de seleção. Métodos causais específicos podem ser necessários para estimar o efeito de adesão.

**As-treated:** categoriza pelos tratamentos de fato recebidos, quebrando atribuição inicial; pode ser útil descritivamente para segurança em certos contextos, mas não tem equivalência causal automática com análise randomizada.

### 9.1. Estimando: definir qual pergunta a análise responde

Um **estimando** especifica população, tratamento/comparação, variável/desfecho, resumo de efeito e estratégia para eventos intercorrentes (interrupção, medicação de resgate, crossover, morte, gravidez durante seguimento etc.). Uma estratégia **treatment policy** pode considerar resultado independentemente de troca terapêutica, enquanto estratégia **hypothetical** imagina cenário sem evento intercorrente. Não são termos intercambiáveis com ITT/per-protocol, embora haja relações.

Exemplo: pacientes com doença crônica sorteados a receber telemonitoramento; 25% não usam aplicativo. **Pergunta para gestor SUS:** “Qual o efeito de ofertar o programa?” tende a focar atribuição e implementação real. **Pergunta mecanística:** “Qual seria o efeito se todos usassem regularmente?” requer hipóteses adicionais sobre adesão, e não basta selecionar apenas quem aderiu.

### 9.2. Ausência de dados é questão causal e estatística

Pessoas perdidas podem ter mais eventos, pior adesão ou barreiras de acesso. A interpretação de faltantes depende de mecanismos como MCAR/MAR/MNAR, que não se estabelecem apenas por teste com valores observados. **Imputação múltipla** sob hipóteses adequadas pode ser útil, mas não inventa informação nem prova ausência de viés. Sensibilidade a cenários plausíveis de perdas desfavoráveis ajuda a testar robustez. **Last observation carried forward** pode criar viés em processos evolutivos e não deve ser adotada por automatismo.

**Exemplo de armadilha:** dos 300 pacientes do braço experimental, 50 saem por efeitos adversos; pesquisador exclui esses 50 e relata benefício entre os 250 restantes. Isso pode melhorar resultado artificialmente. O fluxograma CONSORT e a seção de danos ajudam a descobrir as saídas, mas o leitor precisa julgar o mecanismo.

## 10. Risco de viés em ECR: RoB 2 não é escala de qualidade global

RoB 2 propõe avaliação **por desfecho/resultado específico**, incluindo cinco domínios: (1) processo de randomização; (2) desvios de intervenções pretendidas; (3) dados de desfecho ausentes; (4) mensuração do desfecho; (5) seleção do resultado relatado. A avaliação depende de **qual efeito se quer estimar**, o protocolo e fluxo observados, não apenas de uma marca “estudo randomizado”.

**Domínio 1:** sequência inadequada, ausência de ocultação, desequilíbrio sugestivo de problema. **Domínio 2:** cointervenções desiguais, conhecimento do braço alterando comportamentos e falhas analíticas dependendo do efeito-alvo. **Domínio 3:** perdas importantes relacionadas a evolução. **Domínio 4:** instrumento subjetivo e avaliador não cego com expectativa. **Domínio 5:** múltiplas análises ou escalas possíveis com seleção posterior de resultado favorável.

**Julgamentos:** risco baixo, algumas preocupações ou risco alto, segundo algoritmo e justificativa. Não se calculam pontos arbitrários e não se decreta “todos os desfechos são de alto risco” apenas porque um resultado subjetivo tem avaliação não cega enquanto mortalidade objetiva pode ter mensuração robusta.

### 10.1. Relato bom versus método bom

**CONSORT é guia de transparência de relato. RoB 2 é ferramenta de risco de viés dos resultados.** Um ensaio perfeitamente descrito pode revelar alocação previsível, perdas severas e mudança do desfecho primário. A lista CONSORT completa não deve gerar carimbo de “baixo risco” automaticamente.

### 10.2. Financiamento, conflito e interpretação

Indústria farmacêutica, fundação pública ou pesquisador não comercial podem financiar estudos bons ou ruins; o conflito não substitui avaliação de método, mas deve informar escrutínio de pergunta, escolha de comparador, publicação seletiva, análise de dados e controle editorial. Transparência sobre financiamento e acesso a protocolo, códigos e dados ajuda reprodutibilidade. **Autoria por estatístico independente** também não garante resultados sem viés.

## 11. Desfechos, segurança e interpretação de subgrupos

### 11.1. Desfechos que realmente importam

Desfechos centrados na pessoa — morte, hospitalização, incapacidade, dor, eventos adversos graves, função e qualidade de vida — costumam ter maior valor para decisões. Substitutos como biomarcadores podem antecipar resultados e acelerar estudos, mas sua validação depende de relação confiável com benefício real **na classe de intervenção e cenário em questão**. Um mesmo biomarcador pode se comportar de modo diferente em drogas com efeitos fora do alvo.

**Desfecho composto:** aumenta eventos e poder, mas componentes de gravidade desigual e resposta heterogênea ao tratamento podem mascarar a verdade clínica. Um “benefício combinado” movido apenas pela redução de internação eletiva não significa necessariamente redução de morte.

### 11.2. Eventos adversos não são anexo decorativo

Danos exigem busca ativa, definição prévia, janela adequada, gravidade, abandono e relação causal plausível. Um ECR com 500 pessoas raramente consegue excluir eventos adversos muito raros, mesmo se nenhum ocorrer. **Zero evento no tratamento não significa risco zero**; a incerteza depende do tamanho amostral e do tempo de observação.

Ao comparar benefício de curto prazo e dano tardio, um ECR pode captar melhora imediata sem ter duração para avaliar neoplasia, eventos cardiovasculares ou consequências em gestação. Estudos de segurança pós-comercialização podem complementar, embora frequentemente tragam maior confundimento.

### 11.3. Subgrupos: evidência de interação, não dois p-valores

Erro clássico: “Deu p<0,05 em homens e p>0,05 em mulheres; logo tratamento só funciona em homens.” A inferência correta requer **teste de interação** ou estimativa explícita da diferença entre efeitos, com intervalo, plausibilidade, prespecificação e multiplicidade. Dois p-valores distintos não provam efeitos diferentes. Subgrupos numerosos e exploratórios produzem falsos sinais; resultados devem ser geralmente tratados como geradores de hipótese até replicação.

### 11.4. Análises interinas e parada precoce

Estudos podem parar por segurança, futilidade ou eficácia sob regras apropriadas. Benefícios em ensaios encerrados muito precocemente com poucos eventos podem ser superestimados; verificar número de eventos, cruzamentos de fronteira estatística, transparência do comitê independente e seguimento subsequente. Uma análise interina não planejada feita porque “os resultados pareciam bons” fragiliza inferência.

## 12. Revisão narrativa, sistemática, metanálise e diretriz clínica

**Revisão narrativa:** pode oferecer excelente ensino de fisiopatologia e contexto, mas seleção de estudos não precisa seguir estratégia exaustiva e reprodutível. **Revisão sistemática:** começa com pergunta e critérios explícitos, busca e seleção transparentes, extração e crítica metodológica, com síntese coerente — com ou sem metanálise. **Metanálise:** cálculo estatístico de combinação de estimativas de estudos; pode ser componente de revisão sistemática, mas juntar números não torna a busca sistemática.

**Diretriz clínica:** utiliza revisão, certeza da evidência, benefícios/danos, valores, custo, recursos, equidade e avaliação de implementação para formular recomendações. Não é sinônimo de revisão sistemática nem simples votação de especialistas. **Revisão rápida:** adapta prazos e alguns métodos de revisão, com transparência das simplificações e impacto possível nas conclusões.

### 12.1. Quando NÃO combinar estudos

Se um estudo compara dose preventiva de medicamento em jovens saudáveis por duas semanas e outro testa resgate terapêutico em idosos críticos por seis meses, o agrupamento pode não responder a nenhuma pergunta clinicamente coerente. Se intervenções, comparadores, desfechos e momentos forem incompatíveis, **síntese narrativa estruturada é preferível a metanálise enganosa**.

Metanálise é ferramenta de síntese, não selo de qualidade. Estudos mal controlados podem gerar estimativa pooled precisa e enviesada. **Mais participantes reduzem erro aleatório, mas não apagam viés sistemático compartilhado**.

## 13. Protocolo da revisão: PICO, busca, elegibilidade e decisão de síntese

Uma revisão robusta define PICO, desenhos elegíveis, limites de idioma/tempo com justificativa, desfechos críticos, métodos de busca, seleção, extração, risco de viés, estratégia para agrupamento e abordagem de heterogeneidade antes de conhecer os resultados. O registro em **PROSPERO** é útil quando elegível; alguns projetos podem ser registrados em OSF ou outros sistemas de protocolo. **Ausência de registro não invalida automaticamente revisão**, mas prejudica verificar alterações oportunistas.

### 13.1. Busca reproduzível

Fontes usuais incluem MEDLINE/PubMed, Embase, CENTRAL, bases regionais como **LILACS/BVS** e registros de ensaios, além de literatura cinzenta relevante. A combinação de descritores controlados (MeSH/DeCS) e termos livres busca sensibilidade. O plano deve explicitar operadores AND/OR, limites, data da busca, tradução entre bases, estratégias completas e tratamento de duplicatas.

**Exemplo ilustrativo simplificado:** população (termo para doença X ou sinônimos) AND intervenção (termo A ou família farmacológica), sem incluir palavra “cura” como filtro obrigatório se isso excluir estudos que medem óbito/qualidade de vida. A estratégia real deve ser testada por bibliotecário/metodologista, pois sintaxe muda por banco.

### 13.2. Seleção duplicada e motivos de exclusão

Dois avaliadores independentes, com mecanismo para resolver discrepâncias, reduzem erros e seleção subjetiva. Inicialmente filtram títulos/resumos, depois texto integral conforme critérios. Documentar excluídos em texto completo com motivos permite auditoria. A extração duplicada é recomendável em dados cruciais; campos incluem PICO real, tamanho, características, desfechos, efeitos/IC, perdas, método analítico, financiamento e conflitos.

**Duas publicações do mesmo ensaio NÃO são dois estudos independentes.** Vincular relatórios, registro, protocolo e follow-up, evitando duplicar pessoas e superestimar precisão.

### 13.3. Desfechos “mais bonitos” não substituem os prespecificados

Se a revisão prometeu mortalidade e eventos adversos graves mas inclui apenas biomarcador favorável encontrado em abstracts, é outra pergunta. Ausência de dados pode exigir contato com autores, suplemento, registros e análise explícita de viés de relato. Análise por tempo de seguimento pré-especificado reduz escolha oportunista do período de maior efeito.

## 14. PRISMA 2020: um fluxograma não substitui busca boa

A diretriz **PRISMA 2020** recomenda relatar de modo transparente o racional, pergunta, critérios, fontes, estratégia de busca, seleção, extração, risco de viés, síntese, certeza e limitações da revisão, incluindo **fluxograma de identificação e seleção**. O checklist principal possui 27 itens, além de detalhamentos e extensões quando apropriados.

**Exemplo de fluxo fictício coerente:** 1.200 registros em bases + 80 em registros/otras fontes. Após remover 180 duplicatas restam 1.100 para triagem; 900 excluídos por título/resumo → 200 relatórios buscados; 20 não recuperados → 180 textos avaliados; 150 excluídos com motivos → 30 relatórios incluídos; após relacionar relatórios múltiplos, **25 estudos únicos**. O número de **relatórios** não é necessariamente igual ao número de **estudos**, uma distinção essencial que evita contar o mesmo ensaio duas vezes.

PRISMA **não** verifica se a busca foi suficientemente sensível, se exclusões são corretas ou se a metanálise está certa. Para avaliar o método de uma revisão, ferramentas como **AMSTAR 2** e avaliação crítica dos componentes são mais adequadas. Uma revisão publicada como “PRISMA-compliant” pode ter não procurado estudos não publicados, ter excluído línguas seletivamente ou combinado resultados incompatíveis.

## 15. AMSTAR 2, ROBINS-I e RoB 2 — não confundir unidades de avaliação

**AMSTAR 2:** ferramenta de avaliação crítica da **revisão**, com 16 itens e domínios críticos (por exemplo, protocolo, adequação da busca, justificativa de exclusões, risco de viés, metanálise e viés de publicação conforme aplicável). Não gerar simplesmente “14/16 = qualidade alta”. Falha crítica pode comprometer confiança global mesmo quando muitos itens administrativos estão bem relatados.

**RoB 2:** avalia risco de viés do **resultado em ECR individual**, nos domínios descritos no capítulo 10. Dois desfechos do mesmo ensaio podem ter riscos distintos.

**ROBINS-I:** ferramenta para **estudos não randomizados de intervenções**, incluindo confundimento, seleção, classificação de intervenções, desvios, dados faltantes, mensuração e relato. Não substitui avaliação de estudos diagnósticos (QUADAS) nem é “uma lista mais difícil de CONSORT”.

**GRADE:** avalia **certeza da evidência para um desfecho e comparação**, integrando corpo de estudos e cinco domínios; não é risco de viés do artigo nem pontuação da revisão como produto. GRADE começa em alta certeza nos ECR em abordagem usual e pode rebaixar por limitações; modalidades atualizadas de avaliação de estudos não randomizados exigem explicitar a estrutura adotada.

### 15.1. Quadro de perguntas úteis

| Ferramenta | Objeto | Pergunta respondida | Limite |
|---|---|---|---|
| CONSORT 2025 | Relato de ECR | O artigo descreve o essencial? | Não certifica validade metodológica |
| SPIRIT 2025 | Protocolo ECR | A metodologia foi especificada antes? | Não certifica execução |
| RoB 2 | Resultado ECR | Esse efeito pode estar enviesado? | Não mede precisão ou aplicabilidade |
| PRISMA 2020 | Relato de revisão | Busca, seleção e síntese estão transparentes? | Não garante revisão confiável |
| AMSTAR 2 | Método da revisão | A revisão foi conduzida com rigor? | Não substitui GRADE por desfecho |
| ROBINS-I | Resultado não randomizado | Qual risco de viés na estimativa comparativa? | Requer desenho e definição de efeito adequados |
| GRADE | Corpo de evidência por desfecho | Quão confiável é a estimativa para decisão? | Não decide valores/custos sozinha |

## 16. Medidas de síntese: não agrupar RR, OR, HR e médias como se fossem intercambiáveis

Antes de combinar estudos, definir **mesma medida de efeito, mesmo sentido de benefício e evento**. Um estudo que informa odds ratio, outro risco relativo e outro hazard ratio não deve ser simplesmente somado por média ponderada. Converter entre métricas requer pressupostos e dados adequados; com eventos frequentes, OR e RR divergem significativamente.

**Desfechos contínuos:** diferença de médias (MD) quando unidades iguais (ex.: pressão em mmHg) ou diferença padronizada (SMD) quando escalas diferentes procuram medir o mesmo construto. SMD é número de desvios-padrão, menos intuitivo para decisão; mudar dispersão entre populações altera interpretação. Voltar para escala clínica relevante quando possível, usando âncoras justificadas.

**Razão de riscos e taxas:** ensaios de tempo até evento podem usar HR se premissas aplicáveis; taxa de eventos por pessoa-tempo não é igual a risco acumulado; estudos com recorrência de múltiplos eventos demandam modelos adequados.

**Direção:** alguns artigos definem evento como cura, outros como morte; um RR menor que 1 pode significar benefício em um e dano no outro. Um forest plot que esqueceu inverter sinal pode apresentar conclusão literalmente invertida.

## 17. Metanálise de efeito comum e efeito aleatório

**Modelo de efeito comum (common-effect):** considera que todos estudos compartilham uma única estimativa de efeito verdadeiro sob modelo definido, e diferenças observadas decorrem de erro amostral. Pode ser razoável em pergunta muito homogênea, embora ainda exija avaliar diversidade real.

**Modelo de efeitos aleatórios:** pressupõe distribuição de efeitos verdadeiros entre estudos, em vez de um efeito único. Estima centro dessa distribuição e heterogeneidade entre estudos, frequentemente representada por variância **tau²**. **Não corrige automaticamente heterogeneidade clínica** nem transforma estudos incompatíveis em comparação sensata.

### 17.1. Pesos e precisão

Em métodos comuns de combinação, estudos com variância menor (maior precisão) recebem mais peso; pesos e estimativas dependem da medida/modelo escolhido. No modelo aleatório, acrescenta-se componente de variabilidade entre estudos, de forma que a distribuição de pesos muda. **“Mais participantes = maior peso” é tendência, não regra exata**: variância depende de taxas de evento, dispersão e estrutura.

### 17.2. I² e tau² são diferentes

**I²** descreve a proporção da variabilidade nas estimativas observadas atribuída à heterogeneidade entre estudos, e não apenas ao acaso amostral, sob estrutura do modelo. **Não significa “60% das pessoas são diferentes” ou “o tratamento funciona em 60% dos estudos”**. Pode ser 0% com poucos estudos e ampla incerteza; pode ser elevado quando amostras muito precisas detectam diferenças de efeitos pequenos. A Cochrane oferece faixas interpretativas aproximadas (0–40 talvez pouco importante; 30–60 moderada; 50–90 substancial; 75–100 considerável), **com intervalos sobrepostos e alerta explícito contra cortes automáticos**.

**Tau²:** variância estimada de efeitos verdadeiros na escala analítica, frequentemente log RR/log OR; traduz magnitude de dispersão entre estudos, mas a interpretação depende de unidade/estimador. Não comparar tau² bruto de efeitos em métricas incompatíveis.

**Intervalo de predição:** em modelo aleatório, pode resumir faixa de efeitos verdadeiros esperáveis em um novo cenário, levando em conta heterogeneidade. Pode atravessar ausência de efeito apesar de IC relativamente estreito da média pooled. Com poucos estudos, sua estimativa é instável; não vender como previsão individual garantida.

### 17.3. Explorar heterogeneidade antes de clicar “random effects”

Analisar diferença de pacientes, gravidade, dose, duração, comparador, adesão, qualidade do processo de randomização, momento de medir desfecho e características do sistema. **Meta-regressão e subgrupos** podem explorar hipóteses, mas frequentemente sofrem baixo poder, confundimento ecológico, colinearidade e multiplicidade; conclusões sobre pacientes individuais não decorrem automaticamente de correlações entre estudos.

### 17.4. Estudos pequenos e método de efeito aleatório

Com poucos estudos, certas aproximações usuais de IC do efeito médio podem ter cobertura inadequada; alternativas como ajustes tipo Hartung–Knapp e análises de sensibilidade podem ser relevantes, conforme contexto e recomendações metodológicas. O aluno não precisa decorar a fórmula do estimador para entender a consequência clínica: **um resultado pooled estreito obtido de três estudos pequenos e heterogêneos não merece confiança automática**.

## 18. Como ler um forest plot e detectar interpretações precipitadas

O forest plot é representação gráfica de estimativas e intervalos de confiança de estudos individuais, e frequentemente um resultado agregado. Em uma comparação binária por RR ou OR, a **linha vertical de ausência de efeito** costuma estar em 1; em diferença de médias ou diferença de riscos, costuma estar em zero. Uma mudança de escala ou definição de evento muda a interpretação de cada lado do gráfico.

**Cada linha:** ponto central para a estimativa, traço horizontal para IC; tamanho de quadrado frequentemente proporcional ao peso. **Diamante final:** ponto agregado e IC da síntese, quando foi considerada adequada. **Pontos que caem dos dois lados da linha** significam efeitos pontuais em direções diferentes; não é correto “tirar média” sem discutir heterogeneidade e diferenças clínicas.

**Exemplo inventado:** três ECRs sobre uma estratégia educativa com RR de readmissão 0,70 (IC 0,50–0,98), 0,90 (0,70–1,15) e 1,08 (0,70–1,66). Se o efeito agregado fosse RR 0,83 com IC 0,70–0,98, não se deve dizer “todos estudos provaram benefício”, porque apenas o primeiro teve intervalo abaixo de 1; o segundo e terceiro incluem benefício e dano. Também não se pode afirmar “efeito 17% absoluto”: a redução relativa estimada seria 17%, com efeito absoluto dependente do risco basal.

### 18.1. Gráfico de floresta com I² alto não manda excluir o estudo discordante

Excluir ensaio por apresentar resultado diferente **após ver que ele “estraga” o agregado** gera risco de seleção. Deve haver motivo metodológico ou clínico justificado antes da análise: população não elegível, mudança substancial no comparador, alto risco de viés, horizonte incompatível ou dados duplicados. Sensibilidade com/sem um estudo pode ajudar a entender fragilidade, desde que todas as escolhas sejam documentadas.

**“O intervalo individual passa por 1” não torna estudo inútil.** Ele informa incerteza. O valor da síntese é integrar estimativas coerentes em pergunta comum, respeitando riscos de viés. A contribuição de um estudo pode ser importante mesmo sem significância isolada.

### 18.2. Resultado combinado estatisticamente significativo, aplicação incerta

Suponha metanálise de dez ensaios de reabilitação hospitalar em centros de alta renda, RR de reinternação 0,82, IC 0,75–0,90. Em municípios brasileiros com estrutura distinta, disponibilidade de profissionais e perfil de risco diverso, talvez o efeito real mude. **Aplicabilidade externa** deve considerar quem implementa, que recursos são necessários e se o comparador do estudo corresponde ao cuidado usual que existe no SUS. Precisão não significa transportabilidade.

## 19. Viés de publicação e resultados faltantes

### 19.1. O problema do estudo invisível

Ensaios com resultados favoráveis podem ser publicados antes e com maior probabilidade que estudos nulos, especialmente se não houver registro ou acesso a relatórios. Há também **viés de relato seletivo dentro de estudo**: protocolo prevê eventos adversos e qualidade de vida, mas artigo relata apenas biomarcadores. O corpo de evidência disponível pode superestimar benefício.

**Redução de risco:** procurar registros, repositórios de resultados, teses, atas, anais relevantes, relatórios regulatórios e estudos em curso; confrontar registro com artigo; justificar exclusões e datas de busca. Não presumir que “buscamos MEDLINE e pronto” seja estratégia abrangente. Uma revisão com 5 ensaios publicados e nenhuma busca por resultados não publicados tem limitação reconhecível, mas não se pode quantificar dano sem análise.

### 19.2. Funnel plot: assimetria não é sinônimo de fraude

O gráfico de funil compara magnitude de efeito e precisão/tamanho, com a expectativa de certa simetria sob premissas. **Assimetria pode refletir viés de publicação, mas também heterogeneidade, diferenças de população, efeito maior em estudos pequenos, qualidade de ensaio e acaso.** Com poucos estudos (por exemplo menos de dez), interpretar assimetria/testes com extrema cautela. O diagnóstico de viés de publicação não é obtido por “achar desenho torto”.

**Egger e outros testes** detectam efeitos de estudos pequenos sob premissas; resultados não demonstram mecanicamente que estudos nulos foram escondidos. Métodos de ajuste (como trim-and-fill) fazem suposições fortes e devem ser apresentados como sensibilidades, não “verdade corrigida”. Declarações de certeza devem incorporar evidência ausente plausível.

### 19.3. Literatura cinzenta não é sinônimo de baixa qualidade

Documentos não publicados em periódicos podem conter protocolos, resultados finais de ensaios, dissertações e informes regulatórios úteis para evitar viés de seleção de resultados. Mas informação de repositórios também exige checar risco de viés, dados completos e duplicação de relatórios. **O objetivo é identificar a evidência, não premiar um formato de arquivo.**

## 20. GRADE: o que significa ter confiança na estimativa?

A **certeza da evidência** representa quão confiante se pode estar de que o efeito estimado corresponde de maneira suficientemente próxima ao efeito verdadeiro para o desfecho e decisão. A Cochrane descreve quatro níveis: **alta, moderada, baixa e muito baixa**. O sistema Core GRADE 2025 refina e esclarece o julgamento; a aula usa a formulação convencional e explicita que fontes e métodos podem evoluir.

**Cinco motivos centrais para rebaixar certeza:**

1. **Risco de viés:** falhas de randomização, perdas, aferição, seletividade.
2. **Inconsistência:** resultados com direção/magnitude incompatíveis sem explicação convincente.
3. **Indireção:** população, intervenção, comparador ou desfecho diferem da decisão-alvo.
4. **Imprecisão:** IC permite benefício importante e dano ou número de informações é insuficiente.
5. **Viés de publicação/evidência ausente:** resultados disponíveis podem ter sido selecionados.

Evidência de ECR costuma começar em certeza alta na abordagem convencional, mas pode terminar baixa ou muito baixa por falhas graves. Evidência observacional tradicional começa baixa, com possibilidades contextuais de elevar; **Core GRADE 2025 esclarece que certas abordagens de risco de viés para não randomizados requerem explicitar a estrutura escolhida**. Não atribuir certeza alta automaticamente porque são “três ECRs e uma metanálise”.

### 20.1. GRADE se aplica por desfecho e comparação

Uma revisão de medicamento pode ter certeza **alta para melhora de dor** (grande estudo, instrumento validado, pouca perda) e **muito baixa para mortalidade** (raros óbitos, seguimento curto, IC amplo). A pergunta clínica não se encerra com “o artigo é forte”. Para decidir, construir tabela com riscos absolutos, efeito relativo, IC, número de participantes/estudos, certeza e justificativas.

**Exemplo fictício de Summary of Findings:**

| Desfecho (12 meses) | Risco no controle | Efeito relativo | Diferença absoluta estimada | Certeza hipotética |
|---|---:|---|---|---|
| Hospitalização | 20 em 100 | RR 0,75 | 5 a menos em 100 | Moderada por indireção |
| Mortalidade | 4 em 100 | RR 0,90, IC amplo | 0,4 a menos em 100, muito impreciso | Muito baixa por imprecisão/viés |
| Náusea importante | 3 em 100 | RR 1,8 | 2,4 a mais em 100 | Baixa por poucos eventos |

Esses dados são **hipotéticos**. Mesmo que hospitalização diminua, uma pessoa com alto receio de náusea, baixa capacidade de comparecer ao tratamento ou risco competitivo diferente pode escolher de outra forma. A tabela apresenta informação; a recomendação exige julgamento.

### 20.2. Inconsistência e indireção podem coexistir

Três ensaios de populações muito diferentes podem ter resultados discordantes (inconsistência) e nenhum deles representar o ambulatório brasileiro (indireção). Os domínios são distintos. Não rebaixar duas vezes apenas pelo mesmo problema sem justificativa, mas também não esconder questões separadas porque “o I² foi baixo”.

### 20.3. Imprecisão: atravessar zero é apenas uma parte da história

IC de redução absoluta de -0,5 pp até +8 pp pode incluir pequeno dano e benefício significativo; IC de +0,1 até +0,5 pp pode ser estatisticamente preciso, mas benefício clinicamente modesto. O julgamento de imprecisão depende do limiar de decisão e de que efeitos mudariam a recomendação. **O p não decide sozinho certeza GRADE**.

### 20.4. Certeza da evidência versus força da recomendação

Uma recomendação forte pode depender de riscos de dano, preferências amplamente concordantes e alternativas mesmo quando não há ECR factível em emergência crítica. Uma recomendação condicional pode existir com boa certeza de efeito mas grande variação de valores, custos ou acesso. **Não é correto traduzir “evidência moderada” em “obrigação moderada”** sem discussão de benefícios e danos.

## 21. Metanálise de rede, comparações indiretas e revisões vivas

### 21.1. Quando faltam comparações frente a frente

Metanálise de rede pode estimar A versus C a partir de comparações A versus B e B versus C, e de evidência direta quando disponível. Sua validade depende de **transitividade** (fatores modificadores de efeito semelhantes entre comparações) e de **consistência** entre evidência direta e indireta. A rede não cria ensaio randomizado A versus C onde ele não existiu.

Exemplo: A testado em crianças saudáveis contra placebo, e B testado em idosos graves contra placebo. Comparar A versus B indiretamente pode ser inadequado por diferença de gravidade e idade. Mesmo se a rede produzir ranking de tratamentos, **ranking não prova eficácia clinicamente relevante nem certeza alta**.

### 21.2. Probabilidades de classificação e ranking

Algoritmos podem classificar chance de cada intervenção ser a “melhor” para desfecho. Em rede pequena, com dados imprecisos e muitos nós, um tratamento pode ter alta posição por acaso ou ausência de comparação adequada. **O resultado importante continua sendo efeito absoluto/relativo e certeza**, não apenas o primeiro lugar num ranking SUCRA ou equivalente.

### 21.3. Revisões vivas

Revisão sistemática viva prevê buscas e atualizações frequentes quando evidência surge rapidamente, usando processo transparente de identificação e atualização. A mesma pergunta pode ter conclusão diferente após ensaio grande posterior. É particularmente útil em emergências sanitárias e tecnologia com desenvolvimento rápido; exige governança, versões datadas e capacidade editorial. Uma revisão publicada há cinco anos e nunca atualizada **não é “viva” por ter site que pode ser editado**.

### 21.4. Metanálise de participantes individuais

Síntese de dados de participantes de ECR pode permitir harmonizar desfechos, tratar tempo até evento, avaliar subgrupos com mais robustez e checar qualidade de bases, mas requer acesso, proteção de dados e análise que preserve estrutura dos ensaios. **Juntar todos pacientes num banco e esquecer que foram randomizados dentro de estudos** pode distorcer inferência; usar métodos que respeitem unidades e desenho.

## 22. Estudos de segurança, eventos raros e população excluída do ensaio

O ECR responde melhor quando desfechos podem ser observados com tamanho e duração planejados, mas danos **raros, tardios** e populações excluídas podem escapar. Revisões sistemáticas sobre segurança podem incluir estudos observacionais de boa qualidade e farmacovigilância, avaliados com ferramentas adequadas; isso não torna confundimento irrelevante. Revisões que excluem todos pacientes idosos, gestantes ou pessoas com doença renal do estudo original enfrentam restrição de aplicabilidade.

**Regra dos três, aproximação didática:** se zero eventos são observados entre 100 pessoas expostas, o limite superior aproximado de IC unilateral de 95% para risco de evento raro, sob certas hipóteses, é **3/100 = 3%**, não zero. A regra não substitui métodos exatos nem considera tempo de exposição, dependência ou risco competitivo. Um fármaco pode ter evento de 1/10.000 e nenhum evento em ensaio de 300 participantes.

**Dano e atrito de intervenção:** desfecho “efeitos colaterais leves” pode subestimar descontinuação, hospitalização, incapacidade ou eventos relevantes para o paciente. Quando dois tratamentos têm eficácia parecida, a preferência pode ser determinada por efeitos adversos, facilidade de uso, custos e disponibilidade.

## 23. Do artigo à decisão clínica e ao SUS: efeito absoluto, recursos e equidade

Imaginemos programa de telemonitoramento que reduz visitas não planejadas em grandes centros de pesquisa. Para aplicar em município brasileiro, verificar: há internet/telefone? profissional disponível para responder alertas? custo por pessoa? quem fica excluído por alfabetização digital? há risco de aumentar desigualdades? o “cuidado usual” do ECR corresponde ao local? a tecnologia desloca consultas de grupos que precisam presença física?

**Traduzir resultados em linguagem útil:** “Em 100 pessoas semelhantes às do ensaio acompanhadas por 12 meses, estimamos cinco hospitalizações a menos, com um intervalo que pode incluir redução pequena ou grande, e risco adicional de X quando conhecido.” Esse estilo exige calcular efeito absoluto a partir de risco basal local **sob suposição explícita de transferibilidade da medida relativa**.

**Custo-efetividade:** uma intervenção com eficácia demonstrada pode não ser melhor opção de alocação se custo alto sacrifica alternativas de maior ganho populacional. Avaliação de tecnologia no SUS frequentemente combina evidência com análise econômica, impacto orçamentário e participação social. Não atribuir conclusão da Conitec sem consulta a parecer específico e vigente. **O clínico pode indicar benefício individual e ainda reconhecer necessidade de decisão pública transparente.**

### 23.1. Uma matriz prática de implementação

| Pergunta | ECR/resumo responde sozinho? | O que complementar |
|---|---|---|
| A intervenção causa melhora em ambiente do estudo? | Às vezes, após risco de viés | Validade interna e efeito |
| Qual risco absoluto em minha população? | Nem sempre | Risco basal local e horizonte |
| Há dano raro/tardio? | Frequentemente não | Farmacovigilância e coortes |
| É factível no SUS? | Não necessariamente | Estrutura, treinamento, custos |
| Aumenta desigualdade? | Não necessariamente | Análise por contexto e acesso |
| Pacientes valorizam desfecho? | Não necessariamente | Preferências e decisão compartilhada |

## 24. Guia de leitura crítica em 12 perguntas práticas

1. **Qual é a decisão clínica concreta?** Se a população do estudo não corresponde ao seu paciente, o artigo pode ser excelente e ainda assim pouco aplicável.
2. **Quem foi randomizado e quando?** Confirmar que a comparação nasce antes da evolução que define desfecho.
3. **Como geraram e ocultaram alocação?** “Randomizado” no resumo é insuficiente.
4. **Quem sabia o tratamento?** Perguntar se isso afeta cointervenção e desfecho subjetivo.
5. **O controle é pertinente?** Placebo quando existe padrão efetivo pode não responder à decisão.
6. **O desfecho primário estava predefinido?** Conferir registro e protocolo.
7. **Quantas pessoas foram perdidas e como analisaram?** Fluxograma é documento clínico-estatístico.
8. **A diferença é absoluta e clinicamente importante?** Relatar benefício/dano e tempo.
9. **IC inclui ausência, benefício relevante ou dano?** Não usar p como resposta única.
10. **Há danos suficientes e tempo de avaliação apropriado?** Raros podem passar invisíveis.
11. **Se é metanálise, a busca foi reprodutível e estudos compatíveis?** PRISMA não substitui investigação.
12. **Qual certeza GRADE por desfecho e aplicabilidade local?** Só depois decidir.

**Pulo do Gato:** você não precisa memorizar todos 30 itens CONSORT para notar que o artigo mudou seu desfecho e excluiu 25% das pessoas; é preciso, porém, compreender **por que isso altera a credibilidade** da conclusão. Para escrever uma revisão profissional, as listas completas de relato são obrigatórias e merecem consulta direta.

## 25. Exercícios de raciocínio matemático — quatro contas conferíveis

### Exercício A — risco, redução absoluta e NNT

Ensaio fictício com 1000 pessoas no controle (120 eventos) e 1000 no experimental (80 eventos).  
Risco controle: 120/1000 = 0,12.  
Risco experimental: 80/1000 = 0,08.  
RR = 0,08/0,12 = **0,6667**. RRR = **33,33%**.  
ARR = 0,12 − 0,08 = **0,04 = 4 pontos percentuais**.  
NNT = 1/0,04 = **25** pessoas no horizonte observado.

**Leitura:** é correto dizer “redução relativa aproximada de um terço” e “quatro eventos prevenidos por cem pessoas tratadas”, mas é errado dizer “33 pessoas em cada cem terão benefício individual garantido”. O intervalo de confiança não foi calculado neste exemplo; não inferir significância apenas da tabela.

### Exercício B — mesmo RR em dois cenários hipotéticos

Se RR = 0,5 e risco basal é 4%, risco tratado sob hipótese de RR estável = 2%; ARR = 2 pp e NNT = 50. Se risco basal é 40%, tratado = 20%; ARR = 20 pp e NNT = 5. **O mesmo efeito relativo pode gerar benefícios absolutos muito diferentes**. A transposição supõe estabilidade do RR, que deve ser avaliada.

### Exercício C — OR versus RR

Evento em A: 40/100, em B: 20/100.  
RR de A versus B = 0,4/0,2 = **2,0**.  
Odds A = 40/60 ≈ 0,6667; odds B = 20/80 = 0,25.  
OR = 0,6667/0,25 ≈ **2,667**.  
Não informar “risco 167% maior” usando OR 2,667: isso confunde odds com probabilidade. O risco relativo observado é 2,0 (risco 100% maior), dentro deste exemplo didático.

### Exercício D — margem de não inferioridade

A diferença de cura foi definida como A − B, e a margem como -0,05. Se IC 95% da diferença vai de -0,02 a +0,03, todo o intervalo fica acima da margem negativa, satisfazendo critério estatístico de não inferioridade, se desenho e análise são válidos. Se IC vai de -0,08 a +0,02, não inferioridade não foi demonstrada. **Não inferioridade estatística sem justificativa clínica da margem não garante que A seja escolha adequada.**

## 26. Casos clínico-metodológicos comentados

### Caso 1 — Um ensaio randomizado com alocação previsível

**Apresentação:** um estudo fictício compara duas estratégias de antibioticoterapia, com 400 participantes e mortalidade aos 30 dias como desfecho. Autores relatam “randomização por alternância de dias pares e ímpares”. Recrutadores conheciam próximo braço. **Hipótese de problema:** sequência previsível e falha de ocultação, com possibilidade de seleção de pacientes. **Dados relevantes:** os mais graves foram incluídos preferencialmente no grupo padrão porque médicos aguardaram um dia. **Raciocínio:** ter números aproximadamente iguais em braços não equivale a geração/ocultação aleatória; diferenças de gravidade podem gerar vantagem aparente. **Exames metodológicos:** consultar protocolo e registro; reconstruir sequência, recrutamento, elegibilidade e dados basais. **Interpretação:** alto risco de viés no processo de randomização para os resultados, a depender dos detalhes. **Conduta para leitor:** não tratar estimativa como equivalência causal automática, exigir análise crítica e considerar cautela no GRADE. **Por que importa:** o erro ocorre antes de qualquer análise estatística.

### Caso 2 — O p positivo que não respondeu ao paciente

**Apresentação:** ECR fictício em grande população mostra redução de biomarcador inflamatório de 2 unidades, p<0,001; eventos como internação e morte não foram adequadamente avaliados. **Hipótese:** eficácia demonstrada em desfecho substituto, não prova de benefício clínico. **Dados relevantes:** custo elevado e eventos adversos maiores que placebo em estudo curto. **Raciocínio:** a randomização pode ser válida para biomarcador, mas causalidade para mortalidade requer estimativa própria e validade do substituto. **Exames metodológicos:** conferir MCID, diferença absoluta, estudo de validação do biomarcador e horizonte de danos. **Interpretação:** p pequeno não supera inadequação do desfecho para a decisão. **Conduta:** evitar adotar como estratégia clínica apenas pelo surrogate; aguardar evidência centrada no paciente ou avaliar contexto de risco. **Por que importa:** a estatística responde à pergunta medida, não à pergunta desejada.

### Caso 3 — Não inferioridade erroneamente proclamada

**Apresentação:** tratamento oral A comparado ao padrão B em doença estável, com diferença de cura A−B = -2 pp e IC de -8 a +3 pp; margem de não inferioridade prévia de -5 pp. Autores escrevem “resultados equivalentes, p=0,2”. **Hipótese:** não inferioridade não demonstrada. **Dados:** IC inclui perda de oito pontos percentuais, pior que a margem. **Raciocínio:** um p de superioridade não significativo não testa não inferioridade; o limite inferior deve permanecer acima de -5 pp. **Avaliação:** conferir margem escolhida antes de dados, aderência e ITT/per-protocol. **Conduta editorial:** classificar conclusão como excessiva, discutir incerteza e eventuais ganhos de custo/segurança separadamente. **Por que importa:** paciente pode perder eficácia além do aceitável apesar de ausência de diferença estatisticamente significativa.

### Caso 4 — Perdas seletivas escondidas

**Apresentação:** estudo de intervenção para dor crônica randomizou 150 por braço. No experimental, 45 abandonaram por efeitos adversos e tiveram piora; autores relatam apenas melhora média nos 105 que completaram. No comparador, cinco saíram. **Hipótese:** viés por faltantes e seleção pós-randomização. **Dados relevantes:** fluxograma mostra taxas e motivos assimétricos de abandono, embora resumo diga “análise ITT”. **Raciocínio:** analisar só completadores contraria significado clássico de ITT; imputar último valor sem justificativa também não resolve. **Exames:** registro de desfechos, padrões de faltantes, estratégias de imputação e análises de sensibilidade. **Interpretação:** melhoria aparente pode não persistir quando faltantes são tratados adequadamente. **Conduta do leitor:** avaliar RoB 2, não confiar no rótulo ITT e exigir denominadores por braço. **Por que importa:** a proteção do sorteio se perde quando o seguimento é reconstruído pela resposta ao tratamento.

### Caso 5 — A metanálise precisa, mas clinicamente incompatível

**Apresentação:** revisão fictícia junta oito estudos de “tratamento de pneumonia”: prevenção em adultos saudáveis, terapia pediátrica de resgate, profilaxia em transplantados e cuidado usual em idosos, com doses e desfechos variados. Forest plot apresenta efeito pooled significativo. **Hipótese:** heterogeneidade clínica e indireção invalidam pergunta global. **Dados relevantes:** diferentes PICO e tempos de seguimento, com I² de 20%. **Raciocínio:** I² baixo não prova que intervenções e populações são combináveis; compatibilidade clínica precede estatística. **Avaliação:** reconstruir PICOs, separar perguntas e indicar quando síntese narrativa é mais honesta. **Interpretação:** pooled estatístico não demonstra benefício universal. **Conduta:** não usar agregação como orientação terapêutica única, propor sínteses separadas. **Por que importa:** coerência clínica não é produzida por software.

### Caso 6 — Revisão PRISMA “perfeita” com busca seletiva

**Apresentação:** revisão de medicamento novo tem fluxograma completo e checklist PRISMA, mas só buscou um banco, ignorou registro prospectivo e relatórios não publicados. Quatro estudos publicados foram favoráveis. **Hipótese:** risco de evidência ausente/viés de publicação e falha metodológica da revisão. **Dados relevantes:** registros mencionam ensaios concluídos sem artigo e com desfecho negativo. **Raciocínio:** PRISMA orienta relato, não corrige ausência de busca; AMSTAR 2 avalia fraquezas metodológicas e GRADE discute confiança na evidência. **Avaliação:** ampliar bases, registros, literatura cinzenta e consultar relatórios. **Interpretação:** síntese provavelmente superestima benefício. **Conduta:** reportar limitação crítica, não converter em recomendação forte. **Por que importa:** as fontes invisíveis podem mudar o resultado.

### Caso 7 — Subgrupo que parecia milagroso

**Apresentação:** ECR com efeito geral neutro publicou 18 análises de subgrupo; “homens menores de 50 anos” tiveram p=0,03 e mulheres p=0,09. Não havia hipótese antecipada. **Hipótese:** descoberta espúria por múltiplas comparações e confusão de p-valores. **Raciocínio:** significância em um grupo e ausência em outro não equivalem à interação significativa; com muitas buscas surgem padrões aleatórios. **Avaliação:** teste formal de interação, IC das diferenças, pré-especificação, plausibilidade e replicação. **Interpretação:** resultado exploratório, não prova de eficácia restrita. **Conduta:** não restringir terapêutica por esse achado isolado. **Por que importa:** subgrupos podem transformar estudo negativo em marketing positivo.

### Caso 8 — Aplicar NNT importado no SUS

**Apresentação:** metanálise de ECRs em centros terciários de alta renda mostra RR 0,60 para internação em população de risco basal 30%, com NNT estimado próximo de oito a nove; gestor pretende afirmar mesmo NNT para toda UBS brasileira, onde risco basal estimado é 5%. **Hipótese:** erro na transportabilidade do benefício absoluto. **Raciocínio:** no cenário de 30%, risco tratado sob RR estável seria 18%, ARR 12 pp, NNT ≈8,33 (arredondar para cima: 9); em 5%, tratado 3%, ARR 2 pp, NNT 50. A hipótese de RR invariável também precisa ser avaliada. **Avaliação:** risco basal local, presença de equipe, adesão, custo, populações excluídas e equidade. **Interpretação:** NNT de estudo não é propriedade imutável de fármaco/programa. **Conduta:** estimar efeito absoluto local e combinar evidência com avaliação econômica/implementação. **Por que importa:** o mesmo RR pode justificar decisões distintas sem contradição científica.

## 27. Questões autorais de residência — dez questões com alternativas individualmente comentadas

### Questão 1 — Randomização versus ocultação

Um ECR usa algoritmo genuinamente aleatório, mas o médico que recruta consegue prever a próxima alocação e exclui seletivamente casos graves. Qual problema metodológico principal?

A. Geração de sequência necessariamente não aleatória.  
B. Falha de ocultação de alocação com potencial viés de seleção.  
C. Viés de publicação apenas.  
D. Aumento de heterogeneidade entre estudos.  
E. Erro de conversão de OR para RR.

**Gabarito: B.** **A incorreta:** o sorteio pode ser tecnicamente aleatório, embora sua proteção tenha sido quebrada. **B correta:** o recrutador modifica quem entra conforme braço futuro. **C incorreta:** não envolve escolha de publicar estudos. **D incorreta:** heterogeneidade de metanálise é outro fenômeno. **E incorreta:** nenhuma medida de efeito foi calculada. **Mini-revisão:** randomização, ocultação e cegamento são mecanismos diferentes.

### Questão 2 — Intenção de tratar

Um ECR randomiza 500 pessoas. Dez por cento deixam de tomar tratamento; os autores excluem todos que não aderiram e chamam isso de ITT. Qual avaliação é melhor?

A. Rótulo ITT é automaticamente correto porque houve randomização.  
B. A análise por completadores preserva incondicionalmente a comparabilidade criada pelo sorteio.  
C. A exclusão pós-randomização pode introduzir viés; é necessário explicitar população analisada e estratégia para eventos intercorrentes/faltantes.  
D. Todo abandono significa intervenção ineficaz.  
E. Basta mostrar p<0,05 para descartar problema de perdas.

**Gabarito: C.** **A incorreta:** método de análise importa. **B incorreta:** aderência pode estar ligada ao prognóstico. **C correta:** CONSORT 2025 pede transparência dos denominadores e análise; estimandos especificam alvo. **D incorreta:** motivo do abandono varia. **E incorreta:** p não elimina viés. **Mini-revisão:** ITT clássico acompanha alocação, não redefine grupos pelo comportamento observado.

### Questão 3 — NNT

Em ensaio fictício, 20 de 200 participantes do braço A e 40 de 200 do B tiveram evento indesejável. Qual NNT de A versus B no horizonte observado?

A. 2.  
B. 5.  
C. 10.  
D. 20.  
E. 50.

**Gabarito: C.** **A incorreta:** confunde inverso do RR. **B incorreta:** seria ARR 20 pp, não 10 pp. **C correta:** risco A 10%, risco B 20%, ARR 10 pp, NNT=1/0,1=10. **D incorreta:** resulta de confusão com proporção de eventos no controle. **E incorreta:** corresponderia a ARR 2 pp. **Mini-revisão:** NNT é recíproco da diferença absoluta, não da redução relativa.

### Questão 4 — Não inferioridade

A diferença de cura A menos B tem estimativa de -2 pp e IC 95% de -8 a +3 pp; margem pré-especificada -5 pp. Qual interpretação?

A. A não inferioridade foi demonstrada porque p da superioridade >0,05.  
B. A equivalência foi demonstrada por intervalos que incluem zero.  
C. A é superior porque limite superior é positivo.  
D. Não inferioridade não foi demonstrada, pois intervalo inclui perda pior que -5 pp.  
E. A é obrigatoriamente mais seguro.

**Gabarito: D.** **A incorreta:** p de superioridade não responde a não inferioridade. **B incorreta:** equivalência exige IC contido em margens bidirecionais. **C incorreta:** CI inclui efeitos negativos. **D correta:** limite inferior -8 cruza margem -5. **E incorreta:** segurança não foi medida. **Mini-revisão:** a margem clínica precisa ser defendida antes da análise.

### Questão 5 — CONSORT e PRISMA

Qual alternativa distingue adequadamente CONSORT 2025 e PRISMA 2020?

A. CONSORT é roteiro de relato de ensaios randomizados; PRISMA é roteiro de relato de revisões sistemáticas, nenhum garantindo baixo risco de viés apenas por cumprimento formal.  
B. CONSORT avalia certeza GRADE de revisões e PRISMA randomiza pacientes.  
C. PRISMA é certificado de revisão sem viés de publicação.  
D. CONSORT 2010 continua versão principal vigente após 2025.  
E. Ambas são escalas numéricas de qualidade clínica com nota mínima obrigatória.

**Gabarito: A.** **A correta:** CONSORT 2025 tem 30 itens; PRISMA 2020 tem 27 itens, ambos promovem transparência. **B incorreta:** atribui objetos trocados. **C incorreta:** relato pode ser completo e busca insuficiente. **D incorreta:** CONSORT 2025 substitui versão 2010. **E incorreta:** não são notas de qualidade. **Mini-revisão:** relatório, risco de viés, método da revisão e certeza GRADE são camadas distintas.

### Questão 6 — I²

Metanálise de quatro ECRs apresenta I²=0%, mas intervenções, populações e desfechos são muito diferentes. O que se pode concluir?

A. Homogeneidade clínica absoluta comprovada.  
B. Todos os ensaios têm risco de viés baixo.  
C. O tratamento funciona em 100% dos pacientes.  
D. Não há necessidade de olhar protocolos.  
E. I² baixo não demonstra comparabilidade clínica; poucos estudos e incerteza podem mascarar heterogeneidade relevante.

**Gabarito: E.** **A incorreta:** I² é medida estatística, não equivalência de PICO. **B incorreta:** risco de viés se avalia separadamente. **C incorreta:** estatística não estima resposta individual. **D incorreta:** protocolos são necessários. **E correta:** avaliação clínica precede agregação. **Mini-revisão:** I², tau² e intervalo de predição respondem perguntas diferentes.

### Questão 7 — Subgrupos

Ensaio tem p=0,02 em homens e p=0,10 em mulheres. Sem teste de interação, qual inferência correta?

A. Tratamento só funciona em homens.  
B. Mulheres respondem sempre na direção oposta.  
C. A diferença dos p-valores isoladamente não demonstra diferença de efeito entre sexos; usar teste de interação e considerar multiplicidade.  
D. Não precisa olhar IC nem magnitude.  
E. Resultado de subgrupo sempre supera desfecho primário.

**Gabarito: C.** **A incorreta:** conclusão não sustentada. **B incorreta:** p não informa direção sozinho. **C correta:** diferença entre significativo e não significativo não é necessariamente significativa. **D incorreta:** IC e efeito são centrais. **E incorreta:** subgrupos exploratórios têm risco de falsos positivos. **Mini-revisão:** testar heterogeneidade de efeito diretamente.

### Questão 8 — Bacteriologia ou estatística? (leitura de efeito)

Estudo compara intervenção A a B e reporta OR=0,50 para hospitalização, evento com prevalência elevada. Qual afirmativa correta?

A. OR=0,50 implica risco de hospitalização exatamente metade do controle, sem precisar saber risco basal.  
B. OR é razão de chances; pode diferir substancialmente de RR quando evento é frequente.  
C. OR e HR são medidas idênticas.  
D. OR=0,50 comprova redução absoluta de 50 pontos percentuais.  
E. OR dispensa intervalo de confiança.

**Gabarito: B.** **A incorreta:** confunde odds com risco. **B correta:** diferença cresce quando evento é comum. **C incorreta:** HR é medida temporal de hazard. **D incorreta:** efeito absoluto depende das frequências. **E incorreta:** precisão e incerteza são essenciais. **Mini-revisão:** razão, risco, odds e hazard não são sinônimos.

### Questão 9 — Certeza GRADE

Revisão sistemática reúne cinco ECRs, porém todos têm muitas perdas associadas a piora clínica e IC conjunto permite benefício relevante e dano. Qual julgamento é adequado?

A. Certeza necessariamente alta porque há ECR.  
B. Certeza necessariamente alta porque há metanálise.  
C. Relato PRISMA completo impede rebaixar certeza.  
D. Considerar rebaixamento por risco de viés e imprecisão, por desfecho, justificando a decisão GRADE.  
E. Não se pode julgar certeza sem usar o número de artigos como escore.

**Gabarito: D.** **A incorreta:** desenho define ponto de partida, não conclusão. **B incorreta:** agregação não elimina viés. **C incorreta:** guia de relato não corrige perdas. **D correta:** duas limitações distintas podem reduzir confiança. **E incorreta:** contagem isolada não é GRADE. **Mini-revisão:** GRADE julga estimativas de desfechos, não a aparência do artigo.

### Questão 10 — Viés de publicação

Revisão apresenta checklist PRISMA, mas omite registros de ensaios, teses e resultados negativos conhecidos; publica somente quatro artigos favoráveis. Qual preocupação é mais adequada?

A. Erro de classificação de hipertensão.  
B. Falha que pode produzir evidência ausente e superestimar benefício, apesar de relato estruturado.  
C. Confirmação de baixo risco de viés porque houve quatro estudos.  
D. Certeza alta por definição de revisão sistemática.  
E. Prova de que nenhum estudo desfavorável foi feito.

**Gabarito: B.** **A incorreta:** não é questão clínica específica. **B correta:** busca seletiva pode distorcer corpo de evidência; revisar registro e ampliar buscas. **C incorreta:** quantidade não substitui seleção. **D incorreta:** título não define certeza. **E incorreta:** ausência na amostra não demonstra inexistência. **Mini-revisão:** PRISMA é transparência; robustez requer busca, método, RoB e GRADE.

## 28. Recursos visuais: dez candidatos para produzir/curar sem direitos presumidos

| Nº | Imagem ou esquema | Conteúdo didático | Ponto da aula | Plano de direitos |
|---|---|---|---|---|
| 1 | Fluxograma autoral de PICO até recomendação | Pergunta → ECR → revisão → GRADE → decisão | §1/23 | Criar ilustração original |
| 2 | Diagrama de randomização e ocultação | Diferença entre sorteio, recrutamento e cegamento | §3 | Criar ilustração original |
| 3 | Gráfico autoral de risco basal e NNT | Mesmo RR em dois grupos, NNT diferente | §8/25 | Construção vetorial original |
| 4 | Esquema de margens de não inferioridade e IC | Interpretar limite inferior de margem | §6/25 | Construção original |
| 5 | Fluxograma CONSORT ilustrativo de ECR fictício | Recrutamento, randomização, perdas e análise | §2/9 | Autoria própria, sem copiar figura oficial |
| 6 | Fluxograma PRISMA fictício | Registros, relatórios, estudos únicos | §14 | Construção original |
| 7 | Forest plot original com três ensaios fictícios | Leitura de linha nula, pesos e IC | §18 | Construir a partir de números didáticos, sem usar resultados reais |
| 8 | Esquema funnel plot simétrico/assimétrico | Limites da interpretação de estudos pequenos | §19 | Construção original |
| 9 | Matriz visual comparativa CONSORT/PRISMA/RoB2/AMSTAR/GRADE | Objetos distintos de avaliação | §15/20 | Autoria LURIA |
| 10 | Summary of Findings GRADE com efeito absoluto e certeza | Traduzir evidência para decisão clínica | §20/23 | Autoria LURIA com exemplo fictício |

**Curadoria:** embora vários candidatos sejam diagramas originais, a regra premium exige verificar se imagens reais de literatura são clinicamente mais instrutivas. Para estudo de metodologia, os gráficos autorais com dados transparentes são geralmente superiores a fotografias sem contexto. Se for usada imagem oficial de guideline, conferir licença comercial, atribuição e permissão; página publicamente acessível **não implica** licença para reprodução comercial. Produzir WebP responsivo e imagens legíveis com texto alternativo.

## 29. Referências metodológicas auditáveis

1. Hopewell S, Chan AW, Collins GS et al. **CONSORT 2025 statement: updated guideline for reporting randomised trials.** BMJ. 2025;389:e081123. https://www.bmj.com/content/389/bmj-2024-081123. Especifica 30 itens e relata mudanças frente a 2010.
2. Hopewell S et al. **CONSORT 2025 explanation and elaboration.** BMJ. 2025;389:e081124. https://www.bmj.com/content/389/bmj-2024-081124. Apoia distinção entre relato e qualidade de condução, documentação de intervenções e perdas.
3. Chan AW et al. **SPIRIT 2025 statement: updated guideline for protocols of randomised trials.** BMJ. 2025;389:e081477. https://www.bmj.com/content/389/bmj-2024-081477. Diretriz de protocolo com 34 itens.
4. Page MJ et al. **The PRISMA 2020 statement: an updated guideline for reporting systematic reviews.** BMJ. 2021;372:n71. https://www.bmj.com/content/372/bmj.n71. Checklist e fluxograma de revisões.
5. **PRISMA Statement**: https://www.prisma-statement.org/prisma-2020. Documentos e explicações.
6. Higgins JPT et al (eds). **Cochrane Handbook for Systematic Reviews of Interventions**, versão 6.5 (2024) conforme página oficial consultada. https://www.cochrane.org/authors/handbooks-and-manuals/handbook/current. Métodos de busca, síntese, viés e GRADE.
7. **Cochrane Handbook, Chapter 10: Analysing data and undertaking meta-analyses.** https://www.cochrane.org/authors/handbooks-and-manuals/handbook/current/chapter-10. Heterogeneidade, I², intervalos e agregação.
8. **Cochrane Handbook, Chapter 14: Completing Summary of Findings tables and grading certainty of evidence.** https://www.cochrane.org/authors/handbooks-and-manuals/handbook/current/chapter-14. Cinco domínios GRADE e quatro níveis.
9. Shea BJ et al. **AMSTAR 2: a critical appraisal tool for systematic reviews...** BMJ. 2017;358:j4008. https://www.bmj.com/content/358/bmj.j4008. 16 itens e domínios críticos, sem escore simples.
10. **Core GRADE 1: overview of the Core GRADE approach.** BMJ. 2025. https://www.bmj.com/content/389/bmj-2024-081903. Atualização metodológica da certeza para efeitos de intervenção.
11. **Core GRADE 2: choosing the target of certainty rating and assessing imprecision.** BMJ. 2025. https://www.bmj.com/content/389/bmj-2024-081904. Interpretação de incerteza e limites de decisão.
12. **PROSPERO — International prospective register of systematic reviews.** https://www.crd.york.ac.uk/PROSPERO/. Registro prospectivo de revisões.
13. **RoB 2 — Cochrane risk-of-bias tool for randomized trials.** Manual e recursos em https://www.riskofbias.info/welcome/rob-2-0-tool. Cinco domínios por resultado.
14. **ROBINS-I — risk of bias in non-randomised studies of interventions.** Ferramentas em https://www.riskofbias.info/welcome/home. Métodos e referência a confirmar na auditoria final.
15. **Registro Brasileiro de Ensaios Clínicos (ReBEC).** https://ensaiosclinicos.gov.br/. Portal de registro; validar normas aplicáveis ao protocolo específico.
16. **ClinicalTrials.gov.** https://clinicaltrials.gov/. Consultas de protocolos, resultados e modificações.
17. **GRADE Working Group.** https://www.gradeworkinggroup.org/. Recursos metodológicos e atualizações.
18. **Apostila interna 105 — Desenhos de estudos epidemiológicos**, arquivo editorial preservado. Limites curriculares: estudos observacionais versus base experimental; a 110 aprofunda ECR e síntese.

## 30. Auditoria editorial interna — pendências preservadas para o Codex

**Cobertura construída:** fundamentos e hierarquia; PICO; protocolos/registro; CONSORT/SPIRIT; randomização, ocultação e cegamento; paralelos, clusters, crossover, fatorial e pragmático; controle/adesão; superioridade/não inferioridade; alfa/beta e poder; RR/OR/HR/RD/NNT; ITT/per-protocol/estimandos; RoB 2; subgrupos, desfechos e danos; revisão narrativa versus sistemática, busca e PRISMA; AMSTAR 2/ROBINS-I/GRADE; modelos de metanálise, I²/tau²; forest/funnel; publicação seletiva; rede e revisão viva; eventos raros; aplicação ao SUS; quatro exercícios matemáticos; **oito casos comentados, dez questões completas e dez visuais originais candidatos**.

**Pendências:** auditoria metodológica independente das explicações de efeito comum/aleatório, dos exemplos de IC e estimandos; verificação de todas versões de ferramentas e elegibilidade de registro no Brasil; links para referências de fontes reais no HTML; refinamento de explicação sobre certeza em estudos não randomizados segundo Core GRADE 2025; desenho dos dez visuais (não foram incorporados), validação de acessibilidade/legibilidade em PWA; revisão de provas e deduplicação com aulas 105 e futura 115; transformação do manuscrito Markdown em conteúdo LURIA; revisões cruzadas de bibliografia, imagens, direitos, erros de digitação e cálculo.

**Política de release:** nenhum conteúdo desta aula está certificado para publicação. **Depois que TODOS os manuscritos de TODOS os lotes forem criados, o Codex deverá executar a auditoria geral registrada em apostilas/_rascunhos/AUDITORIA-GERAL-CODEX-APOSTILAS.md**, com matriz tema/ID, revisão científica, correção fundamentada, revisão de licenças, verificação de duplicação, testes desktop/PWA, relatórios e PRs. Não fazer merge, deploy ou alterações no banco de produção automaticamente.

**STATUS: RASCUNHO AUTORAL ORIGINAL, EM BRANCH EDITORIAL, NÃO PUBLICADO.**
