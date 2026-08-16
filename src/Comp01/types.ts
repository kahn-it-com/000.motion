export type ProtocolCategory = 'active' | 'deep_run' | 'archived';

export type ProtocolStatus = 'ACTIVE' | 'IN PROGRESS' | '100% CLEAR' | 'PENDING' | 'SECURED' | 'HIGH ALERT';

export interface PartyMember {
  id: string;
  name: string;
  codeName: string;
  arcana: string;
  persona: string;
  role: string;
  color: string;
  avatarText: string;
  hp: number;
  maxHp: number;
  sp: number;
  maxSp: number;
}

export interface MissionObjective {
  id: string;
  text: string;
  completed: boolean;
}

export interface Protocol {
  id: string;
  title: string;
  subtitle?: string;
  category: ProtocolCategory;
  dungeonMaster: string;
  dungeonMasterRole?: string;
  nextSession: string;
  status: ProtocolStatus;
  completion: string;
  completionPercent: number;
  securityLevel: number; // 0 - 100%
  targetName: string;
  palaceType: string;
  distortion: string;
  location: string;
  deadline: string;
  daysRemaining: number;
  callingCardSent: boolean;
  callingCardDate?: string;
  callingCardMessage?: string;
  objectives: MissionObjective[];
  lootDiscovered: string[];
  notes: string;
  stars?: number;
}

export type ActiveTab = 'deck' | 'mementos' | 'calling_cards' | 'roster' | 'calendar';
