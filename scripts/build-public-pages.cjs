#!/usr/bin/env node
"use strict";

/*
 * LURIA GitHub Pages artifact builder.
 * Only intentional website directories and root entrypoints are published.
 * Anything else (SQL, tests, internal data, question-factory workspaces) stays out.
 * This is NOT a replacement for protecting the public GitHub source repository.
 */
const fs = require("node:fs");
const path = require("node:path");

const ROOT = process.cwd();
const DIST = path.join(ROOT, ".pages-dist");

const PUBLIC_DIRS = [
  "admin", "amigos", "apostilas", "aprender", "assets", "beta-testers",
  "caderno-erros", "caderno", "configuracoes", "consolidar", "content",
  "cronograma", "dashboard", "data", "desafio-diario", "editais",
  "estatisticas", "estudar", "flashcards", "login", "mini-osce",
  "plantao", "professor-alex", "questoes-simulados", "registrar-questoes",
  "resolver-questoes", "sessao-estudo", "trabalho"
];

const PUBLIC_ROOT_FILES = [
  ".nojekyll", "CNAME", "manifest.webmanifest", "service-worker.js"
];

const EXCLUDED_FILE_ENDINGS = [
  ".md", ".sql", ".cjs", ".py", ".sh", ".ps1", ".log", ".map", ".bak",
  ".sqlite", ".db", ".pem", ".key"
];

function excluded(relativePath) {
  const base = path.basename(relativePath);
  const normalized = relativePath.replace(/\\/g, "/").toLowerCase();
  const parts = normalized.split("/");
  if (base.startsWith(".") || base === "node_modules" || base === "__pycache__") return true;
  if (parts.some(part => /^qf[-_]/.test(part) || part === "private" || part === "secrets" || part === "backups")) return true;
  if (parts.some(part => part === ".git" || part === ".github" || part === "node_modules" || part === "__pycache__")) return true;
  if (EXCLUDED_FILE_ENDINGS.some(ext => normalized.endsWith(ext))) return true;
  if (/(^|\/)\.env(?:$|\.)/.test(normalized)) return true;
  return false;
}

let fileCount = 0;
function copyPublic(from, to, rel) {
  const stat = fs.lstatSync(from);
  if (stat.isSymbolicLink()) {
    throw new Error("Refusing symlink in public artifact: " + rel);
  }
  if (stat.isDirectory()) {
    fs.mkdirSync(to, { recursive: true });
    for (const name of fs.readdirSync(from)) {
      const child = rel ? rel + "/" + name : name;
      if (excluded(child)) continue;
      copyPublic(path.join(from, name), path.join(to, name), child);
    }
    return;
  }
  if (!stat.isFile()) throw new Error("Unexpected source entry: " + rel);
  fs.mkdirSync(path.dirname(to), { recursive: true });
  // Fail closed if a privileged Supabase key is accidentally committed to a public asset.
  if (/\.(?:html?|js|mjs|json|css|txt)$/i.test(rel)) {
    const body = fs.readFileSync(from, "utf8");
    if (/sb_secret_[A-Za-z0-9_-]+/.test(body)) {
      throw new Error("Supabase secret key detected in public file: " + rel);
    }
    const tokens = body.match(/eyJ[A-Za-z0-9_-]+\.eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/g) || [];
    for (const token of tokens) {
      try {
        const claim = JSON.parse(Buffer.from(token.split(".")[1], "base64url").toString("utf8"));
        if (claim && claim.role === "service_role") {
          throw new Error("Service-role JWT detected in public file: " + rel);
        }
      } catch (error) {
        if (/Service-role JWT detected/.test(String(error.message))) throw error;
      }
    }
  }
  fs.copyFileSync(from, to);
  fileCount++;
}

fs.rmSync(DIST, { recursive: true, force: true });
fs.mkdirSync(DIST, { recursive: true });

for (const name of fs.readdirSync(ROOT)) {
  if (/^[^./][^/]*\.html$/i.test(name)) {
    copyPublic(path.join(ROOT, name), path.join(DIST, name), name);
  }
}
for (const name of PUBLIC_ROOT_FILES) {
  const source = path.join(ROOT, name);
  if (!fs.existsSync(source)) throw new Error("Required root file missing: " + name);
  // .nojekyll is deliberately the only allowed hidden root file.
  copyPublic(source, path.join(DIST, name), name);
}
for (const name of PUBLIC_DIRS) {
  const source = path.join(ROOT, name);
  if (!fs.existsSync(source) || !fs.statSync(source).isDirectory()) {
    throw new Error("Expected public directory missing: " + name);
  }
  copyPublic(source, path.join(DIST, name), name);
}

const essential = [
  "index.html", "CNAME", ".nojekyll", "service-worker.js",
  "assets/js/app.js", "apostilas/index.html", "flashcards/index.html"
];
for (const rel of essential) {
  if (!fs.existsSync(path.join(DIST, rel))) {
    throw new Error("Required page missing from public artifact: " + rel);
  }
}
const prohibited = [
  "db", "docs", "supabase", "tests", "scripts", "tools", "tmp", ".tmp", ".github"
];
for (const name of prohibited) {
  if (fs.existsSync(path.join(DIST, name))) {
    throw new Error("Internal directory leaked to Pages: " + name);
  }
}
const rootDirectories = fs.readdirSync(DIST, { withFileTypes: true })
  .filter(entry => entry.isDirectory()).map(entry => entry.name);
for (const name of rootDirectories) {
  if (!PUBLIC_DIRS.includes(name)) throw new Error("Non-allowlisted directory: " + name);
}
// Transitional audit: weekly question packs are intentionally still public.
// Warn about this exposure until they are served through an authorized backend.
const WEEKLY = path.join(DIST, "content", "weekly");
if (fs.existsSync(WEEKLY)) {
  const manifestPath = path.join(WEEKLY, "manifest.json");
  if (fs.existsSync(manifestPath)) {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
    const questionUrls = (manifest.groups || []).flatMap(group =>
      (group.questions || []).map(item => typeof item === "string" ? item : item.url)
    );
    const leakedAnswers = [];
    for (const url of questionUrls) {
      if (!url || !url.startsWith("/content/weekly/")) {
        throw new Error("Unexpected weekly pack location in manifest");
      }
      const absolute = path.resolve(DIST, "." + url);
      if (!absolute.startsWith(WEEKLY + path.sep)) {
        throw new Error("Weekly manifest path escapes public content folder");
      }
      if (!fs.existsSync(absolute)) {
        throw new Error("Weekly pack referenced but not published: " + url);
      }
      const payload = JSON.parse(fs.readFileSync(absolute, "utf8"));
      if (Array.isArray(payload.items) && payload.items.some(item =>
        item && (Object.hasOwn(item, "gabarito") ||
          Object.hasOwn(item, "correct_answer")))) {
        leakedAnswers.push(url);
      }
    }
    if (leakedAnswers.length) {
      console.warn("SECURITY WARNING: " + leakedAnswers.length +
        " weekly question packs include answer keys in public Pages files. " +
        "Requires migration to authorized backend; deployment remains compatible.");
    }
  }
}
console.log("Pages artifact prepared: " + fileCount + " public files, " +
  rootDirectories.length + " approved directories.");
