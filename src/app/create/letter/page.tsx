
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Send, Stamp } from '@/components/icons';
import Link from 'next/link';
import { toast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StampMaker } from '@/components/StampMaker';
import { cn } from '@/lib/utils';

const paperThemes = [
    { name: 'Classic', className: 'bg-[#fdfbf7] border-[#d3c5b4] text-slate-800 font-serif' },
    { name: 'Modern', className: 'bg-white border-gray-300 text-black font-sans' },
    { name: 'Blueprint', className: 'bg-blue-900/90 border-blue-400 text-white font-mono' },
    { name: 'Terminal', className: 'bg-black border-green-500 text-green-400 font-mono' },
];

const envelopeColors = [
    { name: 'Cream', className: 'bg-[#fdfbf7]' },
    { name: 'White', className: 'bg-white' },
    { name: 'Light Blue', className: 'bg-blue-100' },
    { name: 'Red', className: 'bg-red-200' },
];


export default function CreateLetterPage() {
    const router = useRouter();
    const [selectedPaper, setSelectedPaper] = useState(paperThemes[0]);
    const [selectedEnvelope, setSelectedEnvelope] = useState(envelopeColors[0]);
    const [customStamp, setCustomStamp] = useState({ shape: 'square', icon: 'Star', color: '#4B5563' });

    const handleSend = () => {
        toast({
            title: "Letter Sent!",
            description: "Your letter is on its way to the recipient's mailbox.",
        });
        router.push('/mailbox');
    };

    return (
        <div className={cn("min-h-screen flex items-center justify-center p-4 transition-colors", selectedPaper.className)}>
            <div className="container max-w-5xl">
                 <header className="mb-8">
                    <Button asChild variant="ghost" className="mb-4 -ml-4 hover:bg-black/10">
                        <Link href="/mailbox">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Mailbox
                        </Link>
                    </Button>
                </header>
                <main className={cn("p-4 md:p-8 shadow-2xl border rounded-sm transition-colors", selectedPaper.className)}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                        
                        {/* Letter Area */}
                        <div className="lg:col-span-3 space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="recipient" className="font-semibold">Recipient</label>
                                <Input id="recipient" placeholder="e.g., John Smith" className="bg-transparent border-current/30" />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="subject" className="font-semibold">Subject</label>
                                <Input id="subject" placeholder="e.g., An Invitation" className="bg-transparent border-current/30" />
                            </div>
                             <div className="space-y-2">
                                <label htmlFor="message" className="font-semibold">Message</label>
                                <Textarea
                                    id="message"
                                    placeholder="Dearest friend..."
                                    className="bg-transparent border-current/30 h-80 resize-none"
                                />
                            </div>
                        </div>
                        
                        {/* Customization Area */}
                        <div className="lg:col-span-2 flex flex-col gap-6">
                            <Tabs defaultValue="envelope" className="w-full">
                                <TabsList className="grid w-full grid-cols-2">
                                    <TabsTrigger value="envelope">Envelope</TabsTrigger>
                                    <TabsTrigger value="paper">Paper</TabsTrigger>
                                </TabsList>
                                <TabsContent value="envelope" className="mt-4">
                                     <Card className="bg-background/10 border-current/20">
                                         <CardContent className="p-4 space-y-4">
                                              <div>
                                                    <h4 className="font-semibold mb-2 text-sm">Envelope Color</h4>
                                                    <div className="flex flex-wrap gap-2">
                                                        {envelopeColors.map(color => (
                                                            <button key={color.name} onClick={() => setSelectedEnvelope(color)} className={cn("w-8 h-8 rounded-full border-2 transition-all", selectedEnvelope.name === color.name ? 'border-current' : 'border-transparent')}>
                                                                <div className={cn("w-full h-full rounded-full", color.className)} />
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            <StampMaker stamp={customStamp} onStampChange={setCustomStamp}/>
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                                <TabsContent value="paper" className="mt-4">
                                    <Card className="bg-background/10 border-current/20">
                                        <CardContent className="p-4">
                                            <h4 className="font-semibold mb-2 text-sm">Paper Style</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {paperThemes.map(theme => (
                                                    <button key={theme.name} onClick={() => setSelectedPaper(theme)} className={cn("p-2 rounded-md border-2 transition-all", selectedPaper.name === theme.name ? 'border-current' : 'border-transparent')}>
                                                        <div className={cn("w-12 h-16 rounded-sm", theme.className)} />
                                                        <p className="text-xs mt-1">{theme.name}</p>
                                                    </button>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                            </Tabs>

                             <Button onClick={handleSend} size="lg" className="w-full bg-current/80 text-foreground hover:bg-current">
                                <Send className="mr-2 h-4 w-4" />
                                Send Letter
                            </Button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
