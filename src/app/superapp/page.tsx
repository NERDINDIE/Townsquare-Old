
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Calculator, Activity, LayoutDashboard } from "lucide-react";
import Link from "next/link";

const features = [
    {
        name: 'Tipping Calculator',
        description: 'Quickly calculate tips and split bills.',
        href: '/superapp/tipping-calculator',
        icon: <Calculator className="h-8 w-8 text-blue-500" />
    },
    {
        name: 'Expense Tracker',
        description: 'Log and categorize your daily expenses.',
        href: '/superapp/expense-tracker',
        icon: <Activity className="h-8 w-8 text-green-500" />
    },
    {
        name: 'ERP Dashboard',
        description: 'Monitor key business metrics and performance.',
        href: '/superapp/erp-dashboard',
        icon: <LayoutDashboard className="h-8 w-8 text-purple-500" />
    }
];

export default function SuperAppLandingPage() {
    return (
        <div className="container mx-auto max-w-4xl px-4 py-8 md:py-12">
            <header className="text-center mb-12">
                <h1 className="font-headline text-5xl font-bold">Superapp</h1>
                <p className="mt-2 text-lg text-muted-foreground">
                    An integrated suite of tools for your daily life and business needs.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {features.map((feature) => (
                    <Link href={feature.href} key={feature.name} className="block group">
                        <Card className="h-full flex flex-col hover:border-primary transition-colors">
                            <CardHeader>
                                <div className="flex justify-center mb-4">
                                    {feature.icon}
                                </div>
                                <CardTitle className="text-center">{feature.name}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <CardDescription className="text-center">{feature.description}</CardDescription>
                            </CardContent>
                            <CardContent className="flex justify-center">
                                <Button variant="ghost" className="text-primary group-hover:underline">
                                    Launch Tool <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}
