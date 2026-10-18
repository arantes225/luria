import fs from 'fs';

function inspectFile(filePath) {
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${filePath}`);
    return;
  }
  const html = fs.readFileSync(filePath, 'utf8');
  console.log(`=== Inspecting ${filePath} (length: ${html.length}) ===`);
  const sectionRegex = /<section\s+id=["']([^"']+)["'][^>]*>([\s\S]*?)<\/section>/gi;
  let match;
  while ((match = sectionRegex.exec(html)) !== null) {
    const secId = match[1];
    const secContent = match[2];
    const h2Match = secContent.match(/<h2[^>]*>([\s\S]*?)<\/h2>/i);
    const title = h2Match ? h2Match[1].replace(/<[^>]+>/g, '').trim() : 'No H2';
    console.log(`Section: [${secId}] - "${title}" (length: ${secContent.length})`);
  }
}

inspectFile('apostilas/inducao-do-trabalho-de-parto/index.html');
inspectFile('apostilas/avaliacao-vitalidade-fetal/index.html');
