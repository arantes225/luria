# LURIA — Apostila 095: Sensibilidade, especificidade e valores preditivos

**Lote:** 5 (aula 095 de 093–115) · **Área:** Medicina Preventiva / Epidemiologia Clínica.  
**Estado:** rascunho original — primeira etapa; NÃO revisado por pares e NÃO aprovado para publicação.  
**Recorte curricular:** fundamentos de acurácia dos testes e interpretação pós-teste. A aula 100 será o aprofundamento próprio sobre limiares de decisão, curvas ROC e AUC; evitar duplicação extensa entre as duas.

## 0. Etapa zero — inventário, confronto de fontes e arquitetura

A busca inicial no repositório LURIA não identificou uma pasta publicada homônima nem manuscrito com este recorte no inventário do lote 5. Buscas no Drive por “sensibilidade”, “especificidade”, “curva ROC” e “testes diagnósticos” não localizaram, pelo título, apostila geral diretamente correspondente; apareceram materiais de outras doenças que utilizam esses termos incidentalmente. Portanto, **não foi realizado benchmarking de uma apostila proprietária equivalente**, e não se deve atribuir este texto a qualquer cursinho ou presumir autorização de cópia.

**Fontes científicas reais:** STARD 2015/EQUATOR para estrutura de estudos de acurácia; Mallett e colaboradores (BMJ, 2012) para interpretação orientada ao paciente; artigo BMJ de 2016 sobre efeito do espectro; e PRISMA-DTA para sínteses de estudos diagnósticos. A fundamentação é metodológica e os exemplos numéricos abaixo são **fictícios e calculados para ensino**, nunca estimativas de desempenho de um teste clínico real.

**Objetivos verificáveis:** ao fim, o aluno deve construir uma tabela 2×2, calcular sensibilidade, especificidade, VPP, VPN e razões de verossimilhança; distinguir probabilidade pré-teste de prevalência populacional; usar odds pré e pós-teste sem confundir com probabilidades; reconhecer viés de seleção, verificação e padrão de referência; e escolher um exame segundo consequências clínicas de erros.

## 1. O problema: um teste não produz a verdade sozinho

Um exame diagnóstico é uma fonte de evidência que modifica uma hipótese, não um substituto do raciocínio clínico. Um resultado positivo pode ter significados diferentes numa pessoa com doença altamente provável e em outra cuja probabilidade inicial é muito baixa. Da mesma forma, um exame negativo tranquiliza mais ou menos conforme a sensibilidade do teste, sua execução, o momento da doença e a chance clínica antes de examinar.

Imagine duas pessoas com resultado positivo para a mesma doença. A primeira foi selecionada após sintomas e sinais altamente sugestivos. A segunda fez rastreamento numa população onde a condição é rara. Mesmo que o ensaio laboratorial e seu ponto de corte sejam iguais, a **proporção dos positivos que realmente têm a doença** pode diferir bastante. É por isso que perguntar “o teste é bom?” é insuficiente: precisamos perguntar **bom para detectar o quê, em quem, com qual limiar, para qual decisão e usando qual padrão de referência?**

A acurácia é descrita em estudos nos quais o teste avaliado — chamado teste índice — é comparado, de forma apropriada, com uma referência para identificar a condição-alvo. Sem definir a condição-alvo, o estágio da doença, a população de interesse e o contexto assistencial, uma sensibilidade de 95% pode ser uma afirmação vaga.

## 2. Tabela 2×2: a peça que organiza todas as contas

| Resultado do teste índice | Doença presente pelo padrão de referência | Doença ausente pelo padrão de referência |
|---|---:|---:|
| **Positivo** | Verdadeiro positivo (**VP** ou TP) | Falso positivo (**FP**) |
| **Negativo** | Falso negativo (**FN**) | Verdadeiro negativo (**VN** ou TN) |

As duas colunas representam a condição real de acordo com a referência. As duas linhas representam a classificação feita pelo teste. A posição das letras é importante, porque um falso negativo é **uma pessoa doente cujo teste foi negativo**, enquanto um falso positivo é **uma pessoa sem a doença que recebeu um teste positivo**.

