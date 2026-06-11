
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Bug, Lightbulb, CheckCircle, XCircle } from '@/components/icons';
import { toast } from '@/hooks/use-toast';
import Link from 'next/link';
import { challenges } from '@/lib/data/arcade-data';

export default function DebuggerPage() {
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [userCode, setUserCode] = useState(challenges[currentChallengeIndex].buggyCode);
  const [score, setScore] = useState(0);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const currentChallenge = challenges[currentChallengeIndex];

  const handleCodeChange = (event: React.ChangeEvent<Textarea>) => {
    setUserCode(event.target.value);
    setIsCorrect(null);
  };
  
  const showHint = () => {
    toast({
        title: 'Hint',
        description: currentChallenge.description,
    })
  }

  const runCode = () => {
    // Simple string comparison for validation.
    // A real implementation would use a safer method like a sandboxed execution environment.
    const trimmedUserCode = userCode.replace(/\s+/g, ' ').trim();
    const trimmedSolution = currentChallenge.solution.replace(/\s+/g, ' ').trim();

    if (trimmedUserCode === trimmedSolution) {
      setIsCorrect(true);
      setScore(score + 100);
      toast({
          title: 'Correct!',
          description: 'You fixed the bug! +100 points.',
      });
    } else {
      setIsCorrect(false);
      toast({
          variant: 'destructive',
          title: 'Bug Still Present',
          description: 'The code is not quite right. Keep trying!',
      });
    }
  };
  
  const nextChallenge = () => {
    if(currentChallengeIndex < challenges.length - 1) {
        const nextIndex = currentChallengeIndex + 1;
        setCurrentChallengeIndex(nextIndex);
        setUserCode(challenges[nextIndex].buggyCode);
        setIsCorrect(null);
    } else {
        toast({
            title: 'Congratulations!',
            description: 'You have completed all the challenges!',
        });
    }
  }


  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 md:py-12">
        <header className="mb-8">
            <Button asChild variant="ghost" className="-ml-4">
                <Link href="/arcade-saloon">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Arcade
                </Link>
            </Button>
            <div className="text-center mt-4">
                <h1 className="font-headline text-4xl font-bold flex items-center justify-center gap-3 text-primary">
                    <Bug className="h-10 w-10" />
                    Debugger
                </h1>
                <p className="text-muted-foreground mt-1 text-lg">Find the bug, fix the code, and score points!</p>
                <p className="font-bold text-2xl mt-2">Score: {score}</p>
            </div>
        </header>

        <Card>
            <CardHeader>
                <CardTitle>{currentChallenge.title}</CardTitle>
                <CardDescription>
                    The code below has a bug. Edit the code to fix it and run it to check your solution.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Textarea 
                    value={userCode}
                    onChange={handleCodeChange}
                    rows={15}
                    className="font-mono bg-muted/50"
                />
            </CardContent>
            <CardFooter className="flex flex-wrap gap-4">
                 <Button onClick={runCode}>Run Code</Button>
                 <Button variant="outline" onClick={showHint}>
                    <Lightbulb className="mr-2 h-4 w-4" />
                    Hint
                 </Button>
                 {isCorrect !== null && (
                    isCorrect ? (
                        <div className="flex items-center gap-2 text-green-600 font-semibold">
                            <CheckCircle />
                            <span>Correct!</span>
                            <Button variant="secondary" onClick={nextChallenge}>Next Challenge</Button>
                        </div>
                    ) : (
                         <div className="flex items-center gap-2 text-destructive font-semibold">
                            <XCircle />
                            <span>Incorrect. Try again.</span>
                        </div>
                    )
                 )}
            </CardFooter>
        </Card>
    </div>
  );
}
