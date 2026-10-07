(function(){
  const sb = window.supabaseClient;
  if (!sb) return;

  const state = { connected:false, configured:false, syncing:false };

  function esc(value){
    return String(value ?? "").replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[ch]));
  }

  async function invoke(name, body={}){
    const { data, error } = await sb.functions.invoke(name,{ body });
    if (error) {
      const message = error?.context?.body?.message || error?.message || "Falha na integração com o Google Agenda.";
      throw new Error(message);
    }
    if (data?.error) throw new Error(data.message || data.error);
    return data || {};
  }

  function statusText(){
    if (!state.configured) return "Integração preparada · falta configurar o OAuth do Google";
    if (state.syncing) return "Sincronizando...";
    if (state.connected) return "Conectado · sincronização bidirecional";
    return "Google Agenda não conectado";
  }

  function render(){
    document.querySelectorAll("[data-google-calendar-status]").forEach(el => el.textContent = statusText());
    document.querySelectorAll("[data-google-calendar-connect]").forEach(btn => btn.hidden = state.connected);
    document.querySelectorAll("[data-google-calendar-sync]").forEach(btn => {
      btn.hidden = !state.connected;
      btn.disabled = state.syncing;
    });
    document.querySelectorAll("[data-google-calendar-disconnect]").forEach(btn => btn.hidden = !state.connected);
  }

  function injectStyles(){
    if (document.getElementById("luria-google-calendar-style")) return;
    const style = document.createElement("style");
    style.id = "luria-google-calendar-style";
    style.textContent = `
      .google-calendar-card{display:flex;align-items:center;justify-content:space-between;gap:14px;padding:12px 14px;border:1px solid var(--border);border-radius:12px;background:var(--surface-2)}
      .google-calendar-copy{display:grid;gap:3px;min-width:0}
      .google-calendar-copy strong{font-size:12px;font-weight:700;color:var(--text)}
      .google-calendar-copy small{font-size:10px;line-height:1.4;color:var(--muted)}
      .google-calendar-actions{display:flex;align-items:center;gap:7px;flex-wrap:wrap}
      .google-calendar-actions button{min-height:34px;padding:0 11px;border-radius:9px;font:inherit;font-size:10px;font-weight:750;cursor:pointer}
      .google-calendar-primary{border:1px solid var(--accent);background:var(--accent);color:#fff}
      .google-calendar-secondary{border:1px solid var(--border);background:var(--surface);color:var(--text)}
      .google-calendar-mark{display:inline-grid;place-items:center;width:24px;height:24px;border-radius:7px;background:var(--surface);border:1px solid var(--border);font-weight:800}
      .google-calendar-row{display:flex;align-items:center;gap:9px}
      .google-calendar-cronograma-side{margin:0 0 8px}
      .google-calendar-cronograma-side .google-calendar-card{align-items:stretch;flex-direction:column;padding:12px}
      .google-calendar-cronograma-side .google-calendar-actions{width:100%}
      .google-calendar-cronograma-side .google-calendar-actions button{flex:1}
      @media(max-width:720px){.google-calendar-card{align-items:stretch;flex-direction:column}.google-calendar-actions{width:100%}.google-calendar-actions button{flex:1}}
    `;
    document.head.appendChild(style);
  }

  function cardHtml(){
    return `
      <div class="google-calendar-card">
        <div class="google-calendar-row">
          <span class="google-calendar-mark" aria-hidden="true">G</span>
          <div class="google-calendar-copy">
            <strong>Google Agenda</strong>
            <small data-google-calendar-status>Verificando conexão...</small>
          </div>
        </div>
        <div class="google-calendar-actions">
          <button class="google-calendar-primary" type="button" data-google-calendar-connect>Conectar Google Agenda</button>
          <button class="google-calendar-secondary" type="button" data-google-calendar-sync hidden>Sincronizar agora</button>
          <button class="google-calendar-secondary" type="button" data-google-calendar-disconnect hidden>Desconectar</button>
        </div>
      </div>
    `;
  }

  function mountCronograma(attempt=0){
    if (!document.body.matches('[data-page="cronograma"],[data-page="schedule"]')) return;

    const side = document.querySelector(".agenda-side.agenda-summary-side, .agenda-insights-side");
    const studyTimeCard = side?.querySelector(".agenda-study-time-card");

    if (!side || !studyTimeCard) {
      if (attempt < 20) window.setTimeout(() => mountCronograma(attempt + 1), 100);
      return;
    }

    let host = document.getElementById("google-calendar-integration");
    if (!host) {
      host = document.createElement("div");
      host.id = "google-calendar-integration";
      host.innerHTML = cardHtml();
    }

    host.classList.add("google-calendar-cronograma-side");
    host.style.marginTop = "";
    side.insertBefore(host, studyTimeCard);
  }

  function mountSettings(){
    if (!document.body.matches('[data-page="configuracoes"]')) return;
    if (document.getElementById("settings-google-calendar-card")) return;
    const notionCard = document.querySelector('[data-settings-view="perfil"] .settings-reference-card');
    const grid = notionCard?.parentElement;
    if (!grid) return;
    const card = document.createElement("article");
    card.id = "settings-google-calendar-card";
    card.className = "settings-reference-card interface-card";
    card.innerHTML = `
      <div class="settings-reference-head">
        <span class="settings-reference-icon" aria-hidden="true">G</span>
        <div><h2>Google Agenda</h2><p>Sincronize compromissos externos com o Cronograma da LURIA.</p></div>
      </div>
      ${cardHtml()}
    `;
    grid.appendChild(card);
  }

  async function refreshStatus(){
    try{
      const result = await invoke("google-calendar-api",{ action:"status" });
      state.connected = Boolean(result.connected);
      state.configured = Boolean(result.configured);
    }catch(error){
      console.warn("Google Calendar status:",error);
      state.connected = false;
      state.configured = false;
    }
    render();
  }

  async function connect(){
    try{
      const redirectTo = window.location.origin + (document.body.matches('[data-page="configuracoes"]') ? "/configuracoes/?section=perfil&google_calendar=connected" : "/cronograma/?google_calendar=connected");
      const result = await invoke("google-calendar-auth",{ redirect_to:redirectTo });
      if (!result?.url) throw new Error("Não foi possível iniciar a conexão.");
      window.location.assign(result.url);
    }catch(error){
      window.LuriaDialog?.alert?.(error?.message || "Não foi possível conectar o Google Agenda.");
    }
  }

  async function sync(options={}){
    if (!state.connected || state.syncing) return null;
    state.syncing = true; render();
    try{
      const result = await invoke("google-calendar-api",{ action:"sync" });
      if (typeof window.loadTopics === "function") await window.loadTopics();
      if (!options.silent) {
        window.LuriaDialog?.alert?.(`Google Agenda sincronizado: ${Number(result.pushed||0)} evento(s) enviado(s) e ${Number(result.pulled||0)} recebido(s).`);
      }
      return result;
    }catch(error){
      if (!options.silent) window.LuriaDialog?.alert?.(error?.message || "Não foi possível sincronizar o Google Agenda.");
      throw error;
    }finally{
      state.syncing = false; render();
    }
  }

  async function disconnect(){
    const ok = await window.LuriaDialog?.confirm?.("Desconectar o Google Agenda desta conta?");
    if (ok === false) return;
    try{
      await invoke("google-calendar-api",{ action:"disconnect" });
      state.connected = false;
      render();
    }catch(error){
      window.LuriaDialog?.alert?.(error?.message || "Não foi possível desconectar o Google Agenda.");
    }
  }

  async function pushEvent(scheduleEventId){
    if (!state.connected || !scheduleEventId) return;
    await invoke("google-calendar-api",{ action:"push_event", schedule_event_id:scheduleEventId });
  }

  async function deleteLinkedEvent(googleEventId){
    if (!state.connected || !googleEventId) return;
    await invoke("google-calendar-api",{ action:"delete_linked_event", google_event_id:googleEventId });
  }

  function wire(){
    document.addEventListener("click", (event)=>{
      const target = event.target.closest("[data-google-calendar-connect],[data-google-calendar-sync],[data-google-calendar-disconnect]");
      if (!target) return;
      if (target.matches("[data-google-calendar-connect]")) connect();
      else if (target.matches("[data-google-calendar-sync]")) sync();
      else disconnect();
    });
  }

  async function init(){
    injectStyles();
    mountCronograma();
    mountSettings();
    wire();
    await refreshStatus();

    const params = new URLSearchParams(window.location.search);
    if (params.get("google_calendar") === "connected") {
      await refreshStatus();
      if (state.connected) await sync({ silent:true }).catch(()=>null);
      const url = new URL(window.location.href);
      url.searchParams.delete("google_calendar");
      window.history.replaceState({},"",url);
    }
  }

  window.LuriaGoogleCalendar = { state, refreshStatus, sync, pushEvent, deleteLinkedEvent };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded",init,{once:true});
  else init();
})();