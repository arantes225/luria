# Validação integrada final — etapas 7.1–7.7

Data: 12/10/2026. Branch: `ui-ux-redesign`. Base: `26e338acb28153f4d6b50cc4ca61f35b178a9f3c`.

## A — Resumo executivo

**B — Apto com ressalvas para homologação dos fluxos locais exercitados. Produção não aprovada por esta execução.**

Os 252 testes automatizados executados passaram; sintaxe e geração CSP permaneceram consistentes. Chromium confirmou navegação, respostas digitais, importação Anki, formulários do Passômetro, interação PCR e integração do simulador com casos locais. Não foi reproduzido P0/P1 nos cenários cobertos.

Foi reproduzido **V01/P2**, erro de atualização de métricas após importação Anki em Configurações. A importação salva os cards sintéticos antes do erro; a importação pela página principal de Flashcards funcionou sem o erro. **V02/P3** é uma referência canônica sem alvo local, sem impacto de carregamento demonstrado. Nenhum dos achados foi corrigido nesta etapa, conforme solicitado.

RLS/RPCs, autorização implantada, idempotência, concorrência entre dispositivos, SSRF residual, casos publicados, dispositivos PWA e execução remota do pipeline continuam pendentes. Não houve acesso administrativo real, escrita remota, instalação, commit, merge, push ou deploy.

## B — Cobertura e ambiente

- Windows/PowerShell, Node `24.11.1`, jsdom `29.0.1` já instalado; Chromium do navegador interno do Codex.
- Repositório inicialmente limpo. Comparação SHA-256 dos **716 arquivos rastreados** com a linha de base confirmou zero alterações. Único arquivo criado no repositório: este relatório.
- Consultados os relatórios existentes `security-stage72.md`, `security-stage73.md`, `security-stage74.md`, `security-stage75.md`, `security-stage76.md` e `security-stage77.md`; o primeiro inclui o contexto da 7.1. Não foram repetidas auditorias gerais.
- Páginas reais, scripts e estilos locais servidos em `127.0.0.1:4287`; SDK/consultas substituídos por fixtures sintéticos, com bloqueio dos demais fetches para o backend Supabase real. A CSP original permaneceu ativa. Registro PWA excluído desse harness; worker avaliado separadamente.
- Amostra CSP em `127.0.0.1:4288`. PWA em origem descartável `127.0.0.1:51898`, usando o worker real, respostas privadas artificiais e interrupções controladas dos sockets. Artefatos temporários fora do repositório. Servidores e abas de teste encerrados; override de viewport restaurado. Somente caches das origens PWA descartáveis foram removidos.
- Não avaliados integralmente: demais módulos, corpus OCR/PDF, Notion/OAuth, IA/integrações externas, autenticação real, autorização por PIN, backend, histórico de várias tentativas inexistente no leitor e protocolos médicos completos. Não foram executadas suítes clínicas completas.

## C — Testes automatizados e integridade

Executados uma vez, com dependências existentes:

```text
node scripts/check-syntax.cjs
node scripts/sync-csp.cjs
node --test --test-isolation=none tests/stage77-functional.test.cjs tests/stage77-questions.test.cjs tests/stage77-integrity.test.cjs tests/client-persistence.test.cjs tests/quick-chart.test.cjs tests/anki-security.test.cjs tests/pcr-session.test.cjs tests/frontend-xss.test.cjs tests/edge-security.test.cjs tests/service-worker.test.cjs tests/landing.test.cjs tests/passometro-html.test.cjs
git diff --check
```

| Verificação | Resultado |
| --- | --- |
| Sintaxe JavaScript/CJS e blocos inline | 204 blocos; zero erros |
| Gerador CSP, modo somente leitura | 96 páginas; hashes/políticas sem divergência |
| Regressões automatizadas | **252 aprovadas; 0 falhas, 0 canceladas, 0 ignoradas, 0 todo** |
| JSON locais da inspeção | 34 parseados; zero erros |
| Referências estáticas nas 96 páginas do inventário | 1.888 referências verificadas; uma canônica sem alvo local, V02 |
| Imports/requires relativos literais | 29 referências em inventário de 114 JS/CJS/MJS; nenhum alvo ausente |
| Diff/arquivos | `git diff --check` aprovado; aplicação inalterada |

O parser CSS do jsdom emitiu avisos sobre estilos existentes durante a checagem CSP; não foram falhas de hash nem erros de renderização do Chromium. A inspeção de referências/imports é estática: não comprova todos os caminhos gerados dinamicamente, resolução por bundler ou URLs no servidor implantado. Parsing HTML em jsdom não equivale a certificação por um validador HTML formal.

