const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { JSDOM } = require('jsdom');
const pages = require('./csp-pages.cjs');
const root = path.join(__dirname, '..');

function expectedPolicy(html, resources = {}) {
  const dom = new JSDOM(html);
  try {
    const doc = dom.window.document;
    const metas = doc.querySelectorAll('meta[http-equiv="Content-Security-Policy"]');
    if (metas.length !== 1) throw new Error('Expected exactly one existing CSP meta');
    // DOM text normalizes CRLF to LF, just as the browser does before hashing.
    const hashes = [...new Set([...doc.scripts]
      .filter(script => !script.hasAttribute('src') && script.textContent.trim()
        && !/^(application\/(?:ld\+)?json)$/i.test(script.type))
      .map(script => "'sha256-" + crypto.createHash('sha256')
        .update(script.textContent, 'utf8').digest('base64') + "'"))];
    for (const el of doc.querySelectorAll('*')) {
      for (const attr of el.attributes) {
        if (/^on/i.test(attr.name) || /^\s*javascript:/i.test(attr.value)) {
          throw new Error('Migrate inline handlers/javascript URLs before hardening');
        }
      }
    }
    for (const script of doc.scripts) {
      if (script.hasAttribute('src') && /^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(script.getAttribute('src').trim())
        && !(resources.scriptSrc || []).includes(script.getAttribute('src').trim())) {
        throw new Error('Review external script paths before extending this batch');
      }
    }
    const directives = metas[0].content.split(';').map(value => value.trim()).filter(Boolean);
    const result = directives.filter(value => !/^script-src(?:-elem|-attr)?\s/.test(value)).map(value => {
      // Remove legacy CDN-wide permissions; reviewed resource paths are added below.
      if (!/^(?:style-src|font-src|connect-src|worker-src)\s/.test(value)) return value;
      return value.split(/\s+/).filter(token => !/^https:\/\/(?:cdn\.jsdelivr\.net|cdnjs\.cloudflare\.com)(?:\/|$)/.test(token)).join(' ');
    });
    if (resources.connectSrc?.length) {
      const connectIndex = result.findIndex(value => /^connect-src\s/.test(value));
      if (connectIndex < 0) throw new Error('Expected existing connect-src');
      result[connectIndex] += ' ' + resources.connectSrc.join(' ');
    }
    const index = result.findIndex(value => /^style-src\s/.test(value));
    result.splice(index < 0 ? result.length : index, 0,
      ["script-src 'self'", ...hashes, ...(resources.scriptSrc || []), ...(resources.wasm ? ["'wasm-unsafe-eval'"] : [])].join(' '), "script-src-attr 'none'");
    return result.join('; ');
  } finally {
    dom.window.close();
  }
}

function sync(write = false) {
  let failures = 0;
  const changes = [];
  for (const file of pages) {
    const full = path.join(root, file);
    const html = fs.readFileSync(full, 'utf8');
    let policy;
    try { policy = expectedPolicy(html, pages.resources?.[file]); }
    catch (error) { throw new Error(file + ': ' + error.message, {cause:error}); }
    const pattern = /(<meta\b[^>]*http-equiv="Content-Security-Policy"[^>]*\bcontent=")([^"]*)(")/i;
    if (!pattern.test(html)) throw new Error(file + ': unsupported CSP meta syntax');
    let updated = html.replace(pattern, (_, start, old, end) => start + policy + end);
    // CSP must precede base/resource tags; charset must still fit in the first 1024 bytes.
    const dom = new JSDOM(updated);
    const meta = dom.window.document.querySelector('meta[http-equiv="Content-Security-Policy"]');
    const resource = dom.window.document.querySelector('base,script,style,link[href]');
    const needsMove = resource && !(meta.compareDocumentPosition(resource) & 4);
    dom.window.close();
    if (needsMove) {
      const cspTag = updated.match(/<meta\b[^>]*http-equiv="Content-Security-Policy"[^>]*>/i)[0];
      const charset = updated.match(/<meta\b[^>]*charset=[^>]*>/i)[0];
      const removeTag = (source, tag) => {
        const escaped = tag.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const wholeLine = new RegExp('^[ \\t]*' + escaped + '[ \\t]*\\r?\\n', 'm');
        return wholeLine.test(source) ? source.replace(wholeLine, '') : source.replace(tag, '');
      };
      updated = removeTag(removeTag(updated, cspTag), charset);
      const newline = updated.includes('\r\n') ? '\r\n' : '\n';
      updated = updated.replace(/<head\b[^>]*>/i, tag => tag + newline + '  ' + charset + newline + '  ' + cspTag);
    }
    if (updated === html) continue;
    if (write) changes.push({ full, updated });
    else { failures++; console.error(file + ': CSP/hash drift; review and run node scripts/sync-csp.cjs --write'); }
  }
  // Validate the entire explicit batch before writing any page.
  for (const { full, updated } of changes) fs.writeFileSync(full, updated);
  return failures;
}

if (require.main === module) {
  const write = process.argv.includes('--write');
  const failures = sync(write);
  console.log(pages.length + ' pages; CSP ' + (write ? 'updated' : failures ? 'out of sync' : 'verified'));
  process.exitCode = failures ? 1 : 0;
}
module.exports = { expectedPolicy, sync, pages };
