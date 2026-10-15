# LURIA — Apostila 100: Testes diagnósticos, curvas ROC e pontos de corte

**Área:** Medicina Preventiva / Epidemiologia Clínica · **Lote:** 5 · **Aula:** 100.  
**Estado editorial:** manuscrito original em elaboração; NÃO revisado independentemente, NÃO incorporado ao site, NÃO publicado.  
**Organização curricular:** este tema complementa a **aula 095 — Sensibilidade, especificidade e valores preditivos**. A aula 095 ensina a tabela 2×2, Bayes, razões de verossimilhança e interpretação por probabilidade pré-teste; a presente apostila concentra-se na **mudança do limiar de decisão, curva ROC, área sob a curva, escolha de pontos de corte e avaliação de utilidade clínica**. Não copiar nem repetir capítulos extensos da 095.

## 0. Etapa zero, referências e limites da produção

**Inventário:** a entrada 100 do inventário do lote 5 não registra pasta homônima publicada nem manuscrito anterior. A busca inicial no Google Drive por “Curva ROC” não retornou apostila de metodologia diretamente equivalente. Não presumir que materiais de terceiros estejam autorizados para uso. Conteúdo, cenários e valores numéricos deste arquivo são criados para a LURIA, não transcritos de apostila externa.

**Fontes verificadas para embasamento:** Altman e Bland, *BMJ* (1994), explicam o significado de curvas ROC e AUC; Fawcett (2006) discute fundamentos e armadilhas dos classificadores; Vickers e Elkin (2006) introduzem análise de curva de decisão; STARD 2015 orienta relato transparente da acurácia. Para revisões sistemáticas brasileiras, consultar a diretriz metodológica da Conitec. Esses documentos têm escopos diferentes e não autorizam atribuir a um deles afirmações não presentes nele.

**Meta pedagógica:** depois desta aula, o estudante deve construir pontos (1−especificidade, sensibilidade), interpretar uma AUC sem chamá-la de probabilidade individual de doença, comparar limiares, criticar seleção automática por índice de Youden, compreender benefício líquido e integrar prevenção de dano clínico à escolha da estratégia diagnóstica.

## 1. Por que o ponto de corte transforma o exame

Nem todo teste clínico nasce “positivo” ou “negativo”. Muitos devolvem uma variável contínua: concentração de biomarcador, intensidade de sinal em imagem, escore de risco ou probabilidade estimada por algoritmo. Um profissional ou protocolo escolhe um limiar e transforma o valor em classe operacional. Essa decisão cria trade-offs: um valor baixo para classificar como positivo costuma detectar mais doentes, mas também identificar mais não doentes. Um valor alto costuma reduzir resultados positivos falsos e, ao mesmo tempo, perder alguns casos verdadeiros.

Esse movimento não significa que exista necessariamente um defeito no exame. A sobreposição entre valores de doentes e não doentes é comum. Imagine um marcador que aumenta quando ocorre uma doença: doentes têm, em média, valores mais altos, mas pessoas sem a condição também podem apresentar valores elevados. Não existe um limiar que separe perfeitamente os dois grupos se suas distribuições se sobrepõem.

A pergunta correta não é “qual o corte estatisticamente bonito?”, mas **qual ponto de corte atende à finalidade clínica e às consequências de cada erro?** A mesma tecnologia pode ser usada como triagem sensível ou como confirmação específica com cortes diferentes, desde que isso esteja validado e não introduza condutas contraditórias ou inseguras.

**Pulo do Gato:** um exame não fica “mais sensível” porque o laboratório aumentou a qualidade do aparelho; às vezes apenas **baixou o limiar**, aceitando aumento de falsos positivos. Compare os dois índices ao interpretar mudanças de corte.

## 2. Recapitulação mínima: o mapa da curva ROC

A **curva ROC** (*receiver operating characteristic*) dispõe, no eixo horizontal, a **taxa de falso positivo = 1−especificidade** e, no eixo vertical, a **sensibilidade** (taxa de verdadeiro positivo). Cada ponto corresponde a um limiar de classificação. O limiar precisa estar associado a uma regra de positividade, por exemplo, “resultado ≥ t indica positivo”. Sem explicitar qual direção do exame indica maior probabilidade de doença, pode-se gerar curva invertida ou AUC equivocada.

