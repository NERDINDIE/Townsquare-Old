
'use client';

import { useTabs } from "@/context/tab-context";
import { useRouter } from "next/navigation";

interface TabLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    href: string;
    title: string;
    children: React.ReactNode;
}

export function TabLink({ href, title, children, ...props }: TabLinkProps) {
    const { addTab, setActiveTab, tabs } = useTabs();
    const router = useRouter();

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        
        const existingTab = tabs.find(tab => tab.path === href);
        
        if (existingTab) {
            setActiveTab(existingTab);
        } else {
            const newTab = {
                id: Date.now().toString(),
                title: title,
                path: href,
            };
            addTab(newTab);
        }
        router.push(href);
    };

    return (
        <a href={href} onClick={handleClick} {...props}>
            {children}
        </a>
    );
}
