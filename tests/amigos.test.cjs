const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

test('Integridade e estrutura da aba e página Amigos', () => {
  const fileIndex = path.join(__dirname, '..', 'amigos', 'index.html');
  const fileHtml = path.join(__dirname, '..', 'amigos.html');
  assert(fs.existsSync(fileIndex), 'amigos/index.html deve existir');
  assert(fs.existsSync(fileHtml), 'amigos.html deve existir');

  const contentIndex = fs.readFileSync(fileIndex, 'utf8');
  const contentHtml = fs.readFileSync(fileHtml, 'utf8');

  // 1. Sincronização estrita entre amigos/index.html e amigos.html
  assert.equal(contentIndex, contentHtml, 'amigos.html e amigos/index.html devem ser idênticos');
  assert(contentIndex.trim().endsWith('</html>'), 'Documento deve fechar corretamente em </html>');

  // 2. Presença das abas nativas de comunidade
  assert(contentIndex.includes('class="community-nav"'), 'Deve conter a barra de abas .community-nav');
  assert(contentIndex.includes('data-community-tab="friends"'), 'Deve conter aba Amigos');
  assert(contentIndex.includes('data-community-tab="groups"'), 'Deve conter aba Grupos');
  assert(contentIndex.includes('data-community-tab="rooms"'), 'Deve conter aba Salas');

  // 3. Presença dos nós essenciais para execução sem erros de amigos.js e social-rooms.js
  assert(contentIndex.includes('id="friends-list"'), 'Deve conter container #friends-list');
  assert(contentIndex.includes('id="friends-inbox"'), 'Deve conter container #friends-inbox para materiais recebidos');
  assert(contentIndex.includes('id="social-requests"'), 'Deve conter container #social-requests para solicitações de amizade');
  assert(contentIndex.includes('id="social-suggestions"'), 'Deve conter container #social-suggestions para sugestões de amigos');
  assert(contentIndex.includes('id="studyrats-card"'), 'Deve conter o card de desafios #studyrats-card');
  assert(contentIndex.includes('id="community-groups"'), 'Deve conter container de Grupos #community-groups');
  assert(contentIndex.includes('id="community-rooms"'), 'Deve conter container de Salas #community-rooms');

  // 4. Ausência de artifícios que quebram o layout
  assert(!contentIndex.includes('amigos-lumina-redesign'), 'Não deve conter estilo inline conflitante amigos-lumina-redesign');
  assert(!contentIndex.includes('traube-back-button'), 'Não deve conter botões artificiais de voltar');

  // 5. Verificação nos arquivos CSS para garantir que a navegação de abas não está oculta
  const socialFriendsCss = fs.readFileSync(path.join(__dirname, '..', 'assets', 'css', 'social-friends.css'), 'utf8');
  const socialRoomsCss = fs.readFileSync(path.join(__dirname, '..', 'assets', 'css', 'social-rooms-design.css'), 'utf8');

  assert(!socialFriendsCss.includes('.community-nav {display:none!important;}'), 'social-friends.css não deve ocultar .community-nav');
  assert(!socialRoomsCss.includes('body[data-page="amigos"] .community-nav {\n  display: none !important;'), 'social-rooms-design.css não deve ocultar .community-nav');
});
