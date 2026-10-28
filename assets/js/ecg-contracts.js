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

    let paperSpeedMmPerSec = Number(raw.paperSpeedMmPerSec) || null;
    let gainMmPerMv = Number(raw.gainMmPerMv) || null;
    let pixelsPerMmX = Number(raw.pixelsPerMmX || raw.pixelsPerMm) || null;
    let pixelsPerMmY = Number(raw.pixelsPerMmY || raw.pixelsPerMm) || null;

    let calibrationSource = "unknown";
    if (confirmedByUser) {
      calibrationSource = "user_confirmed";
    } else if (gridDetected && pulseDetected && pulseConfidence >= 0.70) {
      calibrationSource = "measured";
    } else if (gridDetected || raw.calibrationSource === "assumed") {
      calibrationSource = "assumed";
    }

    const gridSpacingSource = gridDetected ? "measured" : "unknown";
    const speedSource = (pulseDetected && pulseConfidence >= 0.70) ? "measured_pulse"
      : (confirmedByUser ? "user_confirmed" : (gridDetected ? "assumed_standard" : "unknown"));
    const gainSource = (pulseDetected && pulseConfidence >= 0.70) ? "measured_pulse"
      : (confirmedByUser ? "user_confirmed" : (gridDetected ? "assumed_standard" : "unknown"));

    const msPerPixel = (pixelsPerMmX && paperSpeedMmPerSec) ? Number((1000 / (paperSpeedMmPerSec * pixelsPerMmX)).toFixed(4)) : null;
    const mvPerPixel = (pixelsPerMmY && gainMmPerMv) ? Number((1 / (gainMmPerMv * pixelsPerMmY)).toFixed(5)) : null;
    const pixelsPerMv = mvPerPixel ? Number((1 / mvPerPixel).toFixed(2)) : null;

    return {
      gridDetected,
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
      confirmedByUser,
      measurementsAllowed: calibrationSource === "measured" || calibrationSource === "user_confirmed"
    };
  }

  const exported = { LEADS, canonicalLead, normalizeAnomalies, normalizeLeadIdentity, normalizeCalibration };
  global.LuriaEcgContracts = exported;
  if (typeof module !== "undefined" && module.exports) module.exports = exported;
})(typeof window !== "undefined" ? window : globalThis);

