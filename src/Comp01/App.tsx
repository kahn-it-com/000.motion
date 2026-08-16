/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ViewportScaler } from './components/ViewportScaler';
import { BackgroundElements } from './components/BackgroundElements';
import { TopNav } from './components/TopNav';
import { CommandDeckView } from './components/CommandDeckView';
import { MementosScreen } from './components/MementosScreen';
import { ThievesRosterView } from './components/ThievesRosterView';
import { CallingCardsGalleryView } from './components/CallingCardsGalleryView';
import { ProtocolDetailModal } from './components/ProtocolDetailModal';
import { CallingCardModal } from './components/CallingCardModal';
import { NewProtocolModal } from './components/NewProtocolModal';
import { INITIAL_PROTOCOLS } from './data/initialProtocols';
import { Protocol, ActiveTab } from './types';
import { sound } from './utils/audio';

export default function App() {
  const [protocols, setProtocols] = useState<Protocol[]>(INITIAL_PROTOCOLS);
  const [currentTab, setCurrentTab] = useState<ActiveTab>('deck');
  const [selectedProtocol, setSelectedProtocol] = useState<Protocol | null>(null);
  const [callingCardProtocol, setCallingCardProtocol] = useState<Protocol | null>(null);
  const [showCallingCardModal, setShowCallingCardModal] = useState<boolean>(false);
  const [showNewProtocolModal, setShowNewProtocolModal] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Toggle Sound FX
  const handleToggleSound = () => {
    sound.enabled = !soundEnabled;
    setSoundEnabled(!soundEnabled);
  };

  // Select Protocol to inspect
  const handleSelectProtocol = (protocol: Protocol) => {
    setSelectedProtocol(protocol);
  };

  // Open Calling Card Modal
  const handleOpenCallingCard = (protocol?: Protocol) => {
    setCallingCardProtocol(protocol || null);
    setShowCallingCardModal(true);
  };

  // Update a Protocol
  const handleUpdateProtocol = (updated: Protocol) => {
    setProtocols((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    if (selectedProtocol && selectedProtocol.id === updated.id) {
      setSelectedProtocol(updated);
    }
  };

  // Add a new Protocol
  const handleAddProtocol = (newProtocol: Protocol) => {
    setProtocols((prev) => [newProtocol, ...prev]);
    sound.playDramaticHit();
  };

  // Calling Card dispatched
  const handleCallingCardSent = (protocolId: string, message: string) => {
    setProtocols((prev) =>
      prev.map((p) =>
        p.id === protocolId
          ? {
              ...p,
              callingCardSent: true,
              callingCardDate: 'DISPATCHED',
              callingCardMessage: message,
              securityLevel: Math.min(100, p.securityLevel + 25),
              status: 'HIGH ALERT',
            }
          : p
      )
    );
  };

  return (
    <ViewportScaler>
      {/* Dynamic Persona Red & Black Split Background */}
      <BackgroundElements />

      {/* Main 1920x1080 Layout Container */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between overflow-hidden">
        {/* Top Navigation Bar */}
        <TopNav
          currentTab={currentTab}
          onSelectTab={setCurrentTab}
          onOpenNewProtocol={() => setShowNewProtocolModal(true)}
          onOpenCallingCard={() => handleOpenCallingCard()}
          activeCount={protocols.filter((p) => p.category === 'active').length}
          soundEnabled={soundEnabled}
          onToggleSound={handleToggleSound}
        />

        {/* Dynamic Screen View (1920x1080 Native) */}
        <main className="relative flex-1 w-full h-[992px] flex items-center justify-center">
          {currentTab === 'deck' && (
            <CommandDeckView
              protocols={protocols}
              onSelectProtocol={handleSelectProtocol}
              onOpenCallingCard={handleOpenCallingCard}
            />
          )}

          {currentTab === 'mementos' && (
            <MementosScreen
              onBackToDeck={() => setCurrentTab('deck')}
              onSelectProtocol={handleSelectProtocol}
            />
          )}

          {currentTab === 'roster' && (
            <ThievesRosterView onBackToDeck={() => setCurrentTab('deck')} />
          )}

          {currentTab === 'calling_cards' && (
            <CallingCardsGalleryView
              protocols={protocols}
              onOpenCallingCard={handleOpenCallingCard}
              onBackToDeck={() => setCurrentTab('deck')}
            />
          )}
        </main>
      </div>

      {/* Tactical Inspection Modal */}
      {selectedProtocol && (
        <ProtocolDetailModal
          protocol={selectedProtocol}
          onClose={() => setSelectedProtocol(null)}
          onUpdate={handleUpdateProtocol}
          onOpenCallingCard={handleOpenCallingCard}
        />
      )}

      {/* Calling Card Dispatch Modal */}
      {showCallingCardModal && (
        <CallingCardModal
          protocol={callingCardProtocol}
          onClose={() => {
            setShowCallingCardModal(false);
            setCallingCardProtocol(null);
          }}
          onSent={handleCallingCardSent}
        />
      )}

      {/* New Protocol Modal */}
      {showNewProtocolModal && (
        <NewProtocolModal
          onClose={() => setShowNewProtocolModal(false)}
          onAdd={handleAddProtocol}
        />
      )}
    </ViewportScaler>
  );
}
