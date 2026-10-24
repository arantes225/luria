(() => {
  const ENDPOINT="https://sxdsfklllilhdyuamvvg.supabase.co/functions/v1/external-quick-chart";
  const APIKEY="sb_publishable_AQ5-Pn1knmBhSFyt5aMtjQ_XQynLJ_L";
  const normalizeUsername=value=>String(value||"").trim().toLowerCase().replace(/[^a-z0-9._-]/g,"").slice(0,30);
  const gate=document.getElementById("external-gate");
  const editor=document.getElementById("external-editor");
  const errorBox=document.getElementById("external-error");
  const usernameInput=document.getElementById("external-username");
  const pinInput=document.getElementById("external-code");
  const enterBtn=document.getElementById("external-enter");
  const gateError=document.getElementById("external-gate-error");
  const status=document.getElementById("external-status");
  const saveState=document.getElementById("external-save-state");
  const routeHash=new URLSearchParams(location.hash.replace(/^#/,""));
  let username=normalizeUsername(routeHash.get("u")||"");
  let code="";
  let saveTimer=null;
  let loading=true;
  let lastSerialized="";
  let operations=Promise.resolve(), generation=0;
  function enqueue(operation){
    const pending=operations.then(operation,operation);
    operations=pending.catch(()=>{});
    return pending;
  }

  const fields=()=>[...document.querySelectorAll("[data-chart-field]")];
  const read=()=>Object.fromEntries(fields().map(el=>[el.dataset.chartField,el.value]));
  const fill=(content={})=>fields().forEach(el=>{el.value=String(content?.[el.dataset.chartField]||"")});
  const serialized=()=>JSON.stringify(read());

  async function call(body,credentials={username,code}){
    const res=await fetch(ENDPOINT,{
      method:"POST",
      headers:{"Content-Type":"application/json","apikey":APIKEY},
      body:JSON.stringify({...credentials,...body})
    });
    const data=await res.json().catch(()=>({}));
    if(!res.ok){const error=new Error(data.error||"Não foi possível acessar o caderno.");error.status=res.status;throw error;}
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
    code=String(pinInput.value||"").replace(/\D/g,"").slice(0,6);
    gateError.hidden=true;

    if(!/^[a-z0-9][a-z0-9._-]{2,29}$/.test(username)){
      gateError.textContent="Digite seu nome de usuário.";
      gateError.hidden=false;
      return;
    }
    if(!/^\d{6}$/.test(code)){
      gateError.textContent="Digite o código diário de 6 dígitos.";
      gateError.hidden=false;
      return;
    }

    const version=++generation;
    enterBtn.disabled=true;
    enterBtn.textContent="Abrindo…";
    try{
      clearTimeout(saveTimer);
      const credentials={username,code};
      const data=await enqueue(()=>version===generation?call({action:"load"},credentials):null);
      if(version!==generation)return;
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
      if(version===generation){code="";gateError.textContent=e.message;gateError.hidden=false;}
    }finally{
      if(version===generation){enterBtn.disabled=false;enterBtn.textContent="Abrir caderno";}
    }
  }

  async function save(){
    if(loading||!username||!code) return;
    clearTimeout(saveTimer);
    const version=generation,credentials={username,code},content=read();
    const now=serialized();
    return enqueue(async()=>{
      if(version!==generation)return;
      if(now===lastSerialized){saveState.textContent=serialized()===now?"Salvo":"Alterações pendentes";return;}
      saveState.textContent="Salvando…";
      try{
        const data=await call({action:"save",content},credentials);
        if(version!==generation)return;
        lastSerialized=now;
        updateExpiry(data.expires_at);
        const current=serialized()===now;
        saveState.textContent=current?"Salvo agora":"Alterações pendentes";
        status.textContent=current?"Sincronizado":"Sem sincronizar";
      }catch(e){
        if(version===generation){
          saveState.textContent="Falha ao salvar";
          status.textContent=e.status===401
            ?"Código diário expirado. Copie seu texto e abra novamente com o código de hoje."
            :"Sem sincronizar";
        }
      }
    });
  }

  function queueSave(){
    saveState.textContent="Alterações pendentes";
    clearTimeout(saveTimer);
    saveTimer=setTimeout(save,900);
  }

  async function clearAll(){
    if(!username||!code) return;
    if(!confirm("Limpar todo o conteúdo deste caderno temporário?")) return;
    clearTimeout(saveTimer);
    const version=++generation,credentials={username,code},previous=read();
    fill({});const empty=serialized();
    saveState.textContent="Limpando…";
    return enqueue(async()=>{
      if(version!==generation)return;
      try{
        await call({action:"clear"},credentials);
        if(version!==generation)return;
        lastSerialized=empty;
        updateExpiry(null);
        saveState.textContent=serialized()===empty?"Conteúdo limpo":"Alterações pendentes";
      }catch(e){
        if(version===generation){
          if(serialized()===empty)fill(previous);
          saveState.textContent="Não foi possível limpar";
          if(e.status===401) status.textContent="Código diário expirado. Reabra com o código de hoje.";
        }
      }
    });
  }

  enterBtn.addEventListener("click",openPortal);
  usernameInput.addEventListener("input",()=>{usernameInput.value=normalizeUsername(usernameInput.value)});
  usernameInput.addEventListener("keydown",e=>{if(e.key==="Enter")pinInput.focus()});
  pinInput.addEventListener("input",()=>{pinInput.value=pinInput.value.replace(/\D/g,"").slice(0,6)});
  pinInput.addEventListener("keydown",e=>{if(e.key==="Enter")openPortal()});
  document.getElementById("external-renew")?.addEventListener("click",()=>{
    if(serialized()!==lastSerialized &&
       !confirm("Há alterações não salvas. Copie seu texto antes de trocar o código para não perdê-lo. Continuar?")) return;
    clearTimeout(saveTimer);
    generation++;
    code="";
    loading=true;
    editor.hidden=true;
    gate.hidden=false;
    status.textContent="Digite o código atualizado.";
    gateError.hidden=true;
    pinInput.value="";
    pinInput.focus();
  });
  document.getElementById("external-save").addEventListener("click",save);
  document.getElementById("external-clear").addEventListener("click",clearAll);

  if(username){
    usernameInput.value=username;
    pinInput.focus();
  }else{
    usernameInput.focus();
  }
})();
