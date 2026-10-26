/* Índice de captura visual experimental — NÃO é precisão diagnóstica. */
(() => {
  "use strict";
  const clamp = (n, min = 0, max = 1) => Math.min(max, Math.max(min, n));
  const scorePixels = (pixels, width, height, originalWidth, originalHeight, mode = "quick") => {
    if (!pixels || width < 3 || height < 3) throw new Error("Imagem muito pequena para avaliação.");
    const lum = new Float32Array(width * height);
    let sum = 0, sumSq = 0;
    for (let i = 0, p = 0; i < lum.length; i++, p += 4) {
      const l = 0.2126 * pixels[p] + 0.7152 * pixels[p + 1] + 0.0722 * pixels[p + 2];
      lum[i] = l; sum += l; sumSq += l * l;
    }
    const mean = sum / lum.length;
    const std = Math.sqrt(Math.max(0, sumSq / lum.length - mean * mean));
    let edges = 0, count = 0;
    for (let y = 1; y < height - 1; y += 2) {
      for (let x = 1; x < width - 1; x += 2) {
        const i = y * width + x;
        const v = Math.abs(4 * lum[i] - lum[i-1] - lum[i+1] - lum[i-width] - lum[i+width]);
        edges += Math.min(160, v);
        count++;
      }
    }
    const laplacian = count ? edges / count : 0;
    const focus = clamp((laplacian - 1.5) / 16);
    const contrast = clamp((std - 6) / 45);
    const shortSide = Math.min(originalWidth, originalHeight);
    const resolution = clamp(shortSide / (mode === "quick" ? 1100 : 520));
    // Papel predominantemente claro é esperado; brilho extremo não prova reflexo.
    const exposure = mean < 85 ? .15 : mean < 130 ? .55 : mean > 252 ? .35 : mean > 245 ? .7 : 1;
    const total = Math.round(100 * (.3 * focus + .23 * contrast + .3 * resolution + .17 * exposure));
    const hints = [];
    if (resolution < .85) hints.push("Aproxime ou use uma imagem de maior resolução.");
    if (focus < .35) hints.push("Confira o foco; evite trepidação e movimento.");
    if (contrast < .3) hints.push("Confira o contraste entre grade, traçado e papel.");
    if (exposure < .6) hints.push("Ajuste a iluminação e evite áreas excessivamente claras ou escuras.");
    return { score: total, focus, contrast, resolution, exposure, hints, width: originalWidth, height: originalHeight, experimental: true };
  };
  const evaluate = async (file, mode = "quick") => {
    if (!file || !/^image\/(jpeg|png|webp)$/.test(file.type)) throw new Error("Use PNG, JPG ou WebP.");
    if (file.size > 8_000_000) throw new Error("Imagem maior que 8 MB. Reduza o tamanho antes de carregar.");
    let bitmap;
    try {
      bitmap = await createImageBitmap(file);
      const width = Math.max(1, Math.round(bitmap.width * Math.min(1, 620 / Math.max(bitmap.width, bitmap.height))));
      const height = Math.max(1, Math.round(bitmap.height * Math.min(1, 620 / Math.max(bitmap.width, bitmap.height))));
      const canvas = document.createElement("canvas");
      canvas.width = width; canvas.height = height;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) throw new Error("Não foi possível avaliar a imagem neste dispositivo.");
      ctx.drawImage(bitmap, 0, 0, width, height);
      const data = ctx.getImageData(0, 0, width, height);
      return scorePixels(data.data, width, height, bitmap.width, bitmap.height, mode);
    } finally {
      bitmap?.close?.();
    }
  };
  window.LuriaEcgImageQuality = Object.freeze({ evaluate, scorePixels });
})();
