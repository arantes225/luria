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

### 7.3. Amôniogênese renal: de onde surge o novo bicarbonato

É comum decorar que o rim “elimina H⁺”, mas essa frase não explica o mecanismo que permite suportar diariamente uma carga de ácidos não voláteis. O organismo filtra grande quantidade de bicarbonato e precisa **recuperar o HCO₃⁻ filtrado** para evitar perdê-lo na urina. Além disso, ao excretar ácido efetivamente, o rim deve **gerar bicarbonato novo** para repor o consumido ao tamponar a carga ácida metabólica.

As duas funções são relacionadas, porém distintas. **Recuperar HCO₃⁻ filtrado** evita perda de base já existente. **Excretar H⁺ como ácido titulável ou amônio (NH₄⁺)** contribui para excreção líquida de ácidos e geração efetiva de bicarbonato novo. O pH urinário sozinho não quantifica esses processos: é possível ter urina bastante ácida e, ainda assim, excretar pequena quantidade total de H⁺ se a produção ou excreção de amônio for inadequada.

**O mecanismo-chave ocorre no túbulo proximal.** O metabolismo da glutamina gera amônia/amônio e bicarbonato. No modelo fisiológico, a transformação completa de uma molécula de glutamina pode produzir **dois NH₄⁺ e dois HCO₃⁻**. O novo bicarbonato retorna ao sangue, enquanto o amônio precisa ser efetivamente eliminado na urina para haver ganho líquido. Se o amônio produzido retorna à circulação e é metabolizado no fígado, parte do benefício potencial é anulada. A alça espessa ascendente e o ducto coletor participam de reciclagem e transporte de NH₃/NH₄⁺.

Quando há acidose metabólica sustentada, o rim íntegro aumenta produção e excreção de amônio ao longo do tempo. Na **doença renal crônica**, a redução da massa funcional de néfrons pode limitar essa resposta. Em certas formas de **acidose tubular renal**, a insuficiência de produção, transporte ou secreção distal gera acidose mesmo antes de grande elevação da creatinina.

**O potássio não é mero espectador.** Hipercalemia pode inibir amôniogênese e contribuir para acidose hiperclorêmica, como na ATR tipo 4/hipoaldosteronismo funcional. Hipopotassemia pode aumentar produção renal de amônia, contribuindo para mudanças complexas no manejo ácido-base e na alcalose metabólica. O aluno precisa interpretar K sérico, aldosterona, medicamentos, função renal e diurese junto da gasometria.

**Fonte fisiológica para aprofundamento:** Weiner ID, Verlander JW. *Renal ammonia metabolism and transport*, Compr Physiol, 2013, DOI 10.1002/cphy.c120010, https://pmc.ncbi.nlm.nih.gov/articles/PMC4319187/ ; revisões recentes https://pubmed.ncbi.nlm.nih.gov/38448728/ .

### 7.4. Como decidir se a acidose hiperclorêmica é intestinal ou renal

**Primeiro confirmar:** bicarbonato baixo com AG sem aumento relevante após ponderar albumina, eletrólitos medidos próximos no tempo, exposição a fluidos ricos em cloreto e causa provável de acidose. Em paciente com lactato elevado e hipoalbuminemia, AG medido “normal” pode mascarar outra componente metabólica.

**Depois avaliar a resposta renal ao ácido:** na diarreia com perda intestinal de bicarbonato, a função renal preservada tende a elevar a excreção de NH₄⁺, frequentemente como NH₄Cl. Isso aumenta Cl⁻ urinário não acompanhado por Na⁺/K⁺ e pode tornar o **ânion gap urinário (Naᵤ + Kᵤ − Clᵤ)** negativo. Já em alguns defeitos renais de acidificação, a excreção urinária de amônio é inadequada e o ânion gap urinário pode ficar positivo ou pouco negativo.

**A armadilha:** o ânion gap urinário é uma *aproximação indireta* de amônio, não uma dosagem. Pode falhar se NH₄⁺ estiver associado a **ânions não cloreto** (como cetoânions), se houver grandes perturbações de sódio/volume, baixo fluxo, diuréticos ou interferências analíticas. Um resultado isolado não distingue automaticamente toda diarreia de toda ATR.

| Elemento | Perda digestiva de bicarbonato | Defeito renal de excreção de ácido | Cautela |
| --- | --- | --- | --- |
| História | Diarreia importante, ostomia, fístulas ou perdas intestinais | Doença tubular, autoimunidade, medicamentos, distúrbio mineralocorticoide | Medicamentos/volume podem alterar os dois cenários |
| Potássio | Muitas vezes baixo, mas variável | Tipo 1/2 frequentemente baixo; tipo 4 tende a alto | Não usar K isolado como diagnóstico |
| Amônio urinário | Tendência a resposta elevada se função renal preservada | Pode estar inadequadamente baixo | Medida direta é mais informativa quando disponível |
| AG urinário | Frequentemente negativo com NH₄Cl | Pode ser positivo ou pouco negativo | Só vale se os ânions urinários se comportarem como esperado |
| pH urinário | Pode ser ácido após compensação | Tipo 1 pode mostrar pH inadequadamente elevado | ATR tipo 4 pode manter urina ácida e, mesmo assim, excretar pouco amônio |

