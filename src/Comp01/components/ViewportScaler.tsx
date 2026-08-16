import React, { useEffect, useState, useRef } from 'react';

interface ViewportScalerProps {
  children: React.ReactNode;
}

export const ViewportScaler: React.FC<ViewportScalerProps> = ({
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number>(1);

  useEffect(() => {
    const calculateScale = () => {
      if (!containerRef.current) return;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      const scaleX = windowWidth / 1920;
      const scaleY = windowHeight / 1080;
      const newScale = Math.min(scaleX, scaleY);
      setScale(newScale);
    };

    calculateScale();
    window.addEventListener('resize', calculateScale);

    return () => {
      window.removeEventListener('resize', calculateScale);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="viewport-container"
      className="relative w-screen h-screen bg-[#070709] overflow-hidden flex items-center justify-center select-none"
    >
      {/* 1920 x 1080 Fixed Canvas Frame with hardware acceleration */}
      <div
        id="canvas-1920-1080"
        className="w-[1920px] h-[1080px] min-w-[1920px] min-h-[1080px] max-w-[1920px] max-h-[1080px] shrink-0 relative overflow-hidden bg-[#0a0a0c] shadow-[0_0_80px_rgba(0,0,0,0.9)]"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          transition: 'transform 0.15s ease-out',
        }}
      >
        {children}
      </div>
    </div>
  );
};
