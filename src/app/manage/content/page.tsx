
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, PlusCircle, Newspaper, Video, Mic } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const contentTypes = [
    { name: "Article", icon: <Newspaper />, href: "/create/post" },
    { name: "Video", icon: <Video />, href: "/create/video" },
    { name: "Podcast", icon: <Mic />, href: "/create/podcast" },
];

export default function ContentManagerPage() {
    const router = useRouter();

    return (
        <div className="container mx-auto max-w-4xl px-4 py-8 md:py-12">
            <header className="mb-8">
                <Button onClick={() => router.back()} variant="ghost" className="mb-4 -ml-4">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Profile
                </Button>
                <h1 className="font-headline text-4xl font-bold flex items-center gap-3">
                    Content Manager
                </h1>
                <p className="text-muted-foreground mt-1">
                    Create and manage your content for Townsquare.
                </p>
            </header>

            <Card>
                <CardHeader>
                    <CardTitle>Create New Content</CardTitle>
                    <CardDescription>Select a content type to start creating.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {contentTypes.map(type => (
                        <Link href={type.href} key={type.name}>
                            <Card className="text-center p-8 hover:bg-muted/50 hover:shadow-lg transition-all flex flex-col items-center justify-center h-full">
                                <div className="text-primary h-12 w-12 flex items-center justify-center [&>svg]:h-10 [&>svg]:w-10">
                                    {type.icon}
                                </div>
                                <p className="mt-4 text-xl font-bold">{type.name}</p>
                            </Card>
                        </Link>
                    ))}
                </CardContent>
            </Card>

             <Card className="mt-8">
                <CardHeader>
                    <CardTitle>Manage Existing Content</CardTitle>
                    <CardDescription>View, edit, or delete your previously published content.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button asChild>
                        <Link href="/manage">
                            Go to Content Table
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
