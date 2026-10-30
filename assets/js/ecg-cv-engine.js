/* assets/js/ecg-cv-engine.js
   Módulo de Visão Computacional Real para Identificação, Orientação,
   Homografia, Reconhecimento de Rótulos e Calibração de Grade de ECG (LURIA).

   Princípios Arquiteturais:
   1. NENHUM LAYOUT OU CALIBRAÇÃO É ASSUMIDO SILENCIOSAMENTE:
      - `STANDARD_LAYOUT_3X4` é apenas uma hipótese geométrica testada contra a evidência real da imagem.
      - Se a imagem não contiver células com traçados eletrocardiográficos reais ou os rótulos
        contradisserem a disposição esperada, a identificação falha de forma explícita e segura (fail-closed).
   2. RECONHECIMENTO MULTI-ESTÁGIO REAL:
      - Estágio 1: Segmentação adaptativa da folha de papel, cálculo dos cantos/limites e estimativa de inclinação/perspectiva.
      - Estágio 2: Estimativa de orientação (0°, 90°, 180°, 270° e ângulo fino de skew via projeção horizontal/vertical).
      - Estágio 3: Detecção e medição da grade milimetrada por autocorrelação espectral dos perfis de linha/coluna (dx_mm, dy_mm),
        diferenciando escala medida ("measured"), confirmada pelo usuário ("user_confirmed"), presumida ("assumed") ou desconhecida ("unknown").
      - Estágio 4: Detecção do pulso retangular de calibração padrão (1 mV x 200 ms) para validação cruzada de ganho (10 mm/mV vs 5 mm/mV)
        e velocidade (25 mm/s vs 50 mm/s).
      - Estágio 5: Descoberta da topologia de faixas/colunas de traçado (3x4, 3x4+1 tira de ritmo, 6x2, 12x1 empilhado, tira isolada).
      - Estágio 6: Reconhecimento óptico de rótulos de derivações (DI/I, DII/II, DIII/III, aVR, aVL, aVF, V1–V6) por templates matriciais
        invariantes a escala + verificação de duplicatas, ausências ou trocas de posição.
*/

