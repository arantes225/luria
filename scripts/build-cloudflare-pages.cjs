'use strict';

/**
 * Cloudflare Pages: previews on non-main branches, production held until approval.
 *
 * Cloudflare Pages Settings:
 *   Production branch: main
 *   Build command: node scripts/build-cloudflare-pages.cjs
 *   Output directory: build/pages
 *
 * SECURITY: Always enable Cloudflare Access for preview URLs before deploying
 * a working preview; Pages preview URLs are public by default.
 */
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');

const root = path.resolve(__dirname, '..');
const output = path.join(root, 'build', 'pages');

function resolveMode(env = process.env) {
  const branch = String(env.CF_PAGES_BRANCH || '').trim();
  if (branch === 'main' && env.LURIA_RELEASE_APPROVED === 'yes') return 'production';
  if (branch && branch !== 'main') return 'preview';
  if (env.LURIA_LOCAL_PREVIEW === 'yes' && !branch) return 'preview';
  return 'hold';
}

function cleanOutput() {
  for (const location of [path.join(root, 'build'), output]) {
    if (fs.existsSync(location) && fs.lstatSync(location).isSymbolicLink()) {
      throw new Error('Refusing to write through a symlink: ' + location);
    }
  }
  fs.rmSync(output, { recursive: true, force: true });
  fs.mkdirSync(output, { recursive: true });
}

function buildHoldPage() {
  cleanOutput();
  const html = `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex, nofollow, noarchive">
  <title>LURIA — Em preparação</title>
  <style>
    :root{color-scheme:light dark;font-family:system-ui,-apple-system,sans-serif}
    body{min-height:100vh;box-sizing:border-box;margin:0;display:grid;place-items:center;padding:32px;background:#eff5ff;color:#162b46}
    main{max-width:540px;padding:42px;border:1px solid #d7e4f8;border-radius:22px;background:#fff;box-shadow:0 12px 38px #0c37611a}
    h1{font-size:clamp(26px,5vw,36px);margin:0 0 14px}
    p{line-height:1.6;color:#4a5c72;margin:0}
    small{display:block;letter-spacing:.18em;text-transform:uppercase;font-weight:750;color:#275d9b;margin-bottom:20px}
  </style>
</head>
<body>
  <main>
    <small>LURIA</small>
    <h1>Estamos preparando a plataforma.</h1>
    <p>O lançamento público ainda não foi autorizado. Este endereço não é uma prévia do produto.</p>
  </main>
</body>
</html>`;
  fs.writeFileSync(path.join(output, 'index.html'), html, 'utf8');
  fs.writeFileSync(path.join(output, 'robots.txt'), 'User-agent: *\nDisallow: /\n', 'utf8');
  fs.writeFileSync(path.join(output, '_headers'), '/*\n  X-Robots-Tag: noindex, nofollow, noarchive\n', 'utf8');
  console.log('Cloudflare Pages: production held. Only the launch placeholder was generated.');
}

function buildWebsite(mode) {
  execFileSync(process.execPath, [path.join(__dirname, 'build-pages.cjs')], { cwd: root, stdio: 'inherit' });
  // The Cloudflare project is NOT the old GitHub Pages domain owner.
  fs.rmSync(path.join(output, 'CNAME'), { force: true });
  if (mode === 'preview') {
    const headers = path.join(output, '_headers');
    fs.appendFileSync(headers, '\n/*\n  X-Robots-Tag: noindex, nofollow, noarchive\n', 'utf8');
    fs.writeFileSync(path.join(output, 'robots.txt'), 'User-agent: *\nDisallow: /\n', 'utf8');
    console.log('Cloudflare Pages: PREVIEW generated. Protect preview URL with Cloudflare Access before enabling deployment.');
  } else {
    console.log('Cloudflare Pages: public release explicitly approved.');
  }
}

if (require.main === module) {
  const mode = resolveMode();
  console.log('Cloudflare Pages deployment mode: ' + mode);
  if (mode === 'hold') buildHoldPage();
  else buildWebsite(mode);
}

module.exports = { resolveMode };