**Mini-caso numérico:** Na sérico 139, Cl 114, HCO₃⁻ 14 → AG sérico **11**. Com diarreia importante, função renal preservada e Na urinário 35, K urinário 20, Cl urinário 80, o AG urinário = 35+20−80 = **−25 mEq/L**. Isso é coerente com aumento de excreção de NH₄Cl, favorecendo perda extrarrenal de bicarbonato se não houver fatores de confusão. A PaCO₂ de 30 mmHg também é aproximadamente compatível com Winter: 1,5×14+8=29 ±2. A interpretação é fisiológica, não uma prova etiológica absoluta.

**Fonte metodológica:** Batlle et al., *Urinary Ammonium in Clinical Medicine*, Adv Kidney Dis Health, 2023, DOI 10.1053/j.akdh.2022.12.006, https://pubmed.ncbi.nlm.nih.gov/36868734/ .

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



## 16. Acidose láctica e perfusão: interpretar o lactato sem simplificações perigosas

O lactato resulta da redução de piruvato e participa do metabolismo normal; sua concentração reflete **produção, utilização e depuração**, não apenas disponibilidade absoluta de oxigênio. Ele pode aumentar em choque e hipoperfusão, mas também por catecolaminas endógenas/exógenas, convulsões, esforço muscular intenso, disfunção hepática, medicamentos e alterações metabólicas. Por isso, lactato elevado é marcador de risco e motivo para avaliação urgente, mas **não é prova isolada de sepse nem de metabolismo exclusivamente anaeróbio**.

A acidose láctica pode se manifestar com AG aumentado, bicarbonato baixo e ventilação compensatória, mas o pH pode ser normal em distúrbios mistos. **Lactato 5 mmol/L com pH 7,40** exige explicação fisiológica; não se descarta dano porque o pH está “normal”.

### 16.1. Perfusão, coleta e tendência

Analisar pressão, FC, perfusão periférica, consciência, diurese, oxigenação e possíveis fontes de choque. Em paciente com convulsão, uma elevação importante de lactato pode ter mecanismo e trajetória diferentes daquela de alguém com choque séptico progressivo. Uma amostra colhida durante garrote prolongado, atraso de processamento ou esforço intenso também pode afetar interpretação. Repetir lactato quando clinicamente indicado permite avaliar tendência, mas **normalização do lactato não substitui identificação e controle da causa**.

A interpretação deve distinguir **nível absoluto**, **variação ao longo do tempo** e **mecanismo**. Se lactato cai enquanto a perfusão melhora após tratamento apropriado, o dado pode ser favorável. Se permanece alto, procurar hipoperfusão persistente, disfunção de depuração, medicamentos, isquemia regional e outras etiologias.

### 16.2. Tratamento não é “corrigir lactato com bicarbonato”

O tratamento da acidose láctica por choque consiste em restaurar circulação adequada, oxigenação e controle da fonte, além de intervenções conforme etiologia. Bicarbonato isolado não produz controle hemodinâmico ou trata uma sepse. A administração de álcalis pode aumentar geração de CO₂, adicionar sódio e alterar cálcio ionizado e potássio. Portanto, só deve ser avaliada em cenários definidos e sob supervisão, não como resposta automática a qualquer pH abaixo de 7,30.

**Exemplo:** pessoa com infecção abdominal grave, PA 78/45 mmHg, lactato 6,4 mmol/L, HCO₃⁻ 13 e PaCO₂ 24. Winter prevista ≈27,5±2, próxima do limite inferior. A prioridade é reconhecer choque e iniciar ressuscitação, antimicrobianos e controle do foco conforme a causa, com monitorização de perfusão. Não basta anunciar “acidose metabólica compensada”.

## 17. Bicarbonato intravenoso e acidemia grave: onde há evidência e onde não há

A prescrição de bicarbonato costuma parecer intuitiva: se o pH está baixo, adicionar base deveria normalizá-lo. Mas o pH é efeito de um processo, e uma intervenção pode produzir consequências sobre sódio, CO₂, potássio e distribuição de líquidos. A discussão precisa identificar **qual acidose**, **qual grau de acidemia**, **qual função renal**, **qual estado circulatório** e **qual desfecho clínico se deseja modificar**.

### 17.1. O estudo BICARICU-2 e a interpretação correta

No estudo multicêntrico randomizado **BICARICU-2**, publicado no *JAMA* em 2025, foram estudados adultos criticamente doentes com **acidemia metabólica grave (pH ≤7,20) e LRA moderada a grave**, em 43 UTIs francesas. A comparação foi entre bicarbonato IV orientado a alvo de pH e manejo sem bicarbonato rotineiro. Entre os **627 pacientes analisados**, a mortalidade em 90 dias foi **62,1% no grupo bicarbonato** e **61,7% no controle** — sem evidência de redução significativa da mortalidade.

Um resultado secundário foi diferente: **terapia renal substitutiva até o dia 28 ocorreu em 35% versus 50%**, menor no grupo tratado com bicarbonato. Isso sugere que a intervenção pode reduzir a necessidade de diálise em determinadas condições, mas não autoriza concluir melhora de sobrevida. O estudo foi aberto, e as decisões de iniciar diálise podiam ser influenciadas pelo próprio aumento do pH, pois acidemia refratária é uma das indicações de terapia renal substitutiva. Também não se pode extrapolar esses resultados para CAD, intoxicação, crianças ou acidose leve sem evidência específica.

**Conclusão de prova:** “bicarbonato IV reduz mortalidade na acidose metabólica grave com LRA” é **afirmação incorreta** à luz do desfecho primário do BICARICU-2. “Pode reduzir uso de terapia renal substitutiva no cenário estudado” é interpretação mais fiel, sem torná-lo terapia obrigatória universal.

