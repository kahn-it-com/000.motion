import React, { useState } from 'react';
import { X, Plus, Flame, Shield, MapPin, Target } from 'lucide-react';
import { Protocol, ProtocolCategory } from '../types';
import { sound } from '../utils/audio';

interface NewProtocolModalProps {
  onClose: () => void;
  onAdd: (newProtocol: Protocol) => void;
}

export const NewProtocolModal: React.FC<NewProtocolModalProps> = ({ onClose, onAdd }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ProtocolCategory>('active');
  const [dungeonMaster, setDungeonMaster] = useState('JOKER');
  const [nextSession, setNextSession] = useState('TOMORROW @ 20:00');
  const [targetName, setTargetName] = useState('');
  const [distortion, setDistortion] = useState('');
  const [palaceType, setPalaceType] = useState('Cognitive Fortress');
  const [location, setLocation] = useState('Tokyo Metropolitan Underground');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    sound.playDramaticHit();

    const created: Protocol = {
      id: `prot-${Date.now()}`,
      title: title.toUpperCase(),
      subtitle: distortion.toUpperCase() || 'COGNITIVE DISTORTION PROTOCOL',
      category,
      dungeonMaster,
      dungeonMasterRole: 'TACTICAL OPERATOR',
      nextSession,
      status: category === 'active' ? 'ACTIVE' : category === 'deep_run' ? 'IN PROGRESS' : '100% CLEAR',
      completion: '0% INFILTRATED',
      completionPercent: 0,
      securityLevel: 0,
      targetName: targetName || 'Unknown Shadow Ruler',
      palaceType,
      distortion: distortion || 'Viewing citizens as disposable pawns',
      location,
      deadline: '14 DAYS REMAINING',
      daysRemaining: 14,
      callingCardSent: false,
      objectives: [
        { id: `obj-${Date.now()}-1`, text: 'Infiltrate Outer Ingress & Locate Safe Room', completed: false },
        { id: `obj-${Date.now()}-2`, text: 'Identify Infiltration Route to the Core Vault', completed: false },
        { id: `obj-${Date.now()}-3`, text: 'Secure the Materialized Treasure', completed: false },
      ],
      lootDiscovered: ['Will Seed Fragment', 'Lockpick Kit'],
      notes: 'New cognitive distortion mapped. Prepare party with elemental coverage.',
      stars: 4,
    };

    onAdd(created);
    onClose();
  };

  return (
    <div
      id="modal-new-protocol-backdrop"
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-8 select-none animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="modal-new-protocol-window"
        className="relative w-[840px] bg-[#0e0e12] border-2 border-white/20 text-white p-10 shadow-[0_0_60px_rgba(255,0,51,0.3)] overflow-hidden"
        style={{
          clipPath: 'polygon(0 0, 100% 0, 96% 100%, 0% 100%)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-0 left-0 right-0 h-3 bg-[#ff0033]" />

        {/* Close Button */}
        <button
          id="btn-close-new-protocol"
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="absolute top-6 right-6 w-10 h-10 bg-white hover:bg-[#ff0033] text-black hover:text-white font-bold flex items-center justify-center -skew-x-12 transition-colors cursor-pointer z-30"
        >
          <X size={24} className="skew-x-12" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <span className="px-3 py-1 bg-[#ff0033] text-black font-anton italic text-xs -skew-x-12 tracking-wider">
            METAVERSE PROTOCOL FORGER
          </span>
          <h2
            className="text-4xl font-anton italic uppercase tracking-wider text-white mt-2"
            style={{ fontFamily: "'Anton', sans-serif" }}
          >
            REGISTER NEW INFILTRATION
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-mono text-neutral-400 uppercase font-bold block mb-1">
                PALACE / MISSION TITLE:
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-black border border-white/20 px-3 py-2 text-sm font-mono text-white focus:border-[#ff0033] focus:outline-none"
                placeholder="e.g. THE VAULT OF DESPAIR"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-neutral-400 uppercase font-bold block mb-1">
                MISSION CATEGORY:
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ProtocolCategory)}
                className="w-full bg-black border border-white/20 px-3 py-2 text-sm font-mono text-white focus:border-[#ff0033] focus:outline-none"
              >
                <option value="active">Active Primary Palace</option>
                <option value="deep_run">Mementos Deep Run</option>
                <option value="archived">Archived Legacy Mission</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-mono text-neutral-400 uppercase font-bold block mb-1">
                DUNGEON MASTER / LEAD:
              </label>
              <select
                value={dungeonMaster}
                onChange={(e) => setDungeonMaster(e.target.value)}
                className="w-full bg-black border border-white/20 px-3 py-2 text-sm font-mono text-white focus:border-[#ff0033] focus:outline-none"
              >
                <option value="JOKER">JOKER</option>
                <option value="MORGANNA">MORGANNA</option>
                <option value="SKULL">SKULL</option>
                <option value="QUEEN">QUEEN</option>
                <option value="PANTHER">PANTHER</option>
                <option value="FOX">FOX</option>
                <option value="ORACLE">ORACLE</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-mono text-neutral-400 uppercase font-bold block mb-1">
                SESSION SCHEDULE:
              </label>
              <input
                type="text"
                value={nextSession}
                onChange={(e) => setNextSession(e.target.value)}
                className="w-full bg-black border border-white/20 px-3 py-2 text-sm font-mono text-white focus:border-[#ff0033] focus:outline-none"
                placeholder="e.g. TONIGHT @ 20:00"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-mono text-neutral-400 uppercase font-bold block mb-1">
                TARGET PERSONA NAME:
              </label>
              <input
                type="text"
                value={targetName}
                onChange={(e) => setTargetName(e.target.value)}
                className="w-full bg-black border border-white/20 px-3 py-2 text-sm font-mono text-white focus:border-[#ff0033] focus:outline-none"
                placeholder="e.g. Shadow Minister"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-neutral-400 uppercase font-bold block mb-1">
                PALACE STRUCTURE / TYPE:
              </label>
              <input
                type="text"
                value={palaceType}
                onChange={(e) => setPalaceType(e.target.value)}
                className="w-full bg-black border border-white/20 px-3 py-2 text-sm font-mono text-white focus:border-[#ff0033] focus:outline-none"
                placeholder="e.g. Floating Cyberpunk Megatower"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-mono text-neutral-400 uppercase font-bold block mb-1">
              COGNITIVE DISTORTION:
            </label>
            <input
              type="text"
              value={distortion}
              onChange={(e) => setDistortion(e.target.value)}
              className="w-full bg-black border border-white/20 px-3 py-2 text-sm font-mono text-white focus:border-[#ff0033] focus:outline-none"
              placeholder="e.g. Viewing the hospital as an experimental laboratory"
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-3.5 bg-[#ff0033] hover:bg-white text-black font-anton italic text-2xl tracking-wider -skew-x-12 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[6px_6px_0px_#fff]"
            >
              <Plus size={22} className="skew-x-12 stroke-[3]" />
              <span className="skew-x-12 uppercase">FORGE & INITIALIZE PROTOCOL</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