No extremo mais restritivo, ninguém é classificado como positivo, de modo que sensibilidade = 0 e taxa de falso positivo = 0; o ponto é (0,0). No extremo em que todos são positivos, ambas as taxas valem 1, produzindo (1,1). Entre eles, os limiares geram uma sequência de pontos. No espaço ROC, um ponto em direção ao **canto superior esquerdo** expressa mais verdadeiros positivos com menor taxa de falsos positivos, mas a escolha clínica ainda depende do custo de cada erro.

A linha diagonal que liga (0,0) a (1,1) representa classificação sem discriminação útil sob hipótese de desempenho ao acaso. Uma curva predominantemente acima dessa linha indica capacidade de ordenar os casos com doença acima dos não doentes na direção escolhida. Entretanto, não se deve usar uma imagem bonita como prova de benefício clínico.

**Importante:** ROC relaciona taxas condicionadas à doença, e não VPP. Seu eixo horizontal **não** indica “percentual de todos os pacientes que receberão positivo”. Essa fração depende de prevalência e limiar.

## 3. Construção de uma curva do zero — exemplo LURIA, sem dados de pacientes reais

Considere um estudo didático com **200 pessoas**, das quais **80 têm a doença** conforme o padrão de referência e **120 não têm**. Todos realizaram o mesmo teste quantitativo, com valores maiores associados à condição. São três cortes candidatos:

| Regra para positividade | VP | FN | FP | VN | Sensibilidade | Especificidade | Coordenada ROC (FPR; TPR) |
|---|---:|---:|---:|---:|---:|---:|---|
| **A: corte baixo** | 76 | 4 | 66 | 54 | 95% | 45% | (0,55; 0,95) |
| **B: corte intermediário** | 68 | 12 | 30 | 90 | 85% | 75% | (0,25; 0,85) |
| **C: corte alto** | 48 | 32 | 6 | 114 | 60% | 95% | (0,05; 0,60) |

Todos os dados são **inventados**, com contagens consistentes por grupo. Cada linha deve conservar VP+FN = 80 e FP+VN = 120. Conforme o corte aumenta, menos pessoas têm positivo: VP e FP caem, FN e VN sobem. Isso é coerente com um mesmo marcador orientado na direção “maior valor = mais doença”.

### 3.1. Calculando cada linha de maneira auditável

**Corte A:** 76/80 = 95% de sensibilidade. 54/120 = 45% de especificidade. FPR = 1−0,45 = 0,55. O ponto é (0,55; 0,95).

**Corte B:** 68/80 = 85% de sensibilidade. 90/120 = 75% de especificidade. FPR = 0,25. Ponto (0,25; 0,85).

**Corte C:** 48/80 = 60% de sensibilidade. 114/120 = 95% de especificidade. FPR = 0,05. Ponto (0,05; 0,60).

A curva é traçada ordenando os pontos pelo eixo horizontal: (0,0) → C → B → A → (1,1). Pode-se ligá-los para obter uma **aproximação por segmentos**, útil para compreender ROC. Numa análise real de dados contínuos, seria necessário usar todos os limiares observados (ou método validado de construção) para obter a AUC empírica apropriada. A representação com somente três cortes é uma **simplificação didática**, não substitui análise do conjunto original.

### 3.2. Desenhando a curva mentalmente

- O corte **C** fica mais à esquerda e relativamente baixo: poucos falsos positivos, porém perde parcela importante dos casos.
- O corte **B** ganha sensibilidade sem aumentar tanto a taxa de falso positivo.
- O corte **A** quase detecta todos os doentes, mas leva a maior proporção de não doentes classificados como positivos.
- O melhor corte **não** decorre apenas da distância visual do canto superior esquerdo sem conhecer objetivos clínicos.

Se as curvas de dois testes se cruzarem, pode acontecer de um ser mais útil numa região de alta sensibilidade e o outro numa região de alta especificidade. Comparar apenas AUC pode ocultar a vantagem no ponto de operação que realmente interessa ao serviço.

## 4. AUC: o que a área mede, e o que não mede

A área sob a curva ROC, ou **AUC**, resume a capacidade de **discriminação por ordenação** do marcador ao longo dos limiares. No caso em que valores maiores indicam doença e não há empates, ela pode ser entendida como a probabilidade de um **doente escolhido aleatoriamente apresentar valor do marcador maior que um não doente escolhido aleatoriamente**. Com empates, as formulações usuais atribuem contribuição de metade aos pares empatados. Essa interpretação **não é** “a probabilidade de um paciente positivo ter doença”, nem “percentual de diagnósticos corretos”.

