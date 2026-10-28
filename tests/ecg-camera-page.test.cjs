"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { JSDOM } = require("jsdom");

const root = path.resolve(__dirname, "..");
const html = fs.readFileSync(path.join(root, "trabalho/ecg/index.html"), "utf8");
const ui = fs.readFileSync(path.join(root, "assets/js/ecg-smart-ui.js"), "utf8");
const camera = fs.readFileSync(path.join(root, "assets/js/ecg-smart-camera.js"), "utf8");

test("current scanner exposes working entry, close and manual-capture controls", () => {
  const dom = new JSDOM(html);
  const document = dom.window.document;
  for (const id of ["ecg-btn-normal-photo", "ecg-btn-start-fast", "ecg-btn-start-ultra",
    "ecg-guided-camera-page", "ecg-guided-close", "ecg-guided-capture", "ecg-video"]) {
    assert.ok(document.getElementById(id), `missing current ECG control #${id}`);
  }
  assert.match(ui, /btnStartFast\?\.addEventListener\("click"/);
  assert.match(ui, /btnStartUltra\?\.addEventListener\("click"/);
  assert.match(ui, /guidedClose\?\.addEventListener\("click"/);
  assert.match(ui, /guidedCapture\?\.addEventListener\("click"/);
  dom.window.close();
});

test("manual and automatic paths share native-resolution extraction without bypassing review", () => {
  assert.match(camera, /function captureCurrentFrame\(\)/);
  assert.match(camera, /performAutonomousCapture\(mode === "fast", null, true\)/);
  assert.match(camera, /snapCanvas\.width = videoEl\?\.videoWidth/);
  assert.match(camera, /processPhotographCanvas\(snapCanvas/);
  assert.match(camera, /transitionToStage2\(\)/);
  assert.match(camera, /options\.source === "autonomous_camera" && !isVerifiedEcgScene/);
});
