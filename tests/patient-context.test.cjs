const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const {JSDOM}=require('jsdom');

const html='<!doctype html><html><body data-page="trabalho_paciente"><main><section id="patient-app"></section></main></body></html>';
const source=fs.readFileSync('assets/js/patient-workspace.js','utf8');
function fixture(){
  const dom=new JSDOM(html,{url:'https://fixture.invalid/trabalho/paciente/',runScripts:'outside-only',pretendToBeVisual:true});
  dom.window.confirm=()=>true;
  dom.window.alert=()=>{};
  dom.window.eval(source);
  return dom;
}

test('patient context starts empty and creates an isolated temporary session',()=>{
  const dom=fixture(),w=dom.window,d=w.document;
  assert.equal(d.querySelector('h1').textContent,'Uma avaliação, um só lugar');
  assert.equal(w.TraubePatientContext.read().patient,null);
  d.querySelector('[data-action="show-create"]').click();
  assert.equal(d.querySelector('#patient-create').hidden,false);
  const form=d.querySelector('[data-form="create"]');
  for(const [name,value] of Object.entries({id:'Paciente 01',age:'64',weight:'70',context:'PS',complaint:'tontura',conditions:'HAS'})) form.elements[name].value=value;
  form.dispatchEvent(new w.Event('submit',{bubbles:true,cancelable:true}));
  const state=w.TraubePatientContext.read();
  assert.equal(state.patient.id,'Paciente 01');
  assert.equal(state.patient.weight,'70');
  assert.match(d.querySelector('.patient-hero h1').textContent,/Paciente 01/);
  assert.equal(state.timeline.length,1);
  dom.window.close();
});

test('patient context preserves measurements and explicit results without overwriting history',()=>{
  const dom=fixture(),w=dom.window,d=w.document;
  w.TraubePatientContext.createPatient({id:'Paciente 02',weight:'70'});
  d.querySelector('[data-form="problem"] select').value='hiponatremia';
  d.querySelector('[data-form="problem"]').dispatchEvent(new w.Event('submit',{bubbles:true,cancelable:true}));
  let form=d.querySelector('[data-form="measurement"]');
  form.elements.type.value='sodium';form.elements.value.value='126';form.elements.unit.value='mmol/L';form.elements.observedAt.value='2026-10-24T12:00';
  form.dispatchEvent(new w.Event('submit',{bubbles:true,cancelable:true}));
  form=d.querySelector('[data-form="measurement"]');
  form.elements.type.value='sodium';form.elements.value.value='130';form.elements.unit.value='mmol/L';form.elements.observedAt.value='2026-10-24T14:00';
  form.dispatchEvent(new w.Event('submit',{bubbles:true,cancelable:true}));
  let state=w.TraubePatientContext.read();
  assert.equal(state.measurements.length,2);
  assert.deepEqual(Array.from(state.measurements, item=>item.value),[126,130]);
  assert.ok(d.querySelector('[data-add-result="electrolytes"]'));
  w.TraubePatientContext.addResult({title:'Fluidos e eletrólitos',category:'Avaliação'});
  state=w.TraubePatientContext.read();
  assert.equal(state.results.length,1);
  assert.equal(state.problems[0].label,'Hiponatremia');
  assert.equal(state.timeline.length>=4,true);
  w.TraubePatientContext.clear();
  assert.equal(w.TraubePatientContext.read().patient,null);
  assert.equal(d.querySelector('[data-action="show-create"]')!==null,true);
  dom.window.close();
});
