// Manipuladores das Edge Functions da Agência TRAUBE. Sem imports de Deno: recebem as dependências (db, fetch, env, relógio).
import {
  ESCOPOS, ESCOPOS_UNIFICADO, ErroInstagram, VERSAO_PADRAO, contasDoToken, ehUnificada, hostDaConexao, perfil, perfilConta, publicarPost,
  renovarToken, tokenLongo, trocarCodigo, trocarCodigoUnificado, validarMidia,
} from "./agencia-instagram.mjs";

const json = (corpo, status = 200) =>
  new Response(JSON.stringify(corpo), { status, headers: { "Content-Type": "application/json" } });

function igual(a, b) {
  if (a.length !== b.length) return false;
  let r = 0;
  for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return r === 0;
}

const DIA = 24 * 3600 * 1000;
const msgSegura = (e) => (e instanceof ErroInstagram ? e.message : "Erro inesperado ao falar com o Instagram.");

// Adaptador do Supabase (service_role) para a interface usada pelos manipuladores.
export function criarDb(sb) {
  return {
    async reservar(limite) {
      const { data, error } = await sb.rpc("agencia_reservar_publicacoes", { p_limite: limite });
      if (error) throw new Error(error.message);
      return data ?? [];
    },
    async atualizarPost(id, patch) { await sb.from("agencia_posts").update(patch).eq("id", id); },
    async logar(postId, nivel, msg) { await sb.from("agencia_publicacao_log").insert({ post_id: postId, nivel, msg }); },
    async atividade(acao, titulo) { await sb.from("agencia_atividade").insert({ quem: "Publicador", acao, titulo: titulo ?? "" }); },
    async conexao() {
      const { data } = await sb.from("agencia_instagram_conexao").select("*").eq("id", "principal").maybeSingle();
      return data ?? null;
    },
    async salvarConexao(c) {
      const { error } = await sb.from("agencia_instagram_conexao").upsert({ ...c, id: "principal", atualizado_em: new Date().toISOString() });
      if (error) throw new Error(error.message);
    },
    async consumirEstado(state) {
      const desde = new Date(Date.now() - 10 * 60 * 1000).toISOString();
      const { data } = await sb.from("agencia_instagram_estado").update({ usado: true }).eq("state", state).eq("usado", false).gt("criado_em", desde).select("state");
      return Array.isArray(data) && data.length === 1;
    },
  };
}

// d = { env(nome), db, fetchFn, agora(), dormir? }
export async function tratarPublicar(req, d) {
  if (req.method !== "POST") return json({ erro: "Método não permitido" }, 405);
  const segredo = d.env("AGENCIA_CRON_SECRET") || "";
  if (!segredo) return json({ erro: "AGENCIA_CRON_SECRET não configurado" }, 503);
  if (!igual(req.headers.get("x-agencia-secret") || "", segredo)) return json({ erro: "Não autorizado" }, 401);

  const modo = d.env("AGENCIA_MODO") || "simulacao";
  if (modo !== "simulacao" && modo !== "real") return json({ erro: "AGENCIA_MODO inválido" }, 500);
  const real = modo === "real";
  const versao = d.env("IG_API_VERSION") || VERSAO_PADRAO;

  let con = null;
  if (real) {
    con = await d.db.conexao();
    if (con) {
      const agora = d.agora().getTime();
      const resta = new Date(con.expira_em).getTime() - agora;
      const idade = agora - new Date(con.atualizado_em || con.conectado_em).getTime();
      if (!ehUnificada(con) && resta > 0 && resta < 14 * DIA && idade > DIA) {
        try {
          const r = await renovarToken({ fetchFn: d.fetchFn, token: con.access_token });
          con = { ...con, access_token: r.token, expira_em: new Date(agora + r.expiraEmSeg * 1000).toISOString() };
          await d.db.salvarConexao(con);
          await d.db.logar("_conexao", "info", "Token do Instagram renovado.");
        } catch (e) {
          await d.db.logar("_conexao", "erro", "Falha ao renovar o token: " + msgSegura(e));
        }
      }
    }
  }

  const posts = await d.db.reservar(real ? 2 : 5);
  const resultado = [];
  for (const p of posts) {
    const falhar = async (motivo) => {
      await d.db.atualizarPost(p.id, { status_publicacao: "erro", publicacao_erro: motivo, atualizado_em: d.agora().toISOString() });
      await d.db.logar(p.id, "erro", (real ? "" : "Simulação: ") + motivo);
      await d.db.atividade("não conseguiu publicar: " + motivo, p.titulo);
      resultado.push({ id: p.id, status: "erro", motivo });
    };
    const problema = validarMidia(p);
    if (problema) { await falhar(problema); continue; }

    if (!real) {
      const agora = d.agora().toISOString();
      await d.db.atualizarPost(p.id, { status_publicacao: "simulado", publicacao_id: "simulado-" + p.id, publicacao_erro: null, publicado_em: agora, atualizado_em: agora });
      await d.db.logar(p.id, "info", "Simulação: o post seria publicado agora. Nada foi enviado ao Instagram.");
      await d.db.atividade("simulou a publicação (nada foi enviado ao Instagram)", p.titulo);
      resultado.push({ id: p.id, status: "simulado" });
      continue;
    }

    if (!con) { await falhar("O Instagram não está conectado. Conecte no painel da Agência."); continue; }
    if (new Date(con.expira_em).getTime() <= d.agora().getTime()) { await falhar("O token do Instagram expirou. Reconecte no painel da Agência."); continue; }
    try {
      const r = await publicarPost({ fetchFn: d.fetchFn, token: con.access_token, igUserId: con.ig_user_id, versao, host: hostDaConexao(con), post: p, dormir: d.dormir });
      const agora = d.agora().toISOString();
      await d.db.atualizarPost(p.id, { status_publicacao: "publicado", publicacao_id: r.id, publicacao_url: r.permalink, publicacao_erro: null, publicado_em: agora, atualizado_em: agora });
      await d.db.logar(p.id, "info", "Publicado no Instagram (id " + r.id + ").");
      await d.db.atividade("publicou no Instagram", p.titulo);
      resultado.push({ id: p.id, status: "publicado" });
    } catch (e) {
      await falhar(msgSegura(e));
    }
  }
  return json({ modo, processados: resultado.length, resultado });
}

