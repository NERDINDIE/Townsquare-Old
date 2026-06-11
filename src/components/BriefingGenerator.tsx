
'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Loader2, Sparkles } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { generateBriefing, BriefingOutput } from '@/ai/flows/briefing-flow';

const topics = ['Community', 'Food & Culture', 'Urban Design', 'Business', 'Music'];
const voices = ['Algenib', 'Achernar', 'Enif', 'Fomalhaut', 'Sirius'];

export function BriefingGenerator() {
    const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
    const [selectedVoice, setSelectedVoice] = useState(voices[0]);
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<BriefingOutput | null>(null);

    const handleTopicChange = (topic: string) => {
        setSelectedTopics(prev => 
            prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]
        );
    };

    const handleGenerate = async () => {
        if (selectedTopics.length === 0) {
            toast({
                variant: 'destructive',
                title: 'No topics selected',
                description: 'Please choose at least one topic for your briefing.',
            });
            return;
        }

        setIsLoading(true);
        setResult(null);

        try {
            const briefing = await generateBriefing({
                topics: selectedTopics,
                voice: selectedVoice,
            });
            setResult(briefing);
            toast({
                title: 'Briefing Ready!',
                description: 'Your personalized news briefing has been generated.',
            });
        } catch (error) {
            console.error('Failed to generate briefing:', error);
            toast({
                variant: 'destructive',
                title: 'Generation Failed',
                description: 'There was an error creating your briefing. Please try again.',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Generate Your Briefing</CardTitle>
                <CardDescription>
                    Select your preferred topics and voice, and let our AI create a custom audio news briefing just for you.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label className="font-semibold">Choose Your Topics</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {topics.map(topic => (
                            <div key={topic} className="flex items-center space-x-2">
                                <Checkbox
                                    id={`topic-${topic}`}
                                    checked={selectedTopics.includes(topic)}
                                    onCheckedChange={() => handleTopicChange(topic)}
                                    disabled={isLoading}
                                />
                                <Label htmlFor={`topic-${topic}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    {topic}
                                </Label>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="voice-select" className="font-semibold">Choose a Voice</Label>
                    <Select value={selectedVoice} onValueChange={setSelectedVoice} disabled={isLoading}>
                        <SelectTrigger id="voice-select" className="w-full md:w-1/2">
                            <SelectValue placeholder="Select a voice" />
                        </SelectTrigger>
                        <SelectContent>
                            {voices.map(voice => (
                                <SelectItem key={voice} value={voice}>{voice}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <Button onClick={handleGenerate} disabled={isLoading} size="lg">
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Generating...
                        </>
                    ) : (
                        <>
                            <Sparkles className="mr-2 h-5 w-5" />
                            Generate Briefing
                        </>
                    )}
                </Button>

                {result && (
                    <div className="space-y-4 pt-4">
                        <h3 className="font-semibold text-lg">Your Briefing is Ready!</h3>
                        <audio controls className="w-full">
                            <source src={result.audio} type="audio/wav" />
                            Your browser does not support the audio element.
                        </audio>
                        <Card className="bg-muted/50 max-h-48 overflow-y-auto">
                            <CardContent className="p-4">
                                <p className="text-sm whitespace-pre-wrap">{result.script}</p>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
