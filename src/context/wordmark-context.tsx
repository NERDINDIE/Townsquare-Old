
'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface WordmarkContextType {
  wordmark: string | null;
  defaultWordmark: string;
  setWordmark: (wordmark: string | null) => void;
}

const WordmarkContext = createContext<WordmarkContextType | undefined>(undefined);

export function WordmarkProvider({ children }: { children: ReactNode }) {
  const defaultWordmark = 'Townsquare';
  const [wordmark, setWordmark] = useState<string | null>(null);

  return (
    <WordmarkContext.Provider value={{ wordmark, defaultWordmark, setWordmark }}>
      {children}
    </WordmarkContext.Provider>
  );
}

export function useWordmark() {
  const context = useContext(WordmarkContext);
  if (context === undefined) {
    throw new Error('useWordmark must be used within a WordmarkProvider');
  }
  return context;
}
