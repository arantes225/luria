/* Small behavior fixes that must be shared by the reviewed pages. */
(() => {
  'use strict';
  const init = () => {
    if (!document.querySelector('link[data-luria-feedback-style]')) {
      const style = document.createElement('link');
      style.rel = 'stylesheet'; style.href = '/assets/css/feedback-checklist.css?v=5'; style.dataset.luriaFeedbackStyle = 'true';
      document.head.append(style);
    }
    const topbar = document.querySelector('header.topbar');
    if (topbar) {
      const walker = document.createTreeWalker(topbar, NodeFilter.SHOW_TEXT);
      const nodes = [];
      while (walker.nextNode()) nodes.push(walker.currentNode);
      nodes.forEach(node => { node.nodeValue = node.nodeValue.replace(/\\n/g, '').replace(/\n+/g, ' '); });
    }

    if (document.body?.dataset.page === 'amigos') {
      const rooms = document.querySelector('#community-rooms');
      const join = document.querySelector('#social-join-form');
      const create = document.querySelector('#friends-create-room-toggle');
      if (rooms && join && create && !join.contains(create)) {
        create.classList.add('feedback-room-create');
        join.append(create);
      }
      const activity = document.querySelector('.social-activity');
      const intro = activity?.querySelector('.sc-activity-intro');
      const hideActivityIntro = () => document.querySelectorAll('.social-activity .sc-activity-intro').forEach(node => {
        node.hidden = true;
        node.style.display = 'none';
      });
      hideActivityIntro();
      if (activity && !activity.dataset.feedbackIntroObserver) {
        activity.dataset.feedbackIntroObserver = 'true';
        new MutationObserver(hideActivityIntro).observe(activity, {childList:true, subtree:true});
      }
      if (!document.body.dataset.feedbackIntroObserver) {
        document.body.dataset.feedbackIntroObserver = 'true';
        new MutationObserver(hideActivityIntro).observe(document.body, {childList:true, subtree:true});
      }
      if (activity && !activity.querySelector('.feedback-room-score')) {
        const score = document.createElement('section');
        score.className = 'feedback-room-score';
        score.setAttribute('aria-label', 'Pontuação da sala');
        score.innerHTML = '<strong>Pontuação da sala</strong><p>Acompanhe o avanço da turma conforme cada participante responde e conclui a atividade.</p><div id="feedback-room-scoreboard" aria-live="polite">A pontuação aparecerá aqui quando a atividade começar.</div>';
        (intro || activity.firstElementChild)?.after(score);
      }
    }
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, {once:true}); else init();
})();
