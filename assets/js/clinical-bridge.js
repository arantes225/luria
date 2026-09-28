(() => {
  "use strict";
  const KEY = "luria-clinical-transfer-v1";
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
  window.LuriaClinicalBridge = {
    key: KEY,
    save(payload) { return write(payload || {}); },
    peek() { return read(); },
    consume() { const data = read(); if (data) clear(); return data; },
    clear,
    toQuickChart(payload) {
      write(payload || {});
      location.href = "/trabalho/prontuario-rapido/?import=1";
    },
    openDrug(term) { location.href = "/trabalho/bulario/?q=" + qs(term); },
    openRecipe(value) { location.href = "/trabalho/receitas/?q=" + qs(value); },
    openProtocol(slug) { location.href = "/trabalho/protocolos/?protocol=" + qs(slug); }
  };
})();