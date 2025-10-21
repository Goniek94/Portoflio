'use client';

import React from 'react';
import GaduGaduWindow from '@/components/Applications/GaduGadu/gadugaduWindow';
import WinampPlayer from '@/components/Applications/Winamp/WinampPlayer';
import WinampPlaylist from '@/components/Applications/Winamp/WinampPlaylist';
import { WindowState, WindowConfig, APP_CONFIGS } from '@/components/Tools/WindowManager';
import FolderView from '@/components/DesktopXP/Folders/components/FolderView';
import MarketplaceRepoInfo from '@/components/DesktopXP/Folders/components/projects/marketplace/MarketplaceRepoInfo';
import PortfolioXPRepoInfo from '@/components/DesktopXP/Folders/components/projects/portfolioxp/PortfolioXPRepoInfo';
import AboutMeContent from '@/components/DesktopXP/Folders/components/about/AboutMeContent';

/* ---------- TYPES ---------- */
interface WinampState {
  currentIndex: number | null;
  isPlaying: boolean;
}

interface WindowContentProps {
  windowId: string;
  windowState: WindowState;
  onClose: (windowId: string) => void;
  onOpenWindow: (config: WindowConfig) => void;
  winampState: WinampState;
  setWinampState: React.Dispatch<React.SetStateAction<WinampState>>;
}

