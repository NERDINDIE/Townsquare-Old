'use client';

import { useState } from 'react';
import { Battery, Calendar, Gamepad2, Globe, Mail, MessageSquare, Music, Phone, Settings, User, Users, Video } from 'lucide-react';
import Image from 'next/image';

const AppIcon = ({ label, icon, wide }: { label: string; icon: React.ReactNode; wide?: boolean }) => (
  <div className={`flex flex-col items-center justify-center text-center text-white text-xs font-semibold ${wide ? 'col-span-2' : ''}`}>
    {icon}
    <span className="mt-1">{label}</span>
  </div>
);

const BlueAppIcon = ({ Svg }: { Svg: React.ElementType }) => (
    <div className="bg-gradient-to-b from-blue-500 to-blue-700 w-12 h-12 rounded-lg flex items-center justify-center">
        <Svg className="h-8 w-8 text-white" />
    </div>
)

export default function BadaOsPage() {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = 3;

  return (
    <div className="bg-gray-200 min-h-screen flex items-center justify-center p-4 font-sans">
      <div className="w-[320px] h-[640px] bg-gradient-to-b from-gray-100 to-gray-300 rounded-[28px] shadow-2xl border-4 border-gray-400 flex flex-col relative overflow-hidden">
        {/* Phone Body */}
        <div className="absolute inset-0 border-[12px] border-black rounded-[24px]" />
        
        <div className="relative flex-1 flex flex-col bg-[#2a3a4a]">
           {/* Header */}
          <div className="h-8 flex-shrink-0 flex items-center justify-between px-3 text-white">
              <span className="font-bold text-sm">SAMSUNG</span>
              <div className="flex items-center gap-1.5 text-xs">
                <span>01:02</span>
                <Battery className="h-4 w-4" />
              </div>
          </div>
          
          {/* Main Screen Content */}
          <div className="flex-1 overflow-hidden">
            {/* This is where you would implement a swipeable container */}
             <div className="h-full">
                {/* Page 1 */}
                <div className="h-full flex flex-col p-2">
                    <div className="flex justify-between items-center px-2 py-1 bg-black/20 rounded-t-lg">
                        <Settings className="h-5 w-5 text-white"/>
                        <div className="flex items-center gap-1">
                            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                            <div className="w-1.5 h-1.5 bg-white/50 rounded-full"></div>
                            <div className="w-1.5 h-1.5 bg-white/50 rounded-full"></div>
                        </div>
                    </div>
                    <div className="flex-1 bg-black/10 backdrop-blur-sm p-2 rounded-b-lg grid grid-cols-3 grid-rows-4 gap-y-2">
                        <AppIcon label="Protokolle" icon={<BlueAppIcon Svg={Phone} />} />
                        <AppIcon label="Social Hub" icon={<BlueAppIcon Svg={Users} />} />
                        <AppIcon label="Musik" icon={<BlueAppIcon Svg={Music} />} />

                        <AppIcon label="Internet" icon={<BlueAppIcon Svg={Globe} />} />
                        <AppIcon label="E-Mail" icon={<BlueAppIcon Svg={Mail} />} />
                        <AppIcon label="Kalender" icon={<BlueAppIcon Svg={Calendar} />} />

                        <AppIcon label="Chat" icon={<BlueAppIcon Svg={MessageSquare} />} />
                        <AppIcon label="Kamera" icon={<Image src="https://placehold.co/48x48.png" width={48} height={48} alt="Camera" className="rounded-lg" />} />
                        <AppIcon label="Einstellungen" icon={<BlueAppIcon Svg={Settings} />} />

                        <AppIcon label="Facebook" icon={<Image src="https://placehold.co/48x48/3B5998/FFFFFF?text=f&font=roboto" width={48} height={48} alt="Facebook" className="rounded-lg" />} />
                        <AppIcon label="Spiele" icon={<BlueAppIcon Svg={Gamepad2} />} />
                        <AppIcon label="YouTube" icon={<Image src="https://placehold.co/48x48/FF0000/FFFFFF?text=YT&font=roboto" width={48} height={48} alt="YouTube" className="rounded-lg" />} />

                    </div>
                </div>
            </div>
          </div>

          {/* Dock */}
          <div className="h-16 bg-gradient-to-b from-gray-800 to-black flex-shrink-0 grid grid-cols-3 items-center text-white text-sm font-semibold">
              <div className="flex flex-col items-center justify-center">
                  <Phone className="h-5 w-5"/>
                  <span>Tastenfeld</span>
              </div>
              <div className="flex flex-col items-center justify-center">
                   <User className="h-5 w-5"/>
                   <span>Kontakte</span>
              </div>
              <div className="flex flex-col items-center justify-center">
                   <MessageSquare className="h-5 w-5"/>
                   <span>Nachrichten</span>
              </div>
          </div>
        </div>
         {/* Physical Buttons */}
        <div className="h-16 flex-shrink-0 bg-gray-100 flex items-center justify-center gap-6 rounded-b-2xl">
            <div className="w-10 h-6 bg-gray-200 border-b-2 border-gray-400 rounded-sm"></div>
            <div className="w-10 h-10 bg-gray-200 border-2 border-gray-400 rounded-lg"></div>
            <div className="w-10 h-6 bg-gray-200 border-b-2 border-gray-400 rounded-sm"></div>
        </div>
      </div>
    </div>
  );
}