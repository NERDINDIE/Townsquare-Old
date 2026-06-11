
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const categories = [
    { name: 'Pizza', icon: '🍕' },
    { name: 'Sushi', icon: '🍣' },
    { name: 'Burgers', icon: '🍔' },
    { name: 'Tacos', icon: '🌮' },
    { name: 'Salads', icon: '🥗' },
    { name: 'Dessert', icon: '🍰' },
];

const restaurants = [
    { name: 'The Pizza Palace', rating: 4.5, time: '25-35 min', image: 'https://placehold.co/400x250.png', dataAiHint: 'pizza restaurant' },
    { name: 'Sushi Central', rating: 4.8, time: '30-40 min', image: 'https://placehold.co/400x250.png', dataAiHint: 'sushi platter' },
    { name: 'Burger Barn', rating: 4.2, time: '20-30 min', image: 'https://placehold.co/400x250.png', dataAiHint: 'gourmet burger' },
    { name: 'Taco Fiesta', rating: 4.7, time: '15-25 min', image: 'https://placehold.co/400x250.png', dataAiHint: 'mexican tacos' },
];

export default function TakeoutsPage() {
    const router = useRouter();

    return (
        <div className="container mx-auto max-w-4xl px-4 py-8 md:py-12">
            <header className="mb-8">
                <Button onClick={() => router.back()} variant="ghost" className="mb-4 -ml-4">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                </Button>
                <h1 className="font-headline text-4xl font-bold">Local Restaurants</h1>
                <p className="text-muted-foreground mt-1">
                    Order delivery or takeout from your favorite spots.
                </p>
            </header>

            <div className="relative mb-8">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input placeholder="Search restaurants or dishes" className="h-12 pl-12" />
            </div>

            <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Categories</h2>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                    {categories.map(cat => (
                        <Card key={cat.name} className="flex flex-col items-center justify-center p-4 hover:bg-muted/50 cursor-pointer">
                            <div className="text-4xl">{cat.icon}</div>
                            <p className="mt-2 font-semibold">{cat.name}</p>
                        </Card>
                    ))}
                </div>
            </section>

            <section>
                 <h2 className="text-2xl font-bold mb-4">Popular Near You</h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {restaurants.map(rest => (
                        <Card key={rest.name} className="overflow-hidden group">
                            <CardContent className="p-0">
                                <div className="relative aspect-video">
                                    <Image src={rest.image} alt={rest.name} fill className="object-cover group-hover:scale-105 transition-transform" data-ai-hint={rest.dataAiHint} />
                                </div>
                            </CardContent>
                             <CardHeader>
                                <CardTitle>{rest.name}</CardTitle>
                                <CardDescription className="flex items-center gap-2">
                                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                                    {rest.rating} &bull; {rest.time}
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    ))}
                 </div>
            </section>
        </div>
    );
}
