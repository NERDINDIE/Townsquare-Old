
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

interface PhotoCardProps {
    src: string;
    alt: string;
    caption?: string;
    dataAiHint?: string;
}

export function PhotoCard({ src, alt, caption, dataAiHint }: PhotoCardProps) {
    return (
        <Card className="overflow-hidden my-4">
            <CardContent className="p-0">
                <div className="relative aspect-video w-full">
                    <Image src={src} alt={alt} fill className="object-cover" data-ai-hint={dataAiHint} />
                </div>
                {caption && (
                    <div className="p-4 bg-muted/50">
                        <p className="text-sm text-muted-foreground">{caption}</p>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
