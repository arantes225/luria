import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2.110.6";
import {
  S3Client,
  ListObjectsV2Command,
  HeadObjectCommand,
  GetObjectCommand,
} from "npm:@aws-sdk/client-s3@3.859.0";
import { getSignedUrl } from "npm:@aws-sdk/s3-request-presigner@3.859.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "no-store, private",
};

function reply(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: corsHeaders });
}

function cleanKey(value: unknown) {
  const key = String(value ?? "").trim().replace(/^\/+/, "");
  if (!key || key.includes("..") || /[^A-Za-z0-9_./-]/.test(key)) return null;
  return key;
}

function datasetConfig(dataset: string) {
  if (dataset === "ptbxl") {
    return {
      prefix: "physionet/ptb-xl/1.0.3/",
      label: "PTB-XL 1.0.3",
    };
  }
  if (dataset === "ptbxl-plus") {
    return {
      prefix: "physionet/ptb-xl-plus/1.0.1/",
      label: "PTB-XL+ 1.0.1",
    };
  }
  return null;
}

async function requireUser(req: Request) {
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
  if (!supabaseUrl || !anonKey) return null;

  const authorization = req.headers.get("authorization") ?? "";
  if (!authorization.toLowerCase().startsWith("bearer ")) return null;

  const client = createClient(supabaseUrl, anonKey, {
    global: { headers: { Authorization: authorization } },
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data } = await client.auth.getUser();
  return data.user ?? null;
}

function r2Client() {
  const accountId = Deno.env.get("R2_ACCOUNT_ID");
  const accessKeyId = Deno.env.get("R2_ACCESS_KEY_ID");
  const secretAccessKey = Deno.env.get("R2_SECRET_ACCESS_KEY");
  if (!accountId || !accessKeyId || !secretAccessKey) {
    throw new Error("R2_NOT_CONFIGURED");
  }
  return new S3Client({
    region: "auto",
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: { accessKeyId, secretAccessKey },
  });
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return reply({ ok: false, error: "METHOD_NOT_ALLOWED" }, 405);

  const user = await requireUser(req);
  if (!user) return reply({ ok: false, error: "AUTH_REQUIRED" }, 401);

  const bucket = Deno.env.get("R2_BUCKET") || "luria-ecg-library";
  let body: any;
  try {
    body = await req.json();
  } catch {
    return reply({ ok: false, error: "INVALID_JSON" }, 400);
  }

  const dataset = String(body?.dataset ?? "ptbxl");
  const config = datasetConfig(dataset);
  if (!config) return reply({ ok: false, error: "INVALID_DATASET" }, 400);

  const s3 = r2Client();
  const op = String(body?.op ?? "catalog");

  try {
    if (op === "catalog") {
      const requestedPrefix = String(body?.prefix ?? "").trim();
      const listPrefix = requestedPrefix
        ? cleanKey(requestedPrefix)
        : config.prefix;
      if (!listPrefix || !listPrefix.startsWith(config.prefix)) {
        return reply({ ok: false, error: "INVALID_PREFIX" }, 400);
      }
      const result = await s3.send(new ListObjectsV2Command({
        Bucket: bucket,
        Prefix: listPrefix,
        Delimiter: "/",
        MaxKeys: 100,
      }));
      return reply({
        ok: true,
        dataset,
        label: config.label,
        prefixes: (result.CommonPrefixes ?? []).map((item) => item.Prefix).filter(Boolean),
        objects: (result.Contents ?? []).map((item) => ({
          key: item.Key,
          size: item.Size,
          lastModified: item.LastModified,
        })),
        truncated: Boolean(result.IsTruncated),
      });
    }

    if (op === "sign") {
      const relativeKey = cleanKey(body?.key);
      if (!relativeKey || !relativeKey.startsWith(config.prefix)) {
        return reply({ ok: false, error: "INVALID_OBJECT_KEY" }, 400);
      }

      await s3.send(new HeadObjectCommand({ Bucket: bucket, Key: relativeKey }));
      const url = await getSignedUrl(
        s3,
        new GetObjectCommand({ Bucket: bucket, Key: relativeKey }),
        { expiresIn: 300 },
      );
      return reply({
        ok: true,
        dataset,
        key: relativeKey,
        url,
        expiresIn: 300,
      });
    }

    return reply({ ok: false, error: "INVALID_OPERATION" }, 400);
  } catch (error) {
    const message = error instanceof Error ? error.message : "R2_REQUEST_FAILED";
    return reply({ ok: false, error: "R2_REQUEST_FAILED", detail: message }, 502);
  }
});
