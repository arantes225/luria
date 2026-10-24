/*
 * LURIA ECG benchmark Worker: only curated reference images, never patient data.
 * Disabled unless ECG_VALIDATION_ENABLED=true and admin authentication succeeds.
 */
const HEADERS = {"content-type":"application/json; charset=utf-8","cache-control":"no-store","x-content-type-options":"nosniff"};
const LEADS = new Set(["I","II","III","aVR","aVL","aVF","V1","V2","V3","V4","V5","V6","global"]);
const FEATURES = new Set(["ST_ELEVATION","ST_DEPRESSION","T_INVERSION","T_PEAKED","Q_PATHOLOGIC","RHYTHM","PR_ABNORMAL","QRS_ABNORMAL","QT_ABNORMAL","AXIS_ABNORMAL","OTHER"]);
const RATES = {"gpt-6-luna":[0.10,0.50],"gpt-6.1-sol":[2,10],"claude-haiku-5-5":[0.10,0.50]};
function reply(data,status,origin) {
  const headers = new Headers(HEADERS);
  headers.set("access-control-allow-origin",origin);
  headers.set("access-control-allow-headers","authorization,content-type");
  headers.set("access-control-allow-methods","POST,OPTIONS");
  headers.set("vary","Origin");
  return new Response(JSON.stringify(data),{status,headers});
}
const prompt = [
  "APENAS TESTE COM ECG DE REFERENCIA NAO ASSOCIADO A PACIENTE.",
  "Descreva possiveis alteracoes observaveis por derivacao. Nunca assuma diagnostico.",
  "Uma observacao deve ter lead e feature padronizada. Informe um achado por observacao.",
  "Categorias feature: ST_ELEVATION, ST_DEPRESSION, T_INVERSION, T_PEAKED, Q_PATHOLOGIC, RHYTHM, PR_ABNORMAL, QRS_ABNORMAL, QT_ABNORMAL, AXIS_ABNORMAL, OTHER.",
  "Se usar feature OTHER ou nao conseguir distinguir um padrao, descreva limitacoes e nao invente certeza.",
  "Nunca invente medidas de ST, PR, QRS, QTc ou eixo quando nao conseguir medi-las.",
  "Nao exclua isquemia aguda com base em exame normal. Nao recomende tratamento.",
  "Retorne SOMENTE JSON valido com o formato abaixo:",
  '{"quality":"adequate|unclear","observations":[{"lead":"II","feature":"ST_ELEVATION","finding":"texto","evidence":"texto","certainty":"low|moderate|high"}],"differential":["hipotese"],"limitations":["texto"],"urgent_patterns":["texto"]}'
].join("\n");
function normalized(raw) {
  const data=String(raw||""); const a=data.indexOf("{"),b=data.lastIndexOf("}");
  if(a<0||b<a)throw Error("invalid_model_json");
  const p=JSON.parse(data.slice(a,b+1));
  if(!p||!Array.isArray(p.observations))throw Error("invalid_model_schema");
  const t=s=>String(s||"").slice(0,500);
  const list=s=>Array.isArray(s)?s.slice(0,8).map(t):[];
  return {quality:p.quality==="adequate"?"adequate":"unclear",
    observations:p.observations.slice(0,32).filter(x=>LEADS.has(x?.lead)).map(x=>({
      lead:x.lead,feature:FEATURES.has(x.feature)?x.feature:"OTHER",finding:t(x.finding),evidence:t(x.evidence),
      certainty:["low","moderate","high"].includes(x.certainty)?x.certainty:"low"})),
    differential:list(p.differential),limitations:list(p.limitations),urgent_patterns:list(p.urgent_patterns)};
}
function cost(model,usage) {
  const p=RATES[model];
  return p&&Number.isFinite(usage.input)&&Number.isFinite(usage.output)?
    +((usage.input*p[0]+usage.output*p[1])/1000000).toFixed(7):null;
}
async function openai(env,model,url) {
  const response=await fetch("https://api.openai.com/v1/responses",{
    method:"POST",headers:{authorization:"Bearer "+env.OPENAI_API_KEY,"content-type":"application/json"},
    body:JSON.stringify({model,store:false,max_output_tokens:1400,input:[{
      role:"user",content:[{type:"input_text",text:prompt},{type:"input_image",image_url:url,detail:"high"}]}]}),
    signal:AbortSignal.timeout(40000)});
  if(!response.ok)throw Error("openai_unavailable");
  const j=await response.json();
  const output=(j.output||[]).flatMap(o=>o.content||[]).filter(c=>c.type==="output_text").map(c=>c.text).join("\n");
  const usage={input:Number(j.usage?.input_tokens),output:Number(j.usage?.output_tokens)};
  return {model,analysis:normalized(output),usage,costUsd:cost(model,usage)};
}
async function anthropic(env,data) {
  const model="claude-haiku-5-5";
  const response=await fetch("https://api.anthropic.com/v1/messages",{
    method:"POST",headers:{"x-api-key":env.ANTHROPIC_API_KEY,"anthropic-version":"2023-06-01","content-type":"application/json"},
    body:JSON.stringify({model,max_tokens:1400,messages:[{role:"user",content:[
      {type:"text",text:prompt},{type:"image",source:{type:"base64",media_type:"image/png",data}}]}]}),
    signal:AbortSignal.timeout(40000)});
  if(!response.ok)throw Error("anthropic_unavailable");
  const j=await response.json();
  const output=(j.content||[]).filter(x=>x.type==="text").map(x=>x.text).join("\n");
  const usage={input:Number(j.usage?.input_tokens),output:Number(j.usage?.output_tokens)};
  return {model,analysis:normalized(output),usage,costUsd:cost(model,usage)};
}
async function adminAuthenticated(env,auth) {
  if(!/^Bearer [A-Za-z0-9_.-]+$/i.test(auth||""))return false;
  const headers={authorization:auth,apikey:env.SUPABASE_ANON_KEY,"content-type":"application/json"};
  const u=await fetch(env.SUPABASE_URL+"/auth/v1/user",{headers,signal:AbortSignal.timeout(8000)});
  if(!u.ok)return false;
  const user=await u.json();
  if(!user.id||user.is_anonymous)return false;
  const r=await fetch(env.SUPABASE_URL+"/rest/v1/rpc/is_admin_session",{
    method:"POST",headers,body:"{}",signal:AbortSignal.timeout(8000)});
  return r.ok && (await r.json())===true;
}
function base64(bytes) {
  let s=""; for(let i=0;i<bytes.length;i+=8192)s+=String.fromCharCode(...bytes.subarray(i,i+8192));
  return btoa(s);
}
function compare(a,b) {
  // Match a specific feature IN a specific lead. This is a reconciliation aid, not a vote.
  const key=o=>o.lead+"|"+o.feature;
  const featuresA=new Set(a.analysis.observations.filter(o=>o.feature!=="OTHER").map(key));
  const featuresB=new Set(b.analysis.observations.filter(o=>o.feature!=="OTHER").map(key));
  const onlyA=[...featuresA].filter(x=>!featuresB.has(x));
  const onlyB=[...featuresB].filter(x=>!featuresA.has(x));
  const overlap=[...featuresA].filter(x=>featuresB.has(x));
  const urgentPatterns=[...a.analysis.urgent_patterns,...b.analysis.urgent_patterns].slice(0,12);
  return {onlyFirstModel:onlyA,onlySecondModel:onlyB,sharedReportedFeatures:overlap,
    unclassifiedFindings:[a,b].some(x=>x.analysis.observations.some(o=>o.feature==="OTHER")),
    urgentPatterns,qualityConcern:a.analysis.quality!=="adequate"||b.analysis.quality!=="adequate",
    physicianReviewRequired:true,modelAgreementDoesNotExcludeDisease:true};
}
function parsePositiveLimit(value) {
  const n=Number(value);
  return Number.isFinite(n)&&n>0?n:0;
}
async function reserveBenchmarkBudget(env,wantsEscalation) {
  // Fail-closed without a durable, shared counter. Reservations are intentionally
  // overestimated, not reconciled, to prevent repeat requests from draining credits.
  if(!env.ECG_BENCHMARK_QUOTA) return false;
  const usdLimit=parsePositiveLimit(env.ECG_BENCHMARK_DAILY_USD_LIMIT);
  const maxRequests=Math.floor(parsePositiveLimit(env.ECG_BENCHMARK_DAILY_MAX_REQUESTS));
  if(!usdLimit||!maxRequests)return false;
  const reserveUsd=wantsEscalation?0.20:0.03;
  const id=env.ECG_BENCHMARK_QUOTA.idFromName("ecg-benchmark-"+new Date().toISOString().slice(0,10));
  const quota=env.ECG_BENCHMARK_QUOTA.get(id);
  const result=await quota.fetch("https://ecg-budget.invalid/reserve",{
    method:"POST",headers:{"content-type":"application/json"},
    body:JSON.stringify({reserveUsd,usdLimit,maxRequests})
  });
  return result.ok;
}
/** Strongly consistent spending-reservation counter for benchmark ONLY. */
export class EcgBenchmarkQuota {
  constructor(state) { this.state=state; }
  async fetch(request) {
    if(request.method!=="POST"||new URL(request.url).pathname!=="/reserve")
      return new Response(null,{status:404});
    const {reserveUsd,usdLimit,maxRequests}=await request.json();
    if(![reserveUsd,usdLimit,maxRequests].every(x=>Number.isFinite(x)&&x>0))
      return new Response(null,{status:400});
    const allowed=this.state.storage.transactionSync(()=>{
      const used=Number(this.state.storage.kv.get("reserved_usd")||0);
      const requests=Number(this.state.storage.kv.get("requests")||0);
      if(requests>=maxRequests||used+reserveUsd>usdLimit+1e-9)return false;
      this.state.storage.kv.put("reserved_usd",used+reserveUsd);
      this.state.storage.kv.put("requests",requests+1);
      return true;
    });
    return new Response(null,{status:allowed?204:429});
  }
}

