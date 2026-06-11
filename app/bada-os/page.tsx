
'use client';

import { useState } from 'react';
import { Phone, MessageSquare, User, Wifi, Battery, Search, Rss, Bluetooth, VolumeX, Calendar, Music, Globe, Settings, Gamepad2, Home, Users, Plane, Monitor, Clock, Bell, Leaf, Clock4 } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const AppIcon = ({ label, icon, isLargeIcon, onClick }: { label: string; icon: React.ReactNode; isLargeIcon?: boolean; onClick?: () => void }) => (
    <button onClick={onClick} className="flex flex-col items-center justify-center text-center text-white text-[10px] font-semibold focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded-lg">
      <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center", isLargeIcon ? 'p-1' : 'p-2')}>
        {icon}
      </div>
      <span className="mt-1">{label}</span>
    </button>
);

const BlueAppIcon = ({ Svg, className }: { Svg: React.ElementType, className?: string }) => (
    <div className={cn("bg-gradient-to-b from-blue-500 to-blue-700 w-full h-full rounded-lg flex items-center justify-center", className)}>
        <Svg className="h-7 w-7 text-white" />
    </div>
)

const CalendarWidget = () => (
    <div className="w-40 bg-black/60 backdrop-blur-sm rounded-lg border border-white/20 p-2 text-white font-sans text-xs shadow-lg">
        <div className="flex justify-between items-center text-center font-bold px-1">
            <p className="text-sm">Feb</p>
            <p className="text-sm">2011</p>
        </div>
        <table className="w-full mt-1 text-center">
            <thead>
                <tr className="text-white/70">
                    <th>M</th><th>T</th><th>W</th><th>T</th><th>F</th><th className="text-red-400">S</th><th className="text-red-400">S</th>
                </tr>
            </thead>
            <tbody>
                <tr><td></td><td>1</td><td>2</td><td>3</td><td>4</td><td className="text-red-400">5</td><td className="text-red-400">6</td></tr>
                <tr><td>7</td><td>8</td><td>9</td><td>10</td><td>11</td><td className="text-red-400">12</td><td className="text-red-400">13</td></tr>
                <tr><td>14</td><td>15</td><td>16</td><td>17</td><td>18</td><td className="text-red-400">19</td><td className="text-red-400">20</td></tr>
                <tr><td>21</td><td>22</td><td>23</td><td>24</td><td>25</td><td className="text-red-400">26</td><td className="text-red-400">27</td></tr>
                <tr><td>28</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
            </tbody>
        </table>
    </div>
);

const LeafCalendarWidget = () => (
    <div className="w-40 h-28 bg-white/90 backdrop-blur-md rounded-lg border border-green-600/30 p-2 text-green-900 font-sans shadow-lg flex flex-col">
        <div className="flex justify-between items-center text-center font-bold px-1">
            <Leaf className="h-5 w-5 text-green-600" />
            <p className="text-sm text-green-800">August</p>
        </div>
        <div className="flex-1 flex items-center justify-center">
             <p className="text-6xl font-bold text-green-700">23</p>
        </div>
        <p className="text-xs text-center text-green-700/80 font-semibold">Tuesday</p>
    </div>
);

const DigitalClockWidget = () => (
    <div className="w-48 h-20 bg-gray-800/80 backdrop-blur-lg rounded-xl border border-white/20 p-2 text-white font-mono shadow-lg flex items-center justify-center">
        <div className="text-center">
            <p className="text-4xl tracking-widest">10:30</p>
            <p className="text-xs text-cyan-300">WED, 18 AUGUST</p>
        </div>
    </div>
);


