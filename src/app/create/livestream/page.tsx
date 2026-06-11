
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Rss } from "@/components/icons";
import Link from "next/link";

export default function CreateLivestreamPage() {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-8 md:py-12">
      <header className="mb-8">
        <Button asChild variant="ghost" className="mb-4 -ml-4">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Feed
          </Link>
        </Button>
        <h1 className="font-headline text-4xl font-bold">Start a Livestream</h1>
        <p className="text-muted-foreground mt-1">
          Go live to your audience.
        </p>
      </header>

      <Card>
        <CardHeader>
            <CardTitle>Stream Details</CardTitle>
            <CardDescription>Give your stream a title and description so people know what it's about.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" placeholder="e.g., Live from the City Park" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" placeholder="Tell viewers what you'll be streaming" />
          </div>
        </CardContent>
        <CardFooter>
          <Button size="lg">
            <Rss className="mr-2 h-5 w-5" />
            Go Live
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
