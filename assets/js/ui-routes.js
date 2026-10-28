(() => {
  const aliases = new Set([
    'admin', 'amigos', 'aplicar', 'black-november', 'caderno', 'caderno-erros', 'configuracoes', 'cronograma',
    'dashboard', 'desafio-diario', 'editais', 'editorial', 'estatisticas', 'flashcards', 'jogos',
    'questoes-simulados', 'registrar-questoes', 'vocacao'
  ]);
  const location = window.location;
  // Links antigos do Feynman devem abrir o modo interno do Professor Alex.
  if (/^\\/feynman(?:\\/(?:index\\.html)?|\\.html)?$/.test(location.pathname)) {
    const params = new URLSearchParams(location.search);
    params.set("mode","feynman");
    location.replace("/professor-alex/?" + params.toString() + location.hash);
    return;
  }
  const match = location.pathname.match(/^\/([^/]+)\.html$/);
  if (!match) return;
  const destination = match[1] === 'plantao' ? '/plantao/sala-emergencia/'
    : aliases.has(match[1]) ? '/' + match[1] + '/' : null;
  if (destination) location.replace(destination + location.search + location.hash);
})();
