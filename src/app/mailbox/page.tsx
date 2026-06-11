
'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Bot, Search, Mail, Mailbox, PencilLine, Heart } from "@/components/icons";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { smsThreads } from "@/lib/sms-data";
import { receivedPostcards } from "@/lib/data/mailbox-data";

function PostcardsView() {
    const [flipped, setFlipped] = useState<number | null>(null);

    const handleFlip = (id: number) => {
        setFlipped(prev => (prev === id ? null : id));
    };

    return (
        <div className="p-4 md:p-6">
            <div className="flex justify-end mb-4">
                 <Button asChild>
                    <Link href="/create/postcard">
                        <PencilLine className="mr-2 h-4 w-4" />
                        New Postcard
                    </Link>
                </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 [perspective:1000px]">
                {receivedPostcards.map(card => (
                    <div key={card.id} className="relative aspect-[5/3] cursor-pointer" onClick={() => handleFlip(card.id)}>
                        <div 
                            className={cn(
                                "absolute h-full w-full rounded-lg shadow-md transition-transform duration-700 [transform-style:preserve-3d]",
                                flipped === card.id && '[transform:rotateY(180deg)]'
                            )}
                        >
                            {/* Front */}
                            <div className="absolute h-full w-full [backface-visibility:hidden]">
                                <Image src={card.image} alt="Postcard front" layout="fill" objectFit="cover" className="rounded-lg" data-ai-hint={card.dataAiHint} />
                            </div>
                            {/* Back */}
                            <div className="absolute h-full w-full [transform:rotateY(180deg)] [backface-visibility:hidden] bg-[#F8F5E8] p-4 rounded-lg flex flex-col border">
                                <div className="flex-grow grid grid-cols-2 gap-4">
                                    <p className="text-sm whitespace-pre-wrap text-slate-700 font-serif">{card.message}</p>
                                    <div className="border-l border-dashed border-gray-400 pl-4 space-y-4">
                                        <div className="border border-gray-400 w-16 h-10 flex items-center justify-center text-xs text-muted-foreground">Stamp</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default function MailboxPage() {
    const pathname = usePathname();
    const isDmPage = /^\/mailbox\/\d+$/.test(pathname);

    const renderConversationList = (convos: typeof smsThreads) => (
        <ScrollArea className="flex-1">
            {convos.map(convo => (
                <Link href={`/mailbox/${convo.id}`} key={convo.id}>
                    <div
                        className={cn(
                            "flex items-center gap-4 p-4 w-full text-left hover:bg-muted/50 transition-colors",
                            pathname.startsWith(`/mailbox/${convo.id}`) && "bg-muted"
                        )}
                    >
                        <div className="relative">
                            <Avatar className="h-12 w-12">
                                {convo.type === 'ai' ? (
                                    <AvatarFallback className="bg-primary text-primary-foreground">
                                        <Bot />
                                    </AvatarFallback>
                                ) : convo.type === 'match' ? (
                                    <AvatarFallback className="bg-brand-rendezvous text-white">
                                        <Heart className="fill-white" />
                                    </AvatarFallback>
                                ) : (
                                    <>
                                        <AvatarImage src={convo.avatar} alt={convo.name} />
                                        <AvatarFallback>{convo.name.substring(0,2)}</AvatarFallback>
                                    </>
                                )}
                            </Avatar>
                            {convo.status === 'online' && convo.type !== 'group' && <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background" />}
                        </div>
                        <div className="flex-1 truncate">
                            <p className="font-semibold">{convo.name}</p>
                            <p className="text-sm text-muted-foreground truncate">{convo.messages[convo.messages.length - 1].content}</p>
                        </div>
                        <div className="text-xs text-muted-foreground self-start">
                            <p>{convo.timestamp}</p>
                            {convo.unread > 0 && (
                                <div className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs mt-1 ml-auto">
                                    {convo.unread}
                                </div>
                            )}
                        </div>
                    </div>
                </Link>
            ))}
        </ScrollArea>
    );

    return (
        <div className="h-[calc(100vh-4rem)] grid grid-cols-1 md:grid-cols-[3fr_7fr]">
            <div className={cn("w-full h-full border-r bg-muted/20 flex flex-col", isDmPage && "hidden md:flex")}>
                <div className="p-4 border-b">
                    <h1 className="font-headline text-2xl font-bold flex items-center gap-2"><Mailbox /> Mailbox</h1>
                    <div className="relative mt-4">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input placeholder="Search messages..." className="pl-10" />
                    </div>
                </div>
                <Tabs defaultValue="messages" className="flex-1 flex flex-col">
                    <TabsList className="mx-4 mt-4 grid w-auto grid-cols-3">
                        <TabsTrigger value="messages">Messages</TabsTrigger>
                        <TabsTrigger value="postcards">Postcards</TabsTrigger>
                        <TabsTrigger value="letters">Letters</TabsTrigger>
                    </TabsList>
                    <TabsContent value="messages" className="flex-1 flex flex-col">
                        {renderConversationList(smsThreads)}
                    </TabsContent>
                    <TabsContent value="postcards" className="flex-1">
                       <PostcardsView />
                    </TabsContent>
                     <TabsContent value="letters" className="flex-1">
                        <div className="p-4 md:p-6 text-center">
                            <p className="text-muted-foreground text-sm">No letters yet.</p>
                            <Button asChild variant="link">
                                <Link href="/create/letter">Write a new letter</Link>
                            </Button>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
             <div className={cn("flex-1 flex-col h-full animate-in fade-in-50 duration-500", isDmPage ? "hidden" : "flex md:hidden")}>
                 <div className="flex-1 flex items-center justify-center text-center p-4">
                    <div>
                        <h2 className="text-xl font-semibold">Select a conversation</h2>
                        <p className="text-muted-foreground">Choose one from the list to start chatting.</p>
                    </div>
                 </div>
            </div>
        </div>
    );
}
