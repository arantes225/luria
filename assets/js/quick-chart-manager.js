(() => {
  const sb=window.supabaseClient;
  const list=document.getElementById("quick-chart-session-list");
  const status=document.getElementById("quick-chart-status");
  const createBtn=document.getElementById("quick-chart-create");
  if(!list||!createBtn||!sb) return;

  let user=null;

  const esc=(v)=>String(v??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;");
  const bytesToHex=(buffer)=>[...new Uint8Array(buffer)].map(b=>b.toString(16).padStart(2,"0")).join("");
  async function sha256(value){return bytesToHex(await crypto.subtle.digest("SHA-256",new TextEncoder().encode(value)));}
  function randomToken(bytes=32){const a=new Uint8Array(bytes);crypto.getRandomValues(a);return btoa(String.fromCharCode(...a)).replaceAll("+","-").replaceAll("/","_").replaceAll("=","");}
  function randomCode(length=6){const alphabet="ABCDEFGHJKLMNPQRSTUVWXYZ23456789";const a=new Uint8Array(length);crypto.getRandomValues(a);return [...a].map(x=>alphabet[x%alphabet.length]).join("");}
  function safeName(){
    const raw=String(window.docmapProfile?.display_name||window.docmapUser?.email?.split("@")[0]||"luria");
    return raw.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"").slice(0,22)||"luria";
  }
  function externalUrl(slug,token){
    return location.origin+"/trabalho/prontuario/?c="+encodeURIComponent(slug)+"#k="+encodeURIComponent(token);
  }
  function expiryLabel(value){
    const d=new Date(value);
    return d.toLocaleString("pt-BR",{dateStyle:"short",timeStyle:"short"});
  }
  async function copy(text){
    try{await navigator.clipboard.writeText(text);return true;}catch{
      const ta=document.createElement("textarea");ta.value=text;document.body.appendChild(ta);ta.select();const ok=document.execCommand("copy");ta.remove();return ok;
    }
  }
  function render(rows=[]){
    const active=rows.filter(row=>!row.revoked_at&&new Date(row.expires_at).getTime()>Date.now());
    if(!active.length){
      list.innerHTML='<div class="quick-chart-empty">Nenhum acesso externo ativo. Gere um link quando precisar usar o prontuário em outro computador sem fazer login.</div>';
      return;
    }
    list.innerHTML=active.map(row=>{
      const savedToken=sessionStorage.getItem("luria:quick-chart-token:"+row.id)||"";
      const url=savedToken?externalUrl(row.slug,savedToken):"";
      const c=row.content||{};
      const patient=c.patient||"Sem identificação";
      const updated=row.updated_at?new Date(row.updated_at).toLocaleString("pt-BR",{dateStyle:"short",timeStyle:"short"}):"—";
      return `<article class="quick-chart-card" data-session-id="${esc(row.id)}">
        <div class="quick-chart-card-main">
          <h4>${esc(patient)}</h4>
          <p>Expira ${esc(expiryLabel(row.expires_at))} · última sincronização ${esc(updated)}</p>
          ${url?`<span class="quick-chart-link">${esc(url)}</span>`:'<span class="quick-chart-link">Link protegido. Gere um novo acesso se precisar reabrir em outro computador.</span>'}
          <div class="quick-chart-preview">
            <span>Queixa: ${esc(c.chief_complaint||"—")}</span>
            <span>Hipótese: ${esc(c.assessment||"—")}</span>
          </div>
        </div>
        <div class="quick-chart-card-actions">
          ${url?`<a class="primary" href="${esc(url)}" target="_blank" rel="noopener">Abrir</a><button type="button" data-copy-link>Copiar link</button>`:""}
          <button type="button" class="danger" data-revoke>Encerrar acesso</button>
        </div>
      </article>`;
    }).join("");
  }
  async function load(){
    if(!user) return;
    const {data,error}=await sb.from("external_quick_chart_sessions")
      .select("id,slug,title,content,expires_at,revoked_at,last_accessed_at,created_at,updated_at")
      .eq("owner_id",user.id)
      .order("created_at",{ascending:false})
      .limit(20);
    if(error){status.textContent="Não foi possível carregar os acessos.";return;}
    render(data||[]);
  }
  async function create(){
    if(!user) return;
    createBtn.disabled=true;status.textContent="Gerando acesso seguro…";
    try{
      const token=randomToken(32);
      const tokenHash=await sha256(token);
      const slug=safeName()+"-"+randomCode(6).toLowerCase();
      const expiresAt=new Date(Date.now()+12*60*60*1000).toISOString();
      const {data,error}=await sb.from("external_quick_chart_sessions").insert({
        owner_id:user.id,slug,token_hash:tokenHash,title:"Prontuário rápido",content:{},expires_at:expiresAt
      }).select("id,slug").single();
      if(error) throw error;
      sessionStorage.setItem("luria:quick-chart-token:"+data.id,token);
      const url=externalUrl(data.slug,token);
      await copy(url);
      status.textContent="Link criado e copiado. Ele expira em 12 horas.";
      await load();
    }catch(e){
      console.error(e);status.textContent="Não foi possível gerar o acesso externo.";
    }finally{createBtn.disabled=false;}
  }
  list.addEventListener("click",async(event)=>{
    const card=event.target.closest("[data-session-id]");if(!card)return;
    const id=card.dataset.sessionId;
    if(event.target.closest("[data-copy-link]")){
      const token=sessionStorage.getItem("luria:quick-chart-token:"+id)||"";
      const link=card.querySelector(".quick-chart-link")?.textContent||"";
      if(token&&link){await copy(link);status.textContent="Link copiado.";}
    }
    if(event.target.closest("[data-revoke]")){
      const {error}=await sb.from("external_quick_chart_sessions").update({revoked_at:new Date().toISOString()}).eq("id",id);
      if(error){status.textContent="Não foi possível encerrar o acesso.";return;}
      sessionStorage.removeItem("luria:quick-chart-token:"+id);
      status.textContent="Acesso externo encerrado.";
      await load();
    }
  });
  createBtn.addEventListener("click",create);

  async function init(){
    user=window.docmapUser||null;
    if(!user){const {data}=await sb.auth.getUser();user=data?.user||null;}
    if(!user)return;
    await load();
  }
  if(window.docmapUser) init();
  else window.addEventListener("docmap:ready",init,{once:true});
})();