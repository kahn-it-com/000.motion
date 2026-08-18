import React, { useState } from 'react';
import { ActiveProtocolCard } from './ActiveProtocolCard';
import { DeepRunCard } from './DeepRunCard';
import { ArchivedCard } from './ArchivedCard';
import { Protocol } from '../types';
import { sound } from '../utils/audio';
import { ChevronLeft, ChevronRight, Filter } from 'lucide-react';

interface CommandDeckViewProps {
  protocols: Protocol[];
  onSelectProtocol: (protocol: Protocol) => void;
  onOpenCallingCard: (protocol: Protocol) => void;
}

export const CommandDeckView: React.FC<CommandDeckViewProps> = ({
  protocols,
  onSelectProtocol,
  onOpenCallingCard,
}) => {
  // Find primary active, deep_run, and archived protocols
  const activeProtocols = protocols.filter((p) => p.category === 'active');
  const deepRunProtocols = protocols.filter((p) => p.category === 'deep_run');
  const archivedProtocols = protocols.filter((p) => p.category === 'archived');

  const [activeIdx, setActiveIdx] = useState(0);
  const [deepRunIdx, setDeepRunIdx] = useState(0);
  const [archivedIdx, setArchivedIdx] = useState(0);

  const currentActive = activeProtocols[activeIdx] || activeProtocols[0] || protocols[0];
  const currentDeepRun = deepRunProtocols[deepRunIdx] || deepRunProtocols[0] || protocols[1];
  const currentArchived = archivedProtocols[archivedIdx] || archivedProtocols[0] || protocols[2];

  const handleNextActive = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playClick();
    setActiveIdx((prev) => (prev + 1) % activeProtocols.length);
  };

  const handlePrevActive = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playClick();
    setActiveIdx((prev) => (prev - 1 + activeProtocols.length) % activeProtocols.length);
  };

  const handleNextArchived = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playClick();
    setArchivedIdx((prev) => (prev + 1) % archivedProtocols.length);
  };

  return (
    <div
      id="screen-command-deck-view"
      className="w-full h-[992px] px-20 flex items-center justify-between relative z-10 select-none"
    >
      {/* Left Area: Main Large Active Protocol Card */}
      <div className="relative flex flex-col justify-center">
        {/* Active mission switcher (if multiple exist) */}
        {activeProtocols.length > 1 && (
          <div className="absolute -top-10 left-4 z-20 flex items-center gap-2">
            <button
              onClick={handlePrevActive}
              className="p-1 bg-black/70 border border-white/20 text-white hover:bg-[#ff0033] hover:text-black transition-colors cursor-pointer"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="text-xs font-mono text-white/80">
              MISSION {activeIdx + 1} / {activeProtocols.length}
            </span>
            <button
              onClick={handleNextActive}
              className="p-1 bg-black/70 border border-white/20 text-white hover:bg-[#ff0033] hover:text-black transition-colors cursor-pointer"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}

        {/* The Main Active Card from screenshot */}
        {currentActive && (
          <ActiveProtocolCard
            protocol={currentActive}
            onSelect={onSelectProtocol}
            onOpenCallingCard={onOpenCallingCard}
          />
        )}
      </div>

      {/* Right Area: Stacked Deep Run (Top) and Archived (Bottom) Cards */}
      <div className="flex flex-col justify-center gap-10">
        {/* Top Right Card: Deep Run (MEMENTOS RUN) */}
        {currentDeepRun && (
          <DeepRunCard
            protocol={currentDeepRun}
            onSelect={onSelectProtocol}
          />
        )}

        {/* Bottom Right Card: Archived (KAMOSHIDA'S END / Others) */}
        <div className="relative">
          {archivedProtocols.length > 1 && (
            <div className="absolute -top-7 right-4 z-20 flex items-center gap-2">
              <span className="text-[11px] font-mono text-neutral-400">
                ARCHIVE {archivedIdx + 1}/{archivedProtocols.length}
              </span>
              <button
                onClick={handleNextArchived}
                className="px-2 py-0.5 bg-black/70 border border-white/20 text-white hover:bg-[#ff0033] text-xs font-mono transition-colors cursor-pointer"
              >
                NEXT ARCHIVE »
              </button>
            </div>
          )}

          {currentArchived && (
            <ArchivedCard
              protocol={currentArchived}
              onSelect={onSelectProtocol}
            />
          )}
        </div>
      </div>
    </div>
  );
};
