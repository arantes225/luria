# LURIA — Lote 7: auditoria de integração das aulas 124, 129 e 134

**Data da auditoria:** 15/10/2026  
**Natureza:** inspeção da estrutura **real** do HTML publicado e dos três complementos Markdown existentes, sem alteração nas apostilas publicadas.  
**Estado:** plano de inserção condicionado a validação editorial e integração pelo fluxo oficial de produção em lote; **NÃO CERTIFICAÇÃO / NÃO DEPLOY**.

## 1. Arquivos efetivamente inspecionados

| Aula | HTML de origem que deve ser preservado | Blob SHA lido no GitHub | Complemento existente | Caracteres brutos do complemento |
|---|---|---|---|---:|
| 124 — Sangramento uterino anormal | `apostilas/sangramento-uterino-anormal/index.html` | `0e7aacb52b5eb08725f14f8bc2f027db74944c7c` | `lote-07-aula-124-sua-casos-questoes-complemento.md` | 17.256 |
| 129 — Amenorreia | `apostilas/amenorreia/index.html` | `e96543ad73e4e85a70080e4b26f0d9f1957b9779` | `lote-07-aula-129-amenorreia-auditoria-questoes.md` | 13.458 |
| 134 — SOP/SOMP | `apostilas/sindrome-ovariana-metabolica-poliendocrina-somp/index.html` | `28fa2f6ce9f9df345b8177872499eab64bbb2612` | `lote-07-aula-134-sop-auditoria-questoes.md` | 11.862 |

**Não pressupor estabilidade dos blobs:** esses SHAs identificam versões inspecionadas e deverão ser novamente verificados antes de qualquer edição futura do HTML, sobretudo com Codex trabalhando simultaneamente.

## 2. Aula 124 — Sangramento uterino anormal

### 2.1. Estrutura existente verificada no HTML de 69.515 caracteres brutos

- A âncora **`<section id="casos"`** existe e contém exatamente seis **`<h3>Caso 1` ... `Caso 6`**, em resumos clínicos atualmente curtos. São casos originais úteis a preservar; o complemento contém extensões direcionadas, não substitutos.
- Segue-se **`<section id="revisao"`**, com tabela "16. Revisão de alto rendimento" e diferenças clínicas importantes.
- Existem seções posteriores: `editorial-depth-sangramento-uterino-anormal`, `capitulo-integrado-sua-40k`, `luria-livro-etiologias-sangramento-uterino-anormal` e `capitulos-livro-sangramento-uterino-anormal`. Elas aprofundam etiologias e terapias; **não duplicá-las num novo apêndice genérico**.
- A varredura da versão inspecionada **não encontrou rótulos padronizados "Questão 1", "Questão 2" etc.**; há revisões em tabela, que não são questões de múltipla escolha comentadas.
- O complemento contém **oito questões autorais de quatro alternativas comentadas** e propostas de aprofundamento dos casos.

### 2.2. Pontos de incorporação apropriados

1. **Casos:** revisar cada um dos seis casos resumidos da âncora `#casos` e inserir hipótese, exame, interpretação, conduta e relevância descritos no complemento, com economia e sem recriar casos 1–6 em outra seção.
2. **Questões:** criar seção nova com ID estável **`questoes`**, preferencialmente entre `#casos` e `#revisao`, se a hierarquia e a navegação do template assim permitirem. Cada questão deve conter alternativas A–D, gabarito ocultável por acessibilidade e justificativas individuais, incluindo incorretas.
3. **Navegação:** atualizar o índice e a sidebar com novo alvo real `#questoes`; não criar link para âncora inexistente.
4. **Revisão:** manter `#revisao`, títulos clínicos posteriores e recursos de imagem já existentes; só corrigir inconsistências e repetições após auditoria médica.
5. **Portão científico:** confirmar atualidade FEBRASGO 2026, critérios de avaliação endometrial e incorporação no SUS de opções terapêuticas em indicações específicas antes de publicar questões.

## 3. Aula 129 — Amenorreia

### 3.1. Estrutura existente verificada no HTML de 111.452 caracteres brutos

- Há **`<section id="casos"`** contendo, além de dois minicasos rotulados, um caso resolvido em `<details class="clinical-case">` e diversos **`<details class="luria-checkpoint">`** orientados ao raciocínio. **Não resumir a página como "só dois casos"**: a contagem superficial "Caso 1/Caso 2" não inclui o acervo de checkpoints.
- A âncora **`<section id="questoes"`** já existe e seu conteúdo é **"14. Fixação"**, composto por **cinco perguntas rápidas de resposta direta** em lista ordenada, sem quatro alternativas por pergunta.
- A página contém mapa mental na âncora `#mapa` e bibliografia na `#referencias`.
- O complemento Markdown contém oito novas **questões de residência de alternativas A–D, cada uma com comentário** e ajustes clínicos à luz da ASRM 2024.

### 3.2. Pontos de incorporação apropriados

