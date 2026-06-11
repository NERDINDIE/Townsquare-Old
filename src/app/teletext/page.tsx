
'use client';

import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

const pages = {
    100: {
        title: "TOWNSQUARE",
        graphic: true,
        content: [],
        colors: []
    },
    101: {
        title: "NEWS",
        graphic: false,
        content: [
            "  Mayor announces new park project.",
            "",
            "  City council to vote on new",
            "  recycling initiative next week.",
            "",
            "  Local library extends hours.",
            "",
            "  Annual street fair was a success.",
        ],
        colors: ['cyan', 'white', 'white', 'white', 'white', 'white', 'white', 'white']
    },
    102: {
        title: "WEATHER",
        graphic: false,
        content: [
            "  TONIGHT..Partly cloudy. Lo 23.",
            "",
            "  TOMORROW.Sunny intervals. Hi 28.",
            "",
            "  MONDAY...Showers. Hi 25.",
            "",
            "  TUESDAY..Mainly dry. Hi 26.",
        ],
        colors: ['cyan', 'white', 'white', 'white', 'white', 'white', 'white']
    },
    103: {
        title: "SPORT",
        graphic: false,
        content: [
            "  Town FC win 3-0 against rivals.",
            "",
            "  Local hero wins marathon.",
            "",
            "  Next basketball game on Friday.",
            "",
            "  Sign-ups for summer swim team open.",
        ],
        colors: ['cyan', 'white', 'white', 'white', 'white', 'white', 'white']
    },
    default: {
        title: "PAGE NOT FOUND",
        graphic: false,
        content: ["","  Please try another page number."],
        colors: ['red', 'white', 'white']
    }
} as const;

type PageKey = keyof typeof pages;

const colorClasses = {
    black: 'text-black bg-black',
    red: 'text-red-500',
    green: 'text-green-500',
    yellow: 'text-yellow-500',
    blue: 'text-blue-500',
    magenta: 'text-magenta-500',
    cyan: 'text-cyan-400',
    white: 'text-white',
};

const bgClasses = {
    red: 'bg-red-500',
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
    blue: 'bg-blue-500',
    cyan: 'bg-cyan-400',
    white: 'bg-white',
    black: 'bg-black',
};

function TeletextGraphic() {
    return (
        <div className="flex flex-col items-center justify-center h-full font-mono text-center select-none">
            <div className="flex">
                <div className={cn(bgClasses.cyan, "w-8 h-8")}></div>
                <div className={cn(bgClasses.cyan, "w-8 h-8")}></div>
                <div className={cn(bgClasses.black, "w-8 h-8")}></div>
                <div className={cn(bgClasses.black, "w-8 h-8")}></div>
                <div className={cn(bgClasses.yellow, "w-8 h-8")}></div>
                <div className={cn(bgClasses.yellow, "w-8 h-8")}></div>
            </div>
            <div className="flex">
                 <div className={cn(bgClasses.cyan, "w-8 h-8")}></div>
                 <div className={cn(bgClasses.black, "w-8 h-8")}></div>
                 <div className={cn(bgClasses.black, "w-8 h-8")}></div>
                 <div className={cn(bgClasses.cyan, "w-8 h-8")}></div>
                 <div className={cn(bgClasses.yellow, "w-8 h-8")}></div>
                 <div className={cn(bgClasses.black, "w-8 h-8")}></div>
            </div>
             <div className="flex mt-4">
                <p className="text-yellow-400">NEWS<span className="text-white">.....</span><span className="text-cyan-400">101</span></p>
            </div>
            <div className="flex mt-2">
                <p className="text-yellow-400">WEATHER<span className="text-white">..</span><span className="text-cyan-400">102</span></p>
            </div>
             <div className="flex mt-2">
                <p className="text-yellow-400">SPORT<span className="text-white">....</span><span className="text-cyan-400">103</span></p>
            </div>
        </div>
    )
}


export default function TeletextPage() {
    const [pageNumber, setPageNumber] = useState('100');
    const [currentPage, setCurrentPage] = useState(pages[100]);
    const [time, setTime] = useState(new Date());
    const [isOffline, setIsOffline] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        
        if (typeof window !== 'undefined') {
            setIsOffline(!navigator.onLine);
        }

        const handleOffline = () => setIsOffline(true);
        const handleOnline = () => setIsOffline(false);

        window.addEventListener('offline', handleOffline);
        window.addEventListener('online', handleOnline);

        return () => {
            clearInterval(timer);
            window.removeEventListener('offline', handleOffline);
            window.removeEventListener('online', handleOnline);
        };
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value.slice(0, 3);
        setPageNumber(input);
        if (input.length === 3) {
            const pageKey = parseInt(input) as PageKey;
            setCurrentPage(pages[pageKey] || pages.default);
        }
    };
    
    return (
        <div 
            className="flex flex-col h-screen bg-black text-white p-2 sm:p-4 text-xl sm:text-2xl font-teletext"
        >
            <header className="flex justify-between items-center bg-blue-500 px-2">
                <span className={cn(colorClasses['white'])}>{currentPage.title}</span>
                <span className="text-white">{time.toLocaleTimeString()}</span>
            </header>
            <main className="flex-1 bg-black p-2 mt-2 flex flex-col">
                 {currentPage.graphic ? (
                    <TeletextGraphic />
                ) : (
                    <div className='flex-1'>
                    {currentPage.content.map((line, index) => (
                        <div key={index} className={cn(
                            "whitespace-pre",
                            colorClasses[currentPage.colors[index] as keyof typeof colorClasses] || 'text-white'
                            )}>
                            {line}
                        </div>
                    ))}
                    </div>
                )}
            </main>
            <footer className="bg-black p-2 flex items-center justify-between mt-2">
                <div className="flex gap-4">
                    {isOffline ? (
                         <span className="text-yellow-500">OFFLINE: Updates from airwaves</span>
                    ) : (
                         <>
                            <span className="text-red-500">NEWS</span>
                            <span className="text-green-500">WEATHER</span>
                            <span className="text-yellow-500">SPORT</span>
                            <span className="text-blue-500">TV</span>
                        </>
                    )}
                </div>
                 <input
                    type="text"
                    value={pageNumber}
                    onChange={handleInputChange}
                    maxLength={3}
                    className="bg-gray-800 text-white w-20 text-center focus:outline-none"
                    placeholder="P100"
                />
            </footer>
        </div>
    );
}
