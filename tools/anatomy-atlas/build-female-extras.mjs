// Revisão do atlas feminino: usa apenas malhas femininas registradas na referência HRA.
// Retira estruturas gestacionais e evita duplicar o reto femoral da própria referência.
// Não transplanta músculos do corpo masculino: a deformação por ossos alterava braços e tronco.
import fs from 'node:fs';
import path from 'node:path';

const dir = process.argv[2];
if (!dir) throw new Error('Uso: build-female-extras.mjs MODELS_DIR');
const file = path.join(dir, 'atlas-female.json');
const female = JSON.parse(fs.readFileSync(file, 'utf8'));
if (female.femaleExtras) throw new Error('O atlas feminino já foi revisado.');
if (female.sex !== 'female') throw new Error('Referência feminina inesperada.');

const removed = female.parts.filter(p =>
  p.system === 'pregnancy' ||
  (p.system === 'donor-muscle' && /^Rectus femoris \((left|right)\)$/i.test(p.name))
);
const removedIds = new Set(removed.map(p => p.id));
female.parts = female.parts.filter(p => !removedIds.has(p.id));
female.concepts = female.concepts
  .map(c => ({...c, elements: c.elements.filter(id => !removedIds.has(id))}))
  .filter(c => c.elements.length > 0);
const byName = new Map(female.concepts.map(c => [c.name.toLowerCase(), c]));
const add = (id, name, elements) => {
  if (!elements.length) return;
  const same = byName.get(name.toLowerCase());
  if (same) { same.elements = [...new Set([...same.elements, ...elements])]; return; }
  const c = {id, name, elements};
  female.concepts.push(c);
  byName.set(name.toLowerCase(), c);
};
const fids = re => female.parts.filter(p => re.test(p.name)).map(p => p.id);
const coronary = fids(/coronary artery|anterior descending|circumflex artery|posterior descending|diagonal branch|marginal branch|right marginal artery/i);
const cardiacVeins = fids(/cardiac vein|coronary sinus|left marginal vein|oblique vein of (the )?left atrium|posterior vein of left ventricle/i);
add('TRAUBE:coronary-arteries', 'Coronary arteries', coronary);
add('TRAUBE:cardiac-veins', 'Cardiac veins', cardiacVeins);
add('TRAUBE:left-circumflex', 'Left circumflex artery', fids(/circumflex/i));
const heart = byName.get('heart');
if (heart) heart.elements = [...new Set([...heart.elements, ...coronary, ...cardiacVeins])];
for (const [id, name, re] of [
  ['TRAUBE:female-pelvis', 'Female pelvic organs', /^(?:Body of uterus|Fundus of uterus|Cervix|Left ovary|Right ovary|Vagina|Ampulla of uterine tube \((?:left|right)\)|Urinary bladder)$/i],
  ['TRAUBE:uterus-ovaries', 'Uterus and ovaries', /^(?:Body of uterus|Fundus of uterus|Cervix|Left ovary|Right ovary)$/i]
]) add(id, name, fids(re));
for (const name of ['Uterus', 'Ovary', 'Female pelvic organs']) {
  if (!byName.has(name.toLowerCase())) throw new Error('Órgão feminino ausente: ' + name);
}
if (female.parts.some(p => p.system === 'pregnancy')) throw new Error('Gestação ainda presente.');
if (female.parts.some(p => p.system === 'borrowed-muscle')) throw new Error('Músculos masculinos adaptados ainda presentes.');
female.triangles = female.parts.reduce((sum, p) => sum + p.indexCount / 3, 0);
female.femaleExtras = {
  removedPregnancy: removed.filter(p => p.system === 'pregnancy').length,
  removedDuplicateMuscles: removed.filter(p => p.system === 'donor-muscle').length,
  borrowedMuscles: 0,
  method: 'malhas femininas nativas HRA v1.10; músculos da doadora feminina original preservados'
};
fs.writeFileSync(file, JSON.stringify(female));
console.log(`Atlas feminino revisado: ${female.parts.length} malhas, ${female.femaleExtras.removedPregnancy} peças gestacionais excluídas, ${female.femaleExtras.removedDuplicateMuscles} músculos duplicados excluídos`);
