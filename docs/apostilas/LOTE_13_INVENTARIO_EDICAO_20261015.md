# LURIA — Lote 13 · Inventário verificável de manuscritos e gates editoriais
**Data:** 15/10/2026. **Branch:** `editorial/lote-13-preenchimento-20261015`. **Não é relatório de publicação.**

## Escopo e critérios
19 itens no controle do lote: 17 rascunhos autorais preliminares e 2 apostilas HTML já existentes sob auditoria, sem sobrescrita.
Comprimentos abaixo são **número de caracteres totais dos arquivos Markdown** na branch, e NÃO equivalem a número de caracteres didáticos úteis ou certificação de qualidade. Incluem títulos, referências, roteiros, casos e questões. Existência de seções/tokens foi verificada automaticamente, mas avaliação de qualidade clínica requer leitura humana.

| ID | Tema | Caracteres brutos do Markdown | Seções H2 | Casos?* | Questões?* | Estado |
|---:|---|---:|---:|:---:|:---:|---|
| 250 | Transtornos alimentares | 28.734 | 20 | Sim | Sim | Rascunho parcial |
| 251 | Transtornos de personalidade e autolesão | 28.680 | 17 | Sim | Sim | Rascunho parcial |
| 252 | Saúde mental no ciclo gravídico-puerperal | 29.822 | 18 | Sim | Sim | Rascunho parcial |
| 253 | Luto, crises e transtornos de adaptação | 25.841 | 19 | Sim | Sim | Rascunho parcial |
| 254 | Saúde mental do adolescente: avaliação e manejo inicial | 68.216 | 31 | Sim | Sim | Rascunho parcial |
| 255 | Longitudinalidade, coordenação do cuidado e matriciamento | 27.233 | 20 | Sim | Sim | Rascunho parcial |
| 256 | Reabilitação comunitária e cuidado de pessoas com deficiência | 31.523 | 19 | Sim | Sim | Rascunho parcial |
| 257 | Planejamento, avaliação e gestão de serviços de saúde | 32.298 | 19 | Sim | Sim | Rascunho parcial |
| 258 | Avaliação de tecnologias em saúde e custo-efetividade | 31.258 | 20 | Sim | Sim | Rascunho parcial |
| 259 | Sistemas de Informação em Saúde e qualidade dos dados | 30.563 | 16 | Sim | Sim | Rascunho parcial |
| 260 | Biossegurança e prevenção de infecções relacionadas à assistência | 34.278 | 21 | Sim | Sim | Rascunho parcial |
| 271 | Endocrinologia pediátrica | 29.109 | 14 | Sim | Sim | Rascunho parcial |
| 272 | Fibrose cística | 41.768 | 22 | Sim | Sim | Rascunho parcial |
| 273 | Imunodeficiências na infância | 38.184 | 19 | Sim | Sim | Rascunho parcial |
| 274 | Ortopedia pediátrica | 29.163 | 15 | Sim | Sim | Rascunho parcial |
| 275 | Emergências de cirurgia pediátrica | 29.986 | 19 | Sim | Sim | Rascunho parcial |
| 276 | Diarreia aguda no adulto e colite por Clostridioides difficile | 33.808 | 18 | Sim | Sim | Rascunho parcial |
| 279 | Crescimento fetal reduzido e aumentado | — (HTML existente) | — | — | — | Auditoria preliminar |
| 280 | Alterações fisiológicas da gestação | — (HTML existente) | — | — | — | Auditoria preliminar |

**Total bruto dos 17 manuscritos:** 570.464 caracteres. **Média bruta:** 33.557.

*Os campos Casos? e Questões? refletem busca textual inicial de blocos, não contagem, profundidade ou aprovação científica. Quando constar “Rever”, pode ser diferença de título; conferir manualmente.*

## Matriz de prioridade para próxima rodada
1. **250–254 (Saúde Mental):** checar com psiquiatra critérios CID-11/DSM-5-TR, risco de suicídio e proteção de adolescentes, uso de antidepressivos com faixas etárias e legislação brasileira. Benchmark do Drive específico ausente: não declarar etapa zero completa.
2. **255–259 (APS/Saúde Coletiva):** conferir normas 2026, financiamento, RAPS, eMulti, judicialização, limiares e terminologia Siaps. Auditoria estatística e jurídica antes de publicação.
3. **260 (biossegurança/IRAS):** revisar normas Anvisa/NR-32 e fluxos de precaução, vigilância de IRAS e antibioticoterapia quando citada.
4. **271–276 (Pediatria/Infectologia):** revisão especializada de critérios diagnósticos, doses/durações, contraindicações, epidemiologia brasileira e decisões de internação.
5. **279–280:** preservar HTML atual e desenvolver melhorias incrementais com plano de diferenças: não refazer livro por completo nem deduplicar conteúdo útil sem leitura.

## Gates obrigatórios antes de homologar
- **Comparativo Drive específico realmente lido** e registrado por capítulo; materiais apenas correlatos não satisfazem comparação integral.
- **Matriz de cobertura e autossuficiência:** cada pergunta de residência resolúvel pelo livro, sem dependência essencial de material externo; casos e respostas corretos.
- **Revisão médica especializada e fontes** verificadas na edição vigente; evitar transformar consulta pública ou atualização em norma incorporada.
- **≥60.000 caracteres didáticos úteis** como meta preferencial, sem repetição; contagem bruta não serve como certificação.
- **Imagem:** seleção real, procedência, licença comercial, correção anatômica, WebP e fluxo de aprovação centralizado do Admin; dez pautas de imagem não são dez imagens adquiridas.
- **Testes técnicos:** HTML semântico, âncoras, responsividade desktop/PWA, estabilidade e integridade do catálogo após build. Não executar build de publicação ou merge antes de todos os gates.

## Segurança de edição e concorrência
Os manuscritos permanecem em `apostilas/_rascunhos/` e documentos administrativos em `docs/apostilas/`, na branch editorial. **Não houve ação intencional sobre `main`, Supabase ou deploy** ao montar o inventário. Se outros chats/Codex trabalharem em paralelo, reler blob SHA antes de atualizar cada arquivo.

**Resultado:** primeira redação coberta em 17/17 temas novos; 2/2 livros existentes auditados preliminarmente; 0/19 temas homologados nesta rodada.