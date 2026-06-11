
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Newspaper, PenSquare } from "@/components/icons";
import Link from "next/link";

export default function CreatePublicationPage() {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-8 md:py-12">
      <header className="mb-8">
        <Button asChild variant="ghost" className="mb-4 -ml-4">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Feed
          </Link>
        </Button>
        <h1 className="font-headline text-4xl font-bold">Create a Publication</h1>
        <p className="text-muted-foreground mt-1">
          Start your own newspaper or zine.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="flex flex-col">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <Newspaper className="h-16 w-16 text-primary" />
            </div>
            <CardTitle className="text-center">Start a Newspaper</CardTitle>
            <CardDescription className="text-center">
                Create a classic newspaper with multiple sections and a traditional layout.
            </CardDescription>
          </CardHeader>
          <CardFooter className="mt-auto">
            <Button className="w-full">Create Newspaper</Button>
          </CardFooter>
        </Card>
        <Card className="flex flex-col">
          <CardHeader>
             <div className="flex justify-center mb-4">
              <PenSquare className="h-16 w-16 text-primary" />
            </div>
            <CardTitle className="text-center">Create a Zine</CardTitle>
            <CardDescription className="text-center">
                Design a custom, visually-driven zine with a flexible layout.
            </CardDescription>
          </CardHeader>
          <CardFooter className="mt-auto">
            <Button asChild className="w-full">
              <Link href="/create/zine">Create Zine</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