/* ---------- COMPONENT ---------- */
export function WindowContent({
  windowId,
  windowState,
  onClose,
  onOpenWindow,
  winampState,
  setWinampState,
}: WindowContentProps) {
  // Tracks definition - współdzielona między playlist i player
  const tracks = [
    {
      title: 'Bring Me to Life',
      artist: 'Evanescence',
      url: '/sound/Evanescence - Bring Me To Life.mp3',
    },
    {
      title: 'In the End',
      artist: 'Linkin Park',
      url: '/sound/Linkin Park - In The End.mp3',
    },
    {
      title: 'Oops!... I Did It Again',
      artist: 'Britney Spears',
      url: '/sound/Britney Spears - Oops!...I Did It Again (Official HD Video).mp3',
    },
    {
      title: '...Baby One More Time',
      artist: 'Britney Spears',
      url: '/sound/Britney Spears - ...Baby One More Time (Official Video).mp3',
    },
    {
      title: 'The Real Slim Shady',
      artist: 'Eminem',
      url: '/sound/Eminem - The Real Slim Shady (Uncensored).mp3',
    },
    {
      title: 'Without Me',
      artist: 'Eminem',
      url: '/sound/Eminem - Without Me (Subtitulada en Español).mp3',
    },
    {
      title: 'Dragostea Din Tei',
      artist: 'O-Zone',
      url: '/sound/O-Zone - Dragostea Din Tei.mp3',
    },
    {
      title: 'Numb',
      artist: 'Linkin Park',
      url: '/sound/Numb (Official Music Video) [4K UPGRADE] – Linkin Park.mp3',
    },
    {
      title: 'Axel F',
      artist: 'Crazy Frog',
      url: '/sound/Crazy Frog - Axel F (Official Video) (mp3cut.net).mp3',
    },
  ];

  // Local state for player (currentTime, duration)
  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);

  const currentTrack = winampState.currentIndex !== null ? tracks[winampState.currentIndex] : null;

  switch (windowId) {
    case 'winamp':
      return (
        <WinampPlayer
          currentTrack={currentTrack}
          currentTime={currentTime}
          duration={duration}
          isPlaying={winampState.isPlaying}
          onPlay={() => {
            if (winampState.currentIndex === null) {
              setWinampState({ currentIndex: 0, isPlaying: true });
            } else {
              setWinampState({ ...winampState, isPlaying: true });
            }
          }}
          onPause={() => setWinampState({ ...winampState, isPlaying: false })}
          onStop={() => {
            setWinampState({ ...winampState, isPlaying: false });
            setCurrentTime(0);
          }}
          onNext={() => {
            const nextIndex =
              winampState.currentIndex === null
                ? 0
                : (winampState.currentIndex + 1) % tracks.length;
            setWinampState({ currentIndex: nextIndex, isPlaying: true });
          }}
          onPrev={() => {
            const prevIndex =
              winampState.currentIndex === null
                ? tracks.length - 1
                : (winampState.currentIndex - 1 + tracks.length) % tracks.length;
            setWinampState({ currentIndex: prevIndex, isPlaying: true });
          }}
          onTimeUpdate={setCurrentTime}
          onLoadedMetadata={setDuration}
          onTrackEnded={() => {
            const nextIndex =
              winampState.currentIndex === null
                ? 0
                : (winampState.currentIndex + 1) % tracks.length;
            setWinampState({ currentIndex: nextIndex, isPlaying: true });
          }}
          onClose={() => onClose(windowId)}
        />
      );

    case 'winampPlaylist':
      return (
        <WinampPlaylist
          tracks={tracks}
          currentIndex={winampState.currentIndex}
          isPlaying={winampState.isPlaying}
          onTrackSelect={(index) => {
            setWinampState({ currentIndex: index, isPlaying: true });
            // Open the player window when track is selected
            onOpenWindow(APP_CONFIGS.winamp);
          }}
          onClose={() => onClose(windowId)}
          isVisible={true}
        />
      );

    case 'aboutMe':
      return (
        <FolderView title="About_Me">
          <div style={{ padding: '16px', color: '#000000' }}>
            <AboutMeContent />
          </div>
        </FolderView>
      );

    case 'projects':
      return (
        <FolderView title="My_Projects">
          <h2 style={{ marginBottom: '20px', color: '#003399' }}>Select a project:</h2>
          <div style={projectsGridStyle}>
            <div
              style={folderItemStyle}
              onClick={() =>
                onOpenWindow({
                  ...APP_CONFIGS.projects,
                  id: 'marketplace',
                  title: 'Marketplace',
                })
              }
            >
              <div style={yellowFolderIconStyle}>📁</div>
              <div>Marketplace</div>
              <div style={{ fontSize: '10px', color: '#666' }}>Car sales platform</div>
            </div>

            <div
              style={folderItemStyle}
              onClick={() =>
                onOpenWindow({
                  ...APP_CONFIGS.projects,
                  id: 'portfolioxp',
                  title: 'Portfolio XP',
                })
              }
            >
              <div style={yellowFolderIconStyle}>📁</div>
              <div>Portfolio XP</div>
              <div style={{ fontSize: '11px', color: '#666' }}>Interactive portfolio</div>
            </div>
          </div>
        </FolderView>
      );

    case 'marketplace':
      return <MarketplaceRepoInfo onClose={() => onClose(windowId)} />;

    case 'portfolioxp':
      return <PortfolioXPRepoInfo onClose={() => onClose(windowId)} />;

    case 'gaduGadu':
      return <GaduGaduWindow onClose={() => onClose(windowId)} />;

    case 'internetExplorer':
      return (
        <div style={{ padding: '20px' }}>
          <div
            style={{
              background: '#f0f0f0',
              padding: '5px',
              marginBottom: '10px',
              border: '1px inset #ccc',
            }}
          >
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
        <div
          style={{
            background: '#000',
            color: '#0f0',
            padding: '20px',
            fontFamily: 'monospace',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
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
        <div
          style={{
            background: 'linear-gradient(45deg, #4a4a4a, #2a2a2a)',
            color: '#fff',
            padding: '20px',
            height: '100%',
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg width="20" height="20" xmlns="http://www.w3.org/2000/svg"%3E%3Cdefs%3E%3Cpattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse"%3E%3Cpath d="M 20 0 L 0 0 0 20" fill="none" stroke="%23333" stroke-width="1"/%3E%3C/pattern%3E%3C/defs%3E%3Crect width="100%25" height="100%25" fill="url(%23grid)" /%3E%3C/svg%3E")',
          }}
        >
          <h1 style={{ textAlign: 'center', fontSize: '32px' }}>⚔️ TIBIA</h1>
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <div style={{ fontSize: '18px', marginBottom: '30px' }}>🏰 Wybierz świat gry:</div>
            <div
              style={{
                margin: '10px 0',
                cursor: 'pointer',
                padding: '10px',
                border: '1px solid #666',
              }}
            >
              🌍 Antica (PvP Optional)
            </div>
            <div
              style={{
                margin: '10px 0',
                cursor: 'pointer',
                padding: '10px',
                border: '1px solid #666',
              }}
            >
              🌍 Dolera (Open PvP)
            </div>
            <div
              style={{
                margin: '10px 0',
                cursor: 'pointer',
                padding: '10px',
                border: '1px solid #666',
              }}
            >
              🌍 Menera (Optional PvP)
            </div>
          </div>
        </div>
      );

    case 'gtaSanAndreas':
      return (
        <div
          style={{
            backgroundImage: 'url(/images/GTASA.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            color: '#fff',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
          }}
        >
          {/* Close button */}
          <button
            onClick={() => onClose(windowId)}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              width: '40px',
              height: '40px',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              color: '#fff',
              border: '2px solid #fff',
              borderRadius: '50%',
              fontSize: '24px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
            }}
            title="Close"
          >
            ×
          </button>
        </div>
      );

    default:
      return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h2>🚧 W budowie</h2>
          <p>
            Aplikacja <strong>{windowState.title}</strong> jest w trakcie tworzenia.
          </p>
        </div>
      );
  }
}

/* ---------- STYLES ---------- */
const projectsGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
  gap: '24px',
  padding: '8px',
};

const folderItemStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '16px',
  cursor: 'pointer',
  textAlign: 'center',
  gap: '8px',
};

const yellowFolderIconStyle: React.CSSProperties = {
  fontSize: '120px',
  color: '#FFD700',
  textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
  transition: 'transform 0.2s',
};
