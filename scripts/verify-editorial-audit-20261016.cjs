"use strict";
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),out=path.join(root,'docs/auditoria-apostilas-2026-10-16');
const read=p=>JSON.parse(fs.readFileSync(path.join(out,p),'utf8'));
let checkedJSON=0;function walk(d){for(const e of fs.readdirSync(d,{withFileTypes:true})){const p=path.join(d,e.name);if(e.isDirectory())walk(p);else if(p.endsWith('.json')){JSON.parse(fs.readFileSync(p,'utf8'));checkedJSON++;}}}walk(out);
const status=read('status-individual.json'),expanded=read('matriz-ampliacao.json'),chain=read('evidencias/cadeia-branches.json'),upstream=read('status-cadeia.json');
assert.equal(status.items.length,70);assert.equal(expanded.topics.length,280);assert.equal(new Set(expanded.topics.map(t=>t.number)).size,280);
const modules=expanded.topics.flatMap(t=>t.primary_modules);assert.equal(modules.length,401);assert.equal(new Set(modules.map(m=>m.module_id)).size,401);assert.equal(expanded.orphan_modules.length,0);
assert.equal(read('evidencias/controles-e-correspondencias.json').js_vs_json_primary_mismatches.length,0);
const correctionFile=path.join(out,'correcoes-estrutura-20261016.json');
const corrections=fs.existsSync(correctionFile)?JSON.parse(fs.readFileSync(correctionFile,'utf8')).changes:[];
for(const item of status.items){assert(fs.existsSync(path.join(out,'pareceres',item.key+'.md')));const digest=crypto.createHash('sha256').update(fs.readFileSync(path.join(root,item.path),'utf8')).digest('hex');const correction=corrections.find(c=>c.path===item.path);if(correction){assert.equal(correction.source_sha256,item.source_sha256);assert.equal(digest,correction.result_sha256,'Correção difere do checkpoint: '+item.path);}else assert.equal(digest,item.source_sha256,'Texto original foi modificado sem checkpoint: '+item.path);}
for(const t of expanded.topics)assert(fs.existsSync(path.join(out,'nucleos',String(t.number).padStart(3,'0')+'.md')));
for(const v of chain.medical_versions){const evidence=read('evidencias/branches/'+v.key+'.json');assert.equal(evidence.sha,v.sha);assert.equal(evidence.path,v.path);}
assert.equal(upstream.paths.length,new Set(chain.medical_versions.map(v=>v.path)).size);
const body=fs.readFileSync(path.join(out,'RELATORIO_GERAL.md'),'utf8');assert(body.includes('A ampliação é intencional'));assert(!body.includes('Catálogo divergente'));
assert(!expanded.topics.find(t=>t.number===275).artifacts.some(a=>a.path==='apostilas/sexualidade-masculina/index.html'));
const results={date:'2026-10-16',json_valid:checkedJSON,main_reports:status.items.length,main_source_hashes_preserved:status.items.length-corrections.length,main_sources_with_tracked_corrections:corrections.length,expanded_topic_reports:expanded.topics.length,course_modules_unique:modules.length,course_destinations_valid:true,js_vs_json_mapping_consistent:true,branch_versions_with_matching_evidence:chain.medical_versions.length,clinical_validation_certified:false};
fs.writeFileSync(path.join(out,'evidencias/verificacao-final.json'),JSON.stringify(results,null,2)+'\n');console.log(JSON.stringify(results,null,2));
