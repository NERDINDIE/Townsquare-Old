
'use client';

import { useEffect, useState } from 'react';
import { generateFacsimile, type FacsimileOutput } from '@/ai/flows/hourly-facsimile-flow';
import { Skeleton } from '@/components/ui/skeleton';
import { MessageSquare, Clock, Square, Footprints, SunMedium, User, Flame, Power } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

type WatchScreen = 'newsTicker' | 'townsquare' | 'analog' | 'modernDigital' | 'appGrid';
type BezelShape = 'round' | 'square';

function NewsTickerWatchface({ briefing, time }: { briefing: FacsimileOutput | null, time: Date | null }) {
    const formattedTime = time ? time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }) : '--:--';
    const formattedDate = time ? time.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }).toUpperCase() : '';

    return (
        <>
            <div className="text-center z-10 -mt-4">
                <h1 className="text-6xl font-bold text-white tracking-tighter">{formattedTime}</h1>
                <p className="text-lg text-cyan-400 font-semibold">{formattedDate}</p>
            </div>
            <div className="absolute bottom-16 w-full h-24 overflow-hidden z-10">
                <div className="text-center text-sm text-gray-300 animate-marquee-vertical space-y-2">
                    {briefing ? (
                        <>
                            {briefing.headlines.map((line, i) => <p key={i}>{line}</p>)}
                            {briefing.headlines.map((line, i) => <p key={`rep-${i}`}>{line}</p>)}
                        </>
                    ) : (
                        <div className="space-y-2 px-4">
                            <Skeleton className="h-4 w-full bg-gray-600" />
                            <Skeleton className="h-4 w-5/6 mx-auto bg-gray-600" />
                            <Skeleton className="h-4 w-full bg-gray-600" />
                        </div>
                    )}
                </div>
            </div>
             <div className="absolute bottom-6 flex gap-12 text-gray-400 z-10">
                <button onClick={() => alert('App selection not implemented')}><MessageSquare /></button>
                <button onClick={() => alert('App selection not implemented')}><Clock /></button>
            </div>
        </>
    );
}

function AnalogWatchface({ time }: { time: Date | null }) {
    const hours = time ? time.getHours() : 0;
    const minutes = time ? time.getMinutes() : 0;
    const hourRotation = (hours % 12 + minutes / 60) * 30;
    const minuteRotation = minutes * 6;

    return (
         <div className="w-full h-full bg-[#3D2E27] flex items-center justify-center">
            {/* Complications */}
            <div className="absolute top-0 left-0 right-0 bottom-0 text-white text-xs">
                {/* Step Counter */}
                <div className="absolute top-[55%] left-4 transform -translate-y-1/2 flex items-center gap-1 -rotate-45">
                    <Footprints className="h-3 w-3" />
                    <span>3,457</span>
                </div>
                {/* UV Index */}
                 <div className="absolute top-[48%] right-4 transform -translate-y-1/2 flex items-center -rotate-90">
                     <span className="mr-2">UV</span>
                    <div className="w-10 h-1 bg-white/20 rounded-full"><div className="w-1/2 h-1 bg-white rounded-full"></div></div>
                    <span className="ml-2">2</span>
                </div>
            </div>

            {/* Large '9' */}
            <div className="absolute w-[55%] h-[80%] bg-[#F0E6D1] rounded-[60px] transform -rotate-12 shadow-inner" />

            {/* Hands */}
            <div className="relative w-full h-full">
                {/* Center dot */}
                <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2 z-20" />
                {/* Hour Hand */}
                <div
                    className="absolute top-1/2 left-1/2 w-1 h-1/4 bg-[#D3CEC4] transform-origin-bottom rounded-t-full"
                    style={{ transform: `translateX(-50%) rotate(${hourRotation}deg)`, transformOrigin: 'bottom' }}
                >
                     <div className="absolute bottom-0 left-1/2 w-1/2 h-1/2 bg-[#C65343] transform -translate-x-1/2 rounded-t-full" />
                </div>
                {/* Minute Hand */}
                <div
                    className="absolute top-1/2 left-1/2 w-1 h-[40%] bg-[#D3CEC4] transform-origin-bottom rounded-t-full z-10"
                    style={{ transform: `translateX(-50%) rotate(${minuteRotation}deg)`, transformOrigin: 'bottom' }}
                />
            </div>
        </div>
    )
}