export default {
  async fetch(request,env) {
    const origin=request.headers.get("origin")||"";
    const allowed=new Set(String(env.ECG_ALLOWED_ORIGINS||"").split(",").map(x=>x.trim()).filter(Boolean));
    if(!allowed.has(origin))return new Response(null,{status:403,headers:HEADERS});
    if(request.method==="OPTIONS")return reply({ok:true},200,origin);
    if(request.method!=="POST")return reply({error:"method_not_allowed"},405,origin);
    if(env.ECG_VALIDATION_ENABLED!=="true")return reply({error:"validation_disabled"},503,origin);
    if(!env.ECG_BENCHMARK_R2||!env.OPENAI_API_KEY||!env.ANTHROPIC_API_KEY||!env.SUPABASE_URL||!env.SUPABASE_ANON_KEY)
      return reply({error:"configuration_incomplete"},503,origin);
    try {
      if(!(await adminAuthenticated(env,request.headers.get("authorization"))))
        return reply({error:"admin_required"},403,origin);
      if(Number(request.headers.get("content-length")||"0")>1024)return reply({error:"payload_too_large"},413,origin);
      const raw=await request.text();
      if(raw.length>1024)return reply({error:"payload_too_large"},413,origin);
      const body=JSON.parse(raw),id=String(body?.caseId||"");
      const caseIds=new Set(String(env.ECG_BENCHMARK_CASE_IDS||"").split(",").map(x=>x.trim()).filter(Boolean));
      if(!/^[a-z0-9-]{1,50}$/.test(id)||!caseIds.has(id))
        return reply({error:"benchmark_case_not_allowed"},400,origin);
      // Curated reference image only; no upload, arbitrary URL, arbitrary R2 key or patient identifier.
      const obj=await env.ECG_BENCHMARK_R2.get("ecg-benchmarks/"+id+".png");
      if(!obj)return reply({error:"benchmark_not_found"},404,origin);
      if(obj.size>3*1024*1024)return reply({error:"image_too_large"},413,origin);
      const bytes=new Uint8Array(await obj.arrayBuffer());
      // Reject bogus/too-small images before they become billable AI requests.
      const pngSignature=[137,80,78,71,13,10,26,10];
      if(bytes.length<24||!pngSignature.every((x,i)=>bytes[i]===x))
        return reply({error:"invalid_benchmark_png"},415,origin);
      const v=new DataView(bytes.buffer,bytes.byteOffset,bytes.byteLength);
      const width=v.getUint32(16),height=v.getUint32(20);
      if(width<900||height<450||width>10000||height>10000)
        return reply({error:"insufficient_image_resolution"},422,origin);
      const escalationAllowed=body.escalate===true && env.ECG_ENABLE_ESCALATION==="true";
      if(!(await reserveBenchmarkBudget(env,escalationAllowed)))
        return reply({error:"benchmark_budget_exhausted_or_unavailable"},429,origin);
      const image=base64(bytes);
      const results=await Promise.allSettled([
        openai(env,"gpt-6-luna","data:image/png;base64,"+image),anthropic(env,image)]);
      if(results.some(x=>x.status!=="fulfilled"))
        return reply({error:"independent_reading_incomplete"},502,origin);
      const readings=results.map(x=>x.value);
      let escalation=null;
      if(escalationAllowed)
        try {escalation=await openai(env,"gpt-6.1-sol","data:image/png;base64,"+image);}
        catch {escalation={error:"strong_model_unavailable"};}
      const all=[...readings,...(escalation?.model?[escalation]:[])];
      const total=all.reduce((sum,x)=>sum+(x.costUsd||0),0);
      return reply({evaluationOnly:true,notForClinicalUse:true,caseId:id,readings,
        comparison:compare(readings[0],readings[1]),escalation,
        cost:{usd:+total.toFixed(6),targetUsd:0.0101,targetExceeded:total>0.0101,
          allUsageKnown:all.every(x=>x.costUsd!==null),pricingDate:"2026-10-24"},
        limitations:["Modelos nao validados clinicamente.","Concordancia nao exclui IAM ou outras emergencias.",
          "Nao utilizar exames nem informacoes de pacientes reais."]},200,origin);
    } catch {return reply({error:"benchmark_processing_failed"},500,origin);}
  }
};