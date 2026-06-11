
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, RefreshCw, Trophy } from '@/components/icons';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

const BOARD_SIZE = 8;
type Player = 'black' | 'white';
type CellState = Player | null;

const createInitialBoard = (): CellState[][] => {
  const board = Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null));
  board[3][3] = 'white';
  board[3][4] = 'black';
  board[4][3] = 'black';
  board[4][4] = 'white';
  return board;
};

const directions = [
  [-1, -1], [-1, 0], [-1, 1],
  [0, -1],         [0, 1],
  [1, -1], [1, 0], [1, 1]
];

export default function ReversiPage() {
  const [board, setBoard] = useState<CellState[][]>(createInitialBoard);
  const [currentPlayer, setCurrentPlayer] = useState<Player>('black');
  const [scores, setScores] = useState({ black: 2, white: 2 });
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState<Player | 'draw' | null>(null);

  const getValidMoves = (player: Player, currentBoard: CellState[][]): [number, number][] => {
    const validMoves: [number, number][] = [];
    for (let r = 0; r < BOARD_SIZE; r++) {
      for (let c = 0; c < BOARD_SIZE; c++) {
        if (currentBoard[r][c] !== null) continue;
        if (getFlips(r, c, player, currentBoard).length > 0) {
          validMoves.push([r, c]);
        }
      }
    }
    return validMoves;
  };

  const getFlips = (row: number, col: number, player: Player, currentBoard: CellState[][]): [number, number][] => {
    const opponent: Player = player === 'black' ? 'white' : 'black';
    const allFlips: [number, number][] = [];

    for (const [dr, dc] of directions) {
      let r = row + dr;
      let c = col + dc;
      const potentialFlips: [number, number][] = [];

      if (r < 0 || r >= BOARD_SIZE || c < 0 || c >= BOARD_SIZE || currentBoard[r][c] !== opponent) {
        continue;
      }
      
      potentialFlips.push([r,c]);
      r += dr;
      c += dc;

      while(r >= 0 && r < BOARD_SIZE && c >= 0 && c < BOARD_SIZE) {
        if (currentBoard[r][c] === player) {
            allFlips.push(...potentialFlips);
            break;
        }
        if (currentBoard[r][c] === null) {
            break;
        }
        potentialFlips.push([r,c]);
        r += dr;
        c += dc;
      }
    }
    return allFlips;
  };

  const handleCellClick = (row: number, col: number) => {
    if (board[row][col] !== null || gameOver) return;
    
    const flips = getFlips(row, col, currentPlayer, board);
    if(flips.length === 0) return;

    const newBoard = board.map(r => [...r]);
    newBoard[row][col] = currentPlayer;
    flips.forEach(([r, c]) => {
      newBoard[r][c] = currentPlayer;
    });
    setBoard(newBoard);
    
    let nextPlayer: Player = currentPlayer === 'black' ? 'white' : 'black';
    if(getValidMoves(nextPlayer, newBoard).length === 0) {
        // next player has no moves, skip turn
        toast({ title: "No valid moves!", description: `${nextPlayer.charAt(0).toUpperCase() + nextPlayer.slice(1)}'s turn is skipped.` });
        if(getValidMoves(currentPlayer, newBoard).length === 0) {
            // game over
        } else {
             nextPlayer = currentPlayer; // current player plays again
        }
    }
    setCurrentPlayer(nextPlayer);
  };
  
  useEffect(() => {
    let blackScore = 0;
    let whiteScore = 0;
    board.forEach(row => row.forEach(cell => {
      if (cell === 'black') blackScore++;
      if (cell === 'white') whiteScore++;
    }));
    setScores({ black: blackScore, white: whiteScore });

    const blackMoves = getValidMoves('black', board);
    const whiteMoves = getValidMoves('white', board);
    
    if(blackMoves.length === 0 && whiteMoves.length === 0) {
      setGameOver(true);
      if(blackScore > whiteScore) setWinner('black');
      else if (whiteScore > blackScore) setWinner('white');
      else setWinner('draw');
    }

  }, [board])
  
  const resetGame = () => {
    setBoard(createInitialBoard());
    setCurrentPlayer('black');
    setScores({ black: 2, white: 2 });
    setGameOver(false);
    setWinner(null);
  };
  

  return (
    <div className="container mx-auto max-w-lg px-4 py-8 md:py-12">
      <header className="mb-8">
        <Button asChild variant="ghost" className="-ml-4">
          <Link href="/arcade-saloon">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Arcade
          </Link>
        </Button>
        <div className="text-center mt-4">
          <h1 className="font-headline text-4xl font-bold">Reversi</h1>
          <p className="text-muted-foreground mt-1 text-lg">A game of strategy. Out-flip your opponent!</p>
        </div>
      </header>

      <Card>
        <CardHeader className="flex-row justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-black border-2 border-muted-foreground" />
            <span className="text-xl font-bold">{scores.black}</span>
          </div>
           <div className="text-center">
            <p className="font-semibold">Current Turn</p>
            <div className={cn("h-6 w-6 rounded-full mx-auto mt-1 border-2", currentPlayer === 'black' ? 'bg-black' : 'bg-white')} />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold">{scores.white}</span>
            <div className="h-8 w-8 rounded-full bg-white border-2 border-muted-foreground" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-8 gap-1 bg-muted p-2 rounded-md aspect-square">
            {board.map((row, rIdx) =>
              row.map((cell, cIdx) => (
                <div
                  key={`${rIdx}-${cIdx}`}
                  className="bg-green-600 hover:bg-green-700 transition-colors rounded-sm aspect-square flex items-center justify-center cursor-pointer"
                  onClick={() => handleCellClick(rIdx, cIdx)}
                >
                  {cell && (
                    <div
                      className={cn(
                        'h-5/6 w-5/6 rounded-full animate-in zoom-in-50',
                        cell === 'black' ? 'bg-black' : 'bg-white'
                      )}
                    />
                  )}
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
      
      {gameOver && (
         <Card className="mt-8 text-center p-6 bg-yellow-100 dark:bg-yellow-900 border-yellow-400">
             <Trophy className="h-16 w-16 mx-auto text-yellow-500" />
            <h2 className="text-2xl font-bold mt-4">
              {winner === 'draw' ? "It's a Draw!" : `${winner?.charAt(0).toUpperCase() + winner!.slice(1)} Wins!`}
            </h2>
            <p className="text-muted-foreground">Final Score: Black {scores.black} - White {scores.white}</p>
         </Card>
      )}

      <div className="mt-8 flex justify-center">
        <Button onClick={resetGame} size="lg">
          <RefreshCw className="mr-2 h-4 w-4" /> New Game
        </Button>
      </div>

    </div>
  );
}
