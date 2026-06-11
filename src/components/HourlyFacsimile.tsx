
'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { generateFacsimile, type FacsimileOutput } from '@/ai/flows/hourly-facsimile-flow';
import { Skeleton } from './ui/skeleton';

function FacsimileBlockSkeleton() {
    return (
        <Card className="mb-6 border-dashed">
            <CardHeader>
                <CardTitle className="flex justify-between items-baseline">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-5 w-20" />
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-5/6" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-4/6" />
                    <Skeleton className="h-6 w-3/4" />
                </div>
            </CardContent>
        </Card>
    );
}


export function HourlyFacsimile() {
    const [newsBlock, setNewsBlock] = useState<FacsimileOutput | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            setIsLoading(true);
            try {
                const result = await generateFacsimile();
                setNewsBlock(result);
            } catch (error) {
                console.error("Failed to generate facsimile news:", error);
                // Optionally set an error state here
            } finally {
                setIsLoading(false);
            }
        };
        fetchNews();
    }, []);

    if (isLoading) {
        return <FacsimileBlockSkeleton />;
    }

    if (!newsBlock) {
        return <p className="text-muted-foreground text-center">Could not load the latest facsimile edition.</p>;
    }

    return (
        <div className="font-mono">
            <Card className="mb-6 border-dashed">
                <CardHeader>
                    <CardTitle className="flex justify-between items-baseline">
                        <span className="text-sm uppercase text-muted-foreground">{newsBlock.category}</span>
                        <span className="text-sm font-normal text-muted-foreground">{newsBlock.time}</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        {newsBlock.headlines.map((headline, hIndex) => (
                            <p key={hIndex} className="text-lg tracking-wider">{headline}</p>
                        ))}
                    </div>
                </CardContent>
            </Card>
             <p className="text-center text-xs text-muted-foreground">Previous editions are not archived.</p>
        </div>
    );
}
