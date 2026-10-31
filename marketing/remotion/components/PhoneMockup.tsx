import React from 'react';
import { interpolate, spring, staticFile, useCurrentFrame, useVideoConfig, Video } from 'remotion';
import { THEME } from '../theme';

interface PhoneMockupProps {
  videoSrc: string;
}

export const PhoneMockup: React.FC<PhoneMockupProps> = ({ videoSrc }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 18, stiffness: 90 }
  });

  const scale = interpolate(entrance, [0, 1], [0.92, 1]);
  const translateY = interpolate(entrance, [0, 1], [70, 0]);

  // Respiração / flutuação muito sutil para dinamismo visual
  const floatY = Math.sin((frame / fps) * 1.5) * 4;

  const phoneWidth = 660;
  const phoneHeight = Math.round(phoneWidth * (844 / 390)); // ~1429px

  return (
    <div
      style={{
        position: 'absolute',
        top: 230,
        left: '50%',
        width: phoneWidth,
        height: phoneHeight,
        transform: `translateX(-50%) translateY(${translateY + floatY}px) scale(${scale})`,
        zIndex: 20
      }}
    >
      {/* Sombra realista do dispositivo */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 56,
          boxShadow: `
            0 40px 100px -20px rgba(11, 35, 71, 0.35),
            0 20px 40px -15px rgba(24, 72, 136, 0.25),
            0 0 0 1px rgba(255, 255, 255, 0.6) inset
          `,
          pointerEvents: 'none',
          zIndex: 35
        }}
      />

      {/* Moldura externa do smartphone (alumínio premium com contorno característico azul TRAUBE) */}
      <div
        style={{
          position: 'absolute',
          inset: -6,
          borderRadius: 62,
          padding: 6,
          background: 'linear-gradient(145deg, #2a3a52, #101d2d, #09131f)',
          boxShadow: `0 0 0 2px ${THEME.colors.primary} inset`,
          zIndex: 25
        }}
      >
        {/* Dynamic Island / Câmera frontal */}
        <div
          style={{
            position: 'absolute',
            top: 14,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 130,
            height: 32,
            backgroundColor: '#000000',
            borderRadius: 999,
            zIndex: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            paddingRight: 14,
            gap: 8
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: 'radial-gradient(circle, #102a43 30%, #000 80%)'
            }}
          />
        </div>

        {/* Tela real encasada */}
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 52,
            overflow: 'hidden',
            backgroundColor: '#ffffff',
            position: 'relative'
          }}
        >
          <Video
            src={staticFile(videoSrc)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />

          {/* Brilho de reflexo em vidro na borda da tela */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 220,
              background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 100%)',
              pointerEvents: 'none'
            }}
          />
        </div>
      </div>
    </div>
  );
};
