
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { articles } from '@/lib/data';
import { ArrowRight, ChevronRight, Grid, Headphones, List, MoreHorizontal, Music, Podcast, Book, Plus, Mic, Bookmark, Library as LibraryIcon, Play, Clock, ListFilter, ArrowUpDown, History, ThumbsUp, MessageCircle, Download, Bot, Sparkles, ChefHat, ImageIcon } from '@/components/icons';
import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { BriefingGenerator } from '@/components/BriefingGenerator';
import { usePlayerState } from '@/hooks/use-player-state.tsx';
import { HourlyFacsimile } from '@/components/HourlyFacsimile';
import { aiCreations } from '@/lib/data/ai-creations-data';
import { Badge } from '@/components/ui/badge';

const musicItems = [
    {
        type: 'Playlist',
        title: 'Lofi Beats',
        creator: 'Townsquare',
        image: 'https://placehold.co/300x300.png',
        dataAiHint: 'lofi music illustration',
    },
    {
        type: 'Album',
        title: 'Cosmic Drift',
        creator: 'Indie Band',
        image: 'https://placehold.co/300x300.png',
        dataAiHint: 'psychedelic album cover',
    },
    {
        type: 'Podcast',
        title: 'News & Politics',
        creator: 'Townsquare Audio',
        image: 'https://placehold.co/300x300.png',
        dataAiHint: 'news podcast logo',
    },
     {
        type: 'Audiobook',
        title: 'Sci-Fi Epic',
        creator: 'Townsquare Publishing',
        image: 'https://placehold.co/300x300.png',
        dataAiHint: 'sci-fi book cover',
    }
]

const favoriteStations = [
    { name: 'National One', image: 'https://placehold.co/100x100.png', dataAiHint: 'radio host portrait' },
    { name: 'City FM', image: 'https://placehold.co/100x100.png', dataAiHint: 'radio host portrait' },
    { name: 'Classical', image: 'https://placehold.co/100x100.png', dataAiHint: 'orchestra conductor' },
    { name: 'The Beat', image: 'https://placehold.co/100x100.png', dataAiHint: 'dj at turntable' },
    { name: 'News Now', image: 'https://placehold.co/100x100.png', dataAiHint: 'news anchor' },
];

const readingLists = [
    {
        name: 'Tech Deep Dives',
        count: 5,
        articles: articles.slice(0, 4)
    },
    {
        name: 'Weekend Reads',
        count: 8,
        articles: articles.slice(1, 5)
    }
];


