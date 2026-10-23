const {test, before, after, beforeEach} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const {stripTypeScriptTypes} = require('node:module');
const {PGlite} = require('@electric-sql/pglite');
const root = path.resolve(__dirname, '..');
let db;
const user = '00000000-0000-4000-8000-000000000001';
const id = (n) => `00000000-0000-4000-8000-${String(n).padStart(12,'0')}`;
const hash = 'a'.repeat(64);
async function rpc(name, args) {
  const names = Object.keys(args);
  const values = Object.values(args);
  const result = await db.query(`select public.${name}(${names.map((key,i)=>`${key} => $${i+1}`).join(',')}) as value`, values);
  return {data:result.rows[0].value,error:null};
}
before(async()=>{
  db = new PGlite();
  await db.exec(`create role anon; create role authenticated; create role service_role;
    create schema auth; create schema private; create table auth.users(id uuid primary key);
    create function auth.uid() returns uuid language sql as $$ select null::uuid $$;
    insert into auth.users values ('${user}');`);
  await db.exec(fs.readFileSync(path.join(root,'db/professor_alex_daily_quota.sql'),'utf8'));
  // Admin functions are unrelated and depend on the remote administrative schema.
  await db.exec(fs.readFileSync(path.join(root,'supabase/migrations/20261021102000_professor_alex_token_budget.sql'),'utf8').split('create or replace function private.professor_alex_admin')[0]);
  await db.exec(fs.readFileSync(path.join(root,'supabase/migrations/20261021102500_professor_alex_token_budget_wrappers.sql'),'utf8'));
  await db.exec(fs.readFileSync(path.join(root,'supabase/migrations/20261023120000_alex_atomic_budget.sql'),'utf8'));
});
after(async()=>db?.close());
beforeEach(async()=>{await db.exec('truncate private.professor_alex_reservations, public.professor_alex_daily_usage; update private.professor_alex_token_settings set daily_token_budget=1000');});
const reserve = (n=1,h=hash)=>rpc('reserve_alex_budget',{p_user_id:user,p_request_id:id(n),p_request_hash:h,p_channel:'chat'});
const settle = (n,input,output,total)=>rpc('settle_alex_budget',{p_user_id:user,p_request_id:id(n),p_input:input,p_output:output,p_total:total});
const usage = async()=>(await rpc('professor_alex_token_usage',{p_user_id:user})).data;

test('SQL: simultaneous reservations authorize only one operation; settlement is idempotent',async()=>{
  const results = await Promise.all([reserve(1),reserve(2)]);
  assert.equal(results.filter(x=>x.data.ok).length,1);
  assert.equal((await usage()).remaining_tokens,0);
  const winner=results[0].data.ok?1:2;
  await settle(winner,100,100,200); await settle(winner,100,100,200);
  assert.equal((await usage()).used_tokens,200);
  assert.equal((await reserve(winner)).data.error,'duplicate_request');
  assert.equal((await reserve(winner,'b'.repeat(64))).data.error,'request_conflict');
});
test('SQL: release before dispatch, ambiguity, stale recovery and above-reservation accounting',async()=>{
  await reserve(); await settle(1,0,0,0); assert.equal((await usage()).remaining_tokens,1000);
  await reserve(2); await settle(2,null,null,null); assert.equal((await reserve(3)).data.error,'token_budget_reached');
  await db.exec('truncate private.professor_alex_reservations, public.professor_alex_daily_usage');
  await reserve(4); await db.exec("update private.professor_alex_reservations set created_at=now()-interval '20 minutes'");
  assert.equal((await reserve(5)).data.error,'token_budget_reached');
  assert.equal((await db.query('select status from private.professor_alex_reservations')).rows[0].status,'uncertain');
  await db.exec('truncate private.professor_alex_reservations, public.professor_alex_daily_usage');
  await reserve(6); await settle(6,600,600,1200);
  assert.equal((await usage()).used_tokens,1200); assert.equal((await usage()).remaining_tokens,0);
});
test('SQL: public callers cannot execute reservation or settlement',async()=>{
  for(const role of ['anon','authenticated']) {
    await db.exec(`set role ${role}`);
    try { await assert.rejects(()=>reserve(),/permission denied/); } finally { await db.exec('reset role'); }
  }
});

