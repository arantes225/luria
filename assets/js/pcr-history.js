(() => {
  "use strict";
  const sb = window.supabaseClient, store = window.LuriaPCRStore;
  const $ = id => document.getElementById(id);
  const esc = value => String(value ?? "").replace(/[&<>"']/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
  const fmt = value => value ? new Date(value).toLocaleString("pt-BR") : "Não informado";
  let owner, patients = [], records = [], editing = null, busy = false;
  function status(message) { $("pcr-history-status").textContent = message; }
  const menu = (type,id) => '<details class="pcr-record-menu"><summary aria-label="Opções do '+(type==="patient"?"paciente":"registro de PCR")+'">⋯</summary><div><button type="button" data-edit-'+type+'="'+id+'">Editar '+(type==="patient"?"paciente":"PCR")+'</button><button type="button" class="danger" data-delete-'+type+'="'+id+'">Apagar '+(type==="patient"?"paciente e PCRs":"PCR")+'</button></div></details>';
  function render() {
    const q = $("pcr-history-search").value.trim().toLowerCase();
    const selected = new URLSearchParams(location.search).get("record");
    const visible = patients.filter(p => !q || [p.initials,p.birth_date,...records.filter(r=>r.patient_id===p.id).map(r=>r.care_info)].join(" ").toLowerCase().includes(q));
    $("pcr-history-list").innerHTML = visible.map(patient => {
      const rows = records.filter(record => record.patient_id === patient.id);
      return '<article class="pcr-patient-card"><header><div><h2>'+esc(patient.initials||"Paciente sem iniciais")+'</h2><small>Nascimento: '+esc(patient.birth_date?patient.birth_date.split("-").reverse().join("/"):"Não informado")+'</small></div>'+menu("patient",patient.id)+'</header><button class="button secondary" type="button" data-new-pcr="'+patient.id+'">Nova PCR para este paciente</button>'+rows.map(record => '<section class="pcr-history-record" id="record-'+record.id+'"><header><div><strong>PCR · '+esc(fmt(record.started_at))+'</strong><small style="display:block;margin-top:4px">RCE: '+esc(fmt(record.ended_at))+'</small></div>'+menu("record",record.id)+'</header><div class="pcr-record-meta"><span>'+esc(record.mode==="pediatric"?"Pediátrico":"Adulto")+'</span><span>Peso: '+esc(record.weight||"—")+' kg</span><span>'+record.shock_count+' choques</span><span>Ritmo: '+esc(record.rhythm||"Não registrado")+'</span></div><p class="pcr-record-info">'+esc(record.care_info||"Informações do atendimento não informadas.")+'</p><button type="button" class="button secondary" data-pdf="'+record.id+'">Gerar PDF</button><details '+(record.id===selected?"open":"")+'><summary>Linha do tempo · '+(record.events||[]).length+' eventos</summary><div class="pcr-record-events">'+[...(record.events||[])].reverse().map(event=>'<div class="pcr-record-event"><time>'+esc(event.clock)+'</time><span>'+esc(event.elapsed)+'</span><div><strong>'+esc(event.action)+'</strong><small>'+esc(event.detail)+'</small></div></div>').join("")+'</div></details></section>').join("")+'</article>';
    }).join("") || '<div class="pcr-patient-card">Nenhum paciente encontrado.</div>';
    renderDraft();
  }
  function renderDraft() {
    const draft = store.readDraft(owner.id);
    $("pcr-pending").hidden = !draft;
    if (!draft) return;
    $("pcr-pending-copy").textContent = draft.ended_at ? "Uma PCR encerrada aguarda salvamento. A linha do tempo está guardada neste aparelho." : "Há uma PCR em andamento neste aparelho.";
    $("pcr-pending-retry").hidden = !draft.ended_at;
  }
  async function load() {
    const [p,r] = await Promise.all([
      sb.from("pcr_patients").select("*").eq("user_id",owner.id).order("created_at",{ascending:false}),
      sb.from("pcr_records").select("*").eq("user_id",owner.id).order("started_at",{ascending:false})
    ]);
    if (p.error) throw p.error; if (r.error) throw r.error;
    patients = p.data || []; records = r.data || [];
    render(); status(records.length + " atendimento(s) salvo(s).");
  }
  function edit(type,id) {
    const item = (type==="patient"?patients:records).find(row=>row.id===id);
    if (!item) return;
    editing = {type,item};
    const form = $("pcr-edit-fields");
    $("pcr-edit-title").textContent = type==="patient"?"Editar paciente":"Editar PCR";
    form.innerHTML = type==="patient"
      ? '<label>Iniciais<input name="initials" maxlength="20" autocomplete="off" value="'+esc(item.initials)+'"></label><label>Data de nascimento<input name="birth_date" type="date" value="'+esc(item.birth_date||"")+'"></label>'
      : '<label>Perfil<select name="mode"><option value="adult" '+(item.mode==="adult"?"selected":"")+'>Adulto</option><option value="pediatric" '+(item.mode==="pediatric"?"selected":"")+'>Pediátrico</option></select></label><label>Peso (kg)<input name="weight" type="number" min="0.1" max="250" step="0.1" value="'+esc(item.weight||"")+'"></label><label>Choques<input name="shock_count" type="number" min="0" step="1" required value="'+item.shock_count+'"></label><label>Ritmo<input name="rhythm" maxlength="100" value="'+esc(item.rhythm||"")+'"></label><label>Informações do atendimento<textarea name="care_info" rows="4" maxlength="4000">'+esc(item.care_info)+'</textarea></label><strong>Eventos registrados</strong>'+[...(item.events||[])].reverse().map((event,i)=>'<div class="pcr-event-edit"><small>'+esc(event.clock)+' · '+esc(event.elapsed)+'</small><label>Evento<input data-event-action="'+i+'" maxlength="240" required value="'+esc(event.action)+'"></label><label>Detalhes<textarea data-event-detail="'+i+'" rows="2" maxlength="4000">'+esc(event.detail)+'</textarea></label></div>').join("");
    $("pcr-edit-error").textContent = ""; $("pcr-edit-dialog").showModal();
  }
  async function remove(type,id) {
    const description = type==="patient"?"Apagar este paciente e todos os seus registros de PCR?":"Apagar este registro de PCR?";
    if (!confirm(description)) return;
    const {error} = await sb.from(type==="patient"?"pcr_patients":"pcr_records").delete().eq("id",id).eq("user_id",owner.id);
    if (error) throw error;
    await load();
  }
  async function newPCR(patient) {
    if (store.readDraft(owner.id)) {
      status("Há uma PCR aguardando conclusão. Retome o atendimento no bloco acima antes de iniciar outro.");
      $("pcr-pending").scrollIntoView({block:"center"});
      return;
    }
    store.writeDraft(owner.id, {
      id:crypto.randomUUID(),patient_id:patient.id,user_id:owner.id,
      initials:patient.initials,birth_date:patient.birth_date,care_info:"",
      started_at:new Date().toISOString(),ended_at:null,mode:"adult",weight:null,
      shock_count:0,rhythm:null,events:[]
    });
    location.assign("/trabalho/pcr/executar/");
  }
  $("pcr-edit-form").addEventListener("submit",async event=>{
    event.preventDefault();
    if (busy || !editing) return;
    busy = true; $("pcr-edit-save").disabled = true;
    try {
      const form = new FormData(event.currentTarget), {type,item} = editing;
      const values = type==="patient"
        ? {initials:String(form.get("initials")||"").trim().toUpperCase(),birth_date:form.get("birth_date")||null}
        : {mode:form.get("mode"),weight:form.get("weight")?Number(form.get("weight")):null,shock_count:Number(form.get("shock_count")),rhythm:form.get("rhythm")||null,care_info:form.get("care_info")||"",events:[...(item.events||[])].reverse().map((entry,i)=>({...entry,action:$("pcr-edit-fields").querySelector('[data-event-action="'+i+'"]').value.trim(),detail:$("pcr-edit-fields").querySelector('[data-event-detail="'+i+'"]').value.trim()})).reverse()};
      const {error} = await sb.from(type==="patient"?"pcr_patients":"pcr_records").update(values).eq("id",item.id).eq("user_id",owner.id);
      if (error) throw error;
      $("pcr-edit-dialog").close(); await load();
    } catch(error) { $("pcr-edit-error").textContent = "Não foi possível salvar: "+error.message; }
    finally { busy = false; $("pcr-edit-save").disabled = false; }
  });
  $("pcr-edit-cancel").addEventListener("click",()=>$("pcr-edit-dialog").close());
  $("pcr-history-search").addEventListener("input",render);
  $("pcr-history-refresh").addEventListener("click",()=>load().catch(error=>status(error.message)));
  $("pcr-history-list").addEventListener("click",async event=>{
    const button = event.target.closest("button"); if (!button || busy) return;
    try {
      if (button.dataset.editPatient) edit("patient",button.dataset.editPatient);
      else if (button.dataset.editRecord) edit("record",button.dataset.editRecord);
      else if (button.dataset.deletePatient) await remove("patient",button.dataset.deletePatient);
      else if (button.dataset.deleteRecord) await remove("record",button.dataset.deleteRecord);
      else if (button.dataset.pdf) {
        const record = records.find(r=>r.id===button.dataset.pdf);
        store.pdf(record,patients.find(p=>p.id===record.patient_id));
      } else if (button.dataset.newPcr) await newPCR(patients.find(p=>p.id===button.dataset.newPcr));
    } catch(error) { status("Não foi possível concluir: "+error.message); }
  });
  $("pcr-pending-retry").addEventListener("click",async()=>{
    const draft = store.readDraft(owner.id); if (!draft || busy) return;
    busy = true; $("pcr-pending-retry").disabled = true;
    try { await store.save(draft); await load(); }
    catch(error) { status("Não foi possível salvar: "+error.message+". Seu atendimento continua guardado para tentar novamente."); }
    finally { busy=false; $("pcr-pending-retry").disabled=false; }
  });
  store.user().then(async user => {owner=user;renderDraft();await load();})
    .catch(error=>{status(error.message);if(!owner)location.replace("/login/?next="+encodeURIComponent("/trabalho/pcr/historico/"));});
})();