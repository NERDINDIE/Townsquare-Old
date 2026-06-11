
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Newspaper, Loader2, Award, Lightbulb } from '@/components/icons';
import Link from 'next/link';
import { generateNews, evaluatePaper, type NewsStory, type PaperLayout } from '@/ai/flows/the-paper-flow';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import Image from 'next/image';

type LayoutSlot = keyof PaperLayout;

export default function ThePaperGame() {
    const [newsPool, setNewsPool] = useState<NewsStory[]>([]);
    const [layout, setLayout] = useState<PaperLayout>({
        leadStory: null,
        photoStory: null,
        sideStory1: null,
        sideStory2: null,
    });
    const [selectedStory, setSelectedStory] = useState<NewsStory | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isEvaluating, setIsEvaluating] = useState(false);
    const [result, setResult] = useState<{ score: number; feedback: string } | null>(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                setIsLoading(true);
                const stories = await generateNews();
                setNewsPool(stories);
            } catch (error) {
                console.error("Failed to generate news:", error);
                toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: 'Could not fetch today\'s stories. Please try again later.',
                });
            } finally {
                setIsLoading(false);
            }
        };
        fetchNews();
    }, []);

    const handleSelectStory = (story: NewsStory) => {
        setSelectedStory(story);
    };

    const handlePlaceStory = (slot: LayoutSlot) => {
        if (!selectedStory) return;

        // Prevent placing the same story in multiple slots
        if (Object.values(layout).some(s => s?.id === selectedStory.id)) {
            toast({
                variant: 'destructive',
                title: 'Story Already Placed',
                description: 'This story is already in your layout. Choose another.',
            });
            return;
        }

        setLayout(prev => ({ ...prev, [slot]: selectedStory }));
        setSelectedStory(null);
    };

    const handleRemoveStory = (slot: LayoutSlot) => {
        setLayout(prev => ({ ...prev, [slot]: null }));
    };

    const handleSubmit = async () => {
        const filledSlots = Object.values(layout).filter(Boolean);
        if (filledSlots.length < 4) {
             toast({
                variant: 'destructive',
                title: 'Incomplete Paper',
                description: 'You must fill all the story slots before submitting.',
            });
            return;
        }

        setIsEvaluating(true);
        setResult(null);
        try {
            const evaluation = await evaluatePaper(layout as Required<PaperLayout>);
            setResult(evaluation);
             toast({
                title: `You scored ${evaluation.score}/100!`,
                description: "The editor's feedback is in.",
            });
        } catch (error) {
            console.error("Failed to evaluate paper:", error);
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Could not get the editor\'s feedback. Please try again.',
            });
        } finally {
            setIsEvaluating(false);
        }
    };
    
    const restartGame = () => {
        setLayout({
            leadStory: null,
            photoStory: null,
            sideStory1: null,
            sideStory2: null,
        });
        setResult(null);
        setSelectedStory(null);
        // Optionally re-fetch news
    };

    const renderSlot = (slot: LayoutSlot, title: string, className: string) => {
        const story = layout[slot];
        return (
            <div
                className={cn(
                    "border-2 border-dashed rounded-lg p-2 flex flex-col justify-center items-center text-center transition-colors",
                    selectedStory ? 'border-primary/50 bg-primary/10 cursor-pointer hover:bg-primary/20' : 'border-muted-foreground/30',
                    className
                )}
                onClick={() => selectedStory && handlePlaceStory(slot)}
            >
                {story ? (
                    <div className="w-full h-full bg-white dark:bg-muted/50 rounded-md p-2 flex flex-col relative">
                        {story.imageUrl && (
                             <div className="relative h-16 w-full mb-2 rounded-sm overflow-hidden">
                                <Image src={story.imageUrl} alt={story.headline} fill className="object-cover" />
                             </div>
                        )}
                        <p className="text-xs font-bold">{story.headline}</p>
                        <p className="text-[10px] text-muted-foreground mt-1 leading-tight">{story.summary}</p>
                        <Button
                            variant="destructive"
                            size="icon"
                            className="absolute -top-2 -right-2 h-5 w-5"
                            onClick={(e) => { e.stopPropagation(); handleRemoveStory(slot); }}
                        >
                            <span className="text-xs">X</span>
                        </Button>
                    </div>
                ) : (
                    <div className="text-muted-foreground">
                        <p className="font-bold text-sm">{title}</p>
                        <p className="text-xs">{selectedStory ? 'Place story here' : 'Select a story'}</p>
                    </div>
                )}
            </div>
        );
    };

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center text-center">
                <div>
                    <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
                    <h2 className="mt-4 text-xl font-semibold">Generating Today's News...</h2>
                    <p className="text-muted-foreground">Our AI journalists are on the scene!</p>
                </div>
            </div>
        );
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
                        <Newspaper className="h-10 w-10" />
                        The Paper
                    </h1>
                    <p className="text-muted-foreground mt-1 text-lg">Create the most striking front page to win!</p>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* News Pool */}
                <Card className="lg:col-span-1 h-fit">
                    <CardHeader>
                        <CardTitle>Today's Stories</CardTitle>
                        <CardDescription>Select a story to place it in the layout.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {newsPool.map(story => (
                            <button
                                key={story.id}
                                onClick={() => handleSelectStory(story)}
                                disabled={!!Object.values(layout).find(s => s?.id === story.id)}
                                className={cn(
                                    "w-full text-left p-2 rounded-lg border-2",
                                    selectedStory?.id === story.id ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50',
                                    !!Object.values(layout).find(s => s?.id === story.id) && 'opacity-50 cursor-not-allowed'
                                )}
                            >
                                <p className="font-bold text-sm">{story.headline}</p>
                                <p className="text-xs text-muted-foreground mt-1">{story.summary}</p>
                            </button>
                        ))}
                    </CardContent>
                </Card>

                {/* Newspaper Layout */}
                <div className="lg:col-span-2">
                    <Card className="p-4 bg-muted/20">
                        <div className="bg-background shadow-lg rounded-lg p-2 aspect-[3/4] max-w-lg mx-auto">
                            <h2 className="font-headline text-center text-4xl font-bold border-b-4 border-black pb-1 mb-2">The Townsquare Times</h2>
                            <div className="grid grid-cols-3 grid-rows-4 gap-2 h-[calc(100%-4rem)]">
                                {renderSlot('leadStory', 'Lead Story', 'col-span-2 row-span-2')}
                                {renderSlot('photoStory', 'Main Photo', 'col-span-1 row-span-2')}
                                {renderSlot('sideStory1', 'Side Story 1', 'col-span-3 row-span-1')}
                                {renderSlot('sideStory2', 'Side Story 2', 'col-span-3 row-span-1')}
                            </div>
                        </div>
                    </Card>
                     <div className="mt-4 flex gap-4">
                        <Button onClick={handleSubmit} disabled={isEvaluating}>
                             {isEvaluating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                             Go to Print!
                        </Button>
                        <Button variant="secondary" onClick={restartGame}>Start Over</Button>
                    </div>

                    {result && (
                         <Card className="mt-6">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><Award className="text-yellow-500" /> Editor's Feedback</CardTitle>
                                <CardDescription>Score: <span className="font-bold text-primary">{result.score}/100</span></CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="italic text-muted-foreground">"{result.feedback}"</p>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
}
