import React from 'react';
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { THEME } from '../theme';

interface OutroCardProps {
  startFrame?: number;
}

export const OutroCard: React.FC<OutroCardProps> = ({ startFrame = 795 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (frame < startFrame) return null;

  const localFrame = frame - startFrame;

  const entrance = spring({
    frame: localFrame,
    fps,
    config: { damping: 14, stiffness: 100 }
  });

  const opacity = interpolate(localFrame, [0, 10], [0, 1], { extrapolateRight: 'clamp' });
  const scale = interpolate(entrance, [0, 1], [0.88, 1]);
  const translateY = interpolate(entrance, [0, 1], [40, 0]);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: 'rgba(11, 35, 71, 0.78)',
        backdropFilter: 'blur(20px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 90,
        opacity,
        fontFamily: THEME.fonts.main
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 28,
          padding: '60px 48px',
          background: '#ffffff',
          borderRadius: 36,
          boxShadow: '0 30px 80px rgba(0, 0, 0, 0.4), 0 0 0 2px rgba(24, 72, 136, 0.3)',
          maxWidth: 820,
          textAlign: 'center',
          transform: `translateY(${translateY}px) scale(${scale})`
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Img
            src={staticFile('assets/logos/logo-icone-original.png')}
            style={{ width: 72, height: 72, objectFit: 'contain' }}
          />
          <span
            style={{
              fontSize: 48,
              fontWeight: 900,
              letterSpacing: '0.04em',
              color: THEME.colors.primaryDark
            }}
          >
            LURIA
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span
            style={{
              fontSize: 32,
              fontWeight: 800,
              color: THEME.colors.primaryDark,
              letterSpacing: '-0.02em'
            }}
          >
            Uma boa companhia muda o estudo.
          </span>
          <span
            style={{
              fontSize: 22,
              fontWeight: 500,
              color: THEME.colors.textMuted
            }}
          >
            A plataforma médica com Study Rats, flashcards inteligentes e simulados reais.
          </span>
        </div>

        <div
          style={{
            marginTop: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 12
          }}
        >
          <div
            style={{
              padding: '18px 44px',
              backgroundColor: THEME.colors.primary,
              borderRadius: 999,
              color: '#ffffff',
              fontSize: 24,
              fontWeight: 700,
              boxShadow: '0 10px 25px rgba(24, 72, 136, 0.35)'
            }}
          >
            resibulando.online
          </div>
          <span
            style={{
              fontSize: 18,
              fontWeight: 600,
              color: THEME.colors.primary,
              letterSpacing: '0.04em',
              textTransform: 'uppercase'
            }}
          >
            Toque no link da bio
          </span>
        </div>
      </div>
    </div>
  );
};