**Fonte:** Jung B et al. *Sodium Bicarbonate for Severe Metabolic Acidemia and Acute Kidney Injury: The BICARICU-2 Randomized Clinical Trial*. *JAMA*. 2025;334(22):2000–2010. DOI 10.1001/jama.2025.20231. https://jamanetwork.com/journals/jama/fullarticle/2840824.

### 17.2. Mecanismo dos efeitos adversos previsíveis

O bicarbonato reage com H⁺ para formar H₂CO₃, que gera CO₂ e água. O CO₂ precisa ser eliminado pela ventilação. **Em hipoventilação grave**, administrar grande carga de bicarbonato sem ventilação adequada pode elevar PaCO₂, de modo que a elevação do pH extracelular venha acompanhada de consequências intracelulares complexas. Também pode haver aumento do sódio sérico e da carga de volume, alteração de cálcio ionizado e **queda do potássio** por deslocamento.

Esses efeitos não significam que o bicarbonato nunca possa ser usado. Significam que **o benefício deve ser específico** e o tratamento deve prever monitorização clínica, gasométrica e eletrolítica.

### 17.3. Três cenários que não devem ser misturados

**CAD:** o consenso 2024 desaconselha bicarbonato de rotina; considerar apenas em acidemia muito grave, tipicamente pH <7,0, com protocolo especializado. O problema principal é cetoacidogênese, que exige insulina, fluidos, K e tratamento do desencadeante.

**Acidemia grave com LRA em UTI:** o BICARICU-2 encontrou menor uso de terapia renal substitutiva, mas **não reduziu mortalidade**. A escolha depende de quadro, comorbidades, capacidade ventilatória e balanço de riscos.

**Intoxicação por salicilatos:** bicarbonato pode ter finalidade de alcalinização sérica/urinária para alterar distribuição e eliminação do tóxico, mesmo que o pH não esteja dramaticamente baixo; essa é uma **indicação toxicológica** distinta e não deve ser confundida com “tratar todo AG elevado”.

### 17.4. Quando o rim precisa de suporte extracorpóreo

A terapia renal substitutiva pode ser necessária em acidemia grave **refratária ao tratamento da causa**, sobretudo com lesão renal significativa, hipercalemia ameaçadora, sobrecarga hídrica ou intoxicações dializáveis. O limiar exato envolve protocolo, tendência, sinais clínicos e recursos; não transformar uma creatinina ou um pH isolado em indicação universal, nem adiar tratamento de emergência enquanto se aguarda atingir número arbitrário.

## 18. Intoxicações, osmol gap e riscos de diagnóstico tardio

A associação “AG alto e osmol gap alto” pode sugerir ingestão de álcool tóxico, mas **não representa teste perfeito**. Após exposição recente a etilenoglicol ou metanol, pode haver presença de composto original que eleva osmolalidade sem ainda gerar acidose importante. Com o metabolismo, os ácidos se acumulam e o AG sobe enquanto o osmol gap pode cair. Portanto, **AG normal não exclui exposição inicial** e **osmol gap normal não exclui intoxicação tardia**.

### 18.1. Metanol

Metanol é metabolizado em substâncias tóxicas, especialmente formiato, que pode produzir acidose metabólica de AG elevado e toxicidade visual/neural. História de ingestão, alteração visual, cefaleia, sintomas neurológicos e quadro de acidose devem elevar suspeita. **Conduta conceitual:** estabilização, consulta urgente a centro de toxicologia e avaliação de antídoto que bloqueia álcool desidrogenase e de terapia extracorpórea nos casos indicados. Não esperar confirmação de concentração laboratorial quando a ameaça clínica é alta e a assistência especializada orienta tratamento.

### 18.2. Etilenoglicol

O metabolismo pode gerar ácidos e oxalato, com risco de acidose metabólica, hipocalcemia e lesão renal. A presença de cristais de oxalato de cálcio na urina é pista possível, **não requisito para confirmar**. Em paciente com AG elevado sem explicação, piora renal e história compatível, investigar tóxico e consultar equipe especializada urgentemente. O tratamento pode envolver antídoto e diálise segundo critérios específicos.

### 18.3. Salicilatos e indicação de diálise

Salicilatos são exemplo clássico de **alcalose respiratória associada a acidose metabólica de AG aumentado**. O paciente pode estar hiperventilando intensamente e manter pH quase normal. Em toxicidade grave, decisões são condicionadas por estado neurológico, oxigenação, pH, níveis de salicilato, função renal e resposta terapêutica, entre outros dados.

O grupo internacional **EXTRIP** recomenda terapia extracorpórea em intoxicação grave por salicilatos em situações como **alteração do estado mental, hipoxemia nova que exige oxigênio**, falha do tratamento convencional ou níveis muito elevados; também sugere em acidemia importante (por exemplo, pH ≤7,20, conforme critérios). A hemodiálise intermitente é a modalidade preferencial quando indicada. A concentração sanguínea não deve ser interpretada isoladamente de cronologia e quadro clínico.

**Fonte:** EXTRIP Workgroup, recomendações específicas para salicilatos, https://www.extrip-workgroup.org/salicylates. Não reproduzir as tabelas/figuras protegidas da entidade.

### 18.4. Lactato elevado não resolve a investigação toxicológica

Uma pessoa com acidose de AG aumentado pode ter lactato elevado por choque e também intoxicação; uma causa não exclui outra. Há interferências analíticas em determinados métodos de lactato, que podem gerar discrepância entre aparelhos em intoxicações específicas. O aluno deve reconstruir a cronologia e não fechar diagnóstico apenas pela primeira categoria disponível.

