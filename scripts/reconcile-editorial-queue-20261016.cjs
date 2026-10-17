const fs = require('node:fs');
const cp = require('node:child_process');
const base = 'docs/auditoria-apostilas-2026-10-16';
const source = JSON.parse(fs.readFileSync(`${base}/status-cadeia.json`, 'utf8'));
const matrix = JSON.parse(fs.readFileSync(`${base}/matriz-ampliacao.json`, 'utf8'));
const run = args => cp.execFileSync('git', args, {encoding:'utf8',maxBuffer:20e6});
const entries = source.paths.map(item => {
  const versions = item.versions.map(v => {
    const raw = run(['cat-file','blob',v.sha]);
    let schema = 'manuscrito';
    let sections = null;
    let issue = null;
    if (item.path.endsWith('.json')) {
      try {
        const data = JSON.parse(raw);
        schema = data.v === 2 && Array.isArray(data.q) ? 'renderer-v2-qoh' : Array.isArray(data.books) ? 'batch-books' : 'json-outro';
        sections = data.q?.length ?? data.books?.reduce((n,b) => n+(b.sections?.length||0),0) ?? null;
        if (schema === 'renderer-v2-qoh') {
          const ids = new Set(data.q.map(s => s[0]));
          const missing = (data.o||[]).filter(x => !ids.has(x[0]));
          if (missing.length) issue = `Índice aponta para ${missing.length} seções ausentes`;
        }
      } catch(e) { issue = e.message; }
    } else if (item.path.endsWith('.html')) schema = 'html';
    return {...v, schema, sections, structural_issue:issue};
  });
  const needsComparison = versions.length > 1 || item.main_has_other_version;
  return {path:item.path, versions, selection: needsComparison ? 'comparar; nenhuma versão escolhida automaticamente' : 'candidato único no snapshot; revisão científica pendente', priority:needsComparison?1:item.path.endsWith('/content.json')?2:3, pending:item.next_actions};
}).sort((a,b)=>a.priority-b.priority||a.path.localeCompare(b.path));
const groups=[];
for(let i=0;i<entries.length;i+=20) {
  const batch=entries.slice(i,i+20);
  groups.push({batch:groups.length+1, groups:Array.from({length:Math.ceil(batch.length/5)},(_,j)=>batch.slice(j*5,j*5+5).map(x=>x.path))});
}
const summary={paths:entries.length,version_conflicts:entries.filter(x=>x.priority===1).length,json_v2_versions:entries.flatMap(x=>x.versions).filter(x=>x.schema==='renderer-v2-qoh').length,structural_issues:entries.flatMap(x=>x.versions).filter(x=>x.structural_issue).length,topics:matrix.topics.length};
fs.writeFileSync(`${base}/fila-reconciliacao.json`,JSON.stringify({date:'2026-10-16',scope:'Snapshot auditado; executar novamente após atualizar branches. Não estabelece ausência, aprovação ou preferência por maior extensão.',summary,batches:groups,entries},null,2)+'\n');
console.log(summary);
