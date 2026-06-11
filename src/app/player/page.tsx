
'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { usePlayerState } from "@/hooks/use-player-state";
import { Bed, ChevronDown, FastForward, ListMusic, MoreHorizontal, Play, Repeat, Rewind, Share2, Shuffle, SkipBack, SkipForward, Speech, Tv } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";


export default function PlayerPage() {
    const router = useRouter();
    const { currentMedia, isPlaying, togglePlay } = usePlayerState();


    return (
        <div className="bg-black text-primary-foreground h-screen flex flex-col p-4 md:p-8">
            <header className="flex justify-between items-center">
                <Button onClick={() => router.back()} variant="ghost" size="icon">
                    <ChevronDown className="h-6 w-6" />
                </Button>
                <div className="text-center">
                    <p className="text-sm text-muted-foreground uppercase flex items-center gap-2"><Tv className="h-4 w-4" /> {currentMedia?.type || 'Playing from'}</p>
                    <p className="font-semibold">{currentMedia?.title || 'Unknown Media'}</p>
                </div>
                 <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-6 w-6" />
                </Button>
            </header>

            <main className="flex-1 flex flex-col justify-center items-center gap-8 py-8">
                <div className="relative w-full aspect-video rounded-lg shadow-2xl overflow-hidden bg-black">
                    <Image
                        src="https://placehold.co/1920x1080.png"
                        alt="Live TV"
                        fill
                        className="object-contain"
                        data-ai-hint="live television show"
                    />
                </div>

                <div className="w-full text-center">
                    <h2 className="text-2xl font-bold">{currentMedia?.title || 'Unknown Title'}</h2>
                    <p className="text-lg text-muted-foreground">Live</p>
                </div>
            </main>

            <footer className="w-full max-w-md mx-auto">
                <div className="w-full">
                    <Slider defaultValue={[25]} max={100} step={1} disabled />
                    <div className="flex justify-between text-xs text-muted-foreground mt-2">
                        <span>1:15</span>
                        <span>-28:30</span>
                    </div>
                </div>

                <div className="flex justify-between items-center mt-4">
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary-foreground">
                        <Shuffle className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary-foreground">
                        <SkipBack className="h-8 w-8" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary-foreground">
                        <Rewind className="h-8 w-8" />
                    </Button>
                    <Button onClick={togglePlay} variant="ghost" size="icon" className="w-20 h-20 bg-primary text-primary-foreground rounded-full hover:bg-primary/90">
                        {isPlaying ? (
                            <Play className="h-10 w-10 fill-primary-foreground transform -scale-x-100" />
                        ) : (
                            <Play className="h-10 w-10 fill-primary-foreground" />
                        )}
                    </Button>
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary-foreground">
                        <FastForward className="h-8 w-8" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary-foreground">
                        <SkipForward className="h-8 w-8" />
                    </Button>
                     <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary-foreground">
                        <Repeat className="h-5 w-5" />
                    </Button>
                </div>

                <div className="flex justify-between items-center mt-6 text-muted-foreground">
                     <Button variant="ghost" size="icon">
                        <Share2 className="h-5 w-5" />
                    </Button>
                    <div className="flex items-center gap-4">
                         <Button variant="ghost" size="icon">
                           <Speech className="h-5 w-5" />
                        </Button>
                         <Button variant="ghost" size="icon">
                           <ListMusic className="h-5 w-5" />
                        </Button>
                    </div>
                     <Button variant="ghost" size="icon">
                        <Share2 className="h-5 w-5 opacity-0" />
                    </Button>
                </div>
            </footer>
        </div>
    );
}