**As margens também importam.** Total de doentes = VP + FN. Total de não doentes = VN + FP. Total de testes positivos = VP + FP. Total de testes negativos = VN + FN. Total da amostra = VP + FN + FP + VN. Escrever os denominadores explicitamente evita a maioria dos erros de prova.

**Exemplo LURIA — mil pessoas:** suponha, apenas para treino, 100 pessoas com a doença e 900 sem. O teste identificou 90 das 100 pessoas doentes e foi negativo em 720 das 900 sem doença.

| | Doença presente | Doença ausente | Total |
|---|---:|---:|---:|
| Teste positivo | 90 | 180 | 270 |
| Teste negativo | 10 | 720 | 730 |
| Total | 100 | 900 | 1.000 |

Antes de memorizar fórmulas, leia os acontecimentos: dez pessoas doentes receberam resultado negativo, enquanto 180 pessoas sem doença receberam positivo. A “qualidade” de cada resultado também envolve consequências: errar um rastreamento benigno não tem automaticamente o mesmo custo de deixar passar uma condição ameaçadora à vida.

## 3. Sensibilidade — entre os doentes, quantos dão positivo?

**Sensibilidade = VP / (VP + FN).** No exemplo: 90 / 100 = **90%**.

O denominador é **quem possui a doença**, e não “todos os positivos”. A pergunta correta é: *se o indivíduo realmente está doente, qual a probabilidade de o teste ser positivo naquele contexto?* Com sensibilidade de 90%, dez de cada cem doentes foram classificados negativamente no exemplo fictício.

Alta sensibilidade favorece a utilidade de um resultado negativo para reduzir suspeita, **mas não torna todos os negativos seguros**. É preciso observar probabilidade pré-teste, gravidade de perder diagnóstico, limiar de detecção, fase da doença e desempenho real na população. Um teste muito sensível em casos graves e tardios pode falhar mais nos pacientes precoces que chegam à APS.

**Armadilha:** sensibilidade de 90% não significa “um positivo tem 90% de chance de ser verdadeiro”. Essa pergunta pertence ao valor preditivo positivo e exige outro denominador.

## 4. Especificidade — entre os não doentes, quantos dão negativo?

**Especificidade = VN / (VN + FP).** No exemplo: 720 / 900 = **80%**.

O denominador é **quem não tem a doença**. Com especificidade de 80%, vinte de cada cem não doentes apresentaram falso positivo no exercício. Alta especificidade costuma conferir maior força de confirmação a um resultado positivo, mas essa força não é absoluta nem independente da chance pré-teste.

**Erro frequente:** “um teste com 80% de especificidade gera 20% de resultados falsos positivos entre todos os pacientes”. Não. A taxa de falso positivo de 20% refere-se especificamente aos **não doentes**. O número absoluto de falsos positivos na população depende de quantas pessoas não doentes foram examinadas.

## 5. Valores preditivos: mudar o denominador muda a pergunta

**Valor preditivo positivo (VPP) = VP / (VP + FP)**: entre as pessoas que testaram positivo, que fração de fato tem a doença? No exemplo, 90 / 270 = **33,33%**.

**Valor preditivo negativo (VPN) = VN / (VN + FN)**: entre as pessoas que testaram negativo, que fração realmente não tem a doença? No exemplo, 720 / 730 = **98,63%**.

Observe a diferença: mesmo com 90% de sensibilidade e 80% de especificidade, apenas um terço dos resultados positivos foi verdadeiro no grupo com 10% de prevalência. Isso não é defeito matemático; é a consequência de testar muitas pessoas sem doença quando a taxa de falso positivo não é desprezível.

