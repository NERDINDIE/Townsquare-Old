
import type { Article } from '@/lib/types';
import { ArticleCard } from './ArticleCard';

interface ArticleSummaryProps {
    article: Article;
}

export function ArticleSummary({ article }: ArticleSummaryProps) {
    return (
        <div className="space-y-4">
            <h2 className="font-headline text-3xl font-bold leading-tight hover:text-primary transition-colors">
                <a href={`/articles/${article.slug}`}>{article.title}</a>
            </h2>
            <ArticleCard article={article} variant="horizontal" />
        </div>
    )
}
