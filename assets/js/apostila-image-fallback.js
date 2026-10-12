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
      case 'candidate':
        image.style.display = 'none';
        image.parentElement?.insertAdjacentText('beforeend', 'Imagem indisponível');
        break;
    }
  }, true);
})();
