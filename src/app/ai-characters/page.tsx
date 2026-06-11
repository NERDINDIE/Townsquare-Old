
'use client';

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Bot, PlusCircle } from "@/components/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { characters } from "@/lib/data/ai-character-data";


export default function AiCharactersPage() {
    const router = useRouter();

    return (
        <div className="container mx-auto max-w-4xl px-4 py-8 md:py-12">
            <header className="mb-8">
                <Button onClick={() => router.back()} variant="ghost" className="mb-4 -ml-4">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Settings
                </Button>
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="font-headline text-4xl font-bold">AI Characters</h1>
                        <p className="text-muted-foreground mt-1">
                            Manage your created AI characters or create a new one.
                        </p>
                    </div>
                    <Button asChild>
                        <Link href="/ai-characters/new">
                             <PlusCircle className="mr-2 h-4 w-4" />
                            Create New Character
                        </Link>
                    </Button>
                </div>
            </header>
            
            <div className="space-y-4">
                {characters.map((char, index) => (
                    <Card key={index}>
                        <CardHeader className="flex flex-row items-center gap-4 p-4">
                             <Avatar className="h-16 w-16">
                                <AvatarFallback className="bg-primary text-primary-foreground text-3xl">
                                    <Bot />
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <CardTitle>{char.name}</CardTitle>
                                <CardDescription>{char.description}</CardDescription>
                            </div>
                            <Button variant="outline">Edit</Button>
                        </CardHeader>
                    </Card>
                ))}
            </div>

        </div>
    );
}
