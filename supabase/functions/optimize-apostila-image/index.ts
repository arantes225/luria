
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";
import { downloadImage } from "../_shared/image-download.ts";
import {
  ImageMagick,
  initializeImageMagick,
  MagickFormat,
  Percentage,
} from "npm:@imagemagick/magick-wasm@0.0.30";

const wasmBytes = await Deno.readFile(
  new URL("magick.wasm", import.meta.resolve("npm:@imagemagick/magick-wasm@0.0.30"))
);
await initializeImageMagick(wasmBytes);

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405, headers: cors });

  try {
    const auth = req.headers.get("Authorization") || "";
    if (!auth.startsWith("Bearer ")) throw new Error("Sessão ausente");

    const url = Deno.env.get("SUPABASE_URL")!;
    const publishable =
      Deno.env.get("SUPABASE_ANON_KEY") ||
      JSON.parse(Deno.env.get("SUPABASE_PUBLISHABLE_KEYS") || "{}").default;
    if (!publishable) throw new Error("Chave pública indisponível");

    const sb = createClient(url, publishable, {
      global: { headers: { Authorization: auth } },
    });

    const { data: isAdmin, error: adminError } = await sb.rpc("is_admin");
    if (adminError || isAdmin !== true) throw new Error("Acesso administrativo necessário");

    const { id } = await req.json();
    const imageId = Number(id);
    if (!Number.isFinite(imageId)) throw new Error("ID inválido");

    const { data: rows, error: listError } = await sb.rpc("admin_list_apostila_images", {
      p_apostila_path: null,
    });
    if (listError) throw listError;

    const row = (Array.isArray(rows) ? rows : []).find((x: any) => Number(x.id) === imageId);
    if (!row) throw new Error("Imagem candidata não encontrada");

    const asset = row.proposed_asset || {};
    const src = String(asset.src || "");
    if (!src) throw new Error("Imagem sem URL");

    const siteBase = Deno.env.get("PUBLIC_SITE_URL") || "https://www.traubemedicina.com.br";
    // Optional exact-origin policy is configured by operators, not candidates.
    const configuredOrigins = Deno.env.get("APOSTILA_IMAGE_ORIGINS");
    const allowedOrigins = configuredOrigins ? JSON.parse(configuredOrigins) : undefined;
    if (allowedOrigins !== undefined && (!Array.isArray(allowedOrigins) || !allowedOrigins.length || allowedOrigins.some((value) => typeof value !== "string" || new URL(value).origin !== value))) throw Error("Política de origens inválida");
    const { bytes: input, url: resolvedSrc } = await downloadImage(src, siteBase, { allowedOrigins });

    let output: Uint8Array | null = null;
    let outWidth = 0;
    let outQuality = 0;

    const widths = [900, 800, 720, 640, 560, 480, 420, 360];
    const qualities = [78, 70, 62, 54, 46, 38];

    for (const width of widths) {
      for (const quality of qualities) {
        const encoded = ImageMagick.read(input, (img): Uint8Array => {
          if (img.width > 16000 || img.height > 16000 || img.width * img.height > 40000000) throw Error("Dimensões da imagem excedem o limite");
          if (img.width > width) {
            const ratio = width / img.width;
            img.resize(width, Math.max(1, Math.round(img.height * ratio)));
          }
          img.quality = quality;
          return img.write(MagickFormat.WebP, (data) => data);
        });

        if (encoded.byteLength <= 81920) {
          output = encoded;
          outWidth = width;
          outQuality = quality;
          break;
        }
      }
      if (output) break;
    }

    if (!output) throw new Error("Não foi possível otimizar para até 80 KB");

    const slug = String(row.apostila_path || "apostila")
      .replace(/^\/+|\/+$/g, "")
      .replace(/[^a-zA-Z0-9_-]+/g, "-");
    const key = String(row.candidate_key || imageId).replace(/[^a-zA-Z0-9_-]+/g, "-");
    const storagePath = `${slug}/${key}.webp`;

    const { error: uploadError } = await sb.storage
      .from("apostila-media")
      .upload(storagePath, output, {
        contentType: "image/webp",
        upsert: true,
        cacheControl: "31536000",
      });
    if (uploadError) throw uploadError;

    const { data: pub } = sb.storage.from("apostila-media").getPublicUrl(storagePath);
    const updated = {
      ...asset,
      original_src: asset.original_src || src,
      resolved_src: resolvedSrc,
      src: pub.publicUrl,
      size_bytes: output.byteLength,
      optimized: true,
      optimized_format: "webp",
      optimized_width: outWidth,
      optimized_quality: outQuality,
    };

    const { error: updateError } = await sb.rpc("admin_update_apostila_image_asset", {
      p_id: imageId,
      p_proposed_asset: updated,
    });
    if (updateError) throw updateError;

    return new Response(JSON.stringify({
      ok: true,
      src: pub.publicUrl,
      size_bytes: output.byteLength,
      width: outWidth,
      quality: outQuality
    }), { headers: { ...cors, "Content-Type": "application/json" } });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error?.message || String(error) }), {
      status: 400,
      headers: { ...cors, "Content-Type": "application/json" },
    });
  }
});
