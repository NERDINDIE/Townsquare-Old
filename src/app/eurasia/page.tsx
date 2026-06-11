
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, Cpu, Factory, Edit } from "@/components/icons";
import Image from 'next/image';

const directives = [
    { title: 'Directive 7.3: Increase Tractor Production', details: 'All agricultural sectors must increase tractor output by 15% to meet Five-Year Plan quotas. Glory to the collective effort.' },
    { title: 'Directive 11.1: Conserve Energy Resources', details: 'Implement mandatory energy conservation protocols in all residential blocs. Individual consumption is a crime against the whole.' },
    { title: 'Directive 4.8: Reinforce Ideological Purity', details: 'Attend twice-daily ideological alignment sessions. Neo-Bolshevism is the path to victory.' },
];

export default function EurasiaPage({ onChangeEdition }: { onChangeEdition?: () => void }) {
    return (
        <div className="bg-[#2c3e50] text-[#ecf0f1] min-h-screen font-sans" style={{ fontFamily: "'Roboto Condensed', sans-serif" }}>
            <div className="container mx-auto max-w-5xl py-8 px-4">
                <header className="text-center mb-12 border-b-4 border-[#3498db] pb-4">
                     <div className="flex justify-between items-center mb-4">
                        <div className="w-28"></div> {/* Spacer */}
                        <h1 className="text-6xl font-bold tracking-wider text-white">EURASIA</h1>
                        {onChangeEdition && (
                            <Button variant="outline" onClick={onChangeEdition} className="bg-transparent border-[#3498db] text-[#ecf0f1] hover:bg-[#34495e] hover:text-white">
                                <Edit className="mr-2 h-4 w-4" /> Change Edition
                            </Button>
                        )}
                    </div>
                    <p className="text-xl text-[#bdc3c7] mt-2">
                        THE COLLECTIVE IS ETERNAL
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <main className="md:col-span-2 space-y-8">
                        <section>
                            <h2 className="text-3xl font-bold text-white border-b-2 border-[#3498db] pb-2 mb-4 flex items-center gap-2">
                                <Factory className="h-8 w-8" />
                                STATE COMMUNIQUÉ
                            </h2>
                            <div className="bg-[#34495e] border border-[#7f8c8d] p-6 space-y-4 rounded-lg">
                                <h3 className="text-2xl font-bold text-white">Total Victory on the African Front!</h3>
                                <p className="text-[#ecf0f1] leading-relaxed">
                                    The heroic armies of Eurasia, guided by the flawless logic of Neo-Bolshevism, have achieved a decisive victory against the treacherous forces of Eastasia. All enemy positions have been overrun. The front line has advanced 500 kilometers. Production of armaments continues to exceed all projections. This triumph is a testament to our unbreakable collective will.
                                </p>
                                <p className="text-[#bdc3c7] text-sm">
                                    Note: All previous reports of conflict with Oceania are incorrect fabrications. Eurasia has always been at war with Eastasia. To believe otherwise is thoughtcrime.
                                </p>
                            </div>
                        </section>

                        <section>
                             <h2 className="text-3xl font-bold text-white border-b-2 border-[#3498db] pb-2 mb-4 flex items-center gap-2">
                                <Cpu className="h-8 w-8" />
                                RATIONALITY PROCESSOR
                            </h2>
                            <Card className="bg-[#34495e] border-[#7f8c8d]">
                                <CardHeader>
                                    <CardTitle className="text-white">Logical Analysis</CardTitle>
                                    <CardDescription className="text-[#bdc3c7]">Input: Emotional concepts. Output: Rational conclusions.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <p><strong className="text-[#3498db]">INPUT:</strong> "Love" <strong className="text-[#3498db]">OUTPUT:</strong> A bio-chemical reaction for procreative efficiency.</p>
                                    <p><strong className="text-[#3498db]">INPUT:</strong> "Freedom" <strong className="text-[#3498db]">OUTPUT:</strong> The understanding that one's purpose serves the state.</p>
                                    <p><strong className="text-[#3498db]">INPUT:</strong> "Art" <strong className="text-[#3498db]">OUTPUT:</strong> State-approved propaganda for morale optimization.</p>
                                </CardContent>
                            </Card>
                        </section>
                    </main>

                    <aside className="space-y-8">
                        <Card className="bg-[#34495e] border-[#7f8c8d]">
                            <CardHeader>
                                <CardTitle className="text-white">CENTRAL DIRECTIVES</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {directives.map((directive, index) => (
                                    <div key={index} className="p-3 bg-[#2c3e50]/50 rounded">
                                        <p className="font-bold text-[#3498db]">{directive.title}</p>
                                        <p className="text-sm text-[#bdc3c7] mt-1">{directive.details}</p>
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
