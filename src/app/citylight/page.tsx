
'use client';

import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft, ChevronRight, Home, Image as ImageIcon, Search, Settings, Bell, User, Tv, Tv2, PenSquare, Book, Music, Globe, Lightbulb, UserCog } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

const apps = [
    { name: 'Netflix', logo: 'https://storage.googleapis.com/studioprompt-images/netflix-logo.png' },
    { name: 'Prime Video', logo: 'https://storage.googleapis.com/studioprompt-images/prime-video-logo.png' },
    { name: 'YouTube', logo: 'https://storage.googleapis.com/studioprompt-images/youtube-logo.png' },
    { name: 'Disney+', logo: 'https://storage.googleapis.com/studioprompt-images/disney-plus-logo.png' },
    { name: 'Townsquare', icon: <Home />, color: 'bg-purple-600' },
    { name: 'Music', icon: <Music />, color: 'bg-pink-600' },
    { name: 'Web Browser', icon: <Globe />, color: 'bg-blue-600' },
    { name: 'On Demand', icon: <Tv2 />, color: 'bg-teal-600' },
    { name: 'My Content', icon: <ImageIcon />, color: 'bg-orange-600' },
    { name: 'User Guide', icon: <Book />, color: 'bg-indigo-600' },
];

export default function CitylightPage() {
    return (
        <div className="h-screen w-screen bg-[#1A1D21] text-white flex flex-col overflow-hidden">
            {/* Hero Section */}
            <section className="w-full h-1/2 relative flex-shrink-0">
                <Image 
                    src="https://picsum.photos/1920/1080"
                    alt="Citylight Hero"
                    fill
                    className="object-cover"
                    data-ai-hint="city skyline night"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
                <div className="relative h-full flex flex-col justify-center container mx-auto px-12">
                    <h1 className="text-7xl font-bold tracking-tighter">CITYLIGHT</h1>
                    <p className="mt-2 max-w-md text-white/80">
                        In the heart of the night, where the mundane fades and the extraordinary awakens, lies a city after dark. Step into the shadows and embark on an exhilarating journey through the hidden realms, untold stories, and mesmerising lives that thrive under the cloak of darkness.
                    </p>
                    <Button variant="outline" className="mt-6 w-fit bg-white/10 border-white/30 hover:bg-white/20">
                        Watch more
                    </Button>
                </div>
                 <div className="absolute top-1/2 -translate-y-1/2 left-4">
                    <Button variant="ghost" size="icon" className="rounded-full bg-black/30 hover:bg-black/50">
                        <ChevronLeft className="h-6 w-6" />
                    </Button>
                </div>
                <div className="absolute top-1/2 -translate-y-1/2 right-4">
                    <Button variant="ghost" size="icon" className="rounded-full bg-black/30 hover:bg-black/50">
                        <ChevronRight className="h-6 w-6" />
                    </Button>
                </div>
            </section>

            {/* Main Hub Section */}
            <main className="flex-grow flex container mx-auto px-12 py-8 gap-12">
                {/* Left Panel */}
                <div className="flex flex-col items-center justify-between w-40 flex-shrink-0">
                    <div>
                        <h2 className="text-3xl font-semibold">webOS Hub</h2>
                        <div className="flex items-center gap-3 mt-4">
                            <Button variant="ghost" size="icon" className="rounded-full bg-[#2E333A] hover:bg-[#3f454d]"><Search className="h-6 w-6" /></Button>
                            <Button variant="ghost" size="icon" className="rounded-full bg-[#2E333A] hover:bg-[#3f454d]"><Settings className="h-6 w-6" /></Button>
                            <Button variant="ghost" size="icon" className="rounded-full bg-[#2E333A] hover:bg-[#3f454d]"><Bell className="h-6 w-6" /></Button>
                            <Button variant="ghost" size="icon" className="rounded-full bg-[#2E333A] hover:bg-[#3f454d] text-pink-400"><User className="h-6 w-6" /></Button>
                        </div>
                    </div>
                     <div className="text-sm text-gray-400">Sponsored</div>
                </div>

                {/* Right Content */}
                <div className="flex-1 flex flex-col">
                    <div className="flex gap-6">
                        <div>
                             <p className="text-lg font-medium mb-2">Recent Input</p>
                             <Card className="bg-[#3D3A67] border-0 w-64 h-36 flex flex-col justify-between p-4">
                                <p className="text-sm text-gray-300">Recent Input</p>
                                <div className="flex items-center gap-2">
                                    <Tv className="h-8 w-8" />
                                    <p className="text-xl font-semibold">Live TV</p>
                                </div>
                             </Card>
                        </div>
                         <div>
                            <p className="text-lg font-medium mb-2">Features</p>
                            <div className="flex gap-4">
                                 <Card className="bg-[#2E333A] border-0 w-64 h-36 flex flex-col justify-between p-4">
                                    <h3 className="text-xl font-semibold text-red-400">Edit Home</h3>
                                    <p className="text-sm text-gray-300">Edit the list of apps on the Home to include your preferences.</p>
                                    <div className="text-right"><PlayCircleIcon /></div>
                                </Card>
                                 <Card className="bg-[#2E333A] border-0 w-64 h-36 flex flex-col justify-between p-4">
                                     <h3 className="text-xl font-semibold">TV Guide</h3>
                                     <p className="text-sm text-gray-300">Check the broadcast schedule and information.</p>
                                     <div className="text-right"><PlayCircleIcon /></div>
                                </Card>
                                <Card className="bg-[#2E333A] border-0 w-64 h-36 flex flex-col justify-between p-4">
                                     <h3 className="text-xl font-semibold">User Guide</h3>
                                     <p className="text-sm text-gray-300">Check how to use TV features.</p>
                                     <div className="text-right"><PlayCircleIcon /></div>
                                </Card>
                            </div>
                        </div>
                    </div>

                    {/* App Dock */}
                    <div className="mt-auto">
                        <ScrollArea className="w-full whitespace-nowrap">
                            <div className="flex space-x-4 pb-4">
                                <div className="flex flex-col items-center gap-2">
                                    <Button size="icon" className="h-16 w-16 rounded-2xl bg-gray-200 text-black hover:bg-white"><Home /></Button>
                                    <p className="text-sm">APPS</p>
                                </div>
                                {apps.map(app => (
                                    <div key={app.name} className="flex flex-col items-center gap-2">
                                        <Button size="icon" className={cn("h-16 w-16 rounded-2xl p-0 overflow-hidden", app.color)}>
                                            {app.logo ? (
                                                <Image src={app.logo} alt={app.name} width={64} height={64} className="object-contain" />
                                            ) : app.icon}
                                        </Button>
                                        <p className="text-sm opacity-0 group-hover:opacity-100">{app.name}</p>
                                    </div>
                                ))}
                            </div>
                            <ScrollBar orientation="horizontal" className="h-0" />
                        </ScrollArea>
                    </div>
                </div>
            </main>
        </div>
    );
}

const PlayCircleIcon = (props: React.ComponentProps<"svg">) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5"
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <polygon points="10 8 16 12 10 16 10 8" />
  </svg>
);
