import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { THEME } from '../theme';

export interface SubtitleCue {
  startFrame: number;
  endFrame: number;
  highlight: string;
  lead: string;
  tail?: string;
}

interface SubtitlesProps {
  cues: SubtitleCue[];
}

export const Subtitles: React.FC<SubtitlesProps> = ({ cues }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const currentCue = cues.find(c => frame >= c.startFrame && frame < c.endFrame);

  if (!currentCue) return null;

  const localFrame = frame - currentCue.startFrame;
  const duration = currentCue.endFrame - currentCue.startFrame;

  const entrance = spring({
    frame: localFrame,
    fps,
    config: { damping: 15, stiffness: 140 }
  });

  // Fade out suave nos últimos 8 quadros da legenda
  const exitProgress = Math.max(0, localFrame - (duration - 8));
  const exitOpacity = interpolate(exitProgress, [0, 8], [1, 0], { extrapolateRight: 'clamp' });

  const translateY = interpolate(entrance, [0, 1], [30, 0]);
  const scale = interpolate(entrance, [0, 1], [0.94, 1]);

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 250, // Posição segura acima dos botões de áudio/legenda do Instagram
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        padding: '0 40px',
        zIndex: 60,
        pointerEvents: 'none'
      }}
    >
      <div
        style={{
          background: 'rgba(11, 35, 71, 0.94)',
          backdropFilter: 'blur(16px)',
          border: `2px solid rgba(255, 255, 255, 0.15)`,
          boxShadow: '0 16px 40px rgba(0, 0, 0, 0.35)',
          padding: '18px 36px',
          borderRadius: 24,
          maxWidth: 900,
          textAlign: 'center',
          transform: `translateY(${translateY}px) scale(${scale})`,
          opacity: entrance * exitOpacity
        }}
      >
        <span
          style={{
            fontSize: 32,
            fontWeight: 700,
            lineHeight: 1.35,
            color: '#ffffff',
            fontFamily: THEME.fonts.main,
            letterSpacing: '-0.02em'
          }}
        >
          {currentCue.lead}{' '}
          <span
            style={{
              color: '#38bdf8', // Azul luminoso de destaque
              textDecoration: 'underline',
              textDecorationColor: THEME.colors.primary,
              textUnderlineOffset: 6
            }}
          >
            {currentCue.highlight}
          </span>
          {currentCue.tail ? ` ${currentCue.tail}` : ''}
        </span>
      </div>
    </div>
  );
};
