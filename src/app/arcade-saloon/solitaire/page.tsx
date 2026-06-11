
'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, RefreshCw, Trophy, Club, Diamond, Heart, Spade } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

type Suit = 'hearts' | 'diamonds' | 'clubs' | 'spades';
type Rank = 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K';

interface CardType {
  suit: Suit;
  rank: Rank;
  isFaceUp: boolean;
}

const SUITS: Suit[] = ['hearts', 'diamonds', 'clubs', 'spades'];
const RANKS: Rank[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
const RANK_VALUES: { [key in Rank]: number } = { 'A': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 11, 'Q': 12, 'K': 13 };
const RED_SUITS: Suit[] = ['hearts', 'diamonds'];
const BLACK_SUITS: Suit[] = ['clubs', 'spades'];

const createDeck = (): CardType[] => {
  const deck: CardType[] = [];
  for (const suit of SUITS) {
    for (const rank of RANKS) {
      deck.push({ suit, rank, isFaceUp: false });
    }
  }
  return deck;
};

const shuffleDeck = (deck: CardType[]): CardType[] => {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
};

const CardComponent = ({ card, className, onClick, isSelected }: { card: CardType | null, className?: string, onClick?: () => void, isSelected?: boolean }) => {
    if (!card) {
        return <div onClick={onClick} className={cn("aspect-[2.5/3.5] w-24 rounded-lg border-2 border-dashed border-white/30 cursor-pointer", className)} />;
    }

    const isRed = RED_SUITS.includes(card.suit);

    if (!card.isFaceUp) {
        return <div onClick={onClick} className={cn("aspect-[2.5/3.5] w-24 rounded-lg bg-blue-500 border-2 border-blue-700 cursor-pointer", isSelected && "ring-4 ring-yellow-400", className)} style={{background: 'repeating-linear-gradient(45deg, #4A90E2, #4A90E2 10px, #50A3F2 10px, #50A3F2 20px)'}}/>;
    }
    
    const SuitIcon = {
        hearts: <Heart className="h-4 w-4 fill-current" />,
        diamonds: <Diamond className="h-4 w-4 fill-current" />,
        clubs: <Club className="h-4 w-4 fill-current" />,
        spades: <Spade className="h-4 w-4 fill-current" />,
    }[card.suit];

    return (
        <div onClick={onClick} className={cn("aspect-[2.5/3.5] w-24 rounded-lg bg-white p-2 flex flex-col justify-between shadow-md cursor-pointer", isRed ? 'text-red-600' : 'text-black', isSelected && 'ring-4 ring-yellow-400', className)}>
            <div className="text-left">
                <p className="text-xl font-bold">{card.rank}</p>
                {SuitIcon}
            </div>
            <div className="text-right rotate-180">
                 <p className="text-xl font-bold">{card.rank}</p>
                {SuitIcon}
            </div>
        </div>
    );
}

type SelectedCard = {
    card: CardType;
    origin: 'tableau' | 'waste' | 'foundation';
    pileIndex: number;
    cardIndex?: number;
} | null;

export default function SolitairePage() {
    const [deck, setDeck] = useState<CardType[]>([]);
    const [waste, setWaste] = useState<CardType[]>([]);
    const [foundations, setFoundations] = useState<CardType[][]>([[], [], [], []]);
    const [tableau, setTableau] = useState<CardType[][]>([]);
    const [gameOver, setGameOver] = useState(false);
    const [selectedCard, setSelectedCard] = useState<SelectedCard>(null);

    const startGame = useCallback(() => {
        const newDeck = shuffleDeck(createDeck());
        
        const newTableau: CardType[][] = Array.from({ length: 7 }, (_, i) => newDeck.splice(0, i + 1));
        newTableau.forEach(pile => pile[pile.length - 1].isFaceUp = true);
        
        setTableau(newTableau);
        setDeck(newDeck);
        setWaste([]);
        setFoundations([[], [], [], []]);
        setGameOver(false);
        setSelectedCard(null);
        toast({title: "New Game Started", description: "Good luck!"});
    }, []);

    useEffect(() => {
        startGame();
    }, [startGame]);
    
    const drawCard = () => {
        if (selectedCard) {
            setSelectedCard(null);
            return;
        }
        if (deck.length > 0) {
            const newDeck = [...deck];
            const drawnCard = newDeck.pop()!;
            drawnCard.isFaceUp = true;
            setWaste([...waste, drawnCard]);
            setDeck(newDeck);
        } else if (waste.length > 0) {
            setDeck(waste.reverse().map(c => ({...c, isFaceUp: false})));
            setWaste([]);
        }
    };

    const isMoveValid = (cardToMove: CardType, destinationCard: CardType | null, pileType: 'tableau' | 'foundation'): boolean => {
        if (pileType === 'tableau') {
            if (!destinationCard) return RANK_VALUES[cardToMove.rank] === 13; // King on empty pile
            const isOppositeColor = (RED_SUITS.includes(cardToMove.suit) && BLACK_SUITS.includes(destinationCard.suit)) || (BLACK_SUITS.includes(cardToMove.suit) && RED_SUITS.includes(destinationCard.suit));
            return isOppositeColor && RANK_VALUES[destinationCard.rank] === RANK_VALUES[cardToMove.rank] + 1;
        }
        if (pileType === 'foundation') {
            if (!destinationCard) return RANK_VALUES[cardToMove.rank] === 1; // Ace on empty foundation
            return cardToMove.suit === destinationCard.suit && RANK_VALUES[cardToMove.rank] === RANK_VALUES[destinationCard.rank] + 1;
        }
        return false;
    }

    const checkWinCondition = (foundations: CardType[][]) => {
        const win = foundations.every(pile => pile.length === 13);
        if (win) {
            setGameOver(true);
            toast({
                title: 'You Win!',
                description: 'Congratulations on clearing the board!',
            });
        }
    };

    const moveCard = (card: CardType, cardIndex: number | undefined, fromOrigin: 'tableau' | 'waste' | 'foundation', fromPileIndex: number, toPileType: 'tableau' | 'foundation', toPileIndex: number) => {
        const newTableau = tableau.map(p => [...p]);
        const newFoundations = foundations.map(p => [...p]);
        const newWaste = [...waste];

        let cardsToMove: CardType[] = [];
        // Get card(s) from origin
        if (fromOrigin === 'tableau') {
             cardsToMove = newTableau[fromPileIndex].splice(cardIndex!);
        } else if (fromOrigin === 'waste') {
            cardsToMove = [newWaste.pop()!];
        } else if (fromOrigin === 'foundation') {
            cardsToMove = [newFoundations[fromPileIndex].pop()!];
        }

        // Add card(s) to destination
        if (toPileType === 'tableau') {
            newTableau[toPileIndex].push(...cardsToMove);
        } else {
            newFoundations[toPileIndex].push(...cardsToMove);
        }

        // Flip newly revealed card in tableau
        if (fromOrigin === 'tableau' && newTableau[fromPileIndex].length > 0) {
            newTableau[fromPileIndex][newTableau[fromPileIndex].length - 1].isFaceUp = true;
        }
        
        setTableau(newTableau);
        setFoundations(newFoundations);
        setWaste(newWaste);
        setSelectedCard(null);
        checkWinCondition(newFoundations);
    }
    
    const handleTableauClick = (pileIndex: number, cardIndex: number | undefined) => {
        const pile = tableau[pileIndex];
        
        if (selectedCard) {
            // This is a destination click
            const destinationCard = pile.length > 0 ? pile[pile.length - 1] : null;
             if (isMoveValid(selectedCard.card, destinationCard, 'tableau')) {
                moveCard(selectedCard.card, selectedCard.cardIndex, selectedCard.origin, selectedCard.pileIndex, 'tableau', pileIndex);
            } else {
                 setSelectedCard(null); // Invalid move, deselect
            }
        } else {
             // This is a source click
            if (pile.length === 0) return;
            const clickedCard = pile[cardIndex!];
            if (clickedCard.isFaceUp) {
                setSelectedCard({ card: clickedCard, origin: 'tableau', pileIndex, cardIndex });
            }
        }
    };
    
    const handleFoundationClick = (pileIndex: number) => {
         if (selectedCard) {
            const destinationPile = foundations[pileIndex];
            const destinationCard = destinationPile.length > 0 ? destinationPile[destinationPile.length - 1] : null;
             if (isMoveValid(selectedCard.card, destinationCard, 'foundation')) {
                 moveCard(selectedCard.card, selectedCard.cardIndex, selectedCard.origin, selectedCard.pileIndex, 'foundation', pileIndex);
            } else {
                setSelectedCard(null);
            }
         }
    };
    
    const handleWasteClick = () => {
        if (waste.length > 0) {
            setSelectedCard({card: waste[waste.length - 1], origin: 'waste', pileIndex: 0})
        }
    }


  return (
    <div className="bg-green-800 min-h-screen text-white p-4">
      <header className="flex justify-between items-center mb-4">
        <Button asChild variant="ghost" className="hover:bg-white/10">
          <Link href="/arcade-saloon">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Arcade
          </Link>
        </Button>
        <h1 className="font-headline text-3xl font-bold">Solitaire</h1>
        <div className="flex gap-2">
            <Button variant="ghost" className="hover:bg-white/10" onClick={startGame}>
                <RefreshCw className="mr-2 h-4 w-4" /> New Game
            </Button>
        </div>
      </header>
      
      <main className="space-y-4">
        {/* Top row: Stock and Foundations */}
        <div className="flex justify-between">
            <div className="flex gap-4">
                <div onClick={drawCard} className="cursor-pointer">
                    {deck.length > 0 ? <CardComponent card={{suit: 'spades', rank: 'A', isFaceUp: false}} /> : <div className="aspect-[2.5/3.5] w-24 rounded-lg border-2 border-dashed border-white/30" />}
                </div>
                 <CardComponent 
                    card={waste.length > 0 ? waste[waste.length - 1] : null} 
                    onClick={handleWasteClick}
                    isSelected={selectedCard?.origin === 'waste'}
                 />
            </div>
            <div className="flex gap-4">
                {foundations.map((pile, index) => (
                    <CardComponent 
                        key={index} 
                        card={pile.length > 0 ? pile[pile.length - 1] : null} 
                        onClick={() => handleFoundationClick(index)}
                    />
                ))}
            </div>
        </div>

        {/* Tableau */}
        <div className="flex justify-between gap-2">
            {tableau.map((pile, pileIndex) => (
                <div key={pileIndex} className="relative w-24 h-[500px]" onClick={() => pile.length === 0 && handleTableauClick(pileIndex, undefined)}>
                    {pile.length === 0 && <div className="aspect-[2.5/3.5] w-24 rounded-lg border-2 border-dashed border-white/30" />}
                    {pile.map((card, cardIndex) => (
                        <div key={cardIndex} className="absolute" style={{ top: `${cardIndex * 30}px` }}>
                            <CardComponent 
                                card={card} 
                                onClick={() => handleTableauClick(pileIndex, cardIndex)}
                                isSelected={selectedCard?.origin === 'tableau' && selectedCard.pileIndex === pileIndex && selectedCard.cardIndex === cardIndex}
                             />
                        </div>
                    ))}
                </div>
            ))}
        </div>
        
        {gameOver && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <Card className="text-center p-8 bg-green-700 border-yellow-400">
                    <Trophy className="h-16 w-16 mx-auto text-yellow-400" />
                    <h2 className="text-3xl font-bold mt-4">Congratulations!</h2>
                    <p className="text-white/80">You've won the game!</p>
                    <Button onClick={startGame} className="mt-6">Play Again</Button>
                </Card>
            </div>
        )}
      </main>
    </div>
  );
}
