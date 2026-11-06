// Acréscimos do corpo feminino TRAUBE (gerado no deploy, depois de build-atlas-extras.mjs).
//
//   node tools/anatomy-atlas/build-female-extras.mjs MODELS_DIR
//
// MODELS_DIR contém atlas.json (masculino já ampliado) e atlas-female.json, com seus blocos.
//
// 1) Músculos complementares. A fonte feminina (HRA) quase não modela músculos; os do
//    quadril, coxa e perna já vêm de uma doadora (Andreassen et al.). Os demais — tronco,
//    parede abdominal, dorso, pescoço, face, mastigação, membro superior e pé — vêm do corpo
//    masculino (BodyParts3D CC BY 4.0 e Z-Anatomy CC BY-SA 4.0) e são levados ao corpo
//    feminino vértice a vértice por um campo de deformação: cada osso presente nos dois
//    corpos (os 180 ossos complementares, que guardam o id do osso masculino de origem,
//    mais vértebras, esterno, sacro, quadris e fêmures) define uma escala e uma translação
//    locais, e cada vértice mistura as dos ossos mais próximos (inverso do quadrado da
//    distância). Assim o músculo acompanha o osso em que se apoia, inclusive no braço, que
//    tem outra postura no corpo feminino. Ficam num sistema próprio ("Músculos
//    complementares"), identificado como referência ajustada, não como anatomia desta pessoa.
// 2) Coronárias e veias cardíacas entram no conceito do coração e ganham grupos próprios.
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

const dir = process.argv[2];
if (!dir) { console.error('Uso: build-female-extras.mjs MODELS_DIR'); process.exit(1); }
const read = name => JSON.parse(fs.readFileSync(path.join(dir, name), 'utf8'));
const male = read('atlas.json'), female = read('atlas-female.json');
if (female.femaleExtras) throw new Error('O atlas feminino já recebeu os acréscimos.');
const buffers = atlas => atlas.chunks.map(c => fs.readFileSync(path.join(dir, path.basename(c.url))));
const maleBuf = buffers(male);
const center = b => [0, 1, 2].map(i => (b[0][i] + b[1][i]) / 2);
const diag = b => Math.hypot(b[1][0] - b[0][0], b[1][1] - b[0][1], b[1][2] - b[0][2]);
const union = bs => [[0, 1, 2].map(i => Math.min(...bs.map(b => b[0][i]))), [0, 1, 2].map(i => Math.max(...bs.map(b => b[1][i])))];
const maleById = new Map(male.parts.map(p => [p.id, p])), maleByName = new Map(male.parts.map(p => [p.name, p]));
const femaleByName = new Map(female.parts.map(p => [p.name, p]));

// ---------- âncoras: ossos nos dois corpos ----------
const anchors = [];
const pair = (mb, fb, fixed) => { if (!mb || !fb) return; const s = fixed ?? Math.min(1.2, Math.max(0.8, diag(fb) / diag(mb))); anchors.push({ m: center(mb), f: center(fb), s }); };
for (const p of female.parts) if (p.system === 'borrowed' && p.conceptId.startsWith('BORROWED:')) pair(maleById.get(p.conceptId.slice(9))?.bounds, p.bounds);
const ORD = ['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh', 'Eighth', 'Ninth', 'Tenth', 'Eleventh', 'Twelfth'];
for (const [region, n] of [['cervical', 7], ['thoracic', 12], ['lumbar', 5]]) for (let i = 0; i < n; i++)
  pair(maleByName.get(`${ORD[i]} ${region} vertebra`)?.bounds, femaleByName.get(`${region[0].toUpperCase() + region.slice(1)} vertebra ${i + 1}`)?.bounds);