Uma AUC de 0,85 indica capacidade global razoável de ordenação no conjunto estudado, não VPP de 85%, sensibilidade de 85% ou melhora de 85% nos desfechos. O valor esperado de um teste sem poder de discriminação é 0,5 quando a direção é definida corretamente. Uma AUC abaixo de 0,5 pode significar que a direção do marcador foi invertida ou que a classificação é pior que a inversão dela no conjunto estudado; não autoriza concluir automaticamente que a tecnologia é clinicamente danosa sem revisar codificação e contexto.

### 4.1. Área por trapézios no exemplo didático

Com os pontos (0,0), (0,05;0,60), (0,25;0,85), (0,55;0,95) e (1,1), somam-se as áreas dos trapézios, a partir das larguras ΔFPR e alturas médias de sensibilidade:

1. De x=0 a 0,05: 0,05 × (0+0,60)/2 = **0,015**.
2. De x=0,05 a 0,25: 0,20 × (0,60+0,85)/2 = **0,145**.
3. De x=0,25 a 0,55: 0,30 × (0,85+0,95)/2 = **0,270**.
4. De x=0,55 a 1: 0,45 × (0,95+1)/2 = **0,43875**.

A área dessa **curva simplificada de cinco nós** é **0,86875 ≈ 0,869**. Não atribua automaticamente 0,869 à AUC calculada a partir de todos os resultados individuais do teste, pois esses resultados não foram disponibilizados no exemplo e limiares intermediários foram omitidos. O objetivo da conta é visualizar a geometria.

### 4.2. Por que AUC elevada não garante boa decisão

AUC agrega todos os limiares, inclusive cortes que nunca seriam adotados por razões de segurança. Um exame pode ter AUC um pouco maior e, ainda assim, desempenho inferior na região específica em que a instituição precisa de altíssima sensibilidade. Além disso, a AUC não incorpora diretamente gravidade das consequências, custo de intervenção, preferência da pessoa ou risco de falsos positivos na população local.

Em termos de política pública, uma tecnologia não deve ser incorporada apenas porque possui AUC maior que 0,9. É preciso verificar o cenário de validação, o custo, a possibilidade de confirmação, a disponibilidade de intervenção eficaz e os desfechos clínicos ou organizacionais esperados.

## 5. Índice de Youden: útil, mas não oráculo clínico

O índice de Youden é definido como **J = sensibilidade + especificidade − 1**. Ele também equivale à diferença entre taxa de verdadeiro positivo e taxa de falso positivo (**TPR−FPR**). No gráfico ROC, corresponde à separação vertical entre o ponto do teste e a diagonal aleatória.

No nosso exemplo:

| Corte | Sensibilidade | Especificidade | Youden J |
|---|---:|---:|---:|
| A | 0,95 | 0,45 | **0,40** |
| B | 0,85 | 0,75 | **0,60** |
| C | 0,60 | 0,95 | **0,55** |

Se adotarmos exclusivamente o critério de maior Youden entre os três cortes estudados, o escolhido será **B**. Isso significa que B maximiza a soma dos dois índices **no conjunto de alternativas**, não que B reduz obrigatoriamente a morbidade ou mortalidade em qualquer cenário.

O método trata sensibilidade e especificidade de forma matematicamente simétrica e não expressa automaticamente as assimetrias dos danos. Em triagem de emergência, perder um caso pode ser muito mais grave que solicitar confirmação de um positivo falso, favorecendo A. Para uma intervenção de alto risco, que exige especificidade maior e confirmação, C pode ser mais pertinente. A decisão real exige estudos com impacto clínico e limiares predefinidos.

**Armadilha de prova:** “maior Youden” não equivale à escolha baseada em custos, valores dos pacientes, prevalência, calibração ou utilidade final.

## 6. AUC, acurácia global, VPP e calibração: quatro perguntas diferentes

