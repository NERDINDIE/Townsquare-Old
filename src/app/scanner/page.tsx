
'use client';

import { Button } from "@/components/ui/button";
import { ArrowLeft, Camera, FileText, Scan, FileType, Check, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export default function ScannerPage() {
    const router = useRouter();
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [hasCameraPermission, setHasCameraPermission] = useState(false);
    const [scannedImage, setScannedImage] = useState<string | null>(null);

    useEffect(() => {
        const getCameraPermission = async () => {
            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                toast({ variant: 'destructive', title: 'Camera not supported', description: 'Your browser does not support camera access.' });
                return;
            }
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
                setHasCameraPermission(true);
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (error) {
                console.error('Error accessing camera:', error);
                setHasCameraPermission(false);
                toast({ variant: 'destructive', title: 'Camera Access Denied', description: 'Please enable camera permissions in your browser settings.' });
            }
        };
        getCameraPermission();
        
        return () => {
             if (videoRef.current && videoRef.current.srcObject) {
                const stream = videoRef.current.srcObject as MediaStream;
                stream.getTracks().forEach(track => track.stop());
            }
        }
    }, []);
    
    const handleScan = () => {
        if (!videoRef.current || !canvasRef.current) return;
        const video = videoRef.current;
        const canvas = canvasRef.current;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const context = canvas.getContext('2d');
        context?.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        setScannedImage(canvas.toDataURL('image/jpeg'));
    };
    
    const handleRetake = () => {
        setScannedImage(null);
    }
    
    const handleSave = () => {
        toast({ title: 'Document Saved', description: 'Your scanned document has been saved.' });
        setScannedImage(null);
    }

    return (
        <div className="h-screen bg-black text-white flex flex-col">
            <header className="p-4 z-10 flex justify-between items-center bg-black/50">
                <Button variant="ghost" size="icon" onClick={() => router.back()}>
                    <ArrowLeft />
                </Button>
                 <h1 className="text-xl font-bold">Doc Scanner</h1>
                 <div className="w-10"></div>
            </header>
            
            <main className="flex-1 flex flex-col items-center justify-center relative">
                 <div className="relative w-full h-full">
                    {scannedImage ? (
                        <Image src={scannedImage} alt="Scanned document" fill className="object-contain" />
                    ) : (
                        <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
                    )}
                 </div>
                 {!scannedImage && (
                    <div className="absolute inset-0 border-8 border-white/20 border-dashed rounded-3xl m-8 pointer-events-none">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 bg-black/50 rounded-full">
                            <FileText className="h-10 w-10"/>
                        </div>
                    </div>
                 )}
            </main>
            
            <footer className="p-6 bg-black/50 z-10 flex items-center justify-center">
                {scannedImage ? (
                    <div className="flex items-center gap-8">
                        <Button onClick={handleRetake} variant="destructive" size="lg" className="rounded-full h-20 w-20">
                             <X className="h-10 w-10" />
                        </Button>
                        <Button onClick={handleSave} size="lg" className="rounded-full h-20 w-20 bg-green-500 hover:bg-green-600">
                             <Check className="h-10 w-10" />
                        </Button>
                    </div>
                ) : (
                     <Button onClick={handleScan} disabled={!hasCameraPermission} size="lg" className="rounded-full h-24 w-24 border-4 border-white bg-black/50 hover:bg-white/20">
                        <Scan className="h-12 w-12" />
                    </Button>
                )}
            </footer>
             <canvas ref={canvasRef} className="hidden" />
        </div>
    );
}

