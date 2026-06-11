
'use client';

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ArrowLeft, Loader2, ShieldAlert, ShieldCheck } from "@/components/icons";
import Link from "next/link";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { ClientOnly } from "@/components/client-only";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { checkContentAgainstGuidelines, GuidelineCheckOutput } from "@/ai/flows/guideline-checker-flow";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";


const inquiryFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  company: z.string().optional(),
  email: z.string().email("Please enter a valid email address."),
  inquiryType: z.enum(["sell-goods", "host-content", "other"], {
    required_error: "You need to select an inquiry type.",
  }),
  message: z.string().optional(),
})

type InquiryFormValues = z.infer<typeof inquiryFormSchema>


function GuidelineChecker() {
    const [content, setContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<GuidelineCheckOutput | null>(null);

    const handleCheck = async () => {
        if (!content.trim()) {
            toast({ variant: 'destructive', title: 'Please provide content to check.' });
            return;
        }
        setIsLoading(true);
        setResult(null);
        try {
            const res = await checkContentAgainstGuidelines({ content });
            setResult(res);
        } catch (e) {
            toast({ variant: 'destructive', title: 'Error checking content.' });
        } finally {
            setIsLoading(false);
        }
    }

    return (
         <Card className="mt-8">
            <CardHeader>
                <CardTitle>AI Partnership Guideline Check</CardTitle>
                <CardDescription>Test your content against our AI moderator before submitting your inquiry.</CardDescription>
            </CardHeader>
            <CardContent>
                <Textarea
                    placeholder="Paste your sample content here..."
                    className="resize-y min-h-40"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    disabled={isLoading}
                />
            </CardContent>
            <CardFooter>
                 <Button onClick={handleCheck} disabled={isLoading}>
                    {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin"/> Checking...</> : 'Check Content'}
                </Button>
            </CardFooter>
            {result && (
                <CardContent className="space-y-4">
                    <Separator />
                     <h3 className="font-semibold text-lg">Analysis Result</h3>
                     <div className="flex items-center gap-2">
                         {result.adheresToGuidelines ? (
                            <Badge variant="secondary" className="gap-1.5 bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 hover:bg-green-100/80"><ShieldCheck className="h-4 w-4"/> Guidelines Met</Badge>
                         ) : (
                            <Badge variant="destructive" className="gap-1.5"><ShieldAlert className="h-4 w-4"/> Violations Found</Badge>
                         )}
                    </div>
                    <p className="text-muted-foreground italic">"{result.summary}"</p>
                    {!result.adheresToGuidelines && result.violations.length > 0 && (
                        <div className="space-y-3">
                            {result.violations.map((violation, index) => (
                                <div key={index} className="p-3 border rounded-lg">
                                    <p className="font-semibold text-destructive">{violation.guideline}</p>
                                    <p className="text-sm mt-1">{violation.details}</p>
                                    <p className="text-xs text-muted-foreground mt-2">Confidence: {(violation.confidenceScore * 100).toFixed(0)}%</p>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            )}
        </Card>
    )
}

export default function PartnershipInquiryPage() {
    const router = useRouter();
    
    const form = useForm<InquiryFormValues>({
        resolver: zodResolver(inquiryFormSchema),
        defaultValues: {
            name: "",
            company: "",
            email: "",
            message: "",
        },
        mode: "onChange",
    })

    function onSubmit(data: InquiryFormValues) {
        toast({
            title: "Inquiry Submitted",
            description: "Thank you for your interest. We will get back to you shortly.",
        })
        form.reset();
    }

    return (
        <div className="container mx-auto max-w-2xl px-4 py-8 md:py-12">
             <header className="mb-8">
                <Button onClick={() => router.back()} variant="ghost" className="mb-4 -ml-4">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Legal
                </Button>
                <h1 className="font-headline text-4xl font-bold">Partnership Inquiry</h1>
                <p className="text-muted-foreground mt-1">
                    Interested in partnering with Townsquare? Please fill out the form below after reviewing our guidelines.
                </p>
                 <Button asChild variant="link" className="p-0 mt-1">
                    <Link href="/legal/partnership-guidelines">Read Partnership Guidelines</Link>
                 </Button>
            </header>

            <ClientOnly>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <Card>
                            <CardHeader>
                                <CardTitle>Your Inquiry</CardTitle>
                                <CardDescription>Tell us about yourself and how you'd like to partner.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>Full Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g., Jane Doe" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="company"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>Company / Brand (Optional)</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g., Acme Corporation" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>Email Address</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g., your.email@example.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                 <FormField
                                    control={form.control}
                                    name="inquiryType"
                                    render={({ field }) => (
                                        <FormItem className="space-y-3">
                                        <FormLabel>I'd like to...</FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="flex flex-col space-y-1"
                                            >
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                <RadioGroupItem value="sell-goods" />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                Sell my goods on the Marketplace
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                <RadioGroupItem value="host-content" />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                Host my content (articles, videos, etc.)
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                <RadioGroupItem value="other" />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    Other
                                                </FormLabel>
                                            </FormItem>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                    />
                                <FormField
                                    control={form.control}
                                    name="message"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>Additional Details (Optional)</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Provide any additional details about your partnership proposal..."
                                                className="resize-y"
                                                rows={4}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>

                        <div className="flex justify-end gap-4">
                            <Button type="submit">Submit Inquiry</Button>
                        </div>
                    </form>
                </Form>

                <GuidelineChecker />
            </ClientOnly>
        </div>
    );
}
