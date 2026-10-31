"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const {JSDOM} = require("jsdom");
const root = path.join(__dirname,"..");
const html = fs.readFileSync(path.join(root,"trabalho/ecg/index.html"),"utf8");
const code = fs.readFileSync(path.join(root,"assets/js/ecg-smart-ui.js"),"utf8");
const css = fs.readFileSync(path.join(root,"assets/css/ecg-smart-camera.css"),"utf8");

function createScene(url = "https://www.resibulando.online/trabalho/ecg/") {
  const dom = new JSDOM(html,{url,runScripts:"outside-only"});
  const w=dom.window, d=w.document;
  let controllerConfig, started=0, stopped=0, currentMode = 'fast';
  w.matchMedia = () => ({matches:false});
  w.TraubeEcgSmartHint = {};
  w.TraubeSmartCamera = {createController: opts => {
    controllerConfig = opts;
    return {
      startCamera: mode => {started++;currentMode=mode;opts.onStageChange(1);},
      stopCamera: () => {stopped++;},
      getCurrentMode: () => currentMode,
      getCapturedLeads: () => [],
      getSessionStructuredPackage: () => ({calibration:{}}),
      setMode(){}, resetCaptureSession(){},
      updateHudProgress(){}
    };
  }};
  // Deliberately add mobile bottom bar and visible educational content;
  // the camera must be a separate body-level capture surface.
  const bar=d.createElement("nav");bar.id="ui-mobile-navigation";d.body.append(bar);
  const panel=d.querySelector('[data-ecg-panel="passos"]');
  panel.classList.add("is-active");
  d.querySelector('[data-ecg-tab="passos"]').classList.add("is-active");
  w.eval(code);
  return {dom,w,d,bar,panel,get config(){return controllerConfig;},get started(){return started;},get stopped(){return stopped;}};
}

test("guidance is a body sibling, NOT a child of the educational ECG panel", () => {
  const x=createScene();
  x.d.getElementById("ecg-btn-start-fast").click();
  const page=x.d.getElementById("ecg-guided-camera-page");
  const viewport=x.d.getElementById("ecg-camera-viewport");
  assert.equal(page.parentElement,x.d.body);
  assert.equal(viewport.parentElement,x.d.getElementById("ecg-guided-camera-mount"));
  assert.equal(page.hidden,false);
  assert.equal(x.d.body.classList.contains("ecg-capture-active"),true);
  assert.equal(x.d.querySelector(".app-shell").inert,true);
  assert.equal(x.d.querySelector(".app-shell").getAttribute("aria-hidden"),"true");
  assert.equal(x.d.querySelector('[data-ecg-panel="passos"]').classList.contains("is-active"),false);
  assert.equal(x.d.querySelector('[data-ecg-panel="scanner"]').classList.contains("is-active"),true);
  x.dom.window.close();
});

test("guided camera close stops stream and returns normal PWA navigation state", () => {
  const x=createScene("https://arantes225.github.io/luria/trabalho/ecg/");
  x.d.getElementById("ecg-btn-start-ultra").click();
  assert.equal(x.d.getElementById("ecg-guided-camera-page").dataset.captureMode,"ultrasensitive");
  x.d.getElementById("ecg-guided-close").click();
  assert.equal(x.d.getElementById("ecg-guided-camera-page").hidden,true);
  assert.equal(x.d.body.classList.contains("ecg-capture-active"),false);
  assert.equal(x.d.querySelector(".app-shell").inert,false);
  assert.ok(x.stopped>0);
  x.dom.window.close();
});

test("when digitizer transitions to review, modal closes and remains on ECG scanner panel", () => {
  const x=createScene();
  x.d.getElementById("ecg-btn-start-fast").click();
  x.config.onStageChange(2);
  assert.equal(x.d.getElementById("ecg-guided-camera-page").hidden,true);
  assert.equal(x.d.getElementById("ecg-stage2-review").hidden,false);
  assert.equal(x.d.querySelector('[data-ecg-panel="passos"]').classList.contains("is-active"),false);
  assert.equal(x.d.body.classList.contains("ecg-capture-active"),false);
  x.dom.window.close();
});

test("landscape and portrait share the SAME independent capture surface", () => {
  for(const viewport of [[390,844],[844,390]]) {
    const x=createScene();
    Object.defineProperty(x.w,"innerWidth",{value:viewport[0],configurable:true});
    Object.defineProperty(x.w,"innerHeight",{value:viewport[1],configurable:true});
    x.d.getElementById("ecg-btn-start-fast").click();
    x.w.dispatchEvent(new x.w.Event("resize"));
    assert.equal(x.d.getElementById("ecg-guided-camera-page").hidden,false);
    assert.equal(x.d.querySelector(".app-shell").inert,true);
    x.d.getElementById("ecg-guided-close").click();
    x.dom.window.close();
  }
});

test("PWA CSS hides panels and navigation during photo or scanner capture; no fixed 16:9 crop", () => {
  assert.match(css, /body\[data-page="trabalho_ecg"\]\.ecg-capture-active\s*>\s*#ui-mobile-navigation/);
  assert.match(css, /\.ecg-panel,\.ecg-card,\.ecg-viewport-container,\.ecg-guided-camera-page,\.ecg-normal-photo-page\)\[hidden\]/);
  assert.match(css,/object-fit:\s*contain\s*!important/);
  assert.match(css,/@media \(orientation: landscape\)/);
  assert.match(css,/@media \(orientation: portrait\)/);
});
