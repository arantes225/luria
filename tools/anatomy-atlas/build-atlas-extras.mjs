// Acréscimos do atlas masculino TRAUBE (gerado no deploy, nada binário vai para o git).
//
//   node tools/anatomy-atlas/build-atlas-extras.mjs ATLAS_DIR ZA_MUSCULOS.fbx ZA_VISCERAS.fbx HRA_MASCULINO.glb
//
// ATLAS_DIR é o projeto do atlas já instalado (node_modules com three e meshoptimizer).
// Fontes (créditos no card "Créditos" da Sala):
//  - Z-Anatomy (CC BY-SA 4.0, derivado do BodyParts3D): músculos e vísceras que o atlas
//    não tem (reto do abdome, oblíquos, transverso, diafragma, intercostais, pulmões por
//    lobo, tireoide, paratireoides, fígado por segmento, faringe, glândulas salivares...).
//    Peças que o próprio Z-Anatomy declara com licença não comercial (rim, orelha interna)
//    e peças de encéfalo de origem não declarada ficam de fora.
//  - Human Reference Atlas / HuBMAP, órgãos de referência masculinos v1.10 (CC BY 4.0):
//    rins (cápsula, córtex, colunas, pirâmides, papilas, cálices, pelve), bexiga (cúpula,
//    trígono, óstios), próstata (zonas) e encéfalo (281 regiões), com simplificação mais
//    fina (0,06%) que o resto do atlas para preservar o detalhe interno.
//
// Posicionamento medido, não a olho:
//  - Z-Anatomy: afim 3x4 por mínimos quadrados sobre ~250 estruturas homônimas dos dois
//    modelos, mais um deslocamento local por peça interpolado dos resíduos vizinhos
//    (validação cruzada ~4 mm de mediana). A forma de cada peça não é distorcida.
//    O ajuste é recalculado a cada build e o build para se a escala sair do esperado.
//  - HRA: cada órgão é ajustado (escala uniforme + translação) à caixa do órgão
//    correspondente do BodyParts3D, que é removido para não haver duas cópias; o encéfalo
//    é ajustado pelas vértebras C3–C7 e pelos olhos, que existem nos dois corpos.
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';

const [atlasDir, zaMusclesFile, zaVisceraFile, hraMaleFile] = process.argv.slice(2);
if (!hraMaleFile) { console.error('Uso: build-atlas-extras.mjs ATLAS_DIR ZA_MUSCULOS.fbx ZA_VISCERAS.fbx HRA_MASCULINO.glb'); process.exit(1); }
const req = createRequire(path.join(path.resolve(atlasDir), 'package.json'));
const load = id => import(pathToFileURL(req.resolve(id)).href);
globalThis.self = globalThis; globalThis.window = globalThis;
globalThis.document = { createElementNS: () => ({ style: {}, getContext: () => null, addEventListener() {} }) };
const T = await load('three');
const { FBXLoader } = await import(pathToFileURL(path.join(path.dirname(req.resolve('three')), '../examples/jsm/loaders/FBXLoader.js')).href);
T.TextureLoader.prototype.load = function () { return new T.Texture(); };
const { MeshoptSimplifier } = await load('meshoptimizer');
await MeshoptSimplifier.ready;

const modelsDir = path.join(atlasDir, 'public/models');
const manifestPath = path.join(modelsDir, 'atlas.json');
const atlas = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
if (atlas.extras) throw new Error('O atlas já recebeu os acréscimos; reinstale a origem antes.');
const chunkBuf = atlas.chunks.map(c => fs.readFileSync(path.join(modelsDir, path.basename(c.url))));
const center = b => [0, 1, 2].map(i => (b[0][i] + b[1][i]) / 2);
const size = b => [0, 1, 2].map(i => b[1][i] - b[0][i]);
const union = bs => [[0, 1, 2].map(i => Math.min(...bs.map(b => b[0][i]))), [0, 1, 2].map(i => Math.max(...bs.map(b => b[1][i])))];
const byName = new Map(atlas.parts.map(p => [p.name, p]));

