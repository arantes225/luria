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

## 14. Incerteza estatística: por que “sensibilidade de 90%” não é um fato exato

Até agora, as fórmulas foram apresentadas como proporções de observações já classificadas. Isso permite calcular estimativas pontuais, mas ainda não informa quanto os números poderiam variar por acaso se outro conjunto de pacientes, da mesma população, fosse estudado. Quando uma apostila ou questão de residência afirma “o teste tem sensibilidade de 90%”, é necessário perguntar: **90% obtidos de quantos doentes?** Vinte e dois mil pacientes estudados não dão a mesma precisão que vinte doentes, mesmo quando as proporções coincidem.

### 14.1. Numerador, denominador e intervalo de confiança

Considere dois estudos fictícios, nos quais todos os pacientes receberiam o mesmo padrão de referência e nos quais, por hipótese, o desempenho real do teste seria estável:

- **Estudo A:** 18 resultados positivos em 20 doentes → sensibilidade observada de **90%**.
- **Estudo B:** 900 resultados positivos em 1.000 doentes → sensibilidade observada de **90%**.

Ambos retornam o mesmo valor pontual. Entretanto, um intervalo de confiança de 95% pelo método **de Wilson para proporção binomial** é, aproximadamente, de **69,9% a 97,2% no estudo A** e de **88,0% a 91,7% no estudo B**. O exemplo não significa que o método de Wilson seja obrigatório em todos os artigos; ele serve para ensinar por que a quantidade de eventos define a precisão. O segundo estudo oferece faixa menor de resultados compatíveis com os dados observados porque contempla mais doentes.

Interpretar corretamente o IC exige uma distinção conceitual: no enquadramento frequentista usual, **não se atribui probabilidade de 95% ao parâmetro fixo estar dentro daquele intervalo específico já calculado**. O procedimento de construir intervalos tem cobertura nominal de 95% sob as suposições do modelo, em repetidas amostras hipotéticas. No ensino inicial, pode-se dizer que o intervalo expressa a *incerteza da estimativa*; porém, numa discussão científica rigorosa, é necessário explicitar modelo e método.

**Ponto decisivo:** para a sensibilidade, o tamanho informativo é **VP + FN**, isto é, o número de doentes efetivamente avaliados. Para a especificidade, é **VN + FP**, número de não doentes. Para o VPP, é **VP + FP**, número de positivos, cuja frequência pode ser pequena em doenças raras. Um estudo com cem mil participantes pode produzir sensibilidade muito imprecisa se contiver somente cinco doentes.

### 14.2. Estudo pequeno com “100%” de sensibilidade

Imagine que dez doentes foram examinados e todos apresentaram teste positivo. A estimativa pontual é de 100%, mas não é adequado afirmar que o teste “jamais falha”. Aplicando o intervalo binomial exato de Clopper–Pearson para dez sucessos em dez tentativas, o limite inferior bilateral de 95% é aproximadamente **69,2%**; o limite superior é 100%. Um único número bonito esconde ampla incerteza. Isso é particularmente relevante quando a condição é grave e o teste pretende descartá-la sozinho.

Em uma redação responsável, informar **10/10 (100%)** junto ao IC e às condições de recrutamento é mais útil que declarar, sem qualificadores, “sensibilidade de 100%”. A mesma advertência vale para especificidade em estudos que selecionam poucos controles.

### 14.3. Por que o tamanho da amostra total pode enganar

Um estudo incluiu 2.000 pessoas, mas apenas 20 tinham a condição-alvo. A amostra pode dar razoável precisão à especificidade, calculada em quase dois mil não doentes, enquanto a sensibilidade continua instável. Por isso, muitos projetos de acurácia planejam o número necessário de **doentes e não doentes**, e só depois estimam recrutamento total segundo prevalência esperada e elegibilidade.

A amostra também não corrige viés de seleção: um milhão de pacientes selecionados inadequadamente pode fornecer um intervalo estreito em torno de um resultado **sistematicamente errado**. A distinção é memorável: **precisão não é validade**.

### 14.4. Intervalos para razões de verossimilhança e comparação entre testes

A RV+ e a RV− derivam de duas estimativas (sensibilidade e especificidade) e também têm incerteza. Não é metodologicamente correto calcular RV+ = 4,5 e apresentar esse resultado como constante sem faixa de confiança ou avaliação de transportabilidade. Publicações podem reportar intervalos por métodos apropriados ao desenho (transformações logarítmicas, verossimilhança, bootstrap ou modelos de síntese). Na rotina de leitura crítica, não se exige que o estudante memorize uma fórmula universal para cada modelo; exige-se reconhecer quando uma RV muito próxima de 1, com ampla incerteza, oferece pouca evidência.

Quando **dois testes são feitos nas mesmas pessoas**, suas medidas de desempenho são estatisticamente pareadas. Compará-los como se fossem duas amostras independentes desperdiça informação e pode produzir teste de hipótese e IC incorretos. A pergunta deve especificar se a comparação é pareada, independente ou apenas indireta, e se os mesmos pacientes receberam ambos os testes sob condições equivalentes.

### 14.5. Quando o resultado é um número contínuo

Muitas análises começam com um valor laboratorial, escore ou probabilidade estimada; só depois transformam esse número em positivo/negativo por um **limiar**. A sensibilidade e especificidade mencionadas em um artigo dependem desse ponto de corte. Se outro serviço adota diferente ponto de corte, não é adequado transportar os mesmos índices sem validação.

Esta apostila ensina a interpretar **um limiar definido**. A exploração sistemática da troca entre sensibilidade e especificidade ao variar muitos limiares, a curva ROC, a AUC e a escolha estatística do ponto de corte formará a **aula 100**, sem repetir toda a construção 2×2 aqui.

**Quadro — como ler uma estimativa publicada com discernimento**

