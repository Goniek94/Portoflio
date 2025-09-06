import React, { useRef, useEffect } from 'react';

interface Track {
  title: string;
  artist: string;
  url: string;
}

interface WinampPlayerProps {
  currentTrack: Track | null;
  currentTime: number;
  duration: number;
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  onStop: () => void;
  onNext: () => void;
  onPrev: () => void;
  onTimeUpdate: (time: number) => void;
  onLoadedMetadata: (duration: number) => void;
  onTrackEnded: () => void;
  onClose: () => void;
}

export default function WinampPlayer({
  currentTrack,
  currentTime,
  duration,
  isPlaying,
  onPlay,
  onPause,
  onStop,
  onNext,
  onPrev,
  onTimeUpdate,
  onLoadedMetadata,
  onTrackEnded,
  onClose,
}: WinampPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Format czasu
  function formatTime(seconds: number) {
    if (isNaN(seconds)) return '00:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }

  // Audio event handlers
  function handleLoadedMetadata() {
    if (audioRef.current) {
      onLoadedMetadata(audioRef.current.duration);
    }
  }

  function handleTimeUpdate() {
    if (audioRef.current) {
      onTimeUpdate(audioRef.current.currentTime);
    }
  }

  // Auto-load przy zmianie utworu
  useEffect(() => {
    if (audioRef.current && currentTrack) {
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch((err) => {
          console.log('Autoplay blocked:', err);
        });
      }
    }
  }, [currentTrack, isPlaying]); // ✅ Dodano isPlaying

  // Play/Pause sync
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch((err) => console.log('Play error:', err));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  return (
    <div style={playerContainerStyle}>
      {/* Title Bar */}
      <div style={titleBarStyle}>
        <div style={titleTextStyle}>
          <span style={winampLogoStyle}>Winamp</span>
          <span style={versionStyle}>2.95</span>
        </div>
        <div style={titleButtonsStyle}>
          <button style={titleBtnStyle}>_</button>
          <button style={titleBtnStyle}>□</button>
          <button style={titleBtnStyle} onClick={onClose}>
            ✕
          </button>
        </div>
      </div>

      {/* Main Display */}
      <div style={mainDisplayStyle}>
        {/* Left Side - Time Display */}
        <div style={timeDisplayStyle}>
          <div style={digitalDisplayStyle}>{formatTime(currentTime)}</div>
        </div>

        {/* Center - Track Info */}
        <div style={trackInfoStyle}>
          <div style={scrollingTextStyle}>
            {currentTrack
              ? `${currentTrack.artist} - ${currentTrack.title}`
              : 'Winamp *** Please select a file *** Winamp'}
          </div>
        </div>

        {/* Right Side - Kbps/kHz */}
        <div style={infoDisplayStyle}>
          <div style={digitalDisplayStyle}>128</div>
          <div style={digitalDisplayStyle}>44</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div style={progressSectionStyle}>
        <div style={progressBarContainerStyle}>
          <div
            style={{
              ...progressBarStyle,
              width: duration > 0 ? `${(currentTime / duration) * 100}%` : '0%',
            }}
          />
          <div style={progressHandleStyle} />
        </div>
      </div>

      {/* Controls */}
      <div style={controlsStyle}>
        <button style={controlBtnStyle} onClick={onPrev} title="Previous">
          ⏮
        </button>
        <button style={controlBtnStyle} onClick={onPlay} title="Play">
          ▶
        </button>
        <button style={controlBtnStyle} onClick={onPause} title="Pause">
          ⏸
        </button>
        <button style={controlBtnStyle} onClick={onStop} title="Stop">
          ⏹
        </button>
        <button style={controlBtnStyle} onClick={onNext} title="Next">
          ⏭
        </button>
      </div>

      {/* Volume & Balance */}
      <div style={volumeSectionStyle}>
        <div style={volumeControlStyle}>
          <span>Volume</span>
          <div style={sliderStyle}>
            <div style={sliderHandleStyle} />
          </div>
        </div>
        <div style={balanceControlStyle}>
          <span>Balance</span>
          <div style={sliderStyle}>
            <div style={sliderHandleStyle} />
          </div>
        </div>
      </div>

      {/* Bottom Buttons */}
      <div style={bottomButtonsStyle}>
        <button style={bottomBtnStyle}>EQ</button>
        <button style={bottomBtnStyle}>PL</button>
        <button style={bottomBtnStyle}>ML</button>
      </div>

      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src={currentTrack ? currentTrack.url : ''}
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        onEnded={onTrackEnded}
        preload="metadata"
      />
    </div>
  );
}