| Medida | Pergunta com o denominador correto | Fórmula |
|---|---|---|
| Sensibilidade | Entre os **doentes**, quantos positivos? | VP / (VP + FN) |
| Especificidade | Entre os **não doentes**, quantos negativos? | VN / (VN + FP) |
| VPP | Entre os **positivos**, quantos doentes? | VP / (VP + FP) |
| VPN | Entre os **negativos**, quantos não doentes? | VN / (VN + FN) |
| Taxa de falso negativo | Entre os **doentes**, quantos negativos? | FN / (VP + FN) |
| Taxa de falso positivo | Entre os **não doentes**, quantos positivos? | FP / (VN + FP) |

**Pulo do gato:** “doentes” no começo da pergunta conduz a sensibilidade; “positivos” no começo conduz a VPP. Trocar a condição pelo resultado troca o denominador e, portanto, a probabilidade calculada.

## 6. Prevalência e probabilidade pré-teste: por que o mesmo teste muda de significado?

Mantenha sensibilidade em 90% e especificidade em 80% e examine, em exercícios com mil pessoas, populações fictícias com prevalências diferentes:

| Cenário | Doentes | VP | FN | FP | VN | VPP | VPN |
|---|---:|---:|---:|---:|---:|---:|---:|
| Prevalência **1%** | 10 | 9 | 1 | 198 | 792 | **4,35%** | **99,87%** |
| Prevalência **10%** | 100 | 90 | 10 | 180 | 720 | **33,33%** | **98,63%** |
| Prevalência **40%** | 400 | 360 | 40 | 120 | 480 | **75,00%** | **92,31%** |

A sensibilidade e a especificidade foram mantidas matematicamente iguais por hipótese. À medida que cresce a proporção de doentes, **aumenta o VPP e diminui o VPN**. Na prática, sensibilidade e especificidade **também podem variar** quando a composição, a gravidade ou o estágio dos pacientes muda; esse é o efeito do espectro e será discutido adiante.

**Prevalência não é sinônimo automático da probabilidade pré-teste de cada indivíduo.** Em rastreamento populacional bem definido, a frequência da condição no grupo pode ser ponto de partida razoável. Em ambulatório de referência, pronto atendimento, pessoas com sinais específicos ou com exame prévio alterado, o risco individual difere da prevalência média. O clínico combina dados epidemiológicos com história, exame físico e contexto para estimar a probabilidade antes do teste; não usa um número genérico como verdade personalizada.

O resultado positivo de um teste de rastreamento em população de baixíssimo risco frequentemente precisa de **confirmação com método mais específico**, especialmente se a confirmação implicará procedimento invasivo ou tratamento de risco. Escolher confirmação é parte da estratégia diagnóstica, não prova de que o primeiro teste foi inútil.

## 7. Razões de verossimilhança: o elo entre sensibilidade, especificidade e Bayes

As razões de verossimilhança (RV, ou likelihood ratios/LR) indicam quanto um resultado é mais provável entre doentes do que entre não doentes. Ao contrário do VPP/VPN, sua fórmula não contém explicitamente a prevalência, embora seu valor observado possa variar com o espectro da população e a definição do teste.

**RV positiva (LR+) = sensibilidade / (1 − especificidade).** No exemplo, 0,90 / 0,20 = **4,5**. Um resultado positivo é 4,5 vezes tão provável em quem tem a doença quanto em quem não tem, dadas as condições estudadas.

**RV negativa (LR−) = (1 − sensibilidade) / especificidade.** No exemplo, 0,10 / 0,80 = **0,125**. Um negativo é apenas 0,125 vez tão provável em quem tem a doença quanto em quem não tem; ou seja, ele desloca as chances para baixo.

| Resultado | Razão relevante | Direção desejável |
|---|---|---|
| Positivo | RV+ | **Maior**, geralmente bem acima de 1 |
| Negativo | RV− | **Menor**, idealmente próxima de zero |
| RV igual a 1 | Qualquer | Não altera as chances; teste não acrescenta discriminação para o resultado em questão |

Não memorizar limites mágicos universais, como “LR+ maior que 10 sempre confirma”. A mudança de probabilidade depende da hipótese pré-teste e da consequência clínica de errar; testes raramente atuam com independência perfeita quando vários são solicitados.

