
'use client';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AlignLeft, Film, Search, Star, Tv } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { channels, programs, timeSlots } from '@/lib/data/tv-guide-data';

const calculateWidth = (start: string, end: string) => {
    const parseTime = (time: string) => {
        const [hour, minute] = time.split(/[:\s]/);
        return parseInt(hour, 10) * 60 + parseInt(minute, 10);
    };
    const startTime = parseTime(start);
    const endTime = parseTime(end);
    const duration = endTime - startTime;
    // Assuming each 30-minute slot is 200px wide
    return (duration / 30) * 200;
};

export default function TVGuidePage() {
    const router = useRouter();

    return (
        <div className="bg-background text-foreground h-screen flex flex-col">
            {/* Header */}
            <header className="flex items-center justify-between p-4 flex-shrink-0">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => router.back()}>
                        <AlignLeft />
                    </Button>
                    <h1 className="text-2xl font-bold text-yellow-400">Townsquare<span className="text-primary">TV</span></h1>
                </div>
                <div className="flex items-center gap-4">
                    <Button variant="ghost" className="border border-yellow-400 text-yellow-400 rounded-full">
                        <Tv className="mr-2 h-4 w-4" /> Live TV
                    </Button>
                    <Button variant="ghost" className="text-muted-foreground">
                        <Film className="mr-2 h-4 w-4" /> On Demand
                    </Button>
                    <Button variant="ghost" size="icon">
                        <Search />
                    </Button>
                </div>
                <Button variant="ghost" size="icon">
                    <Star />
                </Button>
            </header>

            {/* Main Content: Player and Guide */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Video Player */}
                <div className="relative w-full aspect-video bg-black flex-shrink-0">
                    <Link href="/player">
                        <Image
                            src="https://placehold.co/1920x1080.png"
                            alt="Live TV content"
                            fill
                            style={{ objectFit: "contain" }}
                            data-ai-hint="teen wolf movie still"
                        />
                    </Link>
                </div>

                {/* EPG */}
                <div className="flex-1 flex flex-col overflow-hidden bg-muted/30">
                    {/* Timeline Header */}
                    <div className="flex-shrink-0 flex items-center pl-40 border-b border-border">
                        {timeSlots.map(time => (
                            <div key={time} className="w-48 text-center py-2 text-sm text-muted-foreground">{time}</div>
                        ))}
                    </div>

                    {/* Guide Body */}
                    <ScrollArea className="flex-1">
                        <div className="flex">
                            {/* Channels Column */}
                            <div className="w-40 flex-shrink-0">
                                {channels.map(channel => (
                                    <div key={channel.id} className="h-24 flex items-center justify-center p-2 border-b border-border bg-card">
                                        <Image src={channel.logo} alt={channel.name} width={100} height={50} />
                                    </div>
                                ))}
                            </div>
                            {/* Programs Grid */}
                            <div className="relative flex-1">
                                {channels.map(channel => (
                                    <div key={channel.id} className="h-24 flex items-center border-b border-border">
                                        {(programs[channel.id as keyof typeof programs] || []).map((program, index) => {
                                             const width = calculateWidth(program.start, program.end);
                                             const marginLeft = (calculateWidth('2:00 PM', program.start));
                                             const isActive = channel.id === 57 && index === 0;

                                            return (
                                                <div
                                                    key={index}
                                                    className={`absolute h-20 p-2 flex flex-col justify-center rounded-md bg-card hover:bg-muted transition-colors ${isActive ? 'border-2 border-yellow-400' : ''}`}
                                                    style={{ width: `${width}px`, marginLeft: `${marginLeft}px` }}
                                                >
                                                    <p className="font-semibold truncate text-card-foreground">{program.title}</p>
                                                    {program.subtitle && <p className="text-sm text-muted-foreground truncate">{program.subtitle}</p>}
                                                </div>
                                            )
                                        })}
                                    </div>
                                ))}
                                {/* Current Time Indicator */}
                                 <div className="absolute top-0 bottom-0 w-0.5 bg-yellow-400" style={{ left: '100px' }}>
                                    <div className="absolute -top-1 -left-1 h-2.5 w-2.5 rounded-full bg-yellow-400"></div>
                                </div>
                            </div>
                        </div>
                    </ScrollArea>
                </div>
            </div>
        </div>
    );
}
