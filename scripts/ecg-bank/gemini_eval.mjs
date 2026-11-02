#!/usr/bin/env node
// Mede quão fielmente o Gemini digitaliza o traçado do ECG, contra o sinal PTB-XL original.
// Roda NA SUA MÁQUINA (a chave não vai para o repositório nem para o chat).
//
//   export GEMINI_API_KEY="..."          # a chave fica só no seu terminal
//   export GEMINI_MODEL="gemini-2.5-flash"   # opcional; troque pelo modelo que quiser testar
//   python3 scripts/ecg-bank/make_bank.py /tmp/ecg-synth
//   node scripts/ecg-bank/gemini_eval.mjs /tmp/ecg-synth [--only clean,rot3] [--limit 6] [--dry]
//
// SOMENTE imagens sintéticas do banco (PTB-XL, CC BY 4.0, sem dados de paciente). NUNCA use
// este script com ECG de paciente real: a imagem é enviada ao Google.
// --dry não chama a API: valida o cálculo das métricas com uma resposta simulada (--dry-bad: resposta errada
// de propósito, para provar que as métricas reprovam).
import fs from "node:fs";
import path from "node:path";

const dir = process.argv[2];
if (!dir) { console.error("uso: node gemini_eval.mjs <pasta_banco_sintetico> [--only a,b] [--limit N] [--dry]"); process.exit(1); }
const arg = n => { const i = process.argv.indexOf(n); return i >= 0 ? process.argv[i + 1] : null; };
const DRY = process.argv.includes("--dry") || process.argv.includes("--dry-bad");
const ONLY = (arg("--only") || "").split(",").filter(Boolean);
const LIMIT = Number(arg("--limit") || 0);
const MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";
const KEY = process.env.GEMINI_API_KEY;
if (!DRY && !KEY) { console.error("Defina GEMINI_API_KEY no terminal (não cole a chave no chat)."); process.exit(1); }

const LEADS = ["I", "II", "III", "aVR", "aVL", "aVF", "V1", "V2", "V3", "V4", "V5", "V6"];
const N = 250; // amostras por derivação (2,5 s a 100 Hz)

const PROMPT = `Esta imagem é um ECG de 12 derivações impresso em papel milimetrado (25 mm/s, 10 mm/mV),
em 3 linhas x 4 colunas mais uma tira de ritmo. Cada coluna cobre 2,5 segundos.
Digitalize o traçado de CADA derivação (I, II, III, aVR, aVL, aVF, V1, V2, V3, V4, V5, V6) lido
exatamente como está desenhado. Use o pulso de calibração de 1 mV e a grade para dar a amplitude em mV.
Responda SOMENTE um JSON: {"leads": {"I": [${N} números], "II": [...], ...}}, com ${N} amostras em mV por
derivação, uniformemente espaçadas ao longo do trecho da derivação (esquerda para a direita).
Se não conseguir ler uma derivação, use null para ela. Não invente traçado.`;

function resample(a, n) {
  const out = new Array(n);
  for (let i = 0; i < n; i++) {
    const x = (i * (a.length - 1)) / (n - 1), lo = Math.floor(x), hi = Math.min(a.length - 1, lo + 1);
    out[i] = a[lo] * (1 - (x - lo)) + a[hi] * (x - lo);
  }
  return out;
}
const mean = a => a.reduce((s, v) => s + v, 0) / a.length;
const std = a => { const m = mean(a); return Math.sqrt(mean(a.map(v => (v - m) ** 2))); };
function metrics(pred, truth) {
  const p = resample(pred, N), t = resample(truth, N);
  const mp = mean(p), mt = mean(t);
  const p0 = p.map(v => v - mp), t0 = t.map(v => v - mt);
  const sp = std(p0), st = std(t0);
  let num = 0; for (let i = 0; i < N; i++) num += p0[i] * t0[i];
  const r = sp > 0 && st > 0 ? num / (N * sp * st) : NaN;
  const mae = mean(p0.map((v, i) => Math.abs(v - t0[i])));
  return { r, mae, ampRatio: st > 0 ? sp / st : NaN };
}