pair(maleByName.get('Body of sternum')?.bounds, femaleByName.get('Sternum')?.bounds);
pair(maleByName.get('Sacrum')?.bounds, femaleByName.get('Sacrum')?.bounds);
for (const [side, Side] of [['left', 'Left'], ['right', 'Right']]) {
  const hip = ['Ilium', 'Ischium', 'Pubis'].map(b => femaleByName.get(`${b} compact bone (${side})`)?.bounds).filter(Boolean);
  // quadril e fêmur: só translação (a caixa da pelve feminina é mais larga e inflaria os músculos)
  if (hip.length === 3) pair(maleByName.get(`${Side} hip bone`)?.bounds, union(hip), 1);
  pair(maleByName.get(`${Side} femur`)?.bounds, femaleByName.get(`Femur (${side})`)?.bounds, 1);
}
if (anchors.length < 150) throw new Error(`Âncoras insuficientes para o corpo feminino: ${anchors.length}`);
const K = 10;
function warp(x, y, z, out, o) {
  const near = [];
  for (const a of anchors) { const d = (a.m[0] - x) ** 2 + (a.m[1] - y) ** 2 + (a.m[2] - z) ** 2; if (near.length < K) { near.push([d, a]); near.sort((p, q) => p[0] - q[0]); } else if (d < near[K - 1][0]) { near[K - 1] = [d, a]; near.sort((p, q) => p[0] - q[0]); } }
  let w = 0, X = 0, Y = 0, Z = 0;
  for (const [d, a] of near) { const k = 1 / (d + 1e-4); w += k; X += k * (a.f[0] + a.s * (x - a.m[0])); Y += k * (a.f[1] + a.s * (y - a.m[1])); Z += k * (a.f[2] + a.s * (z - a.m[2])); }
  out[o] = X / w; out[o + 1] = Y / w; out[o + 2] = Z / w;
}

