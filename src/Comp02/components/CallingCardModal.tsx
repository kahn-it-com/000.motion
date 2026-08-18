import React, { useState } from 'react';
import { X, Send, Sparkles, Flame, Check, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Protocol } from '../types';
import { sound } from '../utils/audio';

interface CallingCardModalProps {
  protocol?: Protocol | null;
  onClose: () => void;
  onSent: (protocolId: string, message: string) => void;
}

export const CallingCardModal: React.FC<CallingCardModalProps> = ({
  protocol,
  onClose,
  onSent,
}) => {
  const [targetName, setTargetName] = useState(
    protocol ? protocol.targetName : 'Cognitive Ruler of Shibuya'
  );
  const [targetSin, setTargetSin] = useState(
    protocol ? protocol.distortion : 'Abusing authority and crushing human hopes'
  );
  const [customBody, setCustomBody] = useState(
    protocol?.callingCardMessage ||
      `Sir ${protocol ? protocol.targetName : 'Corrupted Lord'}, the great sinner of vanity. You have long abused your position to oppress others for selfish greed. We shall make you confess all your crimes with your own mouth at the hour of revelation.`
  );
  const [isDispatched, setIsDispatched] = useState(false);

  const handleDispatch = () => {
    sound.playDramaticHit();
    setIsDispatched(true);

    confetti({
      particleCount: 180,
      spread: 120,
      origin: { y: 0.5 },
      colors: ['#ff0033', '#ffffff', '#000000', '#ffd700'],
    });

    setTimeout(() => {
      if (protocol) {
        onSent(protocol.id, customBody);
      }
      setTimeout(() => {
        onClose();
      }, 1200);
    }, 800);
  };

  return (
    <div
      id="modal-calling-card-backdrop"
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-8 select-none animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="modal-calling-card-window"
        className="relative w-[1180px] bg-[#0f0f13] border-4 border-[#ff0033] p-10 text-white shadow-[0_0_80px_rgba(255,0,51,0.5)] overflow-hidden"
        style={{
          clipPath: 'polygon(0 0, 100% 0, 98% 100%, 2% 100%)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="btn-close-calling-card"
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="absolute top-6 right-6 w-10 h-10 bg-white hover:bg-[#ff0033] text-black hover:text-white font-bold flex items-center justify-center -skew-x-12 transition-colors cursor-pointer z-30"
        >
          <X size={24} className="skew-x-12" />
        </button>

        {/* Modal Title Bar */}
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-[#ff0033] text-black px-6 py-2 font-anton italic text-2xl -skew-x-12 tracking-wider">
            <span className="skew-x-12">PHANTOM CALLING CARD</span>
          </div>
          <span className="text-xs font-mono text-neutral-400 tracking-widest uppercase">
            // WARNING NOTICE TO THE COGNITIVE RULER
          </span>
        </div>

        {/* The Authentic Persona 5 Calling Card Canvas Preview */}
        <div className="grid grid-cols-12 gap-8">
          {/* Card Preview (Left 7 cols) */}
          <div className="col-span-7">
            <div className="relative p-1 bg-white shadow-[10px_10px_0px_#000] -rotate-1">
              <div className="bg-[#d81e28] text-black p-8 relative overflow-hidden border-2 border-black min-h-[380px] flex flex-col justify-between bg-halftone-red">
                {/* Ransom Note Title Header */}
                <div>
                  <div className="flex items-center justify-between border-b-2 border-black pb-3">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="bg-black text-white px-2 py-1 font-anton text-xl -rotate-2">
                        TO:
                      </span>
                      <span className="bg-white text-black px-3 py-1 font-anton italic text-2xl rotate-1 shadow-sm">
                        {targetName.toUpperCase()}
                      </span>
                    </div>

                    {/* Phantom Thief Mask Stamp */}
                    <div className="w-12 h-12 rounded-full border-2 border-black bg-white/95 text-black flex items-center justify-center font-bold text-lg shadow-md -rotate-6">
                      🎭
                    </div>
                  </div>

                  {/* Calling Card Body Text */}
                  <div className="mt-6 bg-white/95 text-black p-5 border-2 border-black font-mono text-sm leading-relaxed shadow-[4px_4px_0px_#000]">
                    <p className="font-semibold">{customBody}</p>
                  </div>
                </div>

                {/* Card Signature Footer */}
                <div className="mt-6 flex items-end justify-between pt-4 border-t-2 border-black">
                  <div className="text-[10px] font-mono font-bold tracking-widest text-black/80">
                    DATE: AUGUST 2026 // SHIBUYA METAVERSE
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-mono font-bold uppercase block text-black/90">
                      DELIVERED BY:
                    </span>
                    <span
                      className="text-2xl font-anton italic tracking-wider text-black uppercase"
                      style={{ fontFamily: "'Anton', sans-serif" }}
                    >
                      THE PHANTOM THIEVES OF HEARTS
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form & Controls (Right 5 cols) */}
          <div className="col-span-5 space-y-4">
            <div>
              <label className="text-xs font-mono text-[#ff4d6d] uppercase font-bold block mb-1">
                TARGET PERSONA NAME:
              </label>
              <input
                type="text"
                value={targetName}
                onChange={(e) => setTargetName(e.target.value)}
                className="w-full bg-black border border-white/20 px-3 py-2 text-sm font-mono text-white focus:border-[#ff0033] focus:outline-none"
                placeholder="Target Name"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-[#ff4d6d] uppercase font-bold block mb-1">
                DISTORTION / SIN COMMITTED:
              </label>
              <input
                type="text"
                value={targetSin}
                onChange={(e) => setTargetSin(e.target.value)}
                className="w-full bg-black border border-white/20 px-3 py-2 text-sm font-mono text-white focus:border-[#ff0033] focus:outline-none"
                placeholder="Corruption or Crime"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-[#ff4d6d] uppercase font-bold block mb-1">
                CALLING CARD DECLARATION:
              </label>
              <textarea
                rows={4}
                value={customBody}
                onChange={(e) => setCustomBody(e.target.value)}
                className="w-full bg-black border border-white/20 p-3 text-xs font-mono text-white focus:border-[#ff0033] focus:outline-none resize-none"
                placeholder="Declare your terms of surrender..."
              />
            </div>

            {/* Dispatch Button */}
            <div className="pt-2">
              <button
                id="btn-dispatch-calling-card-execute"
                onClick={handleDispatch}
                disabled={isDispatched}
                className={`w-full py-4 font-anton italic text-2xl tracking-widest -skew-x-12 transition-all flex items-center justify-center gap-3 cursor-pointer shadow-[6px_6px_0px_#fff] ${
                  isDispatched
                    ? 'bg-[#22c55e] text-black'
                    : 'bg-[#ff0033] hover:bg-white text-black hover:text-[#ff0033]'
                }`}
              >
                {isDispatched ? (
                  <>
                    <Check size={24} className="skew-x-12" />
                    <span className="skew-x-12 font-black uppercase">
                      CALLING CARD DISPATCHED!
                    </span>
                  </>
                ) : (
                  <>
                    <Send size={24} className="skew-x-12" />
                    <span className="skew-x-12 font-black uppercase">
                      TRANSMIT TO METAVERSE
                    </span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
