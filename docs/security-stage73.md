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
(`onboarding.js` e `luria-command-center.js`) e backend Supabase identificado.
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
