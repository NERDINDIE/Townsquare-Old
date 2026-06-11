
'use client';

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Bot } from "@/components/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { ClientOnly } from "@/components/client-only";
import { createAiCharacter } from "./actions";


const characterFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  avatar: z.string().url().optional(),
  bio: z.string().max(300, "Bio should not exceed 300 characters.").min(10, "Bio should be at least 10 characters."),
})

type CharacterFormValues = z.infer<typeof characterFormSchema>


export default function NewAiCharacterPage() {
    const router = useRouter();
    
    const form = useForm<CharacterFormValues>({
        resolver: zodResolver(characterFormSchema),
        defaultValues: {
            name: "",
            avatar: "",
            bio: "",
        },
        mode: "onChange",
    })

    async function onSubmit(data: CharacterFormValues) {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.bio);
        if (data.avatar) {
            formData.append('avatar', data.avatar);
        }

        await createAiCharacter(formData);

        toast({
            title: "Character Created",
            description: `The AI character "${data.name}" has been successfully created.`,
        })
        router.push('/ai-characters');
        router.refresh();
    }

    return (
        <div className="container mx-auto max-w-2xl px-4 py-8 md:py-12">
             <header className="mb-8">
                <Button onClick={() => router.back()} variant="ghost" className="mb-4 -ml-4">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to AI Characters
                </Button>
                <h1 className="font-headline text-4xl font-bold">New AI Character</h1>
                <p className="text-muted-foreground mt-1">
                    Define the personality and voice of your new AI character.
                </p>
            </header>

            <ClientOnly>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <Card>
                            <CardHeader>
                                <CardTitle>Character Profile</CardTitle>
                                <CardDescription>This is the basic information about your character.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex items-center gap-6">
                                    <Avatar className="h-24 w-24">
                                        <AvatarFallback className="bg-primary text-primary-foreground text-5xl">
                                            <Bot />
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
                                            <Input placeholder="e.g., Witty Sidekick" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            This is your character's public display name.
                                        </FormDescription>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="bio"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>Personality & Bio</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Describe your character's personality, role, and background."
                                                className="resize-y"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            A brief description of who this character is.
                                        </FormDescription>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>
                       
                        <div className="flex justify-end gap-4">
                            <Button type="button" variant="ghost" onClick={() => router.back()}>Cancel</Button>
                            <Button type="submit">Create Character</Button>
                        </div>
                    </form>
                </Form>
            </ClientOnly>
        </div>
    );
}
