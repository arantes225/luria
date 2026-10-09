const {test}=require('node:test'),assert=require('node:assert/strict'),vm=require('node:vm');
const {source}=require('./fixtures/app-client.cjs');
test('simulator recognizes textual required actions without stripping ordinary letters',()=>{
  const E=require('../assets/js/plantao-engine.js');
  for(const [title,required] of [['Trauma com fratura','abcde'],['Anafilaxia','epi_im'],['Eclâmpsia','magnesium'],['Hipoglicemia','glucose']]){
    assert.ok(E.requiredActions({title,actions:[],completion_rules:{}}).includes(required),title);
  }
  const aph={title:'Trauma com fratura',setting:'Ambulância / APH',completion_rules:{required_actions:['abcde','monitor']}};
  assert.ok(E.requiredActions(aph).includes('abcde'));
  assert.deepEqual(E.requiredActions({...aph,title:'Consulta sem trauma',summary:'',completion_rules:{required_actions:['monitor']}}),['monitor']);
});
function scoreFixture(){
  const fields={},result=[];const c={$:selector=>fields[selector.slice(1)],setResult:(...args)=>result.push(args),Number};
  const js=source('assets/js/work-scores.js');
  const helper=js.indexOf('  function validateScoreInputs(');
  if(helper>=0)vm.runInNewContext(js.slice(helper,js.indexOf('  function calcHints()',helper)),c);
  vm.runInNewContext(js.slice(js.indexOf('  function calcGrace()'),js.indexOf('  function calcRts()')),c);
  return {c,fields,result};
}
test('GRACE rejects invalid numeric input and preserves valid calculation',()=>{
  const {c,fields,result}=scoreFixture();
  for(const id of ['gr_age','gr_hr','gr_sbp','gr_cr','gr_k','gr_ca','gr_st','gr_bio'])fields[id]={value:'0',type:'select-one',min:'',max:''};
  for(const id of ['gr_age','gr_hr','gr_sbp','gr_cr'])fields[id].type='number';
  Object.assign(fields.gr_age,{value:'50',min:'18',max:'120'});fields.gr_hr.value='70';fields.gr_sbp.value='120';fields.gr_cr.value='1';
  c.calcGrace();assert.equal(result.at(-1)[0],'91');
  for(const value of ['-1','121','Infinity','NaN']){fields.gr_age.value=value;c.calcGrace();assert.equal(result.at(-1)[0],'—',value);}
  fields.gr_age.value='';c.calcGrace();assert.equal(result.at(-1)[0],'—');
});
test('PSI rejects negative age while preserving numeric scoring',()=>{
  const {c,fields,result}=scoreFixture();
  for(const id of ['p_age','p_sex','p_nh','p_ca','p_liv','p_hf','p_cvd','p_renal','p_ams','p_rr','p_sbp','p_temp','p_hr','p_ph','p_bun','p_na','p_glu','p_hct','p_o2','p_eff'])fields[id]={value:'0',type:'select-one',min:'',max:''};
  fields.p_sex.value='m';Object.assign(fields.p_age,{value:'-1',type:'number',min:'18',max:'120'});
  c.calcPsi();assert.equal(result.at(-1)[0],'—');fields.p_age.value='50';c.calcPsi();assert.equal(result.at(-1)[0],'50');
});
