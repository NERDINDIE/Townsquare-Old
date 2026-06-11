
'use client';

import { useTabs } from "@/context/tab-context";
import { cn } from "@/lib/utils";
import { Plus, X } from "lucide-react";
import { Button } from "./ui/button";

export function TabBar() {
  const { tabs, activeTab, setActiveTab, addTab, removeTab } = useTabs();

  if (tabs.length === 0) {
    return null;
  }

  return (
    <div className="h-10 bg-muted border-b flex items-center gap-1 px-2">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab)}
          className={cn(
            "h-full flex items-center gap-2 px-3 text-sm rounded-t-md border-b-2",
            activeTab?.id === tab.id
              ? "bg-background border-primary"
              : "border-transparent hover:bg-background/50"
          )}
        >
          <span>{tab.title}</span>
          <div
            className="h-5 w-5 rounded-full flex items-center justify-center hover:bg-destructive/20 hover:text-destructive"
            onClick={(e) => {
              e.stopPropagation();
              removeTab(tab.id);
            }}
          >
            <X className="h-3 w-3" />
          </div>
        </button>
      ))}
       <Button 
            variant="ghost" 
            size="icon" 
            className="h-7 w-7 ml-2"
            onClick={() => addTab({id: Date.now().toString(), title: "New Tab", path: "/"})}
        >
            <Plus className="h-4 w-4" />
        </Button>
    </div>
  );
}
