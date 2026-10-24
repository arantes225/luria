const {test}=require('node:test');
const assert=require('node:assert/strict');
const vm=require('node:vm');
const {source}=require('./fixtures/app-client.cjs');
const turn=()=>new Promise(resolve=>setImmediate(resolve));

function fixture() {
  const nodes={},listeners={},requests=[];
  const owner={ownerId:'A',ready:Promise.resolve()};
  const el=id=>nodes[id]??={textContent:'',disabled:false,addEventListener(k,fn){this[k]=fn}};
  const c={
    window:{
      supabaseClient:{auth:{getSession:async()=>({data:{session:{access_token:'FAKE_JWT_A'}}})}},
      LuriaLocalOwnerStore:owner,
      addEventListener:(event,cb)=>listeners[event]=cb,
      setInterval:()=>0
    },
    document:{getElementById:el,addEventListener:(event,cb)=>listeners[event]=cb},
    fetch:async(url,opts)=>{
      requests.push({url,opts});
      return {ok:true,json:async()=>({code:'004219',day:'2026-10-24'})};
    },
    navigator:{clipboard:{writeText:async()=>{}}},
    Intl,Date,Promise,JSON
  };
  vm.runInNewContext(source('assets/js/quick-chart-daily-code.js'),c);
  return {owner,el,listeners,requests};
}

test('Código do dia aparece somente após token autenticado e não usa código em URL',async()=>{
  const f=fixture();await turn();await turn();
  assert.equal(f.el('quick-chart-daily-code').textContent,'004219');
  assert.equal(f.requests.length,1);
  assert.equal(f.requests[0].opts.headers.Authorization,'Bearer FAKE_JWT_A');
  assert.equal(JSON.parse(f.requests[0].opts.body).action,'daily_code');
  assert.ok(!f.requests[0].url.includes('004219'));
  assert.equal(f.requests[0].opts.cache,'no-store');
});

test('Sair da conta limpa imediatamente o código mostrado',async()=>{
  const f=fixture();await turn();await turn();
  f.owner.ownerId=null;
  f.listeners['luria:owner-changed']();
  assert.equal(f.el('quick-chart-daily-code').textContent,'••••••');
  assert.equal(f.el('quick-chart-copy-daily-code').disabled,true);
});

test('Servidor nunca deve validar PIN fixo na nova versão',()=>{
  const server=source('supabase/functions/external-quick-chart/index.ts');
  assert.match(server,/payload\.action === "set_pin"[\s\S]{0,140}410/);
  assert.match(server,/quick_chart_claim_attempt/);
  assert.match(server,/action === "daily_code"/);
  assert.match(server,/action === "verify_code"/);
});
