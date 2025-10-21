import React from 'react';

/* ---------- MAIN TASKBAR STYLES ---------- */
export const taskbarStyle: React.CSSProperties = {
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
};

/* ---------- SEPARATOR STYLES ---------- */
export const separatorStyle: React.CSSProperties = {
  width: 2,
  height: 22,
  background: 'linear-gradient(90deg, rgba(16,56,150,0.8) 0%, rgba(74,144,226,0.3) 100%)',
  borderLeft: '1px solid rgba(16,56,150,0.5)',
  borderRight: '1px solid rgba(74,144,226,0.3)',
};

/* ---------- START BUTTON STYLES ---------- */
export const getStartButtonStyle = (isActive: boolean): React.CSSProperties => ({
  marginLeft: 2,
  height: 24,
  padding: '0 12px 0 6px',
  background: isActive
    ? 'linear-gradient(180deg, #2D8C2D 0%, #4DB84D 50%, #2D8C2D 100%)'
    : 'linear-gradient(180deg, #5EAC5E 0%, #5EDB5E 18%, #4DB84D 50%, #3FA33F 82%, #2D8C2D 100%)',
  border: isActive ? '1px solid #1A6B1A' : '1px solid #2D8C2D',
  borderRadius: '0 3px 3px 0',
  boxShadow: isActive
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
});

export const startButtonHoverGradient =
  'linear-gradient(180deg, #6EBC6E 0%, #6EEB6E 18%, #5DC85D 50%, #4FB34F 82%, #3D9C3D 100%)';

export const startButtonNormalGradient =
  'linear-gradient(180deg, #5EAC5E 0%, #5EDB5E 18%, #4DB84D 50%, #3FA33F 82%, #2D8C2D 100%)';

/* ---------- QUICK LAUNCH STYLES ---------- */
export const quickLaunchContainerStyle: React.CSSProperties = {
  marginLeft: 2,
  height: 24,
  display: 'flex',
  alignItems: 'center',
  gap: 3,
  padding: '0 6px 0 4px',
};

export const quickLaunchButtonStyle: React.CSSProperties = {
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
};

/* ---------- WINDOW BUTTON STYLES ---------- */
export const windowButtonsContainerStyle: React.CSSProperties = {
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  gap: 2,
  padding: '0 4px',
  overflowX: 'auto',
  scrollbarWidth: 'thin',
  scrollbarColor: 'rgba(255,255,255,0.3) transparent',
};

export const getWindowButtonStyle = (isActive: boolean): React.CSSProperties => ({
  height: 22,
  minWidth: 100,
  maxWidth: 160,
  padding: '0 8px',
  background: isActive
    ? 'linear-gradient(180deg, #1941A5 0%, #245EDC 50%, #245EDC 100%)'
    : 'linear-gradient(180deg, #3F8CF3 0%, #3F8CF3 9%, #2E75E3 45%, #245EDC 55%, #1D4FB5 100%)',
  border: isActive ? '1px solid #0831D9' : '1px solid rgba(255,255,255,0.2)',
  borderRadius: 3,
  boxShadow: isActive ? 'inset 0 1px 2px rgba(0,0,0,0.3)' : '0 1px 0 rgba(255,255,255,0.4) inset',
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
});

export const windowButtonHoverGradient =
  'linear-gradient(180deg, #4F9CFF 0%, #4F9CFF 9%, #3E85F3 45%, #2E75E3 55%, #2D5FC5 100%)';

export const windowButtonNormalGradient =
  'linear-gradient(180deg, #3F8CF3 0%, #3F8CF3 9%, #2E75E3 45%, #245EDC 55%, #1D4FB5 100%)';

/* ---------- SYSTEM TRAY STYLES ---------- */
export const systemTrayContainerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  height: 24,
  padding: '0 8px',
  marginLeft: 4,
  borderLeft: '2px solid rgba(16,56,150,0.8)',
  background: 'rgba(16,56,150,0.15)',
};

export const hideIconsButtonStyle: React.CSSProperties = {
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
};

export const trayIconStyle: React.CSSProperties = {
  fontSize: 14,
  cursor: 'pointer',
  padding: 2,
  borderRadius: 2,
  transition: 'background 0.1s',
};

/* ---------- CLOCK STYLES ---------- */
export const clockStyle: React.CSSProperties = {
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
};
