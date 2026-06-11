
'use client';

import { useState, useEffect, useRef } from 'react';
import { generateCrossword, type CrosswordOutput } from '@/ai/flows/crossword-flow';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, BrainCircuit, ArrowLeft, CheckCircle, XCircle } from '@/components/icons';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import Link from 'next/link';

type Grid = (string | null)[][];
type UserGrid = (string | null)[][];

interface CellPosition {
  row: number;
  col: number;
}

export default function AICrosswordPage() {
  const [puzzle, setPuzzle] = useState<CrosswordOutput | null>(null);
  const [userGrid, setUserGrid] = useState<UserGrid>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCell, setSelectedCell] = useState<CellPosition | null>(null);
  const [validationGrid, setValidationGrid] = useState<(boolean | null)[][] | null>(null);
  const [cluePositions, setCluePositions] = useState<Map<string, {row: number, col: number}>>(new Map());
  const inputRefs = useRef<(HTMLInputElement | null)[][]>([]);

  useEffect(() => {
    const fetchPuzzle = async () => {
      try {
        setIsLoading(true);
        const result = await generateCrossword();
        setPuzzle(result);
        const emptyGrid = Array(result.rows).fill(null).map(() => Array(result.cols).fill(null));
        setUserGrid(emptyGrid);
        inputRefs.current = Array(result.rows).fill(null).map(() => Array(result.cols).fill(null));
        
        // --- Fix for clue number logic ---
        // Pre-calculate clue positions based on the grid
        const newCluePositions = new Map<string, {row: number, col: number}>();
        const seenNumbers = new Set<number>();
        
        result.clues.across.forEach(clue => {
            if (seenNumbers.has(clue.number)) return;
            for(let r=0; r<result.rows; r++) {
                for(let c=0; c<result.cols; c++) {
                    if (result.grid[r][c] === clue.answer[0]) {
                         // Check if the word fits
                        if (c + clue.answer.length <= result.cols) {
                            const wordSlice = result.grid[r].slice(c, c + clue.answer.length).join('');
                            if(wordSlice === clue.answer) {
                                newCluePositions.set(`across-${clue.number}`, {row: r, col: c});
                                seenNumbers.add(clue.number);
                                return;
                            }
                        }
                    }
                }
            }
        });

        result.clues.down.forEach(clue => {
            if (seenNumbers.has(clue.number)) return;
            for(let r=0; r<result.rows; r++) {
                 for(let c=0; c<result.cols; c++) {
                    if (result.grid[r][c] === clue.answer[0]) {
                        // Check if word fits downwards
                        if (r + clue.answer.length <= result.rows) {
                           let wordSlice = '';
                           for(let i=0; i<clue.answer.length; i++) {
                               wordSlice += result.grid[r+i][c];
                           }
                           if(wordSlice === clue.answer) {
                               newCluePositions.set(`down-${clue.number}`, {row: r, col: c});
                               seenNumbers.add(clue.number);
                               return;
                           }
                        }
                    }
                 }
            }
        });
        setCluePositions(newCluePositions);

      } catch (error) {
        console.error("Failed to generate crossword:", error);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Could not generate the crossword puzzle. Please try again later.',
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchPuzzle();
  }, []);
  
  const getClueNumber = (row: number, col: number): number | null => {
    for (const [key, pos] of cluePositions.entries()) {
      if (pos.row === row && pos.col === col) {
        return parseInt(key.split('-')[1], 10);
      }
    }
    return null;
  };
  
   const handleCellClick = (row: number, col: number) => {
    if (puzzle?.grid[row][col] === null) return;
    setSelectedCell({ row, col });
    inputRefs.current[row]?.[col]?.focus();
  };


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, row: number, col: number) => {
    const value = e.target.value.toUpperCase();
    const newUserGrid = userGrid.map(r => [...r]);
    newUserGrid[row][col] = value.slice(-1);
    setUserGrid(newUserGrid);

    // Basic auto-tabbing
    if (value && puzzle) {
        // Move right for now
        if (col + 1 < puzzle.cols && puzzle.grid[row][col+1] !== null) {
            setSelectedCell({row, col: col+1});
            inputRefs.current[row]?.[col+1]?.focus();
        }
    }
  };
  
  const checkPuzzle = () => {
    if (!puzzle) return;
    const newValidationGrid = Array(puzzle.rows).fill(null).map(() => Array(puzzle.cols).fill(null));
    let correctCount = 0;
    let totalCount = 0;

    for (let r = 0; r < puzzle.rows; r++) {
        for (let c = 0; c < puzzle.cols; c++) {
            if (puzzle.grid[r][c] !== null) {
                totalCount++;
                const isCorrect = userGrid[r][c] === puzzle.grid[r][c];
                newValidationGrid[r][c] = isCorrect;
                if (isCorrect) correctCount++;
            }
        }
    }
    setValidationGrid(newValidationGrid);
    toast({
        title: "Puzzle Checked!",
        description: `You got ${correctCount} out of ${totalCount} letters correct.`,
    })
  };


  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center text-center">
        <div>
          <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
          <h2 className="mt-4 text-xl font-semibold">Generating Your Daily Crossword...</h2>
          <p className="text-muted-foreground">The AI is thinking up some clever clues!</p>
        </div>
      </div>
    );
  }

  if (!puzzle) {
    return (
       <div className="flex h-screen items-center justify-center text-center">
        <div>
          <p className="text-destructive">Failed to load the crossword puzzle. Please try again later.</p>
           <Button asChild variant="link">
                <Link href="/arcade-saloon">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Arcade
                </Link>
            </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 md:py-12">
      <header className="mb-8">
        <Button asChild variant="ghost" className="-ml-4">
            <Link href="/arcade-saloon">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Arcade
            </Link>
        </Button>
        <div className="text-center mt-4">
            <h1 className="font-headline text-4xl font-bold flex items-center justify-center gap-3 text-primary">
                <BrainCircuit className="h-10 w-10" />
                AI Crossword
            </h1>
            <p className="text-muted-foreground mt-1 text-lg">"{puzzle.title}"</p>
        </div>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Crossword Grid */}
        <div className="lg:col-span-2">
            <Card>
                <CardContent className="p-2 md:p-4 aspect-square">
                    <div className="grid gap-0.5" style={{gridTemplateColumns: `repeat(${puzzle.cols}, 1fr)`}}>
                         {puzzle.grid.map((row, r_idx) => 
                            row.map((cell, c_idx) => {
                                const isBlackSquare = cell === null;
                                const isSelected = selectedCell?.row === r_idx && selectedCell?.col === c_idx;
                                const validationStatus = validationGrid?.[r_idx]?.[c_idx];
                                const clueNumber = getClueNumber(r_idx, c_idx);

                                return (
                                    <div
                                        key={`${r_idx}-${c_idx}`}
                                        className={cn(
                                            "relative aspect-square flex items-center justify-center",
                                            isBlackSquare ? "bg-foreground" : "bg-background",
                                            isSelected && !isBlackSquare && "bg-yellow-200 dark:bg-yellow-700",
                                        )}
                                        onClick={() => handleCellClick(r_idx, c_idx)}
                                    >
                                        {isBlackSquare ? null : (
                                            <>
                                                {clueNumber && <span className="absolute top-0 left-1 text-[10px] font-bold">{clueNumber}</span>}
                                                <input
                                                    ref={el => {
                                                        if (inputRefs.current[r_idx]) {
                                                            inputRefs.current[r_idx][c_idx] = el;
                                                        }
                                                    }}
                                                    type="text"
                                                    maxLength={1}
                                                    className="w-full h-full text-center bg-transparent text-lg md:text-xl font-bold uppercase focus:outline-none"
                                                    value={userGrid[r_idx]?.[c_idx] || ''}
                                                    onChange={(e) => handleInputChange(e, r_idx, c_idx)}
                                                />
                                                {validationStatus === true && <CheckCircle className="absolute bottom-1 right-1 h-4 w-4 text-green-500" />}
                                                {validationStatus === false && <XCircle className="absolute bottom-1 right-1 h-4 w-4 text-red-500" />}
                                            </>
                                        )}
                                    </div>
                                )
                            })
                        )}
                    </div>
                </CardContent>
            </Card>
            <div className="mt-4 flex gap-4">
                <Button onClick={checkPuzzle}>Check Puzzle</Button>
                <Button variant="secondary" onClick={() => {
                    setUserGrid(Array(puzzle.rows).fill(null).map(() => Array(puzzle.cols).fill(null)));
                    setValidationGrid(null);
                }}>Clear Puzzle</Button>
            </div>
        </div>

        {/* Clues */}
        <div className="lg:col-span-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Across</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm max-h-96 overflow-y-auto">
                    {puzzle.clues.across.map((clue) => (
                        <p key={`across-${clue.clue}`}><span className="font-bold">{clue.number}</span> {clue.clue}</p>
                    ))}
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Down</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm max-h-96 overflow-y-auto">
                   {puzzle.clues.down.map((clue) => (
                        <p key={`down-${clue.clue}`}><span className="font-bold">{clue.number}</span> {clue.clue}</p>
                    ))}
                </CardContent>
              </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
