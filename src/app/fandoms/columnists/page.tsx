'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { columnists } from "@/lib/data/fandom-data";
import Image from "next/image";
import Link from "next/link";

const SideNav = () => (
    <nav className="fixed top-0 left-0 h-full w-48 bg-white text-black shadow-lg z-10 hidden md:block">
        <div className="p-4 border-b">
             <h1 className="font-bold text-lg text-red-700">The Fandom Times</h1>
        </div>
        <ul className="flex flex-col mt-4">
            <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer text-black">Newsreels</li>
            <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer text-black">The File</li>
            <li className="py-2 px-4 bg-gray-200 cursor-pointer text-black font-bold">Columnists</li>
            <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer text-black">The Fandom Radio</li>
            <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer text-black">Paper Edition</li>
            <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer text-black">Channels</li>
        </ul>
    </nav>
);


export default function FandomTimesColumnistsPage() {
    return (
        <div className="font-mono bg-gray-100">
            <SideNav />
            <main className="ml-0 md:ml-48 min-h-screen">
                <header className="p-4 text-center" style={{ backgroundColor: '#D2042D' }}>
                    <h1 className="text-3xl font-bold text-white tracking-widest">COLUMNISTS</h1>
                </header>
                 <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-8">
                     {columnists.map(columnist => (
                        <Card key={columnist.name} className="bg-white shadow-md rounded-lg overflow-hidden">
                            <CardHeader className="bg-gray-200 p-4 border-b">
                                <CardTitle className="text-xl text-red-800">{columnist.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="p-4 flex gap-4">
                                <div className="flex-shrink-0">
                                    <Image src={columnist.image} alt={columnist.name} width={80} height={80} className="rounded-full border-2 border-gray-300" data-ai-hint={columnist.dataAiHint} />
                                    <p className="text-center font-bold text-sm mt-2">{columnist.name}</p>
                                </div>
                                <p className="text-gray-700 text-sm italic">"{columnist.content}"</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </main>
        </div>
    );
}
