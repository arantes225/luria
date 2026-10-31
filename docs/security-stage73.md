# Etapa 7.3 — CSP, primeiro lote

## Inventário e cobertura

Inventário estático inicial: 96 HTML, 79 com CSP, nove variantes de política,
93 blocos inline, 21 atributos de evento HTML em nove páginas e nenhuma URL
`javascript:` no HTML. Bibliotecas externas carregadas por script: jsDelivr e
cdnjs. As páginas de apostilas também geram fallbacks `onerror` por templates.
Os handlers atribuídos a propriedades JS (`element.onclick = função`) não são
atributos inline e não precisam de `unsafe-inline`.

Lote explicitamente limitado a **13 arquivos HTML**:

- `index.html`;
- `login.html`, `login/index.html`;
- `dashboard.html`, `dashboard/index.html`;
- `amigos.html`, `amigos/index.html`;
- `admin.html`, `admin/index.html`;
- `trabalho/index.html`;
- `trabalho/prontuario-rapido/index.html`;
- `trabalho/calculadora/index.html`;
- `trabalho/scores/index.html` (antes sem CSP).

## Política e manutenção

Antes: `script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://cdnjs.cloudflare.com`.
Agora: `script-src 'self'` com hashes SHA-256 individuais quando há blocos estáticos;
`script-src-attr 'none'`. Sem nonces, `unsafe-eval`, `unsafe-hashes` ou
`strict-dynamic`. Não há handlers HTML nesse lote; nenhum evento precisou de
migração. Scripts mantidos na posição original, inclusive inicialização,
canonicalização, fallback do Dashboard e o catálogo de Calculadoras.

Removidas as duas CDNs também de `style-src`, `font-src`, `connect-src` e
`worker-src` nesse lote: recursos locais, loaders compartilhados locais
(`onboarding.js` e `traube-command-center.js`) e backend Supabase identificado.
Mantidos `default-src 'self'`, `object-src 'none'`, `base-uri 'self'`,
`form-action 'self'`, HTTPS/WSS do projeto Supabase, origens de imagens já
aprovadas no Admin e regras existentes de mídia/frames/PWA. Não houve
alteração de Supabase, autenticação, sanitizadores, CSS ou regras de negócio.

Exceções mantidas: `style-src 'unsafe-inline'` para estilos e atributos de
apresentação existentes; `data:`/`blob:` nas diretivas já utilizadas para
imagens, fontes, mídia, workers e documentos. Essas permissões **não** se
estendem a `script-src`. A política baseada em `'self'` ainda confia nos scripts
servidos pela própria origem; não é uma política baseada exclusivamente em hashes.

Charset fica antes da CSP; CSP antes de `<base>` e dos recursos. Não há políticas
duplicadas. `scripts/csp-pages.cjs` controla o lote e `scripts/sync-csp.cjs`
verifica hashes normalizando CRLF como o parser HTML. O gerador recusa novos
handlers e loaders externos e valida todo o lote antes de escrever. Após
alterar um script inline, revisar o diff e executar:

```text
node scripts/sync-csp.cjs --write
node scripts/sync-csp.cjs
node --test --test-isolation=none tests/csp.test.cjs
```

## Validação

- 57 testes direcionados aprovados: CSP, regressões XSS 7.1/7.2, landing,
  shell/carrossel e Cola rápida. Nenhuma suíte clínica/simulador executada.
- Verificação sintática: 191 blocos JS/CJS, zero erros.
- `git diff --check` e comparação DOM com HEAD: apenas CSP/posição de charset;
  scripts, estilos e conteúdo preservados.
- Chromium real, 13 rotas/aliases com HTML/meta/scripts reais e backend sintético
  local: nenhuma mensagem de erro/aviso nos fluxos carregados antes das sondas.
  Em todas, bloqueados script inline arbitrário, `onclick`, `javascript:`,
  `data:` script, origem não autorizada e `eval`. Capturados eventos reais
  `securitypolicyviolation`, com marcador DOM confirmando ausência de execução.
- Navegação landing/login, login (erro e sucesso) e logout com respostas simuladas, menus de notificações e
  perfil, favoritos de Calculadoras/Scores e quatro temas do shell verificados.
  Admin validado até sua proteção de PIN; não foi contornada.