function ModernDigitalWatchface({ time }: { time: Date | null }) {
    const formattedTime = time ? time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }) : '10:08';
    const formattedDay = time ? time.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase() : 'FRI';
    const formattedDate = time ? time.getDate() : '18';

    return (
        <div className="w-full h-full bg-black text-white flex flex-col justify-between p-8 font-sans">
            {/* Background bubbles */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-500/20 rounded-full filter blur-2xl"></div>
                <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-purple-500/20 rounded-full filter blur-2xl"></div>
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/4 -translate-y-1/4 w-32 h-32 bg-cyan-500/10 rounded-full filter blur-xl"></div>
            </div>

            <div className="relative">
                <p className="text-7xl font-bold tracking-tighter">{formattedTime.split(':')[0]}</p>
                <p className="text-7xl font-bold tracking-tighter -mt-4">{formattedTime.split(':')[1]}</p>
            </div>
            
            <div className="relative flex justify-between items-end">
                <div>
                     <p className="text-lg text-white/80">{formattedDay}</p>
                    <p className="text-lg font-semibold">{formattedDate}</p>
                </div>
                 <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 p-2 rounded-full bg-white/10 backdrop-blur-sm">
                        <Footprints className="h-5 w-5 text-blue-400"/>
                        <div>
                            <p className="font-bold">7645</p>
                            <p className="text-xs text-white/70">steps</p>
                        </div>
                    </div>
                     <div className="flex items-center gap-2 p-2 rounded-full bg-white/10 backdrop-blur-sm">
                        <Flame className="h-5 w-5 text-orange-400"/>
                        <div>
                            <p className="font-bold">280</p>
                            <p className="text-xs text-white/70">kcal</p>
                        </div>
                    </div>
                 </div>
            </div>
        </div>
    )
}

