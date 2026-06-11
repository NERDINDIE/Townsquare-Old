
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Send } from '@/components/icons';
import Link from 'next/link';
import { toast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const postcardImages = [
    { src: 'https://placehold.co/500x300.png', dataAiHint: 'city skyline' },
    { src: 'https://placehold.co/500x300.png', dataAiHint: 'beach sunset' },
    { src: 'https://placehold.co/500x300.png', dataAiHint: 'mountain landscape' },
    { src: 'https://placehold.co/500x300.png', dataAiHint: 'forest trail' },
];

export default function CreatePostcardPage() {
    const router = useRouter();
    const [selectedImage, setSelectedImage] = useState(postcardImages[0].src);

    const handleSend = () => {
        toast({
            title: "Postcard Sent!",
            description: "Your postcard is on its way.",
        });
        router.push('/mailbox');
    };

    return (
        <div className="container mx-auto max-w-4xl px-4 py-8 md:py-12">
            <header className="mb-8">
                <Button asChild variant="ghost" className="mb-4 -ml-4">
                    <Link href="/mailbox">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Mailbox
                    </Link>
                </Button>
                <h1 className="font-headline text-4xl font-bold">Create a Postcard</h1>
                <p className="text-muted-foreground mt-1">
                    Send a digital postcard to a friend.
                </p>
            </header>

            <Card>
                <CardContent className="p-6">
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Front */}
                        <div className="space-y-4">
                            <h3 className="font-semibold text-lg">Postcard Front</h3>
                            <Card className="overflow-hidden aspect-[5/3]">
                                <Image src={selectedImage} alt="Selected postcard image" width={500} height={300} className="object-cover w-full h-full" data-ai-hint="postcard scenery" />
                            </Card>
                            <div className="grid grid-cols-4 gap-2">
                                {postcardImages.map((img, index) => (
                                    <button key={index} onClick={() => setSelectedImage(img.src)} className={`rounded-md overflow-hidden border-2 ${selectedImage === img.src ? 'border-primary' : 'border-transparent'}`}>
                                        <Image src={img.src} alt={`Thumbnail ${index + 1}`} width={100} height={60} className="object-cover" data-ai-hint={img.dataAiHint} />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Back */}
                        <div className="bg-[#F8F5E8] p-4 rounded-lg flex flex-col border">
                            <div className="flex-grow grid grid-cols-2 gap-4">
                                <Textarea
                                    placeholder="Dear Friend,&#10;&#10;Just wanted to say hello from this beautiful place!&#10;&#10;Best,&#10;Me"
                                    className="h-full resize-none bg-transparent border-0 focus-visible:ring-0"
                                />
                                <div className="border-l border-dashed border-gray-400 pl-4 space-y-4">
                                     <div className="border border-gray-400 w-16 h-10 flex items-center justify-center text-xs text-muted-foreground">Stamp</div>
                                     <div className="space-y-2">
                                        <Label htmlFor="recipient">To:</Label>
                                        <Input id="recipient" placeholder="Recipient's Name" className="bg-transparent" />
                                     </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button onClick={handleSend} size="lg">
                        <Send className="mr-2 h-4 w-4" />
                        Send Postcard
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
