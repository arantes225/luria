'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const {readFileSync}=require('node:fs');
const {join}=require('node:path');

const source=readFileSync(join(__dirname,'../assets/js/bulario.js'),'utf8');
const sliceBetween=(start,end)=>{
  const a=source.indexOf(start);
  const b=source.indexOf(end,a);
  assert.ok(a>=0&&b>a,'Expected source markers: '+start);
  return source.slice(a,b);
};
const searchHelpers=sliceBetween('  const normalized=value=>','  function renderList(){');
const {searchScore}=new Function(searchHelpers+'\nreturn {searchScore};')();
const sample={
  name:'cloridrato de metoclopramida',
  active_ingredient:'cloridrato de metoclopramida',
  data:{synonyms:['metoclopramida'],commercial_names:['Plasil'],diseases:['náuseas e vômitos']}
};
test('finds generic substance, salt, brand and typo',()=>{
  for(const term of ['metoclopramida','Plasil','cloridrato de metoclopramida','METOCLOPRAMIDA']){
    assert.ok(Number.isFinite(searchScore(sample,term)),term);
  }
  for(const term of ['metoclorpramida','metoclopramidda','nauseas']){
    assert.ok(Number.isFinite(searchScore(sample,term)),term);
  }
  assert.equal(searchScore(sample,'paracetamol'),Infinity);
});
test('supports arrays of aliases and product brands',()=>{
  const row={name:'substância exemplo',active_ingredient:'substância exemplo',data:{
    aliases:['apelido exemplo'],products:[{name:'Produto Clínico'}]
  }};
  assert.equal(searchScore(row,'apelido exemplo'),0);
  assert.equal(searchScore(row,'produto clinico'),0);
});
test('paginates the full catalog, beyond the first thousand entries',async()=>{
  const loader=sliceBetween('  async function loadAllDrugs(){','  (async()=>');
  const items=Array.from({length:1089},(_,i)=>({id:i+1}));
  const calls=[];
  const supabaseClient={
    from(table){
      assert.equal(table,'bulario_catalog');
      return {select:()=>({order:()=>({
        range:async(from,to)=>{
          calls.push([from,to]);
          return {data:items.slice(from,to+1),error:null};
        }
      })})};
    }
  };
  const loadAllDrugs=new Function('window',loader+'\nreturn loadAllDrugs;')({supabaseClient});
  const result=await loadAllDrugs();
  assert.equal(result.error,null);
  assert.equal(result.data.length,1089);
  assert.deepEqual(calls,[[0,499],[500,999],[1000,1499]]);
});

const gatingCode=sliceBetween('  function approvedFormulations(data){','  function renderDetail(row){');
const {approvedFormulations}=new Function(
  'normalized',
  gatingCode+'\nreturn {approvedFormulations};',
)(new Function(searchHelpers+'\nreturn normalized;')());

const fullDose={
  label:'Comprimido oral 10 mg',
  dose_text:'Conforme indicação e bula específica',
  interval_text:'A cada 8 h',
  route:'VO',
  duration_text:'Até 5 dias',
  max_daily_text:'Conforme bula',
  administration:'Com água',
  cautions:'Avaliar contraindicações',
  prescription_type:'Receita simples',
  source_url:'https://example.org/bula-profissional'
};
test('never approves unsourced draft or a generic placeholder, even when fields are populated',()=>{
  assert.equal(approvedFormulations({
    status:'clinical_reviewed_needs_leaflet_source',
    formulations:[fullDose]
  }).length,0);
  assert.equal(approvedFormulations({
    status:'source_reviewed',
    formulations:[{...fullDose,label:'Apresentação conforme produto/registro vigente'}]
  }).length,0);
  assert.equal(approvedFormulations({
    status:'source_reviewed',
    formulations:[{...fullDose,source_url:''}]
  }).length,0);
});
test('only source-tied formulations are released; no unrelated dosage is copied',()=>{
  const checked=approvedFormulations({
    status:'source_reviewed',
    formulations:[fullDose,{...fullDose,label:'Solução injetável',source_url:''}]
  });
  assert.deepEqual(checked.map(item=>item.label),['Comprimido oral 10 mg']);
  const one={...fullDose,source_url:''};
  assert.equal(approvedFormulations({
    status:'source_reviewed',
    leaflet_url:'https://example.org/formula-unica',
    formulations:[one]
  }).length,1);
});

test('does not confuse clinically distinct active substances by substring',()=>{
  const esketamine={name:'cloridrato de escetamina',active_ingredient:'cloridrato de escetamina',data:{commercial_names:['Spravato']}};
  assert.equal(searchScore(esketamine,'cetamina'),Infinity);
  assert.equal(searchScore(esketamine,'escetamina'),2);
  assert.ok(Number.isFinite(searchScore(esketamine,'spravato')));
  const hydromorphone={name:'hidromorfona',active_ingredient:'hidromorfona',data:{}};
  assert.equal(searchScore(hydromorphone,'morfina'),Infinity);
});

test('distinguishes atropina from somatropina and finds standard clinical aliases',()=>{
  const atropine={name:'sulfato de atropina',active_ingredient:'sulfato de atropina',data:{synonyms:['atropina']}};
  const somatropin={name:'somatropina',active_ingredient:'somatropina',data:{}};
  const tmpSmx={name:'sulfametoxazol + trimetoprima',active_ingredient:'sulfametoxazol + trimetoprima',data:{synonyms:['cotrimoxazol','SMX-TMP']}};
  assert.ok(Number.isFinite(searchScore(atropine,'atropina')));
  assert.equal(searchScore(somatropin,'atropina'),Infinity);
  assert.equal(searchScore(tmpSmx,'cotrimoxazol'),0);
  assert.equal(searchScore(tmpSmx,'SMX TMP'),0);
});

test('blocks high-risk ambiguous dose catalogs with many repeated presentation labels',()=>{
  const forms=Array.from({length:90},(_,i)=>({
    ...fullDose,
    label:'Regime '+Math.floor(i/10),
    dose_text:(i+1)+' mg according to indication'
  }));
  assert.equal(approvedFormulations({
    status:'source_reviewed',
    quality_audit:{priority:'P0',review_status:'PENDING_CLINICAL_SOURCE_REVIEW'},
    formulations:forms
  }).length,0);
  assert.equal(approvedFormulations({
    status:'source_reviewed',
    quality_audit:{priority:'P1',review_status:'PENDING_CLINICAL_SOURCE_REVIEW'},
    formulations:[fullDose]
  }).length,1);
});

test('enforces explicit clinical hold for noninterchangeable routes even with a leaflet',()=>{
  assert.equal(approvedFormulations({
    status:'source_reviewed',
    quality_audit:{
      priority:'P0',
      review_status:'PENDING_CLINICAL_SOURCE_REVIEW',
      prescription_copy_blocked:true
    },
    formulations:[{...fullDose,label:'Injetável'},{...fullDose,label:'Spray nasal',route:'IN'}]
  }).length,0);
  assert.equal(approvedFormulations({
    status:'source_reviewed',
    quality_audit:{prescription_copy_blocked:false},
    formulations:[fullDose]
  }).length,1);
});
