/* TRAUBE ECG: explicit manual paper quadrilateral, safe perspective projection.
   All coordinates are normalized to ORIGINAL decoded image orientation (0..1).
   Never hallucinates leads, calibration, waveforms, or missing signal.
   This module is not a clinical signal validation tool. */
(function (global) {
  "use strict";

  const DEFAULT_CORNERS = Object.freeze([
    Object.freeze({ x: 0.03, y: 0.03 }), // TL
    Object.freeze({ x: 0.97, y: 0.03 }), // TR
    Object.freeze({ x: 0.97, y: 0.97 }), // BR
    Object.freeze({ x: 0.03, y: 0.97 })  // BL
  ]);
  const clamp = (number, min, max) => Math.max(min, Math.min(max, number));

  function cloneCorners(corners = DEFAULT_CORNERS) {
    return corners.map(p => ({ x: Number(p.x), y: Number(p.y) }));
  }
  function signedCross(a, b, c) {
    return (b.x - a.x) * (c.y - b.y) - (b.y - a.y) * (c.x - b.x);
  }
  function polygonArea(quad) {
    return Math.abs(quad.reduce((sum, p, i) => {
      const q = quad[(i + 1) % quad.length];
      return sum + p.x * q.y - q.x * p.y;
    }, 0)) / 2;
  }

  // Fixed winding TL, TR, BR, BL; no silently reordered/crossed corners.
  function validateCorners(corners) {
    if (!Array.isArray(corners) || corners.length !== 4 ||
        corners.some(p => !p || !Number.isFinite(p.x) || !Number.isFinite(p.y) ||
          p.x < 0 || p.x > 1 || p.y < 0 || p.y > 1)) {
      return { valid: false, reason: "Os quatro cantos precisam estar sobre a foto." };
    }
    const crosses = corners.map((p, i) => signedCross(p, corners[(i + 1) % 4], corners[(i + 2) % 4]));
    if (crosses.some(c => c <= 0.0005)) {
      return { valid: false, reason: "Os pontos estão cruzados ou muito próximos. Ajuste os quatro cantos na ordem correta." };
    }
    const area = polygonArea(corners);
    if (area < 0.07) {
      return { valid: false, reason: "A área marcada está muito pequena para digitalizar o ECG. Fotografe o papel mais de perto." };
    }
    return { valid: true, area };
  }

  // Unit-square -> quad projective mapping (inverse rectification).
  function computeProjectiveMap(quad) {
    const v = validateCorners(quad);
    if (!v.valid) throw new RangeError(v.reason);
    const [a, b, c, d] = quad;
    const dx1 = b.x - c.x, dy1 = b.y - c.y;
    const dx2 = d.x - c.x, dy2 = d.y - c.y;
    const dx3 = a.x - b.x + c.x - d.x;
    const dy3 = a.y - b.y + c.y - d.y;
    const denom = dx1 * dy2 - dx2 * dy1;
    if (Math.abs(denom) < 1e-8) throw new RangeError("Não foi possível retificar a perspectiva.");
    const g = (dx3 * dy2 - dx2 * dy3) / denom;
    const h = (dx1 * dy3 - dx3 * dy1) / denom;
    const aa = b.x - a.x + g * b.x;
    const bb = d.x - a.x + h * d.x;
    const dd = b.y - a.y + g * b.y;
    const ee = d.y - a.y + h * d.y;
    return (u, v) => {
      const scale = g * u + h * v + 1;
      if (!Number.isFinite(scale) || Math.abs(scale) < 1e-9) return null;
      return { x: (aa * u + bb * v + a.x) / scale, y: (dd * u + ee * v + a.y) / scale };
    };
  }

  function rectifyCanvas(sourceCanvas, corners, maxSide = 2600) {
    const check = validateCorners(corners);
    if (!check.valid) throw new RangeError(check.reason);
    const sourceW = sourceCanvas.width, sourceH = sourceCanvas.height;
    if (!(sourceW >= 80 && sourceH >= 80)) throw new RangeError("Foto muito pequena.");
    const p = corners.map(c => ({ x: c.x * sourceW, y: c.y * sourceH }));
    const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
    const desiredW = (dist(p[0], p[1]) + dist(p[3], p[2])) / 2;
    const desiredH = (dist(p[0], p[3]) + dist(p[1], p[2])) / 2;
    const scale = Math.min(1, maxSide / Math.max(desiredW, desiredH));
    const outW = Math.max(80, Math.round(desiredW * scale));
    const outH = Math.max(80, Math.round(desiredH * scale));
    if (outW * outH > 7_000_000) throw new RangeError("Imagem retificada excede o limite seguro.");

    const input = sourceCanvas.getContext("2d", { willReadFrequently: true })
      .getImageData(0, 0, sourceW, sourceH);
    const outputCanvas = global.document.createElement("canvas");
    outputCanvas.width = outW;
    outputCanvas.height = outH;
    const outputCtx = outputCanvas.getContext("2d");
    const output = outputCtx.createImageData(outW, outH);
    const src = input.data, dest = output.data;
    const map = computeProjectiveMap(corners);

    // Bilinear color resampling (NOT waveform interpolation). This operation
    // only removes pixels outside the selected paper polygon and rectifies it.
    for (let y = 0; y < outH; y++) {
      const v = (y + 0.5) / outH;
      for (let x = 0; x < outW; x++) {
        const pos = map((x + 0.5) / outW, v);
        if (!pos) continue;
        const px = clamp(pos.x * (sourceW - 1), 0, sourceW - 1);
        const py = clamp(pos.y * (sourceH - 1), 0, sourceH - 1);
        const x0 = Math.floor(px), y0 = Math.floor(py);
        const x1 = Math.min(sourceW - 1, x0 + 1), y1 = Math.min(sourceH - 1, y0 + 1);
        const fx = px - x0, fy = py - y0;
        const i00 = (y0 * sourceW + x0) * 4, i10 = (y0 * sourceW + x1) * 4;
        const i01 = (y1 * sourceW + x0) * 4, i11 = (y1 * sourceW + x1) * 4;
        const idx = (y * outW + x) * 4;
        for (let c = 0; c < 3; c++) {
          dest[idx + c] = (
            src[i00 + c] * (1 - fx) * (1 - fy) +
            src[i10 + c] * fx * (1 - fy) +
            src[i01 + c] * (1 - fx) * fy +
            src[i11 + c] * fx * fy
          );
        }
        dest[idx + 3] = 255;
      }
    }
    outputCtx.putImageData(output, 0, 0);
    return { canvas: outputCanvas, width: outW, height: outH, paperCorners: cloneCorners(corners) };
  }

  // Rotate the WORKING COPY, not the original photograph. Unlike the legacy
  // deskew routine, this swaps dimensions for 90/270° and cannot crop edges.
  // Corners must be selected in the resulting (upright) displayed image.
  function rotateCanvasQuarter(sourceCanvas, quarterTurns = 0) {
    const turn = Number(quarterTurns);
    if (!Number.isInteger(turn)) throw new RangeError("Rotação deve ser um múltiplo de 90°.");
    const count = ((turn % 4) + 4) % 4;
    if (!count) return sourceCanvas;
    const sourceW = sourceCanvas.width, sourceH = sourceCanvas.height;
    if (!(sourceW > 0 && sourceH > 0)) throw new RangeError("Imagem inválida para rotação.");
    const out = global.document.createElement("canvas");
    out.width = count % 2 ? sourceH : sourceW;
    out.height = count % 2 ? sourceW : sourceH;
    const ctx = out.getContext("2d");
    if (!ctx) throw new Error("Canvas indisponível para girar a fotografia.");
    ctx.imageSmoothingEnabled = false;
    if (count === 1) {
      ctx.translate(out.width, 0);
      ctx.rotate(Math.PI / 2);
    } else if (count === 2) {
      ctx.translate(out.width, out.height);
      ctx.rotate(Math.PI);
    } else {
      ctx.translate(0, out.height);
      ctx.rotate(-Math.PI / 2);
    }
    ctx.drawImage(sourceCanvas, 0, 0);
    return out;
  }

  const api = { DEFAULT_CORNERS, cloneCorners, validateCorners, computeProjectiveMap, rectifyCanvas, rotateCanvasQuarter };
  global.TraubeEcgPhotoPerspective = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);