| Medida | Pergunta que responde | O que não autoriza concluir |
|---|---|---|
| AUC-ROC | Quão bem o escore ordena doentes acima de não doentes ao variar limiares? | Probabilidade de doença de uma pessoa específica |
| Acurácia global | Que proporção total da amostra foi classificada corretamente em um **corte fixo**? | Superioridade em doença rara ou segurança de erros graves |
| VPP | Entre os positivos em uma população, quantos têm doença? | Discriminação do escore em todos os cortes |
| Calibração | As probabilidades previstas correspondem às frequências observadas em grupos pertinentes? | Sensibilidade e especificidade em um limiar sem calcular as classificações |

Considere uma doença pouco prevalente. Classificar todos como “não doentes” pode gerar acurácia global impressionante e sensibilidade **zero**. AUC e análise estratificada ajudam a expor limitações da classificação global, mas ainda é necessário olhar para a decisão clínica.

Se um sistema fornece risco calculado de 80%, é essencial saber se grupos com esse risco previsto realmente apresentam frequência próxima de 80% no horizonte temporal considerado. Uma ferramenta pode ordenar pacientes muito bem (boa AUC) e superestimar sistematicamente probabilidades (calibração ruim). A distinção é especialmente importante com softwares e modelos de inteligência artificial.

## 7. Valor preditivo por ponto de corte — consequências no mesmo grupo

Os três cortes do estudo hipotético foram aplicados às mesmas 200 pessoas, com 40% de doença. Podemos calcular a proporção de resultados positivos que representa caso verdadeiro e a de negativos verdadeiros:

| Corte | Testes positivos (VP+FP) | VPP | Testes negativos (VN+FN) | VPN |
|---|---:|---:|---:|---:|
| A | 142 | 76/142 = **53,5%** | 58 | 54/58 = **93,1%** |
| B | 98 | 68/98 = **69,4%** | 102 | 90/102 = **88,2%** |
| C | 54 | 48/54 = **88,9%** | 146 | 114/146 = **78,1%** |

Por que o VPP aumenta do corte A para C? Porque ao exigir marcador mais elevado, o teste reduz fortemente os falsos positivos, ainda que também perca verdadeiros doentes. Isso faz com que, **entre os poucos que testam positivo**, maior fração seja de casos verdadeiros no exemplo.

Por que o VPN diminui? Porque alguns doentes que antes testavam positivo agora passam a negativo, aumentando o número de falsos negativos entre os negativos. Isso é uma propriedade deste conjunto fictício, não uma garantia de monotonicidade perfeita do VPN em qualquer estudo.

**Atenção à validade externa:** a prevalência de 40% foi escolhida só para ilustrar contas. Se outro ambulatório tiver proporção muito inferior de doentes e diferente espectro de condições, a distribuição de resultados e os valores preditivos podem mudar. Não importar o VPP de 88,9% como “o VPP do teste” sem contexto.

## 8. Ponto de corte para rastreamento versus confirmação

O raciocínio deve começar pela finalidade pretendida, e não pelo número que parece mais elegante:

**Triagem:** quando perder caso é perigoso e existe via de confirmação, pode ser aceitável escolher corte sensível com maior número de falsos positivos, desde que os danos associados sejam proporcionais e o fluxo da rede suporte a confirmação.

**Confirmação:** quando positivo desencadeia tratamento agressivo, isolamento prolongado ou procedimento invasivo, é relevante minimizar falsa positividade, às vezes exigindo combinação com padrão de referência antes de iniciar a intervenção definitiva.

**Monitoramento longitudinal:** acompanhar tendência de marcador ao longo do tempo requer precisão analítica, estabilidade biológica e interpretação de mudança intraindividual; não é automaticamente o mesmo problema que comparar duas populações e escolher limiar de positivo/negativo.

**Triage assistencial:** limiares para priorizar atendimento podem refletir risco de deterioração, necessidade de avaliação rápida e capacidade do serviço, mesmo quando o escore não constitui exame confirmatório de uma doença.

Em cada caso, deve-se registrar o corte escolhido, justificativa clínica, população-alvo, acesso à confirmação, desempenho por subgrupos e o que fazer diante de valores limítrofes ou inválidos.

## 9. Análise de curva de decisão e benefício líquido

A avaliação estatística de discriminação pode ser complementada por análise de decisão. Vickers e Elkin (2006) propuseram a **decision curve analysis (DCA)**, que relaciona benefício líquido de estratégias a diferentes probabilidades-limiar para intervir. A lógica é que falsos positivos e falsos negativos possuem consequências diferentes, que variam segundo preferências, riscos e benefícios.

Uma formulação comum do **benefício líquido** é:

