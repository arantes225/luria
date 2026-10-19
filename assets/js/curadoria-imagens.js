(() => {
  'use strict';
  const grid = document.getElementById('grid');
  const query = document.getElementById('query');
  const block = document.getElementById('block');
  const status = document.getElementById('status');
  const summary = document.getElementById('summary');
  let rows = [];
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const clean = value => String(value ?? '').replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').replace(/`/g, '');
  function render() {
    const needle = query.value.trim().toLowerCase();
    const selectedBlock = block.value;
    const selectedStatus = status.value;
    const filtered = rows.filter(row => {
      const haystack = [row.title,row.source_url,row.author,row.license,row.section,row.didactic].map(clean).join(' ').toLowerCase();
      return (!needle || haystack.includes(needle)) && (selectedBlock === 'all' || row.block === selectedBlock) && (selectedStatus === 'all' || row.status === selectedStatus);
    });
    summary.textContent = `${filtered.length} de ${rows.length} candidatas · ${rows.filter(r => r.status === 'kept').length} filtradas para aprovação`;
    grid.innerHTML = filtered.map((row, index) => {
      const unavailable = row.preview_url ? '' : ' sem-preview';
      return `<article class="curation-card${unavailable}" data-index="${index}">
        <div class="curation-preview">${row.preview_url ? `<img loading="lazy" src="${esc(row.preview_url)}" alt="${esc(clean(row.title))}">` : '<span>Sem prévia direta</span>'}</div>
        <div class="curation-body"><span class="curation-tag">Bloco ${esc(Number(row.block))}</span>
          <h2>${esc(clean(row.title))}</h2><p>${esc(clean(row.didactic))}</p>
          <small><strong>Seção:</strong> ${esc(clean(row.section))}<br><strong>Fonte:</strong> ${esc(clean(row.author))}<br><strong>Licença declarada:</strong> ${esc(clean(row.license))}</small>
          <div class="curation-actions"><a href="${esc(row.source_url)}" target="_blank" rel="noopener noreferrer">Abrir fonte ↗</a><span class="curation-status ${row.status === 'kept' ? 'is-kept' : 'is-excluded'}">${row.status === 'kept' ? 'Filtrada' : 'Excluída'}</span></div>
        </div></article>`;
    }).join('') || '<p>Nenhuma candidata corresponde aos filtros.</p>';
    grid.querySelectorAll('img').forEach(img => img.addEventListener('error', () => { img.closest('.curation-card')?.classList.add('image-unavailable'); }, {once:true}));
  }
  [query, block, status].forEach(control => control.addEventListener('input', render));
  fetch('./data.json').then(response => { if (!response.ok) throw new Error('Falha ao carregar curadoria'); return response.json(); }).then(data => { rows = Array.isArray(data) ? data : []; render(); }).catch(() => { summary.textContent = 'Curadoria indisponível'; grid.innerHTML = '<p>Não foi possível carregar a fila de imagens.</p>'; });
})();
