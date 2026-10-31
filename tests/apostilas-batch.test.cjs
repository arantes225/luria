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
  assert.ok(output.html.includes('<title>Tema de teste · TRAUBE</title>'));
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

test("Fallback recupera URL canonica do CDC antes de mostrar imagem indisponivel",()=>{
  const {JSDOM}=require("jsdom");
  const dom=new JSDOM('<figure><img data-apostila-image-fallback="hidden-sibling" src="https://wwwn.cdc.gov/phil///PHIL_Images/2933/2933_lores.jpg"><p hidden role="note">Fonte externa</p></figure>',{url:"https://resibulando.online/apostilas/vulvovaginites/",runScripts:"outside-only"});
  try {
    dom.window.eval(read("assets/js/apostila-image-fallback.js"));
    const img=dom.window.document.querySelector("img");
    img.dispatchEvent(new dom.window.Event("error"));
    assert.equal(img.dataset.apostilaImageRetryDone,"yes");
    assert.match(img.src,/\/phil\/PHIL_Images\/2933\/2933_lores\.jpg$/);
    assert.equal(img.nextElementSibling.hidden,true);
    img.dispatchEvent(new dom.window.Event("error"));
    assert.equal(img.hidden,true);
    assert.equal(img.nextElementSibling.hidden,false);
  } finally {dom.window.close();}
});
test("Fallback tenta a rota alternativa do mesmo arquivo no Wikimedia Commons",()=>{
  const {JSDOM}=require("jsdom");
  const dom=new JSDOM('<figure><img data-apostila-image-fallback="approved-source" data-apostila-image-source-url="https://commons.wikimedia.org/wiki/File:CTG_Output.jpg" src="https://commons.wikimedia.org/wiki/Special:Redirect/file/CTG_Output.jpg"></figure>',{url:"https://resibulando.online/apostilas/amenorreia/",runScripts:"outside-only"});
  try {
    dom.window.eval(read("assets/js/apostila-image-fallback.js"));
    const img=dom.window.document.querySelector("img");
    img.dispatchEvent(new dom.window.Event("error"));
    assert.match(img.src,/Special:FilePath\/CTG_Output\.jpg$/);
    assert.equal(img.hidden,false);
    img.dispatchEvent(new dom.window.Event("error"));
    assert.equal(img.hidden,true);
    const link=dom.window.document.querySelector("a.image-source-retry");
    assert.ok(link);
    assert.equal(link.getAttribute("rel"),"noopener noreferrer");
  } finally {dom.window.close();}
});

test("Fallback de exame clínico usa segunda resolução do mesmo arquivo antes do aviso",()=>{
  const {JSDOM}=require("jsdom");
  const dom=new JSDOM('<figure><img data-apostila-image-fallback="display-sibling" src="https://media.springernature.com/lw1200/test.png" data-apostila-fallback-url="https://media.springernature.com/lw685/test.png"><p hidden>Prévia indisponível</p></figure>',{url:"https://resibulando.online/apostilas/amenorreia/",runScripts:"outside-only"});
  try {
    dom.window.eval(read("assets/js/apostila-image-fallback.js"));
    const img=dom.window.document.querySelector("img");
    img.dispatchEvent(new dom.window.Event("error"));
    assert.equal(img.src,"https://media.springernature.com/lw685/test.png");
    assert.equal(img.nextElementSibling.hidden,true);
    img.dispatchEvent(new dom.window.Event("error"));
    assert.equal(img.style.display,"none");
    assert.equal(img.nextElementSibling.hidden,false);
  } finally {dom.window.close();}
});


test("Fallback do CDC tenta URL histórica quando a rota canônica falha",()=>{
  const {JSDOM}=require("jsdom");
  const dom=new JSDOM('<figure><img data-apostila-image-fallback="hidden-sibling" src="https://wwwn.cdc.gov/phil/PHIL_Images/16824/16824_lores.jpg"><p hidden role="note">Fonte CDC</p></figure>',{url:"https://resibulando.online/apostilas/vulvovaginites/",runScripts:"outside-only"});
  try {
    dom.window.eval(read("assets/js/apostila-image-fallback.js"));
    const img=dom.window.document.querySelector("img");
    img.dispatchEvent(new dom.window.Event("error"));
    assert.equal(img.src,"https://wwwn.cdc.gov/phil///PHIL_Images/16824/16824_lores.jpg");
    assert.equal(img.dataset.apostilaImageRetryDone,"yes");
    img.dispatchEvent(new dom.window.Event("error"));
    assert.equal(img.hidden,true);
    assert.equal(img.nextElementSibling.hidden,false);
  } finally {dom.window.close();}
});


