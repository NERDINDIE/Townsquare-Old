
'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, Gamepad2, Tv, Newspaper, Smile } from "@/components/icons";
import Link from 'next/link';
import { ArticleCard } from '@/components/ArticleCard';
import { articles } from '@/lib/data';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { playgroundContent } from '@/lib/playground-data';
import { BookCard } from '@/components/BookCard';

function GeekLiveV1() {
    const topStory = articles[0];
    const animeArticles = articles.filter(a => a.category === 'Anime').slice(0, 3);
    if (!animeArticles.length) {
        animeArticles.push(articles[1], articles[2], articles[3]);
    }
    const retroArticles = articles.filter(a => a.category === 'Retro').slice(0, 3);
     if (!retroArticles.length) {
        retroArticles.push(articles[4], articles[0], articles[1]);
    }

    const funnies = playgroundContent.comics.slice(0, 2);
    const books = [
        { title: 'The Midnight Library', author: 'Matt Haig', image: 'https://placehold.co/400x600.png', dataAiHint: 'fantasy book cover' },
        { title: 'Project Hail Mary', author: 'Andy Weir', image: 'https://placehold.co/400x600.png', dataAiHint: 'sci-fi book cover' },
    ]

  return (
    <div className="bg-muted/30">
      <header className="bg-background shadow-md sticky top-0 z-20">
        <div className="container mx-auto px-4 py-4">
            <h1 className="text-3xl font-bold tracking-tighter" style={{fontFamily: "'Courier New', Courier, monospace", color: 'crimson'}}>Geek Live</h1>
            <p className="text-sm text-muted-foreground">Your portal for all things geek culture.</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 border-b-2 border-primary pb-2">Top Story</h2>
            <ArticleCard article={topStory} variant="horizontal" href={`/geek-live/article/${topStory.slug}`} />
        </section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-12">
                 <section>
                    <h2 className="text-2xl font-bold mb-4 border-b-2 border-brand-anime-shinbun pb-2 flex items-center gap-2"><Tv /> Latest from Anime Shinbun</h2>
                    <div className="space-y-4">
                        {animeArticles.map(article => <ArticleCard key={article.id} article={{...article, category: 'Anime'}} small href={`/geek-live/article/${article.slug}`} />)}
                    </div>
                </section>
                 <section>
                    <h2 className="text-2xl font-bold mb-4 border-b-2 border-brand-retro pb-2 flex items-center gap-2"><Gamepad2 /> Retro Rewind</h2>
                    <div className="space-y-4">
                        {retroArticles.map(article => <ArticleCard key={article.id} article={{...article, category: 'Retro'}} small href={`/geek-live/article/${article.slug}`} />)}
                    </div>
                </section>
            </div>
            <div className="space-y-12">
                 <section>
                    <h2 className="text-2xl font-bold mb-4 border-b-2 border-brand-funnies pb-2 flex items-center gap-2"><Smile /> Funnies</h2>
                    <div className="space-y-4">
                        {funnies.map(comic => (
                             <Card key={comic.title}>
                                <CardContent className="p-2">
                                     <Image 
                                        src={comic.image} 
                                        alt={comic.title} 
                                        width={600} 
                                        height={200} 
                                        className="w-full rounded-md"
                                        data-ai-hint="comic strip"
                                    />
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>
                 <section>
                    <h2 className="text-2xl font-bold mb-4 border-b-2 border-brand-bookworm pb-2 flex items-center gap-2"><BookOpen /> Bookstore Corner</h2>
                    <div className="grid grid-cols-2 gap-4">
                        {books.map(book => <BookCard key={book.title} book={book} />)}
                    </div>
                </section>
                 <section>
                    <h2 className="text-2xl font-bold mb-4 border-b-2 border-brand-arcade-saloon pb-2 flex items-center gap-2"><Gamepad2 /> 1-UP Gaming</h2>
                    <Link href="/arcade-saloon">
                        <Card className="aspect-video flex items-center justify-center text-center p-4 transition-all hover:shadow-lg hover:-translate-y-1 hover:border-primary">
                            <div>
                                <div className="text-6xl mb-2">🕹️</div>
                                <p className="font-bold text-xl">Visit the Arcade Saloon</p>
                            </div>
                        </Card>
                    </Link>
                </section>
            </div>
        </div>
      </main>
    </div>
  )
}

function GeekLiveAlpha() {
     return (
        <div className="font-mono bg-white text-black min-h-screen">
        <nav className="bg-gray-200 p-4 flex justify-between items-center border-b-2 border-black">
            <div>
                <Button asChild variant="ghost">
                    <Link href="/arcade-saloon">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Arcade Saloon
                    </Link>
                </Button>
            </div>
            <div className="relative">
                <input id="mysearch" name="searchitem" type="search" className="border-2 border-black p-1"/>
            </div>
        </nav>
        
        <header className="text-center my-8">
            <h1 className="text-4xl font-bold" style={{fontFamily: "'Courier New', Courier, monospace", color: 'crimson'}}>Geek Live: Alpha Edition</h1>
            <p className="text-lg mt-2">Welcome to the alpha edition of Geek Live.</p>
        </header>

        <main className="container mx-auto max-w-3xl px-4">
            <div className="border-2 border-black p-4 bg-gray-100">
                <h2 className="text-2xl font-bold" style={{fontFamily: "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif"}}>Latest News!</h2>
                <p className="mt-2">That's All Folks!</p>
            </div>
        </main>
        <footer className="text-center mt-12 p-4 border-t-2 border-black">
            <p>Copyright 2023, Geek Live. Every right is reserved. </p>
        </footer>
        </div>
    );
}


export default function GeekLivePage() {
    const [layout, setLayout] = useState('alpha');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedLayout = localStorage.getItem('historical_layout') || 'alpha';
        setLayout(storedLayout);
        setIsLoading(false);

        const handleStorageChange = () => {
            const newLayout = localStorage.getItem('historical_layout') || 'alpha';
            setLayout(newLayout);
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    if(isLoading) {
        return <div className="h-screen w-screen" />;
    }

    if (layout === 'v1') {
        return <GeekLiveV1 />;
    }
    
    return <GeekLiveAlpha />;
}
