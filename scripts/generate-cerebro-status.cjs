const { execSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');

function safeExec(command, fallback = '') {
  try {
    return execSync(command, { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
  } catch {
    return fallback;
  }
}

const now = new Date();
const dateStr = now.toISOString().replace(/T/, ' ').replace(/\..+/, '').slice(0, 16) + ' UTC';

const commit = safeExec('git log -1 --format="%h — %s"', 'Desconhecido');
const rawBranches = safeExec("git branch -r --list 'origin/*'", '');
const branchList = rawBranches
  .split('\n')
  .map(b => b.trim())
  .filter(b => b && !b.includes('HEAD'))
  .map(b => b.replace(/^origin\//, ''))
  .sort()
  .join(', ');

// Get open PRs safely without shell expansion
let prLines = '- (sem PRs abertas)';
const prsJson = safeExec('gh pr list --state open --json number,title,headRefName', '');
if (prsJson) {
  try {
    const prs = JSON.parse(prsJson);
    if (Array.isArray(prs) && prs.length > 0) {
      prLines = prs
        .map(pr => `- PR #${pr.number} \`${String(pr.headRefName).replace(/`/g, '')}\` — ${String(pr.title).replace(/[\r\n]+/g, ' ')}`)
        .join('\n');
    }
  } catch {
    // fallback if json parse fails
  }
}

// Migrations
const migrationsDir = path.join(root, 'supabase', 'migrations');
let migrations = '- (nenhuma)';
if (fs.existsSync(migrationsDir)) {
  const files = fs.readdirSync(migrationsDir)
    .filter(f => f.endsWith('.sql'))
    .sort()
    .slice(-5)
    .reverse();
  if (files.length > 0) {
    migrations = files.map(f => `- ${f}`).join('\n');
  }
}

// Modulos
const trabalhoDir = path.join(root, 'trabalho');
let modulos = '- (nenhum)';
if (fs.existsSync(trabalhoDir)) {
  const items = fs.readdirSync(trabalhoDir).sort();
  if (items.length > 0) {
    modulos = items.map(m => `- ${m}`).join('\n');
  }
}

// Apostilas count
const apostilasDir = path.join(root, 'apostilas');
let apostilasCount = 0;
if (fs.existsSync(apostilasDir)) {
  apostilasCount = fs.readdirSync(apostilasDir).filter(f => {
    try {
      return fs.statSync(path.join(apostilasDir, f)).isDirectory();
    } catch {
      return false;
    }
  }).length;
}

// Workflows
const workflowsDir = path.join(root, '.github', 'workflows');
let workflows = '- (nenhum)';
if (fs.existsSync(workflowsDir)) {
  const wfFiles = fs.readdirSync(workflowsDir).filter(f => f.endsWith('.yml')).sort();
  if (wfFiles.length > 0) {
    workflows = wfFiles.map(w => `- ${w}`).join('\n');
  }
}

const content = `---
gerado: ${dateStr}
fonte: GitHub Actions (push na main)
---
# Status do Repositório — ${dateStr}

## Último commit
${commit}

## Branches ativas
${branchList}

## PRs abertas
${prLines}

## Módulos Modo Trabalho (pasta \`trabalho/\`)
${modulos}

## Últimas migrações Supabase
${migrations}

## Apostilas (total de pastas)
${apostilasCount} pastas em \`apostilas/\`

## Workflows ativos
${workflows}
`;

const dest = path.join(root, 'docs', 'CEREBRO-STATUS.md');
fs.writeFileSync(dest, content, 'utf8');
console.log('docs/CEREBRO-STATUS.md gerado com sucesso com proteção contra injeção de comandos.');