## 19. Gravidez, idosos e ventilação mecânica: a fisiologia altera a referência

### 19.1. Gestação e ventilação

Durante a gravidez, progesterona estimula ventilação, levando a **PaCO₂ fisiologicamente menor** que em adulto não gestante, com compensação renal pela redução de bicarbonato. Uma PaCO₂ de 40 mmHg, comum em não gestante, pode indicar **hipoventilação relativa** para a gestante, sobretudo diante de doença aguda. A interpretação precisa considerar trimestre, oxigenação, clínica e laboratórios de referência, sem transportar mecanicamente faixas de adulto não grávido.

Em gestante com dispneia, taquipneia ou cetose, investigar causas maternas urgentes e repercussão fetal conforme situação; não atribuir a alcalose respiratória e dispneia exclusivamente à fisiologia gestacional antes de avaliar sinais de alarme. A gestação também pode favorecer CAD com glicemias menos elevadas em determinados contextos.

### 19.2. Idoso com DPOC, diuréticos e reserva renal reduzida

Idosos podem acumular fatores de acidose e alcalose ao mesmo tempo: DPOC com retenção crônica de CO₂, diuréticos com perdas de cloro/K, insuficiência renal e hipoperfusão. Uma gasometria pode ser “parcialmente compensada” em termos aritméticos enquanto o paciente está com incapacidade de ventilar e alto risco. O julgamento de gravidade deve se apoiar em estado mental, sinais respiratórios, perfusão e trajetória.

### 19.3. Ventilação mecânica e ajuste de PaCO₂

A PaCO₂ responde à ventilação alveolar, dependente de volume corrente efetivo, frequência, espaço morto e produção de CO₂. Aumentar ventilação minuto pode reduzir PaCO₂, mas **não é apropriado ajustar ventilador apenas para normalizar CO₂ sem considerar lesão pulmonar e mecânica respiratória**. Em ARDS, estratégias de proteção pulmonar podem aceitar hipercapnia permissiva em contextos selecionados, com limites e contraindicações clínicas.

Em paciente com acidose metabólica importante, a hiperventilação espontânea pode ser **compensação crucial**. A indução de sedação/paralisia e intubação sem preparar ventilação que mantenha temporariamente a eliminação de CO₂ pode causar **queda abrupta de pH** e colapso hemodinâmico. Essa é consideração relevante em CAD grave e intoxicação por salicilatos; manejo requer equipe experiente e avaliação em ambiente de emergência.

### 19.4. Baixo pH não significa automaticamente intubação

A necessidade de via aérea avançada depende de proteção, ventilação, oxigenação, consciência, fadiga e trajetória. Uma acidose metabólica grave com compensação respiratória eficaz pode piorar após intubação mal planejada; por outro lado, paciente sonolento e hipoventilando pode precisar de suporte antes de deterioração. A gasometria é dado fisiológico fundamental, mas **não substitui exame e planejamento de ressuscitação**.

## 20. Casos clínicos avançados — do resultado ao plano

### Caso F — Intubação e perda da compensação

**Apresentação:** pessoa de 28 anos com CAD grave, pH 7,12, HCO₃⁻ 5 e PaCO₂ 15, com respiração profunda e rápida. Após medicação sedativa para procedimento, passa a ventilar pouco, com deterioração rápida do pH.

**Raciocínio:** Winter para HCO₃⁻ 5 prediz PaCO₂ ~15,5 ±2. A ventilação inicial era resposta compensatória apropriada; reduzir muito a ventilação aumentaria PaCO₂ e derrubaria pH. **Exames:** gasometrias e eletrólitos seriados, cetonemia, avaliação de perfusão. **Conduta:** equipe experiente decide segurança da via aérea, prepara suporte ventilatório que leve em conta alta demanda de ventilação e trata CAD por protocolo. **Por que importa:** sedar sem reconhecer hiperventilação compensatória pode provocar colapso.

### Caso G — Acidose metabólica com LRA: bicarbonato pode ajudar?

**Apresentação:** homem de 71 anos em UTI, com sepse tratada, LRA moderada a grave, pH 7,16, bicarbonato 12, congestão e balanço hídrico positivo. A equipe debate usar bicarbonato IV para evitar hemodiálise.

**Raciocínio:** BICARICU-2 sugere menor frequência de terapia renal substitutiva com bicarbonato em população específica, mas não redução de mortalidade. **Exames:** tendência de pH/CO₂, potássio, volume, função renal e gatilhos de diálise. **Conduta:** avaliação individual por UTI e nefrologia; corrigir causa e considerar benefícios/risco de carga de sódio e CO₂, não prescrever bicarbonato automaticamente com base só no pH. **Por que importa:** separar efeito em desfecho secundário de benefício de sobrevida.

### Caso H — Salicilato com pH normal

**Apresentação:** mulher de 40 anos com zumbido, vômitos, taquipneia e relato de ingestão excessiva de analgésico. pH 7,43, PaCO₂ 19, HCO₃⁻ 12, AG corrigido 26.

**Raciocínio:** Winter para HCO₃⁻ 12 prevê 26 ±2; PaCO₂ 19 é inferior, caracterizando alcalose respiratória adicional sobre acidose metabólica de AG aumentado. Padrão é clássico em intoxicação por salicilatos, mas requer confirmação clínica/laboratorial e exclusão de causas associadas. **Conduta:** centro de toxicologia, suporte e avaliação de alcalinização/terapia extracorpórea conforme gravidade. **Por que importa:** pH próximo do normal não é sinal de quadro benigno.

