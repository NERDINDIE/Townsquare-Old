
'use client';

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, ThumbsUp, MessageCircle, Repeat, Share, ShieldAlert, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PostWithAuthor } from "@/lib/bulletin-board-data";
import { toast } from "@/hooks/use-toast";
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";


async function flagContent(contentId: string) {
    try {
        const response = await fetch(`/api/flag/${contentId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ reason: 'Inappropriate Content' })
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

export function PostCard({ post }: { post: PostWithAuthor }) {
    return (
        <Card className="rounded-lg">
            <CardHeader className="flex flex-row items-center gap-3">
                <Link href={`/bulletin-board/${post.author.handle}`}>
                    <Avatar>
                        <AvatarImage src={post.author.avatar} alt={post.author.name} />
                        <AvatarFallback>{post.author.fallback}</AvatarFallback>
                    </Avatar>
                </Link>
                <div className="flex-1">
                    <Link href={`/bulletin-board/${post.author.handle}`} className="hover:underline">
                        <p className="font-semibold">{post.author.name}</p>
                    </Link>
                     <div className="text-xs text-muted-foreground flex items-center gap-2">
                        <span>{post.time}</span>
                        {post.location && (
                             <>
                                <span>&bull;</span>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <button className="flex items-center gap-1 hover:underline">
                                            <MapPin className="h-3 w-3" />
                                            {post.location.name}
                                        </button>
                                    </PopoverTrigger>
                                    <PopoverContent className="p-0 w-80">
                                        <div className="relative aspect-video w-full">
                                            <Image 
                                                src="https://storage.googleapis.com/studioprompt-images/city-map-bg.png"
                                                alt="City map"
                                                fill
                                                className="object-cover rounded-t-lg"
                                                data-ai-hint="city map"
                                            />
                                            <div className="absolute" style={{ top: `${post.location.lat}%`, left: `${post.location.lng}%`}}>
                                                 <div className="relative transform -translate-x-1/2 -translate-y-1/2">
                                                    <MapPin className="h-8 w-8 text-destructive drop-shadow-lg" />
                                                 </div>
                                            </div>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </>
                        )}
                    </div>
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
                    <div className="mt-4 rounded-lg overflow-hidden border">
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
    );
}
