import React from 'react';
import { useVideoConfig } from 'remotion';

interface ViewportScalerProps {
  children: React.ReactNode;
}

export const ViewportScaler: React.FC<ViewportScalerProps> = ({
  children,
}) => {
  const { width, height } = useVideoConfig();

  const scaleX = width / 1920;
  const scaleY = height / 1080;
  const scale = Math.min(scaleX, scaleY);

  return (
    <div
      id="viewport-container"
      className="relative w-full h-full bg-[#070709] overflow-hidden flex items-center justify-center select-none"
    >
      {/* 1920 x 1080 Fixed Canvas Frame with hardware acceleration */}
      <div
        id="canvas-1920-1080"
        className="w-[1920px] h-[1080px] min-w-[1920px] min-h-[1080px] max-w-[1920px] max-h-[1080px] shrink-0 relative overflow-hidden bg-[#0a0a0c] shadow-[0_0_80px_rgba(0,0,0,0.9)]"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
        }}
      >
        {children}
      </div>
    </div>
  );
};
