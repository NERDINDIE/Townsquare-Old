
import { Rss, Youtube, Music, Book } from "@/components/icons";

export interface Feed {
    id: number;
    name: string;
    url: string;
}

export const initialFeeds: Feed[] = [
    { id: 1, name: 'My Personal Blog', url: 'https://myblog.example.com/rss' },
    { id: 2, name: 'Company News', url: 'https://company.com/news/feed' },
];

export const services = [
    {
        name: 'RSS Feeds',
        description: 'Connect any RSS feed to bring in content from other sources.',
        icon: <Rss className="h-8 w-8 text-orange-500" />,
        connected: true,
        href: '/connections/rss',
        buttonText: 'Manage Feeds',
    },
    {
        name: 'YouTube',
        description: 'Connect your YouTube account to import videos and subscriptions.',
        icon: <Youtube className="h-8 w-8 text-red-600" />,
        connected: false,
        buttonText: 'Connect',
    },
    {
        name: 'Music Service',
        description: 'Connect your preferred music service to sync playlists and podcasts.',
        icon: <Music className="h-8 w-8 text-green-500" />,
        connected: true,
        buttonText: 'Disconnect',
    },
    {
        name: 'Book Service',
        description: 'Connect your book service account to manage your library.',
        icon: <Book className="h-8 w-8 text-blue-500" />,
        connected: false,
        buttonText: 'Connect',
    },
];
