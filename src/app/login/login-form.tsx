
'use client';

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ClientOnly } from "@/components/client-only";
import { login } from '@/app/auth/actions';

const loginFormSchema = z.object({
  email: z.string().min(1, {
    message: "Please enter your username or email.",
  }),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
  redirect_uri: z.string().optional(),
})

type LoginFormValues = z.infer<typeof loginFormSchema>

export function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectUri = searchParams.get('redirect_uri');

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: "",
            password: "",
            redirect_uri: redirectUri || '',
        },
    });

    const onSubmit = async (data: LoginFormValues) => {
        const error = await login(data);
        if (error) {
            toast({
                title: "Login Failed",
                description: error,
                variant: "destructive",
            });
        } else {
             toast({
                title: "Login Successful",
                description: "Redirecting...",
            });
             // The server action will handle the redirect, but we can refresh the router state
            router.refresh();
        }
    };
    
    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>
                <CardDescription>
                    Enter your username or email below to login.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ClientOnly>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username or Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="user or m@example.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <input type="hidden" {...form.register("redirect_uri")} />
                            <Button type="submit" className="w-full">
                                Login
                            </Button>
                        </form>
                    </Form>
                </ClientOnly>
            </CardContent>
             <CardFooter className="flex flex-col items-center justify-center gap-4">
                <div className="text-center text-sm">
                    Don't have an account?{" "}
                    <Link href="/auth/register" className="underline">
                        Sign up
                    </Link>
                </div>
            </CardFooter>
        </Card>
    )
}
