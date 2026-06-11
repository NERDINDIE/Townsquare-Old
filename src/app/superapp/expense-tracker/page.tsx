
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Activity, PlusCircle, Car, Home, ShoppingBasket, Utensils } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { initialExpenses } from '@/lib/data/expense-data';

const categoryIcons: { [key: string]: React.ReactNode } = {
  'Food': <Utensils className="h-5 w-5 text-orange-500" />,
  'Transport': <Car className="h-5 w-5 text-blue-500" />,
  'Shopping': <ShoppingBasket className="h-5 w-5 text-purple-500" />,
  'Housing': <Home className="h-5 w-5 text-green-500" />,
};

export default function ExpenseTrackerPage() {
    const router = useRouter();
    const [expenses, setExpenses] = useState(initialExpenses);
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('Food');

    const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0);

    const handleAddExpense = (e: React.FormEvent) => {
        e.preventDefault();
        const amountNum = parseFloat(amount);
        if (description && !isNaN(amountNum) && amountNum > 0) {
            const newExpense = {
                id: Date.now(),
                description,
                amount: amountNum,
                category,
                date: new Date().toLocaleDateString('en-CA'),
            };
            setExpenses([newExpense, ...expenses]);
            setDescription('');
            setAmount('');
        }
    };
    
    return (
        <div className="container mx-auto max-w-2xl px-4 py-8 md:py-12">
            <header className="mb-8">
                <Button onClick={() => router.back()} variant="ghost" className="mb-4 -ml-4">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Superapp
                </Button>
                <h1 className="font-headline text-4xl font-bold flex items-center gap-3">
                    <Activity className="h-10 w-10" />
                    Expense Tracker
                </h1>
                <p className="text-muted-foreground mt-1">
                    Keep track of your spending effortlessly.
                </p>
            </header>

            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Monthly Summary</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">Total Expenses This Month</p>
                    <p className="text-4xl font-bold">${totalExpenses.toFixed(2)}</p>
                </CardContent>
            </Card>

            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Add New Expense</CardTitle>
                </CardHeader>
                <form onSubmit={handleAddExpense}>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Input id="description" placeholder="e.g., Coffee with friends" value={description} onChange={e => setDescription(e.target.value)} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="amount">Amount</Label>
                                <Input id="amount" type="number" placeholder="0.00" value={amount} onChange={e => setAmount(e.target.value)} required />
                            </div>
                        </div>
                         <div className="space-y-2">
                            <Label>Category</Label>
                            <Select value={category} onValueChange={setCategory}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Food">Food</SelectItem>
                                    <SelectItem value="Transport">Transport</SelectItem>
                                    <SelectItem value="Shopping">Shopping</SelectItem>
                                    <SelectItem value="Housing">Housing</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Add Expense
                        </Button>
                    </CardFooter>
                </form>
            </Card>
            
            <Card>
                <CardHeader>
                    <CardTitle>Recent Expenses</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {expenses.map(expense => (
                            <div key={expense.id} className="flex items-center gap-4 p-3 rounded-lg border">
                                <div className="p-2 bg-muted rounded-md">
                                    {categoryIcons[expense.category] || <Activity />}
                                </div>
                                <div className="flex-1">
                                    <p className="font-semibold">{expense.description}</p>
                                    <p className="text-sm text-muted-foreground">{expense.date}</p>
                                </div>
                                <p className="font-bold text-lg">${expense.amount.toFixed(2)}</p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
