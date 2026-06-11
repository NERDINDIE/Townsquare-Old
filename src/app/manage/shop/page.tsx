
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, PlusCircle, ShoppingCart, BarChart2, Edit } from "lucide-react";
import { useRouter } from "next/navigation";

const sampleProducts = [
    { id: 'prod_1', name: 'Handcrafted Mug', price: '$25.00', inventory: 50 },
    { id: 'prod_2', name: 'Organic Blend Coffee', price: '$18.00', inventory: 120 },
    { id: 'prod_3', name: 'Cozy Throw Blanket', price: '$60.00', inventory: 35 },
];

export default function ShopBuilderPage() {
    const router = useRouter();

    return (
        <div className="container mx-auto max-w-4xl px-4 py-8 md:py-12">
            <header className="mb-8">
                <Button onClick={() => router.back()} variant="ghost" className="mb-4 -ml-4">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Profile
                </Button>
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="font-headline text-4xl font-bold flex items-center gap-3">
                            <ShoppingCart />
                            Shop Builder
                        </h1>
                        <p className="text-muted-foreground mt-1">
                            Manage your products and storefront.
                        </p>
                    </div>
                    <Button>
                        <Edit className="mr-2 h-4 w-4" />
                        Customize Storefront
                    </Button>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg"><BarChart2 />This Month's Sales</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-bold">$4,582.30</p>
                        <p className="text-sm text-green-600">+15.2% from last month</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg"><ShoppingCart />Recent Orders</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-bold">32</p>
                        <p className="text-sm text-muted-foreground">4 orders pending shipment</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Your Products</CardTitle>
                    <Button variant="outline">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Product
                    </Button>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Product Name</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead className="text-right">Inventory</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {sampleProducts.map(product => (
                                <TableRow key={product.id}>
                                    <TableCell className="font-medium">{product.name}</TableCell>
                                    <TableCell>{product.price}</TableCell>
                                    <TableCell className="text-right">{product.inventory}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
