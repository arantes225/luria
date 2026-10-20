import React from 'react';
import {
  AbsoluteFill,
  Audio,
  Easing,
  Img,
  interpolate,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig
} from 'remotion';

/* ==========================================================================
 * GERADOR DE TRAÇADOS MÉDICOS EM TEMPO REAL (ECG, PLETH, RESP)
 * ========================================================================== */
function sampleECG(t: number, mode: 'af' | 'shock' | 'sinus'): number {
  if (mode === 'shock') {
    const shockPhase = t % 1.0;
    if (shockPhase < 0.25) return Math.sin(shockPhase * 80) * 1.4;
    return 0;
  }

  if (mode === 'af') {
    // Fibrilação atrial rápida (~178 bpm): linha de base fibrilatória + QRS estreitos irregulares
    const fib =
      0.06 * Math.sin(t * 43) +
      0.05 * Math.sin(t * 67 + 1.2) +
      0.04 * Math.cos(t * 95 + 0.7);
    const rrList = [0.31, 0.27, 0.39, 0.29, 0.34, 0.26, 0.41, 0.32];
    const totalCycle = rrList.reduce((a, b) => a + b, 0);
    let localT = ((t % totalCycle) + totalCycle) % totalCycle;
    let beatPhase = 0;
    for (const rr of rrList) {
      if (localT < rr) {
        beatPhase = localT / rr;
        break;
      }
      localT -= rr;
    }
    // Complexo QRS estreito + onda T
    const q = -0.18 * Math.exp(-Math.pow((beatPhase - 0.18) / 0.018, 2));
    const r = 1.15 * Math.exp(-Math.pow((beatPhase - 0.21) / 0.016, 2));
    const s = -0.32 * Math.exp(-Math.pow((beatPhase - 0.24) / 0.018, 2));
    const tw = 0.24 * Math.exp(-Math.pow((beatPhase - 0.48) / 0.075, 2));
    return fib + q + r + s + tw;
  }

  // Ritmo Sinusal Regular (76 bpm -> período 0.789s)
  const period = 60 / 76;
  const phase = ((t % period) + period) % period / period;
  const p = 0.16 * Math.exp(-Math.pow((phase - 0.14) / 0.032, 2));
  const q = -0.15 * Math.exp(-Math.pow((phase - 0.26) / 0.012, 2));
  const r = 1.18 * Math.exp(-Math.pow((phase - 0.285) / 0.013, 2));
  const s = -0.28 * Math.exp(-Math.pow((phase - 0.31) / 0.013, 2));
  const tw = 0.32 * Math.exp(-Math.pow((phase - 0.52) / 0.06, 2));
  return p + q + r + s + tw;
}

function samplePleth(t: number, mode: 'af' | 'shock' | 'sinus'): number {
  if (mode === 'shock') return 0;
  const freq = mode === 'af' ? 2.85 : 76 / 60;
  const phase = ((t * freq) % 1 + 1) % 1;
  const systolic = Math.exp(-Math.pow((phase - 0.22) / 0.09, 2));
  const dicrotic = 0.42 * Math.exp(-Math.pow((phase - 0.44) / 0.12, 2));
  const amp = mode === 'af' ? 0.68 + 0.22 * Math.sin(t * 3.7) : 1.0;
  return (systolic + dicrotic - 0.35) * amp;
}

function sampleResp(t: number, mode: 'af' | 'shock' | 'sinus'): number {
  const rr = mode === 'af' ? 24 : 16;
  return Math.sin((t * rr * Math.PI * 2) / 60);
}

/* ==========================================================================
 * COMPONENTE: MONITOR MULTIPARAMÉTRICO HOLOGRÁFICO AO VIVO
 * ========================================================================== */
