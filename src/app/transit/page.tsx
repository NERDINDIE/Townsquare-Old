
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Map, Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { transitLines } from '@/lib/data/transit-data';

export default function TransitPage() {
    const router = useRouter();

    return (
        <div className="h-screen bg-muted/30 flex flex-col">
            <header className="p-4 border-b bg-background flex-shrink-0">
                <div className="flex items-center justify-between">
                    <Button variant="ghost" size="icon" onClick={() => router.back()}>
                        <ArrowLeft />
                    </Button>
                    <h1 className="text-xl font-bold">Public Transit</h1>
                    <div className="w-10"></div>
                </div>
                 <div className="relative mt-4">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input placeholder="Search routes or stops" className="pl-10 h-11" />
                </div>
            </header>

            <main className="flex-1 flex flex-col overflow-hidden">
                <div className="relative flex-1">
                     <Image 
                        src="https://storage.googleapis.com/studioprompt-images/city-map-bg.png"
                        alt="City map with transit routes"
                        fill
                        className="object-cover"
                        data-ai-hint="city map"
                    />
                    {/* Placeholder for route overlays */}
                </div>
                <Card className="flex-shrink-0 rounded-t-2xl rounded-b-none border-t mt-[-2rem] z-10">
                    <CardHeader>
                        <CardTitle>Nearby Departures</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {transitLines.map((line) => (
                            <div key={line.name} className="flex items-center gap-4">
                                <div className="p-2 bg-muted rounded-md text-muted-foreground">{line.icon}</div>
                                <div className="flex-1">
                                    <p className="font-semibold">{line.name}</p>
                                    <p className="text-sm text-muted-foreground">{line.destination}</p>
                                </div>
                                <p className="font-bold text-lg">{line.arrival}</p>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