As cinco suítes do gate de publicação estão incluídas nessa execução de 252 testes. Não foi repetido `npm ci`, pois a instalação não estava autorizada. Mocks de RPC/rede não demonstram garantias do servidor.

## D — Chromium: páginas e fluxos

| Página/fluxo | Evidência nesta execução |
| --- | --- |
| `/` | CSS, fontes e imagens renderizados; links principais inspecionados; menu mobile abre e fecha com Escape. Sem login real. |
| `/dashboard/` | Shell, ofensiva, perfil e navegação; quatro combinações de tema; desktop e mobile. |
| `/flashcards/` | Carrossel anterior/próximo em desktop/mobile; início da revisão, revelação e avaliação avançam para o próximo card; encerramento retorna aos decks. |
| `/configuracoes/flashcards/` | Inicializa sem erro; APKG legado gera prévia e confirma importação de três cards; erro posterior V01. |
| `/flashcards/`, importação | APKG derivado sintético contendo `script`, `onerror` e link `javascript:` vira texto seguro na prévia; zero desses elementos executáveis na prévia e nenhum marcador de execução no DOM. Importação confirma três cards sem novo erro de console. ZIP/SQLite/WASM carregaram sob CSP ativa. |
| `/caderno/` | Abrir nota sintética e retornar à biblioteca por ambos os controles; segundo retorno exercitado por Enter. |
| `/questoes-simulados/` e `/resolver-questoes/?set_id=s1` | Biblioteca abre conjunto sintético de três questões e restaura revisão; fluxo detalhado abaixo. |
| `/configuracoes/` e `/configuracoes.html` | Página completa salva dias no fixture; compacta muda controle disponível. Sem TypeError de inicialização. A compacta normaliza o endereço para `/configuracoes/`. |
| `/trabalho/passometro/` | Sem código-fonte visível; criar passômetro/paciente, abrir edição, salvar nome alterado, voltar e buscar termo inexistente. Estado sintético reaparece após reload. Desktop/mobile, claro/escuro. PDF/impressão não exercitados nesta execução. |
| `/trabalho/pcr/` e `/trabalho/pcr/executar/` | Iniciar/retomar, selecionar FV e registrar choque; contador e timeline atualizam. Exportação/encerramento não exercitados no Chromium. |
| `/plantao/sala-emergencia/` | Lista, seleção de casos, catálogo de ações, prontuário/monitor, diagnóstico, confirmação final e debriefing usando casos locais; ver F. |
| `/apostilas/` e `/apostilas/cancer-de-mama/` | Biblioteca e documento público carregam; link entre as páginas funciona; estrutura e conteúdo renderizados sob CSP. Sem revisão do conteúdo médico. |
| `/admin/` | Interface apresenta a proteção por PIN. Não criado/alterado PIN nem contornada a barreira. Formulário monetário e mensagens foram verificados em jsdom, não no navegador autenticado. |

**Questões:** primeira resposta falha por injeção controlada; seleção preservada, gabarito não revelado e contadores inalterados. Retry explícito confirma a resposta, com controles bloqueados durante o envio. Duplo clique na segunda resposta produz uma única gravação. Com uma correta, uma incorreta e uma em branco: 50%, 1/1/1. Reload recupera as confirmadas e abre a primeira em branco. Terceira correta: 67%, 2 acertos, 1 erro, 0 em branco, 3 questões. Revisão conserva a alternativa registrada; cronômetro exibido avança. Não foi criada uma tela de encerramento: o leitor existente conclui quando todas as respostas estão registradas; conclusão do estudo guiado foi coberta automatizadamente.

**Visual:** landing, Dashboard, Flashcards e leitor digital observados em desktop e `390 × 844`; Dashboard e demais verificações desktop em `1440 × 900`. Shell/Dashboard nas quatro combinações claro/escuro × azul/rosa; Passômetro mobile claro e escuro azul. Não observados sobreposição, cards cortados ou controles inacessíveis nas amostras estabilizadas. Isso não é comparação pixel a pixel nem cobertura de todas as páginas/temas/dispositivos.

**Console/rede:** único erro funcional inesperado observado foi V01. Falha de salvamento, respostas 503 offline e seis violações CSP da sonda foram deliberadas. Sem outros erros relevantes observados nos fluxos descritos; não significa monitoramento completo de toda requisição. A primeira tentativa da sonda PWA falhou por um caminho Windows mal normalizado no artefato temporário; corrigido somente no harness, e a amostra passou em outra origem isolada.

