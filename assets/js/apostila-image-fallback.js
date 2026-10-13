(() => {
  'use strict';
  if (window.LuriaApostilaImageFallback) return;
  window.LuriaApostilaImageFallback = true;
  // Capture runs for static images and later review templates, before load failures.
  document.addEventListener('error', event => {
    const image = event.target;
    if (!(image instanceof HTMLImageElement)) return;
    switch (image.dataset.apostilaImageFallback) {
      case 'display-sibling':
        image.style.display = 'none';
        if (image.nextElementSibling) image.nextElementSibling.hidden = false;
        break;
      case 'hidden-sibling':
        image.hidden = true;
        if (image.nextElementSibling) image.nextElementSibling.hidden = false;
        break;
      case 'ist-figure':
        image.closest('figure')?.classList.add('ist-image-unavailable');
        break;
      case 'approved-source': {
        // Tenta o endereço canônico alternativo antes de declarar a imagem indisponível.
        const alternative = image.dataset.apostilaFallbackUrl;
        if (alternative && image.dataset.apostilaImageTriedFallback !== 'yes' && alternative !== image.src) {
          image.dataset.apostilaImageTriedFallback = 'yes';
          image.src = alternative;
          break;
        }
        image.hidden = true;
        const figure = image.closest('figure');
        const url = image.dataset.apostilaImageSourceUrl;
        if (url && figure && !figure.querySelector('.image-source-retry')) {
          const a = document.createElement('a');
          a.className = 'image-source-retry';
          a.href = url;
          a.target = '_blank';
          a.rel = 'noopener noreferrer';
          a.textContent = 'Abrir imagem na fonte original ↗';
          image.insertAdjacentElement('afterend', a);
        }
        break;
      }
      case 'candidate':
        image.style.display = 'none';
        image.parentElement?.insertAdjacentText('beforeend', 'Imagem indisponível');
        break;
    }
  }, true);
})();
