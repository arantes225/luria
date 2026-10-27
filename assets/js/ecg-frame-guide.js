/* Local visual guidance from trace bands; never identifies a lead label. */
(() => {
  "use strict";
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  function locate(image, mode = "map") {
    const layout = (typeof window !== "undefined" ? window.LuriaEcgLayout?.detect(image) : null) ||
      (typeof require === "function" ? require("./ecg-layout.js").detect(image) : null);
    if (!image?.data || !layout?.bands?.length) return { found: false, instruction: "Não localizei o traçado. Afaste um pouco e enquadre o ECG com boa luz." };
    const { data, width, height } = image;
    if (mode === "map" && (layout.kind === "unknown" || layout.confidence === "low"))
      return { found: false, instruction: "Não reconheci o arranjo da folha. Afaste um pouco, endireite e deixe todas as faixas visíveis." };
    if (mode === "map" && layout.kind === "stacked" && layout.rows < 12)
      return { found: false, instruction: "Algumas faixas podem estar fora do quadro. Afaste para mostrar a folha inteira." };
    if (mode === "detail" && layout.bands.length > 3)
      return { found: false, instruction: "Há várias faixas na imagem. Aproxime uma derivação por vez." };
    const bands = mode === "detail" ? [layout.bands[Math.floor(layout.bands.length / 2)]] : layout.bands;
    const xValues = [];
    for (const band of bands) {
      const center = Math.round(band * height);
      for (let y = Math.max(0, center - 3); y <= Math.min(height - 1, center + 3); y++) {
        for (let x = Math.floor(width * .03); x < width * .97; x += 2) {
          const i = (y * width + x) * 4;
          const gray = (data[i] * 299 + data[i + 1] * 587 + data[i + 2] * 114) / 1000;
          if (gray < 130) xValues.push(x / width);
        }
      }
    }
    if (xValues.length < 20) return { found: false, instruction: "Tracejado pouco visível. Melhore o foco ou a iluminação." };
    xValues.sort((a, b) => a - b);
    const left = xValues[Math.floor(xValues.length * .05)];
    const right = xValues[Math.floor(xValues.length * .95)];
    const top = mode === "map" ? clamp(bands[0] - .035, 0, 1) : clamp(bands[0] - .08, 0, 1);
    const bottom = mode === "map" ? clamp(bands[bands.length - 1] + .035, 0, 1) : clamp(bands[0] + .08, 0, 1);
    const region = { left, right, top, bottom, cx: (left + right) / 2, cy: (top + bottom) / 2 };
    if (mode === "map" && (top < .06 || bottom > .94))
      return { found: true, ready: false, region, instruction: "A folha parece cortada. Afaste até aparecer uma margem em todos os lados." };
    const directions = [];
    if (region.cy < .41) directions.push("Suba um pouco");
    else if (region.cy > .59) directions.push("Desça um pouco");
    if (region.cx < .41) directions.push("mova para a esquerda");
    else if (region.cx > .59) directions.push("mova para a direita");
    if (directions.length) {
      const instruction = directions.join(" e ") + ".";
      return { found: true, ready: false, region, instruction: instruction[0].toUpperCase() + instruction.slice(1) };
    }
    const span = right - left;
    if (mode === "map" && (span > .93 || bottom - top > .91))
      return { found: true, ready: false, region, instruction: "Afaste um pouco para incluir a folha inteira." };
    if (span < (mode === "map" ? .48 : .52))
      return { found: true, ready: false, region, instruction: "Aproxime um pouco, mantendo o traçado no centro." };
    return { found: true, ready: true, region, instruction: "Enquadramento pronto. Segure firme para a captura automática." };
  }
  const api = { locate };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  if (typeof window !== "undefined") window.LuriaEcgFrameGuide = api;
})();
