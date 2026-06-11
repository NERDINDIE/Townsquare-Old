
export const mockVoicemails = [
    {
        id: 1,
        caller: 'John Smith',
        number: '(555) 123-4567',
        avatar: 'https://github.com/randomuser1.png',
        fallback: 'JS',
        time: 'Today, 2:45 PM',
        transcription: "Hey, it's John. Just calling to confirm our meeting tomorrow at 10 AM. Let me know if that still works for you. Talk soon, bye.",
        voice: 'Achernar' as const,
    },
    {
        id: 2,
        caller: 'Emily White',
        number: '(555) 987-6543',
        avatar: 'https://github.com/randomuser2.png',
        fallback: 'EW',
        time: 'Yesterday, 5:20 PM',
        transcription: "Hi there! I was just calling to follow up on the article draft. I've sent over my notes. I think it's looking great, just a few minor tweaks. Give me a call back when you have a moment.",
        voice: 'Sirius' as const,
    },
     {
        id: 3,
        caller: 'Unknown Number',
        number: '(555) 555-5555',
        avatar: '',
        fallback: '?',
        time: 'Yesterday, 11:10 AM',
        transcription: "This is a reminder from your dental office about your appointment on Friday at 3:00 PM. Please call us to confirm. Thank you.",
        voice: 'Enif' as const,
    }
];
