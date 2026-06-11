
'use client';

import { useRouter } from "next/navigation";
import { Townsquare } from "@/lib/townsquares";
import { PostWithAuthor } from "@/lib/bulletin-board-data";
import { Article } from "@/lib/data";
import { PostCard } from "@/components/PostCard";
import { ArticleCard } from "@/components/ArticleCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sun, MapPin, Plane, Map as MapIcon, Flag } from "lucide-react";
import Image from "next/image";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Link from "next/link";
import { useWordmark } from "@/context/wordmark-context";
import { useEffect } from "react";

interface TownsquareClientPageProps {
    townsquare: Townsquare;
    historicalPosts: PostWithAuthor[];
    cityArticles: Article[];
    relatedTownsquares: Townsquare[];
}

export function TownsquareClientPage({ townsquare, historicalPosts, cityArticles, relatedTownsquares }: TownsquareClientPageProps) {
    const router = useRouter();
    const { setWordmark } = useWordmark();

    useEffect(() => {
        if (townsquare.nativeWordmark) {
            setWordmark(townsquare.nativeWordmark);
        }

        // Reset the wordmark when the component unmounts
        return () => {
            setWordmark(null);
        };
    }, [townsquare, setWordmark]);


    return (
        <div>
            <header className="relative h-64 md:h-80">
                <Image 
                    src={townsquare.image} 
                    alt={`Image of ${townsquare.name}`}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
                <div className="relative h-full flex flex-col justify-end container mx-auto px-4 py-8 md:py-12">
                    <Button onClick={() => router.back()} variant="ghost" className="absolute top-4 left-0 text-white hover:text-white hover:bg-black/20 bg-black/10">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Townsquares
                    </Button>
                    <h1 className="font-headline text-5xl md:text-7xl font-bold">{townsquare.name}</h1>
                </div>
            </header>
            
            <div className="container mx-auto px-4 py-8 md:py-12">
                <Tabs defaultValue="about" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="about">About</TabsTrigger>
                        <TabsTrigger value="articles">Articles</TabsTrigger>
                        <TabsTrigger value="posts">Posts</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="about" className="mt-6 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Overview</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{townsquare.description}</p>
                            </CardContent>
                        </Card>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-base">
                                        <Sun className="h-5 w-5 text-yellow-500" />
                                        Weather Averages
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-3xl font-bold">25° / 18°C</p>
                                    <p className="text-sm text-muted-foreground">High / Low • Avg</p>
                                </CardContent>
                            </Card>
                             <Card className="overflow-hidden">
                                <div className="relative w-full h-full min-h-[150px]">
                                    <Image src="https://storage.googleapis.com/studioprompt-images/city-map-bg.png" alt="Map" layout="fill" objectFit="cover" data-ai-hint="city map" />
                                     <Button size="icon" className="absolute top-2 right-2 bg-black/50 hover:bg-black/70">
                                        <MapIcon className="h-5 w-5 text-white"/>
                                    </Button>
                                </div>
                            </Card>
                        </div>
                        
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="get-there">
                                <Card>
                                    <AccordionTrigger className="p-6 text-left">
                                        <div className="flex items-center gap-2">
                                            <Plane className="h-5 w-5" />
                                            <p className="font-semibold">Get there</p>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="px-6 pb-6">
                                        <p className="text-muted-foreground">Flight and travel information would appear here. This is a placeholder.</p>
                                    </AccordionContent>
                                </Card>
                            </AccordionItem>
                             <AccordionItem value="see-also" className="border-b-0">
                                <Card className="mt-6">
                                     <AccordionTrigger className="p-6 text-left">
                                        <div className="flex items-center gap-2">
                                            <Flag className="h-5 w-5" />
                                            <p className="font-semibold">See also</p>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="px-6 pb-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
                                        {relatedTownsquares.map(ts => (
                                            <Link href={`/townsquares/${ts.slug}`} key={ts.slug} className="group">
                                                 <Card className="overflow-hidden">
                                                    <div className="relative aspect-square">
                                                        <Image src={ts.image} alt={ts.name} layout="fill" objectFit="cover" className="transition-transform group-hover:scale-105" data-ai-hint={ts.dataAiHint} />
                                                        <div className="absolute inset-0 bg-black/40" />
                                                        <p className="absolute bottom-2 left-2 font-bold text-white text-shadow-md">{ts.name}</p>
                                                    </div>
                                                </Card>
                                            </Link>
                                        ))}
                                    </AccordionContent>
                                </Card>
                            </AccordionItem>
                        </Accordion>

                    </TabsContent>
                    
                    <TabsContent value="articles" className="mt-6">
                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {cityArticles.map(article => (
                                <ArticleCard key={article.id} article={article} />
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="posts" className="mt-6">
                        <div className="space-y-6">
                            {historicalPosts.length > 0 ? (
                                historicalPosts.map(post => <PostCard key={post.id} post={post} />)
                            ) : (
                                <Card className="text-center p-8">
                                    <p className="text-muted-foreground">No historical posts available for this location yet.</p>
                                </Card>
                            )}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