async function callGemini(imgPath) {
  const b64 = fs.readFileSync(imgPath).toString("base64");
  const body = {
    contents: [{ parts: [{ text: PROMPT }, { inlineData: { mimeType: "image/jpeg", data: b64 } }] }],
    generationConfig: { responseMimeType: "application/json", temperature: 0 }
  };
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;
  for (let attempt = 0; attempt < 4; attempt++) {
    const t0 = Date.now();
    const res = await fetch(url, { method: "POST", headers: { "content-type": "application/json", "x-goog-api-key": KEY }, body: JSON.stringify(body) });
    if (res.status === 429 || res.status >= 500) { await new Promise(r => setTimeout(r, 4000 * (attempt + 1))); continue; }
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${(await res.text()).slice(0, 200)}`);
    const j = await res.json();
    const text = j.candidates?.[0]?.content?.parts?.map(p => p.text || "").join("") || "";
    return { text, ms: Date.now() - t0, usage: j.usageMetadata || {} };
  }
  throw new Error("sem resposta após 4 tentativas");
}

const manifest = JSON.parse(fs.readFileSync(path.join(dir, "manifest.json"), "utf8"));
let items = manifest.images.filter(i => !ONLY.length || ONLY.includes(i.degradation));
if (LIMIT) items = items.slice(0, LIMIT);

const rows = [], tokens = { in: 0, out: 0 };
for (const item of items) {
  const truthByLead = {};
  for (const t of Object.values(item.truth_clean)) if (t.row < 3) truthByLead[t.lead.toLowerCase()] = t.mv;
  let leads = null, ms = 0, err = null;
  try {
    if (DRY) {
      leads = {}; // resposta simulada: verdade + ruído, para validar as métricas
      const BAD = process.argv.includes("--dry-bad"); // resposta errada de propósito: derivação trocada
      LEADS.forEach((L, k) => {
        const src = truthByLead[(BAD ? LEADS[(k + 1) % 12] : L).toLowerCase()];
        leads[L] = src.map((v, i) => (BAD ? 1.6 * v : v) + 0.02 * Math.sin(i));
      });
    } else {
      const r = await callGemini(path.join(dir, item.file));
      ms = r.ms; tokens.in += r.usage.promptTokenCount || 0; tokens.out += r.usage.candidatesTokenCount || 0;
      leads = JSON.parse(r.text.replace(/^```json|```$/g, "").trim()).leads;
    }
  } catch (e) { err = e.message; }
  const per = [];
  if (leads) for (const L of LEADS) {
    const pred = leads[L] ?? leads[L.toUpperCase()] ?? leads[L.toLowerCase()];
    if (!Array.isArray(pred) || pred.length < 20 || pred.some(v => typeof v !== "number")) { per.push(null); continue; }
    per.push(metrics(pred, truthByLead[L.toLowerCase()]));
  }
  rows.push({ file: item.file, degradation: item.degradation, ms, err, per });
  const ok = per.filter(Boolean);
  console.log(item.file.padEnd(28), err ? "ERRO " + err : `deriv ${ok.length}/12  r=${mean(ok.map(m => m.r)).toFixed(3)}  MAE=${mean(ok.map(m => m.mae)).toFixed(3)} mV  amp=${mean(ok.map(m => m.ampRatio)).toFixed(2)}  ${ms} ms`);
}

const all = rows.flatMap(r => r.per.filter(Boolean));
const total = rows.length * 12;
const good = all.filter(m => m.r > 0.9 && m.ampRatio > 0.8 && m.ampRatio < 1.25).length;
console.log("\n===== RESUMO =====");
console.log(`modelo: ${DRY ? "(dry-run)" : MODEL} | imagens: ${rows.length} | derivações lidas: ${all.length}/${total}`);
console.log(`derivações fiéis (r>0,9 e amplitude 0,8–1,25): ${good}/${total} (${(100 * good / total).toFixed(0)}%)`);
console.log(`correlação média ${mean(all.map(m => m.r)).toFixed(3)} | MAE médio ${mean(all.map(m => m.mae)).toFixed(3)} mV | razão de amplitude média ${mean(all.map(m => m.ampRatio)).toFixed(2)}`);
const byDeg = {};
for (const r of rows) (byDeg[r.degradation] = byDeg[r.degradation] || []).push(...r.per.filter(Boolean));
for (const [k, v] of Object.entries(byDeg)) console.log(`  ${k.padEnd(12)} r=${mean(v.map(m => m.r)).toFixed(3)}  amp=${mean(v.map(m => m.ampRatio)).toFixed(2)}  (${v.length} deriv.)`);
if (!DRY) console.log(`tokens: entrada ${tokens.in}, saída ${tokens.out} (use a tabela de preços atual do modelo para estimar o custo por ECG)`);
fs.writeFileSync(path.join(dir, DRY ? "gemini_eval_dry.json" : "gemini_eval.json"), JSON.stringify({ model: MODEL, rows }, null, 1));
