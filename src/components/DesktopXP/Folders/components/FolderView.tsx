import React from 'react';

interface FolderViewProps {
  title: string;
  children: React.ReactNode;
}

export default function FolderView({ title, children }: FolderViewProps) {
  return (
    <div style={containerStyle}>
      {/* Toolbar */}
      <div style={toolbarStyle}>
        <div style={toolbarButtonsStyle}>
          <button style={toolbarButtonStyle}>◀ Back</button>
          <button style={toolbarButtonStyle}>▶</button>
          <button style={toolbarButtonStyle}>🔼</button>
        </div>
        <div style={addressBarStyle}>
          <span style={{ marginRight: '8px' }}>📁</span>
          <input type="text" value={`C:\\Documents\\${title}`} readOnly style={addressInputStyle} />
        </div>
      </div>

      {/* Sidebar + Content */}
      <div style={mainAreaStyle}>
        {/* Left Sidebar */}
        <div style={sidebarStyle}>
          <div style={sidebarSectionStyle}>
            <div style={sidebarTitleStyle}>File and Folder Tasks</div>
            <div style={sidebarLinkStyle}>📁 Make a new folder</div>
            <div style={sidebarLinkStyle}>📤 Publish this folder to the Web</div>
          </div>

          <div style={sidebarSectionStyle}>
            <div style={sidebarTitleStyle}>Other Places</div>
            <div style={sidebarLinkStyle}>💻 My Computer</div>
            <div style={sidebarLinkStyle}>📂 My Documents</div>
            <div style={sidebarLinkStyle}>🌐 My Network Places</div>
          </div>

          <div style={sidebarSectionStyle}>
            <div style={sidebarTitleStyle}>Details</div>
          </div>
        </div>

        {/* Content Area */}
        <div style={contentAreaStyle}>{children}</div>
      </div>
    </div>
  );
}

// Styles
const containerStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'white',
  fontFamily: 'Tahoma, Arial, sans-serif',
  fontSize: '11px',
};

const toolbarStyle: React.CSSProperties = {
  backgroundColor: '#F1F1F1',
  borderBottom: '1px solid #C0C0C0',
  padding: '4px 8px',
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
};

const toolbarButtonsStyle: React.CSSProperties = {
  display: 'flex',
  gap: '2px',
};

const toolbarButtonStyle: React.CSSProperties = {
  padding: '2px 8px',
  backgroundColor: 'white',
  border: '1px solid #ADADAD',
  cursor: 'pointer',
  fontSize: '11px',
};

const addressBarStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  backgroundColor: 'white',
  border: '1px inset #DFDFDF',
  padding: '2px 4px',
};

const addressInputStyle: React.CSSProperties = {
  flex: 1,
  border: 'none',
  outline: 'none',
  fontSize: '11px',
  backgroundColor: 'transparent',
};

const mainAreaStyle: React.CSSProperties = {
  flex: 1,
  display: 'flex',
  overflow: 'hidden',
};

const sidebarStyle: React.CSSProperties = {
  width: '200px',
  backgroundColor: '#D4E3FF',
  borderRight: '1px solid #C0C0C0',
  padding: '8px',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  overflowY: 'auto',
};

const sidebarSectionStyle: React.CSSProperties = {
  backgroundColor: 'rgba(255, 255, 255, 0.6)',
  border: '1px solid #6B9DD6',
  borderRadius: '4px',
  padding: '8px',
};

const sidebarTitleStyle: React.CSSProperties = {
  fontWeight: 'bold',
  color: '#003399',
  marginBottom: '8px',
  fontSize: '11px',
};

const sidebarLinkStyle: React.CSSProperties = {
  color: '#0066CC',
  cursor: 'pointer',
  padding: '4px 0',
  fontSize: '11px',
};

const contentAreaStyle: React.CSSProperties = {
  flex: 1,
  backgroundColor: 'white',
  padding: '16px',
  overflowY: 'auto',
};
