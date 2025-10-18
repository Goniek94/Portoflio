import React, { useState, useEffect } from 'react';

interface WindowState {
  id: string;
  title: string;
  icon: string;
  isMinimized: boolean;
  isVisible: boolean;
  type: 'windowed' | 'fullscreen' | 'dialog';
}

interface TaskbarProps {
  windows: WindowState[];
  onWindowRestore: (windowId: string) => void;
  onWindowFocus: (windowId: string) => void;
  onStartClick?: () => void;
  showStartMenu?: boolean;
}

/* Quick Launch – typowe ikony Windows XP */
const QUICK = [
  { id: 'explorer', icon: '🌐', title: 'Internet Explorer' },
  { id: 'show_desktop', icon: '🖥️', title: 'Pokaż pulpit' },
  { id: 'winamp', icon: '🎵', title: 'Winamp' },
];

/* Tray – typowe ikony Windows XP */
const TRAY: { id: string; icon: string; title: string }[] = [
  { id: 'volume', icon: '🔊', title: 'Głośność' },
  { id: 'network', icon: '🌐', title: 'Połączenie sieciowe' },
];

export default function Taskbar({
  windows,
  onWindowRestore,
  onWindowFocus,
  onStartClick,
  showStartMenu = false,
}: TaskbarProps) {
  /* Clock state */
  const [time, setTime] = useState(
    new Date().toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' })
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' }));
    }, 60_000);
    return () => clearInterval(interval);
  }, []);

  // Filter windows for taskbar display (exclude fullscreen)
  const taskbarWindows = windows.filter((w) => w.isVisible && w.type !== 'fullscreen');

  return (
    <div
      style={{
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 0,
        height: 30,
        display: 'flex',
        alignItems: 'center',
        background:
          'linear-gradient(180deg, #245EDC 0%, #3F8CF3 9%, #245EDC 18%, #245EDC 92%, #1941A5 100%)',
        borderTop: '1px solid #0831D9',
        boxShadow: '0 -1px 1px rgba(255,255,255,0.2) inset',
        fontFamily: 'Tahoma, "MS Sans Serif", sans-serif',
        fontSize: '11px',
        zIndex: 10000,
      }}
    >
      {/* START BUTTON */}
      <button
        onClick={onStartClick}
        style={{
          marginLeft: 2,
          height: 24,
          padding: '0 12px 0 6px',
          background: showStartMenu
            ? 'linear-gradient(180deg, #2D8C2D 0%, #4DB84D 50%, #2D8C2D 100%)'
            : 'linear-gradient(180deg, #5EAC5E 0%, #5EDB5E 18%, #4DB84D 50%, #3FA33F 82%, #2D8C2D 100%)',
          border: showStartMenu ? '1px solid #1A6B1A' : '1px solid #2D8C2D',
          borderRadius: '0 3px 3px 0',
          boxShadow: showStartMenu
            ? 'inset 0 1px 2px rgba(0,0,0,0.3)'
            : '0 1px 0 rgba(255,255,255,0.7) inset, 0 -1px 0 rgba(0,0,0,0.2) inset',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          transition: 'all 0.1s',
          color: '#fff',
          fontSize: 11,
          fontWeight: 'bold',
          fontFamily: 'Tahoma, "MS Sans Serif", sans-serif',
          textShadow: '1px 1px 1px rgba(0,0,0,0.5)',
        }}
        onMouseEnter={(e) => {
          if (!showStartMenu) {
            e.currentTarget.style.background =
              'linear-gradient(180deg, #6EBC6E 0%, #6EEB6E 18%, #5DC85D 50%, #4FB34F 82%, #3D9C3D 100%)';
          }
        }}
        onMouseLeave={(e) => {
          if (!showStartMenu) {
            e.currentTarget.style.background =
              'linear-gradient(180deg, #5EAC5E 0%, #5EDB5E 18%, #4DB84D 50%, #3FA33F 82%, #2D8C2D 100%)';
          }
        }}
      >
        <img
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'%3E%3Cpath fill='%23fff' d='M2 2h7v7H2zm0 9h7v7H2zm9-9h7v7h-7zm0 9h7v7h-7z'/%3E%3C/svg%3E"
          alt=""
          width={18}
          height={18}
          style={{ filter: showStartMenu ? 'brightness(0.85)' : 'none' }}
        />
        start
      </button>

      {/* SEPARATOR */}
      <div
        style={{
          marginLeft: 4,
          marginRight: 2,
          width: 2,
          height: 22,
          background: 'linear-gradient(90deg, rgba(16,56,150,0.8) 0%, rgba(74,144,226,0.3) 100%)',
          borderLeft: '1px solid rgba(16,56,150,0.5)',
          borderRight: '1px solid rgba(74,144,226,0.3)',
        }}
      />

      {/* QUICK LAUNCH */}
      <div
        style={{
          marginLeft: 2,
          height: 24,
          display: 'flex',
          alignItems: 'center',
          gap: 3,
          padding: '0 6px 0 4px',
        }}
      >
        {QUICK.map((item) => (
          <button
            key={item.id}
            title={item.title}
            style={{
              width: 24,
              height: 24,
              padding: 2,
              background: 'transparent',
              border: '1px solid transparent',
              borderRadius: 2,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.1s',
              fontSize: 16,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
              e.currentTarget.style.border = '1px solid rgba(255,255,255,0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.border = '1px solid transparent';
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.border = '1px solid rgba(0,0,0,0.3)';
              e.currentTarget.style.background = 'rgba(0,0,0,0.1)';
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
              e.currentTarget.style.border = '1px solid rgba(255,255,255,0.2)';
            }}
          >
            {item.icon}
          </button>
        ))}
      </div>

      {/* SEPARATOR */}
      <div
        style={{
          marginLeft: 2,
          marginRight: 4,
          width: 2,
          height: 22,
          background: 'linear-gradient(90deg, rgba(16,56,150,0.8) 0%, rgba(74,144,226,0.3) 100%)',
          borderLeft: '1px solid rgba(16,56,150,0.5)',
          borderRight: '1px solid rgba(74,144,226,0.3)',
        }}
      />

      {/* TASK BUTTONS AREA */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          padding: '0 4px',
          overflowX: 'auto',
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(255,255,255,0.3) transparent',
        }}
      >
        {taskbarWindows.map((window) => {
          const isActive = !window.isMinimized;

          return (
            <button
              key={window.id}
              style={{
                height: 22,
                minWidth: 100,
                maxWidth: 160,
                padding: '0 8px',
                background: isActive
                  ? 'linear-gradient(180deg, #1941A5 0%, #245EDC 50%, #245EDC 100%)'
                  : 'linear-gradient(180deg, #3F8CF3 0%, #3F8CF3 9%, #2E75E3 45%, #245EDC 55%, #1D4FB5 100%)',
                border: isActive ? '1px solid #0831D9' : '1px solid rgba(255,255,255,0.2)',
                borderRadius: 3,
                boxShadow: isActive
                  ? 'inset 0 1px 2px rgba(0,0,0,0.3)'
                  : '0 1px 0 rgba(255,255,255,0.4) inset',
                cursor: 'pointer',
                fontSize: 11,
                fontWeight: isActive ? 'bold' : 'normal',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                transition: 'all 0.1s',
                textShadow: '0 1px 1px rgba(0,0,0,0.5)',
              }}
              onClick={() => {
                if (window.isMinimized) {
                  onWindowRestore(window.id);
                } else {
                  onWindowFocus(window.id);
                }
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background =
                    'linear-gradient(180deg, #4F9CFF 0%, #4F9CFF 9%, #3E85F3 45%, #2E75E3 55%, #2D5FC5 100%)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background =
                    'linear-gradient(180deg, #3F8CF3 0%, #3F8CF3 9%, #2E75E3 45%, #245EDC 55%, #1D4FB5 100%)';
                }
              }}
              title={window.title}
            >
              <span style={{ fontSize: 14, flexShrink: 0 }}>{window.icon}</span>
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{window.title}</span>
            </button>
          );
        })}
      </div>

      {/* SYSTEM TRAY */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          height: 24,
          padding: '0 8px',
          marginLeft: 4,
          borderLeft: '2px solid rgba(16,56,150,0.8)',
          background: 'rgba(16,56,150,0.15)',
        }}
      >
        {/* Hide inactive icons button */}
        <button
          style={{
            width: 16,
            height: 16,
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: 2,
            cursor: 'pointer',
            fontSize: 10,
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          title="Ukryj nieaktywne ikony"
        >
          ◀
        </button>

        {/* Tray icons */}
        {TRAY.map((item) => (
          <div
            key={item.id}
            title={item.title}
            style={{
              fontSize: 14,
              cursor: 'pointer',
              padding: 2,
              borderRadius: 2,
              transition: 'background 0.1s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            {item.icon}
          </div>
        ))}
      </div>

      {/* CLOCK */}
      <div
        style={{
          marginLeft: 4,
          marginRight: 4,
          padding: '2px 8px',
          height: 22,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(16,56,150,0.2)',
          border: '1px solid rgba(16,56,150,0.3)',
          borderRadius: 2,
          fontSize: 11,
          fontWeight: 'bold',
          color: '#fff',
          textShadow: '0 1px 1px rgba(0,0,0,0.5)',
          cursor: 'pointer',
          minWidth: 45,
        }}
        title={new Date().toLocaleDateString('pl-PL', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(74,144,226,0.3)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(16,56,150,0.2)';
        }}
      >
        {time}
      </div>
    </div>
  );
}