### Caso I — Hipoalbuminemia mascara AG

**Apresentação:** homem de 63 anos com cirrose e infecção, albumina 1,8 g/dL, Na 136, Cl 104, HCO₃⁻ 20. AG medido 12.

**Cálculo:** AG corrigido ≈12+2,5×(4−1,8)=17,5. **Raciocínio:** AG não corrigido aparenta normalidade, mas pode haver excesso de ânions não medidos; investigar lactato, perfusão, cetonas e outras causas conforme caso. **Conduta:** não concluir acidose hiperclorêmica pura apenas pelo gap não corrigido; tratar quadro clínico. **Por que importa:** albumina baixa altera o “normal” do AG.

### Caso J — Alcalose pós-hipercápnica na UTI

**Apresentação:** pessoa com DPOC e PaCO₂ cronicamente em 70 mmHg, bicarbonato habitualmente 36 mEq/L, recebe ventilação mecânica; nas horas seguintes a PaCO₂ cai para 39, mas o bicarbonato permanece elevado. pH sobe.

**Raciocínio:** CO₂ cai rápido; rim não excreta imediatamente a reserva adicional de bicarbonato. Uma alcalose pós-hipercápnica pode surgir, com riscos eletrolíticos e de ventilação. **Conduta:** avaliação da ventilação, ajustes seguros conforme fisiologia, correção de K/cloro e monitorização, sem tentar corrigir tudo com medicação isolada. **Por que importa:** intervalo de compensação renal é componente clínico, não apenas cálculo.

### Caso K — Perda intestinal de bicarbonato e função renal preservada

**Apresentação:** mulher de 44 anos com diarreia abundante há quatro dias, tontura ortostática e fraqueza. Gasometria arterial: pH **7,29**, PaCO₂ **30 mmHg**, HCO₃⁻ **14 mEq/L**. Eletrólitos séricos próximos da coleta: Na **139**, Cl **114**, K **3,2 mEq/L**; albumina preservada. Eletrólitos urinários de amostra adequada: Naᵤ **35**, Kᵤ **20**, Clᵤ **80 mEq/L**.

**Pergunta clínica:** há acidose metabólica simples, processo misto ou ATR? De que maneira o rim está respondendo à perda de base?

**Cálculo 1 — AG sérico:** 139 − (114+14) = **11 mEq/L**, compatível com acidose hiperclorêmica sem aumento expressivo do AG se a referência do laboratório for adequada.

**Cálculo 2 — compensação respiratória:** Winter = 1,5×14+8 = **29 ±2 mmHg**. PaCO₂ observada de 30 mmHg é coerente com compensação aproximada, sem evidência aritmética convincente de um distúrbio respiratório adicional.

**Cálculo 3 — AG urinário:** 35+20−80 = **−25 mEq/L**. Em contexto de diarreia e função renal preservada, isso é coerente com excreção aumentada de NH₄Cl e resposta apropriada à perda extrarrenal de bicarbonato. A hipótese principal é acidose metabólica hiperclorêmica por perdas digestivas, não ATR baseada apenas no pH.

**Exames e conduta:** avaliar sinais de hipovolemia, perfusão, função renal, K, Mg, história de medicamentos e causa da diarreia. Repor perdas e eletrólitos de forma monitorada e tratar a etiologia; repetir exames conforme gravidade e resposta. **Por que o caso importa:** mostra que ânion gap urinário negativo não mede amônio diretamente, mas pode ajudar na distinção entre perda digestiva e defeito tubular.

### Caso L — Cetoacidose tratada, cetonemia resolvida e bicarbonato ainda baixo

**Apresentação:** homem de 29 anos, internado por cetoacidose diabética, melhora clinicamente após tratamento protocolar. No retorno, apresenta glicose **178 mg/dL**, β-hidroxibutirato sérico **0,4 mmol/L**, pH venoso **7,32** e bicarbonato **17 mEq/L**. Na **139** e Cl **111 mEq/L**. Cetonúria semiquantitativa permanece positiva.

**Raciocínio:** AG = 139−(111+17) = **11 mEq/L**. A combinação de baixo bicarbonato e cloro relativamente alto pode decorrer de acidose metabólica hiperclorêmica durante recuperação, sobretudo após fluidoterapia rica em cloreto e excreção urinária de ânions cetônicos. A cetonúria positiva pode persistir porque a conversão de β-hidroxibutirato em acetoacetato altera o teste urinário.

**Critério contemporâneo:** o consenso conjunto de 2024 utiliza **β-hidroxibutirato <0,6 mmol/L** e **pH venoso ≥7,3 ou HCO₃⁻ ≥18 mmol/L** para resolução da CAD, integrado à situação clínica. Neste exemplo, o β-hidroxibutirato está baixo e o pH venoso atende ao critério, mesmo com bicarbonato 17 e cetonúria positiva. O AG não deve ser tomado como indicador primário de resolução quando cetonemia quantitativa está disponível.

**Conduta contextual:** antes da transição do tratamento, confirmar estabilidade, possibilidade de alimentação, eletrólitos, K, causa desencadeante e plano de insulina conforme protocolo. Não interromper conduta apenas porque o AG ficou normal; também não prolongar automaticamente o tratamento de CAD baseado somente na persistência da cetonúria. **Por que importa:** diferencia resolução bioquímica da cetose de normalização imediata de todas as variáveis ácido-base.

