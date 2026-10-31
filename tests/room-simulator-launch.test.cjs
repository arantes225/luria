const test=require('node:test'),assert=require('node:assert/strict');
const {read,declaration}=require('./fixtures/frontend.cjs');
const source=read('assets/js/plantao.js');
const openRoomCase=declaration(source,'openRoomCase','  ');
function fixture(embed,activeSession=null,restore=true){
 const starts=[],restores=[];const state={cases:[{id:'shared-case'}],activeSession};
 const open=new Function('window','state','startCase','restoreClinicalSession',openRoomCase+';return openRoomCase;')({TraubeRoomEmbed:embed},state,async id=>starts.push(id),async(session,mode)=>{restores.push({session,mode});return restore;});
 return {open,starts,restores};
}
test('standalone simulator retains its case library',async()=>{
 const f=fixture();assert.equal(await f.open(),false);assert.deepEqual(f.starts,[]);
});
test('room simulator starts exactly the shared available case',async()=>{
 const f=fixture({kind:'simulator',caseId:'shared-case'});assert.equal(await f.open(),true);assert.deepEqual(f.starts,['shared-case']);
 assert.match(declaration(source,'load','  '),/if\(await openRoomCase\(\)\)return;/);
});
test('room simulator never substitutes an unavailable or unrelated case',async()=>{
 for(const embed of [{kind:'simulator',caseId:'missing'},{kind:'questions',caseId:'shared-case'},{kind:'simulator'}]){const f=fixture(embed);assert.equal(await f.open(),false);assert.deepEqual(f.starts,[]);}
});
test('room simulator resumes only its matching active session',async()=>{
 const session={id:'session',case_id:'shared-case'},f=fixture({kind:'simulator',caseId:'shared-case'},session);assert.equal(await f.open(),true);assert.deepEqual(f.restores,[{session,mode:'plantao-simulator'}]);assert.deepEqual(f.starts,[]);
 const other=fixture({kind:'simulator',caseId:'shared-case'},{case_id:'other'});await other.open();assert.deepEqual(other.restores,[]);assert.deepEqual(other.starts,['shared-case']);
});
test('failed restoration follows the existing start path and exit follows session cleanup',async()=>{
 const f=fixture({kind:'simulator',caseId:'shared-case'},{case_id:'shared-case'},false);await f.open();assert.deepEqual(f.starts,['shared-case']);
 const back=declaration(source,'backToLibrary','  ');assert(back.indexOf('traube:clinical-exit')>back.indexOf('showLibrary'));
});
