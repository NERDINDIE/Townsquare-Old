
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Car, Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { featuredRental, rentalTypes } from '@/lib/data/tyres-data';

export default function TyresPage() {
  return (
    <div
      className="container mx-auto max-w-6xl px-4 py-8 md:py-12"
      style={{ '--brand-color': 'hsl(var(--brand-tyres))' } as React.CSSProperties}
    >
      <header className="mb-8">
        <h1 className="font-headline text-5xl font-bold flex items-center gap-3" style={{ color: 'var(--brand-color)' }}>
          <Car className="h-12 w-12" />
          Tyres
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Your destination for car rentals and automotive content.
        </p>
      </header>

      <section className="mb-12">
        <Card className="p-6 bg-muted/50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label htmlFor="pickup-location" className="block text-sm font-medium text-muted-foreground mb-1">
                Pick-up & Drop-off Location
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="pickup-location"
                  type="search"
                  placeholder="City, airport, or address"
                  className="w-full h-12 pl-10"
                />
              </div>
            </div>
            <div>
              <label htmlFor="dates" className="block text-sm font-medium text-muted-foreground mb-1">
                Dates
              </label>
              <Input
                id="dates"
                type="text"
                placeholder="Select your dates"
                className="h-12"
              />
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <Button size="lg" style={{ backgroundColor: 'var(--brand-color)' }}>Search Cars</Button>
          </div>
        </Card>
      </section>

      <section className="mb-12">
        <Card className="overflow-hidden border-2" style={{ borderColor: 'var(--brand-color)' }}>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="relative aspect-video md:aspect-auto">
              <Image
                src={featuredRental.image}
                alt={featuredRental.name}
                fill
                className="object-cover"
                data-ai-hint={featuredRental.dataAiHint}
              />
            </div>
            <div className="p-6 md:p-8 flex flex-col justify-center">
              <CardHeader className="p-0">
                <CardDescription>Featured Rental</CardDescription>
                <CardTitle className="text-3xl font-bold font-headline">{featuredRental.name}</CardTitle>
                <p className="text-2xl font-semibold pt-1" style={{ color: 'var(--brand-color)' }}>
                  {featuredRental.price}
                </p>
              </CardHeader>
              <CardContent className="p-0 mt-4">
                <p>{featuredRental.description}</p>
              </CardContent>
              <CardFooter className="p-0 mt-6">
                <Button size="lg" style={{ backgroundColor: 'var(--brand-color)' }}>Book Now</Button>
              </CardFooter>
            </div>
          </div>
        </Card>
      </section>

      <section>
        <h2 className="font-headline text-3xl font-bold mb-6">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {rentalTypes.map((type) => (
            <Link href="#" key={type.name}>
              <Card className="group overflow-hidden">
                <CardContent className="p-0 relative aspect-video">
                  <Image
                    src={type.image}
                    alt={type.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                    data-ai-hint={type.dataAiHint}
                  />
                  <div className="absolute inset-0 bg-black/40" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-white font-bold text-2xl text-shadow-md">{type.name}</h3>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
