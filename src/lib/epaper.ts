
export interface Edition {
  id: string;
  date: string;
  coverImage: string;
}

export interface Publication {
  id: string;
  name: string;
  slug: string;
  logoText: string;
  editions: Edition[];
}

export const publications: Publication[] = [
  {
    id: 'pub1',
    name: 'Townsquare Daily',
    slug: 'townsquare-daily',
    logoText: 'TOWNSQUARE+DAILY',
    editions: [
      {
        id: 'ed1-1',
        date: 'Saturday, August 16, 2025',
        coverImage: 'https://placehold.co/800x1067.png?text=Townsquare+Daily\\nCover&font=roboto',
      },
      {
        id: 'ed1-2',
        date: 'Friday, August 15, 2025',
        coverImage: 'https://placehold.co/800x1067.png?text=Townsquare+Daily\\nCover&font=roboto',
      },
      {
        id: 'ed1-3',
        date: 'Thursday, August 14, 2025',
        coverImage: 'https://placehold.co/800x1067.png?text=Townsquare+Daily\\nCover&font=roboto',
      },
      {
        id: 'ed1-4',
        date: 'Wednesday, August 13, 2025',
        coverImage: 'https://placehold.co/800x1067.png?text=Townsquare+Daily\\nCover&font=roboto',
      },
      {
        id: 'ed1-5',
        date: 'Tuesday, August 12, 2025',
        coverImage: 'https://placehold.co/800x1067.png?text=Townsquare+Daily\\nCover&font=roboto',
      },
    ],
  },
  {
    id: 'pub2',
    name: 'Townsquare Weekly',
    slug: 'townsquare-weekly',
    logoText: 'TOWNSQUARE+WEEKLY',
    editions: [
      {
        id: 'ed2-1',
        date: 'Sunday, August 17, 2025',
        coverImage: 'https://placehold.co/800x1067.png?text=Townsquare+Weekly\\nCover&font=roboto',
      },
      {
        id: 'ed2-2',
        date: 'Sunday, August 10, 2025',
        coverImage: 'https://placehold.co/800x1067.png?text=Townsquare+Weekly\\nCover&font=roboto',
      },
    ],
  },
   {
    id: 'pub6',
    name: 'Supermarket Weekly',
    slug: 'supermarket-flyer',
    logoText: 'SUPERMARKET+WEEKLY',
    editions: [
      {
        id: 'ed6-1',
        date: 'Week of August 14, 2025',
        coverImage: 'https://placehold.co/800x1067.png?text=Supermarket+Weekly\\nFlyer&font=roboto',
      },
    ],
  },
  {
    id: 'pub4',
    name: 'The Business Beat',
    slug: 'the-business-beat',
    logoText: 'BUSINESS+BEAT',
    editions: [
      {
        id: 'ed4-1',
        date: 'August 15, 2025',
        coverImage: 'https://placehold.co/800x1067.png?text=Business+Beat\\nCover&font=playfair',
      },
      {
        id: 'ed4-2',
        date: 'August 8, 2025',
        coverImage: 'https://placehold.co/800x1067.png?text=Business+Beat\\nCover&font=playfair',
      },
    ],
  },
  {
    id: 'pub5',
    name: 'The Urbanist',
    slug: 'the-urbanist',
    logoText: 'THE+URBANIST',
    editions: [
      {
        id: 'ed5-1',
        date: 'Summer 2025',
        coverImage: 'https://placehold.co/800x1067.png?text=The+Urbanist\\nCover&font=playfair',
      },
       {
        id: 'ed5-2',
        date: 'Spring 2025',
        coverImage: 'https://placehold.co/800x1067.png?text=The+Urbanist\\nCover&font=playfair',
      },
    ],
  },
  {
    id: 'pub3',
    name: 'Magazines',
    slug: 'magazines',
    logoText: 'TOWNSQUARE+MAGAZINES',
    editions: [
      {
        id: 'ed3-1',
        date: 'August 2025',
        coverImage: 'https://placehold.co/800x1067.png?text=Fashion+Mag\\nCover&font=playfair',
      },
      {
        id: 'ed3-2',
        date: 'August 2025',
        coverImage: 'https://placehold.co/800x1067.png?text=Tech+Weekly\\nCover&font=roboto',
      },
       {
        id: 'ed3-3',
        date: 'July 2025',
        coverImage: 'https://placehold.co/800x1067.png?text=Travel+Monthly\\nCover&font=playfair',
      },
    ],
  },
];
