
'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface MediaInfo {
  title: string;
  type: string;
}

interface PlayerContextType {
  isVisible: boolean;
  isPlaying: boolean;
  currentMedia: MediaInfo | null;
  showPlayer: (media: MediaInfo) => void;
  hidePlayer: () => void;
  togglePlay: () => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentMedia, setCurrentMedia] = useState<MediaInfo | null>(null);

  const showPlayer = (media: MediaInfo) => {
    setCurrentMedia(media);
    setIsVisible(true);
    setIsPlaying(true);
  };

  const hidePlayer = () => {
    setIsVisible(false);
    setIsPlaying(false);
    setCurrentMedia(null);
  };

  const togglePlay = () => {
    if (isVisible) {
        setIsPlaying(prev => !prev);
    }
  };

  return (
    <PlayerContext.Provider value={{ isVisible, isPlaying, currentMedia, showPlayer, hidePlayer, togglePlay }}>
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayerState() {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayerState must be used within a PlayerProvider');
  }
  return context;
}
