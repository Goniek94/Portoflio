import React from 'react';

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
  onTrackSelect,
  onClose,
  isVisible,
}: WinampPlaylistProps) {
  if (!isVisible) return null;

  function formatTrackTime(index: number) {
    // Mock times for demo
    const mockTimes = [
      '3:52',
      '3:47',
      '4:35',
      '3:33',
      '2:58',
      '3:27',
      '4:12',
      '3:17',
      '2:45',
      '4:38',
    ];
    return mockTimes[index % mockTimes.length] || '3:30';
  }

  const totalTime = tracks.length * 3.5; // Mock total
  const totalMinutes = Math.floor(totalTime);
  const totalSeconds = Math.floor((totalTime % 1) * 60);

  return (
    <div style={playlistContainerStyle}>
      {/* TITLE BAR */}
      <div style={titleBarStyle}>
        <div style={titleTextStyle}>
          <span style={{ color: '#00FF00' }}>█</span>
          <span>WINAMP PLAYLIST</span>
        </div>
        <div style={titleButtonsStyle}>
          <button style={titleBtnStyle} title="Minimize">
            _
          </button>
          <button style={titleBtnStyle} title="Shade">
            ▴
          </button>
          <button style={titleBtnStyle} onClick={onClose} title="Close">
            ✕
          </button>
        </div>
      </div>

      {/* MAIN AREA */}
      <div style={mainAreaStyle}>
        {/* HEADER */}
        <div style={headerStyle}>
          <div style={headerColumnStyle}>
            <span style={headerTextStyle}>#</span>
          </div>
          <div style={headerColumnTitleStyle}>
            <span style={headerTextStyle}>Title</span>
          </div>
          <div style={headerColumnTimeStyle}>
            <span style={headerTextStyle}>Time</span>
          </div>
        </div>

        {/* PLAYLIST CONTENT */}
        <div style={playlistContentStyle}>
          {tracks.map((track, index) => {
            const isCurrentTrack = index === currentIndex;
            const displayNumber = (index + 1).toString().padStart(2, ' ');

            return (
              <div
                key={index}
                style={{
                  ...playlistItemStyle,
                  backgroundColor: isCurrentTrack ? '#0000FF' : '#000',
                }}
                onClick={() => onTrackSelect(index)}
                onMouseEnter={(e) => {
                  if (!isCurrentTrack) {
                    e.currentTarget.style.backgroundColor = '#1A2332';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isCurrentTrack) {
                    e.currentTarget.style.backgroundColor = '#000';
                  }
                }}
              >
                {/* Track Number */}
                <div style={trackNumberColumnStyle}>
                  <span style={trackNumberTextStyle}>{displayNumber}</span>
                </div>

                {/* Track Title and Artist */}
                <div style={trackTitleColumnStyle}>
                  <span style={trackTextStyle}>
                    {track.artist} - {track.title}
                  </span>
                </div>

                {/* Track Time */}
                <div style={trackTimeColumnStyle}>
                  <span style={trackTextStyle}>{formatTrackTime(index)}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ACTION BUTTONS */}
        <div style={actionButtonsStyle}>
          <button style={actionBtnStyle} title="Add File">
            ADD
          </button>
          <button style={actionBtnStyle} title="Remove">
            REM
          </button>
          <button style={actionBtnStyle} title="Select All">
            SEL
          </button>
          <button style={actionBtnStyle} title="Miscellaneous">
            MISC
          </button>
          <button style={actionBtnStyle} title="List">
            LIST
          </button>
        </div>

        {/* INFO BAR */}
        <div style={infoBarStyle}>
          <div style={infoTextStyle}>
            {tracks.length} file{tracks.length !== 1 ? 's' : ''} • {totalMinutes}:
            {totalSeconds.toString().padStart(2, '0')}
          </div>
        </div>
      </div>
    </div>
  );
}

// STYLES - Classic Winamp Playlist
const playlistContainerStyle: React.CSSProperties = {
  position: 'fixed',
  top: 60,
  left: 350,
  width: 275,
  height: 232,
  background: 'linear-gradient(180deg, #6B7C99 0%, #3D4C63 50%, #2A3747 100%)',
  border: '2px solid #000',
  borderRadius: 2,
  fontFamily: 'Arial, sans-serif',
  userSelect: 'none',
  zIndex: 9998,
  boxShadow: '2px 2px 8px rgba(0,0,0,0.5)',
  display: 'flex',
  flexDirection: 'column',
};

const titleBarStyle: React.CSSProperties = {
  height: 14,
  background: 'linear-gradient(180deg, #4A5F7F 0%, #2F3E52 100%)',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 4px',
  borderBottom: '1px solid #000',
  cursor: 'move',
};

const titleTextStyle: React.CSSProperties = {
  color: '#D0D8E0',
  fontSize: 9,
  fontWeight: 'bold',
  display: 'flex',
  alignItems: 'center',
  gap: 3,
};

const titleButtonsStyle: React.CSSProperties = {
  display: 'flex',
  gap: 2,
};

const titleBtnStyle: React.CSSProperties = {
  width: 9,
  height: 9,
  fontSize: 7,
  backgroundColor: '#2F3E52',
  color: '#D0D8E0',
  border: '1px solid #1A2332',
  cursor: 'pointer',
  padding: 0,
  lineHeight: '7px',
};

const mainAreaStyle: React.CSSProperties = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  padding: '4px 8px 8px 8px',
};

const headerStyle: React.CSSProperties = {
  height: 14,
  display: 'flex',
  backgroundColor: '#1A2332',
  border: '1px solid #0F1419',
  marginBottom: 2,
};

const headerColumnStyle: React.CSSProperties = {
  width: 30,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRight: '1px solid #0F1419',
};

const headerColumnTitleStyle: React.CSSProperties = {
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  paddingLeft: 4,
  borderRight: '1px solid #0F1419',
};

const headerColumnTimeStyle: React.CSSProperties = {
  width: 40,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const headerTextStyle: React.CSSProperties = {
  color: '#7F8FA0',
  fontSize: 8,
  fontWeight: 'bold',
};

const playlistContentStyle: React.CSSProperties = {
  flex: 1,
  backgroundColor: '#000',
  border: '2px solid #1A2332',
  overflow: 'auto',
  marginBottom: 4,
};

const playlistItemStyle: React.CSSProperties = {
  display: 'flex',
  height: 13,
  cursor: 'pointer',
  borderBottom: '1px solid #0A0F14',
  transition: 'background-color 0.1s ease',
};

const trackNumberColumnStyle: React.CSSProperties = {
  width: 30,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRight: '1px solid #0A0F14',
};

const trackNumberTextStyle: React.CSSProperties = {
  color: '#00FF41',
  fontSize: 9,
  fontFamily: 'monospace',
  fontWeight: 'bold',
};

const trackTitleColumnStyle: React.CSSProperties = {
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  paddingLeft: 4,
  borderRight: '1px solid #0A0F14',
  overflow: 'hidden',
};

const trackTextStyle: React.CSSProperties = {
  color: '#00FF41',
  fontSize: 9,
  fontWeight: 'bold',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};

const trackTimeColumnStyle: React.CSSProperties = {
  width: 40,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const actionButtonsStyle: React.CSSProperties = {
  display: 'flex',
  gap: 2,
  marginBottom: 4,
  justifyContent: 'center',
};

const actionBtnStyle: React.CSSProperties = {
  height: 14,
  padding: '0 8px',
  fontSize: 7,
  fontWeight: 'bold',
  backgroundColor: '#3D4C63',
  color: '#D0D8E0',
  border: '1px solid #1A2332',
  borderRadius: 2,
  cursor: 'pointer',
};

const infoBarStyle: React.CSSProperties = {
  height: 14,
  backgroundColor: '#1A2332',
  border: '1px solid #0F1419',
  display: 'flex',
  alignItems: 'center',
  padding: '0 4px',
};

const infoTextStyle: React.CSSProperties = {
  color: '#7F8FA0',
  fontSize: 8,
  fontWeight: 'bold',
};