- Harness reproduzível: `node tests/fixtures/csp-browser.cjs`, porta 4196,
  loopback, sem backend real. Registro do service worker excluído **somente no
  harness** para não deixar um worker persistente na origem temporária.

## Pendências e limites

**Cobertura parcial: 83 HTML ainda fora do lote; 16 deles continuam sem meta CSP.**
Flashcards/importação Anki (SQL/WASM), Caderno/Notion/PDF, Caderno de Erros/OCR,
Questões/OCR, Passômetro/impressão, PCR/jsPDF, apostilas/fallbacks de imagens e
Cronograma/handlers exigem lotes próprios e testes das respectivas bibliotecas.
Nenhuma proteção nova é alegada nessas páginas. O curinga S3 já existente em
Caderno também permanece fora desta alteração.

Sem violações inesperadas nos fluxos testados; violações deliberadas das sondas
são esperadas. Integrações reais, PIN/Admin completo, importações, exportações
e instalação/atualização PWA não foram exercitados neste lote.

GitHub Pages: a meta protege recursos processados depois dela; não configura
cabeçalhos HTTP, modo Report-Only ou proteção de embedding via `frame-ancestors`.
Não foi adicionada essa diretiva ineficaz na meta. Uma futura camada com
controle de headers será necessária para essas proteções.

Referência: [MDN — CSP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP)
e [script-src](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/script-src).

Arquivos de suporte adicionados: `scripts/csp-pages.cjs`, `scripts/sync-csp.cjs`,
`tests/csp.test.cjs`, `tests/fixtures/csp-browser.cjs` e este relatório. Os demais
arquivos modificados são os 13 HTML enumerados acima.

## Lote B — 11/10/2026

Continuação limitada a **15 HTML**, sem reiniciar o inventário. O relatório
acima preserva o histórico do lote A. Cobertura acumulada: **28/96 HTML**;
**68 restantes**, dos quais **14 ainda sem meta CSP**.

Páginas incluídas (e arquivos HTML modificados):

- `aprender/index.html`, `consolidar/index.html`;
- `editais.html`, `editais/index.html`, `beta-testers/index.html`;
- `trabalho/divisor-plantao/index.html`, `trabalho/financeiro/index.html`;
- `trabalho/fluidos-eletrólitos/index.html`, `trabalho/gestor-plantoes/index.html`;
- `trabalho/laboratorio/index.html`, `trabalho/diagnostico/index.html`;
- `trabalho/ecg/index.html`, `trabalho/exames/index.html`;
- `trabalho/receitas/index.html`, `trabalho/bulario/index.html`.

Exames e Receitas receberam a meta antes ausente, usando a política aprovada
do ambiente Trabalho. Gerador existente reutilizado, sem alterações em
`sync-csp.cjs`: lista explícita ampliada, três blocos estáticos autorizados por
hash e scripts locais por `'self'`. `script-src-attr 'none'`, sem
`unsafe-inline`/`unsafe-eval` em scripts, nonces ou curingas novos. Nenhum
handler HTML precisou ser migrado. Charset/CSP posicionados antes dos recursos.
Permissões Supabase HTTPS/WSS e demais diretivas legítimas preservadas; CDNs
sem uso removidas das diretivas tratadas pelo gerador, conforme o lote A.

Validação executada:

- `node scripts/sync-csp.cjs`: 28 políticas/hashes sincronizados.
- `node --test --test-isolation=none tests/csp.test.cjs tests/ui-final-refinement.test.cjs`:
  **33 testes aprovados** (31 CSP e duas regressões do shell/UI compartilhados).
- `node --check` nos três CJS alterados; três scripts inline do lote B
  compilados com `vm.Script`, sem erros. `git diff --check` aprovado.
- Comparação com snapshots anteriores: 13 HTML do lote A idênticos em bytes;
  15 DOMs do lote B idênticos fora de CSP/ordem de charset/espaços do head.
  Scripts, estilos, conteúdo e ordem dos recursos preservados.
- Chromium/harness existente: 15 páginas com as seis sondas bloqueadas
  (inline, atributo de evento, `javascript:`, `data:`, origem externa e `eval`),
  eventos reais de violação e ausência de execução do marcador. Nenhum erro
  ou aviso nos carregamentos legítimos anteriores às sondas.
