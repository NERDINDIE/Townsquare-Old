
'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Book as BookIcon, Search, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { BookCard } from "@/components/BookCard";

const featuredBook = {
    title: 'The Midnight Library',
    author: 'Matt Haig',
    image: 'https://placehold.co/600x900.png',
    dataAiHint: 'fantasy book cover',
    rating: 4.5,
    reviews: 1250,
    description: 'Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived. To see how things would be if you had made other choices... Would you have done anything different, if you had the chance to undo your regrets?'
};

const newBooks = [
    { title: 'Project Hail Mary', author: 'Andy Weir', image: 'https://placehold.co/400x600.png', dataAiHint: 'sci-fi book cover' },
    { title: 'Klara and the Sun', author: 'Kazuo Ishiguro', image: 'https://placehold.co/400x600.png', dataAiHint: 'dystopian book cover' },
    { title: 'The Four Winds', author: 'Kristin Hannah', image: 'https://placehold.co/400x600.png', dataAiHint: 'historical fiction cover' },
    { title: 'Crying in H Mart', author: 'Michelle Zauner', image: 'https://placehold.co/400x600.png', dataAiHint: 'memoir book cover' },
    { title: 'The Push', author: 'Ashley Audrain', image: 'https://placehold.co/400x600.png', dataAiHint: 'thriller book cover' },
];


export default function BookwormPage() {
    return (
        <div 
            className="container mx-auto max-w-6xl px-4 py-8 md:py-12"
            style={{ '--brand-color': 'hsl(var(--brand-bookworm))' } as React.CSSProperties}
        >
            <header className="mb-8">
                <h1 className="font-headline text-5xl font-bold flex items-center gap-3" style={{ color: 'var(--brand-color)'}}>
                    <BookIcon className="h-12 w-12" />
                    Bookworm
                </h1>
                <p className="mt-2 text-lg text-muted-foreground">
                    Your portal to literary adventures.
                </p>
                <div className="relative mt-6 max-w-lg">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <input
                        type="search"
                        placeholder="Search for books, authors, or genres..."
                        className="w-full h-12 pl-12 pr-4 rounded-full border bg-muted focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>
            </header>
            
            {/* Featured Book */}
            <section className="mb-12">
                <Card className="overflow-hidden border-2" style={{ borderColor: 'var(--brand-color)'}}>
                    <div className="grid grid-cols-1 md:grid-cols-3">
                         <div className="relative aspect-[2/3] md:aspect-auto">
                             <Image src={featuredBook.image} alt={featuredBook.title} fill className="object-cover" data-ai-hint={featuredBook.dataAiHint} />
                        </div>
                        <div className="md:col-span-2 flex flex-col justify-center p-6 md:p-8">
                            <CardHeader className="p-0">
                                <CardDescription>Featured Book</CardDescription>
                                <CardTitle className="text-4xl font-bold font-headline">{featuredBook.title}</CardTitle>
                                <p className="text-xl text-muted-foreground pt-1">by {featuredBook.author}</p>
                            </CardHeader>
                            <CardContent className="p-0 mt-4">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="flex items-center gap-0.5 text-yellow-500">
                                        <Star className="h-5 w-5 fill-current" />
                                        <Star className="h-5 w-5 fill-current" />
                                        <Star className="h-5 w-5 fill-current" />
                                        <Star className="h-5 w-5 fill-current" />
                                        <Star className="h-5 w-5 fill-muted-foreground" />
                                    </div>
                                    <p className="text-sm text-muted-foreground">{featuredBook.rating} ({featuredBook.reviews} reviews)</p>
                                </div>
                                <CardDescription>{featuredBook.description}</CardDescription>
                            </CardContent>
                            <CardFooter className="p-0 mt-6 flex-wrap gap-4">
                                <Button size="lg" style={{ backgroundColor: 'var(--brand-color)'}}>Read Now</Button>
                                <Button size="lg" variant="outline">Add to Library</Button>
                            </CardFooter>
                        </div>
                    </div>
                </Card>
            </section>
            
            {/* New & Noteworthy */}
            <section className="mb-12">
                <h2 className="font-headline text-3xl font-bold mb-6">New & Noteworthy</h2>
                 <Carousel
                    opts={{
                        align: 'start',
                        slidesToScroll: 'auto',
                    }}
                    className="w-full"
                >
                    <CarouselContent className="-ml-4">
                        {newBooks.map((book, index) => (
                            <CarouselItem key={index} className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 pl-4">
                                <BookCard book={book} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="-left-4" />
                    <CarouselNext className="-right-4" />
                </Carousel>
            </section>
            
            {/* Bestsellers */}
             <section>
                <h2 className="font-headline text-3xl font-bold mb-6">Bestsellers</h2>
                 <Carousel
                    opts={{
                        align: 'start',
                         slidesToScroll: 'auto',
                    }}
                    className="w-full"
                >
                    <CarouselContent className="-ml-4">
                        {[...newBooks].reverse().map((book, index) => (
                            <CarouselItem key={index} className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 pl-4">
                               <BookCard book={book} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="-left-4" />
                    <CarouselNext className="-right-4" />
                </Carousel>
            </section>
        </div>
    );
}
