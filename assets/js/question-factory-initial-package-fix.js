(() => {
  "use strict";

  const STAGE_LABEL = "2 · ChatGPT";
  const MAX_ITEMS = 200;

  function isInitialStageButton(button) {
    const action = button?.closest(".admin-qf-block-ai-action");
    const label = action?.querySelector(":scope > small")?.textContent || "";
    return label.includes(STAGE_LABEL);
  }

  function parseScope(button) {
    const raw = button?.dataset?.qfCopyBlockStage || button?.dataset?.qfBlockAi || "";
    const [batch, block] = String(raw).split(":").map(Number);
    if (!Number.isFinite(batch) || !Number.isFinite(block)) return null;
    return { batch, block };
  }

  function currentVersion(question) {
    return Number(question?.version ?? question?.item_version ?? 1);
  }

  function initialReviewIsCurrent(question) {
    const review = question?.latest_review && typeof question.latest_review === "object"
      ? question.latest_review
      : {};
    const stage = String(review.review_stage || "");
    const reviewer = String(review.reviewer || "");
    const reviewedVersion = Number(review.item_version ?? review.version ?? 0);
    return stage === "chatgpt_initial"
      && reviewer === "ChatGPT"
      && reviewedVersion === currentVersion(question);
  }

  async function prepareInitialPackage(button, openChat) {
    const scope = parseScope(button);
    if (!scope) return;

    const sb = window.supabaseClient;
    const prompts = window.LuriaQuestionPrompts;
    if (!sb || !prompts?.segment) {
      window.alert("A fábrica ainda não terminou de carregar. Atualize a página e tente novamente.");
      return;
    }

    const original = button.textContent || "Prompt";
    button.disabled = true;
    button.textContent = "Lendo versões atuais...";

    let popup = null;
    if (openChat) {
      try { popup = window.open("about:blank", "_blank"); } catch (_) {}
    }

    try {
      const { data, error } = await sb.rpc("admin_export_question_factory", {
        p_batch_number: scope.batch,
        p_block_number: scope.block,
        p_blind: false
      });
      if (error) throw error;
      if (!data || typeof data !== "object") {
        throw new Error("O exportador não retornou um JSON válido.");
      }

      const questionKey = ["questions", "items", "questoes"].find(key => Array.isArray(data[key]));
      if (!questionKey) throw new Error("Não encontrei as questões do bloco no exportador.");

      const ordered = [...data[questionKey]].sort((a, b) =>
        Number(a.block_sequence_no ?? a.sequence_no ?? 0)
        - Number(b.block_sequence_no ?? b.sequence_no ?? 0)
      );

      const pending = ordered.filter(question => !initialReviewIsCurrent(question));
      const selected = pending.slice(0, MAX_ITEMS);

      if (!selected.length) {
        if (popup && !popup.closed) popup.close();
        button.textContent = "Sem pendências";
        window.alert("A Etapa 2 não possui questões pendentes na versão atual deste bloco.");
        return;
      }

      const batchCode = data.batch_code || ("L" + String(scope.batch).padStart(3, "0"));
      const blockCode = data.block_code || (batchCode + "-B" + String(scope.block).padStart(2, "0"));
      const selectedIds = new Set(selected.map(q => String(q.question_id || "")));

      const versionManifest = Array.isArray(data.version_manifest)
        ? data.version_manifest.filter(item => selectedIds.has(String(item?.question_id || "")))
        : selected.map(question => ({
            question_id: question.question_id,
            item_version: currentVersion(question)
          }));

      const ctx = {
        batch_number: scope.batch,
        batch_code: batchCode,
        block_number: scope.block,
        block_code: blockCode,
        operational_address: blockCode
      };

      const itemForPrompt = {
        exam_style: data.exam_style || selected[0]?.exam_style || null
      };

      const prompt = prompts.segment(itemForPrompt, "chatgpt_initial", ctx);

      const payload = {
        schema_version: data.schema_version || "2.0",
        batch_number: scope.batch,
        batch_code: batchCode,
        block_number: scope.block,
        block_code: blockCode,
        operational_address: blockCode,
        exam_style: itemForPrompt.exam_style,
        input_stage: "chatgpt_initial",
        version_manifest: versionManifest,
        questions: selected,
        question_count: selected.length,
        input_package: {
          mode: "manual_current_snapshot",
          source: "admin_export_question_factory",
          delivered_count: selected.length,
          pending_before_copy: pending.length,
          pending_after_this_package_if_imported: Math.max(0, pending.length - selected.length),
          expected_review_count: selected.length
        }
      };

      const combined = [
        prompt,
        "",
        "============================================================",
        "INPUT_JSON_ATUAL — FONTE DE VERDADE DESTA EXECUÇÃO",
        "============================================================",
        "MODO MANUAL POR JSON: use exclusivamente o JSON abaixo como fonte de verdade.",
        "Não tente reler o Supabase nesta execução.",
        "Processe TODOS e SOMENTE os itens de questions[].",
        "Preserve exatamente question_id + item_version/version.",
        "Devolva um único JSON completo, pronto para Colar JSON de resposta no Admin.",
        "Inclua initial_reviews, autocorrections, final_reviews, coverage, stage_metrics e RELATÓRIO QUESTÃO POR QUESTÃO.",
        JSON.stringify(payload, null, 2)
      ].join("\n");

      await navigator.clipboard.writeText(combined);

      button.textContent = selected.length + " questões atuais + prompt copiados";
      button.classList.add("success");

      if (popup && !popup.closed) {
        popup.location.href = "https://chatgpt.com/";
      }

      setTimeout(() => {
        button.textContent = original;
        button.classList.remove("success");
      }, 2400);
    } catch (error) {
      if (popup && !popup.closed) popup.close();
      console.error("Falha ao preparar pacote da Etapa 2:", error);
      button.textContent = "Falha ao copiar";
      window.alert(error?.message || "Não foi possível preparar o pacote atual da Etapa 2.");
      setTimeout(() => { button.textContent = original; }, 2200);
    } finally {
      button.disabled = false;
    }
  }

  document.addEventListener("click", event => {
    const button = event.target.closest("[data-qf-copy-block-stage],[data-qf-block-ai]");
    if (!button || !isInitialStageButton(button)) return;

    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();

    prepareInitialPackage(button, Boolean(button.dataset.qfBlockAi));
  }, true);
})();