| Relato publicado | Pergunta crítica |
|---|---|
| “Sensibilidade 95%” | Quantos doentes a compõem? Qual o IC? Como foram selecionados? |
| “Especificidade 99%” | Quantos não doentes? Quais diagnósticos alternativos estavam presentes? |
| “O teste tem VPP alto” | Qual a prevalência/probabilidade pré-teste no estudo e no meu serviço? |
| “Acurácia global 98%” | Qual proporção de doentes? Quanto essa medida mascara falsos negativos importantes? |
| “Desempenho superior a outro teste” | Mesmas pessoas ou grupos distintos? Intervalos, comparador e limiar são adequados? |

## 15. Além de positivo e negativo: resultados indeterminados, qualidade e erro pré-analítico

A tabela 2×2 é uma representação didática poderosíssima, mas pressupõe que se sabe como classificar cada participante em uma das quatro células. Na assistência real, porém, alguns resultados vêm como **indeterminados, inválidos, insuficientes, tecnicamente inconclusivos ou ausentes**. Ignorar esses pacientes distorce o desempenho de uma estratégia diagnóstica, especialmente se falhas forem mais frequentes em pessoas muito doentes, em crianças, em pacientes obesos ou em subgrupos subatendidos.

### 15.1. “Inconclusivo” não deve desaparecer do denominador

Em um estudo fictício de 1.000 pessoas, 100 tinham a doença e 900 não tinham. O laboratório conseguiu classificar 950 exames, mas 50 falharam por motivos técnicos. Se o artigo calcular sensibilidade/especificidade exclusivamente em 950 testes válidos, isso pode ser apropriado para a pergunta restrita “qual é o desempenho *condicional a resultado interpretável*?”. Não é suficiente para a pergunta operacional “qual a proporção de pacientes que o sistema de saúde consegue investigar corretamente no primeiro encontro?”.

É indispensável conhecer **em quais pacientes ocorreram as 50 falhas** e o que aconteceu a seguir. Se vinte pertencem ao grupo doente e trinta aos não doentes, o desempenho calculado ignorando-as pode parecer satisfatório, mas o serviço pode precisar de recolheita, nova consulta ou exame alternativo em proporção importante. A frequência de resultado inválido deve ser informada, incluindo denominador e razões.

Há três escolhas inadequadas frequentes: transformar todos os inconclusivos em “negativos” sem justificativa; excluí-los silenciosamente; ou imputar como se fossem aleatórios quando estão ligados à gravidade, condição clínica ou qualidade da amostra. A estratégia correta deve ser pré-especificada e coerente com o uso real.

### 15.2. Fluxo de pacientes e referência incompleta

Um paciente pode ter testagem inicial, não retornar à confirmação e nunca receber classificação de referência. Isso é diferente de exame índice tecnicamente inválido. O fluxograma STARD ajuda a distinguir recrutados, elegíveis, testados, verificados, excluídos e analisados. Sem contabilizar cada etapa, um denominador aparentemente claro pode não representar a amostra inicial.

**Exemplo de fluxograma autoral:**
1. Recrutados e avaliados para elegibilidade: 1.200.
2. Elegíveis: 1.050; motivos para as 150 exclusões devem ser descritos.
3. Receberam teste índice: 1.020; trinta sem teste.
4. Testes tecnicamente interpretáveis: 990; trinta inválidos.
5. Receberam referência adequada: 940; cinquenta sem verificação.
6. Entraram na tabela 2×2: 940, com razões das perdas e características comparadas aos demais.

Os números são didáticos e não derivam de estudo. O problema é que uma sensibilidade calculada em 940 pacientes não descreve necessariamente a experiência dos 1.200 inicialmente considerados.

### 15.3. Fase pré-analítica, analítica e pós-analítica

**Pré-analítica:** identificação errada, amostra coletada no momento inadequado, material insuficiente, transporte ou armazenamento impróprio, preparo do paciente não realizado e contaminação. Alguns exames são muito dependentes do tempo desde o início dos sintomas; um negativo precoce pode exigir repetição programada em vez de concluir ausência da doença.

**Analítica:** calibração, lote de reagentes, competência do operador, variação do aparelho, interferentes, algoritmo empregado e parâmetros de processamento. Em testes point-of-care, o desempenho pode ser afetado por temperatura, iluminação, qualidade da conexão e técnica.

**Pós-analítica:** resultado não visualizado, unidade errada, corte aplicado de maneira inadequada, laudo ambíguo, comunicação atrasada e plano de acompanhamento inexistente. A sensibilidade medida em condições ideais não captura necessariamente o dano de um resultado correto entregue tarde demais ao profissional responsável.

Portanto, há uma diferença entre **acurácia intrínseca observada em estudo**, **confiabilidade do processo de aplicação** e **efetividade clínica da estratégia completa**.

### 15.4. Reprodutibilidade não é sinônimo de validade

Um método pode dar o mesmo resultado repetidamente e estar consistentemente errado. A **repetibilidade** descreve proximidade entre medidas nas mesmas condições; **reprodutibilidade**, estabilidade ao variar avaliador, aparelho ou local, conforme definição adotada; **validade/acurácia**, proximidade da classificação à condição-alvo de referência. Concordância entre dois leitores de imagem não prova que concordam com o diagnóstico correto.

É útil diferenciar também **concordância** de **correlação**: duas medições podem ser fortemente correlacionadas, mas apresentar diferença sistemática tão grande que não são intercambiáveis. Para resultados categóricos, medidas de concordância (como kappa) respondem perguntas diferentes da sensibilidade. Para contínuos, avaliação de diferenças e limites de concordância é mais informativa que correlação isolada quando o objetivo é substituir um método por outro.

### 15.5. A regra prática do plantão

