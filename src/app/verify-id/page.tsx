
'use client';

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ArrowLeft, UserCircle2 } from "@/components/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { ClientOnly } from "@/components/client-only";
import { citizenData } from "@/lib/data/profile-data";


const verificationFormSchema = z.object({
  fullName: z.string().min(2, "Please enter your full name."),
  citizenId: z.string().regex(/^[A-Z0-9-]{8,}$/, "Please enter a valid Citizen ID format."),
})

type VerificationFormValues = z.infer<typeof verificationFormSchema>

export default function VerifyIdPage() {
    const router = useRouter();
    
    const form = useForm<VerificationFormValues>({
        resolver: zodResolver(verificationFormSchema),
        defaultValues: {
            fullName: "",
            citizenId: "",
        },
        mode: "onChange",
    })

    async function onSubmit(data: VerificationFormValues) {
        // In a real app, this would call a backend service to verify the ID.
        // For this prototype, we'll just show a success message.
        toast({
            title: "Verification Successful!",
            description: "Your Citizen ID has been verified and linked to your account.",
        })
        router.push('/government-os');
    }

    return (
        <div className="container mx-auto max-w-2xl px-4 py-8 md:py-12">
             <header className="mb-8">
                <Button onClick={() => router.back()} variant="ghost" className="mb-4 -ml-4">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Settings
                </Button>
                <h1 className="font-headline text-4xl font-bold flex items-center gap-3">
                    <UserCircle2 className="h-10 w-10" />
                    Citizen ID Verification
                </h1>
                <p className="text-muted-foreground mt-1">
                    Verify your identity to access government-related features.
                </p>
            </header>

            <ClientOnly>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <Card>
                            <CardHeader>
                                <CardTitle>Identity Verification</CardTitle>
                                <CardDescription>
                                    Please enter your full legal name and your government-issued Citizen ID number exactly as they appear on your documents.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="fullName"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>Full Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g., Jane Margaret Doe" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="citizenId"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>Citizen ID Number</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g., TSQ-1234-5678" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                             <CardFooter>
                                <Button type="submit">Verify Identity</Button>
                            </CardFooter>
                        </Card>
                    </form>
                </Form>
            </ClientOnly>
        </div>
    );
}
