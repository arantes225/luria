const { test } = require("node:test");
const assert = require("node:assert/strict");
const vm = require("node:vm");
const { page, read } = require("./fixtures/frontend.cjs");
function game(t, id) {
  const slugs = {
    relampago: "plantao-relampago",
    sequencia: "sequencia-salvadora",
    escape: "escapando-do-plantao",
  };
  const { w, d } = page(t, `jogos/${slugs[id]}/index.html`);
  let now = 1000,
    nextId = 0;
  const intervals = new Map(),
    timeouts = new Map(),
    storage = new Map();
  w.Date.now = () => now;
  w.setInterval = (fn) => {
    intervals.set(++nextId, fn);
    return nextId;
  };
  w.clearInterval = (id) => intervals.delete(id);
  w.setTimeout = (fn, ms) => {
    timeouts.set(++nextId, { fn, at: now + ms });
    return nextId;
  };
  w.clearTimeout = (id) => timeouts.delete(id);
  w.docmapUser = { id: "a" };
  w.LuriaLocalOwnerStore = {
    ownerId: "a",
    read: (k) => storage.get(w.LuriaLocalOwnerStore.ownerId + ":" + k),
    write: (k, v) => {
      storage.set(w.LuriaLocalOwnerStore.ownerId + ":" + k, v);
      return true;
    },
  };
  d.body.classList.add("app-ready");
  for (const file of ["content/initial", "common", id])
    w.eval(read(`assets/js/games/${file}.js`));
  const click = (s) => {
    const el = d.querySelector(s);
    assert.ok(el, s);
    el.click();
  };
  const submit = () =>
    d
      .querySelector("form")
      .dispatchEvent(
        new w.Event("submit", { bubbles: true, cancelable: true }),
      );
  const tick = (ms) => {
    now += ms;
    [...intervals.values()].forEach((fn) => fn());
    for (const [key, task] of [...timeouts])
      if (task.at <= now) {
        timeouts.delete(key);
        task.fn();
      }
  };
  return { w, d, click, submit, tick, storage, intervals, timeouts };
}
test("initial content has unique IDs, referenced sources, four distinct options and valid order permutations", () => {
  const ctx = { window: {} };
  vm.runInNewContext(read("assets/js/games/content/initial.js"), ctx);
  const c = ctx.window.LuriaGameContent;
  const all = [...c.questions, ...c.sequences, ...c.adventure];
  assert.equal(new Set(all.map((q) => q.id)).size, all.length);
  assert.equal(c.questions.length, 30);
  assert.equal(c.adventure.length, 9);
  for (const x of all) {
    assert.ok(x.refs.length);
    for (const ref of x.refs) assert.match(c.sources[ref].url, /^https:\/\//);
    if (x.options) {
      assert.equal(x.options.length, 4);
      assert.equal(new Set(x.options).size, 4);
      if (x.type !== "select") assert.ok(x.answer >= 0 && x.answer < 4);
    }
    if (x.steps) {
      for (const order of x.variants)
        assert.deepEqual(
          [...order].sort((a, b) => a - b),
          Array.from(x.steps, (_, i) => i),
        );
    }
  }
  for (const x of c.sequences)
    assert.ok(
      x.level === 1
        ? x.steps.length === 4
        : x.level === 2
          ? x.steps.length >= 5 && x.steps.length <= 6
          : x.steps.length >= 6 && x.steps.length <= 7,
    );
});
test("timed game locks duplicate answers and cancels stale callbacks when restarted", (t) => {
  const g = game(t, "relampago");
  g.submit();
  const prompt = g.d.querySelector("h2.g-case").textContent;
  const q = g.w.LuriaGameContent.questions.find((x) => x.prompt === prompt);
  g.click(`[data-answer="${q.answer}"]`);
  const score = g.d.querySelector("#r-score").textContent;
  g.click(`[data-answer="${q.answer}"]`);
  assert.equal(g.d.querySelector("#r-score").textContent, score);
  g.click('[data-action="restart"]');
  assert.equal(g.intervals.size, 0);
  assert.equal(g.timeouts.size, 0);
  g.tick(120000);
  assert.ok(g.d.querySelector("form"));
});
test("timer expiration produces coherent zero-answer results and cannot score later", (t) => {
  const g = game(t, "relampago");
  g.submit();
  g.tick(90000);
  assert.match(g.d.body.textContent, /Tempo encerrado/);
  assert.match(g.d.body.textContent, /Nenhuma resposta/);
  assert.equal(g.intervals.size, 0);
  assert.ok(!g.d.querySelector("[data-answer]"));
  g.click('[data-action="again"]');
  assert.ok(g.d.querySelector("form"));
});
test("finite timed pool ends once and records precision and review without recycled questions", (t) => {
  const g = game(t, "relampago");
  g.d.querySelector('[name="specialty"]').value = "Clínica Médica";
  g.submit();
  for (let i = 0; i < 2; i++) {
    const q = g.w.LuriaGameContent.questions.find(
      (q) => q.prompt === g.d.querySelector("h2.g-case").textContent,
    );
    g.click(`[data-answer="${i === 0 ? q.answer : (q.answer + 1) % 4}"]`);
    g.tick(1500);
  }
  assert.match(g.d.body.textContent, /Acervo deste recorte concluído/);
  assert.match(g.d.body.textContent, /50%/);
  assert.equal(g.d.querySelectorAll(".g-review details").length, 2);
  assert.equal(g.storage.size, 1);
});
test("empty filters are recoverable", (t) => {
  const g = game(t, "sequencia");
  g.d.querySelector('[name="specialty"]').value = "Pediatria";
  g.submit();
  assert.match(g.d.body.textContent, /Sem desafios/);
  g.click('[data-action="setup"]');
  assert.ok(g.d.querySelector("form"));
});
function solve(g) {
  const host = g.d.querySelector(".g-sort");
  const ids = [...host.children].map((li) => +li.dataset.id);
  const desired = [...ids].sort((a, b) => a - b);
  for (let target = 0; target < desired.length; target++) {
    let pos = [...g.d.querySelector(".g-sort").children].findIndex(
      (li) => +li.dataset.id === desired[target],
    );
    while (pos > target) {
      g.click(`[data-move="${pos}"][data-dir="-1"]`);
      pos--;
    }
  }
}
test("sequence supports accessible reorder, complete progression, retry and review", (t) => {
  const g = game(t, "sequencia");
  g.submit();
  for (let i = 0; i < 3; i++) {
    solve(g);
    g.click('[data-action="confirm"]');
    assert.match(g.d.body.textContent, /Sequência resolvida/);
    assert.ok(g.d.querySelector(".g-refs a"));
    g.click('[data-action="next"]');
  }
  assert.match(g.d.body.textContent, /Conexões que fazem sentido/);
  g.click('[data-action="again"]');
  assert.ok(g.d.querySelector("form"));
});
test("sequence reveals recommended order only after solving or opting into guided review", (t) => {
  const g = game(t, "sequencia");
  g.d.querySelector('[name="specialty"]').value = "Clínica Médica";
  g.submit();
  assert.ok(!g.d.querySelector("details"));
  for (let i = 0; i < 3; i++) g.click('[data-action="confirm"]');
  assert.ok(!g.d.querySelector("details"));
  g.click('[data-action="reveal"]');
  assert.match(g.d.body.textContent, /Revisão guiada concluída/);
  assert.match(
    g.d.querySelector(".g-stars").getAttribute("aria-label"),
    /0 de 3/,
  );
});
test("adventure mixes mechanics, retries failed decisions, animates its scene panel and finishes all chapters", (t) => {
  const g = game(t, "escape");
  g.click('[data-action="start"]');
  g.click('[data-option="0"]');
  g.click('[data-action="confirm"]');
  assert.match(g.d.body.textContent, /pendência continua aberta/);
  assert.ok(!g.d.querySelector('[data-action="next"]'));
  assert.ok(!g.d.querySelector(".e-journey-running"));
  for (let i = 0; i < 9; i++) {
    const s = g.w.LuriaGameContent.adventure[i];
    if (s.type === "sort") solve(g);
    else if (s.type === "select")
      s.answers.forEach((answer) => g.click(`[data-option="${answer}"]`));
    else g.click(`[data-option="${s.answer}"]`);
    g.click('[data-action="confirm"]');
    assert.equal(g.d.querySelector(".e-map"), null);
    assert.ok(g.d.querySelector(".e-journey-stage"));
    assert.equal(g.d.querySelector(".e-journey").dataset.scene, s.id);
    assert.ok(g.d.querySelector(".e-journey-running"));
    assert.equal(g.d.querySelector(".e-journey-from").textContent, s.room);
    assert.equal(
      g.d.querySelector(".e-journey-to").textContent,
      g.w.LuriaGameContent.adventure[i + 1]?.room || "Fim do plantão",
    );
    if (i < 8)
      assert.match(g.d.querySelector(".e-journey-contact").textContent, /Paciente|Profissional/);
    else assert.equal(g.d.querySelector(".e-journey-contact"), null);
    assert.equal(g.d.querySelector('[data-action="next"]').disabled, true);
    g.tick(2200);
    assert.equal(g.d.querySelector('[data-action="next"]').disabled, false);
    g.click('[data-action="next"]');
    if (i < 8) assert.ok(!g.d.querySelector(".e-journey-running"));
  }
  assert.match(g.d.body.textContent, /Turno entregue/);
  assert.match(g.d.body.textContent, /8\/9/);
  g.click('[data-action="again"]');
  assert.ok(g.d.querySelector('[data-action="start"]'));
});
test("owner changes discard active rounds instead of assigning them to the next account", (t) => {
  const g = game(t, "relampago");
  g.submit();
  g.w.LuriaLocalOwnerStore.ownerId = "b";
  g.w.dispatchEvent(new g.w.CustomEvent("luria:owner-changed"));
  g.tick(100000);
  assert.ok(g.d.querySelector("form"));
  assert.equal(g.storage.size, 0);
});
test("storage failure leaves timed results playable and clearly unsaved", (t) => {
  const g = game(t, "relampago");
  g.w.LuriaLocalOwnerStore.write = () => {
    throw Error("quota");
  };
  g.submit();
  g.click('[data-action="finish"]');
  assert.match(g.d.body.textContent, /Não foi possível salvar/);
  assert.ok(g.d.querySelector('[data-action="again"]'));
});
test("new pages retain strict CSP, authenticated boot and matching hub links", () => {
  const { JSDOM } = require("jsdom");
  const { expectedPolicy } = require("../scripts/sync-csp.cjs");
  for (const slug of [
    "plantao-relampago",
    "sequencia-salvadora",
    "escapando-do-plantao",
  ]) {
    const html = read(`jogos/${slug}/index.html`),
      dom = new JSDOM(html);
    try {
      const doc = dom.window.document;
      assert.equal(doc.querySelector("base").getAttribute("href"), "/");
      assert.equal(
        doc.querySelector('meta[http-equiv="Content-Security-Policy"]').content,
        expectedPolicy(html),
      );
      assert.ok(doc.querySelector('script[src^="/assets/js/app.js"]'));
      assert.ok(doc.querySelector('script[src^="/assets/js/pwa.js"]'));
      assert.ok(read("jogos/index.html").includes(`href="/jogos/${slug}/"`));
    } finally {
      dom.window.close();
    }
  }
});
test("PWA caches only public game shells and local game assets for subsequent offline visits", async () => {
  const { workerFixture, resource } = require("./fixtures/service-worker.cjs");
  let online = true;
  const f = workerFixture({
    fetch: async (req) => {
      if (!online) throw Error("offline");
      return resource(req, "public game bytes");
    },
  });
  for (const url of [
    "/jogos/",
    "/jogos/plantao-relampago/",
    "/jogos/sequencia-salvadora/",
    "/jogos/escapando-do-plantao/",
    "/assets/js/games/content/initial.js?v=1",
  ]) {
    online = true;
    let response = await f.run(url);
    await response.done();
    assert.equal(await response.response.text(), "public game bytes");
    online = false;
    response = await f.run(url);
    await response.done();
    assert.equal(await response.response.text(), "public game bytes");
  }
});
test("a repeated click on an old next button cannot skip another scene or challenge", (t) => {
  const s = game(t, "sequencia");
  s.submit();
  solve(s);
  s.click('[data-action="confirm"]');
  const old = s.d.querySelector('[data-action="next"]');
  old.click();
  old.click();
  assert.match(s.d.querySelector(".g-kicker").textContent, /2\/3/);
  const e = game(t, "escape");
  e.click('[data-action="start"]');
  e.click('[data-option="1"]');
  e.click('[data-action="confirm"]');
  const next = e.d.querySelector('[data-action="next"]');
  e.tick(2200);
  next.click();
  next.click();
  assert.match(
    e.d.querySelector(".e-story .g-kicker").textContent,
    /Cena 2\/9/,
  );
});
