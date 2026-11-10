/* TRAUBE · Pré-lista da landing.
   Envia para public.join_landing_prelista (Supabase RPC). Não guarda dado pessoal no navegador
   nem na URL; só uma marca "já inscrito" para esconder o botão flutuante. */
(function () {
  'use strict';

  var DONE_KEY = 'traube_prelista_inscrito';
  var EMAIL_RE = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,24}$/i;
  var NAME_RE = /^[A-Za-zÀ-ÖØ-öø-ÿ][A-Za-zÀ-ÖØ-öø-ÿ .'-]*$/;
  var startedAt = Date.now();
  var dialog = document.getElementById('prelista-dialog');
  var fab = document.querySelector('[data-prelista-fab]');

  function isDone() {
    try { return localStorage.getItem(DONE_KEY) === '1'; } catch (e) { return false; }
  }
  function markDone() {
    try { localStorage.setItem(DONE_KEY, '1'); } catch (e) {}
    document.documentElement.classList.add('prelista-done');
  }
  if (isDone()) document.documentElement.classList.add('prelista-done');

  function feedback(form, text, type) {
    var el = form.querySelector('[data-prelista-feedback]');
    if (!el) return;
    el.textContent = text;
    el.setAttribute('data-state', type || '');
  }

  function showSuccess(form, firstName) {
    var box = form.closest('[data-prelista]');
    if (!box) return;
    var ok = box.querySelector('[data-prelista-success]');
    form.hidden = true;
    if (ok) {
      var name = ok.querySelector('[data-prelista-name]');
      if (name) name.textContent = firstName;
      ok.hidden = false;
      ok.focus && ok.focus();
    }
  }

  function submit(form) {
    var nome = (form.elements.nome && form.elements.nome.value || '').trim().replace(/\s+/g, ' ');
    var email = (form.elements.email && form.elements.email.value || '').trim();
    var fase = form.elements.fase ? form.elements.fase.value : '';
    var consent = !!(form.elements.consentimento && form.elements.consentimento.checked);
    var trap = form.elements.website ? form.elements.website.value : '';
    var button = form.querySelector('[type="submit"]');

    if (nome.length < 2) { feedback(form, 'Escreva seu nome para a gente te chamar direito.', 'error'); form.elements.nome.focus(); return; }
    if (nome.length > 120 || !NAME_RE.test(nome)) { feedback(form, 'Use só letras no nome (acentos, espaço, hífen e apóstrofo valem).', 'error'); form.elements.nome.focus(); return; }
    if (!EMAIL_RE.test(email) || email.length > 254) { feedback(form, 'Confira o e-mail: parece que falta alguma parte.', 'error'); form.elements.email.focus(); return; }
    if (!consent) { feedback(form, 'Marque a caixa para autorizar o aviso por e-mail.', 'error'); return; }

    var firstName = nome.split(' ')[0];
    // Robô: campo invisível preenchido ou formulário enviado rápido demais => finge sucesso
    if (trap || Date.now() - startedAt < 1500) { markDone(); showSuccess(form, firstName); return; }

    var sb = window.supabaseClient;
    if (!sb || typeof sb.rpc !== 'function') {
      feedback(form, 'Não conseguimos conectar agora. Tente de novo em alguns minutos.', 'error');
      return;
    }

    if (button) button.disabled = true;
    feedback(form, 'Enviando…', 'loading');

    sb.rpc('join_landing_prelista', {
      p_nome: nome,
      p_email: email,
      p_fase: fase || null,
      p_origem: form.getAttribute('data-origem') || 'landing',
      p_consentimento: true
    }).then(function (res) {
      if (res && res.error) throw res.error;
      markDone();
      feedback(form, '', '');
      showSuccess(form, firstName);
    }).catch(function (err) {
      var msg = String((err && err.message) || '');
      if (msg.indexOf('ip_ja_inscrito') !== -1) {
        feedback(form, 'Já recebemos uma inscrição desta rede. Se você é outra pessoa, tente pelo 4G do celular.', 'error');
      } else if (msg.indexOf('nome_invalido') !== -1) {
        feedback(form, 'Use só letras no nome (acentos, espaço, hífen e apóstrofo valem).', 'error');
      } else if (msg.indexOf('muitas_tentativas') !== -1) {
        feedback(form, 'Muita gente entrando ao mesmo tempo. Tente de novo em um minuto.', 'error');
      } else if (msg.indexOf('email_invalido') !== -1) {
        feedback(form, 'Confira o e-mail: parece que falta alguma parte.', 'error');
      } else {
        feedback(form, 'Não conseguimos salvar agora. Tente de novo em alguns minutos.', 'error');
      }
      if (button) button.disabled = false;
    });
  }

  document.querySelectorAll('form[data-prelista-form]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      submit(form);
    });
  });

  // Abrir o formulário em janela (botões ao longo da página e botão flutuante)
  function openDialog(trigger) {
    if (!dialog || typeof dialog.showModal !== 'function') {
      var hero = document.getElementById('prelista');
      if (hero) hero.scrollIntoView({ block: 'center' });
      return;
    }
    if (trigger && trigger.getAttribute('data-origem')) {
      var f = dialog.querySelector('form[data-prelista-form]');
      if (f) f.setAttribute('data-origem', trigger.getAttribute('data-origem'));
    }
    dialog.showModal();
    var first = dialog.querySelector('input[name="nome"]');
    if (first && !first.closest('[hidden]')) first.focus();
  }
  document.addEventListener('click', function (e) {
    var t = e.target.closest && e.target.closest('[data-prelista-open]');
    if (t) { e.preventDefault(); openDialog(t); return; }
    var c = e.target.closest && e.target.closest('[data-prelista-close]');
    if (c && dialog) { dialog.close(); }
  });
  if (dialog) {
    dialog.addEventListener('click', function (e) { if (e.target === dialog) dialog.close(); });
  }

  // Botão flutuante: aparece depois que o formulário do topo sai da tela e some no fechamento
  if (fab && typeof IntersectionObserver === 'function') {
    var heroBox = document.getElementById('prelista');
    var finalBox = document.querySelector('.final-cta');
    var heroVisible = true;
    var finalVisible = false;
    var update = function () { fab.classList.toggle('is-on', !heroVisible && !finalVisible); };
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.target === heroBox) heroVisible = en.isIntersecting;
        if (en.target === finalBox) finalVisible = en.isIntersecting;
      });
      update();
    }, { threshold: 0 });
    if (heroBox) io.observe(heroBox);
    if (finalBox) io.observe(finalBox);
  }
})();
