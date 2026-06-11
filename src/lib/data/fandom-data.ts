

export const columnists = [
    {
        name: 'Kaito "Dense" Tanaka',
        title: "Kaito's Korner",
        image: 'https://placehold.co/150x150.png',
        dataAiHint: 'anime protagonist portrait',
        content: "I don't really get what all the fuss is about. The other day, five different girls from my class gave me handmade lunchboxes. They were all delicious! Then they all got into a huge argument for some reason. I just wanted to finish my homework. It's all so confusing. I wish things were simpler, like in my favorite mecha anime."
    },
    {
        name: 'Luna "Sparkle" Starling',
        title: "A Whirlwind of Whimsy",
        image: 'https://placehold.co/150x150.png',
        dataAiHint: 'manic pixie dream girl portrait',
        content: "Life is too short for boring shoes and sensible bedtimes! Yesterday, I convinced the quiet boy in my class to skip school and chase pigeons in the park. He looked so serious at first, but you should have seen his smile! We have to embrace the beautiful chaos, people! Don't just walk—dance through life's rainstorms!"
    },
    {
        name: 'Akari "Childhood Friend" Ito',
        title: "Just Sayin'",
        image: 'https://placehold.co/150x150.png',
        dataAiHint: 'childhood friend anime portrait',
        content: "It's just... frustrating, you know? You've known someone your whole life. You wake him up for school, you patch up his scrapes, you know his favorite food. And then some new girl with weird hair shows up, and suddenly he doesn't see you anymore. I just wish he'd notice. Is that too much to ask? I'll still make him his lunch tomorrow, though."
    },
    {
        name: 'Alexandre "Gorgeous" de la Croix',
        title: "A Foreign Perspective",
        image: 'https://placehold.co/150x150.png',
        dataAiHint: 'handsome foreigner anime portrait',
        content: "Ah, this country is so wonderfully quaint! The customs, the traditions, they are so... interesting. The young ladies here are particularly charming, though they seem to become quite flustered when I kiss their hand. Is this not a common greeting? In my country, it is a simple courtesy. Perhaps I have much to learn, and... to teach. *winks*"
    },
    {
        name: 'Kenji Tanaka',
        title: 'Tech Analyst',
        image: 'https://placehold.co/150x150.png',
        dataAiHint: 'tech analyst portrait',
        content: 'The Future of Personal AI in a Post-Smartphone World.'
    },
    {
        name: 'Yumi Sato',
        title: 'Cultural Critic',
        image: 'https://placehold.co/150x150.png',
        dataAiHint: 'cultural critic portrait',
        content: 'How Retro Aesthetics Are Shaping Modern Youth Fashion.'
    },
];

export const feedItems = [
    {
        publication: { name: 'Ajans', slug: 'ajans', avatar: 'https://placehold.co/100x100/1E40AF/FFFFFF?text=A' },
        time: 'birkaç saniye önce',
        content: 'Küresel Sumud Filosu, yaklaşık 20 tekne ve 300 aktivistle beraber kuşatma altındaki Gazze\'ye yönelik ablukanın kırılması amacıyla İspanya\'nın Barselona kentinden Gazze\'ye doğru yola çıktı.',
        images: [
            { src: 'https://placehold.co/400x300.png', hint: 'fleet of boats sea' },
            { src: 'https://placehold.co/400x300.png', hint: 'activists on boat' }
        ],
        upvotes: 2,
        downvotes: 0,
        comments: 0
    },
    {
        publication: { name: 'Ajans', slug: 'ajans', avatar: 'https://placehold.co/100x100/1E40AF/FFFFFF?text=A' },
        time: '4 dakika önce',
        content: 'Adalet Bakanı Yılmaz Tunç: "Af anlamına gelecek herhangi bir çalışmamız söz konusu değil."',
        images: [],
        upvotes: 10,
        downvotes: 2,
        comments: 5
    },
    {
        publication: { name: 'Aposto Gündem', slug: 'aposto-gundem', avatar: 'https://placehold.co/100x100/FBBF24/000000?text=A' },
        time: '1 day ago',
        content: 'Kongrelere iptal, voleybolda yarı final. İstanbul\'un beş ilçesinde seçim kurulu, CHP\'nin hazırlıkları devam eden kongrelerini "tedbiren" durdurma kararı aldı. Filenin Sultanları, 2025 FIVB Dünya Şampiyonası\'nda ABD\'yi 3-1 yenerek yarı finale yükseldi.',
        images: [],
        upvotes: 152,
        downvotes: 12,
        comments: 34
    }
];

export const publications: Record<string, any> = {
    'aposto-gundem': {
        name: 'Aposto Gündem',
        slug: 'aposto-gundem',
        logo: 'A',
        headerImage: 'https://picsum.photos/800/400',
        description: 'Her sabah 06.30\'da 5 dakikalık gündem özeti e-posta kutunda. Piyasalar, ekonomi, iş dünyası, politika, teknoloji ve hafta sonu ekleri; kısa, yalın, öz bir şekilde.',
        articles: [
             {
                id: 1,
                time: '1 day ago',
                isSponsored: true,
                title: 'Kongrelere iptal, voleybolda yarı final',
                summary: 'İstanbul\'un beş ilçesinde seçim kurulu, CHP\'nin hazırlıkları devam eden kongrelerini "tedbiren" durdurma kararı aldı. Filenin Sultanları, 2025 FIVB Dünya Şampiyonası\'nda ABD\'yi 3-1 yenerek yarı finale yükseldi.',
                sponsor: 'Together with Yapı Kredi',
                storyCount: '5 stories'
            },
            {
                id: 2,
                time: '2 days ago',
                isSponsored: false,
                title: 'Putin\'den davet, Tekin\'den savunma',
                summary: 'Cumhurbaşkanı Erdoğan, Rusya Devlet Başkanı Putin\'in davetine icabetle günübirlik çalışma ziyareti için Soçi\'ye gidecek. Milli Eğitim Bakanı Yusuf Tekin, müfredat değişikliği ve karma eğitim tartışmalarına ilişkin açıklamalarda bulundu.',
                storyCount: '8 stories'
            }
        ]
    },
    'ajans': {
        name: 'Ajans',
        slug: 'ajans',
        logo: 'A',
        headerImage: 'https://picsum.photos/800/400?grayscale',
        description: 'The latest news from our wire service.',
        articles: [
             {
                id: 3,
                time: 'Just now',
                isSponsored: false,
                title: 'Küresel Sumud Filosu Gazze\'ye doğru yola çıktı',
                summary: 'Küresel Sumud Filosu, yaklaşık 20 tekne ve 300 aktivistle beraber kuşatma altındaki Gazze\'ye yönelik ablukanın kırılması amacıyla İspanya\'nın Barselona kentinden Gazze\'ye doğru yola çıktı.',
                storyCount: '2 stories'
            },
        ]
    }
}
