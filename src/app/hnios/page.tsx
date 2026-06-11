
'use client';

import { Battery, Wifi, Phone, Mail, Music } from '@/components/icons';
import Image from 'next/image';
import Link from 'next/link';

const AppIcon = ({ href, label, children }: { href: string; label: string; children: React.ReactNode }) => (
    <Link href={href} className="flex flex-col items-center gap-1.5 text-center text-white text-xs no-underline">
        {children}
        <span className="text-shadow-md">{label}</span>
    </Link>
);

const SmsIcon = () => (
    <div className="w-14 h-14 rounded-xl bg-gradient-to-b from-green-400 to-green-600 flex items-center justify-center">
         <svg width="40" height="32" viewBox="0 0 40 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M36 0H4C1.79086 0 0 1.79086 0 4V32L8 24H36C38.2091 24 40 22.2091 40 20V4C40 1.79086 38.2091 0 36 0Z" fill="url(#paint0_linear_sms)"/>
            <defs>
            <linearGradient id="paint0_linear_sms" x1="20" y1="0" x2="20" y2="32" gradientUnits="userSpaceOnUse">
            <stop stopColor="white" stopOpacity="0.4"/>
            <stop offset="1" stopColor="white" stopOpacity="0"/>
            </linearGradient>
            </defs>
        </svg>
    </div>
);

const CalendarIcon = () => (
    <div className="w-14 h-14 rounded-xl bg-white text-black flex flex-col items-center justify-center font-sans font-bold shadow-lg">
        <p className="w-full bg-red-600 text-white text-[10px] text-center rounded-t-lg py-0.5">Tuesday</p>
        <p className="text-4xl -mt-1">9</p>
    </div>
);

const PhotosIcon = () => (
    <div className="w-14 h-14 rounded-xl bg-gray-700 flex items-center justify-center overflow-hidden">
        <Image src="https://storage.googleapis.com/studioprompt-images/ios-photos-icon.png" width={56} height={56} alt="Sunflower" className="object-cover" />
    </div>
);

