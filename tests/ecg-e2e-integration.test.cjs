/**
 * tests/ecg-e2e-integration.test.cjs
 * Teste Completo de Integração de Ponta a Ponta do Fluxo de ECG LURIA:
 * Imagem de ECG -> Reconhecimento da Folha -> Identificação das Derivações ->
 * Extração de Sinais -> Calibração Real -> Auditoria Técnica -> Conferência -> Bloqueio/Liberação da Etapa 3.
 *
 * Executa todos os 15 cenários de integração obrigatórios:
 * 1. ECG legível com layout reconhecido.
 * 2. ECG com layout diferente (6x2).
 * 3. Rótulos trocados (ex.: DI com aVR).
 * 4. Derivação ausente.
 * 5. Fotografia cortada (isCutOff).
 * 6. Reflexo intenso.
 * 7. Calibração desconhecida.
 * 8. Sinal curto de 2,5 segundos.
 * 9. Sinal com duração desconhecida.
 * 10. ECG com 12 derivações e qualidade suficiente.
 * 11. Falha do OCR (solicita confirmação manual).
 * 12. Perda de referência espacial.
 * 13. Recaptura de uma derivação.
 * 14. Tentativa de interpretar dados incompatíveis.
 * 15. Erro ou ausência do backend autoral.
 */

const { test } = require("node:test");
const assert = require("node:assert/strict");
const path = require("node:path");
const fs = require("node:fs");
const vm = require("node:vm");

const root = path.join(__dirname, "..");
const source = file => fs.readFileSync(path.join(root, file), "utf8");

function createE2eEnvironment() {
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
        width: 320,
        height: 100,
        setAttribute(k, v) { this.attributes[k] = String(v); },
        getAttribute(k) { return this.attributes[k] || null; },
        addEventListener(type, fn) { (this.listeners[type] = this.listeners[type] || []).push(fn); },
        querySelector(sel) {
          if (sel.startsWith(".")) {
            const cls = sel.slice(1);
            return this.children.find(c => c.className && c.className.includes(cls)) || null;
          }
          return null;
        },
        querySelectorAll: () => [],
        appendChild(c) { this.children.push(c); return c; },
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
    Boolean,
    parseInt,
    parseFloat,
    isNaN,
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
          width: 320,
          height: 100,
          setAttribute(k, v) { this.attributes[k] = String(v); },
          getAttribute(k) { return this.attributes[k] || null; },
          addEventListener(type, fn) { (this.listeners[type] = this.listeners[type] || []).push(fn); },
          querySelector: () => null,
          appendChild(c) { this.children.push(c); return c; },
          getContext: () => ({
            drawImage() {},
            getImageData: (x = 0, y = 0, w = 100, h = 100) => ({
              width: w,
              height: h,
              data: new Uint8ClampedArray(w * h * 4).fill(245)
            }),
            putImageData() {},
            fillRect() {},
            clearRect() {},
            beginPath() {},
            moveTo() {},
            lineTo() {},
            stroke() {},
            fillText() {},
            save() {},
            restore() {},
            scale() {},
            translate() {}
          }),
          toDataURL: () => "data:image/jpeg;base64,mockphoto"
        };
      },
      querySelectorAll: () => []
    },
    setTimeout,
    clearTimeout
  };

  context.window = context;
  context.globalThis = context;

  const extractorSrc = source("assets/js/ecg-signal-extractor.js");
  const engineSrc = source("assets/js/ecg-cv-engine.js");
  const cameraSrc = source("assets/js/ecg-smart-camera.js");
  const readerSrc = source("assets/js/ecg-reader.js");

  vm.runInNewContext(source("assets/js/ecg-contracts.js"), context);
  vm.runInNewContext(extractorSrc, context);
  vm.runInNewContext(engineSrc, context);
  vm.runInNewContext(cameraSrc, context);
  vm.runInNewContext(readerSrc, context);

  return { context, elements };
}