const ControlPanel = ({ isOpen }: { isOpen: boolean }) => (
    <div className={cn(
        "absolute top-6 left-0 right-0 bg-black/50 backdrop-blur-md z-20 transition-transform duration-300 ease-in-out",
        isOpen ? "translate-y-0" : "-translate-y-full"
    )}>
        <div className="p-2">
            <div className="grid grid-cols-3 gap-px bg-white/30 rounded-lg overflow-hidden">
                 <div className="flex flex-col items-center justify-center text-center py-2 bg-black/20">
                     <div className="w-10 h-10 flex items-center justify-center bg-green-500 rounded-lg"><Wifi className="h-6 w-6 text-white"/></div>
                     <span className="text-white text-xs mt-1">Wi-Fi</span>
                </div>
                 <div className="flex flex-col items-center justify-center text-center py-2 bg-black/20">
                     <div className="w-10 h-10 flex items-center justify-center bg-green-500 rounded-lg"><Bluetooth className="h-6 w-6 text-white"/></div>
                     <span className="text-white text-xs mt-1">Bluetooth</span>
                </div>
                 <div className="flex flex-col items-center justify-center text-center py-2 bg-black/20">
                     <div className="w-10 h-10 flex items-center justify-center bg-green-500 rounded-lg"><VolumeX className="h-6 w-6 text-white"/></div>
                     <span className="text-white text-xs mt-1">Silent</span>
                </div>
            </div>
        </div>
         <div className="bg-blue-600 text-white font-bold text-sm px-4 py-1.5 flex items-center justify-between">
            <span>Notifications (0)</span>
            <div className="w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-white"></div>
        </div>
    </div>
);

const AppMenu = ({ setCurrentPage }: { setCurrentPage: (page: number) => void }) => (
    <div className="h-full flex flex-col p-2 bg-[#2a3a4a] text-xs font-semibold text-white">
        <div className="flex justify-between items-center px-2 py-1 bg-black/20 rounded-t-lg">
            <Settings className="h-5 w-5"/>
            <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                <div className="w-1.5 h-1.5 bg-white/50 rounded-full"></div>
                <div className="w-1.5 h-1.5 bg-white/50 rounded-full"></div>
            </div>
             <div className="w-5 h-5" />
        </div>
        <div className="flex-1 bg-black/10 backdrop-blur-sm p-2 rounded-b-lg grid grid-cols-3 grid-rows-4 gap-x-2 gap-y-3">
            <AppIcon label="Protokolle" icon={<BlueAppIcon Svg={Phone} />} />
            <AppIcon label="Social Hub" icon={<BlueAppIcon Svg={Users} className="bg-lime-500"/>} />
            <AppIcon label="Musik" icon={<BlueAppIcon Svg={Music} />} />

            <AppIcon label="Internet" icon={<BlueAppIcon Svg={Globe} />} />
            <AppIcon label="E-Mail" icon={<div className="bg-gradient-to-b from-teal-400 to-teal-600 w-full h-full rounded-lg flex items-center justify-center text-2xl font-bold text-white">@</div>} />
            <AppIcon label="Kalender" icon={<div className="bg-white w-full h-full rounded-lg text-black flex flex-col items-center justify-center"><p className="text-red-600 text-[10px] font-bold">FEB</p><p className="text-xl -mt-1 font-bold">12</p></div>} />
            
            <AppIcon label="Chat" icon={<div className="bg-gradient-to-b from-cyan-400 to-cyan-600 w-full h-full rounded-lg flex items-center justify-center"><MessageSquare className="h-7 w-7 text-white" /></div>} />
            <AppIcon label="Kamera" isLargeIcon icon={<Image src="https://storage.googleapis.com/studioprompt-images/bada-camera-icon.png" width={48} height={48} alt="Camera" />} />
            <AppIcon label="Einstellungen" onClick={() => setCurrentPage(2)} icon={<BlueAppIcon Svg={Settings} />} />

            <AppIcon label="Facebook" isLargeIcon icon={<Image src="https://storage.googleapis.com/studioprompt-images/bada-facebook-icon.png" width={48} height={48} alt="Facebook" />} />
            <AppIcon label="Spiele" icon={<BlueAppIcon Svg={Gamepad2} />} />
            <AppIcon label="YouTube" isLargeIcon icon={<Image src="https://storage.googleapis.com/studioprompt-images/bada-youtube-icon.png" width={48} height={48} alt="YouTube" />} />

        </div>
    </div>
);