// ---------- geometria: soldar, simplificar (0,2% como o restante do atlas), normais ----------
function weld(pos, idx) {
  const map = new Map(), out = [], remap = new Uint32Array(pos.length / 3); const q = 1e-6;
  for (let i = 0; i < pos.length / 3; i++) {
    const k = Math.round(pos[i * 3] / q) + ',' + Math.round(pos[i * 3 + 1] / q) + ',' + Math.round(pos[i * 3 + 2] / q);
    let j = map.get(k); if (j === undefined) { j = out.length / 3; map.set(k, j); out.push(pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2]); } remap[i] = j;
  }
  const ni = []; for (let t = 0; t < idx.length; t += 3) { const a = remap[idx[t]], b = remap[idx[t + 1]], c = remap[idx[t + 2]]; if (a !== b && b !== c && a !== c) ni.push(a, b, c); }
  return { pos: new Float32Array(out), idx: new Uint32Array(ni) };
}
function finish(pos, idx, maxError = 0.002) {
  let w = weld(pos, idx);
  if (w.idx.length > 300) {
    const [simple] = MeshoptSimplifier.simplify(w.idx, w.pos, 3, 0, maxError, ['LockBorder']);
    if (simple.length >= 36) w.idx = simple;
  }
  const used = new Int32Array(w.pos.length / 3).fill(-1), p = [], ix = new Uint32Array(w.idx.length);
  for (let i = 0; i < w.idx.length; i++) { let v = w.idx[i]; if (used[v] < 0) { used[v] = p.length / 3; p.push(w.pos[v * 3], w.pos[v * 3 + 1], w.pos[v * 3 + 2]); } ix[i] = used[v]; }
  const P = new Float32Array(p), N = new Float32Array(P.length);
  for (let t = 0; t < ix.length; t += 3) {
    const a = ix[t] * 3, b = ix[t + 1] * 3, c = ix[t + 2] * 3;
    const ux = P[b] - P[a], uy = P[b + 1] - P[a + 1], uz = P[b + 2] - P[a + 2], vx = P[c] - P[a], vy = P[c + 1] - P[a + 1], vz = P[c + 2] - P[a + 2];
    const nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
    for (const k of [a, b, c]) { N[k] += nx; N[k + 1] += ny; N[k + 2] += nz; }
  }
  const Q = new Int16Array(N.length);
  for (let i = 0; i < N.length; i += 3) { const l = Math.hypot(N[i], N[i + 1], N[i + 2]) || 1; Q[i] = Math.round(N[i] / l * 32767); Q[i + 1] = Math.round(N[i + 1] / l * 32767); Q[i + 2] = Math.round(N[i + 2] / l * 32767); }
  return { pos: P, nrm: Q, idx: ix };
}
const boundsOf = pos => { const mn = [Infinity, Infinity, Infinity], mx = [-Infinity, -Infinity, -Infinity]; for (let i = 0; i < pos.length; i += 3) for (let k = 0; k < 3; k++) { mn[k] = Math.min(mn[k], pos[i + k]); mx[k] = Math.max(mx[k], pos[i + k]); } return [mn, mx]; };

