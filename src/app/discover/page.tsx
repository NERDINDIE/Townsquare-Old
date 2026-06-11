

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { brands } from '@/lib/brands';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Book, Newspaper, Compass, MessageSquareQuote, Mailbox, Voicemail, ShoppingBag, ToyBrick, BookCopy, Download, Radio, Tv, HeartPulse, Music, FileText, Globe, BookMarked, Beaker, Tags, Bell, PlusCircle, Settings, UserCircle, BookCheck, Bus, Utensils, ScanLine, Languages, MessageSquare, Flag, Briefcase, Phone, Heart, Users, Smartphone, Lock, Clapperboard, ImageIcon, PenTool, AppWindow } from '@/components/icons';
import React from 'react';
import { Separator } from '@/components/ui/separator';


const apps = [
    { href: '/discover', icon: <Compass className="h-8 w-8" />, label: 'Discover' },
    { href: '/the-rack', icon: <Newspaper className="h-8 w-8" />, label: 'The Rack' },
    { href: '/tv-guide', icon: <Tv className="h-8 w-8" />, label: 'TV Guide' },
    { href: '/letters', icon: <MessageSquareQuote className="h-8 w-8" />, label: 'Letters' },
    { href: '/mailbox', icon: <Mailbox className="h-8 w-8" />, label: 'Mailbox' },
    { href: '/voicemail', icon: <Voicemail className="h-8 w-8" />, label: 'Voicemail' },
    { href: '/marketplace', icon: <ShoppingBag className="h-8 w-8" />, label: 'Marketplace' },
    { href: '/playground', icon: <ToyBrick className="h-8 w-8" />, label: 'Playground' },
    { href: '/contextual-companion', icon: <BookCopy className="h-8 w-8" />, label: 'Companion' },
    { href: '/dictionary', icon: <Book className="h-8 w-8" />, label: 'Dictionary' },
    { href: '/dlc', icon: <Download className="h-8 w-8" />, label: 'DLC' },
    { href: '/on-air', icon: <Radio className="h-8 w-8" />, label: 'On Air' },
    { href: '/teletext', icon: <Tv className="h-8 w-8" />, label: 'Teletext' },
    { href: '/broadcast', icon: <Radio className="h-8 w-8" />, label: 'Broadcast' },
    { href: '/health', icon: <HeartPulse className="h-8 w-8" />, label: 'Health' },
    { href: '/ringtone-composer', icon: <Music className="h-8 w-8" />, label: 'Ringtone' },
    { href: '/legal', icon: <FileText className="h-8 w-8" />, label: 'Legal' },
    { href: '/browser', icon: <Globe className="h-8 w-8" />, label: 'Browser' },
    { href: '/notebook', icon: <BookMarked className="h-8 w-8" />, label: 'Notebook' },
    { href: '/testing-ground', icon: <Beaker className="h-8 w-8" />, label: 'Testing' },
    { href: '/sections', icon: <Tags className="h-8 w-8" />, label: 'Sections' },
    { href: '/subscriptions', icon: <Bell className="h-8 w-8" />, label: 'Subscriptions' },
    { href: '/discover-publications', icon: <PlusCircle className="h-8 w-8" />, label: 'Discover' },
    { href: '/fact-checker', icon: <BookCheck className="h-8 w-8" />, label: 'Fact Checker' },
    { href: '/profile', icon: <UserCircle className="h-8 w-8" />, label: 'Profile' },
    { href: '/settings', icon: <Settings className="h-8 w-8" />, label: 'Settings' },
    { href: '/transit', icon: <Bus className="h-8 w-8" />, label: 'Transit' },
    { href: '/takeouts', icon: <Utensils className="h-8 w-8" />, label: 'Takeouts' },
    { href: '/scanner', icon: <ScanLine className="h-8 w-8" />, label: 'Scanner' },
    { href: '/language-tutor', icon: <Languages className="h-8 w-8" />, label: 'Tutor' },
    { href: '/propaganda-defector', icon: <Flag className="h-8 w-8" />, label: 'Defector' },
    { href: '/exchange', icon: <Briefcase className="h-8 w-8" />, label: 'Exchange' },
    { href: '/phonebox', icon: <Phone className="h-8 w-8" />, label: 'Phonebox' },
    { href: '/rendezvous', icon: <Heart className="h-8 w-8" />, label: 'Rendezvous' },
    { href: '/account-types', icon: <Users className="h-8 w-8" />, label: 'Account Types' },
    { href: '/superapp', icon: <AppWindow className="h-8 w-8" />, label: 'Superapp' },
    { href: '/bada-os', icon: <Smartphone className="h-8 w-8" />, label: 'Bada OS' },
    { href: '/hnios', icon: <Smartphone className="h-8 w-8" />, label: 'iOS Classic' },
    { href: '/symbian-menu', icon: <Smartphone className="h-8 w-8" />, label: 'Symbian' },
    { href: '/android-one', icon: <Smartphone className="h-8 w-8" />, label: 'Android 1.0' },
];

