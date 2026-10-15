const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const {database,A,B,C}=require('./fixtures/social-db.cjs');
test('competitive groups opt in atomically, retain data and enforce existing administrator permissions',async t=>{
 const f=await database();t.after(()=>f.db.close());await f.as(A);const legacy=await f.command('create_group',{name:'Grupo legado',objective:'Não apagar'});
 await f.db.exec('reset role');await f.db.exec(fs.readFileSync('supabase/migrations/20261015153556_social_group_competition.sql','utf8'));await f.db.exec(fs.readFileSync('supabase/migrations/20261015153556_social_group_competition.sql','utf8'));
 await f.as(A);let snapshot=await f.snapshot();assert.equal(snapshot.group_competition_available,true);assert.equal(snapshot.groups.find(g=>g.id===legacy.id).competitive,false);
 const competitive=await f.command('create_group',{name:'Competitivo',competitive:true});const plain=await f.command('create_group',{name:'Colaborativo',competitive:false});
 snapshot=await f.snapshot();assert.equal(snapshot.groups.find(g=>g.id===competitive.id).competitive,true);assert.equal(snapshot.groups.find(g=>g.id===plain.id).competitive,false);
 await assert.rejects(f.command('create_group',{name:'Payload inválido',competitive:'true'}),/Tipo de grupo inválido/);
 const invite=snapshot.groups.find(g=>g.id===competitive.id).invite;await f.as(B);await f.command('join_group',{code:invite});
 await assert.rejects(f.command('group_update',{group_id:competitive.id,competitive:false}),/Somente administradores/);
 await assert.rejects(f.db.query('update public.study_groups set competitive=false where id=$1',[competitive.id]),/permission denied/);
 await f.as(C);await assert.rejects(f.command('group_update',{group_id:competitive.id,competitive:false}),/Acesso negado/);
 await f.as(A);await f.command('group_update',{group_id:competitive.id,competitive:false});await f.command('group_update',{group_id:competitive.id,competitive:true});
 snapshot=await f.snapshot();const group=snapshot.groups.find(g=>g.id===competitive.id);assert.equal(group.competitive,true);assert.equal(group.members,2);assert.equal(snapshot.groups.find(g=>g.id===legacy.id).objective,'Não apagar');
 await assert.rejects(f.command('group_update',{group_id:competitive.id,competitive:null}),/Tipo de grupo inválido/);
});
