import React from 'react';
import { History, CheckCircle2 } from 'lucide-react';
import { Protocol } from '../types';
import { sound } from '../utils/audio';
import { useCurrentFrame, interpolate } from 'remotion';

interface ArchivedCardProps {
  protocol: Protocol;
  onSelect: (protocol: Protocol) => void;
}

export const ArchivedCard: React.FC<ArchivedCardProps> = ({ protocol, onSelect }) => {
  const frame = useCurrentFrame();

  const translateY = interpolate(frame, [10, 30], [50, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const opacity = interpolate(frame, [10, 25], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const handleClick = () => {
    sound.playSlash();
    onSelect(protocol);
  };

  return (
    <div
      id="card-archived-container"
      className="relative group cursor-pointer transition-transform duration-200 hover:scale-[1.02] focus:outline-none"
      onClick={handleClick}
      style={{
        transform: `translateY(${translateY}px)`,
        opacity,
      }}
    >
      {/* Dark Slate Layered Backplate Shadow */}
      <div
        className="absolute -inset-1.5 bg-[#252830] translate-x-3 translate-y-2 shadow-[12px_14px_0px_rgba(0,0,0,0.8)] transition-transform duration-200 group-hover:translate-x-4 group-hover:translate-y-3"
        style={{
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        }}
      />

      {/* Main Dark Charcoal Card Body */}
      <div
        id="card-archived"
        className="relative w-[620px] h-[240px] bg-[#16181d] text-white p-7 flex flex-col justify-between border border-white/10 overflow-hidden shadow-2xl"
      >
        {/* Top Row: ARCHIVED Badge & History Icon */}
        <div className="flex items-start justify-between z-10">
          {/* Slanted ARCHIVED Pill/Badge */}
          <div
            className="bg-[#242730] border border-white/20 text-neutral-300 px-6 py-1 font-anton italic text-lg tracking-wider inline-block -skew-x-12"
            style={{ clipPath: 'polygon(0 0, 100% 0, 92% 100%, 0% 100%)' }}
          >
            <span className="inline-block transform skew-x-12">ARCHIVED</span>
          </div>

          {/* History / Clock Icon in Top Right */}
          <div className="text-neutral-400 group-hover:text-white transition-colors">
            <History size={22} className="stroke-[2]" />
          </div>
        </div>

        {/* Title: KAMOSHIDA'S END with Red Stencil / Strike Accent */}
        <div className="my-auto py-1 z-10">
          <div className="relative inline-block">
            {/* Red Strike / Accent underlay */}
            <div className="absolute inset-y-1/2 left-0 right-0 h-2 bg-[#ff0033]/80 -skew-y-1 transform -translate-y-1/2 pointer-events-none opacity-80" />

            <h3
              className="text-4xl font-anton italic tracking-wide uppercase text-neutral-300 relative z-10 select-none group-hover:text-white transition-colors"
              style={{
                fontFamily: "'Anton', sans-serif",
                textShadow: '2px 2px 0px #000',
              }}
            >
              {protocol.title}
            </h3>
          </div>
        </div>

        {/* Bottom Info Row: COMPLETION -> 100% CLEAR */}
        <div className="flex items-end justify-between z-10">
          <div>
            <div className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase font-semibold">
              COMPLETION
            </div>
            <div
              className="text-2xl font-anton italic tracking-wider text-white uppercase flex items-center gap-2 mt-0.5"
              style={{ fontFamily: "'Anton', sans-serif" }}
            >
              <span>{protocol.completion}</span>
              <CheckCircle2 size={18} className="text-[#22c55e] inline" />
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs font-mono text-neutral-500">
              TARGET: <span className="text-neutral-300">{protocol.targetName}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
