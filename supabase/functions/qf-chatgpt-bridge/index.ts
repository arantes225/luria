import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2.110.6";

const ALLOWED_STAGES = new Set([
  "chatgpt_initial",
  "blind_resolution",
  "perplexity_initial",
  "chatgpt_adjudication",
  "chatgpt_correction",
  "chatgpt_correction_review",
  "perplexity_reaudit",
  "lot_chatgpt_final",
  "lot_perplexity_final",
  "stage_metrics",
]);

function response(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json",
      "cache-control": "no-store",
    },
  });
}

function normalizeCode(value: unknown) {
  return String(value ?? "").trim().toUpperCase();
}

Deno.serve(async (req: Request) => {
  if (!["GET", "POST"].includes(req.method)) {
    return response({ ok: false, error: "METHOD_NOT_ALLOWED" }, 405);
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !anonKey || !serviceKey) {
    return response({ ok: false, error: "SERVER_CONFIG" }, 500);
  }

  const authorization = req.headers.get("authorization") || "";
  if (!authorization.toLowerCase().startsWith("bearer ")) {
    return response({ ok: false, error: "AUTH_REQUIRED" }, 401);
  }

  const caller = createClient(supabaseUrl, anonKey, {
    global: { headers: { Authorization: authorization } },
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data: adminOk, error: adminError } = await caller.rpc("is_admin_session");
  if (adminError || adminOk !== true) {
    return response({ ok: false, error: "ADMIN_SESSION_REQUIRED" }, 403);
  }

  const db = createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const url = new URL(req.url);
  let body: any = {};
  if (req.method === "POST") {
    try {
      body = await req.json();
    } catch {
      return response({ ok: false, error: "INVALID_JSON" }, 400);
    }
  }

  const op = String(body?.op ?? url.searchParams.get("op") ?? "snapshot").trim();
  const batchCode = normalizeCode(body?.batch_code ?? url.searchParams.get("batch_code"));
  const blockCode = normalizeCode(body?.block_code ?? url.searchParams.get("block_code"));

  if (!/^L\d{3}$/.test(batchCode)) {
    return response({ ok: false, error: "INVALID_BATCH_CODE" }, 400);
  }
  if (!/^L\d{3}-B\d{2}$/.test(blockCode) || !blockCode.startsWith(batchCode + "-")) {
    return response({ ok: false, error: "INVALID_BLOCK_CODE" }, 400);
  }

  const { data: batch, error: batchError } = await db
    .from("question_factory_batches")
    .select("id,batch_number,batch_code,exam_style,status")
    .eq("batch_code", batchCode)
    .maybeSingle();

  if (batchError || !batch) {
    return response({ ok: false, error: "BATCH_NOT_FOUND", detail: batchError?.message }, 404);
  }

  const { data: block, error: blockError } = await db
    .from("question_factory_blocks")
    .select("*")
    .eq("batch_id", batch.id)
    .eq("block_code", blockCode)
    .maybeSingle();

  if (blockError || !block) {
    return response({ ok: false, error: "BLOCK_NOT_FOUND", detail: blockError?.message }, 404);
  }

  if (op === "tracker") {
    const { data, error } = await db.rpc("admin_question_factory_block_tracker");
    if (error) return response({ ok: false, error: "TRACKER_FAILED", detail: error.message }, 500);
    const rows = Array.isArray(data) ? data : [];
    return response({
      ok: true,
      block: rows.filter((row: any) =>
        row?.batch_code === batchCode && row?.block_code === blockCode
      ),
    });
  }

  if (op === "coverage") {
    const { data, error } = await db.rpc("admin_question_factory_review_coverage", {
      p_batch_number: batch.batch_number,
      p_block_number: block.block_number,
    });
    if (error) return response({ ok: false, error: "COVERAGE_FAILED", detail: error.message }, 500);
    return response({ ok: true, batch_code: batchCode, block_code: blockCode, coverage: data });
  }

  if (op === "snapshot" || op === "status") {
    const { data: items, error: itemsError } = await db
      .from("question_factory_items")
      .select("*")
      .eq("block_id", block.id)
      .order("block_sequence_no", { ascending: true });

    if (itemsError) {
      return response({ ok: false, error: "ITEMS_FAILED", detail: itemsError.message }, 500);
    }

    if (op === "status") {
      return response({
        ok: true,
        batch,
        block: {
          id: block.id,
          block_number: block.block_number,
          block_code: block.block_code,
          status: block.status,
          chatgpt_review_status: block.chatgpt_review_status,
          perplexity_review_status: block.perplexity_review_status,
          human_review_status: block.human_review_status,
        },
        total_items: (items || []).length,
        items: (items || []).map((item: any) => ({
          question_id: item.question_id,
          question_code: item.question_code,
          version: item.version,
          status: item.status,
          block_sequence_no: item.block_sequence_no,
          latest_review_stage: item.latest_review_stage,
        })),
      });
    }

    return response({ ok: true, batch, block, items: items || [] });
  }

  if (op === "import_stage") {
    if (req.method !== "POST") {
      return response({ ok: false, error: "POST_REQUIRED" }, 405);
    }

    const payload = body?.payload;
    if (!payload || typeof payload !== "object") {
      return response({ ok: false, error: "PAYLOAD_REQUIRED" }, 400);
    }

    const payloadBatch = normalizeCode(payload.batch_code ?? payload?.batch?.batch_code);
    const payloadBlock = normalizeCode(payload.block_code ?? payload?.batch?.block_code);
    const stage = String(payload.review_stage ?? payload?.stage_metrics?.stage ?? "").trim();

    if (payloadBatch !== batchCode || payloadBlock !== blockCode) {
      return response({ ok: false, error: "SCOPE_MISMATCH" }, 400);
    }
    if (!ALLOWED_STAGES.has(stage)) {
      return response({ ok: false, error: "STAGE_NOT_ALLOWED", stage }, 400);
    }

    const { data, error } = await db.rpc("admin_import_question_factory_stage", {
      p_payload: payload,
    });
    if (error) {
      return response({
        ok: false,
        error: "IMPORT_FAILED",
        detail: error.message,
        code: error.code,
      }, 400);
    }

    const [{ data: coverage, error: coverageError }, { data: tracker, error: trackerError }] =
      await Promise.all([
        db.rpc("admin_question_factory_review_coverage", {
          p_batch_number: batch.batch_number,
          p_block_number: block.block_number,
        }),
        db.rpc("admin_question_factory_block_tracker"),
      ]);

    return response({
      ok: true,
      result: data,
      verification: {
        coverage: coverageError ? { error: coverageError.message } : coverage,
        tracker: trackerError
          ? { error: trackerError.message }
          : (Array.isArray(tracker) ? tracker : []).filter((row: any) =>
              row?.batch_code === batchCode && row?.block_code === blockCode
            ),
      },
    });
  }

  return response({ ok: false, error: "UNKNOWN_OPERATION" }, 400);
});