// Helper para desenhar traçado com grade calibrada
function generateSynthesized12LeadImage(width = 800, height = 480) {
  // Fundo cinza escuro representando a mesa (luma ~35)
  const data = new Uint8ClampedArray(width * height * 4);
  for (let i = 0; i < width * height; i++) {
    data[i * 4] = 35;
    data[i * 4 + 1] = 35;
    data[i * 4 + 2] = 35;
    data[i * 4 + 3] = 255;
  }

  // Folha de ECG com margens evidentes em relação à mesa
  const paperXMin = 50;
  const paperXMax = width - 50;
  const paperYMin = 40;
  const paperYMax = height - 40;

  for (let y = paperYMin; y <= paperYMax; y++) {
    for (let x = paperXMin; x <= paperXMax; x++) {
      const idx = (y * width + x) * 4;
      data[idx] = 238;     // Fundo papel levemente off-white (evita falso glare > 248)
      data[idx + 1] = 235;
      data[idx + 2] = 230;
      data[idx + 3] = 255;
    }
  }
  const pxPerMm = 6.0;

  // Grade milimetrada (apenas na folha de papel)
  for (let y = paperYMin; y <= paperYMax; y++) {
    for (let x = paperXMin; x <= paperXMax; x++) {
      if ((x - paperXMin) % Math.round(pxPerMm) === 0 || (y - paperYMin) % Math.round(pxPerMm) === 0) {
        const idx = (y * width + x) * 4;
        data[idx] = 235;
        data[idx + 1] = 205;
        data[idx + 2] = 185;
      }
      if ((x - paperXMin) % Math.round(pxPerMm * 5) === 0 || (y - paperYMin) % Math.round(pxPerMm * 5) === 0) {
        const idx = (y * width + x) * 4;
        data[idx] = 225;
        data[idx + 1] = 160;
        data[idx + 2] = 130;
      }
    }
  }

  // Desenha 4 linhas horizontais de traçado (3 linhas com 4 derivações + 1 tira longa)
  const rowYs = [
    Math.round(paperYMin + (paperYMax - paperYMin) * 0.18),
    Math.round(paperYMin + (paperYMax - paperYMin) * 0.42),
    Math.round(paperYMin + (paperYMax - paperYMin) * 0.66),
    Math.round(paperYMin + (paperYMax - paperYMin) * 0.88)
  ];

  rowYs.forEach(baseY => {
    for (let x = paperXMin + 15; x < paperXMax - 15; x++) {
      const cyc = x % 50;
      let dy = 0;
      if (cyc === 20) dy = -16;
      else if (cyc === 22) dy = 6;
      else if (cyc >= 30 && cyc <= 38) dy = -4;

      const py = Math.min(paperYMax - 2, Math.max(paperYMin + 2, baseY + dy));
      for (let d = -1; d <= 1; d++) {
        const idx = ((py + d) * width + x) * 4;
        data[idx] = data[idx + 1] = data[idx + 2] = 18;
      }
    }
  });

  return { width, height, data };
}

// Canvas de teste que recorta pixels reais da imagem. Apenas a API do DOM é simulada.
function pixelCanvas(image = null) {
  const canvas = { width: image?.width || 1, height: image?.height || 1,
    pixels: image?.data || null, toDataURL: () => "data:image/jpeg;base64,test-only" };
  canvas.getContext = () => ({
    getImageData(x, y, w, h) {
      const data = new Uint8ClampedArray(w * h * 4);
      for (let row = 0; row < h; row++) for (let col = 0; col < w; col++) {
        const src = ((y + row) * canvas.width + x + col) * 4;
        const dst = (row * w + col) * 4;
        if (canvas.pixels) data.set(canvas.pixels.subarray(src, src + 4), dst);
      }
      return { width: w, height: h, data };
    },
    drawImage(source, sx, sy, sw, sh, dx, dy, dw, dh) {
      if (arguments.length === 3) { sx = 0; sy = 0; sw = source.width; sh = source.height; dx = 0; dy = 0; dw = sw; dh = sh; }
      canvas.pixels = new Uint8ClampedArray(canvas.width * canvas.height * 4);
      for (let row = 0; row < dh; row++) for (let col = 0; col < dw; col++) {
        const sourceX = sx + Math.floor(col * sw / dw);
        const sourceY = sy + Math.floor(row * sh / dh);
        const src = (sourceY * source.width + sourceX) * 4;
        const dst = ((dy + row) * canvas.width + dx + col) * 4;
        canvas.pixels.set(source.pixels.subarray(src, src + 4), dst);
      }
    },
    putImageData(data) { canvas.width = data.width; canvas.height = data.height; canvas.pixels = data.data; }
  });
  return canvas;
}

// -------------------------------------------------------------
// BATERIA DE CENÁRIOS DE INTEGRAÇÃO END-TO-END
// -------------------------------------------------------------

test("E2E Cenário 1: ECG legível com layout padrão e passagem do contrato de boundaries", () => {
  const { context } = createE2eEnvironment();
  const synth = generateSynthesized12LeadImage();

  // 1. O motor reconhece a imagem
  const boundaries = context.LuriaEcgCvEngine.detectECGBoundaries(synth);
  assert.equal(boundaries.detected, true, "Deve detectar a folha do ECG");

  // CONTRATO CRÍTICO A: boundaries.leads DEVE existir e ser compatível com detectedLayout.leads
  assert.ok(boundaries.leads, "boundaries.leads deve existir no retorno do contrato");
  assert.ok(boundaries.detectedLayout, "boundaries.detectedLayout deve existir");
  assert.equal(typeof boundaries.leads, "object");
  assert.ok(Object.keys(boundaries.leads).length >= 10, "Deve conter as derivações no contrato unificado");

  // CONTRATO CRÍTICO C: calibração deve estar acessível em ambos os nomes
  assert.ok(boundaries.calibration);
  assert.ok(boundaries.gridCalibration);
});

test("E2E Cenário 2: Reconhecimento de layout alternativo 6x2", () => {
  const { context } = createE2eEnvironment();
  const cvEngine = context.LuriaEcgCvEngine;
  assert.ok(cvEngine.LAYOUT_TEMPLATES["6x2_standard"], "Layout 6x2 deve estar catalogado");
  assert.equal(cvEngine.LAYOUT_TEMPLATES["6x2_standard"].rows, 6);
  assert.equal(cvEngine.LAYOUT_TEMPLATES["6x2_standard"].colsPerRow[0], 2);
});