Se o laudo chega como inconclusivo, o médico precisa responder: “O risco da doença é alto o suficiente para agir/observar enquanto repito ou substituo o exame?” O problema não se resolve convertendo inconclusivo em negativo no prontuário. Da mesma forma, resultado que não combina com a clínica exige confirmar identificação, coleta, momento, plausibilidade biológica e necessidade de nova amostra antes de encerrar a hipótese.

## 16. Dos índices diagnósticos à utilidade clínica: o que muda uma decisão?

Uma ferramenta diagnóstica só agrega valor se permitir tomar decisões melhores para o paciente ou a população. Uma estratégia pode detectar mais casos e ainda assim produzir danos quando leva a procedimentos desnecessários, rotulação, ansiedade, sobretratamento e uso de recursos escassos sem reduzir eventos clínicos relevantes.

### 16.1. Limiar de teste, limiar de tratamento e zona de incerteza

Imagine uma condição grave com tratamento potencialmente eficaz, mas arriscado. Existem, conceitualmente, três regiões:

- **Risco muito baixo:** nem investigação adicional nem tratamento podem trazer benefício proporcional; orientações de segurança e reavaliação podem ser suficientes.
- **Risco intermediário:** informação obtida com teste pode mudar a conduta e evitar tanto tratamento desnecessário quanto perda de casos.
- **Risco muito alto:** certas condições tempo-dependentes exigem medidas terapêuticas imediatas ou avaliação especializada sem atrasar assistência à espera do teste; o exame pode servir para caracterização, não como permissão para iniciar medidas de suporte.

Esses limiares dependem da gravidade da doença, eficácia e toxicidade do tratamento, dano de exames invasivos, custo de perder caso, preferências da pessoa e capacidade do serviço. **Não existe percentual universal que autorize testar ou tratar todas as doenças.** A aula 100 explorará a seleção de pontos de corte e avaliação formal de decisão; aqui importa compreender por que um resultado “bom” não decide fora do contexto.

### 16.2. O mesmo falso negativo pode ter consequências muito diferentes

Suponha que duas condições fictícias tenham igual sensibilidade, mas consequências distintas. Em condição autolimitada facilmente reavaliada, perder temporariamente uma pequena proporção pode ter dano limitado. Em condição que progride em horas e requer intervenção precoce, a mesma proporção pode representar risco inaceitável. Não classifique teste como ideal apenas porque atinge uma meta de sensibilidade sem considerar *qual dano surge quando falha*.

Um teste mais sensível não é automaticamente estratégia melhor se, para aumentar sensibilidade, leva a dezenas de intervenções invasivas desnecessárias. Em política de rastreamento, o balanço deve incluir incidência, desfechos, sobre diagnóstico e inequidades de acesso à confirmação.

### 16.3. VPP e comunicação de risco em frequências naturais

Para muitas pessoas, “VPP de 4,35%” é abstrato. No cenário fictício de 1% de prevalência já apresentado, pode-se dizer: **em cada mil pessoas testadas, 207 teriam positivo; dessas, cerca de nove realmente teriam a condição e 198 não**. Isso expõe simultaneamente benefício e efeito adverso dos falsos positivos.

Essa forma de comunicação deve vir acompanhada de contexto: se o exame é preliminar, a pessoa não precisa sair com rótulo definitivo de doença; precisa saber o que significa o resultado, como será confirmada a hipótese, em quanto tempo e quais sintomas exigem retorno. Falar de probabilidade não é abandonar responsabilidade clínica: é **planejar a próxima decisão de maneira compreensível**.

### 16.4. Sensibilidade e especificidade não medem benefício final

Um exame pode identificar doença mais cedo sem melhorar sobrevida ou qualidade de vida, especialmente quando há **viés de antecipação diagnóstica (lead-time)**: o paciente parece viver mais tempo “após o diagnóstico” simplesmente porque o rótulo foi antecipado, sem mudança na data de óbito. Também pode ocorrer viés de duração (length-time), em que rastreamento detecta proporcionalmente mais doenças de evolução lenta. E pode existir sobrediagnóstico de condições que nunca causariam dano durante a vida do indivíduo.

Esses fenômenos são centrais para compreender programas de rastreamento: mais diagnósticos realizados não são prova de mais pessoas salvas. A relevância clínica da estratégia requer evidência de desfechos, impactos e balanceamento de danos, não apenas curvas ou proporções de classificação.

### 16.5. Testes seriados e dependência biológica

Um erro didático perigoso é multiplicar RVs de diferentes sintomas ou exames como se cada um fosse independente. Imagine que febre, taquicardia e leucocitose sejam efeitos relacionados do mesmo processo inflamatório. Se suas RVs forem aplicadas como três evidências independentes, corre-se risco de superestimar a certeza. O mesmo ocorre com escores compostos e exames que medem características semelhantes.

**Condições de uma multiplicação válida:** as estimativas devem pertencer a populações compatíveis; os achados precisam ser interpretados sequencialmente em relação à informação já conhecida; e é preciso considerar **dependência condicional** entre resultados. Na dúvida, um modelo multivariável validado ou evidência direta de uma estratégia combinada é preferível à multiplicação ad hoc.

### 16.6. Decisão compartilhada e segurança

Em pacientes estáveis, explicar benefício esperado, chance de falso positivo/negativo, consequências de confirmar ou não e possibilidade de observação permite decisão alinhada a valores individuais. Entretanto, comunicação compartilhada **não** deve se tornar desculpa para transferir à pessoa um cálculo que o serviço não explicou. Em situações emergenciais, protocolos de segurança e direitos do paciente prevalecem sobre uma apresentação excessivamente abstrata de probabilidades.

## 17. Como desenhar, relatar e julgar um estudo de acurácia

A STARD 2015 ajuda a relatar estudos com transparência. A **QUADAS-3 (2026)** é instrumento distinto, voltado à avaliação de risco de viés e aplicabilidade em revisões de estudos de acurácia. Elas não competem entre si: uma melhora descrição e rastreabilidade; a outra apoia julgamento estruturado da confiabilidade e relevância dos resultados.