## E — Segurança 7.1–7.5

| Controle | Estado e limite |
| --- | --- |
| XSS/Anki 7.1 e frontend 7.2 | Regressões automatizadas aprovadas; APKG com HTML malicioso sintético sanitizado no Chromium. Não é nova auditoria de todos os sinks. |
| Isolamento PCR | Troca de usuário e respostas assíncronas antigas verificadas nos testes `pcr-session`; fluxo PCR também funciona no Chromium. Troca de conta real não testada. |
| CSP 7.3 | 96 páginas consistentes no gerador. Dashboard real bloqueou inline, handler, `javascript:`, `data:`, origem não autorizada e `eval`; scripts legítimos continuaram operando nas páginas navegadas. Nenhuma política alterada. |
| CORS 7.4 | Testes locais das funções aprovados. Configuração/consumidores implantados não verificados. |
| SSRF 7.4 | **Parcialmente mitigado**; S03 não eliminado. DNS prévio não garante IP efetivamente conectado; necessidade externa preservada. |
| PWA 7.5 | Suíte automatizada aprovada e **13 asserções da amostra Chromium aprovadas**: ativação/limpeza legada, controle, online, A/B privados, exclusão de Admin/API do Cache Storage, URL exata offline, outra versão 503, HTML offline, recuperação e atualização sem reload com novo namespace. Navegação pública por link também confirmada online/offline/retorno. |

O teste de atualização usa uma revisão sintética que muda somente o namespace do worker servido pelo harness; não valida uma release publicada. Respostas públicas/privadas do harness não equivalem aos headers do GitHub Pages/Supabase. Cache Storage foi inspecionado diretamente; requisições privadas usaram `cache: no-store` para não confundir com cache HTTP. localStorage serviu à persistência sintética dos módulos; IndexedDB e cache HTTP não receberam auditoria completa. Coordenação entre abas e dispositivos continua externa.

## F — Funcionalidade 7.6–7.7 e achados

**7.6:** três casos locais cobriram os quatro smokes solicitados. FA: cardioversão sincronizada reconhecida no prontuário; hipótese incorreta seguida da correta e destino final produziram debriefing **96/100, penalidade −4**. Sepse: antibiótico do caso reconhecido, monitorização mostra sinais, diagnóstico/destino encerram; fluxo parcial **67/100**. FV: RCP reconhecida; tentativa de choque antes de pads bloqueada pela sequência existente, registrada no debriefing **63/100, penalidade −2**. Não são execuções de protocolos completos nem aprovação médica dos escores; demonstram interface → ações/motor → debriefing. Sessões/resultados foram gravados apenas no fixture. Casos publicados e cardioversão equivalente no Supabase não verificados.

**7.7:** retornos do Caderno e inicializações confirmados no Chromium e testes; referências obsoletas tratadas continuam cobertas pela regressão; parser monetário distingue zero, vazio, inválido, negativos, separadores e não finitos antes da RPC nos testes. Respostas digitais/retomada verificadas no navegador. Heartbeat de Flashcards após falha e isolamento de conta verificados automatizadamente; recuperação de heartbeat/troca de conta não exercitadas no Chromium. I01/I02 mantêm proteções de cliente sem garantia remota.

### V01 — P2, defeito comprovado: atualização após importar em Configurações

1. Abrir `/configuracoes/flashcards/` com o fixture autorizado sintético.
2. Selecionar `tests/fixtures/anki-legacy.apkg`, aguardar prévia e importar.
3. A interface confirma três cards importados, mas o console registra `TypeError: Cannot set properties of null (setting 'textContent')`.

Causa localizada: `assets/js/flashcards.js:4774` chama `loadMetrics()` após a importação; `loadMetrics`, linha 548, escreve em um indicador ausente nessa página. A proteção de inicialização não cobre esse refresh posterior. O armazenamento sintético foi confirmado pelo total de 17 cards ao voltar à página principal (14 iniciais + 3 importados). A importação pela tela principal foi exercitada depois com outro APKG sintético e terminou sem novo erro. Impacto localizado no refresh; não foi demonstrada perda dos cards. Correção depende de autorização posterior; não modificar cálculos/contratos.

### V02 — P3, inconsistência estática

