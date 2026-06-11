
import { ArticleCard } from "@/components/ArticleCard";
import { articles } from "@/lib/data";

const retroArticles = articles.slice(0, 4).map(a => ({...a, category: 'Retro'}));


export default function RetroPage() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-8 md:py-12">
        <header className="mb-8 text-center">
            <h1 className="font-headline text-5xl font-bold">Retro</h1>
            <p className="mt-2 text-lg text-muted-foreground">
                A look back at classic tech, gaming, and culture.
            </p>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {retroArticles.map(article => (
                <ArticleCard key={article.id} article={article} />
            ))}
        </div>
    </div>
  );
}