**NB = VP/N − (FP/N) × [pₜ/(1−pₜ)]**

onde N é o total de pessoas e pₜ é a **probabilidade-limiar clínica** na qual o benefício esperado de intervir e o dano de intervir desnecessariamente se equilibram no modelo assumido. O termo pₜ/(1−pₜ) pondera o prejuízo de falso positivo segundo esse balanço.

A medida não significa que a estratégia produzirá aquela proporção de vidas salvas. Ela expressa benefício ponderado **sob as suposições sobre consequências de decisão**. Em alguns estudos, é possível compará-la com estratégias “intervir em todos” e “intervir em ninguém”, avaliando se o teste acrescenta utilidade no intervalo relevante de probabilidades.

### 9.1. Exemplo numérico puramente ilustrativo

No corte B, N=200, VP=68 e FP=30. Se a probabilidade-limiar de uma decisão teórica fosse pₜ=20%, a ponderação seria 0,20/0,80=0,25.

**NB(B) = 68/200 − (30/200)×0,25 = 0,340 − 0,0375 = 0,3025.**

No mesmo conjunto e sob as mesmas premissas, “intervir em todos” produziria NB = 80/200 − (120/200)×0,25 = 0,250; “intervir em ninguém” produziria NB = 0. Assim, o corte B teria maior benefício líquido nesse **exemplo construído**.

A conta não demonstra adequação clínica real do exame, porque as utilidades, o horizonte de tempo e o efeito dos tratamentos não foram estimados a partir de pacientes. Sua função é mostrar que **um peso clínico dos erros** pode mudar a comparação de estratégias.

### 9.2. Por que benefício líquido não é sinônimo de AUC

AUC descreve a discriminação global; NB depende de classificação/decisão e da troca entre falsos positivos e verdadeiros positivos em um ponto de decisão. Uma estratégia com AUC ligeiramente inferior pode oferecer maior benefício clínico em intervalo relevante de risco se tiver erros mais toleráveis ali. Também é possível que nenhuma estratégia supere, de forma relevante, a conduta usual quando o impacto sobre desfechos e custos é considerado.

**Pulo do Gato:** não confundir “probabilidade-limiar para decidir tratar” com “limiar numérico bruto de um exame de laboratório”. Só coincidem quando a regra está calibrada e definida na mesma escala probabilística para aquela decisão.

## 10. Comparação de duas curvas: pareamento, precisão e relevância

Dois testes podem ser avaliados nos **mesmos pacientes**, caso em que a comparação é pareada, ou em grupos diferentes, caso em que são necessários outros cuidados com seleção e confusão. A diferença de AUC precisa de intervalo de confiança e análise apropriada. Uma diferença estatisticamente significativa não garante vantagem clínica, especialmente se ocorrer em limiares que jamais seriam adotados.

Se duas curvas se cruzam, não existe necessariamente “um vencedor” independente da faixa de operação. Analise o desempenho na região de sensibilidade/especificidade necessária para a finalidade. Em contextos altamente específicos, uma **AUC parcial**, calculada na região clinicamente relevante e adequadamente definida, pode fornecer informação adicional; ainda assim, a escolha deve ser interpretada com consequências clínicas e transparência sobre região selecionada.

**Erros que invalidam comparação:** selecionar um corte na amostra de teste após observar resultados e apresentá-lo como predefinido; usar referências diferentes sem justificar; misturar aparelhos e versões; comparar AUC de populações com espectros muito distintos como se estivessem sob as mesmas condições; ou ignorar resultados indeterminados.

## 11. Casos clínicos comentados

### Caso 1 — Triagem de risco e ponto de corte

**Apresentação:** um serviço utiliza marcador fictício para identificar condição potencialmente grave antes de confirmação. O conjunto de validação contém 80 doentes e 120 não doentes. Há duas possibilidades: A (sensibilidade 95%, especificidade 45%) e C (sensibilidade 60%, especificidade 95%).

**Dados relevantes:** no corte A, quatro doentes testam negativo; no C, trinta e dois doentes testam negativo. A é associado a 66 falsos positivos, C a seis.

**Hipótese e raciocínio:** se a finalidade é uma triagem inicial com via de confirmação confiável e o dano de perder casos é muito alto, A pode se adequar melhor. Mas não basta repetir “quanto mais sensível melhor”: é necessário considerar capacidade da rede e dano de 66 falsos positivos.

