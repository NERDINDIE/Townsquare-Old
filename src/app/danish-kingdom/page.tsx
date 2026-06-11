
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Crown, Edit, TowerControl } from "@/components/icons";
import { thanes } from "@/lib/data/beowulf-data";

export default function DanishKingdomPage({ onChangeEdition }: { onChangeEdition?: () => void }) {
    return (
        <div className="bg-[#4a3c31] text-[#e0d6c5] min-h-screen font-uncial">
            <div className="container mx-auto max-w-5xl py-8 px-4">
                <header className="text-center mb-12 border-b-4 border-double border-[#c8a47e] pb-4">
                    <div className="flex justify-between items-center mb-4">
                        <div className="w-40"></div> {/* Spacer */}
                        <h1 className="text-6xl font-bold tracking-wider text-white">HEOROT</h1>
                        {onChangeEdition && (
                            <Button variant="outline" onClick={onChangeEdition} className="bg-transparent border-[#c8a47e] text-[#e0d6c5] hover:bg-[#5a4c41] hover:text-white font-body">
                                <Edit className="mr-2 h-4 w-4" /> Change Edition
                            </Button>
                        )}
                    </div>
                    <p className="text-xl text-[#c8a47e] mt-2">The foremost of halls under heaven.</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <main className="md:col-span-2 space-y-8">
                        <section>
                            <h2 className="text-3xl font-bold text-white border-b-2 border-[#c8a47e] pb-2 mb-4 flex items-center gap-2">
                                <TowerControl className="h-8 w-8" />
                                A BARD'S TALE
                            </h2>
                            <div className="bg-[#5a4c41]/70 border border-[#8a7465] p-6 space-y-4 rounded-lg shadow-lg">
                                <h3 className="text-2xl font-bold text-white">A Shadow Falls Upon the Great Hall</h3>
                                <p className="text-[#e0d6c5] leading-relaxed text-lg">
                                    "Hark, traveler, and listen well, for the tale of Heorot is one of sorrow. For twelve long winters, a terror has haunted our nights. Grendel, a fiend out of hell, has taken our beloved mead-hall for his hunting ground. The laughter of thanes has been replaced by the silence of fear, the benches stained with the blood of our best warriors. Hrothgar, our ring-giver, sits heavy with sorrow. We pray to the gods for a hero, a dragonslayer, to deliver us from this endless night."
                                </p>
                            </div>
                        </section>
                    </main>

                    <aside className="space-y-8">
                        <Card className="bg-[#5a4c41]/70 border-[#8a7465] shadow-lg">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-white"><Crown /> The Royal Court</CardTitle>
                                <CardDescription className="text-[#c8a47e]">Nobles of the Danish Kingdom</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {thanes.map((thane, index) => (
                                    <div key={index} className="p-3 bg-[#4a3c31]/50 rounded">
                                        <p className="font-bold text-white">{thane.name}</p>
                                        <p className="text-sm text-[#c8a47e] mt-1">{thane.title}</p>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </aside>
                </div>
            </div>
        </div>
    );
}
