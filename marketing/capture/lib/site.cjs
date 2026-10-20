'use strict';
/*
 * Servidor isolado: o navegador de captura acessa https://luria.test, e cada
 * requisição é atendida a partir dos arquivos locais do repositório.
 * - Qualquer origem externa é BLOQUEADA (e registrada).
 * - /assets/js/supabase.js é trocado pelo backend fictício.
 * - Service workers são bloqueados no contexto.
 * Mesmo padrão dos testes de navegador existentes (tests/social-layout.browser.cjs).
 */
const fs = require('node:fs');
const path = require('node:path');
const { REPO } = require('../../scripts/lib/common.cjs');

const ORIGIN = 'https://luria.test';
const MIME = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'application/javascript', '.mjs': 'application/javascript',
  '.json': 'application/json', '.webmanifest': 'application/manifest+json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.webp': 'image/webp', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.gif': 'image/gif', '.avif': 'image/avif',
  '.woff2': 'font/woff2', '.woff': 'font/woff', '.ttf': 'font/ttf', '.mp3': 'audio/mpeg', '.mp4': 'video/mp4', '.ico': 'image/x-icon'
};
const FIXTURE = path.join(__dirname, '..', 'fixtures', 'supabase-marketing.js');
const BLOCKED_ROOTS = /^\/(?:\.git|node_modules|marketing|db|supabase|cloudflare|tests|scripts|tools|docs)(?:\/|$)/;

const CASES_FILE = path.join(REPO, 'data', 'plantao-cases-v2.json');
const CLINICAL_CASES_JSON = fs.existsSync(CASES_FILE) ? fs.readFileSync(CASES_FILE, 'utf8') : '[]';

async function isolate(context, report) {
  await context.route('**/*', async route => {
    const request = route.request();
    let url;
    try { url = new URL(request.url()); } catch { return route.abort(); }
    if (url.protocol === 'data:' || url.protocol === 'blob:') return route.continue();
    if (url.origin !== ORIGIN) {
      report.blocked.push(url.origin + url.pathname);
      return route.abort('blockedbyclient');
    }
    const pathname = decodeURIComponent(url.pathname);
    if (pathname === '/assets/js/supabase.js' || pathname.endsWith('/assets/js/supabase.js')) {
      const fixtureCode = `window.__CLINICAL_CASES_FIXTURE = ${CLINICAL_CASES_JSON};\n` + fs.readFileSync(FIXTURE, 'utf8');
      return route.fulfill({ contentType: MIME['.js'], body: fixtureCode });
    }
    if (BLOCKED_ROOTS.test(pathname)) return route.fulfill({ status: 404, body: '' });
    let file = path.join(REPO, pathname);
    if (!file.startsWith(REPO)) return route.fulfill({ status: 403, body: '' });
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
    if (!fs.existsSync(file)) {
      report.missing.push(pathname);
      return route.fulfill({ status: 404, body: '' });
    }
    return route.fulfill({ contentType: MIME[path.extname(file).toLowerCase()] || 'application/octet-stream', body: fs.readFileSync(file) });
  });
}

function attachErrorLog(page, report) {
  page.on('pageerror', e => report.pageErrors.push(e.message));
  page.on('console', m => { if (m.type() === 'error') report.consoleErrors.push(m.text()); });
  page.on('requestfailed', r => {
    const u = r.url();
    if (u.startsWith(ORIGIN)) report.failedRequests.push(u + ' ' + (r.failure()?.errorText || ''));
  });
}

function newReport() {
  return { pageErrors: [], consoleErrors: [], failedRequests: [], blocked: [], missing: [], fixtureUnhandled: [], steps: [] };
}

module.exports = { ORIGIN, isolate, attachErrorLog, newReport };
