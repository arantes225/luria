# LURIA — Lote 6 (grade de 260) · Continuação 136 e 137 · 15/10/2026

**Estado dos materiais:** RASCUNHOS EDITORIAIS ATUALIZADOS · não certificados · não publicados · sem merge nem deploy. Os caminhos legados têm prefixo `lote-07` por convenção da grade anterior; os números **136** e **137** são a chave curricular permanente.

## 1. Inventário prévio e prevenção de duplicações
- **136 — Hemorragia Digestiva / Abordagem Integrada.** Antes da rodada, 67.474 caracteres brutos em `apostilas/_rascunhos/lote-07-aula-136-hemorragia-digestiva-integrada.md`, 9 casos e 14 questões. Aulas específicas 127 (HDA) e 132 (HDB) já têm rascunhos; a 136 foi preservada como eixo transversal **risco → origem provável → exame para hemostasia → retorno**, evitando uma cópia das aulas específicas.
- **137 — Doença do Refluxo Gastroesofágico e Hérnia Hiatal.** Antes da rodada, 80.228 caracteres brutos em `apostilas/_rascunhos/lote-07-aula-137-drge-hernia-hiatal.md`, 8 casos e 14 questões. A aula já cobria fisiologia antirrefluxo, Los Angeles, Lyon 2.0, monitorização em uso/sem IBP, acalasia, tipos de hérnia, técnica cirúrgica, Barrett e seguimento. A nova diretriz AGA 2025 de **vigilância de Barrett** não tinha sido integrada.

## 2. Benchmark Google Drive realmente aberto e lido (ETAPA ZERO)
**Consulta realizada em 15/10/2026, antes das duas edições.** Os documentos de terceiros são fonte de benchmark do escopo, **não** fonte para cópia ou autoridade normativa. Não registrar links/IDs privados do Drive no repositório público.

| Apostila LURIA | Documentos realmente consultados | O que estava presente | Lacunas versus LURIA |
|---|---|---|---|
| 136 | `01 - ENDOSCOPIA - ULCERA PEPTICA.pdf` (9.035 caracteres extraídos); `06 - GASTRO - HDA E SINDROME HEPATOPULMONAR.pdf` (6.654 caracteres extraídos) | Forrest, úlcera e H. pylori no primeiro; varizes, portal e pacote inicial no segundo | Ambos são **específicos de HDA**, e nenhum apresenta algoritmo completo HDA × HDB com exames e escores; contêm simplificações/fórmulas antigas que não foram incorporadas |
| 137 | `DOENÇA DO REFLUXO GASTROESOFÁGICO.pdf` (1.647 caracteres extraídos); `02 - ESTOMAGO 1 DISPEPSIA, FISIOLOGIA GASTRICA E IBPS.pdf` (5.488 caracteres extraídos) | Resumo esquemático de sintomas, IBP, DeMeester, Barrett; correlato sobre fisiologia gástrica e tratamento ácido | Não ensinam integralmente cirurgia hiatal, interpretação moderna Lyon 2.0, manometria pré-operatória e **AGA Barrett 2025** |

**Autoria institucional:** não há evidência verificada de que esses PDFs sejam do **Estratégia MED**. Alguns mostram identificação de coleções particulares ou marca d'água `Medicina Livre`. Não atribuir ao Estratégia MED, não copiar textos/imagens/tabelas, não interpretar sínteses antigas como recomendações atuais. O benchmark completo institucional exigido pelo `EDITORIAL_STANDARD.md` permanece **parcial**, bloqueando certificação.

**Padrão LURIA comparado:** diretrizes editoriais `apostilas/EDITORIAL_STANDARD.md` e `apostilas/PRODUCAO_EM_LOTE.md`, além da estrutura já auditada de `apostilas/amenorreia/index.html`, preservada sem edição. Não foram alterados CSS, PWA ou HTML publicado nesta rodada.

