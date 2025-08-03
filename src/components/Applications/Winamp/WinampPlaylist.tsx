import React from "react";

interface Track {
  title: string;
  artist: string;
  url: string;
}

interface WinampPlaylistProps {
  tracks: Track[];
  currentIndex: number | null;
  isPlaying: boolean;
  onTrackSelect: (index: number) => void;
  onClose: () => void;
  isVisible: boolean;
}

export default function WinampPlaylist({
  tracks,
  currentIndex,
  isPlaying,
  onTrackSelect,
  onClose,
  isVisible
}: WinampPlaylistProps) {

  if (!isVisible) return null;

  function formatTrackTime(index: number) {
    // Mock times - w prawdziwym Winampie to byłyby rzeczywiste długości
    const mockTimes = ["3:45", "4:12", "2:58", "3:33", "4:01", "3:27"];
    return mockTimes[index % mockTimes.length] || "3:30";
  }

  return (
    <div style={playlistContainerStyle}>
      {/* Title Bar */}
      <div style={titleBarStyle}>
        <div style={titleTextStyle}>
          <span>Winamp Playlist Editor</span>
        </div>
        <div style={titleButtonsStyle}>
          <button style={titleBtnStyle}>_</button>
          <button style={titleBtnStyle}>□</button>
          <button style={titleBtnStyle} onClick={onClose}>✕</button>
        </div>
      </div>

      {/* Menu Bar */}
      <div style={menuBarStyle}>
        <span style={menuItemStyle}>File</span>
        <span style={menuItemStyle}>Edit</span>
        <span style={menuItemStyle}>View</span>
        <span style={menuItemStyle}>Help</span>
      </div>

      {/* Toolbar */}
      <div style={toolbarStyle}>
        <button style={toolbarBtnStyle} title="Add File">📄+</button>
        <button style={toolbarBtnStyle} title="Add Directory">📁+</button>
        <button style={toolbarBtnStyle} title="Add URL">🌐+</button>
        <div style={separatorStyle} />
        <button style={toolbarBtnStyle} title="Remove Selected">🗑️</button>
        <button style={toolbarBtnStyle} title="Clear Playlist">🧹</button>
        <div style={separatorStyle} />
        <button style={toolbarBtnStyle} title="Shuffle">🔀</button>
        <button style={toolbarBtnStyle} title="Repeat">🔁</button>
      </div>

      {/* Column Headers */}
      <div style={headerStyle}>
        <div style={columnHeaderStyle}>#</div>
        <div style={columnHeaderStyle}>Title</div>
        <div style={columnHeaderStyle}>Time</div>
      </div>

      {/* Playlist Content */}
      <div style={playlistContentStyle}>
        {tracks.map((track, index) => (
          <div
            key={index}
            style={{
              ...playlistItemStyle,
              backgroundColor: index === currentIndex ? "#316AC5" : "transparent",
              color: index === currentIndex ? "white" : "#000"
            }}
            onClick={() => onTrackSelect(index)}
            onDoubleClick={() => onTrackSelect(index)}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = index === currentIndex ? "#316AC5" : "#E0E0E0";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = index === currentIndex ? "#316AC5" : "transparent";
            }}
          >
            {/* Track Number */}
            <div style={trackNumberStyle}>
              {index === currentIndex && isPlaying ? "▶" : (index + 1).toString()}
            </div>
            
            {/* Track Info */}
            <div style={trackInfoColumnStyle}>
              <div style={trackTitleStyle}>
                {track.title}
              </div>
              <div style={trackArtistStyle}>
                {track.artist}
              </div>
            </div>
            
            {/* Track Time */}
            <div style={trackTimeStyle}>
              {formatTrackTime(index)}
            </div>
          </div>
        ))}
      </div>

      {/* Status Bar */}
      <div style={statusBarStyle}>
        <span>{tracks.length} files • Total time: {Math.floor(tracks.length * 3.5)}:30</span>
        <span style={statusRightStyle}>
          {currentIndex !== null ? `${currentIndex + 1}/${tracks.length}` : "0/0"}
        </span>
      </div>
    </div>
  );
}

