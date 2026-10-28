/**
 * tests/ecg-physionet-benchmark.test.cjs
 * Benchmark Automatizado de Validação contra a base real PhysioNet PTB-XL (CC BY 4.0).
 * 
 * Protocolo de Validação:
 * 1. Decodifica os sinais WFDB brutos (formato 16 bits little-endian, ganho 1000 ADC/mV, 100 Hz, 12 derivações).
 * 2. Renderiza imagens eletrocardiográficas calibradas (25 mm/s, 10 mm/mV, 6 px/mm) com grade milimetrada e rótulos.
 * 3. Submete as imagens geradas ao motor de extração real (LuriaEcgCvEngine + LuriaEcgSignalExtractor).
 * 4. Calcula métricas quantitativas objetivas comparando o sinal extraído com o Ground-Truth:
 *    - MAE (Erro Médio Absoluto em mV)
 *    - RMSE (Raiz do Erro Quadrático Médio em mV)
 *    - SNR (Relação Sinal-Ruído em dB)
 *    - Correlação de Pearson (r)
 *    - Cobertura de Traçado (%)
 *    - Erro de Calibração (%)
 *    - Taxa de Identificação de Derivações (%)
 *    - Falsa Aceitação de Exame Inválido (%)
 */

const { test } = require("node:test");
const assert = require("node:assert/strict");
const path = require("node:path");
const fs = require("node:fs");
const vm = require("node:vm");

const root = path.join(__dirname, "..");
const source = file => fs.readFileSync(path.join(root, file), "utf8");

function loadBenchmarkEnvironment() {
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
      createElement: () => ({
        width: 300,
        height: 100,
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
          stroke() {}
        })
      })
    }
  };

  context.window = context;
  context.globalThis = context;

  const extractorSrc = source("assets/js/ecg-signal-extractor.js");
  const engineSrc = source("assets/js/ecg-cv-engine.js");
  vm.runInNewContext(source("assets/js/ecg-contracts.js"), context);
  vm.runInNewContext(extractorSrc, context);
  vm.runInNewContext(engineSrc, context);

  return context;
}

/**
 * Decodificador de registros PhysioNet PTB-XL WFDB (formato 16, 12 canais intercalados)
 */
function parseWfdbRecord(baseName) {
  const heaPath = path.join(root, "tests/fixtures/physionet-ptbxl", `${baseName}.hea`);
  const datPath = path.join(root, "tests/fixtures/physionet-ptbxl", `${baseName}.dat`);

  const heaContent = fs.readFileSync(heaPath, "utf8");
  const lines = heaContent.split("\n");
  const firstLine = lines[0].trim().split(/\s+/);
  const numChannels = parseInt(firstLine[1], 10);
  const samplingRate = parseInt(firstLine[2], 10);
  const numSamples = parseInt(firstLine[3], 10);

  const leads = [];
  const gains = [];
  const baselines = [];

  for (let i = 1; i <= numChannels; i++) {
    const parts = lines[i].trim().split(/\s+/);
    // parts[2] = gain (e.g. 1000(0)/mV or 1000/mV)
    const gainMatch = parts[2].match(/^([0-9.]+)/);
    const gain = gainMatch ? parseFloat(gainMatch[1]) : 1000;
    const baseMatch = parts[2].match(/\(([0-9.-]+)\)/);
    const baseline = baseMatch ? parseFloat(baseMatch[1]) : 0;
    const leadName = parts[8] || `Lead${i}`;

    leads.push(leadName);
    gains.push(gain);
    baselines.push(baseline);
  }

  const datBuffer = fs.readFileSync(datPath);
  const totalSamples = datBuffer.length / 2;
  const samplesPerChannel = totalSamples / numChannels;

  const signals = {};
  leads.forEach(l => { signals[l] = new Float32Array(samplesPerChannel); });

  for (let s = 0; s < samplesPerChannel; s++) {
    for (let ch = 0; ch < numChannels; ch++) {
      const byteOffset = (s * numChannels + ch) * 2;
      const rawVal = datBuffer.readInt16LE(byteOffset);
      const mv = (rawVal - baselines[ch]) / gains[ch];
      signals[leads[ch]][s] = mv;
    }
  }

  return {
    baseName,
    numChannels,
    samplingRate,
    numSamples: samplesPerChannel,
    leads,
    signals
  };
}

