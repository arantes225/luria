# Etapa 7.5 — Service Worker e cache PWA

## Diagnóstico e correções

- F01: a busca global nos caches, seguida de `ignoreSearch`, recuperava o CSS antigo pelo pathname. Agora a busca consulta somente caches da versão ativa, por URL completa, priorizando runtime sobre static. Sem versão exata, retorna 503; não troca pela página Dashboard/Login.
- O handler genérico anterior aceitava qualquer GET da mesma origem e ignorava diretivas de privacidade. Agora só shells HTML estáticos conhecidos, assets públicos, apostilas públicas e JSON semanal são elegíveis. Admin, APIs, Supabase externo, Authorization, credenciais explícitas em fetch, Range, tokens e queries desconhecidas passam pela rede nativa, sem fallback público. Navegações usam `credentials: include` por padrão: a exceção permite somente recursos públicos já autorizados, buscados com `credentials: omit`, sem cachear resposta autenticada.
- Recursos públicos são buscados com `credentials: omit`. Respostas privadas, `no-store`, `no-cache`, revalidação obrigatória, Vary sensível, redirects e MIME incompatível não entram no Cache Storage. Resposta que deixa de ser cacheável revoga suas cópias exatas anteriores.
- Versão `luria-pwa-v282-cache-security`: static, runtime, weekly e images possuem namespace comum. A ativação elimina apenas caches antigos do Luria. APP_SHELL contém 51 URLs públicas existentes e versões explícitas usadas pelos shells; preserva os dois ícones do manifest e o script do login. Falhas opcionais/quota não impedem respostas online nem a ativação. Limites de tamanho e TTL das imagens foram preservados.
- Registro em `assets/js/pwa.js` e manifest revisados, sem alterações. A política anterior de `skipWaiting`, `clients.claim`, atualização periódica e recarga somente por ação do usuário foi mantida.

## Arquivos

- `service-worker.js`
- `tests/service-worker.test.cjs` e `tests/fixtures/service-worker.cjs`
- `tests/fixtures/pwa-browser.cjs`
- `tests/pwa-v2.test.cjs` e `tests/pwa-flow.test.cjs`
- Este relatório.

## Verificações

- `node --test --test-isolation=none --test-reporter=tap tests/service-worker.test.cjs tests/pwa-v2.test.cjs tests/pwa-flow.test.cjs`: **44 aprovados, zero falhas/skip**. Executa o worker real em VM; simula apenas as APIs Cache Storage/rede/eventos. Inclui navegação pública com credenciais padrão, preservação da cópia offline em falha temporária HTTP e revogação sem fallback diante de 401/403.
- Chromium local, origem loopback descartável: **21 verificações aprovadas** com worker real e Cache Storage real. Registro/ativação, limpeza antiga, CSS/JS/HTML, contas A/B sintéticas, ausência de tokens/Admin/API/private/no-store no cache, F01, erro controlado, recuperação e atualização de namespace sem perder o texto aberto.
- Navegação real adicional por links: documento público sintético renderizado online e novamente durante a falha de rede, com a mesma query de versão. Esse teste identificou e corrigiu o bypass causado pelas credenciais padrão das navegações; o harness de fetch isolado não cobria essa diferença. A origem descartável foi limpa e o servidor encerrado.
- Falhas offline simuladas por encerramento de sockets do servidor; não foi usado modo avião/desconexão física. A atualização sintética altera somente a constante de versão do mesmo worker. Requisições sintéticas autenticadas usam `cache: no-store` para separar Cache Storage do cache HTTP.
- Harness utiliza a CSP existente do Dashboard, sem violações observadas. Cabeçalhos CSP são preservados no teste de navegação. HTML/CSS/políticas e bibliotecas de produção não foram alterados; não foi repetida a auditoria CSP.
- Sintaxe dos seis arquivos JS/CJS envolvidos e do script emitido pelo harness verificada; `git diff --check` e diff revisados. Não houve erro de console na origem final. Dois defeitos do próprio harness (escape e espera pelo estado activated) foram corrigidos antes da execução final.
- Sem suíte clínica, testes Edge, commit, merge, push ou deploy.

## Limitações e riscos residuais

- Cache Storage não equivale ao cache HTTP, localStorage ou IndexedDB. Estes últimos não foram alterados/auditados. O cenário sintético demonstrou que um servidor que marca a mesma URL como pública pode permitir reutilização pelo cache HTTP; headers privados corretos continuam necessários nos endpoints reais.
- O allowlist pressupõe os arquivos públicos estáticos do GitHub Pages. Não garante privacidade de conteúdo injetado pelo servidor incorretamente em uma URL pública, sem headers apropriados. `Set-Cookie` nem sempre é exposto pela Fetch API; a proteção não depende apenas desse header.
- Query `v` identifica chaves exatas, mas não prova integridade criptográfica: arquivos com nomes mutáveis podem mudar no servidor mantendo a URL. Imutabilidade por release/hash e atualização coordenada entre abas exigem uma decisão posterior.
- `skipWaiting`/`clients.claim` existentes podem trocar o controlador de uma aba ainda executando JS antigo. Sem recarga automática, o texto aberto foi preservado; isso não demonstra compatibilidade integral entre versões nem segurança de temporizadores clínicos. Proposta futura: coordenar a ativação com confirmação e disponibilizar assets imutáveis por release.
- Não foram validados instalação standalone em celular, produção, contas reais, fluxos completos dos módulos, imports/WASM em execução nem todas as 96 políticas CSP. O teste dirigido cobre transporte/cache de WASM e recursos públicos; chamadas privadas/Supabase não são executadas pelo worker.
- Etapa 7.6 não iniciada.

Referência: [Cache API — armazenamento não aplica automaticamente headers HTTP](https://developer.mozilla.org/en-US/docs/Web/API/Cache).
