
'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Cloud, HeartPulse, Footprints, BedDouble, Sun, Moon, Pencil, Trash2, Eraser, Calculator, BookMarked, Music, Tv, CandlestickChart, Map, Image as ImageIcon, Calendar, Disc3, Mail, CalculatorIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';

function Widget({ children, className, ...props }: React.ComponentProps<typeof Card>) {
  return (
    <Card className={cn("bg-black/20 backdrop-blur-md text-white border-white/20 shadow-lg flex flex-col", className)} {...props}>
      {children}
    </Card>
  );
}

function TimeDateWidget() {
    const [time, setTime] = useState<Date | null>(null);

    useEffect(() => {
        setTime(new Date());
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formattedTime = time ? time.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }) : '...';
    const formattedDate = time ? time.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }) : '...';

    return (
        <Widget className="col-span-2 md:col-span-2 flex flex-col justify-center items-center text-center">
            <p className="text-6xl md:text-8xl font-bold tracking-tighter">{formattedTime}</p>
            <p className="text-lg md:text-xl text-white/80">{formattedDate}</p>
        </Widget>
    );
}

function WeatherWidget() {
    return (
        <Widget className="flex flex-col justify-center items-center">
            <Sun className="h-12 w-12 text-yellow-300" />
            <p className="text-4xl font-bold mt-2">15°</p>
            <p className="text-white/80">Sunny</p>
        </Widget>
    );
}

function HealthWidget() {
     return (
        <Widget className="p-4 space-y-3">
            <div className="flex items-center gap-2">
                <HeartPulse className="h-5 w-5 text-red-400" />
                <p className="text-sm text-white/80">Heart Rate</p>
                <p className="ml-auto font-bold">72 <span className="text-xs font-normal">bpm</span></p>
            </div>
             <div className="flex items-center gap-2">
                <Footprints className="h-5 w-5 text-blue-400" />
                <p className="text-sm text-white/80">Steps</p>
                <p className="ml-auto font-bold">8,452</p>
            </div>
            <div className="flex items-center gap-2">
                <BedDouble className="h-5 w-5 text-purple-400" />
                <p className="text-sm text-white/80">Sleep</p>
                <p className="ml-auto font-bold">7h 32m</p>
            </div>
        </Widget>
    );
}

function CalculatorWidget() {
    const [display, setDisplay] = useState('0');

    const handleInput = (input: string) => {
        if (display === '0' && input !== '.') {
            setDisplay(input);
        } else {
            setDisplay(prev => prev + input);
        }
    }
    
    const calculate = () => {
        try {
            // Using eval is not safe for production, but okay for a prototype.
            const result = eval(display.replace(/x/g, '*').replace(/÷/g, '/'));
            setDisplay(String(result));
        } catch (error) {
            setDisplay('Error');
        }
    }

    const clear = () => setDisplay('0');

    const buttons = ['7','8','9','÷','4','5','6','x','1','2','3','-','0','.','=','+'];
    
    return (
        <Widget className="col-span-2">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base"><CalculatorIcon className="h-5 w-5"/> Calculator</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-2">
                <div className="bg-black/40 rounded-md p-2 text-right text-4xl font-mono break-all">{display}</div>
                <div className="grid grid-cols-4 gap-2 flex-1">
                    {buttons.map(btn => (
                         <Button key={btn} onClick={() => btn === '=' ? calculate() : handleInput(btn)} variant="outline" className="text-xl bg-white/10 border-white/20 hover:bg-white/20 h-full">{btn}</Button>
                    ))}
                </div>
                <Button onClick={clear} variant="destructive" className="w-full mt-2">Clear</Button>
            </CardContent>
        </Widget>
    );
}

function NotepadWidget() {
    const [note, setNote] = useState('');
    
    useEffect(() => {
        const savedNote = localStorage.getItem('widget-notepad');
        if (savedNote) setNote(savedNote);
    }, []);

    const handleSave = () => {
        localStorage.setItem('widget-notepad', note);
    }
    
    return (
        <Widget className="col-span-2">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base"><BookMarked className="h-5 w-5"/> Notepad</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
                <Textarea 
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    onBlur={handleSave}
                    className="flex-1 bg-white/5 border-white/20 text-white placeholder:text-white/50 resize-none"
                    placeholder="Jot down a quick note..."
                />
            </CardContent>
        </Widget>
    )
}

function PlaceholderWidget({ icon, title }: { icon: React.ReactNode, title: string }) {
    return (
        <Widget className="items-center justify-center text-center p-4">
            {icon}
            <p className="mt-2 font-semibold">{title}</p>
            <p className="text-xs text-white/60">Coming Soon</p>
        </Widget>
    )
}

export default function WidgetsHome() {
  return (
    <div className="bg-gray-900 text-white min-h-screen p-4 md:p-6">
        <main className="grid grid-cols-2 md:grid-cols-4 auto-rows-[150px] gap-4">
            <TimeDateWidget />
            <WeatherWidget />
            <HealthWidget />
            <CalculatorWidget />
            <NotepadWidget />
            <PlaceholderWidget icon={<Music className="h-8 w-8 text-green-400" />} title="Media Player" />
            <PlaceholderWidget icon={<Tv className="h-8 w-8 text-blue-400" />} title="TV/Radio Guide" />
            <PlaceholderWidget icon={<CandlestickChart className="h-8 w-8 text-pink-400" />} title="Stock Markets" />
            <PlaceholderWidget icon={<Map className="h-8 w-8 text-orange-400" />} title="Maps" />
            <PlaceholderWidget icon={<ImageIcon className="h-8 w-8 text-purple-400" />} title="Photos" />
            <PlaceholderWidget icon={<Calendar className="h-8 w-8 text-red-400" />} title="Calendar" />
            <PlaceholderWidget icon={<Disc3 className="h-8 w-8 text-teal-400" />} title="Song Finder" />
            <PlaceholderWidget icon={<Mail className="h-8 w-8 text-indigo-400" />} title="Email" />
        </main>
    </div>
  );
}