(function (global) {
  "use strict";
  const contracts = global.LuriaEcgContracts || (typeof require === "function" ? require("./ecg-contracts.js") : null);

  const CANONICAL_LEADS = ["DI", "DII", "DIII", "aVR", "aVL", "aVF", "V1", "V2", "V3", "V4", "V5", "V6"];

  // Mapeamento de sinônimos clínicos internacionais (I, II, III -> DI, DII, DIII)
  const LEAD_SYNONYMS = {
    "I": "DI", "DI": "DI", "D1": "DI",
    "II": "DII", "DII": "DII", "D2": "DII",
    "III": "DIII", "DIII": "DIII", "D3": "DIII",
    "AVR": "aVR", "aVR": "aVR", "-AVR": "aVR",
    "AVL": "aVL", "aVL": "aVL",
    "AVF": "aVF", "aVF": "aVF",
    "V1": "V1", "V2": "V2", "V3": "V3", "V4": "V4", "V5": "V5", "V6": "V6"
  };

  // Hipóteses de layouts conhecidos na prática clínica e em diferentes fabricantes
  const LAYOUT_TEMPLATES = {
    "3x4_plus_rhythm": {
      name: "3x4_plus_rhythm",
      description: "3 linhas × 4 colunas (2,5s por derivação) + 1 tira de ritmo longa (10s)",
      rows: 4,
      colsPerRow: [4, 4, 4, 1],
      grid: [
        ["DI", "aVR", "V1", "V4"],
        ["DII", "aVL", "V2", "V5"],
        ["DIII", "aVF", "V3", "V6"]
      ],
      rhythmRows: [{ rowIndex: 3, defaultLead: "DII", durationRatio: 1.0 }]
    },
    "3x4_standard": {
      name: "3x4_standard",
      description: "3 linhas × 4 colunas (2,5s por derivação, sem tira de ritmo inferior)",
      rows: 3,
      colsPerRow: [4, 4, 4],
      grid: [
        ["DI", "aVR", "V1", "V4"],
        ["DII", "aVL", "V2", "V5"],
        ["DIII", "aVF", "V3", "V6"]
      ],
      rhythmRows: []
    },
    "6x2_standard": {
      name: "6x2_standard",
      description: "6 linhas × 2 colunas (5,0s por derivação)",
      rows: 6,
      colsPerRow: [2, 2, 2, 2, 2, 2],
      grid: [
        ["DI", "V1"],
        ["DII", "V2"],
        ["DIII", "V3"],
        ["aVR", "V4"],
        ["aVL", "V5"],
        ["aVF", "V6"]
      ],
      rhythmRows: []
    },
    "12x1_stacked": {
      name: "12x1_stacked",
      description: "12 derivações simultâneas empilhadas (1 coluna × 12 linhas)",
      rows: 12,
      colsPerRow: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      grid: [
        ["DI"], ["DII"], ["DIII"], ["aVR"], ["aVL"], ["aVF"],
        ["V1"], ["V2"], ["V3"], ["V4"], ["V5"], ["V6"]
      ],
      rhythmRows: []
    }
  };

  // Mantido para retrocompatibilidade estrutural, porém nunca retornado sem verificação de evidência
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
      { name: "DII_long", lead: "DII", xMin: 0.04, xMax: 0.96, yMin: 0.80, yMax: 0.95 }
    ]
  };

  // Glifos matriciais 5x7 para reconhecimento óptico direto de caracteres de rótulos de derivações
  // Permite identificar rótulos impressos na imagem sem depender de rede externa
  const CHAR_GLYPHS_5X7 = {
    "D": [
      1,1,1,1,0,
      1,0,0,0,1,
      1,0,0,0,1,
      1,0,0,0,1,
      1,0,0,0,1,
      1,0,0,0,1,
      1,1,1,1,0
    ],
    "I": [
      1,1,1,1,1,
      0,0,1,0,0,
      0,0,1,0,0,
      0,0,1,0,0,
      0,0,1,0,0,
      0,0,1,0,0,
      1,1,1,1,1
    ],
    "V": [
      1,0,0,0,1,
      1,0,0,0,1,
      1,0,0,0,1,
      1,0,0,0,1,
      0,1,0,1,0,
      0,1,0,1,0,
      0,0,1,0,0
    ],
    "A": [
      0,0,1,0,0,
      0,1,0,1,0,
      1,0,0,0,1,
      1,1,1,1,1,
      1,0,0,0,1,
      1,0,0,0,1,
      1,0,0,0,1
    ],
    "a": [
      0,0,0,0,0,
      0,1,1,1,0,
      0,0,0,0,1,
      0,1,1,1,1,
      1,0,0,0,1,
      1,0,0,0,1,
      0,1,1,1,1
    ],
    "R": [
      1,1,1,1,0,
      1,0,0,0,1,
      1,0,0,0,1,
      1,1,1,1,0,
      1,0,1,0,0,
      1,0,0,1,0,
      1,0,0,0,1
    ],
    "L": [
      1,0,0,0,0,
      1,0,0,0,0,
      1,0,0,0,0,
      1,0,0,0,0,
      1,0,0,0,0,
      1,0,0,0,0,
      1,1,1,1,1
    ],
    "F": [
      1,1,1,1,1,
      1,0,0,0,0,
      1,0,0,0,0,
      1,1,1,1,0,
      1,0,0,0,0,
      1,0,0,0,0,
      1,0,0,0,0
    ],
    "1": [
      0,0,1,0,0,
      0,1,1,0,0,
      0,0,1,0,0,
      0,0,1,0,0,
      0,0,1,0,0,
      0,0,1,0,0,
      0,1,1,1,0
    ],
    "2": [
      0,1,1,1,0,
      1,0,0,0,1,
      0,0,0,0,1,
      0,0,0,1,0,
      0,0,1,0,0,
      0,1,0,0,0,
      1,1,1,1,1
    ],
    "3": [
      1,1,1,1,0,
      0,0,0,0,1,
      0,0,0,0,1,
      0,1,1,1,0,
      0,0,0,0,1,
      0,0,0,0,1,
      1,1,1,1,0
    ],
    "4": [
      0,0,0,1,0,
      0,0,1,1,0,
      0,1,0,1,0,
      1,0,0,1,0,
      1,1,1,1,1,
      0,0,0,1,0,
      0,0,0,1,0
    ],
    "5": [
      1,1,1,1,1,
      1,0,0,0,0,
      1,1,1,1,0,
      0,0,0,0,1,
      0,0,0,0,1,
      1,0,0,0,1,
      0,1,1,1,0
    ],
    "6": [
      0,1,1,1,0,
      1,0,0,0,0,
      1,0,0,0,0,
      1,1,1,1,0,
      1,0,0,0,1,
      1,0,0,0,1,
      0,1,1,1,0
    ]
  };

  /**
   * Constrói um template binário composto para uma string de derivação (ex.: "DI", "aVR", "V1")
   */
  function buildLabelBitmap(labelStr) {
    const chars = Array.from(labelStr);
    const charW = 5, charH = 7, spacing = 1;
    const totalW = chars.length * charW + Math.max(0, chars.length - 1) * spacing;
    const bitmap = new Uint8Array(totalW * charH);

    chars.forEach((ch, idx) => {
      const glyph = CHAR_GLYPHS_5X7[ch] || CHAR_GLYPHS_5X7[ch.toUpperCase()];
      if (!glyph) return;
      const offsetX = idx * (charW + spacing);
      for (let y = 0; y < charH; y++) {
        for (let x = 0; x < charW; x++) {
          bitmap[y * totalW + (offsetX + x)] = glyph[y * charW + x];
        }
      }
    });

    return { width: totalW, height: charH, data: bitmap };
  }

  const LABEL_TEMPLATES = {};
  ["DI", "DII", "DIII", "I", "II", "III", "aVR", "AVR", "aVL", "AVL", "aVF", "AVF", "V1", "V2", "V3", "V4", "V5", "V6"].forEach(lbl => {
    LABEL_TEMPLATES[lbl] = buildLabelBitmap(lbl);
  });

  /**
   * Renderiza um rótulo matricial no ImageData (útil para geradores de referência de teste e validação de OCR)
   */
  function drawBitmapLabelOnImageData(imageData, labelStr, startX, startY, scale = 2, color = [15, 15, 15]) {
    const tpl = LABEL_TEMPLATES[labelStr] || buildLabelBitmap(labelStr);
    const { width, height, data } = imageData;
    for (let ty = 0; ty < tpl.height; ty++) {
      for (let tx = 0; tx < tpl.width; tx++) {
        if (!tpl.data[ty * tpl.width + tx]) continue;
        for (let sy = 0; sy < scale; sy++) {
          for (let sx = 0; sx < scale; sx++) {
            const px = Math.round(startX + tx * scale + sx);
            const py = Math.round(startY + ty * scale + sy);
            if (px >= 0 && px < width && py >= 0 && py < height) {
              const idx = (py * width + px) * 4;
              data[idx] = color[0];
              data[idx + 1] = color[1];
              data[idx + 2] = color[2];
              data[idx + 3] = 255;
            }
          }
        }
      }
    }
  }

  /**
   * Avalia a qualidade ótica de um frame ImageData
   */
  function analyzeFrameQuality(imageData, roi = null) {
    if (!imageData || !imageData.data || !imageData.width || !imageData.height) {
      return {
        sharpnessScore: 0,
        isSharp: false,
        brightness: 0,
        glareRatio: 0,
        shadowRatio: 0,
        contrastEnergy: 0,
        isLightingGood: false,
        hasSufficientContrast: false,
        isAdequate: false
      };
    }

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

    const step = Math.max(1, Math.min(2, Math.floor(Math.min(endX - startX, endY - startY) / 60)));
    const rowStride = width * 4;

    for (let y = startY + 1; y < endY - 1; y += step) {
      const rowOffset = y * rowStride;
      for (let x = startX + 1; x < endX - 1; x += step) {
        const idx = rowOffset + x * 4;
        const r = data[idx];
        const g = data[idx + 1];
        const b = data[idx + 2];

        const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        sumLuma += luma;
        sampleCount++;

        if (luma > 248) glarePixels++;
        if (luma < 25) shadowPixels++;

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
        isLightingGood: false,
        hasSufficientContrast: false,
        isAdequate: false
      };
    }

    const meanLuma = sumLuma / sampleCount;
    const sharpnessScore = Math.round(laplacianVarSum / sampleCount);
    const glareRatio = glarePixels / sampleCount;
    const shadowRatio = shadowPixels / sampleCount;
    const contrastEnergy = highFrequencyEnergy / sampleCount;

    const isSharp = sharpnessScore >= 35;
    const isLightingGood = meanLuma >= 45 && meanLuma <= 245 && glareRatio < 0.25 && shadowRatio < 0.40;
    const hasSufficientContrast = contrastEnergy > 0.012;

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
   * 1. Localiza os limites efetivos da folha, avalia inclinação (skew) e distorção de perspectiva
   */
  function locatePaperSheet(imageData) {
    const { width, height, data } = imageData;
    if (!width || !height) {
      return { found: false, reason: "Imagem vazia" };
    }

    // Perfil de luminosidade por linha e coluna para achar o retângulo do papel claro
    const rowBright = new Float32Array(height);
    const colBright = new Float32Array(width);
    let totalBright = 0;

    const step = Math.max(1, Math.floor(Math.min(width, height) / 180));
    let sampledCols = 0, sampledRows = 0;

    for (let y = 0; y < height; y += step) {
      let rSum = 0, cCount = 0;
      for (let x = 0; x < width; x += step) {
        const idx = (y * width + x) * 4;
        const luma = 0.2126 * data[idx] + 0.7152 * data[idx + 1] + 0.0722 * data[idx + 2];
        rSum += luma;
        cCount++;
      }
      rowBright[y] = rSum / Math.max(1, cCount);
      totalBright += rowBright[y];
      sampledRows++;
    }

    for (let x = 0; x < width; x += step) {
      let cSum = 0, rCount = 0;
      for (let y = 0; y < height; y += step) {
        const idx = (y * width + x) * 4;
        const luma = 0.2126 * data[idx] + 0.7152 * data[idx + 1] + 0.0722 * data[idx + 2];
        cSum += luma;
        rCount++;
      }
      colBright[x] = cSum / Math.max(1, rCount);
      sampledCols++;
    }

    const globalMeanLuma = totalBright / Math.max(1, sampledRows);
    const threshold = Math.max(105, globalMeanLuma * 0.72);

    let minY = 0, maxY = height - 1;
    if (minY % step !== 0) minY = Math.floor(minY / step) * step;
    if (maxY % step !== 0) maxY = Math.floor(maxY / step) * step;
    while (minY < height - 1 && rowBright[minY] < threshold) minY += step;
    while (maxY > minY && rowBright[maxY] < threshold) maxY -= step;

    let minX = 0, maxX = width - 1;
    if (minX % step !== 0) minX = Math.floor(minX / step) * step;
    if (maxX % step !== 0) maxX = Math.floor(maxX / step) * step;
    while (minX < width - 1 && colBright[minX] < threshold) minX += step;
    while (maxX > minX && colBright[maxX] < threshold) maxX -= step;

    // Medir as larguras da folha no topo vs na base para detectar perspectiva trapezoidal severa
    const topY = Math.min(height - 1, Math.max(0, Math.round(minY + (maxY - minY) * 0.12)));
    const botY = Math.min(height - 1, Math.max(0, Math.round(minY + (maxY - minY) * 0.88)));

    function measureRowPaperSpan(y) {
      let left = 0, right = width - 1;
      while (left < width && (0.2126 * data[(y * width + left) * 4] + 0.7152 * data[(y * width + left) * 4 + 1] + 0.0722 * data[(y * width + left) * 4 + 2]) < threshold) left++;
      while (right > left && (0.2126 * data[(y * width + right) * 4] + 0.7152 * data[(y * width + right) * 4 + 1] + 0.0722 * data[(y * width + right) * 4 + 2]) < threshold) right--;
      return { left, right, span: Math.max(0, right - left) };
    }

    const topSpan = measureRowPaperSpan(topY);
    const botSpan = measureRowPaperSpan(botY);

    let trapezoidRatio = 1.0;
    if (topSpan.span > 20 && botSpan.span > 20) {
      trapezoidRatio = Math.min(topSpan.span, botSpan.span) / Math.max(topSpan.span, botSpan.span);
    }

    const widthRatio = (maxX - minX) / width;
    const heightRatio = (maxY - minY) / height;

    // Se a folha está cortada demais ou ocupa fração minúscula (< 45% largura ou < 40% altura),
    // ou se o papel encosta exatamente nas 4 margens sem borda de mesa
    const touchesAllBorders = (minX === 0 && maxX === width - 1 && minY === 0 && maxY === height - 1);
    const isCutOff = (widthRatio < 0.45 || heightRatio < 0.40) || touchesAllBorders;
    const hasSeverePerspective = trapezoidRatio < 0.74;

    return {
      found: globalMeanLuma >= 80,
      isCutOff,
      touchesAllBorders,
      hasSeverePerspective,
      trapezoidRatio: Number(trapezoidRatio.toFixed(3)),
      corners: {
        topLeft: { x: topSpan.left, y: topY },
        topRight: { x: topSpan.right, y: topY },
        bottomLeft: { x: botSpan.left, y: botY },
        bottomRight: { x: botSpan.right, y: botY }
      },
      boundaries: {
        xMin: Number((minX / width).toFixed(4)),
        yMin: Number((minY / height).toFixed(4)),
        xMax: Number((maxX / width).toFixed(4)),
        yMax: Number((maxY / height).toFixed(4)),
        widthRatio: Number(widthRatio.toFixed(4)),
        heightRatio: Number(heightRatio.toFixed(4)),
        aspectRatio: Number(((maxX - minX) / Math.max(1, maxY - minY)).toFixed(3))
      }
    };
  }

  /**
   * 2. Corrige perspectiva trapezoidal ou rotação afim (deskew / homografia simplificada) em um ImageData
   */
  function rectifyImagePerspective(imageData, corners, angleDeg = 0) {
    const { width, height, data } = imageData;
    const out = new Uint8ClampedArray(width * height * 4);
    out.fill(250);

    const rad = (-angleDeg * Math.PI) / 180;
    const cosA = Math.cos(rad);
    const sinA = Math.sin(rad);
    const cx = width / 2;
    const cy = height / 2;

    const useTrapezoid = corners && corners.topLeft && corners.bottomLeft &&
      Math.abs((corners.topRight.x - corners.topLeft.x) - (corners.bottomRight.x - corners.bottomLeft.x)) > width * 0.04;

    for (let y = 0; y < height; y++) {
      const v = y / Math.max(1, height - 1);
      for (let x = 0; x < width; x++) {
        let srcX = x;
        let srcY = y;

        if (useTrapezoid) {
          const u = x / Math.max(1, width - 1);
          const topX = corners.topLeft.x + u * (corners.topRight.x - corners.topLeft.x);
          const botX = corners.bottomLeft.x + u * (corners.bottomRight.x - corners.bottomLeft.x);
          const topY = corners.topLeft.y + u * (corners.topRight.y - corners.topLeft.y);
          const botY = corners.bottomLeft.y + u * (corners.bottomRight.y - corners.bottomLeft.y);
          srcX = topX + v * (botX - topX);
          srcY = topY + v * (botY - topY);
        } else if (Math.abs(angleDeg) > 0.25) {
          const dx = x - cx;
          const dy = y - cy;
          srcX = cx + dx * cosA - dy * sinA;
          srcY = cy + dx * sinA + dy * cosA;
        }

        const ix = Math.round(srcX);
        const iy = Math.round(srcY);
        if (ix >= 0 && ix < width && iy >= 0 && iy < height) {
          const dstIdx = (y * width + x) * 4;
          const srcIdx = (iy * width + ix) * 4;
          out[dstIdx] = data[srcIdx];
          out[dstIdx + 1] = data[srcIdx + 1];
          out[dstIdx + 2] = data[srcIdx + 2];
          out[dstIdx + 3] = data[srcIdx + 3];
        }
      }
    }

    return { width, height, data: out };
  }

  /**
   * 3. Estima a orientação do ECG (0°, 90°, 180°, 270°) e ângulo fino de inclinação (skew)
   * Baseia-se na anisotropia horizontal vs vertical dos traçados de ECG (ondas propagam-se horizontalmente).
   */
  function detectOrientationAndSkew(imageData) {
    const { width, height, data } = imageData;
    let horizGradSum = 0;
    let vertGradSum = 0;
    let darkTopHalf = 0;
    let darkBottomHalf = 0;

    // Medir continuidade de tinta preta na direção horizontal vs vertical
    let horizRunTransitions = 0;
    let vertRunTransitions = 0;

    const step = 2;
    for (let y = step; y < height - step; y += step) {
      let prevDarkH = false;
      for (let x = step; x < width - step; x += step) {
        const idx = (y * width + x) * 4;
        const luma = 0.2126 * data[idx] + 0.7152 * data[idx + 1] + 0.0722 * data[idx + 2];
        const isDark = luma < 125 && Math.abs(data[idx] - data[idx + 2]) < 55;

        if (isDark !== prevDarkH) horizRunTransitions++;
        prevDarkH = isDark;

        if (isDark) {
          if (y < height / 2) darkTopHalf++;
          else darkBottomHalf++;
        }

        const idxR = (y * width + (x + step)) * 4;
        const idxD = ((y + step) * width + x) * 4;
        const lumaR = 0.2126 * data[idxR] + 0.7152 * data[idxR + 1] + 0.0722 * data[idxR + 2];
        const lumaD = 0.2126 * data[idxD] + 0.7152 * data[idxD + 1] + 0.0722 * data[idxD + 2];

        horizGradSum += Math.abs(luma - lumaR);
        vertGradSum += Math.abs(luma - lumaD);
      }
    }

    for (let x = step; x < width - step; x += step) {
      let prevDarkV = false;
      for (let y = step; y < height - step; y += step) {
        const idx = (y * width + x) * 4;
        const luma = 0.2126 * data[idx] + 0.7152 * data[idx + 1] + 0.0722 * data[idx + 2];
        const isDark = luma < 125 && Math.abs(data[idx] - data[idx + 2]) < 55;
        if (isDark !== prevDarkV) vertRunTransitions++;
        prevDarkV = isDark;
      }
    }

    // Em um ECG na orientação correta (horizontal), uma linha vertical cruza cada faixa 1 vez (poucas transições verticais por linha, mas uma varredura vertical cruza as faixas; e nos picos QRS há deflexões).
    // Avaliamos a variância da projeção de linhas (row projection variance) vs colunas (col projection variance)
    const rowDarkCounts = new Float32Array(height);
    const colDarkCounts = new Float32Array(width);
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * 4;
        const luma = 0.2126 * data[idx] + 0.7152 * data[idx + 1] + 0.0722 * data[idx + 2];
        if (luma < 130 && Math.abs(data[idx] - data[idx + 2]) < 55) {
          rowDarkCounts[y]++;
          colDarkCounts[x]++;
        }
      }
    }

    const rowNormVar = computeNormalizedVariance(rowDarkCounts, width);
    const colNormVar = computeNormalizedVariance(colDarkCounts, height);

    // Se a variância das colunas for muito maior que a das linhas, as linhas de base das derivações estão na vertical (ECG girado 90° ou 270°)
    const isRotated90 = colNormVar > rowNormVar * 1.65 && colNormVar > 0.002;

    // Estimativa de ângulo fino de skew (-12° a +12°) buscando o ângulo que maximiza a nitidez do perfil horizontal
    let bestAngleDeg = 0;
    let maxScore = -1;
    const sampleStep = Math.max(1, Math.floor(Math.min(width, height) / 120));

    for (let angle = -10; angle <= 10; angle += 1) {
      const tanA = Math.tan((angle * Math.PI) / 180);
      const proj = new Float32Array(height);
      for (let y = 0; y < height; y += sampleStep) {
        for (let x = 0; x < width; x += sampleStep) {
          const idx = (y * width + x) * 4;
          const luma = 0.2126 * data[idx] + 0.7152 * data[idx + 1] + 0.0722 * data[idx + 2];
          if (luma < 130 && Math.abs(data[idx] - data[idx + 2]) < 55) {
            const shiftedY = Math.round(y - (x - width / 2) * tanA);
            if (shiftedY >= 0 && shiftedY < height) {
              proj[shiftedY]++;
            }
          }
        }
      }
      let energy = 0;
      for (let i = 1; i < height; i++) {
        const d = proj[i] - proj[i - 1];
        energy += d * d;
      }
      if (energy > maxScore) {
        maxScore = energy;
        bestAngleDeg = angle;
      }
    }

    return {
      isRotated90,
      quadrantDeg: isRotated90 ? 90 : 0,
      skewAngleDeg: bestAngleDeg,
      rowNormVar: Number(rowNormVar.toFixed(5)),
      colNormVar: Number(colNormVar.toFixed(5)),
      needsDeskew: Math.abs(bestAngleDeg) >= 2
    };
  }

  function computeNormalizedVariance(arr, normFactor) {
    if (!arr.length || !normFactor) return 0;
    let sum = 0;
    for (let i = 0; i < arr.length; i++) sum += arr[i] / normFactor;
    const mean = sum / arr.length;
    let sq = 0;
    for (let i = 0; i < arr.length; i++) {
      const d = (arr[i] / normFactor) - mean;
      sq += d * d;
    }
    return sq / arr.length;
  }

  /**
   * 4. Detecta e mede a grade milimetrada do ECG por autocorrelação dos perfis cromáticos/luminosos
   * Retorna o espaçamento real em pixels por milímetro (px/mm), velocidade e ganho
   */
  function detectECGGridAndCalibration(imageData, userCalibration = null, sheetBoundaries = null) {
    const { width, height, data } = imageData;

    const effectiveSheetBoundaries = sheetBoundaries || locatePaperSheet(imageData)?.boundaries || null;

    // Extrair sinal de grade: linhas rosas/vermelhas/laranjas (R - B > 12 ou R - G > 10) ou linhas cinzas finas regulares
    const xGridProfile = new Float32Array(width);
    const yGridProfile = new Float32Array(height);

    let coloredGridPixels = 0;
    let totalSampled = 0;

    const yStart = Math.floor(height * 0.1);
    const yEnd = Math.ceil(height * 0.9);
    const xStart = Math.floor(width * 0.1);
    const xEnd = Math.ceil(width * 0.9);

    for (let y = yStart; y < yEnd; y++) {
      for (let x = xStart; x < xEnd; x++) {
        const idx = (y * width + x) * 4;
        const r = data[idx], g = data[idx + 1], b = data[idx + 2];
        const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        totalSampled++;

        // Peso de linha de grade (colorida ou cinza intermediária, excluindo tinta preta forte luma < 90 e branco puro > 248)
        const redness = Math.max(0, r - Math.max(g, b));
        const isGridCandidate = redness > 10 || (luma >= 145 && luma <= 238);
        if (redness > 12) coloredGridPixels++;

        if (isGridCandidate && luma >= 110) {
          const gridStrength = redness > 10 ? redness * 1.5 : (248 - luma);
          xGridProfile[x] += gridStrength;
          yGridProfile[y] += gridStrength;
        }
      }
    }

    // Remover média móvel local dos perfis para destacar picos periódicos das linhas da grade
    const hpX = highPassProfile(xGridProfile, 15);
    const hpY = highPassProfile(yGridProfile, 15);

    const dominantX = findDominantGridPeriod(hpX, 3, Math.min(80, Math.floor(width / 8)));
    const dominantY = findDominantGridPeriod(hpY, 3, Math.min(80, Math.floor(height / 8)));

    // The fine dotted texture inside a printed square often repeats every
    // 2–4 pixels in a phone photo. It is not the ECG grid spacing. Measure a
    // second, structural profile from the strongest recurring grid lines and
    // prefer it only when both axes agree. This preserves normal scans while
    // preventing a dotted pattern from shrinking the voltage scale by 4–5×.
    const strongX = findStrongGridPeriod(xGridProfile, 5, Math.min(100, Math.floor(width / 7)));
    const strongY = findStrongGridPeriod(yGridProfile, 5, Math.min(100, Math.floor(height / 7)));
    const strongAxesAgree = strongX.period > 0 && strongY.period > 0 &&
      Math.abs(strongX.period - strongY.period) / Math.max(strongX.period, strongY.period) <= 0.2;
    const useStrongPeriod = strongAxesAgree && strongX.confidence >= 0.22 && strongY.confidence >= 0.22;
    const periodX = useStrongPeriod ? strongX : dominantX;
    const periodY = useStrongPeriod ? strongY : dominantY;

    // Detecção do pulso retangular de calibração (1 mV = 10 mm de altura, 200 ms = 5 mm de largura)
    const calPulse = detectCalibrationPulse(imageData, effectiveSheetBoundaries);

    const gridAxesAgree = periodX.period > 0 && periodY.period > 0 &&
      Math.abs(periodX.period - periodY.period) / Math.max(periodX.period, periodY.period) <= 0.22;

    const hasMeasuredGrid = gridAxesAgree && periodX.confidence >= 0.28 && periodY.confidence >= 0.28;

    let pixelsPerMmX = null;
    let pixelsPerMmY = null;

    if (hasMeasuredGrid) {
      // Se o período dominante medido corresponder ao quadrado maior (5 mm) vs menor (1 mm):
      // Em fotos ou imagens de ~1000-2000px de uma folha A4 (210-297mm), 1 mm ~ 3.5 a 8 px, e 5 mm ~ 18 a 40 px.
      // Verificamos se há sub-harmônico em period / 5:
      const subX = evaluateLagCorrelation(hpX, periodX.period / 5);
      const subY = evaluateLagCorrelation(hpY, periodY.period / 5);

      if (periodX.period >= 14 && (subX > 0.12 || periodX.period > width / 65)) {
        // O pico principal é o quadradão de 5 mm
        pixelsPerMmX = periodX.period / 5;
        pixelsPerMmY = periodY.period / 5;
      } else {
        // O pico principal já é 1 mm
        pixelsPerMmX = periodX.period;
        pixelsPerMmY = periodY.period;
      }
    }

    // Determinar velocidade do papel (mm/s) e ganho (mm/mV)
    let paperSpeedMmPerSec = null;
    let gainMmPerMv = null;
    let calibrationSource = "unknown"; // "measured" | "user_confirmed" | "assumed" | "unknown"

    if (userCalibration && userCalibration.confirmedByUser) {
      paperSpeedMmPerSec = Number(userCalibration.paperSpeedMmPerSec) || 25;
      gainMmPerMv = Number(userCalibration.gainMmPerMv) || 10;
      if (userCalibration.pixelsPerMm > 0) {
        pixelsPerMmX = Number(userCalibration.pixelsPerMm);
        pixelsPerMmY = Number(userCalibration.pixelsPerMm);
      }
      calibrationSource = "user_confirmed";
    } else if (hasMeasuredGrid && calPulse.detected && calPulse.confidence >= 0.75) {
      // Medição direta de grade + pulso de calibração 1 mV
      const pulseHeightMm = calPulse.heightPx / pixelsPerMmY;
      const pulseWidthMm = calPulse.widthPx / pixelsPerMmX;
      gainMmPerMv = Math.abs(pulseHeightMm - 5) < Math.abs(pulseHeightMm - 10) ? 5 : 10;
      paperSpeedMmPerSec = Math.abs(pulseWidthMm - 10) < Math.abs(pulseWidthMm - 5) ? 50 : 25;
      calibrationSource = "measured";
    } else if (hasMeasuredGrid) {
      // Grade medida diretamente nos pixels, MAS velocidade e ganho NÃO foram medidos instrumentalmente
      // Separar explicitamente: grade é medida, velocidade e ganho são presumidos (ou padrão)
      paperSpeedMmPerSec = (userCalibration && userCalibration.paperSpeedMmPerSec) || 25;
      gainMmPerMv = (userCalibration && userCalibration.gainMmPerMv) || 10;
      calibrationSource = (userCalibration && userCalibration.confirmedByUser) ? "user_confirmed" : "assumed";
    } else if (userCalibration && userCalibration.allowAssumedStandard) {
      paperSpeedMmPerSec = userCalibration.paperSpeedMmPerSec || 25;
      gainMmPerMv = userCalibration.gainMmPerMv || 10;
      // Estimativa aproximada caso o usuário autorize explicitamente escala presumida
      pixelsPerMmX = width / 250;
      pixelsPerMmY = height / 170;
      calibrationSource = "assumed";
    } else {
      calibrationSource = "unknown";
    }

    const msPerPixel = (pixelsPerMmX && paperSpeedMmPerSec)
      ? (1000 / (paperSpeedMmPerSec * pixelsPerMmX))
      : null;
    const mvPerPixel = (pixelsPerMmY && gainMmPerMv)
      ? (1 / (gainMmPerMv * pixelsPerMmY))
      : null;

    return {
      gridDetected: hasMeasuredGrid,
      coloredGridRatio: Number((coloredGridPixels / Math.max(1, totalSampled)).toFixed(4)),
      gridConfidence: Number(Math.min(periodX.confidence, periodY.confidence).toFixed(3)),
      dominantPeriodPxX: Number(periodX.period.toFixed(2)),
      dominantPeriodPxY: Number(periodY.period.toFixed(2)),
      pixelsPerMmX: pixelsPerMmX ? Number(pixelsPerMmX.toFixed(3)) : null,
      pixelsPerMmY: pixelsPerMmY ? Number(pixelsPerMmY.toFixed(3)) : null,
      paperSpeedMmPerSec,
      gainMmPerMv,
      msPerPixel: msPerPixel ? Number(msPerPixel.toFixed(4)) : null,
      mvPerPixel: mvPerPixel ? Number(mvPerPixel.toFixed(5)) : null,
      pixelsPerMv: mvPerPixel ? Number((1 / mvPerPixel).toFixed(2)) : null,
      calibrationPulse: calPulse,
      calibrationSource,
      gridSpacingSource: hasMeasuredGrid ? "measured" : "unknown",
      speedSource: (calPulse.detected && calPulse.confidence >= 0.75) ? "measured_pulse" : ((userCalibration && userCalibration.confirmedByUser) ? "user_confirmed" : (hasMeasuredGrid ? "assumed_standard" : "unknown")),
      gainSource: (calPulse.detected && calPulse.confidence >= 0.75) ? "measured_pulse" : ((userCalibration && userCalibration.confirmedByUser) ? "user_confirmed" : (hasMeasuredGrid ? "assumed_standard" : "unknown")),
      measurementsAllowed: calibrationSource === "measured" || calibrationSource === "user_confirmed"
    };
  }

  function highPassProfile(profile, windowRadius) {
    const n = profile.length;
    const out = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      let sum = 0, cnt = 0;
      for (let j = Math.max(0, i - windowRadius); j <= Math.min(n - 1, i + windowRadius); j++) {
        sum += profile[j];
        cnt++;
      }
      out[i] = Math.max(0, profile[i] - sum / Math.max(1, cnt));
    }
    return out;
  }

  function evaluateLagCorrelation(profile, lagFloat) {
    const lag = Math.round(lagFloat);
    if (lag < 2 || lag >= profile.length / 2) return 0;
    let num = 0, den = 0;
    for (let i = 0; i < profile.length - lag; i++) {
      num += profile[i] * profile[i + lag];
      den += profile[i] * profile[i];
    }
    return den > 0 ? num / den : 0;
  }

  function findDominantGridPeriod(profile, minLag, maxLag) {
    let bestLag = 0;
    let bestCorr = 0;

    let energy = 0;
    for (let i = 0; i < profile.length; i++) energy += profile[i] * profile[i];
    if (energy <= 1e-6) return { period: 0, confidence: 0 };

    for (let lag = minLag; lag <= maxLag; lag++) {
      let sum = 0;
      for (let i = 0; i < profile.length - lag; i++) {
        sum += profile[i] * profile[i + lag];
      }
      const corr = sum / energy;
      if (corr > bestCorr) {
        bestCorr = corr;
        bestLag = lag;
      }
    }

    return { period: bestLag, confidence: bestCorr };
  }

  // Finds the spacing between recurring *grid lines*, rather than the spacing
  // between dots that make up a grid. A percentile gate keeps text and the
  // waveform out of this calibration-only measurement.
  function findStrongGridPeriod(profile, minLag, maxLag) {
    const sorted = Array.from(profile).sort((a, b) => a - b);
    if (!sorted.length || sorted[sorted.length - 1] <= 1e-6) return { period: 0, confidence: 0 };
    const threshold = sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * 0.94))];
    const peaks = [];
    for (let i = 1; i < profile.length - 1; i++) {
      if (profile[i] < threshold || profile[i] < profile[i - 1] || profile[i] < profile[i + 1]) continue;
      if (peaks.length && i - peaks[peaks.length - 1].index < 3) {
        if (profile[i] > peaks[peaks.length - 1].weight) peaks[peaks.length - 1] = { index: i, weight: profile[i] };
      } else {
        peaks.push({ index: i, weight: profile[i] });
      }
    }
    if (peaks.length < 3) return { period: 0, confidence: 0 };

    let bestPeriod = 0;
    let bestScore = 0;
    const maxWeight = Math.max(...peaks.map(p => p.weight));
    for (let lag = minLag; lag <= maxLag; lag++) {
      let matches = 0;
      let weight = 0;
      for (let i = 0; i < peaks.length; i++) {
        const source = peaks[i];
        for (let j = i + 1; j < peaks.length; j++) {
          const target = peaks[j];
          const distance = target.index - source.index;
          if (distance > lag + 1) break;
          if (Math.abs(distance - lag) <= 1) {
            matches++;
            weight += Math.sqrt(source.weight * target.weight) / Math.max(1, maxWeight);
            break;
          }
        }
      }
      // Short dot-to-dot periods gain many accidental matches; demand that a
      // substantial fraction of the expected grid lines supports the lag.
      const expected = Math.max(2, Math.floor(profile.length / lag) - 1);
      const score = weight / expected;
      if (score > bestScore) {
        bestScore = score;
        bestPeriod = lag;
      }
    }
    return { period: bestPeriod, confidence: Number(Math.min(1, bestScore).toFixed(4)) };
  }

  /**
   * Detecta pulso quadrado de calibração (1 mV) geralmente situado na margem esquerda ou direita das linhas
   */
  function detectCalibrationPulse(imageData, sheetBoundaries = null) {
    const { width, height, data } = imageData;
    const xMinPaper = sheetBoundaries ? Math.max(0, Math.floor(sheetBoundaries.xMin * width)) : 0;
    const xMaxPaper = sheetBoundaries ? Math.min(width, Math.ceil(sheetBoundaries.xMax * width)) : width;
    const yMinPaper = sheetBoundaries ? Math.max(0, Math.floor(sheetBoundaries.yMin * height)) : 0;
    const yMaxPaper = sheetBoundaries ? Math.min(height, Math.ceil(sheetBoundaries.yMax * height)) : height;

    const paperW = xMaxPaper - xMinPaper;
    const paperH = yMaxPaper - yMinPaper;
    const scanMinX = xMinPaper + Math.max(4, Math.floor(paperW * 0.02));
    const scanMaxX = Math.min(xMaxPaper, scanMinX + Math.floor(paperW * 0.12));
    let bestPulse = { detected: false, heightPx: 0, widthPx: 0, confidence: 0 };

    if (scanMaxX <= scanMinX + 10 || paperH < 50) return bestPulse;

    // Procura degrau vertical abrupto seguido de platô plano horizontal e retorno
    for (let yBand = 0; yBand < 3; yBand++) {
      const yMin = yMinPaper + Math.floor(paperH * (0.05 + yBand * 0.28));
      const yMax = yMinPaper + Math.floor(paperH * (0.28 + yBand * 0.28));
      const trace = [];
      for (let x = scanMinX; x < scanMaxX; x++) {
        let sumY = 0, cnt = 0;
        for (let y = yMin; y < yMax; y++) {
          const idx = (y * width + x) * 4;
          const luma = 0.2126 * data[idx] + 0.7152 * data[idx + 1] + 0.0722 * data[idx + 2];
          if (luma < 120 && Math.abs(data[idx] - data[idx + 2]) < 55) {
            sumY += y;
            cnt++;
          }
        }
        trace.push(cnt > 0 ? sumY / cnt : null);
      }

      // Analisar se há um platô retangular elevado em relação à base
      // Um pulso verdadeiro tem: baseLevel -> subida vertical -> platô de 4 a 40 colunas -> descida vertical -> baseLevel
      const valid = trace.filter(v => v !== null);
      if (valid.length > 15) {
        const sorted = [...valid].sort((a, b) => a - b);
        const topPlateau = sorted[Math.floor(sorted.length * 0.15)];
        const baseLevel = sorted[Math.floor(sorted.length * 0.85)];
        const hPx = baseLevel - topPlateau;
        if (hPx >= 15 && hPx <= (yMax - yMin) * 0.85) {
          // Um QRS pode ter muitos pixels no alto e na base, mas não forma um
          // platô contínuo, cercado pela linha de base nos dois lados.
          const state = trace.map(v => {
            if (v === null) return 0;
            if (Math.abs(v - topPlateau) <= 2.5) return 2;
            if (Math.abs(v - baseLevel) <= 2.5) return 1;
            return 0;
          });
          let runStart = -1;
          for (let i = 0; i <= state.length; i++) {
            if (state[i] === 2 && runStart < 0) runStart = i;
            if ((state[i] !== 2 || i === state.length) && runStart >= 0) {
              const runEnd = i;
              const runWidth = runEnd - runStart;
              const before = state.slice(Math.max(0, runStart - 18), runStart).filter(v => v === 1).length;
              const after = state.slice(runEnd, Math.min(state.length, runEnd + 18)).filter(v => v === 1).length;
              if (runWidth >= 6 && runWidth <= 40 && before >= 4 && after >= 4) {
                const bracketScore = Math.min(1, Math.min(before, after) / 8);
                const plateauScore = Math.min(1, runWidth / 10);
                const confidence = Math.min(0.99, 0.55 + bracketScore * 0.25 + plateauScore * 0.2);
                if (confidence > bestPulse.confidence) {
                  bestPulse = {
                    detected: confidence >= 0.75,
                    heightPx: hPx,
                    widthPx: runWidth,
                    confidence: Number(confidence.toFixed(3))
                  };
                }
              }
              runStart = -1;
            }
          }
        }
      }
    }
    return bestPulse;
  }

  /**
   * 5. Reconhece o rótulo de uma região de derivação por correspondência de template multi-escala (OCR especializado de ECG)
   */
  function recognizeLeadLabelInRegion(imageData, roiBox, options = {}) {
    const canonicalExpected = LEAD_SYNONYMS[options.expectedLead] || options.expectedLead;
    if (canonicalExpected && !options.candidateLabels) {
      const expectedResult = recognizeLeadLabelInRegion(imageData, roiBox, {
        candidateLabels: [canonicalExpected],
        scales: [1, 2, 3]
      });
      if (expectedResult.recognized) return expectedResult;
      // Sonda curta para contradições explícitas. Ela mantém o fail-closed
      // (ex.: V3 impresso na célula de DI) sem repetir o OCR completo e lento.
      return recognizeLeadLabelInRegion(imageData, roiBox, {
        candidateLabels: ["DI", "DII", "DIII", "aVR", "aVL", "aVF", "V1", "V2", "V3", "V4", "V5", "V6"]
          .filter(label => label !== canonicalExpected),
        scales: [2]
      });
    }
    const { width, height, data } = imageData;
    const x0 = Math.max(0, Math.floor(roiBox.xMin * width));
    const y0 = Math.max(0, Math.floor(roiBox.yMin * height));
    const x1 = Math.min(width, Math.ceil(roiBox.xMax * width));
    const y1 = Math.min(height, Math.ceil(roiBox.yMax * height));

    // O rótulo de uma derivação normalmente fica no quadrante superior esquerdo ou inferior esquerdo da célula (primeiros 35% horizontais)
    const searchW = Math.max(16, Math.floor((x1 - x0) * 0.38));
    const searchH = Math.max(12, Math.floor((y1 - y0) * 0.85));

    // Encontrar componentes conectados de tinta escura pequenos (candidatos a texto do rótulo)
    // Texto tem alta densidade de bordas curtas em caixa compacta, diferente da linha contínua da curva
    let bestLabel = null;
    let bestScore = 0;
    let secondBestScore = 0;

    const scales = options.scales || [1, 2, 3];
    // Na folha completa, testar apenas o rótulo esperado reduz a busca em 12×
    // e impede que um trecho da grade seja promovido a uma derivação diferente.
    const candidateLabels = options.candidateLabels ||
      ["DI", "DII", "DIII", "aVR", "aVL", "aVF", "V1", "V2", "V3", "V4", "V5", "V6"];

    // Primeiro verifica se há uma caixa de caracteres nítida na zona de rótulo
    for (const labelName of candidateLabels) {
      const tpl = LABEL_TEMPLATES[labelName];
      if (!tpl) continue;

      for (const scale of scales) {
        const tw = tpl.width * scale;
        const th = tpl.height * scale;
        if (tw >= searchW || th >= searchH) continue;

        const stepMultiplier = options.scanStepMultiplier || 1;
        const stepY = Math.max(1, scale * stepMultiplier);
        const stepX = Math.max(1, scale * stepMultiplier);

        for (let sy = y0; sy <= y0 + searchH - th; sy += stepY) {
          for (let sx = x0; sx <= x0 + searchW - tw; sx += stepX) {
            // Verifica se existe silhueta de fundo claro ao redor do texto
            let fgMatches = 0, fgTotal = 0;
            let bgMatches = 0, bgTotal = 0;

            for (let ty = 0; ty < tpl.height; ty++) {
              for (let tx = 0; tx < tpl.width; tx++) {
                const expectedFg = tpl.data[ty * tpl.width + tx] === 1;
                const px = sx + tx * scale;
                const py = sy + ty * scale;
                const idx = (py * width + px) * 4;
                const luma = 0.2126 * data[idx] + 0.7152 * data[idx + 1] + 0.0722 * data[idx + 2];
                const isDark = luma < 115 && Math.abs(data[idx] - data[idx + 2]) < 55;

                if (expectedFg) {
                  fgTotal++;
                  if (isDark) fgMatches++;
                } else {
                  bgTotal++;
                  if (!isDark) bgMatches++;
                }
              }
            }

            const fgRate = fgMatches / Math.max(1, fgTotal);
            const bgRate = bgMatches / Math.max(1, bgTotal);

            // Exige que tanto o caractere escuro quanto o espaço em branco interno batam com precisão
            if (fgRate > 0.78 && bgRate > 0.78) {
              // Verificar se há margem clara imediatamente à direita (evita casar "DI" dentro de "DII" ou "DIII")
              let rightClear = 0, rightTotal = 0;
              for (let ry = sy; ry < sy + th; ry++) {
                for (let rx = sx + tw; rx < Math.min(width, sx + tw + scale * 3); rx++) {
                  const rIdx = (ry * width + rx) * 4;
                  const rLuma = 0.2126 * data[rIdx] + 0.7152 * data[rIdx + 1] + 0.0722 * data[rIdx + 2];
                  rightTotal++;
                  if (rLuma >= 125) rightClear++;
                }
              }
              const rightClearRate = rightTotal > 0 ? rightClear / rightTotal : 1;

              // Bônus de especificidade para strings mais longas (ex.: "DIII" > "DII" > "DI") quando casam perfeitamente
              const specificityBonus = labelName.length * 0.03;
              const score = (fgRate * 0.50 + bgRate * 0.35 + rightClearRate * 0.15) + specificityBonus;

              if (score > bestScore) {
                if (bestLabel !== labelName) secondBestScore = bestScore;
                bestScore = score;
                bestLabel = labelName;
              } else if (labelName !== bestLabel && score > secondBestScore) {
                secondBestScore = score;
              }
            }
          }
        }
      }
    }

    const margin = bestScore - secondBestScore;
    if (bestLabel && bestScore >= 0.88 && margin >= 0.015) {
      const canonicalLead = LEAD_SYNONYMS[bestLabel] || bestLabel;
      return {
        recognized: true,
        lead: canonicalLead,
        recognizedLead: canonicalLead,
        rawText: bestLabel,
        confidence: Number(Math.min(0.99, bestScore).toFixed(3)),
        method: "glyph_template_ocr"
      };
    }

    return {
      recognized: false,
      lead: null,
      recognizedLead: null,
      rawText: null,
      confidence: 0,
      method: "none"
    };
  }

  /**
   * 6. Descobre a topologia real das linhas horizontais de traçado e divisões de colunas na folha
   */
  function discoverWaveformTopology(imageData, boundaries) {
    const { width, height, data } = imageData;
    const xMin = Math.max(0, Math.floor((boundaries?.xMin ?? 0.04) * width));
    const xMax = Math.min(width, Math.ceil((boundaries?.xMax ?? 0.96) * width));
    const yMin = Math.max(0, Math.floor((boundaries?.yMin ?? 0.06) * height));
    const yMax = Math.min(height, Math.ceil((boundaries?.yMax ?? 0.95) * height));

    const spanW = Math.max(1, xMax - xMin);
    const spanH = Math.max(1, yMax - yMin);

    // Mede continuidade horizontal em blocos. Uma linha de base de ECG ocupa
    // grande parte da largura; texto do cabeçalho e QRS isolados não. A grade
    // colorida é excluída pelo limite de cromaticidade.
    const binCount = Math.max(48, Math.min(112, Math.round(spanW / 16)));
    const rowOccupancy = new Float32Array(height);
    for (let y = yMin; y < yMax; y++) {
      let occupied = 0;
      for (let bin = 0; bin < binCount; bin++) {
        const bx0 = Math.floor(xMin + (bin / binCount) * spanW);
        const bx1 = Math.max(bx0 + 1, Math.floor(xMin + ((bin + 1) / binCount) * spanW));
        let found = false;
        for (let yy = Math.max(yMin, y - 1); yy <= Math.min(yMax - 1, y + 1) && !found; yy++) {
          for (let x = bx0; x < bx1; x += 2) {
            const idx = (yy * width + x) * 4;
            const r = data[idx], g = data[idx + 1], b = data[idx + 2];
            const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
            const chroma = Math.max(r, g, b) - Math.min(r, g, b);
            if (luma < 142 && chroma < 48) { found = true; break; }
          }
        }
        if (found) occupied++;
      }
      rowOccupancy[y] = occupied / binCount;
    }

    const candidates = [];
    const headerCutoff = yMin + spanH * 0.055;
    for (let y = Math.ceil(headerCutoff) + 2; y < yMax - 2; y++) {
      const score = (rowOccupancy[y - 1] + rowOccupancy[y] + rowOccupancy[y + 1]) / 3;
      if (score >= 0.16 && score >= rowOccupancy[y - 2] && score >= rowOccupancy[y + 2]) {
        candidates.push({ yCenter: y, score });
      }
    }
    candidates.sort((a, b) => b.score - a.score);
    const minBandGap = Math.max(10, spanH * 0.085);
    const selected = [];
    for (const candidate of candidates) {
      if (selected.every(item => Math.abs(item.yCenter - candidate.yCenter) >= minBandGap)) {
        selected.push(candidate);
      }
      if (selected.length >= 12) break;
    }
    selected.sort((a, b) => a.yCenter - b.yCenter);

    // Fallback proporcional: ainda permite revisão manual sem inventar nomes.
    if (selected.length < 3) {
      for (let i = 0; i < 3; i++) {
        selected.push({ yCenter: yMin + spanH * (0.24 + i * 0.24), score: 0 });
      }
      selected.sort((a, b) => a.yCenter - b.yCenter);
    }

    return {
      rowCount: selected.length,
      bands: selected.map((b, idx) => {
        const prevGap = idx > 0 ? b.yCenter - selected[idx - 1].yCenter : spanH / Math.max(3, selected.length);
        const nextGap = idx < selected.length - 1 ? selected[idx + 1].yCenter - b.yCenter : prevGap;
        const halfSpan = Math.max(12, Math.min(prevGap, nextGap) * 0.43);
        return {
          index: idx,
          continuityScore: Number((b.score || 0).toFixed(3)),
          yCenterRatio: Number((b.yCenter / height).toFixed(4)),
          yMin: Number((Math.max(yMin, b.yCenter - halfSpan) / height).toFixed(4)),
          yMax: Number((Math.min(yMax, b.yCenter + halfSpan) / height).toFixed(4))
        };
      })
    };
  }

  /**
   * 7. Função Principal: Detecta limites, orientação, grade, layout real e valida cada derivação
   * Não retorna `detected: true` apenas por nitidez! Exige evidência morfológica real de traçado e consistência de layout.
   */
  function detectECGBoundaries(imageData, options = {}) {
    if (!imageData || !imageData.data || !imageData.width || !imageData.height) {
      return {
        detected: false,
        confidence: 0,
        boundaries: null,
        detectedLayout: null,
        layoutConfidence: "none",
        anomalies: [{ code: "invalid_image_data" }],
        message: "Imagem inválida ou vazia."
      };
    }

    const { width, height } = imageData;
    const quality = analyzeFrameQuality(imageData);

    // 1. Verificar qualidade ótica mínima
    if (quality.sharpnessScore < 18 || quality.brightness < 35) {
      return {
        detected: false,
        confidence: 0,
        boundaries: null,
        detectedLayout: null,
        layoutConfidence: "none",
        quality,
        anomalies: [{ code: "low_sharpness_or_dark" }],
        message: "Imagem escura ou desfocada. Aponte para o ECG com boa iluminação."
      };
    }

    // 2. Localizar folha e avaliar cortes/perspectiva
    // When the user has already placed four corners and we have rectified
    // the selected paper, it naturally touches every border of the output.
    // The ordinary paper detector calls that a "cut-off" and previously
    // rejected every such legitimate full-page photo before waveform search.
    // The explicit quad only certifies the ROI, NOT any ECG morphology.
    const sheet = options.paperAlreadyRectified === true
      ? {
          found:true, isCutOff:false, touchesAllBorders:true,
          hasSeverePerspective:false, manuallyRectified:true,
          corners:{
            topLeft:{x:0,y:0}, topRight:{x:width-1,y:0},
            bottomLeft:{x:0,y:height-1}, bottomRight:{x:width-1,y:height-1}
          },
          boundaries:{
            xMin:.01,yMin:.01,xMax:.99,yMax:.99,
            widthRatio:.98,heightRatio:.98,aspectRatio:width/height
          }
        }
      : locatePaperSheet(imageData);
    if (!sheet.found || sheet.isCutOff) {
      return {
        detected: false,
        confidence: 0.1,
        boundaries: sheet.boundaries || null,
        detectedLayout: null,
        layoutConfidence: "none",
        quality,
        sheet,
        anomalies: [{ code: "paper_cutoff_or_not_found" }],
        message: "Folha do ECG parcialmente cortada ou fora de quadro. Enquadre a folha inteira."
      };
    }

    if (sheet.hasSeverePerspective && !options.allowPerspectiveRectification) {
      return {
        detected: false,
        confidence: 0.2,
        boundaries: sheet.boundaries,
        detectedLayout: null,
        layoutConfidence: "none",
        quality,
        sheet,
        anomalies: [{ code: "severe_perspective_distortion" }],
        message: "Perspectiva muito inclinada. Posicione a câmera paralela à folha do ECG."
      };
    }

    // 3. Avaliar orientação (0/90/180/270) e inclinação
    const orientation = detectOrientationAndSkew(imageData);
    // Column-vs-row ink variance is only a heuristic: vertical separators,
    // lead labels and certain ECG layouts trigger many false 90° positives.
    // Never reject a photo solely on this test. Continue to check the REAL
    // waveform/layout evidence below. The user can rotate the photo manually
    // if the waveform detector subsequently cannot recover usable leads.

    // 4. Medir grade milimetrada e calibração
    const calibration = detectECGGridAndCalibration(imageData, options.userCalibration || null, sheet.boundaries);

    // 5. Descobrir topologia das faixas de traçado
    const topology = discoverWaveformTopology(imageData, sheet.boundaries);

    // Se não há faixas horizontais de traçado ou há excesso de linhas densas (como página de texto comum)
    if (topology.rowCount < 1 || topology.rowCount > 15) {
      return {
        detected: false,
        confidence: 0.1,
        boundaries: sheet.boundaries,
        detectedLayout: null,
        leads: {},
        leadIdentities: {},
        layoutConfidence: "none",
        quality,
        calibration,
        gridCalibration: calibration,
        topology,
        anomalies: [{ code: topology.rowCount === 0 ? "no_waveform_traces" : "dense_text_or_noise" }],
        reason: topology.rowCount === 0
          ? "Grade ou papel sem traçados eletrocardiográficos detectáveis."
          : "Padrão incompatível com ECG (possível página de texto ou ruído).",
        message: topology.rowCount === 0
          ? "Grade ou papel sem traçados eletrocardiográficos detectáveis."
          : "Padrão incompatível com ECG (possível página de texto ou ruído)."
      };
    }

    // 6. Testar hipóteses de layout e validar cada célula com o extrator real + OCR de rótulos
    const extractor = global.LuriaEcgSignalExtractor;
    const layoutEvaluation = evaluateAndMapLeadRegions(imageData, sheet.boundaries, topology, calibration, extractor);

    if (!layoutEvaluation.isValidECG) {
      return {
        detected: false,
        confidence: layoutEvaluation.confidence,
        boundaries: sheet.boundaries,
        detectedLayout: null,
        leads: {},
        candidateRegions: layoutEvaluation.candidateRegions || {},
        waveformCandidateCount: Number(layoutEvaluation.validWaveformCells || 0),
        leadIdentities: layoutEvaluation.leadIdentities || {},
        cellIdentities: layoutEvaluation.cellIdentities || {},
        layoutConfidence: layoutEvaluation.layoutConfidence,
        sheet,
        quality,
        calibration,
        gridCalibration: calibration,
        topology,
        orientation,
        recognizedLabels: layoutEvaluation.recognizedLabels || {},
        anomalies: contracts.normalizeAnomalies(layoutEvaluation.anomalies),
        reason: layoutEvaluation.message,
        message: layoutEvaluation.message
      };
    }

    const leadsMap = layoutEvaluation.detectedLayout?.leads || {};

    return {
      detected: true,
      confidence: layoutEvaluation.confidence,
      boundaries: sheet.boundaries,
      detectedLayout: layoutEvaluation.detectedLayout,
      leads: leadsMap,
      candidateRegions: layoutEvaluation.candidateRegions || {},
      waveformCandidateCount: Number(layoutEvaluation.validWaveformCells || 0),
      leadIdentities: layoutEvaluation.leadIdentities || {},
      cellIdentities: layoutEvaluation.cellIdentities || {},
      layoutConfidence: layoutEvaluation.layoutConfidence,
      recognizedLabels: layoutEvaluation.recognizedLabels,
      anomalies: contracts.normalizeAnomalies(layoutEvaluation.anomalies),
      quality,
      calibration,
      gridCalibration: calibration,
      orientation,
      topology,
      sheet,
      layoutId: layoutEvaluation.detectedLayout?.name || "standard_3x4",
      reason: layoutEvaluation.message,
      message: layoutEvaluation.message
    };
  }

  /**
   * Avalia a disposição real das células, executa OCR nos rótulos visíveis,
   * detecta rótulos trocados/duplicados/ausentes e recusa atribuições sem evidência
   */
  function evaluateAndMapLeadRegions(imageData, boundaries, topology, calibration, extractor) {
    const { width, height } = imageData;
    const anomalies = [];
    const xMin = boundaries?.xMin ?? 0.04;
    const xMax = boundaries?.xMax ?? 0.96;
    const yMin = boundaries?.yMin ?? 0.08;
    const yMax = boundaries?.yMax ?? 0.92;

    // Layouts paisagem com 3–8 faixas são quase sempre 3×4 com zero ou mais
    // tiras de ritmo. O código anterior convertia qualquer folha de 5–7 faixas
    // em 6×2, inclusive fotos reais 3×4 + três ritmos.
    const paperAspect = ((xMax - xMin) * width) / Math.max(1, (yMax - yMin) * height);
    let candidateTemplate = LAYOUT_TEMPLATES["3x4_standard"];
    if (paperAspect >= 1.18 && topology.rowCount >= 4 && topology.rowCount <= 8) {
      candidateTemplate = LAYOUT_TEMPLATES["3x4_plus_rhythm"];
    } else if (paperAspect < 1.18 && topology.rowCount >= 5 && topology.rowCount <= 7) {
      candidateTemplate = LAYOUT_TEMPLATES["6x2_standard"];
    } else if (topology.rowCount >= 10 && topology.rowCount <= 13) {
      candidateTemplate = LAYOUT_TEMPLATES["12x1_stacked"];
    }

    // Construir caixas candidatas baseadas nas bandas reais detectadas (ou subdivisão da área útil)
    const numMainRows = candidateTemplate.grid.length;
    const numCols = candidateTemplate.grid[0].length;
    const hasRhythmRow = candidateTemplate.rhythmRows.length > 0;
    const totalRows = numMainRows + (hasRhythmRow ? 1 : 0);

    let mainBands = topology.bands;
    if (candidateTemplate.name.startsWith("3x4") && topology.bands.length > 3) {
      let best = null;
      for (let start = 0; start <= topology.bands.length - 3; start++) {
        const group = topology.bands.slice(start, start + 3);
        const gapA = group[1].yCenterRatio - group[0].yCenterRatio;
        const gapB = group[2].yCenterRatio - group[1].yCenterRatio;
        const avgGap = (gapA + gapB) / 2;
        if (avgGap < (yMax - yMin) * 0.075 || avgGap > (yMax - yMin) * 0.24) continue;
        const regularity = Math.abs(gapA - gapB) / Math.max(0.001, avgGap);
        const continuity = group.reduce((sum, band) => sum + Number(band.continuityScore || 0), 0) / 3;
        // In 3x4 + rhythm printouts the three canonical rows precede the
        // full-width rhythm strips. Several rhythm strips can be even more
        // regular/continuous than the canonical rows, so use a modest early-
        // page prior after the header band. Without it, lower rhythm strips
        // were incorrectly split into four and named DI/aVR/V1/V4.
        const earlyPagePrior = group[0].yCenterRatio * 0.12;
        const score = regularity - continuity * 0.18 + earlyPagePrior;
        if (!best || score < best.score) best = { score, group };
      }
      if (best) mainBands = best.group;
    }

    const cellBoxes = [];
    for (let r = 0; r < numMainRows; r++) {
      // Se o número de bandas detectadas bate com totalRows, usa a coordenada Y real da banda!
      const band = (mainBands.length >= numMainRows && mainBands[r]) ? mainBands[r] : null;
      const rowYMin = band ? band.yMin : (yMin + (r / totalRows) * (yMax - yMin));
      const rowYMax = band ? band.yMax : (yMin + ((r + 0.92) / totalRows) * (yMax - yMin));

      for (let c = 0; c < numCols; c++) {
        const colXMin = xMin + (c / numCols) * (xMax - xMin);
        const colXMax = xMin + ((c + 0.96) / numCols) * (xMax - xMin);
        const expectedLead = candidateTemplate.grid[r][c];
        cellBoxes.push({
          row: r,
          col: c,
          expectedLead,
          xMin: Number(colXMin.toFixed(4)),
          xMax: Number(colXMax.toFixed(4)),
          yMin: Number(rowYMin.toFixed(4)),
          yMax: Number(rowYMax.toFixed(4))
        });
      }
    }

    // Avaliar cada célula: (A) Possui traçado eletrocardiográfico real? (B) Qual rótulo foi lido pelo OCR?
    const recognizedLabels = {};
    const leadIdentities = {};
    const cellIdentities = {};
    const labelCounts = {};
    const dynamicLeadsMap = {};
    // Geometrically located traces are candidates, never named/verified leads.
    // Preserve them even if the document OCR conflicts, so photos can be
    // reviewed instead of returning the misleading "nothing found".
    const candidateRegions = {};
    let validWaveformCells = 0;
    let ocrConfirmedCount = 0;
    let labelMismatchCount = 0;
    let overlappingCellsCount = 0;

    for (const cell of cellBoxes) {
      const rx0 = Math.round(cell.xMin * width);
      const ry0 = Math.round(cell.yMin * height);
      const rw = Math.max(1, Math.round((cell.xMax - cell.xMin) * width));
      const rh = Math.max(1, Math.round((cell.yMax - cell.yMin) * height));

      const cropData = cropSubImageData(imageData, rx0, ry0, rw, rh);

      // Reconhecimento de rótulo na célula
      const ocrRes = recognizeLeadLabelInRegion(imageData, cell, { expectedLead: cell.expectedLead });

      // Verificação de sinal real na célula
      let sigRes = { isValid: false, hasMultipleCurves: false };
      if (extractor && typeof extractor.extractRealSignalFromImageData === "function") {
        sigRes = extractor.extractRealSignalFromImageData(cropData, {
          calibration,
          leadLabel: ocrRes.recognized ? ocrRes.lead : cell.expectedLead,
          allowOverlappingPreview: true
        });
      } else {
        // Fallback geométrico rigoroso caso o extrator não esteja carregado
        sigRes = basicCellWaveformCheck(cropData);
      }

      if (sigRes.hasMultipleCurves) {
        overlappingCellsCount++;
      }

      if (sigRes.isValid) {
        validWaveformCells++;
        const slot = cell.expectedLead;
        if (slot && !candidateRegions[slot]) {
          candidateRegions[slot] = {
            row: cell.row, col: cell.col, xMin: cell.xMin, xMax: cell.xMax,
            yMin: cell.yMin, yMax: cell.yMax, expectedInTemplate: slot,
            evidence: "unassigned_waveform_candidate",
            // This text is diagnostic only; never use it to automatically
            // rename the candidate into a confirmed canonical lead.
            observedLabel: ocrRes.recognized ? ocrRes.lead : null
          };
        }
      }

      let assignedLead = null;
      let assignmentEvidence = "unverified";

      if (ocrRes.recognized) {
        ocrConfirmedCount++;
        assignedLead = ocrRes.lead;
        assignmentEvidence = "ocr_verified";
        labelCounts[assignedLead] = (labelCounts[assignedLead] || 0) + 1;

        if (assignedLead !== cell.expectedLead) {
          labelMismatchCount++;
        }
      } else if (sigRes.isValid) {
        // Só permite atribuição posicional condicional se nenhuma contradição de rótulo ocorreu
        assignedLead = cell.expectedLead;
        assignmentEvidence = "positional_hypothesis";
      }

      const cellKey = `r${cell.row}_c${cell.col}`;
      const identity = contracts.normalizeLeadIdentity({
        lead: assignedLead,
        expectedLead: cell.expectedLead,
        recognizedLead: ocrRes.recognized ? ocrRes.lead : null,
        rawOcrText: ocrRes.rawText,
        ocrConfidence: ocrRes.confidence,
        method: ocrRes.recognized ? ocrRes.method : "topology_hypothesis",
        evidence: assignmentEvidence,
        region: { xMin: cell.xMin, xMax: cell.xMax, yMin: cell.yMin, yMax: cell.yMax, row: cell.row, col: cell.col }
      });
      cellIdentities[cellKey] = identity;
      if (!ocrRes.recognized && sigRes.isValid) anomalies.push({ code: "missing_label", lead: assignedLead, region: identity.region });
      if (identity.status === "conflicting") anomalies.push(...identity.anomalies);

      if (assignedLead) {
        recognizedLabels[cellKey] = {
          expectedLead: cell.expectedLead,
          assignedLead,
          recognizedLead: ocrRes.recognized ? ocrRes.lead : null,
          ocrRecognized: ocrRes.recognized,
          ocrConfidence: ocrRes.confidence,
          evidence: assignmentEvidence,
          hasValidTrace: sigRes.isValid,
          region: identity.region
        };

        if (sigRes.isValid && !leadIdentities[assignedLead]) leadIdentities[assignedLead] = identity;
        // Uma região sem traçado válido não pode preencher uma derivação capturada.
        if (sigRes.isValid && !dynamicLeadsMap[assignedLead]) dynamicLeadsMap[assignedLead] = {
          col: cell.col,
          row: cell.row,
          xMin: cell.xMin,
          xMax: cell.xMax,
          yMin: cell.yMin,
          yMax: cell.yMax,
          evidence: assignmentEvidence,
          ocrConfidence: ocrRes.confidence,
          expectedInTemplate: cell.expectedLead
        };
      }
    }

    // Verificar rótulos duplicados
    const duplicateLeads = Object.keys(labelCounts).filter(k => labelCounts[k] > 1);
    if (duplicateLeads.length > 0) {
      duplicateLeads.forEach(lead => anomalies.push({ code: "duplicate_label", lead, detail: `OCR leu ${lead} em ${labelCounts[lead]} regiões.` }));
    }

    if (labelMismatchCount > 0) {
      anomalies.push({ code: "non_standard_lead_arrangement" });
    }

    if (overlappingCellsCount > 0) {
      anomalies.push({ code: "overlapping_traces_detected" });
    }

    // Tiras de ritmo prolongadas (ex.: 4ª linha no 3x4+1)
    const rhythmStrips = [];
    if (hasRhythmRow || topology.rowCount >= 4) {
      const lastMainY = mainBands[numMainRows - 1]?.yCenterRatio || 0;
      const rhythmBands = topology.bands.filter(band => band.yCenterRatio > lastMainY + 0.04);
      (rhythmBands.length ? rhythmBands : [{ yMin: 0.79, yMax: 0.94 }]).forEach((rBand, index) => {
        const rBox = { xMin, xMax, yMin: rBand.yMin, yMax: rBand.yMax };
        const rOcr = recognizeLeadLabelInRegion(imageData, rBox);
        rhythmStrips.push({
          name: `${rOcr.recognized ? rOcr.lead : `rhythm_${index + 1}`}_long`,
          lead: rOcr.recognized ? rOcr.lead : null,
          evidence: rOcr.recognized ? "ocr_verified" : "unassigned_rhythm_candidate",
          xMin: rBox.xMin, xMax: rBox.xMax, yMin: rBox.yMin, yMax: rBox.yMax
        });
      });
    }

    // Critérios de recusa segura (Fail-Closed):
    // 1. Se houver rótulos duplicados na mesma folha -> recusar atribuição automática!
    // Duplicidade de OCR bloqueia os nomes, não os pixels. As regiões continuam
    // disponíveis como candidatas para conferência humana.

    // 2. Se menos de 3 células tiverem morfologia real de ECG (e não for captura single-lead explícita)
    if (validWaveformCells < 3) {
      anomalies.push({ code: "insufficient_valid_waveform_regions" });
      return {
        isValidECG: false,
        confidence: Number((validWaveformCells / 12).toFixed(2)),
        detectedLayout: null,
        candidateRegions,
        validWaveformCells,
        layoutConfidence: "rejected_no_ecg_waveforms",
        recognizedLabels,
        leadIdentities,
        cellIdentities,
        anomalies,
        message: "Não foram encontradas derivações eletrocardiográficas válidas suficientes na imagem."
      };
    }

    // A label mismatch is not proof of a safely supported reordered layout.
    // Keep the pixels available as candidates, but do not assign named leads.
    if (labelMismatchCount > 0) {
      anomalies.push({ code: "ambiguous_swapped_leads_without_full_ocr" });
      return {
        isValidECG: false,
        confidence: 0.35,
        detectedLayout: null,
        candidateRegions,
        validWaveformCells,
        layoutConfidence: "rejected_ambiguous_layout",
        recognizedLabels,
        leadIdentities,
        cellIdentities,
        anomalies,
        message: "Há um rótulo impresso fora da posição esperada. Os pixels foram preservados apenas para conferência; nenhuma derivação foi nomeada automaticamente."
      };
    }

    const layoutConfidence = ocrConfirmedCount >= 6
      ? "high_ocr_verified"
      : (validWaveformCells >= 10 ? "medium_topology_verified" : "low_partial");

    const detectedLayout = {
      name: labelMismatchCount > 0 ? `${candidateTemplate.name}_reordered` : candidateTemplate.name,
      description: candidateTemplate.description,
      isPositionalHypothesisOnly: ocrConfirmedCount === 0,
      ocrConfirmedCount,
      validWaveformCells,
      candidateRegions,
      leads: (duplicateLeads.length > 0 || labelMismatchCount > 0) ? candidateRegions : dynamicLeadsMap,
      rhythmStrips
    };

    return {
      isValidECG: true,
      candidateRegions,
      validWaveformCells,
      confidence: Number(Math.min(0.99, (validWaveformCells / 12) * 0.7 + (ocrConfirmedCount / 12) * 0.3).toFixed(3)),
      detectedLayout,
      layoutConfidence,
      recognizedLabels,
      leadIdentities,
      cellIdentities,
      anomalies,
      message: ocrConfirmedCount > 0
        ? `ECG identificado (${validWaveformCells} derivações ativas, ${ocrConfirmedCount} rótulos confirmados via OCR).`
        : `ECG identificado por topologia (${validWaveformCells} regiões de traçado; rótulos em hipótese posicional — requer confirmação).`
    };
  }

  function cropSubImageData(imageData, rx0, ry0, rw, rh) {
    const { width, height, data } = imageData;
    const out = new Uint8ClampedArray(rw * rh * 4);
    for (let y = 0; y < rh; y++) {
      const sy = Math.min(height - 1, Math.max(0, ry0 + y));
      for (let x = 0; x < rw; x++) {
        const sx = Math.min(width - 1, Math.max(0, rx0 + x));
        const srcIdx = (sy * width + sx) * 4;
        const dstIdx = (y * rw + x) * 4;
        out[dstIdx] = data[srcIdx];
        out[dstIdx + 1] = data[srcIdx + 1];
        out[dstIdx + 2] = data[srcIdx + 2];
        out[dstIdx + 3] = data[srcIdx + 3];
      }
    }
    return { width: rw, height: rh, data: out };
  }

  function basicCellWaveformCheck(cropData) {
    const { width, height, data } = cropData;
    let validCols = 0;
    let minY = height, maxY = 0;
    for (let x = 0; x < width; x++) {
      let sumY = 0, cnt = 0;
      for (let y = 1; y < height - 1; y++) {
        const idx = (y * width + x) * 4;
        const luma = 0.2126 * data[idx] + 0.7152 * data[idx + 1] + 0.0722 * data[idx + 2];
        if (luma < 130 && Math.abs(data[idx] - data[idx + 2]) < 55) {
          sumY += y;
          cnt++;
        }
      }
      if (cnt > 0 && cnt < height * 0.35) {
        validCols++;
        const cy = sumY / cnt;
        if (cy < minY) minY = cy;
        if (cy > maxY) maxY = cy;
      }
    }
    const cont = validCols / Math.max(1, width);
    const amp = maxY - minY;
    return {
      isValid: cont >= 0.45 && amp >= 4 && amp <= height * 0.92,
      hasMultipleCurves: false
    };
  }

  /**
   * Calcula o vetor de orientação espacial da câmera para guiar o usuário até a próxima derivação
   */
  function updateSpatialRegistration(state, sheet, leadMap = null) {
    const bounds = sheet?.boundaries || sheet;
    const valid = sheet?.found !== false && !sheet?.isCutOff && !sheet?.hasSeverePerspective &&
      bounds && [bounds.xMin, bounds.xMax, bounds.yMin, bounds.yMax].every(Number.isFinite) &&
      bounds.xMax - bounds.xMin >= 0.2 && bounds.yMax - bounds.yMin >= 0.2;
    if (!valid) {
      state.consecutiveUncertainFrames = (state.consecutiveUncertainFrames || 0) + 1;
      state.trackingLost = true;
      state.registered = false;
      return state;
    }
    if (!state.referenceBounds || !state.referenceLeadMap) {
      state.referenceBounds = { ...bounds };
      state.referenceLeadMap = leadMap ? { ...leadMap } : null;
    }
    state.currentBounds = { ...bounds };
    state.referenceCorners = sheet?.corners || null;
    state.motion = state.previousBounds ? {
      dx: Number((((bounds.xMin + bounds.xMax) - (state.previousBounds.xMin + state.previousBounds.xMax)) / 2).toFixed(4)),
      dy: Number((((bounds.yMin + bounds.yMax) - (state.previousBounds.yMin + state.previousBounds.yMax)) / 2).toFixed(4))
    } : { dx: 0, dy: 0 };
    state.previousBounds = { ...bounds };
    state.trackingLost = false;
    state.registered = Boolean(state.referenceLeadMap);
    state.consecutiveUncertainFrames = 0;
    return state;
  }

  function computeNavigationGuidance(currentMap, targetLead, currentRoiCenter = { x: 0.5, y: 0.5 }, trackingState = {}) {
    const leadsMap = trackingState.referenceLeadMap || currentMap?.leads || currentMap?.detectedLayout?.leads || null;
    if (!currentMap || !leadsMap || !targetLead || !leadsMap[targetLead]) {
      return {
        direction: "unknown",
        dx: 0,
        dy: 0,
        instruction: "Região não identificada. Afaste o celular para localizar novamente o ECG."
      };
    }

    // Se houver rastreamento de referência com perda de coerência (ex.: deslocamento não suportado)
    if (trackingState.trackingLost || !trackingState.registered || !trackingState.currentBounds || !trackingState.referenceBounds) {
      return {
        direction: "lost_reference",
        dx: 0,
        dy: 0,
        instruction: "Referência espacial perdida. Afaste o celular para localizar novamente o ECG."
      };
    }

    const box = leadsMap[targetLead];
    const ref = trackingState.referenceBounds;
    const cur = trackingState.currentBounds;
    const targetCenter = {
      x: cur.xMin + (((box.xMin + box.xMax) / 2 - ref.xMin) / (ref.xMax - ref.xMin)) * (cur.xMax - cur.xMin),
      y: cur.yMin + (((box.yMin + box.yMax) / 2 - ref.yMin) / (ref.yMax - ref.yMin)) * (cur.yMax - cur.yMin)
    };

    const effectiveCenter = {
      x: (typeof currentRoiCenter?.x === "number" && !isNaN(currentRoiCenter.x)) ? currentRoiCenter.x : 0.5,
      y: (typeof currentRoiCenter?.y === "number" && !isNaN(currentRoiCenter.y)) ? currentRoiCenter.y : 0.5
    };

    const dx = targetCenter.x - effectiveCenter.x;
    const dy = targetCenter.y - effectiveCenter.y;
    const dist = Math.hypot(dx, dy);

    if (dist < 0.08) {
      return {
        direction: "centered",
        dx: Number(dx.toFixed(3)),
        dy: Number(dy.toFixed(3)),
        instruction: `Mantenha parado sobre ${targetLead}.`
      };
    }

    const parts = [];
    if (Math.abs(dx) >= 0.06) {
      parts.push(dx > 0 ? "para a direita" : "para a esquerda");
    }
    if (Math.abs(dy) >= 0.06) {
      parts.push(dy > 0 ? "para baixo" : "para cima");
    }

    return {
      direction: parts.join(" e "),
      dx: Number(dx.toFixed(3)),
      dy: Number(dy.toFixed(3)),
      instruction: `Vá para ${targetLead}: mova um pouco ${parts.join(" e ")}.`
    };
  }

  /**
   * Cria o controlador de visão computacional da câmera inteligente
   */
  function createEngine(config = {}) {
    let currentMap = null;
    let previousFrameSignature = null;
    let stabilityCounter = 0;

    function computeFrameSignature(imageData) {
      const { width, height, data } = imageData;
      const sig = new Float32Array(16);
      const stepX = Math.max(1, Math.floor(width / 4));
      const stepY = Math.max(1, Math.floor(height / 4));
      let k = 0;
      for (let gy = 0; gy < 4; gy++) {
        for (let gx = 0; gx < 4; gx++) {
          const x = Math.min(width - 1, gx * stepX + Math.floor(stepX / 2));
          const y = Math.min(height - 1, gy * stepY + Math.floor(stepY / 2));
          const idx = (y * width + x) * 4;
          sig[k++] = 0.2126 * data[idx] + 0.7152 * data[idx + 1] + 0.0722 * data[idx + 2];
        }
      }
      return sig;
    }

    function processFrame(videoElement, canvasElement, options = {}) {
      if (!videoElement || videoElement.videoWidth === 0) {
        return { ok: false, reason: "No video frame" };
      }

      const w = canvasElement.width = Math.min(1280, videoElement.videoWidth);
      const h = canvasElement.height = Math.round(w * (videoElement.videoHeight / videoElement.videoWidth));
      const ctx = canvasElement.getContext("2d", { willReadFrequently: true });
      ctx.drawImage(videoElement, 0, 0, w, h);

      const imageData = ctx.getImageData(0, 0, w, h);
      const frameQuality = analyzeFrameQuality(imageData);

      // Verificação real de estabilidade em 16 zonas da imagem
      const sig = computeFrameSignature(imageData);
      let motionDelta = 0;
      if (previousFrameSignature) {
        for (let i = 0; i < 16; i++) {
          motionDelta += Math.abs(sig[i] - previousFrameSignature[i]);
        }
        motionDelta /= 16;
      }
      previousFrameSignature = sig;

      const motionBlur = motionDelta > 14;
      if (motionBlur) {
        stabilityCounter = Math.max(0, stabilityCounter - 1);
      } else {
        stabilityCounter = Math.min(10, stabilityCounter + 1);
      }
      const isStable = stabilityCounter >= 2;

      const docDetection = detectECGBoundaries(imageData, options);
      if (docDetection.detected && docDetection.detectedLayout) {
        currentMap = docDetection.detectedLayout;
      }

      return {
        ok: true,
        quality: frameQuality,
        isStable,
        motionBlur,
        motionDelta: Number(motionDelta.toFixed(2)),
        docDetection,
        currentMap,
        timestamp: Date.now()
      };
    }

    function reset() {
      currentMap = null;
      previousFrameSignature = null;
      stabilityCounter = 0;
    }

    return {
      processFrame,
      analyzeFrameQuality,
      detectECGBoundaries,
      locatePaperSheet,
      rectifyImagePerspective,
      detectOrientationAndSkew,
      detectECGGridAndCalibration,
      recognizeLeadLabelInRegion,
      discoverWaveformTopology,
      computeNavigationGuidance,
      updateSpatialRegistration,
      cropSubImageData,
      drawBitmapLabelOnImageData,
      reset,
      CANONICAL_LEADS,
      LAYOUT_TEMPLATES,
      STANDARD_LAYOUT_3X4
    };
  }

  const exported = {
    createEngine,
    analyzeFrameQuality,
    detectECGBoundaries,
    locatePaperSheet,
    rectifyImagePerspective,
    detectOrientationAndSkew,
    detectECGGridAndCalibration,
    recognizeLeadLabelInRegion,
    discoverWaveformTopology,
    computeNavigationGuidance,
    updateSpatialRegistration,
    cropSubImageData,
    drawBitmapLabelOnImageData,
    CANONICAL_LEADS,
    LAYOUT_TEMPLATES,
    STANDARD_LAYOUT_3X4
  };

  global.LuriaEcgCvEngine = exported;

  if (typeof module !== "undefined" && module.exports) {
    module.exports = exported;
  }
})(typeof window !== "undefined" ? window : globalThis);


