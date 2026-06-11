
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { publications, Publication } from '@/lib/epaper';
import Link from 'next/link';

function PublicationComponent({ publication }: { publication: Publication }) {
  const [selectedEdition, setSelectedEdition] = useState(publication.editions[0]);
  const isFlyer = publication.slug === 'supermarket-flyer';

  const linkTarget = isFlyer ? `/${publication.slug}` : '#';

  return (
    <div>
       <Link href={linkTarget}>
        <div className="relative mb-4 aspect-[3/4] w-full max-w-md mx-auto">
            <Image
            src={selectedEdition.coverImage}
            alt={`Cover of ${publication.name} for ${selectedEdition.date}`}
            fill
            priority
            className="object-contain"
            data-ai-hint="newspaper cover"
            />
        </div>
      </Link>
      <p className="text-center text-sm text-muted-foreground mb-8">{selectedEdition.date}</p>

      <div className="px-4">
          <h2 className="text-lg font-semibold mb-4">Previous Editions</h2>
          <Carousel
            opts={{
              align: 'start',
              slidesToScroll: 'auto',
            }}
            className="w-full"
          >
            <CarouselContent>
              {publication.editions.map((edition) => (
                <CarouselItem key={edition.id} className="basis-1/3 md:basis-1/4 lg:basis-1/5">
                  <button onClick={() => setSelectedEdition(edition)} className="w-full text-left">
                    <Card className="overflow-hidden">
                        <CardContent className="p-0 aspect-[3/4] relative">
                            <Image
                                src={edition.coverImage}
                                alt={`Cover of ${publication.name} for ${edition.date}`}
                                fill
                                className="object-cover"
                            />
                        </CardContent>
                    </Card>
                    <p className="mt-2 text-xs text-center text-muted-foreground">{edition.date.split(',')[0]}</p>
                  </button>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className='-left-2'/>
            <CarouselNext className='-right-2' />
          </Carousel>
      </div>
    </div>
  );
}

export default function NewsstandPage() {
    const [activeTab, setActiveTab] = useState(publications[0].slug);
    const activePublication = publications.find(p => p.slug === activeTab);
  
  return (
    <div className="pb-24">
      <header className="flex justify-center p-4 border-b">
        <Image 
            src={`https://placehold.co/200x40.png?text=${activePublication?.logoText ?? 'TOWNSQUARE'}&font=roboto`} 
            alt={activePublication?.name ?? 'Townsquare'} 
            width={200} 
            height={40} 
            data-ai-hint="logo" 
        />
      </header>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
            <div className='container mx-auto'>
                {publications.map(pub => (
                    <TabsTrigger 
                        key={pub.id} 
                        value={pub.slug}
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none px-4"
                    >
                        {pub.name}
                    </TabsTrigger>
                ))}
            </div>
        </TabsList>
        <div className="py-8">
            {publications.map(pub => (
                 <TabsContent key={pub.id} value={pub.slug}>
                    <PublicationComponent publication={pub} />
                </TabsContent>
            ))}
        </div>
      </Tabs>
    </div>
  );
}
