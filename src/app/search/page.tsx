'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import type { Article } from '@/lib/types';
import { articles } from '@/lib/data';
import { ArticleCard } from '@/components/ArticleCard';

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchResults, setSearchResults] = useState<Article[]>([]);

  useEffect(() => {
    if (query) {
      const filteredArticles = articles.filter(
        (article) =>
          article.title.toLowerCase().includes(query.toLowerCase()) ||
          article.content.toLowerCase().includes(query.toLowerCase()) ||
          article.category.toLowerCase().includes(query.toLowerCase()) ||
          article.author.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filteredArticles);
    } else {
      setSearchResults([]);
    }
  }, [query]);

  if (!query) {
    return (
        <div className="text-center py-16">
            <p className="text-muted-foreground">Please enter a search term to begin.</p>
        </div>
    )
  }

  return (
    <>
      <header className="mb-8">
        <h1 className="font-headline text-4xl font-bold">Search Results</h1>
        <p className="mt-2 text-lg text-muted-foreground">
            {searchResults.length} result{searchResults.length !== 1 && 's'} for: "{query}"
        </p>
      </header>

      {searchResults.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {searchResults.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-muted-foreground">No articles found matching your search.</p>
        </div>
      )}
    </>
  );
}


export default function SearchPage() {
    return (
        <div className="container mx-auto px-4 py-8 md:py-12">
            <Suspense fallback={<div>Loading...</div>}>
                <SearchResults />
            </Suspense>
        </div>
    )
}
