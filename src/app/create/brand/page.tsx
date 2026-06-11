
'use client';

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Bot, Shield } from "@/components/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { ClientOnly } from "@/components/client-only";
import { createBrand } from "./actions";


const brandFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  description: z.string().max(300, "Description should not exceed 300 characters.").min(10, "Description should be at least 10 characters."),
})

type BrandFormValues = z.infer<typeof brandFormSchema>


export default function NewBrandPage() {
    const router = useRouter();
    
    const form = useForm<BrandFormValues>({
        resolver: zodResolver(brandFormSchema),
        defaultValues: {
            name: "",
            description: "",
        },
        mode: "onChange",
    })

    async function onSubmit(data: BrandFormValues) {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);

        await createBrand(formData);
        
        toast({
            title: "Brand Created",
            description: `The brand "${data.name}" has been successfully created.`,
        })
        router.push('/');
        router.refresh();
    }

    return (
        <div className="container mx-auto max-w-2xl px-4 py-8 md:py-12">
             <header className="mb-8">
                <Button onClick={() => router.back()} variant="ghost" className="mb-4 -ml-4">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                </Button>
                <h1 className="font-headline text-4xl font-bold">New Brand</h1>
                <p className="text-muted-foreground mt-1">
                    Create a new brand to host your content.
                </p>
            </header>

            <ClientOnly>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <Card>
                            <CardHeader>
                                <CardTitle>Brand Profile</CardTitle>
                                <CardDescription>This is the public information about your brand.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex items-center gap-6">
                                    <Avatar className="h-24 w-24">
                                        <AvatarFallback className="bg-primary text-primary-foreground text-5xl">
                                            <Shield />
                                        </AvatarFallback>
                                    </Avatar>
                                    <Button type="button" variant="outline">Upload Avatar</Button>
                                </div>
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g., My Awesome Channel" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            This is your brand's public display name.
                                        </FormDescription>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Describe what your brand is all about."
                                                className="resize-y"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            A brief description of your brand.
                                        </FormDescription>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>

                        <div className="flex justify-end gap-4">
                            <Button type="button" variant="ghost" onClick={() => router.back()}>Cancel</Button>
                            <Button type="submit">Create Brand</Button>
                        </div>
                    </form>
                </Form>
            </ClientOnly>
        </div>
    );
}
