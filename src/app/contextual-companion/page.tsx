
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, BookCopy, Loader2, Sparkles, Wand2 } from '@/components/icons';
import { analyzeContent, type AnalyzeContentOutput } from '@/ai/flows/contextual-companion-flow';
import { toast } from '@/hooks/use-toast';
import Link from 'next/link';
import { Input } from '@/components/ui/input';

export default function ContextualCompanionPage() {
    const [sourceText, setSourceText] = useState('');
    const [question, setQuestion] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [activeTask, setActiveTask] = useState<string | null>(null);
    const [result, setResult] = useState<AnalyzeContentOutput | null>(null);
    const [activeView, setActiveView] = useState<'summary' | 'rephrased' | 'answer'>('summary');


    const handleSummarize = async () => {
        if (!sourceText.trim()) {
            toast({ variant: 'destructive', title: 'Please provide some text to summarize.' });
            return;
        }
        setIsLoading(true);
        setActiveTask('summarize');
        setResult(null);
        try {
            const res = await analyzeContent({ text: sourceText, instruction: 'Summarize the following text in a few concise paragraphs.' });
            setResult(res);
            setActiveView('summary');
        } catch (e) {
            console.error(e);
            toast({ variant: 'destructive', title: 'Error summarizing text.' });
        } finally {
            setIsLoading(false);
            setActiveTask(null);
        }
    };

     const handleRephrase = async () => {
        if (!sourceText.trim()) {
            toast({ variant: 'destructive', title: 'Please provide some text to rephrase.' });
            return;
        }
        setIsLoading(true);
        setActiveTask('rephrase');
        setResult(null);
        try {
            const res = await analyzeContent({ text: sourceText, instruction: 'Rephrase the following text in a more casual, friendly, and approachable blog-post style.' });
            setResult(res);
            setActiveView('rephrased');
        } catch (e) {
            console.error(e);
            toast({ variant: 'destructive', title: 'Error rephrasing text.' });
        } finally {
            setIsLoading(false);
            setActiveTask(null);
        }
    };
    
    const handleQuestion = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!sourceText.trim() || !question.trim()) {
            toast({ variant: 'destructive', title: 'Please provide text and a question.' });
            return;
        }
        setIsLoading(true);
        setActiveTask('ask');
        setResult(null);
        try {
            const res = await analyzeContent({ text: sourceText, instruction: `Based on the provided text, answer the following question: "${question}"` });
            setResult(res);
            setActiveView('answer');
        } catch (e) {
            console.error(e);
            toast({ variant: 'destructive', title: 'Error answering question.' });
        } finally {
            setIsLoading(false);
            setActiveTask(null);
        }
    }


    return (
        <div className="container mx-auto max-w-4xl px-4 py-8 md:py-12">
            <header className="mb-8">
                <Button asChild variant="ghost" className="mb-4 -ml-4">
                    <Link href="/">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Home
                    </Link>
                </Button>
                <h1 className="font-headline text-4xl font-bold flex items-center gap-3">
                    <BookCopy />
                    Contextual Companion
                </h1>
                <p className="text-muted-foreground mt-1">
                    Summarize, rephrase, and ask questions about any text using AI.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Source Text</CardTitle>
                            <CardDescription>Paste the article or text you want to analyze.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Textarea
                                placeholder="Paste your text here..."
                                className="resize-y min-h-80"
                                value={sourceText}
                                onChange={(e) => setSourceText(e.target.value)}
                            />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                             <Button onClick={handleSummarize} disabled={isLoading} className="w-full">
                                {activeTask === 'summarize' && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                <Sparkles className="mr-2 h-4 w-4" />
                                Summarize Text
                            </Button>
                            <Button onClick={handleRephrase} disabled={isLoading} variant="secondary" className="w-full">
                                {activeTask === 'rephrase' && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                <Wand2 className="mr-2 h-4 w-4" />
                                Rephrase as Blog Post
                            </Button>
                            
                            <form onSubmit={handleQuestion} className="space-y-2 pt-4 border-t">
                                <Input 
                                    placeholder="Ask a question about the text..."
                                    value={question}
                                    onChange={(e) => setQuestion(e.target.value)}
                                    disabled={isLoading}
                                />
                                <Button type="submit" disabled={isLoading} variant="secondary" className="w-full">
                                     {activeTask === 'ask' && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Ask Question
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
                
                <div>
                     <Card className="sticky top-24">
                        <CardHeader>
                            <CardTitle>Result</CardTitle>
                             <CardDescription>
                                {activeView === 'summary' && 'A concise summary of the text.'}
                                {activeView === 'rephrased' && 'The text rephrased in a different style.'}
                                {activeView === 'answer' && `Answer to: "${question}"`}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="min-h-80 max-h-[60vh] overflow-y-auto">
                            {isLoading ? (
                                <div className="flex items-center justify-center h-full text-muted-foreground">
                                    <Loader2 className="h-8 w-8 animate-spin" />
                                </div>
                            ) : result ? (
                                <div className="prose dark:prose-invert max-w-none">
                                    {result.analysis.split('\n').map((paragraph, index) => (
                                        <p key={index}>{paragraph}</p>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex items-center justify-center h-full text-muted-foreground text-center">
                                    <p>Your results will appear here.</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
