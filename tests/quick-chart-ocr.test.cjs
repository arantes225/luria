const {test} = require("node:test");
const assert = require("node:assert/strict");
const vm = require("node:vm");
const {source} = require("./fixtures/app-client.cjs");

const flush = () => new Promise(resolve => setImmediate(resolve));

function fixture() {
  const nodes = new Map();
  const events = {};
  let saved = 0, recognized = 0, loaded = 0, lastCanvas;
  const node = id => {
    if (!nodes.has(id)) {
      const callbacks = {};
      const element = {
        value: "", hidden: false, disabled: false, files: null,
        addEventListener(name, callback) { callbacks[name] = callback; },
        click() {
          if (id === "quick-chart-save-note") saved++;
          return callbacks.click?.();
        },
        change() {return callbacks.change?.();},
        focus() {}, setSelectionRange() {}, scrollIntoView() {},
        dispatchEvent(event) { this.lastInput = event.type; }
      };
      nodes.set(id, element);
    }
    return nodes.get(id);
  };
  const canvas = () => ({
    width:0,height:0,
    getContext: () => ({
      fillRect() {}, drawImage() {},
      set fillStyle(value) {}, set imageSmoothingEnabled(value) {}, set imageSmoothingQuality(value) {}
    })
  });
  const context = {
    document: { getElementById: node, createElement: kind => {
      assert.equal(kind,"canvas");return canvas();
    }},
    window: {
      addEventListener(type, fn) { events[type] = fn; },
      TraubeLazyVendors: { async ensure(name) {assert.equal(name,"tesseract");loaded++;} },
      Tesseract: { async createWorker(language, mode, config) {
        assert.equal(language,"por+eng");
        assert.equal(mode,1);
        assert.equal(typeof config.logger,"function");
        return {async recognize(target) {
          recognized++;
          lastCanvas = target;
          return {data:{text:"Hemoglobina: 13,4 g/dL\nSódio: 140 mmol/L"}};
        },async terminate(){}};
      }}
    },
    navigator: {clipboard:{async readText(){return "Texto colado";}}},
    Event: class Event {constructor(type){this.type=type;}},
    createImageBitmap: async () => ({width:3000,height:2000,close(){}}),
    URL, Image: class {},
    Promise, Number, String, Math
  };
  vm.runInNewContext(source("assets/js/quick-chart-ocr.js"), context);
  return {node,events,counts:()=>({saved,recognized,loaded,lastCanvas})};
}

test("Cola Rápida faz OCR local, mostra prévia e só salva após confirmação", async () => {
  const f=fixture();
  const note=f.node("quick-chart-note");
  note.value="ANOTAÇÃO ANTERIOR";
  f.node("quick-chart-gallery-input").files=[{type:"image/jpeg",size:1500}];
  f.node("quick-chart-gallery-input").change();
  for(let i=0;i<5;i++)await flush();
  assert.equal(f.counts().recognized,1);
  assert.equal(f.counts().lastCanvas.width,1900);
  assert.equal(f.node("quick-chart-ocr-preview").hidden,false);
  assert.match(f.node("quick-chart-ocr-text").value,/Hemoglobina/);
  assert.equal(note.value,"ANOTAÇÃO ANTERIOR");
  assert.equal(f.counts().saved,0);
  f.node("quick-chart-ocr-insert").click();
  assert.match(note.value,/ANOTAÇÃO ANTERIOR[\s\S]+Sódio: 140 mmol\/L/);
  assert.equal(f.counts().saved,0);
  assert.equal(note.lastInput,"input");
});

test("Enviar ao computador usa o salvamento autenticado existente", async () => {
  const f=fixture();
  const output=f.node("quick-chart-ocr-text");
  output.value="Resultado revisado";
  f.node("quick-chart-ocr-send").click();
  assert.equal(f.node("quick-chart-note").value,"Resultado revisado");
  assert.equal(f.counts().saved,1);
});

test("Troca de conta apaga prévia e interrompe OCR", async () => {
  const f=fixture();
  f.node("quick-chart-ocr-text").value="DADO PRIVADO";
  f.node("quick-chart-ocr-preview").hidden=false;
  f.events["luria:owner-changed"]();
  assert.equal(f.node("quick-chart-ocr-text").value,"");
  assert.equal(f.node("quick-chart-ocr-preview").hidden,true);
});

test("Arquivos muito grandes não são processados nem enviados", async () => {
  const f=fixture();
  f.node("quick-chart-camera-input").files=[{type:"image/jpeg",size:13*1024*1024}];
  f.node("quick-chart-camera-input").change();
  await flush();
  assert.equal(f.counts().recognized,0);
  assert.equal(f.counts().loaded,0);
  assert.match(f.node("quick-chart-ocr-progress-text").textContent,/12 MB/);
});
