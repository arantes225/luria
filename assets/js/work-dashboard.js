/* Work hub presentation only. Tools and their contracts remain independent. */
(() => {
  const root = document.querySelector('body[data-page="trabalho_dashboard"] #work-dashboard-content');
  if (!root) return;
  const icon=(name)=>{
    const paths={
      calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/>',
      briefcase:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18"/>',
      clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
      money:'<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="12" cy="12" r="3"/><path d="M7 9H5v2M17 15h2v-2"/>',
      steth:'<path d="M6 3v6a4 4 0 0 0 8 0V3M4 3h4M12 3h4"/><path d="M10 13v2a5 5 0 0 0 10 0v-2"/><circle cx="20" cy="11" r="2"/>',
      rx:'<path d="M5 4h6a4 4 0 0 1 0 8H5zM9 12l8 8M14 14l5-5"/>',
      calc:'<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M7 7h10M8 11h1M12 11h1M16 11h1M8 15h1M12 15h1M16 15h1M8 18h1M12 18h5"/>',
      cid:'<path d="M5 4h10l4 4v12H5z"/><path d="M15 4v5h5M8 13h8M8 17h6"/>',
      lab:'<path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3"/><path d="M7 16h10"/>',
      ecg:'<path d="M2 12h4l2-5 4 10 3-7 2 2h5"/>',
      file:'<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>',
      shield:'<path d="M12 3l8 3v5c0 5-3.4 8.3-8 10-4.6-1.7-8-5-8-10V6z"/><path d="M9 12l2 2 4-4"/>',
      users:'<circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2"/><path d="M3 19c0-4 2.5-6 6-6s6 2 6 6M15 14c3 0 5 1.6 5 5"/>',
      droplet:'<path d="M12 3s6 6.4 6 11a6 6 0 0 1-12 0c0-4.6 6-11 6-11z"/>',
      protocol:'<path d="M7 3h10v4H7z"/><path d="M5 7h14v14H5zM8 11h8M8 15h8M8 19h5"/>'
    };
    return `<svg class="work-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]||paths.file}</svg>`;
  };

  const groups = [
    ['Consulta e prescrição', [
      ['rx', 'Bulário', 'Consulte medicamentos e apresentações.', 'bulario/', 'blue'],
      ['file', 'Prescrição', 'Organize suas prescrições.', 'prescricao/', 'green'],
      ['protocol', 'Cola rápida', 'Anotações com acesso temporário.', 'prontuario-rapido/', 'violet']
    ]],
    ['Avaliação e apoio clínico', [
      ['calc', 'Calculadoras', 'Acesse as calculadoras clínicas.', 'calculadora/', 'orange'],
      ['shield', 'Scores', 'Consulte escores e classificações.', 'scores/', 'cyan'],
      ['steth', 'Diagnóstico por Sintomas', 'Explore o apoio ao raciocínio clínico.', 'diagnostico/', 'teal'],
      ['droplet', 'Fluidos e Eletrólitos', 'Acesse ferramentas de fluidos e eletrólitos.', 'fluidos-eletrólitos/', 'indigo']
    ]],
    ['Rotina e acompanhamento', [
      ['users', 'Passômetro', 'Organize a passagem de casos.', 'passometro/', 'rose'],
      ['calendar', 'Gestor de Plantões', 'Gerencie sua rotina de plantões.', 'gestor-plantoes/', 'amber'],
      ['clock', 'Histórico de PCR', 'Consulte registros de atendimentos.', 'pcr/historico/', 'slate']
    ]]
  ];
  root.innerHTML = '<a class="work-hub-patient" href="/trabalho/paciente/"><span class="work-hub-patient-icon" aria-hidden="true">' + icon('users') + '</span><span class="work-hub-patient-copy"><strong>Paciente</strong><span>Centralize um contexto temporário e use as ferramentas sem repetir dados.</span></span><span class="work-hub-patient-action">Iniciar ou abrir <span aria-hidden="true">→</span></span></a>'
    + '<a class="work-hub-emergency" href="/trabalho/pcr/"><span class="work-hub-emergency-icon" aria-hidden="true">' + icon('ecg') + '</span><span class="work-hub-emergency-copy"><strong>Parada Cardiorrespiratória</strong><span>Acesso rápido à ferramenta de PCR.</span></span><span class="work-hub-emergency-action">Abrir PCR <span aria-hidden="true">→</span></span></a>'
    + groups.map(([title, tools], i) => '<section class="work-hub-category" aria-labelledby="work-category-' + i + '"><h2 id="work-category-' + i + '">' + title + '</h2><div class="work-hub-grid">' + tools.map(([visual, name, description, route, color]) => '<a class="work-hub-card" href="/trabalho/' + route + '"><span class="work-hub-icon" data-work-color="' + color + '">' + icon(visual) + '</span><span class="work-hub-copy"><strong>' + name + '</strong><span>' + description + '</span></span><span class="work-hub-arrow" aria-hidden="true">→</span></a>').join('') + '</div></section>').join('');
})();
