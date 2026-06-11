
'use client';

import { Button } from '@/components/ui/button';
import { ArrowLeft, Rss } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PhotoCard } from '@/components/PhotoCard';

const liveblogs = {
    'mars-invasion-live': {
        title: 'Strange cylinders fall from Mars in Surrey – live',
        image: 'https://placehold.co/1200x600/1a2b3c/4a5b6c.png',
        dataAiHint: 'night sky stars',
        updates: [
            { type: 'entry', time: '9:48pm', text: 'A large, cylindrical object, estimated to be thirty yards across, has crashed on Horsell Common near Woking. The object fell from the sky with a "rushing sound", burying itself in a large pit. Eyewitnesses report it came from the direction of Mars, which is currently bright in the night sky.' },
            { type: 'entry', time: '10:15pm', text: 'A crowd is gathering around the impact crater. The cylinder appears to be made of a strange, yellowish-white metal. A "hissing sound" is reportedly coming from within, and the top of the object is beginning to unscrew from the inside.' },
            { type: 'photo', time: '10:32pm', image: 'https://placehold.co/800x500.png', dataAiHint: '19th-century crowd gathers', caption: 'A crowd of onlookers on Horsell Common, kept at a distance by the heat emanating from the cylinder.' },
            { type: 'summary', title: 'What we know so far', points: [
                'A large, metallic cylinder has crashed on Horsell Common, near Woking.',
                'The object appears to have been fired from the planet Mars.',
                'A crowd has gathered, but is kept back by intense heat.',
                'The object is showing signs of activity, with the top beginning to open.'
            ]},
            { type: 'entry', time: '11:05pm', text: 'The top of the cylinder has completely unscrewed and fallen to the ground with a clang. A large, greyish, rounded bulk, the size of a bear, is rising slowly and painfully out of the cylinder. It is a horrifying sight. The creature has large, dark-coloured eyes, and a V-shaped mouth which drips saliva.' },
             { type: 'entry', time: '11:12pm', text: 'A small deputation of men, including the astronomer Ogilvy, are approaching the pit with a white flag. They are attempting to communicate with the creature.' },
             { type: 'photo', time: '11:20pm', image: 'https://placehold.co/800x500/000000/333333.png', dataAiHint: 'heat ray destruction night', caption: 'A flash of light and a puff of greenish smoke erupts from the pit. The deputation is engulfed in an invisible, intense heat. It is a massacre.' },
             { type: 'entry', time: '11:21pm', text: 'It\'s a Heat-Ray! A wave of incandescent heat! It sweeps towards the crowd. Panic and chaos. The woods are on fire. I am fleeing for my life. This is not a communication attempt, it is an invasion!' },
        ]
    },
};

export default function LiveBlogPage({ params }: { params: { slug: string } }) {
    const liveblog = liveblogs['mars-invasion-live'];

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
