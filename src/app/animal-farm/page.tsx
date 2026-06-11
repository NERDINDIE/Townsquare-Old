
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Leaf, Award, Wind, Edit } from "@/components/icons";

export default function AnimalFarmPage({ onChangeEdition }: { onChangeEdition?: () => void }) {
    return (
        <div className="bg-[#fdf6e4] text-[#58452d] min-h-screen font-serif p-4 sm:p-8">
            <div className="container mx-auto max-w-4xl border-4 border-double border-[#8b4513] p-6 bg-[#fffaf0]">
                <header className="text-center mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <div className="w-40"></div>
                        <h1 className="text-5xl font-bold text-[#8b4513] flex-1 text-center">ANIMAL FARM BULLETIN</h1>
                         {onChangeEdition && (
                            <Button variant="outline" onClick={onChangeEdition} className="bg-transparent border-[#8b4513] text-[#58452d] hover:bg-[#fdf6e4]">
                                <Edit className="mr-2 h-4 w-4" /> Change Edition
                            </Button>
                        )}
                    </div>
                    <p className="text-lg mt-2">All Animals Are Equal, But Some Animals Are More Equal Than Others</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <main className="md:col-span-2 space-y-8">
                        <section>
                            <h2 className="text-3xl font-bold border-b-2 border-[#8b4513] pb-2 mb-4 flex items-center gap-2">
                                <Leaf className="text-green-700"/> A Report From Squealer
                            </h2>
                            <div className="space-y-4 text-lg leading-relaxed">
                                <p>
                                    Comrades! Let us rejoice in another glorious week of progress under the wise leadership of our beloved Comrade Napoleon! Thanks to his tireless efforts and profound wisdom, production figures have soared to new, unbelievable heights. The hens have laid five hundred eggs, the cows' milk is creamier than ever, and the wheat harvest has surpassed all expectations by two hundred percent!
                                </p>
                                <p>
                                    Let any who doubt these figures be reminded that such thoughts are worthy of the traitor Snowball. Our memories are faulty; the figures, issued by Comrade Napoleon himself, are infallible. To question them is to question our victory!
                                </p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-3xl font-bold border-b-2 border-[#8b4513] pb-2 mb-4 flex items-center gap-2">
                                <Wind className="text-blue-600"/> The Windmill Triumphant!
                            </h2>
                             <div className="space-y-4 text-lg leading-relaxed">
                                <p>
                                    The second windmill, a testament to our indomitable will, stands complete! This marvel of engineering, built entirely from our own resources and under the brilliant guidance of Comrade Napoleon, will soon provide electrical light and hot water to every stall. This luxury, comrades, is a direct result of your hard work and Napoleon's sacrifice. Let us not forget that the original plans, stolen by the criminal Snowball, were in fact, Napoleon's own creation!
                                </p>
                            </div>
                        </section>
                    </main>

                    <aside className="space-y-8">
                        <Card className="bg-[#fdf6e4] border-[#8b4513]">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Award className="text-yellow-600" />
                                    Our Sacred Anthems
                                </CardTitle>
                                <CardDescription>To be sung every Sunday morning.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <h3 className="font-bold text-lg">Animal Farm!</h3>
                                    <p className="italic text-md mt-1 pl-4 border-l-2 border-green-700">
                                        Animal Farm, Animal Farm,<br/>
                                        Never through me shalt thou come to harm!
                                    </p>
                                </div>
                                 <div>
                                    <h3 className="font-bold text-lg">Comrade Napoleon</h3>
                                    <p className="italic text-md mt-1 pl-4 border-l-2 border-green-700">
                                        Thou are the giver of <br/>
                                        All that thy creatures love,<br/>
                                        Full belly twice a day, clean straw to roll upon;
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                         <Card className="bg-red-800 text-white border-yellow-400">
                             <CardHeader>
                                <CardTitle>FOUR LEGS GOOD, TWO LEGS BETTER!</CardTitle>
                            </CardHeader>
                        </Card>
                    </aside>
                </div>
                 <footer className="text-center mt-12 pt-4 border-t-2 border-[#8b4513]">
                    <p className="font-bold text-xl">LONG LIVE ANIMAL FARM! LONG LIVE COMRADE NAPOLEON!</p>
                </footer>
            </div>
        </div>
    );
}
