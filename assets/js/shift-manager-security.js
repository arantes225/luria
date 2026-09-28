(() => {
  const sb = window.supabaseClient;
  if (!sb) return;

  const ENDPOINT = "https://sxdsfklllilhdyuamvvg.supabase.co/functions/v1/external-quick-chart";
  const APIKEY = "sb_publishable_AQ5-Pn1knmBhSFyt5aMtjQ_XQynLJ_L";
  const IS_HUB = document.body.dataset.page === "trabalho_gestor_plantoes";
  let user = null;
  let username = "";

  const keyMode = id => `luria:shift-manager:security-mode:${id}`;
  const keyHash = id => `luria:shift-manager:pin-hash:${id}`;
  const keyUnlock = id => `luria:shift-manager:unlocked:${id}`;

  function injectStyle() {
    if (document.getElementById("shift-manager-security-style")) return;
    const style = document.createElement("style");
    style.id = "shift-manager-security-style";
    style.textContent = `
      .gsm-security-button{min-height:38px;padding:0 12px;border:1px solid var(--border);border-radius:10px;background:var(--surface);color:var(--text);font-size:11px;font-weight:850;cursor:pointer}
      .gsm-security-button:hover{border-color:var(--accent);color:var(--accent);background:var(--accent-soft)}
      .gsm-gate{position:fixed;inset:0;z-index:2147483500;display:grid;place-items:center;padding:18px;background:color-mix(in srgb,var(--bg) 92%,#0b1726 8%);backdrop-filter:blur(10px)}
      .gsm-gate[hidden],.gsm-config[hidden],.gsm-setup-fields[hidden]{display:none!important}
      .gsm-panel{width:min(420px,100%);padding:22px;border:1px solid var(--border);border-radius:18px;background:var(--surface);box-shadow:0 24px 80px rgba(4,18,33,.24)}
      .gsm-lock-icon{width:48px;height:48px;display:grid;place-items:center;margin-bottom:14px;border-radius:14px;background:var(--accent-soft);color:var(--accent);font-size:23px}
      .gsm-panel h2{margin:0 0 6px;font-size:21px}.gsm-panel p{margin:0 0 16px;color:var(--muted);font-size:12px;line-height:1.5}
      .gsm-field{display:grid;gap:6px;margin-top:10px}.gsm-field label{font-size:10px;font-weight:850;color:var(--muted)}
      .gsm-field input{width:100%;min-height:44px;padding:0 12px;border:1px solid var(--border);border-radius:10px;background:var(--surface-2);color:var(--text);font:inherit;box-sizing:border-box}
      .gsm-field input[data-pin]{text-align:center;letter-spacing:.32em;font-weight:900;font-size:18px;-webkit-text-security:disc}
      .gsm-actions{display:flex;gap:8px;justify-content:flex-end;margin-top:16px}.gsm-actions button{min-height:40px;padding:0 14px;border-radius:10px;font-weight:850;cursor:pointer}
      .gsm-primary{border:1px solid var(--accent);background:var(--accent);color:#fff}.gsm-secondary{border:1px solid var(--border);background:var(--surface);color:var(--text)}
      .gsm-error{min-height:16px;margin-top:9px;color:var(--danger);font-size:10px}
      .gsm-config{position:fixed;inset:0;z-index:2147483600;display:grid;place-items:center;padding:18px;background:rgba(7,18,31,.46);backdrop-filter:blur(5px)}
      .gsm-config-card{width:min(540px,100%);max-height:min(88vh,760px);overflow:auto;padding:20px;border:1px solid var(--border);border-radius:18px;background:var(--surface);box-shadow:0 24px 80px rgba(4,18,33,.25)}
      .gsm-config-head{display:flex;align-items:flex-start;justify-content:space-between;gap:12px}.gsm-config-head h2{margin:0 0 5px;font-size:20px}.gsm-config-head p{margin:0;color:var(--muted);font-size:11px;line-height:1.45}
      .gsm-close{width:34px;height:34px;border:1px solid var(--border);border-radius:9px;background:var(--surface-2);color:var(--text);font-size:18px;cursor:pointer}
      .gsm-options{display:grid;gap:8px;margin-top:16px}.gsm-option{display:grid;grid-template-columns:24px minmax(0,1fr);gap:10px;align-items:start;padding:12px;border:1px solid var(--border);border-radius:12px;background:var(--surface);cursor:pointer}
      .gsm-option:has(input:checked){border-color:var(--accent);background:var(--accent-soft)}.gsm-option input{margin-top:2px}.gsm-option strong{display:block;font-size:13px}.gsm-option small{display:block;margin-top:3px;color:var(--muted);font-size:10px;line-height:1.4}
      .gsm-setup-fields{display:grid;gap:9px;margin-top:12px;padding:12px;border:1px solid var(--border);border-radius:12px;background:var(--surface-2)}
      .gsm-status{min-height:16px;margin-top:8px;color:var(--muted);font-size:10px}
      @media(max-width:700px){.gsm-panel,.gsm-config-card{border-radius:15px}.gsm-config-card{padding:16px}.gsm-actions{display:grid;grid-template-columns:1fr 1fr}.gsm-actions button{width:100%}}
    `;
    document.head.appendChild(style);
  }

  async function sha256(value) {
    const bytes = new TextEncoder().encode(value);
    const hash = await crypto.subtle.digest("SHA-256", bytes);
    return [...new Uint8Array(hash)].map(b => b.toString(16).padStart(2, "0")).join("");
  }

  async function getUser() {
    user = window.docmapUser || null;
    if (!user) {
      const { data } = await sb.auth.getUser();
      user = data?.user || null;
    }
    if (!user) return null;
    try {
      const { data } = await sb.from("profiles").select("username").eq("user_id", user.id).maybeSingle();
      username = String(data?.username || "").trim().toLowerCase();
    } catch {}
    return user;
  }

  function mode() { return user ? (localStorage.getItem(keyMode(user.id)) || "") : ""; }
  function setUnlocked(value) { if (!user) return; value ? sessionStorage.setItem(keyUnlock(user.id), "1") : sessionStorage.removeItem(keyUnlock(user.id)); }
  function isUnlocked() { return !!user && sessionStorage.getItem(keyUnlock(user.id)) === "1"; }

  function createGate() {
    if (document.getElementById("gsm-gate")) return;
    const gate = document.createElement("div");
    gate.className = "gsm-gate";
    gate.id = "gsm-gate";
    gate.hidden = true;
    gate.innerHTML = `
      <section class="gsm-panel" role="dialog" aria-modal="true" aria-labelledby="gsm-gate-title">
        <div class="gsm-lock-icon" aria-hidden="true">⌑</div>
        <h2 id="gsm-gate-title">Gestor de Plantões protegido</h2>
        <p id="gsm-gate-copy">Confirme sua senha para continuar.</p>
        <div id="gsm-gate-pin-wrap" class="gsm-field" hidden><label for="gsm-gate-pin">PIN de 4 dígitos</label><input id="gsm-gate-pin" data-pin type="text" inputmode="numeric" maxlength="4" autocomplete="one-time-code" data-lpignore="true" data-1p-ignore="true"></div>
        <div id="gsm-gate-password-wrap" class="gsm-field" hidden><label for="gsm-gate-password">Senha da conta</label><input id="gsm-gate-password" type="password" autocomplete="current-password"></div>
        <div id="gsm-gate-error" class="gsm-error" role="status"></div>
        <div class="gsm-actions"><button id="gsm-gate-back" class="gsm-secondary" type="button">Voltar</button><button id="gsm-gate-enter" class="gsm-primary" type="button">Entrar</button></div>
      </section>`;
    document.body.appendChild(gate);
    gate.querySelector("#gsm-gate-pin")?.addEventListener("input", e => { e.currentTarget.value = e.currentTarget.value.replace(/\D/g, "").slice(0, 4); });
    gate.querySelector("#gsm-gate-enter")?.addEventListener("click", unlock);
    gate.querySelector("#gsm-gate-pin")?.addEventListener("keydown", e => { if (e.key === "Enter") unlock(); });
    gate.querySelector("#gsm-gate-password")?.addEventListener("keydown", e => { if (e.key === "Enter") unlock(); });
    gate.querySelector("#gsm-gate-back")?.addEventListener("click", () => { location.href = "/trabalho/"; });
  }

  function showGate() {
    createGate();
    const gate = document.getElementById("gsm-gate");
    const m = mode();
    gate.hidden = false;
    document.getElementById("gsm-gate-pin-wrap").hidden = !["pin","cola"].includes(m);
    document.getElementById("gsm-gate-password-wrap").hidden = m !== "account";
    document.getElementById("gsm-gate-error").textContent = "";
    document.getElementById("gsm-gate-copy").textContent =
      m === "pin" ? "Digite o PIN de 4 dígitos do Gestor de Plantões." :
      m === "cola" ? "Digite o mesmo PIN de 4 dígitos usado na Cola Rápida." :
      "Digite a senha da sua conta LURIA.";
    setTimeout(() => { (m === "account" ? document.getElementById("gsm-gate-password") : document.getElementById("gsm-gate-pin"))?.focus(); }, 50);
  }

  function hideGate() { const gate = document.getElementById("gsm-gate"); if (gate) gate.hidden = true; }

  async function verifyColaPin(pin) {
    if (!username) throw new Error("Defina um nome de usuário na sua conta antes de usar o PIN da Cola Rápida.");
    const response = await fetch(ENDPOINT, { method:"POST", headers:{"Content-Type":"application/json","apikey":APIKEY}, body:JSON.stringify({ username, pin, action:"load" }) });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error || "PIN da Cola Rápida inválido.");
  }

  async function unlock() {
    const m = mode();
    const error = document.getElementById("gsm-gate-error");
    const button = document.getElementById("gsm-gate-enter");
    error.textContent = "";
    button.disabled = true;
    button.textContent = "Verificando…";
    try {
      if (m === "pin") {
        const pin = String(document.getElementById("gsm-gate-pin")?.value || "").replace(/\D/g,"");
        if (!/^\d{4}$/.test(pin)) throw new Error("Digite os 4 dígitos.");
        const current = await sha256(`luria-shift-manager:${user.id}:${pin}`);
        if (current !== localStorage.getItem(keyHash(user.id))) throw new Error("PIN incorreto.");
      } else if (m === "cola") {
        const pin = String(document.getElementById("gsm-gate-pin")?.value || "").replace(/\D/g,"");
        if (!/^\d{4}$/.test(pin)) throw new Error("Digite os 4 dígitos.");
        await verifyColaPin(pin);
      } else if (m === "account") {
        const password = String(document.getElementById("gsm-gate-password")?.value || "");
        if (!password) throw new Error("Digite a senha da conta.");
        if (!user.email) throw new Error("Sua conta não possui e-mail disponível para validação.");
        const { error: authError } = await sb.auth.signInWithPassword({ email:user.email, password });
        if (authError) throw new Error("Senha da conta incorreta.");
      }
      setUnlocked(true);
      hideGate();
    } catch (e) {
      error.textContent = e?.message || "Não foi possível liberar o acesso.";
    } finally {
      button.disabled = false;
      button.textContent = "Entrar";
    }
  }

  function createConfig() {
    if (document.getElementById("gsm-config")) return;
    const modal = document.createElement("div");
    modal.className = "gsm-config";
    modal.id = "gsm-config";
    modal.hidden = true;
    modal.innerHTML = `
      <section class="gsm-config-card" role="dialog" aria-modal="true" aria-labelledby="gsm-config-title">
        <div class="gsm-config-head"><div><h2 id="gsm-config-title">Segurança do Gestor de Plantões</h2><p>Escolha como deseja proteger Escala, Divisor de Plantão e Financeiro.</p></div><button id="gsm-config-close" class="gsm-close" type="button" aria-label="Fechar">×</button></div>
        <div class="gsm-options">
          <label class="gsm-option"><input type="radio" name="gsm-mode" value="none"><span><strong>Sem senha</strong><small>Abre direto enquanto sua conta estiver conectada.</small></span></label>
          <label class="gsm-option"><input type="radio" name="gsm-mode" value="pin"><span><strong>PIN próprio de 4 dígitos</strong><small>Crie um PIN exclusivo para o Gestor de Plantões neste dispositivo.</small></span></label>
          <label class="gsm-option"><input type="radio" name="gsm-mode" value="cola"><span><strong>Usar o PIN da Cola Rápida</strong><small>Utiliza o mesmo PIN de 4 dígitos já configurado na Cola Rápida.</small></span></label>
          <label class="gsm-option"><input type="radio" name="gsm-mode" value="account"><span><strong>Senha da conta</strong><small>Pede novamente a senha da sua conta LURIA ao entrar.</small></span></label>
        </div>
        <div id="gsm-pin-fields" class="gsm-setup-fields" hidden>
          <div class="gsm-field"><label>Novo PIN</label><input id="gsm-new-pin" data-pin type="text" inputmode="numeric" maxlength="4" autocomplete="new-password"></div>
          <div class="gsm-field"><label>Confirmar PIN</label><input id="gsm-confirm-pin" data-pin type="text" inputmode="numeric" maxlength="4" autocomplete="new-password"></div>
        </div>
        <div id="gsm-cola-fields" class="gsm-setup-fields" hidden>
          <div class="gsm-field"><label>PIN atual da Cola Rápida</label><input id="gsm-cola-pin" data-pin type="text" inputmode="numeric" maxlength="4" autocomplete="one-time-code"></div>
        </div>
        <div id="gsm-config-status" class="gsm-status" role="status"></div>
        <div class="gsm-actions"><button id="gsm-lock-now" class="gsm-secondary" type="button">Bloquear agora</button><button id="gsm-config-save" class="gsm-primary" type="button">Salvar</button></div>
      </section>`;
    document.body.appendChild(modal);
    modal.querySelectorAll("[data-pin]").forEach(input => input.addEventListener("input", e => { e.currentTarget.value = e.currentTarget.value.replace(/\D/g,"").slice(0,4); }));
    modal.querySelectorAll('input[name="gsm-mode"]').forEach(radio => radio.addEventListener("change", renderConfigFields));
    modal.querySelector("#gsm-config-close")?.addEventListener("click", () => { if (!mode()) return; modal.hidden = true; });
    modal.querySelector("#gsm-config-save")?.addEventListener("click", saveConfig);
    modal.querySelector("#gsm-lock-now")?.addEventListener("click", () => { setUnlocked(false); modal.hidden = true; if (mode() !== "none") showGate(); });
  }

  function renderConfigFields() {
    const selected = document.querySelector('input[name="gsm-mode"]:checked')?.value || "none";
    document.getElementById("gsm-pin-fields").hidden = selected !== "pin";
    document.getElementById("gsm-cola-fields").hidden = selected !== "cola";
  }

  function openConfig(force=false) {
    createConfig();
    const m = mode() || "none";
    const radio = document.querySelector(`input[name="gsm-mode"][value="${m}"]`);
    if (radio) radio.checked = true;
    renderConfigFields();
    document.getElementById("gsm-config-status").textContent = force ? "Escolha uma opção para continuar." : "";
    document.getElementById("gsm-config-close").style.visibility = force ? "hidden" : "visible";
    document.getElementById("gsm-config").hidden = false;
  }

  async function saveConfig() {
    const selected = document.querySelector('input[name="gsm-mode"]:checked')?.value || "none";
    const status = document.getElementById("gsm-config-status");
    const button = document.getElementById("gsm-config-save");
    status.textContent = "";
    button.disabled = true;
    button.textContent = "Salvando…";
    try {
      if (selected === "pin") {
        const pin = String(document.getElementById("gsm-new-pin")?.value || "").replace(/\D/g,"");
        const confirmPin = String(document.getElementById("gsm-confirm-pin")?.value || "").replace(/\D/g,"");
        if (!/^\d{4}$/.test(pin)) throw new Error("O PIN precisa ter exatamente 4 dígitos.");
        if (pin !== confirmPin) throw new Error("Os PINs não coincidem.");
        const hash = await sha256(`luria-shift-manager:${user.id}:${pin}`);
        localStorage.setItem(keyHash(user.id), hash);
      } else if (selected === "cola") {
        const pin = String(document.getElementById("gsm-cola-pin")?.value || "").replace(/\D/g,"");
        if (!/^\d{4}$/.test(pin)) throw new Error("Digite o PIN de 4 dígitos da Cola Rápida.");
        await verifyColaPin(pin);
        localStorage.removeItem(keyHash(user.id));
      } else {
        localStorage.removeItem(keyHash(user.id));
      }
      localStorage.setItem(keyMode(user.id), selected);
      setUnlocked(true);
      document.getElementById("gsm-config").hidden = true;
      hideGate();
      const label = selected === "none" ? "Sem senha" : selected === "pin" ? "PIN próprio" : selected === "cola" ? "PIN da Cola Rápida" : "Senha da conta";
      const securityButton = document.getElementById("gm-security");
      if (securityButton) securityButton.textContent = `Segurança · ${label}`;
    } catch (e) {
      status.textContent = e?.message || "Não foi possível salvar.";
    } finally {
      button.disabled = false;
      button.textContent = "Salvar";
    }
  }

  async function init() {
    injectStyle();
    if (!await getUser()) return;

    const securityButton = document.getElementById("gm-security");
    if (securityButton) {
      const m = mode();
      const label = m === "none" ? "Sem senha" : m === "pin" ? "PIN próprio" : m === "cola" ? "PIN da Cola Rápida" : m === "account" ? "Senha da conta" : "Configurar";
      securityButton.textContent = `Segurança · ${label}`;
      securityButton.addEventListener("click", () => openConfig(false));
    }

    if (!mode()) {
      if (!IS_HUB) { location.replace("/trabalho/gestor-plantoes/?security=1"); return; }
      openConfig(true);
      return;
    }
    if (mode() === "none") { setUnlocked(true); return; }
    if (!isUnlocked()) showGate();
  }

  if (window.docmapUser) init();
  else window.addEventListener("docmap:ready", init, {once:true});
})();