# LURIA — Apostila 115: Vieses, confundimento e inferência causal em Medicina

**Lote 5 • Medicina Preventiva e Epidemiologia Clínica • ENAMED / Residência / Internato**  
**Manuscrito autoral em revisão • 15/10/2026 • NÃO PUBLICADO.**

> **Pergunta de abertura:** quando dois grupos apresentam resultados diferentes, **o que nos permite atribuir a diferença à exposição ou intervenção?** A resposta não está apenas no p-valor nem no número de pessoas. Está na definição do efeito pretendido, em quem entrou e quando, no processo que gerou a exposição, na medida correta de variáveis e na avaliação dos caminhos que criam associações enganosas. A correção de viés começa no desenho conceitual, muito antes de executar regressão.

## 0. Auditoria de existência, fontes e recorte sem duplicação

A aula **105 — Desenhos de Estudos Epidemiológicos** já define coorte, caso-controle, transversal, ecológico e seleção do desenho; a **110 — Ensaios Clínicos e Revisões Sistemáticas** aprofunda randomização, estimandos, ITT, não inferioridade, RoB 2, PRISMA e GRADE. Ambos os manuscritos ficam preservados. **Esta 115** responde à pergunta de como um efeito pode ser distorcido **mesmo em estudo de aparência metodologicamente boa**, especialmente por confundimento, seleção, erro de informação, tempo imortal, ajustamento inadequado, regressão e pressupostos causais.

**Etapa zero:** a busca no Drive pelos termos viés, vieses, causalidade e confundimento não encontrou apostila equivalente; resultados não relacionados foram descartados. Não foi reproduzido texto ou imagem de documentos de terceiros. Antes de criar este arquivo, o caminho dedicado não existia na branch editorial ancestral.

**Bibliografia principal acessada:**
- Hernán MA, Robins JM, *Causal Inference: What If*, versão online do livro. https://www.hsph.harvard.edu/miguel-hernan/causal-inference-book/ — conceitos de resultados potenciais, intercambiabilidade, positividade, consistência, ensaios-alvo, g-métodos.
- Hernán MA et al. *Specifying a target trial prevents immortal time bias and other self-inflicted injuries in observational analyses*. J Clin Epidemiol 2016. https://pmc.ncbi.nlm.nih.gov/articles/PMC5124536/.
- Hernán MA, et al. *Target trial emulation: applying principles of randomised trials to observational studies*. BMJ 2022. https://www.bmj.com/content/378/bmj-2022-071108.
- Elwert F, Winship C. *Endogenous Selection Bias: The Problem of Conditioning on a Collider Variable*. Annu Rev Sociol 2014. https://pmc.ncbi.nlm.nih.gov/articles/PMC6089543/.
- VanderWeele TJ, Ding P. *Sensitivity Analysis in Observational Research: Introducing the E-Value*. Ann Intern Med 2017. https://pubmed.ncbi.nlm.nih.gov/28693043/.
- **STROBE 2007**, 22 itens para relato de observacionais, **não validação metodológica**. https://www.equator-network.org/reporting-guidelines/strobe/.
- **ROBINS-I**, risco de viés de resultados de estudos não randomizados de intervenções. https://methods.cochrane.org/bias/risk-bias-non-randomized-studies-interventions. **ROBINS-I V2**, revisão divulgada em 20/11/2025, **ainda rascunho sujeito a alterações em 15/10/2026**. https://www.riskofbias.info/welcome/robins-i-v2. Sua licença indicada no portal é **CC BY-NC-ND**: não reproduzir imagem/checklist em produto comercial sem permissão.
- Textor J et al. DAGitty and causal graph adjustment, Int J Epidemiol 2016/2017; https://doi.org/10.1093/ije/dyw341. Usar como ferramenta/conceito, **sem importar ilustrações de terceiros**.

**Definição de escopo:** exemplo de estudo é útil se mostra que certa decisão aparentemente razoável — ajustar idade, filtrar sobreviventes, comparar quem completou terapia — pode criar viés. A aula não repetirá longas classificações de coorte/ensaio da 105/110, nem ensinará meta-análise novamente. Os dados numéricos dos exemplos são **fictícios**, para ensino, e nunca resultados clínicos reais.

## 1. Associação, efeito e o mundo que não observamos

Considere uma exposição **A** (por exemplo, iniciar tratamento ao diagnóstico) e desfecho **Y** (internação em 12 meses). Observamos a evolução de quem recebeu A e de quem não recebeu. A pergunta causal é: **o que teria acontecido com as mesmas pessoas, no mesmo tempo e contexto, sob a outra estratégia?** Esse cenário alternativo não é simultaneamente observável para uma pessoa; é o problema fundamental da inferência causal.

