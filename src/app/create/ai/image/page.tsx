
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, ImageIcon, Loader2, Sparkles } from '@/components/icons';
import { toast } from '@/hooks/use-toast';
import Link from 'next/link';
import Image from 'next/image';
import { generateImage } from '@/ai/flows/image-generation-flow';

export default function CreateAiImagePage() {
    const [prompt, setPrompt] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleGenerate = async () => {
        if (!prompt.trim()) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Please enter a prompt to generate an image.',
            });
            return;
        }

        setIsLoading(true);
        setImageUrl('');

        try {
            const result = await generateImage({ prompt });
            if(result.imageUrl) {
                setImageUrl(result.imageUrl);
            } else {
                 toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: 'The AI could not generate an image for this prompt. Please try another one.',
                });
            }
        } catch (error) {
            console.error(error);
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Could not generate the image. Please try again.',
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
                    <ImageIcon />
                    Create AI Image
                </h1>
                <p className="text-muted-foreground mt-1">
                    Generate a unique image using a text prompt. Generated images are private by default.
                </p>
            </header>

            <Card>
                <CardHeader>
                    <CardTitle>Image Prompt</CardTitle>
                    <CardDescription>
                        Describe the image you want the AI to create. Be as specific as you like.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Textarea 
                        placeholder="e.g., A futuristic cityscape at sunset, with flying cars and neon signs, in a synthwave style."
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
                            <><Sparkles className="mr-2 h-4 w-4" /> Generate Image</>
                        )}
                    </Button>
                </CardFooter>
            </Card>

            {(isLoading || imageUrl) && (
                <Card className="mt-8">
                    <CardHeader>
                        <CardTitle>Result</CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center justify-center">
                        {isLoading ? (
                             <div className="flex flex-col items-center gap-4 p-8 text-muted-foreground">
                                <Loader2 className="h-10 w-10 animate-spin" />
                                <p>The AI is painting your masterpiece...</p>
                            </div>
                        ) : imageUrl ? (
                            <Image 
                                src={imageUrl} 
                                alt={prompt}
                                width={512}
                                height={512}
                                className="rounded-lg shadow-md"
                            />
                        ) : null}
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
