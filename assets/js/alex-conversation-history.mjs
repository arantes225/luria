// Session-only continuity: scoped by Supabase user and browser tab.
const PREFIX = 'luria:alex:conversation:v1:';
const MAX_MESSAGES = 12;
const MAX_CHARS = 1800;
const TTL = 12 * 60 * 60 * 1000;
const keyOf = id => /^[a-f0-9-]{36}$/i.test(String(id || '')) ? PREFIX + id : null;
const store = () => { try { return globalThis.sessionStorage || null; } catch { return null; } };
export function getAlexConversation(userId) {
  const key = keyOf(userId), storage = store();
  if (!key || !storage) return [];
  try {
    const saved = JSON.parse(storage.getItem(key) || 'null');
    if (!saved || !Number.isFinite(saved.updatedAt) || Date.now() - saved.updatedAt > TTL || saved.updatedAt > Date.now() + 60_000) {
      storage.removeItem(key);
      return [];
    }
    return Array.isArray(saved.messages) ? saved.messages
      .filter(m => m && ['user', 'model'].includes(m.role) && typeof m.text === 'string' && m.text.trim())
      .slice(-MAX_MESSAGES).map(m => ({role:m.role, text:m.text.slice(0,MAX_CHARS)})) : [];
  } catch { return []; }
}
export function rememberAlexTurn(userId, question, answer) {
  const key = keyOf(userId), storage = store();
  if (!key || !storage || !String(question || '').trim() || !String(answer || '').trim()) return getAlexConversation(userId);
  const messages = [...getAlexConversation(userId),
    {role:'user', text:String(question).trim().slice(0,MAX_CHARS)},
    {role:'model', text:String(answer).trim().slice(0,MAX_CHARS)}].slice(-MAX_MESSAGES);
  try { storage.setItem(key, JSON.stringify({updatedAt:Date.now(),messages})); } catch {}
  return messages;
}
export function clearAlexConversation(userId) {
  const key = keyOf(userId);
  if (key) { try { store()?.removeItem(key); } catch {} }
}
