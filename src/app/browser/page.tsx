
'use client';

import { useState, useRef, KeyboardEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, ArrowRight, RefreshCw, Lock, Globe, Home } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export default function BrowserPage() {
    const [history, setHistory] = useState<string[]>(['https://www.google.com/webhp?igu=1']);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [displayUrl, setDisplayUrl] = useState(history[0]);
    const iframeRef = useRef<HTMLIFrameElement>(null);

    const currentUrl = history[currentIndex];

    const navigateTo = (url: string) => {
        if (!url) return;
        
        // Simple protocol check
        let finalUrl = url;
        if (!/^https?:\/\//i.test(url)) {
            finalUrl = 'https://' + url;
        }

        const newHistory = history.slice(0, currentIndex + 1);
        newHistory.push(finalUrl);
        setHistory(newHistory);
        setCurrentIndex(newHistory.length - 1);
        setDisplayUrl(finalUrl);
    };

    const handleGo = () => {
        navigateTo(displayUrl);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleGo();
        }
    };
    
    const goBack = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
            setDisplayUrl(history[currentIndex - 1]);
        }
    };

    const goForward = () => {
        if (currentIndex < history.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setDisplayUrl(history[currentIndex + 1]);
        }
    };

    const refresh = () => {
        if (iframeRef.current) {
            iframeRef.current.src = 'about:blank';
            setTimeout(() => {
                if(iframeRef.current) {
                    iframeRef.current.src = currentUrl;
                }
            }, 10);
        }
    };

    return (
        <div className="h-screen bg-muted/20 flex flex-col">
            <header className="bg-background border-b p-2 flex-shrink-0">
                <div className="container mx-auto flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={goBack} disabled={currentIndex === 0}>
                        <ArrowLeft />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={goForward} disabled={currentIndex >= history.length - 1}>
                        <ArrowRight />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={refresh}>
                        <RefreshCw />
                    </Button>
                    <div className="relative flex-1">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            className="w-full bg-muted pl-9"
                            value={displayUrl}
                            onChange={(e) => setDisplayUrl(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="https://example.com"
                        />
                    </div>
                    <Button onClick={handleGo}>Go</Button>
                </div>
            </header>
            <main className="flex-1 p-2 md:p-4">
                <Card className="h-full w-full overflow-hidden">
                    <CardContent className="p-0 h-full">
                        <iframe
                            ref={iframeRef}
                            src={currentUrl}
                            title="Internal Browser"
                            className="w-full h-full border-0"
                            sandbox="allow-forms allow-modals allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-same-origin allow-scripts"
                            onError={() => console.error(`Failed to load ${currentUrl}`)}
                        />
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
