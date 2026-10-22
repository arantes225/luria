const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const promptsFile = fs.readFileSync(path.join(root, "supabase/functions/professor-alex-gemini/prompts.ts"), "utf8");
const edgeFile = fs.readFileSync(path.join(root, "supabase/functions/professor-alex-gemini/index.ts"), "utf8");
const clientFile = fs.readFileSync(path.join(root, "assets/js/professor-alex-gemini.mjs"), "utf8");

test("Professor Alex prompt mestre contains core anti-robotic rules", () => {
  assert.match(promptsFile, /amigo próximo que também é professor de medicina/);
  assert.match(promptsFile, /Nunca envie mensagens de boas-vindas institucionais/);
  assert.match(promptsFile, /como uma pessoa conversando no WhatsApp/);
});

test("Modo Estourado contains maximum fury, authentic curse words, and aggressive directives", () => {
  assert.match(promptsFile, /MODO ESTOURADO \(INTENSIDADE MÁXIMA DE FÚRIA 5 DE 5\)/);
  assert.match(promptsFile, /preceptor mais casca-grossa, furioso, boca-suja, impaciente/);
  assert.match(promptsFile, /Chame a pessoa de burra diretamente e sem pudor/);
  assert.match(promptsFile, /tranca essa porra de faculdade agora/);
  assert.match(promptsFile, /Rude é o caralho/);
  assert.match(promptsFile, /Te amo é o caralho/);
  assert.match(promptsFile, /Tudo bem porra nenhuma/);
  assert.match(promptsFile, /Rigor científico absoluto/);
});

test("Modo Normal balances didactic precision and natural humor", () => {
  assert.match(promptsFile, /MODO ATUAL: MODO NORMAL/);
  assert.match(promptsFile, /em uma a três frases com a resposta exata/);
  assert.match(promptsFile, /sem enrolação e sem rodeios/);
});

test("Edge function integrates prompts module, multi-turn history, and configurable model", () => {
  assert.match(edgeFile, /getAlexSystemInstruction\(mode, channel\)/);
  assert.match(edgeFile, /rawHistory/);
  assert.match(edgeFile, /modelToUse/);
  assert.match(edgeFile, /thinkingLevel: depth === "aula" \\? "medium" : "minimal"/);
});

test("Client maintains session history and calibrated voice parameters", () => {
  assert.match(clientFile, /sessionHistory/);
  assert.match(clientFile, /history:\s*sessionHistory\.slice\(-8\)/);
  assert.match(clientFile, /utterance\.rate = isEstourado \? 1\.25 : 1\.04/);
  assert.match(clientFile, /utterance\.pitch = isEstourado \? 0\.82 : 1\.0/);
});
