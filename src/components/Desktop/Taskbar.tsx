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

/* Quick Launch – jedna ikonka Explorer */
const QUICK = [
  { id: 'explorer', icon: '/Icons/Explorer.png', title: 'Internet Explorer' },
];

/* Tray – można dodać później */
const TRAY: { id: string; icon: string; title: string; always?: boolean }[] = [];

export default function Taskbar({ 
  windows,
  onWindowRestore, 
  onWindowFocus,
  onStartClick,
  showStartMenu = false
}: TaskbarProps) {
  /* Zegar */
  const [time, setTime] = useState(
    new Date().toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' }),
  );
  
  useEffect(() => {
    const h = setInterval(() => {
      setTime(new Date().toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' }));
    }, 60_000);
    return () => clearInterval(h);
  }, []);

  // Filtruj okna do pokazania na taskbar (nie fullscreen)
  const taskbarWindows = windows.filter(w => 
    w.isVisible && w.type !== 'fullscreen'
  );

  return (
    <div
      style={{
        position: 'fixed', // ✅ Fixed zamiast absolute
        left: 0,
        right: 0,
        bottom: 0,
        height: 30,
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(#245edb 0%, #1941a5 100%)',
        borderTop: '1px solid #0831d9',
        boxShadow: '0 -1px 1px rgba(255,255,255,.2) inset',
        fontFamily: 'Tahoma,"MS Sans Serif",sans-serif',
        zIndex: 10000, // ✅ Wysoki z-index
      }}
    >
      {/* ---------- Start ---------- */}
      <button
        onClick={onStartClick}
        style={{
          marginLeft: 2,
          height: 24,
          padding: 0,
          border: showStartMenu ? '1px inset #44c744' : '1px outset #44c744',
          borderRadius: 2,
          cursor: 'pointer',
        }}
      >
        <img
          src={showStartMenu ? '/Icons/Startdown.png' : '/Icons/Start.png'}
          width={90}
          height={24}
          alt=""
          draggable={false}
        />
      </button>

      {/* separator */}
      <div
        style={{
          marginLeft: 4,
          width: 1,
          height: 20,
          background: 'linear-gradient(#0831d9,#4a90e2)',
        }}
      />

      {/* ---------- Quick Launch ---------- */}
      <div
        style={{
          marginLeft: 4,
          height: 24,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          padding: '0 4px',
          borderLeft: '1px solid #0831d9',
          borderRight: '1px solid #4a90e2',
        }}
      >
        {QUICK.map(item => (
          <img
            key={item.id}
            src={item.icon}
            width={16}
            height={16}
            alt=""
            title={item.title}
            style={{ border: '1px outset #d0d0d0', borderRadius: 1, cursor: 'pointer' }}
            onMouseEnter={e => (e.currentTarget.style.border = '1px inset #d0d0d0')}
            onMouseLeave={e => (e.currentTarget.style.border = '1px outset #d0d0d0')}
          />
        ))}
      </div>

      {/* separator */}
      <div
        style={{
          marginLeft: 4,
          width: 1,
          height: 20,
          background: 'linear-gradient(#0831d9,#4a90e2)',
        }}
      />

      {/* ---------- 🆕 PRZYCISKI ZADAŃ ---------- */}
      <div style={{ 
        flex: 1, 
        display: 'flex', 
        alignItems: 'center', 
        gap: 2, 
        padding: '0 4px',
        overflowX: 'auto' 
      }}>
        {taskbarWindows.map(window => {
          const isActive = !window.isMinimized;
          
          const taskButtonStyle = {
            height: '22px',
            minWidth: '120px',
            maxWidth: '160px',
            backgroundColor: isActive ? '#C0C0C0' : '#E0E0E0',
            background: isActive 
              ? 'linear-gradient(to bottom, #B0B0B0, #A0A0A0)'
              : 'linear-gradient(to bottom, #E0E0E0, #C0C0C0)',
            border: isActive ? '1px inset #C0C0C0' : '1px outset #C0C0C0',
            padding: '0 8px',
            cursor: 'pointer',
            fontSize: '11px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            whiteSpace: 'nowrap' as const,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            color: '#000'
          };
          
          return (
            <button
              key={window.id}
              style={taskButtonStyle}
              onClick={() => {
                if (window.isMinimized) {
                  onWindowRestore(window.id);
                } else {
                  onWindowFocus(window.id);
                }
              }}
              title={window.title}
            >
              <span style={{ fontSize: '12px' }}>{window.icon}</span>
              <span>{window.title}</span>
            </button>
          );
        })}
      </div>

      {/* ---------- (pusty) tray ---------- */}
      {TRAY.length > 0 && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            height: 24,
            padding: '0 4px',
            borderLeft: '1px solid #0831d9',
          }}
        >
          {TRAY.map(t => (
            <img key={t.id} src={t.icon} width={16} height={16} alt="" title={t.title} />
          ))}
        </div>
      )}

      {/* ---------- Clock ---------- */}
      <div
        title={new Date().toLocaleDateString('pl-PL', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
        style={{
          marginRight: 4,
          padding: '2px 6px',
          background: 'rgba(0,0,0,.1)',
          border: '1px inset #245edb',
          borderRadius: 1,
          fontSize: 11,
          color: '#fff',
        }}
      >
        {time}
      </div>
    </div>
  );
}