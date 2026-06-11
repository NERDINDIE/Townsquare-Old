
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Flag, Newspaper, Shield, Users, BookCheck, Link as LinkIcon, Settings, MessageSquare, Briefcase, UserCircle, Landmark, BarChart3 } from "@/components/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { citizenData } from "@/lib/data/profile-data";

const features = [
    { 
        name: 'Fact Checker', 
        description: 'Analyze text for factual accuracy and bias.', 
        icon: <BookCheck className="h-8 w-8 text-blue-500" />,
        href: '/fact-checker',
    },
    { 
        name: 'Propaganda Defector', 
        description: 'Identify and understand manipulation techniques.', 
        icon: <Flag className="h-8 w-8 text-red-500" />,
        href: '/propaganda-defector',
    },
     { 
        name: 'Guideline Checker', 
        description: 'Check content against partnership guidelines.', 
        icon: <Shield className="h-8 w-8 text-green-500" />,
        href: '/legal/partnership-inquiry',
    },
     { 
        name: 'Content Manager', 
        description: 'Publish and manage official articles and posts.', 
        icon: <Newspaper className="h-8 w-8 text-gray-700" />,
        href: '/manage/content',
    },
     {
        name: 'Account Types', 
        description: 'Review different user roles and permissions.', 
        icon: <Users className="h-8 w-8 text-purple-500" />,
        href: '/account-types',
    },
    { 
        name: 'Security Settings', 
        description: 'Manage account security, bans, and 2FA.', 
        icon: <Settings className="h-8 w-8 text-gray-500" />,
        href: '/settings',
    },
    {
        name: 'Tax Manager',
        description: 'Oversee tax collection and fiscal policies.',
        icon: <Landmark className="h-8 w-8 text-indigo-500" />,
        href: '/tax-manager',
    },
    {
        name: 'Election Center',
        description: 'Monitor live election results and voter data.',
        icon: <BarChart3 className="h-8 w-8 text-teal-500" />,
        href: '/election-center',
    }
];

export default function GovernmentOSPage() {
    const router = useRouter();

    return (
        <div className="container mx-auto max-w-4xl px-4 py-8 md:py-12">
            <header className="mb-8">
                <Button onClick={() => router.back()} variant="ghost" className="mb-4 -ml-4">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                </Button>
                <h1 className="font-headline text-4xl font-bold flex items-center gap-3">
                    <Briefcase className="h-10 w-10" />
                    Government OS
                </h1>
                <p className="text-muted-foreground mt-1">
                    A secure dashboard for managing content and community standards.
                </p>
            </header>

            <Card className="mb-8">
                 <CardContent className="p-6 flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                        <AvatarImage src={citizenData.avatar} alt={citizenData.name} />
                        <AvatarFallback>{citizenData.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                        <h2 className="text-xl font-bold">{citizenData.name}</h2>
                        <p className="text-sm text-muted-foreground">
                            <span className="font-semibold">Citizen ID:</span> {citizenData.citizenId}
                        </p>
                        <p className="text-sm text-muted-foreground">
                            <span className="font-semibold">Location:</span> {citizenData.location}
                        </p>
                    </div>
                 </CardContent>
            </Card>


             <Card>
                <CardHeader>
                    <CardTitle>Management Tools</CardTitle>
                    <CardDescription>Access key features for moderation, security, and content publishing.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature) => (
                        <Link href={feature.href} key={feature.name} className="block">
                             <Card className="h-full hover:bg-muted/50 hover:shadow-lg transition-all flex flex-col">
                                <CardHeader className="flex-grow">
                                    <div className="flex justify-center mb-4">
                                        {feature.icon}
                                    </div>
                                    <CardTitle className="text-center">{feature.name}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-center">{feature.description}</CardDescription>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </CardContent>
            </Card>

        </div>
    );
}
