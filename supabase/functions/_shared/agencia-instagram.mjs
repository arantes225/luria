// Cliente mínimo da API do Instagram (Instagram API com login do Instagram) para a Agência TRAUBE.
// Módulo puro: recebe fetch por parâmetro, para poder ser testado sem rede. Nunca registra tokens.

export const IG_HOST = "https://graph.instagram.com";
export const IG_OAUTH_HOST = "https://api.instagram.com";
export const VERSAO_PADRAO = "v26.0";
export const ESCOPOS = "instagram_business_basic,instagram_business_content_publish";

export class ErroInstagram extends Error {
  constructor(mensagem) { super(mensagem); this.name = "ErroInstagram"; }
}

async function lerJson(resposta) {
  let corpo = null;
  try { corpo = await resposta.json(); } catch (_) { /* resposta sem JSON */ }
  if (!resposta.ok || (corpo && corpo.error)) {
    const msg = (corpo && corpo.error && (corpo.error.message || corpo.error.error_user_msg)) || ("HTTP " + resposta.status);
    throw new ErroInstagram(String(msg).slice(0, 300));
  }
  return corpo || {};
}

const dormirPadrao = (ms) => new Promise((r) => setTimeout(r, ms));

export async function trocarCodigo({ fetchFn, appId, appSecret, redirectUri, code }) {
  const corpo = new URLSearchParams({ client_id: appId, client_secret: appSecret, grant_type: "authorization_code", redirect_uri: redirectUri, code });
  const j = await lerJson(await fetchFn(IG_OAUTH_HOST + "/oauth/access_token", { method: "POST", body: corpo }));
  const item = Array.isArray(j.data) ? j.data[0] : j;
  if (!item || !item.access_token || !item.user_id) throw new ErroInstagram("Resposta de autorização sem token.");
  return { tokenCurto: String(item.access_token), userId: String(item.user_id) };
}

export async function tokenLongo({ fetchFn, appSecret, tokenCurto }) {
  const u = new URL(IG_HOST + "/access_token");
  u.searchParams.set("grant_type", "ig_exchange_token");
  u.searchParams.set("client_secret", appSecret);
  u.searchParams.set("access_token", tokenCurto);
  const j = await lerJson(await fetchFn(u.toString()));
  if (!j.access_token || !j.expires_in) throw new ErroInstagram("Resposta sem token de longa duração.");
  return { token: String(j.access_token), expiraEmSeg: Number(j.expires_in) };
}

export async function renovarToken({ fetchFn, token }) {
  const u = new URL(IG_HOST + "/refresh_access_token");
  u.searchParams.set("grant_type", "ig_refresh_token");
  u.searchParams.set("access_token", token);
  const j = await lerJson(await fetchFn(u.toString()));
  if (!j.access_token || !j.expires_in) throw new ErroInstagram("Resposta de renovação sem token.");
  return { token: String(j.access_token), expiraEmSeg: Number(j.expires_in) };
}

export async function perfil({ fetchFn, token, versao = VERSAO_PADRAO }) {
  const u = new URL(IG_HOST + "/" + versao + "/me");
  u.searchParams.set("fields", "user_id,username");
  const j = await lerJson(await fetchFn(u.toString(), { headers: { Authorization: "Bearer " + token } }));
  return { userId: j.user_id ? String(j.user_id) : null, username: j.username ? String(j.username) : null };
}

export function urlsDaMidia(post) {
  return Array.isArray(post.midia) ? post.midia.filter((u) => typeof u === "string") : [];
}

// Devolve "" se o post pode ser publicado, ou o motivo.
export function validarMidia(post) {
  if (post.rede === "tiktok") return "TikTok ainda não é suportado pelo publicador.";
  const urls = urlsDaMidia(post);
  if (!urls.length) return "O post não tem mídia anexada.";
  if (!urls.every((u) => u.startsWith("https://"))) return "Toda mídia precisa ser um link https público.";
  const ehVideo = (u) => /\.mp4(\?|$)/i.test(u);
  const ehJpeg = (u) => /\.jpe?g(\?|$)/i.test(u);
  if (post.formato === "reel" || post.formato === "video") {
    if (urls.length !== 1 || !ehVideo(urls[0])) return "Reel precisa de exatamente 1 vídeo MP4.";
    return "";
  }
  if (!urls.every(ehJpeg)) return "O Instagram só aceita imagens JPEG.";
  if (post.formato === "carrossel" && (urls.length < 2 || urls.length > 10)) return "Carrossel precisa de 2 a 10 imagens.";
  if (post.formato === "feed" && urls.length !== 1) return "Post de imagem única precisa de exatamente 1 imagem.";
  return "";
}

