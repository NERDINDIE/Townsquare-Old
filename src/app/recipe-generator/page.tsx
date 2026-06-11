
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ChefHat, Loader2, Sparkles, Upload } from '@/components/icons';
import { generateRecipeFromImage, type RecipeFromImageOutput } from '@/ai/flows/recipe-generator-flow';
import { toast } from '@/hooks/use-toast';
import Link from 'next/link';
import Image from 'next/image';

export default function RecipeGeneratorPage() {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<RecipeFromImageOutput | null>(null);

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

    const handleGenerateRecipe = async () => {
        if (!imageFile) {
            toast({
                variant: 'destructive',
                title: 'No Image Selected',
                description: 'Please upload an image of your ingredients.',
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
                const recipeResult = await generateRecipeFromImage({ photoDataUri: base64data });
                setResult(recipeResult);
            };
        } catch (error) {
            console.error('Failed to generate recipe:', error);
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Could not generate a recipe. Please try again.',
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
                    <ChefHat />
                    AI Recipe Generator
                </h1>
                <p className="text-muted-foreground mt-1">
                    Get recipe ideas based on the ingredients you have.
                </p>
            </header>

            <Card>
                <CardHeader>
                    <CardTitle>What's in Your Kitchen?</CardTitle>
                    <CardDescription>Upload a photo of your ingredients and let our AI chef create a recipe for you.</CardDescription>
                </CardHeader>
                <CardContent>
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
                </CardContent>
                <CardFooter>
                    <Button onClick={handleGenerateRecipe} disabled={isLoading}>
                        {isLoading ? (
                            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...</>
                        ) : (
                            <><Sparkles className="mr-2 h-4 w-4" /> Generate Recipe</>
                        )}
                    </Button>
                </CardFooter>
            </Card>

            {isLoading && (
                <Card className="mt-8">
                    <CardContent className="p-8 text-center text-muted-foreground">
                        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
                        <p>The AI chef is cooking up a recipe...</p>
                    </CardContent>
                </Card>
            )}

            {result && (
                <Card className="mt-8">
                    <CardHeader>
                        <CardTitle>{result.title}</CardTitle>
                        <CardDescription>{result.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="grid md:grid-cols-3 gap-6">
                        <div className="md:col-span-1 space-y-4">
                            <div>
                                <h3 className="font-semibold">Prep Time</h3>
                                <p className="text-muted-foreground">{result.prepTime}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold">Servings</h3>
                                <p className="text-muted-foreground">{result.servings}</p>
                            </div>
                             <div>
                                <h3 className="font-semibold">Ingredients</h3>
                                <ul className="list-disc pl-5 text-muted-foreground space-y-1 mt-1">
                                    {result.ingredients.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="md:col-span-2">
                             <h3 className="font-semibold">Instructions</h3>
                             <ol className="list-decimal pl-5 text-muted-foreground space-y-2 mt-1">
                                {result.instructions.map((step, index) => (
                                    <li key={index}>{step}</li>
                                ))}
                            </ol>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
