import React from 'react';
import { Star, ShieldAlert, Users, Send } from 'lucide-react';
import { Protocol } from '../types';
import { sound } from '../utils/audio';
import { useCurrentFrame, interpolate } from "remotion";

interface ActiveProtocolCardProps {
  protocol: Protocol;
  onSelect: (protocol: Protocol) => void;
  onOpenCallingCard: (protocol: Protocol) => void;
}

export const ActiveProtocolCard: React.FC<ActiveProtocolCardProps> = ({
  protocol,
  onSelect,
  onOpenCallingCard,
}) => {
  const frame = useCurrentFrame();

  const translateY = interpolate(frame, [0, 20], [50, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const rotate = interpolate(frame, [0, 40], [-5, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const handleClick = () => {
    sound.playSlash();
    onSelect(protocol);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playDramaticHit();
    onOpenCallingCard(protocol);
  };

  return (
    <div
      id="card-active-protocol-container"
      className="relative group cursor-pointer transition-transform duration-200 hover:scale-[1.015] focus:outline-none"
      onClick={handleClick}
      style={{
        transform: `translateY(${translateY}px) rotate(${rotate}deg)`,
      }}
    >
      {/* Persona layered offset white shadow backplate */}
      <div
        className="absolute -inset-1.5 bg-white -rotate-1 translate-x-1.5 translate-y-1.5 transition-transform duration-200 group-hover:translate-x-2.5 group-hover:translate-y-2.5"
        style={{
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        }}
      />

      {/* Main Black Card Body */}
      <div
        id="card-active-protocol"
        className="relative w-[880px] h-[520px] bg-[#0c0c0e] text-white p-10 flex flex-col justify-between shadow-[15px_20px_0px_rgba(0,0,0,0.8)] border border-neutral-900 overflow-hidden"
      >
        {/* Top Header Row */}
        <div className="flex items-start justify-between z-10">
          {/* ACTIVE PROTOCOL Slanted Badge (Exact recreation) */}
          <div className="relative">
            {/* White Slanted Box */}
            <div
              className="bg-white text-black px-8 py-2 font-anton italic text-3xl tracking-wider inline-block -skew-x-12 shadow-md"
              style={{ clipPath: 'polygon(0 0, 100% 0, 92% 100%, 0% 100%)' }}
            >
              <span className="inline-block transform skew-x-12">ACTIVE</span>
            </div>
            {/* Red Underline / Secondary Bar */}
            <div className="absolute -bottom-3 left-0 w-36 h-2.5 bg-[#ff0033] -skew-x-12 flex items-center">
              <span className="text-[9px] font-mono tracking-widest text-black font-extrabold uppercase px-2 -skew-x-0 leading-none">
                PROTOCOL
              </span>
            </div>
          </div>

          {/* Golden Yellow Star Icon in Top Right */}
          <div className="flex items-center gap-3">
            <div className="p-1 text-[#facc15] hover:scale-125 transition-transform">
              <Star
                size={34}
                className="fill-[#facc15] stroke-[#facc15] drop-shadow-[0_2px_8px_rgba(250,204,21,0.5)]"
              />
            </div>
          </div>
        </div>

        {/* Big Bold Slanted Title matching screenshot */}
        <div className="my-auto py-2 z-10 select-none">
          <div className="relative inline-block">
            {/* Line 1: "THE PALACE" with 3D Red Offset / Cutout Effect */}
            <div className="relative">
              {/* Red 3D Extrusion Shadow Layer */}
              <h2
                className="text-7xl font-anton italic tracking-tight uppercase text-[#ff0033] absolute -top-1.5 -left-1.5 select-none"
                style={{
                  fontFamily: "'Anton', sans-serif",
                }}
              >
                THE PALACE
              </h2>
              {/* White Forefront Text */}
              <h2
                className="text-7xl font-anton italic tracking-tight uppercase text-white relative z-10"
                style={{
                  fontFamily: "'Anton', sans-serif",
                  textShadow: '3px 3px 0px #000',
                }}
              >
                THE PALACE
              </h2>
            </div>

            {/* Line 2: "OF SHADOWS" */}
            <h2
              className="text-7xl font-anton italic tracking-tight uppercase text-white mt-[-8px] relative z-10"
              style={{
                fontFamily: "'Anton', sans-serif",
                textShadow: '4px 4px 0px #000',
              }}
            >
              OF SHADOWS
            </h2>
          </div>

          {/* Subtitle / distortion tags */}
          <div className="mt-4 flex items-center gap-3">
            <span className="bg-[#ff0033]/20 border border-[#ff0033] text-[#ff4d6d] text-xs font-mono px-3 py-1 -skew-x-12 tracking-wider">
              ALERT LEVEL: {protocol.securityLevel}%
            </span>
            <span className="bg-white/10 border border-white/20 text-neutral-300 text-xs font-mono px-3 py-1 -skew-x-12 tracking-wider">
              ROUTE: {protocol.completionPercent}% SECURED
            </span>
            <span className="text-xs font-mono text-neutral-400">
              TARGET: <strong className="text-white">{protocol.targetName}</strong>
            </span>
          </div>
        </div>

        {/* Bottom Bar matching screenshot exactly */}
        <div
          id="card-active-bottom-bar"
          className="relative bg-[#141418] border-t border-white/5 py-4 px-6 -mx-10 -mb-10 flex items-center justify-between z-10"
        >
          {/* Yellow vertical accent bar on left */}
          <div className="absolute left-0 top-0 bottom-0 w-2.5 bg-[#facc15]" />

          {/* Left Column: DUNGEON MASTER */}
          <div className="pl-4">
            <div className="text-[11px] font-mono tracking-widest text-neutral-400 uppercase font-semibold">
              DUNGEON MASTER
            </div>
            <div
              className="text-2xl font-anton italic tracking-wider text-[#ff0033] mt-0.5 uppercase"
              style={{ fontFamily: "'Anton', sans-serif" }}
            >
              {protocol.dungeonMaster}
            </div>
          </div>

          {/* Right Column: NEXT SESSION */}
          <div className="text-right">
            <div className="text-[11px] font-mono tracking-widest text-neutral-400 uppercase font-semibold">
              NEXT SESSION
            </div>
            <div
              className="text-2xl font-anton italic tracking-wider text-white mt-0.5 uppercase"
              style={{ fontFamily: "'Anton', sans-serif" }}
            >
              {protocol.nextSession}
            </div>
          </div>
        </div>

        {/* Interactive hover quick-action strip */}
        <div className="absolute top-6 right-20 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
          <button
            onClick={handleCardClick}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#ff0033] hover:bg-white text-black font-bebas text-sm tracking-wider -skew-x-12 transition-colors cursor-pointer shadow-lg"
          >
            <Send size={14} className="skew-x-12" />
            <span className="skew-x-12 font-bold">SEND CALLING CARD</span>
          </button>
        </div>
      </div>
    </div>
  );
};
