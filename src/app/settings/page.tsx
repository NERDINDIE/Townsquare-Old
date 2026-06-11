

'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/hooks/use-toast"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ProfileSwitcher } from "@/components/ProfileSwitcher"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { WearablesManager } from "@/components/WearablesManager"
import { ChevronRight, Wallet, Bot, Shield, KeyRound, ShieldAlert, ShieldCheck, Ban, Trash2, Code, Link, User, Eye, Palette, Bell, BrainCircuit, Hand, Download, FileLock2, FileText, Briefcase, UserCircle2, Smartphone, Watch } from "@/components/icons"
import NextLink from "next/link"
import React, { useEffect, useState } from "react"
import { ThemeCustomizer } from "@/components/ThemeCustomizer"
import { useRouter } from "next/navigation"
import { Separator } from "@/components/ui/separator"
import { ClientOnly } from "@/components/client-only"


const generalSettingsFormSchema = z.object({
    language: z.string().nonempty("Please select a language."),
    region: z.string().nonempty("Please select a region."),
    mapType: z.enum(["street", "satellite", "terrain"]),
    units: z.enum(["metric", "imperial"]),
});

type GeneralSettingsFormValues = z.infer<typeof generalSettingsFormSchema>

function GeneralSettingsForm() {
    const form = useForm<GeneralSettingsFormValues>({
        resolver: zodResolver(generalSettingsFormSchema),
        defaultValues: {
            language: "en-us",
            region: "us",
            mapType: "street",
            units: "imperial",
        },
    });

    function onSubmit(data: GeneralSettingsFormValues) {
        toast({
            title: "General Settings Updated",
            description: "Your general preferences have been successfully saved.",
        });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="language"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Language</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a language" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="en-us">English (United States)</SelectItem>
                                    <SelectItem value="en-gb">English (United Kingdom)</SelectItem>
                                    <SelectItem value="es">Español</SelectItem>
                                    <SelectItem value="fr">Français</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormDescription>
                                The language used throughout the application.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="region"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Region</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a region" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="us">United States</SelectItem>
                                    <SelectItem value="gb">United Kingdom</SelectItem>
                                    <SelectItem value="ca">Canada</SelectItem>
                                    <SelectItem value="au">Australia</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormDescription>
                                This helps us personalize content for your location.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <h3 className="text-lg font-medium">Map Settings</h3>
                 <FormField
                    control={form.control}
                    name="mapType"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Map Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a map type" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="street">Street</SelectItem>
                                    <SelectItem value="satellite">Satellite</SelectItem>
                                    <SelectItem value="terrain">Terrain</SelectItem>
                                </SelectContent>
                            </Select>
                             <FormDescription>
                                The default map style used in the Map Pin feature.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="units"
                    render={({ field }) => (
                        <FormItem className="space-y-3">
                            <FormLabel>Measurement Units</FormLabel>
                            <FormDescription>
                                Choose between miles or kilometers for distance.
                            </FormDescription>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    className="flex items-center space-x-4"
                                >
                                    <FormItem className="flex items-center space-x-2 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="imperial" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            Miles
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-2 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="metric" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            Kilometers
                                        </FormLabel>
                                    </FormItem>
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Update General Settings</Button>
            </form>
        </Form>
    );
}

const profileFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  bio: z.string().max(160).min(4),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

const defaultProfileValues: Partial<ProfileFormValues> = {
  name: "Jane Doe",
  email: "janedoe@example.com",
  bio: "Passionate journalist and community storyteller. I believe in the power of local news to connect us all. When I'm not writing, you can find me exploring the city's parks or trying out a new recipe.",
}

function ProfileForm() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: defaultProfileValues,
    mode: "onChange",
  })

  function onSubmit(data: ProfileFormValues) {
    toast({
      title: "Profile Updated",
      description: "Your profile information has been successfully updated.",
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your Name" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="your.email@example.com" {...field} />
              </FormControl>
              <FormDescription>
                Your email address is not displayed publicly.
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
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                You can <span>@mention</span> other users and organizations.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Update profile</Button>
      </form>
    </Form>
  )
}

const displaySettingsFormSchema = z.object({
    wordmark: z.string().optional(),
    font: z.enum(["modern", "classic", "inter", "monospace", "uncial", "oswald", "tabloid", "broadsheet", "y2k", "pride", "keitai"], {
        required_error: "Please select a font.",
    }),
    theme: z.enum(["light", "dark", "system", "monochrome"], {
      required_error: "Please select a theme.",
    }),
    layout: z.enum(["dashboard", "magazine", "tabloid", "broadsheet", "uncial", "widgets", "y2k", "keitai", "bada-os", "ios7", "symbian", "government-os", "android-one"], {
        required_error: "Please select a layout."
    }),
    showFictional: z.boolean().default(true),
    showHistorical: z.boolean().default(true),
})

type DisplaySettingsFormValues = z.infer<typeof displaySettingsFormSchema>

function DisplaySettings() {
    const router = useRouter();

    const form = useForm<DisplaySettingsFormValues>({
        resolver: zodResolver(displaySettingsFormSchema),
        defaultValues: { 
            wordmark: (typeof window !== 'undefined' ? localStorage.getItem("wordmark") : "") || "",
            font: (typeof window !== 'undefined' ? localStorage.getItem("font") : "modern") as DisplaySettingsFormValues["font"] || "modern",
            theme: (typeof window !== 'undefined' ? localStorage.getItem("theme") : "system") as DisplaySettingsFormValues["theme"] || "system",
            layout: (typeof window !== 'undefined' ? localStorage.getItem("layout") : "dashboard") as DisplaySettingsFormValues["layout"] || "dashboard",
            showFictional: (typeof window !== 'undefined' ? localStorage.getItem("showFictional") : "true") === "true",
            showHistorical: (typeof window !== 'undefined' ? localStorage.getItem("showHistorical") : "true") === "true",
        },
    })

    function onSubmit(data: DisplaySettingsFormValues) {
        if (data.wordmark) {
            localStorage.setItem("wordmark", data.wordmark);
        } else {
            localStorage.removeItem("wordmark");
        }
        localStorage.setItem("font", data.font);
        localStorage.setItem("theme", data.theme);
        localStorage.setItem("layout", data.layout);
        localStorage.setItem("showFictional", String(data.showFictional));
        localStorage.setItem("showHistorical", String(data.showHistorical));

        window.dispatchEvent(new Event('storage'));
        
        toast({
            title: "Display Settings Updated",
            description: (
                 <div className="flex flex-col gap-2">
                    <p>Display settings have been updated.</p>
                </div>
            ),
        });

        const routeMap: { [key: string]: string } = {
            'government-os': '/government-os',
            'bada-os': '/bada-os',
            'ios7': '/phone-screen',
            'symbian': '/symbian-menu',
            'android-one': '/android-one',
        };

        const route = routeMap[data.layout];
        if (route) {
            router.push(route);
        } else {
            router.push('/');
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                 <FormField
                    control={form.control}
                    name="wordmark"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Wordmark</FormLabel>
                        <FormControl>
                            <Input placeholder="Townsquare" {...field} />
                        </FormControl>
                        <FormDescription>
                            Customize the main brand wordmark in the header. Leave blank to reset to default.
                        </FormDescription>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="layout"
                    render={({ field }) => (
                        <FormItem className="space-y-3">
                            <FormLabel>Homepage Layout</FormLabel>
                            <FormDescription>
                                Select the layout for the application's homepage.
                            </FormDescription>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    className="flex flex-col space-y-1"
                                >
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="dashboard" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            Dashboard
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="magazine" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            Magazine
                                        </FormLabel>
                                    </FormItem>
                                     <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="tabloid" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            Tabloid
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="broadsheet" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            Broadsheet
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="widgets" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            Widgets
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="uncial" />
                                        </FormControl>
                                        <FormLabel className="font-normal font-uncial">
                                            Uncial
                                        </FormLabel>
                                    </FormItem>
                                     <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="y2k" />
                                        </FormControl>
                                        <FormLabel className="font-normal font-y2k">
                                            Y2K
                                        </FormLabel>
                                    </FormItem>
                                     <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="keitai" />
                                        </FormControl>
                                        <FormLabel className="font-normal font-keitai">
                                            Keitai
                                        </FormLabel>
                                    </FormItem>
                                     <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="government-os" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            Government OS
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="bada-os" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            Bada OS
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="ios7" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            iOS 7
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="symbian" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            Symbian
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="android-one" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            Android 1.0
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
                    name="theme"
                    render={({ field }) => (
                        <FormItem className="space-y-3">
                            <FormLabel>Theme</FormLabel>
                            <FormDescription>
                                Select the theme for the application.
                            </FormDescription>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    className="flex flex-col space-y-1"
                                >
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="light" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            Light
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="dark" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            Dark
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="system" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            System
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="monochrome" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            Monochrome
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
                    name="font"
                    render={({ field }) => (
                        <FormItem className="space-y-3">
                            <FormLabel>Font</FormLabel>
                            <FormDescription>
                                Select the font you want to use across the app.
                            </FormDescription>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    className="flex flex-col space-y-1"
                                >
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="modern" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            Modern (Playfair Display & Roboto)
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="classic" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            Classic (Sans-Serif)
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="inter" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            Inter
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="monospace" />
                                        </FormControl>
                                        <FormLabel className="font-normal font-mono">
                                            Monospace
                                        </FormLabel>
                                    </FormItem>
                                     <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="teletext" />
                                        </FormControl>
                                        <FormLabel className="font-normal font-teletext">
                                            Teletext
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="uncial" />
                                        </FormControl>
                                        <FormLabel className="font-normal font-uncial">
                                            Uncial
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="oswald" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            Oswald
                                        </FormLabel>
                                    </FormItem>
                                     <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="tabloid" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            Tabloid
                                        </FormLabel>
                                    </FormItem>
                                     <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="broadsheet" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            Broadsheet
                                        </FormLabel>
                                    </FormItem>
                                      <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="y2k" />
                                        </FormControl>
                                        <FormLabel className="font-normal font-y2k">
                                            Y2K
                                        </FormLabel>
                                    </FormItem>
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Separator />
                <h3 className="text-lg font-medium">Content Preferences</h3>

                 <FormField
                    control={form.control}
                    name="showFictional"
                    render={({ field }) => (
                        <FormItem className="flex items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                                <FormLabel className="text-base">Show Fictional Content</FormLabel>
                                <FormDescription>
                                    Enable this to see content from fictional realities and literary worlds.
                                </FormDescription>
                            </div>
                            <FormControl>
                                <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="showHistorical"
                    render={({ field }) => (
                        <FormItem className="flex items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                                <FormLabel className="text-base">Show Historical Characters</FormLabel>
                                <FormDescription>
                                    Enable this to see posts from historical figures in Townsquares.
                                </FormDescription>
                            </div>
                            <FormControl>
                                <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <Separator />
                
                <ThemeCustomizer />

                <Button type="submit">Update Display Settings</Button>
            </form>
        </Form>
    )
}

const notificationsFormSchema = z.object({
    muteAll: z.boolean().default(false).optional(),
    breakingNews: z.boolean().default(false).optional(),
    weeklyDigest: z.boolean().default(true).optional(),
    commentsAndMentions: z.boolean().default(true).optional(),
})
type NotificationsFormValues = z.infer<typeof notificationsFormSchema>

function NotificationsSettings() {
    const form = useForm<NotificationsFormValues>({
        resolver: zodResolver(notificationsFormSchema),
        defaultValues: {
            muteAll: false,
            breakingNews: false,
            weeklyDigest: true,
            commentsAndMentions: true,
        }
    })

    function onSubmit(data: NotificationsFormValues) {
        toast({
        title: "Notification settings updated",
        description: "Your notification preferences have been saved.",
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div>
                    <h3 className="text-lg font-medium">Email Notifications</h3>
                    <div className="text-sm text-muted-foreground">
                        Manage your email notification preferences.
                    </div>
                </div>
                <div className="space-y-4">
                    <FormField
                        control={form.control}
                        name="muteAll"
                        render={({ field }) => (
                            <FormItem className="flex items-center justify-between rounded-lg border bg-muted/30 p-4">
                                <div className="space-y-0.5">
                                    <FormLabel className="text-base">Mute All Notifications</FormLabel>
                                    <FormDescription>
                                        Temporarily pause all notifications.
                                    </FormDescription>
                                </div>
                                <FormControl>
                                    <Switch
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="breakingNews"
                        render={({ field }) => (
                            <FormItem className="flex items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                    <FormLabel className="text-base">Breaking News</FormLabel>
                                    <FormDescription>
                                        Receive emails about major breaking stories.
                                    </FormDescription>
                                </div>
                                <FormControl>
                                    <Switch
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="weeklyDigest"
                        render={({ field }) => (
                             <FormItem className="flex items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                    <FormLabel className="text-base">Weekly Digest</FormLabel>
                                    <FormDescription>
                                        Get a summary of the week's top stories.
                                    </FormDescription>
                                </div>
                                <FormControl>
                                    <Switch
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="commentsAndMentions"
                        render={({ field }) => (
                            <FormItem className="flex items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                    <FormLabel className="text-base">Comments & Mentions</FormLabel>
                                    <FormDescription>
                                    Receive notifications for comments on your articles and mentions.
                                    </FormDescription>
                                </div>
                                <FormControl>
                                    <Switch
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
                 <Button type="submit">Update notifications</Button>
            </form>
        </Form>
    )
}

const aiSettingsFormSchema = z.object({
  chatStyle: z.enum(["professional", "friendly", "witty"], {
    required_error: "Please select a chatting style.",
  }),
  allowTraining: z.boolean().default(false).optional(),
  aiModel: z.string({
    required_error: "Please select an AI model.",
  }),
})

type AiSettingsFormValues = z.infer<typeof aiSettingsFormSchema>

function AiSettingsForm() {
    const form = useForm<AiSettingsFormValues>({
        resolver: zodResolver(aiSettingsFormSchema),
        defaultValues: {
            chatStyle: "friendly",
            allowTraining: true,
            aiModel: "gemini-2.0-flash",
        }
    })

    function onSubmit(data: AiSettingsFormValues) {
        toast({
            title: "AI Settings Updated",
            description: "Your AI preferences have been successfully saved.",
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                 <FormField
                    control={form.control}
                    name="chatStyle"
                    render={({ field }) => (
                        <FormItem className="space-y-3">
                            <FormLabel>Chatting Style</FormLabel>
                            <FormDescription>
                                Select the personality for your AI assistants.
                            </FormDescription>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    className="flex flex-col space-y-1"
                                >
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="professional" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            Professional
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="friendly" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            Friendly
                                        </FormLabel>
                                    </FormItem>
                                     <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="witty" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            Witty
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
                    name="aiModel"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>AI Model</FormLabel>
                        <FormDescription>
                            Choose the underlying model for AI features.
                        </FormDescription>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select an AI model" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="gemini-2.0-flash">Gemini 2.0 Flash</SelectItem>
                                <SelectItem value="gemini-pro">Gemini Pro</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                />

                 <FormField
                    control={form.control}
                    name="allowTraining"
                    render={({ field }) => (
                        <FormItem className="flex items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                                <FormLabel className="text-base">Allow AI Training</FormLabel>
                                <FormDescription>
                                    Allow the AI to learn from your generated content to improve its responses.
                                </FormDescription>
                            </div>
                            <FormControl>
                                <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <Button type="submit">Update AI Settings</Button>
            </form>
        </Form>
    )
}

const banFormSchema = z.object({
    username: z.string().min(2, "Username is required."),
    reason: z.string().optional(),
});
type BanFormValues = z.infer<typeof banFormSchema>;

const initialBannedUsers = [
    { username: 'User123', reason: 'Spamming comments' },
    { username: 'AnotherUser', reason: 'Inappropriate content' }
];

function SecuritySettingsForm() {
    const [is2faEnabled, setIs2faEnabled] = React.useState(true);
    const [bannedUsers, setBannedUsers] = React.useState(initialBannedUsers);

    const banForm = useForm<BanFormValues>({
        resolver: zodResolver(banFormSchema),
        defaultValues: { username: '', reason: '' },
    });

    const handleAddBan = (data: BanFormValues) => {
        setBannedUsers([...bannedUsers, { username: data.username, reason: data.reason || 'No reason provided' }]);
        banForm.reset();
        toast({
            title: "User Banned",
            description: `${data.username} has been added to the ban list.`,
        });
    };

    const handleRemoveBan = (username: string) => {
        setBannedUsers(bannedUsers.filter(user => user.username !== username));
        toast({
            title: "Ban Removed",
            description: `${username} has been removed from the ban list.`,
        });
    };


    return (
        <div className="space-y-6">
             <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                    <FormLabel className="text-base flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-green-500" /> Two-Factor Authentication</FormLabel>
                    <FormDescription>
                        Add an extra layer of security to your account.
                    </FormDescription>
                </div>
                <Switch
                    checked={is2faEnabled}
                    onCheckedChange={setIs2faEnabled}
                />
            </div>

            <Button variant="outline" className="w-full justify-between">
                <div className="flex items-center gap-2">
                    <KeyRound className="h-5 w-5 text-muted-foreground"/>
                    <span>Change Password</span>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </Button>

             <Button variant="outline" className="w-full justify-between">
                <div className="flex items-center gap-2">
                    <ShieldAlert className="h-5 w-5 text-muted-foreground"/>
                    <span>Manage Reported Content</span>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </Button>
            
            <Separator />

            <div>
                <h3 className="text-lg font-medium">Ban Management</h3>
                <p className="text-sm text-muted-foreground">
                    Ban users by their username. This will prevent them from accessing the application.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Banned Users</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {bannedUsers.length > 0 ? (
                        bannedUsers.map((user, index) => (
                            <div key={index} className="flex items-center justify-between rounded-lg border p-3">
                                <div>
                                    <p className="font-semibold">{user.username}</p>
                                    <p className="text-sm text-muted-foreground">{user.reason}</p>
                                </div>
                                <Button variant="ghost" size="icon" onClick={() => handleRemoveBan(user.username)}>
                                    <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                            </div>
                        ))
                    ) : (
                        <p className="text-sm text-muted-foreground">No users are currently banned.</p>
                    )}
                </CardContent>
            </Card>

             <Form {...banForm}>
                <form onSubmit={banForm.handleSubmit(handleAddBan)} className="space-y-4">
                    <FormField
                        control={banForm.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username to Ban</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter username" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={banForm.control}
                        name="reason"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Reason (Optional)</FormLabel>
                                <FormControl>
                                    <Input placeholder="Reason for ban" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <Button type="submit" variant="destructive">
                        <Ban className="mr-2 h-4 w-4" />
                        Ban User
                    </Button>
                </form>
            </Form>

        </div>
    )
}

function DeveloperSettings() {
    const [isBypassEnabled, setIsBypassEnabled] = useState(false);

    useEffect(() => {
        const bypassValue = localStorage.getItem('dev_auth_bypass');
        setIsBypassEnabled(bypassValue === 'true');
    }, []);

    const handleBypassChange = (checked: boolean) => {
        setIsBypassEnabled(checked);
        if (checked) {
            localStorage.setItem('dev_auth_bypass', 'true');
            toast({
                title: "Authentication Bypass Enabled",
                description: "You can now access all pages without logging in. Refresh to see changes.",
            });
        } else {
            localStorage.removeItem('dev_auth_bypass');
             toast({
                title: "Authentication Bypass Disabled",
                description: "Standard login is now required. Refresh to see changes.",
            });
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                    <FormLabel className="text-base">Bypass Authentication Gate</FormLabel>
                    <FormDescription>
                        Enable this to access all pages without needing to log in. For development use only.
                    </FormDescription>
                </div>
                <Switch
                    checked={isBypassEnabled}
                    onCheckedChange={handleBypassChange}
                />
            </div>
        </div>
    );
}

const privacySettingsFormSchema = z.object({
    adPersonalization: z.boolean().default(true),
    dataSharing: z.boolean().default(true),
});
type PrivacySettingsFormValues = z.infer<typeof privacySettingsFormSchema>;


function PrivacySettings() {
    const form = useForm<PrivacySettingsFormValues>({
        resolver: zodResolver(privacySettingsFormSchema),
        defaultValues: {
            adPersonalization: true,
            dataSharing: true,
        },
    });

    function onSubmit(data: PrivacySettingsFormValues) {
        toast({
            title: "Privacy Settings Updated",
            description: "Your privacy preferences have been saved.",
        });
    }

     return (
        <div className="space-y-8">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="adPersonalization"
                        render={({ field }) => (
                            <FormItem className="flex items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                    <FormLabel className="text-base">Ad Personalization</FormLabel>
                                    <FormDescription>
                                        Allow use of your data to personalize ads.
                                    </FormDescription>
                                </div>
                                <FormControl>
                                    <Switch
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name="dataSharing"
                        render={({ field }) => (
                            <FormItem className="flex items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                    <FormLabel className="text-base">Data Sharing with Partners</FormLabel>
                                    <FormDescription>
                                        Allow us to share anonymized data with trusted partners.
                                    </FormDescription>
                                </div>
                                <FormControl>
                                    <Switch
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Update Privacy Settings</Button>
                </form>
            </Form>
            <Separator />
            <div className="space-y-4">
                <Button variant="outline" className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Export My Data
                </Button>
                <Button variant="destructive" className="w-full" disabled>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete My Account
                </Button>
            </div>
        </div>
    )
}

function AccessibilitySettings() {
     const [reducedMotion, setReducedMotion] = useState(false);
     const [highContrast, setHighContrast] = useState(false);
    return (
         <div className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                    <FormLabel className="text-base">Reduce Motion</FormLabel>
                    <FormDescription>
                        Less animations and screen movement.
                    </FormDescription>
                </div>
                <Switch
                    checked={reducedMotion}
                    onCheckedChange={setReducedMotion}
                />
            </div>
            <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                    <FormLabel className="text-base">High Contrast Mode</FormLabel>
                    <FormDescription>
                        Increases color contrast for better readability.
                    </FormDescription>
                </div>
                 <Switch
                    checked={highContrast}
                    onCheckedChange={setHighContrast}
                    disabled
                />
            </div>
         </div>
    );
}

const settingsSections = [
  {
    id: "profile",
    title: "Profile",
    description: "Make changes to your public profile.",
    icon: <User className="h-6 w-6" />,
    component: <ProfileForm />,
  },
  {
    id: "display",
    title: "Display",
    description: "Customize the look and feel of the app.",
    icon: <Palette className="h-6 w-6" />,
    component: <DisplaySettings />,
  },
   {
    id: "notifications",
    title: "Notifications",
    description: "Configure how you receive notifications.",
    icon: <Bell className="h-6 w-6" />,
    component: <NotificationsSettings />,
  },
  {
    id: "security",
    title: "Security",
    description: "Manage your account security settings.",
    icon: <Shield className="h-6 w-6" />,
    component: <SecuritySettingsForm />,
  },
  {
    id: "wearables",
    title: "Wearables",
    description: "Manage connected watches and other wearables.",
    icon: <Watch className="h-6 w-6" />,
    component: <WearablesManager />,
  },
  {
    id: "citizen-id",
    title: "Citizen ID",
    description: "Verify your Citizen ID for access to government services.",
    icon: <UserCircle2 className="h-6 w-6" />,
    component: <Button asChild><NextLink href="/verify-id">Go to Verification</NextLink></Button>,
  },
  {
    id: "ai",
    title: "AI Settings",
    description: "Manage AI characters and other generative features.",
    icon: <BrainCircuit className="h-6 w-6" />,
    component: <AiSettingsForm />,
  },
   {
    id: "privacy",
    title: "Privacy & Data",
    description: "Manage how your data is used and stored.",
    icon: <FileLock2 className="h-6 w-6" />,
    component: <PrivacySettings />,
  },
  {
    id: "accessibility",
    title: "Accessibility",
    description: "Customize features for your needs.",
    icon: <Hand className="h-6 w-6" />,
    component: <AccessibilitySettings />,
  },
   {
    id: "legal",
    title: "Legal",
    description: "View our terms, privacy, and AI policies.",
    icon: <FileText className="h-6 w-6" />,
    component: <Button asChild><NextLink href="/legal">Go to Legal Center</NextLink></Button>,
  },
  {
    id: "developer",
    title: "Developer",
    description: "Debug and developer-facing settings.",
    icon: <Code className="h-6 w-6" />,
    component: <DeveloperSettings />,
  },
]


export default function SettingsPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 md:py-12">
      <header className="mb-8">
        <h1 className="font-headline text-4xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account settings and preferences.</p>
      </header>
      
      <ClientOnly>
        <Accordion type="single" collapsible className="w-full space-y-4" defaultValue="profile">
            {settingsSections.map(section => (
                 <AccordionItem key={section.id} value={section.id}>
                    <Card>
                        <AccordionTrigger className="w-full p-6">
                            <CardHeader className="p-0 text-left flex flex-row items-center gap-4">
                                {section.icon}
                                <div>
                                    <CardTitle className="text-xl">{section.title}</CardTitle>
                                    <CardDescription className="text-sm">{section.description}</CardDescription>
                                </div>
                            </CardHeader>
                        </AccordionTrigger>
                        <AccordionContent>
                            <CardContent className="space-y-4 pt-4">
                                {section.component}
                            </CardContent>
                        </AccordionContent>
                    </Card>
                </AccordionItem>
            ))}
        </Accordion>
      </ClientOnly>
    </div>
  );
}
