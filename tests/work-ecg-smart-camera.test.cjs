const { test } = require("node:test");
const assert = require("node:assert/strict");
const path = require("node:path");
const fs = require("node:fs");
const vm = require("node:vm");

const root = path.join(__dirname, "..");
const source = file => fs.readFileSync(path.join(root, file), "utf8");

function createMockEnvironment() {
  const elements = new Map();

  const getElementById = id => {
    if (!elements.has(id)) {
      const el = {
        id,
        hidden: false,
        value: "",
        textContent: "",
        style: {},
        attributes: {},
        listeners: {},
        children: [],
        setAttribute(k, v) { this.attributes[k] = String(v); },
        getAttribute(k) { return this.attributes[k] || null; },
        addEventListener(type, fn) { (this.listeners[type] = this.listeners[type] || []).push(fn); },
        querySelector(selector) {
          if (selector.startsWith(".")) {
            const cls = selector.slice(1);
            return this.children.find(c => c.className && c.className.includes(cls)) || null;
          }
          return null;
        },
        querySelectorAll() { return []; },
        appendChild(child) { this.children.push(child); return child; },
        replaceChildren() { this.children = []; },
        scrollIntoView() {},
        offsetWidth: 100
      };
      elements.set(id, el);
    }
    return elements.get(id);
  };

  const context = {
    console,
    Date,
    Math,
    Float32Array,
    Uint8Array,
    Uint8ClampedArray,
    Array,
    Number,
    String,
    document: {
      getElementById,
      createElement(tag) {
        return {
          tagName: tag,
          className: "",
          hidden: false,
          textContent: "",
          style: {},
          attributes: {},
          listeners: {},
          children: [],
          setAttribute(k, v) { this.attributes[k] = String(v); },
          getAttribute(k) { return this.attributes[k] || null; },
          addEventListener(type, fn) { (this.listeners[type] = this.listeners[type] || []).push(fn); },
          querySelector() { return null; },
          appendChild(c) { this.children.push(c); return c; },
          getContext() {
            return {
              drawImage() {},
              getImageData: () => ({
                width: 100,
                height: 100,
                data: new Uint8ClampedArray(100 * 100 * 4).fill(128)
              }),
              fillRect() {},
              beginPath() {},
              moveTo() {},
              lineTo() {},
              stroke() {},
              fillText() {}
            };
          },
          toDataURL: () => "data:image/jpeg;base64,mockphoto"
        };
      },
      body: {
        appendChild() {}
      }
    },
    setTimeout,
    clearTimeout
  };

  context.window = context;
  context.globalThis = context;
  context.addEventListener = (type, fn) => {};
  context.removeEventListener = (type, fn) => {};
  context.window.matchMedia = query => ({
    matches: query.includes("portrait"),
    addEventListener() {},
    removeEventListener() {}
  });
  context.window.requestAnimationFrame = fn => setTimeout(fn, 10);
  context.window.cancelAnimationFrame = id => clearTimeout(id);

  vm.createContext(context);
  return { context, elements };
}

test("1. Ausência estrita de síntese de voz, áudio e de geradores de ondas artificiais no código", () => {
  const cameraSrc = source("assets/js/ecg-smart-camera.js");
  const uiSrc = source("assets/js/ecg-smart-ui.js");
  const engineSrc = source("assets/js/ecg-cv-engine.js");
  const extractorSrc = source("assets/js/ecg-signal-extractor.js");

  // Nenhuma ocorrência de APIs de voz/fala
  assert.equal(/speechSynthesis/i.test(cameraSrc), false);
  assert.equal(/SpeechSynthesisUtterance/i.test(cameraSrc), false);
  assert.equal(/AudioContext/i.test(cameraSrc), false);
  assert.equal(/speechSynthesis/i.test(uiSrc), false);
  assert.equal(/speechSynthesis/i.test(engineSrc), false);

  // Proibição de funções de ondas sintéticas artificiais
  assert.equal(/synthesizeValidatedWaveform/i.test(cameraSrc), false);
  assert.equal(/generateLeadSignal/i.test(uiSrc), false);
  assert.equal(/synthesizeValidatedWaveform/i.test(extractorSrc), false);
});

