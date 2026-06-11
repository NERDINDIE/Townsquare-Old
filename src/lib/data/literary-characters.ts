
import type { User } from '@/lib/bulletin-board-data';

export const literaryCharacters: User[] = [
    {
        handle: 'isekai-hero-kaito',
        name: 'Kaito Tanaka',
        avatar: 'https://placehold.co/100x100/3B82F6/FFFFFF?text=KT',
        fallback: 'KT',
        posts: [
            {
                id: 'kaito1',
                time: '2d ago',
                content: "Ugh, another quest from the Adventurer's Guild. Slay 10 slimes. Don't they know I'm the prophesied hero destined to defeat the Demon Lord? I miss convenience stores.",
                likes: 42,
                comments: 8,
            },
            {
                id: 'kaito2',
                time: '5d ago',
                content: "Found a legendary sword in a cave today! It talks. A lot. Mostly about the good old days. Still, +50 to attack is pretty sweet.",
                image: 'https://placehold.co/1200x800.png',
                dataAiHint: 'glowing sword fantasy',
                likes: 120,
                comments: 25,
            }
        ]
    },
    {
        handle: 'demon-lord-valerius',
        name: 'Valerius, the Shadowed King',
        avatar: 'https://placehold.co/100x100/7B1FA2/FFFFFF?text=V',
        fallback: 'V',
        posts: [
            {
                id: 'valerius1',
                time: '1d ago',
                content: "My four generals are incompetent. Is it so hard to conquer a single human kingdom? I have to do everything myself. The paperwork for this dark army is also a nightmare.",
                likes: 15,
                comments: 3,
            }
        ]
    },
    {
        handle: 'alchemist-lina',
        name: 'Lina the Alchemist',
        avatar: 'https://placehold.co/100x100/00796B/FFFFFF?text=L',
        fallback: 'L',
        posts: [
            {
                id: 'lina1',
                time: '8h ago',
                content: "Just perfected my new high-grade mana potion! The color is a bit... explosive, but it packs a punch. Now, if only the price of mandrake root would go down.",
                likes: 33,
                comments: 11,
            }
        ]
    },
    {
        handle: 'bigbrother',
        name: 'Big Brother',
        avatar: '',
        fallback: 'BB',
        posts: [
            {
                id: 'bb1',
                time: 'ALWAYS',
                content: 'WAR IS PEACE. FREEDOM IS SLAVERY. IGNORANCE IS STRENGTH. YOUR VIGILANCE IS NOTED. YOUR COMPLIANCE IS EXPECTED.',
                likes: 999,
                comments: 0,
            },
            {
                id: 'bb2',
                time: 'CONSTANTLY',
                content: 'BIG BROTHER IS WATCHING YOU.',
                likes: 999,
                comments: 0,
            }
        ]
    },
    {
        handle: 'squealer',
        name: 'Squealer',
        avatar: 'https://placehold.co/100x100/FFC107/424242?text=SQ',
        fallback: 'SQ',
        posts: [
            {
                id: 'sq1',
                time: '1h ago',
                content: 'Comrades! A glorious announcement! Thanks to the brilliant leadership of Comrade Napoleon, milk and apple production has increased by 200%! A truly plusgood achievement! Let us rejoice in our prosperity!',
                likes: 18,
                comments: 3,
                location: { name: 'The Barn', lat: 75, lng: 50 },
            },
            {
                id: 'sq2',
                time: '6h ago',
                content: 'It has been proven by Science, comrades, that we pigs must consume the milk and apples. It is for YOUR sake that we drink that milk and eat those apples. Do you want Jones to come back?',
                likes: 25,
                comments: 7,
            }
        ]
    },
    {
        handle: 'charrington',
        name: 'Mr. Charrington',
        avatar: 'https://placehold.co/100x100/8B4513/FFFFFF?text=C',
        fallback: 'C',
        posts: [
            {
                id: 'ch1',
                time: '4h ago',
                content: 'Just acquired a lovely little paperweight with a bit of coral inside. A beautiful, useless thing from a bygone era. They don’t make them like they used to. Do they?',
                image: 'https://placehold.co/1200x800.png',
                dataAiHint: 'glass paperweight antique',
                likes: 5,
                comments: 2,
                location: { name: 'Antique Shop', lat: 60, lng: 25 },
            },
            {
                id: 'ch2',
                time: '3d ago',
                content: 'The room above my little shop is for rent. Very private. Very quiet. Perfect for someone seeking a place away from the prying eyes of the telescreens.',
                likes: 3,
                comments: 1,
            }
        ]
    },
    {
        handle: 'obrien',
        name: 'O\'Brien',
        avatar: 'https://github.com/randomuser-ob.png',
        fallback: 'OB',
        posts: [
            {
                id: 'ob1',
                time: '8h ago',
                content: 'Reality is not external. Reality exists in the human mind, and nowhere else. What truly matters is not what is, but what the Party says is. Have you considered the malleability of your own memory?',
                likes: 10,
                comments: 2,
            },
            {
                id: 'ob2',
                time: '2d ago',
                content: 'If you want a picture of the future, imagine a boot stamping on a human face—for ever.',
                likes: 15,
                comments: 5,
            }
        ]
    },
    {
        handle: 'napoleon',
        name: 'Napoleon',
        avatar: 'https://placehold.co/100x100/E91E63/FFFFFF?text=N',
        fallback: 'N',
        posts: [
            {
                id: 'na1',
                time: '1d ago',
                content: 'A decree: The Windmill shall be named Napoleon Mill. All animals will attend a special demonstration of loyalty tomorrow morning. Work will be voluntary, but rations will be reduced for those who abstain. LONG LIVE ANIMAL FARM!',
                likes: 35,
                comments: 8,
            },
             {
                id: 'na2',
                time: '5d ago',
                content: 'All animals are equal, but some animals are more equal than others.',
                likes: 42,
                comments: 11,
            }
        ]
    },
    {
        handle: 'snowball',
        name: 'Snowball',
        avatar: 'https://placehold.co/100x100/2196F3/FFFFFF?text=S',
        fallback: 'S',
        posts: [
            {
                id: 'sn1',
                time: '2d ago',
                content: 'Do not believe the lies of the pigs! The revolution has been betrayed! The principles of Animalism are being trampled underfoot. Comrades, the struggle for a truly equal society is not over. Remember the Seven Commandments!',
                likes: 22,
                comments: 15,
            },
            {
                id: 'sn2',
                time: '6d ago',
                content: 'The plans for the windmill are proceeding on schedule! This will bring electricity to every stall, a three-day work week, and prosperity for all. The future is bright, comrades!',
                image: 'https://placehold.co/1200x800.png',
                dataAiHint: 'windmill blueprint sketch',
                likes: 31,
                comments: 9,
                location: { name: 'Windmill Site', lat: 20, lng: 70 },
            }
        ]
    },
    {
        handle: 'mr-jones',
        name: 'Mr. Jones',
        avatar: 'https://placehold.co/100x100/4E342E/FFFFFF?text=J',
        fallback: 'J',
        posts: [
            {
                id: 'jones1',
                time: '8d ago',
                content: 'My own animals... my Manor Farm... taken from me. They drove me out! It\'s unnatural. They\'ll starve without me, mark my words. I\'ll be back.',
                likes: 2,
                comments: 1,
            },
        ]
    },
    {
        handle: 'mr-pilkington',
        name: 'Mr. Pilkington',
        avatar: 'https://placehold.co/100x100/78909C/FFFFFF?text=P',
        fallback: 'P',
        posts: [
            {
                id: 'pilkington1',
                time: '7d ago',
                content: "Heard the most peculiar thing from Jones' farm. Animals running the place themselves? Preposterous! Sounds like it'll all go to ruin. More concerned with my fishing than with some animal rebellion.",
                likes: 5,
                comments: 2,
            },
        ]
    },
    {
        handle: 'mr-frederick',
        name: 'Mr. Frederick',
        avatar: 'https://placehold.co/100x100/A1887F/FFFFFF?text=F',
        fallback: 'F',
        posts: [
            {
                id: 'frederick1',
                time: '6d ago',
                content: "Animals in charge? Rubbish. This is some ploy by Pilkington. I'll not be taken for a fool. I hear they're starving over there. Might be an opportunity to pick up some land on the cheap.",
                likes: 3,
                comments: 1,
            },
        ]
    },
    {
        handle: 'mr-whymper',
        name: 'Mr. Whymper',
        avatar: 'https://placehold.co/100x100/BDBDBD/000000?text=W',
        fallback: 'W',
        posts: [
            {
                id: 'whymper1',
                time: '3d ago',
                content: "Concluded my first business transaction with Animal Farm today. A peculiar client, to be sure, but their money is good. Business is business, after all, regardless of who is in charge.",
                likes: 1,
                comments: 0,
            },
        ]
    },
    {
        handle: 'hrothgar',
        name: 'Hrothgar',
        avatar: 'https://placehold.co/100x100/D4AF37/000000?text=H',
        fallback: 'H',
        posts: [
            {
                id: 'hr1',
                time: '1h ago',
                content: 'Another night of sorrow in Heorot. The laughter has fled, the benches are stained. This fiend Grendel will be the death of us all. Where is the hero who will deliver us from this shadow-stalker?',
                likes: 5,
                comments: 3,
            },
            {
                id: 'hr2',
                time: '12h ago',
                content: 'The great mead-hall stands empty. The songs of the scops are silenced. My heart is heavy with the weight of twelve winters of grief. May the Almighty grant us a savior.',
                likes: 8,
                comments: 2,
            }
        ]
    },
    {
        handle: 'beowulf',
        name: 'Beowulf',
        avatar: 'https://placehold.co/100x100/CD5C5C/FFFFFF?text=B',
        fallback: 'B',
        posts: [
            {
                id: 'beo1',
                time: '2h ago',
                content: 'I have heard the tales of your monster. Hygelac is my kinsman and my king. I have come to purge this evil from your hall. My bare hands will be enough.',
                likes: 30,
                comments: 10,
            },
            {
                id: 'beo2',
                time: '1d ago',
                content: 'The sea-road was long, but my spirit is strong. I have battled sea-beasts and giants. This Grendel is but another foe to fall before the might of the Geats. Tonight, Heorot will be cleansed.',
                likes: 45,
                comments: 15,
            }
        ]
    },
    {
        handle: 'grendel',
        name: 'Grendel',
        avatar: 'https://placehold.co/100x100/000000/999999?text=G',
        fallback: 'G',
        posts: [
            {
                id: 'gr1',
                time: '3h ago',
                content: 'RAAAARGH! NOISY MEN! Their happy sounds burn my ears. I will feast on their bones tonight. The hall will be quiet again. Quiet and dark.',
                likes: 0,
                comments: 1,
            }
        ]
    },
    {
        handle: 'grendels_mom',
        name: 'Grendel\'s Mother',
        avatar: 'https://placehold.co/100x100/006400/FFFFFF?text=M',
        fallback: 'M',
        posts: [
            {
                id: 'gm1',
                time: '1h ago',
                content: 'My boy... my poor boy. They have taken him from me. The shiny hall will pay. Their hero will know the sorrow of the mere. I will have my revenge.',
                likes: 0,
                comments: 0,
            }
        ]
    },
    {
        handle: 'unferth',
        name: 'Unferth',
        avatar: 'https://placehold.co/100x100/808080/FFFFFF?text=U',
        fallback: 'U',
        posts: [
            {
                id: 'un1',
                time: '2h ago',
                content: 'Are you the same Beowulf who lost a swimming match to Breca? You were rash then, and you are rash now. Grendel will make short work of your boasting.',
                likes: 2,
                comments: 8,
            }
        ]
    },
    {
        handle: 'pierre-bezukhov',
        name: 'Pierre Bezukhov',
        avatar: 'https://placehold.co/100x100/795548/FFFFFF?text=PB',
        fallback: 'PB',
        posts: [
            {
                id: 'pb1',
                time: 'July 18, 1805',
                content: "Attended Anna Pavlovna's soirée. So much talk of Napoleon, is he Antichrist or a great man? I feel lost in these conversations. There must be a higher purpose to all this, a simpler truth. But where to find it?",
                likes: 4,
                comments: 2,
                location: { name: "Anna Pavlovna's Salon", lat: 30, lng: 60 }
            }
        ]
    },
    {
        handle: 'natasha-rostova',
        name: 'Natasha Rostova',
        avatar: 'https://placehold.co/100x100/E91E63/FFFFFF?text=NR',
        fallback: 'NR',
        posts: [
            {
                id: 'nr1',
                time: 'July 20, 1805',
                content: 'The most wonderful evening! I danced with the handsome Prince Andrei, and he said such lovely things! My heart is all aflutter. Is this what it feels like to be in love?',
                likes: 15,
                comments: 6,
            }
        ]
    },
    {
        handle: 'andrei-bolkonsky',
        name: 'Andrei Bolkonsky',
        avatar: 'https://placehold.co/100x100/607D8B/FFFFFF?text=AB',
        fallback: 'AB',
        posts: [
            {
                id: 'ab1',
                time: 'July 25, 1805',
                content: "I am weary of this empty society, this endless parade of trivialities. I must leave for the army. Perhaps on the battlefield, under the great canopy of the sky at Austerlitz, I will find something real, something worth living or dying for.",
                likes: 8,
                comments: 1,
            }
        ]
    },
    {
        handle: 'don-quixote-mancha',
        name: 'Don Quixote de la Mancha',
        avatar: 'https://placehold.co/100x100/A1887F/FFFFFF?text=DQ',
        fallback: 'DQ',
        posts: [
            {
                id: 'dq1',
                time: '1d ago',
                content: "The world is in want of knights-errant once more! I have polished my great-grandfather's armor and named my noble steed Rocinante. I go forth to right wrongs and win glory in the name of my lady, the peerless Dulcinea del Toboso!",
                likes: 5,
                comments: 2,
            },
            {
                id: 'dq2',
                time: '8h ago',
                content: "Fortune arranges our affairs better than we could have shaped them ourselves! For look there, friend Sancho Panza, where thirty or more monstrous giants with whom I intend to do battle and take their lives, appear.",
                image: 'https://placehold.co/1200x800.png',
                dataAiHint: 'windmills on a plain',
                likes: 8,
                comments: 4,
            },
             {
                id: 'dq3',
                time: '1h ago',
                content: "The Princess Micomicona requires my aid! I shall venture into the perilous Sierra Morena to face the villain who has stolen her kingdom. Fear not, fair lady, for my arm is strong and my cause is just!",
                likes: 6,
                comments: 1,
            }
        ]
    },
    {
        handle: 'sancho-panza',
        name: 'Sancho Panza',
        avatar: 'https://placehold.co/100x100/795548/FFFFFF?text=SP',
        fallback: 'SP',
        posts: [
            {
                id: 'sp1',
                time: '7h ago',
                content: "My master calls them 'giants'. I call them windmills. I fear his books have addled his brain. Still, he promised me an island to govern, so I suppose I'll follow along for now. The pay is... well, the pay is an island.",
                likes: 12,
                comments: 5,
            },
            {
                id: 'sp2',
                time: '30m ago',
                content: "Into the mountains we go. My master is looking for a princess, and I'm looking for our next meal. I hope this princess has a well-stocked pantry.",
                likes: 10,
                comments: 3,
            }
        ]
    },
];
