

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Edit, HeartPulse, Footprints, BedDouble, ShieldCheck, KeyRound, ShieldAlert, Users, Trophy, Wallet, MoreHorizontal, ThumbsUp, MessageCircle, Repeat, Share2, Video, Rss, FileText, Newspaper, PlayCircle, Smile, Heart, Dumbbell, CalendarHeart, UserPlus, Check, X, Code, ShoppingCart, UploadCloud, BookOpen, ImageIcon, ChefHat, Sparkles } from "@/components/icons";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";
import { List, ListItem } from "@/components/ui/list";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { citizenData, friends, friendRequests, achievements, userPosts, userVideos, acceptanceTips } from "@/lib/data/profile-data";
import { aiCreations } from "@/lib/data/ai-creations-data";


export default function ProfilePage() {

  const getCreationIcon = (type: string) => {
    switch (type) {
        case 'Poem': return <BookOpen className="h-5 w-5 text-purple-500" />;
        case 'Image': return <ImageIcon className="h-5 w-5 text-blue-500" />;
        case 'Recipe': return <ChefHat className="h-5 w-5 text-orange-500" />;
        default: return <Sparkles className="h-5 w-5 text-yellow-500" />;
    }
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 md:py-12">
      <header className="mb-8">
        <h1 className="font-headline text-4xl font-bold">Your Profile</h1>
        <p className="text-muted-foreground mt-1">View and manage your public profile information.</p>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-8">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle className="text-2xl">Public Profile</CardTitle>
                        <CardDescription>This is how others will see you on the site.</CardDescription>
                    </div>
                    <Button asChild size="sm" variant="outline">
                        <Link href="/settings">
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Profile
                        </Link>
                    </Button>
                </CardHeader>
                <CardContent className="space-y-6">
                    <Separator />
                    <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                        <Avatar className="h-24 w-24">
                            <AvatarImage src={citizenData.avatar} alt={citizenData.name} />
                            <AvatarFallback>{citizenData.initials}</AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                            <h2 className="text-2xl font-bold">{citizenData.name}</h2>
                            <p className="text-muted-foreground">janedoe@example.com</p>
                            <div className="mt-2">
                                <div className="flex items-center gap-2">
                                    <span className="font-semibold text-primary">Level 5</span>
                                    <Badge variant="destructive" className="flex items-center gap-1"><Code className="h-3 w-3"/> Developer</Badge>
                                </div>
                                <Progress value={62.5} className="mt-1 h-2" />
                                <p className="text-xs text-muted-foreground mt-1">1,250 / 2,000 XP</p>
                            </div>
                        </div>
                    </div>
                    <p className="text-foreground/80 max-w-md">
                        Passionate journalist and community storyteller. I believe in the power of local news to connect us all. When I'm not writing, you can find me exploring the city's parks or trying out a new recipe.
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Creator &amp; Seller Tools</CardTitle>
                    <CardDescription>Manage your content and sales on Townsquare.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Link href="/manage/content">
                        <Card className="h-full hover:bg-muted/50 transition-colors">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><UploadCloud /> Content Manager</CardTitle>
                                <CardDescription>Manage your articles, videos, and podcasts.</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                     <Link href="/manage/shop">
                        <Card className="h-full hover:bg-muted/50 transition-colors">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><ShoppingCart /> Shop Builder</CardTitle>
                                <CardDescription>Manage your products and online store.</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>My Space</CardTitle>
                    <CardDescription>Your published content, AI creations, and media.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="posts">
                        <TabsList className="grid w-full grid-cols-5">
                            <TabsTrigger value="posts"><FileText className="h-4 w-4 mr-2"/>Posts</TabsTrigger>
                            <TabsTrigger value="ai-creations"><Sparkles className="h-4 w-4 mr-2"/>Creations</TabsTrigger>
                            <TabsTrigger value="videos"><Video className="h-4 w-4 mr-2"/>Videos</TabsTrigger>
                            <TabsTrigger value="livestreams"><Rss className="h-4 w-4 mr-2"/>Livestreams</TabsTrigger>
                            <TabsTrigger value="publications"><Newspaper className="h-4 w-4 mr-2"/>Publications</TabsTrigger>
                        </TabsList>
                        <TabsContent value="posts" className="mt-4">
                             <div className="space-y-4">
                                {userPosts.map((post, index) => (
                                    <Card key={index}>
                                        <CardHeader className="flex flex-row items-center gap-3">
                                            <Avatar>
                                                <AvatarImage src={citizenData.avatar} alt={citizenData.name} />
                                                <AvatarFallback>{citizenData.initials}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1">
                                                <p className="font-semibold">{citizenData.name}</p>
                                                <p className="text-xs text-muted-foreground">{post.time}</p>
                                            </div>
                                            <Button variant="ghost" size="icon">
                                                <MoreHorizontal />
                                            </Button>
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
                                                <Share2 className="mr-2 h-5 w-5" />
                                                Share
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                ))}
                            </div>
                        </TabsContent>
                        <TabsContent value="ai-creations" className="mt-4">
                            <div className="space-y-4">
                                {aiCreations.map((item) => (
                                    <Card key={item.id}>
                                        <CardHeader className="flex-row items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                {getCreationIcon(item.type)}
                                                <CardTitle className="text-xl">{item.title || `${item.type} Creation`}</CardTitle>
                                            </div>
                                            <Badge variant="outline">{item.type}</Badge>
                                        </CardHeader>
                                        <CardContent className="space-y-3">
                                            <p className="text-sm text-muted-foreground italic">
                                                <span className="font-semibold not-italic">Prompt:</span> "{item.prompt}"
                                            </p>
                                            {item.type === 'Image' ? (
                                                <div className="relative aspect-video w-full max-w-md mx-auto rounded-lg overflow-hidden">
                                                    <Image src={item.content} alt={item.prompt} fill className="object-cover" data-ai-hint={item.dataAiHint} />
                                                </div>
                                            ) : (
                                                <blockquote className="border-l-4 pl-4 text-muted-foreground">
                                                    {item.content}
                                                </blockquote>
                                            )}
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </TabsContent>
                        <TabsContent value="videos" className="mt-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {userVideos.map((video, index) => (
                                     <Card key={index} className="group overflow-hidden">
                                        <CardContent className="p-0">
                                            <div className="relative aspect-video w-full">
                                                <Image src={video.thumbnail} alt={video.title} fill className="object-cover" data-ai-hint={video.dataAiHint} />
                                                 <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                                    <PlayCircle className="h-10 w-10 text-white/80 group-hover:text-white transition-colors" />
                                                </div>
                                            </div>
                                        </CardContent>
                                        <CardFooter className="p-3">
                                            <div>
                                                <h3 className="font-semibold truncate">{video.title}</h3>
                                                <p className="text-xs text-muted-foreground">{video.duration}</p>
                                            </div>
                                        </CardFooter>
                                    </Card>
                                ))}
                            </div>
                        </TabsContent>
                         <TabsContent value="livestreams" className="mt-4">
                            <Card className="flex flex-col items-center justify-center h-64 border-dashed text-center">
                                <Rss className="h-16 w-16 text-muted-foreground" />
                                <h3 className="mt-4 text-xl font-semibold">You are not live</h3>
                                <p className="mt-2 text-muted-foreground">Start a livestream from the "On Air" section.</p>
                                <Button className="mt-4">Go Live</Button>
                            </Card>
                        </TabsContent>
                        <TabsContent value="publications" className="mt-4">
                            <Card className="flex flex-col items-center justify-center h-64 border-dashed text-center">
                                <Newspaper className="h-16 w-16 text-muted-foreground" />
                                <h3 className="mt-4 text-xl font-semibold">No Publications Yet</h3>
                                <p className="mt-2 text-muted-foreground">Create your own zine or newspaper.</p>
                                <Button className="mt-4">Create Publication</Button>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Trophy className="h-6 w-6 text-yellow-500" />
                        Recent Achievements
                    </CardTitle>
                    <CardDescription>Unlocked in the Arcade Saloon.</CardDescription>
                </CardHeader>
                <CardContent>
                    <List>
                        {achievements.map((ach, index) => (
                            <ListItem key={index}>
                                <div className="text-2xl w-8 text-center">{ach.icon}</div>
                                <div className="flex-1">
                                    <p className="font-semibold">{ach.name}</p>
                                    <p className="text-xs text-muted-foreground">{ach.game}</p>
                                </div>
                                <p className="text-sm font-bold text-yellow-500">+50 XP</p>
                            </ListItem>
                        ))}
                    </List>
                </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-1 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2"><Wallet /> Wallet</CardTitle>
                </CardHeader>
                <CardContent>
                   <Button asChild className="w-full">
                        <Link href="/wallet">Manage Wallet</Link>
                    </Button>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2">
                        <Users className="h-6 w-6" />
                        Family &amp; Friends
                    </CardTitle>
                    <CardDescription>Your connected friends.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                         {friends.map((friend, index) => (
                            <div key={index} className="flex items-center gap-3">
                                <Avatar>
                                    <AvatarImage src={friend.avatar} alt={friend.name} />
                                    <AvatarFallback>{friend.initials}</AvatarFallback>
                                </Avatar>
                                <p className="font-medium flex-1">{friend.name}</p>
                                 <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2">
                        <UserPlus className="h-6 w-6" />
                        Friend Requests
                    </CardTitle>
                    <CardDescription>
                        You have {friendRequests.length} pending request{friendRequests.length !== 1 && 's'}.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                    {friendRequests.map((request, index) => (
                        <div key={index} className="flex items-center gap-3">
                            <Avatar>
                                <AvatarImage src={request.avatar} alt={request.name} />
                                <AvatarFallback>{request.fallback}</AvatarFallback>
                            </Avatar>
                            <p className="font-medium flex-1">{request.name}</p>
                            <div className="flex gap-1">
                                <Button size="icon" className="h-8 w-8 bg-green-500 hover:bg-green-600">
                                    <Check className="h-4 w-4" />
                                </Button>
                                <Button size="icon" variant="destructive" className="h-8 w-8">
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl">Health &amp; Wellness</CardTitle>
                    <CardDescription>Data from your connected Pixel Watch.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                        <HeartPulse className="h-6 w-6 text-red-500" />
                        <div>
                            <p className="font-semibold">Heart Rate</p>
                            <p className="text-2xl font-bold">72 <span className="text-sm font-normal text-muted-foreground">bpm</span></p>
                        </div>
                    </div>
                    <Separator />
                    <div className="flex items-center gap-4">
                        <Footprints className="h-6 w-6 text-blue-500" />
                        <div>
                            <p className="font-semibold">Steps</p>
                            <p className="text-2xl font-bold">8,452</p>
                        </div>
                    </div>
                     <Separator />
                    <div className="flex items-center gap-4">
                        <BedDouble className="h-6 w-6 text-purple-500" />
                        <div>
                            <p className="font-semibold">Sleep</p>
                            <p className="text-2xl font-bold">7h 32m</p>
                        </div>
                    </div>
                    <Separator />
                    <Button asChild variant="outline" className="w-full">
                         <Link href="/health">Go to Health Hub</Link>
                    </Button>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle className="text-xl">Account Security</CardTitle>
                    <CardDescription>Your account security is strong.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Progress value={85} aria-label="85% account security" />
                    <List>
                        <ListItem>
                            <ShieldCheck className="h-5 w-5 text-green-500" />
                            <p>2-Factor Authentication is enabled.</p>
                        </ListItem>
                        <ListItem>
                            <KeyRound className="h-5 w-5 text-green-500" />
                            <p>Password was changed 3 months ago.</p>
                        </ListItem>
                        <ListItem>
                            <ShieldAlert className="h-5 w-5 text-yellow-500" />
                            <p>Review connected apps.</p>
                        </ListItem>
                    </List>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
