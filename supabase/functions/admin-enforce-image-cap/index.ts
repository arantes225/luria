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
// This admin action is specifically for the approved apostila media queue.
// Other buckets contain app assets and attachments and must not be swept by
// an editorial image-cap operation.
const IMAGE_BUCKETS = ["apostila-media"];
const CAP = 81920;

async function downloadApprovedSource(source: string): Promise<Uint8Array> {
  const parsed = new URL(source);
  if (!['commons.wikimedia.org', 'upload.wikimedia.org'].includes(parsed.hostname)) {
    throw new Error("Fonte de recuperação não permitida");
  }
  let url = source;
  const special = parsed.hostname === 'commons.wikimedia.org'
    ? parsed.pathname.match(/^\/wiki\/Special:(?:FilePath|Redirect\/file)\/(.+)$/i)
    : null;
  if (special) {
    const api = new URL('https://commons.wikimedia.org/w/api.php');
    api.searchParams.set('action', 'query');
    api.searchParams.set('titles', 'File:' + decodeURIComponent(special[1]).replace(/_/g, ' '));
    api.searchParams.set('prop', 'imageinfo');
    api.searchParams.set('iiprop', 'url');
    api.searchParams.set('iiurlwidth', '1600');
    api.searchParams.set('format', 'json');
    const apiResponse = await fetch(api.href, { headers: { 'Accept': 'application/json' } });
    if (!apiResponse.ok) throw new Error("Fonte Wikimedia indisponível");
    const metadata = await apiResponse.json();
    const pages = Object.values((metadata as any)?.query?.pages || {}) as any[];
    url = String(pages[0]?.imageinfo?.[0]?.thumburl || pages[0]?.imageinfo?.[0]?.url || '');
    if (!url) throw new Error("Arquivo Wikimedia não encontrado");
  }
  const response = await fetch(url, { redirect: 'follow', headers: { 'Accept': 'image/*' } });
  if (!response.ok) throw new Error("Imagem original indisponível");
  return new Uint8Array(await response.arrayBuffer());
}

function optimize(input: Uint8Array) {
  let outWidth = 0, outHeight = 0;
  const encoded = ImageMagick.read(input, (img): Uint8Array => {
    for (const [width, quality] of [[640, 44], [520, 38], [420, 32], [320, 26], [240, 20]] as const) {
      if (img.width > width) {
        const ratio = width / img.width;
        img.resize(width, Math.max(1, Math.round(img.height * ratio)));
      }
      img.quality = quality;
      const bytes = img.write(MagickFormat.WebP, value => value);
      if (bytes.byteLength <= CAP) {
        outWidth = img.width;
        outHeight = img.height;
        return bytes;
      }
    }
    throw new Error("Não foi possível reduzir a imagem para até 80 KiB.");
  });
  return { bytes: encoded, width: outWidth, height: outHeight };
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

    const { data: queueRows, error: queueListError } = await userClient.rpc("admin_list_apostila_images", {
      p_apostila_path: null,
    });
    if (queueListError) throw queueListError;

    // The Admin queue already records the reviewed Storage URL and its size.
    // Build a small deterministic worklist from that source instead of
    // enumerating unrelated media in Storage.
    const worklist = new Map<string, any>();
    for (const row of (Array.isArray(queueRows) ? queueRows : [])) {
      const asset = row?.proposed_asset && typeof row.proposed_asset === "object" ? row.proposed_asset : {};
      const size = Number(asset.size_bytes || 0);
      const src = String(asset.src || "");
      const match = src.match(/\/storage\/v1\/object\/public\/apostila-media\/([^?#]+)/i);
      if (size > CAP && match) {
        const path = decodeURIComponent(match[1]);
        worklist.set(path, { id: row.id, row, path, metadata: { mimetype: "image/webp", size } });
      }
    }

    // One dense source per invocation keeps the Edge CPU budget predictable.
    // The Admin button can be pressed again until the queue reports no work.
    for (const item of worklist.values()) {
      const bucket = "apostila-media";
        const metadata = item.metadata || {};
        const mime = String(metadata.mimetype || "");
        const size = Number(metadata.size || 0);
        if (!mime.startsWith("image/")) continue;
        // Do not download or decode images that already satisfy the cap. The
        // old order made this sweep exceed the Edge Function resource limit.
        if (size > 0 && size <= CAP) {
          skipped.push({ bucket, path: item.path });
          continue;
        }
        try {
          let input: Uint8Array;
          const { data: downloaded, error: downloadError } = await storageClient.storage.from(bucket).download(item.path);
          if (downloadError || !downloaded) throw downloadError || new Error("Falha ao baixar objeto.");
          input = new Uint8Array(await downloaded.arrayBuffer());
          if (mime === "image/gif" || mime === "image/svg+xml") {
            throw new Error("Formato animado/vetorial preservado; reduza-o sem alterar o formato.");
          }
          let result;
          try {
            result = optimize(input);
          } catch (decodeError) {
            // A few legacy objects carry a WebP extension but contain an
            // undecodable upload. Rebuild them from the already approved
            // original source instead of publishing a broken object.
            const asset = item.row?.proposed_asset && typeof item.row.proposed_asset === "object"
              ? item.row.proposed_asset : {};
            const source = String(asset.original_src || asset.resolved_src || item.row?.source_url || "");
            if (!source) throw decodeError;
            const restored = await downloadApprovedSource(source);
            result = optimize(restored);
          }
          const { error: uploadError } = await storageClient.storage.from(bucket).upload(item.path, result.bytes, {
            contentType: "image/webp", cacheControl: "31536000", upsert: true
          });
          if (uploadError) throw uploadError;
          updated.push({ bucket, path: item.path, bytes: result.bytes.byteLength, width: result.width, height: result.height });
          const originalAsset = item.row?.proposed_asset && typeof item.row.proposed_asset === "object"
            ? item.row.proposed_asset : {};
          const { error: assetUpdateError } = await userClient.rpc("admin_update_apostila_image_asset", {
            p_id: Number(item.id),
            p_proposed_asset: {
              ...originalAsset,
              size_bytes: result.bytes.byteLength,
              optimized: true,
              optimized_format: "webp",
              optimized_width: result.width,
            },
          });
          if (assetUpdateError) throw assetUpdateError;
          if (Math.min(result.width, result.height) < 600) {
            const { error: queueError } = await userClient.rpc("admin_queue_low_resolution_image", {
              p_bucket_id: bucket, p_object_name: item.path, p_width: result.width, p_height: result.height,
              p_size_bytes: result.bytes.byteLength, p_source_page: "/admin/image-cap-backfill"
            });
            if (queueError) throw queueError;
          }
          break;
        } catch (error) {
          const message = error instanceof Error ? error.message : String(error);
          console.error("Falha ao compactar imagem", bucket, item.path, message);
          failures.push({ bucket, path: item.path, error: message });
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
