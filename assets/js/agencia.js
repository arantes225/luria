(() => {
  "use strict";

  const $ = (id) => document.getElementById(id);

  const ADMIN_PIN_GRACE_MS = 30 * 60 * 1000;
  const ADMIN_PIN_GRACE_KEY = "traube-admin-pin-unlocked-until";

  const COLUNAS = [
    { id: "ideia", nome: "Ideia", dono: "Estrategista" },
    { id: "redacao", nome: "Redação", dono: "Redator" },
    { id: "revisao", nome: "Revisão", dono: "Revisores" },
    { id: "aprovado", nome: "Aprovado", dono: "Você" },
    { id: "agendado", nome: "Agendado", dono: "Coordenador" }
  ];
  const AGENTES = [
    { n: "Coordenador", d: "Distribui o trabalho e fecha a rodada", f1: true },
    { n: "Estrategista", d: "Monta o calendário e os pilares", f1: true },
    { n: "Redator", d: "Escreve legendas, carrosséis e roteiros", f1: true },
    { n: "Revisor de marca", d: "Voz TRAUBE, nome, promessas e dados", f1: true },
    { n: "Revisor médico", d: "Só em posts médicos (fase 2)", f1: false }
  ];
  const FORMATOS = { reel: "Reel", carrossel: "Carrossel", feed: "Imagem", video: "Vídeo" };
  const REDES = { instagram: "Instagram", tiktok: "TikTok", ambas: "Instagram + TikTok" };

  const state = {
    user: null,
    isAdmin: false,
    pinConfigured: false,
    pinUnlocked: false,
    posts: [],
    log: [],
    config: null,
    vista: "quadro",
    rede: "todas",
    sel: null,
    ajuste: false,
    ocupado: false,
    carregou: false,
    erro: "",
    aviso: "",
    ig: { carregado: false },
    appId: "",
    msgMidia: ""
  };
  const MIDIA_BUCKET = "marketing_videos_temp";
  const ESCOPOS_IG = "instagram_business_basic,instagram_business_content_publish";
  const AVISOS_IG = {
    conectado: "Instagram conectado.",
    negado: "A conexão com o Instagram foi cancelada.",
    "estado-invalido": "O link de conexão expirou ou já foi usado. Clique em Conectar Instagram de novo.",
    "erro-config": "O servidor ainda não tem as chaves do app da Meta.",
    erro: "Não foi possível conectar o Instagram. Tente de novo.",
    invalido: "Não foi possível conectar o Instagram. Tente de novo."
  };

  function sbClient() { return window.supabaseClient || window.sb; }

  function el(tag, attrs, kids) {
    const e = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach((k) => {
        const v = attrs[k];
        if (k === "text") e.textContent = v;
        else if (k.slice(0, 2) === "on") e.addEventListener(k.slice(2), v);
        else if (v !== false && v != null) e.setAttribute(k, v === true ? "" : v);
      });
    }
    (kids || []).forEach((c) => { if (c) e.appendChild(typeof c === "string" ? document.createTextNode(c) : c); });
    return e;
  }
  function fmtData(iso) {
    if (!iso) return "Sem data";
    const p = String(iso).split("-");
    if (p.length !== 3) return iso;
    const d = new Date(+p[0], +p[1] - 1, +p[2]);
    return new Intl.DateTimeFormat("pt-BR", { weekday: "short", day: "2-digit", month: "short" }).format(d).replace(".", "");
  }
  function pad(n) { return String(n).padStart(2, "0"); }
  function isoLocal(d) { return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); }
  function addDias(iso, n) { const p = iso.split("-"); return isoLocal(new Date(+p[0], +p[1] - 1, +p[2] + n)); }
  function fmtHora(iso) {
    if (!iso) return "";
    const d = new Date(iso);
    if (isNaN(d)) return "";
    return new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" }).format(d).replace(".", "");
  }

  // FUNÇÕES DE SEGURANÇA E PIN
  function adminPinGraceStorageKey() {
    const userId = String(state.user?.id || window.docmapUser?.id || "admin");
    return `${ADMIN_PIN_GRACE_KEY}:${userId}`;
  }

  function rememberAdminPinUnlock() {
    try {
      localStorage.setItem(adminPinGraceStorageKey(), String(Date.now() + ADMIN_PIN_GRACE_MS));
    } catch (_) {}
  }

  function hasRecentAdminPinUnlock() {
    try {
      const key = adminPinGraceStorageKey();
      const expiresAt = Number(localStorage.getItem(key) || 0);
      return Number.isFinite(expiresAt) && expiresAt > Date.now();
    } catch (_) {
      return false;
    }
  }

  function normalizePin(value) {
    return String(value || "").replace(/\D/g, "").slice(0, 6);
  }

  function setPinMessage(text, type = "") {
    const message = $("admin-pin-message");
    if (!message) return;
    message.textContent = text;
    message.className = `admin-pin-message ${type}`.trim();
  }

  function setPinGateMode(hasPin) {
    state.pinConfigured = Boolean(hasPin);
    const fields = $("admin-pin-fields");
    const confirmWrap = $("admin-pin-confirm-wrap");
    const title = $("admin-pin-title");
    const description = $("admin-pin-description");
    const label = $("admin-pin-label");
    const submit = $("admin-pin-submit");

    if (fields) fields.hidden = false;
    if (confirmWrap) confirmWrap.hidden = state.pinConfigured;
    if (title) title.textContent = state.pinConfigured ? "Digite seu PIN" : "Cadastre seu PIN";
    if (description) description.textContent = state.pinConfigured ? "Digite os 6 dígitos do Admin para abrir a Agência TRAUBE." : "Crie um PIN de 6 dígitos.";
    if (label) label.textContent = state.pinConfigured ? "PIN de 6 dígitos" : "Criar PIN";
    if (submit) {
      submit.textContent = state.pinConfigured ? "Desbloquear Marketing" : "Cadastrar PIN";
      submit.disabled = false;
    }
    setPinMessage(state.pinConfigured ? "Área protegida por PIN." : "PIN protegido e sincronizado.");
  }

  async function loadPinStatus() {
    const sb = window.supabaseClient || window.sb;
    if (!sb) return false;
    const { data, error } = await sb.rpc("admin_pin_status");
    if (error) throw error;
    setPinGateMode(data?.has_pin === true);
    return data?.has_pin === true;
  }

  async function unlockEditorialPage() {
    state.pinUnlocked = true;
    const gate = $("admin-pin-gate");
    const app = $("editorial-app");
    document.body.classList.remove("admin-pin-locked");
    document.body.classList.add("admin-unlocked");
    if (gate) gate.hidden = true;
    if (app) app.hidden = false;
    await carregarAgencia();
  }

  async function submitEditorialPin(event) {
    event.preventDefault();
    const pin = normalizePin($("admin-pin")?.value);
    const confirmPin = normalizePin($("admin-pin-confirm")?.value);
    const submit = $("admin-pin-submit");

    if (pin.length !== 6) {
      setPinMessage("Digite exatamente 6 números.", "error");
      return;
    }

    if (!state.pinConfigured && pin !== confirmPin) {
      setPinMessage("Os PINs digitados não coincidem.", "error");
      return;
    }

    if (submit) {
      submit.disabled = true;
      submit.textContent = "Verificando...";
    }

    const sb = window.supabaseClient || window.sb;
    try {
      if (!state.pinConfigured) {
        const { data, error } = await sb.rpc("admin_set_pin", { p_pin: pin });
        if (error || data !== true) throw error || new Error("Falha ao salvar PIN.");
        setPinMessage("PIN cadastrado.", "success");
        rememberAdminPinUnlock();
        unlockEditorialPage();
        return;
      }

      const { data, error } = await sb.rpc("admin_verify_pin", { p_pin: pin });
      if (error) throw error;

      if (data?.ok === true) {
        setPinMessage("Acesso liberado.", "success");
        rememberAdminPinUnlock();
        unlockEditorialPage();
      } else {
        setPinMessage(data?.message || "PIN incorreto.", "error");
        if (submit) { submit.disabled = false; submit.textContent = "Tentar Novamente"; }
      }
    } catch (err) {
      setPinMessage("Erro ao autenticar.", "error");
      if (submit) { submit.disabled = false; submit.textContent = "Desbloquear Marketing"; }
    }
  }

  // ==============================================================
  // AGÊNCIA TRAUBE: dados (Supabase, protegido por RLS is_admin())
  // ==============================================================
  async function carregarAgencia() {
    const sb = sbClient();
    state.carregou = false;
    state.erro = "";
    renderAll();
    const limite = setTimeout(() => {
      if (!state.carregou) { state.erro = "Os dados ainda não responderam. Verifique a conexão e recarregue."; state.carregou = true; renderAll(); }
    }, 12000);
    try {
      const [p, a, c] = await Promise.all([
        sb.from("agencia_posts").select("*").order("data", { ascending: true, nullsFirst: false }),
        sb.from("agencia_atividade").select("quem,acao,titulo,em").order("em", { ascending: false }).limit(30),
        sb.from("agencia_config").select("*").eq("id", "agencia").maybeSingle()
      ]);
      if (p.error) throw p.error;
      state.posts = Array.isArray(p.data) ? p.data : [];
      state.log = a.error || !Array.isArray(a.data) ? [] : a.data;
      state.config = c.error ? null : c.data;
      state.erro = "";
      await carregarInstagram(sb);
    } catch (e) {
      console.error("[Agência] erro ao carregar", e);
      state.erro = "Não foi possível carregar os posts. Tente recarregar a página.";
    }
    clearTimeout(limite);
    state.carregou = true;
    renderAll();
  }

  async function carregarInstagram(sb) {
    try {
      const st = await sb.rpc("agencia_instagram_status");
      state.ig = st.error || !st.data ? { carregado: true, erro: true } : Object.assign({ carregado: true }, st.data);
    } catch (_) { state.ig = { carregado: true, erro: true }; }
    try {
      const c = await sb.from("agencia_config").select("observacao").eq("id", "instagram_app_id").maybeSingle();
      state.appId = ((c && c.data && c.data.observacao) || "").trim();
    } catch (_) { state.appId = ""; }
  }
  function lerAvisoInstagram() {
    try {
      const q = new URLSearchParams(window.location.search).get("instagram");
      if (!q) return;
      state.aviso = AVISOS_IG[q] || AVISOS_IG.erro;
      window.history.replaceState(null, "", window.location.pathname);
    } catch (_) {}
  }
  async function conectarInstagram() {
    const sb = sbClient();
    if (!sb || !state.appId || state.ocupado) return;
    state.ocupado = true; renderInstagram();
    try {
      const r = await sb.rpc("agencia_instagram_iniciar");
      if (r.error || !r.data) throw (r.error || new Error("sem state"));
      const base = String(sb.supabaseUrl || "").replace(/\/+$/, "");
      const q = new URLSearchParams({
        client_id: state.appId,
        redirect_uri: base + "/functions/v1/agencia-instagram-callback",
        response_type: "code",
        scope: ESCOPOS_IG,
        state: r.data
      });
      window.location.assign("https://www.instagram.com/oauth/authorize?" + q.toString());
      return;
    } catch (e) {
      console.error("[Agência] erro ao iniciar a conexão", e);
      state.aviso = "Não foi possível iniciar a conexão com o Instagram.";
    }
    state.ocupado = false; renderAll();
  }
  async function desconectarInstagram() {
    const sb = sbClient();
    if (!sb || state.ocupado) return;
    if (!window.confirm("Desconectar o Instagram? Posts agendados vão falhar até você conectar de novo.")) return;
    state.ocupado = true; renderInstagram();
    try {
      const r = await sb.rpc("agencia_instagram_desconectar");
      if (r.error) throw r.error;
      state.aviso = "Instagram desconectado.";
    } catch (e) {
      console.error("[Agência] erro ao desconectar", e);
      state.aviso = "Não foi possível desconectar.";
    }
    state.ocupado = false;
    await carregarAgencia();
  }
  function renderInstagram() {
    const box = $("ag-instagram");
    if (!box) return;
    box.textContent = "";
    const ig = state.ig || {};
    if (!ig.carregado) { box.appendChild(el("p", { class: "ag-nota", text: "Verificando a conexão…" })); return; }
    if (ig.erro) { box.appendChild(el("p", { class: "ag-nota", text: "Não foi possível verificar a conexão com o Instagram." })); return; }
    if (ig.conectado) {
      box.appendChild(el("p", { class: "ag-nota", text: "Conectado" + (ig.username ? " como @" + ig.username : "") + "." }));
      box.appendChild(el("p", { class: "ag-nota", text: "A conexão é renovada sozinha. Válida até " + fmtHora(ig.expira_em) + "." }));
      box.appendChild(el("button", { class: "ag-btn", type: "button", disabled: state.ocupado, onclick: desconectarInstagram, text: "Desconectar" }));
      return;
    }
    box.appendChild(el("p", { class: "ag-nota", text: ig.expirado ? "A conexão expirou. Conecte de novo para publicar." : "Não conectado. Sem a conexão, nada é publicado." }));
    if (!state.appId) box.appendChild(el("p", { class: "ag-nota", text: "Falta o ID do app da Meta (configuração única)." }));
    box.appendChild(el("button", { class: "ag-btn primario", type: "button", disabled: state.ocupado || !state.appId, onclick: conectarInstagram, text: "Conectar Instagram" }));
  }

  async function paraJpeg(arquivo) {
    if (arquivo.type === "image/jpeg" && arquivo.size <= 8 * 1024 * 1024) return arquivo;
    const bmp = await createImageBitmap(arquivo);
    const esc = Math.min(1, 1440 / bmp.width);
    const c = document.createElement("canvas");
    c.width = Math.round(bmp.width * esc); c.height = Math.round(bmp.height * esc);
    const ctx = c.getContext("2d");
    ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, c.width, c.height);
    ctx.drawImage(bmp, 0, 0, c.width, c.height);
    return await new Promise((ok, no) => c.toBlob((b) => (b ? ok(b) : no(new Error("Falha ao converter a imagem."))), "image/jpeg", 0.92));
  }
  async function anexarMidia(p, lista) {
    const sb = sbClient();
    const arquivos = Array.from(lista || []);
    if (!sb || !arquivos.length || state.ocupado) return;
    arquivos.sort((a, b) => a.name.localeCompare(b.name, "pt-BR", { numeric: true }));
    state.ocupado = true; state.msgMidia = "Enviando…"; renderPainel();
    try {
      const novas = [];
      for (const f of arquivos) {
        let blob, ext, tipo;
        if (f.type === "video/mp4") {
          if (f.size > 100 * 1024 * 1024) throw new Error("O vídeo passa de 100 MB.");
          blob = f; ext = "mp4"; tipo = "video/mp4";
        } else if ((f.type || "").indexOf("image/") === 0) {
          blob = await paraJpeg(f); ext = "jpg"; tipo = "image/jpeg";
          if (blob.size > 8 * 1024 * 1024) throw new Error("Uma imagem passa de 8 MB.");
        } else throw new Error("Formato não suportado: " + f.name);
        const caminho = "agencia/" + p.id + "/" + Date.now() + "-" + novas.length + "." + ext;
        const up = await sb.storage.from(MIDIA_BUCKET).upload(caminho, blob, { contentType: tipo, upsert: false });
        if (up.error) throw up.error;
        novas.push(sb.storage.from(MIDIA_BUCKET).getPublicUrl(caminho).data.publicUrl);
      }
      const midia = (Array.isArray(p.midia) ? p.midia : []).concat(novas);
      const r = await sb.from("agencia_posts").update({ midia, atualizado_em: new Date().toISOString() }).eq("id", p.id);
      if (r.error) throw r.error;
      state.msgMidia = "";
    } catch (e) {
      console.error("[Agência] erro ao anexar mídia", e);
      state.msgMidia = "Não foi possível anexar: " + ((e && e.message) || "erro desconhecido");
    }
    state.ocupado = false;
    await carregarAgencia();
  }
  async function removerMidia(p, i) {
    const sb = sbClient();
    if (!sb || state.ocupado) return;
    const atuais = Array.isArray(p.midia) ? p.midia.slice() : [];
    const url = atuais.splice(i, 1)[0];
    state.ocupado = true; renderPainel();
    try {
      const r = await sb.from("agencia_posts").update({ midia: atuais, atualizado_em: new Date().toISOString() }).eq("id", p.id);
      if (r.error) throw r.error;
      const marca = "/" + MIDIA_BUCKET + "/";
      const pos = String(url || "").indexOf(marca);
      if (pos >= 0) { try { await sb.storage.from(MIDIA_BUCKET).remove([decodeURIComponent(url.slice(pos + marca.length).split("?")[0])]); } catch (_) {} }
      state.msgMidia = "";
    } catch (e) {
      console.error("[Agência] erro ao remover mídia", e);
      state.msgMidia = "Não foi possível remover a mídia.";
    }
    state.ocupado = false;
    await carregarAgencia();
  }
  function problemaMidia(p) {
    const m = Array.isArray(p.midia) ? p.midia : [];
    if (!m.length) return "Anexe a mídia antes de agendar.";
    if (p.formato === "carrossel" && (m.length < 2 || m.length > 10)) return "Carrossel precisa de 2 a 10 imagens.";
    if (p.formato === "feed" && m.length !== 1) return "Post de imagem única precisa de exatamente 1 imagem.";
    if ((p.formato === "reel" || p.formato === "video") && !(m.length === 1 && /\.mp4(\?|$)/i.test(m[0]))) return "Reel precisa de exatamente 1 vídeo MP4.";
    return "";
  }

  function visiveis() {
    return state.posts.filter((p) => p.coluna !== "descartado" && (state.rede === "todas" || p.rede === state.rede || p.rede === "ambas"));
  }
  function chipStatus(p) {
    const out = [];
    const m = p.marca;
    out.push(el("span", { class: "ag-chip " + (m === "aprovada" ? "ok" : m === "ajustes" ? "erro" : "alerta"), text: "Marca: " + (m === "aprovada" ? "ok" : m === "ajustes" ? "ajustes" : "pendente") }));
    if (p.medico && p.medico !== "nao-se-aplica") {
      out.push(el("span", { class: "ag-chip " + (p.medico === "aprovado" ? "ok" : "alerta"), text: "Médico: " + (p.medico === "aprovado" ? "ok" : "pendente") }));
    }
    if (p.teste) out.push(el("span", { class: "ag-chip teste", text: "exemplo" }));
    return out;
  }
  function cartao(p) {
    return el("button", { class: "ag-cartao", type: "button", onclick: () => { state.sel = p.id; state.ajuste = false; renderPainel(); } }, [
      el("h3", { text: p.titulo || "Sem título" }),
      el("div", { class: "ag-meta" }, [
        el("span", { text: (REDES[p.rede] || p.rede || "") + " · " + (FORMATOS[p.formato] || p.formato || "") }),
        el("span", { text: fmtData(p.data) }),
        contagem(p) ? el("span", { text: contagem(p) }) : null
      ]),
      el("div", { class: "ag-meta" }, chipStatus(p))
    ]);
  }

  function renderResumo() {
    const box = $("ag-resumo");
    const av = $("ag-avisos");
    if (!box || !av) return;
    box.textContent = "";
    av.textContent = "";
    const v = visiveis();
    COLUNAS.forEach((c) => {
      const n = v.filter((p) => p.coluna === c.id).length;
      box.appendChild(el("span", null, [el("b", { text: String(n) }), c.nome]));
    });
    if (state.erro) av.appendChild(el("p", { class: "ag-aviso erro", text: state.erro }));
    if (state.aviso) av.appendChild(el("p", { class: "ag-aviso", text: state.aviso }));
    const espera = v.filter((p) => p.coluna === "revisao").length;
    if (espera) av.appendChild(el("p", { class: "ag-aviso", text: espera + (espera === 1 ? " post espera" : " posts esperam") + " a sua decisão na coluna Revisão." }));
  }
  function renderQuadro() {
    const q = el("div", { class: "ag-quadro" });
    const v = visiveis();
    COLUNAS.forEach((c) => {
      const itens = v.filter((p) => p.coluna === c.id);
      const col = el("section", { class: "ag-coluna", "aria-label": c.nome }, [
        el("h2", null, [c.nome, el("small", { text: c.dono + " · " + itens.length })])
      ]);
      if (!itens.length) col.appendChild(el("p", { class: "ag-vazio", text: "Nada aqui." }));
      itens.forEach((p) => col.appendChild(cartao(p)));
      q.appendChild(col);
    });
    return q;
  }
  function renderCalendario() {
    const wrap = el("div", { class: "ag-calendario" });
    const v = visiveis();
    const hoje = isoLocal(new Date());
    let algum = false;
    for (let i = 0; i < 14; i++) {
      const dia = addDias(hoje, i);
      const itens = v.filter((p) => p.data === dia);
      if (itens.length) algum = true;
      wrap.appendChild(el("div", { class: "ag-dia" + (i === 0 ? " hoje" : "") }, [
        el("div", { text: (i === 0 ? "Hoje · " : "") + fmtData(dia) }),
        el("div", { class: "ag-cartoes" }, itens.length ? itens.map(cartao) : [el("span", { class: "ag-nota", text: "Sem posts" })])
      ]));
    }
    const fora = v.filter((p) => !p.data || p.data < hoje);
    if (fora.length) wrap.appendChild(el("div", { class: "ag-dia" }, [el("div", { text: "Fora das próximas 2 semanas" }), el("div", { class: "ag-cartoes" }, fora.map(cartao))]));
    if (!algum && !fora.length) wrap.insertBefore(el("p", { class: "ag-nota", text: "Nenhum post marcado para as próximas 2 semanas." }), wrap.firstChild);
    return wrap;
  }
  function renderPrincipal() {
    const m = $("ag-principal");
    if (!m) return;
    m.textContent = "";
    if (!state.carregou) { m.appendChild(el("p", { class: "ag-nota", text: "Carregando o quadro…" })); return; }
    if (!state.posts.length) {
      m.appendChild(el("div", { class: "ag-caixa" }, [
        el("h2", { text: "Nenhum post ainda" }),
        el("p", { text: "Quando a equipe fizer a primeira rodada, as ideias aparecem na coluna Ideia e andam até Revisão. Você decide o que vai ao ar." })
      ]));
      return;
    }
    m.appendChild(state.vista === "quadro" ? renderQuadro() : renderCalendario());
  }
  function renderLateral() {
    const ag = $("ag-agentes");
    const lg = $("ag-log");
    if (!ag || !lg) return;
    ag.textContent = "";
    AGENTES.forEach((a) => {
      ag.appendChild(el("li", { class: a.f1 ? "" : "depois" }, [
        el("strong", { text: a.n + (a.f1 ? "" : " (fase 2)") }),
        el("span", { text: a.d })
      ]));
    });
    const r = state.config && state.config.ultima_rodada;
    $("ag-rodada").textContent = r ? "Última rodada: " + fmtHora(r) : "Nenhuma rodada registrada.";
    lg.textContent = "";
    if (!state.log.length) lg.appendChild(el("li", { class: "ag-nota", text: "Sem atividade ainda." }));
    state.log.forEach((l) => {
      lg.appendChild(el("li", null, [
        el("span", { text: (l.quem || "") + ": " + (l.acao || "") + (l.titulo ? " — " + l.titulo : "") }),
        el("small", { text: fmtHora(l.em) })
      ]));
    });
  }

  function bloqueioAprovar(p) {
    if (p.marca !== "aprovada") return "A revisão de marca ainda não aprovou este post.";
    if (p.medico === "pendente") return "A revisão médica ainda está pendente.";
    return "";
  }

  async function agir(p, acao) {
    const sb = sbClient();
    if (state.ocupado || !sb) return;
    // Ler os campos ANTES de redesenhar o painel, senão eles voltam ao valor inicial.
    const campoAgendar = (($("ag-publicar-em") || {}).value || "").trim();
    const campoAjuste = (($("ag-nota-ajuste") || {}).value || "").trim();
    state.ocupado = true;
    renderPainel();
    const agora = new Date().toISOString();
    try {
      let upd = null;
      let texto = "";
      if (acao === "aprovar-ideia") { upd = { coluna: "redacao" }; texto = "aprovou a ideia"; }
      else if (acao === "descartar") { upd = { coluna: "descartado" }; texto = "descartou"; }
      else if (acao === "aprovar") { upd = { coluna: "aprovado", aprovado_em: agora }; texto = "aprovou para publicar"; }
      else if (acao === "agendar") {
        const campo = campoAgendar;
        const quando = campo ? new Date(campo) : null;
        if (!quando || isNaN(quando.getTime())) { state.ocupado = false; state.erro = "Escolha a data e a hora da publicação."; renderAll(); return; }
        if (quando.getTime() < Date.now() + 10 * 60 * 1000) { state.ocupado = false; state.erro = "A publicação precisa ser pelo menos 10 minutos no futuro."; renderAll(); return; }
        upd = { coluna: "agendado", status_publicacao: "agendado", publicar_em: quando.toISOString(), agendado_em: agora, publicacao_erro: null };
        texto = "agendou a publicação para " + fmtHora(quando.toISOString());
      }
      else if (acao === "cancelar-agendamento") {
        upd = { coluna: "aprovado", status_publicacao: "nao_agendado", publicar_em: null, publicacao_erro: null };
        texto = "cancelou o agendamento";
      }
      else if (acao === "ajustes") {
        const nota = campoAjuste;
        if (!nota) { state.ocupado = false; renderPainel(); return; }
        upd = { coluna: "redacao", notas_ajuste: nota, marca: "pendente" };
        texto = "pediu ajustes";
      }
      if (!upd) { state.ocupado = false; return; }
      upd.atualizado_em = agora;
      const r1 = await sb.from("agencia_posts").update(upd).eq("id", p.id);
      if (r1.error) throw r1.error;
      await sb.from("agencia_atividade").insert({ quem: "Luiz", acao: texto, titulo: p.titulo || "", em: agora });
      if (acao === "ajustes" || acao === "descartar") state.sel = null;
      state.ajuste = false;
      state.ocupado = false;
      await carregarAgencia();
      return;
    } catch (e) {
      console.error("[Agência] erro ao salvar", e);
      state.erro = "Não foi possível salvar a decisão. Tente de novo em instantes.";
    }
    state.ocupado = false;
    renderAll();
  }

  function secao(titulo, conteudo) {
    return el("section", null, [el("h3", { text: titulo }), conteudo]);
  }

  // ==============================================================
  // PRÉVIA: cartões do que vai aparecer em cada página/cena do post
  // ==============================================================
  const ROTULO_SLIDE = /^(Capa|Fechamento|Convite|Passo\s*\d+|Slide\s*\d+)\s*:\s*/i;
  const LINHA_CENA = /^\s*(\d+\s*[-–]\s*\d+\s*s)\s*(?:\(([^)]*)\))?\s*:\s*(.*)$/;

  function cenasDoRoteiro(roteiro) {
    const cenas = [];
    const notas = [];
    String(roteiro || "").split("\n").forEach((linha) => {
      const t = linha.trim();
      if (!t) return;
      const m = LINHA_CENA.exec(t);
      if (m) {
        const quem = (m[2] || "").trim();
        const texto = m[3].trim();
        cenas.push({ tempo: m[1].replace(/\s+/g, ""), quem, texto, captura: /captura|grava a tela|print/i.test(quem + " " + texto) });
      } else if (cenas.length && !/^(obs|formato|reel|v[ií]deo)/i.test(t)) {
        cenas[cenas.length - 1].texto += " " + t;
      } else {
        notas.push(t);
      }
    });
    return { cenas, notas };
  }

  function cartaoSlide(texto, i, total, quadrado) {
    const m = ROTULO_SLIDE.exec(texto);
    const rotulo = m ? m[1] : (i === 0 ? "Capa" : i === total - 1 && total > 2 ? "Convite" : "");
    const corpo = m ? texto.slice(m[0].length) : texto;
    return el("div", { class: "ag-slide" + (quadrado ? " quadrado" : "") + (i === 0 ? " capa" : "") }, [
      el("div", { class: "ag-slide-topo" }, [
        el("span", { text: rotulo || "Slide" }),
        el("span", { text: total > 1 ? (i + 1) + "/" + total : "" })
      ]),
      el("p", { class: "ag-slide-texto", text: corpo })
    ]);
  }

  function cartaoCena(c, i) {
    return el("div", { class: "ag-cena" + (c.captura ? " captura" : "") }, [
      el("div", { class: "ag-cena-topo" }, [
        el("span", { text: "Cena " + (i + 1) }),
        el("span", { text: c.tempo })
      ]),
      c.captura ? el("span", { class: "ag-selo", text: "Captura real do site" }) : (c.quem ? el("span", { class: "ag-selo falante", text: c.quem }) : null),
      el("p", { class: "ag-cena-texto", text: c.texto }),
      c.captura && c.quem ? el("small", { text: c.quem }) : null
    ]);
  }

  function previa(p) {
    const slides = Array.isArray(p.slides) ? p.slides.filter(Boolean) : [];
    const caixa = el("div", { class: "ag-previa" });
    let info = "";
    if (p.formato === "carrossel" && slides.length) {
      info = slides.length + " slides";
      caixa.appendChild(el("div", { class: "ag-faixa", role: "list" }, slides.map((t, i) => cartaoSlide(t, i, slides.length, false))));
    } else if (p.formato === "feed" && slides.length) {
      info = "Imagem única";
      caixa.appendChild(el("div", { class: "ag-faixa", role: "list" }, slides.map((t, i) => cartaoSlide(t, i, slides.length, true))));
    } else if ((p.formato === "video" || p.formato === "reel") && p.roteiro) {
      const r = cenasDoRoteiro(p.roteiro);
      if (r.cenas.length) {
        info = r.cenas.length + " cenas · vertical 9:16";
        caixa.appendChild(el("div", { class: "ag-faixa", role: "list" }, r.cenas.map(cartaoCena)));
        if (r.notas.length) caixa.appendChild(el("p", { class: "ag-nota", text: r.notas.join(" · ") }));
      }
    }
    if (!caixa.firstChild) {
      caixa.appendChild(el("p", { class: "ag-nota", text: p.gancho ? "Ainda sem conteúdo escrito. Gancho: " + p.gancho : "Ainda sem conteúdo para pré-visualizar." }));
    }
    if (p.legenda) {
      caixa.appendChild(el("div", { class: "ag-legenda" }, [el("small", { text: "Legenda" }), el("p", { text: p.legenda })]));
    }
    return secao("Prévia" + (info ? " · " + info : ""), caixa);
  }

  function contagem(p) {
    const slides = Array.isArray(p.slides) ? p.slides.length : 0;
    if (p.formato === "carrossel" && slides) return slides + " slides";
    if ((p.formato === "video" || p.formato === "reel") && p.roteiro) {
      const n = cenasDoRoteiro(p.roteiro).cenas.length;
      if (n) return n + " cenas";
    }
    return "";
  }
  function renderPainel() {
    const camada = $("ag-camada");
    if (!camada) return;
    camada.textContent = "";
    const p = state.posts.filter((x) => x.id === state.sel)[0];
    if (!p) return;
    const fechar = () => { state.sel = null; state.ajuste = false; renderPainel(); };
    const corpo = [];
    corpo.push(el("button", { class: "ag-btn ag-fechar", type: "button", onclick: fechar, text: "Fechar" }));
    corpo.push(el("h2", { text: p.titulo || "Sem título" }));
    corpo.push(el("div", { class: "ag-meta" }, [
      el("span", { class: "ag-chip", text: REDES[p.rede] || p.rede || "" }),
      el("span", { class: "ag-chip", text: FORMATOS[p.formato] || p.formato || "" }),
      el("span", { text: fmtData(p.data) }),
      p.pilar ? el("span", { text: "Pilar: " + p.pilar }) : null
    ].concat(chipStatus(p))));
    const slides = Array.isArray(p.slides) ? p.slides : [];
    const refs = Array.isArray(p.referencias) ? p.referencias : [];
    if (p.notas_ajuste) corpo.push(secao("Ajustes pedidos", el("p", { class: "ag-texto", text: p.notas_ajuste })));
    if (p.gancho) corpo.push(secao("Gancho", el("p", { class: "ag-texto", text: p.gancho })));
    corpo.push(previa(p));
    if (slides.length || p.roteiro) {
      const texto = [];
      if (slides.length) texto.push(secao("Slides do carrossel", el("ol", null, slides.map((s) => el("li", { text: s })))));
      if (p.roteiro) texto.push(secao("Roteiro", el("p", { class: "ag-texto", text: p.roteiro })));
      corpo.push(el("details", { class: "ag-detalhes" }, [el("summary", { text: "Ver como texto" })].concat(texto)));
    }
    if (refs.length) corpo.push(secao("Referências", el("ul", null, refs.map((r) => el("li", { text: r })))));
    if (p.notas_marca) corpo.push(secao("Revisão de marca", el("p", { class: "ag-texto", text: p.notas_marca })));
    if (p.notas_medico) corpo.push(secao("Revisão médica", el("p", { class: "ag-texto", text: p.notas_medico })));

    const acoes = el("div", { class: "ag-acoes" });
    const pode = !state.ocupado;
    function btn(txt, acao, primario, off, motivo) {
      const b = el("button", { class: "ag-btn" + (primario ? " primario" : ""), type: "button", disabled: !pode || !!off, onclick: () => agir(p, acao), text: txt });
      if (off && motivo) b.setAttribute("title", motivo);
      return b;
    }
    if (p.coluna === "ideia") { acoes.appendChild(btn("Aprovar ideia", "aprovar-ideia", true)); acoes.appendChild(btn("Descartar", "descartar", false)); }
    if (p.coluna === "revisao") {
      const motivo = bloqueioAprovar(p);
      acoes.appendChild(btn("Aprovar para publicar", "aprovar", true, motivo, motivo));
      acoes.appendChild(el("button", { class: "ag-btn", type: "button", disabled: !pode, onclick: () => { state.ajuste = !state.ajuste; renderPainel(); }, text: "Pedir ajustes" }));
    }
    if (p.coluna === "aprovado") {
      const midia = Array.isArray(p.midia) ? p.midia : [];
      const probMidia = problemaMidia(p);
      corpo.push(secao("Mídia para publicar", el("div", null, [
        el("div", { class: "ag-midia" }, midia.map((u, i) => el("div", { class: "ag-midia-item" }, [
          /\.mp4(\?|$)/i.test(u) ? el("span", { class: "ag-chip", text: "Vídeo MP4" }) : el("img", { src: u, alt: "Imagem " + (i + 1), loading: "lazy" }),
          el("button", { class: "ag-btn", type: "button", disabled: !pode, onclick: () => removerMidia(p, i), text: "Remover" })
        ]))),
        el("label", { for: "ag-arquivos", class: "ag-nota", text: midia.length ? "Adicionar mais arquivos" : "Anexar imagens (PNG, JPG ou WebP, convertidas para JPEG) ou 1 vídeo MP4" }),
        el("input", { id: "ag-arquivos", type: "file", multiple: true, accept: "image/*,video/mp4", disabled: !pode, onchange: (ev) => anexarMidia(p, ev.target.files) }),
        state.msgMidia ? el("p", { class: "ag-nota", text: state.msgMidia }) : null
      ])));
      const sugestao = new Date(Date.now() + 24 * 3600 * 1000); sugestao.setMinutes(0, 0, 0);
      const valorInicial = sugestao.getFullYear() + "-" + pad(sugestao.getMonth() + 1) + "-" + pad(sugestao.getDate()) + "T" + pad(sugestao.getHours()) + ":00";
      corpo.push(secao("Agendar publicação", el("div", null, [
        el("label", { for: "ag-publicar-em", class: "ag-nota", text: "Data e hora (horário de Brasília)" }),
        el("input", { id: "ag-publicar-em", type: "datetime-local", value: valorInicial }),
        probMidia ? el("p", { class: "ag-nota", text: probMidia }) : null
      ])));
      acoes.appendChild(btn("Agendar publicação", "agendar", true, probMidia, probMidia));
    }
    if (p.coluna === "redacao") acoes.appendChild(el("p", { class: "ag-nota", text: "O redator está trabalhando neste post." }));
    if (p.coluna === "agendado") {
      const st = p.status_publicacao || "agendado";
      const rotulo = { agendado: "Agendado para " + fmtHora(p.publicar_em || p.agendado_em), publicando: "Publicando agora…", publicado: "Publicado" + (p.publicado_em ? " em " + fmtHora(p.publicado_em) : ""), simulado: "Simulação concluída: nada foi enviado ao Instagram.", erro: "Erro na publicação" }[st] || "Agendado";
      acoes.appendChild(el("p", { class: "ag-nota", text: rotulo + "." }));
      if (p.publicacao_erro) corpo.push(secao("Motivo do erro", el("p", { class: "ag-texto", text: p.publicacao_erro })));
      if (/^https:\/\//.test(p.publicacao_url || "")) corpo.push(secao("Publicação", el("a", { href: p.publicacao_url, target: "_blank", rel: "noopener noreferrer", text: "Abrir no Instagram" })));
      if (st !== "publicando") acoes.appendChild(btn("Cancelar agendamento", "cancelar-agendamento", false));
    }
    corpo.push(acoes);
    if (p.coluna === "revisao" && bloqueioAprovar(p)) corpo.push(el("p", { class: "ag-nota", text: bloqueioAprovar(p) }));
    if (state.ajuste) {
      corpo.push(el("div", null, [
        el("label", { for: "ag-nota-ajuste", class: "ag-nota", text: "O que precisa mudar?" }),
        el("textarea", { id: "ag-nota-ajuste" }),
        el("div", { class: "ag-acoes" }, [el("button", { class: "ag-btn primario", type: "button", onclick: () => agir(p, "ajustes"), text: "Enviar para o redator" })])
      ]));
    }
    const fundo = el("div", { class: "ag-painel-fundo", onclick: (ev) => { if (ev.target === fundo) fechar(); } }, [
      el("div", { class: "ag-painel", role: "dialog", "aria-modal": "true", "aria-label": p.titulo || "Post" }, corpo)
    ]);
    camada.appendChild(fundo);
  }
  function renderAll() { renderResumo(); renderPrincipal(); renderLateral(); renderInstagram(); renderPainel(); }

  function ligarControles() {
    const vq = $("ag-v-quadro");
    const vc = $("ag-v-calendario");
    if (vq) vq.onclick = () => { state.vista = "quadro"; vq.setAttribute("aria-pressed", "true"); vc.setAttribute("aria-pressed", "false"); renderPrincipal(); };
    if (vc) vc.onclick = () => { state.vista = "calendario"; vc.setAttribute("aria-pressed", "true"); vq.setAttribute("aria-pressed", "false"); renderPrincipal(); };
    document.querySelectorAll("[data-ag-rede]").forEach((b) => {
      b.onclick = () => {
        state.rede = b.getAttribute("data-ag-rede");
        document.querySelectorAll("[data-ag-rede]").forEach((o) => o.setAttribute("aria-pressed", o === b ? "true" : "false"));
        renderAll();
      };
    });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && state.sel) { state.sel = null; state.ajuste = false; renderPainel(); } });
  }

  async function init() {
    lerAvisoInstagram();
    ligarControles();
    $("admin-pin-form")?.addEventListener("submit", submitEditorialPin);

    const pinInput = $("admin-pin");
    if (pinInput) {
      pinInput.addEventListener("input", () => {
        pinInput.value = normalizePin(pinInput.value);
        if (pinInput.value.length === 6 && state.pinConfigured) $("admin-pin-form")?.requestSubmit();
      });
    }

    const sb = sbClient();
    if (!sb) { setTimeout(init, 300); return; }

    try {
      const { data: { user } } = await sb.auth.getUser();
      state.user = user;

      let isAdmin = false;
      try {
        const { data: rpcAdmin } = await sb.rpc("is_admin");
        if (rpcAdmin === true) isAdmin = true;
        else if (typeof window.verificarAcessoAdmin === "function") isAdmin = await window.verificarAcessoAdmin();
      } catch (_) {
        if (typeof window.verificarAcessoAdmin === "function") isAdmin = await window.verificarAcessoAdmin();
      }

      state.isAdmin = isAdmin;

      if (!isAdmin) {
        setPinMessage("Acesso restrito a administradores. Redirecionando...", "error");
        setTimeout(() => { window.location.replace("/dashboard/"); }, 800);
        return;
      }

      if (hasRecentAdminPinUnlock()) {
        unlockEditorialPage();
        return;
      }

      await loadPinStatus();
    } catch (err) {
      console.error("[Agência Init Error]", err);
    }
  }

  document.addEventListener("DOMContentLoaded", init);
})();
