import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";
import { criarDb, tratarCallback } from "../_shared/agencia-handlers.mjs";

// Retorno do login do Instagram (botão "Conectar Instagram" do painel). Implantar com verify_jwt = false:
// quem chama é o redirecionamento do Instagram; a proteção é o parâmetro state, de uso único e criado só por admin.
// Segredos: META_APP_ID, META_APP_SECRET. Opcionais: SITE_URL, IG_API_VERSION.
Deno.serve((req: Request) => {
  const url = Deno.env.get("SUPABASE_URL");
  const chave = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !chave) return new Response("Configuração ausente", { status: 503 });
  const sb = createClient(url, chave, { auth: { persistSession: false } });
  return tratarCallback(req, {
    env: (k: string) => Deno.env.get(k), db: criarDb(sb), fetchFn: fetch, agora: () => new Date(),
  });
});