// ---------- Z-Anatomy ----------
function readFbx(file) {
  const buf = fs.readFileSync(file), root = new FBXLoader().parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength), '');
  root.updateMatrixWorld(true); const meshes = [];
  root.traverse(o => {
    if (!o.isMesh) return; const g = o.geometry.clone(); g.applyMatrix4(o.matrixWorld);
    const pos = g.attributes.position.array, idx = g.index ? Uint32Array.from(g.index.array) : Uint32Array.from({ length: pos.length / 3 }, (_, i) => i);
    if (idx.length < 120) return; // marcadores de rótulo (12 triângulos) do Z-Anatomy
    meshes.push({ name: o.name, pos: Float32Array.from(pos), idx, bounds: boundsOf(pos) });
  });
  return meshes;
}
const zaKey = n => { let s = n.replace(/[()]/g, '').replace(/_/g, ' ').trim(), side = ''; if (/[a-z]{3}[lr]$/.test(s)) { side = s.endsWith('l') ? 'left' : 'right'; s = s.slice(0, -1); } return { side, base: s.toLowerCase().replace(/\bmuscles?\b/g, '').replace(/\s+/g, ' ').trim() }; };
const bpKey = n => { let s = n.toLowerCase(), side = ''; const m = s.match(/\b(left|right)\b/); if (m) { side = m[1]; s = s.replace(/\b(left|right) /, ''); } return { side, base: s.replace(/\bmuscles?\b/g, '').replace(/\s+/g, ' ').trim() }; };
const zaName = n => { const k = zaKey(n); let b = k.base.replace(/ (?:[ivx+]+|b[ivx+]+)$/i, m => m.toUpperCase()); b = b.replace(/\boesophagus\b/, 'esophagus'); const t = (k.side ? k.side + ' ' : '') + b; return t.charAt(0).toUpperCase() + t.slice(1); };
const ZA_EXCLUDE = /fascia|bursa|sheath|septum|retinacul|aponeuros|taenia|omentum|mesocolon|meso-|pleura|^kidney|renal_pelvis|pineal|hypophysis|gingiva|^liver$|ligament|tendon|^nose|mucosa|pharynx$|ureter|urethra|prostate|testis|epididym|ductus|ejaculatory|seminal|penis|tongue|duodenum|jejunum|colon|appendix|stomach|esophag|oesophag|trachea|bronch|gallbladder|bile|pancrea|suprarenal|submandibular_gland/i;
function zaSystem(n) {
  if (/lobe_of_(left|right)_lung/i.test(n)) return 'respiratory';
  if (/thyroid_gland|parathyroid/i.test(n)) return 'endocrine';
  if (/segment_of_liver|palate|uvula|parotid|sublingual|submandibular_duct|pharynx|epiglottis/i.test(n)) return /epiglottis/i.test(n) ? 'respiratory' : 'digestive';
  return 'muscular';
}

const atlasKeys = new Map();
for (const p of atlas.parts) { const k = bpKey(p.name), key = k.side + '|' + k.base; if (!atlasKeys.has(key)) atlasKeys.set(key, []); atlasKeys.get(key).push(p); }
console.log('Lendo Z-Anatomy…');
const za = [...readFbx(zaMusclesFile), ...readFbx(zaVisceraFile)];
// ajuste afim robusto
const pairs = [];
for (const z of za) { const k = zaKey(z.name), l = atlasKeys.get(k.side + '|' + k.base); if (l && l.length === 1) pairs.push({ z: z.bounds, a: l[0].bounds }); }
function solve(A, b) { const n = b.length, M = A.map((r, i) => [...r, b[i]]); for (let c = 0; c < n; c++) { let p = c; for (let r = c + 1; r < n; r++) if (Math.abs(M[r][c]) > Math.abs(M[p][c])) p = r; [M[c], M[p]] = [M[p], M[c]]; for (let r = 0; r < n; r++) if (r !== c) { const f = M[r][c] / M[c][c]; for (let k = c; k <= n; k++) M[r][k] -= f * M[c][k]; } } return M.map((r, i) => r[n] / r[i]); }
function fitAffine(list) { const P = list.flatMap(p => [[center(p.z), center(p.a)], [p.z[0], p.a[0]], [p.z[1], p.a[1]]]); const AtA = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]], Atb = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]; for (const [z, a] of P) { const r = [z[0], z[1], z[2], 1]; for (let i = 0; i < 4; i++) { for (let j = 0; j < 4; j++) AtA[i][j] += r[i] * r[j]; for (let k = 0; k < 3; k++) Atb[k][i] += r[i] * a[k]; } } return Atb.map(b => solve(AtA, b)); }
const affine = (M, v) => M.map(r => r[0] * v[0] + r[1] * v[1] + r[2] * v[2] + r[3]);
let use = pairs, M;
for (let it = 0; it < 5; it++) { M = fitAffine(use); const e = pairs.map(p => Math.hypot(...affine(M, center(p.z)).map((x, i) => x - center(p.a)[i]))); const s = [...e].sort((a, b) => a - b); const cut = Math.max(0.008, s[Math.floor(s.length * .75)] * 1.6); use = pairs.filter((_, i) => e[i] < cut); }
const anchors = use.map(p => { const c = affine(M, center(p.z)), a = center(p.a); return { c, d: a.map((x, i) => x - c[i]) }; });
const localOffset = c => { let w = 0; const d = [0, 0, 0]; anchors.map(a => ({ a, r: Math.hypot(a.c[0] - c[0], a.c[1] - c[1], a.c[2] - c[2]) })).sort((x, y) => x.r - y.r).slice(0, 8).forEach(({ a, r }) => { const k = 1 / (r * r + 0.0009); w += k; for (let i = 0; i < 3; i++) d[i] += k * a.d[i]; }); return d.map(x => x / w); };
console.log(`Z-Anatomy → atlas: ${pairs.length} pares homônimos, ${use.length} no ajuste`);

