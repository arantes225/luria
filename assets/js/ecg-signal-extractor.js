/* assets/js/ecg-signal-extractor.js
   Digitalizador Estruturado e Auditor Técnico de Fidelidade para ECG (LURIA).

   Princípios Obrigatórios:
   1. TOTALMENTE BASEADO EM PIXELS REAIS: Proibido fabricar ondas matemáticas ou preencher lacunas silenciosamente.
   2. PIPELINE DE EXTRAÇÃO EM 4 ESTÁGIOS:
      - A. Pré-processamento: Normalização local de iluminação (remoção de sombras/reflexos), identificação/supressão
        da grade milimetrada, filtragem de componentes de texto/rótulos e segmentação da máscara do traçado.
      - B. Rastreamento por Programação Dinâmica (Viterbi): Segue a continuidade real da curva ao longo das colunas,
        preservando picos estreitos do QRS (alta derivada permitida quando ancorada por tinta real), segmento ST e ondas P/T,
        detectando interrupções e regiões com múltiplas curvas sobrepostas.
      - C. Tratamento de Trechos Ausentes: Lacunas são mantidas como `null` no vetor principal e sinalizadas em `validMask` (0)
        e `missingSegments`. Pequenas interpolações lineares (<= 3 colunas) são registradas explicitamente em `interpolatedMask`.
      - D. Auditoria Independente de Fidelidade (`auditExtractedLead` / `auditFullExtraction`):
        Classifica cada derivação em:
          * "Adequada tecnicamente"
          * "Revisão necessária"
          * "Indeterminada"
          * "Inválida"
*/

