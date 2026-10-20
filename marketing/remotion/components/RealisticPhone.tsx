import React from 'react';
import { staticFile, useCurrentFrame, useVideoConfig, Video } from 'remotion';

export interface CursorConfig {
  x: number; // percentage (0 to 100) or pixel
  y: number; // percentage (0 to 100) or pixel
  clicking?: boolean;
  visible?: boolean;
}

interface RealisticPhoneProps {
  videoSrc: string;
  trim?: number;
  x?: number; // delta X from center
  y?: number; // delta Y
  scale?: number;
  rotateX?: number; // degrees
  rotateY?: number; // degrees
  rotateZ?: number; // degrees
  enableFloat?: boolean;
  cursor?: CursorConfig;
}

export const RealisticPhone: React.FC<RealisticPhoneProps> = ({
  videoSrc,
  trim = 0,
  x = 0,
  y = 0,
  scale = 1,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  enableFloat = true,
  cursor
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const time = frame / fps;

  // Subtle breathing float for realism
  const floatY = enableFloat ? Math.sin(time * 1.6) * 6 : 0;
  const floatRotateZ = enableFloat ? Math.cos(time * 1.3) * 0.4 : 0;

  // Phone geometry (scaled for 1080x1920 canvas)
  const phoneWidth = 630;
  const phoneHeight = 1290;

  return (
    <div
      style={{
        position: 'absolute',
        top: 250,
        left: '50%',
        width: phoneWidth,
        height: phoneHeight,
        transform: `
          translateX(-50%)
          translate(${x}px, ${y + floatY}px)
          perspective(1200px)
          rotateX(${rotateX}deg)
          rotateY(${rotateY}deg)
          rotateZ(${rotateZ + floatRotateZ}deg)
          scale(${scale})
        `,
        transformStyle: 'preserve-3d',
        zIndex: 20
      }}
    >
      {/* Heavy Realistic Drop Shadow & Cobalt Backlight Aura */}
      <div
        style={{
          position: 'absolute',
          inset: -10,
          borderRadius: 64,
          boxShadow: `
            0 45px 110px -15px rgba(0, 0, 0, 0.90),
            0 25px 50px -10px rgba(10, 25, 50, 0.70),
            0 0 65px rgba(24, 72, 136, 0.55)
          `,
          pointerEvents: 'none',
          zIndex: 1
        }}
      />

      {/* Titanium Outer Chassis (Premium metallic bezel) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 54,
          padding: 8,
          background: 'linear-gradient(145deg, #374a63 0%, #172435 50%, #0c1421 100%)',
          boxShadow: `
            0 0 0 1px rgba(255, 255, 255, 0.22) inset,
            0 0 0 3px rgba(24, 72, 136, 0.85) inset,
            0 8px 18px rgba(0, 0, 0, 0.6)
          `,
          zIndex: 2
        }}
      >
        {/* Inner Screen Bezel with curved corners */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            borderRadius: 46,
            overflow: 'hidden',
            backgroundColor: '#050b18',
            boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.8) inset'
          }}
        >
          {/* Real PWA Video Screen Stream */}
          <Video
            src={staticFile(videoSrc)}
            startFrom={Math.round(trim * fps)}
            muted
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block'
            }}
          />

          {/* Dynamic Island Notch */}
          <div
            style={{
              position: 'absolute',
              top: 13,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 124,
              height: 31,
              backgroundColor: '#000000',
              borderRadius: 999,
              zIndex: 35,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              paddingRight: 14,
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.6)'
            }}
          >
            {/* Selfie camera reflection lens */}
            <div
              style={{
                width: 11,
                height: 11,
                borderRadius: '50%',
                background: 'radial-gradient(circle at 35% 35%, #184888 20%, #000 80%)',
                boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.15) inset'
              }}
            />
          </div>

          {/* Diagonal Glass Specular Reflection Glare */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(130deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.02) 38%, transparent 58%)',
              pointerEvents: 'none',
              zIndex: 32
            }}
          />

          {/* iOS Bottom Home Swipe Indicator Bar */}
          <div
            style={{
              position: 'absolute',
              bottom: 11,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 140,
              height: 4.5,
              backgroundColor: 'rgba(255, 255, 255, 0.65)',
              boxShadow: '0 1px 3px rgba(0,0,0,0.5)',
              borderRadius: 999,
              zIndex: 35,
              pointerEvents: 'none'
            }}
          />

          {/* Animated Cursor & Touch Ripple */}
          {cursor && cursor.visible !== false && (
            <div
              style={{
                position: 'absolute',
                left: `${cursor.x}%`,
                top: `${cursor.y}%`,
                transform: 'translate(-3px, -3px)',
                zIndex: 40,
                pointerEvents: 'none',
                transition: 'left 0.25s ease-out, top 0.25s ease-out'
              }}
            >
              {/* Click Touch Ripple Ring */}
              {cursor.clicking && (
                <div
                  style={{
                    position: 'absolute',
                    top: 10,
                    left: 10,
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    transform: 'translate(-50%, -50%)',
                    border: '2px solid rgba(70, 164, 255, 0.9)',
                    backgroundColor: 'rgba(70, 164, 255, 0.3)',
                    boxShadow: '0 0 18px rgba(70, 164, 255, 0.75)'
                  }}
                />
              )}

              {/* Cursor Arrow Pointer */}
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                style={{
                  filter: 'drop-shadow(0 3px 5px rgba(0,0,0,0.5))'
                }}
              >
                <path
                  d="M4 3L11 21L14 13L22 10L4 3Z"
                  fill="#ffffff"
                  stroke="#184888"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