`ambientacao.html:111` declara `rel="canonical" href="/ambientacao/"`, sem esse diretório no checkout. É metadado, não stylesheet/imagem solicitado pelo navegador. Não foi demonstrado 404 de recurso funcional nem comportamento do hosting nessa rota. Confirmar URL canônica publicada antes de eventual correção.

## G — GitHub Actions/publicação

Inspecionado `.github/workflows/deploy-pages.yml`: `push` em `main` e `workflow_dispatch`; Node 24; lockfile presente; `npm ci --ignore-scripts`; sintaxe, CSP somente leitura e cinco suítes determinísticas. Os paths existem e esses comandos de validação passaram localmente com dependências disponíveis.

`deploy` possui `needs: quality`, sem condição que ignore falha; pela estrutura do workflow, falha do gate impede o job dependente. `quality` tem apenas `contents: read`; permissões de publicação são `pages: write`/`id-token: write`; checkout separado no deploy não reutiliza `node_modules` do job de testes. Artefato usa `path: .`; ações e ambiente `github-pages` referenciados corretamente na inspeção. Não foram alterados eventos, permissões ou arquivos.

Validação estática/execução local, **não execução real do GitHub Actions**. YAML não passou por ferramenta externa de lint nem por instalação limpa em runner Linux. A falha deliberada do gate não foi provocada remotamente. Observar o próximo run e seu artefato somente após push autorizado.

## H — Pendências externas

| ID / responsável provável | Impacto, evidência e próxima ação |
| --- | --- |
| I01 / equipe Supabase | Resposta perdida pode duplicar sessões; proteções locais/testes não provam idempotência RPC/insert. Definir identificador estável, unicidade e confirmação recuperável no servidor. |
| I02 / equipe Supabase | Passômetro/Cola Rápida não possuem gravação CAS autoritativa; upserts/timestamps de cliente não impedem sobrescrita multidevice. Avaliar revisão condicional e conflitos/tombstones atômicos. |
| S03 / responsável Edge Functions/infraestrutura | SSRF parcialmente mitigado; IP efetivamente conectado e uso das funções Perplexity não confirmados. Confirmar consumidores/implantação e solução de saída segura antes de considerar mitigação completa; não desativar por hipótese. |
| CLIN-PUB / equipe Supabase + médico responsável | Casos locais usados aqui; corpus publicado não comparado. Conferir equivalência da cardioversão e ações publicadas em homologação, sem inferir aprovação médica deste smoke. |
| PWA-REAL / frontend + QA | Amostra local passou; abas simultâneas, sessões longas, assets imutáveis por release e dispositivos reais não verificados. Executar matriz controlada de atualização em homologação. |
| AUTH-RPC / equipe Supabase + QA | Backend sintético; RLS, RPCs administrativas, conflito único de tentativas, PIN e autorização implantada não comprovados. Testar contas autorizadas e cenários negativos em staging. |
| HOST-CORS / hospedagem + Edge Functions | Headers, CORS efetivo, paths e SW dependem do deployment. Conferir respostas reais e preflight em ambiente autorizado. |
| CI-REMOTE / responsável publicação | Gate inspecionado/local; runner, instalação limpa e artefato remoto não exercitados. Observar execução real após futuro push autorizado, inclusive bloqueio por falha. |

V01 e V02 são pendências locais, separadas dos riscos externos. Exportações/PDF/OCR, troca de usuário no Chromium e fluxos não cobertos devem permanecer explicitamente não verificados, sem serem classificados como falhas.

## I — Recomendação final

1. **Prontidão local:** B. Testes executados aprovados e navegação principal exercitada, com V01/P2 e V02/P3 documentados. Código preservado; não afirmar ausência de defeitos fora da cobertura.
2. **Homologação:** encaminhar os fluxos cobertos para staging com contas/dados autorizados; preferir importação pela página principal até tratar V01. Operações administrativas, recuperação após resposta perdida, edição concorrente e integrações exigem as verificações externas descritas.
3. **Produção:** não aprovada automaticamente. Exige evidência real de autorização/persistência, hospedagem/CORS, casos publicados, PWA/dispositivos e pipeline, além da avaliação dos achados locais pelo usuário.

Aguardar avaliação do usuário. Nenhuma correção automática ou publicação realizada.

## Pós-validação — correções V01 e verificação V02 (12/10/2026)

Esta seção registra uma execução posterior autorizada. Os resultados, a contagem de 252 testes e a classificação da validação original acima permanecem históricos; não houve nova validação integrada completa.

### V01 — corrigido e verificado localmente

