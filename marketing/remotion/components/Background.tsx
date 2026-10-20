import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { THEME } from '../theme';

export const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const shift = interpolate(frame, [0, 900], [0, 60]);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: THEME.colors.bgLight,
        overflow: 'hidden',
        fontFamily: THEME.fonts.main
      }}
    >
      {/* Gradiente radial superior suave com azul LURIA */}
      <div
        style={{
          position: 'absolute',
          top: -300 + shift * 0.4,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 1400,
          height: 1000,
          background: `radial-gradient(circle, rgba(24, 72, 136, 0.22) 0%, rgba(24, 72, 136, 0.05) 50%, rgba(248, 250, 252, 0) 75%)`,
          filter: 'blur(50px)',
          pointerEvents: 'none'
        }}
      />

      {/* Grid médico sutil de precisão (linhas muito finas) */}
      <svg
        width="1080"
        height="1920"
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.04,
          pointerEvents: 'none'
        }}
      >
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke={THEME.colors.primary} strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
};
