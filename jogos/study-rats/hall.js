(() => {
  'use strict';
  const hall = document.getElementById('study-rats-hall');
  const gameHost = document.getElementById('study-rats-host');
  if (!hall || !gameHost) return;

  hall.innerHTML = `
    <div class="sr-hall-hero">
      <span class="sr-hall-eyebrow">Study Rats · hall de entrada</span>
      <h2>Prepare sua próxima corrida</h2>
      <p>Responda às cartas, avance pelo tabuleiro e encontre as casas especiais. Escolha quem vai jogar com você.</p>
    </div>
    <div class="sr-hall-grid">
      <section class="sr-hall-card" aria-labelledby="sr-friends-heading">
        <span class="sr-hall-icon" aria-hidden="true">♟</span><h3 id="sr-friends-heading">Com amigos</h3>
        <p>Convide uma pessoa da sua lista do TRAUBE. A partida começa quando ela aceitar.</p>
        <button class="sr-hall-button" id="sr-show-friends" type="button">Escolher amigo</button>
      </section>
      <section class="sr-hall-card" aria-labelledby="sr-random-heading">
        <span class="sr-hall-icon" aria-hidden="true">🎲</span><h3 id="sr-random-heading">Com alguém aleatório</h3>
        <p>Entre na fila para encontrar outra pessoa que também escolheu uma corrida online.</p>
        <button class="sr-hall-button" id="sr-find-random" type="button">Encontrar partida</button>
      </section>
      <section class="sr-hall-card" aria-labelledby="sr-demo-heading">
        <span class="sr-hall-icon" aria-hidden="true">🐭</span><h3 id="sr-demo-heading">Demonstração</h3>
        <p>Experimente o tabuleiro agora com três ratinhos controlados pelo jogo.</p>
        <button class="sr-hall-button sr-hall-button--secondary" id="sr-play-demo" type="button">Jogar demonstração</button>
      </section>
    </div>
    <section class="sr-hall-detail" id="sr-friends-panel" aria-labelledby="sr-friends-list-heading" hidden>
      <h3 id="sr-friends-list-heading">Escolha um amigo</h3>
      <p class="sr-hall-help">Somente amigos já adicionados no TRAUBE aparecem aqui.</p>
      <div class="sr-friends" id="sr-friends-list"></div>
      <p class="sr-hall-help" id="sr-friends-empty" hidden>Você ainda não tem amigos disponíveis. <a href="/amigos/">Abra Amigos</a> para adicionar alguém.</p>
    </section>
    <section class="sr-hall-detail sr-hall-invites" id="sr-invites-panel" aria-labelledby="sr-invites-heading" hidden>
      <h3 id="sr-invites-heading">Convites e partidas</h3><div id="sr-invites-list"></div>
    </section>
    <section class="sr-hall-waiting" id="sr-waiting" aria-labelledby="sr-waiting-heading" hidden>
      <h3 id="sr-waiting-heading">Aguardando outra pessoa</h3>
      <p class="sr-hall-help" id="sr-waiting-copy"></p>
      <div class="sr-hall-actions"><button class="sr-hall-button sr-hall-button--secondary" id="sr-copy-link" type="button" hidden>Copiar convite</button><button class="sr-hall-button sr-hall-button--secondary" id="sr-cancel" type="button">Cancelar busca</button></div>
    </section>
    <p class="sr-hall-status" id="sr-hall-status" role="status" aria-live="polite"></p>`;

  const $ = id => document.getElementById(id);
  const sb = window.supabaseClient;
  let userId = null;
  let currentMatch = null;
  let refreshing = false;
  let launching = false;
  let poller = null;
  const queryMatch = new URLSearchParams(location.search).get('match');
  const requestedMatch = /^[0-9a-f]{8}-[0-9a-f-]{27,36}$/i.test(queryMatch || '') ? queryMatch : null;

  function status(message, error = false) {
    const target = $('sr-hall-status');
    target.textContent = message;
    target.dataset.error = String(error);
  }
  function onlineReady() {
    if (sb && userId) return true;
    status('Entre na sua conta TRAUBE para jogar com outras pessoas. A demonstração continua disponível.', true);
    return false;
  }
  async function rpc(name, args = {}) {
    const {data, error} = await sb.rpc(name, args);
    if (error) throw error;
    return data;
  }
  function setWaiting(match) {
    currentMatch = match;
    $('sr-waiting').hidden = false;
    $('sr-find-random').disabled = true;
    $('sr-show-friends').disabled = true;
    $('sr-waiting-heading').textContent = match.mode === 'friends' ? 'Convite enviado' : 'Buscando jogador';
    $('sr-waiting-copy').textContent = match.mode === 'friends'
      ? 'A partida começa quando seu amigo abrir o Study Rats e aceitar o convite.'
      : 'Buscando outra pessoa online. Você pode cancelar a qualquer momento.';
    $('sr-copy-link').hidden = match.mode !== 'friends';
  }
  function launchGame(match = null) {
    if (launching) return;
    launching = true;
    if (poller) clearInterval(poller);
    window.StudyRatsSession = match ? {
      matchId: match.id, mode: match.mode, userId,
      hostId: match.host_id, guestId: match.guest_id,
      localName: match.host_id === userId ? match.host_name : match.guest_name,
      remoteName: match.host_id === userId ? match.guest_name : match.host_name,
      localHouse: match.host_id === userId ? match.host_house : match.guest_house,
      remoteHouse: match.host_id === userId ? match.guest_house : match.host_house,
      localQuestion: match.host_id === userId ? match.host_question : match.guest_question
    } : null;
    hall.hidden = true;
    gameHost.hidden = false;
    const script = document.createElement('script');
    script.src = '/jogos/study-rats/game.js?v=20261021-hall1';
    script.onerror = () => {
      gameHost.hidden = true;
      hall.hidden = false;
      launching = false;
      status('Não foi possível carregar o tabuleiro. Recarregue a página e tente novamente.', true);
    };
    document.body.append(script);
  }
  function renderMatches(matches) {
    const panel = $('sr-invites-panel');
    const list = $('sr-invites-list');
    list.replaceChildren();
    const visible = matches.filter(match => match.status === 'waiting' && match.invited_id === userId && match.guest_id === null
      || match.status === 'playing' && (match.host_id === userId || match.guest_id === userId));
    panel.hidden = visible.length === 0;
    visible.forEach(match => {
      const row = document.createElement('div');
      row.className = 'sr-hall-invite';
      const copy = document.createElement('span');
      const title = document.createElement('strong');
      const detail = document.createElement('small');
      title.textContent = match.status === 'playing' ? 'Partida em andamento' : `Convite de ${match.host_name}`;
      detail.textContent = match.mode === 'friends' ? 'Study Rats com amigo' : 'Study Rats com jogador aleatório';
      copy.append(title, detail);
      const button = document.createElement('button');
      button.type = 'button'; button.className = 'sr-hall-button';
      button.textContent = match.status === 'playing' ? 'Continuar' : 'Aceitar convite';
      button.addEventListener('click', async () => {
        if (match.status === 'playing') return launchGame(match);
        button.disabled = true;
        try {
          const accepted = await rpc('study_rats_board_accept', {p_match_id: match.id});
          if (!accepted) throw new Error('O convite já não está disponível.');
          currentMatch = {id: match.id, mode: match.mode};
          await refreshLobby();
        } catch (error) { status(error.message || 'Não foi possível aceitar o convite.', true); button.disabled = false; }
      });
      row.append(copy, button); list.append(row);
    });
  }
  async function refreshLobby() {
    if (!onlineReady() || refreshing || launching) return;
    refreshing = true;
    try {
      const matches = await rpc('study_rats_board_lobby');
      const rows = Array.isArray(matches) ? matches : [];
      renderMatches(rows);
      if (!currentMatch) {
        const waiting = rows.find(match => match.status === 'waiting' && match.host_id === userId);
        if (waiting) setWaiting(waiting);
      }
      if (currentMatch) {
        const next = rows.find(match => match.id === currentMatch.id);
        if (next?.status === 'playing') return launchGame(next);
        if (!next || next.status !== 'waiting') { currentMatch = null; $('sr-waiting').hidden = true; $('sr-find-random').disabled = false; $('sr-show-friends').disabled = false; }
      }
      if (requestedMatch) {
        const invited = rows.find(match => match.id === requestedMatch && match.invited_id === userId);
        if (invited) panelFocus();
      }
    } catch (error) { status(error.message || 'Não foi possível atualizar o hall online.', true); }
    finally { refreshing = false; }
  }
  function panelFocus() { $('sr-invites-panel').scrollIntoView({block:'nearest'}); }
  async function startOnline(mode, friendId = null) {
    if (!onlineReady()) return;
    const button = mode === 'random' ? $('sr-find-random') : $('sr-show-friends');
    button.disabled = true;
    status('Conectando à partida…');
    try {
      const id = await rpc('study_rats_board_find', {p_mode: mode, p_friend_id: friendId});
      currentMatch = {id, mode};
      await refreshLobby();
      if (!launching && currentMatch) { setWaiting(currentMatch); status('Conexão preparada. Aguardando a outra pessoa.'); }
    } catch (error) { status(error.message || 'Não foi possível iniciar a partida online.', true); }
    finally { button.disabled = !!currentMatch; }
  }
  async function showFriends() {
    if (!onlineReady()) return;
    const panel = $('sr-friends-panel');
    panel.hidden = false;
    status('Carregando amigos…');
    try {
      const friends = await rpc('my_friends');
      const list = $('sr-friends-list'); list.replaceChildren();
      $('sr-friends-empty').hidden = Array.isArray(friends) && friends.length > 0;
      for (const friend of friends || []) {
        const button = document.createElement('button');
        button.type = 'button'; button.className = 'sr-friend-choice';
        const label = document.createElement('span');
        const name = document.createElement('strong'); name.textContent = friend.display_name || 'Amigo TRAUBE';
        const id = document.createElement('small'); id.textContent = friend.luria_id ? `ID ${friend.luria_id}` : 'Convidar para jogar';
        label.append(name, id); button.append(label);
        button.addEventListener('click', () => startOnline('friends', friend.user_id));
        list.append(button);
      }
      status('Escolha uma pessoa para convidar.');
    } catch (error) { status(error.message || 'Não foi possível carregar seus amigos.', true); }
  }
  $('sr-show-friends').addEventListener('click', showFriends);
  $('sr-find-random').addEventListener('click', () => startOnline('random'));
  $('sr-play-demo').addEventListener('click', () => launchGame());
  $('sr-copy-link').addEventListener('click', async () => {
    if (!currentMatch) return;
    const link = `${location.origin}/jogos/study-rats/?match=${encodeURIComponent(currentMatch.id)}`;
    try { await navigator.clipboard.writeText(link); status('Link do convite copiado.'); }
    catch { status(`Compartilhe este link: ${link}`); }
  });
  $('sr-cancel').addEventListener('click', async () => {
    if (!currentMatch) return;
    try { await rpc('study_rats_board_leave', {p_match_id: currentMatch.id}); currentMatch = null; $('sr-waiting').hidden = true; $('sr-find-random').disabled = false; $('sr-show-friends').disabled = false; status('Busca cancelada.'); await refreshLobby(); }
    catch (error) { status(error.message || 'Não foi possível cancelar a busca.', true); }
  });

  (async () => {
    if (!sb) { status('O jogo online está indisponível neste momento. A demonstração continua disponível.', true); return; }
    try {
      const {data, error} = await sb.auth.getUser();
      if (error) throw error;
      userId = data?.user?.id || null;
      if (!userId) { onlineReady(); return; }
      status('Escolha como quer jogar.');
      await refreshLobby();
      poller = setInterval(refreshLobby, 3500);
    } catch (error) { status(error.message || 'Não foi possível verificar sua conta.', true); }
  })();
})();