- Causa confirmada: quatro textos em `loadMetrics()` pressupunham elementos que não existem em `/configuracoes/flashcards/`. A rotina agora atualiza somente indicadores presentes, com as mesmas consultas, somas, arredondamento, barras e retenção. Nenhum indicador artificial, captura genérica de exceções ou remoção de refresh.
- A reprodução no Chromium revelou uma segunda exceção no mesmo refresh: `loadLibrary()` chamava `renderLibrary()`, que acessava filtros inexistentes na tela compacta. `renderLibrary()` agora retorna quando o contêiner `library-list` está ausente, antes de consultar filtros. Os dados da biblioteca continuam carregados; a tela completa continua renderizando e contando os cards.
- Dez regressões novas executam funções/listeners reais com DOM das duas páginas e fronteiras de SQLite/Supabase simuladas: indicadores completos, ausência de cada um dos quatro textos, ausência total legítima, zero/retenção indisponível, propagação de falha não relacionada, importação nas duas telas, payload sanitizado, persistência sintética e renderização da biblioteca. Antes da correção, seis dessas regressões reproduziram o TypeError de métricas. A regressão pós-importação foi ampliada para executar também `loadLibrary()`/`renderLibrary()` reais após a segunda exceção observada.
- Chromium em origem isolada `127.0.0.1:5291`: importação compacta com APKG contendo `script`, `onerror` e URL `javascript:` produziu prévia de texto seguro, confirmou três cards e terminou sem erro/aviso no console. A página principal também importou um APKG legado de três cards sem erro; métricas/biblioteca refletiram os lotes e permaneceram disponíveis após reload. CSP original ativa, nenhum marcador de execução maliciosa nem elemento executável na prévia. SDK/persistência sintéticos; backend real não validado.

### V02 — mantido como pendência P3, sem alteração por suposição

- Existe `ambientacao.html`, sem diretório `ambientacao/`; o inventário CSP e o link de `questoes-simulados.html` referenciam o arquivo `.html`.
- Entretanto, a própria página contém canonical `/ambientacao/` e script `history.replaceState` que muda o endereço `.html` para essa rota. Esse script muda a barra de endereço, mas não comprova que uma requisição direta à rota seja atendida.
- O workflow publica o checkout estático, sem etapa de geração dessa rota; o `404.html` local trata caminhos curtos como acesso público ao prontuário, não como alias de Ambientação. `CNAME` aponta para `www.resibulando.online`. Isso confirma a inconsistência local, mas não estabelece eventual roteamento/proxy remoto nem qual URL é oficialmente atendida.
- Tentativas de leitura pública de `https://www.resibulando.online/ambientacao.html` e `https://www.resibulando.online/ambientacao/` não ficaram acessíveis pelo verificador web; nenhum status HTTP remoto conclusivo foi obtido. Não interpretar essa limitação como 404 comprovado.
- Próxima ação: o responsável pela hospedagem deve confirmar resposta direta/status e eventuais redirects/rewrites das duas URLs, além da URL oficial pretendida. Só então alinhar canonical; caso a rota sem extensão não exista, avaliar separadamente a normalização por `history.replaceState`. Nenhuma mudança de SEO, navegação ou publicação realizada aqui.

### Estado final desta rodada

- Arquivos alterados: `assets/js/flashcards.js`, `tests/flashcard-metrics-import.test.cjs` e somente esta seção acrescentada a `docs/final-integrated-validation.md`.
- **26 testes direcionados aprovados, zero falhas nos resultados finais**: 10 novos de métricas/importação, 14 existentes de Anki e 2 de inicialização/revelação da resposta.

```text
node --test --test-isolation=none tests/flashcard-metrics-import.test.cjs tests/anki-security.test.cjs
node --test --test-isolation=none --test-name-pattern='^(Flashcard creation/import settings|Review-only answer control)' tests/stage77-functional.test.cjs
node --check assets/js/flashcards.js
node --check tests/flashcard-metrics-import.test.cjs
git diff --check
```

- Sintaxe e revisão do diff aprovadas. Nenhum HTML, CSS, script inline ou hash foi alterado; não foi necessário regenerar CSP. Conferência visual desktop da biblioteca sem regressão observada e conferência funcional das duas telas de importação; nenhuma alteração de apresentação. Não repetida a matriz de temas/mobile da validação original.
- V01 encerrado localmente; V02 continua P3. As pendências externas de H permanecem, sem validação remota ou nova aprovação para produção. Servidor/aba temporários encerrados. Sem dependências novas, alterações remotas, commit, push, merge ou deploy.
