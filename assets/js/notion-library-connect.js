/* Conexão Notion dentro da biblioteca de apostilas.
 * Reaproveita os endpoints autenticados já usados em Caderno/Configurações.
 * Nenhuma credencial do Notion é enviada ao navegador. */
(() => {
  "use strict";
  const button = document.getElementById("books-notion-connect");
  const status = document.getElementById("books-notion-status");
  const open = document.getElementById("books-notion-open");
  if (!button || !status || !open) return;
  const sb = window.supabaseClient;
  const notify = message => { status.textContent = message; };
  let configured = false;
  let connected = false;
  function updateUi() {
    button.hidden = connected;
    open.hidden = !connected;
    if (connected) notify("Notion conectado. Crie e edite suas notas em Anotações.");
    else if (!configured) notify("Ainda não conectado. A integração depende da configuração do Notion.");
    else notify("Notion não conectado.");
  }
  async function invoke(name, body) {
    if (!sb?.functions?.invoke) throw Error("Entre na sua conta LURIA para conectar ao Notion.");
    const {data, error} = await sb.functions.invoke(name, {body});
    if (error) throw Error(error.message || "Não foi possível acessar a integração.");
    if (data?.error) throw Error(data.message || data.error);
    return data || {};
  }
  async function refresh() {
    try {
      const result = await invoke("notion-api", {action:"status"});
      configured = Boolean(result.configured);
      connected = Boolean(result.connected);
      updateUi();
    } catch (error) {
      configured = false;
      connected = false;
      updateUi();
      notify("Não foi possível verificar o Notion. " + (error?.message || "Tente novamente."));
    }
  }
  button.addEventListener("click", async () => {
    button.disabled = true;
    notify("Iniciando conexão segura com o Notion…");
    try {
      const callback = new URL(location.href);
      callback.searchParams.set("notion", "connected");
      const result = await invoke("notion-auth", {redirect_to:callback.origin+callback.pathname+callback.search});
      if (!result?.url) throw Error("Notion ainda não configurado pelo administrador.");
      const target = new URL(result.url);
      if (target.protocol !== "https:" || !/(^|\.)notion\.so$/.test(target.hostname)
        && !/(^|\.)notion\.com$/.test(target.hostname)) {
        throw Error("O endereço de autorização do Notion é inválido.");
      }
      location.assign(target.href);
    } catch (error) {
      button.disabled = false;
      notify(error?.message || "Não foi possível iniciar a conexão. Tente novamente.");
    }
  });
  const url = new URL(location.href);
  if (url.searchParams.get("notion") === "connected") {
    url.searchParams.delete("notion");
    history.replaceState(history.state, "", url.pathname + url.search + url.hash);
  }
  refresh();
})();