const LiveMedicalMonitorHUD: React.FC<{
  localFrame: number;
  fps: number;
  cardioversionFrame: number;
}> = ({ localFrame, fps, cardioversionFrame }) => {
  const t = localFrame / fps;
  const isShocking = localFrame >= cardioversionFrame && localFrame < cardioversionFrame + 16;
  const isStabilized = localFrame >= cardioversionFrame + 16;
  const mode: 'af' | 'shock' | 'sinus' = isShocking ? 'shock' : isStabilized ? 'sinus' : 'af';

  // Interpolação suave dos sinais vitais após a cardioversão
  const stabProgress = interpolate(
    localFrame,
    [cardioversionFrame + 12, cardioversionFrame + 55],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const hr = isShocking ? 0 : Math.round(interpolate(stabProgress, [0, 1], [178, 76]));
  const spo2 = Math.round(interpolate(stabProgress, [0, 1], [94, 99]));
  const rr = Math.round(interpolate(stabProgress, [0, 1], [24, 16]));
  const sys = Math.round(interpolate(stabProgress, [0, 1], [72, 118]));
  const dia = Math.round(interpolate(stabProgress, [0, 1], [44, 76]));

  // Construção dos pontos SVG para varredura com cursor luminoso
  const width = 650;
  const samples = 190;
  const windowSec = 3.2;
  const sweepHeadX = ((t % windowSec) / windowSec) * width;

  const buildWavePath = (
    fn: (timeSec: number) => number,
    baseY: number,
    scaleY: number
  ) => {
    let d = '';
    for (let i = 0; i <= samples; i++) {
      const x = (i / samples) * width;
      // Efeito varredura de monitor real: pequeno gap na frente do cursor
      const distFromSweep = x - sweepHeadX;
      if (distFromSweep > 0 && distFromSweep < 24) continue;
      const sampleTime = t - ((width - x) / width) * windowSec;
      const y = baseY - fn(sampleTime) * scaleY;
      const cmd = d === '' || (distFromSweep >= 24 && distFromSweep < 24 + width / samples + 1) ? 'M' : 'L';
      d += `${cmd} ${x.toFixed(1)} ${y.toFixed(1)} `;
    }
    return d;
  };

  const ecgPath = buildWavePath(ts => sampleECG(ts, mode), 68, 42);
  const plethPath = buildWavePath(ts => samplePleth(ts, mode), 152, 26);
  const respPath = buildWavePath(ts => sampleResp(ts, mode), 220, 16);

  const headECG_Y = 68 - sampleECG(t, mode) * 42;
  const headPleth_Y = 152 - samplePleth(t, mode) * 26;

  const hrColor = isStabilized ? '#00ff88' : '#ff3b5c';
  const bpColor = isStabilized ? '#38bdf8' : '#ff4d6d';
  const statusLabel = isShocking
    ? '⚡ DESCARGA SINCRONIZADA 100J'
    : isStabilized
    ? '● RITMO SINUSAL RESTAURADO'
    : '▲ ALERTA: FA DE ALTA RESPOSTA (INSTÁVEL)';

  const statusBg = isShocking
    ? 'rgba(250, 204, 21, 0.25)'
    : isStabilized
    ? 'rgba(0, 255, 136, 0.18)'
    : 'rgba(255, 59, 92, 0.24)';

  const statusBorder = isShocking
    ? '#facc15'
    : isStabilized
    ? '#00ff88'
    : '#ff3b5c';

  const pulseDot = Math.sin(localFrame * (isStabilized ? 0.35 : 0.85)) > 0 ? 1 : 0.25;

  return (
    <div
      style={{
        width: 960,
        height: 360,
        borderRadius: 28,
        background: 'linear-gradient(165deg, rgba(5, 12, 24, 0.96) 0%, rgba(8, 20, 38, 0.98) 100%)',
        border: `2px solid ${isStabilized ? 'rgba(0, 255, 136, 0.55)' : 'rgba(0, 240, 255, 0.5)'}`,
        boxShadow: `
          0 30px 90px rgba(0, 0, 0, 0.75),
          0 0 50px ${isStabilized ? 'rgba(0, 255, 136, 0.25)' : 'rgba(0, 240, 255, 0.25)'},
          0 0 0 1px rgba(255, 255, 255, 0.08) inset
        `,
        padding: '18px 24px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Topo do Monitor */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(148, 163, 184, 0.16)',
          paddingBottom: 10
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              backgroundColor: statusBorder,
              boxShadow: `0 0 14px ${statusBorder}`,
              opacity: pulseDot
            }}
          />
          <span
            style={{
              color: '#e2e8f0',
              fontSize: 19,
              fontWeight: 800,
              letterSpacing: 1.5
            }}
          >
            MONITOR MULTIPARAMÉTRICO LURIA
          </span>
          <span
            style={{
              color: '#00ff88',
              fontSize: 15,
              fontWeight: 700,
              padding: '3px 10px',
              borderRadius: 99,
              backgroundColor: 'rgba(0, 255, 136, 0.12)',
              border: '1px solid rgba(0, 255, 136, 0.35)'
            }}
          >
            ● AO VIVO • DII
          </span>
        </div>

        <div
          style={{
            padding: '5px 14px',
            borderRadius: 999,
            backgroundColor: statusBg,
            border: `1px solid ${statusBorder}`,
            color: statusBorder,
            fontSize: 15,
            fontWeight: 800,
            letterSpacing: 0.6
          }}
        >
          {statusLabel}
        </div>
      </div>

      {/* Corpo: Traçados + Coluna Numérica */}
      <div style={{ display: 'flex', alignItems: 'stretch', gap: 20, flex: 1, paddingTop: 10 }}>
        {/* Canvas SVG de Ondas */}
        <div
          style={{
            width: width,
            height: 265,
            position: 'relative',
            borderRadius: 16,
            backgroundColor: 'rgba(2, 6, 14, 0.85)',
            border: '1px solid rgba(56, 189, 248, 0.16)',
            overflow: 'hidden'
          }}
        >
          <svg width={width} height={265}>
            <defs>
              <pattern id="monGrid" width="32" height="32" patternUnits="userSpaceOnUse">
                <path
                  d="M 32 0 L 0 0 0 32"
                  fill="none"
                  stroke="rgba(0, 240, 255, 0.07)"
                  strokeWidth="1"
                />
              </pattern>
              <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3.2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <rect width="100%" height="100%" fill="url(#monGrid)" />

            {/* Labels das curvas */}
            <text x="12" y="24" fill="#00ff88" fontSize="13" fontWeight="800" letterSpacing="1">
              ECG II • 25mm/s
            </text>
            <text x="12" y="122" fill="#00f0ff" fontSize="13" fontWeight="800" letterSpacing="1">
              PLETH SpO₂
            </text>
            <text x="12" y="196" fill="#f5da57" fontSize="13" fontWeight="800" letterSpacing="1">
              RESP IMP
            </text>

            {/* Curva ECG */}
            <path
              d={ecgPath}
              fill="none"
              stroke="#00ff88"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#neonGlow)"
            />

            {/* Curva Pleth */}
            <path
              d={plethPath}
              fill="none"
              stroke="#00f0ff"
              strokeWidth="2.6"
              strokeLinecap="round"
              filter="url(#neonGlow)"
            />

            {/* Curva Resp */}
            <path
              d={respPath}
              fill="none"
              stroke="#f5da57"
              strokeWidth="2.2"
              strokeLinecap="round"
            />

            {/* Ponto luminoso de varredura */}
            <circle cx={sweepHeadX} cy={headECG_Y} r="5" fill="#ffffff" filter="url(#neonGlow)" />
            <circle cx={sweepHeadX} cy={headPleth_Y} r="4" fill="#00f0ff" />
          </svg>
        </div>

        {/* Coluna de Sinais Vitais Numéricos */}
        <div
          style={{
            flex: 1,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridTemplateRows: '1fr 1fr',
            gap: 10
          }}
        >
          {/* FC */}
          <div
            style={{
              backgroundColor: 'rgba(15, 23, 42, 0.78)',
              borderRadius: 16,
              padding: '10px 14px',
              border: `1px solid ${hrColor}55`,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#94a3b8', fontSize: 13, fontWeight: 800 }}>FC (BPM)</span>
              <span style={{ color: hrColor, fontSize: 16 }}>♥</span>
            </div>
            <div style={{ color: hrColor, fontSize: 46, fontWeight: 900, lineHeight: 1, letterSpacing: -1.5 }}>
              {hr || '---'}
            </div>
          </div>

          {/* SpO2 */}
          <div
            style={{
              backgroundColor: 'rgba(15, 23, 42, 0.78)',
              borderRadius: 16,
              padding: '10px 14px',
              border: '1px solid rgba(0, 240, 255, 0.35)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#94a3b8', fontSize: 13, fontWeight: 800 }}>SpO₂ (%)</span>
              <span style={{ color: '#00f0ff', fontSize: 13, fontWeight: 700 }}>PULSO</span>
            </div>
            <div style={{ color: '#00f0ff', fontSize: 46, fontWeight: 900, lineHeight: 1, letterSpacing: -1.5 }}>
              {spo2}
            </div>
          </div>

          {/* PA */}
          <div
            style={{
              backgroundColor: 'rgba(15, 23, 42, 0.78)',
              borderRadius: 16,
              padding: '10px 14px',
              border: `1px solid ${bpColor}55`,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <span style={{ color: '#94a3b8', fontSize: 13, fontWeight: 800 }}>PA (mmHg)</span>
            <div style={{ color: bpColor, fontSize: 32, fontWeight: 900, lineHeight: 1.05, letterSpacing: -1 }}>
              {sys}/{dia}
            </div>
          </div>

          {/* FR */}
          <div
            style={{
              backgroundColor: 'rgba(15, 23, 42, 0.78)',
              borderRadius: 16,
              padding: '10px 14px',
              border: '1px solid rgba(245, 218, 87, 0.35)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <span style={{ color: '#94a3b8', fontSize: 13, fontWeight: 800 }}>FR (irpm)</span>
            <div style={{ color: '#f5da57', fontSize: 38, fontWeight: 900, lineHeight: 1 }}>
              {rr}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ==========================================================================
 * COMPONENTE PRINCIPAL: REEL SIMULADOR TECH (30s = 900 FRAMES @ 30FPS)
 * ========================================================================== */
export const ReelSimuladorTech: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Flash de transição tecnológica entre atos
  const transitionFrames = [0, 195, 385, 613, 765];
  let flashOpacity = 0;
  for (const tf of transitionFrames) {
    const dist = Math.abs(frame - tf);
    if (dist < 10) {
      flashOpacity = Math.max(flashOpacity, interpolate(dist, [0, 10], [0.65, 0]));
    }
  }

  // Progresso global da barra superior neon
  const progressPct = interpolate(frame, [0, 900], [0, 100], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#040812',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        overflow: 'hidden',
        color: '#ffffff'
      }}
    >
      {/* Trilha Sonora High-Tech + Bipes Reais do Monitor */}
      <Audio src={staticFile('audio/luria-tech-simulador-30s.mp3')} volume={0.95} />

      {/* ====================================================================
          CAMADA 0: BACKGROUND CYBER-MEDICAL COM GRID 3D E LUZES VOLUMÉTRICAS
         ==================================================================== */}
      <AbsoluteFill>
        {/* Luzes volumétricas dinâmicas */}
        <div
          style={{
            position: 'absolute',
            top: -200 + Math.sin(frame * 0.03) * 80,
            left: -150 + Math.cos(frame * 0.02) * 100,
            width: 900,
            height: 900,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0, 240, 255, 0.20) 0%, rgba(24, 72, 136, 0.08) 45%, transparent 70%)',
            filter: 'blur(60px)'
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -250 + Math.cos(frame * 0.025) * 90,
            right: -180 + Math.sin(frame * 0.03) * 80,
            width: 1000,
            height: 1000,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0, 255, 136, 0.16) 0%, rgba(37, 99, 235, 0.10) 45%, transparent 70%)',
            filter: 'blur(70px)'
          }}
        />

        {/* Grid Cibernético Animado */}
        <svg width="1080" height="1920" style={{ position: 'absolute', inset: 0, opacity: 0.18 }}>
          <defs>
            <pattern
              id="cyberGrid"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
              patternTransform={`translate(0, ${(frame * 1.6) % 60})`}
            >
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#00f0ff" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cyberGrid)" />
        </svg>

        {/* Linha de Scanner Laser Horizontal */}
        <div
          style={{
            position: 'absolute',
            top: ((frame * 9) % 2100) - 100,
            left: 0,
            right: 0,
            height: 2,
            background: 'linear-gradient(90deg, transparent 0%, rgba(0, 240, 255, 0.45) 50%, transparent 100%)',
            boxShadow: '0 0 20px rgba(0, 240, 255, 0.4)'
          }}
        />
      </AbsoluteFill>

      {/* ====================================================================
          BARRA DE PROGRESSO E TELEMETRIA DE TOPO (HUD FIXO)
         ==================================================================== */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 8,
          backgroundColor: 'rgba(255,255,255,0.08)',
          zIndex: 90
        }}
      >
        <div
          style={{
            width: `${progressPct}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #00f0ff, #00ff88)',
            boxShadow: '0 0 18px #00f0ff'
          }}
        />
      </div>

      {/* Header Tecnológico LURIA */}
      <div
        style={{
          position: 'absolute',
          top: 44,
          left: 48,
          right: 48,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 80
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            backgroundColor: 'rgba(10, 22, 44, 0.82)',
            border: '1px solid rgba(0, 240, 255, 0.3)',
            padding: '10px 20px',
            borderRadius: 999,
            boxShadow: '0 10px 30px rgba(0,0,0,0.4)'
          }}
        >
          <Img
            src={staticFile('assets/logos/logo-icone-original.png')}
            style={{ width: 36, height: 36, borderRadius: 8 }}
          />
          <span style={{ fontWeight: 900, fontSize: 24, letterSpacing: 1.5, color: '#ffffff' }}>
            LURIA
          </span>
          <span
            style={{
              fontSize: 13,
              fontWeight: 800,
              color: '#00f0ff',
              backgroundColor: 'rgba(0, 240, 255, 0.14)',
              padding: '4px 10px',
              borderRadius: 999,
              letterSpacing: 1
            }}
          >
            SIMULADOR 2.0
          </span>
        </div>

        <div
          style={{
            fontFamily: 'monospace',
            fontSize: 16,
            color: '#64748b',
            backgroundColor: 'rgba(10, 22, 44, 0.72)',
            padding: '8px 16px',
            borderRadius: 12,
            border: '1px solid rgba(100, 116, 139, 0.25)'
          }}
        >
          SYS.LIVE // {(frame / fps).toFixed(1)}s
        </div>
      </div>

      {/* ====================================================================
          ATO 1: ENTRANDO NO SITE (0s – 6.5s | Frames 0 – 195)
         ==================================================================== */}
      <Sequence from={0} durationInFrames={195}>
        <Act1EnteringSite frame={frame} fps={fps} />
      </Sequence>

      {/* ====================================================================
          ATO 2: ACESSANDO O SIMULADOR E ESCOLHENDO O CASO (6.5s – 12.8s | 195 – 385)
         ==================================================================== */}
      <Sequence from={195} durationInFrames={190}>
        <Act2AccessingSimulator frame={frame - 195} fps={fps} />
      </Sequence>

      {/* ====================================================================
          ATO 3: FAZENDO O CASO COM MONITOR LIGADO AO VIVO (12.8s – 25.5s | 385 – 765)
         ==================================================================== */}
      <Sequence from={385} durationInFrames={380}>
        <Act3RunningCaseWithMonitor frame={frame - 385} fps={fps} />
      </Sequence>

      {/* ====================================================================
          ATO 4: ENCERRAMENTO HIGH-TECH + CTA (25.5s – 30.0s | 765 – 900)
         ==================================================================== */}
      <Sequence from={765} durationInFrames={135}>
        <Act4TechOutro frame={frame - 765} fps={fps} />
      </Sequence>

      {/* Flash branco/ciano nas transições de câmera */}
      {flashOpacity > 0 && (
        <AbsoluteFill
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(0, 240, 255, 0.65) 100%)',
            opacity: flashOpacity,
            pointerEvents: 'none',
            zIndex: 100
          }}
        />
      )}
    </AbsoluteFill>
  );
};

/* ==========================================================================
 * ATO 1: ENTRANDO NO SITE (0s - 6.5s)
 * ========================================================================== */
const Act1EnteringSite: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const urlText = 'resibulando.online';
  const typedChars = Math.min(
    urlText.length,
    Math.max(0, Math.floor(interpolate(frame, [6, 38], [0, urlText.length])))
  );

  // Animação da barra de URL
  const barScale = spring({ frame, fps, config: { damping: 14, stiffness: 120 } });
  const barY = interpolate(frame, [42, 65], [320, 145], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic)
  });

  // Entrada 3D da janela do site
  const browserSpring = spring({
    frame: Math.max(0, frame - 38),
    fps,
    config: { damping: 16, stiffness: 95 }
  });
  const rotateX = interpolate(browserSpring, [0, 1], [28, 4]);
  const rotateY = interpolate(frame, [38, 195], [-10, 6], { extrapolateLeft: 'clamp' });
  const scaleBrowser = interpolate(browserSpring, [0, 1], [0.72, 1.0]) *
    interpolate(frame, [145, 195], [1.0, 1.28], { extrapolateLeft: 'clamp' });

  // Cursor indo clicar em "Entrar no sistema"
  const cursorX = interpolate(frame, [95, 145], [820, 315], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.cubic)
  });
  const cursorY = interpolate(frame, [95, 145], [1180, 920], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.cubic)
  });
  const isClicking = frame >= 146 && frame <= 162;

  return (
    <AbsoluteFill style={{ perspective: 1400 }}>
      {/* Barra de Endereço Cyber */}
      <div
        style={{
          position: 'absolute',
          top: barY,
          left: '50%',
          transform: `translateX(-50%) scale(${barScale})`,
          width: 880,
          height: 82,
          borderRadius: 999,
          backgroundColor: 'rgba(10, 22, 46, 0.94)',
          border: '2px solid #00f0ff',
          boxShadow: '0 0 45px rgba(0, 240, 255, 0.35), 0 16px 40px rgba(0,0,0,0.6)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 28px',
          gap: 18,
          zIndex: 50
        }}
      >
        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: '50%',
            backgroundColor: 'rgba(0, 240, 255, 0.16)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#00f0ff',
            fontSize: 22,
            fontWeight: 900
          }}
        >
          🔒
        </div>
        <div style={{ fontSize: 32, fontWeight: 800, color: '#ffffff', letterSpacing: 0.5, flex: 1 }}>
          <span style={{ color: '#64748b', fontWeight: 500 }}>https://</span>
          {urlText.slice(0, typedChars)}
          <span
            style={{
              display: 'inline-block',
              width: 4,
              height: 34,
              backgroundColor: '#00ff88',
              marginLeft: 4,
              verticalAlign: 'middle',
              opacity: frame % 12 < 6 ? 1 : 0
            }}
          />
        </div>
        <div
          style={{
            padding: '10px 22px',
            borderRadius: 999,
            background: 'linear-gradient(90deg, #00f0ff, #00ff88)',
            color: '#041022',
            fontWeight: 900,
            fontSize: 18
          }}
        >
          ACESSAR →
        </div>
      </div>

      {/* Mockup 3D da Home LURIA */}
      {frame >= 35 && (
        <div
          style={{
            position: 'absolute',
            top: 270,
            left: '50%',
            width: 980,
            height: 1120,
            transform: `translateX(-50%) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scaleBrowser})`,
            transformStyle: 'preserve-3d',
            borderRadius: 34,
            background: 'linear-gradient(160deg, #f8fafc 0%, #e2e8f0 100%)',
            border: '3px solid rgba(0, 240, 255, 0.6)',
            boxShadow: '0 45px 120px rgba(0, 0, 0, 0.8), 0 0 60px rgba(0, 240, 255, 0.25)',
            overflow: 'hidden',
            color: '#0b2347'
          }}
        >
          {/* Topbar do Navegador */}
          <div
            style={{
              height: 54,
              backgroundColor: '#0c1c38',
              display: 'flex',
              alignItems: 'center',
              padding: '0 22px',
              gap: 10
            }}
          >
            <div style={{ width: 13, height: 13, borderRadius: '50%', backgroundColor: '#ff5f57' }} />
            <div style={{ width: 13, height: 13, borderRadius: '50%', backgroundColor: '#febc2e' }} />
            <div style={{ width: 13, height: 13, borderRadius: '50%', backgroundColor: '#28c840' }} />
            <div style={{ marginLeft: 18, color: '#94a3b8', fontSize: 15, fontWeight: 600 }}>
              LURIA · Aprenda. Conecte. Consolide.
            </div>
          </div>

          {/* Conteúdo Hero da Plataforma LURIA */}
          <div style={{ padding: '44px 48px', position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 42 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <Img
                  src={staticFile('assets/logos/logo-principal.png')}
                  style={{ height: 48, width: 'auto' }}
                />
                <div>
                  <div style={{ fontSize: 26, fontWeight: 900, color: '#0b2347' }}>LURIA</div>
                  <div style={{ fontSize: 14, color: '#475569', fontWeight: 600 }}>
                    Ecossistema de Alta Performance Médica
                  </div>
                </div>
              </div>
              <div
                style={{
                  padding: '12px 26px',
                  borderRadius: 999,
                  backgroundColor: '#184888',
                  color: '#fff',
                  fontWeight: 800,
                  fontSize: 16
                }}
              >
                Entrar na Plataforma
              </div>
            </div>

            <div
              style={{
                display: 'inline-block',
                padding: '8px 18px',
                borderRadius: 999,
                backgroundColor: '#e0f2fe',
                color: '#0369a1',
                fontWeight: 800,
                fontSize: 15,
                marginBottom: 20
              }}
            >
              ● PREPARAÇÃO E SIMULAÇÃO REALISTA PARA RESIDÊNCIA
            </div>

            <h1
              style={{
                fontSize: 54,
                fontWeight: 900,
                lineHeight: 1.08,
                letterSpacing: -1.8,
                color: '#0b2347',
                margin: '0 0 22px 0'
              }}
            >
              Seu estudo para residência,{' '}
              <span style={{ color: '#184888' }}>organizado em um só lugar.</span>
            </h1>

            <p style={{ fontSize: 22, lineHeight: 1.45, color: '#475569', margin: '0 0 34px 0', maxWidth: 780 }}>
              Cronograma inteligente, flashcards, banco de questões e o{' '}
              <strong style={{ color: '#0b2347' }}>Simulador de Sala de Emergência com monitor ao vivo.</strong>
            </p>

            {/* Botão CTA Principal */}
            <div style={{ display: 'flex', gap: 18, alignItems: 'center', marginBottom: 42 }}>
              <div
                style={{
                  padding: '20px 38px',
                  borderRadius: 18,
                  background: isClicking
                    ? 'linear-gradient(135deg, #00ff88, #00f0ff)'
                    : 'linear-gradient(135deg, #184888, #0ea5e9)',
                  color: isClicking ? '#041022' : '#ffffff',
                  fontWeight: 900,
                  fontSize: 24,
                  boxShadow: isClicking
                    ? '0 0 40px #00ff88'
                    : '0 20px 40px rgba(24, 72, 136, 0.35)',
                  transform: `scale(${isClicking ? 0.95 : 1})`
                }}
              >
                Acessar Simulador Agora →
              </div>
            </div>

            {/* Preview da Interface Real embaixo */}
            <div
              style={{
                borderRadius: 22,
                overflow: 'hidden',
                border: '2px solid #cbd5e1',
                boxShadow: '0 25px 60px rgba(15, 23, 42, 0.18)'
              }}
            >
              <Img
                src={staticFile('captures/test-monitor-on.png')}
                style={{ width: '100%', height: 420, objectFit: 'cover', objectPosition: 'top' }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Cursor Tecnológico Animado */}
      {frame >= 90 && (
        <div
          style={{
            position: 'absolute',
            left: cursorX,
            top: cursorY,
            zIndex: 85,
            transform: `scale(${isClicking ? 0.82 : 1})`
          }}
        >
          {isClicking && (
            <div
              style={{
                position: 'absolute',
                top: -28,
                left: -28,
                width: 76,
                height: 76,
                borderRadius: '50%',
                border: '3px solid #00ff88',
                boxShadow: '0 0 30px #00ff88'
              }}
            />
          )}
          <svg width="48" height="48" viewBox="0 0 24 24">
            <path
              d="M4 2l16 11-7 1.5 4 7.5-3 1.5-4-7.5L4 21z"
              fill="#00f0ff"
              stroke="#041022"
              strokeWidth="1.8"
            />
          </svg>
        </div>
      )}

      {/* Legenda Kinetic Ato 1 */}
      <BottomKineticCaption
        badge="PASSO 01 // PLATAFORMA LURIA"
        lead="Entre no site e acesse o"
        highlight="ecossistema médico completo."
      />
    </AbsoluteFill>
  );
};

/* ==========================================================================
 * ATO 2: ACESSANDO O SIMULADOR E ESCOLHENDO O CASO (6.5s - 12.8s)
 * ========================================================================== */
const Act2AccessingSimulator: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const cardSpring = spring({ frame, fps, config: { damping: 14, stiffness: 110 } });
  const zoomIntoCase = interpolate(frame, [115, 190], [1, 1.32], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.cubic)
  });

  const isSelecting = frame >= 110;

  const cases = [
    {
      tag: 'SALA DE EMERGÊNCIA • CARDIologia',
      title: 'Fibrilação Atrial Instável',
      complaint: 'Palpitações, dor torácica e tontura com hipotensão (PA 72/44 mmHg).',
      vitals: 'FC 178 bpm • SpO₂ 94% • Instável',
      active: true,
      color: '#00ff88'
    },
    {
      tag: 'SALA DE EMERGÊNCIA • IMUNOLOGIA',
      title: 'Anafilaxia com Choque',
      complaint: 'Dispneia, estridor laríngeo e hipotensão após exposição alimentar.',
      vitals: 'FC 142 bpm • SpO₂ 88% • Crítico',
      active: false,
      color: '#00f0ff'
    },
    {
      tag: 'SALA DE EMERGÊNCIA • TERAPIA INTENSIVA',
      title: 'Choque Séptico de Foco Pulmonar',
      complaint: 'Febre, taquipneia, rebaixamento e hiperlactatemia severa.',
      vitals: 'FC 134 bpm • PA 80/46 mmHg',
      active: false,
      color: '#38bdf8'
    }
  ];

  return (
    <AbsoluteFill style={{ perspective: 1300 }}>
      <div
        style={{
          position: 'absolute',
          top: 150,
          left: 54,
          right: 54,
          transform: `scale(${interpolate(cardSpring, [0, 1], [0.86, 1]) * zoomIntoCase})`,
          transformOrigin: '50% 35%'
        }}
      >
        {/* Spotlight Header do Simulador */}
        <div
          style={{
            padding: '28px 34px',
            borderRadius: 28,
            background: 'linear-gradient(135deg, #0e2a52 0%, #184888 55%, #0ea5e9 100%)',
            border: '2px solid rgba(0, 240, 255, 0.5)',
            boxShadow: '0 25px 60px rgba(0,0,0,0.55)',
            marginBottom: 28,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div style={{ color: '#00f0ff', fontSize: 15, fontWeight: 800, letterSpacing: 1.5, marginBottom: 6 }}>
              MÓDULO PRÁTICO INTERATIVO
            </div>
            <div style={{ fontSize: 40, fontWeight: 900, letterSpacing: -1 }}>
              Simulador de Sala de Emergência
            </div>
            <div style={{ fontSize: 18, color: 'rgba(255,255,255,0.85)', marginTop: 4 }}>
              Escolha o caso clínico e assuma o comando do plantão em tempo real.
            </div>
          </div>
          <div
            style={{
              padding: '12px 22px',
              borderRadius: 16,
              backgroundColor: 'rgba(4, 12, 28, 0.55)',
              border: '1px solid rgba(0, 255, 136, 0.5)',
              color: '#00ff88',
              fontWeight: 800,
              fontSize: 16
            }}
          >
            ● MONITORIZAÇÃO ATIVA
          </div>
        </div>

        {/* Lista de Casos Clínicos com Motion */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          {cases.map((c, idx) => {
            const itemEnter = spring({
              frame: Math.max(0, frame - idx * 10 - 10),
              fps,
              config: { damping: 15, stiffness: 120 }
            });
            const isTarget = c.active && isSelecting;

            return (
              <div
                key={c.title}
                style={{
                  transform: `translateY(${interpolate(itemEnter, [0, 1], [60, 0])}px) scale(${
                    isTarget ? 1.03 : 1
                  })`,
                  opacity: itemEnter,
                  borderRadius: 26,
                  padding: '26px 32px',
                  backgroundColor: isTarget ? 'rgba(12, 32, 64, 0.96)' : 'rgba(10, 20, 38, 0.88)',
                  border: isTarget
                    ? '3px solid #00ff88'
                    : '1px solid rgba(148, 163, 184, 0.22)',
                  boxShadow: isTarget
                    ? '0 0 55px rgba(0, 255, 136, 0.35), 0 25px 60px rgba(0,0,0,0.65)'
                    : '0 16px 36px rgba(0,0,0,0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div style={{ maxWidth: 640 }}>
                  <div
                    style={{
                      color: c.color,
                      fontSize: 14,
                      fontWeight: 800,
                      letterSpacing: 1.4,
                      marginBottom: 8
                    }}
                  >
                    {c.tag}
                  </div>
                  <div style={{ fontSize: 32, fontWeight: 900, marginBottom: 8, color: '#ffffff' }}>
                    {c.title}
                  </div>
                  <div style={{ fontSize: 19, color: '#cbd5e1', marginBottom: 12 }}>{c.complaint}</div>
                  <div
                    style={{
                      display: 'inline-block',
                      padding: '6px 14px',
                      borderRadius: 99,
                      backgroundColor: 'rgba(255, 255, 255, 0.07)',
                      color: '#f8fafc',
                      fontSize: 15,
                      fontWeight: 700
                    }}
                  >
                    ⚡ {c.vitals}
                  </div>
                </div>

                <div
                  style={{
                    padding: '18px 28px',
                    borderRadius: 18,
                    background: isTarget
                      ? 'linear-gradient(135deg, #00ff88, #00f0ff)'
                      : 'rgba(24, 72, 136, 0.75)',
                    color: isTarget ? '#041022' : '#ffffff',
                    fontWeight: 900,
                    fontSize: 20,
                    boxShadow: isTarget ? '0 0 30px #00ff88' : 'none'
                  }}
                >
                  {isTarget ? 'INICIANDO CASO...' : 'Iniciar ocorrência →'}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <BottomKineticCaption
        badge="PASSO 02 // SALA DE EMERGÊNCIA"
        lead="Acesse o Simulador e inicie"
        highlight="um caso clínico real."
      />
    </AbsoluteFill>
  );
};

/* ==========================================================================
 * ATO 3: FAZENDO O CASO COM O MONITOR LIGADO AO VIVO (12.8s - 25.5s)
 * ========================================================================== */
const Act3RunningCaseWithMonitor: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  // Cardioversão acontece no frame 228 deste ato (385 + 228 = 613 global = 20.45s)
  const cardioversionFrame = 228;
  const isStabilized = frame >= cardioversionFrame + 16;

  const enterSpring = spring({ frame, fps, config: { damping: 16, stiffness: 100 } });

  // Pontuação subindo conforme as condutas são tomadas
  let score = 15;
  if (frame > 55) score = 35;
  if (frame > 110) score = 55;
  if (frame > 165) score = 75;
  if (frame > cardioversionFrame + 15) score = 100;

  const actionsTimeline = [
    { at: 8, label: 'Monitor cardíaco + PA + Oximetria conectados', pts: '+15 pts', highlight: true },
    { at: 55, label: 'Avaliar ritmo: FA de alta resposta (178 bpm)', pts: '+20 pts', highlight: false },
    { at: 110, label: 'Acesso venoso periférico + O₂ suplementar', pts: '+20 pts', highlight: false },
    { at: 165, label: 'Sedação breve pré-procedimento realizada', pts: '+20 pts', highlight: false },
    {
      at: cardioversionFrame,
      label: '⚡ Cardioversão Elétrica Sincronizada (100J)',
      pts: '+25 pts',
      highlight: true
    }
  ];

  // Escolhe a captura real do leito como base visual
  const bedsideImg = isStabilized
    ? 'captures/simulador-emergencia/desktop-stabilized.png'
    : 'captures/test-monitor-on.png';

  return (
    <AbsoluteFill>
      {/* Container Superior: Leito Real do Simulador com Zoom Cinematográfico */}
      <div
        style={{
          position: 'absolute',
          top: 132,
          left: 44,
          right: 44,
          height: 560,
          borderRadius: 28,
          overflow: 'hidden',
          border: '2px solid rgba(0, 240, 255, 0.45)',
          boxShadow: '0 25px 70px rgba(0,0,0,0.75)',
          transform: `scale(${interpolate(enterSpring, [0, 1], [0.9, 1])})`
        }}
      >
        <Img
          src={staticFile(bedsideImg)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 72%',
            transform: `scale(${interpolate(frame, [0, 380], [1.02, 1.12])})`
          }}
        />

        {/* Overlay Gradiente Escuro na Base da Foto para contraste */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(4,10,22,0.25) 0%, rgba(4,10,22,0.05) 45%, rgba(4,10,22,0.88) 100%)'
          }}
        />

        {/* Badge de Score em Tempo Real no Topo do Leito */}
        <div
          style={{
            position: 'absolute',
            top: 20,
            left: 24,
            right: 24,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <div
            style={{
              padding: '10px 20px',
              borderRadius: 14,
              backgroundColor: 'rgba(4, 12, 26, 0.88)',
              border: '1px solid rgba(0, 240, 255, 0.45)',
              fontSize: 18,
              fontWeight: 800
            }}
          >
            🏥 LEITO 01 • FIBRILAÇÃO ATRIAL INSTÁVEL
          </div>

          <div
            style={{
              padding: '10px 24px',
              borderRadius: 14,
              background: isStabilized
                ? 'linear-gradient(90deg, #00ff88, #00f0ff)'
                : 'rgba(15, 23, 42, 0.9)',
              color: isStabilized ? '#041022' : '#00ff88',
              border: '2px solid #00ff88',
              fontWeight: 900,
              fontSize: 22,
              boxShadow: '0 0 25px rgba(0, 255, 136, 0.4)'
            }}
          >
            SCORE: {score}/100 PTS
          </div>
        </div>

        {/* Informações do Paciente na Base da Cena */}
        <div
          style={{
            position: 'absolute',
            bottom: 18,
            left: 24,
            right: 24,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end'
          }}
        >
          <div>
            <div style={{ color: '#00f0ff', fontSize: 14, fontWeight: 800, letterSpacing: 1 }}>
              EVOLUÇÃO CLÍNICA EM TEMPO REAL
            </div>
            <div style={{ fontSize: 24, fontWeight: 900, color: '#ffffff' }}>
              {isStabilized
                ? '✔ Paciente consciente, orientado e hemodinamicamente estável!'
                : '⚠ Paciente pálido, diaforético, queixando-se de palpitações e tontura.'}
            </div>
          </div>
        </div>
      </div>

      {/* ====================================================================
          DESTAQUE PRINCIPAL: MONITOR MULTIPARAMÉTRICO AO VIVO LIGADO
         ==================================================================== */}
      <div
        style={{
          position: 'absolute',
          top: 712,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 60
        }}
      >
        <LiveMedicalMonitorHUD
          localFrame={frame}
          fps={fps}
          cardioversionFrame={cardioversionFrame}
        />
      </div>

      {/* ====================================================================
          FEED DE CONDUTAS MÉDICAS REALIZADAS (HIGH-MOTION CHECKLIST)
         ==================================================================== */}
      <div
        style={{
          position: 'absolute',
          top: 1094,
          left: 60,
          right: 60,
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          zIndex: 55
        }}
      >
        {actionsTimeline.map((item, idx) => {
          if (frame < item.at) return null;
          const pop = spring({
            frame: frame - item.at,
            fps,
            config: { damping: 14, stiffness: 140 }
          });

          return (
            <div
              key={idx}
              style={{
                transform: `translateX(${interpolate(pop, [0, 1], [-50, 0])}px) scale(${interpolate(
                  pop,
                  [0, 1],
                  [0.92, 1]
                )})`,
                opacity: pop,
                padding: '12px 20px',
                borderRadius: 16,
                backgroundColor: item.highlight
                  ? 'rgba(0, 255, 136, 0.16)'
                  : 'rgba(15, 23, 42, 0.86)',
                border: item.highlight
                  ? '1.5px solid #00ff88'
                  : '1px solid rgba(148, 163, 184, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: item.highlight ? '0 0 25px rgba(0, 255, 136, 0.2)' : 'none'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: '50%',
                    backgroundColor: '#00ff88',
                    color: '#041022',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 900,
                    fontSize: 15
                  }}
                >
                  ✓
                </span>
                <span style={{ fontSize: 20, fontWeight: 800, color: '#f8fafc' }}>
                  {item.label}
                </span>
              </div>
              <span
                style={{
                  fontSize: 17,
                  fontWeight: 900,
                  color: '#00ff88',
                  backgroundColor: 'rgba(0, 255, 136, 0.14)',
                  padding: '4px 12px',
                  borderRadius: 99
                }}
              >
                {item.pts}
              </span>
            </div>
          );
        })}
      </div>

      <BottomKineticCaption
        badge={isStabilized ? 'RITMO SINUSAL RESTAURADO' : 'MONITOR LIGADO AO VIVO'}
        lead={isStabilized ? 'Cardioversão realizada:' : 'Monitor multiparamétrico ligado:'}
        highlight={isStabilized ? 'paciente estabilizado!' : 'ECG, PA e SpO₂ em tempo real.'}
      />
    </AbsoluteFill>
  );
};

/* ==========================================================================
 * ATO 4: OUTRO HIGH-TECH + CTA (25.5s - 30.0s)
 * ========================================================================== */
const Act4TechOutro: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const entrance = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 64px',
        textAlign: 'center'
      }}
    >
      <div
        style={{
          transform: `scale(${interpolate(entrance, [0, 1], [0.82, 1])})`,
          opacity: entrance,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <div
          style={{
            width: 150,
            height: 150,
            borderRadius: 38,
            backgroundColor: 'rgba(15, 23, 42, 0.9)',
            border: '2px solid #00f0ff',
            boxShadow: '0 0 60px rgba(0, 240, 255, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 36
          }}
        >
          <Img
            src={staticFile('assets/logos/logo-icone-original.png')}
            style={{ width: 108, height: 108, borderRadius: 24 }}
          />
        </div>

        <div
          style={{
            padding: '8px 22px',
            borderRadius: 999,
            backgroundColor: 'rgba(0, 255, 136, 0.14)',
            border: '1px solid #00ff88',
            color: '#00ff88',
            fontWeight: 800,
            fontSize: 18,
            letterSpacing: 1.5,
            marginBottom: 24
          }}
        >
          ● SIMULADOR DE EMERGÊNCIA LURIA
        </div>

        <h1
          style={{
            fontSize: 64,
            fontWeight: 900,
            lineHeight: 1.08,
            letterSpacing: -2,
            margin: '0 0 22px 0'
          }}
        >
          Treine decisões críticas{' '}
          <span
            style={{
              background: 'linear-gradient(90deg, #00f0ff, #00ff88)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            antes do plantão real.
          </span>
        </h1>

        <p style={{ fontSize: 26, color: '#94a3b8', maxWidth: 820, margin: '0 0 48px 0', lineHeight: 1.4 }}>
          Casos clínicos interativos, monitor multiparamétrico ao vivo e feedback imediato.
        </p>

        {/* Botão CTA Final */}
        <div
          style={{
            padding: '26px 56px',
            borderRadius: 999,
            background: 'linear-gradient(90deg, #00f0ff 0%, #00ff88 100%)',
            color: '#041022',
            fontSize: 34,
            fontWeight: 900,
            letterSpacing: -0.5,
            boxShadow: '0 0 60px rgba(0, 255, 136, 0.55)'
          }}
        >
          resibulando.online
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ==========================================================================
 * COMPONENTE DE LEGENDA KINETIC NO TERÇO INFERIOR
 * ========================================================================== */
const BottomKineticCaption: React.FC<{
  badge: string;
  lead: string;
  highlight: string;
}> = ({ badge, lead, highlight }) => {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 78,
        left: 54,
        right: 54,
        padding: '22px 30px',
        borderRadius: 26,
        backgroundColor: 'rgba(6, 14, 28, 0.92)',
        border: '1.5px solid rgba(0, 240, 255, 0.35)',
        boxShadow: '0 20px 50px rgba(0,0,0,0.65)',
        zIndex: 80
      }}
    >
      <div
        style={{
          color: '#00f0ff',
          fontSize: 14,
          fontWeight: 800,
          letterSpacing: 1.6,
          marginBottom: 6
        }}
      >
        {badge}
      </div>
      <div style={{ fontSize: 32, fontWeight: 800, lineHeight: 1.2, color: '#ffffff' }}>
        {lead}{' '}
        <span style={{ color: '#00ff88', fontWeight: 900 }}>{highlight}</span>
      </div>
    </div>
  );
};
