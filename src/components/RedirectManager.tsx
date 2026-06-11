
'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getCookie, setCookie } from 'cookies-next';

export function RedirectManager({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [authBypass, setAuthBypass] = useState<boolean | undefined>(undefined);

    useEffect(() => {
        const bypass = localStorage.getItem('dev_auth_bypass') === 'true';
        setAuthBypass(bypass);
        setCookie('dev_auth_bypass', bypass.toString());

        const handleStorageChange = () => {
             const updatedBypass = localStorage.getItem('dev_auth_bypass') === 'true';
             if (authBypass !== updatedBypass) {
                setAuthBypass(updatedBypass);
                setCookie('dev_auth_bypass', updatedBypass.toString());
                // Refresh the page to re-trigger middleware with the new cookie value
                router.refresh();
             }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);

    }, [authBypass, router]);

    // The primary auth redirection is now handled by middleware.
    // This component now primarily syncs the dev bypass flag.
    // We can keep it in case we need other client-side-only routing logic in the future.

    return <>{children}</>;
}
