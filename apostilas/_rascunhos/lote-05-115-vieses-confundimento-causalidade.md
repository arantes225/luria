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

## 14. Análises de sensibilidade: mensurar o que o modelo principal não garante

O pesquisador raramente observa todos os determinantes da exposição e do desfecho. Em vez de afirmar “ajustamos as covariáveis, logo provamos causalidade”, uma análise rigorosa pergunta **qual tamanho e estrutura de viés não medido seriam necessários para explicar o achado** e quais resultados mudam com hipóteses razoáveis. **Análise de sensibilidade não certifica causalidade**; ela descreve robustez a modelos alternativos bem especificados.

### 14.1. E-value: significado, cálculo e limites

O **E-value** de VanderWeele e Ding (2017) quantifica, na escala de razão de riscos, a força mínima de associação que um confundidor não medido precisaria ter **tanto com exposição quanto com desfecho**, condicionada às variáveis já medidas, para explicar integralmente uma associação observada, segundo hipóteses da abordagem. É uma forma de comunicar sensibilidade **ao confundimento não medido**, não às demais fontes de viés e não uma probabilidade de resultado causal.

Para RR observado ≥1, a fórmula pontual é **E = RR + raiz quadrada de [RR × (RR−1)]**. Exemplo **fictício**, RR ajustado=2,0 → E=2+√2≈**3,414**. Para RR protetor <1, inverter RR antes: RR=0,5 → 1/RR=2,0 → E≈3,414. **Não afirmar que E-value 3,414 significa “a associação tem 3,414 vezes mais chance de ser causal”.** Ele é parâmetro de sensibilidade sob escala de risco e supostos específicos.

O **limite do intervalo de confiança mais próximo do nulo** também deve ter seu E-value. Se IC do RR vai de 1,1 a 3,0, o valor relativo ao limite 1,1 será pequeno, mesmo que o ponto RR=2 pareça robusto; isso comunica que a inferência compatível com os dados pode ser explicada por confundimento relativamente fraco. **Se o IC inclui RR=1, o E-value correspondente ao limite mais próximo do nulo é 1**, não há um ganho automático de robustez.

**Limites importantes:** E-value não corrige seleção, erro de informação, tempo imortal ou modelo errado. Também não prova existência de confundidor com certa associação, nem que relações em população real satisfaçam pressupostos. Para **OR** de desfecho comum, não aplicar diretamente fórmula RR sem conversão/justificativa apropriadas; para **HR**, a interpretação de E-value requer aproximações/hipóteses sobre risco temporal.

### 14.2. Controle negativo

**Exposição controle negativo** é variável que compartilha certas fontes de confundimento/medição com A mas **não deveria causar Y** pela teoria; **desfecho controle negativo** é algo que compartilha a estrutura de confusão mas não deveria ser afetado por A. Se aparece associação importante onde se esperaria efeito nulo, há sinal de viés residual — não prova, porque o controle negativo também pode estar mal escolhido.

**Exemplo:** estudo de vacina que mede hospitalizações **antes da vacinação** e encontra forte associação “protetora” da futura vacina com hospitalizações do passado. A vacina não pode ter mudado eventos passados; há indício de seleção/confundimento temporal. Atenção: a população que sobrevive para vacinar-se pode diferir de quem não vacina, e o próprio critério de futuras exposições pode gerar tempo imortal; a construção do controle precisa evitar novos erros.

### 14.3. Análise quantitativa de viés

Quando estimativas plausíveis de sensibilidade/especificidade de uma medida estão disponíveis, pode-se fazer **bias analysis probabilística** ou determinística, variando matrizes de classificação errada. Em seleção, pode-se variar probabilidade de inclusão por exposição/desfecho; em confundimento, variar prevalência/força de fator não observado. **Os intervalos produzidos dependem de hipóteses sobre esses parâmetros**; simulações detalhadas não tornam parâmetros arbitrários verdadeiros.

### 14.4. Robustez a especificações

Repetir análise com definições alternativas pré-especificadas de exposição, latência, inclusão, truncamento de pesos, fontes e medida de desfecho pode revelar resultados frágeis. Contudo, testar cinquenta modelos e **publicar só o significativo** produz viés de relato. Documentar resultado principal e secundários, o que mudou e por quê, e não tratar cada sensibilidade como estudo independente.

## 15. Variáveis instrumentais e “experimentos naturais” — soluções condicionais, não atalhos

**Variável instrumental Z** influencia a probabilidade de receber A, mas para ser instrumento válido da relação A→Y precisa, sob modelo, de **relevância** (Z se associa a A), **independência** de causas não medidas relevantes e **restrição de exclusão** (Z não afeta Y por outra via além de A), além de outros pressupostos específicos como monotonicidade em estimativa LATE. Essas condições não são estabelecidas por teste estatístico simples e podem falhar de maneiras sutis.

**Exemplo:** distância ao hospital que oferece cirurgia A pode mudar chance de recebê-la. Mas distância também modifica **tempo até atendimento, acesso a exames, reabilitação e mortalidade**, violando exclusão; não é instrumento válido apenas porque prediz escolha. Avaliar mecanismo com DAG, teoria e análise de sensibilidade.

### 15.1. LATE não é ATE por conveniência

Em modelos instrumentais com hipóteses adequadas, o efeito pode se referir a **compliers** — pessoas cuja opção de tratamento é modificada pelo instrumento —, não necessariamente à população inteira. Essa limitação de população-alvo altera aplicação clínica. Um resultado instrumental aparentemente forte pode ser pouco informativo para quem sempre receberia intervenção por gravidade.

