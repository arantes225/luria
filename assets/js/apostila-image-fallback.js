(() => {
  'use strict';
  if (window.LuriaApostilaImageFallback) return;
  window.LuriaApostilaImageFallback = true;

  // Images hosted by third parties sometimes need their canonical address.
  // Retry the SAME documented medical image; never substitute a different picture.
  function nextTrustedImageUrl(image) {
    if (image.dataset.apostilaImageRetryDone === 'yes') return '';
    const raw = image.getAttribute('src') || '';
    let url;
    try { url = new URL(raw, location.href); }
    catch { return ''; }
    if (url.protocol !== 'https:') return '';
    if (url.hostname === 'wwwn.cdc.gov' && /\/phil\/{2,}PHIL_Images\//i.test(url.pathname)) {
      url.pathname = url.pathname.replace(/\/phil\/{2,}PHIL_Images\//i, '/phil/PHIL_Images/');
      return url.href;
    }
    if (url.hostname === 'commons.wikimedia.org' && /\/wiki\/Special:Redirect\/file\//i.test(url.pathname)) {
      url.pathname = url.pathname.replace(/\/wiki\/Special:Redirect\/file\//i, '/wiki/Special:FilePath/');
      return url.href;
    }
    const explicitlyApproved = image.dataset.apostilaFallbackUrl;
    if (image.dataset.apostilaImageFallback === 'approved-source' && explicitlyApproved) {
      try {
        const fallback = new URL(explicitlyApproved, location.href);
        // Accept only HTTPS or same-origin resources; never arbitrary external scripts.
        if ((fallback.protocol === 'https:' || fallback.origin === location.origin) &&
          fallback.href !== image.src) return fallback.href;
      } catch {}
    }
    return '';
  }

  function showUnavailable(image) {
    const kind = image.dataset.apostilaImageFallback;
    const figure = image.closest('figure');
    if (kind === 'display-sibling') image.style.display = 'none';
    else image.hidden = true;
    if (kind === 'ist-figure') figure?.classList.add('ist-image-unavailable');

    // Keep the approved caption and source link; never silently replace a
    // clinical examination with an unrelated illustrative image.
    if (kind === 'display-sibling' || kind === 'hidden-sibling') {
      const sibling = image.nextElementSibling;
      if (sibling) sibling.hidden = false;
      return;
    }
    if (kind === 'approved-source' && figure) {
      if (figure.querySelector('.image-source-retry')) return;
      const source = image.dataset.apostilaImageSourceUrl;
      if (!source) return;
      const link = document.createElement('a');
      link.className = 'image-source-retry';
      link.href = source;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.textContent = 'Ver imagem no acervo original ↗';
      link.setAttribute('aria-label', 'Ver o exame ou imagem clínica no acervo original');
      image.insertAdjacentElement('afterend', link);
      return;
    }
    if (kind === 'candidate' && image.parentElement && !image.dataset.apostilaImageUnavailableShown) {
      image.dataset.apostilaImageUnavailableShown = 'yes';
      image.parentElement.insertAdjacentText('beforeend', 'Imagem não carregada — confira a fonte no Admin');
    }
  }

  document.addEventListener('error', event => {
    const image = event.target;
    if (!(image instanceof HTMLImageElement)) return;
    const kind = image.dataset.apostilaImageFallback;
    if (!['display-sibling', 'hidden-sibling', 'ist-figure', 'approved-source', 'candidate'].includes(kind)) return;
    const next = nextTrustedImageUrl(image);
    if (next && next !== image.src) {
      image.dataset.apostilaImageRetryDone = 'yes';
      image.dataset.apostilaImageTriedFallback = 'yes';
      image.src = next;
      return;
    }
    showUnavailable(image);
  }, true);

  document.addEventListener('load', event => {
    const image = event.target;
    if (!(image instanceof HTMLImageElement) || !image.dataset.apostilaImageFallback) return;
    image.hidden = false;
    image.style.display = '';
    if (image.nextElementSibling?.hasAttribute('role') &&
      image.nextElementSibling.getAttribute('role') === 'note') {
      image.nextElementSibling.hidden = true;
    }
  }, true);
})();
