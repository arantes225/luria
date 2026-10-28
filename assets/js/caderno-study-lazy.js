/* LURIA: a biblioteca de anotações deve abrir mesmo se o leitor lado a lado falhar. */
(() => {
  "use strict";
  const editorView = document.getElementById("notebook-view-editor");
  if (!editorView) return;
  let requested = false;
  function mountSplitOnlyInsideEditor() {
    if (editorView.hidden || requested) return;
    requested = true;
    const script = document.createElement("script");
    script.src = "/assets/js/study-side-by-side.js?v=20261028-notes-recovery1";
    script.async = true;
    script.addEventListener("error", () => {
      console.warn("LURIA: modo dividido indisponível, editor de anotações preservado.");
    }, { once: true });
    document.body.appendChild(script);
  }
  // Não iniciar o leitor opcional na biblioteca. Seu carregamento ou falha
  // não pode impedir a navegação, o login e a lista de cadernos.
  new MutationObserver(mountSplitOnlyInsideEditor)
    .observe(editorView, { attributes: true, attributeFilter: ["hidden"] });
  mountSplitOnlyInsideEditor();

  // Mantém o vínculo ao retornar de uma apostila: abrir nota existente
  // de título igual, sem criar nem sobrescrever conteúdo.
  const query = new URLSearchParams(location.search);
  if (!query.has("apostila") || !query.has("titulo") ||
      query.has("note_id") || query.has("topic_id")) return;
  const normalize = value => String(value || "").normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  let tries = 0;
  const interval = setInterval(() => {
    if (++tries > 60) { clearInterval(interval); return; }
    try {
      if (typeof notebookState === "undefined" || !notebookState.user ||
          notebookState.activeView === "editor") return;
      const title = normalize(query.get("titulo"));
      const topic = notebookState.topics?.find(item => normalize(item.theme) === title);
      const note = [...notebookState.notesById.values()].find(item =>
        !item.topic_id && !item.is_shared && normalize(item.topic_title) === title);
      if (topic || note) {
        clearInterval(interval);
        Promise.resolve(topic ? openTopic(topic.id) : openFreeNote(note.id))
          .catch(error => console.warn("LURIA: anotação existente não pôde ser aberta.", error));
      } else if (tries >= 20) clearInterval(interval);
    } catch (error) {
      clearInterval(interval);
      console.warn("LURIA: vínculo de apostila indisponível.", error);
    }
  }, 200);
})();