### 15.2. Regression discontinuity

Quando uma regra atribui intervenção por corte (ex.: idade ou escore acima de valor), pessoas muito próximas dos dois lados podem ser comparáveis em fatores contínuos, **desde que não haja manipulação do marcador/corte e outras políticas mudem no mesmo ponto**. A estimativa é frequentemente **local no limiar**, e não efeito médio em todas idades/gravidades.

Exemplo: programa que passa a oferecer cuidado domiciliar a partir de escore de risco 10. Comparar escore 9,9 a 10,1 pode ser mais defensável que escore 3 versus 20, se mecanismo não é manipulado. **Não extrapolar o efeito próximo ao corte para todos** sem justificativa.

### 15.3. Diferenças-em-diferenças e tendência paralela

**Difference-in-differences (DiD)** compara mudança do desfecho ao longo do tempo entre população afetada por intervenção e controle. Sob hipótese de **tendências paralelas sem intervenção** e outros requisitos (ausência de choques concorrentes específicos, interferência, mudanças de composição, antecipação e especificação apropriada), diferença das diferenças pode estimar efeito de política.

**Exemplo fictício:** internações por 1000 antes/depois: município tratado 100→70 (−30), controle 80→65 (−15). DiD=(70−100)−(65−80)=**−15 por 1000**. Interpretar como efeito causal da política **somente** se pressupostos forem plausíveis. Ver tendências prévias, políticas simultâneas, mudanças na codificação e efeito heterogêneo; em adoção escalonada, estimadores tradicionais de two-way fixed effects podem ter vieses com efeitos heterogêneos ao longo do tempo.

### 15.4. Série temporal interrompida

Avalia mudanças de nível/inclinação após intervenção em dados agregados longitudinais, exigindo número de pontos suficiente, atenção a sazonalidade/autocorrelação e eventos simultâneos. Uma queda após política não prova efeito se houve epidemia, mudança de código ou outra intervenção no mesmo dia. **Antes/depois puro sem grupo controle é especialmente vulnerável a história e tendência secular**.

## 16. Fatores de risco, marcadores prognósticos, confundidores e causas

**Fator de risco** em linguagem clínica pode significar marcador associado ou causa, dependendo do uso. **Preditor** melhora previsão, mas não precisa ser causa; **confundidor** é variável cuja estrutura de relação entre A e Y cria associação espúria; **mediador** transmite parte do efeito; **colisor** recebe setas de duas variáveis. O papel de uma variável **muda conforme pergunta**.

**Exemplo com idade:** idade pode ser confundidor entre uso de antihipertensivo A e AVC Y se influencia prescrição e risco. Em outra pergunta, idade pode ser apenas preditor do desfecho se estratégia foi randomizada. Em investigação de política por idade-limite, idade pode fazer parte da regra de atribuição e exigir desenho de descontinuidade. “Sempre ajuste idade” pode ser razoável pragmaticamente em muitos modelos, mas não resolve DAG e temporalidade.

### 16.1. Previsão e causalidade exigem validações diferentes

Modelo preditivo pode usar variáveis que aparecem **depois** de um evento para prever evolução futura, desde que disponíveis no momento de previsão. Já modelo causal precisa garantir que ajuste não destrua o efeito de intervenção ou abra vias. **Um AUC 0,95 para prever mortalidade não significa que coeficiente de terapia dentro desse modelo estima causalidade.**

### 16.2. Odds ratio condicionado e não colapsabilidade

Mesmo quando não há confundimento, **OR ajustado e OR marginal podem diferir** por propriedade matemática de não colapsabilidade, especialmente com desfechos comuns. Logo “OR mudou após incluir prognosticador, então havia confusão” não é inferência sempre válida. Diferenças de medidas e população-alvo precisam ser consideradas; razões de riscos também têm propriedades próprias em algumas modelagens. **Comparar OR e RR como se fossem escala idêntica** amplia erros de comunicação.

### 16.3. Simpson: decomposição importa

No exemplo do capítulo 6, o grupo tratado tem maior mortalidade bruta mas menor mortalidade dentro de gravidade alta e baixa. **A inversão é possível pela composição dos estratos**, mas não garante que ajuste simples produza estimativa causal sem outras causas medidas. A mensagem é: *pergunte como grupos foram formados antes de confiar na taxa bruta*.

## 17. Confundimento residual: como reconhecer risco sem fingir que o provou

**Residual** pode surgir porque confundidor foi medido grosseiramente, selecionado incorretamente, modelado em forma funcional errada, faltou informação, houve erros de classificação ou confundidor nem foi registrado. Ajustar “hipertensão sim/não” não equivale a controlar severidade, duração, lesões de órgão, tratamento e adesão. Em dados do SUS, renda pode ter proxies imperfeitos como CEP ou bairro, e acesso a exame pode não refletir gravidade. **Isso não invalida toda pesquisa brasileira**, mas exige explicitar limites e explorar alternativas.

### 17.1. Estratégias para reduzir

Planejar desenho novo usuário/comparador ativo; selecionar covariáveis por DAG; incorporar medidas longitudinais prévias e proxies bem fundamentados; avaliar registro de gravidade e doença; restringir cenários sem positividade; usar instrumentos plausíveis apenas se satisfazem hipóteses; controles negativos; análises de sensibilidade. **Acumular vinte proxies colineares não garante controle perfeito**.

### 17.2. Superajuste e colinearidade

