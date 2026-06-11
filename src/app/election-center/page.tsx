
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, BarChart3, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { electionResults } from '@/lib/data/gov-data';

export default function ElectionCenterPage() {
    const router = useRouter();
    const totalVotes = electionResults.candidates.reduce((acc, candidate) => acc + candidate.votes, 0);

    return (
        <div className="container mx-auto max-w-4xl px-4 py-8 md:py-12">
            <header className="mb-8">
                <Button onClick={() => router.back()} variant="ghost" className="mb-4 -ml-4">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Government OS
                </Button>
                <h1 className="font-headline text-4xl font-bold flex items-center gap-3">
                    <BarChart3 className="h-10 w-10" />
                    Election Center
                </h1>
                <p className="text-muted-foreground mt-1">
                    Live results for the Mayoral Election.
                </p>
            </header>
            
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Overall Results</CardTitle>
                    <CardDescription>
                        {electionResults.precinctsReporting}% of precincts reporting
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Progress value={electionResults.precinctsReporting} className="h-4" />
                </CardContent>
            </Card>
            
            <div className="space-y-6">
                {electionResults.candidates.map((candidate, index) => {
                     const percentage = totalVotes > 0 ? (candidate.votes / totalVotes) * 100 : 0;
                     const isWinner = index === 0 && electionResults.precinctsReporting === 100;
                    return (
                        <Card key={candidate.id} className={isWinner ? 'border-green-500 border-2' : ''}>
                            <CardHeader className="flex flex-row items-center justify-between">
                                 <div>
                                    <CardTitle className="text-2xl">{candidate.name}</CardTitle>
                                    <CardDescription>{candidate.party}</CardDescription>
                                </div>
                                {isWinner && <div className="flex items-center gap-2 text-green-600 font-semibold"><CheckCircle/> Winner</div>}
                            </CardHeader>
                            <CardContent className="flex items-baseline justify-between">
                                <p className="text-4xl font-bold">{percentage.toFixed(1)}<span className="text-xl text-muted-foreground">%</span></p>
                                <p className="text-lg text-muted-foreground">{candidate.votes.toLocaleString()} votes</p>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>
        </div>
    );
}
