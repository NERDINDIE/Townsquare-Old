
'use client';

import { Battery, Wifi, Phone, Mail, Settings, MessageSquare, Compass, Camera } from '@/components/icons';
import Image from 'next/image';

const AppIcon = ({ href, label, children, isLarge }: { href: string; label: string; children: React.ReactNode; isLarge?: boolean; }) => (
    <a href={href} className="flex flex-col items-center gap-1.5 text-center text-white text-xs no-underline">
        <div className={`transition-all active:scale-90 ${isLarge ? 'w-28 h-28' : 'w-16 h-16'}`}>
             {children}
        </div>
        <span className="text-shadow-md font-medium">{label}</span>
    </a>
);


const WeatherWidget = () => (
    <div className="w-full h-32 rounded-3xl bg-gradient-to-br from-blue-400 to-purple-500 p-4 flex flex-col justify-between text-white font-medium text-shadow-md">
        <div>
            <p className="font-bold">New York City</p>
            <p className="text-4xl">15°</p>
        </div>
        <div className="text-right">
            <p>Partly Cloudy</p>
            <p className="text-xs">H:21° L:13°</p>
        </div>
    </div>
)

const MusicWidget = () => (
    <div className="w-full h-32 rounded-3xl bg-black/30 backdrop-blur-md p-4 flex items-center gap-4 text-white">
         <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
            <Image src="https://placehold.co/200x200.png" alt="Album art" width={80} height={80} data-ai-hint="album art" />
         </div>
         <div className="truncate">
            <p className="font-bold text-lg">Song Title</p>
            <p className="text-white/80">Artist Name</p>
         </div>
    </div>
)

export default function PhoneScreenPage() {
    return (
        <div className="bg-black min-h-screen flex items-center justify-center p-4">
            <div className="w-[360px] h-[780px] bg-black rounded-[40px] flex flex-col relative border-4 border-gray-800 shadow-2xl">
                {/* Wallpaper */}
                 <Image src="https://picsum.photos/400/800" alt="Wallpaper" fill className="z-0 object-cover rounded-[36px]" data-ai-hint="abstract gradient" />

                 {/* Notch */}
                 <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-8 bg-black rounded-b-xl z-20" />

                 {/* Status Bar */}
                <header className="absolute top-0 left-0 right-0 h-12 flex items-center justify-between px-6 text-white text-sm font-semibold z-20 pt-1">
                    <span>9:41</span>
                    <div className="flex items-center gap-1.5">
                        <Wifi className="h-4 w-4" />
                        <Battery className="h-5 w-5" />
                    </div>
                </header>

                {/* Icons Grid */}
                 <main className="flex-1 p-6 pt-16 z-10 space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <WeatherWidget />
                        <MusicWidget />
                    </div>
                     <div className="grid grid-cols-4 gap-y-6">
                        <AppIcon href="#" label="Settings"><div className="w-16 h-16 bg-black/20 backdrop-blur-md rounded-[1.2rem] flex items-center justify-center"><Settings className="h-9 w-9"/></div></AppIcon>
                        <AppIcon href="#" label="Mail"><div className="w-16 h-16 bg-black/20 backdrop-blur-md rounded-[1.2rem] flex items-center justify-center"><Mail className="h-9 w-9"/></div></AppIcon>
                        <AppIcon href="#" label="Messages"><div className="w-16 h-16 bg-black/20 backdrop-blur-md rounded-[1.2rem] flex items-center justify-center"><MessageSquare className="h-9 w-9"/></div></AppIcon>
                        <AppIcon href="#" label="Browser"><div className="w-16 h-16 bg-black/20 backdrop-blur-md rounded-[1.2rem] flex items-center justify-center"><Compass className="h-9 w-9"/></div></AppIcon>
                        <AppIcon href="#" label="Camera"><div className="w-16 h-16 bg-black/20 backdrop-blur-md rounded-[1.2rem] flex items-center justify-center"><Camera className="h-9 w-9"/></div></AppIcon>
                     </div>
                 </main>
                
                {/* Dock */}
                <footer className="relative flex-shrink-0 h-28 z-10 p-4">
                    <div className="absolute inset-x-2 top-0 h-full bg-black/20 backdrop-blur-lg rounded-3xl" />
                     <div className="relative grid grid-cols-4 items-center h-full px-2">
                        <AppIcon href="#" label=""><Phone className="text-white h-8 w-8"/></AppIcon>
                        <AppIcon href="#" label=""><Compass className="text-white h-8 w-8"/></AppIcon>
                        <AppIcon href="#" label=""><MessageSquare className="text-white h-8 w-8"/></AppIcon>
                        <AppIcon href="#" label=""><div className="w-16 h-16 bg-gradient-to-b from-orange-400 to-orange-600 rounded-[1.2rem] flex items-center justify-center"><p className="text-4xl text-white">🎵</p></div></AppIcon>
                    </div>
                </footer>

            </div>
        </div>
    );
}