**Fonte:** consenso ADA/EASD/JBDS/AACE/DTS, *Diabetes Care* 2024, https://pmc.ncbi.nlm.nih.gov/articles/PMC11272983/ .

## 21. Questões avançadas — respostas explicadas em todas as alternativas

### Questão 7 — Intoxicação por salicilatos

Paciente com suspeita de intoxicação por salicilato tem pH 7,41, HCO₃⁻ 11, PaCO₂ 18 e AG elevado. Qual afirmação é mais adequada?

A. pH normal elimina distúrbios acidobásicos.
B. Acidose metabólica com alcalose respiratória adicional é hipótese forte.
C. PaCO₂ 18 é a compensação prevista de Winter.
D. Hipercapnia é causa de todos os achados.
E. Não há indicação de procurar centro de toxicologia.

**Gabarito: B.** Winter prevê ~24,5±2, acima do valor medido de 18. **A incorreta:** processos opostos podem normalizar pH. **B correta:** integra a discrepância. **C incorreta:** observado é menor que compensação prevista. **D incorreta:** PaCO₂ está baixa. **E incorreta:** suspeita é tempo-dependente e pode exigir tratamento especializado. **Mini-revisão:** salicilato = pensar na combinação AG elevado + alcalose respiratória.

### Questão 8 — Hiperventilação compensatória

Pessoa em CAD apresenta HCO₃⁻ 6 e PaCO₂ 16. Qual interpretação orienta segurança da via aérea?

A. A ventilação elevada é inútil e pode ser suspensa.
B. A PaCO₂ é compatível com compensação intensa; redução súbita da ventilação pode piorar acidemia.
C. A PaCO₂ baixa comprova ausência de acidose metabólica.
D. Toda CAD exige intubação.
E. O pH é desnecessário para qualquer decisão.

**Gabarito: B.** Winter prediz 17±2, aproximadamente compatível. **A incorreta:** ventilação é defesa fisiológica. **B correta.** **C incorreta:** HCO₃⁻ está gravemente baixo. **D incorreta:** intubação requer indicação clínica. **E incorreta:** gasometria completa e situação clínica importam. **Mini-revisão:** não abolir compensação respiratória sem plano seguro de ventilação.

### Questão 9 — BICARICU-2

Qual conclusão foi sustentada pelo resultado primário do BICARICU-2?

A. Bicarbonato IV reduziu mortalidade em 90 dias em pacientes com acidemia grave e LRA.
B. Bicarbonato IV não modificou significativamente mortalidade em 90 dias, embora uso de terapia renal substitutiva tenha sido menor no grupo tratado.
C. Bicarbonato aboliu a necessidade de diálise em todos.
D. Bicarbonato é recomendado para toda CAD.
E. O estudo avaliou somente crianças com alcalose respiratória.

**Gabarito: B.** **A incorreta:** a mortalidade foi 62,1% versus 61,7%. **B correta:** representa desfecho primário e um secundário. **C incorreta:** 35% do grupo ainda recebeu terapia renal substitutiva. **D incorreta:** CAD tem consenso próprio. **E incorreta:** estudo em adultos críticos com acidemia/LRA. **Mini-revisão:** não confundir benefício em desfecho secundário com demonstração de aumento de sobrevida.

### Questão 10 — Gasometria venosa e oxigenação

A equipe colheu sangue venoso de paciente em choque e deseja usar PvO₂ para concluir que a oxigenação arterial está normal. Qual afirmação é mais segura?

A. PvO₂ equivale à PaO₂ em qualquer condição.
B. Gasometria venosa fornece a mesma avaliação de oxigenação arterial.
C. Gasometria venosa pode auxiliar em certos parâmetros metabólicos, mas não substitui PaO₂ arterial para avaliação direta da oxigenação.
D. A gasometria arterial é inútil na doença crítica.
E. Um único valor de pH venoso decide intubação.

**Gabarito: C.** **A e B incorretas:** oxigenação venosa depende da extração tecidual e fluxo. **C correta.** **D incorreta:** arterial é útil quando há pergunta clínica específica de ventilação/oxigenação. **E incorreta:** intubação depende de clínica e suporte necessário. **Mini-revisão:** antes de usar uma fórmula, confira de que sangue veio o exame.

### Questão 11 — Acidose tubular renal tipo 4

Paciente com diabetes, K 5,9, bicarbonato 17, AG não aumentado e sem diarreia apresenta suspeita de hipoaldosteronismo hiporreninêmico. Qual distúrbio renal é compatível?

A. ATR tipo 4, frequentemente associada a hipercalemia.
B. ATR tipo 1 obrigatoriamente associada a hipercalemia.
C. Perda digestiva de cloro como única causa.
D. Alcalose metabólica por vômitos.
E. Diagnóstico de CAD por K elevado, sem cetonemia.

**Gabarito: A.** **A correta:** mecanismo por ação deficiente da aldosterona pode elevar K e produzir acidose de AG normal. **B incorreta:** ATR distal clássica associa-se frequentemente a K baixo, dependendo de etiologia. **C incorreta:** não explica quadro de modo suficiente. **D incorreta:** bicarbonato está baixo. **E incorreta:** CAD requer critérios de diabetes, cetose e acidose. **Mini-revisão:** ATR tipo 4 é a forma “hipercalêmica” típica do ensino.

### Questão 12 — Cloro urinário na alcalose metabólica

