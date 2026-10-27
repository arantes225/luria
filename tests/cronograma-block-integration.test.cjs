const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

test("imports spreadsheet block headings and schedules their lessons from the chosen block", () => {
  const controls = {
    "block-import-panel": { hidden: true },
    "block-import-anchor": { value: "2", innerHTML: "" },
    "block-import-start": { value: "2026-10-12" },
    "block-import-unit": { value: "week" },
    "block-import-summary": { textContent: "" }
  };
  const context = vm.createContext({
    console,
    window: {
      supabaseClient: null,
      docmapUser: null,
      LuriaBlockScheduler: require("../assets/js/schedule-block-import.js"),
      addEventListener() {}
    },
    document: {
      readyState: "loading",
      addEventListener() {},
      querySelector() { return { value: "dates" }; },
      getElementById(id) { return controls[id] || null; }
    }
  });
  vm.runInContext(fs.readFileSync(path.join(__dirname, "../assets/js/cronograma.js"), "utf8"), context);
  const matrix = [
    ["Bloco", "Aula", "Data"],
    ["Bloco 1", "", ""],
    ["", "Hipertensão", ""],
    ["", "Diabetes", ""],
    ["Bloco 2", "", ""],
    ["", "Hipertensão", ""]
  ];
  context.matrix = matrix;
  const parsed = vm.runInContext('parseWorkbookRows(matrix, "Cronograma").rows', context);
  assert.equal(parsed.length, 3);
  assert.deepEqual(Array.from(parsed, (row) => row.bloco), ["Bloco 1", "Bloco 1", "Bloco 2"]);

  context.rows = parsed;
  vm.runInContext("scheduleState.parsedRows = rows; scheduleState.parsedRows.forEach(row => { row.sourceDate = row.date || null; row.dateOverride = false; row.generatedByBlock = false; }); refreshBlockImportPlan();", context);
  assert.equal(controls["block-import-panel"].hidden, false);
  assert.deepEqual(Array.from(parsed, (row) => row.date), ["2026-10-05", "2026-10-07", "2026-10-12"]);

  const unique = vm.runInContext("dedupeParsedRows(scheduleState.parsedRows)", context);
  assert.equal(unique.length, 3);

  const pdfPage = vm.runInContext('parseGenericPdfLines({tokens:[{text:"Bloco 4",x:0,y:0},{text:"Aula de Pneumologia",x:0,y:12}],pageNumber:1})', context);
  assert.equal(pdfPage.currentBlock, "Bloco 4");
  assert.equal(pdfPage.rows[0].bloco, "Bloco 4");
  context.pdfBlock = pdfPage.currentBlock;
  const nextPage = vm.runInContext('parseGenericPdfLines({tokens:[{text:"Aula de Cardiologia",x:0,y:0}],pageNumber:2,currentBlock:pdfBlock})', context);
  assert.equal(nextPage.rows[0].bloco, "Bloco 4");
});
