const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { JSDOM } = require('jsdom');

test('standalone capture page (/trabalho/ecg/captura/) is independent, full-screen, isolated from LURIA menus, and stops tracks cleanly', async () => {
  const root = path.resolve(__dirname, '..');
  const captureHtml = fs.readFileSync(path.join(root, 'trabalho/ecg/captura/index.html'), 'utf8');
  const contractsSrc = fs.readFileSync(path.join(root, 'assets/js/ecg-contracts.js'), 'utf8');
  const extractorSrc = fs.readFileSync(path.join(root, 'assets/js/ecg-signal-extractor.js'), 'utf8');
  const cvEngineSrc = fs.readFileSync(path.join(root, 'assets/js/ecg-cv-engine.js'), 'utf8');
  const cameraSrc = fs.readFileSync(path.join(root, 'assets/js/ecg-smart-camera.js'), 'utf8');
  const rotateSrc = fs.readFileSync(path.join(root, 'assets/js/luria-rotate-controller.js'), 'utf8');
  const pageSrc = fs.readFileSync(path.join(root, 'assets/js/ecg-capture-page.js'), 'utf8');

  const dom = new JSDOM(captureHtml, {
    url: 'https://www.resibulando.online/trabalho/ecg/captura/',
    runScripts: 'outside-only'
  });
  const { window } = dom;
  const { document } = window;

  // 1. Verificar isolamento estrito contra menus/barras da LURIA
  assert.equal(document.getElementById('sidebar'), null, 'Standalone capture page must have NO #sidebar');
  assert.equal(document.querySelector('.ui-mobile-navigation'), null, 'Standalone capture page must have NO .ui-mobile-navigation');
  assert.equal(document.querySelector('.ui-mobile-tools'), null, 'Standalone capture page must have NO .ui-mobile-tools');
  assert.equal(document.querySelector('.topbar'), null, 'Standalone capture page must have NO global .topbar');

  // 2. Elementos essenciais da câmera em tela cheia presentes
  const video = document.getElementById('ecg-video');
  const reticle = document.getElementById('ecg-reticle');
  const btnExit = document.getElementById('ecg-btn-exit');
  const btnSnap = document.getElementById('ecg-btn-snap');
  assert.notEqual(video, null, 'Video element must exist');
  assert.notEqual(reticle, null, 'Reticle element must exist');
  assert.notEqual(btnExit, null, 'Exit button must exist');
  assert.notEqual(btnSnap, null, 'Snap button must exist');
  assert.equal(btnExit.getAttribute('href'), '/trabalho/ecg/');

  let stopped = false;
  const track = {
    getCapabilities: () => ({ torch: true }),
    stop: () => { stopped = true; },
    applyConstraints: async () => {}
  };

  Object.defineProperty(window.navigator, 'mediaDevices', {
    value: {
      getUserMedia: async () => ({
        getVideoTracks: () => [track],
        getTracks: () => [track]
      })
    }
  });

  Object.defineProperty(video, 'videoWidth', { value: 1920 });
  Object.defineProperty(video, 'videoHeight', { value: 1080 });
  Object.defineProperty(video, 'readyState', { value: 4 });
  video.play = async () => {};

  window.HTMLCanvasElement.prototype.getContext = function () {
    return {
      drawImage() {},
      getImageData: () => ({
        data: new Uint8ClampedArray(320 * 240 * 4),
        width: 320,
        height: 240
      })
    };
  };

  window.requestAnimationFrame = cb => setTimeout(cb, 16);
  window.cancelAnimationFrame = id => clearTimeout(id);

  window.eval(rotateSrc);
  window.eval(contractsSrc);
  window.eval(extractorSrc);
  window.eval(cvEngineSrc);
  window.eval(cameraSrc);
  window.eval(pageSrc);

  // Dispara DOMContentLoaded para inicializar
  window.document.dispatchEvent(new window.Event('DOMContentLoaded'));
  await new Promise(resolve => setTimeout(resolve, 50));

  const controller = window.LuriaCapturePage.getCameraController();
  assert.notEqual(controller, null, 'CameraController should be initialized');

  // 3. Teste de parada limpa ao sair
  btnExit.click();
  assert.equal(stopped, true, 'Camera tracks must stop cleanly when clicking Voltar ao ECG');

  dom.window.close();
});

test('orientation hint on standalone capture dismisses and adapts aspect ratio on "Manter vertical"', async () => {
  const root = path.resolve(__dirname, '..');
  const captureHtml = fs.readFileSync(path.join(root, 'trabalho/ecg/captura/index.html'), 'utf8');
  const rotateSrc = fs.readFileSync(path.join(root, 'assets/js/luria-rotate-controller.js'), 'utf8');
  const pageSrc = fs.readFileSync(path.join(root, 'assets/js/ecg-capture-page.js'), 'utf8');

  const dom = new JSDOM(captureHtml, {
    url: 'https://www.resibulando.online/trabalho/ecg/captura/',
    runScripts: 'outside-only'
  });
  const { window } = dom;
  const { document } = window;

  // Mock portrait mode
  window.innerHeight = 800;
  window.innerWidth = 400;
  window.matchMedia = query => ({ matches: query.includes('portrait') });

  window.requestAnimationFrame = cb => setTimeout(cb, 16);
  window.cancelAnimationFrame = id => clearTimeout(id);

  window.eval(rotateSrc);
  window.eval(pageSrc);

  const rotateCtrl = window.LuriaCapturePage.getRotateController();
  assert.notEqual(rotateCtrl, null);

  rotateCtrl.start();
  const dialog = rotateCtrl.getElement();
  assert.notEqual(dialog, null);
  assert.equal(dialog.hidden, false, 'Rotate dialog should appear in portrait mode');

  const dismissBtn = dialog.querySelector('.luria-rotate-action');
  assert.notEqual(dismissBtn, null);
  assert.equal(dismissBtn.textContent, 'Manter vertical');

  // Clica em "Manter vertical"
  dismissBtn.click();
  assert.equal(dialog.hidden, true, 'Rotate dialog must hide on dismiss');

  // Retículo deve ter adaptado aspect-ratio sem quebrar a tela
  const reticle = document.getElementById('ecg-reticle');
  assert.equal(reticle.style.aspectRatio, '4 / 3');

  // Não deve ter nenhum elemento de /aprender/ecg/ ou estudo
  assert.equal(document.getElementById('ecg-dataset'), null);
  assert.equal(document.getElementById('ecg-save'), null);

  dom.window.close();
});
