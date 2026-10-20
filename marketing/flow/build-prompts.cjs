'use strict';
/*
 * Gerador de roteiros cinematográficos e prompts prontos para copiar no Google Flow.
 *
 * Uso:
 *   node flow/build-prompts.cjs --topic "avc-crises-convulsivas"
 *   node flow/build-prompts.cjs --feature "questoes-simulados"
 *   node flow/build-prompts.cjs --all
 */
const fs = require('node:fs');
const path = require('node:path');
const { MARKETING, args } = require('../scripts/lib/common.cjs');

const TEMPLATES = {
  feature: (feature, title) => `# PROMPTS GOOGLE FLOW — FUNCIONALIDADE: ${title.toUpperCase()}
Formato obrigatório: 9:16 Vertical (1080x1920) | Duração: 4 a 6 segundos | Sem API paga

## Cena 1 — Gancho Clínico
\`\`\`text
Vertical 9:16 cinematographic shot, high-end medical commercial aesthetics. A young medical doctor in navy blue scrubs and stethoscope standing in a modern clinic corridor, holding a smartphone with focused, confident posture. Natural hospital lighting, subtle lens flare, shallow depth of field, photorealistic, 8k, ARRI Alexa look, 24fps.
\`\`\`

## Cena 2 — Ação e Interação
\`\`\`text
Vertical 9:16 dynamic close-up. Physician's hands tapping on a high-resolution smartphone screen demonstrating a clean medical app with blue and white interface. Crisp focus, smooth hand movement, soft medical office bokeh in background, elegant color grade.
\`\`\`
`,

  clinical: (topic, title, area) => `# PROMPTS GOOGLE FLOW — CASO CLÍNICO: ${title.toUpperCase()}
Área: ${area} | Formato: 9:16 Vertical (1080x1920) | Estética: Premium médica

## Cena 1 — Admissão / Emergência
\`\`\`text
Vertical 9:16 cinematic emergency department scene. Experienced medical team in protective scrubs attending a patient bed in a high-tech modern hospital room. Monitors displaying cardiac telemetry, soft blue and amber ambient light, documentary medical realism, slow steadycam movement, 8k, photorealistic.
\`\`\`

## Cena 2 — Raciocínio Clínico e Decisão
\`\`\`text
Vertical 9:16 cinematic medium close-up. Senior physician conferring with a resident doctor over clinical findings, pointing at a digital diagnostic tablet. Serious, thoughtful expressions, soft cinematic lighting, shallow depth of field, authentic medical atmosphere.
\`\`\`
`
};

function main() {
  const a = args();
  const outDir = path.join(MARKETING, 'flow', 'prompts');
  fs.mkdirSync(outDir, { recursive: true });

  if (a.topic) {
    const content = TEMPLATES.clinical(a.topic, a.topic.replace(/-/g, ' '), 'Clínica Médica');
    const file = path.join(outDir, `${a.topic}-flow.md`);
    fs.writeFileSync(file, content);
    console.log(`✔ Prompts gerados para o caso clínico em: ${file}`);
  } else if (a.feature) {
    const content = TEMPLATES.feature(a.feature, a.feature.replace(/-/g, ' '));
    const file = path.join(outDir, `${a.feature}-flow.md`);
    fs.writeFileSync(file, content);
    console.log(`✔ Prompts gerados para a funcionalidade em: ${file}`);
  } else {
    console.log('Prompts existentes no Google Flow:');
    for (const f of fs.readdirSync(outDir)) console.log(` - flow/prompts/${f}`);
  }
}

if (require.main === module) main();
module.exports = { TEMPLATES };
