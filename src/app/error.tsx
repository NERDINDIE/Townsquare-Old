
'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from '@/components/icons';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="container mx-auto flex h-[calc(100vh-8rem)] items-center justify-center text-center">
      <div>
        <AlertTriangle className="mx-auto h-16 w-16 text-destructive" />
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
          Something went wrong
        </h1>
        <p className="mt-6 text-base leading-7 text-muted-foreground">
          We apologize for the inconvenience. The error has been logged and our team will investigate.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button onClick={() => reset()}>
            Try again
          </Button>
          <Button variant="ghost" asChild>
            <a href="/">Go back home</a>
          </Button>
        </div>
      </div>
    </div>
  );
}
