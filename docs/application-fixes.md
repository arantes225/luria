# Luria — relatório das correções da aplicação

Data: 09/10/2026. Base: `b17c47b5d8b697a5074543be05fb859cb2fd7b05`. A árvore do repositório estava limpa antes da implementação.

## Escopo e resultado

Foram implementadas as correções autorizadas no cliente, nas dependências e nos testes. Nenhum SQL, Edge Function, configuração de infraestrutura, workflow de publicação, CSS ou dado de produção foi alterado. Não houve commit, push ou deploy.

Os cinco prompts estáticos de cada rota Admin foram sincronizados com o módulo canônico mediante autorização específica. `assets/js/question-factory-prompts.js` permaneceu intacto. O usuário decidiu deixar equivalências clínicas pendentes para revisão; prazos, fórmulas, pesos e regras de pontuação não foram alterados. A única mudança no motor clínico foi corrigir duas expressões regulares Unicode.

**O trabalho não está totalmente resolvido:** F4–F6 têm garantias que dependem do servidor; F10/F12 dependem da equipe Supabase; F11 ainda detecta três cenários clínicos pendentes. A suíte completa permanece reprovada, sem testes desabilitados.

## Resultado por achado

Caminhos abaixo são relativos à raiz deste repositório. O nome da rota editorial pública é omitido porque contém um código de acesso.

