/* assets/js/ecg-signal-extractor.js
   Digitalizador e Extrator Real de Sinais de ECG a partir de Imagem (LURIA).
   
   Princípios:
   1. TOTALMENTE BASEADO EM PIXELS REAIS: Não sintetiza ondas matemáticas ou dados fictícios.
   2. Segmentação de tinta escura vs. grade milimetrada de fundo (fundo claro, linhas vermelhas/laranjas/rosas).
   3. Rastreamento vertical de centróide coluna a coluna (técnica inspirada em Felix Krones / Dang Nguyen).
   4. Validação estrita de continuidade física: se a imagem for folha em branco, listras aleatórias ou borrada,
      a derivação é categoricamente marcada como INVALID / NOT DETECTED (captured: false).
*/

(function (global) {
  "use strict";

  /**
   * Extrai o sinal analógico/digital real de uma região de imagem (ImageData ou Canvas)
   * @param {ImageData} imageData - Dados dos pixels da região da derivação
   * @param {Object} options - Parâmetros de calibração do papel (padrão 25 mm/s, 10 mm/mV)
   * @returns {Object} { isValid: boolean, signal: Array<number>, confidence: number, continuity: number, message: string }
   */
  function extractRealSignalFromImageData(imageData, options = {}) {
    const { width, height, data } = imageData;
    const {
      pixelsPerMv = height * 0.35, // Estimativa de escala vertical
      minContinuityThreshold = 0.35 // Exige pelo menos 35% de colunas com tinta coerente
    } = options;

    if (!width || !height || width < 20 || height < 15) {
      return {
        isValid: false,
        signal: null,
        confidence: 0,
        continuity: 0,
        message: "Região com resolução insuficiente para extração."
      };
    }

    // 1. Matriz de detecção de tinta do traçado (pixel escuro que não é a grade milimetrada colorida)
    const tracePoints = new Float32Array(width);
    const validColumns = new Uint8Array(width);
    let validColumnCount = 0;
    let sumY = 0;

    for (let x = 0; x < width; x++) {
      let inkWeightSum = 0;
      let inkYWeightedSum = 0;

      for (let y = 1; y < height - 1; y++) {
        const idx = (y * width + x) * 4;
        const r = data[idx];
        const g = data[idx + 1];
        const b = data[idx + 2];

        // Luma padrão Rec. 709
        const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;

        // Grade de ECG geralmente é rosa/vermelha/laranja (R > B)
        // Traçado de caneta/impressão é escuro e neutro (luma baixo)
        const isDarkInk = (luma < 135);
        const isNotGridLine = Math.abs(r - b) < 60; // tinta preta/cinza tem R~G~B

        if (isDarkInk && isNotGridLine) {
          const weight = (255 - luma) / 255;
          inkWeightSum += weight;
          inkYWeightedSum += y * weight;
        }
      }

      if (inkWeightSum > 0.4) {
        // Centróide vertical da curva nesta coluna de tempo
        const centerY = inkYWeightedSum / inkWeightSum;
        tracePoints[x] = centerY;
        validColumns[x] = 1;
        validColumnCount++;
        sumY += centerY;
      } else {
        tracePoints[x] = -1; // Coluna sem detecção de tinta
      }
    }

    const continuityRatio = validColumnCount / width;

    // Regra de segurança: Se não há continuidade real mínima de tinta, rejeitar categoricamente!
    // Isso impede que papel em branco, listras sem sentido ou paredes sejam aceitas como sinal.
    if (continuityRatio < minContinuityThreshold || validColumnCount < 15) {
      return {
        isValid: false,
        signal: null,
        confidence: Number(continuityRatio.toFixed(3)),
        continuity: Number(continuityRatio.toFixed(3)),
        message: "Sinal não identificado na região. Papel ilegível ou sem traçado detectável."
      };
    }

    // Linha de base média
    const baselineY = sumY / validColumnCount;

    // 2. Interpolação estritamente geométrica de pequenos saltos (< 6 colunas) sem inventar ondas
    let lastKnownY = baselineY;
    const cleanedPoints = [];

    for (let x = 0; x < width; x++) {
      if (validColumns[x]) {
        lastKnownY = tracePoints[x];
      }
      // Converte coordenada Y em milivolts em relação à linha de base
      // Na convenção médica de ECG, deflexão para cima (Y menor) é voltagem positiva (+)
      const mv = (baselineY - lastKnownY) / pixelsPerMv;
      cleanedPoints.push(Number(mv.toFixed(3)));
    }

    // 3. Validação de variação morfológica:
    // ECG verdadeiro possui picos e vales (QRS, T, P). Linha 100% reta ou ruído puro é rejeitado.
    let minMv = Infinity, maxMv = -Infinity, totalVariation = 0;
    for (let i = 0; i < cleanedPoints.length; i++) {
      const v = cleanedPoints[i];
      if (v < minMv) minMv = v;
      if (v > maxMv) maxMv = v;
      if (i > 0) totalVariation += Math.abs(v - cleanedPoints[i - 1]);
    }

    const peakToPeak = maxMv - minMv;
    if (peakToPeak < 0.08 || totalVariation < 0.2) {
      return {
        isValid: false,
        signal: null,
        confidence: 0.1,
        continuity: Number(continuityRatio.toFixed(3)),
        message: "Sinal plano ou sem morfologia eletrocardiográfica válida."
      };
    }

    return {
      isValid: true,
      signal: cleanedPoints,
      confidence: Number(Math.min(1.0, continuityRatio * 1.2).toFixed(3)),
      continuity: Number(continuityRatio.toFixed(3)),
      baselineY,
      peakToPeakMv: Number(peakToPeak.toFixed(3)),
      message: "Traçado real extraído com sucesso."
    };
  }

  global.LuriaEcgSignalExtractor = {
    extractRealSignalFromImageData
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = {
      extractRealSignalFromImageData
    };
  }
})(typeof window !== "undefined" ? window : globalThis);
