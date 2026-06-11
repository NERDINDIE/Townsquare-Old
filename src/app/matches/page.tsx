
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';
import { Swords } from '@/components/icons';

const footballTeams = [
    { name: 'Quantum FC', logo: 'https://placehold.co/100x100/3B82F6/FFFFFF?text=QFC', colors: 'from-blue-600 to-blue-800', record: '15-5-3' },
    { name: 'Nova Strikers', logo: 'https://placehold.co/100x100/F59E0B/000000?text=NS', colors: 'from-amber-500 to-yellow-600', record: '12-8-3' },
    { name: 'Apex Wanderers', logo: 'https://placehold.co/100x100/10B981/FFFFFF?text=AW', colors: 'from-emerald-500 to-green-700', record: '10-10-3' },
];

const basketballTeams = [
    { name: 'Celestial Hoops', logo: 'https://placehold.co/100x100/8B5CF6/FFFFFF?text=CH', colors: 'from-violet-500 to-purple-700', record: '20-8' },
    { name: 'Vortex Vipers', logo: 'https://placehold.co/100x100/EF4444/FFFFFF?text=VV', colors: 'from-red-500 to-rose-700', record: '18-10' },
];

const americanFootballTeams = [
    { name: 'Grit Iron Giants', logo: 'https://placehold.co/100x100/4B5563/FFFFFF?text=GIG', colors: 'from-gray-600 to-slate-800', record: '8-4' },
];

const TeamHeader = ({ name, logo, colors, record }: { name: string, logo: string, colors: string, record: string }) => (
    <Card className={`overflow-hidden text-white relative border-0 shadow-lg`}>
        <div className={`absolute inset-0 bg-gradient-to-br ${colors} opacity-80`}></div>
        <div className="relative p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16 border-2 border-white/50">
                    <AvatarImage src={logo} alt={`${name} logo`} />
                    <AvatarFallback>{name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                    <h3 className="text-2xl font-bold">{name}</h3>
                    <p className="text-sm opacity-80">Record: {record}</p>
                </div>
            </div>
            <Button variant="ghost" className="text-white hover:bg-white/20">Follow</Button>
        </div>
    </Card>
);

export default function MatchesPage() {
    return (
        <div 
            className="container mx-auto max-w-4xl px-4 py-8 md:py-12"
            style={{ '--brand-color': 'hsl(var(--brand-matches))' } as React.CSSProperties}
        >
            <header className="mb-12">
                <h1 className="font-headline text-5xl font-bold flex items-center gap-3" style={{ color: 'var(--brand-color)' }}>
                    <Swords className="h-12 w-12" />
                    Matches
                </h1>
                <p className="mt-2 text-lg text-muted-foreground">
                    Your hub for sports teams, leagues, and live scores.
                </p>
            </header>

            <div className="space-y-12">
                <section>
                    <h2 className="font-headline text-3xl font-bold mb-6">Premier League</h2>
                    <div className="space-y-4">
                        {footballTeams.map(team => <TeamHeader key={team.name} {...team} />)}
                    </div>
                </section>

                <Separator />

                <section>
                    <h2 className="font-headline text-3xl font-bold mb-6">Basketball Association</h2>
                     <div className="space-y-4">
                        {basketballTeams.map(team => <TeamHeader key={team.name} {...team} />)}
                    </div>
                </section>
                
                 <Separator />

                <section>
                    <h2 className="font-headline text-3xl font-bold mb-6">American Football Conference</h2>
                     <div className="space-y-4">
                        {americanFootballTeams.map(team => <TeamHeader key={team.name} {...team} />)}
                    </div>
                </section>
            </div>
        </div>
    );
}