### 17.1. Comece pela pergunta clínica e não pela estatística

Um estudo corretamente formulado precisa definir:

1. **Participantes e cenário:** pacientes consecutivos com suspeita inicial? Pessoas assintomáticas rastreadas? Indivíduos encaminhados após exame alterado?
2. **Condição-alvo:** doença atual, estágio específico, infecção transmissível ou complicação a ser evitada?
3. **Teste índice:** dispositivo, operador, coleta, versão, algoritmo, limiar e interpretação.
4. **Padrão de referência:** por que esse método aproxima a definição da condição? Ele é aplicado a todos?
5. **Tempo entre exames:** condição pode ter mudado entre teste e referência?
6. **Uso pretendido:** triagem, substituição de outro exame, confirmação ou complemento?
7. **Desfecho da pesquisa:** sensibilidade/especificidade por limiar, indeterminados, precisão, subgrupos e eventual impacto clínico.

A inclusão **consecutiva ou aleatória em amostra pertinente ao cenário** tende a ser mais representativa que seleção deliberada de extremos. Estudos caso-controle podem ter usos específicos, mas frequentemente não respondem à pergunta operacional de diagnóstico de paciente com sintomas inespecíficos. O padrão de referência deve ser escolhido com rigor, inclusive quando não é possível oferecer a todos um teste invasivo.

### 17.2. O que a QUADAS-3 acrescenta em 2026

A QUADAS-3 substituiu a QUADAS-2 como versão mais recente da ferramenta, conforme publicação de Whiting e colaboradores na *Annals of Internal Medicine* em 2026. Sua aplicação parte de uma **pergunta de síntese** e de um **ensaio ideal de acurácia** para julgar se os estudos reais se aproximam da pergunta que queremos responder.

Os **quatro domínios de risco de viés** são:
- **Participantes:** seleção e inclusão representam o cenário clínico relevante?
- **Teste índice:** conduta e interpretação do teste introduzem distorções?
- **Condição-alvo:** como a condição é definida e verificada pelo padrão de referência?
- **Análise:** seleção de resultados, dados ausentes, unidades de análise e cálculo das estimativas são apropriados?

Nos três primeiros domínios há também apreciação de **aplicabilidade** à pergunta da revisão. O instrumento envolve seis fases: definir pergunta; descrever ensaio ideal; desenhar fluxo; identificar estimativas; julgar viés/aplicabilidade; e formular avaliação global. **Não basta colocar “baixo risco” numa tabela** sem explicar o que se esperaria do estudo ideal e quais evidências sustentam a classificação.

**Referência específica:** Whiting PF et al. *QUADAS-3: A Revised Tool for the Quality Assessment of Diagnostic Test Accuracy Studies*. *Ann Intern Med*. 2026;179(4):548–555. https://doi.org/10.7326/ANNALS-25-02104.

### 17.3. Viés de espectro não se limita à prevalência

A prevalência modifica o VPP/VPN sob sensibilidade/especificidade fixas por hipótese. Mas a **composição clínica** da população também modifica o próprio desempenho do teste. Casos avançados podem oferecer sinais mais intensos que casos iniciais; controles saudáveis podem ser muito mais fáceis de classificar que pessoas com diagnósticos concorrentes que imitam a doença. Essas mudanças criam o efeito de espectro, descrito em Usher-Smith, Sharp e Griffin (*BMJ*, 2016).

Não é rigoroso afirmar que sensibilidade/especificidade são “sempre invariáveis à prevalência”. A frase só vale como uma **propriedade algébrica sob desempenho condicional mantido** — simplificação útil em exercícios como o quadro com prevalência de 1%, 10% e 40%, mas não garantia de transportabilidade em populações reais.

### 17.4. Desenhos emparelhados e comparação de estratégia diagnóstica

Um estudo comparando duas modalidades pode aplicar ambos os testes aos mesmos participantes, de preferência com interpretação cega e ordem/intervalo planejados. Isso permite comparar diretamente desempenho e examinar discordâncias dentro de uma população comum. O padrão de referência idealmente não incorpora a informação do teste avaliado; quando isso é impossível, deve-se explicitar limitação.

Compare duas perguntas distintas:

- **Qual dos testes identifica mais corretamente a condição?** — foco na acurácia.
- **Usar o teste melhora decisões ou resultados dos pacientes?** — foco no impacto da estratégia, que pode exigir outro desenho, acompanhamento ou ensaio de estratégia diagnóstica.

A maior sensibilidade de uma modalidade pode não gerar benefício se positivos não forem confirmados, tratamentos forem inacessíveis ou resultados demorarem demais.

### 17.5. Revisões sistemáticas diagnósticas e heterogeneidade

Reunir sensibilidade e especificidade de vários estudos não equivale a calcular uma média aritmética dos percentuais. Estudos diferem em limiar, prevalência, doença, seleção, referência e contexto de uso. A síntese costuma empregar modelos que consideram a **correlação e heterogeneidade** entre sensibilidade e especificidade (por exemplo, modelos hierárquicos bivariados e HSROC). A escolha do modelo depende da pergunta e da disponibilidade dos dados.

No contexto brasileiro, existe uma diretriz pública do **Ministério da Saúde/Conitec para revisão sistemática e metanálise de estudos de acurácia diagnóstica**. Ela deve ser priorizada no capítulo de metodologia aplicada ao SUS. O texto completo é indicado na página institucional: https://www.gov.br/conitec/pt-br/midias/artigos_publicacoes/diretrizes/revisao_sistematica_metanalise_estudos_acuracia_diagnostica.pdf.