| ID | Status | Arquivos modificados | Solução implementada | Testes executados | Resultado | Riscos restantes |
|---|---|---|---|---|---|---|
| F1 | Corrigido no cliente | `assets/js/supabase.js`, `assets/js/clinical-bridge.js`, `assets/js/app.js`, `assets/js/quick-chart-manager.js`, `trabalho/passometro/index.html`, `trabalho/prescricao/index.html` | Armazenamento por UID estabelecido pelo Auth; proteção contra resposta inicial tardia; cancelamento de operações ainda não enviadas; limpeza dos diálogos e conteúdo visível na troca de conta; dados legados sem proprietário não são adotados. | `app-security`, `client-persistence`, `quick-chart`: contas A/B, logout, resposta tardia, diálogos e rascunhos. | Aprovados. | Dados locais continuam sem criptografia e acessíveis ao navegador/perfil do dispositivo. RLS e autorização de servidor não foram verificadas. Dados antigos sem proprietário requerem recuperação supervisionada. |
| F2 | Corrigido por mitigação | `assets/js/cronograma.js`, `assets/js/onboarding.js`, `assets/js/questoes-simulados.js` | `isEvalSupported:false` em todas as quatro chamadas de PDF.js; mesma versão de biblioteca e worker preservada. | Verificação de todos os carregadores; PDF fictício com PDF.js 3.11.174 real: extração de texto e lista de operadores. | Aprovados. | Versão antiga permanece. A mitigação cobre CVE-2024-4367; não equivale à atualização completa ou à validação de todos os tipos de PDF. |
| F3 | Corrigido | `assets/vendor/xlsx-0.20.3.js`, respectiva licença; oito rotas enumeradas abaixo | SheetJS 0.18.5 substituído pela distribuição completa oficial 0.20.3, servida localmente. | Leitura real de CSV/XLS/XLSX gerados, incluindo Unicode, células vazias, zero e número serial de data. | Aprovados; versão e hash conferidos. | Não cobre todas as planilhas possíveis nem garante consumo limitado de memória em arquivos muito grandes. |
| F4 | Parcialmente corrigido | `assets/js/app.js` | Identidade local da sessão e proprietário; finalizações coalescidas; início serializado; estado retido após falha; respostas antigas não apagam sessão nova; Web Locks quando disponíveis; falha de limpeza após confirmação não repete insert na mesma página. | `client-persistence`: finalização simultânea, erro/retry, mudança A/B, quota local e limpeza após confirmação. | Aprovados. | UUID não é enviado ao banco: contrato existente preservado. Resultado HTTP ambíguo, recarga após falha de limpeza, ausência de Web Locks e múltiplos dispositivos exigem idempotência no backend. |
| F5 | Parcialmente corrigido | `assets/js/quick-chart-external.js`, `assets/js/quick-chart-manager.js` | Fila de gravações nos dois editores; clear aguarda save já enviado; invalidação de snapshots pendentes; edições durante clear preservadas; resposta antiga não altera outra conta; inicialização única. | `quick-chart`: seis cenários de ordem, clear, nova edição, troca de proprietário, login público tardio e inicialização sobreposta. | Todos aprovados. | Dois navegadores/abas/dispositivos ou clientes antigos podem sobrescrever conteúdo. Versionamento condicional precisa do backend. Operação já enviada não é considerada cancelada no servidor. |
| F6 | Parcialmente corrigido | `trabalho/passometro/index.html` | Debounce por deck e fila por proprietário/deck; metadados locais de dirty/known/deleted; exclusão cancela snapshots não enviados e aguarda gravação em voo; cópia limpa ausente no servidor não é reimportada; falhas retidas para retry. | `client-persistence`: decks independentes, exclusão pendente, tombstone contra snapshot antigo, cópia limpa removida, offline/reconexão. | Aprovados. | Tombstones são locais. Clientes antigos e alterações dirty em outros dispositivos ainda podem ressuscitar registros. Relógio local não é versão autoritativa. |
| F7 | Corrigido | `assets/js/plantao-engine.js` | Faixa Unicode de diacríticos corrigida nas duas expressões regulares. | `functional-regression` e `plantao`: reconhecimento textual, trauma/APH e regras puras existentes. | Aprovados; fórmulas e pesos preservados. | Pendências clínicas descritas abaixo não são resolvidas por esta correção técnica. |
| F8 | Corrigido no escopo diagnosticado | `assets/js/work-scores.js` | Validador compartilhado aplica validade HTML, preenchimento, finitude e min/max já declarados em HINTS, Framingham, GRACE, PSI, NEWS2, MELD-Na e GBS. | GRACE e PSI: entrada válida preserva resultado; vazio, negativo, acima do limite, NaN e Infinity rejeitados; inspeção dos consumidores do helper. | Aprovados. | Não foi feita recertificação médica dos cálculos nem teste de todos os valores de todos os escores. |
| F9 | Corrigido | `apostilas/infeccoes-gestacao-transmissao-vertical/index.html`; HTML da rota editorial pública | Remoção de abertura duplicada de script e substituição de separador literal inválido fora de string por quebra de linha. | Verificação sintática dos arquivos JS/CJS e scripts HTML. | 173 blocos, zero erros. | Fluxos editoriais remotos dependem de RPCs e permissões não verificadas. |
| F10 | Dependente do Supabase | Somente este relatório | Inventário revalidado: 109 nomes literais distintos de RPC; 93 sem definição nos SQL fornecidos. Isso não comprova ausência em produção. | Inspeção estática de chamadas e CREATE FUNCTION. | Lacuna de rastreabilidade confirmada. | Schema, políticas, grants, funções implantadas e sequência de migrações não foram fornecidos/validados. |
| F11 | Parcialmente corrigido | `package.json`, `package-lock.json`, `.gitignore`, `scripts/check-syntax.cjs`, `scripts/sync-admin-prompts.cjs`, `scripts/check-pdf-compat.cjs`, sete arquivos de teste e fixture listados abaixo; `admin.html`, `admin/index.html` | Suíte reproduzível; DOM real em fixtures de Plantão; roteamento Admin testado por comportamento; prompts canônicos sincronizados; verificações de sintaxe e divergência; regressões de segurança e persistência. | `npm run check`, teste PDF adicional, `npm audit`, `git diff --check`. | Sintaxe/prompts aprovados; 35 testes aprovados, três cenários clínicos reprovados mais o agrupador (quatro falhas contabilizadas). Audit npm: zero vulnerabilidades conhecidas nas dependências instaladas. | Suíte completa vermelha por pendências clínicas. Workflows não alterados. Teste amplo de navegador e SQL não executados. |
| F12 | Dependente do Supabase | Somente este relatório | Análise das duas Edge Functions legadas e encaminhamento de controles SSRF necessários. | Inspeção de `urlReachable`, origens e redirecionamentos; sem requisição invasiva. | Risco tecnicamente fundamentado, sem exploração em produção. | Status de implantação/exposição desconhecido; código aceita HTTP(S) e segue redirects sem bloqueio explícito de destinos internos. |

