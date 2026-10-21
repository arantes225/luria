# Acabamento visual — revisão da implementação atual

Base: `12323159`. Revisão local iniciada em 20/10/2026, sem alterações preexistentes no checkout. O redesign atual foi preservado. Nenhum JavaScript de produto, CSP, autenticação, integração, dado clínico ou configuração de publicação foi alterado.

## Cobertura visual efetiva

39 rotas por amostragem de telas/estados, não uma certificação de todas as páginas e estados do site:

| Ambiente | Rotas inspecionadas |
| --- | --- |
| Estudos | `/dashboard/`, `/cronograma/`, `/aprender/`, `/consolidar/`, `/flashcards/`, `/caderno-erros/`, `/caderno/`, `/questoes-simulados/`, `/estatisticas/`, `/configuracoes/`, `/configuracoes/flashcards/`, `/desafio-diario/`, `/apostilas/`, `/professor-alex/`, `/editais/`, `/aplicar/`, `/amigos/`, `/jogos/`, `/plantao/luriazap/`, `/plantao/sala-emergencia/` |
| Trabalho | `/trabalho/`, `/trabalho/calculadora/`, `/trabalho/scores/`, `/trabalho/passometro/`, `/trabalho/prontuario-rapido/`, `/trabalho/bulario/`, `/trabalho/prescricao/`, `/trabalho/diagnostico/`, `/trabalho/gestor-plantoes/`, `/trabalho/financeiro/`, `/trabalho/divisor-plantao/`, `/trabalho/plantoes/`, `/trabalho/fluidos-eletrólitos/`, `/trabalho/pcr/`, `/trabalho/pcr/executar/`, `/trabalho/pcr/historico/` |
| Administração/público | `/admin/` (Métricas e Planos), `/`, `/login/` (incluindo validação de cadastro sem preencher/enviar credenciais) |

Larguras amostradas: 1440, 1280, 768, 390 e 320 px. Quatro temas conferidos em amostras dos componentes alterados; não foi executado o produto cartesiano de todas as rotas, larguras e temas. Páginas públicas mantêm sua própria apresentação. Nos Flashcards foram conferidos desktop, notebook, tablet e mobile; na comunidade, também navegação entre Amigos, Grupos e Salas em 320 px.

Dados de conta e respostas remotas eram sintéticos em servidor de prévia isolado. Não houve validação do backend real. PCR foi inspecionado em seus estados iniciais, sem aplicação de condutas. LuriaZap foi visto sem conversas; não certifica conversas reais. Vários módulos do Trabalho são atualmente páginas de apresentação, preservadas.

## Corrigido e validado visualmente

| Prioridade | Defeito e causa | Correção |
| --- | --- | --- |
| P1 | Comunidade em 390 px mantinha uma coluna lateral de 300 px e comprimia a principal a 20 px: breakpoints não superavam a regra desktop `!important`. Abas também excediam 320 px. | Corrigida a prioridade das media queries existentes; cabeçalho permite quebra e abas distribuem a largura disponível. |
| P2 | Flashcards exibia métricas antigas fora de seu wrapper oculto e o workspace ocupava somente uma coluna de outro grid. Um `flex-basis` de 148 px cortava o conteúdo da revisão. | Reparado o fechamento HTML; grid passa a pertencer ao workspace e altura da revisão acompanha seu conteúdo. O wrapper antigo já era oculto; nenhuma nova técnica de ocultação foi usada para mascarar conteúdo. |
| P2 | Quatro IDs das métricas eram duplicados no conteúdo antigo e no atual; os updates chegavam ao primeiro bloco. | Retirados somente os IDs duplicados do bloco aposentado; preservados os IDs e controladores do painel visível. Conferidos valores sintéticos 14/0/0 e retenção sem dados, sem alterar cálculos. |
| P2 | Buscas de Questões/Flashcards tinham ícone sobre texto, ícone solto ou campo excedendo o card. CSS reutilizado só atendia Questões, e padding global anulava a reserva do ícone. | Compartilhado o seletor do componente existente; definida reserva de padding e limites intrínsecos adequados. |
| P2 | Questões do dia comprimiam texto e CTA lado a lado mesmo em cards estreitos. | Copy e ações podem quebrar conforme a largura real do card, mantendo fontes, cores e ações. |
| P2 | Links de ação de Jogos/Aplicar/Alex herdavam cor de links de texto. Jogos ainda usava token de superfície inexistente em badges. | CTAs excluídos do seletor de links comuns; foreground semântico no CTA escuro e token existente nos badges, preservando os gradientes. |
| P2 | Acesso “Abrir PCR” ultrapassava a viewport de 320 px: os dois links tinham tamanho intrínseco sem redução. | Retorno da Central pode reduzir/quebrar texto; PCR mantém sua área de toque e fica dentro da viewport. |
| P2 | Landing em 320 px ganhava scroll horizontal devido à largura mínima do body somada à barra vertical; grid mantinha mínimo intrínseco. | Removida a largura mínima rígida e usado `minmax(0,1fr)` no breakpoint existente. Conferido `scrollWidth === clientWidth` (305 px com scrollbar). |
| P3 | Texto literal `\n` aparecia no canto da tela em Configurações, Caderno e Gestor de Plantões/derivados. | Trocada somente a sequência entre tags script por uma quebra de linha real, incluindo aliases correspondentes. |

