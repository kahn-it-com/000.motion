import React from 'react';
import { useCurrentFrame, interpolate } from "remotion";

export const BackgroundElements: React.FC = () => {
  const frame = useCurrentFrame();

  const translateX = interpolate(frame, [0, 900], [0, 50], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const rotate = interpolate(frame, [0, 900], [0, 5], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-[#0a0a0c]" style={{ transform: `translateX(${translateX}px) rotate(${rotate}deg)` }}>
      {/* Dynamic Persona Red & Black Split Background */}

      {/*
        The striking red slash background from P5 menus
        Uses clip-path to create the diagonal split
      */}
      <div
        className="absolute inset-0 bg-[#d81e28]"
        style={{
          clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 85%)',
          zIndex: 1
        }}
      />

      {/* Secondary accent shapes */}
      <div
        className="absolute inset-0 bg-[#ff2a36]"
        style={{
          clipPath: 'polygon(0 0, 100% 0, 100% 42%, 0 82%)',
          zIndex: 0
        }}
      />

      <div
        className="absolute inset-0 bg-white"
        style={{
          clipPath: 'polygon(0 0, 100% 0, 100% 46%, 0 86%)',
          zIndex: 0
        }}
      />

      {/* Halftone dot pattern overlay common in Persona UI */}
      <div
        className="absolute inset-0 opacity-40 mix-blend-overlay z-10"
        style={{
          backgroundImage: 'radial-gradient(black 1px, transparent 1px)',
          backgroundSize: '12px 12px',
        }}
      />

      {/* Jagged abstract black shapes in the red area */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 z-10 opacity-20 mix-blend-multiply pointer-events-none">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full fill-current text-black">
          <polygon points="100,0 30,0 45,20 10,40 60,60 100,100" />
        </svg>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-full z-10 opacity-[0.03] pointer-events-none">
        {/* Subtle comic speed lines overlay */}
        <div className="w-full h-full bg-comic-lines mix-blend-overlay" />
      </div>

      {/* Animated star pattern (subtle floating stars) */}
      <div className="absolute top-[10%] left-[20%] text-white/10 text-9xl font-black rotate-12 z-0 animate-pulse">
        ★
      </div>
      <div className="absolute bottom-[20%] right-[10%] text-[#d81e28]/20 text-9xl font-black -rotate-12 z-20">
        ★
      </div>
    </div>
  );
};