A abordagem de **resultados potenciais** representa Y(1), o desfecho da mesma pessoa se exposta, e Y(0), se não exposta. O efeito individual hipotético Y(1)−Y(0) não pode ser observado diretamente na mesma pessoa no mesmo horizonte; buscamos uma média de efeitos em população bem definida, com hipóteses que conectam grupos observados a contrafactuais.

**Associação:** P(Y|A=1) diferente de P(Y|A=0) nos dados. **Efeito causal:** diferença entre P(Y(1)) e P(Y(0)) em população-alvo. Em dados observacionais, associação pode diferir do efeito porque pessoas que escolhem/recebem tratamento já diferem em gravidade, acesso ou prognóstico.

### 1.1. Exemplo de associação protetora espúria

Em coorte fictícia, usuários de aplicativo de controle glicêmico têm hospitalização de 5% e não usuários 10%. O aplicativo pode ajudar, mas usuários podem ser mais jovens, mais alfabetizados, ter internet, equipe que acompanha mais de perto e doença menos grave. A diferença **observada de 5 pontos percentuais** não é necessariamente efeito de disponibilizar aplicativo a todos. O primeiro passo não é calcular p: é identificar **quem decidiu usar** e **quais causas do desfecho também influenciaram uso**.

### 1.2. Fato, hipótese e inferência devem ser rotulados

**Fato observado:** 5% versus 10% em grupos analisados. **Hipótese causal:** se a mesma população tivesse acesso/adesão ao aplicativo, internaria menos. **Pressupostos:** fatores prognósticos relevantes medidos adequadamente, seleção não distorce, há comparação possível para perfis e intervenção é bem definida. **Inferência:** estimar efeito sob esses pressupostos, comunicando incerteza. Não transformar hipótese em fato por inserir uma regressão.

### 1.3. Associação não-causal pode ser extremamente precisa

Um banco com milhões de registros pode estimar RR observacional com IC estreito e viés intenso. Aumentar n reduz erro aleatório sob hipóteses, **não elimina confundimento, seleção ou informação errada**. Este é motivo pelo qual “big data resolve o estudo” é promessa metodológica falsa.

## 2. Contrafactuais e estimandos: qual efeito, para quem e quando?

A comparação causal precisa definir **população, estratégias, início, acompanhamento, desfecho e modo de lidar com eventos intercorrentes**. Efeitos podem ser expressos em risco acumulado (diferença/razão de riscos), tempo até evento, qualidade de vida ou custos; o estimando e a medida dependem da decisão.

**ATE — efeito médio do tratamento na população-alvo:** diferença média Y(1)−Y(0) na população definida. **ATT — efeito médio entre tratados:** diferença entre desfecho tratado observado e desfecho que **esses tratados** teriam sob não tratamento. **ATC** analogamente para não tratados. Em heterogeneidade de efeito, ATE e ATT **podem ser distintos mesmo após análise causal correta**, pois representam populações diferentes.

### 2.1. Oferta versus recebimento

Uma equipe quer saber efeito de **oferecer** visita domiciliar a gestantes de alto risco; outra pergunta efeito de **receber efetivamente** pelo menos quatro visitas. O segundo envolve adesão e decisões após o início, potencialmente ligadas à saúde. Excluir não aderentes e chamar esse número de efeito puro da intervenção é equivocado. A análise por atribuição e estratégias por protocolo requerem perguntas e suposições distintas, tema relacionado à aula 110.

### 2.2. Definir momento zero

Se intervenção é iniciada em qualquer momento nos 30 dias após alta, a data de alta não é automaticamente igual à data da primeira prescrição. É preciso alinhar elegibilidade, escolha da estratégia e início de acompanhamento, ou usar métodos que lidem com **período de graça** e estratégias dinâmicas. Falhas aqui criam **tempo imortal** e viés de seleção antes de qualquer modelo multivariável.

## 3. As três hipóteses principais de identificação causal

### 3.1. Intercambiabilidade (exchangeability)

Em linguagem intuitiva, dentro de grupos comparados, a distribuição de resultados potenciais deveria ser equivalente após condicionar corretamente nas causas necessárias: o grupo com tratamento pode representar o que aconteceria ao grupo sem tratamento caso recebesse tratamento. Randomização bem conduzida tende a criar essa situação em expectativa no início; observacionais dependem de ajuste/estratégia e de medir adequadamente confundidores.

**Intercambiabilidade condicional** pode ser escrita como Y(a) independente de A dado L (confundidores medidos), sob desenho causal escolhido. **Não é testável integralmente a partir dos dados observados**, porque contrafactuais não vistos permanecem não observados. Conseguir bons *balance plots* depois de propensity score não demonstra ausência de confundimento não medido.

