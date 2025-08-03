import React, { useState } from "react";
import WinampPlayer from "./WinampPlayer";
import WinampPlaylist from "./WinampPlaylist";

interface Track {
  title: string;
  artist: string;
  url: string;
}

interface WinampWindowProps {
  onClose: () => void;
}

// 👇 HITY Z LAT 2000 - NOSTALGIA PACK! 🎵 (bez Windows Startup - to tylko do bootowania! 😂)
const tracks: Track[] = [
  {
    title: "Crazy Frog",
    artist: "Crazy Frog",
    url: "/sound/CrazyFrog.mp3"  // ✅ Masz już
  },
  
  // 🎸 LINKIN PARK CLASSICS
  {
    title: "In the End",
    artist: "Linkin Park",
    url: "/sound/linkin_park_in_the_end.mp3"
  },
  {
    title: "Numb", 
    artist: "Linkin Park",
    url: "/sound/linkin_park_numb.mp3"
  },
  
  // 👑 BRITNEY CLASSICS
  {
    title: "Oops!... I Did It Again",
    artist: "Britney Spears",
    url: "/sound/britney_oops.mp3"
  },
  {
    title: "...Baby One More Time",
    artist: "Britney Spears", 
    url: "/sound/britney_baby_one_more_time.mp3"
  },
  
  // 🎤 EMINEM HITS
  {
    title: "The Real Slim Shady",
    artist: "Eminem",
    url: "/sound/eminem_real_slim_shady.mp3"
  },
  {
    title: "Lose Yourself",
    artist: "Eminem",
    url: "/sound/eminem_lose_yourself.mp3"
  },
  {
    title: "Without Me",
    artist: "Eminem",
    url: "/sound/eminem_without_me.mp3"
  },
  
  // 🇵🇱 KRZYSZTOF KRAWCZYK
  {
    title: "Jak Minął Dzień",
    artist: "Krzysztof Krawczyk",
    url: "/sound/krawczyk_jak_minal_dzien.mp3"
  },
  {
    title: "Parostatek",
    artist: "Krzysztof Krawczyk", 
    url: "/sound/krawczyk_parostatek.mp3"
  },
  
  // 🇲🇩 DRAGOSTEA DIN TEI ERA
  {
    title: "Dragostea Din Tei", 
    artist: "O-Zone",
    url: "/sound/ozone_dragostea_din_tei.mp3"
  },
  
  // 🎵 INNE HITY 2000s
  {
    title: "Bring Me to Life",
    artist: "Evanescence",
    url: "/sound/evanescence_bring_me_to_life.mp3"
  },
  {
    title: "Butterfly",
    artist: "Crazy Town", 
    url: "/sound/crazy_town_butterfly.mp3"
  },
  {
    title: "Hot in Herre",
    artist: "Nelly",
    url: "/sound/nelly_hot_in_herre.mp3"
  },
  {
    title: "Complicated",
    artist: "Avril Lavigne",
    url: "/sound/avril_complicated.mp3"
  },
  {
    title: "Żeby Polska",
    artist: "Blog 27",
    url: "/sound/blog27_zeby_polska.mp3"
  }
];

export default function WinampWindow({ onClose }: WinampWindowProps) {
  // Stan playera
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  
  // Stan okien
  const [showPlaylist, setShowPlaylist] = useState(true);

  // Audio callbacks
  function handlePlay() {
    if (currentIndex === null) {
      setCurrentIndex(0);
    }
    setIsPlaying(true);
  }

  function handlePause() {
    setIsPlaying(false);
  }

  function handleStop() {
    setIsPlaying(false);
    setCurrentTime(0);
  }

  function handleNext() {
    if (currentIndex === null) {
      setCurrentIndex(0);
    } else {
      const nextIndex = (currentIndex + 1) % tracks.length;
      setCurrentIndex(nextIndex);
    }
  }

  function handlePrev() {
    if (currentIndex === null) {
      setCurrentIndex(tracks.length - 1);
    } else {
      const prevIndex = (currentIndex - 1 + tracks.length) % tracks.length;
      setCurrentIndex(prevIndex);
    }
  }

  function handleTrackSelect(index: number) {
    setCurrentIndex(index);
    setIsPlaying(true);
  }

  function handleTimeUpdate(time: number) {
    setCurrentTime(time);
  }

  function handleLoadedMetadata(trackDuration: number) {
    setDuration(trackDuration);
  }

  function handleTrackEnded() {
    handleNext();
  }

  function handleClosePlayer() {
    console.log("Closing Winamp player"); // Debug log
    setShowPlaylist(false);
    onClose(); // ✅ To wywołuje handleCloseApp('winamp') w DesktopIcons
  }

  function handleClosePlaylist() {
    console.log("Closing Winamp playlist"); // Debug log
    setShowPlaylist(false);
  }

  // ✅ Usunięta nieużywana funkcja togglePlaylist

  const currentTrack = currentIndex !== null ? tracks[currentIndex] : null;

  return (
    <>
      {/* Główny Player */}
      <WinampPlayer
        currentTrack={currentTrack}
        currentTime={currentTime}
        duration={duration}
        isPlaying={isPlaying}
        onPlay={handlePlay}
        onPause={handlePause}
        onStop={handleStop}
        onNext={handleNext}
        onPrev={handlePrev}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onTrackEnded={handleTrackEnded}
        onClose={handleClosePlayer}
      />

      {/* Playlist Window */}
      <WinampPlaylist
        tracks={tracks}
        currentIndex={currentIndex}
        isPlaying={isPlaying}
        onTrackSelect={handleTrackSelect}
        onClose={handleClosePlaylist}
        isVisible={showPlaylist}
      />
    </>
  );
}