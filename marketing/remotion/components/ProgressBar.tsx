import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { THEME } from '../theme';

export const ProgressBar: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const progress = Math.min(1, Math.max(0, frame / durationInFrames));

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 6,
        backgroundColor: 'rgba(24, 72, 136, 0.12)',
        zIndex: 100
      }}
    >
      <div
        style={{
          width: `${progress * 100}%`,
          height: '100%',
          background: `linear-gradient(90deg, ${THEME.colors.primary}, #38bdf8)`,
          boxShadow: '0 0 12px rgba(56, 189, 248, 0.6)'
        }}
      />
    </div>
  );
};
