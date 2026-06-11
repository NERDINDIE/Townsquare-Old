
'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Music, Play, Pause, Trash2 } from '@/components/icons';
import Link from 'next/link';
import { toast } from '@/hooks/use-toast';

// Frequency map for notes in different octaves
const noteFrequencies: { [key: string]: number } = {
  'c4': 261.63, 'c#4': 277.18, 'd4': 293.66, 'd#4': 311.13, 'e4': 329.63, 'f4': 349.23, 'f#4': 369.99, 'g4': 392.00, 'g#4': 415.30, 'a4': 440.00, 'a#4': 466.16, 'b4': 493.88,
  'c5': 523.25, 'c#5': 554.37, 'd5': 587.33, 'd#5': 622.25, 'e5': 659.25, 'f5': 698.46, 'f#5': 739.99, 'g5': 783.99, 'g#5': 830.61, 'a5': 880.00, 'a#5': 932.33, 'b5': 987.77,
  'c6': 1046.50, 'c#6': 1108.73, 'd6': 1174.66, 'd#6': 1244.51, 'e6': 1318.51, 'f6': 1396.91, 'f#6': 1479.98, 'g6': 1567.98, 'g#6': 1661.22, 'a6': 1760.00, 'a#6': 1864.66, 'b6': 1975.53,
};

const noteMap: { [key: string]: string } = {
  '1': 'c', '2': 'd', '3': 'e', '4': 'f', '5': 'g', '6': 'a', '7': 'b'
};

export default function RingtoneComposerPage() {
  const [composition, setComposition] = useState('16c5 16e5 16g5 8e5 16d5 16f5 16a5 8f5');
  const [isPlaying, setIsPlaying] = useState(false);
  
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);

  useEffect(() => {
    // Initialize AudioContext on client side
    setAudioContext(new (window.AudioContext || (window as any).webkitAudioContext)());
    return () => {
        audioContext?.close();
    }
  }, []);


  const playRingtone = useCallback(() => {
    if (!audioContext || isPlaying) return;
    setIsPlaying(true);

    const notes = composition.trim().split(' ');
    let currentTime = audioContext.currentTime;

    notes.forEach(note => {
      const durationMatch = note.match(/^(4|8|16|32)/);
      const noteMatch = note.match(/([a-g]#?[4-6])$/);
      
      if (durationMatch && noteMatch) {
        const durationValue = parseInt(durationMatch[1], 10);
        const noteName = noteMatch[1];
        
        const noteDuration = (4 / durationValue) * 0.25; // Quarter note = 0.25s
        const frequency = noteFrequencies[noteName];
        
        if (frequency) {
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          
          oscillator.type = 'square';
          oscillator.frequency.setValueAtTime(frequency, currentTime);
          gainNode.gain.setValueAtTime(1, currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.00001, currentTime + noteDuration);

          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);

          oscillator.start(currentTime);
          oscillator.stop(currentTime + noteDuration);
        }
        currentTime += noteDuration;
      }
    });

    setTimeout(() => {
        setIsPlaying(false)
    }, (currentTime - audioContext.currentTime) * 1000);

  }, [audioContext, composition, isPlaying]);

  const addNote = (note: string) => {
    setComposition(prev => prev ? `${prev} ${note}` : note);
  }
  
  const clearComposition = () => {
      setComposition('');
  }

  return (
    <div className="container mx-auto max-w-md px-4 py-8 md:py-12">
      <header className="mb-8">
        <Button asChild variant="ghost" className="mb-4 -ml-4">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Link>
        </Button>
        <h1 className="font-headline text-4xl font-bold flex items-center gap-3">
          <Music />
          Ringtone Composer
        </h1>
        <p className="text-muted-foreground mt-1">
          Create your own polyphonic ringtone, just like the old days.
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Composition</CardTitle>
          <CardDescription>
            Enter notes manually or use the keypad below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-muted p-4 rounded-lg font-mono text-center h-24 overflow-y-auto">
            {composition}
          </div>
        </CardContent>
        <CardContent>
            <div className="grid grid-cols-3 gap-2">
                {/* Keypad */}
                {'1234567#9'.split('').map(key => (
                    <Button key={key} variant="outline" className="h-16 text-2xl font-bold" onClick={() => addNote(key)}>
                        {key}
                    </Button>
                ))}
                <Button variant="destructive" className="h-16 text-lg col-span-2" onClick={clearComposition}>
                    <Trash2 className="mr-2"/> Clear
                </Button>
            </div>
        </CardContent>
        <CardFooter className="flex gap-4">
          <Button onClick={playRingtone} disabled={isPlaying || !composition}>
            {isPlaying ? <Pause className="mr-2" /> : <Play className="mr-2" />}
            {isPlaying ? 'Playing...' : 'Play'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
