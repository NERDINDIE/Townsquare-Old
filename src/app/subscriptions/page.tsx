
'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { articles } from "@/lib/data";
import { ArrowUpDown, Bookmark, Download, Headphones, History, Library, ListFilter, MoreHorizontal, Play, ThumbsUp, MessageCircle } from "lucide-react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { publications } from "@/lib/epaper";
import Link from "next/link";

const filters = [
    { name: 'All', icon: <Library /> },
    { name: 'Saved', icon: <Bookmark /> },
    { name: 'Audio', icon: <Headphones /> },
    { name: 'History', icon: <History /> },
    { name: 'Downloads', icon: <Download /> },
];

const feedItems = articles.slice(0, 4).map((article, index) => ({
    source: `Townsquare ${article.category}`,
    sourceIcon: `https://placehold.co/32x32/000000/FFFFFF?text=${article.category.charAt(0)}`,
    title: article.title,
    description: article.excerpt,
    image: article.image,
    dataAiHint: "article photo",
    isVideo: !!article.videoUrl,
    time: `${(index + 1) * 2}h ago`,
    metadata: `${Math.ceil(article.content.length / 1000)} min read`,
    likes: Math.floor(Math.random() * 100),
    comments: Math.floor(Math.random() * 20),
}));

export default function SubscriptionsPage() {
    return (
        <div className="container mx-auto max-w-4xl px-0 sm:px-4 py-8 md:py-12">
            <header className="mb-4 flex items-center justify-between px-4">
                <h1 className="font-headline text-4xl font-bold">Subscriptions</h1>
                 <Avatar className="h-10 w-10">
                    <AvatarFallback>JD</AvatarFallback>
                </Avatar>
            </header>

            <div className="sticky top-0 bg-background z-10 py-2">
                <ScrollArea className="w-full whitespace-nowrap">
                    <div className="flex w-max space-x-2 px-4">
                        {filters.map((filter, index) => (
                            <Button key={filter.name} variant={index === 0 ? 'default' : 'secondary'} className="h-12 rounded-full px-5">
                                {filter.icon}
                                <span>{filter.name}</span>
                            </Button>
                        ))}
                    </div>
                    <ScrollBar orientation="horizontal" className="h-0" />
                </ScrollArea>
            </div>

            <section className="my-6 px-4">
                 <h2 className="text-xl font-bold mb-4">Your Publications</h2>
                <Carousel
                    opts={{
                        align: 'start',
                        slidesToScroll: 'auto',
                    }}
                    className="w-full"
                >
                    <CarouselContent className="-ml-4">
                        {publications.slice(0, 4).map((pub) => (
                            <CarouselItem key={pub.id} className="basis-1/3 sm:basis-1/4 md:basis-1/5 pl-4">
                                <Link href="/the-rack">
                                    <Card className="overflow-hidden">
                                        <CardContent className="p-0 aspect-[3/4] relative">
                                            <Image
                                                src={pub.editions[0].coverImage}
                                                alt={`Cover of ${pub.name}`}
                                                fill
                                                className="object-cover"
                                                data-ai-hint="newspaper cover"
                                            />
                                        </CardContent>
                                    </Card>
                                     <p className="mt-2 text-xs text-center font-semibold truncate">{pub.name}</p>
                                </Link>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="-left-2" />
                    <CarouselNext className="-right-2" />
                </Carousel>
            </section>

             <div className="my-6 px-4 flex justify-between items-center border-t pt-6">
                <p className="uppercase text-sm font-semibold text-muted-foreground flex items-center gap-1"><ArrowUpDown className="h-4 w-4"/> Recent</p>
                <Button variant="ghost" size="icon">
                    <ListFilter className="h-5 w-5 text-muted-foreground" />
                </Button>
            </div>

            <main className="mt-4 space-y-2">
                {feedItems.map((item, index) => (
                    <Card key={index} className="rounded-none sm:rounded-lg shadow-none sm:shadow-sm">
                        <CardContent className="p-4">
                            <div className="flex items-start gap-4">
                               <div className="w-full">
                                    <div className="flex justify-between items-start">
                                        <div className="flex items-center gap-2">
                                            <Avatar className="h-5 w-5">
                                                <AvatarImage src={item.sourceIcon} />
                                                <AvatarFallback>{item.source.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <span className="text-sm font-semibold">{item.source}</span>
                                        </div>
                                        <div className="flex items-center text-xs text-muted-foreground">
                                            <span>{item.time}</span>
                                            <Bookmark className="ml-2 h-4 w-4" />
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4 mt-1">
                                        <div className="flex-grow">
                                            <h2 className="font-bold text-lg leading-tight">{item.title}</h2>
                                            <p className="text-muted-foreground text-sm mt-1 line-clamp-2">{item.description}</p>
                                        </div>
                                        <div className="flex-shrink-0">
                                            <div className="relative h-20 w-20 sm:h-24 sm:w-24 rounded-lg overflow-hidden">
                                                <Image src={item.image} alt={item.title} layout="fill" objectFit="cover" data-ai-hint={item.dataAiHint} />
                                                {item.isVideo && (
                                                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                                        <Play className="h-6 w-6 text-white fill-white" />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                     <div className="mt-3 flex items-center justify-between">
                                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                            {item.metadata && <span className="text-xs">{item.metadata}</span>}
                                            
                                            {(item.likes > 0 || item.comments > 0) && (
                                                <>
                                                    <div className="flex items-center gap-1 text-xs">
                                                        <ThumbsUp className="h-3 w-3" />
                                                        <span>{item.likes}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1 text-xs">
                                                        <MessageCircle className="h-3 w-3" />
                                                        <span>{item.comments}</span>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <MoreHorizontal className="h-5 w-5" />
                                        </Button>
                                    </div>
                               </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </main>
        </div>
    );
}
