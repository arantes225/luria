"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const source = fs.readFileSync(path.join(__dirname, "../assets/js/ecg-smart-camera.js"), "utf8");
const html = fs.readFileSync(path.join(__dirname, "../trabalho/ecg/index.html"), "utf8");
const css = fs.readFileSync(path.join(__dirname, "../assets/css/ecg-smart-camera.css"), "utf8");
const pwa = fs.readFileSync(path.join(__dirname, "../assets/js/pwa.js"), "utf8");
const worker = fs.readFileSync(path.join(__dirname, "../service-worker.js"), "utf8");
const ui = fs.readFileSync(path.join(__dirname, "../assets/js/ecg-smart-ui.js"), "utf8");

function guard() {
  const fakeGlobal = {LuriaEcgContracts:{normalizeAnomalies:x=>x||[]}};
  vm.runInNewContext(source, {window:fakeGlobal,Date,console});
  assert.equal(typeof fakeGlobal.LuriaEcgSceneGuard.isVerifiedEcgScene,"function");
  return fakeGlobal.LuriaEcgSceneGuard.isVerifiedEcgScene;
}
const positive = () => ({
  detected: true,
  sheet: {found:true,isCutOff:false,hasSeverePerspective:false},
  detectedLayout: {validWaveformCells:10,ocrConfirmedCount:2,leads:{DI:{},DII:{},DIII:{},aVR:{}}},
  leads: {DI:{},DII:{},DIII:{},aVR:{}},
  candidateRegions: {DI:{},DII:{},DIII:{},aVR:{}},
  calibration: {gridDetected:true}
});

test("keyboard, table, blank paper and text never qualify as a verified ECG", () => {
  const verified=guard();
  assert.equal(verified(null),false);
  assert.equal(verified({detected:false,quality:{brightness:120}}),false);
  const keyboard=positive();
  keyboard.sheet={found:false};
  assert.equal(verified(keyboard),false);
  const textDocument=positive();
  textDocument.detectedLayout.validWaveformCells=0;
  assert.equal(verified(textDocument),false);
  const blank=positive();
  blank.calibration.gridDetected=false;
  blank.detected=false;
  blank.detectedLayout.validWaveformCells=0;
  blank.detectedLayout.ocrConfirmedCount=0;
  assert.equal(verified(blank),false);
  const cropped=positive();
  cropped.sheet.isCutOff=true;
  assert.equal(verified(cropped),false);
  const badPerspective=positive();
  badPerspective.sheet.hasSeverePerspective=true;
  assert.equal(verified(badPerspective),false);
});

test("ECG paper with morphology and measured grid is allowed; OCR alternative is independently validated",()=>{
  const verified=guard();
  assert.equal(verified(positive()),true);
  const withoutGrid=positive();
  withoutGrid.calibration.gridDetected=false;
  withoutGrid.detectedLayout.validWaveformCells=3; // No six-trace live fallback: test independent OCR evidence.
  withoutGrid.recognizedLabels = Object.fromEntries(["a","b"].map(k=>[k,{ocrRecognized:true,hasValidTrace:true}]));
  assert.equal(verified(withoutGrid),true);
  withoutGrid.recognizedLabels = {a:{ocrRecognized:true,hasValidTrace:true}};
  assert.equal(verified(withoutGrid),false);
});

test("autonomous ECG capture cannot run without verified scene and temporal stability",()=>{
  assert.match(source,/verifiedFrameCount >= 4/);
  assert.match(source,/Date\.now\(\) - verifiedSince >= 400/);
  assert.match(source,/!isCaptureReadyScene\(frameAnalysis\?\.docDetection\)/);
  assert.match(source,/options\.source === "autonomous_camera" && !isVerifiedEcgScene\(boundaries\)/);
  const block = source.slice(source.indexOf("function processCurrentFrame()"),source.indexOf("function setReticleStatus("));
  assert.doesNotMatch(block,/if\s*\(!docDetection\.detected\)[\s\S]*?performAutonomousCapture\(false/);
  assert.match(block,/if \(!captureReadyEvidence\)\s*\{/);
  assert.match(source,/setHudPaperVerified\(hasEcgEvidence\)/);
});

test("scanner gives actionable framing guidance and always offers a manual photo fallback",()=>{
  assert.match(html,/id="ecg-guided-capture"/);
  assert.match(ui,/guidedCapture\?\.addEventListener\("click"/);
  assert.match(source,/function captureCurrentFrame\(\)/);
  assert.match(source,/Afaste o celular até aparecerem as quatro bordas/);
  assert.match(source,/Alinhe a câmera paralela ao papel/);
  assert.match(source,/Folha encontrada\. Aproxime devagar/);
});

test("capturing uses native dialog top layer and has no false lead or frame guide",()=>{
  assert.match(html,/<dialog id="ecg-guided-camera-page"/);
  assert.match(html,/<dialog id="ecg-normal-photo-page"/);
  assert.match(ui,/guidedPage\.showModal\(\)/);
  assert.match(ui,/guidedPage\.close\(\)/);
  assert.match(css,/#ecg-guided-camera-page \.ecg-hud-reticle-wrap\s*\{\s*display:\s*none\s*!important/);
  assert.match(css,/\.ecg-capture-active > :not\(#ecg-guided-camera-page\):not\(#ecg-normal-photo-page\)/);
  assert.match(css,/#ecg-guided-camera-page::backdrop/);
});

test("automatic capture uses native camera resolution and requests continuous focus when available",()=>{
  assert.match(source,/width:\s*\{ ideal: 3840 \}/);
  assert.match(source,/focusMode\?\.includes\?\.\("continuous"\)/);
  assert.match(source,/snapCanvas\.width = videoEl\?\.videoWidth/);
  assert.match(source,/snapCtx\.drawImage\(videoEl\?\.videoWidth \? videoEl : canvasEl/);
});

test("installed PWA release and ECG assets are cache-busted together",()=>{
  const workerRelease = worker.match(/const CACHE_VERSION = "luria-pwa-([^"]+)"/)?.[1];
  const clientRelease = pwa.match(/const release = "([^"]+)"/)?.[1];
  assert.ok(workerRelease, "O Service Worker deve possuir identificador de versão");
  assert.equal(workerRelease, clientRelease, "Versões do PWA e do Service Worker devem ser iguais");
  assert.match(html,/ecg-signal-extractor\.js\?v=7/);
  assert.match(html,/ecg-cv-engine\.js\?v=9/);
  assert.match(html,/ecg-smart-camera\.js\?v=11/);
  assert.match(html,/ecg-smart-ui\.js\?v=10/);
  assert.match(html,/ecg-smart-camera\.css\?v=7/);
});
