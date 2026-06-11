
'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, Play, Radio, Tv, Podcast, Film } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePlayerState } from "@/hooks/use-player-state";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { initialLiveChannels, stations, continueListening, featuredPodcasts, onDemandContent } from "@/lib/data/broadcast-data";

export default function BroadcastPage() {
    const { showPlayer } = usePlayerState();
    const [carouselApi, setCarouselApi] = useState<CarouselApi>()
    const [activeChannelIndex, setActiveChannelIndex] = useState(0)
    const [liveChannels, setLiveChannels] = useState(initialLiveChannels);
    const [isStampMode, setIsStampMode] = useState(false);

    useEffect(() => {
        const storedOrder = localStorage.getItem('tv_channel_order');
        if (storedOrder) {
            try {
                const orderedChannels = JSON.parse(storedOrder);
                setLiveChannels(orderedChannels);
            } catch (e) {
                console.error("Failed to parse channel order from localStorage", e);
            }
        }
    }, []);

    useEffect(() => {
        if (!carouselApi) {
            return
        }
        
        setActiveChannelIndex(carouselApi.selectedScrollSnap())

        const onSelect = () => {
             setActiveChannelIndex(carouselApi.selectedScrollSnap())
        };

        carouselApi.on("select", onSelect);

        return () => {
             carouselApi.off("select", onSelect);
        }
    }, [carouselApi])
    
    const handleTabChange = (value: string) => {
        const index = liveChannels.findIndex(c => c.name === value);
        if (index !== -1 && carouselApi) {
            carouselApi.scrollTo(index);
        }
    };


    return (
        <div 
            className="container mx-auto max-w-4xl px-4 py-8 md:py-12"
            style={{ '--brand-color': 'hsl(var(--brand-broadcast))' } as React.CSSProperties}
        >
            <header className="mb-8">
                <h1 className="font-headline text-5xl font-bold flex items-center gap-3" style={{ color: 'var(--brand-color)'}}>
                    <Radio className="h-12 w-12" />
                    Broadcast
                </h1>
                <p className="mt-2 text-lg text-muted-foreground">
                    Your home for live and on-demand audio.
                </p>
            </header>

            <Tabs defaultValue="tv" className="w-full">
                <TabsList className="grid w-full grid-cols-4 md:w-[640px]">
                    <TabsTrigger value="tv"><Tv className="mr-2 h-5 w-5" /> TV</TabsTrigger>
                    <TabsTrigger value="radio"><Radio className="mr-2 h-5 w-5" /> Radio</TabsTrigger>
                    <TabsTrigger value="podcasts"><Podcast className="mr-2 h-5 w-5" /> Podcasts</TabsTrigger>
                    <TabsTrigger value="ondemand"><Film className="mr-2 h-5 w-5" /> On-Demand</TabsTrigger>
                </TabsList>

                <TabsContent value="tv" className="mt-8">
                     <Carousel setApi={setCarouselApi} className="w-full">
                        <CarouselContent>
                            {liveChannels.map((channel, index) => (
                                <CarouselItem key={channel.name}>
                                    <Card className="overflow-hidden border-0">
                                        <CardContent className="p-0">
                                            <button onClick={() => setIsStampMode(!isStampMode)} className={cn("relative w-full transition-all duration-300", isStampMode ? 'h-40' : 'aspect-video')}>
                                                <div className={cn("relative w-full h-full transition-all duration-300", isStampMode ? 'w-24 aspect-video shadow-lg' : '')}>
                                                    <Image src={channel.image} alt={channel.program} fill className="object-cover" data-ai-hint={channel.dataAiHint} />
                                                    <div className="absolute inset-x-0 top-0 bg-gradient-to-b from-black/50 to-transparent p-2">
                                                        {/* You can add overlays like in the image here */}
                                                    </div>
                                                </div>
                                                 {isStampMode && <p className="text-xs text-muted-foreground absolute bottom-4 right-4">Remember when video was this small?</p>}
                                            </button>
                                            <div className="p-4 bg-background">
                                                <div className="flex justify-between items-center">
                                                    <p className="font-semibold text-lg flex items-center"><span className="text-red-500 mr-2 text-xl">&#9679;</span> テレビ放送中</p>
                                                    <Button asChild variant="ghost" size="sm">
                                                        <Link href="/broadcast/sort">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4"><path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/></svg>
                                                            Edit Order
                                                        </Link>
                                                    </Button>
                                                </div>
                                                <h2 className="text-xl font-bold mt-1">{channel.program}</h2>
                                                <p className="text-sm text-muted-foreground mt-1">{channel.time} {channel.viewers}視聴</p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                     </Carousel>
                    <Tabs value={liveChannels[activeChannelIndex]?.name} onValueChange={handleTabChange} className="w-full mt-2">
                        <TabsList className="w-full justify-start rounded-none bg-transparent p-0 overflow-x-auto">
                            {liveChannels.map((channel) => (
                                 <TabsTrigger 
                                    key={channel.name} 
                                    value={channel.name}
                                    className="text-muted-foreground data-[state=active]:text-foreground data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
                                >
                                    {channel.name}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </Tabs>
                </TabsContent>

                <TabsContent value="radio" className="mt-8">
                    <section className="mb-12">
                        <h2 className="font-headline text-2xl font-bold mb-4">Live Radio</h2>
                        <Carousel
                            opts={{
                            align: 'start',
                            slidesToScroll: 'auto',
                            }}
                            className="w-full"
                        >
                            <CarouselContent className="-ml-2">
                            {stations.map((station, index) => (
                                <CarouselItem key={index} className="basis-1/3 sm:basis-1/4 md:basis-1/5 lg:basis-1/6 pl-2">
                                    <div className="flex flex-col items-center gap-2 text-center">
                                        <Avatar className="h-20 w-20 sm:h-24 sm:w-24 border-4 border-transparent ring-2 ring-primary hover:ring-brand-color transition-all">
                                            <AvatarImage src={station.image} alt={station.name} data-ai-hint={station.dataAiHint} />
                                            <AvatarFallback>{station.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <p className="text-sm font-medium">{station.name}</p>
                                    </div>
                                </CarouselItem>
                            ))}
                            </CarouselContent>
                            <CarouselPrevious className="-left-4" />
                            <CarouselNext className="-right-4"/>
                        </Carousel>
                    </section>
                    
                    <section className="text-center">
                        <p className="text-sm font-semibold uppercase tracking-widest text-destructive">On Air Now</p>
                        <h2 className="text-3xl font-bold mt-2">The Morning Show</h2>
                        <p className="text-muted-foreground">with Jane Doe on City FM</p>
                        <Button className="mt-4" style={{ backgroundColor: 'var(--brand-color)'}}>
                            <Play className="mr-2 h-5 w-5" />
                            Listen Live
                        </Button>
                    </section>
                </TabsContent>
                
                <TabsContent value="podcasts" className="mt-8">
                     <section className="mb-12">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="font-headline text-2xl font-bold">Featured Podcasts</h2>
                            <Button asChild variant="ghost" size="sm">
                                <Link href="/podcasts">
                                See All <ChevronRight className="h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                        <Carousel
                            opts={{
                                align: 'start',
                                slidesToScroll: 'auto',
                            }}
                            className="w-full"
                        >
                            <CarouselContent className="-ml-4">
                            {featuredPodcasts.map((podcast, index) => (
                                <CarouselItem key={index} className="basis-[60%] sm:basis-1/3 md:basis-1/4 pl-4">
                                <Link href="/player">
                                        <Card>
                                            <CardContent className="p-0">
                                                <div className="relative aspect-square">
                                                    <Image src={podcast.image} alt={podcast.title} fill className="object-cover rounded-t-lg" data-ai-hint={podcast.dataAiHint}/>
                                                </div>
                                            </CardContent>
                                            <CardHeader className="p-3">
                                                <p className="font-semibold truncate text-sm">{podcast.title}</p>
                                                <p className="text-xs text-muted-foreground truncate">{podcast.creator}</p>
                                            </CardHeader>
                                        </Card>
                                    </Link>
                                </CarouselItem>
                            ))}
                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                        </Carousel>
                    </section>
                    <section>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="font-headline text-2xl font-bold">Continue Listening</h2>
                            <Button asChild variant="ghost" size="sm">
                                <Link href="/library">
                                Manage List <ChevronRight className="h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                        <div className="space-y-4">
                            {continueListening.map((item, index) => (
                                <Link href={item.link} key={index}>
                                    <Card>
                                        <div className="flex items-center gap-4 p-4">
                                            <div className="relative h-16 w-16 rounded-md overflow-hidden">
                                                <Image src={item.image} alt={item.title} fill className="object-cover" data-ai-hint={item.dataAiHint} />
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-semibold">{item.title}</p>
                                                <p className="text-sm text-muted-foreground">{item.episode}</p>
                                                <div className="mt-2 h-1 w-full bg-muted rounded-full">
                                                    <div className="h-1 bg-primary rounded-full" style={{ width: `${item.progress}%`}}></div>
                                                </div>
                                            </div>
                                            <Button variant="ghost" size="icon">
                                                <Play className="h-6 w-6" />
                                            </Button>
                                        </div>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    </section>
                </TabsContent>
                
                <TabsContent value="ondemand" className="mt-8 space-y-8">
                    {onDemandContent.map((category) => (
                         <section key={category.category}>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="font-headline text-2xl font-bold">{category.category}</h2>
                                <Button asChild variant="ghost" size="sm">
                                    <Link href="#">
                                    See All <ChevronRight className="h-4 w-4" />
                                    </Link>
                                </Button>
                            </div>
                            <Carousel
                                opts={{
                                    align: 'start',
                                    slidesToScroll: 'auto',
                                }}
                                className="w-full"
                            >
                                <CarouselContent className="-ml-4">
                                {category.items.map((item, index) => (
                                    <CarouselItem key={index} className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 pl-4">
                                    <Link href="#">
                                        <Card className="overflow-hidden border-0 group">
                                            <CardContent className="p-0">
                                                <div className={cn("relative aspect-[2/3]", category.category === 'Continue Watching' && 'aspect-video')}>
                                                    <Image src={item.image} alt={item.title} fill className="object-cover rounded-lg group-hover:scale-105 transition-transform" data-ai-hint={item.dataAiHint}/>
                                                     {item.isTop10 && (
                                                        <div className="absolute top-2 right-2 bg-background text-foreground text-xs font-bold px-2 py-1 rounded-md">TOP 10</div>
                                                    )}
                                                </div>
                                            </CardContent>
                                        </Card>
                                        </Link>
                                    </CarouselItem>
                                ))}
                                </CarouselContent>
                                <CarouselPrevious className="-left-4" />
                                <CarouselNext className="-right-4" />
                            </Carousel>
                        </section>
                    ))}
                </TabsContent>

            </Tabs>
        </div>
    );
}
