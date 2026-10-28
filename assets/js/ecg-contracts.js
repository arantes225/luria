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
  const exported = { LEADS, canonicalLead, normalizeAnomalies, normalizeLeadIdentity };
  global.LuriaEcgContracts = exported;
  if (typeof module !== "undefined" && module.exports) module.exports = exported;
})(typeof window !== "undefined" ? window : globalThis);