## 3. Apostila 136 — lacunas pontuais e solução original
| Lacuna real anterior | Onde foi corrigida | Fonte clínica independente |
|---|---|---|
| GBS apenas descrito, mas não calculável pelo aluno; risco de inserir ureia brasileira em mg/dL como se fosse mmol/L | **Seção 7.1**: tabela completa com unidades, dois exemplos resolvidos (GBS 0 e 11), alerta ureia ≠ BUN e limites de aplicação | NHS Greater Glasgow & Clyde `https://handbook.ggcmedicines.org.uk/guidelines/gastrointestinal-system/glasgow-blatchford-score/`; ACG HDA 2021, DOI 10.14309/ajg.0000000000001245 |
| Oakland mencionava evitar escore não conferido, enquanto a aula 132 já teve escore verificado | Texto atualizado em **seção 7**: orientar uso por cenário e limiar de referência ≤8 sem reproduzir inteira a aula HDB | ESGE HDB 2021; validação externa 2020 `https://pmc.ncbi.nlm.nih.gov/articles/PMC7341175/` |
| O preparo da EDA por HDA severa não explicava pró-cinético e alternativa IV sugerida em 2026 | **Seção 18.7**: por que sangue/coágulos prejudicam exame, quando considerar eritromicina IV / metoclopramida IV em cenários selecionados e o que NÃO fazer | ESGE, `Endoscopic diagnosis and management of peptic ulcer bleeding — Update 2026`, DOI 10.1055/a-2863-8314, `https://pubmed.ncbi.nlm.nih.gov/42127996/` |

**Limite:** a ESGE 2026 publicou uma **errata** em maio de 2026, DOI 10.1055/a-2881-7411; sua existência foi confirmada mas as correções de texto não foram integralmente confrontadas. Não afirmar conclusão de revisão clínica antes dessa comparação. Não foram inseridas doses IV sem checar protocolo/bula Brasil.

**Após edição:** 74.466 caracteres **brutos**; 9 casos, 14 questões; 12 itens de *planejamento* visual. Não equivale a 12 imagens licenciadas/aprovadas. A lista antiga de imagens foi conservada; não foi feito upload de imagem.

## 4. Apostila 137 — atualização posterior à biblioteca anterior
| Lacuna anterior | Onde foi corrigida | Fonte clínica independente |
|---|---|---|
| Faltava recomendar vigilância **personalizada** de Barrett conforme AGA 2025, separada da ACG 2022 | **Seção 20.6**: tabela por segmento <1 cm, <3 cm, ≥3 cm, risco e exame de qualidade, com exemplos clínicos | AGA 2025, DOI 10.1053/j.gastro.2025.09.012; `https://pubmed.ncbi.nlm.nih.gov/41125322/` |
| Necessidade de tornar visível a diferença entre endoscopia vigilância e investigação de novos alarmes | Seção 20.6, subitem sobre idade/comorbidades e suspensão de vigilância; sinais de alarme continuam indicação própria | AGA 2025, `https://gastro.org/clinical-guidance/surveillance-of-barretts-esophagus/` |
| Ausência de aplicação da diretriz nova em questão de prova | **Questão 9A**: segmento colunar 6 mm, histologia com metaplasia, sem neoplasia; quatro alternativas e comentários | AGA 2025, recomendação relativa a epitélio colunar <1 cm |
| Referência bibliográfica não listava AGA 2025 | `## 23` inclui fonte nº 10, datada e rastreável | AGA 2025 |

**Diretrizes anteriores preservadas:** Lyon 2.0 para AET >6% e casos limítrofes; SAGES 2024 sem recomendação universal para tela; ACG 2022 para DRGE e Barrett. Nenhum conteúdo antigo foi apagado arbitrariamente e o HTML original da plataforma não foi alterado.

**Após edição:** 86.693 caracteres **brutos**; 8 casos, **15 questões**; 12 pautas visuais sem imagens aprovadas.