test("E2E Cenário 3: Rótulos trocados (OCR identifica troca) e auditoria técnica", () => {
  const { context } = createE2eEnvironment();
  const extResult = {
    isValid: true,
    continuity: 0.96,
    signal: [0.1, 0.2, 0.1],
    validMask: [1, 1, 1],
    missingSegments: [],
    trackingErrors: [],
    pixelCorrespondence: { meanInkScore: 0.9 },
    leadIdentity: {
      lead: "aVR",
      expectedLead: "DI",
      recognizedLead: "aVR",
      status: "swapped_warning"
    },
    calibration: { calibrationSource: "measured" }
  };

  const audit = context.LuriaEcgSignalExtractor.auditExtractedLead(extResult);
  assert.equal(audit.status, "Indeterminada", "Rótulo conflitante não pode ser classificado como tecnicamente adequado");
  assert.ok(audit.reasons.some(r => r.includes("divergente")), "Deve documentar o alerta de rótulo divergente");
});

test("E2E Cenário 4: Derivação ausente bloqueia avanço para Etapa 3", () => {
  const { context } = createE2eEnvironment();
  const controller = context.LuriaSmartCamera.createController({});

  // Faltam derivações
  const gate = controller.confirmExtractionAndEnableAI();
  assert.equal(gate.allowed, false, "Deve bloquear Etapa 3 quando faltam derivações");
  assert.ok(gate.reason.includes("faltarem derivações essenciais"));
});

test("E2E Cenário 5: Fotografia cortada ativa isCutOff", () => {
  const { context } = createE2eEnvironment();
  // Simula imagem em que o papel ocupa apenas uma faixa muito estreita (20% da largura)
  const img = { width: 400, height: 300, data: new Uint8ClampedArray(400 * 300 * 4).fill(20) };
  // Apenas faixa central entre 160 e 240 (80px = 20% da largura) é clara
  for (let y = 0; y < 300; y++) {
    for (let x = 160; x < 240; x++) {
      const idx = (y * 400 + x) * 4;
      img.data[idx] = img.data[idx+1] = img.data[idx+2] = 240;
    }
  }
  const paper = context.LuriaEcgCvEngine.locatePaperSheet(img);
  assert.equal(paper.isCutOff, true, "Bordas sem margem ou folha truncada devem ser detectadas como cortadas");
});

test("E2E Cenário 6: Reflexo intenso reprova na análise de qualidade de frame", () => {
  const { context } = createE2eEnvironment();
  const w = 200, h = 100;
  const data = new Uint8ClampedArray(w * h * 4).fill(128);
  // Simula reflexo saturado em 35% dos pixels (> 25% glareRatio)
  for (let i = 0; i < (w * h * 0.35); i++) {
    const idx = i * 4;
    data[idx] = data[idx + 1] = data[idx + 2] = 255;
  }

  const q = context.LuriaEcgCvEngine.createEngine().analyzeFrameQuality({ width: w, height: h, data });
  assert.equal(q.isLightingGood, false, "Reflexo intenso deve invalidar isLightingGood");
  assert.ok(q.glareRatio > 0.25);
});

test("E2E Cenário 7: Calibração da grade sem pulso retangular é 'assumed', NÃO 'measured'", () => {
  const { context } = createE2eEnvironment();
  const synth = generateSynthesized12LeadImage();

  // Grade presente, mas pulso 1 mV ausente
  const cal = context.LuriaEcgCvEngine.detectECGGridAndCalibration(synth);
  assert.equal(cal.gridDetected, true, "A grade deve ser detectada");
  assert.notEqual(cal.calibrationSource, "measured", "Grade pura sem pulso e sem confirmação NÃO pode ser 'measured'");
  assert.equal(cal.calibrationSource, "assumed", "Deve ser classificada como 'assumed'");
});

test("Regressão: pontilhado fino da grade não reduz a escala de milímetro", () => {
  const { context } = createE2eEnvironment();
  const w = 600, h = 420;
  const data = new Uint8ClampedArray(w * h * 4).fill(248);
  // Textura pontilhada a cada 3 px, como fotografia de papel milimetrado.
  for (let y = 18; y < h - 18; y += 3) for (let x = 18; x < w - 18; x += 3) {
    const i = (y * w + x) * 4;
    data[i] = data[i + 1] = data[i + 2] = 235;
  }
  // Linhas estruturais de cada quadrado grande (5 mm = 60 px).
  for (let x = 30; x < w - 20; x += 60) for (let y = 18; y < h - 18; y++) {
    const i = (y * w + x) * 4;
    data[i] = data[i + 1] = data[i + 2] = 160;
  }
  for (let y = 30; y < h - 20; y += 60) for (let x = 18; x < w - 18; x++) {
    const i = (y * w + x) * 4;
    data[i] = data[i + 1] = data[i + 2] = 160;
  }

  const cal = context.LuriaEcgCvEngine.detectECGGridAndCalibration({ width: w, height: h, data });
  assert.equal(cal.gridDetected, true);
  assert.ok(cal.dominantPeriodPxX >= 55 && cal.dominantPeriodPxX <= 65,
    "A escala precisa vir das linhas da grade, não do pontilhado interno");
  assert.ok(cal.pixelsPerMmX >= 11 && cal.pixelsPerMmX <= 13,
    "60 px por quadrado grande equivale a aproximadamente 12 px/mm");
});

