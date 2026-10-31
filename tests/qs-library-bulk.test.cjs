const {test}=require('node:test'),assert=require('node:assert/strict');
const {read,declaration,page}=require('./fixtures/frontend.cjs');

function libraryHarness(t,{sets=[],selected=[],deleted,deleteError,queryError,confirm=true}={}){
 const {w,d}=page(t,'questoes-simulados/index.html');
 const calls={deleteIds:null,confirm:0,storagePaths:[]};
 w.qsState={sets:sets.map(set=>({...set,metrics:{answered:0,correct:0,wrong:0}})),selectedSetIds:new Set(selected),deletingSelectedSets:false,currentSet:null};
 w.qsSb={
  from(table){
   let operation='select',ids=[];
   const query={
    select(){if(operation==='delete'){return Promise.resolve({data:deleted??ids.map(id=>({id})),error:deleteError||null})}return this},
    delete(){operation='delete';return this},
    in(_column,values){
     ids=values;
     if(operation==='delete'){calls.deleteIds=[...ids];return this}
     return Promise.resolve({data:queryError?null:ids.map(id=>({set_id:id,image_path:`${id}${table==='question_items'?'':'-candidate'}.png`})),error:queryError||null});
    }
   };
   return query;
  },
  storage:{from:()=>({remove:async paths=>{calls.storagePaths=paths;return{error:null}}})}
 };
 w.TraubeDialog={confirm:async()=>{calls.confirm++;return typeof confirm==='function'?confirm():confirm}};
 w.accuracy=()=> '0%';w.qsEscape=String;w.closeSimulationLibraryMenus=()=>{};w.closeCurrentSet=()=>{};
 w.loadSets=async()=>true;w.renderSimulationLibrary=()=>{};
 const source=read('assets/js/questoes-simulados.js');
 w.eval([
  declaration(source,'updateSetBulkToolbar'),
  declaration(source,'setLibraryDeleteStatus'),
  declaration(source,'deleteSelectedSets'),
  declaration(source,'renderSimulationLibrary'),
  declaration(source,'wireSetBulkActions')
 ].join('\n'));
 return {w,d,calls};
}

const sets=(...ids)=>ids.map(id=>({id,title:`Lista ${id}`,source_file_path:`${id}.pdf`}));

test('Empty library hides bulk controls and routes its actions to the existing add flows',t=>{
 const {w,d}=libraryHarness(t);
 let destination;
 w.switchQsMode=mode=>destination={mode};
 w.switchQsAddMode=mode=>destination.addMode=mode;
 w.updateSetBulkToolbar();w.renderSimulationLibrary();
 assert.equal(d.querySelector('.qs-bulk-toolbar').hidden,true);
 assert.equal(d.querySelector('#qs-delete-selected').disabled,true);
 assert.equal(d.querySelector('.qs-library-back').closest('.qs-library-panel'),null);
 assert.equal(d.querySelector('.qs-library-back').parentElement,d.querySelector('[data-qs-section="library"]'));
 assert.match(d.querySelector('.qs-library-empty').textContent,/biblioteca está vazia/i);
 d.querySelector('[data-qs-empty-add="manual"]').click();
 assert.deepEqual(destination,{mode:'add',addMode:'manual'});
 d.querySelector('[data-qs-empty-add="automatic"]').click();
 assert.deepEqual(destination,{mode:'add',addMode:'automatic'});
});

test('Bulk delete confirms once, deletes only selected ids, and preserves unselected lists',async t=>{
 const {w,d,calls}=libraryHarness(t,{sets:sets('a','b','c'),selected:['b'],deleted:[{id:'b'}]});
 await w.deleteSelectedSets();
 assert.equal(calls.confirm,1);assert.deepEqual(calls.deleteIds,['b']);
 assert.deepEqual(w.qsState.sets.map(set=>set.id),['a','c']);
 assert.deepEqual([...w.qsState.selectedSetIds],[]);
 assert.deepEqual(Array.from(calls.storagePaths),['b.pdf','b.png','b-candidate.png']);
 assert.match(d.getElementById('qs-library-status').textContent,/1 lista excluída/);
 assert.equal(w.qsState.deletingSelectedSets,false);
});

test('Bulk delete removes multiple selected lists and reports a partial result without clearing remaining selection',async t=>{
 const {w,d,calls}=libraryHarness(t,{sets:sets('a','b','c'),selected:['a','c'],deleted:[{id:'a'}]});
 await w.deleteSelectedSets();
 assert.deepEqual(calls.deleteIds,['a','c']);
 assert.deepEqual(w.qsState.sets.map(set=>set.id),['b','c']);
 assert.deepEqual([...w.qsState.selectedSetIds],['c']);
 assert.match(d.getElementById('qs-library-status').textContent,/Exclusão parcial: 1 de 2/);
 assert.equal(d.getElementById('qs-delete-selected').disabled,false);
});

test('Select all marks all visible lists and the bulk control reflects the selection',t=>{
 const {w,d}=libraryHarness(t,{sets:sets('a','b','c')});
 w.wireSetBulkActions();
 const selectAll=d.getElementById('qs-select-all');
 selectAll.checked=true;selectAll.dispatchEvent(new w.Event('change'));
 assert.deepEqual([...w.qsState.selectedSetIds],['a','b','c']);
 assert.equal(d.getElementById('qs-selected-count').textContent,'3 selecionados');
 assert.equal(d.getElementById('qs-delete-selected').disabled,false);
});

test('Database failure is surfaced without a success message or local deletion',async t=>{
 const {w,d,calls}=libraryHarness(t,{sets:sets('a','b'),selected:['a','b'],deleteError:{message:'RLS negou a operação'}});
 await w.deleteSelectedSets();
 assert.deepEqual(calls.deleteIds,['a','b']);
 assert.deepEqual(w.qsState.sets.map(set=>set.id),['a','b']);
 assert.match(d.getElementById('qs-library-status').textContent,/Não foi possível excluir as listas: RLS negou/);
 assert.doesNotMatch(d.getElementById('qs-library-status').textContent,/excluídas\./);
 assert.equal(w.qsState.deletingSelectedSets,false);
});

test('Repeated clicks during confirmation do not start duplicate deletes',async t=>{
 let finishConfirmation;
 const {w,calls}=libraryHarness(t,{sets:sets('a'),selected:['a'],confirm:()=>new Promise(resolve=>finishConfirmation=resolve)});
 const first=w.deleteSelectedSets();
 const duplicate=w.deleteSelectedSets();
 assert.equal(w.qsState.deletingSelectedSets,true);
 assert.equal(calls.confirm,1);
 assert.equal(calls.deleteIds,null);
 finishConfirmation(false);
 await Promise.all([first,duplicate]);
 assert.equal(calls.deleteIds,null);
 assert.equal(w.qsState.deletingSelectedSets,false);
});

test('Image lookup failure blocks deletion and reports the failure',async t=>{
 const {w,d,calls}=libraryHarness(t,{sets:sets('a'),selected:['a'],queryError:{message:'consulta indisponível'}});
 await w.deleteSelectedSets();
 assert.equal(calls.deleteIds,null);
 assert.deepEqual(w.qsState.sets.map(set=>set.id),['a']);
 assert.match(d.getElementById('qs-library-status').textContent,/Não foi possível preparar a exclusão/);
});