### 3.2. Positividade

Para cada combinação relevante de covariáveis L na população-alvo, deveria haver probabilidade positiva de receber cada estratégia comparada. Se determinado fármaco **nunca** é prescrito a gestantes por contraindicação, não há dados diretos que informem o efeito daquele fármaco nesse grupo; extrapolar de homens/gestantes não expostas é outra pergunta.

Positividade **estrutural** pode falhar por contraindicação. Positividade **prática** pode falhar quando poucos pacientes de determinado perfil recebem uma opção, gerando pesos muito grandes e estimativas instáveis. Não “consertar” ausência de comparação simplesmente aumentando complexidade da regressão.

### 3.3. Consistência

O desfecho observado sob a intervenção efetivamente recebida corresponde ao resultado potencial para aquela estratégia **se a intervenção estiver suficientemente bem definida**. “Recebeu algum cuidado de qualidade” pode incluir visitas presenciais intensivas ou mensagens automatizadas quase sem contato; são intervenções distintas agrupadas por rótulo vago. Se versões de intervenção têm efeitos diferentes e não são especificadas, consistência e interpretação ficam comprometidas.

### 3.4. Outros pontos essenciais

Interferência entre indivíduos pode ocorrer (vacinação comunitária, antibióticos e resistência, campanhas de mídia, transmissão de doença): a intervenção em uma pessoa **altera risco de outra**. O pressuposto de ausência de interferência frequentemente acompanha formas de consistência/SUTVA e precisa ser avaliado. Para política populacional, efeitos indiretos podem ser justamente o objetivo, exigindo definição de estimando apropriada.

**Mensuração válida e ausência de viés de seleção/tempo zero** são condições adicionais cruciais, não garantidas pelas três hipóteses principais. Dados não aleatórios podem produzir inferência causal útil, mas somente com pergunta e métodos transparentes.

## 4. DAGs: mapas de hipóteses causais, não gráficos decorativos

**Directed acyclic graph (DAG)** é grafo de **setas direcionadas sem ciclos**, representando hipóteses sobre relações causais. Uma seta A→Y indica que A pode afetar Y de forma direta no modelo; a ausência de seta também é hipótese e pode ser errada. **Acyclic** significa que não há sequência de setas que retorne ao mesmo nó; relações recíprocas ao longo do tempo devem ser modeladas com nós datados distintos, como L0→A0→L1→A1.

Os DAGs ajudam a escolher variáveis para ajuste, reconhecer confundimento, mediação e colisores. **Não são aprendidos automaticamente por desenho bonito** nem provam relações causais. Devem ser construídos com fisiopatologia, temporalidade, evidência e especialistas, antes de selecionar covariáveis conforme p.

### 4.1. Confundidor: uma causa comum

DAG simples fictício:

**L → A → Y, e L → Y**.

L pode ser **gravidade basal**, que influencia prescrição A e prognóstico Y. A associação A–Y recebe componente da via não causal **A ← L → Y**, também chamada *backdoor path*. Ajustar L adequadamente **pode bloquear** essa via, desde que não abra outras e seja medido com qualidade.

**Exemplo:** pacientes mais graves recebem antibiótico intravenoso; também morrem mais por causa da gravidade. Comparar mortalidade bruta IV versus VO pode fazer IV parecer nocivo, mesmo que seja benéfico em grupo elegível. Ajuste por gravidade **antes** do tratamento é pertinente, mas é preciso perguntar se gravidade foi registrada com resolução suficiente.

### 4.2. Mediador: parte do caminho causal

DAG **A → M → Y**. A reduz PA (M), e a redução influencia AVE (Y). Se o objetivo é efeito **total** de A sobre Y, ajustar PA após A pode **bloquear parte do benefício real**, estimando outra quantidade ou criando viés caso haja outras relações. O efeito **direto** não-mediado por PA é pergunta distinta, que exige pressupostos e métodos apropriados.

**Armadilha:** em estudo de perda de peso e mortalidade, ajustar “peso alcançado aos seis meses” pode remover parte do efeito da intervenção. Não incluir automaticamente no modelo toda variável que “prediz bem morte” se foi causada pelo tratamento.

### 4.3. Colisor: uma consequência comum que abre caminho

DAG **A → S ← U → Y**, onde S pode ser **hospitalização** ou inclusão em banco de hospital e U é gravidade não medida. Se restringimos análise a S=1, abrimos associação entre A e U, mesmo que A e U fossem independentes na população. Em palavras: entre pessoas hospitalizadas, se A é uma razão para entrar no hospital, pessoas sem A podem estar ali porque são mais graves; comparar só internados gera efeito enganoso.

