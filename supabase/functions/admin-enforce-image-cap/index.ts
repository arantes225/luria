import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";
import { ImageMagick, initializeImageMagick, MagickFormat } from "npm:@imagemagick/magick-wasm@0.0.30";

const wasmBytes = await Deno.readFile(
  new URL("magick.wasm", import.meta.resolve("npm:@imagemagick/magick-wasm@0.0.30"))
);
await initializeImageMagick(wasmBytes);

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const IMAGE_BUCKETS = ["apostila-media", "docmap", "docmap-assets", "flashcard-media", "study-room-attachments"];
const CAP = 81920;

async function listObjects(client: any, bucket: string, prefix = ""): Promise<any[]> {
  const result: any[] = [];
  for (let offset = 0; ; offset += 100) {
    const { data, error } = await client.storage.from(bucket).list(prefix, {
      limit: 100, offset, sortBy: { column: "name", order: "asc" }
    });
    if (error) throw error;
    const entries = Array.isArray(data) ? data : [];
    for (const item of entries) {
      const path = prefix ? prefix + "/" + item.name : item.name;
      if (item.id === null) result.push(...await listObjects(client, bucket, path));
      else result.push({ ...item, path });
    }
    if (entries.length < 100) break;
  }
  return result;
}

function optimize(input: Uint8Array) {
  let best: { bytes: Uint8Array; width: number; height: number } | null = null;
  const widths = [1800, 1400, 1100, 900, 760, 640, 560, 480, 400, 320, 240, 160];
  const qualities = [82, 76, 70, 64, 58, 52, 46, 40, 34];
  for (const width of widths) {
    for (const quality of qualities) {
      let outWidth = 0, outHeight = 0;
      const encoded = ImageMagick.read(input, (img): Uint8Array => {
        if (img.width > width) {
          const ratio = width / img.width;
          img.resize(width, Math.max(1, Math.round(img.height * ratio)));
        }
        outWidth = img.width;
        outHeight = img.height;
        img.quality = quality;
        return img.write(MagickFormat.WebP, bytes => bytes);
      });
      if (encoded.byteLength <= CAP) {
        best = { bytes: encoded, width: outWidth, height: outHeight };
        break;
      }
    }
    if (best) break;
  }
  if (!best) throw new Error("Não foi possível reduzir a imagem para até 80 KiB.");
  return best;
}

Deno.serve(async req => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405, headers: cors });
  try {
    const authorization = req.headers.get("Authorization") || "";
    if (!authorization.startsWith("Bearer ")) throw new Error("Sessão necessária.");
    const url = Deno.env.get("SUPABASE_URL")!;
    const publishable = Deno.env.get("SUPABASE_ANON_KEY")
      || JSON.parse(Deno.env.get("SUPABASE_PUBLISHABLE_KEYS") || "{}").default;
    if (!publishable) throw new Error("Chave pública indisponível.");
    const userClient = createClient(url, publishable, { global: { headers: { Authorization: authorization } } });
    const { data: isAdmin, error: adminError } = await userClient.rpc("is_admin");
    if (adminError || isAdmin !== true) throw new Error("Acesso administrativo necessário.");

    const serviceRole = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!serviceRole) throw new Error("Credencial administrativa do Storage indisponível.");
    const storageClient = createClient(url, serviceRole);
    const updated: Array<{ bucket: string; path: string; bytes: number; width: number; height: number }> = [];
    const skipped: Array<{ bucket: string; path: string }> = [];
    const failures: Array<{ bucket: string; path: string; error: string }> = [];

    for (const bucket of IMAGE_BUCKETS) {
      const objects = await listObjects(storageClient, bucket);
      for (const item of objects) {
        const metadata = item.metadata || {};
        const mime = String(metadata.mimetype || "");
        const size = Number(metadata.size || 0);
        if (!mime.startsWith("image/")) continue;
        try {
          const { data: downloaded, error: downloadError } = await storageClient.storage.from(bucket).download(item.path);
          if (downloadError || !downloaded) throw downloadError || new Error("Falha ao baixar objeto.");
          const input = new Uint8Array(await downloaded.arrayBuffer());
          if (size > 0 && size <= CAP) {
            const dimensions = ImageMagick.read(input, img => ({ width: img.width, height: img.height }));
            skipped.push({ bucket, path: item.path });
            if (Math.min(dimensions.width, dimensions.height) < 600) {
              const { error: queueError } = await userClient.rpc("admin_queue_low_resolution_image", {
                p_bucket_id: bucket, p_object_name: item.path, p_width: dimensions.width, p_height: dimensions.height,
                p_size_bytes: size, p_source_page: "/admin/image-cap-backfill"
              });
              if (queueError) throw queueError;
            }
            continue;
          }
          if (mime === "image/gif" || mime === "image/svg+xml") {
            throw new Error("Formato animado/vetorial preservado; reduza-o sem alterar o formato.");
          }
          const result = optimize(input);
          const { error: uploadError } = await storageClient.storage.from(bucket).upload(item.path, result.bytes, {
            contentType: "image/webp", cacheControl: "31536000", upsert: true
          });
          if (uploadError) throw uploadError;
          updated.push({ bucket, path: item.path, bytes: result.bytes.byteLength, width: result.width, height: result.height });
          if (Math.min(result.width, result.height) < 600) {
            const { error: queueError } = await userClient.rpc("admin_queue_low_resolution_image", {
              p_bucket_id: bucket, p_object_name: item.path, p_width: result.width, p_height: result.height,
              p_size_bytes: result.bytes.byteLength, p_source_page: "/admin/image-cap-backfill"
            });
            if (queueError) throw queueError;
          }
        } catch (error) {
          failures.push({ bucket, path: item.path, error: error instanceof Error ? error.message : String(error) });
        }
      }
    }
    return new Response(JSON.stringify({ ok: failures.length === 0, processed: updated.length, skipped: skipped.length, updated, failures }),
      { headers: { ...cors, "Content-Type": "application/json" } });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : String(error) }), {
      status: 400, headers: { ...cors, "Content-Type": "application/json" }
    });
  }
});
