
'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, MessageSquare, Undo, X, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const potentialMatches = [
    { name: 'Olivia, 28', bio: 'Loves hiking, trying new cafes, and Italian food. Looking for someone to explore the city with.', image: 'https://placehold.co/600x800.png', dataAiHint: 'woman portrait smiling' },
    { name: 'Alex, 31', bio: 'Software engineer by day, musician by night. My dog is my best friend. Let\'s grab a drink?', image: 'https://placehold.co/600x800.png', dataAiHint: 'man portrait friendly' },
    { name: 'Chloe, 26', bio: 'Art gallery enthusiast and amateur potter. Always down for a spontaneous road trip.', image: 'https://placehold.co/600x800.png', dataAiHint: 'woman portrait artistic' },
];

const currentMatches = [
    { name: 'Olivia', avatar: 'https://github.com/randomuser-olivia.png' },
    { name: 'Ben', avatar: 'https://github.com/randomuser-ben.png' },
    { name: 'Sophia', avatar: 'https://github.com/randomuser-sophia.png' },
];

const iceBreakers = [
    "What's a travel story you'll never forget?",
    "If you could have any superpower, what would it be?",
    "What's the best concert you've ever been to?",
];

export default function RendezvousPage() {
    const [profiles, setProfiles] = useState(potentialMatches);
    const [lastAction, setLastAction] = useState<{ action: 'like' | 'dislike', profile: any } | null>(null);

    const handleSwipe = (action: 'like' | 'dislike') => {
        if (profiles.length === 0) return;
        const swipedProfile = profiles[profiles.length - 1];
        setLastAction({ action, profile: swipedProfile });
        setProfiles(prev => prev.slice(0, prev.length - 1));
    };
    
    const handleUndo = () => {
        if(lastAction) {
            setProfiles(prev => [...prev, lastAction.profile]);
            setLastAction(null);
        }
    }
    
    const currentProfile = profiles[profiles.length - 1];

    return (
        <div 
            className="container mx-auto max-w-4xl px-4 py-8 md:py-12"
            style={{'--brand-color': 'hsl(var(--brand-rendezvous))'} as React.CSSProperties}
        >
             <header className="mb-8 text-center">
                <h1 className="font-headline text-5xl font-bold flex items-center justify-center gap-3" style={{color: 'var(--brand-color)'}}>
                   <Heart className="h-12 w-12" />
                    Rendezvous
                </h1>
                <p className="mt-2 text-lg text-muted-foreground">
                    Meet new people. Find your match.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Main Swiping Area */}
                <main className="md:col-span-2 flex flex-col items-center">
                    <div className="relative w-full max-w-sm aspect-[3/4]">
                        <AnimatePresence>
                        {profiles.map((profile, index) => (
                             index === profiles.length - 1 && (
                                <motion.div
                                    key={profile.name}
                                    drag="x"
                                    dragConstraints={{ left: -100, right: 100 }}
                                    onDragEnd={(event, info) => {
                                        if (info.offset.x > 50) handleSwipe('like');
                                        else if (info.offset.x < -50) handleSwipe('dislike');
                                    }}
                                    initial={{ scale: 0.95, y: 10, opacity: 0.8 }}
                                    animate={{ scale: 1, y: 0, opacity: 1 }}
                                    exit={{ x: info => info.offset.x > 0 ? 200 : -200, opacity: 0 }}
                                    className="absolute w-full h-full"
                                >
                                    <Card className="w-full h-full overflow-hidden shadow-2xl">
                                        <div className="relative w-full h-full">
                                            <Image src={profile.image} alt={profile.name} fill className="object-cover" data-ai-hint={profile.dataAiHint} />
                                            <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
                                                <h3 className="text-2xl font-bold">{profile.name}</h3>
                                                <p className="text-sm mt-1">{profile.bio}</p>
                                            </div>
                                        </div>
                                    </Card>
                                </motion.div>
                            )
                        ))}
                        </AnimatePresence>
                         {!currentProfile && (
                            <Card className="w-full h-full flex flex-col items-center justify-center text-center p-8 bg-muted">
                                <h3 className="text-xl font-semibold">No more profiles</h3>
                                <p className="text-muted-foreground mt-2">You've seen everyone in your area. Check back later for new people!</p>
                            </Card>
                        )}
                    </div>
                    <div className="flex items-center gap-4 mt-8">
                        <Button onClick={handleUndo} disabled={!lastAction} variant="outline" size="icon" className="w-16 h-16 rounded-full shadow-lg"><Undo className="h-8 w-8 text-yellow-500" /></Button>
                        <Button onClick={() => handleSwipe('dislike')} disabled={!currentProfile} variant="destructive" size="icon" className="w-20 h-20 rounded-full shadow-lg"><X className="h-10 w-10" /></Button>
                        <Button onClick={() => handleSwipe('like')} disabled={!currentProfile} size="icon" className="w-20 h-20 rounded-full shadow-lg" style={{backgroundColor: 'var(--brand-color)'}}><Heart className="h-10 w-10 fill-white" /></Button>
                        <Button variant="outline" size="icon" className="w-16 h-16 rounded-full shadow-lg"><Star className="h-8 w-8 text-blue-500" /></Button>
                    </div>
                </main>
                
                {/* Sidebar */}
                <aside className="space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><MessageSquare /> Matches</CardTitle>
                            <CardDescription>Your current conversations.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-4 gap-4">
                                {currentMatches.map(match => (
                                     <Link href="/mailbox/6" key={match.name}>
                                        <div className="flex flex-col items-center gap-1">
                                            <Avatar className="h-14 w-14">
                                                <AvatarImage src={match.avatar} />
                                                <AvatarFallback>{match.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <p className="text-xs font-medium">{match.name}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Ice Breakers</CardTitle>
                             <CardDescription>Need help starting a conversation?</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {iceBreakers.map((q, i) => (
                                <p key={i} className="text-sm italic text-muted-foreground">"{q}"</p>
                            ))}
                        </CardContent>
                    </Card>
                </aside>
            </div>
        </div>
    );
}