const STOP = new Set(['abdominal', 'the', 'and', 'of', 'part', 'set']);
const iou = (a, b) => { let inter = 1, va = 1, vb = 1; for (let i = 0; i < 3; i++) { const lo = Math.max(a[0][i], b[0][i]), hi = Math.min(a[1][i], b[1][i]); inter *= Math.max(0, hi - lo); va *= a[1][i] - a[0][i]; vb *= b[1][i] - b[0][i]; } return inter / (va + vb - inter || 1); };
const added = []; // {name, system, source, conceptId, geo}
const seen = new Set();
for (const z of za) {
  if (ZA_EXCLUDE.test(z.name) || /[a-z]j$/.test(z.name)) continue; // 'j': marcador de rótulo
  const k = zaKey(z.name), key = k.side + '|' + k.base; if (atlasKeys.has(key) || atlasKeys.has('|' + k.base) || seen.has(key)) continue;
  // cabeça/parte de um músculo que o atlas já tem inteiro: não sobrepõe
  const whole = k.base.match(/(?:head|part|belly|portion|fibres|fibers)s? of (.+)$/); if (whole && atlasKeys.has(k.side + '|' + whole[1].replace(/\bmuscles?\b/g, '').trim())) continue;
  const system = zaSystem(z.name);
  if (system === 'muscular' && !/muscle|head_of|part_of|belly|diaphragm|platysma|_slip/i.test(z.name)) continue;
  const p = new Float32Array(z.pos.length);
  for (let i = 0; i < z.pos.length; i += 3) { const v = affine(M, [z.pos[i], z.pos[i + 1], z.pos[i + 2]]); p[i] = v[0]; p[i + 1] = v[1]; p[i + 2] = v[2]; }
  const off = localOffset(center(boundsOf(p)));
  for (let i = 0; i < p.length; i += 3) { p[i] += off[0]; p[i + 1] += off[1]; p[i + 2] += off[2]; }
  const b = boundsOf(p);
  // mesma estrutura com outro nome no atlas: não duplica
  // mesma estrutura com outro nome (ex.: external abdominal oblique = external oblique): caixas
  // sobrepostas E nomes contidos um no outro. Camadas diferentes (oblíquo interno) ficam.
  const words = n => new Set(bpKey(n).base.split(' ').filter(w => w.length > 2 && !STOP.has(w)));
  const mine = new Set(k.base.split(' ').filter(w => w.length > 2 && !STOP.has(w)));
  const sub = (x, y) => [...x].every(w => y.has(w));
  if (atlas.parts.some(q => q.system === system && bpKey(q.name).side === k.side && iou(q.bounds, b) > 0.4 && (sub(words(q.name), mine) || sub(mine, words(q.name))))) continue;
  seen.add(key);
  added.push({ name: zaName(z.name), system, source: 'za', conceptId: 'ZA:' + z.name.replace(/[()]/g, ''), geo: finish(p, z.idx) });
}
console.log(`Z-Anatomy: ${added.length} estruturas novas`);

