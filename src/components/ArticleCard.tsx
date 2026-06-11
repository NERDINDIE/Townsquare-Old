
import Image from 'next/image';
import Link from 'next/link';
import type { Article } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { PlayCircle } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
  variant?: 'vertical' | 'horizontal';
  className?: string;
  small?: boolean;
  href?: string;
}

export function ArticleCard({ article, variant = 'vertical', className, small = false, href }: ArticleCardProps) {
  const linkHref = href || `/articles/${article.slug}`;
  if (variant === 'horizontal') {
    return (
      <Link href={linkHref} className="group block">
        <Card className={cn("overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 flex flex-col md:flex-row", className)}>
          <CardHeader className="p-0 flex-shrink-0 md:w-1/3">
            <div className="relative w-full aspect-video md:h-full">
              <Image
                src={article.image}
                alt={`Image for ${article.title}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                data-ai-hint="article photo"
              />
              {article.videoUrl && (
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <PlayCircle className="h-10 w-10 text-white" />
                </div>
              )}
            </div>
          </CardHeader>
          <div className="flex flex-col flex-grow">
            <CardContent className="p-4 flex-grow">
              <Badge variant="secondary" className="mb-2 uppercase text-xs tracking-wider">{article.category}</Badge>
              <CardTitle className="font-headline text-xl leading-tight transition-colors group-hover:text-primary">
                {article.title}
              </CardTitle>
              <CardDescription className="mt-2 text-sm text-muted-foreground line-clamp-2">
                {article.excerpt}
              </CardDescription>
            </CardContent>
            <CardFooter className="p-4 pt-0 text-xs text-muted-foreground">
              <span>By {article.author}</span>
              <span className="mx-2">&bull;</span>
              <span>{article.date}</span>
            </CardFooter>
          </div>
        </Card>
      </Link>
    )
  }

  return (
    <Link href={linkHref} className="group block">
      <Card className={cn("flex h-full flex-col overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10", className)}>
        <CardHeader className="p-0">
          <div className={cn("relative w-full", small ? "h-32" : "h-48")}>
            <Image
              src={article.image}
              alt={`Image for ${article.title}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              data-ai-hint="article photo"
            />
            {article.videoUrl && (
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <PlayCircle className="h-10 w-10 text-white" />
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="flex-grow p-4">
          <Badge variant="secondary" className="mb-2 uppercase text-xs tracking-wider">{article.category}</Badge>
          <CardTitle className={cn("font-headline leading-tight transition-colors group-hover:text-primary", small ? "text-lg" : "text-xl")}>
            {article.title}
          </CardTitle>
          {!small && <p className="mt-2 text-sm text-muted-foreground">{article.excerpt}</p>}
        </CardContent>
        <CardFooter className="p-4 pt-0 text-xs text-muted-foreground">
          <span>By {article.author}</span>
          <span className="mx-2">&bull;</span>
          <span>{article.date}</span>
        </CardFooter>
      </Card>
    </Link>
  );
}
