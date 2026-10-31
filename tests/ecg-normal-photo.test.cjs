const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const { JSDOM } = require("jsdom");
const root = path.join(__dirname, "..");
const html = fs.readFileSync(path.join(root, "trabalho/ecg/index.html"), "utf8");
const photoCode = fs.readFileSync(path.join(root, "assets/js/ecg-normal-photo.js"), "utf8");
const perspectiveCode = fs.readFileSync(path.join(root, "assets/js/ecg-photo-perspective.js"), "utf8");

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
  window.eval(perspectiveCode);
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
  e.window.TraubeEcgProcessPhoto = async (received, mode, options) => {
    calls.push([received, mode, options]);
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
  e.document.getElementById("ecg-photo-layout").value = "3x1";
  e.document.getElementById("ecg-normal-photo-process").click();
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(calls.length, 1);
  assert.equal(calls[0][0], file);
  assert.equal(calls[0][1], "normal_photo");
  assert.equal(calls[0][2]?.corners?.length, 4);
  assert.equal(calls[0][2]?.paperSelection, "manual_four_corners");
  assert.equal(calls[0][2]?.layoutHint, "3x1", "a correção de formato chega ao extrator");
  assert.equal(page.hidden, true);
  assert.ok(e.revoked > 0, "object URL released after confirmation");
  e.dom.window.close();
});

test("invalid picture is not handed to the digitizer and can be replaced", () => {
  const e = setup();
  let calls = 0;
  e.window.TraubeEcgProcessPhoto = () => { calls++; };
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
  const controller = ctx.window.TraubeSmartCamera.createController();
  assert.equal(controller.getCapturedLeads().length, 12);
  assert.equal(typeof controller.resetCaptureSession, "function");
  controller.setMode("photo");
  controller.resetCaptureSession();
  assert.equal(controller.getCapturedLeads().filter(l => l.captured).length, 0);
  assert.equal(controller.getSessionCalibration().calibrationSource, "unknown");
});

