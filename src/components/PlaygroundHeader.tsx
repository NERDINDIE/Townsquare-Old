
'use client';

import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { ArrowLeft } from 'lucide-react';

export function PlaygroundHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between">
        <div className="flex items-center gap-4">
            <Button asChild variant="ghost" size="icon">
                <Link href="/">
                    <ArrowLeft />
                </Link>
            </Button>
            <Link href="/playground">
                <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400" style={{ fontFamily: "'Comic Sans MS', 'Chalkboard SE', 'Marker Felt', sans-serif" }}>
                    Playground
                </h1>
            </Link>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-sm font-medium">Child Profile</p>
          <Avatar className="h-9 w-9">
            <AvatarImage src="https://placehold.co/100x100/FFC107/424242?text=C" alt="Child" />
            <AvatarFallback>C</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
