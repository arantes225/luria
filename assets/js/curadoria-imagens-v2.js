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
  const svgEsc = value => clean(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));
  const fallbackPreview = row => {
    const title = svgEsc(row.title).slice(0, 150);
    const section = svgEsc(row.section).slice(0, 80);
    const source = svgEsc(row.author).slice(0, 100);
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600" role="img" aria-label="Prévia editorial substituta: ${title}"><defs><linearGradient id="g" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#0f4c5c"/><stop offset="1" stop-color="#168aad"/></linearGradient></defs><rect width="900" height="600" fill="url(#g)"/><rect x="42" y="42" width="816" height="516" rx="28" fill="#ffffff" fill-opacity=".94"/><text x="82" y="112" fill="#0f4c5c" font-family="Arial,sans-serif" font-size="26" font-weight="700" letter-spacing="2">PRÉVIA SUBSTITUTA</text><text x="82" y="158" fill="#5c6770" font-family="Arial,sans-serif" font-size="20">Imagem original indisponível para carregamento</text><foreignObject x="82" y="205" width="736" height="180"><div xmlns="http://www.w3.org/1999/xhtml" style="font:700 30px Arial,sans-serif;line-height:1.2;color:#14213d">${title}</div></foreignObject><text x="82" y="448" fill="#168aad" font-family="Arial,sans-serif" font-size="19">Seção: ${section}</text><text x="82" y="488" fill="#5c6770" font-family="Arial,sans-serif" font-size="17">Fonte para conferência: ${source}</text><text x="82" y="530" fill="#b42318" font-family="Arial,sans-serif" font-size="16" font-weight="700">Revisar visual e licença antes da aprovação</text></svg>`;
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  };
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
      const unavailable = row.preview_url ? '' : ' image-unavailable image-substituted';
      const preview = row.preview_url || fallbackPreview(row);
      return `<article class="curation-card${unavailable}" data-index="${index}">
        <div class="curation-preview"><img loading="lazy" src="${esc(preview)}" alt="${esc(clean(row.title))}"></div>
        <div class="curation-body"><span class="curation-tag">Bloco ${esc(Number(row.block))}</span>
          <h2>${esc(clean(row.title))}</h2><p>${esc(clean(row.didactic))}</p>
          <small><strong>Seção:</strong> ${esc(clean(row.section))}<br><strong>Fonte:</strong> ${esc(clean(row.author))}<br><strong>Licença declarada:</strong> ${esc(clean(row.license))}</small>
          <div class="curation-actions"><a href="${esc(row.source_url)}" target="_blank" rel="noopener noreferrer">Abrir fonte ↗</a><span class="curation-status ${row.status === 'kept' ? 'is-kept' : 'is-excluded'}">${row.status === 'kept' ? (row.preview_url ? 'Filtrada' : 'Substituída para revisão') : 'Excluída'}</span></div>
        </div></article>`;
    }).join('') || '<p>Nenhuma candidata corresponde aos filtros.</p>';
    grid.querySelectorAll('img').forEach((img, index) => img.addEventListener('error', () => {
      if (img.dataset.fallbackApplied) return;
      img.dataset.fallbackApplied = '1';
      const row = filtered[index];
      img.src = fallbackPreview(row);
      img.alt = `Prévia editorial substituta: ${clean(row.title)}`;
      const card = img.closest('.curation-card');
      card?.classList.add('image-unavailable', 'image-substituted');
      const label = card?.querySelector('.curation-status');
      if (label && row.status === 'kept') { label.textContent = 'Substituída para revisão'; label.classList.remove('is-kept'); label.classList.add('is-substituted'); }
    }, {once:true}));
  }
  [query, block, status].forEach(control => control.addEventListener('input', render));
  fetch('/apostilas/curadoria-imagens-v2/data.json').then(response => { if (!response.ok) throw new Error('Falha ao carregar curadoria'); return response.json(); }).then(data => { rows = Array.isArray(data) ? data : []; render(); }).catch(() => { summary.textContent = 'Curadoria indisponível'; grid.innerHTML = '<p>Não foi possível carregar a fila de imagens.</p>'; });
})();
