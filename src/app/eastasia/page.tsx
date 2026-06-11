
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, BookX, Users, Edit } from "@/components/icons";
import { principles, productionReport } from "@/lib/data/dystopian-data";

export default function EastasiaPage({ onChangeEdition }: { onChangeEdition?: () => void }) {
    return (
        <div className="bg-[#1a1a1a] text-[#a9a9a9] min-h-screen font-serif" style={{ fontFamily: "'Songti SC', 'STSong', serif" }}>
            <div className="container mx-auto max-w-5xl py-8 px-4">
                <header className="text-center mb-12">
                     <div className="flex justify-between items-center mb-4">
                        <div className="w-40"></div> {/* Spacer */}
                        <h1 className="text-7xl font-bold tracking-[0.2em] text-white">EASTASIA</h1>
                        {onChangeEdition && (
                            <Button variant="outline" onClick={onChangeEdition} className="bg-transparent border-[#444] text-[#a9a9a9] hover:bg-[#2a2a2a] hover:text-white">
                                <Edit className="mr-2 h-4 w-4" /> Change Edition
                            </Button>
                        )}
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                    <main className="md:col-span-3 space-y-8">
                        <section>
                            <Card className="bg-[#2a2a2a] border-[#444] rounded-none">
                                <CardHeader>
                                    <CardTitle className="text-2xl text-white tracking-widest flex items-center gap-3">
                                        <Eye /> STATE PROCLAMATION
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-lg leading-relaxed">
                                        The war against Eurasia continues with righteous fury. Our forces, embodying the principle of selfless devotion, have repelled the enemy on all fronts. The state remains eternally victorious. The individual memory of past allegiances is a flaw to be corrected. The enemy is eternal. The war is eternal. Victory is eternal.
                                    </p>
                                </CardContent>
                            </Card>
                        </section>

                        <section>
                           <Card className="bg-[#2a2a2a] border-[#444] rounded-none">
                                <CardHeader>
                                    <CardTitle className="text-2xl text-white tracking-widest flex items-center gap-3">
                                        <Users /> PRODUCTION QUOTAS
                                    </CardTitle>
                                    <CardDescription className="text-[#888]">Five-Year Plan: Year Four Assessment</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="w-full text-sm">
                                        {productionReport.map((item, index) => (
                                             <div key={index} className="flex justify-between border-b border-[#444] py-2">
                                                <span>{item.item}</span>
                                                <span className={`${item.status === 'Surpassed' ? 'text-green-400' : 'text-gray-400'}`}>{item.quota} ({item.status})</span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </section>
                    </main>

                    <aside className="md:col-span-2 space-y-8">
                         <Card className="bg-[#2a2a2a] border-[#444] rounded-none">
                            <CardHeader>
                                <CardTitle className="text-xl text-white tracking-widest flex items-center gap-3">
                                    <BookX /> GUIDING PRINCIPLES
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                {principles.map((principle) => (
                                    <p key={principle} className="p-2 bg-[#1a1a1a] text-center text-lg">{principle}</p>
                                ))}
                            </CardContent>
                        </Card>
                        <Card className="bg-[#2a2a2a] border-[#444] rounded-none">
                            <CardHeader>
                                <CardTitle className="text-xl text-white tracking-widest">Thought of the Day</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-center text-2xl italic">"To be controlled is to be free."</p>
                            </CardContent>
                        </Card>
                    </aside>
                </div>
            </div>
        </div>
    );
}
