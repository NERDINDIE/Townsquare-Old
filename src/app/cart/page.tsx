
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Trash2 } from "@/components/icons";
import Image from "next/image";
import Link from "next/link";
import { cartItems } from "@/lib/data/marketplace-data";

export default function CartPage() {
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const tax = subtotal * 0.08;
    const total = subtotal + tax;

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 md:py-12">
        <header className="mb-8">
            <Button asChild variant="ghost" className="mb-4 -ml-4">
                <Link href="/marketplace">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Marketplace
                </Link>
            </Button>
            <h1 className="font-headline text-4xl font-bold">Your Shopping Cart</h1>
            <p className="text-muted-foreground mt-1">
                You have {cartItems.length} item(s) in your cart.
            </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            <div className="md:col-span-2">
                 <Card>
                    <CardContent className="p-0">
                        <div className="divide-y divide-border">
                            {cartItems.map(item => (
                                <div key={item.id} className="flex items-center gap-4 p-4">
                                    <div className="relative h-20 w-20 rounded-md overflow-hidden">
                                        <Image src={item.image} alt={item.name} fill className="object-cover" data-ai-hint={item.dataAiHint} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold">{item.name}</p>
                                        <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 mt-1 text-muted-foreground hover:text-destructive">
                                            <Trash2 className="h-4 w-4" />
                                            <span className="sr-only">Remove item</span>
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="md:col-span-1">
                <Card>
                    <CardHeader>
                        <CardTitle>Order Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex justify-between">
                            <p className="text-muted-foreground">Subtotal</p>
                            <p>${subtotal.toFixed(2)}</p>
                        </div>
                         <div className="flex justify-between">
                            <p className="text-muted-foreground">Shipping</p>
                            <p>Free</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-muted-foreground">Tax</p>
                            <p>${tax.toFixed(2)}</p>
                        </div>
                        <Separator />
                        <div className="flex justify-between font-bold text-lg">
                            <p>Total</p>
                            <p>${total.toFixed(2)}</p>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" size="lg">Proceed to Checkout</Button>
                    </CardFooter>
                </Card>
            </div>

        </div>
    </div>
  );
}