test("uma tira longa percorre detecção e conferência sem criar 12 derivações", () => {
  const { context } = createE2eEnvironment();
  const engine = context.LuriaEcgCvEngine;
  const strip = engine.cropSubImageData(generateSynthesized12LeadImage(), 50, 355, 700, 80);
  const detected = engine.detectECGBoundaries(strip, {paperAlreadyRectified:true});
  assert.equal(detected.detectedLayout?.documentType, "single_strip", detected.message);
  assert.equal(detected.detectedLayout.columnCount, 1);
  assert.equal(Object.keys(detected.candidateRegions).length, 1);
  const edgeToEdge = engine.detectECGBoundaries(strip, {allowDensePreview:true});
  assert.equal(edgeToEdge.detectedLayout?.documentType, "single_strip", edgeToEdge.message);
  context.document.createElement = tag => tag === "canvas" ? pixelCanvas() : {style:{},addEventListener(){}};
  const controller = context.LuriaSmartCamera.createController({});
  const result = controller.processPhotographCanvas(pixelCanvas(strip), {
    source:"normal_photo", manualPaperCornersApplied:true
  });
  assert.equal(result.ok, true, JSON.stringify(result));
  assert.equal(controller.getCapturedLeads().filter(l=>l.captured).length, 1);
  assert.equal(controller.openReview(), true);
  assert.deepEqual(Object.keys(controller.getSessionStructuredPackage().signals), []);
  assert.equal(controller.confirmExtractionAndEnableAI().allowed, false);
  controller.resetCaptureSession();
  assert.equal(controller.getCapturedLeads().filter(l=>l.captured).length, 0);
});

test("duas tiras são duas linhas de largura inteira; três tiras permitem corrigir ambiguidade", () => {
  const { context } = createE2eEnvironment();
  const engine = context.LuriaEcgCvEngine;
  const strips = engine.cropSubImageData(generateSynthesized12LeadImage(), 50, 265, 700, 165);
  const detected = engine.detectECGBoundaries(strips, {paperAlreadyRectified:true});
  assert.equal(detected.detectedLayout?.mainRows, 2, detected.message);
  assert.equal(detected.detectedLayout.columnCount, 1);
  assert.equal(Object.keys(detected.candidateRegions).length, 2);
  const full = generateSynthesized12LeadImage();
  const rows = engine.discoverWaveformTopology(full, engine.locatePaperSheet(full).boundaries);
  const corrected = engine.inferDocumentLayout(full, {xMin:0,xMax:1}, rows, {layoutHint:"3x1"});
  assert.equal(corrected.mainRows, 3);
  assert.equal(corrected.columnCount, 1);
  assert.equal(corrected.documentType, "partial_ecg");
  assert.equal(corrected.requiresLayoutConfirmation, false);
});

test("12 linhas empilhadas são 12x1 e preservam todas as regiões", () => {
  const { context } = createE2eEnvironment();
  const engine = context.LuriaEcgCvEngine;
  const strip = engine.cropSubImageData(generateSynthesized12LeadImage(), 50, 355, 700, 80);
  const width = 700, height = 1220;
  const data = new Uint8ClampedArray(width * height * 4).fill(238);
  for (let row = 0; row < 12; row++) for (let y = 0; y < strip.height; y++) {
    data.set(strip.data.subarray(y * width * 4, (y + 1) * width * 4),
      ((20 + row * 100 + y) * width) * 4);
  }
  const detected = engine.detectECGBoundaries({width,height,data}, {paperAlreadyRectified:true});
  assert.equal(detected.topology.rowCount, 12);
  assert.equal(detected.detectedLayout?.columnCount, 1, detected.message);
  assert.equal(detected.detectedLayout.documentType, "full_ecg_candidate");
  assert.equal(Object.keys(detected.candidateRegions).length, 12);
});

test("6 linhas com 2 colunas e 2 linhas com 6 colunas conservam 12 regiões", () => {
  const { context } = createE2eEnvironment();
  const engine = context.LuriaEcgCvEngine;
  const strip = engine.cropSubImageData(generateSynthesized12LeadImage(), 50, 355, 700, 80);
  for (const rows of [2, 6]) {
    const width = 700, height = rows * 100 + 20;
    const data = new Uint8ClampedArray(width * height * 4).fill(238);
    for (let row = 0; row < rows; row++) for (let y = 0; y < strip.height; y++) {
      data.set(strip.data.subarray(y * width * 4, (y + 1) * width * 4),
        ((20 + row * 100 + y) * width) * 4);
    }
    const detected = engine.detectECGBoundaries({width,height,data}, {
      paperAlreadyRectified:true, layoutHint: rows === 2 ? "2x6" : "auto"
    });
    assert.equal(detected.topology.rowCount, rows);
    assert.equal(detected.detectedLayout?.columnCount, 12 / rows, detected.message);
    assert.equal(Object.keys(detected.candidateRegions).length, 12);
  }
});

