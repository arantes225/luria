(() => {
  "use strict";
  const ENDPOINT="https://sxdsfklllilhdyuamvvg.supabase.co/functions/v1/external-quick-chart-pair";
  const APIKEY="sb_publishable_AQ5-Pn1knmBhSFyt5aMtjQ_XQynLJ_L";
  const $=id=>document.getElementById(id);
  const gate=$("external-gate"), pending=$("external-pending"), editor=$("external-editor");
  const usernameField=$("external-username"),pinField=$("external-pin"),entry=$("external-enter");
  const error=$("external-gate-error"),pendingStatus=$("external-pending-status"),expiry=$("external-expiry");
  const sendPanel=$("external-send-panel"),receivePanel=$("external-receive-panel");
  const sendTab=$("external-tab-send"),receiveTab=$("external-tab-receive");
  const sendText=$("external-send-text"),received=$("external-received-text");
  const sendStatus=$("external-send-status"),receiveStatus=$("external-receive-status");
  let pairing=null,session=null,version=0,pollTimer=null,receiveTimer=null,activeTab="send";
  const username=()=>usernameField.value.trim().toLowerCase().replace(/[^a-z0-9._-]/g,"").slice(0,30);
  async function request(body){
    const response=await fetch(ENDPOINT,{method:"POST",cache:"no-store",headers:{"Content-Type":"application/json","apikey":APIKEY},body:JSON.stringify(body)});
    const data=await response.json().catch(()=>({}));
    if(!response.ok){const e=new Error(data.error||"Não foi possível acessar a Cola Rápida.");e.status=response.status;throw e;}
    return data;
  }
  function cancelTimers(){
    if(pollTimer!==null)clearTimeout(pollTimer);
    if(receiveTimer!==null)clearTimeout(receiveTimer);
    pollTimer=receiveTimer=null;
  }
  function tab(which){
    activeTab=which;
    const sending=which==="send";
    sendPanel.hidden=!sending;receivePanel.hidden=sending;
    sendTab.setAttribute("aria-selected",String(sending));
    receiveTab.setAttribute("aria-selected",String(!sending));
    if(!sending)loadReceived();
  }
  function reset(){
    version++;cancelTimers();pairing=null;session=null;
    gate.hidden=false;pending.hidden=true;editor.hidden=true;
    $("external-status").textContent="Acesso temporário";
    pinField.value="";error.hidden=true;
    pinField.focus();
  }
  function stillValid(){
    if(!session)return false;
    if(Date.now()>=session.expiresAt){reset();error.textContent="A sessão expirou. Abra a Cola Rápida no celular para gerar outro PIN.";error.hidden=false;return false;}
    return true;
  }
  async function enter(){
    const name=username(),pin=pinField.value.replace(/\D/g,"").slice(0,2);
    error.hidden=true;
    if(!/^[a-z0-9][a-z0-9._-]{2,29}$/.test(name)||!/^\d{2}$/.test(pin)){
      error.textContent="Informe usuário e PIN de 2 dígitos.";error.hidden=false;return;
    }
    entry.disabled=true;entry.textContent="Verificando…";
    const generation=++version;
    try{
      const result=await request({action:"begin",username:name,pin});
      if(generation!==version)return;
      pairing={request_id:result.request_id,challenge:result.challenge,deadline:Date.parse(result.pending_expires_at)};
      gate.hidden=true;pending.hidden=false;editor.hidden=true;
      pendingStatus.textContent="Solicitação enviada. Aprove pelo celular em até 2 minutos.";
      pinField.value="";
      await poll(generation);
    }catch(e){
      if(generation===version){error.textContent=e.message;error.hidden=false;}
    }finally{entry.disabled=false;entry.textContent="Solicitar acesso";}
  }
  async function poll(generation){
    if(generation!==version||!pairing)return;
    if(Date.now()>=pairing.deadline){reset();error.textContent="A aprovação expirou. Solicite novamente.";error.hidden=false;return;}
    try{
      const result=await request({action:"poll",request_id:pairing.request_id,challenge:pairing.challenge});
      if(generation!==version)return;
      if(result.state==="approved"){
        session={request_id:pairing.request_id,token:result.token,expiresAt:Date.parse(result.expires_at)};
        pairing=null;pending.hidden=true;editor.hidden=false;gate.hidden=true;
        $("external-status").textContent="Conectado";
        expiry.textContent="Expira às "+new Date(session.expiresAt).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"});
        tab("receive");
        return;
      }
    }catch(e){if(e.status===410||e.status===409){reset();error.textContent="Solicitação negada ou expirada.";error.hidden=false;return;}}
    pollTimer=setTimeout(()=>poll(generation),2200);
  }
  async function loadReceived(){
    if(!stillValid()||activeTab!=="receive")return;
    const generation=version;
    try{
      const result=await request({action:"receive",request_id:session.request_id,token:session.token});
      if(generation!==version||activeTab!=="receive")return;
      received.value=result.text||"";
      receiveStatus.textContent=result.text?"Texto sincronizado":"Aguardando texto do celular";
    }catch(e){
      if(e.status===401){reset();return;}
      if(generation===version)receiveStatus.textContent="Sem conexão. Tente atualizar.";
    }
    if(generation===version&&activeTab==="receive"){
      receiveTimer=setTimeout(loadReceived,5500);
    }
  }
  async function send(){
    if(!stillValid())return;
    const body=sendText.value.trim();
    if(!body){sendStatus.textContent="Digite algum texto antes de enviar.";return;}
    if(body.length>16000){sendStatus.textContent="Limite de 16 mil caracteres.";return;}
    const generation=version;
    const button=$("external-send");button.disabled=true;
    sendStatus.textContent="Enviando…";
    try{
      await request({action:"send",request_id:session.request_id,token:session.token,text:body});
      if(generation!==version)return;
      if(sendText.value===body)sendText.value="";
      sendStatus.textContent="Enviado ao celular.";
    }catch(e){
      if(e.status===401){reset();return;}
      sendStatus.textContent=e.message||"Falha ao enviar. Texto preservado para nova tentativa.";
    }finally{button.disabled=false;}
  }
  entry.addEventListener("click",enter);
  pinField.addEventListener("input",()=>{pinField.value=pinField.value.replace(/\D/g,"").slice(0,2);});
  pinField.addEventListener("keydown",event=>{if(event.key==="Enter")enter();});
  usernameField.addEventListener("keydown",event=>{if(event.key==="Enter")pinField.focus();});
  $("external-pending-cancel").addEventListener("click",reset);
  $("external-renew").addEventListener("click",reset);
  sendTab.addEventListener("click",()=>{cancelTimers();tab("send");});
  receiveTab.addEventListener("click",()=>{cancelTimers();tab("receive");});
  $("external-send").addEventListener("click",send);
  $("external-refresh").addEventListener("click",()=>{if(receiveTimer)clearTimeout(receiveTimer);loadReceived();});
  $("external-copy").addEventListener("click",async()=>{
    if(!received.value){receiveStatus.textContent="Não há texto para copiar.";return;}
    try{await navigator.clipboard.writeText(received.value);receiveStatus.textContent="Texto copiado.";}
    catch{received.select();receiveStatus.textContent="Selecione e copie o texto.";}
  });
  document.addEventListener("visibilitychange",()=>{
    if(!document.hidden&&session&&activeTab==="receive"){cancelTimers();loadReceived();}
  });
  const params=new URLSearchParams(location.hash.replace(/^#/,""));
  if(params.get("u"))usernameField.value=params.get("u").slice(0,30);
})();
