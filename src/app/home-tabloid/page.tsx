

import Image from 'next/image';
import Link from 'next/link';
import { tabloidArticles } from '@/lib/data/tabloid-data';
import { Megaphone } from '@/components/icons';

export default function TabloidHome() {
  const featuredArticle = tabloidArticles.find((article) => article.featured) || tabloidArticles[0];
  const otherArticles = tabloidArticles.filter((article) => article.id !== featuredArticle.id).slice(0, 4);

  return (
    <div className="bg-[#EFEFEF] min-h-screen font-tabloid text-black">
      <div className="container mx-auto max-w-5xl p-2 md:p-4">
        {/* Top Headlines */}
        <header className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b-4 border-b-black pb-2">
            <div className='md:border-r-2 md:border-r-black md:pr-2 mb-2 md:mb-0'>
                <Link href={`/articles/${otherArticles[0].slug}`} className="hover:underline">
                    <h2 className="font-headline text-xl md:text-2xl font-bold uppercase tracking-wide">{otherArticles[0].title}</h2>
                </Link>
                <p className='text-right font-bold'>PAGE 3</p>
            </div>
             <div>
                <Link href={`/articles/${otherArticles[1].slug}`} className="hover:underline">
                    <h2 className="font-headline text-xl md:text-2xl font-bold uppercase tracking-wide">{otherArticles[1].title}</h2>
                </Link>
                 <p className='text-right font-bold'>PAGE 8</p>
            </div>
        </header>

        {/* Masthead */}
        <div className="bg-destructive text-destructive-foreground py-2 px-4 my-2 flex flex-col md:flex-row items-center justify-between text-center md:text-left">
            <div className='text-xs order-2 md:order-1'>New York's Favorite Newspaper Since 1932</div>
            <div className="flex items-center gap-2 md:gap-4 -skew-x-12 order-1 md:order-2 mb-2 md:mb-0">
                <h1 className="text-4xl md:text-6xl font-bold">TOWNSQUARE</h1>
                <Megaphone className="h-10 w-10 md:h-16 md:w-16" />
                <h1 className="text-4xl md:text-6xl font-bold">TIMES</h1>
            </div>
            <div className='text-xs order-3 md:order-3'>www.townsquaretimes.com</div>
        </div>
        <div className="text-xs flex justify-between border-b-8 border-b-black pb-2">
            <span>MORNING EDITION / Partly Cloudy Weather: Page 28</span>
            <span>50¢</span>
        </div>

        {/* Main Content */}
        <main className="mt-2 relative">
            <div className="relative h-[60vh] w-full">
                 <Image
                    src={featuredArticle.image}
                    alt={`Cover image for ${featuredArticle.title}`}
                    fill
                    className="z-0 object-cover"
                    priority
                    data-ai-hint="portrait man"
                />
                <div className="absolute inset-0 bg-black/20" />
            </div>

            <div className='absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4'>
                <h2 className="font-headline text-7xl md:text-9xl font-extrabold uppercase text-shadow-heavy tracking-tighter">Enough!</h2>
                <h3 className="font-headline text-4xl md:text-6xl font-bold max-w-lg leading-tight text-shadow-md mt-4">
                    {featuredArticle.excerpt}
                </h3>
            </div>
             <div className="absolute -bottom-4 -right-4 bg-destructive text-destructive-foreground p-2 -rotate-12 transform">
                <span className="text-xl md:text-2xl font-bold uppercase">Special Edition</span>
            </div>
        </main>

        {/* Bottom Footer */}
        <footer className="mt-4 bg-destructive text-destructive-foreground text-center p-2">
            <p className="font-bold text-base md:text-lg uppercase">
                Inside: Exclusive Townsquare Pics Capture {featuredArticle.author}'s Story
            </p>
        </footer>

      </div>
    </div>
  );
}
