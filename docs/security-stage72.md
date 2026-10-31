# Etapa 7.2 — sanitização do frontend

Data: 11/10/2026. Revisão do código cliente, sem alterações no Supabase, autenticação, persistência, CSP, CSS ou conteúdo clínico. Sem commit, merge, push ou deploy.

## A. Diagnóstico e alcance

O inventário lexical inicial encontrou **433 referências em 49 arquivos** de `assets/js`, incluindo leituras de `innerHTML`, montagem estática e parsers. Referências lexicais não equivalem a vulnerabilidades nem a uma certificação de todos os caminhos. A tabela registra **38 fluxos/grupos de renderização examinados em detalhe**, com origem, transformação e contexto. A classificação descreve o estado anterior às correções: **5 confirmados, 13 potenciais, 17 protegidos e 3 estáticos confiáveis**.

Confirmado significa que há um caminho identificável de injeção/execução; os casos Notion, estrutura do Caderno e notificações também foram reproduzidos em Chromium, com marcadores sintéticos. No Bulário, a interpolação sem escape permite sair de atributos numéricos e inserir atributos de evento; o teste da correção exercita a renderização completa. A possibilidade de editar esse JSON no backend não foi testada.

Nos links com `target="_blank"`, foi comprovada a aceitação de esquemas perigosos. A execução depende do navegador e do contexto de navegação, por isso esses caminhos foram classificados como potenciais e corrigidos preventivamente. Uma atribuição a `img.src` não foi tratada como prova automática de execução de JavaScript.