## Arquivos de dependência e testes

SheetJS foi atualizado em `caderno-erros.html`, `caderno-erros/index.html`, `configuracoes/cronograma/index.html`, `configuracoes/flashcards/index.html`, `cronograma.html`, `cronograma/index.html`, `flashcards.html` e `flashcards/index.html`.

Testes criados/ajustados: `tests/app-security.test.cjs`, `tests/client-persistence.test.cjs`, `tests/functional-regression.test.cjs`, `tests/quick-chart.test.cjs`, `tests/plantao.test.cjs`, `tests/plantao-flow.test.cjs`, `tests/question-factory.test.cjs` e `tests/fixtures/app-client.cjs`.

A dependência de desenvolvimento `jsdom@29.0.1` fornece o DOM real dos HTML locais para recuperar os testes existentes; não é entregue ao navegador. A versão é compatível com Node 24.11.1 usado na execução. O lockfile fixa dependências transitivas. Node >=24 é requerido para o runner configurado. Não foram adicionados serviços de backend ou bibliotecas de produção via npm.

SheetJS: distribuição completa oficial e licença, SHA-256 `cc015130aa8521e7f088f88898eba949ccdcbfb38df0bd129b44b7273c3a6f41`. Origem: https://cdn.sheetjs.com/xlsx-0.20.3/package/dist/xlsx.full.min.js. A distribuição completa mantém suporte a XLS/CSV, omitido pela edição mini. Referências: [instalação oficial](https://docs.sheetjs.com/docs/getting-started/installation/standalone/), [CVE-2023-30533](https://cdn.sheetjs.com/advisories/CVE-2023-30533), [CVE-2024-22363](https://cdn.sheetjs.com/advisories/CVE-2024-22363).

