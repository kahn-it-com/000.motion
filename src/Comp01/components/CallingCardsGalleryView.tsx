import React from 'react';
import { Send, CheckCircle2, Flame, Sparkles } from 'lucide-react';
import { Protocol } from '../types';
import { sound } from '../utils/audio';

interface CallingCardsGalleryViewProps {
  protocols: Protocol[];
  onOpenCallingCard: (protocol?: Protocol) => void;
  onBackToDeck: () => void;
}

export const CallingCardsGalleryView: React.FC<CallingCardsGalleryViewProps> = ({
  protocols,
  onOpenCallingCard,
  onBackToDeck,
}) => {
  return (
    <div
      id="screen-calling-cards-gallery"
      className="w-full h-[992px] px-16 py-8 flex flex-col justify-between select-none relative z-10"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b-2 border-white/20 pb-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-[#ff0033] text-black font-anton italic text-sm -skew-x-12">
              DISPATCH ARCHIVE
            </span>
            <span className="text-xs font-mono text-neutral-400">
              OFFICIAL PHANTOM THIEVES CALLING CARD REGISTRY
            </span>
          </div>
          <h1
            className="text-5xl font-anton italic uppercase tracking-wider text-white mt-1"
            style={{ fontFamily: "'Anton', sans-serif", textShadow: '3px 3px 0px #ff0033' }}
          >
            NOTICES OF CONVICTION
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              sound.playDramaticHit();
              onOpenCallingCard();
            }}
            className="px-6 py-2 bg-[#ff0033] hover:bg-white text-black font-anton italic text-base tracking-wider -skew-x-12 transition-all cursor-pointer shadow-[4px_4px_0px_#fff]"
          >
            <span className="skew-x-12">+ FORGE NEW CALLING CARD</span>
          </button>

          <button
            onClick={onBackToDeck}
            className="px-6 py-2 bg-white hover:bg-[#ff0033] text-black hover:text-white font-anton italic text-base tracking-wider -skew-x-12 transition-all cursor-pointer shadow-[4px_4px_0px_#000]"
          >
            <span className="skew-x-12">BACK TO COMMAND DECK</span>
          </button>
        </div>
      </div>

      {/* Grid of Calling Cards */}
      <div className="grid grid-cols-3 gap-8 my-auto overflow-y-auto max-h-[750px] p-2">
        {protocols
          .filter((p) => p.callingCardMessage)
          .map((prot) => (
            <div
              key={prot.id}
              className="bg-[#d81e28] text-black p-6 border-2 border-black -rotate-1 relative overflow-hidden shadow-[8px_8px_0px_#000] bg-halftone-red flex flex-col justify-between min-h-[320px]"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between border-b-2 border-black pb-2 mb-3">
                  <div className="bg-black text-white px-2 py-0.5 font-anton text-lg -rotate-2">
                    TO: {prot.targetName.toUpperCase()}
                  </div>
                  <span className="text-xl">🎭</span>
                </div>

                {/* Body */}
                <div className="bg-white/95 text-black p-4 border border-black font-mono text-xs leading-relaxed shadow-sm">
                  "{prot.callingCardMessage}"
                </div>
              </div>

              {/* Footer */}
              <div className="mt-4 pt-2 border-t-2 border-black flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-black/80">
                  STATUS: {prot.callingCardSent ? 'CONFESSION SECURED' : 'PENDING STRIKE'}
                </span>
                <span className="font-anton italic text-sm text-black uppercase">
                  THE PHANTOM THIEVES
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