1. **Preservar os cinco itens rápidos atuais**: são um formato de revisão de memória de baixo esforço e não equivalem às oito questões de decisão.
2. **Ampliar a mesma seção `#questoes`**, criando subtítulo "Questões comentadas de residência" depois das cinco perguntas rápidas; não repetir o ID `questoes` em segunda seção, pois IDs duplicados quebram navegação e acessibilidade.
3. Ajustar mecanismo de resposta ocultável à tecnologia já utilizada pelo template (por exemplo `<details>` com `<summary>` acessível), revisando foco via teclado e leitores de tela.
4. Se algum item novo cobrir conteúdo não explicado adequadamente nos capítulos, **aprofundar o capítulo causal correspondente antes de integrar a questão**. A numeração do conjunto pode ser independente ("Questão comentada 1–8"), já que as perguntas rápidas originais não têm alternativas.
5. Verificar critérios clínicos 2024 para insuficiência ovariana primária, adolescente com ausência de menarca, macroprolactina e amenorreia hipotalâmica; não substituir confirmação diagnóstica por leitura de um único hormônio.

## 4. Aula 134 — SOP/SOMP

### 4.1. Estrutura existente verificada no HTML de 57.605 caracteres brutos

- Os **cinco casos clínicos** já aparecem em capítulo de decisão clínica (identificador observado **`casos-decisao-somp-2026`**), não em âncora literal `id="casos"`.
- A âncora **`id="questoes"`** já existe e contém **cinco questões curtas em componentes `fixation-item`**, cada uma com `fixation-question`, botão `fixation-toggle` e `fixation-answer` inicialmente oculto. O HTML também contém script associado a esse padrão.
- Há seções adicionais de aprofundamento **`aprofundamento-2026`**, **`editorial-depth-sindrome-ovariana-metabolica-poliendocrina-somp`** e **`etio-profundidade-sindrome-ovariana-metabolica-poliendocrina-somp`**; não repetir suas explicações mecanicamente.
- O complemento contém oito perguntas novas sobre critérios de diagnóstico em adulta/adolescente, TOTG/metabolismo, fertilidade com letrozol, hiperandrogenismo e proteção endometrial, com quatro alternativas e comentários.

### 4.2. Pontos de incorporação apropriados

1. Preservar os cinco **flash-tests** de fixação e seu JS; eles são úteis e têm interação própria.
2. **Acrescentar novo agrupamento de oito questões comentadas dentro da seção existente `#questoes`**, depois do `<ol class="fixation-list">`. Criar classes distintas da lista atual se necessário, sem sobrescrever o handler `fixation-toggle`.
3. Garantir comentários individualizados de A/B/C/D e enunciados suficientemente diferentes dos cinco itens rápidos existentes.
4. Preservar a distinção diagnóstica **adulta vs adolescente**, uso do AMH/ultrassom e critérios de exclusão de tumores produtores de andrógenos. Confirmar uso da nomenclatura "SOMP" da LURIA e "SOP/PCOS" nas referências sem renomear arbitrariamente rotas existentes.
5. Conferir diretriz internacional de SOP 2023 e fontes brasileiras de terapia e fertilidade antes da integração; evitar prescrição de metformina/GLP-1/antiandrógeno genérica sem contraindicações e contexto.

## 5. Requisitos técnicos comuns antes de qualquer alteração em HTML publicado

1. **Executar novamente o fetch e comparar SHA**: se Codex, editor ou outro agente alterou a página, recomeçar a auditoria do alvo específico.
2. **Revisar as oito questões de cada complemento** por originalidade, resposta sem ambiguidades, base no texto principal, comentário de todas alternativas e nomenclatura consistente.
3. **Respeitar a esteira oficial** de `apostilas/PRODUCAO_EM_LOTE.md`: geração pelo caminho estruturado/JSON e `scripts/build-apostilas-batch.cjs` quando aplicável, não anexar conteúdo HTML cru sem integração ao design system.
4. Garantir **IDs exclusivos**, sidebar/índice funcionais, foco de teclado, contraste, responsividade e ocultação do gabarito realmente funcional sem JS quando possível.
5. Não acrescentar imagens de terceiros sem licença comercial/proveniência verificada; os documentos Drive não autorizam reprodução de figuras.
6. Executar auditoria de JS, CSS, tamanhos, interações, mobile/PWA, sem afirmar teste visual caso só exista inspeção de código.
7. Validar conteúdo médico/farmacológico por revisores apropriados e impedir deploy antes da aprovação.
8. **Contar conteúdo didático útil** separadamente de HTML bruto e textos de navegação, evitando afirmar cumprimento de piso apenas por métricas de arquivo.

## 6. Conclusões verificáveis desta auditoria

| Aula | Perguntas rápidas já no HTML | Questões completas no complemento | Integração segura |
|---|---:|---:|---|
| 124 — SUA | Nenhum bloco MCQ padronizado identificado; revisão em tabela | 8 | Novo bloco + âncora, enriquecendo seis casos existentes |
| 129 — Amenorreia | 5 perguntas rápidas em `#questoes`, além de checkpoints clínicos em `#casos` | 8 | Acrescentar às cinco perguntas sem apagar ou duplicar `#questoes` |
| 134 — SOP/SOMP | 5 perguntas curtas interativas em `#questoes` | 8 | Acrescentar após a lista atual, preservando `fixation-toggle` |

