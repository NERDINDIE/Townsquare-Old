
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Package, Edit, Palette, Gamepad2, PenTool, Radio, MessageSquare, SunMedium } from "@/components/icons";
import Image from "next/image";
import Link from 'next/link';
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { WatchfaceMaker } from "@/components/WatchfaceMaker";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const watchFaces = [
    {
        name: 'Photo Watchface',
        image: 'https://storage.googleapis.com/studioprompt-images/watch-photo-thumb.png',
        dataAiHint: 'photo watch face',
        isCustomizable: true,
    },
    {
        name: 'Modern Minimalist',
        image: 'https://placehold.co/400x400.png',
        dataAiHint: 'minimalist watch face',
    },
    {
        name: 'Retro Digital',
        image: 'https://placehold.co/400x400.png',
        dataAiHint: 'retro digital watch',
    },
    {
        name: 'Classic Chronograph',
        image: 'https://placehold.co/400x400.png',
        dataAiHint: 'chronograph watch face',
    },
     {
        name: 'Data-Rich Infograph',
        image: 'https://placehold.co/400x400.png',
        dataAiHint: 'information watch face',
    },
    {
        name: 'Abstract Art',
        image: 'https://placehold.co/400x400.png',
        dataAiHint: 'abstract art watch',
    },
]

const extensions = [
    {
        name: 'Editor Pro',
        icon: <PenTool className="h-8 w-8 text-brand-dlc" />,
        description: 'Unlock advanced formatting and styling options for writing articles.',
        href: '/editor-pro',
    },
    {
        name: 'Classic Gaming Font Pack',
        icon: <Gamepad2 className="h-8 w-8 text-brand-dlc" />,
        description: 'Get a new font inspired by classic 8-bit video games.',
    },
    {
        name: 'Live Weather Backgrounds',
        icon: <Palette className="h-8 w-8 text-brand-dlc" />,
        description: 'Dynamic home screen backgrounds that change with the weather.',
    }
]

const smartwatchApps = [
    {
        name: 'MiniPlayer',
        icon: <Radio className="h-8 w-8 text-brand-dlc" />,
        description: 'Control your audio playback directly from your wrist.'
    },
    {
        name: 'Quick Message',
        icon: <MessageSquare className="h-8 w-8 text-brand-dlc" />,
        description: 'Read and reply to messages without touching your phone.'
    },
    {
        name: 'Weather Glance',
        icon: <SunMedium className="h-8 w-8 text-brand-dlc" />,
        description: 'Get a quick look at the current weather conditions.'
    }
]

export default function DlcPage() {
  const [isMakerOpen, setIsMakerOpen] = useState(false);

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8 md:py-12" style={{'--brand-dlc': 'hsl(var(--brand-dlc))'} as React.CSSProperties}>
      <header className="mb-8">
          <h1 className="font-headline text-5xl font-bold flex items-center gap-3" style={{color: 'var(--brand-color)'}}>
            <Package className="h-12 w-12" />
            Downloadable Content
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Customize your experience with exclusive digital goods.
          </p>
      </header>

       <Tabs defaultValue="extensions" className="w-full">
            <TabsList className="grid w-full grid-cols-3 md:w-[540px]">
                <TabsTrigger value="extensions">Extensions</TabsTrigger>
                <TabsTrigger value="watchfaces">Watch Faces</TabsTrigger>
                <TabsTrigger value="apps">Smartwatch Apps</TabsTrigger>
            </TabsList>

            <TabsContent value="extensions" className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {extensions.map((ext, index) => {
                        const cardContent = (
                        <Card key={index} className="flex flex-col h-full">
                            <CardHeader className="flex flex-row items-start gap-4">
                            <div className="w-12 h-12 flex items-center justify-center bg-muted rounded-lg">
                                {ext.icon}
                            </div>
                            <div className="flex-1">
                                <CardTitle>{ext.name}</CardTitle>
                            </div>
                            </CardHeader>
                            <CardContent className="flex-grow">
                            <CardDescription>{ext.description}</CardDescription>
                            </CardContent>
                            <CardFooter>
                            <Button className="w-full" style={{
                                '--brand-color': `var(--brand-dlc)`,
                                backgroundColor: `var(--brand-color)`,
                            } as React.CSSProperties}>
                                <Download className="mr-2 h-4 w-4" />
                                Download
                            </Button>
                            </CardFooter>
                        </Card>
                        );

                        return ext.href ? <Link href={ext.href} key={index} className="flex">{cardContent}</Link> : <div key={index}>{cardContent}</div>;
                    })}
                </div>
            </TabsContent>

            <TabsContent value="watchfaces" className="mt-8">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {watchFaces.map((face, index) => (
                        <Card key={index} className="group overflow-hidden">
                            <CardContent className="p-0">
                                <div className="relative aspect-square">
                                    <Image 
                                        src={face.image} 
                                        alt={face.name} 
                                        fill 
                                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                                        data-ai-hint={face.dataAiHint}
                                    />
                                </div>
                            </CardContent>
                            <CardHeader className="p-4">
                                <CardTitle className="text-lg">{face.name}</CardTitle>
                            </CardHeader>
                            <CardFooter className="p-4">
                                {face.isCustomizable ? (
                                    <Dialog open={isMakerOpen} onOpenChange={setIsMakerOpen}>
                                        <DialogTrigger asChild>
                                            <Button className="w-full" variant="outline">
                                                <Palette className="mr-2 h-4 w-4" />
                                                Customize
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="max-w-md p-0 bg-black border-gray-700">
                                            <WatchfaceMaker onClose={() => setIsMakerOpen(false)} />
                                        </DialogContent>
                                    </Dialog>
                                ) : (
                                    <Button className="w-full" style={{
                                        '--brand-color': `var(--brand-dlc)`,
                                        backgroundColor: `var(--brand-color)`,
                                    } as React.CSSProperties}>
                                        <Download className="mr-2 h-4 w-4" />
                                        Download
                                    </Button>
                                )}
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </TabsContent>

            <TabsContent value="apps" className="mt-8">
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {smartwatchApps.map((app, index) => (
                        <Card key={index} className="flex flex-col h-full">
                            <CardHeader className="flex flex-row items-start gap-4">
                                <div className="w-12 h-12 flex items-center justify-center bg-muted rounded-lg">
                                    {app.icon}
                                </div>
                                <div className="flex-1">
                                    <CardTitle>{app.name}</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <CardDescription>{app.description}</CardDescription>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full" style={{
                                    '--brand-color': `var(--brand-dlc)`,
                                    backgroundColor: `var(--brand-color)`,
                                } as React.CSSProperties}>
                                    <Download className="mr-2 h-4 w-4" />
                                    Download
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </TabsContent>
        </Tabs>
    </div>
  );
}
