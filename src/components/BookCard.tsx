
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

interface Book {
    title: string;
    author: string;
    image: string;
    dataAiHint: string;
}

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  return (
    <Link href="#" className="group block">
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <CardContent className="p-0">
          <div className="relative w-full aspect-[2/3]">
            <Image
              src={book.image}
              alt={`Cover for ${book.title}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              data-ai-hint={book.dataAiHint}
            />
          </div>
        </CardContent>
        <CardFooter className="p-3 flex-col items-start">
           <p className="font-semibold text-sm truncate w-full">{book.title}</p>
           <p className="text-xs text-muted-foreground truncate w-full">by {book.author}</p>
        </CardFooter>
      </Card>
    </Link>
  );
}
