
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Check, UploadCloud, X } from '@/components/icons';
import { toast } from '@/hooks/use-toast';
import Link from 'next/link';
import Image from 'next/image';

export default function SafeUploaderPage() {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && file.type.startsWith('image/')) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            toast({
                variant: 'destructive',
                title: 'Invalid File Type',
                description: 'Please select an image file (PNG, JPG, etc.).',
            });
        }
    };
    
    const handleUpload = () => {
        if (!imageFile) return;
        setIsUploading(true);
        // Simulate upload delay
        setTimeout(() => {
            setIsUploading(false);
            toast({
                title: 'Upload Successful',
                description: `"${imageFile.name}" has been uploaded.`,
            });
            handleClear();
        }, 1500);
    }
    
    const handleClear = () => {
        setImageFile(null);
        setImagePreview(null);
        // Reset the file input
        const input = document.getElementById('image-upload') as HTMLInputElement;
        if(input) input.value = '';
    }

    return (
        <div className="container mx-auto max-w-2xl px-4 py-8 md:py-12">
            <header className="mb-8">
                <Button asChild variant="ghost" className="mb-4 -ml-4">
                    <Link href="/testing-ground">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Testing Ground
                    </Link>
                </Button>
                <h1 className="font-headline text-4xl font-bold flex items-center gap-3">
                    <UploadCloud />
                    Safe Uploader
                </h1>
                <p className="text-muted-foreground mt-1">
                    Test uploading an image from your local device.
                </p>
            </header>

            <Card>
                <CardHeader>
                    <CardTitle>Upload Image</CardTitle>
                    <CardDescription>Select an image file from your computer to begin.</CardDescription>
                </CardHeader>
                <CardContent>
                    {imagePreview ? (
                        <div className="w-full relative">
                            <Image 
                                src={imagePreview} 
                                alt="Image preview"
                                width={500}
                                height={300}
                                className="w-full h-auto max-h-96 object-contain rounded-md border"
                            />
                        </div>
                    ) : (
                         <div className="flex items-center justify-center w-full">
                            <label htmlFor="image-upload" className="flex flex-col items-center justify-center w-full h-64 border-2 border-border border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted/80">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <UploadCloud className="w-8 h-8 mb-4 text-muted-foreground" />
                                    <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                    <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
                                </div>
                                <input id="image-upload" type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
                            </label>
                        </div>
                    )}
                </CardContent>
                {imageFile && (
                    <CardFooter className="flex justify-end gap-2">
                        <Button variant="outline" onClick={handleClear} disabled={isUploading}>
                            <X className="mr-2 h-4 w-4" />
                            Cancel
                        </Button>
                        <Button onClick={handleUpload} disabled={isUploading}>
                             <Check className="mr-2 h-4 w-4" />
                            {isUploading ? "Uploading..." : "Confirm & Upload"}
                        </Button>
                    </CardFooter>
                )}
            </Card>
        </div>
    );
}