**Exames complementares:** método de referência nos positivos e avaliação de protocolo de segurança para negativos de alto risco, conforme doença real.

**Conduta:** decidir com comitê clínico/assistencial após definir risco e logística, e não prescrever o corte baseado em estética de ROC. **Por que importa:** ponto de corte é uma decisão clínica disfarçada de número.

### Caso 2 — Alto Youden, mas escolha clínica diferente

**Apresentação:** pesquisa mostra Youden J = 0,40 no corte A, 0,60 no B e 0,55 no C.

**Dados:** B maximiza o índice. Um gestor pretende usá-lo como padrão em todos os serviços.

**Raciocínio:** Youden não pondera separadamente o custo humano e financeiro dos diferentes erros. É adequado como critério resumido quando a ponderação implícita faz sentido, não como mandamento universal.

**Decisão e seguimento:** o protocolo para rastreamento pode privilegiar sensibilidade, enquanto cenário de confirmação com tratamento de alto risco exige outro balanço. A validação deve definir limiar antes de uso assistencial.

**Por que importa:** a prova pode perguntar “maior Youden”; a prática exige uma pergunta adicional: “para qual consequência?”.

### Caso 3 — AUC alta e risco mal calibrado

**Apresentação:** software fictício reporta AUC de 0,92, mas fornece risco de 80% a um grupo cuja frequência observada da condição é 30%, em avaliação externa.

**Hipótese:** boa discriminação aparente pode coexistir com calibração inadequada. O número 0,92 não significa que 92% dos positivos estão doentes, e o risco previsto de 80% não deve ser utilizado sem avaliar transportabilidade.

**Exames e interpretação:** conferir definição do desfecho, horizonte temporal, subgrupos, distribuição dos escores, curva de calibração e intervalos de incerteza.

**Conduta:** não converter automaticamente escores em decisões terapêuticas invasivas até revisar calibração e aplicação no cenário real. **Por que importa:** o algoritmo pode ordenar pessoas corretamente e ainda fornecer probabilidades ruins.

### Caso 4 — Validação vazada de um classificador

**Apresentação:** equipe diz ter AUC de 0,99 para classificar imagens, mas distribuiu imagens de um mesmo paciente entre conjuntos de treinamento e teste.

**Raciocínio:** o modelo pode ter reconhecido características específicas do paciente, do aparelho ou da captura em vez de generalizar para pessoas novas. Trata-se de possível vazamento de dados, reduzindo credibilidade da avaliação.

**Exames/avaliações:** implementar separação no nível do paciente e, quando apropriado, da instituição ou do tempo; repetir avaliação externa com padrão de referência adequado, controle de subgrupos e documentação STARD-AI.

**Conduta:** manter supervisão e não divulgar o desempenho como validação externa independente. **Por que importa:** AUC extrema pode refletir falha de metodologia, não tecnologia milagrosa.

## 12. Questões autorais comentadas — padrão de residência

### Questão 1 — Eixos da curva ROC

Uma curva ROC de teste em que valores maiores indicam doença apresenta, no eixo X e Y, respectivamente:

A. Sensibilidade e prevalência.
B. 1−especificidade e sensibilidade.
C. VPP e VPN.
D. Especificidade e AUC.
E. Incidência e risco relativo.

**Gabarito: B.** ROC dispõe taxa de falso positivo (1−especificidade) no eixo horizontal e sensibilidade no vertical. **A incorreta:** prevalência não é eixo ROC. **C incorreta:** valores preditivos mudam com probabilidade pré-teste. **D incorreta:** AUC é a área da curva, não eixo. **E incorreta:** são medidas epidemiológicas distintas. **Mini-revisão:** cada ponto corresponde a corte e respectivas taxas entre doentes/não doentes.

### Questão 2 — O efeito de elevar o limiar

Num teste contínuo em que valores elevados indicam doença, elevar o corte de positividade tende a:

A. Aumentar sensibilidade e taxa de falso positivo.
B. Aumentar sensibilidade e especificidade ao mesmo tempo em todos os cenários.
C. Reduzir sensibilidade e aumentar especificidade.
D. Manter invariavelmente os quatro números da tabela 2×2.
E. Tornar a AUC igual ao VPP.