| # | Origem → transformação → destino/contexto | Classificação anterior | Proteção atual / decisão |
|---|---|---|---|
| 1 | Resposta `notion-api.page.html` → sem limpeza → `caderno.openNotionPage`, `content.innerHTML` | Confirmado | Sanitizador do Caderno em modo Notion antes da inserção |
| 2 | Mesma resposta → `note.content_html` → `caderno-notion-editor-fix.loadNotionIntoMainEditor`, `editor.innerHTML` | Confirmado | Mesma sanitização; metadados de blocos mantidos para editar/salvar |
| 3 | Editor/anotação armazenada → parser `div` → `renderTopicList`, DOM desconectado mas ativo | Confirmado | Parser `template` inerte; apenas títulos escapados chegam ao DOM |
| 4 | `notifications.href` do Supabase → escape HTML → `app.loadNotifications`, `href` e clique com `location.href` | Confirmado | Validação de URL antes do escape; fallback `/amigos/` |
| 5 | JSON `bulario_catalog.data.formulations.calculator` → interpolação direta → `calculator`, atributos `min/max/value` | Confirmado | Escape de atributos; nenhuma fórmula modificada |
| 6 | HTML nativo → sanitização em template → desembrulhar nós com fragmento do documento ativo | Potencial | Fragmento do próprio documento inerte; descartar namespaces/contêineres ativos. Não houve execução reproduzida neste caminho específico |
| 7 | Fila clínica: `source_url/proposed_asset.src` → escape/allowlist parcial → `admin.renderClinicalImageReviewQueue`, link/prévia | Potencial | URL validada e allowlist de hosts de prévia preservada |
| 8 | Fila de apostila: mesmos campos → escape → `admin.renderApostilaImageReviewQueue` e expansão, link/prévia/modal | Potencial | URL validada em ambos os pontos |
| 9 | Imagem de apostila aprovada → texto escapado/APIs DOM → `apostila-tools.createApprovedFigure`, `img.src/a.href` | Potencial | Validar URL nas atribuições DOM; textos continuam literais |
| 10 | Candidata de apostila → escape → `renderReviewPanel/expandImage`, atributos/link/modal | Potencial | Validar URLs; handler constante de imagem indisponível preservado |
| 11 | `clinical_protocols.image_assets/source_refs` → escape → `trabalho-protocolos.renderDetail/renderImages/renderRefs`, links/imagens/modal | Potencial | Validar URL antes do escape, também no atributo que alimenta o modal |
| 12 | `recipe_bank.data.references` → escape → `trabalho-receitas.renderReferences`, links | Potencial | Validação compartilhada de URL |
| 13 | Caso clínico `source_refs` → escape → `plantao.renderDebrief`, links | Potencial | Validação compartilhada de URL; motor e resultados intactos |
| 14 | Mesma origem → escape → `plantao.renderDisasterDebrief`, links | Potencial | Mesma proteção |
| 15 | Bulas `source_url/leaflet_url` → escape → `bulario.formulationCard/renderDetail`, links | Potencial | URL validada; fallback já existente da Anvisa preservado |
| 16 | Edital revisado `source_edital_url` → escape → `admin-editais.render`, link | Potencial | URL validada |
| 17 | Catálogo publicado `edital_url` → escape → `editais-catalog.renderCatalog`, link | Potencial | URL validada |
| 18 | Prova pessoal `edital_url/registration_url` → escape → `editais.renderExams`, links | Potencial | URL validada; seleção e menus preservados |
| 19 | Clientes: nomes/email/plano → `esc`/formatação numérica → `admin.renderCustomers`, células/atributos | Protegido | Escape existente cobre aspas, `&`, `<`, `>`; não substituído |
| 20 | Feedback de usuários → `esc` → `admin.renderBetaFeedback`, cards | Protegido | Escape existente; texto hostil testado como literal |
| 21 | Planos/assinaturas/preços → escape ou números formatados → formulários/cards Admin | Protegido | Sem alterações no cálculo, validação ou persistência |
| 22 | Relatórios/RPCs/mensagens Admin → escape ou formatos numéricos → tabelas/status | Protegido | Sem alteração em RPCs ou permissões; URLs das filas tratadas acima |
| 23 | Anotação nativa → `sanitizeHtml/prepareNotebookLazyImageHtml/notebookHtmlForSave` → carregar/editor/salvar | Protegido | Sanitizador existente reforçado, mantendo formatação e limite nativo de imagens |
| 24 | Anotação compartilhada/realtime → mesmas funções → `applyNotebookRealtimeUpdate`, editor | Protegido | Teste de resposta simulada e preservação de edição local |
| 25 | Títulos, áreas, descrição e mensagens do Caderno → escape/textContent → listas/cabeçalhos/status | Protegido | Escape existente mantido |
| 26 | Recursos estruturados do Caderno → escape/signed URLs do SDK → `caderno-recursos`, tabelas/setas/imagens | Protegido | Sem mudança em armazenamento ou contratos |
| 27 | Erros e revisões → escape/signed URLs → `caderno-erros` e revisão, cards/textos | Protegido | Não alterado |
| 28 | Flashcards e importação → parser inerte/escape/textContent → biblioteca/revisão | Protegido | Correção S01 da 7.1 preservada; testes Anki repetidos |
| 29 | Amigos, desafios e compartilhamento → escape; acessórios/variantes de catálogo → `amigos/studyrats/sharing`, cards | Protegido | Textos escapados; IDs numéricos/UUID e catálogo delimitam outros contextos |
| 30 | Cronograma, Dashboard e registro de questões → escape/números/rotas fixas → cards/formulários | Protegido | Sem alteração de regras ou cálculos |
| 31 | Estatísticas → chamadores escapam rótulos, formatam números e geram spans constantes → tabelas | Protegido | O helper de tabela aceita HTML intencional; rastreados os chamadores, sem escape indiscriminado |
| 32 | Onboarding/configurações → escape, estado controlado ou restauração de conteúdo previamente limpo → formulários | Protegido | Sem mudanças em preferências/persistência |
| 33 | Pesquisa e atalhos → rotas fixas + `encodeURIComponent`, textos escapados → `traube-command-center`, links | Protegido | Rotas construídas internamente; não aceita URL externa como rota |
| 34 | Histórico/execução PCR → escape/textContent + dados por proprietário → cards/modais/logs | Protegido | Isolamento da 7.1 preservado; testes PCR repetidos |
| 35 | Scores e campos textuais de conteúdo clínico → catálogo estático/escape/textContent/números → controles/resultados | Protegido | Fórmulas e conteúdo não alterados; exceções do Bulário tratadas acima |
| 36 | Shell/navegação/layouts → strings constantes/ícones de catálogo → templates DOM | Estático confiável | `innerHTML` estático não convertido indiscriminadamente |
| 37 | Apostila do repositório → JSON publicado controlado pelo projeto → `apostila-renderer`, HTML rico | Estático confiável | Não tratado como texto de usuário; mudança futura da origem exige reavaliar |
| 38 | Ícones médicos/monitor/PDF/loaders → catálogo ou caminho constante → SVG/`src` | Estático confiável | Sem `eval`, `new Function` ou `document.write` encontrados em `assets/js` |

## B. Correções e arquivos

Quatro causas principais: HTML remoto não sanitizado; parser ativo usado apenas para ler títulos; escape HTML confundido com validação de URL; dados JSON interpolados em atributos sem escape. O desembrulhamento do sanitizador também foi mantido no documento inerte.

- `assets/js/app.js`: único validador reutilizado `traubeSafeContentUrl`; notificações. HTTP/HTTPS sem credenciais são aceitos; caminhos locais absolutos/fragments/query são opcionais e restritos à mesma origem; `mailto` somente quando solicitado. Esquemas executáveis, controles, barras invertidas e URLs relativas a protocolo são rejeitados. Retorna a URL original válida, seguida de escape no contexto HTML.
- `assets/js/caderno.js`: sanitização antes de inserir HTML remoto; parser inerte; allowlist de tags, atributos e classes; eliminação de eventos, contêineres ativos e namespaces estrangeiros. Modo Notion mantém links seguros, código, blocos, imagens e identificadores necessários para salvar edições.
- `assets/js/caderno-notion-editor-fix.js`: aplica o mesmo sanitizador à carga no editor principal; sem mudar chamadas de integração.
- `assets/js/admin.js`, `assets/js/admin-editais.js`, `assets/js/apostila-tools.js`, `assets/js/editais-catalog.js`, `assets/js/editais.js`, `assets/js/trabalho-protocolos.js`, `assets/js/trabalho-receitas.js`, `assets/js/plantao.js`: URL validada nos pontos de apresentação identificados.
- `assets/js/bulario.js`: valida URLs e escapa atributos numéricos; fórmulas intactas.
- `tests/frontend-xss.test.cjs`: regressão com os renderizadores reais, queries/respostas Supabase simuladas, conteúdo sintético e editor Notion reaberto após salvar uma edição.
- `tests/plantao-flow.test.cjs`: fixture carrega o validador real de `app.js`, como a página faz, sem modificar expectativas de pontuação.
- `docs/security-stage72.md`: este relatório.