// Retorno do login do Instagram. Pública (sem JWT): só funciona com um state válido, de uso único, criado por um admin.
export async function tratarCallback(req, d) {
  const site = (d.env("SITE_URL") || "https://www.resibulando.online").replace(/\/+$/, "");
  const volta = (r) => new Response(null, { status: 302, headers: { Location: site + "/agencia/?instagram=" + r } });
  if (req.method !== "GET") return json({ erro: "Método não permitido" }, 405);
  const u = new URL(req.url);
  if (u.searchParams.get("error")) return volta("negado");
  const code = (u.searchParams.get("code") || "").replace(/#_$/, "");
  const state = u.searchParams.get("state") || "";
  if (!code || !state) return volta("invalido");
  if (!(await d.db.consumirEstado(state))) return volta("estado-invalido");
  const appId = d.env("META_APP_ID"), appSecret = d.env("META_APP_SECRET"), base = d.env("SUPABASE_URL");
  if (!appId || !appSecret || !base) return volta("erro-config");
  const redirectUri = base.replace(/\/+$/, "") + "/functions/v1/agencia-instagram-callback";
  const versao = d.env("IG_API_VERSION") || VERSAO_PADRAO;
  if ((d.env("IG_LOGIN") || "unificado") === "unificado") {
    try {
      const t = await trocarCodigoUnificado({ fetchFn: d.fetchFn, appId, appSecret, redirectUri, code, versao });
      let info = "";
      const contas = await contasDoToken({ fetchFn: d.fetchFn, appId, appSecret, token: t.token, versao, diag: (m) => { info = m; } });
      if (!contas.length) {
        await d.db.logar("_conexao", "erro", "Login sem conta do Instagram liberada. " + info);
        return volta("sem-conta");
      }
      const igUserId = contas[0];
      const p = await perfilConta({ fetchFn: d.fetchFn, token: t.token, igUserId, versao });
      await d.db.salvarConexao({
        ig_user_id: igUserId, username: p.username, access_token: t.token, escopos: ESCOPOS_UNIFICADO,
        expira_em: "9999-12-31T00:00:00.000Z", conectado_em: d.agora().toISOString(),
      });
      await d.db.atividade("conectou o Instagram" + (p.username ? " (@" + p.username + ")" : ""), "");
      return volta("conectado");
    } catch (e) {
      await d.db.logar("_conexao", "erro", "Falha ao conectar o Instagram: " + msgSegura(e));
      return volta("erro");
    }
  }
  try {
    const curto = await trocarCodigo({ fetchFn: d.fetchFn, appId, appSecret, redirectUri, code });
    const longo = await tokenLongo({ fetchFn: d.fetchFn, appSecret, tokenCurto: curto.tokenCurto });
    const p = await perfil({ fetchFn: d.fetchFn, token: longo.token, versao: d.env("IG_API_VERSION") || VERSAO_PADRAO });
    await d.db.salvarConexao({
      ig_user_id: p.userId || curto.userId, username: p.username, access_token: longo.token, escopos: ESCOPOS,
      expira_em: new Date(d.agora().getTime() + longo.expiraEmSeg * 1000).toISOString(), conectado_em: d.agora().toISOString(),
    });
    await d.db.atividade("conectou o Instagram" + (p.username ? " (@" + p.username + ")" : ""), "");
    return volta("conectado");
  } catch (e) {
    await d.db.logar("_conexao", "erro", "Falha ao conectar o Instagram: " + msgSegura(e));
    return volta("erro");
  }
}
