
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Award, Brain, Trophy } from '@/components/icons';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import Link from 'next/link';

const icons = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];
const cardValues = [...icons, ...icons];

interface CardState {
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const shuffle = (array: string[]) => {
  return array.sort(() => Math.random() - 0.5);
};

export default function MemoryGamePage() {
  const [cards, setCards] = useState<CardState[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isGameWon, setIsGameWon] = useState(false);

  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    const shuffledValues = shuffle(cardValues);
    setCards(
      shuffledValues.map(value => ({ value, isFlipped: false, isMatched: false }))
    );
    setFlippedIndices([]);
    setMoves(0);
    setIsGameWon(false);
  };

  const handleCardClick = (index: number) => {
    if (flippedIndices.length === 2 || cards[index].isFlipped) {
      return;
    }

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    const newFlippedIndices = [...flippedIndices, index];

    setCards(newCards);
    setFlippedIndices(newFlippedIndices);

    if (newFlippedIndices.length === 2) {
      setMoves(prev => prev + 1);
      const [firstIndex, secondIndex] = newFlippedIndices;
      if (newCards[firstIndex].value === newCards[secondIndex].value) {
        // Match found
        newCards[firstIndex].isMatched = true;
        newCards[secondIndex].isMatched = true;
        setCards(newCards);
        setFlippedIndices([]);

        if (newCards.every(card => card.isMatched)) {
          setIsGameWon(true);
          toast({
            title: 'Congratulations!',
            description: `You won in ${moves + 1} moves!`,
          });
        }
      } else {
        // No match
        setTimeout(() => {
          newCards[firstIndex].isFlipped = false;
          newCards[secondIndex].isFlipped = false;
          setCards([...newCards]); // create new array reference to trigger re-render
          setFlippedIndices([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8 md:py-12">
      <header className="mb-8">
        <Button asChild variant="ghost" className="-ml-4">
          <Link href="/arcade-saloon">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Arcade
          </Link>
        </Button>
        <div className="text-center mt-4">
          <h1 className="font-headline text-4xl font-bold flex items-center justify-center gap-3 text-primary">
            <Brain className="h-10 w-10 text-pink-500" />
            Memory Game
          </h1>
          <p className="text-muted-foreground mt-1 text-lg">Match the pairs to win!</p>
          <p className="font-bold text-xl mt-2">Moves: {moves}</p>
        </div>
      </header>

      <div className="grid grid-cols-4 gap-4">
        {cards.map((card, index) => (
          <Card
            key={index}
            onClick={() => handleCardClick(index)}
            className={cn(
              'aspect-square cursor-pointer transition-transform duration-500',
              card.isFlipped ? '[transform:rotateY(180deg)]' : '',
              card.isMatched ? 'opacity-50 cursor-default' : ''
            )}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <CardContent className="p-0 w-full h-full relative">
              <div className="absolute w-full h-full flex items-center justify-center bg-primary rounded-lg [backface-visibility:hidden]">
                {/* Face down */}
              </div>
              <div
                className={cn(
                  "absolute w-full h-full flex items-center justify-center rounded-lg [transform:rotateY(180deg)] [backface-visibility:hidden]",
                  card.isMatched ? 'bg-green-500' : 'bg-secondary'
                )}
              >
                {/* Face up */}
                <span className="text-4xl">{card.value}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="mt-8 flex justify-center">
        <Button onClick={resetGame} size="lg">
            {isGameWon ? 'Play Again' : 'Restart Game'}
        </Button>
      </div>

       {isGameWon && (
         <Card className="mt-8 text-center p-6 bg-yellow-100 dark:bg-yellow-900 border-yellow-400">
             <Trophy className="h-16 w-16 mx-auto text-yellow-500" />
            <h2 className="text-2xl font-bold mt-4">You Win!</h2>
            <p className="text-muted-foreground">You completed the game in {moves} moves.</p>
         </Card>
      )}
    </div>
  );
}
