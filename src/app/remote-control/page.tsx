
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tv, Radio, Film, Dot, Clapperboard } from '@/components/icons';
import { ArticleCard } from '@/components/ArticleCard';
import { articles } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';

const tvListings = [
    { channel: '1', name: 'Channel One', program: 'Evening News', time: '6:00 PM', live: true, logo: 'https://placehold.co/100x50/FFFFFF/000000?text=ONE&font=roboto' },
    { channel: '2', name: 'Channel Two', program: 'Sports Night', time: '6:00 PM', live: true, logo: 'https://placehold.co/100x50/000000/FFFFFF?text=TWO&font=roboto' },
    { channel: '3', name: 'Channel Three', program: 'Evening Movie', time: '6:00 PM', live: false, logo: 'https://placehold.co/100x50/000000/FFFFFF?text=THREE&font=roboto' },
    { channel: '4', name: 'Channel Four', program: 'Primetime Drama', time: '6:30 PM', live: false, logo: 'https://placehold.co/100x50/FF0000/FFFFFF?text=FOUR&font=roboto' },
    { channel: '5', name: 'Channel Five', program: 'Science Explained', time: '7:00 PM', live: true, logo: 'https://placehold.co/100x50/0000FF/FFFFFF?text=FIVE&font=roboto' },
    { channel: '6', name: 'Channel Six', program: 'Investigative Reports', time: '7:00 PM', live: false, logo: 'https://placehold.co/100x50/000000/FFFFFF?text=SIX&font=roboto' },
];

const radioStations = [
    { name: 'National One', frequency: '98.5 FM', avatar: 'https://placehold.co/100x100.png', hint: 'radio station logo' },
    { name: 'City FM', frequency: '102.1 FM', avatar: 'https://placehold.co/100x100.png', hint: 'radio station logo' },
    { name: 'Classical', frequency: '89.9 FM', avatar: 'https://placehold.co/100x100.png', hint: 'radio station logo' },
    { name: 'The Beat', frequency: '93.7 FM', avatar: 'https://placehold.co/100x100.png', hint: 'radio station logo' },
    { name: 'News Now', frequency: 'AM 680', avatar: 'https://placehold.co/100x100.png', hint: 'radio station logo' },
    { name: 'Talk Radio', frequency: 'AM 740', avatar: 'https://placehold.co/100x100.png', hint: 'radio station logo' },
];

const streamingServices = [
    { name: 'Townsquare+', icon: <Clapperboard className="h-8 w-8 text-primary" /> },
];

const relatedArticlesData = articles.filter(a => ['Music', 'Community'].includes(a.category)).slice(0, 3);

export default function RemoteControlPage() {
  return (
    <div 
        className="container mx-auto max-w-5xl px-4 py-8 md:py-12"
        style={{'--brand-color': 'hsl(var(--brand-remote-control))'} as React.CSSProperties}
    >
      <header className="mb-8">
        <h1 className="font-headline text-5xl font-bold flex items-center gap-3" style={{color: 'var(--brand-color)'}}>
          <Tv className="h-12 w-12" />
          Remote Control
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Your guide to TV, radio, and streaming.
        </p>
      </header>

      <Tabs defaultValue="tv" className="w-full">
        <TabsList className="grid w-full grid-cols-3 md:w-[540px]">
          <TabsTrigger value="tv"><Tv className="mr-2 h-5 w-5" /> TV Listings</TabsTrigger>
          <TabsTrigger value="radio"><Radio className="mr-2 h-5 w-5" /> Radio</TabsTrigger>
          <TabsTrigger value="streaming"><Film className="mr-2 h-5 w-5" /> Streaming</TabsTrigger>
        </TabsList>
        
        <TabsContent value="tv" className="mt-6">
            <Card>
                <CardHeader>
                    <CardTitle>On Now</CardTitle>
                    <CardDescription>See what's currently playing on your favorite channels.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-1">
                        {tvListings.map(item => (
                            <div key={item.channel} className="flex items-center gap-4 p-2 rounded-lg hover:bg-muted/50">
                                 <div className="w-20">
                                    <Image src={item.logo} alt={item.name} width={80} height={40} className="object-contain" />
                                 </div>
                                <div className="flex-1">
                                    <p className="font-semibold">{item.program}</p>
                                    <p className="text-sm text-muted-foreground">{item.name}</p>
                                </div>
                                <div className="flex items-center text-sm text-muted-foreground w-24 justify-end">
                                    {item.live && <Dot className="h-8 w-8 text-red-500 animate-pulse" />}
                                    <span>{item.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </TabsContent>
        
        <TabsContent value="radio" className="mt-6">
            <Card>
                <CardHeader>
                    <CardTitle>Stations</CardTitle>
                    <CardDescription>Tune in to local and national radio stations.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                    {radioStations.map(station => (
                        <div key={station.name} className="flex flex-col items-center gap-2 text-center">
                            <Avatar className="h-20 w-20">
                                <AvatarImage src={station.avatar} data-ai-hint={station.hint} />
                                <AvatarFallback>{station.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-semibold">{station.name}</p>
                                <p className="text-sm text-muted-foreground">{station.frequency}</p>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </TabsContent>

        <TabsContent value="streaming" className="mt-6">
            <Card>
                <CardHeader>
                    <CardTitle>Streaming Services</CardTitle>
                    <CardDescription>Discover content from popular streaming platforms.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {streamingServices.map(service => (
                        <div key={service.name} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50">
                            {service.icon}
                            <p className="font-semibold text-lg">{service.name}</p>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
      
      <Separator className="my-12" />

      <section>
        <h2 className="font-headline text-3xl font-bold mb-6">Top Stories & Reviews</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedArticlesData.map(article => (
                <ArticleCard key={article.id} article={article} small />
            ))}
        </div>
      </section>
    </div>
  );
}
