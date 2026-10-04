(() => {
  const originalOpenFreeNote = openFreeNote;
  const originalOpenNotionPage = openNotionPage;
  const originalSaveCurrentNotebookContent = saveCurrentNotebookContent;

  const notionEditorState = {
    page: null,
    originalBlocks: new Map()
  };

  async function invoke(body) {
    const { data, error } = await notebookSb.functions.invoke("notion-api", { body });
    if (error) throw error;
    if (data?.error) throw new Error(data.message || data.error);
    return data;
  }

  function normalizeBlockText(el, type) {
    let text = String(el?.innerText || "").trimEnd();
    if (type === "to_do") text = text.replace(/^\s*[☐☑]\s*/, "");
    return text;
  }

  function captureOriginalBlocks(editor) {
    notionEditorState.originalBlocks = new Map();
    editor.querySelectorAll("[data-notion-block-id]").forEach(el => {
      const id = el.dataset.notionBlockId;
      const type = el.dataset.notionBlockType || "paragraph";
      if (!id) return;
      notionEditorState.originalBlocks.set(id, {
        type,
        text: normalizeBlockText(el, type),
        checked: el.dataset.notionChecked === "1"
      });
    });
  }

  async function loadNotionIntoMainEditor(note) {
    const editor = document.getElementById("notebook-editor");
    if (!editor || !note?.notion_page_id) return;

    setSaveStatus("Carregando do Notion...", "saving");

    const result = await invoke({ action: "page", page_id: note.notion_page_id });
    const page = result?.page;
    if (!page) throw new Error("Página do Notion não encontrada.");

    notionEditorState.page = page;
    note.notion_url = page.url || note.notion_url;
    note.notion_last_edited_time = page.last_edited_time || note.notion_last_edited_time;
    note.content_html = page.html || "<p><br></p>";

    const title = document.getElementById("notebook-document-title");
    const area = document.getElementById("notebook-document-area");
    if (title) title.textContent = note.topic_title || page.title || "Página do Notion";
    if (area) area.textContent = note.area || "Notion";

    editor.innerHTML = page.html || "<p><br></p>";
    captureOriginalBlocks(editor);

    notebookState.editorDirty = false;
    setNotebookEditMode(true);
    renderTopicList();
    refreshNotebookInspector();
    setSaveStatus("Sincronizado com Notion", "saved");
  }

  async function openNotionNormalNote(noteId) {
    const note = noteById(noteId);
    if (!note) return;

    if (notebookState.editorDirty) {
      await saveCurrentNotebook(true);
    }

    notebookState.selectedType = "free";
    notebookState.selectedTopicId = null;
    notebookState.selectedNoteId = noteId;

    await switchView("editor", true);
    renderDocument();

    await loadNotionIntoMainEditor(note);

    const url = new URL(window.location.href);
    url.searchParams.set("view", "editor");
    url.searchParams.set("note_id", noteId);
    url.searchParams.set("source", "notion");
    url.searchParams.delete("topic_id");
    window.history.replaceState({}, "", url);
  }

  openFreeNote = async function(noteId) {
    const note = noteById(noteId);
    if (note?.storage_source === "notion" && note?.notion_page_id) {
      return openNotionNormalNote(noteId);
    }
    return originalOpenFreeNote(noteId);
  };

  openNotionPage = async function(page) {
    if (!page?.id) return originalOpenNotionPage(page);

    try {
      let { data: note, error } = await notebookSb
        .from("study_notes")
        .select("id,user_id,topic_id,topic_title,area,materia,content_html,created_at,updated_at,storage_source,notion_page_id,notion_url,notion_last_edited_time")
        .eq("user_id", notebookState.user.id)
        .eq("notion_page_id", page.id)
        .maybeSingle();

      if (error) throw error;

      if (!note) {
        const inserted = await notebookSb
          .from("study_notes")
          .insert({
            user_id: notebookState.user.id,
            topic_id: null,
            topic_title: page.title || "Página do Notion",
            area: "Notion",
            materia: null,
            content_html: "",
            storage_source: "notion",
            notion_page_id: page.id,
            notion_url: page.url || null
          })
          .select("id,user_id,topic_id,topic_title,area,materia,content_html,created_at,updated_at,storage_source,notion_page_id,notion_url,notion_last_edited_time")
          .single();

        if (inserted.error) throw inserted.error;
        note = inserted.data;
      }

      notebookState.notesById.set(note.id, note);
      closeNotionReader?.();
      return openNotionNormalNote(note.id);
    } catch (error) {
      console.error("Notion normal editor:", error);
      return originalOpenNotionPage(page);
    }
  };

  function notionBlockFromElement(el) {
    const tag = el.tagName?.toLowerCase();

    if (el.classList?.contains("notebook-study-block")) {
      const variant =
        el.classList.contains("warning") ? "warning" :
        el.classList.contains("memory") ? "memory" :
        "important";

      const title = String(el.querySelector(":scope > strong")?.innerText || "").trim();
      const body = String(el.querySelector(":scope > div")?.innerText || "").trim();
      const text = [title, body].filter(Boolean).join("\n");

      return {
        type: "callout",
        text,
        variant
      };
    }

    if (tag === "hr") return { type:"divider", text:"" };
    if (tag === "h1") return { type:"heading_1", text:String(el.innerText||"").trim() };
    if (tag === "h2") return { type:"heading_2", text:String(el.innerText||"").trim() };
    if (tag === "h3") return { type:"heading_3", text:String(el.innerText||"").trim() };
    if (tag === "blockquote") return { type:"quote", text:String(el.innerText||"").trim() };
    if (tag === "pre" || tag === "code") return { type:"code", text:String(el.innerText||"").trim() };

    if (tag === "li") {
      return {
        type: el.parentElement?.tagName?.toLowerCase() === "ol"
          ? "numbered_list_item"
          : "bulleted_list_item",
        text: String(el.innerText||"").trim()
      };
    }

    if (tag === "p" || tag === "div") {
      const text = String(el.innerText||"").trim();
      return text ? { type:"paragraph", text } : null;
    }

    return null;
  }

  function collectNewBlocks(editor) {
    const selector = [
      ".notebook-study-block",
      "hr",
      "h1","h2","h3",
      "blockquote",
      "pre",
      "ul > li",
      "ol > li",
      "p"
    ].join(",");

    const out = [];

    for (const el of editor.querySelectorAll(selector)) {
      if (el.closest("[data-notion-block-id]")) continue;

      // Se estiver dentro de um callout novo, só o callout pai vira bloco Notion.
      if (!el.classList?.contains("notebook-study-block") && el.closest(".notebook-study-block")) {
        continue;
      }

      const block = notionBlockFromElement(el);
      if (!block) continue;

      // Parágrafos vazios são apenas espaçamento visual do editor.
      if (block.type !== "divider" && !String(block.text || "").trim()) continue;

      out.push(block);
    }

    return out;
  }

  saveCurrentNotebookContent = async function(silent = false) {
    const current = getCurrentDocument();

    if (current?.note?.storage_source !== "notion" || !current.note.notion_page_id) {
      return originalSaveCurrentNotebookContent(silent);
    }

    const editor = document.getElementById("notebook-editor");
    if (!editor) return;

    if (!silent) setSaveStatus("Salvando no Notion...", "saving");

    try {
      const liveIds = new Set();

      for (const el of editor.querySelectorAll("[data-notion-block-id]")) {
        const id = el.dataset.notionBlockId;
        const type = el.dataset.notionBlockType || "paragraph";
        if (!id) continue;

        liveIds.add(id);
        const original = notionEditorState.originalBlocks.get(id);
        const text = normalizeBlockText(el, type);
        const checked = type === "to_do"
          ? (el.dataset.notionChecked === "1" || /^\s*☑/.test(el.innerText || ""))
          : undefined;

        if (!original || original.text !== text || (type === "to_do" && original.checked !== checked)) {
          await invoke({ action: "update_block", block_id: id, type, text, checked });
        }
      }

      // Não arquivamos blocos ausentes automaticamente. Durante a edição,
      // o DOM do editor pode reorganizar/remover temporariamente nós que ainda
      // pertencem à página do Notion. Arquivar aqui fazia o salvamento seguinte
      // tentar editar um bloco já arquivado.
      // Exclusão sincronizada será tratada por ação explícita, não por diff de DOM.

      for (const block of collectNewBlocks(editor)) {
        await invoke({
          action: "append_block",
          page_id: current.note.notion_page_id,
          type: block.type,
          text: block.text,
          variant: block.variant || null
        });
      }

      await loadNotionIntoMainEditor(current.note);
      notebookState.editorDirty = false;
      renderLibrary();
      setSaveStatus("Salvo no Notion", "saved");
    } catch (error) {
      console.error("Save Notion main editor:", error);
      setSaveStatus("Erro ao salvar no Notion", "error");
      window.LuriaDialog?.alert?.(error?.message || "Não foi possível salvar no Notion.");
    }
  };
})();