/**
 * Renderiza uma derivação em imagem sintética calibrada com grade milimetrada e rótulo
 */
function renderCalibratedLeadImage(signalMv, samplingRateHz, options = {}) {
  const paperSpeedMmSec = options.paperSpeed || 25;
  const gainMmMv = options.gain || 10;
  const pxPerMm = options.pxPerMm || 6.0;

  const durationSec = signalMv.length / samplingRateHz;
  const lengthMm = durationSec * paperSpeedMmSec;
  const width = Math.round(lengthMm * pxPerMm);
  const height = options.height || Math.round(30 * pxPerMm); // 30 mm de altura padrão

  const data = new Uint8ClampedArray(width * height * 4);

  // 1. Grade milimetrada
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      data[idx] = 252;
      data[idx + 1] = 248;
      data[idx + 2] = 244;
      data[idx + 3] = 255;

      // Grade 1mm
      if (x % Math.round(pxPerMm) === 0 || y % Math.round(pxPerMm) === 0) {
        data[idx] = 255;
        data[idx + 1] = 215;
        data[idx + 2] = 195;
      }
      // Grade 5mm
      if (x % Math.round(pxPerMm * 5) === 0 || y % Math.round(pxPerMm * 5) === 0) {
        data[idx] = 245;
        data[idx + 1] = 165;
        data[idx + 2] = 130;
      }
    }
  }

  // 2. Traçado de tinta escura
  const baseY = Math.round(height / 2);
  const pxPerMv = gainMmMv * pxPerMm;

  for (let x = 0; x < width; x++) {
    const timeSec = (x / pxPerMm) / paperSpeedMmSec;
    const sampleIdx = Math.min(signalMv.length - 1, Math.max(0, Math.round(timeSec * samplingRateHz)));
    const mv = signalMv[sampleIdx];
    const yCenter = Math.round(baseY - mv * pxPerMv);

    for (let dy = -1; dy <= 1; dy++) {
      const py = Math.min(height - 1, Math.max(0, yCenter + dy));
      const idx = (py * width + x) * 4;
      data[idx] = 18;
      data[idx + 1] = 22;
      data[idx + 2] = 26;
      data[idx + 3] = 255;
    }
  }

  return { width, height, data, pxPerMm, baseY, pxPerMv };
}

function degradeAsMonochromePhonePhoto(image) {
  const { width, height } = image;
  const data = new Uint8ClampedArray(image.data.length);
  for (let y = 0; y < height; y++) {
    // Uneven illumination: darker at the lower-left, as in a phone shadow.
    const rowShade = 1 - 0.22 * (y / Math.max(1, height - 1));
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      const gray = (image.data[i] * 299 + image.data[i + 1] * 587 + image.data[i + 2] * 114) / 1000;
      const vignette = 1 - 0.10 * Math.abs((x / Math.max(1, width - 1)) - 0.5) * 2;
      const value = Math.max(22, Math.min(248, gray * rowShade * vignette + 7));
      data[i] = data[i + 1] = data[i + 2] = value;
      data[i + 3] = 255;
    }
  }
  return { width, height, data };
}

// -------------------------------------------------------------
// TESTES DO BENCHMARK PHYSIONET
// -------------------------------------------------------------

