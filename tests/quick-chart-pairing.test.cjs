const {test}=require("node:test");
const assert=require("node:assert/strict");
const vm=require("node:vm");
const {source}=require("./fixtures/app-client.cjs");
const flush=()=>new Promise(resolve=>setImmediate(resolve));

function fakeNode(id){
  const callbacks={};
  return {id,value:"",hidden:false,textContent:"",disabled:false,innerText:"",
    dataset:{},addEventListener(name,fn){callbacks[name]=fn},
    click(){return callbacks.click?.()},change(){return callbacks.change?.()},
    focus(){},select(){},setAttribute(name,value){this[name]=value},
    replaceChildren(...children){this.children=children},
    append(...nodes){this.children=(this.children||[]).concat(nodes)}
  };
}
function fixtureExternal(){
  const nodes={};
  const el=id=>nodes[id]??=fakeNode(id);
  el("external-username").value="fixture-user";
  el("external-pin").value="09";
  el("external-send-text").value="Mensagem do computador";
  let approvals=0;
  const actions=[];
  const context={
    document:{getElementById:el,addEventListener(){},hidden:false},
    location:{hash:""},URLSearchParams,Date,JSON,Promise,
    navigator:{clipboard:{writeText:async()=>{}}},
    setTimeout:()=>1,clearTimeout(){},
    fetch:async(_url,options)=>{
      const body=JSON.parse(options.body);actions.push(body);
      const data=body.action==="begin"?{request_id:"aa000000-0000-0000-0000-000000000001",challenge:"a".repeat(48),pending_expires_at:new Date(Date.now()+2*60000).toISOString()}:
        body.action==="poll"?{state:"approved",token:"b".repeat(64),expires_at:new Date(Date.now()+30*60000).toISOString()}:
        body.action==="receive"?{text:"Texto do celular",updated_at:null}:
        body.action==="send"?{ok:true}:{};
      return {ok:true,json:async()=>data};
    }
  };
  vm.runInNewContext(source("assets/js/quick-chart-external-pair.js"),context);
  return {el,actions};
}

test("acesso externo usa PIN de dois dígitos, exige aprovação e separa abas",async()=>{
  const {el,actions}=fixtureExternal();
  await el("external-enter").click();
  for(let i=0;i<6;i++)await flush();
  assert.equal(actions[0].action,"begin");
  assert.equal(actions[0].pin,"09");
  assert.equal(actions[1].action,"poll");
  assert.equal(el("external-editor").hidden,false);
  assert.equal(el("external-send-panel").hidden,true);
  assert.equal(el("external-received-text").value,"Texto do celular");
  await el("external-tab-send").click();
  await el("external-send").click();
  for(let i=0;i<3;i++)await flush();
  const send=actions.find(a=>a.action==="send");
  assert.equal(send.text,"Mensagem do computador");
  assert.equal(el("external-send-text").value,"");
  assert.ok(!actions.some(a=>a.action==="save"),"Não sobrescreve caderno do celular");
});

test("UI e banco não liberam conteúdo apenas pelo PIN",()=>{
  const edge=source("supabase/functions/external-quick-chart-pair/index.ts");
  const html=source("trabalho/prontuario/index.html");
  const migration=source("supabase/migrations/20261024231000_quick_chart_pairing_2digit_inbox.sql");
  assert.match(edge,/action==="begin"/);
  assert.match(edge,/action==="poll"/);
  assert.match(edge,/action==="decide"/);
  assert.match(edge,/state!=="approved"/);
  assert.match(edge,/token_hash/);
  assert.match(edge,/now\+30\*60\*1000/);
  assert.match(edge,/quick_chart_pair_claim_attempt/);
  assert.match(migration,/v_count<=5/);
  assert.match(migration,/interval '30 minutes'/);
  assert.match(migration,/enable row level security/g);
  assert.match(html,/role="tablist"/);
  assert.match(html,/id="external-send-panel"/);
  assert.match(html,/id="external-receive-panel"/);
  assert.match(html,/maxlength="2" name="luria-access-code"/);
});

test("PIN é emitido apenas na abertura da Cola Rápida, não por refresh",async()=>{
  const nodes={},listeners={},requests=[];
  const el=id=>nodes[id]??=fakeNode(id);
  const owner={ownerId:"TEST_A",ready:Promise.resolve()};
  const now=Date.now();
  const context={
    window:{LuriaLocalOwnerStore:owner,supabaseClient:{auth:{getSession:async()=>({data:{session:{access_token:"TOKEN"}}})}},
      addEventListener(name,fn){listeners[name]=fn},setInterval:()=>1},
    document:{getElementById:el,hidden:false,addEventListener(name,fn){listeners[name]=fn},
      createElement:id=>fakeNode(id)},
    fetch:async(_url,opt)=>{
      const body=JSON.parse(opt.body);requests.push(body);
      return {ok:true,json:async()=>body.action==="issue"?{pin:"04",expires_at:new Date(now+1800000).toISOString()}:
        body.action==="pending"?{requests:[]}:{messages:[]}};
    },
    navigator:{clipboard:{writeText:async()=>{}}},
    Promise,Date,JSON
  };
  vm.runInNewContext(source("assets/js/quick-chart-session-pin.js"),context);
  for(let i=0;i<8;i++)await flush();
  assert.equal(requests.filter(r=>r.action==="issue").length,1);
  assert.equal(el("quick-chart-daily-code").textContent,"04");
  listeners.visibilitychange();
  for(let i=0;i<5;i++)await flush();
  assert.equal(requests.filter(r=>r.action==="issue").length,1);
});
