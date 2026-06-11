
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { analyzeText, AnalyzeTextOutput } from '@/ai/flows/fact-checker-flow';
import { Loader2, CheckCircle, XCircle, AlertCircle } from '@/components/icons';
import { toast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type AnalysisType = 'fact-check' | 'bias-analysis' | 'advanced-analysis';

export default function FactCheckerPage() {
    const [text, setText] = useState('');
    const [analysisResult, setAnalysisResult] = useState<AnalyzeTextOutput | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [currentAnalysis, setCurrentAnalysis] = useState<AnalysisType | null>(null);

    const handleSubmit = async (analysisType: AnalysisType) => {
        if (!text.trim()) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Please enter some text to analyze.',
            });
            return;
        }

        setIsLoading(true);
        setAnalysisResult(null);
        setCurrentAnalysis(analysisType);

        try {
            const result = await analyzeText({ text, analysisType });
            setAnalysisResult(result);
        } catch (error) {
            console.error(error);
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Could not analyze the text. Please try again.',
            });
        } finally {
            setIsLoading(false);
        }
    };
    
    const getVerdictIcon = (verdict: string) => {
        switch (verdict) {
            case 'Accurate':
                return <CheckCircle className="h-5 w-5 text-green-500" />;
            case 'Inaccurate':
                return <XCircle className="h-5 w-5 text-red-500" />;
            case 'Misleading':
                return <AlertCircle className="h-5 w-5 text-yellow-500" />;
            default:
                return <AlertCircle className="h-5 w-5 text-gray-500" />;
        }
    }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 md:py-12">
        <header className="mb-8">
            <h1 className="font-headline text-4xl font-bold">Fact & Bias Checker</h1>
            <p className="text-muted-foreground mt-1">
                Promote media literacy by analyzing text for facts and bias.
            </p>
        </header>
        
        <Card>
            <CardHeader>
                <CardTitle>Analyze Text</CardTitle>
                <CardDescription>
                    Paste any text below to check for factual accuracy or potential bias.
                </CardDescription>
            </CardHeader>
            <CardContent>
                 <div className="grid w-full gap-2">
                    <Label htmlFor="text-to-analyze" className="sr-only">Text to analyze</Label>
                    <Textarea 
                        id="text-to-analyze"
                        placeholder="Paste article content, social media posts, or any other text here..." 
                        rows={12}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        disabled={isLoading}
                    />
                </div>
            </CardContent>
            <CardFooter className="flex flex-wrap gap-4">
                <Button onClick={() => handleSubmit('fact-check')} disabled={isLoading}>
                    {isLoading && currentAnalysis === 'fact-check' && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isLoading && currentAnalysis === 'fact-check' ? 'Checking...' : 'Check Facts'}
                </Button>
                <Button onClick={() => handleSubmit('bias-analysis')} disabled={isLoading} variant="secondary">
                     {isLoading && currentAnalysis === 'bias-analysis' && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isLoading && currentAnalysis === 'bias-analysis' ? 'Analyzing...' : 'Analyze for Bias'}
                </Button>
                <Button onClick={() => handleSubmit('advanced-analysis')} disabled={isLoading} variant="secondary">
                     {isLoading && currentAnalysis === 'advanced-analysis' && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isLoading && currentAnalysis === 'advanced-analysis' ? 'Analyzing...' : 'Advanced Analysis'}
                </Button>
            </CardFooter>
        </Card>


        {isLoading && (
             <div className="mt-12">
                 <h2 className="font-headline text-3xl font-bold mb-6">Analysis Results</h2>
                <Card>
                    <CardContent className="p-12 flex flex-col items-center justify-center text-center">
                        <Loader2 className="h-10 w-10 animate-spin text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">The AI is analyzing the text. This may take a moment...</p>
                    </CardContent>
                </Card>
             </div>
        )}

        {analysisResult && !isLoading && (
            <div className="mt-12">
                <h2 className="font-headline text-3xl font-bold mb-6">Analysis Results</h2>
                <Card>
                    <CardHeader>
                        <CardTitle className="capitalize">{currentAnalysis?.replace('-', ' ')}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <p className="text-muted-foreground italic">{analysisResult.summary}</p>
                        <Separator />
                        
                        {analysisResult.claims && analysisResult.claims.length > 0 && (
                            <div className="space-y-4">
                                {analysisResult.claims.map((item, index) => (
                                    <div key={index} className="p-4 rounded-lg border">
                                        <div className="flex items-center gap-2 mb-2">
                                            {getVerdictIcon(item.verdict)}
                                            <h4 className="font-semibold">Claim: "{item.claim}"</h4>
                                        </div>
                                        <Badge variant="outline">{item.verdict}</Badge>
                                        <p className="text-sm text-muted-foreground mt-2">{item.explanation}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {analysisResult.biasExamples && analysisResult.biasExamples.length > 0 && (
                             <div className="space-y-4">
                                {analysisResult.biasExamples.map((item, index) => (
                                    <div key={index} className="p-4 rounded-lg border">
                                        <blockquote className="border-l-4 pl-4 italic">"{item.example}"</blockquote>
                                        <p className="text-sm text-muted-foreground mt-2">{item.explanation}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {analysisResult.forensicAnalysis && (
                             <div className="space-y-2">
                                <h4 className="font-semibold">Forensic Details:</h4>
                                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                                    <li>Satire/Parody: <span className={cn(analysisResult.forensicAnalysis.isSatire ? "font-bold text-destructive" : "font-bold text-green-600")}>{analysisResult.forensicAnalysis.isSatire ? 'Yes' : 'No'}</span></li>
                                    <li>Impersonation Attempt: <span className={cn(analysisResult.forensicAnalysis.isImpersonation ? "font-bold text-destructive" : "font-bold text-green-600")}>{analysisResult.forensicAnalysis.isImpersonation ? 'Yes' : 'No'}</span></li>
                                    <li>Emotional Manipulation: <span className={cn(analysisResult.forensicAnalysis.emotionalManipulationDetected ? "font-bold text-destructive" : "font-bold text-green-600")}>{analysisResult.forensicAnalysis.emotionalManipulationDetected ? 'Yes' : 'No'}</span></li>
                                </ul>
                                <div className="p-4 rounded-lg border bg-muted/50 mt-4">
                                    <h5 className="font-semibold">Authenticity Summary</h5>
                                    <p className="text-sm text-muted-foreground mt-1">{analysisResult.forensicAnalysis.authenticitySummary}</p>
                                </div>
                            </div>
                        )}

                    </CardContent>
                </Card>
            </div>
        )}
    </div>
  );
}
