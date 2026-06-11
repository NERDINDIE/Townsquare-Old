
'use client';

import { usePathname } from 'next/navigation';
import { createContext, useContext, useState, ReactNode, useEffect, Dispatch, SetStateAction } from 'react';

export interface Tab {
  id: string;
  title: string;
  path: string;
}

interface TabContextType {
  tabs: Tab[];
  activeTab: Tab | null;
  addTab: (tab: Tab) => void;
  removeTab: (id: string) => void;
  setActiveTab: (tab: Tab | null) => void;
}

const TabContext = createContext<TabContextType | undefined>(undefined);

export function TabProvider({ children }: { children: ReactNode }) {
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [activeTab, setActiveTab] = useState<Tab | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // If there's an active tab, update its path on navigation
    // This is a simple way to keep tab content in sync. A real implementation
    // would be more complex, likely involving nested layouts.
    if (activeTab) {
      setTabs(prevTabs =>
        prevTabs.map(tab =>
          tab.id === activeTab.id ? { ...tab, path: pathname } : tab
        )
      );
    }
  }, [pathname, activeTab]);

  const addTab = (newTab: Tab) => {
    // Avoid adding duplicate tabs
    if (!tabs.some(tab => tab.path === newTab.path)) {
      setTabs(prev => [...prev, newTab]);
    }
    setActiveTab(newTab);
  };

  const removeTab = (id: string) => {
    setTabs(prev => {
      const newTabs = prev.filter(tab => tab.id !== id);
      if (activeTab?.id === id) {
        // If the closed tab was active, set the last tab as active, or null if no tabs are left
        setActiveTab(newTabs[newTabs.length - 1] || null);
      }
      return newTabs;
    });
  };

  return (
    <TabContext.Provider value={{ tabs, activeTab, addTab, removeTab, setActiveTab }}>
      {children}
    </TabContext.Provider>
  );
}

export function useTabs() {
  const context = useContext(TabContext);
  if (context === undefined) {
    throw new Error('useTabs must be used within a TabProvider');
  }
  return context;
}
