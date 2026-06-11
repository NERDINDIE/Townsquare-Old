
'use client';

import { Button } from '@/components/ui/button';
import { ArrowLeft, Rss } from '@/components/icons';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, usePathname } from 'next/navigation';
import { PhotoCard } from '@/components/PhotoCard';
import MarsInvasionPage from '../mars-invasion-live/page';
import { liveblogs } from '@/lib/data/live-blog-data';

export async function generateStaticParams() {
    return Object.keys(liveblogs).map((slug) => ({
        slug,
    }));
}

export default function LiveBlogPage({ params }: { params: { slug: string } }) {
    const liveblog = liveblogs[params.slug as keyof typeof liveblogs];

    if (params.slug === 'mars-invasion-live') {
        return <MarsInvasionPage params={params} />;
    }

    if (!liveblog) {
        notFound();
    }

    return (
        <div className="bg-background text-foreground">
            <header className="container mx-auto py-4 flex items-center gap-4">
                <Button asChild variant="ghost" size="icon">
                    <Link href="/on-air">
                        <ArrowLeft />
                    </Link>
                </Button>
                <div className="text-destructive font-semibold uppercase text-sm flex items-center gap-2">
                    <Rss className="h-4 w-4" />
                    Live
                </div>
            </header>
            <main className="container mx-auto max-w-4xl pb-16">
                <h1 className="text-4xl md:text-5xl font-bold font-headline leading-tight my-4">
                    {liveblog.title}
                </h1>
                <div className="relative aspect-video w-full my-8">
                    <Image
                        src={liveblog.image}
                        alt={liveblog.title}
                        fill
                        className="object-cover rounded-lg"
                        data-ai-hint={liveblog.dataAiHint}
                        priority
                    />
                </div>
                
                <div className="relative pl-8">
                    {/* Vertical Line */}
                    <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-border"></div>

                    <div className="space-y-8">
                        {liveblog.updates.map((update, index) => (
                            <div key={index} className="relative">
                                <div className="absolute -left-5 top-1.5 h-2.5 w-2.5 rounded-full bg-destructive"></div>
                                <div className="pl-4">
                                    <p className="font-semibold text-destructive">{update.time}</p>
                                    <div className="mt-2 text-lg leading-relaxed space-y-4">
                                        {update.type === 'entry' && <p>{update.text}</p>}
                                        {update.type === 'photo' && update.image && (
                                            <PhotoCard 
                                                src={update.image} 
                                                alt={update.caption || 'Live blog image'} 
                                                caption={update.caption} 
                                                dataAiHint={update.dataAiHint}
                                            />
                                        )}
                                        {update.type === 'summary' && update.points && (
                                            <div className="p-4 border-l-4 border-destructive bg-muted rounded-r-lg">
                                                <h3 className="font-bold text-xl mb-2">{update.title}</h3>
                                                <ul className="list-disc pl-5 space-y-2">
                                                    {update.points.map((point, i) => (
                                                        <li key={i}>{point}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
