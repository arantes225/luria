import React from 'react';
import { interpolate, spring, staticFile, useCurrentFrame, useVideoConfig, Img } from 'remotion';

export const TechIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const time = frame / fps;

  // Spring animations for staggered reveals
  const spring1 = spring({ frame: frame - 5, fps, config: { damping: 14, stiffness: 120 } });
  const spring2 = spring({ frame: frame - 22, fps, config: { damping: 14, stiffness: 120 } });
  const spring3 = spring({ frame: frame - 40, fps, config: { damping: 14, stiffness: 120 } });
  const spring4 = spring({ frame: frame - 58, fps, config: { damping: 14, stiffness: 120 } });

  // Glitch effect on frames 0-25
  const isGlitch = frame < 25 && frame % 4 === 0;
  const glitchX = isGlitch ? (frame % 2 === 0 ? 6 : -6) : 0;

  // Medical Specialties Badges with coordinates & wave float
  const specialties = [
    { name: 'CLÍNICA MÉDICA', x: 80, y: 310, delay: 0 },
    { name: 'CIRURGIA GERAL', x: 620, y: 280, delay: 4 },
    { name: 'PEDIATRIA', x: 140, y: 440, delay: 8 },
    { name: 'GINECO & OBSTETRÍCIA', x: 560, y: 450, delay: 12 },
    { name: 'PREVENTIVA & SOCIAL', x: 330, y: 550, delay: 16 }
  ];

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 50,
        fontFamily: "'Inter', -apple-system, sans-serif"
      }}
    >
      {/* Floating Medical Specialties Pills */}
      {specialties.map((spec, i) => {
        const pillSpring = spring({
          frame: frame - spec.delay,
          fps,
          config: { damping: 16, stiffness: 100 }
        });
        const float = Math.sin(time * 2 + i * 1.2) * 8;
        const opacity = interpolate(pillSpring, [0, 1], [0, 0.95]);
        const scale = interpolate(pillSpring, [0, 1], [0.7, 1]);

        return (
          <div
            key={spec.name}
            style={{
              position: 'absolute',
              left: spec.x,
              top: spec.y + float,
              transform: `scale(${scale})`,
              opacity,
              padding: '11px 22px',
              backgroundColor: 'rgba(12, 45, 92, 0.78)',
              border: '1.5px solid rgba(86, 172, 255, 0.65)',
              borderRadius: 30,
              color: '#d6ecff',
              fontSize: 16,
              fontWeight: 800,
              letterSpacing: '1.5px',
              boxShadow: '0 8px 24px rgba(18, 72, 136, 0.35)',
              backdropFilter: 'blur(8px)'
            }}
          >
            {spec.name}
          </div>
        );
      })}

      {/* Main Kinetic Typography Block */}
      <div
        style={{
          position: 'absolute',
          left: 64,
          right: 64,
          top: 690,
          transform: `translateX(${glitchX}px)`
        }}
      >
        {/* Callout Line 1 */}
        <div
          style={{
            fontSize: 66,
            fontWeight: 900,
            letterSpacing: '-2px',
            lineHeight: 1.1,
            color: '#ffffff',
            opacity: interpolate(spring1, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(spring1, [0, 1], [30, 0])}px)`,
            textShadow: isGlitch
              ? '-3px 0 #00ffff, 3px 0 #ff0055'
              : '0 4px 18px rgba(0,0,0,0.4)'
          }}
        >
          MUITA MATÉRIA.
        </div>

        {/* Callout Line 2 - Vibrant Accent */}
        <div
          style={{
            fontSize: 108,
            fontWeight: 950,
            letterSpacing: '-4px',
            lineHeight: 1.0,
            margin: '8px 0',
            color: '#399bff',
            opacity: interpolate(spring2, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(spring2, [0, 1], [35, 0])}px)`,
            textShadow: '0 0 40px rgba(57, 155, 255, 0.65)'
          }}
        >
          POUCO TEMPO?
        </div>

        {/* Glowing Divider Bar */}
        <div
          style={{
            width: `${interpolate(spring3, [0, 1], [0, 480])}px`,
            height: 6,
            borderRadius: 3,
            backgroundColor: '#399bff',
            boxShadow: '0 0 16px rgba(57, 155, 255, 0.8)',
            margin: '24px 0 28px'
          }}
        />

        {/* Subtitle Line 3 */}
        <div
          style={{
            fontSize: 34,
            fontWeight: 600,
            color: '#cbe4ff',
            letterSpacing: '-0.5px',
            opacity: interpolate(spring3, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(spring3, [0, 1], [25, 0])}px)`
          }}
        >
          Existe um jeito mais inteligente.
        </div>

        {/* High-Tech Pill Badge CTA */}
        <div
          style={{
            marginTop: 34,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 12,
            padding: '16px 32px',
            borderRadius: 36,
            backgroundColor: 'rgba(24, 72, 136, 0.85)',
            border: '2px solid rgba(86, 172, 255, 0.85)',
            boxShadow: '0 0 30px rgba(24, 72, 136, 0.55)',
            opacity: interpolate(spring4, [0, 1], [0, 1]),
            transform: `scale(${interpolate(spring4, [0, 1], [0.85, 1])})`
          }}
        >
          <span style={{ fontSize: 22, color: '#399bff' }}>●</span>
          <span
            style={{
              fontSize: 26,
              fontWeight: 800,
              color: '#ffffff',
              letterSpacing: '1px'
            }}
          >
            Conheça a LURIA →
          </span>
        </div>
      </div>
    </div>
  );
};
