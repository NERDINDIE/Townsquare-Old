
'use client';

import type { FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
    Book, Newspaper, Search, UserCircle, Tags, Landmark, Compass, 
    ShoppingBag, ToyBrick, ShoppingCart, Utensils, 
    MapPin, Car, Mailbox, Download, CandlestickChart, Gamepad2, 
    Radio, Tv, Smile, Cloud, ClipboardPen, PlusCircle, FileText, Video, 
    Rss, Mic, Shield, ImageIcon, Clapperboard, Heart, PenTool, 
    Flame, HeartPulse, Globe, BookMarked, BookCopy, BookOpen,
    Voicemail, LogOut, Swords, Music, Postcard, Ticket, Tractor, Cog,
    Luggage, Palmtree, Grid, MessageSquareQuote, Link as LinkIcon
} from '@/components/icons.tsx';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useState, useEffect, useTransition } from 'react';
import { cn } from '@/lib/utils';
import { ClientOnly } from '@/components/client-only';
import { logout } from '@/lib/session';
import { useWordmark } from '@/context/wordmark-context';
import { EditionSwitcher } from '@/components/EditionSwitcher';


const userBrands = [
    { name: 'My Gaming Channel', slug: 'my-gaming-channel', icon: <Gamepad2 /> },
    { name: 'Jane\'s Recipes', slug: 'janes-recipes', icon: <Utensils /> },
];


export function Header() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isPride, setIsPride] = useState(false);
  const { wordmark, defaultWordmark } = useWordmark();
  const [displayWordmark, setDisplayWordmark] = useState(defaultWordmark);
  const [currentTime, setCurrentTime] = useState<Date | null>(null);


  useEffect(() => {
      const checkPrideTheme = () => {
          const font = localStorage.getItem('font');
          const customWordmark = localStorage.getItem('wordmark');
          setIsPride(font === 'pride');
          setDisplayWordmark(wordmark || customWordmark || defaultWordmark);
      };
      checkPrideTheme();
      window.addEventListener('storage', checkPrideTheme);
      return () => window.removeEventListener('storage', checkPrideTheme);
  }, [wordmark, defaultWordmark]);

   useEffect(() => {
    setCurrentTime(new Date());
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    startTransition(async () => {
      await logout();
      router.refresh();
    });
  };
  
  const formattedDate = currentTime 
    ? new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(currentTime)
    : '...';
    
  const formattedTime = currentTime
    ? new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).format(currentTime)
    : '...';

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <ClientOnly>
        <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
            <div className="flex items-center gap-2">
                <Link href="/" className="flex items-center space-x-2">
                    <span className={cn(
                        "font-headline text-2xl font-bold uppercase tracking-wider",
                        isPride ? 'rainbow-text' : 'text-primary'
                    )}>
                    {isPride ? (
                        <>
                            <span style={{color: '#ef4444'}}>T</span>
                            <span style={{color: '#f97316'}}>o</span>
                            <span style={{color: '#eab308'}}>w</span>
                            <span style={{color: '#84cc16'}}>n</span>
                            <span style={{color: '#22c55e'}}>s</span>
                            <span style={{color: '#14b8a6'}}>q</span>
                            <span style={{color: '#06b6d4'}}>u</span>
                            <span style={{color: '#3b82f6'}}>a</span>
                            <span style={{color: '#8b5cf6'}}>r</span>
                            <span style={{color: '#d946ef'}}>e</span>
                        </>
                    ) : displayWordmark}
                    </span>
                </Link>
            </div>
            
            <div className="text-right">
                <EditionSwitcher />
                 {currentTime ? (
                    <p className="text-xs text-muted-foreground">{formattedDate}/{formattedTime}</p>
                ) : (
                    <div className="h-4 w-48 bg-muted rounded-md animate-pulse" />
                )}
            </div>
        </div>
      </ClientOnly>
    </header>
  );
}
