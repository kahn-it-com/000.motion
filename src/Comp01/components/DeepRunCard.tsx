import React from 'react';
import { Sparkles, Map } from 'lucide-react';
import { Protocol } from '../types';
import { sound } from '../utils/audio';
import { useCurrentFrame, interpolate } from "remotion";

interface DeepRunCardProps {
  protocol: Protocol;
  onSelect: (protocol: Protocol) => void;
}

export const DeepRunCard: React.FC<DeepRunCardProps> = ({ protocol, onSelect }) => {
  const frame = useCurrentFrame();

  const translateX = interpolate(frame, [0, 20], [50, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const handleClick = () => {
    sound.playSlash();
    onSelect(protocol);
  };

  return (
    <div
      className="relative group cursor-pointer transition-transform duration-200 hover:scale-[1.02]"
      onClick={handleClick}
      style={{
        transform: `translateX(${translateX}px)`,
      }}
    >
      <div
        className="absolute -inset-1.5 bg-[#d81e28] translate-x-1.5 translate-y-1.5 transition-transform duration-200 group-hover:translate-x-2.5 group-hover:translate-y-2.5"
        style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
      />
      <div className="relative w-[480px] h-[220px] bg-[#1a1a1e] border-2 border-[#d81e28] text-white p-6 shadow-xl flex flex-col justify-between overflow-hidden">

        {/* Abstract background stripes for deep run */}
        <div className="absolute inset-0 bg-halftone-dark opacity-30 z-0 pointer-events-none" />

        <div className="relative z-10 flex justify-between items-start">
          <div className="bg-[#d81e28] text-white px-4 py-1 font-anton italic text-xl tracking-wide inline-block -skew-x-12">
            <span className="inline-block transform skew-x-12">DEEP RUN</span>
          </div>
          <div className="text-neutral-500 font-mono text-xs tracking-widest font-bold">
            {protocol.completionPercent}% EXPLORED
          </div>
        </div>

        <div className="relative z-10 flex-1 flex flex-col justify-center">
          <h3
            className="text-5xl font-anton italic uppercase text-white mb-2"
            style={{ textShadow: '2px 2px 0px #000' }}
          >
            {protocol.title}
          </h3>
          <div className="flex items-center gap-4 text-xs font-mono text-neutral-400">
            <div className="flex items-center gap-1.5 bg-black/40 px-2 py-1">
              <Map size={14} className="text-[#d81e28]" />
              DEPTH: {protocol.securityLevel} FLRS
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
