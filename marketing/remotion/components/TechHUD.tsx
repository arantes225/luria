import React from 'react';
import { Img, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

interface TechHUDProps {
  moduleName?: string;
  activeStep?: number; // 0 to 5
  totalSteps?: number;
}

export const TechHUD: React.FC<TechHUDProps> = ({
  moduleName = 'INITIALIZING',
  activeStep = 0,
  totalSteps = 5
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Dynamic timecode computation (MM:SS:FF)
  const totalSeconds = Math.floor(frame / fps);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const framesRemaining = frame % fps;

  const pad = (n: number) => n.toString().padStart(2, '0');
  const timecode = `00:${pad(minutes)}:${pad(seconds)}:${pad(framesRemaining)}`;

  // Blinking dot effect for live telemetry
  const blink = Math.floor(frame / 15) % 2 === 0;

  return (
    <>
      {/* Subtle CRT Scanlines across the entire canvas */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.14) 0px, rgba(0, 0, 0, 0.14) 1px, transparent 1px, transparent 3px)',
          pointerEvents: 'none',
          zIndex: 80,
          opacity: 0.75
        }}
      />

      {/* 4 Corner Technical HUD Reticles */}
      {/* Top Left */}
      <div
        style={{
          position: 'absolute',
          top: 36,
          left: 40,
          width: 30,
          height: 30,
          borderTop: '2px solid rgba(123, 223, 255, 0.75)',
          borderLeft: '2px solid rgba(123, 223, 255, 0.75)',
          zIndex: 85,
          pointerEvents: 'none'
        }}
      />
      {/* Top Right */}
      <div
        style={{
          position: 'absolute',
          top: 36,
          right: 40,
          width: 30,
          height: 30,
          borderTop: '2px solid rgba(123, 223, 255, 0.75)',
          borderRight: '2px solid rgba(123, 223, 255, 0.75)',
          zIndex: 85,
          pointerEvents: 'none'
        }}
      />
      {/* Bottom Left */}
      <div
        style={{
          position: 'absolute',
          bottom: 36,
          left: 40,
          width: 30,
          height: 30,
          borderBottom: '2px solid rgba(123, 223, 255, 0.75)',
          borderLeft: '2px solid rgba(123, 223, 255, 0.75)',
          zIndex: 85,
          pointerEvents: 'none'
        }}
      />
      {/* Bottom Right */}
      <div
        style={{
          position: 'absolute',
          bottom: 36,
          right: 40,
          width: 30,
          height: 30,
          borderBottom: '2px solid rgba(123, 223, 255, 0.75)',
          borderRight: '2px solid rgba(123, 223, 255, 0.75)',
          zIndex: 85,
          pointerEvents: 'none'
        }}
      />

      {/* Top Telemetry Header Bar */}
      <div
        style={{
          position: 'absolute',
          top: 52,
          left: 56,
          right: 56,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 85,
          fontFamily: "'Inter', monospace, sans-serif",
          color: '#81defa',
          fontSize: 16,
          fontWeight: 700,
          letterSpacing: '3px',
          textTransform: 'uppercase',
          pointerEvents: 'none'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span
            style={{
              display: 'inline-block',
              width: 9,
              height: 9,
              borderRadius: '50%',
              backgroundColor: blink ? '#4ade80' : '#22c55e',
              boxShadow: blink ? '0 0 10px #4ade80' : 'none'
            }}
          />
          <span>LURIA // {moduleName}</span>
        </div>

        <div style={{ color: 'rgba(129, 222, 250, 0.75)', fontVariantNumeric: 'tabular-nums' }}>
          {timecode}
        </div>
      </div>

      {/* Telemetry Horizontal Track Line */}
      <div
        style={{
          position: 'absolute',
          top: 86,
          left: 56,
          right: 56,
          height: 2,
          background: 'rgba(98, 202, 255, 0.22)',
          zIndex: 85,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        {/* Dynamic progress fill */}
        <div
          style={{
            height: '100%',
            width: `${((activeStep + 1) / totalSteps) * 100}%`,
            background: 'linear-gradient(90deg, #184888, #46b0ff, #7bdfff)',
            boxShadow: '0 0 10px rgba(123, 223, 255, 0.65)',
            transition: 'width 0.3s ease'
          }}
        />
      </div>

      {/* Top Glowing Central Luria Emblem */}
      <div
        style={{
          position: 'absolute',
          top: 108,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 6,
          zIndex: 85,
          pointerEvents: 'none'
        }}
      >
        <Img
          src={staticFile('assets/logos/logo-icone-azul-claro.png')}
          style={{
            width: 44,
            height: 44,
            objectFit: 'contain',
            filter: 'drop-shadow(0 0 14px rgba(123, 223, 255, 0.85))'
          }}
        />
      </div>

      {/* Bottom Technical Status Line */}
      <div
        style={{
          position: 'absolute',
          bottom: 54,
          left: 56,
          right: 56,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 85,
          fontFamily: "'Inter', monospace, sans-serif",
          fontSize: 14,
          letterSpacing: '2.5px',
          color: 'rgba(154, 192, 235, 0.65)',
          textTransform: 'uppercase',
          pointerEvents: 'none'
        }}
      >
        <span>SISTEMA MÉDICO INTEGRADO</span>
        <span>RESIDÊNCIA MÉDICA 2026</span>
      </div>
    </>
  );
};
