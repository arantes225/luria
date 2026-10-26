import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
const read = path => readFileSync(new URL("../" + path, import.meta.url), "utf8");

test("piloto não envia fotos para APIs ou aciona inferência", () => {
  const js = read("src/main.js");
  assert.match(js, /Camera\.getPhoto/);
  assert.match(js, /Capacitor\.isNativePlatform/);
  assert.match(js, /result\.webPath/);
  assert.doesNotMatch(js, /supabaseClient|generativelanguage\.googleapis|gemini|ecg-ai-reader|predict_loader|onnxruntime/i);
});
test("câmera não salva na galeria e não pede upload", () => {
  const js = read("src/main.js");
  assert.match(js, /saveToGallery:\s*false/);
  assert.match(js, /URL\.revokeObjectURL/);
  assert.match(js, /previewWrap\.hidden/);
});
test("CSP do piloto restringe destinos e interface avisa que não é clínica", () => {
  const html = read("index.html");
  assert.match(html, /Content-Security-Policy/);
  assert.match(html, /connect-src 'self'/);
  assert.match(html, /não interpreta|não classifica|não emite diagnóstico/i);
  assert.doesNotMatch(html, /https:\/\/.*supabase/i);
});
test("empacotamento nativo não carrega servidor remoto", () => {
  const config = JSON.parse(read("capacitor.config.json"));
  assert.equal(config.webDir, "dist");
  assert.equal(config.server?.url, undefined);
  const packageJson = JSON.parse(read("package.json"));
  assert.ok(packageJson.dependencies["@capacitor/camera"]);
});
