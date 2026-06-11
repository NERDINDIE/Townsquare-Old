
'use client';

import { notFound, useRouter } from 'next/navigation';
import { articles } from '@/lib/data';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function GeekLiveArticlePage({ params }: { params: { slug: string } }) {
    const article = articles.find((a) => a.slug === params.slug);
    const router = useRouter();

    if (!article) {
        notFound();
    }

    return (
        <div className="font-mono bg-white text-black min-h-screen p-8">
            <main className="container mx-auto max-w-2xl border-2 border-black p-8 bg-gray-100">
                <header className="border-b-2 border-black pb-4 mb-4">
                    <h1 className="text-4xl font-bold" style={{fontFamily: "'Courier New', Courier, monospace", color: 'crimson'}}>{article.title}</h1>
                    <p className="text-muted-foreground mt-2">{article.date}</p>
                </header>
                
                <article className="prose prose-lg prose-p:font-mono">
                    {article.content.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
                </article>

                <section className="mt-8 pt-4 border-t-2 border-black">
                    <h3 className="font-bold">Author</h3>
                    <p>{article.author}</p>
                </section>

                <footer className="mt-8">
                     <Button asChild variant="link" className="p-0">
                        <Link href="/geek-live">
                           &larr; Back to Geek Live Homepage
                        </Link>
                    </Button>
                </footer>
            </main>
        </div>
    );
}

// Generate static paths for all articles to be accessible under this route
export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}