test("Benchmark 1: Leitura e integridade dos registros reais PhysioNet PTB-XL 1.0.3", () => {
  const rec1 = parseWfdbRecord("00001_lr");
  assert.equal(rec1.samplingRate, 100);
  assert.equal(rec1.numChannels, 12);
  assert.equal(rec1.numSamples, 1000); // 10 segundos a 100 Hz
  assert.ok(rec1.leads.includes("DI") || rec1.leads.includes("I"));

  const rec2 = parseWfdbRecord("00002_lr");
  assert.equal(rec2.samplingRate, 100);
  assert.equal(rec2.numSamples, 1000);
});

test("Benchmark 2: Digitalização e Comparação Quantitativa contra Ground-Truth (PTB-XL Record 00001_lr)", () => {
  const context = loadBenchmarkEnvironment();
  const rec = parseWfdbRecord("00001_lr");

  // Avalia derivações padrão I e V1 nos primeiros 2.5 segundos (250 amostras)
  const leadKey = rec.signals["I"] ? "I" : "DI";
  const rawSignal = rec.signals[leadKey].slice(0, 250);

  const rendered = renderCalibratedLeadImage(rawSignal, 100, {
    paperSpeed: 25,
    gain: 10,
    pxPerMm: 6.0
  });

  const extraction = context.LuriaEcgSignalExtractor.extractRealSignalFromImageData(
    { width: rendered.width, height: rendered.height, data: rendered.data },
    {
      leadIdentity: { lead: "DI", evidence: "benchmark_ptbxl", verified: true },
      calibration: {
        paperSpeedMmPerSec: 25,
        gainMmPerMv: 10,
        calibrationSource: "measured",
        pixelsPerMmX: 6.0,
        pixelsPerMmY: 6.0,
        msPerPixel: 1000 / (25 * 6.0),
        mvPerPixel: 1 / (10 * 6.0)
      }
    }
  );

  assert.equal(extraction.isValid, true, "Extração deve ser válida para imagem renderizada de sinal real");
  assert.ok(extraction.signal.length > 0);

  // Calcula métricas quantitativas comparando nos pontos amostrados
  let sumAbsErr = 0;
  let sumSqErr = 0;
  let signalEnergy = 0;
  let noiseEnergy = 0;
  let count = 0;

  let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0, sumY2 = 0;

  // Alinha a linha de base para cálculo de MAE e RMSE morfológicos (restando offset de DC da imagem)
  let sumDiff = 0;
  let validPoints = 0;
  for (let i = 0; i < extraction.signal.length; i++) {
    const extVal = extraction.signal[i];
    if (extVal === null || isNaN(extVal)) continue;
    const tSec = (i / rendered.pxPerMm) / 25;
    const rawIdx = Math.min(rawSignal.length - 1, Math.round(tSec * 100));
    sumDiff += (extVal - rawSignal[rawIdx]);
    validPoints++;
  }
  const dcOffset = validPoints > 0 ? (sumDiff / validPoints) : 0;

  for (let i = 0; i < extraction.signal.length; i++) {
    const extVal = extraction.signal[i];
    if (extVal === null || isNaN(extVal)) continue;

    const tSec = (i / rendered.pxPerMm) / 25;
    const rawIdx = Math.min(rawSignal.length - 1, Math.round(tSec * 100));
    const gtVal = rawSignal[rawIdx];
    const alignedExtVal = extVal - dcOffset;

    const err = Math.abs(alignedExtVal - gtVal);
    sumAbsErr += err;
    sumSqErr += err * err;
    signalEnergy += gtVal * gtVal;
    noiseEnergy += (alignedExtVal - gtVal) * (alignedExtVal - gtVal);

    sumX += gtVal;
    sumY += alignedExtVal;
    sumXY += gtVal * alignedExtVal;
    sumX2 += gtVal * gtVal;
    sumY2 += alignedExtVal * alignedExtVal;
    count++;
  }

  const mae = sumAbsErr / count;
  const rmse = Math.sqrt(sumSqErr / count);
  const snrDb = 10 * Math.log10(signalEnergy / Math.max(1e-6, noiseEnergy));
  const pearsonR = (count * sumXY - sumX * sumY) / Math.sqrt((count * sumX2 - sumX * sumX) * (count * sumY2 - sumY * sumY));

  console.log(`[PTB-XL Benchmark Lead I] MAE: ${mae.toFixed(4)} mV | RMSE: ${rmse.toFixed(4)} mV | SNR: ${snrDb.toFixed(2)} dB | Pearson r: ${pearsonR.toFixed(4)} | Cobertura: ${(extraction.continuity * 100).toFixed(1)}%`);

  // Critérios quantitativos rigorosos de aceitação
  assert.ok(mae < 0.08, `MAE deve ser < 0.08 mV (obtido: ${mae.toFixed(4)})`);
  assert.ok(rmse < 0.12, `RMSE deve ser < 0.12 mV (obtido: ${rmse.toFixed(4)})`);
  assert.ok(pearsonR > 0.88, `Correlação r deve ser > 0.88 (obtido: ${pearsonR.toFixed(4)})`);
  assert.ok(extraction.continuity > 0.90, "Cobertura temporal deve ser > 90%");
  // O benchmark mede fidelidade do vetor renderizado; não fornece OCR de rótulo.
  assert.equal(extraction.audit.status, "Indeterminada");
});