test("source keeps the photo unfiltered and camera takes a real picture", () => {
  const main = fs.readFileSync(path.join(root, "assets/js/ecg-smart-ui.js"), "utf8");
  assert.match(main, /window\.TraubeEcgProcessPhoto\s*=\s*processPhotoFile/);
  assert.match(main, /source === "normal_photo" \? "photo" : "fast"/);
  assert.match(main, /cameraController\.resetCaptureSession/);
  assert.doesNotMatch(photoCode, /fetch\(|supabaseClient|localStorage|sessionStorage|enhanceImage|filterImage/);
  assert.match(photoCode, /sourceFile, "normal_photo"/);
  assert.match(photoCode, /validateCorners/);
  assert.match(main, /manualPaperCornersApplied: manualSelection/);
});


test("four points can be dragged and can be adjusted by keyboard", async () => {
  const e = setup();
  const file = new e.window.File([new Uint8Array(2000)], "ecg.jpg", { type: "image/jpeg" });
  Object.defineProperty(e.fileInput, "files", { value: [file], configurable: true });
  e.fileInput.dispatchEvent(new e.window.Event("change", { bubbles: true }));
  await new Promise(resolve => setImmediate(resolve));
  const frame = e.document.getElementById("ecg-normal-photo-frame");
  assert.equal(frame.hidden, false);
  const corner = e.document.querySelector('[data-ecg-corner="0"]');
  assert.equal(corner.style.left, "3%");
  frame.getBoundingClientRect = () => ({ left: 10, top: 20, width: 300, height: 220 });
  const down = new e.window.Event("pointerdown", { bubbles: true, cancelable: true });
  Object.assign(down, { pointerId: 1, clientX: 40, clientY: 51 });
  corner.dispatchEvent(down);
  const move = new e.window.Event("pointermove", { bubbles: true });
  Object.assign(move, { pointerId: 1, clientX: 58, clientY: 70 });
  corner.dispatchEvent(move);
  assert.equal(corner.style.left, "16%");
  const key = new e.window.KeyboardEvent("keydown", { bubbles: true, key: "ArrowRight" });
  corner.dispatchEvent(key);
  assert.ok(parseFloat(corner.style.left) > 16);
  assert.match(e.document.getElementById("ecg-normal-photo-outline").getAttribute("points"), /,/);
  e.dom.window.close();
});

test("user can compare full photo without using selected paper corners", async () => {
  const e = setup();
  const file = new e.window.File([new Uint8Array(3000)], "ecg.jpg", { type: "image/jpeg" });
  Object.defineProperty(e.fileInput, "files", { value: [file], configurable: true });
  e.fileInput.dispatchEvent(new e.window.Event("change"));
  await new Promise(resolve => setImmediate(resolve));
  const radio = e.document.querySelector('input[name="ecg-photo-selection"][value="whole"]');
  radio.checked = true;
  radio.dispatchEvent(new e.window.Event("change"));
  assert.equal(e.document.getElementById("ecg-normal-photo-frame").classList.contains("is-whole-photo"), true);
  const captured = [];
  e.window.TraubeEcgProcessPhoto = async (f, mode, opts) => {
    captured.push(opts);
    return { ok: true };
  };
  e.document.getElementById("ecg-normal-photo-process").click();
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(captured.length, 1);
  assert.equal(captured[0].corners, null);
  assert.equal(captured[0].paperSelection, "full_photo");
  e.dom.window.close();
});


test("rotating a full ECG photo updates visual orientation AND passes identical 90° to extraction", async () => {
  const e = setup();
  const file = new e.window.File([new Uint8Array(400)], "ecg.jpeg", {type:"image/jpeg"});
  Object.defineProperty(e.fileInput, "files", {value:[file],configurable:true});
  e.fileInput.dispatchEvent(new e.window.Event("change"));
  await new Promise(resolve => setImmediate(resolve));
  const whole = e.document.querySelector('input[name="ecg-photo-selection"][value="whole"]');
  whole.checked = true; whole.dispatchEvent(new e.window.Event("change"));
  e.document.getElementById("ecg-normal-photo-rotate-right").click();
  assert.match(e.preview.style.transform,/rotate\(90deg\)/);
  const frame=e.document.getElementById("ecg-normal-photo-frame");
  assert.ok(parseInt(frame.style.height,10) > parseInt(frame.style.width,10),
    "4032×3024 original photo is portrait after a quarter-turn");
  let opts;
  e.window.TraubeEcgProcessPhoto = async (_file,_mode,options) => {opts=options;return {ok:true}};
  e.document.getElementById("ecg-normal-photo-process").click();
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(opts.rotationDeg,90);
  assert.equal(opts.paperSelection,"full_photo");
  assert.equal(opts.corners,null);
  e.dom.window.close();
});

test("rotation resets previous corner positions, preserving the paper-frame alignment", async () => {
  const e=setup();
  const file=new e.window.File([new Uint8Array(400)],"ecg.jpeg",{type:"image/jpeg"});
  Object.defineProperty(e.fileInput,"files",{value:[file],configurable:true});
  e.fileInput.dispatchEvent(new e.window.Event("change"));
  await new Promise(resolve=>setImmediate(resolve));
  const corner=e.document.querySelector('[data-ecg-corner="0"]');
  corner.dispatchEvent(new e.window.KeyboardEvent("keydown",{key:"ArrowRight",bubbles:true}));
  assert.notEqual(corner.style.left,"3%");
  e.document.getElementById("ecg-normal-photo-rotate-left").click();
  assert.equal(corner.style.left,"3%");
  assert.match(e.preview.style.transform,/rotate\(270deg\)/);
  let options;
  e.window.TraubeEcgProcessPhoto=async(_file,_mode,opts)=>{options=opts;return{ok:true}};
  e.document.getElementById("ecg-normal-photo-process").click();
  await new Promise(resolve=>setImmediate(resolve));
  assert.equal(options.rotationDeg,270);
  assert.equal(options.corners.length,4);
  e.dom.window.close();
});
