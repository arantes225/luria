'use strict';
/*
 * Gravador de alta qualidade via Chrome DevTools Protocol (Page.startScreencast).
 * O recordVideo nativo do Playwright usa VP8 a ~1 Mbps (borrado para anúncios);
 * aqui cada quadro chega como JPEG de alta qualidade com timestamp real e é
 * convertido em MP4 H.264 a 30 fps constantes (duração preservada).
 */
const fs = require('node:fs');
const path = require('node:path');
const { ffmpegPath, run } = require('../../scripts/lib/common.cjs');

class ScreencastRecorder {
  constructor(page, { framesDir, quality = 92, maxWidth, maxHeight }) {
    this.page = page; this.framesDir = framesDir; this.quality = quality;
    this.maxWidth = maxWidth; this.maxHeight = maxHeight;
    this.frames = []; this.marks = []; this.session = null; this.t0 = null;
  }
  async start() {
    fs.rmSync(this.framesDir, { recursive: true, force: true });
    fs.mkdirSync(this.framesDir, { recursive: true });
    this.session = await this.page.context().newCDPSession(this.page);
    this.session.on('Page.screencastFrame', async ({ data, metadata, sessionId }) => {
      const t = metadata.timestamp;
      if (this.t0 === null) this.t0 = t;
      const file = path.join(this.framesDir, String(this.frames.length).padStart(6, '0') + '.jpg');
      fs.writeFileSync(file, Buffer.from(data, 'base64'));
      this.frames.push({ file, t: t - this.t0 });
      try { await this.session.send('Page.screencastFrameAck', { sessionId }); } catch {}
    });
    await this.session.send('Page.startScreencast', { format: 'jpeg', quality: this.quality, maxWidth: this.maxWidth, maxHeight: this.maxHeight, everyNthFrame: 1 });
    this.wallStart = Date.now();
  }
  /* Marca o tempo atual (s) para sincronizar legendas/cortes na montagem. */
  mark(label) { const at = (Date.now() - this.wallStart) / 1000; this.marks.push({ label, at: Number(at.toFixed(2)) }); return at; }
  async stop() {
    this.mark('end');
    await this.session.send('Page.stopScreencast').catch(() => {});
    await new Promise(r => setTimeout(r, 250));
    await this.session.detach().catch(() => {});
    this.wallEnd = Date.now();
  }
  /* Gera MP4 CFR. O último quadro é mantido até o fim real da gravação. */
  async encode(outFile, { fps = 30 } = {}) {
    if (!this.frames.length) throw new Error('Nenhum quadro capturado — verifique se a página renderizou.');
    const total = (this.wallEnd - this.wallStart) / 1000;
    const lines = [];
    this.frames.forEach((f, i) => {
      const next = i + 1 < this.frames.length ? this.frames[i + 1].t : Math.max(total, f.t + 1 / fps);
      lines.push(`file '${f.file.replace(/\\/g, '/').replace(/'/g, "'\\''")}'`, `duration ${Math.max(0.001, next - f.t).toFixed(4)}`);
    });
    lines.push(`file '${this.frames.at(-1).file.replace(/\\/g, '/')}'`);
    const list = path.join(this.framesDir, 'frames.txt');
    fs.writeFileSync(list, lines.join('\n'));
    fs.mkdirSync(path.dirname(outFile), { recursive: true });
    await run(ffmpegPath(), ['-y', '-f', 'concat', '-safe', '0', '-i', list,
      '-r', String(fps),
      '-vf', 'scale=trunc(iw/2)*2:trunc(ih/2)*2:flags=lanczos,format=yuv420p',
      '-c:v', 'libx264', '-preset', 'slow', '-crf', '14', '-movflags', '+faststart', outFile]);
    return { frames: this.frames.length, seconds: Number(total.toFixed(2)), marks: this.marks };
  }
}

module.exports = { ScreencastRecorder };
