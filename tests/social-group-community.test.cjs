const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const {database,A,B,C}=require('./fixtures/social-db.cjs');
test('group community persists independently of rooms and enforces membership, authorship and moderation',async t=>{
 const f=await database();t.after(()=>f.db.close());await f.db.exec(fs.readFileSync('db/social_group_community.sql','utf8'));
 await f.as(A);const group=await f.command('create_group',{name:'Comunidade de teste',objective:'Revisão'}),g=group.id;
 const rpc=async(action,payload={})=>(await f.db.query('select public.social_group_community($1,$2::jsonb) result',[action,JSON.stringify({group_id:g,...payload})])).rows[0].result;
 let snapshot=await rpc('snapshot');assert.equal(snapshot.group.name,'Comunidade de teste');assert.equal(snapshot.entries.length,0);
 const post=await rpc('create',{kind:'post',title:'Plano da semana',body:'Discussão real',user_id:C});
 await rpc('pin',{id:post.id,pinned:true});snapshot=await rpc('snapshot');assert.equal(snapshot.entries[0].user_id,A);assert.equal(snapshot.entries[0].pinned,true);
 const code=(await f.snapshot()).groups.find(x=>x.id===g).invite;
 await f.as(B);await assert.rejects(rpc('snapshot'),/membros/);assert.equal((await f.db.query('select * from public.study_group_entries')).rows.length,0);
 await f.command('join_group',{code});assert.equal((await rpc('snapshot')).entries.length,1);
 await assert.rejects(rpc('pin',{id:post.id,pinned:false}),/permissão/);
 await assert.rejects(rpc('remove',{id:post.id}),/permissão/);
 const chatId='dddddddd-dddd-4ddd-8ddd-dddddddddddd';await rpc('create',{id:chatId,kind:'chat',body:'Olá <script>teste</script>'});await rpc('create',{id:chatId,kind:'chat',body:'Reenvio'});
 assert.equal((await rpc('snapshot')).entries.filter(x=>x.kind==='chat').length,1);
 await assert.rejects(f.db.query("insert into public.study_group_entries(group_id,user_id,kind,body) values($1,$2,'chat','Forjado')",[g,A]),/permission denied/);
 await assert.rejects(rpc('create',{kind:'material',title:'Link inválido',url:'javascript:alert(1)'}),/check constraint/);
 await assert.rejects(rpc('create',{kind:'material',title:'Credenciais',url:'https://user:pass@example.com'}),/check constraint/);
 const material=await rpc('create',{kind:'material',title:'Referência',url:'https://example.com/reference'});assert(material.id);
 const task=await rpc('create',{kind:'task',title:'Revisar referências'});await f.as(A);await rpc('complete',{id:task.id,completed:true});assert((await rpc('snapshot')).entries.find(x=>x.id===task.id).completed);
 await rpc('remove',{id:material.id});assert(!(await rpc('snapshot')).entries.some(x=>x.id===material.id));
 const tombstone=(await f.db.query('select * from public.study_group_entries where id=$1',[material.id])).rows[0];assert.equal(tombstone.url,null);assert.equal(tombstone.body,'');
 await f.as(C);await assert.rejects(rpc('older',{before:chatId}),/membros/);await assert.rejects(rpc('create',{kind:'chat',body:'Invasão'}),/membros/);
 await f.as(A);await f.command('group_remove',{group_id:g,user_id:B});await f.as(B);await assert.rejects(rpc('snapshot'),/membros/);
 assert.equal((await f.db.query('select * from public.study_group_entries')).rows.length,0);
 await f.db.exec('reset role;set role anon');await assert.rejects(f.db.query("select public.social_group_community('snapshot',$1::jsonb)",[JSON.stringify({group_id:g})]),/permission denied/);
});

test('group chat history uses a bounded cursor and spam is limited on the server',async t=>{
 const f=await database();t.after(()=>f.db.close());await f.db.exec(fs.readFileSync('db/social_group_community.sql','utf8'));await f.as(A);
 const {id:g}=await f.command('create_group',{name:'Histórico'});
 await f.db.exec('reset role');await f.db.query("insert into public.study_group_entries(group_id,user_id,kind,body,created_at) select $1,$2,'chat','Mensagem '||n,now()-make_interval(secs=>n) from generate_series(1,65) n",[g,A]);await f.as(A);
 const rpc=async(action,payload={})=>(await f.db.query('select public.social_group_community($1,$2::jsonb) result',[action,JSON.stringify({group_id:g,...payload})])).rows[0].result;
 const s=await rpc('snapshot');assert.equal(s.entries.length,60);const older=await rpc('older',{before:s.entries[0].id});assert.equal(older.length,5);assert(!older.some(e=>s.entries.some(x=>x.id===e.id)));
 for(let i=0;i<30;i++)await rpc('create',{kind:'chat',body:'Novo '+i});await assert.rejects(rpc('create',{kind:'chat',body:'Excesso'}),/Muitas tentativas/);
});