Incluir variáveis demais para número de eventos pode aumentar variância, instabilidade e extrapolação; colinearidade torna coeficientes individuais difíceis de interpretar. Esses são problemas estatísticos diferentes do viés causal por controlar colisor/mediador. **É possível ter modelo matematicamente estável e causalmente enviesado**, assim como DAG correto e regressão numericamente instável.

### 17.3. Modelo errado de exposição e resultado

Supor relação linear da idade em mortalidade ou dose em dano quando é curva pode deixar confundimento residual, mesmo com variável incluída. Splines ou modelagem flexível podem ajudar se houver dados, mas **flexibilidade não inventa overlap onde não há**. Interações e heterogeneidade de efeitos requerem definição do efeito-alvo; um modelo ótimo em previsão não necessariamente representa intervenções possíveis.

## 18. Erros de seleção e informação nos sistemas de dados brasileiros

### 18.1. SIH/SUS: internação é evento observado e também processo de acesso

O **SIH/SUS** registra internações financiadas no SUS conforme regras administrativas, não todas hospitalizações do país. Mudança em internações pode resultar de incidência real, acesso a leitos, contratualização, codificação, rede privada ou política de autorização. Comparar mortalidade “dos internados” entre municípios sem modelar acesso pode condicionar em **hospitalização como colisor**, distorcendo diferenças.

### 18.2. SINAN: notificação depende de capacidade de vigilância

Doença notificada não é igual a incidência real quando **subnotificação** varia por unidade, período, treinamento e capacidade laboratorial. Após intensificar testagem, números notificados podem subir mesmo que transmissão biológica não aumente. Uma campanha pode parecer associada a mais casos porque melhorou detecção. **Sem denominador e mecanismo de observação, incidência notificada pode ser estimador enviesado da ocorrência real**.

### 18.3. SIM: mortalidade e qualidade da classificação

**Sistema de Informações sobre Mortalidade (SIM)** é essencial, mas completude e codificação de causa básica podem variar. Mudança de causa registrada pode refletir investigação/qualidade de atestado, não efeito de intervenção. Vincular SIM a coortes requer identificação, qualidade de linkage e atenção a perdas diferenciais, respeitando LGPD e governança ética. **Morte encontrada nos dados depende de sucesso de seguimento e identificação correta**.

### 18.4. Atenção Primária, e-SUS APS e prontuários

Registro de PA, HbA1c e exames depende de contato com serviço. Pacientes que comparecem mais têm medições mais frequentes; a disponibilidade de HbA1c pode ser **descendente de acesso e gravidade**. Restringir análise apenas a quem fez exame pode induzir viés de seleção, particularmente quando intervenção altera frequência de consultas. **Imputar HbA1c não medida como normal porque não aparece no banco é erro de informação**.

### 18.5. Indicadores e políticas

Após programa municipal, número de consultas aumentou. Isso pode ser objetivo de **acesso**, mas não prova automaticamente redução de mortalidade/complicações. Um município com maior prevalência de doença pode ter mais consultas e mais internações, gerando associação paradoxal; analisar populações comparáveis, tendência temporal, política concorrente e canais causais.

### 18.6. LGPD e necessidade de minimização

Boa pesquisa não coleta identificadores desnecessários nem compartilha dados pessoais em repositórios públicos só para facilitar auditoria. Usar ambiente autorizado, pseudonimização, controle de acesso e finalidade específica. Os **diagramas/dados fictícios** desta aula não contêm informações identificáveis; exemplos reais em apostilas futuras exigem consentimento e governança. O Codex deve verificar arquivos por vazamento de dados sensíveis antes da publicação.

## 19. Como criticar um artigo em dez passos sem se perder no p

**Passo 1:** qual decisão e comparação causal? **Passo 2:** qual população e tempo zero? **Passo 3:** quem recebeu cada estratégia e por quê? **Passo 4:** desenhe DAG mínimo com causas da escolha e do desfecho. **Passo 5:** houve seleção por hospitalização, testagem, sobrevivência ou completude de seguimento? **Passo 6:** exposição/desfecho medidos simetricamente, com latência adequada? **Passo 7:** ajuste bloqueou confundidores e evitou mediadores/colisores? **Passo 8:** há positividade/overlap e estimando consistente? **Passo 9:** quanto de confusão não medida explicaria o resultado? **Passo 10:** decisão é aplicável ao paciente/SUS e incerteza é comunicada?

**Relato STROBE** com 22 itens ajuda saber o que foi feito e identificar falta de transparência, mas seu próprio portal afirma expressamente **que não é instrumento para avaliar qualidade metodológica**. **ROBINS-I**, por outro lado, avalia risco de viés de um resultado específico de estudo não randomizado de intervenção, usando comparação com experimento-alvo. O ROBINS-I V2 disponibilizado no portal em novembro de 2025 **continua rascunho sujeito a mudanças na data desta aula**; não apresentá-lo como versão final oficial nem reproduzir checklist protegido em apostila comercial.

### 19.1. STROBE é transparência; ROBINS-I é julgamento; GRADE é certeza

| Instrumento | Para que serve | O que NÃO entrega |
|---|---|---|
| STROBE 2007 | Relatar coortes, caso-controle e transversais com 22 itens | Certificado de causalidade ou baixo viés |
| DAG | Explicitar hipóteses e identificar ajustes possíveis | Prova que setas são verdadeiras |
| ROBINS-I | Julgar risco de viés de resultado de intervenção não randomizada | Substituir IC, aplicabilidade e certeza |
| E-value | Sensibilidade a confundimento não medido na escala adequada | Eliminar seleção, tempo imortal ou informação errada |
| Target trial emulation | Evitar falhas de desenho/tempo e definir efeito | Randomizar dados retrospectivos |
| GRADE (aula 110) | Certeza do corpo de evidências por desfecho | Isolar automaticamente mecanismos causais |

