import fs from 'fs';
import path from 'path';

export const BLOCO_04_AULAS = [
  { aula: 70, area: 'Medicina Preventiva', theme: 'Vigilância ambiental e saúde do trabalhador', slug: 'vigilancia-ambiental-e-saude-do-trabalhador' },
  { aula: 71, area: 'Clínica Médica', theme: 'Insuficiência respiratória aguda', slug: 'insuficiencia-respiratoria-aguda' },
  { aula: 72, area: 'Cirurgia Geral', theme: 'Queimaduras', slug: 'queimaduras' },
  { aula: 73, area: 'Pediatria', theme: 'Obesidade infantil', slug: 'obesidade-infantil' },
  { aula: 74, area: 'Ginecologia e Obstetrícia', theme: 'Partograma', slug: 'partograma' },
  { aula: 75, area: 'Medicina Preventiva', theme: 'Notificação compulsória de doenças e agravos', slug: 'notificacao-compulsoria-de-doencas-e-agravos' },
  { aula: 76, area: 'Clínica Médica', theme: 'Diabetes mellitus', slug: 'diabetes-mellitus' },
  { aula: 77, area: 'Cirurgia Geral', theme: 'Abdome agudo: abordagem inicial', slug: 'abdome-agudo-abordagem-inicial' },
  { aula: 78, area: 'Pediatria', theme: 'Infecções de vias aéreas superiores', slug: 'infeccoes-de-vias-aereas-superiores' },
  { aula: 79, area: 'Ginecologia e Obstetrícia', theme: 'Indução do trabalho de parto', slug: 'inducao-do-trabalho-de-parto' },
  { aula: 80, area: 'Medicina Preventiva', theme: 'Investigação de surtos e epidemias', slug: 'investigacao-de-surtos-e-epidemias' },
  { aula: 81, area: 'Clínica Médica', theme: 'Cetoacidose diabética e estado hiperosmolar', slug: 'cetoacidose-diabetica-e-estado-hiperosmolar' },
  { aula: 82, area: 'Cirurgia Geral', theme: 'Apendicite aguda', slug: 'apendicite-aguda' },
  { aula: 83, area: 'Pediatria', theme: 'Bronquiolite viral aguda', slug: 'bronquiolite-viral-aguda' },
  { aula: 84, area: 'Ginecologia e Obstetrícia', theme: 'Distocias e parto operatório', slug: 'distocias-e-parto-operatorio' },
  { aula: 85, area: 'Medicina Preventiva', theme: 'Medidas de frequência: incidência e prevalência', slug: 'medidas-de-frequencia-incidencia-e-prevalencia' },
  { aula: 86, area: 'Clínica Médica', theme: 'Distúrbios da tireoide', slug: 'disturbios-da-tireoide' },
  { aula: 87, area: 'Cirurgia Geral', theme: 'Colecistite e colelitíase', slug: 'colecistite-e-colelitiase' },
  { aula: 88, area: 'Pediatria', theme: 'Pneumonia na criança', slug: 'pneumonia-na-crianca' },
  { aula: 89, area: 'Ginecologia e Obstetrícia', theme: 'Sofrimento fetal e avaliação da vitalidade fetal', slug: 'sofrimento-fetal-e-avaliacao-da-vitalidade-fetal' },
  { aula: 90, area: 'Medicina Preventiva', theme: 'Medidas de associação e impacto', slug: 'medidas-de-associacao-e-impacto' },
  { aula: 91, area: 'Clínica Médica', theme: 'Insuficiência adrenal e síndrome de Cushing', slug: 'insuficiencia-adrenal-e-sindrome-de-cushing' },
  { aula: 92, area: 'Cirurgia Geral', theme: 'Coledocolitíase e colangite', slug: 'coledocolitiase-e-colangite' }
];

