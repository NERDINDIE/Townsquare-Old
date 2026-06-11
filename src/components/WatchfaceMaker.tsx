
'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ArrowLeft, ChevronRight, MoreVertical } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const colors = [
  '#FFFFFF', '#000000', '#FF453A', '#FF9F0A', '#FFD60A',
  '#FFF500', '#32D74B', '#64D2FF', '#0A84FF', '#BF5AF2',
  '#F0E68C', '#90EE90', '#ADD8E6', '#D3D3D3', '#A9A9A9',
];

const styles = [
    {
        image: 'https://placehold.co/200x250/000000/FFFFFF?text=9:28%5CnTUE%5Cn8/16&font=roboto'
    },
    {
        image: 'https://placehold.co/200x250/000000/FFFFFF?text=9:28%5Cn%5CnTUE%208/16&font=roboto'
    }
]

export function WatchfaceMaker({ onClose }: { onClose: () => void }) {
    const [selectedColor, setSelectedColor] = useState(colors[0]);
    const [selectedStyle, setSelectedStyle] = useState(styles[0]);

  return (
    <div className="bg-black text-white flex flex-col h-[85vh] max-h-[800px] rounded-lg">
        <header className="flex items-center justify-between p-4 border-b border-gray-700 flex-shrink-0">
            <Button variant="ghost" size="icon" onClick={onClose}>
                <ArrowLeft />
            </Button>
            <h1 className="text-lg font-semibold">Edit photo watchface</h1>
            <Button variant="ghost" size="icon">
                <MoreVertical />
            </Button>
        </header>
        
        <div className="flex-shrink-0 p-8 flex items-center justify-center">
            <div 
                className="relative w-48 h-60 rounded-3xl bg-gray-900 flex items-center justify-center overflow-hidden"
                style={{
                    boxShadow: 'inset 0 0 10px #000'
                }}
            >
                <Image src="https://storage.googleapis.com/studioprompt-images/watch-bg.jpg" alt="watch background" layout="fill" objectFit="cover" className="opacity-50" />
                <div className="relative flex flex-col items-center text-center">
                    <p className="text-5xl font-bold" style={{color: selectedColor}}>9:28</p>
                    <p className="text-lg mt-1" style={{color: selectedColor}}>TUE</p>
                    <p className="text-lg" style={{color: selectedColor}}>8/16</p>
                </div>
            </div>
        </div>

        <div className="flex-grow bg-gray-800/50 backdrop-blur-sm rounded-t-3xl p-6 overflow-y-auto">
             <Tabs defaultValue="color" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-gray-700">
                    <TabsTrigger value="background">Background</TabsTrigger>
                    <TabsTrigger value="style">Style</TabsTrigger>
                    <TabsTrigger value="color">Color</TabsTrigger>
                </TabsList>
                <TabsContent value="background" className="mt-6">
                    <button className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-gray-700">
                        <div>
                            <p className="font-semibold">Add photo</p>
                            <p className="text-sm text-gray-400">6 photos</p>
                        </div>
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                    </button>
                </TabsContent>
                <TabsContent value="style" className="mt-6">
                    <h3 className="text-sm font-semibold text-gray-400 mb-2">Style</h3>
                    <div className="flex gap-4">
                        {styles.map((style, index) => (
                            <button key={index} onClick={() => setSelectedStyle(style)} className={cn('rounded-xl border-2 overflow-hidden', selectedStyle === style ? 'border-orange-500' : 'border-transparent')}>
                                <Image src={style.image} alt={`Style ${index + 1}`} width={80} height={100} className="object-cover" />
                            </button>
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="color" className="mt-6">
                     <h3 className="text-sm font-semibold text-gray-400 mb-2">Color</h3>
                     <div className="flex flex-wrap gap-4">
                        {colors.map((color, index) => (
                             <button 
                                key={index}
                                onClick={() => setSelectedColor(color)}
                                className={cn(
                                    'w-10 h-10 rounded-full border-2',
                                    selectedColor === color ? 'border-orange-500' : 'border-gray-600'
                                )}
                                style={{ backgroundColor: color }}
                             />
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
        
        <footer className="p-4 border-t border-gray-700 bg-gray-800/50 backdrop-blur-sm rounded-b-lg flex-shrink-0">
            <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white" size="lg" onClick={onClose}>
                Apply
            </Button>
        </footer>
    </div>
  )
}
