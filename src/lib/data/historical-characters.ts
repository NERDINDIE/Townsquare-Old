
import type { User } from '@/lib/bulletin-board-data';

export const historicalCharacters: User[] = [
    {
        handle: 'tim-b',
        name: 'Tim B.',
        avatar: 'https://placehold.co/100x100/1E88E5/FFFFFF?text=TB',
        fallback: 'TB',
        posts: [
            {
                id: 'tb1',
                time: 'August 6, 1991',
                content: 'I\'ve just posted a summary of my "World-Wide Web" project on the alt.hypertext newsgroup. The idea is to share information across the internet using a system of hypertext documents. Imagine a web of knowledge, accessible to anyone!',
                likes: 3,
                comments: 1,
                location: { name: "CERN", lat: 50, lng: 50 },
            },
            {
                id: 'tb2',
                time: 'December 12, 1991',
                content: 'The first web server in North America is now online at SLAC. It\'s incredible to see this idea crossing oceans. This could genuinely change how we access and share information globally. The potential is immense.',
                likes: 8,
                comments: 3,
            }
        ]
    },
    {
        handle: 'nicola-p',
        name: 'Nicola P.',
        avatar: 'https://placehold.co/100x100/D81B60/FFFFFF?text=NP',
        fallback: 'NP',
        posts: [
            {
                id: 'np1',
                time: 'August 20, 1991',
                content: "Read Tim's proposal. A 'web' of documents... it sounds like a librarian's dream, or a nightmare. How would we even begin to categorize such a thing? The structure seems so... fluid. Intriguing, but chaotic.",
                likes: 2,
                comments: 2,
                location: { name: "CERN Library", lat: 55, lng: 45 },
            },
        ]
    },
    {
        handle: 'jurgen-s',
        name: 'Jürgen S.',
        avatar: 'https://placehold.co/100x100/43A047/FFFFFF?text=JS',
        fallback: 'JS',
        posts: [
            {
                id: 'js1',
                time: 'September 1, 1991',
                content: 'This "WWW" thing seems like a distraction. We are here to do fundamental physics, not build a global telephone directory for documents. It\'s a fun toy, but I doubt it will have any serious application for our research.',
                likes: 1,
                comments: 5,
                location: { name: "CERN Cafeteria", lat: 45, lng: 55 },
            }
        ]
    },
    {
        handle: 'hasan-yilmaz',
        name: 'Hasan Yılmaz',
        avatar: 'https://placehold.co/100x100/C0392B/FFFFFF?text=HY',
        fallback: 'HY',
        posts: [
            {
                id: 'hy1',
                time: 'November 15, 1961',
                content: 'The train journey from Sirkeci was so long, but I have finally arrived in Munich. Everything is so different, so... orderly. The air is cold. Tomorrow, another train to my new job in Berlin. Praying this was the right decision for my family.',
                likes: 4,
                comments: 1,
            },
            {
                id: 'hy2',
                time: 'December 5, 1961',
                content: 'First paycheck from the factory! The work is hard, but the Deutsche Mark is strong. I have already sent most of it home to Elif and my parents. They say I am living in a "Wohnheim" with many other men from Turkey, Greece, and Italy. It is noisy, but we share stories from home.',
                image: 'https://placehold.co/1200x800.png',
                dataAiHint: 'vintage factory interior',
                likes: 9,
                comments: 3,
            }
        ]
    },
    {
        handle: 'elif-aydin',
        name: 'Elif Aydın',
        avatar: 'https://placehold.co/100x100/8E44AD/FFFFFF?text=EA',
        fallback: 'EA',
        posts: [
            {
                id: 'ea1',
                time: 'May 10, 1964',
                content: 'After three years of waiting, I have finally joined Hasan in Berlin. The city is so vast and grey compared to our village. I miss the sun and the smell of the earth. But to be with my husband again is a blessing.',
                likes: 6,
                comments: 2,
            },
             {
                id: 'ea2',
                time: 'September 2, 1965',
                content: 'I found a small Turkish market in Kreuzberg today! The taste of familiar spices and olives almost made me weep with joy. The German women here are polite but keep to themselves. It is hard to make friends when you do not speak the language well.',
                likes: 11,
                comments: 5,
            }
        ]
    },
    {
        handle: 'ingrid-schmidt',
        name: 'Ingrid Schmidt',
        avatar: 'https://placehold.co/100x100/2980B9/FFFFFF?text=IS',
        fallback: 'IS',
        posts: [
            {
                id: 'is1',
                time: 'November 20, 1961',
                content: 'The first group of "Gastarbeiter" started at the factory today. They seem strong and work hard, but it is strange not to be able to speak with them. So many different languages in the break room now. The city is changing.',
                likes: 7,
                comments: 4,
            },
            {
                id: 'is2',
                time: 'June 1, 1966',
                content: 'My neighbor, Frau Aydın, brought over some homemade baklava. It was incredibly sweet! Her German is still halting, and my Turkish is non-existent, but we managed to share a coffee and smile. Her little boy is the same age as my Klaus.',
                likes: 15,
                comments: 6,
            }
        ]
    },
    {
        handle: 'ahmed-riza-bey',
        name: 'Ahmed Riza Bey',
        avatar: 'https://placehold.co/100x100/A67B5B/FFFFFF?text=AR',
        fallback: 'AR',
        posts: [
            {
                id: 'ar1',
                time: 'June 5, 1890',
                content: 'Just returned from Paris. The vibrancy of the boulevards, the intellectual rigor in the salons! We must embrace this spirit of progress and reason to rejuvenate our own great Empire. Positivism is the path forward.',
                likes: 8,
                comments: 3,
            },
            {
                id: 'ar2',
                time: 'May 12, 1905',
                content: "Reading 'Le Figaro' by the Bosphorus. While I admire French arts and letters, their political meddling in our affairs becomes tiresome. We must adopt their science, not their governance. Our path must be our own.",
                likes: 15,
                comments: 6,
            }
        ]
    },
    {
        handle: 'amelie-dubois',
        name: 'Amélie Dubois',
        avatar: 'https://placehold.co/100x100/8E44AD/FFFFFF?text=AD',
        fallback: 'AD',
        posts: [
            {
                id: 'ad1',
                time: 'September 20, 1895',
                content: "The view of the Golden Horn from our residence in Pera is simply divine. Attended a wonderful ball at the French Embassy last evening. It was a little piece of Paris in the heart of Constantinople. The latest fashions are slowly making their way here!",
                image: 'https://placehold.co/1200x800.png',
                dataAiHint: 'istanbul bosphorus vintage',
                likes: 12,
                comments: 4,
            }
        ]
    },
    {
        handle: 'hafiz-efendi',
        name: 'Hafiz Efendi',
        avatar: 'https://placehold.co/100x100/2C3E50/FFFFFF?text=HE',
        fallback: 'HE',
        posts: [
            {
                id: 'he1',
                time: 'November 1, 1908',
                content: "These so-called 'Young Turks' speak of progress, but I see only the erosion of our values. They read their French books and forget the wisdom of our own traditions. This fascination with the West will be our undoing. What is a chair and table compared to the humility of sitting on the floor?",
                likes: 5,
                comments: 9,
            }
        ]
    },
    {
        handle: 'zuhtu-pasazade',
        name: 'Zühtü Paşazade',
        avatar: 'https://placehold.co/100x100/F1C40F/000000?text=ZP',
        fallback: 'ZP',
        posts: [
            {
                id: 'zp3',
                time: 'June 1, 1900',
                content: 'I find Paris to be the only truly civilized place on Earth. The opera, the art, the fashion... Constantinople is so dreadfully provincial in comparison. I must import these sensibilities back home. We Ottomans must learn how to live properly!',
                likes: 10,
                comments: 8,
            },
             {
                id: 'zp4',
                time: 'August 12, 1900',
                content: 'Just commissioned a new suit from a tailor on the Rue de la Paix. It is the pinnacle of modern style. I shall be the best-dressed man in Pera when I return. The locals here stare, but it is merely the envy of the uncultured.',
                image: 'https://placehold.co/1200x800.png',
                dataAiHint: 'vintage paris street fashion',
                likes: 6,
                comments: 5,
            },
            {
                id: 'zp1',
                time: 'October 3, 1900',
                content: "My new shipment of Baccarat crystal has arrived from Paris! The servants are so clumsy, I pray they do not break a single piece. One simply cannot entertain with common glassware. It is, as they say, 'gauche'.",
                likes: 7,
                comments: 11,
            },
            {
                id: 'zp2',
                time: 'October 15, 1900',
                content: "Saw Hafiz Efendi at the bazaar today. He was sitting on a simple rug, drinking tea from a plain glass. So terribly... Ottoman. I, for one, shall be taking my afternoon tea with my Limoges porcelain, as a civilized person does.",
                image: 'https://placehold.co/1200x800.png',
                dataAiHint: 'antique porcelain teacup',
                likes: 4,
                comments: 6,
            }
        ]
    },
    {
        handle: 'vicomte-de-valmont',
        name: 'Vicomte de Valmont',
        avatar: 'https://placehold.co/100x100/34495E/FFFFFF?text=V',
        fallback: 'V',
        posts: [
            {
                id: 'vdv1',
                time: 'June 15, 1900',
                content: 'There is a new Ottoman pasha in the salons, a certain Zühtü. He spends money as if it were water and speaks of "civilizing" his homeland. He is a caricature, a man so desperate to be Parisian he has forgotten how to be anything at all. It is most amusing.',
                likes: 15,
                comments: 7,
            }
        ]
    },
    {
        handle: 'tsar-nicholas-ii',
        name: 'Tsar Nicholas II',
        avatar: 'https://placehold.co/100x100/795548/FFFFFF?text=NII',
        fallback: 'NII',
        posts: [
            {
                id: 'tsar1',
                time: 'February 27, 1917',
                content: 'There is unrest in Petrograd. They cry for bread. I have ordered the Duma to dissolve. God has given me this crown, and I shall hold it for my son. The army remains loyal.',
                likes: 15,
                comments: 8,
                location: { name: 'Winter Palace', lat: 40, lng: 55 }
            },
        ]
    },
    {
        handle: 'vladimir-lenin',
        name: 'Vladimir Lenin',
        avatar: 'https://placehold.co/100x100/B71C1C/FFFFFF?text=L',
        fallback: 'L',
        posts: [
            {
                id: 'lenin1',
                time: 'April 17, 1917',
                content: 'Just arrived at Finland Station. The so-called "Provisional Government" is a farce. They continue the imperialist war! We demand all power to the Soviets! Peace, Land, and Bread!',
                likes: 120,
                comments: 32,
            },
            {
                id: 'lenin2',
                time: 'October 26, 1917',
                content: 'The Winter Palace has fallen! The bourgeois government is overthrown. The workers and peasants have seized power. A new era begins, an era of socialist revolution. Comrades, we shall now proceed to construct the socialist order!',
                likes: 250,
                comments: 45,
            }
        ]
    },
    {
        handle: 'russian-peasant',
        name: 'A Russian Peasant',
        avatar: 'https://placehold.co/100x100/A1887F/FFFFFF?text=RP',
        fallback: 'RP',
        posts: [
             {
                id: 'rp1',
                time: 'August 1, 1914',
                content: 'They say we are at war with the Germans. I do not know these Germans. I only know the land, and the landlord who takes most of our grain. My sons have been taken for the Tsar\'s army. I pray to God they return.',
                likes: 3,
                comments: 1,
            },
            {
                id: 'rp2',
                time: 'March 1, 1917',
                content: 'There is no bread in the city. The women started marching, and now everyone is on strike. They say the Tsar is gone! Perhaps now we will get the land the nobles have held for so long.',
                likes: 25,
                comments: 6,
            }
        ]
    },
    {
        handle: 'klaus-richter',
        name: 'Klaus Richter',
        avatar: 'https://placehold.co/100x100/607D8B/FFFFFF?text=KR',
        fallback: 'KR',
        posts: [
            {
                id: 'kr1',
                time: 'January 30, 1933',
                content: 'A new Chancellor. He speaks with such passion. He promises to restore our national pride and get people back to work. For the first time in years, there is a sense of hope on the streets of Berlin.',
                likes: 12,
                comments: 2,
            },
            {
                id: 'kr2',
                time: 'September 1, 1939',
                content: 'The radio says our soldiers have crossed into Poland to reclaim what is rightfully ours. They say it will be a swift action. I pray they are right. My son, Hans, is with the first wave.',
                likes: 5,
                comments: 4,
            },
            {
                id: 'kr3',
                time: 'February 18, 1943',
                content: 'The Minister spoke at the Sportpalast today. He asked if we wanted "Total War." The crowd roared. I feel a chill. What more can we possibly give? The rations are already so thin.',
                likes: 2,
                comments: 7,
            },
             {
                id: 'kr4',
                time: 'May 2, 1945',
                content: 'The guns are silent. The city is rubble. The red flag flies over the Reichstag. What was it all for?',
                likes: 1,
                comments: 0,
            }
        ]
    },
    {
        handle: 'winston-churchill',
        name: 'Winston Churchill',
        avatar: 'https://placehold.co/100x100/9E9E9E/FFFFFF?text=WC',
        fallback: 'WC',
        posts: [
            {
                id: 'wc1',
                time: 'May 13, 1940',
                content: 'I have nothing to offer but blood, toil, tears and sweat. We have before us an ordeal of the most grievous kind. You ask, what is our aim? I can answer in one word: It is victory, victory at all costs.',
                likes: 150,
                comments: 25,
            },
             {
                id: 'wc2',
                time: 'June 4, 1940',
                content: 'We shall fight on the beaches, we shall fight on the landing grounds, we shall fight in the fields and in the streets, we shall fight in the hills; we shall never surrender.',
                likes: 200,
                comments: 30,
            }
        ]
    },
     {
        handle: 'anne-frank',
        name: 'Anne Frank',
        avatar: 'https://placehold.co/100x100/4CAF50/FFFFFF?text=AF',
        fallback: 'AF',
        posts: [
            {
                id: 'af1',
                time: 'July 12, 1942',
                content: 'We\'ve been in our hiding place for a few days now. It feels strange to be so quiet, to whisper. I miss the fresh air, but at least we are together. I call my diary "Kitty."',
                likes: 50,
                comments: 5,
            },
            {
                id: 'af2',
                time: 'April 11, 1944',
                content: 'I still believe, in spite of everything, that people are truly good at heart. I see the world being slowly transformed into a wilderness, I hear the approaching thunder that, one day, will destroy us too.',
                likes: 75,
                comments: 10,
            }
        ]
    },
     {
        handle: 'eleanor-roosevelt',
        name: 'Eleanor Roosevelt',
        avatar: 'https://placehold.co/100x100/3F51B5/FFFFFF?text=ER',
        fallback: 'ER',
        posts: [
            {
                id: 'er1',
                time: 'December 8, 1941',
                content: 'Yesterday, December 7th, 1941 -- a date which will live in infamy. The United States of America was suddenly and deliberately attacked. There is no blinking at the fact that our people, our territory, and our interests are in grave danger.',
                likes: 180,
                comments: 40,
            },
            {
                id: 'er2',
                time: 'June 6, 1944',
                content: 'Our sons, pride of our Nation, this day have set upon a mighty endeavor, a struggle to preserve our Republic, our religion, and our civilization, and to set free a suffering humanity. They will need our prayers.',
                likes: 220,
                comments: 35,
            }
        ]
    },
    {
        handle: 'kenji-tanaka',
        name: 'Kenji Tanaka',
        avatar: 'https://placehold.co/100x100/D32F2F/FFFFFF?text=KT',
        fallback: 'KT',
        posts: [
            {
                id: 'kt1',
                time: 'December 8, 1941',
                content: 'A glorious day! Our brave pilots have struck a decisive blow against the arrogant Americans at Pearl Harbor. The Emperor\'s divine wisdom guides us. Banzai! For the Greater East Asia Co-Prosperity Sphere!',
                likes: 25,
                comments: 4,
            },
            {
                id: 'kt2',
                time: 'August 7, 1945',
                content: 'A new kind of bomb... the city is gone. The sky was blinding white, then red. So many fires. So many shadows on the walls that were people. What is this hell? I don\'t understand.',
                likes: 1,
                comments: 0,
            }
        ]
    },
    {
        handle: 'yuki-sato',
        name: 'Yuki Sato',
        avatar: 'https://placehold.co/100x100/7B1FA2/FFFFFF?text=YS',
        fallback: 'YS',
        posts: [
            {
                id: 'ys1',
                time: 'November 2, 1938',
                content: 'The government has declared a "New Order in East Asia." The newspapers are full of patriotic fervor, but Professor Ishikawa warns us in private to be wary of military ambition. It is dangerous to speak freely, even in Kyoto.',
                likes: 7,
                comments: 1,
            },
            {
                id: 'ys2',
                time: 'April 18, 1942',
                content: 'They say American planes bombed Tokyo. The military police are everywhere, arresting anyone who questions the official reports. The kempeitai have taken my neighbor, Mr. Abe. He only said the war was lasting too long.',
                likes: 3,
                comments: 2,
            }
        ]
    },
    {
        handle: 'haruto-ito',
        name: 'Haruto Ito',
        avatar: 'https://placehold.co/100x100/00796B/FFFFFF?text=HI',
        fallback: 'HI',
        posts: [
            {
                id: 'hi1',
                time: 'July 7, 1937',
                content: 'Another "incident" in China. The army calls for national unity and sacrifice. The price of rice has gone up again. It becomes harder to feed my family.',
                likes: 5,
                comments: 2,
            },
            {
                id: 'hi2',
                time: 'March 10, 1945',
                content: 'My shop was burned in the firebombing last night. Everything is gone. The government tells us to endure. For what? My wife and I are moving to the countryside, if we can make it there.',
                likes: 2,
                comments: 1,
            }
        ]
    },
    {
        handle: 'arthur-p',
        name: 'Arthur Penhaligon',
        avatar: 'https://placehold.co/100x100/3E2723/FFFFFF?text=AP',
        fallback: 'AP',
        posts: [
            {
                id: 'ap1',
                time: 'October 18, 1922',
                content: "Heard some chaps talking about this new 'British Broadcasting Company'. They plan to send out news through the very air! Sounds like fanciful nonsense to me. Give me the reliable print of the morning paper any day. How can you trust news you can't even hold?",
                likes: 4,
                comments: 2,
                location: { name: 'Fleet Street', lat: 51, lng: 49 },
            },
            {
                id: 'ap2',
                time: 'November 15, 1922',
                content: "My neighbour, young Thomas, has one of those crystal sets. He had it on this evening. A chap reading the day's events. It's... peculiar. The voice is clear, I'll grant it that. But it lacks the authority of the printed word.",
                likes: 6,
                comments: 3,
            }
        ]
    },
    {
        handle: 'eleanor-v',
        name: 'Eleanor Vance',
        avatar: 'https://placehold.co/100x100/C2185B/FFFFFF?text=EV',
        fallback: 'EV',
        posts: [
            {
                id: 'ev1',
                time: 'November 14, 1922',
                content: 'Listened to the first broadcast from 2LO tonight! It was utterly magical! To hear a voice from so far away, right in our own sitting room. This will change everything. Father thinks it\'s a passing fad, but I think it\'s the future.',
                image: 'https://placehold.co/1200x800.png',
                dataAiHint: 'vintage radio receiver',
                likes: 12,
                comments: 5,
            }
        ]
    },
    {
        handle: 'sid-cooper',
        name: 'Sid Cooper',
        avatar: 'https://placehold.co/100x100/512DA8/FFFFFF?text=SC',
        fallback: 'SC',
        posts: [
            {
                id: 'sc1',
                time: 'November 20, 1922',
                content: 'Fewer people stopping by the stand for the evening edition this past week. They all seem to be rushing home to listen to this "wireless" contraption. Worries me, it does. How\'s a man supposed to make a living if the news just flies through the air for free?',
                likes: 2,
                comments: 1,
            }
        ]
    },
    {
        handle: 'frank-connolly',
        name: 'Frank Connolly',
        avatar: 'https://placehold.co/100x100/455A64/FFFFFF?text=FC',
        fallback: 'FC',
        posts: [
            {
                id: 'fc1',
                time: 'March 21, 1950',
                content: "Another loyalty questionnaire at the department today. They asked if I've ever attended a meeting with 'persons of questionable allegiance.' I just want to do my job, but now I'm looking over my shoulder, wondering which of my colleagues might be an informant.",
                likes: 2,
                comments: 1,
            }
        ]
    },
    {
        handle: 'eleanor-may',
        name: 'Eleanor May',
        avatar: 'https://placehold.co/100x100/D81B60/FFFFFF?text=EM',
        fallback: 'EM',
        posts: [
            {
                id: 'em1',
                time: 'October 27, 1951',
                content: "My agent just called. The studio dropped my contract. No reason given, but we all know why. My name was in 'Red Channels.' Years of work, gone overnight. All for attending a few anti-fascist rallies before the war. Is this still America?",
                image: 'https://placehold.co/1200x800.png',
                dataAiHint: 'vintage hollywood movie set',
                likes: 7,
                comments: 3,
            }
        ]
    },
    {
        handle: 'leo-rothman',
        name: 'Leo Rothman',
        avatar: 'https://placehold.co/100x100/00796B/FFFFFF?text=LR',
        fallback: 'LR',
        posts: [
            {
                id: 'lr1',
                time: 'May 19, 1952',
                content: "They're subpoenaing playwrights now. My friend Charlie was called before the Committee. They want names. It's a witch hunt. How can you create art in a climate where every word is scrutinized for 'un-American' sentiment?",
                likes: 5,
                comments: 4,
            }
        ]
    },
    {
        handle: 'helen-parker',
        name: 'Helen Parker',
        avatar: 'https://placehold.co/100x100/8D6E63/FFFFFF?text=HP',
        fallback: 'HP',
        posts: [
            {
                id: 'hp1',
                time: 'September 12, 1953',
                content: "The local 'Committee for Decency' came into the library today. They handed me a list of books they want removed from the shelves. Books by authors they deem 'subversive.' These are just stories, ideas! A library is no place for censorship.",
                likes: 11,
                comments: 6,
            }
        ]
    },
    {
        handle: 'walter-cronkite',
        name: 'Walter Cronkite',
        avatar: 'https://placehold.co/100x100/212121/FFFFFF?text=WC',
        fallback: 'WC',
        posts: [
            {
                id: 'wc1',
                time: 'February 27, 1954',
                content: "From where I sit, the junior senator from Wisconsin seems to be confusing accusation with evidence. The line between investigation and persecution is a very fine one, and the American people have a right to know which side of that line we are on.",
                likes: 28,
                comments: 9,
            }
        ]
    },
    {
        handle: 'lou-devereaux',
        name: 'Louis Devereaux',
        avatar: 'https://placehold.co/100x100/4A148C/FFFFFF?text=LD',
        fallback: 'LD',
        posts: [
            {
                id: 'ld1',
                time: 'June 5, 1952',
                content: "The air in the Quarter is thick with music and humidity tonight. A good crowd at the club. Seems people need a swinging rhythm to forget the grim headlines they read in the papers these days.",
                likes: 9,
                comments: 2,
            },
            {
                id: 'ld2',
                time: 'July 11, 1952',
                content: "Club owner told me to 'keep it light' and 'play the standards'. Said my improvisations were getting a little too 'out there'. Sounded less like a musical critique and more like a warning. A man's not even free in his own music anymore.",
                likes: 6,
                comments: 4,
            }
        ]
    },
    {
        handle: 'patty-oconnor',
        name: 'Patsy-Lynn O\'Connor',
        avatar: 'https://placehold.co/100x100/AD1457/FFFFFF?text=PO',
        fallback: 'PO',
        posts: [
            {
                id: 'po1',
                time: 'August 1, 1953',
                content: "Just finished a new song for the Opry. The label says they want 'wholesome, patriotic tunes'. I just want to sing about love and heartbreak. It's a tightrope, I tell you.",
                image: 'https://placehold.co/1200x800.png',
                dataAiHint: 'vintage recording studio',
                likes: 15,
                comments: 3,
            }
        ]
    },
    {
        handle: 'clyde-b',
        name: 'Clyde Barrow',
        avatar: 'https://placehold.co/100x100/3E2723/FFFFFF?text=CB',
        fallback: 'CB',
        posts: [
            {
                id: 'cb1',
                time: 'May 5, 1954',
                content: "Fixed the fence on the south pasture. Heard on the radio about communists in the government. Seems a long way from here, but folks in town are getting mighty suspicious of anyone with new ideas.",
                likes: 3,
                comments: 1,
            }
        ]
    },
    {
        handle: 'jed-jones',
        name: 'Jedediah Jones',
        avatar: 'https://placehold.co/100x100/6D4C41/FFFFFF?text=JJ',
        fallback: 'JJ',
        posts: [
            {
                id: 'jj1',
                time: 'May 20, 1954',
                content: "Sheriff came by asking questions about the new farmhand, the one who reads all them books. Told him he does his work just fine. A man's reading is his own business. I don't like people poking their noses where they don't belong.",
                likes: 6,
                comments: 2,
            }
        ]
    },
    {
        handle: 'mustafa-kemal',
        name: 'Mustafa Kemal',
        avatar: 'https://placehold.co/100x100/A93226/FFFFFF?text=MK',
        fallback: 'MK',
        posts: [
            {
                id: 'mk1',
                time: 'April 23, 1920',
                content: 'The Grand National Assembly is convened in Ankara. The will of the nation shall be its own master. Sovereignty belongs unconditionally to the nation.',
                likes: 180,
                comments: 25,
            },
            {
                id: 'mk2',
                time: 'August 26, 1922',
                content: 'Armies, your first target is the Mediterranean Sea. Forward!',
                likes: 250,
                comments: 15,
            }
        ]
    },
    {
        handle: 'halide-edib',
        name: 'Halide Edib',
        avatar: 'https://placehold.co/100x100/6C3483/FFFFFF?text=HE',
        fallback: 'HE',
        posts: [
            {
                id: 'he1',
                time: 'May 19, 1919',
                content: 'Addressed the crowd at Sultanahmet Square today. The occupation is a wound in the heart of our nation. We must resist. Our pens and our voices will be our weapons until other means are necessary.',
                image: 'https://placehold.co/1200x800.png',
                dataAiHint: 'sultanahmet square vintage photo',
                likes: 95,
                comments: 12,
            }
        ]
    },
    {
        handle: 'ayse-hanim',
        name: 'Ayşe Hanım',
        avatar: 'https://placehold.co/100x100/117A65/FFFFFF?text=AH',
        fallback: 'AH',
        posts: [
            {
                id: 'ah1',
                time: 'March 18, 1920',
                content: 'The British soldiers patrol our streets. Their eyes are cold. It is hard to feel at home in your own city when it is filled with foreign flags. We pray for the movement in Anatolia.',
                likes: 15,
                comments: 4,
            }
        ]
    },
    {
        handle: 'captain-miller',
        name: 'Captain Miller',
        avatar: 'https://placehold.co/100x100/1A5276/FFFFFF?text=CM',
        fallback: 'CM',
        posts: [
            {
                id: 'cm1',
                time: 'March 20, 1920',
                content: 'Officially occupied Constantinople today. The city is a powder keg. Tense. The Sultan is compliant, but there are whispers of a nationalist rebellion brewing in the interior. We must maintain order.',
                likes: 8,
                comments: 2,
            }
        ]
    },
    {
        handle: 'ali-usta',
        name: 'Ali Usta',
        avatar: 'https://placehold.co/100x100/B9770E/FFFFFF?text=AU',
        fallback: 'AU',
        posts: [
            {
                id: 'au1',
                time: 'May 1, 1920',
                content: 'My workshop is now making parts for rifles instead of ploughs. We work day and night. Every piece of metal counts for the Kuva-yi Milliye. Our hands will help forge our freedom.',
                likes: 45,
                comments: 9,
            }
        ]
    },
    {
        handle: 'eleni-pappas',
        name: 'Eleni Pappas',
        avatar: 'https://placehold.co/100x100/1E88E5/FFFFFF?text=EP',
        fallback: 'EP',
        posts: [
            {
                id: 'ep1',
                time: 'May 15, 1919',
                content: 'The Greek army has arrived in Smyrna! The streets are filled with blue and white flags. It feels like a day of liberation. My heart soars with hope for a new Hellenic future in Ionia.',
                likes: 35,
                comments: 7,
            },
            {
                id: 'ep2',
                time: 'September 8, 1922',
                content: 'The Turkish army is approaching. The air is thick with fear and smoke. People are fleeing to the harbor. Where is the Greek army? Where are the Allied ships? They promised to protect us.',
                likes: 3,
                comments: 11,
            }
        ]
    },
    {
        handle: 'gen-hacianestis',
        name: 'General Hacianestis',
        avatar: 'https://placehold.co/100x100/37474F/FFFFFF?text=GH',
        fallback: 'GH',
        posts: [
            {
                id: 'gh1',
                time: 'July 15, 1922',
                content: "My command of the Army of Asia Minor is absolute. The campaign is proceeding according to my singular vision. I require no advice. We will march on Ankara and the so-called 'nationalists' will scatter like dust.",
                likes: 11,
                comments: 18,
            }
        ]
    },
    {
        handle: 'onbasi-halil',
        name: 'Onbaşı Halil',
        avatar: 'https://placehold.co/100x100/4E342E/FFFFFF?text=OH',
        fallback: 'OH',
        posts: [
            {
                id: 'oh1',
                time: 'March 18, 1921',
                content: 'We held the line at Gallipoli against the British, and we will hold the line here. We fight not for a Sultan, but for our homes, for our soil. Every trench is a testament to our resolve.',
                likes: 62,
                comments: 14,
            }
        ]
    },
    {
        handle: 'y-sadri',
        name: 'Yusuf Sadri',
        avatar: 'https://placehold.co/100x100/F4D03F/000000?text=YS',
        fallback: 'YS',
        posts: [
            {
                id: 'ys1',
                time: '1975',
                content: 'Just signed a new talent at Unkapanı. This kid has a voice that could melt stone. With the right arrangement, this will be the song of the summer.',
                likes: 18,
                comments: 4,
            }
        ]
    },
    {
        handle: 't-akar',
        name: 'Tülay Akar',
        avatar: 'https://placehold.co/100x100/E74C3C/FFFFFF?text=TA',
        fallback: 'TA',
        posts: [
            {
                id: 'ta1',
                time: '1976',
                content: 'Spent all day going from label to label at the Plakçılar Çarşısı. So many closed doors. But I won\'t give up. Someone will hear my voice.',
                likes: 9,
                comments: 2,
            }
        ]
    },
    {
        handle: 's-ozturk',
        name: 'Selim Öztürk',
        avatar: 'https://placehold.co/100x100/5DADE2/000000?text=SÖ',
        fallback: 'SÖ',
        posts: [
            {
                id: 'so1',
                time: '1977',
                content: 'Wrote another song about heartbreak and sold it for pennies to one of the big producers at Unkapanı. They\'ll give it to some pop singer who will butcher the emotion. At least it pays the rent.',
                likes: 6,
                comments: 3,
            }
        ]
    },
    {
        handle: 'l-onur',
        name: 'Lale Onur',
        avatar: 'https://placehold.co/100x100/AF7AC5/FFFFFF?text=LO',
        fallback: 'LO',
        posts: [
            {
                id: 'lo1',
                time: '1965',
                content: 'My first day on a real Yeşilçam set! It\'s not as glamorous as it looks in the movies. But to see the cameras, the lights... it\'s a dream come true. Maybe one day I\'ll be the star.',
                image: 'https://placehold.co/1200x800.png',
                dataAiHint: 'vintage film camera',
                likes: 22,
                comments: 5,
            }
        ]
    },
    {
        handle: 'm-aksoy',
        name: 'Metin Aksoy',
        avatar: 'https://placehold.co/100x100/48C9B0/FFFFFF?text=MA',
        fallback: 'MA',
        posts: [
            {
                id: 'ma1',
                time: '1968',
                content: 'Another script finished. A story of a poor boy and a rich girl, a classic. The producer wants more drama, more tears. It\'s what the people want to see. But sometimes I wish we could tell different stories.',
                likes: 12,
                comments: 7,
            }
        ]
    },
    {
        handle: 't-soray',
        name: 'Türkan Şoray',
        avatar: 'https://placehold.co/100x100/EC7063/FFFFFF?text=TŞ',
        fallback: 'TŞ',
        posts: [
            {
                id: 'ts1',
                time: '1972',
                content: 'The "Sultan" of cinema. They call me that. It is an honor, but also a heavy burden. Every film, every scene must be perfect. The audience expects nothing less.',
                likes: 150,
                comments: 25,
            }
        ]
    },
    {
        handle: 'tayfur-sokmen',
        name: 'Tayfur Sökmen',
        avatar: 'https://placehold.co/100x100/C0392B/FFFFFF?text=TS',
        fallback: 'TS',
        posts: [
            {
                id: 'tsm1',
                time: 'September 2, 1938',
                content: 'Today, as the first President of the State of Hatay, I affirm our independence and our commitment to building a prosperous and peaceful future for all our citizens, Turkish, Arab, and Armenian alike.',
                image: 'https://placehold.co/1200x800.png',
                dataAiHint: 'republic proclamation historic',
                likes: 78,
                comments: 15,
            },
        ]
    },
    {
        handle: 'adile-halide',
        name: 'Adile Halide',
        avatar: 'https://placehold.co/100x100/16A085/FFFFFF?text=AH',
        fallback: 'AH',
        posts: [
            {
                id: 'ah1',
                time: 'September 5, 1938',
                content: 'A new flag flies over Antakya. They call it the State of Hatay. So many speeches, so many promises. Will life be better? Or is this just another line drawn on a map by men in far-off rooms? We watch, and we wait.',
                likes: 12,
                comments: 4,
            },
        ]
    },
    {
        handle: 'jean-gauthier',
        name: 'Jean-Baptiste Gauthier',
        avatar: 'https://placehold.co/100x100/2980B9/FFFFFF?text=JG',
        fallback: 'JG',
        posts: [
            {
                id: 'jg1',
                time: 'September 3, 1938',
                content: 'Observing the transition in the Sanjak of Alexandretta. The League of Nations hopes for a stable, multi-ethnic state. However, the Turkish influence is palpable. One must wonder if this "independence" is merely a prelude to annexation. My report to Paris will be... nuanced.',
                likes: 5,
                comments: 2,
            },
        ]
    },
    {
        handle: 'dario-moreno',
        name: 'Dario Moreno',
        avatar: 'https://placehold.co/100x100/A67B5B/FFFFFF?text=DM',
        fallback: 'DM',
        posts: [
            {
                id: 'dm1',
                time: '1945',
                content: "Working odd jobs, from the law office to the candy shop, but my heart is always singing. The view from the Asansör, my home, my castle... this city of İzmir gives me my voice. One day, I'll sing for the whole world.",
                image: 'https://placehold.co/1200x800.png',
                dataAiHint: 'izmir asansor vintage',
                likes: 12,
                comments: 2,
            },
            {
                id: 'dm2',
                time: '1950',
                content: 'They call me the "Voice of the Ferry"! Singing for passengers as we cross the beautiful bay of İzmir. From Konak to Karşıyaka, the sea breeze carries my tunes. The joy on people\'s faces is my greatest reward.',
                likes: 25,
                comments: 6,
            },
             {
                id: 'dm3',
                time: '1958',
                content: "Paris! The city of lights and dreams. Singing 'Si tu vas à Rio' and seeing the French audience dance... it's beyond my wildest dreams. I may be in France, but a part of my heart will always be singing 'Canım İzmir'.",
                image: 'https://placehold.co/1200x800.png',
                dataAiHint: 'paris nightclub vintage',
                likes: 110,
                comments: 15,
            }
        ]
    },
    {
        handle: 'asha-s',
        name: 'Asha Sharma',
        avatar: 'https://placehold.co/100x100/FF9800/FFFFFF?text=AS',
        fallback: 'AS',
        posts: [
            {
                id: 'as1',
                time: 'August 15, 1947',
                content: 'At the stroke of the midnight hour, while the world sleeps, India will awake to life and freedom. A moment comes, which comes but rarely in history, when we step out from the old to the new. Jai Hind!',
                image: 'https://placehold.co/1200x800.png',
                dataAiHint: 'indian independence celebration',
                likes: 250,
                comments: 30,
            }
        ]
    },
    {
        handle: 'vikram-s',
        name: 'Vikram Singh',
        avatar: 'https://placehold.co/100x100/673AB7/FFFFFF?text=VS',
        fallback: 'VS',
        posts: [
            {
                id: 'vs1',
                time: 'June 26, 1975',
                content: "The radios are silent, the newspapers censored. They call it an 'Emergency' to maintain order, but it feels like the death of the democracy our parents fought for. We students will not be silenced.",
                likes: 45,
                comments: 12,
            }
        ]
    },
    {
        handle: 'khaled-am',
        name: 'Khaled Al-Masri',
        avatar: 'https://placehold.co/100x100/009688/FFFFFF?text=KA',
        fallback: 'KA',
        posts: [
            {
                id: 'kam1',
                time: 'July 23, 1952',
                content: 'The Free Officers have done it! The King is gone. A new dawn for Egypt! No more corruption, no more foreign influence. This is a victory for the people.',
                image: 'https://placehold.co/1200x800.png',
                dataAiHint: 'cairo street celebration',
                likes: 180,
                comments: 20,
            }
        ]
    },
    {
        handle: 'fatima-z',
        name: 'Fatima Zahran',
        avatar: 'https://placehold.co/100x100/CDDC39/000000?text=FZ',
        fallback: 'FZ',
        posts: [
            {
                id: 'fz1',
                time: 'July 28, 1956',
                content: 'Nasser spoke on the radio today. He has nationalized the Suez Canal! The crowd in the square went wild. He said it belongs to us, to Egypt. I feel a sense of pride I have not felt before.',
                likes: 150,
                comments: 18,
            }
        ]
    },
    {
        handle: 'marco-r',
        name: 'Marco Ribeiro',
        avatar: 'https://placehold.co/100x100/03A9F4/FFFFFF?text=MR',
        fallback: 'MR',
        posts: [
            {
                id: 'mr1',
                time: '1959',
                content: 'There\'s a new sound brewing in the apartments of Copacabana. A softer samba, a cooler jazz. We call it Bossa Nova. It is the sound of a modern, optimistic Brazil.',
                image: 'https://placehold.co/1200x800.png',
                dataAiHint: 'vintage jazz club',
                likes: 95,
                comments: 15,
            }
        ]
    },
    {
        handle: 'isabela-c',
        name: 'Isabela Costa',
        avatar: 'https://placehold.co/100x100/FF5722/FFFFFF?text=IC',
        fallback: 'IC',
        posts: [
            {
                id: 'ic1',
                time: 'April 21, 1960',
                content: 'They have officially moved the capital to that new city in the middle of nowhere. Brasília, they call it. Can you imagine? Leaving the beauty and soul of Rio for a place made of concrete and red dust. Absurd.',
                likes: 20,
                comments: 8,
            }
        ]
    },
];