- Controles: formulário/salvamento e busca em Editais, abertura da Central,
  canonicalização do alias; navegação para Beta Testers, busca/atualização;
  filtros e seleção de detalhes de Receitas/Bulário com registros sintéticos
  sem conteúdo médico; expansão/recolhimento do menu e aplicação dos quatro
  temas. Nenhuma violação inesperada nesses controles.

Outros arquivos modificados neste lote: `scripts/csp-pages.cjs`,
`tests/csp.test.cjs` (meta única e ordem de charset),
`tests/fixtures/csp-browser.cjs` (catálogos sintéticos locais) e este relatório.
Nenhum CSS, script funcional, service worker ou backend foi modificado.

Exceções/limites: `style-src 'unsafe-inline'` permanece pela apresentação
existente. Estatísticas (dois HTML/Chart.js externo) e Configurações (dois HTML,
Google Calendar/Notion) foram reservados; páginas complexas já enumeradas no
lote A continuam fora. Integrações/backend real, cálculos, fluxos de envio à
Cola/Prescrição e instalação PWA não foram exercitados. O harness usa backend
sintético e não registra service worker. Sem suíte clínica, `plantao-flow`,
nova auditoria XSS ou execução dos lotes C/D/E; sem commit/merge/push/deploy.

## Lote C — 11/10/2026

**CSP aplicada em 14 HTML; validação funcional parcial.** Famílias C1–C4
analisadas sem repetir o inventário geral. Cobertura acumulada: **42/96 HTML**;
**54 fora dos lotes**, dos quais **13 sem meta CSP**. As duas páginas de
Flashcards permanecem com validação de importação pendente; não se declara
o lote C integralmente concluído.

Páginas endurecidas e arquivos HTML alterados:

- C1: `cronograma.html`, `cronograma/index.html`.
- C2: `caderno-erros.html`, `caderno-erros/index.html`,
  `caderno-erros/revisao/index.html`, `questoes-simulados.html`,
  `questoes-simulados/index.html`, `registrar-questoes.html`,
  `registrar-questoes/index.html`, `resolver-questoes/index.html`.
- C3: `flashcards.html`, `flashcards/index.html`.
- C4: `caderno.html`, `caderno/index.html`.

Resolver recebeu a meta antes ausente. Gerador existente ampliado com
exceções explícitas por página e caminho de recurso: PDF.js/worker, Tesseract,
núcleos/modelos OCR, JSZip, SQL.js/WASM, fzstd, html2canvas, jsPDF e
diff_match_patch, nas versões já carregadas pelos módulos. Nenhuma biblioteca
foi substituída. Scripts locais por `self`, inline estático por SHA-256,
`script-src-attr 'none'`; sem `unsafe-inline` ou `unsafe-eval` em scripts.
O único handler HTML do Cronograma foi migrado para `addEventListener`,
preservando o callback global e a ordem dos scripts.

Exceções preservadas/justificadas:

- `wasm-unsafe-eval` somente nos quatro HTML com OCR e dois de Flashcards,
  para Tesseract/SQLite; JavaScript `eval` continuou bloqueado nas sondas.
- `blob:` em workers para os wrappers existentes de PDF/OCR; ausente de
  `script-src`. CDNs autorizadas por caminhos explícitos, não pela origem inteira.
- `style-src 'unsafe-inline'` e recursos legítimos não relacionados a scripts
  preservados. O curinga S3 de imagens já existente em `caderno/index.html`
  permanece: o renderer aceita imagens Notion hospedadas em S3 e não há
  evidência de produção suficiente para restringir regiões sem risco de quebra.
- Tesseract mantém o carregador original `@5`; worker/core observados são
  5.1.1. Uma mudança futura nessa versão flutuante exige revisão dos caminhos.

Verificações executadas:

- `node scripts/sync-csp.cjs`: 42 políticas/hashes sincronizados.
- `node --test --test-isolation=none tests/csp.test.cjs tests/frontend-xss.test.cjs tests/anki-security.test.cjs`:
  **76 testes aprovados** (47 CSP, 18 regressões XSS existentes, 11 Anki).
  Não foi repetida a auditoria XSS nem executada a suíte clínica.
- Sintaxe dos cinco JS/CJS alterados e compilação dos 28 scripts inline de C
  aprovadas; `git diff --check` aprovado e diff revisado.
- Snapshots: 28 HTML A/B idênticos em bytes. Os 14 DOMs C são idênticos fora
  de CSP/ordem de charset e remoção do handler do Cronograma; estilos,
  conteúdo e ordem de carregamento preservados. Nenhum CSS modificado.
