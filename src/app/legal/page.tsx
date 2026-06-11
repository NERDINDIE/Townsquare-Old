
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, FileText, Handshake, ScrollText, BrainCircuit } from '@/components/icons';
import Link from 'next/link';

const legalLinks = [
    {
        href: '/legal/copyright',
        title: 'Copyright Policy',
        description: 'Understand our policy on content and fair use.',
        icon: <FileText className="h-8 w-8 text-primary" />,
    },
    {
        href: '/legal/partnership-guidelines',
        title: 'Partnership Guidelines',
        description: 'Our principles and standards for all brand partners.',
        icon: <ScrollText className="h-8 w-8 text-primary" />,
    },
    {
        href: '/legal/partnership-inquiry',
        title: 'Partnership Inquiry',
        description: 'Contact us about becoming a content partner.',
        icon: <Handshake className="h-8 w-8 text-primary" />,
    },
    {
        href: '/legal/ai-policy',
        title: 'AI Usage & Safety Policy',
        description: 'Our commitment to responsible and ethical AI.',
        icon: <BrainCircuit className="h-8 w-8 text-primary" />,
    }
]

export default function LegalPage() {
    return (
        <div className="container mx-auto max-w-2xl px-4 py-8 md:py-12">
            <header className="mb-8">
                <Button asChild variant="ghost" className="mb-4 -ml-4">
                    <Link href="/">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Home
                    </Link>
                </Button>
                <h1 className="font-headline text-4xl font-bold">Legal Information</h1>
                <p className="text-muted-foreground mt-1">
                    Our policies and information about content usage.
                </p>
            </header>

            <div className="space-y-4">
                {legalLinks.map((link) => (
                     <Link href={link.href} key={link.href} className="block hover:bg-muted/50 rounded-lg">
                        <Card>
                            <CardHeader className="flex flex-row items-center gap-4">
                                {link.icon}
                                <div className="flex-1">
                                    <CardTitle>{link.title}</CardTitle>
                                    <CardDescription>{link.description}</CardDescription>
                                </div>
                            </CardHeader>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}
