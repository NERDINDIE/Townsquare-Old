
'use client';

import { usePlayerState } from '@/hooks/use-player-state.tsx';
import { cn } from '@/lib/utils';
import { Pause, Play } from 'lucide-react';
import Link from 'next/link';

export function MiniPlayer() {
  const { isVisible, currentMedia, isPlaying, togglePlay } = usePlayerState();

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={cn(
        'fixed bottom-16 left-0 right-0 z-40 h-16 bg-black text-white transition-transform duration-300 md:hidden',
        isVisible ? 'translate-y-0' : 'translate-y-full'
      )}
    >
      <Link href="/player" className="flex h-full w-full items-center justify-between px-4">
        <div className="truncate">
          <p className="truncate font-semibold">{currentMedia?.title}</p>
          <p className="truncate text-sm text-gray-400">{currentMedia?.type}</p>
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            togglePlay();
          }}
          className="relative h-10 w-10 flex-shrink-0"
        >
          <svg className="h-full w-full" viewBox="0 0 36 36">
            <circle
              cx="18"
              cy="18"
              r="16"
              fill="none"
              stroke="#555"
              strokeWidth="2"
            />
            <circle
              cx="18"
              cy="18"
              r="16"
              fill="none"
              stroke="#fff"
              strokeWidth="2"
              strokeDasharray="100"
              strokeDashoffset="75"
              transform="rotate(-90 18 18)"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
             {isPlaying ? (
              <Pause className="h-5 w-5" fill="white" />
            ) : (
              <Play className="h-5 w-5 ml-1" fill="white" />
            )}
          </div>
        </button>
      </Link>
    </div>
  );
}