**Não confundir causa comum (confundidor) com consequência comum (colisor).** Ajustar confundidor fecha caminho; condicionar em colisor abre caminho. O colisor pode ser variável pré-exposição ou pós-exposição, dependendo da estrutura, e **a seleção do estudo também pode equivaler a condicionamento**. Elwert e Winship (2014) detalham esse problema.

### 4.4. Descendente de colisor e mediador

Ajustar variável **descendente** de colisor pode introduzir viés mesmo sem ajustar colisor diretamente. Ajustar mediador pode bloquear parte de efeito total. **Ajustar descendente de exposição** pode ainda gerar viés se houver causa comum do descendente e desfecho, especialmente quando essa causa é afetada pela exposição. Por isso a regra “ajustar só variáveis pré-tratamento” é um **bom primeiro filtro** em comparações básicas, mas não substitui DAG e contexto.

### 4.5. Confundidor não é sinônimo de fator de risco forte

Variável pode prever intensamente Y e não ser confundidor da relação A–Y. Por exemplo, marcador laboratorial que só prediz mortalidade, mas não determina tratamento nem compartilha caminho de confusão, pode aumentar precisão se medido adequadamente, mas não é necessário bloquear backdoor. Incluir muitas variáveis que **predizem exposição sem predizer desfecho** pode agravar positividade ou variância em alguns métodos.

## 5. D-separation e critério backdoor em linguagem clínica

Uma **via** em DAG é sequência de arestas, independentemente da direção; pode transmitir associação estatística se estiver “aberta”. Um caminho não causal iniciado por seta para dentro da exposição, como **A ← L → Y**, frequentemente transmite confundimento. Ajustar em L pode fechar caminho. **Caminho A → S ← Y** é bloqueado por padrão em S (colisor), mas condicionar em S o abre.

**D-separation** formaliza quando um conjunto de variáveis bloqueia todas vias relevantes, de acordo com DAG. A regra de bolso: caminhos com nós não colisores condicionados são bloqueados; caminhos com colisores permanecem bloqueados **a menos que se condicione no colisor ou em descendente apropriado**. O conjunto mínimo de ajuste deve fechar vias espúrias e evitar bloquear efeitos que se deseja incluir ou abrir caminhos por seleção.

### 5.1. “Ajustei por tudo que tinha” pode piorar

Imagine coorte de cirurgia com idade, comorbidades e gravidade basal, mas também complicação pós-operatória, dias internado e necessidade de reoperação. O objetivo é comparar efeito total de cirurgia A versus B em mortalidade. Ajustar **complicação e reoperação**, causadas parcialmente pela cirurgia, pode retirar a via pela qual cirurgia realmente altera risco ou criar seleção. Ajustar **tempo de internação** pode ser ainda pior, pois é afetado tanto por tratamento quanto por gravidade e desfecho.

### 5.2. Como escolher covariáveis?

Listar causas basais do tratamento e desfecho, histórico clínico prévio, acesso e contexto. Desenhar DAG com especialistas e avaliar conjuntos suficientes de ajuste. Ferramentas como **DAGitty** podem computar conjuntos de ajuste sob DAG fornecido, mas não certificam que as setas são verdadeiras. Registrar **versão do DAG, hipóteses e justificativas**, e fazer sensibilidade a DAGs plausíveis diferentes.

### 5.3. Exemplo completo de redes de atendimento

A (consulta remota) recebe setas de **acesso à internet L**, **gravidade G** e **preferência P**. G também altera hospitalização Y; L influencia Y via disponibilidade de cuidado. Se medir apenas G, permanece via A←L→Y. Se medir G e L adequadamente, pode restar P ou outros fatores. Se o banco inclui apenas quem **respondeu ao aplicativo S**, condicionado em S que é afetado por A e melhora clínica, surge possível viés de seleção adicional. **Uma regressão não sabe distinguir esses mecanismos sem hipóteses.**

## 6. Confundimento por indicação e contraindicação

**Confundimento por indicação** é central em estudos de efetividade farmacológica: médicos prescrevem tratamentos conforme gravidade, comorbidade e prognóstico. Pacientes mais graves podem receber intervenção mais potente e também ter mais eventos; o tratamento pode parecer danoso na análise bruta. **Confundimento por contraindicação** ocorre quando frágeis, gestantes ou pacientes com doença renal recebem menos uma terapia porque têm risco especial; o grupo tratado pode parecer mais saudável por seleção clínica.

