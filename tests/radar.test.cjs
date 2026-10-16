const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {JSDOM}=require('jsdom');
const root=path.join(__dirname,'..');
const data=JSON.parse(fs.readFileSync(path.join(root,'assets/data/radar-provas.json'),'utf8'));
test('Radar: same-source rankings preserve counts and ties without percentages or residual categories',()=>{
  assert.equal(data.provas.length,45);
  for(const bank of data.provas)for(const profile of bank.medcof?.perfis||[])for(const topics of Object.values(profile.areas)){
    let previous=Infinity;
    for(const t of topics){
      assert.ok(t.questoes_publicadas<=previous);previous=t.questoes_publicadas;
      assert.equal(t.posicao,1+topics.filter(x=>x.questoes_publicadas>t.questoes_publicadas).length);
      assert.equal(t.percentual_publicado,null);
      assert.doesNotMatch(t.tema,/outras? tags|outros? temas|miscelânea/i);
      assert.match(t.fonte_url,/^https:\/\/www\.grupomedcof\.com\.br\/blog\//);
    }
  }
});
test('Radar: area click shows specific subjects, bank and source filters stay independent',async()=>{
  const dom=new JSDOM(fs.readFileSync(path.join(root,'aplicar/radar/index.html'),'utf8'),{url:'https://luria.invalid/aplicar/radar/',runScripts:'outside-only'});
  try{
    const {window:w}=dom;w.fetch=async()=>({ok:true,json:async()=>data});
    w.eval(fs.readFileSync(path.join(root,'assets/js/radar.js'),'utf8'));
    await new Promise(r=>setImmediate(r));
    const d=w.document;
    assert.equal(d.querySelector('#radar-bank').value,'USP-SP');
    assert.equal(d.querySelectorAll('a[href*="grupomedcof"],a[href*="aristoclass"]').length,0);
    assert.equal(d.querySelector('#radar-total').textContent,'45 provas');
    assert.equal(d.querySelectorAll('.radar-topic').length,9);
    assert.equal(d.querySelector('.radar-topic h3').textContent,'Arritmias');
    assert.ok(![...d.querySelectorAll('.radar-topic h3')].some(n=>n.textContent==='Cardiologia'));
    [...d.querySelectorAll('[data-radar-area]')].find(b=>b.textContent==='Pediatria').click();
    assert.equal(d.querySelector('#radar-area-title').textContent,'Pediatria');
    d.querySelector('#radar-search').value='zzzinexistente';d.querySelector('#radar-search').dispatchEvent(new w.Event('input'));
    assert.match(d.querySelector('#radar-list').textContent,/Nenhum tema encontrado/);
    d.querySelector('#radar-search').value='';d.querySelector('#radar-bank').value='CERMAM';d.querySelector('#radar-bank').dispatchEvent(new w.Event('change'));
    assert.equal(d.querySelector('#radar-source').value,'aristo');
    assert.equal(d.querySelectorAll('.radar-value').length,0);
    assert.ok(d.querySelectorAll('.radar-topic').length>0);
  }finally{dom.window.close();}
});
