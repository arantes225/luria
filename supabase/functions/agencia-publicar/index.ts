import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";
import { criarDb, tratarPublicar } from "../_shared/agencia-handlers.mjs";

// Publicador da Agência TRAUBE. Chamado a cada 5 min pelo pg_cron, com o cabeçalho x-agencia-secret.
// Implantar com verify_jwt = false (a autenticação é o segredo). AGENCIA_MODO: "simulacao" (padrão) ou "real".
Deno.serve((req: Request) => {
  const url = Deno.env.get("SUPABASE_URL");
  const chave = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !chave) return new Response(JSON.stringify({ erro: "Configuração do Supabase ausente" }), { status: 503, headers: { "Content-Type": "application/json" } });
  const sb = createClient(url, chave, { auth: { persistSession: false } });
  return tratarPublicar(req, {
    env: (k: string) => Deno.env.get(k), db: criarDb(sb), fetchFn: fetch, agora: () => new Date(),
  });
});