**Exemplo numérico fictício:** em 100 pacientes graves, 80 recebem A e têm 24 mortes; 20 não recebem A e têm 8 mortes. Em 900 leves, 200 recebem A e têm 4 mortes; 700 não recebem e têm 28 mortes. Taxas brutas: A 28/280 = 10%; sem A 36/720 = 5% → A pareceria associado a duplicar mortalidade. Mas dentro dos graves: 30% em tratados e 40% em não tratados; dentro dos leves: 2% em tratados e 4% em não tratados. **A associação inverte quando estratificamos gravidade**, exemplo de paradoxo de Simpson condicionado à composição dos grupos. Não podemos afirmar que A causa redução sem controlar todas outras vias, mas **é prova didática de que a direção bruta pode enganar**.

### 6.1. Por que um modelo multivariado nem sempre resolve?

**Gravidade pode ser mal medida**: um campo “grave: sim/não” talvez omita hipoxemia, fragilidade, perfusão, funcionalidade e acesso, e esses detalhes influenciam A e Y. Fatores não medidos persistem. Ajuste para variáveis basais em escores pode ajudar quando suficientes, mas **não equilibra automaticamente não observados**.

### 6.2. Métodos que ajudam

Restriction (comparar pacientes com elegibilidade semelhante), pareamento, estratificação, ajuste multivariado e métodos com **propensity score** podem reduzir confundimento observado. **Novo usuário e comparador ativo** melhoram comparabilidade em estudos de medicamentos. Em análise longitudinal, estratégias de ponderação e g-formula lidam com confundidores variantes no tempo, sob hipóteses fortes. Nenhuma opção dispensa pergunta clara e exame de overlap.

### 6.3. Falácia do “tratamento associado a pior prognóstico”

O relatório correto distingue “observou-se maior mortalidade em tratados” de “A aumenta mortalidade”, e diz **quais fatores poderiam explicar direção**. Isso é especialmente importante em UTI, oncologia e obstetrícia, onde pacientes de maior risco frequentemente recebem intervenção mais agressiva. O contrário — intervenção reservada a pessoas robustas — pode exagerar benefício.

## 7. Viés de seleção: o conjunto analisado pode ter criado a diferença

**Seleção** ocorre quando a probabilidade de uma pessoa integrar ou permanecer na amostra depende de fatores relacionados à exposição e desfecho, produzindo distribuição diferente da população-alvo e, em certas estruturas, associação espúria. O problema não é apenas “amostra pequena” ou “não representativa”: **pode gerar viés interno mesmo em amostra enorme**, especialmente quando seleção condiciona colisor.

### 7.1. Berkson: hospitalização como colisor

Se tanto uma exposição A quanto doença Y aumentam chance de hospitalização S, estudar **apenas pessoas internadas** pode induzir associação negativa entre A e Y mesmo que não haja relação causal na comunidade. Esse mecanismo clássico é um caso de seleção em consequência comum. Não é correto dizer “todo estudo hospitalar está enviesado”; o risco depende de **pergunta, população-alvo, mecanismos de entrada e variáveis analisadas**.

### 7.2. Sobreviventes e viés do trabalhador saudável

Comparar pessoas que continuam empregadas em trabalho de risco com população geral pode apresentar mortalidade menor porque **pessoas com pior saúde saem do emprego ou nunca entram**. A associação não comprova que exposição ocupacional é protetora. Em coortes clínicas, comparar sobreviventes que chegaram a receber tratamento complexo com pacientes desde o diagnóstico pode criar viés semelhante.

### 7.3. Perdas de seguimento

Se pacientes que pioram abandonam o estudo, o efeito em completadores pode parecer excessivamente favorável. Perguntar **quantos, por quê, quando e em qual braço/exposição**. Perdas ligadas a variáveis observadas podem ser tratadas sob hipóteses via ponderação por probabilidade inversa de censura, mas perdas ligadas a prognóstico não observado exigem análise de sensibilidade; imputação simples não garante correção.

### 7.4. Seleção por teste ou diagnóstico

Durante epidemia, somente quem teve acesso a teste pode integrar banco de infectados. Acesso pode depender de ocupação, gravidade e exposição; comparar desfechos somente entre testados/positivos pode induzir **collider bias**. O DAG precisa representar processo diagnóstico. Um banco hospitalar que não inclui pacientes que morreram antes de chegar não representa necessariamente mortalidade de todos infectados.

## 8. Viés de informação: medir mal pode alterar magnitude e direção

**Erro de classificação** ocorre quando exposição ou desfecho é categorizado incorretamente; pode ser **diferencial** se probabilidade de erro depende do outro status, ou **não diferencial** se não depende sob definição relevante. O adjetivo não diferencial **não garante viés em direção ao nulo em qualquer desenho**, especialmente categorias múltiplas, exposições contínuas, dependência entre erros, confusão residual e determinadas medidas.