// STYLES - Oryginalny wygląd Winamp Playlist
const playlistContainerStyle: React.CSSProperties = {
  position: "fixed",
  top: 100,
  left: 380,
  width: 275,
  height: 232,
  backgroundColor: "#C0C0C0",
  border: "2px outset #C0C0C0",
  fontFamily: "Tahoma, Arial, sans-serif",
  fontSize: "8px",
  userSelect: "none",
  zIndex: 9999,
  display: "flex",
  flexDirection: "column"
};

const titleBarStyle: React.CSSProperties = {
  height: "14px",
  background: "linear-gradient(to bottom, #0050A0, #003875)",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0 2px",
  cursor: "move"
};

const titleTextStyle: React.CSSProperties = {
  color: "white",
  fontSize: "8px"
};

const titleButtonsStyle: React.CSSProperties = {
  display: "flex",
  gap: "1px"
};

const titleBtnStyle: React.CSSProperties = {
  width: "12px",
  height: "9px",
  fontSize: "6px",
  border: "1px outset #C0C0C0",
  backgroundColor: "#C0C0C0",
  cursor: "pointer",
  padding: "0"
};

const menuBarStyle: React.CSSProperties = {
  height: "16px",
  backgroundColor: "#C0C0C0",
  display: "flex",
  alignItems: "center",
  padding: "0 4px",
  borderBottom: "1px solid #808080"
};

const menuItemStyle: React.CSSProperties = {
  padding: "2px 8px",
  cursor: "pointer",
  fontSize: "8px"
};

const toolbarStyle: React.CSSProperties = {
  height: "20px",
  backgroundColor: "#C0C0C0",
  display: "flex",
  alignItems: "center",
  padding: "2px",
  borderBottom: "1px solid #808080",
  gap: "2px"
};

const toolbarBtnStyle: React.CSSProperties = {
  width: "18px",
  height: "16px",
  fontSize: "8px",
  border: "1px outset #C0C0C0",
  backgroundColor: "#C0C0C0",
  cursor: "pointer"
};

const separatorStyle: React.CSSProperties = {
  width: "1px",
  height: "14px",
  backgroundColor: "#808080",
  margin: "0 2px"
};

const headerStyle: React.CSSProperties = {
  height: "16px",
  backgroundColor: "#E0E0E0",
  display: "flex",
  alignItems: "center",
  borderBottom: "1px solid #808080",
  fontSize: "8px",
  fontWeight: "bold"
};

const columnHeaderStyle: React.CSSProperties = {
  padding: "2px 4px",
  borderRight: "1px solid #808080",
  cursor: "pointer"
};

const playlistContentStyle: React.CSSProperties = {
  flex: 1,
  backgroundColor: "white",
  overflow: "auto",
  border: "1px inset #C0C0C0"
};

const playlistItemStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  height: "18px",
  cursor: "pointer",
  borderBottom: "1px solid #F0F0F0",
  fontSize: "8px",
  transition: "background-color 0.1s ease"  // ✅ Smooth hover
};

const trackNumberStyle: React.CSSProperties = {
  width: "30px",
  textAlign: "center",
  borderRight: "1px solid #E0E0E0",
  fontWeight: "bold"
};

const trackInfoColumnStyle: React.CSSProperties = {
  flex: 1,
  padding: "0 4px",
  overflow: "hidden"
};

const trackTitleStyle: React.CSSProperties = {
  fontWeight: "bold",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis"
};

const trackArtistStyle: React.CSSProperties = {
  fontSize: "7px",
  color: "#666",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis"
};

const trackTimeStyle: React.CSSProperties = {
  width: "40px",
  textAlign: "right",
  padding: "0 4px",
  borderLeft: "1px solid #E0E0E0",
  fontFamily: "monospace"
};

const statusBarStyle: React.CSSProperties = {
  height: "16px",
  backgroundColor: "#C0C0C0",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0 4px",
  borderTop: "1px solid #808080",
  fontSize: "7px"
};

const statusRightStyle: React.CSSProperties = {
  fontWeight: "bold"
};