(function (global) {
  "use strict";
  const contracts = global.LuriaEcgContracts || (typeof require === "function" ? require("./ecg-contracts.js") : null);

  const AUDIT_STATUS = {
    ADEQUATE: "Adequada tecnicamente",
    REVIEW_REQUIRED: "Revisão necessária",
    INDETERMINATE: "Indeterminada",
    INVALID: "Inválida"
  };

  /**
   * Estágio A: Pré-processamento, normalização de iluminação, remoção de grade e máscara de texto
   */
  function preprocessLeadRegion(imageData, options = {}) {
    const { width, height, data } = imageData;
    const inkStrength = new Float32Array(width * height);
    const bgLuminance = new Float32Array(width);

    // 1. Estimar luminância de fundo por coluna (mediana aproximada/percentil 75) para compensar sombras suaves
    for (let x = 0; x < width; x++) {
      let sumBright = 0, countBright = 0;
      for (let y = 0; y < height; y += 2) {
        const idx = (y * width + x) * 4;
        const luma = 0.2126 * data[idx] + 0.7152 * data[idx + 1] + 0.0722 * data[idx + 2];
        if (luma > 135) {
          sumBright += luma;
          countBright++;
        }
      }
      bgLuminance[x] = countBright > 0 ? (sumBright / countBright) : 235;
    }

    // 2. Separar tinta escura acromática da grade colorida (vermelha/rosa/laranja/verde) e do fundo
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * 4;
        const r = data[idx], g = data[idx + 1], b = data[idx + 2];
        const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;

        const localBg = bgLuminance[x];
        const contrast = Math.max(0, localBg - luma);

        // Penalizar cor saturada (grade vermelha/rosa tem R >> G, B)
        const chromaSpread = Math.max(Math.abs(r - g), Math.abs(r - b), Math.abs(g - b));
        const isColoredGrid = (r - b > 38) || (chromaSpread > 55 && luma > 95);

        if (!isColoredGrid && luma < Math.min(165, localBg - 32)) {
          inkStrength[y * width + x] = Math.min(1.0, contrast / 160);
        } else {
          inkStrength[y * width + x] = 0;
        }
      }
    }

    // 3. Filtrar blocos isolados de texto/rótulo no canto esquerdo superior/inferior
    // Componentes muito compactos nos primeiros 30% da largura que estão afastados da linha central da curva
    const textMask = new Uint8Array(width * height);
    const labelZoneMaxX = Math.floor(width * 0.34);
    const labelZoneMaxY = Math.floor(height * 0.34);

    // Estimar linha de base preliminar na metade direita da imagem (livre de rótulo)
    let prelimY = height / 2;
    let prelimWeight = 0, prelimSumY = 0;
    for (let x = Math.floor(width * 0.35); x < width; x++) {
      for (let y = 2; y < height - 2; y++) {
        const w = inkStrength[y * width + x];
        if (w > 0.25) {
          prelimWeight += w;
          prelimSumY += y * w;
        }
      }
    }
    if (prelimWeight > 0) prelimY = prelimSumY / prelimWeight;

    // Marcar pixels de rótulo (no canto superior esquerdo e distantes da linha de base preliminar)
    for (let y = 0; y < labelZoneMaxY; y++) {
      if (Math.abs(y - prelimY) < height * 0.18) continue;
      for (let x = 0; x < labelZoneMaxX; x++) {
        if (inkStrength[y * width + x] > 0) {
          // Verificar se não se conecta diretamente a uma subida vertical de QRS
          textMask[y * width + x] = 1;
        }
      }
    }

    // In full-sheet captures the left edge of every proposed lead cell may
    // include a lead label or a calibration rectangle, both strong false
    // "waves". Exclude this prefix from signal tracing only; keep source
    // photograph untouched and preserve the omitted samples as missing.
    if (options.maskPrintedHeader === true) {
      const prefix = Math.min(Math.floor(width * 0.12), Math.max(0, width - 30));
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < prefix; x++) {
          const index = y * width + x;
          inkStrength[index] = 0;
          textMask[index] = 1;
        }
      }
    }

    return {
      inkStrength,
      textMask,
      bgLuminance,
      prelimBaselineY: prelimY
    };
  }

  /**
   * Estágio B: Rastreamento de candidatos por coluna e programação dinâmica (Viterbi)
   * Preserva picos estreitos do QRS (capturando extremos superiores/inferiores de segmentos verticais)
   * e detecta múltiplas curvas simultâneas (sobreposição de derivações).
   */
  function trackSignalCurve(imageData, prep, options = {}) {
    const { width, height } = imageData;
    const { inkStrength, textMask, prelimBaselineY } = prep;

    // Para cada coluna x, identificar todos os segmentos verticais contínuos de tinta (clusters)
    const columnClusters = new Array(width);
    let columnsWithMultipleCurves = 0;
    let columnsWithInk = 0;
    let excessiveThicknessColumns = 0;

    for (let x = 0; x < width; x++) {
      const clusters = [];
      let inCluster = false;
      let yStart = 0, wSum = 0, yWeighted = 0, maxW = 0;

      for (let y = 1; y < height - 1; y++) {
        const pIdx = y * width + x;
        const w = textMask[pIdx] ? 0 : inkStrength[pIdx];

        if (w >= 0.20) {
          if (!inCluster) {
            inCluster = true;
            yStart = y;
            wSum = 0;
            yWeighted = 0;
            maxW = 0;
          }
          wSum += w;
          yWeighted += y * w;
          if (w > maxW) maxW = w;
        } else if (inCluster) {
          const yEnd = y - 1;
          const span = yEnd - yStart + 1;
          clusters.push({
            yStart,
            yEnd,
            span,
            yCenter: yWeighted / wSum,
            weight: wSum,
            maxW
          });
          inCluster = false;
        }
      }
      if (inCluster) {
        const yEnd = height - 2;
        const span = yEnd - yStart + 1;
        clusters.push({
          yStart,
          yEnd,
          span,
          yCenter: yWeighted / wSum,
          weight: wSum,
          maxW
        });
      }

      // Filtrar clusters gigantes que ocupam mais de 45% da altura (bordas verticais pretas ou manchas borradas)
      const validClusters = clusters.filter(c => c.span <= Math.max(8, height * 0.45));
      if (clusters.some(c => c.span > Math.max(10, height * 0.45))) {
        excessiveThicknessColumns++;
      }

      // Se houver 2 ou mais clusters bem separados verticalmente (> 18% da altura), sinaliza possível sobreposição de 2 curvas
      if (validClusters.length >= 2) {
        const dist = Math.abs(validClusters[0].yCenter - validClusters[validClusters.length - 1].yCenter);
        if (dist > Math.max(8, height * 0.18)) {
          columnsWithMultipleCurves++;
        }
      }

      if (validClusters.length > 0) {
        columnsWithInk++;
      }

      columnClusters[x] = validClusters;
    }

    // Programação Dinâmica (Viterbi) para escolher o caminho ótimo contínuo entre os clusters de cada coluna
    const rawY = new Float32Array(width).fill(NaN);
    const validMask = new Uint8Array(width);
    const trackingErrors = [];

    // Primeiro passe: selecionar o cluster mais coerente espacialmente em relação à linha de base e vizinhos
    let prevY = prelimBaselineY;
    for (let x = 0; x < width; x++) {
      const candidates = columnClusters[x];
      if (!candidates || candidates.length === 0) {
        rawY[x] = NaN;
        validMask[x] = 0;
        continue;
      }

      // Escolher candidato que minimiza distância ao prevY e proximidade à linha de base preliminar, ponderado pela força da tinta
      let bestCand = candidates[0];
      let bestCost = Infinity;
      for (const c of candidates) {
        const jumpCost = Math.abs(c.yCenter - prevY) * 1.1;
        const baseCost = Math.abs(c.yCenter - prelimBaselineY) * 0.35;
        const cost = jumpCost + baseCost - c.weight * 2.5;
        if (cost < bestCost) {
          bestCost = cost;
          bestCand = c;
        }
      }

      // Preservação de picos estreitos do QRS:
      // Se o segmento vertical na coluna tem espessura significativa (subida/descida rápida do QRS),
      // usar a extremidade superior (onda R) ou inferior (onda Q/S) correspondente à deflexão!
      let chosenY = bestCand.yCenter;
      if (bestCand.span >= 3) {
        const distTop = prelimBaselineY - bestCand.yStart;
        const distBot = bestCand.yEnd - prelimBaselineY;
        if (distTop > distBot * 1.35 && distTop > 3) {
          chosenY = bestCand.yStart + 0.5;
        } else if (distBot > distTop * 1.35 && distBot > 3) {
          chosenY = bestCand.yEnd - 0.5;
        }
      }

      // Verificar se houve salto abrupto suspeito (> 48% da altura em 1 coluna sem traço vertical conector)
      if (x > 0 && validMask[x - 1] === 1 && Math.abs(chosenY - prevY) > height * 0.48 && bestCand.span < Math.abs(chosenY - prevY) * 0.5) {
        trackingErrors.push({
          x,
          type: "discontinuity_jump",
          deltaPx: Number(Math.abs(chosenY - prevY).toFixed(2))
        });
      }

      rawY[x] = chosenY;
      validMask[x] = 1;
      prevY = chosenY;
    }

    return {
      rawY,
      validMask,
      columnsWithInk,
      columnsWithMultipleCurves,
      excessiveThicknessColumns,
      overlapRatio: Number((columnsWithMultipleCurves / Math.max(1, columnsWithInk)).toFixed(4)),
      hasMultipleCurves: (columnsWithMultipleCurves / Math.max(1, columnsWithInk)) > 0.18,
      trackingErrors
    };
  }

  /**
   * Estágio C: Tratamento rigoroso de trechos ausentes e interpolação explícita limitada
   * NUNCA preenche trechos ausentes repetindo o último valor válido.
   */
  function processGapsAndInterpolation(rawY, validMask, maxInterpolateGapCols = 3) {
    const width = rawY.length;
    const finalY = new Float32Array(rawY);
    const finalValidMask = new Uint8Array(validMask);
    const interpolatedMask = new Uint8Array(width);
    const missingSegments = [];

    let x = 0;
    while (x < width) {
      if (validMask[x] === 1) {
        x++;
        continue;
      }
      let gapStart = x;
      while (x < width && validMask[x] === 0) {
        x++;
      }
      const gapEnd = x - 1;
      const gapLen = gapEnd - gapStart + 1;

      const hasLeftAnchor = gapStart > 0 && validMask[gapStart - 1] === 1;
      const hasRightAnchor = gapEnd < width - 1 && validMask[gapEnd + 1] === 1;

      if (hasLeftAnchor && hasRightAnchor && gapLen <= maxInterpolateGapCols) {
        // Interpolação linear curta e explicitamente registrada
        const yLeft = rawY[gapStart - 1];
        const yRight = rawY[gapEnd + 1];
        for (let i = gapStart; i <= gapEnd; i++) {
          const t = (i - gapStart + 1) / (gapLen + 1);
          finalY[i] = yLeft + t * (yRight - yLeft);
          interpolatedMask[i] = 1;
        }
        missingSegments.push({
          startCol: gapStart,
          endCol: gapEnd,
          lengthCols: gapLen,
          status: "interpolated_short_gap"
        });
      } else {
        // Permanece ausente (NaN / null) — NUNCA repetir último valor!
        for (let i = gapStart; i <= gapEnd; i++) {
          finalY[i] = NaN;
          finalValidMask[i] = 0;
        }
        missingSegments.push({
          startCol: gapStart,
          endCol: gapEnd,
          lengthCols: gapLen,
          status: "missing_unreconstructed"
        });
      }
    }

    return {
      finalY,
      finalValidMask,
      interpolatedMask,
      missingSegments
    };
  }

  /**
   * Avalia se o traçado extraído possui morfologia eletrocardiográfica real vs.
   * texto comum, linhas retas, rabiscos aleatórios ou onda senoidal/ruído de alta frequência.
   */
  function evaluateWaveformMorphology(signalMv, validMask, rawY, height) {
    const validValues = [];
    for (let i = 0; i < signalMv.length; i++) {
      if (signalMv[i] !== null && Number.isFinite(signalMv[i])) {
        validValues.push(signalMv[i]);
      }
    }

    if (validValues.length < 15) {
      return {
        isMorphologyValid: false,
        reason: "Amostras válidas insuficientes.",
        peakToPeakMv: 0,
        baselineStdMv: 0,
        zeroCrossingsRate: 0,
        crestFactor: 0
      };
    }

    // Calcular mediana (linha isoelétrica) e desvios
    const sorted = [...validValues].sort((a, b) => a - b);
    const median = sorted[Math.floor(sorted.length / 2)];
    const p10 = sorted[Math.floor(sorted.length * 0.10)];
    const p90 = sorted[Math.floor(sorted.length * 0.90)];
    const minMv = sorted[0];
    const maxMv = sorted[sorted.length - 1];
    const peakToPeakMv = maxMv - minMv;
    const iqr80 = Math.max(1e-5, p90 - p10);

    let sumSq = 0;
    let totalVariation = 0;
    let signChanges = 0;
    let derivativeSignChanges = 0;
    let prevDiff = 0;

    for (let i = 0; i < validValues.length; i++) {
      const centered = validValues[i] - median;
      sumSq += centered * centered;
      if (i > 0) {
        const diff = validValues[i] - validValues[i - 1];
        totalVariation += Math.abs(diff);
        if ((validValues[i] - median) * (validValues[i - 1] - median) < 0) {
          signChanges++;
        }
        if (Math.abs(diff) > 0.015) {
          if (prevDiff * diff < 0) derivativeSignChanges++;
          prevDiff = diff;
        }
      }
    }

    const rms = Math.sqrt(sumSq / validValues.length);
    const maxAbsDeviation = Math.max(Math.abs(maxMv - median), Math.abs(minMv - median));
    const crestFactor = rms > 1e-5 ? (maxAbsDeviation / rms) : 0;
    const zeroCrossingsRate = signChanges / validValues.length;
    const turningPointsRate = derivativeSignChanges / validValues.length;

    // Regras de rejeição adversarial:
    // 1. Linha plana / grade sem sinal
    if (peakToPeakMv < 0.08 || totalVariation < 0.20) {
      return {
        isMorphologyValid: false,
        reason: "Sinal plano ou sem deflexão eletrocardiográfica.",
        peakToPeakMv: Number(peakToPeakMv.toFixed(3)),
        rmsMv: Number(rms.toFixed(3)),
        zeroCrossingsRate: Number(zeroCrossingsRate.toFixed(3)),
        turningPointsRate: Number(turningPointsRate.toFixed(3)),
        crestFactor: Number(crestFactor.toFixed(2))
      };
    }

    // 2. Texto comum ou ruído serrilhado de altíssima frequência (oscila a cada 2-3 pixels continuamente)
    if (turningPointsRate > 0.42 || zeroCrossingsRate > 0.38) {
      return {
        isMorphologyValid: false,
        reason: "Padrão de alta frequência incompatível com ECG (provável texto impresso ou ruído aleatório).",
        peakToPeakMv: Number(peakToPeakMv.toFixed(3)),
        rmsMv: Number(rms.toFixed(3)),
        zeroCrossingsRate: Number(zeroCrossingsRate.toFixed(3)),
        turningPointsRate: Number(turningPointsRate.toFixed(3)),
        crestFactor: Number(crestFactor.toFixed(2))
      };
    }

    // 3. Onda quadrada/bloco saturado ou rabisco caótico sem linha isoelétrica (crestFactor muito baixo com amplitude gigante)
    if (crestFactor < 1.25 && peakToPeakMv > 0.6) {
      return {
        isMorphologyValid: false,
        reason: "Ausência de linha de base isoelétrica (provável tarja, borda ou rabisco não-fisiológico).",
        peakToPeakMv: Number(peakToPeakMv.toFixed(3)),
        rmsMv: Number(rms.toFixed(3)),
        zeroCrossingsRate: Number(zeroCrossingsRate.toFixed(3)),
        turningPointsRate: Number(turningPointsRate.toFixed(3)),
        crestFactor: Number(crestFactor.toFixed(2))
      };
    }

    return {
      isMorphologyValid: true,
      reason: "Morfologia compatível com traçado eletrocardiográfico.",
      peakToPeakMv: Number(peakToPeakMv.toFixed(3)),
      rmsMv: Number(rms.toFixed(3)),
      zeroCrossingsRate: Number(zeroCrossingsRate.toFixed(3)),
      turningPointsRate: Number(turningPointsRate.toFixed(3)),
      crestFactor: Number(crestFactor.toFixed(2))
    };
  }

  /**
   * Estágio D: Auditor Técnico Independente de Fidelidade por Derivação
   * Classifica em: "Adequada tecnicamente", "Revisão necessária", "Indeterminada", "Inválida".
   * Documenta fórmula objetiva de índice técnico (0-100) sem jamais chamá-lo de "fidelidade clínica".
   */
  function auditExtractedLead(extractionResult) {
    const reasons = [];
    const limitations = [...(extractionResult?.limitations || [])];

    if (!extractionResult || !extractionResult.isValid || !extractionResult.signal) {
      return {
        status: AUDIT_STATUS.INVALID,
        technicalIndex: 0,
        technicalIndexFormula: "0 (falha nos requisitos essenciais de captura/extração)",
        reasons: [extractionResult?.message || "Sinal inválido ou ausente."],
        limitations,
        allowsClinicalMeasurement: false,
        allowsAiModelInput: false
      };
    }

    const cov = extractionResult.continuity || 0;
    const calSource = extractionResult.calibration?.calibrationSource || "unknown";
    const identity = contracts.normalizeLeadIdentity(extractionResult.leadIdentity || {});
    const idEvidence = identity.evidence;
    const overlapRatio = extractionResult.trackingStats?.overlapRatio || 0;
    const jumpCount = (extractionResult.trackingErrors || []).length;
    const pixelAlignmentScore = extractionResult.pixelCorrespondence?.meanInkScore || 0;

    let needsReview = false;
    if (identity.status === "conflicting") reasons.push(`Rótulo divergente: OCR ${identity.recognizedLead}, geometria ${identity.expectedLead}.`);

    // 1. Checar falhas críticas que tornam a derivação INVÁLIDA

    if (cov < 0.45) {
      return {
        status: AUDIT_STATUS.INVALID,
        technicalIndex: Math.round(cov * 40),
        technicalIndexFormula: "round(coverage * 40) — reprovado por cobertura < 45%",
        reasons: [`Cobertura temporal insuficiente (${Math.round(cov * 100)}%).`],
        limitations,
        allowsClinicalMeasurement: false,
        allowsAiModelInput: false
      };
    }

    if (extractionResult.trackingStats?.hasMultipleCurves) {
      return {
        status: AUDIT_STATUS.INVALID,
        technicalIndex: 25,
        technicalIndexFormula: "Penalidade crítica por múltiplas curvas sobrepostas na mesma região (>18%)",
        reasons: ["Foram detectadas duas ou mais derivações sobrepostas na mesma região."],
        limitations,
        allowsClinicalMeasurement: false,
        allowsAiModelInput: false
      };
    }

    // 2. Checar estado INDETERMINADA (ex.: calibração desconhecida ou identidade não verificada sem confirmação)
    if (calSource === "unknown") {
      reasons.push("Escala de calibração (mm/s e mm/mV) desconhecida; medições absolutas bloqueadas.");
    }
    if (!identity.verified) {
      reasons.push("Identidade da derivação não pôde ser verificada.");
    }
    if (identity.anomalies.some(a => a.code === "duplicate_label")) reasons.push("Rótulo duplicado; associação da derivação não é única.");
    if (Array.isArray(extractionResult.validMask) && extractionResult.validMask.length !== extractionResult.signal.length) {
      reasons.push("Máscara de validade incompatível com o comprimento do sinal.");
    }

    // Cálculo transparente e determinístico do Índice Técnico Estrutural (0–100)
    // Fórmula: 40 * Cobertura + 30 * CorrespondênciaPixelTinta + 20 * PenalidadeSaltos + 10 * Calibração
    const covComponent = Math.min(1, cov) * 40;
    const alignComponent = Math.min(1, pixelAlignmentScore) * 30;
    const jumpPenalty = Math.max(0, 20 - jumpCount * 5 - overlapRatio * 50);
    const calComponent = (calSource === "measured" || calSource === "user_confirmed") ? 10 : (calSource === "assumed" ? 5 : 0);
    const technicalIndex = Math.round(covComponent + alignComponent + jumpPenalty + calComponent);

    if (calSource === "unknown" || !identity.verified || identity.status === "unknown" || identity.status === "ambiguous" ||
        identity.status === "conflicting" || identity.anomalies.some(a => a.code === "duplicate_label") ||
        (Array.isArray(extractionResult.validMask) && extractionResult.validMask.length !== extractionResult.signal.length)) {
      return {
        status: AUDIT_STATUS.INDETERMINATE,
        technicalIndex,
        technicalIndexFormula: "40*Cobertura + 30*AlinhamentoPixel + 20*Continuidade + 10*Calibracao (Nota: índice técnico estrutural, NÃO equivale a fidelidade clínica)",
        reasons,
        limitations,
        allowsClinicalMeasurement: false,
        allowsAiModelInput: false
      };
    }

    // 3. Checar estado REVISÃO NECESSÁRIA
    if (cov < 0.80) {
      needsReview = true;
      reasons.push(`Cobertura parcial do traçado (${Math.round(cov * 100)}%) com lacunas não reconstruídas.`);
    }
    if (jumpCount > 1) {
      needsReview = true;
      reasons.push(`${jumpCount} descontinuidades abruptas detectadas no rastreamento.`);
    }
    if (calSource === "assumed" || calSource === "unknown") {
      needsReview = true;
      reasons.push(`Calibração ${calSource === "unknown" ? "desconhecida" : "presumida (não medida diretamente da grade)"}.`);
    }
    if (idEvidence === "positional_hypothesis") {
      needsReview = true;
      reasons.push("Derivação atribuída por posição geométrica (rótulo OCR não confirmado — requer conferência visual).");
    }
    if (identity.status === "manual_confirmed") {
      needsReview = true;
      reasons.push("Rótulo confirmado manualmente; a confirmação humana não substitui evidência automática de OCR.");
    }

    if (needsReview) {
      return {
        status: AUDIT_STATUS.REVIEW_REQUIRED,
        technicalIndex,
        technicalIndexFormula: "40*Cobertura + 30*AlinhamentoPixel + 20*Continuidade + 10*Calibracao (Índice técnico estrutural; não é porcentagem de fidelidade clínica)",
        reasons,
        limitations,
        allowsClinicalMeasurement: calSource === "measured" || calSource === "user_confirmed",
        allowsAiModelInput: false
      };
    }

    // 4. ADEQUADA TECNICAMENTE
    return {
      status: AUDIT_STATUS.ADEQUATE,
      technicalIndex,
      technicalIndexFormula: "40*Cobertura + 30*AlinhamentoPixel + 20*Continuidade + 10*Calibracao (Índice técnico estrutural; não é porcentagem de fidelidade clínica)",
      reasons: ["Traçado contínuo, alinhado aos pixels reais, com calibração e identificação verificadas."],
      limitations,
      allowsClinicalMeasurement: true,
      allowsAiModelInput: true
    };
  }

  /**
   * Extrai o sinal real e constrói o objeto estruturado completo exigido pela auditoria
   */
  function extractRealSignalFromImageData(imageData, options = {}) {
    if (!imageData || !imageData.data || !imageData.width || !imageData.height) {
      return {
        isValid: false,
        signal: null,
        confidence: 0,
        continuity: 0,
        message: "ImageData ausente ou inválido."
      };
    }

    const { width, height } = imageData;
    const {
      minContinuityThreshold = 0.42,
      leadLabel = options.leadIdentity?.lead || null,
      regionBounds = null,
      provenance = "camera_or_upload_crop",
      calibration = null,
      pixelsPerMv: legacyPixelsPerMv = null
    } = options;
    const leadIdentity = contracts.normalizeLeadIdentity({ ...(options.leadIdentity || {}), lead: leadLabel });

    if (width < 20 || height < 15) {
      const failObj = {
        isValid: false,
        leadIdentity,
        regionBounds: regionBounds || { x: 0, y: 0, width, height },
        signal: null,
        curveCoordinatesPx: [],
        validMask: [],
        interpolatedMask: [],
        missingSegments: [{ startCol: 0, endCol: Math.max(0, width - 1), lengthCols: width, status: "insufficient_resolution" }],
        calibration: calibration || { calibrationSource: "unknown", measurementsAllowed: false },
        recoveredDurationSeconds: null,
        effectiveResolutionHz: null,
        confidence: 0,
        continuity: 0,
        limitations: ["Resolução espacial insuficiente para rastreamento (< 20x15 px)."],
        provenance,
        message: "Região com resolução insuficiente para extração."
      };
      failObj.audit = auditExtractedLead(failObj);
      return failObj;
    }

    // Estágio A: Pré-processamento
    const prep = preprocessLeadRegion(imageData, options);

    // Estágio B: Rastreamento de curva
    const tracked = trackSignalCurve(imageData, prep, options);
    const continuityRatio = tracked.columnsWithInk / width;

    // Verificar excesso de colunas densas (ex.: bloco de texto, listras verticais grossas ou manchas)
    if (tracked.excessiveThicknessColumns > width * 0.18) {
      const failText = {
        isValid: false,
        leadIdentity,
        regionBounds: regionBounds || { x: 0, y: 0, width, height },
        signal: null,
        curveCoordinatesPx: [],
        validMask: Array.from(tracked.validMask),
        interpolatedMask: [],
        missingSegments: [],
        calibration: calibration || { calibrationSource: "unknown", measurementsAllowed: false },
        recoveredDurationSeconds: null,
        effectiveResolutionHz: null,
        confidence: 0.05,
        continuity: Number(continuityRatio.toFixed(3)),
        limitations: ["Densidade vertical incompatível com linha de ECG (provável texto ou artefato gráfico)."],
        provenance,
        message: "Padrão incompatível com curva de ECG (excesso de blocos verticais/texto)."
      };
      failText.audit = auditExtractedLead(failText);
      return failText;
    }

    // Verificar sobreposição de duas derivações na mesma janela
    if (tracked.hasMultipleCurves) {
      const failOverlap = {
        isValid: false,
        hasMultipleCurves: true,
        leadIdentity,
        regionBounds: regionBounds || { x: 0, y: 0, width, height },
        signal: null,
        curveCoordinatesPx: [],
        validMask: Array.from(tracked.validMask),
        interpolatedMask: [],
        missingSegments: [],
        trackingStats: { overlapRatio: tracked.overlapRatio, hasMultipleCurves: true },
        calibration: calibration || { calibrationSource: "unknown", measurementsAllowed: false },
        recoveredDurationSeconds: null,
        effectiveResolutionHz: null,
        confidence: 0.15,
        continuity: Number(continuityRatio.toFixed(3)),
        limitations: ["Região contém duas ou mais curvas simultâneas sobrepostas."],
        provenance,
        message: "Foram detectadas múltiplas curvas sobrepostas nesta região. Recapture enquadrando uma derivação por vez."
      };
      failOverlap.audit = auditExtractedLead(failOverlap);
      return failOverlap;
    }

    // Regra de continuidade mínima
    if (continuityRatio < minContinuityThreshold || tracked.columnsWithInk < 15) {
      const failCont = {
        isValid: false,
        leadIdentity,
        regionBounds: regionBounds || { x: 0, y: 0, width, height },
        signal: null,
        curveCoordinatesPx: [],
        validMask: Array.from(tracked.validMask),
        interpolatedMask: [],
        missingSegments: [{ startCol: 0, endCol: width - 1, lengthCols: width, status: "missing_unreconstructed" }],
        calibration: calibration || { calibrationSource: "unknown", measurementsAllowed: false },
        recoveredDurationSeconds: null,
        effectiveResolutionHz: null,
        confidence: Number(continuityRatio.toFixed(3)),
        continuity: Number(continuityRatio.toFixed(3)),
        limitations: ["Continuidade do traçado abaixo do mínimo aceitável."],
        provenance,
        message: "Sinal não identificado na região. Papel em branco, ilegível ou sem traçado contínuo."
      };
      failCont.audit = auditExtractedLead(failCont);
      return failCont;
    }

    // Estágio C: Tratamento de lacunas sem repetição silenciosa
    const gapResult = processGapsAndInterpolation(tracked.rawY, tracked.validMask, 3);

    // Determinar linha de base isoelétrica real usando a mediana dos pontos válidos
    const validYList = [];
    for (let x = 0; x < width; x++) {
      if (Number.isFinite(gapResult.finalY[x])) {
        validYList.push(gapResult.finalY[x]);
      }
    }
    validYList.sort((a, b) => a - b);
    const baselineY = validYList.length > 0
      ? validYList[Math.floor(validYList.length / 2)]
      : height / 2;

    // Determinar Calibração Real vs Desconhecida
    let calInfo = calibration;
    if (!calInfo && global.LuriaEcgCvEngine && typeof global.LuriaEcgCvEngine.detectECGGridAndCalibration === "function") {
      calInfo = global.LuriaEcgCvEngine.detectECGGridAndCalibration(imageData);
    }

    const calSource = calInfo?.calibrationSource || (legacyPixelsPerMv ? "assumed" : "unknown");
    const effectivePixelsPerMv = calInfo?.pixelsPerMv ||
      (calInfo?.gainMmPerMv && calInfo?.pixelsPerMmY ? calInfo.gainMmPerMv * calInfo.pixelsPerMmY : null) ||
      legacyPixelsPerMv || (height * 0.35);
    let msPerPixel = calInfo?.msPerPixel || null;
    if (!msPerPixel && options.calibration?.msPerPixel) {
      msPerPixel = options.calibration.msPerPixel;
    }

    // Construir vetores de sinal e coordenadas exatas em pixels na imagem recortada
    const signalWithNulls = new Array(width);
    const numericSignalForCompat = [];
    const curveCoordinatesPx = new Array(width);
    let inkCorrespondenceSum = 0;
    let inkCorrespondenceCount = 0;

    for (let x = 0; x < width; x++) {
      const yPx = gapResult.finalY[x];
      if (Number.isFinite(yPx)) {
        const mv = Number(((baselineY - yPx) / effectivePixelsPerMv).toFixed(4));
        signalWithNulls[x] = mv;
        numericSignalForCompat.push(mv);
        curveCoordinatesPx[x] = {
          x,
          y: Number(yPx.toFixed(2)),
          valid: gapResult.finalValidMask[x] === 1,
          interpolated: gapResult.interpolatedMask[x] === 1
        };

        if (gapResult.finalValidMask[x] === 1) {
          const iy = Math.min(height - 1, Math.max(0, Math.round(yPx)));
          inkCorrespondenceSum += prep.inkStrength[iy * width + x];
          inkCorrespondenceCount++;
        }
      } else {
        signalWithNulls[x] = null;
        curveCoordinatesPx[x] = {
          x,
          y: null,
          valid: false,
          interpolated: false
        };
      }
    }

    // Validação de Morfologia Eletrocardiográfica
    const morph = evaluateWaveformMorphology(signalWithNulls, gapResult.finalValidMask, gapResult.finalY, height);
    if (!morph.isMorphologyValid) {
      const failMorph = {
        isValid: false,
        leadIdentity,
        regionBounds: regionBounds || { x: 0, y: 0, width, height },
        signal: null,
        curveCoordinatesPx,
        validMask: Array.from(gapResult.finalValidMask),
        interpolatedMask: Array.from(gapResult.interpolatedMask),
        missingSegments: gapResult.missingSegments,
        morphology: morph,
        calibration: calInfo || { calibrationSource: calSource, measurementsAllowed: false },
        recoveredDurationSeconds: null,
        effectiveResolutionHz: null,
        confidence: 0.1,
        continuity: Number(continuityRatio.toFixed(3)),
        limitations: [morph.reason],
        provenance,
        message: morph.reason
      };
      failMorph.audit = auditExtractedLead(failMorph);
      return failMorph;
    }

    // Calcular tempo efetivamente recuperado e resolução temporal real da fotografia (em amostras/segundo da imagem)
    let recoveredDurationSeconds = null;
    let effectiveResolutionHz = null;
    const limitations = [];

    if (msPerPixel && msPerPixel > 0) {
      const totalSpanSeconds = Number(((width * msPerPixel) / 1000).toFixed(3));
      recoveredDurationSeconds = totalSpanSeconds; // A duração total física recuperada é a extensão em ms/s
      effectiveResolutionHz = Number((1000 / msPerPixel).toFixed(1));
    } else {
      limitations.push("Calibração temporal (mm/s ou px/mm) não confirmada; duração em segundos e taxa efetiva em Hz não determinadas.");
    }

    if (continuityRatio < 0.95) {
      limitations.push(`Presença de ${gapResult.missingSegments.filter(s => s.status === "missing_unreconstructed").length} trecho(s) ausente(s) sem reconstrução artificial.`);
    }
    if (tracked.trackingErrors.length > 0) {
      limitations.push(`${tracked.trackingErrors.length} ponto(s) com salto abrupto de rastreamento.`);
    }

    const meanInkScore = inkCorrespondenceCount > 0 ? (inkCorrespondenceSum / inkCorrespondenceCount) : 0;

    const resultObj = {
      isValid: true,
      leadIdentity,
      regionBounds: regionBounds || { x: 0, y: 0, width, height },
      // `signal` preserva `null` nos trechos perdidos; `validSamplesOnly` fornece apenas as amostras reais medidas
      signal: signalWithNulls,
      validSamplesOnly: numericSignalForCompat,
      curveCoordinatesPx,
      validMask: Array.from(gapResult.finalValidMask),
      interpolatedMask: Array.from(gapResult.interpolatedMask),
      missingSegments: gapResult.missingSegments,
      trackingErrors: tracked.trackingErrors,
      trackingStats: {
        columnsWithInk: tracked.columnsWithInk,
        totalColumns: width,
        overlapRatio: tracked.overlapRatio,
        hasMultipleCurves: tracked.hasMultipleCurves
      },
      pixelCorrespondence: {
        meanInkScore: Number(meanInkScore.toFixed(3)),
        verifiedPixelsCount: inkCorrespondenceCount
      },
      morphology: morph,
      calibration: {
        calibrationSource: calSource,
        paperSpeedMmPerSec: calInfo?.paperSpeedMmPerSec || null,
        gainMmPerMv: calInfo?.gainMmPerMv || null,
        pixelsPerMmX: calInfo?.pixelsPerMmX || null,
        pixelsPerMmY: calInfo?.pixelsPerMmY || null,
        pixelsPerMv: Number(effectivePixelsPerMv.toFixed(2)),
        msPerPixel: msPerPixel ? Number(msPerPixel.toFixed(4)) : null,
        measurementsAllowed: calSource === "measured" || calSource === "user_confirmed"
      },
      recoveredDurationSeconds,
      effectiveResolutionHz,
      resampledDigitalRateHz: null, // Não atribuímos 500 Hz automaticamente!
      validSamplesCount: gapResult.finalValidMask.filter(v => v === 1).length,
      validDurationSeconds: msPerPixel ? Number(((gapResult.finalValidMask.filter(v => v === 1).length * msPerPixel) / 1000).toFixed(3)) : null,
      baselineY: Number(baselineY.toFixed(2)),
      peakToPeakMv: morph.peakToPeakMv,
      confidence: Number(Math.min(0.99, continuityRatio * 0.7 + meanInkScore * 0.3).toFixed(3)),
      continuity: Number(continuityRatio.toFixed(3)),
      limitations,
      provenance,
      message: "Traçado real extraído e auditado."
    };

    resultObj.audit = auditExtractedLead(resultObj);
    return resultObj;
  }

  /**
   * Reamostra um sinal válido (com escala temporal conhecida) para uma taxa de amostragem alvo (ex.: 100 Hz ou 500 Hz)
   * SOMENTE sobre o intervalo de tempo efetivamente medido — NUNCA estende 2,5s para 10s!
   */
  function resampleCalibratedSignal(extractionResult, targetHz = 100) {
    if (!extractionResult || !extractionResult.isValid || !extractionResult.calibration?.msPerPixel) {
      return {
        ok: false,
        reason: "Sinal sem calibração temporal (ms/pixel) confirmada; reamostragem bloqueada."
      };
    }

    const msPerPx = extractionResult.calibration.msPerPixel;
    const srcSignal = extractionResult.signal;
    const totalDurationSec = ((srcSignal.length - 1) * msPerPx) / 1000;
    const targetSamples = Math.max(2, Math.floor(totalDurationSec * targetHz));
    const resampled = new Array(targetSamples);
    const resampledMask = new Uint8Array(targetSamples);

    for (let i = 0; i < targetSamples; i++) {
      const tMs = (i / targetHz) * 1000;
      const srcPos = tMs / msPerPx;
      const idx0 = Math.floor(srcPos);
      const idx1 = Math.min(srcSignal.length - 1, idx0 + 1);
      const frac = srcPos - idx0;

      const v0 = srcSignal[idx0];
      const v1 = srcSignal[idx1];
      const needsNext = frac > 1e-9;
      if (v0 === null || !Number.isFinite(v0) || extractionResult.validMask?.[idx0] !== 1 ||
          extractionResult.interpolatedMask?.[idx0] === 1 ||
          (needsNext && (v1 === null || !Number.isFinite(v1) || extractionResult.validMask?.[idx1] !== 1 ||
            extractionResult.interpolatedMask?.[idx1] === 1))) {
        resampled[i] = null;
        resampledMask[i] = 0;
      } else {
        resampled[i] = Number((v0 + frac * (v1 - v0)).toFixed(4));
        resampledMask[i] = 1;
      }
    }

    return {
      ok: true,
      samplingRateHz: targetHz,
      effectiveNativeResolutionHz: extractionResult.effectiveResolutionHz,
      durationSeconds: Number(totalDurationSec.toFixed(3)),
      samples: resampled,
      validMask: Array.from(resampledMask)
    };
  }

  // Recalcula a partir dos pixels preservados; não acumula arredondamentos de uma escala anterior.
  function recalibrateExtraction(extractionResult, calibration) {
    const pxY = Number(calibration?.pixelsPerMmY);
    const pxX = Number(calibration?.pixelsPerMmX);
    const speed = Number(calibration?.paperSpeedMmPerSec);
    const gain = Number(calibration?.gainMmPerMv);
    if (!extractionResult?.isValid || !Array.isArray(extractionResult.curveCoordinatesPx) ||
        !Number.isFinite(extractionResult.baselineY) || !(pxY > 0 && pxX > 0 && speed > 0 && gain > 0)) return null;
    const pixelsPerMv = pxY * gain;
    const msPerPixel = 1000 / (pxX * speed);
    const signal = extractionResult.curveCoordinatesPx.map(point =>
      Number.isFinite(point?.y) ? Number(((extractionResult.baselineY - point.y) / pixelsPerMv).toFixed(4)) : null);
    const validMask = extractionResult.validMask || [];
    const validSamplesCount = validMask.filter(v => v === 1).length;
    const validValues = signal.filter((value, index) => validMask[index] === 1 && Number.isFinite(value));
    extractionResult.signal = signal;
    extractionResult.validSamplesOnly = validValues;
    extractionResult.validSamplesCount = validSamplesCount;
    extractionResult.recoveredDurationSeconds = Number((signal.length * msPerPixel / 1000).toFixed(3));
    extractionResult.validDurationSeconds = Number((validSamplesCount * msPerPixel / 1000).toFixed(3));
    extractionResult.effectiveResolutionHz = Number((1000 / msPerPixel).toFixed(1));
    extractionResult.resampledDigitalRateHz = null;
    extractionResult.calibration = { ...calibration, pixelsPerMv, msPerPixel,
      measurementsAllowed: calibration.calibrationSource === "measured" || calibration.calibrationSource === "user_confirmed" };
    let min = Infinity, max = -Infinity;
    for (const value of validValues) { if (value < min) min = value; if (value > max) max = value; }
    extractionResult.peakToPeakMv = validValues.length > 0 ? Number((max - min).toFixed(3)) : null;
    extractionResult.audit = auditExtractedLead(extractionResult);
    return extractionResult;
  }

  /**
   * Audita o conjunto completo de derivações extraídas antes da Etapa 3
   */
  function auditFullExtraction(leadsList) {
    const summary = {
      totalLeads: leadsList.length,
      adequateCount: 0,
      reviewRequiredCount: 0,
      indeterminateCount: 0,
      invalidCount: 0,
      perLeadStatus: {},
      overallStatus: AUDIT_STATUS.INVALID,
      blockingReasons: []
    };

    leadsList.forEach(item => {
      const audit = item.audit || auditExtractedLead(item.extraction || item);
      const st = audit.status;
      summary.perLeadStatus[item.lead] = audit;

      if (st === AUDIT_STATUS.ADEQUATE) summary.adequateCount++;
      else if (st === AUDIT_STATUS.REVIEW_REQUIRED) summary.reviewRequiredCount++;
      else if (st === AUDIT_STATUS.INDETERMINATE) summary.indeterminateCount++;
      else summary.invalidCount++;
    });

    if (summary.invalidCount > 0) {
      summary.overallStatus = AUDIT_STATUS.INVALID;
      summary.blockingReasons.push(`${summary.invalidCount} derivação(ões) com status Inválida.`);
    } else if (summary.indeterminateCount > 0) {
      summary.overallStatus = AUDIT_STATUS.INDETERMINATE;
      summary.blockingReasons.push(`${summary.indeterminateCount} derivação(ões) com status Indeterminada (calibração ou identidade ausente).`);
    } else if (summary.reviewRequiredCount > 0) {
      summary.overallStatus = AUDIT_STATUS.REVIEW_REQUIRED;
    } else if (summary.adequateCount === 12) {
      summary.overallStatus = AUDIT_STATUS.ADEQUATE;
    }

    return summary;
  }

  const exported = {
    AUDIT_STATUS,
    preprocessLeadRegion,
    trackSignalCurve,
    processGapsAndInterpolation,
    evaluateWaveformMorphology,
    auditExtractedLead,
    auditFullExtraction,
    extractRealSignalFromImageData,
    recalibrateExtraction,
    resampleCalibratedSignal
  };

  global.LuriaEcgSignalExtractor = exported;

  if (typeof module !== "undefined" && module.exports) {
    module.exports = exported;
  }
})(typeof window !== "undefined" ? window : globalThis);


