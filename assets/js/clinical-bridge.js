(() => {
  "use strict";
  const KEY = "luria-clinical-transfer-v1";
  const PRESCRIPTION_KEY = "luria-prescription-draft-v1";
  const safe = (v) => String(v ?? "").trim();
  const write = (payload) => {
    try { sessionStorage.setItem(KEY, JSON.stringify({ ...payload, created_at: new Date().toISOString() })); return true; }
    catch (_) { return false; }
  };
  const read = () => {
    try { const raw = sessionStorage.getItem(KEY); return raw ? JSON.parse(raw) : null; }
    catch (_) { return null; }
  };
  const clear = () => { try { sessionStorage.removeItem(KEY); } catch (_) {} };
  const qs = (value) => encodeURIComponent(safe(value));
  const inPrescriptionFlow = () => {
    try { return new URLSearchParams(location.search).get("prescription") === "1"; }
    catch (_) { return false; }
  };
  const appendPrescription = (payload) => {
    const text = safe(payload?.text || payload?.title);
    if (!text) return false;
    try {
      const current = localStorage.getItem(PRESCRIPTION_KEY) || "";
      const title = safe(payload?.title);
      const block = title && !text.toLowerCase().startsWith(title.toLowerCase())
        ? title.toUpperCase() + "\n" + text
        : text;
      const next = current.trim() ? current.trimEnd() + "\n\n" + block.trim() : block.trim();
      localStorage.setItem(PRESCRIPTION_KEY, next);
      window.dispatchEvent(new CustomEvent("luria:prescription-draft-updated", { detail: { text: next } }));
      return true;
    } catch (_) { return false; }
  };
  window.LuriaClinicalBridge = {
    key: KEY,
    prescriptionKey: PRESCRIPTION_KEY,
    save(payload) { return write(payload || {}); },
    peek() { return read(); },
    consume() { const data = read(); if (data) clear(); return data; },
    clear,
    appendPrescription,
    inPrescriptionFlow,
    toQuickChart(payload) {
      if (inPrescriptionFlow()) return appendPrescription(payload || {});
      write(payload || {});
      location.href = "/trabalho/prontuario-rapido/?import=1";
      return true;
    },
    openDrug(term) { location.href = "/trabalho/bulario/?q=" + qs(term); },
    openRecipe(value) { location.href = "/trabalho/receitas/?q=" + qs(value); },
    openProtocol(slug) { location.href = "/trabalho/protocolos/?protocol=" + qs(slug); }
  };
})();