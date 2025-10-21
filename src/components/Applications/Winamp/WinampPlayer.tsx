import React, { useRef, useEffect, useState } from 'react';

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
  const [volume, setVolume] = useState(75);
  const [scrollPosition, setScrollPosition] = useState(0);

  // Format time display
  function formatTime(seconds: number) {
    if (isNaN(seconds)) return '0:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  }

  // Scrolling text effect
  useEffect(() => {
    if (!currentTrack || !isPlaying) return;

    const text = `*** ${currentTrack.artist} - ${currentTrack.title} ***  `;
    const interval = setInterval(() => {
      setScrollPosition((prev) => (prev + 1) % (text.length * 8));
    }, 200);

    return () => clearInterval(interval);
  }, [currentTrack, isPlaying]);

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

  // Load and play track when it changes or when isPlaying changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    // Build full URL with encoding for special characters
    const trackPath = currentTrack.url.startsWith('http') ? currentTrack.url : currentTrack.url;

    // Encode the URL to handle spaces and special characters
    const parts = trackPath.split('/');
    const encodedParts = parts.map((part, index) =>
      index === parts.length - 1 ? encodeURIComponent(part) : part
    );
    const encodedPath = encodedParts.join('/');

    const newSrc = trackPath.startsWith('http') ? trackPath : window.location.origin + encodedPath;

    // Only reload if it's a different track
    const currentSrc = audio.src;
    if (currentSrc !== newSrc) {
      console.log('Loading track:', newSrc);
      audio.src = newSrc;
      audio.load();
    }

    // Handle playback
    if (isPlaying) {
      const attemptPlay = () => {
        console.log('Attempting to play...');
        audio.play().catch((err) => {
          console.error('Play error:', err);
          console.log('Audio readyState:', audio.readyState);
          console.log('Audio src:', audio.src);
        });
      };

      // If audio is ready, play immediately
      if (audio.readyState >= 2) {
        attemptPlay();
      } else {
        // Otherwise wait for it to be ready
        console.log('Waiting for audio to be ready...');
        audio.addEventListener('canplay', attemptPlay, { once: true });
        return () => audio.removeEventListener('canplay', attemptPlay);
      }
    } else {
      audio.pause();
    }
  }, [currentTrack, isPlaying]);

  // Volume control
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  const trackText = currentTrack
    ? `*** ${currentTrack.artist} - ${currentTrack.title} ***  `
    : '*** Winamp *** Press Play ***  ';

  return (
    <div style={playerContainerStyle}>
      {/* TITLE BAR */}
      <div style={titleBarStyle}>
        <div style={titleTextStyle}>
          <span style={{ color: '#00FF00' }}>█</span>
          <span>Winamp</span>
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

      {/* MAIN DISPLAY AREA */}
      <div style={mainAreaStyle}>
        {/* CLUTTERBAR (Top section with monstereo/shuffle/repeat) */}
        <div style={clutterbarStyle}>
          <div style={clutterButtonStyle}>O</div>
          <div style={clutterButtonStyle}>A</div>
          <div style={clutterButtonStyle}>I</div>
          <div style={clutterButtonStyle}>D</div>
          <div style={clutterButtonStyle}>V</div>
          <div style={{ flex: 1 }} />
          <div style={clutterButtonStyle}>STEREO</div>
        </div>

        {/* DISPLAY WINDOW */}
        <div style={displayWindowStyle}>
          {/* Visualizer */}
          <div style={visualizerStyle}>
            {[...Array(16)].map((_, i) => (
              <div
                key={i}
                style={{
                  ...visualizerBarStyle,
                  height: isPlaying ? `${Math.random() * 100}%` : '2px',
                }}
              />
            ))}
          </div>

          {/* Time Display */}
          <div style={timeDisplayStyle}>
            <span style={digitStyle}>{formatTime(currentTime)}</span>
          </div>

          {/* Track Info Scrolling */}
          <div style={trackInfoContainerStyle}>
            <div
              style={{
                ...trackInfoScrollStyle,
                transform: `translateX(-${scrollPosition}px)`,
              }}
            >
              {trackText.repeat(3)}
            </div>
          </div>

          {/* Kbps / KHz Display */}
          <div style={bitrateDisplayStyle}>
            <div style={smallDigitStyle}>128</div>
            <div style={smallDigitStyle}>44</div>
          </div>
        </div>

        {/* SPECTRUM ANALYZER */}
        <div style={spectrumStyle}>
          {[...Array(75)].map((_, i) => {
            const height = isPlaying ? Math.random() * 10 : 0;
            const color = height > 7 ? '#FF0000' : height > 4 ? '#FFFF00' : '#00FF00';
            return (
              <div
                key={i}
                style={{
                  width: 2,
                  height: height,
                  backgroundColor: color,
                  alignSelf: 'flex-end',
                }}
              />
            );
          })}
        </div>

        {/* PROGRESS BAR (SEEK BAR) */}
        <div style={seekBarContainerStyle}>
          <div style={seekBarStyle}>
            <div
              style={{
                ...seekBarFillStyle,
                width: duration > 0 ? `${(currentTime / duration) * 100}%` : '0%',
              }}
            />
          </div>
        </div>

        {/* CONTROL BUTTONS */}
        <div style={controlsRowStyle}>
          <div style={controlsLeftStyle}>
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
            <button style={controlBtnMiniStyle} title="Eject">
              ⏏
            </button>
          </div>

          {/* VOLUME SLIDER */}
          <div style={volumeSliderContainerStyle}>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              style={volumeSliderStyle}
              title={`Volume: ${volume}%`}
            />
          </div>

          {/* BALANCE SLIDER */}
          <div style={balanceSliderContainerStyle}>
            <input
              type="range"
              min="-100"
              max="100"
              defaultValue="0"
              style={balanceSliderStyle}
              title="Balance"
            />
          </div>
        </div>

        {/* BOTTOM BUTTONS */}
        <div style={bottomButtonsStyle}>
          <button style={bottomBtnStyle} title="Equalizer">
            EQ
          </button>
          <button style={bottomBtnStyle} title="Playlist">
            PL
          </button>
          <button style={bottomBtnStyle} title="Media Library">
            ML
          </button>
        </div>
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

// STYLES - Classic Winamp Skin
const playerContainerStyle: React.CSSProperties = {
  width: 275,
  height: '100%',
  background: 'linear-gradient(180deg, #6B7C99 0%, #3D4C63 50%, #2A3747 100%)',
  fontFamily: 'Arial, sans-serif',
  userSelect: 'none',
};

const titleBarStyle: React.CSSProperties = {
  height: 14,
  background: 'linear-gradient(180deg, #4A5F7F 0%, #2F3E52 100%)',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 4px',
  borderBottom: '1px solid #000',
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
  padding: '4px 8px 8px 8px',
};

const clutterbarStyle: React.CSSProperties = {
  height: 10,
  display: 'flex',
  alignItems: 'center',
  gap: 2,
  marginBottom: 2,
  fontSize: 7,
};

const clutterButtonStyle: React.CSSProperties = {
  width: 12,
  height: 10,
  fontSize: 6,
  backgroundColor: '#1A2332',
  color: '#7F8FA0',
  border: '1px solid #0F1419',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
};

const displayWindowStyle: React.CSSProperties = {
  height: 26,
  backgroundColor: '#0A0F14',
  border: '2px solid #1A2332',
  display: 'flex',
  alignItems: 'center',
  padding: '2px 4px',
  gap: 4,
  marginBottom: 4,
};

const visualizerStyle: React.CSSProperties = {
  width: 76,
  height: 16,
  backgroundColor: '#000',
  display: 'flex',
  alignItems: 'flex-end',
  gap: 1,
  padding: 1,
};

const visualizerBarStyle: React.CSSProperties = {
  width: 3,
  backgroundColor: '#00FF00',
  transition: 'height 0.1s ease',
};

const timeDisplayStyle: React.CSSProperties = {
  width: 50,
  height: 16,
  backgroundColor: '#000',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const digitStyle: React.CSSProperties = {
  color: '#00FF41',
  fontSize: 13,
  fontFamily: 'monospace',
  fontWeight: 'bold',
  letterSpacing: 1,
};

const trackInfoContainerStyle: React.CSSProperties = {
  flex: 1,
  height: 16,
  backgroundColor: '#000',
  overflow: 'hidden',
  position: 'relative',
};

const trackInfoScrollStyle: React.CSSProperties = {
  color: '#00FF41',
  fontSize: 9,
  fontWeight: 'bold',
  whiteSpace: 'nowrap',
  position: 'absolute',
  transition: 'transform 0.2s linear',
  lineHeight: '16px',
};

const bitrateDisplayStyle: React.CSSProperties = {
  width: 28,
  height: 16,
  backgroundColor: '#000',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 1,
};

const smallDigitStyle: React.CSSProperties = {
  color: '#00FF41',
  fontSize: 7,
  fontFamily: 'monospace',
  fontWeight: 'bold',
};

const spectrumStyle: React.CSSProperties = {
  height: 12,
  backgroundColor: '#000',
  border: '2px solid #1A2332',
  display: 'flex',
  alignItems: 'flex-end',
  gap: 0,
  padding: '1px 2px',
  marginBottom: 4,
};

const seekBarContainerStyle: React.CSSProperties = {
  marginBottom: 6,
};

const seekBarStyle: React.CSSProperties = {
  width: '100%',
  height: 10,
  backgroundColor: '#1A2332',
  border: '1px solid #0F1419',
  position: 'relative',
  cursor: 'pointer',
};

const seekBarFillStyle: React.CSSProperties = {
  height: '100%',
  background: 'linear-gradient(180deg, #5FB75F 0%, #3A8A3A 100%)',
  transition: 'width 0.1s ease',
};

const controlsRowStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  marginBottom: 6,
};

const controlsLeftStyle: React.CSSProperties = {
  display: 'flex',
  gap: 2,
};

const controlBtnStyle: React.CSSProperties = {
  width: 23,
  height: 18,
  backgroundColor: '#3D4C63',
  border: '1px solid #1A2332',
  borderRadius: 2,
  cursor: 'pointer',
  fontSize: 10,
  color: '#D0D8E0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const controlBtnMiniStyle: React.CSSProperties = {
  width: 22,
  height: 16,
  backgroundColor: '#3D4C63',
  border: '1px solid #1A2332',
  borderRadius: 2,
  cursor: 'pointer',
  fontSize: 9,
  color: '#D0D8E0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const volumeSliderContainerStyle: React.CSSProperties = {
  flex: 1,
};

const volumeSliderStyle: React.CSSProperties = {
  width: '100%',
  height: 8,
  cursor: 'pointer',
};

const balanceSliderContainerStyle: React.CSSProperties = {
  width: 40,
};

const balanceSliderStyle: React.CSSProperties = {
  width: '100%',
  height: 8,
  cursor: 'pointer',
};

const bottomButtonsStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  gap: 4,
};

const bottomBtnStyle: React.CSSProperties = {
  width: 22,
  height: 12,
  fontSize: 7,
  fontWeight: 'bold',
  backgroundColor: '#3D4C63',
  color: '#D0D8E0',
  border: '1px solid #1A2332',
  borderRadius: 2,
  cursor: 'pointer',
};