Pessoa com alcalose metabólica usa diurético de alça em dias alternados. Cloro urinário está alto durante efeito do fármaco, mas baixo após tempo sem uso. Qual interpretação é mais correta?

A. Cloro urinário alto confirma sempre hiperaldosteronismo.
B. Cloro urinário varia com uso recente de diurético e deve ser relacionado à história e volume.
C. Cloro urinário baixo confirma toda alcalose por vômitos.
D. Cloro urinário não tem utilidade diagnóstica.
E. O cloro urinário decide sozinho a dose de bicarbonato IV.

**Gabarito: B.** **A incorreta:** diuréticos podem produzir cloro elevado. **B correta:** momento da amostra altera o dado. **C incorreta:** não é específico. **D incorreta:** é marcador útil quando contextualizado. **E incorreta:** confunde investigação etiológica com terapêutica. **Mini-revisão:** o resultado urinário depende de timing e medicação.

### Questão 13 — Amôniogênese renal

O metabolismo renal da glutamina é fundamental para a homeostase ácido-base. Qual afirmação é mais adequada?

A. Todo bicarbonato renal novo resulta exclusivamente da filtração glomerular de bicarbonato previamente existente.
B. A produção de NH₄⁺ no rim não participa da excreção de ácido.
C. O metabolismo renal da glutamina pode gerar NH₄⁺ e bicarbonato; a excreção urinária efetiva de amônio contribui para o ganho líquido de bicarbonato novo.
D. A função da amônia renal é exclusivamente aumentar a osmolaridade plasmática.
E. Um pH urinário ácido comprova excreção normal de amônio em todo paciente.

**Gabarito: C.** **A incorreta:** recuperação de bicarbonato filtrado é diferente de geração de base nova. **B incorreta:** NH₄⁺ é via central de excreção renal de ácido. **C correta:** integra amôniogênese, transporte e excreção urinária. **D incorreta:** não é a função fisiológica central aqui. **E incorreta:** pH urinário não quantifica NH₄⁺ e pode ser ácido em estados de excreção inadequada. **Mini-revisão:** acidificar o lúmen e excretar ácido em quantidade suficiente não são conceitos equivalentes.

### Questão 14 — Cálculo de ânion gap urinário

Paciente com diarreia abundante tem acidose metabólica, Na 139, Cl 114 e HCO₃⁻ 14. Na urina: Na 35, K 20, Cl 80 mEq/L. Qual alternativa interpreta corretamente?

A. AG sérico 25 e AG urinário +25, sugerindo imediatamente ATR.
B. AG sérico 11 e AG urinário −25; resposta compatível com maior excreção urinária de NH₄Cl e perda digestiva de bicarbonato no contexto clínico.
C. AG sérico 11 e AG urinário +115, obrigatoriamente por cetoacidose.
D. AG sérico 0 e AG urinário normal, excluindo desidratação.
E. AG urinário substitui dosagem de amônio em todas as condições.

**Gabarito: B.** **A incorreta:** os sinais e operações estão errados. **B correta:** AG sérico = 139−(114+14) = 11; AG urinário = 35+20−80 = −25. **C incorreta:** erro aritmético e etiologia inventada. **D incorreta:** eletrólitos não permitem essa conclusão. **E incorreta:** AG urinário é marcador indireto e pode falhar em presença de cetoânions e outros ânions urinários não medidos. **Mini-revisão:** interpretar uma fórmula com a fisiologia, nunca isoladamente.

### Questão 15 — Resolução da cetoacidose no consenso 2024

Adulto com CAD em melhora, β-hidroxibutirato 0,4 mmol/L, pH venoso 7,32, HCO₃⁻ 17 mmol/L e cetonúria ainda reagente. Segundo os critérios bioquímicos de resolução do consenso internacional de 2024:

A. A CAD não pode estar resolvida porque a cetonúria ainda está positiva.
B. Todo paciente precisa obrigatoriamente atingir bicarbonato ≥24 mmol/L e AG zero.
C. A resolução bioquímica pode estar presente porque β-hidroxibutirato <0,6 mmol/L e pH venoso ≥7,3 satisfazem os critérios, mesmo com HCO₃⁻ ainda <18; integrar à clínica.
D. O β-hidroxibutirato é contraindicado para monitorização de CAD.
E. AG normal isolado sempre substitui cetonemia quantitativa.

**Gabarito: C.** **A incorreta:** nitroprussiato urinário reflete sobretudo acetoacetato, podendo persistir positivo. **B incorreta:** não são os critérios do consenso. **C correta:** emprega cetonemia e pH com a lógica de “e” e “ou” correta, além de exigir decisão clínica. **D incorreta:** o β-hidroxibutirato é preferido para avaliação. **E incorreta:** o AG pode normalizar ou ficar alterado por hipercloremia, sem representar isoladamente resolução da cetose. **Mini-revisão:** CAD resolvida não exige que toda acidose residual tenha desaparecido.

### Questão 16 — Resposta respiratória insuficiente

Adulto com acidose metabólica tem HCO₃⁻ 14 mEq/L e PaCO₂ 41 mmHg. Qual interpretação é melhor?

A. Winter prevê PaCO₂ de 29 ±2 mmHg; a PaCO₂ medida elevada sugere acidose respiratória adicional.
B. Winter prevê 60 mmHg e mostra compensação adequada.
C. A gasometria comprova alcalose respiratória como processo único.
D. A compensação nunca envolve ventilação.
E. A PaCO₂ elevada confirma alcalose metabólica primária.

