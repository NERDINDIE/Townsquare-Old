
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, PhoneOff, Wifi, Battery, Phone, MessageSquare, Newspaper, Rss, Bot } from 'lucide-react';
import Image from 'next/image';
import { toast } from '@/hooks/use-toast';

const columnists = [
    { name: 'Kenji Tanaka', title: 'Tech Analyst', article: 'The Future of Personal AI in a Post-Smartphone World.' },
    { name: 'Yumi Sato', title: 'Cultural Critic', article: 'How Retro Aesthetics Are Shaping Modern Youth Fashion.' },
];

const wangiriCalls = [
    { number: '+44 20 7123 4567', time: '2:15 PM' },
    { number: '+81 3 4567 8901', time: '11:02 AM' },
];

const spoofedCalls = [
    { number: '(03) 1234-5678', suspected: 'Your Bank', time: 'Yesterday' },
];

export default function NokiaTestPage() {

    const handleDeflect = (number: string) => {
        toast({
            title: "ワンギリ対応中",
            description: `${number}からの着信をAIが対応しています。 (AI is handling the call from ${number})`,
        });
    };

    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
            <div className="w-[320px] h-[580px] bg-white rounded-2xl shadow-2xl border-4 border-gray-800 flex flex-col font-sans">
                {/* Status Bar */}
                <div className="flex-shrink-0 flex justify-between items-center px-3 py-1 bg-gray-200">
                    <span className="text-sm font-bold">TOWNSQUARE JP</span>
                    <div className="flex items-center gap-2 text-xs">
                        <Wifi className="h-3 w-3" />
                        <Battery className="h-3 w-3" />
                        <span>14:30</span>
                    </div>
                </div>

                {/* Main Screen */}
                <main className="flex-1 overflow-y-auto p-3 space-y-4">
                    <Card className="bg-blue-100 border-blue-300">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg flex items-center gap-2"><Shield className="text-blue-600" /> セキュリティセンター</CardTitle>
                            <CardDescription>Security Center</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3 text-sm">
                            <div>
                                <h4 className="font-bold flex items-center gap-1"><PhoneOff className="h-4 w-4 text-red-500" /> ワン切り着信の検出</h4>
                                {wangiriCalls.map(call => (
                                     <div key={call.number} className="flex items-center justify-between text-xs p-2 bg-white rounded-md mt-1">
                                        <span>{call.number} <span className="text-gray-500">({call.time})</span></span>
                                        <Button size="sm" variant="destructive" onClick={() => handleDeflect(call.number)}>対応</Button>
                                    </div>
                                ))}
                            </div>
                             <div>
                                <h4 className="font-bold flex items-center gap-1"><Bot className="h-4 w-4 text-green-600" /> 番号なりすましアラート</h4>
                                {spoofedCalls.map(call => (
                                     <div key={call.number} className="flex items-center justify-between text-xs p-2 bg-white rounded-md mt-1">
                                       <div>
                                            <p>{call.number}</p>
                                            <p className="text-red-600">疑い：{call.suspected}</p>
                                       </div>
                                        <Button size="sm" variant="secondary">ブロック</Button>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                    
                    <Card className="bg-purple-100 border-purple-300">
                        <CardHeader className="pb-2">
                             <CardTitle className="text-lg flex items-center gap-2"><Rss className="text-purple-600" /> 今日のコラム</CardTitle>
                             <CardDescription>Today's Columns</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {columnists.map(col => (
                                <div key={col.name} className="p-2 bg-white rounded-md">
                                    <p className="font-bold text-sm">{col.name} <span className="text-xs text-gray-500">- {col.title}</span></p>
                                    <p className="text-xs mt-1 italic">"{col.article}"</p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </main>
                
                {/* Dock */}
                <footer className="flex-shrink-0 grid grid-cols-4 gap-2 p-2 bg-gray-200 border-t">
                    <Button variant="ghost" className="flex flex-col h-auto p-1 items-center gap-1 text-xs">
                        <Phone className="h-5 w-5" />
                        電話
                    </Button>
                    <Button variant="ghost" className="flex flex-col h-auto p-1 items-center gap-1 text-xs">
                        <MessageSquare className="h-5 w-5" />
                        メール
                    </Button>
                     <Button variant="ghost" className="flex flex-col h-auto p-1 items-center gap-1 text-xs">
                        <Newspaper className="h-5 w-5" />
                        ニュース
                    </Button>
                     <Button variant="ghost" className="flex flex-col h-auto p-1 items-center gap-1 text-xs">
                        <Image src="https://placehold.co/24x24.png" width={24} height={24} alt="App" className="rounded"/>
                        アプリ
                    </Button>
                </footer>

            </div>
        </div>
    );
}
