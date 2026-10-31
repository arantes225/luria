# Correções consolidadas LUR-01 a LUR-07 — 23/10/2026

Base conferida: branch `ui-ux-redesign`, HEAD `efce1dbe`, igual à auditoria. Nenhum checkout, reset, pull, commit, push, merge, deploy ou alteração remota foi executado. As quatro alterações anteriores de navegação foram preservadas (`ui-app.css`, `ui-navigation-v2.js`, `mobile-bottom-navigation.test.cjs`, `work-hub.test.cjs`). Não houve mudança de design ou conteúdo clínico.

Os estados abaixo descrevem a correção local. Nenhum item está validado em produção.

| ID | Estado | Implementação e arquivos principais | Testes / dependência restante |
|---|---|---|---|
| LUR-01 | Parcialmente corrigido; proteção atômica implementada localmente | Migração `20261023120000_alex_atomic_budget.sql`; `professor-alex-gemini/index.ts`; clientes `professor-alex-gemini.mjs` e `professor-alex-companion.mjs`. Reserva transacional antes do provedor, exclusão por usuário, chave UUID vinculada ao conteúdo, finalização idempotente, modelos somente por configuração do servidor. | 9 testes novos de Edge + SQL/PGlite, mais 7 de integração existente. Exige migração, atualização da Edge e rollout coordenado. Confirmar contrato de contagem/limite do modelo efetivamente implantado. |
| LUR-04 | Corrigido localmente | `supabase.js`, `app.js`, `ui-navigation-v2.js`. Documento pertence a uma identidade: oculta/inativa o documento, invalida globals de usuário/permissões, bloqueia escrita owner-scoped e recarrega na troca de identidade. Bootstrap e importação do robô descartam resultados antigos. BFCache revalida antes de revelar a página. | 4 testes novos de sessão; PCR, navegação, bootstrap e isolamento existentes. Eventos Auth simulados em jsdom; validar também entre abas com o SDK e navegador implantados. |
| LUR-02 | Parcialmente corrigido | Novo `_shared/image-download.ts` e `optimize-apostila-image/index.ts`. HTTPS/443, sem credenciais, rejeição de IPs literais internos/reservados, até 3 redirects revalidados, timeout de 12 s, streaming com máximo de 8 MiB, MIME + assinatura PNG/JPEG/GIF/WebP, limite de dimensões no decoder. Admin permanece obrigatório. | 5 testes novos com rede simulada + 118 testes Edge existentes. IP conectado/DNS rebinding requer egress confiável. |
| LUR-03 | Pendente de infraestrutura; proteções existentes preservadas | `source-verifier.ts` continua sendo usado pelas funções legadas `question-factory-perplexity-audit` e `question-factory-perplexity-initial-batch`. Nenhum consumidor direto dessas funções foi encontrado no frontend atual. Implantação/uso real não confirmado. | Casos existentes de URL, IP, redirects e timeout aprovados; teste explicita a impossibilidade de inferir o peer IP de um Response. Nenhuma allowlist científica arbitrária, proxy ou desativação foi adicionada. |
| LUR-05 | Parcialmente corrigido | `app.js`: marca a gravação local antes do insert; resultado ambíguo impede repetição cega, inclusive após restauração. Rejeição SQL comprovada permite nova tentativa. `quick-chart-manager.js`: leitura expirada não faz mais update destrutivo no servidor. | Persistência, resposta perdida, filas e troca de usuário cobertas. Backend real das três tabelas não está definido suficientemente neste repositório; idempotência e CAS de servidor permanecem pendentes. |
| LUR-06 | Corrigido localmente | Novo `public-files.cjs` compartilhado entre `build-pages.cjs` e `csp-pages.cjs`. Inventário automático de 367 HTML rastreados/publicáveis; cinco páginas ganharam CSP; quatro políticas perderam `script-src unsafe-inline`; hashes de `resolver-questoes.html` corrigidos e hash obsoleto de Study Rats removido. | 378 testes CSP aprovados; sincronizador aprovado. Não se confunde CSP meta com `frame-ancestors` de cabeçalho. |
| LUR-07 | Parcialmente corrigido | `luria-lazy-vendors.js`, CSP e consumidores diretos: jsPDF 4.2.1 fixado com SRI SHA-384 e CORS anônimo, Tesseract 5.1.1 fixado. Sem nova dependência do produto ou atualização em massa. | 3 testes com UMD real do jsPDF, além dos testes do loader e das proteções de importação existentes. Visualização/rasterização completa no navegador, OCR, CDN em produção e bibliotecas embutidas permanecem com limites descritos abaixo. |

