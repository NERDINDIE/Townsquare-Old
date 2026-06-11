

'use client';

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { ClipboardPen, Rss, Map, List } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { allPosts, PostWithAuthor } from "@/lib/bulletin-board-data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { PostCard } from "@/components/PostCard";

function MapView() {
    const locationPosts = allPosts.filter(p => p.location);

    return (
        <Card className="md:rounded-lg overflow-hidden">
            <CardContent className="p-0">
                <div className="relative w-full aspect-video">
                    <Image 
                        src="https://storage.googleapis.com/studioprompt-images/city-map-bg.png"
                        alt="City map"
                        fill
                        className="object-cover"
                        data-ai-hint="city map"
                    />
                    {locationPosts.map(post => (
                         <Popover key={post.id}>
                            <PopoverTrigger asChild>
                                <button 
                                    className="absolute transform -translate-x-1/2 -translate-y-1/2"
                                    style={{ top: `${post.location?.lat}%`, left: `${post.location?.lng}%`}}
                                >
                                     <Avatar className="h-10 w-10 border-2 border-white shadow-lg hover:scale-110 transition-transform">
                                        <AvatarImage src={post.author.avatar} />
                                        <AvatarFallback>{post.author.fallback}</AvatarFallback>
                                    </Avatar>
                                </button>
                            </PopoverTrigger>
                            <PopoverContent className="w-80">
                                <PostCard post={post} />
                            </PopoverContent>
                        </Popover>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

export default function BulletinBoardPage() {

  return (
    <div className="relative min-h-screen">
      <div
        className="container mx-auto max-w-2xl px-0 py-8 md:px-4 md:py-12"
        style={{'--brand-color': 'hsl(var(--brand-bulletin-board))'} as React.CSSProperties}
      >
        <header className="mb-8 px-4">
          <h1 className="font-headline text-4xl font-bold flex items-center gap-3" style={{color: 'var(--brand-color)'}}>
            <ClipboardPen className="h-10 w-10" />
            Bulletin Board
          </h1>
          <p className="text-muted-foreground mt-1">
            See what the community is talking about.
          </p>
        </header>

        <Link href="/on-air" className="group block mb-6 mx-4 md:mx-0">
          <div className="bg-muted border rounded-lg p-2 overflow-hidden flex items-center gap-3">
              <div className="bg-destructive text-destructive-foreground px-2 py-0.5 rounded-md text-sm font-semibold flex items-center gap-1 shrink-0">
                  <Rss className="h-3 w-3"/> LIVE
              </div>
              <div className="overflow-hidden">
                <p className="whitespace-nowrap animate-marquee group-hover:pause">
                  <span className="font-semibold">US Politics:</span> White House defends DC takeover of police... <span className="text-muted-foreground mx-4">||</span> <span className="font-semibold">World News:</span> Trump and Putin begin pivotal summit on Ukraine war in Alaska... <span className="text-muted-foreground mx-4">||</span> <span className="font-semibold">Local Sports:</span> Town FC wins championship in stunning upset...
                </p>
              </div>
          </div>
        </Link>
        
        <Tabs defaultValue="feed" className="w-full">
            <div className="px-4">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="feed"><List className="mr-2 h-4 w-4" />Feed</TabsTrigger>
                    <TabsTrigger value="map"><Map className="mr-2 h-4 w-4" />Map</TabsTrigger>
                </TabsList>
            </div>
            <TabsContent value="feed" className="space-y-6 pb-24 mt-6">
                {allPosts.map((post) => (
                    <div key={post.id} className="px-4 md:px-0">
                        <PostCard post={post} />
                    </div>
                ))}
            </TabsContent>
            <TabsContent value="map" className="mt-6">
                <MapView />
            </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