Os módulos já dependem de `app.js`, carregado antes deles nas páginas consultadas. Nenhuma nova biblioteca, carregador ou sanitizador paralelo foi introduzido. Não foram alterados modelos de dados nem contratos de eventos.

## C. Validação

Testes novos: 18 cenários direcionados, incluindo URL obfuscada, atributos/eventos, namespaces, HTML malformado, texto Unicode, formatação, tabelas, imagens autorizadas, conteúdo compartilhado, respostas simuladas, reabertura e edição Notion, clientes/feedback/filas Admin, notificações, Protocolos, Receitas, Bulário, Editais e debriefs Plantão.

Os testes extraem funções do código atual ou executam módulos inteiros, sem reimplementar a sanitização. jsdom usa execução de scripts habilitada e interceptação de recursos; não reproduz completamente carregamento de imagens/layout de um navegador.

Comando de regressão relacionado:

```text
node --test --test-isolation=none tests/frontend-xss.test.cjs tests/anki-security.test.cjs tests/pcr-session.test.cjs tests/app-security.test.cjs tests/client-persistence.test.cjs tests/functional-regression.test.cjs tests/ui-final-refinement.test.cjs
```

Resultado do comando acima: **65 testes aprovados, zero falhas**, incluindo os 18 novos cenários e as regressões da Etapa 7.1. As mensagens `FAKE_FAILURE/FAKE_OFFLINE/FAKE_QUOTA` são falhas simuladas intencionalmente pelos testes de persistência.

Verificação adicional: `node --test --test-isolation=none tests/plantao-flow.test.cjs tests/plantao.test.cjs` — 4 aprovações e 4 resultados de falha (três subtestes e o teste pai). As falhas de `af-unstable-ed` (0 vs. 100), `vf-arrest-ed` (57 vs. 100) e penalidade diagnóstica foram reproduzidas com a versão de `plantao.js` do HEAD, com as mesmas expectativas. São preexistentes. O teste unitário de pontuação passou. O motor não foi alterado e as expectativas não foram enfraquecidas. A dependência ausente do validador na fixture foi corrigida; o erro de referência deixou de ocorrer.

Verificação de sintaxe: `npm run check:syntax` — 187 blocos JS/CJS, zero erros. Diff revisado e `git diff --check` sem erros de whitespace. A suíte completa não foi necessária.

Chromium: fixture em `127.0.0.1`, com funções extraídas do HEAD e do código corrigido, dados sintéticos e nenhuma CSP. Foi reproduzida execução no leitor Notion, no parser de títulos e no clique de notificação antes da correção. Nos mesmos caminhos corrigidos não houve execução; no parser corrigido também não houve pedido do recurso sintético. Imagens HTTP permitidas no conteúdo Notion continuam carregando após inserção, com eventos removidos.

Comparação de conteúdo legítimo em claro azul, claro rosa, escuro azul e escuro rosa: mesmo HTML; mesmos estilos, fundo e dimensões dos elementos (tolerância subpixel de 0,1px). O teste comparou a fixture do conteúdo, não todas as páginas autenticadas. Não houve alteração de CSS, tokens ou HTML das páginas.

## D. Pendências e limites

- CSP fica para a Etapa 7.3. Existem scripts/handlers inline constantes, incluindo o fallback de imagem em `apostila-tools.js`; removê-los globalmente não faz parte desta execução.
- Os três subtestes clínicos preexistentes de `plantao-flow.test.cjs` continuam pendentes de investigação em escopo próprio; não representam uma aprovação completa da suíte clínica.
- URLs HTTP/HTTPS de referências podem apontar a hosts externos. Validar o esquema evita URLs executáveis, mas não certifica a reputação do destino. Imagens remotas podem gerar requisições/rastreamento; uma allowlist adicional precisaria considerar fontes legítimas.
- A política nativa de imagens compartilhadas continua reconhecendo caminhos de Storage por formato. Autorização, políticas de acesso e duração de signed URLs dependem do backend e não foram avaliadas nesta execução.
- Notion e Admin foram testados com respostas simuladas, sem usar contas, conteúdo real, RPCs, RLS ou Edge Functions de produção. A integração real precisa de smoke test em ambiente autorizado.
- IDs tratados como numéricos/UUID e HTML clínico estático pressupõem os tipos e a origem atuais. A mudança desses contratos requer nova análise contextual.
- Não se declara ausência total de XSS. O inventário amplo serve para rastrear próximos trabalhos; os fluxos detalhados e corrigidos têm as evidências descritas acima.
