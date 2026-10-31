import React from 'react';
import { interpolate, spring, staticFile, useCurrentFrame, useVideoConfig, Img } from 'remotion';

export const TechConstellation: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const time = frame / fps;

  const spTitle = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const spNodes = spring({ frame: frame - 12, fps, config: { damping: 16, stiffness: 90 } });

  // Center node coordinate
  const cx = 540;
  const cy = 1080;

  // 5 surrounding nodes coordinates
  const nodes = [
    { label: 'Caderno de erros', x: 440, y: 760, delay: 0 },
    { label: 'Anotações & Resumos', x: 740, y: 910, delay: 4 },
    { label: 'TraubeZap', x: 800, y: 1210, delay: 8 },
    { label: 'Flashcards', x: 680, y: 1440, delay: 12 },
    { label: 'Questões & Simulados', x: 340, y: 1420, delay: 16 },
    { label: 'Study Rats', x: 260, y: 1020, delay: 20 }
  ];

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 50,
        fontFamily: "'Inter', -apple-system, sans-serif",
        pointerEvents: 'none'
      }}
    >
      {/* Top Headline */}
      <div
        style={{
          position: 'absolute',
          top: 240,
          left: 56,
          right: 56,
          textAlign: 'center',
          opacity: interpolate(spTitle, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(spTitle, [0, 1], [30, 0])}px)`
        }}
      >
        <div
          style={{
            fontSize: 62,
            fontWeight: 950,
            letterSpacing: '-2.5px',
            lineHeight: 1.1,
            color: '#ffffff'
          }}
        >
          Da aula à revisão,
        </div>
        <div
          style={{
            fontSize: 62,
            fontWeight: 950,
            letterSpacing: '-2.5px',
            lineHeight: 1.1,
            color: '#7bdfff',
            textShadow: '0 0 35px rgba(123, 223, 255, 0.55)'
          }}
        >
          sem perder o fio.
        </div>
        <div
          style={{
            fontSize: 22,
            color: '#c4daef',
            marginTop: 14,
            fontWeight: 500
          }}
        >
          Um ecossistema médico onde cada erro vira aprendizado.
        </div>
      </div>

      {/* SVG Connecting Pulsing Laser Lines */}
      <svg
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          overflow: 'visible'
        }}
      >
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#399bff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#7bdfff" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {nodes.map((node, i) => {
          // Animated dash offset to simulate traveling light pulses
          const dashOffset = -(time * 120 + i * 30);
          return (
            <line
              key={node.label}
              x1={cx}
              y1={cy}
              x2={node.x}
              y2={node.y}
              stroke="url(#lineGrad)"
              strokeWidth="2.5"
              strokeDasharray="6 8"
              strokeDashoffset={dashOffset}
              style={{
                opacity: interpolate(spNodes, [0, 1], [0, 0.85]),
                filter: 'drop-shadow(0 0 8px rgba(57, 155, 255, 0.65))'
              }}
            />
          );
        })}
      </svg>

      {/* Central Hub Node (TRAUBE Emblem) */}
      <div
        style={{
          position: 'absolute',
          left: cx,
          top: cy,
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 12,
          opacity: interpolate(spNodes, [0, 1], [0, 1])
        }}
      >
        {/* Pulsing Aura Rings */}
        <div
          style={{
            position: 'absolute',
            width: 170,
            height: 170,
            borderRadius: '50%',
            backgroundColor: 'rgba(24, 72, 136, 0.35)',
            border: '2px solid rgba(86, 172, 255, 0.65)',
            boxShadow: '0 0 50px rgba(57, 155, 255, 0.55)',
            transform: `scale(${1 + Math.sin(time * 3) * 0.08})`
          }}
        />

        <Img
          src={staticFile('assets/logos/logo-icone-azul-claro.png')}
          style={{
            width: 90,
            height: 90,
            objectFit: 'contain',
            filter: 'drop-shadow(0 0 20px rgba(123, 223, 255, 0.95))',
            zIndex: 2
          }}
        />

        <div
          style={{
            fontSize: 16,
            fontWeight: 900,
            letterSpacing: '3px',
            color: '#81defa',
            textTransform: 'uppercase',
            zIndex: 2
          }}
        >
          TRAUBE // NÚCLEO
        </div>
      </div>

      {/* Satellite Nodes */}
      {nodes.map((node, i) => {
        const float = Math.sin(time * 2 + i * 1.5) * 6;
        return (
          <div
            key={node.label}
            style={{
              position: 'absolute',
              left: node.x,
              top: node.y + float,
              transform: 'translate(-50%, -50%)',
              padding: '12px 24px',
              borderRadius: 24,
              backgroundColor: 'rgba(10, 36, 78, 0.88)',
              border: '1.5px solid rgba(98, 202, 255, 0.75)',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.45)',
              backdropFilter: 'blur(10px)',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              opacity: interpolate(spNodes, [0, 1], [0, 1]),
              whiteSpace: 'nowrap'
            }}
          >
            <span
              style={{
                width: 9,
                height: 9,
                borderRadius: '50%',
                backgroundColor: '#399bff',
                boxShadow: '0 0 10px #399bff'
              }}
            />
            <span
              style={{
                fontSize: 18,
                fontWeight: 750,
                color: '#ffffff',
                letterSpacing: '0.5px'
              }}
            >
              {node.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};
