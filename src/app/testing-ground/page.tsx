
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Beaker, Newspaper, Smartphone, Upload } from "@/components/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";

const features = [
    {
        name: 'Supermarket Flyer',
        description: 'A scannable weekly supermarket ad.',
        icon: <Newspaper className="h-8 w-8 text-green-500" />,
        href: '/supermarket-flyer',
    },
    {
        name: 'Safe Uploader',
        description: 'A testbed for handling local file uploads.',
        icon: <Upload className="h-8 w-8 text-purple-500" />,
        href: '/testing-ground/safe-uploader',
    }
];


export default function TestingGroundPage() {
    const router = useRouter();
  return (
    <div className="container mx-auto max-w-2xl px-4 py-8 md:py-12">
      <header className="mb-8">
        <Button onClick={() => router.back()} variant="ghost" className="mb-4 -ml-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
        </Button>
        <h1 className="font-headline text-4xl font-bold flex items-center gap-3">
            <Beaker className="h-10 w-10" />
            Testing Ground
        </h1>
        <p className="text-muted-foreground mt-1">
          Explore alpha and beta features before they're released.
        </p>
      </header>

      <div className="space-y-4">
        {features.map((feature) => (
            <Link href={feature.href} key={feature.name}>
                <Card className="hover:bg-muted/50 transition-colors">
                    <CardHeader className="flex flex-row items-center gap-4 p-4">
                    <div className="flex h-12 w-12 items-center justify-center">
                        {feature.icon}
                    </div>
                    <div className="flex-1">
                        <CardTitle className="text-xl">{feature.name}</CardTitle>
                        <CardDescription className="mt-1">{feature.description}</CardDescription>
                    </div>
                    </CardHeader>
                </Card>
            </Link>
        ))}
      </div>
    </div>
  );
}