**Gabarito: C.** Com limiar alto, menos doentes e não doentes testam positivo: caem VP e FP, sobem FN e VN. **A incorreta:** corresponde em geral a baixar o corte. **B incorreta:** ignora troca usual; pode haver pontos discretos sem mudança, mas não ganho obrigatório simultâneo. **D incorreta:** células mudam conforme classificação. **E incorreta:** conceitos diferentes. **Mini-revisão:** a curva resume o conjunto de cortes possíveis.

### Questão 3 — AUC de 0,90

Assumindo marcador que tende a ser maior em doentes, sem empates, AUC de 0,90 pode ser interpretada como:

A. Noventa por cento de todos os positivos são doentes.
B. O teste é 90% sensível em todo corte.
C. Noventa por cento dos participantes têm diagnóstico correto em qualquer corte.
D. Há aproximadamente 90% de probabilidade de um doente aleatório apresentar escore maior que um não doente aleatório, no contexto estudado.
E. O tratamento melhora a sobrevida em 90%.

**Gabarito: D.** É interpretação probabilística da discriminação por ordenação. **A incorreta:** confunde AUC com VPP. **B incorreta:** sensibilidade varia por corte. **C incorreta:** acurácia global é outra medida. **E incorreta:** AUC não mede benefício terapêutico. **Mini-revisão:** discriminação não é calibração nem utilidade.

### Questão 4 — Índice de Youden

Sensibilidade/especificidade dos cortes A, B e C são, respectivamente: A = 95%/45%, B = 85%/75%, C = 60%/95%. O corte que maximiza Youden e a ressalva correta são:

A. A; esse corte minimiza obrigatoriamente a mortalidade.
B. C; especificidade sozinha é o índice de Youden.
C. B; porém a escolha clínica final depende do custo e da consequência dos erros.
D. A e C; todos os índices são iguais.
E. B; garante VPP acima de 95% em qualquer prevalência.

**Gabarito: C.** J(A)=0,40; J(B)=0,60; J(C)=0,55. **A incorreta:** índice máximo não significa benefício clínico. **B incorreta:** J soma sensibilidade e especificidade menos um. **D incorreta:** resultados diferem. **E incorreta:** VPP depende também de frequência da doença. **Mini-revisão:** Youden é critério matemático, não medida universal de dano.

### Questão 5 — Benefício líquido e consequência clínica

Diante de dois modelos com AUCs semelhantes, a equipe avalia benefício líquido considerando limiares de decisão e danos de falso-positivos. Isso é importante porque:

A. AUC já inclui diretamente todos os efeitos adversos de tratamentos.
B. Uma estratégia só tem utilidade se exibir AUC de exatamente 1.
C. VPP não pode ser calculado em nenhum cenário.
D. O benefício clínico depende de consequências da decisão, não apenas da capacidade de separar grupos.
E. Benefício líquido e risco relativo são sinônimos.

**Gabarito: D.** Métodos de decisão incorporam ponderação dos danos em limiares relevantes sob suposições explícitas. **A incorreta:** AUC não expressa diretamente riscos do tratamento. **B incorreta:** testes imperfeitos podem ser úteis. **C incorreta:** VPP é calculável com 2×2 e contexto. **E incorreta:** são constructos diferentes. **Mini-revisão:** discriminar pessoas é meio; melhorar cuidado é finalidade.

### Questão 6 — Vazamento e avaliação externa

Um classificador de imagens tem AUC interna muito alta, mas imagens do mesmo paciente aparecem no treino e no teste. A melhor interpretação é:

A. AUC interna prova generalização para populações totalmente novas.
B. Há risco de vazamento; separar dados por paciente e realizar avaliação externa antes de atribuir desempenho aplicável.
C. O padrão de referência é desnecessário para qualquer avaliação de acurácia.
D. O algoritmo é automaticamente melhor que todo avaliador humano.
E. AUC alta certifica calibração perfeita.

**Gabarito: B.** Sobreposição de pessoas ou sinais aprendíveis entre conjuntos pode inflar desempenho, exigindo metodologia de validação apropriada. **A incorreta:** validação interna comprometida não garante transportabilidade. **C incorreta:** o desfecho de referência é fundamental. **D incorreta:** comparação empírica não foi demonstrada. **E incorreta:** discriminação não é calibração. **Mini-revisão:** separar por paciente, grupo, tempo ou serviço conforme o uso pretendido.

## 13. Quadros de revisão, visualizações propostas e pulo do gato

