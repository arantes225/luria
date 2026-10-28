const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const { JSDOM } = require("jsdom");
const root = path.join(__dirname, "..");
const html = fs.readFileSync(path.join(root, "trabalho/ecg/index.html"), "utf8");
const photoCode = fs.readFileSync(path.join(root, "assets/js/ecg-normal-photo.js"), "utf8");

function setup() {
  const dom = new JSDOM(html, { url: "https://www.resibulando.online/trabalho/ecg/", runScripts: "outside-only" });
  const { window } = dom;
  const { document } = window;
  let opened = 0, revoked = 0;
  window.URL.createObjectURL = () => "blob:local-ecg-test";
  window.URL.revokeObjectURL = () => { revoked++; };
  const fileInput = document.getElementById("ecg-normal-photo-input");
  fileInput.click = () => { opened++; };
  const preview = document.getElementById("ecg-normal-photo-preview");
  Object.defineProperty(preview, "naturalWidth", { configurable: true, value: 4032 });
  Object.defineProperty(preview, "naturalHeight", { configurable: true, value: 3024 });
  const originalSrc = preview.getAttribute.bind(preview);
  Object.defineProperty(preview, "src", {
    configurable: true,
    get() { return originalSrc("src") || ""; },
    set(value) { preview.setAttribute("src", value); queueMicrotask(() => preview.onload?.()); }
  });
  window.eval(photoCode);
  return { window, dom, document, fileInput, preview, get opened() { return opened; }, get revoked() { return revoked; } };
}

test("ordinary photo is a distinct camera choice and does not replace the guided scanner", () => {
  const e = setup();
  assert.ok(e.document.getElementById("ecg-btn-start-fast"));
  assert.ok(e.document.getElementById("ecg-btn-start-ultra"));
  assert.ok(e.document.getElementById("ecg-btn-normal-photo"));
  e.document.getElementById("ecg-btn-normal-photo").click();
  assert.equal(e.opened, 1, "launches native high-resolution still camera input");
  assert.equal(e.fileInput.getAttribute("capture"), "environment");
  assert.equal(e.document.getElementById("ecg-normal-photo-page").hidden, true, "no scanner overlay before image selection");
  e.dom.window.close();
});

test("photo remains local, user previews original and explicitly processes via the shared engine", async () => {
  const e = setup();
  const file = new e.window.File([new Uint8Array(2000)], "ecg.jpg", { type: "image/jpeg" });
  Object.defineProperty(e.fileInput, "files", { value: [file], configurable: true });
  const calls = [];
  e.window.LuriaEcgProcessPhoto = async (received, mode) => {
    calls.push([received, mode]);
    return { ok: true, capturedCount: 5 };
  };
  e.fileInput.dispatchEvent(new e.window.Event("change", { bubbles: true }));
  await new Promise(resolve => setImmediate(resolve));
  const page = e.document.getElementById("ecg-normal-photo-page");
  assert.equal(page.hidden, false);
  assert.equal(page.parentElement, e.document.body); // no sidebar content
  assert.match(e.document.getElementById("ecg-normal-photo-details").textContent, /4032 × 3024 px/);
  assert.equal(e.preview.hidden, false);
  assert.equal(calls.length, 0, "no extraction until user confirms");
  e.document.getElementById("ecg-normal-photo-process").click();
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(calls.length, 1);
  assert.equal(calls[0][0], file);
  assert.equal(calls[0][1], "normal_photo");
  assert.equal(page.hidden, true);
  assert.ok(e.revoked > 0, "object URL released after confirmation");
  e.dom.window.close();
});

test("invalid picture is not handed to the digitizer and can be replaced", () => {
  const e = setup();
  let calls = 0;
  e.window.LuriaEcgProcessPhoto = () => { calls++; };
  const invalid = new e.window.File(["hello"], "text.txt", { type: "text/plain" });
  Object.defineProperty(e.fileInput, "files", { value: [invalid], configurable: true });
  e.fileInput.dispatchEvent(new e.window.Event("change"));
  assert.equal(calls, 0);
  assert.match(e.document.getElementById("ecg-normal-photo-error").textContent, /imagem válida/);
  e.dom.window.close();
});

test("the controller can reset the photo test without borrowing prior lead states", () => {
  const code = fs.readFileSync(path.join(root, "assets/js/ecg-smart-camera.js"), "utf8");
  const ctx = { window: {}, Date, console };
  vm.runInNewContext(code, ctx);
  const controller = ctx.window.LuriaSmartCamera.createController();
  assert.equal(controller.getCapturedLeads().length, 12);
  assert.equal(typeof controller.resetCaptureSession, "function");
  controller.setMode("photo");
  controller.resetCaptureSession();
  assert.equal(controller.getCapturedLeads().filter(l => l.captured).length, 0);
  assert.equal(controller.getSessionCalibration().calibrationSource, "unknown");
});

test("source keeps the photo unfiltered and camera takes a real picture", () => {
  const main = fs.readFileSync(path.join(root, "assets/js/ecg-smart-ui.js"), "utf8");
  assert.match(main, /window\.LuriaEcgProcessPhoto\s*=\s*processPhotoFile/);
  assert.match(main, /source === "normal_photo" \? "photo" : "fast"/);
  assert.match(main, /cameraController\.resetCaptureSession/);
  assert.doesNotMatch(photoCode, /fetch\(|supabaseClient|localStorage|sessionStorage|enhanceImage|filterImage/);
  assert.match(photoCode, /sourceFile, "normal_photo"/);
});