### 19.2. Domínios de risco em estudos não randomizados

O ROBINS-I original abrange confundimento, seleção de participantes, classificação de intervenções, desvios, dados ausentes, mensuração de desfechos e seleção do resultado reportado. Versão V2 **modifica estrutura/algoritmos**, incluindo atenção explícita a tempo imortal, mas o aluno deve consultar versão exata adotada e suas instruções. **Não somar sete notas arbitrárias e chamar “nota 6/7” de baixo risco**; julgamento é por resultado e domínios críticos conforme ferramenta.

### 19.3. Uma conclusão honesta pode ser “não sabemos”

Se nenhum paciente comparável recebeu o tratamento alternativo, se desfecho só foi medido em sobreviventes e se exposição foi definida por evento futuro, **os dados não identificam efeito causal confiável com os métodos apresentados**. Dizer isso é mais científico do que produzir modelo com cinco casas decimais e interpretar como efeito real. A solução pode exigir novo desenho ou dados melhores.

## 20. Exercícios matemáticos originais e conferíveis

### Exercício 1 — confundimento por gravidade (Simpson)

Usar dados fictícios já introduzidos: 100 graves, 80 recebem A (24 mortes), 20 não recebem (8 mortes); 900 leves, 200 recebem A (4 mortes), 700 não recebem (28 mortes).

**Bruto:** tratados 28/280=**10%**, controles 36/720=**5%**, diferença de risco **+5 pp**, RR=**2,0** (aparente dano de A).  
**Em graves:** A 24/80=**30%** e B 8/20=**40%**; diferença **−10 pp**.  
**Em leves:** A 4/200=**2%** e B 28/700=**4%**; diferença **−2 pp**.  
**Padronização para proporção da população (10% grave, 90% leve)**, sob hipóteses de intercambiabilidade dentro dos estratos: risco A padronizado 0,1×0,30+0,9×0,02=**4,8%**; risco B padronizado 0,1×0,40+0,9×0,04=**7,6%**, diferença **−2,8 pp**. O sinal inverte ao considerar composição. **Ainda não é prova causal**: outras diferenças dentro dos estratos podem existir, e dados são fictícios.

### Exercício 2 — peso inverso e overlap

Paciente tratado com probabilidade estimada de A e(L)=0,8 recebe peso ATE **1/0,8=1,25**. Outro tratado e=0,02 recebe peso **50**. Isso não quer dizer que a segunda pessoa representa “50 vezes mais efeito biológico”, e sim que é rara sob sua covariável e influencia muito o estimador. Avaliar positividade e truncamentos razoáveis, e se o perfil raro deveria estar na população-alvo.

### Exercício 3 — E-value

Associação causal hipotética RR=**2** (efeito observado em estudo, ainda sem interpretação causal). E-value pontual é **2+√[2(2−1)] = 2+√2≈3,414**. Para RR=**1,2**, E≈**1,690**; o segundo requer relação de confundimento relativamente mais fraca para explicar associação, sob mesmos pressupostos. **Não comparar E-values de medidas não equivalentes** sem conversão apropriada.

### Exercício 4 — diferenças-em-diferenças

Município A: incidência 100→70 por 1000; município controle B 80→65 por 1000. Mudança A −30, B −15. DiD=−30−(−15)=**−15 por 1000**, interpretável causalmente somente sob tendências paralelas, ausência de choques diferenciais relevantes e demais pressupostos. **Não afirmar que queda total de 30 se deve à política**, pois também ocorreu queda secular de 15 no controle.

### Exercício 5 — erro de atribuição de tempo imortal

Cem pessoas diagnosticadas no dia zero. Vinte recebem fármaco A apenas no dia 60, as demais não. No dia 30 ocorrem dez mortes, todas em pessoas que **não chegaram ao dia 60**. Se o pesquisador define “grupo tratado” com base em uso até dia 60 e contabiliza sobrevivência desde dia zero, os futuros tratados precisaram sobreviver para serem classificados assim. O efeito protetor é potencialmente **artefato** mesmo sem números de RR, pois a exposição foi definida com informação futura. O desenho deve alinhar início, critérios de elegibilidade e estratégia para cada pessoa.

## 21. Oito casos clínico-epidemiológicos com diagnóstico do viés e correção possível

### Caso 1 — Antibiótico amplo associado a maior mortalidade na UTI

**Cenário:** banco observacional fictício de 2.000 internados mostra mortalidade 20% com antibiótico de espectro amplo e 7% com esquema mais estreito. **Questão causal:** amplo causa dano? **Mecanismo provável:** *confundimento por indicação*: médico selecionou amplo para choque, colonização resistente e disfunção orgânica; esses fatores também elevam mortalidade. **DAG:** gravidade basal G→amplo A e G→óbito Y. **Dados a examinar:** choque, lactato, microbiologia, momento de início, APACHE/SOFA com cuidado temporal, antibioticoterapia anterior, acesso e histórico de resistência. **Correção plausível:** comparador ativo em pessoas com as duas opções clinicamente plausíveis, novo usuário/tempo zero, ajuste por gravidade prévia, análise de overlap e sensibilidade a confundimento residual. **Não fazer:** ajustar resposta após antibioticoterapia como se fosse confundidor basal ou concluir causalidade por p baixo. **Mensagem:** uma associação bruta de dano pode ocultar benefício em cada estrato, mas ajuste não prova causalidade sem demais pressupostos.

