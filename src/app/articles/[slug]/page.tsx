
import { notFound } from 'next/navigation';
import { articles } from '@/lib/data';
import { ArticleClientPage } from './article-client-page';

// This is a Server Component

// This function generates static paths at build time
export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = articles.find((a) => a.slug === params.slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = articles
    .filter((a) => a.category === article.category && a.id !== article.id)
    .slice(0, 3);
  
  // The server component fetches data and passes it to the client component
  return <ArticleClientPage article={article} relatedArticles={relatedArticles} />;
}