const SettingsMenu = ({ setCurrentPage }: { setCurrentPage: (page: number) => void }) => {
    const settingsItems = [
        { label: 'Flight Mode', icon: <Plane size={28} />, hasToggle: true },
        { label: 'Connectivity', icon: <div className="relative w-8 h-8"><Wifi className="absolute top-0 left-0 text-green-500" size={20}/><Bluetooth className="absolute bottom-0 right-0 text-blue-500" size={20}/></div>, hasToggle: false },
        { label: 'Sound profiles', icon: <Bell size={28} />, hasToggle: false },
        { label: 'Display & Brightness', icon: <Monitor size={28} />, hasToggle: false },
        { label: 'General', icon: <Settings size={28} />, hasToggle: false },
        { label: 'Date & Time', icon: <Clock size={28} />, hasToggle: false },
    ];
    return (
    <div className="h-full flex flex-col bg-[#F3F3F3] text-black text-sm">
        <div className="flex-shrink-0 bg-gradient-to-b from-blue-400 to-blue-600 text-white p-2.5 text-center font-bold text-lg shadow-sm">
            <p>Settings</p>
        </div>
        <div className="flex-grow p-2 space-y-1">
            {settingsItems.map(item => (
                <div key={item.label} className="flex items-center bg-white p-2 rounded-md border border-gray-300">
                    <div className="w-8 h-8 mr-3 flex items-center justify-center">{item.icon}</div>
                    <span className="flex-1 font-semibold">{item.label}</span>
                    {item.hasToggle && <div className="w-5 h-5 rounded-full bg-gray-300 border border-gray-400" />}
                </div>
            ))}
        </div>
        <div className="p-2 flex-shrink-0">
            <button onClick={() => setCurrentPage(1)} className="bg-gradient-to-b from-blue-500 to-blue-700 text-white font-bold py-1.5 px-4 rounded-md w-auto ml-auto block">
                Back
            </button>
        </div>
    </div>
)};


