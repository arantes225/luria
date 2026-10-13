const {test}=require("node:test"),assert=require("node:assert/strict");
const fs=require("node:fs"),path=require("node:path"),cp=require("node:child_process");
const {buildBook,imageQueueFor}=require("../scripts/build-apostilas-batch.cjs");
const root=path.join(__dirname,"..");
const read=file=>fs.readFileSync(path.join(root,file),"utf8");
const template=read("apostilas/vulvovaginites/index.html");
function book(){
  // Esta fixture é sintética: valida estrutura e extensão, sem simular conteúdo médico real.
  // Cada parágrafo tem identificação própria para não contradizer a proteção antirrepetição.
  const description="Este trecho técnico verifica criação de capítulos, índice, estilos compartilhados, navegação e referências. A fixture não representa conteúdo médico aprovado e não deve ser publicada como apostila de estudo.";
  const syntheticParagraph=(chapter,segment)=>"<p>Unidade técnica "+chapter+"."+segment+". "+description+" Marcador exclusivo deste segmento para testar a integridade editorial, a serialização do HTML e a organização das seções no gerador.</p>";
  return {
    slug:"tema-de-teste",
    title:"Tema de teste",
    area:"Clínica médica",
    materia:"Diagnóstico",
    sections:Array.from({length:7},(_,i)=>({
      id:"capitulo-"+(i+1),
      title:(i+1)+". Capítulo",
      body_html:Array.from({length:45},(_,j)=>syntheticParagraph(i+1,j+1)).join("")+
        (i===5?"<h3>Caso clínico comentado</h3><p>Questão comentada de teste.</p>":"")
    })),
    references:[
      {label:"Referência A",url:"https://example.com/a"},
      {label:"Referência B",url:"https://example.com/b"},
      {label:"Referência C",url:"https://example.com/c"},
      {label:"Referência D",url:"https://example.com/d"}
    ],
    images:[{
      candidate_key:"exame-clinico-01",target_section:"capitulo-2",
      src:"https://upload.wikimedia.org/wikipedia/commons/a/a0/test.png",
      source_url:"https://commons.wikimedia.org/wiki/File:Test.png",
      source_name:"Wikimedia Commons",source_license:"Exemplo de teste",
      alt:"Imagem apenas para testar o manifesto"
    }]
  };
}
test("Gerador de lote cria apostila extensa com navegação, referências e estilos compartilhados",()=>{
  const output=buildBook(template,book());
  assert.ok(output.characters>=60000);
  assert.ok(output.html.includes('<title>Tema de teste · LURIA</title>'));
  assert.ok(output.html.includes('href="/apostilas/tema-de-teste/"'));
  assert.ok(output.html.includes('href="#capitulo-7"'));
  assert.ok(output.html.includes("apostila-luria-book.css"));
  assert.equal((output.html.match(/<article class="book-main">/g)||[]).length,1);
  assert.equal((output.html.match(/<img\b/gi)||[]).length,0,
    "Apostilas novas não devem embutir figuras pendentes");
});
test("Imagens candidatas são exportadas apenas para revisão administrativa",()=>{
  const proposed=imageQueueFor(book());
  assert.equal(proposed.length,1);
  assert.equal(proposed[0].review_status,"pending");
  assert.equal(proposed[0].apostila_path,"/apostilas/tema-de-teste/");
  assert.equal(proposed[0].target_section,"capitulo-2");
  assert.equal(proposed[0].proposed_asset.src.includes("https://"),true);
});
test("Gerador rejeita texto superficial e figuras clínicas embutidas",()=>{
  const shallow=book();
  for (const section of shallow.sections) section.body_html="<p>Raso</p>";
  assert.throws(()=>buildBook(template,shallow),/conteúdo insuficiente/);
  const image=book();
  image.sections[0].body_html+='<img src="https://example.com/nao-aprovada.png">';
  assert.throws(()=>buildBook(template,image),/imagens vão ao Admin/);
});
test("Gerador impede repetição de um parágrafo longo entre capítulos",()=>{
  const duplicated=book();
  duplicated.sections[1].body_html=duplicated.sections[0].body_html;
  assert.throws(()=>buildBook(template,duplicated),/parágrafo didático longo repetido/);
});
test("Gerador exige o piso editorial de 60 mil caracteres",()=>{
  const incomplete=book();
  for(const section of incomplete.sections){
    section.body_html=section.body_html.slice(0,700);
  }
  assert.throws(()=>buildBook(template,incomplete),/conteúdo insuficiente.*60.000/);
});
test("Fila de imagens só aparece no Admin e suporta revisão em lote",()=>{
  const admin=read("assets/js/admin.js"),page=read("admin/index.html"),renderer=read("assets/js/apostila-tools.js");
  assert.match(admin,/function wireApostilaBatchReview\(/);
  assert.match(admin,/function importApostilaImageBatch\(/);
  assert.match(admin,/reviewSelectedApostilaImages/);
  assert.match(admin,/review_status: "pending"/);
  assert.match(page,/id="admin-apostila-image-filter"/);
  assert.match(page,/id="admin-apostila-images-import"/);
  assert.match(page,/id="admin-apostila-approve-selected"/);
  assert.doesNotMatch(renderer,/renderApproved\(\);\s*renderReviewPanel\(\);/,
    "A página da apostila não deve exibir decisões administrativas");
});
test("Auditoria editorial lê a biblioteca inteira por CLI",()=>{
  const output=cp.execFileSync(process.execPath,["scripts/audit-apostilas-batch.cjs","--json"],
    {cwd:root,encoding:"utf8",maxBuffer:1024*1024});
  const result=JSON.parse(output);
  assert.ok(result.totals.apostilas>=25);
  assert.ok(result.metrics.some(book=>book.apostila==="amenorreia"));
  assert.ok(result.metrics.every(book=>Array.isArray(book.warnings)));
});
