import './professor-alex-mascot.mjs?v=20261014-companion1';
import {bindAlex} from './professor-alex-integration.mjs?v=20261014-companion1';

// Page adapter: keep the reusable 3D component independent of the lesson form.
const alex = document.getElementById('alex-mascot');
if (alex) {
  const integration=bindAlex(alex);
  const modes = [...document.querySelectorAll('[data-alex-mode]')];
  const cards = [...document.querySelectorAll('[data-alex-intent]')];
  const isAngry = () => modes.some(button => button.dataset.alexMode === 'estourado' && button.getAttribute('aria-pressed') === 'true');
  const intentFace = () => ({learn:'happy',question:'thoughtful',material:'attentive'}[document.querySelector('[data-alex-intent].is-active')?.dataset.alexIntent] || 'happy');
  const react = (gesture, face = intentFace()) => {
    alex.expression = isAngry() ? 'angry' : face;
    alex.playAnimation(isAngry() ? 'angry' : gesture);
  };
  const welcome = () => integration.react('welcome');
  if (alex.renderer) welcome();
  else alex.addEventListener('alex-ready', welcome, {once:true});
  modes.forEach(button => button.addEventListener('click', () => {
    alex.expression = isAngry() ? 'angry' : intentFace();
    alex.playAnimation(isAngry() ? 'angryScene' : 'wave');
  }));
  cards.forEach(card => card.addEventListener('click', () => {
    react({learn:'explaining',question:'thinking',material:'reading'}[card.dataset.alexIntent]);
  }));
  document.getElementById('alex-file')?.addEventListener('change', event => {
    if (event.target.files?.length) react('reading','attentive');
  });
  document.getElementById('alex-form')?.addEventListener('submit', () => react('explaining','attentive'));
}
