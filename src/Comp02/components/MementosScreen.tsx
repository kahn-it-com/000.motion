import React, { useState } from 'react';
import { Compass, Sparkles, AlertTriangle, CheckCircle2, ChevronRight, Skull } from 'lucide-react';
import { Protocol } from '../types';
import { sound } from '../utils/audio';

interface MementosScreenProps {
  onBackToDeck: () => void;
  onSelectProtocol: (protocol: Protocol) => void;
}

export const MementosScreen: React.FC<MementosScreenProps> = ({ onBackToDeck, onSelectProtocol }) => {
  const [selectedArea, setSelectedArea] = useState<number>(4);
  const [flowersCollected, setFlowersCollected] = useState<number>(48);
  const [stampsFound, setStampsFound] = useState<number>(18);
  const [reaperWarning, setReaperWarning] = useState<boolean>(false);

  const areas = [
    { id: 1, name: 'Qimranut', floors: 'Floors 1-2', threat: 'Low', color: '#3b82f6', cleared: true },
    { id: 2, name: 'Aiyatsbus', floors: 'Floors 1-7', threat: 'Moderate', color: '#10b981', cleared: true },
    { id: 3, name: 'Chemdah', floors: 'Floors 1-8', threat: 'Substantial', color: '#f59e0b', cleared: true },
    { id: 4, name: 'Kaitul', floors: 'Floors 1-10', threat: 'HIGH ALERT', color: '#ef4444', cleared: false, active: true },
    { id: 5, name: 'Akzeriyyuth', floors: 'Floors 1-12', threat: 'EXTREME', color: '#8b5cf6', cleared: false },
    { id: 6, name: 'Sheriruth', floors: 'Floors 1-14', threat: 'DEADLY', color: '#ec4899', cleared: false },
  ];

  const handleAreaClick = (areaId: number) => {
    sound.playClick();
    setSelectedArea(areaId);
    if (areaId >= 4) {
      setReaperWarning(true);
    } else {
      setReaperWarning(false);
    }
  };

  const handleCollectFlower = () => {
    sound.playChime();
    setFlowersCollected((prev) => prev + 5);
  };

  const handleStampFound = () => {
    sound.playDramaticHit();
    setStampsFound((prev) => prev + 1);
  };

  return (
    <div
      id="screen-mementos-view"
      className="w-full h-[992px] px-16 py-8 flex flex-col justify-between select-none relative z-10"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b-2 border-white/20 pb-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-[#ff0033] text-black font-anton italic text-sm -skew-x-12">
              DEEP SUBCONSCIOUS EXTRACTION
            </span>
            <span className="text-xs font-mono text-neutral-400">
              VEHICLE: MORGANA BUS (ACTIVE)
            </span>
          </div>
          <h1
            className="text-5xl font-anton italic uppercase tracking-wider text-white mt-1"
            style={{ fontFamily: "'Anton', sans-serif", textShadow: '3px 3px 0px #ff0033' }}
          >
            MEMENTOS METRO SYSTEM
          </h1>
        </div>

        {/* Jose's Cognition Bank */}
        <div className="flex items-center gap-6 bg-black/60 border border-white/20 px-6 py-3 -skew-x-12">
          <div className="skew-x-12 flex items-center gap-2">
            <Sparkles size={18} className="text-[#facc15]" />
            <span className="text-xs font-mono text-neutral-300">FLOWERS:</span>
            <span className="font-anton italic text-2xl text-[#facc15]">{flowersCollected}</span>
            <button
              onClick={handleCollectFlower}
              className="ml-2 px-2 py-0.5 bg-[#facc15] text-black font-bold text-xs hover:bg-white transition-colors cursor-pointer"
            >
              +5
            </button>
          </div>

          <div className="h-6 w-px bg-white/20" />

          <div className="skew-x-12 flex items-center gap-2">
            <span className="text-xs font-mono text-neutral-300">JOSE STAMPS:</span>
            <span className="font-anton italic text-2xl text-[#ff0033]">{stampsFound} / 40</span>
            <button
              onClick={handleStampFound}
              className="ml-2 px-2 py-0.5 bg-[#ff0033] text-white font-bold text-xs hover:bg-white hover:text-black transition-colors cursor-pointer"
            >
              +1 STAMP
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-12 gap-8 my-auto">
        {/* Subway Floor Lineup (Left 5 cols) */}
        <div className="col-span-5 space-y-3">
          <div className="text-xs font-mono tracking-widest text-neutral-400 uppercase font-bold mb-2">
            SUBTERRANEAN TUNNEL AREAS
          </div>

          {areas.map((area) => (
            <div
              key={area.id}
              onClick={() => handleAreaClick(area.id)}
              className={`p-4 transition-all cursor-pointer border flex items-center justify-between -skew-x-6 ${
                selectedArea === area.id
                  ? 'bg-[#ff0033] text-black border-white shadow-[6px_6px_0px_#fff]'
                  : 'bg-black/60 border-white/15 text-white hover:border-[#ff0033]'
              }`}
            >
              <div className="skew-x-6">
                <div className="flex items-center gap-2">
                  <span className="font-anton italic text-2xl tracking-wider uppercase">
                    AREA {area.id}: {area.name}
                  </span>
                  {area.cleared && (
                    <CheckCircle2 size={16} className={selectedArea === area.id ? 'text-black' : 'text-[#22c55e]'} />
                  )}
                </div>
                <div className="text-xs font-mono mt-0.5 opacity-80">
                  {area.floors} // THREAT: {area.threat}
                </div>
              </div>

              <ChevronRight size={22} className="skew-x-6" />
            </div>
          ))}
        </div>

        {/* Selected Area Intel & Reaper Radar (Right 7 cols) */}
        <div className="col-span-7 bg-[#121216] border-2 border-white/20 p-8 relative flex flex-col justify-between">
          <div className="absolute top-0 left-0 right-0 h-2 bg-[#ff0033]" />

          <div>
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-xs font-mono text-[#ff4d6d] uppercase font-bold">
                  ACTIVE EXPLORATION ZONE
                </span>
                <h2 className="text-4xl font-anton italic uppercase tracking-wider text-white mt-1">
                  KAITUL AREA // FLOOR 14
                </h2>
              </div>

              {/* Reaper Warning Badge */}
              {reaperWarning && (
                <div className="flex items-center gap-2 px-4 py-2 bg-[#ff0033] text-black font-anton italic text-base -skew-x-12 animate-pulse">
                  <Skull size={20} className="skew-x-12" />
                  <span className="skew-x-12 font-black">REAPER DETECTED IN SECTOR</span>
                </div>
              )}
            </div>

            {/* Target Shadows in this Area */}
            <div className="mt-6 space-y-3">
              <div className="text-xs font-mono tracking-widest text-neutral-400 uppercase font-bold">
                ACTIVE TARGET SHADOW REQUESTS
              </div>

              <div className="p-4 bg-black/60 border border-white/10 flex items-center justify-between">
                <div>
                  <div className="font-anton italic text-xl text-white">
                    "THE CHEATING EX-BOSS" (SHADOW NAGAI)
                  </div>
                  <div className="text-xs font-mono text-neutral-400">
                    Floor 4 Waiting Area // Weakness: Nuclear & Bless
                  </div>
                </div>
                <span className="px-3 py-1 bg-[#22c55e]/20 border border-[#22c55e] text-[#22c55e] text-xs font-mono">
                  READY TO STRIKE
                </span>
              </div>

              <div className="p-4 bg-black/60 border border-white/10 flex items-center justify-between">
                <div>
                  <div className="font-anton italic text-xl text-white">
                    "STALKER OF THE SHOPPING MALL" (SHADOW TSURUTA)
                  </div>
                  <div className="text-xs font-mono text-neutral-400">
                    Floor 8 Rest Area // Weakness: Electric & Psi
                  </div>
                </div>
                <span className="px-3 py-1 bg-[#facc15]/20 border border-[#facc15] text-[#facc15] text-xs font-mono">
                  TRACKING TARGET
                </span>
              </div>
            </div>
          </div>

          {/* Footer Action */}
          <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs font-mono text-neutral-400">
              EXPEDITION LEAD: <strong>MORGANNA (VAN FORM)</strong>
            </span>

            <button
              onClick={onBackToDeck}
              className="px-6 py-2.5 bg-[#ff0033] hover:bg-white text-black font-anton italic text-lg tracking-wider -skew-x-12 transition-all cursor-pointer shadow-[4px_4px_0px_#fff]"
            >
              <span className="skew-x-12">RETURN TO COMMAND DECK</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
