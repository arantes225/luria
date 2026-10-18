const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

test('Estrutura HTML e integridade de questoes-simulados/index.html', () => {
  const file = path.join(__dirname, '..', 'questoes-simulados', 'index.html');
  assert(fs.existsSync(file), 'questoes-simulados/index.html deve existir');

  const html = fs.readFileSync(file, 'utf8');

  // Integridade de documento HTML
  const htmlEnd = html.indexOf('</html>');
  assert.notEqual(htmlEnd, -1, 'Documento deve conter </html>');
  const trailingContent = html.substring(htmlEnd + 7).trim();
  assert.equal(trailingContent, '', 'Nenhum estilo ou conteúdo legado deve ficar pendente após </html>');

  // Isolamento de estilos e ausência de parasitismo
  assert(!html.includes('consolidation-home-fit.css'), 'Não deve importar consolidation-home-fit.css (evita conflitos com flashcards/caderno de erros)');
  assert(html.includes('questoes-lumina-v2.css'), 'Deve importar questoes-lumina-v2.css');
  assert(html.includes('id="qs-home-lumina-master-v2"'), 'Deve conter folha de estilo master qs-home-lumina-master-v2');

  // Componentes e cartões da home
  assert(html.includes('id="qs-daily-card"'), 'Deve conter card hero de Questões do Dia');
  assert(html.includes('class="qs-home-my-lists"'), 'Deve conter container de Minhas Listas');
  assert(html.includes('id="qs-home-my-lists-content"'), 'Deve conter feed de listas');
  assert(html.includes('error-quick-metrics'), 'Deve conter widget de Métricas Rápidas');

  // Botões de ação configurados conforme requisitos de negócio
  assert(html.includes('data-qs-add-mode="manual"'), 'Botão Criar novo deve possuir data-qs-add-mode="manual"');
  assert(html.includes('data-qs-add-mode="automatic"'), 'Botão Enviar novo deve possuir data-qs-add-mode="automatic"');
  assert(html.includes('data-qs-mode="library"'), 'Botão Biblioteca deve possuir data-qs-mode="library"');
  assert(html.includes('Envie simulados externos'), 'Enviar novo deve indicar o envio de simulados externos');

  // Supressão de ilustrações invasivas dentro de containers (legibilidade 100%)
  assert(html.includes('qs-home-action-copy'), 'Deve conter cópia textual limpa');
  assert(!html.includes('class="qs-card-illustration"'), 'Não deve conter ilustrações SVG dentro dos cards');
  assert(!html.includes('class="qs-daily-illustration"'), 'Não deve conter ilustração SVG dentro do card diário');
});

test('Desacoplamento de consolidation-home-fit.css', () => {
  const cssFile = path.join(__dirname, '..', 'assets', 'css', 'consolidation-home-fit.css');
  assert(fs.existsSync(cssFile), 'consolidation-home-fit.css deve existir');

  const css = fs.readFileSync(cssFile, 'utf8');
  assert(!css.includes('data-page="questoes"'), 'consolidation-home-fit.css não deve conter seletores data-page="questoes"');
});

test('Propriedades de layout em questoes-lumina-v2.css', () => {
  const luminaCss = fs.readFileSync(path.join(__dirname, '..', 'assets', 'css', 'questoes-lumina-v2.css'), 'utf8');

  // Padrão zero-scroll
  assert(luminaCss.includes('height: 100dvh !important'), 'Deve fixar height a 100dvh para zero-scroll');
  assert(luminaCss.includes('overflow: hidden !important'), 'Deve travar overflow para zero-scroll');

  // Dimensões ergonômicas da coluna direita
  assert(luminaCss.includes('height: 138px !important') || luminaCss.includes('max-height: 138px !important'), 'Métricas rápidas compactas');
  assert(luminaCss.includes('min-height: 66px !important') || luminaCss.includes('min-height: 64px !important') || luminaCss.includes('min-height: 60px !important'), 'Cards de ação compactos');

  // Supressão estrita de arte SVG invasiva dentro dos containers para legibilidade 100%
  assert(luminaCss.includes('.qs-card-illustration') && luminaCss.includes('display: none !important'), 'Deve suprimir .qs-card-illustration');
  assert(luminaCss.includes('qs-daily-art-bg') && luminaCss.includes('display: none !important'), 'Deve suprimir arte do card diário');
  assert(luminaCss.includes('padding-right: 0 !important'), 'Deve zerar padding forçado de ilustrações para leitura natural');

  // Proteção de clearance do Professor Alex
  assert(luminaCss.includes('professor-alex') || luminaCss.includes('data-companion-host'), 'Deve prever clearance do Professor Alex');
});

test('Existência de todos os assets gráficos dos cartões', () => {
  assert(fs.existsSync('assets/img/qs-daily-art.svg'), 'qs-daily-art.svg deve existir');
  assert(fs.existsSync('assets/img/qs-create-art.svg'), 'qs-create-art.svg deve existir');
  assert(fs.existsSync('assets/img/qs-upload-art.svg'), 'qs-upload-art.svg deve existir');
  assert(fs.existsSync('assets/img/qs-library-art.svg'), 'qs-library-art.svg deve existir');
});

test('Sincronização estrita e ausência de regras legadas de 42px/7px', () => {
  const indexHtml = fs.readFileSync('questoes-simulados/index.html', 'utf8');
  const rootHtml = fs.readFileSync('questoes-simulados.html', 'utf8');

  assert.equal(indexHtml, rootHtml, 'questoes-simulados.html e questoes-simulados/index.html devem ser idênticos');
  assert(!indexHtml.includes('min-height:42px'), 'Não deve conter min-height:42px');
  assert(!indexHtml.includes('font-size:7px'), 'Não deve conter font-size:7px');
  assert(!indexHtml.includes('font-size:9.5px'), 'Não deve conter font-size:9.5px');
  assert(indexHtml.includes('education-ui-v2.css?v=20261016-v5'), 'education-ui-v2.css deve ter cache-buster 20261016-v5');
  assert(indexHtml.includes('questoes-lumina-v2.css?v=20261016-v5'), 'questoes-lumina-v2.css deve ter cache-buster 20261016-v5');
  assert(indexHtml.includes('border-radius: 14px !important'), 'Botões de ação devem possuir border-radius: 14px !important');
});