function edge({failure, count=100, total=120, accountingFailure=false, paidGate, onPaid}={}) {
  let handler, paid=0, counted=0;
  const code=stripTypeScriptTypes(fs.readFileSync(path.join(root,'supabase/functions/professor-alex-gemini/index.ts'),'utf8').replace(/^import .*createClient.*;\r?\n/m,'').replace(/^export /gm,''));
  const context={Request,Response,Headers,AbortSignal,DOMException,TextEncoder,crypto,console:{warn(){},error(){}},
    Deno:{env:{get:(key)=>({SUPABASE_URL:'https://db.invalid',SUPABASE_ANON_KEY:'anon',SUPABASE_SERVICE_ROLE_KEY:'service',CLIENT_GEMINI:'fake-key'})[key]},serve:fn=>handler=fn},
    createClient:()=>({auth:{getUser:async()=>({data:{user:{id:user}}})},rpc:async(name,args)=>{
      if(accountingFailure&&name==='settle_alex_budget') return {error:true};
      return rpc(name,args);
    }}),
    fetch:async(url,options)=>{
      if(url.endsWith(':countTokens')){counted++;if(failure==='count')throw Error('count failed');return Response.json({totalTokens:count});}
      paid++;
      onPaid?.();
      if (paidGate) await paidGate;
      assert.equal((await usage()).remaining_tokens,0,'SQL reservation precedes paid call');
      assert.equal(JSON.parse(options.body).generationConfig.maxOutputTokens,320);
      assert.match(url,/gemini-3\.5-flash-lite:generateContent$/,'client cannot select model');
      if(failure==='timeout') throw new DOMException('timeout','TimeoutError');
      if(failure==='provider') return Response.json({error:{message:'failure'}},{status:500});
      return Response.json({candidates:[{content:{parts:[{text:'Resposta'}]}}],usageMetadata:{promptTokenCount:100,candidatesTokenCount:20,totalTokenCount:total}});
    }};
  vm.runInNewContext(code,context);
  const call=(n=1)=>handler(new Request('https://edge.invalid',{method:'POST',headers:{authorization:'Bearer fake'},body:JSON.stringify({request_id:id(n),prompt:'pergunta',model:'expensive/arbitrary'})}));
  return {call,stats:()=>({paid,counted})};
}
test('Edge + real SQL: simultaneous requests and duplicates cannot dispatch twice',async()=>{
  let release, dispatched;
  const paidGate = new Promise(resolve=>release=resolve);
  const started = new Promise(resolve=>dispatched=resolve);
  const f=edge({paidGate,onPaid:dispatched}); const first=f.call(); await started;
  const others=await Promise.all(Array.from({length:9},(_,i)=>f.call(i+2))); release(); const replies=[await first,...others];
  assert.deepEqual(replies.map(x=>x.status).sort(),[200,...Array(9).fill(409)]);
  assert.equal(f.stats().paid,1); assert.equal((await usage()).used_tokens,120);
  assert.equal((await f.call()).status,409); assert.equal(f.stats().paid,1);
});
for(const failure of ['timeout','provider']) test(`Edge + SQL: ${failure} never refunds uncertain paid generation`,async()=>{
  const f=edge({failure}); assert.equal((await f.call()).status,502);
  assert.equal((await f.call(2)).status,429); assert.equal(f.stats().paid,1);
});
test('Edge + SQL: oversized input never reaches generation; accounting failure keeps predebit',async()=>{
  const over=edge({count:900}); assert.equal((await over.call()).status,429);assert.equal(over.stats().paid,0);assert.equal((await usage()).remaining_tokens,1000);
  const failed=edge({accountingFailure:true});const result=await (await failed.call(2)).json();assert.equal(result.accounting_pending,true);
  assert.equal((await usage()).remaining_tokens,0);assert.equal((await failed.call(3)).status,409);assert.equal(failed.stats().paid,1);
});
test('Edge + SQL: counting failure releases unused reserve, total above estimate is recorded',async()=>{
  const countFailed=edge({failure:'count'});assert.equal((await countFailed.call()).status,503);assert.equal(countFailed.stats().paid,0);assert.equal((await usage()).remaining_tokens,1000);
  const higher=edge({total:500});assert.equal((await higher.call(2)).status,200);assert.equal((await usage()).used_tokens,500);
});
test('SQL: voice reservations capture the configured weighting',async()=>{
  const reserved=await rpc('reserve_alex_budget',{p_user_id:user,p_request_id:id(1),p_request_hash:hash,p_channel:'voice'});
  assert.equal(reserved.data.multiplier,3);await settle(1,100,20,120);
  assert.equal((await usage()).used_tokens,360);assert.equal((await usage()).voice_tokens,120);
});
