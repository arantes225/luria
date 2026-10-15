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

**PARECER DE PRODUÇÃO PARCIAL:** capítulos 0–17 constituem a base metodológica. Os capítulos seguintes incluirão gráficos, viés de publicação, GRADE, aplicação SUS, exercícios, casos, questões, figuras e auditoria. Não publicar antes da conclusão.
