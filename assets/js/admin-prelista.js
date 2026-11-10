/* Admin · Pré-lista da landing.
   Lê public.landing_prelista (RLS: só administradores). Nada de innerHTML com dado de usuário. */
(() => {
  "use strict";

  const $ = (id) => document.getElementById(id);
  const FASES = {
    ciclo_basico: "Ciclo básico",
    ciclo_clinico: "Ciclo clínico",
    internato: "Internato",
    formado: "Formado(a) / R1"
  };
  const state = { loading: false, items: [] };

  function setStatus(text, type = "") {
    const el = $("admin-prelista-status");
    if (!el) return;
    el.textContent = text;
    el.className = `admin-status ${type}`.trim();
  }

  function fmtDate(value) {
    if (!value) return "";
    const d = new Date(value);
    return Number.isNaN(d.getTime())
      ? ""
      : d.toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
  }

  function filtered() {
    const q = ($("admin-prelista-search")?.value || "").trim().toLowerCase();
    if (!q) return state.items;
    return state.items.filter((item) =>
      String(item.nome || "").toLowerCase().includes(q) || String(item.email || "").toLowerCase().includes(q)
    );
  }

  function cell(text) {
    const td = document.createElement("td");
    td.textContent = text;
    return td;
  }

  function renderSummary() {
    const box = $("admin-prelista-summary");
    const badge = $("admin-prelista-badge");
    const total = state.items.length;
    const weekAgo = Date.now() - 7 * 864e5;
    const week = state.items.filter((i) => new Date(i.created_at).getTime() >= weekAgo).length;
    const byFase = {};
    state.items.forEach((i) => { const k = FASES[i.fase] || "Não informado"; byFase[k] = (byFase[k] || 0) + 1; });

    if (badge) {
      badge.hidden = total <= 0;
      badge.textContent = total > 999 ? "999+" : String(total);
    }
    if (!box) return;
    box.replaceChildren();
    const cards = [["Inscritos", total], ["Últimos 7 dias", week]].concat(Object.entries(byFase).sort((a, b) => b[1] - a[1]));
    cards.forEach(([label, value]) => {
      const card = document.createElement("div");
      card.className = "admin-prelista-card";
      const strong = document.createElement("strong");
      strong.textContent = String(value);
      const span = document.createElement("span");
      span.textContent = label;
      card.append(strong, span);
      box.append(card);
    });
  }

  function render() {
    const body = $("admin-prelista-rows");
    if (!body) return;
    const rows = filtered();
    body.replaceChildren();
    rows.forEach((item) => {
      const tr = document.createElement("tr");
      tr.append(
        cell(item.nome || ""),
        cell(item.email || ""),
        cell(FASES[item.fase] || "—"),
        cell(item.origem || ""),
        cell(fmtDate(item.created_at))
      );
      const actions = document.createElement("td");
      const del = document.createElement("button");
      del.type = "button";
      del.className = "button secondary admin-prelista-remove";
      del.dataset.prelistaRemove = String(item.id);
      del.textContent = "Remover";
      del.setAttribute("aria-label", `Remover ${item.nome || "inscrição"} da pré-lista`);
      actions.append(del);
      tr.append(actions);
      body.append(tr);
    });
    const exportBtn = $("admin-prelista-export");
    if (exportBtn) exportBtn.disabled = rows.length === 0;
    if (!state.loading) {
      setStatus(state.items.length
        ? `${rows.length} de ${state.items.length} inscrição(ões) exibida(s).`
        : "Ninguém entrou na pré-lista ainda.");
    }
  }

  async function load() {
    const sb = window.supabaseClient;
    if (!sb) { setStatus("Conexão com o banco indisponível.", "error"); return; }
    if (state.loading) return;
    state.loading = true;
    setStatus("Carregando pré-lista...");
    try {
      const { data, error } = await sb
        .from("landing_prelista")
        .select("id, nome, email, fase, origem, created_at")
        .order("created_at", { ascending: false })
        .limit(5000);
      if (error) throw error;
      state.items = Array.isArray(data) ? data : [];
      state.loading = false;
      renderSummary();
      render();
    } catch (error) {
      state.loading = false;
      console.warn("Pré-lista indisponível:", error && error.code);
      setStatus("Não foi possível carregar a pré-lista. Confira se a migração foi aplicada e se você entrou como administrador.", "error");
    }
  }

  async function remove(id, button) {
    const item = state.items.find((i) => String(i.id) === String(id));
    if (!item) return;
    if (!window.confirm(`Remover ${item.nome} (${item.email}) da pré-lista? Isso não pode ser desfeito.`)) return;
    button.disabled = true;
    try {
      const { error } = await window.supabaseClient.from("landing_prelista").delete().eq("id", item.id);
      if (error) throw error;
      state.items = state.items.filter((i) => i !== item);
      renderSummary();
      render();
    } catch (error) {
      button.disabled = false;
      setStatus("Não foi possível remover a inscrição.", "error");
    }
  }

  // CSV com proteção contra injeção de fórmula ao abrir em planilha.
  function csvValue(value) {
    let s = String(value ?? "");
    if (/^[=+\-@\t\r]/.test(s)) s = "'" + s;
    return `"${s.replace(/"/g, '""')}"`;
  }

  function exportCsv() {
    const rows = filtered();
    if (!rows.length) return;
    const header = ["nome", "email", "momento", "origem", "entrou_em"];
    const lines = [header.join(";")].concat(rows.map((i) =>
      [i.nome, i.email, FASES[i.fase] || "", i.origem, i.created_at].map(csvValue).join(";")
    ));
    const blob = new Blob(["﻿" + lines.join("\r\n")], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `pre-lista-traube-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.append(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  $("admin-prelista-refresh")?.addEventListener("click", () => load());
  $("admin-prelista-export")?.addEventListener("click", exportCsv);
  $("admin-prelista-search")?.addEventListener("input", render);
  $("admin-prelista-rows")?.addEventListener("click", (event) => {
    const btn = event.target.closest?.("[data-prelista-remove]");
    if (btn) remove(btn.dataset.prelistaRemove, btn);
  });

  window.TraubeAdminPrelista = { load };
})();
