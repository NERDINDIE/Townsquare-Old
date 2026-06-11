
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Archive as ArchiveIcon, Book, Newspaper, MessageSquare, ArrowLeft } from "@/components/icons";
import { articles } from "@/lib/data";
import { publications } from "@/lib/epaper";
import { allPosts, historicalUsers } from "@/lib/bulletin-board-data";
import Link from "next/link";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function ArchivePage() {
    const router = useRouter();
    const archivedArticles = articles.slice(4); // Example: older articles
    const archivedPublications = publications.slice(2); // Example: older publications
    
    const historicalHandles = historicalUsers.map(u => u.handle);
    const historicalThreads = allPosts.filter(p => historicalHandles.includes(p.author.handle));
    const archivedThreads = allPosts.filter(p => !historicalHandles.includes(p.author.handle));


    return (
        <div className="container mx-auto max-w-4xl px-4 py-8 md:py-12">
            <header className="mb-8">
                <Button onClick={() => router.back()} variant="ghost" className="mb-4 -ml-4">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                </Button>
                <h1 className="font-headline text-4xl font-bold flex items-center gap-3">
                    <ArchiveIcon className="h-10 w-10" />
                    The Archive
                </h1>
                <p className="text-muted-foreground mt-1">
                    A collection of past articles, publications, and community discussions.
                </p>
            </header>

            <Tabs defaultValue="articles" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="articles">
                        <Book className="mr-2 h-4 w-4" /> Articles
                    </TabsTrigger>
                    <TabsTrigger value="publications">
                        <Newspaper className="mr-2 h-4 w-4" /> Publications
                    </TabsTrigger>
                    <TabsTrigger value="threads">
                        <MessageSquare className="mr-2 h-4 w-4" /> Threads
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="articles" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Archived Articles</CardTitle>
                            <CardDescription>Browse through past news stories and features.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {archivedArticles.map(article => (
                                <Link key={article.id} href={`/articles/${article.slug}`}>
                                    <div className="flex items-center gap-4 p-2 rounded-lg hover:bg-muted/50">
                                        <div className="relative h-16 w-24 rounded-md overflow-hidden flex-shrink-0">
                                            <Image src={article.image} alt={article.title} fill className="object-cover" />
                                        </div>
                                        <div>
                                            <p className="font-semibold line-clamp-2">{article.title}</p>
                                            <p className="text-sm text-muted-foreground">{article.date} &bull; {article.category}</p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="publications" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Past Publications</CardTitle>
                            <CardDescription>Revisit previous editions of our publications.</CardDescription>
                        </CardHeader>
                        <CardContent className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                            {archivedPublications.map(pub => (
                                <Link key={pub.id} href="/the-rack" className="group">
                                    <div className="relative aspect-[3/4] rounded-md overflow-hidden">
                                        <Image src={pub.editions[0].coverImage} alt={pub.name} fill className="object-cover transition-transform group-hover:scale-105" />
                                    </div>
                                    <p className="text-xs font-semibold mt-2 text-center truncate">{pub.name}</p>
                                </Link>
                            ))}
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="threads" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>The History Post</CardTitle>
                            <CardDescription>A collection of historical threads from the perspectives of those who lived it.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {historicalThreads.map(post => (
                                <Link key={post.id} href={`/bulletin-board/${post.author.handle}`} className="block p-3 rounded-lg hover:bg-muted/50">
                                    <div className="flex items-start gap-3">
                                        <Avatar className="h-9 w-9">
                                            <AvatarImage src={post.author.avatar} />
                                            <AvatarFallback>{post.author.fallback}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <div className="flex items-baseline gap-2">
                                                <p className="font-semibold">{post.author.name}</p>
                                                <p className="text-xs text-muted-foreground">{post.time}</p>
                                            </div>
                                            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{post.content}</p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </CardContent>
                    </Card>
                    <Card className="mt-6">
                        <CardHeader>
                            <CardTitle>Archived Community Threads</CardTitle>
                            <CardDescription>Look back on past community conversations.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {archivedThreads.map(post => (
                                <Link key={post.id} href={`/bulletin-board/${post.author.handle}`} className="block p-3 rounded-lg hover:bg-muted/50">
                                    <div className="flex items-start gap-3">
                                        <Avatar className="h-9 w-9">
                                            <AvatarImage src={post.author.avatar} />
                                            <AvatarFallback>{post.author.fallback}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <div className="flex items-baseline gap-2">
                                                <p className="font-semibold">{post.author.name}</p>
                                                <p className="text-xs text-muted-foreground">{post.time}</p>
                                            </div>
                                            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{post.content}</p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
