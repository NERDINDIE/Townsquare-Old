
'use client';

import { Battery, Rss, Signal } from "lucide-react";
import Link from 'next/link';
import { ClientOnly } from "@/components/client-only";

const AppIcon = ({ href, label, icon }: { href: string; label: string; icon: React.ReactNode }) => (
    <Link href={href} className="flex flex-col items-center gap-1 text-center">
        <div className="w-12 h-12 bg-blue-300 rounded-lg flex items-center justify-center">
            {icon}
        </div>
        <span className="text-xs">{label}</span>
    </Link>
);


export default function KeitaiHome() {
  return (
    <ClientOnly>
      <div className="bg-gray-800 flex items-center justify-center h-screen p-4 font-keitai">
          <div className="w-[240px] h-[420px] bg-blue-200 border-4 border-gray-600 rounded-lg flex flex-col text-black">
              <header className="flex justify-between items-center bg-gray-300 px-2 py-1 text-xs">
                  <div className="flex items-center gap-1">
                      <Rss className="h-3 w-3" />
                      <span>TOWNSQR</span>
                      <Signal className="h-3 w-3" />
                  </div>
                  <span>10:30 AM</span>
                  <div className="flex items-center gap-1">
                      <span>[i]</span>
                      <Battery className="h-3 w-3" />
                  </div>
              </header>
              <main className="flex-1 p-4">
                   <div className="grid grid-cols-3 gap-4">
                      <AppIcon href="/messages" label="メッセージ" icon="✉️" />
                      <AppIcon href="/calendar" label="カレンダー" icon="📅" />
                      <AppIcon href="/camera" label="カメラ" icon="📷" />
                      <AppIcon href="/browser" label="ブラウザ" icon="🌐" />
                      <AppIcon href="/settings" label="セッテイ" icon="⚙️" />
                      <AppIcon href="/games" label="ゲーム" icon="🎮" />
                   </div>
              </main>
              <footer className="flex justify-around items-center bg-gray-300 p-1">
                  <button className="text-xs">Menu</button>
                  <div className="h-8 w-8 bg-blue-500 rounded-full border-2 border-gray-400"></div>
                  <button className="text-xs">Address</button>
              </footer>
          </div>
      </div>
    </ClientOnly>
  );
}