// ---------- HRA masculino ----------
function readGlb(file) {
  const f = fs.readFileSync(file); let cur = 12, json, bin;
  while (cur + 8 <= f.length) { const len = f.readUInt32LE(cur), type = f.readUInt32LE(cur + 4), body = f.subarray(cur + 8, cur + 8 + len); if (type === 0x4e4f534a) json = JSON.parse(body.toString('utf8')); else if (type === 0x004e4942) bin = body; cur += 8 + len; }
  const STORE = { 5121: Uint8Array, 5123: Uint16Array, 5125: Uint32Array, 5126: Float32Array }, NC = { SCALAR: 1, VEC3: 3 };
  const acc = i => { const a = json.accessors[i], v = json.bufferViews[a.bufferView], C = STORE[a.componentType], n = NC[a.type], w = C.BYTES_PER_ELEMENT, stride = v.byteStride || n * w, off = (v.byteOffset || 0) + (a.byteOffset || 0);
    if (stride === n * w) return new C(Uint8Array.from(bin.subarray(off, off + a.count * n * w)).buffer);
    const out = new C(a.count * n), view = new DataView(bin.buffer, bin.byteOffset); const get = C === Float32Array ? (o => view.getFloat32(o, true)) : C === Uint32Array ? (o => view.getUint32(o, true)) : C === Uint16Array ? (o => view.getUint16(o, true)) : (o => view.getUint8(o));
    for (let e = 0; e < a.count; e++) for (let k = 0; k < n; k++) out[e * n + k] = get(off + e * stride + k * w); return out; };
  const nodes = json.nodes, parent = new Map(); nodes.forEach((n, i) => (n.children || []).forEach(c => parent.set(c, i)));
  const local = n => { if (n.matrix) return new T.Matrix4().fromArray(n.matrix); const m = new T.Matrix4(); m.compose(new T.Vector3(...(n.translation || [0, 0, 0])), new T.Quaternion(...(n.rotation || [0, 0, 0, 1])), new T.Vector3(...(n.scale || [1, 1, 1]))); return m; };
  const world = i => { const m = local(nodes[i]); let p = parent.get(i); while (p !== undefined) { m.premultiply(local(nodes[p])); p = parent.get(p); } return m; };
  const ancestry = i => { const a = []; let p = parent.get(i); while (p !== undefined) { a.push(nodes[p].name); p = parent.get(p); } return a; };
  const meshes = [];
  nodes.forEach((n, i) => {
    if (n.mesh == null) return; const W = world(i), v = new T.Vector3(); const pos = [], idx = [];
    for (const prim of json.meshes[n.mesh].primitives) { const P = acc(prim.attributes.POSITION), base = pos.length / 3; for (let k = 0; k < P.length; k += 3) { v.set(P[k], P[k + 1], P[k + 2]).applyMatrix4(W); pos.push(v.x, v.y, v.z); } const I = prim.indices != null ? acc(prim.indices) : Uint32Array.from({ length: P.length / 3 }, (_, k) => k); for (const x of I) idx.push(base + x); }
    meshes.push({ name: n.name, ancestry: ancestry(i), pos: new Float32Array(pos), idx: new Uint32Array(idx), bounds: boundsOf(pos) });
  });
  return meshes;
}
const EXPAND = { inf: 'inferior', sup: 'superior', ant: 'anterior', post: 'posterior' };
function hraLabel(raw) {
  let t = raw.replace(/^(VH_[MF]_|Allen_)/, '').split('_').filter(Boolean), side = '', en = '';
  if (t.length > 1 && /^[a-z]$/.test(t[t.length - 1])) en = t.pop();
  t = t.filter(x => { if (x === 'L' || x === 'R') { side = x === 'L' ? 'left' : 'right'; return false; } return true; });
  if (!en && t.length > 1 && /^[a-z]$/.test(t[t.length - 1])) en = t.pop();
  let s = t.map(x => EXPAND[x] || x).join(' ').replace(/([A-Za-z])(\d+)$/, '$1 $2').replace(/\s+/g, ' ').trim();
  s = s.charAt(0).toUpperCase() + s.slice(1); if (en) s += ' ' + en; if (side) s += ` (${side})`; return s;
}
console.log('Lendo HRA masculino…');
const hra = readGlb(hraMaleFile);
const under = (m, group) => m.name === group || m.ancestry.includes(group);
const hraBounds = list => union(list.map(m => m.bounds));
function uniformFit(src, dst) { const s = Math.cbrt(size(dst).reduce((a, x) => a * x, 1) / size(src).reduce((a, x) => a * x, 1)), cs = center(src), cd = center(dst); return { s, t: [0, 1, 2].map(i => cd[i] - s * cs[i]) }; }
function lsqFit(pairsList) { // escala uniforme + translação sobre cantos e centros
  const P = pairsList.flatMap(([a, b]) => [[center(a), center(b)], [a[0], b[0]], [a[1], b[1]]]), n = P.length;
  const ms = [0, 1, 2].map(i => P.reduce((x, [s]) => x + s[i], 0) / n), md = [0, 1, 2].map(i => P.reduce((x, [, d]) => x + d[i], 0) / n);
  let num = 0, den = 0; for (const [s, d] of P) for (let i = 0; i < 3; i++) { num += (s[i] - ms[i]) * (d[i] - md[i]); den += (s[i] - ms[i]) ** 2; }
  const s = num / den; return { s, t: [0, 1, 2].map(i => md[i] - s * ms[i]) };
}
const leftKidney = hra.filter(m => under(m, 'VH_M_left_kidney')), atlasLeftKidney = byName.get('Left kidney');
if (center(hraBounds(leftKidney))[0] * center(atlasLeftKidney.bounds)[0] < 0) throw new Error('Lateralidade do HRA diferente do atlas');
const CERVICAL = ['Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh'];
const eyeAtlas = side => union(atlas.parts.filter(p => p.system === 'sensory' && new RegExp(`${side} eyeball|of ${side} eye(ball)?$`, 'i').test(p.name)).map(p => p.bounds));
const headPairs = [
  ...CERVICAL.map((w, i) => [hra.find(m => m.name === `VH_M_cervical_vertebra_${i + 3}`).bounds, byName.get(`${w} cervical vertebra`).bounds]),
  [hraBounds(hra.filter(m => under(m, 'VH_M_eye_L'))), eyeAtlas('left')], [hraBounds(hra.filter(m => under(m, 'VH_M_eye_R'))), eyeAtlas('right')],
];
const brainConcept = atlas.concepts.find(c => c.id === 'FMA50801');
if (!brainConcept) throw new Error('Conceito do encéfalo (FMA50801) ausente no atlas');
const brainBp3d = brainConcept.elements.map(id => atlas.parts.find(p => p.id === id)).filter(p => p && (p.system === 'nervous' || p.system === 'cardiac'));
const ORGANS = [
  // Coração: fica o do BodyParts3D (valvas cúspide por cúspide e ~60 ramos coronários já
  // encaixados na aorta); o do HRA tem menos coronárias. O corpo feminino usa o do HRA.
  { group: 'VH_M_left_kidney', system: 'urinary', target: byName.get('Left kidney').bounds, replace: [byName.get('Left kidney')] },
  { group: 'VH_M_right_kidney', system: 'urinary', target: byName.get('Right kidney').bounds, replace: [byName.get('Right kidney')] },
  // cálices e pelve renal são irmãos do rim na árvore do HRA: seguem o ajuste do rim e entram no mesmo conceito
  { group: 'VH_M_kidney_calyx_L', system: 'urinary', follow: 'VH_M_left_kidney', merge: true },
  { group: 'VH_M_renal_pelvis_L', system: 'urinary', follow: 'VH_M_left_kidney', merge: true },
  { group: 'VH_M_calyx_R', system: 'urinary', follow: 'VH_M_right_kidney', merge: true },
  { group: 'VH_M_renal_pelvis_R', system: 'urinary', follow: 'VH_M_right_kidney', merge: true },
  { group: 'VH_M_urinary_bladder', system: 'urinary', target: byName.get('Urinary bladder').bounds, replace: [byName.get('Urinary bladder')] },
  { group: 'VH_M_prostate_gland', system: 'reproductive', target: byName.get('Prostate').bounds, replace: [byName.get('Prostate')], skip: /prostate_duct|prostatic_utricle/ },
  // O BodyParts3D tem um encéfalo de 59 peças (giros e ventrículos); o do HRA tem 281
  // regiões, com núcleos profundos. Substitui e se ajusta à caixa dele.
  // O BodyParts3D não tem ceco (só a junção ileocecal). Ceco e válvula ileocecal do HRA entram
  // ajustados pelo colo ascendente, transverso e descendente, que existem nos dois corpos.
  { group: 'VH_M_colon', system: 'digestive', only: /caecum|ileocecal_valve/, fitFrom: ['VH_M_ascending_colon', 'VH_M_transverse_colon', 'VH_M_descending_colon', 'VH_M_hepatic_flexure_of_colon', 'VH_M_splenic_flexure_of_colon'], fitTo: ['Ascending colon', 'Transverse colon', 'Descending colon'] },
  { group: 'Allen_brain', system: 'brain', target: union(brainBp3d.map(p => p.bounds)), replace: brainBp3d, check: lsqFit(headPairs) },
];
const fits = new Map(), removed = new Set(), hraGroups = [];
for (const o of ORGANS) {
  const list = hra.filter(m => under(m, o.group) && !(o.skip && o.skip.test(m.name)) && (!o.only || o.only.test(m.name)) && m.idx.length >= 36);
  if (o.fitFrom) o.fit = uniformFit(hraBounds(hra.filter(m => o.fitFrom.includes(m.name))), union(o.fitTo.map(n => byName.get(n).bounds)));
  if (!list.length) throw new Error('Grupo HRA ausente: ' + o.group);
  const fit = o.fit || (o.follow ? fits.get(o.follow) : uniformFit(hraBounds(list), o.target)); fits.set(o.group, fit);
  if (fit.s < 0.6 || fit.s > 1.6) throw new Error(`Escala fora do esperado em ${o.group}: ${fit.s}`);
  if (o.check) { const d = Math.hypot(...[0, 1, 2].map(i => fit.t[i] - o.check.t[i] + (fit.s - o.check.s) * center(hraBounds(list))[i])); console.log(`  conferência por vértebras e olhos: diferença de ${(d * 1000).toFixed(0)} mm`); if (d > 0.05) throw new Error('Encaixe do encéfalo diverge da conferência'); }
  (o.replace || []).forEach(p => removed.add(p.id));
  const ids = [];
  for (const m of list) {
    const p = new Float32Array(m.pos.length); for (let i = 0; i < p.length; i += 3) for (let k = 0; k < 3; k++) p[i + k] = m.pos[i + k] * fit.s + fit.t[k];
    const sys = o.group === 'Allen_brain' ? 'brain' : o.system;
    added.push({ name: hraLabel(m.name), system: sys, source: 'hra', conceptId: 'HRA:' + m.name.replace(/^VH_M_/, ''), geo: finish(p, m.idx, 0.0006), group: o.group, ancestry: m.ancestry });
    ids.push(added.length - 1);
  }
  const root = o.merge ? o.follow : o.group, prev = hraGroups.find(g => g.group === root);
  if (prev) prev.ids.push(...ids); else hraGroups.push({ group: root, ids, s: +fit.s.toFixed(3) });
  console.log(`HRA ${o.group}: ${list.length} peças, escala ${fit.s.toFixed(3)}`);
}

