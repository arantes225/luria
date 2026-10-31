const {test}=require("node:test");
const assert=require("node:assert/strict");
const vm=require("node:vm");
const {source}=require("./fixtures/app-client.cjs");
const flush=()=>new Promise(resolve=>setImmediate(resolve));

function element(id){
  const callbacks={};
  return {id,value:"",textContent:"",disabled:false,hidden:false,children:[],
    addEventListener(k,fn){callbacks[k]=fn;},
    async click(){return callbacks.click?.();},
    append(...children){this.children.push(...children);},
    replaceChildren(...children){this.children=children;},
    setAttribute(k,v){this[k]=v;},focus(){},select(){}
  };
}

test("externo exige 4 dígitos e aprovação antes de Enviar/Receber",async()=>{
  const cache={};const get=id=>cache[id]??=element(id);
  get("external-username").value="teste123";get("external-pin").value="0042";
  get("external-send-text").value="Texto do computador";
  const actions=[];
  const ctx={document:{getElementById:get,addEventListener(){},hidden:false},
    location:{hash:""},URLSearchParams,Date,JSON,Promise,
    navigator:{clipboard:{writeText:async()=>{}}},
    setTimeout:()=>1,clearTimeout(){},
    fetch:async(_url,opt)=>{
      const body=JSON.parse(opt.body);actions.push(body);
      const data=body.action==="begin"?{request_id:"aa000000-0000-4000-8000-000000000001",challenge:"a".repeat(48),
          pending_expires_at:new Date(Date.now()+120000).toISOString()}:
        body.action==="poll"?{state:"approved",token:"b".repeat(64),expires_at:new Date(Date.now()+8*3600000).toISOString()}:
        body.action==="receive"?{text:"Texto do celular"}:{ok:true};
      return {ok:true,json:async()=>data};
    }
  };
  vm.runInNewContext(source("assets/js/quick-chart-external-pair.js"),ctx);
  await get("external-enter").click();
  for(let n=0;n<6;n++)await flush();
  assert.equal(actions[0].action,"begin");assert.equal(actions[0].pin,"0042");
  assert.equal(actions[1].action,"poll");
  assert.equal(get("external-editor").hidden,false);
  assert.equal(get("external-received-text").value,"Texto do celular");
  await get("external-tab-send").click();
  await get("external-send").click();
  assert.equal(actions.find(x=>x.action==="send").text,"Texto do computador");
  assert.ok(!actions.some(x=>x.action==="save"));
});

test("PIN fixo não é emitido nem renovado ao abrir ou focar o app",async()=>{
  const cache={},get=id=>cache[id]??=element(id),listeners={},actions=[];
  const owner={ownerId:"ownerA",ready:Promise.resolve()};
  const ctx={
    window:{TraubeLocalOwnerStore:owner,
      supabaseClient:{auth:{getSession:async()=>({data:{session:{access_token:"jwt"}}})}},
      addEventListener(k,cb){listeners[k]=cb},setInterval:()=>1,clearInterval() {},confirm:()=>true
    },
    document:{getElementById:get,hidden:false,addEventListener(k,cb){listeners[k]=cb},
      createElement:k=>element(k)},
    navigator:{clipboard:{writeText:async()=>{}}},Promise,JSON,Date,
    fetch:async(_url,options)=>{
      const body=JSON.parse(options.body);actions.push(body);
      const data=body.action==="status"?{configured:true}:body.action==="pending"?{requests:[]}:
        body.action==="sessions"?{sessions:[]}:body.action==="inbox"?{messages:[]}:{ok:true};
      return {ok:true,json:async()=>data};
    }
  };
  vm.runInNewContext(source("assets/js/quick-chart-fixed-access.js"),ctx);
  for(let i=0;i<6;i++)await flush();
  assert.equal(get("quick-chart-fixed-state").textContent.includes("configurada"),true);
  listeners.visibilitychange?.();
  for(let i=0;i<3;i++)await flush();
  assert.ok(!actions.some(a=>a.action==="issue"||a.action==="daily_code"||a.action==="set_pin"),
    "abrir/focar a aba não deve trocar nem gerar senha");
  await get("quick-chart-revoke-all").click();
  for(let i=0;i<3;i++)await flush();
  assert.equal(actions.filter(x=>x.action==="revoke_all").length,1);
});

test("API usa hash com salt, exige aprovação por PC e revogação invalidante",()=>{
  const edge=source("supabase/functions/external-quick-chart-pair/index.ts");
  const migration=source("supabase/migrations/20261025144500_quick_chart_fixed_pin_4_revoke_all.sql");
  const mobile=source("trabalho/prontuario-rapido/index.html");
  const desktop=source("trabalho/prontuario/index.html");
  assert.match(edge,/validPIN=.*\\d\{4\}/);
  assert.match(edge,/PBKDF2/);
  assert.match(edge,/iterations:120000/);
  assert.match(edge,/action==="revoke_all"/);
  assert.match(edge,/action==="decide"/);
  assert.match(edge,/authorization_version/);
  assert.match(edge,/action==="check_session"/);
  assert.match(edge,/session.state!=="approved"/);
  assert.match(migration,/quick_chart_revoke_all_access/);
  assert.match(migration,/DELETE FROM public.quick_chart_pair_requests/);
  assert.match(migration,/REVOKE ALL/);
  assert.match(mobile,/id="quick-chart-revoke-all"/);
  assert.match(mobile,/id="quick-chart-save-fixed-pin"/);
  assert.match(mobile,/id="quick-chart-active-sessions"/);
  assert.match(mobile,/quick-chart-ocr\.js/);
  assert.match(desktop,/role="tablist"/);
  assert.match(desktop,/maxlength="4" name="luria-access-code"/);
});
