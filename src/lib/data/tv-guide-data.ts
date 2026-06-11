
export const channels = [
    { id: 57, name: 'Comedy Channel', logo: 'https://placehold.co/100x50/FFFF00/000000?text=COMEDY&font=roboto' },
    { id: 139, name: 'Drama Life', logo: 'https://placehold.co/100x50/000000/FFFFFF?text=DRAMA%20LIFE&font=roboto' },
    { id: 156, name: 'Talk Show Central', logo: 'https://placehold.co/100x50/000000/FFFFFF?text=TALK&font=roboto' },
    { id: 200, name: 'Action Movies', logo: 'https://placehold.co/100x50/FF0000/FFFFFF?text=ACTION&font=roboto' },
    { id: 210, name: '80s Rewind', logo: 'https://placehold.co/100x50/FF00FF/FFFFFF?text=80s%20Rewind&font=roboto' },
];

export const programs = {
    57: [
        { start: '2:00 PM', end: '3:00 PM', title: 'Classic Sitcom' },
        { start: '3:00 PM', end: '4:30 PM', title: 'Feature Film Comedy' },
    ],
    139: [
        { start: '2:00 PM', end: '2:30 PM', title: 'Medical Drama', subtitle: 'Fathers and Sons' },
        { start: '2:30 PM', end: '3:30 PM', title: 'Medical Drama', subtitle: 'Cattle Drive, Part 1' },
        { start: '3:30 PM', end: '4:00 PM', title: 'Fantasy Series', subtitle: 'Reckless Abandon' },
    ],
    156: [
        { start: '2:00 PM', end: '3:00 PM', title: 'The Morning Show', subtitle: "Guest: Comedian" },
        { start: '3:00 PM', end: '4:00 PM', title: 'The Morning Show', subtitle: "Guest: Actor" },
        { start: '4:00 PM', end: '5:00 PM', title: 'The Morning Show', subtitle: "Guest: Musician" },
    ],
    200: [{ start: '2:00 PM', end: '4:00 PM', title: 'Action Movie' }],
    210: [{ start: '2:30 PM', end: '4:30 PM', title: 'Retro Film' }],
};

export const timeSlots = ['2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM'];
