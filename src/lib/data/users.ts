
import type { User } from '@/lib/bulletin-board-data';

export const normalUsers: User[] = [
     {
        handle: 'futuregazer',
        name: 'FutureGazer',
        avatar: 'https://github.com/randomuser4.png',
        fallback: 'FG',
        posts: [
            {
                id: 'fg1',
                time: '3h ago',
                content: 'breathtaking progress',
                image: 'https://placehold.co/1200x800.png',
                dataAiHint: 'tech chart',
                likes: 14,
                comments: 1,
            }
        ]
    },
    {
        handle: 'nostalgianow',
        name: 'NostalgiaNow',
        avatar: 'https://github.com/randomuser5.png',
        fallback: 'NN',
        posts: [
            {
                id: 'nn1',
                time: '1d ago',
                content: "Brought a CRACKED or MAD magazine to class...? Hero status,,, Rocked your metal lunchbox or your Lisa Frank Trapper Keeper...? Hard flex! \nHad a Snarf pencil topper... get ready to be made fun of! 😂🤣",
                images: [
                    { src: 'https://placehold.co/300x300.png', hint: 'vintage fashion' },
                    { src: 'https://placehold.co/300x300.png', hint: 'vintage backpack' },
                    { src: 'https://placehold.co/300x300.png', hint: 'vintage stationery' },
                ],
                likes: 56,
                comments: 12,
            }
        ]
    },
    {
        handle: 'bookclub-host',
        name: 'Book Club',
        avatar: 'https://github.com/randomuser4.png',
        fallback: 'BC',
        posts: [
             {
                id: 'bc1',
                time: '2 days ago',
                content: 'Hey everyone!',
                likes: 5,
                comments: 0
            },
            {
                id: 'bc2',
                time: '2 days ago',
                content: 'Don\'t forget, we\'re discussing "The Midnight Library" this Friday!',
                likes: 12,
                comments: 4
            },
        ]
    }
];
