
'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, Rss } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const newsUpdates = {
    'us-politics': {
        slug: 'us-politics-live',
        category: 'US politics',
        title: "White House defends DC takeover of police after city alleges 'brazen usu...'",
        updates: [
            { time: '23m ago', text: 'Trump-Putin meeting on Ukraine war gets under way in Alaska' },
            { time: '32m ago', text: 'RFK Jr says no plans for 2028 presidential run' },
            { time: '21:37', text: 'Trump-Putin meeting no longer one-on-one' },
            { time: '21:26', text: 'Trump and Putin land in Alaska ahead of pivotal Ukraine war meeting' },
        ],
    },
    'russia': {
        slug: 'russia-ukraine-summit-live',
        category: 'Russia',
        title: 'Trump and Putin begin pivotal summit on Ukraine war in Alaska – live updates',
        updates: [
            { time: '29m ago', text: 'Trump-Putin meeting is under way' },
            { time: '34m ago', text: 'Trump and Putin begin summit, joined by respective delegations' },
            { time: '22:12', text: 'Trump and Putin greet each other as summit begins' },
            { time: '22:07', text: 'Putin to be joined by Russian cabinet officials at summit' },
        ],
    },
    'mars-invasion': {
        slug: 'mars-invasion-live',
        category: 'Mars',
        title: 'Strange cylinders fall from Mars in Surrey – live updates',
        updates: [
            { time: '4m ago', text: 'Reports of a "hissing sound" from the object.'},
            { time: '12m ago', text: 'Crowds are gathering around the mysterious object.'},
            { time: '18m ago', text: 'Astronomer Ogilvy is on his way to the scene.'},
            { time: '30m ago', text: 'A large, metallic cylinder has crashed on Horsell Common.'},
        ],
    }
}

function LiveTimeline({ slug, category, title, updates }: { slug: string, category: string, title: string, updates: {time: string, text: string}[] }) {
    return (
        <div className="relative pl-8 py-6">
            {/* Vertical Line */}
            <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-border"></div>
            
            <p className="text-destructive font-semibold uppercase text-sm">{category}</p>
            <h2 className="font-bold text-xl my-2">{title}</h2>

            <div className="space-y-4 mt-4">
                {updates.map((update, index) => (
                    <div key={index} className="relative">
                        <div className="absolute -left-5 top-1.5 h-2.5 w-2.5 rounded-full bg-muted-foreground"></div>
                        <p className="text-muted-foreground text-sm flex gap-4">
                            <span className="w-16">{update.time}</span>
                            <span>{update.text}</span>
                        </p>
                    </div>
                ))}
            </div>
            
            <Button asChild variant="link" className="p-0 mt-4 text-destructive h-auto">
                <Link href={`/on-air/${slug}`}>
                    Full liveblog <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
            </Button>
        </div>
    )
}


export default function OnAirPage() {
  const router = useRouter();

  return (
    <div 
        className="pb-24"
        style={{ '--brand-color': 'hsl(var(--brand-on-air))' } as React.CSSProperties}
    >
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex items-center justify-between h-16">
            <Button onClick={() => router.back()} variant="ghost" size="icon">
                <ChevronLeft />
            </Button>
            <h1 className="font-headline text-2xl font-bold">Live</h1>
            <p className="text-sm text-muted-foreground">
                Updated <span className="text-destructive">now</span>
            </p>
        </div>
        <div className="border-b">
            <Tabs defaultValue="news" className="w-full">
                <TabsList className="w-full justify-start rounded-none bg-transparent p-0">
                <div className='container mx-auto'>
                    <TabsTrigger 
                    value="news"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-destructive data-[state=active]:text-destructive data-[state=active]:shadow-none px-4"
                    >
                    News
                    </TabsTrigger>
                    <TabsTrigger 
                    value="sport"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-destructive data-[state=active]:text-destructive data-[state=active]:shadow-none px-4"
                    >
                    Sport
                    </TabsTrigger>
                </div>
                </TabsList>
                <TabsContent value="news">
                <div className="divide-y">
                    <LiveTimeline {...newsUpdates['us-politics']} />
                    <LiveTimeline {...newsUpdates['russia']} />
                    <LiveTimeline {...newsUpdates['mars-invasion']} />
                </div>
                </TabsContent>
                <TabsContent value="sport">
                <div className="container mx-auto text-center py-16">
                    <p className="text-muted-foreground">No live sport updates at the moment.</p>
                </div>
                </TabsContent>
            </Tabs>
        </div>
      </header>
      
      <main className="container mx-auto py-4">
        {/* Additional content can go here if needed, main content is in the header now */}
      </main>
    </div>
  );
}