## Bloco A: reserva e reconciliação

A reserva utiliza o mesmo advisory lock por usuário do contador existente e debita todo o saldo disponível antes da primeira chamada externa. Isso permite somente uma operação em andamento por usuário. A Edge conta o input completo (system, histórico e PDF) com `countTokens` e exige que input + teto de saída, com o multiplicador de voz capturado, caiba na reserva. O teto de saída, prompts e modelos padrão existentes foram preservados; o campo `model` do cliente não escolhe mais o modelo.

Com consumo confirmado, a transação devolve a diferença e registra os tokens reais uma única vez. Consumo acima da estimativa é contabilizado; não é truncado para aparentar respeito ao orçamento. Se o provedor violar o limite documentado e exceder a reserva, o débito real fica registrado e o saldo fica zerado: isso exige investigação do provedor, não é uma garantia contra faturamento externo arbitrário.

Falha na contagem, antes de geração, libera a reserva. Depois de despachar geração, erro/timeout/metadata incompleta conservam o débito integral por incerteza. A finalização RPC admite uma repetição idempotente; se ambas falharem, a reserva continua debitada. Após 15 minutos, uma reserva pendente muda para `uncertain` na próxima reserva, sem estornar saldo. Resposta tardia não estorna operação já classificada como incerta. Não há expiração que reabra saldo potencialmente consumido.

Isso pode esgotar cautelarmente o saldo diário em uma falha do provedor; requer revisão operacional para reconciliar casos comprovadamente não cobrados. O ledger retém somente identificadores/hash/contabilidade, sem prompts ou respostas. Não remover chaves antigas sem definir a janela de idempotência. Exclusão do usuário segue o cascade já usado no contador.

A unidade continua sendo a cota de tokens ponderados do produto. O multiplicador de voz existente foi preservado; o custo monetário real da síntese TTS separada não passou a ser uma cota de faturamento medida. Não prometer teto em reais/dólares a partir dessa cota. Não foram feitas chamadas reais de IA.

## Bloco B: isolamento e compatibilidade

Logout, SIGNED_OUT e troca A→B retiram a visibilidade/interação do documento inteiro e tornam globals privados nulos, inclusive diante de atribuições tardias. O documento seguinte faz um bootstrap novo. TOKEN_REFRESHED da mesma conta não invalida a página. Dados persistidos do usuário não são apagados. A restauração por BFCache oculta a página até conferir a identidade atual.

Requisições já aceitas por um servidor não podem ser desfeitas por esse bloqueio; as proteções não substituem autorização/RLS. Validação real entre abas, sessão expirada no SDK, navegação BFCache e navegador instalado é etapa manual de homologação. As regressões locais usam eventos Auth controlados, não contas de terceiros.

## Bloco C: destinos externos

O otimizador só processa os quatro formatos raster descritos; SVG/HTML/formatos diferentes são rejeitados com mensagem de formato não suportado. A mudança não remove imagens já publicadas nem substitui conteúdo clínico. Um arquivo maior que 8 MiB ou com dimensões acima de 16000 por eixo / 40 milhões de pixels é rejeitado. O teste de dimensões ocorre no decoder; memória/CPU do codec WASM ainda dependem dos limites do runtime. Não há promessa de isolamento de decoder contra todo arquivo malformado.

`APOSTILA_IMAGE_ORIGINS`, opcional, aceita um array JSON de origens exatas, por exemplo origens aprovadas pela equipe editorial. Se configurado, cada redirect também precisa pertencer à lista; configuração inválida falha fechada. Sem uma lista de fornecedores documentada, nenhum domínio legítimo dinâmico foi bloqueado arbitrariamente. Uma allowlist DNS não substitui egress por IP.

A documentação atual do Deno expõe cliente HTTP com certificados, proxy e endereço local. `allowHost` permite configurar o cabeçalho Host; não valida o peer IP. Um lookup DNS separado continua sujeito a TOCTOU/rebinding. O fetch utilizado não fornece o socket conectado. A equipe de infraestrutura precisa confirmar o runtime Supabase e impor bloqueio de loopback, redes privadas, link-local/metadata, reservadas IPv4/IPv6, inclusive em redirects e novas resoluções. Alternativa: proxy de saída que resolva e valide o IP no ato da conexão, preserve validação TLS/SNI, limite redirects/bytes/tempo e impeça bypass direto. Nada dessa infraestrutura foi criado aqui.

