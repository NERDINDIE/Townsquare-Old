
'use client';

import { createContext, useContext, useState, ReactNode, useEffect, Dispatch, SetStateAction } from 'react';

type Edition = 'morning' | 'afternoon' | 'evening' | 'late-night';

interface EditionContextType {
  edition: Edition;
  setEdition: Dispatch<SetStateAction<Edition>>;
}

const EditionContext = createContext<EditionContextType | undefined>(undefined);

const getEditionForTime = (hour: number): Edition => {
    if (hour >= 5 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 18) return 'afternoon';
    if (hour >= 18 && hour < 22) return 'evening';
    return 'late-night';
}

export function EditionProvider({ children }: { children: ReactNode }) {
  const [edition, setEdition] = useState<Edition>('afternoon');

  useEffect(() => {
    const currentHour = new Date().getHours();
    const currentEdition = getEditionForTime(currentHour);
    setEdition(currentEdition);
  }, []);

  return (
    <EditionContext.Provider value={{ edition, setEdition }}>
      {children}
    </EditionContext.Provider>
  );
}

export function useEdition() {
  const context = useContext(EditionContext);
  if (context === undefined) {
    throw new Error('useEdition must be used within an EditionProvider');
  }
  return context;
}
