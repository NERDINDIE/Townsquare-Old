
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Briefcase, CheckCircle, DollarSign, ShoppingCart, Users, Settings, Bell, HelpCircle } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { salesData } from '@/lib/data/erp-data';
import { useRouter } from 'next/navigation';

const kpiData = [
  { title: 'Total Revenue', value: '$1,250,000', change: '+12.5%', icon: <DollarSign className="h-6 w-6 text-green-500" /> },
  { title: 'New Customers', value: '1,230', change: '+8.2%', icon: <Users className="h-6 w-6 text-blue-500" /> },
  { title: 'Sales Volume', value: '45,670', change: '-2.1%', icon: <ShoppingCart className="h-6 w-6 text-orange-500" /> },
  { title: 'Projects Completed', value: '245', change: '+5.0%', icon: <Briefcase className="h-6 w-6 text-purple-500" /> },
];

const taskData = [
    { id: 1, name: 'Finalize Q4 budget', status: 'In Progress' },
    { id: 2, name: 'Onboard new marketing team', status: 'Completed' },
    { id: 3, name: 'Develop new feature X', status: 'Pending' },
];

export default function ErpDashboardPage() {
    const router = useRouter();

    return (
        <div className="bg-muted/30 min-h-screen">
            <header className="bg-background border-b sticky top-0 z-10">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
                    <div className="flex items-center gap-4">
                         <Button onClick={() => router.back()} variant="ghost" size="icon">
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                        <h1 className="text-xl font-bold flex items-center gap-2">
                            <Briefcase className="h-6 w-6" />
                            <span>ERP Dashboard</span>
                        </h1>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon"><Bell /></Button>
                        <Button variant="ghost" size="icon"><Settings /></Button>
                        <Button variant="ghost" size="icon"><HelpCircle /></Button>
                    </div>
                </div>
            </header>

            <main className="container mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
                {/* KPIs */}
                <section>
                    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                        {kpiData.map(kpi => (
                            <Card key={kpi.title}>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                                    {kpi.icon}
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{kpi.value}</div>
                                    <p className={`text-xs ${kpi.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>{kpi.change} from last month</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>
                
                <div className="grid gap-8 grid-cols-1 lg:grid-cols-3">
                    {/* Sales Chart */}
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle>Sales Overview</CardTitle>
                            <CardDescription>Monthly revenue for the last 6 months</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={salesData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis tickFormatter={(value) => `$${value / 1000}k`} />
                                    <Tooltip formatter={(value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)} />
                                    <Legend />
                                    <Bar dataKey="revenue" fill="#8884d8" name="Revenue" />
                                    <Bar dataKey="profit" fill="#82ca9d" name="Profit" />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    {/* Task List */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Upcoming Tasks</CardTitle>
                            <CardDescription>Your team's immediate priorities.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {taskData.map(task => (
                                <div key={task.id} className="flex items-center">
                                    <CheckCircle className={`mr-4 h-5 w-5 ${task.status === 'Completed' ? 'text-green-500' : 'text-muted-foreground'}`} />
                                    <div className="flex-1">
                                        <p className="font-medium">{task.name}</p>
                                        <p className="text-xs text-muted-foreground">{task.status}</p>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}
