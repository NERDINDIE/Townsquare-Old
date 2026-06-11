
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Clapperboard, Loader2, Sparkles } from '@/components/icons';
import { toast } from '@/hooks/use-toast';
import Link from 'next/link';
import { generateVideo } from '@/ai/flows/video-generation-flow';

export default function CreateAiVideoPage() {
    const [prompt, setPrompt] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleGenerate = async () => {
        if (!prompt.trim()) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Please enter a prompt to generate a video.',
            });
            return;
        }

        setIsLoading(true);
        setVideoUrl('');

        try {
            const result = await generateVideo({ prompt });
            if (result.videoUrl) {
                setVideoUrl(result.videoUrl);
                 toast({
                    title: 'Video is ready!',
                    description: 'Your AI-generated video has been created.',
                });
            } else {
                toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: 'The AI could not generate a video for this prompt. Please try another one.',
                });
            }
        } catch (error) {
            console.error(error);
            const errorMessage = (error as Error).message || 'Could not generate the video. Please try again.';
            toast({
                variant: 'destructive',
                title: 'Generation Failed',
                description: errorMessage,
            });
        } finally {
            setIsLoading(false);
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
                    <Clapperboard />
                    Create AI Video
                </h1>
                <p className="text-muted-foreground mt-1">
                    Generate a unique video from a text prompt. Creations are private by default.
                </p>
            </header>

            <Card>
                <CardHeader>
                    <CardTitle>Video Prompt</CardTitle>
                    <CardDescription>
                        Describe the video you want the AI to create. This can take up to a minute.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Textarea 
                        placeholder="e.g., A majestic dragon soaring over a mystical forest at dawn."
                        rows={4}
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        disabled={isLoading}
                    />
                </CardContent>
                <CardFooter>
                    <Button onClick={handleGenerate} disabled={isLoading}>
                        {isLoading ? (
                            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...</>
                        ) : (
                            <><Sparkles className="mr-2 h-4 w-4" /> Generate Video</>
                        )}
                    </Button>
                </CardFooter>
            </Card>

            {(isLoading || videoUrl) && (
                <Card className="mt-8">
                    <CardHeader>
                        <CardTitle>Result</CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center justify-center">
                        {isLoading ? (
                             <div className="flex flex-col items-center gap-4 p-8 text-muted-foreground">
                                <Loader2 className="h-10 w-10 animate-spin" />
                                <p>The AI is rendering your video. Please wait...</p>
                            </div>
                        ) : videoUrl ? (
                           <video
                                src={videoUrl}
                                controls
                                autoPlay
                                loop
                                className="rounded-lg shadow-md w-full"
                            />
                        ) : null}
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
