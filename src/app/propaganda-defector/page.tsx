
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Flag, Loader2, ShieldCheck, ShieldAlert } from '@/components/icons';
import { defectPropaganda, type PropagandaDefectorOutput } from '@/ai/flows/propaganda-defector-flow';
import { toast } from '@/hooks/use-toast';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export default function PropagandaDefectorPage() {
    const [sourceText, setSourceText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<PropagandaDefectorOutput | null>(null);

    const handleDefect = async () => {
        if (!sourceText.trim()) {
            toast({ variant: 'destructive', title: 'Please provide some text to analyze.' });
            return;
        }
        setIsLoading(true);
        setResult(null);
        try {
            const res = await defectPropaganda({ text: sourceText });
            setResult(res);
        } catch (e) {
            console.error('Propaganda detection error:', e);
            toast({ variant: 'destructive', title: 'Error Analyzing Text', description: 'Could not analyze the text. Please try again.' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto max-w-4xl px-4 py-8 md:py-12">
            <header className="mb-8">
                <Button asChild variant="ghost" className="mb-4 -ml-4">
                    <Link href="/discover">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Discover
                    </Link>
                </Button>
                <h1 className="font-headline text-4xl font-bold flex items-center gap-3">
                    <Flag className="h-10 w-10 text-destructive" />
                    Propaganda Defector
                </h1>
                <p className="text-muted-foreground mt-1">
                    Analyze text to identify and understand propaganda techniques.
                </p>
            </header>

            <Card>
                <CardHeader>
                    <CardTitle>Analyze Content</CardTitle>
                    <CardDescription>
                        Paste the content from a news article, speech, or social media post below. The AI will analyze it for common manipulation techniques.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Textarea
                        placeholder="Paste text here..."
                        className="resize-y min-h-60"
                        value={sourceText}
                        onChange={(e) => setSourceText(e.target.value)}
                        disabled={isLoading}
                    />
                </CardContent>
                <CardFooter>
                    <Button onClick={handleDefect} disabled={isLoading}>
                        {isLoading ? (
                            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing...</>
                        ) : (
                            'Defect Propaganda'
                        )}
                    </Button>
                </CardFooter>
            </Card>

            {isLoading && (
                <Card className="mt-8">
                    <CardContent className="p-8 text-center text-muted-foreground">
                        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
                        <p>Scanning for propaganda techniques...</p>
                    </CardContent>
                </Card>
            )}

            {result && (
                <Card className="mt-8">
                    <CardHeader>
                        <CardTitle>Analysis Report</CardTitle>
                        <div className="flex items-center gap-2 pt-2">
                             {result.isPropaganda ? (
                                <Badge variant="destructive" className="gap-1.5"><ShieldAlert className="h-4 w-4"/> Propaganda Likely</Badge>
                             ) : (
                                 <Badge variant="secondary" className="gap-1.5 bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 hover:bg-green-100/80"><ShieldCheck className="h-4 w-4"/> No Obvious Propaganda</Badge>
                             )}
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                            <h3 className="font-semibold mb-2">Overall Assessment</h3>
                            <p className="text-muted-foreground italic">"{result.overallAssessment}"</p>
                        </div>
                        
                        {result.detectedTechniques.length > 0 && <Separator />}

                        {result.detectedTechniques.map((item, index) => (
                             <div key={index} className="space-y-2">
                                <h4 className="font-semibold text-lg text-primary">{item.technique}</h4>
                                <blockquote className="border-l-4 pl-4 text-muted-foreground italic">"{item.excerpt}"</blockquote>
                                <p className="text-sm">{item.explanation}</p>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
