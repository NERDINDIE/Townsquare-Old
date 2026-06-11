
export interface Article {
  id: string;
  slug: string;
  title: string;
  author: string;
  date: string;
  image: string;
  category: string;
  excerpt: string;
  content: string;
  featured?: boolean;
  videoUrl?: string;
}
