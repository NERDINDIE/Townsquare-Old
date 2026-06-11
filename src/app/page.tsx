

'use client';

import { useState, useEffect } from 'react';
import MagazineHome from './home-magazine/page';
import TabloidHome from './home-tabloid/page';
import BroadsheetHome from './home-broadsheet/page';
import DashboardHome from './home-dashboard/page';
import ManuscriptHome from './home-manuscript/page';
import WidgetsHome from './home-widgets/page';
import Y2kHome from './home-y2k/page';
import KeitaiHome from './home-keitai/page';
import GovernmentOSPage from './government-os/page';
import BadaOsPage from './bada-os/page';
import PhoneScreenPage from './phone-screen/page';
import SymbianMenuPage from './symbian-menu/page';
import AndroidOnePage from './android-one/page';

export default function HomePage() {
  const [layout, setLayout] = useState<string | null>(null);

  useEffect(() => {
    const storedLayout = localStorage.getItem('layout') || 'dashboard';
    setLayout(storedLayout);

    const handleStorageChange = () => {
      const newLayout = localStorage.getItem('layout') || 'dashboard';
      setLayout(newLayout);
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  if (layout === null) {
    return <div className="h-screen w-screen" />;
  }
  
  const layoutMap: { [key: string]: React.ComponentType } = {
    magazine: MagazineHome,
    tabloid: TabloidHome,
    broadsheet: BroadsheetHome,
    dashboard: DashboardHome,
    uncial: ManuscriptHome,
    widgets: WidgetsHome,
    y2k: Y2kHome,
    keitai: KeitaiHome,
    'bada-os': BadaOsPage,
    ios7: PhoneScreenPage,
    symbian: SymbianMenuPage,
    'android-one': AndroidOnePage,
    'government-os': GovernmentOSPage,
  };

  const ComponentToRender = layoutMap[layout] || DashboardHome;

  return <ComponentToRender />;
}
