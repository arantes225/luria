(() => {
  const state = {
    originals: new Map()
  };

  const get = id => document.getElementById(id);

  function blocks() {
    return [...(get("notebook-notion-reader-content")?.querySelectorAll('[data-notion-editable="1"]') || [])];
  }

  function startEdit(event) {
    event?.preventDefault?.();
    event?.stopImmediatePropagation?.();

    const content = get("notebook-notion-reader-content");
    const reader = document.querySelector(".notebook-notion-reader");
    if (!content || !reader) return;

    state.originals.clear();

    for (const block of blocks()) {
      const id = block.dataset.notionBlockId;
      const type = block.dataset.notionBlockType;
      if (!id || !type) continue;

      state.originals.set(id, {
        html: block.innerHTML,
        text: block.innerText || "",
        checked: block.dataset.notionChecked || "0"
      });

      let value = block.innerText || "";
      if (type === "to_do") value = value.replace(/^\s*[☐☑]\s*/, "");

      const textarea = document.createElement("textarea");
      textarea.className = "notebook-notion-block-editor";
      textarea.value = value;
      textarea.rows = Math.max(2, Math.min(14, value.split("\n").length + 1));
      textarea.dataset.blockId = id;

      if (type === "to_do") {
        const row = document.createElement("div");
        row.className = "notebook-notion-todo-editor";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = block.dataset.notionChecked === "1";
        checkbox.dataset.todoBlockId = id;

        row.append(checkbox, textarea);
        block.replaceChildren(row);
      } else {
        block.replaceChildren(textarea);
      }

      block.classList.add("is-notion-editing-block");
    }

    reader.classList.add("is-editing");
    get("notebook-notion-edit")?.setAttribute("hidden", "");
    get("notebook-notion-save")?.removeAttribute("hidden");
    get("notebook-notion-cancel-edit")?.removeAttribute("hidden");
    get("notebook-notion-add-paragraph")?.removeAttribute("hidden");

    content.querySelector(".notebook-notion-block-editor")?.focus();
  }

  function cancelEdit(event) {
    event?.preventDefault?.();
    event?.stopImmediatePropagation?.();

    for (const block of blocks()) {
      const id = block.dataset.notionBlockId;
      const original = state.originals.get(id);
      if (!original) continue;
      block.innerHTML = original.html;
      block.dataset.notionChecked = original.checked;
      block.classList.remove("is-notion-editing-block");
    }

    document.querySelector(".notebook-notion-reader")?.classList.remove("is-editing");
    get("notebook-notion-edit")?.removeAttribute("hidden");
    get("notebook-notion-save")?.setAttribute("hidden", "");
    get("notebook-notion-cancel-edit")?.setAttribute("hidden", "");
    get("notebook-notion-add-paragraph")?.setAttribute("hidden", "");
  }

  async function saveEdit(event) {
    event?.preventDefault?.();
    event?.stopImmediatePropagation?.();

    const changed = [];

    for (const block of blocks()) {
      const id = block.dataset.notionBlockId;
      const type = block.dataset.notionBlockType;
      const textarea = block.querySelector(".notebook-notion-block-editor");
      if (!id || !type || !textarea) continue;

      const original = state.originals.get(id);
      const text = textarea.value;
      const oldText = String(original?.text || "").replace(/^\s*[☐☑]\s*/, "");
      const checkbox = block.querySelector('input[type="checkbox"]');
      const checked = type === "to_do" ? Boolean(checkbox?.checked) : undefined;
      const oldChecked = original?.checked === "1";

      if (oldText !== text || (type === "to_do" && oldChecked !== checked)) {
        changed.push({ block_id: id, type, text, checked });
      }
    }

    const save = get("notebook-notion-save");
    if (save) {
      save.disabled = true;
      save.textContent = changed.length ? "Salvando..." : "Nada para salvar";
    }

    try {
      for (const item of changed) {
        await window.supabaseClient.functions.invoke("notion-api", {
          body: { action: "update_block", ...item }
        }).then(({ data, error }) => {
          if (error) throw error;
          if (data?.error) throw new Error(data.message || data.error);
          return data;
        });
      }

      const current = window.notionSourceState?.currentPage;
      if (current && typeof window.openNotionPage === "function") {
        await window.openNotionPage(current);
      } else {
        cancelEdit();
      }

      const updated = get("notebook-notion-reader-updated");
      if (updated && changed.length) updated.textContent = "Alterações salvas no Notion";
    } catch (error) {
      console.error("Notion edit save:", error);
      window.LuriaDialog?.alert?.(
        String(error?.message || "").includes("permission")
          ? "A conexão do Notion está sem permissão para editar conteúdo. Ative a permissão de atualização e reconecte a conta."
          : (error?.message || "Não foi possível salvar no Notion.")
      );
    } finally {
      if (save) {
        save.disabled = false;
        save.textContent = "Salvar";
      }
    }
  }

  function attach() {
    get("notebook-notion-edit")?.addEventListener("click", startEdit, true);
    get("notebook-notion-save")?.addEventListener("click", saveEdit, true);
    get("notebook-notion-cancel-edit")?.addEventListener("click", cancelEdit, true);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", attach, { once: true });
  } else {
    attach();
  }
})();