- Chromium, harness existente: carregamento das 14 rotas sem erros/avisos
  ou violações inesperadas; seis sondas bloqueadas em todas (inline, evento,
  `javascript:`, `data:`, origem externa e `eval`). Os aliases canonicalizam
  normalmente; suas políticas/hashes também foram verificados estaticamente.
- PDF.js/worker extraiu texto do PDF sintético em Cronograma e Questões;
  OCR real eng+por/worker/WASM passou em Caderno de Erros e Questões.
  O upload de imagem pelo formulário de Caderno de Erros extraiu
  `TRAUBE CSP TEST 123`. Formulários de criação dos dois módulos abriram.
- Cronograma: navegação entre meses e formulário manual com confirmação
  de adição no backend simulado; listener da base verificado por callback spy.
- Flashcards: SQLite/WASM e jsPDF passaram; revisão abriu e exibiu a resposta.
  APKG sintético com notas, cloze e mídia chegou ao parsing SQLite, mas a
  prévia falhou com **`ankiDeckThemeMap is not defined`** em
  `assets/js/flashcards.js:3846`. Há uso sem declaração no código existente;
  não houve violação CSP. O arquivo funcional foi preservado.
- Caderno: edição e controles nativos; html2canvas renderizou conteúdo
  sintético e jsPDF gerou um blob com essa imagem, sem violações.
  Notion com respostas simuladas abriu conteúdo formatado, editou/salvou
  e reabriu o texto preservando o identificador do bloco, sem violações.

Outros arquivos alterados: `assets/js/cronograma.js`, `scripts/csp-pages.cjs`,
`scripts/sync-csp.cjs`, `tests/csp.test.cjs`, `tests/fixtures/csp-browser.cjs`
e este relatório. O harness adiciona observação antecipada de CSP, sondas
das bibliotecas reais e respostas Notion sintéticas opcionais; backend real
e registro PWA não são usados.

Limitações/pendências: corrigir o erro preexistente da prévia Anki em execução
autorizada e repetir importação completa, mídia/cloze e formatos modernos
Anki/Zstandard. OAuth/Notion real, imagens S3 assinadas, persistência remota,
importação completa de PDFs/OCR complexos e exportação final pelo fluxo
completo dos módulos não foram validados. As sondas PDF exercitam as
bibliotecas, não todos os layouts de documentos. Não há comparação pixel a
pixel; preservação visual verificada por DOM/estilos e inspeção do navegador.
A captura final adicional foi bloqueada pela revisão automática por limite
de uso; as verificações anteriores no Chromium foram concluídas.

Sem Supabase/backend, autenticação, regras, fórmulas, service worker ou novas
dependências alterados. Sem testes do Simulador/`plantao-flow`, lotes D/E
ou commit/merge/push/deploy.

Referências: [MDN — script-src](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/script-src)
e [worker-src](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/worker-src).

## Lote D — Anki e famílias complexas (11/10/2026)

**30 HTML endurecidos; validação funcional com pendências abaixo.** Cobertura:
**72/96**, **24 fora dos lotes**, **8 sem meta CSP**. Cinco páginas deste lote
não tinham política. Os 42 HTML de A/B/C permanecem idênticos em bytes ao
início desta execução; não foi executado o lote E.

### D1 — Anki

`ankiDeckThemeMap` era lido pelo formulário sem declaração, listener ou envio
do tema: parsing e importação sempre enviavam `theme: null`. Implementado o
mapeamento por deck, sua atualização na prévia e no campo já existente do
payload, com limpeza entre arquivos/reset. Sem mudança de RPC, modelo ou SRS.

Chromium: três APKG sintéticos reais, com SQLite (`collection.anki2`,
`collection.anki21`) e SQLite/Zstandard (`collection.anki21b`), chegaram à
prévia: 3 cards, 2 decks, notas comuns/cloze e 2 referências de mídia.
O legado foi importado com tema personalizado e deck sem tema, reaberto na
biblioteca e revisado até a resposta. Nenhuma violação CSP nesses fluxos.
Testes verificaram tema no payload, isolamento/reset e renderizadores/XSS.
**Limites:** 2.1/moderno exercitados até a prévia; `.colpkg` não exercitado
separadamente. A aplicação já informa que detecta referências mas não copia
mídia do Anki; essa limitação foi preservada, não validada como importação
binária/playback. Fixtures pequenas não cobrem todos os esquemas reais.

