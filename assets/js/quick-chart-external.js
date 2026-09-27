(() => {
  const ENDPOINT="https://sxdsfklllilhdyuamvvg.supabase.co/functions/v1/external-quick-chart";
  const APIKEY="sb_publishable_AQ5-Pn1knmBhSFyt5aMtjQ_XQynLJ_L";
  const normalizeUsername=value=>String(value||"").trim().toLowerCase().replace(/[^a-z0-9._-]/g,"").slice(0,30);
  const gate=document.getElementById("external-gate");
  const editor=document.getElementById("external-editor");
  const errorBox=document.getElementById("external-error");
  const usernameInput=document.getElementById("external-username");
  const pinInput=document.getElementById("external-pin");
  const enterBtn=document.getElementById("external-enter");
  const gateError=document.getElementById("external-gate-error");
  const status=document.getElementById("external-status");
  const saveState=document.getElementById("external-save-state");
  const routeHash=new URLSearchParams(location.hash.replace(/^#/,""));
  let username=normalizeUsername(routeHash.get("u")||"");
  let pin="";
  let saveTimer=null;
  let loading=true;
  let lastSerialized="";

  const fields=()=>[...document.querySelectorAll("[data-chart-field]")];
  const read=()=>Object.fromEntries(fields().map(el=>[el.dataset.chartField,el.value]));
  const fill=(content={})=>fields().forEach(el=>{el.value=String(content?.[el.dataset.chartField]||"")});
  const serialized=()=>JSON.stringify(read());

  async function call(body){
    const res=await fetch(ENDPOINT,{
      method:"POST",
      headers:{"Content-Type":"application/json","apikey":APIKEY},
      body:JSON.stringify({username,pin,...body})
    });
    const data=await res.json().catch(()=>({}));
    if(!res.ok) throw new Error(data.error||"Não foi possível acessar o prontuário.");
    return data;
  }

  function updateExpiry(value){
    const el=document.getElementById("external-expiry");
    if(!value){el.textContent="Novo bloco";return;}
    const d=new Date(value);
    el.textContent="Conteúdo apaga "+d.toLocaleString("pt-BR",{dateStyle:"short",timeStyle:"short"});
  }

  async function openPortal(){
    username=normalizeUsername(usernameInput.value||username);
    pin=String(pinInput.value||"").replace(/\D/g,"").slice(0,4);
    gateError.hidden=true;

    if(!/^[a-z0-9][a-z0-9._-]{2,29}$/.test(username)){
      gateError.textContent="Digite seu nome de usuário.";
      gateError.hidden=false;
      return;
    }
    if(!/^\d{4}$/.test(pin)){
      gateError.textContent="Digite seu PIN de 4 dígitos.";
      gateError.hidden=false;
      return;
    }

    enterBtn.disabled=true;
    enterBtn.textContent="Abrindo…";
    try{
      const data=await call({action:"load"});
      fill(data.chart.content||{});
      lastSerialized=serialized();
      updateExpiry(data.chart.expires_at);
      loading=false;
      gate.hidden=true;
      errorBox.hidden=true;
      editor.hidden=false;
      status.textContent="Sincronizado";
      pinInput.value="";
      history.replaceState(null,"","/trabalho/prontuario/");
      fields().forEach(el=>el.addEventListener("input",queueSave));
    }catch(e){
      pin="";
      gateError.textContent=e.message;
      gateError.hidden=false;
    }finally{
      enterBtn.disabled=false;
      enterBtn.textContent="Abrir prontuário";
    }
  }

  async function save(){
    if(loading||!username||!pin) return;
    const now=serialized();
    if(now===lastSerialized){saveState.textContent="Salvo";return;}
    saveState.textContent="Salvando…";
    try{
      const data=await call({action:"save",content:read()});
      lastSerialized=now;
      updateExpiry(data.expires_at);
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

  async function clearAll(){
    if(!username||!pin) return;
    if(!confirm("Limpar todo o conteúdo deste prontuário rápido?")) return;
    try{
      await call({action:"clear"});
      fill({});
      lastSerialized=serialized();
      updateExpiry(null);
      saveState.textContent="Conteúdo limpo";
    }catch(e){
      saveState.textContent="Não foi possível limpar";
    }
  }

  enterBtn.addEventListener("click",openPortal);
  usernameInput.addEventListener("input",()=>{usernameInput.value=normalizeUsername(usernameInput.value)});
  usernameInput.addEventListener("keydown",e=>{if(e.key==="Enter")pinInput.focus()});
  pinInput.addEventListener("input",()=>{pinInput.value=pinInput.value.replace(/\D/g,"").slice(0,4)});
  pinInput.addEventListener("keydown",e=>{if(e.key==="Enter")openPortal()});
  document.getElementById("external-save").addEventListener("click",save);
  document.getElementById("external-clear").addEventListener("click",clearAll);

  if(username){
    usernameInput.value=username;
    pinInput.focus();
  }else{
    usernameInput.focus();
  }
})();