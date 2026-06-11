'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Loader2, Sparkles, Languages, BookOpen } from '@/components/icons';
import { toast } from '@/hooks/use-toast';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getDefinition, type DictionaryOutput } from '@/ai/flows/dictionary-flow';
import { translateArticle, type TranslateArticleOutput } from '@/ai/flows/translation-flow';

function DictionaryTool() {
    const [word, setWord] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<DictionaryOutput | null>(null);

    const handleDefine = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!word.trim()) {
            toast({ variant: 'destructive', title: 'Please enter a word to define.' });
            return;
        }
        setIsLoading(true);
        setResult(null);
        try {
            const res = await getDefinition({ word });
            setResult(res);
        } catch (e) {
            toast({ variant: 'destructive', title: 'Error defining word.' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card>
            <form onSubmit={handleDefine}>
                <CardHeader>
                    <CardTitle>Dictionary</CardTitle>
                    <CardDescription>Enter a word to get its definition.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Input
                        placeholder="e.g., Serendipity"
                        value={word}
                        onChange={(e) => setWord(e.target.value)}
                        disabled={isLoading}
                    />
                </CardContent>
                <CardFooter>
                    <Button type="submit" disabled={isLoading}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Define
                    </Button>
                </CardFooter>
            </form>
            {result && (
                <CardContent>
                    <div className="space-y-4 rounded-lg border bg-muted/50 p-4">
                        <div>
                            <h3 className="text-2xl font-bold">{result.word}</h3>
                            <p className="text-sm italic text-muted-foreground">{result.partOfSpeech}</p>
                        </div>
                        <p>{result.definition}</p>
                        <blockquote className="border-l-4 pl-4 text-sm text-muted-foreground">
                            "{result.example}"
                        </blockquote>
                    </div>
                </CardContent>
            )}
        </Card>
    );
}

function TranslatorTool() {
    const [text, setText] = useState('');
    const [targetLanguage, setTargetLanguage] = useState('Spanish');
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<TranslateArticleOutput | null>(null);

    const handleTranslate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!text.trim()) {
            toast({ variant: 'destructive', title: 'Please enter text to translate.' });
            return;
        }
        setIsLoading(true);
        setResult(null);
        try {
            const res = await translateArticle({ text, targetLanguage });
            setResult(res);
        } catch (e) {
            toast({ variant: 'destructive', title: 'Error translating text.' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card>
             <form onSubmit={handleTranslate}>
                <CardHeader>
                    <CardTitle>Translator</CardTitle>
                    <CardDescription>Translate text into a different language.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Textarea
                        placeholder="Enter text to translate..."
                        className="resize-y min-h-40"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        disabled={isLoading}
                    />
                    <Select onValueChange={setTargetLanguage} defaultValue={targetLanguage} disabled={isLoading}>
                        <SelectTrigger className="w-[280px]">
                            <SelectValue placeholder="Select Language" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Spanish">Spanish</SelectItem>
                            <SelectItem value="French">French</SelectItem>
                            <SelectItem value="German">German</SelectItem>
                            <SelectItem value="Japanese">Japanese</SelectItem>
                            <SelectItem value="Mandarin Chinese">Mandarin Chinese</SelectItem>
                        </SelectContent>
                    </Select>
                </CardContent>
                 <CardFooter>
                    <Button type="submit" disabled={isLoading}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Translate
                    </Button>
                </CardFooter>
            </form>
             {result && (
                <CardContent>
                    <div className="space-y-2 rounded-lg border bg-muted/50 p-4">
                        <h3 className="font-semibold text-lg">Translation to {targetLanguage}:</h3>
                        <p className="text-muted-foreground">{result.translation}</p>
                    </div>
                </CardContent>
            )}
        </Card>
    );
}

export default function DictionaryPage() {
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
                    Dictionary & Translator
                </h1>
                <p className="text-muted-foreground mt-1">
                    Define words and translate text with AI.
                </p>
            </header>

            <Tabs defaultValue="dictionary" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="dictionary"><BookOpen className="mr-2 h-4 w-4"/>Dictionary</TabsTrigger>
                    <TabsTrigger value="translator"><Languages className="mr-2 h-4 w-4"/>Translator</TabsTrigger>
                </TabsList>
                <TabsContent value="dictionary" className="mt-6">
                    <DictionaryTool />
                </TabsContent>
                <TabsContent value="translator" className="mt-6">
                    <TranslatorTool />
                </TabsContent>
            </Tabs>
        </div>
    );
}
