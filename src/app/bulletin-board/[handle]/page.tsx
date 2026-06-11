
'use client';

import { users } from "@/lib/bulletin-board-data";
import { notFound, useRouter } from "next/navigation";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MoreHorizontal, ThumbsUp, MessageCircle, Repeat, Share, ShieldAlert } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";

async function flagContent(contentId: string) {
    try {
        const response = await fetch(`/api/flag/${contentId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ reason: 'Inappropriate Content' }) // Example reason
        });
        const result = await response.json();
        if (result.success) {
            toast({
                title: "Post Reported",
                description: "This post has been flagged for review. Thank you for your feedback.",
            });
        } else {
            throw new Error(result.error || 'Failed to flag content.');
        }
    } catch (error) {
        console.error("Flagging failed:", error);
        toast({
            variant: "destructive",
            title: "Error",
            description: "Could not report the post. Please try again later.",
        });
    }
}

export async function generateStaticParams() {
    return users.map((user) => ({
        handle: user.handle,
    }));
}


export default function UserProfilePage({ params }: { params: { handle: string } }) {
    const router = useRouter();
    const user = users.find(u => u.handle === params.handle);

    if (!user) {
        notFound();
    }

    return (
        <div className="container mx-auto max-w-2xl px-0 py-8 md:px-4 md:py-12" style={{'--brand-color': 'hsl(var(--brand-bulletin-board))'} as React.CSSProperties}>
            <header className="mb-8 px-4">
                 <Button onClick={() => router.back()} variant="ghost" className="mb-4 -ml-4">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Bulletin Board
                </Button>
                <div className="flex items-center gap-4">
                    <Avatar className="h-20 w-20">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.fallback}</AvatarFallback>
                    </Avatar>
                    <div>
                        <h1 className="font-headline text-4xl font-bold">{user.name}</h1>
                        <p className="text-muted-foreground">@{user.handle}</p>
                    </div>
                </div>
            </header>

            <div className="space-y-6 pb-24">
                {user.posts.map((post, index) => (
                    <Card key={index} className="rounded-none md:rounded-lg">
                        <CardHeader className="flex flex-row items-center gap-3">
                            <Avatar>
                                <AvatarImage src={user.avatar} alt={user.name} />
                                <AvatarFallback>{user.fallback}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <p className="font-semibold">{user.name}</p>
                                <p className="text-xs text-muted-foreground">{post.time}</p>
                            </div>
                             <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                        <MoreHorizontal />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => flagContent(post.id)}>
                                        <ShieldAlert className="mr-2 h-4 w-4" />
                                        Report Post
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </CardHeader>
                        <CardContent>
                            <p className="whitespace-pre-wrap">{post.content}</p>
                            {post.image && (
                                <div className="mt-4 -mx-6 md:mx-0 md:rounded-lg overflow-hidden border">
                                    <div className="relative aspect-[3/2]">
                                        <Image src={post.image} alt="Post image" fill className="object-cover" data-ai-hint={post.dataAiHint} />
                                    </div>
                                </div>
                            )}
                             {post.images && (
                                <div className="mt-4 grid grid-cols-3 gap-1">
                                    {post.images.map((img, i) => (
                                        <div key={i} className="relative aspect-square">
                                            <Image src={img.src} alt={`Post image ${i+1}`} fill className="object-cover" data-ai-hint={img.hint} />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                        <CardFooter className="flex justify-around border-t pt-2">
                            <Button variant="ghost" className="text-muted-foreground">
                                <ThumbsUp className="mr-2 h-5 w-5" />
                                {post.likes}
                            </Button>
                            <Button variant="ghost" className="text-muted-foreground">
                                <MessageCircle className="mr-2 h-5 w-5" />
                                {post.comments}
                            </Button>
                            <Button variant="ghost" className="text-muted-foreground">
                                <Repeat className="mr-2 h-5 w-5" />
                                Repost
                            </Button>
                            <Button variant="ghost" className="text-muted-foreground">
                                <Share className="mr-2 h-5 w-5" />
                                Share
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
