/* LURIA: apostila <-> anotacoes, com opcao de leitura lado a lado. */
(() => {
  "use strict";
  const book = document.querySelector(".book-page .book-main");
  const notes = document.body?.dataset.page === "caderno";
  if (!book && !notes) return;
  const params = new URLSearchParams(location.search);
  const embedded = params.get("embedded") === "1";
  if (embedded) document.body.classList.add("luria-dual-embedded");
  const styles = document.createElement("style");
  styles.textContent = `
    .luria-dual-actions{display:flex;flex-wrap:wrap;gap:8px;align-items:center}
    .luria-dual-btn{min-height:36px;padding:8px 12px;background:#184888;color:#fff;border:1px solid #184888;border-radius:9px;cursor:pointer;font:inherit;font-weight:650;font-size:12px}
    .luria-dual-btn.secondary{background:var(--surface,#fff);color:var(--accent,#184888);border-color:var(--border,#ddd)}
    .luria-dual-btn:disabled{opacity:.5;cursor:not-allowed}
    .luria-dual-bar{display:flex;align-items:center;justify-content:space-between;gap:9px;flex-wrap:wrap;margin:8px 0}
    .luria-dual-layout{--split:50%;display:flex;width:100%;max-width:100%;height:calc(100dvh - 150px);min-height:300px;overflow:hidden}
    .luria-dual-layout>.luria-dual-left{flex:0 0 calc(var(--split) - 6px);width:0!important;height:100%;max-width:none!important;min-width:0!important;overflow:auto!important}
    .luria-dual-layout>.luria-dual-divider{width:12px;flex:0 0 12px;background:var(--surface-2,#eef2f7);cursor:col-resize;touch-action:none;position:relative}
    .luria-dual-divider:after{content:"";position:absolute;left:4px;top:35%;height:30%;width:4px;border-radius:8px;background:#184888}
    .luria-dual-layout>.luria-dual-right{flex:1;min-width:0;border:1px solid var(--border,#ddd);border-radius:10px;overflow:hidden;background:var(--surface,#fff)}
    .luria-dual-right iframe{display:block;width:100%;height:100%;border:0}
    body.luria-dual-active .page{width:100%!important;max-width:100%!important}
    body.luria-dual-active .book-page.luria-dual-left{grid-template-columns:minmax(0,1fr) 100px!important;gap:8px!important}
    body.luria-dual-active .note-studio.luria-dual-left{grid-template-columns:minmax(0,1fr)!important;padding:4px!important}
    body.luria-dual-active .note-studio .note-tree,body.luria-dual-active .note-studio .note-info{display:none!important}
    body.luria-dual-active .note-studio .note-canvas{min-width:0!important}
    body.luria-dual-embedded .sidebar,body.luria-dual-embedded .sidebar-backdrop,body.luria-dual-embedded .topbar,body.luria-dual-embedded .luria-page-spotlight,body.luria-dual-embedded .note-back-library,body.luria-dual-embedded .note-tree,body.luria-dual-embedded .note-info,body.luria-dual-embedded .book-outline{display:none!important}
    body.luria-dual-embedded .app-shell,body.luria-dual-embedded .main,body.luria-dual-embedded .page,body.luria-dual-embedded .note-studio-wrap{display:block!important;grid-template-columns:minmax(0,1fr)!important;margin:0!important;padding:0!important;width:100%!important;max-width:none!important;min-height:0!important}
    body.luria-dual-embedded .note-studio,body.luria-dual-embedded .book-page{display:block!important;padding:6px!important;width:100%!important;max-width:none!important}
    body.luria-dual-embedded .book-main,body.luria-dual-embedded .note-canvas,body.luria-dual-embedded .notebook-editor{width:100%!important;max-width:none!important;min-width:0!important}
    body.luria-dual-embedded .luria-dual-actions{display:none!important}
    @media (orientation:portrait) and (max-width:700px){
      .luria-dual-layout{flex-direction:column}
      .luria-dual-layout>.luria-dual-left{flex:0 0 calc(var(--split) - 6px);width:100%!important;height:0;min-height:0}
      .luria-dual-layout>.luria-dual-divider{width:100%;height:12px;cursor:row-resize}
      .luria-dual-divider:after{top:4px;left:35%;width:30%;height:4px}
      .luria-dual-layout>.luria-dual-right{min-height:0;width:100%}
      body.luria-dual-active .book-page.luria-dual-left{display:block!important}
      body.luria-dual-active .book-outline{display:none!important}
    }
  `;
  document.head.appendChild(styles);
  const makeButton = (text, secondary) => {
    const el = document.createElement("button");
    el.type = "button"; el.textContent = text;
    el.className = "luria-dual-btn" + (secondary ? " secondary" : "");
    return el;
  };
  const norm = value => String(value || "").normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  const safeBook = path => {
    try {
      const u = new URL(path, location.origin);
      return u.origin === location.origin && /^\/apostilas\/[a-z0-9-]+\/(?:index\.html)?$/.test(u.pathname)
        ? u.pathname.replace(/index\.html$/, "") : "";
    } catch { return ""; }
  };
  let catalogPromise;
  const getCatalog = () => catalogPromise ||= fetch("/assets/data/apostilas-catalogo.json")
    .then(r => r.ok ? r.json() : []).then(r => Array.isArray(r) ? r : []).catch(() => []);
  const current = () => {
    try { return typeof getCurrentDocument === "function" ? getCurrentDocument() : null; }
    catch { return null; }
  };
  function notesUrl() {
    const u = new URL("/caderno/", location.origin);
    u.searchParams.set("view", "library");
    u.searchParams.set("apostila", location.pathname);
    const heading = document.querySelector(".book-hero h1")?.textContent?.trim() ||
      document.title.replace(/\s*[·|]\s*LURIA.*$/i, "").trim();
    u.searchParams.set("titulo", heading);
    for (const key of ["note_id", "topic_id"]) if (params.get(key)) u.searchParams.set(key, params.get(key));
    return u;
  }
  function split(primary, destination, heading, onClose) {
    if (embedded || !primary || !destination) return null;
    const parent = primary.parentElement;
    const marker = document.createComment("split original position");
    parent.insertBefore(marker, primary);
    const bar = document.createElement("div"); bar.className = "luria-dual-bar";
    const label = document.createElement("strong"); label.textContent = heading;
    const actions = document.createElement("div"); actions.className = "luria-dual-actions";
    const reset = makeButton("50/50", true), close = makeButton("Fechar divisão");
    actions.append(reset, close); bar.append(label, actions);
    const shell = document.createElement("div"); shell.className = "luria-dual-layout";
    primary.classList.add("luria-dual-left");
    const divider = document.createElement("div"); divider.className = "luria-dual-divider";
    divider.tabIndex = 0; divider.setAttribute("role", "separator");
    divider.setAttribute("aria-label", "Ajustar espaço da apostila e das anotações");
    const aside = document.createElement("div"); aside.className = "luria-dual-right";
    const iframe = document.createElement("iframe");
    const url = new URL(destination, location.origin); url.searchParams.set("embedded", "1");
    iframe.src = url.toString(); iframe.title = book ? "Anotações LURIA" : "Apostila LURIA";
    aside.append(iframe); shell.append(primary, divider, aside);
    parent.insertBefore(bar, marker); parent.insertBefore(shell, marker);
    document.body.classList.add("luria-dual-active");
    const storage = "luria:study-split-ratio";
    let ratio = 50;
    try { ratio = Math.min(70, Math.max(30, Number(localStorage.getItem(storage)) || 50)); } catch {}
    const set = value => {
      ratio = Math.min(70, Math.max(30, Math.round(value)));
      shell.style.setProperty("--split", String(ratio) + "%");
      divider.setAttribute("aria-valuenow", String(ratio));
    };
    divider.setAttribute("aria-valuemin", "30"); divider.setAttribute("aria-valuemax", "70");
    set(ratio);
    const position = event => {
      const rect = shell.getBoundingClientRect();
      const portrait = matchMedia("(orientation:portrait) and (max-width:700px)").matches;
      set((portrait ? (event.clientY - rect.top) / rect.height : (event.clientX - rect.left) / rect.width) * 100);
    };
    divider.addEventListener("pointerdown", e => { divider.setPointerCapture(e.pointerId); position(e); });
    divider.addEventListener("pointermove", e => { if (divider.hasPointerCapture(e.pointerId)) position(e); });
    divider.addEventListener("pointerup", e => {
      if (divider.hasPointerCapture(e.pointerId)) divider.releasePointerCapture(e.pointerId);
      try { localStorage.setItem(storage, String(ratio)); } catch {}
    });
    divider.addEventListener("keydown", e => {
      if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) return;
      e.preventDefault(); set(ratio + (["ArrowLeft", "ArrowUp"].includes(e.key) ? -5 : 5));
      try { localStorage.setItem(storage, String(ratio)); } catch {}
    });
    reset.addEventListener("click", () => { set(50); try { localStorage.setItem(storage, "50"); } catch {} });
    const teardown = async () => {
      try {
        if (typeof window.LuriaStudySave === "function" && !(await window.LuriaStudySave())) return;
        const embeddedSave = iframe.contentWindow?.LuriaStudySave;
        if (typeof embeddedSave === "function" && !(await embeddedSave())) return;
      } catch (error) {
        if (window.LuriaDialog?.alert) window.LuriaDialog.alert(error?.message || "Salve as anotações antes de fechar a divisão.");
        else alert("Não foi possível salvar as anotações.");
        return;
      }
      parent.insertBefore(primary, marker); primary.classList.remove("luria-dual-left");
      shell.remove(); bar.remove(); marker.remove(); document.body.classList.remove("luria-dual-active");
      if (typeof onClose === "function") onClose();
    };
    close.addEventListener("click", teardown);
    return teardown;
  }

  if (book) {
    const tools = document.querySelector(".book-tools");
    const page = document.querySelector(".book-page");
    if (embedded || !tools || !page) return;
    const open = makeButton("Ver anotações"), divide = makeButton("Dividir tela");
    open.className = divide.className = "book-tool-btn";
    tools.append(open, divide);
    open.addEventListener("click", () => location.assign(notesUrl().toString()));
    let teardown;
    divide.addEventListener("click", () => {
      if (teardown) { void teardown(); }
      else { teardown = split(page, notesUrl(), "Apostila + Anotações", () => { teardown = null; divide.textContent = "Dividir tela"; }); if (teardown) divide.textContent = "Fechar divisão"; }
    });
    return;
  }
  if (notes) {
    const identity = document.querySelector(".note-editor-identity");
    const studio = document.querySelector(".note-studio");
    if (!identity || !studio) return;
    const actions = document.createElement("div"); actions.className = "luria-dual-actions";
    const open = makeButton("Ver apostila"), divide = makeButton("Dividir tela", true);
    actions.append(open, divide); identity.append(actions);
    let target = "", teardown;
    async function refresh() {
      const doc = current();
      if (!doc) { target = ""; divide.disabled = true; return; }
      const entries = await getCatalog();
      const matched = entries.find(item => norm(item.titulo) === norm(doc.title) || norm(item.tema) === norm(doc.title));
      const source = norm(params.get("titulo")) === norm(doc.title) ? safeBook(params.get("apostila")) : "";
      target = safeBook(matched?.content_url) || source;
      open.textContent = target ? "Ver apostila" : "Biblioteca de apostilas";
      divide.disabled = !target || embedded;
    }
    const withNoteId = url => {
      const doc = current();
      if (doc?.type === "lesson" && doc.topic?.id) url.searchParams.set("topic_id", doc.topic.id);
      else if (doc?.note?.id) url.searchParams.set("note_id", doc.note.id);
      return url;
    };
    async function safeSave() {
      try {
        if (typeof notebookState !== "undefined" && notebookState.editorDirty) {
          await saveCurrentNotebook(true);
          if (notebookState.editorDirty) throw new Error("As anotações ainda não foram salvas.");
        }
        return true;
      } catch (e) {
        if (window.LuriaDialog?.alert) window.LuriaDialog.alert(e?.message || "Não foi possível salvar a anotação.");
        else alert("Não foi possível salvar a anotação. Salve antes de sair.");
        return false;
      }
    }
    open.addEventListener("click", async () => {
      await refresh();
      if (!(await safeSave())) return;
      const url = new URL(target || "/apostilas/", location.origin);
      if (target) withNoteId(url);
      if (embedded && window.top !== window) window.top.location.assign(url.toString());
      else location.assign(url.toString());
    });
    divide.addEventListener("click", async () => {
      if (teardown) { await teardown(); return; }
      await refresh(); if (!target) return;
      teardown = split(studio, withNoteId(new URL(target, location.origin)), "Anotações + Apostila", () => { teardown = null; divide.textContent = "Dividir tela"; });
      if (teardown) divide.textContent = "Fechar divisão";
    });
    window.LuriaStudySave = safeSave;
    getCatalog().then(refresh);
    const title = document.getElementById("notebook-document-title");
    if (title) new MutationObserver(() => { if (!teardown) refresh(); })
      .observe(title, {childList:true,subtree:true,characterData:true});
    // Quando veio de uma apostila, abra a anotação existente com mesmo título.
    // Nunca crie nem sobrescreva anotação automaticamente.
    if (params.get("apostila") && params.get("titulo") && !params.get("topic_id") && !params.get("note_id")) {
      let ticks = 0;
      const timer = setInterval(() => {
        if (++ticks > 120) { clearInterval(timer); return; }
        try {
          if (typeof notebookState === "undefined" || !notebookState.user) return;
          const key = norm(params.get("titulo"));
          const topic = notebookState.topics.find(x => norm(x.theme) === key);
          const note = [...notebookState.notesById.values()].find(x =>
            !x.topic_id && !x.is_shared && norm(x.topic_title) === key);
          if (topic || note) {
            clearInterval(timer);
            (topic ? openTopic(topic.id) : openFreeNote(note.id)).catch(console.warn);
          } else if (ticks >= 30) clearInterval(timer);
        } catch (err) { console.warn(err); clearInterval(timer); }
      }, 250);
    }
  }
})();