/* ecg-vision-review.js
   TRAUBE ECG — Tela de revisão de layout via Vision AI.

   Fluxo:
   1. Recebe canvas da foto + token de autenticação Supabase
   2. Envia imagem (base64, max 1.1 MB) ao worker ecg-vision
   3. Exibe tela modal com overlay (retângulos coloridos sobre a imagem)
   4. Usuário confirma → resolve({ confirmed: true, visionLayout, cleanCanvas })
      Usuário cancela → resolve({ confirmed: false })
   5. cleanCanvas: canvas padronizado PhysioNet (fundo branco, grade rosa, traçado preto)
      pronto para entrada no motor CV — zero custo de API adicional.

   Uso:
     const result = await TraubeEcgVisionReview.review(canvas, { authToken, workerUrl });
     if (result.confirmed) {
       const canvasParaMotor = result.cleanCanvas || canvas;
       // usar result.visionLayout e canvasParaMotor
     }
*/
(function (global) {
  "use strict";
  const doc = global.document;
  if (!doc) return;

  // Cores por linha (até 4 linhas: derivações + tira de ritmo)
  const ROW_COLORS = ["#2196F3", "#4CAF50", "#FF9800", "#9C27B0"];
  const TIRA_COLOR = "#E91E63";

  /* ── Helpers ─────────────────────────────────────────────── */

  function resizeCanvasForUpload(sourceCanvas, maxBytes = 1_100_000) {
    // Tenta JPEG 0.82 primeiro; se ainda grande, reduz dimensões progressivamente
    let quality = 0.82;
    let scale = 1.0;
    let b64 = "";
    for (let attempt = 0; attempt < 6; attempt++) {
      const w = Math.round(sourceCanvas.width * scale);
      const h = Math.round(sourceCanvas.height * scale);
      const tmp = doc.createElement("canvas");
      tmp.width = w; tmp.height = h;
      tmp.getContext("2d").drawImage(sourceCanvas, 0, 0, w, h);
      b64 = tmp.toDataURL("image/jpeg", quality).replace(/^data:image\/jpeg;base64,/, "");
      if (b64.length <= maxBytes) break;
      if (quality > 0.55) quality -= 0.1;
      else scale *= 0.75;
    }
    return b64; // string base64 pura
  }

  function drawOverlay(canvas, derivacoes, imgW, imgH) {
    const ctx = canvas.getContext("2d");
    const cw = canvas.width, ch = canvas.height;
    const scaleX = cw / imgW, scaleY = ch / imgH;

    derivacoes.forEach(d => {
      const pos = d.posicao;
      if (!pos) return;
      const x = pos.xMin * imgW * scaleX;
      const y = pos.yMin * imgH * scaleY;
      const w = (pos.xMax - pos.xMin) * imgW * scaleX;
      const h = (pos.yMax - pos.yMin) * imgH * scaleY;

      const color = d.tipo === "tira_ritmo"
        ? TIRA_COLOR
        : ROW_COLORS[(d.linha - 1) % ROW_COLORS.length];

      // Fundo semitransparente
      ctx.fillStyle = color + "22";
      ctx.fillRect(x, y, w, h);

      // Borda
      ctx.strokeStyle = color;
      ctx.lineWidth = Math.max(2, Math.round(cw / 400));
      ctx.strokeRect(x, y, w, h);

      // Rótulo
      const fontSize = Math.max(11, Math.round(h * 0.28));
      ctx.font = `bold ${fontSize}px system-ui, sans-serif`;
      ctx.fillStyle = "#fff";
      const pad = 3;
      const label = d.nome || "?";
      const metrics = ctx.measureText(label);
      ctx.fillStyle = color + "dd";
      ctx.fillRect(x + pad, y + pad, metrics.width + pad * 2, fontSize + pad * 2);
      ctx.fillStyle = "#fff";
      ctx.fillText(label, x + pad * 2, y + pad + fontSize);
    });
  }

  /* ── Modal de revisão ────────────────────────────────────── */

  function buildModal(sourceCanvas, visionData) {
    const overlay = doc.createElement("div");
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-label", "Confirmar layout do ECG");
    overlay.style.cssText = [
      "position:fixed;inset:0;z-index:9999",
      "background:rgba(0,0,0,0.85)",
      "display:flex;flex-direction:column;align-items:center;justify-content:center",
      "padding:16px;box-sizing:border-box;overflow-y:auto"
    ].join(";");

    // Título
    const title = doc.createElement("h2");
    title.textContent = "Confirmar layout do ECG";
    title.style.cssText = "color:#fff;margin:0 0 8px;font-size:1.1rem;text-align:center";
    overlay.appendChild(title);

    // Descrição do layout detectado
    const desc = doc.createElement("p");
    const layout = visionData.layout || {};
    const tira = visionData.tira_ritmo;
    const nDerivacoes = Array.isArray(visionData.derivacoes)
      ? visionData.derivacoes.filter(d => d.tipo !== "tira_ritmo").length
      : 0;
    desc.textContent = `${layout.formato || `${layout.linhas || "?"} × ${layout.colunas || "?"}`}` +
      ` — ${nDerivacoes} derivações` +
      (tira?.presente ? ` + tira de ritmo (${tira.derivacao || "?"})` : "") + ".";
    desc.style.cssText = "color:#ccc;margin:0 0 12px;font-size:0.9rem;text-align:center";
    overlay.appendChild(desc);

    // Canvas com overlay
    const displayCanvas = doc.createElement("canvas");
    const maxW = Math.min(global.innerWidth - 32, 800);
    const scale = Math.min(1, maxW / sourceCanvas.width);
    displayCanvas.width = Math.round(sourceCanvas.width * scale);
    displayCanvas.height = Math.round(sourceCanvas.height * scale);
    displayCanvas.style.cssText = "max-width:100%;border-radius:8px;display:block";

    // Copia imagem original no canvas de exibição
    const dCtx = displayCanvas.getContext("2d");
    dCtx.drawImage(sourceCanvas, 0, 0, displayCanvas.width, displayCanvas.height);

    // Desenha overlay se tiver posições
    if (Array.isArray(visionData.derivacoes) && visionData.derivacoes.length > 0) {
      drawOverlay(displayCanvas, visionData.derivacoes, sourceCanvas.width, sourceCanvas.height);
    }
    overlay.appendChild(displayCanvas);

    // Issues (se houver)
    if (Array.isArray(visionData.issues) && visionData.issues.length > 0) {
      const issueBox = doc.createElement("p");
      issueBox.textContent = "⚠ " + visionData.issues.join(" · ");
      issueBox.style.cssText = "color:#FFB74D;margin:8px 0 0;font-size:0.82rem;text-align:center;max-width:600px";
      overlay.appendChild(issueBox);
    }

    // Botões
    const btnRow = doc.createElement("div");
    btnRow.style.cssText = "display:flex;gap:12px;margin-top:16px;flex-wrap:wrap;justify-content:center";

    const btnConfirm = doc.createElement("button");
    btnConfirm.textContent = "✓ Confirmar e extrair sinal";
    btnConfirm.style.cssText = [
      "padding:10px 24px;border:none;border-radius:8px",
      "background:#1976D2;color:#fff;font-size:1rem;cursor:pointer;font-weight:600"
    ].join(";");

    const btnRetake = doc.createElement("button");
    btnRetake.textContent = "✕ Tirar outra foto";
    btnRetake.style.cssText = [
      "padding:10px 24px;border:2px solid #666;border-radius:8px",
      "background:transparent;color:#ccc;font-size:1rem;cursor:pointer"
    ].join(";");

    btnRow.appendChild(btnConfirm);
    btnRow.appendChild(btnRetake);
    overlay.appendChild(btnRow);

    return { overlay, btnConfirm, btnRetake };
  }

  /* ── Reconstrução de canvas padronizado PhysioNet ───────── */

  /**
   * Aplica threshold adaptativo em blocos para binarizar o traçado.
   * Remove fundo, grade impressa e ruído de moiré — mantém apenas o traçado.
   * @param {ImageData} imgData — dados de pixel de uma célula
   * @returns {Uint8ClampedArray} canal de luminância binarizado (0 = traçado, 255 = fundo)
   */
  function adaptiveThreshold(imgData) {
    const { data, width, height } = imgData;
    const gray = new Uint8Array(width * height);

    // Converte para escala de cinza (luminância perceptual)
    for (let i = 0; i < gray.length; i++) {
      const p = i * 4;
      gray[i] = Math.round(0.299 * data[p] + 0.587 * data[p + 1] + 0.114 * data[p + 2]);
    }

    // Threshold adaptativo: compara cada pixel com média local em bloco
    const blockSize = Math.max(15, Math.round(Math.min(width, height) / 8));
    const halfB = Math.floor(blockSize / 2);
    const C = 10; // constante de subtração (ajuste de sensibilidade)
    const result = new Uint8Array(width * height);

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const x0 = Math.max(0, x - halfB), x1 = Math.min(width - 1, x + halfB);
        const y0 = Math.max(0, y - halfB), y1 = Math.min(height - 1, y + halfB);
        let sum = 0, count = 0;
        for (let yy = y0; yy <= y1; yy++) {
          for (let xx = x0; xx <= x1; xx++) {
            sum += gray[yy * width + xx];
            count++;
          }
        }
        const mean = sum / count;
        result[y * width + x] = gray[y * width + x] < mean - C ? 0 : 255; // 0=traçado, 255=fundo
      }
    }
    return result;
  }

  /**
   * Desenha a grade padrão PhysioNet em um canvas.
   * Grade fina: 1mm (pequeno) em rosa claro; grade grossa: 5mm em rosa médio.
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} w largura do canvas
   * @param {number} h altura do canvas
   * @param {number} pxPerMm pixels por milímetro (padrão PhysioNet ≈ 4px/mm)
   */
  function drawPhysionetGrid(ctx, w, h, pxPerMm) {
    const step1mm = pxPerMm;      // grade fina
    const step5mm = pxPerMm * 5;  // grade grossa

    // Grade fina (1mm) — rosa muito claro
    ctx.strokeStyle = "rgba(255,180,180,0.5)";
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    for (let x = 0; x < w; x += step1mm) { ctx.moveTo(x, 0); ctx.lineTo(x, h); }
    for (let y = 0; y < h; y += step1mm) { ctx.moveTo(0, y); ctx.lineTo(w, y); }
    ctx.stroke();

    // Grade grossa (5mm) — rosa médio
    ctx.strokeStyle = "rgba(255,120,120,0.55)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let x = 0; x < w; x += step5mm) { ctx.moveTo(x, 0); ctx.lineTo(x, h); }
    for (let y = 0; y < h; y += step5mm) { ctx.moveTo(0, y); ctx.lineTo(w, y); }
    ctx.stroke();
  }

  /**
   * Reconstrói um canvas padronizado PhysioNet a partir da foto e do visionLayout.
   *
   * Processo por célula:
   *   1. Recorta a região da célula usando as coordenadas normalizadas do Haiku
   *   2. Aplica threshold adaptativo → binariza traçado vs fundo
   *   3. Renderiza no canvas final: fundo branco, grade PhysioNet, traçado preto
   *
   * O canvas resultante tem dimensões padronizadas (escala PhysioNet: 4px/mm)
   * compatíveis com as imagens de treinamento do motor CV (PhysioNet).
   *
   * @param {HTMLCanvasElement} sourceCanvas — foto original
   * @param {object} visionLayout — JSON retornado pelo Haiku
   * @returns {HTMLCanvasElement} canvas padronizado pronto para o motor CV
   */
  function reconstructDigitalCanvas(sourceCanvas, visionLayout) {
    if (!visionLayout?.derivacoes?.length) return sourceCanvas;

    const derivacoes = visionLayout.derivacoes;
    const layout = visionLayout.layout || {};
    const nLinhas = layout.linhas || 3;
    const nColunas = layout.colunas || 4;

    // Dimensões alvo: padrão PhysioNet (25mm/s, 10mm/mV, 4px/mm)
    // ECG padrão 10s = 250mm largura, 3 linhas × 40mm + tira 10mm = 130mm altura
    const PX_PER_MM = 4;
    const CELL_W_MM = 62.5; // 10s / 4 colunas × 25mm/s
    const CELL_H_MM = 40;
    const TIRA_H_MM = 15;
    const MARGIN_MM = 4;

    const cellW = Math.round(CELL_W_MM * PX_PER_MM);
    const cellH = Math.round(CELL_H_MM * PX_PER_MM);
    const tiraH = Math.round(TIRA_H_MM * PX_PER_MM);
    const margin = Math.round(MARGIN_MM * PX_PER_MM);

    const temTira = visionLayout.tira_ritmo?.presente === true;
    const totalW = nColunas * cellW + margin * 2;
    const totalH = nLinhas * cellH + (temTira ? tiraH : 0) + margin * 2;

    const outCanvas = doc.createElement("canvas");
    outCanvas.width = totalW;
    outCanvas.height = totalH;
    const ctx = outCanvas.getContext("2d");

    // Fundo branco
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, totalW, totalH);

    // Grade PhysioNet
    drawPhysionetGrid(ctx, totalW, totalH, PX_PER_MM);

    const srcW = sourceCanvas.width;
    const srcH = sourceCanvas.height;

    // Renderiza cada derivação
    derivacoes.forEach(d => {
      const pos = d.posicao;
      if (!pos) return;

      const isTira = d.tipo === "tira_ritmo";

      // Posição no canvas de saída
      let dstX, dstY, dstW, dstH;
      if (isTira) {
        dstX = margin;
        dstY = margin + nLinhas * cellH;
        dstW = totalW - margin * 2;
        dstH = tiraH;
      } else {
        const col = typeof d.coluna === "number" ? d.coluna - 1 : 0;
        const row = (d.linha || 1) - 1;
        dstX = margin + col * cellW;
        dstY = margin + row * cellH;
        dstW = cellW;
        dstH = cellH;
      }

      // Recorta célula da foto original
      const srcX = Math.round(pos.xMin * srcW);
      const srcY = Math.round(pos.yMin * srcH);
      const srcCellW = Math.round((pos.xMax - pos.xMin) * srcW);
      const srcCellH = Math.round((pos.yMax - pos.yMin) * srcH);

      if (srcCellW < 2 || srcCellH < 2) return;

      // Extrai pixels da célula
      const tmpCanvas = doc.createElement("canvas");
      tmpCanvas.width = srcCellW;
      tmpCanvas.height = srcCellH;
      const tmpCtx = tmpCanvas.getContext("2d");
      tmpCtx.drawImage(sourceCanvas, srcX, srcY, srcCellW, srcCellH, 0, 0, srcCellW, srcCellH);
      const imgData = tmpCtx.getImageData(0, 0, srcCellW, srcCellH);

      // Threshold adaptativo — binariza traçado
      const binary = adaptiveThreshold(imgData);

      // Escala para dimensão destino e renderiza traçado preto sobre grade
      const scaleX = dstW / srcCellW;
      const scaleY = dstH / srcCellH;

      // Renderiza pixel a pixel (escala billinear aproximada por blocos)
      const outData = ctx.getImageData(dstX, dstY, dstW, dstH);
      for (let py = 0; py < dstH; py++) {
        for (let px = 0; px < dstW; px++) {
          const sx = Math.min(srcCellW - 1, Math.round(px / scaleX));
          const sy = Math.min(srcCellH - 1, Math.round(py / scaleY));
          const isTrace = binary[sy * srcCellW + sx] === 0;
          if (isTrace) {
            const idx = (py * dstW + px) * 4;
            outData.data[idx] = 0;
            outData.data[idx + 1] = 0;
            outData.data[idx + 2] = 0;
            outData.data[idx + 3] = 255;
          }
        }
      }
      ctx.putImageData(outData, dstX, dstY);

      // Rótulo da derivação (canto superior esquerdo, pequeno)
      ctx.fillStyle = "rgba(80,80,80,0.8)";
      ctx.font = `bold ${Math.round(cellH * 0.08)}px monospace`;
      ctx.fillText(d.nome || "", dstX + 3, dstY + Math.round(cellH * 0.1));
    });

    return outCanvas;
  }

  /* ── API pública ─────────────────────────────────────────── */

  /**
   * Exibe tela de revisão de layout.
   * @param {HTMLCanvasElement} sourceCanvas — canvas com a foto do ECG
   * @param {object} options
   * @param {string} options.authToken — Bearer token Supabase
   * @param {string} options.workerUrl — URL base do worker (ex: https://ecg-vision.luria.workers.dev)
   * @returns {Promise<{ confirmed: boolean, visionLayout?: object, cleanCanvas?: HTMLCanvasElement, error?: string }>}
   */
  async function review(sourceCanvas, options = {}) {
    const { authToken, workerUrl } = options;
    if (!workerUrl) return { confirmed: false, error: "workerUrl não configurado" };

    // 1. Comprime imagem para upload
    let b64;
    try { b64 = resizeCanvasForUpload(sourceCanvas); }
    catch (e) { return { confirmed: false, error: "Falha ao preparar imagem: " + e.message }; }

    // 2. Chama worker
    let visionData;
    try {
      const headers = { "Content-Type": "application/json" };
      if (authToken) headers["Authorization"] = "Bearer " + authToken;
      const resp = await fetch(workerUrl + "/ecg-vision", {
        method: "POST",
        headers,
        body: JSON.stringify({ image_b64: b64, mime_type: "image/jpeg" }),
        signal: AbortSignal.timeout(30000)
      });
      const payload = await resp.json();
      if (!resp.ok || !payload.ok) {
        return { confirmed: false, error: payload.error || "Falha na análise de visão" };
      }
      visionData = payload;
    } catch (e) {
      return { confirmed: false, error: "Serviço de visão indisponível: " + e.message };
    }

    // 3. Exibe modal com overlay
    return new Promise(resolve => {
      const { overlay, btnConfirm, btnRetake } = buildModal(sourceCanvas, visionData);
      doc.body.appendChild(overlay);

      const cleanup = () => {
        try { doc.body.removeChild(overlay); } catch {}
      };

      btnConfirm.addEventListener("click", () => {
        cleanup();
        // Reconstrói canvas padronizado PhysioNet (JS local, sem custo de API)
        let cleanCanvas = null;
        try { cleanCanvas = reconstructDigitalCanvas(sourceCanvas, visionData); }
        catch (e) { console.warn("[ecg-vision] Falha na reconstrução do canvas:", e?.message); }
        resolve({ confirmed: true, visionLayout: visionData, cleanCanvas });
      });

      btnRetake.addEventListener("click", () => {
        cleanup();
        resolve({ confirmed: false });
      });

      // Foco no botão confirmar para acessibilidade
      setTimeout(() => btnConfirm.focus(), 50);
    });
  }

  /**
   * Converte o visionLayout (JSON do Haiku) em layoutHint para o motor CV.
   * O motor aceita: "3x4_plus_rhythm", "3x4_standard", "6x2_standard", etc.
   */
  function visionLayoutToHint(visionLayout) {
    if (!visionLayout?.layout) return "auto";
    const { linhas, colunas } = visionLayout.layout;
    const temTira = visionLayout.tira_ritmo?.presente === true;
    if (linhas === 3 && colunas === 4 && temTira) return "3x4_plus_rhythm";
    if (linhas === 3 && colunas === 4) return "3x4_standard";
    if (linhas === 6 && colunas === 2) return "6x2_standard";
    if (linhas === 2 && colunas === 6) return "6x2_standard";
    if (linhas === 1) return "12x1_stacked";
    if (linhas === 2 && colunas === 1) return "2x1_traces";
    if (linhas === 1 && colunas === 1) return "1x1_traces";
    return "auto";
  }

  /**
   * Extrai nomes de derivações identificadas pelo Haiku, em ordem de leitura.
   * Útil para pre-popular a lista de derivações confirmadas.
   */
  function extractLeadNames(visionLayout) {
    if (!Array.isArray(visionLayout?.derivacoes)) return [];
    return visionLayout.derivacoes
      .filter(d => d.tipo !== "tira_ritmo" && d.nome)
      .sort((a, b) => (a.linha - b.linha) * 100 + (a.coluna - b.coluna))
      .map(d => d.nome);
  }

  global.TraubeEcgVisionReview = { review, visionLayoutToHint, extractLeadNames };
})(typeof window !== "undefined" ? window : globalThis);
