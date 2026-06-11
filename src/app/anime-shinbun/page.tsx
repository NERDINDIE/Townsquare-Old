
import { ArticleCard } from "@/components/ArticleCard";
import { articles } from "@/lib/data";

const animeArticles = articles.slice(0, 4).map(a => ({...a, category: 'Anime'}));


export default function AnimeShinbunPage() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-8 md:py-12">
        <header className="mb-8 text-center">
            <h1 className="font-headline text-5xl font-bold">Anime Shinbun</h1>
            <p className="mt-2 text-lg text-muted-foreground">
                Your source for news and articles from the world of anime and manga.
            </p>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {animeArticles.map(article => (
                <ArticleCard key={article.id} article={article} />
            ))}
        </div>
    </div>
  );
}
