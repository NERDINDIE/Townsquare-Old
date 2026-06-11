
'use client';

import { useState, useEffect } from 'react';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/Header';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { MiniPlayer } from '@/components/MiniPlayer';
import { PlayerProvider } from '@/hooks/use-player-state.tsx';
import Script from 'next/script';
import { RedirectManager } from '@/components/RedirectManager';
import { ClientOnly } from '@/components/client-only';
import { Footer } from '@/components/Footer';
import { WordmarkProvider } from '@/context/wordmark-context';
import { SidebarProvider } from '@/context/sidebar-context';
import { EditionProvider, useEdition } from '@/context/edition-context';
import { TabProvider, useTabs } from '@/context/tab-context';
import { TabBar } from '@/components/TabBar';
import Image from 'next/image';

function AppBody({ children }: { children: React.ReactNode }) {
  const [font, setFont] = useState('modern');
  const pathname = usePathname();
  const { edition } = useEdition();
  const { activeTab, tabs } = useTabs();

  const isSpecialLayout = pathname.startsWith('/terminal') || pathname.startsWith('/player') || pathname.startsWith('/login') || pathname.startsWith('/home-keitai') || pathname.startsWith('/sym-shell') || pathname.startsWith('/smartwatch');
  const isTeletext = pathname.startsWith('/teletext');
  const isPlayground = pathname.startsWith('/playground');
  const isMessages = pathname.startsWith('/messages');

  const editionBackgrounds = {
    morning: { src: 'https://picsum.photos/seed/1/1920/1080', hint: 'blue sky landscape' },
    afternoon: { src: 'https://picsum.photos/seed/2/1920/1080', hint: 'peaceful landscape' },
    evening: { src: 'https://picsum.photos/seed/3/1920/1080', hint: 'sunset landscape' },
    'late-night': { src: 'https://picsum.photos/seed/4/1920/1080', hint: 'city night' },
  };

  const background = editionBackgrounds[edition];

  useEffect(() => {
    const applyTheme = () => {
      const storedTheme = localStorage.getItem('theme') || 'system';
      const storedFont = localStorage.getItem('font') || 'modern';
      setFont(storedFont);

      document.documentElement.classList.remove('light', 'dark', 'theme-monochrome', 'theme-morning', 'theme-afternoon', 'theme-evening', 'theme-late-night');
      
      if(isTeletext) {
        document.documentElement.classList.add('dark', 'font-teletext');
        return;
      }
      
      if(pathname.startsWith('/home-keitai')) {
          document.documentElement.classList.add('font-keitai');
      }

      if (edition) {
        document.documentElement.classList.add(`theme-${edition}`);
      } else if (storedTheme === 'dark' || (storedTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
      } else if (storedTheme === 'monochrome') {
        document.documentElement.classList.add('theme-monochrome');
      } else {
        document.documentElement.classList.add('light');
      }
      
      document.documentElement.classList.forEach(className => {
        if(className.startsWith('font-')) {
          document.documentElement.classList.remove(className);
        }
      });
      document.documentElement.classList.add(`font-${storedFont}`);
    };

    applyTheme();

    // Request notification permission on load
    if ('Notification' in window && Notification.permission !== 'denied') {
        Notification.requestPermission();
    }
      
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.js').then(registration => {
            console.log('Service Worker registered with scope:', registration.scope);
        }).catch(error => {
            console.log('Service Worker registration failed:', error);
        });
    }

    const handleStorageChange = () => {
      applyTheme();
    };

    window.addEventListener('storage', handleStorageChange);
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', applyTheme);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      mediaQuery.removeEventListener('change', applyTheme);
    };
  }, [isTeletext, pathname, edition]);

  return (
    <body className={cn("font-body antialiased", `font-${font}`)}>
        {background && !isSpecialLayout && (
          <>
            <Image
              src={background.src}
              alt={`${edition} edition background`}
              fill
              className="object-cover -z-10"
              data-ai-hint={background.hint}
              priority
            />
            <div className="fixed inset-0 bg-background/50 -z-10" />
          </>
        )}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=UA-XXXXXX-X" />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'UA-XXXXXX-X');
          `}
        </Script>
        <PlayerProvider>
          <SidebarProvider>
            <WordmarkProvider>
              <RedirectManager>
                {isSpecialLayout || isTeletext ? (
                <div className="relative flex min-h-screen flex-col bg-background">
                    <main className="flex-1">{children}</main>
                    <Toaster />
                </div>
                ) : isPlayground ? (
                <div className="relative flex min-h-screen flex-col bg-background">
                    <main className="flex-1">{children}</main>
                    <Toaster />
                </div>
                ) : (
                <ClientOnly>
                  <div className="relative flex min-h-screen flex-col bg-transparent">
                      <Header />
                      <TabBar />
                      <main className={cn("flex-1", { "pb-32 md:pb-0": !isMessages })}>
                          <div style={{ display: activeTab ? 'none' : 'block' }}>
                            {children}
                          </div>
                          {tabs.map(tab => (
                              <div key={tab.id} style={{ display: tab.id === activeTab?.id ? 'block' : 'none' }} className="h-full">
                                <iframe src={tab.path} className="w-full h-[calc(100vh-8rem)] border-0" />
                              </div>
                          ))}
                      </main>
                      {!isMessages && (
                          <>
                              <Footer />
                              <MiniPlayer />
                          </>
                      )}
                  </div>
                </ClientOnly>
                )}
                {!isSpecialLayout && !isPlayground && !isTeletext && <Toaster />}
              </RedirectManager>
            </WordmarkProvider>
          </SidebarProvider>
        </PlayerProvider>
      </body>
  )
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Roboto:wght@400;500&family=Roboto+Condensed:wght@400;700&family=Inter:wght@400;700&family=Uncial+Antiqua&family=Oswald:wght@400;700&family=VT323&family=DotGothic16&display=swap"
          rel="stylesheet"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
      </head>
      <EditionProvider>
        <TabProvider>
            <AppBody>
            {children}
            </AppBody>
        </TabProvider>
      </EditionProvider>
    </html>
  );
}
