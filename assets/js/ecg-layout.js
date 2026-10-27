/* Local geometric estimate only. Lead labels still require visual confirmation. */
(() => {
  "use strict";
  function detect(image) {
    const { data, width, height } = image || {};
    if (!data || width < 80 || height < 80) return { kind: "unknown", rows: 0, confidence: "low", bands: [] };
    const left = Math.floor(width * .23), right = Math.ceil(width * .77);
    const top = Math.floor(height * .07), bottom = Math.ceil(height * .94);
    const stride = Math.max(1, Math.floor((right - left) / 260));
    const active = [];
    for (let y = top; y < bottom; y++) {
      let dark = 0, total = 0;
      for (let x = left; x < right; x += stride) {
        const i = (y * width + x) * 4;
        const gray = (data[i] * 299 + data[i + 1] * 587 + data[i + 2] * 114) / 1000;
        if (gray < 130) dark++;
        total++;
      }
      const ratio = dark / Math.max(1, total);
      active.push(ratio > .018);
    }
    const centers = [];
    let begin = -1;
    for (let i = 0; i <= active.length; i++) {
      if (active[i] && begin < 0) begin = i;
      if ((!active[i] || i === active.length) && begin >= 0) {
        if (i - begin <= Math.max(8, height * .045)) centers.push((begin + i) / 2);
        begin = -1;
      }
    }
    const merged = [];
    for (const center of centers) {
      if (merged.length && center - merged[merged.length - 1] < Math.max(4, height * .012)) {
        merged[merged.length - 1] = (merged[merged.length - 1] + center) / 2;
      } else merged.push(center);
    }
    const rows = merged.length;
    const kind = rows >= 7 && rows <= 16 ? "stacked" : rows >= 2 && rows <= 5 ? "columns" : "unknown";
    const gaps = merged.slice(1).map((value, index) => value - merged[index]);
    const mean = gaps.reduce((sum, value) => sum + value, 0) / Math.max(1, gaps.length);
    const regular = gaps.length > 1 && gaps.filter(gap => gap > mean * .55 && gap < mean * 1.45).length >= gaps.length * .65;
    return { kind, rows, confidence: kind !== "unknown" && regular ? "medium" : "low",
      bands: merged.map(center => (top + center) / height) };
  }
  const api = { detect };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  if (typeof window !== "undefined") window.LuriaEcgLayout = api;
})();
