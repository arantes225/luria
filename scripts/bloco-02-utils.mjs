import fs from 'node:fs';
import path from 'node:path';

function htmlToBlocks(title, htmlStr) {
  const blocks = [['2', title]];
  const safeHtml = String(htmlStr || '').replace(/<(?=[0-9\s=\(\+\-])/g, '&lt;');

  // Parse top-level elements or split cleanly
  const tokenRegex = /<(h2|h3|h4|p|blockquote|ul|ol|table)\b[^>]*>([\s\S]*?)<\/\1>/gi;
  let match;
  let foundAny = false;

  while ((match = tokenRegex.exec(safeHtml)) !== null) {
    foundAny = true;
    const tag = match[1].toLowerCase();
    const inner = match[2].trim();

    if (tag === 'h2' || tag === 'h3') {
      blocks.push(['3', inner.replace(/<[^>]*>/g, '').trim()]);
    } else if (tag === 'h4') {
      blocks.push(['4', inner.replace(/<[^>]*>/g, '').trim()]);
    } else if (tag === 'p' || tag === 'blockquote') {
      const text = inner.replace(/^<p>|<\/p>$/gi, '').trim();
      if (text) blocks.push(['p', text]);
    } else if (tag === 'ul' || tag === 'ol') {
      const items = [...inner.matchAll(/<li\b[^>]*>([\s\S]*?)<\/li>/gi)].map(m => m[1].trim()).filter(Boolean);
      if (items.length) blocks.push([tag === 'ul' ? 'u' : 'o', items]);
    } else if (tag === 'table') {
      const headers = [...inner.matchAll(/<th\b[^>]*>([\s\S]*?)<\/th>/gi)].map(m => m[1].trim());
      const rows = [];
      const trMatches = [...inner.matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/gi)];
      for (const tr of trMatches) {
        const tds = [...tr[1].matchAll(/<td\b[^>]*>([\s\S]*?)<\/td>/gi)].map(m => m[1].trim());
        if (tds.length) rows.push(tds);
      }
      if (headers.length || rows.length) {
        blocks.push(['t', headers, rows, 'book-table']);
      }
    }
  }

  if (!foundAny && safeHtml.trim()) {
    blocks.push(['p', safeHtml.trim()]);
  }

  return blocks;
}

function flattenedStrings(node, target) {
  if (typeof node === 'string' && node.length >= 5) target.push(node);
  else if (Array.isArray(node)) for (const child of node) flattenedStrings(child, target);
}

function countUsefulCharsV2(payload) {
  const sections = Array.isArray(payload.q) ? payload.q : [];
  const body = sections.filter(s =>
    Array.isArray(s) &&
    !/^(referencias|resumo|resumo-prova|mapa-mental|sumario|capa)$/i.test(String(s[0] ?? ''))
  );
  const pieces = [];
  for (const s of body) flattenedStrings(s[2] ?? [], pieces);
  const raw = pieces.join(' ');
  const clean = raw
    .replace(/<[^>]*>/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim();
  return [...clean].length;
}

function generateHtml(slug, title) {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; base-uri 'self'; object-src 'none'; form-action 'self'; script-src 'self'; script-src-attr 'none'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://sxdsfklllilhdyuamvvg.supabase.co https://media.springernature.com https://commons.wikimedia.org https://upload.wikimedia.org https://pdres.s3.amazonaws.com https://www.cookmedical.com https://www.ncbi.nlm.nih.gov https://phil.cdc.gov https://openverse.org; font-src 'self' data:; connect-src 'self' https://sxdsfklllilhdyuamvvg.supabase.co wss://sxdsfklllilhdyuamvvg.supabase.co; worker-src 'self' blob:; media-src 'self' data: blob:; frame-src 'self' blob:; upgrade-insecure-requests">
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="/assets/js/apostila-image-fallback.js"></script>
  <meta name="referrer" content="strict-origin-when-cross-origin">
  <title>${title} · LURIA</title>
  <link rel="manifest" href="/manifest.webmanifest?v=5">
  <link rel="icon" type="image/png" href="/assets/img/logos/logo-icone-original.png?v=favicon2">
  <meta name="theme-color" content="#0A2342">
  <script src="/assets/js/ui-routes.js?v=1"></script>
  <link rel="stylesheet" href="/assets/css/ui-app.css?v=7">
  <link rel="stylesheet" href="/assets/css/style.css?v=16.14-font-unified">
  <link rel="stylesheet" href="/assets/css/luria-brand-v5.css?v=20261006-apostilas-theme-v91">
  <link rel="stylesheet" href="/assets/css/apostila-renderer.css?v=1-pilot">
  <link rel="canonical" href="/apostilas/${slug}/">
  <style id="luria-apostila-navigation-fix">.book-outline{position:sticky;top:8px;max-height:calc(100dvh - 16px);padding:10px;overflow-y:auto;overscroll-behavior:contain}.book-outline-back{width:100%;height:32px;min-height:32px;margin-bottom:7px;padding:0 8px;font-size:9px}.book-outline-head{padding:3px 3px 7px}.book-outline-head small{font-size:7px}.book-outline-head strong{font-size:10.5px}.book-outline-nav{gap:1px;margin-top:6px}.book-outline-link{min-height:25px;padding:4px 6px;font-size:8.7px;line-height:1.12}@media(max-width:900px){.book-outline{top:auto;max-height:185px;overflow-y:auto}.book-outline-nav{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));overflow:visible}.book-outline-link{white-space:normal;min-height:28px}}.apostila-approved-figure{width:min(78%,620px)}.apostila-approved-figure-intro p{font-size:12px!important}.apostila-approved-figure-focus{font-size:11px}</style>
  <link rel="stylesheet" href="/assets/css/education-ui-v2.css?v=2">
