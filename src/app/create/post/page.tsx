
'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, ImageIcon, Video, Mic } from "@/components/icons";
import Link from "next/link";
import { createPost } from "./actions";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function CreatePostPage() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  const handleCreatePost = async (formData: FormData) => {
    await createPost(formData);
    formRef.current?.reset();
    toast({
        title: "Post Created",
        description: "Your post has been successfully shared on the Bulletin Board.",
    });
    router.push('/bulletin-board');
  }

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8 md:py-12">
      <header className="mb-8">
        <Button asChild variant="ghost" className="mb-4 -ml-4">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Feed
          </Link>
        </Button>
        <h1 className="font-headline text-4xl font-bold">Create a New Post</h1>
        <p className="text-muted-foreground mt-1">
          Share your thoughts with the community.
        </p>
      </header>
      <form action={handleCreatePost} ref={formRef}>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start gap-4">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <Textarea
                name="postContent"
                placeholder="What's on your mind?"
                className="flex-1 border-0 shadow-none focus-visible:ring-0 text-lg resize-none min-h-32"
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between items-center p-4 border-t">
            <div className="flex gap-2 text-muted-foreground">
               <Button variant="ghost" size="icon">
                  <ImageIcon className="h-5 w-5" />
              </Button>
               <Button variant="ghost" size="icon">
                  <Video className="h-5 w-5" />
              </Button>
               <Button variant="ghost" size="icon">
                  <Mic className="h-5 w-5" />
              </Button>
            </div>
            <Button type="submit">Post</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