// ---------- músculos levados ----------
// quadril, coxa e perna já têm os músculos da doadora; não duplica
const DONOR_REGION = /gluteus|piriformis|gemellus|obturator|quadratus femoris|tensor fasciae|sartorius|gracilis|adductor (longus|brevis|magnus|minimus)|pectineus|vastus|rectus femoris|biceps femoris|semitendinosus|semimembranosus|gastrocnemius|soleus|plantaris|popliteus|tibialis|fibularis|peroneus|extensor (digitorum|hallucis) longus|flexor (digitorum|hallucis) longus|iliacus|psoas|iliopsoas|articularis genus/i;
const moved = male.parts.filter(p => p.system === 'muscular' && !DONOR_REGION.test(p.name));
let blob = [], bytes = 0; const chunks = [], newParts = [], idMap = new Map();
const flush = () => { if (!bytes) return; const name = `female-extra-${chunks.length}.bin`, data = Buffer.concat(blob); fs.writeFileSync(path.join(dir, name), data); chunks.push({ url: '/models/' + name, bytes: data.length }); blob = []; bytes = 0; };
const put = a => { const pad = (4 - bytes % 4) % 4; if (pad) { blob.push(Buffer.alloc(pad)); bytes += pad; } const o = bytes, b = Buffer.from(a.buffer, a.byteOffset, a.byteLength); blob.push(b); bytes += b.length; return o; };
// Parede anterolateral do abdome: vai da margem costal à crista ilíaca, longe de ossos
// próximos, e a mistura por ossos a distorce. Usa-se um mapeamento da região abdominal medido
// nos dois corpos: altura entre a crista ilíaca e a base do esterno, largura pela pelve (crista
// ilíaca) e profundidade a partir da coluna lombar até a gordura subcutânea abdominal da região
// umbilical do próprio corpo feminino (o abdome feminino de referência é mais volumoso).
const ABDOMINAL_WALL = /rectus abdominis|abdominal oblique|external oblique|transversus abdominis|pyramidalis/i;
const lumbarF = [1, 2, 3, 4, 5].map(i => femaleByName.get(`Lumbar vertebra ${i}`)?.bounds).filter(Boolean);
const lumbarM = ORD.slice(0, 5).map(o => maleByName.get(`${o} lumbar vertebra`)?.bounds).filter(Boolean);
const avg = (bs, k) => bs.reduce((s, b) => s + center(b)[k], 0) / bs.length;
const hipM = ['Left', 'Right'].map(s => maleByName.get(`${s} hip bone`)?.bounds).filter(Boolean);
const iliumF = ['left', 'right'].map(s => femaleByName.get(`Ilium compact bone (${s})`)?.bounds).filter(Boolean);
const sternM = maleByName.get('Body of sternum')?.bounds, sternF = femaleByName.get('Sternum')?.bounds;
let region = null;
if (lumbarF.length === 5 && lumbarM.length === 5 && hipM.length === 2 && iliumF.length === 2 && sternM && sternF) {
  const m = { x: avg(lumbarM, 0), z: avg(lumbarM, 2), y0: Math.max(...hipM.map(b => b[1][1])), y1: sternM[0][1], w: Math.max(...hipM.map(b => Math.max(Math.abs(b[0][0]), Math.abs(b[1][0])))) };
  const fm = { x: avg(lumbarF, 0), z: avg(lumbarF, 2), y0: Math.max(...iliumF.map(b => b[1][1])), y1: sternF[0][1], w: Math.max(...iliumF.map(b => Math.max(Math.abs(b[0][0]), Math.abs(b[1][0])))) };
  // púbis: borda inferior do reto no masculino ↔ topo do púbis no feminino (a pelve feminina é mais baixa)
  m.yp = Math.min(...moved.filter(p => /rectus abdominis/i.test(p.name)).map(p => p.bounds[0][1]));
  fm.yp = Math.max(...['left', 'right'].map(s => femaleByName.get(`Pubis compact bone (${s})`)?.bounds[1][1] ?? -Infinity));
  region = { m, f: fm, sy: (fm.y1 - fm.y0) / (m.y1 - m.y0), sx: fm.w / m.w, sz: 1 };
  const yMap = y => y < m.y0 ? fm.yp + (y - m.yp) * (fm.y0 - fm.yp) / (m.y0 - m.yp) : fm.y0 + (y - m.y0) * region.sy;
  const map = (x, y, z, out, o) => { out[o] = region.f.x + (x - region.m.x) * region.sx; out[o + 1] = yMap(y); out[o + 2] = region.f.z + (z - region.m.z) * region.sz; };
  // profundidade: a face anterior do reto encosta logo atrás da gordura subcutânea umbilical
  const fat = femaleByName.get('Subcutaneous abdominal adipose tissue umbilicus area');
  let front = -Infinity; const tmp = new Float32Array(3);
  for (const p of moved.filter(p => /rectus abdominis/i.test(p.name))) { const b = maleBuf[p.chunk]; const pos = new Float32Array(b.buffer.slice(b.byteOffset + p.positions, b.byteOffset + p.positions + p.vertexCount * 12)); for (let i = 0; i < pos.length; i += 3) { map(pos[i], pos[i + 1], pos[i + 2], tmp, 0); front = Math.max(front, tmp[2]); } }
  if (fat && front > region.f.z) { const target = fat.bounds[0][2] + 0.004; region.sz = Math.min(1.45, Math.max(0.85, (target - region.f.z) / (front - region.f.z))); }
  region.map = map;
  console.log(`  parede abdominal feminina: altura ×${region.sy.toFixed(3)} (pelve ×${((fm.y0 - fm.yp) / (m.y0 - m.yp)).toFixed(3)}), largura ×${region.sx.toFixed(3)}, profundidade ×${region.sz.toFixed(3)}`);
} else console.log('  parede abdominal feminina: referências ausentes, usa a deformação geral');
let n = 0, triangles = 0;
for (const p of moved) {
  const b = maleBuf[p.chunk];
  const pos = new Float32Array(b.buffer.slice(b.byteOffset + p.positions, b.byteOffset + p.positions + p.vertexCount * 12));
  const nrm = new Int16Array(b.buffer.slice(b.byteOffset + p.normals, b.byteOffset + p.normals + p.vertexCount * 6));
  const idx = new Uint32Array(b.buffer.slice(b.byteOffset + p.indices, b.byteOffset + p.indices + p.indexCount * 4));
  const out = new Float32Array(pos.length);
  const wall = region && ABDOMINAL_WALL.test(p.name);
  for (let i = 0; i < pos.length; i += 3) (wall ? region.map : warp)(pos[i], pos[i + 1], pos[i + 2], out, i);
  if (bytes > 7_000_000) flush();
  const id = 'BMM' + String(n++).padStart(4, '0');
  const po = put(out), no = put(nrm), io = put(idx);
  const mn = [Infinity, Infinity, Infinity], mx = [-Infinity, -Infinity, -Infinity];
  for (let i = 0; i < out.length; i += 3) for (let k = 0; k < 3; k++) { mn[k] = Math.min(mn[k], out[i + k]); mx[k] = Math.max(mx[k], out[i + k]); }
  idMap.set(p.id, id); triangles += p.indexCount / 3;
  newParts.push({ id, name: p.name, conceptId: 'BORROWED-MUSCLE:' + p.id, system: 'borrowed-muscle', chunk: female.chunks.length + chunks.length, positions: po, normals: no, indices: io, vertexCount: p.vertexCount, indexCount: p.indexCount, bounds: [mn, mx] });
}
flush();
for (const c of chunks) { const gz = zlib.gzipSync(fs.readFileSync(path.join(dir, path.basename(c.url))), { level: 9 }); c.gzip = c.url + '.gz'; c.gzipBytes = gz.length; fs.writeFileSync(path.join(dir, path.basename(c.gzip)), gz); }

