'use client';

import React, { useState, useEffect } from 'react';
import DesktopIcons from '@/components/Tools/DesktopIcons';
import Taskbar from '@/components/Desktop/Taskbar';
import StartMenu from '@/components/Desktop/StartMenu';
import WindowManager, { useWindowManager, APP_CONFIGS } from '@/components/Tools/WindowManager';
import WinampWindow from '@/components/Applications/Winamp/WinampWindow';
import GaduGaduWindow from '../Applications/GaduGadu/gadugaduWindow';

/* ---------- TYPY ---------- */
interface DesktopXPProps {
  showAdditionalIcons?: boolean;
  onGlitchTrigger?: () => void;
}

/* ---------- GŁÓWNY KOMPONENT ---------- */
export default function DesktopXP({
  showAdditionalIcons = false,
  onGlitchTrigger,
}: DesktopXPProps) {
  // WindowManager
  const { windows, openWindow, updateWindow, closeWindow, focusWindow } = useWindowManager();

  // UI State
  const [contextMenu, setContextMenu] = useState({ x: 0, y: 0, visible: false });
  const [showStartMenu, setShowStartMenu] = useState(false);

  // Glitch timer
  const [glitchTriggered, setGlitchTriggered] = useState(false);
  const [timeOnDesktop, setTimeOnDesktop] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTimeOnDesktop((p) => p + 1), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (timeOnDesktop >= 5 && !glitchTriggered && onGlitchTrigger) {
      setGlitchTriggered(true);
      onGlitchTrigger();
    }
  }, [timeOnDesktop, glitchTriggered, onGlitchTrigger]);

  // ---------- HANDLERS ----------
  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY, visible: true });
  };

  const handleDesktopClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button === 0) {
      setContextMenu({ x: 0, y: 0, visible: false });
      setShowStartMenu(false);
    }
  };

  const handleStartClick = () => setShowStartMenu((p) => !p);
  const handleStartMenuClose = () => setShowStartMenu(false);

  const handleIconDoubleClick = (icon: { id: number; label: string; src: string; x: number; y: number }) => {
    setContextMenu({ x: 0, y: 0, visible: false });
    switch (icon.label) {
      case 'Winamp':
        openWindow(APP_CONFIGS.winamp);
        break;
      case 'Gadu-Gadu':
        openWindow(APP_CONFIGS.gaduGadu);
        break;
      case 'Counter-Strike 1.6':
        openWindow(APP_CONFIGS.counterStrike);
        break;
      case 'Internet Explorer':
        openWindow(APP_CONFIGS.internetExplorer);
        break;
      case 'Tibia':
        openWindow(APP_CONFIGS.tibia);
        break;
      case 'GTA: San Andreas':
        openWindow(APP_CONFIGS.gtaSanAndreas);
        break;
      default:
        console.log('🚧 Aplikacja jeszcze nie zaimplementowana:', icon.label);
    }
  };

  const handleSortIcons = () => {
    setContextMenu({ x: 0, y: 0, visible: false });
    // Dodaj sortowanie ikon jeśli chcesz
  };

  const handleWindowRestore = (windowId: string) => {
    updateWindow(windowId, { isMinimized: false });
    focusWindow(windowId);
  };

  // ---------- RENDER ----------
  return (
    <div
      onMouseDown={handleDesktopClick}
      onContextMenu={handleContextMenu}
      style={{
        width: '100vw',
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
        backgroundImage: 'url("/img/Windowsxp.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        fontFamily: 'Tahoma, "MS Sans Serif", sans-serif',
      }}
    >
      {/* --- Desktop Icons --- */}
      <DesktopIcons
        showPortfolioIcons={showAdditionalIcons}
        onIconDoubleClick={handleIconDoubleClick}
      />

      {/* --- Window Manager - RENDERUJE OKNA --- */}
      <WindowManager
        windows={windows}
        onWindowUpdate={updateWindow}
        onWindowClose={closeWindow}
        onWindowFocus={focusWindow}
      >
        {(windowId, windowState) => {
          switch (windowId) {
            case 'winamp':
              return <WinampWindow onClose={() => closeWindow(windowId)} />;
            case 'gaduGadu':
              return <GaduGaduWindow onClose={() => closeWindow(windowId)} />;
            case 'internetExplorer':
              return (
                <div style={{ padding: '20px' }}>
                  <div style={{
                    background: '#f0f0f0',
                    padding: '5px',
                    marginBottom: '10px',
                    border: '1px inset #ccc'
                  }}>
                    🌐 http://www.onet.pl
                  </div>
                  <h2>🇵🇱 Onet.pl - Portal internetowy</h2>
                  <p>Witamy w Internecie!</p>
                  <ul>
                    <li>📰 Wiadomości</li>
                    <li>📧 Poczta Onet</li>
                    <li>⚽ Sport</li>
                    <li>🌤️ Pogoda</li>
                  </ul>
                </div>
              );
            case 'counterStrike':
              return (
                <div style={{
                  background: '#000',
                  color: '#0f0',
                  padding: '20px',
                  fontFamily: 'monospace',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <h1 style={{ fontSize: '48px', margin: '20px 0' }}>🎯 COUNTER-STRIKE 1.6</h1>
                  <div style={{ fontSize: '24px' }}>GŁÓWNE MENU</div>
                  <div style={{ marginTop: '40px', textAlign: 'center' }}>
                    <div style={{ margin: '10px 0', cursor: 'pointer' }}>► Nowa gra</div>
                    <div style={{ margin: '10px 0', cursor: 'pointer' }}>► Sieć lokalna</div>
                    <div style={{ margin: '10px 0', cursor: 'pointer' }}>► Internet</div>
                    <div style={{ margin: '10px 0', cursor: 'pointer' }}>► Opcje</div>
                    <div style={{ margin: '10px 0', cursor: 'pointer' }}>► Wyjście</div>
                  </div>
                </div>
              );
            case 'tibia':
              return (
                <div style={{
                  background: 'linear-gradient(45deg, #4a4a4a, #2a2a2a)',
                  color: '#fff',
                  padding: '20px',
                  height: '100%',
                  backgroundImage: 'url("data:image/svg+xml,%3Csvg width="20" height="20" xmlns="http://www.w3.org/2000/svg"%3E%3Cdefs%3E%3Cpattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse"%3E%3Cpath d="M 20 0 L 0 0 0 20" fill="none" stroke="%23333" stroke-width="1"/%3E%3C/pattern%3E%3C/defs%3E%3Crect width="100%25" height="100%25" fill="url(%23grid)" /%3E%3C/svg%3E")'
                }}>
                  <h1 style={{ textAlign: 'center', fontSize: '32px' }}>⚔️ TIBIA</h1>
                  <div style={{ textAlign: 'center', marginTop: '50px' }}>
                    <div style={{ fontSize: '18px', marginBottom: '30px' }}>
                      🏰 Wybierz świat gry:
                    </div>
                    <div style={{ margin: '10px 0', cursor: 'pointer', padding: '10px', border: '1px solid #666' }}>
                      🌍 Antica (PvP Optional)
                    </div>
                    <div style={{ margin: '10px 0', cursor: 'pointer', padding: '10px', border: '1px solid #666' }}>
                      🌍 Dolera (Open PvP)
                    </div>
                    <div style={{ margin: '10px 0', cursor: 'pointer', padding: '10px', border: '1px solid #666' }}>
                      🌍 Menera (Optional PvP)
                    </div>
                  </div>
                </div>
              );
            case 'gtaSanAndreas':
              return (
                <div style={{
                  background: 'linear-gradient(135deg, #ff6b35, #f7931e)',
                  color: '#fff',
                  padding: '20px',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontFamily: 'Impact, Arial Black, sans-serif'
                }}>
                  <h1 style={{ fontSize: '48px', textShadow: '3px 3px 0px #000' }}>
                    🚗 GRAND THEFT AUTO
                  </h1>
                  <h2 style={{ fontSize: '32px', textShadow: '2px 2px 0px #000' }}>
                    SAN ANDREAS
                  </h2>
                  <div style={{ marginTop: '50px', textAlign: 'center' }}>
                    <div style={{ margin: '15px 0', fontSize: '20px', cursor: 'pointer' }}>
                      ► Start Game
                    </div>
                    <div style={{ margin: '15px 0', fontSize: '20px', cursor: 'pointer' }}>
                      ► Load Game
                    </div>
                    <div style={{ margin: '15px 0', fontSize: '20px', cursor: 'pointer' }}>
                      ► Options
                    </div>
                    <div style={{ margin: '15px 0', fontSize: '20px', cursor: 'pointer' }}>
                      ► Exit
                    </div>
                  </div>
                  <div style={{ position: 'absolute', bottom: '20px', fontSize: '12px' }}>
                    Welcome to San Andreas, CJ!
                  </div>
                </div>
              );
            default:
              return (
                <div style={{ padding: '20px', textAlign: 'center' }}>
                  <h2>🚧 W budowie</h2>
                  <p>Aplikacja <strong>{windowState.title}</strong> jest w trakcie tworzenia.</p>
                </div>
              );
          }
        }}
      </WindowManager>

      {/* --- Taskbar --- */}
      <Taskbar
        windows={windows}
        onWindowRestore={handleWindowRestore}
        onWindowFocus={focusWindow}
        onStartClick={handleStartClick}
        showStartMenu={showStartMenu}
      />

      {/* --- Start Menu --- */}
      <StartMenu
        visible={showStartMenu}
        onClose={handleStartMenuClose}
        onMenuItemClick={id => console.log('📋 Start menu item clicked:', id)}
      />

      {/* --- Context Menu --- */}
      {contextMenu.visible && (
        <div
          style={{
            position: 'absolute',
            top: contextMenu.y,
            left: contextMenu.x,
            minWidth: 140,
            background: '#f0f0f0',
            zIndex: 1000,
            border: '1px solid #848284',
            boxShadow: '2px 2px 5px rgba(0,0,0,.5)',
            fontSize: 11,
            borderRadius: 2,
          }}
        >
          <div
            onClick={handleSortIcons}
            style={{
              padding: '6px 12px',
              borderBottom: '1px solid #d0d0d0',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = '#316ac5';
              e.currentTarget.style.color = '#fff';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#000';
            }}
          >
            <span style={{ marginRight: 8 }}>📂</span>
            Sortuj ikony według nazwy
          </div>
          <div
            onClick={() => setContextMenu({ x: 0, y: 0, visible: false })}
            style={{
              padding: '6px 12px',
              borderBottom: '1px solid #d0d0d0',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = '#316ac5';
              e.currentTarget.style.color = '#fff';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#000';
            }}
          >
            <span style={{ marginRight: 8 }}>🔄</span>
            Odśwież
          </div>
          <div
            style={{
              padding: '6px 12px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = '#316ac5';
              e.currentTarget.style.color = '#fff';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#000';
            }}
          >
            <span style={{ marginRight: 8 }}>🎨</span>
            Właściwości
          </div>
        </div>
      )}

      {/* --- Debug --- */}
      <div
        style={{
          position: 'absolute',
          top: 8,
          right: 8,
          padding: 8,
          zIndex: 998,
          background: 'rgba(0,0,0,.7)',
          color: '#fff',
          borderRadius: 4,
          fontSize: 10,
          fontFamily: 'monospace',
        }}
      >
        <div>Desktop Time: {timeOnDesktop}s</div>
        <div>Open Windows: {windows.length}</div>
        {timeOnDesktop >= 5 && <div style={{ color: '#ff6666' }}>⚡ Glitch ready!</div>}
        {showAdditionalIcons && (
          <div style={{ color: '#66ff66' }}>✅ Portfolio unlocked!</div>
        )}
        {glitchTriggered && (
          <div style={{ color: '#ffaa00' }}>🌩️ Glitch triggered!</div>
        )}
      </div>
    </div>
  );
}
