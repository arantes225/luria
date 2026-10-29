const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const {JSDOM}=require("jsdom");
function start(){
  const html=fs.readFileSync("vocacao/index.html","utf8");
  const dom=new JSDOM(html,{url:"https://luria.test/vocacao/",runScripts:"outside-only"});
  const {window}=dom;
  window.HTMLElement.prototype.scrollIntoView=function(){};
  for(const file of ["assets/js/vocacao-data.js","assets/js/vocacao-engine.js","assets/js/vocacao.js"])
    window.eval(fs.readFileSync(file,"utf8"));
  return {dom,window,$:id=>window.document.getElementById(id)};
}
test("avaliação profunda: 29 respostas, segunda preferência e relatório específico",()=>{
  const {dom,window,$}=start();
  assert.equal($("voc-intro").hidden,false);
  $("voc-start").click();
  assert.equal($("voc-quiz").hidden,false);
  for(let i=0;i<29;i++){
    assert.equal($("voc-options").querySelectorAll(".voc-option").length,4);
    assert.equal($("voc-next").disabled,true,"resposta é necessária");
    if(i===3){
      $("voc-none").click();
      assert.equal($("voc-next").disabled,false);
    }else{
      if(i===0) $("voc-unfamiliar").click();
      $("voc-options").querySelectorAll(".voc-option")[i%4].click();
      if(i===0){
        const others=$("voc-options").querySelectorAll(".voc-secondary");
        others[1].click();
        assert.equal($("voc-options").querySelectorAll(".voc-secondary")[1].getAttribute("aria-pressed"),"true");
        assert.equal($("voc-unfamiliar").checked,true,"o aluno pode sinalizar experiência antes de responder");
      }
      assert.equal($("voc-next").disabled,false);
    }
    $("voc-next").click();
  }
  assert.equal($("voc-results").hidden,false);
  assert.equal(window.document.querySelectorAll(".voc-match").length,3);
  assert.match($("voc-results").textContent,/Até três residências médicas/);
  assert.match($("voc-results").textContent,/Ingresso na residência/);
  assert.doesNotMatch($("voc-results").textContent,/Possíveis áreas de atuação/);
  for(const phrase of ["Seu jeito de raciocinar","Sua relação com procedimentos","Pontos de atenção","Como diferenciar","respondeu","hipótese"]) {
    if(phrase==="respondeu")continue;
    assert.ok($("voc-results").textContent.includes(phrase),phrase);
  }
  assert.ok(window.document.querySelectorAll(".voc-evidence li").length>0,"relatório contém escolhas concretas");
  $("voc-review").click();
  assert.equal($("voc-quiz").hidden,false);
  assert.equal($("voc-next").disabled,false,"deve preservar resposta ao revisar");
  dom.window.close();
});
test("retomar sessão e refazer com escolhas limpas",()=>{
  const {dom,window,$}=start();
  $("voc-start").click();
  $("voc-options").querySelector(".voc-option").click();
  assert.equal($("voc-next").disabled,false);
  const saved=window.sessionStorage.getItem("luria.vocacao.v3.session");
  assert.ok(saved);
  dom.window.close();
  const newRun=start();
  newRun.window.sessionStorage.setItem("luria.vocacao.v3.session",saved);
  // Código é avaliado de novo após a sessão restaurada.
  newRun.window.eval(fs.readFileSync("assets/js/vocacao.js","utf8"));
  assert.equal(newRun.$("voc-quiz").hidden,false);
  assert.equal(newRun.$("voc-next").disabled,false);
  newRun.dom.window.close();
});
test("catálogo pesquisável apresenta apenas residências convencionais",()=>{
  const {dom,window,$}=start();
  $("voc-search").dispatchEvent(new window.Event("input",{bubbles:true}));
  assert.equal(window.document.querySelectorAll(".voc-catalog-item").length,46);
  $("voc-search").value="cardiologia";
  $("voc-search").dispatchEvent(new window.Event("input",{bubbles:true}));
  assert.equal(window.document.querySelectorAll(".voc-catalog-item").length,1);
  assert.match(window.document.querySelector(".voc-catalog-item").textContent,/Residência médica/);
  $("voc-search").value="homeopatia";
  $("voc-search").dispatchEvent(new window.Event("input",{bubbles:true}));
  assert.equal(window.document.querySelectorAll(".voc-catalog-item").length,0);
  $("voc-search").value="medicina legal";
  $("voc-search").dispatchEvent(new window.Event("input",{bubbles:true}));
  assert.equal(window.document.querySelectorAll(".voc-catalog-item").length,0);
  dom.window.close();
});
