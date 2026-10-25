import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import {createClient} from "npm:@supabase/supabase-js@2.57.4";

const HEADERS={
  "Access-Control-Allow-Origin":"*",
  "Access-Control-Allow-Headers":"authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods":"POST, OPTIONS",
  "Content-Type":"application/json; charset=utf-8",
  "Cache-Control":"no-store, private"
};
const json=(data:unknown,status=200)=>new Response(JSON.stringify(data),{status,headers:HEADERS});
const enc=new TextEncoder();
const hex=(bytes:Uint8Array)=>Array.from(bytes).map(x=>x.toString(16).padStart(2,"0")).join("");
const unhex=(str:string)=>new Uint8Array((str.match(/.{2}/g)||[]).map(x=>parseInt(x,16)));
const random=(bytes=24)=>{const out=new Uint8Array(bytes);crypto.getRandomValues(out);return hex(out);};
const sha=async(s:string)=>hex(new Uint8Array(await crypto.subtle.digest("SHA-256",enc.encode(s))));
const normalize=(v:unknown)=>String(v??"").trim().toLowerCase().replace(/[^a-z0-9._-]/g,"").slice(0,30);
const validUsername=(v:string)=>/^[a-z0-9][a-z0-9._-]{2,29}$/.test(v);
const validPIN=(v:unknown)=>/^\d{4}$/.test(String(v??""));
const constantEqual=(a:string,b:string)=>{
  if(a.length!==b.length)return false;
  let sum=0;
  for(let i=0;i<a.length;i++)sum|=a.charCodeAt(i)^b.charCodeAt(i);
  return sum===0;
};
async function pinHash(owner:string,pin:string,salt:string){
  const pepper=Deno.env.get("LURIA_QUICK_CHART_PAIR_SECRET")||Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")||"";
  if(pepper.length<32)throw Error("PIN secret unavailable");
  const key=await crypto.subtle.importKey("raw",enc.encode(owner+"|"+pin+"|"+pepper),"PBKDF2",false,["deriveBits"]);
  const data=await crypto.subtle.deriveBits({name:"PBKDF2",salt:unhex(salt),iterations:120000,hash:"SHA-256"},key,256);
  return hex(new Uint8Array(data));
}
const userAgentLabel=(req:Request)=>{
  const ua=(req.headers.get("user-agent")||"").slice(0,300);
  const os=/Windows/i.test(ua)?"Windows":/Macintosh|Mac OS/i.test(ua)?"macOS":/Android/i.test(ua)?"Android":/iPhone|iPad/i.test(ua)?"iOS":/Linux/i.test(ua)?"Linux":"Computador";
  const browser=/Edg\//i.test(ua)?"Edge":/Firefox\//i.test(ua)?"Firefox":/Chrome\//i.test(ua)?"Chrome":/Safari\//i.test(ua)?"Safari":"Navegador";
  return browser+" · "+os;
};
const ip=(req:Request)=>req.headers.get("cf-connecting-ip")||req.headers.get("x-real-ip")||req.headers.get("x-forwarded-for")?.split(",")[0]?.trim()||"unknown";
const uuid=(s:string)=>/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(s);