**Diferencie novamente as ferramentas:**
- STARD 2015: relatar um estudo primário de acurácia.
- STARD-AI 2025: extensão de relato para pesquisas com testes baseados em IA.
- QUADAS-3 2026: julgar risco de viés e aplicabilidade em estudos de acurácia.
- PRISMA-DTA: transparência do relato de revisão sistemática de acurácia.
- Diretrizes metodológicas MS/Conitec: orientar a produção de sínteses de evidência diagnóstica no Brasil.

## 18. Tecnologias digitais e IA diagnóstica: por que estudar acurácia além do laboratório?

Cada vez mais classificadores digitais são oferecidos para avaliar imagem, sinais vitais, traçados e risco clínico. É tentador ler “99% de acurácia” em divulgação comercial e concluir que a ferramenta está pronta para uma fila de pacientes reais. Isso pode ser falso mesmo que a conta esteja correta na amostra de desenvolvimento.

### 18.1. Conjunto de treino, validação interna e avaliação externa

Um modelo aprende padrões a partir de dados usados em seu desenvolvimento. Se as mesmas pessoas, instituições ou versões das imagens aparecem inadvertidamente tanto no desenvolvimento quanto no teste, os indicadores podem ser inflados por **vazamento de dados**. A separação apropriada depende da unidade de generalização: imagens distintas da **mesma pessoa** não são automaticamente observações independentes.

Avaliação externa em outra população, serviço, equipamento ou período testa uma dimensão de transportabilidade. Ela não substitui estudos de impacto clínico: um classificador pode acertar em dados retrospectivos e falhar ao modificar fluxo de atendimento, gerar alerta excessivo ou sofrer degradação após mudanças operacionais.

### 18.2. Acurácia versus calibração

Um modelo que diferencia relativamente bem quem tem ou não determinada condição pode oferecer **probabilidades mal calibradas**. Por exemplo, se um grupo de pacientes recebe risco previsto de 70%, espera-se, numa calibração apropriada para aquele grupo e horizonte temporal, que a frequência observada esteja próxima desse valor. Discriminação mede ordenação relativa; calibração mede coerência entre risco previsto e frequência observada. **AUC alta não garante calibração**.

No contexto de um teste cuja saída já é binária, sensibilidade/especificidade descrevem classificação. Quando um sistema oferece probabilidades, deve-se avaliar também calibração, estabilidade e consequências clínicas das faixas de decisão. O estudo da curva ROC permanece aprofundado na aula 100.

### 18.3. Subgrupos, justiça e erro diferencial

Um algoritmo pode apresentar sensibilidade global satisfatória e desempenho insuficiente em populações pouco representadas. Em sistemas que usam fotografia clínica ou imagens médicas, diversidade de pigmentação cutânea, idade, qualidade do equipamento, contexto de coleta e prevalência das condições pode influenciar os resultados. Não presumir igualdade de performance com base apenas na média agregada; avaliar estratos clinicamente justificados, intervalos de confiança e viés na definição da referência.

O objetivo não é publicar números por subgrupo arbitrário sem poder estatístico: é identificar sistematicamente **quem corre o risco de receber erro desproporcional** e quais dados adicionais são necessários para garantir segurança.

### 18.4. STARD-AI 2025 — ferramenta atualizada para leitura crítica

A *Nature Medicine* publicou em setembro de 2025 a extensão **STARD-AI**, com itens novos ou modificados sobre conjuntos de dados, características do teste baseado em IA, avaliação, viés e equidade. Uma correção editorial da publicação foi registrada em julho de 2026; ao citar o documento, utilizar a versão do artigo atualizada e informar essa ressalva de rastreabilidade.

**Fonte:** Sounderajah V et al. *The STARD-AI reporting guideline for diagnostic accuracy studies using artificial intelligence*. *Nature Medicine*. 2025;31:3283–3289. https://doi.org/10.1038/s41591-025-03953-8.

**Aplicação à LURIA:** se futuramente houver leitura automatizada de ECG, exames ou achados clínicos, a promessa não deve ser “IA sabe o diagnóstico” a partir de um benchmark interno. Será preciso testar o modelo com avaliação externa, registrar denominadores, negativos falsos, indeterminados, variação por população e percurso de revisão humana. Esta seção é metodológica: **não representa validação de qualquer produto de IA da plataforma**.

## 19. Casos integradores avançados — quando a interpretação muda a conduta

Os casos desta seção ampliam, sem substituir, os quatro casos iniciais. São cenários e números **inteiramente fictícios**, propostos para praticar decisão. Nenhum percentual apresentado aqui deve ser usado para diagnosticar ou excluir uma doença específica no atendimento real.

### Caso 5 — “100% sensível” em apenas dez doentes

**Apresentação.** Um hospital pequeno recebe proposta de compra de dispositivo novo de rastreamento. O fornecedor informa sensibilidade de 100%, obtida porque dez pessoas com a doença testaram positivo. A direção pergunta se o equipamento pode substituir o exame confirmatório existente.

**Dados relevantes.** O conjunto de dez pacientes foi formado por casos avançados de doença, todos já conhecidos como positivos. O material não informa número total de elegíveis, testes inconclusivos, recrutamento consecutivo nem distribuição por fases precoces da condição. Não apresenta resultado em pacientes com sinais que imitam a doença.

**Hipóteses metodológicas.** A estimativa 10/10 = 100% pode ser consequência de tamanho pequeno e efeito de espectro. Um intervalo exato bilateral de 95% para dez sucessos em dez tentativas tem limite inferior em torno de 69,2%, não permitindo afirmar sensibilidade perfeita. A ausência de controles adequados impede também avaliar a especificidade na população de interesse.

**Exames/avaliações complementares.** Não se trata de “pedir hemograma”, mas de solicitar estudo de acurácia com população pertinente ao uso pretendido, padrão de referência adequado, fluxo de inclusões e perdas, intervalos de confiança e resultados estratificados por gravidade quando justificado.