### D2–D4 — páginas e exceções

- D2: `trabalho/passometro/index.html`.
- D3: `trabalho/pcr/index.html`, `trabalho/pcr/executar/index.html`,
  `trabalho/pcr/historico/index.html`.
- D4: `apostilas/index.html` e os 25 `apostilas/<slug>/index.html`:
  `alteracoes-fisiologicas-da-gestacao`, `amenorreia`, `amniorrexe-prematura`,
  `assistencia-ao-parto`, `avaliacao-vitalidade-fetal`, `cancer-colo-utero-hpv`,
  `cancer-de-mama`, `cervicites-doenca-inflamatoria-pelvica`,
  `ciclo-menstrual-eixo-hho`, `climaterio-menopausa`,
  `crescimento-intrauterino-reduzido-aumentado`, `diabetes-mellitus-gestacional`,
  `hemorragias-primeiro-terceiro-trimestre`, `inducao-do-trabalho-de-parto`,
  `infeccoes-gestacao-transmissao-vertical`, `infeccoes-sexualmente-transmissiveis`,
  `infertilidade-conjugal`, `planejamento-reprodutivo-contracepcao`,
  `pre-natal-baixo-risco`, `sangramento-uterino-anormal`, `sexualidade`,
  `sindrome-ovariana-metabolica-poliendocrina-somp`,
  `sindromes-hipertensivas-da-gestacao`, `trabalho-parto-prematuro`, `vulvovaginites`.

Reutilizado o gerador: hashes estáticos, `self`, `script-src-attr 'none'`,
sem `unsafe-inline`/`unsafe-eval` em scripts. Bibliotecas limitadas aos caminhos
existentes: html2pdf 0.10.1 no Passômetro; jsPDF sem versão em execução/histórico
PCR (fixar versão exigiria alteração de dependência, reservada).
Demais diretivas preservadas. CDC PHIL permitido em imagens de Cervicites e
Vulvovaginites, onde o HTML já o utiliza; nas novas políticas foram incluídos
os hosts de imagens existentes, inclusive Wikimedia/NCBI na transmissão vertical.

18 `onerror` estáticos e um template dinâmico migrados para `data-*` + captura
de `error` em script local antecipado. Preservados os quatro comportamentos:
ocultar por display/hidden e revelar a fonte; classe IST; texto da candidata.
Sanitização de URLs, estilos e ordem dos scripts originais intactos.

### Verificações

- **63 testes direcionados aprovados:** 14 Anki; 2 CSP/Passômetro;
  18 CSP/PCR/isolamento de sessão; 29 CSP/Apostilas/fallback/XSS relacionado.
  Usado `node --test --test-isolation=none` com filtros por família em
  `anki-security.test.cjs`, `csp.test.cjs`, `passometro-html.test.cjs`,
  `pcr-session.test.cjs` e `frontend-xss.test.cjs` (somente Apostila).
- `node scripts/sync-csp.cjs`: 72 políticas/hashes sincronizados. O parser
  JSDOM continua avisando sobre CSS existente não suportado; CSS não alterado.
- Chromium/harness: Passômetro sem código visível, formulários, criação,
  edição, busca positiva/negativa, recarga e visualização; PDF baixado (166809
  bytes). PCR: entrada, cronômetro, ativação do áudio, painel/modal,
  observação, encerramento, histórico e busca; PDFs da sessão/histórico
  baixados (4599/4770 bytes). Três arquivos com assinatura PDF e EOF válidos.
- 26 Apostilas renderizadas, incluindo três renderizadores JSON. Candidata
  sintética exibiu fallback; imagem aprovada renderizada; expansão/fechamento
  do lightbox e quatro fallbacks testados no Chromium. Sondas em Passômetro,
  histórico PCR e renderer de Apostila bloquearam inline, handlers,
  `javascript:`, `data:`, origem externa e eval.
- Sem violações CSP inesperadas nos cenários observados; sondas geram as
  seis violações deliberadas. Sintaxe dos 8 JS novos/alterados e scripts
  inline dos 30 HTML conferida. Diff/whitespace revisados; DOMs comparados
  fora de CSP/charset/helper/atributos migrados, sem mudança visual adicional.

