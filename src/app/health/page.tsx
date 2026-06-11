
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { List, ListItem } from "@/components/ui/list";
import { ArrowLeft, Download, Heart, Dumbbell, CalendarHeart, CheckSquare, Wind, ShoppingBag, Newspaper, Users, ChevronRight } from "@/components/icons";
import { ArticleSummary } from "@/components/ArticleSummary";
import { articles } from "@/lib/data";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";

const healthTips = [
    "Stay hydrated by drinking plenty of water throughout the day.",
    "Aim for at least 30 minutes of moderate exercise most days of the week.",
    "Eat a balanced diet rich in fruits, vegetables, and whole grains.",
    "Prioritize getting 7-9 hours of quality sleep per night.",
    "Practice mindfulness or meditation to reduce stress.",
    "Regularly connect with friends and family for social support."
];

const fomoLogItems = [
    "Breaking News: New Policy Update",
    "New Discounts Available in Marketplace",
    "Upcoming Event: Tech Conference",
    "A friend posted on the Bulletin Board"
];

const fitnessLog = [
    { exercise: '5K Run', duration: '30 min', date: '2023-08-01' },
    { exercise: 'Yoga Class', duration: '60 min', date: '2023-07-20' },
];

const healthEvents = [
    { name: 'Healthy Eating Seminar', date: '2023-07-25', location: 'Community Center' },
    { name: '5K Run', date: '2023-08-01', location: 'City Park' },
];

const healthArticles = articles.slice(3, 5);


export default function HealthPage() {
    const router = useRouter();

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 md:py-12">
        <header className="mb-8">
            <Button onClick={() => router.back()} variant="ghost" className="mb-4 -ml-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
            </Button>
            <h1 className="font-headline text-4xl font-bold">Health & Wellness</h1>
            <p className="text-muted-foreground mt-1">Your hub for health tips, fitness tracking, and wellness articles.</p>
        </header>

        <div className="space-y-12">
            <section id="tips">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Heart className="h-6 w-6 text-red-500" />
                            Daily Health Tips
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <List>
                            {healthTips.map((tip, index) => (
                                <ListItem key={index}>
                                    <Heart className='text-red-500 h-5 w-5' />
                                    <span>{tip}</span>
                                </ListItem>
                            ))}
                        </List>
                    </CardContent>
                </Card>
            </section>
            
            <section id="mindfulness">
                <Card className="bg-blue-50 dark:bg-blue-900/20">
                    <CardHeader>
                         <CardTitle className="flex items-center gap-2">
                            <Wind className="h-6 w-6 text-blue-500" />
                            Mindfulness Session
                        </CardTitle>
                        <CardDescription>
                            Take a moment to pause and reset with a guided breathing exercise.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Link href="/mindfulness">
                            <Button>Start Mindfulness Session</Button>
                        </Link>
                    </CardContent>
                </Card>
            </section>

             <section id="fomo-log">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <CheckSquare className="h-6 w-6 text-blue-500" />
                            FOMO Log
                        </CardTitle>
                        <CardDescription>
                            A log of what you've missed while you were away. Catch up at your own pace.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <List>
                            {fomoLogItems.map((item, index) => (
                                <ListItem key={index}>
                                    <CheckSquare className='text-blue-500 h-5 w-5' />
                                    <span>{item}</span>
                                </ListItem>
                            ))}
                        </List>
                    </CardContent>
                </Card>
            </section>
            
            <section id="digital-wellness">
                <Card>
                    <CardHeader>
                        <CardTitle>Digital Wellness</CardTitle>
                        <CardDescription>
                            Balance your digital diet by choosing how you want to engage right now.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col gap-2">
                            <Link href="/articles" className="block p-4 border rounded-lg hover:bg-muted transition-colors flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Newspaper className="h-6 w-6 text-primary" />
                                    <span className="font-semibold">Catch Up on News</span>
                                </div>
                                <ChevronRight className="h-5 w-5 text-muted-foreground" />
                            </Link>
                             <Link href="/marketplace" className="block p-4 border rounded-lg hover:bg-muted transition-colors flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <ShoppingBag className="h-6 w-6 text-primary" />
                                    <span className="font-semibold">Browse Marketplace</span>
                                </div>
                                <ChevronRight className="h-5 w-5 text-muted-foreground" />
                            </Link>
                             <Link href="/bulletin-board" className="block p-4 border rounded-lg hover:bg-muted transition-colors flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Users className="h-6 w-6 text-primary" />
                                    <span className="font-semibold">Connect with Community</span>
                                </div>
                                 <ChevronRight className="h-5 w-5 text-muted-foreground" />
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </section>

             <Separator />

            <section id="articles">
                 <h2 className="font-headline text-3xl font-bold mb-6">Featured Articles</h2>
                 <div className="space-y-8">
                    {healthArticles.map((article, index) => (
                        <div key={article.id}>
                            <ArticleSummary article={article} />
                            {index < healthArticles.length - 1 && <Separator className="mt-8" />}
                        </div>
                    ))}
                </div>
            </section>

             <Separator />

            <div className="grid md:grid-cols-2 gap-8">
                 <section id="fitness">
                    <Card className="h-full">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-sm"><Dumbbell className="h-4 w-4"/>Your Fitness Log</CardTitle>
                        </CardHeader>
                        <CardContent>
                             <List className="space-y-2">
                                {fitnessLog.map((item, index) => (
                                    <ListItem key={index} className="p-2 justify-between">
                                        <div>
                                            <p className="font-medium">{item.exercise}</p>
                                            <p className="text-xs text-muted-foreground">{item.date}</p>
                                        </div>
                                        <p className="text-sm">{item.duration}</p>
                                    </ListItem>
                                ))}
                            </List>
                        </CardContent>
                    </Card>
                </section>
                <section id="events">
                    <Card className="h-full">
                         <CardHeader>
                             <CardTitle className="flex items-center gap-2 text-sm"><CalendarHeart className="h-4 w-4"/>Upcoming Events</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <List className="space-y-2">
                                {healthEvents.map((item, index) => (
                                    <ListItem key={index} className="p-2">
                                        <div>
                                            <p className="font-medium">{item.name}</p>
                                            <p className="text-xs text-muted-foreground">{item.date} &bull; {item.location}</p>
                                        </div>
                                    </ListItem>
                                ))}
                            </List>
                        </CardContent>
                    </Card>
                </section>
            </div>
            
            <Separator />

            <section id="offline">
                 <Card>
                    <CardHeader>
                        <CardTitle>Offline Mode</CardTitle>
                        <CardDescription>Download the content from this subchannel to access it without an internet connection.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button>
                            <Download className="mr-2 h-4 w-4" />
                            Download Content
                        </Button>
                    </CardContent>
                </Card>
            </section>

        </div>
    </div>
  );
}
