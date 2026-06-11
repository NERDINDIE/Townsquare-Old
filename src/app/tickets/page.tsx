
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Film, Mic, Theater } from '@/components/icons';
import Image from 'next/image';
import { Ticket } from '@/components/icons';
import { movies, theaterPlays, concerts } from '@/lib/data/tickets-data';

export default function TicketsPage() {
    return (
        <div className="container mx-auto max-w-6xl px-4 py-8 md:py-12" style={{'--brand-color': 'hsl(var(--brand-tickets))'} as React.CSSProperties}>
            <header className="mb-12">
                <h1 className="font-headline text-5xl font-bold flex items-center gap-3" style={{color: 'var(--brand-color)'}}>
                    <Ticket className="h-12 w-12" />
                    Tickets
                </h1>
                <p className="mt-2 text-lg text-muted-foreground">
                    Your portal for cultural events and tickets.
                </p>
            </header>

            <section className="mb-12">
                <h2 className="font-headline text-3xl font-bold mb-6 flex items-center gap-3">
                    <Film className="h-8 w-8 text-muted-foreground" />
                    Now Playing: Movies
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {movies.map((item, index) => (
                        <Card key={index} className="group overflow-hidden">
                            <CardContent className="p-0">
                                <div className="relative aspect-[2/3]">
                                    <Image src={item.image} alt={item.name} fill className="object-cover transition-transform group-hover:scale-105" data-ai-hint={item.dataAiHint} />
                                </div>
                            </CardContent>
                            <CardFooter className="p-3">
                                <p className="font-semibold text-sm truncate">{item.name}</p>
                            </CardFooter>
                        </Card>
                    ))}
                     <Card className="flex flex-col items-center justify-center border-dashed aspect-[2/3] h-full hover:border-primary transition-colors">
                        <p className="text-sm font-medium text-muted-foreground">More coming soon</p>
                    </Card>
                </div>
            </section>

             <Separator className="my-12" />

             <section className="mb-12">
                <h2 className="font-headline text-3xl font-bold mb-6 flex items-center gap-3">
                    <Theater className="h-8 w-8 text-muted-foreground" />
                    On Stage: Theater
                </h2>
                 <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {theaterPlays.map((item, index) => (
                        <Card key={index} className="group overflow-hidden">
                            <CardContent className="p-0">
                                <div className="relative aspect-[2/3]">
                                    <Image src={item.image} alt={item.name} fill className="object-cover transition-transform group-hover:scale-105" data-ai-hint={item.dataAiHint} />
                                </div>
                            </CardContent>
                            <CardFooter className="p-3">
                                <p className="font-semibold text-sm truncate">{item.name}</p>
                            </CardFooter>
                        </Card>
                    ))}
                     <Card className="flex flex-col items-center justify-center border-dashed aspect-[2/3] h-full hover:border-primary transition-colors">
                        <p className="text-sm font-medium text-muted-foreground">More coming soon</p>
                    </Card>
                </div>
            </section>
            
            <Separator className="my-12" />

             <section>
                <h2 className="font-headline text-3xl font-bold mb-6 flex items-center gap-3">
                    <Mic className="h-8 w-8 text-muted-foreground" />
                    Live Music: Concerts
                </h2>
                <div className="space-y-6">
                    {concerts.map((item, index) => (
                         <Card key={index} className="group overflow-hidden flex flex-col md:flex-row">
                            <div className="relative aspect-video md:aspect-auto w-full md:w-1/3">
                                <Image src={item.image} alt={item.name} fill className="object-cover transition-transform group-hover:scale-105" data-ai-hint={item.dataAiHint} />
                            </div>
                            <div className="flex-1 p-6">
                                <CardTitle>{item.name}</CardTitle>
                                <CardDescription className="mt-2">Various dates and times</CardDescription>
                                <Button className="mt-4" style={{ backgroundColor: 'var(--brand-color)'}}>Get Tickets</Button>
                            </div>
                        </Card>
                    ))}
                </div>
            </section>

        </div>
    );
}
