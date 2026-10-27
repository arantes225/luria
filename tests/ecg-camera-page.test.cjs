const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { JSDOM } = require('jsdom');

test('scanner opens as a full-screen camera page and manual capture tolerates ordinary motion', async () => {
  const root = path.resolve(__dirname, '..');
  const html = fs.readFileSync(path.join(root, 'trabalho/ecg/index.html'), 'utf8');
  const script = fs.readFileSync(path.join(root, 'assets/js/ecg-camera-map.js'), 'utf8');
  const dom = new JSDOM(html, { url: 'https://www.resibulando.online/trabalho/ecg/', runScripts: 'outside-only' });
  const { window } = dom;
  const { document } = window;
  let inspect;
  let stopped = false;
  window.matchMedia = () => ({ matches: false });
  window.setInterval = callback => { inspect = callback; return 1; };
  window.clearInterval = () => { inspect = null; };
  window.LuriaEcgLayout = { detect: () => ({ kind: 'unknown', rows: 0 }) };
  window.LuriaEcgFrameGuide = { locate: () => ({ ready: false, instruction: 'Centralize o ECG.' }) };
  const track = {
    getCapabilities: () => ({}),
    stop: () => { stopped = true; }
  };
  Object.defineProperty(window.navigator, 'mediaDevices', { value: {
    getUserMedia: async () => ({ getVideoTracks: () => [track], getTracks: () => [track] })
  } });
  const video = document.getElementById('ecg-camera-video');
  Object.defineProperty(video, 'videoWidth', { value: 1920 });
  Object.defineProperty(video, 'videoHeight', { value: 1080 });
  video.play = async () => {};
  const image = new Uint8ClampedArray(480 * 270 * 4);
  for (let i = 0; i < image.length; i += 4) {
    const value = (i / 4) % 16 < 8 ? 70 : 190;
    image[i] = image[i + 1] = image[i + 2] = value;
    image[i + 3] = 255;
  }
  window.HTMLCanvasElement.prototype.getContext = function () {
    return {
      drawImage() {}, translate() {}, rotate() {}, setTransform() {},
      getImageData: () => ({ data: image, width: 480, height: 270 })
    };
  };
  window.eval(script);
  const cameraPage = document.getElementById('ecg-camera-page');
  const capture = document.getElementById('ecg-camera-capture');
  document.getElementById('ecg-camera-start').click();
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(cameraPage.hidden, false);
  assert.equal(cameraPage.parentElement, document.body);
  assert.equal(document.body.classList.contains('ecg-camera-open'), true);
  assert.equal(window.location.hash, '#camera');
  assert.equal(window.location.pathname, '/trabalho/ecg/');
  assert.equal(document.getElementById('ecg-camera-stage').hidden, false);
  assert.equal(capture.closest('.ecg-camera-stage') !== null, true);
  assert.equal(typeof inspect, 'function');
  inspect();
  assert.equal(capture.disabled, false, 'manual capture should not wait for motion-free frames');
  document.getElementById('ecg-camera-stop').click();
  assert.equal(cameraPage.hidden, true);
  assert.equal(document.body.classList.contains('ecg-camera-open'), false);
  assert.equal(window.location.hash, '');
  assert.equal(window.location.pathname, '/trabalho/ecg/');
  assert.equal(stopped, true);
  dom.window.close();
});

test('camera area is visible while permission is pending and closing cancels a late stream', async () => {
  const root = path.resolve(__dirname, '..');
  const html = fs.readFileSync(path.join(root, 'trabalho/ecg/index.html'), 'utf8');
  const script = fs.readFileSync(path.join(root, 'assets/js/ecg-camera-map.js'), 'utf8');
  const dom = new JSDOM(html, { url: 'https://www.resibulando.online/trabalho/ecg/', runScripts: 'outside-only' });
  const { window } = dom;
  const { document } = window;
  let allowCamera, stopped = false;
  window.matchMedia = () => ({ matches: false });
  window.LuriaEcgLayout = { detect() {} };
  window.LuriaEcgFrameGuide = { locate() {} };
  window.HTMLCanvasElement.prototype.getContext = () => ({});
  Object.defineProperty(window.navigator, 'mediaDevices', { value: {
    getUserMedia: () => new Promise(resolve => { allowCamera = resolve; })
  } });
  window.eval(script);
  document.getElementById('ecg-camera-start').click();
  assert.equal(document.getElementById('ecg-camera-page').hidden, false);
  assert.equal(document.getElementById('ecg-camera-stage').hidden, false);
  assert.match(document.getElementById('ecg-camera-overlay').textContent, /Aguardando acesso/);
  document.getElementById('ecg-camera-stop').click();
  allowCamera({ getTracks: () => [{ stop: () => { stopped = true; } }] });
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(stopped, true);
  assert.equal(document.getElementById('ecg-camera-page').hidden, true);
  dom.window.close();
});
