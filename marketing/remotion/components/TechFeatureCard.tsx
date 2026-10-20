import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export interface FeatureData {
  stepNumber: string; // e.g. "01"
  tag: string; // e.g. "ORGANIZAÇÃO"
  title: string; // e.g. "PLANEJE."
  subtitle: string; // e.g. "O seu tempo, com direção."
  chip: string; // e.g. "CRONOGRAMA INTELIGENTE"
  description: string; // e.g. "Organize suas atividades, defina prioridades..."
  activeStepIndex: number; // 0 to 4
}

interface TechFeatureCardProps {
  feature: FeatureData;
}

export const TechFeatureCard: React.FC<TechFeatureCardProps> = ({ feature }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sp1 = spring({ frame: frame - 2, fps, config: { damping: 15, stiffness: 110 } });
  const sp2 = spring({ frame: frame - 8, fps, config: { damping: 15, stiffness: 110 } });
  const sp3 = spring({ frame: frame - 16, fps, config: { damping: 15, stiffness: 110 } });

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 45,
        fontFamily: "'Inter', -apple-system, sans-serif"
      }}
    >
      {/* Top Left Title Block */}
      <div
        style={{
          position: 'absolute',
          top: 125,
          left: 56,
          maxWidth: 380
        }}
      >
        {/* Category Tag */}
        <div
          style={{
            fontSize: 16,
            fontWeight: 800,
            letterSpacing: '2.5px',
            color: '#4dbbff',
            textTransform: 'uppercase',
            opacity: interpolate(sp1, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(sp1, [0, 1], [15, 0])}px)`
          }}
        >
          {feature.stepNumber} // {feature.tag}
        </div>

        {/* Massive Headline */}
        <div
          style={{
            fontSize: 68,
            fontWeight: 950,
            letterSpacing: '-2.5px',
            color: '#ffffff',
            lineHeight: 1.05,
            margin: '4px 0 6px',
            opacity: interpolate(sp1, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(sp1, [0, 1], [25, 0])}px)`,
            textShadow: '0 4px 20px rgba(0, 0, 0, 0.75)'
          }}
        >
          {feature.title}
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 23,
            fontWeight: 600,
            color: '#c4daef',
            letterSpacing: '-0.3px',
            lineHeight: 1.25,
            opacity: interpolate(sp2, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(sp2, [0, 1], [15, 0])}px)`
          }}
        >
          {feature.subtitle}
        </div>
      </div>

      {/* Floating Pill Chip Badge */}
      <div
        style={{
          position: 'absolute',
          left: 56,
          bottom: 240,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 10,
          padding: '11px 22px',
          borderRadius: 20,
          backgroundColor: 'rgba(8, 40, 87, 0.90)',
          border: '1.5px solid rgba(95, 177, 255, 0.75)',
          boxShadow: '0 8px 24px rgba(18, 72, 136, 0.4)',
          backdropFilter: 'blur(10px)',
          fontSize: 16,
          fontWeight: 800,
          color: '#e8f4ff',
          letterSpacing: '1px',
          opacity: interpolate(sp3, [0, 1], [0, 1]),
          transform: `scale(${interpolate(sp3, [0, 1], [0.9, 1])})`
        }}
      >
        <span style={{ color: '#46b0ff' }}>●</span>
        <span>{feature.chip}</span>
      </div>

      {/* Bottom Glass Description Card */}
      <div
        style={{
          position: 'absolute',
          left: 56,
          right: 56,
          bottom: 95,
          padding: '22px 26px',
          borderRadius: 22,
          backgroundColor: 'rgba(5, 29, 62, 0.88)',
          border: '1.5px solid rgba(57, 128, 208, 0.55)',
          boxShadow: '0 16px 40px rgba(0, 0, 0, 0.65)',
          backdropFilter: 'blur(16px)',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          opacity: interpolate(sp3, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(sp3, [0, 1], [25, 0])}px)`
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
          {/* Vertical Glowing Accent Bar */}
          <div
            style={{
              width: 5,
              height: 44,
              borderRadius: 3,
              backgroundColor: '#46a4ff',
              boxShadow: '0 0 12px rgba(70, 164, 255, 0.85)',
              flexShrink: 0
            }}
          />

          <div
            style={{
              fontSize: 20,
              lineHeight: 1.45,
              color: '#e6f4ff',
              fontWeight: 500,
              whiteSpace: 'pre-line'
            }}
          >
            {feature.description}
          </div>
        </div>

        {/* Step Progression Indicators */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 2 }}>
          {[0, 1, 2, 3].map(i => {
            const isActive = i <= feature.activeStepIndex;
            return (
              <div
                key={i}
                style={{
                  height: 6,
                  width: isActive ? 45 : 26,
                  borderRadius: 3,
                  backgroundColor: isActive ? '#399bff' : 'rgba(40, 80, 130, 0.65)',
                  boxShadow: isActive ? '0 0 10px rgba(57, 155, 255, 0.85)' : 'none',
                  transition: 'all 0.3s ease'
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
