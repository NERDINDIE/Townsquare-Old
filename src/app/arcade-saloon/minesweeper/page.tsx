
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Flag, Bomb, RefreshCw, Trophy } from '@/components/icons';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

const BOARD_SIZE = 10;
const MINE_COUNT = 10;

type Cell = {
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  adjacentMines: number;
};

const createEmptyBoard = (): Cell[][] =>
  Array(BOARD_SIZE).fill(null).map(() =>
    Array(BOARD_SIZE).fill(null).map(() => ({
      isMine: false,
      isRevealed: false,
      isFlagged: false,
      adjacentMines: 0,
    }))
  );

export default function MinesweeperPage() {
  const [board, setBoard] = useState<Cell[][]>(createEmptyBoard);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [firstClick, setFirstClick] = useState(true);

  const placeMines = (clickedRow: number, clickedCol: number) => {
    let minesPlaced = 0;
    const newBoard = createEmptyBoard();

    while (minesPlaced < MINE_COUNT) {
      const row = Math.floor(Math.random() * BOARD_SIZE);
      const col = Math.floor(Math.random() * BOARD_SIZE);
      if (!newBoard[row][col].isMine && !(row === clickedRow && col === clickedCol)) {
        newBoard[row][col].isMine = true;
        minesPlaced++;
      }
    }

    for (let r = 0; r < BOARD_SIZE; r++) {
      for (let c = 0; c < BOARD_SIZE; c++) {
        if (newBoard[r][c].isMine) continue;
        let count = 0;
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            if (dr === 0 && dc === 0) continue;
            const nr = r + dr;
            const nc = c + dc;
            if (nr >= 0 && nr < BOARD_SIZE && nc >= 0 && nc < BOARD_SIZE && newBoard[nr][nc].isMine) {
              count++;
            }
          }
        }
        newBoard[r][c].adjacentMines = count;
      }
    }
    return newBoard;
  };
  
  const revealCell = (row: number, col: number, currentBoard: Cell[][]) => {
      if (row < 0 || row >= BOARD_SIZE || col < 0 || col >= BOARD_SIZE || currentBoard[row][col].isRevealed || currentBoard[row][col].isFlagged) {
        return;
      }

      const newBoard = currentBoard.map(r => r.map(c => ({...c})));
      newBoard[row][col].isRevealed = true;

      if (newBoard[row][col].isMine) {
        setGameOver(true);
        setGameWon(false);
        // Reveal all mines
        newBoard.forEach(r => r.forEach(c => { if(c.isMine) c.isRevealed = true; }));
        toast({ variant: 'destructive', title: 'Game Over!', description: 'You hit a mine.' });
      } else if (newBoard[row][col].adjacentMines === 0) {
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            if (dr === 0 && dc === 0) continue;
            revealCell(row + dr, col + dc, newBoard);
          }
        }
      }
      setBoard(newBoard);
      checkWinCondition(newBoard);
  }

  const handleCellClick = (row: number, col: number) => {
    if (gameOver || gameWon) return;

    let currentBoard = board;
    if (firstClick) {
      currentBoard = placeMines(row, col);
      setFirstClick(false);
    }
    
    revealCell(row, col, currentBoard);
  };
  
  const handleRightClick = (e: React.MouseEvent, row: number, col: number) => {
      e.preventDefault();
      if(gameOver || gameWon || board[row][col].isRevealed) return;
      
      const newBoard = board.map(r => [...r]);
      newBoard[row][col].isFlagged = !newBoard[row][col].isFlagged;
      setBoard(newBoard);
  }

  const checkWinCondition = (currentBoard: Cell[][]) => {
    const nonMineCells = currentBoard.flat().filter(cell => !cell.isMine);
    const allRevealed = nonMineCells.every(cell => cell.isRevealed);
    if(allRevealed) {
        setGameOver(true);
        setGameWon(true);
        toast({ title: 'You Win!', description: 'You cleared the board!' });
    }
  };

  const startNewGame = () => {
    setBoard(createEmptyBoard());
    setGameOver(false);
    setGameWon(false);
    setFirstClick(true);
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
          <h1 className="font-headline text-4xl font-bold">Minesweeper</h1>
        </div>
      </header>
      
      <Card>
        <CardContent className="p-2 md:p-4">
            <div className="grid gap-0.5 bg-muted-foreground" style={{gridTemplateColumns: `repeat(${BOARD_SIZE}, 1fr)`}}>
                {board.map((row, rIdx) => 
                    row.map((cell, cIdx) => (
                        <button
                            key={`${rIdx}-${cIdx}`}
                            onClick={() => handleCellClick(rIdx, cIdx)}
                            onContextMenu={(e) => handleRightClick(e, rIdx, cIdx)}
                            disabled={gameOver || cell.isRevealed}
                            className={cn(
                                "aspect-square flex items-center justify-center font-bold text-xl",
                                cell.isRevealed ? "bg-muted" : "bg-card hover:bg-muted/80",
                                cell.isRevealed && cell.isMine && "bg-destructive"
                            )}
                        >
                            {cell.isRevealed ? (
                                cell.isMine ? <Bomb /> : cell.adjacentMines > 0 ? cell.adjacentMines : ''
                            ) : cell.isFlagged ? <Flag className="text-destructive" /> : ''}
                        </button>
                    ))
                )}
            </div>
        </CardContent>
      </Card>
      
      {gameWon && (
          <Card className="mt-8 text-center p-6 bg-green-100 dark:bg-green-900 border-green-400">
              <Trophy className="h-16 w-16 mx-auto text-yellow-500" />
              <h2 className="text-2xl font-bold mt-4">You Cleared The Field!</h2>
          </Card>
      )}

      <div className="mt-8 flex justify-center">
        <Button onClick={startNewGame} size="lg">
          <RefreshCw className="mr-2 h-4 w-4" /> New Game
        </Button>
      </div>

    </div>
  );
}
