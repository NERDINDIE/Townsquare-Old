
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Calendar, Loader2, Sparkles, Check, Briefcase, User, Coffee, GraduationCap } from '@/components/icons';
import { planDay, type DayPlannerOutput } from '@/ai/flows/day-planner-flow';
import { toast } from '@/hooks/use-toast';
import Link from 'next/link';

export default function DayPlannerPage() {
    const [mainGoals, setMainGoals] = useState('');
    const [fixedAppointments, setFixedAppointments] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<DayPlannerOutput | null>(null);

    const handlePlanDay = async () => {
        if (!mainGoals.trim()) {
            toast({
                variant: 'destructive',
                title: 'No Goals Entered',
                description: 'Please enter at least one goal for your day.',
            });
            return;
        }

        setIsLoading(true);
        setResult(null);

        try {
            const plannerResult = await planDay({ mainGoals, fixedAppointments });
            setResult(plannerResult);
        } catch (error) {
            console.error('Failed to plan day:', error);
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Could not generate your schedule. Please try again.',
            });
        } finally {
            setIsLoading(false);
        }
    };
    
    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'Work': return <Briefcase className="h-5 w-5 text-blue-500" />;
            case 'Personal': return <User className="h-5 w-5 text-green-500" />;
            case 'Break': return <Coffee className="h-5 w-5 text-yellow-500" />;
            case 'Appointment': return <Calendar className="h-5 w-5 text-red-500" />;
            case 'Learning': return <GraduationCap className="h-5 w-5 text-purple-500" />;
            default: return <Check className="h-5 w-5 text-gray-500" />;
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
                    <Calendar />
                    AI Day Planner
                </h1>
                <p className="text-muted-foreground mt-1">
                    Organize your day with the help of AI.
                </p>
            </header>

            <Card>
                <CardHeader>
                    <CardTitle>Plan Your Day</CardTitle>
                    <CardDescription>Tell the AI your goals and appointments, and it will generate a schedule for you.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="goals" className="font-medium">What are your main goals for today?</label>
                        <Textarea
                            id="goals"
                            placeholder="e.g., Finish the project proposal, go for a run, and prepare dinner."
                            value={mainGoals}
                            onChange={(e) => setMainGoals(e.target.value)}
                            disabled={isLoading}
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="appointments" className="font-medium">Any fixed appointments?</label>
                        <Input
                            id="appointments"
                            placeholder="e.g., Team meeting at 11am, Dentist at 2:30pm"
                            value={fixedAppointments}
                            onChange={(e) => setFixedAppointments(e.target.value)}
                            disabled={isLoading}
                        />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button onClick={handlePlanDay} disabled={isLoading}>
                        {isLoading ? (
                            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Planning...</>
                        ) : (
                            <><Sparkles className="mr-2 h-4 w-4" /> Plan My Day</>
                        )}
                    </Button>
                </CardFooter>
            </Card>

            {isLoading && (
                 <Card className="mt-8">
                    <CardContent className="p-8 text-center text-muted-foreground">
                        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
                        <p>Your AI assistant is building your schedule...</p>
                    </CardContent>
                </Card>
            )}

            {result && (
                <Card className="mt-8">
                    <CardHeader>
                        <CardTitle>Your Daily Schedule</CardTitle>
                        <CardDescription className="italic pt-2">"{result.motivationalQuote}"</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3">
                            {result.schedule.map((item, index) => (
                                <li key={index} className="flex items-start gap-4 p-3 rounded-lg bg-muted/50">
                                    <div className="flex-shrink-0 pt-1">{getCategoryIcon(item.category)}</div>
                                    <div>
                                        <p className="font-bold">{item.task}</p>
                                        <p className="text-sm text-muted-foreground">{item.time}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