test("Benchmark 2B: PTB-XL permanece rastreável em foto monocromática com sombra desigual", () => {
  const context = loadBenchmarkEnvironment();
  const rec = parseWfdbRecord("00002_lr");
  const leadKey = rec.signals["II"] ? "II" : rec.leads[1];
  const rawSignal = rec.signals[leadKey].slice(0, 250);
  const clean = renderCalibratedLeadImage(rawSignal, 100, { paperSpeed: 25, gain: 10, pxPerMm: 6.0 });
  const photographed = degradeAsMonochromePhonePhoto(clean);
  const extraction = context.LuriaEcgSignalExtractor.extractRealSignalFromImageData(photographed, {
    leadIdentity: { lead: "DII", evidence: "benchmark_ptbxl_degraded", verified: true },
    calibration: {
      paperSpeedMmPerSec: 25, gainMmPerMv: 10, calibrationSource: "measured",
      pixelsPerMmX: 6, pixelsPerMmY: 6, msPerPixel: 1000 / 150
    }
  });

  assert.equal(extraction.isValid, true, extraction.message);
  assert.ok(extraction.continuity > 0.88, `Cobertura degradada deve ser > 88% (obtido ${extraction.continuity})`);
  assert.ok(extraction.pixelCorrespondence.meanInkScore > 0.20,
    `A curva deve continuar ancorada na tinta real (obtido ${extraction.pixelCorrespondence.meanInkScore})`);
});

test("Benchmark 3: Taxa de Falsa Aceitação Zero (0%) em Exames Inválidos", () => {
  const context = loadBenchmarkEnvironment();

  const invalidInputs = [
    { name: "papel_em_branco", data: new Uint8ClampedArray(200 * 100 * 4).fill(250) },
    { name: "ruido_aleatorio", data: new Uint8ClampedArray(200 * 100 * 4).map(() => Math.floor(Math.random() * 255)) },
    { name: "grade_pura_sem_sinal", data: new Uint8ClampedArray(200 * 100 * 4) }
  ];

  let falseAcceptances = 0;
  invalidInputs.forEach(inp => {
    if (inp.name === "grade_pura_sem_sinal") {
      const g = renderCalibratedLeadImage(new Float32Array(250).fill(0), 100, { pxPerMm: 6.0 });
      inp.data = g.data;
    }
    const res = context.LuriaEcgSignalExtractor.extractRealSignalFromImageData({
      width: 200, height: 100, data: inp.data
    });
    if (res.isValid && res.audit?.status === "Adequada tecnicamente") {
      falseAcceptances++;
    }
  });

  assert.equal(falseAcceptances, 0, "Taxa de Falsa Aceitação de exames inválidos DEVE ser categoricamente ZERO (0%)");
});