test("2. Reutilização fiel e universal da animação de rotação (LuriaRotateController)", () => {
  const rotateCtrlCode = source("assets/js/luria-rotate-controller.js");
  const { context } = createMockEnvironment();

  vm.runInNewContext(rotateCtrlCode, context);
  assert.ok(context.LuriaRotateController, "LuriaRotateController deve estar disponível");

  const ctrl = context.LuriaRotateController.create({
    brandText: "LURIA · TEST",
    headingText: "Gire o celular",
    shouldActivate: () => true
  });

  ctrl.start();
  assert.equal(ctrl.isVisible(), true, "Em modo portrait deve exibir o modal de girar celular");

  // Se simulado landscape, deve ocultar
  context.window.matchMedia = query => ({
    matches: false,
    addEventListener() {},
    removeEventListener() {}
  });
  ctrl.update();
  assert.equal(ctrl.isVisible(), false);
  ctrl.stop();
});

test("3. Extrator Real (LuriaEcgSignalExtractor): Rejeição de folha em branco e listras sem sinal", () => {
  const extractorSrc = source("assets/js/ecg-signal-extractor.js");
  const { context } = createMockEnvironment();
  vm.runInNewContext(extractorSrc, context);

  const { extractRealSignalFromImageData } = context.LuriaEcgSignalExtractor;

  // CASO A: Papel 100% em branco (sem traçado) -> DEVE REJEITAR!
  const blankWidth = 100, blankHeight = 60;
  const blankData = new Uint8ClampedArray(blankWidth * blankHeight * 4).fill(250); // Branco puro
  const blankResult = extractRealSignalFromImageData({ width: blankWidth, height: blankHeight, data: blankData });

  assert.equal(blankResult.isValid, false, "Papel em branco deve ser categoricamente REJEITADO!");
  assert.equal(blankResult.signal, null, "Papel em branco não pode gerar sinal fictício");

  // CASO B: Imagem com ECG real (fundo claro com traçado de tinta escura e complexo QRS)
  const ecgWidth = 120, ecgHeight = 60;
  const ecgData = new Uint8ClampedArray(ecgWidth * ecgHeight * 4).fill(240); // Fundo papel

  // Desenha um traçado escuro contínuo com uma deflexão (onda R)
  for (let x = 0; x < ecgWidth; x++) {
    let y = 30; // Linha de base no meio
    if (x >= 45 && x <= 55) {
      y = 12; // Pico QRS (para cima)
    } else if (x > 55 && x <= 65) {
      y = 42; // Onda S (para baixo)
    }
    const idx = (y * ecgWidth + x) * 4;
    ecgData[idx] = 20;     // Tinta escura R
    ecgData[idx + 1] = 20; // G
    ecgData[idx + 2] = 20; // B
  }

  const realResult = extractRealSignalFromImageData({ width: ecgWidth, height: ecgHeight, data: ecgData });
  assert.equal(realResult.isValid, true, "ECG com traçado escuro contínuo deve ser extraído com sucesso");
  assert.ok(Array.isArray(realResult.signal), "Deve retornar array de pontos reais");
  assert.equal(realResult.signal.length, ecgWidth);
  assert.ok(realResult.peakToPeakMv > 0.1, "Deve detectar variação de voltagem compatível com QRS");
});

test("4. Não marcar 12 derivações automaticamente se a imagem for em branco", () => {
  const extractorSrc = source("assets/js/ecg-signal-extractor.js");
  const engineSrc = source("assets/js/ecg-cv-engine.js");
  const cameraSrc = source("assets/js/ecg-smart-camera.js");
  const { context } = createMockEnvironment();

  vm.runInNewContext(extractorSrc, context);
  vm.runInNewContext(engineSrc, context);
  vm.runInNewContext(cameraSrc, context);

  const controller = context.LuriaSmartCamera.createController({});
  const leads = controller.getCapturedLeads();

  // Inicialmente todas pendentes
  assert.equal(leads.filter(l => l.captured).length, 0);

  // Se o extrator tentar validar imagem vazia / em branco, NENHUMA derivação pode ser marcada como capturada!
  leads.forEach(l => {
    const blankTest = context.LuriaEcgSignalExtractor.extractRealSignalFromImageData({
      width: 80, height: 40,
      data: new Uint8ClampedArray(80 * 40 * 4).fill(245)
    });
    l.captured = blankTest.isValid;
  });

  const capturedCount = leads.filter(l => l.captured).length;
  assert.equal(capturedCount, 0, "Imagem em branco NÃO pode resultar em derivações capturadas!");

  // Bloqueio categórico da Etapa 3
  const gateCheck = controller.confirmExtractionAndEnableAI();
  assert.equal(gateCheck.allowed, false, "Etapa 3 de IA deve ser categoricamente bloqueada");
});
