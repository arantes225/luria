"use strict";
const fs=require('node:fs'),path=require('node:path'),{spawnSync}=require('node:child_process'),vm=require('node:vm'),{JSDOM}=require('jsdom');
const root=path.resolve(__dirname,'..'),out=path.join(root,'docs/auditoria-apostilas-2026-10-16');
const git=(...args)=>{const r=spawnSync('git',args,{cwd:root,encoding:'utf8',maxBuffer:128*1024*1024});if(r.status!==0)throw Error(r.stderr);return r.stdout;};
const clean=s=>String(s).replace(/\s+/g,' ').trim();
const redact=s=>s.replace(/https?:\/\/(?:drive|docs)\.google\.com\/[^\s<>"\\)\]]+/g,'[referencia-privada-omitida]');
const write=(p,d)=>{const f=path.join(out,p);fs.mkdirSync(path.dirname(f),{recursive:true});fs.writeFileSync(f,redact(typeof d==='string'?d:JSON.stringify(d,null,2)+'\n'),'utf8');};
const list=ref=>git('ls-tree','-r',ref,'--','apostilas','docs','content','assets/js/apostilas-lotes-225.js').split('\n').filter(Boolean).map(l=>{const [meta,p]=l.split('\t');return {sha:meta.split(' ')[2],path:p};});
const refs=git('for-each-ref','--format=%(refname:short)','refs/remotes/origin/editorial','refs/remotes/origin/audit').trim().split('\n');
const main=git('rev-parse','origin/main').trim(),mainTree=list(main),mainByPath=new Map(mainTree.map(i=>[i.path,i.sha]));
const branches=[],unique=new Map(),blobIDs=new Set();
for(const ref of refs){
 const tree=list(ref),byPath=new Map(tree.map(t=>[t.path,t.sha]));
 const relevant=tree.filter(t=>/^apostilas\//.test(t.path)||/apostila|editorial|lote|225|260|285|enamed/i.test(t.path));
 for(const t of relevant){if(!/\.(?:md|json|html|js)$/.test(t.path))continue;const k=t.path+'@'+t.sha;if(!unique.has(k))unique.set(k,{...t,branches:[],in_main:mainByPath.get(t.path)===t.sha});unique.get(k).branches.push(ref);blobIDs.add(t.sha);}
 branches.push({ref,commit:git('rev-parse',ref).trim(),files:relevant.length,changed_from_main:relevant.filter(t=>mainByPath.get(t.path)!==t.sha).map(t=>({path:t.path,sha:t.sha})),content_json_without_index:relevant.filter(t=>/^apostilas\/[^/]+\/content\.json$/.test(t.path)&&!byPath.has(t.path.replace(/content\.json$/,'index.html'))).map(t=>t.path)});
}
const ids=[...blobIDs];const batch=spawnSync('git',['cat-file','--batch'],{cwd:root,input:ids.join('\n')+'\n',maxBuffer:256*1024*1024});if(batch.status!==0)throw Error('cat-file falhou');
const buffer=batch.stdout,blobs=new Map();let offset=0;
while(offset<buffer.length){const end=buffer.indexOf(10,offset);if(end<0)break;const [id,type,size]=buffer.subarray(offset,end).toString('utf8').split(' ');const len=Number(size);if(type!=='blob'||!Number.isFinite(len))throw Error('Resposta blob inválida');blobs.set(id,buffer.subarray(end+1,end+1+len).toString('utf8'));offset=end+1+len+1;}
const versions=[],documentary=[],catalogVersions=[];
for(const item of unique.values()){
 if(process.argv[2]&&!item.sha.startsWith(process.argv[2]))continue;
 const source=blobs.get(item.sha);if(!source)continue;
 if(item.path==='assets/js/apostilas-lotes-225.js'){
  const definitions={path:item.path,sha:item.sha,branches:item.branches,in_main:item.in_main,declared_totals:[...source.matchAll(/length:\s*(\d+)|(?:const\s+)?TOTAL(?:_TOPICS)?\s*=\s*(\d+)/g)].map(m=>Number(m[1]||m[2])),references_medcof:/MedCof|medcof/.test(source),references_aristo:/Aristo|aristo/.test(source),source_number_lines:source.split('\n').filter(l=>/Array.from|length:|260 temas|285 temas|const supplements|const extensions|const additions/.test(l)).map(l=>l.slice(0,450))};catalogVersions.push(definitions);continue;
 }
 const looksLikeBuildInput=/^apostilas\/.+\.json$/.test(item.path)&&/"books"\s*:/.test(source);
 const isMedical=looksLikeBuildInput||/^apostilas\/[^/]+\/(?:content\.json|index\.html)$/.test(item.path)||/^apostilas\/_rascunhos\/.+preview\.html$/.test(item.path)||(/^apostilas\/.+\.md$/.test(item.path)&&(!/(?:inventario|auditoria|status|candidat|plano|matriz|mapeamento|lotes\/|PENDEN|README|CHECK|compara)/i.test(item.path)||/(?:EDICAO_CONTINUA|RASCUNHO)\.md$/i.test(item.path)));
 if(!isMedical){if(!item.in_main)documentary.push({...item,chars:source.length,excerpt:clean(source).slice(0,700),self_reported_pending:source.split('\n').filter(l=>/pendente|n[aã]o (?:publicad|aprovad|valid)|\[ \]/i.test(l)).slice(0,15).map(l=>l.slice(0,250))});continue;}
 if(item.in_main)continue;
 let title='',heads=[],refs=[],links=[],images=[],candidateImages=[],samples=[],chars=0,format=path.extname(item.path),jsonValid=true;
 if(format==='.json'){
  try{const p=JSON.parse(source);title=p.t||p.title||p.h?.[1]||path.basename(path.dirname(item.path));heads=(p.q||[]).map(s=>({id:s[0],title:(s[2]||[]).find(b=>b[0]==='2')?.[1]||s[0]}));
   const all=(p.q||[]).flatMap(s=>(s[2]||[]).map(b=>({id:s[0],block:b})));const text=all.filter(x=>x.id!=='referencias').map(x=>JSON.stringify(x.block.slice(1))).join(' ');chars=clean(new JSDOM(text).window.document.body.textContent).length;
   refs=all.filter(x=>x.id==='referencias').map(x=>JSON.stringify(x.block));samples=all.filter(x=>x.block[0]==='p'&&/\d+\s*(mg|seman|anos|mmHg)|recomenda|contraindica|diagn[oó]stico/i.test(x.block[1])).slice(0,5).map(x=>({section:x.id,text:clean(x.block[1]).slice(0,650)}));
   if(p.article_html){const d=new JSDOM(p.article_html).window.document;heads=[...d.querySelectorAll('h2,h3')].map(h=>({title:clean(h.textContent)}));chars=clean(d.body.textContent).length;}
   if(Array.isArray(p.books)){title=p.books.map(b=>b.title).join(' / ');heads=p.books.flatMap(b=>(b.sections||[]).map(s=>({id:s.id,title:s.title})));const d=new JSDOM(p.books.flatMap(b=>(b.sections||[]).map(s=>s.body_html||'')).join('\n')).window.document;chars=clean(d.body.textContent).length;refs=p.books.flatMap(b=>(b.references||[]).map(r=>JSON.stringify(r)));candidateImages=p.books.flatMap(b=>(b.images||[]).map(i=>({src:i.src,alt:i.alt,status:'candidata, não incorporada'})));images=[...d.querySelectorAll('img')].map(i=>({src:i.getAttribute('src'),alt:i.getAttribute('alt')}));samples=[...d.querySelectorAll('p')].filter(p=>/\d+\s*(mg|seman|anos|mmHg)|recomenda|contraindica|diagn[oó]stico/i.test(p.textContent)).slice(0,5).map(p=>({text:clean(p.textContent).slice(0,650)}));}
  }catch(e){jsonValid=false;title=path.basename(path.dirname(item.path));}
 }else if(format==='.html'){
  const d=new JSDOM(source).window.document,article=d.querySelector('article')||d.body;title=clean(d.querySelector('h1')?.textContent||d.title);heads=[...article.querySelectorAll('h2,h3')].map(h=>({title:clean(h.textContent).slice(0,250)}));article.querySelectorAll('script,style').forEach(e=>e.remove());chars=clean(article.textContent).length;refs=[...article.querySelectorAll('#referencias li,.reference-list li')].map(x=>clean(x.textContent));samples=[...article.querySelectorAll('p')].filter(p=>/\d+\s*(mg|seman|anos|mmHg)|recomenda|contraindica|diagn[oó]stico/i.test(p.textContent)).slice(0,5).map(p=>({text:clean(p.textContent).slice(0,650)}));images=[...article.querySelectorAll('img')].map(e=>({src:e.getAttribute('src'),alt:e.getAttribute('alt')}));
 }else{
  const lines=source.split(/\r?\n/);title=lines.find(l=>/^# /.test(l))?.slice(2)||item.path;heads=lines.filter(l=>/^#{1,3} /.test(l)).map(l=>({title:l.replace(/^#+ /,'')}));const start=lines.findIndex(l=>/^#{1,4} .*refer[eê]ncias|^#{1,4} .*fontes/i.test(l));refs=start>=0?lines.slice(start+1).filter(l=>/^\s*(?:\d+[.)]|[-*]|\*\*\[R)/.test(l)).slice(0,30):[];chars=clean(source.replace(/https?:\/\/[^\s)]+/g,'').replace(/[#*`_>|]/g,'')).length;samples=source.split(/\r?\n\s*\r?\n/).filter(p=>/\d+\s*(mg|seman|anos|mmHg)|recomenda|contraindica|diagn[oó]stico/i.test(p)&&p.length>120&&!/^#/.test(p)).slice(0,5).map(p=>({text:clean(p).slice(0,650)}));images=[...source.matchAll(/!\[([^\]]*)\]\(([^)]+)\)/g)].map(m=>({alt:m[1],src:m[2]}));
 }
 links=[...new Set([...source.matchAll(/https?:\/\/[^\s<>"\\\])`]+/g)].map(m=>m[0]).filter(u=>!/(?:drive|docs)\.google\.com/.test(u)))];
 const record={...item,key:path.basename(path.dirname(item.path))+'--'+item.sha.slice(0,10),title,format,chars_estimated:chars,extension_certified:false,json_valid:jsonValid,headings:heads,reference_entries:refs.map(s=>s.slice(0,600)),external_urls:links,embedded_images:images,samples,stage:item.path.endsWith('content.json')?'conteúdo estruturado em branch; conferir renderer, revisão e integração':format==='.html'?'HTML em branch; não comprova publicação':'manuscrito em branch; integração pendente',next_actions:['comparar com versões do mesmo caminho/tema antes de consolidar','validar conteúdo e referências de cada capítulo','verificar imagens existentes e licenças','ligar ao registro central do tema com evidências de revisão','integrar somente após revisão clínica e editorial'],clinical_review_status:'não certificada; extração estrutural e bibliográfica desta versão'};
 record.candidate_images=candidateImages;versions.push(record);write('evidencias/branches/'+record.key+'.json',record);
}
 if(process.argv[2]){console.log('Evidência específica recomposta:',versions.map(v=>v.key).join(', '));process.exit(0);}
write('evidencias/cadeia-branches.json',{date:'2026-10-16',main_commit:main,branches,catalog_versions:catalogVersions,documentary_files:documentary,medical_versions:versions.map(v=>({key:v.key,path:v.path,sha:v.sha,title:v.title,format:v.format,chars:v.chars_estimated,branches:v.branches,embedded_images:v.embedded_images.length,external_urls:v.external_urls.length,stage:v.stage})),notes:['Versões são identificadas por caminho e blob; presença em branch não significa aprovação.','A comparação com main é por conteúdo atual, não por inferência de merge a partir do nome da branch.','Não houve checkout ou alteração dos trabalhos de produção de outras branches.']});
console.log(JSON.stringify({branches:branches.length,additional_medical_versions:versions.length,documentary_versions:documentary.length,catalog_versions:catalogVersions.length,content_json_without_index:branches.reduce((n,b)=>n+b.content_json_without_index.length,0)},null,2));
