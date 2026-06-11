
import Link from 'next/link';
import Image from 'next/image';
import { brands } from '@/lib/brands';
import { Card, CardHeader } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

export default function SectionsPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <header className="mb-8 text-center">
        <h1 className="font-headline text-5xl font-bold">Sections</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Explore our content by browsing through the different sections.
        </p>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {brands.map((brand) => (
          <Link key={brand.slug} href={`/articles?category=${brand.slug}`} className="group block">
            <Card 
                className="relative overflow-hidden aspect-square rounded-lg transition-all duration-300 ease-in-out hover:shadow-2xl"
                style={{
                    '--brand-color': `hsl(var(--brand-${brand.slug}))`,
                } as React.CSSProperties}
            >
                <Image
                    src={brand.image}
                    alt={brand.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    data-ai-hint={brand.dataAiHint}
                />
                <div className="absolute inset-0 bg-black/50 transition-colors duration-300 group-hover:bg-[var(--brand-color)]/80" />
                <div className="relative flex h-full flex-col justify-end p-6 text-white">
                    <h2 className="font-headline text-2xl font-bold">{brand.name}</h2>
                    <p className="text-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100">{brand.description}</p>
                    <ArrowRight className="absolute right-4 top-4 h-6 w-6 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
