
'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Cloud, HeartPulse, Footprints, BedDouble, Sun, Moon, Pencil, Trash2, Eraser, ToyBrick, Utensils, BookOpen, Calendar, Bot } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';

function Widget({ children, className, ...props }: React.ComponentProps<typeof Card>) {
  return (
    <Card className={cn("bg-black/20 backdrop-blur-md text-white border-white/20 shadow-lg", className)} {...props}>
      {children}
    </Card>
  );
}

const AppWidget = ({ href, icon, title, description }: { href: string, icon: React.ReactNode, title: string, description: string }) => (
    <Link href={href} className="block h-full">
        <Widget className="flex flex-col justify-between hover:bg-black/40 transition-colors duration-200 h-full">
            <CardHeader className="flex-row items-center gap-4 space-y-0 p-4">
                <div className="h-10 w-10 bg-white/10 rounded-lg flex items-center justify-center">
                    {icon}
                </div>
                <CardTitle className="text-lg">{title}</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
                <p className="text-sm text-white/80">{description}</p>
            </CardContent>
        </Widget>
    </Link>
);


export default function DashboardHome() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: false });
  const formattedDate = time.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <div className="relative h-screen min-h-[800px] w-full text-foreground">
      <Image
        src="https://placehold.co/1200x800.png"
        alt="Sunset clouds"
        fill
        className="z-0 object-cover"
        priority
        data-ai-hint="sunset sky"
      />
      <div className="absolute inset-0 bg-background/30" />
      <div className="relative z-10 flex h-full flex-col p-6 md:p-8">
        <main className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Left Column */}
            <div className="flex flex-col gap-6">
                <Widget className="flex-grow flex flex-col justify-center items-center text-center">
                    <p className="text-lg font-medium text-foreground/90">{formattedDate}</p>
                    <p className="text-8xl font-bold tracking-tighter my-1">{formattedTime}</p>
                </Widget>
                 <Widget className="flex items-center justify-around text-center">
                    <div className="flex items-center gap-3">
                        <Cloud className="h-8 w-8 text-foreground/80" />
                        <div>
                            <p className="font-bold text-xl">15°</p>
                            <p className="text-sm text-foreground/80">Cloudy</p>
                        </div>
                    </div>
                    <div className="text-sm text-foreground/80">
                        <p>H: 21°</p>
                        <p>L: 13°</p>
                    </div>
                 </Widget>
            </div>

            {/* Middle Column */}
             <div className="flex flex-col gap-6">
                <AppWidget 
                    href="/poem-generator"
                    icon={<BookOpen className="h-6 w-6" />}
                    title="Poem Generator"
                    description="Create beautiful poetry from your favorite images."
                />
                 <AppWidget 
                    href="/recipe-generator"
                    icon={<Utensils className="h-6 w-6" />}
                    title="Recipe Generator"
                    description="Snap a picture of your ingredients and get a custom recipe."
                />
            </div>
            
            {/* Right Column */}
             <div className="flex flex-col gap-6">
                 <AppWidget 
                    href="/day-planner"
                    icon={<Calendar className="h-6 w-6" />}
                    title="Day Planner"
                    description="Let AI help you organize your tasks and conquer your day."
                />
                <Link href="/playground" className="block">
                     <Widget className="flex flex-col items-start gap-1 p-4 h-full hover:bg-black/40 transition-colors">
                        <ToyBrick className="h-6 w-6 text-yellow-400" />
                        <p className="text-sm text-foreground/80 mt-auto">Playground</p>
                        <p className="text-xl font-bold">Fun & Games</p>
                    </Widget>
                </Link>
            </div>
        </main>
      </div>
    </div>
  );
}