async function criarContainer({ fetchFn, token, igUserId, versao, corpo }) {
  const j = await lerJson(await fetchFn(IG_HOST + "/" + versao + "/" + igUserId + "/media", {
    method: "POST",
    headers: { Authorization: "Bearer " + token, "Content-Type": "application/json" },
    body: JSON.stringify(corpo),
  }));
  if (!j.id) throw new ErroInstagram("O Instagram não devolveu o id do container.");
  return String(j.id);
}

async function esperarContainer({ fetchFn, token, versao, id, tentativas, esperaMs, dormir }) {
  for (let i = 0; i < tentativas; i++) {
    const u = new URL(IG_HOST + "/" + versao + "/" + id);
    u.searchParams.set("fields", "status_code");
    const j = await lerJson(await fetchFn(u.toString(), { headers: { Authorization: "Bearer " + token } }));
    if (j.status_code === "FINISHED") return;
    if (j.status_code === "ERROR" || j.status_code === "EXPIRED") throw new ErroInstagram("O Instagram recusou a mídia (" + j.status_code + ").");
    await dormir(esperaMs);
  }
  throw new ErroInstagram("O Instagram demorou demais para processar a mídia. Confira no app antes de agendar de novo.");
}

// Publica um post. Lança ErroInstagram em qualquer falha. Nunca repete sozinho.
export async function publicarPost({ fetchFn, token, igUserId, versao = VERSAO_PADRAO, post, tentativas = 20, esperaMs = 4000, dormir = dormirPadrao }) {
  const problema = validarMidia(post);
  if (problema) throw new ErroInstagram(problema);
  const urls = urlsDaMidia(post);
  const legenda = typeof post.legenda === "string" ? post.legenda : "";
  const base = { fetchFn, token, igUserId, versao };
  const espera = { fetchFn, token, versao, tentativas, esperaMs, dormir };
  let container;
  if (post.formato === "reel" || post.formato === "video") {
    container = await criarContainer({ ...base, corpo: { media_type: "REELS", video_url: urls[0], caption: legenda } });
    await esperarContainer({ ...espera, id: container, tentativas: Math.max(tentativas, 45) });
  } else if (post.formato === "carrossel") {
    const filhos = [];
    for (const url of urls) {
      const id = await criarContainer({ ...base, corpo: { image_url: url, is_carousel_item: true } });
      await esperarContainer({ ...espera, id });
      filhos.push(id);
    }
    container = await criarContainer({ ...base, corpo: { media_type: "CAROUSEL", children: filhos.join(","), caption: legenda } });
    await esperarContainer({ ...espera, id: container });
  } else {
    container = await criarContainer({ ...base, corpo: { image_url: urls[0], caption: legenda } });
    await esperarContainer({ ...espera, id: container });
  }
  const pub = await lerJson(await fetchFn(IG_HOST + "/" + versao + "/" + igUserId + "/media_publish", {
    method: "POST",
    headers: { Authorization: "Bearer " + token, "Content-Type": "application/json" },
    body: JSON.stringify({ creation_id: container }),
  }));
  if (!pub.id) throw new ErroInstagram("O Instagram não confirmou a publicação.");
  let permalink = null;
  try {
    const u = new URL(IG_HOST + "/" + versao + "/" + pub.id);
    u.searchParams.set("fields", "permalink");
    const info = await lerJson(await fetchFn(u.toString(), { headers: { Authorization: "Bearer " + token } }));
    if (typeof info.permalink === "string" && info.permalink.startsWith("https://")) permalink = info.permalink;
  } catch (_) { /* o link é opcional: o post já foi publicado */ }
  return { id: String(pub.id), permalink };
}
