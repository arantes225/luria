(() => {
  "use strict";
  const client = window.supabaseClient;
  const $ = (id) => document.getElementById(id);
  const els = {
    status: $("my-recipes-status"), workspace: $("my-recipes-workspace"),
    list: $("my-recipes-list"), more: $("my-recipes-more"), preview: $("my-recipes-preview"),
    form: $("my-recipes-form"), formTitle: $("my-recipes-form-title"), title: $("my-recipe-title"),
    meds: $("my-recipes-meds"), exams: $("my-recipe-exams"), treatment: $("my-recipe-treatment"),
    orientations: $("my-recipe-orientations"), save: $("my-recipes-save"), remove: $("my-recipes-delete")
  };
  const PAGE_SIZE = 40;
  let user = null, rows = [], offset = 0, hasMore = false, editingId = null, selectedId = null;
  let selectedMeds = new Set(), busy = false;
  const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (ch) =>
    ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
  const lines = (value) => String(value || "").split(/\r?\n/).map((s) => s.trim()).filter(Boolean);

  function notice(message, error = false) {
    els.status.textContent = message;
    els.status.classList.toggle("error", error);
  }

  function medicationRow(med = {}) {
    const row = document.createElement("div");
    row.className = "my-recipes-med";
    row.innerHTML = `
      <label>Medicamento <input data-med="name" maxlength="180" value="${esc(med.name)}" placeholder="Ex.: paracetamol"></label>
      <label>Dose <input data-med="dose" maxlength="180" value="${esc(med.dose)}" placeholder="Ex.: 500 mg"></label>
      <label>Via <input data-med="route" maxlength="100" value="${esc(med.route)}" placeholder="Ex.: oral"></label>
      <label>Posologia / instruções <input data-med="instructions" maxlength="1000" value="${esc(med.instructions)}" placeholder="Ex.: a cada 8 horas, se necessário"></label>
      <button type="button" data-remove-med aria-label="Remover medicamento">Remover</button>`;
    row.querySelector("[data-remove-med]").addEventListener("click", () => row.remove());
    els.meds.appendChild(row);
  }

  function renderList() {
    els.list.innerHTML = rows.length ? rows.map((row) =>
      `<button type="button" class="my-recipes-card${row.id === selectedId ? " active" : ""}" data-template-id="${esc(row.id)}"><strong>${esc(row.title)}</strong><small>${(row.medications || []).length} medicamento(s) · ${(row.exams || []).length} exame(s)</small></button>`
    ).join("") : '<div class="my-recipes-empty">Nenhum modelo salvo ainda. Crie o primeiro ao lado.</div>';
    els.list.querySelectorAll("[data-template-id]").forEach((button) =>
      button.addEventListener("click", () => openTemplate(button.dataset.templateId)));
    els.more.hidden = !hasMore;
  }

  function treatmentText(row) {
    const meds = Array.isArray(row.medications) ? row.medications : [];
    const chosen = meds.filter((_, index) => selectedMeds.has(index));
    if (!chosen.length && !String(row.treatment || "").trim()) return "";
    const out = [row.title.toUpperCase(), ""];
    if (chosen.length) {
      out.push("MEDICAMENTOS:");
      chosen.forEach((med, index) => {
        out.push((index + 1) + ") " + med.name + (med.dose ? " — " + med.dose : "") + (med.route ? " · " + med.route : ""));
        if (med.instructions) out.push("   " + med.instructions);
      });
      out.push("");
    }
    if (row.treatment) out.push("TRATAMENTO:", row.treatment.trim(), "");
    out.push("ORIENTAÇÕES:", String(row.orientations || "").trim());
    return out.join("\n").trim();
  }

  function examsText(row) {
    const exams = Array.isArray(row.exams) ? row.exams : [];
    return exams.length ? "EXAMES — " + row.title + "\n\n" + exams.map((exam) => "- " + exam).join("\n") : "";
  }

  async function copy(text, button, success) {
    if (!text || !navigator.clipboard?.writeText) {
      notice("A cópia não está disponível neste navegador.", true);
      return;
    }
    try {
      await navigator.clipboard.writeText(text);
      notice(success);
      const before = button.textContent;
      button.textContent = "Copiado ✓";
      setTimeout(() => { button.textContent = before; }, 1600);
    } catch {
      notice("Não foi possível copiar. Verifique a permissão da área de transferência.", true);
    }
  }

  function renderPreview() {
    const row = rows.find((item) => item.id === selectedId);
    if (!row) {
      els.preview.innerHTML = '<div class="my-recipes-empty">Selecione um modelo salvo para escolher medicamentos e copiar.</div>';
      return;
    }
    const meds = Array.isArray(row.medications) ? row.medications : [];
    const exams = Array.isArray(row.exams) ? row.exams : [];
    els.preview.innerHTML = `
      <h3>${esc(row.title)}</h3><small>Modelo pessoal. Confirme dados, indicação e doses antes do uso.</small>
      ${meds.length ? '<h4>Medicamentos</h4>' + meds.map((med, index) =>
        `<label class="my-recipes-choice"><input type="checkbox" data-select-med="${index}" ${selectedMeds.has(index) ? "checked" : ""}><span><strong>${esc(med.name)}</strong>${med.dose ? " · " + esc(med.dose) : ""}${med.route ? " · " + esc(med.route) : ""}<small>${esc(med.instructions)}</small></span></label>`).join("") : ""}
      ${exams.length ? '<h4>Exames</h4><p>' + exams.map(esc).join("<br>") + "</p>" : ""}
      ${row.treatment ? '<h4>Tratamento</h4><p>' + esc(row.treatment) + "</p>" : ""}
      <h4>Orientações</h4><p>${esc(row.orientations)}</p>
      <div class="my-recipes-copy-actions">
        <button type="button" data-copy-treatment ${!selectedMeds.size && !row.treatment ? "disabled" : ""}>Copiar tratamento + orientações</button>
        <button type="button" data-copy-exams ${exams.length ? "" : "disabled"}>Copiar exames</button>
      </div>`;
    els.preview.querySelectorAll("[data-select-med]").forEach((box) => box.addEventListener("change", () => {
      const index = Number(box.dataset.selectMed);
      if (box.checked) selectedMeds.add(index); else selectedMeds.delete(index);
      els.preview.querySelector("[data-copy-treatment]").disabled = !selectedMeds.size && !row.treatment;
    }));
    els.preview.querySelector("[data-copy-treatment]").addEventListener("click", (event) =>
      copy(treatmentText(row), event.currentTarget, "Tratamento e orientações copiados."));
    els.preview.querySelector("[data-copy-exams]").addEventListener("click", (event) =>
      copy(examsText(row), event.currentTarget, "Exames copiados."));
  }

  function openTemplate(id) {
    const row = rows.find((item) => item.id === id);
    if (!row) return;
    selectedId = editingId = id;
    selectedMeds = new Set();
    els.formTitle.textContent = "Editar modelo";
    els.title.value = row.title || "";
    els.meds.replaceChildren();
    (Array.isArray(row.medications) ? row.medications : []).forEach(medicationRow);
    els.exams.value = (row.exams || []).join("\n");
    els.treatment.value = row.treatment || "";
    els.orientations.value = row.orientations || "";
    els.remove.hidden = false;
    renderList();
    renderPreview();
  }

  function newTemplate() {
    editingId = selectedId = null;
    selectedMeds = new Set();
    els.formTitle.textContent = "Criar modelo";
    els.form.reset();
    els.meds.replaceChildren();
    medicationRow();
    els.remove.hidden = true;
    renderList();
    renderPreview();
    els.title.focus();
  }

  async function loadMore(reset = false) {
    if (!user || busy) return;
    busy = true;
    if (reset) { rows = []; offset = 0; }
    notice("Carregando seus modelos…");
    const {data, error} = await client.from("user_recipe_templates")
      .select("id,title,medications,exams,treatment,orientations,updated_at")
      .eq("user_id", user.id).order("updated_at", {ascending:false})
      .range(offset, offset + PAGE_SIZE - 1);
    busy = false;
    if (error) { notice("Não foi possível carregar seus modelos.", true); return; }
    rows.push(...(data || []));
    offset += (data || []).length;
    hasMore = (data || []).length === PAGE_SIZE;
    renderList();
    renderPreview();
    notice(rows.length ? rows.length + " modelo(s) carregado(s)." : "Você ainda não tem modelos salvos.");
  }

  function formData() {
    const medications = [...els.meds.querySelectorAll(".my-recipes-med")].map((row) => {
      const field = (key) => row.querySelector('[data-med="' + key + '"]').value.trim();
      return {name:field("name"), dose:field("dose"), route:field("route"), instructions:field("instructions")};
    }).filter((med) => Object.values(med).some(Boolean));
    if (medications.some((med) => !med.name)) throw Error("Preencha o nome de cada medicamento ou remova a linha vazia.");
    if (medications.length > 50) throw Error("Use no máximo 50 medicamentos por modelo.");
    const exams = lines(els.exams.value);
    if (exams.length > 50) throw Error("Use no máximo 50 exames por modelo.");
    const title = els.title.value.trim(), treatment = els.treatment.value.trim(), orientations = els.orientations.value.trim();
    if (!title) throw Error("Informe um título.");
    if (!medications.length && !exams.length && !treatment) throw Error("Adicione medicamento, exame ou tratamento.");
    if (!orientations) throw Error("Inclua as orientações que acompanharão a cópia.");
    return {title, medications, exams, treatment, orientations, updated_at:new Date().toISOString()};
  }

  els.form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!user || busy) return;
    let payload;
    try { payload = formData(); } catch (error) { notice(error.message, true); return; }
    busy = true;
    els.save.disabled = true;
    const query = editingId
      ? client.from("user_recipe_templates").update(payload).eq("id", editingId).eq("user_id", user.id)
      : client.from("user_recipe_templates").insert(payload);
    const {data, error} = await query.select("id,title,medications,exams,treatment,orientations,updated_at").single();
    busy = false;
    els.save.disabled = false;
    if (error || !data) { notice("Não foi possível salvar. Confira sua conexão e tente novamente.", true); return; }
    await loadMore(true);
    if (rows.some((row) => row.id === data.id)) openTemplate(data.id);
    else { rows.unshift(data); openTemplate(data.id); }
    notice("Modelo salvo na sua conta.");
  });

  els.remove.addEventListener("click", async () => {
    if (!user || !editingId || busy || !window.confirm("Excluir este modelo permanentemente?")) return;
    busy = true;
    const {error, count} = await client.from("user_recipe_templates")
      .delete({count:"exact"}).eq("id", editingId).eq("user_id", user.id);
    busy = false;
    if (error || count !== 1) { notice("Não foi possível excluir o modelo.", true); return; }
    newTemplate();
    await loadMore(true);
    notice("Modelo excluído.");
  });

  $("my-recipes-new").addEventListener("click", newTemplate);
  $("my-recipes-add-med").addEventListener("click", () => {
    if (els.meds.children.length >= 50) { notice("Limite de 50 medicamentos por modelo.", true); return; }
    medicationRow();
  });
  els.more.addEventListener("click", () => loadMore());

  async function start() {
    if (!client?.auth?.getUser) { notice("Conexão indisponível.", true); return; }
    const {data, error} = await client.auth.getUser();
    if (error || !data?.user) {
      els.workspace.hidden = true;
      els.status.innerHTML = 'Entre na sua conta para acessar seus receituários. <a href="/login/">Fazer login</a>';
      return;
    }
    user = data.user;
    els.workspace.hidden = false;
    newTemplate();
    await loadMore(true);
  }
  client?.auth?.onAuthStateChange?.((event) => {
    if (event === "SIGNED_OUT") {
      user = null; rows = []; selectedId = editingId = null;
      els.workspace.hidden = true;
      notice("Sessão encerrada. Entre novamente para acessar seus modelos.");
    }
  });
  start();
})();
