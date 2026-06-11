
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardHeader } from '@/components/ui/card';
import { Globe, ArrowRight, User, Users, BookHeart, Landmark } from 'lucide-react';
import { townsquares, townsquaresByCountry } from '@/lib/townsquares';
import { neighbourhoods } from '@/lib/data/neighbourhoods';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function TownsquaresPage() {
  const realWorldSquares = townsquaresByCountry.filter(c => c.countryName !== 'Fictional' && c.countryName !== 'Spain (Fictional)');
  const fictionalSquares = townsquares.filter(ts => 
    townsquaresByCountry.find(c => c.countryName === 'Fictional')?.squares.some(s => s.slug === ts.slug)
  );

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <header className="mb-8 text-center">
        <h1 className="font-headline text-5xl font-bold flex items-center justify-center gap-3">
            <Globe className="h-12 w-12 text-primary" />
            Townsquares
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Explore our cyber-neighborhoods, each with its own unique character.
        </p>
      </header>
      
       <Tabs defaultValue="real-world" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:w-96 mx-auto">
                <TabsTrigger value="real-world"><Landmark className="mr-2 h-4 w-4" /> Real World</TabsTrigger>
                <TabsTrigger value="fictional"><BookHeart className="mr-2 h-4 w-4" /> Fictional</TabsTrigger>
            </TabsList>

            <TabsContent value="real-world" className="mt-12">
                <section className="mb-12">
                    <h2 className="font-headline text-3xl font-bold mb-6 flex items-center gap-3"><Users className="h-8 w-8" /> Neighbourhoods</h2>
                    <p className="text-muted-foreground mb-6 max-w-2xl">These are community-run spaces for discussing hobbies, interests, and daily life. Jump in and join the conversation!</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {neighbourhoods.map((hood) => (
                            <Link key={hood.slug} href={`/townsquares/neighbourhood/${hood.slug}`} className="group block">
                                <Card className="relative overflow-hidden aspect-video rounded-lg transition-all duration-300 ease-in-out hover:shadow-2xl">
                                    <Image
                                        src={hood.image}
                                        alt={hood.name}
                                        fill
                                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                                        data-ai-hint={hood.dataAiHint}
                                    />
                                    <div className="absolute inset-0 bg-black/50 transition-colors duration-300 group-hover:bg-black/60" />
                                    <div className="relative flex h-full flex-col justify-between p-4 text-white">
                                        <div>
                                            <h3 className="font-headline text-2xl font-bold">{hood.name}</h3>
                                            <p className="text-sm opacity-90">{hood.description}</p>
                                        </div>
                                        <div className="self-end">
                                            <ArrowRight className="h-6 w-6 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1" />
                                        </div>
                                    </div>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </section>

                <Separator className="my-16" />

                <div className="space-y-12">
                    {realWorldSquares.map((countryGroup) => (
                    <section key={countryGroup.countryName}>
                        <h2 className="font-headline text-3xl font-bold mb-6">{countryGroup.countryName}</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {countryGroup.squares.map((square) => (
                            <Link key={square.slug} href={`/townsquares/${square.slug}`} className="group block">
                            <Card 
                                className="relative overflow-hidden aspect-square rounded-lg transition-all duration-300 ease-in-out hover:shadow-2xl"
                            >
                                <Image
                                    src={square.image}
                                    alt={square.name}
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                    data-ai-hint={square.dataAiHint}
                                />
                                <div className="absolute inset-0 bg-black/50 transition-colors duration-300 group-hover:bg-black/60" />
                                <div className="relative flex h-full flex-col justify-end p-6 text-white">
                                    <h2 className="font-headline text-2xl font-bold">{square.name}</h2>
                                    <p className="text-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100">{square.description}</p>
                                    <ArrowRight className="absolute right-4 top-4 h-6 w-6 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1" />
                                </div>
                            </Card>
                            </Link>
                        ))}
                        </div>
                    </section>
                    ))}
                </div>
            </TabsContent>
            
            <TabsContent value="fictional" className="mt-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {fictionalSquares.map((square) => (
                        <Link key={square.slug} href={`/townsquares/${square.slug}`} className="group block">
                        <Card 
                            className="relative overflow-hidden aspect-square rounded-lg transition-all duration-300 ease-in-out hover:shadow-2xl"
                        >
                            <Image
                                src={square.image}
                                alt={square.name}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                data-ai-hint={square.dataAiHint}
                            />
                            <div className="absolute inset-0 bg-black/50 transition-colors duration-300 group-hover:bg-black/60" />
                            <div className="relative flex h-full flex-col justify-end p-6 text-white">
                                <h2 className="font-headline text-2xl font-bold">{square.name}</h2>
                                <p className="text-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100">{square.description}</p>
                                <ArrowRight className="absolute right-4 top-4 h-6 w-6 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1" />
                            </div>
                        </Card>
                        </Link>
                    ))}
                </div>
            </TabsContent>
        </Tabs>
    </div>
  );
}