### Caso 2 — Programa de acompanhamento parece impedir mortes antes de começar

**Cenário:** hospital compara quem “participou de reabilitação nos primeiros 90 dias” e quem nunca participou, contando sobrevivência desde a alta; parte dos pacientes morre antes de conseguir primeira sessão. **Viés:** tempo imortal e usuário prevalente: para integrar grupo de participantes, foi preciso sobreviver até sessão. **DAG/tempo:** critérios de exposição definidos por futuro, enquanto mortes antes da sessão não podem ocorrer em grupo definido como exposto. **Correção:** emular ensaio de oferta imediata versus oferta alternativa a partir da alta, com período de graça explícito, ou exposição variável no tempo de forma coerente com estimando; considerar adesão e censura. **Cuidado:** corrigir tempo imortal não elimina gravidade/apoio como confundidores. **Decisão:** não usar estimativa original para ampliar programa sem reanálise adequada.

### Caso 3 — Pacientes hospitalizados parecem ter proteção paradoxal

**Cenário:** estudo avalia associação de tabagismo A com uma doença Y apenas em pacientes internados em hospital terciário. Tanto tabagismo quanto doença elevam chance de ser internado S. **Viés:** seleção em **colisor S**, via A→S←Y, possivelmente criando associação espúria negativa dentro dos internados. **Diagnóstico:** examinar processo de admissão e população alvo; não achar que maior n no hospital corrige. **Correção:** definir questão e população com inclusão independente desses caminhos quando viável, buscar amostra comunitária ou métodos para seleção sob hipóteses. **Não fazer:** “ajustar hospitalização” se todos já são internados; não há variação e a seleção ocorreu antes da análise. **Mensagem:** a amostra pode gerar o fenômeno antes de qualquer regressão.

### Caso 4 — Risco de câncer parece aumentado em mulheres que fazem mais consultas

**Cenário:** mulheres em programa de rastreio intensivo recebem diagnóstico de neoplasia subclínica mais cedo e mais frequentemente que grupo sem rastreio. Desfecho usado é “qualquer diagnóstico de câncer em 12 meses”. **Viés:** detecção/vigilância diferencial e possivelmente sobrediagnóstico, conforme doença e teste. **DAG:** programa A→intensidade de exame D→diagnóstico registrado Y*, enquanto doença biológica Y pode não ter mudado. **Correção:** distinguir incidência de doença biologicamente relevante, estágio, mortalidade específica, sobrediagnóstico e tempo de seguimento; desfechos centrados em pessoas, com aferição comparável. **Não fazer:** dizer que rastreamento “causou câncer” só porque registrou mais. **Mensagem:** medir mais pode aumentar ocorrência aparente.

### Caso 5 — O ajuste removeu o benefício da pressão

**Cenário:** coorte com terapia anti-hipertensiva A, redução de PA aos seis meses M e AVE em dois anos Y. O modelo sem M mostra menor risco de AVE; ao ajustar M, coeficiente de A se aproxima de nulo. **Viés potencial:** sobreajuste por **mediador**, se interesse era efeito total; condicionar em M pode também abrir vias se há causas não medidas M–Y afetadas por A. **Correção:** definir se pergunta é efeito total ou direto; para total, ajustar causas pré-tratamento relevantes e evitar mediador; para mecanismos, usar métodos específicos de mediação com pressupostos. **Não fazer:** afirmar “a terapia não funciona quando corrigimos por PA”: reduzir PA pode ser o mecanismo de sua eficácia. **Mensagem:** um coeficiente ajustado não revela automaticamente a verdade causal.

### Caso 6 — Confundimento variante no tempo após intensificação da terapia

**Cenário:** pessoas com DM2 recebem A0, HbA1c em 3 meses L1, intensificação A1 condicionada a L1 e desfecho cardiovascular Y. HbA1c foi alterada por A0 e influencia A1/Y. **Problema:** regressão convencional com L1 pode bloquear efeito anterior enquanto omitir L1 confunde intensificação; métodos simples falham para estratégia longitudinal. **Correção:** desenhar DAG temporal e estimando de estratégia, avaliar g-formula ou pesos de modelos estruturais marginais sob intercambiabilidade sequencial, positividade e consistência. **Não fazer:** atribuir falha estatística a “amostra pequena” sem avaliar estrutura temporal. **Mensagem:** variáveis mudam de papel quando o tempo avança.

### Caso 7 — Estudo de vacina mostra “proteção” contra hospitalização antes de vacinar

**Cenário:** análise observa que pessoas futuramente vacinadas já internavam menos nos seis meses anteriores à vacinação. **Problema:** essa associação com desfecho **anterior** não pode ser produzida causalmente pela vacina futura; sugere diferenças prévias, seleção por sobrevivência ou viés de utilização/acesso. **Correção:** controle negativo temporal adequadamente desenhado; coorte de novos usuários com momento zero alinhado, comparação elegível e ajustes, com sensibilidade a acesso e fragilidade. **Não fazer:** apresentar associação pós-vacina como prova causal isolada. **Mensagem:** perguntar quando o suposto efeito começou pode desmontar falsa causalidade.

### Caso 8 — Programa municipal e queda de internações

**Cenário:** município introduziu telemonitoramento e internações caíram de 100 para 70 por 1000; município comparador caiu de 80 para 65. **Hipótese:** diferença-em-diferenças de -15 por 1000. **Problemas potenciais:** municípios podem ter tendências prévias diferentes, mudanças de faturamento SIH, políticas simultâneas, interrupção de serviços ou migração à rede privada. **Correção:** examinar tendências antes da política, estabilidade de codificação, grupos comparáveis, sensibilidade a controles e efeitos heterogêneos, e definir população alcançada. **Não fazer:** afirmar redução causal de 30 por 1000 ou concluir benefício em toda população do Brasil. **Mensagem:** um contrafactual plausível é indispensável mesmo em avaliação de política.

