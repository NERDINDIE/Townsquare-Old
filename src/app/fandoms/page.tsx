
'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUp, ArrowDown, MessageCircle, Bookmark, Settings, AtSign, Bell, RefreshCw, Headphones, Share2, Home, Video, Trophy, Search, UserCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { feedItems } from "@/lib/data/fandom-data";

export default function FandomsPage() {
    return (
        <div className="bg-[#1A2634] text-gray-300 min-h-screen font-sans">
            <div className="container mx-auto max-w-2xl">
                {/* Header */}
                <header className="flex justify-between items-center py-4">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                            <div className="w-4 h-4 rounded-full bg-[#1A2634] border-2 border-white"></div>
                        </div>
                        <h1 className="text-2xl font-bold text-white">Ana Akış</h1>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon"><Settings className="h-6 w-6 text-gray-400" /></Button>
                        <Button variant="ghost" size="icon"><AtSign className="h-6 w-6 text-gray-400" /></Button>
                        <Button variant="ghost" size="icon"><Bell className="h-6 w-6 text-gray-400" /></Button>
                    </div>
                </header>
                <p className="text-sm text-gray-400 px-4 mb-4">Her ilgi alanından son haberler derlendi</p>

                {/* Featured Card */}
                <div className="px-4 mb-4">
                    <Card className="bg-[#2C3A4A] border-none text-white">
                        <CardContent className="p-3 flex items-center gap-3">
                            <Image src="https://placehold.co/120x80.png" alt="Featured News" width={120} height={80} className="rounded-md" data-ai-hint="afghanistan crisis" />
                            <div>
                                <p className="text-sm font-bold text-blue-400">ÖNE ÇIKAN:</p>
                                <p className="text-sm">Afganistan'ın doğusunda meydana gelen depremde şimdiye kadar 622 kişinin öldüğü, 1555 kişinin yaralandığı duyuruldu.</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Audio Briefing Card */}
                 <div className="px-4 mb-4">
                     <Card className="bg-green-800/20 border-green-500/30 text-white">
                        <CardContent className="p-3 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <RefreshCw className="h-6 w-6 text-green-400" />
                                <div>
                                    <p className="text-sm font-semibold">Başa Sar'da günün en önemli haberleri</p>
                                    <p className="text-xs text-gray-300">ana haber formatında derlendi</p>
                                </div>
                            </div>
                            <Button variant="ghost" size="icon"><Headphones className="h-6 w-6 text-green-300" /></Button>
                        </CardContent>
                    </Card>
                </div>
                
                {/* Tabs */}
                <div className="border-b border-gray-700 px-4">
                    <div className="flex gap-6 text-gray-400 font-semibold">
                        <button className="py-3 text-white border-b-2 border-white">Ana Akış</button>
                        <button className="py-3">Size Özel</button>
                        <button className="py-3">Öne Çıkanlar</button>
                        <button className="py-3">Başa Sar</button>
                    </div>
                </div>

                {/* Feed */}
                <main className="divide-y divide-gray-800">
                    {feedItems.map((item, index) => (
                        <div key={index} className="p-4">
                            <div className="flex justify-between items-center mb-2">
                                <Link href={`/fandoms/profile/${item.publication.slug}`} className="flex items-center gap-2">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={item.publication.avatar} />
                                        <AvatarFallback>{item.publication.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-bold text-sm text-white">{item.publication.name} <span className="text-blue-400">&bull;</span> <span className="text-gray-400 font-normal">{item.time}</span></p>
                                    </div>
                                </Link>
                                <Button variant="ghost" size="icon"><Share2 className="h-5 w-5 text-gray-400" /></Button>
                            </div>
                            <p className="mb-3">{item.content}</p>
                            {item.images && item.images.length > 0 && (
                                <div className="grid grid-cols-2 gap-1 rounded-lg overflow-hidden">
                                    {item.images.map(img => (
                                        <Image key={img.src} src={img.src} alt="Post image" width={300} height={200} data-ai-hint={img.hint} />
                                    ))}
                                </div>
                            )}
                            <div className="flex items-center gap-4 text-gray-400 mt-3">
                                <div className="flex items-center gap-1">
                                    <Button variant="ghost" size="icon" className="h-8 w-8"><ArrowUp /></Button>
                                    <span>{item.upvotes}</span>
                                </div>
                                 <div className="flex items-center gap-1">
                                    <Button variant="ghost" size="icon" className="h-8 w-8"><ArrowDown /></Button>
                                    <span>{item.downvotes}</span>
                                </div>
                                <Button variant="ghost" className="flex items-center gap-1">
                                    <MessageCircle className="h-5 w-5" />
                                    <span>{item.comments}</span>
                                </Button>
                                <Button variant="ghost" size="icon" className="ml-auto"><Bookmark /></Button>
                            </div>
                        </div>
                    ))}
                     <div className="text-center py-8">
                        <Link href="/fandoms/archive" className="text-blue-400 hover:underline">View e-paper edition archive</Link>
                    </div>
                </main>
            </div>

             {/* Bottom Nav */}
            <nav className="fixed bottom-0 left-0 right-0 bg-[#222] border-t border-gray-700 md:hidden">
                <div className="container mx-auto flex justify-around items-center h-16">
                    <Button variant="ghost" className="flex flex-col h-auto items-center gap-1 text-white">
                        <Home className="h-6 w-6" />
                    </Button>
                     <Button variant="ghost" className="flex flex-col h-auto items-center gap-1 text-gray-400">
                        <Video className="h-6 w-6" />
                    </Button>
                     <Button variant="ghost" className="flex flex-col h-auto items-center gap-1 text-gray-400">
                        <Trophy className="h-6 w-6" />
                    </Button>
                     <Button variant="ghost" className="flex flex-col h-auto items-center gap-1 text-gray-400">
                        <Search className="h-6 w-6" />
                    </Button>
                     <Button variant="ghost" className="flex flex-col h-auto items-center gap-1 text-gray-400">
                        <UserCircle className="h-6 w-6" />
                    </Button>
                </div>
            </nav>
        </div>
    );
}