**Resumo em dez decisões:**
1. Identificar se valores mais altos indicam maior chance da doença.
2. Especificar o corte e quais valores contam como positivos.
3. Calcular 2×2 no corte específico.
4. Formar coordenada ROC (FPR; sensibilidade).
5. Reconhecer a troca entre sensibilidade e especificidade ao mudar limiar.
6. Diferenciar AUC de VPP, sensibilidade, acurácia global e calibração.
7. Considerar ICs, desenho de validação e espectro.
8. Desconfiar de “melhor corte” escolhido depois de testar repetidamente as mesmas pessoas.
9. Ajustar decisão a finalidade (triagem, confirmação, risco de intervir).
10. Verificar impactos assistenciais antes de adotar tecnologia no SUS ou instituição.

**Dez figuras autorais candidatas**, sem imagens incorporadas nesta etapa: distribuições sobrepostas do marcador em doentes/não doentes; linha de corte deslocável A/B/C; gráfico ROC com pontos (0,0)–C–B–A–(1,1); sombreamento de área trapezoidal; comparação entre AUC e VPP; tabela com cálculo de Youden; gráfico de VPP/VPN por corte no exemplo; fluxograma de escolha clínica do limiar; comparação entre discriminação e calibração; fluxograma de prevenção de vazamento treino/teste. Diagramas devem ser produzidos com eixos legíveis e texto alternativo antes de submissão ao Admin.

**Pulo do Gato LURIA:** *AUC informa ordenação global. Ponto de corte define o par sensibilidade/especificidade. Prevalência transforma esses índices em valores preditivos. Calibração verifica probabilidades previstas. Utilidade clínica depende do que acontece após a decisão.*

## 14. Referências verificáveis

1. Altman DG, Bland JM. *Diagnostic tests 3: receiver operating characteristic plots*. BMJ. 1994;309:188. https://doi.org/10.1136/bmj.309.6948.188.
2. Fawcett T. *An introduction to ROC analysis*. Pattern Recognition Letters. 2006;27(8):861–874. https://doi.org/10.1016/j.patrec.2005.10.010.
3. Vickers AJ, Elkin EB. *Decision curve analysis: a novel method for evaluating prediction models*. Medical Decision Making. 2006;26(6):565–574. https://doi.org/10.1177/0272989X06295361.
4. Bossuyt PM et al. *STARD 2015: An Updated List of Essential Items for Reporting Diagnostic Accuracy Studies*. BMJ. 2015;351:h5527. https://doi.org/10.1136/bmj.h5527.
5. Ministério da Saúde/Conitec. *Diretrizes metodológicas: elaboração de revisão sistemática e metanálise de estudos de acurácia diagnóstica*. https://www.gov.br/conitec/pt-br/midias/artigos_publicacoes/diretrizes/revisao_sistematica_metanalise_estudos_acuracia_diagnostica.pdf.
6. Sounderajah V et al. *The STARD-AI reporting guideline for diagnostic accuracy studies using artificial intelligence*. Nature Medicine. 2025;31:3283–3289. https://doi.org/10.1038/s41591-025-03953-8.

Os valores do exemplo de 200 pessoas, suas coordenadas, a área trapezoidal, os casos e os enunciados das questões foram criados pela LURIA como recursos pedagógicos e não representam dados reais de qualquer artigo citado.

## 15. Auditoria editorial e científica ainda necessária

**Presentes nesta primeira etapa:** estrutura coerente com a aula 095, raciocínio sobre pontos de corte, contas manuais de três limiares, ROC, aproximação AUC por trapézios, Youden, VPP/VPN em diferentes cortes, distinção de calibração e discriminação, conceito de benefício líquido, comparação de testes, quatro casos clínicos e seis questões comentadas.

**Não verificado independentemente:** cálculos por segunda pessoa; referências completas em padrão editorial; qualidade clínica dos casos; funcionamento no renderer da plataforma; rotas, navegação, acessibilidade, visualização PWA e correspondência com imagens. O texto ainda precisa de aprofundamento metodológico e revisão por profissional familiarizado com epidemiologia clínica. A extensão bruta não equivale a 60 mil caracteres didáticos úteis.

**Status final desta etapa:** **RASCUNHO ORIGINAL NÃO PUBLICADO**. Preservar para expansão e avaliação, sem merge ou deploy.