## 22. Dez questões autorais com cinco alternativas e comentários individuais

### Questão 1 — Confundidor versus mediador

Em estudo sobre anti-hipertensivo A e AVC Y, gravidade basal G determina escolha do medicamento e também risco de AVC; PA aos três meses M foi alterada por A e influencia Y. Para estimar efeito **total**, qual alternativa é mais adequada?

A. Ajustar sempre M e ignorar G.  
B. Ajustar G adequadamente e avaliar M como mediador, não confundidor basal obrigatório do efeito total.  
C. Ajustar somente variáveis com p<0,05.  
D. Excluir pacientes cuja PA mudou.  
E. Considerar toda variável pós-tratamento como causa prévia.

**Gabarito: B.** **A incorreta:** pode bloquear benefício mediado e deixa confusão basal. **B correta:** G é causa comum relevante; M está no caminho causal e seu ajuste depende de outra pergunta. **C incorreta:** seleção por p ignora DAG. **D incorreta:** seleção posterior ao tratamento cria viés. **E incorreta:** temporalidade impede essa interpretação. **Mini-revisão:** efeito total inclui vias mediadas.

### Questão 2 — Colisor

Considere DAG: uso de A aumenta internação S, e doença Y também aumenta internação S. Apenas internados são analisados. Qual mecanismo é mais provável?

A. S é confundidor porque antecede necessariamente A.  
B. Ajustar S fecha todos os caminhos espúrios.  
C. Seleção em S, colisor comum de A e Y, pode induzir associação espúria entre eles.  
D. S mede diretamente eficácia de A em todos indivíduos.  
E. Amostra grande elimina problema.

**Gabarito: C.** **A incorreta:** S é consequência comum no DAG apresentado. **B incorreta:** condicionar colisor abre caminho. **C correta:** fenômeno de Berkson/collider bias. **D incorreta:** o estimando não foi definido assim. **E incorreta:** viés permanece em n alto. **Mini-revisão:** A→S←Y deve ficar bloqueado salvo pergunta que exige outra estrutura.

### Questão 3 — Tempo imortal

Coorte classifica tratados como “quem recebeu medicação nos 90 dias após diagnóstico” mas conta eventos desde o diagnóstico para todos. Por que resultado pode ser espúrio?

A. Tratados precisaram sobreviver até receber medicamento; a exposição foi definida com informação futura, criando tempo imortal.  
B. O desfecho sempre será menor porque medicamento é eficaz.  
C. A definição cria randomização natural.  
D. A janela de 90 dias confirma ausência de confundimento.  
E. Regressão com idade corrige todo problema.

**Gabarito: A.** **A correta:** o período pré-início é atribuído incorretamente por sobrevivência necessária. **B incorreta:** efeito biológico é desconhecido. **C incorreta:** não há sorteio. **D incorreta:** seleção e confusão podem coexistir. **E incorreta:** ajuste de idade não realinha tempo zero. **Mini-revisão:** alinhar elegibilidade, estratégias e início.

### Questão 4 — E-value

Um estudo observacional apresenta RR ajustado de 2,0 para desfecho e intervenção, com risco de confundimento residual. O E-value aproximado da estimativa pontual é:

A. 0,5.  
B. 1,0.  
C. 2,0.  
D. 3,41.  
E. 20.

**Gabarito: D.** **A incorreta:** não é inverso simples do RR. **B incorreta:** indicaria sensibilidade mínima para nulo. **C incorreta:** é RR, não E-value. **D correta:** 2+√[2(2−1)]≈3,414. **E incorreta:** escala exagerada. **Mini-revisão:** E-value mede força mínima de confusão não medida em escala adequada, não certeza causal.

### Questão 5 — STROBE

Um artigo observacional preencheu todo checklist STROBE de 22 itens. Qual afirmação correta?

A. Foi provada ausência de confundimento.  
B. As variáveis instrumentais são válidas por isso.  
C. O estudo equivale a ECR randomizado.  
D. A certeza GRADE é alta por definição.  
E. O relato foi estruturado, mas o checklist não certifica validade causal ou qualidade metodológica.

**Gabarito: E.** **A incorreta:** STROBE não elimina confundimento. **B incorreta:** validade instrumental exige outras hipóteses. **C incorreta:** relato não randomiza. **D incorreta:** certeza exige avaliação do corpo de evidências. **E correta:** a rede EQUATOR explicita limitação. **Mini-revisão:** guias de relato não substituem avaliação de viés.

### Questão 6 — Controle negativo temporal

Estudo observa que vacinados já tinham menos internações antes da vacinação. O que se deve considerar?

A. Efeito farmacológico da vacina sobre passado.  
B. Sinal de seleção/confundimento prévio, que precisa investigação antes da conclusão causal.  
C. Garantia de ausência de qualquer erro.  
D. Prova de que vacina aumenta risco.  
E. Proibição definitiva de usar dados de rotina.

**Gabarito: B.** **A incorreta:** intervenção futura não altera passado. **B correta:** diferença prévia sugere fragilidade de comparabilidade. **C incorreta:** é justamente pista de problema. **D incorreta:** não informa direção do efeito pós-vacina. **E incorreta:** dados de rotina podem ser úteis com método adequado. **Mini-revisão:** controles negativos são ferramentas diagnósticas, não certificação.

