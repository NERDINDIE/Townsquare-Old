
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Ship, Swords } from "@/components/icons";
import { geatishHeroes } from "@/lib/data/beowulf-data";

export default function GeatlandPage({ onChangeEdition }: { onChangeEdition?: () => void }) {
    return (
        <div className="bg-[#2c3e50] text-[#ecf0f1] min-h-screen font-uncial">
            <div className="container mx-auto max-w-5xl py-8 px-4">
                <header className="text-center mb-12 border-b-4 border-double border-[#3498db] pb-4">
                    <div className="flex justify-between items-center mb-4">
                        <div className="w-40"></div> {/* Spacer */}
                        <h1 className="text-6xl font-bold tracking-wider text-white">GEATLAND</h1>
                        {onChangeEdition && (
                            <Button variant="outline" onClick={onChangeEdition} className="bg-transparent border-[#3498db] text-[#ecf0f1] hover:bg-[#34495e] hover:text-white font-body">
                                <Edit className="mr-2 h-4 w-4" /> Change Edition
                            </Button>
                        )}
                    </div>
                    <p className="text-xl text-[#95a5a6] mt-2">Land of the Weather-Geats, Home of Heroes.</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <main className="md:col-span-2 space-y-8">
                        <section>
                            <h2 className="text-3xl font-bold text-white border-b-2 border-[#3498db] pb-2 mb-4 flex items-center gap-2">
                                <Ship className="h-8 w-8" />
                                THE BARD'S SONG
                            </h2>
                            <div className="bg-[#34495e]/80 border border-[#7f8c8d] p-6 space-y-4 rounded-lg shadow-lg">
                                <h3 className="text-2xl font-bold text-white">Beowulf Answers the Call</h3>
                                <p className="text-[#ecf0f1] leading-relaxed text-lg">
                                    "From the misty shores of Geatland, a hero rises! Word has reached our ears of the terror gripping Hrothgar's Denmark. Beowulf, mightiest of men, has heard the tales of Grendel's wrath. With fourteen of his finest warriors, he has prepared a great ship to cross the whale-road. He goes not for gold, but for glory, to win fame and rid the Danes of their affliction. The omens were good, the journey begins! Sing of his courage!"
                                </p>
                            </div>
                        </section>
                    </main>

                    <aside className="space-y-8">
                        <Card className="bg-[#34495e]/80 border-[#7f8c8d] shadow-lg">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-white"><Swords /> Heroes of the Geats</CardTitle>
                                <CardDescription className="text-[#95a5a6]">Warriors of Renown</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {geatishHeroes.map((hero, index) => (
                                    <div key={index} className="p-3 bg-[#2c3e50]/50 rounded">
                                        <p className="font-bold text-white">{hero.name}</p>
                                        <p className="text-sm text-[#95a5a6] mt-1">{hero.title}</p>
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
