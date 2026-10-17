import fs from "node:fs";

const slugs = [
  "sindromes-coronarianas-agudas",
  "avaliacao-pre-operatoria-risco-cirurgico",
  "assistencia-recem-nascido-sala-parto",
  "principios-diretrizes-sus",
  "insuficiencia-cardiaca",
  "cuidados-perioperatorios-prevencao-complicacoes",
  "reanimacao-neonatal",
  "diagnostico-datacao-gestacao",
  "lei-8080-1990",
  "hipertensao-arterial-sistemica",
  "resposta-metabolica-ao-trauma",
  "prematuridade-baixo-peso-nascer",
  "exames-rastreamentos-pre-natal",
  "lei-8142-1990",
  "arritmias-fibrilacao-atrial",
  "reposicao-volemica-disturbios-hidroeletroliticos",
  "ictericia-neonatal",
  "vacinacao-suplementacao-gestacao",
  "atencao-primaria-saude-atributos",
  "valvopatias",
  "choque-hemorragico",
  "sepse-neonatal"
];

let modifiedCount = 0;

slugs.forEach(slug => {
  const file = `apostilas/${slug}/content.json`;
  if (!fs.existsSync(file)) return;
  const raw = fs.readFileSync(file, "utf8");
  
  // Test JSON parsing before
  JSON.parse(raw);
  
  // Replace < not followed by valid HTML tags with &lt;
  const fixed = raw.replace(/<(?!\/?(?:p|h[1-6]|strong|em|b|i|u|span|div|a|table|thead|tbody|tr|th|td|ul|ol|li|br|section|article|aside|nav|header|footer|button|small|code|pre|svg|path|circle|line|rect|polygon|polyline|text)\b)/gi, "&lt;");
  
  if (fixed !== raw) {
    // Test JSON parsing after
    const parsed = JSON.parse(fixed);
    // Write back formatted
    fs.writeFileSync(file, JSON.stringify(parsed, null, 2) + "\n", "utf8");
    console.log(`Fixed unescaped < in: ${slug}`);
    modifiedCount++;
  } else {
    console.log(`Clean (no unescaped <): ${slug}`);
  }
});

console.log(`\nFinished: updated ${modifiedCount} files.`);
