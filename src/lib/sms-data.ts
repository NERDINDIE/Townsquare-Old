
export interface SmsProvider {
    id: number;
    name: string;
}

export interface SmsMessage {
    from: 'provider' | 'me';
    content: string;
}

export interface SmsThread {
    id: number;
    provider: SmsProvider;
    timestamp: string;
    messages: SmsMessage[];
    isSpam?: boolean;
    name: string;
    avatar: string;
    fallback: string;
    unread: number;
    type: 'human' | 'ai' | 'group' | 'match';
    status: 'online' | 'offline';
}

const providers: SmsProvider[] = [
    { id: 101, name: 'Weather Alerts' },
    { id: 102, name: 'NewsFlash' },
    { id: 103, name: 'Townsquare Bank' },
    { id: 104, name: 'Local Deals' },
    { id: 201, name: 'Unknown Sender'},
];

export const smsThreads: SmsThread[] = [
     {
        id: 6,
        provider: providers[0],
        name: 'Olivia',
        avatar: 'https://github.com/randomuser-olivia.png',
        fallback: 'O',
        timestamp: '9:15 AM',
        messages: [
            { from: 'provider', content: 'Hey! Saw we matched on Rendezvous. I loved your profile picture, is that from your trip to Italy?' },
        ],
        isSpam: false,
        unread: 1,
        type: 'match',
        status: 'online',
    },
    {
        id: 1,
        provider: providers[0], // Not a real provider, just for convo list
        name: 'Emily White',
        avatar: 'https://github.com/randomuser2.png',
        fallback: 'EW',
        timestamp: '2:45 PM',
        messages: [
            { from: 'provider', content: 'Hey, did you see the latest news about the downtown market?' },
            { from: 'me', content: 'No, what happened?' },
        ],
        isSpam: false,
        unread: 2,
        type: 'human',
        status: 'online',
    },
    {
        id: 2,
        provider: providers[2],
        name: 'Townsquare Bank',
        avatar: '',
        fallback: 'TB',
        timestamp: '1:10 PM',
        messages: [
             { from: 'provider', content: 'Townsquare Bank Alert: A charge of $1,250 for "Electronics" was just approved. If this was not you, please call us immediately at (555)-0123.' },
        ],
        isSpam: true,
        unread: 1,
        type: 'ai',
        status: 'online'
    },
    {
        id: 3,
        provider: providers[1],
        name: 'Local News Bot',
        avatar: '',
        fallback: 'NB',
        timestamp: '11:30 AM',
        messages: [
            { from: 'provider', content: 'Here are today\'s top headlines for you.' },
        ],
        isSpam: false,
        unread: 0,
        type: 'ai',
        status: 'online',
    },
    {
        id: 4,
        provider: providers[3],
        name: 'John Smith',
        avatar: 'https://github.com/randomuser1.png',
        fallback: 'JS',
        timestamp: 'Yesterday',
        messages: [
            { from: 'provider', content: 'Can you send over the draft?' },
        ],
        isSpam: false,
        unread: 0,
        type: 'human',
        status: 'offline',
    },
    {
        id: 5,
        provider: providers[4],
        name: 'URGENT: Your Package',
        avatar: '',
        fallback: '!',
        timestamp: 'Yesterday',
        messages: [
             { from: 'provider', content: 'NOTICE: Your package with tracking ID 81274-A is being held due to an incomplete address. Please update your details here to avoid return: bit.ly/fakelink' },
        ],
        isSpam: true,
        unread: 1,
        type: 'ai',
        status: 'online',
    },
];
