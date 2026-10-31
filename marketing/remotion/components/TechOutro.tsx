import React from 'react';
import { interpolate, spring, staticFile, useCurrentFrame, useVideoConfig, Img } from 'remotion';

export const TechOutro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const time = frame / fps;

  const spEmblem = spring({ frame, fps, config: { damping: 14, stiffness: 120 } });
  const spBrand = spring({ frame: frame - 6, fps, config: { damping: 14, stiffness: 120 } });
  const spLine1 = spring({ frame: frame - 12, fps, config: { damping: 14, stiffness: 120 } });
  const spLine2 = spring({ frame: frame - 18, fps, config: { damping: 14, stiffness: 120 } });
  const spLine3 = spring({ frame: frame - 24, fps, config: { damping: 14, stiffness: 120 } });
  const spButton = spring({ frame: frame - 28, fps, config: { damping: 14, stiffness: 110 } });

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 60,
        fontFamily: "'Inter', -apple-system, sans-serif",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        pointerEvents: 'none'
      }}
    >
      {/* Shockwave expanding rings */}
      {[0, 1, 2, 3].map(i => {
        const ringScale = interpolate(frame, [0, 90], [0.8, 1.8 + i * 0.3], {
          extrapolateRight: 'clamp'
        });
        const ringOpacity = interpolate(frame, [0, 40, 90], [0, 0.45 - i * 0.1, 0]);

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: 360,
              width: 380,
              height: 380,
              borderRadius: '50%',
              border: '2px solid rgba(86, 172, 255, 0.65)',
              transform: `scale(${ringScale})`,
              opacity: ringOpacity,
              boxShadow: '0 0 40px rgba(57, 155, 255, 0.45)'
            }}
          />
        );
      })}

      {/* Central Glowing TRAUBE Emblem */}
      <div
        style={{
          position: 'absolute',
          top: 310,
          transform: `scale(${interpolate(spEmblem, [0, 1], [0.6, 1])})`,
          opacity: interpolate(spEmblem, [0, 1], [0, 1]),
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Img
          src={staticFile('assets/logos/logo-icone-azul-claro.png')}
          style={{
            width: 130,
            height: 130,
            objectFit: 'contain',
            filter: 'drop-shadow(0 0 35px rgba(123, 223, 255, 0.95))'
          }}
        />
      </div>

      {/* Brand Title */}
      <div
        style={{
          position: 'absolute',
          top: 470,
          textAlign: 'center',
          opacity: interpolate(spBrand, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(spBrand, [0, 1], [25, 0])}px)`
        }}
      >
        <div
          style={{
            fontSize: 98,
            fontWeight: 950,
            letterSpacing: '2px',
            color: '#ffffff',
            lineHeight: 1.0,
            textShadow: '0 4px 30px rgba(0, 0, 0, 0.6)'
          }}
        >
          TRAUBE
        </div>
        <div
          style={{
            fontSize: 20,
            fontWeight: 800,
            letterSpacing: '4px',
            color: '#7bdfff',
            marginTop: 8,
            textTransform: 'uppercase'
          }}
        >
          MEDICINA INTELIGENTE
        </div>
      </div>

      {/* Glowing Divider */}
      <div
        style={{
          position: 'absolute',
          top: 635,
          width: interpolate(spBrand, [0, 1], [0, 260]),
          height: 4,
          borderRadius: 2,
          backgroundColor: '#399bff',
          boxShadow: '0 0 16px rgba(57, 155, 255, 0.85)'
        }}
      />

      {/* Kinetic Triad: Aprenda. Conecte. Consolide. */}
      <div
        style={{
          position: 'absolute',
          top: 670,
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          gap: 10
        }}
      >
        <div
          style={{
            fontSize: 48,
            fontWeight: 900,
            letterSpacing: '-1.5px',
            color: '#ffffff',
            opacity: interpolate(spLine1, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(spLine1, [0, 1], [20, 0])}px)`
          }}
        >
          Aprenda.
        </div>

        <div
          style={{
            fontSize: 48,
            fontWeight: 900,
            letterSpacing: '-1.5px',
            color: '#7bdfff',
            opacity: interpolate(spLine2, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(spLine2, [0, 1], [20, 0])}px)`,
            textShadow: '0 0 20px rgba(123, 223, 255, 0.55)'
          }}
        >
          Conecte.
        </div>

        <div
          style={{
            fontSize: 48,
            fontWeight: 900,
            letterSpacing: '-1.5px',
            color: '#ffffff',
            opacity: interpolate(spLine3, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(spLine3, [0, 1], [20, 0])}px)`
          }}
        >
          Consolide.
        </div>
      </div>

      {/* Subtext */}
      <div
        style={{
          position: 'absolute',
          top: 880,
          fontSize: 22,
          fontWeight: 700,
          color: '#c4daef',
          letterSpacing: '1px',
          textTransform: 'uppercase',
          opacity: interpolate(spLine3, [0, 1], [0, 1])
        }}
      >
        Seu próximo nível começa agora.
      </div>

      {/* Neon CTA Button */}
      <div
        style={{
          position: 'absolute',
          top: 960,
          padding: '24px 56px',
          borderRadius: 44,
          backgroundColor: '#184888',
          backgroundImage: 'linear-gradient(135deg, #1f5cb0 0%, #123769 100%)',
          border: '2px solid rgba(123, 223, 255, 0.85)',
          boxShadow: `
            0 12px 35px rgba(24, 72, 136, 0.65),
            0 0 35px rgba(57, 155, 255, 0.55),
            0 0 0 1px rgba(255, 255, 255, 0.25) inset
          `,
          fontSize: 24,
          fontWeight: 900,
          color: '#ffffff',
          letterSpacing: '1.5px',
          opacity: interpolate(spButton, [0, 1], [0, 1]),
          transform: `scale(${interpolate(spButton, [0, 1], [0.85, 1]) + Math.sin(time * 4) * 0.02})`
        }}
      >
        CONHEÇA A TRAUBE →
      </div>
    </div>
  );
};