### 8.1. Lembrança (recall bias)

Em caso-controle de malformação e uso de medicamento na gestação, mães de crianças afetadas podem pesquisar/recordar exposição com mais intensidade que controles. A diferença de relato pode criar associação sem diferença real de exposição. Registros prospectivos/prescrição e verificação externa reduzem, mas prescrição dispensada não prova ingestão. **Questionário idêntico não garante recordação equivalente**.

### 8.2. Entrevistador e observador

Equipe que conhece tratamento pode procurar sinais adversos mais ativamente em um braço. É por isso cegamento de avaliador importa, especialmente desfecho subjetivo. Em observacionais, definição operacional, abstração padronizada e adjudicação cega ajudam quando factíveis. **Não confundir diferença real na intensidade de monitoramento com diferença biológica do dano**.

### 8.3. Vigilância (surveillance/detection bias)

Usuários de uma tecnologia recebem consultas mais frequentes e, assim, mais diagnósticos de doença assintomática. A incidência registrada sobe, ainda que incidência biológica não tenha mudado. Exemplo: mulheres em pré-natal de alto risco podem ter mais hipertensão **detectada**; isso não prova que consultar mais **causa** hipertensão. Em certos contextos rastreio salva vidas, mas análise de incidência deve separar detecção de ocorrência.

### 8.4. Viés de diagnóstico incorporado

Se a definição de desfecho inclui exposição ou marcador fortemente ligado a ela, a comparação fica circular. Exemplo: avaliar “qualidade assistencial” definindo-a parcialmente por uso do próprio programa cuja qualidade se quer testar. **Um desfecho precisa representar algo além de ter recebido intervenção**, a menos que o objeto seja justamente implementação.

### 8.5. Medição de exposição ao longo do tempo

Classificar pessoa como “usuário por 90 dias” usando informação disponível somente após esses 90 dias cria possível tempo imortal e seleção; é erro de **definição temporal**, não apenas de instrumento. Explicitar como a exposição varia e quais informações estavam disponíveis em cada instante.

## 9. Vieses de temporalidade: tempo imortal, janela e usuário prevalente

### 9.1. Tempo imortal (immortal-time bias)

**Tempo imortal** é período em que a pessoa necessariamente deve permanecer sem desfecho para ser classificada no grupo exposto conforme definição futura. Se estudo rotula como “tratados” todos que algum dia iniciaram medicamento, o período desde o diagnóstico até a primeira prescrição pode ser erroneamente contabilizado como tempo tratado, embora um paciente que tivesse morrido antes da prescrição **não pudesse ser classificado como tratado**. Isso frequentemente cria benefício artificial.

**Exemplo didático:** pacientes diagnosticados em 1º de janeiro, com início de A somente a partir de março. O estudo define grupo A como “quem recebeu A até junho” e grupo controle “quem nunca recebeu”. Para integrar A, a pessoa precisou sobreviver até primeiro A; mortes de fevereiro só podem aparecer entre “não usuários”. Se tempos de risco forem atribuídos incorretamente, A parecerá protetor mesmo sem efeito real.

**Correções possíveis:** alinhar tempo zero e atribuição de estratégias; usar exposição variável no tempo quando adequado para pergunta; emular ensaio-alvo com período de graça e estratégias como clone–censor–weight quando necessário, sob hipóteses explícitas. **Não basta “ajustar idade”** para apagar erro de classificação temporal.

### 9.2. Viés de usuário prevalente

Pacientes que continuam fármaco há anos já sobreviveram/toleraram fase inicial; compará-los com iniciantes de outro grupo mistura seleção por sobrevivência e estágio de doença. Estudos de **novos usuários com comparador ativo** alinham melhor início e elegibilidade, embora não eliminem confundimento não medido. **Não confundir prevalent-user bias com alta prevalência populacional de doença**: refere-se a tratamento iniciado antes da inclusão.

### 9.3. Viés de protopatia e causalidade reversa

Doença ainda não diagnosticada pode causar sintomas que motivam medicamento; medicamento aparece antes do **diagnóstico formal**, levando a falsa conclusão de que causou a doença. Analgésico usado para dor inicial de câncer pode se associar a câncer detectado meses depois, sem relação etiológica. Janelas de latência/lag apropriadas, exclusão criteriosa de doença prévia e comparação de indicação podem ajudar, mas **não aplicar lag arbitrário se o mecanismo é diferente**.

### 9.4. Períodos de graça

Uma estratégia pode permitir iniciar A em até 30 dias do diagnóstico. Comparar pacientes que iniciaram até dia 30 com os que não iniciaram sem controlar o período inicial pode introduzir seleção. Emulação com **clonagem de indivíduos em estratégias compatíveis, censura na violação e ponderação** pode estimar efeitos de regimes com graça sob hipóteses de censura/positividade, mas exige análise especializada. **Não usar dados futuros para definir grupo no início sem declarar estratégia.**

