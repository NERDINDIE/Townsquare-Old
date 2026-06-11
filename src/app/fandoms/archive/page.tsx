'use client';

import { cn } from "@/lib/utils";
import { articles } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const SideNav = () => (
    <nav className="fixed top-0 left-0 h-full w-48 bg-white text-black shadow-lg z-10 hidden md:block">
        <div className="p-4 border-b">
             <h1 className="font-bold text-lg text-red-700">The Fandom Times</h1>
        </div>
        <ul className="flex flex-col mt-4">
            <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer text-black">Newsreels</li>
            <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer text-black">The File</li>
            <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer text-black"><Link href="/fandoms/columnists">Columnists</Link></li>
            <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer text-black">The Fandom Radio</li>
            <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer text-black font-bold bg-gray-200">Paper Edition</li>
            <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer text-black">Channels</li>
        </ul>
        <div className="absolute bottom-4 left-4 right-4">
            <Button asChild className="w-full">
                <Link href="/fandoms">Back to Live Feed</Link>
            </Button>
        </div>
    </nav>
);

const NewsTile = ({ article }: { article: typeof articles[0] }) => (
    <div className="news-tile bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-1 border border-gray-200">
        <div className="relative aspect-video">
            <Image src={article.image} alt={article.title} fill className="object-cover w-full h-auto" data-ai-hint="news story" />
        </div>
        <div className="news-tile-content p-4">
            <h2 className="font-bold text-xl mb-2 text-gray-800">{article.title}</h2>
            <p className="text-sm text-gray-600">{article.excerpt}</p>
        </div>
    </div>
);

export default function FandomTimesArchivePage() {
    const fandomArticles = articles.slice(0, 4);

    return (
        <div className="font-mono bg-white">
            <SideNav />
            <main className="ml-0 md:ml-48 min-h-screen">
                <header className="p-4 text-center" style={{ backgroundColor: '#ff0000' }}>
                    <h1 className="text-3xl font-bold text-white tracking-widest">THE FANDOM TIMES (ARCHIVE)</h1>
                </header>
                 <div className="p-5" style={{ backgroundColor: '#D2042D' }}>
                    <div id="news-container" className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         {fandomArticles.map(article => (
                            <NewsTile key={article.id} article={article} />
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
