import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

// Publicador da Agência TRAUBE. ETAPA 1: só SIMULA. Nunca chama a Meta.
// Chamada pelo agendamento do Supabase (pg_cron) com o cabeçalho x-agencia-secret.
// O modo real (AGENCIA_MODO=real) ainda não existe: responde 501 sem tocar em nenhum post.

const json = (corpo: unknown, status = 200) =>
  new Response(JSON.stringify(corpo), { status, headers: { "Content-Type": "application/json" } });

function igual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let r = 0;
  for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return r === 0;
}

type Post = {
  id: string; titulo: string | null; rede: string; formato: string; midia: unknown;
};

function validar(p: Post): string {
  if (p.rede === "tiktok") return "TikTok ainda não é suportado pelo publicador.";
  const urls = Array.isArray(p.midia) ? (p.midia as unknown[]).filter((u) => typeof u === "string") as string[] : [];
  if (!urls.length) return "O post não tem mídia anexada.";
  if (!urls.every((u) => u.startsWith("https://"))) return "Toda mídia precisa ser um link https público.";
  if (p.formato === "carrossel" && (urls.length < 2 || urls.length > 10)) return "Carrossel precisa de 2 a 10 imagens.";
  return "";
}

Deno.serve(async (req) => {
  if (req.method !== "POST") return json({ erro: "Método não permitido" }, 405);

  const segredo = Deno.env.get("AGENCIA_CRON_SECRET") ?? "";
  if (!segredo) return json({ erro: "AGENCIA_CRON_SECRET não configurado" }, 503);
  if (!igual(req.headers.get("x-agencia-secret") ?? "", segredo)) return json({ erro: "Não autorizado" }, 401);

  const modo = Deno.env.get("AGENCIA_MODO") ?? "simulacao";
  if (modo !== "simulacao") return json({ erro: "Modo real ainda não disponível (etapa 2)." }, 501);

  const url = Deno.env.get("SUPABASE_URL");
  const chave = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !chave) return json({ erro: "Configuração do Supabase ausente" }, 503);
  const sb = createClient(url, chave, { auth: { persistSession: false } });

  const { data, error } = await sb.rpc("agencia_reservar_publicacoes", { p_limite: 5 });
  if (error) return json({ erro: "Falha ao reservar posts", detalhe: error.message }, 500);
  const posts = (data ?? []) as Post[];

  const resultado: { id: string; status: string; motivo?: string }[] = [];
  for (const p of posts) {
    const problema = validar(p);
    if (problema) {
      await sb.from("agencia_posts").update({ status_publicacao: "erro", publicacao_erro: problema, atualizado_em: new Date().toISOString() }).eq("id", p.id);
      await sb.from("agencia_publicacao_log").insert({ post_id: p.id, nivel: "erro", msg: "Simulação: " + problema });
      await sb.from("agencia_atividade").insert({ quem: "Publicador", acao: "não conseguiu publicar: " + problema, titulo: p.titulo ?? "" });
      resultado.push({ id: p.id, status: "erro", motivo: problema });
      continue;
    }
    const agora = new Date().toISOString();
    await sb.from("agencia_posts").update({
      status_publicacao: "simulado", publicacao_id: "simulado-" + p.id, publicacao_erro: null, publicado_em: agora, atualizado_em: agora,
    }).eq("id", p.id);
    await sb.from("agencia_publicacao_log").insert({ post_id: p.id, nivel: "info", msg: "Simulação: o post seria publicado agora. Nada foi enviado ao Instagram." });
    await sb.from("agencia_atividade").insert({ quem: "Publicador", acao: "simulou a publicação (nada foi enviado ao Instagram)", titulo: p.titulo ?? "" });
    resultado.push({ id: p.id, status: "simulado" });
  }
  return json({ modo, processados: resultado.length, resultado });
});
