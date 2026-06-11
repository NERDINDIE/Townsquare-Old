
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { articles } from '@/lib/data';
import { Separator } from '@/components/ui/separator';
import { useEffect, useState } from 'react';

export default function BroadsheetHome() {
  const [currentDate, setCurrentDate] = useState<string | null>(null);

  useEffect(() => {
    setCurrentDate(new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
  }, []);

  const mainArticle = articles[2];
  const topHeadlines = articles.slice(0, 2);
  const sideArticle = articles[3];
  const bottomArticles = articles.slice(4, 6);

  return (
    <div className="bg-white text-black min-h-screen font-broadsheet">
        <div className="container mx-auto max-w-7xl p-4 border-l border-r">
            {/* Masthead */}
            <header className="border-b-4 border-black pb-2 mb-4">
                <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <span>VOL. CLXXIV...No. 60,000</span>
                    {currentDate ? <span>{currentDate}</span> : <span className="h-4 w-48 bg-gray-200 animate-pulse" />}
                    <span>$3.50</span>
                </div>
                <div className="text-center py-4">
                    <h1 className="text-6xl md:text-8xl font-bold font-headline tracking-tighter">The Townsquare Times</h1>
                </div>
                 <div className="border-t border-b border-black py-1">
                     <div className="flex justify-between items-center text-sm font-semibold">
                         <div className="flex divide-x divide-black">
                             <Link href={`/articles/${topHeadlines[0].slug}`} className="px-3 hover:underline">{topHeadlines[0].title}</Link>
                             <Link href={`/articles/${topHeadlines[1].slug}`} className="px-3 hover:underline">{topHeadlines[1].title}</Link>
                         </div>
                         <div className="text-lg font-bold">
                             <p>U.S. STRIKES ANEW; HOUTHIS VOW ATTACK</p>
                         </div>
                     </div>
                 </div>
            </header>

            <main className="grid grid-cols-1 md:grid-cols-5 gap-6">
                {/* Left Columns */}
                <div className="md:col-span-2 space-y-4">
                    <article>
                        <h2 className="text-3xl font-bold font-headline leading-tight">{mainArticle.title}</h2>
                        <p className="text-sm text-muted-foreground font-medium my-1">By {mainArticle.author}</p>
                        <p className="text-base">{mainArticle.content.split('\n\n')[0]}</p>
                    </article>
                    <Separator />
                     <article>
                        <h2 className="text-2xl font-bold font-headline leading-tight">{sideArticle.title}</h2>
                         <p className="text-sm text-muted-foreground font-medium my-1">By {sideArticle.author}</p>
                        <p className="text-base">{sideArticle.content.split('\n\n')[0]}</p>
                    </article>
                </div>
                
                {/* Right columns */}
                <div className="md:col-span-3">
                    <div className="relative w-full h-96 mb-4">
                        <Image
                            src="https://placehold.co/800x600.png"
                            alt="Winter scene"
                            fill
                            className="object-cover"
                            data-ai-hint="snowy landscape"
                        />
                         <p className="absolute bottom-2 left-2 bg-white/80 p-2 text-sm">Winter Arrives in Full Force. After a mild start to the season, a powerful storm blanketed the region in snow, causing widespread disruptions.</p>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        {bottomArticles.map(article => (
                            <article key={article.id}>
                                <h3 className="text-xl font-bold font-headline leading-tight">{article.title}</h3>
                                <p className="text-sm text-muted-foreground font-medium my-1">By {article.author}</p>
                                <p className="text-sm">{article.excerpt}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </main>
             <footer className="border-t-2 border-black mt-4 pt-2">
                <div className="grid grid-cols-6 gap-4 text-xs">
                    {articles.slice(0,6).map(article => (
                        <div key={article.id}>
                             <p className="font-bold uppercase">{article.category}</p>
                            <Link href={`/articles/${article.slug}`} className="hover:underline">{article.title}</Link>
                        </div>
                    ))}
                </div>
             </footer>
        </div>
    </div>
  );
}
