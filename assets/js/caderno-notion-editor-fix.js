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

  function inferType(el) {
    const tag = el.tagName?.toLowerCase();
    if (tag === "h1") return "heading_1";
    if (tag === "h2") return "heading_2";
    if (tag === "h3") return "heading_3";
    if (tag === "blockquote") return "quote";
    if (tag === "li") {
      return el.parentElement?.tagName?.toLowerCase() === "ol"
        ? "numbered_list_item"
        : "bulleted_list_item";
    }
    return "paragraph";
  }

  function collectNewBlocks(editor) {
    const candidates = [...editor.querySelectorAll("p,h1,h2,h3,li,blockquote,div")];
    const out = [];
    const seen = new Set();

    for (const el of candidates) {
      if (el.closest("[data-notion-block-id]")) continue;
      if (el.querySelector("[data-notion-block-id]")) continue;

      const text = String(el.innerText || "").trim();
      if (!text) continue;

      const key = text + "|" + inferType(el);
      if (seen.has(key)) continue;
      seen.add(key);

      out.push({ type: inferType(el), text });
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

      for (const [id] of notionEditorState.originalBlocks) {
        if (!liveIds.has(id)) {
          await invoke({ action: "delete_block", block_id: id });
        }
      }

      for (const block of collectNewBlocks(editor)) {
        await invoke({
          action: "append_block",
          page_id: current.note.notion_page_id,
          type: block.type,
          text: block.text
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