### Arquivos e pendências

Alterados: os 30 HTML acima; `assets/js/flashcards.js`,
`assets/js/apostila-tools.js`, `scripts/csp-pages.cjs`,
`tests/anki-security.test.cjs`, `tests/csp.test.cjs`,
`tests/frontend-xss.test.cjs`, `tests/fixtures/csp-browser.cjs` e este relatório.
Criados: `assets/js/apostila-image-fallback.js` e fixtures
`tests/fixtures/anki-{legacy,21,modern}.apkg`.

**Pendências que impedem declarar validação integral do D:** impressão do
Passômetro acionada sem janela verificável no navegador integrado (fluxo
original usa `window.open` com `noopener`); navegação de IST/Vulvovaginites
lança erro preexistente no seletor `#tricomon%C3%ADase`, confirmado no HTML
anterior; em Amenorreia, âncora relativa com `base href="/"` levou à raiz.
Esses scripts/links não foram alterados para ampliar o escopo. Imagens remotas
lazy e disponibilidade de todos os provedores não foram integralmente
exercitadas; os fallbacks usam falhas locais controladas. Sem autenticação/
persistência remota ou compartilhamento nativo reais: harness isolado com
backend sintético e confirmação automática opcional somente para exportação.
Sem comparação pixel a pixel. Sem alterações clínicas, Supabase, autenticação,
CSS, service worker, novas dependências ou commit/merge/push/deploy.

## Lote E — finalização (2026-10-11)

**Cobertura consolidada: 96/96 HTML endurecidos; 0 pendentes; 0 sem meta CSP.**
O lote incluiu os 24 restantes (8 antes sem CSP):

- `404.html`, `ambientacao.html`, `configuracoes.html`;
- `configuracoes/{index,cronograma/index,flashcards/index}.html`;
- `desafio-diario.html`, `desafio-diario/index.html`;
- `estatisticas.html`, `estatisticas/index.html`, `estudar/index.html`;
- `mini-osce/index.html`, `plantao.html`, `plantao/index.html`,
  `plantao/traubezap/index.html`, `plantao/sala-emergencia/index.html`;
- `professor-alex/index.html`, `qf-r8K2mV7qL4x9P1cF/index.html`,
  `sessao-estudo/index.html`;
- `trabalho/{antimicrobianos,plantoes,prescricao,prontuario,protocolos}/index.html`.

### Políticas e correções

Mantidos hashes SHA-256, `self`, `script-src-attr 'none'`, ordem dos scripts e
charset/CSP antes dos recursos. Nenhuma página permite `unsafe-inline`,
`unsafe-eval`, `unsafe-hashes` ou nonce em scripts. Inventário final contém
93 entradas SHA-256 e 17 páginas com caminhos externos específicos; 7 usam
`wasm-unsafe-eval` restrito a WASM. As exceções anteriores foram preservadas.
Novas exceções: PDF.js 3.11.174 na configuração de Cronograma; JSZip 3.10.1,
SQL.js 1.11.0/WASM e fzstd 0.1.1 na configuração de Flashcards; Chart.js 4.4.7
nos dois HTML de Estatísticas. Nenhuma liberação de CDN inteira para scripts.
Os redirecionadores simples não receberam acesso ao backend. Prontuário
externo mantém `form-action 'none'` e conexão HTTPS restrita ao projeto
existente, sem adicionar WebSocket. Removido seu `frame-ancestors` ineficaz
em meta; a proteção efetiva exige header HTTP, conforme pendência abaixo.

Removido o único `onclick` HTML restante, na configuração de Cronograma:
o listener já existente em `cronograma.js` executa o mesmo callback.
O gerador existente foi reutilizado **sem alterações nesta execução**.

IST/Vulvovaginites: fragmentos eram usados como seletores CSS, incluindo
`#tricomon%C3%ADase`. Agora são decodificados e buscados por `getElementById`,
com tratamento de fragmento inválido. Histórico preserva pathname/query;
o estado ativo compara o elemento correto. Amenorreia: os 17 links internos
agora apontam explicitamente para `/apostilas/amenorreia/#…`, evitando a raiz
imposta por `base href="/"`. Base, IDs, títulos e conteúdo preservados.

### Verificações

- **31 testes direcionados aprovados** em `tests/csp.test.cjs`: 26 políticas
  modificadas, listener de Cronograma, inventário exato de 96 HTML e três
  regressões de navegação (acentos codificados/não codificados, fragmentos
  malformados, links, aliases e estado ativo).