## Arquivos modificados / alcance compartilhado

- `assets/css/ui-app.css`: somente navegação mobile do Trabalho. Amostras: Calculadoras, Scores, Passômetro, Cola, Bulário, Prescrição, Diagnóstico, Gestor e PCR.
- `assets/css/education-ui-v2.css`: padding opt-in dos campos com ícone, links de ação e composição do card diário. Regressão amostrada em Questões, Flashcards, Aprender, Aplicar, Jogos, Configurações e comunidade; demais inputs conservam o padding anterior por fallback da variável.
- `assets/css/questoes-lumina-v2.css`: mesmo componente de busca para Questões e Flashcards.
- `assets/css/flashcards-ui-v2.css`, `flashcards/index.html`: encaixe e medidas dos Flashcards; nenhuma mudança em scripts inline ou políticas.
- `assets/css/social-friends.css`: breakpoints/cabeçalho/abas da comunidade.
- `assets/css/games-common.css`: token de superfície dos badges de Jogos.
- `assets/css/landing.css`: mínimos de largura da página pública.
- `caderno.html`, `caderno/index.html`, `configuracoes.html`, `configuracoes/index.html`, `trabalho/gestor-plantoes/index.html`, `trabalho/plantoes/index.html`, `trabalho/divisor-plantao/index.html`, `trabalho/financeiro/index.html`: exclusivamente texto escapado entre tags script.
- `tests/ui-finish-regression.test.cjs`: duas regressões de estrutura HTML/IDs e texto indesejado.
- Este relatório.

## Verificações executadas

- Navegador Chromium via CUA, screenshots e medidas DOM. Abertura/fechamento de perfil, notificações e cronômetro; alternância dos quatro temas; abas sociais; Admin/Planos; criação de Flashcard e retorno, sem salvar dados.
- 18 casos aprovados em `ui-final-refinement.test.cjs`, `ui-stage81.test.cjs` e casos independentes de `work-hub.test.cjs`; mais 2 regressões novas aprovadas: **20 casos aprovados**. Não foi executada suíte clínica ou geral.
- `css-system.test.cjs` e uma verificação de `work-hub.test.cjs` ficaram bloqueados por `Cannot find module 'postcss'`. Nenhuma dependência instalada. A primeira tentativa do runner isolado também foi impedida por `spawn EPERM`; a execução funcional usou `--test-isolation=none`, como o script do projeto.
- Fallback de parsing com `css-tree` já disponível: seis CSS alterados sem erros; `social-friends.css` reproduz os mesmos três avisos de nesting da versão base, sem novos avisos. A aplicação desses breakpoints foi verificada no Chromium.
- `node --check tests/ui-finish-regression.test.cjs` e `git diff --check` aprovados; diff revisado, sem reformatação ampla.
- Console consultado. Avisos de importação do Alex surgiram inicialmente por MIME ausente na prévia temporária; corrigida apenas a prévia, e mascotes voltaram a renderizar. Não se declara console de produção validado.

Evidência local: `.audit-artifacts/ui-finish-round2/flashcards-desktop.png`; amostras instrumentadas em `coverage.json` na mesma pasta (artefatos ignorados pelo Git).

## Pendências e limites

- **P2 visual pendente:** Alex flutuante pode encobrir textos/controles ao rolar telas pequenas (observado em Jogos/Scores). Sua posição, movimentação e minimização são parte do design atual; não foi imposto um novo dock, redução arbitrária ou nova regra de interação nesta rodada.
- **P2 funcional, fora desta rodada visual:** preencher “Filtrar decks” não altera os cards no fluxo local testado. O ID aparece no HTML, sem referência encontrada nos JS pesquisados. Nenhuma lógica de filtragem foi criada e nenhuma aprovação funcional desse filtro é alegada.
- Faltam dados/integrações reais para validar conversas, conteúdo remoto, voz, tabelas administrativas preenchidas, sessões clínicas e estados de falha de produção.
- **Não inspecionados:** artigos individuais das Apostilas, telas internas de cada jogo, todos os detalhes clínicos/calculadoras, páginas internas de Aplicar, Editorial, campanhas e demais rotas fora da lista acima. Aliases de Caderno/Configurações foram conferidos no código/testes, sem alegar inspeção visual separada.
- Não há correção apresentada como concluída apenas no código: mudanças de apresentação tiveram amostra visual; os limites acima permanecem explícitos.

Sem commit, push, merge ou deploy.
