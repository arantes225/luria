"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const path = require("node:path");
const controllerCode = fs.readFileSync(path.join(__dirname,"../assets/js/ecg-smart-camera.js"),"utf8");
const contracts = require("../assets/js/ecg-contracts.js");

function makeCanvas(w=480,h=240) {
  return {
    width:w,height:h,
    toDataURL:()=>"data:image/jpeg;base64,AQ==",
    getContext(){
      return {
        drawImage(){},
        getImageData(x,y,width,height){
          return {width,height,data:new Uint8ClampedArray(width*height*4)};
        },
        createImageData(width,height){return {width,height,data:new Uint8ClampedArray(width*height*4)};},
        putImageData(){}
      };
    }
  };
}
function scene(opts={}) {
  const evidence={
    detected:false,
    reason:"OCR de labels conflitantes. Associação automática recusada.",
    sheet: {found:true,isCutOff:false,hasSeverePerspective:false},
    calibration:{gridDetected:true,calibrationSource:"assumed",coloredGridRatio:.03},
    orientation:{skewAngleDeg:0,isRotated90:false},
    waveformCandidateCount:3,
    candidateRegions:{
      DI:{xMin:.03,xMax:.3,yMin:.13,yMax:.39,row:0,col:0,expectedInTemplate:"DI"},
      DII:{xMin:.35,xMax:.62,yMin:.13,yMax:.39,row:0,col:1,expectedInTemplate:"DII"},
      aVR:{xMin:.67,xMax:.94,yMin:.13,yMax:.39,row:0,col:2,expectedInTemplate:"aVR",observedLabel:"aVF"}
    },
    leads:{},leadIdentities:{},
    anomalies:[{code:"non_standard_lead_arrangement"}]
  };
  Object.assign(evidence,opts);
  const cv={
    detectECGBoundaries:()=>evidence,
    recognizeLeadLabelInRegion:()=>({recognized:false}),
    rectifyImagePerspective:()=>null
  };
  const extractor={
    extractRealSignalFromImageData:()=>({
      isValid:true,signal:[0,.1,.05,null],validMask:[1,1,1,0],
      audit:{status:"Indeterminada",technicalIndex:40,allowsAiModelInput:false},
      calibration:{calibrationSource:"assumed"},confidence:.8,
      recoveredDurationSeconds:null,effectiveResolutionHz:null
    }),
    auditFullExtraction:()=>({overallStatus:"Indeterminada"})
  };
  const app={LuriaEcgContracts:contracts,LuriaEcgCvEngine:{createEngine:()=>cv},LuriaEcgSignalExtractor:extractor};
  vm.runInNewContext(controllerCode,{window:app,document:{createElement:()=>makeCanvas()},Date,console,setTimeout});
  return {controller:app.LuriaSmartCamera.createController(),evidence,guard:app.LuriaEcgSceneGuard};
}
test("photo with genuine paper and waveform candidates survives label OCR rejection",()=>{
  const {controller,guard,evidence}=scene();
  assert.equal(guard.isVerifiedEcgScene(evidence),true);
  const result=controller.processPhotographCanvas(makeCanvas(),{source:"normal_photo"});
  assert.equal(result.ok,true,JSON.stringify(result));
  assert.equal(result.provisionalCount,3);
  assert.equal(result.totalCaptured,0);
  assert.equal(controller.openReview(),true);
  const data=controller.getSessionStructuredPackage();
  const previews=data.leads.filter(l=>l.status==="provisional");
  assert.equal(previews.length,3);
  assert.ok(previews.every(l=>l.leadIdentity.verified===false));
  assert.ok(previews.every(l=>l.extraction.signal.length===4));
  assert.deepEqual(Object.keys(data.signals),[],"provisional signals MUST NOT be published as named lead measurements");
  assert.equal(controller.confirmExtractionAndEnableAI().allowed,false);
});
test("keyboard, blank table and unverified paper never become provisional ECG leads",()=>{
  for (const change of [
    {sheet:{found:false}},
    {candidateRegions:{},waveformCandidateCount:0},
    {candidateRegions:{DI:{},DII:{}},waveformCandidateCount:2,calibration:{gridDetected:false,coloredGridRatio:0},recognizedLabels:{}}
  ]) {
    const {controller,guard,evidence}=scene(change);
    assert.equal(guard.isVerifiedEcgScene(evidence),false);
    const result=controller.processPhotographCanvas(makeCanvas(),{source:"normal_photo"});
    assert.equal(result.ok,false);
    assert.equal(controller.getCapturedLeads().filter(l=>l.captured).length,0);
  }
});
test("non-calibrated ordinary ECG photo can preview waveform candidates but cannot certify any lead",()=>{
  const {controller,guard,evidence}=scene({calibration:{gridDetected:false,coloredGridRatio:0}});
  assert.equal(guard.isVerifiedEcgScene(evidence),false,"live verification remains strict");
  const result=controller.processPhotographCanvas(makeCanvas(),{source:"normal_photo"});
  assert.equal(result.ok,true);
  assert.equal(result.provisionalCount,3);
  assert.equal(result.totalCaptured,0);
  assert.equal(controller.confirmExtractionAndEnableAI().allowed,false);
});
test("one real waveform region in a selected ECG photo opens a quarantined preview instead of 'no leads'",()=>{
  const {controller,guard,evidence}=scene({
    waveformCandidateCount:1,
    candidateRegions:{DI:{xMin:.03,xMax:.3,yMin:.13,yMax:.39,row:0,col:0,expectedInTemplate:"DI"}}
  });
  assert.equal(guard.isVerifiedEcgScene(evidence),false,"captura automática continua exigindo múltiplas regiões");
  const result=controller.processPhotographCanvas(makeCanvas(),{source:"normal_photo"});
  assert.equal(result.ok,true,"foto selecionada com uma região real precisa abrir conferência, não ser descartada");
  assert.equal(result.provisionalCount,1);
  assert.equal(result.totalCaptured,0);
  assert.deepEqual(Object.keys(controller.getSessionStructuredPackage().signals),[]);
  assert.equal(controller.confirmExtractionAndEnableAI().allowed,false);
});
test("manual four-point paper selection permits preliminary review without pretending verified labels",()=>{
  const {controller}=scene({sheet:{found:false},calibration:{gridDetected:false,coloredGridRatio:0}});
  const result=controller.processPhotographCanvas(makeCanvas(),{source:"normal_photo_manual_four_corners",manualPaperCornersApplied:true});
  assert.equal(result.ok,true);
  assert.equal(result.provisionalCount,3);
  assert.equal(result.totalCaptured,0);
  assert.equal(controller.confirmCandidateLead("DI").confirmed,true);
  assert.equal(controller.getCapturedLeads().find(item=>item.lead==="DI").leadIdentity.status,"manual_confirmed");
  assert.equal(controller.confirmExtractionAndEnableAI().allowed,false);
});
test("UI marks positional names as hypotheses and requires an explicit per-lead confirmation",()=>{
  const ui=fs.readFileSync(path.join(__dirname,"../assets/js/ecg-smart-ui.js"),"utf8");
  assert.match(ui,/hipótese pela posição/);
  assert.match(ui,/Confirmar como/);
  assert.match(ui,/rótulo não foi confirmado automaticamente/);
  assert.match(ui,/if \(!leadInfo\.captured && !leadInfo\.imageCropUrl\) return/);
  assert.match(ui,/Extração bloqueada — recapture esta região/);
});
