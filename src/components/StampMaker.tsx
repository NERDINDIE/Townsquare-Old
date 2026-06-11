
'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Shapes, Star, Heart, Palmtree, Sun, Pen } from './icons';
import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

type StampShape = 'square' | 'circle' | 'diamond';
type StampIcon = 'Star' | 'Heart' | 'Palmtree' | 'Sun' | 'Pen' | 'None';

export interface Stamp {
    shape: StampShape;
    icon: StampIcon;
    color: string;
}

interface StampMakerProps {
    stamp: Stamp;
    onStampChange: (newStamp: Stamp) => void;
}

const stampIcons: { name: StampIcon, component: React.ReactNode }[] = [
    { name: 'Star', component: <Star className="h-5 w-5" /> },
    { name: 'Heart', component: <Heart className="h-5 w-5" /> },
    { name: 'Palmtree', component: <Palmtree className="h-5 w-5" /> },
    { name: 'Sun', component: <Sun className="h-5 w-5" /> },
    { name: 'Pen', component: <Pen className="h-5 w-5" /> },
];

const stampShapes: { name: StampShape, component: React.ReactNode }[] = [
    { name: 'square', component: <div className="w-6 h-6 border-2 border-current" /> },
    { name: 'circle', component: <div className="w-6 h-6 border-2 border-current rounded-full" /> },
    { name: 'diamond', component: <div className="w-5 h-5 border-2 border-current rotate-45" /> },
];

const stampColors = ['#4B5563', '#DC2626', '#16A34A', '#2563EB', '#7C3AED'];

function StampPreview({ stamp }: { stamp: Stamp }) {
    const IconComponent = stampIcons.find(i => i.name === stamp.icon)?.component;

    return (
        <div 
            className={cn("h-16 w-16 flex items-center justify-center border-4 border-dashed border-current/30", {
                'rounded-lg': stamp.shape === 'square',
                'rounded-full': stamp.shape === 'circle',
            })}
        >
            <div 
                className={cn("h-12 w-12 flex items-center justify-center text-white", {
                    'rounded-md': stamp.shape === 'square',
                    'rounded-full': stamp.shape === 'circle',
                    'rotate-45': stamp.shape === 'diamond',
                })}
                style={{ backgroundColor: stamp.color }}
            >
                <div className={cn(stamp.shape === 'diamond' && '-rotate-45')}>
                    {IconComponent}
                </div>
            </div>
        </div>
    );
}

export function StampMaker({ stamp, onStampChange }: StampMakerProps) {

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-4">
                <StampPreview stamp={stamp} />
                <div className="flex-1">
                    <h4 className="font-semibold text-sm">Custom Stamp</h4>
                    <p className="text-xs text-current/70">Design your own digital postage stamp.</p>
                </div>
            </div>

            <div className="space-y-2">
                 <h5 className="text-xs font-semibold text-current/80">Shape</h5>
                 <div className="flex gap-2">
                    {stampShapes.map(s => (
                        <button key={s.name} onClick={() => onStampChange({ ...stamp, shape: s.name })} className={cn('p-2 rounded-md border-2', stamp.shape === s.name ? 'border-current' : 'border-transparent')}>
                            {s.component}
                        </button>
                    ))}
                </div>
            </div>
             <div className="space-y-2">
                 <h5 className="text-xs font-semibold text-current/80">Icon</h5>
                 <div className="flex gap-2">
                    {stampIcons.map(i => (
                        <button key={i.name} onClick={() => onStampChange({ ...stamp, icon: i.name })} className={cn('p-2 rounded-md border-2', stamp.icon === i.name ? 'border-current' : 'border-transparent')}>
                            {i.component}
                        </button>
                    ))}
                </div>
            </div>
            <div className="space-y-2">
                 <h5 className="text-xs font-semibold text-current/80">Color</h5>
                <div className="flex gap-2">
                    {stampColors.map(color => (
                         <button key={color} onClick={() => onStampChange({ ...stamp, color: color })} className={cn("w-8 h-8 rounded-full border-2", stamp.color === color ? 'border-current' : 'border-transparent')}>
                            <div className="w-full h-full rounded-full" style={{ backgroundColor: color }} />
                        </button>
                    ))}
                     <Popover>
                        <PopoverTrigger asChild>
                            <button className={cn("w-8 h-8 rounded-full border-2 p-1", !stampColors.includes(stamp.color) ? 'border-current' : 'border-transparent')}>
                                <div className="w-full h-full rounded-full" style={{ background: 'conic-gradient(from 180deg at 50% 50%, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)'}} />
                            </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                             <input type="color" value={stamp.color} onChange={(e) => onStampChange({...stamp, color: e.target.value})} className="w-24 h-24 p-0 border-none cursor-pointer" />
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
        </div>
    );
}