## 10. Emulação de ensaio-alvo (target trial emulation): pensar como ECR antes de abrir o banco

Hernán e colegas propõem escrever protocolo de **ensaio ideal hipotético** antes de usar registros observacionais. Especificar **elegibilidade, estratégias, atribuição hipotética, momento zero, acompanhamento, desfechos, contraste causal e plano de análise** ajuda evitar vieses de desenho. **Não significa que observacional se tornou randomizado**; qualidade de confundidores/medidas e pressupostos continuam centrais.

### 10.1. Tabela do ensaio-alvo

| Elemento | Ensaio hipotético em pacientes com doença X | Emulação observacional plausível |
|---|---|---|
| Elegibilidade | Adultos recém-diagnosticados, sem A prévio, sem contraindicação | Identificar primeira data de diagnóstico e janela de história suficiente |
| Estratégias | Iniciar A hoje versus iniciar B hoje | Prescrições novas de A/B, com tolerância ao atraso definida |
| Momento zero | Mesma data de elegibilidade e atribuição | Alinhar data em ambas opções; não classificar por tratamento futuro |
| Acompanhamento | 365 dias a partir de zero | Vínculo a desfechos e censura explícitos |
| Desfecho | Internação não programada | Código validado/definição independente de intensidade de consulta |
| Efeito-alvo | Risco sob A versus B na população elegível | Ajuste por causas de escolha A/B medidas antes do início |
| Análise | ITT / por protocolo conforme plano | Métodos adequados para confundimento/censura e efeito estimado |

### 10.2. Comparador ativo é frequentemente mais informativo que “não tratar”

Comparar novo antihipertensivo A contra B indicado na **mesma etapa terapêutica** pode reduzir diferença por indicação em comparação a “A versus nenhum remédio”, pois nenhum remédio pode sinalizar baixa gravidade, contraindicação ou ausência de acesso. Porém, se A e B são reservados a perfis distintos, ainda há confundimento. **O nome “comparador ativo” não garante comparabilidade**.

### 10.3. Múltiplos ensaios sequenciais

Alguns bancos permitem emular **ensaios iniciados repetidamente** em momentos quando pessoa está elegível. A mesma pessoa pode entrar em mais de um ensaio hipotético enquanto elegível, exigindo correção de dependência estatística e alinhamento de elegibilidade/tempo. É abordagem avançada para estratégias que mudam ao longo do tempo, não justificativa para duplicar pacientes sem controle.

### 10.4. Relato transparente da emulação

Informar qual trial foi definido, quais dados faltaram para implementá-lo, como confounders foram medidos, como foi evitado tempo imortal, como censura ocorreu, quais pesos/ajustes e sensibilidade foram aplicados. A publicação *BMJ Medicine* 2026 discute precisamente vieses de desenho e de usuário prevalente nesse contexto. **Não usar “emulamos ECR” como slogan de validade automática**.

## 11. Confundimento dependente do tempo e por que o ajuste usual pode falhar

Considere tratamento A0 no início, biomarcador L1 seis meses depois, tratamento A1 ajustado conforme biomarcador, e desfecho Y um ano depois. **L1** influencia A1 e Y, mas também pode ter sido afetado por A0. Ajustar L1 em regressão convencional para comparar efeitos da estratégia ao longo do tempo pode **bloquear parte do efeito A0** e introduzir viés por condicionamento, mesmo sendo L1 necessário para lidar com confundimento de A1–Y.

Isso é **confundidor variante no tempo afetado por tratamento prévio**, cenário clássico do desenvolvimento de métodos g de Robins. A resposta não é “nunca ajustar L1”; é definir efeito longitudinal e usar métodos apropriados, por exemplo **g-formula paramétrica, modelos estruturais marginais com ponderação inversa ou g-estimation**, sob intercambiabilidade sequencial, positividade e consistência.

### 11.1. Exemplo em hipertensão

A0 reduz pressão L1. O médico vê L1 e decide intensificar A1. Pressão L1 prediz AVC Y e é afetada por A0. Uma regressão ingênua que inclui pressão medida após tratamento pode tirar parte do efeito de A0. Ao mesmo tempo, não considerar pressão antes de A1 pode confundir efeito de intensificação. **G-métodos procuram resolver essa tensão**, não apenas inserir mais covariáveis sem discutir temporalidade.

### 11.2. Regras de dose e intervenções dinâmicas

