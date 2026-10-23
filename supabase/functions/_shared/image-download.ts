import { parseSourceUrl } from "./source-verifier.ts";

const MAX_BYTES = 8 * 1024 * 1024;
const MIME_SIGNATURES: Record<string, (data: Uint8Array) => boolean> = {
  "image/png": b => [137,80,78,71,13,10,26,10].every((v,i) => b[i] === v),
  "image/jpeg": b => b[0] === 255 && b[1] === 216 && b[2] === 255,
  "image/gif": b => new TextDecoder().decode(b.slice(0,6)) === "GIF87a" || new TextDecoder().decode(b.slice(0,6)) === "GIF89a",
  "image/webp": b => new TextDecoder().decode(b.slice(0,4)) === "RIFF" && new TextDecoder().decode(b.slice(8,12)) === "WEBP",
};

// URL hardening is not socket/IP pinning: dynamic DNS still needs enforced egress.
export async function downloadImage(src: string, siteBase: string, options: {
  fetch?: typeof fetch; timeoutMs?: number; allowedOrigins?: string[];
} = {}): Promise<{ bytes: Uint8Array; url: string }> {
  if (!src || src.trim() !== src || /[\x00-\x1f\x7f\\]/.test(src)) throw Error("URL de imagem inválida");
  const base = parseSourceUrl(siteBase);
  if (!base) throw Error("Origem do site inválida");
  const resolve = (value: string, from: URL) => {
    if (/[\x00-\x1f\x7f\\]/.test(value)) return null;
    const absolute = value.startsWith("//") ? "https:" + value : value;
    const target = parseSourceUrl(/^[a-z][a-z0-9+.-]*:/i.test(absolute) ? absolute : new URL(absolute, from).href);
    if (target && options.allowedOrigins && !options.allowedOrigins.includes(target.origin)) return null;
    return target;
  };
  let url = resolve(src, base);
  if (!url) throw Error("Destino de imagem não permitido");
  const signal = AbortSignal.timeout(options.timeoutMs ?? 12_000);
  const fetchImage = options.fetch || fetch;
  for (let redirects = 0; redirects <= 3; redirects++) {
    const response = await fetchImage(url.href, { redirect: "manual", signal, credentials: "omit", referrerPolicy: "no-referrer" });
    if ([301,302,303,307,308].includes(response.status)) {
      await response.body?.cancel();
      const next = response.headers.get("Location");
      url = next && redirects < 3 ? resolve(next, url) : null;
      if (!url) throw Error("Redirecionamento de imagem não permitido");
      continue;
    }
    const mime = (response.headers.get("content-type") || "").split(";")[0].trim().toLowerCase();
    if (!response.ok || !MIME_SIGNATURES[mime] || Number(response.headers.get("content-length") || 0) > MAX_BYTES || !response.body) {
      await response.body?.cancel();
      throw Error("Imagem indisponível, formato não suportado ou maior que 8 MB");
    }
    const reader = response.body.getReader();
    const chunks: Uint8Array[] = [];
    let length = 0;
    const onAbort = () => { void reader.cancel().catch(() => {}); };
    signal.addEventListener("abort", onAbort, { once: true });
    try {
      while (true) {
        signal.throwIfAborted();
        const { value, done } = await reader.read();
        signal.throwIfAborted();
        if (done) break;
        length += value.byteLength;
        if (length > MAX_BYTES) throw Error("Imagem maior que 8 MB");
        chunks.push(value);
      }
    } finally {
      signal.removeEventListener("abort", onAbort);
      await reader.cancel().catch(() => {});
    }
    const bytes = new Uint8Array(length);
    let offset = 0;
    for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
    if (!MIME_SIGNATURES[mime](bytes)) throw Error("Conteúdo não corresponde ao formato da imagem");
    return { bytes, url: url.href };
  }
  throw Error("Limite de redirecionamentos excedido");
}
