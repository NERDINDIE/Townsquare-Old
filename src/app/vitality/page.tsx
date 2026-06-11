
'use client';

import { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { articles } from '@/lib/data';
import { brands } from '@/lib/brands';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from '@/components/icons';
import { Separator } from '@/components/ui/separator';
import { ArticleSummary } from '@/components/ArticleSummary';

function VitalityGrid() {
    const router = useRouter();
    const brand = brands.find(b => b.slug === 'vitality');
    // Placeholder filter, adjust as needed
    const filteredArticles = articles.filter(article => ['Community', 'Food & Culture'].includes(article.category));

    if (!brand) return null;

    return (
        <div>
            <header 
                className="relative text-white py-8 px-4 md:px-8 h-48 flex flex-col justify-end"
            >
                <div className="absolute inset-0 z-0">
                    <Image 
                        src={brand.image} 
                        alt={`${brand.name} cover`}
                        fill
                        className="object-cover"
                        data-ai-hint={brand.dataAiHint}
                    />
                    <div 
                        className="absolute inset-0"
                        style={{
                            background: `linear-gradient(to top, oklab(20% 0 0), oklab(20% 0 0 / 0.9) 20%, oklab(20% 0 0 / 0.5) 50%, transparent)`
                        }}
                    ></div>
                </div>
                 <div className="absolute top-4 left-4 z-10">
                    <Button onClick={() => router.back()} variant="ghost" size="icon" className="bg-black/20 hover:bg-black/40 text-white hover:text-white">
                        <ArrowLeft />
                    </Button>
                </div>

                <div className="relative z-10 container mx-auto">
                    <h1 className="font-headline text-4xl md:text-5xl font-bold uppercase">{brand.name}</h1>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8 md:py-12">
                <div className="space-y-8">
                    {filteredArticles.map((article, index) => (
                        <div key={article.id}>
                            <ArticleSummary article={article} />
                            {index < filteredArticles.length - 1 && <Separator className="mt-8" />}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function VitalityPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <VitalityGrid />
        </Suspense>
    );
}
