
'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { ArrowLeft, Calculator } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function TippingCalculatorPage() {
    const router = useRouter();
    const [bill, setBill] = useState('');
    const [tipPercentage, setTipPercentage] = useState(15);
    const [people, setPeople] = useState(1);

    const { tipAmount, totalAmount, perPersonAmount } = useMemo(() => {
        const billAmount = parseFloat(bill);
        if (isNaN(billAmount) || billAmount <= 0) {
            return { tipAmount: '0.00', totalAmount: '0.00', perPersonAmount: '0.00' };
        }

        const tip = billAmount * (tipPercentage / 100);
        const total = billAmount + tip;
        const perPerson = total / people;

        return {
            tipAmount: tip.toFixed(2),
            totalAmount: total.toFixed(2),
            perPersonAmount: perPerson.toFixed(2)
        };
    }, [bill, tipPercentage, people]);

    return (
        <div className="container mx-auto max-w-md px-4 py-8 md:py-12">
             <header className="mb-8">
                <Button onClick={() => router.back()} variant="ghost" className="mb-4 -ml-4">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Superapp
                </Button>
                <h1 className="font-headline text-4xl font-bold flex items-center gap-3">
                    <Calculator className="h-10 w-10" />
                    Tipping Calculator
                </h1>
                <p className="text-muted-foreground mt-1">
                    Easily calculate tips and split bills.
                </p>
            </header>
            <Card>
                <CardHeader>
                    <div className="text-center space-y-2 py-4 bg-muted rounded-lg">
                        <p className="text-sm text-muted-foreground">TOTAL PER PERSON</p>
                        <p className="text-5xl font-bold">${perPersonAmount}</p>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="bill">Bill Amount</Label>
                        <Input
                            id="bill"
                            type="number"
                            placeholder="0.00"
                            value={bill}
                            onChange={(e) => setBill(e.target.value)}
                            className="h-12 text-lg"
                        />
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between items-baseline">
                            <Label>Tip Percentage</Label>
                            <span className="font-bold text-lg">{tipPercentage}%</span>
                        </div>
                        <Slider
                            value={[tipPercentage]}
                            onValueChange={(value) => setTipPercentage(value[0])}
                            max={50}
                            step={1}
                        />
                    </div>
                     <div className="space-y-2">
                        <Label>Number of People</Label>
                        <div className="flex items-center gap-4">
                            <Button variant="outline" onClick={() => setPeople(p => Math.max(1, p - 1))}>-</Button>
                            <span className="font-bold text-lg w-12 text-center">{people}</span>
                            <Button variant="outline" onClick={() => setPeople(p => p + 1)}>+</Button>
                        </div>
                    </div>
                    <div className="pt-4 border-t space-y-2">
                         <div className="flex justify-between">
                            <span className="text-muted-foreground">Tip Amount</span>
                            <span>${tipAmount}</span>
                        </div>
                        <div className="flex justify-between font-bold text-lg">
                            <span>Total Amount</span>
                            <span>${totalAmount}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
