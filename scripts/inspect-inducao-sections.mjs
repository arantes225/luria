import fs from 'fs';

const html = fs.readFileSync('apostilas/inducao-do-trabalho-de-parto/index.html', 'utf8');
const match = html.match(/<section id=["']inducoes-casos-avancados-2026["'][^>]*>([\s\S]*?)<\/section>/i);
if (match) {
  console.log('Length:', match[1].length);
  console.log(match[1].slice(0, 500));
}
