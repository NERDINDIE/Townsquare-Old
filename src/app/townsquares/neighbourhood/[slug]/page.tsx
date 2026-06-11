
'use client';

import { notFound, useRouter } from "next/navigation";
import { neighbourhoods, Neighbourhood } from "@/lib/data/neighbourhoods";
import { allPosts } from "@/lib/bulletin-board-data";
import { PostCard } from "@/components/PostCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Users, Rss, PlusCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";

export default function NeighbourhoodPage({ params }: { params: { slug: string } }) {
    const router = useRouter();
    const neighbourhood = neighbourhoods.find(n => n.slug === params.slug);

    if (!neighbourhood) {
        notFound();
    }

    const neighbourhoodPosts = allPosts.filter(post => 
        neighbourhood.userHandles.includes(post.author.handle)
    );

    return (
        <div>
            <header className="relative h-64 md:h-80">
                <Image 
                    src={neighbourhood.image} 
                    alt={`Image of ${neighbourhood.name}`}
                    fill
                    className="object-cover"
                    priority
                    data-ai-hint={neighbourhood.dataAiHint}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
                <div className="relative h-full flex flex-col justify-end container mx-auto px-4 py-8 md:py-12">
                    <Button onClick={() => router.back()} variant="ghost" className="absolute top-4 left-0 text-white hover:text-white hover:bg-black/20 bg-black/10">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Townsquares
                    </Button>
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-background/80 rounded-full flex items-center justify-center backdrop-blur-sm">
                             <Users className="h-8 w-8 text-foreground" />
                        </div>
                        <div>
                            <h1 className="font-headline text-5xl md:text-7xl font-bold">{neighbourhood.name}</h1>
                            <p className="text-foreground/80 md:text-lg">{neighbourhood.description}</p>
                        </div>
                    </div>
                </div>
            </header>
            
            <div className="container mx-auto px-4 py-8 md:py-12">
                 <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Create a new post</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Textarea placeholder={`Share something in ${neighbourhood.name}...`} />
                    </CardContent>
                    <CardContent className="flex justify-end">
                         <Button>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Post
                        </Button>
                    </CardContent>
                </Card>

                <div className="space-y-6">
                    {neighbourhoodPosts.length > 0 ? (
                        neighbourhoodPosts.map(post => <PostCard key={post.id} post={post} />)
                    ) : (
                        <Card className="text-center p-8 border-dashed">
                            <p className="text-muted-foreground">This neighbourhood is quiet... for now. Be the first to post!</p>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
}

// Generate static paths for all neighbourhoods
export async function generateStaticParams() {
  return neighbourhoods.map((n) => ({
    slug: n.slug,
  }));
}
