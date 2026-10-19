import fs from 'fs';

// Função para extrair todas as 92 apostilas dos Blocos 1 a 4 com seus números e slugs
export function getBlocos1A4Apostilas() {
  const list = [];

  // Bloco 1 (001 a 023)
  const b1 = fs.readFileSync('apostilas/lotes/RELATORIO_FINAL_BLOCO_01_2026-10-17.md', 'utf8');
  for (const line of b1.split('\n')) {
    const m = line.match(/\|\s*(\d{3})\s*\|\s*`([a-z0-9-]+)`\s*\|/);
    if (m) list.push({ num: m[1], slug: m[2], bloco: 1 });
  }

  // Bloco 2 (024 a 046)
  const b2 = fs.readFileSync('apostilas/lotes/RELATORIO_FINAL_BLOCO_02_2026-10-17.md', 'utf8');
  for (const line of b2.split('\n')) {
    const m = line.match(/\|\s*(\d{3})\s*\|\s*`([a-z0-9-]+)`\s*\|\s*([^\|]+)\s*\|\s*([^\|]+)\s*\|/);
    if (m) list.push({ num: m[1], slug: m[2], title: m[3].trim(), area: m[4].trim(), bloco: 2 });
  }

  // Bloco 3 (047 a 069)
  const b3 = fs.readFileSync('apostilas/lotes/RELATORIO_FINAL_BLOCO_03_2026-10-17.md', 'utf8');
  for (const line of b3.split('\n')) {
    const m = line.match(/\|\s*\*\*(\d{3})\*\*\s*\|\s*`([a-z0-9-]+)`\s*\|\s*([^\|]+)\s*\|/);
    if (m) list.push({ num: m[1], slug: m[2], area: m[3].trim(), bloco: 3 });
  }

  // Bloco 4 (070 a 092)
  const b4 = fs.readFileSync('apostilas/lotes/BLOCO_04_CURADORIA_IMAGENS_CONSOLIDADA_2026-10-17.md', 'utf8');
  const b4matches = [...b4.matchAll(/## Aula (\d+):\s*([^\n\(]+).*?\n\*\*Slug canônico:\*\*\s*([a-z0-9-]+)/g)];
  for (const m of b4matches) {
    list.push({ num: m[1].padStart(3, '0'), slug: m[3].trim(), title: m[2].trim(), bloco: 4 });
  }

  return list;
}

const all = getBlocos1A4Apostilas();
console.log('Total de apostilas mapeadas dos Blocos 1 a 4: ' + all.length);
console.log('Distribuição por bloco:');
for (let b = 1; b <= 4; b++) {
  const count = all.filter(a => a.bloco === b).length;
  console.log(`Bloco ${b}: ${count} apostilas`);
}