const CameraIcon = () => (
     <div className="w-14 h-14 rounded-xl bg-gradient-to-b from-gray-500 to-gray-700 flex items-center justify-center border border-gray-400/50">
        <div className="w-[50px] h-[38px] bg-gradient-to-b from-[#252525] to-[#505050] rounded-md border-2 border-[#656565] flex items-start justify-between p-0.5">
            <div className="w-2 h-2 rounded-full bg-gradient-to-b from-[#A5A5A5] to-[#656565] border-t border-white/50"></div>
            <div className="w-6 h-6 rounded-full bg-gradient-to-b from-[#353535] to-[#101010] border border-[#202020] flex items-center justify-center">
                 <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-b from-[#66F4F7] to-[#0D8099] border-t border-cyan-200/80"></div>
            </div>
        </div>
    </div>
);

const YoutubeIcon = () => (
    <div className="w-14 h-14 rounded-xl bg-gray-200 flex items-center justify-center shadow-inner overflow-hidden border border-gray-300">
        <div className="w-12 h-9 bg-gradient-to-b from-[#4A4A4A] to-[#292929] rounded-sm shadow-md flex flex-col items-center justify-center">
             <Image src="https://storage.googleapis.com/studioprompt-images/ios-youtube-icon.png" width={30} height={20} alt="YouTube logo" />
             <p className="text-[4px] text-gray-400 mt-0.5">Broadcast Yourself</p>
        </div>
    </div>
);

const StocksIcon = () => (
    <div className="w-14 h-14 rounded-xl bg-[#292929] flex items-center justify-center p-1 border border-gray-600">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.5" y="0.5" width="47" height="47" rx="4.5" fill="#1C1C1C" stroke="#444"/>
            <path d="M6 38L12 25L18 30L27 15L34 22L42 10" stroke="#00FF00" strokeWidth="2"/>
            <path d="M6 38L12 25L18 30L27 15L34 22L42 10" stroke="url(#green_glow)" strokeWidth="2" strokeLinecap="round"/>
            <defs>
            <linearGradient id="green_glow" x1="24" y1="10" x2="24" y2="38" gradientUnits="userSpaceOnUse">
                <stop stopColor="#ADFFAD" stopOpacity="0.8"/>
                <stop offset="1" stopColor="#00FF00" stopOpacity="0"/>
            </linearGradient>
            </defs>
        </svg>
    </div>
);

const MapsIcon = () => (
    <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center overflow-hidden border border-gray-300">
         <Image src="https://storage.googleapis.com/studioprompt-images/ios-maps-icon.png" width={56} height={56} alt="Map" />
    </div>
);

const WeatherIcon = () => (
     <div className="w-14 h-14 rounded-xl bg-gradient-to-b from-[#4A90E2] to-[#00428B] flex flex-col items-start justify-start p-1.5 text-white font-bold relative overflow-hidden">
        <p className="text-2xl -ml-1">73°</p>
        <div className="absolute top-1 -right-1 w-8 h-8 bg-yellow-400 rounded-full" />
    </div>
);

const ClockIcon = () => (
    <div className="w-14 h-14 rounded-xl bg-gradient-to-b from-white to-gray-300 flex items-center justify-center border border-gray-400">
        <div className="relative w-12 h-12 rounded-full bg-white border border-gray-300 shadow-inner">
             {/* Clock face numbers */}
            <span className="absolute top-1 left-1/2 -translate-x-1/2 text-xs font-bold">12</span>
            <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-xs font-bold">6</span>
            <span className="absolute left-1.5 top-1/2 -translate-y-1/2 text-xs font-bold">9</span>
            <span className="absolute right-1.5 top-1/2 -translate-y-1/2 text-xs font-bold">3</span>
            {/* Hour hand */}
            <div className="absolute top-1/2 left-1/2 w-0.5 h-3 bg-black origin-bottom" style={{ transform: 'translateX(-50%) rotate(20deg)' }}></div>
            {/* Minute hand */}
            <div className="absolute top-1/2 left-1/2 w-0.5 h-4 bg-black origin-bottom" style={{ transform: 'translateX(-50%) rotate(180deg)' }}></div>
            {/* Second hand */}
             <div className="absolute top-1/2 left-1/2 w-px h-5 bg-red-600 origin-bottom" style={{ transform: 'translateX(-50%) rotate(270deg)' }}></div>
            {/* Center dot */}
            <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-black rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
    </div>
);

const CalculatorIcon = () => (
    <div className="w-14 h-14 rounded-xl bg-gray-200 border border-gray-400 flex flex-col items-center p-1 gap-0.5">
        <div className="w-full h-4 bg-gray-800 rounded-t-md text-white text-right pr-1 text-sm">123</div>
        <div className="grid grid-cols-4 gap-0.5 flex-1 w-full">
            <div className="bg-gray-400 rounded-sm"></div>
            <div className="bg-gray-400 rounded-sm"></div>
            <div className="bg-gray-400 rounded-sm"></div>
            <div className="bg-orange-500 rounded-sm text-white flex items-center justify-center text-xs">÷</div>
            <div className="bg-gray-600 rounded-sm text-white flex items-center justify-center text-xs">7</div>
            <div className="bg-gray-600 rounded-sm text-white flex items-center justify-center text-xs">8</div>
            <div className="bg-gray-600 rounded-sm text-white flex items-center justify-center text-xs">9</div>
            <div className="bg-orange-500 rounded-sm text-white flex items-center justify-center text-xs">x</div>
            <div className="bg-gray-600 rounded-sm text-white flex items-center justify-center text-xs">4</div>
            <div className="bg-gray-600 rounded-sm text-white flex items-center justify-center text-xs">5</div>
            <div className="bg-gray-600 rounded-sm text-white flex items-center justify-center text-xs">6</div>
            <div className="bg-orange-500 rounded-sm text-white flex items-center justify-center text-xs">-</div>
            <div className="bg-gray-600 rounded-sm text-white flex items-center justify-center text-xs">1</div>
            <div className="bg-gray-600 rounded-sm text-white flex items-center justify-center text-xs">2</div>
            <div className="bg-gray-600 rounded-sm text-white flex items-center justify-center text-xs">3</div>
            <div className="bg-orange-500 rounded-sm text-white flex items-center justify-center text-xs">+</div>
        </div>
    </div>
);

const NotesIcon = () => (
     <div className="w-14 h-14 rounded-xl bg-gradient-to-b from-yellow-100 to-yellow-200 flex flex-col overflow-hidden border border-yellow-300">
        <div className="h-3 bg-red-600 flex-shrink-0"></div>
        <div className="flex-grow p-1 space-y-1">
            <div className="h-1 bg-blue-300 rounded-full"></div>
            <div className="h-1 bg-blue-300 rounded-full"></div>
            <div className="h-1 bg-blue-300 rounded-full w-2/3"></div>
        </div>
    </div>
);

const SettingsIcon = () => (
     <div className="w-14 h-14 rounded-xl bg-gradient-to-b from-gray-300 to-gray-500 flex items-center justify-center border border-gray-400">
        <div className="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center shadow-inner">
            <Image src="https://storage.googleapis.com/studioprompt-images/ios-settings-icon.png" width={32} height={32} alt="Gears" />
        </div>
    </div>
);


export default function HNIosPage() {
    return (
        <div className="bg-black min-h-screen flex items-center justify-center p-4">
            <div className="w-[320px] h-[480px] bg-black rounded-lg flex flex-col relative font-sans">
                {/* Wallpaper */}
                 <Image src="https://storage.googleapis.com/studioprompt-images/ios-wallpaper.jpg" alt="Wallpaper" fill className="z-0 object-cover" />

                 {/* Status Bar */}
                <header className="absolute top-0 left-0 right-0 h-5 bg-black/70 flex items-center justify-between px-2 text-white text-xs z-20">
                    <div className="flex items-center gap-1">
                        <span className="font-bold">AT&T</span>
                        <Wifi className="h-3 w-3" />
                    </div>
                    <span className="font-bold">9:42 AM</span>
                    <div className="flex items-center gap-1">
                        <span>80%</span>
                        <Battery className="h-4 w-4" />
                    </div>
                </header>

                {/* Icons Grid */}
                 <main className="flex-1 grid grid-cols-4 gap-y-6 p-4 pt-8 z-10">
                    <AppIcon href="#" label="Text"><SmsIcon /></AppIcon>
                    <AppIcon href="#" label="Calendar"><CalendarIcon /></AppIcon>
                    <AppIcon href="#" label="Photos"><PhotosIcon /></AppIcon>
                    <AppIcon href="#" label="Camera"><CameraIcon /></AppIcon>
                    
                    <AppIcon href="#" label="YouTube"><YoutubeIcon /></AppIcon>
                    <AppIcon href="#" label="Stocks"><StocksIcon /></AppIcon>
                    <AppIcon href="#" label="Maps"><MapsIcon /></AppIcon>
                    <AppIcon href="#" label="Weather"><WeatherIcon /></AppIcon>

                    <AppIcon href="#" label="Clock"><ClockIcon /></AppIcon>
                    <AppIcon href="#" label="Calculator"><CalculatorIcon /></AppIcon>
                    <AppIcon href="#" label="Notes"><NotesIcon /></AppIcon>
                    <AppIcon href="#" label="Settings"><SettingsIcon /></AppIcon>
                 </main>
                
                {/* Dock */}
                <footer className="relative flex-shrink-0 h-24 z-10">
                    <div className="absolute inset-x-0 top-0 h-full bg-gradient-to-t from-black/40 to-black/10 backdrop-blur-sm rounded-b-lg" />
                     <div className="absolute inset-x-0 top-0 h-px bg-white/20" />
                     <div className="relative grid grid-cols-4 items-center h-full px-2 pt-2">
                        <AppIcon href="#" label="Phone">
                            <div className="w-14 h-14 rounded-xl bg-green-500 flex items-center justify-center">
                                <Phone className="h-8 w-8 text-white" />
                            </div>
                        </AppIcon>
                        <AppIcon href="#" label="Mail">
                            <div className="relative w-14 h-14 rounded-xl bg-gradient-to-b from-blue-400 to-blue-600 flex items-center justify-center">
                                <Mail className="h-8 w-8 text-white" />
                                <div className="absolute top-1 right-1 bg-red-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">2</div>
                            </div>
                        </AppIcon>
                        <AppIcon href="#" label="Safari">
                             <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center">
                                 <Image src="https://storage.googleapis.com/studioprompt-images/ios-safari-icon.png" width={48} height={48} alt="Safari Compass" />
                            </div>
                        </AppIcon>
                        <AppIcon href="#" label="iPod">
                             <div className="w-14 h-14 rounded-xl bg-gradient-to-b from-orange-400 to-orange-600 flex items-center justify-center">
                                <Music className="h-8 w-8 text-white" />
                            </div>
                        </AppIcon>
                    </div>
                </footer>

            </div>
        </div>
    );
}
