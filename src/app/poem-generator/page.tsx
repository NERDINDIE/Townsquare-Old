
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, BookOpen, Loader2, Sparkles, Upload } from '@/components/icons';
import { generatePoemFromImage, type PoemFromImageOutput } from '@/ai/flows/poem-generator-flow';
import { toast } from '@/hooks/use-toast';
import Link from 'next/link';
import Image from 'next/image';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function PoemGeneratorPage() {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>('');
    const [poeticStyle, setPoeticStyle] = useState('Free Verse');
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<PoemFromImageOutput | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleGeneratePoem = async () => {
        if (!imageFile) {
            toast({
                variant: 'destructive',
                title: 'No Image Selected',
                description: 'Please upload an image to generate a poem.',
            });
            return;
        }

        setIsLoading(true);
        setResult(null);

        try {
            const reader = new FileReader();
            reader.readAsDataURL(imageFile);
            reader.onloadend = async () => {
                const base64data = reader.result as string;
                const poemResult = await generatePoemFromImage({
                    photoDataUri: base64data,
                    style: poeticStyle,
                });
                setResult(poemResult);
            };
        } catch (error) {
            console.error('Failed to generate poem:', error);
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Could not generate the poem. Please try again.',
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
                        Back to Home
                    </Link>
                </Button>
                <h1 className="font-headline text-4xl font-bold flex items-center gap-3">
                    <BookOpen />
                    AI Poem Generator
                </h1>
                <p className="text-muted-foreground mt-1">
                    Turn your images into beautiful poetry with AI.
                </p>
            </header>

            <Card>
                <CardHeader>
                    <CardTitle>Create Your Poem</CardTitle>
                    <CardDescription>Upload an image and select a poetic style to get started.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <label htmlFor="image-upload" className="block text-sm font-medium text-foreground mb-2">
                            Upload Image
                        </label>
                        <div className="flex items-center justify-center w-full">
                            <label htmlFor="image-upload" className="flex flex-col items-center justify-center w-full h-64 border-2 border-border border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted/80">
                                {imagePreview ? (
                                    <Image src={imagePreview} alt="Image preview" width={256} height={256} className="h-full w-full object-contain p-2" />
                                ) : (
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <Upload className="w-8 h-8 mb-4 text-muted-foreground" />
                                        <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                        <p className="text-xs text-muted-foreground">PNG, JPG, or WEBP</p>
                                    </div>
                                )}
                                <input id="image-upload" type="file" className="hidden" onChange={handleFileChange} accept="image/png, image/jpeg, image/webp" />
                            </label>
                        </div>
                    </div>
                     <div>
                        <label htmlFor="style-select" className="block text-sm font-medium text-foreground mb-2">
                            Poetic Style
                        </label>
                        <Select value={poeticStyle} onValueChange={setPoeticStyle} disabled={isLoading}>
                             <SelectTrigger id="style-select">
                                <SelectValue placeholder="Select a style" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Free Verse">Free Verse</SelectItem>
                                <SelectItem value="Haiku">Haiku</SelectItem>
                                <SelectItem value="Sonnet">Sonnet</SelectItem>
                                <SelectItem value="Limerick">Limerick</SelectItem>
                                <SelectItem value="Ode">Ode</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button onClick={handleGeneratePoem} disabled={isLoading}>
                        {isLoading ? (
                            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...</>
                        ) : (
                            <><Sparkles className="mr-2 h-4 w-4" /> Generate Poem</>
                        )}
                    </Button>
                </CardFooter>
            </Card>

            {isLoading && (
                <Card className="mt-8">
                    <CardContent className="p-8 text-center text-muted-foreground">
                        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
                        <p>The AI muse is composing your poem...</p>
                    </CardContent>
                </Card>
            )}

            {result && (
                <Card className="mt-8">
                    <CardHeader>
                        <CardTitle>{result.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <blockquote className="whitespace-pre-wrap font-serif text-lg italic border-l-4 pl-4">
                            {result.poem}
                        </blockquote>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