### 7.1. Probabilidade não é odds

**Odds = probabilidade / (1 − probabilidade)**; **probabilidade = odds / (1 + odds)**. Por exemplo, probabilidade de 20% corresponde a odds de 0,20/0,80 = **0,25**, ou uma chance de um evento para quatro de não evento. Escrever “20% = odds de 0,20” é matematicamente incorreto.

**Regra de Bayes em formato operacional: odds pós-teste = odds pré-teste × RV do resultado.**

Exemplo: antes de realizar o teste, a probabilidade clínica é 20%, logo as odds pré-teste são 0,25. Um resultado positivo com RV+ = 5 produz odds pós-teste de 1,25, que equivalem a **55,56%** de probabilidade. Para um resultado negativo com RV− = 0,20, as odds pós-teste seriam 0,05, equivalentes a **4,76%**. O mesmo indivíduo não teve ambos os resultados simultaneamente; são dois caminhos hipotéticos usados para compreender a força de cada desfecho.

### 7.2. Onde a conta pode falhar na prática?

Uma razão de verossimilhança publicada pode ser pouco transportável se o estudo incluiu apenas casos avançados e controles saudáveis, utilizou aparelhos diferentes, adotou outro ponto de corte ou verificou diagnósticos somente em pacientes selecionados. Também não se deve multiplicar mecanicamente as RV de três testes fortemente correlacionados como se oferecessem três evidências independentes.

Por fim, a pós-probabilidade não decide sozinha. Um risco residual de 5% pode ser aceitável para descartar um problema leve e inaceitável para excluir uma doença letal cuja investigação adicional é factível.

## 8. Rastreamento, diagnóstico e triagem: o mesmo índice não serve a todos

**Rastreamento** testa uma população sem sintomas para encontrar condições em fase inicial; a relevância dos falsos positivos aumenta quando a prevalência é pequena. A decisão depende também de benefício comprovado de detectar cedo, danos do sobrediagnóstico, qualidade da confirmação e acesso ao tratamento — não somente sensibilidade.

**Diagnóstico em paciente sintomático** incorpora probabilidade pré-teste específica. O exame deve responder a uma hipótese concreta: confirmar, excluir ou deslocar risco até limiar em que uma intervenção se justifique.

**Triagem de emergência** precisa priorizar evitar perdas perigosas, às vezes aceitando maior número de falso-positivos para não deixar passar condições tempo-dependentes. Um exame de triagem mais sensível é útil quando existe rota segura de confirmação, mas pode ser danoso se desencadear tratamento invasivo desnecessário em massa.

**Testes em paralelo:** classificar como positivo se qualquer um dos testes for positivo tende a aumentar sensibilidade e reduzir especificidade em comparação ao uso isolado de cada teste. **Testes em série:** exigir múltiplos positivos tende a aumentar especificidade e reduzir sensibilidade. Esses efeitos dependem dos testes e sua correlação; as fórmulas simplificadas baseadas em independência não devem ser aplicadas automaticamente.

## 9. Validade de estudo diagnóstico — quando a tabela 2×2 engana?

Um estudo pode apresentar contas impecáveis e conclusões inválidas. A STARD 2015 é diretriz de **relato** de estudos de acurácia, não um selo automático de ausência de viés. Para avaliar risco de viés e aplicabilidade, é preciso conhecer seleção, teste índice, padrão de referência, fluxo e intervalo entre exames.

### 9.1. Viés de espectro e desenho caso-controle com extremos

Testar a tecnologia apenas em doentes graves hospitalizados e controles completamente saudáveis costuma tornar a discriminação artificialmente fácil. O resultado pode ter sensibilidade e especificidade superiores aos encontrados em pacientes com sintomas leves, comorbidades e doenças mimetizadoras. Não extrapolar esse desempenho a um posto de saúde sem evidência de transportabilidade.

### 9.2. Viés de verificação