Confirmar separadamente se as duas funções Perplexity continuam implantadas e quem as chama antes de decidir manutenção ou desativação.

## Bloco D: contratos externos necessários

Não foi encontrada definição autoritativa local de `study_sessions`, da tabela sincronizada pelo Passômetro ou de `external_quick_chart_portals`. A tabela mínima dos testes sociais é fixture, não contrato implantado. Nenhuma migração especulativa foi criada para esses dados.

- Sessões: contrato deve aceitar um identificador estável por proprietário e operação, impor unicidade no servidor e permitir consultar/repetir a mesma operação retornando a confirmação original. Duração/payload precisam ser vinculados à mesma operação; uma repetição divergente deve ser rejeitada. Confirmar compatibilidade com escritores antigos antes de escolher RPC/constraint/backfill.
- Passômetro: criação/edição/exclusão devem usar revisão ou comparação atômica equivalente, retornar conflito sem sobrescrever e devolver o estado atual para reconciliação. `updated_at` enviado pelo cliente não prova controle de concorrência.
- Cola Rápida: a mesma revisão precisa cobrir gravações autenticadas, endpoint externo, limpeza/expiração e exclusão. A implementação do endpoint externo não está disponível para impor esse contrato de forma consistente.

No cliente, um insert com resultado incerto permanece localmente marcado e bloqueia sua repetição e a substituição por nova sessão; isso evita duplicação cega ao custo de aguardar reconciliação. Não apagar esse registro para destravar sem confirmar o resultado no servidor. O evento `persist_uncertain` identifica esse estado; uma rejeição SQL de validação/integridade/permissão comprovada pode ser tentada novamente. Web Locks/filas existentes ajudam dentro do navegador e não garantem unicidade entre dispositivos. Dois dispositivos ainda podem sobrescrever Passômetro/Cola Rápida: não há falso CAS baseado apenas no cliente. Conflitos de versão reais são **não verificados**, por ausência do contrato remoto.

## Blocos E/F: CSP, CDN e testes

O inventário usa `git ls-files --cached` e exatamente o filtro de distribuição. Arquivos locais não rastreados não são publicados por esse build; incluir novos arquivos na futura revisão/commit é necessário. `docs`, `tests`, `scripts`, `supabase`, dependências e saída de build ficam fora da publicação. Nova página rastreada entra automaticamente na validação e falha se faltar CSP, houver handler inline ou loader externo não revisado. Exceções externas permanecem por URL exata, sem liberar uma origem CDN inteira.

Novas políticas: `aplicar/editais/index.html`, `aplicar/vocacao/index.html`, `demo-avc.html`, `gestante-animada-v1.html`, `plantao/personagens-luria.html`. Os três controles da demonstração foram ligados pelo novo `demo-avc-controls.js`, mantendo as mesmas funções. Editorial e Black November (duas aliases cada) agora usam hashes. As demais alterações HTML são de metadados CSP e pins/SRI CDN.

Ao carregar os helpers reais dos dois fixtures XSS antigos, o teste mostrou um `onerror` constante gerado pela fila do Admin. Ele foi convertido em listener de captura único em `admin.js`, mantendo o fallback e sem afrouxar CSP. As expectativas de imagem agora verificam `hidden` e a mensagem real, com cenários XSS preservados. Os fixtures de proprietário foram separados dos testes do limite Auth/documento: módulos continuam testados com mudança de owner, e os testes novos executam `supabase.js` real em jsdom. Fixtures de bootstrap ganharam APIs de navegador ausentes; Work usa frames determinísticos em vez de atraso fixo e isola a importação do robô, testada separadamente.

Inventário CDN direcionado:

