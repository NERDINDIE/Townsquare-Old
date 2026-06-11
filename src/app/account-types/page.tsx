
'use client';

import { ArrowLeft } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { accountTypes } from "@/lib/data/account-types";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function AccountTypesPage() {
    const router = useRouter();

    return (
        <div className="container mx-auto max-w-4xl px-4 py-8 md:py-12">
            <header className="mb-8">
                <Button onClick={() => router.back()} variant="ghost" className="mb-4 -ml-4">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                </Button>
                <h1 className="font-headline text-4xl font-bold">Account Types</h1>
                <p className="text-muted-foreground mt-1">
                    Explore the different roles and permissions available on Townsquare.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {accountTypes.map((type) => (
                    <Card key={type.name} className={cn("flex flex-col text-white overflow-hidden", type.color)}>
                        <CardHeader>
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-black/20 rounded-lg">
                                    {type.icon}
                                </div>
                                <CardTitle className="text-2xl">{type.name}</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <CardDescription className="text-white/90">{type.description}</CardDescription>
                        </CardContent>
                        <CardFooter>
                            <Button variant="ghost" className="bg-black/20 hover:bg-black/40 text-white w-full justify-start">
                                Learn More
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
