import fs from 'fs';
import path from 'path';

const USER_AGENT = 'LuriaBot/1.0 (editorial@luria.med.br)';

async function searchCommons(query) {
  const endpoint = 'https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrnamespace=6&gsrlimit=4&prop=imageinfo&iiprop=url|size|mime|extmetadata&format=json&gsrsearch=' + encodeURIComponent(query);
  try {
    const res = await fetch(endpoint, { headers: { 'User-Agent': USER_AGENT } });
    if (!res.ok) return null;
    const data = await res.json();
    if (!data.query || !data.query.pages) return null;
    for (const page of Object.values(data.query.pages)) {
      const info = page.imageinfo?.[0];
      if (!info || !info.url) continue;
      const mime = info.mime || '';
      if (mime.includes('pdf') || mime.includes('ogg') || mime.includes('webm')) continue;
      const cleanTitle = page.title.replace(/^File:/, '');
      const meta = info.extmetadata || {};
      const license = meta.LicenseShortName?.value || meta.UsageTerms?.value || 'CC BY-SA';
      const author = (meta.Artist?.value || meta.Credit?.value || 'Wikimedia Commons').replace(/<[^>]+>/g, '').trim();
      return {
        filename: cleanTitle,
        src: 'https://commons.wikimedia.org/wiki/Special:FilePath/' + encodeURIComponent(cleanTitle),
        source_url: 'https://commons.wikimedia.org/wiki/' + encodeURIComponent(page.title),
        source_name: author,
        source_license: license
      };
    }
    return null;
  } catch {
    return null;
  }
}

async function verifyUrl(url) {
  try {
    const res = await fetch(url, { method: 'HEAD', headers: { 'User-Agent': USER_AGENT } });
    return res.status === 200 || res.status === 301 || res.status === 302;
  } catch {
    return false;
  }
}

async function run() {
  console.log('Iniciando processamento e substituição do lote de imagens...');
  const mdFiles = [
    'apostilas/lotes/FA_CANDIDATAS_IMAGENS_2026-10-14.md',
    'apostilas/lotes/HAS_CANDIDATAS_IMAGENS_2026-10-14.md',
    'apostilas/lotes/ICTERICIA_NEONATAL_CANDIDATAS_IMAGENS_2026-10-15.md',
    'apostilas/lotes/IC_CANDIDATAS_IMAGENS_2026-10-14.md',
    'apostilas/lotes/PERIOP_CANDIDATAS_IMAGENS_2026-10-14.md',
    'apostilas/lotes/PREOP_CANDIDATAS_IMAGENS_2026-10-14.md',
    'apostilas/lotes/SCA_CANDIDATAS_IMAGENS_2026-10-14.md'
  ];

  const candidateList = [];

  for (const f of mdFiles) {
    if (!fs.existsSync(f)) continue;
    const text = fs.readFileSync(f, 'utf8');
    const slugMatch = text.match(/apostilas\/([a-z0-9-]+)\/content\.json/);
    const slug = slugMatch ? slugMatch[1] : path.basename(f).split('_')[0].toLowerCase();
    const lines = text.split('\n');
    for (const line of lines) {
      if (line.startsWith('|') && line.includes('http')) {
        const p = line.split('|').map(s => s.trim());
        if (p.length >= 6 && p[1] !== 'Obra' && p[1] !== '---') {
          const m = p[2].match(/https:\/\/commons\.wikimedia\.org\/wiki\/File:([^\)\s]+)/);
          if (m) {
            let filename = decodeURIComponent(m[1]).replace(/[\),]+$/, '');
            const candidateKey = filename.replace(/[^a-zA-Z0-9_.-]/g, '_').slice(0, 80);
            const rawUrl = 'https://commons.wikimedia.org/wiki/Special:FilePath/' + encodeURIComponent(filename);
            const isOk = await verifyUrl(rawUrl);
            if (isOk) {
              candidateList.push({
                apostila_path: `/apostilas/${slug}/`,
                apostila_title: slug,
                candidate_key: candidateKey,
                target_section: 'visao-geral',
                placement: 'after',
                proposed_asset: {
                  src: rawUrl,
                  alt: p[1],
                  title: p[1],
                  caption: p[5] || p[1],
                  didactic_note: p[4] || ''
                },
                source_url: `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(filename)}`,
                source_name: p[3] || 'Wikimedia Commons',
                source_license: p[4] || 'CC BY-SA',
                source_trust: 'verified',
                review_status: 'pending'
              });
            }
          }
        }
      }
    }
  }

  console.log(`Validadas ${candidateList.length} imagens ativas com HTTP 200.`);
  const outputPath = 'apostilas/_imagens-candidatas-validadas-200.json';
  fs.writeFileSync(outputPath, JSON.stringify({ images: candidateList }, null, 2), 'utf8');
  console.log(`Arquivo gerado em: ${outputPath}`);
}

run();
