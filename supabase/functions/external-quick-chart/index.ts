import "jsr:@supabase/functions-js/edge-runtime.d.ts";

// Endpoint obsoleto. Acesso externo da Cola Rápida exige senha fixa
// e aprovação por computador via external-quick-chart-pair.
const headers={
  "Access-Control-Allow-Origin":"*",
  "Access-Control-Allow-Headers":"authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods":"POST, OPTIONS",
  "Content-Type":"application/json; charset=utf-8",
  "Cache-Control":"no-store, private"
};
Deno.serve((req:Request)=>{
  if(req.method==="OPTIONS")return new Response("ok",{headers});
  return new Response(JSON.stringify({
    error:"Acesso antigo encerrado. Abra a Cola Rápida e solicite aprovação com a senha fixa de 4 dígitos."
  }),{status:410,headers});
});