Se apenas pessoas com teste índice positivo recebem o padrão de referência, casos doentes com teste negativo podem permanecer sem diagnóstico. O cálculo da sensibilidade pode então ser inflado ou tornar-se incalculável corretamente. A verificação precisa ser planejada de modo a minimizar a dependência entre resultado do teste índice e confirmação da doença.

### 9.3. Padrão de referência imperfeito e incorporação

A referência pode errar; não existe “padrão-ouro” infalível em todas as doenças. Se o teste índice participa da própria definição da doença, ocorre **viés de incorporação**, favorecendo artificialmente concordância. A avaliação deve descrever a referência, suas limitações e se o avaliador conhecia os outros resultados.

### 9.4. Cegamento, limiar e perdas

O profissional que interpreta uma imagem sabendo que o paciente tem diagnóstico confirmado pode classificar resultados limítrofes de maneira diferente. Selecionar o melhor limiar após ver os dados e reportar apenas esse ponto pode inflar a estimativa aparente. Exclusões, testes inconclusivos e perdas no seguimento devem ser explicitados, pois removê-los silenciosamente pode enviesar os índices.

### 9.5. Intervalos de confiança, não apenas um número bonito

Sensibilidade “100%” em uma amostra com poucos doentes não significa certeza de que nunca haverá falso negativo. Examine numeradores, denominadores e intervalos de confiança, sobretudo quando a amostra é pequena. Para decisões de segurança, uma faixa ampla de possíveis valores importa tanto quanto a estimativa central.

**Checklist de leitura crítica original:** (1) pergunta clínica e população compatíveis com a prática? (2) teste índice e referência adequados? (3) intervalo e cegamento apropriados? (4) todos recebem referência? (5) resultados indeterminados e perdas são informados? (6) limites de decisão são pré-definidos? (7) incerteza estatística, consequências dos erros e possibilidade de replicação aparecem claramente?

## 10. Situações clínicas comentadas

### Caso 1 — Rastreamento com muitos positivos e pouca doença

Uma UBS utiliza teste fictício com sensibilidade de 90% e especificidade de 80% numa comunidade de mil pessoas onde a doença ocorre em apenas 1%. O exame é positivo em 207 pessoas. A coordenação pergunta se deve dizer a todos que “estão doentes”.

**Hipótese e dados:** existem dez doentes no conjunto, dos quais nove testam positivo; entre 990 sem a condição, 198 terão falso positivo. **Interpretação:** VPP = 9/207 = 4,35%; portanto a maioria dos positivos não tem a condição nesse cenário de baixa prevalência. **Conduta de raciocínio:** não converter positivo em diagnóstico definitivo, considerar confirmação com teste apropriado e informar risco e próximos passos sem rotular indevidamente. **Por que importa:** rastrear uma população quase toda saudável com especificidade limitada produz muitos resultados positivos falsos mesmo quando a sensibilidade é alta.

### Caso 2 — Exame negativo diante de probabilidade inicial elevada

Paciente sintomático apresenta achados clínicos tão sugestivos de uma doença potencialmente grave que o profissional estima probabilidade pré-teste elevada. O teste disponível tem sensibilidade razoável, mas seu desempenho foi validado principalmente em casos típicos mais avançados; o resultado é negativo.

**Raciocínio:** negativo não é autorização automática de alta. A probabilidade pós-teste cai segundo a RV−, mas pode permanecer acima do limiar em que investigação é necessária. **Exames e conduta:** reconsiderar timing, técnica, condição-alvo e alternativas; se a suspeita continuar elevada, usar teste de referência ou observação adequada conforme protocolo da doença. **Por que importa:** “teste negativo” e “doença excluída” só equivalem quando o risco residual é aceitavelmente baixo na situação real.

### Caso 3 — O erro na calculadora de probabilidade

Durante discussão clínica, uma residente usa probabilidade pré-teste de 20% e RV+ = 5. Ela multiplica diretamente 20% × 5 e informa “100%”.

