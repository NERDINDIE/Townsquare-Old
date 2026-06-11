
'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Brain, RefreshCw } from '@/components/icons';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { hangmanWords } from '@/lib/data/arcade-data';

const MAX_MISTAKES = 6;

const HangmanDrawing = ({ numberOfGuesses }: { numberOfGuesses: number }) => {
  const head = <div className="absolute top-[48px] right-[-24px] h-12 w-12 rounded-full border-4 border-foreground" />;
  const body = <div className="absolute top-[96px] right-0 h-24 w-1 bg-foreground" />;
  const rightArm = <div className="absolute top-[120px] right-[-40px] h-1 w-10 origin-bottom-left -rotate-[30deg] bg-foreground" />;
  const leftArm = <div className="absolute top-[120px] right-1 h-1 w-10 origin-bottom-right rotate-[30deg] bg-foreground" />;
  const rightLeg = <div className="absolute top-[210px] right-[-36px] h-1 w-10 origin-bottom-left rotate-[60deg] bg-foreground" />;
  const leftLeg = <div className="absolute top-[210px] right-0 h-1 w-10 origin-bottom-right -rotate-[60deg] bg-foreground" />;

  const bodyParts = [head, body, rightArm, leftArm, rightLeg, leftLeg];

  return (
    <div className="relative h-72 w-48">
      {bodyParts.slice(0, numberOfGuesses)}
      <div className="absolute top-0 right-0 h-12 w-1 bg-foreground" />
      <div className="ml-12 h-1 w-24 bg-foreground" />
      <div className="ml-12 h-72 w-1 bg-foreground" />
      <div className="h-1 w-48 bg-foreground" />
    </div>
  );
};

export default function HangmanPage() {
  const [word, setWord] = useState('');
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [mistakes, setMistakes] = useState(0);

  const startNewGame = useCallback(() => {
    setWord(hangmanWords[Math.floor(Math.random() * hangmanWords.length)]);
    setGuessedLetters([]);
    setMistakes(0);
  }, []);

  useEffect(() => {
    startNewGame();
  }, [startNewGame]);

  const isGameWon = word && word.split('').every(letter => guessedLetters.includes(letter));
  const isGameLost = mistakes >= MAX_MISTAKES;

  const handleGuess = useCallback((letter: string) => {
    if (guessedLetters.includes(letter) || isGameWon || isGameLost) return;

    setGuessedLetters(currentLetters => [...currentLetters, letter]);
    if (!word.includes(letter)) {
      setMistakes(m => m + 1);
    }
  }, [guessedLetters, isGameWon, isGameLost, word]);

  useEffect(() => {
    if (isGameWon) {
      toast({ title: 'You Win!', description: 'You guessed the word!' });
    }
    if (isGameLost) {
      toast({ variant: 'destructive', title: 'You Lost!', description: `The word was: ${word}` });
    }
  }, [isGameWon, isGameLost, word]);

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8 md:py-12">
      <header className="mb-8">
        <Button asChild variant="ghost" className="-ml-4">
          <Link href="/arcade-saloon">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Arcade
          </Link>
        </Button>
        <div className="text-center mt-4">
          <h1 className="font-headline text-4xl font-bold flex items-center justify-center gap-3 text-primary">
            <Brain className="h-10 w-10 text-teal-500" />
            Hangman
          </h1>
          <p className="text-muted-foreground mt-1 text-lg">Guess the word before it's too late!</p>
        </div>
      </header>
      
      <Card>
        <CardContent className="p-6 flex flex-col items-center gap-8">
          <HangmanDrawing numberOfGuesses={mistakes} />
          
          <div className="flex gap-2 text-4xl font-bold">
            {word.split("").map((letter, index) => (
              <span key={index} className="w-10 h-12 border-b-4 flex items-center justify-center">
                <span className={cn(
                  'transition-opacity duration-300',
                  guessedLetters.includes(letter) || isGameLost ? 'opacity-100' : 'opacity-0',
                  !guessedLetters.includes(letter) && isGameLost ? 'text-destructive' : ''
                )}>
                  {letter}
                </span>
              </span>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 flex flex-col items-center gap-4">
        <div className="grid grid-cols-7 sm:grid-cols-9 gap-2">
          {alphabet.map(letter => (
            <Button
              key={letter}
              variant="outline"
              size="icon"
              className="h-12 w-12 text-lg"
              onClick={() => handleGuess(letter)}
              disabled={guessedLetters.includes(letter) || isGameWon || isGameLost}
            >
              {letter}
            </Button>
          ))}
        </div>
        <Button onClick={startNewGame} size="lg">
          <RefreshCw className="mr-2 h-4 w-4" /> New Game
        </Button>
      </div>
    </div>
  );
}
