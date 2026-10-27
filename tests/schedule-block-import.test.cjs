const test = require("node:test");
const assert = require("node:assert/strict");
const { parseBlockNumber, periodBounds, planBlockDates } = require("../assets/js/schedule-block-import.js");

test("recognizes numbered blocks without treating lesson text as a block", () => {
  assert.equal(parseBlockNumber("Bloco 02 (8 aulas)"), 2);
  assert.equal(parseBlockNumber("Módulo 3"), 3);
  assert.equal(parseBlockNumber("Semana 4"), 4);
  assert.equal(parseBlockNumber("Cardiologia bloco 2"), null);
});

test("places earlier and later weekly blocks around the chosen reference", () => {
  const rows = ["Bloco 2", "Bloco 2", "Bloco 3", "Bloco 4"].map((bloco) => ({
    bloco, kind: "lesson", sourceDate: null, dateOverride: false
  }));
  const result = planBlockDates(rows, {
    unit: "week", anchorBlock: 3, startDate: "2026-10-12", weekdays: [1, 3, 5]
  });
  assert.deepEqual(result.assignments.map((item) => item.date), [
    "2026-10-05", "2026-10-07", "2026-10-12", "2026-10-19"
  ]);
});

test("uses calendar months and clamps dates at the end of short months", () => {
  assert.deepEqual(periodBounds("2027-01-31", 2, 3, "month").map((date) => date.toISOString().slice(0, 10)), [
    "2027-02-28", "2027-03-31"
  ]);
  assert.deepEqual(periodBounds("2027-01-31", 2, 1, "month").map((date) => date.toISOString().slice(0, 10)), [
    "2026-12-31", "2027-01-31"
  ]);
});

test("keeps original and manually edited dates, and distributes only undated lessons", () => {
  const rows = [
    { bloco: "Bloco 1", kind: "lesson", sourceDate: "2026-10-06" },
    { bloco: "Bloco 1", kind: "lesson", dateOverride: true, date: "2026-10-08" },
    { bloco: "Bloco 1", kind: "lesson" },
    { bloco: "Bloco 1", kind: "simulado" },
    { bloco: "", kind: "lesson" }
  ];
  const result = planBlockDates(rows, {
    unit: "fortnight", anchorBlock: 1, startDate: "2026-10-05", weekdays: [1, 3, 5]
  });
  assert.deepEqual(result.assignments, [{ index: 2, date: "2026-10-05" }]);
});
