

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
import OceaniaPage from "../oceania/page";
import EurasiaPage from "../eurasia/page";
import EastasiaPage from "../eastasia/page";
import AnimalFarmPage from "../animal-farm/page";
import NewspeakPage from "../newspeak/page";
import DanishKingdomPage from "../danish-kingdom/page";
import GeatlandPage from "../geatland/page";
import PrideAndPrejudicePage from "../pride-and-prejudice/page";

const editions = [
    {
        id: 'europe',
        title: 'Europe',
        description: 'This edition will focus mainly on Europe with breaking news from around the world.',
    },
    {
        id: 'united-states',
        title: 'United States',
        description: 'This edition will focus mainly on the United States with breaking news from around the world.',
    },
    {
        id: 'international',
        title: 'International',
        description: 'This edition will provide a more balanced coverage of all the news from around the world.',
    },
    {
        id: 'united-kingdom',
        title: 'United Kingdom',
        description: 'This edition will focus mainly on the United Kingdom with breaking news from around the world.',
    },
    {
        id: 'oceania',
        title: 'Oceania',
        description: 'For loyal Party members only. Doubleplusgood.',
    },
    {
        id: 'eurasia',
        title: 'Eurasia',
        description: 'The collective is eternal. The individual is an illusion.',
    },
    {
        id: 'eastasia',
        title: 'Eastasia',
        description: 'To know and not to know... To be conscious of complete truthfulness while telling carefully constructed lies.',
    },
    {
        id: 'animal-farm',
        title: 'Animal Farm',
        description: 'Four legs good, two legs better!',
    },
    {
        id: 'newspeak',
        title: 'Oceania (Newspeak)',
        description: "It's a beautiful thing, the destruction of words.",
    },
    {
        id: 'danish-kingdom',
        title: 'Danish Kingdom',
        description: 'Hark, the great mead-hall of Heorot awaits!',
    },
    {
        id: 'geatland',
        title: 'Geatland',
        description: 'Home of the mighty hero, Beowulf.',
    },
    {
        id: 'pride-and-prejudice',
        title: 'Pride and Prejudice',
        description: 'A truth universally acknowledged...',
    },
];

function EditionHeader({ edition, onChange }: { edition: string, onChange: () => void }) {
    const currentEdition = editions.find(e => e.id === edition);
    return (
        <header className="mb-8">
            <h1 className="font-headline text-4xl font-bold">{currentEdition?.title} Edition</h1>
            <p className="text-muted-foreground mt-1">Your personalized news feed.</p>
            <Button variant="link" className="p-0 h-auto mt-2" onClick={onChange}>Change Edition</Button>
        </header>
    )
}

function NewsFeed({ edition, onChangeEdition }: { edition: string, onChangeEdition: () => void }) {
    if (edition === 'oceania') {
        return <OceaniaPage onChangeEdition={onChangeEdition} />;
    }
    if (edition === 'eurasia') {
        return <EurasiaPage onChangeEdition={onChangeEdition} />;
    }
    if (edition === 'eastasia') {
        return <EastasiaPage onChangeEdition={onChangeEdition} />;
    }
    if (edition === 'animal-farm') {
        return <AnimalFarmPage onChangeEdition={onChangeEdition} />;
    }
    if (edition === 'newspeak') {
        return <NewspeakPage onChangeEdition={onChangeEdition} />;
    }
    if (edition === 'danish-kingdom') {
        return <DanishKingdomPage onChangeEdition={onChangeEdition} />;
    }
    if (edition === 'geatland') {
        return <GeatlandPage onChangeEdition={onChangeEdition} />;
    }
    if (edition === 'pride-and-prejudice') {
        return <PrideAndPrejudicePage onChangeEdition={onChangeEdition} />;
    }


    const feedArticles = articles.slice(0, 5); // Placeholder for region-specific articles

    return (
        <div className="container mx-auto max-w-4xl px-4 py-8 md:py-12">
            <EditionHeader edition={edition} onChange={onChangeEdition} />
            <div className="space-y-8">
                {feedArticles.map((article, index) => (
                    <div key={article.id}>
                        <ArticleCard article={article} />
                        {index < feedArticles.length - 1 && <Separator className="mt-8" />}
                    </div>
                ))}
            </div>
        </div>
    )
}


export default function CommunityPostSetupPage() {
    const [selectedEdition, setSelectedEdition] = useState<string | null>(null);
    const [showSetup, setShowSetup] = useState(true);
    const [editionChoice, setEditionChoice] = useState('europe');

    useEffect(() => {
        const savedEdition = localStorage.getItem('community-post-edition');
        if (savedEdition) {
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
                        Please select the edition which is most relevant to you. Your edition will guide your news feed but you will still have access to all news stories as they are reported.
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
