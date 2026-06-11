
'use client';

import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

export default function TerminalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [font, setFont] = useState('monospace');

  useEffect(() => {
    document.documentElement.classList.add('dark', 'font-monospace');
    return () => {
      document.documentElement.classList.remove('dark', 'font-monospace');
    }
  }, []);

  return (
    <>
        <head>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link
                href="https://fonts.googleapis.com/css2?family=VT323&display=swap"
                rel="stylesheet"
            />
        </head>
        <body className="font-code antialiased">
            <div className="relative flex min-h-screen flex-col bg-background">
                <main className="flex-1">{children}</main>
            </div>
            <Toaster />
        </body>
    </>
  );
}