// ---------- empacotar ----------
const keep = atlas.parts.filter(p => !removed.has(p.id));
let blob = [], bytes = 0; const chunks = [], newParts = [];
const flush = () => { if (!bytes) return; const name = `extra-${chunks.length}.bin`, data = Buffer.concat(blob); fs.writeFileSync(path.join(modelsDir, name), data); chunks.push({ url: '/models/' + name, bytes: data.length }); blob = []; bytes = 0; };
const put = a => { const pad = (4 - bytes % 4) % 4; if (pad) { blob.push(Buffer.alloc(pad)); bytes += pad; } const o = bytes, b = Buffer.from(a.buffer, a.byteOffset, a.byteLength); blob.push(b); bytes += b.length; return o; };
let triangles = 0, n = 0;
for (const a of added) {
  if (bytes > 7_000_000) flush();
  const id = (a.source === 'za' ? 'ZA' : 'HRAM') + String(++n).padStart(4, '0');
  const po = put(a.geo.pos), no = put(a.geo.nrm), io = put(a.geo.idx);
  a.id = id; triangles += a.geo.idx.length / 3;
  newParts.push({ id, name: a.name, conceptId: a.conceptId, system: a.system, chunk: atlas.chunks.length + chunks.length, positions: po, normals: no, indices: io, vertexCount: a.geo.pos.length / 3, indexCount: a.geo.idx.length, bounds: boundsOf(a.geo.pos), source: a.source });
}
flush();
for (const c of chunks) { const gz = zlib.gzipSync(fs.readFileSync(path.join(modelsDir, path.basename(c.url))), { level: 9 }); c.gzip = c.url + '.gz'; c.gzipBytes = gz.length; fs.writeFileSync(path.join(modelsDir, path.basename(c.gzip)), gz); }

