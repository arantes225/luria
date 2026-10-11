const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { JSDOM } = require('jsdom');
const html = fs.readFileSync(path.join(__dirname, '../trabalho/passometro/index.html'), 'utf8');

test('Passômetro remains executable when Live Server injects before closing body tags', () => {
  const injected = html.replace(/<\/body>/gi, '<script>/* Live Server reload */</script></body>');
  const document = new JSDOM(injected).window.document;
  const scripts = [...document.scripts].filter(script => !script.src);
  assert.equal(scripts.length, 2, 'reload belongs after the complete application script');
  for (const script of scripts) assert.doesNotThrow(() => new vm.Script(script.textContent));
  document.querySelectorAll('script, style').forEach(element => element.remove());
  assert.equal(document.body.textContent.includes('safeFileName'), false, 'application source must not become page text');
  assert.ok(document.getElementById('pm-new'));
  assert.ok(document.getElementById('pm-patient-form'));
});
