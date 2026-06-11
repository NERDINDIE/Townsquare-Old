
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { respondToLetter, LetterToEditorOutput } from '@/ai/flows/letter-to-editor-flow';
import { Loader2 } from '@/components/icons';
import { toast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';


export default function LettersPage() {
    const [letterContent, setLetterContent] = useState('');
    const [response, setResponse] = useState<LetterToEditorOutput | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!letterContent.trim()) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Please write a letter before submitting.',
            });
            return;
        }

        setIsLoading(true);
        setResponse(null);

        try {
            const theme = localStorage.getItem('font') || 'modern';
            const result = await respondToLetter({ letterContent, theme });
            setResponse(result);
        } catch (error) {
            console.error(error);
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Could not get a response from the editor. Please try again.',
            });
        } finally {
            setIsLoading(false);
        }
    };


  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 md:py-12">
        <header className="mb-8">
            <h1 className="font-headline text-4xl font-bold">Letters to the Editor</h1>
            <p className="text-muted-foreground mt-1">
                Have something to say? We want to hear from you. Write a letter to the editor.
            </p>
        </header>
        
        <Card>
            <form onSubmit={handleSubmit}>
                <CardHeader>
                    <CardTitle>Write Your Letter</CardTitle>
                    <CardDescription>
                        Your letter may be published in a future edition of the Townsquare Times.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                     <div className="grid w-full gap-2">
                        <Label htmlFor="letter-content" className="sr-only">Your Letter</Label>
                        <Textarea 
                            id="letter-content"
                            placeholder="Dear Editor..." 
                            rows={8}
                            value={letterContent}
                            onChange={(e) => setLetterContent(e.target.value)}
                            disabled={isLoading}
                        />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit" disabled={isLoading}>
                         {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {isLoading ? 'Sending...' : 'Send Letter'}
                    </Button>
                </CardFooter>
            </form>
        </Card>


        {response && (
            <div className="mt-12">
                <h2 className="font-headline text-3xl font-bold mb-6">A Response from the Editor</h2>
                <Card>
                    <CardContent className="p-6 space-y-6">
                        <div className="flex items-start space-x-4">
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" alt="Editor" />
                                <AvatarFallback>ED</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <p className="font-semibold">The Editor</p>
                                <p className="text-xs text-muted-foreground">Townsquare Times</p>
                            </div>
                        </div>
                        <Separator />
                        <div className="text-foreground/90 space-y-4">
                        {response.response.split('\n\n').map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        )}
    </div>
  );
}
