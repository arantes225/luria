"use strict";
const fs = require("node:fs");
const path = require("node:path");

const source = path.resolve(process.argv[3] || "/tmp/luria-human-atlas");
const output = path.resolve("build/pages/aprender/anatomia/atlas");
const base = "/aprender/anatomia/atlas/";
const mode = process.argv[2];

if (mode === "prepare") {
  const pagePath = path.join(source, "app/page.tsx");
  const original = fs.readFileSync(pagePath, "utf8");
  const needle = "fetch('/models/atlas.json'";
  if (!original.includes(needle)) throw new Error("Human Atlas model URL changed upstream");
  fs.writeFileSync(pagePath, original.replace(needle, "fetch(import.meta.env.BASE_URL+'models/atlas.json'"));

  const manifestPath = path.join(source, "public/models/atlas.json");
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  if (!Array.isArray(manifest.chunks) || manifest.chunks.length < 10 || !Array.isArray(manifest.parts) || manifest.parts.length < 2000) {
    throw new Error("Human Atlas catalogue coverage changed");
  }
  for (const chunk of manifest.chunks) {
    for (const key of ["url", "gzip"]) {
      if (chunk[key]) chunk[key] = base + "models/" + path.basename(chunk[key]);
    }
  }
  fs.writeFileSync(manifestPath, JSON.stringify(manifest));
  console.log(`Human Atlas prepared: ${manifest.parts.length} selectable meshes, ${manifest.chunks.length} chunks`);
} else if (mode === "install") {
  const dist = path.join(source, "dist");
  if (!fs.existsSync(path.join(dist, "index.html")) || !fs.existsSync(path.join(dist, "models/atlas.json"))) {
    throw new Error("Human Atlas build is incomplete");
  }
  fs.cpSync(dist, output, { recursive: true, force: true });
  fs.copyFileSync(path.join(source, "LICENSE"), path.join(output, "LICENSE-human-atlas.txt"));
  let html = fs.readFileSync(path.join(output, "index.html"), "utf8");
  const navigation = '<a href="/aprender/anatomia/" aria-label="Voltar à Sala de Anatomia do LURIA" style="position:fixed;z-index:10000;left:12px;bottom:12px;display:inline-flex;align-items:center;gap:8px;padding:10px 14px;border:1px solid #b8c8ce;border-radius:999px;background:#fff;color:#123344;font:700 13px system-ui,sans-serif;text-decoration:none;box-shadow:0 8px 25px #12334425">← LURIA · Sala de Anatomia</a>';
  if (!html.includes("</body>")) throw new Error("Human Atlas index changed upstream");
  html = html.replace("</body>", navigation + "</body>");
  fs.writeFileSync(path.join(output, "index.html"), html);
  console.log(`Human Atlas installed at ${output}`);
} else {
  throw new Error("Use prepare or install");
}

