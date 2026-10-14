const test=require('node:test'),assert=require('node:assert/strict');
const {database,A,B,C}=require('./fixtures/social-db.cjs');
test('room settings, agenda and Spotify Jam preserve permissions and existing data',async t=>{
 const f=await database();t.after(()=>f.db.close());const feature=async(action,payload)=>(await f.db.query('select public.social_room_features($1,$2::jsonb) result',[action,JSON.stringify(payload)])).rows[0].result;
 await f.as(A);const room=(await f.command('create_room',{name:'Sala existente',visibility:'public',capacity:2})).id;await f.command('session_start',{room_id:room});
 await feature('room_update',{room_id:room,objective:'Revisar cardiologia'});assert.equal((await f.snapshot(room)).session.objective,'Revisar cardiologia');
 await feature('agenda_add',{room_id:room,title:'Síndromes coronarianas',scheduled_at:'2026-10-15T15:00:00Z',duration_minutes:25});const task=(await f.snapshot(room)).checklist[0];assert.equal(task.duration_minutes,25);
 await feature('jam',{room_id:room,url:'https://spotify.link/abc123'});assert.equal((await f.snapshot(room)).room.spotify_jam_url,'https://spotify.link/abc123');
 await assert.rejects(feature('jam',{room_id:room,url:'https://spotify.link.attacker.test/abc123'}));
 await f.as(B);await f.command('join_room',{room_id:room});await assert.rejects(feature('jam',{room_id:room,url:'https://spotify.link/xyz'}),/administradores/);await assert.rejects(feature('room_update',{room_id:room,name:'Outra sala'}),/administradores/);await assert.rejects(feature('agenda_remove',{room_id:room,id:task.id}),/autor/);
 await feature('material_add',{room_id:room,title:'Anotações privadas',url:'https://www.notion.so/notes',kind:'notion'});const resource=(await f.snapshot(room)).resources[0];assert.equal(resource.kind,'notion');await feature('material_remove',{room_id:room,id:resource.id});assert.equal((await f.snapshot(room)).resources.length,0);
 await f.as(A);await assert.rejects(feature('room_update',{room_id:room,capacity:1}),/vagas/);await assert.rejects(feature('room_update',{room_id:room,mode:'review'}),/Encerre/);
 const hall=await feature('hall',{});assert.equal(hall.rooms.length,1);assert.equal(hall.rooms[0].avatars.length,2);assert.equal(hall.current_room.id,room);
 await feature('agenda_edit',{room_id:room,id:task.id,title:'Novo objetivo',scheduled_at:'',duration_minutes:15});assert.equal((await f.snapshot(room)).checklist[0].scheduled_at,null);
 await f.as(C);await assert.rejects(feature('material_add',{room_id:room,title:'Sem permissão',url:'https://example.com',kind:'link'}),/Participação/);
 await f.as(null);await assert.rejects(feature('hall',{}),/Autenticação/);
 await f.db.exec('reset role');await f.db.exec('set role anon');await assert.rejects(feature('hall',{}),/permission denied/);
});
