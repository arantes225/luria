import fs from 'fs';
import path from 'path';

const cronoPath = 'assets/js/cronograma-base-data.js';
const cronoContent = fs.readFileSync(cronoPath, 'utf8');

// evaluate schedules
const sandbox = {};
const fn = new Function('window', cronoContent);
fn(sandbox);

const medicine = sandbox.LURIA_BASE_SCHEDULES.medicine;
const bloco2 = medicine.slice(23, 46); // index 23..45 = aulas 24..46

console.log(`Bloco 2: total ${bloco2.length} temas (aulas ${bloco2[0].aula} a ${bloco2[bloco2.length - 1].aula})`);

function slugify(text) {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// known alternative slugs in the codebase
const slugAliases = {
  24: ['sindromes-hipertensivas-da-gestacao', 'hipertensao-gestacional-pre-eclampsia'],
  25: ['estrategia-saude-da-familia', 'estrategia-saude-familia', 'esf'],
  26: ['endocardite-infecciosa'],
  27: ['nutricao-no-paciente-cirurgico', 'nutricao-paciente-cirurgico'],
  28: ['aleitamento-materno'],
  29: ['diabetes-mellitus-gestacional', 'diabetes-gestacional'],
  30: ['politica-nacional-de-atencao-basica', 'politica-nacional-atencao-basica', 'pnab'],
  31: ['pericardite-e-tamponamento-cardiaco', 'pericardite-tamponamento-cardiaco'],
  32: ['cicatrizacao-de-feridas', 'cicatrizacao-feridas'],
  33: ['alimentacao-complementar'],
  34: ['infeccoes-na-gestacao-e-transmissao-vertical', 'infeccoes-gestacao-transmissao-vertical'],
  35: ['redes-de-atencao-a-saude', 'redes-de-atencao-saude', 'redes-atencao-saude', 'ras'],
  36: ['tromboembolismo-venoso-e-embolia-pulmonar', 'tromboembolismo-venoso-embolia-pulmonar', 'tev-tep'],
  37: ['infeccao-do-sitio-cirurgico-e-antibioticoprofilaxia', 'infeccao-sitio-cirurgico-antibioticoprofilaxia', 'isc-antibioticoprofilaxia'],
  38: ['crescimento-e-desenvolvimento', 'crescimento-desenvolvimento'],
  39: ['sangramento-na-primeira-metade-da-gestacao', 'sangramento-primeira-metade-gestacao', 'hemorragias-primeiro-terceiro-trimestre'],
  40: ['regionalizacao-hierarquizacao-e-referencia-contrarreferencia', 'regionalizacao-hierarquizacao-referencia-contrarreferencia'],
  41: ['choque-circulatorio'],
  42: ['principios-de-tecnica-cirurgica', 'principios-tecnica-cirurgica'],
  43: ['puericultura-e-prevencao-de-acidentes', 'puericultura-prevencao-acidentes'],
  44: ['abortamento', 'hemorragias-primeiro-terceiro-trimestre'],
  45: ['participacao-e-controle-social-no-sus', 'participacao-controle-social-sus'],
  46: ['asma']
};

const results = [];

for (const item of bloco2) {
  const defaultSlug = slugify(item.theme);
  const aliases = slugAliases[item.aula] || [defaultSlug];
  
  let foundDir = null;
  let foundFile = null;
  let fileType = null;
  let size = 0;
  
  for (const alias of aliases) {
    const dirPath = path.join('apostilas', alias);
    if (fs.existsSync(dirPath)) {
      foundDir = alias;
      const contentJson = path.join(dirPath, 'content.json');
      const indexHtml = path.join(dirPath, 'index.html');
      if (fs.existsSync(contentJson)) {
        foundFile = contentJson;
        fileType = 'content.json';
        size = fs.statSync(contentJson).size;
        break;
      } else if (fs.existsSync(indexHtml)) {
        foundFile = indexHtml;
        fileType = 'index.html';
        size = fs.statSync(indexHtml).size;
        break;
      }
    }
  }

  results.push({
    aula: item.aula,
    area: item.area,
    theme: item.theme,
    defaultSlug,
    foundDir,
    fileType,
    size
  });
}

console.log('| Aula | Área | Tema | Diretório Encontrado | Formato | Tamanho (bytes) |');
console.log('|:---:|:---|:---|:---|:---:|---:|');
for (const r of results) {
  console.log(`| ${String(r.aula).padStart(3, '0')} | ${r.area} | ${r.theme} | ${r.foundDir || 'NÃO ENCONTRADO'} | ${r.fileType || '-'} | ${r.size} |`);
}
