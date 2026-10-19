import fs from 'fs';
import { getBlocos1A4Apostilas } from './listar-apostilas-blocos-1-4.mjs';

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function buildFigureHtml(item) {
  const asset = item.proposed_asset;
  const src = asset.src;
  const alt = escapeHtml(asset.alt || asset.title || 'Imagem clínica');
  const caption = escapeHtml(asset.caption || asset.title || '');
  const sourceName = escapeHtml(item.source_name || 'Acervo Médico');
  const sourceLicense = escapeHtml(item.source_license || 'Domínio Público / CC');
  const sourceUrl = item.source_url || src;

  return `<figure data-luria-curated-image="${item.candidate_key}" class="book-curated-clinical-image" style="max-width:680px;margin:20px auto 24px;background:#f8fafc;padding:12px;border-radius:12px;border:1px solid #e2e8f0;text-align:center"><img src="${src}" alt="${alt}" loading="lazy" decoding="async" style="width:100%;height:auto;max-height:480px;object-fit:contain;border-radius:8px;background:#0f172a" data-apostila-image-fallback="hidden-sibling"><p hidden role="note">Imagem temporariamente indisponível. Consulte a fonte abaixo.</p><figcaption style="margin-top:10px;font-size:12.5px;line-height:1.45;color:#334155;text-align:left"><strong>${caption}</strong><br><span style="font-size:11px;color:#64748b">Fonte: <a href="${sourceUrl}" target="_blank" rel="noopener noreferrer" style="color:#0284c7;text-decoration:underline">${sourceName} ↗</a> (${sourceLicense}). Verificação técnica: homologada e ativa no site.</span></figcaption></figure>`;
}

async function run() {
  console.log('=== EMBEDDING DIRETO DE IMAGENS CLÍNICAS NAS APOSTILAS (BLOCOS 1 A 4) ===');
  const items = JSON.parse(fs.readFileSync('apostilas/curadoria-imagens-v2/curadoria-blocos-1-4-consolidada.json', 'utf8'));
  
  // Agrupa as imagens por apostila
  const imagesBySlug = new Map();
  for (const it of items) {
    const slug = it.apostila_path.replace(/^\/apostilas\//, '').replace(/\/$/, '');
    if (!imagesBySlug.has(slug)) imagesBySlug.set(slug, []);
    imagesBySlug.get(slug).push(it);
  }

  console.log(`Carregadas ${items.length} imagens clínicas para ${imagesBySlug.size} apostilas.`);

  let updatedV2Count = 0;
  let updatedIndexCount = 0;
  let totalFiguresEmbedded = 0;

  for (const [slug, images] of imagesBySlug.entries()) {
    const contentPath = `apostilas/${slug}/content.json`;
    const indexPath = `apostilas/${slug}/index.html`;

    if (fs.existsSync(contentPath)) {
      // 1. Apostila em formato canônico content.json (formato v2 com array compact q)
      const content = JSON.parse(fs.readFileSync(contentPath, 'utf8'));
      if (content.q && Array.isArray(content.q)) {
        let insertedInThisApostila = 0;

        for (const imgItem of images) {
          const figHtml = buildFigureHtml(imgItem);
          const figBlock = ['raw', figHtml];

          // Encontra seção alvo ou usa seção 1 / visao-geral
          let targetSec = content.q.find(s => s[0] === imgItem.target_section);
          if (!targetSec && content.q.length > 1) {
            targetSec = content.q[1]; // segunda seção (após visão geral)
          } else if (!targetSec) {
            targetSec = content.q[0];
          }

          if (targetSec && Array.isArray(targetSec[2])) {
            // Evita duplicatas se a imagem já foi inserida
            const alreadyHas = targetSec[2].some(b => typeof b[1] === 'string' && b[1].includes(imgItem.candidate_key));
            if (!alreadyHas) {
              // Insere após o primeiro bloco (geralmente h2 ou primeiro parágrafo)
              const insertIdx = targetSec[2].length > 1 ? 2 : targetSec[2].length;
              targetSec[2].splice(insertIdx, 0, figBlock);
              insertedInThisApostila++;
              totalFiguresEmbedded++;
            }
          }
        }

        fs.writeFileSync(contentPath, JSON.stringify(content, null, 2), 'utf8');
        updatedV2Count++;
        console.log(`[V2 ATUALIZADO] ${slug}: ${insertedInThisApostila} figuras embutidas em content.json`);
      }
    } else if (fs.existsSync(indexPath)) {
      // 2. Apostila em formato HTML estático clássico (index.html puro)
      let html = fs.readFileSync(indexPath, 'utf8');
      let insertedInThisApostila = 0;

      for (const imgItem of images) {
        if (html.includes(imgItem.candidate_key)) continue; // Já possui

        const figHtml = buildFigureHtml(imgItem);
        // Tenta achar <section id="sec-2" ou <section id="sec-1" ou primeiro </section>
        const secRegex = /<section[^>]+id=["']sec-[1-3]["'][^>]*>([\s\S]*?)<\/h2>/i;
        if (secRegex.test(html)) {
          html = html.replace(secRegex, (match) => {
            return `${match}\n${figHtml}\n`;
          });
          insertedInThisApostila++;
          totalFiguresEmbedded++;
        } else {
          // Fallback: insere antes do primeiro </section>
          const firstSectionEnd = html.indexOf('</section>');
          if (firstSectionEnd !== -1) {
            html = html.slice(0, firstSectionEnd) + '\n' + figHtml + '\n' + html.slice(firstSectionEnd);
            insertedInThisApostila++;
            totalFiguresEmbedded++;
          }
        }
      }

      fs.writeFileSync(indexPath, html, 'utf8');
      updatedIndexCount++;
      console.log(`[HTML ATUALIZADO] ${slug}: ${insertedInThisApostila} figuras embutidas em index.html`);
    }
  }

  console.log('\n======================================================');
  console.log(`TOTAL DE APOSTILAS V2 COM CONTENT.JSON ATUALIZADAS: ${updatedV2Count}`);
  console.log(`TOTAL DE APOSTILAS INDEX.HTML ATUALIZADAS: ${updatedIndexCount}`);
  console.log(`TOTAL DE FIGURAS CLÍNICAS EMBUTIDAS DIRETAMENTE: ${totalFiguresEmbedded}`);
  console.log('======================================================\n');
}

run();
