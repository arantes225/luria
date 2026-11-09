// Comandos operacionais do Leco. As operações usam o JWT da sessão atual e
// respeitam o RLS do Supabase; o módulo nunca recebe nem guarda credenciais.
const sb = () => window.supabaseClient;
const clean = value => String(value || "").trim();
const norm = value => clean(value).toLocaleLowerCase("pt-BR").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
const esc = value => String(value || "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c]));

function isoDate(value = new Date()) { return new Date(value).toISOString().slice(0, 10); }
function dateFromText(text) {
  const value = norm(text);
  const now = new Date(); now.setHours(12, 0, 0, 0);
  if (/\bhoje\b/.test(value)) return isoDate(now);
  if (/\bamanha\b/.test(value)) { now.setDate(now.getDate() + 1); return isoDate(now); }
  const numeric = value.match(/\b(\d{1,2})[\/-](\d{1,2})(?:[\/-](\d{2,4}))?\b/);
  if (numeric) { const year = numeric[3] ? (numeric[3].length === 2 ? 2000 + Number(numeric[3]) : Number(numeric[3])) : now.getFullYear(); return isoDate(new Date(year, Number(numeric[2]) - 1, Number(numeric[1]), 12)); }
  const weekdays = {domingo:0,segunda:1,terca:2,quarta:3,quinta:4,sexta:5,sabado:6};
  const day = Object.keys(weekdays).find(name => value.includes(name));
  if (day) { const delta = (weekdays[day] - now.getDay() + 7) % 7 || 7; now.setDate(now.getDate() + delta); return isoDate(now); }
  return null;
}
function dateRange(text) {
  const match = norm(text).match(/proximas?\s+(\d+)\s+semanas?/);
  const start = new Date(); start.setHours(12,0,0,0); const weeks = Math.max(1, Number(match?.[1] || 1));
  return { start: isoDate(start), end: isoDate(new Date(start.getTime() + weeks * 7 * 86400000)), weeks };
}
function showStatus(message, error = false) {
  const feed = document.getElementById("alex-chat-feed") || document.getElementById("alex-output");
  if (!feed) return;
  const article = document.createElement("article"); article.className = "alex-message alex-message-alex";
  article.innerHTML = `<div class="alex-msg-header"><span>🧭</span><span>Leco · ${error ? "Atenção" : "Ação concluída"}</span></div><div class="alex-msg-bubble">${esc(message)}</div>`;
  feed.append(article); article.scrollIntoView({ block: "nearest" });
}
async function currentUser() { const session = await sb()?.auth?.getSession(); return session?.data?.session?.user || null; }
async function refreshSchedule() { window.dispatchEvent(new CustomEvent("luria:schedule-changed")); window.dispatchEvent(new Event("luria:dashboard-data")); }

async function createEvent(user, prompt) {
  const date = dateFromText(prompt); if (!date) return false;
  const beforeDate = norm(prompt).split(/\b(?:dia|em|no|na)\b/)[0].replace(/^.*?(marque|agende|crie|adicionar?)\s+/, "").trim();
  const title = clean(beforeDate) || "Evento do cronograma";
  const { error } = await sb().from("schedule_events").insert({ user_id:user.id, title:title.slice(0,160), event_type:"other", event_date:date, area:null, materia:null, bloco:null, source:"leco" });
  if (error) throw error;
  showStatus(`Marquei “${title}” para ${new Date(date + "T12:00:00").toLocaleDateString("pt-BR")}.`); await refreshSchedule(); return true;
}
async function changeEvent(user, prompt) {
  const date = dateFromText(prompt); if (!date || !/\b(mude|mudar|altere|remarque|troque)\b/i.test(prompt)) return false;
  const name = clean(prompt.match(/(?:evento|atividade)\s+(.+?)\s+(?:para|no|na|dia)\b/i)?.[1]); if (!name) return false;
  const { data: events, error } = await sb().from("schedule_events").select("id,title").eq("user_id", user.id).ilike("title", `%${name}%`).limit(5);
  if (error) throw error; if (!events?.length) { showStatus(`Não encontrei um evento chamado “${name}”.`, true); return true; }
  const result = await sb().from("schedule_events").update({ event_date:date, updated_at:new Date().toISOString() }).eq("id", events[0].id).eq("user_id", user.id);
  if (result.error) throw result.error; showStatus(`Remarquei “${events[0].title}” para ${new Date(date + "T12:00:00").toLocaleDateString("pt-BR")}.`); await refreshSchedule(); return true;
}
async function removeEvent(user, prompt) {
  if (!/\b(apague|apagar|remova|remover|exclua|excluir)\b/i.test(prompt)) return false;
  const name = clean(prompt.match(/(?:evento|atividade)\s+(.+?)(?:\s+do\s+cronograma|\s*$)/i)?.[1]); if (!name) return false;
  const { data: events, error } = await sb().from("schedule_events").select("id,title").eq("user_id", user.id).ilike("title", `%${name}%`).limit(5);
  if (error) throw error; if (!events?.length) { showStatus(`Não encontrei “${name}” no cronograma.`, true); return true; }
  if (!await window.LuriaDialog?.confirm?.(`Remover “${events[0].title}” do cronograma?`)) return true;
  const result = await sb().from("schedule_events").delete().eq("id", events[0].id).eq("user_id", user.id);
  if (result.error) throw result.error; showStatus(`Removi “${events[0].title}” do cronograma.`); await refreshSchedule(); return true;
}
async function createFlashcards(user, prompt) {
  const match = prompt.match(/(?:flashcard|flashcards)\s*[:\-]?\s*(.+?)\s+(?:e|com)\s+(?:resposta|verso)\s*[:\-]?\s*(.+)$/i); if (!match) return false;
  const front = clean(match[1]); const back = clean(match[2]); const result = await sb().from("flashcards").insert({ user_id:user.id, area:"Leco", materia:"Leco", theme:"Criados pelo Leco", front_text:front.slice(0,1000), back_text:back.slice(0,4000), due_date:isoDate(), review_count:0, active:true, library_scope:"personal" });
  if (result.error) throw result.error; showStatus("Criei o flashcard e deixei a revisão disponível no seu deck."); return true;
}

async function adjustSchedule(user, prompt) {
  const range = dateRange(prompt); const subject = clean(prompt.match(/so aulas? de\s+(.+?)(?:,|\s+duas?|\s+\d+\s+aulas?)/i)?.[1]);
  const perDay = Number(prompt.match(/(\d+)\s+aulas?\s+por\s+dia/i)?.[1] || 0);
  const perWeek = Number(prompt.match(/(\d+)\s+aulas?\s+por\s+semana/i)?.[1] || 0);
  if (!subject || !perDay || !perWeek) return false;
  const { data: topics, error } = await sb().from("study_topics").select("id,area,materia,theme,scheduled_date,status").eq("user_id", user.id).or(`area.ilike.%${subject}%,materia.ilike.%${subject}%,theme.ilike.%${subject}%`).order("scheduled_date", { ascending:true }).limit(300);
  if (error) throw error;
  const pool = (topics || []).filter(item => !item.scheduled_date || item.scheduled_date <= range.end);
  const selected = pool.slice(0, range.weeks * perWeek); let cursor = new Date(range.start + "T12:00:00"); let dayCount = 0; let weekCount = 0;
  for (const topic of selected) {
    while (cursor.getDay() === 0 || cursor.getDay() === 6 || dayCount >= perDay || weekCount >= perWeek) {
      cursor.setDate(cursor.getDate() + 1);
      if (cursor.getDay() === 1) { dayCount = 0; weekCount = 0; }
      if (cursor.getTime() > new Date(range.end + "T12:00:00").getTime()) break;
    }
    if (cursor.getTime() > new Date(range.end + "T12:00:00").getTime()) break;
    const result = await sb().from("study_topics").update({ scheduled_date:isoDate(cursor), status:"scheduled" }).eq("id", topic.id).eq("user_id", user.id);
    if (result.error) throw result.error; dayCount++; weekCount++;
  }
  showStatus(`Reorganizei ${selected.length} aula(s) de ${subject} nas próximas ${range.weeks} semanas, respeitando ${perDay} por dia e ${perWeek} por semana.`); await refreshSchedule(); return true;
}

async function createRoom(user, prompt) {
  const match = prompt.match(/(?:crie|mont(e|ar)|abra)\s+(?:uma\s+)?sala(?:\s+de\s+|\s+para\s+)?(.+)?$/i); if (!match) return false;
  const name = clean(match[2] || match[1]) || "Sala de estudo";
  const { data, error } = await sb().rpc("social_command", { p_action:"create_room", p_payload:{ name:name.slice(0,80), description:"Sala criada pelo Leco", area:"", subject:name.slice(0,80), objective:"Estudo orientado pelo Leco", visibility:"private", capacity:6, mode:"focus", duration_minutes:50, focus_minutes:25, break_minutes:5 } });
  if (error) throw error; showStatus(`Criei a sala “${name}”.`); if (data?.id) showStatus(`A sala está pronta para você abrir em Amigos e salas.`); return true;
}

async function createQuestionList(user, prompt) {
  const theme = clean(prompt.match(/(?:questoes|questões)\s+(?:sobre|de)\s+(.+)/i)?.[1]) || "Lista do Leco";
  const { data: created, error } = await sb().from("question_sets").insert({ user_id:user.id, title:`Lista Leco · ${theme}`.slice(0,160), status:"ready", total_questions:0, source_file_name:null }).select("id").single();
  if (error) throw error; showStatus(`Criei a lista de questões “${theme}”. Você pode completar a seleção na tela de questões.`); if (created?.id) window.location.assign(`/resolver-questoes/?set_id=${encodeURIComponent(created.id)}`); return true;
}

export async function handleLecoCommand(prompt) {
  const text = clean(prompt); const n = norm(text); if (!text) return false;
  const user = await currentUser(); if (!user) return false;
  try {
    if (await removeEvent(user, text)) return true;
    if (await changeEvent(user, text)) return true;
    if (/\b(marque|agende|crie)\b/.test(n) && /\b(dia|amanha|hoje|segunda|terca|quarta|quinta|sexta|sabado|domingo|\d{1,2}[\/-]\d{1,2})\b/.test(n)) return await createEvent(user, text);
    if (/\b(proximas?\s+\d+\s+semanas?|aulas?\s+por\s+(dia|semana))\b/.test(n) && /cronograma|aulas?/.test(n)) return await adjustSchedule(user, text);
    if (/\b(crie|monte|abra)\b.*\bsala\b/.test(n)) return await createRoom(user, text);
    if (/\b(crie|monte)\b.*\b(lista|listagem)\b.*\b(questoes|questões)\b/.test(n)) return await createQuestionList(user, text);
    if (/\b(crie|adicione|monte)\b.*\bflashcards?\b/.test(n)) return await createFlashcards(user, text);
  } catch (error) { console.error("Leco action failed", error); showStatus("Não consegui concluir essa ação agora. O cronograma não foi alterado pela metade.", true); return true; }
  return false;
}
window.LuriaLecoAutonomy = { handleLecoCommand };
