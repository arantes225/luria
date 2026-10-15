# LURIA — Apostila 101: Distúrbios ácido-base e interpretação sistemática da gasometria

**Lote editorial:** 5, tema 101 de 260 · **Área:** Clínica Médica e Medicina Intensiva · **Situação:** RASCUNHO ORIGINAL, NÃO APROVADO OU PUBLICADO · **Data de preparação:** 14/10/2026.

**Missão didática:** conduzir o aluno, sem pressupor domínio prévio, da fisiologia de CO₂–bicarbonato ao diagnóstico de distúrbios simples, compensação, distúrbios mistos e condutas dirigidas à causa. As fórmulas e casos são explicados no próprio manuscrito. Não converter diretamente exemplos em prescrições clínicas.

## 0. Auditoria inicial obrigatória — o que existia, o que foi lido e o que precisa ser corrigido

### 0.1. Relação com a biblioteca LURIA

O índice do Lote 5 identifica o tema **101 — Distúrbios ácido-base**. A inspeção prévia da listagem \`apostilas/\` não encontrou uma pasta publicada com esse título. Entretanto, a apostila **096 — Distúrbios hidroeletrolíticos** já apresenta aspectos de pH, osmolaridade, sódio, potássio e função renal. Este texto novo deve ser independente para explicar todos os conceitos acidobásicos fundamentais, mas **não deve repetir** a farmacoterapia detalhada dos eletrólitos que pertence à 096. O conteúdo anterior não foi apagado.

O modelo visual da apostila \`apostilas/amniorrexe-prematura/index.html\` foi efetivamente aberto. O manuscrito permanece Markdown no diretório \`_rascunhos/\`, sem alterar a aplicação publicada, o PWA ou o mecanismo central de imagens do Admin.

### 0.2. Etapa zero — benchmarking com documentos reais do Drive

**Material A — \`07 - GASOMETRIA ARTERIAL - PARTE 1.pdf\`.** Arquivo aberto e lido integralmente como texto (~6,7 mil caracteres). Aborda tampão CO₂/HCO₃⁻, pH, PaCO₂, bicarbonato, acidoses e alcaloses, fórmula de Winter e compensação respiratória. Problemas detectados: a compensação da **acidose respiratória crônica** foi descrita em um ponto como aumento de apenas 2 mEq/L de bicarbonato por 10 mmHg de CO₂; valores de referência e cálculos foram misturados; a fórmula de ânion gap foi impressa de modo inconsistente em um trecho. A apostila LURIA ensinará compensação crônica aproximada de **3,5–4 mEq/L por 10 mmHg** de aumento de PaCO₂, com referência atual independente.

**Material B — \`08 - GASOMETRIA ARTERIAL - PARTE 2.pdf\`.** Arquivo aberto e lido integralmente como texto (~8,9 mil caracteres). Aborda ânion gap corrigido por albumina, relação delta, acidose tubular renal, ânion gap urinário e cloro urinário na alcalose metabólica. Divergências identificadas: uso de denominadores 24 e 25 mEq/L em pontos diferentes, limiares rígidos de cloro urinário sem alerta de efeito de diuréticos e simplificação excessiva de interpretação do gap urinário. A redação LURIA esclarecerá dependência de laboratório, limitações e contexto clínico.

**Material C — \`06 - DIABETES - EMERGENCIAS HIPERGLICEMICAS (CAD E EHH).pdf\`.** Foi aberto e lido como complemento contextual, principalmente para interpretação de CAD, beta-hidroxibutirato, cetose e acidose. Os critérios antigos de CAD enfatizam glicemia >250 mg/dL e usam o ânion gap como critério de resolução; **não reproduzir isso como definição atual**: o consenso ADA/EASD 2024 adotou glicemia ≥200 mg/dL ou história prévia de diabetes, com cetose e acidose, e recomenda beta-hidroxibutirato como indicador central. Não copiar protocolo de insulina/fluido desse resumo sem validação vigente.

**Autoria:** esses três PDFs contêm marca de redistribuição educacional (“Medicina livre”), e não estabelecem vínculo institucional comprovado ao Estratégia MED. Foram utilizados exclusivamente para comparar abrangência, tópicos e lacunas; nenhuma figura, tabela ou trecho protegido foi reproduzido. Referências externas servem para correção e aprofundamento científico e estão discriminadas abaixo.

### 0.3. Fontes técnico-científicas para revisão

1. Gomes EB, Pereira HCP. **Interpretação de gasometria arterial.** *VITTALLE – Revista de Ciências da Saúde*. 2021;33(1):203–218. Universidade Federal do Rio Grande (Brasil). DOI 10.14295/vittalle.v33i1.11501. https://periodicos.furg.br/vittalle/article/view/11501. Artigo didático brasileiro, não protocolo nacional de medicamentos.
2. Morikawa MJ, Ganesh PR. **Acid-Base Interpretation: A Practical Approach.** *American Family Physician*. 2025;111(2):148–155 (versão corrigida). https://www.aafp.org/afp/2025/0200/acid-base-interpretation. Revisão sistemática de raciocínio diagnóstico, não guideline de administração de bicarbonato.
3. **Mixed Acid-Base Disturbances: Core Curriculum 2025.** *American Journal of Kidney Diseases*, 2025. https://www.sciencedirect.com/science/article/pii/S0272638625009072. Abordagem atualizada de compensações e processos mistos.
4. Umpierrez GE et al. **Hyperglycemic Crises in Adults With Diabetes: A Consensus Report.** *Diabetes Care*. 2024;47(8):1257–1275. DOI 10.2337/dci24-0032. https://pmc.ncbi.nlm.nih.gov/articles/PMC11272983/. Consenso ADA/EASD/JBDS/AACE/DTS sobre CAD/EHH em adultos.
5. Revisões de alta qualidade sobre acidose tubular renal, doenças respiratórias, terapia renal substitutiva e intoxicações serão incorporadas por subcapítulo, com a respectiva fonte; referências nacionais devem prevalecer quando disponíveis e verificáveis.

### 0.4. Matriz de cobertura

| Competência | Benchmark do Drive | Objetivo LURIA |
|---|---|---|
| Fisiologia CO₂–HCO₃⁻ | Resumo | Ensinar equação, pulmão, rim e tempo de compensação |
| Leitura da gasometria | Presente | Algoritmo em etapas, com ressalvas de exame venoso/arterial |
| Compensação | Parcial e uma discrepância | Fórmulas por distúrbio, exemplos e limites |
| Ânion gap | Parcial, notação errada num trecho | Fórmula correta, albumina e análise de causas |
| Distúrbio misto | Raso | Winter, delta gap e estados clínicos sobrepostos |
| Acidose tubular renal | Resumo | Fisiologia, formas, K e limitações de AG urinário |
| Alcalose metabólica | Cl urinário em corte rígido | Cl urinário como pista, reavaliado em contexto |
| Respiratórios crônicos | Insuficiente | Retenção e eliminação de CO₂, agudo x crônico |
| Intoxicações | Lista curta | Análise de osmol gap e evidência dirigida |
| CAD | Texto com cortes antigos | Critérios 2024 e separação entre diagnóstico e tratamento |
| Emergências | Fragmentário | Priorizar causa, ventilação/perfusão e riscos iatrogênicos |
| Casos/questões | Exemplos curtos | Situações sequenciais e questões de múltipla escolha |

## 1. Por que o pH é uma variável de vida ou morte

Enzimas, receptores, canais de membrana, metabolismo celular e atividade muscular dependem de um ambiente em que a concentração de íons hidrogênio se mantenha em intervalo estreito. O organismo não produz apenas “ácido” no estômago; o metabolismo gera CO₂ em grande quantidade e produz ácidos não voláteis que precisam ser tamponados e eliminados. Uma alteração no pH do sangue pode ser causa e consequência de doença grave.

Um **distúrbio ácido-base** é processo fisiopatológico que modifica bicarbonato, CO₂ ou ambos. **Acidemia** é o resultado de pH sanguíneo abaixo da referência usual, aproximadamente 7,35; **alcalemia**, pH acima de 7,45. **Acidose** e **alcalose** descrevem processos, mesmo se o pH final for normal por combinação de distúrbios opostos. Isso explica por que uma gasometria com pH 7,40 não garante normalidade: paciente com insuficiência respiratória crônica e vômitos pode apresentar acidose respiratória associada a alcalose metabólica.

### 1.1. Sistema tampão bicarbonato–CO₂

A sequência química relevante pode ser resumida por CO₂ + H₂O ⇌ H₂CO₃ ⇌ H⁺ + HCO₃⁻. O CO₂ produzido pelo metabolismo pode ser eliminado pelos pulmões; os rins regulam reabsorção de bicarbonato, excreção de H⁺ e produção de amônio, entre outros mecanismos. O equilíbrio depende de ambas as vias.

A forma clínica da equação de Henderson–Hasselbalch é:

**pH = 6,1 + log₁₀ { HCO₃⁻ / [0,03 × PaCO₂] }**, quando bicarbonato está em mEq/L e PaCO₂ em mmHg, utilizando aproximações válidas em condições usuais.

A mensagem mais importante não é decorar logaritmos: **pH depende de uma razão, não de um número isolado**. Aumentar bicarbonato tende a elevar pH; aumentar PaCO₂ tende a reduzi-lo. A queda de ambos na mesma proporção pode manter pH aparentemente normal, apesar de doença grave.

**Exemplo:** HCO₃⁻ de 24 mEq/L e PaCO₂ de 40 mmHg → razão 24/(1,2) = 20 e pH em torno de 7,40. Se o HCO₃⁻ cai a 12 mEq/L e PaCO₂ não muda, a razão é 10 e pH cai para aproximadamente 7,10. Se a ventilação aumenta e PaCO₂ cai para 24 mmHg, a razão sobe para 12/0,72 ≈16,7 e pH se aproxima de 7,32; a acidemia diminui por resposta respiratória, sem que a causa metabólica tenha necessariamente sido corrigida.

### 1.2. Defesa imediata, pulmonar e renal

**Tamponamento químico** ocorre quase imediatamente pela capacidade de proteínas, bicarbonato e outros sistemas de aceitar ou doar prótons. **Resposta respiratória** acontece em minutos a horas, alterando excreção de CO₂: uma acidose metabólica estimula ventilação e pode provocar respiração profunda, como na cetoacidose. **Resposta renal** é mais lenta, podendo exigir horas ou dias para grande ajuste de bicarbonato, especialmente em distúrbios respiratórios crônicos.

A diferença temporal define as regras de compensação. Em hipercapnia aguda, há aumento modesto do bicarbonato; em hipercapnia crônica, retenção renal é maior. Se uma pessoa com DPOC é intubada e a PaCO₂ é reduzida abruptamente à faixa normal, o bicarbonato retido não desaparece imediatamente, podendo surgir alcalemia pós-hipercápnica.

## 2. Gasometria como exame: o que ela mede e o que não mede

A gasometria arterial fornece pH, PaCO₂ e PaO₂ medidos, além de parâmetros calculados ou medidos conforme método, incluindo bicarbonato, excesso de base e saturação estimada/medida. O **bicarbonato da gasometria muitas vezes é calculado** por pH e PaCO₂; o CO₂ total do painel bioquímico é medida analítica que geralmente se aproxima de HCO₃⁻, mas pode diferir por amostra, processamento e alterações clínicas. Discrepância grande merece investigação de técnica, tempo e fonte da coleta.

**Gasometria venosa** pode ser útil para monitorar pH e bicarbonato em cenários específicos; porém a PvCO₂ não equivale numericamente à PaCO₂ em choque, hipoperfusão e situações variáveis. A gasometria venosa **não substitui PaO₂ arterial para avaliar oxigenação**. O estudante deve perguntar o tipo de amostra antes de aplicar fórmulas que exigem *Pa*CO₂.

### 2.1. Valores usuais aproximados em adulto ao nível do mar

| Variável | Referência aproximada | Interpretação |
|---|---|---|
| pH arterial | 7,35–7,45 | Resultado da razão HCO₃⁻/PaCO₂ |
| PaCO₂ | 35–45 mmHg | Ventilação alveolar relativa à produção de CO₂ |
| HCO₃⁻ | 22–26 mEq/L | Reserva/tampão metabólico e compensação |
| PaO₂ | Depende de idade, altitude e FiO₂ | Oxigenação, não diagnóstico isolado do processo ácido-base |
| Lactato | Dependente do método/laboratório | Risco de hipóxia/alteração metabólica; não prova isolada de choque |
| Excesso de base | Dependente do aparelho/método | Suporte para componente metabólico e tendência |

Esses intervalos são **referências, não limites universais**. Idade, gravidez, altitude, estado febril, ventilação mecânica e equipamentos mudam interpretação. A abordagem integra a gasometria com eletrólitos séricos colhidos em momento próximo, especialmente Na, Cl, K e albumina.

### 2.2. Armadilhas pré-analíticas

Amostra colhida de acesso com infusão contaminante, demora de processamento, bolha de ar, heparina excessiva ou identificação incorreta podem produzir leituras enganosas. Se pH, PaCO₂ e HCO₃⁻ não se relacionam fisiologicamente pela equação esperada, ou diferem drasticamente da situação clínica, verificar exame antes de definir diagnóstico raro. Não atrasar suporte de pessoa instável por preciosismo laboratorial.

## 3. Leitura em seis etapas — algoritmo original LURIA

**Etapa 1 — paciente e segurança.** Há choque, alteração de consciência, trabalho respiratório grave, arritmia, intoxicação ou insuficiência respiratória? Tratar prioridades ABC ao mesmo tempo que se interpreta o exame. A gasometria nunca autoriza ignorar hipoxemia ou instabilidade.

**Etapa 2 — olhar o pH.** Acidemia, alcalemia ou pH dentro da faixa usual? Registrar o valor exato, não apenas a etiqueta “normal”.

**Etapa 3 — identificar processo principal.** Se pH baixo e HCO₃⁻ baixo, acidose metabólica é candidata. Se pH baixo e PaCO₂ alta, acidose respiratória. Se pH alto e HCO₃⁻ alto, alcalose metabólica; se pH alto e PaCO₂ baixa, alcalose respiratória. Se ambos se modificaram de forma incompatível ou o pH está aparentemente normal apesar de valores extremos, suspeitar de processos mistos.

**Etapa 4 — avaliar compensação prevista.** Aplicar fórmula adequada para o *processo primário* e comparar observado a esperado. Se a PaCO₂ ou HCO₃⁻ estiver fora do intervalo de compensação, há provável distúrbio adicional, não “compensação perfeita”.

**Etapa 5 — calcular ânion gap quando há acidose metabólica**, preferencialmente considerando albumina, e avaliar delta/delta em contexto apropriado. Para alcalose metabólica, investigar cloro urinário e estado de volume. Para distúrbios respiratórios, avaliar cronologia e ventilação.

**Etapa 6 — procurar a causa e definir conduta/monitorização.** A interpretação que termina em “acidose mista compensada” sem reconhecer sepse, hipoperfusão, DPOC ou intoxicação é incompleta. O mecanismo e a gravidade determinam a intervenção, não apenas o pH.

### 3.1. Dois exemplos orientados

**Gasometria A:** pH 7,26; PaCO₂ 28; HCO₃⁻ 12. Acidemia e bicarbonato baixo indicam acidose metabólica. Winter: PaCO₂ esperada = 1,5×12 + 8 ±2 = 26 ±2, isto é, 24–28. PaCO₂ observada 28 → resposta respiratória aproximadamente apropriada. O processo ainda pode ser perigoso; verificar AG, lactato, cetonas, rim e perfusão.

**Gasometria B:** pH 7,20; PaCO₂ 49; HCO₃⁻ 18. Acidemia com HCO₃⁻ reduzido e PaCO₂ elevada. Para acidose metabólica com bicarbonato 18, seria esperada PaCO₂ de 1,5×18 +8 ±2 = 35 ±2. Como observada é 49, existe **acidose respiratória adicional**; dizer “está compensando” seria erro. O paciente pode ter hipoventilação por intoxicação, fadiga muscular, doença pulmonar ou alteração de consciência, necessitando avaliação urgente da ventilação.

## 4. Compensação: as equações e o que elas realmente permitem concluir

Uma compensação fisiológica busca diminuir o desvio de pH, mas não é tratamento da causa e não costuma normalizar completamente pH em distúrbio simples. As fórmulas são **estimativas**, não regras matemáticas perfeitas. É preciso saber qual variável está sendo prevista e comparar com valor medido.

| Distúrbio primário | Compensação esperada aproximada no adulto |
|---|---|
| Acidose metabólica | **Winter:** PaCO₂ = 1,5×HCO₃⁻ + 8 ±2 mmHg |
| Alcalose metabólica | PaCO₂ sobe ~0,6–0,7 mmHg para cada 1 mEq/L de aumento de HCO₃⁻ acima de 24; usar aproximações com cautela |
| Acidose respiratória aguda | HCO₃⁻ aumenta ~**1 mEq/L** por 10 mmHg de PaCO₂ acima de 40 |
| Acidose respiratória crônica | HCO₃⁻ aumenta ~**3,5–4 mEq/L** por 10 mmHg de PaCO₂ acima de 40 |
| Alcalose respiratória aguda | HCO₃⁻ diminui ~**2 mEq/L** por 10 mmHg de PaCO₂ abaixo de 40 |
| Alcalose respiratória crônica | HCO₃⁻ diminui ~**4–5 mEq/L** por 10 mmHg de PaCO₂ abaixo de 40 |

**Correção histórica documentada:** a Parte 1 do Drive informa um incremento aproximado de 2 mEq/L por 10 mmHg em acidose respiratória crônica, enquanto os currículos renais contemporâneos geralmente usam 3,5–4. **O texto do Drive não será reproduzido como regra válida.**

### 4.1. Acidose metabólica e Winter

**Exemplo 1:** HCO₃⁻ 10; esperado PaCO₂ = 15 + 8 = 23 ±2. Se PaCO₂ medida é 21–25, resposta aproximadamente apropriada. Se PaCO₂ medida é **34**, a ventilação está menos intensa do que deveria: acidose respiratória concomitante. Se PaCO₂ medida é **16**, há ventilação além da esperada, sugerindo alcalose respiratória associada.

**Exemplo 2:** pessoa com sepse, lactato alto, HCO₃⁻ 14 e PaCO₂ 23. Winter prevista = 29 ±2. A PaCO₂ menor do que o mínimo esperado é compatível com **alcalose respiratória concomitante**, que pode ocorrer em sepse e dor; não basta rotular como “compensação aumentada”. A investigação precisa manter foco no estado clínico.

### 4.2. Acidose respiratória: aguda ou crônica?

Considere PaCO₂ 60 mmHg, aumento de 20 em relação a 40. **Aguda:** HCO₃⁻ esperado ≈24+2=26. **Crônica:** HCO₃⁻ esperado ≈24+7 a 8=31–32. Um paciente com PaCO₂ 60 e HCO₃⁻ 33 pode ter hipercapnia crônica com compensação renal; se também estiver vomitando repetidamente, uma alcalose metabólica adicional pode elevar mais o bicarbonato.

Agora considere um paciente com DPOC e retenção crônica, que deteriora e sobe PaCO₂ de 60 para 85 em horas. O HCO₃⁻ renal não acompanhará imediatamente o aumento; a nova acidemia pode representar **acidose respiratória aguda sobre crônica**. A diferença temporal muda prioridade de suporte ventilatório.

### 4.3. Alcalose respiratória: hiperestimulação da ventilação

PaCO₂ 20 mmHg corresponde a redução de 20. Em **alcalose respiratória aguda**, HCO₃⁻ esperado ≈24−4 =20. Em contexto **crônico**, pode aproximar-se de 24−8 a 10 =14–16. A causa importa: gravidez costuma gerar redução de PaCO₂ por estímulo ventilatório, enquanto intoxicação salicílica pode combinar alcalose respiratória com acidose metabólica. Uma PaCO₂ baixa não significa necessariamente ansiedade.

### 4.4. Alcalose metabólica: por que fórmulas simplificadas têm limite

O PDF do Drive apresenta “PaCO₂ = HCO₃⁻ + 15”, que pode oferecer estimativa rápida em alguns casos, mas não é identidade fisiológica universal. Uma aproximação empregada em revisões é PaCO₂ prevista ≈ 40 + 0,6–0,7 × (HCO₃⁻ − 24), com tolerância clínica de alguns mmHg. Em HCO₃⁻ 36, isso sugere PaCO₂ aproximadamente 47–49. Se a PaCO₂ observada for **64**, existe hipoventilação maior do que a esperada e deve-se investigar acidose respiratória adicional. A PaCO₂ compensatória tem limites impostos por necessidade de oxigenação e fisiologia ventilatória.

**Pulo do gato:** classificar distúrbio misto significa identificar outra alteração primária quando a resposta observada **não é a esperada**, e não quando existem dois valores laboratoriais alterados — isso ocorre mesmo na compensação simples.

## 5. Ânion gap: a fórmula certa, a albumina e a interpretação

Plasma mantém eletroneutralidade, mas os painéis rotineiros medem apenas alguns íons. O **ânion gap (AG)** representa diferença entre cátions e ânions principais medidos e fornece pista sobre ânions não mensurados, sobretudo em acidose metabólica.

**AG = Na⁺ − (Cl⁻ + HCO₃⁻)**, usando concentrações próximas no tempo em mmol/L ou mEq/L. A notação é essencial: **não** é Na − (HCO₃ − Cl). A faixa de referência depende de método laboratorial, albumina e outros fatores; valores frequentemente ao redor de 8–12 mEq/L, mas o “12” universal é simplificação.

### 5.1. Exemplo com interpretação

Na 140; Cl 105; HCO₃⁻ 12. AG = 140 − (105+12) = **23 mEq/L**, acima de referência aproximada, sugerindo acúmulo de ânions não mensurados. O achado precisa de explicação clínica: lactato, corpos cetônicos, retenção de ânions na falência renal, determinados tóxicos, entre outros.

Na 138; Cl 115; HCO₃⁻ 13. AG = 138 −128 = **10 mEq/L**. Se acidemia acompanha esse padrão, considerar acidose metabólica hiperclorêmica/sem AG elevado. Diarreia com perda de bicarbonato, acidose tubular renal e grande carga de cloreto em fluidoterapia são exemplos. O padrão não exclui outra causa mista se há albumina baixa ou alterações temporais.

### 5.2. Corrigir por albumina

Albumina tem carga negativa e participa do AG basal. Em hipoalbuminemia, um AG aparentemente “normal” pode esconder ânions patológicos elevados. Uma correção didática frequente:

**AG corrigido ≈ AG medido + 2,5 × (4 − albumina em g/dL)**.

Paciente com AG medido 12 e albumina 2 g/dL: AG corrigido aproximado = 12+5 = **17**. Se existe acidemia, esse resultado muda a investigação; seria errado declarar “AG normal, excluir lactato ou cetose” sem levar em conta a albumina.

### 5.3. Causas de AG aumentado: um mapa que não é apenas sigla

**Cetoacidose:** deficiência relativa de insulina, redução de ingestão/alimentação, álcool e situações associadas a inibidores de SGLT2 podem aumentar cetonas ácidas. O predomínio de β-hidroxibutirato sobre acetoacetato modifica sensibilidade de tiras urinárias.

**Acidose láctica:** lactato pode aumentar por hipoperfusão, sepse, convulsões e diversas alterações de metabolismo/depuração. Lactato alto não prova automaticamente choque distributivo; sua interpretação é dinâmica e clínica.

**Uremia/insuficiência renal avançada:** diminuição da excreção de cargas ácidas e retenção de ânions. LRA pode coexistir com outra causa do AG, como acidose láctica e CAD; não atribuir tudo à creatinina elevada.

**Intoxicação/ingestão de tóxicos:** metanol, etilenoglicol e salicilatos são hipóteses importantes quando o caso sugere exposição, distúrbio misto, alteração visual, nefrotoxicidade ou AG elevado sem causa aparente. Medidas de osmolar gap são auxiliares e têm limitações: **osmolar gap normal não exclui intoxicação por álcool tóxico em fase tardia**, quando metabólitos ácidos já se acumularam.

### 5.4. Interpretação segura do osmolar gap

**Osmolar gap = osmolalidade medida − osmolalidade calculada.** A osmolalidade calculada pode usar 2×Na + glicose/18 + ureia/6, quando glicose e **ureia** estão em mg/dL. Fórmulas que usam **BUN** adotam divisor diferente (~2,8); trocar grandezas altera o resultado. A presença de etanol acrescenta osmóis e exige termo apropriado; não subtrair etanol da análise sem saber qual fórmula foi usada.

**Exemplo:** osmolalidade medida 330 mOsm/kg; calculada 298. Gap ≈32 mOsm/kg, que pode sugerir presença de osmóis não medidos, mas não identifica substância específica. Etanol, manitol, glicóis e particularidades laboratoriais são possibilidades; o quadro clínico, tempo de exposição, AG, toxicologia e suporte especializado determinam investigação e conduta.

## 6. Delta ratio: encontrar distúrbio metabólico adicional

Na acidose metabólica com AG elevado, pergunta-se se a elevação dos ânions não mensurados acompanha queda de bicarbonato na proporção aproximada esperada. A relação é:

**ΔAG/ΔHCO₃⁻ = (AG − referência basal) / (HCO₃⁻ basal − HCO₃⁻ observado)**.

Por convenção didática, podem-se usar AG basal 12 e HCO₃⁻ basal 24 mEq/L, quando adequados à referência e albumina. **É indispensável colocar parênteses e usar o denominador correto; os PDFs do Drive alternam 24/25 e apresentam notação abreviada ambígua.**

### 6.1. Interpretação aproximada, não sentença matemática

- **Delta baixo**: queda de bicarbonato maior que o esperado pela elevação do AG sugere acidose hiperclorêmica adicional.
- **Delta próximo de 1–2**: pode ser compatível com acidose de AG elevado sem processo metabólico adicional importante, dependendo da fisiopatologia.
- **Delta claramente >2**: sugere bicarbonato relativamente elevado e possível alcalose metabólica associada, ou bicarbonato elevado preexistente.

Não tratar os cortes como invariáveis de laboratórios distintos: albumina, função renal, momento da coleta, fluidos e secreções gastrointestinais influenciam valores. Se bicarbonato basal já era elevado por hipercapnia crônica, o delta ratio pode ser enganoso.

### 6.2. Exemplo com mistura ácida

Na 140, Cl 106, HCO₃⁻ 10 → AG 24; ΔAG 12; ΔHCO₃⁻ 14; razão ~0,86. É compatível com acidose de AG elevado e pode haver componente sem AG conforme clínica; o cálculo **não confirma sozinho** duplo distúrbio num valor limítrofe.

Se Na 140, Cl 104, HCO₃⁻ 20 → AG 16; ΔAG 4; ΔHCO₃⁻ 4; razão 1,0. O distúrbio precisa de causa, mas o delta não demonstra de forma convincente outro processo metabólico.

### 6.3. Exemplo com alcalose adicional

Na 140, Cl 92, HCO₃⁻ 22 → AG 26; ΔAG 14; ΔHCO₃⁻ 2; razão 7. Isso sugere aumento de ânions coexistindo com concentração de bicarbonato relativamente preservada; uma alcalose metabólica por vômitos ou diuréticos pode estar mascarando parte da acidose. Mesmo pH quase normal não exclui processo grave. A investigação da causa deve usar história, lactato, cetonas, função renal e cloro urinário quando adequado.

## 7. Acidose metabólica com AG normal: rins, intestino e cloreto

A acidose hiperclorêmica costuma envolver perda de bicarbonato, dificuldade renal de excretar ácido ou carga relativa de cloreto. O achado tem utilidade diagnóstica, mas a principal tarefa é reconhecer a causa e o risco clínico.

**Diarreia e outras perdas digestivas inferiores:** há perda de bicarbonato e frequentemente de potássio, com tendência a acidose metabólica de AG normal. **Acidose tubular renal (ATR):** o defeito é renal e depende de transporte tubular e metabolismo de amônio. **Soro fisiológico 0,9% em grandes volumes:** a carga de cloreto pode reduzir a diferença de íons fortes e contribuir para acidose hiperclorêmica, sobretudo em pacientes críticos.

### 7.1. Amônio urinário e ânion gap urinário

A excreção urinária de NH₄⁺ é resposta renal importante a uma carga ácida. Como nem todo laboratório mede amônio urinário diretamente, usam-se estimativas indiretas, entre elas:

**Ânion gap urinário = Na⁺ urinário + K⁺ urinário − Cl⁻ urinário.**

Um resultado negativo em paciente com acidose hiperclorêmica pode ser compatível com excreção apropriada de amônio como NH₄Cl, favorecendo perdas extrarrenais. Um resultado positivo/inadequadamente menos negativo pode sugerir resposta renal insuficiente, incluindo ATR. **Mas a estimativa falha quando o amônio acompanha ânions não cloreto** (p.ex. cetoânions), em alterações de volume importantes, excreção reduzida e contextos de diuréticos. Não diagnosticar ATR unicamente pela fórmula.

### 7.2. Formas de acidose tubular renal — fisiologia e potássio

**ATR distal (tipo 1):** defeito de acidificação distal, associado a urina inadequadamente alcalina em contexto de acidose, potencial hipopotassemia, nefrolitíase/nefromedular calcificada e causas autoimunes como Sjögren. A interpretação de pH urinário exige exclusão de bacteriúria urease-positiva e análise do contexto.

**ATR proximal (tipo 2):** deficiência de reabsorção proximal de bicarbonato; pode integrar disfunção tubular generalizada da síndrome de Fanconi, com perda urinária de fosfato, glicose apesar de glicemia normal, aminoácidos e outros solutos. O pH da urina varia conforme bicarbonato sérico e limiar de reabsorção; por isso não se define essa ATR como “sempre urina alcalina”.

**ATR tipo 4:** com frequência relacionada a deficiência ou resistência à aldosterona, manifesta **hipercalemia** e acidose metabólica de AG geralmente normal. O perfil é particularmente relevante no diabetes com hipoaldosteronismo hiporreninêmico e em uso de fármacos que interferem no sistema renina–angiotensina–aldosterona. A classificação mecanística exige mais que repetir o mnemônico “tipo 4 = K alto”.

### 7.3. Um paciente, duas interpretações possíveis

Pessoa com diarreia intensa, pH 7,27, bicarbonato 15, AG corrigido normal, K reduzido e urina com AG negativo tem resposta renal de excreção ácida potencialmente preservada: o mecanismo digestivo é plausível. Se, ao contrário, há fraqueza, calculose renal, acidose hiperclorêmica persistente sem diarreia, hipopotassemia e dados de acidificação renal inadequada, investigar ATR distal.

A conduta não é “corrigir o pH com bicarbonato em todos os casos”; envolve restaurar volemia se necessária, tratar a perda de bicarbonato, corrigir potássio e considerar reposição alcalina crônica em ATR confirmada, conforme nefrologia e protocolos.

## 8. Alcalose metabólica: perder H⁺ não explica tudo

A alcalose metabólica ocorre por aumento primário de bicarbonato plasmático, que pode resultar de perda de ácido gástrico, carga de álcalis, depleção de cloro, perda de K ou aumento de reabsorção renal de bicarbonato. **A alcalose precisa de fatores que a mantenham**, como redução do volume arterial efetivo, deficiência de cloro, hipopotassemia ou excesso mineralocorticoide; caso contrário, o rim poderia excretar o excesso de bicarbonato.

### 8.1. Papel do cloro urinário

O cloro urinário baixo, muitas vezes em torno de **<20 mmol/L** em diversas referências, pode apoiar alcalose por depleção de cloreto/volume efetivo (vômitos, sonda nasogástrica, diurético usado anteriormente). Valor mais alto pode aparecer em **diurético em atividade**, hiperaldosteronismo, síndromes tubulares e outras causas. Os resumos do Drive usam corte rígido de 15 mEq/L, que não é universal. A leitura correta considera **quando a amostra foi colhida**, se a pessoa tomou diurético e qual o estado volêmico.

### 8.2. Vômitos versus diuréticos versus mineralocorticoides

**Vômitos/aspiração gástrica:** perda de HCl reduz ácido, com depleção de cloro e contração de volume. Bicarbonato persiste elevado em parte porque rim retém sódio sob condições de volume e não consegue eliminar adequadamente bicarbonato sem cloreto disponível. Hipopotassemia agrava manutenção.

**Diurético de alça/tiazídico:** promove perdas urinárias de sal, ativação neuro-hormonal, maior secreção distal de K e H⁺ e alcalose; o cloro urinário muda conforme efeito farmacológico e tempo desde a última dose.

**Excesso mineralocorticoide:** hipertensão e hipopotassemia podem acompanhar maior secreção de K e prótons; investigação de aldosterona/renina depende de preparo, medicamentos e suspeita, não de um único cloro urinário.

### 8.3. Tratamento deve resolver a causa

Quando a alcalose é relacionada a cloro e hipovolemia, correção apropriada de volume/cloro e potássio pode ajudar, com cautela em insuficiência cardíaca e renal. Quando há congestão com necessidade contínua de diurético, infundir grande volume de salina pode ser perigoso; o plano requer outras estratégias e eventualmente ajuste medicamentoso específico. Em alcalose grave com ventilação prejudicada, arritmias ou alterações neurológicas, indicar avaliação especializada.

**Armadilha:** “bicarbonato alto” pode ser compensação da acidose respiratória crônica, e não alcalose metabólica primária. Comparar com PaCO₂ e a resposta prevista antes de decidir tratar bicarbonato isoladamente.

## 9. Acidose respiratória e hipoventilação alveolar

PaCO₂ aumenta quando a ventilação alveolar é insuficiente em relação à produção de CO₂. As causas incluem depressão central por opioides ou sedativos, obstrução pulmonar grave, fadiga dos músculos respiratórios, doenças neuromusculares, obesidade com hipoventilação, alterações da caixa torácica e ventilação mecânica inadequada. A PaO₂ pode cair, mas não é marcador isolado de acidose respiratória; FiO₂ e relação ventilação/perfusão influenciam oxigenação.

A **acidose respiratória aguda** produz queda rápida de pH porque os rins ainda não elevaram substancialmente bicarbonato. Em hipercapnia crônica, compensação renal pode tornar pH próximo do normal. No paciente com DPOC que tem PaCO₂ 65 mmHg, HCO₃⁻ 34 mEq/L e pH aproximadamente 7,34, a cronologia sugere compensação crônica; se passa a PaCO₂ 95 mmHg e pH 7,19, há deterioração aguda que exige avaliação imediata de ventilação e causa.

### 9.1. Quando a gasometria determina urgência

Alteração progressiva de consciência, respiração superficial, exaustão muscular, hipoxemia, acidemia importante e instabilidade podem indicar insuficiência respiratória e necessidade de suporte ventilatório. Em pacientes selecionados com exacerbação de DPOC e acidose hipercápnica, ventilação não invasiva pode ser considerada conforme critérios e contraindicações. Vômitos ativos, incapacidade de proteger a via aérea e choque mudam a segurança da modalidade.

Uma medida isolada de PaCO₂ de 60 mmHg não basta para indicar intubação ou alta: o paciente crônico compensado e estável difere daquele com aumento rápido, acidemia e alteração neurológica. A terapia visa a **ventilação e a causa**, não normalizar CO₂ abruptamente a qualquer custo.

### 9.2. Alcalose pós-hipercápnica

Quando a PaCO₂ cai rapidamente após ventilação de um paciente cronicamente hipercápnico, o bicarbonato retido pelos rins não reduz imediatamente. A razão HCO₃⁻/CO₂ pode elevar o pH e causar alcalemia; a resposta exige avaliar ventilação, volume, cloro, K, medicamentos e evolução. O erro é interpretar “pH alto” como prova de que ventilação excessiva sempre é benéfica.

## 10. Alcalose respiratória: hiperventilação não significa ansiedade

A queda primária de PaCO₂ ocorre quando a ventilação alveolar supera a produção de CO₂. A resposta pode ser apropriada diante de hipóxia, sepse, dor, febre, gestação ou embolia pulmonar, e pode ocorrer por ventilação mecânica acima da necessidade. Hiperventilação por ansiedade é diagnóstico possível, mas **não pode ser presumido antes de excluir causas perigosas compatíveis com a apresentação**.

A alcalemia pode modificar ligação do cálcio a proteínas, reduzindo cálcio ionizado e causando parestesias ou espasmo carpopedal mesmo quando o cálcio total não está intensamente alterado. Isso não autoriza ignorar uma embolia pulmonar ou sepse em paciente com formigamento e taquipneia.

**Exemplo:** pH 7,52, PaCO₂ 26, HCO₃⁻ 21 em paciente febril e taquipneica. A PaCO₂ diminuída sustenta alcalose respiratória aguda; investigar infecção, ventilação e oxigenação. Se há elevação de lactato e queda de bicarbonato além do previsto, considerar acidose metabólica associada. **O pH pode continuar alto mesmo com acidose séria coexistente.**

## 11. Cetoacidose diabética: reconhecer a atualização de 2024

A CAD é relevante para esta apostila por ilustrar acidose metabólica com AG elevado e mecanismos combinados: formação de corpos cetônicos, diurese osmótica, perdas de sódio/K/água, vômitos e ventilação de Kussmaul. **A explicação integral do manejo de CAD pertence também ao tema específico de endocrinologia**, mas o aluno da gasometria deve conseguir reconhecer, diferenciar de outras cetoacidoses e interpretar resposta.

O consenso **ADA/EASD/JBDS/AACE/DTS 2024** estabelece três componentes para CAD no adulto: **(D)** glicemia ≥200 mg/dL ou história prévia de diabetes, independentemente do valor atual; **(K)** cetonemia significativa, preferencialmente β-hidroxibutirato ≥3,0 mmol/L (ou cetonúria importante onde indisponível); e **(A)** acidose metabólica por pH <7,3 e/ou HCO₃⁻ <18 mmol/L. O quadro pode ocorrer com glicemia abaixo de 200 mg/dL, sobretudo em contextos como uso de inibidores de SGLT2, gestação e restrição alimentar.

Isso altera a leitura do PDF antigo do Drive, que colocava glicemia **>250 mg/dL** como condição geral e usava critérios antigos de cetonúria e resolução. O resumo é fonte de benchmark didático, não de uma regra que deve ser reproduzida sem atualização.

### 11.1. Cetonemia e urina: por que podem divergir

β-hidroxibutirato é o principal cetoácido de CAD e é recomendado para diagnóstico e acompanhamento da resolução. Testes urinários clássicos baseados em nitroprussiato detectam sobretudo **acetoacetato**, não β-hidroxibutirato. À medida que a CAD melhora e β-hidroxibutirato se converte em acetoacetato, a cetonúria pode permanecer positiva ou até parecer maior. **Cetonúria persistente, isoladamente, não prova que a CAD não melhorou.**

### 11.2. Ânion gap e resolução: uma mudança conceitual

O consenso de 2024 não recomenda o AG como critério primário para resolução de CAD quando se dispõe de β-hidroxibutirato: fluidoterapia com grande carga de cloreto pode produzir **acidose hiperclorêmica de AG normal** enquanto a cetose já resolveu. A resolução é avaliada por **β-hidroxibutirato <0,6 mmol/L** e pH venoso ≥7,3 ou HCO₃⁻ ≥18 mmol/L, integrando contexto clínico e glicemia. O AG ainda é útil para diagnóstico diferencial e monitorização onde cetonemia não está disponível, mas não substitui os parâmetros recomendados.

### 11.3. Bicarbonato na CAD: exceção, não rotina

A própria recomendação 2024 orienta **não administrar bicarbonato rotineiramente** na CAD: fluidos e insulina permitem corrigir o mecanismo predominante, e o bicarbonato pode causar hipopotassemia e outros eventos adversos. Considerar bicarbonato apenas em situações selecionadas de acidemia **muito grave, como pH <7,0**, conforme protocolo e monitorização especializada. Este manuscrito não fornece prescrição de bicarbonato, insulina ou K: concentrações, apresentações, pesos, rim e risco variam e exigem validação institucional.

**Pulo do gato:** um paciente pode ter **CAD com glicemia próxima da normalidade** e pH menos extremo por alcalose metabólica concomitante por vômitos. A ausência do enunciado clássico “glicose 500 e pH 7,05” não elimina a necessidade de dosar cetonas e interpretar o conjunto.

## 12. Distúrbios mistos: três situações muito cobradas

### 12.1. Sepse: acidose láctica com alcalose respiratória

Uma paciente com infecção grave pode ter hiperlactatemia/acidose metabólica e hiperventilação além da compensação apropriada. **Exemplo:** HCO₃⁻ 12, PaCO₂ 18, pH acidêmico ou quase normal. Winter prediz 26±2; PaCO₂ 18 é menor do que o esperado → **alcalose respiratória primária adicional**. A presença de pH relativamente preservado não descarta hipoperfusão e disfunção.

### 12.2. Salicilatos: hiperventilação e AG aumentado

Intoxicação por salicilatos pode estimular centro respiratório e gerar alcalose respiratória, enquanto ácidos acumulados contribuem para acidose metabólica de AG elevado. **Não esperar pH profundamente baixo para suspeitar**, pois processos podem neutralizar-se. Quadro clínico pode incluir zumbido, vômitos, hiperventilação, alteração de consciência e acidose metabólica evolutiva. É emergência toxicológica que exige consulta a centro especializado e protocolos específicos; intervenções como alcalinização urinária e hemodiálise têm indicações distintas, não devem ser ensinadas como receitas universais sem validação.

### 12.3. DPOC com diurético e vômitos: hipercapnia mais alcalose metabólica

Um paciente cronicamente hipercápnico já retém HCO₃⁻. Se usa diurético, tem perda de K e cloro e episódios de vômito, pode acumular bicarbonato adicional. **Exemplo:** PaCO₂ 60, HCO₃⁻ 40 e pH alcalêmico ou muito próximo da normalidade. A compensação crônica de hipercapnia de 60 esperaria HCO₃⁻ por volta de 31–32, não 40. Há provável alcalose metabólica associada. Tratar apenas “retenção de CO₂” ou apenas “bicarbonato alto” pode piorar ventilação ou volume; precisa identificar os dois mecanismos.

## 13. Casos clínicos comentados — versão inicial

### Caso A — Diarreia, bicarbonato baixo e resposta renal

Homem de 34 anos com diarreia abundante há três dias, fraqueza, K 3,1, Na 139, Cl 114 e HCO₃⁻ 14. Gasometria pH 7,28 e PaCO₂ 29. **Cálculo:** AG = 139−(114+14) = 11, sem aumento claro; Winter = 1,5×14 +8 ±2 = 29 ±2, resposta ventilatória coerente. **Hipótese:** acidose metabólica hiperclorêmica por perda digestiva de bicarbonato, com hipopotassemia. **Exames:** função renal, K/Mg, avaliação de perdas e desidratação; amostra urinária se etiologia não se esclarecer. **Conduta:** restaurar perfusão/hidratação conforme perdas, tratar causa, corrigir eletrólitos com segurança e monitorar. **Por que importa:** nem toda acidose precisa de bicarbonato IV; reconhecer mecanismo evita tratamento equivocado.

### Caso B — Gasometria “quase normal” e problema misto

Mulher de 56 anos, febre, suspeita de pneumonia e taquipneia. pH 7,40, PaCO₂ 22, HCO₃⁻ 13, Na 138, Cl 101; lactato aumentado. **Cálculo:** AG = 138−(101+13)=24. Winter para HCO₃⁻ 13 = 27,5 ±2; PaCO₂ 22 é mais baixa, revelando alcalose respiratória além da compensação. **Hipótese:** acidose metabólica de AG aumentado, possivelmente relacionada a lactato, + alcalose respiratória. **Conduta:** avaliação de sepse, perfusão, oxigenação e tratamento da causa; não rotular “gasometria normal”. **Por que importa:** pH normal pode esconder dois processos perigosos.

### Caso C — Doença pulmonar crônica e agudização

Paciente de 69 anos com DPOC conhecido, ventilação espontânea, pH 7,27, PaCO₂ 78, HCO₃⁻ 35, sonolência e uso de músculos acessórios. **Raciocínio:** PaCO₂ elevada com HCO₃⁻ aumentado sugere retenção crônica de bicarbonato, mas acidemia atual e deterioração clínica indicam componente hipercápnico agudo sobre crônico. **Exames:** oximetria/gasometria seriada, avaliação de infecção e outros precipitantes, eletrólitos e função renal. **Conduta:** suporte ventilatório e tratamento do gatilho em ambiente monitorizado, com decisão individualizada de VNI versus via aérea protegida. **Por que importa:** o número de CO₂ sozinho não decide segurança; tendência e estado mental são essenciais.

### Caso D — CAD euglicêmica associada a medicamento

Mulher com diabetes e uso de inibidor de SGLT2 procura emergência por vômitos, mal-estar e respiração profunda após dias de pouca ingestão. Glicose 174 mg/dL, pH 7,19, HCO₃⁻ 9 e β-hidroxibutirato 5,1 mmol/L. **Hipótese:** CAD euglicêmica possível, cumprindo história de diabetes, cetonemia e acidose. **Exames:** função renal, eletrólitos, glicemia/cetonemia seriadas, investigação de infecção e outras causas. **Conduta:** manejo em serviço apto a monitorar glicose, potássio, fluidos e insulina segundo consenso atual; suspender medicamento desencadeante conforme orientação. **Por que importa:** antiga regra “CAD requer glicemia >250” produziria falso negativo.

### Caso E — Alcalose metabólica com cloro baixo

Mulher de 45 anos apresenta vômitos persistentes, hipovolêmia clínica, K 2,9, Cl 87, bicarbonato 36, PaCO₂ 48 e pH alcalêmico. **Hipótese:** alcalose metabólica por perda gástrica de ácido/cloreto e depleção de volume/potássio. **Exames:** função renal, K/Mg, avaliação da causa dos vômitos e cloro urinário quando necessário para refinar hipótese. **Conduta:** tratar origem dos vômitos, corrigir volume/cloreto e K conforme função renal e monitorização, sem ignorar doenças associadas. **Por que importa:** a recuperação depende de remover mecanismos que mantêm bicarbonato, não apenas de “esperar o rim excretar”.

## 14. Questões originais — alternativas comentadas

### Questão 1 — Compensação pela fórmula de Winter

Em paciente com pH 7,21, HCO₃⁻ 12 e PaCO₂ 40 mmHg, qual leitura é a mais adequada?

A. Acidose metabólica adequadamente compensada.
B. Acidose respiratória isolada.
C. Acidose metabólica com componente de acidose respiratória.
D. Alcalose respiratória associada.
E. Gasometria normal em pessoa crônica.

**Gabarito: C.** Winter prevê 1,5×12+8 =26 ±2 mmHg; 40 é mais alta do que o esperado e indica hipoventilação relativa. **A incorreta:** PaCO₂ excede faixa compensatória. **B incorreta:** HCO₃⁻ de 12 evidencia processo metabólico. **D incorreta:** PaCO₂ não está abaixo do esperado. **E incorreta:** há acidemia. **Mini-revisão:** compare CO₂ medido com o previsto, não apenas com 35–45.

### Questão 2 — Ânion gap

Na 140, Cl 104 e HCO₃⁻ 12. O AG calculado é:

A. 12.
B. 16.
C. 24.
D. 36.
E. 256.

**Gabarito: C.** 140−(104+12)=24. **A incorreta:** confunde referência com resultado. **B incorreta:** erro aritmético. **C correta:** cálculo demonstra elevação. **D incorreta:** subtração inadequada. **E incorreta:** soma absurda das grandezas. **Mini-revisão:** parênteses corretos em Na − (Cl + HCO₃⁻).

### Questão 3 — Acidemia com pH aparentemente normal

Mulher com sepse tem pH 7,39, HCO₃⁻ 12 e PaCO₂ 20. O que melhor explica os dados?

A. Não há distúrbio porque pH está dentro do intervalo.
B. Acidose metabólica com alcalose respiratória além da compensação prevista.
C. Acidose respiratória isolada.
D. Alcalose metabólica isolada.
E. PaCO₂ baixa obriga diagnóstico de ansiedade.

**Gabarito: B.** Winter para HCO₃⁻ 12 prevê 26 ±2; 20 é menor, sugerindo alcalose respiratória associada. **A incorreta:** a razão pode mascarar processos opostos. **C incorreta:** CO₂ está baixo. **D incorreta:** bicarbonato está baixo. **E incorreta:** sepse pode estimular hiperventilação. **Mini-revisão:** pH normal não exclui distúrbio misto.

### Questão 4 — Correção do ânion gap por albumina

Paciente com AG medido 13 mEq/L e albumina 2 g/dL tem, usando coeficiente 2,5, AG corrigido aproximado de:

A. 8.
B. 11.
C. 13.
D. 18.
E. 25.

**Gabarito: D.** 13+2,5×(4−2)=18. **A/B incorretas:** não aplicam a direção da correção. **C incorreta:** ignora carga negativa da albumina. **D correta.** **E incorreta:** cálculo excessivo. **Mini-revisão:** hipoalbuminemia pode mascarar ânions não medidos.

### Questão 5 — Acidose respiratória crônica

Pessoa com hipercapnia estável há meses passa de PaCO₂ 40 para 60 mmHg. Qual bicarbonato seria aproximadamente compatível com compensação crônica isolada?

A. 16 mEq/L.
B. 24 mEq/L.
C. 26 mEq/L.
D. 31–32 mEq/L.
E. 44 mEq/L.

**Gabarito: D.** ΔPaCO₂ 20 produz aumento aproximado de 7–8 mEq/L de HCO₃⁻ em cronicidade. **A** sugere acidose metabólica adicional. **B** ignora compensação. **C** corresponde aproximadamente à fase aguda. **D correta.** **E** supera de longe o esperado. **Mini-revisão:** retenção renal em hipercapnia crônica é maior que no evento agudo.

### Questão 6 — CAD 2024

Paciente com diabetes, glicose 183 mg/dL, β-hidroxibutirato 5 mmol/L, pH 7,20 e HCO₃⁻ 11 pode apresentar:

A. Exclusivamente alcalose metabólica.
B. CAD descartada por glicose inferior a 250 mg/dL.
C. CAD euglicêmica, conforme consenso atual, se achados e contexto forem compatíveis.
D. Ausência de cetose porque não há glicose >600.
E. Diagnóstico definitivo de SIAD.

**Gabarito: C.** História de diabetes, cetonemia e acidose sustentam o diagnóstico sem exigir glicose >250. **A incorreta:** pH indica acidemia. **B incorreta:** corte antigo não é universal. **D incorreta:** cetonemia está elevada. **E incorreta:** não corresponde ao quadro. **Mini-revisão:** glicemia normal ou moderadamente elevada não exclui CAD com SGLT2.

## 15. Plano de recursos visuais — candidatas, não imagens aprovadas

Para que o ensino não se reduza a uma parede de texto, as seguintes **12 candidatas** poderão ser pesquisadas ou produzidas após aprovação técnica e de licença no Admin. Nesta etapa nenhuma imagem de terceiro foi inserida no HTML:

1. Curva autoral de relação PaCO₂–bicarbonato–pH usando casos do capítulo 1.
2. Fluxograma original de seis etapas para leitura da gasometria.
3. Exame gasométrico sintético e anonimizado com identificação de variáveis.
4. Gráfico de compensação aguda versus crônica na hipercapnia.
5. Quadro visual original de Winter com casos de mistura.
6. Infográfico original de AG com e sem correção por albumina.
7. Gráfico de delta ratio aplicado a dois casos clínicos.
8. Fluxograma original de acidose hiperclorêmica: intestino versus rim.
9. Diagrama autoral de túbulo proximal, distal e ação da aldosterona.
10. Fluxograma de alcalose metabólica e cloro urinário por contexto clínico.
11. Quadro de CAD 2024 comparado aos critérios de materiais antigos, sem cópia de figura protegida.
12. Mapa conceitual de três distúrbios mistos: sepse, salicilatos e DPOC com diuréticos.

Diagramas autorais devem ser revisados clinicamente. Para resultados de gasometria reais, confirmar licença editorial, anonimização e valor didático. **Apenas o fluxo do Admin poderá aprovar e disponibilizar imagens.**

## 16. Pendências para atingir o padrão final do lead_apostilas

- Ampliar fisiologia renal de secreção ácida/amoniogênese, equilíbrio de eletrólitos e efeitos de alterações rápidas de ventilação.
- Detalhar acidose láctica, intoxicações específicas e implicações de osmolar gap conforme tempo de ingestão.
- Expandir distúrbios respiratórios em ventilação mecânica, gravidez, doenças neuromusculares e idosos.
- Desenvolver algoritmo de bicarbonato e diálise com critérios e riscos, sem substituir protocolos brasileiros locais.
- Acrescentar casos sequenciais com resolução integral, exames seriados, pelo menos quatro questões complexas com misturas ácido-base e interpretações.
- Validar referências nacionais adicionais, esquemas terapêuticos aplicáveis no Brasil e corrigir qualquer desatualização.
- Consolidar textos sem repetição, medir caracteres didáticos úteis, produzir imagens e submetê-las à curadoria do Admin.
- Fazer revisão independente por clínico/nefrologista/intensivista, matriz de autossuficiência com âncoras internas, migração para renderer LURIA e inspeção desktop/PWA.

**Status:** manuscrito educacional em elaboração; doses e decisões práticas exigem protocolo de serviço e revisão clínica antes de publicação comercial.