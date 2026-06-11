
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Star } from '@/components/icons';
import Image from 'next/image';
import Link from 'next/link';
import { flashGames, topRated } from '@/lib/data/arcade-data';

export default function FlashGamesPage() {
  return (
    <div
      className="bg-black text-white font-mono min-h-screen"
      style={{
        backgroundImage: "url('https://www.transparenttextures.com/patterns/black-felt.png')",
      }}
    >
      <div className="container mx-auto max-w-5xl p-4">
        <header className="mb-4">
          <Button asChild variant="link" className="text-orange-400 p-0 hover:text-orange-300">
            <Link href="/arcade-saloon">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Arcade Saloon
            </Link>
          </Button>
          <div className="mt-2 text-center border-2 border-orange-500 bg-black p-4 rounded-lg shadow-[0_0_15px_rgba(249,115,22,0.5)]">
            <h1
              className="text-5xl font-bold text-orange-400"
              style={{ fontFamily: "'Brush Script MT', cursive", textShadow: '2px 2px #FF0000' }}
            >
              Flash Fortress
            </h1>
            <p className="text-sm text-gray-400">Your daily dose of classic flash games</p>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <main className="md:col-span-3 space-y-6">
            {flashGames.map((game, index) => (
              <Card key={index} className="bg-gray-900/80 border-gray-700 flex gap-4 p-4 items-center">
                <Image src={game.image} alt={game.title} width={150} height={100} className="rounded-md border-2 border-gray-600" data-ai-hint={game.dataAiHint} />
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-orange-400 hover:underline cursor-pointer">{game.title}</h2>
                  <div className="flex items-center gap-4 text-sm text-gray-400 mt-1">
                     <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-400" />
                        <span>{game.rating}/5.0</span>
                    </div>
                    <span>{game.plays} plays</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                    <Button variant="secondary" className="bg-orange-600 hover:bg-orange-700 text-white">Play</Button>
                    <Button variant="outline" className="border-orange-500 text-orange-400 hover:bg-orange-500/10">Rate</Button>
                </div>
              </Card>
            ))}
          </main>
          <aside className="space-y-6">
            <Card className="bg-gray-900/80 border-gray-700">
              <CardHeader>
                <CardTitle className="text-orange-400">Top Rated</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="list-decimal list-inside space-y-2">
                    {topRated.map(game => (
                         <li key={game.rank}>
                            <span className="hover:underline cursor-pointer">{game.title}</span>
                        </li>
                    ))}
                </ol>
              </CardContent>
            </Card>
             <Card className="bg-gray-900/80 border-gray-700">
              <CardHeader>
                <CardTitle className="text-orange-400">Newgrounds API</CardTitle>
                <CardDescription className="text-gray-400">Under Construction</CardDescription>
              </CardHeader>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
}