test("grade rosa com margens e múltiplos períodos conserva o espaçamento fundamental", () => {
  const { context } = createE2eEnvironment();
  const width = 965, height = 657;
  const data = new Uint8ClampedArray(width * height * 4).fill(255);
  for (let y = 27; y < 627; y++) for (let x = 50; x < 905; x++) {
    if ((x - 50) % 19 < 2 || (y - 27) % 20 < 2) {
      const i = (y * width + x) * 4;
      data[i] = 228; data[i + 1] = 155; data[i + 2] = 178;
    }
  }
  const image = {width, height, data};
  const cal = context.LuriaEcgCvEngine.detectECGGridAndCalibration(image);
  assert.equal(cal.gridDetected, true);
  assert.ok(cal.pixelsPerMmX > 3.4 && cal.pixelsPerMmX < 4.3, JSON.stringify(cal));
  assert.ok(cal.pixelsPerMmY > 3.4 && cal.pixelsPerMmY < 4.3, JSON.stringify(cal));
  const extraction = context.LuriaEcgSignalExtractor.extractRealSignalFromImageData(image);
  assert.equal(extraction.isValid, false, "grade vazia continua sem ser um ECG");
});

test("E2E Cenário 8: Sinal com 2,5 segundos não deve ser multiplicado por continuidade para encurtar tempo", () => {
  const { context } = createE2eEnvironment();
  const w = 375, h = 180;
  // Desenha 1 traçado contínuo com QRS em fundo claro
  const data = new Uint8ClampedArray(w * h * 4).fill(250);
  const baseY = 90;
  for (let x = 10; x < w - 10; x++) {
    const cyc = x % 50;
    let dy = 0;
    if (cyc === 20) dy = -16;
    else if (cyc === 22) dy = 6;
    else if (cyc >= 30 && cyc <= 38) dy = -4;

    const py = Math.min(h - 1, Math.max(0, baseY + dy));
    for (let d = -1; d <= 1; d++) {
      const idx = ((py + d) * w + x) * 4;
      data[idx] = data[idx + 1] = data[idx + 2] = 18;
    }
  }

  const ext = context.LuriaEcgSignalExtractor.extractRealSignalFromImageData({ width: w, height: h, data }, {
    calibration: {
      msPerPixel: 1000 / (25 * 6.0), // 6.666 ms por pixel
      pixelsPerMv: 60,
      calibrationSource: "measured"
    }
  });

  assert.equal(ext.isValid, true, "Extração deve ser válida para traçado desenhado");
  // 375 px * (1000 / 150) ms/px = 2500 ms = 2.500 s
  assert.equal(ext.recoveredDurationSeconds, 2.5, "Duração total física não pode ser artificialmente encurtada pela cobertura");
  const extractor = context.LuriaEcgSignalExtractor;
  const cal25x10 = { paperSpeedMmPerSec: 25, gainMmPerMv: 10, pixelsPerMmX: 6, pixelsPerMmY: 6, calibrationSource: "user_confirmed" };
  extractor.recalibrateExtraction(ext, cal25x10);
  const amplitude10 = Math.max(...ext.signal.filter(Number.isFinite)) - Math.min(...ext.signal.filter(Number.isFinite));
  const cal50x5 = { ...cal25x10, paperSpeedMmPerSec: 50, gainMmPerMv: 5 };
  extractor.recalibrateExtraction(ext, cal50x5);
  const amplitude5 = Math.max(...ext.signal.filter(Number.isFinite)) - Math.min(...ext.signal.filter(Number.isFinite));
  assert.ok(Math.abs(amplitude5 / amplitude10 - 2) < 0.03, "Ganho 5 mm/mV deve dobrar a amplitude reconstruída em mV");
  assert.equal(ext.recoveredDurationSeconds, 1.25, "50 mm/s deve reduzir a duração física pela metade");
  assert.ok(ext.validDurationSeconds <= ext.recoveredDurationSeconds);
  assert.equal(ext.effectiveResolutionHz, 300);
});

test("E2E Cenário 9: Duração desconhecida quando msPerPixel não é informado", () => {
  const { context } = createE2eEnvironment();
  const synth = generateSynthesized12LeadImage(300, 150);

  const ext = context.LuriaEcgSignalExtractor.extractRealSignalFromImageData(synth, {
    calibration: { calibrationSource: "unknown" }
  });

  assert.equal(ext.recoveredDurationSeconds, null, "Duração deve ser nula se a escala de tempo for desconhecida");
});

test("Reamostragem preserva máscara de lacuna interpolada e não fabrica amostras", () => {
  const { context } = createE2eEnvironment();
  const result = context.LuriaEcgSignalExtractor.resampleCalibratedSignal({
    isValid: true, signal: [0, 1, 2, 3], validMask: [1, 0, 1, 1], interpolatedMask: [0, 1, 0, 0],
    calibration: { msPerPixel: 10 }, effectiveResolutionHz: 100
  }, 100);
  assert.equal(result.ok, true);
  assert.deepEqual(Array.from(result.validMask), [1, 0, 1]);
  assert.equal(result.samples[1], null);
});