**Raciocínio:** a regra multiplica **odds**, não probabilidade. Odds pré-teste = 0,20/0,80 = 0,25; odds pós = 0,25 × 5 = 1,25; probabilidade pós = 1,25/2,25 = **55,56%**. **Conduta:** registrar o cálculo com denominador e fontes; não converter índices estatísticos em certeza. **Por que importa:** Bayes é ferramenta clínica poderosa e fonte de erro grave quando suas unidades são confundidas.

### Caso 4 — Estudo bonito, verificação incompleta

Novo exame de imagem é estudado em pessoas com sintomas suspeitos. Todos os resultados positivos passam por biópsia; os negativos não são submetidos a nenhuma referência nem acompanhados. O artigo informa “sensibilidade de 100%”.

**Hipótese:** verificação parcial. Sem conhecer quantos negativos tinham de fato a doença, o número de falsos negativos permanece desconhecido. **Interpretação:** a estimativa de sensibilidade é potencialmente enviesada e não pode ser adotada sem reconstruir o fluxo de pacientes. **Conduta:** exigir transparência de referência, seguimento e perdas antes de mudar prática assistencial. **Por que importa:** a aparência de perfeição pode ser produzida pelo desenho, não pelo desempenho do teste.

## 11. Questões autorais de residência — todas as alternativas comentadas

### Questão 1 — O denominador decide o conceito

Um teste fictício foi aplicado a mil pessoas, 100 com a doença. Houve 90 verdadeiros positivos, 10 falsos negativos, 180 falsos positivos e 720 verdadeiros negativos. Qual a sensibilidade?

A. 33,3%.  
B. 80%.  
C. 90%.  
D. 98,6%.  
E. 10%.

**Gabarito: C.** Sensibilidade = 90/(90+10)=90%. **A incorreta:** é o VPP. **B incorreta:** é a especificidade. **D incorreta:** aproxima o VPN. **E incorreta:** é a proporção de falso-negativos entre doentes. **Mini-revisão:** a sensibilidade começa selecionando a coluna dos doentes.

### Questão 2 — Dependência da prevalência

Dois serviços utilizam o mesmo teste, com sensibilidade e especificidade constantes por hipótese. No serviço B a prevalência da condição é muito menor. Mantidas as demais premissas, o mais provável é:

A. VPP maior e VPN menor no serviço B.  
B. VPP menor e VPN maior no serviço B.  
C. Sensibilidade maior obrigatoriamente no serviço B.  
D. Especificidade torna-se igual à prevalência.  
E. VPN e VPP ficam necessariamente iguais.

**Gabarito: B.** Com menos doentes entre os testados, os falsos positivos representam maior fração dos resultados positivos; o VPP cai, enquanto o VPN tende a subir. **A incorreta:** inverte o efeito. **C incorreta:** o enunciado fixou a sensibilidade; fora da hipótese, ela pode variar por efeito de espectro, mas não aumenta obrigatoriamente. **D incorreta:** mede dimensões distintas. **E incorreta:** não existe tal identidade. **Mini-revisão:** VPP e VPN são condicionais ao resultado e dependem da frequência da doença no grupo.

### Questão 3 — Razão de verossimilhança positiva

Um exame tem sensibilidade de 90% e especificidade de 80%. Sua RV+ é:

A. 0,125.  
B. 0,90.  
C. 1,125.  
D. 4,5.  
E. 8,0.

**Gabarito: D.** RV+ = 0,90/(1−0,80)=4,5. **A incorreta:** é a RV−. **B incorreta:** é a sensibilidade isolada. **C incorreta:** não aplica o denominador de falso positivo. **E incorreta:** resultado de operação sem correspondência à fórmula. **Mini-revisão:** positivo força a razão sensibilidade/taxa de falso positivo.

### Questão 4 — Bayes sem confusão entre odds e probabilidade

Para hipótese clínica com probabilidade pré-teste de 20%, aplica-se um resultado com RV+ = 5. Qual é a probabilidade pós-teste aproximada?