**Gabarito: A.** **A correta:** 1,5×14+8 = 29, com faixa aproximada 27–31; 41 está acima dela e demonstra ventilação insuficiente para o déficit de bicarbonato. **B incorreta:** equação aplicada erroneamente. **C incorreta:** uma PaCO₂ alta não define alcalose respiratória. **D incorreta:** a alteração ventilatória é principal compensação aguda da acidose metabólica. **E incorreta:** bicarbonato 14 está reduzido. **Mini-revisão:** identificar distúrbio principal e comparar CO₂ observado à compensação esperada antes de concluir que a gasometria está “compensada”.

## 22. Roteiro de autossuficiência: onde buscar a justificativa dentro deste caderno

| Pergunta que o aluno precisa resolver | Âncora didática |
|---|---|
| O pH pode estar normal com duas doenças? | Seções 1, 3, 12; casos B/H |
| Como distinguir acidose respiratória aguda da crônica? | Seções 1, 4 e 9; casos C/J |
| Como usar Winter para identificar distúrbio misto? | Seções 3, 4, 12; questões 1, 3 e 7 |
| Como corrigir AG em hipoalbuminemia? | Seção 5; caso I; questão 4 |
| O que significa delta ratio alto? | Seção 6 |
| Quando o AG urinário sugere perda digestiva? | Seção 7; caso A |
| Como investigar alcalose metabólica por cloro urinário? | Seção 8; caso E; questão 12 |
| Quais são os critérios atuais de CAD? | Seção 11; caso D; questão 6 |
| Bicarbonato reduz mortalidade na acidemia grave com LRA? | Seção 17; caso G; questão 9 |
| Qual é o risco de intubar em acidose com hiperventilação? | Seção 19; caso F; questão 8 |
| Por que salicilatos podem dar pH próximo ao normal? | Seções 12 e 18; caso H; questão 7 |
| PvO₂ mede oxigenação arterial? | Seção 2; questão 10 |

**Estado deste teste:** matriz elaborada, mas **a validação independente por um segundo revisor não foi realizada**. O aluno pode encontrar as respostas no manuscrito, porém isso não garante que cada seção esteja didaticamente suficiente ou livre de redundância. A revisão editorial deverá desafiar os casos com perguntas inéditas e corrigir lacunas encontradas.

## 23. Referências finais anotadas e divergências deliberadamente registradas

- **Brasil:** Gomes EB, Pereira HCP. *Interpretação de gasometria arterial*. VITTALLE 2021;33:203–218. DOI 10.14295/vittalle.v33i1.11501. https://periodicos.furg.br/vittalle/article/view/11501 — didática e aplicação em português brasileiro.
- **Raciocínio de gasometria e misturas:** Morikawa MJ, Ganesh PR. *Acid-Base Interpretation: A Practical Approach*. American Family Physician 2025;111:148–155; https://www.aafp.org/afp/2025/0200/acid-base-interpretation.
- **Compensações e distúrbios mistos:** *Mixed Acid-Base Disturbances: Core Curriculum 2025*. *American Journal of Kidney Diseases*. https://www.sciencedirect.com/science/article/pii/S0272638625009072.
- **CAD/EHH:** consenso internacional ADA/EASD/JBDS/AACE/DTS 2024. https://pmc.ncbi.nlm.nih.gov/articles/PMC11272983/ — substitui cortes antigos de >250 mg/dL como definição única de CAD e não recomenda AG como critério primário de resolução se cetonemia estiver disponível.
- **Acidemia grave com LRA:** Jung et al., BICARICU-2, JAMA 2025;334:2000–2010. https://jamanetwork.com/journals/jama/fullarticle/2840824 — mortalidade primária neutra; terapia renal substitutiva secundária reduzida no grupo bicarbonato.
- **Salicilatos:** EXTRIP Workgroup, recomendações específicas. https://www.extrip-workgroup.org/salicylates — indicações extracorpóreas condicionadas por clínica, função renal, níveis e gravidade.
- **Pontos divergentes com PDFs didáticos do Drive:** compensação crônica da hipercapnia, notação de AG, denominadores delta, limiares de cloro urinário e critérios diagnósticos/resolução de CAD. **Não reproduzir desatualizações apenas para manter identidade com cursinho.** A procedência institucional dos PDFs é não confirmada.


## 24. Pendências para atingir o padrão final do lead_apostilas

- Ampliar fisiologia renal de secreção ácida/amoniogênese, equilíbrio de eletrólitos e efeitos de alterações rápidas de ventilação.
- Detalhar acidose láctica, intoxicações específicas e implicações de osmolar gap conforme tempo de ingestão.
- Expandir distúrbios respiratórios em ventilação mecânica, gravidez, doenças neuromusculares e idosos.
- Desenvolver algoritmo de bicarbonato e diálise com critérios e riscos, sem substituir protocolos brasileiros locais.
- Acrescentar casos sequenciais com resolução integral, exames seriados, pelo menos quatro questões complexas com misturas ácido-base e interpretações.
- Validar referências nacionais adicionais, esquemas terapêuticos aplicáveis no Brasil e corrigir qualquer desatualização.
- Consolidar textos sem repetição, medir caracteres didáticos úteis, produzir imagens e submetê-las à curadoria do Admin.
- Fazer revisão independente por clínico/nefrologista/intensivista, matriz de autossuficiência com âncoras internas, migração para renderer LURIA e inspeção desktop/PWA.

**Status:** manuscrito educacional em elaboração; doses e decisões práticas exigem protocolo de serviço e revisão clínica antes de publicação comercial.