"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const source = fs.readFileSync(path.join(__dirname, "../assets/js/ecg-smart-camera.js"), "utf8");

function setup({rotated90 = false, skew = 3.5} = {}) {
  let calls = 0;
  let imageDataPut = 0;
  let rectifications = 0;
  const width = 100, height = 80;
  const base = {width, height, data:new Uint8ClampedArray(width * height * 4)};
  const ctx = {
    getImageData: () => base,
    createImageData: (w, h) => ({width:w,height:h,data:new Uint8ClampedArray(w*h*4),isNative:true}),
    putImageData: value => {
      assert.equal(value.isNative, true, "Canvas needs a native ImageData, never a plain CV return object");
      imageDataPut++;
    }
  };
  const cv = {
    detectECGBoundaries: () => {
      calls++;
      return {
        detected:false,
        orientation: {isRotated90: rotated90,skewAngleDeg:skew},
        message: "Sem derivações suficientes: verifique a fotografia.",
        leads: null
      };
    },
    rectifyImagePerspective: () => {
      rectifications++;
      return {width,height,data:new Uint8ClampedArray(width*height*4)};
    }
  };
  const fakeGlobal = {
    LuriaEcgContracts: {normalizeAnomalies: a => a || []},
    LuriaEcgSignalExtractor: {},
    LuriaEcgCvEngine: {createEngine:() => cv}
  };
  vm.runInNewContext(source, {window:fakeGlobal,Date, console});
  const controller = fakeGlobal.LuriaSmartCamera.createController();
  const canvas = {
    width,height,
    getContext:() => ctx,
    toDataURL:() => "data:image/jpeg;base64,AQ=="
  };
  return {controller, canvas, get calls(){return calls;},get puts(){return imageDataPut;},get rectifications(){return rectifications;}};
}

test("whole photograph with skew converts plain CV pixels to Canvas ImageData without throwing", () => {
  const env = setup({skew: 3.5});
  assert.doesNotThrow(() => {
    const result = env.controller.processPhotographCanvas(env.canvas, {source:"normal_photo"});
    assert.equal(result.ok,false);
    assert.match(result.reason, /Sem derivações suficientes/);
  });
  assert.equal(env.rectifications,1);
  assert.equal(env.puts,1);
  assert.equal(env.calls,2);
});

test("90-degree photograph is rejected with actionable orientation error, not a clipped rotation", () => {
  const env = setup({rotated90:true,skew:0});
  const result = env.controller.processPhotographCanvas(env.canvas,{source:"normal_photo"});
  assert.equal(result.ok,false);
  assert.match(result.reason,/verifique a fotografia/);
  assert.equal(env.rectifications,0);
  assert.equal(env.puts,0);
});

test("already manually rectified paper is not warped a second time", () => {
  const env = setup({skew:5});
  const result = env.controller.processPhotographCanvas(env.canvas,{
    source:"normal_photo_manual_four_corners", manualPaperCornersApplied:true
  });
  assert.equal(result.ok,false);
  assert.equal(env.rectifications,0);
});
