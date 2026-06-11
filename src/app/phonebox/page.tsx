
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Phone, PhoneForwarded, PhoneMissed, PhoneIncoming, AlertCircle, Bot, Loader2, PhoneOff } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { deflectSpam } from '@/ai/flows/spam-deflector-flow';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const callLog = [
    { id: 1, name: 'Emily White', number: '(555) 987-6543', type: 'incoming' as const, time: '2h ago', avatar: 'https://github.com/randomuser2.png', fallback: 'EW', isSpam: false },
    { id: 6, name: 'ワン切り着信', number: '+44 20 7123 4567', type: 'spam' as const, time: '3h ago', avatar: '', fallback: '?', isSpam: true, spamType: 'one-ring' },
    { id: 2, name: 'Utilities Dept.', number: '(800) 555-0199', type: 'spam' as const, time: '4h ago', avatar: '', fallback: 'U' , isSpam: true, spamType: 'spoofed' },
    { id: 3, name: 'John Smith', number: '(555) 123-4567', type: 'outgoing' as const, time: 'Yesterday', avatar: 'https://github.com/randomuser1.png', fallback: 'JS', isSpam: false },
    { id: 4, name: 'Missed Call', number: '(555) 867-5309', type: 'missed' as const, time: '2 days ago', avatar: '', fallback: '?', isSpam: false },
    { id: 5, name: 'Auto Warranty Scam', number: '(888) 555-1234', type: 'spam' as const, time: '3 days ago', avatar: '', fallback: 'A', isSpam: true, spamType: 'general' },
];

export default function PhoneboxPage() {
    const [deflectingCallId, setDeflectingCallId] = useState<number | null>(null);

    const handleDeflect = async (callId: number) => {
        setDeflectingCallId(callId);
        try {
            const result = await deflectSpam();
            toast({
                title: "Spam Deflected!",
                description: `Our AI ${result.persona} is now handling the call. Conversation: "${result.openingLine}"`,
                duration: 10000,
            });
        } catch (error) {
            console.error("Failed to deflect spam:", error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "Could not deflect the call. Please try again.",
            });
        } finally {
            setDeflectingCallId(null);
        }
    };

    const getIconForCallType = (type: string) => {
        switch (type) {
            case 'incoming': return <PhoneIncoming className="h-5 w-5 text-green-500" />;
            case 'outgoing': return <PhoneForwarded className="h-5 w-5 text-blue-500" />;
            case 'missed': return <PhoneMissed className="h-5 w-5 text-gray-500" />;
            case 'spam': return <AlertCircle className="h-5 w-5 text-destructive" />;
            default: return <Phone className="h-5 w-5 text-muted-foreground" />;
        }
    }
    
    const getSpamDescription = (type?: string) => {
        switch (type) {
            case 'one-ring': return 'ワン切り着信 (One-ring call detected)';
            case 'spoofed': return '番号なりすましアラート (Spoofed number alert)';
            default: return 'Suspected Spam';
        }
    }


    return (
        <div className="container mx-auto max-w-2xl px-4 py-8 md:py-12">
            <header className="mb-8">
                <h1 className="font-headline text-4xl font-bold flex items-center gap-3">
                    <Phone className="h-10 w-10" />
                    Phonebox
                </h1>
                <p className="text-muted-foreground mt-1">
                    Your call log with AI-powered spam deflection.
                </p>
            </header>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Calls</CardTitle>
                    <CardDescription>Your call history and spam detection log.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        {callLog.map(call => (
                            <div key={call.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50">
                                <div className="w-6 text-center">{getIconForCallType(call.type)}</div>
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src={call.avatar} />
                                    <AvatarFallback>{call.fallback}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <p className="font-semibold">{call.isSpam ? getSpamDescription(call.spamType) : call.name}</p>
                                    <p className="text-sm text-muted-foreground">{call.number}</p>
                                </div>
                                 <div className="text-right">
                                    {call.isSpam ? (
                                        <Button 
                                            size="sm" 
                                            variant="destructive"
                                            onClick={() => handleDeflect(call.id)}
                                            disabled={deflectingCallId !== null}
                                        >
                                            {deflectingCallId === call.id ? (
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            ) : (
                                                <Bot className="mr-2 h-4 w-4" />
                                            )}
                                            Deflect
                                        </Button>
                                    ) : (
                                        <p className="text-xs text-muted-foreground">{call.time}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
