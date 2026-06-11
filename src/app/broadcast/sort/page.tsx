
'use client';

import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { initialLiveChannels } from "@/lib/data/broadcast-data";
import { ArrowDown, ArrowUp, GripVertical, ListOrdered, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Channel = typeof initialLiveChannels[0];

export default function SortChannelsPage() {
    const router = useRouter();
    const [channels, setChannels] = useState<Channel[]>([]);

    useEffect(() => {
        const storedOrder = localStorage.getItem('tv_channel_order');
        if (storedOrder) {
            try {
                const orderedChannels = JSON.parse(storedOrder);
                setChannels(orderedChannels);
            } catch (e) {
                console.error("Failed to parse channel order from localStorage", e);
                setChannels(initialLiveChannels);
            }
        } else {
            setChannels(initialLiveChannels);
        }
    }, []);
    
    const moveChannel = (index: number, direction: 'up' | 'down') => {
        if (direction === 'up' && index === 0) return;
        if (direction === 'down' && index === channels.length - 1) return;

        const newChannels = [...channels];
        const channelToMove = newChannels[index];
        const swapIndex = direction === 'up' ? index - 1 : index + 1;
        
        newChannels[index] = newChannels[swapIndex];
        newChannels[swapIndex] = channelToMove;
        
        setChannels(newChannels);
    }

    const handleDone = () => {
        localStorage.setItem('tv_channel_order', JSON.stringify(channels));
        toast({
            title: "Channel Order Saved",
            description: "Your new channel order has been saved.",
        });
        router.push('/broadcast');
    };

    return (
        <div className="bg-background text-foreground min-h-screen">
            <header className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-4 border-b">
                <div className="container mx-auto max-w-2xl flex items-center justify-between">
                    <Button variant="ghost" size="icon" onClick={() => router.back()}>
                        <X className="h-5 w-5" />
                    </Button>
                    <h1 className="text-lg font-semibold">チャンネルの並べ替え</h1>
                    <Button variant="ghost" onClick={handleDone} className="font-semibold text-primary">完了</Button>
                </div>
            </header>
            <main className="container mx-auto max-w-2xl py-4">
                <ul className="space-y-2">
                    {channels.map((channel, index) => (
                        <li key={channel.name} className="flex items-center gap-4 bg-muted/30 p-2 rounded-lg">
                           <div className="flex-1 font-semibold">
                             {channel.name}
                           </div>
                           <div className="flex gap-1">
                                <Button size="icon" variant="ghost" onClick={() => moveChannel(index, 'up')} disabled={index === 0}>
                                    <ArrowUp className="h-5 w-5" />
                                </Button>
                               <Button size="icon" variant="ghost" onClick={() => moveChannel(index, 'down')} disabled={index === channels.length - 1}>
                                    <ArrowDown className="h-5 w-5" />
                                </Button>
                               <Button size="icon" variant="ghost" className="cursor-grab active:cursor-grabbing">
                                    <GripVertical className="h-5 w-5" />
                                </Button>
                           </div>
                        </li>
                    ))}
                </ul>
            </main>
        </div>
    );
}