### Questão 7 — Positividade

Em hospital, pessoas em choque muito grave **nunca** recebem terapia B por contraindicação. Estudo tenta inferir efeito A versus B especificamente nesse grupo com propensity score. Qual interpretação?

A. Positividade pode falhar estruturalmente; não há base empírica adequada para contraste A versus B naquele estrato.  
B. Bastaria usar regressão com 100 covariáveis.  
C. Peso inverso de controle será sempre estável.  
D. A causa da contraindicação não importa.  
E. Um modelo de previsão com AUC elevado resolve automaticamente.

**Gabarito: A.** **A correta:** ausência de chance de B impede estimar efeito em grupo sem extrapolação forte. **B incorreta:** modelo não cria comparação. **C incorreta:** há risco de pesos extremos/indefinidos. **D incorreta:** risco clínico e elegibilidade são centrais. **E incorreta:** AUC não certifica overlap. **Mini-revisão:** sem suporte comum, restringir população-alvo ou buscar outra pergunta.

### Questão 8 — Confundimento por indicação

Tratamento A é reservado a pacientes mais graves, que morrem mais. Análise bruta encontra mais mortes com A. Qual conclusão?

A. A comprovadamente causa mais mortes.  
B. A é superior em todos porque prescrito pelos médicos.  
C. Pode haver confundimento por gravidade/indicação; é necessário comparar pessoas elegíveis e ajustar causas prévias adequadamente.  
D. O p-valor determina ausência de confusão.  
E. Aumentar n elimina escolha clínica como mecanismo.

**Gabarito: C.** **A incorreta:** associação bruta pode ser espúria. **B incorreta:** prescrição não prova benefício. **C correta:** gravidade causa tratamento e desfecho. **D incorreta:** p não mede confusão. **E incorreta:** confundimento persiste com n grande. **Mini-revisão:** desenhar DAG de indicação.

### Questão 9 — DiD

Intervenção em município A: taxa 100→70/1000; controle B: 80→65/1000. Sob hipóteses causais necessárias, estimativa simples de diferença-em-diferenças é:

A. −30/1000.  
B. −15/1000.  
C. +15/1000.  
D. −50/1000.  
E. +80/1000.

**Gabarito: B.** **A incorreta:** ignora mudança do controle. **B correta:** (70−100)−(65−80)=−30+15=−15. **C incorreta:** sinal invertido. **D incorreta:** erro aritmético. **E incorreta:** não é diferença das mudanças. **Mini-revisão:** tendências paralelas e choques concorrentes devem ser investigados.

### Questão 10 — Confundidor dependente do tempo

Tratamento A0 altera biomarcador L1, que por sua vez influencia A1 e desfecho Y. O interesse é efeito de estratégia longitudinal A0/A1. Qual afirmação é adequada?

A. Ajustar L1 em regressão convencional sempre estima efeito causal total sem viés.  
B. Ignorar L1 sempre resolve porque é variável pós-tratamento.  
C. Randomização foi automaticamente criada pela coleta seriada.  
D. É cenário de confundimento temporal afetado por tratamento prévio; pode requerer g-métodos e pressupostos sequenciais explícitos.  
E. Basta usar média de L1 do hospital.

**Gabarito: D.** **A incorreta:** bloqueio de parte de efeito e viés podem ocorrer. **B incorreta:** L1 confunde decisão A1. **C incorreta:** coorte repetida não randomiza. **D correta:** problema clássico dos g-métodos. **E incorreta:** média não resolve relação longitudinal. **Mini-revisão:** o papel de L1 varia por ponto temporal e estimando.

## 23. Dez propostas de imagens e diagramas autorais

**Nenhuma figura de DAGitty, checklist ROBINS-I/STROBE ou outro material licenciado foi importada.** O gráfico em si de um artigo tem direitos autorais específicos; a LURIA deve produzir **esquemas originais**, respeitando definições científicas e não copiando composição visual. Revisar direitos inclusive em material CC BY-NC-ND que não permite reprodução comercial.

| Nº | Visual original/candidato | Conceito a ensinar | Capítulos | Plano |
|---|---|---|---|---|
| 1 | Quadro contrafactual Y(1)/Y(0) com duas trajetórias hipotéticas | Por que efeito individual não é simultaneamente observável | §1–3 | Ilustração conceitual LURIA |
| 2 | DAG de confundidor A←L→Y | Por que ajustar gravidade basal | §4–6 | Redesenho autoral com notas |
| 3 | DAG mediador A→M→Y | Quando ajuste tira efeito total | §4/13 | Desenho próprio |
| 4 | DAG colisor A→S←Y com seleção | Berkson/collider bias | §4–7 | Desenho próprio com cenário de internação |
| 5 | Linha do tempo de usuário futuro e tempo imortal | Por que não usar informação futura para definir grupo | §9–10 | Cronologia autoral |
| 6 | Esquema de emulação de ensaio-alvo | Eligibilidade, zero, estratégias, desfecho | §10 | Fluxo autoral |
| 7 | Distribuição de propensity score com/sem overlap | Positividade e pesos extremos | §12 | Gráfico com dados didáticos fictícios |
| 8 | DAG longitudinal A0→L1→A1→Y | Confundidor afetado por A anterior | §11/13 | Diagrama novo |
| 9 | Gráfico pre/post com duas tendências fictícias (DiD) | Diferença de diferenças | §15/20 | Plot original de dados fictícios |
| 10 | Radar de robustez de conclusão com risco de seleção/informação/confusão | STROBE vs ROBINS-I vs E-value | §14/19 | Infográfico autoral não copiado |

