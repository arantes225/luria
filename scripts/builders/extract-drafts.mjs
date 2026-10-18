import fs from 'fs';
import { countUsefulChars, htmlToBlocks, saveBook } from '../bloco-06-utils.mjs';

export function parseExistingSections(slug) {
  const html = fs.readFileSync(`apostilas/${slug}/index.html`, 'utf8');
  const secRegex = /<section\b[^>]*id=["']([^"']*)["'][^>]*>([\s\S]*?)<\/section>/gi;
  const sections = [];
  let m;
  while ((m = secRegex.exec(html)) !== null) {
    const id = m[1];
    const raw = m[2];
    const h2Match = raw.match(/<h2[^>]*>([\s\S]*?)<\/h2>/i);
    const title = h2Match ? h2Match[1].replace(/<[^>]+>/g, '').trim() : id;
    const body_html = raw.replace(/<h2[^>]*>[\s\S]*?<\/h2>/i, '').trim();
    sections.push({ id, title, body_html, blocks: htmlToBlocks(body_html) });
  }
  return sections;
}
