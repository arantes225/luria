const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

test('Unificação do topo e moldura externa (fundo e topo são uma coisa só)', () => {
  const uiAppCss = fs.readFileSync(path.join(__dirname, '..', 'assets', 'css', 'ui-app.css'), 'utf8');
  const spotlightCss = fs.readFileSync(path.join(__dirname, '..', 'assets', 'css', 'page-spotlight.css'), 'utf8');

  // 1. A topbar deve ter fundo transparente para revelar o fundo unificado do body/html
  assert(
    uiAppCss.includes('body[data-ui-nav="v2"] .topbar') &&
    uiAppCss.includes('background:transparent!important'),
    'ui-app.css deve definir background: transparent para body[data-ui-nav="v2"] .topbar'
  );

  // 2. Não deve haver borda inferior na topbar dividindo o topo das laterais
  assert(
    uiAppCss.includes('border-bottom:0!important'),
    'ui-app.css deve remover border-bottom da topbar'
  );

  // 3. spotlight.css deve conter a regra global de unificação absoluta
  assert(
    spotlightCss.includes('UNIFICAÇÃO DO TOPO E MOLDURA EXTERNA'),
    'page-spotlight.css deve conter seção de unificação de moldura'
  );
  assert(
    spotlightCss.includes('body[data-ui-nav="v2"] .topbar') &&
    spotlightCss.includes('background: transparent !important') &&
    spotlightCss.includes('border-bottom: 0 !important'),
    'page-spotlight.css deve garantir transparência e ausência de borda na topbar'
  );

  // 4. html e body devem compartilhar o background da moldura
  assert(
    uiAppCss.includes('html:has(body[data-ui-nav="v2"]) {--ui-frame-bg:'),
    'html:has(body[data-ui-nav="v2"]) deve ter --ui-frame-bg definido'
  );
  assert(
    uiAppCss.includes('body[data-ui-nav="v2"] {') &&
    uiAppCss.includes('background:var(--ui-frame-bg)!important'),
    'body deve aplicar background:var(--ui-frame-bg)!important'
  );
});
