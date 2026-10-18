import { secSuaExpansao } from './builders/sua-expansao.mjs';
import { saveBook, countUsefulChars } from './bloco-06-utils.mjs';
import fs from 'fs';
import path from 'path';

const slug = 'sangramento-uterino-anormal';
// Ler o draft limpo
const htmlOriginal = fs.readFileSync(`apostilas/${slug}/index.html`, 'utf8');
const secRegex = /<section\b[^>]*id=["']([^"']*)["'][^>]*>([\s\S]*?)<\/section>/gi;
const baseSections = [];
let m;
while ((m = secRegex.exec(htmlOriginal)) !== null) {
  const id = m[1];
  const raw = m[2];
  const h2Match = raw.match(/<h2[^>]*>([\s\S]*?)<\/h2>/i);
  const title = h2Match ? h2Match[1].replace(/<[^>]+>/g, '').trim() : id;
  let body_html = raw.replace(/<h2[^>]*>[\s\S]*?<\/h2>/i, '').trim();

  // Corrigir a duplicata pré-existente no rascunho original na seção coein
  if (id === 'coein') {
    body_html = body_html.replace(
      '<p><strong>Como usar a classificação:</strong> PALM reúne causas estruturais, frequentemente identificáveis por imagem ou histologia; COEIN reúne causas não estruturais. Uma paciente pode ter mais de uma categoria ao mesmo tempo. Primeiro exclua gravidez e avalie a estabilidade hemodinâmica; só depois faça investigação etiológica dirigida.</p>',
      '<p><strong>Racional clínico das etiologias não estruturais:</strong> enquanto o grupo PALM engloba alterações anatômicas focais ou difusas, o grupo COEIN abrange disfunções sistêmicas, hemostáticas e endometriais intrínsecas. É frequente a coexistência de mais de uma entidade causal na mesma mulher. A prioridade máxima inicial consiste em afastar gestação e garantir suporte hemodinâmico adequado antes de prosseguir com a investigação laboratorial específica.</p>'
    );
  }

  baseSections.push({ id, title, body_html });
}

// Inserir as novas seções de expansão exatamente uma vez antes de referencias
const finalSections = [];
for (const s of baseSections) {
  if (s.id === 'referencias') {
    finalSections.push(...secSuaExpansao);
  }
  finalSections.push(s);
}

const bookData = {
  slug,
  title: 'Sangramento Uterino Anormal (SUA)',
  subtitle: 'Classificação FIGO PALM-COEIN · investigação com Doppler e histeroscopia · manejo agudo e tamponamento intrauterino',
  area: 'Ginecologia e Obstetrícia',
  materia: 'Ginecologia Geral e Cirúrgica',
  sections: finalSections,
  references: [
    { title: 'International Federation of Gynecology and Obstetrics (FIGO) — FIGO classification system (PALM-COEIN) for causes of abnormal uterine bleeding in nongravid women of reproductive age', url: 'https://www.figo.org' },
    { title: 'Federação Brasileira das Associações de Ginecologia e Obstetrícia (FEBRASGO) — Manual de Sangramento Uterino Anormal e Histeroscopia', url: 'https://www.febrasgo.org.br' },
    { title: 'American College of Obstetricians and Gynecologists (ACOG) — Committee Opinion No. 557: Management of Acute Abnormal Uterine Bleeding in Nonpregnant Reproductive-Aged Women', url: 'https://www.acog.org' },
    { title: 'American College of Obstetricians and Gynecologists (ACOG) — Practice Bulletin No. 128: Diagnosis of Abnormal Uterine Bleeding in Reproductive-Aged Women', url: 'https://www.acog.org' }
  ]
};

saveBook(slug, bookData);

const indexPath = path.join('apostilas', slug, 'index.html');
const html = fs.readFileSync(indexPath, 'utf8');
const chars = countUsefulChars(html);
console.log(`[SUCESSO] ${slug} compilado via saveBook: ${chars} caracteres úteis.`);
