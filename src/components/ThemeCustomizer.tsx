
'use client';

import { useEffect, useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { toast } from "@/hooks/use-toast";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { cn } from "@/lib/utils";

function hexToHsl(hex: string): [number, number, number] | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return null;

  let r = parseInt(result[1], 16) / 255;
  let g = parseInt(result[2], 16) / 255;
  let b = parseInt(result[3], 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return [h * 360, s * 100, l * 100];
}

function hslToHex(h: number, s: number, l: number): string {
    s /= 100;
    l /= 100;

    let c = (1 - Math.abs(2 * l - 1)) * s,
        x = c * (1 - Math.abs((h / 60) % 2 - 1)),
        m = l - c/2,
        r = 0,
        g = 0,
        b = 0;

    if (0 <= h && h < 60) {
        r = c; g = x; b = 0;
    } else if (60 <= h && h < 120) {
        r = x; g = c; b = 0;
    } else if (120 <= h && h < 180) {
        r = 0; g = c; b = x;
    } else if (180 <= h && h < 240) {
        r = 0; g = x; b = c;
    } else if (240 <= h && h < 300) {
        r = x; g = 0; b = c;
    } else if (300 <= h && h < 360) {
        r = c; g = 0; b = x;
    }
    
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    const toHex = (c: number) => ('0' + c.toString(16)).slice(-2);

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

const palettes = {
    symbos: {
        background: '30 29% 19%', // #4A3C31, a dark brown
        foreground: '45 35% 82%', // #E0D6C5, a light parchment
        primary: '30 50% 60%', // #D69224, a golden amber
        card: '30 20% 25%', // A slightly lighter brown for cards
        border: '30 15% 35%',
    }
}

export function ThemeCustomizer() {
    const [themeColors, setThemeColors] = useState({
        background: '#ffffff',
        foreground: '#000000',
        primary: '#ff0000'
    });

    useEffect(() => {
        const root = document.documentElement;
        
        const bgHsl = root.style.getPropertyValue('--background').trim();
        const fgHsl = root.style.getPropertyValue('--foreground').trim();
        const prmHsl = root.style.getPropertyValue('--primary').trim();
        
        const parseHsl = (hsl: string) => hsl.split(' ').map(Number);

        if (bgHsl) {
            const [h,s,l] = parseHsl(bgHsl);
            setThemeColors(prev => ({...prev, background: hslToHex(h,s,l)}));
        }
         if (fgHsl) {
            const [h,s,l] = parseHsl(fgHsl);
            setThemeColors(prev => ({...prev, foreground: hslToHex(h,s,l)}));
        }
        if (prmHsl) {
            const [h,s,l] = parseHsl(prmHsl);
            setThemeColors(prev => ({...prev, primary: hslToHex(h,s,l)}));
        }
    }, []);

    const handleColorChange = (name: keyof typeof themeColors, value: string) => {
        setThemeColors(prev => ({ ...prev, [name]: value }));
        
        const hsl = hexToHsl(value);
        if (hsl) {
            document.documentElement.style.setProperty(`--${name}`, `${hsl[0]} ${hsl[1]}% ${hsl[2]}%`);
        }
    };
    
    const applyPalette = (paletteName: keyof typeof palettes) => {
        const palette = palettes[paletteName];
        Object.entries(palette).forEach(([key, value]) => {
            document.documentElement.style.setProperty(`--${key}`, value);
        });

        // Also update the color pickers to reflect the change
        const bgHsl = palette.background.split(' ').map(p => parseFloat(p.replace('%','')));
        const fgHsl = palette.foreground.split(' ').map(p => parseFloat(p.replace('%','')));
        const prmHsl = palette.primary.split(' ').map(p => parseFloat(p.replace('%','')));
        
        setThemeColors({
            background: hslToHex(bgHsl[0], bgHsl[1], bgHsl[2]),
            foreground: hslToHex(fgHsl[0], fgHsl[1], fgHsl[2]),
            primary: hslToHex(prmHsl[0], prmHsl[1], prmHsl[2]),
        });
    }

    const handleSave = () => {
        const theme = {
            background: document.documentElement.style.getPropertyValue('--background'),
            foreground: document.documentElement.style.getPropertyValue('--foreground'),
            primary: document.documentElement.style.getPropertyValue('--primary'),
            card: document.documentElement.style.getPropertyValue('--card'),
            border: document.documentElement.style.getPropertyValue('--border'),
        };
        localStorage.setItem('custom-theme', JSON.stringify(theme));
        toast({
            title: "Theme Saved!",
            description: "Your custom colors have been saved.",
        })
    }

    return (
        <div className="space-y-6">
            <h3 className="text-lg font-medium">Preset Palettes</h3>
            <div className="flex gap-2">
                <Button variant="outline" onClick={() => applyPalette('symbos')} className="flex items-center gap-2">
                     <div className="h-4 w-4 rounded-full" style={{ background: 'linear-gradient(45deg, hsl(30 29% 19%), hsl(30 50% 60%))' }} />
                    SymbOS
                </Button>
            </div>
            
            <Separator />

            <h3 className="text-lg font-medium">Customize Colors</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>Background</Label>
                    <Input
                        type="color"
                        value={themeColors.background}
                        onChange={e => handleColorChange('background', e.target.value)}
                        className="p-1 h-10"
                    />
                </div>
                <div className="space-y-2">
                    <Label>Foreground (Text)</Label>
                    <Input
                        type="color"
                        value={themeColors.foreground}
                        onChange={e => handleColorChange('foreground', e.target.value)}
                        className="p-1 h-10"
                    />
                </div>
                <div className="space-y-2">
                    <Label>Primary / Accent</Label>
                    <Input
                        type="color"
                        value={themeColors.primary}
                        onChange={e => handleColorChange('primary', e.target.value)}
                        className="p-1 h-10"
                    />
                </div>
            </div>
             <Button onClick={handleSave} variant="outline">Save Custom Colors</Button>
        </div>
    )
}