test("E2E Cenário 10: imagem percorre reconhecimento, câmera, extração, auditoria e pacote", () => {
  const { context } = createE2eEnvironment();
  const image = generateSynthesized12LeadImage();
  const initial = context.LuriaEcgCvEngine.detectECGBoundaries(image);
  assert.equal(initial.detected, true);
  for (const [lead, box] of Object.entries(initial.leads).filter(([_, region]) => region.row === 0)) {
    const lx = Math.round(box.xMin * image.width) + 8;
    const ly = Math.round(((box.yMin + box.yMax) / 2) * image.height) - 9;
    for (let y = ly - 2; y < ly + 20; y++) for (let x = lx - 2; x < lx + 55; x++) {
      const idx = (y * image.width + x) * 4;
      image.data[idx] = 238; image.data[idx + 1] = 235; image.data[idx + 2] = 230;
    }
    context.LuriaEcgCvEngine.drawBitmapLabelOnImageData(image, box.expectedInTemplate || lead,
      lx, ly, 2);
  }
  const recognized = context.LuriaEcgCvEngine.detectECGBoundaries(image);
  assert.equal(recognized.detected, true, JSON.stringify({ reason: recognized.reason, anomalies: recognized.anomalies, labels: recognized.recognizedLabels }));
  assert.ok(Object.values(recognized.leadIdentities).some(id => id.status === "ocr_confirmed"), JSON.stringify({ initial: initial.detectedLayout?.name, recognized: recognized.detectedLayout?.name, labels: recognized.recognizedLabels }));
  context.document.createElement = tag => tag === "canvas" ? pixelCanvas() : { tagName: tag, style: {}, addEventListener() {} };
  const controller = context.LuriaSmartCamera.createController({});
  const result = controller.processPhotographCanvas(pixelCanvas(image), { source: "test_rendered_ecg" });
  assert.equal(result.ok, true);
  assert.ok(result.capturedCount > 0);
  assert.equal(controller.openReview(), true);
  const pkg = controller.getSessionStructuredPackage();
  const captured = pkg.leads.filter(l => l.captured);
  const ocrCaptured = captured.filter(l => l.leadIdentity.status === "ocr_confirmed");
  assert.ok(ocrCaptured.length > 0, "Evidência OCR deve atravessar a câmera e chegar ao pacote");
  assert.ok(ocrCaptured.every(l => l.extraction.leadIdentity.recognizedLead === l.lead), "Extrator deve preservar o rótulo lido");
  assert.equal(controller.getCurrentStage(), 2);
  assert.equal(captured.length, result.capturedCount);
  for (const item of captured) {
    assert.ok(item.extraction.signal.length > 0);
    assert.equal(item.extraction.signal.length, item.extraction.validMask.length);
    assert.deepEqual(item.extraction.leadIdentity, item.leadIdentity);
    if (item.status === "captured") {
      assert.deepEqual(pkg.signals[item.lead], item.extraction.signal);
    } else {
      assert.equal(Object.prototype.hasOwnProperty.call(pkg.signals, item.lead), false,
        "Traçado candidato sem rótulo confirmado não pode entrar no mapa clínico nomeado");
    }
    assert.ok(item.audit.status);
  }
  assert.equal(controller.confirmExtractionAndEnableAI().allowed, false);
});

test("OCR V3 em região DI bloqueia associação automática e preserva a divergência", () => {
  const { context } = createE2eEnvironment();
  const image = generateSynthesized12LeadImage();
  const first = context.LuriaEcgCvEngine.detectECGBoundaries(image);
  assert.equal(first.detected, true);
  const box = first.leads.DI;
  const lx = Math.round(box.xMin * image.width) + 8;
  const ly = Math.round(((box.yMin + box.yMax) / 2) * image.height) - 9;
  for (let y = ly - 2; y < ly + 20; y++) for (let x = lx - 2; x < lx + 55; x++) {
    const idx = (y * image.width + x) * 4;
    image.data[idx] = 238; image.data[idx + 1] = 235; image.data[idx + 2] = 230;
  }
  context.LuriaEcgCvEngine.drawBitmapLabelOnImageData(image, "V3", lx, ly, 2);
  const detected = context.LuriaEcgCvEngine.detectECGBoundaries(image);
  assert.equal(detected.detected, false);
  assert.ok(detected.anomalies.some(a => a.code === "label_conflict"));
  assert.ok(Object.values(detected.cellIdentities).some(id => id.expectedLead === "DI" && id.recognizedLead === "V3" && id.status === "conflicting"));
  context.document.createElement = tag => tag === "canvas" ? pixelCanvas() : { tagName: tag, style: {}, addEventListener() {} };
  const controller = context.LuriaSmartCamera.createController({});
  const result = controller.processPhotographCanvas(pixelCanvas(image));
  assert.equal(controller.getCapturedLeads().filter(l => l.status === "captured").length, 0,
    "OCR conflituoso não pode virar derivação clinicamente identificada");
  assert.equal(controller.confirmExtractionAndEnableAI().allowed, false);
  if (result.ok) {
    assert.ok(result.provisionalCount > 0, "Somente prévias sem rótulo poderão ser mostradas");
    assert.deepEqual(Object.keys(controller.getSessionStructuredPackage().signals), []);
  }
  assert.ok(controller.getSessionStructuredPackage().originalImageUrl);
});

