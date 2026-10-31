const {test}=require('node:test'),assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),os=require('node:os');
const {JSDOM}=require('jsdom');const root=path.resolve(__dirname,'..');
const read=slug=>JSON.parse(fs.readFileSync(path.join(root,'apostilas',slug,'content.json'),'utf8'));
const section=(d,id)=>d.q.find(s=>s[0]===id);const text=x=>JSON.stringify(x);
test('Rotavírus: tabela, questão e resumo usam a janela ampliada sem alterar a idade mínima da D2',()=>{
 const d=read('imunizacoes-na-infancia'),s=section(d,'particularidades-bcg-rotavirus-febre-amarela'),t=s[2].find(x=>x[0]==='t');
 assert.equal(t[2][1][1],'1 mês e 15 dias.');assert.equal(t[2][1][2],'3 meses e 15 dias.');
 assert.equal(t[2][2][1],'11 meses e 29 dias.');assert.equal(t[2][2][2],'23 meses e 29 dias.');
 assert.doesNotMatch(text(section(d,'questoes-comentadas-residencia')),/3 meses e 15 dias|7 meses e 29 dias|105 dias/);
 assert.doesNotMatch(text(section(d,'pontos-chave-enamed-pni-2026')),/3 meses e 15 dias|7 meses e 29 dias/);
 for(const id of ['calendario-pni-2026-passo-a-passo','particularidades-bcg-rotavirus-febre-amarela'])for(const b of section(d,id)[2])if(b[0]==='t')assert.ok(b[2].every(r=>r.length===b[1].length));
});
test('Desnutrição: vitamina A depende do aporte, mantendo o tratamento específico de deficiência',()=>{
 const d=read('desnutricao-e-deficiencias-nutricionais');
 assert.doesNotMatch(text(d),/A megadose de Vitamina A deve ser realizada em todos|Administrar Megadose de.*Vitamina A oral \(100\.000 UI\)/);
 assert.match(text(section(d,'manejo-hospitalar-10-passos-oms-sbp')),/não acrescentar megadose de rotina/);
 assert.match(text(section(d,'deficiencias-especificas-micronutrientes')),/ceratomalácia/);
 assert.match(text(section(d,'algoritmos-e-fluxogramas-praticos')),/cólera ou diarreia aquosa profusa/);
 assert.doesNotMatch(text(d),/reidratar exclusivamente com ReSoMal|nanico/i);
 assert.match(text(section(d,'questoes-comentadas-residencia')),/Alternativa B/);
});
test('Magnésio e VPP mantêm a direção e os determinantes corretos',()=>{
 const html=fs.readFileSync(path.join(root,'apostilas/sindromes-hipertensivas-da-gestacao/index.html'),'utf8');
 assert.match(html,/elevando o limiar para convulsões/);assert.doesNotMatch(html,/reduzindo o influxo neuronal de cálcio e o limiar epileptogênico/);
 const d=read('vigilancia-epidemiologica');assert.match(text(d),/sensibilidade, da especificidade e da frequência/);assert.doesNotMatch(text(d),/Reflete a especificidade da definição de caso/);
});
test('Os 69 cadernos renderizam com sumário íntegro, IDs únicos e matemática legível',()=>{
 const state=JSON.parse(fs.readFileSync(path.join(root,'docs/editorial/correcoes-blocos-01-04/estado.json'),'utf8'));
 const ctx={document:{body:{dataset:{apostilaContent:'x'}}},fetch:()=>new Promise(()=>{})};ctx.globalThis=ctx;
 vm.runInNewContext(fs.readFileSync(path.join(root,'assets/js/apostila-renderer.js'),'utf8').replace('fetch(source,','globalThis.article=article;globalThis.outline=outline;fetch(source,'),ctx);
 for(const item of state.books){const dir=path.join(root,'apostilas',item.slug),jp=path.join(dir,'content.json');let html;
  if(fs.existsSync(jp)){const d=read(item.slug);assert.equal(new Set(d.q.map(s=>s[0])).size,d.q.length,item.slug);html=ctx.outline(d)+ctx.article(d);assert.doesNotMatch(text(d),/\\(?:f(?:rac)|t(?:ext|imes)|beta)\{|\\u000[8c]/,item.slug);}
  else html=fs.readFileSync(path.join(dir,'index.html'),'utf8');
  const dom=new JSDOM(html),doc=dom.window.document,ids=[...doc.querySelectorAll('[id]')].map(e=>e.id);assert.equal(new Set(ids).size,ids.length,item.slug);
  for(const a of doc.querySelectorAll('a[href^="#"]')){const id=a.getAttribute('href').slice(1);if(id)assert.ok(doc.getElementById(id),item.slug+' #'+id);}
  assert.doesNotMatch(doc.querySelector('article')?.textContent||doc.body.textContent,/[\u0008\u000c]|ext\{(?:TAG|VPP)|rac\{/,item.slug);dom.window.close();
 }
});
test('Fórmulas preservam operadores, agrupamento e valores em exemplos de epidemiologia e crescimento',()=>{
 const e=text(read('vigilancia-epidemiologica')),c=text(read('crescimento-e-desenvolvimento')),t=text(read('trauma-abdominal'));
 assert.match(e,/\(85\) \/ \(200\) = 42,5%/);assert.match(e,/\(80%\) \/ \(5%\) = 16/);
 assert.match(c,/\(176 \+ 165 - 13\) \/ \(2\) = \(328\) \/ \(2\)/);
 assert.match(t,/\(1\) \/ \(2\) m v<sup>2<\/sup>/);
 const f=text(read('financiamento-e-gestao-do-sus'));assert.match(f,/R\$/);
});
test('Gerador usa o leitor real, interpreta entidades e recusa sobrescrever livros',async()=>{
 const mod=await import('../scripts/bloco-04-utils.mjs');
 assert.equal(mod.extractVisibleTextFromJson({q:[['referencias',0,[['p','referência']]],['mapa-mental',0,[['p','resumo']]],['conteudo',0,[['p','A &lt; B &#8804; C']]]]}),'A < B ≤ C');
 assert.equal(mod.extractVisibleTextFromHtml('<article><script>lixo()</script><p>A &le; B</p><section class="book-hero">capa</section></article>'),'A ≤ B');
 const temp=fs.mkdtempSync(path.join(os.tmpdir(),'traube-quality-')),cwd=process.cwd();try{process.chdir(temp);const book=structuredClone(read('sindromes-coronarianas-agudas'));book.s='teste-leitor';book.t='Leitor de validação';mod.saveBook(book);
  const index=fs.readFileSync('apostilas/teste-leitor/index.html','utf8');assert.match(index,/data-apostila-content="\/apostilas\/teste-leitor\/content.json"/);assert.match(index,/apostila-renderer\.js/);assert.doesNotMatch(index,/apostila-v2\.js|css\/apostila\.css/);
  for(const m of index.matchAll(/(?:src|href)="(\/assets\/[^"?]+)/g))assert.ok(fs.existsSync(path.join(root,m[1])),m[1]);
  const previous=fs.readFileSync('apostilas/teste-leitor/content.json');assert.throws(()=>mod.saveBook(book),/conteúdo existente/);assert.deepEqual(fs.readFileSync('apostilas/teste-leitor/content.json'),previous);
  assert.throws(()=>mod.saveBook({s:'vazio',t:'Sem conteúdo',q:[]}),/sete seções/);assert.ok(!fs.existsSync('apostilas/vazio'));
 }finally{process.chdir(cwd);const safe=path.resolve(temp);assert.ok(safe.startsWith(path.resolve(os.tmpdir())+path.sep));fs.rmSync(safe,{recursive:true,force:true});}
});
