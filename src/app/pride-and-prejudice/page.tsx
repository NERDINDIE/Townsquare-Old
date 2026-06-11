
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit } from "@/components/icons";
import Image from 'next/image';
import { Separator } from "@/components/ui/separator";

const SocietyNews = [
    { 
        category: 'Arrivals', 
        title: 'A Single Man of Good Fortune!', 
        content: "It is a truth universally acknowledged that a single man in possession of a good fortune must be in want of a wife. Great news for our local mothers: Netherfield Park is let at last! A Mr. Bingley, a young man of considerable fortune from the north of England, has taken possession. He is said to be amiable, handsome, and, most importantly, unmarried. The neighbourhood is alight with curiosity and matrimonial scheming."
    },
    { 
        category: 'Local Gossip', 
        title: 'The Mysterious Mr. Darcy', 
        content: "Mr. Bingley was not unaccompanied. With him came a Mr. Darcy, a tall, handsome man of even greater fortune. However, his manners at the Meryton assembly were declared to be proud and above his company. He was heard to pronounce one of our local belles as 'tolerable, but not handsome enough to tempt me.' One wonders if such a disposition, however wealthy, can ever find favour in Hertfordshire."
    },
    {
        category: 'Military Movements',
        title: 'The ——shire Militia Arrives',
        content: 'The arrival of the militia in Meryton has sent a flutter through the hearts of many a young lady. The officers, with their scarlet coats and charming address, have quite enlivened the town. We are assured they are all gentlemen of the highest order, though one must caution against too hasty an attachment.'
    }
];

export default function PrideAndPrejudicePage({ onChangeEdition }: { onChangeEdition?: () => void }) {
    return (
        <div className="bg-[#fdfbf7] text-[#5c4b3e] min-h-screen" style={{fontFamily: "'Playfair Display', serif"}}>
            <div className="container mx-auto max-w-4xl py-8 px-4">
                <header className="text-center mb-10 border-y-4 border-double border-[#d3c5b4] py-4">
                    <div className="flex justify-between items-center mb-2">
                        <div className="w-40"></div>
                        <h1 className="text-5xl font-bold tracking-wider text-[#3e2c1d]">The Hertfordshire Mercury</h1>
                        {onChangeEdition && (
                            <Button variant="outline" onClick={onChangeEdition} className="bg-transparent border-[#d3c5b4] text-[#5c4b3e] hover:bg-[#f3efe9] hover:text-[#3e2c1d]">
                                <Edit className="mr-2 h-4 w-4" /> Change Edition
                            </Button>
                        )}
                    </div>
                    <p className="text-lg text-[#8c7b6e]">Your Weekly Chronicle of Society and Events</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <main className="md:col-span-2 space-y-8">
                        {SocietyNews.map((item, index) => (
                             <section key={index}>
                                <h2 className="text-sm font-bold uppercase tracking-widest text-[#8c7b6e]">{item.category}</h2>
                                <h3 className="text-3xl font-bold text-[#3e2c1d] mt-1">{item.title}</h3>
                                <p className="text-lg leading-relaxed mt-4" style={{fontFamily: "'Georgia', serif"}}>
                                    {item.content}
                                </p>
                            </section>
                        ))}
                    </main>

                    <aside className="space-y-6">
                        <Card className="bg-[#f9f6f2] border-[#e3dcd1] shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-xl text-[#3e2c1d]">On the Marriage Mart</CardTitle>
                                <CardDescription className="text-[#8c7b6e]">Eligible Parties of Note</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div>
                                    <p className="font-bold">Mr. Charles Bingley</p>
                                    <p className="text-sm text-muted-foreground">Fortune: £5,000 per annum</p>
                                </div>
                                 <Separator className="bg-[#e3dcd1]" />
                                <div>
                                    <p className="font-bold">Mr. Fitzwilliam Darcy</p>
                                    <p className="text-sm text-muted-foreground">Fortune: £10,000 per annum</p>
                                </div>
                                <Separator className="bg-[#e3dcd1]" />
                                <div>
                                    <p className="font-bold">Mr. George Wickham</p>
                                    <p className="text-sm text-muted-foreground">Fortune: A charming smile</p>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="bg-[#f9f6f2] border-[#e3dcd1] shadow-sm text-center">
                            <CardHeader>
                                <CardTitle className="text-xl text-[#3e2c1d]">A Mother's Lament</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="italic">"Oh! Single, my dear, to be sure! A single man of large fortune; four or five thousand a year. What a fine thing for our girls!"</p>
                                <p className="text-right text-muted-foreground mt-2">- Mrs. Bennet</p>
                            </CardContent>
                        </Card>
                    </aside>
                </div>
            </div>
        </div>
    );
}
