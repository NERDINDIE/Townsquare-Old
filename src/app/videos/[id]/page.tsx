
'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { ThumbsUp, ThumbsDown, Share2, PlusSquare, Play } from "@/components/icons";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { videoData, recommendedVideos, comments } from "@/lib/data/video-data";

export async function generateStaticParams() {
  return Object.keys(videoData).map((id) => ({
    id,
  }));
}

export default function VideoPage({ params }: { params: { id: string } }) {
    const video = videoData[params.id as keyof typeof videoData];

    if (!video) {
        notFound();
    }

    return (
        <div className="container mx-auto max-w-7xl px-4 py-8 md:py-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2">
                    {/* Video Player */}
                    <div className="aspect-video bg-black rounded-lg overflow-hidden">
                        <video src={video.videoUrl} controls autoPlay className="w-full h-full" />
                    </div>

                    {/* Video Info */}
                    <div className="mt-4">
                        <h1 className="text-2xl font-bold font-headline">{video.title}</h1>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-2">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <span>{video.views}</span>
                                <span>&bull;</span>
                                <span>{video.uploadDate}</span>
                            </div>
                            <div className="flex items-center gap-2 mt-2 sm:mt-0">
                                <Button variant="ghost" size="sm" className="flex items-center gap-2"><ThumbsUp className="h-5 w-5"/>{video.likes}</Button>
                                <Button variant="ghost" size="sm" className="flex items-center gap-2"><ThumbsDown className="h-5 w-5"/>{video.dislikes}</Button>
                                <Button variant="ghost" size="sm" className="flex items-center gap-2"><Share2 className="h-5 w-5"/>Share</Button>
                                <Button variant="ghost" size="sm" className="flex items-center gap-2"><PlusSquare className="h-5 w-5"/>Save</Button>
                            </div>
                        </div>
                    </div>

                    <Separator className="my-4" />

                    {/* Channel Info */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Avatar className="h-12 w-12">
                                <AvatarImage src={video.channel.avatar} />
                                <AvatarFallback>{video.channel.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-semibold">{video.channel.name}</p>
                                <p className="text-sm text-muted-foreground">{video.channel.subscribers} subscribers</p>
                            </div>
                        </div>
                        <Button>Subscribe</Button>
                    </div>

                    {/* Description */}
                    <Card className="mt-4 bg-muted/50 p-4">
                        <p className="whitespace-pre-wrap text-sm">{video.description}</p>
                    </Card>

                    <Separator className="my-8" />
                    
                    {/* Comments Section */}
                    <section>
                        <h2 className="text-xl font-bold mb-4">{comments.length} Comments</h2>
                         <div className="flex items-start space-x-4 mb-6">
                            <Avatar>
                                <AvatarFallback>ME</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <Textarea placeholder="Add a comment..." className="mb-2" />
                                <div className="flex justify-end">
                                    <Button size="sm">Comment</Button>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-6">
                            {comments.map((comment, index) => (
                                <div key={index} className="flex items-start space-x-4">
                                     <Avatar>
                                        <AvatarImage src={comment.avatar} />
                                        <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="flex items-baseline gap-2">
                                            <p className="font-semibold text-sm">{comment.author}</p>
                                            <p className="text-xs text-muted-foreground">{comment.time}</p>
                                        </div>
                                        <p className="mt-1">{comment.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Recommended Videos */}
                <aside className="lg:col-span-1 space-y-4">
                    <h2 className="text-xl font-bold">Up next</h2>
                    {recommendedVideos.map(rec => (
                        <Link href={`/videos/${rec.id}`} key={rec.id} className="group flex items-start gap-4">
                            <div className="relative w-40 h-24 rounded-lg overflow-hidden flex-shrink-0">
                                <Image src={rec.thumbnail} alt={rec.title} fill className="object-cover" data-ai-hint={rec.dataAiHint} />
                            </div>
                            <div>
                                <h3 className="font-semibold leading-tight line-clamp-2 group-hover:text-primary">{rec.title}</h3>
                                <p className="text-sm text-muted-foreground mt-1">{rec.channel}</p>
                                <p className="text-xs text-muted-foreground">{rec.views}</p>
                            </div>
                        </Link>
                    ))}
                </aside>
            </div>
        </div>
    );
}
