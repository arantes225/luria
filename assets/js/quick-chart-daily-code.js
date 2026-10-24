(() => {
  "use strict";
  const sb = window.supabaseClient;
  const ownerStore = window.LuriaLocalOwnerStore;
  const output = document.getElementById("quick-chart-daily-code");
  const dayLabel = document.getElementById("quick-chart-daily-day");
  const status = document.getElementById("quick-chart-daily-status");
  const copy = document.getElementById("quick-chart-copy-daily-code");
  if (!sb || !output || !dayLabel || !status || !copy) return;
  const ENDPOINT = "https://sxdsfklllilhdyuamvvg.supabase.co/functions/v1/external-quick-chart";
  const APIKEY = "sb_publishable_AQ5-Pn1knmBhSFyt5aMtjQ_XQynLJ_L";
  let code = "", serverDay = "", generation = 0, pending = false;

  function todayInBrasilia() {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Sao_Paulo", year: "numeric", month: "2-digit", day: "2-digit"
    }).formatToParts(new Date());
    const component = type => parts.find(part => part.type === type)?.value || "";
    return [component("year"), component("month"), component("day")].join("-");
  }

  function clear(message) {
    code = "";
    serverDay = "";
    output.textContent = "••••••";
    dayLabel.textContent = message || "Consultando código…";
    copy.disabled = true;
  }

  async function fetchCode() {
    if (pending) return;
    const owner = ownerStore?.ownerId;
    const version = generation;
    if (!owner) { clear("Entre na sua conta."); return; }
    pending = true;
    clear("Gerando o código do dia…");
    status.textContent = "";
    try {
      const { data } = await sb.auth.getSession();
      if (version !== generation || ownerStore?.ownerId !== owner) return;
      const token = data?.session?.access_token;
      if (!token) throw new Error("Sua sessão expirou. Entre novamente.");
      const response = await fetch(ENDPOINT, {
        method: "POST", cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          "apikey": APIKEY,
          "Authorization": "Bearer " + token
        },
        body: JSON.stringify({ action: "daily_code" })
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "Não foi possível consultar o código.");
      if (version !== generation || ownerStore?.ownerId !== owner) return;
      if (!/^\d{6}$/.test(result.code) || !/^\d{4}-\d{2}-\d{2}$/.test(result.day)) {
        throw new Error("Resposta inesperada do servidor.");
      }
      code = result.code;
      serverDay = result.day;
      output.textContent = code;
      dayLabel.textContent = "Válido em " + serverDay.split("-").reverse().join("/");
      copy.disabled = false;
    } catch (error) {
      if (version === generation) {
        clear("Código indisponível");
        status.textContent = error?.message || "Falha ao consultar o código.";
      }
    } finally {
      if (version === generation) pending = false;
    }
  }

  copy.addEventListener("click", async () => {
    if (!code || serverDay !== todayInBrasilia()) {
      clear("Atualizando código…");
      fetchCode();
      return;
    }
    try {
      await navigator.clipboard.writeText(code);
      status.textContent = "Código copiado. Não compartilhe com outras pessoas.";
    } catch {
      status.textContent = "Selecione os seis dígitos acima para copiar.";
    }
  });

  window.addEventListener("luria:owner-changed", () => {
    generation++;
    pending = false;
    clear("Atualizando acesso…");
    status.textContent = "";
    fetchCode();
  });
  function refreshIfNeeded() {
    if (!ownerStore?.ownerId) return;
    if (serverDay && serverDay !== todayInBrasilia()) clear("Código renovado. Consultando…");
    if (!serverDay && !pending) fetchCode();
  }
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) refreshIfNeeded();
  });
  window.addEventListener("focus", refreshIfNeeded);
  window.setInterval(refreshIfNeeded, 30000);

  Promise.resolve(ownerStore?.ready).then(fetchCode);
})();