**Interpretação e conduta.** A direção não deve abolir o método de referência com base nessa evidência isolada. Pode planejar avaliação técnica e clínica adicional, custo-efetividade e testagem supervisionada após aprovação institucional e ética quando pertinente.

**Por que importa.** Em provas, a alternativa que se deixa seduzir por “100%” ignora a incerteza, o viés e o denominador. Na vida real, essa confusão pode ampliar falsos negativos em pessoas cujo estágio da doença difere dos casos usados para apresentar a tecnologia.

### Caso 6 — As falhas de coleta desaparecem do relatório

**Apresentação.** Uma equipe avalia teste rápido fictício para condição transmissível. Em cem pacientes com doença confirmada, oitenta têm resultado positivo, dez negativo e dez inválido. O artigo informa sensibilidade “88,9%” e conclui que o exame seria suficiente como triagem única.

**Dados e conta.** Entre os noventa pacientes doentes com resultado interpretável, a sensibilidade condicional é 80/(80+10) = **88,9%**. Entretanto, na população de cem doentes submetidos à estratégia, **20 não receberam resultado positivo válido na primeira tentativa**: dez negativos e dez inválidos. Não se pode alterar silenciosamente o denominador para afirmar que somente 11,1% de doentes tiveram situação problemática no atendimento inicial.

**Raciocínio diferencial.** Um resultado negativo definido pelo teste pode ter implicação distinta de uma amostra inválida, a qual exige repetição, outro método ou observação. Para avaliação técnica estrita, reportar a sensibilidade entre interpretáveis pode ser informativo. Para avaliar desempenho da estratégia, é obrigatório acrescentar a proporção de inválidos e o caminho clínico deles.

**Exames/medidas.** Identificar causas das falhas, repetição do teste e padrão de referência; examinar se inválidos se concentram em pessoas com determinadas características, em turnos de plantão, operadores ou lotes.

**Conduta de organização do serviço.** Estabelecer protocolo explícito para resultados inválidos, particularmente quando existe risco de infecção transmissível ou de deterioração clínica. Não comunicar “negativo” na ausência de resultado interpretável.

**Por que importa.** Excluir inconclusivos pode deixar um teste aparentemente melhor no artigo e pior no atendimento efetivo.

### Caso 7 — Duas evidências correlacionadas contadas duas vezes

**Apresentação.** Paciente com suspeita de determinada síndrome tem dois achados laboratoriais positivamente associados ao mesmo processo biológico. Um estudante conhece RV+ de 3 para o primeiro marcador e de 4 para o segundo em estudos separados e multiplica 3 × 4 = 12, supondo aumento de odds de doze vezes.

**Dados relevantes.** Os artigos estimaram cada marcador isoladamente. Nenhum analisou a RV do segundo **condicionada ao primeiro já conhecido**. Ambos podem medir manifestações sobrepostas de inflamação.

**Hipótese do erro.** Multiplicar RVs marginais como se fossem condicionalmente independentes pode exagerar a evidência. Em um modelo probabilístico sequencial correto, a atualização a partir do segundo marcador deve considerar a informação já trazida pelo primeiro.

**Como resolver.** Buscar estudo da estratégia combinada, modelo multivariável validado ou estimativas condicionais. Verificar se o desempenho é transportável para a população atual e quais diagnósticos concorrentes causam os mesmos marcadores.

**Conduta clínica de raciocínio.** A probabilidade pós-teste precisa ser interpretada sem falsa precisão. Se a decisão envolve procedimento arriscado, revisar documentação e buscar confirmação adequada pode ser melhor que aplicar cálculo espúrio.

**Por que importa.** Saber a fórmula de Bayes é necessário; conhecer suas suposições é o que evita conclusões perigosas.

### Caso 8 — Algoritmo com média alta, falha em subgrupo

**Apresentação.** Um serviço apresenta sistema fictício para leitura automatizada de imagens com sensibilidade agregada de 94% em validação interna. Durante teste externo, porém, as imagens de uma população pouco representada no treinamento apresentam maior frequência de falso negativo.

**Dados necessários.** Quantos pacientes e quantos doentes compõem cada estrato? O limiar foi fixado antes da análise? Houve sobreposição de pacientes ou exames entre treinamento e validação? Há mudança na distribuição de doenças e equipamentos? Os ICs são amplos? Os subgrupos foram definidos por justificativa clínica?

**Hipóteses.** Pode haver alteração do espectro clínico, diferenças na captura de imagem, viés de seleção ou limitações do modelo. A média agregada não garante segurança uniforme. Não basta observar diferença bruta pequena se há incerteza estatística elevada; tampouco ignorar um padrão de risco repetido porque o global “passou”.

**Investigação.** Reanalisar fluxo, erros, distribuição e calibração quando a saída inclui probabilidades; conduzir avaliação externa reproduzível com comparação ao padrão de referência adequado e supervisão humana.

**Conduta.** Restringir ou revisar o uso da tecnologia conforme governança e risco; definir critérios de encaminhamento e revisão por profissional, sem liberar diagnóstico totalmente automático com base em marketing ou validação retrospectiva limitada.

**Por que importa.** Acurácia é uma propriedade **da interação entre teste, condição e população**, não um selo vitalício atribuído ao software.

## 20. Questões integradoras adicionais — leitura crítica, precisão e decisão

As seis questões seguintes ampliam as seis iniciais e treinam armadilhas menos óbvias. Todos os valores clínicos são inventados para ensino. Cada questão tem **uma alternativa mais adequada** à situação descrita.

### Questão 7 — Precisão versus valor pontual

Dois estudos relatam sensibilidade de 90% para a mesma tecnologia. No primeiro, 18 de 20 doentes têm teste positivo; no segundo, 900 de 1.000. Assuma seleção e referências adequadas em ambos. A interpretação mais correta é:

A. O primeiro oferece maior precisão porque seu percentual é idêntico ao do segundo.
B. Ambos têm necessariamente o mesmo intervalo de confiança.
C. O segundo tende a oferecer intervalo mais estreito para a sensibilidade, dada a maior quantidade de doentes.
D. O primeiro prova que o teste jamais alcança sensibilidade abaixo de 90%.
E. A amostra total, incluindo somente não doentes, determina a precisão da sensibilidade.

**Gabarito: C.** A mesma proporção estimada a partir de denominador maior tende a apresentar menor incerteza amostral. Com IC de Wilson 95%, aproximadamente 69,9–97,2% para 18/20 e 88,0–91,7% para 900/1.000. **A incorreta:** mesmo percentual não significa melhor precisão. **B incorreta:** tamanho da amostra importa. **D incorreta:** uma estimativa não é limite inferior verdadeiro da população. **E incorreta:** o denominador informativo da sensibilidade é VP+FN, os doentes. **Mini-revisão:** reportar x/n + IC e considerar viés/transportabilidade.

### Questão 8 — Resultado inválido na vida real

Um teste rápido foi feito em cem doentes: oitenta positivos, dez negativos e dez inválidos. Qual apresentação é mais transparente?

A. Sensibilidade = 100%, pois inválidos não são negativos.
B. Sensibilidade entre interpretáveis = 88,9% e frequência de inválidos entre doentes = 10%, com plano explícito para resultados inválidos.
C. Sensibilidade = 80% obrigatoriamente, como se todo inválido fosse falso negativo, sem explicações.
D. Todos os resultados inválidos devem ser considerados falso positivo.
E. Os dez inválidos devem ser omitidos do estudo e do fluxo clínico.

**Gabarito: B.** A questão permite relatar o desempenho **condicional** a resultado interpretável com o denominador correspondente e, separadamente, a falha operacional; o destino clínico dos inválidos precisa ser definido. **A incorreta:** cem por cento contradiz os dez negativos reais. **C incorreta:** transformar todos os inválidos em negativos sem justificar não é regra universal; análise operacional pode apresentar outras métricas, mas deve explicitar escolha. **D incorreta:** inválido não significa positividade. **E incorreta:** omissão mascara desempenho. **Mini-revisão:** diferenciar teste índice negativo de teste tecnicamente não interpretável.

### Questão 9 — Validade, precisão e referência

Um equipamento fornece valor quase idêntico em dez repetições, mas existe erro de calibração conhecido que o desloca constantemente para cima. Qual é a conclusão?

A. É válido porque é repetível.
B. É específico porque não muda entre medições.
C. A repetibilidade pode ser alta enquanto a validade é prejudicada por viés sistemático.
D. A medida de concordância resolve a diferença de calibração sem ajuste.
E. A sensibilidade é igual ao coeficiente de correlação entre repetições.

**Gabarito: C.** Repetibilidade mede estabilidade sob condições repetidas; validade exige proximidade da condição ou referência relevante. **A incorreta:** consistência não prova correção. **B incorreta:** especificidade é outra medida de classificação. **D incorreta:** um erro sistemático pode coexistir com alta concordância interna de repetição. **E incorreta:** correlação e sensibilidade têm denominadores diferentes. **Mini-revisão:** erros aleatórios, sistemáticos e classificação não são sinônimos.

### Questão 10 — Ferramentas metodológicas de 2026

Um pesquisador precisa (i) relatar estudo de acurácia clássico com transparência; (ii) julgar risco de viés e aplicabilidade de estudos numa revisão sistemática; e (iii) relatar avaliação diagnóstica de sistema de IA. Qual associação é a mais adequada?

A. (i) STARD 2015; (ii) QUADAS-3; (iii) STARD-AI.
B. (i) QUADAS-3; (ii) STARD-AI; (iii) PRISMA para ensaios randomizados.
C. (i) STARD-AI apenas; (ii) STARD 2015 apenas; (iii) kappa.
D. (i) Curva ROC; (ii) VPP; (iii) VPN.
E. (i) STARD 2015; (ii) somente cálculo de AUC; (iii) QUADAS-2 exclusivamente.

**Gabarito: A.** As funções das ferramentas diferem: STARD descreve transparência do estudo primário; QUADAS-3 (2026) orienta avaliação estruturada de viés/aplicabilidade; STARD-AI estende critérios de relato de estudos com IA. **B incorreta:** troca funções; além disso, PRISMA não é ferramenta de risco de viés para esse uso. **C incorreta:** não cobre adequadamente o conjunto de tarefas. **D incorreta:** métricas não substituem diretrizes e instrumentos. **E incorreta:** AUC não julga sozinho viés; QUADAS-2 foi sucedida pela versão 3. **Mini-revisão:** ferramenta de relato ≠ avaliação de viés ≠ índice de classificação.

### Questão 11 — Dados dependentes e multiplicação de RV

Um aluno multiplica RV+ de dois exames porque ambos são positivos na mesma pessoa. As RVs foram estimadas isoladamente e os exames medem processos biologicamente relacionados. Qual crítica é mais apropriada?

A. Toda RV pode ser multiplicada sem restrição.
B. A multiplicação sempre subestima a probabilidade real.
C. A fórmula de Bayes proíbe incorporar mais de um exame.
D. A multiplicação de RVs isoladas pode superestimar evidência se os testes não forem condicionalmente independentes; procurar estimativas condicionais ou validação combinada.
E. O segundo exame é necessariamente inútil.

**Gabarito: D.** A atualização sequencial exige representar a informação condicional ao que já se conhece. **A incorreta:** ignora dependência. **B incorreta:** o sentido do erro não é universal. **C incorreta:** múltiplas evidências podem ser incorporadas com modelo adequado. **E incorreta:** correlação não equivale a redundância completa. **Mini-revisão:** evidência sobreposta pode ser contada duas vezes.

