"use strict";
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const folder=path.join(__dirname,'entrega-editorial'),read=p=>JSON.parse(fs.readFileSync(path.join(folder,p),'utf8'));
const repository=path.resolve(process.argv[2]||path.join(__dirname,'../../..'));
const inv=read('inventario-225.json'),queue=read('fila-producao.json'),correspondences=read('correspondencias-propostas.json');
assert.equal(inv.entries.length,225);assert.equal(new Set(inv.entries.map(t=>t.id)).size,225);
assert.deepEqual(inv.entries.map(t=>t.id),Array.from({length:225},(_,i)=>i+1));
assert.equal(inv.entries.filter(t=>t.schedule_id!==null).length,180);
const absent=inv.entries.filter(t=>!t.existing_book).map(t=>t.id),queued=queue.lots.flatMap(l=>l.topics);
assert.deepEqual([...queued].sort((a,b)=>a-b),absent);assert.equal(new Set(queued).size,queued.length);
assert(queue.lots.every(l=>l.topics.length<=20&&l.groups.every(g=>g.length<=5)));assert.deepEqual(queue.lots.flatMap(l=>l.groups.flat()),queued);
assert.equal(queue.pilot.length,5);assert(queue.pilot.every(id=>absent.includes(id)));
assert(correspondences.entries.every(t=>!t.enabled&&fs.existsSync(path.join(repository,t.source_path))));
const records=fs.readdirSync(path.join(folder,'evidencias/cadernos')).map(f=>read('evidencias/cadernos/'+f));
for(const book of records){const digest=crypto.createHash('sha256').update(fs.readFileSync(path.join(repository,book.path))).digest('hex');assert.equal(digest,book.sha256,'Original alterado desde o inventário: '+book.path);const html=path.join(repository,path.dirname(book.path),'index.html');assert.equal(crypto.createHash('sha256').update(fs.readFileSync(html)).digest('hex'),book.html_sha256);}
for(const dir of fs.readdirSync(path.join(folder,'piloto'),{withFileTypes:true}).filter(d=>d.isDirectory())){
 const base=path.join(folder,'piloto',dir.name);for(const file of ['plano-editorial.md','fundamentos.md','conteudo.md','fontes.json','imagens-candidatas.json','auditoria.md','status.json'])assert(fs.existsSync(path.join(base,file)));
 const s=JSON.parse(fs.readFileSync(path.join(base,'status.json'),'utf8'));assert.equal(s.scientific_characters,0);assert.equal(s.checkpoints.html_generated,false);assert.equal(s.checkpoints.human_approved,false);
}
const summary={entries:225,queue_unique:true,lot_limit:20,group_limit:5,pilot_plans:5,original_books_hashes_preserved:records.length,medical_coverage_certified:false,html_generated:false};
fs.writeFileSync(path.join(folder,'evidencias/verificacao-entrega.json'),JSON.stringify(summary,null,2)+'\n');console.log(JSON.stringify(summary,null,2));
