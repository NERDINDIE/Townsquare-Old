
'use client';

import { Bluetooth, Signal, HelpCircle, Phone, Globe, Users, Map } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const AppIcon = ({ label, icon }: { label: string; icon: React.ReactNode }) => (
    <div className="flex flex-col items-center gap-1 text-center">
        <div className="w-16 h-16 flex items-center justify-center">
            {icon}
        </div>
        <span className="text-white text-sm font-semibold text-shadow-md">{label}</span>
    </div>
);


const AnalogClock = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000 * 60); // Update every minute
        return () => clearInterval(timer);
    }, []);

    const hours = time.getHours();
    const minutes = time.getMinutes();

    const hourRotation = (hours % 12 + minutes / 60) * 30;
    const minuteRotation = minutes * 6;

    return (
        <div className="relative w-48 h-48">
            <Image src="https://storage.googleapis.com/studioprompt-images/android-clock-face.png" alt="Clock face" layout="fill" />
             <div 
                className="absolute top-1/2 left-1/2 w-1 h-12 bg-black origin-bottom rounded-full"
                style={{ transform: `translateX(-50%) rotate(${hourRotation}deg)`, transformOrigin: 'bottom' }}
             />
             <div 
                className="absolute top-1/2 left-1/2 w-0.5 h-16 bg-black origin-bottom rounded-full"
                style={{ transform: `translateX(-50%) rotate(${minuteRotation}deg)`, transformOrigin: 'bottom' }}
             />
             <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-black rounded-full transform -translate-x-1/2 -translate-y-1/2" />
        </div>
    );
};

export default function AndroidOnePage() {
    const [currentTime, setCurrentTime] = useState("7:36 AM");

    return (
        <div className="w-full h-screen bg-black flex items-center justify-center">
            <div className="w-[320px] h-[480px] flex flex-col relative overflow-hidden">
                <Image src="https://picsum.photos/320/480" alt="Android Wallpaper" layout="fill" className="object-cover" data-ai-hint="calm lake landscape" />
                
                {/* Status Bar */}
                <header className="absolute top-0 left-0 right-0 h-6 bg-gray-300 flex items-center justify-end px-2 text-black text-xs font-bold z-10">
                    <div className="flex items-center gap-1.5">
                        <Bluetooth className="h-4 w-4" />
                        <span className="text-sm font-bold">3G</span>
                        <Signal className="h-4 w-4" />
                        <HelpCircle className="h-4 w-4" />
                        <span>{currentTime}</span>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-1 flex items-center justify-center z-0">
                    <AnalogClock />
                </main>
                
                {/* App Dock */}
                <footer className="relative flex-shrink-0 flex flex-col items-center z-10">
                    <div className="grid grid-cols-4 gap-2 px-2 pb-2">
                        <AppIcon label="Dialer" icon={<Image src="https://storage.googleapis.com/studioprompt-images/android-dialer-icon.png" alt="Dialer" width={64} height={64} />} />
                        <AppIcon label="Contacts" icon={<Image src="https://storage.googleapis.com/studioprompt-images/android-contacts-icon.png" alt="Contacts" width={64} height={64} />} />
                        <AppIcon label="Browser" icon={<Image src="https://storage.googleapis.com/studioprompt-images/android-browser-icon.png" alt="Browser" width={64} height={64} />} />
                        <AppIcon label="Maps" icon={<Image src="https://storage.googleapis.com/studioprompt-images/android-maps-icon.png" alt="Maps" width={64} height={64} />} />
                    </div>
                     <div className="h-8 w-24 bg-gray-400/80 rounded-t-lg flex items-center justify-center">
                        <div className="w-0 h-0 border-x-8 border-x-transparent border-b-8 border-b-gray-700"></div>
                     </div>
                </footer>
            </div>
        </div>
    );
}
