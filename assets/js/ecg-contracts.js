/* Contratos compartilhados pelo reconhecedor, câmera, extrator e auditor. */
(function (global) {
  "use strict";
  const LEADS = ["DI", "DII", "DIII", "aVR", "aVL", "aVF", "V1", "V2", "V3", "V4", "V5", "V6"];
  const ALIASES = { I: "DI", II: "DII", III: "DIII", AVR: "aVR", AVL: "aVL", AVF: "aVF" };
  function canonicalLead(value) {
    if (typeof value !== "string") return null;
    const raw = value.trim();
    return LEADS.includes(raw) ? raw : (ALIASES[raw.toUpperCase()] || null);
  }
  function normalizeAnomalies(items) {
    if (!Array.isArray(items)) return [];
    return items.map(item => {
      if (typeof item === "string") {
        const [code, detail] = item.split(":", 2);
        return { code, detail: detail || null, lead: null, expectedLead: null, recognizedLead: null, region: null };
      }
      if (!item || typeof item !== "object" || !item.code) return null;
      return {
        code: String(item.code), detail: item.detail || null,
        lead: canonicalLead(item.lead), expectedLead: canonicalLead(item.expectedLead),
        recognizedLead: canonicalLead(item.recognizedLead), region: item.region || null
      };
    }).filter(Boolean);
  }
  function normalizeLeadIdentity(input = {}) {
    const expectedLead = canonicalLead(input.expectedLead || input.expectedInTemplate);
    const recognizedLead = canonicalLead(input.recognizedLead || input.ocrLead || (input.ocrRecognized ? input.assignedLead : null));
    const humanLead = input.confirmedByUser ? canonicalLead(input.humanConfirmedLead || input.lead) : null;
    const lead = humanLead || recognizedLead || canonicalLead(input.lead || input.assignedLead) || expectedLead;
    const ocrConfidence = Number.isFinite(input.ocrConfidence) ? input.ocrConfidence
      : (recognizedLead && Number.isFinite(input.confidence) ? input.confidence : 0);
    const anomalies = normalizeAnomalies(input.anomalies);
    const conflict = Boolean(recognizedLead && expectedLead && recognizedLead !== expectedLead);
    if (conflict && !anomalies.some(a => a.code === "label_conflict")) {
      anomalies.push({ code: "label_conflict", detail: null, lead, expectedLead, recognizedLead, region: input.region || null });
    }
    let status = "unknown";
    if (humanLead) status = "manual_confirmed";
    else if (conflict) status = "conflicting";
    else if (recognizedLead && ocrConfidence >= 0.68) status = "ocr_confirmed";
    else if (recognizedLead) status = "ambiguous";
    else if (expectedLead && (input.evidence === "positional_hypothesis" || input.method === "topology_hypothesis")) status = "geometric_hypothesis";
    const evidence = status === "ocr_confirmed" ? "ocr_verified" : status === "manual_confirmed" ? "user_confirmed"
      : status === "geometric_hypothesis" ? "positional_hypothesis" : "unverified";
    return {
      lead, recognizedLead, expectedLead, rawOcrText: input.rawOcrText || input.rawText || null,
      evidence, method: input.method || (recognizedLead ? "glyph_template_ocr" : "topology_hypothesis"),
      ocrConfidence, confidence: ocrConfidence, confirmedByUser: Boolean(humanLead),
      humanConfirmedLead: humanLead, status, verified: status === "ocr_confirmed" || status === "manual_confirmed",
      verifiedAutomatically: status === "ocr_confirmed", region: input.region || null, anomalies
    };
  }
  function normalizeCalibration(input = {}) {
    const raw = input || {};
    const confirmedByUser = Boolean(raw.confirmedByUser);
    const gridDetected = Boolean(raw.gridDetected);
    const pulseDetected = Boolean(raw.calibrationPulse?.detected || raw.pulseDetected);
    const pulseConfidence = Number(raw.calibrationPulse?.confidence || raw.pulseConfidence || 0);

    const rawSpeed = Number(raw.paperSpeedMmPerSec);
    const rawGain = Number(raw.gainMmPerMv);
    const rawPxX = Number(raw.pixelsPerMmX || raw.pixelsPerMm);
    const rawPxY = Number(raw.pixelsPerMmY || raw.pixelsPerMm);

    const hasValidSpeed = Number.isFinite(rawSpeed) && [25, 50].includes(rawSpeed);
    const hasValidGain = Number.isFinite(rawGain) && [5, 10, 20].includes(rawGain);
    const hasValidPxX = Number.isFinite(rawPxX) && rawPxX > 0.5 && rawPxX < 500;
    const hasValidPxY = Number.isFinite(rawPxY) && rawPxY > 0.5 && rawPxY < 500;

    let paperSpeedMmPerSec = hasValidSpeed ? rawSpeed : null;
    let gainMmPerMv = hasValidGain ? rawGain : null;
    let pixelsPerMmX = hasValidPxX ? rawPxX : null;
    let pixelsPerMmY = hasValidPxY ? rawPxY : null;

    // Diferenciação de origens individuais
    const gridSpacingSource = (gridDetected && hasValidPxX && hasValidPxY) ? "measured" : "unknown";

    let speedSource = "unknown";
    if (raw.speedSource === "measured_pulse" && pulseDetected && pulseConfidence >= 0.70 && hasValidSpeed) {
      speedSource = "measured_pulse";
    } else if (confirmedByUser && hasValidSpeed) {
      speedSource = "user_confirmed";
    } else if (raw.speedSource === "assumed_standard" || (gridDetected && hasValidSpeed)) {
      speedSource = "assumed_standard";
    }

    let gainSource = "unknown";
    if (raw.gainSource === "measured_pulse" && pulseDetected && pulseConfidence >= 0.70 && hasValidGain) {
      gainSource = "measured_pulse";
    } else if (confirmedByUser && hasValidGain) {
      gainSource = "user_confirmed";
    } else if (raw.gainSource === "assumed_standard" || (gridDetected && hasValidGain)) {
      gainSource = "assumed_standard";
    }

    // Origem global da calibração
    let calibrationSource = "unknown";
    if (raw.calibrationSource === "conflicting" || raw.isConflicting) {
      calibrationSource = "conflicting";
    } else if (confirmedByUser && hasValidSpeed && hasValidGain && hasValidPxX && hasValidPxY) {
      calibrationSource = "user_confirmed";
    } else if (gridSpacingSource === "measured" && speedSource === "measured_pulse" && gainSource === "measured_pulse") {
      calibrationSource = "measured";
    } else if (gridSpacingSource === "measured" || raw.calibrationSource === "assumed") {
      calibrationSource = "assumed";
    }

    const msPerPixel = (hasValidPxX && hasValidSpeed) ? Number((1000 / (paperSpeedMmPerSec * pixelsPerMmX)).toFixed(4)) : null;
    const mvPerPixel = (hasValidPxY && hasValidGain) ? Number((1 / (gainMmPerMv * pixelsPerMmY)).toFixed(5)) : null;
    const pixelsPerMv = (mvPerPixel && mvPerPixel > 0) ? Number((1 / mvPerPixel).toFixed(2)) : null;

    // Para permitir medições físicas:
    // Deve haver escala geométrica comprovada (pixelsPerMmX e pixelsPerMmY válidos e positivos),
    // velocidade e ganho válidos, msPerPixel e mvPerPixel calculáveis,
    // e a calibração deve ser 'measured' ou 'user_confirmed' (não 'assumed', 'unknown' ou 'conflicting').
    const measurementsAllowed = (calibrationSource === "measured" || calibrationSource === "user_confirmed") &&
      hasValidPxX && hasValidPxY && hasValidSpeed && hasValidGain &&
      Number.isFinite(msPerPixel) && msPerPixel > 0 &&
      Number.isFinite(mvPerPixel) && mvPerPixel > 0;

    return {
      gridDetected: gridSpacingSource === "measured",
      pixelsPerMmX,
      pixelsPerMmY,
      paperSpeedMmPerSec,
      gainMmPerMv,
      msPerPixel,
      mvPerPixel,
      pixelsPerMv,
      calibrationPulse: raw.calibrationPulse || { detected: pulseDetected, confidence: pulseConfidence },
      calibrationSource,
      gridSpacingSource,
      speedSource,
      gainSource,
      confirmedByUser: confirmedByUser && calibrationSource === "user_confirmed",
      measurementsAllowed
    };
  }

  const exported = { LEADS, canonicalLead, normalizeAnomalies, normalizeLeadIdentity, normalizeCalibration };
  global.LuriaEcgContracts = exported;
  if (typeof module !== "undefined" && module.exports) module.exports = exported;
})(typeof window !== "undefined" ? window : globalThis);