PDF.js: a mitigação `isEvalSupported:false` é indicada pelo [aviso publicado pelos mantenedores](https://github.com/mozilla/pdf.js/security/advisories/GHSA-wgrm-67xf-hhpq). Biblioteca/worker 3.11.174 permanecem compatíveis. Uma migração de versão com novo contrato de módulos/worker requer validação específica posterior.

## Pendências clínicas reveladas pela suíte

Estas evidências usam `data/plantao-cases-v2.json` e o JavaScript atual com Supabase fictício, sem comprovar quais casos estão ativos no banco. O usuário escolheu manter o alinhamento das equivalências pendente para revisão clínica. Não foi feita alteração de regras para obter testes verdes.

1. **FA instável — equivalência ausente.** `assets/js/plantao.js`, `criticalWindow` exige `sync_cardioversion`; o caso antigo fornece `cardioversion`, sem equivalência correspondente. O caso registra conversão, mas depois declara atraso fatal. Resultado do fluxo: 0 em vez do caminho ideal 100. Revisar contrato de IDs e equivalências com a equipe clínica e a equipe que publica os casos. Manter os prazos atuais até aprovação.
2. **PCR em FV — pré-requisitos inacessíveis no catálogo atual.** `mergedActions` exclui ações específicas da categoria `iniciais` que não estão no catálogo genérico. No caso local, `pads`, `ivio` e `rosc` desaparecem; `resolveSpecialAction` usa choques que ainda exigem esses IDs. O fluxo não executa os pré-requisitos e termina em 57 em vez de 100. Revisar a correspondência entre catálogo, ações e sequência com responsáveis clínicos, incluindo se ROSC deveria ser ação ou resultado. Não adicionar equivalências médicas por suposição.
3. **Penalidade de diagnóstico ocultada pelo bônus.** O fluxo registra penalidade 4 por hipótese incorreta. Em `PlantaoEngine.score`, quatro eventos benéficos acrescentam 8; a nota final limitada a 100 termina em 100. O teste agora exige a invariável original de que erro permaneça visível na nota, sem conservar um valor 94 baseado em regras antigas. A decisão sobre ordem de teto, bônus e descontos é de negócio e requer aprovação clínica.
4. **Sepse — risco adicional de equivalência.** O caso antigo registra `antibiotic`; a janela de dez minutos procura IDs de fármacos específicos. O fluxo testado termina antes desse prazo e passa, mas isso não valida o caminho que ultrapassa dez minutos após antibiótico. Revisar equivalências em conjunto com o item 1.

O antigo teste unitário esperava 49 em um cenário baseado em peso de ações 75; o motor atual usa 70 + 15 + 15. A expectativa foi substituída por testes da diferença entre pontuação bruta com/sem penalidade e da contribuição de diagnóstico/destino. Nenhum peso do código foi modificado.

O fixture de fluxo usa o HTML canônico, o catálogo atual de hipóteses/destinos e o botão repetido de desfibrilação. Formato reduzido de resultado de óbito é verificado separadamente; alta insegura continua terminando com óbito e zero. Anafilaxia e sepse têm seus fluxos completos aprovados.

## Ações objetivas para a equipe Supabase

Prioridades indicam impacto e dependência; alterações de contrato precisam ser combinadas com o cliente. Não aplicar migrações sugeridas diretamente em produção sem teste e aprovação do responsável.

| Prioridade / problema | Comportamento esperado | Contrato ou recurso | Evidência no repositório | Risco | Validação necessária |
|---|---|---|---|---|---|
| P1 — autorização de dados clínicos | Cada UID deve ler/modificar somente seus dados; grants e RLS devem rejeitar acesso de outro usuário mesmo que o cliente envie outro owner. | `passometro_decks`, `study_sessions`, `external_quick_chart_portals`, RPCs relacionadas. | `.upsert({user_id,...})`, `.insert({user_id,...})`, `.eq(owner_id,...)` nos três clientes corrigidos; esquema completo não fornecido. | Validação cliente não substitui autorização. Estado implantado não verificado. | Testes de integração com usuários A/B e anon; inserts/selects/updates/deletes cruzados devem ser negados. Verificar constraints/grants sob papéis reais. |
| P1 — idempotência de estudo | A repetição da mesma sessão lógica retorna a mesma confirmação sem segundo registro. | Insert de `study_sessions` em `assets/js/app.js`; UUID existe apenas no estado local. | Fila/Map/Web Locks resolvem concorrência local, mas insert atual não inclui chave estável reconhecida pelo banco. | Resposta perdida após commit pode gerar tempo duplicado ao tentar novamente. | Definir contrato de chave de idempotência + unicidade/transação; reproduzir commit confirmado no banco com resposta perdida, reload e dois dispositivos. Não inferir unicidade por timestamps. |
| P1 — versões e exclusões de Passômetro | Gravações antigas não substituem versão nova nem recriam deck excluído; exclusões são conhecidas por todos os clientes. | `passometro_decks`, `onConflict:"user_id,deck_id"`, payload e `updated_at`. | `refreshFromCloud`, `upsertDeck`, metadados locais dirty/known/deleted em `trabalho/passometro/index.html`. | Dirty offline e cliente antigo podem ressuscitar registro; relógio do cliente é manipulável. | Definir versão autoritativa, escrita condicional e tombstone remoto; teste dois dispositivos offline, excluir em A e tentar salvar snapshot antigo em B. |
| P1 — prontuário com revisão condicional | Save/clear com revisão antiga retorna conflito; nenhuma gravação antiga ocorre após uma limpeza já confirmada. | Edge `external-quick-chart`, ações load/save/clear; acesso interno direto a `external_quick_chart_portals`. | `quick-chart-external.js` e `quick-chart-manager.js` usam filas separadas, mas escrevem o mesmo conteúdo remoto. | Fila não coordena dispositivos ou os dois caminhos entre si. | Unificar semântica de versão e compare-and-swap para ambos; testar save/save e save/clear em clientes diferentes e falha parcial. Cliente tratará conflito após contrato aprovado. |
| P1 — proteção de acesso por PIN | Tentativas devem ser limitadas no servidor e conteúdo autorizado/expirado tratado consistentemente. | `external-quick-chart`, credenciais username/PIN, expiração e `set_pin` com token Auth. | Endpoint é chamado pelo cliente, mas implementação não existe no repositório fornecido; quatro dígitos no formulário. | Não é possível comprovar proteção de força bruta, armazenamento de PIN ou permissões do caminho público. | Fornecer implementação, limites por conta/origem, armazenamento seguro e logs sem PIN; testes controlados de throttling e expiração no ambiente da equipe. |
| P1 se implantado — SSRF legado (F12) | Rejeitar loopback, privados, link-local, metadata, IPv6 equivalentes e redirects para destinos bloqueados; restringir protocolos/portas e egress. | `question-factory-perplexity-audit` e `question-factory-perplexity-initial-batch`. | Em ambos `urlReachable` (linha 164) aceita regex HTTP(S); HEAD/GET usam `redirect:"follow"`; fontes passam por verificação de alcance. | Requisições do servidor a destinos internos se entrada controlável alcançar a função. Não houve exploração; exposição desconhecida. | Primeiro confirmar implantação e invocação externa. Usar servidor HTTP fictício com redirects e DNS simulados, sem tocar redes internas reais. Validar cada salto e endereço resolvido. Se aposentado, desabilitar/remover pelo fluxo da equipe. |
| P2 — inventário/schema versionado (F10) | Ambientes reproduzíveis com contratos completos, permissões e ordem de atualização. | 109 RPCs literais; 93 sem CREATE FUNCTION nos SQL locais. | Exemplos: `admin_exam_catalog_snapshot`, `admin_publish_exam_catalog`, `admin_plan_features_snapshot`, `admin_dashboard_snapshot`; Plantão usa `list_active_clinical_case_summaries` e `get_active_clinical_case`. | Diagnóstico, teste e instalação podem divergir do ambiente real. Ausência local não comprova ausência implantada. | Exportar schema/migrações sem segredos nem dados pessoais; documentar assinatura, retorno, papel e autorização; testar restauração isolada e compatibilidade do cliente. |
| P2 — importações editoriais compostas | Retomar ciclo ou chunks sem duplicar itens; falha após adjudicação deve manter estado retomável. | `admin_import_question_factory_stage`; `submitReviewImport` em `assets/js/admin.js`. | Adjudicação/correção e reviews em chunks fazem múltiplas RPCs. O cliente atual informa persistência parcial. | Sem implementação completa não se prova atomicidade/idempotência entre etapas. | Testar repetição de payload/versão e falhas após primeiro chunk/primeira etapa; definir garantias por etapa e operações retomáveis. Nenhuma alteração do contrato implementada. |
| P2 — casos clínicos ativos | Catálogo, IDs, pré-requisitos e regras publicados devem representar as equivalências aprovadas. | RPCs do Plantão e JSON de casos local. | Divergências clínicas listadas acima; corpus remoto não consultado. | Caso ativo pode reproduzir falhas; dados de teste podem também estar desatualizados. | Equipe clínica confirma comportamento e equipe Supabase compara casos ativos, versões e contratos; após aprovação executar fluxos completos em ambiente de teste. |

## Execução e resultados das verificações

Preparação local reproduzível, sem lifecycle scripts de dependências:

```powershell
npm ci --ignore-scripts
npm run check
```

`npm run check` executa sintaxe, integridade dos prompts e toda a suíte. **Atualmente retorna código 1 pelas três pendências clínicas**, sem skip ou exclusão da suíte. Foram contabilizados 39 testes: 35 aprovados e quatro falhas (três cenários e seu agrupador). Logs FAKE_FAILURE/FAKE_OFFLINE/FAKE_QUOTA são injeções de falha controladas, não erros em produção.

| Verificação | Resultado observado |
|---|---|
| `npm run check:syntax` | 173 blocos JS/CJS e scripts inline; zero erros; bibliotecas terceirizadas, artefatos temporários e três arquivos TypeScript fora do escopo não entram nessa contagem. |
| `npm run check:prompts` | Cinco prompts de cada uma das duas rotas iguais ao módulo canônico. Script de sincronização é somente leitura por padrão; `--write` altera exclusivamente os corpos desses prompts. |
| Segurança/persistência/validação/engine/Admin/prontuário | Todos os cenários focados aprovados; inclusive dois editores e limpeza de diálogos. |
| Fluxos clínicos em DOM real | Anafilaxia, sepse e alta insegura aprovadas; FA, PCR e penalidade na nota pendentes. Supabase fictício, sem dados reais. |
| PDF.js real com `isEvalSupported:false` | PDF fictício de uma página: texto esperado, leitura e lista de operadores aprovados. Não foi feita renderização de pixels/canvas nem exploração de PDF malicioso. |
| `npm audit --json` | Zero vulnerabilidades conhecidas para as dependências npm instaladas nesta data. Não inclui scripts via CDN ou código vendorizado. |
| `git diff --check` | Aprovado após remover linha extra no teste. |
| Comparação com a base | Zero alterações em SQL, Edge Functions, workflows ou CSS; zero diferenças nos blocos style embutidos; estrutura HTML fora de scripts e prompts autorizados idêntica. |

Para repetir a verificação adicional de PDF, colocar `pdf.min.js` e `pdf.worker.min.js` da versão 3.11.174 em uma pasta temporária ignorada, respectivamente como `pdf.js` e `pdf.worker.js`, e executar:

```powershell
node scripts/check-pdf-compat.cjs .audit-artifacts/pdfjs/pdf.js
```

Na execução foram usados os mesmos arquivos públicos do CDN já empregado no projeto (`https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/`). Essa checagem adicional não é dependência automática de rede da suíte.

Não existiam configurações de lint/typecheck/build da aplicação para executar. As verificações de sintaxe não substituem lint, tipos ou testes de integração. O teste amplo `tests/layout-pcr.browser.cjs` não foi executado: requer Playwright, jsPDF, servidor local e configuração própria de mocks; os testes corrigidos usam jsdom e não validam layout de navegador. Nenhum teste SQL, plano EXPLAIN, acesso ao Supabase real ou migração foi executado.

## Dados locais e riscos de regressão

As chaves antigas `luria:passometro:v1`, `luria-prescription-draft-v1`, `luria:active-study-session:v1` e `luria-clinical-transfer-v1` permanecem intactas. Chaves novas recebem sufixo do UID validado por Auth. Não foi executada migração de dados: conteúdo cujo dono não pode ser comprovado não aparece automaticamente na conta atual nem é enviado ao servidor.

Uma recuperação futura deve preservar uma cópia original, verificar o proprietário de cada item e usar uma rotina separada aprovada. Não orientar usuários a copiar toda a chave antiga para a conta atual. Cache antigo pode continuar ocupando armazenamento até uma decisão autorizada de recuperação/remoção.

A migração existente de Passômetro agora atua apenas sobre cache já associado a um UID. Cópias limpas anteriormente reconhecidas no servidor e posteriormente ausentes são descartadas do cache ativo; cópias dirty/offline são mantidas. Essa distinção não substitui tombstone remoto. Não foram adicionados campos ao payload do banco.

Fila de gravações exige que a requisição em voo termine antes da seguinte. Se a conexão ficar suspensa, o conteúdo permanece local e a fila aguarda; timeout sem idempotência pode deixar resultado ambíguo e não deve desencadear retry indiscriminado. Suspensão/fechamento da página, armazenamento indisponível e múltiplos dispositivos ainda exigem estratégias do servidor.

Persistência local não é criptografia, nem isolamento entre pessoas que compartilham o mesmo perfil de navegador autenticado. Preservação visual foi verificada por comparação de código/markup; não há garantia por screenshots em todos os dispositivos. Importações XLS/XLSX/CSV e leitura PDF têm compatibilidade demonstrada com fixtures, não com todo o corpus de usuários.

## Próximos passos

1. Equipe clínica revisar as três falhas e a equivalência de sepse; validar se os casos locais correspondem ao corpus ativo. A decisão de manter pendente foi respeitada.
2. Equipe Supabase fornecer contratos/schema e validar autorização; implementar idempotência, revisão condicional e tombstones com contrato aprovado.
3. Confirmar status das funções legadas e corrigir SSRF no serviço antes de mantê-las expostas.
4. Após contratos e decisões clínicas, ajustar cliente e testes de integração em pequenos passos, retomando as falhas atualmente visíveis.
5. Executar checagem de navegador/importações com um corpus maior de arquivos fictícios, incluindo reload, abas simultâneas e conectividade intermitente.
6. Integrar `npm run check` ao workflow de qualidade somente com autorização específica; workflows de publicação permanecem inalterados.

Nenhuma pendência de backend ou de lógica clínica foi classificada como corrigida. O relatório registra o resultado limitado ao código e às verificações executadas.
