// scripts/audit-bloco-07.mjs
import fs from 'fs';
import path from 'path';
import { BLOCO_07_AULAS, countUsefulChars } from './bloco-07-utils.mjs';

function auditBloco07() {
  console.log('Nº | Slug | Formato | Caracteres úteis | Déficit 60k | Situação');
  console.log('---|---|---|---:|---:|---');

  let passed = 0;
  let deficitTotal = 0;

  for (const item of BLOCO_07_AULAS) {
    const slug = item.slug;
    const numStr = String(item.aula).padStart(3, '0');
    const dir = path.join(process.cwd(), 'apostilas', slug);
    const jsonPath = path.join(dir, 'content.json');
    const htmlPath = path.join(dir, 'index.html');

    let chars = 0;
    let format = 'none';

    if (fs.existsSync(jsonPath)) {
      try {
        const data = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
        format = 'content.json';
        if (Array.isArray(data.sections)) {
          for (const s of data.sections) {
            if (s.body_html) {
              chars += countUsefulChars(s.body_html);
            } else if (Array.isArray(s.blocks)) {
              for (const b of s.blocks) {
                if (b.content) chars += countUsefulChars(b.content);
              }
            }
          }
        }
      } catch (err) {
        format = 'json-corrupted';
      }
    } else if (fs.existsSync(htmlPath)) {
      format = 'index.html';
      const rawHtml = fs.readFileSync(htmlPath, 'utf-8');
      chars = countUsefulChars(rawHtml);
    }

    const deficit = Math.max(0, 60000 - chars);
    if (deficit > 0) deficitTotal += deficit;
    let status = 'não iniciado';
    if (chars >= 60000) {
      status = 'passou na triagem de extensão';
      passed++;
    } else if (chars > 0) {
      status = 'precisa expandir';
    }

    console.log(`${numStr} | ${slug} | ${format} | ${chars} | ${deficit} | ${status}`);
  }

  console.log(`\nConsolidado Bloco 7: ${passed} / ${BLOCO_07_AULAS.length} acima de 60k úteis. Pendentes de expansão: ${BLOCO_07_AULAS.length - passed}.`);
}

auditBloco07();
