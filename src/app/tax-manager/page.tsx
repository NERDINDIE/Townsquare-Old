
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, Landmark, TrendingUp, TrendingDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { taxRevenueData } from '@/lib/data/gov-data';

export default function TaxManagerPage() {
    const router = useRouter();
    const totalRevenue = taxRevenueData.reduce((acc, item) => acc + item.revenue, 0);

    return (
        <div className="container mx-auto max-w-4xl px-4 py-8 md:py-12">
            <header className="mb-8">
                <Button onClick={() => router.back()} variant="ghost" className="mb-4 -ml-4">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Government OS
                </Button>
                <h1 className="font-headline text-4xl font-bold flex items-center gap-3">
                    <Landmark className="h-10 w-10" />
                    Tax Manager
                </h1>
                <p className="text-muted-foreground mt-1">
                    Oversee tax revenue and fiscal policies.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Total Revenue (YTD)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">${totalRevenue.toLocaleString()}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>YoY Growth</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold text-green-600 flex items-center gap-2">
                            <TrendingUp />
                            +5.2%
                        </p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Compliance Rate</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">98.7%</p>
                    </CardContent>
                </Card>
            </div>

             <Card>
                <CardHeader>
                    <CardTitle>Revenue by Source</CardTitle>
                    <CardDescription>Breakdown of tax revenue year-to-date.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Source</TableHead>
                                <TableHead>YoY Change</TableHead>
                                <TableHead className="text-right">Revenue</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {taxRevenueData.map((item) => (
                                <TableRow key={item.source}>
                                    <TableCell className="font-medium">{item.source}</TableCell>
                                    <TableCell className={item.change > 0 ? 'text-green-600' : 'text-red-600'}>
                                        {item.change > 0 ? '+' : ''}{item.change.toFixed(1)}%
                                    </TableCell>
                                    <TableCell className="text-right">${item.revenue.toLocaleString()}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
