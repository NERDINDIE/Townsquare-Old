
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { ArrowLeft, Rss, Trash2, Globe, PlusCircle } from "@/components/icons";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { initialFeeds, type Feed } from "@/lib/data/connections-data";

export default function RssConnectionsPage() {
    const router = useRouter();
    const [feeds, setFeeds] = useState<Feed[]>(initialFeeds);
    const [newFeedUrl, setNewFeedUrl] = useState('');
    const [newFeedName, setNewFeedName] = useState('');

    const handleAddFeed = () => {
        if (!newFeedUrl.trim() || !newFeedName.trim()) {
            toast({
                variant: 'destructive',
                title: 'Missing Information',
                description: 'Please provide both a name and a URL for the feed.',
            });
            return;
        }
        
        const newFeed: Feed = {
            id: Date.now(),
            name: newFeedName,
            url: newFeedUrl,
        };

        setFeeds([...feeds, newFeed]);
        setNewFeedName('');
        setNewFeedUrl('');

        toast({
            title: 'Feed Added',
            description: `The "${newFeed.name}" feed has been successfully connected.`,
        });
    }
    
    const handleRemoveFeed = (id: number) => {
        setFeeds(feeds.filter(feed => feed.id !== id));
         toast({
            title: 'Feed Removed',
            description: 'The RSS feed has been disconnected.',
        });
    }

    return (
        <div className="container mx-auto max-w-2xl px-4 py-8 md:py-12">
            <header className="mb-8">
                <Button onClick={() => router.back()} variant="ghost" className="mb-4 -ml-4">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Connections
                </Button>
                <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center">
                       <Rss className="h-8 w-8 text-orange-500" />
                    </div>
                    <div>
                        <h1 className="font-headline text-4xl font-bold">RSS Feeds</h1>
                        <p className="text-muted-foreground mt-1">
                            Manage your connected content feeds.
                        </p>
                    </div>
                </div>
            </header>

            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Add New Feed</CardTitle>
                    <CardDescription>Enter the URL of an RSS feed to connect it.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div className="space-y-2">
                        <Label htmlFor="feed-name">Feed Name</Label>
                        <Input 
                            id="feed-name" 
                            placeholder="e.g., My Company Blog" 
                            value={newFeedName} 
                            onChange={(e) => setNewFeedName(e.target.value)} 
                        />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="feed-url">Feed URL</Label>
                        <Input 
                            id="feed-url" 
                            placeholder="https://example.com/rss.xml" 
                            value={newFeedUrl} 
                            onChange={(e) => setNewFeedUrl(e.target.value)} 
                        />
                    </div>
                </CardContent>
                <CardFooter>
                     <Button onClick={handleAddFeed}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Connect Feed
                    </Button>
                </CardFooter>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Connected Feeds</CardTitle>
                    <CardDescription>
                        Content from these feeds will be eligible to appear in your brand pages.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                    {feeds.length > 0 ? feeds.map((feed) => (
                        <div key={feed.id} className="flex items-center gap-4 p-3 rounded-lg border">
                            <div className="flex h-10 w-10 items-center justify-center bg-muted rounded-lg">
                                <Globe className="h-6 w-6 text-muted-foreground" />
                            </div>
                            <div className="flex-1">
                                <p className="font-semibold">{feed.name}</p>
                                <p className="text-sm text-muted-foreground truncate">{feed.url}</p>
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => handleRemoveFeed(feed.id)}>
                                <Trash2 className="h-5 w-5 text-destructive" />
                            </Button>
                        </div>
                    )) : (
                        <p className="text-sm text-muted-foreground text-center p-4">No feeds connected yet.</p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