test("Contrato: OCR incerto e confirmação manual preservam incerteza e confiança original", () => {
  const { context } = createE2eEnvironment();
  const contracts = context.LuriaEcgContracts;
  const hypothesis = contracts.normalizeLeadIdentity({ lead: "V3", expectedLead: "V3", method: "topology_hypothesis", evidence: "positional_hypothesis" });
  assert.equal(hypothesis.status, "geometric_hypothesis");
  const manual = contracts.normalizeLeadIdentity({ ...hypothesis, confirmedByUser: true, humanConfirmedLead: "V3" });
  assert.equal(manual.status, "manual_confirmed");
  assert.equal(manual.ocrConfidence, 0);
  assert.equal(manual.verifiedAutomatically, false);
  const audit = context.LuriaEcgSignalExtractor.auditExtractedLead({
    isValid: true, signal: [0, 0.1, 0], validMask: [1, 1, 1], continuity: 1,
    leadIdentity: manual, calibration: { calibrationSource: "measured" },
    trackingErrors: [], pixelCorrespondence: { meanInkScore: 1 }
  });
  assert.equal(audit.status, "Revisão necessária");
  assert.equal(audit.allowsAiModelInput, false);
});

test("E2E Cenário 12: Perda de referência espacial na navegação gera instrução de reenquadramento", () => {
  const { context } = createE2eEnvironment();
  const cv = context.LuriaEcgCvEngine;
  function frame(dx, dy, visible = true) {
    const width = 1100, height = 700;
    const data = new Uint8ClampedArray(width * height * 4);
    for (let i = 0; i < width * height; i++) {
      data[i * 4] = data[i * 4 + 1] = data[i * 4 + 2] = 35; data[i * 4 + 3] = 255;
    }
    if (visible) for (let y = 170 + dy; y < 530 + dy; y++) for (let x = 250 + dx; x < 850 + dx; x++) {
      const i = (y * width + x) * 4;
      data[i] = data[i + 1] = data[i + 2] = 238;
    }
    return { width, height, data };
  }
  const tracker = {};
  const map = { DI: { xMin: 0.48, xMax: 0.52, yMin: 0.48, yMax: 0.52 } };
  const update = (dx, dy, visible = true) => {
    const sheet = cv.locatePaperSheet(frame(dx, dy, visible));
    cv.updateSpatialRegistration(tracker, sheet, map);
    return cv.computeNavigationGuidance({ leads: map }, "DI", { x: 0.5, y: 0.5 }, tracker);
  };
  assert.equal(update(0, 0).direction, "centered");
  assert.ok(update(110, 0).dx > 0.08, "Quadro deslocado à direita deve mover a direção observada");
  assert.ok(update(-110, 0).dx < -0.08, "Quadro deslocado à esquerda deve inverter a direção");
  assert.ok(update(0, 75).dy > 0.08);
  assert.ok(update(0, -75).dy < -0.08);
  assert.equal(update(0, 0, false).direction, "lost_reference");
  assert.equal(update(0, 0).direction, "centered", "Reenquadramento deve recuperar a referência");
});

test("E2E Cenário 13: Recaptura pontual de derivação específica", () => {
  const { context } = createE2eEnvironment();
  context.window.requestAnimationFrame = () => 1;
  context.window.cancelAnimationFrame = () => {};
  const controller = context.LuriaSmartCamera.createController({});
  controller.recaptureLead("V3");
  assert.equal(controller.getCurrentStage(), 1);
  controller.stopCamera();
});

test("E2E Cenário 14: Tentativa de interpretar dados de 2,5 s no modelo autoral de 10 s é CATEGORICAMENTE BLOQUEADA", () => {
  const { context } = createE2eEnvironment();

  // Pacote estruturado com 12 derivações de apenas 2,5 segundos
  const sessionPackage = {
    leads: context.LuriaSmartCamera.CANONICAL_LEADS.map(l => ({
      lead: l,
      audit: { status: "Adequada tecnicamente" }
    })),
    signals: Object.fromEntries(context.LuriaSmartCamera.CANONICAL_LEADS.map(l => [l, new Float32Array(250)])),
    durationsSeconds: Object.fromEntries(context.LuriaSmartCamera.CANONICAL_LEADS.map(l => [l, 2.5])),
    calibration: { calibrationSource: "measured", paperSpeedMmPerSec: 25, gainMmPerMv: 10 }
  };

  context.window.LuriaEcgSessionData = sessionPackage;
  context.window.LuriaEcgReaderInit(sessionPackage);

  const btn = context.document.getElementById("ecg-analyze");
  assert.equal(btn.disabled, true, "O botão de análise autoral DEVE estar desabilitado para sinais de 2.5s");

  const alertEl = context.document.getElementById("ecg-stage3-compatibility-alert");
  assert.equal(alertEl.hidden, false, "Alerta de incompatibilidade técnica deve estar visível");
  assert.ok(alertEl.innerHTML.includes("10,0 segundos contínuos"));
});

