
import type { User } from '@/lib/bulletin-board-data';

export interface Neighbourhood {
    name: string;
    slug: string;
    description: string;
    image: string;
    dataAiHint: string;
    userHandles: string[];
}

export const neighbourhoods: Neighbourhood[] = [
    {
        name: 'The Park',
        slug: 'the-park',
        description: 'For discussions about hobbies, sports, and recreation.',
        image: 'https://placehold.co/400x400.png',
        dataAiHint: 'city park sunny day',
        userHandles: ['sportsfan99', 'gardenguru'],
    },
    {
        name: 'The Cafe',
        slug: 'the-cafe',
        description: 'A cozy corner for casual chats, local recommendations, and coffee.',
        image: 'https://placehold.co/400x400.png',
        dataAiHint: 'cozy cafe interior',
        userHandles: ['coffeelover88'],
    },
    {
        name: 'The Beach',
        slug: 'the-beach',
        description: 'Sun, sand, and surf. Share your beach day stories and seaside finds.',
        image: 'https://placehold.co/400x400.png',
        dataAiHint: 'beach waves sand',
        userHandles: ['beachcomber77'],
    },
    {
        name: 'The Bazaar',
        slug: 'the-bazaar',
        description: 'A marketplace of ideas, handmade goods, and hidden treasures.',
        image: 'https://placehold.co/400x400.png',
        dataAiHint: 'market stall bazaar',
        userHandles: ['marketmaven'],
    },
    {
        name: 'Museum',
        slug: 'museum',
        description: 'Art, history, and culture. Discuss your favorite exhibits.',
        image: 'https://placehold.co/400x400.png',
        dataAiHint: 'museum interior',
        userHandles: ['historybuff'],
    },
    {
        name: 'Flea Market',
        slug: 'flea-market',
        description: 'Share your best secondhand finds and vintage treasures.',
        image: 'https://placehold.co/400x400.png',
        dataAiHint: 'flea market stall',
        userHandles: ['thriftyfinds'],
    },
];

export const neighbourhoodPosts: User[] = [
    {
        handle: 'sportsfan99',
        name: 'SportsFan99',
        avatar: 'https://github.com/randomuser-sf.png',
        fallback: 'SF',
        posts: [
            {
                id: 'sf1',
                time: '1h ago',
                content: 'Great game last night! The Townies really pulled through in the final quarter. Anyone else catch that incredible final shot?',
                likes: 12,
                comments: 3,
            }
        ]
    },
    {
        handle: 'gardenguru',
        name: 'GardenGuru',
        avatar: 'https://github.com/randomuser-gg.png',
        fallback: 'GG',
        posts: [
            {
                id: 'gg1',
                time: '3h ago',
                content: 'My tomatoes are finally ripening! Thinking of making a big batch of sauce this weekend. Any tips for getting the perfect flavor?',
                image: 'https://placehold.co/1200x800.png',
                dataAiHint: 'ripe tomatoes garden',
                likes: 8,
                comments: 5,
            }
        ]
    },
    {
        handle: 'coffeelover88',
        name: 'CoffeeLover88',
        avatar: 'https://github.com/randomuser-cl.png',
        fallback: 'CL',
        posts: [
            {
                id: 'cl1',
                time: '5h ago',
                content: 'Just tried the new seasonal latte at The Daily Grind. Highly recommend! It has hints of cardamom and orange. Perfect for a chilly morning.',
                likes: 15,
                comments: 6,
            }
        ]
    },
    {
        handle: 'beachcomber77',
        name: 'Beachcomber77',
        avatar: 'https://github.com/randomuser-bc.png',
        fallback: 'BC',
        posts: [
            {
                id: 'bc1',
                time: '2h ago',
                content: 'Perfect day at the beach today! Water was amazing. Found this beautiful piece of sea glass.',
                image: 'https://placehold.co/1200x800.png',
                dataAiHint: 'sea glass beach',
                likes: 21,
                comments: 4,
            }
        ]
    },
    {
        handle: 'marketmaven',
        name: 'MarketMaven',
        avatar: 'https://github.com/randomuser-mm.png',
        fallback: 'MM',
        posts: [
            {
                id: 'mm1',
                time: '6h ago',
                content: 'The weekend bazaar is bustling! So many incredible handcrafted goods. I picked up this amazing ceramic mug.',
                image: 'https://placehold.co/1200x800.png',
                dataAiHint: 'ceramic mug handmade',
                likes: 34,
                comments: 8,
            }
        ]
    },
    {
        handle: 'historybuff',
        name: 'HistoryBuff',
        avatar: 'https://github.com/randomuser-hb.png',
        fallback: 'HB',
        posts: [
            {
                id: 'hb1',
                time: '4h ago',
                content: 'The new exhibit on ancient civilizations at the City Museum is a must-see! The artifacts are incredibly well-preserved.',
                image: 'https://placehold.co/1200x800.png',
                dataAiHint: 'ancient artifacts museum',
                likes: 28,
                comments: 7,
            }
        ]
    },
    {
        handle: 'thriftyfinds',
        name: 'ThriftyFinds',
        avatar: 'https://github.com/randomuser-tf.png',
        fallback: 'TF',
        posts: [
            {
                id: 'tf1',
                time: '7h ago',
                content: 'Scored this amazing vintage lamp at the flea market today for only $10! It just needed a little bit of polish.',
                image: 'https://placehold.co/1200x800.png',
                dataAiHint: 'vintage lamp',
                likes: 41,
                comments: 11,
            }
        ]
    }
]