Deno.serve(async(req:Request)=>{
  if(req.method==="OPTIONS")return new Response("ok",{headers:HEADERS});
  if(req.method!=="POST")return json({error:"Método inválido."},405);
  try{
    if(Number(req.headers.get("content-length")||0)>20000)return json({error:"Pedido muito grande."},413);
    const payload=await req.json();
    const action=String(payload?.action||"");
    const sb=createClient(Deno.env.get("SUPABASE_URL")||"",Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")||"",{auth:{persistSession:false,autoRefreshToken:false}});
    const now=new Date();
    const iso=now.toISOString();
    const settings=async(owner:string)=>{
      const {data,error}=await sb.from("quick_chart_pair_security").select("owner_id,pin_hash,pin_salt,authorization_version").eq("owner_id",owner).maybeSingle();
      if(error)throw error;
      return data;
    };
    async function authenticated(){
      const token=(req.headers.get("authorization")||"").replace(/^Bearer\s+/i,"");
      const {data,error}=token?await sb.auth.getUser(token):{data:null,error:new Error("Missing login")};
      if(error||!data?.user)throw Error("auth_required");
      return data.user.id;
    }

    if(["status","set_pin","pending","decide","sessions","revoke_all","inbox","delete_message","verify_owner_pin"].includes(action)){
      const owner=await authenticated();
      if(action==="set_pin"){
        const pin=String(payload.pin??"");
        if(!validPIN(pin))return json({error:"Use exatamente quatro dígitos."},400);
        const salt=random(16);
        const digest=await pinHash(owner,pin,salt);
        const {data,error}=await sb.rpc("quick_chart_set_fixed_pin",{p_owner:owner,p_hash:digest,p_salt:salt});
        if(error)throw error;
        return json({ok:true,configured:true,revoked:true,version:data});
      }
      const config=await settings(owner);
      if(action==="status")return json({configured:Boolean(config),version:config?.authorization_version||null});
      if(action==="revoke_all"){
        if(!config)return json({error:"Configure primeiro a senha fixa."},400);
        const {data,error}=await sb.rpc("quick_chart_revoke_all_access",{p_owner:owner});
        if(error)throw error;
        return json({ok:true,revoked:true,version:data});
      }
      if(action==="verify_owner_pin"){
        if(!config||!validPIN(payload.pin))return json({error:"Senha inválida."},401);
        const key=await sha("quick-chart-owner-verification|"+owner);
        const {data:allowed,error:limiterError}=await sb.rpc("quick_chart_pair_claim_attempt",{p_key_hash:key});
        if(limiterError)throw limiterError;
        if(allowed!==true)return json({error:"Limite de tentativas atingido. Tente em 30 minutos."},429);
        const match=constantEqual(await pinHash(owner,String(payload.pin),config.pin_salt),config.pin_hash);
        if(!match)return json({error:"Senha inválida."},401);
        await sb.from("external_quick_chart_attempts").delete().eq("key_hash",key);
        return json({ok:true});
      }
      if(action==="pending"){
        if(!config)return json({requests:[]});
        const {data,error}=await sb.from("quick_chart_pair_requests")
          .select("id,client_label,created_at,state")
          .eq("owner_id",owner).eq("authorization_version",config.authorization_version)
          .eq("state","pending").gt("expires_at",iso)
          .order("created_at",{ascending:false}).limit(10);
        if(error)throw error;
        return json({requests:data||[]});
      }
      if(action==="sessions"){
        if(!config)return json({sessions:[]});
        const {data,error}=await sb.from("quick_chart_pair_requests")
          .select("id,client_label,created_at,decided_at,expires_at")
          .eq("owner_id",owner).eq("authorization_version",config.authorization_version)
          .eq("state","approved").not("token_hash","is",null).gt("expires_at",iso)
          .order("created_at",{ascending:false}).limit(30);
        if(error)throw error;
        return json({sessions:data||[]});
      }
      if(action==="decide"){
        const id=String(payload.id||"");
        if(!config||!uuid(id))return json({error:"Solicitação inválida."},400);
        const approval=payload.approve===true;
        const {data,error}=await sb.from("quick_chart_pair_requests")
          .update({
            state:approval?"approved":"denied",
            decided_at:iso,
            expires_at:approval?new Date(now.getTime()+8*3600*1000).toISOString():iso
          })
          .eq("id",id).eq("owner_id",owner)
          .eq("authorization_version",config.authorization_version)
          .eq("state","pending").gt("expires_at",iso)
          .select("id").maybeSingle();
        if(error)throw error;
        return data?json({ok:true,approved:approval}):json({error:"Pedido expirado ou já decidido."},409);
      }
      if(action==="inbox"){
        const {data,error}=await sb.from("quick_chart_inbox").select("id,body,created_at").eq("owner_id",owner)
          .gte("created_at",new Date(now.getTime()-12*3600*1000).toISOString())
          .order("created_at",{ascending:false}).limit(40);
        if(error)throw error;
        return json({messages:data||[]});
      }
      if(action==="delete_message"){
        const id=String(payload.id||"");
        if(!uuid(id))return json({error:"Mensagem inválida."},400);
        const {error}=await sb.from("quick_chart_inbox").delete().eq("owner_id",owner).eq("id",id);
        if(error)throw error;
        return json({ok:true});
      }
    }

    if(action==="begin"){
      const username=normalize(payload.username),pin=String(payload.pin??"");
      if(!validUsername(username)||!validPIN(pin))return json({error:"Informe usuário e senha de 4 dígitos."},400);
      const {data:profile,error:profileError}=await sb.from("profiles").select("user_id").eq("username",username).maybeSingle();
      if(profileError)throw profileError;
      const owner=profile?.user_id;
      const accountKey=await sha("quick-pair-account|"+(owner||username));
      const ipKey=await sha("quick-pair-ip|"+(owner||username)+"|"+ip(req));
      const {data:accountAllowed,error:accountError}=await sb.rpc("quick_chart_pair_claim_attempt",{p_key_hash:accountKey});
      if(accountError)throw accountError;
      if(accountAllowed!==true)return json({error:"Cinco tentativas atingidas. Bloqueado por 30 minutos."},429);
      const {data:ipAllowed,error:ipError}=await sb.rpc("quick_chart_pair_claim_attempt",{p_key_hash:ipKey});
      if(ipError)throw ipError;
      if(ipAllowed!==true)return json({error:"Cinco tentativas atingidas. Bloqueado por 30 minutos."},429);
      const config=owner?await settings(owner):null;
      if(!config||!constantEqual(await pinHash(owner,pin,config.pin_salt),config.pin_hash))
        return json({error:"Usuário ou senha inválidos."},401);
      // Never release data on PIN alone: the owner must accept each new request.
      const challenge=random(24),requestId=crypto.randomUUID();
      const expires=new Date(now.getTime()+2*60*1000).toISOString();
      const {error}=await sb.from("quick_chart_pair_requests").insert({
        id:requestId,owner_id:owner,challenge_hash:await sha(challenge),
        state:"pending",token_hash:null,expires_at:expires,
        authorization_version:config.authorization_version,
        client_label:userAgentLabel(req)
      });
      if(error)throw error;
      await sb.from("external_quick_chart_attempts").delete().in("key_hash",[accountKey,ipKey]);
      return json({request_id:requestId,challenge,pending_expires_at:expires});
    }

    if(action==="poll"){
      const id=String(payload.request_id||""),challenge=String(payload.challenge||"");
      if(!uuid(id)||!/^[a-f0-9]{48}$/i.test(challenge))return json({error:"Solicitação inválida."},400);
      const {data:request,error}=await sb.from("quick_chart_pair_requests")
        .select("owner_id,challenge_hash,authorization_version,state,expires_at,token_hash")
        .eq("id",id).maybeSingle();
      if(error)throw error;
      if(!request||!constantEqual(await sha(challenge),request.challenge_hash))return json({error:"Solicitação inválida."},403);
      const config=await settings(request.owner_id);
      if(!config||config.authorization_version!==request.authorization_version||request.state==="denied"
        ||new Date(request.expires_at).getTime()<=now.getTime())return json({state:"expired"},410);
      if(request.state==="pending")return json({state:"pending"});
      if(request.state!=="approved"||request.token_hash)return json({state:"claimed"},409);
      const token=random(32);
      const {data,error:updateError}=await sb.from("quick_chart_pair_requests").update({token_hash:await sha(token)})
        .eq("id",id).eq("state","approved")
        .eq("authorization_version",config.authorization_version).is("token_hash",null).select("id").maybeSingle();
      if(updateError)throw updateError;
      return data?json({state:"approved",token,expires_at:request.expires_at}):json({state:"claimed"},409);
    }

    if(action==="receive"||action==="send"||action==="check_session"){
      const id=String(payload.request_id||""),token=String(payload.token||"");
      if(!uuid(id)||!/^[a-f0-9]{64}$/i.test(token))return json({error:"Sessão inválida."},401);
      const {data:session,error}=await sb.from("quick_chart_pair_requests")
        .select("owner_id,token_hash,state,expires_at,authorization_version").eq("id",id).maybeSingle();
      if(error)throw error;
      if(!session||session.state!=="approved"||!session.token_hash
        ||new Date(session.expires_at).getTime()<=now.getTime()
        ||!constantEqual(await sha(token),session.token_hash))return json({error:"Acesso expirado ou revogado."},401);
      const config=await settings(session.owner_id);
      if(!config||session.authorization_version!==config.authorization_version)
        return json({error:"Acesso revogado."},401);
      if(action==="check_session")return json({ok:true,expires_at:session.expires_at});
      if(action==="receive"){
        const {data:portal,error:e}=await sb.from("external_quick_chart_portals")
          .select("content,updated_at,content_expires_at").eq("owner_id",session.owner_id).maybeSingle();
        if(e)throw e;
        const expired=portal?.content_expires_at&&new Date(portal.content_expires_at).getTime()<=now.getTime();
        return json({text:expired?"":String(portal?.content?.note||""),updated_at:portal?.updated_at||null,expires_at:session.expires_at});
      }
      const content=String(payload.text||"").trim();
      if(!content||content.length>16000)return json({error:"Envie de 1 a 16.000 caracteres."},400);
      const {error:e}=await sb.from("quick_chart_inbox").insert({owner_id:session.owner_id,body:content});
      if(e)throw e;
      return json({ok:true,expires_at:session.expires_at});
    }
    return json({error:"Ação inválida."},400);
  }catch(e){
    if(e instanceof Error&&e.message==="auth_required")return json({error:"Entre na conta para administrar os acessos."},401);
    console.error("quick-chart-pair:",e instanceof Error?e.message:"internal");
    return json({error:"Não foi possível completar a operação."},500);
  }
});