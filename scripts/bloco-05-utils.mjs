import fs from 'fs';
import path from 'path';

export const BLOCO_05_AULAS = [
  { aula: 93, area: 'Pediatria', theme: 'Asma na infância', slug: 'asma-na-infancia' },
  { aula: 94, area: 'Ginecologia e Obstetrícia', theme: 'Rotura prematura de membranas', slug: 'amniorrexe-prematura' },
  { aula: 95, area: 'Medicina Preventiva', theme: 'Sensibilidade, especificidade e valores preditivos', slug: 'sensibilidade-especificidade-e-valores-preditivos' },
  { aula: 96, area: 'Clínica Médica', theme: 'Distúrbios hidroeletrolíticos', slug: 'disturbios-hidroeletroliticos' },
  { aula: 97, area: 'Cirurgia Geral', theme: 'Pancreatite aguda cirúrgica', slug: 'pancreatite-aguda-cirurgica' },
  { aula: 98, area: 'Pediatria', theme: 'Crupe e epiglotite', slug: 'crupe-e-epiglotite' },
  { aula: 99, area: 'Ginecologia e Obstetrícia', theme: 'Trabalho de parto prematuro', slug: 'trabalho-parto-prematuro' },
  { aula: 100, area: 'Medicina Preventiva', theme: 'Testes diagnósticos e curvas ROC', slug: 'testes-diagnosticos-e-curvas-roc' },
  { aula: 101, area: 'Clínica Médica', theme: 'Distúrbios ácido-base', slug: 'disturbios-acido-base' },
  { aula: 102, area: 'Cirurgia Geral', theme: 'Obstrução intestinal', slug: 'obstrucao-intestinal' },
  { aula: 103, area: 'Pediatria', theme: 'Tuberculose na infância', slug: 'tuberculose-na-infancia' },
  { aula: 104, area: 'Ginecologia e Obstetrícia', theme: 'Hemorragia pós-parto', slug: 'hemorragia-pos-parto' },
  { aula: 105, area: 'Medicina Preventiva', theme: 'Desenhos de estudos epidemiológicos', slug: 'desenhos-de-estudos-epidemiologicos' },
  { aula: 106, area: 'Clínica Médica', theme: 'Lesão renal aguda', slug: 'lesao-renal-aguda' },
  { aula: 107, area: 'Cirurgia Geral', theme: 'Hérnias da parede abdominal', slug: 'hernias-da-parede-abdominal' },
  { aula: 108, area: 'Pediatria', theme: 'Infecção urinária na criança', slug: 'infeccao-urinaria-na-crianca' },
  { aula: 109, area: 'Ginecologia e Obstetrícia', theme: 'Puerpério normal e patológico', slug: 'puerperio-normal-e-patologico' },
  { aula: 110, area: 'Medicina Preventiva', theme: 'Ensaios clínicos e revisões sistemáticas', slug: 'ensaios-clinicos-e-revisoes-sistematicas' },
  { aula: 111, area: 'Clínica Médica', theme: 'Doença renal crônica', slug: 'doenca-renal-cronica' },
  { aula: 112, area: 'Cirurgia Geral', theme: 'Diverticulite aguda', slug: 'diverticulite-aguda' },
  { aula: 113, area: 'Pediatria', theme: 'Síndrome nefrótica e síndrome nefrítica', slug: 'sindrome-nefrotica-e-sindrome-nefritica' },
  { aula: 114, area: 'Ginecologia e Obstetrícia', theme: 'Infecção puerperal', slug: 'infeccao-puerperal' },
  { aula: 115, area: 'Medicina Preventiva', theme: 'Vieses, confundimento e causalidade', slug: 'vieses-confundimento-e-causalidade' }
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

export function htmlToBlocks(sectionTitle, html) {
  const blocks = [];
  if (sectionTitle) {
    blocks.push(['2', sectionTitle]);
  }

  const parts = html.split(/(<h[34][^>]*>[\s\S]*?<\/h[34]>|<table[^>]*>[\s\S]*?<\/table>|<ul[^>]*>[\s\S]*?<\/ul>|<ol[^>]*>[\s\S]*?<\/ol>|<blockquote[^>]*>[\s\S]*?<\/blockquote>|<div class="formula-box"[^>]*>[\s\S]*?<\/div>|<div class="book-case"[^>]*>[\s\S]*?<\/div>)/gi);

  for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed) continue;

    if (/^<h3[^>]*>/i.test(trimmed)) {
      const text = trimmed.replace(/<[^>]+>/g, '').trim();
      blocks.push(['3', text]);
    } else if (/^<h4[^>]*>/i.test(trimmed)) {
      const text = trimmed.replace(/<[^>]+>/g, '').trim();
      blocks.push(['4', text]);
    } else if (/^<blockquote[^>]*>/i.test(trimmed)) {
      const text = trimmed.replace(/^<blockquote[^>]*>([\s\S]*?)<\/blockquote>$/i, '$1').trim();
      blocks.push(['p', `<blockquote>${text}</blockquote>`]);
    } else if (/^<div class="formula-box"[^>]*>/i.test(trimmed)) {
      const text = trimmed.replace(/^<div class="formula-box"[^>]*>([\s\S]*?)<\/div>$/i, '$1').trim();
      blocks.push(['p', `<div class="formula-box">${text}</div>`]);
    } else if (trimmed.startsWith('<table')) {
      const theadMatch = trimmed.match(/<thead[\s\S]*?<\/thead>/i);
      const headers = [];
      if (theadMatch) {
        const thMatches = theadMatch[0].matchAll(/<th[^>]*>([\s\S]*?)<\/th>/gi);
        for (const th of thMatches) headers.push(th[1].trim());
      }

      const rows = [];
      const tbodyMatch = trimmed.match(/<tbody[\s\S]*?<\/tbody>/i);
      const rowsSource = tbodyMatch ? tbodyMatch[0] : trimmed;
      const trMatches = rowsSource.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi);
      for (const tr of trMatches) {
        const trHtml = tr[1];
        if (trHtml.includes('<th') && headers.length === 0) {
          const thM = trHtml.matchAll(/<th[^>]*>([\s\S]*?)<\/th>/gi);
          for (const th of thM) headers.push(th[1].trim());
          continue;
        }
        const cells = [];
        const tdMatches = trHtml.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi);
        for (const td of tdMatches) cells.push(td[1].trim());
        if (cells.length > 0) rows.push(cells);
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