// STYLES - Oryginalny Winamp wygląd
const playerContainerStyle: React.CSSProperties = {
  position: 'fixed',
  top: 100,
  left: 100,
  width: 275,
  height: 116,
  backgroundColor: '#C0C0C0',
  border: '2px outset #C0C0C0',
  fontFamily: 'Tahoma, Arial, sans-serif',
  fontSize: '8px',
  userSelect: 'none',
  zIndex: 10000,
};

const titleBarStyle: React.CSSProperties = {
  height: '14px',
  background: 'linear-gradient(to bottom, #0050A0, #003875)',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 2px',
  cursor: 'move',
};

const titleTextStyle: React.CSSProperties = {
  color: 'white',
  fontSize: '8px',
  display: 'flex',
  gap: '4px',
};

const winampLogoStyle: React.CSSProperties = {
  fontWeight: 'bold',
};

const versionStyle: React.CSSProperties = {
  color: '#FFD700',
};

const titleButtonsStyle: React.CSSProperties = {
  display: 'flex',
  gap: '1px',
};

const titleBtnStyle: React.CSSProperties = {
  width: '12px',
  height: '9px',
  fontSize: '6px',
  border: '1px outset #C0C0C0',
  backgroundColor: '#C0C0C0',
  cursor: 'pointer',
  padding: '0',
};

const mainDisplayStyle: React.CSSProperties = {
  height: '20px',
  backgroundColor: '#000',
  display: 'flex',
  alignItems: 'center',
  margin: '4px',
  border: '1px inset #808080',
};

const timeDisplayStyle: React.CSSProperties = {
  width: '60px',
  textAlign: 'center',
};

const digitalDisplayStyle: React.CSSProperties = {
  color: '#00FF00',
  fontFamily: 'monospace',
  fontSize: '11px',
  fontWeight: 'bold',
};

const trackInfoStyle: React.CSSProperties = {
  flex: 1,
  overflow: 'hidden',
  padding: '0 4px',
};

const scrollingTextStyle: React.CSSProperties = {
  color: '#00FF00',
  fontSize: '8px',
  whiteSpace: 'nowrap',
};

const infoDisplayStyle: React.CSSProperties = {
  width: '40px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  fontSize: '6px',
};

const progressSectionStyle: React.CSSProperties = {
  padding: '4px 8px',
};

const progressBarContainerStyle: React.CSSProperties = {
  width: '100%',
  height: '10px',
  backgroundColor: '#404040',
  border: '1px inset #808080',
  position: 'relative',
  cursor: 'pointer',
};

const progressBarStyle: React.CSSProperties = {
  height: '100%',
  backgroundColor: '#008000',
  transition: 'width 0.1s ease',
};

const progressHandleStyle: React.CSSProperties = {
  position: 'absolute',
  right: '0',
  top: '0',
  width: '8px',
  height: '10px',
  backgroundColor: '#C0C0C0',
  border: '1px outset #C0C0C0',
  cursor: 'grab',
};

const controlsStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  gap: '2px',
  padding: '4px',
};

const controlBtnStyle: React.CSSProperties = {
  width: '23px',
  height: '18px',
  border: '1px outset #C0C0C0',
  backgroundColor: '#C0C0C0',
  cursor: 'pointer',
  fontSize: '8px',
};

const volumeSectionStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '2px 8px',
  fontSize: '6px',
};

const volumeControlStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
};

const balanceControlStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
};

const sliderStyle: React.CSSProperties = {
  width: '50px',
  height: '8px',
  backgroundColor: '#404040',
  border: '1px inset #808080',
  position: 'relative',
};

const sliderHandleStyle: React.CSSProperties = {
  position: 'absolute',
  left: '50%',
  top: '0',
  width: '6px',
  height: '8px',
  backgroundColor: '#C0C0C0',
  border: '1px outset #C0C0C0',
  cursor: 'grab',
};

const bottomButtonsStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  gap: '2px',
  padding: '2px',
};

const bottomBtnStyle: React.CSSProperties = {
  width: '22px',
  height: '12px',
  fontSize: '6px',
  border: '1px outset #C0C0C0',
  backgroundColor: '#C0C0C0',
  cursor: 'pointer',
};
