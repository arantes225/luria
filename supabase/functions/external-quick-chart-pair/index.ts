import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import {createClient} from "npm:@supabase/supabase-js@2.57.4";

const headers={
  "Access-Control-Allow-Origin":"*",
  "Access-Control-Allow-Headers":"authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods":"POST, OPTIONS",
  "Content-Type":"application/json; charset=utf-8",
  "Cache-Control":"no-store, private"
};
const enc=new TextEncoder();
const json=(value:unknown,status=200)=>new Response(JSON.stringify(value),{status,headers});
const hex=(data:Uint8Array)=>Array.from(data).map(x=>x.toString(16).padStart(2,"0")).join("");
const fresh=(length=24)=>{const b=new Uint8Array(length);crypto.getRandomValues(b);return hex(b);};
const sha=async(value:string)=>hex(new Uint8Array(await crypto.subtle.digest("SHA-256",enc.encode(value))));
const normalize=(v:unknown)=>String(v??"").trim().toLowerCase().replace(/[^a-z0-9._-]/g,"").slice(0,30);
const validName=(v:string)=>/^[a-z0-9][a-z0-9._-]{2,29}$/.test(v);
const validPin=(v:unknown)=>/^\d{2}$/.test(String(v??""));
const verifyEqual=(a:string,b:string)=>a.length===b.length&&Array.from(a).reduce((n,c,i)=>n|(c.charCodeAt(0)^b.charCodeAt(i)),0)===0;
async function pinDigest(owner:string,pin:string){
  const secret=Deno.env.get("LURIA_QUICK_CHART_PAIR_SECRET")||Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")||"";
  if(secret.length<32)throw Error("Segredo de pareamento ausente");
  const key=await crypto.subtle.importKey("raw",enc.encode(secret),{name:"HMAC",hash:"SHA-256"},false,["sign"]);
  return hex(new Uint8Array(await crypto.subtle.sign("HMAC",key,enc.encode("quick-chart-pair-v1|"+owner+"|"+pin))));
}
function ip(req:Request){return req.headers.get("cf-connecting-ip")||req.headers.get("x-real-ip")||req.headers.get("x-forwarded-for")?.split(",")[0]?.trim()||"unknown";}
Deno.serve(async(req:Request)=>{
  if(req.method==="OPTIONS")return new Response("ok",{headers});
  if(req.method!=="POST")return json({error:"Método inválido."},405);
  try{
    if(Number(req.headers.get("content-length")||0)>20000)return json({error:"Pedido muito grande."},413);
    const b=await req.json();
    const action=String(b?.action||"");
    const sb=createClient(Deno.env.get("SUPABASE_URL")||"",Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")||"",{auth:{persistSession:false,autoRefreshToken:false}});
    const now=Date.now();
    async function authenticated(){
      const token=(req.headers.get("authorization")||"").replace(/^Bearer\s+/i,"");
      const {data,error}=token?await sb.auth.getUser(token):{data:null,error:Error("Sem sessão")};
      if(error||!data?.user)throw Error("auth_required");
      return data.user.id;
    }
    if(["issue","pending","decide","inbox","delete_message"].includes(action)){
      const owner=await authenticated();
      if(action==="issue"){
        const {data:profile,error:profileError}=await sb.from("profiles").select("username").eq("user_id",owner).maybeSingle();
        if(profileError)throw profileError;
        const username=normalize(profile?.username);
        if(!validName(username))return json({error:"Defina um nome de usuário válido no perfil."},400);
        // No timer creates another code. This action is called only when the authenticated view opens.
        const random=new Uint8Array(1);crypto.getRandomValues(random);
        const pin=String(random[0]%100).padStart(2,"0");
        const expiry=new Date(now+30*60*1000).toISOString();
        const {error:saveError}=await sb.from("quick_chart_pair_codes").upsert({owner_id:owner,code_hash:await pinDigest(owner,pin),expires_at:expiry,created_at:new Date(now).toISOString()},{onConflict:"owner_id"});
        if(saveError)throw saveError;
        // The new opening invalidates all previous approvals, not only prior PIN values.
        const {error:removeError}=await sb.from("quick_chart_pair_requests").delete().eq("owner_id",owner);
        if(removeError)throw removeError;
        return json({ok:true,pin,username,expires_at:expiry});
      }
      if(action==="pending"){
        const {data,error}=await sb.from("quick_chart_pair_requests").select("id,created_at,expires_at,state").eq("owner_id",owner).eq("state","pending").gt("expires_at",new Date(now).toISOString()).order("created_at",{ascending:false}).limit(5);
        if(error)throw error;
        return json({requests:data||[]});
      }
      if(action==="decide"){
        const id=String(b.id||"");
        if(!/^[\da-f-]{36}$/i.test(id))return json({error:"Solicitação inválida."},400);
        const decision=b.approve===true?"approved":"denied";
        const {data:active,error:activeError}=await sb.from("quick_chart_pair_codes").select("expires_at").eq("owner_id",owner).maybeSingle();
        if(activeError)throw activeError;
        if(!active||new Date(active.expires_at).getTime()<=now)return json({error:"PIN expirado. Abra a Cola Rápida novamente."},401);
        const {data,error}=await sb.from("quick_chart_pair_requests").update({state:decision,decided_at:new Date(now).toISOString()}).eq("id",id).eq("owner_id",owner).eq("state","pending").gt("expires_at",new Date(now).toISOString()).select("id").maybeSingle();
        if(error)throw error;
        return data?json({ok:true}):json({error:"Solicitação não está mais disponível."},409);
      }
      if(action==="inbox"){
        const {data,error}=await sb.from("quick_chart_inbox").select("id,body,created_at").eq("owner_id",owner).order("created_at",{ascending:false}).limit(40);
        if(error)throw error;
        return json({messages:data||[]});
      }
      if(action==="delete_message"){
        const id=String(b.id||"");
        if(!/^[\da-f-]{36}$/i.test(id))return json({error:"Mensagem inválida."},400);
        const {error}=await sb.from("quick_chart_inbox").delete().eq("owner_id",owner).eq("id",id);
        if(error)throw error;
        return json({ok:true});
      }
    }
    if(action==="begin"){
      const username=normalize(b.username),pin=String(b.pin||"");
      if(!validName(username)||!validPin(pin))return json({error:"Informe usuário e PIN de 2 dígitos."},400);
      const accountKey=await sha("quick-pair-account|"+username);
      const ipKey=await sha("quick-pair-ip|"+username+"|"+ip(req));
      // Atomic claim counts attempts across all IPs and also by IP. Fifth request blocks for 30 min.
      const {data:accountAllowed,error:accountError}=await sb.rpc("quick_chart_claim_attempt",{p_key_hash:accountKey});
      if(accountError)throw accountError;
      if(accountAllowed!==true)return json({error:"Cinco tentativas atingidas. Bloqueado por 30 minutos."},429);
      const {data:ipAllowed,error:ipError}=await sb.rpc("quick_chart_claim_attempt",{p_key_hash:ipKey});
      if(ipError)throw ipError;
      if(ipAllowed!==true)return json({error:"Cinco tentativas atingidas. Bloqueado por 30 minutos."},429);
      const {data:profile,error:profileError}=await sb.from("profiles").select("user_id").eq("username",username).maybeSingle();
      if(profileError)throw profileError;
      const owner=profile?.user_id;
      const {data:code,error:codeError}=owner?await sb.from("quick_chart_pair_codes").select("code_hash,expires_at").eq("owner_id",owner).maybeSingle():{data:null,error:null};
      if(codeError)throw codeError;
      const matched=Boolean(owner&&code&&new Date(code.expires_at).getTime()>now&&verifyEqual(await pinDigest(owner,pin),code.code_hash));
      if(!matched)return json({error:"PIN incorreto ou expirado. Restam até cinco tentativas antes do bloqueio."},401);
      // Correct PIN still cannot open any content: explicit approval on the authenticated app required.
      const challenge=fresh(),requestId=crypto.randomUUID();
      const pendingExpiry=new Date(Math.min(new Date(code.expires_at).getTime(),now+2*60*1000)).toISOString();
      const {error:insertError}=await sb.from("quick_chart_pair_requests").insert({id:requestId,owner_id:owner,challenge_hash:await sha(challenge),state:"pending",expires_at:pendingExpiry});
      if(insertError)throw insertError;
      await sb.from("external_quick_chart_attempts").delete().in("key_hash",[accountKey,ipKey]);
      return json({request_id:requestId,challenge,expires_at:pendingExpiry});
    }
    if(action==="poll"){
      const requestId=String(b.request_id||""),challenge=String(b.challenge||"");
      if(!/^[\da-f-]{36}$/i.test(requestId)||!/^[\da-f]{48}$/.test(challenge))return json({error:"Solicitação inválida."},400);
      const {data,error}=await sb.from("quick_chart_pair_requests").select("id,owner_id,challenge_hash,state,expires_at,token_hash").eq("id",requestId).maybeSingle();
      if(error)throw error;
      if(!data||!verifyEqual(await sha(challenge),data.challenge_hash))return json({error:"Solicitação inválida."},403);
      if(new Date(data.expires_at).getTime()<=now||data.state==="denied")return json({state:"expired"},410);
      if(data.state!=="approved")return json({state:"pending"});
      if(data.token_hash)return json({state:"claimed"},409);
      const token=fresh(32);
      const {data:accepted,error:updateError}=await sb.from("quick_chart_pair_requests").update({token_hash:await sha(token)}).eq("id",requestId).eq("state","approved").is("token_hash",null).select("id").maybeSingle();
      if(updateError)throw updateError;
      return accepted?json({state:"approved",token,expires_at:data.expires_at}):json({state:"claimed"},409);
    }
    if(["receive","send"].includes(action)){
      const requestId=String(b.request_id||""),token=String(b.token||"");
      if(!/^[\da-f-]{36}$/i.test(requestId)||!/^[\da-f]{64}$/.test(token))return json({error:"Sessão inválida."},401);
      const {data:session,error}=await sb.from("quick_chart_pair_requests").select("owner_id,token_hash,state,expires_at").eq("id",requestId).maybeSingle();
      if(error)throw error;
      if(!session||session.state!=="approved"||!session.token_hash||new Date(session.expires_at).getTime()<=now||!verifyEqual(await sha(token),session.token_hash))return json({error:"Acesso expirado. Abra o app para gerar outro PIN."},401);
      if(action==="receive"){
        const {data:portal,error:portalError}=await sb.from("external_quick_chart_portals").select("content,updated_at,content_expires_at").eq("owner_id",session.owner_id).maybeSingle();
        if(portalError)throw portalError;
        const expired=portal?.content_expires_at&&new Date(portal.content_expires_at).getTime()<=now;
        return json({text:expired?"":String(portal?.content?.note||""),updated_at:portal?.updated_at||null,expires_at:session.expires_at});
      }
      const content=String(b.text||"").trim();
      if(!content||content.length>16000)return json({error:"Envie de 1 a 16.000 caracteres."},400);
      const {error:saveError}=await sb.from("quick_chart_inbox").insert({owner_id:session.owner_id,body:content});
      if(saveError)throw saveError;
      return json({ok:true,expires_at:session.expires_at});
    }
    return json({error:"Ação inválida."},400);
  }catch(e){
    if(e instanceof Error&&e.message==="auth_required")return json({error:"Entre na conta para autorizar o acesso."},401);
    console.error("quick-chart-pair:",e instanceof Error?e.message:"internal");
    return json({error:"Não foi possível completar o acesso."},500);
  }
});
