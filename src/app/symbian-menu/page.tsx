
'use client';

import { Battery, Rss, Signal, Mail, User, Calendar, Music, GalleryVertical, Gamepad2, Globe, Download, Wrench, Folder, File, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const AppIcon = ({ label, icon }: { label: string; icon: React.ReactNode }) => (
    <div className="flex flex-col items-center justify-start text-center text-white text-xs font-semibold">
        <div className="w-16 h-14 flex items-center justify-center">
            {icon}
        </div>
        <span className="mt-1">{label}</span>
    </div>
);

export default function SymbianMenuPage() {
    return (
        <div className="bg-blue-800 flex items-center justify-center h-screen p-4 font-sans">
            <div className="w-[240px] h-[420px] bg-gradient-to-b from-blue-400 to-blue-600 rounded-lg flex flex-col text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-500 opacity-30" style={{ backgroundImage: 'radial-gradient(circle, transparent, #002266 90%)' }} />
                
                <header className="relative flex justify-between items-center px-2 py-1 text-xs z-10">
                    <div className="flex items-center gap-1">
                        <Signal className="h-3 w-3" />
                        <span>TOWNSQR</span>
                    </div>
                    <div className="flex items-center gap-1">
                         <div className="w-4 h-2 border-2 border-white rounded-sm flex items-center p-px"><div className="w-full h-full bg-white rounded-xs"></div></div>
                        <Battery className="h-4 w-4 -rotate-90" />
                    </div>
                </header>

                <div className="text-center py-1 z-10">
                    <h1 className="text-lg font-bold">Menu</h1>
                </div>

                <main className="flex-1 p-2 grid grid-cols-3 grid-rows-4 gap-x-2 gap-y-1 z-10">
                    <Link href="/contacts"><AppIcon label="Contacts" icon={<User className="w-12 h-12 p-2 bg-blue-500/50 rounded-lg" />} /></Link>
                    <Link href="/mailbox"><AppIcon label="Messag." icon={<Mail className="w-12 h-12 p-2 bg-yellow-500/50 rounded-lg" />} /></Link>
                    <Link href="#"><AppIcon label="Calendar" icon={<Calendar className="w-12 h-12 p-2 bg-white/80 text-black rounded-lg" />} /></Link>
                    
                    <Link href="#"><AppIcon label="Music player" icon={<Music className="w-12 h-12 p-2 bg-red-500/50 rounded-lg" />} /></Link>
                    <Link href="#"><AppIcon label="Gallery" icon={<GalleryVertical className="w-12 h-12 p-2 bg-gray-300/50 rounded-lg" />} /></Link>
                    <Link href="/arcade-saloon"><AppIcon label="Games" icon={<Gamepad2 className="w-12 h-12 p-2 bg-green-500/50 rounded-lg" />} /></Link>
                    
                    <Link href="/browser"><AppIcon label="Services" icon={<Globe className="w-12 h-12 p-2 bg-green-400/50 rounded-lg" />} /></Link>
                    <Link href="/dlc"><AppIcon label="Download!" icon={<Download className="w-12 h-12 p-2 bg-blue-600/50 rounded-lg" />} /></Link>
                    <Link href="#"><AppIcon label="Tools" icon={<Wrench className="w-12 h-12 p-2 bg-yellow-600/50 rounded-lg" />} /></Link>

                    <Link href="/discover"><AppIcon label="Applications" icon={<Folder className="w-12 h-12 p-2 bg-yellow-600/50 rounded-lg" />} /></Link>
                    <Link href="#"><AppIcon label="Office" icon={<File className="w-12 h-12 p-2 bg-yellow-600/50 rounded-lg" />} /></Link>
                    <Link href="/settings"><AppIcon label="Settings" icon={<Settings className="w-12 h-12 p-2 bg-gray-400/50 rounded-lg" />} /></Link>
                </main>

                <footer className="relative flex justify-between items-center px-3 py-2 text-sm font-bold z-10">
                    <button>Options</button>
                    <button>Exit</button>
                </footer>
            </div>
        </div>
    );
}