export function extractVisibleTextFromHtml(html) {
  const articleMatch = html.match(/<article[\s\S]*?<\/article>/i);
  const raw = articleMatch ? articleMatch[0] : html;
  return raw
    .replace(/<header[\s\S]*?<\/header>/gi, ' ')
    .replace(/<nav[\s\S]*?<\/nav>/gi, ' ')
    .replace(/<section\s+id=["']referencias["'][\s\S]*?<\/section>/gi, ' ')
    .replace(/<section\s+id=["']sumario["'][\s\S]*?<\/section>/gi, ' ')
    .replace(/<section\s+id=["']resumo["'][\s\S]*?<\/section>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

export function extractVisibleTextFromJson(payload) {
  let text = '';
  const ignoredSections = new Set(['referencias', 'resumo', 'sumario', 'capa']);

  if (Array.isArray(payload.q)) {
    for (const section of payload.q) {
      const sectionId = section[0];
      if (ignoredSections.has(sectionId)) continue;
      const blocks = section[2] || [];
      for (const b of blocks) {
        const type = b[0];
        const val = b[1];
        if (typeof val === 'string') {
          text += ' ' + val.replace(/<[^>]+>/g, ' ');
        } else if (Array.isArray(val)) {
          if (type === 'o' || type === 'u') {
            for (const item of val) {
              if (typeof item === 'string') {
                text += ' ' + item.replace(/<[^>]+>/g, ' ');
              }
            }
          } else if (type === 't') {
            const headerRow = val;
            const dataRows = b[2] || [];
            if (Array.isArray(headerRow)) {
              for (const h of headerRow) {
                if (typeof h === 'string') text += ' ' + h.replace(/<[^>]+>/g, ' ');
              }
            }
            if (Array.isArray(dataRows)) {
              for (const row of dataRows) {
                if (Array.isArray(row)) {
                  for (const cell of row) {
                    if (typeof cell === 'string') text += ' ' + cell.replace(/<[^>]+>/g, ' ');
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  return text.replace(/\s+/g, ' ').trim();
}

export function countUsefulChars(slug) {
  const dir = path.join('apostilas', slug);
  if (!fs.existsSync(dir)) return { count: 0, format: 'none' };

  const jsonPath = path.join(dir, 'content.json');
  const htmlPath = path.join(dir, 'index.html');

  if (fs.existsSync(jsonPath)) {
    try {
      const payload = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
      const text = extractVisibleTextFromJson(payload);
      return { count: text.length, format: 'content.json', text };
    } catch (e) {
      // fallback to html
    }
  }

  if (fs.existsSync(htmlPath)) {
    const html = fs.readFileSync(htmlPath, 'utf8');
    const text = extractVisibleTextFromHtml(html);
    return { count: text.length, format: 'index.html', text };
  }

  return { count: 0, format: 'none' };
}

export function htmlToBlocks(title, html) {
  const blocks = [];
  blocks.push(['2', title]);

  const parts = html.split(/(<table[\s\S]*?<\/table>|<ul[\s\S]*?<\/ul>|<ol[\s\S]*?<\/ol>|<div class="book-case"[\s\S]*?<\/div>)/gi);

  for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed) continue;

    if (trimmed.startsWith('<table')) {
      const theadMatch = trimmed.match(/<thead>[\s\S]*?<tr>([\s\S]*?)<\/tr>[\s\S]*?<\/thead>/i);
      const headers = [];
      if (theadMatch) {
        const thMatches = theadMatch[1].matchAll(/<th[^>]*>([\s\S]*?)<\/th>/gi);
        for (const th of thMatches) headers.push(th[1].trim());
      }
      const tbodyMatch = trimmed.match(/<tbody>([\s\S]*?)<\/tbody>/i);
      const rows = [];
      if (tbodyMatch) {
        const trMatches = tbodyMatch[1].matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi);
        for (const tr of trMatches) {
          const cells = [];
          const tdMatches = tr[1].matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi);
          for (const td of tdMatches) cells.push(td[1].trim());
          if (cells.length) rows.push(cells);
        }
      }
      blocks.push(['t', headers, rows, 'book-table']);
    } else if (trimmed.startsWith('<ul')) {
      const items = [];
      const liMatches = trimmed.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi);
      for (const li of liMatches) items.push(li[1].trim());
      blocks.push(['u', items]);
    } else if (trimmed.startsWith('<ol')) {
      const items = [];
      const liMatches = trimmed.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi);
      for (const li of liMatches) items.push(li[1].trim());
      blocks.push(['o', items]);
    } else if (trimmed.startsWith('<div class="book-case"')) {
      const inner = trimmed.replace(/^<div[^>]*>([\s\S]*?)<\/div>$/i, '$1');
      const subParts = inner.split(/(<h[34][^>]*>[\s\S]*?<\/h[34]>|<p[^>]*>[\s\S]*?<\/p>)/gi);
      for (const sp of subParts) {
        const sTrim = sp.trim();
        if (!sTrim) continue;
        if (/^<h3/i.test(sTrim)) {
          blocks.push(['3', sTrim.replace(/<[^>]+>/g, '').trim()]);
        } else if (/^<h4/i.test(sTrim)) {
          blocks.push(['4', sTrim.replace(/<[^>]+>/g, '').trim()]);
        } else if (/^<p/i.test(sTrim)) {
          blocks.push(['p', sTrim.replace(/^<p[^>]*>([\s\S]*?)<\/p>$/i, '$1').trim()]);
        }
      }
    } else {
      const subParts = trimmed.split(/(<h[34][^>]*>[\s\S]*?<\/h[34]>|<p[^>]*>[\s\S]*?<\/p>)/gi);
      for (const sp of subParts) {
        const sTrim = sp.trim();
        if (!sTrim) continue;
        if (/^<h3/i.test(sTrim)) {
          blocks.push(['3', sTrim.replace(/<[^>]+>/g, '').trim()]);
        } else if (/^<h4/i.test(sTrim)) {
          blocks.push(['4', sTrim.replace(/<[^>]+>/g, '').trim()]);
        } else if (/^<p/i.test(sTrim)) {
          blocks.push(['p', sTrim.replace(/^<p[^>]*>([\s\S]*?)<\/p>$/i, '$1').trim()]);
        } else {
          const cleanText = sTrim.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
          if (cleanText) blocks.push(['p', sTrim]);
        }
      }
    }
  }

  return blocks;
}

export function saveBook(book) {
  const slug = book.slug || book.s;
  const title = book.title || book.t;
  const dir = path.join('apostilas', slug);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const jsonPath = path.join(dir, 'content.json');
  const htmlPath = path.join(dir, 'index.html');

  let payload;
  if (book.v === 2 && Array.isArray(book.q)) {
    payload = book;
  } else if (Array.isArray(book.sections)) {
    const o = [];
    const q = [];
    for (const s of book.sections) {
      const id = String(s.id || '').trim();
      const sTitle = String(s.title || '').trim();
      o.push([id, sTitle]);
      if (Array.isArray(s.blocks)) {
        q.push([id, 0, s.blocks]);
      } else {
        q.push([id, 0, htmlToBlocks(sTitle, s.body_html || '')]);
      }
    }
    if (Array.isArray(book.references) && book.references.length > 0) {
      const refItems = book.references.map(r => {
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
    }
    payload = {
      v: 2,
      s: slug,
      t: title,
      p: book.description || `${book.title} — Livro-Texto LURIA`,
      d: book.description || '',
      a: book.area || 'Clínica Médica',
      m: book.materia || '',
      h: [
        'Apostila LURIA',
        book.title,
        book.description || 'Material autoral aprofundado para residência médica e ENAMED',
        [
          `Área: ${book.area || 'Clínica Médica'}`,
          `Matéria: ${book.materia || book.area || 'Clínica Médica'}`,
          `Tema: ${book.title}`
        ],
        'apostila-identity'
      ],
      o,
      q
    };
  } else {
    payload = book;
  }

  fs.writeFileSync(jsonPath, JSON.stringify(payload, null, 2), 'utf8');

  let articleHtml = '';
  if (Array.isArray(payload.q)) {
    for (const section of payload.q) {
      const secId = section[0];
      const secBlocks = section[2] || [];
      articleHtml += `<section id="${secId}" class="book-section">\n`;
      for (const b of secBlocks) {
        const type = b[0];
        const val = b[1];
        if (type === '2') {
          articleHtml += `  <h2>${val}</h2>\n`;
        } else if (type === '3') {
          articleHtml += `  <h3>${val}</h3>\n`;
        } else if (type === '4') {
          articleHtml += `  <h4>${val}</h4>\n`;
        } else if (type === 'p') {
          articleHtml += `  <p>${val}</p>\n`;
        } else if (type === 'u') {
          articleHtml += `  <ul>\n`;
          for (const it of val) articleHtml += `    <li>${it}</li>\n`;
          articleHtml += `  </ul>\n`;
        } else if (type === 'o') {
          articleHtml += `  <ol>\n`;
          for (const it of val) articleHtml += `    <li>${it}</li>\n`;
          articleHtml += `  </ol>\n`;
        } else if (type === 't') {
          const headers = val;
          const rows = b[2] || [];
          articleHtml += `  <table class="book-table">\n    <thead>\n      <tr>\n`;
          for (const h of headers) articleHtml += `        <th>${h}</th>\n`;
          articleHtml += `      </tr>\n    </thead>\n    <tbody>\n`;
          for (const row of rows) {
            articleHtml += `      <tr>\n`;
            for (const c of row) articleHtml += `        <td>${c}</td>\n`;
            articleHtml += `      </tr>\n`;
          }
          articleHtml += `    </tbody>\n  </table>\n`;
        }
      }
      articleHtml += `</section>\n\n`;
    }
  }

  const html = `<!DOCTYPE html>
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
</html>`;

  fs.writeFileSync(htmlPath, html, 'utf8');
  const audit = countUsefulChars(slug);
  console.log(`[OK] ${slug} (${title}) -> ${audit.count} caracteres didáticos úteis (${audit.format}). Seções: ${payload.q ? payload.q.length : 0}`);
  return audit.count;
}
