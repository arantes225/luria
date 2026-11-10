const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');

test('generate-cerebro-status gera arquivo seguro e estruturado', () => {
  const root = path.join(__dirname, '..');
  const scriptPath = path.join(root, 'scripts', 'generate-cerebro-status.cjs');
  const statusFile = path.join(root, 'docs', 'CEREBRO-STATUS.md');

  // Executa o script com node
  execFileSync(process.execPath, [scriptPath], { cwd: root, stdio: 'pipe' });

  assert.ok(fs.existsSync(statusFile), 'docs/CEREBRO-STATUS.md deve existir');
  const content = fs.readFileSync(statusFile, 'utf8');

  assert.match(content, /^---\r?\ngerado:/, 'Deve conter frontmatter de gerado');
  assert.match(content, /# Status do Repositório/, 'Deve conter título principal');
  assert.match(content, /## Último commit/, 'Deve listar o último commit');
  assert.match(content, /## Branches ativas/, 'Deve listar branches');
  assert.match(content, /## PRs abertas/, 'Deve conter seção de PRs');
  assert.match(content, /## Módulos Modo Trabalho/, 'Deve listar módulos');
  assert.match(content, /## Últimas migrações Supabase/, 'Deve listar migrações');
  assert.match(content, /## Apostilas/, 'Deve conter contagem de apostilas');
  assert.match(content, /## Workflows ativos/, 'Deve listar workflows');
});
