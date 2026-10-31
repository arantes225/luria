const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

test('Estrutura e integridade de flashcards/index.html e flashcards.html', () => {
  const indexPath = path.join(__dirname, '..', 'flashcards', 'index.html');
  const rootPath = path.join(__dirname, '..', 'flashcards.html');

  assert(fs.existsSync(indexPath), 'flashcards/index.html deve existir');
  assert(fs.existsSync(rootPath), 'flashcards.html deve existir');

  const indexHtml = fs.readFileSync(indexPath, 'utf8');
  const rootHtml = fs.readFileSync(rootPath, 'utf8');

  // Sincronização estrita
  assert.equal(indexHtml, rootHtml, 'flashcards.html e flashcards/index.html devem ser idênticos');

  // Integridade de documento HTML
  const htmlEnd = indexHtml.indexOf('</html>');
  assert.notEqual(htmlEnd, -1, 'Documento deve conter </html>');
  const trailingContent = indexHtml.substring(htmlEnd + 7).trim();
  assert.equal(trailingContent, '', 'Nenhum estilo ou conteúdo legado deve ficar pendente após </html>');

  // CSS Lumina compartilhado
  assert(indexHtml.includes('questoes-lumina-v2.css'), 'Deve importar questoes-lumina-v2.css');

  // Componentes estruturais do layout Lumina
  assert(indexHtml.includes('qs-home-workspace'), 'Deve conter container qs-home-workspace');
  assert(indexHtml.includes('qs-home-main-column'), 'Deve conter coluna principal qs-home-main-column');
  assert(indexHtml.includes('qs-home-side-column'), 'Deve conter coluna lateral qs-home-side-column');

  // Card diário (Hero)
  assert(indexHtml.includes('id="review-launcher"') || indexHtml.includes('id="flash-daily-card"'), 'Deve conter card diário de flashcards');
  assert(indexHtml.includes('qs-daily-review-like'), 'Deve ter classe qs-daily-review-like');
  assert(indexHtml.includes('traube-daily-review-primary'), 'Botão principal deve possuir classe traube-daily-review-primary');

  // Feed de decks
  assert(indexHtml.includes('qs-home-my-lists'), 'Deve conter card de listas/decks qs-home-my-lists');
  assert(indexHtml.includes('flash-home-decks-list') || indexHtml.includes('qs-home-my-lists-content'), 'Deve conter container para lista de decks');

  // Métricas compactas de 4 colunas
  assert(indexHtml.includes('error-quick-metrics'), 'Deve conter widget de métricas rápidas');
  assert(indexHtml.includes('qs-metric-4col'), 'Deve possuir grade de 4 colunas qs-metric-4col');

  // 3 Ações compactas
  assert(indexHtml.includes('qs-home-actions-compact') || indexHtml.includes('error-home-actions'), 'Deve conter container de 3 ações compactas');
  assert(indexHtml.includes('data-flash-tab="create"') || indexHtml.includes('data-flash-home-tab="create"'), 'Deve conter ação de criar');
  assert(indexHtml.includes('data-flash-tab="import"') || indexHtml.includes('data-flash-home-tab="import"'), 'Deve conter ação de importar');
  assert(indexHtml.includes('data-flash-tab="library"') || indexHtml.includes('data-flash-home-tab="library"'), 'Deve conter ação de biblioteca');
});

test('Estrutura e integridade de caderno-erros/index.html e caderno-erros.html', () => {
  const indexPath = path.join(__dirname, '..', 'caderno-erros', 'index.html');
  const rootPath = path.join(__dirname, '..', 'caderno-erros.html');

  assert(fs.existsSync(indexPath), 'caderno-erros/index.html deve existir');
  assert(fs.existsSync(rootPath), 'caderno-erros.html deve existir');

  const indexHtml = fs.readFileSync(indexPath, 'utf8');
  const rootHtml = fs.readFileSync(rootPath, 'utf8');

  // Sincronização estrita
  assert.equal(indexHtml, rootHtml, 'caderno-erros.html e caderno-erros/index.html devem ser idênticos');

  // Integridade de documento HTML
  const htmlEnd = indexHtml.indexOf('</html>');
  assert.notEqual(htmlEnd, -1, 'Documento deve conter </html>');
  const trailingContent = indexHtml.substring(htmlEnd + 7).trim();
  assert.equal(trailingContent, '', 'Nenhum estilo ou conteúdo legado deve ficar pendente após </html>');

  // CSS Lumina compartilhado
  assert(indexHtml.includes('questoes-lumina-v2.css'), 'Deve importar questoes-lumina-v2.css');

  // Componentes estruturais do layout Lumina
  assert(indexHtml.includes('qs-home-workspace'), 'Deve conter container qs-home-workspace');
  assert(indexHtml.includes('qs-home-main-column'), 'Deve conter coluna principal qs-home-main-column');
  assert(indexHtml.includes('qs-home-side-column'), 'Deve conter coluna lateral qs-home-side-column');

  // Card diário (Hero)
  assert(indexHtml.includes('id="error-daily-card"') || indexHtml.includes('id="error-daily-review-card"'), 'Deve conter card diário de caderno de erros');
  assert(indexHtml.includes('qs-daily-review-like'), 'Deve ter classe qs-daily-review-like');
  assert(indexHtml.includes('traube-daily-review-primary'), 'Botão principal deve possuir classe traube-daily-review-primary');

  // Feed de cadernos
  assert(indexHtml.includes('qs-home-my-lists'), 'Deve conter card de listas/cadernos qs-home-my-lists');
  assert(indexHtml.includes('id="error-library"') || indexHtml.includes('qs-home-my-lists-content'), 'Deve conter feed de cadernos');

  // Métricas compactas de 4 colunas
  assert(indexHtml.includes('error-quick-metrics'), 'Deve conter widget de métricas rápidas');
  assert(indexHtml.includes('qs-metric-4col'), 'Deve possuir grade de 4 colunas qs-metric-4col');

  // 3 Ações compactas
  assert(indexHtml.includes('qs-home-actions-compact') || indexHtml.includes('error-home-actions'), 'Deve conter container de 3 ações compactas');
  assert(indexHtml.includes('id="error-home-review-action"'), 'Deve conter ação de revisar agora');
  assert(indexHtml.includes('id="error-home-create-action"'), 'Deve conter ação de criar novo');
  assert(indexHtml.includes('id="error-home-library-action"'), 'Deve conter ação de biblioteca');
});
