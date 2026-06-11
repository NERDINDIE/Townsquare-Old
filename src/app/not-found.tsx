
'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Compass } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const query = formData.get('q');
    if (query) {
      router.push(`/search?q=${query}`);
    }
  };

  return (
    <div className="container mx-auto flex h-[calc(100vh-8rem)] items-center justify-center text-center">
      <div>
        <Compass className="mx-auto h-16 w-16 text-muted-foreground" />
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
          404 - Page Not Found
        </h1>
        <p className="mt-6 text-base leading-7 text-muted-foreground">
          Sorry, we couldn’t find the page you’re looking for. It might have been moved or deleted.
        </p>

        <form onSubmit={handleSearch} className="mt-6 mx-auto max-w-sm relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input name="q" placeholder="Try searching for it..." className="pl-10 h-11" />
        </form>

        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button onClick={() => router.push('/')}>
            Go back home
          </Button>
          <Button variant="ghost" onClick={() => router.back()}>
            Go back to previous page
          </Button>
        </div>
      </div>
    </div>
  );
}