const aiCreations = [
    { href: '/create/ai/video', icon: <Clapperboard className="h-8 w-8" />, label: 'AI Video Creator' },
    { href: '/create/ai/image', icon: <ImageIcon className="h-8 w-8" />, label: 'AI Image Creator' },
    { href: '/poem-generator', icon: <PenTool className="h-8 w-8" />, label: 'AI Poem Generator' },
];


const AppIcon = ({ href, icon, label }: { href: string; icon: React.ReactNode; label: string; }) => (
    <Link href={href} className="flex flex-col items-center gap-2 text-center group">
        <Card className="h-16 w-16 flex items-center justify-center bg-muted/50 group-hover:bg-primary/10 transition-colors">
            <CardContent className="p-0 text-primary group-hover:text-primary/80">
                {icon}
            </CardContent>
        </Card>
        <p className="text-xs font-medium text-foreground truncate w-full">{label}</p>
    </Link>
);

const getBrandLink = (slug: string) => {
    const pageRoutes = [
        'arcade-saloon', 'bulletin-board', 'on-air', 'broadcast', 'weatherman',
        'bookworm', 'tyres', 'remote-control', 'map-pin', 'the-rack', 'dlc',
        'the-community-post', 'the-downtown-dish', 'the-urbanist',
        'the-business-beat', 'city-soundwaves', 'orientations', 'funnies',
        'retro', 'anime-shinbun', 'editor-pro', 'fandom-times', 'tickets',
        'yeast', 'townsquares', 'matches', 'exchange', 'rendezvous',
        'star-chart', 'silver-screen', 'tech-pulse', 'game-on', 'vitality',
        'the-curator', 'aura', 'the-grapevine'
    ];
    if (pageRoutes.includes(slug)) {
        return `/${slug}`;
    }
    return `/articles?category=${slug}`;
}

export default function DiscoverPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <header className="mb-8 text-center">
        <h1 className="font-headline text-5xl font-bold">Discover</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Explore apps, tools, and content from our partners and brands.
        </p>
      </header>

      <section className='mb-12'>
        <h2 className="font-headline text-3xl font-bold mb-6">AI Creations</h2>
         <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-y-8 gap-x-4">
            {aiCreations.map(app => (
                <AppIcon key={app.href} {...app} />
            ))}
        </div>
      </section>

      <Separator />

      <section className='my-12'>
        <h2 className="font-headline text-3xl font-bold mb-6">Apps</h2>
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-y-8 gap-x-4">
            {apps.map(app => (
                <AppIcon key={app.href} {...app} />
            ))}
        </div>
      </section>

      <Separator />

      <section className="mt-12">
         <h2 className="font-headline text-3xl font-bold mb-6">Brands</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {brands.map((brand, index) => (
            <Link key={brand.slug} href={getBrandLink(brand.slug)} className="group block">
                <Card 
                    className="relative overflow-hidden aspect-[9/16] rounded-lg transition-all duration-300 ease-in-out hover:shadow-2xl hover:scale-105"
                    style={{
                        '--brand-color': `hsl(var(--brand-${brand.slug}))`,
                    } as React.CSSProperties}
                >
                    <Image
                        src={brand.image}
                        alt={brand.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                        data-ai-hint={brand.dataAiHint}
                    />
                    <div 
                        className="absolute inset-0"
                        style={{
                            background: `linear-gradient(to top, var(--brand-color) 0%, transparent 50%)`,
                            opacity: 0.8
                        }}
                    />
                    <div className="relative flex h-full flex-col justify-between p-4 text-white">
                        <h2 className="font-headline text-2xl font-bold tracking-tighter text-shadow-lg">{brand.name}</h2>
                        <p className="text-sm font-semibold text-shadow">{brand.description}</p>
                    </div>
                </Card>
            </Link>
            ))}
        </div>
      </section>
    </div>
  );
}