## 5. Auditoria técnica limitada à edição de Markdown
Através de leitura do arquivo após gravação na ramificação editorial:
- 136: 30 títulos de capítulos tipo `## num.`, 9 casos e 14 questões; novas âncoras de Markdown 7.1 e 18.7 verificadas presentes.
- 137: 30 títulos de capítulos tipo `## num.`, 8 casos e 15 questões; novas seções 20.6 e questão 9A verificadas presentes.
- Busca simples por parágrafos **exatamente repetidos** com mais de 150 caracteres: **0** encontrados em cada arquivo. **Isso não exclui redundância semântica** ou paráfrase.
- **Não houve:** execução do `build-apostilas-batch.cjs --dry-run`, `audit-apostilas-60k.mjs`, `audit-apostilas-batch.cjs`, `check-syntax.cjs`, auditoria de HTML gerado, QA no navegador/PWA ou certificação independente da clínica.

## 6. Curadoria de imagens — descobertas e bloqueios
- Os rascunhos 136/137 já tinham **12 pautas didáticas cada**, mas os itens eram ideias e **não** URLs com autoria/licença verificadas; não rotular como candidatas formalizadas.
- Pesquisa exploratória externa em 15/10/2026 identificou artigo aberto com fotografias endoscópicas de Forrest: Yen HH et al., `Forrest Classification for Bleeding Peptic Ulcer: A New Look at the Old Endoscopic Classification`, *Diagnostics*. 2022;12(5):1066, DOI **10.3390/diagnostics12051066**, em `https://pmc.ncbi.nlm.nih.gov/articles/PMC9139956/`. A edição está declarada como **CC BY 4.0** pelo periódico; a licença de **cada figura** e possíveis créditos de terceiros ainda precisam ser conferidos no detalhe do arquivo. **Não foi criada candidata de Admin nem publicada imagem.**
- Imagens retornadas de sites de hospitais, blogs e revistas sem licença de reutilização comprovada **não** foram aprovadas e **não** devem ser copiadas. Preferir figuras/esquemas originais LURIA e material real licenciado de instituições científicas, com autorização quando necessário.
- Antes da publicação pesquisar pelo menos dez **fontes reais** por tema, selecionar candidatas licenciadas com URL direta, origem, legenda e destino, registrar manifesto e enviar **somente à fila Admin**; nunca inserir prévia privada diretamente no HTML.

## 7. Gate de conclusão ainda bloqueado
- [x] Inventário, leitura dos dois rascunhos completos e quatro PDFs de Drive comparáveis.
- [x] Alterações **focais, justificadas e originais** nos capítulos correspondentes.
- [x] Controle de casos, questões, âncoras e contagem bruta após leitura de verificação.
- [ ] Benchmark longo, equivalente e de autoria institucional confiavelmente identificada no Drive.
- [ ] Validar integralmente errata ESGE 2026, condutas e doses brasileiras, reversores, hemostasia, pré-operatório/seguimento por especialista.
- [ ] Matriz semântica completa de cobertura + 60.000 caracteres **didáticos úteis** aferidos corretamente + teste de resposta a questões usando somente o próprio capítulo.
- [ ] Documentar ao menos dez candidatas de imagens **com licença e origem válidas** por apostila e aprovar por Admin.
- [ ] Build/dry-run/auditores oficiais/checagem de sintaxe e QA desktop/PWA, com teste de URLs/referências.
- [ ] Revisão final médico-científica independente antes de considerar publicação.

**Ponto de continuidade:** concluída revisão desta rodada das posições **132–137** da grade de 260, com pendências individuais. Para fechar o **lote 6 inteiro**, ainda é obrigatório reconciliar os temas **116–131**, cujos rascunhos estão majoritariamente na ramificação `editorial/lote-06-auditoria-20261014`, com paralelos em `main`. Não mesclar cegamente as duas linhas de produção.
