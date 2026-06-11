
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Mic, UploadCloud } from "@/components/icons";
import Link from "next/link";

export default function CreatePodcastPage() {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-8 md:py-12">
      <header className="mb-8">
        <Button asChild variant="ghost" className="mb-4 -ml-4">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Feed
          </Link>
        </Button>
        <h1 className="font-headline text-4xl font-bold">Create a Podcast</h1>
        <p className="text-muted-foreground mt-1">
          Upload an episode or start a live audio broadcast.
        </p>
      </header>

      <Card>
        <CardHeader>
            <CardTitle>Episode Details</CardTitle>
            <CardDescription>Give your episode a title and description so people know what it's about.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
           <div className="flex flex-col items-center justify-center w-full p-8 border-2 border-dashed rounded-lg">
            <UploadCloud className="h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">Drag & drop audio file to upload</h3>
            <p className="text-sm text-muted-foreground">Your podcast will be private until you publish it.</p>
            <Button variant="outline" className="mt-4">
              Select File
            </Button>
          </div>
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" placeholder="e.g., Episode 1: The Beginning" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" placeholder="Tell listeners what your episode is about" />
          </div>
        </CardContent>
        <CardFooter className="flex gap-4">
          <Button size="lg">
            Publish Episode
          </Button>
           <Button size="lg" variant="secondary">
            <Mic className="mr-2 h-5 w-5" />
            Start Live Broadcast
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
