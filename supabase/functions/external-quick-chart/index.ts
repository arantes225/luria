import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { withCors } from "../_shared/cors.ts";

// Endpoint obsoleto. Acesso externo da Cola Rápida exige senha fixa
// e aprovação por computador via external-quick-chart-pair.
const headers = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "no-store, private",
};

Deno.serve(withCors(async (req: Request) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Método inválido." }), { status: 405, headers });
  }
  return new Response(JSON.stringify({
    error: "Acesso antigo encerrado. Abra a Cola Rápida e solicite aprovação com a senha fixa de 4 dígitos.",
  }), {status:410, headers});
}));
