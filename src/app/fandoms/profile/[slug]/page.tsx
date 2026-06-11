
'use client';

import { notFound, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Bell, Headphones, Mail, MoreHorizontal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { publications } from "@/lib/data/fandom-data";

export default function FandomProfilePage({ params }: { params: { slug: string } }) {
    const router = useRouter();
    const publication = publications[params.slug as keyof typeof publications];

    if (!publication) {
        notFound();
    }

    return (
        <div className="bg-[#1C1C1C] text-white min-h-screen">
            <header className="relative h-48">
                <Image src={publication.headerImage} alt={publication.name} fill className="object-cover opacity-50" data-ai-hint="sports team celebration" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C] to-transparent" />
                <div className="absolute top-4 left-4">
                    <Button variant="ghost" size="icon" className="bg-black/50 rounded-full" onClick={() => router.back()}>
                        <ArrowLeft />
                    </Button>
                </div>
                 <div className="absolute top-4 right-4">
                    <Button variant="ghost" size="icon" className="bg-black/50 rounded-full">
                        <MoreHorizontal />
                    </Button>
                </div>
                <div className="absolute -bottom-12 left-6">
                    <div className="w-24 h-24 bg-yellow-400 rounded-2xl flex items-center justify-center border-4 border-[#1C1C1C]">
                        <span className="text-black text-5xl font-serif font-bold">{publication.logo}</span>
                    </div>
                </div>
            </header>

            <main className="pt-16 px-6 pb-8">
                <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" className="bg-gray-800 rounded-full"><Mail /></Button>
                    <Button variant="ghost" size="icon" className="bg-gray-800 rounded-full"><Bell /></Button>
                    <Button className="rounded-full bg-gray-200 text-black hover:bg-white">Follow</Button>
                </div>

                <div className="mt-4">
                    <h1 className="text-2xl font-bold">{publication.name}</h1>
                    <p className="text-gray-400 mt-2 text-sm">{publication.description}</p>
                </div>
                
                <Tabs defaultValue="recent" className="mt-6">
                    <TabsList className="bg-transparent p-0 justify-start gap-4 border-b border-gray-700 rounded-none">
                        <TabsTrigger value="recent" className="data-[state=active]:bg-gray-700 data-[state=active]:text-white rounded-lg px-4">Recent Issues</TabsTrigger>
                        <TabsTrigger value="stories" className="data-[state=active]:bg-gray-700 data-[state=active]:text-white rounded-lg px-4">Stories</TabsTrigger>
                        <TabsTrigger value="podcasts" className="data-[state=active]:bg-gray-700 data-[state=active]:text-white rounded-lg px-4">Podcasts</TabsTrigger>
                    </TabsList>
                    <TabsContent value="recent" className="mt-4 space-y-4">
                        {publication.articles.map(article => (
                            <Card key={article.id} className="bg-[#2A2A2A] border-none text-white">
                                <CardContent className="p-4">
                                    <div className="flex justify-between items-center mb-2">
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 bg-yellow-400 rounded-md flex items-center justify-center text-black font-serif text-sm font-bold">{publication.logo}</div>
                                            <span className="text-sm font-semibold">{publication.name}</span>
                                            <span className="text-xs text-gray-500">&bull; {article.time}</span>
                                        </div>
                                         <Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-5 w-5" /></Button>
                                    </div>
                                    <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                                        {article.isSponsored && <div className="h-5 w-5 bg-red-600 rounded-sm flex items-center justify-center text-xs">A</div>}
                                        {article.title}
                                    </h3>
                                    <p className="text-sm text-gray-400 mb-4">{article.summary}</p>
                                    {article.sponsor && <Button variant="secondary" size="sm" className="h-auto py-1 px-3 rounded-full bg-gray-600 hover:bg-gray-500">{article.sponsor}</Button>}

                                    <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-700">
                                        <p className="text-xs text-gray-500">{article.storyCount}</p>
                                        <Headphones className="h-5 w-5 text-gray-400" />
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </TabsContent>
                </Tabs>

            </main>
        </div>
    );
}

// Generate static paths for publications
export async function generateStaticParams() {
    return Object.keys(publications).map((slug) => ({
      slug,
    }));
}
