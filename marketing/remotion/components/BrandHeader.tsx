import React from 'react';
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { THEME } from '../theme';

interface BrandHeaderProps {
  badge?: string;
  subtitle?: string;
}

export const BrandHeader: React.FC<BrandHeaderProps> = ({
  badge = 'STUDY RATS',
  subtitle = 'Estudo médico em companhia'
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 120 }
  });

  const opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });
  const translateY = interpolate(entrance, [0, 1], [-40, 0]);

  return (
    <div
      style={{
        position: 'absolute',
        top: 100, // Margem de segurança superior para o Reels
        left: 0,
        right: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 16,
        zIndex: 50,
        opacity,
        transform: `translateY(${translateY}px)`
      }}
    >
      {/* Linha superior: Logo da TRAUBE e Badge de funcionalidade */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 20,
          padding: '10px 24px',
          background: 'rgba(255, 255, 255, 0.92)',
          backdropFilter: 'blur(16px)',
          borderRadius: 999,
          border: `1.5px solid ${THEME.colors.border}`,
          boxShadow: '0 8px 30px rgba(24, 72, 136, 0.08)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Img
            src={staticFile('assets/logos/logo-icone-original.png')}
            style={{ width: 34, height: 34, objectFit: 'contain' }}
          />
          <span
            style={{
              fontSize: 24,
              fontWeight: 800,
              letterSpacing: '0.04em',
              color: THEME.colors.primaryDark
            }}
          >
            TRAUBE
          </span>
        </div>

        <div
          style={{
            width: 1,
            height: 22,
            backgroundColor: THEME.colors.border
          }}
        />

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            backgroundColor: THEME.colors.primaryLight,
            padding: '5px 14px',
            borderRadius: 999
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: THEME.colors.accentGreen
            }}
          />
          <span
            style={{
              fontSize: 16,
              fontWeight: 700,
              letterSpacing: '0.06em',
              color: THEME.colors.primary,
              textTransform: 'uppercase'
            }}
          >
            {badge}
          </span>
        </div>
      </div>

      {/* Subtítulo institucional curto */}
      <span
        style={{
          fontSize: 20,
          fontWeight: 500,
          color: THEME.colors.textMuted,
          letterSpacing: '-0.01em'
        }}
      >
        {subtitle}
      </span>
    </div>
  );
};
