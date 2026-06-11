
'use client';

import { ArticleCard } from "@/components/ArticleCard";
import { Tractor } from "@/components/icons.tsx";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { articles } from "@/lib/data";
import { marketPrices, localEvents } from "@/lib/data/yeast-data";
import { Leaf, Calendar, TrendingUp } from "lucide-react";

const farmArticles = articles.slice(0, 3).map(a => ({ ...a, category: 'Farming Today' }));

export default function YeastPage() {
    return (
        <div
            className="container mx-auto max-w-5xl px-4 py-8 md:py-12"
            style={{ '--brand-color': 'hsl(var(--brand-yeast))' } as React.CSSProperties}
        >
            <header className="mb-8">
                <h1 className="font-headline text-5xl font-bold flex items-center gap-3" style={{ color: 'var(--brand-color)' }}>
                    <Tractor className="h-12 w-12" />
                    Yeast
                </h1>
                <p className="mt-2 text-lg text-muted-foreground">
                    Your source for agricultural news, market data, and rural life.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <main className="md:col-span-2 space-y-8">
                    <h2 className="font-headline text-3xl font-bold">Top Stories</h2>
                    {farmArticles.map(article => (
                        <ArticleCard key={article.id} article={article} variant="horizontal" />
                    ))}
                </main>
                <aside className="space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><TrendingUp className="h-5 w-5" /> Market Prices</CardTitle>
                            <CardDescription>Live commodity prices</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {marketPrices.map(item => (
                                <div key={item.commodity} className="flex justify-between items-baseline">
                                    <p className="font-semibold">{item.commodity}</p>
                                    <div className="text-right">
                                        <p>{item.price}</p>
                                        <p className={`text-sm ${item.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>{item.change}</p>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Calendar className="h-5 w-5" /> Local Events</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {localEvents.map(event => (
                                <div key={event.name}>
                                    <p className="font-semibold">{event.name}</p>
                                    <p className="text-sm text-muted-foreground">{event.date} &bull; {event.location}</p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </aside>
            </div>
        </div>
    );
}
