const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const sourceRoot = path.join(root, "apostilas");
const output = path.join(root, "assets", "data", "professor-alex-site-index.json");

function text(value) {
  if (value === null || value === undefined) return "";
  if (typeof value === "string" || typeof value === "number") return String(value);
  if (Array.isArray(value)) return value.map(text).join(" ");
  if (typeof value === "object") return Object.values(value).map(text).join(" ");
  return "";
}

function normalize(value) {
  return text(value).replace(/\s+/g, " ").trim();
}

const records = [];
for (const entry of fs.readdirSync(sourceRoot, { withFileTypes: true })) {
  if (!entry.isDirectory() || entry.name.startsWith("_")) continue;
  const file = path.join(sourceRoot, entry.name, "content.json");
  if (!fs.existsSync(file)) continue;
  let data;
  try { data = JSON.parse(fs.readFileSync(file, "utf8")); } catch { continue; }
  const title = normalize(data.t || data.title || entry.name);
  const area = normalize(data.a || data.area);
  const subject = normalize(data.m || data.subject);
  const headings = Array.isArray(data.o) ? data.o.map(item => Array.isArray(item) ? item[1] : item) : [];
  const summary = normalize(data.p || data.d || data.description);
  const body = normalize([title, area, subject, headings.join(" "), summary].join(" "))
    .slice(0, 2400);
  if (!body) continue;
  records.push({ slug: entry.name, title, area, subject, text: body });
}

records.sort((a, b) => a.title.localeCompare(b.title, "pt-BR"));
fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, JSON.stringify({ version: 1, generatedAt: new Date().toISOString(), records }) + "\n");
console.log(`Professor Alex site index: ${records.length} apostilas`);
