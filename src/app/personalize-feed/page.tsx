
'use client';

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Plus, Check, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Progress } from '@/components/ui/progress';

const topics = [
    { id: 'politics', name: 'Politics', image: 'https://placehold.co/100x100.png', dataAiHint: 'politics icon' },
    { id: 'european-politics', name: 'European Politics', image: 'https://placehold.co/100x100.png', dataAiHint: 'european union flag' },
    { id: 'international', name: 'International', image: 'https://placehold.co/100x100.png', dataAiHint: 'world globe' },
    { id: 'world-leaders', name: 'World Leaders', image: 'https://placehold.co/100x100.png', dataAiHint: 'political gathering' },
    { id: 'technology', name: 'Technology', image: 'https://placehold.co/100x100.png', dataAiHint: 'abstract tech pattern' },
    { id: 'uk-politics', name: 'UK Politics', image: 'https://placehold.co/100x100.png', dataAiHint: 'uk houses parliament' },
    { id: 'science', name: 'Science', image: 'https://placehold.co/100x100.png', dataAiHint: 'science dna helix' },
    { id: 'us-politics', name: 'US Politics', image: 'https://placehold.co/100x100.png', dataAiHint: 'us capitol building' },
    { id: 'business', name: 'Business', image: 'https://placehold.co/100x100.png', dataAiHint: 'business chart' },
];

const MIN_TOPICS = 3;

export default function PersonalizeFeedPage() {
    const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
    const router = useRouter();

    const handleToggleTopic = (topicId: string) => {
        setSelectedTopics(prev =>
            prev.includes(topicId)
                ? prev.filter(id => id !== topicId)
                : [...prev, topicId]
        );
    };
    
    const handleContinue = () => {
        if (selectedTopics.length >= MIN_TOPICS) {
            toast({
                title: 'Feed Personalized',
                description: `You are now following ${selectedTopics.length} topics.`,
            });
            router.push('/subscriptions');
        } else {
             toast({
                variant: 'destructive',
                title: 'Select More Topics',
                description: `Please select at least ${MIN_TOPICS} topics to continue.`,
            });
        }
    }

    const progress = Math.min((selectedTopics.length / MIN_TOPICS) * 100, 100);

    return (
        <div className="bg-gray-900 text-white min-h-screen flex flex-col">
            <header className="p-4 flex items-center justify-between sticky top-0 bg-gray-900 z-10">
                 <Button asChild variant="ghost" size="icon">
                    <Link href="/subscriptions">
                        <ArrowLeft />
                    </Link>
                </Button>
                <div className="text-center flex-1">
                    <h1 className="text-2xl font-bold">Personalize your feed</h1>
                    <p className="text-gray-400">Please select ${MIN_TOPICS} or more topics.</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center font-bold">
                    {selectedTopics.length}/{MIN_TOPICS}
                </div>
            </header>

            <main className="flex-1 overflow-y-auto p-4">
                <div className="space-y-2">
                    {topics.map(topic => {
                        const isSelected = selectedTopics.includes(topic.id);
                        return (
                            <div
                                key={topic.id}
                                onClick={() => handleToggleTopic(topic.id)}
                                className="flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-colors hover:bg-gray-800"
                            >
                                <Avatar className="h-12 w-12">
                                    <AvatarImage src={topic.image} alt={topic.name} data-ai-hint={topic.dataAiHint} />
                                    <AvatarFallback>{topic.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <p className="flex-1 font-medium text-lg">{topic.name}</p>
                                <button className={cn(
                                    "h-8 w-8 rounded-full flex items-center justify-center border-2 transition-all",
                                    isSelected ? "bg-white border-white text-gray-900" : "border-gray-500 text-white"
                                )}>
                                    {isSelected ? <Check className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                                </button>
                            </div>
                        )
                    })}
                </div>
            </main>

            <footer className="p-4 border-t border-gray-700 sticky bottom-0 bg-gray-900">
                <div className="mb-4">
                    <Progress value={progress} className="h-1 bg-gray-700 [&>div]:bg-white" />
                </div>
                <Button
                    className="w-full bg-white text-black hover:bg-gray-200 disabled:bg-gray-600 disabled:text-gray-400"
                    size="lg"
                    onClick={handleContinue}
                    disabled={selectedTopics.length < MIN_TOPICS}
                >
                    Continue
                </Button>
            </footer>
        </div>
    );
}