test("Etapa 3 bloqueia o envio ao backend autoral não verificado", async () => {
  const { context, elements } = createE2eEnvironment();
  let invokes = 0;
  context.supabaseClient = { functions: { invoke: async () => { invokes++; return { data: { ok: true } }; } } };
  const leads = context.LuriaSmartCamera.CANONICAL_LEADS;
  const pkg = {
    leads: leads.map(lead => ({ lead, leadIdentity: { status: "ocr_confirmed" }, audit: { status: "Adequada tecnicamente" } })),
    signals: Object.fromEntries(leads.map(lead => [lead, Array(1000).fill(0)])),
    validMasks: Object.fromEntries(leads.map(lead => [lead, Array(1000).fill(1)])),
    durationsSeconds: Object.fromEntries(leads.map(lead => [lead, 10])),
    samplingRateHz: 100,
    calibration: { calibrationSource: "measured" }
  };
  context.LuriaEcgReaderInit(pkg);
  const button = elements.get("ecg-analyze");
  assert.equal(button.disabled, true);
  await button.listeners.click[0]();
  assert.equal(invokes, 0, "Clique não pode acionar backend não verificado, mesmo se disparado programaticamente");
});

test("E2E Cenário 15: Recalibração de ganho/velocidade recalcula amplitudes, durações e atualiza o pacote final", () => {
  const { context } = createE2eEnvironment();
  const camera = context.LuriaSmartCamera.createController({});
  const extractor = context.LuriaEcgSignalExtractor;

  // Registrar derivação DI com 25 mm/s e 10 mm/mV (6 px/mm)
  // baselineY = 100, ponto Y = 70 (30 px acima da base = 30 / (10 * 6) = 0.5 mV)
  const extractionMock = {
    isValid: true,
    baselineY: 100,
    curveCoordinatesPx: [{ x: 0, y: 70 }, { x: 1, y: 70 }, { x: 2, y: 100 }],
    validMask: [1, 1, 1],
    limitations: [],
    continuity: 1.0,
    snrDb: 25,
    leadIdentity: { lead: "DI", verified: true, status: "ocr_confirmed" }
  };

  const initialCal = {
    paperSpeedMmPerSec: 25,
    gainMmPerMv: 10,
    pixelsPerMmX: 6.0,
    pixelsPerMmY: 6.0,
    gridDetected: true,
    calibrationSource: "measured",
    confirmedByUser: false
  };

  const initialExtraction = extractor.recalibrateExtraction(extractionMock, initialCal);
  assert.equal(initialExtraction.signal[0], 0.5, "Amplitude inicial deve ser 0.5 mV para 10 mm/mV");

  // Injetar na câmera simulando derivação capturada
  camera.registerCapturedLeadForTest("DI", initialExtraction);

  // Médico altera para ganho 20 mm/mV e velocidade 50 mm/s com grade de 6 px/mm
  const updated = camera.setUserCalibration({
    paperSpeedMmPerSec: 50,
    gainMmPerMv: 20,
    pixelsPerMmX: 6.0,
    pixelsPerMmY: 6.0,
    confirmedByUser: true
  });

  assert.equal(updated.calibrationSource, "user_confirmed");
  assert.equal(updated.measurementsAllowed, true);

  // Verificar se leadInfo.extractedSignal e leadInfo.extraction foram atualizados
  const leads = camera.getCapturedLeads();
  const di = leads.find(l => l.lead === "DI");
  assert.ok(di, "DI deve estar presente");
  // 30 px com ganho 20 mm/mV e pxY 6 -> 30 / (20 * 6) = 0.25 mV
  assert.equal(di.extractedSignal[0], 0.25, "Amplitude recalculada para ganho 20 mm/mV deve ser 0.25 mV");

  // Pacote estruturado deve refletir o sinal e metadados recalculados
  const pkg = camera.getSessionStructuredPackage();
  assert.equal(pkg.signals["DI"][0], 0.25, "Pacote final deve conter sinal recalculado");
  assert.equal(pkg.calibration.paperSpeedMmPerSec, 50);
  assert.equal(pkg.calibration.gainMmPerMv, 20);
  assert.equal(pkg.calibration.confirmedByUser, true);
});

test("E2E Cenário 16: Pulso falso/artefato não habilita 'measured' e preserva exigência de validação", () => {
  const { context } = createE2eEnvironment();
  const contracts = context.LuriaEcgContracts;

  // Pulso com alta confiança falsa mas sem grade milimetrada
  const calNoGrid = contracts.normalizeCalibration({
    gridDetected: false,
    pulseDetected: true,
    pulseConfidence: 0.95
  });
  assert.equal(calNoGrid.measurementsAllowed, false, "Sem grade medida, medições físicas devem ser bloqueadas");
  assert.equal(calNoGrid.calibrationSource, "unknown");

  // Grade medida mas com pulso de baixa confiança (< 0.70)
  const calLowConfPulse = contracts.normalizeCalibration({
    gridDetected: true,
    pixelsPerMmX: 6.0,
    pixelsPerMmY: 6.0,
    paperSpeedMmPerSec: 25,
    gainMmPerMv: 10,
    pulseDetected: true,
    pulseConfidence: 0.45
  });
  assert.equal(calLowConfPulse.measurementsAllowed, false, "Pulso incerto (<0.70) não permite medições");
  assert.equal(calLowConfPulse.calibrationSource, "assumed");
});


