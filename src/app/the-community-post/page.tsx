

'use client';

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { toast } from '@/hooks/use-toast';
import { articles } from "@/lib/data";
import { ArticleCard } from "@/components/ArticleCard";
import { Separator } from "@/components/ui/separator";
import Link from 'next/link';

const editions = [
    {
        id: 'oceania',
        title: 'Oceania',
        description: 'For loyal Party members only. Doubleplusgood.',
        href: '/oceania'
    },
    {
        id: 'eurasia',
        title: 'Eurasia',
        description: 'The collective is eternal. The individual is an illusion.',
        href: '/eurasia'
    },
    {
        id: 'eastasia',
        title: 'Eastasia',
        description: 'To know and not to know... To be conscious of complete truthfulness while telling carefully constructed lies.',
        href: '/eastasia'
    },
    {
        id: 'animal-farm',
        title: 'Animal Farm',
        description: 'Four legs good, two legs better!',
        href: '/animal-farm'
    },
    {
        id: 'newspeak',
        title: 'Oceania (Newspeak)',
        description: "It's a beautiful thing, the destruction of words.",
        href: '/newspeak'
    },
    {
        id: 'danish-kingdom',
        title: 'Danish Kingdom',
        description: 'Hark, the great mead-hall of Heorot awaits!',
        href: '/danish-kingdom'
    },
    {
        id: 'geatland',
        title: 'Geatland',
        description: 'Home of the mighty hero, Beowulf.',
        href: '/geatland'
    },
    {
        id: 'pride-and-prejudice',
        title: 'Pride and Prejudice',
        description: 'A truth universally acknowledged...',
        href: '/pride-and-prejudice'
    },
    {
        id: 'aethelgard',
        title: 'Aethelgard',
        description: 'A world of swords, sorcery, and summoned heroes.',
        href: '/townsquares/aethelgard'
    },
];

function NewsFeed({ edition, onChangeEdition }: { edition: string, onChangeEdition: () => void }) {
    const currentEdition = editions.find(e => e.id === edition);
    if (!currentEdition) return null;

    return (
        <div className="container mx-auto max-w-4xl px-4 py-8 md:py-12">
            <header className="mb-8">
                <h1 className="font-headline text-4xl font-bold">{currentEdition.title} Edition</h1>
                <p className="text-muted-foreground mt-1">{currentEdition.description}</p>
                <Button variant="link" className="p-0 h-auto mt-2" onClick={onChangeEdition}>Change Edition</Button>
            </header>
            <div className="text-center p-8 border-dashed border-2 rounded-lg">
                <p className="text-muted-foreground">This is a placeholder for the news feed.</p>
                <p className="text-sm">In a real app, you would see content related to {currentEdition.title}.</p>
                <Button asChild variant="default" className="mt-4">
                    <Link href={currentEdition.href}>Go to {currentEdition.title} page</Link>
                </Button>
            </div>
        </div>
    )
}


export default function CommunityPostSetupPage() {
    const [selectedEdition, setSelectedEdition] = useState<string | null>(null);
    const [showSetup, setShowSetup] = useState(true);
    const [editionChoice, setEditionChoice] = useState('oceania');

    useEffect(() => {
        const savedEdition = localStorage.getItem('community-post-edition');
        if (savedEdition && editions.some(e => e.id === savedEdition)) {
            setSelectedEdition(savedEdition);
            setShowSetup(false);
        }
    }, []);
    
    const handleContinue = () => {
        localStorage.setItem('community-post-edition', editionChoice);
        setSelectedEdition(editionChoice);
        setShowSetup(false);
        toast({
            title: "Edition Saved",
            description: `Your news feed will now be focused on the ${editions.find(e => e.id === editionChoice)?.title} edition.`,
        });
    }

    const handleChangeEdition = () => {
        localStorage.removeItem('community-post-edition');
        setSelectedEdition(null);
        setShowSetup(true);
    }

    if (!showSetup && selectedEdition) {
        return <NewsFeed edition={selectedEdition} onChangeEdition={handleChangeEdition} />
    }

    return (
        <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-md">
                <header className="text-center mb-8">
                    <h1 className="text-xl text-gray-300">
                        Please select an alternate edition to explore.
                    </h1>
                </header>

                <main className="space-y-4">
                    <RadioGroup value={editionChoice} onValueChange={setEditionChoice}>
                        {editions.map((edition) => (
                             <Card 
                                key={edition.id} 
                                className={cn(
                                    "bg-gray-800 border border-gray-700 text-white cursor-pointer transition-colors",
                                    editionChoice === edition.id && "border-white"
                                )}
                                onClick={() => setEditionChoice(edition.id)}
                            >
                                <CardContent className="p-4">
                                     <div className="flex items-start gap-4">
                                        <div className="mt-1">
                                            <RadioGroupItem value={edition.id} id={edition.id} className="border-gray-500" />
                                        </div>
                                        <Label htmlFor={edition.id} className="flex-1 cursor-pointer">
                                            <h2 className="text-lg font-semibold">{edition.title}</h2>
                                            <p className="text-gray-400 mt-1">{edition.description}</p>
                                        </Label>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </RadioGroup>
                </main>

                <footer className="mt-8">
                    <Button 
                        className="w-full bg-white text-black hover:bg-gray-200" 
                        size="lg"
                        onClick={handleContinue}
                    >
                        Continue
                    </Button>
                </footer>
            </div>
        </div>
    );
}
