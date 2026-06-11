
'use client';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

export default function MailboxLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const pathname = usePathname();
  const isListPage = pathname === '/mailbox';
  const isDmPage = /^\/mailbox\/\d+$/.test(pathname);
  
  return (
      <div className={cn("md:grid md:grid-cols-[3fr_7fr]", isDmPage && 'grid grid-cols-1 md:grid-cols-[3fr_7fr]')}>
          {isListPage && <div className="w-full h-full border-r bg-muted/20 flex-col md:flex hidden md:col-start-2">
                 <div className="flex-1 flex items-center justify-center text-center p-4">
                    <div>
                        <h2 className="text-xl font-semibold">Select a conversation</h2>
                        <p className="text-muted-foreground">Choose one from the list to start chatting.</p>
                    </div>
                 </div>
            </div>}
          {children}
      </div>
  )
}
