(async function () {
  "use strict";

  const body = document.body;
  const gate = document.getElementById("ecg-admin-gate");
  const deny = (message) => {
    if (gate) {
      gate.hidden = false;
      gate.innerHTML = '<article class="ecg-card"><h2>Acesso restrito</h2><p>' + message + '</p><p><a class="ecg-btn secondary" href="/trabalho/">Voltar ao modo Trabalho</a></p></article>';
    }
    body.classList.remove("is-admin-pending");
    body.classList.add("is-admin-denied");
  };

  try {
    if (!window.supabaseClient) {
      deny("Não foi possível validar a sessão. Recarregue a página.");
      return;
    }

    const { data: sessionData } = await window.supabaseClient.auth.getSession();
    if (!sessionData?.session?.user) {
      deny("Entre na sua conta para continuar.");
      return;
    }

    let isAdmin = false;
    const { data: rpcAdmin, error: rpcError } = await window.supabaseClient.rpc("is_admin");
    if (!rpcError && rpcAdmin === true) {
      isAdmin = true;
    } else if (typeof window.verificarAcessoAdmin === "function") {
      isAdmin = await window.verificarAcessoAdmin();
    }

    if (!isAdmin) {
      deny("Esta ferramenta está disponível somente para administradores.");
      return;
    }

    if (gate) gate.hidden = true;
    body.classList.remove("is-admin-pending");
    body.classList.add("is-admin-authorized");
    document.dispatchEvent(new CustomEvent("luria:ecg-admin-ready"));
  } catch (_) {
    deny("Não foi possível confirmar a permissão administrativa.");
  }
})();