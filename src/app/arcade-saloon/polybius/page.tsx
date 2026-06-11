
'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, ArrowLeft } from '@/components/icons';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface Target {
  id: number;
  x: number;
  y: number;
  size: number;
}

const PolybiusGame = ({ onGameOver }: { onGameOver: (score: number) => void }) => {
  const [targets, setTargets] = useState<Target[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const gameAreaRef = useRef<HTMLDivElement>(null);

  const spawnTarget = useCallback(() => {
    if (!gameAreaRef.current) return;
    const { width, height } = gameAreaRef.current.getBoundingClientRect();
    const newTarget: Target = {
      id: Date.now(),
      x: Math.random() * (width - 50),
      y: Math.random() * (height - 50),
      size: Math.random() * 30 + 20,
    };
    setTargets(prev => [...prev.slice(-10), newTarget]); // Keep max 10 targets
  }, []);

  useEffect(() => {
    const gameInterval = setInterval(spawnTarget, 1000 - score * 10);
    const timeInterval = setInterval(() => {
        setTimeLeft(prev => {
            if(prev <= 1) {
                clearInterval(gameInterval);
                clearInterval(timeInterval);
                onGameOver(score);
                return 0;
            }
            return prev - 1;
        });
    }, 1000);

    return () => {
        clearInterval(gameInterval);
        clearInterval(timeInterval);
    }
  }, [score, onGameOver, spawnTarget]);

  const handleTargetClick = (id: number) => {
    setTargets(prev => prev.filter(t => t.id !== id));
    setScore(prev => prev + 1);
  };

  return (
    <div className="relative w-full h-full bg-black font-mono text-cyan-300">
       <div ref={gameAreaRef} className="absolute inset-0 overflow-hidden glitch-scanlines">
        {targets.map(target => (
          <div
            key={target.id}
            className="absolute transition-all duration-200"
            style={{ left: `${target.x}px`, top: `${target.y}px` }}
            onClick={() => handleTargetClick(target.id)}
          >
            <svg
              width={target.size}
              height={target.size}
              viewBox="0 0 100 100"
              className="animate-pulse cursor-pointer filter drop-shadow-[0_0_5px_rgba(0,255,255,0.8)]"
            >
              <polygon points="50,0 100,50 50,100 0,50" fill="none" stroke="cyan" strokeWidth="5" />
            </svg>
          </div>
        ))}
      </div>

       <div className="absolute top-4 left-4 text-2xl">SCORE: {score}</div>
       <div className="absolute top-4 right-4 text-2xl">TIME: {timeLeft}</div>
       <div className="absolute inset-0 pointer-events-none bg-black/30" />
       <div className="absolute inset-0 pointer-events-none static-overlay" />
    </div>
  )
};

const WarningScreen = ({ onAccept }: { onAccept: () => void }) => {
    return (
        <div className="flex flex-col items-center justify-center h-full bg-black font-mono text-center">
            <AlertTriangle className="h-16 w-16 text-red-500 animate-pulse" />
            <h1 className="text-4xl font-bold text-red-500 mt-4 tracking-widest">W A R N I N G</h1>
            <Card className="bg-transparent border-red-500/50 text-red-400 mt-6 max-w-md">
                <CardHeader>
                    <CardTitle>Government Property</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-left text-sm">
                    <p>This arcade cabinet, "Polybius", is the property of a private company and was tested in the suburbs of Portland, Oregon in 1981.</p>
                    <p>This game is known to cause psychoactive and addictive effects. Proceed with caution.</p>
                    <p className="font-bold">Play at your own risk. Liability is waived upon acceptance.</p>
                </CardContent>
            </Card>
            <Button onClick={onAccept} variant="outline" className="mt-8 text-lg border-red-500 text-red-500 hover:bg-red-500/10 hover:text-red-400">
                I understand and wish to proceed
            </Button>
        </div>
    )
}

const GameOverScreen = ({ score, onRestart }: { score: number; onRestart: () => void }) => {
    return (
        <div className="flex flex-col items-center justify-center h-full bg-black font-mono text-center text-white">
            <h1 className="text-6xl font-bold text-red-500">GAME OVER</h1>
            <p className="text-3xl mt-4">Final Score: {score}</p>
            <Button onClick={onRestart} variant="secondary" className="mt-8 text-lg">
                Play Again
            </Button>
             <Button asChild variant="link" className="mt-4">
                <Link href="/arcade-saloon">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Arcade
                </Link>
            </Button>
        </div>
    )
}

export default function PolybiusPage() {
    const [gameState, setGameState] = useState<'warning' | 'playing' | 'over'>('warning');
    const [finalScore, setFinalScore] = useState(0);

    const handleAccept = () => {
        setGameState('playing');
    };

    const handleGameOver = (score: number) => {
        setFinalScore(score);
        setGameState('over');
    }
    
    const handleRestart = () => {
        setFinalScore(0);
        setGameState('playing');
    }


  return (
    <div className="h-screen w-screen bg-black">
      {gameState === 'warning' && <WarningScreen onAccept={handleAccept} />}
      {gameState === 'playing' && <PolybiusGame onGameOver={handleGameOver} />}
      {gameState === 'over' && <GameOverScreen score={finalScore} onRestart={handleRestart} />}

      <style jsx global>{`
        @keyframes static-flicker {
            0%, 100% { opacity: 0.05; }
            50% { opacity: 0.1; }
        }
        .static-overlay {
            background-image: url('https://www.transparenttextures.com/patterns/black-felt.png');
            animation: static-flicker 0.15s infinite;
        }

        @keyframes scanlines {
          0% { background-position: 0 0; }
          100% { background-position: 0 100%; }
        }
        .glitch-scanlines::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            to bottom,
            rgba(0, 255, 255, 0),
            rgba(0, 255, 255, 0.05) 50%,
            rgba(0, 255, 255, 0)
          );
          background-size: 100% 4px;
          animation: scanlines 0.2s linear infinite;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}
