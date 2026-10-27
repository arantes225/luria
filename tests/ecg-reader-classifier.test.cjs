const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { JSDOM } = require('jsdom');

test('ecg-reader rejeita imagens de baixa resolucao sem acionar api da nuvem', async () => {
  const root = path.resolve(__dirname, '..');
  const html = fs.readFileSync(path.join(root, 'trabalho/ecg/index.html'), 'utf8');
  const script = fs.readFileSync(path.join(root, 'assets/js/ecg-reader.js'), 'utf8');
  const dom = new JSDOM(html, { url: 'https://www.resibulando.online/trabalho/ecg/', runScripts: 'outside-only' });
  const { window } = dom;
  const { document } = window;

  let functionInvoked = false;
  window.supabaseClient = {
    functions: {
      invoke: async (name, payload) => {
        functionInvoked = true;
        return { data: { ok: true, result: {} } };
      }
    }
  };

  // Mock global objects that JSDOM doesn't implement fully out of the box
  window.URL.createObjectURL = () => 'blob:test';

  // Custom mock for Image to synchronously call onload
  let onLoadCallback = null;
  class MockImage {
    constructor() {
      this.naturalWidth = 600;
      this.naturalHeight = 400;
    }
    set src(value) {
      if (onLoadCallback) onLoadCallback();
    }
    set onload(cb) {
      onLoadCallback = cb;
    }
  }
  window.Image = MockImage;

  window.eval(script);

  const input = document.getElementById('ecg-image');
  const analyzeBtn = document.getElementById('ecg-analyze');
  const captureMetadata = document.getElementById('ecg-capture-metadata');

  // JSDOM does not implement window.DataTransfer.
  // We can mock the transfer object for our file input
  class DataTransfer {
      constructor() {
          this.items = {
              list: [],
              add: function(file) { this.list.push(file); }
          };
      }
      get files() {
          return this.items.list;
      }
  }

  // Trigger file selection
  // Create File explicitly handling Array as constructor parameter properly for jsdom
  const file = new window.File([''], 'low-res.jpg', { type: 'image/jpeg' });
  const transfer = new DataTransfer();
  transfer.items.add(file);
  // Override files directly since input.files setter might complain about DataTransfer in jsdom if we used standard DOM
  Object.defineProperty(input, 'files', { value: transfer.files });

  input.dispatchEvent(new window.Event('change', { bubbles: true }));

  // The MockImage's src setter synchronously triggers onload in our mock
  assert.match(captureMetadata.textContent, /resolução baixa/);
  assert.equal(analyzeBtn.disabled, true);

  assert.equal(functionInvoked, false, 'API da nuvem nao deve ser chamada para imagem de baixa resolucao');

  dom.window.close();
});

test('ecg-reader aceita imagem de alta resolucao e preenche achados apos mock de analise', async () => {
  const root = path.resolve(__dirname, '..');
  const html = fs.readFileSync(path.join(root, 'trabalho/ecg/index.html'), 'utf8');
  const script = fs.readFileSync(path.join(root, 'assets/js/ecg-reader.js'), 'utf8');
  const dom = new JSDOM(html, { url: 'https://www.resibulando.online/trabalho/ecg/', runScripts: 'outside-only' });
  const { window } = dom;
  const { document } = window;

  window.supabaseClient = {
    functions: {
      invoke: async (name, payload) => {
        return {
          data: {
            ok: true,
            result: {
              quality: "adequada",
              findings: [{ name: "Taquicardia Sinusal", confidence: "alta", evidence: "FC > 100" }],
              synthesis: "Ritmo sinusal acelerado."
            }
          }
        };
      }
    }
  };

  window.URL.createObjectURL = () => 'blob:test';

  let onLoadCallback = null;
  class MockImage {
    constructor() {
      this.naturalWidth = 2000;
      this.naturalHeight = 1500;
    }
    set src(value) {
      if (onLoadCallback) onLoadCallback();
    }
    set onload(cb) {
      onLoadCallback = cb;
    }
  }
  window.Image = MockImage;

  // FileReader Mock
  class MockFileReader {
    readAsDataURL(file) {
      this.result = "data:image/jpeg;base64,AABBCC";
      if (this.onload) this.onload();
    }
  }
  window.FileReader = MockFileReader;

  window.eval(script);

  const input = document.getElementById('ecg-image');
  const analyzeBtn = document.getElementById('ecg-analyze');
  const resultDiv = document.getElementById('ecg-result');
  const reviewCheckbox = document.getElementById('ecg-review-confirm');

  class DataTransfer {
      constructor() {
          this.items = {
              list: [],
              add: function(file) { this.list.push(file); }
          };
      }
      get files() {
          return this.items.list;
      }
  }

  const file = new window.File(['dummy data'], 'high-res.jpg', { type: 'image/jpeg' });
  Object.defineProperty(file, 'size', { value: 102400 });
  const transfer = new DataTransfer();
  transfer.items.add(file);
  Object.defineProperty(input, 'files', { value: transfer.files });

  input.dispatchEvent(new window.Event('change', { bubbles: true }));

  if (reviewCheckbox) {
      reviewCheckbox.checked = true;
      reviewCheckbox.dispatchEvent(new window.Event('change', { bubbles: true }));
  }

  assert.equal(analyzeBtn.disabled, false);

  // Click analyze
  analyzeBtn.click();

  // Await microtasks to let the mock async function resolve
  await new Promise(resolve => setImmediate(resolve));

  // verify DOM updates
  assert.match(resultDiv.textContent, /adequada/);
  assert.match(resultDiv.textContent, /Taquicardia Sinusal/);
  assert.match(resultDiv.textContent, /Ritmo sinusal acelerado/);

  dom.window.close();
});