**Resultado do trabalho nesta etapa:** auditoria de estrutura **feita sobre arquivos reais**, com posições de inserção, colisões de IDs, especificação de navegação e limitações científicas registradas. **Nenhuma das três apostilas HTML foi alterada, publicada ou declarada concluída.**

## 15/10/2026 — INTEGRAÇÃO EFETIVAMENTE GRAVADA NA BRANCH EDITORIAL, AINDA NÃO PUBLICADA

**Ref de trabalho:** \`editorial/lote-07-aula-123-cps-2026-20261015\`. Registro criado após leitura do Prompt Magno e do padrão de produção, auditoria do HTML atual e releitura comparativa de fontes do Drive.

### Resultado real (inserção HTML validada por leitura posterior)

| Aula | HTML original (main e branch antes) | HTML após edição da branch | Incremento bruto | Preservação |
|---|---:|---:|---:|---|
| 124 — SUA | 69.515 caracteres | **84.715 caracteres** | **+15.200** | 6 casos originais com 6 discussões inseridas no local; 8 MCQs acrescentadas; nova âncora \`#questoes\` e link na sidebar |
| 129 — Amenorreia | 111.452 | **121.172** | **+9.720** | 5 perguntas rápidas e checkpoints prévios conservados; 8 MCQs inseridas na seção \`#questoes\` já existente |
| 134 — SOMP/PMOS | 57.605 | **66.567** | **+8.962** | 5 perguntas rápidas com \`fixation-toggle\` e JS preexistente intactos; 8 MCQs inseridas após a lista existente, sem duplicar \`#questoes\` |
| **Total** | **238.572** | **272.454** | **+33.882** | **24 questões novas, 6 casos enriquecidos** |

**Atenção:** quantidades são caracteres brutos de arquivo HTML, não caracteres didáticos úteis auditados. O rascunho fonte de cada bloco continua íntegro em \`apostilas/_rascunhos/\`; não houve remoção de conteúdo anterior para alcançar métricas de tamanho.

**HTML/UX:** questões autorais de alternativas A–D com comentário e gabarito dentro de \`<details>\` nativos, sem exigir JavaScript adicional; cabeçalho de cada questão com ID individual e \`aria-labelledby\`; correspondência de navegação para SUA. Conferida em cada arquivo: oito questões, quatro alternativas em cada questão, um gabarito consistente por questão, 8 controles de resposta, IDs sem colisão, fechamento balanceado de \`section\`, \`details\` e \`article\`, e conteúdo dos scripts inline preexistentes **inalterado**. As três gravações GitHub foram confirmadas por \`fetch_file\` após escrita. Isto constitui **auditoria estrutural estática**; NÃO é execução de JS/browser, nem teste visual desktop/PWA, nem auditoria total de acessibilidade.

**Etapa zero do novo ciclo, arquivos efetivamente lidos via conector:** “02 - CANCER DE ENDOMETRIO.pdf” (~9.576 caracteres extraídos, comparativo parcial para SUA), “02 - HIPERPROLACTINEMIA.pdf” (~9.236, comparativo parcial para amenorreia) e “01 - RESUMO - SINDROME DOS OVARIOS POLICISTICOS.pdf” (~10.545, comparativo específico porém resumido para SOP/SOMP). Nenhum material foi copiado. Origem institucional Estratégia MED não verificada; os arquivos evidenciam circulação “Medicina livre”, que não identifica necessariamente autor. Comparativos auxiliam auditoria de escopo, **não** validam doses, recomendações ou direitos sobre imagens.

**Fonte normativa especialmente conferida:** Portaria SCTIE/MS nº 101, de 8/01/2026, incorporação condicionada de ácido tranexâmico e DIU-LNG em leiomioma com sangramento uterino intenso no SUS — não confundir incorporação e disponibilidade clínica irrestrita. ASRM 2024 para amenorreia. Nomenclatura PMOS adotada por consenso internacional em maio/2026, associada à atualização terminológica da diretriz 2023, sem alteração das recomendações clínicas nesse ato. Fontes primárias estão vinculadas nas páginas correspondentes.

### GATE ainda não cumprido

- Revisão médica independente de cada alternativa e justificativa, incluindo nuances de indicação SUS e tratamentos locais, antes da fusão na main;
- Revisão didática de redundância e efetiva autossuficiência dos capítulos, sem inferir qualidade pelo comprimento bruto;
- Testes de renderização real em desktop, dispositivos móveis/PWA, teclado e leitores de tela;
- Auditoria de conteúdo e autorização comercial de imagens, com aprovação Admin para novas imagens (nenhuma inserida);
- Execução do pipeline local (\`check-syntax\`, \`audit-apostilas\`) em ambiente com checkout e dependências — **não executado aqui**.

**Estado verificável:** os HTMLs foram alterados apenas na **branch**, a \`main\` mantém as versões originais. **NÃO HOUVE DEPLOY, MERGE, INTEGRAÇÃO DE IMAGENS, ALTERAÇÃO DE SUPABASE OU CERTIFICAÇÃO CLÍNICA.**

