
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Play, Pause, Loader2, Voicemail as VoicemailIcon } from 'lucide-react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { generateVoicemail } from '@/ai/flows/voicemail-flow';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { useAudio } from 'react-use';


const mockVoicemails = [
    {
        id: 1,
        caller: 'John Smith',
        number: '(555) 123-4567',
        avatar: 'https://github.com/randomuser1.png',
        fallback: 'JS',
        time: 'Today, 2:45 PM',
        transcription: "Hey, it's John. Just calling to confirm our meeting tomorrow at 10 AM. Let me know if that still works for you. Talk soon, bye.",
        voice: 'Achernar' as const,
    },
    {
        id: 2,
        caller: 'Emily White',
        number: '(555) 987-6543',
        avatar: 'https://github.com/randomuser2.png',
        fallback: 'EW',
        time: 'Yesterday, 5:20 PM',
        transcription: "Hi there! I was just calling to follow up on the article draft. I've sent over my notes. I think it's looking great, just a few minor tweaks. Give me a call back when you have a moment.",
        voice: 'Sirius' as const,
    },
     {
        id: 3,
        caller: 'Unknown Number',
        number: '(555) 555-5555',
        avatar: '',
        fallback: '?',
        time: 'Yesterday, 11:10 AM',
        transcription: "This is a reminder from your dental office about your appointment on Friday at 3:00 PM. Please call us to confirm. Thank you.",
        voice: 'Enif' as const,
    }
];

export default function VoicemailPage() {
    const [loadingAudioId, setLoadingAudioId] = useState<number | null>(null);
    const [activeAudio, setActiveAudio] = useState<{ id: number, src: string } | null>(null);

    const [audio, state, controls, ref] = useAudio({
        src: activeAudio?.src || '',
        autoPlay: true,
    });

    const handlePlay = async (voicemail: typeof mockVoicemails[0]) => {
        if(activeAudio?.id === voicemail.id) {
            if(state.paused) controls.play();
            else controls.pause();
            return;
        }

        setLoadingAudioId(voicemail.id);
        setActiveAudio(null);
        try {
            const result = await generateVoicemail({
                transcription: voicemail.transcription,
                voice: voicemail.voice,
            });
            setActiveAudio({ id: voicemail.id, src: result.audio });
        } catch (error) {
            console.error('Failed to generate voicemail:', error);
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Could not load voicemail audio. Please try again.',
            });
        } finally {
            setLoadingAudioId(null);
        }
    };

    return (
        <div className="container mx-auto max-w-2xl px-4 py-8 md:py-12">
            <header className="mb-8">
                <Button asChild variant="ghost" className="mb-4 -ml-4">
                    <Link href="/">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back
                    </Link>
                </Button>
                <h1 className="font-headline text-4xl font-bold flex items-center gap-3">
                    <VoicemailIcon className="h-10 w-10" />
                    Voicemail
                </h1>
                <p className="text-muted-foreground mt-1">
                    Listen to your messages. Powered by AI.
                </p>
            </header>

            <div className="space-y-4">
                {audio}
                {mockVoicemails.map(vm => {
                    const isPlaying = activeAudio?.id === vm.id && !state.paused;
                    return (
                        <Card key={vm.id}>
                            <CardContent className="p-4">
                                <div className="flex items-start gap-4">
                                    <Avatar className="h-12 w-12">
                                        <AvatarImage src={vm.avatar} alt={vm.caller} />
                                        <AvatarFallback>{vm.fallback}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-center">
                                            <p className="font-semibold">{vm.caller}</p>
                                            <p className="text-xs text-muted-foreground">{vm.time}</p>
                                        </div>
                                        <p className="text-sm text-muted-foreground">{vm.number}</p>
                                        <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                                            <p className="text-sm italic">{vm.transcription}</p>
                                        </div>
                                    </div>
                                    <Button
                                        size="icon"
                                        variant="outline"
                                        onClick={() => handlePlay(vm)}
                                        disabled={loadingAudioId !== null && loadingAudioId !== vm.id}
                                        className="self-center"
                                    >
                                        {loadingAudioId === vm.id ? (
                                            <Loader2 className="h-5 w-5 animate-spin" />
                                        ) : isPlaying ? (
                                            <Pause className="h-5 w-5" />
                                        ) : (
                                            <Play className="h-5 w-5" />
                                        )}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>
        </div>
    );
}
