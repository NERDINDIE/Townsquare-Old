
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { ArrowLeft, BookMarked, ChevronLeft, ChevronRight, Plus, Trash2 } from '@/components/icons';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const LOCAL_STORAGE_KEY = 'multi-page-notebook-content';

export default function NotebookPage() {
  const [pages, setPages] = useState(['']); // An array of strings, each representing a page
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  useEffect(() => {
    const savedContent = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedContent) {
      try {
        const parsedPages = JSON.parse(savedContent);
        if (Array.isArray(parsedPages) && parsedPages.length > 0) {
          setPages(parsedPages);
        }
      } catch (e) {
        console.error("Failed to parse notebook content from localStorage", e);
        setPages(['']); // Reset to a single blank page if data is corrupt
      }
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(pages));
    toast({
      title: 'Notebook Saved',
      description: 'Your notes have been saved locally in your browser.',
    });
  };
  
  const handleContentChange = (index: number, newContent: string) => {
    const newPages = [...pages];
    newPages[index] = newContent;
    setPages(newPages);
  };
  
  const handleNextPage = () => {
      // Ensure we don't go past the last page for the left-side view
      if (currentPageIndex < pages.length - 2) {
          setCurrentPageIndex(prev => prev + 2);
      }
  };

  const handlePrevPage = () => {
      if (currentPageIndex > 0) {
          setCurrentPageIndex(prev => prev - 2);
      }
  };
  
  const addPage = () => {
    setPages(prev => [...prev, '']);
    toast({ title: 'Page Added' });
  };
  
  const deletePage = (index: number) => {
    if (pages.length <= 1) {
        toast({ variant: 'destructive', title: "Cannot delete the last page."});
        return;
    }
    const newPages = pages.filter((_, i) => i !== index);
    setPages(newPages);
    // Adjust current page if we deleted a page we were on or before
    if (currentPageIndex >= newPages.length) {
        setCurrentPageIndex(Math.max(0, newPages.length - (newPages.length % 2 === 0 ? 2 : 1)));
    }
    toast({ title: 'Page Deleted' });
  };

  const leftPageIndex = currentPageIndex;
  const rightPageIndex = currentPageIndex + 1;

  return (
    <div className="bg-muted/30 min-h-screen">
      <div className="container mx-auto max-w-5xl px-4 py-8 md:py-12">
        <header className="mb-8">
          <Button asChild variant="ghost" className="mb-4 -ml-4">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Link>
          </Button>
          <div className="flex justify-between items-center">
             <div>
                <h1 className="font-headline text-4xl font-bold flex items-center gap-3">
                  <BookMarked className="h-10 w-10" />
                  Notebook
                </h1>
                <p className="text-muted-foreground mt-1">
                  Your private space to write and save notes. Everything is saved locally in your browser.
                </p>
             </div>
             <Button onClick={handleSave}>Save Notebook</Button>
          </div>
        </header>

        {/* E-Notebook View */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 bg-background shadow-lg border rounded-lg p-4 min-h-[70vh]">
            {/* Left Page */}
            <div className="flex flex-col h-full relative group">
              <Textarea
                value={pages[leftPageIndex] || ''}
                onChange={(e) => handleContentChange(leftPageIndex, e.target.value)}
                placeholder="Start writing..."
                className="w-full flex-1 p-4 border rounded-md focus-visible:ring-1 bg-background resize-none"
              />
               <div className="text-center text-sm text-muted-foreground pt-2">
                    Page {leftPageIndex + 1}
                </div>
                 <Button variant="destructive" size="icon" onClick={() => deletePage(leftPageIndex)} className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-7 w-7">
                    <Trash2 className="h-4 w-4" />
                </Button>
            </div>
            
            {/* Right Page */}
            <div className="flex flex-col h-full relative group">
                {pages.length > rightPageIndex ? (
                     <>
                        <Textarea
                            value={pages[rightPageIndex] || ''}
                            onChange={(e) => handleContentChange(rightPageIndex, e.target.value)}
                            placeholder="Continue writing..."
                            className="w-full flex-1 p-4 border rounded-md focus-visible:ring-1 bg-background resize-none"
                        />
                        <div className="text-center text-sm text-muted-foreground pt-2">
                            Page {rightPageIndex + 1}
                        </div>
                        <Button variant="destructive" size="icon" onClick={() => deletePage(rightPageIndex)} className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-7 w-7">
                            <Trash2 className="h-4 w-4" />
                        </Button>
                     </>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full border-2 border-dashed rounded-md p-4">
                       <Button onClick={addPage}>
                           <Plus className="mr-2 h-4 w-4" />
                           Add New Page
                       </Button>
                    </div>
                )}
            </div>
          </div>
            {/* Navigation */}
            <div className="flex justify-center items-center gap-4 mt-4">
                <Button variant="outline" onClick={handlePrevPage} disabled={currentPageIndex === 0}>
                    <ChevronLeft className="mr-2 h-4 w-4" /> Previous
                </Button>
                <span className="text-muted-foreground text-sm">
                    Pages {leftPageIndex + 1} - {pages.length > rightPageIndex ? rightPageIndex + 1 : leftPageIndex + 1} of {pages.length}
                </span>
                <Button variant="outline" onClick={handleNextPage} disabled={currentPageIndex >= pages.length - 2}>
                    Next <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
            </div>
        </div>
      </div>
    </div>
  );
}
