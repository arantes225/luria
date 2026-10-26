(() => {
  const aliases = new Set([
    'admin', 'amigos', 'aplicar', 'black-november', 'caderno', 'caderno-erros', 'configuracoes', 'cronograma',
    'dashboard', 'desafio-diario', 'editais', 'editorial', 'estatisticas', 'feynman', 'flashcards', 'jogos',
    'questoes-simulados', 'registrar-questoes', 'vocacao'
  ]);
  const location = window.location;
  const match = location.pathname.match(/^\/([^/]+)\.html$/);
  if (!match) return;
  const destination = match[1] === 'plantao' ? '/plantao/sala-emergencia/'
    : aliases.has(match[1]) ? '/' + match[1] + '/' : null;
  if (destination) location.replace(destination + location.search + location.hash);
})();
