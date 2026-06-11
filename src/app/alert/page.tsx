
'use client';

import { Button } from '@/components/ui/button';
import { useSearchParams } from 'next/navigation';
import { Suspense, useState, useEffect } from 'react';
import { alertTypes } from '@/lib/data/alert-data';

function AlertContent() {
    const searchParams = useSearchParams();
    const type = searchParams.get('type') as keyof typeof alertTypes;
    const alert = alertTypes[type] || alertTypes.earthquake;
    const [currentTime, setCurrentTime] = useState<string | null>(null);

    useEffect(() => {
        const timer = setInterval(() => {
             setCurrentTime(new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }));
        }, 1000);
        
        // Set initial time on mount
        setCurrentTime(new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }));
        
        return () => clearInterval(timer);
    }, []);
    
    return (
        <div className="h-screen w-full flex flex-col font-sans">
            <div className={`${alert.bgColor} text-black pt-12 pb-8 px-6 flex-grow-[3] flex flex-col justify-center items-center text-center`}>
                {alert.icon}
                <h1 className="text-5xl font-bold">{alert.title}</h1>
                <p className="text-xl mt-2">{alert.details}</p>
            </div>
            <div className="bg-[#212121] text-white flex-grow-[7] px-6 py-8 flex flex-col justify-between">
                <div>
                    <h2 className="text-4xl font-bold mb-6">WHAT TO DO NOW</h2>
                    <div className="space-y-5 text-2xl">
                        {alert.instructions.map((inst, index) => (
                            <p key={index}>{inst.name}</p>
                        ))}
                    </div>
                </div>
                <div className="text-center">
                    {currentTime ? (
                         <p className="text-sm text-gray-400 mb-4">
                            Emergency Alert &bull; {currentTime}
                        </p>
                    ): (
                         <p className="text-sm text-gray-400 mb-4 h-5 animate-pulse w-40 bg-gray-600 rounded-md mx-auto"></p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function AlertPage() {
    return (
        <Suspense fallback={<div>Loading alert...</div>}>
            <AlertContent />
        </Suspense>
    )
}
