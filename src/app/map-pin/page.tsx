
'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Sheet, SheetContent, SheetDragger, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Layers, LocateFixed, Map, Navigation, Search, Share2, Star } from "@/components/icons";
import Image from "next/image";


export default function MapPinPage() {
  return (
    <div 
        className="relative h-[calc(100vh-4rem)] w-full"
        style={{'--brand-color': 'hsl(var(--brand-map-pin))'} as React.CSSProperties}
    >
        <div className="absolute inset-0 z-0">
            <Image 
                src="https://storage.googleapis.com/studioprompt-images/city-map-bg.png"
                alt="City map"
                fill
                className="object-cover"
                data-ai-hint="city map"
            />
        </div>
        
        <div className="relative z-10 p-4 md:p-6 flex flex-col h-full">
            {/* Search Bar */}
            <div className="flex-shrink-0">
                 <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input 
                        placeholder="Search for a place or address"
                        className="w-full h-14 pl-12 pr-4 rounded-full shadow-lg text-base"
                    />
                </div>
            </div>

            {/* Floating Action Buttons */}
            <div className="absolute top-24 right-4 md:right-6 flex flex-col gap-3">
                 <Button size="icon" className="rounded-full w-14 h-14 shadow-lg bg-background text-foreground hover:bg-muted">
                    <Layers className="h-6 w-6" />
                </Button>
                <Button size="icon" className="rounded-full w-14 h-14 shadow-lg" style={{backgroundColor: 'var(--brand-color)'}}>
                    <LocateFixed className="h-6 w-6" />
                </Button>
            </div>
            
             <Sheet>
                <SheetTrigger asChild>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer">
                        <div className="relative">
                            <Map className="h-16 w-16 text-destructive drop-shadow-lg" />
                            <div className="absolute inset-0 flex items-center justify-center pb-2">
                                <Star className="h-6 w-6 text-white fill-white" />
                            </div>
                        </div>
                    </div>
                </SheetTrigger>
                <SheetContent side="bottom" className="h-[80vh] rounded-t-2xl">
                    <div className="relative h-full">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2">
                            <SheetDragger />
                        </div>
                        <div className="pt-8 px-2 h-full overflow-y-auto">
                             <Card className="border-0 shadow-none">
                                <CardContent className="p-0">
                                    <div className="relative aspect-video w-full rounded-lg overflow-hidden">
                                        <Image
                                            src="https://placehold.co/800x450.png"
                                            alt="Central Park"
                                            fill
                                            className="object-cover"
                                            data-ai-hint="city park"
                                        />
                                    </div>
                                </CardContent>
                                <CardHeader>
                                    <CardTitle className="text-3xl">Central Park</CardTitle>
                                    <CardDescription>Iconic urban park with walking paths, a carousel, a zoo & a reservoir.</CardDescription>
                                    <div className="flex items-center gap-2 pt-2">
                                        <div className="flex items-center text-yellow-500">
                                            <Star className="w-5 h-5 fill-current" />
                                            <Star className="w-5 h-5 fill-current" />
                                            <Star className="w-5 h-5 fill-current" />
                                            <Star className="w-5 h-5 fill-current" />
                                            <Star className="w-5 h-5 fill-current text-muted" />
                                        </div>
                                        <span className="text-muted-foreground text-sm">(4.8k Reviews)</span>
                                    </div>
                                </CardHeader>
                                <CardFooter className="gap-2">
                                    <Button size="lg" className="flex-1" style={{backgroundColor: 'var(--brand-color)'}}>
                                        <Navigation className="mr-2 h-5 w-5" />
                                        Directions
                                    </Button>
                                    <Button size="lg" variant="outline"><Star className="mr-2 h-5 w-5"/> Save</Button>
                                    <Button size="lg" variant="outline"><Share2 className="mr-2 h-5 w-5"/> Share</Button>
                                </CardFooter>
                            </Card>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>

        </div>
    </div>
  );
}
