
'use client';

import { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { articles } from '@/lib/data';
import { brands } from '@/lib/brands';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from '@/components/icons';
import { Separator } from '@/components/ui/separator';
import { ArticleSummary } from '@/components/ArticleSummary';

function ArticlesGrid() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const categorySlug = searchParams.get('category');

    const filteredArticles = categorySlug 
        ? articles.filter(article => article.category.toLowerCase().replace(/\s/g, '-') === categorySlug)
        : articles;

    const brand = brands.find(b => b.slug === categorySlug);
    
    const headerContent = brand 
        ? { 
            title: brand.name, 
            image: brand.image,
          } 
        : { 
            title: "All Articles", 
            image: 'https://placehold.co/1200x400.png',
          };

    if (filteredArticles.length === 0) {
        return (
             <div className="text-center py-16">
                <p className="text-muted-foreground">No articles found in this category.</p>
                <Button onClick={() => router.back()} variant="link">Go Back</Button>
            </div>
        )
    }

    return (
        <div>
            <header 
                className="relative text-white py-8 px-4 md:px-8 h-48 flex flex-col justify-end"
            >
                <div className="absolute inset-0 z-0">
                    <Image 
                        src={headerContent.image} 
                        alt={`${headerContent.title} cover`}
                        fill
                        className="object-cover"
                        data-ai-hint="abstract pattern"
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
                    <h1 className="font-headline text-4xl md:text-5xl font-bold uppercase">{headerContent.title}</h1>
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

export default function ArticlesPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ArticlesGrid />
        </Suspense>
    );
}
