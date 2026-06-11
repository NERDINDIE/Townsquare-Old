
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { ArrowLeft, Music, Pause, Play, RotateCw } from '@/components/icons';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

const instruments = [
  { id: 'violin', name: 'Violin', icon: '🎻' },
  { id: 'chorus', name: 'Chorus', icon: '🎤' },
  { id: 'piano', name: 'Piano', icon: '🎹' },
  { id: 'banjo', name: 'Banjo', icon: '🪕' },
];

const tunes: Record<string, { duration: number; note: number }[]> = {
  violin: [
    { duration: 0.25, note: 7 }, { duration: 0.25, note: 8 }, { duration: 0.25, note: 9 }, { duration: 0.25, note: 7 },
    { duration: 0.25, note: 7 }, { duration: 0.25, note: 8 }, { duration: 0.25, note: 9 }, { duration: 0.25, note: 7 },
    { duration: 0.25, note: 9 }, { duration: 0.25, note: 10 }, { duration: 0.5, note: 11 },
    { duration: 0.25, note: 9 }, { duration: 0.25, note: 10 }, { duration: 0.5, note: 11 },
    { duration: 0.125, note: 11 }, { duration: 0.125, note: 12 }, { duration: 0.125, note: 11 }, { duration: 0.125, note: 10 }, { duration: 0.25, note: 9 }, { duration: 0.25, note: 7 },
    { duration: 0.125, note: 11 }, { duration: 0.125, note: 12 }, { duration: 0.125, note: 11 }, { duration: 0.125, note: 10 }, { duration: 0.25, note: 9 }, { duration: 0.25, note: 7 },
    { duration: 0.25, note: 7 }, { duration: 0.25, note: 4 }, { duration: 0.5, note: 7 },
    { duration: 0.25, note: 7 }, { duration: 0.25, note: 4 }, { duration: 0.5, note: 7 },
  ],
  chorus: [
    { duration: 1, note: 0 }, { duration: 1, note: 0 }, // Rests
    // ... then violin tune twice
  ],
  piano: [
    { duration: 1, note: 0 }, { duration: 1, note: 0 }, { duration: 1, note: 0 }, { duration: 1, note: 0 }, // Rests
    // ... then violin tune twice
  ],
  banjo: [
    { duration: 1, note: 0 }, { duration: 1, note: 0 }, { duration: 1, note: 0 }, { duration: 1, note: 0 }, { duration: 1, note: 0 }, { duration: 1, note: 0 }, // Rests
    // ... then violin tune twice
  ]
};

// Populate the rest of the tunes based on the logic provided
tunes.chorus = [...tunes.chorus, ...tunes.violin, ...tunes.violin];
tunes.piano = [...tunes.piano, ...tunes.violin, ...tunes.violin];
tunes.banjo = [...tunes.banjo, ...tunes.violin, ...tunes.violin];


export default function RhythmMasterPage() {
  const [selectedInstrument, setSelectedInstrument] = useState(instruments[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentNoteIndex, setCurrentNoteIndex] = useState(0);

  const tune = tunes[selectedInstrument.id];
  const totalDuration = tune.reduce((acc, curr) => acc + curr.duration, 0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && currentNoteIndex < tune.length) {
      const noteDuration = tune[currentNoteIndex].duration * 500; // speed up animation
      timer = setTimeout(() => {
        setCurrentNoteIndex(prev => prev + 1);
      }, noteDuration);
    } else if (currentNoteIndex >= tune.length) {
      setIsPlaying(false);
      setCurrentNoteIndex(0);
       toast({
          title: "♪ Tune Finished ♪",
          description: `You played the ${selectedInstrument.name}!`,
      });
    }

    return () => clearTimeout(timer);
  }, [isPlaying, currentNoteIndex, tune, selectedInstrument.name]);

  const handlePlay = () => {
    if (tune.length > 0) {
      setIsPlaying(prev => !prev);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentNoteIndex(0);
  };

  const handleInstrumentSelect = (instrument: typeof instruments[0]) => {
      handleReset();
      setSelectedInstrument(instrument);
  }

  const progress = isPlaying ? (currentNoteIndex / tune.length) * 100 : 0;

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 md:py-12">
      <header className="mb-8">
        <Button asChild variant="ghost" className="-ml-4">
          <Link href="/arcade-saloon">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Arcade
          </Link>
        </Button>
        <div className="text-center mt-4">
          <h1 className="font-headline text-4xl font-bold flex items-center justify-center gap-3 text-primary">
            <Music className="h-10 w-10 text-purple-500" />
            Rhythm Master
          </h1>
          <p className="text-muted-foreground mt-1 text-lg">Select an instrument and play a tune!</p>
        </div>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Select Your Instrument</CardTitle>
          <CardDescription>Each instrument plays a different variation of the main theme.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
          {instruments.map(inst => (
            <Button
              key={inst.id}
              variant={selectedInstrument.id === inst.id ? 'default' : 'outline'}
              onClick={() => handleInstrumentSelect(inst)}
              className="text-lg p-6"
            >
              <span className="text-2xl mr-2">{inst.icon}</span>
              {inst.name}
            </Button>
          ))}
        </CardContent>
      </Card>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Now Playing: {selectedInstrument.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-muted rounded-lg p-4 h-48 overflow-hidden relative">
             <div 
                className="absolute top-0 left-0 bottom-0 bg-primary/20"
                style={{ width: `${progress}%`, transition: 'width 0.1s linear' }}
             ></div>
            <div className="relative flex items-end h-full gap-1">
              {tune.map((note, index) => {
                 const isRest = note.note === 0;
                 const height = isRest ? '10%' : `${note.note * 7 + 10}%`;
                 const isActive = index === currentNoteIndex && isPlaying;
                return (
                  <div
                    key={index}
                    className={cn(
                        "transition-all duration-100 ease-in-out",
                        isRest ? 'bg-transparent' : 'bg-purple-400',
                        isActive && !isRest && 'bg-yellow-400 scale-y-110'
                    )}
                    style={{
                      width: `${note.duration * 20}px`,
                      height: height,
                    }}
                  />
                );
              })}
            </div>
            {!isPlaying && currentNoteIndex === 0 && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-muted-foreground">Press Play to start the music</p>
                </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex gap-4">
          <Button onClick={handlePlay} size="lg">
            {isPlaying ? <Pause className="mr-2" /> : <Play className="mr-2" />}
            {isPlaying ? 'Pause' : 'Play'}
          </Button>
           <Button onClick={handleReset} variant="outline" size="lg">
            <RotateCw className="mr-2" />
            Reset
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
