
'use client';

import { useEdition } from '@/context/edition-context';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from './ui/button';
import { Sun, SunMoon, Moon, CloudSun } from 'lucide-react';
import { cn } from '@/lib/utils';

export function EditionSwitcher() {
  const { edition, setEdition } = useEdition();

  const editions = [
    { value: 'morning', label: 'Morning', icon: <Sun className="h-4 w-4" /> },
    { value: 'afternoon', label: 'Afternoon', icon: <CloudSun className="h-4 w-4" /> },
    { value: 'evening', label: 'Evening', icon: <SunMoon className="h-4 w-4" /> },
    { value: 'late-night', label: 'Late Night', icon: <Moon className="h-4 w-4" /> },
  ];

  const currentEdition = editions.find(e => e.value === edition) || editions[1];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="text-sm font-semibold p-0 h-auto text-foreground hover:text-primary transition-colors focus:outline-none">
            {currentEdition.label} Edition
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuRadioGroup value={edition} onValueChange={(value) => setEdition(value as any)}>
          {editions.map((e) => (
            <DropdownMenuRadioItem key={e.value} value={e.value} className="gap-2">
              {e.icon}
              {e.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