A estratégia pode ser “iniciar A e aumentar se PA ≥140” versus “iniciar B e aumentar se PA ≥140”. Essa política é **dinâmica** e depende de variável observada ao longo do tempo. A análise deve representar explicitamente a regra e o conjunto de informações disponíveis em cada decisão. **Efeitos de tratamento fixo e de política de titulação não são o mesmo estimando**.

## 12. Propensity score: balancear medidos, não fabricar randomização

**Propensity score (PS)** é a probabilidade de receber A dado conjunto de covariáveis basais medidas L: e(L) = P(A=1|L). Pode apoiar **pareamento, estratificação, ajuste ou ponderação**, desde que as covariáveis sejam escolhidas por teoria causal e qualidade de medida.

### 12.1. O que verificar antes e depois?

**Overlap:** existem pacientes comparáveis em ambos tratamentos ao longo das probabilidades estimadas? **Balanceamento:** após pareamento/ponderação, diferenças padronizadas das covariáveis prognósticas relevantes diminuíram? **Desfecho:** análise foi realizada considerando pesos/pareamento e dependência? **Estimando:** pareamento que exclui pessoas fora de overlap pode estimar efeito em população **menor que a original**, não exatamente ATE de todos.

**SMD (standardized mean difference)** abaixo de certo valor (frequentemente 0,1 em exemplos) é diagnóstico prático, não certificado de ausência de viés; pequenas diferenças em confundidores fortíssimos ainda podem importar e não observados não são checáveis.

### 12.2. Pareamento não recupera pessoas sem comparador

Se pacientes em choque nunca recebem B, não há bons pares B para eles. A decisão honesta pode ser **restringir população de efeito a pacientes com ambas opções plausíveis**, e não imputar benefício na região sem dados. **AUC alto do modelo de PS não é finalidade central**; previsão perfeita de tratamento pode revelar ausência de positividade e tornar comparação causal impossível naquele grupo.

### 12.3. Peso inverso: intuição e cálculo

Para estimar ATE com tratamento binário em coorte sob intercambiabilidade condicional, pesos simples são **1/e(L)** para tratados e **1/[1−e(L)]** para controles (podem ser estabilizados/truncados sob justificativa). Se pessoa tratada tinha probabilidade e=0,8, peso seria 1,25; se e=0,05, peso seria 20 — o segundo indivíduo traz grande influência e sinaliza possível baixa sobreposição.

**Peso extremo ≠ prova de efeito importante.** É fragilidade de comparação. Diagnosticar distribuição de pesos, tamanho efetivo da amostra, positividade e análises de truncamento. Um modelo de PS perfeitamente ajustado a dados medidos **não compensa confusão não medida**.

### 12.4. Matching e escolher variáveis

Emparelhar por variáveis pós-tratamento que são mediadores pode distorcer efeito. Ajustar por forte preditor da exposição que não afeta desfecho em alguns contextos pode reduzir overlap sem benefício. Ajustar por **colisor** pode gerar viés novo. Por isso a seleção de covariáveis deve preceder algoritmo e ser defendida com DAG e conhecimento clínico.

## 13. Mediação causal: efeito total, direto e indireto

**Efeito total:** diferença de Y se aplicássemos A versus B, incluindo todos caminhos mediadores pertinentes. **Efeito direto controlado** considera alterar A mantendo mediador M em nível especificado, sob hipotética intervenção possível; **efeitos diretos/indiretos naturais** usam contrafactuais cruzados e requerem pressupostos ainda mais fortes. O leitor iniciante deve primeiro reconhecer que **ajustar M pós-intervenção não estima automaticamente o efeito direto causal**.

### 13.1. Exemplo clínico: tratamento, pressão e AVC

A (terapia) ↓ pressão arterial (M) → ↓ AVC (Y). Se interessa benefício total de disponibilizar terapia, medir PA depois e “controlar por ela” pode subestimar efeito total. Se interessa quanto benefício **não** passa por pressão, a pergunta é diferente e exige método de mediação, definição de intervenção em M e consideração de causas comuns M–Y, inclusive as afetadas por A.

### 13.2. Variável que é mediador e confounder de outro trecho

Em tratamentos repetidos, biomarcador L1 é mediador de A0→Y e confundidor de A1→Y; nessa situação a dicotomia simples “controlar ou não controlar” não funciona. **A posição da variável no tempo e a pergunta causal definem o papel**.

### 13.3. Efeito direto não significa “efeito verdadeiro”

Uma terapia que previne AVC por reduzir PA tem benefício causal mesmo que todo efeito seja mediado. Chamar efeito “direto” de único efeito autêntico é erro. **Mediar não é confundir**. Consequência intermediária desejável é parte do mecanismo, não ruído estatístico que sempre precisa ser removido.

