
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Gamepad2, Tv, Trophy } from "@/components/icons";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { games, leaderboard } from "@/lib/data/arcade-data";


export default function ArcadeSaloonPage() {
    return (
        <div className="container mx-auto max-w-6xl px-4 py-8 md:py-12" style={{
            '--brand-color': 'hsl(var(--brand-arcade-saloon))'
        } as React.CSSProperties}>
            <header className="mb-12 text-center">
                <h1 className="font-headline text-5xl md:text-7xl font-bold flex items-center justify-center gap-4" style={{ color: 'var(--brand-color)'}}>
                    <Link href="/arcade-saloon/flash-games" title="???">
                        <Gamepad2 className="h-12 w-12" />
                    </Link>
                    Arcade Saloon
                </h1>
                <p className="mt-2 text-lg text-muted-foreground">
                    Your portal to retro and modern gaming fun.
                </p>
                <div className="mt-4 flex justify-center gap-2">
                    <Button asChild style={{ backgroundColor: 'var(--brand-color)'}}>
                        <Link href="/teletext">
                            <Tv className="mr-2 h-5 w-5" />
                            Teletext
                        </Link>
                    </Button>
                     <Button asChild variant="outline">
                        <Link href="/geek-live">
                            <Gamepad2 className="mr-2 h-5 w-5" />
                            Geek Live
                        </Link>
                    </Button>
                </div>
            </header>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-16">
                    {/* Featured Game */}
                    <section>
                        <Card className="overflow-hidden border-2" style={{ borderColor: 'var(--brand-color)'}}>
                            <div className="grid grid-cols-1 md:grid-cols-2">
                                <div className="relative aspect-video md:aspect-auto">
                                     <Image src={games.featured.image} alt={games.featured.title} fill className="object-cover" data-ai-hint={games.featured.dataAiHint} />
                                </div>
                                <div className="flex flex-col justify-center p-6 md:p-8">
                                    <CardHeader className="p-0">
                                        <CardTitle className="text-3xl font-bold font-headline">{games.featured.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-0 mt-4">
                                        <CardDescription>{games.featured.description}</CardDescription>
                                    </CardContent>
                                    <CardFooter className="p-0 mt-6">
                                        <Button size="lg" style={{ backgroundColor: 'var(--brand-color)'}}>Play Now <ArrowRight className="ml-2 h-5 w-5" /></Button>
                                    </CardFooter>
                                </div>
                            </div>
                        </Card>
                    </section>

                    {/* Classic Cabinet */}
                    <section>
                        <h2 className="font-headline text-3xl font-bold mb-6">Classic Cabinet</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {games.classic.map((game, index) => {
                                const GameCard = (
                                    <Card key={game.title} className="aspect-square flex flex-col items-center justify-center text-center p-4 transition-all hover:shadow-lg hover:-translate-y-1 hover:border-primary">
                                        <div className="text-6xl mb-2">{game.icon}</div>
                                        <p className="font-bold text-xl">{game.title}</p>
                                    </Card>
                                )
                                return game.href ? <Link href={game.href} key={game.title}>{GameCard}</Link> : <div key={game.title}>{GameCard}</div>;
                            })}
                        </div>
                    </section>

                    {/* Puzzles & Strategy */}
                    <section>
                         <h2 className="font-headline text-3xl font-bold mb-6">Puzzles & Strategy</h2>
                         <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                            {games.puzzles.map((game, index) => {
                                const GameCard = (
                                    <Card key={index} className="aspect-square flex flex-col items-center justify-center text-center p-4 transition-all hover:shadow-lg hover:-translate-y-1 hover:border-primary">
                                        <div className="text-6xl mb-2">{game.icon}</div>
                                        <p className="font-bold text-xl">{game.title}</p>
                                    </Card>
                                )
                                return game.href ? <Link href={game.href} key={index}>{GameCard}</Link> : <div key={index}>{GameCard}</div>;
                            })}
                        </div>
                    </section>
                </div>
                
                {/* Leaderboard */}
                <aside className="lg:col-span-1">
                     <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Trophy className="text-yellow-500" />
                                Leaderboard
                            </CardTitle>
                            <CardDescription>Top players this week</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-12">Rank</TableHead>
                                        <TableHead>Player</TableHead>
                                        <TableHead className="text-right">Score</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {leaderboard.map((player) => (
                                        <TableRow key={player.rank}>
                                            <TableCell className="font-bold">{player.rank}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="h-8 w-8">
                                                        <AvatarFallback>{player.initials}</AvatarFallback>
                                                    </Avatar>
                                                    <span className="font-medium">{player.name}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right font-mono">{player.score}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                     </Card>
                </aside>
            </div>
        </div>
    );
}
