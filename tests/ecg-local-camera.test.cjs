const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { JSDOM } = require('jsdom');

function setupDom() {
  const root = path.resolve(__dirname, '..');
  // Inject HTML since ecg-local-camera looks for specific IDs not present in ecg-camera-map HTML structure
  // They are likely from another page or another tab.
  const html = `
    <!DOCTYPE html>
    <html>
      <body>
        <video id="ecg-camera-video"></video>
        <canvas id="ecg-camera-canvas"></canvas>
        <button id="ecg-camera-start"></button>
        <button id="ecg-camera-stop"></button>
        <button id="ecg-camera-torch"></button>
        <button id="ecg-camera-capture"></button>
        <div id="ecg-camera-status"></div>
        <div id="ecg-camera-quality"></div>
        <div id="ecg-camera-guidance"></div>
      </body>
    </html>
  `;
  const script = fs.readFileSync(path.join(root, 'assets/js/ecg-local-camera.js'), 'utf8');
  const dom = new JSDOM(html, { runScripts: 'outside-only' });
  const { window } = dom;
  const { document } = window;

  // mock mediaDevices
  const track = { getCapabilities: () => ({ torch: true }), getSettings: () => ({ torch: false }), applyConstraints: async () => {}, stop: () => {} };
  Object.defineProperty(window.navigator, 'mediaDevices', { value: {
    getUserMedia: async () => ({ getVideoTracks: () => [track], getTracks: () => [track] })
  } });

  // mock setInterval/clearInterval to manually trigger inspectFrame
  let inspectCallback = null;
  window.setInterval = (cb) => { inspectCallback = cb; return 1; };
  window.clearInterval = () => { inspectCallback = null; };
  window.getInspectCallback = () => inspectCallback;

  // set video dims
  const video = document.getElementById('ecg-camera-video');
  Object.defineProperty(video, 'videoWidth', { value: 1920 });
  Object.defineProperty(video, 'videoHeight', { value: 1080 });
  video.play = async () => {};

  return { dom, window, document, script, video };
}

test('ecg-local-camera rejeita quadros escuros e orienta para iluminacao', async () => {
  const { dom, window, document, script } = setupDom();

  const image = new window.Uint8ClampedArray(160 * 90 * 4);
  for (let i = 0; i < image.length; i += 4) {
    image[i] = image[i+1] = image[i+2] = 20; // dark pixels (< 35)
    image[i+3] = 255;
  }

  window.HTMLCanvasElement.prototype.getContext = function () {
    return {
      drawImage() {},
      getImageData: () => ({ data: image, width: 160, height: 90 })
    };
  };

  window.eval(script);

  document.getElementById('ecg-camera-start').click();
  await new Promise(resolve => setImmediate(resolve));

  const inspect = window.getInspectCallback();
  assert.ok(inspect, "interval should be set");
  inspect();

  const guidance = document.getElementById('ecg-camera-guidance');
  assert.match(guidance.textContent, /Aumente a iluminação/);

  const capture = document.getElementById('ecg-camera-capture');
  assert.equal(capture.disabled, true);

  dom.window.close();
});

test('ecg-local-camera rejeita quadros sem textura', async () => {
  const { dom, window, document, script } = setupDom();

  const image = new window.Uint8ClampedArray(160 * 90 * 4);
  for (let i = 0; i < image.length; i += 4) {
    image[i] = image[i+1] = image[i+2] = 120; // flat color, good brightness, no texture
    image[i+3] = 255;
  }

  window.HTMLCanvasElement.prototype.getContext = function () {
    return {
      drawImage() {},
      getImageData: () => ({ data: image, width: 160, height: 90 })
    };
  };

  window.eval(script);

  document.getElementById('ecg-camera-start').click();
  await new Promise(resolve => setImmediate(resolve));

  window.getInspectCallback()();

  const guidance = document.getElementById('ecg-camera-guidance');
  assert.match(guidance.textContent, /ainda não vê textura/);

  dom.window.close();
});

test('ecg-local-camera exige estabilidade antes de liberar captura', async () => {
  const { dom, window, document, script } = setupDom();

  const image = new window.Uint8ClampedArray(160 * 90 * 4);
  for (let i = 0; i < image.length; i += 4) {
    // Generate texture by alternating colors
    image[i] = image[i+1] = image[i+2] = (i % 8 === 0) ? 60 : 180;
    image[i+3] = 255;
  }

  window.HTMLCanvasElement.prototype.getContext = function () {
    return {
      drawImage() {},
      getImageData: () => ({ data: image, width: 160, height: 90 })
    };
  };

  window.eval(script);

  document.getElementById('ecg-camera-start').click();
  await new Promise(resolve => setImmediate(resolve));

  const inspect = window.getInspectCallback();

  const capture = document.getElementById('ecg-camera-capture');
  const guidance = document.getElementById('ecg-camera-guidance');

  // frame 1-4
  for(let n = 1; n <= 4; n++) {
    inspect();
    assert.equal(capture.disabled, true);
    assert.match(guidance.textContent, /Mantenha DII dentro da moldura/);
  }

  // frame 5
  inspect();
  assert.equal(capture.disabled, false);
  assert.match(guidance.textContent, /Quadro estável para captura/);

  dom.window.close();
});
