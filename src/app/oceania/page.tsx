
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlayCircle, Volume2, Edit } from "@/components/icons";
import Image from 'next/image';

const marches = [
    "Oceania, 'Tis for Thee",
    "Victory Anthem",
    "Hate Song (Week 231)",
];

export default function OceaniaPage({ onChangeEdition }: { onChangeEdition?: () => void }) {
    return (
        <div className="bg-gray-900 text-gray-300 min-h-screen font-serif">
            <div className="container mx-auto max-w-5xl py-8 px-4">
                <header className="text-center mb-12 border-b-2 border-gray-600 pb-4">
                    <div className="flex justify-between items-center">
                        <div className="w-40"></div>
                        <h1 className="text-6xl font-bold tracking-wider flex-1 text-center">OCEANIA</h1>
                        {onChangeEdition && (
                            <Button variant="outline" onClick={onChangeEdition} className="bg-gray-800 border-gray-700 hover:bg-gray-700">
                                <Edit className="mr-2 h-4 w-4" /> Change Edition
                            </Button>
                        )}
                    </div>
                    <p className="text-xl text-gray-400 mt-2">
                        WAR IS PEACE &bull; FREEDOM IS SLAVERY &bull; IGNORANCE IS STRENGTH
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Main Content Column */}
                    <main className="md:col-span-2 space-y-8">
                        {/* Telescreen Section */}
                        <section>
                            <h2 className="text-3xl font-bold text-red-500 border-b-2 border-red-500 pb-2 mb-4">TELESCREEN</h2>
                            <Card className="bg-black border-gray-700">
                                <CardContent className="p-2">
                                    <div className="relative aspect-video w-full bg-black">
                                        <Image
                                            src="https://placehold.co/1280x720/000000/111111.png"
                                            alt="Telescreen Feed"
                                            fill
                                            className="object-cover opacity-20"
                                            data-ai-hint="static noise"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <PlayCircle className="h-24 w-24 text-gray-600 animate-pulse" />
                                        </div>
                                        <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 text-sm font-bold flex items-center gap-2">
                                            <div className="h-2 w-2 rounded-full bg-white animate-pulse"></div>
                                            LIVE
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </section>

                        {/* The Times Section */}
                        <section>
                            <h2 className="text-3xl font-bold text-blue-400 border-b-2 border-blue-400 pb-2 mb-4">THE TIMES</h2>
                             <div className="bg-gray-800 border border-gray-700 p-6 space-y-6">
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-200">ENEMY OFFENSIVE SMASHED</h3>
                                    <p className="text-gray-400 mt-1">
                                        Eurasian forces routed on Malabar front. Victory imminent. All production quotas increased. Gratitude to Big Brother.
                                    </p>
                                </div>
                                <div className="border-t border-gray-600 my-4"></div>
                                <div>
                                    <h3 className="text-xl font-bold text-yellow-400">BIG BROTHER'S DAILY ORDER</h3>
                                    <p className="text-gray-400 mt-2 italic">
                                        "He who controls the past controls the future. He who controls the present controls the past. All citizens will reflect upon the Ninth Three-Year Plan's glorious successes in chocolate production."
                                    </p>
                                </div>
                                 <div className="border-t border-gray-600 my-4"></div>
                                 <div>
                                    <h3 className="text-2xl font-bold text-gray-200">THOUGHT-CRIMINALS VAPORIZED</h3>
                                    <p className="text-gray-400 mt-1">
                                        Vigilance of Youth League exposes nest of spies. Traitors confess freely, express love for Big Brother before vaporization.
                                    </p>
                                </div>
                            </div>
                        </section>
                    </main>

                    {/* Sidebar Column */}
                    <aside className="space-y-8">
                        {/* Schedule Section */}
                        <section>
                            <Card className="bg-gray-800 border-gray-700">
                                <CardHeader>
                                    <CardTitle className="text-xl text-yellow-400">Telescreen Schedule</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-2 text-gray-400">
                                        <li className="flex justify-between"><span>06:00-07:00</span><span>Physical Jerks</span></li>
                                        <li className="flex justify-between"><span>07:00-12:00</span><span>Ministry of Truth Broadcast</span></li>
                                        <li className="flex justify-between"><span>12:00-14:00</span><span>Victory Announcements</span></li>
                                        <li className="flex justify-between"><span>14:00-14:02</span><span>Two Minutes Hate</span></li>
                                        <li className="flex justify-between"><span>14:02-23:00</span><span>Ministry of Plenty Report</span></li>
                                        <li className="flex justify-between"><span>23:00-06:00</span><span>National Anthem (Loop)</span></li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </section>

                        {/* On-Demand Marches Section */}
                        <section>
                            <Card className="bg-gray-800 border-gray-700">
                                <CardHeader>
                                    <CardTitle className="text-xl text-yellow-400">On-Demand Audio</CardTitle>
                                    <CardDescription>State-Approved Marches</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    {marches.map((march, index) => (
                                        <div key={index} className="flex items-center justify-between p-2 bg-gray-700/50 rounded-md">
                                            <p>{march}</p>
                                            <Button variant="ghost" size="icon">
                                                <Volume2 className="h-5 w-5" />
                                            </Button>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        </section>
                    </aside>
                </div>
            </div>
        </div>
    );
}
