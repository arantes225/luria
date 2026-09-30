(() => {
  "use strict";
  const sb = window.supabaseClient;
  const key = userId => "luria_pcr_draft_v1_" + userId;
  async function user() {
    const { data, error } = await sb.auth.getSession();
    if (error) throw error;
    if (!data?.session?.user?.id) throw new Error("Entre na sua conta para salvar a PCR.");
    return data.session.user;
  }
  function readDraft(userId) {
    try {
      const value = JSON.parse(localStorage.getItem(key(userId)) || "null");
      return value?.user_id === userId && Array.isArray(value.events) ? value : null;
    } catch { return null; }
  }
  function writeDraft(userId, payload) {
    if (payload.user_id !== userId) throw new Error("A PCR pertence a outra conta.");
    localStorage.setItem(key(userId), JSON.stringify(payload));
  }
  function removeDraft(userId, recordId) {
    if (readDraft(userId)?.id === recordId) localStorage.removeItem(key(userId));
  }
  async function save(payload) {
    const owner = await user();
    if (payload.user_id !== owner.id) throw new Error("A PCR pertence a outra conta.");
    const {data, error} = await sb.rpc("save_pcr_record", {payload});
    if (error) throw error;
    if (data !== payload.id) throw new Error("O servidor não confirmou o salvamento.");
    removeDraft(owner.id, payload.id);
    return data;
  }
  function pdf(record, patient = {}) {
    const JsPDF = window.jspdf?.jsPDF;
    if (!JsPDF) throw new Error("Não foi possível carregar o gerador de PDF. Tente novamente.");
    const doc = new JsPDF({unit:"mm",format:"a4"});
    let y = 18;
    const write = (value, bold = false) => {
      doc.setFont("helvetica", bold ? "bold" : "normal");
      const lines = doc.splitTextToSize(String(value || "—"), 180);
      for (const line of lines) {
        if (y > 278) { doc.addPage(); y = 18; }
        doc.text(line, 15, y); y += 5;
      }
      y += 3;
    };
    const date = value => value ? new Date(value).toLocaleString("pt-BR") : "Não informado";
    doc.setFontSize(18); write("LURIA · Registro de PCR", true); doc.setFontSize(10);
    write("Paciente: " + (patient.initials || "Não informado"), true);
    write("Nascimento: " + (patient.birth_date ? patient.birth_date.split("-").reverse().join("/") : "Não informado"));
    write("Início: " + date(record.started_at) + " · RCE: " + date(record.ended_at));
    write("Perfil: " + (record.mode === "pediatric" ? "Pediátrico" : "Adulto") + " · Peso: " + (record.weight || "—") + " kg");
    write("Choques: " + record.shock_count + " · Ritmo: " + (record.rhythm || "Não registrado"));
    write("Informações do atendimento", true); write(record.care_info || "Não informadas");
    write("Linha do tempo", true);
    [...(record.events || [])].reverse().forEach(event => write(event.clock + " · " + event.elapsed + " · " + event.action + (event.detail ? " — " + event.detail : "")));
    doc.setFontSize(8); write("Registro gerado pelo LURIA. Conferir o registro clínico institucional.");
    doc.save("luria-pcr-" + record.id + ".pdf");
  }
  window.LuriaPCRStore = {user,readDraft,writeDraft,removeDraft,save,pdf};
})();