// ---------- conceitos ----------
const byName = new Map(female.concepts.map(c => [c.name.toLowerCase(), c]));
const add = (id, name, elements) => { if (!elements.length) return; const same = byName.get(name.toLowerCase()); if (same) { same.elements = [...new Set([...same.elements, ...elements])]; return; } const c = { id, name, elements }; female.concepts.push(c); byName.set(name.toLowerCase(), c); };
for (const p of newParts) add(p.conceptId, p.name, [p.id]);
// grupos masculinos formados só por músculos levados (ex.: peitoral maior, parede abdominal)
for (const c of male.concepts) { if (c.elements.length < 2) continue; const ids = c.elements.map(e => idMap.get(e)); if (ids.every(Boolean)) add('BORROWED-MUSCLE:' + c.id, c.name, ids); }
const fids = re => female.parts.filter(p => re.test(p.name)).map(p => p.id);
const coronary = fids(/coronary artery|anterior descending|circumflex artery|posterior descending|diagonal branch|marginal branch|right marginal artery/i);
const cardiacVeins = fids(/cardiac vein|coronary sinus|left marginal vein|oblique vein of (the )?left atrium|posterior vein of left ventricle/i);
add('TRAUBE:coronary-arteries', 'Coronary arteries', coronary);
add('TRAUBE:cardiac-veins', 'Cardiac veins', cardiacVeins);
add('TRAUBE:left-circumflex', 'Left circumflex artery', fids(/circumflex/i));
const heart = byName.get('heart'); if (heart) heart.elements = [...new Set([...heart.elements, ...coronary, ...cardiacVeins])];

female.parts.push(...newParts);
female.chunks.push(...chunks);
female.triangles = female.parts.reduce((s, p) => s + p.indexCount / 3, 0);
female.femaleExtras = { borrowedMuscles: newParts.length, anchors: anchors.length, method: 'campo de deformação por ossos presentes nos dois corpos (escala e translação locais, inverso do quadrado da distância, 10 ossos mais próximos)' };
fs.writeFileSync(path.join(dir, 'atlas-female.json'), JSON.stringify(female));
console.log(`Atlas feminino ampliado: ${newParts.length} músculos complementares (${Math.round(triangles).toLocaleString('pt-BR')} triângulos), ${anchors.length} âncoras ósseas, ${coronary.length} coronárias e ${cardiacVeins.length} veias cardíacas no coração`);
