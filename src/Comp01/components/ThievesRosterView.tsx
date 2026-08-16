import React, { useState } from 'react';
import { Shield, Zap, Flame, Snowflake, Skull, Sparkles, Heart } from 'lucide-react';
import { INITIAL_PARTY } from '../data/initialProtocols';
import { PartyMember } from '../types';
import { sound } from '../utils/audio';

interface ThievesRosterViewProps {
  onBackToDeck: () => void;
}

export const ThievesRosterView: React.FC<ThievesRosterViewProps> = ({ onBackToDeck }) => {
  const [selectedMember, setSelectedMember] = useState<PartyMember>(INITIAL_PARTY[0]);

  const handleSelect = (member: PartyMember) => {
    sound.playClick();
    setSelectedMember(member);
  };

  return (
    <div
      id="screen-thieves-roster-view"
      className="w-full h-[992px] px-16 py-8 flex flex-col justify-between select-none relative z-10"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b-2 border-white/20 pb-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-[#ff0033] text-black font-anton italic text-sm -skew-x-12">
              COGNITIVE COMBATANTS
            </span>
            <span className="text-xs font-mono text-neutral-400">
              PHANTOM THIEVES ACTIVE REGISTRY
            </span>
          </div>
          <h1
            className="text-5xl font-anton italic uppercase tracking-wider text-white mt-1"
            style={{ fontFamily: "'Anton', sans-serif", textShadow: '3px 3px 0px #ff0033' }}
          >
            THIEVES ROSTER & PERSONAS
          </h1>
        </div>

        <button
          onClick={onBackToDeck}
          className="px-6 py-2 bg-white hover:bg-[#ff0033] text-black hover:text-white font-anton italic text-base tracking-wider -skew-x-12 transition-all cursor-pointer shadow-[4px_4px_0px_#000]"
        >
          <span className="skew-x-12">BACK TO COMMAND DECK</span>
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-12 gap-8 my-auto">
        {/* Member Selector List (Left 4 cols) */}
        <div className="col-span-4 space-y-3">
          <div className="text-xs font-mono tracking-widest text-neutral-400 uppercase font-bold mb-2">
            SELECT INFILTRATOR
          </div>

          {INITIAL_PARTY.map((member) => (
            <div
              key={member.id}
              onClick={() => handleSelect(member)}
              className={`p-4 transition-all cursor-pointer border flex items-center justify-between -skew-x-6 ${
                selectedMember.id === member.id
                  ? 'bg-[#ff0033] text-black border-white shadow-[6px_6px_0px_#fff]'
                  : 'bg-black/60 border-white/15 text-white hover:border-[#ff0033]'
              }`}
            >
              <div className="skew-x-6 flex items-center gap-3">
                <span className="text-2xl">{member.avatarText}</span>
                <div>
                  <div className="font-anton italic text-xl tracking-wider">
                    {member.codeName}
                  </div>
                  <div className="text-xs font-mono opacity-80">{member.name}</div>
                </div>
              </div>

              <div className="skew-x-6 text-right">
                <div className="text-xs font-mono font-bold uppercase">{member.arcana}</div>
                <div className="text-[10px] font-mono opacity-70">LVL 54</div>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Member Detailed Card (Right 8 cols) */}
        <div className="col-span-8 bg-[#121216] border-2 border-white/20 p-8 relative flex flex-col justify-between shadow-2xl">
          <div className="absolute top-0 left-0 right-0 h-3 bg-[#ff0033]" />

          {/* Top Banner with Persona Arcana */}
          <div>
            <div className="flex items-start justify-between border-b border-white/10 pb-4">
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{selectedMember.avatarText}</span>
                  <div>
                    <h2 className="text-5xl font-anton italic uppercase tracking-wider text-white">
                      {selectedMember.codeName}
                    </h2>
                    <p className="text-sm font-mono text-neutral-400">
                      TRUE IDENTITY: <strong className="text-white">{selectedMember.name}</strong> // ARCANA: <strong className="text-[#ff4d6d]">{selectedMember.arcana}</strong>
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-black/60 border border-white/20 px-5 py-2 -skew-x-12">
                <span className="skew-x-12 font-anton italic text-xl text-[#ff0033] uppercase">
                  {selectedMember.role}
                </span>
              </div>
            </div>

            {/* Persona & Vitals */}
            <div className="grid grid-cols-2 gap-6 mt-6">
              {/* Persona Profile */}
              <div className="bg-black/60 border border-white/10 p-5">
                <div className="text-xs font-mono tracking-widest text-neutral-400 uppercase font-bold mb-1">
                  MAIN PERSONA MANIFESTATION
                </div>
                <div className="text-2xl font-anton italic text-white tracking-wide">
                  {selectedMember.persona}
                </div>
                <div className="mt-4 space-y-2 text-xs font-mono">
                  <div className="flex justify-between border-b border-white/5 pb-1">
                    <span className="text-neutral-500">SIGNATURE ELEMENT:</span>
                    <span className="text-[#ff4d6d] font-bold">ALMIGHTY / CURSE</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-1">
                    <span className="text-neutral-500">EQUIPPED WEAPON:</span>
                    <span className="text-white">Paradise Lost 50 (Dagger)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">GUN:</span>
                    <span className="text-white">Tyrant Pistol (Custom Revolver)</span>
                  </div>
                </div>
              </div>

              {/* HP & SP Meters */}
              <div className="bg-black/60 border border-white/10 p-5 space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1 font-bold">
                    <span className="text-[#22c55e]">HP (HEALTH POINTS)</span>
                    <span className="text-white">{selectedMember.hp} / {selectedMember.maxHp}</span>
                  </div>
                  <div className="w-full h-3 bg-black border border-white/20 p-0.5">
                    <div
                      className="h-full bg-[#22c55e]"
                      style={{ width: `${(selectedMember.hp / selectedMember.maxHp) * 100}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1 font-bold">
                    <span className="text-[#3b82f6]">SP (SPIRIT POINTS)</span>
                    <span className="text-white">{selectedMember.sp} / {selectedMember.maxSp}</span>
                  </div>
                  <div className="w-full h-3 bg-black border border-white/20 p-0.5">
                    <div
                      className="h-full bg-[#3b82f6]"
                      style={{ width: `${(selectedMember.sp / selectedMember.maxSp) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Persona Combat Affinity Grid */}
          <div className="mt-6 pt-4 border-t border-white/10">
            <div className="text-xs font-mono tracking-widest text-neutral-400 uppercase font-bold mb-3">
              ELEMENTAL AFFINITIES & RESISTANCES
            </div>
            <div className="grid grid-cols-6 gap-2 text-center text-xs font-mono">
              <div className="bg-black/50 border border-white/10 p-2">
                <span className="text-neutral-500 block text-[10px]">PHYS</span>
                <span className="text-white font-bold">-</span>
              </div>
              <div className="bg-black/50 border border-white/10 p-2">
                <span className="text-neutral-500 block text-[10px]">FIRE</span>
                <span className="text-[#ff4d6d] font-bold">STR</span>
              </div>
              <div className="bg-black/50 border border-white/10 p-2">
                <span className="text-neutral-500 block text-[10px]">ICE</span>
                <span className="text-[#3b82f6] font-bold">-</span>
              </div>
              <div className="bg-black/50 border border-white/10 p-2">
                <span className="text-neutral-500 block text-[10px]">ELEC</span>
                <span className="text-[#facc15] font-bold">RES</span>
              </div>
              <div className="bg-black/50 border border-white/10 p-2">
                <span className="text-neutral-500 block text-[10px]">BLESS</span>
                <span className="text-neutral-400 font-bold">WK</span>
              </div>
              <div className="bg-black/50 border border-[#ff0033]/40 p-2 bg-[#ff0033]/10">
                <span className="text-[#ff4d6d] block text-[10px]">CURSE</span>
                <span className="text-[#ff0033] font-bold">NUL</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
