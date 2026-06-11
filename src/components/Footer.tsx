
'use client';

import { cn } from '@/lib/utils';
import { Home, Compass, PlusCircle, Search, UserCircle } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', icon: <Home />, label: 'Home' },
  { href: '/discover', icon: <Compass />, label: 'Discover' },
  { href: '/discover', icon: <PlusCircle />, label: 'Create' },
  { href: '/search', icon: <Search />, label: 'Search' },
  { href: '/profile', icon: <UserCircle />, label: 'Profile' },
];

export function Footer() {
    const pathname = usePathname();

    return (
        <footer className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-background border-t z-50">
            <nav className="flex h-full items-center justify-around">
                {navItems.map((item, index) => (
                    <Link
                        key={item.label}
                        href={item.href}
                        className={cn(
                            "flex h-full w-full flex-col items-center justify-center gap-1 text-muted-foreground transition-colors hover:text-primary",
                            pathname === item.href && "text-primary"
                        )}
                    >
                        <div className="h-6 w-6">{item.icon}</div>
                        <span className="text-xs">{item.label}</span>
                    </Link>
                ))}
            </nav>
        </footer>
    );
}
