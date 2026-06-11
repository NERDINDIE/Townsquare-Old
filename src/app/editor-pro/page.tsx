
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Bold, Italic, Underline, List, ListOrdered, LinkIcon, ImageIcon, Code } from '@/components/icons';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Separator } from '@/components/ui/separator';

export default function EditorProPage() {
    const [text, setText] = useState('This is some **bold** and _italic_ text.');

    return (
        <div className="container mx-auto max-w-4xl px-4 py-8 md:py-12">
            <header className="mb-8">
                <h1 className="font-headline text-4xl font-bold">Editor Pro</h1>
                <p className="text-muted-foreground mt-1">
                    An enhanced writing experience with advanced formatting tools.
                </p>
            </header>

            <div className="border rounded-lg">
                <div className="p-2 border-b">
                    <ToggleGroup type="multiple" aria-label="Text formatting">
                        <ToggleGroupItem value="bold" aria-label="Toggle bold"><Bold className="h-4 w-4" /></ToggleGroupItem>
                        <ToggleGroupItem value="italic" aria-label="Toggle italic"><Italic className="h-4 w-4" /></ToggleGroupItem>
                        <ToggleGroupItem value="underline" aria-label="Toggle underline"><Underline className="h-4 w-4" /></ToggleGroupItem>
                         <Separator orientation="vertical" className="h-6 mx-2" />
                        <ToggleGroupItem value="bullet-list" aria-label="Bullet list"><List className="h-4 w-4" /></ToggleGroupItem>
                        <ToggleGroupItem value="ordered-list" aria-label="Ordered list"><ListOrdered className="h-4 w-4" /></ToggleGroupItem>
                         <Separator orientation="vertical" className="h-6 mx-2" />
                         <ToggleGroupItem value="link" aria-label="Add link"><LinkIcon className="h-4 w-4" /></ToggleGroupItem>
                         <ToggleGroupItem value="image" aria-label="Add image"><ImageIcon className="h-4 w-4" /></ToggleGroupItem>
                         <ToggleGroupItem value="code" aria-label="Code block"><Code className="h-4 w-4" /></ToggleGroupItem>
                    </ToggleGroup>
                </div>
                 <Textarea 
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full h-96 p-4 border-0 rounded-none focus-visible:ring-0 text-base"
                    placeholder="Start writing your masterpiece..."
                 />
                 <div className="p-2 border-t flex justify-end">
                    <Button>Publish</Button>
                 </div>
            </div>
        </div>
    );
}