**QA visual:** usar notação de setas explicitada em legenda, cores acessíveis e alt textual; distinguir vias causais e associações de seleção; nunca desenhar uma seta impossível no tempo; revisar por epidemiologista. Exportar WebP leve e testar legibilidade em celular/PWA. Os dez itens estão apenas **planejados**, não criados/incorporados.

## 24. Referências e transparência editorial

1. **Hernán MA, Robins JM.** *Causal Inference: What If*. Livro digital e materiais do autor; edição online disponível em https://www.hsph.harvard.edu/miguel-hernan/causal-inference-book/ . Conceitos de resultados potenciais, intercambiabilidade, positividade, consistência e g-métodos.
2. **Hernán MA, Sauer BC, Hernández-Díaz S, Platt R, Shrier I.** *Specifying a target trial prevents immortal time bias and other self-inflicted injuries in observational analyses*. J Clin Epidemiol. 2016;79:70–75. https://pubmed.ncbi.nlm.nih.gov/27237061/ . Tempo zero, eligibilidade e tratamento.
3. **Hernán MA et al.** *Target trial emulation: applying principles of randomised trials to observational studies*. BMJ. 2022;378:e071108. https://www.bmj.com/content/378/bmj-2022-071108 . Protocolos e emulação em efetividade.
4. **Identifying and avoiding design related biases in observational studies using the target trial framework.** BMJ Medicine 2026;5:e001280. https://bmjmedicine.bmj.com/content/5/1/e001280 . Usuário prevalente/tempo imortal e vieses de desenho.
5. **Elwert F, Winship C.** *Endogenous Selection Bias: The Problem of Conditioning on a Collider Variable*. Annu Rev Sociol. 2014;40:31–53. https://pmc.ncbi.nlm.nih.gov/articles/PMC6089543/. DAG e condicionamento em colisor.
6. **VanderWeele TJ, Ding P.** *Sensitivity Analysis in Observational Research: Introducing the E-Value*. Ann Intern Med 2017;167:268–274. https://pubmed.ncbi.nlm.nih.gov/28693043/. Sensibilidade por confundimento não medido.
7. **von Elm E et al.** *The STROBE statement: guidelines for reporting observational studies*. Ann Intern Med. 2007;147:573–577. https://www.equator-network.org/reporting-guidelines/strobe/. Checklist 22 itens de relato, não instrumento de qualidade causal.
8. **Cochrane ROBINS-I.** https://methods.cochrane.org/bias/risk-bias-non-randomized-studies-interventions. Domínios de risco de viés para estudos não randomizados de intervenções.
9. **ROBINS-I V2**, revisão preliminar de 20/11/2025. https://www.riskofbias.info/welcome/robins-i-v2 . **Ainda draft sujeito a modificações em 15/10/2026; direitos de imagem/reprodução restritos para produto comercial.**
10. **Textor J et al.** *Robust causal inference using directed acyclic graphs: the R package dagitty*. Int J Epidemiol 2016/2017. https://doi.org/10.1093/ije/dyw341 . Software e lógica de ajuste por DAG.
11. **Apostila LURIA 105 — Desenhos epidemiológicos**, rascunho interno preservado; cobre tipos de desenho.
12. **Apostila LURIA 110 — Ensaios clínicos e revisões sistemáticas**, rascunho interno preservado; cobre ECR, ITT, RoB2, GRADE, metanálise.

## 25. Auditoria preliminar e bloqueios para publicação

**Conteúdo existente:** conceitos de associação/contrafactuais/estimandos, intercambiabilidade/positividade/consistência, DAGs, confundidor/mediador/colisor, ajuste via backdoor, confundimento por indicação, seleção e Berkson, erro de informação/recall/vigilância, tempo imortal, usuário prevalente, protopatia e causalidade reversa, target-trial emulation, g-métodos para confundidores variantes, propensity scores/overlap/pesos, mediação, E-value, controles negativos, variáveis instrumentais, desenhos quase-experimentais/DiD/temporalidade, dados SIH/SIM/SINAN/e-SUS APS, leitura crítica STROBE/ROBINS-I, matemática, oito casos, dez questões de cinco alternativas integralmente comentadas e dez visuais propostos.

**QA pendente:** metodologista/epidemiologista deverá conferir DAGs (direção e ausência de ciclos), fórmulas E-value/DiD/padronização, interpretação de OR condicionado, robustez dos pressupostos em g-métodos, distinção entre versão ROBINS-I 2016 e V2 draft 2025, revisão de referências e direitos de reprodução. Revisar linguagem para não dizer “controlar confounders = causalidade garantida” nem “STROBE aprova estudo”. Garantir que os exemplos de SIM/SINAN/SIH não afirmem cobertura de toda população e respeitem LGPD. Produzir diagramas autorais com licença e WebP; converter para renderer e checar PWA. Deduplicar referências cruzadas com 105 e 110, preservando ambos.

**Auditoria final global pelo Codex:** obrigação registrada no arquivo apostilas/_rascunhos/AUDITORIA-GERAL-CODEX-APOSTILAS.md. O Codex deverá confrontar temas de TODOS os lotes, indicar lacunas/duplicatas/plágio, verificar ciência e referências, imagens/licenças, links e integração, produzir relatório e PRs. **Não fazer merge, deploy nem liberar material sem revisão técnica.**

**STATUS: MANUSCRITO AUTORAL DE PRIMEIRA PASSAGEM — SEM PUBLICAÇÃO, SEM MERGE, SEM DEPLOY.**