A. 20%.  
B. 25%.  
C. 50%.  
D. 55,6%.  
E. 100%.

**Gabarito: D.** Odds pré = 0,2/0,8=0,25; odds pós=1,25; probabilidade=1,25/(1+1,25)=55,6%. **A incorreta:** ignora a nova informação. **B incorreta:** corresponde às odds iniciais expressas indevidamente como percentual. **C incorreta:** ignora conversão correta. **E incorreta:** multiplica diretamente 20% por 5. **Mini-revisão:** a regra opera sobre odds; depois converte-se de volta em probabilidade.

### Questão 5 — Verificação parcial

Em estudo de acurácia, apenas participantes com teste índice positivo recebem padrão de referência; os negativos não são seguidos. Qual o principal problema?

A. O estudo automaticamente mede especificidade sem erro.  
B. A prevalência deixa de existir.  
C. Não há como conhecer adequadamente falsos negativos, gerando risco de viés de verificação.  
D. O VPP passa obrigatoriamente a ser 100%.  
E. A curva ROC substitui a necessidade de referência.

**Gabarito: C.** Sem verificar negativos, casos doentes perdidos podem não ser contados. **A incorreta:** os índices não ficam automaticamente válidos. **B incorreta:** frequência da condição continua sendo conceito epidemiológico. **D incorreta:** ainda podem existir falsos positivos; a referência pode discordar do teste. **E incorreta:** ROC exige verdade de referência para classificar positivos e negativos. **Mini-revisão:** transparência do fluxo é tão importante quanto a tabela final.

### Questão 6 — Seleção de população e transportabilidade

Um teste é validado em pacientes hospitalizados com doença avançada versus voluntários saudáveis, mas pretende-se aplicá-lo a pessoas com sintomas inespecíficos na APS. Qual a avaliação mais apropriada?

A. Os índices se transferem sem mudanças porque são propriedades físicas invariáveis do teste.  
B. O VPP será sempre idêntico, independentemente da população.  
C. É desnecessário conhecer os critérios de seleção.  
D. O desenho pode superestimar discriminação por efeito do espectro; são necessárias evidências na população-alvo.  
E. A ausência de exame de imagem invalida toda análise.

**Gabarito: D.** Extremos clínicos facilitam separar grupos, mas não representam o espectro real na APS. **A incorreta:** sensibilidade e especificidade podem mudar com o espectro. **B incorreta:** VPP varia com chance pré-teste. **C incorreta:** seleção determina validade externa. **E incorreta:** vários testes não são de imagem. **Mini-revisão:** primeiro pergunte *em quem* o desempenho foi estimado.

## 12. Visão de revisão e erros frequentes

| Erro recorrente | Como corrigir |
|---|---|
| “90% de sensibilidade = 90% de chance de doença se positivo.” | Essa é a pergunta do VPP; sensibilidade condiciona aos doentes. |
| “Negativo exclui qualquer doença.” | Considere probabilidade pré-teste, RV−, timing, gravidade e teste. |
| “Especificidade é 1−VPP.” | Especificidade é 1−taxa de falso positivo **entre não doentes**. |
| “Prevalência nunca afeta interpretação.” | VPP/VPN mudam com frequência da condição e contexto. |
| “Bayes multiplica probabilidades diretamente por RV.” | Multiplique **odds** e converta de volta. |
| “Estudo caso-controle com extremos representa a APS.” | Há risco de efeito de espectro e aplicabilidade limitada. |
| “AUC alta resolve decisão clínica.” | A aula 100 mostrará por que limiar, consequências de erro e população importam mais do que AUC isolada. |
| “STARD certifica que não há viés.” | STARD melhora transparência do relato; validade depende do desenho e execução. |

**Fluxo de 30 segundos:** definir a condição-alvo → estimar probabilidade pré-teste → escolher teste apropriado à população e decisão → entender se o resultado é positivo/negativo/indeterminado → usar VPP/VPN ou RV com denominação correta → decidir frente ao risco pós-teste e às consequências de agir/esperar → documentar incerteza e próximo passo.

