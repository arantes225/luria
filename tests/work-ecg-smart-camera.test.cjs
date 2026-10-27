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

test("1. Ausência estrita de síntese de voz ou áudio", () => {
  const cameraSrc = source("assets/js/ecg-smart-camera.js");
  const uiSrc = source("assets/js/ecg-smart-ui.js");
  const engineSrc = source("assets/js/ecg-cv-engine.js");

  // Nenhuma ocorrência de APIs de voz/fala
  assert.equal(/speechSynthesis/i.test(cameraSrc), false);
  assert.equal(/SpeechSynthesisUtterance/i.test(cameraSrc), false);
  assert.equal(/AudioContext/i.test(cameraSrc), false);
  assert.equal(/playAudio/i.test(cameraSrc), false);
  assert.equal(/speechSynthesis/i.test(uiSrc), false);
  assert.equal(/AudioContext/i.test(uiSrc), false);
  assert.equal(/speechSynthesis/i.test(engineSrc), false);
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
    matches: false, // landscape
    addEventListener() {},
    removeEventListener() {}
  });
  ctrl.update();
  // Quando em landscape, isVisible() deve retornar false
  assert.equal(ctrl.isVisible(), false);
  ctrl.stop();
});

test("3. Visão Computacional (CV Engine) - Métricas Determinísticas sem números arbitrários", () => {
  const engineSrc = source("assets/js/ecg-cv-engine.js");
  const { context } = createMockEnvironment();
  vm.runInNewContext(engineSrc, context);

  assert.ok(context.LuriaEcgCvEngine, "Engine de CV deve estar registrada");
  const { analyzeFrameQuality, detectECGBoundaries } = context.LuriaEcgCvEngine;

  // Frame de teste simulando ECG com contraste e nitidez
  const width = 200, height = 150;
  const data = new Uint8ClampedArray(width * height * 4);
  for (let i = 0; i < data.length; i += 4) {
    // Fundo branco com linhas escuras alternadas
    const pixelIndex = i / 4;
    const x = pixelIndex % width;
    const isLine = (x % 10 === 0);
    const val = isLine ? 20 : 220;
    data[i] = val;
    data[i + 1] = val;
    data[i + 2] = val;
    data[i + 3] = 255;
  }

  const quality = analyzeFrameQuality({ width, height, data });
  assert.equal(typeof quality.sharpnessScore, "number");
  assert.equal(typeof quality.isSharp, "boolean");
  assert.equal(typeof quality.isLightingGood, "boolean");
  assert.equal(typeof quality.hasSufficientContrast, "boolean");
  assert.ok(quality.sharpnessScore > 50, "Deve calcular variância laplaciana real sobre as linhas");

  const detection = detectECGBoundaries({ width, height, data });
  assert.equal(detection.detected, true, "Deve reconhecer ECG na imagem nítida com linhas");
  assert.ok(detection.boundaries.widthRatio > 0.8, "Área do exame deve cobrir a maior parte da imagem");
});

test("4. Fluxo em 3 Etapas e Portão de Segurança da IA (Etapa 1 -> Etapa 2 -> Etapa 3)", () => {
  const engineSrc = source("assets/js/ecg-cv-engine.js");
  const cameraSrc = source("assets/js/ecg-smart-camera.js");
  const { context } = createMockEnvironment();

  vm.runInNewContext(engineSrc, context);
  vm.runInNewContext(cameraSrc, context);

  let currentStage = 1;
  const controller = context.LuriaSmartCamera.createController({
    onStageChange: s => { currentStage = s; }
  });

  assert.equal(controller.getCurrentStage(), 1, "Deve iniciar na Etapa 1 (Captura)");

  // Tentar avançar para Etapa 3 sem todas as derivações deve ser REJEITADO
  const gateBefore = controller.confirmExtractionAndEnableAI();
  assert.equal(gateBefore.allowed, false, "Não deve permitir revisão pela IA se faltarem derivações");
  assert.match(gateBefore.reason, /faltarem derivações/);
  assert.equal(controller.getCurrentStage(), 1, "Não deve avançar para Etapa 3");

  // Simulando captura de todas as 12 derivações
  const leads = controller.getCapturedLeads();
  assert.equal(leads.length, 12);
  leads.forEach(l => {
    l.captured = true;
    l.extractedSignal = [0, 0.1, 1.2, -0.2, 0];
  });

  // Agora todas estão capturadas -> liberar portão para Etapa 3
  const gateAfter = controller.confirmExtractionAndEnableAI();
  assert.equal(gateAfter.allowed, true, "Deve permitir avanço após conferência completa");
  assert.equal(controller.getCurrentStage(), 3, "Etapa deve ser 3 (IA)");
});
