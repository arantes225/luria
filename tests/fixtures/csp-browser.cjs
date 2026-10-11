// Manual Chromium harness: real HTML/meta/scripts, local synthetic backend only.
// Start: node tests/fixtures/csp-browser.cjs (binds loopback port 4196).
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = path.join(__dirname, '../..');
const pages = require('../../scripts/csp-pages.cjs');
const probe = `(() => {
  const panel = document.createElement('aside');
  panel.id = 'csp-browser-proof';
  panel.style.cssText = 'position:fixed;bottom:0;left:0;z-index:999999;background:#fff;color:#111;padding:8px;border:1px solid #184888;font:12px monospace';
  panel.innerHTML = '<button type="button" id="csp-run">Testar bloqueios CSP</button> <output id="csp-status">Não executado</output><pre id="csp-violations"></pre>';
  document.body.appendChild(panel);
  const records = [];
  document.addEventListener('securitypolicyviolation', event => {
    records.push({directive:event.effectiveDirective,blocked:event.blockedURI});
    document.getElementById('csp-violations').textContent = JSON.stringify(records);
  });
  document.getElementById('csp-run').addEventListener('click', () => {
    const code = "document.body.dataset.cspInjected='executed';";
    const script = document.createElement('script'); script.textContent = code; document.body.appendChild(script);
    const button = document.createElement('button'); button.setAttribute('onclick', code); document.body.appendChild(button); button.click(); button.remove();
    const link = document.createElement('a'); link.href = 'javascript:' + code; document.body.appendChild(link); link.click(); link.remove();
    const dataScript = document.createElement('script'); dataScript.src = 'data:text/javascript,' + encodeURIComponent(code); document.body.appendChild(dataScript);
    const foreign = document.createElement('script'); foreign.src = 'https://csp-blocked.invalid/payload.js'; document.body.appendChild(foreign);
    let evalBlocked = false; try { (0,eval)(code); } catch (_) { evalBlocked = true; }
    setTimeout(() => {
      const kinds = new Set(records.map(record => record.directive));
      const ok = !document.body.dataset.cspInjected && evalBlocked && kinds.has('script-src-elem') && kinds.has('script-src-attr') && kinds.has('script-src');
      document.getElementById('csp-status').textContent = ok ? 'PASS: inline, handler, javascript:, data:, origem externa e eval bloqueados' : 'FAIL: execução inesperada ou bloqueio não observado';
    }, 250);
  });
})();`;

http.createServer((req, res) => {
  const url = new URL(req.url, 'http://127.0.0.1:4196');
  const send = (type, body) => { res.setHeader('Content-Type', type); res.setHeader('Cache-Control', 'no-store'); res.end(body); };
  if (url.pathname === '/__csp_probe.js') return send('text/javascript', probe);
  if (url.pathname === '/assets/vendor/supabase-2.110.6.js') {
    let fixture = fs.readFileSync(path.join(__dirname, 'supabase-browser.js'), 'utf8');
    fixture = fixture.replace('if(name==="is_admin")return{data:false', 'if(name==="is_admin")return{data:true');
    fixture = fixture.replace('if(["my_friends"', 'if(name==="luria_bootstrap")return{data:{is_admin:true,profile:db().profiles[0],theme:db().user_settings.at(-1).theme,entitlements:{plan:"pro",features:{}}},error:null};\nif(["my_friends"');
    fixture += `\nwindow.supabaseClient.auth.signInWithPassword=async()=>({data:null,error:{message:'Login simulado: controle executado'}});\nwindow.supabaseClient.auth.signUp=async()=>({data:null,error:{message:'Cadastro simulado: controle executado'}});\nif(location.pathname==='/'||location.pathname.startsWith('/login'))window.supabaseClient.auth.getSession=async()=>({data:{session:null},error:null});\nwindow.supabase={createClient:()=>window.supabaseClient};`;
    fixture += `\nif(new URLSearchParams(location.search).has('loginSuccess'))window.supabaseClient.auth.signInWithPassword=async()=>({data:{session:{user:window.__fixtureOwner}},error:null});`;
    return send('text/javascript', fixture);
  }
  // Do not register a persistent worker in the disposable fixture origin.
  if (url.pathname === '/assets/js/pwa.js') return send('text/javascript', '/* PWA registration excluded from fixture; production file unchanged. */');
  let relative = decodeURIComponent(url.pathname).replace(/^\/+/, '');
  if (!relative || relative.endsWith('/')) relative += 'index.html';
  if (!pages.includes(relative) && !relative.startsWith('assets/') && relative !== 'manifest.webmanifest') {
    res.statusCode = 404; return res.end('Not found');
  }
  const full = path.resolve(root, relative);
  if (!full.startsWith(root + path.sep) || !fs.existsSync(full) || !fs.statSync(full).isFile()) { res.statusCode = 404; return res.end('Not found'); }
  const extension = path.extname(full);
  const types = {'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.json':'application/json','.webmanifest':'application/manifest+json','.png':'image/png','.svg':'image/svg+xml','.woff2':'font/woff2','.webp':'image/webp'};
  let body = fs.readFileSync(full);
  if (extension === '.html') body = body.toString().replace('</body>', '<script src="/__csp_probe.js"></script></body>');
  send(types[extension] || 'application/octet-stream', body);
}).listen(4196, '127.0.0.1', () => console.log('CSP fixture http://127.0.0.1:4196/'));