| Recurso | Versão / tratamento |
|---|---|
| jsPDF | 2.5.2 e URL dinâmica substituídos por 4.2.1; SHA-384 validado nos bytes e seis consumidores diretos. Loader sob demanda também exige o mesmo SRI. |
| Tesseract | Entrada `@5` passa a `@5.1.1`; worker/core já tinham caminhos 5.1.1. Dados de idioma do loader padrão usam caminhos de modelo 4.0.0/4.0.0_best_int sem pin de pacote npm; permanecem uma dependência de dados externa, não declarada íntegra por esta mudança. OCR real não executado. |
| PDF.js | 3.11.174 permanece: os quatro `getDocument` mantêm `isEvalSupported:false`, sem script unsafe-eval. Não foi feita migração de API ESM/worker. Validação de PDF importado continua limitada aos testes existentes; não se afirma upgrade nem eliminação de todo risco da versão. |
| JSZip / sql.js / fzstd | 3.10.1 / 1.11.0 / 0.1.1, fixados; mantidos. |
| html2canvas / diff_match_patch / Chart.js | 1.4.1 / 20121119 / 4.4.7, fixados; mantidos. |
| html2pdf no Passômetro | Bundle 0.10.1 fixado, mantido. Sua cópia interna de jsPDF não é atualizada pelo pin do loader global; não se demonstrou exposição do fluxo clínico aos métodos vulneráveis neste trabalho. Atualização do bundle exige revisão/teste próprio de renderização, sem promessa de correção de suas transitivas. |

Os avisos de jsPDF analisados incluem ReDoS de addImage e correções posteriores. Exportadores de Flashcards/Erros normalizam imagens via canvas e o Caderno rasteriza o conteúdo; não foi demonstrada exploração por string de imagem arbitrária nesses caminhos. A troca preventiva foi testada com UMD real 4.2.1, helpers reais de layout e PDFs gerados; o canvas no teste de paginação foi controlado, sem alegar verificação visual completa do navegador. O PCR usa API real de texto/save com registro sintético. SRI não foi generalizado a workers/WASM/bundles legados.

Regressão: **650 cenários distintos aprovados**, considerando a execução direcionada de 650 (647 aprovados inicialmente) e a repetição dos arquivos afetados após corrigir fixtures/ambiente. Na repetição final, os 11 testes desses arquivos passaram; não há falha conhecida restante no conjunto selecionado. Nenhum teste foi omitido por skip nessa execução. Não foi executada a suíte global.

Arquivos de teste executados: `app-security`, `frontend-xss`, `anki-security`, `csp`, `service-worker`, `pcr-session`, `edge-security`, `professor-alex-gemini`, `alex-atomic-budget`, `image-download-security`, `session-invalidation`, `cdn-pdf-compatibility`, `client-persistence`, `quick-chart`, `stage77-integrity`, `lazy-vendors`, `professor-alex-startup`, `mobile-bottom-navigation`, `work-hub` (todos `.test.cjs`). Os 378 testes CSP incluem as 367 páginas. A suíte clínica do Simulador de Emergência não foi repetida.

PGlite 0.3.14 e PostCSS 8.5.30, já declarados no projeto, foram disponibilizados apenas em diretório temporário. A execução SQL usa as tabelas/funções reais relevantes das migrações; dependências administrativas não relacionadas foram excluídas do fixture. PGlite é uma instância local serializada: não substitui testes com conexões concorrentes no PostgreSQL/Supabase implantado. A Edge real é executada com I/O de provedor simulado. Nenhuma consulta SSRF real a IP privado foi realizada.

Para reproduzir: `NODE_PATH` deve incluir os módulos de teste declarados; `TRAUBE_JSPDF_TEST_BUNDLE` aponta para o UMD revisado 4.2.1 cujo SHA-384 é conferido pelo teste. Sem essa variável, o teste de biblioteca real informa skip explícito. Em ambiente sem restrições de spawn, executar Node 24 com `node --test --test-isolation=none` e os arquivos acima. O sincronizador é `node scripts/sync-csp.cjs`. Sintaxe dos nove JS/MJS alterados, parsing dos TypeScript alterados e `git diff --check` foram conferidos; parsing Node não é typecheck do Deno.

## Implantação manual e limites de validação

