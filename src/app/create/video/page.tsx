
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, UploadCloud } from "@/components/icons";
import Link from "next/link";

export default function CreateVideoPage() {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-8 md:py-12">
      <header className="mb-8">
        <Button asChild variant="ghost" className="mb-4 -ml-4">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Feed
          </Link>
        </Button>
        <h1 className="font-headline text-4xl font-bold">Upload a New Video</h1>
        <p className="text-muted-foreground mt-1">
          Share a video with your followers.
        </p>
      </header>

      <Card>
        <CardContent className="p-6 space-y-6">
          <div className="flex flex-col items-center justify-center w-full p-8 border-2 border-dashed rounded-lg">
            <UploadCloud className="h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">Drag & drop video files to upload</h3>
            <p className="text-sm text-muted-foreground">Your videos will be private until you publish them.</p>
            <Button variant="outline" className="mt-4">
              Select Files
            </Button>
          </div>
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" placeholder="e.g., A Day in the City" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" placeholder="Tell viewers about your video" />
          </div>
        </CardContent>
        <CardFooter>
          <Button>Publish Video</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
