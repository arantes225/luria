(() => {
  const ENDPOINT="https://sxdsfklllilhdyuamvvg.supabase.co/functions/v1/external-quick-chart";
  const APIKEY="sb_publishable_AQ5-Pn1knmBhSFyt5aMtjQ_XQynLJ_L";
  const params=new URLSearchParams(location.search);
  const slug=String(params.get("c")||"").trim().toLowerCase();
  const hash=new URLSearchParams(location.hash.replace(/^#/,""));
  const token=String(hash.get("k")||"").trim();
  const editor=document.getElementById("external-editor");
  const errorBox=document.getElementById("external-error");
  const errorMessage=document.getElementById("external-error-message");
  const status=document.getElementById("external-status");
  const saveState=document.getElementById("external-save-state");
  let saveTimer=null,loading=true,lastSerialized="";

  const fields=()=>[...document.querySelectorAll("[data-chart-field]")];
  const read=()=>Object.fromEntries(fields().map(el=>[el.dataset.chartField,el.value]));
  const fill=(content={})=>fields().forEach(el=>{el.value=String(content?.[el.dataset.chartField]||"")});
  const serialized=()=>JSON.stringify(read());

  async function call(body){
    const res=await fetch(ENDPOINT,{
      method:"POST",
      headers:{"Content-Type":"application/json","apikey":APIKEY},
      body:JSON.stringify({slug,token,...body})
    });
    const data=await res.json().catch(()=>({}));
    if(!res.ok) throw new Error(data.error||"Não foi possível acessar o prontuário.");
    return data;
  }
  function fail(message){
    loading=false;editor.hidden=true;errorBox.hidden=false;errorMessage.textContent=message;status.textContent="Acesso indisponível";
  }
  async function save(){
    if(loading) return;
    const now=serialized();
    if(now===lastSerialized){saveState.textContent="Salvo";return;}
    saveState.textContent="Salvando…";
    try{
      await call({action:"save",content:read()});
      lastSerialized=now;
      saveState.textContent="Salvo agora";
      status.textContent="Sincronizado";
    }catch(e){
      saveState.textContent="Falha ao salvar";
      status.textContent="Sem sincronizar";
    }
  }
  function queueSave(){
    saveState.textContent="Alterações pendentes";
    clearTimeout(saveTimer);
    saveTimer=setTimeout(save,900);
  }
  async function load(){
    if(!slug||!token){fail("O link está incompleto. Gere um novo acesso pelo LURIA.");return;}
    try{
      const data=await call({action:"load"});
      document.getElementById("external-title").textContent=data.chart.title||"Prontuário rápido";
      const expiry=new Date(data.chart.expires_at);
      document.getElementById("external-expiry").textContent="Expira "+expiry.toLocaleString("pt-BR",{dateStyle:"short",timeStyle:"short"});
      fill(data.chart.content||{});
      lastSerialized=serialized();
      loading=false;
      editor.hidden=false;
      status.textContent="Sincronizado";
      fields().forEach(el=>el.addEventListener("input",queueSave));
      document.getElementById("external-save").addEventListener("click",save);
    }catch(e){fail(e.message);}
  }
  load();
})();