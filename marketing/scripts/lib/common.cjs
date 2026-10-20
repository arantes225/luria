'use strict';
/* Utilidades compartilhadas do Marketing Studio (caminhos, ffmpeg, logs). */
const fs = require('node:fs');
const path = require('node:path');
const { spawn } = require('node:child_process');

const MARKETING = path.resolve(__dirname, '..', '..');
const REPO = path.resolve(MARKETING, '..');

function ffmpegPath(tool = 'ffmpeg') {
  // Remotion distribui ffmpeg/ffprobe no pacote compositor da plataforma.
  const scope = path.join(MARKETING, 'node_modules', '@remotion');
  if (fs.existsSync(scope)) {
    for (const dir of fs.readdirSync(scope)) {
      if (!dir.startsWith('compositor-')) continue;
      const exe = path.join(scope, dir, process.platform === 'win32' ? tool + '.exe' : tool);
      if (fs.existsSync(exe)) return exe;
    }
  }
  return tool; // fallback: PATH do sistema
}

function run(cmd, args, { quiet = true, cwd } = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { cwd, windowsHide: true });
    let stderr = '', stdout = '';
    child.stdout.on('data', d => { stdout += d; if (!quiet) process.stdout.write(d); });
    child.stderr.on('data', d => { stderr += d; if (!quiet) process.stderr.write(d); });
    child.on('error', reject);
    child.on('close', code => code === 0 ? resolve({ stdout, stderr }) : reject(new Error(`${path.basename(cmd)} saiu com código ${code}\n${stderr.slice(-2000)}`)));
  });
}

async function probeDuration(file) {
  const { stdout } = await run(ffmpegPath('ffprobe'), ['-v', 'error', '-show_entries', 'format=duration', '-of', 'default=nw=1:nk=1', file]);
  return Number(stdout.trim());
}

function chromePath() {
  const candidates = [
    process.env.CHROME_PATH,
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    '/usr/bin/google-chrome', '/usr/bin/chromium', '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
  ].filter(Boolean);
  return candidates.find(p => fs.existsSync(p)) || null;
}

/* Registro de execuções (JSON Lines) em marketing/logs/. */
function logRun(kind, data) {
  const dir = path.join(MARKETING, 'logs');
  fs.mkdirSync(dir, { recursive: true });
  const entry = { at: new Date().toISOString(), kind, ...data };
  fs.appendFileSync(path.join(dir, 'runs.jsonl'), JSON.stringify(entry) + '\n');
  return entry;
}

function readJson(file, fallback) {
  try { return JSON.parse(fs.readFileSync(file, 'utf8')); } catch (e) { if (fallback !== undefined) return fallback; throw e; }
}
function writeJson(file, value) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(value, null, 2) + '\n');
}

function args(argv = process.argv.slice(2)) {
  const out = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith('--')) {
      const [k, v] = a.slice(2).split('=');
      if (v !== undefined) out[k] = v;
      else if (argv[i + 1] && !argv[i + 1].startsWith('--')) out[k] = argv[++i];
      else out[k] = true;
    } else out._.push(a);
  }
  return out;
}

module.exports = { MARKETING, REPO, ffmpegPath, run, probeDuration, chromePath, logRun, readJson, writeJson, args };