### Questão 12 — O resultado positivo precisa de contexto

Teste hipotético com sensibilidade 90%, especificidade 80% e prevalência 1% é aplicado a mil pessoas. Nove positivos são verdadeiros e 198 são falsos positivos. Qual mensagem é clinicamente mais defensável?

A. “O exame positivo confirma a doença em 90% dos casos.”
B. “O teste é inútil em todos os cenários, independentemente de confirmação.”
C. “A grande maioria dos positivos nesse cenário seria falso positivo; o resultado preliminar exige estratégia de confirmação e comunicação clara antes de rotular definitivamente o paciente.”
D. “A especificidade passa a ser 1% porque a condição é rara.”
E. “Como o VPN é elevado, todos os resultados positivos devem ser ignorados.”

**Gabarito: C.** O VPP é 9/(9+198) ≈ 4,35%, de modo que um positivo tem significado limitado sem confirmação adequada na população fictícia. **A incorreta:** troca sensibilidade por VPP. **B incorreta:** utilidade depende do papel do teste em estratégia. **D incorreta:** especificidade foi mantida em 80% por hipótese. **E incorreta:** VPN alto não elimina necessidade de avaliar positivos. **Mini-revisão:** comunicar frequências naturais ajuda a explicar limites do teste sem gerar certeza falsa.

### Conferência de ancoragem — questões 1–12

| Conjunto | O que avalia | Texto que fundamenta |
|---|---|---|
| 1–2 | Sensibilidade e VPP/VPN por prevalência | §§2–6 |
| 3–4 | RV+ e conversão odds → probabilidade | §7 |
| 5–6 | Verificação parcial e efeito de espectro | §9 |
| 7 | Denominador e intervalo de confiança | §14 |
| 8 | Inconclusivos e desempenho operacional | §15 |
| 9 | Repetibilidade, referência e validade | §15.4 |
| 10 | STARD, QUADAS-3 e STARD-AI | §§17–18 |
| 11 | Dependência condicional | §§7.2 e 16.5 |
| 12 | Prevalência, VPP e comunicação | §§5–6 e 16.3 |

## 21. Referências reais e verificação

1. Bossuyt PM et al. **STARD 2015: An Updated List of Essential Items for Reporting Diagnostic Accuracy Studies.** *BMJ*. 2015;351:h5527. DOI: https://doi.org/10.1136/bmj.h5527. Página EQUATOR: https://www.equator-network.org/reporting-guidelines/stard/
2. Cohen JF et al. **STARD 2015 guidelines for reporting diagnostic accuracy studies: explanation and elaboration.** *BMJ Open*. 2016;6:e012799. https://doi.org/10.1136/bmjopen-2016-012799
3. Mallett S et al. **Interpreting diagnostic accuracy studies for patient care.** *BMJ*. 2012;345:e3999. https://doi.org/10.1136/bmj.e3999
4. **The spectrum effect in tests for risk prediction, screening, and diagnosis.** *BMJ*. 2016;353:i3139. https://www.bmj.com/content/353/bmj.i3139
5. McInnes MDF et al. **Preferred Reporting Items for a Systematic Review and Meta-analysis of Diagnostic Test Accuracy Studies: PRISMA-DTA.** *JAMA*. 2018;319:388–396. https://doi.org/10.1001/jama.2017.19163
6. Whiting PF et al. **QUADAS-3: A Revised Tool for the Quality Assessment of Diagnostic Test Accuracy Studies.** *Ann Intern Med*. 2026;179(4):548–555. https://doi.org/10.7326/ANNALS-25-02104.
7. Sounderajah V et al. **The STARD-AI reporting guideline for diagnostic accuracy studies using artificial intelligence.** *Nat Med*. 2025;31:3283–3289. Correção de autor registrada em 2026. https://doi.org/10.1038/s41591-025-03953-8.
8. Ministério da Saúde/Conitec. **Diretrizes metodológicas: elaboração de revisão sistemática e metanálise de estudos de acurácia diagnóstica.** https://www.gov.br/conitec/pt-br/midias/artigos_publicacoes/diretrizes/revisao_sistematica_metanalise_estudos_acuracia_diagnostica.pdf.

O presente texto usa números demonstrativos inventados (descritos como fictícios) e elaboração original. Não se deve atribuir as matrizes numéricas aos estudos citados.

## 22. Auditoria de pendências antes da entrega premium

- **Cobertura atual:** matriz 2×2, sensibilidade, especificidade, VPP, VPN, prevalência, RV, Bayes, estratégias em série/paralelo, vieses, intervalos de confiança, resultados inconclusivos, seleção de pacientes, QUADAS-3, STARD-AI, utilidade clínica; oito casos clínicos e doze questões com cinco alternativas e comentários.
- **Aprofundar após revisão externa:** comprovação de cálculos de IC em software independente; escolha de estudos nacionais exemplares e impacto no SUS; interoperabilidade com o renderer; revisão pedagógica do percurso da aula 095 para a 100, sem repetir a metodologia ROC.
- **Revisar:** cada fórmula e exemplo por segundo leitor; clareza na diferença entre população estudada e paciente individual; fontes, ligações, qualidade dos enunciados, acessibilidade das tabelas e coerência com o renderer da LURIA.
- **Produzir:** dez esquemas visuais candidatos, aprovar arte e direitos, converter/otimizar quando aplicável.
- **Não concluído:** revisão metodológica independente, contagem objetiva dos caracteres de prosa útil e deduplicação, integração ao site, teste PWA, imagens autorais/legendas e publicação. A extensão bruta atual excede 60 mil caracteres, mas isso não certifica completude nem qualidade clínica.

**STATUS: RASCUNHO ORIGINAL EM ELABORAÇÃO. Não incorporar à biblioteca como versão final sem revisão científica e editorial.**
