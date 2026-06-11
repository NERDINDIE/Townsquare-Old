
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Cloud, CloudSun, CloudRain, Sun, AlertTriangle } from "lucide-react";
import Image from "next/image";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { forecast, newsArticles } from "@/lib/data/weather-data";

export default function WeathermanPage() {
    const [currentDate, setCurrentDate] = useState<string | null>(null);
    useEffect(() => {
        setCurrentDate(new Date().toLocaleDateString('en-us', { weekday:"long", month:"long", day:"numeric"}));
    }, []);

    return (
        <div className="bg-muted/20 min-h-screen">
            <div className="container mx-auto max-w-4xl px-4 py-8 md:py-12">
                <header className="mb-8 text-center">
                    <h1 className="font-headline text-5xl font-bold flex items-center justify-center gap-3 text-brand-weatherman">
                       <Cloud className="h-12 w-12" />
                       Weatherman
                    </h1>
                    <p className="mt-2 text-lg text-muted-foreground">
                        Your trusted source for weather forecasts and alerts.
                    </p>
                </header>

                <div className="relative mb-8">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input 
                        type="search"
                        placeholder="Search for a city or zip code"
                        className="w-full h-14 pl-12 pr-4 rounded-full text-lg"
                    />
                </div>

                <main className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Main Forecast */}
                    <div className="md:col-span-2">
                        <Card className="bg-brand-weatherman text-white overflow-hidden shadow-lg">
                           <CardContent className="p-0 relative">
                                <Image 
                                    src="https://placehold.co/800x450.png"
                                    alt="Weather map"
                                    width={800}
                                    height={450}
                                    className="w-full object-cover opacity-20"
                                    data-ai-hint="weather map"
                                />
                                <div className="absolute inset-0 p-6 flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="text-2xl font-bold">New York, NY</p>
                                                <p className="text-white/80">Partly Cloudy</p>
                                            </div>
                                            {currentDate ? (
                                                <p className="text-lg text-white/80">{currentDate}</p>
                                            ) : (
                                                <div className="h-6 w-40 bg-white/20 rounded-md animate-pulse"></div>
                                            )}
                                        </div>
                                    </div>
                                     <div className="text-center">
                                        <CloudSun className="h-32 w-32 mx-auto" />
                                        <p className="text-8xl font-bold">72°</p>
                                    </div>
                                    <div>
                                         <div className="flex justify-around text-center">
                                            <div>
                                                <p className="text-white/80 text-sm">Precipitation</p>
                                                <p className="font-bold">10%</p>
                                            </div>
                                             <div>
                                                <p className="text-white/80 text-sm">Humidity</p>
                                                <p className="font-bold">60%</p>
                                            </div>
                                             <div>
                                                <p className="text-white/80 text-sm">Wind</p>
                                                <p className="font-bold">8 mph</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                           </CardContent>
                        </Card>
                        
                        <Card className="mt-8">
                            <CardHeader>
                                <CardTitle>5-Day Forecast</CardTitle>
                            </CardHeader>
                            <CardContent className="flex justify-around text-center">
                                {forecast.map(day => (
                                    <div key={day.day} className="flex flex-col items-center gap-2">
                                        <p className="font-semibold text-muted-foreground">{day.day}</p>
                                        <div className="text-primary">{day.icon}</div>
                                        <p className="text-xl font-bold">{day.temp}</p>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        <Link href="/alert?type=earthquake">
                            <Card className="border-destructive border-2 bg-destructive/10 hover:bg-destructive/20 transition-colors">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-destructive">
                                        <AlertTriangle className="h-5 w-5" />
                                        Earthquake Alert
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-destructive/80">
                                        Magnitude 6.1, 20 miles away.
                                    </CardDescription>
                                    <p className="font-bold text-destructive mt-2">Tap to see safety instructions.</p>
                                </CardContent>
                            </Card>
                        </Link>
                         <Card>
                            <CardHeader>
                                <CardTitle>Weather News</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                               {newsArticles.map(article => (
                                   <Link href="#" key={article.id} className="group block">
                                     <div className="relative aspect-video w-full rounded-lg overflow-hidden mb-2">
                                        <Image
                                            src={article.image}
                                            alt={article.title}
                                            fill
                                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                                            data-ai-hint={article.dataAiHint}
                                        />
                                    </div>
                                    <p className="text-sm font-semibold text-brand-weatherman">{article.category}</p>
                                    <h3 className="font-semibold group-hover:underline">{article.title}</h3>
                                   </Link>
                               ))}
                            </CardContent>
                        </Card>
                    </div>
                </main>
            </div>
        </div>
    );
}