// conceitos: um por peça nova + grupos (pulmões, fígado, coração, rins, encéfalo…)
const concepts = atlas.concepts.map(c => ({ ...c, elements: c.elements.filter(e => !removed.has(e)) })).filter(c => c.elements.length);
const have = new Set(concepts.map(c => c.id));
const add = (id, name, elements) => { if (!elements.length || have.has(id)) return; have.add(id); concepts.push({ id, name, elements }); };
for (const p of newParts) add(p.conceptId, p.name, [p.id]);
const ids = re => newParts.filter(p => re.test(p.name)).map(p => p.id);
add('TRAUBE:right-lung', 'Right lung', ids(/lobe of right lung/i));
add('TRAUBE:left-lung', 'Left lung', ids(/lobe of left lung/i));
add('TRAUBE:lungs', 'Lungs', ids(/lobe of (left|right) lung/i));
add('TRAUBE:liver', 'Liver', ids(/segment of liver/i));
// Lobos anatômicos a partir dos segmentos de Couinaud: direito V–VIII, esquerdo II–III, quadrado IV, caudado I.
add('TRAUBE:right-lobe-liver', 'Right lobe of liver', ids(/segment of liver (V|VI|VII|VIII)$/));
add('TRAUBE:left-lobe-liver', 'Left lobe of liver', ids(/segment of liver (II|III)$/));
add('TRAUBE:quadrate-lobe', 'Quadrate lobe', ids(/segment of liver IV$/));
add('TRAUBE:caudate-lobe', 'Caudate lobe of liver', ids(/segment of liver I$/));
add('TRAUBE:thyroid', 'Thyroid gland', ids(/^thyroid gland$/i));
add('TRAUBE:abdominal-wall', 'Muscles of anterolateral abdominal wall', ids(/rectus abdominis|abdominal oblique|transversus abdominis|pyramidalis/i));
for (const g of hraGroups) {
  const label = { VH_M_heart: 'Heart', VH_M_cardiac_artery: 'Coronary arteries', VH_M_cardiac_vein: 'Cardiac veins', VH_M_left_kidney: 'Left kidney', VH_M_right_kidney: 'Right kidney', VH_M_urinary_bladder: 'Urinary bladder', VH_M_prostate_gland: 'Prostate', Allen_brain: 'Brain' }[g.group];
  if (g.group === 'VH_M_colon') continue; // peças avulsas, sem conceito de grupo
  const own = g.group === 'Allen_brain' && concepts.find(c => c.id === 'FMA50801');
  if (own) { own.elements = [...g.ids.map(i => added[i].id), ...own.elements]; continue; } // mantém o conceito FMA do encéfalo
  add('TRAUBE:' + g.group, label, g.ids.map(i => added[i].id));
}
add('TRAUBE:kidneys', 'Kidney', hraGroups.filter(g => /kidney/.test(g.group)).flatMap(g => g.ids.map(i => added[i].id)));
for (const side of ['L', 'R']) add('TRAUBE:hemisphere-' + side, `Cerebral hemisphere (${side === 'L' ? 'left' : 'right'})`, added.filter(a => a.group === 'Allen_brain' && a.ancestry.includes('Allen_brain_Hemisphere_' + side)).map(a => a.id));

atlas.parts = [...keep, ...newParts];
atlas.chunks = [...atlas.chunks, ...chunks];
atlas.concepts = concepts;
atlas.triangles = atlas.parts.reduce((s, p) => s + p.indexCount / 3, 0);
atlas.extras = { zAnatomy: newParts.filter(p => p.source === 'za').length, hra: newParts.filter(p => p.source === 'hra').length, removed: [...removed].length, fit: { pairs: pairs.length, used: use.length }, organs: hraGroups.map(g => ({ group: g.group, parts: g.ids.length, scale: g.s })) };
fs.writeFileSync(manifestPath, JSON.stringify(atlas));
console.log(`Atlas ampliado: ${atlas.parts.length} peças (${newParts.length} novas, ${removed.size} substituídas), ${chunks.length} blocos extras, ${Math.round(triangles).toLocaleString('pt-BR')} triângulos novos`);
