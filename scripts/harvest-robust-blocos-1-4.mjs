import fs from 'fs';
import { getBlocos1A4Apostilas } from './listar-apostilas-blocos-1-4.mjs';
import { CLINICAL_TOPIC_QUERIES } from './clinical-topics-queries.mjs';

const USER_AGENT = 'LuriaBot/1.0 (editorial@luria.med.br)';

// Busca imagem válida no Wikimedia Commons tentando a lista de queries em ordem
async function searchWithFallbacks(queryList) {
  for (const query of queryList) {
    const cleanQuery = query + ' -filetype:webm -filetype:ogv -filetype:pdf -filetype:ogg';
    const url = 'https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrnamespace=6&gsrlimit=6&prop=imageinfo&iiprop=url|size|mime|extmetadata&format=json&gsrsearch=' + encodeURIComponent(cleanQuery);
    try {
      const res = await fetch(url, { headers: { 'User-Agent': USER_AGENT } });
      if (!res.ok) continue;
      const data = await res.json();
      if (!data.query?.pages) continue;

      for (const page of Object.values(data.query.pages)) {
        const info = page.imageinfo?.[0];
        if (!info || !info.url) continue;
        const mime = (info.mime || '').toLowerCase();
        if (mime.includes('pdf') || mime.includes('ogg') || mime.includes('webm') || mime.includes('audio') || mime.includes('video')) continue;

        const meta = info.extmetadata || {};
        const license = meta.LicenseShortName?.value || meta.UsageTerms?.value || 'CC BY-SA';
        const author = (meta.Artist?.value || meta.Credit?.value || 'Wikimedia Commons').replace(/<[^>]+>/g, '').trim().slice(0, 80) || 'Wikimedia Commons';
        const filename = page.title.replace(/^File:/, '');

        // Validação do status HTTP da imagem
        const rawUrl = 'https://commons.wikimedia.org/wiki/Special:FilePath/' + encodeURIComponent(filename);
        const headRes = await fetch(rawUrl, { method: 'HEAD', headers: { 'User-Agent': USER_AGENT } });
        if (headRes.status === 200 || headRes.status === 301 || headRes.status === 302) {
          return {
            filename,
            canonicalUrl: rawUrl,
            sourceUrl: 'https://commons.wikimedia.org/wiki/' + encodeURIComponent(page.title),
            author,
            license
          };
        }
      }
    } catch {
      // Tenta próximo termo de fallback
    }
  }
  return null;
}

async function run() {
  console.log('=== HARVEST ROBUSTO DE IMAGENS CLÍNICAS (BLOCOS 1 A 4) ===');
  const apostilas = getBlocos1A4Apostilas();
  const candidateMap = new Map();
  const visitedFilenames = new Set();

  let topicsProcessed = 0;
  let totalCandidates = 0;

  for (const item of apostilas) {
    const list = CLINICAL_TOPIC_QUERIES[item.slug];
    if (!list || list.length === 0) continue;

    topicsProcessed++;
    let perTopicCount = 0;

    for (const entry of list) {
      const match = await searchWithFallbacks(entry.queries);
      if (match && !visitedFilenames.has(match.filename)) {
        visitedFilenames.add(match.filename);
        perTopicCount++;
        totalCandidates++;

        const safeKey = match.filename.replace(/[^a-zA-Z0-9_.-]/g, '_').slice(0, 80);
        const candidateItem = {
          apostila_path: `/apostilas/${item.slug}/`,
          apostila_title: item.slug,
          candidate_key: safeKey,
          target_section: entry.sec || 'visao-geral',
          placement: 'after',
          proposed_asset: {
            src: match.canonicalUrl,
            alt: entry.desc,
            title: entry.desc,
            caption: entry.desc,
            didactic_note: match.license
          },
          source_url: match.sourceUrl,
          source_name: match.author,
          source_license: match.license,
          source_trust: 'verified',
          review_status: 'pending'
        };

        const mapKey = `${item.slug}:${match.filename}`;
        candidateMap.set(mapKey, candidateItem);
      }
    }

    console.log(`[${item.num}] Bloco ${item.bloco} - ${item.slug}: ${perTopicCount} imagens obtidas com sucesso.`);
  }

  const allItems = Array.from(candidateMap.values());
  console.log(`\n======================================================`);
  console.log(`TOTAL DE TEMAS PROCESSADOS: ${topicsProcessed}`);
  console.log(`TOTAL DE IMAGENS CLÍNICAS VERIFICADAS: ${allItems.length}`);
  console.log(`======================================================\n`);

  // Salva o manifesto consolidado
  fs.writeFileSync(
    'apostilas/curadoria-imagens-v2/curadoria-blocos-1-4-consolidada.json',
    JSON.stringify(allItems, null, 2),
    'utf8'
  );

  // Divide em lotes de até 50 imagens por arquivo para carregar rápido e sem estouro de tamanho no /admin/
  const BATCH_SIZE = 50;
  const numBatches = Math.ceil(allItems.length / BATCH_SIZE);
  const createdFiles = [];

  for (let i = 0; i < numBatches; i++) {
    const slice = allItems.slice(i * BATCH_SIZE, (i + 1) * BATCH_SIZE);
    const num = String(i + 1).padStart(2, '0');
    const filename = `apostilas/curadoria-imagens-v2/admin-import-blocos-1-4-parte${num}.json`;
    fs.writeFileSync(filename, JSON.stringify(slice, null, 2), 'utf8');
    createdFiles.push({ file: filename, count: slice.length });
    console.log(`[LOTE GERADO] ${filename} (${slice.length} imagens)`);
  }

  console.log('\nTodos os arquivos de lote foram criados e estão prontos para importação no /admin/.');
}

run();
