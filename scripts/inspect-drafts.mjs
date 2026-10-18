import fs from 'fs';

function inspectHtml(slug) {
  const html = fs.readFileSync(`apostilas/${slug}/index.html`, 'utf8');
  console.log(`=== ${slug} ===`);
  const secRegex = /<section\b[^>]*id=["']([^"']*)["'][^>]*>([\s\S]*?)<\/section>/gi;
  let m;
  while ((m = secRegex.exec(html)) !== null) {
    const id = m[1];
    const h2 = m[2].match(/<h2[^>]*>([\s\S]*?)<\/h2>/i);
    console.log(id, '->', h2 ? h2[1].replace(/<[^>]+>/g, '').trim() : '');
  }
}

inspectHtml('planejamento-reprodutivo-contracepcao');
inspectHtml('sangramento-uterino-anormal');
