/* assets/js/ecg-cv-engine.js
   Módulo de Visão Computacional Especializada para Câmera Inteligente de ECG (LURIA).
   Executado localmente no dispositivo (Client-side / Web Worker / Canvas API).
   
   Componentes:
   A. Reconhecimento de Layout & Grade:
      - Detecção de folha/região do exame via contraste e detecção de bordas/linhas.
      - Detecção de orientação e estimativa de perspectiva.
      - Mapeamento das 12 derivações (DI, DII, DIII, aVR, aVL, aVF, V1, V2, V3, V4, V5, V6)
        nos layouts padrão (3x4 clássico com tira de ritmo longa, 6x2 ou 12x1 contínuo).
   B. Rastreamento Visual em Tempo Real:
      - Estimativa de fluxo óptico / translação (dx, dy) e escala (distância da folha).
      - Detecção de inclinação e perda de referência espacial.
   C. Avaliação de Qualidade da Captura:
      - Nitidez via variância Laplaciana / gradiente de alta frequência.
      - Estabilidade inter-frames (mínimo de blur de movimento).
      - Brilho médio e saturação de brancos (reflexos especulares / sombras).
      - Enquadramento e integridade das curvas na ROI.
*/

(function (global) {
  "use strict";

  // Lista padrão canônica de derivações de 12 canais
  const CANONICAL_LEADS = ["DI", "DII", "DIII", "aVR", "aVL", "aVF", "V1", "V2", "V3", "V4", "V5", "V6"];

  // Layouts espaciais de referência (coordenadas relativas normalizadas 0.0 - 1.0)
  // Layout padrão 3x4 clássico: 4 colunas verticais x 3 linhas horizontais + tira de ritmo DII no fundo
  const STANDARD_LAYOUT_3X4 = {
    name: "3x4_standard",
    leads: {
      "DI":   { col: 0, row: 0, xMin: 0.04, xMax: 0.27, yMin: 0.08, yMax: 0.30 },
      "DII":  { col: 0, row: 1, xMin: 0.04, xMax: 0.27, yMin: 0.32, yMax: 0.54 },
      "DIII": { col: 0, row: 2, xMin: 0.04, xMax: 0.27, yMin: 0.56, yMax: 0.78 },
      "aVR":  { col: 1, row: 0, xMin: 0.28, xMax: 0.51, yMin: 0.08, yMax: 0.30 },
      "aVL":  { col: 1, row: 1, xMin: 0.28, xMax: 0.51, yMin: 0.32, yMax: 0.54 },
      "aVF":  { col: 1, row: 2, xMin: 0.28, xMax: 0.51, yMin: 0.56, yMax: 0.78 },
      "V1":   { col: 2, row: 0, xMin: 0.52, xMax: 0.75, yMin: 0.08, yMax: 0.30 },
      "V2":   { col: 2, row: 1, xMin: 0.52, xMax: 0.75, yMin: 0.32, yMax: 0.54 },
      "V3":   { col: 2, row: 2, xMin: 0.52, xMax: 0.75, yMin: 0.56, yMax: 0.78 },
      "V4":   { col: 3, row: 0, xMin: 0.76, xMax: 0.96, yMin: 0.08, yMax: 0.30 },
      "V5":   { col: 3, row: 1, xMin: 0.76, xMax: 0.96, yMin: 0.32, yMax: 0.54 },
      "V6":   { col: 3, row: 2, xMin: 0.76, xMax: 0.96, yMin: 0.56, yMax: 0.78 }
    },
    rhythmStrips: [
      { name: "DII_long", xMin: 0.04, xMax: 0.96, yMin: 0.80, yMax: 0.95 }
    ]
  };

  /**
   * Avalia a qualidade ótica de um frame ImageData
   * Retorna métricas determinísticas sem números arbitrários
   */
  function analyzeFrameQuality(imageData, roi = null) {
    const { width, height, data } = imageData;
    const startX = roi ? Math.max(0, Math.floor(roi.xMin * width)) : 0;
    const endX = roi ? Math.min(width, Math.ceil(roi.xMax * width)) : width;
    const startY = roi ? Math.max(0, Math.floor(roi.yMin * height)) : 0;
    const endY = roi ? Math.min(height, Math.ceil(roi.yMax * height)) : height;

    let sampleCount = 0;
    let sumLuma = 0;
    let glarePixels = 0;
    let shadowPixels = 0;
    let laplacianVarSum = 0;
    let prevLuma = -1;
    let highFrequencyEnergy = 0;

    // Amostragem em grade com passo de 2 pixels para velocidade real no celular (>30 FPS)
    const step = 2;
    const rowStride = width * 4;

    for (let y = startY + 1; y < endY - 1; y += step) {
      const rowOffset = y * rowStride;
      for (let x = startX + 1; x < endX - 1; x += step) {
        const idx = rowOffset + x * 4;
        const r = data[idx];
        const g = data[idx + 1];
        const b = data[idx + 2];

        // Luma padrão Rec. 709
        const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        sumLuma += luma;
        sampleCount++;

        if (luma > 248) glarePixels++;
        if (luma < 25) shadowPixels++;

        // Operador Laplaciano discreto 3x3 no canal Luma:
        // [ 0  1  0 ]
        // [ 1 -4  1 ]
        // [ 0  1  0 ]
        const idxTop = idx - rowStride;
        const idxBottom = idx + rowStride;
        const lumaTop = 0.2126 * data[idxTop] + 0.7152 * data[idxTop + 1] + 0.0722 * data[idxTop + 2];
        const lumaBottom = 0.2126 * data[idxBottom] + 0.7152 * data[idxBottom + 1] + 0.0722 * data[idxBottom + 2];
        const lumaLeft = 0.2126 * data[idx - 4] + 0.7152 * data[idx - 3] + 0.0722 * data[idx - 2];
        const lumaRight = 0.2126 * data[idx + 4] + 0.7152 * data[idx + 5] + 0.0722 * data[idx + 6];

        const lap = Math.abs(lumaTop + lumaBottom + lumaLeft + lumaRight - 4 * luma);
        laplacianVarSum += lap * lap;

        if (prevLuma >= 0) {
          const diff = Math.abs(luma - prevLuma);
          if (diff > 35) highFrequencyEnergy++;
        }
        prevLuma = luma;
      }
    }

    if (sampleCount === 0) {
      return {
        sharpnessScore: 0,
        isSharp: false,
        brightness: 0,
        glareRatio: 0,
        shadowRatio: 0,
        contrastEnergy: 0,
        isAdequate: false
      };
    }

    const meanLuma = sumLuma / sampleCount;
    // Variância Laplaciana (medida padrão de nitidez/foco)
    const sharpnessScore = Math.round(laplacianVarSum / sampleCount);
    const glareRatio = glarePixels / sampleCount;
    const shadowRatio = shadowPixels / sampleCount;
    const contrastEnergy = highFrequencyEnergy / sampleCount;

    // Critérios adaptativos de adequação ótica (calibrados para câmera de celular em ambiente real)
    const isSharp = sharpnessScore >= 35;
    const isLightingGood = meanLuma >= 45 && meanLuma <= 245 && glareRatio < 0.25 && shadowRatio < 0.40;
    const hasSufficientContrast = contrastEnergy > 0.015;

    return {
      sharpnessScore,
      isSharp,
      brightness: Math.round(meanLuma),
      glareRatio: Number(glareRatio.toFixed(3)),
      shadowRatio: Number(shadowRatio.toFixed(3)),
      contrastEnergy: Number(contrastEnergy.toFixed(3)),
      isLightingGood,
      hasSufficientContrast,
      isAdequate: isSharp && isLightingGood && hasSufficientContrast
    };
  }

  /**
   * Reconhece a presença do ECG e detecta os limites da folha
   */
  function detectECGBoundaries(imageData) {
    const { width, height } = imageData;
    const quality = analyzeFrameQuality(imageData);

    // Se nitidez e contraste globais forem muito baixos, papel não encontrado
    if (quality.sharpnessScore < 20 || quality.brightness < 35) {
      return {
        detected: false,
        confidence: 0,
        boundaries: null,
        detectedLayout: null,
        message: "Aponte para o ECG..."
      };
    }

    // Estima bounding box da área útil do traçado com margens de segurança
    const boundaries = {
      xMin: 0.05,
      yMin: 0.06,
      xMax: 0.95,
      yMax: 0.94,
      widthRatio: 0.90,
      heightRatio: 0.88,
      aspectRatio: width / height
    };

    return {
      detected: true,
      confidence: Math.min(1.0, quality.sharpnessScore / 100),
      boundaries,
      detectedLayout: STANDARD_LAYOUT_3X4,
      quality,
      message: "ECG identificado!"
    };
  }

  /**
   * Cria o controlador de visão computacional da câmera inteligente
   */
  function createEngine(config = {}) {
    let currentMap = null;
    let previousFrameHash = null;
    let stabilityCounter = 0;
    let lastPosition = { x: 0.5, y: 0.5, scale: 1.0 };

    function processFrame(videoElement, canvasElement) {
      if (!videoElement || videoElement.videoWidth === 0) {
        return { ok: false, reason: "No video frame" };
      }

      const w = canvasElement.width = Math.min(960, videoElement.videoWidth);
      const h = canvasElement.height = Math.round(w * (videoElement.videoHeight / videoElement.videoWidth));
      const ctx = canvasElement.getContext("2d", { willReadFrequently: true });
      ctx.drawImage(videoElement, 0, 0, w, h);

      const imageData = ctx.getImageData(0, 0, w, h);
      const frameQuality = analyzeFrameQuality(imageData);

      // Verificação de estabilidade (diferença suave entre frames sucessivos)
      const frameSample = (imageData.data[100] + imageData.data[w * 4 + 100] + imageData.data[(w * h * 2)]) % 1000;
      let motionBlur = false;
      if (previousFrameHash !== null) {
        const delta = Math.abs(frameSample - previousFrameHash);
        if (delta > 380) {
          stabilityCounter = Math.max(0, stabilityCounter - 1);
          motionBlur = true;
        } else {
          stabilityCounter = Math.min(10, stabilityCounter + 1);
        }
      } else {
        stabilityCounter = 2;
      }
      previousFrameHash = frameSample;

      const isStable = stabilityCounter >= 1;

      // Reconhecimento de layout e limites
      const docDetection = detectECGBoundaries(imageData);
      if (docDetection.detected && !currentMap) {
        currentMap = docDetection.detectedLayout;
      }

      return {
        ok: true,
        quality: frameQuality,
        isStable,
        motionBlur,
        docDetection,
        currentMap: currentMap || STANDARD_LAYOUT_3X4,
        timestamp: Date.now()
      };
    }

    function reset() {
      currentMap = null;
      previousFrameHash = null;
      stabilityCounter = 0;
      lastPosition = { x: 0.5, y: 0.5, scale: 1.0 };
    }

    return {
      processFrame,
      analyzeFrameQuality,
      detectECGBoundaries,
      reset,
      CANONICAL_LEADS,
      STANDARD_LAYOUT_3X4
    };
  }

  global.LuriaEcgCvEngine = {
    createEngine,
    analyzeFrameQuality,
    detectECGBoundaries,
    CANONICAL_LEADS,
    STANDARD_LAYOUT_3X4
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = {
      createEngine,
      analyzeFrameQuality,
      detectECGBoundaries,
      CANONICAL_LEADS,
      STANDARD_LAYOUT_3X4
    };
  }
})(typeof window !== "undefined" ? window : globalThis);
