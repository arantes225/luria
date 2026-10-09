const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const {ownerFixture,source,storage}=require('./fixtures/app-client.cjs');
test('local clinical drafts isolate accounts and never adopt unknown legacy data',async()=>{
  const f=ownerFixture(),c=f.context;
  c.localStorage.setItem('luria-prescription-draft-v1','UNKNOWN LEGACY');
  await c.LuriaLocalOwnerStore.ready;
  vm.runInContext(source('assets/js/clinical-bridge.js'),c);
  assert.equal(c.LuriaClinicalBridge.appendPrescription({text:'A PRIVATE'}),true);
  assert.equal(c.LuriaLocalOwnerStore.read('luria-prescription-draft-v1'),'A PRIVATE');
  c.LuriaClinicalBridge.save({text:'A TRANSFER'});
  f.change('B');assert.equal(c.LuriaClinicalBridge.peek(),null);
  assert.equal(c.LuriaLocalOwnerStore.read('luria-prescription-draft-v1'),null);
  c.LuriaClinicalBridge.appendPrescription({text:'B PRIVATE'});
  f.change('A');assert.equal(c.LuriaLocalOwnerStore.read('luria-prescription-draft-v1'),'A PRIVATE');
  assert.equal(c.localStorage.getItem('luria-prescription-draft-v1'),'UNKNOWN LEGACY');
  f.change(null);assert.equal(c.LuriaClinicalBridge.appendPrescription({text:'SIGNED OUT'}),false);
});
test('each PDF loader explicitly disables PDF.js evaluation',()=>{
  for(const file of ['assets/js/cronograma.js','assets/js/onboarding.js','assets/js/questoes-simulados.js']) {
    const calls=[...source(file).matchAll(/\.getDocument\(\{([\s\S]*?)\}\)/g)];
    assert.ok(calls.length,file);for(const call of calls)assert.match(call[1],/isEvalSupported:\s*false/,file);
  }
});
test('fixed SheetJS reads CSV, XLSX and XLS preserving imported cells',()=>{
  const XLSX=require('../assets/vendor/xlsx-0.20.3.js');assert.equal(XLSX.version,'0.20.3');
  const rows=[['Frente','Verso','Data'],['Acentuação çã','Resposta',45292],['Linha 2','',0]];
  for(const bookType of ['xlsx','xls','csv']) {
    const wb=XLSX.utils.book_new();XLSX.utils.book_append_sheet(wb,XLSX.utils.aoa_to_sheet(rows),'Dados');
    const bytes=XLSX.write(wb,{type:'array',bookType});
    const parsed=XLSX.read(bytes,{type:'array'});
    assert.deepEqual(XLSX.utils.sheet_to_json(parsed.Sheets[parsed.SheetNames[0]],{header:1,defval:''}),rows,bookType);
  }
});


test('late initial Auth lookup cannot restore ownership after sign-out',async()=>{
 let listener,resolve;
 const c={window:null,localStorage:storage(),sessionStorage:storage(),CustomEvent:function(){},dispatchEvent(){}};c.window=c;
 c.supabase={createClient:()=>({auth:{onAuthStateChange:fn=>{listener=fn},getSession:()=>new Promise(done=>{resolve=done})}})};
 vm.runInNewContext(source('assets/js/supabase.js'),c);
 listener('SIGNED_OUT',null);resolve({data:{session:{user:{id:'OLD'}}}});await c.LuriaLocalOwnerStore.ready;
 assert.equal(c.LuriaLocalOwnerStore.ownerId,null);assert.equal(c.LuriaLocalOwnerStore.key('private'),null);
});
