
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Wind, Play, Pause, RotateCw, ArrowLeft } from '@/components/icons';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

export default function MindfulnessPage() {
    const [sessionState, setSessionState] = useState<'idle' | 'running' | 'paused'>('idle');
    const [animationText, setAnimationText] = useState('Breathe in...');
    const router = useRouter();
    
    const handleStart = () => {
        setSessionState('running');
    };

    const handlePause = () => {
        setSessionState(prevState => (prevState === 'running' ? 'paused' : 'running'));
    };
    
    const handleEnd = () => {
        setSessionState('idle');
    }

    useEffect(() => {
        let textTimer: NodeJS.Timeout;
        if (sessionState === 'running') {
            const animateText = () => {
                setAnimationText('Breathe in...');
                textTimer = setTimeout(() => {
                    setAnimationText('Breathe out...');
                }, 4000);
            };
            animateText(); // Initial call
            const interval = setInterval(animateText, 8000);
            return () => {
                clearInterval(interval);
                clearTimeout(textTimer);
            }
        }
    }, [sessionState]);

    return (
        <div className="bg-blue-900/10 text-foreground min-h-screen flex flex-col items-center justify-center p-4 transition-colors duration-1000">
            <div className="absolute top-4 left-4">
                <Button onClick={() => router.back()} variant="ghost">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Health Hub
                </Button>
            </div>
            <div className="text-center">
                {sessionState === 'idle' ? (
                    <>
                        <h1 className="text-3xl font-bold mb-4">Take a Break</h1>
                        <p className="text-muted-foreground max-w-sm mb-8">
                            Take a few minutes to relax and breathe. Remember, you can always catch up on updates later.
                        </p>
                        <Button onClick={handleStart} size="lg" className="bg-blue-500 hover:bg-blue-600 text-white">
                            <Play className="mr-2" />
                            Start Mindfulness Session
                        </Button>
                    </>
                ) : (
                    <div className="flex flex-col items-center">
                        <div className="relative w-48 h-48 flex items-center justify-center">
                            <div className={cn(
                                "absolute w-full h-full bg-blue-500/20 rounded-full",
                                sessionState === 'running' ? 'animate-breathe-in-out' : ''
                            )} style={{ animationDuration: '8s' }}></div>
                             <div className={cn(
                                "absolute w-3/4 h-3/4 bg-blue-500/30 rounded-full",
                                 sessionState === 'running' ? 'animate-breathe-in-out' : ''
                            )} style={{ animationDuration: '8s', animationDelay: '0.1s' }}></div>
                            <Wind className="h-16 w-16 text-blue-400" />
                        </div>
                        <p className={cn(
                            "text-2xl font-semibold mt-8 transition-opacity duration-1000"
                        )}>
                            {sessionState === 'running' ? animationText : 'Paused'}
                        </p>
                        
                        <div className="mt-12 flex gap-4">
                             <Button onClick={handlePause} size="lg" variant="secondary">
                                {sessionState === 'running' ? <Pause className="mr-2"/> : <Play className="mr-2"/>}
                                {sessionState === 'running' ? 'Pause' : 'Resume'}
                            </Button>
                            <Button onClick={handleEnd} size="lg" variant="outline">
                                End Session
                            </Button>
                        </div>
                    </div>
                )}
            </div>
             <style jsx>{`
                @keyframes breathe-in-out {
                    0% { transform: scale(0.5); opacity: 0.5; }
                    50% { transform: scale(1); opacity: 1; }
                    100% { transform: scale(0.5); opacity: 0.5; }
                }
                .animate-breathe-in-out {
                    animation-name: breathe-in-out;
                    animation-timing-function: ease-in-out;
                    animation-iteration-count: infinite;
                }
            `}</style>
        </div>
    );
}
