import fs from 'fs';
import path from 'path';

// Script para verificar e buscar substitutas válidas no Wikimedia Commons
// para as imagens candidatas que retornaram 404.

const USER_AGENT = 'LuriaBot/1.0 (editorial@luria.med.br)';

async function checkUrl(url) {
  try {
    const res = await fetch(url, {
      method: 'HEAD',
      headers: { 'User-Agent': USER_AGENT }
    });
    return res.status === 200 || res.status === 301 || res.status === 302;
  } catch {
    return false;
  }
}

async function searchCommons(query) {
  const endpoint = 'https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrnamespace=6&gsrlimit=5&prop=imageinfo&iiprop=url|size|mime|extmetadata&format=json&gsrsearch=' + encodeURIComponent(query);
  try {
    const res = await fetch(endpoint, { headers: { 'User-Agent': USER_AGENT } });
    if (!res.ok) return [];
    const data = await res.json();
    if (!data.query || !data.query.pages) return [];
    
    const results = [];
    for (const page of Object.values(data.query.pages)) {
      const info = page.imageinfo?.[0];
      if (!info || !info.url) continue;
      // Filter out pdfs, videos or tiny icons
      if (info.mime && (info.mime.includes('pdf') || info.mime.includes('ogg') || info.mime.includes('webm'))) continue;
      
      const meta = info.extmetadata || {};
      const license = meta.LicenseShortName?.value || meta.UsageTerms?.value || 'Open Access';
      const author = (meta.Artist?.value || meta.Credit?.value || 'Wikimedia Commons').replace(/<[^>]+>/g, '').trim();
      
      results.push({
        title: page.title.replace(/^File:/, ''),
        fileUrl: info.url,
        canonicalUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/' + encodeURIComponent(page.title.replace(/^File:/, '')),
        sourcePage: 'https://commons.wikimedia.org/wiki/' + encodeURIComponent(page.title),
        author,
        license,
        width: info.width,
        height: info.height
      });
    }
    return results;
  } catch {
    return [];
  }
}

async function run() {
  console.log('Iniciando validador e localizador de substitutas...');
  // Exemplo de teste com 3 temas
  const testTerms = [
    { query: 'umbilical cord clamp newborn', target: 'clampeamento' },
    { query: 'skin to skin contact mother baby newborn', target: 'pele-a-pele' },
    { query: 'Apgar score medical infographic', target: 'apgar' },
    { query: 'neonatal bag valve mask ventilation', target: 'vpp' },
    { query: 'crown rump length ultrasound', target: 'crl' },
    { query: 'Wellens syndrome ECG', target: 'wellens' }
  ];

  for (const item of testTerms) {
    console.log(`Buscando substituta para: "${item.query}"...`);
    const found = await searchCommons(item.query);
    if (found.length) {
      console.log(` -> Encontrado: ${found[0].title}`);
      console.log(`    URL: ${found[0].canonicalUrl}`);
      console.log(`    Licença: ${found[0].license}`);
    } else {
      console.log(` -> Nenhuma imagem encontrada.`);
    }
  }
}

run();
