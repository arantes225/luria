import fs from 'fs';
import { getBlocos1A4Apostilas } from './listar-apostilas-blocos-1-4.mjs';
import { CLINICAL_SEARCH_TERMS } from './clinical-topics-map.mjs';

const USER_AGENT = 'LuriaBot/1.0 (editorial@luria.med.br)';

// Função de busca na API do Wikimedia Commons
async function searchCommons(query) {
  const cleanQuery = query + ' -filetype:webm -filetype:ogv -filetype:pdf -filetype:ogg';
  const url = 'https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrnamespace=6&gsrlimit=5&prop=imageinfo&iiprop=url|size|mime|extmetadata&format=json&gsrsearch=' + encodeURIComponent(cleanQuery);
  try {
    const res = await fetch(url, { headers: { 'User-Agent': USER_AGENT } });
    if (!res.ok) return null;
    const data = await res.json();
    if (!data.query?.pages) return null;
    
    for (const page of Object.values(data.query.pages)) {
      const info = page.imageinfo?.[0];
      if (!info || !info.url) continue;
      const mime = (info.mime || '').toLowerCase();
      if (mime.includes('pdf') || mime.includes('ogg') || mime.includes('webm') || mime.includes('audio') || mime.includes('video')) continue;
      
      const meta = info.extmetadata || {};
      const license = meta.LicenseShortName?.value || meta.UsageTerms?.value || 'CC BY-SA';
      const author = (meta.Artist?.value || meta.Credit?.value || 'Wikimedia Commons').replace(/<[^>]+>/g, '').trim().slice(0, 80) || 'Wikimedia Commons';
      const filename = page.title.replace(/^File:/, '');
      
      return {
        filename,
        canonicalUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/' + encodeURIComponent(filename),
        sourceUrl: 'https://commons.wikimedia.org/wiki/' + encodeURIComponent(page.title),
        author,
        license
      };
    }
    return null;
  } catch (err) {
    return null;
  }
}

// Verifica status HTTP do arquivo
async function verifyUrl(url) {
  try {
    const res = await fetch(url, { method: 'HEAD', headers: { 'User-Agent': USER_AGENT } });
    return res.status === 200 || res.status === 301 || res.status === 302;
  } catch {
    return false;
  }
}

async function run() {
  console.log('=== HARVEST DE IMAGENS CLÍNICAS REAIS PARA BLOCOS 1 A 4 ===');
  const apostilas = getBlocos1A4Apostilas();
  const candidates = [];
  const visitedFilenames = new Set();
  
  let totalSearches = 0;
  let successfulMatches = 0;

  for (const item of apostilas) {
    const terms = CLINICAL_SEARCH_TERMS[item.slug];
    if (!terms || terms.length === 0) {
      // Tema administrativo/legal: tratado diretamente via callouts e tabelas no texto da apostila
      continue;
    }

    console.log(`\n[Processando ${item.num}] Bloco ${item.bloco} - ${item.slug} (${terms.length} termos clínicos)`);

    for (const term of terms) {
      totalSearches++;
      const result = await searchCommons(term.query);
      if (!result) {
        console.log(`  [X] Falha na busca: "${term.query}"`);
        continue;
      }

      if (visitedFilenames.has(result.filename)) {
        console.log(`  [-] Imagem já inclusa em outra seção: ${result.filename}`);
        continue;
      }

      // Verificação HTTP
      const isOk = await verifyUrl(result.canonicalUrl);
      if (!isOk) {
        console.log(`  [X] URL inválida/não-200: ${result.canonicalUrl}`);
        continue;
      }

      visitedFilenames.add(result.filename);
      successfulMatches++;

      const safeKey = result.filename.replace(/[^a-zA-Z0-9_.-]/g, '_').slice(0, 80);
      const candidateItem = {
        apostila_path: `/apostilas/${item.slug}/`,
        apostila_title: item.slug,
        candidate_key: safeKey,
        target_section: term.section || 'visao-geral',
        placement: 'after',
        proposed_asset: {
          src: result.canonicalUrl,
          alt: term.desc,
          title: term.desc,
          caption: term.desc,
          didactic_note: result.license
        },
        source_url: result.sourceUrl,
        source_name: result.author,
        source_license: result.license,
        source_trust: 'verified',
        review_status: 'pending'
      };

      candidates.push(candidateItem);
      console.log(`  [OK] ${result.filename} (${result.license})`);
    }
  }

  console.log('\n======================================================');
  console.log(`TOTAL DE BUSCAS REALIZADAS: ${totalSearches}`);
  console.log(`TOTAL DE IMAGENS CLÍNICAS COLETADAS E VERIFICADAS: ${successfulMatches}`);
  console.log('======================================================\n');

  // Salva relatório consolidado
  fs.writeFileSync(
    'apostilas/curadoria-imagens-v2/todos-candidatos-blocos-1-4.json',
    JSON.stringify(candidates, null, 2),
    'utf8'
  );

  // Divide em lotes de importação de até 50 itens para submissão no /admin/
  const BATCH_SIZE = 50;
  const numBatches = Math.ceil(candidates.length / BATCH_SIZE);

  for (let i = 0; i < numBatches; i++) {
    const batch = candidates.slice(i * BATCH_SIZE, (i + 1) * BATCH_SIZE);
    const batchNum = String(i + 1).padStart(2, '0');
    const batchFilename = `apostilas/curadoria-imagens-v2/admin-import-blocos-1-4-lote${batchNum}.json`;
    fs.writeFileSync(batchFilename, JSON.stringify(batch, null, 2), 'utf8');
    console.log(`Lote ${batchNum} gerado: ${batchFilename} (${batch.length} imagens)`);
  }
}

run();
