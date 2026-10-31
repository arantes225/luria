import React from 'react';
import {
  AbsoluteFill,
  Audio,
  Img,
  interpolate,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig
} from 'remotion';
import { Phone3DScene } from '../components/Phone3DScene';

export const ReelCommercialV1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Ambient floating background particles
  const particles = [
    { x: 140, y: 320, s: 4, speed: 0.6 },
    { x: 890, y: 260, s: 6, speed: 0.9 },
    { x: 220, y: 1480, s: 5, speed: 0.7 },
    { x: 840, y: 1620, s: 8, speed: 1.1 },
    { x: 120, y: 980, s: 3, speed: 0.5 },
    { x: 940, y: 880, s: 5, speed: 0.8 },
    { x: 480, y: 200, s: 6, speed: 0.75 },
    { x: 620, y: 1780, s: 7, speed: 1.0 }
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#020713',
        overflow: 'hidden',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
      }}
    >
      {/* 1. Official High-Energy Soundtrack (Synced to transitions & beat drops) */}
      <Audio src={staticFile('audio/traube-soundtrack-full-30s.mp3')} volume={0.92} />

      {/* 2. Cinematic Deep Medical Ambient Background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(circle at 50% 45%, #0d2348 0%, #051024 55%, #020713 100%)
          `
        }}
      />

      {/* Subtle Medical Grid Atmosphere */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(56, 189, 248, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(56, 189, 248, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          backgroundPosition: 'center center',
          pointerEvents: 'none'
        }}
      />

      {/* Floating Ambient Light Dust Particles */}
      {particles.map((p, i) => {
        const floatY = (frame * p.speed * 1.5) % 1920;
        const curY = (p.y - floatY + 1920) % 1920;
        const alpha = Math.sin((frame / 30) * 1.5 + i) * 0.3 + 0.5;

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: p.x,
              top: curY,
              width: p.s,
              height: p.s,
              borderRadius: '50%',
              backgroundColor: '#38bdf8',
              opacity: alpha,
              boxShadow: `0 0 ${p.s * 3}px rgba(56, 189, 248, 0.8)`,
              pointerEvents: 'none'
            }}
          />
        );
      })}

      {/* 3. True 3D Smartphone Scene (Three.js WebGL with Authentic TRAUBE UI & Layers) */}
      <Phone3DScene />

      {/* 4. Kinetic Motion Typography Overlays */}

      {/* ======================================================== */}
      {/* SCENE 1 (Frames 10 to 95): "TRAUBE" Grand Cinema Entrance */}
      {/* ======================================================== */}
      <Sequence from={10} durationInFrames={85}>
        {(() => {
          const localFrame = frame - 10;
          const textSpring = spring({
            frame: localFrame,
            fps,
            config: { damping: 14, stiffness: 75 }
          });
          const exitFade = interpolate(localFrame, [42, 58], [1, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp'
          });
          const tracking = interpolate(localFrame, [0, 50], [2, 14]);
          const scale = interpolate(textSpring, [0, 1], [0.85, 1.0]);
          const translateY = interpolate(textSpring, [0, 1], [30, 0]);

          return (
            <div
              style={{
                position: 'absolute',
                top: 90,
                left: 0,
                right: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                opacity: exitFade,
                transform: `translateY(${translateY}px) scale(${scale})`,
                pointerEvents: 'none',
                zIndex: 30
              }}
            >
              <div
                style={{
                  fontSize: 96,
                  fontWeight: 950,
                  letterSpacing: `${tracking}px`,
                  color: '#ffffff',
                  textShadow: `
                    0 0 50px rgba(56, 189, 248, 0.65),
                    0 0 100px rgba(24, 72, 136, 0.5),
                    0 4px 20px rgba(0, 0, 0, 0.8)
                  `
                }}
              >
                TRAUBE
              </div>
              <div
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  letterSpacing: '8px',
                  color: '#38bdf8',
                  textTransform: 'uppercase',
                  marginTop: 10,
                  textShadow: '0 0 20px rgba(56, 189, 248, 0.7)'
                }}
              >
                PLATAFORMA MÉDICA
              </div>
            </div>
          );
        })()}
      </Sequence>

      {/* ======================================================== */}
      {/* SCENE 2 (Frames 125 to 295): "Seu estudo. Seu ritmo."   */}
      {/* ======================================================== */}
      <Sequence from={125} durationInFrames={170}>
        {(() => {
          const localFrame = frame - 125;
          const enterSp = spring({
            frame: localFrame,
            fps,
            config: { damping: 15, stiffness: 85 }
          });
          const exitFade = interpolate(localFrame, [150, 170], [1, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp'
          });
          const translateY = interpolate(enterSp, [0, 1], [-40, 0]);

          return (
            <div
              style={{
                position: 'absolute',
                top: 130, // Safe Reels area top
                left: 60,
                right: 60,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                opacity: exitFade,
                transform: `translateY(${translateY}px)`,
                pointerEvents: 'none',
                zIndex: 30
              }}
            >
              {/* Category Pill Tag */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '7px 18px',
                  backgroundColor: 'rgba(24, 72, 136, 0.65)',
                  border: '1.5px solid rgba(56, 189, 248, 0.6)',
                  borderRadius: 999,
                  backdropFilter: 'blur(12px)',
                  marginBottom: 14,
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)'
                }}
              >
                <div
                  style={{
                    width: 9,
                    height: 9,
                    borderRadius: '50%',
                    backgroundColor: '#38bdf8',
                    boxShadow: '0 0 10px #38bdf8'
                  }}
                />
                <span
                  style={{
                    fontSize: 16,
                    fontWeight: 800,
                    letterSpacing: '2px',
                    color: '#d6ecff',
                    textTransform: 'uppercase'
                  }}
                >
                  DASHBOARD EDUCACIONAL
                </span>
              </div>

              {/* Main Headline */}
              <div
                style={{
                  fontSize: 64,
                  fontWeight: 900,
                  lineHeight: 1.1,
                  letterSpacing: '-1.5px',
                  color: '#ffffff',
                  textShadow: '0 4px 24px rgba(0, 0, 0, 0.9)'
                }}
              >
                Seu estudo.{' '}
                <span
                  style={{
                    color: '#38bdf8',
                    textShadow: '0 0 35px rgba(56, 189, 248, 0.7)'
                  }}
                >
                  Seu ritmo.
                </span>
              </div>

              {/* Sub-bullet highlights */}
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 500,
                  color: '#94a3b8',
                  marginTop: 10,
                  letterSpacing: '0.2px',
                  textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)'
                }}
              >
                Sessão guiada • Ofensiva ativa • Cronograma diário
              </div>
            </div>
          );
        })()}
      </Sequence>

      {/* ======================================================== */}
      {/* SCENE 3 (Frames 305 to 375): Transição Central de Estudos */}
      {/* ======================================================== */}
      <Sequence from={305} durationInFrames={70}>
        {(() => {
          const localFrame = frame - 305;
          const enterSp = spring({
            frame: localFrame,
            fps,
            config: { damping: 16, stiffness: 90 }
          });
          const exitFade = interpolate(localFrame, [50, 70], [1, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp'
          });

          return (
            <div
              style={{
                position: 'absolute',
                top: 130,
                left: 60,
                right: 60,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                opacity: exitFade,
                transform: `translateY(${interpolate(enterSp, [0, 1], [-30, 0])}px)`,
                pointerEvents: 'none',
                zIndex: 30
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '7px 18px',
                  backgroundColor: 'rgba(24, 72, 136, 0.7)',
                  border: '1.5px solid rgba(56, 189, 248, 0.65)',
                  borderRadius: 999,
                  backdropFilter: 'blur(12px)',
                  marginBottom: 12
                }}
              >
                <span
                  style={{
                    fontSize: 16,
                    fontWeight: 800,
                    letterSpacing: '2px',
                    color: '#38bdf8',
                    textTransform: 'uppercase'
                  }}
                >
                  NAVEGAÇÃO INSTANTÂNEA
                </span>
              </div>
              <div
                style={{
                  fontSize: 54,
                  fontWeight: 900,
                  letterSpacing: '-1px',
                  color: '#ffffff',
                  textShadow: '0 4px 20px rgba(0, 0, 0, 0.9)'
                }}
              >
                Área de Estudos
              </div>
            </div>
          );
        })()}
      </Sequence>

      {/* ======================================================== */}
      {/* SCENE 4 (Frames 390 to 480): "Aprenda de um jeito diferente." */}
      {/* ======================================================== */}
      <Sequence from={390} durationInFrames={90}>
        {(() => {
          const localFrame = frame - 390;
          const enterSp = spring({
            frame: localFrame,
            fps,
            config: { damping: 15, stiffness: 85 }
          });
          const exitFade = interpolate(localFrame, [75, 90], [1, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp'
          });

          return (
            <div
              style={{
                position: 'absolute',
                top: 130,
                left: 60,
                right: 60,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                opacity: exitFade,
                transform: `translateY(${interpolate(enterSp, [0, 1], [-35, 0])}px)`,
                pointerEvents: 'none',
                zIndex: 30
              }}
            >
              {/* Feature Badge */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '7px 18px',
                  backgroundColor: 'rgba(24, 72, 136, 0.7)',
                  border: '1.5px solid rgba(56, 189, 248, 0.65)',
                  borderRadius: 999,
                  backdropFilter: 'blur(12px)',
                  marginBottom: 14
                }}
              >
                <div
                  style={{
                    width: 9,
                    height: 9,
                    borderRadius: '50%',
                    backgroundColor: '#38bdf8',
                    boxShadow: '0 0 10px #38bdf8'
                  }}
                />
                <span
                  style={{
                    fontSize: 16,
                    fontWeight: 800,
                    letterSpacing: '2px',
                    color: '#d6ecff',
                    textTransform: 'uppercase'
                  }}
                >
                  CENTRAL DE APRENDIZAGEM
                </span>
              </div>

              {/* Headline */}
              <div
                style={{
                  fontSize: 60,
                  fontWeight: 900,
                  lineHeight: 1.15,
                  letterSpacing: '-1.5px',
                  color: '#ffffff',
                  textShadow: '0 4px 25px rgba(0, 0, 0, 0.9)'
                }}
              >
                Aprenda de um{' '}
                <span
                  style={{
                    color: '#38bdf8',
                    textShadow: '0 0 35px rgba(56, 189, 248, 0.7)'
                  }}
                >
                  jeito diferente.
                </span>
              </div>

              {/* Tool Pill list */}
              <div
                style={{
                  display: 'flex',
                  gap: 10,
                  marginTop: 16
                }}
              >
                {['Apostilas', 'Minhas anotações', 'TraubeZap'].map((tool, idx) => {
                  const pillSp = spring({
                    frame: localFrame - idx * 8,
                    fps,
                    config: { damping: 14, stiffness: 90 }
                  });
                  return (
                    <div
                      key={tool}
                      style={{
                        padding: '6px 14px',
                        backgroundColor: 'rgba(15, 23, 42, 0.8)',
                        border: '1px solid rgba(56, 189, 248, 0.4)',
                        borderRadius: 8,
                        fontSize: 15,
                        fontWeight: 700,
                        color: '#93c5fd',
                        opacity: interpolate(pillSp, [0, 1], [0, 1]),
                        transform: `scale(${interpolate(pillSp, [0, 1], [0.8, 1])})`
                      }}
                    >
                      {tool}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })()}
      </Sequence>

      {/* ======================================================== */}
      {/* FINAL CLIMAX & HERO OUTRO (Frames 475 to 540)           */}
      {/* ======================================================== */}
      <Sequence from={475} durationInFrames={65}>
        {(() => {
          const localFrame = frame - 475;
          const outroSp = spring({
            frame: localFrame,
            fps,
            config: { damping: 16, stiffness: 70 }
          });
          const opacity = interpolate(outroSp, [0, 1], [0, 1]);
          const translateY = interpolate(outroSp, [0, 1], [40, 0]);

          return (
            <div
              style={{
                position: 'absolute',
                bottom: 150, // Reels safe area bottom
                left: 0,
                right: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                opacity,
                transform: `translateY(${translateY}px)`,
                pointerEvents: 'none',
                zIndex: 35
              }}
            >
              {/* TRAUBE Medical Knot Logo */}
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 22,
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  boxShadow: `
                    0 0 50px rgba(56, 189, 248, 0.6),
                    0 10px 30px rgba(0, 0, 0, 0.8)
                  `,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 14
                }}
              >
                <Img
                  src={staticFile('assets/logos/logo-principal.png')}
                  style={{ width: 64, height: 64, objectFit: 'contain' }}
                />
              </div>

              {/* TRAUBE Title */}
              <div
                style={{
                  fontSize: 44,
                  fontWeight: 950,
                  letterSpacing: '4px',
                  color: '#ffffff',
                  textShadow: '0 0 30px rgba(56, 189, 248, 0.7)'
                }}
              >
                TRAUBE
              </div>

              {/* Tagline */}
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                  color: '#94a3b8',
                  letterSpacing: '1px',
                  marginTop: 4
                }}
              >
                O futuro da educação médica.
              </div>

              {/* CTA Pill */}
              <div
                style={{
                  marginTop: 18,
                  padding: '12px 34px',
                  backgroundColor: '#184888',
                  border: '1.5px solid rgba(56, 189, 248, 0.8)',
                  borderRadius: 999,
                  fontSize: 19,
                  fontWeight: 800,
                  color: '#ffffff',
                  letterSpacing: '1.5px',
                  boxShadow: '0 0 35px rgba(24, 72, 136, 0.8)'
                }}
              >
                traube.med.br • Link na bio
              </div>
            </div>
          );
        })()}
      </Sequence>

      {/* 5. Cinematic Vignette (Subtle edge shading for depth) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 65%, rgba(0, 3, 10, 0.75) 100%)',
          pointerEvents: 'none',
          zIndex: 40
        }}
      />
    </AbsoluteFill>
  );
};