- `node scripts/sync-csp.cjs`: **96 políticas/hashes verificados**, sem drift.
  Avisos de CSS não suportado pelo parser JSDOM continuam preexistentes.
- Sintaxe conferida: 26 scripts inline dos HTML alterados e os três CJS
  alterados. Diff/whitespace revisados. Comparação DOM com o snapshot anterior
  preserva conteúdo, estilos, referências e estrutura fora das mudanças
  autorizadas. Os outros 69 HTML dos lotes anteriores estão idênticos ao
  snapshot; somente as três apostilas receberam as correções autorizadas.
- Chromium/harness: 17 HTML renderizados do E e as três apostilas passaram
  nas sondas de inline arbitrário, handler, `javascript:`, `data:`, origem
  externa e eval. **Nenhuma violação CSP inesperada nos cenários observados**;
  cada sonda gera seis violações deliberadas. Estudar/404 redirecionaram pelo
  script legítimo. PDF.js/Worker, SQLite/WASM e Chart.js/Canvas executaram
  operações reais com recursos de teste. Período das Estatísticas, troca de
  formulário do Cronograma, seletores do Alex, carregamento/modelo do Bridge
  e abertura/edição/salvamento sintéticos do prontuário foram exercitados.
- Navegação Chromium: links diretos codificados chegaram à seção correta;
  cliques preservaram os aliases e query em IST/Vulvovaginites; Amenorreia
  permaneceu na própria apostila ao partir do alias `index.html`. Estado
  ativo e rolagem conferidos após estabilização do carregamento. Sem
  comparação pixel a pixel; nenhum CSS ou conteúdo médico alterado.
  Imagens remotas lazy podem deslocar a rolagem durante o carregamento;
  seu dimensionamento existente não foi alterado nesta correção de âncoras.

### Arquivos, limitações e pendências

Alterados neste lote: os 24 HTML acima; os três
`apostilas/{amenorreia,infeccoes-sexualmente-transmissiveis,vulvovaginites}/index.html`;
`scripts/csp-pages.cjs`, `tests/csp.test.cjs`,
`tests/fixtures/csp-browser.cjs` e este relatório. Nenhum JS de produção
externo aos HTML foi alterado. Correções anteriores de Anki/XSS preservadas.

- **Dois erros preexistentes, independentes de CSP:** `configuracoes.html`
  carrega `configuracoes.js`, que espera `save-study-days` ausente;
  `configuracoes/flashcards/index.html` carrega `flashcards.js`, que espera
  `show-answer` ausente. Ambos geram TypeError em `addEventListener` e
  interrompem parte da inicialização. Ausência dos controles confirmada no
  HTML anterior e atual; não corrigidos para ampliar o escopo. Não se
  declara funcionamento integral desses dois aliases.
- Mini-OSCE e os quatro HTML Plantão receberam somente verificação estática
  de política, hashes e sintaxe. Nenhum teste do Simulador de Emergência,
  fluxo clínico, `plantao-flow.test.cjs` ou suíte completa foi executado.
- Backend do harness é sintético; os dois fetches diretos do Bridge e
  prontuário usam respostas locais restritas aos endpoints exatos. Sem
  autenticação, RPC, integração externa, conteúdo clínico ou persistência
  remota reais verificados. Anki não foi reinvestigado.
- Impressão do Passômetro permanece para teste manual da janela `noopener`;
  nenhum bug confirmado, nenhuma alteração no módulo ou PDF nesta etapa.
- **Headers HTTP:** todas as 96 páginas dependem da configuração do hosting
  para `frame-ancestors` e demais proteções exclusivas de headers. Headers
  reais de produção não foram verificados/alterados; cobertura de meta CSP
  não comprova proteção contra enquadramento. Permanecem as permissões de
  estilos inline e recursos `data:`/`blob:` documentadas, a confiança em
  scripts locais via `self` e as dependências CDN já existentes (incluindo
  jsPDF PCR sem versão fixa). Disponibilidade integral de provedores e
  imagens remotas não verificada.

Sem mudanças de design, clínica, Supabase, autenticação, persistência,
service worker ou dependências; sem commit, merge, push ou deploy.
Etapa 7.4 aguardando avaliação do usuário.
