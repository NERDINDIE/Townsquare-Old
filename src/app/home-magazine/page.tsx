

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { articles } from '@/lib/data';
import { ArrowRight, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function MagazineHome() {
  const [currentDate, setCurrentDate] = useState<string | null>(null);

  useEffect(() => {
    setCurrentDate(new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }));
  }, []);

  const featuredArticle = articles.find((article) => article.featured) || articles[0];
  const otherArticles = articles.filter((article) => article.id !== featuredArticle.id).slice(0, 3);

  return (
    <div className="h-screen min-h-[700px] text-primary-foreground">
      <section className="relative h-full w-full">
        <Image
          src={featuredArticle.image}
          alt={`Cover image for ${featuredArticle.title}`}
          fill
          className="z-0 object-cover"
          priority
          data-ai-hint="portrait man"
        />
        <div className="absolute inset-0 bg-black/60" />

        <div className="container mx-auto relative z-10 flex h-full flex-col px-4 py-8">
          {/* Header */}
          <header className="flex w-full items-center justify-between">
              <div className="text-left">
                  <h1 className="font-headline text-4xl md:text-5xl font-bold uppercase tracking-widest">
                      Townsquare
                  </h1>
                  <p className="text-sm uppercase tracking-wider text-primary-foreground/80">
                      No. 451 | {currentDate || <span className="h-4 w-24 bg-gray-500/50 animate-pulse inline-block" />}
                  </p>
              </div>
          </header>

          {/* Main Content */}
          <div className="grid flex-1 grid-cols-1 md:grid-cols-12 items-end gap-8 pb-8 md:pb-16">
            {/* Left Column Headlines */}
            <div className="md:col-span-4 flex flex-col justify-end gap-8 md:gap-10">
              <Link href={`/articles/${otherArticles[0].slug}`} className='group'>
                  <p className="font-semibold uppercase tracking-widest text-primary-foreground/70">{otherArticles[0].category}</p>
                  <h2 className="mt-1 font-headline text-2xl md:text-3xl font-bold group-hover:underline">{otherArticles[0].title}</h2>
                  <p className="mt-2 text-primary-foreground/80 hidden md:block">{otherArticles[0].excerpt}</p>
              </Link>
              <Link href={`/articles/${otherArticles[1].slug}`} className='group hidden md:block'>
                  <h2 className="font-headline text-3xl font-bold group-hover:underline">{otherArticles[1].title}</h2>
                  <p className="mt-2 text-primary-foreground/80">{otherArticles[1].excerpt}</p>
              </Link>
            </div>
            
            {/* Spacer */}
            <div className="hidden md:block md:col-span-5" />

            {/* Right Column Headlines */}
            <div className="md:col-span-3 flex flex-col justify-end gap-10 text-left md:text-right">
                 <Link href={`/articles/${otherArticles[2].slug}`} className='group'>
                    <div className='flex justify-start md:justify-end'>
                        <div className="grid h-10 w-10 md:h-12 md:w-12 place-items-center border-2">
                            <Plus className="h-6 w-6 md:h-8 md-w-8" />
                        </div>
                    </div>
                  <h2 className="mt-4 font-headline text-2xl md:text-3xl font-bold group-hover:underline">{otherArticles[2].title}</h2>
                  <p className="mt-2 text-primary-foreground/80 hidden md:block">{otherArticles[2].excerpt}</p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
