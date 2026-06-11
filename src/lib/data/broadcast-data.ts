
export const initialLiveChannels = [
    { name: 'Townsquare News', program: 'The Evening Report', image: 'https://placehold.co/1280x720/1E3A8A/FFFFFF.png', dataAiHint: 'news studio set', time: '06:00 ~', viewers: '2.4万' },
    { name: 'TSN Special', program: 'Documentary: The Urban Jungle', image: 'https://placehold.co/1280x720/166534/FFFFFF.png', dataAiHint: 'city documentary still', time: '06:00 ~', viewers: '1.8万'  },
    { name: 'TSN Special 2', program: 'Live Concert: The Wanderers', image: 'https://placehold.co/1280x720/991B1B/FFFFFF.png', dataAiHint: 'live music concert', time: '06:00 ~', viewers: '3.1万'  },
    { name: 'Action Movies', program: 'Midnight Explosions', image: 'https://placehold.co/1280x720/CA8A04/FFFFFF.png', dataAiHint: 'action movie explosion', time: '06:00 ~', viewers: '1.2万'  },
];

export const stations = [
    { name: 'National One', image: 'https://placehold.co/100x100.png', dataAiHint: 'radio host portrait' },
    { name: 'City FM', image: 'https://placehold.co/100x100.png', dataAiHint: 'radio host portrait' },
    { name: 'Classical', image: 'https://placehold.co/100x100.png', dataAiHint: 'orchestra conductor' },
    { name: 'The Beat', image: 'https://placehold.co/100x100.png', dataAiHint: 'dj at turntable' },
    { name: 'News Now', image: 'https://placehold.co/100x100.png', dataAiHint: 'news anchor' },
    { name: 'Talk Radio', image: 'https://placehold.co/100x100.png', dataAiHint: 'person speaking' },
];

export const continueListening = [
    { title: 'Daily News Briefing', episode: 'A New Era in Space Exploration', image: 'https://placehold.co/300x300.png', dataAiHint: 'podcast logo', progress: 40, link: '/player' },
    { title: 'TechTalk Weekly', episode: 'The Future of AI', image: 'https://placehold.co/300x300.png', dataAiHint: 'tech podcast cover', progress: 75, link: '/player' },
    { title: 'History Uncovered', episode: 'The Secrets of Ancient Rome', image: 'https://placehold.co/300x300.png', dataAiHint: 'history podcast art', progress: 10, link: '/player' },
];

export const featuredPodcasts = [
    { title: 'Daily News Briefing', creator: 'Townsquare Audio', image: 'https://placehold.co/300x300.png', dataAiHint: 'news podcast logo' },
    { title: 'TechTalk Weekly', creator: 'Future of Tech', image: 'https://placehold.co/300x300.png', dataAiHint: 'tech podcast cover' },
    { title: 'History Uncovered', creator: 'Past Times', image: 'https://placehold.co/300x300.png', dataAiHint: 'history podcast art' },
    { title: 'Comedy Hour', creator: 'Laugh Tracks', image: 'https://placehold.co/300x300.png', dataAiHint: 'comedy podcast design' },
    { title: 'The Storyteller', creator: 'Fictional Tales', image: 'https://placehold.co/300x300.png', dataAiHint: 'fantasy podcast art' },
];

export const onDemandContent = [
    { 
        category: 'Recommended Movies',
        items: [
            { title: 'Ghostbusters: Frozen Empire', image: 'https://placehold.co/400x600/1E3A8A/FFFFFF.png', dataAiHint: 'sci-fi action movie poster', isTop10: true },
            { title: 'The Addams Family', image: 'https://placehold.co/400x600/374151/FFFFFF.png', dataAiHint: 'animated family movie poster' },
            { title: 'Murder Drones', image: 'https://placehold.co/400x600/4B0082/FFFFFF.png', dataAiHint: 'sci-fi horror poster' },
            { title: 'Kolonya Cumhuriyeti', image: 'https://placehold.co/400x600/F59E0B/FFFFFF.png', dataAiHint: 'turkish comedy movie' },
        ]
    },
    { 
        category: 'Top Movies',
        items: [
            { title: '1984', image: 'https://placehold.co/400x600/450A0A/FFFFFF.png', dataAiHint: 'dystopian movie poster' },
            { title: 'Bizans Oyunlari', image: 'https://placehold.co/400x600/FACC15/000000.png', dataAiHint: 'turkish historical comedy' },
            { title: 'Look Back', image: 'https://placehold.co/400x600/BFDBFE/000000.png', dataAiHint: 'anime manga cover' },
            { title: 'Kardeş Takımı', image: 'https://placehold.co/400x600/38BDF8/000000.png', dataAiHint: 'family movie poster' },
        ]
    },
    { 
        category: 'Continue Watching',
        items: [
            { title: 'Magilumiere', image: 'https://placehold.co/400x225/A855F7/FFFFFF.png', dataAiHint: 'magical girl anime' },
            { title: 'The Boys', image: 'https://placehold.co/400x225/DC2626/FFFFFF.png', dataAiHint: 'superhero dark comedy' },
        ]
    }
]
