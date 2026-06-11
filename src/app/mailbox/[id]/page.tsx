
'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Bot, SendHorizonal, ArrowLeft, Paperclip, Users, Loader2, Heart } from "@/components/icons";
import React, { useEffect, useState } from "react";
import Link from 'next/link';
import { smsThreads, SmsMessage } from "@/lib/sms-data";
import { toast } from "@/hooks/use-toast";
import { deflectTextSpam } from "@/ai/flows/text-spam-deflector-flow";

export async function generateStaticParams() {
  return smsThreads.map((thread) => ({
    id: thread.id.toString(),
  }));
}

export default function MessagePage({ params: { id } }: { params: { id: string } }) {
    const conversationId = parseInt(id, 10);
    const conversation = smsThreads.find(c => c.id === conversationId);
    
    // Use state to manage messages to allow for dynamic updates
    const [messages, setMessages] = useState<SmsMessage[]>(conversation?.messages || []);
    const [isTyping, setIsTyping] = useState(false);
    const [isDeflecting, setIsDeflecting] = useState(false);

    // Simulate typing indicator for human conversations
    useEffect(() => {
        if (conversation?.type === 'human' || conversation?.type === 'match') {
            const showTyping = () => {
                setIsTyping(true);
                setTimeout(() => setIsTyping(false), 3000); // Show for 3 seconds
            };

            const interval = setInterval(showTyping, 10000); // Show every 10 seconds
            return () => clearInterval(interval);
        }
    }, [conversation]);

    const handleDeflect = async () => {
        if (!conversation || !conversation.isSpam) return;

        setIsDeflecting(true);
        try {
            const spamMessage = conversation.messages[conversation.messages.length - 1]?.content;
            const result = await deflectTextSpam({ spamText: spamMessage });
            
            // Add AI response to the local message state
            setMessages(prev => [...prev, { from: 'me', content: result.response }]);
            
            toast({
                title: `Deflecting as ${result.persona}`,
                description: `AI Response Sent: "${result.response}"`,
                duration: 8000,
            });

        } catch (error) {
             toast({
                variant: 'destructive',
                title: 'Deflection Failed',
                description: 'Could not generate an AI response.',
            });
        } finally {
            setIsDeflecting(false);
        }
    };


    if (!conversation) {
        return (
            <div className="flex-1 flex flex-col h-full items-center justify-center text-center">
                <h2 className="text-xl font-semibold">Conversation not found</h2>
                <p className="text-muted-foreground">The conversation you are looking for does not exist.</p>
                <Button asChild variant="link" className="mt-4">
                    <Link href="/mailbox">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Mailbox
                    </Link>
                </Button>
            </div>
        );
    }
    
    return (
        <div className="flex flex-1 flex-col h-[calc(100vh-4rem)]">
            {/* Chat Header */}
            <div className="p-4 border-b flex items-center gap-4">
                <Link href="/mailbox" className="md:hidden">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft />
                    </Button>
                </Link>
                <Avatar className="h-10 w-10">
                    {conversation.type === 'ai' ? (
                        <AvatarFallback className="bg-primary text-primary-foreground">
                            <Bot />
                        </AvatarFallback>
                    ) : conversation.type === 'group' ? (
                        <AvatarFallback className="bg-muted-foreground text-background">
                            <Users />
                        </AvatarFallback>
                    ) : conversation.type === 'match' ? (
                         <AvatarFallback className="bg-brand-rendezvous text-white">
                            <Heart />
                        </AvatarFallback>
                    ) : (
                        <>
                            <AvatarImage src={conversation.avatar} alt={conversation.name} />
                            <AvatarFallback>{conversation.name.substring(0,2)}</AvatarFallback>
                        </>
                    )}
                </Avatar>
                <div>
                    <h2 className="text-xl font-bold">{conversation.name}</h2>
                    {conversation.type !== 'group' && (
                        <div className="flex items-center gap-2">
                            {conversation.status === 'online' && <div className="h-2.5 w-2.5 rounded-full bg-green-500" />}
                            <p className="text-sm text-muted-foreground">{conversation.status === 'online' ? 'Online' : 'Offline'}</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4 md:p-6">
                <div className="space-y-6">
                    {messages.map((msg, index) => (
                        <div key={index} className={cn("flex items-end gap-2", msg.from === 'me' ? 'justify-end' : 'justify-start')}>
                            {msg.from !== 'me' && (
                                <Avatar className="h-8 w-8">
                                    {conversation.type === 'ai' ? (
                                        <AvatarFallback className="bg-primary text-primary-foreground">
                                            <Bot className="h-5 w-5"/>
                                        </AvatarFallback>
                                    ) : conversation.type === 'group' ? (
                                        <AvatarFallback className="bg-muted-foreground text-background text-xs">
                                            BC
                                        </AvatarFallback>
                                     ) : conversation.type === 'match' ? (
                                        <AvatarFallback className="bg-brand-rendezvous text-white">
                                            <Heart className="h-4 w-4 fill-white" />
                                        </AvatarFallback>
                                    ) : (
                                        <>
                                            <AvatarImage src={conversation.avatar} />
                                            <AvatarFallback>{conversation.name.substring(0,2)}</AvatarFallback>
                                        </>
                                    )}
                                </Avatar>
                            )}
                            <div className={cn(
                                "max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-lg whitespace-pre-wrap",
                                msg.from === 'me' ? 'bg-primary text-primary-foreground rounded-br-none' : 'bg-muted rounded-bl-none'
                            )}>
                                <p>{msg.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="h-6 mt-2">
                    {isTyping && (
                        <div className="text-sm italic text-muted-foreground animate-pulse">
                            {conversation.name} is typing...
                        </div>
                    )}
                </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="p-4 border-t bg-background">
                {conversation.isSpam ? (
                    <Button onClick={handleDeflect} disabled={isDeflecting} className="w-full" variant="destructive">
                        {isDeflecting ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Bot className="mr-2 h-4 w-4"/>}
                        Deflect Spam
                    </Button>
                ) : (
                    <div className="relative">
                        <Input placeholder="Type a message..." className="pr-24 h-12" />
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                            <Button variant="ghost" size="icon">
                                <Paperclip />
                                <span className="sr-only">Attach file</span>
                            </Button>
                            <Button size="icon">
                                <SendHorizonal />
                                <span className="sr-only">Send</span>
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
