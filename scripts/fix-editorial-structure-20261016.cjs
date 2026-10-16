const fs = require('node:fs');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const { JSDOM } = require('jsdom');
const root = 'docs/auditoria-apostilas-2026-10-16';
const changes = [];
function edit(key, transform, check) {
  const path = `apostilas/${key}/index.html`;
  const before = fs.readFileSync(path, 'utf8');
  const after = transform(before);
  const oldDoc = new JSDOM(before).window.document;
  const newDoc = new JSDOM(after).window.document;
  const ids = d => [...d.querySelectorAll('[id]')].map(n => n.id);
  assert.deepEqual(ids(newDoc), ids(oldDoc), `${key}: preservar âncoras`);
  assert.deepEqual([...newDoc.images].map(n => n.outerHTML), [...oldDoc.images].map(n => n.outerHTML));
  check(oldDoc, newDoc);
  if (before !== after) fs.writeFileSync(path, after);
  const hash = s => crypto.createHash('sha256').update(s).digest('hex');
  changes.push({ path, changed: before !== after, source_sha256: hash(before), result_sha256: hash(after), anchors_preserved: true, images_preserved: true });
}
edit('ciclo-menstrual-eixo-hho', html => html.replace(/(<section id="hho-integracao-40k"[\s\S]*?<\/section>)/, block => block.replace(/(<h3>[^<]*?)"\),\s*(?=<p>)/g, '$1</h3>\n').replace(/(<p>(?:(?!<p>|<h3>|<\/section>)[\s\S])*?)"\),\s*(?=<(?:p|h3|\/section))/g, '$1</p>\n')), (a,b) => {
  const block = b.getElementById('hho-integracao-40k');
  assert.equal(block.querySelectorAll('h3').length, 8);
  assert([...block.querySelectorAll('h3')].every(n => n.textContent.length < 160));
  assert(!block.textContent.includes('"),'));
  const clean = s => s.replace(/"\),/g, '').replace(/\s+/g, '');
  assert.equal(clean(a.getElementById('hho-integracao-40k').textContent), clean(block.textContent));
});
edit('cancer-de-mama', html => {
  let count = 0;
  return html.replace(/<p><strong>Mini-revisão:<\/strong> Relacione o próximo passo à finalidade do atendimento \(rastrear, diagnosticar, tratar ou prevenir complicação\), ao risco individual e à segurança materno-fetal quando aplicável\.<\/p>/g, match => ++count === 1 ? match : '');
}, (a,b) => {
  const repeated = d => [...d.querySelectorAll('p')].filter(n => n.textContent.startsWith('Mini-revisão: Relacione o próximo passo'));
  assert.equal(repeated(b).length, 1);
  assert.equal(a.querySelectorAll('h3').length, b.querySelectorAll('h3').length);
});
edit('planejamento-reprodutivo-contracepcao', html => {
  let number = 0;
  return html.replace(/<h2>(\d+)\. ([\s\S]*?)<\/h2>/g, (_, old, title) => `<h2>${++number}. ${title}</h2>`);
}, (a,b) => {
  const headings = [...b.querySelectorAll('h2')].filter(n => /^\d+\./.test(n.textContent));
  headings.forEach((h,i) => assert(h.textContent.startsWith(`${i+1}. `)));
});
if (changes.some(c => c.changed)) fs.writeFileSync(`${root}/correcoes-estrutura-20261016.json`, JSON.stringify({ date:'2026-10-16', scope:'Correção estrutural; sem alteração de condutas; revisão clínica pendente', changes }, null, 2) + '\n');
console.log(JSON.stringify(changes));