export default function BadaOsPage() {
  const [currentPage, setCurrentPage] = useState(0); // 0 for home, 1 for menu, 2 for settings
  const [isEditingWidgets, setIsEditingWidgets] = useState(false);
  const [isControlPanelOpen, setIsControlPanelOpen] = useState(false);

  return (
    <div className="bg-gray-200 min-h-screen flex items-center justify-center p-4 font-sans">
      <div className="w-[320px] h-[580px] bg-black rounded-[28px] shadow-2xl border-4 border-gray-400 flex flex-col relative overflow-hidden">
        {/* Phone Body & Bezel */}
        <div className="absolute inset-0 border-[12px] border-black rounded-[24px] pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-20 bg-gray-800 rounded-t-[18px] p-4 flex justify-center items-end">
            <div className="h-1.5 w-16 bg-gray-600 rounded-full"></div>
        </div>
        
        {/* Screen */}
        <div className="relative flex-1 flex flex-col bg-gray-800 mt-12 mb-1">
           {/* Wallpaper */}
           <Image
                src={isEditingWidgets ? "https://picsum.photos/320/580?blur=1" : "https://picsum.photos/320/580"}
                alt="Bada OS Wallpaper"
                fill
                className="z-0 object-cover transition-all duration-500"
                data-ai-hint={isEditingWidgets ? "galaxy nebula" : "green hill blue sky"}
            />
            <div className="absolute inset-0 bg-black/10 z-0" />

            {/* Header / Status Bar */}
            <div 
                className="h-6 flex-shrink-0 flex items-center justify-between px-3 text-white z-10 cursor-pointer"
                onClick={() => setIsControlPanelOpen(!isControlPanelOpen)}
            >
              <span className="font-bold text-xs">SAMSUNG</span>
              <div className="flex items-center gap-1.5 text-xs">
                <span>15:33</span>
                <Battery className="h-4 w-4" />
              </div>
            </div>

            {/* Control Panel */}
            <ControlPanel isOpen={isControlPanelOpen} />
          
          {/* Main Screen Content */}
          <div className="flex-1 overflow-y-auto z-10">
            {currentPage === 0 && (
                <div className="p-2 space-y-2 h-full">
                    {!isEditingWidgets ? (
                        <button onClick={() => setIsEditingWidgets(true)} className="bg-black/50 backdrop-blur-sm text-white text-sm font-semibold px-3 py-1 rounded-full">
                            Widget +
                        </button>
                    ) : (
                        <button onClick={() => setIsEditingWidgets(false)} className="bg-orange-500 text-white text-sm font-bold px-4 py-1 rounded-md shadow-lg">
                            Done
                        </button>
                    )}
                    {isEditingWidgets && (
                         <div className="pt-4 pl-2 space-y-4">
                            <CalendarWidget />
                            <LeafCalendarWidget />
                            <DigitalClockWidget />
                        </div>
                    )}
                </div>
            )}
            {currentPage === 1 && <AppMenu setCurrentPage={setCurrentPage} />}
            {currentPage === 2 && <SettingsMenu setCurrentPage={setCurrentPage} />}
          </div>

          {/* Dock */}
          {currentPage !== 2 && !isEditingWidgets ? (
            <div className="h-16 bg-black/40 backdrop-blur-md flex-shrink-0 grid grid-cols-4 items-center text-white text-xs font-semibold z-10">
                <button className="flex flex-col items-center justify-center" onClick={() => setCurrentPage(0)}>
                    <Home className="h-5 w-5 mb-1"/>
                </button>
                <button className="flex flex-col items-center justify-center">
                    <Phone className="h-5 w-5 mb-1"/>
                    <span>Keypad</span>
                </button>
                <Link href="/contacts" className="flex flex-col items-center justify-center">
                    <User className="h-5 w-5 mb-1"/>
                    <span>Contacts</span>
                </Link>
                <button className="flex flex-col items-center justify-center" onClick={() => setCurrentPage(1)}>
                    <MessageSquare className="h-5 w-5 mb-1"/>
                    <span>Message</span>
                </button>
            </div>
          ) : currentPage !== 2 && isEditingWidgets ? (
            <div className="h-40 bg-black/70 backdrop-blur-md flex-shrink-0 z-10 p-2 grid grid-cols-3 gap-y-2">
                <AppIcon label="Email sync" icon={<Image src="https://placehold.co/48x48.png" width={40} height={40} alt="Email" data-ai-hint="email icon" />} />
                <AppIcon label="Help" icon={<div className="w-10 h-10 bg-red-600 flex items-center justify-center rounded-lg text-2xl font-bold">?</div>} />
                <AppIcon label="Yahoo! Search" icon={<Image src="https://placehold.co/48x48/7B0099/FFFFFF?text=Y!&font=arial" width={40} height={40} alt="Yahoo" data-ai-hint="yahoo logo" className="rounded-lg"/>} />
                <AppIcon label="Network info" icon={<Wifi className="h-8 w-8 text-white" />} />
                <AppIcon label="Feeds..pdates" icon={<Rss className="h-8 w-8 text-white" />} />
                <AppIcon label="Samsung Apps" icon={<div className="w-10 h-10 bg-blue-500 flex items-center justify-center rounded-lg text-white font-bold text-xs">S</div>} />
            </div>
          ) : null}
        </div>
         {/* Physical Buttons */}
        <div className="h-16 flex-shrink-0 bg-gray-100 flex items-center justify-center gap-6 rounded-b-[24px]">
            <div className="w-10 h-6 bg-gray-200 border-b-2 border-gray-400 rounded-sm"></div>
            <div className="w-10 h-10 bg-gray-200 border-2 border-gray-400 rounded-lg"></div>
            <div className="w-10 h-6 bg-gray-200 border-b-2 border-gray-400 rounded-sm"></div>
        </div>
      </div>
    </div>
  );
}
