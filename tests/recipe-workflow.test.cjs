const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const {JSDOM} = require("jsdom");
const {PGlite} = require("@electric-sql/pglite");
const root = path.resolve(__dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const tick = () => new Promise((resolve) => setTimeout(resolve, 0));

test("protocol cards load details on demand; selected medicine and orientations copy together", async () => {
  const html = `<!doctype html><body>
    <input id="protocol-search"><select id="protocol-category"></select><select id="protocol-batch"></select>
    <button id="protocol-page-prev"></button><button id="protocol-page-next"></button><span id="protocol-page-label"></span>
    <div id="protocol-list"></div><div id="protocol-empty"></div><span id="protocol-count"></span>
    <div id="protocol-modal" hidden><button data-close-protocol></button><div class="protocol-modal-body"><div id="protocol-detail"></div></div></div>
  </body>`;
  const dom = new JSDOM(html, {url:"https://example.test/trabalho/protocolos/",runScripts:"outside-only"});
  const {window:w} = dom;
  const copied = [], queries = [];
  Object.defineProperty(w.navigator, "clipboard", {value:{writeText:async text => copied.push(text)}});
  w.traubeSafeContentUrl = value => value;
  const protocol = {
    id:1,slug:"condition",title:"Condição exemplo",category:"Clínica Médica",setting:"Ambulatório",
    status:"verified",tags:[],summary:"Resumo",linked_recipe_slugs:["recipe"],exams:[{title:"Exames iniciais",items:["Hemograma","PCR"]}],
    linked_drug_terms:[],source_refs:[],treatment:[],follow_up:[]
  };
  const draft = {...protocol,id:2,slug:"draft",title:"Tema em revisão",status:"review_needed",tags:["rascunho-clinico"]};
  const recipe = {
    id:5,slug:"recipe",title:"Modelo exemplo",status:"verified",
    data:{copy_ready:true,routes:[{route:"Via oral",mode:"alternatives",items:[
      {drug:"Dipirona",quantity:"1 caixa",directions:"Usar conforme avaliação"},
      {drug:"Paracetamol",quantity:"1 caixa",directions:"Usar conforme avaliação"}
    ]}],orientations:["Retornar se houver piora."]}
  };
  w.supabaseClient = {from(table) {
    const query = {table,filters:{},select(columns){queries.push([table,columns]);return this;},
      eq(key,value){this.filters[key]=value;return this;},order(){return this;},
      range(){return Promise.resolve({data:[protocol,draft],count:2,error:null});},
      single(){return Promise.resolve({data:this.filters.id === "2" ? draft : protocol,error:null});},
      in(){return Promise.resolve({data:[recipe],error:null});},
      contains(){return this;},or(){return this;}};
    return query;
  }};
  w.eval(read("assets/js/trabalho-protocolos.js"));
  await tick();
  assert.equal(queries.length,1);
  assert.match(queries[0][1],/^id,slug,title/);
  assert.equal(w.document.querySelectorAll(".protocol-row").length,2);
  w.document.querySelector(".protocol-row").click();
  await tick(); await tick();
  assert.equal(w.document.getElementById("protocol-modal").hidden,false);
  assert.equal(queries.some(q => q[1] === "*"),true);
  assert.equal(w.document.querySelector("[data-copy-main-recipe]").disabled,true);
  const boxes = w.document.querySelectorAll("[data-recipe-med]");
  assert.equal(boxes.length,2);
  boxes[0].checked = true;
  boxes[0].dispatchEvent(new w.Event("change",{bubbles:true}));
  boxes[1].checked = true;
  boxes[1].dispatchEvent(new w.Event("change",{bubbles:true}));
  assert.equal(boxes[0].checked,false);
  assert.equal(w.document.querySelector("[data-copy-main-recipe]").disabled,false);
  w.document.querySelector("[data-copy-main-recipe]").click();
  await tick();
  assert.match(copied[0],/Paracetamol/);
  assert.doesNotMatch(copied[0],/Dipirona/);
  assert.match(copied[0],/Retornar se houver piora/);
  w.document.querySelector("[data-copy-exams]").click();
  await tick();
  assert.match(copied[1],/Hemograma/);
  assert.doesNotMatch(copied[1],/Paracetamol/);
  w.document.querySelector("button[data-close-protocol]").click();
  assert.equal(w.document.getElementById("protocol-modal").hidden,true);
  w.document.querySelectorAll(".protocol-row")[1].click();
  await tick();
  assert.equal(w.document.querySelector("[data-copy-main-recipe]"),null);
  assert.equal(w.document.querySelector("[data-copy-exams]"),null);
  dom.window.close();
});

test("private template editor saves, selects, copies exams, and deletes under authenticated user", async () => {
  const html = read("trabalho/meus-receituarios/index.html");
  const dom = new JSDOM(html,{url:"https://example.test/trabalho/meus-receituarios/",runScripts:"outside-only"});
  const {window:w} = dom;
  const clipboard = [], database = [];
  Object.defineProperty(w.navigator,"clipboard",{value:{writeText:async text => clipboard.push(text)}});
  w.confirm = () => true;
  w.supabaseClient = {
    auth:{getUser:async()=>({data:{user:{id:"user-a"}},error:null}),onAuthStateChange:()=>{}},
    from(){const query={action:"read",filters:{},payload:null,
      select(){return this;},eq(key,value){this.filters[key]=value;return this;},order(){return this;},
      range:async()=>({data:[...database],error:null}),
      insert(value){this.action="insert";this.payload=value;return this;},
      update(value){this.action="update";this.payload=value;return this;},
      delete(){this.action="delete";return this;},
      single:async function(){let row;
        if(this.action==="insert"){row={id:"model-1",...this.payload};database.push(row);}
        if(this.action==="update"){row=database.find(x=>x.id===this.filters.id);Object.assign(row,this.payload);}
        return {data:row,error:null};
      },
      then(resolve){if(this.action==="delete"){const index=database.findIndex(x=>x.id===this.filters.id);if(index>=0)database.splice(index,1);return Promise.resolve({error:null,count:index>=0?1:0}).then(resolve);}return Promise.resolve({data:database,error:null}).then(resolve);}
    };return query;}
  };
  w.eval(read("assets/js/meus-receituarios.js"));
  await tick(); await tick();
  assert.equal(w.document.getElementById("my-recipes-workspace").hidden,false);
  w.document.getElementById("my-recipe-title").value="Modelo de teste";
  const med = w.document.querySelector(".my-recipes-med");
  med.querySelector('[data-med="name"]').value="Dipirona";
  med.querySelector('[data-med="dose"]').value="500 mg";
  w.document.getElementById("my-recipe-exams").value="Hemograma";
  w.document.getElementById("my-recipe-treatment").value="Hidratação";
  w.document.getElementById("my-recipe-orientations").value="Retornar se piorar.";
  w.document.getElementById("my-recipes-form").dispatchEvent(new w.Event("submit",{bubbles:true,cancelable:true}));
  await tick(); await tick();
  assert.equal(database.length,1,w.document.getElementById("my-recipes-status").textContent);
  assert.equal(w.document.querySelectorAll("[data-template-id]").length,1);
  const checkbox=w.document.querySelector("[data-select-med]");
  checkbox.checked=true;checkbox.dispatchEvent(new w.Event("change",{bubbles:true}));
  w.document.querySelector("[data-copy-treatment]").click();
  await tick();
  assert.match(clipboard[0],/Dipirona/);
  assert.match(clipboard[0],/Hidratação/);
  assert.match(clipboard[0],/Retornar se piorar/);
  w.document.querySelector("[data-copy-exams]").click();
  await tick();
  assert.match(clipboard[1],/Hemograma/);
  w.document.getElementById("my-recipes-delete").click();
  await tick(); await tick();
  assert.equal(database.length,0);
  dom.window.close();
});

test("RLS migration restricts reads and writes to the template owner", async () => {
  const db = new PGlite();
  const owner = "00000000-0000-4000-8000-000000000001";
  const other = "00000000-0000-4000-8000-000000000002";
  try {
    await db.exec(`create role authenticated; create role anon; create schema auth;
      create table auth.users(id uuid primary key);
      create function auth.uid() returns uuid language sql stable as
        $$ select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid $$;
      insert into auth.users(id) values ('${owner}'),('${other}');`);
    await db.exec(read("supabase/migrations/20261031044405_user_recipe_templates_private.sql"));
    await db.exec(`set role authenticated; set request.jwt.claim.sub = '${owner}';`);
    const inserted = await db.query(`insert into public.user_recipe_templates(title,medications,orientations)
      values ('Teste','[{"name":"Exemplo"}]'::jsonb,'Orientação')
      returning id`);
    const id = inserted.rows[0].id;
    assert.equal((await db.query("select id from public.user_recipe_templates")).rows.length,1);
    await db.exec(`set request.jwt.claim.sub = '${other}';`);
    assert.equal((await db.query("select id from public.user_recipe_templates")).rows.length,0);
    assert.equal((await db.query("update public.user_recipe_templates set title='Indevido' returning id")).rows.length,0);
    assert.equal((await db.query("delete from public.user_recipe_templates returning id")).rows.length,0);
    await assert.rejects(db.query(`insert into public.user_recipe_templates(user_id,title,medications,orientations)
      values ('${owner}','Falsificado','[{"name":"Exemplo"}]'::jsonb,'Orientação')`));
    await db.exec(`set request.jwt.claim.sub = '${owner}';`);
    assert.equal((await db.query(`update public.user_recipe_templates set title='Editado' where id='${id}' returning id`)).rows.length,1);
    assert.equal((await db.query(`delete from public.user_recipe_templates where id='${id}' returning id`)).rows.length,1);
    await db.exec("reset role; set role anon;");
    await assert.rejects(db.query("select * from public.user_recipe_templates"),/permission denied/);
  } finally {
    await db.close();
  }
});
