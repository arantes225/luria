/* One social client for Amigos and Salas. Persisted state always comes from authenticated RPCs. */
(() => {
 'use strict';
 if(window.LuriaSocial)return;
 const $=id=>document.getElementById(id), esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const modes={free:'Estudo livre',focus:'Foco',together:'Questões em grupo',review:'Revisão compartilhada'};
 const icons={room:'<path d="M4 20V5a1 1 0 0 1 1-1h14v16M9 20V9h6v11M13 14h.01M3 20h18"/>',people:'<circle cx="9" cy="8" r="3"/><path d="M3 20v-3a5 5 0 0 1 10 0v3M16 5a3 3 0 0 1 0 6M17 14a4 4 0 0 1 4 4v2"/>',lock:'<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3"/>',mic:'<rect x="9" y="3" width="6" height="12" rx="3"/><path d="M5 10v2a7 7 0 0 0 14 0v-2M12 19v3M9 22h6"/>',focus:'<circle cx="12" cy="13" r="8"/><path d="M9 2h6M12 5v-3M12 9v5l3 2"/>',rat:'<path d="M4 14a8 8 0 0 1 15-3l2 4-3 3H9a5 5 0 0 1-5-4ZM8 7a3 3 0 1 1 4-3M15 6a3 3 0 1 1 4 3M4 14c-5-2-3-6-1-6M15 12h.01M5 21h13"/>'};
 const icon=name=>`<svg class="social-icon" viewBox="0 0 24 24" aria-hidden="true">${icons[name]||icons.room}</svg>`;
 Object.assign(icons,{crown:'<path d="m3 7 4 4 5-7 5 7 4-4-2 13H5L3 7Zm3 9h12"/>',reply:'<path d="m9 5-6 6 6 6M3 11h10a7 7 0 0 1 7 7"/>',thanks:'<path d="M7 20H3V9h4m0 11V9l4-6h2v6h6l2 3-3 8H7Z"/>',agree:'<path d="m5 12 4 4 10-10"/>',celebrate:'<path d="m3 21 5-15 10 10-15 5Zm10-18v3m5-1 2-2m-1 8h3"/>',material:'<path d="M5 3h9l5 5v13H5V3Zm9 0v5h5M8 12h8M8 16h6"/>'});
 let owner=null,epoch=0,roomId=null,state=null,rooms=[],social=null,messages=[],presence={},channel=null,socialChannel=null,refreshTimer=null,tickTimer=null;
 let snapshotFlight=null,needsRefresh=false,replyTo=null,lastTyping=0,typingTimers=new Map(),unread=0,dialogKind='room',returnFocus=null,pendingFile=null,pendingSend=null,filterTimer=null,roomOffset=0,hallRequest=0;
 const friendChannels=new Map();let hasOlder=false,newerPending=false,lastSeen=null;
 let leaveFlight=null;
 let agendaEdit=null,materialUpload=null,quizChoice=null,quizCount=null,quizFinished=null;
 const safeUrl=value=>{try{const u=new URL(value);return u.protocol==='https:'?u.href:null;}catch{return null;}};
 const jamUrl=value=>{try{const u=new URL(value);return u.protocol==='https:'&&!u.username&&!u.password&&((u.hostname==='spotify.link'&&/^\/[A-Za-z0-9]+$/.test(u.pathname))||(u.hostname==='open.spotify.com'&&/^\/(jam|socialsession)\/[A-Za-z0-9_-]+$/.test(u.pathname)))?u.href:null;}catch{return null;}};
 const avatar=(name,url)=>{const safe=safeUrl(url);return `<span class="friend-avatar">${safe?`<img src="${esc(safe)}" alt="" loading="lazy">`:esc((name||'U').slice(0,1).toUpperCase())}</span>`;};
 function filterGroups(){const q=($('sg-search')?.value||'').trim().toLocaleLowerCase('pt-BR');let count=0;$('social-groups')?.querySelectorAll('[data-group-name]').forEach(card=>{card.hidden=!card.dataset.groupName.includes(q);if(!card.hidden)count++;});if($('sg-search-empty'))$('sg-search-empty').hidden=!q||count>0;}
 function status(text,error=false){const el=$('social-status');if(el){el.textContent=text;el.classList.toggle('is-error',error);}}
 function failure(error){if(error?.stale)return;status(error?.message||'Não foi possível completar a ação. Tente novamente.',true);}
 async function rpc(name,args){const e=epoch;const {data,error}=await window.supabaseClient.rpc(name,args);if(e!==epoch)throw Object.assign(new Error('A sessão de usuário mudou.'),{stale:true});if(error)throw error;return data;}
 const command=(action,payload={})=>rpc('social_command',{p_action:action,p_payload:payload});
 const features=(action,payload={})=>rpc('social_room_features',{p_action:action,p_payload:payload});
 const roomFeatures=(action,payload={})=>features(action,{...payload,room_id:roomId});
 const roomCommand=(action,payload={})=>{if(!roomId)throw new Error('Entre em uma sala.');return command(action,{...payload,room_id:roomId});};
 const on=(id,event,handler)=>$(id)?.addEventListener(event,e=>{if(event==='submit')e.preventDefault();Promise.resolve().then(()=>handler(e)).catch(failure);});
 const wire=(root,attribute,handler)=>root?.querySelectorAll(`[${attribute}]`).forEach(button=>button.addEventListener('click',()=>Promise.resolve(handler(button.getAttribute(attribute),button)).catch(failure)));
 async function run(button,work){if(button?.disabled)return; if(button)button.disabled=true;try{return await work();}finally{if(button)button.disabled=false;}}
 async function copy(text){try{await navigator.clipboard.writeText(text);status('Convite copiado.');}catch{await window.LuriaDialog.prompt('Copie o convite:',text);}}
 function invitation(kind,code){const u=new URL('/amigos/',location.origin);u.searchParams.set(kind==='group'?'group_invite':'invite',code);u.hash='#community-rooms';return u.href;}
 const emptyState=(name,title,copy)=>`<div class="friends-empty sc-social-empty">${icon(name)}<strong>${esc(title)}</strong><p>${esc(copy)}</p></div>`;
 async function refreshSocial(){
  const data=await rpc('social_snapshot',{p_room_id:null});social=data||{};
  if(Array.isArray(social.friends)){friendsRowsCache=social.friends;renderFriendsList();renderStudyratsFriendOptions();}
  await updateFriendPresence();
  $('social-discoverable').checked=!!social.discoverable;$('social-share-status').checked=!!social.share_status;
  const requests=social.requests||[];$('social-request-count').textContent=requests.length?`(${requests.length})`:'';
  $('social-requests').innerHTML=requests.length?requests.map(r=>`<div class="social-row">${avatar(r.name)}<div class="social-row-copy"><strong>${esc(r.name)}</strong><small>${r.incoming?'Solicitação recebida':'Aguardando aceite'}</small></div><div class="social-actions">${r.incoming?`<button class="button secondary" data-request-accept="${esc(r.id)}" type="button">Aceitar</button>`:''}<button class="button secondary" data-request-decline="${esc(r.id)}" type="button">${r.incoming?'Recusar':'Cancelar'}</button></div></div>`).join(''):emptyState('agree','Tudo em dia','Nenhuma solicitação pendente.');
  wire($('social-requests'),'data-request-accept',async id=>{await command('friend_accept',{id});await window.loadFriends();await refreshSocial();});
  wire($('social-requests'),'data-request-decline',async id=>{await command('friend_decline',{id});await refreshSocial();});
  $('social-blocks').innerHTML=(social.blocks||[]).map(b=>`<div class="social-row"><span class="social-row-copy">${esc(b.name||'Usuário bloqueado')}</span><button class="button secondary" data-unblock="${esc(b.user_id)}" type="button">Desbloquear</button></div>`).join('');
  wire($('social-blocks'),'data-unblock',async user_id=>{await command('unblock',{user_id});await refreshSocial();});
  const suggestions=social.suggestions||[];
  $('social-suggestions').innerHTML=suggestions.length?suggestions.map(s=>`<div class="social-row">${avatar(s.display_name)}<div class="social-row-copy"><strong>${esc(s.display_name)}</strong><small>${Number(s.shared_groups)>0?`${Number(s.shared_groups)} grupo(s) em comum`:esc(s.specialty||'Interesses em comum')}</small></div><button class="button secondary" data-suggest="${esc(s.luria_id)}" type="button">Convidar</button></div>`).join(''):emptyState('people','Novas conexões, no seu ritmo','As sugestões aparecem quando há perfis autorizados com interesses ou grupos em comum.');
  wire($('social-suggestions'),'data-suggest',async(luria_id,button)=>run(button,async()=>{await rpc('add_friend_by_luria_id',{p_luria_id:luria_id});await refreshSocial();status('Solicitação enviada.');}));
  const groups=social.groups||[];
  const expandedGroups=new Set([...$('social-groups').querySelectorAll('.sg-details[open]')].map(d=>d.closest('[data-group-name]').dataset.groupName));
  $('social-groups').innerHTML=(groups.length?groups.map((g,i)=>`<article class="sg-card" data-group-name="${esc(g.name.toLocaleLowerCase('pt-BR'))}"><div class="sg-cover" data-tone="${i%3}"><span class="sg-emblem">${icon('people')}</span><span class="sg-type">${g.competitive===true?'Competitivo':'Comunidade de estudos'}</span></div><div class="sg-card-body"><div class="sg-title"><h3>${esc(g.name)}</h3><span class="social-badge">${esc(g.area||'Estudo em grupo')}</span></div><p class="sg-description">${esc(g.description||'Um espaço para compartilhar conhecimento com sua turma.')}</p><div class="sg-meta"><span>${icon('people')} ${Number(g.members)} ${Number(g.members)===1?'membro':'membros'}</span><span>${g.role==='admin'?'Administrador':'Participante'}</span></div><details class="sg-details"><summary data-group-open="${esc(g.id)}">Abrir comunidade <span aria-hidden="true">↗</span></summary><div class="sg-interior"><div class="sg-objective"><small>Objetivo compartilhado</small><p>${esc(g.objective||'Defina um objetivo com a turma.')}</p>${g.role==='admin'?`<button class="button secondary" data-group-goal="${esc(g.id)}" type="button">Editar objetivo</button>`:''}</div><div class="sg-section-heading"><h4>Estude com o grupo</h4><p>As atividades ao vivo acontecem nas salas.</p></div><div class="sg-room-actions"><button class="button primary" data-group-room="${esc(g.id)}" type="button">Criar sala do grupo</button><button class="button secondary" data-group-rooms="${esc(g.id)}" type="button">Ver salas</button></div><div class="sg-tools">${social.group_competition_available===true&&g.role==='admin'?`<button class="button secondary" data-group-competition="${esc(g.id)}" type="button">${g.competitive?'Desativar competição':'Ativar competição'}</button>`:''}<button class="button secondary" data-group-members="${esc(g.id)}" type="button">${icon('people')} Participantes</button><button class="button secondary" data-group-history="${esc(g.id)}" type="button">Histórico de sessões</button>${g.role==='admin'?`<button class="button secondary" data-group-invite="${esc(g.id)}" type="button">Copiar convite</button>`:''}</div><div id="social-group-members-${esc(g.id)}" class="social-list sg-content" aria-live="polite" hidden></div></div></details></div></article>`).join(''):'<div class="sg-empty"><span class="sg-emblem">'+icon('people')+'</span><h3>Sua próxima turma começa aqui</h3><p>Crie um grupo permanente ou entre com um convite para organizar os estudos.</p></div>')+'<button class="button secondary" id="social-group-join" type="button">Entrar com convite</button>';
  $('social-groups').querySelectorAll('.sg-details').forEach(d=>{d.open=expandedGroups.has(d.closest('[data-group-name]').dataset.groupName);});
  filterGroups();
  $('social-room-group').innerHTML='<option value="">Sem grupo</option>'+groups.map(g=>`<option value="${esc(g.id)}">${esc(g.name)}</option>`).join('');
  wire($('social-groups'),'data-group-room',id=>openCreate('room',id));
  wire($('social-groups'),'data-group-rooms',async()=>{window.dispatchEvent(new Event('luria:open-rooms'));$('social-room-scope').value='groups';await refreshHall();});
  wire($('social-groups'),'data-group-history',async id=>{const host=$('social-group-members-'+id);host.hidden=false;const history=await command('group_history',{group_id:id});host.innerHTML=history.length?history.map(s=>`<div class="social-row"><span class="social-row-copy"><strong>${esc(s.room_name)}</strong><small>${modes[s.mode]} · ${new Date(s.created_at).toLocaleDateString('pt-BR')} · ${s.status==='finished'?'Concluída':'Em andamento'}</small><small>${esc(s.objective)}</small></span></div>`).join(''):'<p>Nenhuma sessão do grupo registrada ainda.</p>';});
  wire($('social-groups'),'data-group-invite',async id=>{const g=groups.find(g=>g.id===id);let code=g.invite;if(!code)code=(await command('group_invite',{group_id:id})).code;await copy(invitation('group',code));});
  wire($('social-groups'),'data-group-competition',async id=>{const group=groups.find(g=>g.id===id);if(!group)return;const enable=group.competitive!==true;if(!await window.LuriaDialog.confirm(enable?'Ativar a competição deste grupo?':'Desativar a competição? O histórico e as personalizações serão preservados.'))return;await command('group_update',{group_id:id,competitive:enable});await refreshSocial();status(enable?'Competição ativada.':'Competição desativada. Histórico preservado.');});
  wire($('social-groups'),'data-group-goal',async id=>{const value=await window.LuriaDialog.prompt('Objetivo compartilhado:',groups.find(g=>g.id===id)?.objective||'');if(value!==null){await command('group_update',{group_id:id,objective:value});await refreshSocial();}});
  wire($('social-groups'),'data-group-members',async id=>{
   const host=$('social-group-members-'+id);host.hidden=!host.hidden;if(host.hidden)return;
   const members=await command('group_members',{group_id:id}),g=groups.find(g=>g.id===id);
   host.innerHTML=members.map(m=>`<div class="social-row sg-member">${avatar(m.name)}<span class="social-row-copy">${esc(m.name)} · ${m.role==='admin'?'Administrador':'Participante'}</span>${g.role==='admin'&&g.owner_id!==m.user_id?`<button class="button secondary" data-group-role="${esc(m.user_id)}" type="button">${m.role==='admin'?'Tornar participante':'Tornar administrador'}</button><button class="button secondary" data-group-remove="${esc(m.user_id)}" type="button">Remover</button>`:''}</div>`).join('');
   wire(host,'data-group-role',async uid=>{await command('group_admin',{group_id:id,user_id:uid,admin:members.find(m=>m.user_id===uid).role!=='admin'});await refreshSocial();});
   wire(host,'data-group-remove',async uid=>{if(await window.LuriaDialog.confirm('Remover este participante do grupo?')){await command('group_remove',{group_id:id,user_id:uid});await refreshSocial();}});
  });
  on('social-group-join','click',async()=>{const code=await window.LuriaDialog.prompt('Código de convite do grupo:','');if(code){await command('join_group',{code:parseCode(code,'group_invite')});await refreshSocial();}});
 }
 async function updateFriendPresence(){
  if(!owner||!window.supabaseClient.realtime)return;
  const visible=new Set(Array.from($('friends-list').querySelectorAll('[data-friend-presence]')).slice(0,24).map(el=>el.dataset.friendPresence));
  const desired=new Set((social?.friends||[]).filter(f=>f.share_status&&visible.has(f.user_id)).map(f=>f.user_id));
  for(const[id,c]of friendChannels)if(!desired.has(id)){friendChannels.delete(id);await window.supabaseClient.removeChannel(c);}
  for(const id of desired){
   let c=friendChannels.get(id);
   const paint=()=>{const entries=c.presenceState?.()[id]||[];const el=Array.from($('friends-list').querySelectorAll('[data-friend-presence]')).find(el=>el.dataset.friendPresence===id);if(el)el.textContent=entries.length?(entries.some(p=>p.studying)?'Estudando agora':'Online'):'Offline';};
   if(c){paint();continue;}
   c=window.supabaseClient.channel('social-presence:'+id,{config:{private:true}});friendChannels.set(id,c);
   c.on('presence',{event:'sync'},paint).subscribe();
  }
 }
 function parseCode(value,param='invite'){try{return new URL(value).searchParams.get(param)||value.trim();}catch{return value.trim();}}
 function openCreate(kind='room',group=''){
  dialogKind=kind;returnFocus=document.activeElement;const form=$('social-dialog-form');form.reset();
  $('social-dialog-title').textContent=kind==='group'?'Criar grupo de estudo':kind==='edit'?'Configurações da sala':'Criar sala';$('friends-room-create').textContent=kind==='group'?'Criar grupo':kind==='edit'?'Salvar alterações':'Criar sala';
  const type=$('social-group-type');if(type){const available=kind==='group'&&social.group_competition_available===true;type.hidden=!available;type.disabled=!available;}
  $('social-group-fields').hidden=kind!=='group';$('social-room-group').value=group;
  form.querySelectorAll('.social-form-grid label').forEach(label=>{const input=label.querySelector('input,select');const show=kind!=='group'||['name','description','area'].includes(input?.name);label.hidden=!show;if(input)input.disabled=!show;});
  form.querySelector('[name="objective"]').closest('label').hidden=kind==='group';form.querySelector('[name="voice"]').closest('label').hidden=kind==='group';
  $('friends-room-status').textContent=kind==='group'?'O grupo permanece disponível entre sessões.':'O convite será gerado ao criar a sala e expira em 7 dias.';
  if(kind==='edit'){
   const room=state.room;for(const name of ['name','description','area','subject','objective','visibility','capacity','mode'])form.elements[name].value=room[name]??'';
   for(const [name,key]of [['duration','duration_minutes'],['focus','focus_minutes'],['break','break_minutes']])form.elements[name].value=room[key];
   form.elements.voice.checked=room.voice_enabled;form.elements.group_id.value=room.group_id||'';form.elements.group_id.disabled=true;form.elements.mode.disabled=!!state.session;
   $('friends-room-status').textContent='As alterações ficam disponíveis para todos. O modo pode mudar após encerrar a sessão atual.';
  }
  const dialog=$('social-dialog');if(dialog.showModal)dialog.showModal();else dialog.setAttribute('open','');$('friends-room-name').focus();
 }
 function closeCreate(){const d=$('social-dialog');if(d.close)d.close();else d.removeAttribute('open');returnFocus?.focus();}
 async function create(e){
  e.preventDefault();const form=e.target;if(!form.reportValidity())return;
  await run($('friends-room-create'),async()=>{
   const data=Object.fromEntries(new FormData(form));data.voice=form.elements.voice.checked;
   if(dialogKind==='group'){data.objective=data.group_objective;if(!$('social-group-type')?.disabled)data.competitive=data.competitive==='true';else delete data.competitive;}else delete data.competitive;
   if(dialogKind==='edit'){await roomFeatures('room_update',data);closeCreate();await refreshRoom();await refreshHall();status('Configurações atualizadas.');return;}
   const created=await command(dialogKind==='group'?'create_group':'create_room',data);
   closeCreate();await refreshSocial();if(dialogKind==='room')await enter({room_id:created.id});else status('Grupo criado. Convide sua turma.');
  });
 }
 async function refreshHall(append=false){
  const request=++hallRequest,offset=append?roomOffset:0;
  const hall=await features('hall',{query:$('social-room-search').value,mode:$('social-room-mode').value,scope:$('social-room-scope').value,offset}),found=hall.rooms||[];
  if(request!==hallRequest)return;
  rooms=append?[...rooms,...found]:found||[];roomOffset=offset+(found?.length||0);
  const wall=$('social-jam-wall');
  const jams=rooms.filter(r=>{const at=Date.parse(r.spotify_jam_shared_at);return r.spotify_jam_url&&Number.isFinite(at)&&at<=Date.now()&&Date.now()-at<4*60*60*1000&&jamUrl(r.spotify_jam_url);});
  if(wall){wall.innerHTML=jams.length?jams.map(r=>`<article class="social-room-card"><div class="social-room-meta"><span class="social-badge">${r.visibility==='private'?'Sala privada':'Sala pública'}</span><span>Convite compartilhado</span></div><h3>${esc(r.name)}</h3><p>${esc(r.subject||r.area||'Estudo em companhia')}</p><small>Compartilhado às ${esc(new Date(r.spotify_jam_shared_at).toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'}))} · exibido por 4 horas</small><div class="social-actions"><a class="button primary" href="${esc(jamUrl(r.spotify_jam_url))}" target="_blank" rel="noopener noreferrer">Entrar na Jam</a><button class="button secondary" type="button" data-jam-room="${esc(r.id)}">Ver sala</button></div></article>`).join(''):'<p class="friends-empty">Nenhum convite recente nestas salas. Entre em uma sala e compartilhe o link de uma Jam.</p>';wire(wall,'data-jam-room',id=>enter({room_id:id}));}
  const host=$('social-rooms');host.innerHTML=rooms.length?rooms.slice().sort((a,b)=>Number(b.owner_id===owner.id)-Number(a.owner_id===owner.id)||Number(!!b.friend_room)-Number(!!a.friend_room)).map(r=>`<article class="social-room-card sl-room-card" data-room-mode="${esc(r.mode)}"><div class="sl-room-cover">${icon(r.mode==='focus'?'focus':r.mode==='review'?'material':r.mode==='together'?'people':'room')}<span>${modes[r.mode]||modes.free}</span></div><div class="social-room-meta"><span class="social-badge">${icon(r.visibility==='private'?'lock':'room')} ${r.visibility==='private'?'Privada':'Pública'}</span>${r.owner_id===owner.id?'<span class="sv-own-room">Minha sala</span>':''}${r.session_status?'<span>Sessão ativa</span>':'<span>Pronta para estudar</span>'}</div><h3>${esc(r.name)}</h3><p>${esc(r.objective||r.description||'Um espaço para estudar em companhia.')}</p><div class="social-room-meta"><span>${esc(r.subject||r.area||'Matéria a definir')}</span><span>${icon('people')} ${Number(r.participants)}/${Number(r.capacity)} vagas ocupadas</span></div><div class="social-room-meta">${r.voice_enabled?`<span>${icon('mic')} Voz permitida</span>`:''}</div><button type="button" class="button primary" data-room-enter="${esc(r.id)}">Entrar</button></article>`).join(''):emptyState('room','Nenhuma sala encontrada.','Ajuste a busca e os filtros, crie uma sala ou entre com um convite.');
  wire(host,'data-room-enter',async(id,b)=>run(b,()=>enter({room_id:id})));$('social-rooms-more').hidden=(found?.length||0)<24;
  host.querySelectorAll('[data-room-enter]').forEach(button=>{const room=rooms.find(r=>r.id===button.dataset.roomEnter);if(room?.avatars?.length){const row=document.createElement('div');row.className='social-room-meta';row.setAttribute('aria-label','Participantes com perfil disponível');row.innerHTML=room.avatars.map(p=>avatar(p.name,p.avatar_url)).join('');button.before(row);}});
  const current=$('social-current-room');current.hidden=!hall.current_room;
  if(hall.current_room){current.innerHTML=`<h3>Voltar à minha sala</h3><p>${esc(hall.current_room.name)} · ${esc(modes[hall.current_room.mode])} · ${hall.current_room.status==='paused'?'Pausada':'Sessão em andamento'}</p><button class="button primary" type="button" data-current-room="${esc(hall.current_room.id)}">Voltar à sala</button>`;wire(current,'data-current-room',id=>enter({room_id:id}));}
  host.querySelectorAll('[data-room-enter]').forEach(button=>{const r=rooms.find(r=>r.id===button.dataset.roomEnter);if(Number(r?.unread)>0){const badge=document.createElement('span');badge.className='social-badge';badge.textContent=`${Number(r.unread)} não lida(s)`;button.closest('article').querySelector('.social-room-meta').append(badge);}});
 }
 function draftKey(id=roomId){return owner&&id?`luria:social-draft:${owner.id}:${id}`:null;}
 function saveDraft(){const k=draftKey();if(k)try{sessionStorage.setItem(k,$('social-message-text').value);}catch{}}
 async function teardownRoom(){
  document.body.classList.remove('social-in-room');
  saveDraft();epoch++;snapshotFlight=null;needsRefresh=false;clearTimeout(refreshTimer);clearInterval(tickTimer);tickTimer=null;
  typingTimers.forEach(t=>clearTimeout(t));typingTimers.clear();await window.LuriaVoice?.leave();
  const old=channel;channel=null;if(old)await window.supabaseClient.removeChannel(old);
  roomId=null;state=null;presence={};messages=[];replyTo=null;pendingFile=null;pendingSend=null;unread=0;
  agendaEdit=null;materialUpload=null;quizChoice=null;quizCount=null;quizFinished=null;
  hasOlder=false;newerPending=false;lastSeen=null;
 }
 async function enter(payload){
  if(leaveFlight)await leaveFlight;
  const joined=await command('join_room',payload);
  if(roomId!==joined.id)await teardownRoom();roomId=joined.id;messages=[];state=null;
  $('community-rooms').hidden=true;$('social-room').hidden=false;window.dispatchEvent(new Event('luria:open-rooms'));
  document.body.classList.add('social-in-room');
  history.replaceState(null,'',location.pathname+location.search+'#room='+encodeURIComponent(roomId));
  $('social-message-text').value='';try{$('social-message-text').value=sessionStorage.getItem(draftKey())||'';}catch{}
  await refreshRoom();await loadMessages();await subscribe();
  tickTimer=setInterval(tick,1000);tick();status('');
 }
 function leave({navigateHall=true}={}){
  if(leaveFlight)return leaveFlight;
  if(!roomId){window.LuriaVoice?.leave();return Promise.resolve();}const id=roomId;
  const voiceEnd=window.LuriaVoice?.leave();
  $('social-room').hidden=true;$('community-rooms').hidden=false;
  document.body.classList.remove('social-in-room');
  if(navigateHall)history.replaceState(null,'',location.pathname+location.search+'#community-rooms');
  leaveFlight=(async()=>{try{await voiceEnd;await command('leave_room',{room_id:id});}finally{await teardownRoom();}await refreshHall();})().finally(()=>{leaveFlight=null;});
  return leaveFlight;
 }
 async function refreshRoom(){
  if(!roomId)return;if(snapshotFlight){needsRefresh=true;return snapshotFlight;}
  const id=roomId,e=epoch;
  snapshotFlight=(async()=>{const data=await rpc('social_snapshot',{p_room_id:id});if(id!==roomId||e!==epoch)return;state=data;state.clockOffset=Date.parse(data.server_now)-Date.now();renderRoom();})().finally(()=>{if(e===epoch){snapshotFlight=null;if(needsRefresh){needsRefresh=false;scheduleRefresh();}}});
  return snapshotFlight;
 }
 function scheduleRefresh(){clearTimeout(refreshTimer);refreshTimer=setTimeout(()=>refreshRoom().catch(async error=>{
  failure(error);if(/participa|acesso|histórico/i.test(error.message||'')){await teardownRoom();$('social-room').hidden=true;$('community-rooms').hidden=false;}
 }),120);}
 async function subscribe(){
  if(channel)await window.supabaseClient.removeChannel(channel);
  const id=roomId,e=epoch;await window.supabaseClient.realtime.setAuth();
  channel=window.supabaseClient.channel('study-room:'+id,{config:{private:true,presence:{key:owner.id},broadcast:{self:false}}});
  const update=()=>{if(e===epoch&&roomId===id)scheduleRefresh();};
  for(const table of ['study_room_sessions','study_room_members','study_room_checklist','study_room_resources','study_room_rounds'])channel.on('postgres_changes',{event:'*',schema:'public',table,filter:'room_id=eq.'+id},update);
  channel.on('postgres_changes',{event:'UPDATE',schema:'public',table:'study_rooms',filter:'id=eq.'+id},update);
  channel.on('postgres_changes',{event:'*',schema:'public',table:'study_room_messages',filter:'room_id=eq.'+id},payload=>{if(e===epoch){if(payload.eventType==='UPDATE')loadMessage(payload.new.id).catch(failure);else loadMessages().catch(failure);}});
  channel.on('postgres_changes',{event:'*',schema:'public',table:'study_room_reactions'},payload=>{if(e===epoch&&payload.new?.message_id)loadMessage(payload.new.message_id).catch(failure);else if(e===epoch)loadMessages(false,true).catch(failure);});
  channel.on('presence',{event:'sync'},()=>{if(e!==epoch)return;presence=channel.presenceState();renderParticipants();});
  channel.on('broadcast',{event:'typing'},({payload})=>{
   if(e!==epoch||!state?.members.some(m=>m.user_id===payload?.user_id)||payload.user_id===owner.id)return;
   clearTimeout(typingTimers.get(payload.user_id));typingTimers.set(payload.user_id,setTimeout(()=>{typingTimers.delete(payload.user_id);renderTyping();},3000));renderTyping();
  });
  channel.on('broadcast',{event:'voice-changed'},()=>window.LuriaVoice?.sync().catch(failure));
  channel.subscribe(async result=>{
   if(e!==epoch||id!==roomId)return;
   $('social-connection').textContent=result==='SUBSCRIBED'?'Conectado em tempo real':result==='CLOSED'?'Conexão encerrada':'Reconectando… suas mensagens continuam guardadas.';
   if(result==='SUBSCRIBED'){await channel.track({user_id:owner.id,studying:false,silent:$('social-silent').checked});await refreshRoom().catch(failure);await loadMessages().catch(failure);}
  });
 }
 function renderTyping(){$('social-typing').textContent=Array.from(typingTimers.keys()).map(uid=>state?.members.find(m=>m.user_id===uid)?.name).filter(Boolean).join(', ')+(typingTimers.size?' está digitando…':'');}
 function renderParticipants(){
  if(!state)return;const members=state.members||[],voice=window.LuriaVoice?.getState?.()||{};
  $('social-participants').innerHTML=members.map(m=>{const online=!!presence[m.user_id]?.length,studying=m.share_status&&presence[m.user_id]?.some(p=>p.studying),responded=state.quiz?.responded?.includes(m.user_id),inVoice=voice.active&&(m.user_id===owner.id||(voice.users||[]).includes(m.user_id)),speaks=(voice.speaking||[]).includes(m.user_id);return `<div class="social-participant ${speaks?'is-speaking':''}" data-participant="${esc(m.user_id)}">${avatar(m.name,m.avatar_url)}<span><strong>${esc(m.name)}${m.role==='admin'?'<span class="sv-admin-mark" title="Administrador">'+icon('crown')+'</span>':''}</strong><small>${responded?'Resposta enviada':studying?'Estudando':online?'Online':'Fora da sala'}</small>${inVoice?'<small data-voice-indicator>'+icon('mic')+(speaks?'Falando':m.user_id===owner.id&&voice.muted?'Microfone desligado':'Na voz')+'</small>':''}</span><span class="social-presence-dot ${online?'online':''}" aria-label="${online?'Online':'Offline'}"></span>${state.is_admin&&m.user_id!==state.room.owner_id&&m.user_id!==owner.id?`<details class="sv-participant-options"><summary aria-label="Opções de ${esc(m.name)}">⋯</summary><div class="sv-participant-menu"><button class="button secondary" data-kick="${esc(m.user_id)}" type="button">Remover participante</button>${state.room.owner_id===owner.id?`<button type="button" class="button secondary" data-room-role="${esc(m.user_id)}">${m.role==='admin'?'Retirar administrador':'Tornar administrador'}</button>`:''}</div></details>`:''}</div>`;}).join('');
  wire($('social-participants'),'data-kick',async uid=>{if(await window.LuriaDialog.confirm('Remover este participante da sala?')){await roomCommand('kick',{user_id:uid});await refreshRoom();}});
  wire($('social-participants'),'data-room-role',async uid=>{await roomCommand('room_admin',{user_id:uid,admin:members.find(m=>m.user_id===uid).role!=='admin'});await refreshRoom();});
  if($('social-online-count'))$('social-online-count').textContent=members.filter(m=>!!presence[m.user_id]?.length).length+' online';
  if($('social-voice-count'))$('social-voice-count').textContent=voice.active?(1+(voice.users||[]).filter(uid=>uid!==owner.id).length)+' na voz':'Voz opcional';
  if($('social-quiz-participants'))$('social-quiz-participants').innerHTML=state.quiz?members.map(m=>`<span>${avatar(m.name,m.avatar_url)}${esc(m.name)} · ${state.quiz.responded?.includes(m.user_id)?'Respondeu':presence[m.user_id]?.length?'Aguardando':'Desconectado'}</span>`).join(''):'';
 }
 function renderRoom(){
  if(!state)return;const {room,session,is_admin:admin}=state;
  $('social-room-title').textContent=room.name;$('social-room-subject').textContent=room.subject||room.area||'Estudo coletivo';$('social-room-objective').textContent=room.objective||room.description;
  $('social-session-mode').value=session?.mode||room.mode;$('social-session-mode').disabled=!admin||!!session;
  $('social-session-start').hidden=!admin||!!session;$('social-session-pause').hidden=!admin||!session;$('social-session-pause').textContent=session?.status==='paused'?'Retomar':'Pausar';
  $('social-session-next').hidden=!admin||session?.mode!=='focus';$('social-session-end').hidden=!admin||!session;
  $('social-session-goal').textContent=session?.objective||room.objective||'Defina seu objetivo e comece a estudar.';
  $('social-invite').hidden=!admin;$('social-room-admin').hidden=!admin;$('social-voice-join').disabled=!room.voice_enabled;
  $('social-room-settings').hidden=!admin;if($('social-goal-edit'))$('social-goal-edit').hidden=!admin;if($('social-strip-invite'))$('social-strip-invite').hidden=!admin;if($('social-music-share'))$('social-music-share').hidden=!admin;$('social-room').dataset.mode=session?.mode||room.mode;
  if(!room.voice_enabled&&window.LuriaVoice?.getState?.().active)window.LuriaVoice.leave();
  if(!window.LuriaVoice?.getState?.().active)$('social-voice-status').textContent=room.voice_enabled?'Voz opcional. O chat funciona mesmo sem microfone.':'Voz desabilitada nesta sala.';
  $('social-quiz').hidden=(session?.mode||room.mode)!=='together';$('social-quiz-start').hidden=!admin||!session;
  if(admin&&(session?.mode||room.mode)==='together'&&!$('social-question-list').options.length)roomCommand('quiz_lists').then(rows=>{$('social-question-list').innerHTML=rows.map(s=>`<option value="${esc(s.id)}">${esc(s.title)}</option>`).join('');}).catch(failure);
  $('social-checklist').innerHTML=(state.checklist||[]).slice().sort((a,b)=>(a.scheduled_at||a.created_at).localeCompare(b.scheduled_at||b.created_at)).map(c=>`<div class="social-row"><label class="social-check social-row-copy"><input type="checkbox" data-checklist="${esc(c.id)}" ${c.completed?'checked':''}><span>${esc(c.title)}<small>${c.scheduled_at?esc(new Date(c.scheduled_at).toLocaleString('pt-BR')):'Horário livre'}${c.duration_minutes?' · '+Number(c.duration_minutes)+' min':''} · ${c.completed?'Concluída':'A fazer'}</small></span></label>${admin||c.created_by===owner.id?`<button class="button secondary" type="button" data-agenda-edit="${esc(c.id)}">Editar</button><button class="button secondary" type="button" data-agenda-remove="${esc(c.id)}">Remover</button>`:''}</div>`).join('')||`<div class="sc-room-empty">${icon('focus')}<strong>Um passo de cada vez</strong><p>Adicione as etapas que a turma vai estudar.</p></div>`;
  wire($('social-checklist'),'data-agenda-edit',id=>{const task=state.checklist.find(c=>c.id===id);agendaEdit=id;$('social-checklist-text').value=task.title;const at=task.scheduled_at?new Date(task.scheduled_at):null;$('social-agenda-at').value=at?new Date(at.getTime()-at.getTimezoneOffset()*60000).toISOString().slice(0,16):'';$('social-agenda-duration').value=task.duration_minutes||25;$('social-checklist-form').querySelector('button[type="submit"]').textContent='Salvar atividade';$('social-agenda-cancel').hidden=false;window.dispatchEvent(new CustomEvent('luria:visual-open',{detail:'social-agenda-dialog'}));$('social-checklist-text').focus();});
  wire($('social-checklist'),'data-agenda-remove',async id=>{if(await window.LuriaDialog.confirm('Remover esta atividade da agenda?')){await roomFeatures('agenda_remove',{id});await refreshRoom();}});
  $('social-checklist').querySelectorAll('[data-checklist]').forEach(input=>input.addEventListener('change',()=>roomCommand('checklist_toggle',{id:input.dataset.checklist,completed:input.checked}).then(refreshRoom).catch(error=>{input.checked=!input.checked;failure(error);}))); 
  $('social-resources').innerHTML=(state.resources||[]).map(r=>`<div class="social-row">${icon('material')}<div class="social-row-copy">${r.attachment_path?`<button type="button" class="button secondary" data-material-open="${esc(r.id)}">${esc(r.title)}</button>`:`<a href="${esc(safeUrl(r.url)||'#')}" target="_blank" rel="noopener noreferrer">${esc(r.title)}</a>`}<small>${esc({link:'Link',pdf:'PDF',apostila:'Apostila',notes:'Anotações',questions:'Questões',flashcards:'Flashcards',notion:'Notion'}[r.kind]||'Material')} · ${esc(state.members.find(m=>m.user_id===r.created_by)?.name||'Compartilhado na sala')}${r.review_on?' · Revisar em '+esc(r.review_on):''}</small></div>${admin||r.created_by===owner.id?`<button class="button secondary" type="button" data-material-remove="${esc(r.id)}">Remover</button>`:''}</div>`).join('')||`<div class="sc-room-empty">${icon('material')}<strong>O conhecimento da turma, reunido</strong><p>Compartilhe uma lista, flashcards, anotações ou um PDF autorizado.</p></div>`;
  wire($('social-resources'),'data-material-open',id=>openAttachment(state.resources.find(r=>r.id===id)?.attachment_path));
  wire($('social-resources'),'data-material-remove',async id=>{if(await window.LuriaDialog.confirm('Remover o vínculo deste material da sala?')){await roomFeatures('material_remove',{id});await refreshRoom();}});
  $('social-session-history').innerHTML=(state.history||[]).map(s=>`<div class="social-row"><span class="social-row-copy">${modes[s.mode]} · ${new Date(s.created_at).toLocaleDateString('pt-BR')}<small>${esc(s.objective)}</small></span></div>`).join('')||'<p>Nenhuma sessão concluída ainda.</p>';
  $('social-jam-form').hidden=!admin;
  $('social-music-share').hidden=!admin;
  $('social-jam').innerHTML=room.spotify_jam_url?`<p>Convite oficial compartilhado. Confira a disponibilidade no Spotify.</p><a class="button primary" href="${esc(safeUrl(room.spotify_jam_url)||'#')}" target="_blank" rel="noopener noreferrer">Entrar na Jam</a><button class="button secondary" type="button" id="social-jam-copy">Copiar convite</button>${admin?'<button class="button secondary" type="button" id="social-jam-clear">Remover convite</button>':''}`:'<p>Sem convite da Jam · inicie no Spotify e compartilhe com a turma.</p>';
  if($('social-music-state'))$('social-music-state').textContent=room.spotify_jam_url?'Convite da Jam disponível':'Compartilhe o convite da sua Jam';
  $('social-jam-copy')?.addEventListener('click',()=>copy(room.spotify_jam_url));$('social-jam-clear')?.addEventListener('click',()=>roomFeatures('jam',{url:''}).then(refreshRoom).catch(failure));
  const progress=state.progress||[];const total=progress.reduce((sum,p)=>sum+Number(p.seconds||0),0);
  $('social-progress').innerHTML=`<div class="social-progress-row"><strong>Estudo registrado pela turma</strong><span>${Math.floor(total/60)} min</span></div>`+progress.map(p=>`<div class="social-progress-row"><span>${esc(p.name)}</span><span>${Math.floor(Number(p.seconds||0)/60)} min</span></div>`).join('')+'<small>Apenas atividades registradas e participantes que autorizam compartilhar seu progresso.</small>';
  $('social-ranking').innerHTML=(state.ranking||[]).length?state.ranking.map((r,i)=>`<div class="social-progress-row"><span>${i+1}. ${esc(r.name)}</span><span>${Number(r.correct)}/${Number(r.answered)} questões corretas</span></div>`).join(''):'<p>Os resultados aparecem depois das rodadas coletivas.</p>';
  renderVisualProgress();renderParticipants();renderQuiz();tick();window.dispatchEvent(new Event('luria:room-rendered'));
 }
 function alternatives(value){const text=v=>typeof v==='string'?v:typeof v?.text==='string'?v.text:typeof v?.texto==='string'?v.texto:'';return Array.isArray(value)?value.slice(0,5).map((v,i)=>[String.fromCharCode(65+i),text(v)]):Object.entries(value||{}).filter(([k])=>/^[A-E]$/i.test(k)).map(([k,v])=>[k.toUpperCase(),text(v)]);}
 function renderVisualProgress(){
  if(!$('social-goal-copy'))return;
  const tasks=state.checklist||[],done=tasks.filter(t=>t.completed).length,pct=tasks.length?Math.round(done/tasks.length*100):0;
  $('social-goal-copy').textContent=state.session?.objective||state.room.objective||'Qual é o próximo passo da turma? Defina um objetivo para esta sessão.';
  $('social-goal-percent').textContent=tasks.length?pct+'%':'—';$('social-goal-tasks').textContent=tasks.length?done+' de '+tasks.length+' etapas concluídas':'Adicione as etapas da sessão';$('social-goal-meter').value=pct;
  const progress=state.progress||[],seconds=progress.reduce((sum,p)=>sum+Number(p.seconds||0),0),target=(state.room.mode==='focus'?state.room.focus_minutes:state.room.duration_minutes)*60;
  $('social-progress').innerHTML=`<div class="social-progress-row"><span>Tempo registrado pela turma</span><strong>${Math.floor(seconds/60)} min</strong></div><small>Somente registros reais autorizados.</small>`;
  $('social-individual-progress').innerHTML=(state.members||[]).map(m=>{const p=progress.find(p=>p.user_id===m.user_id),time=p?Number(p.seconds||0):null;return `<div class="sv-progress-person">${avatar(m.name,m.avatar_url)}<div><strong>${esc(m.name)}</strong><small>${time===null?'Progresso privado':Math.floor(time/60)+' min registrados · '+Math.min(100,Math.floor(time/Math.max(1,target)*100))+'% da duração prevista'}</small></div></div>`;}).join('');
  $('social-plan-heading').textContent=(state.session?.mode||state.room.mode)==='review'?'Agenda da revisão':'Checklist coletivo';
  $('social-session-heading').textContent=(state.session?.mode||state.room.mode)==='focus'?'Seu espaço de foco':(state.session?.mode||state.room.mode)==='review'?'Sessão de revisão':'Sessão ao vivo';
  if(!(state.ranking||[]).length)$('social-ranking').textContent='';
 }
 function renderQuiz(){
  renderParticipants();
  const q=state?.quiz,host=$('social-question');$('social-question-next').hidden=!state?.is_admin||!q?.revealed_at;
  $('social-question-reveal').hidden=!q||!!q.revealed_at;
  if(q?.restricted){host.innerHTML='<p>Seu perfil precisa de acesso ao módulo de questões para acompanhar esta atividade.</p>';return;}
  if(!q){host.innerHTML='<p>O administrador seleciona uma lista. Cada pessoa responde sem ver as respostas dos colegas.</p>';return;}
  const opts=alternatives(q.alternatives);
  if(quizChoice?.id!==q.id||q.my_choice||q.revealed_at)quizChoice=null;
  if(quizCount?.id!==q.id){quizCount={id:q.id,total:null};const room=roomId;roomFeatures('quiz_info').then(info=>{if(room===roomId&&state.quiz?.id===q.id){quizCount={id:q.id,total:info.total};renderQuiz();}}).catch(failure);}
  const selected=q.my_choice||quizChoice?.choice;
  host.innerHTML=`<p>Questão ${Number(q.ordinal)+1}${quizCount?.total?' de '+Number(quizCount.total):''}${quizFinished===q.set_id?' · Lista concluída':''}</p><p class="social-question-stem">${esc(q.stem)}</p><p>${q.answered}/${q.total} responderam · <span id="social-quiz-time"></span></p>`+opts.map(([letter,text])=>`<button type="button" class="social-answer" data-correct="${!!q.revealed_at&&q.answer===letter}" data-answer="${letter}" aria-pressed="${selected===letter}" ${q.my_choice||q.revealed_at||!q.eligible?'disabled':''}><strong>${letter}.</strong> ${esc(text)}</button>`).join('')+(!q.my_choice&&!q.revealed_at&&q.eligible?`<button id="social-answer-submit" class="button primary" type="button" ${quizChoice?'':'disabled'}>Enviar resposta</button>`:'')+(q.revealed_at?`<div class="social-question-stem"><p>Gabarito: ${esc(q.answer||'Não informado na lista')}</p><section class="sv-question-comment"><h4>Comentário LURIA</h4><p>${esc(q.comment||'Comentário não disponível nesta lista.')}</p></section>${Object.entries(q.explanations||{}).map(([letter,text])=>`<p><strong>${esc(letter)}.</strong> ${esc(typeof text==='string'?text:text?.text||'')}</p>`).join('')}<p>Referência: ${esc(q.source||'Não informada na lista')}</p><div>${(q.results||[]).map(r=>`<p>${esc(state.members.find(m=>m.user_id===r.user_id)?.name||'Participante')}: ${esc(r.choice)} · ${r.correct?'Correta':'Revisar'}</p>`).join('')}</div></div>`:'<p>As respostas e justificativas ficam ocultas até todos responderem ou o prazo terminar.</p>');
  if(q.revealed_at){const summary=document.createElement('p');summary.textContent=`${(q.results||[]).filter(r=>r.correct).length} de ${q.total} participantes acertaram esta questão.`;host.append(summary);
   for(const ref of q.references||[]){const p=document.createElement('p');p.textContent=[ref.institution,ref.document,ref.year,ref.section].filter(Boolean).join(' · ');const url=safeUrl(ref.url);if(url){const a=document.createElement('a');a.href=url;a.target='_blank';a.rel='noopener noreferrer';a.textContent='Consultar referência';p.append(' ',a);}host.append(p);}
  }
  wire(host,'data-answer',choice=>{quizChoice={id:q.id,choice};renderQuiz();host.querySelector(`[data-answer="${choice}"]`)?.focus();});
  $('social-answer-submit')?.addEventListener('click',e=>run(e.target,async()=>{if(!quizChoice||quizChoice.id!==q.id)return;state.quiz=await roomCommand('quiz_answer',{id:q.id,choice:quizChoice.choice});quizChoice=null;renderQuiz();}).catch(failure));
  if(quizFinished===q.set_id)$('social-question-next').hidden=true;
 }
 let deadlineRequested=null,phaseRequested=null;
 function tick(){
  if(!state)return;const now=Date.now()+(state.clockOffset||0),s=state.session;
  let seconds=s?(s.status==='paused'?s.remaining_seconds:Math.max(0,Math.ceil((Date.parse(s.ends_at)-now)/1000))):(state.room.mode==='focus'?state.room.focus_minutes:state.room.duration_minutes)*60;
  if(!Number.isFinite(seconds))seconds=0;$('social-timer').textContent=`${String(Math.floor(seconds/60)).padStart(2,'0')}:${String(seconds%60).padStart(2,'0')}`;
  if($('social-session-meter')){$('social-session-meter').value=s?Math.max(0,Math.min(100,(1-seconds/Math.max(1,s.duration_seconds))*100)):0;$('social-next-break').textContent=s?.mode==='focus'?s.phase==='break'?'Próximo período: '+state.room.focus_minutes+' min de foco':'Próxima pausa: '+state.room.break_minutes+' min':s?.status==='paused'?'Sessão pausada pela turma':'O tempo coletivo não registra estudo automaticamente.';}
  $('social-phase').textContent=s?`${modes[s.mode]} · ${s.phase==='break'?'Intervalo':'Estudo'}${s.status==='paused'?' · Pausado':seconds===0?' · Período concluído':''}`:'Prontos para começar';
  if(s?.mode==='focus'&&s.status==='running'&&seconds===0&&phaseRequested!==s.ends_at){phaseRequested=s.ends_at;refreshRoom().catch(failure);}
  const q=state.quiz;if(q&&!q.revealed_at){const remaining=Math.max(0,Math.ceil((Date.parse(q.deadline)-now)/1000));if($('social-quiz-time'))$('social-quiz-time').textContent=`${remaining}s restantes`;if(remaining===0&&deadlineRequested!==q.id){deadlineRequested=q.id;roomCommand('quiz_reveal').then(data=>{if(state?.quiz?.id===data.id){state.quiz=data;renderQuiz();}}).catch(error=>{deadlineRequested=null;failure(error);});}}
 }
 function messageText(value){return String(value||'').split(/(https:\/\/[^\s<>]+|@[\p{L}\p{N}_.-]+)/u).map(part=>{
  if(part.startsWith('https://')){const u=safeUrl(part);if(u)return `<a href="${esc(u)}" target="_blank" rel="noopener noreferrer">${esc(part)}</a>`;}
  return part.startsWith('@')?`<strong>${esc(part)}</strong>`:esc(part);
 }).join('');}
 async function openAttachment(path){if(!path)return;const{data,error}=await window.supabaseClient.storage.from('study-room-attachments').createSignedUrl(path,60);if(error)throw error;const url=safeUrl(data.signedUrl);if(url)window.open(url,'_blank','noopener,noreferrer');}
 async function loadMessages(older=false,recent=false){
  if(!roomId)return;const id=roomId,e=epoch,log=$('social-messages'),nearBottom=log.scrollHeight-log.scrollTop-log.clientHeight<50;
  const incremental=!older&&!recent&&!!lastSeen;
  const cursor=older&&messages.length?{before:messages[0].created_at,before_id:messages[0].id}:incremental?{after:lastSeen.created_at,after_id:lastSeen.id}:{};
  const batch=await roomCommand('messages',cursor);if(id!==roomId||e!==epoch)return;
  const known=new Set(messages.map(m=>m.id));if(!older)unread+=batch.filter(m=>!known.has(m.id)&&m.user_id!==owner.id).length;
  const map=new Map(messages.map(m=>[m.id,m]));for(const m of batch)map.set(m.id,m);messages=Array.from(map.values()).sort((a,b)=>a.created_at.localeCompare(b.created_at)||a.id.localeCompare(b.id));
  if(!older&&batch.length){const candidate=batch.at(-1);if(!lastSeen||candidate.created_at>lastSeen.created_at||candidate.created_at===lastSeen.created_at&&candidate.id>lastSeen.id)lastSeen={created_at:candidate.created_at,id:candidate.id};}
  if(incremental)newerPending=batch.length===50;else if(!recent)hasOlder=batch.length===50;
  const top=log.scrollTop,height=log.scrollHeight;renderMessages();$('social-chat-older').hidden=!hasOlder&&!newerPending;$('social-chat-older').textContent=newerPending?'Carregar mensagens novas':'Mensagens anteriores';
  const reading=!document.hidden&&!$('community-rooms-panel').hidden;
  if(older)log.scrollTop=top+log.scrollHeight-height;else if(nearBottom&&reading){log.scrollTop=log.scrollHeight;unread=0;if(batch.length&&!newerPending)await roomCommand('read_messages');}updateUnread();
 }
 async function loadMessage(id){if(!roomId)return;const current=roomId,e=epoch,batch=await roomCommand('messages',{id});if(current!==roomId||e!==epoch)return;for(const row of batch){const index=messages.findIndex(m=>m.id===row.id);if(index>=0)messages[index]=row;}renderMessages();}
 function updateUnread(){$('social-unread').hidden=!unread;$('social-unread').textContent=String(unread);}
 function renderMessages(){
  $('social-messages').innerHTML=messages.length?messages.filter(m=>!(social?.blocks||[]).some(b=>b.user_id===m.user_id)).map(m=>{const reply=messages.find(x=>x.id===m.reply_to);const counts={thanks:0,agree:0,celebrate:0};for(const r of m.reactions||[])counts[r.reaction]=(counts[r.reaction]||0)+1;return `<article class="social-message ${m.user_id===owner.id?'is-mine':''}"><header>${avatar(m.display_name,m.avatar_url)}<strong>${esc(m.display_name||'Participante')}</strong><time datetime="${esc(m.created_at)}">${new Date(m.created_at).toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'})}</time></header>${m.reply_to?`<blockquote>${esc(reply?.body?.slice(0,100)||'Mensagem anterior')}</blockquote>`:''}<p>${messageText(m.body)}</p>${m.attachment_path?`<button type="button" data-attachment="${esc(m.id)}">${esc(m.attachment_name||'Abrir anexo')}</button>`:''}<div><button type="button" data-reply="${esc(m.id)}" aria-label="Responder mensagem" title="Responder">${icon('reply')}</button>${Object.entries({thanks:'Obrigado',agree:'Concordo',celebrate:'Celebrar'}).map(([key,label])=>`<button type="button" data-reaction="${esc(m.id)}:${key}" aria-label="${label}" title="${label}" data-count="${counts[key]}">${icon(key)}${counts[key]?' '+counts[key]:''}</button>`).join('')}${state?.is_admin?`<button type="button" data-moderate="${esc(m.id)}" aria-label="Moderar mensagem" title="Moderar">⋯</button>`:''}</div></article>`;}).join(''):`<div class="sc-room-empty">${icon('people')}<strong>A conversa começa com você.</strong><p>Troque ideias e combine o próximo passo com a turma.</p></div>`;
  wire($('social-messages'),'data-reply',id=>{replyTo=id;$('social-reply').hidden=false;$('social-reply').textContent='Respondendo: '+(messages.find(m=>m.id===id)?.body?.slice(0,100)||'Anexo');const b=document.createElement('button');b.type='button';b.textContent='Cancelar';b.className='button secondary';b.addEventListener('click',()=>{replyTo=null;$('social-reply').hidden=true;});$('social-reply').append(b);$('social-message-text').focus();});
  wire($('social-messages'),'data-reaction',async value=>{const[id,reaction]=value.split(':');await roomCommand('reaction',{id,reaction});await loadMessage(id);});
  wire($('social-messages'),'data-moderate',async id=>{if(await window.LuriaDialog.confirm('Remover o conteúdo desta mensagem?')){await roomCommand('moderate_message',{id});await loadMessage(id);}});
  wire($('social-messages'),'data-attachment',async id=>{const m=messages.find(m=>m.id===id);const {data,error}=await window.supabaseClient.storage.from('study-room-attachments').createSignedUrl(m.attachment_path,60);if(error)throw error;const url=safeUrl(data.signedUrl);if(url)window.open(url,'_blank','noopener,noreferrer');});
 }
 async function validateFile(file){
  const allowed={'application/pdf':['pdf'],'image/png':['png'],'image/jpeg':['jpg','jpeg'],'image/webp':['webp']};
  const ext=file.name.split('.').pop().toLowerCase();if(file.size>5242880||file.size===0||!allowed[file.type]?.includes(ext))throw new Error('Envie PDF, PNG, JPEG ou WebP de até 5 MB.');
  const bytes=new Uint8Array(await file.slice(0,12).arrayBuffer());const signature=Array.from(bytes).map(n=>String.fromCharCode(n)).join('');
  const valid=file.type==='application/pdf'?signature.startsWith('%PDF-'):file.type==='image/png'?bytes[0]===137&&signature.slice(1,4)==='PNG':file.type==='image/jpeg'?bytes[0]===255&&bytes[1]===216&&bytes[2]===255:signature.startsWith('RIFF')&&signature.slice(8,12)==='WEBP';
  if(!valid)throw new Error('O conteúdo do arquivo não corresponde ao formato informado.');return ext;
 }
 async function send(e){
  e.preventDefault();const body=$('social-message-text').value.trim();if(!body&&!pendingFile)return;
  const button=e.target.querySelector('button[type="submit"]');
  await run(button,async()=>{
   const id=roomId,ownerId=owner.id;saveDraft();$('social-send-status').textContent='Enviando…';
   if(!pendingSend||pendingSend.body!==body||pendingSend.file!==pendingFile||pendingSend.reply_to!==replyTo)pendingSend={client_id:crypto.randomUUID(),body,file:pendingFile,reply_to:replyTo};
   const payload=pendingSend;
   try{
    if(payload.file&&!payload.attachment_path){const ext=await validateFile(payload.file);const path=`${id}/${ownerId}/${payload.client_id}.${ext}`;const{error}=await window.supabaseClient.storage.from('study-room-attachments').upload(path,payload.file,{contentType:payload.file.type,upsert:false});if(error&&error.statusCode!=='409')throw error;payload.attachment_path=path;payload.attachment_name=payload.file.name.slice(0,160);}
    await command('send_message',{room_id:id,body:payload.body,client_id:payload.client_id,reply_to:payload.reply_to,attachment_path:payload.attachment_path,attachment_name:payload.attachment_name});
    if(id!==roomId)return;$('social-message-text').value='';pendingFile=null;pendingSend=null;replyTo=null;$('social-reply').hidden=true;$('social-message-file').value='';saveDraft();$('social-send-status').textContent='Mensagem enviada.';await loadMessages();
   }catch(error){$('social-send-status').textContent='Não enviada. Seu rascunho foi preservado; tente enviar novamente.';throw error;}
  });
 }
 async function study(){
  const timer=window.LuriaStudyTimer;if(!timer)throw new Error('Timer de estudo indisponível. Atualize a página.');
  const current=timer.getState();if(current?.sourceId===roomId){if(!await timer.finish('room_study_finished'))throw new Error('Não foi possível registrar seu estudo. Tente novamente.');$('social-study-toggle').textContent='Registrar meu estudo';await refreshRoom();}
  else{const started=await timer.start('study',{sourceId:roomId,area:state.room.area,materia:state.room.subject});if(started?.sourceId!==roomId)throw new Error('Finalize sua sessão atual antes de iniciar outra.');$('social-study-toggle').textContent='Concluir e registrar estudo';}
  await channel?.track({user_id:owner.id,studying:!!timer.getState()?.running,silent:$('social-silent').checked});
 }
 async function block(user_id){if(!await window.LuriaDialog.confirm('Bloquear esta pessoa? A amizade será removida.'))return;await command('block',{user_id});await window.loadFriends();await refreshSocial();}
 async function showProfile(user_id){const p=await command('profile',{user_id});await window.LuriaDialog.alert(`${p.name||'Usuário LURIA'}\nID ${p.luria_id||''}\n${p.specialty||'Especialidade não informada'}`);}
 async function inviteFriend(){window.dispatchEvent(new Event('luria:open-rooms'));if(state?.invite)await copy(invitation('room',state.invite));else{status('Crie uma sala e compartilhe o convite com seu amigo.');openCreate('room');}}
 async function adminSnapshot(){
  const data=await rpc('social_rooms_admin',{p_action:'snapshot',p_payload:{}}),form=$('social-admin-form');
  for(const key of ['daily_minutes','global_daily_minutes','max_capacity'])form.elements[key].value=data.settings[key]??'';$('social-admin-enabled').checked=data.settings.enabled;
  const gigabytes=(data.rooms||[]).reduce((sum,r)=>sum+Number(r.voice_seconds||0)*Math.max(0,Number(r.capacity)-1)*64000/8/1e9,0);
  $('social-admin-summary').innerHTML=`<p><strong>${Number(data.active_calls)} conexões de voz autorizadas</strong> · ${(Number(data.voice_seconds_today)/3600).toFixed(2)} h contabilizadas hoje · ${Number(data.sessions_completed)} sessões concluídas · ${Number(data.connection_failures)} falhas registradas no serviço.</p><p>Modelo de áudio: ${gigabytes.toFixed(4)} GB · US$ ${(gigabytes*.05).toFixed(4)} antes da franquia. Cenário com 64 kbps, todos os lugares ocupados e recebendo os demais microfones; não inclui overhead. Silêncio, lotação e rede alteram o consumo real.</p><p>A Cloudflare oferece 1.000 GB/mês compartilhados entre SFU e TURN. O uso restante da conta e os valores faturados devem ser conferidos no <a href="https://dash.cloudflare.com/" target="_blank" rel="noopener noreferrer">painel Cloudflare</a>. <a href="https://developers.cloudflare.com/realtime/sfu/platform/pricing/" target="_blank" rel="noopener noreferrer">Tabela de preços</a>. O teto aqui controla minutos autorizados, não garante um limite de cobrança.</p>`;
  $('social-admin-rooms').innerHTML=(data.rooms||[]).map(r=>`<form class="social-inline social-row" data-admin-room="${esc(r.id)}"><span class="social-row-copy"><strong>${esc(r.name)}</strong><small>${Number(r.voice_participants)} na voz · ${Number(r.active_sessions)} sessão(ões) ativa(s) · ${(Number(r.voice_seconds)/3600).toFixed(2)} h hoje</small></span><label><span>Capacidade</span><input name="capacity" type="number" min="2" max="8" required value="${Number(r.capacity)}"></label><label class="social-check"><input name="voice_enabled" type="checkbox" ${r.voice_enabled?'checked':''}>Voz</label><button type="submit" class="button secondary">Salvar sala</button></form>`).join('');
  $('social-admin-rooms').querySelectorAll('form').forEach(form=>form.addEventListener('submit',async e=>{e.preventDefault();try{await rpc('social_rooms_admin',{p_action:'room',p_payload:{room_id:form.dataset.adminRoom,capacity:Number(form.elements.capacity.value),voice_enabled:form.elements.voice_enabled.checked}});await adminSnapshot();await refreshHall();}catch(error){failure(error);}}));
 }
 function bind(){
  on('social-admin-refresh','click',adminSnapshot);on('social-admin-form','submit',async e=>{e.preventDefault();const data=Object.fromEntries(new FormData(e.target));data.enabled=$('social-admin-enabled').checked;await rpc('social_rooms_admin',{p_action:'settings',p_payload:data});await adminSnapshot();status('Limites de voz atualizados no servidor.');});
  on('social-room-settings','click',()=>openCreate('edit'));
  on('friends-create-room-toggle','click',()=>openCreate());on('friends-create-room-close','click',closeCreate);on('social-group-create','click',()=>openCreate('group'));on('social-dialog-form','submit',create);
  $('social-dialog').addEventListener('close',()=>returnFocus?.focus());
  on('social-join-form','submit',e=>{e.preventDefault();return enter({code:parseCode($('social-join-code').value)});});
  for(const id of ['social-room-search','social-room-mode','social-room-scope'])on(id,'input',()=>{clearTimeout(filterTimer);filterTimer=setTimeout(()=>refreshHall().catch(failure),220);});
  on('sg-search','input',filterGroups);
  on('social-rooms-more','click',()=>refreshHall(true));on('social-leave','click',leave);on('social-invite','click',()=>copy(invitation('room',state.invite)));
  on('social-invite-revoke','click',async()=>{if(await window.LuriaDialog.confirm('Revogar o convite atual e gerar outro?')){const {code}=await roomCommand('renew_invite');state.invite=code;await copy(invitation('room',code));}});
  on('social-room-archive','click',async()=>{if(await window.LuriaDialog.confirm('Arquivar esta sala e encerrar a sessão? O histórico será preservado.')){await window.LuriaVoice?.leave();await roomCommand('archive_room');await teardownRoom();$('social-room').hidden=true;$('community-rooms').hidden=false;await refreshHall();}});
  on('social-privacy-save','click',async()=>{await command('privacy',{discoverable:$('social-discoverable').checked,share_status:$('social-share-status').checked});await window.LuriaStudyPresence?.refresh();status('Preferências salvas.');});
  on('social-session-start','click',async e=>run(e.target,async()=>{await roomCommand('session_start',{mode:$('social-session-mode').value});await refreshRoom();}));
  on('social-session-mode','change',async()=>{if(!state?.is_admin||state.session)return;await roomFeatures('room_update',{mode:$('social-session-mode').value});await refreshRoom();});
  on('social-session-pause','click',async()=>{await roomCommand(state.session?.status==='paused'?'session_resume':'session_pause');await refreshRoom();});
  on('social-session-next','click',async()=>{await roomCommand('session_next');await refreshRoom();});on('social-session-end','click',async()=>{await roomCommand('session_end');await refreshRoom();});
  on('social-study-toggle','click',study);
  on('social-silent','change',async()=>{if($('social-silent').checked)window.LuriaVoice?.mute(true);await channel?.track({user_id:owner.id,studying:!!window.LuriaStudyTimer?.getState()?.running,silent:$('social-silent').checked});});
  const resetAgenda=()=>{agendaEdit=null;$('social-checklist-form').reset();$('social-checklist-form').querySelector('button[type="submit"]').textContent='Adicionar';$('social-agenda-cancel').hidden=true;};
  on('social-agenda-cancel','click',resetAgenda);
  on('social-checklist-form','submit',async e=>{e.preventDefault();const at=$('social-agenda-at').value;await roomFeatures(agendaEdit?'agenda_edit':'agenda_add',{id:agendaEdit,title:$('social-checklist-text').value,scheduled_at:at?new Date(at).toISOString():null,duration_minutes:Number($('social-agenda-duration').value)||null});resetAgenda();window.dispatchEvent(new CustomEvent('luria:visual-close',{detail:'social-agenda-dialog'}));await refreshRoom();});
  on('social-resource-file','change',e=>{materialUpload=null;$('social-resource-url').required=!e.target.files?.length;});
  on('social-resource-form','submit',async e=>{e.preventDefault();const id=roomId,file=$('social-resource-file').files?.[0],payload={room_id:id,title:$('social-resource-title').value,url:$('social-resource-url').value,kind:$('social-resource-kind').value,review_on:$('social-resource-date').value};
   if(file){const ext=await validateFile(file);if(!materialUpload||materialUpload.file!==file||materialUpload.room!==id)materialUpload={file,room:id,path:`${id}/${owner.id}/${crypto.randomUUID()}.${ext}`};const{error}=await window.supabaseClient.storage.from('study-room-attachments').upload(materialUpload.path,file,{contentType:file.type,upsert:false});if(error&&String(error.statusCode)!=='409')throw error;payload.attachment_path=materialUpload.path;payload.attachment_name=file.name.slice(0,160);}
   await features('material_add',payload);if(id!==roomId)return;e.target.reset();materialUpload=null;$('social-resource-url').required=true;window.dispatchEvent(new CustomEvent('luria:visual-close',{detail:'social-material-dialog'}));await refreshRoom();});
  on('social-jam-form','submit',async e=>{e.preventDefault();const value=$('social-jam-url').value.trim();if(value){const url=new URL(value);if(url.protocol!=='https:'||!['spotify.link','open.spotify.com'].includes(url.hostname)||url.username||url.password)throw new Error('Cole o convite oficial de uma Jam do Spotify.');}await roomFeatures('jam',{url:value});$('social-jam-url').value='';window.dispatchEvent(new CustomEvent('luria:visual-close',{detail:'social-music-dialog'}));await refreshRoom();});
  on('social-quiz-start','submit',async e=>{e.preventDefault();state.quiz=await roomCommand('quiz_start',{set_id:$('social-question-list').value,duration:Number($('social-question-duration').value)});renderQuiz();});
  on('social-question-next','click',async()=>{try{state.quiz=await roomCommand('quiz_start',{set_id:state.quiz.set_id,duration:Number($('social-question-duration').value)});quizFinished=null;renderQuiz();}catch(error){if(error.message?.includes('Lista concluída')){quizFinished=state.quiz.set_id;renderQuiz();status('Lista concluída. Os resultados da turma foram preservados.');}else throw error;}});
  on('social-question-reveal','click',async()=>{state.quiz=await roomCommand('quiz_reveal');renderQuiz();if(!state.quiz?.revealed_at)status('Aguardando todas as respostas ou o término do prazo.');});
  on('social-message-form','submit',send);on('social-chat-older','click',()=>loadMessages(!newerPending));
  on('social-message-text','input',()=>{saveDraft();if(channel&&Date.now()-lastTyping>1500){lastTyping=Date.now();return channel.send({type:'broadcast',event:'typing',payload:{user_id:owner.id}});}});
  on('social-message-file','change',async e=>{const file=e.target.files[0];if(file){await validateFile(file);pendingFile=file;$('social-send-status').textContent='Anexo: '+file.name;}else pendingFile=null;});
  $('social-messages').addEventListener('scroll',()=>{const log=$('social-messages');if(log.scrollHeight-log.scrollTop-log.clientHeight<50){unread=0;updateUnread();}});
  on('social-voice-join','click',async e=>run(e.target.closest('button'),()=>window.LuriaVoice.join(roomId,channel)));on('social-voice-mute','click',()=>window.LuriaVoice.toggleMute());on('social-voice-leave','click',()=>window.LuriaVoice.leave());
  on('social-voice-listen','click',()=>window.LuriaVoice.toggleListening());on('social-voice-play','click',()=>window.LuriaVoice.playIncoming());on('social-voice-device','change',e=>window.LuriaVoice.changeDevice(e.target.value));
  on('social-voice-ptt','change',async e=>{await window.LuriaVoice.setPushToTalk(e.target.checked);$('social-voice-hold').hidden=!e.target.checked;$('social-voice-mute').disabled=e.target.checked;});
  const hold=$('social-voice-hold'),speak=value=>window.LuriaVoice.pushToTalk(value).catch(failure);
  hold?.addEventListener('pointerdown',e=>{e.preventDefault();hold.setPointerCapture?.(e.pointerId);speak(true);});for(const type of ['pointerup','pointercancel','lostpointercapture','blur'])hold?.addEventListener(type,()=>speak(false));
  hold?.addEventListener('keydown',e=>{if([' ','Enter'].includes(e.key)){e.preventDefault();if(!e.repeat)speak(true);}});hold?.addEventListener('keyup',e=>{if([' ','Enter'].includes(e.key)){e.preventDefault();speak(false);}});
  window.addEventListener('luria:voice-state',renderParticipants);
  window.addEventListener('online',()=>{if(roomId){scheduleRefresh();loadMessages().catch(failure);}else refreshHall().catch(failure);});
  window.addEventListener('offline',()=>{$('social-connection').textContent='Sem conexão. Seu rascunho será preservado.';});
  window.addEventListener('luria:study-timer',event=>{if(roomId&&Number(event.detail?.seconds)>0)scheduleRefresh();});
  document.addEventListener('visibilitychange',()=>{if(!document.hidden&&roomId){scheduleRefresh();loadMessages().catch(failure);}});
  window.addEventListener('luria:room-exit',()=>{leave({navigateHall:false}).catch(failure);});
  window.addEventListener('pagehide',saveDraft);
 }
 async function init(){
  if(owner||!window.docmapUser||!$('social-rooms'))return;owner=window.docmapUser;bind();
  const mark=document.querySelector('.friends-ref-studyrats-mark');if(mark)mark.innerHTML=icon('rat');
  for(const [id,name] of [['friends-create-room-toggle','room'],['social-voice-join','mic']]){const el=$(id);if(el)el.insertAdjacentHTML('afterbegin',icon(name)+' ');}
  try{await refreshSocial();await refreshHall();const params=new URLSearchParams(location.search);if(params.get('group_invite')){await command('join_group',{code:params.get('group_invite')});await refreshSocial();}if(params.get('invite'))await enter({code:params.get('invite')});else if(location.hash.startsWith('#room='))await enter({room_id:decodeURIComponent(location.hash.slice(6))});}
  catch(error){if(/PGRST202|function .*social_|Could not find.*function/i.test((error.code||'')+' '+error.message)){status('As salas aguardam a ativação do banco no ambiente de homologação. Seus amigos e desafios continuam disponíveis.',true);$('social-rooms').textContent='Nenhuma sala disponível neste ambiente.';}else failure(error);}
  try{if(await rpc('is_admin')===true){$('social-admin').hidden=false;await adminSnapshot();}}catch(error){failure(error);}
  socialChannel=window.supabaseClient.channel('social-user:'+owner.id).on('postgres_changes',{event:'*',schema:'public',table:'friendships'},()=>{refreshSocial().catch(failure);window.loadFriends().catch(failure);}).subscribe();
 }
 window.LuriaSocial={getCapabilities:()=>({groupRaces:social?.group_studyrats_available===true}),init,refreshSocial,refreshHall,updateFriendPresence,enter,leave,block,showProfile,inviteFriend,openCreate,getState:()=>state,refreshRoom,command,icon};
 window.addEventListener('luria:owner-changed',async()=>{if(owner&&window.LuriaLocalOwnerStore?.ownerId!==owner.id){await teardownRoom();if(socialChannel)await window.supabaseClient.removeChannel(socialChannel);for(const c of friendChannels.values())await window.supabaseClient.removeChannel(c);friendChannels.clear();owner=null;for(const id of ['social-rooms','social-messages','social-groups','social-requests','social-suggestions','social-blocks'])$(id).textContent='';$('social-room').hidden=true;$('community-rooms').hidden=false;}});
 if(window.docmapUser)init();else window.addEventListener('docmap:ready',init,{once:true});
})();
