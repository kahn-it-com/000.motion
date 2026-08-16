import React from 'react';
import { Shield, Sparkles, Plus, Skull, Send, Users, Compass, Calendar, Flame, Volume2, VolumeX } from 'lucide-react';
import { ActiveTab } from '../types';
import { sound } from '../utils/audio';

interface TopNavProps {
  currentTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  onOpenNewProtocol: () => void;
  onOpenCallingCard: () => void;
  activeCount: number;
  soundEnabled?: boolean;
  onToggleSound?: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  currentTab,
  onSelectTab,
  onOpenNewProtocol,
  onOpenCallingCard,
  activeCount,
  soundEnabled = true,
  onToggleSound,
}) => {
  const handleTabClick = (tab: ActiveTab) => {
    sound.playClick();
    onSelectTab(tab);
  };

  return (
    <header
      id="metaverse-top-nav"
      className="relative z-30 w-full h-[88px] px-12 flex items-center justify-between border-b border-black/40 bg-black/40 backdrop-blur-sm select-none"
    >
      {/* Left Brand Identity with Persona Angle */}
      <div className="flex items-center gap-6">
        {/* Phantom Thieves Mask Emblem */}
        <div
          onClick={() => handleTabClick('deck')}
          className="group flex items-center gap-3 cursor-pointer"
        >
          <div className="w-12 h-12 bg-[#ff0033] text-black flex items-center justify-center font-anton text-2xl -skew-x-12 shadow-[4px_4px_0px_#fff] group-hover:bg-white group-hover:text-[#ff0033] group-hover:shadow-[4px_4px_0px_#ff0033] transition-all">
            <span className="skew-x-12 font-black">P5</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-anton italic text-2xl tracking-wider text-white uppercase">
                METAVERSE PROTOCOL
              </span>
              <span className="px-2 py-0.5 bg-[#ff0033] text-black font-anton italic text-xs -skew-x-12">
                REV 5.0
              </span>
            </div>
            <div className="text-[10px] font-mono tracking-widest text-neutral-400">
              PHANTOM THIEVES TACTICAL COMMAND DECK // 1920×1080
            </div>
          </div>
        </div>

        {/* Status Indicator */}
        <div className="hidden xl:flex items-center gap-3 pl-6 border-l border-white/10 text-xs font-mono">
          <div className="flex items-center gap-1.5 text-[#22c55e]">
            <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-ping" />
            <span className="font-bold">COGNITIVE SYNC 99.4%</span>
          </div>
          <span className="text-neutral-600">|</span>
          <div className="text-neutral-400">
            WEATHER: <span className="text-[#ff0033] font-bold">POLLEN WARNING (SHADOWS AGGRESSIVE)</span>
          </div>
        </div>
      </div>

      {/* Center Nav Buttons / Screens */}
      <nav className="flex items-center gap-2">
        <button
          id="nav-tab-deck"
          onClick={() => handleTabClick('deck')}
          className={`relative px-5 py-2 font-anton italic text-lg tracking-wider -skew-x-12 transition-all cursor-pointer ${
            currentTab === 'deck'
              ? 'bg-[#ff0033] text-black shadow-[4px_4px_0px_#fff]'
              : 'bg-black/60 border border-white/20 text-neutral-300 hover:text-white hover:border-[#ff0033]'
          }`}
        >
          <span className="inline-flex items-center gap-1.5 skew-x-12">
            <Flame size={16} />
            <span>COMMAND DECK</span>
          </span>
        </button>

        <button
          id="nav-tab-mementos"
          onClick={() => handleTabClick('mementos')}
          className={`relative px-5 py-2 font-anton italic text-lg tracking-wider -skew-x-12 transition-all cursor-pointer ${
            currentTab === 'mementos'
              ? 'bg-[#ff0033] text-black shadow-[4px_4px_0px_#fff]'
              : 'bg-black/60 border border-white/20 text-neutral-300 hover:text-white hover:border-[#ff0033]'
          }`}
        >
          <span className="inline-flex items-center gap-1.5 skew-x-12">
            <Compass size={16} />
            <span>MEMENTOS</span>
          </span>
        </button>

        <button
          id="nav-tab-roster"
          onClick={() => handleTabClick('roster')}
          className={`relative px-5 py-2 font-anton italic text-lg tracking-wider -skew-x-12 transition-all cursor-pointer ${
            currentTab === 'roster'
              ? 'bg-[#ff0033] text-black shadow-[4px_4px_0px_#fff]'
              : 'bg-black/60 border border-white/20 text-neutral-300 hover:text-white hover:border-[#ff0033]'
          }`}
        >
          <span className="inline-flex items-center gap-1.5 skew-x-12">
            <Users size={16} />
            <span>THIEVES ROSTER</span>
          </span>
        </button>

        <button
          id="nav-tab-cards"
          onClick={() => handleTabClick('calling_cards')}
          className={`relative px-5 py-2 font-anton italic text-lg tracking-wider -skew-x-12 transition-all cursor-pointer ${
            currentTab === 'calling_cards'
              ? 'bg-[#ff0033] text-black shadow-[4px_4px_0px_#fff]'
              : 'bg-black/60 border border-white/20 text-neutral-300 hover:text-white hover:border-[#ff0033]'
          }`}
        >
          <span className="inline-flex items-center gap-1.5 skew-x-12">
            <Send size={16} />
            <span>CALLING CARDS</span>
          </span>
        </button>
      </nav>

      {/* Right Action Trigger Buttons */}
      <div className="flex items-center gap-4">
        {onToggleSound && (
          <button
            id="btn-nav-toggle-sound"
            onClick={() => {
              onToggleSound();
              sound.playClick();
            }}
            className={`p-2 font-anton -skew-x-12 transition-all cursor-pointer shadow-[2px_2px_0px_#000] ${
              soundEnabled
                ? 'bg-[#ff0033] text-black hover:bg-white hover:text-black'
                : 'bg-black/60 border border-white/20 text-neutral-400 hover:text-white'
            }`}
            title={soundEnabled ? 'Mute Sound FX' : 'Enable Sound FX'}
          >
            <span className="block skew-x-12">
              {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
            </span>
          </button>
        )}

        <button
          id="btn-nav-send-card"
          onClick={() => {
            sound.playDramaticHit();
            onOpenCallingCard();
          }}
          className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-[#ff0033] text-black hover:text-white font-anton italic text-base tracking-wider -skew-x-12 transition-all shadow-[4px_4px_0px_#000] cursor-pointer"
        >
          <Send size={16} className="skew-x-12" />
          <span className="skew-x-12 uppercase">POST CALLING CARD</span>
        </button>

        <button
          id="btn-nav-new-protocol"
          onClick={() => {
            sound.playClick();
            onOpenNewProtocol();
          }}
          className="flex items-center gap-2 px-5 py-2 bg-[#ff0033] hover:bg-white text-black font-anton italic text-base tracking-wider -skew-x-12 transition-all shadow-[4px_4px_0px_#fff] cursor-pointer"
        >
          <Plus size={18} className="skew-x-12 stroke-[3]" />
          <span className="skew-x-12 uppercase">NEW PROTOCOL</span>
        </button>
      </div>
    </header>
  );
};