## 13. Camada visual planejada — candidatas a produzir, não imagens aprovadas

Apostila de metodologia depende principalmente de **esquemas originais nítidos**, não de fotografias clínicas decorativas. Dez ideias de figuras a selecionar/desenhar após revisão, sem importar diagrama protegido de artigo:

1. Tabela 2×2 com realce separado dos quatro denominadores.
2. Infográfico “sensibilidade versus VPP”: mesmo numerador, denominadores distintos.
3. Duas matrizes de mil pessoas para prevalências de 1% e 40%.
4. Diagrama de frequência natural mostrando falsos positivos em rastreamento.
5. Fluxo de conversão probabilidade → odds → RV → odds → probabilidade.
6. Mapa de decisão “resultado negativo não significa risco zero”.
7. Diagrama de seleção de extremos versus espectro clínico real.
8. Fluxo de verificação parcial e casos perdidos.
9. Fluxo de estudo com resultado indeterminado contabilizado.
10. Ilustração de testes em série versus em paralelo, com limites de independência.

**Situação técnica:** nenhuma imagem médica foi selecionada, baixada, licenciada ou aprovada; recomenda-se produzir SVG autoral responsivo e, apenas quando houver raster, WebP comprimido segundo política LURIA. A etapa de imagem permanece pendente.

## 14. Referências reais e verificação

1. Bossuyt PM et al. **STARD 2015: An Updated List of Essential Items for Reporting Diagnostic Accuracy Studies.** *BMJ*. 2015;351:h5527. DOI: https://doi.org/10.1136/bmj.h5527. Página EQUATOR: https://www.equator-network.org/reporting-guidelines/stard/
2. Cohen JF et al. **STARD 2015 guidelines for reporting diagnostic accuracy studies: explanation and elaboration.** *BMJ Open*. 2016;6:e012799. https://doi.org/10.1136/bmjopen-2016-012799
3. Mallett S et al. **Interpreting diagnostic accuracy studies for patient care.** *BMJ*. 2012;345:e3999. https://doi.org/10.1136/bmj.e3999
4. **The spectrum effect in tests for risk prediction, screening, and diagnosis.** *BMJ*. 2016;353:i3139. https://www.bmj.com/content/353/bmj.i3139
5. McInnes MDF et al. **Preferred Reporting Items for a Systematic Review and Meta-analysis of Diagnostic Test Accuracy Studies: PRISMA-DTA.** *JAMA*. 2018;319:388–396. https://doi.org/10.1001/jama.2017.19163

O presente texto usa números demonstrativos inventados (descritos como fictícios) e elaboração original. Não se deve atribuir as matrizes numéricas aos estudos citados.

## 15. Auditoria de pendências antes da entrega premium

- **Cobertura inicial:** matriz 2×2, sensibilidade, especificidade, VPP, VPN, efeito da prevalência, RV, Bayes, estratégias em série/paralelo, vieses, quatro casos e seis questões de cinco alternativas presentes.
- **Aprofundar:** intervalos de confiança com exemplos calculados; dados faltantes e resultados indeterminados; padronização de estudos de concordância; critérios de decisão e utilidade clínica sem antecipar de modo redundante a aula 100; referências brasileiras didáticas de epidemiologia clínica.
- **Revisar:** cada fórmula e exemplo por segundo leitor; clareza na diferença entre população estudada e paciente individual; fontes, ligações, qualidade dos enunciados, acessibilidade das tabelas e coerência com o renderer da LURIA.
- **Produzir:** dez esquemas visuais candidatos, aprovar arte e direitos, converter/otimizar quando aplicável.
- **Não concluído:** meta qualitativa de capítulo premium autossuficiente; revisão independente, auditoria de 60 mil caracteres úteis, integração ao site, teste PWA e publicação.

**STATUS: RASCUNHO ORIGINAL EM ELABORAÇÃO. Não incorporar à biblioteca como versão final sem revisão científica e editorial.**
