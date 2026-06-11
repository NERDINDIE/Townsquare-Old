
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Book, MessageSquare, SendHorizonal, Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const messages = [
    { from: 'ai', text: '¡Hola! ¿Cómo estás? Let\'s practice some Spanish. How would you ask "Where is the library?"' },
    { from: 'me', text: 'Donde esta la biblioteca?' },
    { from: 'ai', text: 'Almost! Great try. It\'s "¿Dónde está la biblioteca?". The accent on "Dónde" is important for questions. Want to try another one?' },
];

export default function LanguageTutorPage() {
    const router = useRouter();

    return (
        <div className="h-screen bg-muted/30 flex flex-col">
            <header className="p-4 border-b bg-background flex-shrink-0 z-10 flex items-center justify-between">
                <Button variant="ghost" size="icon" onClick={() => router.back()}>
                    <ArrowLeft />
                </Button>
                <div className="text-center">
                    <h1 className="text-xl font-bold">Language Tutor</h1>
                    <p className="text-sm text-green-500 font-semibold">Spanish • Active</p>
                </div>
                 <Button variant="ghost" size="icon">
                    <Settings />
                </Button>
            </header>

            <ScrollArea className="flex-1 p-4 md:p-6">
                <div className="space-y-6 max-w-2xl mx-auto">
                    {messages.map((msg, index) => (
                        <div key={index} className={cn("flex items-end gap-2", msg.from === 'me' ? 'justify-end' : '')}>
                            {msg.from === 'ai' && <div className="h-8 w-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center shrink-0"><Book className="h-5 w-5" /></div>}
                            <div className={cn(
                                "max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-lg",
                                msg.from === 'me' ? 'bg-primary text-primary-foreground rounded-br-none' : 'bg-background rounded-bl-none shadow-sm'
                            )}>
                                <p>{msg.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollArea>

            <footer className="p-4 border-t bg-background z-10">
                <div className="max-w-2xl mx-auto">
                    <div className="relative">
                        <Input placeholder="Type your message..." className="pr-12 h-12" />
                        <div className="absolute right-2 top-1/2 -translate-y-1/2">
                            <Button size="icon">
                                <SendHorizonal />
                                <span className="sr-only">Send</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