1. Revisar e incluir todos os arquivos novos da alteração; obter contratos/configurações de homologação. Fazer backup e confirmar as migrações de orçamento anteriores aplicadas.
2. Publicar primeiro o frontend com `request_id` (o handler antigo ignora o campo extra), em janela controlada. Isso não corrige o servidor antigo sozinho.
3. Pausar novas invocações de IA e drenar requisições da versão antiga. Não manter handlers antigos e novos atendendo simultaneamente: a contabilização antiga não usa o ledger novo.
4. Aplicar **somente após revisão** a migração versionada `20261023120000_alex_atomic_budget.sql` como transação; ela usa o schema de orçamento já existente e concede os novos RPCs apenas a service_role.
5. Implantar `professor-alex-gemini` e validar em homologação modelos/secrets, countTokens incluindo PDF/system/history, teto de saída incluindo pensamento, custo/limites TTS, concorrência com múltiplas conexões e estados de falha. Retomar tráfego apenas após esses testes. Handler novo sem migração falha fechado; cliente antigo sem request_id recebe 400 e precisa recarregar. Não fazer rollback isolado do handler para o fluxo antigo.
6. Configurar e validar egress antes de considerar LUR-02/03 encerrados; revisar opcionalmente as origens editoriais e implantar `optimize-apostila-image`. Nenhuma função Perplexity deve ser desativada sem confirmar consumidores.
7. Publicar assets/frontend e HTML com CSP/pins da mesma versão. Verificar caches/PWA/CDN sem enfraquecer políticas ou alterar Service Worker aqui. Testar logout/troca de conta entre abas, BFCache, exportações, OCR e navegação em navegador real.
8. Implementar LUR-05 somente quando a equipe Supabase fornecer contratos verificáveis de unicidade/revisão e compatibilidade com escritores legados.

Não verificados: deploys/configuração/RLS reais, migrations em produção, faturamento/IA real, peer IP do fetch, egress, endpoints externos ausentes, CAS remoto e compatibilidade visual completa de PDFs/OCR em dispositivos. O workflow de publicação e suas permissões não foram alterados; apenas a fonte do inventário usada pelo build e pelo gate CSP foi compartilhada.

## Arquivos desta correção

- JavaScript do produto: `assets/js/admin.js`, `app.js`, `supabase.js`, `ui-navigation-v2.js`, `quick-chart-manager.js`, `luria-lazy-vendors.js`, `professor-alex-gemini.mjs`, `professor-alex-companion.mjs` e novo `demo-avc-controls.js` (todos em `assets/js/`).
- Publicação/CSP: `scripts/public-files.cjs` (novo), `scripts/build-pages.cjs`, `scripts/csp-pages.cjs`, `scripts/sync-csp.cjs`.
- Edge/SQL: `supabase/functions/professor-alex-gemini/index.ts`, `supabase/functions/optimize-apostila-image/index.ts`, novo `supabase/functions/_shared/image-download.ts`, nova `supabase/migrations/20261023120000_alex_atomic_budget.sql`.
- HTML: `aplicar/editais/index.html`, `aplicar/vocacao/index.html`, `black-november.html`, `black-november/index.html`, `caderno-erros.html`, `caderno-erros/index.html`, `caderno.html`, `caderno/index.html`, `demo-avc.html`, `editorial.html`, `editorial/index.html`, `flashcards.html`, `flashcards/index.html`, `gestante-animada-v1.html`, `jogos/study-rats/index.html`, `plantao/personagens-luria.html`, `questoes-simulados.html`, `questoes-simulados/index.html`, `resolver-questoes.html`, `trabalho/pcr/executar/index.html`, `trabalho/pcr/historico/index.html`.
- Testes novos: `tests/alex-atomic-budget.test.cjs`, `tests/image-download-security.test.cjs`, `tests/session-invalidation.test.cjs`, `tests/cdn-pdf-compatibility.test.cjs`.
- Testes/fixtures atualizados: `tests/app-security.test.cjs`, `tests/client-persistence.test.cjs`, `tests/csp.test.cjs`, `tests/fixtures/app-client.cjs`, `tests/frontend-xss.test.cjs`, `tests/professor-alex-gemini.test.cjs`, `tests/professor-alex-startup.test.cjs`, `tests/quick-chart.test.cjs`, `tests/work-hub.test.cjs`.
- Documentação: este relatório. Alterações anteriores em CSS e no teste mobile não foram modificadas por esta correção.

Referências primárias consultadas: [countTokens](https://ai.google.dev/api/tokens), [limite de tokens incluindo pensamento](https://ai.google.dev/gemini-api/docs/generate-content/thinking?hl=en), [cliente HTTP Deno](https://docs.deno.com/api/deno/fetch/), [avisos jsPDF](https://github.com/parallax/jsPDF/security/advisories), [release jsPDF 4.2.1](https://github.com/parallax/jsPDF/releases/tag/v4.2.1).
