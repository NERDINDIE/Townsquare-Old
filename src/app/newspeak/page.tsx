
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookX, Edit, MessageSquareQuote } from "@/components/icons";
import { translations } from "@/lib/data/dystopian-data";

export default function NewspeakPage({ onChangeEdition }: { onChangeEdition?: () => void }) {
    return (
        <div className="bg-[#111] text-[#ccc] min-h-screen font-mono">
            <div className="container mx-auto max-w-4xl py-8 px-4">
                 <header className="text-center mb-12 border-b-2 border-gray-700 pb-4">
                    <div className="flex justify-between items-center">
                        <div className="w-40"></div>
                        <h1 className="text-5xl font-bold tracking-wider flex-1 text-center">NEWSPEAK</h1>
                         {onChangeEdition && (
                            <Button variant="outline" onClick={onChangeEdition} className="bg-transparent border-gray-700 hover:bg-gray-800">
                                <Edit className="mr-2 h-4 w-4" /> Change Edition
                            </Button>
                        )}
                    </div>
                    <p className="text-lg text-gray-500 mt-2">
                        The final, perfected language.
                    </p>
                </header>
                
                <main className="space-y-8">
                     <Card className="bg-[#1a1a1a] border-[#333] rounded-none">
                        <CardHeader>
                            <CardTitle className="text-2xl text-white tracking-widest flex items-center gap-3">
                                <MessageSquareQuote /> TODAY'S RECTIFICATIONS
                            </CardTitle>
                            <CardDescription className="text-gray-500">Oldspeak to Newspeak Translations</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {translations.map((item, index) => (
                                <div key={index}>
                                    <div className="p-4 bg-[#222] rounded-t-lg">
                                        <h3 className="text-sm font-bold text-red-500 mb-2 flex items-center gap-2"><BookX /> OLDTHINK</h3>
                                        <p className="text-gray-400 italic">"{item.oldspeak}"</p>
                                    </div>
                                    <div className="p-4 bg-[#eee] text-black rounded-b-lg">
                                         <h3 className="text-sm font-bold text-blue-600 mb-2">GOODTHINK</h3>
                                         <p className="font-bold text-lg">"{item.newspeak}"</p>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card className="bg-[#1a1a1a] border-[#333] rounded-none text-center">
                        <CardHeader>
                            <CardTitle className="text-xl text-white tracking-widest">Purpose of Newspeak</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-400 max-w-lg mx-auto">
                                "Don't you see that the whole aim of Newspeak is to narrow the range of thought? In the end we shall make thoughtcrime literally impossible, because there will be no words in which to express it."
                            </p>
                        </CardContent>
                    </Card>
                </main>
            </div>
        </div>
    );
}
