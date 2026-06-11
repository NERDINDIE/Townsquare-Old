
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

const comics = [
    {
        title: 'Cosmic Chuckles',
        image: 'https://placehold.co/600x200.png',
        dataAiHint: 'single panel comic strip',
    },
    {
        title: 'Office Antics',
        image: 'https://placehold.co/600x200.png',
        dataAiHint: 'single panel comic strip',
    },
     {
        title: 'Suburban Slice',
        image: 'https://placehold.co/600x200.png',
        dataAiHint: 'single panel comic strip',
    }
]

export default function FunniesPage() {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-8 md:py-12">
        <header className="mb-8 text-center">
            <h1 className="font-headline text-5xl font-bold">Funnies</h1>
            <p className="mt-2 text-lg text-muted-foreground">
                Daily comics, memes, and more.
            </p>
            <Button asChild variant="link" className="mt-2">
                <Link href="/funnies-epaper">View Full E-Paper Funny Pages</Link>
            </Button>
        </header>
        <div className="space-y-8">
            {comics.map((comic) => (
                <Card key={comic.title}>
                    <CardContent className="p-2">
                         <Image 
                            src={comic.image} 
                            alt={comic.title} 
                            width={800} 
                            height={266} 
                            className="w-full rounded-md"
                            data-ai-hint={comic.dataAiHint}
                        />
                    </CardContent>
                </Card>
            ))}
        </div>
    </div>
  );
}
