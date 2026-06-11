
'use client';

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ArrowLeft, UserCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { ClientOnly } from "@/components/client-only";
import { addContact } from "./actions";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  phone: z.string().optional(),
  email: z.string().email("Please enter a valid email address.").optional(),
})

type ContactFormValues = z.infer<typeof contactFormSchema>

export default function NewContactPage() {
    const router = useRouter();
    
    const form = useForm<ContactFormValues>({
        resolver: zodResolver(contactFormSchema),
        defaultValues: {
            name: "",
            phone: "",
            email: "",
        },
        mode: "onChange",
    })

    async function onSubmit(data: ContactFormValues) {
        const formData = new FormData();
        formData.append('name', data.name);
        if (data.phone) formData.append('phone', data.phone);
        if (data.email) formData.append('email', data.email);

        await addContact(formData);
        
        toast({
            title: "Contact Created",
            description: `"${data.name}" has been successfully added to your contacts.`,
        });
        
        router.push('/contacts');
    }

    return (
        <div className="container mx-auto max-w-2xl px-4 py-8 md:py-12">
             <header className="mb-8">
                <Button onClick={() => router.back()} variant="ghost" className="mb-4 -ml-4">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Contacts
                </Button>
                <h1 className="font-headline text-4xl font-bold flex items-center gap-3">
                    <UserCircle2 className="h-10 w-10" />
                    New Contact
                </h1>
                <p className="text-muted-foreground mt-1">
                    Add a new contact to your phonebook.
                </p>
            </header>

            <ClientOnly>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <Card>
                            <CardHeader>
                                <CardTitle>Contact Information</CardTitle>
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
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>Phone Number</FormLabel>
                                        <FormControl>
                                            <Input type="tel" placeholder="e.g., (555) 123-4567" {...field} />
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
                                            <Input type="email" placeholder="e.g., your.email@example.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                            <CardFooter>
                                <Button type="submit">Create Contact</Button>
                            </CardFooter>
                        </Card>
                    </form>
                </Form>
            </ClientOnly>
        </div>
    );
}
