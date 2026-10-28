"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const path = require("node:path");
const fs = require("node:fs");
const vm = require("node:vm");

const mainFile = fs.readFileSync(path.join(__dirname, "../assets/js/ecg-smart-camera.js"), "utf8");
const cvFile = fs.readFileSync(path.join(__dirname, "../assets/js/ecg-cv-engine.js"), "utf8");
const extractor = require("../assets/js/ecg-signal-extractor.js");

function identityGuard() {
  const app = { LuriaEcgContracts: require("../assets/js/ecg-contracts.js") };
  vm.runInNewContext(mainFile, { window: app, Date, console });
  return app.LuriaEcgSceneGuard.isSafeAutomaticLeadAssignment;
}
function identity(lead="aVR", expected=lead, confidence=.98) {
  return {status:"ocr_confirmed",recognizedLead:lead,expectedLead:expected,
    method:"glyph_template_ocr",ocrConfidence:confidence,verified:true,verifiedAutomatically:true,anomalies:[]};
}
test("never assigns aVR to an aVF/III crop or geometric-only hypothesis", () => {
  const guard=identityGuard();
  const box={expectedInTemplate:"aVR"};
  assert.equal(guard("aVR",identity(),box),true,"high confidence matching reference allowed as provisional");
  assert.equal(guard("aVR",identity("aVF","aVR"),box),false,"aVF crop cannot become aVR");
  assert.equal(guard("aVR",identity("DIII","aVR"),box),false,"III crop cannot become aVR");
  assert.equal(guard("aVR",identity("aVR","DII"),box),false,"expected DII != aVR");
  assert.equal(guard("aVR",{status:"geometric_hypothesis",expectedLead:"aVR",evidence:"positional_hypothesis"},box),false);
  assert.equal(guard("aVR",identity("aVR","aVR",.82),box),false,"bitmap OCR confidence too low");
  assert.equal(guard("aVR",identity(),{expectedInTemplate:"DII"}),false);
  assert.equal(guard("aVR",identity(),box,[{code:"non_standard_lead_arrangement"}]),false);
  assert.equal(guard("aVR",identity(),box,[{code:"duplicate_label"}]),false);
  assert.equal(guard("aVR",identity(),box,[{code:"label_conflict"}]),false);
});
test("candidate positions cannot enter the finalized lead map without an identity gate",()=>{
  assert.match(mainFile,/if \(!isSafeAutomaticLeadAssignment\(leadName, proposedIdentity, box, anomalies\)\)/);
  assert.match(mainFile,/const other = cvEngine\.recognizeLeadLabelInRegion\(roiImageData/);
  assert.match(mainFile,/other\.recognizedLead !== leadName/);
  assert.match(mainFile,/maskPrintedHeader: true/);
  assert.match(cvFile,/if \(labelMismatchCount > 0\) \{/);
});
test("printed label and calibration prefix are missing data, not traced into an artificial waveform",()=>{
  const width=200, height=50;
  const data=new Uint8ClampedArray(width*height*4);
  for(let y=0;y<height;y++)for(let x=0;x<width;x++){
    const i=(y*width+x)*4;
    const dark=(x<25 && y>8 && y<40) || (x>=25 && y===25);
    data[i]=data[i+1]=data[i+2]=dark?0:240;data[i+3]=255;
  }
  const source={width,height,data};
  const original=extractor.preprocessLeadRegion(source);
  const masked=extractor.preprocessLeadRegion(source,{maskPrintedHeader:true});
  const at=(x,y)=>y*width+x;
  assert.ok(original.inkStrength[at(12,20)]>0,"label ink exists in original");
  assert.equal(masked.inkStrength[at(12,20)],0,"label excluded");
  assert.equal(masked.inkStrength[at(5,25)],0,"calibration excluded");
  assert.ok(masked.inkStrength[at(90,25)]>0,"wave region left untouched");
  assert.equal(source.data[at(12,20)*4],0,"source picture unchanged");
});
test("unverified identities cannot authorize absolute clinical measurement",()=>{
  const val={
    isValid:true,signal:[0,0.1,0.2,0],continuity:.98,calibration:{calibrationSource:"measured"},
    leadIdentity:{lead:"aVR",expectedLead:"aVR",method:"topology_hypothesis",evidence:"positional_hypothesis"},
    trackingStats:{overlapRatio:0,hasMultipleCurves:false},
    pixelCorrespondence:{meanInkScore:.92}
  };
  const result=extractor.auditExtractedLead(val);
  assert.equal(result.status,"Indeterminada");
  assert.equal(result.allowsClinicalMeasurement,false);
  assert.equal(result.allowsAiModelInput,false);
});
