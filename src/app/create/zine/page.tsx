
'use client';

import { useState, useRef, MouseEvent, DragEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, ImageIcon, Text, Trash2 } from '@/components/icons';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';

interface ZineElement {
  id: number;
  type: 'text' | 'image';
  content: string;
  x: number;
  y: number;
  width: number;
  height: number;
  isEditing?: boolean;
}

export default function CreateZinePage() {
  const [elements, setElements] = useState<ZineElement[]>([]);
  const [nextId, setNextId] = useState(1);
  const [selectedElementId, setSelectedElementId] = useState<number | null>(null);
  const zineCanvasRef = useRef<HTMLDivElement>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const updateElement = (id: number, newProps: Partial<ZineElement>) => {
    setElements(elements.map(el => el.id === id ? { ...el, ...newProps } : el));
  };
  
  const removeElement = (id: number) => {
    setElements(elements.filter(el => el.id !== id));
    setSelectedElementId(null);
  }

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>, id: number) => {
    e.preventDefault();
    setSelectedElementId(id);
    const element = elements.find(el => el.id === id);
    if (!element) return;
    setDragOffset({
        x: e.clientX - element.x,
        y: e.clientY - element.y,
    });
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (selectedElementId === null || !zineCanvasRef.current) return;
    
    const element = elements.find(el => el.id === selectedElementId);
    if (!element?.isEditing) {
        const canvasRect = zineCanvasRef.current.getBoundingClientRect();
        const newX = e.clientX - dragOffset.x - canvasRect.left;
        const newY = e.clientY - dragOffset.y - canvasRect.top;
        updateElement(selectedElementId, { x: newX, y: newY });
    }
  };

  const handleMouseUp = () => {
    //
  };

  const handleDoubleClick = (id: number) => {
    updateElement(id, { isEditing: true });
  }

  const handleContentChange = (id: number, content: string) => {
     updateElement(id, { content: content });
  }

  const handleBlur = (id: number) => {
    updateElement(id, { isEditing: false });
  }

  const handleDragStart = (e: DragEvent<HTMLDivElement>, elementType: 'text' | 'image') => {
    e.dataTransfer.setData('application/reactflow', elementType);
    e.dataTransfer.effectAllowed = 'move';
  }

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
  }
  
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!zineCanvasRef.current) return;

    const elementType = e.dataTransfer.getData('application/reactflow') as 'text' | 'image';
    if (!elementType) return;

    const canvasRect = zineCanvasRef.current.getBoundingClientRect();
    const x = e.clientX - canvasRect.left;
    const y = e.clientY - canvasRect.top;
    
    const newElement: ZineElement = {
      id: nextId,
      type: elementType,
      content: elementType === 'text' ? 'Double-click to edit' : 'https://placehold.co/200x200.png',
      x: x,
      y: y,
      width: 200,
      height: elementType === 'text' ? 50 : 200,
    };
    setElements([...elements, newElement]);
    setNextId(nextId + 1);
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 md:py-12">
      <header className="mb-8">
        <Button asChild variant="ghost" className="mb-4 -ml-4">
          <Link href="/create/publication">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Link>
        </Button>
        <div className="flex items-center justify-between">
            <div>
                <h1 className="font-headline text-4xl font-bold">Zine Editor</h1>
                <p className="text-muted-foreground mt-1">Design your zine page by adding and moving elements.</p>
            </div>
            <Button>Save Page</Button>
        </div>
      </header>
      
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Toolbox */}
        <Card className="w-full md:w-56 flex-shrink-0">
          <CardHeader>
            <CardTitle>Toolbox</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
              <div 
                  draggable
                  onDragStart={(e) => handleDragStart(e, 'text')}
                  className="flex items-center gap-3 p-3 border rounded-lg bg-muted cursor-grab active:cursor-grabbing"
              >
                  <Text className="h-6 w-6" />
                  <span>Text</span>
              </div>
              <div 
                  draggable
                  onDragStart={(e) => handleDragStart(e, 'image')}
                  className="flex items-center gap-3 p-3 border rounded-lg bg-muted cursor-grab active:cursor-grabbing"
              >
                  <ImageIcon className="h-6 w-6" />
                  <span>Image</span>
              </div>
          </CardContent>
        </Card>
        
        {/* Canvas */}
        <div 
          ref={zineCanvasRef}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className="relative flex-1 w-full aspect-[8.5/11] bg-white border-2 border-dashed shadow-inner overflow-hidden cursor-crosshair"
        >
          {elements.map((element) => (
            <div
              key={element.id}
              onMouseDown={(e) => handleMouseDown(e, element.id)}
              onDoubleClick={() => handleDoubleClick(element.id)}
              style={{
                position: 'absolute',
                left: `${element.x}px`,
                top: `${element.y}px`,
                width: `${element.width}px`,
                minHeight: `${element.height}px`,
              }}
              className={cn(
                "p-1 border-2 border-transparent hover:border-blue-500 cursor-move",
                selectedElementId === element.id && "border-blue-500 z-10"
              )}
            >
              {element.type === 'text' ? (
                  element.isEditing ? (
                      <Textarea 
                          value={element.content}
                          onChange={(e) => handleContentChange(element.id, e.target.value)}
                          onBlur={() => handleBlur(element.id)}
                          autoFocus
                          className="w-full h-full bg-transparent resize-none focus-visible:ring-0 border-none p-1 cursor-text"
                      />
                  ) : (
                      <div className="w-full h-full p-1 break-words cursor-pointer">{element.content}</div>
                  )
              ) : (
                   <img src={element.content} alt="Zine element" className="w-full h-full object-cover pointer-events-none" />
              )}
               {selectedElementId === element.id && (
                  <button
                      onClick={() => removeElement(element.id)}
                      className="absolute -top-3 -right-3 bg-destructive text-destructive-foreground rounded-full p-1 z-20 cursor-pointer"
                  >
                      <Trash2 className="h-3 w-3" />
                  </button>
               )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
