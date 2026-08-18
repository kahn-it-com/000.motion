import React, { useState } from 'react';
import { X, ShieldAlert, CheckCircle2, Circle, Send, Calendar, User, Skull, Sparkles, MapPin, Target, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Protocol } from '../types';
import { sound } from '../utils/audio';

interface ProtocolDetailModalProps {
  protocol: Protocol;
  onClose: () => void;
  onUpdate: (updated: Protocol) => void;
  onOpenCallingCard: (protocol: Protocol) => void;
}

export const ProtocolDetailModal: React.FC<ProtocolDetailModalProps> = ({
  protocol,
  onClose,
  onUpdate,
  onOpenCallingCard,
}) => {
  const [securityLevel, setSecurityLevel] = useState(protocol.securityLevel);
  const [completionPercent, setCompletionPercent] = useState(protocol.completionPercent);
  const [objectives, setObjectives] = useState(protocol.objectives);
  const [dungeonMaster, setDungeonMaster] = useState(protocol.dungeonMaster);
  const [nextSession, setNextSession] = useState(protocol.nextSession);

  const toggleObjective = (id: string) => {
    const updated = objectives.map((obj) => {
      if (obj.id === id) {
        const nextState = !obj.completed;
        if (nextState) sound.playChime();
        else sound.playClick();
        return { ...obj, completed: nextState };
      }
      return obj;
    });
    setObjectives(updated);

    const completedCount = updated.filter((o) => o.completed).length;
    const calcPercent = Math.round((completedCount / updated.length) * 100);
    setCompletionPercent(calcPercent);

    onUpdate({
      ...protocol,
      objectives: updated,
      completionPercent: calcPercent,
      completion: calcPercent === 100 ? '100% CLEAR' : `${calcPercent}% INFILTRATED`,
      status: calcPercent === 100 ? '100% CLEAR' : protocol.status,
    });
  };

  const handleSecurityChange = (val: number) => {
    setSecurityLevel(val);
    if (val >= 80) sound.playAlert();
    onUpdate({ ...protocol, securityLevel: val });
  };

  const handleMarkClear = () => {
    sound.playDramaticHit();
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#ff0033', '#ffffff', '#ffd700', '#000000'],
    });

    const updatedObjectives = objectives.map((o) => ({ ...o, completed: true }));
    setObjectives(updatedObjectives);
    setCompletionPercent(100);

    onUpdate({
      ...protocol,
      category: 'archived',
      status: '100% CLEAR',
      completion: '100% CLEAR',
      completionPercent: 100,
      securityLevel: 0,
      objectives: updatedObjectives,
    });
  };

  const handleSaveSession = (newDM: string, newTime: string) => {
    setDungeonMaster(newDM);
    setNextSession(newTime);
    onUpdate({
      ...protocol,
      dungeonMaster: newDM,
      nextSession: newTime,
    });
    sound.playClick();
  };

  return (
    <div
      id="modal-protocol-detail-backdrop"
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-8 select-none animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Modal Container with Persona Slanted Red/Black Framing */}
      <div
        id="modal-protocol-detail-window"
        className="relative w-[1240px] max-h-[920px] bg-[#0d0d10] border-2 border-white/20 text-white p-10 shadow-[0_0_60px_rgba(255,0,51,0.3)] overflow-hidden"
        style={{
          clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Slanted Accent Strip */}
        <div className="absolute top-0 left-0 right-0 h-3 bg-[#ff0033]" />

        {/* Close Button */}
        <button
          id="btn-close-protocol-detail"
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="absolute top-6 right-8 w-10 h-10 bg-white hover:bg-[#ff0033] text-black hover:text-white font-bold flex items-center justify-center -skew-x-12 transition-colors cursor-pointer z-30"
        >
          <X size={24} className="skew-x-12" />
        </button>

        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-[#ff0033] text-black font-anton italic text-sm -skew-x-12">
                TACTICAL PROTOCOL // {protocol.category.toUpperCase()}
              </span>
              <span className="text-xs font-mono text-neutral-400">ID: {protocol.id}</span>
            </div>

            <h1
              className="text-5xl font-anton italic uppercase tracking-wider text-white mt-2"
              style={{ fontFamily: "'Anton', sans-serif", textShadow: '3px 3px 0px #ff0033' }}
            >
              {protocol.title}
            </h1>
            <p className="text-sm font-mono text-[#ff4d6d] mt-1">{protocol.subtitle}</p>
          </div>

          <div className="flex items-center gap-3 pr-14">
            <button
              id="btn-mark-100-clear"
              onClick={handleMarkClear}
              className="flex items-center gap-2 px-4 py-2.5 bg-[#22c55e] hover:bg-white text-black font-anton italic text-base tracking-wider -skew-x-12 transition-colors cursor-pointer shadow-lg"
            >
              <CheckCircle2 size={18} className="skew-x-12" />
              <span className="skew-x-12 font-bold">FORCE 100% CLEAR</span>
            </button>

            <button
              id="btn-modal-send-calling-card"
              onClick={() => {
                sound.playDramaticHit();
                onOpenCallingCard(protocol);
              }}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#ff0033] hover:bg-white text-black font-anton italic text-base tracking-wider -skew-x-12 transition-colors cursor-pointer shadow-lg"
            >
              <Send size={18} className="skew-x-12" />
              <span className="skew-x-12 font-bold">SEND CALLING CARD</span>
            </button>
          </div>
        </div>

        {/* 2-Column Tactical Body */}
        <div className="grid grid-cols-12 gap-8 mt-6">
          {/* Left Column (Stats, Security Level, Target) - 7 cols */}
          <div className="col-span-7 space-y-6">
            {/* Target & Distortion Info Box */}
            <div className="bg-[#15151a] p-6 border-l-4 border-[#ff0033] relative">
              <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#ff4d6d] uppercase font-bold">
                <Target size={16} />
                <span>COGNITIVE TARGET & DISTORTION</span>
              </div>
              <div className="text-2xl font-anton italic tracking-wide text-white mt-1">
                {protocol.targetName}
              </div>
              <div className="grid grid-cols-2 gap-4 mt-3 text-xs font-mono">
                <div>
                  <span className="text-neutral-500 block">PALACE ARCHETYPE:</span>
                  <span className="text-neutral-200">{protocol.palaceType}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block">LOCATION:</span>
                  <span className="text-neutral-200">{protocol.location}</span>
                </div>
              </div>
              <div className="mt-3 text-xs font-mono bg-black/40 p-2.5 border border-white/5 text-neutral-300">
                <strong className="text-[#ff0033]">DISTORTION:</strong> {protocol.distortion}
              </div>
            </div>

            {/* Infiltration Objectives Checklist */}
            <div className="bg-[#15151a] p-6 border border-white/5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-neutral-300 uppercase font-bold">
                  <Flame size={16} className="text-[#ff0033]" />
                  <span>INFILTRATION OBJECTIVES ({objectives.filter((o) => o.completed).length}/{objectives.length})</span>
                </div>
                <span className="text-xs font-mono text-[#22c55e] font-bold">
                  {completionPercent}% SECURED
                </span>
              </div>

              <div className="space-y-2.5">
                {objectives.map((obj) => (
                  <div
                    key={obj.id}
                    onClick={() => toggleObjective(obj.id)}
                    className={`flex items-center gap-3 p-3 transition-all cursor-pointer border ${
                      obj.completed
                        ? 'bg-[#22c55e]/10 border-[#22c55e]/30 text-white'
                        : 'bg-black/40 border-white/10 text-neutral-300 hover:border-[#ff0033]'
                    }`}
                  >
                    {obj.completed ? (
                      <CheckCircle2 size={20} className="text-[#22c55e] shrink-0" />
                    ) : (
                      <Circle size={20} className="text-neutral-500 shrink-0" />
                    )}
                    <span className={`text-sm font-mono ${obj.completed ? 'line-through text-neutral-400' : ''}`}>
                      {obj.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Loot & Treasures Found */}
            <div className="bg-[#15151a] p-5 border border-white/5">
              <div className="text-xs font-mono tracking-widest text-neutral-400 uppercase font-bold mb-2 flex items-center gap-2">
                <Sparkles size={14} className="text-[#facc15]" />
                <span>DISCOVERED WILL SEEDS & COGNITIVE ARTIFACTS</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {protocol.lootDiscovered.map((item, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-black/60 border border-[#facc15]/30 text-[#facc15] text-xs font-mono -skew-x-6"
                  >
                    ✦ {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (Security Meter, Session DM Settings, Calling Card status) - 5 cols */}
          <div className="col-span-5 space-y-6">
            {/* Security Alert Meter */}
            <div className="bg-[#15151a] p-6 border border-white/5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-neutral-300 uppercase font-bold">
                  <ShieldAlert size={18} className={securityLevel > 70 ? 'text-[#ff0033] animate-pulse' : 'text-neutral-400'} />
                  <span>SECURITY ALERT LEVEL</span>
                </div>
                <span
                  className={`text-2xl font-anton italic ${
                    securityLevel > 75 ? 'text-[#ff0033]' : securityLevel > 40 ? 'text-[#facc15]' : 'text-[#22c55e]'
                  }`}
                  style={{ fontFamily: "'Anton', sans-serif" }}
                >
                  {securityLevel}% {securityLevel >= 80 ? 'CRITICAL' : ''}
                </span>
              </div>

              {/* Visual Meter Bar */}
              <div className="w-full h-4 bg-black border border-white/20 mt-3 p-0.5 overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    securityLevel > 75 ? 'bg-[#ff0033]' : securityLevel > 40 ? 'bg-[#facc15]' : 'bg-[#22c55e]'
                  }`}
                  style={{ width: `${securityLevel}%` }}
                />
              </div>

              {/* Slider Controller */}
              <div className="mt-4 flex items-center justify-between text-xs font-mono text-neutral-400">
                <span>0% STEALTH</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={securityLevel}
                  onChange={(e) => handleSecurityChange(Number(e.target.value))}
                  className="w-48 accent-[#ff0033] cursor-pointer"
                />
                <span>100% DISCOVERY</span>
              </div>
            </div>

            {/* Session DM & Schedule Editor */}
            <div className="bg-[#15151a] p-6 border border-white/5 space-y-4">
              <div className="text-xs font-mono tracking-widest text-neutral-300 uppercase font-bold flex items-center gap-2">
                <Calendar size={16} className="text-[#ff0033]" />
                <span>SESSION TIMING & DUNGEON MASTER</span>
              </div>

              <div>
                <label className="text-[11px] font-mono text-neutral-400 uppercase block mb-1">
                  DUNGEON MASTER / LEAD OPERATOR:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['JOKER', 'MORGANNA', 'SKULL', 'QUEEN', 'FOX', 'ORACLE'].map((dm) => (
                    <button
                      key={dm}
                      onClick={() => handleSaveSession(dm, nextSession)}
                      className={`px-3 py-1.5 font-anton italic text-sm tracking-wider -skew-x-12 transition-all cursor-pointer ${
                        dungeonMaster === dm
                          ? 'bg-[#ff0033] text-black font-bold shadow-[2px_2px_0px_#fff]'
                          : 'bg-black/50 border border-white/10 text-neutral-300 hover:text-white'
                      }`}
                    >
                      <span className="skew-x-12">{dm}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[11px] font-mono text-neutral-400 uppercase block mb-1">
                  NEXT SESSION SCHEDULE:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={nextSession}
                    onChange={(e) => setNextSession(e.target.value)}
                    className="w-full bg-black border border-white/20 px-3 py-2 text-sm font-mono text-white focus:border-[#ff0033] focus:outline-none"
                    placeholder="e.g. TONIGHT @ 20:00"
                  />
                  <button
                    onClick={() => handleSaveSession(dungeonMaster, nextSession)}
                    className="px-4 py-2 bg-white text-black hover:bg-[#ff0033] hover:text-white font-anton italic text-sm tracking-wider -skew-x-12 cursor-pointer transition-colors"
                  >
                    <span className="skew-x-12">UPDATE</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Tactical Notes */}
            <div className="bg-[#15151a] p-5 border border-white/5">
              <div className="text-xs font-mono tracking-widest text-neutral-400 uppercase font-bold mb-1">
                NAVIGATOR TACTICAL NOTES:
              </div>
              <p className="text-xs font-mono text-neutral-300 leading-relaxed italic bg-black/40 p-3 border border-white/5">
                "{protocol.notes}"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
