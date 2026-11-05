// Valida os atlas do TRAUBE (masculino ampliado e feminino) depois do prepare.
// Mesmas checagens do validador de origem (malhas, índices, blocos binários,
// conceitos) mais a cobertura anatômica mínima que não pode regredir.
// Uso: node tools/anatomy-atlas/validate-atlas.mjs ATLAS_DIR
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';

const models = path.join(process.argv[2] || '/tmp/luria-human-atlas', 'public/models');
const REQUIRED = {
  'atlas.json': [
    /^(Left|Right) rectus abdominis$/, /internal abdominal oblique/, /transversus abdominis/, /^(Left|Right) external oblique$/, /^Diaphragm$/,
    /lobe of right lung/, /lobe of left lung/, /^Thyroid gland$/, /segment of liver/, /^Stomach$/, /^Esophagus$/,
    /^Wall of ventricle$/, /leaflet of mitral valve/, /papillary muscle/, /coronary artery/, /renal pyramid/, /calyx/, /trigone of urinary bladder/i,
    /zone of prostate/, /^Thalamus/, /hippocampus/, /gyrus/, /cerebell/i, /^(Left|Right) latissimus dorsi$/, /zygomaticus major/,
  ],
  'atlas-female.json': [/^Body of uterus$/, /^(left|right) ovary$/, /uterine tube/, /^Vagina$/, /^mammary lobes/, /^Thalamus/, /renal pyramid/, /bronchopulmonary segment/, /papillary muscle of heart/],
};
for (const [file, required] of Object.entries(REQUIRED)) {
  const atlas = JSON.parse(fs.readFileSync(path.join(models, file), 'utf8'));
  const ids = new Set(atlas.parts.map(p => p.id));
  assert.equal(ids.size, atlas.parts.length, `${file}: ids repetidos`);
  assert.ok(atlas.parts.length >= (file === 'atlas.json' ? 2600 : 1200), `${file}: cobertura menor que a esperada (${atlas.parts.length})`);
  const files = atlas.chunks.map(c => { const b = fs.readFileSync(path.join(models, path.basename(c.url))); assert.equal(b.length, c.bytes, `${file}: bloco ${c.url}`); if (c.gzip) assert.ok(fs.existsSync(path.join(models, path.basename(c.gzip))), `${file}: falta ${c.gzip}`); return b; });
  let tris = 0;
  for (const p of atlas.parts) {
    assert.ok(p.name.trim() && p.name !== '-', `${p.id}: sem nome`);
    assert.ok(p.system, `${p.id}: sem sistema`);
    const b = files[p.chunk]; assert.ok(b, `${p.id}: bloco inexistente`);
    assert.ok(p.indices + p.indexCount * 4 <= b.length && p.positions % 4 === 0 && p.indices % 4 === 0, `${p.id}: fora do bloco`);
    const pos = new Float32Array(b.buffer, b.byteOffset + p.positions, p.vertexCount * 3), idx = new Uint32Array(b.buffer, b.byteOffset + p.indices, p.indexCount);
    assert.ok(idx.length >= 3 && idx.length % 3 === 0, `${p.id}: índices`);
    for (const i of idx) assert.ok(i < p.vertexCount, `${p.id}: vértice inválido`);
    for (const v of pos) assert.ok(Number.isFinite(v), `${p.id}: posição inválida`);
    tris += p.indexCount / 3;
  }
  for (const c of atlas.concepts) { assert.ok(c.elements.length, `${c.id}: vazio`); for (const id of c.elements) assert.ok(ids.has(id), `${c.id}: falta ${id}`); }
  assert.equal(Math.round(tris), Math.round(atlas.triangles), `${file}: contagem de triângulos`);
  const names = atlas.parts.map(p => p.name);
  for (const re of required) assert.ok(names.some(n => new RegExp(re.source, 'i').test(n)), `${file}: falta estrutura ${re}`);
  console.log(`${file}: ${ids.size} malhas, ${atlas.concepts.length} conceitos, ${Math.round(tris).toLocaleString('pt-BR')} triângulos, ${required.length} estruturas obrigatórias presentes`);
}