</head>
<body data-ui-nav="v2" data-ui-context="study" data-ui="v2" data-page="aprender" data-apostila-slug="${slug}" data-apostila-content="/apostilas/${slug}/content.json">
  <script src="/assets/js/ui-theme-v2.js?v=20261013-frame2"></script>
  <script defer src="/assets/js/ui-navigation-v2.js?v=20261013-button1"></script>
  <div id="apostila-root"></div>
  <script src="/assets/js/apostila-renderer.js?v=1-pilot"></script>
</body>
</html>
`;
}

function saveBook(book) {
  const targetDir = path.join('apostilas', book.slug);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  let payload;
  if (book.v === 2 && Array.isArray(book.q)) {
    payload = book;
  } else {
    const o = [];
    const q = [];

    for (const s of book.sections || []) {
      const id = String(s.id || '').trim();
      const title = String(s.title || '').trim();
      o.push([id, title]);
      if (Array.isArray(s.blocks)) {
        q.push([id, 0, s.blocks]);
      } else {
        q.push([id, 0, htmlToBlocks(title, s.body_html)]);
      }
    }

    const refItems = (book.references || []).map(r => {
      const url = r.url || 'https://www.gov.br/saude';
      const label = r.label || r.title || url;
      return `<a href="${url}" target="_blank" rel="noopener noreferrer">${label}</a>`;
    });

    o.push(['referencias', 'Referências']);
    q.push([
      'referencias',
      0,
      [
        ['2', 'Referências Oficiais e Diretrizes'],
        ['o', refItems, 'reference-list']
      ]
    ]);

    payload = {
      v: 2,
      s: book.slug,
      t: book.title,
      p: book.description || `${book.title} — Livro-Texto LURIA`,
      o,
      h: [
        'Apostila LURIA',
        book.title,
        book.description || 'Material autoral aprofundado para residência médica e ENAMED',
        [
          `Área: ${book.area || 'Medicina'}`,
          `Matéria: ${book.materia || book.area || 'Clínica'}`,
          `Tema: ${book.title}`
        ],
        'apostila-identity'
      ],
      q
    };
  }

  fs.writeFileSync(path.join(targetDir, 'content.json'), JSON.stringify(payload), 'utf8');
  fs.writeFileSync(path.join(targetDir, 'index.html'), generateHtml(book.slug, book.title), 'utf8');

  const chars = countUsefulCharsV2(payload);
  console.log(`[OK] ${book.slug} (${book.title}) -> ${chars} caracteres didáticos úteis (v2). Seções: ${payload.q.length}`);
  return chars;
}

const countUsefulChars = countUsefulCharsV2;
export { countUsefulChars, generateHtml, saveBook, htmlToBlocks };
