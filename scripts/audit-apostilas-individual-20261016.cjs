"use strict";
// Extração de evidências: não altera cadernos, fontes ou aprovações.
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),{spawnSync}=require('node:child_process'),{JSDOM,VirtualConsole}=require('jsdom');
const root=path.resolve(__dirname,'..'),out=path.join(root,'docs/auditoria-apostilas-2026-10-16'),base=path.join(root,'apostilas');
const write=(name,data)=>{const p=path.join(out,name);fs.mkdirSync(path.dirname(p),{recursive:true});const content=(typeof data==='string'?data:JSON.stringify(data,null,2)+'\n').replace(/https?:\/\/(?:drive|docs)\.google\.com\/[^\s<>"\\)\]]+/g,'[referencia-privada-omitida]');fs.writeFileSync(p,content,'utf8');};
const read=p=>fs.readFileSync(p,'utf8'),sha=s=>crypto.createHash('sha256').update(s).digest('hex'),clean=s=>String(s).replace(/\s+/g,' ').trim();
const images=JSON.parse(read(path.join(out,'evidencias/imagens-banco.json'))),catalog=JSON.parse(read(path.join(out,'evidencias/catalogo-banco.json')));
const norm=s=>clean(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const esc=s=>String(s??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');
const jsonBlock=b=>{const k=b[0];if(k==='p')return '<p>'+b[1]+'</p>';if(['2','3','4'].includes(k))return '<h'+k+'>'+b[1]+'</h'+k+'>';if(['u','o'].includes(k)){const tag=k==='u'?'ul':'ol';return '<'+tag+'>'+b[1].map(x=>'<li>'+x+'</li>').join('')+'</'+tag+'>';}if(k==='t')return '<table><thead><tr>'+(b[1]||[]).map(x=>'<th>'+x+'</th>').join('')+'</tr></thead><tbody>'+(b[2]||[]).map(r=>'<tr>'+r.map(x=>'<td>'+x+'</td>').join('')+'</tr>').join('')+'</tbody></table>';return b[1]||'';};
const textHTML=html=>{const d=new JSDOM(html).window.document;d.querySelectorAll('script,style,nav,aside').forEach(e=>e.remove());return clean(d.body.textContent);};
const patterns=[/\d+(?:[.,]\d+)?\s*(?:mg|mcg|µg|UI|mEq|mmol|mL|semanas|anos)\b/i,/recomenda|contraindica|prefer[eê]|primeira linha|n[aã]o (?:deve|utiliz)|exclu[is]|diagn[oó]stico/i,/202[456]|SOMP|PMOS|PCOS|FIGO|ACOG|POLE|metronidazol|misoprostol|progesterona|sulfato de magn[eé]sio/i];
const items=[],docOnly=[];
for(const folder of fs.readdirSync(base,{withFileTypes:true}).filter(e=>e.isDirectory())){
 const slug=folder.name,dir=path.join(base,slug),htmlPath=path.join(dir,'index.html');
 if(fs.existsSync(htmlPath)){
  const html=read(htmlPath),jsonPath=path.join(dir,'content.json'),payload=fs.existsSync(jsonPath)?JSON.parse(read(jsonPath)):null;
  const sourcePath=payload?jsonPath:htmlPath,source=read(sourcePath);
  const dom=new JSDOM(html,{url:'https://www.resibulando.online/apostilas/'+slug+'/',runScripts:'outside-only',pretendToBeVisual:true,virtualConsole:new VirtualConsole()}),w=dom.window,d=w.document;
  if(payload){let article=payload.article_html||'';if(!article)for(const s of payload.q||[])article+='<section id="'+esc(s[0])+'" class="book-section">'+(s[2]||[]).map(jsonBlock).join('')+'</section>';
   d.body.innerHTML='<aside class="book-outline"><div class="book-outline-head"></div><nav>'+((payload.o||[]).map(a=>'<a href="#'+esc(a[0])+'">'+a[1]+'</a>').join(''))+'</nav></aside><article class="book-main">'+article+'</article>';
  }
  const article=d.querySelector('article.book-main,article')||d.body;
  const headings=[...article.querySelectorAll('h2,h3,h4')].map(e=>({tag:e.tagName,title:clean(e.textContent),section:e.closest('section[id]')?.id||null}));
  const sections=[...article.querySelectorAll('section[id]')].map(s=>({id:s.id,title:clean(s.querySelector('h2,h3')?.textContent||s.id),chars:clean(s.textContent).length}));
  const refNodes=[...article.querySelectorAll('#referencias,.reference-list')];
  for(const h of article.querySelectorAll('h2,h3,h4'))if(/^(?:\d+(?:\.\d+)*[.)]?\s*)?(?:refer[eê]ncias|bibliografia)/i.test(clean(h.textContent))&&h.textContent.length<180){let n=h.nextElementSibling;while(n&&!/^H[234]$/.test(n.tagName)){if(['P','OL','UL'].includes(n.tagName))refNodes.push(n);n=n.nextElementSibling;}}
  const refs=[...new Set(refNodes.flatMap(n=>[...n.querySelectorAll('li,p')].map(e=>clean(e.textContent))).filter(Boolean))];
  const links=[...article.querySelectorAll('a[href]')].filter(a=>/^https?:/.test(a.getAttribute('href'))).map(a=>({label:clean(a.textContent),url:a.getAttribute('href'),in_references:refNodes.some(n=>n.contains(a))}));
  const staticImages=[...article.querySelectorAll('img')].map(e=>({src:e.getAttribute('src'),alt:e.getAttribute('alt'),section:e.closest('section[id]')?.id||null,caption:clean(e.closest('figure')?.querySelector('figcaption')?.textContent||''),decorative:/mascot|pulo|gato|logo|avatar|icon/i.test((e.getAttribute('src')||'')+' '+(e.getAttribute('alt')||''))}));
  const paragraphs=[...article.querySelectorAll('p')].filter(e=>!e.closest('#referencias,.book-hero,nav,aside')).map(e=>({section:e.closest('section[id]')?.id||null,text:clean(e.textContent)})).filter(p=>p.text.length>100);
  const buckets=new Map();for(const p of paragraphs){const n=norm(p.text);if(n.length<160)continue;if(!buckets.has(n))buckets.set(n,[]);buckets.get(n).push(p);}
  const duplicated=[...buckets.values()].filter(a=>a.length>1).map(a=>({count:a.length,sections:a.map(p=>p.section),excerpt:a[0].text.slice(0,240)}));
  const headingCounts=new Map();for(const h of headings){const k=norm(h.title);if(!headingCounts.has(k))headingCounts.set(k,[]);headingCounts.get(k).push(h.section);}
  const duplicateHeadings=[...headingCounts].filter(([k,v])=>v.length>1&&k.length>20).map(([title,sections])=>({title,sections}));
  const ids=[...d.querySelectorAll('[id]')].map(e=>e.id),idSet=new Set(ids),anchors=[...d.querySelectorAll('a[href^="#"]')].map(a=>{let target=a.getAttribute('href').slice(1);try{target=decodeURIComponent(target);}catch{}return target;}).filter(Boolean);
  const brokenAnchors=[...new Set(anchors.filter(id=>!idSet.has(id)))];
  const longHeadings=headings.filter(h=>h.title.length>400).map(h=>({...h,title:h.title.slice(0,240),full_length:h.title.length}));
  const rows=images.filter(i=>i.apostila_path==='/apostilas/'+slug+'/'),approved=rows.filter(i=>i.review_status==='approved');
  const missingTarget=approved.filter(i=>!idSet.has(String(i.target_section).replace(/^#/,''))).map(i=>({id:i.id,section:i.target_section}));
  const before=article.querySelectorAll('img').length;
  const rendererErrors=[];
  if(/apostila-tools\.js|apostila-renderer\.js/.test(html)){
   w.luriaSafeContentUrl=(raw)=>{try{const u=new URL(raw,w.location.href);return ['https:','http:'].includes(u.protocol)?u.href:'';}catch{return '';}};
   w.supabaseClient={auth:{getSession:async()=>({data:{session:null}})},rpc:async name=>({data:name==='list_approved_apostila_images'?approved:[],error:null})};w.docmapUser={audit:true};
   try{w.eval(read(path.join(root,'assets/js/apostila-tools.js')));}catch(e){rendererErrors.push(e.message);}
  }
  items.push({key:slug,kind:'apostila-html',path:path.relative(root,sourcePath).replaceAll('\\','/'),html_path:'apostilas/'+slug+'/index.html',title:clean(d.querySelector('h1')?.textContent||payload?.t||d.title.replace(/ · LURIA/,''))||slug,source_sha256:sha(source),html_sha256:sha(html),headings,sections,references:refs,reference_links:links.filter(l=>l.in_references),external_links:links,static_images:staticImages,inline_svg:article.querySelectorAll('svg').length,tables:article.querySelectorAll('table').length,paragraphs:paragraphs.length,duplicated_paragraphs:duplicated,duplicate_headings:duplicateHeadings,long_headings:longHeadings,broken_anchors:brokenAnchors,duplicate_ids:ids.filter((id,i)=>ids.indexOf(id)!==i),image_rows:rows.map(i=>({id:i.id,status:i.review_status,section:i.target_section,source_license:i.source_license,src:i.proposed_asset?.src})),missing_image_targets:missingTarget,images_disabled:/data-apostila-images="disabled-by-admin"/.test(html),tools_loaded:/apostila-tools\.js/.test(html),db_published:catalog.some(c=>c.content_url==='/apostilas/'+slug+'/'&&c.is_published),catalog_fallback:read(path.join(base,'index.html')).includes('/apostilas/'+slug+'/'),samples:patterns.flatMap((re,i)=>paragraphs.filter(p=>re.test(p.text)).slice(0,4).map(p=>({...p,pattern:i}))),opening:paragraphs.slice(0,2),_dom:dom,_before:before,_rendererErrors:rendererErrors,_paragraphs:paragraphs});
 }
 for(const f of fs.readdirSync(dir).filter(f=>f.endsWith('.md')&&!/AUDITORIA_2026-10-16|\.auditoria-2026-10-16/.test(f))){
  const p=path.join(dir,f),s=read(p);
  if(/inventario|auditoria-integracao/.test(f)){docOnly.push(path.relative(root,p).replaceAll('\\','/'));continue;}
  const lines=s.split(/\r?\n/),heads=lines.flatMap((l,i)=>/^#{1,4}\s/.test(l)?[{line:i+1,title:l.replace(/^#+\s/,''),level:l.match(/^#+/)[0].length}]:[]);
  const refStarts=heads.filter(h=>/refer[eê]ncias|bibliografia|fontes (?:prim[aá]rias|principais|cient[ií]ficas|verific)/i.test(h.title));
  const refs=[...new Set(refStarts.flatMap(h=>{const end=heads.find(x=>x.line>h.line&&x.level<=h.level);return lines.slice(h.line,end?end.line-1:undefined).filter(l=>l.trim()&&!/^#{1,4}/.test(l));}))];
  const paras=s.split(/\r?\n\s*\r?\n/).map(t=>clean(t)).filter(t=>t.length>100&&!/^[#|>]/.test(t));
  const imgs=[...s.matchAll(/!\[([^\]]*)\]\(([^)]+)\)/g)].map(m=>({alt:m[1],src:m[2]}));
  const links=[...s.matchAll(/https?:\/\/[^\s<>\])"`]+/g)].map(m=>m[0].replace(/[.,;]+$/,''));
  const text=s.replace(/<!--[^]*?-->/g,'').replace(/https?:\/\/[^\s)]+/g,'').replace(/[#*`_>|]/g,'').replace(/\s+/g,' ').trim();
  const counts=new Map();for(const para of paras)if(para.length>180){const n=norm(para);if(!counts.has(n))counts.set(n,[]);counts.get(n).push(para);}
  const key=slug==='_rascunhos'?f.replace(/\.md$/,''):slug+'--'+f.replace(/\.md$/,'');
  items.push({key,kind:/complemento|auditoria-questoes/.test(f)?'complemento-md':'rascunho-md',path:path.relative(root,p).replaceAll('\\','/'),title:heads[0]?.title||f,source_sha256:sha(s),chars_estimated:text.length,chars_scope:'estimativa Markdown; inclui elementos editoriais e não certifica 60K útil',headings:heads,references:refs,external_links:[...new Set(links)].map(url=>({url,label:'',in_references:false})),static_images:imgs,inline_svg:(s.match(/<svg\b/g)||[]).length,tables:lines.filter(l=>/^\|\s*[-:]/.test(l)).length,duplicated_paragraphs:[...counts.values()].filter(a=>a.length>1).map(a=>({count:a.length,excerpt:a[0].slice(0,240)})),image_rows:[],samples:patterns.flatMap((re,i)=>paras.filter(p=>re.test(p)).slice(0,3).map(text=>({text,pattern:i}))),opening:paras.slice(0,2).map(text=>({text})),_paragraphs:paras.map(text=>({text}))});
 }
}
(async()=>{
 await new Promise(r=>setTimeout(r,60));
 for(const item of items){if(item._dom){const d=item._dom.window.document;item.dom_simulation={scope:'JSDOM; script real com RPC substituída por snapshot somente leitura; sem layout, autenticação real ou download de imagens',errors:item._rendererErrors,inserted_figures:[...d.querySelectorAll('[data-apostila-approved-image]')].map(e=>({id:Number(e.dataset.apostilaApprovedImage),section:e.closest('section[id]')?.id||null,src:e.querySelector('img')?.getAttribute('src')||null,source_only:!e.querySelector('img')})),total_article_images:d.querySelector('article')?.querySelectorAll('img').length||0};item._dom.window.close();}
  write('evidencias/itens/'+item.key+'.json',Object.fromEntries(Object.entries(item).filter(([k])=>!k.startsWith('_'))));
 }
 const triage=spawnSync(process.execPath,['scripts/audit-apostilas-60k.mjs','--json'],{cwd:root,encoding:'utf8'});write('evidencias/triagem-60k.json',triage.stdout);
 const report=JSON.parse(triage.stdout).report;
 const summary=items.map(i=>({key:i.key,path:i.path,kind:i.kind,title:i.title,chars:i.kind==='apostila-html'?report.find(r=>r.slug===i.key)?.chars:i.chars_estimated,references:i.references.length,external_links:i.external_links.length,static_images:i.static_images.filter(x=>!x.decorative).length,approved:i.image_rows.filter(r=>r.status==='approved').length,pending:i.image_rows.filter(r=>r.status==='pending').length,simulated_figures:i.dom_simulation?.inserted_figures.length||0,long_headings:i.long_headings?.length||0,duplicated_paragraphs:i.duplicated_paragraphs.length,broken_anchors:i.broken_anchors||[]}));
 write('evidencias/inventario-atual.json',{date:'2026-10-16',source_commit:spawnSync('git',['rev-parse','HEAD'],{cwd:root,encoding:'utf8'}).stdout.trim(),items:summary,documentary_files_excluded:docOnly});
 write('evidencias/trechos-para-revisao.json',items.map(i=>({key:i.key,path:i.path,title:i.title,kind:i.kind,headings:i.headings,references:i.references,samples:i.samples,opening:i.opening})));
 console.log(JSON.stringify({total:items.length,html:items.filter(i=>i.kind==='apostila-html').length,md:items.filter(i=>i.kind!=='apostila-html').length,documentary_excluded:docOnly.length,source:'d7dc563'},null,2));
})();