test("Auditoria de imagens: src permitido na CSP e assets locais existentes em todas as apostilas",()=>{
  const dir=path.join(root,"apostilas");
  const folders=fs.readdirSync(dir,{withFileTypes:true}).filter(x=>x.isDirectory());
  let pages=0,images=0;
  for(const folder of folders){
    const rel="apostilas/"+folder.name+"/index.html";
    if(!fs.existsSync(path.join(root,rel)))continue;
    pages++;
    const html=read(rel);
    const csp=html.match(/<meta\s+http-equiv="Content-Security-Policy"\s+content="([^"]+)"/i)?.[1]||"";
    const imageDirective=csp.match(/(?:^|;)\s*img-src\s+([^;]+)/i)?.[1]||"";
    assert.ok(imageDirective,rel+": política de imagens ausente");
    const imgTags=[...html.matchAll(/<img\b[^>]*>/gi)].map(m=>m[0]);
    for(const tag of imgTags){
      const src=tag.match(/\bsrc=(["'])(.*?)\1/i)?.[2];
      if(!src)continue;
      images++;
      if(src.startsWith("http:"))assert.fail(rel+": imagem via HTTP sem TLS: "+src);
      if(src.startsWith("https://")){
        const origin=src.match(/^https:\/\/[^/]+/)?.[0];
        assert.ok(origin && imageDirective.split(/\s+/).includes(origin),rel+": CSP bloqueia imagem "+src);
      }else if(src.startsWith("/assets/")){
        const local=src.split("?")[0];
        assert.ok(fs.existsSync(path.join(root,local.slice(1))),rel+": imagem local ausente: "+local);
      }
    }
    if(imgTags.some(t=>t.includes("data-apostila-image-fallback")))
      assert.match(html,/src="\/assets\/js\/apostila-image-fallback\.js"/,rel+": sem controlador de fallback");
    const content=html.match(/data-apostila-content="(\/apostilas\/[^"]+\.json)"/)?.[1];
    if(content){
      const jsonPath=content.slice(1);
      assert.ok(fs.existsSync(path.join(root,jsonPath)),rel+": livro JSON ausente: "+jsonPath);
      const data=JSON.parse(read(jsonPath));
      const rendered=new Set((data.q||[]).map(a=>a[0]));
      for(const item of data.o||[]){
        assert.ok(rendered.has(item[0]),rel+": sumário aponta para seção inexistente "+item[0]);
      }
    }
  }
  assert.ok(pages>=25);
  assert.ok(images>=20);
});


test("Imagens sem licenca nao aparecem e exames reais licenciados substituem somente o mesmo achado",()=>{
  const tools=read("assets/js/apostila-tools.js");
  assert.match(tools,/removedUnlicensed = new Set\(\[78, 94, 315, 319\]\)/);
  assert.match(tools,/if \(removedUnlicensed\.has\(Number\(originalRow\.id\)\)\) return null/);
  assert.match(tools,/Positive_Fern_Test\.jpg/);
  assert.match(tools,/Histopathology_of_acute_choriodeciduitis_/);
  assert.match(tools,/Coriodeciduite aguda/);
  assert.ok(!tools.includes("Fluxograma em português de manejo da rotura prematura de membranas ovulares"));
  const clim=JSON.parse(read("apostilas/climaterio-menopausa/content.json"));
  const physiology=clim.q.find(x=>x[0]==="fisiologia-transicao-straw-esgotamento-folicular");
  assert.ok(physiology,"Capítulo real de fisiologia STRAW+10 precisa existir");
  const originalFlow=physiology[2].find(x=>x[0]==="x"&&x[1].includes("Fluxo fisiopatológico autoral TRAUBE"))?.[1]||"";
  assert.match(originalFlow,/depleção da reserva folicular/);
  assert.match(originalFlow,/inibina B e do AMH/);
  assert.match(originalFlow,/o estradiol não diminui de forma linear/);
  assert.match(originalFlow,/FSH isolado não substitui a história/);
  assert.match(originalFlow,/nice\.org\.uk\/guidance\/ng23/);
  assert.match(originalFlow,/PMC3580996/);
  assert.ok(clim.o.some(x=>x[0]==="fisiologia-transicao-straw-esgotamento-folicular"));
});

test("Vitalidade fetal preserva exame real licenciado e raciocinio clinico contextualizado",()=>{
  const html=read("apostilas/avaliacao-vitalidade-fetal/index.html");
  assert.match(html,/<img[^>]*CTG_Output\.jpg/);
  assert.match(html,/PhantomSteve/);
  assert.match(html,/creativecommons\.org\/licenses\/by-sa\/3\.0/);
  assert.ok(!html.includes("Imagem indisponível."));
  assert.match(html,/id="decisoes-resolvidas-vitalidade"/);
  assert.match(html,/href="#decisoes-resolvidas-vitalidade"/);
  assert.match(html,/10 × 10/);
  assert.match(html,/8\/10/);
  assert.match(html,/fluxo diastólico reverso/);
  assert.match(html,/Oxigênio suplementar não deve ser usado rotineiramente/);
  assert.match(html,/acog\.org\/clinical\/clinical-guidance\/committee-opinion\/articles\/2021\/06\/indications/);
});


test("Câncer do colo: algoritmo DNA-HPV, FIGO e exceções têm navegação e justificativa",()=>{
  const data=JSON.parse(read("apostilas/cancer-colo-utero-hpv/content.json"));
  const sections=new Map(data.q.map(x=>[x[0],JSON.stringify(x[2])]));
  for(const id of ["hpv-algoritmo-aplicado","colposcopia-lesoes-avancado","figo-conduta-integrada-2026","seguimento-situacoes-especiais-casos"]){
    assert.ok(sections.has(id),"Capítulo ausente: "+id);
    assert.ok(data.o.some(x=>x[0]===id),"Capítulo não navegável: "+id);
    assert.ok(sections.get(id).length>4500,"Capítulo ainda superficial: "+id);
  }
  assert.match(sections.get("hpv-algoritmo-aplicado"),/citologia reflexa insatisfatória/);
  assert.match(sections.get("hpv-algoritmo-aplicado"),/24 meses/);
  assert.match(sections.get("hpv-algoritmo-aplicado"),/25 e 64 anos/);
  assert.match(sections.get("colposcopia-lesoes-avancado"),/Curetagem endocervical/);
  assert.match(sections.get("figo-conduta-integrada-2026"),/IIIC1/);
  assert.match(sections.get("seguimento-situacoes-especiais-casos"),/imunossupressão/);
  const all=JSON.stringify(data);
  assert.ok(!all.includes("o SUS passou a priorizar a vacinação"));
  assert.match(all,/Nota Técnica nº 32\/2026/);
  assert.equal(new Set(data.q.map(x=>x[0])).size,data.q.length,"Há IDs repetidos de capítulo");
});

test("Cancer de mama: preservar figuras e investigar discordancias antes da alta",()=>{
  const html=read("apostilas/cancer-de-mama/index.html");
  assert.match(html,/id="capitulo-concordancia-mamaria-2026"/);
  assert.match(html,/href="#capitulo-concordancia-mamaria-2026"/);
  assert.match(html,/mamografia anterior negativa/);
  assert.match(html,/microcalcificações suspeitas/);
  assert.match(html,/biópsia “benigna”/);
  assert.match(html,/gestação ou lactação/);
  assert.match(html,/BI-RADS 3 sob seguimento/);
  assert.match(html,/50–74 anos/);
  const diagrams=[
    "01-progressao.svg","02-birads.svg","03-investigacao.svg",
    "04-perfis.svg","05-tratamento.svg","06-tumor-axila.svg"
  ];
  for(const file of diagrams){
    assert.ok(html.includes("/assets/img/apostilas/cancer-de-mama/"+file),
      "Esquema pré-existente não pode desaparecer: "+file);
  }
  const section=html.match(/<section class="book-section" id="capitulo-concordancia-mamaria-2026">([\s\S]*?)<\/section>/)?.[1]||"";
  assert.ok(section.replace(/<[^>]+>/g," ").length>5000,"Conteúdo clínico muito superficial");
});

test("Cancer de mama: exames clinicos reais com licenca nao substituem esquemas existentes",()=>{
  const html=read("apostilas/cancer-de-mama/index.html");
  assert.match(html,/id="fig-mama-calcificacoes-reais"/);
  assert.match(html,/id="fig-mama-histologia-invasiva-real"/);
  assert.match(html,/Jmarchn/);
  assert.match(html,/Mikael Häggström/);
  assert.match(html,/creativecommons\.org\/licenses\/by-sa\/3\.0/);
  assert.match(html,/creativecommons\.org\/publicdomain\/zero\/1\.0/);
  assert.match(html,/data-apostila-image-fallback="ist-figure"/);
  assert.match(html,/img-src [^;]*https:\/\/thumb\.wikimedia\.org/);
  const figures=[...html.matchAll(/<img[^>]+(?:microcalcifications_in_carcinoma_in_situ|Histopathology_of_invasive_ductal_carcinoma_of_the_breast)[^>]*>/g)];
  assert.equal(figures.length,2,"Faltam as duas fotografias clínicas reais");
});


test("Cervicite e DIP: imagens CDC permanecem e casos são navegáveis",()=>{
  const html=read("apostilas/cervicites-doenca-inflamatoria-pelvica/index.html");
  const imageIds=["19141","18956","17367"];
  for(const id of imageIds){
    assert.match(html,new RegExp("PHIL_Images/"+id+"/"+id+"_lores\\.jpg"),"Imagem clínica CDC perdida: "+id);
    assert.match(html,new RegExp("Details\\.aspx\\?pid="+id),"Crédito CDC perdido: "+id);
  }
  assert.match(html,/CDC \/ Dr\. Wiesner/);
  assert.match(html,/CDC \/ N\. J\. Fiumara/);
  assert.match(html,/CDC \/ Dr\. Curran/);
  assert.match(html,/id="casos-decisoes-urgencia-2026"/);
  assert.match(html,/href="#casos-decisoes-urgencia-2026"/);
  assert.match(html,/gestação ectópica/);
  assert.match(html,/72 horas/);
  assert.match(html,/48–72 horas/);
  assert.match(html,/60 dias/);
  assert.match(html,/antimicrobianos parenterais/);
  assert.match(html,/PCDT de IST/);
});

test("Ciclo menstrual preserva diagrama completo em português com licença rastreável",()=>{
  const html=read("apostilas/ciclo-menstrual-eixo-hho/index.html");
  assert.match(html,/id="fig-ciclo-menstrual-licenciado"/);
  assert.match(html,/MenstrualCycle2_pt\.svg\/960px-MenstrualCycle2_pt\.svg\.png/);
  assert.match(html,/Isometrik/);
  assert.match(html,/Polyethylen/);
  assert.match(html,/creativecommons\.org\/licenses\/by-sa\/3\.0/);
  assert.match(html,/ovulação ocorra invariavelmente no dia 14/);
  assert.match(html,/fase folicular pode variar bastante/);
});


test("Climatério aplica atualização ACOG 2026 sem reduzir sangramento a 4mm",()=>{
  const d=JSON.parse(read("apostilas/climaterio-menopausa/content.json"));
  const sections=new Map(d.q.map(s=>[s[0],JSON.stringify(s[2])]));
  const id="sangramento-pos-menopausa-2026";
  assert.ok(sections.has(id));
  assert.ok(d.o.some(s=>s[0]===id));
  const chapter=sections.get(id);
  assert.match(chapter,/ACOG 2026/);
  assert.match(chapter,/≤4 mm/);
  assert.match(chapter,/ultrassonografia transvaginal associada à amostragem endometrial/);
  assert.match(chapter,/persistência ou recorrência/);
  assert.match(chapter,/não obriga automaticamente biópsia/);
  assert.match(chapter,/10\.1097\/AOG\.0000000000006275/);
  assert.match(chapter,/um único episódio de sangramento/);
  assert.match(chapter,/endométrio inteiramente visualizado/);
  assert.match(chapter,/acesso oportuno à avaliação ginecológica/);
  assert.match(chapter,/Sangramento persistente ou recorrente/);
  assert.match(chapter,/Espessamento endometrial/);
  assert.match(chapter,/sem sangramento/);
  assert.match(chapter,/Exemplo 1/);
  assert.match(chapter,/Exemplo 2/);
  assert.equal(new Set(d.q.map(x=>x[0])).size,d.q.length);
});


test("RCF e GIG mantém Doppler real licenciado e casos estruturados",()=>{
  const html=read("apostilas/crescimento-intrauterino-reduzido-aumentado/index.html");
  assert.match(html,/id="doppler-umbilical-real-licenciado"/);
  assert.match(html,/Ultrasound_Scan_ND_0111105746_1103050\.png/);
  assert.match(html,/creativecommons\.org\/licenses\/by-sa\/3\.0/);
  assert.match(html,/Nevit Dilmen/);
  assert.match(html,/data-apostila-image-fallback="approved-source"/);
  assert.match(html,/id="decisoes-seriadas-rcf-gig-2026"/);
  assert.match(html,/href="#decisoes-seriadas-rcf-gig-2026"/);
  assert.match(html,/SMFM, PFE\/CA/);
  assert.match(html,/diástole reversa/);
  assert.match(html,/4\.500 g/);
  assert.match(html,/5\.000 g/);
  assert.match(html,/Pressão fúndica/);
});

test("Hemorragias obstetricas mantem fluxos clinicos sem amniotomia automatica",()=>{
  const html=read("apostilas/hemorragias-primeiro-terceiro-trimestre/index.html");
  assert.match(html,/id="decisoes-hemorragicas-2026"/);
  assert.match(html,/href="#decisoes-hemorragicas-2026"/);
  assert.match(html,/Não transformar amniotomia em primeiro passo universal/);
  assert.match(html,/Toque vaginal digital deve ser evitado/);
  assert.match(html,/mantendo a placenta in situ/);
  assert.match(html,/vasa prévia/);
  assert.match(html,/CCN ≥7 mm/);
  assert.match(html,/NICE NG126/);
});


test("Indução de parto conserva exame verdadeiro e alerta para situações de risco",()=>{
  const html=read("apostilas/inducao-do-trabalho-de-parto/index.html");
  const data=JSON.parse(read("apostilas/inducao-do-trabalho-de-parto/content.json"));
  const renderer=read("assets/js/apostila-renderer.js");
  assert.match(html,/data-apostila-content="\/apostilas\/inducao-do-trabalho-de-parto\/content\.json"/);
  assert.match(html,/src="\/assets\/js\/apostila-renderer\.js/);
  assert.match(renderer,/for\(const s of data\.q\|\|\[\]\)/);
  const balloon=data.q.find(s=>s[0]==="balao");
  assert.ok(balloon,"Capítulo de método mecânico ausente");
  const figure=(balloon[2]||[]).filter(x=>x[0]==="p")
    .map(x=>String(x[1])).find(x=>x.includes('id="fig-balao-cervical-usg-real"'))||"";
  assert.match(figure,/id="fig-balao-cervical-usg-real"/);
  assert.match(figure,/12884_2022_5035_Fig4_HTML\.png/);
  assert.match(figure,/creativecommons\.org\/licenses\/by\/4\.0/);
  assert.match(figure,/Wen e colaboradores/);
  assert.match(figure,/não devem ser copiados como prescrição ou padrão universal/);
  const images=(data.q||[]).flatMap(s=>s[2]||[]).map(block=>String(block[1]))
    .filter(source=>source.includes("<img"));
  assert.ok(!images.some(source=>new RegExp('<img[^>]+src="https://www\\.cookmedical\\.com','i').test(source)),
    "Não incorporar imagem de fabricante sem autorização demonstrada");
  const id="inducoes-casos-avancados-2026";
  const advanced=data.q.find(s=>s[0]===id);
  assert.ok(advanced,"Casos avançados ausentes");
  assert.ok(data.o.some(x=>x[0]===id),"Casos avançados não navegáveis");
  assert.ok(JSON.stringify(advanced[2]).length>4000,"Casos avançados insuficientes");
  const clinical=JSON.stringify(data);
  assert.match(clinical,/Colo favorável não equivale a amniotomia segura/);
  assert.match(clinical,/gestante normoxêmica/);
  assert.match(clinical,/12–18 horas/);
  assert.match(clinical,/OMS, métodos mecânicos/);
  assert.match(clinical,/NICE NG207/);
});

test("Transmissão vertical conserva imagem CDC e usa retinografia licenciada",()=>{
  const h=read("apostilas/infeccoes-gestacao-transmissao-vertical/index.html");
  assert.match(h,/Congenital_syphilis_rash_on_palm\.jpg/);
  assert.match(h,/id="fig-cicatriz-ocular-toxoplasmose"/);
  assert.match(h,/PMID20029144_01_congenital_toxoplasmosis_-_chorioretinal_scar\.png/);
  assert.match(h,/creativecommons\.org\/licenses\/by\/2\.0/);
  assert.doesNotMatch(h,/congenital__toxo\.jpg/,
    "Fotografia StatPearls com licença NC-ND não deve ser incorporada ao produto comercial");
  assert.match(h,/id="casos-transmissao-vertical-diretriz-2026"/);
  assert.match(h,/href="#casos-transmissao-vertical-diretriz-2026"/);
  assert.match(h,/não ultrapasse nove dias/);
  assert.match(h,/pelo menos 30 dias antes do parto/);
  assert.match(h,/não se recomenda amamentação/);
  assert.match(h,/coriorretiniana de toxoplasmose congênita após a fase ativa/);
});


test("Apostila IST ensina diferencial de ulceras sem perder fotos clinicas",()=>{
  const html=read("apostilas/infeccoes-sexualmente-transmissiveis/index.html");
  const data=JSON.parse(read("apostilas/infeccoes-sexualmente-transmissiveis/content.json"));
  const renderer=read("assets/js/apostila-renderer.js");
  assert.match(html,/data-apostila-content="\/apostilas\/infeccoes-sexualmente-transmissiveis\/content\.json"/);
  assert.match(html,/src="\/assets\/js\/apostila-renderer\.js/);
  assert.match(renderer,/for\(const s of data\.q\|\|\[\]\)/);
  const section=data.q.find(x=>x[0]==="ulceras-genitais-decisoes-2026");
  assert.ok(section,"Capítulo de decisões sobre úlceras ausente");
  assert.ok(data.o.some(x=>x[0]==="ulceras-genitais-decisoes-2026"),"Capítulo sem link de navegação");
  assert.ok(JSON.stringify(section[2]).length>3000,"Diferencial insuficientemente desenvolvido");
  const all=JSON.stringify(data);
  assert.match(all,/úlcera indolor não confirma sífilis/);
  assert.match(all,/proctite grave depois de sexo anal receptivo/i);
  assert.match(all,/biópsia de lesão persistente/i);
  assert.match(all,/anexo alterado em 2024/);
  const images=(data.q||[]).flatMap(x=>x[2]||[])
    .filter(x=>x[0]==="p").flatMap(x=>String(x[1]).match(/ist-\d+\.webp/g)||[]);
  for(const id of [13,14,15,16,17,18,19,20])
    assert.ok(images.includes("ist-"+id+".webp"),"Imagem clínica "+id+" ausente da fonte renderizada");
  assert.equal(images.length,8,"Preservar exatamente oito imagens clínicas originais");
});

test("Infertilidade mostra HSG real CC0 e raciocinio por casal",()=>{
 const html=read("apostilas/infertilidade-conjugal/index.html");
 assert.ok(html.includes('id="fig-histerossalpingografia-real-cc0"'));
 assert.ok(html.includes('src="https://upload.wikimedia.org/wikipedia/commons/4/45/Hysterosalpingography.png"'));
 assert.ok(html.includes('creativecommons.org/publicdomain/zero/1.0/'));
 assert.ok(html.includes('Drhan9394'));
 assert.ok(html.includes('id="infertilidade-casos-decisao-2026"'));
 assert.ok(html.includes('href="#infertilidade-casos-decisao-2026"'));
 assert.ok(html.includes('Espermograma muito alterado em homem que usa testosterona'));
 assert.ok(html.includes('HSG com interrupção proximal'));
});


test("Contracepção: decisões avançadas mantêm navegação e diferenciações clínicas",()=>{
  const html=read("apostilas/planejamento-reprodutivo-contracepcao/index.html");
  const data=JSON.parse(read("apostilas/planejamento-reprodutivo-contracepcao/content.json"));
  const renderer=read("assets/js/apostila-renderer.js");
  assert.match(html,/data-apostila-content="\/apostilas\/planejamento-reprodutivo-contracepcao\/content\.json"/);
  assert.match(html,/src="\/assets\/js\/apostila-renderer\.js/);
  assert.match(renderer,/for\(const s of data\.q\|\|\[\]\)/);
  const id="decisoes-avancadas-contracepcao-2026";
  const chapter=data.q.find(x=>x[0]===id);
  assert.ok(chapter,"Capítulo de decisões avançadas ausente");
  assert.ok(data.o.some(x=>x[0]===id),"Sumário sem link para decisões avançadas");
  assert.ok(JSON.stringify(chapter[2]).length>4000,"Capítulo ainda superficial");
  const clinical=JSON.stringify(data);
  assert.match(clinical,/Ulipristal versus levonorgestrel/);
  assert.match(clinical,/ao menos cinco dias/);
  assert.match(clinical,/secreção mucopurulenta cervical/);
  assert.match(clinical,/21 anos com capacidade civil plena OU pelo menos dois filhos vivos/);
  assert.match(clinical,/Sepse puerperal é contraindicação/);
  assert.match(clinical,/who\.int\/publications\/i\/item\/9789240115583/);
  assert.match(clinical,/cdc\.gov\/contraception\/hcp\/usspr\/emergency-contraception/);
  assert.match(clinical,/Lei 14\.443\/2022/);
  for(const deviceId of ["diu-cobre","siu-lng"])
    assert.ok(data.q.some(x=>x[0]===deviceId),deviceId+" ausente do conteúdo");
});

test("Pré-natal: casos 2026 têm rastreio de bacteriúria, sífilis e VSR e estão navegáveis",()=>{
  const html=read("apostilas/pre-natal-baixo-risco/index.html");
  const id="pre-natal-infeccoes-urinarias-vacinas-2026";
  assert.ok(html.includes('id="'+id+'"'));
  assert.ok(html.includes('href="#'+id+'"'));
  assert.ok(html.includes('Bacteriúria assintomática') || html.includes('bacteriúria assintomática'));
  assert.ok(html.includes('100.000 UFC/mL'));
  assert.ok(html.includes('suspeita de pielonefrite') || html.includes('Suspeita de pielonefrite'));
  assert.ok(html.includes('terceiro trimestre'));
  assert.ok(html.includes('dTpa a partir de 20 semanas'));
  assert.ok(html.includes('VSR a partir de 28 semanas'));
  assert.ok(html.includes('acog.org/clinical/clinical-guidance/clinical-consensus/articles/2023/08/urinary-tract-infections'));
  assert.ok(html.includes('calendario-nacional-de-vacinacao-gestante'));
});


test("SUA: fotografia real de pólipo usa fonte licenciada e não revive figura restrita",()=>{
  const html=read("apostilas/sangramento-uterino-anormal/index.html");
  const data=JSON.parse(read("apostilas/sangramento-uterino-anormal/content.json"));
  const renderer=read("assets/js/apostila-renderer.js");
  assert.match(html,/data-apostila-content="\/apostilas\/sangramento-uterino-anormal\/content\.json"/);
  assert.match(html,/src="\/assets\/js\/apostila-renderer\.js/);
  assert.match(html,/src="\/assets\/js\/apostila-image-fallback\.js"/);
  assert.match(html,/img-src[^;]*https:\/\/upload\.wikimedia\.org/);
  assert.match(renderer,/if\(k==="p"\)return"<p>"\+b\[1\]\+"<\/p>"/);
  const section=(data.q||[]).find(item=>item[0]==="estrutural");
  assert.ok(section,"O capítulo estrutural deve estar presente no JSON publicado");
  assert.ok((data.o||[]).some(item=>item[0]==="estrutural"),"O capítulo deve constar do sumário");
  const figure=(section[2]||[]).filter(item=>item[0]==="p")
    .map(item=>item[1]).find(text=>text.includes('id="sua-polipo-histeroscopia-real"'))||"";
  assert.match(figure,/id="sua-polipo-histeroscopia-real"/);
  assert.match(figure,/05a_Corpuspolyp_01_vor_Abtragung_01\.a\.jpg/);
  assert.match(figure,/Dr\. Andreas Ott/);
  assert.match(figure,/creativecommons\.org\/licenses\/by-sa\/2\.0\/de\//);
  assert.match(figure,/data-apostila-image-source-url=/);
  assert.match(figure,/Histopatologia|histopatologia|não permite avaliar atipia/);
  assert.doesNotMatch(JSON.stringify(data),/polipo-1221-l\.alonso\.jpg/);
  const tools=read("assets/js/apostila-tools.js");
  assert.match(tools,/removedUnlicensed = new Set\(\[78, 94, 315, 319\]\)/);
});

test("Síndromes hipertensivas: microangiopatias, diretrizes de cálcio e rastreabilidade",()=>{
  const html=read("apostilas/sindromes-hipertensivas-da-gestacao/index.html");
  assert.match(html,/id="microangiopatias-gestacao-puerperio-2026"/);
  assert.match(html,/href="\/apostilas\/sindromes-hipertensivas-da-gestacao\/#microangiopatias-gestacao-puerperio-2026"/);
  assert.match(html,/atividade de ADAMTS13/);
  assert.match(html,/injúria renal progressiva/);
  assert.match(html,/RBEHG e CNE\/FEBRASGO/);
  assert.match(html,/OMS \(recomendação vigente consultada em 2026\)/);
  assert.match(html,/48–72 horas/);
  assert.match(html,/NICE NG133/);
  assert.match(html,/pubmed\.ncbi\.nlm\.nih\.gov\/32808006/);
  assert.ok(!html.includes("Imagem indisponível."),"Não deixar placeholders de imagem");
});


test("SOMP/PMOS preserva US real e aprofunda raciocinio adolescente e androgenos",()=>{
  const html=read("apostilas/sindrome-ovariana-metabolica-poliendocrina-somp/index.html");
  assert.match(html,/id="casos-decisao-somp-2026"/);
  assert.match(html,/href="\/apostilas\/sindrome-ovariana-metabolica-poliendocrina-somp\/#casos-decisao-somp-2026"/);
  assert.match(html,/Polycystic_ovary\.jpg/);
  assert.match(html,/Schomynv, CC0 1\.0/);
  assert.match(html,/aria-label="Abrir ultrassonografia real em resolução original"/);
  assert.match(html,/pelo menos três meses/);
  assert.match(html,/primeira linha farmacológica/);
  assert.match(html,/apneia obstrutiva do sono/);
  assert.match(html,/hiperandrogenismo/);
  assert.match(html,/2026/);
});

test("TPP diferencia prevenção com colo curto de triagem sintomática",()=>{
  const d=JSON.parse(read("apostilas/trabalho-parto-prematuro/content.json"));
  const chapter=d.q.find(x=>x[0]==="prevencao-vs-tpp-diagnostico-2026");
  assert.ok(chapter,"falta capítulo diferenciando prevenção e diagnóstico");
  assert.ok(d.o.some(x=>x[0]===chapter[0]),"falta acesso pelo sumário");
  const text=JSON.stringify(chapter[2]);
  assert.ok(text.length>6500,"desenvolvimento insuficiente");
  assert.match(text,/20 mm ou menos antes de 24 semanas/);
  assert.match(text,/21 e 25 mm/);
  assert.match(text,/30\+0 semanas/);
  assert.match(text,/15 mm ou menos/);
  assert.match(text,/48 horas/);
  assert.match(text,/nifedipino/);
  assert.match(text,/descolamento|DPP/);
  assert.match(text,/publications\.smfm\.org/);
  assert.match(text,/www\.nice\.org\.uk\/guidance\/ng25/);
  const ids=d.q.map(x=>x[0]);
  assert.equal(new Set(ids).size,ids.length,"seções duplicadas");
  assert.equal(d.o.filter(x=>!ids.includes(x[0])).length,0,"sumário aponta para capítulo ausente");
});

test("Vulvovaginites mantém as quatro lâminas CDC e suas atribuições",()=>{
  const html=read("apostilas/vulvovaginites/index.html");
  const ids=["16824","2933","3720","14500"];
  for(const id of ids){
    assert.match(html,new RegExp("PHIL_Images/"+id+"/"+id+"_lores\\.jpg"),"exame clínico CDC ausente: "+id);
    assert.match(html,new RegExp("pid="+id),"fonte original CDC ausente: "+id);
  }
  for(const author of ["Joe Miller","Stuart Brown","M. Rein"])assert.ok(html.includes(author),"crédito ausente: "+author);
  assert.equal((html.match(/<img\b/g)||[]).length,4,"não substituir ou acrescentar imagens sem auditoria");
  assert.ok(html.includes("obra em domínio público")||html.includes("Obra em domínio público"));
});


test("Sexualidade feminina e masculina sao apostilas independentes e pesquisaveis por Medicina Sexual",()=>{
  const female=read("apostilas/sexualidade/index.html");
  const male=read("apostilas/sexualidade-masculina/index.html");
  const library=read("apostilas/index.html");
  assert.match(female,/<title>Sexualidade Feminina · TRAUBE<\/title>/);
  assert.match(male,/<title>Sexualidade Masculina · TRAUBE<\/title>/);
  assert.doesNotMatch(female,/id="medicina-sexual-masculina-2026"/,
    "A apostila feminina não deve embutir o conteúdo masculino");
  assert.match(female,/href="\/apostilas\/sexualidade-masculina\/"/);
  assert.match(male,/href="\/apostilas\/sexualidade\/"/);
  assert.match(male,/Área: Cirurgia Geral/);
  assert.match(male,/Matéria: Urologia/);
  assert.match(female,/Área: Ginecologia e Obstetrícia/);
  assert.match(male,/Contraindicação farmacológica crítica/);
  assert.match(female,/id="atendimento-pos-violencia-sexual"/);
  // The current hall reads its catalog from the database, not inline HTML.
  const catalogClient=read("assets/js/apostilas-app.js");
  const catalogMigration=read("supabase/migrations/20261026064732_register_female_and_male_sexuality_apostilas_20261026.sql");
  assert.match(library,/src="\/assets\/js\/apostilas-app\.js/);
  assert.match(catalogClient,/\.from\("apostilas"\)/);
  assert.match(catalogClient,/book\.tema, book\.titulo/);
  assert.match(catalogMigration,/Sexualidade Feminina/);
  assert.match(catalogMigration,/Sexualidade Masculina/);
  assert.match(catalogMigration,/Medicina Sexual · Sexualidade Masculina/);
  assert.match(catalogMigration,/\/apostilas\/sexualidade-masculina\//);
  const ids=[...male.matchAll(/<section\b[^>]*\bid="([^"]+)"/g)].map(x=>x[1]);
  for(const [,dest] of male.matchAll(/class="book-outline-link" href="#([^"]+)"/g)){
    assert.ok(ids.includes(dest),"Seção masculina inexistente no sumário: "+dest);
  }
});


test("Sexualidade Masculina separada ensina hipotestosteronemia e urgencias sem confundir com unidade feminina",()=>{
  const html=read("apostilas/sexualidade-masculina/index.html");
  for(const id of [
    "medicina-sexual-masculina-2026",
    "avaliacao-de-medicina-sexual-2026",
    "tratamento-de-medicina-sexual-2026",
    "eixo-hormonal-e-urgencias-masculinas-2026",
    "consultas-masculinas-2026"
  ]){
    assert.match(html,new RegExp('id="'+id+'"'),"Falta seção "+id);
    assert.match(html,new RegExp('href="#'+id+'"'),"Falta navegação "+id);
  }
  assert.ok(!html.includes("Embora a maior parte desta apostila se concentre em sexualidade feminina"));
  assert.match(html,/testosterona total deve ser medida/);
  assert.match(html,/desejo de paternidade/);
  assert.match(html,/nitratos orgânicos ou doadores de óxido nítrico/);
  assert.match(html,/riociguate/);
  assert.match(html,/priapismo isquêmico/);
  assert.match(html,/uroweb.org\/guidelines\/sexual-and-reproductive-health\/chapter\/male-hypogonadism/);
  assert.match(html,/CC BY-SA 3.0|prótese peniana/);
  const female=read("apostilas/sexualidade/index.html");
  assert.match(female,/Sexualidade Feminina/);
});

test("Choque: imagens licenciadas têm origem na CSP e legendas clinicamente fiéis",()=>{
  const html=read("apostilas/choque-circulatorio/index.html");
  const csp=html.match(/<meta\s+http-equiv="Content-Security-Policy"\s+content="([^"]+)"/i)?.[1]||"";
  const directive=csp.match(/(?:^|;)\s*img-src\s+([^;]+)/i)?.[1]||"";
  assert.ok(directive.split(/\s+/).includes("https://commons.wikimedia.org"));
  assert.ok(directive.split(/\s+/).includes("https://upload.wikimedia.org"));
  assert.match(html,/Cateter venoso central tunelizado tipo Hickman/);
  assert.match(html,/Figura ilustrativa de cateter tunelizado, não de inserção emergencial em choque/);
  assert.match(html,/Representação das informações de pressão arterial em diferentes resoluções temporais/);
  assert.match(html,/Gráfico de pressão arterial; não representa cateterização arterial/);
  assert.doesNotMatch(html,/Canulização de artéria radial para monitorização contínua de PAM/);
});

test("Pré-natal: imagens relevantes e fonte Wikimedia autorizada sem figura arqueológica",()=>{
  const html=read("apostilas/pre-natal-baixo-risco/index.html");
  const csp=html.match(/<meta\s+http-equiv="Content-Security-Policy"\s+content="([^"]+)"/i)?.[1]||"";
  const origins=(csp.match(/(?:^|;)\s*img-src\s+([^;]+)/i)?.[1]||"").split(/\s+/);
  assert.ok(origins.includes("https://commons.wikimedia.org"));
  assert.ok(origins.includes("https://upload.wikimedia.org"));
  assert.match(html,/CRL%20Crown%20rump%20length%2012%20weeks/);
  assert.match(html,/Ultrassonografia obstétrica com medição do comprimento cabeça-nádega/);
  assert.doesNotMatch(html,/The.desert.of.the.Exodus/i);
});

test("Técnica cirúrgica: origem verificada e figuras correspondem ao instrumental moderno",()=>{
  const html=read("apostilas/principios-de-tecnica-cirurgica/index.html");
  const csp=html.match(/<meta\s+http-equiv="Content-Security-Policy"\s+content="([^"]+)"/i)?.[1]||"";
  const images=(csp.match(/(?:^|;)\s*img-src\s+([^;]+)/i)?.[1]||"").split(/\s+/);
  assert.ok(images.includes("https://commons.wikimedia.org"));
  assert.ok(images.includes("https://upload.wikimedia.org"));
  assert.match(html,/src="\/assets\/js\/apostila-image-fallback\.js"/);
  assert.match(html,/Conjunto de instrumentos de dissecção \(não demonstra técnica de incisão\)/);
  assert.match(html,/Porta-agulhas Mayo-Hegar utilizado em suturas/);
  assert.doesNotMatch(html,/Egyptian-surgical-instruments\.jpg/);
  assert.doesNotMatch(html,/Bisturi cirúrgico e técnica de incisão cutânea contínua/);
});

test("Curadoria: não sugerir uso de lote recolhido nem confundir histopatologia com ultrassom",()=>{
  const hypertensive=read("apostilas/sindromes-hipertensivas-da-gestacao/index.html");
  assert.doesNotMatch(hypertensive,/RECALLED(?:%20|_|___)/i);
  assert.doesNotMatch(hypertensive,/26399028226/);
  const firstTrimester=read("apostilas/sangramento-na-primeira-metade-da-gestacao/index.html");
  assert.match(firstTrimester,/Partial%20Hydatidiform%20Mole%20/);
  assert.match(firstTrimester,/Fotomicrografia histopatológica de mola hidatiforme parcial/);
  assert.doesNotMatch(firstTrimester,/Padrão ultrassonográfico em tempestade de neve na mola hidatiforme/);
});