export default function LibraryPage() {
  const { showPlayer } = usePlayerState();

  const getCreationIcon = (type: string) => {
    switch (type) {
        case 'Poem': return <BookOpen className="h-5 w-5 text-purple-500" />;
        case 'Image': return <ImageIcon className="h-5 w-5 text-blue-500" />;
        case 'Recipe': return <ChefHat className="h-5 w-5 text-orange-500" />;
        default: return <Sparkles className="h-5 w-5 text-yellow-500" />;
    }
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 md:py-12">
      <header className="mb-8 flex items-center justify-between">
        <h1 className="font-headline text-4xl font-bold">Your Library</h1>
        <Button variant="outline">
            <Plus className="mr-2 h-4 w-4" />
            New List
        </Button>
      </header>
      
      <Tabs defaultValue="highlights" className="w-full">
            <TabsList>
                <TabsTrigger value="saved">Saved Lists</TabsTrigger>
                <TabsTrigger value="digest">Digest</TabsTrigger>
                <TabsTrigger value="highlights">Highlights</TabsTrigger>
                <TabsTrigger value="ai-creations">AI Creations</TabsTrigger>
                <TabsTrigger value="hourly">Hourly</TabsTrigger>
                <TabsTrigger value="history">Reading history</TabsTrigger>
                <TabsTrigger value="audio">Audio</TabsTrigger>
            </TabsList>
            <TabsContent value="saved" className="mt-6">
                {/* Reading Lists Section */}
                <section className="my-12">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="font-headline text-2xl font-bold flex items-center gap-2"><Bookmark className="h-6 w-6 text-primary"/> Your Reading Lists</h2>
                    </div>
                    <div className="space-y-6">
                        {readingLists.map((list) => (
                            <Card key={list.name}>
                                <CardHeader className="flex flex-row justify-between items-center">
                                    <div>
                                        <h3 className="text-xl font-bold">{list.name}</h3>
                                        <p className="text-sm text-muted-foreground">{list.count} items</p>
                                    </div>
                                    <Button asChild variant="ghost">
                                        <Link href="#">See All <ChevronRight className="h-4 w-4 ml-2" /></Link>
                                    </Button>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {list.articles.map((article) => (
                                            <Link key={article.id} href={`/articles/${article.slug}`}>
                                                <div className="relative aspect-[3/4] rounded-md overflow-hidden group">
                                                    <Image 
                                                        src={article.image}
                                                        alt={article.title}
                                                        fill
                                                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                                                        data-ai-hint="article photo"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                                    <p className="absolute bottom-2 left-2 right-2 text-white text-xs font-bold leading-tight line-clamp-2">{article.title}</p>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>
                <Separator />
                {/* Recent Issues Section */}
                <section className="mt-8">
                    <div className="flex items-center justify-between mb-4">
                    <h2 className="font-headline text-2xl font-bold">Saved For Later</h2>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon">
                            <List className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                            <Grid className="h-4 w-4 text-muted-foreground" />
                        </Button>
                    </div>
                    </div>

                    <div className="space-y-6">
                        {articles.slice(0,3).map((article) => (
                            <Card key={article.id} className="overflow-hidden">
                                <CardHeader className="p-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-sm bg-muted flex items-center justify-center font-bold text-sm">
                                                T
                                            </div>
                                            <span className="text-sm font-medium">Townsquare</span>
                                            <span className="text-sm text-muted-foreground">&bull; 3 hours ago</span>
                                        </div>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-4 pt-0">
                                    <Link href={`/articles/${article.slug}`}>
                                        <h3 className="font-headline text-2xl font-bold mb-2 hover:underline">{article.title}</h3>
                                    </Link>
                                    <p className="text-muted-foreground text-sm">{article.excerpt}</p>
                                </CardContent>
                                <CardFooter className="bg-muted/50 p-4 flex items-center justify-between text-sm">
                                    <button className="flex items-center gap-2 text-muted-foreground" onClick={() => showPlayer({title: article.title, type: 'Article'})}>
                                        <Headphones className="h-4 w-4" />
                                        <span>Listen</span>
                                    </button>
                                    <Button variant="ghost" size="sm" asChild>
                                        <Link href={`/articles/${article.slug}`}>
                                            Read More <ArrowRight className="h-4 w-4 ml-2" />
                                        </Link>
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </section>
            </TabsContent>
            <TabsContent value="digest" className="mt-6">
                 {/* AI News Briefing */}
                <section className="my-12">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="font-headline text-2xl font-bold flex items-center gap-2"><Mic className="h-6 w-6 text-primary"/> AI News Briefing</h2>
                    </div>
                    <Tabs defaultValue="generate">
                        <TabsList>
                            <TabsTrigger value="generate">Generate New</TabsTrigger>
                            <TabsTrigger value="history">Past Briefings</TabsTrigger>
                        </TabsList>
                        <TabsContent value="generate" className="mt-6">
                            <BriefingGenerator />
                        </TabsContent>
                        <TabsContent value="history" className="mt-6">
                            <Card className="flex items-center justify-center h-48 border-dashed">
                                <p className="text-muted-foreground">You have no past briefings.</p>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </section>
            </TabsContent>
            <TabsContent value="highlights" className="mt-6">
                <Card className="flex flex-col items-center justify-center h-96 border-dashed text-center">
                    <pre className="text-xs sm:text-sm text-muted-foreground whitespace-pre-wrap select-none">
{`
               M         M         M
                         M
          M         M    M         M    M
 M                  M         M    MM  MMM
      M   M         M        M MM   MMM
   M    MM MMM  M   M MMMMMMMMM M  M
 M   MM MM MMMMMMMMMMMM MM  MM
  M   M  M MMM  MM MM   MM
   M   MMMM    M MM  MM MM
    M  M MM   MM    M  MM
      MMMMMM          MM MM
     M M  MM M   MMMMMM MMMMMMM
     M M M MM MM MMMMM MMM MMM
      M M  M  MM MMM M M MM MM

`}
                    </pre>
                    <p className="text-muted-foreground mt-4 max-w-xs">
                        When you find passages that resonate with you, you can highlight them to save them here.
                    </p>
                </Card>
            </TabsContent>
             <TabsContent value="hourly" className="mt-6">
                <HourlyFacsimile />
            </TabsContent>
             <TabsContent value="history" className="mt-6">
                <Card className="flex items-center justify-center h-48 border-dashed">
                    <p className="text-muted-foreground">Your reading history is empty.</p>
                </Card>
            </TabsContent>
            <TabsContent value="ai-creations" className="mt-6">
                 <div className="space-y-4">
                    {aiCreations.map((item) => (
                        <Card key={item.id}>
                            <CardHeader className="flex-row items-center justify-between">
                                <div className="flex items-center gap-2">
                                    {getCreationIcon(item.type)}
                                    <CardTitle className="text-xl">{item.title || `${item.type} Creation`}</CardTitle>
                                </div>
                                <Badge variant="outline">{item.type}</Badge>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <p className="text-sm text-muted-foreground italic">
                                    <span className="font-semibold not-italic">Prompt:</span> "{item.prompt}"
                                </p>
                                {item.type === 'Image' ? (
                                    <div className="relative aspect-video w-full max-w-md mx-auto rounded-lg overflow-hidden">
                                        <Image src={item.content} alt={item.prompt} fill className="object-cover" data-ai-hint={item.dataAiHint} />
                                    </div>
                                ) : (
                                    <blockquote className="border-l-4 pl-4 text-muted-foreground">
                                        {item.content}
                                    </blockquote>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                 </div>
            </TabsContent>
            <TabsContent value="audio" className="mt-6">
                {/* From Your Music Library Section */}
                <section className="my-12">
                    <div className="flex items-center justify-between mb-4">
                    <h2 className="font-headline text-2xl font-bold">From Your Audio Library</h2>
                    </div>
                    
                    <Tabs defaultValue="music" className="w-full">
                        <TabsList>
                            <TabsTrigger value="stations">Favorite Stations</TabsTrigger>
                            <TabsTrigger value="music"><Music className="mr-2" /> Music</TabsTrigger>
                            <TabsTrigger value="podcasts"><Podcast className="mr-2" /> Podcasts</TabsTrigger>
                            <TabsTrigger value="audiobooks"><Book className="mr-2" /> Audiobooks</TabsTrigger>
                        </TabsList>
                        <TabsContent value="stations" className="mt-6">
                            <div className="flex space-x-4 overflow-x-auto pb-4 -mx-4 px-4">
                            {favoriteStations.map((station, index) => (
                                <button key={index} onClick={() => showPlayer({title: station.name, type: 'Radio'})} className="shrink-0">
                                    <div className="flex flex-col items-center gap-2 text-center w-20">
                                        <Avatar className="h-16 w-16">
                                            <AvatarImage src={station.image} alt={station.name} data-ai-hint={station.dataAiHint} />
                                            <AvatarFallback>{station.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <p className="text-xs font-medium truncate w-full">{station.name}</p>
                                    </div>
                                </button>
                            ))}
                            </div>
                        </TabsContent>
                        <TabsContent value="music" className="mt-6">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {musicItems.slice(0,2).map(item => (
                                    <button key={item.title} onClick={() => showPlayer({title: item.title, type: item.type})}>
                                        <Card>
                                            <CardContent className="p-0">
                                                <div className="relative aspect-square">
                                                    <Image src={item.image} alt={item.title} fill className="object-cover rounded-t-lg" data-ai-hint={item.dataAiHint}/>
                                                </div>
                                            </CardContent>
                                            <CardHeader className="p-3">
                                                <p className="font-semibold truncate text-sm">{item.title}</p>
                                                <p className="text-xs text-muted-foreground truncate">{item.creator}</p>
                                            </CardHeader>
                                        </Card>
                                    </button>
                                ))}
                                <Link href="/connections">
                                    <Card className="flex flex-col items-center justify-center border-dashed aspect-square h-full hover:border-primary transition-colors">
                                        <div className="h-16 w-16 rounded-full p-0 flex items-center justify-center border-2">
                                            <Plus className="h-8 w-8 text-muted-foreground" />
                                        </div>
                                        <p className="mt-4 text-sm font-medium">Connect Account</p>
                                    </Card>
                                </Link>
                            </div>
                        </TabsContent>
                        <TabsContent value="podcasts" className="mt-6">
                            <p className="text-muted-foreground text-sm">Podcast content would appear here.</p>
                        </TabsContent>
                        <TabsContent value="audiobooks" className="mt-6">
                            <p className="text-muted-foreground text-sm">Audiobook content would appear here.</p>
                        </TabsContent>
                    </Tabs>
                </section>
            </TabsContent>
        </Tabs>
    </div>
  );
}