function TownsquareApp({ briefing }: { briefing: FacsimileOutput | null }) {
    return (
        <div className="w-full h-full p-6 text-white overflow-y-auto">
            <h2 className="text-center font-bold text-lg mb-4">Townsquare</h2>
            <div className="space-y-3 text-sm text-left">
                {briefing ? (
                    briefing.headlines.map((line, i) => (
                        <div key={i} className="pb-2 border-b border-gray-700">
                            <p className="font-semibold">{line.split(':')[0]}</p>
                            <p className="text-xs text-gray-400">{line.split(':')[1]}</p>
                        </div>
                    ))
                ) : (
                    <div className="space-y-3">
                        {Array(5).fill(0).map((_, i) => (
                            <div key={i} className="pb-2 border-b border-gray-700">
                                <Skeleton className="h-4 w-3/4 bg-gray-600" />
                                <Skeleton className="h-3 w-full mt-1 bg-gray-600" />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

function AppGrid({ onSelectApp }: { onSelectApp: (screen: WatchScreen) => void }) {
    const apps = [
        { name: 'Townsquare', icon: <MessageSquare />, screen: 'townsquare' },
        { name: 'Weather', icon: <SunMedium />, screen: 'newsTicker' },
        { name: 'Activity', icon: <Footprints />, screen: 'newsTicker' },
        { name: 'Profile', icon: <User />, screen: 'newsTicker' },
        { name: 'Settings', icon: <Power />, screen: 'newsTicker' },
    ]
    return (
        <div className="w-full h-full p-8 text-white overflow-y-auto flex flex-col justify-center">
            <div className="grid grid-cols-3 gap-6">
                {apps.map(app => (
                    <button key={app.name} onClick={() => onSelectApp(app.screen as WatchScreen)} className="flex flex-col items-center gap-1 text-center">
                        <div className="h-12 w-12 rounded-full bg-gray-700 flex items-center justify-center">
                            {app.icon}
                        </div>
                        <p className="text-xs">{app.name}</p>
                    </button>
                ))}
            </div>
        </div>
    )
}

export default function SmartwatchPage() {
    const [briefing, setBriefing] = useState<FacsimileOutput | null>(null);
    const [time, setTime] = useState<Date | null>(null);
    const [activeScreen, setActiveScreen] = useState<WatchScreen>('analog');
    const [bezel, setBezel] = useState<BezelShape>('square');

    useEffect(() => {
        const fetchBriefing = async () => {
            try {
                const result = await generateFacsimile();
                setBriefing(result);
            } catch (error) {
                console.error("Failed to generate briefing:", error);
            }
        };
        fetchBriefing();

        const timer = setInterval(() => setTime(new Date()), 1000);
        setTime(new Date());
        return () => clearInterval(timer);
    }, []);
    
    useEffect(() => {
        // Set default watch face based on bezel shape
        setActiveScreen(bezel === 'square' ? 'modernDigital' : 'analog');
    }, [bezel]);

    const renderScreen = () => {
        switch (activeScreen) {
            case 'appGrid':
                return <AppGrid onSelectApp={setActiveScreen} />;
            case 'townsquare':
                return <TownsquareApp briefing={briefing} />;
            case 'newsTicker':
                return <NewsTickerWatchface briefing={briefing} time={time} />;
            case 'analog':
                return <AnalogWatchface time={time} />;
            case 'modernDigital':
                 return <ModernDigitalWatchface time={time} />;
            default:
                return <AnalogWatchface time={time} />;
        }
    };
    
    const toggleAppGrid = () => {
        setActiveScreen(prev => prev === 'appGrid' ? (bezel === 'round' ? 'analog' : 'modernDigital') : 'appGrid');
    }

    return (
        <div className="bg-gray-900 flex items-center justify-center h-screen">
            <div className="absolute top-4 right-4 z-20 flex gap-2">
                 <Button onClick={() => setBezel(b => b === 'round' ? 'square' : 'round')} variant="outline" className="bg-gray-800 text-white hover:bg-gray-700 hover:text-white border-gray-600">
                    <Square className="mr-2 h-4 w-4" />
                    Toggle Bezel
                </Button>
            </div>
            <div className={cn(
                "relative bg-[#333] p-1.5 shadow-2xl transition-all duration-300",
                bezel === 'round' ? "w-80 h-80 rounded-full" : "w-[330px] h-[380px] rounded-[50px]"
            )}>
                <div className="relative bg-black w-full h-full flex flex-col items-center justify-center overflow-hidden rounded-[inherit]">
                    {renderScreen()}
                </div>

                {bezel === 'round' ? (
                     <>
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full w-24 h-6 bg-[#F3F3F3]">
                            <div className="h-1 w-1 bg-blue-500 rounded-full absolute bottom-1 left-2"></div>
                        </div>
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-24 h-6 bg-[#F3F3F3]">
                            <div className="h-1 w-1 bg-orange-500 rounded-full absolute top-1 right-2"></div>
                        </div>
                        <button onClick={toggleAppGrid} className="absolute top-1/2 -translate-y-1/2 -right-9 w-8 h-20 flex flex-col justify-around items-center">
                            <div className="w-2 h-6 bg-[#D8C6B5] rounded-full border border-gray-500 shadow-sm"></div>
                             <div className="w-2 h-6 bg-[#D8C6B5] rounded-full border border-gray-500 shadow-sm"></div>
                        </button>
                    </>
                ) : (
                     <button onClick={toggleAppGrid} className="absolute top-1/2 -translate-y-1/2 -right-8 w-6 h-28 flex flex-col justify-center items-center">
                         <div className="w-4 h-12 bg-gray-500 rounded-lg border-2 border-gray-700 shadow-sm cursor-pointer"></div>
                    </button>
                )}
            </div>
             <style jsx>{`
                @keyframes marquee-vertical {
                    0% { transform: translateY(0%); }
                    100% { transform: translateY(-50%); }
                }
                .animate-marquee-vertical {
                    animation: marquee-vertical 20s linear infinite;
                }
            `}</style>
        </div>
    );
}
